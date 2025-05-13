import fs from "fs";

export const removeLocalFile = (localPath) => {
  fs.unlink(localPath, (err) => {
    if (err) console.log("Error while removing local files: ", err);
    else {
      console.log("Removed local file: ", localPath);
    }
  });
};

export const removeUnusedMulterImageFilesOnError = (req) => {
  try {
    const multerFile = req.file;
    const multerFiles = req.files;

    if (multerFile) {
      removeLocalFile(multerFile.path);
    }

    if (multerFiles) {
      const filesValueArray = Object.values(multerFiles);

      filesValueArray.map((fileFields) => {
        removeLocalFile(fileFields.path);
      });
    }
  } catch (error) {
    // fail silently
    console.log("Error while removing image files: ", error);
  }
};
