// ─── Les schémas d'une fiche : des formules, pas des tableaux ─────────────────
//
// ⭐ LA DÉCISION, Frédéric le 10/09/2026 après avoir relu la fiche des vecteurs :
// « fiche vecteur parfaite, mieux vaut des schémas que des tableaux ».
// C'est une préférence GÉNÉRALE, et elle s'applique aux fiches à venir comme à
// celles qu'on reprend.
//
// ⚠️ Ce qu'elle ne dit pas : que les tableaux étaient faux. La veille, sur la
// fiche du repère : « il était clair, juste un problème de mettre en deux
// colonnes ». Un tableau coupé n'était pas un mauvais tableau — c'était un
// tableau à l'étroit, et la largeur a été corrigée séparément. Le schéma
// l'emporte parce qu'il DIT MIEUX, pas parce que l'autre était cassé.
//
// ⭐ LE PARTAGE, ET IL EST SIMPLE :
//   — une POSITION se dessine (un repère, une flèche, une courbe) ;
//   — un CALCUL s'écrit en formule, avec la partie qui porte l'idée EN COULEUR.
// Un tableau qui dit « la lettre du milieu disparaît » est une périphrase ; la
// formule avec le B en rouge le dit d'un coup d'œil.
//
// ⭐ ET ÇA RÈGLE LA NOTATION. `tableau_donnees` ne traverse jamais `TexteMath` :
// il ne sait écrire ni une flèche de vecteur, ni une fraction, ni un indice.
// Ici on rend du vrai KaTeX, donc la notation du cours.
// ⛔ La flèche Unicode U+20D7 n'est PAS un repli : mesurée dans un tableau du
// site, elle ajoute 9 px au lieu de 0 — elle ne se compose pas, elle s'affiche
// comme un glyphe séparé.
//
// ⚠️ UNE FORMULE RESTE COURTE. Le bloc est étroit et KaTeX ne coupe pas une
// formule ; au-delà d'une dizaine de symboles, passer à `egalites` et répartir
// sur plusieurs lignes.
import TexteMath from "@/components/fiches/TexteMath";

/** Les trois couleurs des schémas, communes à toutes les fiches. */
export const ROUGE = "#dc2626";
export const BLEU = "#2563eb";
export const VERT = "#059669";

/** Met en couleur la partie d'une formule qui porte l'idée. */
export const enRouge = (s: string) => `\\textcolor{${ROUGE}}{${s}}`;
export const enBleu = (s: string) => `\\textcolor{${BLEU}}{${s}}`;
export const enVert = (s: string) => `\\textcolor{${VERT}}{${s}}`;

/**
 * Une formule seule, centrée, avec sa légende.
 *
 * ⚠️ `tex` s'écrit SANS les dollars : ils sont ajoutés ici.
 */
export function egalite(tex: string, legende?: string) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-center">
      <div className="text-lg text-slate-900">
        <TexteMath>{`$${tex}$`}</TexteMath>
      </div>
      {legende ? (
        <p className="mt-2 text-xs leading-5 text-slate-500">{legende}</p>
      ) : null}
    </div>
  );
}

/**
 * Plusieurs lignes empilées : l'énoncé, les étapes, la conclusion.
 *
 * ⭐ La forme à préférer dès qu'un raisonnement a plus d'un temps — elle montre
 * le CHEMIN, là où un tableau ne montrait qu'un avant et un après.
 */
export function egalites(lignes: string[], legende?: string) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-center">
      {lignes.map((l, i) => (
        <div key={i} className={`text-lg text-slate-900 ${i ? "mt-2" : ""}`}>
          <TexteMath>{`$${l}$`}</TexteMath>
        </div>
      ))}
      {legende ? (
        <p className="mt-2 text-xs leading-5 text-slate-500">{legende}</p>
      ) : null}
    </div>
  );
}

/**
 * Deux ou trois cas côte à côte, chacun avec sa formule et son verdict.
 *
 * ⚠️ C'est le seul remplaçant honnête d'un petit tableau comparatif : les
 * colonnes deviennent des blocs qui S'EMPILENT quand la place manque, au lieu
 * de forcer une barre de défilement horizontale.
 *
 * ⚠️ `verdict` passe par `TexteMath` : il accepte donc des `$…$`.
 */
export function cas(
  entrees: { formule: string; verdict: string; couleur?: string }[],
  legende?: string,
) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      {/* ⛔ EN COLONNE D'ABORD, CÔTE À CÔTE ENSUITE — mesuré le 10/09/2026 en
          375 px. Avec `flex-wrap` seul, deux cartes se partageaient la largeur
          et tombaient à 93 px : cinq formules débordaient de leur bloc, dont
          les deux du chapitre (la moyenne fait 208 px, la distance 223 px).
          `flex-col sm:flex-row` donne à chaque carte TOUTE la largeur en poche,
          et ne les met côte à côte qu'à partir de 640 px. */}
      <div className="flex flex-col justify-center gap-2 sm:flex-row sm:flex-wrap">
        {entrees.map((e, i) => (
          <div
            key={i}
            className="min-w-[92px] flex-1 rounded-lg bg-white px-2 py-2 text-center ring-1 ring-slate-200"
          >
            <div className="text-base text-slate-900">
              <TexteMath>{`$${e.formule}$`}</TexteMath>
            </div>
            <div
              className="mt-1 text-xs font-semibold"
              style={{ color: e.couleur ?? "#334155" }}
            >
              <TexteMath>{e.verdict}</TexteMath>
            </div>
          </div>
        ))}
      </div>
      {legende ? (
        <p className="mt-2 text-center text-xs leading-5 text-slate-500">{legende}</p>
      ) : null}
    </div>
  );
}

/**
 * Une suite d'étapes reliées par des flèches — pour une méthode qui se déroule.
 *
 * ⚠️ Les étapes s'empilent verticalement en dessous de 2 éléments par ligne :
 * c'est voulu, une méthode se lit de haut en bas quand la place manque.
 */
export function etapes(suite: string[], legende?: string) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4">
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {suite.map((s, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 ? <span className="text-slate-400">→</span> : null}
            <span className="text-base text-slate-900">
              <TexteMath>{`$${s}$`}</TexteMath>
            </span>
          </span>
        ))}
      </div>
      {legende ? (
        <p className="mt-2 text-center text-xs leading-5 text-slate-500">{legende}</p>
      ) : null}
    </div>
  );
}
