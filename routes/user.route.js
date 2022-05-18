const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { validateFields } = require("../middlewares");
const {
  existRoleId,
  mailRegistered,
} = require("../helpers/db-validator.helper");

const router = Router();

router.get("/", getUser);

router.post(
  "/",
  [
    check("role", "El role es obligatorio").notEmpty(),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("surname", "El apellido es obligatorio").notEmpty(),
    check("mail", "El correo es obligatorio").notEmpty(),
    check("role", "No es un ID válido").isMongoId(),
    check("role").custom(existRoleId),
    check(
      "mail",
      "El correo no es válido, por favor agregue uno con el formato correcto, Ejemplo; example@test.com"
    ).isEmail(),
    check("mail").custom(mailRegistered),
    check(
      "password",
      "El password es obligatorio y debe contener más de 6 letras"
    ).isLength({ min: 8 }),
    validateFields,
  ],
  createUser
);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
