require("dotenv").config();
const connectionString = process.env.CONNECTION_STRING;
const { Sequelize, DataTypes } = require("sequelize");

let test =
  "postgres://cqsxwkvc:9i6ohxAwZ4oh1y1NDBf8sWgMUbSW_Ipy@jelani.db.elephantsql.com/cqsxwkvc";

const sequelize = new Sequelize(connectionString, {
  host: "localhost",
  dialect: "postgres",
  timezone: "Asia/Tashkent",
});

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
});

const News = sequelize.define("news", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Carousel = sequelize.define("carousel", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Leaders = sequelize.define("leaders", {
  fullName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  position: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tel: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  mail: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  acceptance: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  commitment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Projects = sequelize.define("projects", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Works = sequelize.define("works", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.hasOne(Works, { onDelete: "cascade" });
Works.belongsTo(Users);

module.exports = {
  Users,
  News,
  Projects,
  Works,
  Leaders,
  Carousel,
  sequelize,
};
