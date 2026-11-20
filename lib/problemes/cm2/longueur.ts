// Énigmes à projeter — CM2, notion longueur (l'escargot en mm par minute, le
// cross en km, le plus long des trois serpents, la ficelle coupée, le piège
// 0,5 km = 50 m, le défi de la pile de 1 000 feuilles). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, fleche } from "../dessins-ecole";

const escargot = svg(
  "Un escargot qui avance de 5 mm chaque minute",
  t(120, 220, "🐌", C.craie, 90) + fleche(190, 200, 300, 200, C.rose, 4) + t(245, 180, "5 mm", C.rose, 24) + t(245, 235, "par minute", C.pale, 18) +
    t(240, 330, `en 1 heure${NB}: ? cm`, C.rose, 28)
);

const cross = svg(
  "Le parcours du cross : 1,5 km",
  `<path d="M70 300 C 70 120, 240 80, 300 160 S 420 320, 420 140" fill="none" stroke="${C.jaune}" stroke-width="10" stroke-linecap="round" stroke-opacity=".6"/>` +
    t(70, 340, "départ", C.craie, 20) + t(420, 120, "arrivée", C.craie, 20) + t(240, 60, "🏃 1,5 km", C.craie, 30) + t(240, 390, `en mètres${NB}?`, C.rose, 28)
);

// Trois serpents au bon rapport : 1 m = 300 px.
const serpents = svg(
  "Trois serpents : 1,2 m ; 95 cm ; 1 050 mm, au bon rapport",
  [["A", 1.2, "1,2 m", C.bleu], ["B", 0.95, "95 cm", C.jaune], ["C", 1.05, `1${NB}050 mm`, C.rose]]
    .map(([n, v, e, c], i) => r(40, 80 + i * 100, (v as number) * 300, 24, c as string, 0.35, 3, 12) + t(40, 70 + i * 100, `serpent ${n} : ${e}`, c as string, 22, "start"))
    .join("") + t(240, 400, `Le plus long${NB}?`, C.rose, 26)
);

// La ficelle de 3 m : 1 m = 130 px (390 px) ; 8 morceaux de 35 cm = 45,5 px.
const ficelle = svg(
  "Une ficelle de 3 m dont on coupe 8 morceaux de 35 cm",
  l(45, 180, 435, 180, C.jaune, 8) + [1, 2, 3, 4, 5, 6, 7, 8].map((k) => l(45 + k * 45.5, 165, 45 + k * 45.5, 195, C.craie, 3)).join("") +
    t(240, 140, "3 m", C.craie, 30) + t(68, 230, "35 cm", C.pale, 16) + t(412, 230, "?", C.rose, 30) + t(240, 330, "8 morceaux de 35 cm ✂️", C.craie, 24) + t(240, 380, `Combien reste-t-il${NB}?`, C.rose, 24)
);

const marche = svg(
  "Un panneau : 0,5 km jusqu'à la plage ; Léo dit 50 m",
  l(240, 120, 240, 360, C.craie, 6) + `<path d="M120 80 L360 80 L400 120 L360 160 L120 160 Z" fill="${C.bleu}" fill-opacity=".2" stroke="${C.bleu}" stroke-width="4" stroke-linejoin="round"/>` +
    t(250, 132, "plage 0,5 km", C.craie, 28) + t(240, 230, `«${NB}c'est 50 m${NB}»`, C.rose, 28) + t(240, 270, "dit Léo", C.pale, 20)
);

