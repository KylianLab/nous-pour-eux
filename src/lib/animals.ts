import { getDb, type Animal } from "./db";
import { v4 as uuidv4 } from "uuid";

export function getAllAnimals(filters?: {
  species?: string;
  gender?: string;
  size?: string;
  status?: string;
}): Animal[] {
  const db = getDb();
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
  return db.prepare(query).all(...params) as Animal[];
}

export function getAnimalById(id: string): Animal | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM animals WHERE id = ?").get(id) as
    | Animal
    | undefined;
}

export function createAnimal(
  data: Omit<Animal, "id" | "created_at" | "updated_at">
): Animal {
  const db = getDb();
  const id = uuidv4();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO animals (id, name, species, breed, age, gender, size, description, story, image_url, images, status, vaccinated, sterilized, microchipped, good_with_dogs, good_with_cats, good_with_kids, arrival_date, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
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
    data.arrival_date,
    now,
    now
  );

  return getAnimalById(id)!;
}

export function updateAnimal(
  id: string,
  data: Partial<Omit<Animal, "id" | "created_at" | "updated_at">>
): Animal | undefined {
  const db = getDb();
  const existing = getAnimalById(id);
  if (!existing) return undefined;

  const fields: string[] = [];
  const values: unknown[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (fields.length === 0) return existing;

  fields.push("updated_at = ?");
  values.push(new Date().toISOString());
  values.push(id);

  db.prepare(
    `UPDATE animals SET ${fields.join(", ")} WHERE id = ?`
  ).run(...values);

  return getAnimalById(id);
}

export function deleteAnimal(id: string): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM animals WHERE id = ?").run(id);
  return result.changes > 0;
}
