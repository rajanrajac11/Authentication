import { errorHandler } from "../utils/error.js";

const test = (req, res) => {
  res.status(200).json("This is working");
};
export default test;

//update user

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your account"));
  }
  try {
  } catch (error) {
    next(error);
  }
};
