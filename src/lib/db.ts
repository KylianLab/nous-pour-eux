import mysql from "mysql2/promise";

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

let pool: mysql.Pool;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function initDb() {
  const db = getPool();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS animals (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      species VARCHAR(50) NOT NULL DEFAULT 'chien',
      breed VARCHAR(255),
      age VARCHAR(50),
      gender ENUM('male', 'femelle') NOT NULL,
      size ENUM('petit', 'moyen', 'grand'),
      description TEXT,
      story TEXT,
      image_url VARCHAR(500),
      images JSON DEFAULT ('[]'),
      status ENUM('disponible', 'reserve', 'adopte') NOT NULL DEFAULT 'disponible',
      vaccinated TINYINT(1) DEFAULT 0,
      sterilized TINYINT(1) DEFAULT 0,
      microchipped TINYINT(1) DEFAULT 0,
      good_with_dogs TINYINT(1) DEFAULT 1,
      good_with_cats TINYINT(1) DEFAULT 0,
      good_with_kids TINYINT(1) DEFAULT 1,
      arrival_date DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}
