require("dotenv").config();
const connectionString = process.env.CONNECTION_STRING;
const { Sequelize, DataTypes, useInflection } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://reuhyxok:w-ekd8Oa49s3TaQRHFKJ6CAMDePYhI3Q@arjuna.db.elephantsql.com/reuhyxok"
);

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
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
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

const Projects = sequelize.define("projects", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  formatFile: {
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
  sequelize,
};
