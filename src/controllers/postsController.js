import models from "../models/index.js";

export const createPost = async (req, res) => {
  try {
    const { Post } = models;
    const user = await Post.create(req.body);
    return res.status(201).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const { Post } = models;
    const posts = await Post.findAll();
    return res.status(201).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const { Post } = models;
    const post = await Post.findAll({ where: { id: req.params.id } });
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOnePost = async (req, res) => {
  try {
    const { Post } = models;
    await Post.destroy({ where: { id: req.params.id } });
    return res.status(201).json(req.params.id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateOnePost = async (req, res) => {
  try {
    const { Post } = models;
    await Post.update(req.body, { where: { id: req.params.id } });
    return res.status(201).json(req.params.id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
