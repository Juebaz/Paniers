const multer = require("multer");
const path = require("path");
const fs = require("fs");

const IMAGES_DIR = "./public/uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGES_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const deleteFile = (filename) => {
  fs.unlink(IMAGES_DIR + filename, (err) => {
    if (err) {
      console.error("deleteFileError: ", err);
      return;
    }
    return {};
  });
};

module.exports = { upload, deleteFile };
