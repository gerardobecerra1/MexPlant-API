const { response, request } = require("express"); // Para reconocer los metodos de estatus y json
const Role = require("../models/role.model");

const createRole = async (req = request, res = response) => {
  const dataRole = req.body;
  const roleCreated = new Role(dataRole);

  //Guarda el usuario en la DB
  await roleCreated.save();
  res.status(201).json({ msg: "Create Role - Controller", roleCreated }); //Si no agregamos status por defecto enviara un Ok:200
};

const updateRole = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, ...rest } = req.body;

  const updatedRole = await Role.findByIdAndUpdate(id, rest, { new: true });

  res.json({ msg: "Update Role - Controller", updatedRole });
};

const deleteRole = async (req = request, res = response) => {
  const { id } = req.params;

  const deletedRole = await Role.findByIdAndUpdate(
    id,
    { activated: false },
    { new: true }
  );

  const authUser = req.authUser;
  res.json({ msg: "Delete Role - Controller", deletedRole, authUser });
};

module.exports = {
  createRole,
  updateRole,
  deleteRole,
};
