import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
dotenv.config();

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
