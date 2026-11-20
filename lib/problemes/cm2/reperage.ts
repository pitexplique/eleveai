// Énigmes à projeter — CM2, notion reperage (la bataille navale, le robot qui
// se déplace, le plan du zoo, le volcan sur la carte de La Réunion, le piège
// « lettre d'abord, chiffre ensuite », le défi du programme de déplacement).
// 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, p, grille } from "../dessins-ecole";

// Le quadrillage : colonnes A → F, lignes 1 → 5 (la ligne 1 en bas), cases de 55 px.
const X0 = 90, Y0 = 40, K = 55;
const cx = (col: string) => X0 + ("ABCDEF".indexOf(col) + 0.5) * K;
const cy = (lig: number) => Y0 + (5 - lig + 0.5) * K;
const quadrillage = () =>
  grille(X0, Y0, 6, 5, K, C.pale, 1.5) +
  "ABCDEF".split("").map((c) => t(cx(c), Y0 + 5 * K + 30, c, C.bleu, 22)).join("") +
  [1, 2, 3, 4, 5].map((n) => t(X0 - 18, cy(n) + 8, n, C.bleu, 22)).join("");
const dans = (case_: string, s: string, taille = 34, c: string = C.craie) => t(cx(case_[0]), cy(Number(case_[1])) + taille / 3, s, c, taille);

const bataille = svg(
  "Un quadrillage de bataille navale, colonnes A à F, lignes 1 à 5, un bateau dans une case",
  quadrillage() + dans("C4", "🚢") + t(240, 400, `Dans quelle case${NB}?`, C.rose, 24)
);

const robot = svg(
  "Un quadrillage avec un robot en case B2",
  quadrillage() + dans("B2", "🤖") + t(240, 400, `3 cases → puis 2 cases ↑`, C.rose, 22)
);

const zoo = svg(
  "Le plan du zoo sur un quadrillage : des lions, des girafes et des pingouins",
  quadrillage() + dans("B3", "🦁") + dans("E1", "🦒") + dans("D4", "🐧") + t(240, 400, `Qui est en B3${NB}?`, C.rose, 24)
);

// La Réunion, très simplifiée (pas à l'échelle).
const reunion = svg(
  "Une carte simplifiée de La Réunion sur un quadrillage, avec Saint-Denis au nord et le volcan au sud-est (pas à l'échelle)",
  quadrillage() + p("M150 80 C 230 30, 330 50, 380 130 C 420 200, 410 280, 330 300 C 250 320, 150 300, 120 230 C 100 170, 110 110, 150 80 Z", C.jaune, 4, 0.2) +
    t(cx("C"), cy(5) + 6, "Saint-Denis", C.craie, 16) + dans("E2", "🌋", 32) + t(420, 400, "pas à l'échelle", C.pale, 14, "end") +
    t(200, 400, `le volcan${NB}?`, C.rose, 24)
);

const tresor = svg(
  "Un quadrillage avec trois points numérotés 1, 2 et 3",
  quadrillage() + dans("D2", "1", 32, C.rose) + dans("B4", "2", 32, C.rose) + dans("B2", "3", 32, C.rose) + t(240, 400, `Quel point est en D2${NB}?`, C.rose, 22)
);

const programme = svg(
  "Un quadrillage avec un robot en A1 et le programme : haut, haut, droite, droite, droite, bas",
  quadrillage() + dans("A1", "🤖") + t(240, 400, "↑ ↑ → → → ↓", C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "reperage",
  titre: "Énigmes de repérage sur quadrillage",
  description: "La bataille navale, le robot qui se déplace, le plan du zoo, le volcan sur la carte de La Réunion, le piège du trésor, le défi du programme du robot.",
  problemes: [
    {
      tag: "Énigme 1 · La bataille navale",
      titre: "Le bateau caché",
      question: `On nomme une case par sa <b>lettre</b> (la colonne), puis son <b>chiffre</b> (la ligne).<br><br><b>Dans quelle case</b> est le bateau ?`,
      reponse: `Colonne : C. Ligne : 4.<br>Le bateau est en <span class="big">C4</span>.`,
      consigne: "Dans quelle case est le bateau ?",
      verification: { type: "courte", attendus: ["C4"] },
      dessin: bataille,
    },
    {
      tag: "Énigme 2 · Le robot",
      titre: "Le déplacement",
      question: `Le robot est en <b>B2</b>.<br>Il avance de <b>3 cases vers la droite</b>, puis de <b>2 cases vers le haut</b>.<br><br><b>Dans quelle case</b> arrive-t-il ?`,
      reponse: `Vers la droite : B → C → D → E.<br>Vers le haut : 2 → 3 → 4.<br>Il arrive en <span class="big">E4</span>.`,
      consigne: "Dans quelle case arrive le robot ?",
      verification: { type: "courte", attendus: ["E4"] },
      dessin: robot,
    },
    {
      tag: "Énigme 3 · Au zoo",
      titre: "Le plan du zoo",
      question: `Voici le plan du zoo.<br><br><b>Quels animaux</b> sont en case <b>B3</b> ?`,
      reponse: `Colonne B, puis on monte jusqu'à la ligne 3.<br>En B3, il y a <span class="big">les lions</span>.`,
      consigne: "Quels animaux sont en case B3 ?",
      verification: { type: "qcm", choix: ["Les pingouins", "Les girafes", "Les lions"], bonne: 2 },
      dessin: zoo,
    },
    {
      tag: "Énigme 4 · La carte de La Réunion",
      titre: "Le volcan",
      question: `Sur cette carte de La Réunion, on voit le Piton de la Fournaise 🌋.<br><br><b>Dans quelle case</b> est le volcan ?`,
      reponse: `Colonne E, ligne 2.<br>Le volcan est en <span class="big">E2</span>, au sud-est de l'île.`,
      consigne: "Dans quelle case est le volcan ?",
      verification: { type: "courte", attendus: ["E2"] },
      dessin: reunion,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le trésor",
      sorte: "piege",
      question: `Le trésor est en <b>D2</b>.<br>Tom lit à l'envers : le 2 pour la colonne (B), le D, 4e lettre, pour la ligne (4).<br><br><b>Quel point</b> est vraiment en D2 ?`,
      reponse: `Tom a mélangé ! La lettre donne la colonne, le chiffre donne la ligne.<br>Colonne D, ligne 2 : c'est <span class="big">le point 1</span>.<br>Tom est allé en B4 : le point 2.`,
      consigne: "Quel point est en D2 ?",
      verification: { type: "qcm", choix: ["Le point 1", "Le point 2", "Le point 3"], bonne: 0 },
      dessin: tresor,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le programme du robot",
      sorte: "defi",
      question: `Le robot part de <b>A1</b>.<br>Il suit le programme : <b>↑ ↑ → → → ↓</b>.<br>Chaque flèche = une case.<br><br><b>Dans quelle case</b> s'arrête-t-il ?`,
      reponse: `↑ ↑ : A1 → A3.<br>→ → → : A3 → D3.<br>↓ : D3 → D2. Il s'arrête en <span class="big">D2</span>.`,
      consigne: "Dans quelle case s'arrête le robot ?",
      verification: { type: "courte", attendus: ["D2"] },
      dessin: programme,
    },
  ],
};

export default problemes;
