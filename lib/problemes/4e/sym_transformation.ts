// Énigmes à projeter — 4e, notion sym_transformation (le mot écrit à l'envers
// sur l'ambulance : symétrie axiale, le tapis : symétrie centrale, le drone :
// translation, l'horloge de la gare : rotation d'un quart de tour, piège du
// logo de Lina : OA = OA' ne suffit pas pour une symétrie centrale, défi du
// moulin à vent en papier : une rotation conserve les aires).
// Repère commun : 40 px par unité, X = 60 + 40x, Y = 370 − 40y (x de 0 à 9,
// y de 0 à 7). Images calculées point par point :
// tapis O(5 ; 4), A(2 ; 5) → A'(2×5 − 2 ; 2×4 − 5) = (8 ; 3) ;
// drone : flèche de D(1 ; 1) à D'(6 ; 3), soit +5 et +2 ; E(2 ; 4) → E'(7 ; 6) ;
// horloge O(4 ; 3), B(6 ; 6) : de O à B, +2 et +3 ; quart de tour horaire,
// (a ; b) → (b ; −a) = (3 ; −2) → B'(7 ; 1) (OB = OB' = √13, angle droit).
// Ambulance : L tracé point par point, image par l'axe x = 240 : x' = 480 − x.
// Logo : OA = OA' = 140 px, angle AOA' = 120° (pas 180°).
// Moulin : 18 px par cm, triangle rectangle 8 cm × 6 cm, 4 quarts de tour autour de O.
// 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;
const rad = (deg: number) => (deg * Math.PI) / 180;
type P = { x: number; y: number };

// Le repère : 40 px par unité.
const X = (x: number) => 60 + 40 * x;
const Y = (y: number) => 370 - 40 * y;
const repere = () => {
  let g = "";
  for (let i = 0; i <= 9; i++) g += `M${X(i)} ${Y(0)} L${X(i)} ${Y(7)} `;
  for (let j = 0; j <= 7; j++) g += `M${X(0)} ${Y(j)} L${X(9)} ${Y(j)} `;
  let n = "";
  for (let i = 1; i <= 9; i++) n += txt(X(i), Y(0) + 26, String(i), C.pale, 20);
  for (let j = 1; j <= 7; j++) n += txt(X(0) - 10, Y(j) + 7, String(j), C.pale, 20, "end");
  return `<path d="${g}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".45" fill="none"/>
  <path d="M${X(0)} ${Y(0)} L${X(9)} ${Y(0)} M${X(0)} ${Y(0)} L${X(0)} ${Y(7)}" stroke="${C.pale}" stroke-width="2.5" fill="none"/>
  ${txt(X(0) - 10, Y(0) + 26, "0", C.pale, 20, "end")}${n}`;
};
const point = (x: number, y: number, nom: string, coul: string, dx: number, dy: number, ancre = "start") =>
  `<circle cx="${X(x)}" cy="${Y(y)}" r="7" fill="${coul}"/>` + txt(X(x) + dx, Y(y) + dy, nom, coul, 24, ancre);

// L'ambulance : axe vertical x = 240. L de gauche : (150 ; 150) → (150 ; 270) → (210 ; 270).
// Image : (330 ; 150) → (330 ; 270) → (270 ; 270).
const ambulance = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un miroir vertical au milieu : à gauche la lettre L, à droite son image dans le miroir, retournée ; une ambulance en haut">
  <text x="420" y="70" font-size="44" text-anchor="middle">🚑</text>
  <path d="M240 100 L240 320" stroke="${C.bleu}" stroke-width="3" stroke-dasharray="10 7" fill="none"/>
  <path d="M150 150 L150 270 L210 270" stroke="${C.craie}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M330 150 L330 270 L270 270" stroke="${C.jaune}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M210 290 L270 290" stroke="${C.pale}" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
  ${txt(240, 90, "miroir", C.bleu, 22)}
  ${txt(150, 320, "la lettre", C.craie, 22)}
  ${txt(330, 320, "son image", C.jaune, 22)}
  ${txt(240, 385, `L, N ou M${NB}: laquelle ne change pas${NB}?`, C.rose, 22)}
  </svg>`;

// Le tapis : O(5 ; 4) centre, A(2 ; 5). A' n'est pas dessiné.
const tapis = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un repère quadrillé : le centre du tapis O a pour coordonnées 5 et 4 ; le motif A a pour coordonnées 2 et 5 ; son image par la symétrie de centre O est à trouver">
  ${repere()}
  <path d="M${X(2)} ${Y(5)} L${X(5)} ${Y(4)}" stroke="${C.jaune}" stroke-width="3" stroke-dasharray="8 6" fill="none"/>
  ${point(5, 4, "O", C.bleu, 10, 28)}
  ${point(2, 5, "A", C.jaune, -12, -10, "end")}
  ${txt(300, 50, `image de A${NB}?`, C.rose, 24)}
  <text x="430" y="50" font-size="40" text-anchor="middle">🧶</text>
  </svg>`;

