import UserModel from "../models/user.js";
import models from "../models/index.js";
import Database from "../src/database/index.js";
import dbConfig from "../config/database.js";
import environment from '../config/environment.js';
const {User} = models;

const createUser = async (req, res) => {

  try {

    const db = new Database(environment.nodeEnv, dbConfig);
    await db.connect();

    const user = await User.create(req.body);
    return res.status(201).json({
      user
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createUser
