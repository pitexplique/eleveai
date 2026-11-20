// Énigmes à projeter — 6e, notion proba_frequence (calculer une fréquence
// observée, comparer l'observé au calculé, répéter : l'écart se réduit,
// comparer deux fréquences, le piège de la fréquence plus grande que 1,
// le défi de la classe qui met ses lancers en commun). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-proba-frequence.tsx) :
// fréquence = nombre de fois obtenu ÷ nombre d'essais, entre 0 et 1, en
// décimal ou en % ; la probabilité se dit « 1 chance sur 4 » et se calcule
// AVANT ; on attend « environ » 40 ÷ 4 = 10 ; plus on répète, plus on s'approche.
// Phrases courtes (les 6e lisent difficilement).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

// 1. Le mini-golf : 20 essais en 2 rangées de 10 (pas de 40 px, x = 60 → 420).
// 7 réussites (cases 1, 4, 5, 9, 12, 16, 18), 13 ratés : 7 + 13 = 20.
const minigolf = () => {
  const reussis = [1, 4, 5, 9, 12, 16, 18];
  let s = "";
  for (let i = 0; i < 20; i++) {
    const x = 60 + 40 * (i % 10), y = i < 10 ? 150 : 210;
    s += reussis.includes(i)
      ? `<circle cx="${x}" cy="${y}" r="15" fill="${C.bleu}" fill-opacity=".45" stroke="${C.bleu}" stroke-width="3"/>`
      : `<path d="M${x - 10} ${y - 10} L${x + 10} ${y + 10} M${x + 10} ${y - 10} L${x - 10} ${y + 10}" fill="none" stroke="${C.pale}" stroke-width="3" stroke-linecap="round"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="20 essais de Nour au mini-golf : des ronds pour les réussites, des croix pour les ratés">
  <text x="240" y="70" font-size="40" text-anchor="middle">⛳</text>
  <text x="240" y="112" fill="${C.craie}" font-size="22" text-anchor="middle">20 essais</text>
  ${s}
  <circle cx="130" cy="272" r="13" fill="${C.bleu}" fill-opacity=".45" stroke="${C.bleu}" stroke-width="3"/>
  <text x="152" y="280" fill="${C.craie}" font-size="22">réussi</text>
  <path d="M290 262 L310 282 M310 262 L290 282" fill="none" stroke="${C.pale}" stroke-width="3" stroke-linecap="round"/>
  <text x="322" y="280" fill="${C.craie}" font-size="22">raté</text>
  <text x="240" y="365" fill="${C.rose}" font-size="26" text-anchor="middle">Fréquence des réussites${NB}?</text>
  </svg>`;
};

// 2. Le jeu de cartes : 4 cartes 80 × 110, écart 20 : 4 × 80 + 3 × 20 = 380, x = 50 → 430.
const cartes = () => {
  let s = "";
  for (let i = 0; i < 4; i++) {
    const x = 50 + 100 * i;
    s += `<rect x="${x}" y="70" width="80" height="110" rx="10" fill="${C.pale}" fill-opacity=".12" stroke="${i === 3 ? C.bleu : C.craie}" stroke-width="${i === 3 ? 5 : 3}"/>`;
    s += `<text x="${x + 40}" y="140" fill="${i === 3 ? C.bleu : C.craie}" font-size="44" text-anchor="middle">${i + 1}</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Quatre cartes numérotées de 1 à 4 ; la carte 4 est sortie 13 fois sur 40 tirages">
  ${s}
  <text x="240" y="235" fill="${C.pale}" font-size="22" text-anchor="middle">On tire, on remet, on mélange.</text>
  <text x="240" y="280" fill="${C.craie}" font-size="24" text-anchor="middle">40 tirages</text>
  <text x="240" y="322" fill="${C.bleu}" font-size="26" text-anchor="middle">la carte 4 sort 13 fois</text>
  <text x="240" y="385" fill="${C.rose}" font-size="28" text-anchor="middle">Mila${NB}: «${NB}C'est truqué${NB}!${NB}»</text>
  </svg>`;
};

// 3. La pêche aux canards : 10 canards (2 rangées de 5), 2 portent une étoile.
// Fréquences de l'étoile : Zoé 0,4 (10 pêches), Maé 0,3 (50), Ilan 0,21 (1 000).
const canards = () => {
  let s = "";
  for (let i = 0; i < 10; i++) {
    const x = 120 + 60 * (i % 5), y = i < 5 ? 100 : 150;
    s += `<text x="${x}" y="${y}" font-size="32" text-anchor="middle">🦆</text>`;
    if (i === 2 || i === 8) s += `<text x="${x + 24}" y="${y - 22}" fill="${C.jaune}" font-size="24" text-anchor="middle">★</text>`;
  }
  const lignes: [string, string][] = [["Zoé", "0,4"], ["Maé", "0,3"], ["Ilan", "0,21"]];
  let t = "";
  lignes.forEach(([nom, f], k) => {
    const y = 255 + 44 * k;
    t += `<text x="150" y="${y}" fill="${C.craie}" font-size="26" text-anchor="middle">${nom}</text>`;
    t += `<text x="330" y="${y}" fill="${C.bleu}" font-size="28" text-anchor="middle">${f}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un bassin de 10 canards dont 2 ont une étoile, et les fréquences de l'étoile pour Zoé, Maé et Ilan">
  <ellipse cx="240" cy="110" rx="200" ry="72" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="3"/>
  ${s}
  <text x="330" y="212" fill="${C.pale}" font-size="20" text-anchor="middle">fréquence de ★</text>
  ${t}
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">Qui a pêché 1${NB}000 fois${NB}?</text>
  </svg>`;
};

// 4. Le ping-pong : Lou 15 sur 20, Sacha 32 sur 50.
const pingpong = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Lou réussit 15 services sur 20, Sacha 32 services sur 50">
  <text x="240" y="75" font-size="44" text-anchor="middle">🏓</text>
  <path d="M240 110 L240 300" fill="none" stroke="${C.pale}" stroke-width="2" stroke-dasharray="8 8"/>
  <text x="125" y="140" fill="${C.jaune}" font-size="32" text-anchor="middle">Lou</text>
  <text x="125" y="200" fill="${C.craie}" font-size="26" text-anchor="middle">15 réussis</text>
  <text x="125" y="245" fill="${C.pale}" font-size="22" text-anchor="middle">sur 20 services</text>
  <text x="355" y="140" fill="${C.bleu}" font-size="32" text-anchor="middle">Sacha</text>
  <text x="355" y="200" fill="${C.craie}" font-size="26" text-anchor="middle">32 réussis</text>
  <text x="355" y="245" fill="${C.pale}" font-size="22" text-anchor="middle">sur 50 services</text>
  <text x="240" y="370" fill="${C.rose}" font-size="28" text-anchor="middle">Qui sert le mieux${NB}?</text>
  </svg>`;

// 5. Le piège : le calcul de Gabin au chamboule-tout.
const gabin = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Gabin a lancé 20 balles et réussi 8 fois ; il écrit 20 divisé par 8 égale 2,5">
  <text x="240" y="70" font-size="40" text-anchor="middle">🥫</text>
  <text x="240" y="125" fill="${C.craie}" font-size="24" text-anchor="middle">20 balles lancées · 8 réussies</text>
  <text x="240" y="215" fill="${C.jaune}" font-size="48" text-anchor="middle">20 ÷ 8 = 2,5</text>
  <text x="240" y="285" fill="${C.pale}" font-size="22" text-anchor="middle">Gabin${NB}: «${NB}ma fréquence vaut 2,5${NB}!${NB}»</text>
  <text x="240" y="370" fill="${C.rose}" font-size="34" text-anchor="middle">Vrai ou faux${NB}?</text>
  </svg>`;

// 6. Le défi : la punaise, 5 groupes × 20 lancers = 100.
// Pointe en haut : 12, 9, 14, 11, 10 (somme 56).
const punaise = () => {
  const vals = [12, 9, 14, 11, 10];
  let s = "";
  vals.forEach((v, i) => {
    const y = 118 + 42 * i;
    s += `<text x="150" y="${y + 29}" fill="${C.craie}" font-size="22" text-anchor="middle">groupe ${i + 1}</text>`;
    s += `<text x="340" y="${y + 30}" fill="${C.bleu}" font-size="26" text-anchor="middle">${v}</text>`;
  });
  let g = "";
  for (let k = 0; k <= 6; k++) {
    const y = k === 0 ? 76 : 118 + 42 * (k - 1);
    g += `<path d="M60 ${y} L420 ${y}" fill="none" stroke="${C.craie}" stroke-width="2"/>`;
  }
  g += `<path d="M60 76 L60 328 M240 76 L240 328 M420 76 L420 328" fill="none" stroke="${C.craie}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau : 5 groupes lancent chacun une punaise 20 fois et notent les « pointe en haut »">
  <circle cx="50" cy="56" r="18" fill="${C.rose}" fill-opacity=".4" stroke="${C.craie}" stroke-width="3"/>
  <path d="M50 38 L50 10" fill="none" stroke="${C.craie}" stroke-width="3" stroke-linecap="round"/>
  <text x="250" y="45" fill="${C.craie}" font-size="22" text-anchor="middle">20 lancers par groupe</text>
  ${g}
  <text x="150" y="105" fill="${C.pale}" font-size="20" text-anchor="middle">groupe</text>
  <text x="330" y="105" fill="${C.pale}" font-size="20" text-anchor="middle">pointe en haut</text>
  ${s}
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">Et toute la classe${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "proba_frequence",
  titre: "Énigmes sur la fréquence",
  description: "Le mini-golf, les cartes de Mila, la pêche aux canards, le ping-pong, le piège de Gabin, la punaise de toute la classe.",
  problemes: [
    {
      tag: "Énigme 1 · Au mini-golf",
      titre: "Le trou du moulin",
      question: `Au mini-golf, Nour tente <b>20 fois</b> le trou du moulin.<br>La balle passe <b>7 fois</b>.<br><br>Quelle est la <b>fréquence</b> de ses réussites ?`,
      reponse: `Fréquence = nombre de réussites ÷ nombre d'essais.<br>7 ÷ 20 = 0,35.<br>La fréquence vaut <span class="big">0,35, soit 35 %</span>.<br>Elle est bien entre 0 et 1.`,
      consigne: "Quelle est la fréquence des réussites de Nour ? (écris un nombre décimal)",
      verification: { type: "courte", attendus: ["0,35", "0.35", ",35", "35%"] },
      dessin: minigolf(),
    },
    {
      tag: "Énigme 2 · Au jeu de cartes",
      titre: "La carte 4",
      question: `Mila a <b>4 cartes</b>, numérotées de 1 à 4.<br>Elle en tire une, puis la remet et mélange.<br>Elle recommence : <b>40 tirages</b> en tout.<br>La carte 4 sort <b>13 fois</b>.<br><br>Mila dit : « C'est truqué ! » A-t-elle raison ?`,
      reponse: `Avant de tirer : la carte 4 a 1 chance sur 4.<br>On attend donc environ 40 ÷ 4 = 10 fois la carte 4.<br>Elle sort 13 fois : 3 de plus. Sur 40 tirages, c'est un petit écart.<br><span class="big">Pas truqué : c'est le hasard !</span>`,
      consigne: "La carte 4 sort 13 fois sur 40 tirages. Le jeu est-il truqué ?",
      verification: {
        type: "qcm",
        choix: ["Oui : elle devait sortir 10 fois pile", "Non : on attendait environ 10, l'écart est normal", "Oui : 13, c'est plus que la moitié de 40"],
        bonne: 1,
      },
      dessin: cartes(),
    },
    {
      tag: "Énigme 3 · À la pêche aux canards",
      titre: "Le canard étoilé",
      question: `Le bassin a <b>10 canards</b>. <b>2</b> ont une étoile.<br>On pêche un canard, puis on le remet.<br>Zoé, Maé et Ilan pêchent chacun de nombreuses fois.<br>L'un d'eux a pêché <b>1 000 fois</b>.<br><br>Qui, sans doute ?`,
      reponse: `L'étoile a 2 chances sur 10 : 2 ÷ 10 = 0,2.<br>Écarts à 0,2 : Zoé 0,2, Maé 0,1, Ilan 0,01.<br>Plus on répète, plus la fréquence se rapproche de 0,2.<br><span class="big">C'est sans doute Ilan.</span>`,
      consigne: "Qui a sans doute pêché 1 000 fois ?",
      verification: { type: "qcm", choix: ["Zoé (0,4)", "Maé (0,3)", "Ilan (0,21)"], bonne: 2 },
      dessin: canards(),
    },
    {
      tag: "Énigme 4 · Au ping-pong",
      titre: "Les services",
      question: `Lou réussit <b>15 services sur 20</b>.<br>Sacha réussit <b>32 services sur 50</b>.<br>Sacha a plus de réussites.<br><br><b>Qui sert le mieux ?</b>`,
      reponse: `On compare les fréquences, pas les nombres.<br>Lou : 15 ÷ 20 = 0,75, soit 75 %.<br>Sacha : 32 ÷ 50 = 0,64, soit 64 %.<br>0,75 est plus grand que 0,64 : <span class="big">c'est Lou.</span>`,
      consigne: "Qui réussit le mieux ses services ?",
      verification: { type: "qcm", choix: ["Lou", "Sacha", "Ils réussissent autant"], bonne: 0 },
      dessin: pingpong(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le calcul de Gabin",
      sorte: "piege",
      question: `Au chamboule-tout, Gabin lance <b>20 balles</b>.<br>Il réussit <b>8 fois</b>.<br>Il écrit : 20 ÷ 8 = 2,5.<br>« Ma fréquence vaut 2,5 ! »<br><br><b>Quelle est la vraie fréquence ?</b>`,
      reponse: `Une fréquence n'est jamais plus grande que 1 : on ne réussit pas plus souvent qu'on ne lance !<br>Gabin a divisé à l'envers.<br>On divise les réussites par les essais : 8 ÷ 20 = 0,4.<br>La vraie fréquence : <span class="big">0,4, soit 40 %</span>.`,
      consigne: "Gabin réussit 8 lancers sur 20. Quelle est sa fréquence de réussite ? (nombre décimal)",
      verification: { type: "courte", attendus: ["0,4", "0.4", ",4", "0,40", "40%"] },
      dessin: gabin(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La punaise de la classe",
      sorte: "defi",
      question: `Une punaise tombe pointe en haut, ou couchée.<br>Ce n'est pas un dé : on ne peut pas calculer ses chances.<br>5 groupes la lancent <b>20 fois</b> chacun.<br><br>Quelle est la fréquence de « pointe en haut » pour <b>toute la classe</b> ?`,
      reponse: `Les groupes trouvent de 0,45 à 0,7 : les séries courtes bougent beaucoup.<br>On met tout en commun : 5 × 20 = 100 lancers.<br>12 + 9 + 14 + 11 + 10 = 56 fois pointe en haut.<br>56 ÷ 100 = <span class="big">0,56, soit 56 %</span>.<br>Sur 100 lancers, on peut lui faire plus confiance.`,
      consigne: "Quelle est la fréquence de « pointe en haut » pour toute la classe ? (nombre décimal)",
      verification: { type: "courte", attendus: ["0,56", "0.56", ",56", "56%"] },
      dessin: punaise(),
    },
  ],
};

export default problemes;
