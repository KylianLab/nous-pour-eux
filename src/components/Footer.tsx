import Link from "next/link";
import { PawPrint, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary rounded-full p-2">
                <PawPrint className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Nous pour Eux</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Association de sauvetage de chiens des rues en Roumanie. Nous leur
              offrons une seconde chance et un foyer aimant en Belgique et en
              France.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/adoption"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  À l&apos;adoption
                </Link>
              </li>
              <li>
                <Link
                  href="/refuge"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Le Refuge
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary-light shrink-0" />
                <a
                  href="mailto:nous.pour.eux.asbl@gmail.com"
                  className="text-gray-300 hover:text-primary-light transition-colors"
                >
                  nous.pour.eux.asbl@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary-light shrink-0" />
                <span className="text-gray-300">
                  Chemin des Meuniers 3,
                  <br />
                  1367 Autre-Église, Belgique
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary-light shrink-0" />
                <span className="text-gray-300">N° Entreprise: 597.657.382</span>
              </li>
            </ul>
          </div>

          {/* Donation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nous soutenir</h3>
            <p className="text-gray-300 text-sm mb-3">
              Chaque don compte pour sauver une vie.
            </p>
            <div className="bg-secondary-dark rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">Compte bancaire</p>
              <p className="text-primary-light font-mono font-semibold text-sm">
                BE35 3632 1737 6737
              </p>
            </div>
            <Link
              href="/contact#don"
              className="mt-4 inline-block bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-semibold transition-colors text-sm"
            >
              Faire un don
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-600 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Nous pour Eux asbl. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
