const { response } = require("express");
const { request } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.authUser) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { role, name, surname } = req.authUser;
  if (role.name !== "Administrador") {
    return res.status(401).json({
      msg: `${name} ${surname} no es Administrador - No puede ejecutar esta acción`,
    });
  }

  next();
};

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
  isAdminRole,
  hasRole,
};
