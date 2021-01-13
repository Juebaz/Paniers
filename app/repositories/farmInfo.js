const FarmInfo = require("../models/farmInfo");

const create = async (info) => {
  const model = await FarmInfo.create({
    name: info.name ? info.name : "",
    adress: info.adress ? info.adress : "",
    phone: info.phone ? info.phone : "",
    email: info.email ? info.email : "",
    msg: info.msg ? info.msg : "",
    facebook: info.facebook ? info.facebook : "",
    instagram: info.instagram ? info.instagram : "",
    pictures: info.pictures ? info.pictures : {},
  });
  return model;
};

const get = async () => {
  return FarmInfo.findOne({});
};

const update = async (info) => {
  let newInfo = await FarmInfo.findOneAndUpdate(
    {},
    {
      name: info.name ? info.name : "",
      adress: info.adress ? info.adress : "",
      phone: info.phone ? info.phone : "",
      email: info.email ? info.email : "",
      msg: info.msg ? info.msg : "",
      facebook: info.facebook ? info.facebook : "",
      instagram: info.instagram ? info.instagram : "",
      coverPic: info.coverPic ? info.coverPic : "",
      pictures: info.pictures ? info.pictures : {},
    },
    { new: true }
  );

  return newInfo;
};

module.exports = { create, get, update };
