const { Role, User } = require("../models");

const existRoleId = async (id = "") => {
  const role = await Role.findById(id);
  if (!role) {
    throw new Error(`El id:'${id}' no está registrado en la base de datos`);
  }
};

const mailRegistered = async (mail = "") => {
  const mailExist = await User.findOne({ mail });
  if (mailExist) {
    throw new Error(`El correo: '${mail}' ya se encuentra registrado`);
  }
};

module.exports = {
  existRoleId,
  mailRegistered,
};
