// Énigmes à projeter — 5e, notion prop_ratio_pourcentage (ratios,
// appliquer et calculer un pourcentage). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

// Une barre de n parts égales (largeur l), colorées selon `couleurs`.
const barre = (x: number, y: number, l: number, couleurs: string[]) => {
  const w = l / couleurs.length;
  return couleurs.map((c, i) => `<rect x="${x + w * i}" y="${y}" width="${w}" height="50" fill="${c}" fill-opacity=".35" stroke="${C.craie}" stroke-width="2"/>`).join("");
};

const sirop = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une boisson de 2 litres : 1 part de sirop pour 7 parts d'eau">
  <text x="240" y="80" fill="${C.craie}" font-size="26" text-anchor="middle">sirop : eau = 1 : 7</text>
  ${barre(40, 150, 400, [C.rose, C.bleu, C.bleu, C.bleu, C.bleu, C.bleu, C.bleu, C.bleu])}
  <text x="65" y="235" fill="${C.rose}" font-size="20" text-anchor="middle">sirop</text>
  <text x="265" y="235" fill="${C.bleu}" font-size="20" text-anchor="middle">eau</text>
  <text x="240" y="300" fill="${C.craie}" font-size="26" text-anchor="middle">en tout : 2 L</text>
  <text x="240" y="360" fill="${C.rose}" font-size="28" text-anchor="middle">sirop : ? mL</text>
  </svg>`;

const etiquette = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une étiquette : 45 euros, moins 20 pour cent">
  <path d="M120 100 L360 100 L420 210 L360 320 L120 320 Z" fill="${C.jaune}" fill-opacity=".15" stroke="${C.jaune}" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="370" cy="210" r="12" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <text x="230" y="180" fill="${C.craie}" font-size="44" text-anchor="middle">45 €</text>
  <text x="230" y="260" fill="${C.rose}" font-size="44" text-anchor="middle">− 20 %</text>
  <text x="240" y="385" fill="${C.bleu}" font-size="28" text-anchor="middle">nouveau prix : ?</text>
  </svg>`;

// 30 élèves : 3 rangées de 10, les 12 premiers colorés.
const pied = () => {
  let s = "";
  for (let i = 0; i < 30; i++) s += `<circle cx="${60 + 40 * (i % 10)}" cy="${120 + 60 * Math.floor(i / 10)}" r="14" fill="${i < 12 ? C.jaune : C.pale}" fill-opacity="${i < 12 ? 1 : 0.5}"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="30 élèves, dont 12 viennent à pied">
  <text x="240" y="70" fill="${C.craie}" font-size="24" text-anchor="middle">30 élèves</text>
  ${s}
  <text x="240" y="320" fill="${C.jaune}" font-size="24" text-anchor="middle">12 viennent à pied</text>
  <text x="240" y="370" fill="${C.rose}" font-size="28" text-anchor="middle">? %</text>
  </svg>`;
};

