import pkg from "pg";

import { pool } from "../commonComponents/dbPool.js";

const { Pool } = pkg;
const poolCreator = new Pool(pool);

class UsersController {
  //++
  async getAllUsers(req, res) {
    const allUsers = await poolCreator.query(`SELECT * FROM person`);
    res.json(allUsers.rows);
  }
  //++
  async getOneUser(req, res) {
    const id = req.params.id;
    const oneUser = await poolCreator.query(
      `SELECT * FROM person where id = $1`,
      [id]
    );
    res.json(oneUser.rows[0]);
  }

  async createUser(req, res) {
    const { name, username, email, address, phone, website, company } =
      req.body;
    console.log(req.body)
    const newUser = await poolCreator.query(
      `INSERT INTO person (name, username, email, address, phone, website, company) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, username, email, address, phone, website, company]
    );
    res.json(newUser.rows[0]);
  }

  async updateUser(req, res) {
    const { id, name, username, email, address, phone, website, company } =
      req.body;
    const updatedUser = await poolCreator.query(
      `UPDATE person set name = $1, username = $2, email = $3, address = $4, phone = $5, website = $6, company = $7 where id = $8 RETURNING *`,
      [name, username, email, address, phone, website, company, id]
    );
    res.json(updatedUser.rows[0]);
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    const deletedUser = await poolCreator.query(
      `DELETE FROM person where id = $1`,
      [id]
    );
    res.json(deletedUser.rows[0]);
  }
}

export default new UsersController();
