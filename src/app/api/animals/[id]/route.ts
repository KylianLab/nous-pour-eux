import { NextRequest, NextResponse } from "next/server";
import { getAnimalById, updateAnimal, deleteAnimal } from "@/lib/animals";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const animal = getAnimalById(id);
  if (!animal) {
    return NextResponse.json({ error: "Animal non trouvé" }, { status: 404 });
  }
  return NextResponse.json(animal);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const animal = updateAnimal(id, body);

  if (!animal) {
    return NextResponse.json({ error: "Animal non trouvé" }, { status: 404 });
  }
  return NextResponse.json(animal);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deleteAnimal(id);

  if (!deleted) {
    return NextResponse.json({ error: "Animal non trouvé" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
