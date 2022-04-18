import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "root",
  database: "fakepostsdb",
  host: "localhost",
  port: 5432,
});

class PostsController {
  async createPost(req, res) {
    const { userid, title, body } = req.body;
    const newPost = await pool.query(
      `INSERT INTO post (userid, title, body) values ($1, $2, $3) RETURNING *`,
      [userid, title, body]
    );
    res.json(newPost.rows[0]);
  }

  async getAllPosts(req, res) {
    const allPosts = await pool.query(`SELECT * FROM post`);
    res.json(allPosts.rows);
  }

  async getOnePost(req, res) {
    const id = req.params.id;
    const onePost = await pool.query(`SELECT * FROM post where id = $1`, [id]);
    res.json(onePost.rows[0]);
  }

  async updatePost(req, res) {
    const { userid, id, title, body } = req.body;
    const updatedPost = await pool.query(
      `UPDATE post set userid = $1, title = $2, body = $3 where id = $4 RETURNING *`,
      [userid, id, title, body]
    );
    res.json(updatedPost.rows[0]);
  }

  async deletePost(req, res) {
    const id = req.params.id;
    const deletedPost = await pool.query(`DELETE FROM post where id = $1`, [
      id,
    ]);
    res.json(deletedPost.rows[0]);
  }
}

export default new PostsController();
