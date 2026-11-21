// Énigmes à projeter — terminale spé maths, notion probabilite_conditionnelle
// (le fabricant de meubles en kit, le concert de rap, le Grand Raid (974), le
// filtre anti-spam, piège des grands chefs, défi du portique antivol). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o } from "../dessins-ecole";
import { arbre2 } from "../dessins-2de";
import { frac } from "../outils";

const meubles = svg("Arbre pondéré : vis du fournisseur A avec probabilité 0,7, du fournisseur B avec 0,3 ; défectueuses 0,02 chez A et 0,05 chez B",
  arbre2([["A", "0,7"], ["B", "0,3"]], [[["D", "0,02"], ["D̄", "0,98"]], [["D", "0,05"], ["D̄", "0,95"]]]) +
    t(240, 395, `P(A ∩ D)${NB}?`, C.rose, 28));

const concert = svg("Au concert : 40 % des spectateurs ont le t-shirt du groupe, 10 % ont le t-shirt et la casquette",
  r(40, 50, 400, 260, C.pale, 0.05, 3, 12) + o(190, 180, 105, C.bleu, 0.2, 4) + o(300, 180, 80, C.jaune, 0.2, 4) +
    t(140, 185, "T : 40 %", C.bleu, 24) + t(258, 188, "10 %", C.craie, 22) + t(300, 88, "casquette", C.jaune, 18) +
    t(240, 385, `P sachant T de la casquette${NB}?`, C.rose, 22));

const raid = svg("Arbre pondéré du Grand Raid : 0,6 de coureurs réunionnais, qui finissent avec 0,7 ; 0,4 venus d'ailleurs, qui finissent avec 0,5",
  arbre2([["R", "0,6"], ["R̄", "0,4"]], [[["F", "0,7"], ["F̄", "0,3"]], [["F", "0,5"], ["F̄", "0,5"]]]) +
    t(240, 395, `P(F)${NB}?`, C.rose, 28));

const spam = svg("Arbre pondéré du filtre : 0,3 de spams, détectés avec 0,95 ; 0,7 de mails normaux, marqués par erreur avec 0,02",
  arbre2([["S", "0,3"], ["S̄", "0,7"]], [[["M", "0,95"], ["M̄", "0,05"]], [["M", "0,02"], ["M̄", "0,98"]]]) +
    t(240, 395, `P sachant M de S${NB}?`, C.rose, 26));

const chefs = svg("Deux probabilités qu'on confond : 80 % des grands chefs sont passés par une école hôtelière ; mais parmi les élèves d'école hôtelière, combien deviennent grands chefs ?",
  r(40, 50, 400, 110, C.bleu, 0.1, 3, 12) + t(240, 95, "parmi les grands chefs :", C.pale, 20) + t(240, 138, "80 % d'école hôtelière", C.bleu, 26) +
    r(40, 190, 400, 110, C.jaune, 0.1, 3, 12) + t(240, 235, "parmi les élèves d'école hôtelière :", C.pale, 20) + t(240, 278, "grands chefs : ?", C.jaune, 26) +
    t(240, 380, `Sami a-t-il raison${NB}?`, C.rose, 26));

