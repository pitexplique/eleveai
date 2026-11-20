// Énigmes à projeter — 5e, notion nombre_approche (encadrer, valeur
// approchée, arrondi). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

// Une droite zoomée : de a à b, n intervalles, x de 40 à 440 ; étiquettes données.
const zoom = (n: number, etiquettes: [number, string][], y = 230) => {
  let s = `<path d="M30 ${y} L450 ${y}" stroke="${C.craie}" stroke-width="3"/>`;
  for (let k = 0; k <= n; k++) {
    const x = 40 + (400 / n) * k;
    s += `<path d="M${x} ${y - 10} L${x} ${y + 10}" stroke="${C.craie}" stroke-width="2"/>`;
  }
  for (const [k, t] of etiquettes) {
    const x = 40 + (400 / n) * k;
    s += `<path d="M${x} ${y - 16} L${x} ${y + 16}" stroke="${C.craie}" stroke-width="3"/><text x="${x}" y="${y + 44}" fill="${C.craie}" font-size="20" text-anchor="middle">${t}</text>`;
  }
  return s;
};

// De 2 à 3 : 10 intervalles de 40 px ; 2,46 en x = 40 + 400 × 0,46 = 224.
const saut = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une droite de 2 à 3 graduée en dixièmes ; le saut de 2,46 m entre 2,4 et 2,5">
  <text x="240" y="90" fill="${C.craie}" font-size="26" text-anchor="middle">le saut de Nina : 2,46 m</text>
  ${zoom(10, [[0, "2"], [4, "2,4"], [5, "2,5"], [10, "3"]])}
  <circle cx="224" cy="230" r="8" fill="${C.rose}"/>
  <path d="M224 210 L224 160" stroke="${C.rose}" stroke-width="2" stroke-dasharray="4 4"/>
  <text x="224" y="150" fill="${C.rose}" font-size="24" text-anchor="middle">2,46</text>
  <text x="240" y="350" fill="${C.pale}" font-size="22" text-anchor="middle">un petit trait = 0,1</text>
  </svg>`;

const corde = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une corde de 17 m partagée en 3 morceaux égaux">
  <path d="M40 200 Q140 180 240 200 T440 200" stroke="${C.jaune}" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M173 170 L173 230 M307 170 L307 230" stroke="${C.rose}" stroke-width="4" stroke-dasharray="6 5"/>
  <text x="240" y="120" fill="${C.craie}" font-size="30" text-anchor="middle">17 m</text>
  <text x="107" y="270" fill="${C.rose}" font-size="28" text-anchor="middle">?</text>
  <text x="240" y="270" fill="${C.rose}" font-size="28" text-anchor="middle">?</text>
  <text x="373" y="270" fill="${C.rose}" font-size="28" text-anchor="middle">?</text>
  <text x="240" y="350" fill="${C.pale}" font-size="22" text-anchor="middle">3 morceaux de même longueur</text>
  </svg>`;

const chrono = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un chronomètre affiche 9,87 secondes">
  <rect x="200" y="60" width="80" height="30" rx="6" fill="${C.pale}" fill-opacity=".4" stroke="${C.craie}" stroke-width="3"/>
  <circle cx="240" cy="230" r="130" fill="none" stroke="${C.craie}" stroke-width="5"/>
  <rect x="120" y="190" width="240" height="80" rx="10" fill="${C.bleu}" fill-opacity=".12" stroke="${C.bleu}" stroke-width="3"/>
  <text x="240" y="248" fill="${C.bleu}" font-size="50" text-anchor="middle">9,87 s</text>
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">au dixième près : ?</text>
  </svg>`;

// De 3,14 à 3,15 : 10 intervalles de 40 px ; π ≈ 3,14159 en x = 40 + 400 × 0,159 ≈ 104.
const pi = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une droite de 3,14 à 3,15 ; le nombre pi est juste après 3,141">
  <text x="240" y="90" fill="${C.craie}" font-size="34" text-anchor="middle">π = 3,14159…</text>
  ${zoom(10, [[0, "3,14"], [10, "3,15"]])}
  <circle cx="104" cy="230" r="8" fill="${C.rose}"/>
  <text x="104" y="190" fill="${C.rose}" font-size="30" text-anchor="middle">π</text>
  <text x="240" y="350" fill="${C.pale}" font-size="22" text-anchor="middle">un petit trait = 0,001</text>
  </svg>`;

