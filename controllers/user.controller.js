const bcryptjs = require("bcryptjs");
const { response, request } = require("express"); // Para reconocer los metodos de estatus y json
const User = require("../models/user.model");

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

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { role, _id, mail, password, ...rest } = req.body;

  //TODO Validar contra la base de datos
  if (password) {
    //Encriptamos la contraseña
    const salt = bcryptjs.genSaltSync(10);
    //Nueva contraseña
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(id, rest, {
    new: true,
  }).populate("role", "name");

  res.json({ msg: "Update User - Controller", updatedUser });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndUpdate(
    id,
    { activated: false },
    { new: true }
  ).populate("role", "name");

  const authUser = req.authUser;

  res.json({ msg: "Delete User - Controller", deletedUser, authUser });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
