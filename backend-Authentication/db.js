import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to Neon PostgreSQL");

    // 1. Create table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(100) UNIQUE
      );
    `);
    console.log("✅ Table 'users' ready");

    // 2. Insert sample data
    await client.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING`,
      ["Arya", "arya@example.com"]
    );
    console.log("✅ Inserted user (or skipped if already exists)");

    // 3. Fetch data
    const res = await client.query("SELECT * FROM users");
    console.log("📦 Users in DB:", res.rows);

    await client.end();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

main();
