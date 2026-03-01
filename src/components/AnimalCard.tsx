import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import type { Animal } from "@/lib/db";

function StatusBadge({ status }: { status: Animal["status"] }) {
  const styles = {
    disponible: "bg-green-100 text-green-800",
    reserve: "bg-yellow-100 text-yellow-800",
    adopte: "bg-blue-100 text-blue-800",
  };
  const labels = {
    disponible: "Disponible",
    reserve: "Réservé",
    adopte: "Adopté",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <Link
      href={`/adoption/${animal.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {animal.image_url ? (
          <Image
            src={animal.image_url}
            alt={animal.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-warm-bg flex items-center justify-center">
            <Heart className="h-16 w-16 text-primary/30" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <StatusBadge status={animal.status} />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
            {animal.name}
          </h3>
          <span className="text-sm text-gray-500">
            {animal.gender === "male" ? "♂" : "♀"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {animal.breed && (
            <span className="text-xs bg-warm-bg text-gray-600 px-2 py-1 rounded-full">
              {animal.breed}
            </span>
          )}
          {animal.age && (
            <span className="text-xs bg-warm-bg text-gray-600 px-2 py-1 rounded-full">
              {animal.age}
            </span>
          )}
          {animal.size && (
            <span className="text-xs bg-warm-bg text-gray-600 px-2 py-1 rounded-full">
              {animal.size === "petit"
                ? "Petit"
                : animal.size === "moyen"
                ? "Moyen"
                : "Grand"}
            </span>
          )}
        </div>

        {animal.description && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {animal.description}
          </p>
        )}

        <div className="mt-4 flex items-center text-xs text-gray-400">
          <MapPin className="h-3 w-3 mr-1" />
          Refuge de Bucarest
        </div>
      </div>
    </Link>
  );
}
