"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  User,
  ListChecks,
  History,
  CreditCard,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: "/dashboard/presets", label: "Presets", icon: <ListChecks className="h-4 w-4" /> },
  { href: "/dashboard/historique", label: "Historique", icon: <History className="h-4 w-4" /> },
  { href: "/dashboard/abonnement", label: "Abonnement", icon: <CreditCard className="h-4 w-4" /> },
  { href: "/dashboard/parametres", label: "Paramètres", icon: <Settings className="h-4 w-4" /> },
  { href: "/dashboard/compte", label: "Compte", icon: <User className="h-4 w-4" /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function guard() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/auth/signin");
        return;
      }
      setEmail(data.user.email ?? null);
      setLoading(false);
    }
    guard();
  }, [router, supabase]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/accueil");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
        Chargement…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-900/40">
        <div className="px-4 py-4 border-b border-slate-800">
          <p className="text-sm font-semibold truncate">EleveAI</p>
          <p className="text-xs text-slate-400 truncate">{email}</p>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "text-slate-300 hover:bg-slate-900"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-3">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-900"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MOBILE */}
      <div className="md:hidden absolute top-3 left-3 z-50">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="rounded-xl border border-slate-700 bg-slate-900 p-2"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60">
          <aside className="w-64 h-full bg-slate-950 border-r border-slate-800 p-4">
            <p className="text-sm font-semibold truncate">EleveAI</p>
            <p className="text-xs text-slate-400 truncate mb-4">{email}</p>

            <nav className="space-y-1">
              {NAV.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium ${
                      active
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={logout}
              className="mt-6 w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-900"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </aside>
        </div>
      )}

      {/* CONTENT */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
