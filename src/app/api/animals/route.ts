import { NextRequest, NextResponse } from "next/server";
import { getAllAnimals, createAnimal } from "@/lib/animals";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filters = {
    species: searchParams.get("species") || undefined,
    gender: searchParams.get("gender") || undefined,
    size: searchParams.get("size") || undefined,
    status: searchParams.get("status") || undefined,
  };

  const animals = await getAllAnimals(filters);
  return NextResponse.json(animals);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || !body.gender) {
    return NextResponse.json(
      { error: "Le nom et le genre sont requis" },
      { status: 400 }
    );
  }

  const animal = await createAnimal(body);
  return NextResponse.json(animal, { status: 201 });
}
