import User from "../models/user.model.js";

const signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json("User created successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default signup;
