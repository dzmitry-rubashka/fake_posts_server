import models from "../models/index.js";
import jwt from "jsonwebtoken";

export const createComment = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { Comment } = models;
    const user = await Comment.create(req.body);
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

export const getAllComments = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { Comment } = models;
    const comments = await Comment.findAll();
    return res.status(201).json(comments);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getOneComment = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { Comment } = models;
    const comment = await Comment.findAll({ where: { id: req.params.id } });
    return res.status(201).json(comment);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOneComment = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { Comment } = models;
    await Comment.destroy({ where: { id: req.params.id } });
    return res.status(201).json(req.params.id);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const updateOneComment = async (req, res) => {
  try {
    jwt.verify(req.cookies['Auth'], 'some_secret_key')
    const { Comment } = models;
    await Comment.update(req.body, { where: { id: req.params.id } });
    return res.status(201).json(req.params.id);
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'jwt must be provided') {
      return res.status(403).json({ error: 'jwt malformed - invalid auth' });
    }
    return res.status(500).json({ error: error.message });
  }
};
