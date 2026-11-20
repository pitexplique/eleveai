// Énigmes à projeter — 4e, notion litteral_distributivite (reconnaître et
// développer k(a + b) sur une aire, calcul mental 7 × 99, double
// distributivité sur une aire, développer puis réduire, piège −(x − 4) = −x − 4,
// défi du tapis (c + 1)(c − 1)). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const NB = " ";

// La scène : 40 px par mètre. Largeur 5 m = 200 px ; estrade 3 m = 120 px.
// x est inconnu : dessiné 200 px.
const scene = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une scène rectangulaire de 5 m de large : x mètres de plancher et 3 mètres d'estrade">
  <rect x="80" y="100" width="200" height="200" fill="${C.bleu}" fill-opacity=".2"/>
  <rect x="280" y="100" width="120" height="200" fill="${C.jaune}" fill-opacity=".3"/>
  <rect x="80" y="100" width="320" height="200" ${S}/>
  <path d="M280 100 L280 300" stroke="${C.craie}" stroke-width="3" stroke-dasharray="8 6"/>
  <text x="180" y="85" fill="${C.craie}" font-size="26" text-anchor="middle">x</text>
  <text x="340" y="85" fill="${C.craie}" font-size="24" text-anchor="middle">3 m</text>
  <text x="42" y="208" fill="${C.craie}" font-size="24" text-anchor="middle">5 m</text>
  <text x="180" y="208" fill="${C.bleu}" font-size="22" text-anchor="middle">plancher</text>
  <text x="340" y="208" fill="${C.jaune}" font-size="22" text-anchor="middle">estrade</text>
  <text x="240" y="360" fill="${C.pale}" font-size="24" text-anchor="middle">🎤 aire de la scène${NB}?</text>
  </svg>`;

// Les 7 bacs de 99 bouteilles.
const bacs = () => {
  let b = "";
  for (let i = 0; i < 7; i++) {
    const x = 30 + 62 * i;
    b += `<rect x="${x}" y="160" width="50" height="90" rx="6" fill="${C.bleu}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>`;
    b += `<text x="${x + 25}" y="214" fill="${C.craie}" font-size="22" text-anchor="middle">99</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Sept bacs de 99 bouteilles chacun">
  <text x="240" y="100" font-size="44" text-anchor="middle">♻️</text>
  ${b}
  <text x="240" y="300" fill="${C.pale}" font-size="22" text-anchor="middle">7 bacs de 99 bouteilles</text>
  <text x="240" y="360" fill="${C.rose}" font-size="30" text-anchor="middle">7 × 99 =${NB}?</text>
  </svg>`;
};

