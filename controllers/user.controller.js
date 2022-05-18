const bcryptjs = require("bcryptjs");
const { response, request } = require("express"); // Para reconocer los metodos de estatus y json
const User = require("../models/user.model");

const getUser = (req = request, res = response) => {
  const { from = 0, until = 0, limit = 0 } = req.query;
  res.json({ msg: "Get User - Controller", from, until, limit });
};

const createUser = async (req = request, res = response) => {
  //Obtenemos las campos de la petición
  const { role, name, surname, mail, password } = req.body;

  //Creamos un objeto de tipo User de mongo
  const userCreated = new User({ role, name, surname, mail, password });

  //Encriptamos el password
  const salt = bcryptjs.genSaltSync();

  //Sobreescribimos la contraseña anterior por la encriptada
  userCreated.password = bcryptjs.hashSync(password, salt);

  //Guardamos el usuario en la DB
  await userCreated.save();

  //Mandamos la respuesta de la petición
  res.status(201).json({ msg: "Create User - Controller", userCreated }); //Si no agregamos status por defecto enviara un Ok:200
};

const updateUser = (req = request, res = response) => {
  const { id } = req.params;
  res.json({ msg: "Update User - Controller", id });
};

const deleteUser = (req = request, res = response) => {
  const { id } = req.params;
  res.json({ msg: "Delete User - Controller", id });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
