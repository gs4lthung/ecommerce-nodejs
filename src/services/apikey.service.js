import apikeyModel from "../models/apikey.model.js";
const findById = async (key) => {
  // const newKey = await apikeyModel.create({ key, permissions: ["0000"] });
  // console.log(newKey);
  const objKey = await apikeyModel.findOne({ key, status: "true" }).lean();
  return objKey;
};

export default { findById };
