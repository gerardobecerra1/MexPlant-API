const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { json } = require("express/lib/response");
const { generateJWT } = require("../helpers/generate-jwt.helper");
const User = require("../models/user.model");

const login = async (req, res = response) => {
  const { mail, password } = req.body;

  try {
    //Verificar si el email existe
    const authUser = await User.findOne({ mail }).populate("role", "name");

    //Si el usuario está activo
    if (!authUser.activated) {
      return res.status(400).json({
        msg: "No se puede ingresar con este usuario - activated: false",
      });
    }

    if (!authUser) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, authUser.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    //Generar el JWT
    const token = await generateJWT(authUser.id);

    res.json({
      authUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
