// Énigmes à projeter — 6e, notion decimal_nombre (lire et écrire, rang d'un
// chiffre, comparer, encadrer, arrondir). 20/11/2026.
// Phrases courtes (les 6e lisent difficilement) ; fractions décimales en étage.
// ⛔ Droites graduées calculées : graduations régulières, positions exactes.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const NB = " ";

// Thermomètre couché : droite de 36 à 38, 1 dixième = 20 px, 36 en x = 40.
// Le liquide monte jusqu'à 37,6 → x = 40 + 16 × 20 = 360.
const thermometre = () => {
  let t = "";
  for (let k = 0; k <= 20; k++) {
    const x = 40 + 20 * k;
    const h = k % 10 === 0 ? 26 : k % 5 === 0 ? 18 : 11;
    t += `<path d="M${x} 230 L${x} ${230 + h}" stroke="${C.craie}" stroke-width="${k % 10 === 0 ? 3 : 2}"/>`;
    if (k % 10 === 0) t += `<text x="${x}" y="290" fill="${C.craie}" font-size="26" text-anchor="middle">${36 + k / 10}</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un thermomètre gradué de 36 à 38 degrés, de dixième en dixième">
  <rect x="30" y="196" width="420" height="34" rx="17" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <rect x="40" y="204" width="320" height="18" rx="9" fill="${C.rose}" fill-opacity=".55"/>
  ${t}
  <path d="M360 150 L360 190" stroke="${C.rose}" stroke-width="3"/>
  <path d="M350 178 L360 192 L370 178" fill="none" stroke="${C.rose}" stroke-width="3"/>
  <text x="360" y="136" fill="${C.rose}" font-size="32" text-anchor="middle">? °C</text>
  <text x="240" y="80" fill="${C.pale}" font-size="22" text-anchor="middle">une petite graduation${NB}= 1 dixième</text>
  <text x="440" y="330" fill="${C.pale}" font-size="22" text-anchor="end">en °C</text>
  </svg>`;
};

// Le chronomètre : 9,58 s, le 8 en rose.
const chrono = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un chronomètre qui affiche 9,58 secondes, le chiffre 8 est en couleur">
  <rect x="222" y="48" width="36" height="30" rx="5" fill="none" stroke="${C.craie}" stroke-width="4"/>
  <circle cx="240" cy="200" r="120" fill="${C.bleu}" fill-opacity=".08" stroke="${C.craie}" stroke-width="5"/>
  <rect x="135" y="160" width="210" height="80" rx="10" fill="${C.craie}" fill-opacity=".08" stroke="${C.pale}" stroke-width="2"/>
  <text x="240" y="222" fill="${C.craie}" font-size="56" text-anchor="middle">9,5<tspan fill="${C.rose}">8</tspan> s</text>
  <text x="240" y="380" fill="${C.rose}" font-size="32" text-anchor="middle">Que vaut le 8${NB}?</text>
  </svg>`;

// Trois potirons (pas à l'échelle : même taille dessinée).
const potirons = () => {
  const un = (cx: number, nom: string, masse: string) =>
    `<ellipse cx="${cx}" cy="200" rx="62" ry="50" fill="${C.jaune}" fill-opacity=".35" stroke="${C.jaune}" stroke-width="4"/>` +
    `<path d="M${cx - 22} 156 Q${cx - 30} 200 ${cx - 22} 246 M${cx + 22} 156 Q${cx + 30} 200 ${cx + 22} 246" fill="none" stroke="${C.jaune}" stroke-width="2"/>` +
    `<path d="M${cx} 152 L${cx + 6} 130" stroke="${C.craie}" stroke-width="5" stroke-linecap="round"/>` +
    `<text x="${cx}" y="100" fill="${C.pale}" font-size="24" text-anchor="middle">${nom}</text>` +
    `<text x="${cx}" y="292" fill="${C.craie}" font-size="26" text-anchor="middle">${masse}</text>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois potirons : 4,5 kg, 4,05 kg et 4,49 kg">
  ${un(85, "Léon", "4,5 kg")}${un(240, "Awa", "4,05 kg")}${un(395, "Jade", "4,49 kg")}
  <text x="240" y="350" fill="${C.pale}" font-size="20" text-anchor="middle">pas à l'échelle</text>
  <text x="240" y="395" fill="${C.rose}" font-size="30" text-anchor="middle">Lequel est le plus lourd${NB}?</text>
  </svg>`;
};

// Droite de 5 à 6 km, 1 dixième = 38 px, 5 en x = 50 ; 5,38 → x = 50 + 3,8 × 38 = 194,4.
const velo = () => {
  let t = "";
  for (let k = 0; k <= 10; k++) {
    const x = 50 + 38 * k;
    t += `<path d="M${x} 230 L${x} ${k % 10 === 0 ? 256 : k === 5 ? 248 : 244}" stroke="${C.craie}" stroke-width="${k % 10 === 0 ? 3 : 2}"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une droite graduée de 5 à 6 kilomètres, en dixièmes, et le point 5,38">
  <text x="240" y="110" font-size="54" text-anchor="middle">🚲</text>
  <path d="M30 230 L450 230" stroke="${C.craie}" stroke-width="3"/>
  ${t}
  <text x="50" y="290" fill="${C.craie}" font-size="26" text-anchor="middle">5</text>
  <text x="430" y="290" fill="${C.craie}" font-size="26" text-anchor="middle">6</text>
  <circle cx="194.4" cy="230" r="8" fill="${C.rose}"/>
  <text x="194.4" y="200" fill="${C.rose}" font-size="28" text-anchor="middle">5,38</text>
  <text x="240" y="340" fill="${C.pale}" font-size="22" text-anchor="middle">une graduation${NB}= 1 dixième de km</text>
  <text x="240" y="390" fill="${C.bleu}" font-size="28" text-anchor="middle">entre ? et ?</text>
  </svg>`;
};

// Le piège : ce que dit Luc.
const grenouilles = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Luc écrit : 2,15 mètres est plus grand que 2,9 mètres">
  <text x="240" y="100" font-size="50" text-anchor="middle">🐸   🐸</text>
  <text x="240" y="210" fill="${C.craie}" font-size="56" text-anchor="middle"><tspan fill="${C.jaune}">2,15</tspan> &gt; <tspan fill="${C.bleu}">2,9</tspan></text>
  <text x="240" y="300" fill="${C.pale}" font-size="22" text-anchor="middle">Luc${NB}: «${NB}car 15 est plus grand que 9${NB}»</text>
  <text x="240" y="380" fill="${C.rose}" font-size="38" text-anchor="middle">Vrai ou faux${NB}?</text>
  </svg>`;

// Le cadenas du coffre : un code à trouver.
const coffre = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un coffre fermé par un code : un nombre à deux chiffres après la virgule">
  <rect x="60" y="60" width="360" height="110" rx="12" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  <rect x="110" y="85" width="60" height="64" rx="6" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  <text x="185" y="140" fill="${C.craie}" font-size="48" text-anchor="middle">,</text>
  <rect x="200" y="85" width="60" height="64" rx="6" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  <rect x="275" y="85" width="60" height="64" rx="6" fill="none" stroke="${C.bleu}" stroke-width="3"/>
  <text x="140" y="132" fill="${C.rose}" font-size="38" text-anchor="middle">?</text>
  <text x="230" y="132" fill="${C.rose}" font-size="38" text-anchor="middle">?</text>
  <text x="305" y="132" fill="${C.rose}" font-size="38" text-anchor="middle">?</text>
  <text x="378" y="132" font-size="36" text-anchor="middle">🔒</text>
  <text x="60" y="235" fill="${C.craie}" font-size="24">• 2 chiffres après la virgule</text>
  <text x="60" y="285" fill="${C.craie}" font-size="24">• chiffre des centièmes${NB}: 8</text>
  <text x="60" y="335" fill="${C.craie}" font-size="24">• arrondi au dixième${NB}: 7,3</text>
  <text x="240" y="395" fill="${C.rose}" font-size="28" text-anchor="middle">Quel est le code${NB}?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "decimal_nombre",
  titre: "Énigmes sur les nombres décimaux",
  description: "Le thermomètre, le chronomètre, les potirons, la balade à vélo, le piège des grenouilles, le code du coffre.",
  problemes: [
    {
      tag: "Énigme 1 · Chez le médecin",
      titre: "Le thermomètre",
      question: `Nina a de la fièvre.<br>Le médecin regarde le thermomètre.<br>Une petite graduation vaut <b>1 dixième</b> de degré.<br><br>Quelle <b>température</b> indique-t-il ?`,
      reponse: `Le liquide dépasse 37 de <b>6 petites graduations</b>.<br>6 graduations, c'est 6 dixièmes : ${frac(6, 10)}.<br>37 + ${frac(6, 10)} = <span class="big">37,6 °C</span>.<br>On lit « trente-sept virgule six ».`,
      consigne: "Quelle température indique le thermomètre ?",
      verification: { type: "courte", attendus: ["37,6", "37.6"], unite: "°C" },
      dessin: thermometre(),
    },
    {
      tag: "Énigme 2 · Au stade",
      titre: "Le chronomètre",
      question: `Un champion court le 100 m en <b>9,58 secondes</b>.<br><br>Dans ce nombre, <b>que vaut le chiffre 8</b> ?`,
      reponse: `Je compte depuis la virgule.<br>1er chiffre (5) : les dixièmes. 2e chiffre (8) : les centièmes.<br>Le 8 vaut <span class="big">8 centièmes</span> de seconde, soit ${frac(8, 100)}.<br>9,58 = 9 + ${frac(5, 10)} + ${frac(8, 100)}.`,
      consigne: "Dans 9,58, que vaut le chiffre 8 ?",
      verification: { type: "qcm", choix: ["8 dixièmes", "8 centièmes", "8 unités"], bonne: 1 },
      dessin: chrono(),
    },
    {
      tag: "Énigme 3 · Au potager",
      titre: "Les trois potirons",
      question: `Léon, Awa et Jade pèsent leur potiron.<br>Léon : <b>4,5 kg</b>. Awa : <b>4,05 kg</b>. Jade : <b>4,49 kg</b>.<br><br><b>Quel potiron est le plus lourd ?</b>`,
      reponse: `Les trois ont 4 kg et quelque chose : je regarde après la virgule.<br>J'écris 2 chiffres après la virgule : 4,50 · 4,05 · 4,49.<br>50 centièmes &gt; 49 &gt; 5. Donc 4,05 &lt; 4,49 &lt; 4,5.<br>Le plus lourd : <span class="big">le potiron de Léon, 4,5 kg</span>.`,
      consigne: "Quel potiron est le plus lourd ?",
      verification: { type: "qcm", choix: ["Celui de Léon (4,5 kg)", "Celui d'Awa (4,05 kg)", "Celui de Jade (4,49 kg)"], bonne: 0 },
      dessin: potirons(),
    },
    {
      tag: "Énigme 4 · À vélo",
      titre: "La balade de Yanis",
      question: `Yanis fait une balade à vélo de <b>5,38 km</b>.<br><br>Entre quels nombres se trouve 5,38, <b>au dixième près</b> ?`,
      reponse: `Les dixièmes autour de 5,38 sont 5,3 et 5,4.<br>5,3 = 5,30 et 5,4 = 5,40. Et 30 &lt; 38 &lt; 40.<br>Donc <span class="big">5,3 &lt; 5,38 &lt; 5,4</span>.<br>Sur la droite, le point est entre la 3e et la 4e graduation.`,
      consigne: "Au dixième près, entre quels nombres se trouve 5,38 km ?",
      verification: { type: "qcm", choix: ["5,2 km et 5,3 km", "5,3 km et 5,4 km", "5,4 km et 5,5 km"], bonne: 1 },
      dessin: velo(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le concours de grenouilles",
      sorte: "piege",
      question: `Deux grenouilles font un concours de saut.<br>L'une saute <b>2,15 m</b>. L'autre saute <b>2,9 m</b>.<br>Luc dit : « 2,15 m gagne, car 15 est plus grand que 9. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! On ne compare pas 15 et 9 comme des entiers.<br>2,9 = 2,90 : j'écris 2 chiffres après la virgule.<br>90 centièmes &gt; 15 centièmes. Donc 2,9 &gt; 2,15.<br><span class="big">Le saut de 2,9 m gagne.</span> Luc se trompe.`,
      consigne: "Luc dit que 2,15 m est plus long que 2,9 m. A-t-il raison ?",
      verification: { type: "qcm", choix: ["Non : 2,9 m est plus long", "Oui, Luc a raison", "Les deux sauts sont égaux"], bonne: 0 },
      dessin: grenouilles(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le code du coffre",
      sorte: "defi",
      question: `Clara veut ouvrir un coffre. Le code est un nombre.<br>Il a <b>2 chiffres après la virgule</b>.<br>Son chiffre des centièmes est <b>8</b>.<br>Arrondi au dixième, il donne <b>7,3</b>.<br><br><b>Quel est le code ?</b>`,
      reponse: `Il est tout près de 7,3 : c'est 7,28 ou 7,38.<br>Essai 7,38 : 8 ou plus, je monte → 7,4. Raté !<br>Essai 7,28 : 8 ou plus, je monte → 7,3. Gagné !<br>Le code est <span class="big">7,28</span>.`,
      consigne: "Quel est le code du coffre ?",
      verification: { type: "courte", attendus: ["7,28", "7.28"] },
      dessin: coffre(),
    },
  ],
};

export default problemes;
