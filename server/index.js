import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/user/", userRouter);
app.use("/api/auth/", authRouter);

app.get("/hello", (req, res) => {
  res.send("Hello world");
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(3000, () => {
      console.log("Connected");
      console.log("Server is running at port 3000");
    });
  })
  .catch((error) => {
    console.log("Connection failed.");
  });

//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error.";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
