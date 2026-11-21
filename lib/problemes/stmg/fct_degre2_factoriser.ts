// Énigmes à projeter — STMG (1re), notion degré 2 : factoriser connaissant une
// racine (l'agence événementielle, la laiterie, la fonderie, les navettes vers
// l'aéroport, piège de l'espace de coworking, défi de l'éditeur de jeux
// mobiles). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

const evenementiel = svg("L'agence événementielle : f de x égale x au carré moins 7x plus 10 ; 2 est-il une racine ?",
  r(50, 90, 380, 100, C.bleu, 0.15, 3, 10) + t(240, 155, "f(x) = x² − 7x + 10", C.craie, 32) +
    t(240, 280, `f(2)${NB}=${NB}0${NB}?`, C.rose, 30));

const laiterie = svg("La laiterie : x moins 2 fois x moins 5, quelle forme développée ?",
  r(70, 90, 340, 100, C.jaune, 0.2, 3, 10) + t(240, 155, "(x − 2)(x − 5)", C.craie, 34) +
    t(240, 280, `=${NB}?`, C.rose, 34));

const fonderie = svg("La fonderie : f de x égale 2x au carré moins 16x plus 30 ; racines 3 et 5",
  r(40, 70, 400, 100, C.bleu, 0.15, 3, 10) + t(240, 135, "f(x) = 2x² − 16x + 30", C.craie, 30) +
    t(240, 235, "racines : 3 et 5", C.pale, 26) + t(240, 330, `forme factorisée${NB}?`, C.rose, 26));

const navettes = svg("Les navettes vers l'aéroport : f de x égale x au carré moins 9x plus 14 ; f de 2 égale 0 ; l'autre racine ?",
  r(50, 70, 380, 100, C.jaune, 0.2, 3, 10) + t(240, 135, "f(x) = x² − 9x + 14", C.craie, 32) +
    t(240, 235, "f(2) = 0", C.pale, 26) + t(240, 330, `l'autre racine${NB}?`, C.rose, 26));

const coworking = svg("L'espace de coworking : f de x égale 3x au carré moins 15x plus 12 ; Sam écrit x moins 1 fois x moins 4",
  r(40, 60, 400, 90, C.bleu, 0.15, 3, 10) + t(240, 118, "f(x) = 3x² − 15x + 12", C.craie, 30) +
    t(240, 210, "racines : 1 et 4", C.pale, 24) + t(240, 260, "Sam : « f(x) = (x − 1)(x − 4) »", C.pale, 22) +
    t(240, 350, "?", C.rose, 34));

