const { response } = require("express");
const { Classification } = require("../models");

//Obtener Classifications - paginado - total - populate
const getClassifications = async (req, res = response) => {
  const { limit = 0, from = 0, status = true } = req.query;

  //Obtenemos dependiendo si estan activos o no
  const query = { activated: status };

  const [total, classifications] = await Promise.all([
    classificationDocuments(query, limit, from, status).countDocuments(query),
    classificationDocuments(query, limit, from, status),
  ]);

  res.json({
    msg: "Get Classificactions - Controller",
    total,
    classifications,
  });
};

const classificationDocuments = (query = "", limit = 0, from = 0) => {
  from = from > 0 ? from - 1 : from;
  if (limit != 0) {
    if (from != 0) {
      return Classification.find(query).skip(Number(from)).limit(Number(limit));
    } else {
      return Classification.find(query).limit(Number(limit));
    }
  } else {
    if (from != 0) {
      return Classification.find(query).skip(Number(from));
    } else {
      return Classification.find(query);
    }
  }
};

const createClassification = async (req, res = response) => {
  const { name, description } = req.body;

  const classificationDB = await Classification.findOne({ name });
  if (classificationDB) {
    return res.status(400).json({
      msg: `La clasificación: '${classificationDB.name}', ya existe`,
    });
  }

  //Generar la data a guardar
  const data = {
    name,
    description,
    user: req.authUser._id,
  };

  const classification = new Classification(data);

  //Guardar en DB
  await classification.save();

  res.json(classification);
};

//Actualizar Classification
const updateClassification = async (req, res = response) => {
  const { id } = req.params;
  const { activated, user, ...data } = req.body;

  data.user = req.authUser._id;
  const classification = await Classification.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(classification);
};

//Borrar Classification - activated: false
const deleteClassification = async (req, res = response) => {
  const { id } = req.params;

  const classificationDeleted = await Classification.findByIdAndUpdate(
    id,
    { activated: false },
    { new: true }
  );

  res.json(classificationDeleted);
};

module.exports = {
  createClassification,
  getClassifications,
  updateClassification,
  deleteClassification,
};
