const { Role, User, Classification, Plant } = require("../models");

//#region Role
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
    throw new Error(`El rol con id:'${id}' se encuentra inactivo`);
  }
};
//#endregion

//#region User
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
    throw new Error(`El usuario con id:'${id}' se encuentra inactivo`);
  }
};

const userExist = async (mail = "") => {
  const exist = await User.findOne({ mail });
  if (!exist) {
    throw new Error(`El correo: '${mail}' no existe`);
  }
};
//#endregion

//#region Classification
const existClassificationById = async (id) => {
  const existClassification = await Classification.findById(id);
  if (!existClassification) {
    throw new Error(`El id: '${id}' no existe`);
  }
};

const classificationRegistered = async (name = "") => {
  const classificationExist = await Classification.findOne({ name });
  if (classificationExist) {
    throw new Error(`La clasificación: '${name}' ya se encuentra registrada`);
  }
};

const classificationIsActive = async (id = "") => {
  const classification = await Classification.findById(id);
  if (!classification.activated) {
    throw new Error(`La clasificación con id:'${id}' se encuentra inactiva`);
  }
};
//#endregion

//#region Classification
const existPlantById = async (id) => {
  const existPlant = await Plant.findById(id);
  if (!existPlant) {
    throw new Error(`El id: '${id}' no existe`);
  }
};

const plantNameRegistered = async (name = "") => {
  const plantExist = await Plant.findOne({ name });
  if (plantExist) {
    throw new Error(`La clasificación: '${name}' ya se encuentra registrada`);
  }
};

const plantscientificNameRegistered = async (scientificName = "") => {
  const plantExist = await Plant.findOne({ scientificName });
  if (plantExist) {
    throw new Error(
      `El nombre científico: '${scientificName}' ya se encuentra registrado`
    );
  }
};

const plantIsActive = async (id = "") => {
  const plant = await Plant.findById(id);
  if (!plant.activated) {
    throw new Error(`La planta con id:'${id}' se encuentra inactiva`);
  }
};
//#endregion

module.exports = {
  existRoleId,
  roleRegistered,
  roleIsActive,
  mailRegistered,
  existUserId,
  userIsActive,
  userExist,
  existClassificationById,
  classificationRegistered,
  classificationIsActive,
  existPlantById,
  plantNameRegistered,
  plantscientificNameRegistered,
  plantIsActive,
};
