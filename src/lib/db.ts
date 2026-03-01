import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "nous-pour-eux.db");

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initDb(db);
  }
  return db;
}

function initDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS animals (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      species TEXT NOT NULL DEFAULT 'chien',
      breed TEXT,
      age TEXT,
      gender TEXT NOT NULL CHECK(gender IN ('male', 'femelle')),
      size TEXT CHECK(size IN ('petit', 'moyen', 'grand')),
      description TEXT,
      story TEXT,
      image_url TEXT,
      images TEXT DEFAULT '[]',
      status TEXT NOT NULL DEFAULT 'disponible' CHECK(status IN ('disponible', 'reserve', 'adopte')),
      vaccinated INTEGER DEFAULT 0,
      sterilized INTEGER DEFAULT 0,
      microchipped INTEGER DEFAULT 0,
      good_with_dogs INTEGER DEFAULT 1,
      good_with_cats INTEGER DEFAULT 0,
      good_with_kids INTEGER DEFAULT 1,
      arrival_date TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

export type Animal = {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  age: string | null;
  gender: "male" | "femelle";
  size: "petit" | "moyen" | "grand" | null;
  description: string | null;
  story: string | null;
  image_url: string | null;
  images: string;
  status: "disponible" | "reserve" | "adopte";
  vaccinated: number;
  sterilized: number;
  microchipped: number;
  good_with_dogs: number;
  good_with_cats: number;
  good_with_kids: number;
  arrival_date: string | null;
  created_at: string;
  updated_at: string;
};
