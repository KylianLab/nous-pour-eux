import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Check,
  X,
  PawPrint,
  Calendar,
  Ruler,
  Dog,
  Mail,
} from "lucide-react";
import { getAnimalById, getAllAnimals } from "@/lib/animals";
import AnimalCard from "@/components/AnimalCard";

export const dynamic = "force-dynamic";

export default async function AnimalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const animal = getAnimalById(id);

  if (!animal) {
    notFound();
  }

  const otherAnimals = getAllAnimals({ status: "disponible" })
    .filter((a) => a.id !== animal.id)
    .slice(0, 3);

  const images: string[] = (() => {
    try {
      const parsed = JSON.parse(animal.images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const allImages = animal.image_url
    ? [animal.image_url, ...images]
    : images;

  const statusLabels = {
    disponible: { text: "Disponible à l'adoption", color: "bg-green-100 text-green-800" },
    reserve: { text: "Réservé", color: "bg-yellow-100 text-yellow-800" },
    adopte: { text: "Adopté", color: "bg-blue-100 text-blue-800" },
  };

  const status = statusLabels[animal.status];

  return (
    <>
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/adoption"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux adoptions
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-warm-bg">
                {allImages.length > 0 ? (
                  <Image
                    src={allImages[0]}
                    alt={animal.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Heart className="h-24 w-24 text-primary/20" />
                  </div>
                )}
              </div>
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {allImages.slice(1, 5).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden bg-warm-bg"
                    >
                      <Image
                        src={img}
                        alt={`${animal.name} ${i + 2}`}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-extrabold text-secondary mb-1">
                    {animal.name}
                  </h1>
                  <p className="text-gray-500">
                    {animal.breed || "Race inconnue"} •{" "}
                    {animal.gender === "male" ? "Mâle" : "Femelle"}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${status.color}`}>
                  {status.text}
                </span>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                {animal.age && (
                  <div className="bg-warm-bg rounded-xl p-4 text-center">
                    <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-sm font-semibold text-secondary">
                      {animal.age}
                    </p>
                    <p className="text-xs text-gray-500">Âge</p>
                  </div>
                )}
                {animal.size && (
                  <div className="bg-warm-bg rounded-xl p-4 text-center">
                    <Ruler className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-sm font-semibold text-secondary">
                      {animal.size === "petit"
                        ? "Petit"
                        : animal.size === "moyen"
                        ? "Moyen"
                        : "Grand"}
                    </p>
                    <p className="text-xs text-gray-500">Taille</p>
                  </div>
                )}
                <div className="bg-warm-bg rounded-xl p-4 text-center">
                  <Dog className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="text-sm font-semibold text-secondary">
                    {animal.species === "chien" ? "Chien" : animal.species}
                  </p>
                  <p className="text-xs text-gray-500">Espèce</p>
                </div>
                <div className="bg-warm-bg rounded-xl p-4 text-center">
                  <PawPrint className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="text-sm font-semibold text-secondary">
                    {animal.gender === "male" ? "♂ Mâle" : "♀ Femelle"}
                  </p>
                  <p className="text-xs text-gray-500">Genre</p>
                </div>
              </div>

              {/* Health */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-secondary mb-3">
                  Santé & soins
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      label: "Vacciné",
                      value: animal.vaccinated,
                    },
                    {
                      label: "Stérilisé",
                      value: animal.sterilized,
                    },
                    {
                      label: "Pucé",
                      value: animal.microchipped,
                    },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                        item.value
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.value ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compatibility */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-secondary mb-3">
                  Compatibilité
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Avec chiens", value: animal.good_with_dogs },
                    { label: "Avec chats", value: animal.good_with_cats },
                    { label: "Avec enfants", value: animal.good_with_kids },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                        item.value
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {item.value ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              {animal.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-secondary mb-3">
                    Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {animal.description}
                  </p>
                </div>
              )}

              {/* Story */}
              {animal.story && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-secondary mb-3">
                    Son histoire
                  </h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {animal.story}
                  </p>
                </div>
              )}

              {/* CTA */}
              {animal.status === "disponible" && (
                <div className="bg-warm-bg rounded-2xl p-6 mt-8">
                  <h3 className="text-lg font-bold text-secondary mb-2">
                    Intéressé par {animal.name} ?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Contactez-nous pour en savoir plus sur le processus
                    d&apos;adoption.
                  </p>
                  <a
                    href={`mailto:nous.pour.eux.asbl@gmail.com?subject=Adoption de ${animal.name}`}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    Nous contacter
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Animals */}
      {otherAnimals.length > 0 && (
        <section className="py-16 bg-warm-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-secondary mb-8">
              Découvrez aussi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherAnimals.map((a) => (
                <AnimalCard key={a.id} animal={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