// Le drone : flèche de D(1 ; 1) à D'(6 ; 3) ; antenne E(2 ; 4). E' pas dessiné.
const drone = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un repère quadrillé : une flèche va du point D, de coordonnées 1 et 1, au point D', de coordonnées 6 et 3 ; l'antenne du drone est en E, de coordonnées 2 et 4">
  ${repere()}
  <path d="M${X(1)} ${Y(1)} L${X(6) - 14} ${Y(3) + 5.6}" stroke="${C.rose}" stroke-width="4" fill="none"/>
  <path d="M${X(6)} ${Y(3)} L${r1(X(6) - 24.9)} ${r1(Y(3) - 1.7)} L${r1(X(6) - 18.2)} ${r1(Y(3) + 16.9)} Z" fill="${C.rose}"/>
  <path d="M${X(1)} ${Y(1)} L${X(2)} ${Y(4)}" stroke="${C.pale}" stroke-width="2.5" stroke-dasharray="6 5" fill="none"/>
  ${point(1, 1, "D", C.craie, -12, -8, "end")}
  ${point(6, 3, "D'", C.rose, 10, -12)}
  ${point(2, 4, "E", C.jaune, 12, -10)}
  <text x="425" y="60" font-size="44" text-anchor="middle">🚁</text>
  ${txt(260, 50, `image de E${NB}?`, C.rose, 24)}
  </svg>`;

// L'horloge : O(4 ; 3) → (220 ; 250). B(6 ; 6) → (300 ; 130). B' non dessiné.
const horloge = () => {
  // Arc qui montre le sens des aiguilles d'une montre, rayon 60, de 12 h vers 3 h.
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un repère quadrillé : le centre de l'horloge O a pour coordonnées 4 et 3 ; le bout de la grande aiguille B a pour coordonnées 6 et 6 ; une flèche montre le sens des aiguilles d'une montre">
  ${repere()}
  <path d="M${X(4)} ${Y(3)} L${X(6)} ${Y(6)}" stroke="${C.craie}" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M${X(4)} ${Y(3) - 60} A60 60 0 0 1 ${X(4) + 60} ${Y(3)}" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <path d="M${X(4) + 60} ${Y(3) + 2} L${X(4) + 51} ${Y(3) - 12} L${X(4) + 69} ${Y(3) - 12} Z" fill="${C.rose}"/>
  ${point(4, 3, "O", C.bleu, -12, 28, "end")}
  ${point(6, 6, "B", C.jaune, 12, -8)}
  ${txt(420, 50, "15 min", C.rose, 24)}
  ${txt(150, 50, `image de B${NB}?`, C.rose, 24)}
  </svg>`;
};

