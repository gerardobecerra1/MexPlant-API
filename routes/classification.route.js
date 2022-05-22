//#region Imports
const { Router } = require("express");
const { check } = require("express-validator");
const {
  createClassification,
  updateClassification,
  deleteClassification,
} = require("../controllers");
const {
  existClassificationById,
  classificationRegistered,
  classificationIsActive,
} = require("../helpers");
const { validateJWT, validateFields, hasRole } = require("../middlewares");
//#endregion

const router = Router();

router.post(
  "/",
  [
    validateJWT,
    hasRole("Administrador"),
    check(["name", "description"], "Este campo es obligatorio").notEmpty(),
    check("name").custom(classificationRegistered),
    validateFields,
  ],
  createClassification
);

router.put(
  "/:id",
  [
    validateJWT,
    hasRole("Administrador"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existClassificationById),
    check("name").optional({ nullable: true }).custom(classificationRegistered),
    validateFields,
  ],
  updateClassification
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("Administrador"),
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existClassificationById),
    check("id").custom(classificationIsActive),
    validateFields,
  ],
  deleteClassification
);

module.exports = router;
