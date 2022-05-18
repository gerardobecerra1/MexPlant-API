const { response, request } = require("express"); // Para reconocer los metodos de estatus y json
const Role = require("../models/role.model");

const getRoles = (req = request, res = response) => {
  const { from = 0, until = 0, limit = 0 } = req.query;
  res.json({ msg: "Get Roles - Controller", from, until, limit });
};

const createRole = async (req = request, res = response) => {
  const dataRole = req.body;
  const roleCreated = new Role(dataRole);

  //Guarda el usuario en la DB
  await roleCreated.save();
  res.status(201).json({ msg: "Create Role - Controller", roleCreated }); //Si no agregamos status por defecto enviara un Ok:200
};

const updateRole = (req = request, res = response) => {
  const { id } = req.params;
  res.json({ msg: "Update Role - Controller", id });
};

const deleteRole = (req = request, res = response) => {
  const { id } = req.params;
  res.json({ msg: "Delete Role - Controller", id });
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
};
