require("dotenv").config();
const connectionString = process.env.CONNECTION_STRING;
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://reuhyxok:w-ekd8Oa49s3TaQRHFKJ6CAMDePYhI3Q@arjuna.db.elephantsql.com/reuhyxok",
  {
    host: "localhost",
    dialect: "postgres",
  }
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
});

const Projects = sequelize.define("projects", {
  name: {
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

// const Management = sequelize.define('management', {
//   id: {
//     type:
//   }
// })

Users.hasOne(Works, { onDelete: "cascade" });
Works.belongsTo(Users);

module.exports = {
  Users,
  News,
  Projects,
  Works,
  sequelize,
};
