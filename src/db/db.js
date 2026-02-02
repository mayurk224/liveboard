import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

let connectionString = process.env.DATABASE_URL;

// Fix for PG warning: "The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'"
if (connectionString) {
  connectionString = connectionString
    .replace("sslmode=prefer", "sslmode=verify-full")
    .replace("sslmode=require", "sslmode=verify-full")
    .replace("sslmode=verify-ca", "sslmode=verify-full");
}

export const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool);
