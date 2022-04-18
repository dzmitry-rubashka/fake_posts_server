import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "root",
  database: "fakepostsdb",
  host: "localhost",
  port: 5432,
});

class CommentsController {
  async createComment(req, res) {
    const { postid, name, email, body } = req.body;
    const newComment = await pool.query(
      `INSERT INTO comment (postid, name, email, body) values ($1, $2, $3, $4) RETURNING *`,
      [postid, name, email, body]
    );
    res.json(newComment.rows[0]);
  }

  async getAllComments(req, res) {
    const comments = await pool.query(`SELECT * FROM comment`);
    res.json(comments.rows);
  }

  async getOneComment(req, res) {
    const id = req.params.id;
    const comment = await pool.query(`SELECT * FROM comment where id = $1`, [
      id,
    ]);
    res.json(comment.rows[0]);
  }

  async updateComment(req, res) {
    const { postid, id, name, email, body } = req.body;
    const updatedComment = await pool.query(
      `UPDATE post set postid = $1, name = $2, email = $3, body = $4where id = $5 RETURNING *`,
      [postid, id, name, email, body]
    );
    res.json(updatedComment.rows[0]);
  }

  async deleteComment(req, res) {
    const id = req.params.id;
    const comment = await pool.query(`DELETE FROM comment where id = $1`, [id]);
    res.json(comment.rows[0]);
  }
}

export default new CommentsController();
