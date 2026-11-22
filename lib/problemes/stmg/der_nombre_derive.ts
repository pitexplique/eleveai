// Énigmes à projeter — STMG (1re), notion dérivée : nombre dérivé (la fabrique
// de rideaux, le bassin de l'usine, le fabricant de thermos, la route des
// Tamarins (974), piège de la barbe à papa, défi de l'application de livres
// audio). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

// f(x) = 0,5x² + x + 0,5 ; A (1 ; 2) ; tangente y = 2x, qui passe par (3 ; 6).
const RR = repereXY(0, 4, 0, 8, { ey: 2, gh: 300 });
const rideaux = svg("La fabrique de rideaux : la courbe et sa tangente en A de coordonnées 1 et 2 ; la tangente passe par le point de coordonnées 3 et 6",
  RR.fond + RR.courbe((x) => 0.5 * x * x + x + 0.5, 0, 3, C.bleu, 4) + RR.courbe((x) => 2 * x, 0.2, 3.9, C.rose, 3) +
    RR.point(1, 2, C.craie, 7) + RR.point(3, 6, C.rose, 7) +
    t(RR.X(1) + 14, RR.Y(2) + 26, "A", C.craie, 22, "start") + t(RR.X(3) + 14, RR.Y(6) + 24, "(3 ; 6)", C.rose, 18, "start") +
    t(240, 400, `f′(1)${NB}=${NB}?`, C.rose, 28));

// Niveau d'eau décroissant : g(x) = 0,5(x − 5)² + 0,5 ; tangente en A (2 ; 5) : pente −3.
const RB = repereXY(0, 5, 0, 8, { ey: 2, gh: 300 });
const bassin = svg("Le bassin de l'usine : la courbe du niveau d'eau descend ; la tangente en A descend aussi",
  RB.fond + RB.courbe((x) => 0.5 * (x - 5) ** 2 + 0.5, 1.2, 5, C.bleu, 4) + RB.courbe((x) => -3 * (x - 2) + 5, 1.1, 3.6, C.rose, 3) +
    RB.point(2, 5, C.craie, 7) + t(RB.X(2) + 16, RB.Y(5) - 8, "A", C.craie, 22, "start") +
    t(240, 400, `signe de f′(a)${NB}?`, C.rose, 26));

const thermos = svg("Le fabricant de thermos : C prime de 100 égale 12 euros ; coût du 101e thermos ?",
  r(80, 70, 320, 90, C.bleu, 0.15, 3, 10) + t(240, 128, "C′(100) = 12 €", C.craie, 32) +
    t(240, 240, "100 thermos déjà produits", C.pale, 22) + t(240, 330, `le 101e coûte environ${NB}?`, C.rose, 26));

const tamarins = svg("La route des Tamarins : N prime de 7 égale 1 200 véhicules par heure ; véhicules en plus entre 7 h et 7 h 15 ?",
  r(50, 70, 380, 90, C.jaune, 0.2, 3, 10) + t(240, 128, "N′(7) = 1 200 véhicules/h", C.craie, 26) +
    t(240, 240, "de 7 h à 7 h 15", C.pale, 24) + t(240, 330, `véhicules en plus${NB}?`, C.rose, 26));

// f(x) = −(x − 2)² + 5 ; sommet A (2 ; 5), tangente horizontale.
const RP = repereXY(0, 4, 0, 6, { gh: 300 });
const barbe = svg("La barbe à papa : la courbe a un sommet A de coordonnées 2 et 5 ; la tangente en A est horizontale ; Inès dit que f prime de 2 vaut 5",
  RP.fond + RP.courbe((x) => -((x - 2) ** 2) + 5, 0, 4, C.bleu, 4) + RP.courbe(() => 5, 0.6, 3.4, C.rose, 3) +
    RP.point(2, 5, C.craie, 7) + t(RP.X(2), RP.Y(5) - 16, "A (2 ; 5)", C.craie, 18) +
    t(240, 400, "Inès : « f′(2) = 5 »", C.pale, 24));

