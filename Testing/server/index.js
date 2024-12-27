import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());

dotenv.config();
app.use("/api/auth/", authRouter);

const port = process.env.PORT || 3000;
mongoose
  .connect(`${process.env.MONGO}`)
  .then(() => {
    app.listen(port, () => {
      console.log("Connected");
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed.");
    console.log(error);
  });

//middleware
app.use((err, req, res, next) => {
  const error = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
