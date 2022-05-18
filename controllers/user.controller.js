const bcryptjs = require("bcryptjs");
const { response, request } = require("express"); // Para reconocer los metodos de estatus y json
const User = require("../models/user.model");

const userDocuments = (query = "", limit = 0, from = 0) => {
  from = from > 0 ? from - 1 : from;
  if (limit != 0) {
    if (from != 0) {
      return User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
        .populate("role", "name");
    } else {
      return User.find(query).limit(Number(limit)).populate("role", "name");
    }
  } else {
    if (from != 0) {
      return User.find(query).skip(Number(from)).populate("role", "name");
    } else {
      return User.find(query).populate("role", "name");
    }
  }
};

const getUser = async (req = request, res = response) => {
  const { limit = 0, from = 0, status = true } = req.query;

  //Obtenemos dependiendo si estan activos o no
  const query = { activated: status };

  const [total, users] = await Promise.all([
    userDocuments(query, limit, from, status).countDocuments(query),
    userDocuments(query, limit, from, status),
  ]);

  res.json({ msg: "Get User - Controller", total, users });
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
