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
  existUserId,
  isActive,
} = require("../helpers/db-validators.helper");

const {
  paramNumericPositive,
  statusValidator,
} = require("../helpers/param-validators.helper");

const router = Router();

router.get(
  "/",
  [
    check("limit").custom(paramNumericPositive),
    check("from").custom(paramNumericPositive),
    check("status").custom(statusValidator),
    validateFields,
  ],
  getUser
);

router.post(
  "/",
  [
    check("role", "Este campo es obligatorio").notEmpty(),
    check("name", "Este campo es obligatorio").notEmpty(),
    check("surname", "Este campo es obligatorio").notEmpty(),
    check("mail", "Este campo es obligatorio").notEmpty(),
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

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserId),
    check("id").custom(isActive),
    check(
      "password",
      "El password es obligatorio y debe contener almenos 8 caracteres"
    ).isLength({ min: 8 }),
    validateFields,
  ],
  updateUser
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserId),
    check("id").custom(isActive),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
