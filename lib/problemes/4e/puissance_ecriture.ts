// Problèmes à projeter — 4e, notion puissance_ecriture. Migrées le 19/11/2026
// depuis public/enigmes/puissances-4e.html (fond blanc, lignes d'écriture).
import type { ProblemesNotion } from "../types";

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "puissance_ecriture",
  titre: "Problèmes sur les puissances",
  description: "Échiquier, vidéo partagée, (−2)⁴ et −2⁴, fourmi, lumière du Soleil, ranger 2¹⁰ 10³ 3⁶.",
  problemes: [
    {
      tag: "Problème 1 · Une vieille légende",
      titre: "Les grains de l’échiquier",
      question: `Un roi offre une récompense : <b>1 grain de riz</b> sur la 1<sup>re</sup> case, <b>2</b> sur la 2<sup>e</sup>, <b>4</b> sur la 3<sup>e</sup>… À chaque case, on <b>double</b>.<br><br>Combien de grains sur la <b>10<sup>e</sup> case</b> ? Écris-le avec une <b>puissance de 2</b>.`,
      reponse: `Case 1 : 2⁰ = 1. Case 2 : 2¹ = 2. Case 3 : 2² = 4… L'exposant a toujours 1 de moins que le numéro de la case.<br>Case 10 : <span class="big">2⁹ = 512 grains</span>.`,
      consigne: "Combien de grains sur la 10e case ?",
      verification: {"type":"courte","attendus":["512","2^9","2⁹"],"unite":"grains"},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Échiquier : 1, 2, 4, 8, 16 grains, puis la 10e case">
  <rect x="40" y="110" width="80" height="80" fill="none" fill-opacity=".12" stroke="#1e293b" stroke-width="3"/><text x="80" y="162" fill="#d97706" font-size="30" text-anchor="middle">1</text><rect x="40" y="230" width="80" height="80" fill="#1e293b" fill-opacity=".12" stroke="#1e293b" stroke-width="3"/><text x="80" y="282" fill="#64748b" font-size="30" text-anchor="middle">…</text><rect x="120" y="110" width="80" height="80" fill="#1e293b" fill-opacity=".12" stroke="#1e293b" stroke-width="3"/><text x="160" y="162" fill="#d97706" font-size="30" text-anchor="middle">2</text><rect x="120" y="230" width="80" height="80" fill="none" fill-opacity=".12" stroke="#1e293b" stroke-width="3"/><text x="160" y="282" fill="#64748b" font-size="30" text-anchor="middle">…</text><rect x="200" y="110" width="80" height="80" fill="none" fill-opacity=".12" stroke="#1e293b" stroke-width="3"/><text x="240" y="162" fill="#d97706" font-size="30" text-anchor="middle">4</text><rect x="200" y="230" width="80" height="80" fill="#1e293b" fill-opacity=".12" stroke="#1e293b" stroke-width="3"/><text x="240" y="282" fill="#64748b" font-size="30" text-anchor="middle">…</text><rect x="280" y="110" width="80" height="80" fill="#1e293b" fill-opacity=".12" stroke="#1e293b" stroke-width="3"/><text x="320" y="162" fill="#d97706" font-size="30" text-anchor="middle">8</text><rect x="280" y="230" width="80" height="80" fill="none" fill-opacity=".12" stroke="#1e293b" stroke-width="3"/><text x="320" y="282" fill="#64748b" font-size="30" text-anchor="middle">…</text><rect x="360" y="110" width="80" height="80" fill="none" fill-opacity=".12" stroke="#1e293b" stroke-width="3"/><text x="400" y="162" fill="#d97706" font-size="30" text-anchor="middle">16</text><rect x="360" y="230" width="80" height="80" fill="#1e293b" fill-opacity=".12" stroke="#1e293b" stroke-width="3"/><text x="400" y="282" fill="#be123c" font-size="40" text-anchor="middle">?</text>
  <text x="240" y="80" fill="#64748b" font-size="24" text-anchor="middle">cases 1 à 5</text>
  <text x="240" y="350" fill="#64748b" font-size="24" text-anchor="middle">cases 6 à 10</text>
  </svg>`,
    },
    {
      tag: "Problème 2 · Sur les téléphones",
      titre: "La vidéo qui se partage",
      question: `Lundi, tu envoies une vidéo à <b>3 amis</b>. Le lendemain, chacun l'envoie à <b>3 nouveaux amis</b>. Et ainsi de suite, chaque jour.<br><br>Combien de personnes la <b>reçoivent le jeudi</b> ?`,
      reponse: `Lundi : 3. Mardi : 3 × 3 = 9. Mercredi : 3 × 3 × 3 = 27. Jeudi : 3 × 3 × 3 × 3.<br>Jeudi : <span class="big">3⁴ = 81 personnes</span>.`,
      consigne: "Combien de personnes reçoivent la vidéo le jeudi ?",
      verification: {"type":"courte","attendus":["81","3^4","3⁴"],"unite":"personnes"},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Arbre : toi, puis 3 amis, puis 9 amis">
  <path d="M240 60 L100 160" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><path d="M240 60 L240 160" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><path d="M240 60 L380 160" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><path d="M100 160 L55 250" stroke="#64748b" stroke-width="2" fill="none"/><circle cx="55" cy="250" r="9" fill="#1d4ed8"/><path d="M100 160 L100 250" stroke="#64748b" stroke-width="2" fill="none"/><circle cx="100" cy="250" r="9" fill="#1d4ed8"/><path d="M100 160 L145 250" stroke="#64748b" stroke-width="2" fill="none"/><circle cx="145" cy="250" r="9" fill="#1d4ed8"/><path d="M240 160 L195 250" stroke="#64748b" stroke-width="2" fill="none"/><circle cx="195" cy="250" r="9" fill="#1d4ed8"/><path d="M240 160 L240 250" stroke="#64748b" stroke-width="2" fill="none"/><circle cx="240" cy="250" r="9" fill="#1d4ed8"/><path d="M240 160 L285 250" stroke="#64748b" stroke-width="2" fill="none"/><circle cx="285" cy="250" r="9" fill="#1d4ed8"/><path d="M380 160 L335 250" stroke="#64748b" stroke-width="2" fill="none"/><circle cx="335" cy="250" r="9" fill="#1d4ed8"/><path d="M380 160 L380 250" stroke="#64748b" stroke-width="2" fill="none"/><circle cx="380" cy="250" r="9" fill="#1d4ed8"/><path d="M380 160 L425 250" stroke="#64748b" stroke-width="2" fill="none"/><circle cx="425" cy="250" r="9" fill="#1d4ed8"/><circle cx="100" cy="160" r="14" fill="#d97706"/><circle cx="240" cy="160" r="14" fill="#d97706"/><circle cx="380" cy="160" r="14" fill="#d97706"/>
  <circle cx="240" cy="60" r="18" fill="#be123c"/>
  <text x="270" y="50" fill="#be123c" font-size="26">toi</text>
  <text x="20" y="130" fill="#d97706" font-size="22">lundi : 3</text>
  <text x="20" y="295" fill="#1d4ed8" font-size="22">mardi : 9</text>
  <text x="240" y="340" fill="#64748b" font-size="26" text-anchor="middle">mercredi : …</text>
  <text x="240" y="395" fill="#be123c" font-size="32" text-anchor="middle">jeudi : ?</text>
  </svg>`,
    },
    {
      tag: "Problème 3 · Attention au piège",
      titre: "Les faux jumeaux",
      sorte: "piege",
      question: `Voici deux écritures : <b>(−2)⁴</b> et <b>−2⁴</b>. Elles se ressemblent beaucoup.<br><br><b>Sont-elles égales ?</b>`,
      reponse: `(−2)⁴ = (−2) × (−2) × (−2) × (−2) = 16.<br>−2⁴ = −(2 × 2 × 2 × 2) = −16.<br><span class="big">16 ≠ −16</span> : les parenthèses décident du signe !`,
      consigne: "(−2)⁴ et −2⁴ sont-elles égales ?",
      verification: {"type":"qcm","choix":["Oui, les deux valent 16","Non : 16 et −16","Oui, les deux valent −16"],"bonne":1},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="(−2) puissance 4 et −2 puissance 4">
  <text x="240" y="150" fill="#d97706" font-size="78" text-anchor="middle">(−2)⁴</text>
  <text x="240" y="225" fill="#be123c" font-size="48" text-anchor="middle">= ?</text>
  <text x="240" y="320" fill="#1d4ed8" font-size="78" text-anchor="middle">−2⁴</text>
  </svg>`,
    },
    {
      tag: "Problème 4 · Tout petit",
      titre: "La fourmi",
      question: `Une fourmi mesure <b>3 × 10⁻³ m</b>.<br><br>Combien mesure-t-elle en <b>millimètres</b> ?`,
      reponse: `10⁻³ = 0,001. Donc 3 × 10⁻³ m = 0,003 m.<br>1 m = 1 000 mm, donc la fourmi mesure <span class="big">3 mm</span>.<br>Un exposant négatif ne donne pas un nombre négatif : il donne un nombre <b>très petit</b>.`,
      consigne: "Combien mesure la fourmi en millimètres ?",
      verification: {"type":"courte","attendus":["3"],"unite":"mm"},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Une fourmi posée sur une règle graduée en millimètres, très agrandie">
  <rect x="20" y="250" width="440" height="100" rx="6" fill="#d97706" fill-opacity=".12" stroke="#d97706" stroke-width="3"/>
  <path d="M40 250 L40 290" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><text x="40" y="325" fill="#1e293b" font-size="24" text-anchor="middle">0</text><path d="M120 250 L120 290" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><text x="120" y="325" fill="#1e293b" font-size="24" text-anchor="middle">1</text><path d="M200 250 L200 290" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><text x="200" y="325" fill="#1e293b" font-size="24" text-anchor="middle">2</text><path d="M280 250 L280 290" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><text x="280" y="325" fill="#1e293b" font-size="24" text-anchor="middle">3</text><path d="M360 250 L360 290" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><text x="360" y="325" fill="#1e293b" font-size="24" text-anchor="middle">4</text><path d="M440 250 L440 290" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/><text x="440" y="325" fill="#1e293b" font-size="24" text-anchor="middle">5</text>
  <text x="445" y="340" fill="#64748b" font-size="22" text-anchor="end">mm</text>
  <path d="M110 215 l-25 30 M140 220 l0 30 M170 215 l25 30" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/>
  <path d="M60 188 q-15 -40 0 -62 M75 186 q10 -40 30 -50" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="3"/>
  <ellipse cx="72" cy="205" rx="32" ry="22" fill="#1e293b"/>
  <ellipse cx="140" cy="205" rx="38" ry="18" fill="#1e293b"/>
  <ellipse cx="220" cy="205" rx="60" ry="30" fill="#1e293b"/>
  <text x="330" y="150" fill="#be123c" font-size="34" text-anchor="middle">? mm</text>
  <text x="240" y="400" fill="#64748b" font-size="20" text-anchor="middle">dessin très agrandi</text>
  </svg>`,
    },
    {
      tag: "Problème 5 · Dans l’espace",
      titre: "La lumière du Soleil",
      question: `La lumière va à <b>3 × 10⁵ km par seconde</b>. Celle du Soleil met environ <b>500 secondes</b> pour arriver jusqu'à nous.<br><br>À quelle <b>distance</b> est le Soleil ? Donne la réponse en <b>notation scientifique</b>.`,
      reponse: `500 × 3 × 10⁵ = 1 500 × 10⁵ = 1,5 × 10³ × 10⁵.<br>Le Soleil est à environ <span class="big">1,5 × 10⁸ km</span>, soit 150 millions de kilomètres.`,
      consigne: "À quelle distance est le Soleil ?",
      verification: {"type":"qcm","choix":["1,5 × 10⁸ km","1,5 × 10⁵ km","15 × 10⁸ km"],"bonne":0},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Le Soleil, la Terre et le rayon de lumière">
  <circle cx="80" cy="210" r="60" fill="#d97706" fill-opacity=".85"/>
  <path d="M80 130 l0 -25 M80 290 l0 25 M140 150 l18 -18 M140 270 l18 18" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
  <circle cx="420" cy="210" r="20" fill="#1d4ed8"/>
  <path d="M150 210 L390 210" stroke="#1e293b" stroke-width="4" stroke-dasharray="14 10" fill="none"/>
  <path d="M375 198 L392 210 L375 222" stroke="#1e293b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="4"/>
  <text x="270" y="190" fill="#1e293b" font-size="26" text-anchor="middle">500 s</text>
  <text x="270" y="260" fill="#be123c" font-size="30" text-anchor="middle">? km</text>
  <text x="80" y="370" fill="#d97706" font-size="24" text-anchor="middle">Soleil</text>
  <text x="420" y="370" fill="#1d4ed8" font-size="24" text-anchor="middle">Terre</text>
  <text x="240" y="60" fill="#64748b" font-size="22" text-anchor="middle">pas à l'échelle</text>
  </svg>`,
    },
    {
      tag: "Problème 6 · Le défi des curieux",
      titre: "Le plus grand des trois",
      sorte: "defi",
      question: `Voici trois nombres : <b>2¹⁰</b>, <b>10³</b> et <b>3⁶</b>.<br><br>Sans calculatrice, <b>range-les</b> du plus petit au plus grand.`,
      reponse: `2¹⁰ = 1 024. 10³ = 1 000. 3⁶ = 729.<br>Donc <span class="big">3⁶ &lt; 10³ &lt; 2¹⁰</span>.<br>Le petit 2 gagne, grâce à son grand exposant !`,
      consigne: "Range 2¹⁰, 10³ et 3⁶ du plus petit au plus grand.",
      verification: {"type":"qcm","choix":["10³ < 2¹⁰ < 3⁶","2¹⁰ < 3⁶ < 10³","3⁶ < 10³ < 2¹⁰"],"bonne":2},
      dessin: `<svg viewBox="0 0 480 420" role="img" aria-label="Trois puissances à ranger">
  <text x="110" y="130" fill="#d97706" font-size="64" text-anchor="middle">2¹⁰</text>
  <text x="240" y="240" fill="#1d4ed8" font-size="64" text-anchor="middle">10³</text>
  <text x="370" y="350" fill="#be123c" font-size="64" text-anchor="middle">3⁶</text>
  <text x="360" y="110" fill="#64748b" font-size="26" text-anchor="middle">… &lt; … &lt; …</text>
  </svg>`,
    },
  ],
};

export default problemes;
