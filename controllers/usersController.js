import UserModel from "../models/user.js";
import models from "../models/index.js";
const {User} = models;

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(req.body)
    console.log(user)
    return res.status(201).json({
      user
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createUser
