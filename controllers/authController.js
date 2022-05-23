import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import models from '../models/index.js';

export const createLogin = async (req, res) => {

  try {
    const { User } = models;
    const user = await User.findAll({ where: { email: req.body.email } });
    // const password = await User.findAll({ where: { password: req.body.email } });
    const compare = bcrypt.compare(req.body.password, user[0].password);
    return res.status(201).json(compare);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};