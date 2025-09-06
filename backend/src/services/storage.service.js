import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

export const uploadFile = async (file, fileName) => {
  try {
    const result = await imagekit.upload({
      file: file,
      fileName: fileName,
    });
    return result;
  } catch (error) {
    console.error("Image upload failed:", error.message);
    throw error; // forward error to
  }
};
