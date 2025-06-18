import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profileImage") {
      cb(null, "./public/Images");
    } else if (file.fieldname === "video") {
      cb(null, "./public/Videos");
    } else if (file.fieldname === "audio") {
      cb(null, "./public/Audio");
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
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {

    if (file.fieldname === "profileImage") {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed for image field"));
      }
    } else if (file.fieldname === "video") {
      if (!file.mimetype.startsWith("video/")) {
        return cb(new Error("Only video files are allowed for video field"));
      }
    } else if (file.fieldname === "audio") {
      if (!file.mimetype.startsWith("audio/")) {
        return cb(new Error("Only audio files are allowed for audio field"));
      }
    }
    cb(null, true);
  },
});

export { upload }
