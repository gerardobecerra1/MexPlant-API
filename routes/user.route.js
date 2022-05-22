const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, updateUser, deleteUser } = require("../controllers");
const { validateFields, validateJWT, hasRole } = require("../middlewares");
const {
  existRoleId,
  mailRegistered,
  existUserId,
  userIsActive,
} = require("../helpers");

const router = Router();

router.post(
  "/",
  [
    check(
      ["role", "name", "surname", "mail"],
      "Este campo es obligatorio"
    ).notEmpty(),
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
    check("password", "El password debe contener almenos 8 caracteres")
      .optional({ nullable: true })
      .isLength({ min: 8 }),
    validateFields,
  ],
  updateUser
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("Administrador"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserId),
    check("id").custom(userIsActive),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
