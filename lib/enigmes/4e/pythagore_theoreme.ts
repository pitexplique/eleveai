// Énigmes à projeter — 4e, notion pythagore_theoreme. Migrées le 19/11/2026
// depuis public/enigmes/pythagore-4e.html (fond blanc, lignes d'écriture).
import type { EnigmesNotion } from "../types";

const enigmes: EnigmesNotion = {
  classe: "4e",
  notionId: "pythagore_theoreme",
  titre: "Énigmes de Pythagore",
  description: "Corde à 13 nœuds, raccourci, échelle, puzzle des carrés, piège, diagonale du carré.",
  enigmes: [
    {
      tag: "Énigme 1 · Une vieille histoire",
      titre: "La corde à 13 nœuds",
      question: `On raconte que les bâtisseurs égyptiens traçaient leurs angles droits avec une <b>corde à 13 nœuds</b> : 12 intervalles égaux, et le 13<sup>e</sup> nœud se pose sur le 1<sup>er</sup> pour fermer la corde.<br><br>Comment s'en servir pour fabriquer un <b>angle droit</b> parfait ?`,
      reponse: `On tend la corde en triangle de côtés <span class="big">3, 4 et 5</span> intervalles.<br>3² + 4² = 9 + 16 = 25 = 5², donc d'après la réciproque de Pythagore, le triangle est rectangle.`,
      consigne: "Quelles longueurs, en intervalles, donnent un angle droit ?",
      verification: {"type":"qcm","choix":["2, 5 et 5","3, 4 et 5","4, 4 et 4"],"bonne":1},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Corde à 13 nœuds tendue en triangle 3-4-5">
  <path d="M80 100 L80 340 L400 340 Z" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <rect x="80" y="310" width="30" height="30" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/>
  <circle cx="80" cy="340" r="9" fill="#d97706"/><circle cx="80" cy="260" r="9" fill="#d97706"/><circle cx="80" cy="180" r="9" fill="#d97706"/><circle cx="80" cy="100" r="9" fill="#d97706"/><circle cx="160" cy="340" r="9" fill="#d97706"/><circle cx="240" cy="340" r="9" fill="#d97706"/><circle cx="320" cy="340" r="9" fill="#d97706"/><circle cx="400" cy="340" r="9" fill="#d97706"/><circle cx="144" cy="148" r="9" fill="#d97706"/><circle cx="208" cy="196" r="9" fill="#d97706"/><circle cx="272" cy="244" r="9" fill="#d97706"/><circle cx="336" cy="292" r="9" fill="#d97706"/>
  <text x="40" y="230" fill="#1e293b" font-size="30" text-anchor="middle">3</text>
  <text x="240" y="385" fill="#1e293b" font-size="30" text-anchor="middle">4</text>
  <text x="265" y="200" fill="#1e293b" font-size="30">5</text>
  <text x="240" y="40" fill="#64748b" font-size="24" text-anchor="middle">12 intervalles = 3 + 4 + 5</text>
  <text x="80" y="385" fill="#64748b" font-size="18" text-anchor="middle">1er = 13e</text>
  </svg>`,
    },
    {
      tag: "Énigme 2 · Le chemin de l’école",
      titre: "Le raccourci",
      question: `Pour aller au collège, Léa marche <b>300 m vers l'est</b>, puis <b>400 m vers le nord</b>.<br><br>Un jour, elle coupe à travers le parc, en ligne droite. <b>Combien de mètres</b> économise-t-elle ?`,
      reponse: `Le raccourci est l'hypoténuse : 300² + 400² = 90 000 + 160 000 = 250 000, et √250 000 = 500 m.<br>Elle marche 500 m au lieu de 700 m : elle économise <span class="big">200 m</span>.`,
      consigne: "Combien de mètres Léa économise-t-elle ?",
      verification: {"type":"courte","attendus":["200"],"unite":"m"},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Trajet en L de 300 m puis 400 m, et raccourci en diagonale">
  <path d="M70 360 L270 360 L270 90" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <rect x="240" y="330" width="30" height="30" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/>
  <path d="M70 360 L270 90" stroke="#be123c" stroke-width="5" stroke-dasharray="14 10" fill="none" stroke-linecap="round"/>
  <circle cx="70" cy="360" r="10" fill="#1d4ed8"/><circle cx="270" cy="90" r="10" fill="#d97706"/>
  <text x="60" y="400" fill="#1d4ed8" font-size="26">Maison</text>
  <text x="290" y="85" fill="#d97706" font-size="26">Collège</text>
  <text x="170" y="398" fill="#1e293b" font-size="28" text-anchor="middle">300 m</text>
  <text x="290" y="235" fill="#1e293b" font-size="28">400 m</text>
  <text x="110" y="210" fill="#be123c" font-size="28">? m</text>
  <text x="125" y="170" fill="#be123c" font-size="22">le parc</text>
  </svg>`,
    },
    {
      tag: "Énigme 3 · Sauvetage",
      titre: "Le chat dans l’arbre",
      question: `Un chat est coincé en haut d'un arbre. Les pompiers posent une <b>échelle de 13 m</b>, dont le pied est à <b>5 m de l'arbre</b>.<br><br>À <b>quelle hauteur</b> est le chat, si l'échelle touche juste le haut de l'arbre ?`,
      reponse: `L'échelle est l'hypoténuse : 13² = 5² + h², donc h² = 169 − 25 = 144.<br>h = √144 = <span class="big">12 m</span>.`,
      consigne: "À quelle hauteur est le chat ?",
      verification: {"type":"courte","attendus":["12"],"unite":"m"},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Arbre, échelle de 13 m, pied à 5 m">
  <path d="M330 380 L330 70" stroke="#1e293b" stroke-width="10" stroke-linecap="round"/>
  <path d="M330 120 q-60 -10 -80 -50 M330 170 q60 -10 80 -50 M330 230 q-50 0 -70 -30" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/>
  <path d="M40 380 L440 380" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/>
  <path d="M201 380 L330 70" stroke="#d97706" stroke-width="5" fill="none" stroke-linecap="round"/>
  <rect x="300" y="350" width="30" height="30" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/>
  <text x="345" y="62" fill="#be123c" font-size="40">🐱</text>
  <text x="250" y="220" fill="#d97706" font-size="28" text-anchor="end">13 m</text>
  <text x="265" y="410" fill="#1e293b" font-size="28" text-anchor="middle">5 m</text>
  <text x="350" y="240" fill="#be123c" font-size="28">? m</text>
  </svg>`,
    },
    {
      tag: "Énigme 4 · Compte les carreaux",
      titre: "Le puzzle des carrés",
      question: `Sur chaque côté du triangle rectangle, on a dessiné un carré.<br><br>Compte les petits carreaux dans le <b style="color:#1d4ed8">carré bleu</b>, puis dans le <b style="color:#d97706">carré jaune</b>, puis dans le <b style="color:#be123c">carré rose</b>. <b>Que remarques-tu ?</b>`,
      reponse: `Bleu : 9 carreaux. Jaune : 16 carreaux. Rose : 25 carreaux.<br><span class="big">9 + 16 = 25</span> : l'aire du grand carré est la somme des deux autres. C'est exactement le théorème de Pythagore !`,
      consigne: "Que remarques-tu ?",
      verification: {"type":"qcm","choix":["Bleu + jaune = rose","Bleu + rose = jaune","Les trois carrés ont autant de carreaux"],"bonne":0},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Triangle 3-4-5 avec un carré sur chaque côté">
  <rect x="48" y="152" width="34" height="34" fill="#1d4ed8" fill-opacity=".18" stroke="#1d4ed8" stroke-width="2"/><rect x="48" y="186" width="34" height="34" fill="#1d4ed8" fill-opacity=".18" stroke="#1d4ed8" stroke-width="2"/><rect x="48" y="220" width="34" height="34" fill="#1d4ed8" fill-opacity=".18" stroke="#1d4ed8" stroke-width="2"/><rect x="82" y="152" width="34" height="34" fill="#1d4ed8" fill-opacity=".18" stroke="#1d4ed8" stroke-width="2"/><rect x="82" y="186" width="34" height="34" fill="#1d4ed8" fill-opacity=".18" stroke="#1d4ed8" stroke-width="2"/><rect x="82" y="220" width="34" height="34" fill="#1d4ed8" fill-opacity=".18" stroke="#1d4ed8" stroke-width="2"/><rect x="116" y="152" width="34" height="34" fill="#1d4ed8" fill-opacity=".18" stroke="#1d4ed8" stroke-width="2"/><rect x="116" y="186" width="34" height="34" fill="#1d4ed8" fill-opacity=".18" stroke="#1d4ed8" stroke-width="2"/><rect x="116" y="220" width="34" height="34" fill="#1d4ed8" fill-opacity=".18" stroke="#1d4ed8" stroke-width="2"/>
  <rect x="150" y="254" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="150" y="288" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="150" y="322" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="150" y="356" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="184" y="254" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="184" y="288" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="184" y="322" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="184" y="356" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="218" y="254" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="218" y="288" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="218" y="322" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="218" y="356" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="252" y="254" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="252" y="288" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="252" y="322" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/><rect x="252" y="356" width="34" height="34" fill="#d97706" fill-opacity=".18" stroke="#d97706" stroke-width="2"/>
  <g transform="translate(286,254) rotate(-143.1)"><rect x="0" y="0" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="0" y="34" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="0" y="68" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="0" y="102" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="0" y="136" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="34" y="0" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="34" y="34" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="34" y="68" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="34" y="102" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="34" y="136" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="68" y="0" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="68" y="34" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="68" y="68" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="68" y="102" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="68" y="136" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="102" y="0" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="102" y="34" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="102" y="68" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="102" y="102" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="102" y="136" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="136" y="0" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="136" y="34" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="136" y="68" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="136" y="102" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/><rect x="136" y="136" width="34" height="34" fill="#be123c" fill-opacity=".18" stroke="#be123c" stroke-width="2"/></g>
  <polygon points="150,254 286,254 150,152" fill="none" stroke="#1e293b" stroke-width="4" stroke-linejoin="round"/>
  <text x="99" y="212" fill="#1d4ed8" font-size="26" text-anchor="middle">?</text>
  <text x="218" y="331" fill="#d97706" font-size="26" text-anchor="middle">?</text>
  <text x="269" y="144" fill="#be123c" font-size="26" text-anchor="middle">?</text>
  </svg>`,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Il a l’air droit…",
      sorte: "piege",
      question: `Ce triangle a pour côtés <b>6 cm</b>, <b>8 cm</b> et <b>11 cm</b>. Sur le dessin, il a l'air rectangle.<br><br><b>Est-il vraiment rectangle ?</b>`,
      reponse: `Plus grand côté : 11. D'une part 11² = 121. D'autre part 6² + 8² = 36 + 64 = 100.<br>121 ≠ 100 : <span class="big">il n'est pas rectangle</span>. On ne conclut jamais « à l'œil » !`,
      consigne: "Le triangle 6 cm, 8 cm, 11 cm est-il rectangle ?",
      verification: {"type":"qcm","choix":["Oui, il est rectangle","Non, il n'est pas rectangle","On ne peut pas savoir"],"bonne":1},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Triangle 6-8-11 qui semble rectangle">
  <path d="M100 340 L380 340 L89 130 Z" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="78" y="245" fill="#1e293b" font-size="30" text-anchor="end">6</text>
  <text x="240" y="385" fill="#1e293b" font-size="30" text-anchor="middle">8</text>
  <text x="250" y="220" fill="#1e293b" font-size="30">11</text>
  <text x="130" y="320" fill="#be123c" font-size="44">?</text>
  <text x="240" y="60" fill="#64748b" font-size="22" text-anchor="middle">figure pas en vraie grandeur</text>
  </svg>`,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La diagonale du carré",
      sorte: "defi",
      question: `Un carré a des côtés de <b>1 m</b>.<br><br>Combien mesure sa <b>diagonale</b> ? Et peux-tu écrire ce nombre <b>exactement</b> avec des chiffres après la virgule ?`,
      reponse: `d² = 1² + 1² = 2, donc d = <span class="big">√2 ≈ 1,414 m</span>.<br>Ses chiffres après la virgule ne s'arrêtent jamais, et ils ne forment jamais un motif qui revient. Selon la légende, cette découverte a fait scandale chez les élèves de Pythagore !`,
      consigne: "Combien mesure la diagonale d'un carré de 1 m de côté ?",
      verification: {"type":"qcm","choix":["Exactement 1,5 m","Exactement 2 m","√2 m, environ 1,414 m"],"bonne":2},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Carré de côté 1 et sa diagonale">
  <rect x="110" y="80" width="260" height="260" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M110 340 L370 80" stroke="#d97706" stroke-width="5" fill="none" stroke-linecap="round"/>
  <rect x="110" y="310" width="30" height="30" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/>
  <text x="240" y="385" fill="#1e293b" font-size="30" text-anchor="middle">1 m</text>
  <text x="85" y="215" fill="#1e293b" font-size="30" text-anchor="end">1 m</text>
  <text x="255" y="190" fill="#d97706" font-size="34">?</text>
  </svg>`,
    },
  ],
};

export default enigmes;
