// « Cartes défis · Vers la 5e » — révision 6e → entrée en 5e (~11-12 ans).
// 4 questions encadrées avec picto (mix scolaire + SPORT + NUTRITION à fond,
// mission anti-diabète 974) + « Sport du jour ».
// NOTE : les 30 cartes sont en cours de rédaction (rédacteur), à intégrer ici.

import type { CarteDefi } from "@/components/cartes/types";

export const CARTES: CarteDefi[] = [
  {
    ref: "5E·01",
    questions: [
      { matiere: "nutrition", q: "Combien de fruits et légumes par jour ?", r: "5" },
      { matiere: "sport", q: "Que faire avant l'effort pour éviter les blessures ?", r: "s'échauffer" },
      { matiere: "maths", q: "Calcule : 1/2 + 1/2", r: "1" },
      { matiere: "francais", q: "Conjugue « aller » au présent (je) ?", r: "je vais" },
    ],
    bouge: "20 sauts sur place",
  },
  {
    ref: "5E·02",
    questions: [
      { matiere: "nutrition", q: "Quelle boisson est la meilleure pour s'hydrater ?", r: "l'eau 💧" },
      { matiere: "sport", q: "Combien d'heures de sommeil pour un ado de 12 ans ?", r: "9 à 10 h 😴" },
      { matiere: "maths", q: "Périmètre d'un carré de côté 5 cm ?", r: "20 cm" },
      { matiere: "anglais", q: "Traduis « I have a cat »", r: "j'ai un chat" },
    ],
    bouge: "gainage 20 s",
  },
  {
    ref: "5E·03",
    questions: [
      { matiere: "nutrition", q: "Un letchi péi, c'est un fruit ou un légume ?", r: "un fruit 🍒" },
      { matiere: "sport", q: "Cite un sport où on tape dans un ballon au pied.", r: "le football" },
      { matiere: "francais", q: "« a » ou « à » : « il va ___ l'école »", r: "à" },
      { matiere: "geo", q: "La Réunion est dans quel océan ?", r: "l'océan Indien" },
    ],
    bouge: "10 fentes",
  },
  {
    ref: "5E·04",
    questions: [
      { matiere: "nutrition", q: "Ah bon ?! Combien de morceaux de sucre dans une canette de soda ?", r: "environ 7" },
      { matiere: "sport", q: "Pourquoi boire de l'eau pendant le sport ?", r: "pour s'hydrater" },
      { matiere: "maths", q: "Calcule : 3 × 4 + 2", r: "14" },
      { matiere: "sciences", q: "Quel organe sert à respirer ?", r: "les poumons" },
    ],
    bouge: "15 jumping jacks",
  },
  {
    ref: "5E·05",
    questions: [
      { matiere: "nutrition", q: "Cite un fruit jaune sucré de La Réunion.", r: "l'ananas Victoria 🍍" },
      { matiere: "sport", q: "Combien de joueurs de foot sur le terrain par équipe ?", r: "11" },
      { matiere: "maths", q: "Écris 1/4 en nombre décimal.", r: "0,25" },
      { matiere: "histoire", q: "Qui construisait les pyramides ?", r: "les Égyptiens" },
    ],
    bouge: "cours sur place 20 s 🏃",
  },
  {
    ref: "5E·06",
    questions: [
      { matiere: "nutrition", q: "Faut-il sauter le petit-déjeuner le matin ?", r: "non, il est important" },
      { matiere: "sport", q: "Quel sport se joue avec une raquette et un filet ?", r: "le tennis" },
      { matiere: "francais", q: "Un synonyme de « content » ?", r: "heureux" },
      { matiere: "anglais", q: "Traduis « apple »", r: "pomme" },
    ],
    bouge: "20 sauts sur place",
  },
  {
    ref: "5E·07",
    questions: [
      { matiere: "nutrition", q: "Ah bon ?! Un jus de fruits industriel a-t-il beaucoup de sucre ?", r: "oui, beaucoup" },
      { matiere: "sport", q: "Que muscle-t-on en courant longtemps ?", r: "le cœur (endurance)" },
      { matiere: "maths", q: "Aire d'un rectangle 4 cm × 3 cm ?", r: "12 cm²" },
      { matiere: "geo", q: "Cite un océan de la planète.", r: "l'océan Atlantique" },
    ],
    bouge: "gainage 20 s",
  },
  {
    ref: "5E·08",
    questions: [
      { matiere: "nutrition", q: "Pour un goûter sain : un fruit ou des bonbons ?", r: "un fruit 🍎" },
      { matiere: "sport", q: "Vrai ou faux : dormir aide à mieux courir.", r: "vrai" },
      { matiere: "francais", q: "Conjugue « être » à l'imparfait (il) ?", r: "il était" },
      { matiere: "sciences", q: "L'eau bout à quelle température ?", r: "100 °C" },
    ],
    bouge: "10 fentes",
  },
  {
    ref: "5E·09",
    questions: [
      { matiere: "nutrition", q: "La mangue péi est riche en quelle vitamine ?", r: "la vitamine C 🥭" },
      { matiere: "sport", q: "Comment appelle-t-on le fait de s'étirer après le sport ?", r: "les étirements" },
      { matiere: "maths", q: "Calcule : 10 − 2 × 3", r: "4" },
      { matiere: "anglais", q: "Traduis « She is happy »", r: "elle est heureuse" },
    ],
    bouge: "15 jumping jacks",
  },
  {
    ref: "5E·10",
    questions: [
      { matiere: "nutrition", q: "Ah bon ?! Trop de sucre longtemps peut donner quelle maladie ?", r: "le diabète" },
      { matiere: "sport", q: "Cite un sport qu'on pratique dans l'eau.", r: "la natation" },
      { matiere: "francais", q: "« et » ou « est » : « il ___ grand »", r: "est" },
      { matiere: "histoire", q: "Comment appelle-t-on l'écriture des Égyptiens ?", r: "les hiéroglyphes" },
    ],
    bouge: "cours sur place 20 s 🏃",
  },
  {
    ref: "5E·11",
    questions: [
      { matiere: "nutrition", q: "Une assiette équilibrée : légumes, féculents et… ?", r: "des protéines" },
      { matiere: "sport", q: "Pourquoi s'échauffer avant de courir ?", r: "préparer les muscles" },
      { matiere: "maths", q: "La moitié de 50 ?", r: "25" },
      { matiere: "geo", q: "Quelle est la capitale de la France ?", r: "Paris" },
    ],
    bouge: "20 sauts sur place",
  },
  {
    ref: "5E·12",
    questions: [
      { matiere: "nutrition", q: "Eau ou soda pour la santé des dents ?", r: "l'eau 💧" },
      { matiere: "sport", q: "Combien de temps de sport par jour conseillé à un ado ?", r: "environ 1 h" },
      { matiere: "francais", q: "Trouve le COD : « Je mange une pomme ».", r: "une pomme" },
      { matiere: "anglais", q: "Traduis « water »", r: "l'eau" },
    ],
    bouge: "gainage 20 s",
  },
  {
    ref: "5E·13",
    questions: [
      { matiere: "nutrition", q: "Cite un fruit rouge et sucré de saison à La Réunion.", r: "le letchi 🍒" },
      { matiere: "sport", q: "Vrai ou faux : il faut boire même sans soif pendant l'effort.", r: "vrai" },
      { matiere: "maths", q: "Calcule : 2/3 de 9", r: "6" },
      { matiere: "sciences", q: "Le Soleil est une étoile ou une planète ?", r: "une étoile ☀️" },
    ],
    bouge: "10 fentes",
  },
  {
    ref: "5E·14",
    questions: [
      { matiere: "nutrition", q: "Un jus « 100 % pur jus » : combien de verres max par jour ?", r: "1 verre" },
      { matiere: "sport", q: "Quel sport se joue avec un panier en hauteur ?", r: "le basket" },
      { matiere: "francais", q: "Conjugue « manger » au futur (je) ?", r: "je mangerai" },
      { matiere: "geo", q: "Combien y a-t-il de continents ?", r: "6 (ou 7)" },
    ],
    bouge: "15 jumping jacks",
  },
  {
    ref: "5E·15",
    questions: [
      { matiere: "nutrition", q: "Manger vite ou prendre son temps pour mieux digérer ?", r: "prendre son temps" },
      { matiere: "sport", q: "Comment bat le cœur pendant un effort ?", r: "plus vite" },
      { matiere: "maths", q: "Écris 0,5 en fraction.", r: "1/2" },
      { matiere: "anglais", q: "Traduis « I run »", r: "je cours" },
    ],
    bouge: "cours sur place 20 s 🏃",
  },
  {
    ref: "5E·16",
    questions: [
      { matiere: "nutrition", q: "Le sucre caché : où en trouve-t-on beaucoup sans le voir ?", r: "dans les sodas" },
      { matiere: "sport", q: "Cite un sport collectif avec un ballon ovale.", r: "le rugby" },
      { matiere: "francais", q: "« ou » ou « où » : « ___ vas-tu ? »", r: "où" },
      { matiere: "histoire", q: "Dans quel pays vivaient les pharaons ?", r: "en Égypte" },
    ],
    bouge: "20 sauts sur place",
  },
  {
    ref: "5E·17",
    questions: [
      { matiere: "nutrition", q: "Un fruit entier ou un jus : lequel garde le plus de fibres ?", r: "le fruit entier" },
      { matiere: "sport", q: "Pourquoi le sommeil est important pour le sport ?", r: "pour récupérer" },
      { matiere: "maths", q: "Calcule : 7 × 8", r: "56" },
      { matiere: "sciences", q: "Quand le sucre se mélange à l'eau, on dit qu'il… ?", r: "se dissout" },
    ],
    bouge: "gainage 20 s",
  },
  {
    ref: "5E·18",
    questions: [
      { matiere: "nutrition", q: "Combien de repas principaux par jour en général ?", r: "3" },
      { matiere: "sport", q: "Quel muscle travaille-t-on avec le gainage ?", r: "les abdos" },
      { matiere: "francais", q: "Un antonyme de « rapide » ?", r: "lent" },
      { matiere: "anglais", q: "Traduis « banana »", r: "banane" },
    ],
    bouge: "10 fentes",
  },
  {
    ref: "5E·19",
    questions: [
      { matiere: "nutrition", q: "Ah bon ?! Une barre chocolatée a-t-elle beaucoup de sucre ?", r: "oui, beaucoup" },
      { matiere: "sport", q: "Vrai ou faux : marcher est déjà une activité physique.", r: "vrai" },
      { matiere: "maths", q: "Périmètre d'un rectangle 6 cm × 2 cm ?", r: "16 cm" },
      { matiere: "geo", q: "La Réunion est un département de quel pays ?", r: "la France" },
    ],
    bouge: "15 jumping jacks",
  },
  {
    ref: "5E·20",
    questions: [
      { matiere: "nutrition", q: "Les légumes verts sont-ils bons pour la santé ?", r: "oui 🥦" },
      { matiere: "sport", q: "Quel sport se joue avec un volant et une raquette ?", r: "le badminton" },
      { matiere: "francais", q: "Conjugue « avoir » au passé composé (j') ?", r: "j'ai eu" },
      { matiere: "sciences", q: "Combien de dents de lait environ chez l'enfant ?", r: "20" },
    ],
    bouge: "cours sur place 20 s 🏃",
  },
  {
    ref: "5E·21",
    questions: [
      { matiere: "nutrition", q: "Un bon petit-déj : céréales, fruit et… ?", r: "un produit laitier 🥛" },
      { matiere: "sport", q: "Pourquoi ne pas manger juste avant de courir ?", r: "pour éviter d'avoir mal au ventre" },
      { matiere: "maths", q: "Calcule : 100 ÷ 4", r: "25" },
      { matiere: "anglais", q: "Traduis « to eat »", r: "manger" },
    ],
    bouge: "20 sauts sur place",
  },
  {
    ref: "5E·22",
    questions: [
      { matiere: "nutrition", q: "Ah bon ?! L'eau contient-elle du sucre ?", r: "non, zéro sucre" },
      { matiere: "sport", q: "Cite une bonne habitude pour la santé.", r: "bouger chaque jour" },
      { matiere: "francais", q: "Quelle figure : « rapide comme l'éclair » ?", r: "une comparaison" },
      { matiere: "geo", q: "Le plus grand océan du monde ?", r: "le Pacifique" },
    ],
    bouge: "gainage 20 s",
  },
  {
    ref: "5E·23",
    questions: [
      { matiere: "nutrition", q: "Pour tenir toute la matinée en classe, faut-il petit-déjeuner ?", r: "oui" },
      { matiere: "sport", q: "Quand on court, on respire plus vite ou plus lentement ?", r: "plus vite" },
      { matiere: "maths", q: "Calcule : 1/3 + 1/3", r: "2/3" },
      { matiere: "histoire", q: "Cite un peuple de l'Antiquité.", r: "les Romains" },
    ],
    bouge: "10 fentes",
  },
  {
    ref: "5E·24",
    questions: [
      { matiere: "nutrition", q: "Cite un fruit de La Réunion (autre que le letchi).", r: "la goyave (ou la mangue)" },
      { matiere: "sport", q: "Quel sport se pratique sur un vélo ?", r: "le cyclisme 🚲" },
      { matiere: "francais", q: "Trouve le COD : « Il regarde la télé ».", r: "la télé" },
      { matiere: "anglais", q: "Traduis « She has a bike »", r: "elle a un vélo" },
    ],
    bouge: "15 jumping jacks",
  },
  {
    ref: "5E·25",
    questions: [
      { matiere: "nutrition", q: "Bonbons tous les jours ou de temps en temps ?", r: "de temps en temps" },
      { matiere: "sport", q: "Vrai ou faux : le sport rend de bonne humeur.", r: "vrai 😄" },
      { matiere: "maths", q: "Aire d'un carré de côté 4 cm ?", r: "16 cm²" },
      { matiere: "sciences", q: "Que rejette-t-on quand on expire ?", r: "du gaz carbonique (CO₂)" },
    ],
    bouge: "cours sur place 20 s 🏃",
  },
  {
    ref: "5E·26",
    questions: [
      { matiere: "nutrition", q: "Ah bon ?! Un yaourt aux fruits peut cacher combien de sucres ?", r: "plusieurs morceaux" },
      { matiere: "sport", q: "Quel sport se joue à 6 contre 6 avec un filet haut ?", r: "le volley" },
      { matiere: "francais", q: "Conjugue « finir » au présent (ils) ?", r: "ils finissent" },
      { matiere: "geo", q: "Cite une île proche de La Réunion.", r: "Maurice" },
    ],
    bouge: "20 sauts sur place",
  },
  {
    ref: "5E·27",
    questions: [
      { matiere: "nutrition", q: "Un fruit péi plutôt qu'un gâteau : bonne idée ?", r: "oui" },
      { matiere: "sport", q: "Comment appelle-t-on un effort long comme la course à pied ?", r: "l'endurance" },
      { matiere: "maths", q: "Calcule : 5 × 6 − 10", r: "20" },
      { matiere: "anglais", q: "Traduis « milk »", r: "le lait" },
    ],
    bouge: "gainage 20 s",
  },
  {
    ref: "5E·28",
    questions: [
      { matiere: "nutrition", q: "Pour bien grandir, faut-il manger varié ?", r: "oui" },
      { matiere: "sport", q: "Que porter aux pieds pour courir en sécurité ?", r: "des baskets 👟" },
      { matiere: "francais", q: "Un synonyme de « grand » ?", r: "immense" },
      { matiere: "sciences", q: "Quelle planète habitons-nous ?", r: "la Terre 🌍" },
    ],
    bouge: "10 fentes",
  },
  {
    ref: "5E·29",
    questions: [
      { matiere: "nutrition", q: "Ah bon ?! Pain complet ou pain blanc : lequel fait tenir plus longtemps ?", r: "le pain complet" },
      { matiere: "sport", q: "Cite un sport où on lance et attrape un ballon à la main.", r: "le handball" },
      { matiere: "maths", q: "Combien d'axes de symétrie a un carré ?", r: "4" },
      { matiere: "histoire", q: "Les Gaulois vivaient dans quel pays actuel ?", r: "la France" },
    ],
    bouge: "15 jumping jacks",
  },
  {
    ref: "5E·30",
    questions: [
      { matiere: "nutrition", q: "Le meilleur réflexe quand on a soif : eau ou soda ?", r: "l'eau 💧" },
      { matiere: "sport", q: "Après le sport, que faire pour récupérer ?", r: "bien dormir et s'hydrater" },
      { matiere: "francais", q: "Conjugue « chanter » à l'imparfait (je) ?", r: "je chantais" },
      { matiere: "anglais", q: "Traduis « I am strong »", r: "je suis fort(e)" },
    ],
    bouge: "20 sauts sur place",
  },
];