// De 2,9 à 3 : 10 intervalles ; 2,96 en x = 40 + 400 × 0,6 = 280.
const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une droite de 2,9 à 3 ; 2,96 est plus près de 3">
  <text x="240" y="90" fill="${C.rose}" font-size="32" text-anchor="middle">2,96 ≈ ? au dixième</text>
  ${zoom(10, [[0, "2,9"], [5, "2,95"], [10, "3"]])}
  <circle cx="280" cy="230" r="8" fill="${C.bleu}"/>
  <text x="280" y="190" fill="${C.bleu}" font-size="24" text-anchor="middle">2,96</text>
  <path d="M290 320 L430 320 M418 310 L430 320 L418 330" stroke="${C.jaune}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="360" y="355" fill="${C.jaune}" font-size="20" text-anchor="middle">plus près</text>
  </svg>`;

// De 4,2 à 4,4 : 20 intervalles de 20 px ; 4,25 en 140, 4,35 en 340.
const defi = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une droite de 4,2 à 4,4 ; la zone des nombres qui s'arrondissent à 4,3">
  ${zoom(20, [[0, "4,2"], [5, "4,25"], [10, "4,3"], [15, "4,35"], [20, "4,4"]])}
  <rect x="140" y="200" width="200" height="60" fill="${C.jaune}" fill-opacity=".2"/>
  <text x="240" y="170" fill="${C.jaune}" font-size="24" text-anchor="middle">s'arrondit à 4,3</text>
  <text x="140" y="120" fill="${C.rose}" font-size="34" text-anchor="middle">?</text>
  <path d="M140 130 L140 200" stroke="${C.rose}" stroke-width="2" stroke-dasharray="4 4"/>
  <text x="240" y="350" fill="${C.pale}" font-size="22" text-anchor="middle">deux chiffres après la virgule</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "nombre_approche",
  titre: "Énigmes sur les encadrements et les valeurs approchées",
  description: "Encadrer un nombre et donner une valeur approchée en 5e : saut en longueur, corde partagée, chrono au dixième, π au centième, piège du 2,96, le plus petit nombre caché. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Au saut en longueur",
      titre: "Entre deux dixièmes",
      question: `Nina saute <b>2,46 m</b>.<br><br><b>Entre quels dixièmes</b> se trouve son saut ?`,
      reponse: `2,46 est après 2,4 et avant 2,5.<br>On écrit <span class="big">2,4 &lt; 2,46 &lt; 2,5</span>.`,
      consigne: "Entre quels dixièmes se trouve 2,46 ?",
      verification: { type: "qcm", choix: ["2 et 3", "2,4 et 2,5", "2,5 et 2,6"], bonne: 1 },
      dessin: saut(),
    },
    {
      tag: "Énigme 2 · Au camping",
      titre: "La corde en trois",
      question: `On coupe une corde de <b>17 m</b> en <b>3 morceaux</b> égaux.<br>La calculatrice affiche 5,666666…<br><br><b>Entre quels nombres entiers</b> est la longueur d'un morceau ?`,
      reponse: `3 × 5 = 15 et 3 × 6 = 18 : 17 est entre les deux.<br>Un morceau mesure <span class="big">entre 5 m et 6 m</span> : 5 &lt; 17 ÷ 3 &lt; 6.`,
      consigne: "Entre quels entiers est 17 ÷ 3 ?",
      verification: { type: "qcm", choix: ["Entre 5 et 6", "Entre 6 et 7", "Entre 3 et 4"], bonne: 0 },
      dessin: corde(),
    },
    {
      tag: "Énigme 3 · Au stade",
      titre: "Le chrono au dixième",
      question: `Un coureur fait le 100 m en <b>9,87 s</b>.<br><br>Quel est son temps <b>arrondi au dixième</b> ?`,
      reponse: `9,87 est entre 9,8 et 9,9. Le chiffre des centièmes est 7, donc on va vers le haut.<br>Arrondi au dixième : <span class="big">9,9 s</span>.`,
      consigne: "Quel est le temps arrondi au dixième, en secondes ?",
      verification: { type: "courte", attendus: ["9,9", "9.9"], unite: "s" },
      dessin: chrono(),
    },
    {
      tag: "Énigme 4 · Le nombre π",
      titre: "π au centième",
      question: `π = 3,14159…<br><br>Quelle est sa <b>valeur approchée par défaut au centième</b> ?`,
      reponse: `Par défaut : le nombre au centième juste en dessous.<br>3,14 &lt; π &lt; 3,15. La valeur approchée par défaut est <span class="big">3,14</span>.`,
      consigne: "Quelle est la valeur approchée par défaut de π au centième ?",
      verification: { type: "courte", attendus: ["3,14", "3.14"] },
      dessin: pi(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'arrondi de Tom",
      sorte: "piege",
      question: `Tom doit arrondir <b>2,96</b> au dixième.<br>Il hésite entre 2,9 et 2,10.<br><br><b>Quel est le bon arrondi ?</b>`,
      reponse: `Le dixième au-dessus de 2,9, ce n'est pas 2,10 : c'est 3,0.<br>2,96 est plus près de 3 que de 2,9. L'arrondi est <span class="big">3,0</span>.`,
      consigne: "Quel est l'arrondi de 2,96 au dixième ?",
      verification: { type: "qcm", choix: ["2,9", "2,10", "3,0"], bonne: 2 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le plus petit nombre caché",
      sorte: "defi",
      question: `Je suis un nombre avec <b>deux chiffres après la virgule</b>.<br>Arrondi au dixième, je vaux <b>4,3</b>.<br><br><b>Quel est le plus petit nombre</b> que je peux être ?`,
      reponse: `4,24 s'arrondit à 4,2. 4,25 est pile au milieu : on arrondit vers le haut, à 4,3.<br>Le plus petit est <span class="big">4,25</span>.`,
      consigne: "Quel est le plus petit nombre à deux décimales qui s'arrondit à 4,3 ?",
      verification: { type: "courte", attendus: ["4,25", "4.25"] },
      dessin: defi(),
    },
  ],
};

export default problemes;
