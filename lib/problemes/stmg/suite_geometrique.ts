// Énigmes à projeter — STMG (1re), notion suite géométrique : reconnaître
// (les paniers bio, la machine-outil, trois franchises de boulangeries, la
// foire de Bras-Panon (974), piège des
// boutiques de piercing, défi de la pisciculture). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche } from "../dessins-ecole";

function ligne(vals: string[], ecarts: string[], cEcart: string, taille = 24) {
  let s = "";
  for (let k = 0; k < vals.length; k++) {
    const x = 30 + k * 115;
    const der = vals[k] === "?";
    s += r(x, 150, 90, 70, der ? C.rose : C.bleu, 0.18, 3, 8) + t(x + 45, 196, vals[k], der ? C.rose : C.craie, taille);
    if (k < vals.length - 1) s += fleche(x + 92, 185, x + 113, 185, cEcart, 3) + t(x + 102, 260, ecarts[k], cEcart, 18);
  }
  return s;
}

const paniers = svg("Les paniers bio : 500, 1 000, 2 000, 4 000 paniers vendus ; on cherche la raison",
  t(240, 70, "paniers vendus", C.pale, 24) + ligne(["500", "1 000", "2 000", "4 000"], ["×?", "×?", "×?"], C.jaune) +
    t(240, 350, `raison q${NB}=${NB}?`, C.rose, 30));

const machine = svg("La machine-outil : u indice 0 égale 20 000 euros ; u indice n plus 1 égale 0,8 fois u indice n ; u indice 2 ?",
  t(240, 60, "uₙ₊₁ = 0,8 × uₙ", C.craie, 30) + ligne(["20 000", "?", "?"], ["×0,8", "×0,8"], C.jaune, 20) +
    t(240, 350, `u₂${NB}=${NB}?`, C.rose, 30));

const boulangeries = svg("Trois franchises de boulangeries : A 10, 20, 30, 40 ; B 10, 30, 90, 270 ; C 10, 20, 40, 60",
  r(40, 50, 400, 70, C.bleu, 0.12, 3, 10) + t(240, 97, "A.  10 · 20 · 30 · 40", C.craie, 26) +
    r(40, 150, 400, 70, C.bleu, 0.12, 3, 10) + t(240, 197, "B.  10 · 30 · 90 · 270", C.craie, 26) +
    r(40, 250, 400, 70, C.bleu, 0.12, 3, 10) + t(240, 297, "C.  10 · 20 · 40 · 60", C.craie, 26) +
    t(240, 385, `géométrique${NB}?`, C.rose, 26));

const foire = svg("La foire agricole de Bras-Panon : 800, 1 200, 1 800, 2 700 visiteurs ; on cherche le quotient de deux termes qui se suivent",
  t(240, 70, "visiteurs (centaines)", C.pale, 24) + ligne(["8", "12", "18", "27"], ["×?", "×?", "×?"], C.jaune) +
    t(240, 350, `uₙ₊₁ ÷ uₙ${NB}=${NB}?`, C.rose, 30));

const piercing = svg("Les boutiques de piercing : u indice 0 égale 2 boutiques ; on multiplie par 3 chaque année ; u indice 3 ?",
  r(60, 70, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 112, "u₀ = 2", C.craie, 28) + t(240, 152, "q = 3", C.craie, 28) +
    t(240, 250, "Léo : « 2 × 3 × 3 = 18 »", C.pale, 24) + t(240, 340, `u₃${NB}=${NB}?`, C.rose, 32));

