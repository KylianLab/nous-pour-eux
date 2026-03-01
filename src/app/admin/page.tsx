"use client";

import { useState, useEffect } from "react";
import { PawPrint, Check, Clock, Heart } from "lucide-react";
import type { Animal } from "@/lib/db";

export default function AdminDashboard() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/animals")
      .then((r) => r.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      });
  }, []);

  const stats = {
    total: animals.length,
    disponible: animals.filter((a) => a.status === "disponible").length,
    reserve: animals.filter((a) => a.status === "reserve").length,
    adopte: animals.filter((a) => a.status === "adopte").length,
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <PawPrint className="h-8 w-8 text-primary/30 animate-pulse mx-auto" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary mb-6">
        Tableau de bord
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total animaux",
            value: stats.total,
            icon: PawPrint,
            color: "bg-secondary/10 text-secondary",
          },
          {
            label: "Disponibles",
            value: stats.disponible,
            icon: Heart,
            color: "bg-green-100 text-green-700",
          },
          {
            label: "Réservés",
            value: stats.reserve,
            icon: Clock,
            color: "bg-yellow-100 text-yellow-700",
          },
          {
            label: "Adoptés",
            value: stats.adopte,
            icon: Check,
            color: "bg-blue-100 text-blue-700",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-secondary">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent animals */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-bold text-secondary">Derniers ajoutés</h3>
        </div>
        {animals.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Aucun animal enregistré pour le moment.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {animals.slice(0, 5).map((animal) => (
              <div
                key={animal.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-secondary">{animal.name}</p>
                  <p className="text-sm text-gray-500">
                    {animal.breed || "Race inconnue"} •{" "}
                    {animal.gender === "male" ? "Mâle" : "Femelle"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
