import pkg from "pg";

import { pool } from "../commonComponents/dbPool.js";

const { Pool } = pkg;
const poolCreator = new Pool(pool);

class CommentsController {
  async createComment(req, res) {
    const { postid, name, email, body } = req.body;
    const newComment = await poolCreator.query(
      `INSERT INTO comment (postid, name, email, body) values ($1, $2, $3, $4) RETURNING *`,
      [postid, name, email, body]
    );
    res.json(newComment.rows[0]);
  }

  async getAllComments(req, res) {
    const comments = await poolCreator.query(`SELECT * FROM comment`);
    res.json(comments.rows);
  }

  async getOneComment(req, res) {
    const id = req.params.id;
    const comment = await poolCreator.query(`SELECT * FROM comment where id = $1`, [
      id,
    ]);
    res.json(comment.rows[0]);
  }

  async updateComment(req, res) {
    const { postid, id, name, email, body } = req.body;
    const updatedComment = await poolCreator.query(
      `UPDATE post set postid = $1, name = $2, email = $3, body = $4where id = $5 RETURNING *`,
      [postid, id, name, email, body]
    );
    res.json(updatedComment.rows[0]);
  }

  async deleteComment(req, res) {
    const id = req.params.id;
    const comment = await poolCreator.query(`DELETE FROM comment where id = $1`, [id]);
    res.json(comment.rows[0]);
  }
}

export default new CommentsController();