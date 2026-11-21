// Énigmes à projeter — 4e, notion ordre_inequations (la location de vélo,
// multiplier par un négatif sur la droite graduée, la carte du cinéma,
// les données du téléphone, piège du congélateur, défi du cadenas).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;

// Une droite graduée de min à max, de x = 40 à x = 440, à la hauteur y.
const graduee = (min: number, max: number, y: number) => {
  const pas = 400 / (max - min);
  const X = (v: number) => r1(40 + (v - min) * pas);
  let s = `<path d="M30 ${y} L452 ${y}" stroke="${C.craie}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M444 ${y - 8} L454 ${y} L444 ${y + 8}" stroke="${C.craie}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  for (let v = min; v <= max; v++)
    s += `<path d="M${X(v)} ${y - 7} L${X(v)} ${y + 7}" stroke="${C.craie}" stroke-width="2"/>` +
      `<text x="${X(v)}" y="${y + 30}" fill="${C.pale}" font-size="18" text-anchor="middle">${v < 0 ? "−" + -v : v}</text>`;
  return { s, X };
};

// Le panneau de la location de vélos.
const velo = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le panneau d'une location de vélos : 3 euros puis 2 euros par heure ; le budget est de 20 euros">
  <rect x="60" y="40" width="360" height="170" rx="14" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  <text x="240" y="90" fill="${C.craie}" font-size="28" font-weight="bold" text-anchor="middle">LOCATION DE VÉLOS</text>
  <text x="240" y="140" fill="${C.craie}" font-size="26" text-anchor="middle">3 € la location</text>
  <text x="240" y="182" fill="${C.craie}" font-size="26" text-anchor="middle">+ 2 € par heure</text>
  <text x="140" y="320" font-size="80" text-anchor="middle">🚲</text>
  <rect x="270" y="260" width="160" height="80" rx="10" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="3"/>
  <text x="350" y="295" fill="${C.bleu}" font-size="20" text-anchor="middle">budget</text>
  <text x="350" y="327" fill="${C.bleu}" font-size="26" text-anchor="middle">20 € au plus</text>
  <text x="240" y="395" fill="${C.pale}" font-size="20" text-anchor="middle">les heures se paient entières</text>
  </svg>`;

// Multiplier par −3 : 1 donne −3, 2 donne −6, l'ordre se retourne.
const miroir = () => {
  const { s, X } = graduee(-7, 3, 250);
  const fl = (a: number, b: number, h: number, coul: string) =>
    `<path d="M${X(a)} 236 Q${r1((X(a) + X(b)) / 2)} ${h} ${X(b)} 236" stroke="${coul}" stroke-width="3" fill="none" stroke-dasharray="7 6"/>` +
    `<path d="M${X(b) + 9} 228 L${X(b)} 238 L${X(b) + 12} 240" stroke="${coul}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une droite graduée : a = 1 et b = 2 multipliés par moins 3 donnent moins 3 et moins 6">
  <text x="240" y="50" fill="${C.craie}" font-size="24" text-anchor="middle">a &lt; b. On multiplie par −3.</text>
  <text x="240" y="84" fill="${C.pale}" font-size="20" text-anchor="middle">un exemple${NB}: a = 1 et b = 2</text>
  ${fl(1, -3, 150, C.bleu)}${fl(2, -6, 110, C.rose)}
  ${s}
  <circle cx="${X(1)}" cy="250" r="7" fill="${C.bleu}"/><circle cx="${X(2)}" cy="250" r="7" fill="${C.rose}"/>
  <circle cx="${X(-3)}" cy="250" r="7" fill="${C.bleu}"/><circle cx="${X(-6)}" cy="250" r="7" fill="${C.rose}"/>
  <text x="${X(1)}" y="320" fill="${C.bleu}" font-size="22" text-anchor="middle">a</text>
  <text x="${X(2)}" y="320" fill="${C.rose}" font-size="22" text-anchor="middle">b</text>
  <text x="${X(-3)}" y="320" fill="${C.bleu}" font-size="22" text-anchor="middle">−3a</text>
  <text x="${X(-6)}" y="320" fill="${C.rose}" font-size="22" text-anchor="middle">−3b</text>
  <text x="240" y="385" fill="${C.craie}" font-size="22" text-anchor="middle">−3a et −3b${NB}: lequel est le plus grand${NB}?</text>
  </svg>`;
};

// Les deux tarifs du cinéma.
const cinema = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux tarifs de cinéma : la carte à 24 euros puis 5 euros la séance, ou 9 euros la séance sans carte">
  <text x="240" y="62" font-size="44" text-anchor="middle">🎬</text>
  <rect x="30" y="100" width="200" height="170" rx="12" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="4"/>
  <text x="130" y="145" fill="${C.bleu}" font-size="24" font-weight="bold" text-anchor="middle">AVEC LA CARTE</text>
  <text x="130" y="195" fill="${C.craie}" font-size="24" text-anchor="middle">24 € la carte</text>
  <text x="130" y="235" fill="${C.craie}" font-size="24" text-anchor="middle">+ 5 € la séance</text>
  <rect x="250" y="100" width="200" height="170" rx="12" fill="${C.jaune}" fill-opacity=".15" stroke="${C.jaune}" stroke-width="4"/>
  <text x="350" y="145" fill="${C.jaune}" font-size="24" font-weight="bold" text-anchor="middle">SANS CARTE</text>
  <text x="350" y="215" fill="${C.craie}" font-size="24" text-anchor="middle">9 € la séance</text>
  <text x="240" y="330" fill="${C.craie}" font-size="22" text-anchor="middle">À partir de combien de séances</text>
  <text x="240" y="362" fill="${C.craie}" font-size="22" text-anchor="middle">la carte est-elle moins chère${NB}?</text>
  </svg>`;

// Les données du téléphone : 7 cases de 1 Go, 2 Go partent chaque jour.
const telephone = () => {
  let cases = "";
  for (let k = 0; k < 7; k++)
    cases += `<rect x="${110 + k * 40}" y="150" width="34" height="70" rx="5" fill="${k === 0 ? C.rose : C.bleu}" fill-opacity="${k === 0 ? ".55" : ".35"}" stroke="${C.craie}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le forfait du téléphone : 7 gigaoctets, 2 gigaoctets utilisés par jour, il faut garder plus de 1 gigaoctet">
  <text x="60" y="210" font-size="56" text-anchor="middle">📱</text>
  <rect x="100" y="140" width="290" height="90" rx="10" fill="none" stroke="${C.craie}" stroke-width="4"/>
  <rect x="392" y="168" width="10" height="34" rx="3" fill="${C.craie}"/>
  ${cases}
  <text x="250" y="120" fill="${C.craie}" font-size="24" text-anchor="middle">7 Go au départ</text>
  <text x="250" y="275" fill="${C.craie}" font-size="22" text-anchor="middle">− 2 Go chaque jour</text>
  <text x="127" y="255" fill="${C.rose}" font-size="18" text-anchor="middle">1 Go</text>
  <text x="240" y="335" fill="${C.bleu}" font-size="24" text-anchor="middle">7 − 2x &gt; 1</text>
  <text x="240" y="375" fill="${C.pale}" font-size="20" text-anchor="middle">x${NB}: le nombre de jours</text>
  </svg>`;
};

// Le thermomètre du congélateur : 0 °C au départ, −4 °C par heure.
const congelateur = () => {
  let grad = "";
  [0, -4, -8, -12, -16].forEach((t, k) => {
    const y = 90 + k * 60;
    grad += `<path d="M175 ${y} L195 ${y}" stroke="${C.craie}" stroke-width="3"/>` +
      `<text x="160" y="${y + 7}" fill="${t === -12 ? C.rose : C.craie}" font-size="22" text-anchor="end">${t === 0 ? "0" : "−" + -t} °C</text>` +
      `<text x="220" y="${y + 7}" fill="${C.pale}" font-size="20">après ${k} h</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un thermomètre de congélateur : 0, moins 4, moins 8, moins 12, moins 16 degrés, après 0, 1, 2, 3, 4 heures">
  <rect x="175" y="70" width="20" height="280" rx="10" fill="${C.bleu}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  <circle cx="185" cy="370" r="22" fill="${C.bleu}" fill-opacity=".5" stroke="${C.craie}" stroke-width="3"/>
  ${grad}
  <text x="410" y="140" font-size="48" text-anchor="middle">❄️</text>
  <text x="400" y="290" fill="${C.rose}" font-size="22" text-anchor="middle">−4x ≤ −12</text>
  <text x="400" y="325" fill="${C.pale}" font-size="18" text-anchor="middle">Zoé${NB}: x ≤ 3${NB}?</text>
  </svg>`;
};

// Le cadenas : n > 5 et n < 6,5 sur la droite graduée.
const cadenas = () => {
  const { s, X } = graduee(2, 9, 260);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un cadenas à un chiffre et une droite graduée de 2 à 9 avec deux conditions sur le nombre">
  <text x="240" y="90" font-size="64" text-anchor="middle">🔒</text>
  <text x="240" y="150" fill="${C.craie}" font-size="22" text-anchor="middle">triple + 5 → plus de 20</text>
  <text x="240" y="185" fill="${C.craie}" font-size="22" text-anchor="middle">double − 1 → moins de 12</text>
  ${s}
  <text x="${X(5.5)}" y="350" fill="${C.rose}" font-size="34" text-anchor="middle">?</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">un nombre entier</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "ordre_inequations",
  titre: "Énigmes des inégalités et inéquations",
  description: "La location de vélo, la droite graduée retournée, la carte du cinéma, les données du téléphone, le piège du congélateur, le défi du cadenas : les règles de l'ordre et la résolution d'inéquations.",
  problemes: [
    {
      tag: "Énigme 1 · Les vacances",
      titre: "La location de vélo",
      question: `Louer un vélo coûte 3 €, plus 2 € par heure. Les heures se paient entières.<br>Mathéo a 20 € au plus.<br><br>Combien d'heures peut-il louer le vélo, au maximum ?`,
      reponse: `On note x le nombre d'heures. Le prix est 3 + 2x, et on veut 3 + 2x ≤ 20.<br>On enlève 3 des deux côtés : 2x ≤ 17.<br>On divise par 2, un nombre positif : le sens ne change pas. x ≤ 8,5.<br>Les heures sont entières : <span class="big">8 heures</span> au plus.<br>Contrôle : 3 + 2 × 8 = 19 €. Avec 9 heures : 21 €, trop cher.`,
      consigne: "Combien d'heures au maximum ?",
      verification: { type: "courte", attendus: ["8"], unite: "heures" },
      dessin: velo(),
    },
    {
      tag: "Énigme 2 · Le miroir",
      titre: "Multiplier par un négatif",
      question: `Kenza place deux nombres a et b sur une droite graduée, avec a &lt; b.<br>Elle les multiplie tous les deux par −3.<br><br>Que peut-on dire de −3a et de −3b ?`,
      reponse: `Exemple : 1 &lt; 2. Mais −3 × 1 = −3 et −3 × 2 = −6, et −3 &gt; −6.<br>Multiplier par un nombre <b>négatif</b> change le sens de l'inégalité.<br>Donc <span class="big">−3a &gt; −3b</span>.<br>Avec un nombre positif, le sens reste le même.`,
      consigne: "On sait que a < b. Que peut-on dire de −3a et −3b ?",
      verification: { type: "qcm", choix: ["−3a < −3b", "On ne peut pas savoir", "−3a > −3b"], bonne: 2 },
      dessin: miroir(),
    },
    {
      tag: "Énigme 3 · Au cinéma",
      titre: "La carte d'abonnement",
      question: `Au cinéma, la carte coûte 24 € pour l'année. Avec elle, la séance coûte 5 €.<br>Sans carte, la séance coûte 9 €.<br><br>À partir de combien de séances la carte est-elle moins chère ?`,
      reponse: `Avec x séances : 24 + 5x euros avec la carte, 9x euros sans carte.<br>On veut 24 + 5x &lt; 9x.<br>On enlève 5x des deux côtés : 24 &lt; 4x. On divise par 4 : 6 &lt; x.<br>À 6 séances, les deux tarifs font 54 €. La carte gagne à partir de <span class="big">7 séances</span>.<br>Contrôle : 24 + 5 × 7 = 59 €, contre 9 × 7 = 63 €.`,
      consigne: "À partir de combien de séances la carte est-elle moins chère ?",
      verification: { type: "courte", attendus: ["7"], unite: "séances" },
      dessin: cinema(),
    },
    {
      tag: "Énigme 4 · Le forfait",
      titre: "Les données du téléphone",
      question: `Noa part en voyage avec 7 Go de données sur son téléphone.<br>Chaque jour, il en utilise 2 Go. Il veut garder plus de 1 Go.<br>On note x le nombre de jours : 7 − 2x &gt; 1.<br><br>Quelles valeurs de x conviennent ?`,
      reponse: `On part de 7 − 2x &gt; 1.<br>On enlève 7 des deux côtés : −2x &gt; −6.<br>On divise par −2, un nombre négatif : le sens change ! x &lt; 3.<br><span class="big">x &lt; 3</span> : moins de 3 jours.<br>Contrôle : au bout de 3 jours, il reste 7 − 6 = 1 Go, pas plus de 1 Go.`,
      consigne: "Quelles valeurs de x vérifient 7 − 2x > 1 ?",
      verification: { type: "qcm", choix: ["x < 3", "x > 3", "x > −3"], bonne: 0 },
      dessin: telephone(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le congélateur",
      sorte: "piege",
      question: `Un congélateur est à 0 °C. Une fois branché, il perd 4 °C par heure : après x heures, il est à −4x °C.<br>On attend −12 °C ou moins : −4x ≤ −12.<br>Zoé divise par −4 et écrit : x ≤ 3.<br><br><b>Quelle est la bonne solution ?</b>`,
      reponse: `Zoé s'est trompée ! Elle a divisé par −4, un nombre négatif, sans changer le sens.<br>−4x ≤ −12 donne <span class="big">x ≥ 3</span>.<br>Contrôle : après 1 heure, il fait −4 °C, pas assez froid. Après 4 heures, −16 °C ≤ −12 °C.<br>Il faut attendre au moins 3 heures.`,
      consigne: "Quelle est la solution de −4x ≤ −12 ?",
      verification: { type: "qcm", choix: ["x ≤ 3", "x ≥ 3", "x ≥ −3"], bonne: 1 },
      dessin: congelateur(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le code du cadenas",
      sorte: "defi",
      question: `Le code du cadenas de Yanis est un nombre entier.<br>Si on le triple et qu'on ajoute 5, on dépasse 20.<br>Si on le double et qu'on enlève 1, on reste sous 12.<br><br>Quel est le code ?`,
      reponse: `On note n le code.<br>3n + 5 &gt; 20 donne 3n &gt; 15, donc n &gt; 5.<br>2n − 1 &lt; 12 donne 2n &lt; 13, donc n &lt; 6,5.<br>Le seul entier plus grand que 5 et plus petit que 6,5 : <span class="big">6</span>.<br>Contrôle : 3 × 6 + 5 = 23 &gt; 20 et 2 × 6 − 1 = 11 &lt; 12.`,
      consigne: "Quel est le code du cadenas ?",
      verification: { type: "courte", attendus: ["6"] },
      dessin: cadenas(),
    },
  ],
};

export default problemes;
