import multer from "multer";
import { allowedFileTypes, fileSizeLimit } from "../constants.js";

const storage = multer.diskStorage({
  destination: function (_, file, cb) {
    if (process.env.DEPLOYED_PLATFORM === "vercel") {
      return cb(null, "/tmp/");
    }
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: fileSizeLimit },
  fileFilter: function (_, file, cb) {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpeg and png files are allowed!"));
    }
  },
});
