// Énigmes à projeter — 4e, notion prop_pourcentages (appliquer un pourcentage,
// de tête, coefficient multiplicateur, retrouver un pourcentage, piège
// +20 % puis −20 %, défi de deux hausses). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;

// 25 élèves en grille 5 × 5.
const classe = () => {
  let s = "";
  for (let i = 0; i < 5; i++)
    for (let j = 0; j < 5; j++) {
      const x = 100 + 70 * j;
      const y = 95 + 55 * i;
      s += `<circle cx="${x}" cy="${y}" r="10" fill="${C.bleu}" fill-opacity=".35" stroke="${C.bleu}" stroke-width="2.5"/>`;
      s += `<path d="M${x - 14} ${y + 32} Q${x} ${y + 6} ${x + 14} ${y + 32}" stroke="${C.bleu}" stroke-width="2.5" fill="none"/>`;
    }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une classe de 25 élèves ; 36 % font du sport en club">
  <text x="240" y="50" fill="${C.craie}" font-size="28" text-anchor="middle">25 élèves ⚽</text>
  ${s}
  <text x="240" y="385" fill="${C.rose}" font-size="28" text-anchor="middle">36 % en club : combien ?</text>
  </svg>`;
};

// Le sentier : 18 km = 380 px, x = 50 + 3,8 × pourcentage.
const sentier = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un sentier de 18 km ; le randonneur en a fait 30 %">
  <path d="M30 250 L150 120 L210 170 L300 70 L450 250" stroke="${C.pale}" stroke-width="3" fill="${C.pale}" fill-opacity=".15" stroke-linejoin="round"/>
  <path d="M50 320 L430 320" ${S}/>
  <path d="M50 305 L50 335 M430 305 L430 335" ${S} stroke-width="3"/>
  <path d="M50 320 L164 320" stroke="${C.rose}" stroke-width="8" stroke-linecap="round"/>
  <path d="M164 305 L164 335" stroke="${C.rose}" stroke-width="3"/>
  <text x="50" y="370" fill="${C.craie}" font-size="22" text-anchor="middle">0 km</text>
  <text x="420" y="370" fill="${C.craie}" font-size="22" text-anchor="middle">18 km</text>
  <text x="164" y="295" fill="${C.rose}" font-size="24" text-anchor="middle">30 %</text>
  <text x="250" y="405" fill="${C.pale}" font-size="20" text-anchor="middle">déjà parcouru = ? km</text>
  <text x="300" y="60" font-size="34" text-anchor="middle">⛰️</text>
  </svg>`;

const velo = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un vélo à 240 euros, soldé à moins 25 %">
  <text x="160" y="220" font-size="110" text-anchor="middle">🚲</text>
  <rect x="300" y="90" width="150" height="70" rx="12" fill="${C.jaune}" fill-opacity=".2" stroke="${C.jaune}" stroke-width="4"/>
  <text x="375" y="138" fill="${C.jaune}" font-size="34" text-anchor="middle">240 €</text>
  <circle cx="375" cy="235" r="52" fill="${C.rose}" fill-opacity=".15" stroke="${C.rose}" stroke-width="4"/>
  <text x="375" y="247" fill="${C.rose}" font-size="32" text-anchor="middle">−25 %</text>
  <text x="240" y="360" fill="${C.craie}" font-size="30" text-anchor="middle">nouveau prix = ? €</text>
  </svg>`;

// Les flamants : barres au bon rapport, 0,4 px par oiseau.
const flamants = () => `<svg viewBox="0 0 480 420" role="img" aria-label="800 flamants l'an dernier, 920 cette année">
  <text x="240" y="60" font-size="40" text-anchor="middle">🦩</text>
  <text x="60" y="130" fill="${C.pale}" font-size="22">l'an dernier</text>
  <rect x="60" y="145" width="320" height="50" rx="6" fill="${C.bleu}" fill-opacity=".3" stroke="${C.bleu}" stroke-width="3"/>
  <text x="220" y="179" fill="${C.bleu}" font-size="26" text-anchor="middle">800</text>
  <text x="60" y="250" fill="${C.pale}" font-size="22">cette année</text>
  <rect x="60" y="265" width="368" height="50" rx="6" fill="${C.rose}" fill-opacity=".3" stroke="${C.rose}" stroke-width="3"/>
  <text x="244" y="299" fill="${C.rose}" font-size="26" text-anchor="middle">920</text>
  <text x="240" y="375" fill="${C.jaune}" font-size="28" text-anchor="middle">hausse de ? %</text>
  </svg>`;

const casque = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un casque à 150 euros : plus 20 %, puis moins 20 %">
  <text x="240" y="85" font-size="56" text-anchor="middle">🎧</text>
  <rect x="20" y="160" width="120" height="64" rx="10" ${S} stroke-width="3"/>
  <text x="80" y="203" fill="${C.craie}" font-size="30" text-anchor="middle">150 €</text>
  <rect x="180" y="160" width="120" height="64" rx="10" ${S} stroke-width="3"/>
  <text x="240" y="203" fill="${C.craie}" font-size="30" text-anchor="middle">? €</text>
  <rect x="340" y="160" width="120" height="64" rx="10" ${S} stroke-width="3"/>
  <text x="400" y="203" fill="${C.craie}" font-size="30" text-anchor="middle">? €</text>
  <path d="M142 192 L176 192 M166 182 L176 192 L166 202" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <path d="M302 192 L336 192 M326 182 L336 192 L326 202" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <text x="160" y="265" fill="${C.rose}" font-size="24" text-anchor="middle">+20 %</text>
  <text x="320" y="265" fill="${C.bleu}" font-size="24" text-anchor="middle">−20 %</text>
  <text x="240" y="350" fill="${C.pale}" font-size="24" text-anchor="middle">Nina pense revenir à 150 €</text>
  </svg>`;

const bacteries = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Des bactéries : plus 10 % après 1 heure, puis encore plus 10 % après 2 heures">
  <text x="240" y="80" font-size="50" text-anchor="middle">🔬</text>
  <circle cx="80" cy="200" r="50" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="3"/>
  <text x="80" y="208" fill="${C.bleu}" font-size="22" text-anchor="middle">départ</text>
  <circle cx="240" cy="200" r="50" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="3"/>
  <text x="240" y="208" fill="${C.bleu}" font-size="22" text-anchor="middle">1 h</text>
  <circle cx="400" cy="200" r="50" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="3"/>
  <text x="400" y="208" fill="${C.bleu}" font-size="22" text-anchor="middle">2 h</text>
  <path d="M134 200 L184 200 M174 190 L184 200 L174 210" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <path d="M294 200 L344 200 M334 190 L344 200 L334 210" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <text x="160" y="290" fill="${C.rose}" font-size="24" text-anchor="middle">+10 %</text>
  <text x="320" y="290" fill="${C.rose}" font-size="24" text-anchor="middle">+10 %</text>
  <text x="240" y="370" fill="${C.jaune}" font-size="28" text-anchor="middle">en tout : + ? %</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "prop_pourcentages",
  titre: "Énigmes sur les pourcentages",
  description: "Le sport en club, la randonnée, le vélo soldé, les flamants, le piège du casque, le défi des bactéries.",
  problemes: [
    {
      tag: "Énigme 1 · Le sport en club",
      titre: "Qui fait du sport ?",
      question: `Dans la classe de Yanis, il y a <b>25 élèves</b>.<br><b>36 %</b> d'entre eux font du sport en club.<br><br><b>Combien</b> d'élèves font du sport en club ?`,
      reponse: `36 % de 25, c'est 25 × 36 ÷ 100 = 900 ÷ 100 = 9.<br>Autre façon : 1 élève sur 25, c'est 4 %. Donc 36 %, c'est 36 ÷ 4 = 9 élèves.<br><span class="big">9 élèves</span> font du sport en club.`,
      consigne: "Combien d'élèves font du sport en club ?",
      verification: { type: "courte", attendus: ["9"], unite: "élèves" },
      dessin: classe(),
    },
    {
      tag: "Énigme 2 · En randonnée",
      titre: "Le sentier des Hauts",
      question: `Sacha fait une randonnée de <b>18 km</b> dans les Hauts de La Réunion.<br>Il a déjà parcouru <b>30 %</b> du sentier.<br><br>Calcule <b>de tête</b> : combien de kilomètres a-t-il faits ?`,
      reponse: `10 % de 18 km : on divise par 10, ça fait 1,8 km.<br>30 %, c'est 3 fois 10 % : 3 × 1,8 = 5,4.<br>Sacha a fait <span class="big">5,4 km</span>.`,
      consigne: "Combien de kilomètres Sacha a-t-il faits ?",
      verification: { type: "qcm", choix: ["3 km", "6 km", "5,4 km"], bonne: 2 },
      dessin: sentier(),
    },
    {
      tag: "Énigme 3 · Les soldes",
      titre: "Le vélo soldé",
      question: `Un vélo coûte <b>240 €</b>.<br>Pendant les soldes, son prix <b>baisse de 25 %</b>.<br><br>Par quel <b>coefficient</b> multiplier le prix ? Quel est le <b>nouveau prix</b> ?`,
      reponse: `Baisser de 25 %, c'est garder 100 % − 25 % = 75 %.<br>Le coefficient multiplicateur est 0,75.<br>240 × 0,75 = 180. Le nouveau prix est <span class="big">180 €</span>.<br>Vérification : 25 % de 240, c'est 60, et 240 − 60 = 180.`,
      consigne: "Quel est le nouveau prix du vélo ?",
      verification: { type: "courte", attendus: ["180"], unite: "€" },
      dessin: velo(),
    },
    {
      tag: "Énigme 4 · Les oiseaux du lac",
      titre: "Les flamants",
      question: `L'an dernier, on a compté <b>800 flamants</b> sur un lac.<br>Cette année, on en compte <b>920</b>.<br><br>De <b>quel pourcentage</b> leur nombre a-t-il augmenté ?`,
      reponse: `La hausse : 920 − 800 = 120 flamants.<br>On la compare au départ : 120 ÷ 800 = 0,15 = 15 %.<br>Autre façon : 920 ÷ 800 = 1,15, coefficient d'une hausse de 15 %.<br>Le nombre a augmenté de <span class="big">15 %</span>.`,
      consigne: "De quel pourcentage le nombre de flamants a-t-il augmenté ?",
      verification: { type: "courte", attendus: ["15"], unite: "%" },
      dessin: flamants(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Aller et retour ?",
      sorte: "piege",
      question: `Un casque audio coûte <b>150 €</b>.<br>Son prix <b>augmente de 20 %</b>, puis il <b>baisse de 20 %</b>.<br>Nina dit : « on revient à 150 € ».<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! Hausse : 150 × 1,2 = 180 €.<br>Baisse : 180 × 0,8 = 144 €.<br>Le prix final est <span class="big">144 €</span>.<br>Les 20 % de la baisse se calculent sur 180 € (36 €), pas sur 150 € (30 €).<br>En tout : 1,2 × 0,8 = 0,96, une baisse de 4 %.`,
      consigne: "Quel est le prix final du casque ?",
      verification: { type: "qcm", choix: ["150 €", "144 €", "156 €"], bonne: 1 },
      dessin: casque(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Deux hausses de suite",
      sorte: "defi",
      question: `En sciences, une culture de bactéries grossit de <b>10 % chaque heure</b>.<br><br>Après <b>2 heures</b>, de <b>combien de pourcents</b> a-t-elle grossi en tout ?`,
      reponse: `Chaque heure, on multiplie par 1,1.<br>En 2 heures : 1,1 × 1,1 = 1,21.<br>Multiplier par 1,21, c'est une hausse de <span class="big">21 %</span>, pas de 20 %.<br>Exemple : 1 000 bactéries, puis 1 100, puis 1 210.`,
      consigne: "Après 2 heures, de combien de pourcents la culture a-t-elle grossi ?",
      verification: { type: "qcm", choix: ["21 %", "20 %", "11 %"], bonne: 0 },
      dessin: bacteries(),
    },
  ],
};

export default problemes;
