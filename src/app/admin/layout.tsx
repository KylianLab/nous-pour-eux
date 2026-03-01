"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint, LayoutDashboard, Plus, List } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/admin/animaux", label: "Tous les animaux", icon: List },
    { href: "/admin/animaux/nouveau", label: "Ajouter", icon: Plus },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gray-50">
      <div className="bg-secondary text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <PawPrint className="h-6 w-6 text-primary-light" />
          <h1 className="text-lg font-bold">Administration</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <nav className="md:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary border-l-4 border-primary"
                      : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