// Le logo de Lina : O (240 ; 230). A à 140 px, direction 150° ; A' à 140 px, direction 30°.
// Angle AOA' = 120° : A, O, A' ne sont pas alignés.
const logo = () => {
  const O = { x: 240, y: 230 };
  const pt = (deg: number): P => ({ x: O.x + 140 * Math.cos(rad(deg)), y: O.y - 140 * Math.sin(rad(deg)) });
  const A = pt(150);
  const A2 = pt(30);
  const code = (p: P) => {
    const m = { x: (p.x + O.x) / 2, y: (p.y + O.y) / 2 };
    const d = { x: (p.x - O.x) / 140, y: (p.y - O.y) / 140 };
    const n = { x: -d.y, y: d.x };
    return `M${r1(m.x - 10 * n.x)} ${r1(m.y - 10 * n.y)} L${r1(m.x + 10 * n.x)} ${r1(m.y + 10 * n.y)} `;
  };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Lina place un point A, un point O et un point A' ; les longueurs OA et OA' sont égales, codées par un petit trait, mais les trois points ne sont pas alignés">
  <path d="M${r1(A.x)} ${r1(A.y)} L${O.x} ${O.y} L${r1(A2.x)} ${r1(A2.y)}" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <path d="${code(A)}${code(A2)}" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <circle cx="${O.x}" cy="${O.y}" r="7" fill="${C.bleu}"/>
  <circle cx="${r1(A.x)}" cy="${r1(A.y)}" r="7" fill="${C.jaune}"/>
  <circle cx="${r1(A2.x)}" cy="${r1(A2.y)}" r="7" fill="${C.jaune}"/>
  ${txt(O.x, O.y + 34, "O", C.bleu, 24)}
  ${txt(A.x - 12, A.y - 12, "A", C.jaune, 24, "end")}
  ${txt(A2.x + 12, A2.y - 12, "A'", C.jaune, 24, "start")}
  <rect x="40" y="310" width="400" height="80" rx="16" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 342, `Lina${NB}: «${NB}OA = OA', donc A'`, C.rose, 22)}
  ${txt(240, 374, `est le symétrique de A${NB}!${NB}»`, C.rose, 22)}
  </svg>`;
};

// Le moulin : 18 px par cm, O (240 ; 210). Triangle 1 : O, (384 ; 210) à 8 cm, (240 ; 102) à 6 cm.
// Quarts de tour : (8 ; 0) → (0 ; 8) → (−8 ; 0) → (0 ; −8) et (0 ; 6) → (−6 ; 0) → (0 ; −6) → (6 ; 0).
const moulin = () => {
  const O = { x: 240, y: 210 };
  const S = (a: number, b: number) => `${r1(O.x + 18 * a)} ${r1(O.y - 18 * b)}`;
  const tri = (p: [number, number], q: [number, number]) => `M${O.x} ${O.y} L${S(p[0], p[1])} L${S(q[0], q[1])} Z`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un moulin à vent en papier : quatre triangles rectangles identiques de côtés 8 cm et 6 cm, tournés d'un quart de tour autour du centre O">
  <path d="${tri([8, 0], [0, 6])}" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="3" stroke-linejoin="round"/>
  <path d="${tri([0, 8], [-6, 0])}" fill="${C.bleu}" fill-opacity=".25" stroke="${C.bleu}" stroke-width="3" stroke-linejoin="round"/>
  <path d="${tri([-8, 0], [0, -6])}" fill="${C.rose}" fill-opacity=".25" stroke="${C.rose}" stroke-width="3" stroke-linejoin="round"/>
  <path d="${tri([0, -8], [6, 0])}" fill="${C.pale}" fill-opacity=".25" stroke="${C.pale}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M240 196 L254 196 L254 210" stroke="${C.craie}" stroke-width="2" fill="none"/>
  <circle cx="${O.x}" cy="${O.y}" r="5" fill="${C.craie}"/>
  ${txt(300, 202, "8 cm", C.craie, 20)}
  ${txt(250, 160, "6 cm", C.craie, 20, "start")}
  ${txt(226, 236, "O", C.craie, 22, "end")}
  ${txt(240, 400, `aire du moulin${NB}?`, C.rose, 24)}
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "sym_transformation",
  titre: "Énigmes sur les transformations",
  description: "Le mot à l'envers sur l'ambulance, le tapis, le drone, l'horloge de la gare, le piège du logo de Lina, le défi du moulin à vent : symétrie axiale, symétrie centrale, translation, rotation et ce qu'elles conservent.",
  problemes: [
    {
      tag: "Énigme 1 · L'ambulance",
      titre: "Le mot à l'envers",
      question: `Sur l'avant d'une ambulance, le mot est écrit à l'envers.<br>Le conducteur devant le lit à l'endroit dans son rétroviseur.<br>Un miroir fait une symétrie axiale.<br><br>Quelle lettre ne change pas dans le miroir : L, N ou M ?`,
      reponse: `Le miroir retourne chaque lettre de gauche à droite.<br>Le L se retourne : sa barre part vers la gauche.<br>Le N devient И : il change.<br>Le M a un axe de symétrie vertical.<br>Donc son image est encore un M.<br>La lettre qui ne change pas est le <span class="big">M</span>.`,
      consigne: "Quelle lettre ne change pas dans le miroir ?",
      verification: { type: "qcm", choix: ["L", "N", "M"], bonne: 2 },
      dessin: ambulance(),
    },
    {
      tag: "Énigme 2 · Le tapis",
      titre: "Le motif d'en face",
      question: `Un tapis a un motif symétrique par rapport à son centre O(5 ; 4).<br>Une fleur est brodée en A(2 ; 5).<br><br>Où est brodée la fleur symétrique de A par rapport à O ?`,
      reponse: `Dans la symétrie de centre O, O est le milieu de [AA'].<br>De A à O : 3 vers la droite et 1 vers le bas.<br>On refait le même trajet depuis O.<br>Abscisse : 5 + 3 = 8. Ordonnée : 4 − 1 = 3.<br>La fleur est en <span class="big">A'(8 ; 3)</span>.<br>Contrôle : le milieu de (2 ; 5) et (8 ; 3) est bien (5 ; 4).`,
      consigne: "Quelles sont les coordonnées de A' ? Écris-les sous la forme (x ; y).",
      verification: { type: "courte", attendus: ["(8;3)", "(8 ; 3)", "8;3", "8 ; 3", "(8,3)", "A'(8;3)"] },
      dessin: tapis(),
    },
    {
      tag: "Énigme 3 · Le drone",
      titre: "Le drone glisse",
      question: `Un drone se déplace tout droit, sans tourner.<br>Sa caméra passe de D(1 ; 1) à D'(6 ; 3).<br>Son antenne est en E(2 ; 4).<br><br>Où arrive l'antenne ?`,
      reponse: `Le drone glisse sans tourner : c'est une translation.<br>Tous ses points bougent de la même façon que D.<br>De D à D' : 5 vers la droite et 2 vers le haut.<br>Abscisse : 2 + 5 = 7. Ordonnée : 4 + 2 = 6.<br>L'antenne arrive en <span class="big">E'(7 ; 6)</span>.<br>Contrôle : de E à E', aussi + 5 et + 2.`,
      consigne: "Quelles sont les coordonnées de l'image de E ?",
      verification: { type: "qcm", choix: ["(7 ; 6)", "(6 ; 3)", "(4 ; 9)"], bonne: 0 },
      dessin: drone(),
    },
    {
      tag: "Énigme 4 · L'horloge de la gare",
      titre: "Un quart de tour",
      question: `L'horloge de la gare a son centre en O(4 ; 3).<br>Le bout de la grande aiguille est en B(6 ; 6).<br>En 15 minutes, l'aiguille fait un quart de tour autour de O.<br>Elle tourne dans le sens des aiguilles d'une montre.<br><br>Où est le bout de l'aiguille 15 minutes plus tard ?`,
      reponse: `C'est une rotation de centre O, de 90°, dans le sens des aiguilles d'une montre.<br>De O à B : 2 vers la droite et 3 vers le haut.<br>Après un quart de tour : « vers le haut » devient « vers la droite ».<br>Et « vers la droite » devient « vers le bas ».<br>De O à B' : 3 vers la droite et 2 vers le bas.<br>Abscisse : 4 + 3 = 7. Ordonnée : 3 − 2 = 1.<br>Le bout est en <span class="big">B'(7 ; 1)</span>. L'aiguille garde sa longueur.`,
      consigne: "Quelles sont les coordonnées de B' ? Écris-les sous la forme (x ; y).",
      verification: { type: "courte", attendus: ["(7;1)", "(7 ; 1)", "7;1", "7 ; 1", "(7,1)", "B'(7;1)"] },
      dessin: horloge(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le logo de Lina",
      sorte: "piege",
      question: `Lina dessine un logo.<br>Elle veut le symétrique du point A par rapport à O.<br>Elle place A' avec OA' = OA.<br>Elle dit : « OA = OA', donc A' est le symétrique de A ! »<br><br><b>Lina a-t-elle raison ?</b>`,
      reponse: `Lina s'est trompée ! Des longueurs égales ne suffisent pas.<br>Dans la symétrie de centre O, O est le milieu de [AA'].<br>Donc A, O et A' doivent être alignés.<br>Sur le dessin, l'angle en O ne fait pas 180°.<br>Le point de Lina vient d'une rotation, pas d'un demi-tour.<br><span class="big">Non : O doit être le milieu de [AA']</span>.`,
      consigne: "Lina a-t-elle construit le symétrique de A par rapport à O ?",
      verification: { type: "qcm", choix: ["Oui, car OA = OA'.", "Non : O doit être le milieu de [AA'].", "Oui, car A' est à droite de O."], bonne: 1 },
      dessin: logo(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le moulin à vent en papier",
      sorte: "defi",
      question: `Sacha découpe un triangle rectangle en papier.<br>Les côtés de l'angle droit mesurent 8 cm et 6 cm.<br>Il le fait tourner d'un quart de tour autour de O, trois fois.<br>Il colle les quatre triangles : c'est un moulin à vent.<br><br>Quelle est l'aire du moulin ?`,
      reponse: `Aire d'un triangle rectangle : 8 × 6 ÷ 2 = 24 cm².<br>Une rotation conserve les aires.<br>Donc les quatre triangles ont la même aire : 24 cm².<br>Ils ne se chevauchent pas : chacun reste dans son quart.<br>Aire du moulin : 4 × 24 = 96.<br>Elle vaut <span class="big">96 cm²</span>.`,
      consigne: "Quelle est l'aire du moulin, en cm² ?",
      verification: { type: "courte", attendus: ["96"], unite: "cm²" },
      dessin: moulin(),
    },
  ],
};

export default problemes;
