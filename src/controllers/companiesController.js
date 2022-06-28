import models from "../models/index.js";
import jwt from "jsonwebtoken";

export const createCompany = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { Company } = models;
    const company = await Company.create(req.body);
    return res.status(201).json({
      company,
    });
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { Company } = models;
    const companies = await Company.findAll();
    return res.status(201).json(companies);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getOneCompany = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { Company } = models;
    const company = await Company.findAll({ where: { id: req.params.id } });
    return res.status(201).json(company);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOneCompany = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { Company } = models;
    await Company.destroy({ where: { id: req.params.id } });
    return res.status(201).json(req.params.id);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const updateOneCompany = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { Company } = models;
    await Company.update(req.body, { where: { id: req.params.id } });
    return res.status(201).json(req.params.id);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};