const jeux = svg("L'éditeur de jeux mobiles : f de x égale x au carré plus x moins 12 ; f de 3 égale 0 ; l'autre racine ?",
  r(60, 70, 360, 100, C.jaune, 0.2, 3, 10) + t(240, 135, "f(x) = x² + x − 12", C.craie, 32) +
    t(240, 235, "f(3) = 0", C.pale, 26) + t(240, 290, "f(x) = (x − 3)(x − ?)", C.pale, 26) +
    t(240, 360, `l'autre racine${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "fct_degre2_factoriser",
  titre: "Énigmes de factorisation",
  description: "L'agence événementielle, la laiterie, la fonderie, les navettes vers l'aéroport, le piège de l'espace de coworking, le défi de l'éditeur de jeux mobiles : vérifier qu'un nombre est racine, factoriser avec les racines et vérifier en développant.",
  problemes: [
    {
      tag: "Énigme 1 · L'agence événementielle",
      titre: "Vérifier une racine",
      question: `Une agence événementielle étudie f(x) = x² − 7x + 10.<br>Elle pense que 2 est une racine.<br><br><b>A-t-elle raison</b> ?`,
      reponse: `f(2) = 2² − 7 × 2 + 10.<br>f(2) = 4 − 14 + 10 = 0.<br><span class="big">Oui, f(2) = 0</span> : 2 est une racine.`,
      consigne: "f(x) = x² − 7x + 10. Le nombre 2 est-il une racine ?",
      verification: { type: "qcm", choix: ["oui, f(2) = 0", "non, f(2) = 10", "non, f(2) = −4"], bonne: 0 },
      dessin: evenementiel,
    },
    {
      tag: "Énigme 2 · La laiterie",
      titre: "Vérifier en développant",
      question: `Le comptable d'une laiterie écrit (x − 2)(x − 5).<br><br><b>Quelle est la forme développée</b> ?`,
      reponse: `x × x = x². x × (−5) + (−2) × x = −7x.<br>(−2) × (−5) = +10.<br>(x − 2)(x − 5) = <span class="big">x² − 7x + 10</span>.`,
      consigne: "Développe (x − 2)(x − 5).",
      verification: { type: "qcm", choix: ["x² − 7x − 10", "x² + 7x + 10", "x² − 7x + 10"], bonne: 2 },
      dessin: laiterie,
    },
    {
      tag: "Énigme 3 · La fonderie",
      titre: "Factoriser avec les deux racines",
      question: `Une fonderie étudie f(x) = 2x² − 16x + 30.<br>Ses racines sont 3 et 5.<br><br><b>Quelle est la forme factorisée</b> ?`,
      reponse: `On écrit a(x − 3)(x − 5), avec a = 2, le nombre devant x².<br>Vérification : 2(x² − 8x + 15) = 2x² − 16x + 30.<br>f(x) = <span class="big">2(x − 3)(x − 5)</span>.`,
      consigne: "f(x) = 2x² − 16x + 30, racines 3 et 5. Forme factorisée ?",
      verification: { type: "qcm", choix: ["(x − 3)(x − 5)", "2(x − 3)(x − 5)", "2(x + 3)(x + 5)"], bonne: 1 },
      dessin: fonderie,
    },
    {
      tag: "Énigme 4 · Les navettes",
      titre: "Trouver l'autre racine",
      question: `Une compagnie de navettes vers l'aéroport étudie f(x) = x² − 9x + 14.<br>f(2) = 0. On peut écrire f(x) = (x − 2)(x − r).<br><br><b>Combien vaut r</b>, l'autre racine ?`,
      reponse: `(x − 2)(x − r) : le nombre sans x vaut 2 × r.<br>Il doit valoir 14, donc r = 7.<br>Vérification : 49 − 63 + 14 = 0. L'autre racine est <span class="big">7</span>.`,
      consigne: "f(x) = x² − 9x + 14 = (x − 2)(x − r). Combien vaut r ?",
      verification: { type: "courte", attendus: ["7"] },
      dessin: navettes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'espace de coworking",
      sorte: "piege",
      question: `Un espace de coworking étudie f(x) = 3x² − 15x + 12.<br>Ses racines sont 1 et 4.<br>Sam écrit : f(x) = (x − 1)(x − 4).<br><br><b>Par quel nombre</b> faut-il multiplier (x − 1)(x − 4) ?`,
      reponse: `(x − 1)(x − 4) = x² − 5x + 4 : il manque le 3 devant x².<br>3(x² − 5x + 4) = 3x² − 15x + 12.<br>Il faut multiplier par <span class="big">3</span> : f(x) = 3(x − 1)(x − 4).`,
      consigne: "f(x) = 3x² − 15x + 12, racines 1 et 4. f(x) = ? × (x − 1)(x − 4).",
      verification: { type: "courte", attendus: ["3"] },
      dessin: coworking,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les jeux mobiles",
      sorte: "defi",
      question: `Un éditeur de jeux mobiles étudie f(x) = x² + x − 12.<br>f(3) = 9 + 3 − 12 = 0. On écrit f(x) = (x − 3)(x − r).<br><br><b>Combien vaut r</b>, l'autre racine ?`,
      reponse: `Le nombre sans x : (−3) × (−r) = 3r. Il vaut −12.<br>3r = −12, donc r = −4.<br>f(x) = (x − 3)(x + 4). L'autre racine est <span class="big">−4</span>.`,
      consigne: "f(x) = x² + x − 12 = (x − 3)(x − r). Combien vaut r ?",
      verification: { type: "courte", attendus: ["-4", "−4"] },
      dessin: jeux,
    },
  ],
};

export default problemes;
