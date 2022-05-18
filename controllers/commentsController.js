import models from '../models/index.js';

export const createComment = async (req, res) => {
	try {
		const { Comment } = models;
		const user = await Comment.create(req.body);
		return res.status(201).json({
			user,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const getAllComments = async (req, res) => {
	try {
		const { Comment } = models;
		const comments = await Comment.findAll();
		return res.status(201).json(comments);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const getOneComment = async (req, res) => {
	try {
		const { Comment } = models;
		const comment = await Comment.findAll({ where: { id: req.params.id } })
		return res.status(201).json(comment);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const deleteOneComment = async (req, res) => {
	try {
		const { Comment } = models;
		await Comment.destroy({ where: { id: req.params.id } });
		return res.status(201).json(req.params.id);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const updateOneComment = async (req, res) => {
	try {
		const { Comment } = models;
		await Comment.update(req.body, { where: { id: req.params.id } })
		return res.status(201).json(req.params.id);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