const portique = svg("Arbre pondéré du portique : 0,01 de voleurs, qui font sonner avec 0,99 ; 0,99 de clients honnêtes, qui font sonner avec 0,01",
  arbre2([["V", "0,01"], ["V̄", "0,99"]], [[["S", "0,99"], ["S̄", "0,01"]], [["S", "0,01"], ["S̄", "0,99"]]]) +
    t(240, 395, `ça sonne : P(V)${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "probabilite_conditionnelle",
  titre: "Énigmes des probabilités conditionnelles",
  description: "Le fabricant de meubles en kit, le concert de rap, le Grand Raid, le filtre anti-spam, le piège des grands chefs, le défi du portique antivol : arbre pondéré, probabilité conditionnelle, probabilités totales, inverser un conditionnement.",
  problemes: [
    {
      tag: "Énigme 1 · Le fabricant de meubles en kit",
      titre: "Lire un arbre pondéré",
      question: `Un fabricant de meubles achète 70 % de ses vis chez A, le reste chez B. 2 % des vis de A sont défectueuses, 5 % de celles de B.<br><br><b>Quelle est la probabilité</b> qu'une vis vienne de A et soit défectueuse ?`,
      reponse: `On suit la branche A puis D : on multiplie.<br>P(A ∩ D) = 0,7 × 0,02 = <span class="big">0,014</span>.`,
      consigne: "P(A) = 0,7 et P sachant A de D = 0,02 : que vaut P(A ∩ D) ?",
      verification: { type: "courte", attendus: ["0,014", "0.014", "1,4%", "1.4%"] },
      dessin: meubles,
    },
    {
      tag: "Énigme 2 · Le concert de rap",
      titre: "Calculer P sachant A",
      question: `À un concert de rap, 40 % des spectateurs portent le t-shirt du groupe et 10 % portent le t-shirt et la casquette.<br><br><b>Parmi ceux qui ont le t-shirt</b>, quelle est la probabilité d'avoir la casquette ?`,
      reponse: `P<sub>T</sub>(C) = ${frac("P(T ∩ C)", "P(T)")} = ${frac("0,10", "0,40")}.<br>P<sub>T</sub>(C) = <span class="big">0,25</span> : un porteur de t-shirt sur quatre.`,
      consigne: "P(T) = 0,4 et P(T ∩ C) = 0,1 : que vaut P sachant T de C ?",
      verification: { type: "qcm", choix: ["0,25", "0,1", "0,4"], bonne: 0 },
      dessin: concert,
    },
    {
      tag: "Énigme 3 · Le Grand Raid",
      titre: "Les probabilités totales",
      question: `À La Réunion, 60 % des coureurs du Grand Raid sont réunionnais ; 70 % d'entre eux finissent la course. Parmi les autres, 50 % finissent.<br><br><b>Quelle est la probabilité</b> qu'un coureur finisse ?`,
      reponse: `F se partage en deux branches : P(F) = P(R ∩ F) + P(R̄ ∩ F).<br>P(F) = 0,6 × 0,7 + 0,4 × 0,5 = 0,42 + 0,2 = <span class="big">0,62</span>.`,
      consigne: "P(R) = 0,6, P sachant R de F = 0,7, P sachant R̄ de F = 0,5 : que vaut P(F) ?",
      verification: { type: "courte", attendus: ["0,62", "0.62", "62%"] },
      dessin: raid,
    },
    {
      tag: "Énigme 4 · Le filtre anti-spam",
      titre: "Inverser le conditionnement",
      question: `30 % des mails reçus sont des spams. Le filtre en marque 95 %. Il marque aussi, par erreur, 2 % des mails normaux.<br><br><b>Un mail est marqué</b> : quelle est la probabilité que ce soit un spam ?`,
      reponse: `P(M) = 0,3 × 0,95 + 0,7 × 0,02 = 0,285 + 0,014 = 0,299.<br>P<sub>M</sub>(S) = ${frac("0,285", "0,299")} ≈ <span class="big">0,95</span>.`,
      consigne: "P(S) = 0,3, P sachant S de M = 0,95, P sachant S̄ de M = 0,02 : que vaut P sachant M de S (à 0,01 près) ?",
      verification: { type: "courte", attendus: ["0,95", "0.95", "0,953", "0.953", "95%"] },
      dessin: spam,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les grands chefs",
      sorte: "piege",
      question: `80 % des grands chefs sont passés par une école hôtelière. Sami y entre : « J'ai donc 80 % de chances de devenir un grand chef. »<br><br><b>A-t-il raison</b> ?`,
      reponse: `80 %, c'est P<sub>Chef</sub>(École). Sami parle de P<sub>École</sub>(Chef) : ce n'est pas la même chose.<br><span class="big">On ne peut pas le savoir</span> avec ce 80 % : il faut savoir combien d'élèves deviennent chefs, et ils sont très peu.`,
      consigne: "On sait P sachant Chef de École = 0,8. Que peut-on dire de P sachant École de Chef ?",
      verification: { type: "qcm", choix: ["Elle vaut aussi 0,8", "On ne peut pas la connaître avec ces données", "Elle vaut 0,2"], bonne: 1 },
      dessin: chefs,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le portique antivol",
      sorte: "defi",
      question: `1 % des clients d'un magasin sont des voleurs. Le portique sonne pour 99 % des voleurs, mais aussi pour 1 % des clients honnêtes.<br><br><b>Le portique sonne</b> : quelle est la probabilité que ce soit un voleur ?`,
      reponse: `P(S) = 0,01 × 0,99 + 0,99 × 0,01 = 0,0099 + 0,0099 = 0,0198.<br>P<sub>S</sub>(V) = ${frac("0,0099", "0,0198")} = <span class="big">0,5</span> : une chance sur deux seulement, car les honnêtes sont 99 fois plus nombreux.`,
      consigne: "P(V) = 0,01, P sachant V de S = 0,99, P sachant V̄ de S = 0,01 : que vaut P sachant S de V ?",
      verification: { type: "qcm", choix: ["0,99", "0,01", "0,5"], bonne: 2 },
      dessin: portique,
    },
  ],
};

export default problemes;
