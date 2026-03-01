import {
  Heart,
  Share2,
  Package,
  MapPin,
  PartyPopper,
  CreditCard,
  PawPrint,
  HandHeart,
} from "lucide-react";

const depots = [
  "Ramillies (siège social)",
  "Wauthier-Braine",
  "Auderghem (Bruxelles)",
  "Anderlecht (Bruxelles)",
  "Liège",
  "Strepy-Bracquegnies",
  "Gesves",
];

const collectes = [
  "Pièces rouges",
  "Croquettes (envoyées au refuge de Bucarest via notre transporteur)",
  "Paniers en bon état",
  "Jouets en plastique lavable",
  "Collerettes",
  "Produits d\u2019entretien",
  "Cages de transport",
];

const evenements = [
  "Journées à thèmes au siège social (Ramillies)",
  "Balades canines (Yvoir, Bois de Halle, Strepy-Bracquegnies)",
  "Soirées conviviales",
];

export default function NousAiderPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-secondary-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HandHeart className="h-4 w-4" />
            Solidarité
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Comment nous aider ?
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Il existe plein de façons de soutenir nos protégés. Chaque geste,
            même le plus petit, fait une vraie différence.
          </p>
        </div>
      </section>

      {/* Partager */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-primary/10 rounded-xl p-3 w-fit mb-5">
                <Share2 className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                Parlez de nous
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                La manière la plus simple de nous aider ? Partagez nos
                publications sur Facebook et parlez de l&apos;association autour
                de vous. Plus on est visibles, plus on sauve de vies.
              </p>
            </div>
            <div className="bg-warm-bg rounded-2xl p-8 border border-warm-border text-center">
              <Share2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="text-secondary font-semibold text-lg mb-2">
                Un simple partage peut changer une vie
              </p>
              <p className="text-gray-500 text-sm">
                Chaque partage augmente nos chances de trouver un foyer pour nos
                protégés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dons matériels */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-primary/10 rounded-xl p-3 w-fit mx-auto mb-5">
              <Package className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold text-secondary mb-4">
              Dons matériels
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Nous récoltons du matériel tout au long de l&apos;année. Notre
              transporteur ne repart jamais à vide vers Bucarest !
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Ce que nous récoltons */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-secondary mb-5">
                Ce que nous récoltons
              </h3>
              <ul className="space-y-3">
                {collectes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <PawPrint className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Points de dépôt */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-secondary mb-5">
                Points de dépôt
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Chez nos bénévoles dans toute la Belgique :
              </p>
              <ul className="space-y-3">
                {depots.map((lieu) => (
                  <li key={lieu} className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-600">{lieu}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Événements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-warm-bg rounded-2xl p-8 border border-warm-border">
              <h3 className="text-lg font-bold text-secondary mb-5">
                Nos rendez-vous
              </h3>
              <ul className="space-y-4">
                {evenements.map((evt) => (
                  <li key={evt} className="flex items-start gap-3">
                    <PartyPopper className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-600">{evt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-primary/10 rounded-xl p-3 w-fit mb-5">
                <PartyPopper className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-3xl font-extrabold text-secondary mb-4">
                Participez à nos événements
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Venez nous rencontrer tout au long de l&apos;année ! C&apos;est
                l&apos;occasion de discuter de nos protégés, de faire connaissance
                avec l&apos;équipe ou tout simplement de venir avec votre loulou.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Don financier */}
      <section id="don" className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-secondary mb-4">
              Faire un don financier
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Chaque contribution nous permet de sauver, soigner et nourrir les
              chiens du refuge. Votre générosité fait la différence.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <div className="text-center">
              <div className="bg-primary/10 rounded-xl p-4 w-fit mx-auto mb-6">
                <CreditCard className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">
                Virement bancaire
              </h3>
              <p className="text-gray-600 mb-6">
                Effectuez un don directement sur notre compte :
              </p>
              <div className="bg-warm-bg rounded-xl p-6 max-w-sm mx-auto mb-6">
                <p className="text-sm text-gray-500 mb-1">IBAN</p>
                <p className="text-2xl font-mono font-bold text-secondary tracking-wide">
                  BE35 3632 1737 6737
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Communication : &quot;Don Nous pour Eux&quot;
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Nous pour Eux asbl - N° Entreprise : 597.657.382
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                amount: "15\u20AC",
                description: "Nourrit un chien pendant 1 semaine",
                icon: PawPrint,
              },
              {
                amount: "50\u20AC",
                description: "Finance la vaccination d\u2019un chien",
                icon: Heart,
              },
              {
                amount: "150\u20AC",
                description: "Couvre la stérilisation d\u2019un chien",
                icon: PawPrint,
              },
            ].map((tier) => (
              <div
                key={tier.amount}
                className="bg-white rounded-2xl p-6 border border-gray-100 text-center"
              >
                <tier.icon className="h-6 w-6 text-primary mx-auto mb-3" />
                <p className="text-3xl font-extrabold text-primary mb-2">
                  {tier.amount}
                </p>
                <p className="text-gray-600 text-sm">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Merci */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PawPrint className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-secondary mb-4">
            Merci pour EUX
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Quelle que soit la manière dont vous choisissez de nous soutenir,
            sachez que chaque geste compte. Les chiens du refuge comptent sur
            vous.
          </p>
        </div>
      </section>
    </>
  );
}
