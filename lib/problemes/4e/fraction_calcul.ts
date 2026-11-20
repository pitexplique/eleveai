// Énigmes à projeter — 4e, notion fraction_calcul (additionner avec des
// dénominateurs différents, multiplier, diviser par une fraction, fraction
// d'une quantité, piège 1/2 + 1/3 = 2/5, défi des livres prêtés). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac, svgFrac } from "../outils";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const NB = " ";

// Le gâteau : disque de rayon 140, centre (240, 210).
// Noé : un quart (de −90° à 0°). Lila : un tiers (de 0° à 120°).
// Point à 120° : (240 + 140 cos 120°, 210 + 140 sin 120°) = (170 ; 331,24).
const gateau = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un gâteau : Noé en mange un quart, Lila un tiers, les deux parts côte à côte">
  <circle cx="240" cy="210" r="140" ${S}/>
  <path d="M240 210 L240 70 A140 140 0 0 1 380 210 Z" fill="${C.jaune}" fill-opacity=".35" stroke="${C.jaune}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M240 210 L380 210 A140 140 0 0 1 170 331.24 Z" fill="${C.bleu}" fill-opacity=".3" stroke="${C.bleu}" stroke-width="4" stroke-linejoin="round"/>
  ${svgFrac(300, 150, 1, 4, C.jaune, 28)}
  ${svgFrac(285, 270, 1, 3, C.bleu, 28)}
  <text x="70" y="70" font-size="40">🎂</text>
  <text x="240" y="395" fill="${C.pale}" font-size="22" text-anchor="middle">Noé en jaune, Lila en bleu</text>
  </svg>`;

// Le terrain : 4 bandes de 90 px ; le potager en couvre 3.
const terrain = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un terrain en 4 bandes égales ; le potager occupe 3 bandes ; les tomates occupent deux tiers du potager">
  <text x="240" y="60" fill="${C.craie}" font-size="26" text-anchor="middle">le terrain</text>
  <rect x="60" y="90" width="270" height="220" fill="${C.pale}" fill-opacity=".25"/>
  <rect x="60" y="90" width="360" height="220" ${S}/>
  <path d="M150 90 L150 310 M240 90 L240 310 M330 90 L330 310" stroke="${C.craie}" stroke-width="2.5" stroke-dasharray="8 6"/>
  <text x="195" y="190" fill="${C.craie}" font-size="24" text-anchor="middle">potager</text>
  ${svgFrac(195, 235, 3, 4, C.craie, 28)}
  <text x="375" y="215" font-size="34" text-anchor="middle">🌼</text>
  <text x="240" y="365" fill="${C.rose}" font-size="24" text-anchor="middle">🍅 tomates${NB}: deux tiers du potager</text>
  </svg>`;

// L'aquarium de 6 L et le verre doseur de 3/4 L (pas à l'échelle).
const aquarium = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un aquarium de 6 litres et un verre doseur de trois quarts de litre">
  <rect x="40" y="110" width="250" height="200" rx="8" ${S}/>
  <rect x="44" y="150" width="242" height="156" fill="${C.bleu}" fill-opacity=".2"/>
  <text x="120" y="230" font-size="40">🐠</text>
  <text x="215" y="270" font-size="30">🐟</text>
  <text x="165" y="90" fill="${C.craie}" font-size="30" text-anchor="middle">6 L</text>
  <path d="M340 190 L350 320 L420 320 L430 190" ${S}/>
  <path d="M344 240 L426 240" stroke="${C.bleu}" stroke-width="3"/>
  <rect x="347" y="241" width="76" height="77" fill="${C.bleu}" fill-opacity=".2"/>
  ${svgFrac(385, 145, 3, 4, C.jaune, 30)}
  <text x="430" y="152" fill="${C.jaune}" font-size="26">L</text>
  <text x="240" y="380" fill="${C.pale}" font-size="20" text-anchor="middle">pas à l'échelle</text>
  </svg>`;

// Le trajet : 360 km = 360 px (x de 60 à 420), 8 parts de 45 px ; 5 faites.
const trajet = () => {
  let traits = "";
  for (let k = 1; k < 8; k++) traits += `M${60 + 45 * k} 180 L${60 + 45 * k} 240 `;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un trajet de 360 km coupé en 8 parts égales ; 5 parts sont déjà parcourues">
  <text x="240" y="80" font-size="44" text-anchor="middle">🚆</text>
  <rect x="60" y="180" width="225" height="60" fill="${C.jaune}" fill-opacity=".35"/>
  <rect x="60" y="180" width="360" height="60" ${S}/>
  <path d="${traits}" stroke="${C.craie}" stroke-width="2.5"/>
  <text x="60" y="290" fill="${C.craie}" font-size="22" text-anchor="middle">départ</text>
  <text x="420" y="290" fill="${C.craie}" font-size="22" text-anchor="middle">arrivée</text>
  <text x="240" y="150" fill="${C.craie}" font-size="26" text-anchor="middle">360 km</text>
  <text x="172" y="340" fill="${C.jaune}" font-size="24" text-anchor="middle">déjà fait</text>
  <text x="352" y="340" fill="${C.rose}" font-size="24" text-anchor="middle">reste${NB}?</text>
  </svg>`;
};