const pile = svg(
  "Une pile de 1 000 feuilles de 0,1 mm d'épaisseur",
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => r(150, 300 - i * 16, 180, 12, C.craie, 0.06, 2, 2)).join("") +
    t(240, 60, "une feuille : 0,1 mm", C.craie, 24) + t(240, 350, "1 000 feuilles", C.craie, 26) + t(240, 395, `hauteur${NB}: ? cm`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "longueur",
  titre: "Énigmes sur les longueurs",
  description: "L'escargot en une heure, le cross en mètres, le plus long des trois serpents, la ficelle coupée, le piège du panneau de la plage, le défi de la pile de feuilles.",
  problemes: [
    {
      tag: "Énigme 1 · Au jardin",
      titre: "L'escargot",
      question: `Un escargot avance de <b>5 mm</b> chaque minute.<br><br>Combien de <b>centimètres</b> avance-t-il en <b>1 heure</b> ?`,
      reponse: `1 heure = 60 minutes. 60 × 5 = 300 mm.<br>10 mm = 1 cm, donc 300 mm = <span class="big">30 cm</span>.`,
      consigne: "Combien de centimètres en 1 heure ?",
      verification: { type: "courte", attendus: ["30"], unite: "cm" },
      dessin: escargot,
    },
    {
      tag: "Énigme 2 · Le cross de l'école",
      titre: "Le parcours",
      question: `Le parcours du cross mesure <b>1,5 km</b>.<br><br>Combien de <b>mètres</b> cela fait-il ?`,
      reponse: `1 km = 1 000 m. 0,5 km = la moitié = 500 m.<br>1 000 + 500 = <span class="big">1 500 m</span>.`,
      consigne: "1,5 km, c'est combien de mètres ?",
      verification: { type: "courte", attendus: ["1500"], unite: "m" },
      dessin: cross,
    },
    {
      tag: "Énigme 3 · Au vivarium",
      titre: "Le plus long serpent",
      question: `Serpent A : <b>1,2 m</b>. Serpent B : <b>95 cm</b>. Serpent C : <b>1 050 mm</b>.<br><br><b>Quel serpent est le plus long</b> ?`,
      reponse: `Tout en centimètres : A = 120 cm, B = 95 cm, C = 105 cm.<br><span class="big">Le serpent A</span> est le plus long.`,
      consigne: "Quel serpent est le plus long ?",
      verification: { type: "qcm", choix: ["Le serpent B", "Le serpent C", "Le serpent A"], bonne: 2 },
      dessin: serpents,
    },
    {
      tag: "Énigme 4 · À l'atelier",
      titre: "La ficelle coupée",
      question: `Une ficelle mesure <b>3 m</b>.<br>On coupe <b>8 morceaux</b> de <b>35 cm</b>.<br><br><b>Combien reste-t-il</b> de ficelle ?`,
      reponse: `8 × 35 = 280 cm. Et 3 m = 300 cm.<br>300 − 280 = <span class="big">20 cm</span>.`,
      consigne: "Combien de centimètres de ficelle reste-t-il ?",
      verification: { type: "courte", attendus: ["20"], unite: "cm" },
      dessin: ficelle,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le panneau de la plage",
      sorte: "piege",
      question: `Un panneau dit : « plage à <b>0,5 km</b> ».<br>Léo dit : « Facile, c'est 50 m. »<br><br><b>A-t-il raison</b> ?`,
      reponse: `Non ! 1 km = 1 000 m.<br>0,5 km, c'est la moitié de 1 000 m.<br>La plage est à <span class="big">500 m</span>.`,
      consigne: "0,5 km, c'est combien de mètres ?",
      verification: { type: "qcm", choix: ["50 m", "500 m", "5 000 m"], bonne: 1 },
      dessin: marche,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La pile de feuilles",
      sorte: "defi",
      question: `Une feuille de papier a une épaisseur de <b>0,1 mm</b>.<br><br>Quelle est la hauteur d'une pile de <b>1 000 feuilles</b>, en <b>cm</b> ?`,
      reponse: `1 000 × 0,1 mm = 100 mm.<br>100 mm = <span class="big">10 cm</span>.<br>C'est à peu près l'épaisseur de deux ramettes de papier.`,
      consigne: "Quelle est la hauteur de la pile, en cm ?",
      verification: { type: "courte", attendus: ["10"], unite: "cm" },
      dessin: pile,
    },
  ],
};

export default problemes;
