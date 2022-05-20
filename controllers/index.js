const authController = require("./auth.controller");
const roleController = require("./role.controller");
const searchController = require("./search.controller");
const userController = require("./user.controller");

module.exports = {
  ...authController,
  ...roleController,
  ...searchController,
  ...userController,
};
