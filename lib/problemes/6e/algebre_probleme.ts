// Énigmes à projeter — 6e, notion algebre_probleme (schéma en barres « le
// double », deux nombres inconnus par comparaison de deux pesées, motif des
// tables et des chaises, remonter un motif de bâtonnets, le piège « je divise
// le total tout de suite », défi des trois classes en parts). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-algebre-probleme.tsx) : pas
// d'équation, on dessine des parts. Pas de prix (masses, objets comptés).
// Schémas en barres AU BON RAPPORT (échelles notées au-dessus de chaque dessin).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 24, ancre = "middle") =>
  `<text x="${x}" y="${y}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

/** Une part de barre : rectangle + « ? » ou une valeur au centre. */
const part = (x: number, y: number, l: number, h: number, coul: string, op: string, etiquette: string, coulTexte: string = C.craie) =>
  `<rect x="${x}" y="${y}" width="${l}" height="${h}" fill="${coul}" fill-opacity="${op}" stroke="${C.craie}" stroke-width="3"/>` +
  txt(x + l / 2, y + h / 2 + 9, etiquette, coulTexte, 26);

/** Une accolade verticale à droite, de y1 à y2, en x. */
const accolade = (x: number, y1: number, y2: number) => {
  const m = (y1 + y2) / 2;
  return `<path d="M${x} ${y1} Q${x + 14} ${y1} ${x + 14} ${y1 + 14} L${x + 14} ${m - 10} Q${x + 14} ${m} ${x + 26} ${m} Q${x + 14} ${m} ${x + 14} ${m + 10} L${x + 14} ${y2 - 14} Q${x + 14} ${y2} ${x} ${y2}" stroke="${C.rose}" stroke-width="3" fill="none"/>`;
};

// Jade 1 part, Noa 2 parts (le double). 1 part = 110 px (= 18 fraises).
const cueillette = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Schéma en barres : Jade une part, Noa deux parts, 54 fraises en tout">
  ${txt(240, 60, "🍓 54 fraises en tout", C.craie, 26)}
  ${txt(100, 164, "Jade", C.jaune, 26, "end")}
  ${part(115, 130, 110, 50, C.jaune, ".25", "?")}
  ${txt(100, 264, "Noa", C.bleu, 26, "end")}
  ${part(115, 230, 110, 50, C.bleu, ".2", "?")}
  ${part(225, 230, 110, 50, C.bleu, ".2", "?")}
  ${accolade(350, 130, 280)}
  ${txt(385, 214, "54", C.rose, 30, "start")}
  ${txt(240, 345, "Noa a le double de Jade.", C.pale, 22)}
  ${txt(240, 392, `Jade${NB}: ? fraises`, C.rose, 28)}
  </svg>`;

// Deux pesées : 2 melons + 1 citrouille = 8 kg ; 2 melons + 3 citrouilles = 16 kg.
const pesees = () => {
  const plateau = (y: number, x1: number, x2: number) =>
    `<path d="M${x1} ${y} L${x2} ${y} M${(x1 + x2) / 2} ${y} L${(x1 + x2) / 2} ${y + 26} M${(x1 + x2) / 2 - 30} ${y + 26} L${(x1 + x2) / 2 + 30} ${y + 26}" stroke="${C.craie}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Deux pesées : deux melons et une citrouille font 8 kilos ; deux melons et trois citrouilles font 16 kilos">
  ${txt(40, 70, "Pesée 1", C.pale, 22, "start")}
  ${txt(150, 128, "🍈🍈🎃", C.craie, 46)}
  ${plateau(146, 40, 260)}
  ${txt(380, 140, "8 kg", C.bleu, 34)}
  ${txt(40, 222, "Pesée 2", C.pale, 22, "start")}
  ${txt(150, 280, "🍈🍈🎃🎃🎃", C.craie, 40)}
  ${plateau(298, 20, 280)}
  ${txt(380, 292, "16 kg", C.bleu, 34)}
  ${txt(240, 390, `1 🎃${NB}: ? kg`, C.rose, 30)}
  </svg>`;
};

