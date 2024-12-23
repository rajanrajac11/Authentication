import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";

const app = express();
app.use(express.json());

dotenv.config();
app.use("/api/auth", router);

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
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
