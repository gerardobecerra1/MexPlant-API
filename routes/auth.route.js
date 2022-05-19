const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validate-fields.middleware");
const router = Router();

router.post(
  "/login",
  [
    check(["mail", "password"], "El campo es obligatorio").notEmpty(),
    check(
      "mail",
      "El correo no es válido, por favor agregue uno con el formato correcto, Ejemplo; example@test.com"
    ).isEmail(),
    validateFields,
  ],
  login
);

module.exports = router;
