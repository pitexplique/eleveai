// Énigmes à projeter — 6e, notion demi_droite_graduee (lire une abscisse,
// placer un décimal, repérer une fraction, graduer un segment). 20/11/2026.
// ⛔ Graduations au pixel : x = x0 + k × pas, chaque point à son abscisse exacte.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const NB = " ";

/** Des traits verticaux en x = x0 + k × pas, pour k = 0 … n ; les « longs » plus hauts. */
const traits = (x0: number, pas: number, n: number, y: number, longs: number[], petit = 12, grand = 24) => {
  let d = "";
  for (let k = 0; k <= n; k++) {
    const h = longs.includes(k) ? grand : petit;
    d += `M${x0 + k * pas} ${y - h} L${x0 + k * pas} ${y + h} `;
  }
  return `<path d="${d.trim()}" stroke="${C.craie}" stroke-width="3" stroke-linecap="round" fill="none"/>`;
};

// La piste des escargots : 0 en 40, 1 en 240, 2 en 440 ; 5 espaces de 40 par mètre.
// L'escargot est à 1,4 : x = 40 + 7 × 40 = 320.
const escargot = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une piste graduée de 0 à 2 mètres, un escargot arrêté sur un trait">
  <path d="M40 200 L460 200" stroke="${C.craie}" stroke-width="4" stroke-linecap="round" fill="none"/>
  ${traits(40, 40, 10, 200, [0, 5, 10])}
  <circle cx="320" cy="200" r="8" fill="${C.rose}"/>
  <text x="320" y="165" font-size="44" text-anchor="middle">🐌</text>
  <text x="40" y="255" fill="${C.craie}" font-size="28" text-anchor="middle">0</text>
  <text x="240" y="255" fill="${C.craie}" font-size="28" text-anchor="middle">1</text>
  <text x="440" y="255" fill="${C.craie}" font-size="28" text-anchor="middle">2</text>
  <text x="240" y="310" fill="${C.pale}" font-size="22" text-anchor="middle">la piste, en mètres</text>
  <text x="240" y="380" fill="${C.rose}" font-size="28" text-anchor="middle">L'escargot est à${NB}? m</text>
  </svg>`;

// L'échelle de la rivière, debout : 0 en y = 380, 2 m en y = 60, un trait tous les 0,1 m (16).
// A = 0,6 (y = 284), B = 1,6 (y = 124), C = 1,4 (y = 156).
const riviere = () => {
  let d = "";
  for (let k = 0; k <= 20; k++) {
    const y = 380 - 16 * k;
    const l = k % 10 === 0 ? 26 : k % 5 === 0 ? 18 : 10;
    d += `M200 ${y} L${200 + l} ${y} `;
  }
  const repere = (lettre: string, y: number) =>
    `<path d="M290 ${y} L238 ${y} M250 ${y - 10} L238 ${y} L250 ${y + 10}" stroke="${C.rose}" stroke-width="3" stroke-linecap="round" fill="none"/>` +
    `<text x="302" y="${y + 9}" fill="${C.rose}" font-size="26">${lettre}</text>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une échelle de rivière graduée de 0 à 2 mètres, avec trois repères A, B et C">
  <path d="M200 60 L200 380" stroke="${C.craie}" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="${d.trim()}" stroke="${C.craie}" stroke-width="3" stroke-linecap="round" fill="none"/>
  <text x="185" y="389" fill="${C.craie}" font-size="26" text-anchor="end">0</text>
  <text x="185" y="229" fill="${C.craie}" font-size="26" text-anchor="end">1</text>
  <text x="185" y="69" fill="${C.craie}" font-size="26" text-anchor="end">2</text>
  <text x="100" y="140" fill="${C.pale}" font-size="22" text-anchor="middle">en</text>
  <text x="100" y="168" fill="${C.pale}" font-size="22" text-anchor="middle">mètres</text>
  ${repere("A", 284)}
  ${repere("B", 124)}
  ${repere("C", 156)}
  <path d="M120 402 Q150 390 180 402 T240 402 T300 402 T360 402" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <text x="400" y="250" fill="${C.pale}" font-size="22" text-anchor="middle">l'eau</text>
  <text x="400" y="278" fill="${C.pale}" font-size="22" text-anchor="middle">monte</text>
  <text x="400" y="306" fill="${C.pale}" font-size="22" text-anchor="middle">ici</text>
  <path d="M400 370 L400 322 M390 334 L400 322 L410 334" stroke="${C.bleu}" stroke-width="3" stroke-linecap="round" fill="none"/>
  </svg>`;
};

// Le fil à linge : 0 en 60, 1 en 240, 2 en 420 ; chaque mètre en 3 parts de 60.
// La chaussette est à 5/3 : x = 60 + 5 × 60 = 360.
const linge = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un fil à linge gradué de 0 à 2 mètres, en tiers, avec une chaussette accrochée sur un trait">
  <path d="M60 200 L450 200" stroke="${C.craie}" stroke-width="4" stroke-linecap="round" fill="none"/>
  ${traits(60, 60, 6, 200, [0, 3, 6])}
  <text x="60" y="160" fill="${C.craie}" font-size="28" text-anchor="middle">0</text>
  <text x="240" y="160" fill="${C.craie}" font-size="28" text-anchor="middle">1</text>
  <text x="420" y="160" fill="${C.craie}" font-size="28" text-anchor="middle">2</text>
  <rect x="354" y="192" width="12" height="26" rx="3" fill="${C.bleu}" fill-opacity=".45"/>
  <text x="360" y="268" font-size="46" text-anchor="middle">🧦</text>
  <text x="240" y="330" fill="${C.pale}" font-size="22" text-anchor="middle">chaque mètre${NB}: 3 parts égales</text>
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">L'abscisse de la chaussette${NB}?</text>
  </svg>`;

