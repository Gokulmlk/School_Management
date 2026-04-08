import { pool } from "./db.js";

export async function initDB() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS schools (
      id          INT           NOT NULL AUTO_INCREMENT,
      name        VARCHAR(255)  NOT NULL,
      address     VARCHAR(500)  NOT NULL,
      latitude    FLOAT         NOT NULL,
      longitude   FLOAT         NOT NULL,
      created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  try {
    await pool.execute(createTableSQL);
    console.log("schools table ready");
  } catch (err) {
    console.error("Failed to initialize DB:", err.message);
    throw err;
  }
}