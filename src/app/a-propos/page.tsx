import { PawPrint, Heart, Users, Calendar, Target, Globe, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-secondary-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="h-4 w-4" />
            Qui sommes-nous ?
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Notre histoire
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Depuis 2015, nous nous battons pour offrir une seconde chance aux
            chiens des rues de Roumanie.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              <strong className="text-secondary">Nous pour Eux</strong> est une
              association sans but lucratif (asbl) fondée le{" "}
              <strong>1er février 2015</strong> en Belgique, dans le Brabant
              wallon. Notre mission est simple mais ambitieuse : sauver les
              chiens des rues de Roumanie et leur trouver un foyer aimant.
            </p>
            <p>
              Tout a commencé lorsque nos fondateurs ont découvert la réalité
              dramatique des chiens errants à Bucarest. Abandonnés, maltraités,
              exposés aux dangers de la rue, ces animaux n&apos;avaient aucune
              chance de survie sans aide. C&apos;est ce constat qui a donné
              naissance à notre association.
            </p>
            <p>
              Aujourd&apos;hui, notre refuge à Bucarest accueille des dizaines
              de chiens que nous sauvons quotidiennement. Chacun d&apos;entre eux
              reçoit les soins nécessaires avant d&apos;être proposé à
              l&apos;adoption en Belgique et en France.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-secondary text-center mb-12">
            Nos valeurs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Compassion",
                description:
                  "Chaque animal mérite d'être traité avec amour et respect. Nous croyons en la dignité de chaque être vivant.",
              },
              {
                icon: Shield,
                title: "Responsabilité",
                description:
                  "Nous assurons un suivi rigoureux de chaque adoption et garantissons que chaque chien trouve le bon foyer.",
              },
              {
                icon: Globe,
                title: "Transparence",
                description:
                  "Nous rendons compte de chaque euro reçu et de chaque action menée. La confiance de nos donateurs est primordiale.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 text-center"
              >
                <div className="bg-primary/10 rounded-xl p-3 w-fit mx-auto mb-5">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-secondary text-center mb-12">
            Notre parcours
          </h2>

          <div className="space-y-8">
            {[
              {
                year: "2015",
                title: "Création de l'asbl",
                description:
                  "Fondation de l'association Nous pour Eux en Brabant wallon. Premiers sauvetages de chiens en Roumanie.",
              },
              {
                year: "2016",
                title: "Ouverture du refuge",
                description:
                  "Ouverture de notre refuge à Bucarest, offrant un espace sécurisé pour accueillir les chiens sauvés.",
              },
              {
                year: "2018",
                title: "100ème adoption",
                description:
                  "Un cap symbolique franchi avec notre 100ème adoption réussie. La preuve que chaque effort compte.",
              },
              {
                year: "2020",
                title: "Campagnes de stérilisation",
                description:
                  "Lancement de campagnes de stérilisation en masse pour lutter contre la surpopulation canine à Bucarest.",
              },
              {
                year: "Aujourd'hui",
                title: "Plus de 500 vies sauvées",
                description:
                  "Notre association continue de grandir. Plus de 500 chiens ont été sauvés et des centaines ont trouvé un foyer.",
              },
            ].map((event) => (
              <div key={event.year} className="flex gap-6 items-start">
                <div className="bg-secondary text-white rounded-xl px-4 py-2 text-sm font-bold shrink-0 min-w-[110px] text-center">
                  {event.year}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-1">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Process */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-secondary text-center mb-4">
            Processus d&apos;adoption
          </h2>
          <p className="text-gray-600 text-center mb-12 text-lg">
            Voici les étapes pour accueillir votre nouveau compagnon
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                step: "1",
                title: "Prise de contact",
                description:
                  "Contactez-nous par email pour nous parler du chien qui vous intéresse. Nous vous poserons quelques questions sur votre mode de vie.",
              },
              {
                step: "2",
                title: "Échange & visite",
                description:
                  "Nous organisons un échange approfondi pour nous assurer que le chien correspond bien à votre situation familiale.",
              },
              {
                step: "3",
                title: "Préparation du voyage",
                description:
                  "Le chien est vacciné, stérilisé (si plus d'un an), pucé et muni de son passeport européen en ordre.",
              },
              {
                step: "4",
                title: "Arrivée & suivi",
                description:
                  "La puce est enregistrée par le vétérinaire en Belgique. Le DogID arrive sous 15 jours. Un suivi post-adoption est assuré.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-secondary">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PawPrint className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-secondary mb-4">
            Rejoignez l&apos;aventure
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Que ce soit en adoptant, en faisant un don ou en devenant bénévole,
            chaque geste compte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/adoption"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
            >
              <PawPrint className="h-5 w-5" />
              Voir les chiens
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
