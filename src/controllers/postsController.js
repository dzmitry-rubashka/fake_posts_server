import pkg from "pg";

import { pool } from "../commonComponents/dbPool.js";

const { Pool } = pkg;
const poolCreator = new Pool(pool);

class PostsController {
  async getAllPosts(req, res) {
    const allPosts = await poolCreator.query(`SELECT * FROM post`);
    res.json(allPosts.rows);
  }

  async getOnePost(req, res) {
    const id = req.params.id;
    const onePost = await poolCreator.query(
      `SELECT * FROM post where id = $1`,
      [id]
    );
    res.json(onePost.rows[0]);
  }

  async createPost(req, res) {
    const { user_id, title, body } = req.body;
    const newPost = await poolCreator.query(
      `INSERT INTO post (user_id, title, body) values ($1, $2, $3) RETURNING *`,
      [user_id, title, body]
    );
    res.json(newPost.rows[0]);
  }

  async updatePost(req, res) {
    const { id, title, body } = req.body;
    const updatedPost = await poolCreator.query(
      `UPDATE post set title = $1, body = $2 where id = $3 RETURNING *`,
      [title, body, id]
    );
    res.json(updatedPost.rows[0]);
  }

  async deletePost(req, res) {
    const id = req.params.id;
    const deletedPost = await poolCreator.query(
      `DELETE FROM post where id = $1`,
      [id]
    );
    res.json(deletedPost.rows[0]);
  }
}

export default new PostsController();
