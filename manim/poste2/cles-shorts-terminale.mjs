// Les 12 cles de SHORT de la serie terminale (espace + produit scalaire), a ajouter a la
// main dans lib/videos/videos-r2.json.
// ⛔ NE PAS passer par generer-videos-r2.mjs : il efface les vidéos non declarees.
// ⭐ Les titres ne refutent AUCUNE carte de la question du short : c'est la regle du 26/11,
//    et deux titres de PAYSAGE la cassent deja (« ne fait pas 45° », « a son premier tiers »).
import fs from "node:fs";

const T = [
  ["espace-vecteurs",            "Trois nombres au lieu de deux \u2014 Vecteurs dans l'espace \u00b7 Tle sp\u00e9"],
  ["espace-repere-coordonnees",  "Le cube o\u00f9 tout vaut 0 ou 1 \u2014 Coordonn\u00e9es dans l'espace \u00b7 Tle sp\u00e9"],
  ["espace-droite-parametrique", "Un point, une direction, un curseur \u2014 Repr\u00e9sentation param\u00e9trique \u00b7 Tle sp\u00e9"],
  ["espace-plan-equation",       "Une seule ligne d\u00e9crit un plan entier \u2014 \u00c9quation cart\u00e9sienne \u00b7 Tle sp\u00e9"],
  ["espace-position-relative",   "Elles se croisent sur le dessin, jamais dans l'espace \u2014 Positions relatives \u00b7 Tle sp\u00e9"],
  ["espace-defi",                "Deux droites qui se croisent sur le dessin \u2014 Exercice type bac \u00b7 Tle sp\u00e9"],
  ["ps-espace-norme-distance",   "10 km \u00e0 plat et 1 de d\u00e9nivel\u00e9 \u2014 Norme et distance dans l'espace \u00b7 Tle sp\u00e9"],
  ["ps-espace-orthogonalite",    "Un produit scalaire nul, et un poteau pench\u00e9 \u2014 Orthogonalit\u00e9 dans l'espace \u00b7 Tle sp\u00e9"],
  ["ps-espace-plan-normal",      "La perpendiculaire est d\u00e9j\u00e0 \u00e9crite dans l'\u00e9quation \u2014 Vecteur normal \u00b7 Tle sp\u00e9"],
  ["ps-espace-angle",            "La grande diagonale d'un cube et une ar\u00eate \u2014 Calculer un angle dans l'espace \u00b7 Tle sp\u00e9"],
  ["ps-espace-calculer",         "Trois multiplications, une addition \u2014 Le produit scalaire dans l'espace \u00b7 Tle sp\u00e9"],
  ["ps-espace-defi",             "O\u00f9 le plan (BDE) coupe-t-il la grande diagonale ? \u2014 Exercice type bac \u00b7 Tle sp\u00e9"],
];

const P = "lib/videos/videos-r2.json";
const t = JSON.parse(fs.readFileSync(P, "utf8"));
const avant = Object.keys(t).length;
const nouvelles = [];
for (const [micro, titre] of T) {
  const paysage = t["terminale-" + micro];
  if (!paysage) throw new Error("paysage absent : " + micro);
  const base = `terminale/maths/geometrie/${micro}/eleveai-maths-terminale-${micro}-short`;
  for (const f of [base + ".mp4", base + ".vignette.webp"]) {
    if (!fs.existsSync("manim/sorties/" + f)) throw new Error("fichier absent en sortie : " + f);
  }
  const cle = "terminale-" + micro + "-short";
  if (t[cle]) throw new Error("cle deja presente : " + cle);
  t[cle] = {
    fichier: base + ".mp4",
    poster: null,                       // pas de PNG pour ces shorts : la vignette suffit
    vignette: base + ".vignette.webp",
    titre: titre + " #Shorts",
    short: true,
    youtube: null,                      // ⛔ aucune publication YouTube
    coach: paysage.coach,               // meme micro-competence que le paysage
  };
  nouvelles.push(cle);
}
fs.writeFileSync(P, JSON.stringify(t, null, 2) + "\n", "utf8");
console.log(`${avant} -> ${Object.keys(t).length} cles (+${nouvelles.length})`);
for (const c of nouvelles) console.log("  + " + c + "  " + t[c].titre);
