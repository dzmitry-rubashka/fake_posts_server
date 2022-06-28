import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import models from "../models/index.js";

export const createLogin = async (req, res) => {
  try {
    const { User } = models;
    const user = await User.findAll({ where: { email: req.body.email } });
    const compare = await bcrypt.compare(req.body.password, user[0].password);
    if (compare) {
      const token = jwt.sign({ email: user[0].email }, "some_secret_key");
      res.cookie("Auth", token, {
        secure: false,
        maxAge: 100000000,
        httpOnly: true,
      });
      return res.status(201).json(token);
    } else {
      return res.status(403);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
