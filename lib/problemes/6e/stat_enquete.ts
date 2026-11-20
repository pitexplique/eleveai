// Énigmes à projeter — 6e, notion stat_enquete (planifier une enquête : qui
// interroger, réaliser une mesure et la consigner, construire un tableau
// d'effectifs avec des bâtons, lire un tableau, le piège des unités
// mélangées, le défi des deux réponses par personne). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-stat-enquete.tsx) : chacun doit
// avoir une chance d'être interrogé ; l'unité s'écrit une fois dans l'en-tête ;
// une ligne par réponse possible ; la somme des effectifs = le nombre de
// réponses. Phrases courtes (les 6e lisent difficilement).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

/** Lignes d'un tableau : traits horizontaux aux `ys`, verticaux aux `xs`. */
const grille = (xs: number[], ys: number[]) => {
  const x0 = xs[0], x1 = xs[xs.length - 1], y0 = ys[0], y1 = ys[ys.length - 1];
  let g = "";
  ys.forEach((y) => (g += `<path d="M${x0} ${y} L${x1} ${y}" fill="none" stroke="${C.craie}" stroke-width="2"/>`));
  xs.forEach((x) => (g += `<path d="M${x} ${y0} L${x} ${y1}" fill="none" stroke="${C.craie}" stroke-width="2"/>`));
  return g;
};

