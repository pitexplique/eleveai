// Énigmes à projeter — seconde, notion espace_position_2de (l'aquarium cubique,
// le cube d'escalade du parc, le carton et son couvercle, le gâteau coupé en
// biais, piège des barres qui ne se croisent pas, défi des voiles tendues dans
// un cube de bambou). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";

// Le cube ABCDEFGH : ABCD en bas (A devant à gauche), E au-dessus de A.
const S: Record<string, [number, number]> = {
  A: [120, 330], B: [300, 330], C: [390, 270], D: [210, 270],
  E: [120, 150], F: [300, 150], G: [390, 90], H: [210, 90],
};
const decal: Record<string, [number, number, "start" | "end" | "middle"]> = {
  A: [-12, 22, "end"], B: [12, 22, "start"], C: [12, 18, "start"], D: [10, -10, "start"],
  E: [-12, 0, "end"], F: [12, 24, "start"], G: [12, 0, "start"], H: [-12, -4, "end"],
};
const ARETES = ["AB", "BC", "CD", "DA", "EF", "FG", "GH", "HE", "AE", "BF", "CG", "DH"];
const cachee = (a: string) => a.includes("D");

/** Le cube ; `couleurs` donne une couleur (et un trait épais) à certaines arêtes. */
const cube = (couleurs: Record<string, string> = {}, fond = "") => {
  let s = fond;
  for (const a of ARETES) {
    const [P, Q] = [S[a[0]], S[a[1]]];
    const c = couleurs[a];
    s += l(P[0], P[1], Q[0], Q[1], c ?? C.craie, c ? 6 : 3, cachee(a) ? "8 6" : "");
  }
  for (const n of Object.keys(S)) s += t(S[n][0] + decal[n][0], S[n][1] + decal[n][1], n, C.pale, 20, decal[n][2]);
  return s;
};
const face = (sommets: string, c: string, op = 0.2) =>
  `<path d="M${sommets.split("").map((n) => S[n].join(" ")).join(" L")} Z" fill="${c}" fill-opacity="${op}" stroke="none"/>`;

const aquarium = svg("Un cube ABCDEFGH ; l'arête AB est en rose",
  cube({ AB: C.rose }, face("ABFE", C.bleu, 0.08) + face("EFGH", C.bleu, 0.08)) + t(240, 400, `combien d'arêtes parallèles à [AB]${NB}?`, C.rose, 22));

const escalade = svg("Un cube ABCDEFGH ; la droite AB en rose et la droite EH en bleu",
  cube({ AB: C.rose, HE: C.bleu }) + t(240, 400, `(AB) et (EH)${NB}?`, C.rose, 26));

const carton = svg("Un cube ABCDEFGH ; le fond ABCD est coloré ; l'arête EF du couvercle est en rose",
  cube({ EF: C.rose }, face("ABCD", C.bleu, 0.3)) + t(240, 400, `(EF) et le fond (ABC)${NB}?`, C.rose, 24));

const gateau = svg("Un cube ABCDEFGH coupé par le plan qui passe par A, E, G et C",
  cube({}, face("AEGC", C.jaune, 0.4)) + l(S.A[0], S.A[1], S.C[0], S.C[1], C.jaune, 3, "8 6") + l(S.E[0], S.E[1], S.G[0], S.G[1], C.jaune, 4) +
    t(240, 400, `la forme de la coupe${NB}?`, C.rose, 26));

const fil = svg("Un cube de fil de fer ABCDEFGH ; l'arête AB est en rose",
  cube({ AB: C.rose }) + t(240, 400, `combien d'arêtes ni parallèles ni sécantes${NB}?`, C.rose, 20));

