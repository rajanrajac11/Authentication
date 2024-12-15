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
