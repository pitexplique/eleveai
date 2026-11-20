// Énigmes à projeter — 4e, notion equation_resolution (traduire, vérifier,
// résoudre ax + b = cx + d avec une balance, problème avec distributivité,
// piège 3x = 12, défi des âges). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;

// La machine à nombres : 4 cases l'une sous l'autre.
const machine = () => {
  const cases = [
    { y: 40, t: "nombre ?", c: C.rose },
    { y: 135, t: "× 4", c: C.bleu },
    { y: 230, t: "+ 7", c: C.bleu },
    { y: 325, t: "43", c: C.jaune },
  ];
  let s = "";
  cases.forEach((k, i) => {
    s += `<rect x="150" y="${k.y}" width="180" height="60" rx="12" stroke="${k.c}" stroke-width="4" fill="${k.c}" fill-opacity=".12"/>`;
    s += `<text x="240" y="${k.y + 41}" fill="${k.c}" font-size="32" text-anchor="middle">${k.t}</text>`;
    if (i < 3) s += `<path d="M240 ${k.y + 64} L240 ${k.y + 91} M230 ${k.y + 81} L240 ${k.y + 91} L250 ${k.y + 81}" ${S} stroke-width="3"/>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="La machine d'Inès : un nombre, fois 4, plus 7, donne 43">
  ${s}
  <text x="40" y="80" font-size="40">🎲</text>
  </svg>`;
};

// Le cadenas et les trois nombres à essayer.
const cadenas = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un cadenas : le code est la solution de 5x − 2 = 2x + 7 ; on essaie 2, 3 ou 4">
  <text x="240" y="60" fill="${C.craie}" font-size="38" text-anchor="middle">5x − 2 = 2x + 7</text>
  <path d="M200 190 L200 145 a40 40 0 0 1 80 0 L280 190" ${S} stroke-width="8"/>
  <rect x="170" y="190" width="140" height="110" rx="14" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="4"/>
  <circle cx="240" cy="235" r="12" fill="${C.craie}"/>
  <path d="M240 240 L240 272" stroke="${C.craie}" stroke-width="8" stroke-linecap="round"/>
  <rect x="80" y="330" width="70" height="60" rx="10" ${S} stroke-width="3"/>
  <text x="115" y="372" fill="${C.bleu}" font-size="34" text-anchor="middle">2</text>
  <rect x="205" y="330" width="70" height="60" rx="10" ${S} stroke-width="3"/>
  <text x="240" y="372" fill="${C.bleu}" font-size="34" text-anchor="middle">3</text>
  <rect x="330" y="330" width="70" height="60" rx="10" ${S} stroke-width="3"/>
  <text x="365" y="372" fill="${C.bleu}" font-size="34" text-anchor="middle">4</text>
  </svg>`;

// La balance en équilibre : 5 sacs + 2 kg à gauche, 2 sacs + 11 kg à droite.
const sac = (x: number) =>
  `<rect x="${x}" y="158" width="24" height="40" rx="7" fill="${C.jaune}" fill-opacity=".45" stroke="${C.jaune}" stroke-width="3"/>`;
const balance = () => {
  let gauche = "";
  for (let k = 0; k < 5; k++) gauche += sac(62 + 28 * k);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une balance en équilibre : 5 sacs et 2 kg à gauche, 2 sacs et 11 kg à droite">
  <text x="240" y="45" fill="${C.jaune}" font-size="26" text-anchor="middle">chaque sac pèse x kg</text>
  ${gauche}
  <rect x="85" y="108" width="80" height="44" rx="6" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="3"/>
  <text x="125" y="139" fill="${C.bleu}" font-size="24" text-anchor="middle">2 kg</text>
  ${sac(282)}${sac(310)}
  <rect x="345" y="152" width="90" height="46" rx="6" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="3"/>
  <text x="390" y="184" fill="${C.bleu}" font-size="24" text-anchor="middle">11 kg</text>
  <path d="M45 200 L435 200" ${S} stroke-width="6"/>
  <path d="M240 204 L215 250 L265 250 Z" fill="${C.pale}" fill-opacity=".4" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M240 250 L240 350 M170 360 L310 360" ${S}/>
  <text x="240" y="400" fill="${C.pale}" font-size="22" text-anchor="middle">en équilibre</text>
  </svg>`;
};

// L'enclos : largeur x = 10 m, longueur x + 6 = 16 m, 20 px par mètre.
const enclos = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un enclos rectangulaire : largeur x, longueur x + 6, périmètre 52 m">
  <rect x="80" y="100" width="320" height="200" fill="${C.bleu}" fill-opacity=".08" ${S}/>
  <text x="240" y="85" fill="${C.rose}" font-size="30" text-anchor="middle">x + 6</text>
  <text x="58" y="210" fill="${C.rose}" font-size="30" text-anchor="middle">x</text>
  <text x="240" y="225" font-size="60" text-anchor="middle">🐐</text>
  <text x="240" y="360" fill="${C.jaune}" font-size="30" text-anchor="middle">périmètre = 52 m</text>
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Théo écrit : 3x = 12 donc x = 12 − 3 = 9">
  <text x="240" y="120" fill="${C.craie}" font-size="56" text-anchor="middle">3x = 12</text>
  <path d="M240 150 L240 200 M228 188 L240 200 L252 188" ${S} stroke-width="3"/>
  <text x="240" y="270" fill="${C.rose}" font-size="48" text-anchor="middle">x = 12 − 3 = 9 ?</text>
  <text x="240" y="350" fill="${C.pale}" font-size="24" text-anchor="middle">Théo enlève le 3…</text>
  </svg>`;

// Les âges, au bon rapport : 8 px par an.
const ages = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Léa a 12 ans, sa mère a 40 ans">
  <text x="30" y="130" font-size="34">👧</text>
  <rect x="80" y="100" width="96" height="44" rx="6" fill="${C.bleu}" fill-opacity=".35" stroke="${C.bleu}" stroke-width="3"/>
  <text x="190" y="132" fill="${C.bleu}" font-size="26">12 ans</text>
  <text x="30" y="230" font-size="34">👩</text>
  <rect x="80" y="200" width="320" height="44" rx="6" fill="${C.rose}" fill-opacity=".3" stroke="${C.rose}" stroke-width="3"/>
  <text x="240" y="232" fill="${C.rose}" font-size="26" text-anchor="middle">40 ans</text>
  <text x="240" y="315" fill="${C.jaune}" font-size="26" text-anchor="middle">dans x ans, chacune a + x ans</text>
  <text x="240" y="370" fill="${C.craie}" font-size="28" text-anchor="middle">le double ?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "equation_resolution",
  titre: "Énigmes sur les équations",
  description: "La machine à nombres, le cadenas, la balance des sacs, l'enclos des chèvres, le piège de Théo, le défi des âges.",
  problemes: [
    {
      tag: "Énigme 1 · Le jeu du nombre",
      titre: "La machine d'Inès",
      question: `Inès pense à un nombre x.<br>Elle le <b>multiplie par 4</b>, puis elle <b>ajoute 7</b>.<br>Elle obtient <b>43</b>.<br><br>Quelle <b>équation</b> traduit son jeu ?`,
      reponse: `Multiplier x par 4 : 4x. Puis ajouter 7 : 4x + 7.<br>L'équation est <span class="big">4x + 7 = 43</span>.<br>Bonus : 4x = 36, donc x = 9. Vérification : 4 × 9 + 7 = 43.`,
      consigne: "Quelle équation traduit le jeu d'Inès ?",
      verification: { type: "qcm", choix: ["4x + 7 = 43", "4(x + 7) = 43", "4 + 7x = 43"], bonne: 0 },
      dessin: machine(),
    },
    {
      tag: "Énigme 2 · Le cadenas du vélo",
      titre: "Le bon code",
      question: `Le code du cadenas de Zoé est la <b>solution</b> de l'équation <b>5x − 2 = 2x + 7</b>.<br>Elle hésite entre <b>2</b>, <b>3</b> et <b>4</b>.<br><br>Quel nombre <b>ouvre</b> le cadenas ?`,
      reponse: `On remplace x dans chaque membre.<br>x = 2 : 5 × 2 − 2 = 8 et 2 × 2 + 7 = 11. Différent.<br>x = 3 : 5 × 3 − 2 = 13 et 2 × 3 + 7 = 13. Égal !<br>x = 4 : 18 et 15. Différent.<br>Le code est <span class="big">3</span>.`,
      consigne: "Quel nombre est solution de 5x − 2 = 2x + 7 ?",
      verification: { type: "qcm", choix: ["2", "3", "4"], bonne: 1 },
      dessin: cadenas(),
    },
    {
      tag: "Énigme 3 · Sur le chantier",
      titre: "La balance des sacs",
      question: `Malo pose des sacs de sable sur une balance. Tous les sacs ont la même masse : x kg.<br>À gauche : <b>5 sacs et 2 kg</b>. À droite : <b>2 sacs et 11 kg</b>.<br>La balance est <b>en équilibre</b>.<br><br>Combien pèse <b>un sac</b> ?`,
      reponse: `L'équilibre donne : 5x + 2 = 2x + 11.<br>On enlève 2 sacs de chaque côté : 3x + 2 = 11.<br>On enlève 2 kg de chaque côté : 3x = 9.<br>On divise par 3 : x = 9 ÷ 3 = 3. Un sac pèse <span class="big">3 kg</span>.<br>Vérification : 5 × 3 + 2 = 17 et 2 × 3 + 11 = 17.`,
      consigne: "Combien pèse un sac ?",
      verification: { type: "courte", attendus: ["3"], unite: "kg" },
      dessin: balance(),
    },
    {
      tag: "Énigme 4 · À la ferme",
      titre: "L'enclos des chèvres",
      question: `Un enclos rectangulaire a une largeur de x mètres.<br>Sa longueur mesure <b>6 m de plus</b> que sa largeur.<br>Son <b>périmètre</b> vaut <b>52 m</b>.<br><br>Quelle est sa <b>largeur</b> ?`,
      reponse: `Périmètre : 2 × (x + x + 6) = 52.<br>On développe : 2 × (2x + 6) = 4x + 12, donc 4x + 12 = 52.<br>4x = 40, donc x = 40 ÷ 4 = 10.<br>La largeur est <span class="big">10 m</span> (et la longueur 16 m).<br>Vérification : 2 × (10 + 16) = 52.`,
      consigne: "Quelle est la largeur de l'enclos ?",
      verification: { type: "courte", attendus: ["10"], unite: "m" },
      dessin: enclos(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le 3 qui disparaît",
      sorte: "piege",
      question: `Théo doit résoudre <b>3x = 12</b>.<br>Il écrit : x = 12 − 3 = 9.<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! 3x veut dire 3 × x : le 3 <b>multiplie</b> x.<br>Pour l'enlever, on <b>divise</b> par 3 : x = 12 ÷ 3 = <span class="big">4</span>.<br>Vérification : 3 × 4 = 12. Avec 9 : 3 × 9 = 27, pas 12.`,
      consigne: "Quelle est la solution de 3x = 12 ?",
      verification: { type: "qcm", choix: ["x = 9", "x = 36", "x = 4"], bonne: 2 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le double de l'âge",
      sorte: "defi",
      question: `Léa a <b>12 ans</b>. Sa mère a <b>40 ans</b>.<br><br>Dans <b>combien d'années</b> sa mère aura-t-elle <b>le double</b> de l'âge de Léa ?`,
      reponse: `Dans x ans : Léa aura 12 + x ans, sa mère 40 + x ans.<br>On veut : 40 + x = 2 × (12 + x), soit 40 + x = 24 + 2x.<br>On enlève x et 24 de chaque côté : 16 = x.<br>C'est dans <span class="big">16 ans</span>.<br>Vérification : Léa aura 28 ans, sa mère 56 ans, et 2 × 28 = 56.`,
      consigne: "Dans combien d'années la mère aura-t-elle le double de l'âge de Léa ?",
      verification: { type: "courte", attendus: ["16"], unite: "ans" },
      dessin: ages(),
    },
  ],
};

export default problemes;
