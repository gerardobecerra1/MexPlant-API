const { response } = require("express");
const { Plant } = require("../models");

//Configuración para subir imagenes a la nube
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const validExtensions = ["jpg", "jpeg", "png"];

const createPlant = async (req, res = response) => {
  const { activated, user, ...body } = req.body;

  //Asignamos una imagen por default en el caso de que no mande una el usuario
  body.image =
    "https://res.cloudinary.com/becerra-media/image/upload/v1653209560/images/default-profile-image_wgeylw.jpg";

  const files = req.files;

  //Obtenemos la imagen
  if (files) {
    const { tempFilePath } = files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder: "images/plants",
    });

    body.image = secure_url;
  }
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

  let model = await Plant.findById(id);
  if (!model) {
    return res.status(400).json({
      msg: `No existe un usuario con el ID: "${id}"`,
    });
  }

  const files = req.files;

  if (files) {
    //Limpiar imagenes previas
    if (model.image) {
      const nameArr = model.image.split("/");

      const pathImg = [
        nameArr[nameArr.length - 3],
        nameArr[nameArr.length - 2],
        nameArr[nameArr.length - 1],
      ];
      const name = pathImg.join("/");
      const [public_id] = name.split(".");

      cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = files.file;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder: "images/plants",
    });

    //Nueva imagen
    data.image = secure_url;
  }

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
