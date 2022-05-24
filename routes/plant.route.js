const { Router } = require("express");
const { check } = require("express-validator");
const {
  createPlant,
  updatePlant,
  deletePlant,
  getRandomPlant,
} = require("../controllers");
const {
  existClassificationById,
  existPlantById,
  classificationIsActive,
  plantNameRegistered,
  plantscientificNameRegistered,
  plantIsActive,
} = require("../helpers");
const { validateJWT, validateFields, hasRole } = require("../middlewares");

const router = Router();

router.get(
  "/random",
  [validateJWT, hasRole("Administrador"), validateFields],
  getRandomPlant
);

router.post(
  "/",
  [
    validateJWT,
    hasRole("Administrador"),
    check(
      ["classification", "name", "scientificName", "description"],
      "Este campo es obligatorio"
    ).notEmpty(),
    check("classification", "No es un id de Mongo válido").isMongoId(),
    check("classification").custom(existClassificationById),
    check("classification").custom(classificationIsActive),
    check("name").custom(plantNameRegistered),
    check("scientificName").custom(plantscientificNameRegistered),
    validateFields,
  ],
  createPlant
);

router.put(
  "/:id",
  [
    validateJWT,
    hasRole("Administrador"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existPlantById),
    check("classification", "No es un ID válido")
      .optional({ nullable: true })
      .isMongoId(),
    check("classification")
      .optional({ nullable: true })
      .custom(existClassificationById),
    check("classification")
      .optional({ nullable: true })
      .custom(classificationIsActive),
    check("name").optional({ nullable: true }).custom(plantNameRegistered),
    check("scientificName")
      .optional({ nullable: true })
      .custom(plantscientificNameRegistered),
    validateFields,
  ],
  updatePlant
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("Administrador"),
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existPlantById),
    check("id").custom(plantIsActive),
    validateFields,
  ],
  deletePlant
);

module.exports = router;
