const { request, response } = require("express");
const { Classification, Plant, Role, User } = require("../models");
const { ObjectId } = require("mongoose").Types;

const searchClassififcation = async (term = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
      const classififcation = await Classification.findById(term).populate(
        "user",
        "name"
      );
      res.json({ results: classififcation ? [classififcation] : [] });
    } else {
      const regex = new RegExp(term, "i");

      const classififcations = await Classification.find({
        $or: [{ name: regex }, { description: regex }],
        $and: [{ activated: true }],
      }).populate("user", "name");
      res.json({ results: classififcations });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const searchPlantByClassification = async (term = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term);
    const query = { classification: ObjectId(term) };
    if (isMongoId) {
      const plantByClassification = await Plant.find(query)
        .populate("user", "name")
        .populate("classification", "name");
      res.json({
        results: plantByClassification ? [plantByClassification] : [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "No es un ID válido",
    });
  }
};

const searchPlant = async (term = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
      const plant = await Plant.findById(term)
        .populate("user", "name")
        .populate("classification", "name");
      res.json({ results: plant ? [plant] : [] });
    } else {
      const regex = new RegExp(term, "i");

      const plants = await Plant.find({
        $or: [
          { name: regex },
          { scientificName: regex },
          { description: regex },
        ],
        $and: [{ activated: true }],
      })
        .populate("user", "name")
        .populate("classification", "name");
      res.json({ results: plants });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const searchRole = async (term = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
      const role = await Role.findById(term);
      res.json({ results: role ? [role] : [] });
    } else {
      const regex = new RegExp(term, "i");

      const roles = await Role.find({
        $or: [{ name: regex }, { description: regex }],
        $and: [{ activated: true }],
      });
      res.json({ results: roles });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const searchUser = async (term = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
      const user = await User.findById(term);
      res.json({ results: user ? [user] : [] });
    } else {
      const regex = new RegExp(term, "i");

      const users = await User.find({
        $or: [{ name: regex }, { surname: regex }, { mail: regex }],
        $and: [{ activated: true }],
      });
      res.json({ results: users });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const search = (req, res = response) => {
  const { collection, term } = req.params;

  switch (collection) {
    case "classifications":
      searchClassififcation(term, res);
      break;
    case "plants":
      searchPlant(term, res);
      break;
    case "plantsByClassification":
      searchPlantByClassification(term, res);
      break;
    case "roles":
      searchRole(term, res);
      break;
    case "users":
      searchUser(term, res);
      break;

    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta búsqueda",
      });
      break;
  }
};

const getDocuments = (model = "", query = "", limit = 0, from = 0) => {
  from = from > 0 ? from - 1 : from;
  if (limit != 0) {
    if (from != 0) {
      return model.find(query).skip(Number(from)).limit(Number(limit));
    } else {
      return model.find(query).limit(Number(limit));
    }
  } else {
    if (from != 0) {
      return model.find(query).skip(Number(from));
    } else {
      return model.find(query);
    }
  }
};

const searchPagination = async (req = request, res = response) => {
  const { collection } = req.params;
  const { limit = 0, from = 0, status = true } = req.query;

  //Obtenemos dependiendo si estan activos o no
  const query = { activated: status };

  let mongoModel;
  //Asignamos el modelo
  switch (collection) {
    case "classifications":
      mongoModel = Classification;
      break;
    case "plants":
      mongoModel = Plant;
      break;
    case "roles":
      mongoModel = Role;
      break;
    case "users":
      mongoModel = User;
      break;
    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta búsqueda",
      });
      break;
  }

  const [total, results] = await Promise.all([
    getDocuments(mongoModel, query, limit, from, status).countDocuments(query),
    getDocuments(mongoModel, query, limit, from, status),
  ]);

  res.json({
    msg: "Search - Controller",
    total,
    results,
  });
};

module.exports = {
  search,
  searchPagination,
};
