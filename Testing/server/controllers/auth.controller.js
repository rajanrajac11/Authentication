import bcrypt from "bcryptjs";
import User from "../model/auth.model.js";
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json("User Created Successfully");
  } catch (error) {
    next(error);
  }
};