const billes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="35 billes partagées dans le ratio 2 : 5">
  <text x="240" y="80" fill="${C.craie}" font-size="26" text-anchor="middle">35 billes, ratio 2 : 5</text>
  ${barre(40, 150, 400, [C.bleu, C.bleu, C.jaune, C.jaune, C.jaune, C.jaune, C.jaune])}
  <text x="97" y="235" fill="${C.bleu}" font-size="22" text-anchor="middle">Zoé</text>
  <text x="297" y="235" fill="${C.jaune}" font-size="22" text-anchor="middle">Malo</text>
  <text x="240" y="330" fill="${C.rose}" font-size="28" text-anchor="middle">Malo : ? billes</text>
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un vélo à 100 euros : plus 10 pour cent, puis moins 10 pour cent">
  <text x="80" y="210" fill="${C.craie}" font-size="34" text-anchor="middle">100 €</text>
  <path d="M130 180 Q190 120 250 180 M238 168 L250 180 L234 184" stroke="${C.bleu}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="190" y="120" fill="${C.bleu}" font-size="26" text-anchor="middle">+10 %</text>
  <text x="270" y="210" fill="${C.craie}" font-size="34" text-anchor="middle">?</text>
  <path d="M290 230 Q350 290 410 230 M398 242 L410 230 L394 226" stroke="${C.rose}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="350" y="310" fill="${C.rose}" font-size="26" text-anchor="middle">−10 %</text>
  <text x="430" y="210" fill="${C.craie}" font-size="34" text-anchor="middle">?</text>
  <text x="240" y="380" fill="${C.pale}" font-size="22" text-anchor="middle">revient-on à 100 € ?</text>
  </svg>`;

// La classe : 3 parts de filles, 4 parts de garçons (28 élèves).
const classe = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une classe de 28 élèves, ratio filles : garçons = 3 : 4">
  <text x="240" y="80" fill="${C.craie}" font-size="26" text-anchor="middle">filles : garçons = 3 : 4</text>
  ${barre(40, 150, 400, [C.rose, C.rose, C.rose, C.bleu, C.bleu, C.bleu, C.bleu])}
  <text x="126" y="235" fill="${C.rose}" font-size="22" text-anchor="middle">filles</text>
  <text x="326" y="235" fill="${C.bleu}" font-size="22" text-anchor="middle">garçons</text>
  <text x="240" y="300" fill="${C.craie}" font-size="24" text-anchor="middle">28 élèves, puis 2 filles arrivent</text>
  <text x="240" y="360" fill="${C.jaune}" font-size="28" text-anchor="middle">nouveau ratio : ?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "prop_ratio_pourcentage",
  titre: "Énigmes sur les ratios et les pourcentages",
  description: "Ratios et pourcentages en 5e : sirop dilué, soldes à −20 %, élèves qui viennent à pied, partage de billes, piège du +10 % puis −10 %, ratio d'une classe. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Le goûter",
      titre: "Le sirop dilué",
      question: `On mélange du sirop et de l'eau dans le ratio <b>1 : 7</b>.<br>On veut <b>2 L</b> de boisson.<br><br><b>Combien de mL de sirop</b> faut-il ?`,
      reponse: `1 + 7 = 8 parts. 2 L = 2 000 mL. Une part : 2 000 ÷ 8 = 250 mL.<br>Il faut <span class="big">250 mL</span> de sirop (et 1 750 mL d'eau).`,
      consigne: "Combien de mL de sirop faut-il ?",
      verification: { type: "courte", attendus: ["250"], unite: "mL" },
      dessin: sirop(),
    },
    {
      tag: "Énigme 2 · Les soldes",
      titre: "Le sweat à −20 %",
      question: `Un sweat coûte <b>45 €</b>.<br>Pendant les soldes, son prix baisse de <b>20 %</b>.<br><br><b>Quel est son nouveau prix ?</b>`,
      reponse: `20 % de 45 € : 45 × 20 ÷ 100 = 9 €.<br>Nouveau prix : 45 − 9 = <span class="big">36 €</span>.`,
      consigne: "Quel est le nouveau prix du sweat, en euros ?",
      verification: { type: "courte", attendus: ["36"], unite: "€" },
      dessin: etiquette(),
    },
    {
      tag: "Énigme 3 · Le trajet du matin",
      titre: "Ceux qui viennent à pied",
      question: `Dans une classe de <b>30 élèves</b>, <b>12</b> viennent à pied.<br><br><b>Quel pourcentage</b> des élèves vient à pied ?`,
      reponse: `12 sur 30, c'est 4 sur 10, donc 40 sur 100.<br><span class="big">40 %</span> des élèves viennent à pied.`,
      consigne: "Quel pourcentage des élèves vient à pied ?",
      verification: { type: "courte", attendus: ["40"], unite: "%" },
      dessin: pied(),
    },
    {
      tag: "Énigme 4 · Le partage",
      titre: "Les billes de Zoé et Malo",
      question: `Zoé et Malo se partagent <b>35 billes</b> dans le ratio <b>2 : 5</b>.<br><br><b>Combien de billes</b> reçoit Malo ?`,
      reponse: `2 + 5 = 7 parts. Une part : 35 ÷ 7 = 5 billes.<br>Malo a 5 parts : 5 × 5 = <span class="big">25 billes</span>. (Zoé en a 10.)`,
      consigne: "Combien de billes reçoit Malo ?",
      verification: { type: "qcm", choix: ["14", "25", "20"], bonne: 1 },
      dessin: billes(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le prix du vélo",
      sorte: "piege",
      question: `Un vélo coûte <b>100 €</b>. Son prix augmente de <b>10 %</b>, puis baisse de <b>10 %</b>.<br><br><b>Combien coûte-t-il à la fin ?</b>`,
      reponse: `+10 % : 100 + 10 = 110 €. Puis −10 % de 110 € : 110 − 11 = 99 €.<br>Il coûte <span class="big">99 €</span>, pas 100 € : les deux 10 % ne portent pas sur le même prix.`,
      consigne: "Combien coûte le vélo à la fin ?",
      verification: { type: "qcm", choix: ["100 €", "90 €", "99 €"], bonne: 2 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le ratio de la classe",
      sorte: "defi",
      question: `Dans une classe de <b>28 élèves</b>, le ratio filles : garçons est <b>3 : 4</b>.<br><b>2 filles</b> arrivent en cours d'année.<br><br><b>Quel est le nouveau ratio</b> filles : garçons ?`,
      reponse: `7 parts : 28 ÷ 7 = 4. Filles : 3 × 4 = 12. Garçons : 4 × 4 = 16.<br>Après : 14 filles et 16 garçons. 14 : 16 = <span class="big">7 : 8</span>.`,
      consigne: "Quel est le nouveau ratio filles : garçons ?",
      verification: { type: "qcm", choix: ["7 : 8", "5 : 6", "3 : 4"], bonne: 0 },
      dessin: classe(),
    },
  ],
};

export default problemes;