const pisciculture = svg("La pisciculture : u indice 0 égale 4 000 alevins ; u indice 2 égale 9 000 ; suite géométrique, raison ?",
  `<line x1="60" y1="200" x2="420" y2="200" stroke="${C.craie}" stroke-width="3"/>` +
    [0, 1, 2].map((k) => `<circle cx="${80 + k * 160}" cy="200" r="8" fill="${k === 1 ? C.bleu : C.rose}"/>` + t(80 + k * 160, 170, `u${["₀", "₁", "₂"][k]}`, C.pale, 22)).join("") +
    t(80, 248, "4 000", C.craie, 24) + t(240, 248, "?", C.craie, 24) + t(400, 248, "9 000", C.craie, 24) +
    t(160, 120, "× q", C.jaune, 22) + t(320, 120, "× q", C.jaune, 22) + t(240, 360, `q${NB}=${NB}?`, C.rose, 30));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_geometrique",
  titre: "Énigmes pour reconnaître une suite géométrique",
  description: "Les paniers bio, la machine-outil, trois franchises de boulangeries, la foire agricole de Bras-Panon, le piège des boutiques de piercing, le défi de la pisciculture : trouver la raison, utiliser uₙ₊₁ = q × uₙ, montrer qu'une suite est géométrique.",
  problemes: [
    {
      tag: "Énigme 1 · Les paniers bio",
      titre: "Trouver la raison",
      question: `Un producteur vend 500 paniers bio, puis 1 000, 2 000 et 4 000.<br>On multiplie toujours par le même nombre.<br><br><b>Quelle est la raison</b> de cette suite ?`,
      reponse: `On divise un terme par le précédent.<br>1 000 ÷ 500 = 2, 2 000 ÷ 1 000 = 2, 4 000 ÷ 2 000 = 2.<br>Raison <span class="big">q = 2</span>.`,
      consigne: "500 ; 1 000 ; 2 000 ; 4 000. Quelle est la raison ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: paniers,
    },
    {
      tag: "Énigme 2 · La machine-outil",
      titre: "u(n+1) = q × u(n)",
      question: `Une entreprise achète une machine-outil 20 000 € : u<sub>0</sub> = 20 000.<br>Chaque année, sa valeur est multipliée par 0,8.<br>Donc u<sub>n+1</sub> = 0,8 × u<sub>n</sub>.<br><br><b>Combien vaut</b> u<sub>2</sub> ?`,
      reponse: `u<sub>1</sub> = 0,8 × 20 000 = 16 000.<br>u<sub>2</sub> = 0,8 × 16 000 = <span class="big">12 800 €</span>.`,
      consigne: "u₀ = 20 000 et uₙ₊₁ = 0,8 × uₙ. Calcule u₂.",
      verification: { type: "courte", attendus: ["12800", "12 800"], unite: "€" },
      dessin: machine,
    },
    {
      tag: "Énigme 3 · Les franchises de boulangeries",
      titre: "Laquelle est géométrique ?",
      question: `Trois franchises de boulangeries comptent leurs magasins, année après année.<br><br><b>Quelle suite est géométrique</b> ?`,
      reponse: `A : on ajoute 10. Arithmétique.<br>B : on multiplie toujours par 3 (30 ÷ 10 = 90 ÷ 30 = 270 ÷ 90 = 3).<br>C : × 2, × 2, puis × 1,5. Ni l'un ni l'autre.<br><span class="big">La suite B</span>.`,
      consigne: "Quelle suite est géométrique ?",
      verification: { type: "qcm", choix: ["10 ; 20 ; 30 ; 40", "10 ; 30 ; 90 ; 270", "10 ; 20 ; 40 ; 60"], bonne: 1 },
      dessin: boulangeries,
    },
    {
      tag: "Énigme 4 · La foire de Bras-Panon",
      titre: "Montrer qu'elle est géométrique",
      question: `La foire agricole de Bras-Panon compte ses visiteurs sur 4 jours.<br>Il y en a 800, puis 1 200, 1 800 et 2 700.<br><br><b>Combien vaut le quotient</b> u<sub>n+1</sub> ÷ u<sub>n</sub> ?`,
      reponse: `1 200 ÷ 800 = 1,5. 1 800 ÷ 1 200 = 1,5. 2 700 ÷ 1 800 = 1,5.<br>Le quotient est toujours le même.<br>La suite est géométrique de raison <span class="big">q = 1,5</span>.`,
      consigne: "800 ; 1 200 ; 1 800 ; 2 700. Combien vaut uₙ₊₁ ÷ uₙ ?",
      verification: { type: "courte", attendus: ["1,5", "1.5"] },
      dessin: foire,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les boutiques de piercing",
      sorte: "piege",
      question: `Une marque a 2 boutiques de piercing l'année 0 : u<sub>0</sub> = 2.<br>Chaque année, leur nombre est multiplié par 3.<br>Léo : « u<sub>3</sub> = 2 × 3 × 3 = 18. »<br><br><b>Combien vaut vraiment</b> u<sub>3</sub> ?`,
      reponse: `Pour aller de u<sub>0</sub> à u<sub>3</sub>, on multiplie 3 fois par 3.<br>2 × 3 × 3 × 3 = <span class="big">54 boutiques</span>.<br>Léo s'est arrêté à u<sub>2</sub> = 18.`,
      consigne: "u₀ = 2 et q = 3. Combien vaut u₃ ?",
      verification: { type: "qcm", choix: ["54", "18", "11"], bonne: 0 },
      dessin: piercing,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La pisciculture",
      sorte: "defi",
      question: `Une pisciculture élève 4 000 alevins l'année 0 : u<sub>0</sub> = 4 000.<br>L'année 2, elle en a 9 000 : u<sub>2</sub> = 9 000.<br>La suite est géométrique, de raison q positive.<br><br><b>Quelle est la raison</b> q ?`,
      reponse: `De u<sub>0</sub> à u<sub>2</sub>, on multiplie 2 fois par q : q × q = 9 000 ÷ 4 000 = 2,25.<br>Le nombre positif qui, multiplié par lui-même, donne 2,25 : 1,5.<br>(1,5 × 1,5 = 2,25.) Raison <span class="big">q = 1,5</span>.`,
      consigne: "u₀ = 4 000 et u₂ = 9 000 (géométrique). Quelle est la raison ?",
      verification: { type: "qcm", choix: ["2,25", "1,125", "1,5"], bonne: 2 },
      dessin: pisciculture,
    },
  ],
};

export default problemes;