const livres = svg("L'application de livres audio : f de 5 égale 30 milliers d'abonnés, f prime de 5 égale 8 milliers par mois ; f de 5,5 ?",
  r(50, 60, 380, 80, C.bleu, 0.15, 3, 10) + t(240, 110, "f(5) = 30", C.craie, 30) +
    r(50, 160, 380, 80, C.jaune, 0.2, 3, 10) + t(240, 210, "f′(5) = 8", C.craie, 30) +
    t(240, 290, "en milliers d'abonnés, x en mois", C.pale, 20) + t(240, 365, `f(5,5) environ${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "der_nombre_derive",
  titre: "Énigmes de nombre dérivé",
  description: "La fabrique de rideaux, le bassin de l'usine, le fabricant de thermos, la route des Tamarins, le piège de la barbe à papa, le défi de l'application de livres audio : lire un nombre dérivé sur une tangente, comprendre son signe, l'interpréter en coût marginal ou en vitesse.",
  problemes: [
    {
      tag: "Énigme 1 · La fabrique de rideaux",
      titre: "Lire un nombre dérivé",
      question: `Une fabrique de rideaux trace la courbe de f.<br>La tangente en A (1 ; 2) passe aussi par le point (3 ; 6).<br><br><b>Que vaut f′(1)</b> ?`,
      reponse: `f′(1) est la pente de la tangente en A.<br>(6 − 2) ÷ (3 − 1) = 4 ÷ 2.<br>f′(1) = <span class="big">2</span>.`,
      consigne: "La tangente en A (1 ; 2) passe par (3 ; 6). Que vaut f′(1) ?",
      verification: { type: "qcm", choix: ["1", "2", "4"], bonne: 1 },
      dessin: rideaux,
    },
    {
      tag: "Énigme 2 · Le bassin de l'usine",
      titre: "Le signe du nombre dérivé",
      question: `Une usine vide son bassin de rétention.<br>La courbe du niveau d'eau descend.<br>La tangente en A descend aussi.<br><br><b>Quel est le signe</b> du nombre dérivé en A ?`,
      reponse: `Le nombre dérivé est la pente de la tangente.<br>Une droite qui descend a une pente négative.<br>Le nombre dérivé est <span class="big">négatif</span>.`,
      consigne: "La tangente en A descend. Quel est le signe du nombre dérivé en A ?",
      verification: { type: "qcm", choix: ["positif", "nul", "négatif"], bonne: 2 },
      dessin: bassin,
    },
    {
      tag: "Énigme 3 · Le fabricant de thermos",
      titre: "Le coût marginal",
      question: `Un fabricant de thermos a un coût C(x), en euros.<br>Il a déjà produit 100 thermos. C′(100) = 12.<br><br><b>Combien coûte environ</b> le 101e thermos ?`,
      reponse: `C′(100) est le coût marginal.<br>C'est le coût, environ, d'un thermos de plus.<br>Le 101e coûte environ <span class="big">12 €</span>.`,
      consigne: "C′(100) = 12. Combien coûte environ le 101e thermos ?",
      verification: { type: "qcm", choix: ["12 €", "1 200 €", "112 €"], bonne: 0 },
      dessin: thermos,
    },
    {
      tag: "Énigme 4 · La route des Tamarins",
      titre: "Une vitesse instantanée",
      question: `Sur la route des Tamarins (974), N(t) compte les véhicules passés depuis minuit.<br>À 7 h, N′(7) = 1 200 véhicules par heure.<br><br><b>Environ combien de véhicules</b> passent entre 7 h et 7 h 15 ?`,
      reponse: `15 minutes, c'est 0,25 heure.<br>1 200 × 0,25 = 300.<br>Environ <span class="big">300 véhicules</span>.`,
      consigne: "N′(7) = 1 200 véhicules par heure. Environ combien entre 7 h et 7 h 15 ?",
      verification: { type: "courte", attendus: ["300"], unite: "véhicules" },
      dessin: tamarins,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La barbe à papa",
      sorte: "piege",
      question: `Un vendeur de barbe à papa trace son bénéfice f.<br>A (2 ; 5) est le sommet. La tangente en A est horizontale.<br>Inès : « f′(2) = 5, comme l'ordonnée de A. »<br><br><b>Que vaut f′(2)</b> ?`,
      reponse: `5 est f(2), l'ordonnée du point.<br>f′(2) est la pente de la tangente. Elle est horizontale.<br>f′(2) = <span class="big">0</span>.`,
      consigne: "La tangente en A (2 ; 5) est horizontale. Que vaut f′(2) ?",
      verification: { type: "courte", attendus: ["0"] },
      dessin: barbe,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'application de livres audio",
      sorte: "defi",
      question: `Une application de livres audio a f(x) milliers d'abonnés au mois x.<br>f(5) = 30 et f′(5) = 8.<br><br><b>Estime f(5,5)</b>, en milliers.`,
      reponse: `f′(5) = 8 : environ 8 milliers de plus par mois.<br>En un demi-mois : 8 × 0,5 = 4.<br>f(5,5) ≈ 30 + 4 = <span class="big">34</span> milliers.`,
      consigne: "f(5) = 30 et f′(5) = 8. Estime f(5,5).",
      verification: { type: "courte", attendus: ["34"] },
      dessin: livres,
    },
  ],
};

export default problemes;
