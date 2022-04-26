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
    res.json(newRelations.rows);
  }
}

export default new CompanyPersonController();