// La bande de la scène : 0 en 40, 10 m en 440 (40 par mètre) ; 4 parts de 100 ;
// le 3e trait en 340 (= 7,5 m), marqué d'un « ? ».
const scene = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une bande de 10 mètres partagée en 4 parts égales ; le troisième trait est marqué d'un point d'interrogation">
  <rect x="40" y="186" width="400" height="28" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  ${traits(40, 100, 4, 200, [0, 4], 26, 26)}
  <text x="40" y="262" fill="${C.craie}" font-size="26" text-anchor="middle">0</text>
  <text x="440" y="262" fill="${C.craie}" font-size="26" text-anchor="middle">10 m</text>
  <text x="140" y="160" fill="${C.pale}" font-size="22" text-anchor="middle">1er</text>
  <text x="240" y="160" fill="${C.pale}" font-size="22" text-anchor="middle">2e</text>
  <text x="340" y="160" fill="${C.rose}" font-size="22" text-anchor="middle">3e</text>
  <text x="340" y="268" fill="${C.rose}" font-size="34" text-anchor="middle">?</text>
  <text x="240" y="100" font-size="44" text-anchor="middle">💃 💃 💃</text>
  <text x="240" y="330" fill="${C.pale}" font-size="22" text-anchor="middle">4 parts égales</text>
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">Le 3e trait est à${NB}? m</text>
  </svg>`;

// Le piège : de 2 à 3 m, un trait tous les 0,1 (40). Le drapeau d'Enzo est à 2,03 :
// x = 50 + 0,03 × 400 = 62.
const drapeau = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une règle graduée de 2 à 3 mètres en dixièmes ; Enzo pose son drapeau juste après le 2">
  <rect x="30" y="215" width="440" height="40" fill="${C.jaune}" fill-opacity=".2"/>
  <path d="M30 200 L470 200" stroke="${C.craie}" stroke-width="4" stroke-linecap="round" fill="none"/>
  ${traits(50, 40, 10, 200, [0, 10, 5])}
  <path d="M62 200 L62 110" stroke="${C.rose}" stroke-width="4" stroke-linecap="round" fill="none"/>
  <polygon points="62,110 102,124 62,138" fill="${C.rose}" fill-opacity=".45" stroke="${C.rose}" stroke-width="3" stroke-linejoin="round"/>
  <text x="120" y="135" fill="${C.rose}" font-size="24">Enzo</text>
  <text x="50" y="290" fill="${C.craie}" font-size="28" text-anchor="middle">2</text>
  <text x="450" y="290" fill="${C.craie}" font-size="28" text-anchor="middle">3</text>
  <text x="240" y="335" fill="${C.pale}" font-size="22" text-anchor="middle">le saut d'Ambre${NB}: 2,3 m</text>
  <text x="240" y="385" fill="${C.rose}" font-size="30" text-anchor="middle">Bien placé${NB}?</text>
  </svg>`;

