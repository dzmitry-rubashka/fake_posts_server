import models from '../models/index.js';

export const createCompany = async (req, res) => {
	try {
		const { Company } = models;
		const company = await Company.create(req.body);
		return res.status(201).json({
			company,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const getAllCompanies = async (req, res) => {
	try {
		const { Company } = models;
		const companies = await Company.findAll();
		return res.status(201).json(companies);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const getOneCompany = async (req, res) => {
	try {
		const { Company } = models;
		const company = await Company.findAll({ where: { id: req.params.id } })
		return res.status(201).json(company);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const deleteOneCompany = async (req, res) => {
	try {
		const { Company } = models;
		await Company.destroy({ where: { id: req.params.id } });
		return res.status(201).json(req.params.id);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const updateOneCompany = async (req, res) => {
	try {
		const { Company } = models;
		await Company.update(req.body, { where: { id: req.params.id } })
		return res.status(201).json(req.params.id);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

