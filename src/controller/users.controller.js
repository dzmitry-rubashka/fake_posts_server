import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "root",
  database: "fakepostsdb",
  host: "localhost",
  port: 5432,
});

class UsersController {
  async createUser(req, res) {
    const { name, username, email, address, phone, website, company } =
      req.body;
    const newUser = await pool.query(
      `INSERT INTO person (name, username, email, address, phone, website, company) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, username, email, address, phone, website, company]
    );
    res.json(newUser.rows[0]);
  }

  async getAllUsers(req, res) {
    const allUsers = await pool.query(`SELECT * FROM person`);
    res.json(allUsers.rows);
  }

  async getOneUser(req, res) {
    const id = req.params.id;
    const oneUser = await pool.query(`SELECT * FROM person where id = $1`, [
      id,
    ]);
    res.json(oneUser.rows[0]);
  }

  async updateUser(req, res) {
    const { id, name, username, email, address, phone, website, company } =
      req.body;
    const updatedUser = await pool.query(
      `UPDATE person set name = $1, username = $2, email = $3, address = $4, phone = $5, website = $6, company = $7 where id = $8 RETURNING *`,
      [name, username, email, address, phone, website, company, id]
    );
    res.json(updatedUser.rows[0]);
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    const deletedUser = await pool.query(`DELETE FROM person where id = $1`, [
      id,
    ]);
    res.json(deletedUser.rows[0]);
  }
}

export default new UsersController();
