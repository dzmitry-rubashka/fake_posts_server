import pkg from "pg";

import { pool } from "../commonComponents/dbPool.js";

const { Pool } = pkg;
const poolCreator = new Pool(pool);

class CompaniesController {
  async getAllCompanies(req, res) {
    const companies = await poolCreator.query(`SELECT * FROM company`);
    res.json(companies.rows);
  }

  async getOneCompany(req, res) {
    const id = req.params.id;
    const company = await poolCreator.query(
      `SELECT * FROM company where id = $1`,
      [id]
    );
    res.json(company.rows[0]);
  }

  async deleteCompany(req, res) {
    const id = req.params.id;
    const company = await poolCreator.query(
      `DELETE FROM company where id = $1`,
      [id]
    );
    res.json(company.rows[0]);
  }

  async createCompany(req, res) {
    const { name, catchphrase, bs } = req.body;
    const newCompany = await poolCreator.query(
      `INSERT INTO company (name, catchphrase, bs) values ($1, $2, $3) RETURNING *`,
      [name, catchphrase, bs]
    );
    res.json(newCompany.rows[0]);
  }

  async updateCompany(req, res) {
    const { name, catchphrase, bs, id } = req.body;
    const updatedCompany = await poolCreator.query(
      `UPDATE company set name = $1, catchphrase = $2, bs = $3 where id = $4 RETURNING *`,
      [name, catchphrase, bs, id]
    );
    res.json(updatedCompany.rows[0]);
  }
}

export default new CompaniesController();
