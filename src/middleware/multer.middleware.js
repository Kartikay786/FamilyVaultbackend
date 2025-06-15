import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profileImage") {
      cb(null, "./public/Images");
    } else {
      cb(null, "./public/Images");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, 
  fileFilter: function (req, file, cb) {
   
    if (file.fieldname === "profileImage") {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed for image field"));
      }
    } 
    cb(null, true);
  },
});

export {upload}
