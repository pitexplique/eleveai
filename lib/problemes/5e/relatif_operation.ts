// Énigmes à projeter — 5e, notion relatif_operation (additionner et
// soustraire des relatifs, en contexte). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const signe = (k: number) => (k < 0 ? "−" + -k : String(k));

// Un immeuble : étage k centré en y = 240 − 30k, de −3 à 5. Le sol entre 0 et −1.
const ascenseur = () => {
  let s = "";
  for (let k = 5; k >= -3; k--) {
    const y = 240 - 30 * k;
    s += `<text x="160" y="${y + 8}" fill="${k < 0 ? C.pale : C.craie}" font-size="22" text-anchor="end">${signe(k)}</text>`;
    s += `<path d="M175 ${y + 15} L285 ${y + 15}" stroke="${C.pale}" stroke-width="1.5"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un immeuble de 5 étages avec 3 niveaux de parking ; l'ascenseur part du niveau −2">
  <rect x="175" y="255" width="110" height="90" fill="${C.pale}" fill-opacity=".18"/>
  <rect x="175" y="75" width="110" height="270" fill="none" stroke="${C.craie}" stroke-width="3"/>
  ${s}
  <path d="M40 255 L440 255" stroke="${C.jaune}" stroke-width="4"/>
  <text x="440" y="282" fill="${C.jaune}" font-size="20" text-anchor="end">le sol</text>
  <rect x="215" y="285" width="30" height="30" rx="4" fill="${C.bleu}" fill-opacity=".5" stroke="${C.bleu}" stroke-width="3"/>
  <path d="M330 310 L330 160 M318 172 L330 160 L342 172" stroke="${C.rose}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="345" y="240" fill="${C.rose}" font-size="24">+6 étages</text>
  <text x="240" y="45" fill="${C.rose}" font-size="28" text-anchor="middle">Arrivée : étage ?</text>
  </svg>`;
};

// Thermomètre : y = 220 − 15t, de −8 à 8 °C.
const thermometre = () => {
  let s = "";
  for (let t = -8; t <= 8; t++) {
    const y = 220 - 15 * t;
    const grand = t % 2 === 0;
    s += `<path d="M${grand ? 196 : 206} ${y} L220 ${y}" stroke="${C.craie}" stroke-width="2"/>`;
    if (t % 4 === 0) s += `<text x="188" y="${y + 7}" fill="${C.craie}" font-size="20" text-anchor="end">${signe(t)}</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Thermomètre : −5 °C le matin, 3 °C l'après-midi">
  <rect x="220" y="85" width="40" height="280" rx="20" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <circle cx="240" cy="385" r="24" fill="${C.rose}" fill-opacity=".5" stroke="${C.craie}" stroke-width="3"/>
  ${s}
  <path d="M265 295 L300 295" stroke="${C.bleu}" stroke-width="4"/>
  <text x="308" y="288" fill="${C.bleu}" font-size="22">matin</text><text x="308" y="314" fill="${C.bleu}" font-size="24">−5 °C</text>
  <path d="M265 175 L300 175" stroke="${C.rose}" stroke-width="4"/>
  <text x="308" y="168" fill="${C.rose}" font-size="22">après-midi</text><text x="308" y="194" fill="${C.rose}" font-size="24">3 °C</text>
  <path d="M120 295 L120 175 M110 187 L120 175 L130 187" stroke="${C.jaune}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="95" y="245" fill="${C.jaune}" font-size="30" text-anchor="end">?</text>
  </svg>`;
};

const carte = (x: number, txt: string, c: string) =>
  `<rect x="${x}" y="130" width="110" height="150" rx="12" fill="${c}" fill-opacity=".15" stroke="${c}" stroke-width="4"/>` +
  `<text x="${x + 55}" y="220" fill="${c}" font-size="40" text-anchor="middle">${txt}</text>`;

const jeu = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois cartes de points : +7, −12 et +3">
  <text x="240" y="80" fill="${C.pale}" font-size="24" text-anchor="middle">les points de la partie</text>
  ${carte(45, "+7", C.bleu)}${carte(185, "−12", C.rose)}${carte(325, "+3", C.bleu)}
  <text x="240" y="350" fill="${C.jaune}" font-size="32" text-anchor="middle">score final : ?</text>
  </svg>`;

// La mer : surface en y = 80, 14 px par mètre.
const plongee = () => {
  let s = "";
  for (let d = 0; d <= 21; d += 3) {
    const y = 80 + 14 * d;
    s += `<path d="M70 ${y} L86 ${y}" stroke="${C.craie}" stroke-width="2"/><text x="62" y="${y + 7}" fill="${C.craie}" font-size="19" text-anchor="end">${d === 0 ? "0" : "−" + d} m</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un plongeur à −18 m remonte de 7 m">
  <path d="M90 80 Q170 70 250 80 T410 80 L460 80" stroke="${C.bleu}" stroke-width="4" fill="none"/>
  <rect x="90" y="80" width="370" height="300" fill="${C.bleu}" fill-opacity=".08"/>
  ${s}
  <ellipse cx="240" cy="332" rx="34" ry="14" fill="${C.jaune}" fill-opacity=".6" stroke="${C.jaune}" stroke-width="3"/>
  <path d="M86 332 L200 332" stroke="${C.jaune}" stroke-width="2" stroke-dasharray="5 5"/>
  <path d="M300 332 L300 234 M288 246 L300 234 L312 246" stroke="${C.rose}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="318" y="290" fill="${C.rose}" font-size="24">+7 m</text>
  <text x="300" y="215" fill="${C.rose}" font-size="30" text-anchor="middle">?</text>
  </svg>`;
};

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le calcul de Tom : −3 − 5 = 2">
  <text x="240" y="150" fill="${C.craie}" font-size="54" text-anchor="middle">−3 − 5 = 2</text>
  <text x="240" y="220" fill="${C.rose}" font-size="34" text-anchor="middle">Tom a-t-il raison ?</text>
  <path d="M60 310 L420 310" stroke="${C.craie}" stroke-width="3"/>
  <circle cx="300" cy="310" r="7" fill="${C.craie}"/><text x="300" y="350" fill="${C.craie}" font-size="20" text-anchor="middle">0</text>
  <circle cx="210" cy="310" r="8" fill="${C.bleu}"/><text x="210" y="350" fill="${C.bleu}" font-size="20" text-anchor="middle">−3</text>
  <path d="M205 290 Q160 250 80 290" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <path d="M90 280 L78 292 L94 296" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <text x="142" y="258" fill="${C.rose}" font-size="20" text-anchor="middle">−5</text>
  <text x="240" y="400" fill="${C.pale}" font-size="18" text-anchor="middle">pas à l'échelle</text>
  </svg>`;

// Pyramide : chaque brique = somme des deux briques dessous.
const brique = (x: number, y: number, txt: string, c: string) =>
  `<rect x="${x}" y="${y}" width="120" height="70" rx="6" fill="${c}" fill-opacity=".15" stroke="${c}" stroke-width="3"/>` +
  `<text x="${x + 60}" y="${y + 47}" fill="${c}" font-size="32" text-anchor="middle">${txt}</text>`;
const pyramide = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une pyramide de briques : en bas −4, 7 et −9">
  ${brique(180, 80, "?", C.rose)}
  ${brique(120, 160, "…", C.pale)}${brique(240, 160, "…", C.pale)}
  ${brique(60, 240, "−4", C.craie)}${brique(180, 240, "7", C.craie)}${brique(300, 240, "−9", C.craie)}
  <text x="240" y="370" fill="${C.jaune}" font-size="22" text-anchor="middle">brique = somme des deux du dessous</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "relatif_operation",
  titre: "Énigmes sur les opérations avec les relatifs",
  description: "Additionner et soustraire des relatifs en 5e : ascenseur et parking, écart de températures, score d'un jeu, plongée, piège de Tom, pyramide de briques. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Dans l'ascenseur",
      titre: "Du parking au salon",
      question: `Maé prend l'ascenseur au niveau <b>−2</b> du parking.<br>Elle monte de <b>6 étages</b>.<br><br><b>À quel étage arrive-t-elle ?</b>`,
      reponse: `(−2) + 6 = 4.<br>Elle arrive à <span class="big">l'étage 4</span>.`,
      consigne: "À quel étage arrive Maé ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: ascenseur(),
    },
    {
      tag: "Énigme 2 · La météo",
      titre: "Le froid du matin",
      question: `À la montagne, il fait <b>−5 °C</b> le matin et <b>3 °C</b> l'après-midi.<br><br><b>De combien de degrés</b> la température a-t-elle monté ?`,
      reponse: `On calcule l'écart : 3 − (−5) = 3 + 5 = 8.<br>Elle a monté de <span class="big">8 °C</span>.`,
      consigne: "De combien de degrés la température a-t-elle monté ?",
      verification: { type: "courte", attendus: ["8"], unite: "°C" },
      dessin: thermometre(),
    },
    {
      tag: "Énigme 3 · Le jeu de société",
      titre: "Le score de Yanis",
      question: `Yanis gagne <b>7 points</b>, puis perd <b>12 points</b>, puis gagne <b>3 points</b>.<br>Il partait de 0.<br><br><b>Quel est son score final ?</b>`,
      reponse: `(+7) + (−12) + (+3) = (−5) + 3 = −2.<br>Son score est <span class="big">−2</span>.`,
      consigne: "Quel est le score final de Yanis ?",
      verification: { type: "courte", attendus: ["-2", "−2"], unite: "points" },
      dessin: jeu(),
    },
    {
      tag: "Énigme 4 · En plongée",
      titre: "La remontée",
      question: `Une plongeuse est à <b>18 m</b> sous la surface : à la cote <b>−18 m</b>.<br>Elle remonte de <b>7 m</b>.<br><br><b>À quelle cote est-elle ?</b>`,
      reponse: `(−18) + 7 = −11.<br>Elle est à <span class="big">−11 m</span>, donc à 11 m sous la surface.`,
      consigne: "À quelle cote est la plongeuse (en m) ?",
      verification: { type: "courte", attendus: ["-11", "−11"], unite: "m" },
      dessin: plongee(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le calcul de Tom",
      sorte: "piege",
      question: `Tom écrit : <b>−3 − 5 = 2</b>.<br><br><b>A-t-il raison ?</b> Sinon, quel est le bon résultat ?`,
      reponse: `Non ! On part de −3 et on recule encore de 5.<br>−3 − 5 = (−3) + (−5) = <span class="big">−8</span>.`,
      consigne: "Combien fait −3 − 5 ?",
      verification: { type: "qcm", choix: ["2", "−8", "−2"], bonne: 1 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La pyramide de briques",
      sorte: "defi",
      question: `Chaque brique vaut la <b>somme</b> des deux briques juste en dessous.<br>En bas : <b>−4</b>, <b>7</b> et <b>−9</b>.<br><br><b>Que vaut la brique du sommet ?</b>`,
      reponse: `Au milieu : (−4) + 7 = 3 et 7 + (−9) = −2.<br>Au sommet : 3 + (−2) = <span class="big">1</span>.`,
      consigne: "Que vaut la brique du sommet ?",
      verification: { type: "courte", attendus: ["1"] },
      dessin: pyramide(),
    },
  ],
};

export default problemes;
