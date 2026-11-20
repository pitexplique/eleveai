// Énigmes à projeter — 4e, notion algo_programmation (la couveuse et sa
// condition au seuil, l'arrosage du stade en « si … sinon » imbriqués, les vies
// du jeu vidéo, le téléphérique de Saint-Denis et sa moyenne, piège du tableau
// de volley qu'on croit échanger, défi de la suite de Syracuse).
// Les programmes sont dessinés en blocs façon Scratch (rectangles pâles).
// Chaque programme a été déroulé pas à pas (tableau des valeurs). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;
// Un bloc façon Scratch : rectangle arrondi pâle (opacité faible), texte craie dessus.
const bloc = (x: number, y: number, w: number, t: string, coul: string, h = 32) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${coul}" fill-opacity=".18" stroke="${coul}" stroke-width="2"/>` +
  txt(x + 10, y + h - 9, t, C.craie, 20, "start");

// La couveuse : le thermomètre à 37 °C et trois conditions possibles.
const couveuse = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une couveuse à 37 degrés et trois programmes A, B, C qui testent la température">
  <text x="70" y="80" font-size="50" text-anchor="middle">🥚</text>
  <rect x="140" y="40" width="300" height="56" rx="14" fill="none" stroke="${C.pale}" stroke-width="3"/>
  ${txt(290, 78, `température${NB}: 37${NB}°C`, C.bleu, 24)}
  ${txt(30, 167, "A", C.jaune, 26)}
  ${bloc(50, 140, 410, "si température &gt; 37 alors chauffer", C.jaune, 38)}
  ${txt(30, 247, "B", C.jaune, 26)}
  ${bloc(50, 220, 410, "si température ≤ 37 alors chauffer", C.jaune, 38)}
  ${txt(30, 327, "C", C.jaune, 26)}
  ${bloc(50, 300, 410, "si température &lt; 37 alors chauffer", C.jaune, 38)}
  ${txt(240, 395, `Chauffage allumé${NB}?`, C.rose, 24)}
  </svg>`;

// L'arrosage du stade : deux « si … sinon » emboîtés, puis la météo de deux jours.
const arrosage = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le programme d'arrosage du stade : si pluie alors durée 0, sinon si température plus de 28 alors durée 20, sinon durée 10 ; lundi sans pluie à 32 degrés, mardi pluie à 33 degrés">
  ${bloc(20, 14, 260, "si pluie = oui alors", C.jaune)}
  ${bloc(50, 50, 230, "mettre durée à 0", C.bleu)}
  ${bloc(20, 86, 100, "sinon", C.jaune)}
  ${bloc(50, 122, 300, "si température &gt; 28 alors", C.jaune)}
  ${bloc(80, 158, 230, "mettre durée à 20", C.bleu)}
  ${bloc(50, 194, 100, "sinon", C.jaune)}
  ${bloc(80, 230, 230, "mettre durée à 10", C.bleu)}
  <text x="420" y="110" font-size="50" text-anchor="middle">🏟️</text>
  ${txt(40, 310, `lundi${NB}: pas de pluie, 32${NB}°C`, C.craie, 22, "start")}
  <text x="420" y="312" font-size="32" text-anchor="middle">☀️</text>
  ${txt(40, 352, `mardi${NB}: pluie, 33${NB}°C`, C.craie, 22, "start")}
  <text x="420" y="354" font-size="32" text-anchor="middle">🌧️</text>
  ${txt(240, 396, `Durée totale${NB}?`, C.rose, 24)}
  </svg>`;

// Les vies du jeu vidéo : cinq blocs à dérouler dans l'ordre.
const vies = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un programme de jeu vidéo en cinq blocs qui modifient les variables vies et bonus">
  <text x="420" y="70" font-size="50" text-anchor="middle">🎮</text>
  ${bloc(30, 40, 330, "mettre vies à 3", C.bleu, 38)}
  ${bloc(30, 96, 330, "ajouter 2 à vies", C.bleu, 38)}
  ${bloc(30, 152, 330, "mettre bonus à vies × 2", C.bleu, 38)}
  ${bloc(30, 208, 330, "ajouter −1 à vies", C.bleu, 38)}
  ${bloc(30, 264, 330, "mettre vies à vies + bonus", C.bleu, 38)}
  ${txt(240, 370, `vies à la fin${NB}?`, C.rose, 26)}
  </svg>`;

// Le téléphérique : le programme de la moyenne, avec un bloc à trouver.
const telepherique = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un programme qui demande 7 fois le nombre de voyageurs du jour, avec un bloc manquant, puis dit total divisé par 7">
  <text x="420" y="70" font-size="50" text-anchor="middle">🚡</text>
  ${bloc(30, 40, 260, "mettre total à 0", C.bleu, 38)}
  ${bloc(30, 96, 200, "répéter 7 fois", C.jaune, 38)}
  ${bloc(60, 152, 390, `demander «${NB}voyageurs du jour${NB}?${NB}»`, C.pale, 38)}
  <rect x="60" y="208" width="300" height="38" rx="9" fill="none" stroke="${C.rose}" stroke-width="3" stroke-dasharray="8 6"/>
  ${txt(210, 235, "?", C.rose, 26)}
  ${bloc(30, 264, 200, "fin de répéter", C.jaune, 38)}
  ${bloc(30, 320, 260, "dire total ÷ 7", C.pale, 38)}
  ${txt(240, 396, `Quel bloc manque${NB}?`, C.rose, 24)}
  </svg>`;

