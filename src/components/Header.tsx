"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Heart, PawPrint } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/adoption", label: "À l'adoption" },
  { href: "/refuge", label: "Le Refuge" },
  { href: "/a-propos", label: "Qui sommes-nous ?" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary rounded-full p-2 group-hover:bg-primary-dark transition-colors">
              <PawPrint className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-secondary">
                Nous pour Eux
              </span>
              <span className="block text-xs text-gray-500 -mt-1">asbl</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-gray-700 hover:text-primary font-medium rounded-lg hover:bg-warm-bg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact#don"
              className="ml-4 inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-semibold transition-colors"
            >
              <Heart className="h-4 w-4" />
              Faire un don
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary"
            aria-label="Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-gray-700 hover:text-primary font-medium rounded-lg hover:bg-warm-bg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact#don"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-full font-semibold transition-colors"
            >
              <Heart className="h-4 w-4" />
              Faire un don
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
