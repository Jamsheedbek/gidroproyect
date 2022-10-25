require("dotenv").config();
const ejs = require("ejs");
const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 9000;
const { sequelize } = require("./src/models");
const initialRoutes = require("./src/routes");
const fileUpload = require("express-fileupload");
const createAdmin = require("./src/util/createAdmin");

global.__basedir = __dirname;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//use cors
app.use(cors());
//for file upload
app.use(
  fileUpload({
    limits: { fieldSize: 250 * 1024 * 1024 },
  })
);
app.use(express.static("./src/public"));
app.use("/files", express.static("./src/uploads"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
initialRoutes(app);

//connection sequelize
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Drop end Resync db");
    createAdmin();
  })
  .catch((err) => console.log(err));

app.get("*", (req, res) => res.render("pagenotfound"));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
