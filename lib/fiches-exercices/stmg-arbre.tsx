// Arbre pondéré des feuilles STMG (05/11/2026). Même appel que `arbre` de
// figures.tsx, mais il TIENT dans la largeur d'un téléphone (375 px) sans défiler :
// colonnes resserrées, et le cadre se règle sur l'étiquette la plus longue.
// figures.tsx sert aux autres classes, on n'y touche pas.
import type { ArbreProbaNoeud } from "@/lib/tutor-v4/types";

const LARGEUR_CAR = 10; // fontSize 14, poids 900 : mesuré, « Non » et « Germe » sortaient à 8,2
const HAUT = 20;
const RANG = 44;
const A_DROITE = 0.68; // où poser la probabilité sur une branche qui part d'un nœud
const A_GAUCHE = 0.42; // sur une branche qui part de la racine

type Place = { x: number; y: number; n: ArbreProbaNoeud; enfants: Place[] };

const profondeur = (n: ArbreProbaNoeud): number => 1 + Math.max(0, ...(n.enfants ?? []).map(profondeur));

export const arbre = (racine: ArbreProbaNoeud[]) => {
  const niveaux = Math.max(1, ...racine.map(profondeur));
  // Le mot d'un nœud intérieur est centré au-dessus du nœud : la colonne suivante
  // s'écarte assez pour que la probabilité posée sur la branche ne le touche pas.
  const interieurs = (ns: ArbreProbaNoeud[]): ArbreProbaNoeud[] => ns.flatMap((n) => (n.enfants?.length ? [n, ...interieurs(n.enfants)] : []));
  const motLong = Math.max(0, ...interieurs(racine).map((n) => (n.label ?? "").length));
  const pas = Math.max(niveaux >= 3 ? 72 : 92, Math.ceil(((motLong * LARGEUR_CAR) / 2 + 20) / (A_DROITE - 0.01)));
  const colonne = (d: number) => 8 + pas * d;

  let curseur = 0;
  const placer = (n: ArbreProbaNoeud, d: number): Place => {
    const x = colonne(d + 1);
    if (!n.enfants?.length) {
      const y = HAUT + (curseur + 0.5) * RANG;
      curseur += 1;
      return { x, y, n, enfants: [] };
    }
    const enfants = n.enfants.map((e) => placer(e, d + 1));
    return { x, y: (enfants[0].y + enfants[enfants.length - 1].y) / 2, n, enfants };
  };
  const places = racine.map((r) => placer(r, 0));
  const depart = { x: colonne(0), y: (places[0].y + places[places.length - 1].y) / 2 };

  const traits: { de: { x: number; y: number }; p: Place }[] = [];
  const noeuds: Place[] = [];
  const parcourir = (de: { x: number; y: number }, p: Place) => {
    traits.push({ de, p });
    noeuds.push(p);
    p.enfants.forEach((e) => parcourir(p, e));
  };
  places.forEach((p) => parcourir(depart, p));

  const feuilles = noeuds.filter((p) => !p.enfants.length);
  const droite = Math.max(...feuilles.map((p) => p.x + 7 + (p.n.label ?? "").length * LARGEUR_CAR));
  const largeur = Math.ceil(droite + 4);
  const hauteur = HAUT * 2 + curseur * RANG;

  return (
    <div className="mx-auto w-full max-w-[23rem] rounded-xl border border-slate-200 bg-white p-1.5 print:max-w-[14rem]">
      <svg viewBox={`0 0 ${largeur} ${hauteur}`} className="block h-auto w-full" role="img" aria-label="Arbre pondéré de probabilités">
        <circle cx={depart.x} cy={depart.y} r={4} fill="#0f172a" />
        {traits.map(({ de, p }, i) => {
          const t = de === depart ? A_GAUCHE : A_DROITE;
          return (
          <g key={i}>
            <line x1={de.x} y1={de.y} x2={p.x} y2={p.y} stroke="#475569" strokeWidth={1.8} />
            {p.n.proba ? (
              <text
                x={de.x + (p.x - de.x) * t}
                y={de.y + (p.y - de.y) * t - 5}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#2563eb"
                stroke="white"
                strokeWidth="3"
                paintOrder="stroke"
              >
                {p.n.proba}
              </text>
            ) : null}
          </g>
          );
        })}
        {noeuds.map((p, i) => {
          const feuille = !p.enfants.length;
          // Un nœud qu'on atteint en descendant : au-dessus de lui passe sa branche,
          // qui barrerait le mot (« Campagne »). Le mot se pose dessous, à sa gauche.
          const trait = traits.find((t) => t.p === p);
          const parDessous = !feuille && trait !== undefined && trait.de.y < p.y - 1;
          return (
            <text
              key={i}
              x={feuille ? p.x + 7 : parDessous ? p.x + 4 : p.x}
              y={feuille ? p.y + 5 : parDessous ? p.y + 18 : p.y - 13}
              textAnchor={feuille ? "start" : parDessous ? "end" : "middle"}
              fontSize="14"
              fontWeight="900"
              fill="#0f172a"
              stroke="white"
              strokeWidth="2.5"
              paintOrder="stroke"
            >
              {p.n.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
