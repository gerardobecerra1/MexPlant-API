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
      res.json({
        msg: "Classification By ID",
        results: classififcation ? [classififcation] : [],
      });
    } else {
      const regex = new RegExp(term, "i");

      const query = {
        $or: [{ name: regex }, { description: regex }],
        $and: [{ activated: true }],
      };

      const [total, classififcations] = await Promise.all([
        Classification.find(query).countDocuments(query),
        Classification.find(query).populate("user", "name"),
      ]);

      res.json({
        msg: "Classifications By Fields",
        total,
        results: classififcations,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const searchClassificationsByUser = async (term = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term);
    const query = { user: ObjectId(term) };
    if (isMongoId) {
      const [total, classififcation] = await Promise.all([
        Classification.find(query).countDocuments(query),
        Classification.find(query).populate("user", "name"),
      ]);

      res.json({
        msg: "Classifications By User",
        total,
        results: classififcation ? [classififcation] : [],
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
      res.json({ msg: "Plant By ID", results: plant ? [plant] : [] });
    } else {
      const regex = new RegExp(term, "i");

      const [total, plants] = await Promise.all([
        Plant.find({
          $or: [
            { name: regex },
            { scientificName: regex },
            { description: regex },
          ],
          $and: [{ activated: true }],
        }).countDocuments({ activated: true }),
        Plant.find({
          $or: [
            { name: regex },
            { scientificName: regex },
            { description: regex },
          ],
          $and: [{ activated: true }],
        })
          .populate("user", "name")
          .populate("classification", "name"),
      ]);

      res.json({ msg: "Plants By Fileds", total, results: plants });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const searchPlantsByClassification = async (term = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term);
    const query = { classification: ObjectId(term) };
    if (isMongoId) {
      const [total, plants] = await Promise.all([
        Plant.find(query).countDocuments(query),
        Plant.find(query)
          .populate("user", "name")
          .populate("classification", "name"),
      ]);

      res.json({
        msg: "Plants By Classification",
        total,
        results: plants ? [plants] : [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "No es un ID válido",
    });
  }
};

const searchPlantsByClassifications = async (model = "", res = response) => {
  try {
    const plants = await Promise.all([
      model.find().populate("classification", "name"),
    ]);

    console.log(total, plants);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Consulte a un administrador",
    });
  }
};

const searchPlantsByUser = async (term = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term);
    const query = { user: ObjectId(term) };
    if (isMongoId) {
      const [total, plants] = await Promise.all([
        Plant.find(query).countDocuments(query),
        Plant.find(query)
          .populate("user", "name")
          .populate("classification", "name"),
      ]);

      res.json({
        msg: "Plants By User",
        total,
        results: plants ? [plants] : [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "No es un ID válido",
    });
  }
};

const searchRole = async (term = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
      const role = await Role.findById(term);
      res.json({ msg: "Role By ID", results: role ? [role] : [] });
    } else {
      const regex = new RegExp(term, "i");

      const query = {
        $or: [{ name: regex }, { description: regex }],
        $and: [{ activated: true }],
      };

      const [total, roles] = await Promise.all([
        Role.find(query).countDocuments(query),
        Role.find(query),
      ]);

      res.json({ msg: "Roles By Fields", total, results: roles });
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
      res.json({ msg: "User By ID", results: user ? [user] : [] });
    } else {
      const regex = new RegExp(term, "i");

      const query = {
        $or: [{ name: regex }, { surname: regex }, { mail: regex }],
        $and: [{ activated: true }],
      };

      const [total, users] = await Promise.all([
        User.find(query).countDocuments(query),
        User.find(query),
      ]);

      res.json({ msg: "Users By Fields", total, results: users });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const searchUsersByRole = async (term = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term);
    const query = { role: ObjectId(term) };
    if (isMongoId) {
      const [total, users] = await Promise.all([
        User.find(query).countDocuments(query),
        User.find(query).populate("role", "name"),
      ]);

      res.json({
        msg: "Users By Role",
        total,
        results: users ? [users] : [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "No es un ID válido",
    });
  }
};

const search = (req, res = response) => {
  const { collection, term } = req.params;

  switch (collection) {
    case "classifications":
      searchClassififcation(term, res);
      break;
    case "classificationsByUser":
      searchClassificationsByUser(term, res);
      break;
    case "plants":
      searchPlant(term, res);
      break;
    case "plantsByClassification":
      searchPlantsByClassification(term, res);
      break;
    case "plantsByUser":
      searchPlantsByUser(term, res);
      break;
    case "roles":
      searchRole(term, res);
      break;
    case "users":
      searchUser(term, res);
      break;
    case "usersByRole":
      searchUsersByRole(term, res);
      break;
    default:
      res.status(500).json({
        msg: "La colleción no coincide con nunguna de permitida",
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
    case "listPlantsByClassifications":
      mongoModel = Classification;
      break;
    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta búsqueda",
      });
      break;
  }

  if (collection === "listPlantsByClassifications") {
    const list = await mongoModel.aggregate([
      {
        $lookup: {
          from: "plants",
          localField: "_id",
          foreignField: "classification",
          as: "plants",
        },
      },
    ]);

    res.json({
      msg: "Search - Controller",
      list,
    });
  } else {
    const [total, results] = await Promise.all([
      getDocuments(mongoModel, query, limit, from, status).countDocuments(
        query
      ),
      getDocuments(mongoModel, query, limit, from, status),
    ]);

    res.json({
      msg: "Search - Controller",
      total,
      results,
    });
  }
};

module.exports = {
  search,
  searchPagination,
};
