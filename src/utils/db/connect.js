import pg from "pg";

const pool = new pg.Pool();

export const testConnection = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Database connection is successfull.");
  } catch (error) {
    console.log("❌ Database connection is failed.");
  }
};

export default pool;
