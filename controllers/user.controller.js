const bcryptjs = require("bcryptjs");
const { response, request } = require("express"); // Para reconocer los metodos de estatus y json
const User = require("../models/user.model");

//Configuración para subir imagenes a la nube
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const validExtensions = ["jpg", "jpeg", "png"];

const createUser = async (req = request, res = response) => {
  //Obtenemos las campos de la petición
  const { role, name, surname, mail, password } = req.body;

  //Asignamos una imagen por default en el caso de que no mande una el usuario
  let image =
    "https://res.cloudinary.com/becerra-media/image/upload/v1653209560/images/default-profile-image_wgeylw.jpg";

  const files = req.files;

  //Obtenemos la imagen
  if (files) {
    const { tempFilePath } = files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder: "images/users",
    });

    image = secure_url;
  }

  //Creamos un objeto de tipo User de mongo
  const userCreated = new User({
    role,
    image,
    name,
    surname,
    mail,
    password,
  });

  //Encriptamos el password
  const salt = bcryptjs.genSaltSync();

  //Sobreescribimos la contraseña anterior por la encriptada
  userCreated.password = bcryptjs.hashSync(password, salt);

  //Guardamos el usuario en la DB
  await userCreated.save();

  //Mandamos la respuesta de la petición
  res.status(201).json({ msg: "Create User - Controller", userCreated });
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { role, _id, mail, password, ...rest } = req.body;

  //TODO Validar contra la base de datos
  if (password) {
    //Encriptamos la contraseña
    const salt = bcryptjs.genSaltSync(10);
    //Nueva contraseña
    rest.password = bcryptjs.hashSync(password, salt);
  }

  let model = await User.findById(id);
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
      folder: "images/users",
    });

    //Nueva imagen
    rest.image = secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(id, rest, {
    new: true,
  }).populate("role", "name");

  res.json({ msg: "Update User - Controller", updatedUser });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndUpdate(
    id,
    { activated: false },
    { new: true }
  ).populate("role", "name");

  const authUser = req.authUser;

  res.json({ msg: "Delete User - Controller", deletedUser, authUser });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
