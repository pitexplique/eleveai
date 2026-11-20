// Énigmes à projeter — 4e, notion divisibilite (le carnaval et les rangs de
// 10, le tournoi de baseball et les équipes de 9, les boîtes de macarons, les
// rangs du maraîcher, piège des deux phares « diviseur au lieu de multiple »,
// défi du trésor des pirates). Les lots sans reste (diviseur commun) sont déjà
// dans nombre_premier (la fleuriste) : ici on prend leur inverse, le rendez-vous.
// Les dessins ne sont pas des figures à mesurer. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// Trois pancartes avec un nombre chacune.
const pancartes = (nombres: string[], coul: string) =>
  nombres
    .map((n, i) => {
      const x = 30 + i * 145;
      return `<rect x="${x}" y="190" width="130" height="70" rx="12" fill="${coul}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>` +
        txt(x + 65, 236, n, C.craie, 28) +
        txt(x + 65, 290, ["A", "B", "C"][i], C.pale, 22);
    })
    .join("");

// Un rang de 10 danseurs (points), répété 3 fois, au-dessus des pancartes.
const carnaval = () => {
  let points = "";
  for (let r = 0; r < 3; r++)
    for (let k = 0; k < 10; k++)
      points += `<circle cx="${95 + k * 32}" cy="${60 + r * 34}" r="10" fill="${C.jaune}" fill-opacity=".7"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois groupes de danseurs de carnaval : 2 535, 3 452 et 4 270 personnes ; au-dessus, des rangs de 10 danseurs">
  ${points}
  ${txt(55, 102, "🎭", C.craie, 36)}
  ${txt(425, 102, "×10", C.rose, 24)}
  ${pancartes(["2 535", "3 452", "4 270"], C.jaune)}
  ${txt(240, 370, "en rangs de 10, sans personne à part", C.rose, 22)}
  </svg>`;
};

// Les trois clubs de baseball et les équipes de 9.
const baseball = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois clubs de baseball : 1 467, 2 345 et 3 576 joueurs ; on veut des équipes de 9">
  <text x="240" y="110" font-size="64" text-anchor="middle">⚾</text>
  ${txt(240, 160, "équipes de 9 joueurs", C.bleu, 24)}
  ${pancartes(["1 467", "2 345", "3 576"], C.bleu)}
  ${txt(240, 370, "quel club n'a personne de trop ?".replace(" ?", `${NB}?`), C.rose, 22)}
  </svg>`;

// Une boîte de 12 macarons (3 rangées de 4) et le tas de 250.
const macarons = () => {
  let ronds = "";
  for (let r = 0; r < 3; r++)
    for (let k = 0; k < 4; k++)
      ronds += `<circle cx="${80 + k * 50}" cy="${130 + r * 50}" r="19" fill="${C.rose}" fill-opacity=".4" stroke="${C.craie}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une boîte de 12 macarons, rangés en 3 rangées de 4 ; il y a 250 macarons à ranger">
  <rect x="45" y="95" width="210" height="160" rx="14" fill="none" stroke="${C.craie}" stroke-width="3"/>
  ${ronds}
  ${txt(150, 290, "une boîte = 12", C.craie, 24)}
  ${txt(370, 150, "250", C.jaune, 44)}
  ${txt(370, 185, "macarons", C.jaune, 22)}
  ${txt(370, 250, "?", C.rose, 40)}
  ${txt(370, 280, "en trop", C.rose, 22)}
  ${txt(240, 370, "seules les boîtes pleines partent", C.pale, 22)}
  </svg>`;
};

// Un champ de 60 salades : une façon de les ranger, 6 rangs de 10.
const salades = () => {
  let s = "";
  for (let r = 0; r < 6; r++)
    for (let k = 0; k < 10; k++)
      s += `<circle cx="${78 + k * 36}" cy="${70 + r * 36}" r="12" fill="${C.bleu}" fill-opacity=".45"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="60 salades plantées en 6 rangs de 10 : une des façons possibles de les ranger">
  <rect x="50" y="42" width="380" height="226" rx="12" fill="${C.jaune}" fill-opacity=".08" stroke="${C.craie}" stroke-width="3"/>
  ${s}
  ${txt(240, 310, "6 rangs de 10 : une façon".replace(" :", `${NB}:`), C.craie, 22)}
  ${txt(240, 345, "combien de façons en tout ?".replace(" ?", `${NB}?`), C.rose, 24)}
  <text x="240" y="400" font-size="36" text-anchor="middle">🥬</text>
  </svg>`;
};

// Les deux phares et ce que dit Léo.
const phare = (x: number, coul: string) =>
  `<path d="M${x - 22} 250 L${x - 14} 120 L${x + 14} 120 L${x + 22} 250 Z" fill="${coul}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>` +
  `<rect x="${x - 18}" y="96" width="36" height="24" fill="${C.jaune}" fill-opacity=".6" stroke="${C.craie}" stroke-width="3"/>` +
  `<path d="M${x - 24} 96 L${x} 78 L${x + 24} 96 Z" fill="${C.craie}"/>` +
  `<path d="M${x - 18} 160 L${x + 18} 160 M${x - 20} 205 L${x + 20} 205" stroke="${C.rose}" stroke-width="6"/>`;
