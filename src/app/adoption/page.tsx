"use client";

import { useState, useEffect } from "react";
import { Search, Filter, PawPrint } from "lucide-react";
import AnimalCard from "@/components/AnimalCard";
import type { Animal } from "@/lib/db";

export default function AdoptionPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    gender: "",
    size: "",
    search: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAnimals();
  }, []);

  async function fetchAnimals() {
    setLoading(true);
    const res = await fetch("/api/animals?status=disponible");
    const data = await res.json();
    setAnimals(data);
    setLoading(false);
  }

  const filtered = animals.filter((a) => {
    if (filters.gender && a.gender !== filters.gender) return false;
    if (filters.size && a.size !== filters.size) return false;
    if (
      filters.search &&
      !a.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !(a.breed || "").toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-secondary-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-4">
            <PawPrint className="h-4 w-4" />À l&apos;adoption
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Nos chiens à l&apos;adoption
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Chacun de ces compagnons attend une famille aimante. Découvrez leur
            histoire et ouvrez-leur votre coeur.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filter Bar */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou race..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 hover:border-primary hover:text-primary transition-colors"
            >
              <Filter className="h-5 w-5" />
              Filtres
            </button>
          </div>

          {showFilters && (
            <div className="mb-8 p-6 bg-warm-bg rounded-2xl border border-warm-border flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genre
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) =>
                    setFilters({ ...filters, gender: e.target.value })
                  }
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                >
                  <option value="">Tous</option>
                  <option value="male">Mâle</option>
                  <option value="femelle">Femelle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taille
                </label>
                <select
                  value={filters.size}
                  onChange={(e) =>
                    setFilters({ ...filters, size: e.target.value })
                  }
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                >
                  <option value="">Toutes</option>
                  <option value="petit">Petit</option>
                  <option value="moyen">Moyen</option>
                  <option value="grand">Grand</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() =>
                    setFilters({ gender: "", size: "", search: "" })
                  }
                  className="px-4 py-2 text-sm text-primary hover:text-primary-dark font-medium"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <PawPrint className="h-12 w-12 text-primary/30 animate-pulse mx-auto mb-4" />
              <p className="text-gray-500">Chargement des animaux...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <PawPrint className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Aucun animal trouvé pour ces critères.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Essayez de modifier vos filtres ou revenez plus tard.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-6">
                {filtered.length} chien{filtered.length > 1 ? "s" : ""}{" "}
                disponible{filtered.length > 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
