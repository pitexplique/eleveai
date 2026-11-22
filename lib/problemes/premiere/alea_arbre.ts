// Énigmes à projeter — première (sans spé maths), notion alea_arbre
// (les baleines de Saint-Paul (974), la boulangerie, la montgolfière, le magasin
// de jouets, piège du conservatoire, défi de l'école de surf). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { arbre2 } from "../dessins-2de";

const Ps = (cond: string, ev: string) => `P<tspan dy="7" font-size="15">${cond}</tspan><tspan dy="-7">(${ev})</tspan>`;

const baleines = svg("Arbre pondéré : mer calme C 0,7, agitée A 0,3 ; sachant C, baleine vue V 0,8, non V 0,2 ; sachant A, V 0,4, non V 0,6",
  arbre2([["C", "0,7"], ["A", "0,3"]], [[["V", "0,8"], ["non V", "0,2"]], [["V", "0,4"], ["non V", "0,6"]]], { yb: 300 }) +
    t(240, 350, "C : mer calme · A : agitée · V : baleine vue", C.pale, 18) +
    t(240, 400, `${Ps("A", "V")}${NB}?`, C.rose, 26));

const boulangerie = svg("Arbre pondéré : client du matin M 0,65, du soir S a ; sachant M, pâtisserie P 0,2, non P 0,8 ; sachant S, P 0,15, non P b",
  arbre2([["M", "0,65"], ["S", "a"]], [[["P", "0,2"], ["non P", "0,8"]], [["P", "0,15"], ["non P", "b"]]], { yb: 300 }) +
    t(240, 350, "M : matin · S : soir · P : achète une pâtisserie", C.pale, 18) +
    t(240, 400, `a${NB}? b${NB}?`, C.rose, 26));

const montgolfiere = svg("Arbre pondéré à compléter : vol à l'heure H 0,8, non H ; sachant H, lever du soleil L 0,9, non L ; sachant non H, L 0,3, non L point d'interrogation",
  arbre2([["H", "0,8"], ["non H", "…"]], [[["L", "0,9"], ["non L", "…"]], [["L", "0,3"], ["non L", "?"]]], { yb: 300 }) +
    t(240, 350, "H : part à l'heure · L : voit le lever du soleil", C.pale, 18) +
    t(240, 400, `quel nombre à la place du «${NB}?${NB}»${NB}?`, C.rose, 22));

const jouets = svg("Arbre pondéré : jouet en bois B 0,45, non B ; sachant B, emballé E 0,3, non E ; sachant non B, E 0,5, non E ; trois branches à compléter",
  arbre2([["B", "0,45"], ["non B", "…"]], [[["E", "0,3"], ["non E", "…"]], [["E", "0,5"], ["non E", "…"]]], { yb: 300 }) +
    t(240, 350, "B : jouet en bois · E : emballé en cadeau", C.pale, 18) +
    t(240, 400, `les 4 nombres de droite${NB}: somme${NB}?`, C.rose, 22));

const conservatoire = svg("Arbre pondéré : pianiste P 0,35, non P 0,65 ; sachant P, admis point d'interrogation ; 14 % de tous les candidats sont des pianistes admis",
  arbre2([["P", "0,35"], ["non P", "0,65"]], [[["admis", "?"], ["refusé", "…"]], [["admis", "…"], ["refusé", "…"]]], { yb: 300, x2: 350 }) +
    t(240, 350, "14 % de TOUS les candidats : pianistes admis", C.jaune, 18) +
    t(240, 400, `quel nombre sur la branche${NB}?`, C.rose, 22));

