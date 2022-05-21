const { Router } = require("express");
const { check } = require("express-validator");
const {
  createClassification,
  getClassifications,
  updateClassification,
  deleteClassification,
} = require("../controllers");
const {
  existClassificationById,
  paramNumericPositive,
  statusValidator,
} = require("../helpers");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

const router = Router();

//Obtener todas las clasificaciones - publico
router.get(
  "/",
  [
    check("limit").custom(paramNumericPositive),
    check("from").custom(paramNumericPositive),
    check("status").custom(statusValidator),
    validateFields,
  ],
  getClassifications
);

//Crear clasificación - privado - Cualquier persona con un token válido
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    validateFields,
  ],
  createClassification
);

//Actualizar clasificación por id- privado - Cualquier persona con un token válido
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existClassificationById),
    validateFields,
  ],
  updateClassification
);

//Borrar clasificación por id- privado - Solo el Administrador puede Borrar
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existClassificationById),
    validateFields,
  ],
  deleteClassification
);

module.exports = router;
