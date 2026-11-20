// Énigmes à projeter — 5e, notion litteral_calcul (écrire une expression,
// substituer, réduire, tester une égalité). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const carre = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un carré de côté c ; la formule P = 4 × c">
  <rect x="140" y="70" width="200" height="200" fill="${C.bleu}" fill-opacity=".12" stroke="${C.bleu}" stroke-width="4"/>
  <text x="240" y="60" fill="${C.bleu}" font-size="28" text-anchor="middle">c</text>
  <text x="355" y="180" fill="${C.bleu}" font-size="28">c</text>
  <text x="240" y="330" fill="${C.craie}" font-size="34" text-anchor="middle">P = 4 × c</text>
  <text x="240" y="385" fill="${C.rose}" font-size="28" text-anchor="middle">c = 7 cm : P = ?</text>
  </svg>`;

// Rectangle de côtés x et 5 (x n'est pas connu : pas à l'échelle).
const rectangle = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un rectangle de longueur x et de largeur 5">
  <rect x="80" y="110" width="320" height="140" fill="${C.jaune}" fill-opacity=".15" stroke="${C.jaune}" stroke-width="4"/>
  <text x="240" y="95" fill="${C.craie}" font-size="30" text-anchor="middle">x</text>
  <text x="415" y="190" fill="${C.craie}" font-size="30">5</text>
  <text x="240" y="320" fill="${C.rose}" font-size="30" text-anchor="middle">périmètre = ?</text>
  <text x="240" y="385" fill="${C.pale}" font-size="20" text-anchor="middle">pas à l'échelle</text>
  </svg>`;

// Allumettes : 1, 2, 3 carrés en ligne, allumettes de 50 px.
const allumette = (x1: number, y1: number, x2: number, y2: number) =>
  `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${C.jaune}" stroke-width="6" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="5" fill="${C.rose}"/>`;
