const { Router } = require("express");
const { check } = require("express-validator");
const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers");
const {
  roleRegistered,
  existRoleId,
  paramNumericPositive,
  statusValidator,
  roleIsActive,
} = require("../helpers");
const { validateFields, validateJWT, hasRole } = require("../middlewares");

const router = Router();

router.get(
  "/",
  [
    check("limit").custom(paramNumericPositive),
    check("from").custom(paramNumericPositive),
    check("status").custom(statusValidator),
    validateFields,
  ],
  getRoles
);

router.post(
  "/",
  [
    check(["name", "description"], "Este campo es obligatorio").notEmpty(),
    check("name").custom(roleRegistered),
    validateFields,
  ],
  createRole
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existRoleId),
    validateFields,
  ],
  updateRole
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("Administrador"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existRoleId),
    check("id").custom(roleIsActive),
    validateFields,
  ],
  deleteRole
);

module.exports = router;