const surf = svg("Arbre pondéré : débutant D 0,6, confirmé non D 0,4 ; sachant D, tombe T 0,5, non T 0,5 ; sachant non D, T inconnu ; en tout 38 % tombent",
  arbre2([["D", "0,6"], ["non D", "0,4"]], [[["T", "0,5"], ["non T", "0,5"]], [["T", "?"], ["non T", "…"]]], { yb: 300 }) +
    t(240, 350, "T : tombe au 1er essai · en tout, 38 % tombent", C.jaune, 18) +
    t(240, 400, `«${NB}?${NB}»${NB}=${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "alea_arbre",
  titre: "Énigmes de l'arbre pondéré",
  description: "Les baleines de Saint-Paul, la boulangerie, la montgolfière, le magasin de jouets, le piège du conservatoire, le défi de l'école de surf : lire un arbre pondéré, le compléter, le construire à partir d'un énoncé.",
  problemes: [
    {
      tag: "Énigme 1 · Les baleines de Saint-Paul",
      titre: "Lire une branche",
      question: `De juillet à octobre, des bateaux partent de Saint-Paul pour voir les baleines à bosse. La mer est calme (C) ou agitée (A). L'arbre donne les chances de voir une baleine (V).<br><br><b>Quelle est la probabilité</b> de voir une baleine, sachant que la mer est agitée ?`,
      reponse: `On suit la branche A, puis la branche qui mène à V : on lit <span class="big">0,4</span>.<br>Le 0,3 est P(A) : c'est la branche d'avant.`,
      consigne: "Sur l'arbre, quelle est la probabilité de voir une baleine sachant que la mer est agitée ?",
      verification: { type: "qcm", choix: ["0,3", "0,4", "0,6"], bonne: 1 },
      dessin: baleines,
    },
    {
      tag: "Énigme 2 · La boulangerie",
      titre: "Compléter l'arbre",
      question: `Une boulangerie note si ses clients viennent le matin (M) ou le soir (S), et s'ils achètent une pâtisserie (P).<br>Deux nombres sont effacés : a et b.<br><br><b>Combien valent</b> a et b ?`,
      reponse: `Les branches qui partent d'un même nœud font 1 en tout.<br>a = 1 − 0,65 = 0,35 et b = 1 − 0,15 = 0,85 : <span class="big">a = 0,35 et b = 0,85</span>.`,
      consigne: "Les branches d'un même nœud font 1 : combien valent a et b ?",
      verification: { type: "qcm", choix: ["a = 0,35 et b = 0,85", "a = 0,35 et b = 0,6", "a = 0,65 et b = 0,85"], bonne: 0 },
      dessin: boulangerie,
    },
    {
      tag: "Énigme 3 · La montgolfière",
      titre: "Construire l'arbre",
      question: `80 % des vols en montgolfière partent à l'heure (H).<br>Si le vol part à l'heure, 90 % des passagers voient le lever du soleil (L). Sinon, seulement 30 %.<br><br><b>Quel nombre</b> va sur la branche « non H → non L » ?`,
      reponse: `Si le vol part en retard, 30 % voient le lever du soleil : les autres le ratent.<br>1 − 0,3 = <span class="big">0,7</span>.`,
      consigne: "Vol en retard : 30 % voient le lever du soleil. Quel nombre sur la branche « non H → non L » ?",
      verification: { type: "courte", attendus: ["0,7", "0.7", "70%"] },
      dessin: montgolfiere,
    },
    {
      tag: "Énigme 4 · Le magasin de jouets",
      titre: "Une somme qui ne change pas",
      question: `Un magasin vend 45 % de jouets en bois (B). 30 % des jouets en bois sont emballés en cadeau (E), et 50 % des autres.<br><br>On complète l'arbre. <b>Quelle est la somme</b> des quatre nombres du 2<sup>e</sup> niveau ?`,
      reponse: `À droite : 0,3 et 0,7, puis 0,5 et 0,5. Chaque paire fait 1.<br>0,3 + 0,7 + 0,5 + 0,5 = <span class="big">2</span>, quels que soient les nombres.`,
      consigne: "Quelle est la somme des quatre probabilités du 2e niveau de l'arbre ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: jouets,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le conservatoire",
      sorte: "piege",
      question: `Au concours d'un conservatoire, 35 % des candidats sont pianistes (P).<br>14 % de <b>tous</b> les candidats sont des pianistes admis.<br><br><b>Quel nombre</b> écrire sur la branche « P → admis » ?`,
      reponse: `Sur la branche, on écrit une probabilité <b>sachant P</b>, pas 0,14 !<br>0,35 × ? = 0,14, donc ? = 0,14 ÷ 0,35 = <span class="big">0,4</span>. 40 % des pianistes sont admis.`,
      consigne: "35 % de pianistes ; 14 % de tous les candidats sont des pianistes admis : quel nombre sur la branche « P → admis » ?",
      verification: { type: "qcm", choix: ["0,14", "0,49", "0,4"], bonne: 2 },
      dessin: conservatoire,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'école de surf",
      sorte: "defi",
      question: `Dans une école de surf, 60 % des élèves sont débutants (D). La moitié des débutants tombent au premier essai (T).<br>En tout, 38 % des élèves tombent.<br><br><b>Quelle est la probabilité</b> qu'un élève confirmé tombe ?`,
      reponse: `Chemin D puis T : 0,6 × 0,5 = 0,3. Il reste 0,38 − 0,3 = 0,08 pour le chemin « non D puis T ».<br>0,4 × ? = 0,08, donc ? = <span class="big">0,2</span>.`,
      consigne: "P(D) = 0,6, P sachant D de T = 0,5, P(T) = 0,38 : quelle probabilité qu'un confirmé tombe ?",
      verification: { type: "courte", attendus: ["0,2", "0.2", "20%"] },
      dessin: surf,
    },
  ],
};

export default problemes;