// Le défi : traits en x = 40 + 45 k (k = 0 … 9). 2,6 sous k = 2 (130), 3,8 sous
// k = 6 (310) : pas = 1,2 ÷ 4 = 0,3. La tache est sous k = 8 (400) = 4,4.
const tache = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un morceau de droite graduée : deux nombres lisibles, 2,6 et 3,8, et une tache d'encre sur un troisième trait">
  <path d="M25 200 L465 200" stroke="${C.craie}" stroke-width="4" stroke-linecap="round" fill="none"/>
  ${traits(40, 45, 9, 200, [])}
  <text x="130" y="250" fill="${C.craie}" font-size="28" text-anchor="middle">2,6</text>
  <text x="310" y="250" fill="${C.craie}" font-size="28" text-anchor="middle">3,8</text>
  <circle cx="400" cy="244" r="26" fill="${C.bleu}" fill-opacity=".45"/>
  <circle cx="378" cy="262" r="9" fill="${C.bleu}" fill-opacity=".45"/>
  <text x="400" y="160" fill="${C.rose}" font-size="30" text-anchor="middle">T</text>
  <path d="M400 168 L400 182" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <text x="240" y="330" fill="${C.pale}" font-size="22" text-anchor="middle">tous les espaces sont égaux</text>
  <text x="240" y="385" fill="${C.rose}" font-size="28" text-anchor="middle">Sous la tache${NB}?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "demi_droite_graduee",
  titre: "Énigmes sur la demi-droite graduée",
  description: "La course d'escargots, l'échelle de la rivière, le fil à linge, la scène de danse, le drapeau d'Enzo et la tache d'encre : 6 énigmes à projeter pour lire, placer et graduer.",
  problemes: [
    {
      tag: `Énigme 1 · Au concours d'escargots`,
      titre: `L'escargot de Lou`,
      question: `L'escargot de Lou avance sur une piste graduée.<br>Entre 0 et 1 m, il y a <b>5 espaces égaux</b>.<br>L'escargot s'arrête sur un trait.<br><br>À <b>combien de mètres</b> est-il ?`,
      reponse: `Entre 0 et 1, il y a 5 espaces : 1 ÷ 5 = 0,2.<br>Chaque trait ajoute 0,2 m.<br>Après 1, l'escargot est 2 traits plus loin.<br>1 + 0,2 + 0,2 = 1,4. Il est à <span class="big">1,4 m</span>.`,
      consigne: `À combien de mètres est l'escargot ?`,
      verification: { type: "courte", attendus: ["1,4", "1.4"], unite: "m" },
      dessin: escargot(),
    },
    {
      tag: `Énigme 2 · Au bord de la rivière`,
      titre: `L'échelle de la rivière`,
      question: `Une échelle graduée mesure la hauteur de la rivière.<br>Ce matin, l'eau monte à <b>1,6 m</b>.<br><br>Quel repère montre <b>1,6 m</b> : A, B ou C ?`,
      reponse: `Entre 0 et 1, il y a 10 espaces : chaque trait vaut 0,1 m.<br>Pour 1,6 : je pars de 1 et je monte de 6 traits.<br>C'est <span class="big">le repère B</span>.<br>A est à 0,6 m, C est à 1,4 m.`,
      consigne: `Quel repère montre 1,6 m sur l'échelle ?`,
      verification: { type: "qcm", choix: [`Le repère A`, `Le repère B`, `Le repère C`], bonne: 1 },
      dessin: riviere(),
    },
    {
      tag: `Énigme 3 · À la buanderie`,
      titre: `La chaussette sur le fil`,
      question: `Le fil à linge est gradué en mètres.<br>Chaque mètre est coupé en <b>3 parts égales</b>.<br>La chaussette est accrochée sur un trait.<br><br>Quelle <b>fraction</b> est son abscisse ?`,
      reponse: `Chaque part vaut un tiers de mètre : ${frac(1, 3)}.<br>De 0 à la chaussette, je compte 5 tiers.<br>Son abscisse est <span class="big">${frac(5, 3)}</span>.<br>3 tiers font 1 : ${frac(5, 3)} est entre 1 et 2.`,
      consigne: `Quelle fraction est l'abscisse de la chaussette ? Écris-la avec la barre /, comme au tableau.`,
      verification: { type: "courte", attendus: ["5/3"] },
      dessin: linge(),
    },
    {
      tag: `Énigme 4 · Au spectacle de danse`,
      titre: `Les marques de la scène`,
      question: `Sur la scène, une bande mesure <b>10 m</b>.<br>La prof de danse la partage en <b>4 parts égales</b>.<br>Elle colle un trait à chaque séparation.<br><br>À <b>combien de mètres</b> du début est le 3e trait ?`,
      reponse: `10 ÷ 4 = 2,5 : chaque part mesure 2,5 m.<br>Les traits sont à 2,5 m, 5 m et 7,5 m.<br>Le 3e trait est à <span class="big">7,5 m</span> du début.`,
      consigne: `À combien de mètres du début est le 3e trait ?`,
      verification: { type: "courte", attendus: ["7,5", "7.5"], unite: "m" },
      dessin: scene(),
    },
    {
      tag: `Énigme 5 · Attention au piège`,
      titre: `Le drapeau d'Enzo`,
      sorte: "piege",
      question: `Ambre saute <b>2,3 m</b> en longueur.<br>Enzo plante un drapeau <b>juste après le 2</b>.<br>Il dit : « 2,3, c'est tout près de 2. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! 2,3, c'est 2 et <b>3 dixièmes</b>.<br>Entre 2 et 3, chaque petit trait vaut 0,1.<br>2,3 est sur le <span class="big">3e petit trait après 2</span>.<br>Le drapeau d'Enzo est à 2,03 : 3 centièmes après 2.`,
      consigne: `Enzo place 2,3 juste après le 2. A-t-il raison ?`,
      verification: { type: "qcm", choix: [`Non : 2,3 est sur le 3e petit trait après 2`, `Oui, 2,3 est tout près de 2`, `Non : 2,3 est après le 3`], bonne: 0 },
      dessin: drapeau(),
    },
    {
      tag: `Énigme 6 · Le défi des curieux`,
      titre: `La tache d'encre`,
      sorte: "defi",
      question: `Sur une vieille droite graduée, on lit seulement <b>2,6</b> et <b>3,8</b>.<br>Tous les espaces sont égaux.<br>Une tache d'encre cache le nombre du trait T.<br><br><b>Quel nombre</b> est sous la tache ?`,
      reponse: `De 2,6 à 3,8, il y a 4 espaces.<br>3,8 − 2,6 = 1,2 et 1,2 ÷ 4 = 0,3 : chaque espace vaut 0,3.<br>T est 2 espaces après 3,8 : 3,8 + 0,3 + 0,3.<br>Sous la tache : <span class="big">4,4</span>.<br>Bonus : le premier trait vaut 2.`,
      consigne: `Quel nombre est caché sous la tache, au trait T ?`,
      verification: { type: "courte", attendus: ["4,4", "4.4"] },
      dessin: tache(),
    },
  ],
};

export default problemes;
