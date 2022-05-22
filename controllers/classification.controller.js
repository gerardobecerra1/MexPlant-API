const { response } = require("express");
const { Classification } = require("../models");

const createClassification = async (req, res = response) => {
  const { name, description } = req.body;

  //Generar la data a guardar
  const data = {
    name,
    description,
    user: req.authUser._id,
  };

  const classificationCreated = new Classification(data);

  //Guardar en DB
  await classificationCreated.save();

  res
    .status(201)
    .json({ msg: "Create Classification - Controller", classificationCreated });
};

//Actualizar Classification
const updateClassification = async (req, res = response) => {
  const { id } = req.params;
  const { user, _id, ...data } = req.body;

  const authUser = req.authUser;
  //Asignamos al ultimo usuario que lo actualizó
  data.user = authUser._id;

  const updatedClassification = await Classification.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );

  res.status(201).json({
    msg: "Update Classification - Controller",
    updatedClassification,
    authUser,
  });
};

//Borrar Classification - activated: false
const deleteClassification = async (req, res = response) => {
  const { id } = req.params;

  const classificationDeleted = await Classification.findByIdAndUpdate(
    id,
    { activated: false },
    { new: true }
  );

  const authUser = req.authUser;

  res.json({
    msg: "Delete Classification - Controller",
    classificationDeleted,
    authUser,
  });
};

module.exports = {
  createClassification,
  updateClassification,
  deleteClassification,
};