const voiles = svg("Un cube de bambou ; une voile triangulaire tendue entre B, D et E, et une voile rectangulaire entre A, B, G et H",
  cube({}, face("ABGH", C.bleu, 0.2) + face("BDE", C.jaune, 0.4)) + t(240, 400, `combien de plans par 3 sommets${NB}?`, C.rose, 22));

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "espace_position_2de",
  titre: "Énigmes de géométrie dans l'espace (positions)",
  description: "L'aquarium cubique, le cube d'escalade, le carton, le gâteau coupé en biais, le piège des barres qui ne se croisent pas, le défi des voiles dans un cube : droites et plans parallèles, sécants, non coplanaires, sections.",
  problemes: [
    {
      tag: "Énigme 1 · L'aquarium",
      titre: "Les arêtes parallèles",
      question: `Un aquarium a la forme d'un cube ABCDEFGH.<br><br><b>Combien d'autres arêtes</b> sont parallèles à l'arête [AB] ?`,
      reponse: `Les arêtes de même direction que [AB] : [DC], [EF] et [HG].<br><span class="big">3 arêtes</span>. Un cube a 3 directions, 4 arêtes par direction.`,
      consigne: "Dans un cube ABCDEFGH, combien d'arêtes (autres que [AB]) sont parallèles à [AB] ?",
      verification: { type: "courte", attendus: ["3"], unite: "arêtes" },
      dessin: aquarium,
    },
    {
      tag: "Énigme 2 · Le cube d'escalade",
      titre: "Deux barres qui s'évitent",
      question: `Au parc de jeux, une structure d'escalade est un cube ABCDEFGH en barres. On regarde la barre (AB), en bas devant, et la barre (EH), en haut à gauche.<br><br><b>Quelle est la position</b> de ces deux droites ?`,
      reponse: `Elles ne se coupent pas et n'ont pas la même direction.<br>Aucun plan ne les contient toutes les deux : elles sont <span class="big">non coplanaires</span>.`,
      consigne: "Dans le cube ABCDEFGH, quelle est la position des droites (AB) et (EH) ?",
      verification: { type: "qcm", choix: ["Non coplanaires", "Sécantes", "Parallèles"], bonne: 0 },
      dessin: escalade,
    },
    {
      tag: "Énigme 3 · Le carton",
      titre: "Le couvercle et le fond",
      question: `Un carton cubique ABCDEFGH a son fond ABCD. L'arête [EF] est un bord du couvercle.<br><br><b>Quelle est la position</b> de la droite (EF) et du plan du fond (ABC) ?`,
      reponse: `(EF) est parallèle à (AB), qui est dans le plan du fond.<br>Une droite parallèle à une droite d'un plan est parallèle à ce plan : <span class="big">ils sont parallèles</span>.`,
      consigne: "Dans le cube ABCDEFGH, quelle est la position de la droite (EF) et du plan (ABC) ?",
      verification: { type: "qcm", choix: ["Sécants", "Parallèles", "La droite est dans le plan"], bonne: 1 },
      dessin: carton,
    },
    {
      tag: "Énigme 4 · Le gâteau",
      titre: "Une coupe en biais",
      question: `Un gâteau a la forme d'un cube ABCDEFGH. On le coupe tout droit, de l'arête [AE] jusqu'à l'arête opposée [CG].<br><br><b>Quelle est la forme</b> de la coupe ?`,
      reponse: `La coupe est AEGC : deux côtés verticaux [AE] et [CG], deux diagonales de face [AC] et [EG].<br>Les côtés mesurent a et a√2 : c'est un <span class="big">rectangle</span>, pas un carré.`,
      consigne: "Quelle est la section du cube ABCDEFGH par le plan (AEG) ?",
      verification: { type: "qcm", choix: ["Un carré", "Un triangle", "Un rectangle"], bonne: 2 },
      dessin: gateau,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Ni parallèles, ni sécantes",
      sorte: "piege",
      question: `Un artiste fabrique un cube en fil de fer ABCDEFGH. Il regarde l'arête [AB].<br><br><b>Combien d'arêtes</b> ne la coupent pas <b>et</b> ne lui sont pas parallèles ?`,
      reponse: `12 arêtes : [AB] elle-même, 3 parallèles, 4 qui la touchent en A ou en B ([AD], [AE], [BC], [BF]).<br>Il reste 12 − 1 − 3 − 4 = <span class="big">4 arêtes</span> : [EH], [FG], [DH], [CG]. Dans l'espace, deux droites qui ne se coupent pas ne sont pas forcément parallèles !`,
      consigne: "Combien d'arêtes du cube ne coupent pas [AB] et ne lui sont pas parallèles ?",
      verification: { type: "courte", attendus: ["4"], unite: "arêtes" },
      dessin: fil,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les voiles dans le cube",
      sorte: "defi",
      question: `Dans un cube de bambou, on tend des voiles planes qui passent chacune par au moins <b>3 sommets</b> du cube.<br><br><b>Combien de plans différents</b> peut-on obtenir ?`,
      reponse: `Les 6 faces, les 6 rectangles diagonaux (comme ABGH), les 8 triangles qui coupent un coin (comme BDE).<br>6 + 6 + 8 = <span class="big">20 plans</span>. Vérification : 6 × 4 + 6 × 4 + 8 × 1 = 56 choix de 3 sommets, tous comptés.`,
      consigne: "Combien de plans différents passent par au moins 3 sommets d'un cube ?",
      verification: { type: "courte", attendus: ["20"], unite: "plans" },
      dessin: voiles,
    },
  ],
};

export default problemes;
