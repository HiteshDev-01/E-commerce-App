import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/dbConnection.js";
import connectCloudinary from "./config/cloudinary.js";

// App config
const app = express();
const PORT = process.env.PORT || 8000;
connectDB();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://clothesmaniaadmin.vercel.app", // Allow requests only from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
    credentials: true, // Allow cookies and credentials if needed
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  res.send("API IS WORKING");
});

import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Connect to DB and start the server
app.listen(PORT, async () => {
  await connectDB();
  connectCloudinary();
  console.log(`Server is listening on ${PORT}`);
});
