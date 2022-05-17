import models from '../models/index.js';

const createUser = async (req, res) => {
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

export default createUser;