const ligne = (x: number, y: number, n: number) => {
  let s = "";
  for (let i = 0; i <= n; i++) s += allumette(x + 50 * i, y + 50, x + 50 * i, y + 4);
  for (let i = 0; i < n; i++) s += allumette(x + 50 * i + 4, y, x + 50 * i + 46, y) + allumette(x + 50 * i + 4, y + 54, x + 50 * i + 46, y + 54);
  return s;
};
const allumettes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Des carrés d'allumettes en ligne : 1 carré, 2 carrés, 3 carrés">
  ${ligne(40, 60, 1)}<text x="200" y="100" fill="${C.craie}" font-size="22">1 carré : 4</text>
  ${ligne(40, 160, 2)}<text x="200" y="200" fill="${C.craie}" font-size="22">2 carrés : 7</text>
  ${ligne(40, 260, 3)}<text x="250" y="300" fill="${C.craie}" font-size="22">3 carrés : 10</text>
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">n carrés : 3n + 1 allumettes</text>
  </svg>`;

const reduire = () => `<svg viewBox="0 0 480 420" role="img" aria-label="5a + 3a − 2a avec des sacs de billes">
  <text x="240" y="110" fill="${C.craie}" font-size="50" text-anchor="middle">5a + 3a − 2a</text>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${50 + 50 * i} 220 Q${50 + 50 * i} 180 ${70 + 50 * i} 180 Q${90 + 50 * i} 180 ${90 + 50 * i} 220 Z" fill="${i < 5 ? C.bleu : C.jaune}" fill-opacity=".35" stroke="${C.craie}" stroke-width="2"/><text x="${70 + 50 * i}" y="212" fill="${C.craie}" font-size="18" text-anchor="middle">a</text>`).join("")}
  <text x="240" y="280" fill="${C.pale}" font-size="22" text-anchor="middle">5 sacs + 3 sacs, puis on en retire 2</text>
  <text x="240" y="350" fill="${C.rose}" font-size="34" text-anchor="middle">= ?</text>
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le calcul de Tom : 2 + 3x pour x = 4 donne 20">
  <text x="240" y="110" fill="${C.craie}" font-size="46" text-anchor="middle">2 + 3x pour x = 4</text>
  <text x="240" y="190" fill="${C.rose}" font-size="34" text-anchor="middle">Tom : « 5 × 4 = 20 »</text>
  <text x="240" y="290" fill="${C.bleu}" font-size="28" text-anchor="middle">3x, c'est 3 × x</text>
  <text x="240" y="350" fill="${C.pale}" font-size="22" text-anchor="middle">qui passe en premier ?</text>
  </svg>`;

const balance = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une balance : 3x + 5 d'un côté, 5x − 3 de l'autre">
  <path d="M240 120 L240 330 M180 330 L300 330" stroke="${C.craie}" stroke-width="5" stroke-linecap="round"/>
  <path d="M70 150 L410 150" stroke="${C.craie}" stroke-width="5" stroke-linecap="round"/>
  <path d="M70 150 L40 230 M70 150 L100 230 M410 150 L380 230 M410 150 L440 230" stroke="${C.pale}" stroke-width="2"/>
  <path d="M30 230 L110 230 Q70 260 30 230 Z M370 230 L450 230 Q410 260 370 230 Z" fill="${C.pale}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3"/>
  <text x="70" y="295" fill="${C.bleu}" font-size="30" text-anchor="middle">3x + 5</text>
  <text x="410" y="295" fill="${C.rose}" font-size="30" text-anchor="middle">5x − 3</text>
  <text x="240" y="390" fill="${C.jaune}" font-size="28" text-anchor="middle">équilibre pour x = ?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "litteral_calcul",
  titre: "Énigmes de calcul littéral",
  description: "Calcul littéral en 5e : périmètre du carré, expression d'un périmètre, carrés d'allumettes, réduire 5a + 3a − 2a, piège de la priorité, tester une égalité sur une balance. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · La formule",
      titre: "Le périmètre du carré",
      question: `Le périmètre d'un carré de côté c est <b>P = 4 × c</b>.<br><br><b>Combien vaut P</b> quand c = 7 cm ?`,
      reponse: `On remplace c par 7 : P = 4 × 7 = 28.<br>Le périmètre est <span class="big">28 cm</span>.`,
      consigne: "Combien vaut P pour c = 7 cm ?",
      verification: { type: "courte", attendus: ["28"], unite: "cm" },
      dessin: carre(),
    },
    {
      tag: "Énigme 2 · Écrire une expression",
      titre: "Le périmètre du rectangle",
      question: `Un rectangle a pour longueur <b>x</b> et pour largeur <b>5</b>.<br><br><b>Quelle expression</b> donne son périmètre ?`,
      reponse: `On fait le tour : x + 5 + x + 5.<br>Le périmètre est <span class="big">2x + 10</span> (ou 2 × (x + 5)).`,
      consigne: "Quelle expression donne le périmètre ?",
      verification: { type: "qcm", choix: ["2x + 5", "5x", "2x + 10"], bonne: 2 },
      dessin: rectangle(),
    },
    {
      tag: "Énigme 3 · Les allumettes",
      titre: "La ligne de carrés",
      question: `Pour faire <b>n carrés</b> en ligne, il faut <b>3n + 1</b> allumettes.<br><br><b>Combien d'allumettes</b> pour 10 carrés ?`,
      reponse: `On remplace n par 10 : 3 × 10 + 1 = 31.<br>Il faut <span class="big">31 allumettes</span>.`,
      consigne: "Combien d'allumettes pour 10 carrés ?",
      verification: { type: "courte", attendus: ["31"], unite: "allumettes" },
      dessin: allumettes(),
    },
    {
      tag: "Énigme 4 · Réduire",
      titre: "Les sacs de billes",
      question: `Chaque sac contient <b>a</b> billes.<br><br><b>Écris plus simplement</b> : 5a + 3a − 2a.`,
      reponse: `5 sacs + 3 sacs − 2 sacs = 6 sacs.<br>5a + 3a − 2a = <span class="big">6a</span>.`,
      consigne: "Quelle est la forme réduite de 5a + 3a − 2a ?",
      verification: { type: "qcm", choix: ["10a", "6a", "8a − 2"], bonne: 1 },
      dessin: reduire(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le calcul de Tom",
      sorte: "piege",
      question: `Tom calcule <b>2 + 3x</b> pour x = 4.<br>Il fait 2 + 3 = 5, puis 5 × 4 = 20.<br><br><b>A-t-il raison ?</b> Sinon, combien trouve-t-on ?`,
      reponse: `Non ! 3x veut dire 3 × x, et la multiplication passe en premier.<br>2 + 3 × 4 = 2 + 12 = <span class="big">14</span>.`,
      consigne: "Combien vaut 2 + 3x pour x = 4 ?",
      verification: { type: "courte", attendus: ["14"] },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La balance en équilibre",
      sorte: "defi",
      question: `Sur une balance, on a <b>3x + 5</b> d'un côté et <b>5x − 3</b> de l'autre.<br><br>Teste des valeurs : <b>pour quel nombre entier x</b> la balance est-elle en équilibre ?`,
      reponse: `x = 3 : 14 et 12, non. x = 4 : 3 × 4 + 5 = 17 et 5 × 4 − 3 = 17.<br>L'égalité est vraie pour <span class="big">x = 4</span>.`,
      consigne: "Pour quelle valeur de x a-t-on 3x + 5 = 5x − 3 ?",
      verification: { type: "courte", attendus: ["4", "x=4"] },
      dessin: balance(),
    },
  ],
};

export default problemes;
