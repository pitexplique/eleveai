// Énigmes à projeter — STMG (1re), notion fonctions en Python (le cabinet de
// sophrologie, la conciergerie, le mareyeur, le rémouleur, piège de
// l'esthéticienne, défi de l'horticulteur). 21/11/2026. Le programme Python
// est dans le dessin.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { code } from "../dessins-2de";

const sophro = svg("Sophrologie : def tarif(n) renvoie 45 fois n ; que représente n ?",
  code([["def tarif(n):", 0], ["return 45 * n", 1]], { y: 50, pas: 50, taille: 27 }) +
    t(240, 230, "n : nombre de séances ou prix ?", C.pale, 23) +
    t(240, 320, `que représente n${NB}?`, C.rose, 30));

const conciergerie = svg("Conciergerie : def frais(h) renvoie 15 fois h plus 5 ; quelle est la somme fixe ?",
  code([["def frais(h):", 0], ["return 15 * h + 5", 1]], { y: 50, pas: 50, taille: 27 }) +
    t(240, 230, "h : nombre d'heures de service", C.pale, 23) +
    t(240, 320, `somme fixe${NB}?`, C.rose, 30));

const mareyeur = svg("Mareyeur : def prix(kg) ; si kg supérieur ou égal à 10, renvoie 7 fois kg ; sinon renvoie 9 fois kg ; afficher prix(12)",
  code([["def prix(kg):", 0], ["if kg >= 10:", 1], ["return 7 * kg", 2], ["else:", 1], ["return 9 * kg", 2], ["print(prix(12))", 0]], { y: 20, pas: 44, taille: 25 }) +
    t(240, 360, `qu'affiche le programme${NB}?`, C.rose, 27));

const remouleur = svg("Rémouleur : def prix(n) renvoie 6 fois n ; def total(n) renvoie prix(n) plus 10 ; afficher total(5)",
  code([["def prix(n):", 0], ["return 6 * n", 1], ["def total(n):", 0], ["return prix(n) + 10", 1], ["print(total(5))", 0]], { y: 30, pas: 46, taille: 25 }) +
    t(240, 350, `qu'affiche le programme${NB}?`, C.rose, 27));

const estheticienne = svg("Esthéticienne : n = 3 ; def duree(n) renvoie 40 fois n ; afficher duree(2) ; Tom répond 120",
  code([["n = 3", 0], ["def duree(n):", 0], ["return 40 * n", 1], ["print(duree(2))", 0]], { y: 30, pas: 46, taille: 26 }) +
    t(240, 290, "Tom : « ça affiche 120 »", C.pale, 23) +
    t(240, 360, `qu'affiche le programme${NB}?`, C.rose, 27));

const horticulteur = svg("Horticulteur : def plants(j) ; p = 10 ; pour k dans range(j), p = p fois 2 ; renvoie p ; afficher plants(3)",
  code([["def plants(j):", 0], ["p = 10", 1], ["for k in range(j):", 1], ["p = p * 2", 2], ["return p", 1], ["print(plants(3))", 0]], { y: 20, pas: 44, taille: 25 }) +
    t(240, 360, `qu'affiche le programme${NB}?`, C.rose, 27));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "algo_fonctions",
  titre: "Énigmes des fonctions en Python",
  description: "Le cabinet de sophrologie, la conciergerie, le mareyeur, le rémouleur, le piège de l'esthéticienne, le défi de l'horticulteur : repérer l'entrée et la sortie d'une fonction, lire sa définition, calculer la valeur renvoyée par un appel.",
  problemes: [
    {
      tag: "Énigme 1 · Le cabinet de sophrologie",
      titre: "Entrée et sortie",
      question: `Un cabinet de sophrologie fait payer 45 € la séance.<br>La fonction tarif renvoie le prix à payer.<br><br><b>Que représente n</b> ?`,
      reponse: `n est l'entrée : le <span class="big">nombre de séances</span>.<br>La sortie, c'est 45 × n : le prix à payer.`,
      consigne: "Que représente n ?",
      verification: { type: "qcm", choix: ["Le nombre de séances", "Le prix à payer", "Le prix d'une séance"], bonne: 0 },
      dessin: sophro,
    },
    {
      tag: "Énigme 2 · La conciergerie",
      titre: "Lire une définition",
      question: `Une conciergerie facture ses heures de service.<br>Elle ajoute une somme fixe pour le déplacement.<br><br><b>Combien coûte le déplacement</b> ?`,
      reponse: `Chaque heure coûte 15 €.<br>Le + 5 ne dépend pas de h : c'est la somme fixe.<br>Le déplacement coûte <span class="big">5 €</span>.`,
      consigne: "Combien coûte le déplacement (en €) ?",
      verification: { type: "courte", attendus: ["5", "5 €", "5 euros"] },
      dessin: conciergerie,
    },
    {
      tag: "Énigme 3 · Le mareyeur",
      titre: "Un appel de fonction",
      question: `Un mareyeur vend du poisson aux restaurants.<br>Dès 10 kg, le kilo passe à 7 € au lieu de 9 €.<br>Un restaurant prend 12 kg.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `12 est supérieur ou égal à 10 : la fonction renvoie 7 × 12.<br>Le programme affiche <span class="big">84</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "qcm", choix: ["108", "84", "12"], bonne: 1 },
      dessin: mareyeur,
    },
    {
      tag: "Énigme 4 · Le rémouleur",
      titre: "Une fonction dans une fonction",
      question: `Un rémouleur aiguise les couteaux à 6 € pièce.<br>Il ajoute 10 € de déplacement.<br>Un boucher lui confie 5 couteaux.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `prix(5) = 6 × 5 = 30.<br>total(5) = 30 + 10 = <span class="big">40</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "courte", attendus: ["40", "40 €"] },
      dessin: remouleur,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'esthéticienne",
      sorte: "piege",
      question: `Une esthéticienne compte 40 minutes par soin.<br>Elle a 3 rendez-vous dans la journée.<br>Tom dit que le programme affiche 120.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `L'appel duree(2) donne n = 2 dans la fonction.<br>Le n = 3 du début ne sert pas ici.<br>Le programme affiche 40 × 2 = <span class="big">80</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "courte", attendus: ["80"] },
      dessin: estheticienne,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'horticulteur",
      sorte: "defi",
      question: `Un horticulteur a 10 boutures.<br>Chaque jour, leur nombre double.<br>j compte les jours.<br><br><b>Qu'affiche le programme</b> ?`,
      reponse: `range(3) fait 3 tours : p vaut 20, 40, puis 80.<br>Le programme affiche <span class="big">80</span>.`,
      consigne: "Qu'affiche le programme ?",
      verification: { type: "qcm", choix: ["30", "60", "80"], bonne: 2 },
      dessin: horticulteur,
    },
  ],
};

export default problemes;
