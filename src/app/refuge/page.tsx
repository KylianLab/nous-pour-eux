import {
  PawPrint,
  Home,
  Stethoscope,
  Shield,
  Heart,
  Baby,
  Syringe,
} from "lucide-react";
import Link from "next/link";

export default function RefugePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-secondary-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Home className="h-4 w-4" />
            Le Refuge
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Notre refuge à Bucarest
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Un havre de sécurité et d&apos;espoir pour les chiens des rues
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed">
              Le refuge <strong>&quot;Nous pour Eux&quot;</strong> se trouve à Bucarest, en
              Roumanie. C&apos;est un lieu de sécurité et d&apos;espoir pour les chiens
              qui ont connu la dureté de la vie dans les rues. Chaque jour,
              notre équipe sur place se mobilise pour offrir à ces animaux les
              soins et l&apos;amour qu&apos;ils méritent.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-secondary text-center mb-12">
            Nos installations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Espaces de quarantaine",
                description:
                  "Des pièces dédiées à la quarantaine pour garantir la santé de tous les pensionnaires et prévenir la propagation de maladies.",
              },
              {
                icon: Baby,
                title: "Espaces chiots",
                description:
                  "Des zones spécialement aménagées pour les chiots et petits compagnons, leur offrant un environnement sécurisé et chaleureux.",
              },
              {
                icon: Stethoscope,
                title: "Salle vétérinaire",
                description:
                  "Une salle vétérinaire entièrement équipée dédiée aux soins, aux stérilisations et aux traitements médicaux.",
              },
              {
                icon: Home,
                title: "Enclos extérieurs",
                description:
                  "Des espaces de détente en plein air où les chiens peuvent courir, jouer et socialiser en toute sécurité.",
              },
              {
                icon: Heart,
                title: "Zone d'accueil",
                description:
                  "Un espace dédié à l'accueil des nouveaux arrivants, avec une attention particulière portée aux chiens traumatisés.",
              },
              {
                icon: Syringe,
                title: "Campagnes de stérilisation",
                description:
                  "Nous contribuons à la maîtrise de la population canine locale en proposant des campagnes de stérilisation en masse.",
              },
            ].map((facility) => (
              <div
                key={facility.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary/10 rounded-xl p-3 w-fit mb-5">
                  <facility.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">
                  {facility.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {facility.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Life */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-secondary text-center mb-12">
            Le quotidien au refuge
          </h2>

          <div className="space-y-8">
            {[
              {
                time: "Matin",
                title: "Soins & alimentation",
                description:
                  "Chaque journée commence par une tournée de soins. Nos bénévoles vérifient l'état de santé de chaque chien, distribuent les repas et les médicaments nécessaires.",
              },
              {
                time: "Journée",
                title: "Socialisation & exercice",
                description:
                  "Les chiens profitent de sorties dans les enclos extérieurs. C'est aussi le moment des séances de socialisation, essentielles pour leur future adoption.",
              },
              {
                time: "Après-midi",
                title: "Soins vétérinaires",
                description:
                  "Les consultations vétérinaires ont lieu l'après-midi : vaccinations, stérilisations, traitements contre les parasites et suivi des chiens en convalescence.",
              },
              {
                time: "Soir",
                title: "Repos & câlins",
                description:
                  "En fin de journée, chaque chien rejoint son espace pour la nuit. Les bénévoles prennent le temps d'offrir attention et réconfort à chacun.",
              },
            ].map((item) => (
              <div
                key={item.time}
                className="flex gap-6 items-start"
              >
                <div className="bg-primary text-white rounded-xl px-4 py-2 text-sm font-bold shrink-0 min-w-[100px] text-center">
                  {item.time}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PawPrint className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-secondary mb-4">
            Aidez-nous à sauver plus de vies
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            Vos dons permettent de maintenir le refuge, nourrir les chiens et
            financer les soins vétérinaires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact#don"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
            >
              <Heart className="h-5 w-5" />
              Faire un don
            </Link>
            <Link
              href="/adoption"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
            >
              <PawPrint className="h-5 w-5" />
              Voir les chiens
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
