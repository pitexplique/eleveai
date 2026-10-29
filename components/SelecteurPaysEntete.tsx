"use client";

// LE CHOIX DU PAYS DANS L'EN-TÊTE (29/10/2026) — Frédéric : « retire de
// l'accueil la carte et la sélection des pays, et mets le sélecteur de pays
// dans l'en-tête ». Annoncé dès le 27/10, mis de côté pendant le gel de
// l'accueil, demandé par lui maintenant.
// ⚠️ UN DRAPEAU, PAS UN NOM : l'en-tête est mesuré au pixel. Le drapeau tient
// en 34 px ; le nom du pays s'écrit dans le menu et dans l'`aria-label`.
// ⛔ ET SOUS 640 px, PAS DE DRAPEAU DANS LA BARRE : mesuré à 360 px, il
// recouvrait Ti Margo (la paire photo + Ti Margo déborde déjà de sa colonne).
// Sur téléphone le choix vit dans le menu ☰ : `PaysTiroir`, plus bas.
// Même logique que le sélecteur du coach (components/SelecteurPays.tsx) : la
// France ouvre le coach habituel, un autre pays ouvre /pays/<pays>, et le choix
// est gardé dans le navigateur (préférence, rien de plus).

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { track } from "@vercel/analytics";
import { CLE_PAYS, PAYS, infoPays, lirePaysChoisi } from "@/lib/programmes-pays/pays";

const TOUS = [{ slug: "france", nom: "France" }, ...PAYS.map(({ slug, nom }) => ({ slug: slug as string, nom }))];

function Drapeau({ slug }: { slug: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/drapeaux/${slug}.svg`} alt="" width={20} height={15} className="h-[15px] w-5 shrink-0 rounded-[3px] object-cover ring-1 ring-black/10" />;
}

const lienPays = (slug: string) => (slug === "france" ? "/coach-ia/maths" : `/pays/${slug}`);

function garder(slug: string) {
  try {
    if (slug === "france") localStorage.removeItem(CLE_PAYS);
    else localStorage.setItem(CLE_PAYS, slug);
  } catch {}
  track("entete_pays", { pays: slug });
}

export default function SelecteurPaysEntete({ paper }: { paper: boolean }) {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [pays, setPays] = useState("france");
  const ref = useRef<HTMLDivElement>(null);

  // Le pays de la page /pays/<pays> l'emporte ; sinon le choix gardé.
  useEffect(() => {
    const dePage = infoPays(pathname?.match(/^\/pays\/([^/?#]+)/)?.[1])?.slug;
    setPays(dePage ?? lirePaysChoisi() ?? "france");
    setOuvert(false);
  }, [pathname]);

  useEffect(() => {
    if (!ouvert) return;
    const fermer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOuvert(false);
    };
    const echap = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("mousedown", fermer);
    document.addEventListener("keydown", echap);
    return () => {
      document.removeEventListener("mousedown", fermer);
      document.removeEventListener("keydown", echap);
    };
  }, [ouvert]);

  function choisir(slug: string) {
    setPays(slug);
    setOuvert(false);
    garder(slug);
  }

  const nom = TOUS.find((p) => p.slug === pays)?.nom ?? "France";

  // ⚠️ Sur téléphone le menu s'accroche à l'en-tête (`sticky`, donc
  // positionné), d'un bord à l'autre : ancré au drapeau, au milieu de l'écran,
  // il sortait à gauche. D'où `sm:relative` et non `relative`.
  return (
    <div ref={ref} className="sm:relative">
      <button
        type="button"
        onClick={() => setOuvert((v) => !v)}
        aria-expanded={ouvert}
        aria-haspopup="menu"
        aria-label={`Ton programme : ${nom}. Changer de pays`}
        title={`Programme : ${nom}`}
        className={`inline-flex items-center gap-0.5 rounded-full py-2 pl-1 pr-0.5 sm:px-1.5 transition ${
          paper ? "hover:bg-[#1d1c16]/10" : "hover:bg-white/15"
        }`}
      >
        <Drapeau slug={pays} />
        <ChevronDown className={`h-3.5 w-3.5 ${paper ? "text-[#1d1c16]/70" : "text-white/80"}`} aria-hidden="true" />
      </button>
      {ouvert && (
        <div
          role="menu"
          className="absolute inset-x-4 top-full z-50 mt-1 overflow-hidden sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-64 rounded-2xl border border-slate-200 bg-white py-1.5 text-slate-800 shadow-xl [color-scheme:light]"
        >
          <p className="px-4 pb-1 pt-1.5 text-xs font-black uppercase tracking-wide text-slate-500">Ton programme</p>
          {TOUS.map((p) => (
            <Link
              key={p.slug}
              role="menuitem"
              prefetch={false}
              href={lienPays(p.slug)}
              onClick={() => choisir(p.slug)}
              aria-current={p.slug === pays ? "true" : undefined}
              className={`flex items-center gap-2.5 px-4 py-2 text-sm font-bold transition hover:bg-slate-50 ${
                p.slug === pays ? "text-teal-700" : ""
              }`}
            >
              <Drapeau slug={p.slug} />
              {p.nom}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/** Le choix du pays dans le menu ☰ des téléphones : des drapeaux nommés, en pastilles. */
export function PaysTiroir({ paper, onChoisi }: { paper: boolean; onChoisi: () => void }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 ${paper ? "border-[#1d1c16]/15 bg-[#1d1c16]/5" : "border-white/10 bg-white/5"}`}>
      <p className={`mb-2 text-xs font-black uppercase tracking-wide ${paper ? "text-[#1d1c16]/60" : "text-white/60"}`}>Ton programme</p>
      <div className="flex flex-wrap gap-1.5">
        {TOUS.map((p) => (
          <Link
            key={p.slug}
            prefetch={false}
            href={lienPays(p.slug)}
            onClick={() => {
              garder(p.slug);
              onChoisi();
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white py-1 pl-1.5 pr-3 text-xs font-black text-slate-800"
          >
            <Drapeau slug={p.slug} />
            {p.nom.replace(/ \(.*\)$/, "")}
          </Link>
        ))}
      </div>
    </div>
  );
}
