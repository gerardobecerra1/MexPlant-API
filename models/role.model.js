const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "El nombre es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  activated: {
    type: Boolean,
    default: true,
  },
});

RoleSchema.methods.toJSON = function () {
  const { __v, activated, ...role } = this.toObject();
  return role;
};

module.exports = model("Role", RoleSchema);
