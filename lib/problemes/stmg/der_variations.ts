// Énigmes à projeter — STMG (1re), notion dérivée : signe et tableau de
// variations (le tapissier, la voilerie, le loueur de caravanes, le cabinet
// d'orthodontie, piège du pressoir à cidre, défi du graveur sur bois). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, fleche } from "../dessins-ecole";

/** Un tableau de variations dessiné à la main (modèle de fct_monotonie.ts). */
const variations = (cols: { x: number; v: string; s: string; haut: boolean }[], y = 70) => {
  let s = r(20, y, 440, 190, C.craie, 0, 3) + l(110, y, 110, y + 190, C.craie, 2) + l(20, y + 55, 460, y + 55, C.craie, 2) +
    t(65, y + 37, "x", C.pale, 24) + t(65, y + 130, "f", C.pale, 24);
  cols.forEach((c) => (s += t(c.x, y + 37, c.s, C.craie, 22) + t(c.x, c.haut ? y + 88 : y + 175, c.v, C.craie, 22)));
  for (let k = 0; k + 1 < cols.length; k++) {
    const a = cols[k], b = cols[k + 1];
    const ya = a.haut ? y + 96 : y + 152, yb = b.haut ? y + 96 : y + 152;
    s += fleche(a.x + 26, ya, b.x - 26, yb, C.bleu, 3);
  }
  return s;
};

const tapissier = svg("Le tapissier : f prime de x égale 2x moins 8, pour x entre 0 et 10 ; où est-elle négative ?",
  r(50, 80, 380, 100, C.bleu, 0.15, 3, 10) + t(240, 143, "f′(x) = 2x − 8", C.craie, 34) +
    t(240, 250, "x entre 0 et 10", C.pale, 22) + t(240, 340, `f′(x)${NB}&lt;${NB}0 sur${NB}?`, C.rose, 28));

// Tableau de signes de f′ : colonnes 0 (170), 3 (290), 8 (420).
const voilerie = svg("La voilerie : tableau de signes de f prime ; moins entre 0 et 3, zéro en 3, plus entre 3 et 8",
  r(20, 80, 440, 130, C.craie, 0, 3) + l(110, 80, 110, 210, C.craie, 2) + l(20, 140, 460, 140, C.craie, 2) +
    t(65, 120, "x", C.pale, 24) + t(65, 184, "f′(x)", C.pale, 22) +
    t(150, 120, "0", C.craie, 22) + t(290, 120, "3", C.craie, 22) + t(430, 120, "8", C.craie, 22) +
    t(220, 186, "−", C.craie, 28) + t(290, 184, "0", C.craie, 22) + t(360, 186, "+", C.craie, 28) +
    t(240, 290, "voiles de bateau", C.pale, 22) + t(240, 365, `f sur [0${NB};${NB}3]${NB}?`, C.rose, 28));

const caravanes = svg("Le loueur de caravanes : f prime de x égale moins 3x plus 12 ; f de 0 égale 10, f de 4 égale 34, f de 8 égale 10 ; le maximum ?",
  r(40, 60, 400, 90, C.jaune, 0.2, 3, 10) + t(240, 118, "f′(x) = −3x + 12", C.craie, 32) +
    t(240, 215, "f(0) = 10 · f(4) = 34 · f(8) = 10", C.pale, 22) + t(240, 260, "x entre 0 et 8", C.pale, 22) +
    t(240, 350, `le maximum${NB}?`, C.rose, 30));

const orthodontie = svg("Le cabinet d'orthodontie : tableau de variations ; 500 en 0, descend à 140 en 3, remonte à 320 en 6",
  variations([
    { x: 160, v: "500", s: "0", haut: true }, { x: 290, v: "140", s: "3", haut: false }, { x: 420, v: "320", s: "6", haut: true },
  ]) + t(240, 320, "coût par appareil, en €", C.pale, 22) + t(240, 385, `le minimum en x${NB}=${NB}?`, C.rose, 26));

const pressoir = svg("Le pressoir à cidre : f prime de x égale 2x plus 4, x entre 0 et 5 ; f de 0 égale moins 20 ; Inès dit que f est décroissante",
  r(40, 60, 400, 90, C.bleu, 0.15, 3, 10) + t(240, 118, "f′(x) = 2x + 4", C.craie, 32) +
    t(240, 200, "f(0) = −20 · x entre 0 et 5", C.pale, 22) +
    t(240, 260, "Inès : « f(0) est négatif,", C.pale, 24) + t(240, 305, "donc f décroît »", C.pale, 24) +
    t(240, 380, "?", C.rose, 34));

