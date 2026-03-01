"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PawPrint, Pencil, Trash2, Plus, Search } from "lucide-react";
import type { Animal } from "@/lib/db";

export default function AnimauxListPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchAnimals();
  }, []);

  async function fetchAnimals() {
    setLoading(true);
    const res = await fetch("/api/animals");
    const data = await res.json();
    setAnimals(data);
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Supprimer ${name} ? Cette action est irréversible.`)) return;
    setDeleting(id);
    await fetch(`/api/animals/${id}`, { method: "DELETE" });
    setAnimals((prev) => prev.filter((a) => a.id !== id));
    setDeleting(null);
  }

  const filtered = animals.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      (a.breed || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-secondary">Tous les animaux</h2>
        <Link
          href="/admin/animaux/nouveau"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <PawPrint className="h-8 w-8 text-primary/30 animate-pulse mx-auto" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <PawPrint className="h-8 w-8 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">Aucun animal trouvé.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Nom
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Race
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Genre
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Taille
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Statut
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((animal) => (
                  <tr key={animal.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-secondary">
                      {animal.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {animal.breed || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {animal.gender === "male" ? "Mâle" : "Femelle"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {animal.size
                        ? animal.size.charAt(0).toUpperCase() +
                          animal.size.slice(1)
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          animal.status === "disponible"
                            ? "bg-green-100 text-green-800"
                            : animal.status === "reserve"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {animal.status === "disponible"
                          ? "Disponible"
                          : animal.status === "reserve"
                          ? "Réservé"
                          : "Adopté"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/animaux/${animal.id}`}
                          className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-primary/10 transition-colors"
                          title="Modifier"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(animal.id, animal.name)}
                          disabled={deleting === animal.id}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
