// Énigmes à projeter — 5e, notion divisibilite (multiples, diviseurs,
// critères de divisibilité). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

// Des élèves en rangs de 9 (on en dessine 4 rangs, puis des points de suite).
const rangs = () => {
  let s = "";
  for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) s += `<circle cx="${80 + 40 * i}" cy="${90 + 50 * r}" r="12" fill="${C.bleu}" fill-opacity=".5" stroke="${C.bleu}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Des élèves alignés en rangs de 9">
  ${s}
  <text x="240" y="300" fill="${C.pale}" font-size="34" text-anchor="middle">⋮</text>
  <text x="240" y="50" fill="${C.craie}" font-size="22" text-anchor="middle">9 élèves par rang</text>
  <text x="240" y="365" fill="${C.rose}" font-size="28" text-anchor="middle">135 élèves : ? rangs</text>
  </svg>`;
};

const nombres = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois nombres : 472, 1 011 et 2 501">
  <text x="240" y="80" fill="${C.pale}" font-size="24" text-anchor="middle">lequel est divisible par 3 ?</text>
  <rect x="40" y="150" width="120" height="80" rx="10" fill="none" stroke="${C.bleu}" stroke-width="4"/><text x="100" y="202" fill="${C.bleu}" font-size="32" text-anchor="middle">472</text>
  <rect x="180" y="150" width="120" height="80" rx="10" fill="none" stroke="${C.jaune}" stroke-width="4"/><text x="240" y="202" fill="${C.jaune}" font-size="32" text-anchor="middle">1 011</text>
  <rect x="320" y="150" width="120" height="80" rx="10" fill="none" stroke="${C.rose}" stroke-width="4"/><text x="380" y="202" fill="${C.rose}" font-size="32" text-anchor="middle">2 501</text>
  <text x="240" y="320" fill="${C.craie}" font-size="24" text-anchor="middle">astuce : la somme des chiffres</text>
  </svg>`;

// Deux rectangles de 24 carreaux de 30 px : 6 × 4 et 8 × 3.
const grille = (x: number, y: number, l: number, h: number, c: string) => {
  let s = `<rect x="${x}" y="${y}" width="${30 * l}" height="${30 * h}" fill="${c}" fill-opacity=".18" stroke="${c}" stroke-width="3"/>`;
  for (let i = 1; i < l; i++) s += `<path d="M${x + 30 * i} ${y} L${x + 30 * i} ${y + 30 * h}" stroke="${c}" stroke-width="1.5"/>`;
  for (let j = 1; j < h; j++) s += `<path d="M${x} ${y + 30 * j} L${x + 30 * l} ${y + 30 * j}" stroke="${c}" stroke-width="1.5"/>`;
  return s;
};
const rectangles = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux rectangles de 24 carreaux : 6 sur 4 et 8 sur 3">
  ${grille(40, 50, 6, 4, C.bleu)}
  <text x="250" y="120" fill="${C.bleu}" font-size="24">6 × 4</text>
  ${grille(40, 220, 8, 3, C.jaune)}
  <text x="300" y="275" fill="${C.jaune}" font-size="24">8 × 3</text>
  <text x="240" y="380" fill="${C.rose}" font-size="26" text-anchor="middle">et combien d'autres ?</text>
  </svg>`;

