// Énigmes à projeter — 6e, notion aire_longueur. Migrées le 19/11/2026
// depuis public/enigmes/longueurs-6e.html (fond blanc, lignes d'écriture).
import type { ProblemesNotion } from "../types";

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "aire_longueur",
  titre: "Énigmes sur les longueurs",
  description: "Fourmis et crayon, qui est le plus grand, grillage, tours de piste, piège de Tom, tour de roue.",
  problemes: [
    {
      tag: "Énigme 1 · Sur la table",
      titre: "Les fourmis et le crayon",
      question: `Un crayon mesure <b>18 cm</b>. Une fourmi mesure <b>6 mm</b>.<br><br>Les fourmis marchent en file, l'une derrière l'autre. <b>Combien de fourmis</b> pour faire la longueur du crayon ?`,
      reponse: `D'abord, la même unité : 18 cm = 180 mm.<br>180 ÷ 6 = 30. Il faut <span class="big">30 fourmis</span>.`,
      consigne: "Combien faut-il de fourmis ?",
      verification: {"type":"courte","attendus":["30"],"unite":"fourmis"},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Un crayon de 18 cm et une file de fourmis">
  <rect x="40" y="140" width="340" height="50" fill="#d97706" fill-opacity=".25" stroke="#d97706" stroke-width="4"/>
  <path d="M380 140 L440 165 L380 190" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="#d97706"/>
  <path d="M425 159 L440 165 L425 171" stroke="#1e293b" stroke-width="4" fill="none"/>
  <text x="240" y="120" fill="#d97706" font-size="30" text-anchor="middle">18 cm</text>
  <ellipse cx="60" cy="262" rx="7" ry="6" fill="#1e293b"/><ellipse cx="73" cy="262" rx="9" ry="7" fill="#1e293b"/><ellipse cx="100" cy="262" rx="7" ry="6" fill="#1e293b"/><ellipse cx="113" cy="262" rx="9" ry="7" fill="#1e293b"/><ellipse cx="140" cy="262" rx="7" ry="6" fill="#1e293b"/><ellipse cx="153" cy="262" rx="9" ry="7" fill="#1e293b"/><ellipse cx="180" cy="262" rx="7" ry="6" fill="#1e293b"/><ellipse cx="193" cy="262" rx="9" ry="7" fill="#1e293b"/><ellipse cx="220" cy="262" rx="7" ry="6" fill="#1e293b"/><ellipse cx="233" cy="262" rx="9" ry="7" fill="#1e293b"/><ellipse cx="260" cy="262" rx="7" ry="6" fill="#1e293b"/><ellipse cx="273" cy="262" rx="9" ry="7" fill="#1e293b"/>
  <text x="310" y="270" fill="#64748b" font-size="30">…</text>
  <text x="80" y="310" fill="#1e293b" font-size="24" text-anchor="middle">6 mm</text>
  <text x="240" y="370" fill="#be123c" font-size="32" text-anchor="middle">? fourmis</text>
  </svg>`,
    },
    {
      tag: "Énigme 2 · Dans la cour",
      titre: "Qui est le plus grand ?",
      question: `Noé mesure <b>1,45 m</b>. Lina mesure <b>139 cm</b>. Sam mesure <b>1 m 42 cm</b>.<br><br><b>Qui est le plus grand ?</b> Et qui est le plus petit ?`,
      reponse: `Tout en centimètres : Noé 145 cm, Lina 139 cm, Sam 142 cm.<br><span class="big">Noé est le plus grand</span>, Lina est la plus petite.`,
      consigne: "Qui est le plus grand ?",
      verification: {"type":"qcm","choix":["Sam","Lina","Noé"],"bonne":2},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Trois enfants de tailles presque égales">
  <path d="M30 340 L450 340" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/>
  <circle cx="100" cy="80.5" r="16" stroke="#d97706" stroke-width="4" fill="none"/><path d="M100 96.5 L100 194.5 M70 129.5 L130 129.5 M100 194.5 L76 340 M100 194.5 L124 340" stroke="#d97706" stroke-width="4" stroke-linecap="round" fill="none"/><text x="100" y="372" fill="#d97706" font-size="24" text-anchor="middle">Noé</text><text x="100" y="402" fill="#1e293b" font-size="20" text-anchor="middle">1,45 m</text><circle cx="240" cy="91.9" r="16" stroke="#1d4ed8" stroke-width="4" fill="none"/><path d="M240 107.9 L240 205.9 M210 140.9 L270 140.9 M240 205.9 L216 340 M240 205.9 L264 340" stroke="#1d4ed8" stroke-width="4" stroke-linecap="round" fill="none"/><text x="240" y="372" fill="#1d4ed8" font-size="24" text-anchor="middle">Lina</text><text x="240" y="402" fill="#1e293b" font-size="20" text-anchor="middle">139 cm</text><circle cx="380" cy="86.2" r="16" stroke="#be123c" stroke-width="4" fill="none"/><path d="M380 102.2 L380 200.2 M350 135.2 L410 135.2 M380 200.2 L356 340 M380 200.2 L404 340" stroke="#be123c" stroke-width="4" stroke-linecap="round" fill="none"/><text x="380" y="372" fill="#be123c" font-size="24" text-anchor="middle">Sam</text><text x="380" y="402" fill="#1e293b" font-size="20" text-anchor="middle">1 m 42 cm</text>
  </svg>`,
    },
    {
      tag: "Énigme 3 · Au jardin",
      titre: "Le grillage",
      question: `Un jardin a la forme d'un rectangle de <b>12 m</b> sur <b>7 m</b>. Mamie veut mettre un grillage tout autour.<br><br>Elle a <b>35 m</b> de grillage. <b>Est-ce assez ?</b>`,
      reponse: `Le tour du jardin : 12 + 7 + 12 + 7 = 38 m.<br>38 m, c'est plus que 35 m : <span class="big">non, il manque 3 m</span>.`,
      consigne: "35 m de grillage, est-ce assez ?",
      verification: {"type":"qcm","choix":["Non, il manque 3 m","Oui, c'est assez","Non, il manque 7 m"],"bonne":0},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Jardin rectangulaire de 12 m sur 7 m">
  <rect x="30" y="100" width="380" height="222" fill="#1d4ed8" fill-opacity=".08" stroke="#1e293b" stroke-width="4" stroke-dasharray="4 8"/>
  <circle cx="140" cy="200" r="28" fill="#1d4ed8" fill-opacity=".35"/><circle cx="330" cy="250" r="22" fill="#1d4ed8" fill-opacity=".35"/>
  <text x="220" y="85" fill="#1e293b" font-size="30" text-anchor="middle">12 m</text>
  <text x="420" y="222" fill="#1e293b" font-size="30">7 m</text>
  <text x="240" y="385" fill="#be123c" font-size="28" text-anchor="middle">35 m de grillage : assez ?</text>
  </svg>`,
    },
    {
      tag: "Énigme 4 · Au stade",
      titre: "Les tours de piste",
      question: `Un tour de piste mesure <b>400 m</b>. Inès veut courir <b>2 km</b>.<br><br><b>Combien de tours</b> doit-elle faire ?`,
      reponse: `D'abord, la même unité : 2 km = 2 000 m.<br>400 + 400 + 400 + 400 + 400 = 2 000. Elle fait <span class="big">5 tours</span>.`,
      consigne: "Combien de tours doit faire Inès ?",
      verification: {"type":"courte","attendus":["5"],"unite":"tours"},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Une piste d'athlétisme">
  <rect x="50" y="110" width="380" height="200" rx="100" fill="none" stroke="#be123c" stroke-width="22" stroke-opacity=".35"/>
  <rect x="50" y="110" width="380" height="200" rx="100" fill="none" stroke="#1e293b" stroke-width="3"/>
  <path d="M240 98 L240 122" stroke="#1e293b" stroke-width="4"/>
  <circle cx="300" cy="110" r="10" fill="#d97706"/>
  <text x="240" y="200" fill="#1e293b" font-size="28" text-anchor="middle">1 tour = 400 m</text>
  <text x="240" y="245" fill="#be123c" font-size="28" text-anchor="middle">2 km = ? tours</text>
  </svg>`,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le calcul de Tom",
      sorte: "piege",
      question: `Tom écrit : <b>3 m + 40 cm = 43 cm</b>.<br><br><b>A-t-il raison ?</b> Sinon, quel est le bon résultat ?`,
      reponse: `Non ! 3 m, c'est 300 cm.<br>300 cm + 40 cm = <span class="big">340 cm, soit 3,40 m</span>.<br>On n'ajoute jamais des mètres et des centimètres sans convertir.`,
      consigne: "Quel est le bon résultat de 3 m + 40 cm, en centimètres ?",
      verification: {"type":"courte","attendus":["340"],"unite":"cm"},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Le calcul de Tom et un mètre ruban">
  <text x="240" y="130" fill="#1e293b" font-size="42" text-anchor="middle">3 m + 40 cm</text>
  <text x="240" y="200" fill="#be123c" font-size="42" text-anchor="middle">= 43 cm ?</text>
  <rect x="30" y="260" width="420" height="20" fill="#d97706" fill-opacity=".3" stroke="#d97706" stroke-width="2"/>
  <path d="M40 270 L40 300" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><text x="40" y="330" fill="#1e293b" font-size="22" text-anchor="middle">0 m</text><path d="M140 270 L140 300" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><text x="140" y="330" fill="#1e293b" font-size="22" text-anchor="middle">1 m</text><path d="M240 270 L240 300" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><text x="240" y="330" fill="#1e293b" font-size="22" text-anchor="middle">2 m</text><path d="M340 270 L340 300" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><text x="340" y="330" fill="#1e293b" font-size="22" text-anchor="middle">3 m</text><path d="M440 270 L440 300" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><text x="440" y="330" fill="#1e293b" font-size="22" text-anchor="middle">4 m</text>
  <path d="M340 255 L340 240 L380 240 L380 255" stroke="#1d4ed8" stroke-width="3" fill="none"/>
  <text x="360" y="232" fill="#1d4ed8" font-size="20" text-anchor="middle">40 cm</text>
  </svg>`,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Un tour de roue",
      sorte: "defi",
      question: `La roue d'un vélo a un <b>diamètre de 70 cm</b>.<br><br>Quand la roue fait <b>un tour complet</b>, de combien le vélo avance-t-il ? (On prend <b>π ≈ 3,14</b>.)`,
      reponse: `Le vélo avance de la longueur du cercle : π × diamètre.<br>3,14 × 70 = 219,8. Il avance d'environ <span class="big">220 cm, soit 2,20 m</span>.`,
      consigne: "De combien de centimètres le vélo avance-t-il, environ ?",
      verification: {"type":"courte","attendus":["220","219,8","219.8"],"unite":"cm"},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Une roue de 70 cm de diamètre qui roule sur le sol">
  <circle cx="80" cy="200" r="50" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M80 150 L80 250 M30 200 L130 200 M45 165 L115 235 M115 165 L45 235" stroke="#64748b" stroke-width="2"/>
  <path d="M80 150 L80 250" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
  <text x="150" y="160" fill="#d97706" font-size="26">70 cm</text>
  <path d="M20 250 L460 250" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/>
  <path d="M80 280 L394 280" stroke="#be123c" stroke-width="4" stroke-dasharray="12 8"/>
  <path d="M380 270 L395 280 L380 290" stroke="#be123c" stroke-width="4" fill="none"/>
  <circle cx="394" cy="200" r="50" stroke="#1e293b" stroke-width="2" stroke-dasharray="6 8" fill="none"/>
  <text x="237" y="325" fill="#be123c" font-size="28" text-anchor="middle">1 tour = ? cm</text>
  </svg>`,
    },
  ],
};

export default problemes;
