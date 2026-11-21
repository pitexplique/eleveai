// Énigmes à projeter — STMG (1re), notion espérance d'une variable aléatoire
// (la garantie du lave-vaisselle, le restaurant gastronomique, le gala de la
// salle d'escrime, l'auto-entrepreneur, piège de l'accordeur de pianos, défi
// du salon professionnel). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, r, svg, t } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

const coul = (i: number, j: number) => (j === 0 ? C.pale : C.craie);

const laveVaisselle = svg("Garantie du lave-vaisselle : coût 0 euro proba 0,8 ; 100 euros proba 0,15 ; 300 euros proba 0,05",
  tableau(40, 60, [130, 100, 100, 100], 60, [["coût", "0 €", "100 €", "300 €"], ["proba", "0,8", "0,15", "0,05"]], coul, 22) +
    t(240, 230, "X = coût des réparations", C.pale, 22) +
    t(240, 340, `E(X)${NB}?`, C.rose, 32));

const resto = svg("Restaurant gastronomique : tables absentes par soir ; 0 : 0,5 ; 1 : 0,3 ; 2 : 0,2 ; et sur 100 soirs ?",
  tableau(40, 60, [130, 100, 100, 100], 60, [["tables", 0, 1, 2], ["proba", "0,5", "0,3", "0,2"]], coul, 22) +
    t(240, 230, "X = tables absentes un soir", C.pale, 22) +
    t(240, 340, `et sur 100 soirs${NB}?`, C.rose, 28));

const escrime = svg("Gala de la salle d'escrime : gain net plus 4 euros proba 0,25 ; moins 2 euros proba 0,75",
  tableau(40, 60, [130, 130, 130], 60, [["gain net", "+ 4 €", "− 2 €"], ["proba", "0,25", "0,75"]], coul, 23) +
    t(240, 230, "mise : 2 € · lot : 6 €", C.pale, 22) +
    t(240, 340, `jeu équitable${NB}?`, C.rose, 30));

const auto = svg("Auto-entrepreneur : option A 500 euros sûrs ; option B 900 euros ou 200 euros, une chance sur deux",
  r(30, 60, 195, 160, C.bleu, 0.15, 3, 10) + t(127, 105, "option A", C.pale, 24) + t(127, 160, "500 €", C.craie, 32) + t(127, 195, "sûrs", C.pale, 20) +
    r(255, 60, 195, 160, C.jaune, 0.15, 3, 10) + t(352, 105, "option B", C.pale, 24) + t(352, 150, "900 € ou 200 €", C.craie, 22) + t(352, 190, "0,5 chacun", C.pale, 20) +
    t(240, 330, `la meilleure en moyenne${NB}?`, C.rose, 27));

const pianos = svg("Accordeur : pianos accordés par jour ; 1 : 0,2 ; 2 : 0,3 ; 3 : 0,5 ; Tom calcule 1 plus 2 plus 3 divisé par 3",
  tableau(40, 60, [130, 100, 100, 100], 60, [["pianos", 1, 2, 3], ["proba", "0,2", "0,3", "0,5"]], coul, 22) +
    t(240, 230, "Tom : « (1 + 2 + 3) ÷ 3 = 2 »", C.pale, 22) +
    t(240, 340, `E(X)${NB}?`, C.rose, 32));