const phares = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux phares : l'un s'allume toutes les 6 secondes, l'autre toutes les 10 secondes ; Léo pense qu'ils se rallument ensemble au bout de 2 secondes">
  ${phare(120, C.bleu)}
  ${phare(360, C.bleu)}
  ${txt(120, 285, "toutes les 6 s", C.craie, 22)}
  ${txt(360, 285, "toutes les 10 s", C.craie, 22)}
  <path d="M30 252 Q90 240 150 252 T270 252 T390 252 T450 252" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <rect x="50" y="320" width="380" height="60" rx="16" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 358, `Léo${NB}: « ensemble dans 2 s${NB}»`, C.rose, 24)}
  </svg>`;

// Le coffre des pirates et les restes.
const tresor = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un coffre de pirates plein de perles : rangées par 2, 3, 4, 5 ou 6, il en reste toujours une ; il y en a entre 10 et 100">
  <text x="240" y="120" font-size="72" text-anchor="middle">🏴‍☠️</text>
  <rect x="150" y="150" width="180" height="90" rx="10" fill="${C.jaune}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3"/>
  <path d="M150 180 L330 180" stroke="${C.craie}" stroke-width="3"/>
  ${txt(240, 222, "? perles", C.rose, 26)}
  ${txt(240, 285, "par 2, 3, 4, 5 ou 6", C.craie, 24)}
  ${txt(240, 320, "→ il en reste toujours 1", C.bleu, 24)}
  ${txt(240, 375, "entre 10 et 100", C.pale, 22)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "divisibilite",
  titre: "Énigmes sur les multiples et les diviseurs",
  description: "Le carnaval, le tournoi de baseball, les boîtes de macarons, les rangs du maraîcher, le piège des deux phares, le défi du trésor des pirates : utiliser les critères de divisibilité par 2, 3, 5, 9 et 10, poser une division euclidienne, lister les diviseurs par paires et trouver un multiple commun.",
  problemes: [
    {
      tag: "Énigme 1 · Le carnaval",
      titre: "Les rangs de 10",
      question: `Trois groupes défilent au carnaval.<br>Le groupe A compte 2 535 danseurs, le groupe B 3 452 et le groupe C 4 270.<br>Chaque groupe veut défiler en rangs de 10, sans personne à part.<br><br>Quel groupe peut le faire ?`,
      reponse: `Un nombre est divisible par 10 s'il se termine par 0.<br>2 535 se termine par 5 : non.<br>3 452 se termine par 2 : non.<br>4 270 se termine par 0 : oui, 4 270 ÷ 10 = 427 rangs.<br>C'est le <span class="big">groupe C (4 270)</span>.<br>4 270 est aussi divisible par 2 et par 5.`,
      consigne: "Quel groupe peut défiler en rangs de 10 sans personne à part ?",
      verification: { type: "qcm", choix: ["2 535", "3 452", "4 270"], bonne: 2 },
      dessin: carnaval(),
    },
    {
      tag: "Énigme 2 · Le tournoi de baseball",
      titre: "Des équipes de 9",
      question: `Au baseball, une équipe compte 9 joueurs.<br>Trois clubs ont 1 467, 2 345 et 3 576 joueurs.<br><br>Quel club peut former des équipes de 9, sans joueur de trop ?`,
      reponse: `Un nombre est divisible par 9 si la somme de ses chiffres est un multiple de 9.<br>1 467 : 1 + 4 + 6 + 7 = 18, multiple de 9 : oui.<br>2 345 : 2 + 3 + 4 + 5 = 14 : non.<br>3 576 : 3 + 5 + 7 + 6 = 21 : multiple de 3, mais pas de 9.<br>C'est le club de <span class="big">1 467 joueurs</span> : 1 467 ÷ 9 = 163 équipes.`,
      consigne: "Quel club peut former des équipes de 9 sans joueur de trop ?",
      verification: { type: "qcm", choix: ["1 467", "2 345", "3 576"], bonne: 0 },
      dessin: baseball(),
    },
    {
      tag: "Énigme 3 · La pâtisserie",
      titre: "Les boîtes de macarons",
      question: `Un pâtissier a fait 250 macarons.<br>Il les range dans des boîtes de 12.<br>Seules les boîtes pleines sont vendues.<br><br>Combien de macarons restent hors des boîtes ?`,
      reponse: `On pose la division euclidienne de 250 par 12.<br>12 × 20 = 240 et 12 × 21 = 252, trop grand.<br>250 = 12 × 20 + 10, et 10 est bien plus petit que 12.<br>Il remplit 20 boîtes.<br>Il reste <span class="big">10 macarons</span>.`,
      consigne: "Combien de macarons restent hors des boîtes ?",
      verification: { type: "courte", attendus: ["10"], unite: "macarons" },
      dessin: macarons(),
    },
    {
      tag: "Énigme 4 · Le maraîcher",
      titre: "Les rangs de salades",
      question: `Un maraîcher plante 60 salades.<br>Il veut des rangs qui ont tous le même nombre de salades.<br>Un seul rang de 60 compte aussi, comme 60 rangs de 1.<br><br>Combien de nombres de rangs différents peut-il choisir ?`,
      reponse: `Le nombre de rangs doit être un diviseur de 60.<br>On cherche les diviseurs par paires :<br>1 × 60, 2 × 30, 3 × 20, 4 × 15, 5 × 12, 6 × 10.<br>Après 6 et 10, les paires se croisent : on a tout.<br>Diviseurs : 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60.<br>Il peut choisir entre <span class="big">12 nombres de rangs</span>.`,
      consigne: "Combien de nombres de rangs différents le maraîcher peut-il choisir ?",
      verification: { type: "courte", attendus: ["12"] },
      dessin: salades(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux phares",
      sorte: "piege",
      question: `Un phare s'allume toutes les 6 secondes. Un autre, toutes les 10 secondes.<br>Ils viennent de s'allumer ensemble.<br>Léo dit : « Le plus grand diviseur commun de 6 et 10 est 2. Ils se rallument ensemble dans 2 secondes. »<br><br><b>Dans combien de secondes se rallument-ils vraiment ensemble ?</b>`,
      reponse: `Léo s'est trompé ! Au bout de 2 s, aucun phare ne s'est encore rallumé.<br>Pour un rendez-vous, on cherche un <b>multiple</b> commun, le plus petit.<br>Multiples de 6 : 6, 12, 18, 24, 30…<br>Multiples de 10 : 10, 20, 30…<br>Ils se rallument ensemble dans <span class="big">30 secondes</span>.<br>Le plus grand diviseur commun sert pour les lots, pas pour les rendez-vous.`,
      consigne: "Dans combien de secondes les deux phares se rallument-ils ensemble ?",
      verification: { type: "qcm", choix: ["2 s", "30 s", "60 s"], bonne: 1 },
      dessin: phares(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le trésor des pirates",
      sorte: "defi",
      question: `Des pirates comptent leurs perles.<br>Rangées par 2, par 3, par 4, par 5 ou par 6, il en reste toujours une.<br>Il y a entre 10 et 100 perles.<br><br>Combien y a-t-il de perles ?`,
      reponse: `Si on enlève une perle, il ne reste plus rien dans aucun rangement.<br>Ce nombre est donc un multiple commun de 2, 3, 4, 5 et 6.<br>Multiples de 5 et de 4 : 20, 40, 60, 80… Et 60 est aussi multiple de 3 et de 6 ; 20, 40 et 80 ne le sont pas.<br>Le suivant serait 120 : trop grand.<br>Donc 60 + 1 = 61 : il y a <span class="big">61 perles</span>.<br>Contrôle : 61 = 6 × 10 + 1 = 4 × 15 + 1 = 5 × 12 + 1.`,
      consigne: "Combien les pirates ont-ils de perles ?",
      verification: { type: "courte", attendus: ["61"], unite: "perles" },
      dessin: tresor(),
    },
  ],
};

export default problemes;
