const { mongoose } = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });

    console.log("Conexión exitosa con MexPlantDB");
  } catch (error) {
    console.log(error);
    throw new Error("Conexión fallida con MexPlantDB");
  }
};

module.exports = {
  dbConnection,
};
