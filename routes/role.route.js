const { Router } = require("express");
const { check } = require("express-validator");
const { createRole, updateRole, deleteRole } = require("../controllers");
const { roleRegistered, existRoleId, roleIsActive } = require("../helpers");
const { validateFields, validateJWT, hasRole } = require("../middlewares");

const router = Router();

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
