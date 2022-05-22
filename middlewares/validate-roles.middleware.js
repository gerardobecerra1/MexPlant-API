const { response } = require("express");
const { request } = require("express");

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.authUser) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }
    const { role } = req.authUser;
    if (!roles.includes(role.name)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  hasRole,
};
