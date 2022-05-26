import models from "../models/index.js";

export const createUser = async (req, res) => {
  const allCompanies = req.body.companies;

  try {
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
          // catchPhrase: item.catchPhrase,
          // bs: item.bs,
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
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
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
    return res.status(500).json({ error: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
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
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOneUser = async (req, res) => {
  try {
    const { User } = models;
    await User.destroy({ where: { id: req.params.id } });
    return res.status(201).json(req.params.id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateOneUser = async (req, res) => {
  try {
    const { User } = models;
    await User.update(req.body, { where: { id: req.params.id } });
    return res.status(201).json(req.params.id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
