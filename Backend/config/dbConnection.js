import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);

    mongoose.connection.on("connected", () => {
      console.log("DB Connected");
    });

    mongoose.connection.on("error", (error) => {
      console.error("DB Connection Error:", error.message);
    });
  } catch (error) {
    console.error("DB connection error:", error.message);
    throw error;
  }
};

