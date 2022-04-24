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

  }

  async createCompany(req, res) {

  }

  async updateCompany(req, res) {

  }

}

export default new CompaniesController();