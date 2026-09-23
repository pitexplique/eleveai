"use client";

// LA BARRE DE RECHERCHE DE L'EN-TÊTE (23/09/2026).
//
// Frédéric : « header inchangé : logo Frédéric + Ti Margo, et au centre barre
// de recherche, et à droite connexion inscription » — la construction d'IXL,
// dont la recherche est au milieu de la bande verte, sur toutes les pages.
//
// ⭐ CE N'EST PAS UNE RECHERCHE NEUVE. C'est celle du 09/09 (lib/matrice/
// suggestions.ts, née de la phrase de sa fille : « je voulais réviser les
// pourcentages, je ne savais pas où aller »), sortie du corps de la page et
// remontée dans l'en-tête. Trois lettres ouvrent la liste des notions du
// programme, le niveau est écrit à droite de chaque ligne, un clic va au coach.
//
// ⭐ ZÉRO OCTET DE PLUS AU CHARGEMENT : `notions.generated.ts` est déjà dans le
// paquet du navigateur, et l'index de `suggerer` se construit paresseusement, à
// la première frappe.
//
// ⛔ LE CHAMP NE SORT QUE SUR /accueil (voir `rechercheAuCentre` dans
// components/Header.tsx). Le mettre sur toutes les pages est la version IXL
// complète — décision à part, parce que ça coûte ~150 px de largeur dans un
// en-tête déjà mesuré au pixel sur toutes les pages du site.

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { track } from "@vercel/analytics";
import { suggerer } from "@/lib/matrice/suggestions";

export default function RechercheEntete({
  variante = "entete",
}: {
  /** « entete » : la pilule claire au centre du header. « page » : la même,
   *  pleine largeur, pour les téléphones où la zone du milieu est masquée. */
  variante?: "entete" | "page";
}) {
  const router = useRouter();
  const [saisie, setSaisie] = useState("");
  const [ouvert, setOuvert] = useState(false);
  const [surligne, setSurligne] = useState(0);
  const boite = useRef<HTMLDivElement>(null);

  // ⚠️ `profil` et `matiere` à `null` : dans l'en-tête, aucune classe n'est
  // allumée. Les deux ne servaient qu'à faire passer devant — la liste reste
  // juste, elle est seulement moins bien triée.
  const suggestions = useMemo(() => suggerer(saisie, null, null), [saisie]);
  const visible = ouvert && suggestions.length > 0;

  function aller(i: number) {
    const s = suggestions[i];
    if (!s) return;
    // ⭐ LE SEUL GESTE DE L'ACCUEIL QUI NE LAISSE AUCUNE TRACE AUTREMENT.
    // Les autres partent par un lien `?from=accueil`, donc `pages_vues` les
    // voit (app/api/track/route.ts). Celui-ci navigue par `router.push` vers
    // une URL du coach : la page d'arrivée est comptée, mais rien ne dirait
    // qu'on y est venu par la recherche plutôt qu'en cliquant une classe.
    // ⚠️ `rang` dit si la personne a pris la PREMIÈRE ligne ou a dû descendre :
    // c'est la mesure de la qualité du tri, pas seulement de l'usage.
    track("accueil_recherche", { rang: i + 1, niveau: s.niveauLabel });
    setOuvert(false);
    router.push(s.url);
  }

  return (
    <div
      ref={boite}
      /* ⚠️ LA LARGEUR EST MESURÉE, PAS CHOISIE. Un premier essai à
         `min(30rem,42vw)` faisait DÉBORDER l'en-tête à 800 px : la zone de
         gauche (marque + photo + Ti Margo) ~300 px, le champ 336, la zone de
         droite (Inscription + Connexion) ~180 — 816 pour 800, et toute la page
         partait en défilement horizontal. La piste `auto` de la grille ne
         rétrécit pas sous la largeur d'un champ : c'est donc au champ de le
         faire, par paliers. */
      className={
        variante === "entete"
          ? "relative w-[13rem] min-w-0 md:w-[17rem] lg:w-[24rem] xl:w-[30rem]"
          : "relative w-full"
      }
      onBlur={(e) => {
        if (!boite.current?.contains(e.relatedTarget as Node)) setOuvert(false);
      }}
    >
      <div className="flex items-center gap-2 rounded-full border border-[#1d1c16]/20 bg-white px-3 py-1.5 shadow-sm focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-600/25">
        <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
        <input
          value={saisie}
          onChange={(e) => {
            setSaisie(e.target.value);
            setOuvert(true);
            setSurligne(0);
          }}
          onFocus={() => setOuvert(true)}
          onKeyDown={(e) => {
            if (!visible) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setSurligne((s) => Math.min(s + 1, suggestions.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setSurligne((s) => Math.max(s - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              aller(surligne);
            } else if (e.key === "Escape") {
              setOuvert(false);
            }
          }}
          type="search"
          /* ⭐ LE LIBELLÉ EST CELUI QU'IL A TRANCHÉ LE 09/09 : ce que le champ
             EST, puis le geste le moins cher. ⚠️ Il ne tient pas en 375 px —
             défaut connu, laissé tel quel ici pour ne pas rouvrir sa décision
             dans une maquette. */
          placeholder="Cherche une notion : tape les 3 premières lettres"
          aria-label="Chercher une notion du programme"
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      {visible && (
        <ul
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
          role="listbox"
        >
          {suggestions.map((s, i) => (
            <li key={`${s.id}-${s.niveauLabel}`}>
              <button
                type="button"
                onMouseEnter={() => setSurligne(i)}
                onClick={() => aller(i)}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm ${
                  i === surligne ? "bg-teal-50" : "hover:bg-slate-50"
                }`}
              >
                {/* ⭐ Le libellé à gauche, le NIVEAU à droite : c'est toute la
                    leçon d'IXL — montrer « CM2 » et « 6e » sur deux lignes
                    voisines et laisser choisir. */}
                <span className="min-w-0 flex-1 text-slate-800">{s.label}</span>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                  {s.matiereLabel} · {s.niveauLabel}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
