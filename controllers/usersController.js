import models from '../models/index.js';

export const createUser = async (req, res) => {
	try {
		const { User } = models;
		const user = await User.create(req.body);
		return res.status(201).json({
			user,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const { User } = models;
		const users = await User.findAll();
		return res.status(201).json(users);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const getOneUser = async (req, res) => {
	try {
		const { User } = models;
		const user = await User.findAll({ where: { id: req.params.id } })
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
		await User.update(req.body, { where: { id: req.params.id } })
		return res.status(201).json(req.params.id);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

