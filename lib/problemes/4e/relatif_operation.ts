// Énigmes à projeter — 4e, notion relatif_operation (additionner, soustraire,
// multiplier, calculer, problèmes, défi). 19/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;

// Un immeuble de l'étage 3 au niveau −3 du parking : 45 px par étage, étage k
// centré en y = 220 − 45k. Le sol passe entre 0 et −1 (y = 242).
const ascenseur = () => {
  let s = "";
  for (let k = 3; k >= -3; k--) {
    const y = 220 - 45 * k;
    s += `<text x="155" y="${y + 9}" fill="${k < 0 ? C.pale : C.craie}" font-size="26" text-anchor="end">${k < 0 ? "−" + -k : k}</text>`;
    s += `<path d="M170 ${y + 22} L290 ${y + 22}" stroke="${C.pale}" stroke-width="1.5"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un immeuble avec 3 étages et 3 niveaux de parking, l'ascenseur part du niveau −3">
  <rect x="170" y="242" width="120" height="135" fill="${C.pale}" fill-opacity=".18"/>
  <rect x="170" y="62" width="120" height="315" ${S} stroke-width="3"/>
  ${s}
  <path d="M40 242 L440 242" stroke="${C.jaune}" stroke-width="4"/>
  <text x="440" y="232" fill="${C.jaune}" font-size="22" text-anchor="end">le sol</text>
  <text x="440" y="275" fill="${C.pale}" font-size="20" text-anchor="end">parking</text>
  <rect x="215" y="337" width="30" height="36" rx="4" fill="${C.bleu}" fill-opacity=".5" stroke="${C.bleu}" stroke-width="3"/>
  <path d="M330 350 L330 300 M318 312 L330 300 L342 312" stroke="${C.rose}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="350" y="335" fill="${C.rose}" font-size="26">+5 étages</text>
  <text x="240" y="40" fill="${C.rose}" font-size="30" text-anchor="middle">Arrivée : étage ?</text>
  </svg>`;
};

// Un thermomètre de −10 °C à 10 °C : y = 210 − 14t.
const thermometre = () => {
  let s = "";
  for (let t = -10; t <= 10; t += 2) {
    const y = 210 - 14 * t;
    s += `<path d="M${t % 4 === 0 ? 200 : 208} ${y} L220 ${y}" stroke="${C.craie}" stroke-width="2"/>`;
    if (t % 4 === 0) s += `<text x="194" y="${y + 7}" fill="${C.craie}" font-size="20" text-anchor="end">${t < 0 ? "−" + -t : t}</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Thermomètre : −7 °C le matin, 4 °C l'après-midi">
  <rect x="220" y="56" width="40" height="310" rx="20" ${S} stroke-width="3"/>
  <circle cx="240" cy="384" r="28" fill="${C.rose}" fill-opacity=".5" stroke="${C.craie}" stroke-width="3"/>
  ${s}
  <path d="M265 308 L300 308" stroke="${C.bleu}" stroke-width="4"/><circle cx="240" cy="308" r="7" fill="${C.bleu}"/>
  <text x="308" y="300" fill="${C.bleu}" font-size="22">matin</text>
  <text x="308" y="326" fill="${C.bleu}" font-size="24">−7 °C</text>
  <path d="M265 154 L300 154" stroke="${C.rose}" stroke-width="4"/><circle cx="240" cy="154" r="7" fill="${C.rose}"/>
  <text x="308" y="146" fill="${C.rose}" font-size="22">après-midi</text>
  <text x="308" y="172" fill="${C.rose}" font-size="24">4 °C</text>
  <path d="M415 160 L415 300" stroke="${C.jaune}" stroke-width="3" stroke-dasharray="6 6"/>
  <text x="430" y="238" fill="${C.jaune}" font-size="28">?</text>
  </svg>`;
};

// La mer : surface à y = 90, 16 px par mètre de profondeur, axe jusqu'à −18 m.
const plongee = () => {
  let s = "";
  for (let d = 0; d <= 18; d += 3) {
    const y = 90 + 16 * d;
    s += `<path d="M70 ${y} L86 ${y}" stroke="${C.craie}" stroke-width="2"/><text x="62" y="${y + 7}" fill="${C.craie}" font-size="21" text-anchor="end">${d === 0 ? "0" : "−" + d} m</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un plongeur descend de 3 mètres par minute">
  <rect x="86" y="90" width="380" height="300" fill="${C.bleu}" fill-opacity=".12"/>
  <path d="M86 90 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <path d="M78 90 L78 380" stroke="${C.craie}" stroke-width="3"/>
  ${s}
  <text x="250" y="80" font-size="40" text-anchor="middle">🤿</text>
  <path d="M250 105 L250 190 M238 178 L250 190 L262 178" stroke="${C.rose}" stroke-width="4" fill="none" stroke-dasharray="10 8" stroke-linecap="round"/>
  <text x="275" y="160" fill="${C.rose}" font-size="24">−3 m chaque minute</text>
  <text x="275" y="300" fill="${C.jaune}" font-size="28">après 5 minutes :</text>
  <text x="275" y="340" fill="${C.jaune}" font-size="34">? m</text>
  </svg>`;
};

// Le quiz : 7 bonnes réponses, 5 mauvaises.
const quiz = () => {
  let s = "";
  for (let k = 0; k < 12; k++) {
    const x = 50 + k * 34;
    s += k < 7
      ? `<text x="${x}" y="270" fill="${C.bleu}" font-size="32" text-anchor="middle">✔</text>`
      : `<text x="${x}" y="270" fill="${C.rose}" font-size="32" text-anchor="middle">✘</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le quiz de Sami : 7 bonnes réponses, 5 mauvaises">
  <rect x="40" y="60" width="400" height="110" rx="12" ${S} stroke-width="3"/>
  <text x="70" y="105" fill="${C.bleu}" font-size="28">✔ juste : +3 points</text>
  <text x="70" y="150" fill="${C.rose}" font-size="28">✘ faux : −2 points</text>
  <text x="240" y="225" fill="${C.craie}" font-size="26" text-anchor="middle">Les 12 réponses de Sami</text>
  ${s}
  <text x="240" y="360" fill="${C.jaune}" font-size="34" text-anchor="middle">Son score : ?</text>
  </svg>`;
};

// Le piège : droite graduée de −10 à 2, x = 60 + 30(t + 10).
const lou = () => {
  let s = "";
  for (let t = -10; t <= 2; t++) {
    const x = 60 + 30 * (t + 10);
    s += `<path d="M${x} ${t % 2 === 0 ? 318 : 324} L${x} 342" stroke="${C.craie}" stroke-width="2"/>`;
    if (t % 2 === 0) s += `<text x="${x}" y="374" fill="${C.craie}" font-size="21" text-anchor="middle">${t < 0 ? "−" + -t : t}</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Lou écrit −3 − 5 = 8">
  <text x="240" y="140" fill="${C.craie}" font-size="60" text-anchor="middle">−3 − 5 = 8 ?</text>
  <text x="240" y="215" fill="${C.pale}" font-size="24" text-anchor="middle">Lou : « moins par moins donne plus ! »</text>
  <path d="M50 330 L440 330" stroke="${C.craie}" stroke-width="3"/>
  ${s}
  <circle cx="270" cy="330" r="9" fill="${C.bleu}"/>
  <text x="270" y="300" fill="${C.bleu}" font-size="22" text-anchor="middle">−3</text>
  </svg>`;
};

const signe = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le produit de −2, −3, −4, −5 et −6">
  <text x="240" y="140" fill="${C.craie}" font-size="40" text-anchor="middle">(−2) × (−3) × (−4)</text>
  <text x="240" y="205" fill="${C.craie}" font-size="40" text-anchor="middle">× (−5) × (−6)</text>
  <text x="240" y="290" fill="${C.rose}" font-size="56" text-anchor="middle">= ?</text>
  <text x="240" y="365" fill="${C.pale}" font-size="24" text-anchor="middle">Le signe d'abord, le calcul ensuite</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "relatif_operation",
  titre: "Énigmes sur les nombres relatifs",
  description: "L'ascenseur, le thermomètre, le plongeur, le quiz, le piège de Lou, le signe d'un produit.",
  problemes: [
    {
      tag: "Énigme 1 · Au parking",
      titre: "L'ascenseur",
      question: `Tu es au <b>niveau −3</b> du parking, avec ta famille.<br>Tu prends l'ascenseur et tu <b>montes de 5 étages</b>.<br><br>À <b>quel étage</b> arrives-tu ?`,
      reponse: `Monter de 5, c'est ajouter 5 : −3 + 5 = 2.<br>Tu arrives à <span class="big">l'étage 2</span>.<br>3 étages pour remonter au rez-de-chaussée, puis 2 de plus.`,
      consigne: "À quel étage arrives-tu ?",
      verification: { type: "courte", attendus: ["2", "+2"] },
      dessin: ascenseur(),
    },
    {
      tag: "Énigme 2 · En montagne",
      titre: "Le thermomètre",
      question: `Dans un village des Alpes, il fait <b>−7 °C</b> le matin.<br>L'après-midi, il fait <b>4 °C</b>.<br><br>De <b>combien de degrés</b> la température a-t-elle monté ?`,
      reponse: `L'écart, c'est l'arrivée moins le départ : 4 − (−7) = 4 + 7 = 11.<br>Elle a monté de <span class="big">11 °C</span> : 7 degrés pour arriver à 0, puis 4 de plus.`,
      consigne: "De combien de degrés la température a-t-elle monté ?",
      verification: { type: "courte", attendus: ["11", "+11"], unite: "°C" },
      dessin: thermometre(),
    },
    {
      tag: "Énigme 3 · Sous la mer",
      titre: "Le plongeur",
      question: `Un plongeur part de la surface (0 m).<br>Il descend de <b>3 m chaque minute</b>.<br><br>À <b>quelle profondeur</b> est-il après <b>5 minutes</b> ? Écris-la avec un nombre relatif.`,
      reponse: `Chaque minute : −3 m. Pendant 5 minutes : 5 × (−3) = −15.<br>Il est à <span class="big">−15 m</span>.`,
      consigne: "À quelle profondeur est le plongeur après 5 minutes ? (nombre relatif)",
      verification: { type: "courte", attendus: ["-15", "−15"], unite: "m" },
      dessin: plongee(),
    },
    {
      tag: "Énigme 4 · Le grand quiz",
      titre: "Le score de Sami",
      question: `Au quiz, une bonne réponse rapporte <b>+3 points</b>. Une mauvaise réponse coûte <b>−2 points</b>.<br>Sami a <b>7 bonnes réponses</b> et <b>5 mauvaises</b>.<br><br>Quel est son <b>score</b> ?`,
      reponse: `7 × 3 = 21 et 5 × (−2) = −10.<br>21 + (−10) = 11. Sami a <span class="big">11 points</span>.`,
      consigne: "Quel est le score de Sami ?",
      verification: { type: "courte", attendus: ["11", "+11"], unite: "points" },
      dessin: quiz(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Moins par moins ?",
      sorte: "piege",
      question: `Lou écrit : <b>−3 − 5 = 8</b>.<br>Elle explique : « moins par moins donne plus ! »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! Ici, on ne multiplie pas : on enlève 5 à −3.<br>−3 − 5 = −3 + (−5) = <span class="big">−8</span>.<br>« Moins par moins donne plus » ne vaut que pour la <b>multiplication</b> : (−3) × (−5) = 15.`,
      consigne: "Lou écrit −3 − 5 = 8. Quel est le bon résultat ?",
      verification: { type: "qcm", choix: ["8, Lou a raison", "−8", "2"], bonne: 1 },
      dessin: lou(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le signe d'abord",
      sorte: "defi",
      question: `Calcule <b>(−2) × (−3) × (−4) × (−5) × (−6)</b>.<br><br>Astuce : trouve d'abord le <b>signe</b> du résultat, <b>sans calculer</b>.`,
      reponse: `5 facteurs négatifs : c'est un nombre impair, donc le produit est <b>négatif</b>.<br>2 × 3 × 4 × 5 × 6 = 720. Le produit vaut <span class="big">−720</span>.`,
      consigne: "Combien vaut (−2) × (−3) × (−4) × (−5) × (−6) ?",
      verification: { type: "qcm", choix: ["−720", "720", "−20"], bonne: 0 },
      dessin: signe(),
    },
  ],
};

export default problemes;