// Le motif des tables : 1, 2, 3 tables en ligne ; tables de 44 px, chaises r = 9.
const tables = () => {
  let s = "";
  [1, 2, 3].forEach((n, k) => {
    const x0 = 200, top = 70 + k * 100, mid = top + 22;
    for (let i = 0; i < n; i++) {
      const x = x0 + 44 * i;
      s += `<rect x="${x}" y="${top}" width="44" height="44" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>`;
      s += `<circle cx="${x + 22}" cy="${top - 14}" r="9" fill="${C.bleu}" fill-opacity=".6"/>`;
      s += `<circle cx="${x + 22}" cy="${top + 58}" r="9" fill="${C.bleu}" fill-opacity=".6"/>`;
    }
    s += `<circle cx="${x0 - 14}" cy="${mid}" r="9" fill="${C.bleu}" fill-opacity=".6"/>`;
    s += `<circle cx="${x0 + 44 * n + 14}" cy="${mid}" r="9" fill="${C.bleu}" fill-opacity=".6"/>`;
    s += txt(30, mid + 8, `${n} table${n > 1 ? "s" : ""}`, C.craie, 22, "start");
    s += txt(420, mid + 9, `${2 * n + 2}`, C.bleu, 28);
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Des tables carrées mises bout à bout : 1 table et 4 chaises, 2 tables et 6 chaises, 3 tables et 8 chaises">
  ${txt(420, 34, "chaises", C.bleu, 20)}
  ${s}
  ${txt(240, 395, `10 tables${NB}: ? chaises`, C.rose, 28)}
  </svg>`;
};

// Les carrés de bâtonnets : 1, 2, 3 carrés de 40 px.
const batonnets = () => {
  let s = "";
  [1, 2, 3].forEach((n, k) => {
    const x0 = 50, y = 60 + k * 90;
    let d = `M${x0} ${y} L${x0} ${y + 40} `;
    for (let i = 0; i < n; i++) {
      const x = x0 + 40 * i;
      d += `M${x + 7} ${y} L${x + 33} ${y} M${x + 7} ${y + 40} L${x + 33} ${y + 40} M${x + 40} ${y + 7} L${x + 40} ${y + 33} `;
    }
    d = d.replace(`M${x0} ${y} L${x0} ${y + 40}`, `M${x0} ${y + 7} L${x0} ${y + 33}`);
    s += `<path d="${d}" stroke="${C.jaune}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    s += txt(200, y + 29, `${n} carré${n > 1 ? "s" : ""}${NB}: ${3 * n + 1} bâtonnets`, C.craie, 22, "start");
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Des carrés en bâtonnets alignés : 1 carré 4 bâtonnets, 2 carrés 7 bâtonnets, 3 carrés 10 bâtonnets">
  ${s}
  ${txt(240, 345, "Elle utilise 40 bâtonnets.", C.pale, 22)}
  ${txt(240, 392, `Combien de carrés${NB}?`, C.rose, 28)}
  </svg>`;
};

// Le piège : Hugo 1 part, Lucas 1 part + 10. 1 carte = 8 px : part 160, écart 80.
const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Schéma en barres : Hugo une part, Lucas une part et 10 de plus, 50 cartes en tout">
  ${txt(95, 99, "Hugo", C.jaune, 24, "end")}
  ${part(105, 65, 160, 50, C.jaune, ".25", "?")}
  ${txt(95, 189, "Lucas", C.bleu, 24, "end")}
  ${part(105, 155, 160, 50, C.bleu, ".2", "?")}
  ${part(265, 155, 80, 50, C.rose, ".25", "10")}
  ${accolade(358, 65, 205)}
  ${txt(393, 144, "50", C.rose, 30, "start")}
  ${txt(240, 280, `Max${NB}: «${NB}50 ÷ 2 = 25${NB}»`, C.craie, 24)}
  ${txt(240, 318, `«${NB}Hugo a 25 cartes.${NB}»`, C.craie, 24)}
  ${txt(240, 385, `Vrai ou faux${NB}?`, C.rose, 32)}
  </svg>`;

// Le défi : 6e B 1 part, 6e A 2 parts, 6e C 1 part + 60. Part = 100 px, 60 → 40 px.
const bouchons = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Schéma en barres : 6e A deux parts, 6e B une part, 6e C une part et 60 de plus, 660 bouchons en tout">
  ${txt(240, 50, "♻️ 660 bouchons en tout", C.craie, 24)}
  ${txt(115, 114, "6e A", C.bleu, 24, "end")}
  ${part(125, 80, 100, 50, C.bleu, ".2", "?")}
  ${part(225, 80, 100, 50, C.bleu, ".2", "?")}
  ${txt(115, 194, "6e B", C.jaune, 24, "end")}
  ${part(125, 160, 100, 50, C.jaune, ".25", "?")}
  ${txt(115, 274, "6e C", C.craie, 24, "end")}
  ${part(125, 240, 100, 50, C.pale, ".2", "?")}
  ${part(225, 240, 40, 50, C.rose, ".25", "60", C.craie)}
  ${accolade(345, 80, 290)}
  ${txt(380, 194, "660", C.rose, 28, "start")}
  ${txt(240, 385, `6e C${NB}: ? bouchons`, C.rose, 28)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "algebre_probleme",
  titre: "Énigmes sur les nombres cachés et les motifs",
  description: "Défis maths à projeter en 6e : schéma en barres, deux pesées, le motif des tables, les bâtonnets, le piège du partage, les bouchons des trois classes.",
  problemes: [
    {
      tag: "Énigme 1 · À la cueillette",
      titre: "Les fraises",
      question: `Jade et Noa cueillent <b>54 fraises</b> en tout.<br>Noa en cueille <b>le double</b> de Jade.<br><br>Combien de fraises cueille <b>Jade</b> ?`,
      reponse: `Jade : 1 part. Noa : 2 parts. En tout : 3 parts égales.<br>54 ÷ 3 = 18. Jade cueille <span class="big">18 fraises</span>.<br>Noa : 2 × 18 = 36. Vérif : 18 + 36 = 54 ✓`,
      consigne: "Combien de fraises Jade cueille-t-elle ?",
      verification: { type: "courte", attendus: ["18"], unite: "fraises" },
      dessin: cueillette(),
    },
    {
      tag: "Énigme 2 · À l'épicerie",
      titre: "Les deux pesées",
      question: `<b>2 melons</b> et <b>1 citrouille</b> pèsent <b>8 kg</b>.<br><b>2 melons</b> et <b>3 citrouilles</b> pèsent <b>16 kg</b>.<br>Les melons sont pareils. Les citrouilles aussi.<br><br>Combien pèse <b>une citrouille</b> ?`,
      reponse: `Les 2 melons sont sur les deux pesées.<br>La 2e pesée a <b>2 citrouilles de plus</b>. Elles pèsent 16 − 8 = 8 kg.<br>Une citrouille : 8 ÷ 2 = <span class="big">4 kg</span>.<br>Vérif : 2 melons = 8 − 4 = 4 kg, donc 2 kg chacun. Et 4 + 3 × 4 = 16 ✓`,
      consigne: "Combien pèse une citrouille ?",
      verification: { type: "qcm", choix: ["8 kg", "4 kg", "2 kg"], bonne: 1 },
      dessin: pesees(),
    },
    {
      tag: "Énigme 3 · Au repas de fête",
      titre: "Les tables en ligne",
      question: `On met des tables carrées <b>bout à bout</b>.<br>1 table : 4 chaises. 2 tables : 6 chaises. 3 tables : 8 chaises.<br><br>Combien de chaises pour <b>10 tables</b> ?`,
      reponse: `Chaque table en plus apporte <b>2 chaises</b> : 4, 6, 8…<br>De 1 à 10 tables, on ajoute 9 tables : 9 × 2 = 18.<br>4 + 18 = <span class="big">22 chaises</span>.<br>Autre façon : 2 chaises par table (10 × 2 = 20), plus 1 à chaque bout : 22.`,
      consigne: "Combien de chaises pour 10 tables ?",
      verification: { type: "courte", attendus: ["22"], unite: "chaises" },
      dessin: tables(),
    },
    {
      tag: "Énigme 4 · Au centre aéré",
      titre: "Les carrés de bâtonnets",
      question: `Inès aligne des carrés en bâtonnets.<br>1 carré : 4 bâtonnets. 2 carrés : 7. 3 carrés : 10.<br>Elle utilise <b>40 bâtonnets</b>, tous.<br><br>Combien de <b>carrés</b> forme-t-elle ?`,
      reponse: `Le 1er carré prend 4 bâtonnets. Chaque carré en plus en prend 3.<br>40 − 4 = 36 bâtonnets pour les carrés en plus.<br>36 ÷ 3 = 12 carrés en plus. 1 + 12 = <span class="big">13 carrés</span>.<br>Vérif : 4 + 12 × 3 = 4 + 36 = 40 ✓`,
      consigne: "Avec 40 bâtonnets, combien de carrés forme-t-elle ?",
      verification: { type: "courte", attendus: ["13"], unite: "carrés" },
      dessin: batonnets(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le partage de Max",
      sorte: "piege",
      question: `Hugo et Lucas ont <b>50 cartes</b> en tout.<br>Lucas en a <b>10 de plus</b> que Hugo.<br>Max dit : « 50 ÷ 2 = 25. Hugo a 25 cartes. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Si Hugo a 25, Lucas a 35. Et 25 + 35 = 60, pas 50.<br>On enlève d'abord l'écart : 50 − 10 = 40.<br>Il reste 2 parts égales : 40 ÷ 2 = 20.<br><span class="big">Hugo a 20 cartes</span>, Lucas 30. Vérif : 20 + 30 = 50 ✓`,
      consigne: "Max dit que Hugo a 25 cartes. A-t-il raison ?",
      verification: { type: "qcm", choix: ["Oui, Hugo a 25 cartes", "Non : Hugo a 15 cartes", "Non : Hugo a 20 cartes"], bonne: 2 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les bouchons des trois classes",
      sorte: "defi",
      question: `Trois classes ramassent <b>660 bouchons</b> en tout.<br>La 6e A en a <b>le double</b> de la 6e B.<br>La 6e C en a <b>60 de plus</b> que la 6e B.<br><br>Combien de bouchons pour la <b>6e C</b> ?`,
      reponse: `6e B : 1 part. 6e A : 2 parts. 6e C : 1 part + 60.<br>On enlève les 60 : 660 − 60 = 600. Il reste 4 parts égales.<br>600 ÷ 4 = 150 : c'est la 6e B. La 6e C : 150 + 60 = <span class="big">210 bouchons</span>.<br>Vérif : 300 + 150 + 210 = 660 ✓`,
      consigne: "Combien de bouchons la 6e C a-t-elle ramassés ?",
      verification: { type: "courte", attendus: ["210"], unite: "bouchons" },
      dessin: bouchons(),
    },
  ],
};

export default problemes;
