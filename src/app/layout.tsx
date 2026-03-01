import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nous pour Eux asbl - Sauvetage de chiens en Roumanie",
  description:
    "Association de sauvetage de chiens des rues en Roumanie. Adoptez un compagnon fidèle et offrez-lui une seconde chance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`min-h-screen flex flex-col bg-white ${nunito.className}`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
