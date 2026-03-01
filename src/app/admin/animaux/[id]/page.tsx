"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PawPrint } from "lucide-react";
import AnimalForm from "@/components/AnimalForm";
import type { Animal } from "@/lib/db";

export default function EditAnimalPage() {
  const params = useParams();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/animals/${params.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Animal non trouvé");
        return r.json();
      })
      .then((data) => {
        setAnimal(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <PawPrint className="h-8 w-8 text-primary/30 animate-pulse mx-auto" />
      </div>
    );
  }

  if (error || !animal) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error || "Animal non trouvé"}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary mb-6">
        Modifier : {animal.name}
      </h2>
      <AnimalForm animal={animal} mode="edit" />
    </div>
  );
}
