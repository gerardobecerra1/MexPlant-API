const bcryptjs = require("bcryptjs");
const { response, request } = require("express"); // Para reconocer los metodos de estatus y json
const User = require("../models/user.model");

const getUser = async (req = request, res = response) => {
  const { limit = 0, from = 0, status = true } = req.query;

  //Obtenemos dependiendo si estan activos o no
  const query = { activated: status };

  const [total, users] = await Promise.all([
    // User.countDocuments(query),
    limit != 0
      ? from != 0
        ? User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate("role", "name")
            .countDocuments(query)
        : User.find(query)
            .limit(Number(limit))
            .populate("role", "name")
            .countDocuments(query)
      : from != 0
      ? User.find(query)
          .skip(Number(from))
          .populate("role", "name")
          .countDocuments(query)
      : User.find(query).populate("role", "name").countDocuments(query),
    limit != 0
      ? from != 0
        ? User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate("role", "name")
        : User.find(query).limit(Number(limit)).populate("role", "name")
      : from != 0
      ? User.find(query).skip(Number(from)).populate("role", "name")
      : User.find(query).populate("role", "name"),
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
