import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  PawPrint,
  Shield,
  Home,
  ArrowRight,
  Stethoscope,
  Users,
} from "lucide-react";
import { getAllAnimals } from "@/lib/animals";
import AnimalCard from "@/components/AnimalCard";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const recentAnimals = getAllAnimals({ status: "disponible" }).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary-dark to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-white">
            <PawPrint className="h-32 w-32 rotate-12" />
          </div>
          <div className="absolute bottom-20 right-10 text-white">
            <PawPrint className="h-48 w-48 -rotate-12" />
          </div>
          <div className="absolute top-40 right-1/3 text-white">
            <Heart className="h-24 w-24 rotate-6" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
              <PawPrint className="h-4 w-4" />
              Association de sauvetage depuis 2015
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Offrez une{" "}
              <span className="text-primary-light">seconde chance</span> à un
              compagnon fidèle
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Nous sauvons des chiens des rues de Roumanie pour leur trouver un
              foyer aimant en Belgique et en France. Chaque adoption est un acte
              d&apos;amour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/adoption"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                <Heart className="h-5 w-5" />
                Voir nos chiens
              </Link>
              <Link
                href="/a-propos"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors backdrop-blur-sm"
              >
                En savoir plus
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-warm-bg py-12 border-b border-warm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Chiens sauvés", icon: PawPrint },
              { number: "400+", label: "Adoptions réussies", icon: Home },
              { number: "10+", label: "Années d'action", icon: Shield },
              { number: "100+", label: "Bénévoles actifs", icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-extrabold text-secondary">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">
              Notre mission
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Sauver, soigner et offrir une nouvelle vie aux chiens des rues de
              Roumanie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Sauvetage",
                description:
                  "Nous secourons les chiens en détresse des rues de Bucarest, les soustrayant aux dangers et à la souffrance quotidienne.",
              },
              {
                icon: Stethoscope,
                title: "Soins vétérinaires",
                description:
                  "Chaque chien reçoit des soins complets : vaccinations, stérilisation, puce électronique et tout traitement nécessaire.",
              },
              {
                icon: Home,
                title: "Adoption",
                description:
                  "Nous trouvons des foyers aimants et responsables en Belgique et en France, avec un suivi post-adoption attentif.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all"
              >
                <div className="bg-primary/10 rounded-xl p-3 w-fit mb-5">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Animals */}
      {recentAnimals.length > 0 && (
        <section className="py-20 bg-warm-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-2">
                  Ils cherchent une famille
                </h2>
                <p className="text-gray-600 text-lg">
                  Nos derniers arrivants au refuge
                </p>
              </div>
              <Link
                href="/adoption"
                className="hidden md:inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
              >
                Voir tous
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/adoption"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
              >
                Voir tous les animaux
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-6 right-8 opacity-20">
              <PawPrint className="h-32 w-32" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Envie de faire la différence ?
              </h2>
              <p className="text-white/90 text-lg max-w-xl mx-auto mb-8">
                Que ce soit par un don, du bénévolat ou une adoption, chaque
                geste compte pour sauver une vie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact#don"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  Faire un don
                </Link>
                <Link
                  href="/adoption"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
                >
                  Adopter
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
