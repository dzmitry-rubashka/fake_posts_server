import models from "../models/index.js";
import jwt from "jsonwebtoken";


export const createUser = async (req, res) => {
  const allCompanies = req.body.companies;

  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { User, Company, UsersCompanies } = models;

    const user = await User.create({
      ...req.body,
      catchPhrase: req.body.catchPhrase,
      bs: req.body.bs,
    });
    for (const item of allCompanies) {
      const [company] = await Company.findOrCreate({
        where: { name: item.name, catchPhrase: item.catchPhrase, bs: item.bs },
        defaults: {
          name: item.name,
          catchPhrase: item.catchPhrase,
          bs: item.bs,
        },
      });

      await UsersCompanies.create({
        ...req.body,
        user_id: user.id,
        company_id: company.id,
      });
    }

    return res.status(201).json({
      user,
    });
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { User, Company } = models;
    const users = await User.findAll({
      include: [
        {
          model: Company,
          as: "companies",
          attributes: ["id", "name", "catchPhrase", "bs"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.status(201).json(users);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { User, Company } = models;
    const user = await User.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: Company,
          as: "companies",
          attributes: ["id", "name", "catchPhrase", "bs"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.status(201).json(user);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOneUser = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { User } = models;
    await User.destroy({ where: { id: req.params.id } });
    return res.status(201).json(req.params.id);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const updateOneUser = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { User } = models;
    await User.update(req.body, { where: { id: req.params.id } });
    return res.status(201).json(req.params.id);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};
