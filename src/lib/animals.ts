import { getPool, initDb, type Animal } from "./db";
import { v4 as uuidv4 } from "uuid";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

let initialized = false;

async function ensureDb() {
  if (!initialized) {
    await initDb();
    initialized = true;
  }
}

export async function getAllAnimals(filters?: {
  species?: string;
  gender?: string;
  size?: string;
  status?: string;
}): Promise<Animal[]> {
  await ensureDb();
  const db = getPool();
  let query = "SELECT * FROM animals WHERE 1=1";
  const params: string[] = [];

  if (filters?.species) {
    query += " AND species = ?";
    params.push(filters.species);
  }
  if (filters?.gender) {
    query += " AND gender = ?";
    params.push(filters.gender);
  }
  if (filters?.size) {
    query += " AND size = ?";
    params.push(filters.size);
  }
  if (filters?.status) {
    query += " AND status = ?";
    params.push(filters.status);
  }

  query += " ORDER BY created_at DESC";
  const [rows] = await db.execute<RowDataPacket[]>(query, params);
  return rows as Animal[];
}

export async function getAnimalById(
  id: string
): Promise<Animal | undefined> {
  await ensureDb();
  const db = getPool();
  const [rows] = await db.execute<RowDataPacket[]>(
    "SELECT * FROM animals WHERE id = ?",
    [id]
  );
  return (rows[0] as Animal) || undefined;
}

export async function createAnimal(
  data: Omit<Animal, "id" | "created_at" | "updated_at">
): Promise<Animal> {
  await ensureDb();
  const db = getPool();
  const id = uuidv4();

  await db.execute(
    `INSERT INTO animals (id, name, species, breed, age, gender, size, description, story, image_url, images, status, vaccinated, sterilized, microchipped, good_with_dogs, good_with_cats, good_with_kids, arrival_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.name,
      data.species,
      data.breed,
      data.age,
      data.gender,
      data.size,
      data.description,
      data.story,
      data.image_url,
      data.images || "[]",
      data.status,
      data.vaccinated ? 1 : 0,
      data.sterilized ? 1 : 0,
      data.microchipped ? 1 : 0,
      data.good_with_dogs ? 1 : 0,
      data.good_with_cats ? 1 : 0,
      data.good_with_kids ? 1 : 0,
      data.arrival_date || null,
    ]
  );

  return (await getAnimalById(id))!;
}

export async function updateAnimal(
  id: string,
  data: Partial<Omit<Animal, "id" | "created_at" | "updated_at">>
): Promise<Animal | undefined> {
  await ensureDb();
  const db = getPool();
  const existing = await getAnimalById(id);
  if (!existing) return undefined;

  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value as string | number | null);
    }
  }

  if (fields.length === 0) return existing;

  values.push(id);

  await db.execute(
    `UPDATE animals SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  return getAnimalById(id);
}

export async function deleteAnimal(id: string): Promise<boolean> {
  await ensureDb();
  const db = getPool();
  const [result] = await db.execute<ResultSetHeader>(
    "DELETE FROM animals WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}
