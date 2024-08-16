// db.js
import 'dotenv/config';
import postgres from 'postgres';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const decodedPassword = decodeURIComponent(PGPASSWORD);

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: decodedPassword,
  port: 5432,
  ssl: 'require',
});