// Le piège : deux bandes de 300 px ; la moitié (150 px) et le tiers (100 px).
const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Lucas écrit : un demi plus un tiers égale deux cinquièmes">
  ${svgFrac(110, 90, 1, 2, C.craie, 34)}
  <text x="170" y="112" fill="${C.craie}" font-size="34" text-anchor="middle">+</text>
  ${svgFrac(230, 90, 1, 3, C.craie, 34)}
  <text x="290" y="112" fill="${C.craie}" font-size="34" text-anchor="middle">=</text>
  ${svgFrac(350, 90, 2, 5, C.rose, 34)}
  <text x="410" y="112" fill="${C.rose}" font-size="34" text-anchor="middle">?</text>
  <rect x="90" y="200" width="150" height="50" fill="${C.jaune}" fill-opacity=".35"/>
  <rect x="90" y="200" width="300" height="50" ${S}/>
  <path d="M240 200 L240 250" stroke="${C.craie}" stroke-width="2.5"/>
  <rect x="90" y="290" width="100" height="50" fill="${C.bleu}" fill-opacity=".3"/>
  <rect x="90" y="290" width="300" height="50" ${S}/>
  <path d="M190 290 L190 340 M290 290 L290 340" stroke="${C.craie}" stroke-width="2.5"/>
  <text x="240" y="395" fill="${C.pale}" font-size="22" text-anchor="middle">la moitié, puis le tiers</text>
  </svg>`;

// Les livres : bande de 360 px en 4 quarts de 90 px.
// Lundi : 1 quart (rose). Mardi : le tiers des 3 quarts restants = 1 quart (jaune).
const livres = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une bande en 4 parts : lundi une part, mardi une part, il reste 2 parts qui font 18 livres">
  <text x="240" y="70" font-size="40" text-anchor="middle">📚</text>
  <text x="240" y="130" fill="${C.craie}" font-size="24" text-anchor="middle">tous les livres${NB}: ?</text>
  <rect x="60" y="170" width="90" height="70" fill="${C.rose}" fill-opacity=".3"/>
  <rect x="150" y="170" width="90" height="70" fill="${C.jaune}" fill-opacity=".35"/>
  <rect x="240" y="170" width="180" height="70" fill="${C.bleu}" fill-opacity=".2"/>
  <rect x="60" y="170" width="360" height="70" ${S}/>
  <path d="M150 170 L150 240 M240 170 L240 240 M330 170 L330 240" stroke="${C.craie}" stroke-width="2.5"/>
  <text x="105" y="285" fill="${C.rose}" font-size="22" text-anchor="middle">lundi</text>
  <text x="195" y="285" fill="${C.jaune}" font-size="22" text-anchor="middle">mardi</text>
  <path d="M240 300 L240 315 L420 315 L420 300" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <text x="330" y="355" fill="${C.bleu}" font-size="24" text-anchor="middle">il reste 18 livres</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "fraction_calcul",
  titre: "Énigmes sur le calcul avec les fractions",
  description: "Le gâteau partagé, le potager, l'aquarium, le trajet en train, le piège de Lucas, le défi des livres prêtés.",
  problemes: [
    {
      tag: "Énigme 1 · L'anniversaire",
      titre: "Le gâteau partagé",
      question: `Noé mange ${frac(1, 4)} du gâteau.<br>Lila mange ${frac(1, 3)} du même gâteau.<br><br>Quelle <b>fraction du gâteau</b> ont-ils mangée à eux deux ?`,
      reponse: `On cherche ${frac(1, 4)} + ${frac(1, 3)}. Il faut le même dénominateur : 12.<br>${frac(1, 4)} = ${frac(3, 12)} et ${frac(1, 3)} = ${frac(4, 12)}.<br>${frac(3, 12)} + ${frac(4, 12)} = <span class="big">${frac(7, 12)} du gâteau</span>.<br>Bonus : il en reste ${frac(5, 12)}.`,
      consigne: "Quelle fraction du gâteau Noé et Lila ont-ils mangée ? (écris par exemple 2/9)",
      verification: { type: "courte", attendus: ["7/12"] },
      dessin: gateau(),
    },
    {
      tag: "Énigme 2 · Au jardin",
      titre: "Les tomates du potager",
      question: `Un potager occupe ${frac(3, 4)} d'un terrain.<br>Les tomates occupent ${frac(2, 3)} du potager.<br><br>Quelle <b>fraction du terrain</b> occupent les tomates ?`,
      reponse: `Prendre ${frac(2, 3)} de ${frac(3, 4)}, c'est multiplier.<br>${frac(2, 3)} × ${frac(3, 4)} = ${frac("2 × 3", "3 × 4")} = ${frac(6, 12)}.<br>On simplifie : les tomates occupent <span class="big">${frac(1, 2)} du terrain</span>.<br>Sur le dessin : 2 bandes sur 3 du potager, c'est 2 bandes sur 4.`,
      consigne: "Quelle fraction du terrain occupent les tomates ?",
      verification: { type: "qcm", choix: ["5/7", "1/2", "2/3"], bonne: 1 },
      dessin: terrain(),
    },
    {
      tag: "Énigme 3 · Les poissons",
      titre: "Remplir l'aquarium",
      question: `Yanis remplit un aquarium de <b>6 L</b>.<br>Il utilise un verre doseur de ${frac(3, 4)} L.<br><br>Combien de <b>verres pleins</b> doit-il verser ?`,
      reponse: `On cherche combien de fois ${frac(3, 4)} L tient dans 6 L : 6 ÷ ${frac(3, 4)}.<br>Diviser par ${frac(3, 4)}, c'est multiplier par son inverse ${frac(4, 3)}.<br>6 × ${frac(4, 3)} = ${frac(24, 3)} = 8. Il verse <span class="big">8 verres</span>.<br>Vérification : 8 × ${frac(3, 4)} = ${frac(24, 4)} = 6 L.`,
      consigne: "Combien de verres pleins Yanis doit-il verser ?",
      verification: { type: "courte", attendus: ["8"], unite: "verres" },
      dessin: aquarium(),
    },
    {
      tag: "Énigme 4 · En voyage",
      titre: "Le trajet en train",
      question: `Un train fait un trajet de <b>360 km</b>.<br>Il a déjà parcouru ${frac(5, 8)} du trajet.<br><br>Combien de <b>kilomètres</b> lui <b>reste-t-il</b> ?`,
      reponse: `Il reste ${frac(3, 8)} du trajet, car ${frac(8, 8)} − ${frac(5, 8)} = ${frac(3, 8)}.<br>Un huitième : 360 ÷ 8 = 45 km.<br>Trois huitièmes : 3 × 45 = 135 km. Il reste <span class="big">135 km</span>.<br>Vérification : 5 × 45 = 225 km faits, et 225 + 135 = 360.`,
      consigne: "Combien de kilomètres reste-t-il au train ?",
      verification: { type: "courte", attendus: ["135"], unite: "km" },
      dessin: trajet(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le calcul de Lucas",
      sorte: "piege",
      question: `Lucas calcule ${frac(1, 2)} + ${frac(1, 3)}.<br>Il ajoute les numérateurs, puis les dénominateurs.<br>Il trouve ${frac(2, 5)}.<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! ${frac(2, 5)} est plus petit que ${frac(1, 2)} : impossible en ajoutant.<br>Il faut le même dénominateur : 6.<br>${frac(1, 2)} = ${frac(3, 6)} et ${frac(1, 3)} = ${frac(2, 6)}.<br>${frac(3, 6)} + ${frac(2, 6)} = <span class="big">${frac(5, 6)}</span>.`,
      consigne: "Combien vaut 1/2 + 1/3 ?",
      verification: { type: "qcm", choix: ["2/5", "2/6", "5/6"], bonne: 2 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les livres prêtés",
      sorte: "defi",
      question: `Lundi, la bibliothèque prête ${frac(1, 4)} de ses livres de contes.<br>Mardi, elle prête ${frac(1, 3)} des livres qui <b>restent</b>.<br>Il reste alors <b>18 livres</b>.<br><br>Combien de livres de contes y avait-il <b>au départ</b> ?`,
      reponse: `Après lundi, il reste ${frac(3, 4)} des livres.<br>Mardi : ${frac(1, 3)} de ${frac(3, 4)} = ${frac(1, 4)} des livres part.<br>Il reste ${frac(3, 4)} − ${frac(1, 4)} = ${frac(2, 4)} = ${frac(1, 2)} des livres : 18 livres.<br>Au départ : 18 × 2 = <span class="big">36 livres</span>.<br>Vérification : 36 ÷ 4 = 9 lundi, reste 27 ; 27 ÷ 3 = 9 mardi, reste 18.`,
      consigne: "Combien de livres de contes y avait-il au départ ?",
      verification: { type: "courte", attendus: ["36"], unite: "livres" },
      dessin: livres(),
    },
  ],
};

export default problemes;
