import { v2 as Cloudinary } from "cloudinary";

const connectCloudinary = () => {
  const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUD_NAME } = process.env;

  if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET || !CLOUD_NAME) {
    console.log("Missing cloudinary configuration parameaters !");
  }
  try {
    Cloudinary.config({
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      cloud_name: CLOUD_NAME,
    });

  } catch (error) {
    console.error("Failed to config the cloudinary:", error.message);
  }
};

export default connectCloudinary;
