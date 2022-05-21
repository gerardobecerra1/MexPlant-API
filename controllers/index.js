const authController = require("./auth.controller");
const searchController = require("./search.controller");
const classificationController = require("./classification.controller");
const plantController = require("./plant.controller");
const roleController = require("./role.controller");
const userController = require("./user.controller");
const uploadController = require("./user.controller");

module.exports = {
  ...authController,
  ...searchController,
  ...classificationController,
  ...plantController,
  ...roleController,
  ...userController,
  ...uploadController,
};
