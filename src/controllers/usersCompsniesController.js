import models from "../models/index.js";

export const createUsersCompanies = async (req, res) => {
  try {
    const { UsersCompanies } = models;
    const usersCompanies = await UsersCompanies.create(req.body);
    return res.status(201).json({
      usersCompanies,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