const graveur = svg("Le graveur sur bois : f de x égale x au cube moins 12x plus 20, x entre 0 et 4 ; le minimum ?",
  r(30, 70, 420, 100, C.jaune, 0.2, 3, 10) + t(240, 133, "f(x) = x³ − 12x + 20", C.craie, 32) +
    t(240, 240, "x entre 0 et 4", C.pale, 22) + t(240, 340, `le minimum${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "der_variations",
  titre: "Énigmes de signe de la dérivée et de variations",
  description: "Le tapissier, la voilerie, le loueur de caravanes, le cabinet d'orthodontie, le piège du pressoir à cidre, le défi du graveur sur bois : étudier le signe de f′, en déduire le sens de variation, lire un tableau de variations et trouver un extremum.",
  problemes: [
    {
      tag: "Énigme 1 · Le tapissier",
      titre: "Le signe de la dérivée",
      question: `Un tapissier étudie f, avec f′(x) = 2x − 8.<br>x est entre 0 et 10.<br><br><b>Sur quel intervalle</b> f′(x) est-elle négative ?`,
      reponse: `2x − 8 = 0 pour x = 4.<br>Avant 4, par exemple en 0 : 2 × 0 − 8 = −8, négatif.<br>f′(x) &lt; 0 sur <span class="big">[0 ; 4]</span>.`,
      consigne: "f′(x) = 2x − 8, x entre 0 et 10. Sur quel intervalle f′(x) est-elle négative ?",
      verification: { type: "qcm", choix: ["[0 ; 4]", "[4 ; 10]", "[0 ; 8]"], bonne: 0 },
      dessin: tapissier,
    },
    {
      tag: "Énigme 2 · La voilerie",
      titre: "Du signe au sens de variation",
      question: `Une voilerie fabrique des voiles de bateau.<br>Voici le tableau de signes de f′(x).<br><br><b>Comment est f</b> sur [0 ; 3] ?`,
      reponse: `Sur [0 ; 3], f′(x) est négative.<br>Dérivée négative : la fonction descend.<br>f est <span class="big">décroissante</span>.`,
      consigne: "f′(x) est négative sur [0 ; 3]. Comment est f sur [0 ; 3] ?",
      verification: { type: "qcm", choix: ["croissante", "décroissante", "constante"], bonne: 1 },
      dessin: voilerie,
    },
    {
      tag: "Énigme 3 · Le loueur de caravanes",
      titre: "Le tableau de variations",
      question: `Un loueur de caravanes a un bénéfice f(x), en centaines d'euros.<br>f′(x) = −3x + 12, pour x entre 0 et 8.<br>f(0) = 10, f(4) = 34, f(8) = 10.<br><br><b>Quel est le maximum</b> de f ?`,
      reponse: `−3x + 12 = 0 pour x = 4.<br>Avant 4, f′ &gt; 0 : f monte. Après 4, f′ &lt; 0 : f descend.<br>Le maximum est f(4) = <span class="big">34</span>.`,
      consigne: "f′(x) = −3x + 12 sur [0 ; 8], f(0) = 10, f(4) = 34, f(8) = 10. Quel est le maximum de f ?",
      verification: { type: "courte", attendus: ["34"] },
      dessin: caravanes,
    },
    {
      tag: "Énigme 4 · Le cabinet d'orthodontie",
      titre: "Où est le minimum ?",
      question: `Un cabinet d'orthodontie calcule le coût d'un appareil.<br>Voici le tableau de variations.<br><br><b>Pour quelle valeur de x</b> le coût est-il minimal ?`,
      reponse: `f descend jusqu'à x = 3, puis remonte.<br>Le minimum vaut 140. Il est atteint en x = <span class="big">3</span>.`,
      consigne: "Lis le tableau de variations. Pour quelle valeur de x le coût est-il minimal ?",
      verification: { type: "qcm", choix: ["140", "6", "3"], bonne: 2 },
      dessin: orthodontie,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le pressoir à cidre",
      sorte: "piege",
      question: `Un artisan du cidre a un résultat f(x).<br>f′(x) = 2x + 4, pour x entre 0 et 5. f(0) = −20.<br>Inès : « f(0) est négatif, donc f décroît. »<br><br><b>Comment est vraiment f</b> sur [0 ; 5] ?`,
      reponse: `Le sens de variation dépend du signe de f′, pas de f.<br>Pour x entre 0 et 5 : 2x + 4 &gt; 0.<br>f est <span class="big">croissante</span>.`,
      consigne: "f′(x) = 2x + 4 sur [0 ; 5], f(0) = −20. Comment est vraiment f ?",
      verification: { type: "courte", attendus: ["croissante"] },
      dessin: pressoir,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le graveur sur bois",
      sorte: "defi",
      question: `Un graveur sur bois a un coût par plaque f(x) = x³ − 12x + 20, en euros.<br>x est en centaines de plaques, entre 0 et 4.<br><br><b>Quel est le coût minimal</b> ?`,
      reponse: `f′(x) = 3x² − 12 = 3(x − 2)(x + 2).<br>Sur [0 ; 2], f′ &lt; 0. Sur [2 ; 4], f′ &gt; 0. Minimum en 2.<br>f(2) = 8 − 24 + 20 = <span class="big">4 €</span>.`,
      consigne: "f(x) = x³ − 12x + 20, x entre 0 et 4. Quel est le coût minimal ?",
      verification: { type: "courte", attendus: ["4"], unite: "€" },
      dessin: graveur,
    },
  ],
};

export default problemes;
