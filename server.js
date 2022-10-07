const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.static(path.resolve(__dirname, "./client")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server !" });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client", "about.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client", "portfolio.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client", "contact.html"));
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
