import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('leads.db');
export const db = drizzle(sqlite);

// Initialize database with tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    country TEXT,
    sector TEXT,
    timeline TEXT,
    message TEXT,
    source TEXT,
    metadata TEXT
  )
`);
