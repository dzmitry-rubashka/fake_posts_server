import pkg from "pg";

import { pool } from "../commonComponents/dbPool.js";

const { Pool } = pkg;
const poolCreator = new Pool(pool);

class CommentsController {
  //++
  async getAllComments(req, res) {
    const comments = await poolCreator.query(`SELECT * FROM comment`);
    res.json(comments.rows);
  }
  //++
  async getOneComment(req, res) {
    const id = req.params.id;
    const comment = await poolCreator.query(
      `SELECT * FROM comment where id = $1`,
      [id]
    );
    res.json(comment.rows[0]);
  }
  //++
  async deleteComment(req, res) {
    const id = req.params.id;
    const comment = await poolCreator.query(
      `DELETE FROM comment where id = $1`,
      [id]
    );
    res.json(comment.rows[0]);
  }

  async createComment(req, res) {
    const { post_id, user_id, name, email, body } = req.body;
    const newComment = await poolCreator.query(
      `INSERT INTO comment (post_id, user_id, name, email, body) values ($1, $2, $3, $4, $5) RETURNING *`,
      [post_id, user_id, name, email, body]
    );
    res.json(newComment.rows[0]);
  }

  async updateComment(req, res) {
    const { id, post_id, user_id, name, email, body } = req.body;
    const updatedComment = await poolCreator.query(
      `UPDATE post set post_id = $1, user_id = $2, name = $3, email = $4, body = $5 where id = $6 RETURNING *`,
      [post_id, user_id, name, email, body, id]
    );
    res.json(updatedComment.rows[0]);
  }
}

export default new CommentsController();
