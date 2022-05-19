const paramNumericPositive = async (value) => {
  const regex = /^[0-9]*$/;
  const arrayValue = [undefined, null, ""];

  if (!arrayValue.includes(value)) {
    if (!regex.test(value)) {
      throw new Error("Debe ser de tipo Numérico y no menor a 0");
    }
  }
};

const statusValidator = async (status = "") => {
  const arrayBool = ["0", "1", "true", "false"];
  if (status != "") {
    if (!arrayBool.includes(status)) {
      throw new Error(`Debe ser parte de los valores: ${arrayBool}`);
    }
  }
};

module.exports = {
  paramNumericPositive,
  statusValidator,
};
