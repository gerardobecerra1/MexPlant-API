const { response } = require("express");
const { Plant } = require("../models");

const createPlant = async (req, res = response) => {
  const { activated, user, ...body } = req.body;

  //Generar la data a guardar
  const data = {
    ...body,
    user: req.authUser._id,
  };

  const createdPlant = new Plant(data);

  //Guardar en DB
  await createdPlant.save();

  res.status(201).json({ msg: "Create Plant - Controller", createdPlant });
};

//Actualizar Plant
const updatePlant = async (req, res = response) => {
  const { id } = req.params;
  const { user, _id, ...data } = req.body;

  data.user = req.authUser._id;

  const updatedPlant = await Plant.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json({ msg: "Update Plant - Controller", updatedPlant });
};

//Borrar Plant - activated: false
const deletePlant = async (req, res = response) => {
  const { id } = req.params;

  const deletedPlant = await Plant.findByIdAndUpdate(
    id,
    { activated: false },
    { new: true }
  );

  res.json({ msg: "Delete Plant - Controller", deletedPlant });
};

module.exports = {
  createPlant,
  updatePlant,
  deletePlant,
};
