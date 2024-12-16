import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 13);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json("User created successfully");
  } catch (error) {
    next(error);
  }
};
export default signup;
