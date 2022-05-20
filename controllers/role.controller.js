const { response, request } = require("express"); // Para reconocer los metodos de estatus y json
const Role = require("../models/role.model");

const getRoles = async (req = request, res = response) => {
  const { limit = 0, from = 0, status = true } = req.query;

  //Obtenemos dependiendo si estan activos o no
  const query = { activated: status };

  const [total, roles] = await Promise.all([
    roleDocuments(query, limit, from, status).countDocuments(query),
    roleDocuments(query, limit, from, status),
  ]);

  res.json({ msg: "Get Roles - Controller", total, roles });
};

const roleDocuments = (query = "", limit = 0, from = 0) => {
  from = from > 0 ? from - 1 : from;
  if (limit != 0) {
    if (from != 0) {
      return Role.find(query).skip(Number(from)).limit(Number(limit));
    } else {
      return Role.find(query).limit(Number(limit));
    }
  } else {
    if (from != 0) {
      return Role.find(query).skip(Number(from));
    } else {
      return Role.find(query);
    }
  }
};

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
  getRoles,
  createRole,
  updateRole,
  deleteRole,
};
