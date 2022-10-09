require("dotenv").config();
const express = require("express");
const app = express();

const { createAgent } = require("@forestadmin/agent");
const {
  createSequelizeDataSource,
} = require("@forestadmin/datasource-sequelize");
// Retrieve your sequelize instance
const sequelizeInstance = require("./models");

// Create your Forest Admin agent
// This must be called BEFORE all other middleware on the app
createAgent({
  authSecret: process.env.FOREST_AUTH_SECRET,
  envSecret: process.env.FOREST_ENV_SECRET,
  isProduction: process.env.NODE_ENV === "production",
})
  // Create your Sequelize datasource
  .addDataSource(createSequelizeDataSource(sequelizeInstance))
  // Replace "myExpressApp" by your Express application
  .mountOnExpress(app)
  .start();
