const { Role, User } = require("../models");

const existRoleId = async (id = "") => {
  const role = await Role.findById(id);
  if (!role) {
    throw new Error(`El id:'${id}' no está registrado en la base de datos`);
  }
};

const roleRegistered = async (name = "") => {
  const roleExist = await Role.findOne({ name });
  if (roleExist) {
    throw new Error(`El rol: '${name}' ya se encuentra registrado`);
  }
};

const roleIsActive = async (id = "") => {
  const role = await Role.findById(id);
  if (!role.activated) {
    throw new Error(
      `El rol con id:'${id}' se encuentra inactivo, no se le pueden hacer ningún cambio`
    );
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

const userIsActive = async (id = "") => {
  const user = await User.findById(id);
  if (!user.activated) {
    throw new Error(
      `El usuario con id:'${id}' se encuentra inactivo, no se le pueden hacer ningún cambio`
    );
  }
};

const userExist = async (mail = "") => {
  const exist = await User.findOne({ mail });
  if (!exist) {
    throw new Error(`El correo: '${mail}' no existe`);
  }
};

module.exports = {
  existRoleId,
  roleRegistered,
  roleIsActive,
  mailRegistered,
  existUserId,
  userIsActive,
  userExist,
};