// La piscine : 30 px par mètre. Terrasse 4 m = 120 px, 2 m = 60 px.
// Le côté x est inconnu : dessiné 150 px.
const piscine = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une piscine carrée de côté x, agrandie d'une terrasse : 4 m de plus en longueur, 2 m de plus en largeur">
  <rect x="70" y="90" width="150" height="150" fill="${C.bleu}" fill-opacity=".3"/>
  <rect x="220" y="90" width="120" height="150" fill="${C.jaune}" fill-opacity=".25"/>
  <rect x="70" y="240" width="150" height="60" fill="${C.jaune}" fill-opacity=".25"/>
  <rect x="220" y="240" width="120" height="60" fill="${C.jaune}" fill-opacity=".4"/>
  <rect x="70" y="90" width="270" height="210" ${S}/>
  <path d="M220 90 L220 300 M70 240 L340 240" stroke="${C.craie}" stroke-width="3" stroke-dasharray="8 6"/>
  <text x="145" y="75" fill="${C.craie}" font-size="26" text-anchor="middle">x</text>
  <text x="280" y="75" fill="${C.craie}" font-size="24" text-anchor="middle">4 m</text>
  <text x="48" y="174" fill="${C.craie}" font-size="26" text-anchor="middle">x</text>
  <text x="42" y="279" fill="${C.craie}" font-size="24" text-anchor="middle">2 m</text>
  <text x="145" y="180" font-size="40" text-anchor="middle">🏊</text>
  <text x="240" y="360" fill="${C.pale}" font-size="22" text-anchor="middle">piscine + terrasse en bois</text>
  </svg>`;

// Les planches, dessinées pour x = 8 : 2x + 1 = 17 dm, x − 4 = 4 dm (20 px par dm).
const planches = () => {
  const longue = (y: number) =>
    `<rect x="70" y="${y}" width="340" height="32" rx="4" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="3"/>` +
    `<text x="240" y="${y + 24}" fill="${C.craie}" font-size="22" text-anchor="middle">2x + 1</text>`;
  const courte = (y: number) =>
    `<rect x="70" y="${y}" width="80" height="32" rx="4" fill="${C.bleu}" fill-opacity=".25" stroke="${C.bleu}" stroke-width="3"/>` +
    `<text x="170" y="${y + 24}" fill="${C.craie}" font-size="22">x − 4</text>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois planches de longueur 2x plus 1 et deux planches de longueur x moins 4, en décimètres">
  ${longue(90)}${longue(145)}${longue(200)}
  ${courte(280)}${courte(335)}
  <text x="400" y="330" font-size="40" text-anchor="middle">🔨</text>
  <text x="240" y="55" fill="${C.pale}" font-size="22" text-anchor="middle">longueurs en dm</text>
  </svg>`;
};

// Le cahier de Zoé.
const cahier = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Zoé écrit : 6 moins parenthèse x moins 4 égale 6 moins x moins 4 égale 2 moins x">
  <text x="240" y="70" font-size="40" text-anchor="middle">📓</text>
  <text x="240" y="150" fill="${C.craie}" font-size="36" text-anchor="middle">6 − (x − 4)</text>
  <text x="240" y="225" fill="${C.rose}" font-size="36" text-anchor="middle">= 6 − x − 4</text>
  <text x="240" y="300" fill="${C.rose}" font-size="36" text-anchor="middle">= 2 − x${NB}?</text>
  <text x="240" y="375" fill="${C.pale}" font-size="22" text-anchor="middle">teste avec x = 1</text>
  </svg>`;

