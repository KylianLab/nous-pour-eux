"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Upload, X, PawPrint } from "lucide-react";
import Image from "next/image";
import type { Animal } from "@/lib/db";

type AnimalFormData = {
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  description: string;
  story: string;
  image_url: string;
  images: string[];
  status: string;
  vaccinated: boolean;
  sterilized: boolean;
  microchipped: boolean;
  good_with_dogs: boolean;
  good_with_cats: boolean;
  good_with_kids: boolean;
  arrival_date: string;
};

function animalToFormData(animal: Animal): AnimalFormData {
  let images: string[] = [];
  try {
    const parsed = JSON.parse(animal.images);
    images = Array.isArray(parsed) ? parsed : [];
  } catch {
    images = [];
  }

  return {
    name: animal.name,
    species: animal.species,
    breed: animal.breed || "",
    age: animal.age || "",
    gender: animal.gender,
    size: animal.size || "",
    description: animal.description || "",
    story: animal.story || "",
    image_url: animal.image_url || "",
    images,
    status: animal.status,
    vaccinated: !!animal.vaccinated,
    sterilized: !!animal.sterilized,
    microchipped: !!animal.microchipped,
    good_with_dogs: !!animal.good_with_dogs,
    good_with_cats: !!animal.good_with_cats,
    good_with_kids: !!animal.good_with_kids,
    arrival_date: animal.arrival_date || "",
  };
}

const defaultFormData: AnimalFormData = {
  name: "",
  species: "chien",
  breed: "",
  age: "",
  gender: "male",
  size: "moyen",
  description: "",
  story: "",
  image_url: "",
  images: [],
  status: "disponible",
  vaccinated: false,
  sterilized: false,
  microchipped: false,
  good_with_dogs: true,
  good_with_cats: false,
  good_with_kids: true,
  arrival_date: "",
};

export default function AnimalForm({
  animal,
  mode,
}: {
  animal?: Animal;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [form, setForm] = useState<AnimalFormData>(
    animal ? animalToFormData(animal) : defaultFormData
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    return data.url;
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const url = await uploadImage(file);
        if (!form.image_url) {
          setForm((prev) => ({ ...prev, image_url: url }));
        } else {
          setForm((prev) => ({
            ...prev,
            images: [...prev.images, url],
          }));
        }
      }
    } catch {
      setError("Erreur lors de l'upload de l'image");
    }
    setUploading(false);
  }

  function removeImage(url: string) {
    if (url === form.image_url) {
      const [first, ...rest] = form.images;
      setForm((prev) => ({
        ...prev,
        image_url: first || "",
        images: rest,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        images: prev.images.filter((i) => i !== url),
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const body = {
      ...form,
      images: JSON.stringify(form.images),
      vaccinated: form.vaccinated ? 1 : 0,
      sterilized: form.sterilized ? 1 : 0,
      microchipped: form.microchipped ? 1 : 0,
      good_with_dogs: form.good_with_dogs ? 1 : 0,
      good_with_cats: form.good_with_cats ? 1 : 0,
      good_with_kids: form.good_with_kids ? 1 : 0,
    };

    try {
      const url =
        mode === "create" ? "/api/animals" : `/api/animals/${animal?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur serveur");
      }

      router.push("/admin/animaux");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
    setSaving(false);
  }

  const allImages = [
    ...(form.image_url ? [form.image_url] : []),
    ...form.images,
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-secondary mb-4">
          Informations générales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
              placeholder="Rex"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Espèce
            </label>
            <select
              value={form.species}
              onChange={(e) => setForm({ ...form, species: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
            >
              <option value="chien">Chien</option>
              <option value="chat">Chat</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Race
            </label>
            <input
              type="text"
              value={form.breed}
              onChange={(e) => setForm({ ...form, breed: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
              placeholder="Berger allemand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Âge
            </label>
            <input
              type="text"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
              placeholder="2 ans"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre *
            </label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
            >
              <option value="male">Mâle</option>
              <option value="femelle">Femelle</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Taille
            </label>
            <select
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
            >
              <option value="">Non spécifié</option>
              <option value="petit">Petit</option>
              <option value="moyen">Moyen</option>
              <option value="grand">Grand</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
            >
              <option value="disponible">Disponible</option>
              <option value="reserve">Réservé</option>
              <option value="adopte">Adopté</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date d&apos;arrivée
            </label>
            <input
              type="date"
              value={form.arrival_date}
              onChange={(e) =>
                setForm({ ...form, arrival_date: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-secondary mb-4">Photos</h3>

        {allImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {allImages.map((url, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={url}
                  alt={`Photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                    Principale
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors text-sm font-medium text-gray-700">
          <Upload className="h-4 w-4" />
          {uploading ? "Upload en cours..." : "Ajouter des photos"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-secondary mb-4">Description</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm resize-none"
              placeholder="Décrivez l'animal..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Son histoire
            </label>
            <textarea
              rows={4}
              value={form.story}
              onChange={(e) => setForm({ ...form, story: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm resize-none"
              placeholder="Racontez son histoire..."
            />
          </div>
        </div>
      </div>

      {/* Health & Compatibility */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-secondary mb-4">
          Santé & compatibilité
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { key: "vaccinated", label: "Vacciné" },
            { key: "sterilized", label: "Stérilisé" },
            { key: "microchipped", label: "Pucé" },
            { key: "good_with_dogs", label: "OK avec chiens" },
            { key: "good_with_cats", label: "OK avec chats" },
            { key: "good_with_kids", label: "OK avec enfants" },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={form[item.key as keyof AnimalFormData] as boolean}
                onChange={(e) =>
                  setForm({ ...form, [item.key]: e.target.checked })
                }
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          {saving ? (
            <PawPrint className="h-5 w-5 animate-pulse" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          {mode === "create" ? "Créer l'animal" : "Enregistrer"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/animaux")}
          className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
