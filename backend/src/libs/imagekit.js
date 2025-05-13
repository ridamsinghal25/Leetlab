import ImageKit from "imagekit";
import fs from "fs";

export const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const getImagekitAuthParams = () => {
  const authParams = imagekit.getAuthenticationParameters();

  return authParams;
};

const uploadFilesToImagekit = async (localFilePath, fileName) => {
  try {
    if (!localFilePath || !fileName) return null;

    const fileBuffer = fs.readFileSync(localFilePath);

    const base64 = fileBuffer.toString("base64");

    const uploadFile = await imagekit.upload({
      file: base64,
      fileName: fileName,
      useUniqueFileName: true,
    });

    fs.unlinkSync(localFilePath);

    return uploadFile;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("Error uploading files to ImageKit:", error);
    return null;
  }
};

const deleteFilesFromImagekit = async (fileId) => {
  try {
    if (!fileId) return null;

    await imagekit.deleteFile(fileId);

    return true;
  } catch (error) {
    console.error("Error deleting files from ImageKit:", error);
    return null;
  }
};

export { deleteFilesFromImagekit, uploadFilesToImagekit };