// Le tapis : 40 px par mètre, dessiné pour c = 6.
// Carré 6 × 6 = 240 px ; rectangle 7 × 5 = 280 × 200 px (pointillés).
const tapis = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un tapis carré de côté c et, en pointillés, un tapis rectangle de c plus 1 sur c moins 1">
  <rect x="90" y="80" width="240" height="240" fill="${C.pale}" fill-opacity=".2"/>
  <rect x="90" y="80" width="240" height="240" ${S}/>
  <rect x="90" y="80" width="280" height="200" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="4" stroke-dasharray="12 8"/>
  <text x="230" y="65" fill="${C.rose}" font-size="24" text-anchor="middle">c + 1</text>
  <text x="380" y="188" fill="${C.rose}" font-size="24">c − 1</text>
  <text x="68" y="208" fill="${C.craie}" font-size="26" text-anchor="middle">c</text>
  <text x="210" y="352" fill="${C.craie}" font-size="26" text-anchor="middle">c</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">plein${NB}: l'ancien${NB}; pointillés${NB}: le nouveau</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "litteral_distributivite",
  titre: "Énigmes sur la distributivité",
  description: "La scène du concert, le centre de tri, la piscine et sa terrasse, les planches de l'étagère, le piège du cahier de Zoé, le défi du tapis.",
  problemes: [
    {
      tag: "Énigme 1 · Le concert",
      titre: "L'aire de la scène",
      question: `La scène d'un concert est un rectangle de <b>5 m</b> de large.<br>Sa longueur : x m de plancher, puis 3 m d'estrade.<br><br>Quelle expression <b>développée</b> donne l'aire de la scène ?`,
      reponse: `L'aire, c'est largeur × longueur : 5 × (x + 3) = 5(x + 3).<br>Le 5 multiplie chaque terme : 5 × x + 5 × 3.<br>Aire = <span class="big">5x + 15</span> (en m²).<br>Sur le dessin : 5x pour le plancher, 15 m² pour l'estrade.`,
      consigne: "Quelle expression développée donne l'aire de la scène ?",
      verification: { type: "qcm", choix: ["5x + 3", "5x + 8", "5x + 15"], bonne: 2 },
      dessin: scene(),
    },
    {
      tag: "Énigme 2 · Le centre de tri",
      titre: "Les bouteilles de tête",
      question: `Au centre de tri, 7 bacs contiennent chacun <b>99 bouteilles</b>.<br><br>Combien de bouteilles en tout ?<br>Calcule <b>de tête</b>, sans poser l'opération.`,
      reponse: `99, c'est 100 − 1.<br>7 × 99 = 7 × (100 − 1) = 7 × 100 − 7 × 1.<br>7 × 99 = 700 − 7 = <span class="big">693 bouteilles</span>.<br>Vérification : 693 ÷ 7 = 99.`,
      consigne: "Combien y a-t-il de bouteilles en tout ?",
      verification: { type: "courte", attendus: ["693"], unite: "bouteilles" },
      dessin: bacs(),
    },
    {
      tag: "Énigme 3 · À la piscine",
      titre: "La piscine et sa terrasse",
      question: `Une piscine carrée a pour côté x mètres.<br>On ajoute une terrasse : 4 m de plus en longueur, 2 m de plus en largeur.<br><br>Quelle expression <b>développée et réduite</b> donne l'aire totale ?`,
      reponse: `Aire totale = (x + 4)(x + 2).<br>Quatre produits : x × x + x × 2 + 4 × x + 4 × 2.<br>= x² + 2x + 4x + 8 = <span class="big">x² + 6x + 8</span> (en m²).<br>Sur le dessin : les 4 rectangles.`,
      consigne: "Quelle expression réduite donne l'aire totale ?",
      verification: { type: "qcm", choix: ["x² + 6x + 8", "x² + 8", "2x + 6"], bonne: 0 },
      dessin: piscine(),
    },
    {
      tag: "Énigme 4 · Le bricolage",
      titre: "Les planches de l'étagère",
      question: `Pour une étagère, Hugo coupe 3 planches de (2x + 1) dm.<br>Il coupe aussi 2 planches de (x − 4) dm.<br><br>Quelle expression <b>réduite</b> donne la longueur totale de bois ?`,
      reponse: `Longueur totale : 3(2x + 1) + 2(x − 4).<br>On développe : 6x + 3 + 2x − 8.<br>On réduit : <span class="big">8x − 5</span> (en dm).<br>Vérification avec x = 5 : 3 × 11 + 2 × 1 = 35, et 8 × 5 − 5 = 35.`,
      consigne: "Quelle expression réduite donne la longueur totale, en dm ? (par exemple 3x + 2)",
      verification: { type: "courte", attendus: ["8x−5", "8x-5"], unite: "dm" },
      dessin: planches(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le cahier de Zoé",
      sorte: "piege",
      question: `Zoé simplifie 6 − (x − 4).<br>Elle écrit : 6 − x − 4, donc 2 − x.<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! Le moins devant la parenthèse change le signe de <b>chaque</b> terme.<br>−(x − 4) = −x + 4.<br>6 − x + 4 = <span class="big">10 − x</span>.<br>Test avec x = 1 : 6 − (1 − 4) = 6 + 3 = 9 et 10 − 1 = 9. Mais 2 − 1 = 1 : faux.`,
      consigne: "Combien vaut 6 − (x − 4), une fois simplifié ?",
      verification: { type: "qcm", choix: ["2 − x", "10 − x", "10 + x"], bonne: 1 },
      dessin: cahier(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le tapis du salon",
      sorte: "defi",
      question: `Le tapis carré du salon a pour côté c mètres.<br>Léo le remplace par un tapis rectangle :<br>1 m plus long, mais 1 m plus étroit.<br><br>L'aire change-t-elle ? <b>De combien de m²</b> ?`,
      reponse: `Nouvelle aire : (c + 1)(c − 1) = c² − c + c − 1 = c² − 1.<br>Ancienne aire : c².<br>L'aire <b>diminue</b> de <span class="big">1 m²</span>, quel que soit c !<br>Vérification avec c = 3 : 3 × 3 = 9 et 4 × 2 = 8.`,
      consigne: "De combien de m² l'aire du tapis diminue-t-elle ?",
      verification: { type: "courte", attendus: ["1"], unite: "m²" },
      dessin: tapis(),
    },
  ],
};

export default problemes;
