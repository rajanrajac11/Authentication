import User from "../model/auth.model.js";
import bcrypt from "bcryptjs";
import errorHandler from "../util/errorHandler.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashedpassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedpassword,
    });
    res.status(200).json("User Created Successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User Not Found"));

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials."));

    const { password, ...rest } = validUser._doc;

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1800s",
    });
    res
      .cookie("access_tokent", token, { httpOnly: true })
      .status(200)
      .json(res);
  } catch (error) {
    next(error);
  }
};
