"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ChevronDown,
  Menu,
  LogIn,
  UserPlus,
  GraduationCap,
  Users,
  Briefcase,
  Home,
  Sparkles,
  Wand2,
  ClipboardList,
  UsersRound,
  BookOpenText,
  Mail,
  HelpCircle,
  UserRound,
  Handshake,
  LayoutDashboard,
  LogOut,
  Euro,
} from "lucide-react";

/* -----------------------------
   ROUTES AUTH
------------------------------ */
const AUTH_ROUTES = {
  signin: "/auth/signin",
  signup: "/auth/signup",
};

type NavItem = {
  href: string;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
};

type GroupKey = "atelier" | "profs" | "eleves" | "parents" | "etablissements" | "plus";

type Group = {
  key: GroupKey;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;

    function listener(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      const clickedInside = refs.some((r) => r.current?.contains(target));
      if (!clickedInside) handler();
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener, { passive: true });

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler, enabled]);
}

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-950/60 text-slate-200">
      {children}
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  // ✅ Auth state
  const [authLoading, setAuthLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Desktop dropdowns
  const [open, setOpen] = useState<null | GroupKey>(null);

  // Mobile
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<null | GroupKey>(null);

  // Refs (desktop dropdown containers)
  const refAtelier = useRef<HTMLDivElement>(null);
  const refProfs = useRef<HTMLDivElement>(null);
  const refEleves = useRef<HTMLDivElement>(null);
  const refParents = useRef<HTMLDivElement>(null);
  const refEtab = useRef<HTMLDivElement>(null);
  const refPlus = useRef<HTMLDivElement>(null);

  // Ref (global header, pour fermer le menu mobile si clic dehors)
  const headerRef = useRef<HTMLElement>(null);

  const closeAll = useCallback(() => {
    setOpen(null);
    setMenuOpen(false);
    setMobileOpen(null);
  }, []);

  const refsDesktop = useMemo(
    () => [refAtelier, refProfs, refEleves, refParents, refEtab, refPlus],
    [],
  );

  useOnClickOutside(refsDesktop, () => setOpen(null), open !== null);
  useOnClickOutside([headerRef], closeAll, menuOpen);

  // Escape = ferme tout
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeAll]);

  // ✅ Ferme les menus quand on change de route
  useEffect(() => {
    closeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ✅ Auth listener
  useEffect(() => {
    let mounted = true;

    async function init() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setUserEmail(data.user?.email ?? null);
      setAuthLoading(false);
    }

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  const isLoggedIn = !!userEmail;

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    router.replace("/accueil");
  }, [router, supabase]);

  function getRefForKey(key: GroupKey) {
    if (key === "atelier") return refAtelier;
    if (key === "profs") return refProfs;
    if (key === "eleves") return refEleves;
    if (key === "parents") return refParents;
    if (key === "etablissements") return refEtab;
    return refPlus;
  }

  // ✅ NAV (SEO-CLAIRES)
  const GROUPS: Group[] = useMemo(
    () => [
      {
        key: "atelier",
        label: "Atelier-IA",
        icon: <Wand2 className="h-4 w-4" />,
        items: [
          { href: "/atelier-IA", label: "Présentation", icon: <Wand2 className="h-4 w-4" /> },
          {
            href: "/atelier-IA/vision",
            label: "Vision pédagogique",
            icon: <Sparkles className="h-4 w-4" />,
          },
          {
            href: "/atelier-IA/programme",
            label: "Programme",
            icon: <ClipboardList className="h-4 w-4" />,
          },
        ],
      },
      {
        key: "profs",
        label: "Profs",
        icon: <Users className="h-4 w-4" />,
        items: [
          {
            href: "/espace-profs",
            label: "Générer des consignes IA (prompts)",
            icon: <Users className="h-4 w-4" />,
          },
          {
            href: "/blog/rediger-document-ia-friendly",
            label: "Devoir IA-friendly (article)",
            icon: <BookOpenText className="h-4 w-4" />,
            badge: "Nouveau",
          },
          {
            href: "/atelier-IA",
            label: "Atelier-IA en classe",
            icon: <Wand2 className="h-4 w-4" />,
          },
        ],
      },
      {
        key: "eleves",
        label: "Élèves",
        icon: <GraduationCap className="h-4 w-4" />,
        items: [
          { href: "/espace-eleves", label: "S’entraîner avec l’IA", icon: <GraduationCap className="h-4 w-4" /> },
          { href: "/concours-ia", label: "Changer ton monde", icon: <Sparkles className="h-4 w-4" /> },
          { href: "/parcours-creatifs", label: "Parcours créatifs", icon: <BookOpenText className="h-4 w-4" /> },
        ],
      },
      {
        key: "parents",
        label: "Parents",
        icon: <UsersRound className="h-4 w-4" />,
        items: [
          { href: "/espace-parents", label: "Comprendre & accompagner", icon: <UsersRound className="h-4 w-4" /> },
        ],
      },
      {
        key: "etablissements",
        label: "Établissements",
        icon: <Briefcase className="h-4 w-4" />,
        items: [
          { href: "/offre-pilote", label: "Offre pilote (8 semaines)", icon: <Sparkles className="h-4 w-4" /> },
          { href: "/tarifs#offre-etablissement", label: "Offre établissement", icon: <Euro className="h-4 w-4" /> },
          { href: "/contact", label: "Demander un devis", icon: <Mail className="h-4 w-4" /> },
        ],
      },
      {
        key: "plus",
        label: "Plus",
        icon: <ChevronDown className="h-4 w-4" />,
        items: [
          { href: "/accueil", label: "Accueil", icon: <Home className="h-4 w-4" /> },
          { href: "/tarifs", label: "Tarifs", icon: <Euro className="h-4 w-4" /> },
          { href: "/blog", label: "Blog", icon: <BookOpenText className="h-4 w-4" /> },
          { href: "/faq", label: "FAQ", icon: <HelpCircle className="h-4 w-4" /> },
          { href: "/contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
          { href: "/qui-sommes-nous", label: "Qui sommes-nous ?", icon: <UserRound className="h-4 w-4" /> },
          { href: "/partenaires", label: "Partenaires", icon: <Handshake className="h-4 w-4" /> },
        ],
      },
    ],
    [],
  );

  const desktopBtnClass = (active: boolean) =>
    `px-3 py-1.5 text-sm rounded-xl border flex items-center gap-2 transition ${
      active
        ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.35)]"
        : "border-slate-700 text-slate-200 hover:bg-slate-900 hover:border-slate-500"
    }`;

  const menuItemClass = (active: boolean) =>
    `px-4 py-2 text-sm flex items-center gap-3 ${
      active
        ? "text-emerald-200 bg-emerald-500/10 border-l-2 border-emerald-500"
        : "text-slate-300 hover:bg-slate-900"
    }`;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:py-4">
        {/* LOGO */}
        <Link href="/accueil" onClick={closeAll} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-900">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm sm:text-base font-semibold text-slate-50">EleveAI</span>
            <span className="text-[10px] sm:text-xs text-slate-400">
              IA pédagogique encadrée (Profs · Élèves · Parents)
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-2">
          {GROUPS.map((group) => {
            const ref = getRefForKey(group.key);
            const opened = open === group.key;
            const anyActive = group.items.some((it) => isActive(pathname, it.href));
            const activeBtn = opened || anyActive;

            return (
              <div key={group.key} ref={ref} className="relative">
                <button
                  type="button"
                  onClick={() => setOpen((v) => (v === group.key ? null : group.key))}
                  className={desktopBtnClass(activeBtn)}
                  aria-haspopup="menu"
                  aria-expanded={opened}
                >
                  <span className="text-slate-200">{group.icon}</span>
                  {group.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${opened ? "rotate-180" : ""}`}
                  />
                </button>

                {opened && (
                  <div className="absolute right-0 mt-2 w-96 rounded-xl border border-slate-700 bg-slate-950/95 shadow-xl backdrop-blur">
                    <div className="flex flex-col py-2">
                      {group.items.map((link) => {
                        const active = isActive(pathname, link.href);
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeAll}
                            className={menuItemClass(active)}
                          >
                            <IconWrap>{link.icon}</IconWrap>
                            <span className="flex-1">{link.label}</span>
                            {link.badge && (
                              <span className="inline-flex items-center rounded-full bg-emerald-600/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wide">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* TARIFS visible */}
          <Link
            href="/tarifs"
            className={`px-3 py-1.5 text-sm rounded-xl border transition ${
              isActive(pathname, "/tarifs")
                ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-100"
                : "border-slate-700 text-slate-200 hover:bg-slate-900 hover:border-slate-500"
            }`}
          >
            Tarifs
          </Link>
        </div>

        {/* RIGHT CTA (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-2">
          {!authLoading && !isLoggedIn && (
            <>
              <Link
                href={AUTH_ROUTES.signin}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-900 hover:border-slate-500"
              >
                <LogIn className="h-4 w-4" />
                Connexion
              </Link>
              <Link
                href={AUTH_ROUTES.signup}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-200 hover:bg-emerald-500/15 hover:border-emerald-400/60"
              >
                <UserPlus className="h-4 w-4" />
                Inscription
              </Link>
            </>
          )}

          {!authLoading && isLoggedIn && (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-200 hover:bg-emerald-500/15 hover:border-emerald-400/60"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-900 hover:border-slate-500"
                title={userEmail ?? "Déconnexion"}
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </>
          )}
        </div>

        {/* BURGER MOBILE */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md border border-slate-700 p-2 text-slate-200"
          onClick={() => {
            setMenuOpen((o) => !o);
            setOpen(null);
            setMobileOpen(null);
          }}
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 lg:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-2">
            {/* Mobile auth */}
            {!authLoading && !isLoggedIn && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={AUTH_ROUTES.signin}
                  onClick={closeAll}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900 hover:border-slate-500"
                >
                  <LogIn className="h-4 w-4" />
                  Connexion
                </Link>
                <Link
                  href={AUTH_ROUTES.signup}
                  onClick={closeAll}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-500/15 hover:border-emerald-400/60"
                >
                  <UserPlus className="h-4 w-4" />
                  Inscription
                </Link>
              </div>
            )}

            {!authLoading && isLoggedIn && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/dashboard"
                  onClick={closeAll}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-500/15 hover:border-emerald-400/60"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                    closeAll();
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900 hover:border-slate-500"
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </button>
              </div>
            )}

            {/* Groups accordéon */}
            {GROUPS.map((group) => {
              const opened = mobileOpen === group.key;
              const anyActive = group.items.some((it) => isActive(pathname, it.href));

              return (
                <div key={group.key} className="rounded-xl border border-slate-800 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileOpen((v) => (v === group.key ? null : group.key))}
                    className={`w-full px-3 py-2 text-sm flex items-center justify-between ${
                      opened || anyActive
                        ? "bg-emerald-500/10 text-emerald-100"
                        : "bg-slate-950 text-slate-200 hover:bg-slate-900"
                    }`}
                    aria-expanded={opened}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      {group.icon}
                      {group.label}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${opened ? "rotate-180" : ""}`}
                    />
                  </button>

                  {opened && (
                    <div className="flex flex-col">
                      {group.items.map((link) => {
                        const active = isActive(pathname, link.href);
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeAll}
                            className={`px-3 py-2 text-sm border-t border-slate-800 flex items-center gap-3 ${
                              active ? "text-emerald-200 bg-emerald-500/10" : "text-slate-300 hover:bg-slate-900"
                            }`}
                          >
                            <IconWrap>{link.icon}</IconWrap>
                            <span className="flex-1">{link.label}</span>
                            {link.badge && (
                              <span className="inline-flex items-center rounded-full bg-emerald-600/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 uppercase">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Tarifs (mobile visible) */}
            <Link
              href="/tarifs"
              onClick={closeAll}
              className={`px-3 py-2 text-sm rounded-xl border flex items-center justify-between ${
                isActive(pathname, "/tarifs")
                  ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-100"
                  : "border-slate-800 bg-slate-950 text-slate-200 hover:bg-slate-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <Euro className="h-4 w-4" />
                Tarifs
              </span>
              <span className="text-xs text-slate-400">→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