// Une frise du temps de 0 à 24 s : x = 40 + 16t.
const guirlandes = () => {
  let s = `<path d="M40 220 L440 220" stroke="${C.craie}" stroke-width="3"/>`;
  for (let t = 0; t <= 24; t += 2) s += `<path d="M${40 + 16 * t} 212 L${40 + 16 * t} 228" stroke="${C.craie}" stroke-width="2"/>`;
  for (const t of [0, 6, 12, 18]) s += `<text x="${40 + 16 * t}" y="155" fill="${C.bleu}" font-size="18" text-anchor="middle">${t}</text>`;
  for (const t of [0, 8, 16]) s += `<text x="${40 + 16 * t}" y="295" fill="${C.rose}" font-size="18" text-anchor="middle">${t}</text>`;
  for (const t of [0, 6, 12, 18, 24]) s += `<circle cx="${40 + 16 * t}" cy="180" r="10" fill="${C.bleu}"/>`;
  for (const t of [0, 8, 16, 24]) s += `<circle cx="${40 + 16 * t}" cy="260" r="10" fill="${C.rose}"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une guirlande bleue toutes les 6 secondes et une rose toutes les 8 secondes">
  <text x="40" y="80" fill="${C.bleu}" font-size="22">bleue : toutes les 6 s</text>
  <text x="40" y="370" fill="${C.rose}" font-size="22">rose : toutes les 8 s</text>
  ${s}
  <text x="424" y="125" fill="${C.jaune}" font-size="34" text-anchor="middle">?</text>  </svg>`;
};

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le raisonnement d'Hugo : 34 finit par 4, donc il est divisible par 4">
  <text x="240" y="110" fill="${C.craie}" font-size="30" text-anchor="middle">« 34 finit par 4,</text>
  <text x="240" y="155" fill="${C.craie}" font-size="30" text-anchor="middle">donc il est divisible par 4. »</text>
  <text x="240" y="240" fill="${C.rose}" font-size="34" text-anchor="middle">Hugo a-t-il raison ?</text>
  <text x="240" y="330" fill="${C.pale}" font-size="22" text-anchor="middle">… 28, 32, 36, 40 …</text>
  </svg>`;

const billes = () => {
  let s = "";
  [2, 3, 4, 5, 6].forEach((n, k) => {
    s += `<rect x="${30 + 88 * k}" y="150" width="74" height="74" rx="10" fill="${C.jaune}" fill-opacity=".15" stroke="${C.jaune}" stroke-width="3"/>`;
    s += `<text x="${67 + 88 * k}" y="200" fill="${C.jaune}" font-size="30" text-anchor="middle">${n}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Des sachets de 2, 3, 4, 5 et 6 billes">
  <text x="240" y="90" fill="${C.craie}" font-size="24" text-anchor="middle">des sachets de…</text>
  ${s}
  <text x="240" y="290" fill="${C.pale}" font-size="22" text-anchor="middle">jamais de bille en trop</text>
  <text x="240" y="350" fill="${C.rose}" font-size="30" text-anchor="middle">moins de 100 billes : ?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "divisibilite",
  titre: "Énigmes sur les multiples et les diviseurs",
  description: "Multiples, diviseurs et critères de divisibilité en 5e : rangs d'élèves, divisible par 3, rectangles de 24 carreaux, guirlandes qui clignotent, piège du 34, billes en sachets. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Dans la cour",
      titre: "Les rangs de 9",
      question: `<b>135 élèves</b> se mettent en rangs de <b>9</b> pour la photo.<br><br>Tous les rangs sont-ils complets ? <b>Combien de rangs</b> ?`,
      reponse: `1 + 3 + 5 = 9 : 135 est divisible par 9.<br>135 ÷ 9 = 15. Il y a <span class="big">15 rangs</span>, tous complets.`,
      consigne: "Combien de rangs de 9 élèves fait-on avec 135 élèves ?",
      verification: { type: "courte", attendus: ["15"], unite: "rangs" },
      dessin: rangs(),
    },
    {
      tag: "Énigme 2 · Le bon critère",
      titre: "Divisible par 3",
      question: `Voici trois nombres : <b>472</b>, <b>1 011</b> et <b>2 501</b>.<br><br><b>Lequel est divisible par 3 ?</b>`,
      reponse: `On additionne les chiffres : 4 + 7 + 2 = 13 ; 1 + 0 + 1 + 1 = 3 ; 2 + 5 + 0 + 1 = 8.<br>Seul 3 est dans la table de 3 : c'est <span class="big">1 011</span> (= 3 × 337).`,
      consigne: "Lequel est divisible par 3 ?",
      verification: { type: "qcm", choix: ["472", "1 011", "2 501"], bonne: 1 },
      dessin: nombres(),
    },
    {
      tag: "Énigme 3 · Le carreleur",
      titre: "Les rectangles de 24 carreaux",
      question: `Avec <b>24 carreaux</b> carrés, on fait un rectangle plein.<br><br><b>Combien de rectangles différents</b> peut-on faire ? (6 × 4 et 4 × 6, c'est le même.)`,
      reponse: `On cherche les diviseurs de 24 par paires : 1 × 24, 2 × 12, 3 × 8, 4 × 6.<br>Il y a <span class="big">4 rectangles</span>.`,
      consigne: "Combien de rectangles différents avec 24 carreaux ?",
      verification: { type: "courte", attendus: ["4"], unite: "rectangles" },
      dessin: rectangles(),
    },
    {
      tag: "Énigme 4 · La fête",
      titre: "Les deux guirlandes",
      question: `Une guirlande bleue s'allume toutes les <b>6 secondes</b>. Une rose, toutes les <b>8 secondes</b>.<br>Elles s'allument ensemble au départ.<br><br><b>Dans combien de secondes</b> s'allument-elles de nouveau ensemble ?`,
      reponse: `Multiples de 6 : 6, 12, 18, 24… Multiples de 8 : 8, 16, 24…<br>Le premier commun : <span class="big">24 secondes</span>.`,
      consigne: "Dans combien de secondes s'allument-elles de nouveau ensemble ?",
      verification: { type: "courte", attendus: ["24"], unite: "s" },
      dessin: guirlandes(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le critère d'Hugo",
      sorte: "piege",
      question: `Hugo dit : « 34 finit par 4, donc 34 est divisible par 4. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! 4 × 8 = 32 et 4 × 9 = 36 : 34 n'est pas dans la table de 4.<br>34 ÷ 4 = 8 reste 2. Réponse : <span class="big">non</span>. Le critère de 4 regarde les deux derniers chiffres.`,
      consigne: "34 est-il divisible par 4 ?",
      verification: { type: "qcm", choix: ["Non", "Oui, il finit par 4", "Oui, car 4 × 8 = 34"], bonne: 0 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les billes en sachets",
      sorte: "defi",
      question: `Léa a <b>moins de 100 billes</b>.<br>Qu'elle les range par 2, par 3, par 4, par 5 ou par 6, il ne reste <b>jamais</b> de bille.<br><br><b>Combien a-t-elle de billes ?</b>`,
      reponse: `Le nombre est un multiple de 4, de 3 et de 5 : 4 × 3 × 5 = 60. Il marche aussi par 2 et par 6.<br>Le suivant, 120, dépasse 100. Léa a <span class="big">60 billes</span>.`,
      consigne: "Combien Léa a-t-elle de billes ?",
      verification: { type: "courte", attendus: ["60"], unite: "billes" },
      dessin: billes(),
    },
  ],
};

export default problemes;
