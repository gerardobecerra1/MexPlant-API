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

const existUserId = async (id = "") => {
  const idExist = await User.findById(id);
  if (!idExist) {
    throw new Error(`El ID: '${id}' no existe`);
  }
};

const isActive = async (id = "") => {
  const user = await User.findById(id);
  if (!user.activated) {
    throw new Error(
      `El usuario con id:'${id}' se encuentra inactivo, no se le pueden hacer ningún cambio`
    );
  }
};

module.exports = {
  existRoleId,
  mailRegistered,
  existUserId,
  isActive,
};