// Le tableau de volley : les scores inversés et le programme de Zoé.
const volley = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau de score : domicile 18, visiteurs 25 ; le programme de Zoé en deux blocs ; Zoé pense afficher 25 – 18">
  <rect x="40" y="30" width="190" height="110" rx="12" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <rect x="250" y="30" width="190" height="110" rx="12" fill="none" stroke="${C.craie}" stroke-width="3"/>
  ${txt(135, 64, "domicile", C.pale, 22)}
  ${txt(345, 64, "visiteurs", C.pale, 22)}
  ${txt(135, 122, "18", C.bleu, 44)}
  ${txt(345, 122, "25", C.bleu, 44)}
  <text x="240" y="196" font-size="36" text-anchor="middle">🏐</text>
  ${bloc(30, 220, 420, "mettre domicile à visiteurs", C.bleu, 38)}
  ${bloc(30, 270, 420, "mettre visiteurs à domicile", C.bleu, 38)}
  <rect x="70" y="330" width="340" height="60" rx="18" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 370, `Zoé${NB}: «${NB}25 – 18${NB}»`, C.rose, 26)}
  </svg>`;

// La suite de Syracuse : boucle « répéter jusqu'à » avec un « si … sinon » dedans.
const syracuse = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le programme de la suite de Syracuse : n part de 6 ; tant que n ne vaut pas 1, si n est pair on le divise par 2, sinon on le remplace par 3 n plus 1, et on ajoute 1 à étapes">
  ${bloc(20, 12, 220, "mettre n à 6", C.bleu)}
  ${bloc(20, 52, 250, "mettre étapes à 0", C.bleu)}
  ${bloc(20, 92, 280, "répéter jusqu'à n = 1", C.jaune)}
  ${bloc(50, 132, 240, "si n est pair alors", C.jaune)}
  ${bloc(80, 172, 220, "mettre n à n ÷ 2", C.bleu)}
  ${bloc(50, 212, 100, "sinon", C.jaune)}
  ${bloc(80, 252, 270, "mettre n à 3 × n + 1", C.bleu)}
  ${bloc(50, 292, 260, "ajouter 1 à étapes", C.bleu)}
  ${bloc(20, 332, 200, "fin de répéter", C.jaune)}
  <text x="420" y="80" font-size="50" text-anchor="middle">🔁</text>
  ${txt(400, 396, `étapes${NB}?`, C.rose, 26)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "algo_programmation",
  titre: "Énigmes sur l'algorithmique et la programmation",
  description: "La couveuse, l'arrosage du stade, les vies du jeu vidéo, le téléphérique, le piège du tableau de volley, le défi de la suite de Syracuse : tester une condition au seuil, suivre un « si … alors … sinon », dérouler une variable, compléter un programme à la Scratch et le corriger.",
  problemes: [
    {
      tag: "Énigme 1 · La couveuse",
      titre: "Le chauffage de la couveuse",
      question: `En SVT, la classe fait éclore des œufs dans une couveuse.<br>Le capteur mesure 37 °C.<br>Trois programmes sont proposés.<br><br>Avec lequel le chauffage s'allume-t-il ?`,
      reponse: `On teste chaque condition avec température = 37.<br>A : 37 > 37 ? Non, 37 n'est pas <b>strictement</b> plus grand que 37. Faux.<br>B : 37 ≤ 37 ? Oui, « inférieur ou égal » accepte l'égalité. Vrai.<br>C : 37 < 37 ? Non. Faux.<br>Le chauffage s'allume avec le programme <span class="big">B</span>.<br>Au seuil exact, seuls ≤ et ≥ sont vrais.`,
      consigne: "À 37 °C, avec quel programme le chauffage s'allume-t-il ?",
      verification: { type: "qcm", choix: ["Programme A", "Programme B", "Programme C"], bonne: 1 },
      dessin: couveuse(),
    },
    {
      tag: "Énigme 2 · Au stade",
      titre: "L'arrosage de la pelouse",
      question: `Chaque soir, un programme choisit la durée d'arrosage de la pelouse du stade.<br>Lundi, il ne pleut pas et il fait 32 °C.<br>Mardi, il pleut et il fait 33 °C.<br><br>Combien de minutes la pelouse est-elle arrosée en tout ces deux soirs ?`,
      reponse: `Lundi : « pluie = oui » est faux. On va dans le premier « sinon ».<br>« 32 > 28 » est vrai : durée = 20 min.<br>Mardi : « pluie = oui » est vrai. Durée = 0 min.<br>Le « sinon » n'est pas lu : la chaleur ne compte plus.<br>En tout : 20 + 0 = <span class="big">20 min</span>.<br>Un « si … sinon » choisit une seule branche, jamais les deux.`,
      consigne: "Combien de minutes la pelouse est-elle arrosée en tout, lundi et mardi ?",
      verification: { type: "courte", attendus: ["20"], unite: "min" },
      dessin: arrosage(),
    },
    {
      tag: "Énigme 3 · Le jeu vidéo",
      titre: "Les vies du héros",
      question: `Au début d'un niveau, le jeu de Malik exécute ces cinq blocs, dans l'ordre.<br><br>Combien vaut la variable vies à la fin ?`,
      reponse: `On suit les variables ligne à ligne.<br>Bloc 1 : vies = 3.<br>Bloc 2 : vies = 3 + 2 = 5.<br>Bloc 3 : bonus = 5 × 2 = 10. On prend vies <b>maintenant</b>, soit 5.<br>Bloc 4 : vies = 5 − 1 = 4. Le bonus reste 10.<br>Bloc 5 : vies = 4 + 10 = <span class="big">14</span>.<br>« Mettre » écrase la valeur, « ajouter » part de l'ancienne.`,
      consigne: "Combien vaut la variable vies à la fin du programme ?",
      verification: { type: "courte", attendus: ["14"] },
      dessin: vies(),
    },
    {
      tag: "Énigme 4 · Le téléphérique",
      titre: "La moyenne des voyageurs",
      question: `À Saint-Denis, le téléphérique urbain relie plusieurs quartiers.<br>Léana veut le nombre moyen de voyageurs par jour, sur une semaine.<br>Il manque un bloc à son programme.<br><br>Lequel faut-il mettre à la place du « ? » ?`,
      reponse: `La moyenne, c'est la somme des 7 jours, divisée par 7.<br>Il faut donc ajouter chaque réponse au total.<br>Avec « mettre total à réponse », on ne garde que le dernier jour.<br>Avec « ajouter 7 à total », total vaut 7 × 7 = 49. Le programme dirait 7 chaque semaine !<br>Le bon bloc : <span class="big">ajouter réponse à total</span>.`,
      consigne: "Quel bloc faut-il mettre à la place du « ? » ?",
      verification: { type: "qcm", choix: ["mettre total à réponse", "ajouter 7 à total", "ajouter réponse à total"], bonne: 2 },
      dessin: telepherique(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le tableau de volley",
      sorte: "piege",
      question: `Au volley, le tableau affiche les scores à l'envers : 18 pour domicile, 25 pour visiteurs.<br>Zoé écrit deux blocs pour les échanger.<br>Elle dit : « Le tableau affichera 25 – 18. »<br><br><b>Qu'affiche vraiment le tableau ?</b>`,
      reponse: `On déroule, sans deviner.<br>Bloc 1 : domicile = 25. Le 18 est écrasé, il est perdu.<br>Bloc 2 : visiteurs = domicile, donc 25.<br>Le tableau affiche <span class="big">25 – 25</span>.<br>Correction : mettre mémoire à domicile, mettre domicile à visiteurs, mettre visiteurs à mémoire.<br>On obtient bien 25 – 18.`,
      consigne: "Qu'affiche le tableau après les deux blocs de Zoé ?",
      verification: { type: "qcm", choix: ["25 – 25", "25 – 18", "18 – 18"], bonne: 0 },
      dessin: volley(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La suite de Syracuse",
      sorte: "defi",
      question: `Ce programme cache une énigme : personne n'a jamais prouvé qu'il s'arrête toujours.<br>On part de n = 6.<br>À chaque tour, n change, et étapes augmente de 1.<br><br>Combien vaut étapes quand le programme s'arrête ?`,
      reponse: `On note n après chaque tour.<br>6 est pair : 3. Puis 3 est impair : 3 × 3 + 1 = 10.<br>10 → 5, puis 5 → 3 × 5 + 1 = 16.<br>16 → 8 → 4 → 2 → 1.<br>n est passé par 3, 10, 5, 16, 8, 4, 2, 1 : 8 tours.<br>étapes = <span class="big">8</span>.<br>Essaie avec n = 7 : c'est beaucoup plus long !`,
      consigne: "En partant de n = 6, combien vaut étapes à la fin ?",
      verification: { type: "courte", attendus: ["8"] },
      dessin: syracuse(),
    },
  ],
};

export default problemes;
