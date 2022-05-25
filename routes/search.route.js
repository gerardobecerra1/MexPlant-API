const { Router } = require("express");
const { check } = require("express-validator");
const {
  search,
  searchPagination,
  searchPlantsByClassifications,
} = require("../controllers");
const {
  paramNumericPositive,
  statusValidator,
  allowedCollection,
} = require("../helpers");
const { validateFields, hasRole, validateJWT } = require("../middlewares");

const router = Router();

router.get(
  "/:collection",
  [
    check("collection").custom(allowedCollection),
    check("limit").custom(paramNumericPositive),
    check("from").custom(paramNumericPositive),
    check("status").custom(statusValidator),
    validateFields,
  ],
  searchPagination
);

router.get(
  "/:collection/:term",
  [
    check("collection").custom(allowedCollection),
    validateFields,
  ],
  search
);

module.exports = router;
