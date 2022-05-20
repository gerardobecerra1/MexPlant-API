const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    require: [true, "El role es obligatorio"],
  },
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  surname: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  mail: {
    type: String,
    unique: true,
    required: [true, "El correo es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "El password es obligatoria"],
  },
  image: {
    type: String,
  },
  activated: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { password, _id, __v, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