// 1. Le collège : 4 niveaux, chacun avec ses classes (pas de réponse dans le dessin).
const college = () => {
  let s = "";
  ["6e", "5e", "4e", "3e"].forEach((niv, i) => {
    const x = 50 + 100 * i;
    s += `<rect x="${x}" y="120" width="80" height="120" rx="10" fill="${C.bleu}" fill-opacity=".12" stroke="${C.bleu}" stroke-width="3"/>`;
    s += `<text x="${x + 40}" y="165" fill="${C.craie}" font-size="28" text-anchor="middle">${niv}</text>`;
    s += `<text x="${x + 40}" y="215" font-size="28" text-anchor="middle">🧑‍🎓</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le collège : les élèves de 6e, 5e, 4e et 3e">
  <text x="240" y="70" fill="${C.craie}" font-size="26" text-anchor="middle">Tout le collège</text>
  <rect x="30" y="95" width="420" height="170" rx="16" fill="none" stroke="${C.pale}" stroke-width="3" stroke-dasharray="10 8"/>
  ${s}
  <text x="240" y="310" fill="${C.pale}" font-size="22" text-anchor="middle">Quel club ouvrir le midi${NB}?</text>
  <text x="240" y="375" fill="${C.rose}" font-size="28" text-anchor="middle">Qui interroger${NB}?</text>
  </svg>`;
};

// 2. Le pluviomètre : 15 px par mm, 0 mm en y = 360, 20 mm en y = 60.
// Eau jusqu'à 14 mm : y = 360 − 14 × 15 = 150. Graduations tous les 2 mm.
const pluie = () => {
  const y = (mm: number) => 360 - 15 * mm;
  let s = "";
  for (let mm = 0; mm <= 20; mm += 2) {
    s += `<path d="M100 ${y(mm)} L${mm % 4 === 0 ? 122 : 114} ${y(mm)}" fill="none" stroke="${C.craie}" stroke-width="2"/>`;
    if (mm % 4 === 0) s += `<text x="90" y="${y(mm) + 7}" fill="${C.craie}" font-size="20" text-anchor="end">${mm}</text>`;
  }
  const lignes: [string, string][] = [["lun.", "6"], ["mar.", "9"], ["mer.", "?"]];
  let t = "";
  lignes.forEach(([j, v], k) => {
    const yy = 170 + 50 * k;
    t += `<text x="295" y="${yy + 34}" fill="${C.craie}" font-size="22" text-anchor="middle">${j}</text>`;
    t += `<text x="405" y="${yy + 35}" fill="${v === "?" ? C.rose : C.craie}" font-size="26" text-anchor="middle">${v}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un pluviomètre gradué en millimètres et le tableau de pluie de lundi, mardi et mercredi">
  <text x="130" y="40" fill="${C.pale}" font-size="20" text-anchor="middle">mm</text>
  <rect x="102" y="${y(14)}" width="56" height="${15 * 14}" fill="${C.bleu}" fill-opacity=".3"/>
  <path d="M100 50 L100 360 L160 360 L160 50" fill="none" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  ${s}
  <text x="130" y="392" fill="${C.pale}" font-size="20" text-anchor="middle">mercredi</text>
  ${grille([250, 340, 470], [120, 170, 220, 270, 320])}
  <text x="295" y="152" fill="${C.bleu}" font-size="20" text-anchor="middle">jour</text>
  <text x="405" y="152" fill="${C.bleu}" font-size="20" text-anchor="middle">pluie (mm)</text>
  ${t}
  <text x="360" y="380" fill="${C.rose}" font-size="22" text-anchor="middle">Quel nombre écrire${NB}?</text>
  </svg>`;
};

// 3. La mare : 20 observations, 4 rangées de 5.
// G : 2 + 2 + 2 + 1 = 7 ; L : 2 + 2 + 2 + 3 = 9 ; C : 1 + 1 + 1 + 1 = 4 ; 7 + 9 + 4 = 20.
const mare = () => {
  const rangs = ["GLLCG", "LGGLC", "LGLCG", "LLGCL"];
  let s = "";
  rangs.forEach((r, i) =>
    [...r].forEach((l, j) => {
      s += `<text x="${120 + 60 * j}" y="${115 + 48 * i}" fill="${C.craie}" font-size="32" text-anchor="middle">${l}</text>`;
    })
  );
  return `<svg viewBox="0 0 480 420" role="img" aria-label="La liste des 20 animaux vus à la mare, notés G, L ou C">
  <text x="240" y="48" fill="${C.craie}" font-size="22" text-anchor="middle">20 animaux vus à la mare</text>
  <rect x="70" y="70" width="340" height="205" rx="14" fill="none" stroke="${C.pale}" stroke-width="3" stroke-dasharray="10 8"/>
  ${s}
  <text x="240" y="312" fill="${C.pale}" font-size="22" text-anchor="middle">G${NB}: grenouille 🐸   L${NB}: libellule</text>
  <text x="240" y="344" fill="${C.pale}" font-size="22" text-anchor="middle">C${NB}: canard 🦆</text>
  <text x="240" y="393" fill="${C.rose}" font-size="26" text-anchor="middle">Effectif des libellules${NB}?</text>
  </svg>`;
};

// 4. Le glacier : parfum × (enfants, adultes). Vanille 12 / 9, chocolat 15 / 6, fraise 8 / 11.
const glacier = () => {
  const lignes: [string, number, number][] = [["vanille", 12, 9], ["chocolat", 15, 6], ["fraise", 8, 11]];
  let t = "";
  lignes.forEach(([p, e, a], k) => {
    const y = 150 + 55 * k;
    t += `<text x="110" y="${y + 37}" fill="${C.craie}" font-size="24" text-anchor="middle">${p}</text>`;
    t += `<text x="255" y="${y + 38}" fill="${C.craie}" font-size="28" text-anchor="middle">${e}</text>`;
    t += `<text x="385" y="${y + 38}" fill="${C.craie}" font-size="28" text-anchor="middle">${a}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau des glaces vendues : vanille, chocolat et fraise, pour les enfants et les adultes">
  <text x="240" y="70" font-size="40" text-anchor="middle">🍦</text>
  ${grille([30, 190, 320, 450], [100, 150, 205, 260, 315])}
  <text x="110" y="133" fill="${C.bleu}" font-size="22" text-anchor="middle">parfum</text>
  <text x="255" y="133" fill="${C.bleu}" font-size="22" text-anchor="middle">enfants</text>
  <text x="385" y="133" fill="${C.bleu}" font-size="22" text-anchor="middle">adultes</text>
  ${t}
  <text x="240" y="380" fill="${C.rose}" font-size="24" text-anchor="middle">Le parfum préféré des adultes${NB}?</text>
  </svg>`;
};

// 5. Le piège : les cartables. Lina 3,2 kg ; Théo 2 900 g ; Jules 3 kg.
const cartables = () => {
  const lignes: [string, string][] = [["Lina", "3,2 kg"], ["Théo", `2${NB}900 g`], ["Jules", "3 kg"]];
  let t = "";
  lignes.forEach(([nom, m], k) => {
    const y = 140 + 55 * k;
    t += `<text x="150" y="${y + 37}" fill="${C.craie}" font-size="26" text-anchor="middle">${nom}</text>`;
    t += `<text x="330" y="${y + 38}" fill="${C.craie}" font-size="28" text-anchor="middle">${m}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau des masses des cartables de Lina, Théo et Jules, dans des unités différentes">
  <text x="240" y="60" font-size="40" text-anchor="middle">🎒</text>
  ${grille([60, 240, 420], [90, 140, 195, 250, 305])}
  <text x="150" y="123" fill="${C.bleu}" font-size="22" text-anchor="middle">élève</text>
  <text x="330" y="123" fill="${C.bleu}" font-size="22" text-anchor="middle">masse</text>
  ${t}
  <text x="240" y="348" fill="${C.pale}" font-size="22" text-anchor="middle">Ninon${NB}: «${NB}2${NB}900, c'est plus grand${NB}!${NB}»</text>
  <text x="240" y="395" fill="${C.rose}" font-size="28" text-anchor="middle">Le plus lourd${NB}?</text>
  </svg>`;
};

// 6. Le défi : la colonie. Canoë 11, escalade 8, poney 6, tir à l'arc 5 : 30 choix.
const colonie = () => {
  const lignes: [string, number][] = [["canoë", 11], ["escalade", 8], ["poney", 6], ["tir à l'arc", 5]];
  let t = "";
  lignes.forEach(([a, v], k) => {
    const y = 130 + 48 * k;
    t += `<text x="160" y="${y + 33}" fill="${C.craie}" font-size="24" text-anchor="middle">${a}</text>`;
    t += `<text x="350" y="${y + 34}" fill="${C.craie}" font-size="28" text-anchor="middle">${v}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau des activités choisies en colonie : canoë, escalade, poney et tir à l'arc">
  <text x="240" y="45" fill="${C.jaune}" font-size="24" text-anchor="middle">2 activités par enfant</text>
  ${grille([60, 260, 440], [80, 130, 178, 226, 274, 322])}
  <text x="160" y="113" fill="${C.bleu}" font-size="22" text-anchor="middle">activité</text>
  <text x="350" y="113" fill="${C.bleu}" font-size="22" text-anchor="middle">effectif</text>
  ${t}
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">Combien d'enfants${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "stat_enquete",
  titre: "Énigmes sur l'enquête et le tableau d'effectifs",
  description: "Qui interroger au collège, le pluviomètre, les animaux de la mare, le glacier, le piège des cartables, les activités de la colonie.",
  problemes: [
    {
      tag: "Énigme 1 · Au conseil des délégués",
      titre: "Le club du midi",
      question: `Rose est déléguée de classe.<br>Le collège va ouvrir un club le midi.<br>Il doit plaire à <b>tous les élèves</b>.<br><br>Rose fait une enquête. <b>Qui doit-elle interroger ?</b>`,
      reponse: `Sa classe : il n'y a que des 6e.<br>Le club de foot : ils vont tous dire « foot » !<br>Il faut que chaque élève ait une chance d'être choisi.<br><span class="big">On tire au sort dans chaque classe.</span>`,
      consigne: "Qui Rose doit-elle interroger pour son enquête ?",
      verification: {
        type: "qcm",
        choix: ["Les 25 élèves de sa classe", "Les élèves du club de foot", "4 élèves tirés au sort dans chaque classe"],
        bonne: 2,
      },
      dessin: college(),
    },
    {
      tag: "Énigme 2 · À la station météo",
      titre: "Le pluviomètre",
      question: `Kélya habite à la Plaine-des-Palmistes, à La Réunion.<br>Il y pleut beaucoup.<br>Chaque soir, elle lit son <b>pluviomètre</b> et note la pluie.<br><br>Mercredi, quel nombre écrit-elle dans le tableau ?`,
      reponse: `L'eau arrive au petit trait entre 12 et 16.<br>D'un trait au suivant, 2 mm : 12 + 2 = 14.<br>Elle écrit <span class="big">14</span> dans la case.<br>Pas besoin d'écrire « mm » : l'unité est déjà dans l'en-tête.`,
      consigne: "Combien de millimètres de pluie mercredi ?",
      verification: { type: "courte", attendus: ["14"], unite: "mm" },
      dessin: pluie(),
    },
    {
      tag: "Énigme 3 · Au bord de la mare",
      titre: "Les animaux de la mare",
      question: `La classe observe une mare.<br>Elle note chaque animal vu : G, L ou C.<br>Il faut ranger la liste dans un <b>tableau d'effectifs</b>.<br><br>Quel est l'effectif des <b>libellules</b> ?`,
      reponse: `Le tableau a 3 lignes : une par animal possible.<br>On lit la liste une fois, et on trace un bâton par lettre.<br>Grenouilles 7, libellules 9, canards 4.<br>Contrôle : 7 + 9 + 4 = 20. L'effectif des libellules : <span class="big">9</span>.`,
      consigne: "Quel est l'effectif des libellules ?",
      verification: { type: "courte", attendus: ["9"], unite: "libellules" },
      dessin: mare(),
    },
    {
      tag: "Énigme 4 · Chez le glacier",
      titre: "Les glaces de l'été",
      question: `Le glacier note les glaces vendues dans un tableau.<br>Il sépare les enfants et les adultes.<br><br>Quel parfum les <b>adultes</b> ont-ils choisi le plus ?`,
      reponse: `On lit seulement la colonne « adultes », de haut en bas.<br>Vanille 9, chocolat 6, fraise 11.<br>Le plus grand nombre est 11 : <span class="big">la fraise</span>.<br>Le chocolat gagne chez les enfants, pas chez les adultes !`,
      consigne: "Quel parfum les adultes ont-ils le plus choisi ?",
      verification: { type: "qcm", choix: ["La vanille", "La fraise", "Le chocolat"], bonne: 1 },
      dessin: glacier(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les cartables",
      sorte: "piege",
      question: `La classe pèse les cartables.<br>Lina : 3,2 kg. Théo : 2 900 g. Jules : 3 kg.<br>Ninon dit : « Le plus lourd, c'est Théo. 2 900, c'est le plus grand nombre ! »<br><br><b>Qui a le cartable le plus lourd ?</b>`,
      reponse: `Attention : les unités ne sont pas les mêmes !<br>2 900 g, c'est 2,9 kg.<br>On compare : 3,2 kg, 2,9 kg et 3 kg.<br>Le plus lourd : <span class="big">le cartable de Lina</span>.<br>Dans un tableau, on écrit tout dans la même unité : « masse (kg) ».`,
      consigne: "Qui a le cartable le plus lourd ?",
      verification: { type: "qcm", choix: ["Lina", "Théo", "Jules"], bonne: 0 },
      dessin: cartables(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les activités de la colonie",
      sorte: "defi",
      question: `En colonie, chaque enfant choisit <b>2 activités</b> différentes.<br>Le moniteur compte les choix dans un tableau.<br>La somme des effectifs fait 30.<br><br><b>Combien d'enfants</b> y a-t-il ?`,
      reponse: `11 + 8 + 6 + 5 = 30 choix.<br>Mais chaque enfant compte 2 fois : un choix par activité.<br>30 ÷ 2 = 15.<br>Il y a <span class="big">15 enfants</span>.<br>Ici, la somme des effectifs, c'est le nombre de choix, pas d'enfants.`,
      consigne: "Combien d'enfants y a-t-il dans la colonie ?",
      verification: { type: "courte", attendus: ["15"], unite: "enfants" },
      dessin: colonie(),
    },
  ],
};

export default problemes;
