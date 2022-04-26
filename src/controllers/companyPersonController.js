import pkg from "pg";

import { pool } from "../commonComponents/dbPool.js";

const { Pool } = pkg;
const poolCreator = new Pool(pool);

class CompanyPersonController {
  async createCompanyPersonRelation(req, res) {
    const { company_id, user_id } = req.body;
    const newRelations = await poolCreator.query(
      `INSERT INTO company_person (company_id, user_id) values ($1, $2) RETURNING *`,
      [company_id, user_id]
    );
    res.json(newRelations.rows[0]);
  }
  async deleteCompanyPersonRelation(req, res) {
    const { user_id, company_id } = req.body;
    const deletedRElation = await poolCreator.query(
      `DELETE FROM company_person where user_id = $1 and company_id = $2`,
      [user_id, company_id]
    );
    res.json(deletedRElation.rows[0]);
  }
}

export default new CompanyPersonController();
