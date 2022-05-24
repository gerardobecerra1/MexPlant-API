const allowedCollection = async (collection = "") => {
  const collections = [
    "classifications",
    "classificationsByUser",
    "plants",
    "plantsByClassification",
    "listPlantsByClassifications",
    "plantsByUser",
    "roles",
    "users",
    "usersByRole",
  ];

  if (!collections.includes(collection)) {
    throw new Error(
      `'${collection}' no se encuentra dentro de las coleciones permitidas, las cuales son: '${collections}'`
    );
  }
};

module.exports = {
  allowedCollection,
};