const salon = svg("Salon professionnel : mise 1 euro, une chance sur 10 de gagner un bon d'achat ; quelle valeur pour un jeu équitable ?",
  r(70, 60, 340, 160, C.bleu, 0.15, 3, 10) +
    t(240, 110, "mise : 1 €", C.craie, 26) + t(240, 155, "gagner : 1 chance sur 10", C.craie, 24) + t(240, 198, "lot : un bon d'achat", C.craie, 24) +
    t(240, 330, `quelle valeur pour E = 0${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "va_esperance",
  titre: "Énigmes de l'espérance",
  description: "La garantie du lave-vaisselle, le restaurant gastronomique, le gala de la salle d'escrime, l'auto-entrepreneur, le piège de l'accordeur de pianos, le défi du salon professionnel : calculer E(X), la lire comme une moyenne sur beaucoup de répétitions, décider si un jeu est équitable et comparer deux options.",
  problemes: [
    {
      tag: "Énigme 1 · La garantie du lave-vaisselle",
      titre: "Calculer l'espérance",
      question: `Un vendeur de lave-vaisselle étudie ses réparations.<br>X est le coût des réparations pendant la garantie.<br><br><b>Combien vaut E(X)</b>, en euros ?`,
      reponse: `On multiplie chaque valeur par sa proba, puis on ajoute.<br>0 × 0,8 + 100 × 0,15 + 300 × 0,05 = 0 + 15 + 15 = <span class="big">30 €</span>.`,
      consigne: "Combien vaut E(X), en euros ?",
      verification: { type: "courte", attendus: ["30", "30 €", "30€", "30 euros"] },
      dessin: laveVaisselle,
    },
    {
      tag: "Énigme 2 · Le restaurant gastronomique",
      titre: "Interpréter l'espérance",
      question: `Un restaurant gastronomique note les tables réservées mais vides.<br>X est le nombre de tables absentes un soir.<br><br><b>Sur 100 soirs</b>, combien de tables absentes en tout, à peu près ?`,
      reponse: `E(X) = 0 × 0,5 + 1 × 0,3 + 2 × 0,2 = 0,7 table par soir, en moyenne.<br>Sur 100 soirs : 0,7 × 100 = <span class="big">environ 70 tables</span>.`,
      consigne: "Sur 100 soirs, combien de tables absentes ?",
      verification: { type: "qcm", choix: ["environ 70 tables", "environ 7 tables", "environ 0,7 table"], bonne: 0 },
      dessin: resto,
    },
    {
      tag: "Énigme 3 · Le gala de la salle d'escrime",
      titre: "Un jeu équitable ?",
      question: `Au gala d'une salle d'escrime, un jeu coûte 2 €.<br>On gagne un lot de 6 € avec la proba 0,25.<br>X est le gain net : + 4 € ou − 2 €.<br><br><b>Le jeu est-il équitable</b> ?`,
      reponse: `E(X) = 4 × 0,25 + (− 2) × 0,75 = 1 − 1,5 = − 0,5.<br><span class="big">Non : le joueur perd 0,50 € en moyenne</span>.<br>Équitable voudrait dire E(X) = 0.`,
      consigne: "Le jeu est-il équitable ?",
      verification: { type: "qcm", choix: ["oui, car E(X) = 0", "non, E(X) = − 0,5 € : le joueur perd en moyenne", "non, E(X) = 4 €"], bonne: 1 },
      dessin: escrime,
    },
    {
      tag: "Énigme 4 · L'auto-entrepreneur",
      titre: "Comparer deux options",
      question: `Une auto-entrepreneuse choisit entre deux contrats.<br>A : 500 € sûrs.<br>B : 900 € ou 200 €, avec la proba 0,5 chacun.<br><br><b>Quelle option rapporte le plus en moyenne</b> ?`,
      reponse: `Option B : 900 × 0,5 + 200 × 0,5 = 450 + 100 = 550 €.<br><span class="big">L'option B : 550 € en moyenne</span>.<br>Mais l'option A ne prend aucun risque.`,
      consigne: "Quelle option rapporte le plus en moyenne ?",
      verification: { type: "qcm", choix: ["l'option A : 500 € sûrs", "c'est pareil", "l'option B : 550 € en moyenne"], bonne: 2 },
      dessin: auto,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'accordeur de pianos",
      sorte: "piege",
      question: `Un accordeur de pianos note son travail.<br>X est le nombre de pianos accordés en un jour.<br>Tom calcule (1 + 2 + 3) ÷ 3 = 2.<br><br><b>Combien vaut E(X)</b> ?`,
      reponse: `Tom oublie les probabilités : 3 pianos arrive plus souvent.<br>1 × 0,2 + 2 × 0,3 + 3 × 0,5 = 0,2 + 0,6 + 1,5 = <span class="big">2,3</span>.<br>2,3 pianos par jour en moyenne.`,
      consigne: "Combien vaut E(X) ?",
      verification: { type: "courte", attendus: ["2,3", "2.3", "2,30"] },
      dessin: pianos,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le salon professionnel",
      sorte: "defi",
      question: `Sur un salon professionnel, un exposant propose un jeu à 1 €.<br>On gagne un bon d'achat avec la proba 0,1.<br><br><b>Combien doit valoir le bon</b> pour que le jeu soit équitable ?`,
      reponse: `Si le bon vaut b, le gagnant gagne b − 1 et le perdant perd 1.<br>E = 0,1 × (b − 1) − 0,9 × 1 = 0,1b − 1 = 0.<br>b = <span class="big">10 €</span>.`,
      consigne: "Valeur du bon pour un jeu équitable ?",
      verification: { type: "courte", attendus: ["10", "10 €", "10€", "10 euros"] },
      dessin: salon,
    },
  ],
};

export default problemes;
