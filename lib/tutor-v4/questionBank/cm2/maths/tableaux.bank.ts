// lib/tutor-v4/question-banks/maths/cm2/tableaux.bank.ts

import type {
  TutorBankItemV4,
  TableauDonneesCanvasData,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function tableauCanvas(
  data: Omit<TableauDonneesCanvasData, "kind">
): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    ...data,
  };
}

// ============================================================
// HELPERS CANVAS
// ============================================================

function tableauFruitsReunionCanvas(
  highlight?: TableauDonneesCanvasData["highlight"]
): TableauDonneesCanvasData {
  return tableauCanvas({
    title: "Fruits vendus au marché",
    headers: ["Lundi", "Mardi", "Mercredi"],
    rows: [
      {
        label: "Ananas",
        values: [18, 24, 20],
      },
      {
        label: "Bananes",
        values: [30, 28, 35],
      },
      {
        label: "Mangues",
        values: [12, 15, 18],
      },
    ],
    highlight,
    caption: "Nombre de fruits vendus",
    display: {
      compact: false,
      striped: true,
    },
  });
}

function tableauSportCanvas(
  highlight?: TableauDonneesCanvasData["highlight"]
): TableauDonneesCanvasData {
  return tableauCanvas({
    title: "Activités choisies par les élèves",
    headers: ["Football", "Danse", "Natation", "Basket"],
    rows: [
      {
        label: "Nombre d’élèves",
        values: [12, 9, 7, 10],
      },
    ],
    highlight,
    caption: "Enquête dans une classe de CM2",
    display: {
      compact: false,
      striped: true,
    },
  });
}

function tableauBibliothequeCanvas(
  highlight?: TableauDonneesCanvasData["highlight"]
): TableauDonneesCanvasData {
  return tableauCanvas({
    title: "Livres lus pendant le mois",
    headers: ["Romans", "BD", "Mangas", "Documentaires"],
    rows: [
      {
        label: "Nombre de livres",
        values: [14, 22, 18, 9],
      },
    ],
    highlight,
    caption: "Lecture des élèves",
    display: {
      compact: false,
      striped: true,
    },
  });
}

function tableauMeteoCanvas(
  highlight?: TableauDonneesCanvasData["highlight"]
): TableauDonneesCanvasData {
  return tableauCanvas({
    title: "Températures relevées",
    headers: ["Lundi", "Mardi", "Mercredi", "Jeudi"],
    rows: [
      {
        label: "Température",
        values: ["25°C", "27°C", "26°C", "28°C"],
      },
    ],
    highlight,
    caption: "Température à midi",
    display: {
      compact: false,
      striped: true,
    },
  });
}

function tableauCantineCanvas(
  highlight?: TableauDonneesCanvasData["highlight"]
): TableauDonneesCanvasData {
  return tableauCanvas({
    title: "Menus choisis à la cantine",
    headers: ["Cari", "Rougail", "Salade", "Sandwich"],
    rows: [
      {
        label: "Nombre d’élèves",
        values: [16, 14, 8, 12],
      },
    ],
    highlight,
    caption: "Choix des élèves un vendredi",
    display: {
      compact: false,
      striped: true,
    },
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   ⭐ 20/10/2026 — DES SITUATIONS × DES TOURNURES, À CHAQUE ÉTOILE.
   Mesuré avant : 23 à 31 squelettes par micro, jusqu'à 18 répétitions sur 20
   (quatre tableaux figés : fruits, sport, livres, cantine). Chaque gabarit
   tire maintenant une SITUATION (une trentaine de relevés, chacun porté par
   un MÉTIER : biologiste, chauffeuse de car, météorologue, bibliothécaire…),
   un TABLEAU À DOUBLE ENTRÉE aux nombres tirés (lignes × colonnes choisies
   dans la situation), puis une TOURNURE. Le canvas montre exactement les
   nombres de l'énoncé. Un cran au-dessus du CM1 : double entrée dès ★1,
   cases « ? » à retrouver par différence, totaux de lignes ET de colonnes.
   ═══════════════════════════════════════════════════════════════════════════ */

type Q = TutorGeneratedQuestionV4;
type Cat = { label: string; gn: string };
type Nom = { mot: string; f: boolean };
type Sit = {
  titre: string;
  caption: string;
  /** Une phrase courte, portée par un métier. */
  intro: string;
  theme: "reunion" | "neutral";
  /** « de tortues », « d’élèves » : après « Combien » et « le plus ». */
  de: string;
  /** Le mot écrit après le nombre (« 24 tortues »). */
  unite: string;
  /** « ont été vues » : « Combien de tortues ont été vues à Saint-Leu en mars ? » */
  verbe: string;
  lNom: Nom;
  cNom: Nom;
  lignes: Cat[];
  colonnes: Cat[];
  min: number;
  max: number;
  pas: number;
};

const cat = (label: string, gn: string): Cat => ({ label, gn });
const nom = (mot: string, f = false): Nom => ({ mot, f });
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const quel = (n: Nom) => (n.f ? "quelle" : "quel");
const Quel = (n: Nom) => maj(quel(n));
const guil = (s: string) => `« ${s} »`;
const pluriel = (m: string) => (/[sx]$/.test(m) ? m : /eu$/.test(m) ? `${m}x` : `${m}s`);

const PRENOMS: { p: string; f: boolean }[] = [
  { p: "Léa", f: true }, { p: "Noah", f: false }, { p: "Maëlys", f: true }, { p: "Kylian", f: false },
  { p: "Inaya", f: true }, { p: "Enzo", f: false }, { p: "Soane", f: true }, { p: "Ilan", f: false },
  { p: "Lina", f: true }, { p: "Timéo", f: false }, { p: "Anaïs", f: true }, { p: "Mathis", f: false },
  { p: "Zoé", f: true }, { p: "Rayan", f: false }, { p: "Jade", f: true }, { p: "Nathan", f: false },
];

const MOIS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"].map((m) => cat(m, `en ${m.toLowerCase()}`));
const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"].map((j) => cat(j, `le ${j.toLowerCase()}`));
const JOURS_ECOLE = ["Lundi", "Mardi", "Jeudi", "Vendredi"].map((j) => cat(j, `le ${j.toLowerCase()}`));
const MOMENTS = [cat("Matin", "le matin"), cat("Midi", "à midi"), cat("Après-midi", "l’après-midi"), cat("Soir", "le soir")];
const SEMAINES = [
  cat("Semaine 1", "la 1re semaine"), cat("Semaine 2", "la 2e semaine"),
  cat("Semaine 3", "la 3e semaine"), cat("Semaine 4", "la 4e semaine"),
];
const NUITS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"].map((j) => cat(`Nuit du ${j}`, `la nuit du ${j}`));

const SITS: Sit[] = [
  {
    titre: "Tortues vues sur les plages", caption: "Nombre de tortues vues", theme: "reunion",
    intro: "Une biologiste marine compte les tortues vues près des plages.",
    de: "de tortues", unite: "tortues", verbe: "ont été vues", lNom: nom("plage", true), cNom: nom("mois"),
    lignes: [cat("Saint-Leu", "à Saint-Leu"), cat("L’Hermitage", "à L’Hermitage"), cat("Étang-Salé", "à l’Étang-Salé"), cat("Boucan Canot", "à Boucan Canot"), cat("Saint-Pierre", "à Saint-Pierre")],
    colonnes: MOIS, min: 2, max: 40, pas: 1,
  },
  {
    titre: "Voyageurs du car jaune", caption: "Nombre de voyageurs montés", theme: "reunion",
    intro: "Une chauffeuse de car jaune compte les voyageurs qui montent.",
    de: "de voyageurs", unite: "voyageurs", verbe: "sont montés", lNom: nom("ligne", true), cNom: nom("jour"),
    lignes: [cat("Ligne des Hauts", "sur la ligne des Hauts"), cat("Ligne du littoral", "sur la ligne du littoral"), cat("Ligne de la gare", "sur la ligne de la gare"), cat("Ligne de l’école", "sur la ligne de l’école"), cat("Ligne du marché", "sur la ligne du marché")],
    colonnes: JOURS, min: 20, max: 90, pas: 1,
  },
  {
    titre: "Livres empruntés à la BCD", caption: "Nombre de livres empruntés", theme: "neutral",
    intro: "Le bibliothécaire de l’école note les livres empruntés.",
    de: "de livres", unite: "livres", verbe: "ont été empruntés", lNom: nom("classe", true), cNom: nom("mois"),
    lignes: [cat("CP", "par les CP"), cat("CE1", "par les CE1"), cat("CE2", "par les CE2"), cat("CM1", "par les CM1"), cat("CM2", "par les CM2")],
    colonnes: MOIS, min: 5, max: 40, pas: 1,
  },
  {
    titre: "Pluie tombée (en mm)", caption: "Hauteur de pluie en millimètres", theme: "reunion",
    intro: "Un météorologue relève la pluie tombée dans plusieurs villes.",
    de: "de millimètres de pluie", unite: "mm", verbe: "sont tombés", lNom: nom("ville", true), cNom: nom("mois"),
    lignes: [cat("Cilaos", "à Cilaos"), cat("Saint-Denis", "à Saint-Denis"), cat("Le Tampon", "au Tampon"), cat("Sainte-Rose", "à Sainte-Rose"), cat("Saint-Gilles", "à Saint-Gilles")],
    colonnes: MOIS, min: 20, max: 450, pas: 10,
  },
  {
    titre: "Repas servis à la cantine", caption: "Nombre de repas servis", theme: "reunion",
    intro: "Un cuisinier de la cantine compte les repas servis.",
    de: "de repas", unite: "repas", verbe: "ont été servis", lNom: nom("école", true), cNom: nom("jour"),
    lignes: [cat("École des Avirons", "à l’école des Avirons"), cat("École du Port", "à l’école du Port"), cat("École de Bras-Panon", "à l’école de Bras-Panon"), cat("École de l’Entre-Deux", "à l’école de l’Entre-Deux"), cat("École de Salazie", "à l’école de Salazie")],
    colonnes: JOURS_ECOLE, min: 80, max: 200, pas: 5,
  },
  {
    titre: "Oiseaux comptés en forêt", caption: "Nombre d’oiseaux comptés", theme: "reunion",
    intro: "Une garde forestière compte les oiseaux à plusieurs moments de la journée.",
    de: "d’oiseaux", unite: "oiseaux", verbe: "ont été comptés", lNom: nom("site"), cNom: nom("moment"),
    lignes: [cat("Roche Écrite", "à la Roche Écrite"), cat("Forêt de Bélouve", "dans la forêt de Bélouve"), cat("Plaine des Cafres", "dans la plaine des Cafres"), cat("Mafate", "à Mafate"), cat("Grand Étang", "au Grand Étang")],
    colonnes: MOMENTS, min: 3, max: 45, pas: 1,
  },
  {
    titre: "Déchets ramassés sur les plages", caption: "Nombre de déchets ramassés", theme: "reunion",
    intro: "Une écologue organise le ramassage des déchets sur les plages.",
    de: "de déchets", unite: "déchets", verbe: "ont été ramassés", lNom: nom("plage", true), cNom: nom("mois"),
    lignes: [cat("Saint-Paul", "à Saint-Paul"), cat("Grande Anse", "à Grande Anse"), cat("Manapany", "à Manapany"), cat("Terre-Sainte", "à Terre-Sainte"), cat("Étang-Salé", "à l’Étang-Salé")],
    colonnes: MOIS, min: 10, max: 90, pas: 1,
  },
  {
    titre: "Spectateurs au cinéma", caption: "Nombre de spectateurs", theme: "neutral",
    intro: "Un projectionniste compte les spectateurs de chaque film.",
    de: "de spectateurs", unite: "spectateurs", verbe: "sont venus", lNom: nom("film"), cNom: nom("jour"),
    lignes: [cat("Dessin animé", "pour le dessin animé"), cat("Film d’aventure", "pour le film d’aventure"), cat("Documentaire", "pour le documentaire"), cat("Comédie", "pour la comédie"), cat("Science-fiction", "pour le film de science-fiction")],
    colonnes: JOURS, min: 20, max: 120, pas: 1,
  },
  {
    titre: "Inscrits à l’école de musique", caption: "Nombre d’élèves inscrits", theme: "reunion",
    intro: "Une professeure de musique compte les élèves inscrits.",
    de: "d’élèves", unite: "élèves", verbe: "sont inscrits", lNom: nom("instrument"), cNom: nom("ville", true),
    lignes: [cat("Guitare", "en guitare"), cat("Piano", "en piano"), cat("Violon", "en violon"), cat("Batterie", "en batterie"), cat("Flûte", "en flûte")],
    colonnes: [cat("Saint-Benoît", "à Saint-Benoît"), cat("Saint-Louis", "à Saint-Louis"), cat("Le Port", "au Port"), cat("Saint-André", "à Saint-André"), cat("La Possession", "à La Possession")],
    min: 5, max: 40, pas: 1,
  },
  {
    titre: "Licenciés du club omnisports", caption: "Nombre de licenciés", theme: "neutral",
    intro: "Un entraîneur compte les licenciés de son club.",
    de: "de licenciés", unite: "licenciés", verbe: "sont inscrits", lNom: nom("sport"), cNom: nom("catégorie", true),
    lignes: [cat("Football", "au football"), cat("Basket", "au basket"), cat("Natation", "à la natation"), cat("Judo", "au judo"), cat("Handball", "au handball")],
    colonnes: [cat("Poussins", "chez les poussins"), cat("Benjamins", "chez les benjamins"), cat("Minimes", "chez les minimes"), cat("Cadets", "chez les cadets")],
    min: 8, max: 60, pas: 1,
  },
  {
    titre: "Barquettes de letchis vendues", caption: "Nombre de barquettes vendues", theme: "reunion",
    intro: "Une maraîchère vend ses letchis sur plusieurs marchés en décembre.",
    de: "de barquettes", unite: "barquettes", verbe: "ont été vendues", lNom: nom("marché"), cNom: nom("semaine", true),
    lignes: [cat("Saint-Paul", "au marché de Saint-Paul"), cat("Le Chaudron", "au marché du Chaudron"), cat("Saint-Pierre", "au marché de Saint-Pierre"), cat("Saint-André", "au marché de Saint-André"), cat("Le Tampon", "au marché du Tampon")],
    colonnes: SEMAINES, min: 15, max: 95, pas: 1,
  },
  {
    titre: "Animaux soignés", caption: "Nombre d’animaux soignés", theme: "neutral",
    intro: "Une vétérinaire compte les animaux soignés dans ses cliniques.",
    de: "d’animaux", unite: "animaux", verbe: "ont été soignés", lNom: nom("clinique", true), cNom: nom("mois"),
    lignes: [cat("Clinique du port", "à la clinique du port"), cat("Clinique des Hauts", "à la clinique des Hauts"), cat("Clinique du centre", "à la clinique du centre"), cat("Clinique de la plage", "à la clinique de la plage")],
    colonnes: MOIS, min: 10, max: 70, pas: 1,
  },
  {
    titre: "Baguettes vendues", caption: "Nombre de baguettes vendues", theme: "neutral",
    intro: "Un boulanger compte les baguettes vendues dans ses boutiques.",
    de: "de baguettes", unite: "baguettes", verbe: "ont été vendues", lNom: nom("boutique", true), cNom: nom("moment"),
    lignes: [cat("Boutique du centre", "à la boutique du centre"), cat("Boutique de la plage", "à la boutique de la plage"), cat("Boutique du marché", "à la boutique du marché"), cat("Boutique de la gare", "à la boutique de la gare")],
    colonnes: MOMENTS, min: 40, max: 150, pas: 5,
  },
  {
    titre: "Randonneurs au volcan", caption: "Nombre de randonneurs", theme: "reunion",
    intro: "Un guide du Piton de la Fournaise compte les randonneurs.",
    de: "de randonneurs", unite: "randonneurs", verbe: "sont passés", lNom: nom("site"), cNom: nom("jour"),
    lignes: [cat("Pas de Bellecombe", "au Pas de Bellecombe"), cat("Cratère Dolomieu", "au cratère Dolomieu"), cat("Formica Leo", "au Formica Leo"), cat("Plaine des Sables", "à la plaine des Sables")],
    colonnes: JOURS, min: 20, max: 120, pas: 1,
  },
  {
    titre: "Pots de miel remplis", caption: "Nombre de pots remplis", theme: "reunion",
    intro: "Une apicultrice compte les pots de miel remplis dans ses ruchers.",
    de: "de pots", unite: "pots", verbe: "ont été remplis", lNom: nom("rucher"), cNom: nom("mois"),
    lignes: [cat("Rucher des Hauts", "au rucher des Hauts"), cat("Rucher du littoral", "au rucher du littoral"), cat("Rucher de la forêt", "au rucher de la forêt"), cat("Rucher du jardin", "au rucher du jardin")],
    colonnes: MOIS, min: 10, max: 60, pas: 1,
  },
  {
    titre: "Poisson débarqué (en kg)", caption: "Masse de poisson en kilos", theme: "reunion",
    intro: "Un pêcheur note les kilos de poisson débarqués dans les ports.",
    de: "de kilos de poisson", unite: "kg", verbe: "ont été débarqués", lNom: nom("port"), cNom: nom("jour"),
    lignes: [cat("Saint-Gilles", "au port de Saint-Gilles"), cat("Saint-Pierre", "au port de Saint-Pierre"), cat("Sainte-Marie", "au port de Sainte-Marie"), cat("Le Port", "au port de la Pointe des Galets")],
    colonnes: JOURS, min: 20, max: 150, pas: 5,
  },
  {
    titre: "Plants mis en terre", caption: "Nombre de plants", theme: "neutral",
    intro: "Un jardinier compte les plants mis en terre dans les jardins.",
    de: "de plants", unite: "plants", verbe: "ont été plantés", lNom: nom("jardin"), cNom: nom("mois"),
    lignes: [cat("Jardin de l’école", "dans le jardin de l’école"), cat("Jardin partagé", "dans le jardin partagé"), cat("Potager du collège", "dans le potager du collège"), cat("Jardin de la mairie", "dans le jardin de la mairie")],
    colonnes: MOIS, min: 5, max: 50, pas: 1,
  },
  {
    titre: "Parties jouées à la ludothèque", caption: "Nombre de parties", theme: "neutral",
    intro: "Une ludothécaire compte les parties jouées à chaque jeu.",
    de: "de parties", unite: "parties", verbe: "ont été jouées", lNom: nom("jeu"), cNom: nom("jour"),
    lignes: [cat("Petits chevaux", "aux petits chevaux"), cat("Jeu de l’oie", "au jeu de l’oie"), cat("Dames", "aux dames"), cat("Dominos", "aux dominos"), cat("Mémory", "au mémory")],
    colonnes: JOURS, min: 5, max: 40, pas: 1,
  },
  {
    titre: "Tickets de la kermesse", caption: "Nombre de tickets donnés", theme: "neutral",
    intro: "Une organisatrice de la kermesse compte les tickets de chaque stand.",
    de: "de tickets", unite: "tickets", verbe: "ont été donnés", lNom: nom("stand"), cNom: nom("moment"),
    lignes: [cat("Pêche à la ligne", "à la pêche à la ligne"), cat("Chamboule-tout", "au chamboule-tout"), cat("Tombola", "à la tombola"), cat("Maquillage", "au stand de maquillage"), cat("Course en sac", "à la course en sac")],
    colonnes: MOMENTS, min: 10, max: 80, pas: 1,
  },
  {
    titre: "Visiteurs des musées", caption: "Nombre de visiteurs", theme: "reunion",
    intro: "Une historienne compte les visiteurs des musées de l’île.",
    de: "de visiteurs", unite: "visiteurs", verbe: "sont venus", lNom: nom("musée"), cNom: nom("mois"),
    lignes: [cat("Stella Matutina", "au musée Stella Matutina"), cat("Villèle", "au musée de Villèle"), cat("Cité du Volcan", "à la Cité du Volcan"), cat("Kélonia", "à Kélonia"), cat("Muséum", "au muséum")],
    colonnes: MOIS, min: 50, max: 300, pas: 10,
  },
];

SITS.push(
  {
    titre: "Vues des vidéos de l’école", caption: "Nombre de vues", theme: "neutral",
    intro: "Une vidéaste suit les vues des vidéos de l’école.",
    de: "de vues", unite: "vues", verbe: "ont été comptées", lNom: nom("vidéo", true), cNom: nom("jour"),
    lignes: [cat("Le volcan", "pour la vidéo sur le volcan"), cat("Les tortues", "pour la vidéo sur les tortues"), cat("La cuisine", "pour la vidéo de cuisine"), cat("Le sport", "pour la vidéo de sport")],
    colonnes: JOURS, min: 20, max: 150, pas: 5,
  },
  {
    titre: "Sorties des pompiers", caption: "Nombre d’interventions", theme: "reunion",
    intro: "Une pompière compte les interventions de chaque caserne.",
    de: "d’interventions", unite: "interventions", verbe: "ont eu lieu", lNom: nom("caserne", true), cNom: nom("mois"),
    lignes: [cat("Saint-Benoît", "à la caserne de Saint-Benoît"), cat("Saint-Joseph", "à la caserne de Saint-Joseph"), cat("Le Port", "à la caserne du Port"), cat("Saint-Leu", "à la caserne de Saint-Leu")],
    colonnes: MOIS, min: 10, max: 80, pas: 1,
  },
  {
    titre: "Lettres distribuées", caption: "Nombre de lettres", theme: "neutral",
    intro: "Une factrice compte les lettres distribuées dans chaque quartier.",
    de: "de lettres", unite: "lettres", verbe: "ont été distribuées", lNom: nom("quartier"), cNom: nom("jour"),
    lignes: [cat("Les Camélias", "dans le quartier des Camélias"), cat("Le Butor", "dans le quartier du Butor"), cat("La Source", "dans le quartier de la Source"), cat("Le Chaudron", "dans le quartier du Chaudron")],
    colonnes: JOURS, min: 30, max: 150, pas: 5,
  },
  {
    titre: "Tours de piste en EPS", caption: "Nombre de tours de piste", theme: "neutral",
    intro: "Un professeur d’EPS compte les tours de piste de chaque classe.",
    de: "de tours", unite: "tours", verbe: "ont été courus", lNom: nom("classe", true), cNom: nom("jour"),
    lignes: [cat("CM2 A", "par les CM2 A"), cat("CM2 B", "par les CM2 B"), cat("CM1 A", "par les CM1 A"), cat("CM1 B", "par les CM1 B")],
    colonnes: JOURS_ECOLE, min: 20, max: 90, pas: 1,
  },
  {
    titre: "Œufs ramassés à la ferme", caption: "Nombre d’œufs", theme: "neutral",
    intro: "Une agricultrice compte les œufs de chaque poulailler.",
    de: "d’œufs", unite: "œufs", verbe: "ont été ramassés", lNom: nom("poulailler"), cNom: nom("jour"),
    lignes: [cat("Poulailler du haut", "dans le poulailler du haut"), cat("Poulailler du bas", "dans le poulailler du bas"), cat("Poulailler du verger", "dans le poulailler du verger"), cat("Poulailler de la mare", "dans le poulailler de la mare")],
    colonnes: JOURS, min: 10, max: 60, pas: 1,
  },
  {
    titre: "Nageurs à la piscine", caption: "Nombre de nageurs", theme: "reunion",
    intro: "Un maître-nageur compte les nageurs de chaque piscine.",
    de: "de nageurs", unite: "nageurs", verbe: "sont venus", lNom: nom("piscine", true), cNom: nom("moment"),
    lignes: [cat("Le Butor", "à la piscine du Butor"), cat("Saint-Paul", "à la piscine de Saint-Paul"), cat("Saint-Pierre", "à la piscine de Saint-Pierre"), cat("Le Tampon", "à la piscine du Tampon")],
    colonnes: MOMENTS, min: 10, max: 90, pas: 1,
  },
  {
    titre: "Orchidées en fleur", caption: "Nombre d’orchidées en fleur", theme: "reunion",
    intro: "Une botaniste compte les orchidées en fleur dans les forêts.",
    de: "d’orchidées", unite: "orchidées", verbe: "ont été comptées", lNom: nom("forêt", true), cNom: nom("mois"),
    lignes: [cat("Bébour", "dans la forêt de Bébour"), cat("Bélouve", "dans la forêt de Bélouve"), cat("Mare-Longue", "dans la forêt de Mare-Longue"), cat("Tévelave", "dans la forêt du Tévelave")],
    colonnes: MOIS, min: 5, max: 60, pas: 1,
  },
  {
    titre: "Étoiles filantes", caption: "Nombre d’étoiles filantes", theme: "reunion",
    intro: "Une astronome compte les étoiles filantes depuis plusieurs lieux.",
    de: "d’étoiles filantes", unite: "étoiles filantes", verbe: "ont été vues", lNom: nom("lieu"), cNom: nom("nuit", true),
    lignes: [cat("Maïdo", "au Maïdo"), cat("Plaine des Cafres", "à la Plaine des Cafres"), cat("Les Makes", "aux Makes"), cat("Grand Coude", "à Grand Coude")],
    colonnes: NUITS, min: 2, max: 40, pas: 1,
  },
  {
    titre: "Glaces vendues", caption: "Nombre de glaces vendues", theme: "neutral",
    intro: "Un glacier compte les glaces vendues dans ses kiosques.",
    de: "de glaces", unite: "glaces", verbe: "ont été vendues", lNom: nom("kiosque"), cNom: nom("jour"),
    lignes: [cat("Kiosque de la plage", "au kiosque de la plage"), cat("Kiosque du parc", "au kiosque du parc"), cat("Kiosque du port", "au kiosque du port"), cat("Kiosque de la gare", "au kiosque de la gare")],
    colonnes: JOURS, min: 20, max: 150, pas: 5,
  },
  {
    titre: "Naissances à la maternité", caption: "Nombre de bébés nés", theme: "reunion",
    intro: "Une sage-femme compte les naissances dans les maternités.",
    de: "de bébés", unite: "bébés", verbe: "sont nés", lNom: nom("maternité", true), cNom: nom("mois"),
    lignes: [cat("Saint-Pierre", "à la maternité de Saint-Pierre"), cat("Saint-Denis", "à la maternité de Saint-Denis"), cat("Saint-Benoît", "à la maternité de Saint-Benoît"), cat("Saint-Paul", "à la maternité de Saint-Paul")],
    colonnes: MOIS, min: 10, max: 60, pas: 1,
  },
);

/** `n` éléments distincts, dans l'ordre d'origine (les mois restent dans l'ordre). */
function tirerSans<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr.map((_, i) => i))
    .slice(0, n)
    .sort((x, y) => x - y)
    .map((i) => arr[i]);
}

/** Choix d'un QCM numérique : la bonne réponse + 3 pièges distincts, positifs. */
function choixNombres(correct: number, pieges: number[], pas = 1): string[] {
  const out = new Set<number>();
  for (const p of shuffle(pieges)) {
    if (out.size >= 3) break;
    if (p !== correct && p >= 0 && Number.isInteger(p)) out.add(p);
  }
  for (const d of [pas, -pas, 2 * pas, -2 * pas, 10, -10, 3 * pas]) {
    if (out.size >= 3) break;
    const v = correct + d;
    if (v !== correct && v >= 0) out.add(v);
  }
  return shuffle([String(correct), ...[...out].slice(0, 3).map(String)]);
}

type Tab = { sit: Sit; L: Cat[]; C: Cat[]; v: number[][] };

/** Tire un tableau nl × nc : toutes les valeurs DISTINCTES (un plus grand unique). */
function tirerTab(sit: Sit, nl: number, nc: number): Tab {
  const L = tirerSans(sit.lignes, nl);
  const C = tirerSans(sit.colonnes, nc);
  const pool: number[] = [];
  for (let x = sit.min; x <= sit.max; x += sit.pas) pool.push(x);
  const vals = shuffle(pool).slice(0, nl * nc);
  const v = L.map((_, i) => vals.slice(i * nc, (i + 1) * nc));
  return { sit, L, C, v };
}

const somme = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const ligneDe = (t: Tab, i: number) => t.v[i];
const colDe = (t: Tab, j: number) => t.v.map((r) => r[j]);

/** Le canvas : exactement les nombres de l'énoncé, cases « ? » comprises. */
function canvasTab(
  t: Tab,
  opts: {
    highlight?: TableauDonneesCanvasData["highlight"];
    cache?: { i: number; j: number }[];
    totalLigne?: boolean;
    totalCol?: boolean;
    cacheTotal?: { ligne?: number; col?: number; general?: boolean };
  } = {},
): TableauDonneesCanvasData {
  const cache = opts.cache ?? [];
  const estCache = (i: number, j: number) => cache.some((k) => k.i === i && k.j === j);
  const headers = [...t.C.map((x) => x.label), ...(opts.totalLigne ? ["Total"] : [])];
  const rows: TableauDonneesCanvasData["rows"] = t.L.map((l, i) => ({
    label: l.label,
    values: [
      ...t.v[i].map((x, j) => (estCache(i, j) ? "?" : x)),
      ...(opts.totalLigne ? [opts.cacheTotal?.ligne === i ? "?" : somme(t.v[i])] : []),
    ],
  }));
  if (opts.totalCol) {
    rows.push({
      label: "Total",
      values: [
        ...t.C.map((_, j) => (opts.cacheTotal?.col === j ? "?" : somme(colDe(t, j)))),
        ...(opts.totalLigne ? [opts.cacheTotal?.general ? "?" : somme(t.v.flat())] : []),
      ],
    });
  }
  return tableauCanvas({
    title: t.sit.titre,
    headers,
    rows,
    highlight: opts.highlight,
    caption: t.sit.caption,
    display: { compact: t.C.length + (opts.totalLigne ? 1 : 0) > 4, striped: true },
  });
}

const sitAuHasard = () => randomChoice(SITS);
const combien = (t: Tab, i: number, j: number) =>
  `Combien ${t.sit.de} ${t.sit.verbe} ${t.L[i].gn} ${t.C[j].gn} ?`;
const nb = (t: Tab, x: number) => `${x} ${t.sit.unite}`;
const lc = (t: Tab, i: number, j: number) =>
  `la ligne ${guil(t.L[i].label)} et la colonne ${guil(t.C[j].label)}`;
/** « qu’en mars », « que le lundi ». */
const que = (gn: string) => (/^[aeiouéèêàâ]/i.test(gn) ? `qu’${gn}` : `que ${gn}`);
/** Début de phrase pour une ligne : « À Saint-Leu, … » ou « Sur la ligne « CM2 A », … ». */
const debutLigne = (t: Tab, i: number) =>
  t.L[i].gn.startsWith("par ") || Math.random() < 0.3 ? `Sur la ligne ${guil(t.L[i].label)}` : maj(t.L[i].gn);
const autre = (n: number, k: number) => (k + 1 + randomInt(0, n - 2)) % n;

// ------------------------------------------------------------
// TABLEAU_LIRE
// ------------------------------------------------------------

/** ★1 — lire une case d'un tableau à double entrée (3 × 3). */
function genLireCase(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const i = randomInt(0, 2);
  const j = randomInt(0, 2);
  const x = t.v[i][j];
  const i2 = autre(3, i);
  const j2 = autre(3, j);
  const text = randomChoice([
    () => `${t.sit.intro} ${combien(t, i, j)}`,
    () => `Lis le tableau. ${maj(t.C[j].gn)}, combien ${t.sit.de} ${t.sit.verbe} ${t.L[i].gn} ?`,
    () => `${t.sit.intro} Quel nombre lis-tu au croisement de ${lc(t, i, j)} ?`,
  ])();
  return {
    text,
    format: "qcm",
    choices: choixNombres(x, [t.v[i][j2], t.v[i2][j], t.v[i2][j2]], t.sit.pas),
    expected: [String(x)],
    comparator: "mcq_exact",
    explanation: `On cherche la ligne ${guil(t.L[i].label)}, puis la colonne ${guil(t.C[j].label)}. La case du croisement indique ${x}. Donc ${nb(t, x)} ${t.sit.verbe} ${t.L[i].gn} ${t.C[j].gn}.`,
    canvas: canvasTab(t),
  };
}

/** ★1 — quelle ligne ou quelle colonne lire pour une information. */
function genLireQuoi(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const i = randomInt(0, 2);
  const j = randomInt(0, 2);
  const ligne = Math.random() < 0.5;
  const bon = ligne ? `la ligne ${guil(t.L[i].label)}` : `la colonne ${guil(t.C[j].label)}`;
  const pieges = ligne
    ? [`la colonne ${guil(t.C[j].label)}`, `la ligne ${guil(t.L[autre(3, i)].label)}`, `la colonne ${guil(t.C[autre(3, j)].label)}`]
    : [`la ligne ${guil(t.L[i].label)}`, `la colonne ${guil(t.C[autre(3, j)].label)}`, `la ligne ${guil(t.L[autre(3, i)].label)}`];
  const quoi = ligne
    ? `combien ${t.sit.de} ${t.sit.verbe} ${t.L[i].gn}, pour chaque ${t.sit.cNom.mot}`
    : `combien ${t.sit.de} ${t.sit.verbe} ${t.C[j].gn}, pour chaque ${t.sit.lNom.mot}`;
  const text = randomChoice([
    () => `${t.sit.intro} Que faut-il lire pour savoir ${quoi} ?`,
    () => `Tu veux savoir ${quoi}. Que lis-tu dans le tableau ?`,
  ])();
  return {
    text,
    format: "qcm",
    choices: makeChoices(bon, pieges),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: ligne
      ? `Les lignes portent le nom de chaque ${t.sit.lNom.mot} ; les colonnes, celui de chaque ${t.sit.cNom.mot}. Pour le savoir, on lit ${bon} : ${t.v[i].join(", ")}.`
      : `Les colonnes portent le nom de chaque ${t.sit.cNom.mot} ; les lignes, celui de chaque ${t.sit.lNom.mot}. Pour le savoir, on lit ${bon} : ${colDe(t, j).join(", ")}.`,
    canvas: canvasTab(t),
  };
}

/** ★2 — lecture inverse : on donne le nombre, on cherche la ligne ou la colonne. */
function genLireInverse(): Q {
  const t = tirerTab(sitAuHasard(), 4, 4);
  const i = randomInt(0, 3);
  const j = randomInt(0, 3);
  const x = t.v[i][j];
  if (Math.random() < 0.5) {
    const bon = t.C[j].label;
    return {
      text: `${t.sit.intro} ${debutLigne(t, i)}, ${quel(t.sit.cNom)} ${t.sit.cNom.mot} a ${nb(t, x)} ?`,
      format: "qcm",
      choices: makeChoices(bon, t.C.map((k) => k.label)),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: `On lit seulement la ligne ${guil(t.L[i].label)} : ${t.v[i].join(", ")}. Le nombre ${x} est dans la colonne ${guil(bon)}.`,
      canvas: canvasTab(t, { highlight: { row: i } }),
    };
  }
  const bon = t.L[i].label;
  return {
    text: `${t.sit.intro} ${maj(t.C[j].gn)}, ${quel(t.sit.lNom)} ${t.sit.lNom.mot} a ${nb(t, x)} ?`,
    format: "qcm",
    choices: makeChoices(bon, t.L.map((k) => k.label)),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: `On lit seulement la colonne ${guil(t.C[j].label)} : ${colDe(t, j).join(", ")}. Le nombre ${x} est dans la ligne ${guil(bon)}.`,
    canvas: canvasTab(t, { highlight: { col: j } }),
  };
}

/** ★2 — lire une case d'un tableau plus grand, ou une case « Total ». */
function genLireGrandOuTotal(): Q {
  const t = tirerTab(sitAuHasard(), 4, 4);
  const i = randomInt(0, 3);
  const j = randomInt(0, 3);
  if (Math.random() < 0.5) {
    const x = t.v[i][j];
    return {
      text: `${t.sit.intro} ${combien(t, i, j)}`,
      format: "qcm",
      choices: choixNombres(x, [t.v[j][i], t.v[i][autre(4, j)], t.v[autre(4, i)][j]], t.sit.pas),
      expected: [String(x)],
      comparator: "mcq_exact",
      explanation: `Ligne ${guil(t.L[i].label)}, colonne ${guil(t.C[j].label)} : la case indique ${x}. Donc ${nb(t, x)} ${t.sit.verbe} ${t.L[i].gn} ${t.C[j].gn}.`,
      canvas: canvasTab(t),
    };
  }
  const tot = somme(t.v[i]);
  return {
    text: `${t.sit.intro} Lis la colonne ${guil("Total")}. Combien ${t.sit.de} ${t.sit.verbe} ${t.L[i].gn} en tout ?`,
    format: "qcm",
    choices: choixNombres(tot, [somme(t.v[autre(4, i)]), Math.max(...t.v[i]), tot - t.v[i][j]], t.sit.pas),
    expected: [String(tot)],
    comparator: "mcq_exact",
    explanation: `La colonne ${guil("Total")} donne le total de chaque ligne. Sur la ligne ${guil(t.L[i].label)}, on lit ${tot} (${t.v[i].join(" + ")} = ${tot}).`,
    canvas: canvasTab(t, { totalLigne: true }),
  };
}

/** ★3 — un camarade lit le tableau : a-t-il raison ? (erreur de ligne ou de colonne) */
function genLireErreur(): Q {
  const t = tirerTab(sitAuHasard(), 4, 4);
  const i = randomInt(0, 3);
  const j = randomInt(0, 3);
  const pr = randomChoice(PRENOMS);
  const elle = pr.f ? "elle" : "il";
  const juste = Math.random() < 0.4;
  const erreurColonne = Math.random() < 0.5;
  const jFaux = autre(4, j);
  const iFaux = autre(4, i);
  const lu = juste ? t.v[i][j] : erreurColonne ? t.v[i][jFaux] : t.v[iFaux][j];
  const ou = erreurColonne
    ? `la colonne ${guil(t.C[jFaux].label)} au lieu de ${guil(t.C[j].label)}`
    : `la ligne ${guil(t.L[iFaux].label)} au lieu de ${guil(t.L[i].label)}`;
  return {
    text: `${t.sit.intro} ${pr.p} dit : « ${nb(t, lu)} ${t.sit.verbe} ${t.L[i].gn} ${t.C[j].gn}. » A-t-${elle} raison ?`,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [juste ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: juste
      ? `Oui. Au croisement de ${lc(t, i, j)}, on lit bien ${t.v[i][j]}.`
      : `Non. Au croisement de ${lc(t, i, j)}, on lit ${t.v[i][j]}, pas ${lu}. ${maj(elle)} a lu ${ou}.`,
    canvas: canvasTab(t),
  };
}

/** ★3 — où se trouve ce nombre dans tout le tableau ? */
function genLireOu(): Q {
  const t = tirerTab(sitAuHasard(), 4, 4);
  const i = randomInt(0, 3);
  const j = randomInt(0, 3);
  const x = t.v[i][j];
  const rep = (a: number, b: number) => `${t.L[a].label} et ${t.C[b].label}`;
  const bon = rep(i, j);
  return {
    text: `${t.sit.intro} Dans quelle case lit-on ${x} ? Donne sa ligne et sa colonne.`,
    format: "qcm",
    choices: makeChoices(bon, [rep(autre(4, i), j), rep(i, autre(4, j)), rep(autre(4, i), autre(4, j))]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: `On parcourt le tableau : ${x} est au croisement de ${lc(t, i, j)}. Cela veut dire que ${nb(t, x)} ${t.sit.verbe} ${t.L[i].gn} ${t.C[j].gn}.`,
    canvas: canvasTab(t),
  };
}

// ------------------------------------------------------------
// TABLEAU_COMPLETER
// ------------------------------------------------------------

/** ★1 — placer une information de l'énoncé dans la bonne case (deux « ? »). */
function genCompleterPlacer(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const i = randomInt(0, 2);
  const j = randomInt(0, 2);
  const i2 = autre(3, i);
  const j2 = autre(3, j);
  const x = t.v[i][j];
  const pos = (a: number, b: number) => `ligne ${guil(t.L[a].label)}, colonne ${guil(t.C[b].label)}`;
  const bon = pos(i, j);
  if (Math.random() < 0.5) {
    return {
      text: `${t.sit.intro} Deux cases sont vides. On sait que ${nb(t, x)} ${t.sit.verbe} ${t.L[i].gn} ${t.C[j].gn}. Dans quelle case écrire ${x} ?`,
      format: "qcm",
      choices: makeChoices(bon, [pos(i2, j2), pos(i, j2), pos(i2, j)]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: `${maj(t.L[i].gn)} : c'est la ligne ${guil(t.L[i].label)}. ${maj(t.C[j].gn)} : c'est la colonne ${guil(t.C[j].label)}. On écrit ${x} au croisement.`,
      canvas: canvasTab(t, { cache: [{ i, j }, { i: i2, j: j2 }] }),
    };
  }
  return {
    text: `${t.sit.intro} Une case est vide. On sait que ${nb(t, x)} ${t.sit.verbe} ${t.L[i].gn} ${t.C[j].gn}. Quel nombre faut-il écrire à la place du « ? » ?`,
    format: "qcm",
    choices: choixNombres(x, [t.v[i][j2], t.v[i2][j], t.v[i2][j2]], t.sit.pas),
    expected: [String(x)],
    comparator: "mcq_exact",
    explanation: `Le « ? » est au croisement de ${lc(t, i, j)}. L'énoncé le dit : ${nb(t, x)} ${t.sit.verbe} ${t.L[i].gn} ${t.C[j].gn}. On écrit ${x}.`,
    canvas: canvasTab(t, { cache: [{ i, j }] }),
  };
}

/** ★1 — que représente la case « ? » ? */
function genCompleterSens(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const i = randomInt(0, 2);
  const j = randomInt(0, 2);
  const i2 = autre(3, i);
  const j2 = autre(3, j);
  const sens = (a: number, b: number) => `le nombre ${t.sit.de} ${t.L[a].gn} ${t.C[b].gn}`;
  const bon = sens(i, j);
  return {
    text: `${t.sit.intro} Que faut-il écrire à la place du « ? » ?`,
    format: "qcm",
    choices: makeChoices(bon, [sens(i2, j), sens(i, j2), sens(i2, j2)]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: `Le « ? » est au croisement de ${lc(t, i, j)}. Il faut donc y écrire ${bon}.`,
    canvas: canvasTab(t, { cache: [{ i, j }] }),
  };
}

/** ★2 — case manquante d'une ligne dont le total est connu. */
function genCompleterParTotal(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const i = randomInt(0, 2);
  const j = randomInt(0, 2);
  const x = t.v[i][j];
  const tot = somme(t.v[i]);
  const autres = t.v[i].filter((_, k) => k !== j);
  const so = somme(autres);
  return {
    text: `${t.sit.intro} Sur la ligne ${guil(t.L[i].label)}, le total est ${tot}. Quel nombre manque à la place du « ? » ?`,
    format: "qcm",
    choices: choixNombres(x, [tot + so, so, tot - autres[0]], t.sit.pas),
    expected: [String(x)],
    comparator: "mcq_exact",
    explanation: `On additionne les cases connues : ${autres.join(" + ")} = ${so}. Puis on retire au total : ${tot} − ${so} = ${x}. Vérification : ${t.v[i].join(" + ")} = ${tot}.`,
    canvas: canvasTab(t, { cache: [{ i, j }], totalLigne: true }),
  };
}

/** ★2 — case manquante décrite par une phrase (« de plus », « de moins »). */
function genCompleterPhrase(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const i = randomInt(0, 2);
  const j = randomInt(0, 2);
  const j2 = autre(3, j);
  const x = t.v[i][j];
  const ref = t.v[i][j2];
  const d = Math.abs(x - ref);
  const plus = x > ref;
  return {
    text: `${t.sit.intro} ${debutLigne(t, i)}, il y en a ${d} de ${plus ? "plus" : "moins"} ${t.C[j].gn} ${que(t.C[j2].gn)}. Quel nombre faut-il écrire à la place du « ? » ?`,
    format: "qcm",
    choices: choixNombres(x, [plus ? ref - d : ref + d, d, ref], t.sit.pas),
    expected: [String(x)],
    comparator: "mcq_exact",
    explanation: `${maj(t.C[j2].gn)}, on lit ${ref}. ${plus ? `${d} de plus : ${ref} + ${d} = ${x}` : `${d} de moins : ${ref} − ${d} = ${x}`}. On écrit ${x}.`,
    canvas: canvasTab(t, { cache: [{ i, j }] }),
  };
}

/** ★3 — compléter une case « Total » de ligne ou de colonne (3 ou 4 nombres). */
function genCompleterTotal(): Q {
  const nl = randomInt(3, 4);
  const nc = randomInt(3, 4);
  const t = tirerTab(sitAuHasard(), nl, nc);
  const ligne = Math.random() < 0.5;
  const k = ligne ? randomInt(0, nl - 1) : randomInt(0, nc - 1);
  const xs = ligne ? ligneDe(t, k) : colDe(t, k);
  const tot = somme(xs);
  const nomCase = ligne ? `ligne ${guil(t.L[k].label)}` : `colonne ${guil(t.C[k].label)}`;
  const quoi = ligne ? t.L[k].gn : t.C[k].gn;
  return {
    text: `${t.sit.intro} Quel total faut-il écrire pour la ${nomCase} ? C'est le nombre ${t.sit.de} ${quoi} en tout.`,
    format: "qcm",
    choices: choixNombres(tot, [tot - xs[xs.length - 1], tot + 10, tot - 10, Math.max(...xs)], t.sit.pas),
    expected: [String(tot)],
    comparator: "mcq_exact",
    explanation: `On additionne toutes les cases de la ${nomCase} : ${xs.join(" + ")} = ${tot}. On écrit ${tot}.`,
    canvas: canvasTab(t, ligne
      ? { totalLigne: true, cacheTotal: { ligne: k } }
      : { totalCol: true, cacheTotal: { col: k } }),
  };
}

/** ★3 — le total général, à partir des totaux de lignes. */
function genCompleterTotalGeneral(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const tl = t.v.map(somme);
  const g = somme(tl);
  return {
    text: `${t.sit.intro} Les totaux des lignes sont écrits. Quel nombre faut-il écrire dans la case « ? » du total général ?`,
    format: "qcm",
    choices: choixNombres(g, [tl[0] + tl[1], g - 10, g + 10, Math.max(...tl)], t.sit.pas),
    expected: [String(g)],
    comparator: "mcq_exact",
    explanation: `Le total général, c'est tout le tableau. On additionne les totaux des lignes : ${tl.join(" + ")} = ${g}. On peut vérifier avec les totaux des colonnes : ${t.C.map((_, j) => somme(colDe(t, j))).join(" + ")} = ${g}.`,
    canvas: canvasTab(t, { totalLigne: true, totalCol: true, cacheTotal: { general: true } }),
  };
}

/** ★4 — case manquante par le total de COLONNE (4 lignes), deux tournures. */
function genCompleterColonne(): Q {
  const t = tirerTab(sitAuHasard(), 4, 3);
  const i = randomInt(0, 3);
  const j = randomInt(0, 2);
  const x = t.v[i][j];
  const xs = colDe(t, j);
  const tot = somme(xs);
  const autres = xs.filter((_, k) => k !== i);
  const so = somme(autres);
  const text = randomChoice([
    () => `${t.sit.intro} ${maj(t.C[j].gn)}, le total est ${tot}. Combien ${t.sit.de} ${t.sit.verbe} ${t.L[i].gn} ${t.C[j].gn} ?`,
    () => `${t.sit.intro} Une case de la colonne ${guil(t.C[j].label)} est effacée. Le total de cette colonne est ${tot}. Quel nombre manque ?`,
  ])();
  return {
    text,
    format: "qcm",
    choices: choixNombres(x, [tot + so, so, tot - autres[0] - autres[1]], t.sit.pas),
    expected: [String(x)],
    comparator: "mcq_exact",
    explanation: `Cases connues de la colonne ${guil(t.C[j].label)} : ${autres.join(" + ")} = ${so}. Il manque ${tot} − ${so} = ${x}.`,
    canvas: canvasTab(t, { cache: [{ i, j }], totalCol: true }),
  };
}

/** ★4 — deux étapes : la case « ? » par sa colonne, puis le total de sa ligne. */
function genCompleterDeuxEtapes(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const i = randomInt(0, 2);
  const j = randomInt(0, 2);
  const x = t.v[i][j];
  const totC = somme(colDe(t, j));
  const totL = somme(t.v[i]);
  const autresC = colDe(t, j).filter((_, k) => k !== i);
  const autresL = t.v[i].filter((_, k) => k !== j);
  return {
    text: `${t.sit.intro} Deux cases sont effacées sur la ligne ${guil(t.L[i].label)} : une case et son total. Quel est le total de la ligne ${guil(t.L[i].label)} ?`,
    format: "qcm",
    choices: choixNombres(totL, [somme(autresL), x, totC, totL + 10], t.sit.pas),
    expected: [String(totL)],
    comparator: "mcq_exact",
    explanation: `Étape 1 : la colonne ${guil(t.C[j].label)} a pour total ${totC}. Donc la case effacée vaut ${totC} − ${autresC.join(" − ")} = ${x}. Étape 2 : total de la ligne : ${t.v[i].join(" + ")} = ${totL}.`,
    canvas: canvasTab(t, { cache: [{ i, j }], totalLigne: true, totalCol: true, cacheTotal: { ligne: i } }),
  };
}

// ------------------------------------------------------------
// TABLEAU_INTERPRETER
// ------------------------------------------------------------

/** ★1 — le plus / le moins sur UNE ligne (lire puis comparer). */
function genInterpMaxLigne(): Q {
  const t = tirerTab(sitAuHasard(), 3, 4);
  const i = randomInt(0, 2);
  const xs = t.v[i];
  const plus = Math.random() < 0.5;
  const cible = plus ? Math.max(...xs) : Math.min(...xs);
  const bon = t.C[xs.indexOf(cible)].label;
  return {
    text: `${t.sit.intro} ${debutLigne(t, i)}, ${quel(t.sit.cNom)} ${t.sit.cNom.mot} a le ${plus ? "plus" : "moins"} ${t.sit.de} ?`,
    format: "qcm",
    choices: makeChoices(bon, t.C.map((k) => k.label)),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: `Ligne ${guil(t.L[i].label)} : ${t.C.map((k, j) => `${k.label} ${xs[j]}`).join(", ")}. Le ${plus ? "plus grand" : "plus petit"} nombre est ${cible}, dans la colonne ${guil(bon)}.`,
    canvas: canvasTab(t, { highlight: { row: i } }),
  };
}

/** ★1 — comparer deux cases d'une même colonne. */
function genInterpComparer(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const j = randomInt(0, 2);
  const i = randomInt(0, 2);
  const i2 = autre(3, i);
  const a = t.v[i][j];
  const b = t.v[i2][j];
  const bon = a > b ? t.L[i].label : t.L[i2].label;
  return {
    text: `${t.sit.intro} ${maj(t.C[j].gn)}, où y a-t-il le plus ${t.sit.de} : ${guil(t.L[i].label)} ou ${guil(t.L[i2].label)} ?`,
    format: "qcm",
    choices: makeChoices(bon, [t.L[i].label, t.L[i2].label, "Autant aux deux"]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: `Colonne ${guil(t.C[j].label)} : ${t.L[i].label} ${a}, ${t.L[i2].label} ${b}. Comme ${Math.max(a, b)} > ${Math.min(a, b)}, la réponse est ${guil(bon)}.`,
    canvas: canvasTab(t, { highlight: { col: j } }),
  };
}

/** ★2 — « combien de plus » entre deux cases d'une même ligne ou colonne. */
function genInterpEcart(): Q {
  const t = tirerTab(sitAuHasard(), 3, 4);
  const ligne = Math.random() < 0.5;
  let a: number, b: number, text: string, ctx: string;
  if (ligne) {
    const i = randomInt(0, 2);
    const [j1, j2] = shuffle([0, 1, 2, 3]).slice(0, 2);
    a = Math.max(t.v[i][j1], t.v[i][j2]);
    b = Math.min(t.v[i][j1], t.v[i][j2]);
    const jg = t.v[i][j1] > t.v[i][j2] ? j1 : j2;
    const jp = jg === j1 ? j2 : j1;
    ctx = `${t.C[jg].label} ${a}, ${t.C[jp].label} ${b}`;
    text = `${t.sit.intro} ${debutLigne(t, i)}, combien ${t.sit.de} de plus ${t.C[jg].gn} ${que(t.C[jp].gn)} ?`;
  } else {
    const j = randomInt(0, 3);
    const [i1, i2] = shuffle([0, 1, 2]).slice(0, 2);
    a = Math.max(t.v[i1][j], t.v[i2][j]);
    b = Math.min(t.v[i1][j], t.v[i2][j]);
    const ig = t.v[i1][j] > t.v[i2][j] ? i1 : i2;
    const ip = ig === i1 ? i2 : i1;
    ctx = `${t.L[ig].label} ${a}, ${t.L[ip].label} ${b}`;
    text = `${t.sit.intro} ${maj(t.C[j].gn)}, combien ${t.sit.de} de plus ${t.L[ig].gn} ${que(t.L[ip].gn)} ?`;
  }
  const d = a - b;
  return {
    text,
    format: "qcm",
    choices: choixNombres(d, [a + b, a, b, d + 10], t.sit.pas),
    expected: [String(d)],
    comparator: "mcq_exact",
    explanation: `On lit : ${ctx}. Pour savoir combien de plus, on soustrait : ${a} − ${b} = ${d}.`,
    canvas: canvasTab(t),
  };
}

/** ★2 — le plus / le moins sur UNE colonne (4 lignes). */
function genInterpMaxColonne(): Q {
  const t = tirerTab(sitAuHasard(), 4, 3);
  const j = randomInt(0, 2);
  const xs = colDe(t, j);
  const plus = Math.random() < 0.5;
  const cible = plus ? Math.max(...xs) : Math.min(...xs);
  const bon = t.L[xs.indexOf(cible)].label;
  return {
    text: `${t.sit.intro} ${maj(t.C[j].gn)}, ${quel(t.sit.lNom)} ${t.sit.lNom.mot} a le ${plus ? "plus" : "moins"} ${t.sit.de} ?`,
    format: "qcm",
    choices: makeChoices(bon, t.L.map((k) => k.label)),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: `Colonne ${guil(t.C[j].label)} : ${t.L.map((k, i) => `${k.label} ${xs[i]}`).join(", ")}. Le ${plus ? "plus grand" : "plus petit"} nombre est ${cible} : c'est ${guil(bon)}.`,
    canvas: canvasTab(t),
  };
}

/** ★3 — un total à calculer (ligne ou colonne), sans colonne « Total ». */
function genInterpTotal(): Q {
  const t = tirerTab(sitAuHasard(), 3, 4);
  const ligne = Math.random() < 0.5;
  const k = ligne ? randomInt(0, 2) : randomInt(0, 3);
  const xs = ligne ? t.v[k] : colDe(t, k);
  const tot = somme(xs);
  const gn = ligne ? t.L[k].gn : t.C[k].gn;
  const text = randomChoice([
    () => `${t.sit.intro} Combien ${t.sit.de} ${t.sit.verbe} ${gn} en tout ?`,
    () => `${t.sit.intro} ${maj(gn)}, quel est le nombre total ${t.sit.de} ?`,
  ])();
  return {
    text,
    format: "qcm",
    choices: choixNombres(tot, [tot - xs[0], tot + 10, tot - 10, Math.max(...xs)], t.sit.pas),
    expected: [String(tot)],
    comparator: "mcq_exact",
    explanation: `On additionne la ${ligne ? `ligne ${guil(t.L[k].label)}` : `colonne ${guil(t.C[k].label)}`} : ${xs.join(" + ")} = ${tot}. Donc ${nb(t, tot)} en tout.`,
    canvas: canvasTab(t, ligne ? { highlight: { row: k } } : { highlight: { col: k } }),
  };
}

/** ★3 — écart entre deux cases qui ne sont ni sur la même ligne ni sur la même colonne. */
function genInterpEcartCroise(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const i1 = randomInt(0, 2);
  const i2 = autre(3, i1);
  const j1 = randomInt(0, 2);
  const j2 = autre(3, j1);
  const x1 = t.v[i1][j1];
  const x2 = t.v[i2][j2];
  const [ig, jg, ip, jp] = x1 > x2 ? [i1, j1, i2, j2] : [i2, j2, i1, j1];
  const a = t.v[ig][jg];
  const b = t.v[ip][jp];
  const d = a - b;
  return {
    text: `${t.sit.intro} Combien ${t.sit.de} de plus ${t.L[ig].gn} ${t.C[jg].gn} ${que(t.L[ip].gn)} ${t.C[jp].gn} ?`,
    format: "qcm",
    choices: choixNombres(d, [a + b, Math.abs(t.v[ig][jp] - b), Math.abs(a - t.v[ip][jg]), d + 10], t.sit.pas),
    expected: [String(d)],
    comparator: "mcq_exact",
    explanation: `${maj(t.L[ig].gn)} ${t.C[jg].gn} : ${a}. ${maj(t.L[ip].gn)} ${t.C[jp].gn} : ${b}. Écart : ${a} − ${b} = ${d}.`,
    canvas: canvasTab(t),
  };
}

/** Tire un tableau dont les totaux de lignes (ou de colonnes) sont tous différents. */
function tirerTabTotauxDistincts(nl: number, nc: number, parLigne: boolean): Tab {
  for (let essai = 0; essai < 50; essai++) {
    const t = tirerTab(sitAuHasard(), nl, nc);
    const tots = parLigne ? t.v.map(somme) : t.C.map((_, j) => somme(colDe(t, j)));
    if (new Set(tots).size === tots.length) return t;
  }
  return tirerTab(sitAuHasard(), nl, nc);
}

/** ★4 — vrai ou faux : une affirmation qui demande de calculer deux totaux. */
function genInterpVraiFaux(): Q {
  const t = tirerTabTotauxDistincts(3, 3, true);
  const i1 = randomInt(0, 2);
  const i2 = autre(3, i1);
  const s1 = somme(t.v[i1]);
  const s2 = somme(t.v[i2]);
  const pr = randomChoice(PRENOMS);
  const elle = pr.f ? "elle" : "il";
  const vrai = s1 > s2;
  return {
    text: `${t.sit.intro} ${pr.p} dit : « En tout, il y en a plus ${t.L[i1].gn} ${que(t.L[i2].gn)}. » A-t-${elle} raison ?`,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [vrai ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: `On calcule les deux totaux. ${t.L[i1].label} : ${t.v[i1].join(" + ")} = ${s1}. ${t.L[i2].label} : ${t.v[i2].join(" + ")} = ${s2}. ${vrai ? `${s1} > ${s2} : oui, ${elle} a raison.` : `${s1} < ${s2} : non, ${elle} se trompe.`}`,
    canvas: canvasTab(t),
  };
}

/** ★4 — quelle ligne a le plus grand TOTAL (le piège : la plus grande case). */
function genInterpMeilleurTotal(): Q {
  let t = tirerTabTotauxDistincts(4, 3, true);
  for (let essai = 0; essai < 30; essai++) {
    const tots = t.v.map(somme);
    const iTot = tots.indexOf(Math.max(...tots));
    const iCase = t.v.findIndex((r) => r.includes(Math.max(...t.v.flat())));
    if (iTot !== iCase) break;
    t = tirerTabTotauxDistincts(4, 3, true);
  }
  const tots = t.v.map(somme);
  const plus = Math.random() < 0.6;
  const cible = plus ? Math.max(...tots) : Math.min(...tots);
  const bon = t.L[tots.indexOf(cible)].label;
  return {
    text: `${t.sit.intro} En tout, ${quel(t.sit.lNom)} ${t.sit.lNom.mot} a le ${plus ? "plus" : "moins"} ${t.sit.de} ?`,
    format: "qcm",
    choices: makeChoices(bon, t.L.map((k) => k.label)),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: `On calcule le total de chaque ligne : ${t.L.map((k, i) => `${k.label} ${t.v[i].join(" + ")} = ${tots[i]}`).join(" ; ")}. Le ${plus ? "plus grand" : "plus petit"} total est ${cible} : ${guil(bon)}.${plus ? " Attention : la plus grande case seule ne suffit pas." : ""}`,
    canvas: canvasTab(t),
  };
}

// ------------------------------------------------------------
// TABLEAU_DEFI
// ------------------------------------------------------------

/** ★4 — le total de tout le tableau (3 × 3). */
function genDefiTotalGeneral(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const tl = t.v.map(somme);
  const g = somme(tl);
  return {
    text: `${t.sit.intro} Combien ${t.sit.de} en tout dans le tableau ?`,
    format: "qcm",
    choices: choixNombres(g, [tl[0] + tl[1], g - 10, g + 10, tl[2] * 3], t.sit.pas),
    expected: [String(g)],
    comparator: "mcq_exact",
    explanation: `On calcule le total de chaque ligne : ${t.L.map((k, i) => `${k.label} ${t.v[i].join(" + ")} = ${tl[i]}`).join(" ; ")}. Puis ${tl.join(" + ")} = ${g}.`,
    canvas: canvasTab(t),
  };
}

/** ★4 — quelle colonne a le plus grand total ? (piège : la plus grande case) */
function genDefiMeilleureColonne(): Q {
  let t = tirerTabTotauxDistincts(3, 4, false);
  for (let essai = 0; essai < 30; essai++) {
    const tots = t.C.map((_, j) => somme(colDe(t, j)));
    const jTot = tots.indexOf(Math.max(...tots));
    const big = Math.max(...t.v.flat());
    const jCase = t.v.map((r) => r.indexOf(big)).find((x) => x >= 0) ?? -1;
    if (jTot !== jCase) break;
    t = tirerTabTotauxDistincts(3, 4, false);
  }
  const tots = t.C.map((_, j) => somme(colDe(t, j)));
  const g = Math.max(...tots);
  const bon = t.C[tots.indexOf(g)].label;
  return {
    text: `${t.sit.intro} En additionnant chaque colonne, ${quel(t.sit.cNom)} ${t.sit.cNom.mot} a le plus ${t.sit.de} en tout ?`,
    format: "qcm",
    choices: makeChoices(bon, t.C.map((k) => k.label)),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: `On calcule le total de chaque colonne : ${t.C.map((k, j) => `${k.label} ${colDe(t, j).join(" + ")} = ${tots[j]}`).join(" ; ")}. Le plus grand total est ${g} : ${guil(bon)}. La plus grande case seule ne suffit pas.`,
    canvas: canvasTab(t),
  };
}

/** ★4 — un objectif à atteindre : combien en manque-t-il ? */
// Un objectif n'a de sens que pour ce qu'on cherche à atteindre (ventes, ramassage…),
// pas pour la pluie, les naissances ou les tortues.
const SANS_OBJECTIF = ["tortues", "mm", "oiseaux", "animaux", "interventions", "orchidées", "étoiles filantes", "bébés"];
function genDefiObjectif(): Q {
  const t = tirerTab(randomChoice(SITS.filter((x) => !SANS_OBJECTIF.includes(x.unite))), 3, 3);
  const i = randomInt(0, 2);
  const tot = somme(t.v[i]);
  const palier = tot < 100 ? 10 : 50;
  const obj = (Math.floor(tot / palier) + randomInt(1, 3)) * palier;
  const manque = obj - tot;
  return {
    text: `${t.sit.intro} ${debutLigne(t, i)}, on voulait atteindre ${nb(t, obj)} en tout sur ces trois ${pluriel(t.sit.cNom.mot)}. Combien en manque-t-il ?`,
    format: "qcm",
    choices: choixNombres(manque, [obj + tot, tot, manque + 10, obj - Math.max(...t.v[i])], t.sit.pas),
    expected: [String(manque)],
    comparator: "mcq_exact",
    explanation: `Étape 1 : total ${t.L[i].gn} : ${t.v[i].join(" + ")} = ${tot}. Étape 2 : ${obj} − ${tot} = ${manque}. Il en manque ${manque}.`,
    canvas: canvasTab(t),
  };
}

/** ★5 — deux cases « ? » sur une ligne : l'une par sa colonne, l'autre par la ligne. */
function genDefiDeuxInconnues(): Q {
  const t = tirerTab(sitAuHasard(), 3, 3);
  const i = randomInt(0, 2);
  const [ja, jb] = shuffle([0, 1, 2]).slice(0, 2);
  const totCa = somme(colDe(t, ja));
  const autresCa = colDe(t, ja).filter((_, k) => k !== i);
  const xa = t.v[i][ja];
  const xb = t.v[i][jb];
  const totL = somme(t.v[i]);
  const jc = 3 - ja - jb;
  return {
    text: `${t.sit.intro} Sur la ligne ${guil(t.L[i].label)}, deux cases sont effacées. Quel nombre faut-il écrire dans la colonne ${guil(t.C[jb].label)} ?`,
    format: "qcm",
    choices: choixNombres(xb, [xa, totL - t.v[i][jc], totL - xa, xb + 10], t.sit.pas),
    expected: [String(xb)],
    comparator: "mcq_exact",
    explanation: `Étape 1 : colonne ${guil(t.C[ja].label)}, total ${totCa}. La case effacée vaut ${totCa} − ${autresCa.join(" − ")} = ${xa}. Étape 2 : ligne ${guil(t.L[i].label)}, total ${totL}. La case cherchée vaut ${totL} − ${xa} − ${t.v[i][jc]} = ${xb}.`,
    canvas: (() => {
      const cv = canvasTab(t, { cache: [{ i, j: ja }, { i, j: jb }], totalLigne: true, totalCol: true });
      // La colonne de la 2e case n'a pas de total : sinon une seule étape suffit.
      cv.rows[cv.rows.length - 1].values[jb] = "?";
      return cv;
    })(),
  };
}

/** ★5 — écart entre deux TOTAUX (deux lignes ou deux colonnes). */
function genDefiEcartTotaux(): Q {
  const ligne = Math.random() < 0.5;
  const t = tirerTabTotauxDistincts(3, 3, ligne);
  const tots = ligne ? t.v.map(somme) : t.C.map((_, j) => somme(colDe(t, j)));
  const [k1, k2] = shuffle([0, 1, 2]).slice(0, 2);
  const [g, p] = tots[k1] > tots[k2] ? [k1, k2] : [k2, k1];
  const d = tots[g] - tots[p];
  const gnG = ligne ? t.L[g].gn : t.C[g].gn;
  const gnP = ligne ? t.L[p].gn : t.C[p].gn;
  const xsG = ligne ? t.v[g] : colDe(t, g);
  const xsP = ligne ? t.v[p] : colDe(t, p);
  return {
    text: `${t.sit.intro} En tout, combien ${t.sit.de} de plus ${gnG} ${que(gnP)} ?`,
    format: "qcm",
    choices: choixNombres(d, [tots[g] + tots[p], tots[g], Math.abs(xsG[0] - xsP[0]), d + 10], t.sit.pas),
    expected: [String(d)],
    comparator: "mcq_exact",
    explanation: `Étape 1 : ${xsG.join(" + ")} = ${tots[g]} et ${xsP.join(" + ")} = ${tots[p]}. Étape 2 : ${tots[g]} − ${tots[p]} = ${d}.`,
    canvas: canvasTab(t),
  };
}

/** ★5 — regrouper quatre cases (deux lignes × deux colonnes). */
function genDefiRegrouper(): Q {
  const t = tirerTab(sitAuHasard(), 3, 4);
  const [i1, i2] = shuffle([0, 1, 2]).slice(0, 2).sort();
  const [j1, j2] = shuffle([0, 1, 2, 3]).slice(0, 2).sort();
  const xs = [t.v[i1][j1], t.v[i1][j2], t.v[i2][j1], t.v[i2][j2]];
  const s = somme(xs);
  return {
    text: `${t.sit.intro} Combien ${t.sit.de} ${t.L[i1].gn} et ${t.L[i2].gn}, ${t.C[j1].gn} et ${t.C[j2].gn}, en tout ?`,
    format: "qcm",
    choices: choixNombres(s, [xs[0] + xs[1], xs[0] + xs[2], s + 10, s - xs[3]], t.sit.pas),
    expected: [String(s)],
    comparator: "mcq_exact",
    explanation: `On prend les quatre cases : ${t.L[i1].label} (${xs[0]} et ${xs[1]}) et ${t.L[i2].label} (${xs[2]} et ${xs[3]}). ${xs.join(" + ")} = ${s}.`,
    canvas: canvasTab(t),
  };
}

/** Un gabarit de la notion « tableau » (CM2). */
function tpl(
  id: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return {
    kind: "template", id, niveau: "cm2", matiere: "maths", notionId: "tableau", microId, difficulty,
    theme: "neutral", hint, tags: ["cm2", "tableau", ...tags, "template", "qcm", "canvas"], generate,
  };
}

// ============================================================
// BANK
// ============================================================

export const tableauxBank: TutorBankItemV4[] = [
  // ============================================================
  // TABLEAU_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "À quoi sert un tableau de données ?",
    format: "qcm",
    choices: [
      "à organiser des informations pour les lire plus facilement",
      "à dessiner seulement des figures géométriques",
      "à remplacer tous les calculs",
      "à écrire une histoire sans nombres",
    ],
    expected: ["à organiser des informations pour les lire plus facilement"],
    comparator: "mcq_exact",
    hint: "Un tableau range des informations en lignes et en colonnes.",
    explanation:
      "Un tableau de données sert à organiser des informations. On peut ainsi lire plus facilement les valeurs, comparer des données ou répondre à des questions.",
    tags: ["cm2", "tableau", "lire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_2_ligne_colonne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau, les informations sont souvent rangées...",
    format: "qcm",
    choices: [
      "en lignes et en colonnes",
      "uniquement en cercle",
      "seulement au hasard",
      "toujours dans une phrase longue",
    ],
    expected: ["en lignes et en colonnes"],
    comparator: "mcq_exact",
    hint: "Regarde la forme d’un tableau.",
    explanation:
      "Dans un tableau, les informations sont rangées en lignes et en colonnes. Pour lire une donnée, on croise souvent une ligne et une colonne.",
    tags: ["cm2", "tableau", "lire", "ligne", "colonne", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_3_lire_cellule_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Dans le tableau, combien d’ananas ont été vendus mardi ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Cherche la ligne “Ananas”, puis la colonne “Mardi”.",
    explanation:
      "On lit la ligne “Ananas” et la colonne “Mardi”. La case située au croisement indique 24.",
    tags: ["cm2", "tableau", "lire", "cellule", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_4_lire_cellule_bananes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Dans le tableau, combien de bananes ont été vendues mercredi ?",
    format: "short",
    expected: ["35"],
    comparator: "number_equal",
    hint: "Croise la ligne “Bananes” avec la colonne “Mercredi”.",
    explanation:
      "La ligne “Bananes” et la colonne “Mercredi” se croisent sur la valeur 35.",
    tags: ["cm2", "tableau", "lire", "cellule", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      cell: {
        row: 1,
        col: 2,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_5_lire_sport_football",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves ont choisi le football ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Cherche la colonne “Football”.",
    explanation:
      "Dans la colonne “Football”, on lit 12. Donc 12 élèves ont choisi le football.",
    tags: ["cm2", "tableau", "lire", "sport", "short", "canvas"],
    canvas: tableauSportCanvas({
      cell: {
        row: 0,
        col: 0,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_6_lire_sport_natation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves ont choisi la natation ?",
    format: "qcm",
    choices: ["7", "9", "10", "12"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Lis la valeur sous “Natation”.",
    explanation:
      "La valeur située sous “Natation” est 7. La bonne réponse est donc 7 élèves.",
    tags: ["cm2", "tableau", "lire", "sport", "qcm", "canvas"],
    canvas: tableauSportCanvas({
      cell: {
        row: 0,
        col: 2,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_7_lire_livres_bd",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de BD ont été lues ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Cherche la colonne “BD”.",
    explanation:
      "Dans la colonne “BD”, on lit 22. Les élèves ont donc lu 22 BD.",
    tags: ["cm2", "tableau", "lire", "livres", "short", "canvas"],
    canvas: tableauBibliothequeCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_8_lire_temperature",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Quelle température a été relevée jeudi ?",
    format: "qcm",
    choices: ["28°C", "25°C", "26°C", "27°C"],
    expected: ["28°C"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne “Jeudi”.",
    explanation:
      "Dans la colonne “Jeudi”, on lit 28°C. La température relevée jeudi est donc 28°C.",
    tags: ["cm2", "tableau", "lire", "temperature", "reunion", "qcm", "canvas"],
    canvas: tableauMeteoCanvas({
      cell: {
        row: 0,
        col: 3,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_9_lire_cantine",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Combien d’élèves ont choisi le rougail ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Lis la valeur sous “Rougail”.",
    explanation:
      "Dans la colonne “Rougail”, on lit 14. Donc 14 élèves ont choisi le rougail.",
    tags: ["cm2", "tableau", "lire", "cantine", "reunion", "short", "canvas"],
    canvas: tableauCantineCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_10_lire_ligne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau des fruits, quelle ligne faut-il lire pour connaître les ventes de mangues ?",
    format: "qcm",
    choices: ["Mangues", "Ananas", "Bananes", "Mercredi"],
    expected: ["Mangues"],
    comparator: "mcq_exact",
    hint: "La ligne porte le nom du fruit.",
    explanation:
      "Pour connaître les ventes de mangues, il faut lire la ligne “Mangues”.",
    tags: ["cm2", "tableau", "lire", "ligne", "reunion", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      row: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_11_lire_colonne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau des fruits, quelle colonne faut-il lire pour connaître les ventes du mercredi ?",
    format: "qcm",
    choices: ["Mercredi", "Mardi", "Lundi", "Ananas"],
    expected: ["Mercredi"],
    comparator: "mcq_exact",
    hint: "La colonne porte le nom du jour.",
    explanation:
      "Pour connaître les ventes du mercredi, il faut lire la colonne “Mercredi”.",
    tags: ["cm2", "tableau", "lire", "colonne", "reunion", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_12_unite_caption",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau des fruits, les nombres représentent...",
    format: "qcm",
    choices: [
      "le nombre de fruits vendus",
      "le prix des fruits",
      "la masse des fruits",
      "la température",
    ],
    expected: ["le nombre de fruits vendus"],
    comparator: "mcq_exact",
    hint: "Lis la légende sous le tableau.",
    explanation:
      "La légende indique “Nombre de fruits vendus”. Les nombres du tableau représentent donc des quantités de fruits vendus.",
    tags: ["cm2", "tableau", "lire", "legende", "unite", "reunion", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_13_erreur_ligne_colonne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 3,
    theme: "reunion",
    text: "Un élève cherche les ananas vendus mardi, mais il lit la ligne “Bananes”. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut lire la ligne du bon fruit.",
    explanation:
      "Non. Pour connaître les ananas vendus mardi, il faut lire la ligne “Ananas” et la colonne “Mardi”.",
    tags: ["cm2", "tableau", "lire", "erreur", "ligne", "colonne", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      row: 0,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_14_erreur_colonne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève veut lire le nombre d’élèves ayant choisi le basket, mais il regarde la colonne “Danse”. Est-ce correct ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut lire la colonne correspondant à l’activité demandée.",
    explanation:
      "Non. Pour lire le nombre d’élèves ayant choisi le basket, il faut regarder la colonne “Basket”.",
    tags: ["cm2", "tableau", "lire", "erreur", "sport", "qcm", "canvas"],
    canvas: tableauSportCanvas({
      col: 3,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_15_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment lire une donnée dans un tableau.",
    format: "open",
    expected: ["ligne", "colonne", "croiser", "case", "valeur"],
    comparator: "contains_keyword",
    hint: "Parle de la ligne, de la colonne et de la case au croisement.",
    explanation:
      "Pour lire une donnée dans un tableau, on repère la bonne ligne et la bonne colonne. La valeur se trouve dans la case au croisement.",
    tags: ["cm2", "tableau", "lire", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_lire_fixed_16_open_pourquoi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi un tableau peut-il aider à mieux comprendre des données ?",
    format: "open",
    expected: ["organise", "lignes", "colonnes", "comparer", "lire"],
    comparator: "contains_keyword",
    hint: "Un tableau range les informations.",
    explanation:
      "Un tableau aide à comprendre des données car il les organise en lignes et en colonnes. On peut alors lire, comparer et retrouver les informations plus facilement.",
    tags: ["cm2", "tableau", "lire", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "cm2_tableau_lire_tpl_1_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis seulement la ligne (ou la colonne) donnée, et cherche le nombre.",
    tags: ["cm2", "tableau", "lire", "sport", "template", "qcm", "canvas"],
    generate: genLireInverse,
  },

  {
    kind: "template",
    id: "cm2_tableau_lire_tpl_2_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    hint: "Repère la ligne, puis la colonne : la réponse est au croisement.",
    tags: ["cm2", "tableau", "lire", "fruits", "reunion", "template", "short", "canvas"],
    generate: genLireGrandOuTotal,
  },

  {
    kind: "template",
    id: "cm2_tableau_lire_tpl_3_ligne_colonne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Une ligne se lit de gauche à droite ; une colonne de haut en bas.",
    tags: ["cm2", "tableau", "lire", "ligne", "colonne", "template", "qcm", "canvas"],
    generate: genLireErreur,
  },
    // ============================================================
  // TABLEAU_COMPLETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 1,
    theme: "neutral",
    text: "Compléter un tableau, c’est...",
    format: "qcm",
    choices: [
      "retrouver une information manquante",
      "effacer toutes les lignes",
      "changer les titres au hasard",
      "ne lire que la première case",
    ],
    expected: ["retrouver une information manquante"],
    comparator: "mcq_exact",
    hint: "Il manque une valeur dans le tableau.",
    explanation:
      "Compléter un tableau, c’est retrouver une information manquante en utilisant les données déjà présentes.",
    tags: ["cm2", "tableau", "completer", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_2_lire_avant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 1,
    theme: "neutral",
    text: "Avant de compléter une case d’un tableau, il faut d’abord...",
    format: "qcm",
    choices: [
      "lire le titre de la ligne et de la colonne",
      "choisir un nombre au hasard",
      "effacer le tableau",
      "regarder seulement la dernière case",
    ],
    expected: ["lire le titre de la ligne et de la colonne"],
    comparator: "mcq_exact",
    hint: "Une case dépend de sa ligne et de sa colonne.",
    explanation:
      "Avant de compléter une case, on lit le titre de la ligne et le titre de la colonne. Cela permet de savoir quelle information est demandée.",
    tags: ["cm2", "tableau", "completer", "ligne", "colonne", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_3_fruits_case_manquante",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau, la case des mangues vendues mardi est manquante. Quelle valeur faut-il écrire ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Cherche la ligne “Mangues” et la colonne “Mardi”.",
    explanation:
      "On croise la ligne “Mangues” avec la colonne “Mardi”. La valeur à écrire est 15.",
    tags: ["cm2", "tableau", "completer", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      cell: {
        row: 2,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_4_sport_case_manquante",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le tableau, combien d’élèves faut-il écrire pour la danse ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Lis la colonne “Danse”.",
    explanation:
      "Dans la colonne “Danse”, la valeur est 9. Il faut donc écrire 9 élèves.",
    tags: ["cm2", "tableau", "completer", "sport", "short", "canvas"],
    canvas: tableauSportCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_5_bibliotheque_case",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le tableau, quelle valeur faut-il écrire pour les documentaires ?",
    format: "qcm",
    choices: ["9", "14", "18", "22"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne “Documentaires”.",
    explanation:
      "La colonne “Documentaires” indique 9. Il faut donc écrire 9.",
    tags: ["cm2", "tableau", "completer", "livres", "qcm", "canvas"],
    canvas: tableauBibliothequeCanvas({
      cell: {
        row: 0,
        col: 3,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_6_temperature",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau, la température du mardi est manquante. Quelle valeur faut-il écrire ?",
    format: "qcm",
    choices: ["27°C", "25°C", "26°C", "28°C"],
    expected: ["27°C"],
    comparator: "mcq_exact",
    hint: "Regarde la colonne “Mardi”.",
    explanation:
      "Dans la colonne “Mardi”, on lit 27°C. La valeur manquante est donc 27°C.",
    tags: ["cm2", "tableau", "completer", "temperature", "qcm", "canvas"],
    canvas: tableauMeteoCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_7_cantine",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Dans le tableau, quelle valeur faut-il écrire pour les élèves ayant choisi le sandwich ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Lis la colonne “Sandwich”.",
    explanation:
      "La colonne “Sandwich” indique 12. Il faut donc écrire 12 élèves.",
    tags: ["cm2", "tableau", "completer", "cantine", "reunion", "short", "canvas"],
    canvas: tableauCantineCanvas({
      cell: {
        row: 0,
        col: 3,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_8_total_simple_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    text: "On veut compléter le total des élèves du tableau : 12 + 9 + 7 + 10. Quel total faut-il écrire ?",
    format: "short",
    expected: ["38"],
    comparator: "number_equal",
    hint: "Additionne toutes les valeurs du tableau.",
    explanation:
      "On additionne les valeurs : 12 + 9 + 7 + 10 = 38. Il faut écrire 38.",
    tags: ["cm2", "tableau", "completer", "total", "sport", "short", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_9_total_livres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    text: "On veut compléter le total des livres lus : 14 + 22 + 18 + 9. Quel total faut-il écrire ?",
    format: "short",
    expected: ["63"],
    comparator: "number_equal",
    hint: "Additionne les nombres de livres.",
    explanation:
      "Calcul : 14 + 22 + 18 + 9 = 63. Le total est donc 63 livres.",
    tags: ["cm2", "tableau", "completer", "total", "livres", "short", "canvas"],
    canvas: tableauBibliothequeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_10_total_fruits_lundi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "reunion",
    text: "On veut compléter le total des fruits vendus lundi : 18 + 30 + 12. Quel total faut-il écrire ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Additionne les valeurs de la colonne “Lundi”.",
    explanation:
      "Dans la colonne “Lundi”, on additionne 18 + 30 + 12 = 60. Le total du lundi est 60 fruits.",
    tags: ["cm2", "tableau", "completer", "total", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 0,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_11_total_fruits_mercredi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "reunion",
    text: "On veut compléter le total des fruits vendus mercredi : 20 + 35 + 18. Quel total faut-il écrire ?",
    format: "short",
    expected: ["73"],
    comparator: "number_equal",
    hint: "Additionne les valeurs de la colonne “Mercredi”.",
    explanation:
      "On additionne les fruits du mercredi : 20 + 35 + 18 = 73. Le total est 73 fruits.",
    tags: ["cm2", "tableau", "completer", "total", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_12_completer_par_difference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une enquête, il y a 40 élèves. 12 ont choisi le football, 9 la danse, 7 la natation. Combien ont choisi le basket ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Additionne les valeurs connues, puis retire ce total à 40.",
    explanation:
      "On additionne les choix connus : 12 + 9 + 7 = 28. Il reste 40 - 28 = 12. Donc 12 élèves ont choisi le basket.",
    tags: ["cm2", "tableau", "completer", "difference", "sport", "short"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_13_erreur_choisir_hasard",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève complète une case manquante sans lire la ligne ni la colonne. Est-ce une bonne méthode ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une valeur du tableau a un sens précis.",
    explanation:
      "Non. Une case du tableau correspond à une ligne et une colonne. Il faut donc lire les deux titres avant de compléter.",
    tags: ["cm2", "tableau", "completer", "erreur", "methode", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_14_erreur_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule le total des activités : 12 + 9 + 7 + 10 = 28. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Refais l’addition.",
    explanation:
      "Non. Le calcul correct est 12 + 9 + 7 + 10 = 38. L’élève a fait une erreur d’addition.",
    tags: ["cm2", "tableau", "completer", "erreur", "total", "qcm", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_15_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment compléter une case manquante dans un tableau.",
    format: "open",
    expected: ["ligne", "colonne", "case", "information", "valeur"],
    comparator: "contains_keyword",
    hint: "Parle de la ligne, de la colonne et de la valeur à écrire.",
    explanation:
      "Pour compléter une case manquante, on repère la ligne et la colonne de cette case. Ensuite, on utilise les informations du tableau ou de l’énoncé pour écrire la valeur correcte.",
    tags: ["cm2", "tableau", "completer", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_completer_fixed_16_open_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment compléter une case “Total” dans un tableau.",
    format: "open",
    expected: ["additionner", "valeurs", "ligne", "colonne", "total"],
    comparator: "contains_keyword",
    hint: "Un total s’obtient souvent par addition.",
    explanation:
      "Pour compléter une case “Total”, on additionne les valeurs de la ligne ou de la colonne concernée. Il faut vérifier que l’on additionne les bonnes données.",
    tags: ["cm2", "tableau", "completer", "open", "total", "methode"],
  },

  {
    kind: "template",
    id: "cm2_tableau_completer_tpl_1_cellule_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    hint: "Additionne les cases connues, puis retire-les au total.",
    tags: ["cm2", "tableau", "completer", "fruits", "template", "short", "canvas"],
    generate: genCompleterParTotal,
  },

  {
    kind: "template",
    id: "cm2_tableau_completer_tpl_2_cellule_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la case voisine, puis ajoute ou retire l'écart.",
    tags: ["cm2", "tableau", "completer", "sport", "template", "qcm", "canvas"],
    generate: genCompleterPhrase,
  },

  {
    kind: "template",
    id: "cm2_tableau_completer_tpl_3_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un total s'obtient en additionnant toutes les cases de la ligne ou de la colonne.",
    tags: ["cm2", "tableau", "completer", "total", "template", "short", "canvas"],
    generate: genCompleterTotal,
  },

  {
    kind: "template",
    id: "cm2_tableau_completer_tpl_4_difference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les cases connues de la colonne, puis retire-les au total.",
    tags: ["cm2", "tableau", "completer", "difference", "template", "short"],
    generate: genCompleterColonne,
  },
    // ============================================================
  // TABLEAU_INTERPRETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 1,
    theme: "neutral",
    text: "Interpréter un tableau, c’est...",
    format: "qcm",
    choices: [
      "utiliser les données pour répondre à une question",
      "copier les nombres sans réfléchir",
      "changer les titres du tableau",
      "ne lire qu’une seule colonne au hasard",
    ],
    expected: ["utiliser les données pour répondre à une question"],
    comparator: "mcq_exact",
    hint: "Interpréter, c’est donner du sens aux données.",
    explanation:
      "Interpréter un tableau, c’est utiliser les données pour répondre à une question, comparer des valeurs ou tirer une conclusion.",
    tags: ["cm2", "tableau", "interpreter", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_2_plus_grand_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle activité a été choisie par le plus d’élèves ?",
    format: "qcm",
    choices: ["Football", "Danse", "Natation", "Basket"],
    expected: ["Football"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre du tableau.",
    explanation:
      "On compare les valeurs : Football 12, Danse 9, Natation 7, Basket 10. Le plus grand nombre est 12, donc l’activité la plus choisie est Football.",
    tags: ["cm2", "tableau", "interpreter", "maximum", "sport", "qcm", "canvas"],
    canvas: tableauSportCanvas({
      cell: {
        row: 0,
        col: 0,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_3_plus_petit_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle activité a été choisie par le moins d’élèves ?",
    format: "qcm",
    choices: ["Natation", "Football", "Danse", "Basket"],
    expected: ["Natation"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit nombre du tableau.",
    explanation:
      "On compare les valeurs du tableau. Le plus petit nombre est 7, sous “Natation”. L’activité la moins choisie est donc la natation.",
    tags: ["cm2", "tableau", "interpreter", "minimum", "sport", "qcm", "canvas"],
    canvas: tableauSportCanvas({
      cell: {
        row: 0,
        col: 2,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_4_difference_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’élèves de plus ont choisi le football que la natation ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compare 12 et 7.",
    explanation:
      "Football : 12 élèves. Natation : 7 élèves. La différence est 12 - 7 = 5. Il y a donc 5 élèves de plus pour le football.",
    tags: ["cm2", "tableau", "interpreter", "difference", "sport", "short", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_5_plus_vendu_fruit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel fruit a été le plus vendu mercredi ?",
    format: "qcm",
    choices: ["Bananes", "Ananas", "Mangues", "On ne peut pas savoir"],
    expected: ["Bananes"],
    comparator: "mcq_exact",
    hint: "Lis la colonne “Mercredi” et compare les nombres.",
    explanation:
      "Dans la colonne “Mercredi”, on lit : Ananas 20, Bananes 35, Mangues 18. Le plus grand nombre est 35, donc les bananes ont été les plus vendues.",
    tags: ["cm2", "tableau", "interpreter", "maximum", "fruits", "reunion", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_6_moins_vendu_fruit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel fruit a été le moins vendu lundi ?",
    format: "qcm",
    choices: ["Mangues", "Ananas", "Bananes", "Tous pareil"],
    expected: ["Mangues"],
    comparator: "mcq_exact",
    hint: "Lis la colonne “Lundi”.",
    explanation:
      "Lundi, on lit : Ananas 18, Bananes 30, Mangues 12. Le plus petit nombre est 12, donc les mangues ont été les moins vendues.",
    tags: ["cm2", "tableau", "interpreter", "minimum", "fruits", "reunion", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 0,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_7_total_ananas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien d’ananas ont été vendus au total sur les trois jours ?",
    format: "short",
    expected: ["62"],
    comparator: "number_equal",
    hint: "Additionne les valeurs de la ligne “Ananas”.",
    explanation:
      "Pour les ananas, on additionne les trois jours : 18 + 24 + 20 = 62. Au total, 62 ananas ont été vendus.",
    tags: ["cm2", "tableau", "interpreter", "total", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      row: 0,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_8_total_bananes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de bananes ont été vendues au total sur les trois jours ?",
    format: "short",
    expected: ["93"],
    comparator: "number_equal",
    hint: "Additionne les valeurs de la ligne “Bananes”.",
    explanation:
      "Pour les bananes, on additionne : 30 + 28 + 35 = 93. Le total est donc 93 bananes.",
    tags: ["cm2", "tableau", "interpreter", "total", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      row: 1,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_9_total_mercredi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de fruits ont été vendus au total mercredi ?",
    format: "short",
    expected: ["73"],
    comparator: "number_equal",
    hint: "Additionne les valeurs de la colonne “Mercredi”.",
    explanation:
      "Mercredi, on additionne : 20 + 35 + 18 = 73. Le total est donc 73 fruits.",
    tags: ["cm2", "tableau", "interpreter", "total", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_10_difference_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Mardi, combien de bananes de plus que de mangues ont été vendues ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Mardi : bananes 28, mangues 15.",
    explanation:
      "Mardi, 28 bananes et 15 mangues ont été vendues. La différence est 28 - 15 = 13.",
    tags: ["cm2", "tableau", "interpreter", "difference", "fruits", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 1,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_11_temperature_max",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel jour la température a-t-elle été la plus élevée ?",
    format: "qcm",
    choices: ["Jeudi", "Lundi", "Mardi", "Mercredi"],
    expected: ["Jeudi"],
    comparator: "mcq_exact",
    hint: "Cherche la température la plus grande.",
    explanation:
      "Les températures sont 25°C, 27°C, 26°C et 28°C. La plus grande est 28°C, relevée jeudi.",
    tags: ["cm2", "tableau", "interpreter", "temperature", "maximum", "qcm", "canvas"],
    canvas: tableauMeteoCanvas({
      cell: {
        row: 0,
        col: 3,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_12_livres_plus_lus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quel type de livre a été le plus lu ?",
    format: "qcm",
    choices: ["BD", "Romans", "Mangas", "Documentaires"],
    expected: ["BD"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre de livres.",
    explanation:
      "On compare : Romans 14, BD 22, Mangas 18, Documentaires 9. Le plus grand nombre est 22, donc ce sont les BD.",
    tags: ["cm2", "tableau", "interpreter", "livres", "maximum", "qcm", "canvas"],
    canvas: tableauBibliothequeCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_13_cantine_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien d’élèves ont répondu à l’enquête sur les menus ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "Additionne tous les choix.",
    explanation:
      "On additionne les choix : 16 + 14 + 8 + 12 = 50. Donc 50 élèves ont répondu.",
    tags: ["cm2", "tableau", "interpreter", "cantine", "total", "reunion", "short", "canvas"],
    canvas: tableauCantineCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_14_cantine_plus_choisi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "reunion",
    text: "Quel menu a été le plus choisi ?",
    format: "qcm",
    choices: ["Cari", "Rougail", "Salade", "Sandwich"],
    expected: ["Cari"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
    explanation:
      "Les choix sont : Cari 16, Rougail 14, Salade 8, Sandwich 12. Le plus choisi est donc le cari.",
    tags: ["cm2", "tableau", "interpreter", "cantine", "maximum", "reunion", "qcm", "canvas"],
    canvas: tableauCantineCanvas({
      cell: {
        row: 0,
        col: 0,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_15_erreur_plus_grand",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que la natation est l’activité la plus choisie. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare toutes les valeurs.",
    explanation:
      "Non. La natation a 7 élèves, alors que le football en a 12. L’activité la plus choisie est le football.",
    tags: ["cm2", "tableau", "interpreter", "erreur", "maximum", "qcm", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_16_erreur_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que le total des livres lus est 53. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Additionne 14 + 22 + 18 + 9.",
    explanation:
      "Non. Le total correct est 14 + 22 + 18 + 9 = 63. L’élève s’est trompé dans le calcul.",
    tags: ["cm2", "tableau", "interpreter", "erreur", "total", "qcm", "canvas"],
    canvas: tableauBibliothequeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_17_open_interpreter",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment trouver la plus grande valeur dans un tableau.",
    format: "open",
    expected: ["lire", "valeurs", "comparer", "plus grand", "tableau"],
    comparator: "contains_keyword",
    hint: "Il faut lire puis comparer les valeurs.",
    explanation:
      "Pour trouver la plus grande valeur, on lit les valeurs concernées dans le tableau, puis on les compare. La plus grande donne la réponse.",
    tags: ["cm2", "tableau", "interpreter", "open", "maximum", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_interpreter_fixed_18_open_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment calculer un total à partir d’un tableau.",
    format: "open",
    expected: ["additionner", "valeurs", "ligne", "colonne", "total"],
    comparator: "contains_keyword",
    hint: "Un total s’obtient souvent par addition.",
    explanation:
      "Pour calculer un total, on repère les valeurs à utiliser dans une ligne, une colonne ou tout le tableau. Ensuite, on les additionne.",
    tags: ["cm2", "tableau", "interpreter", "open", "total", "methode"],
  },

  {
    kind: "template",
    id: "cm2_tableau_interpreter_tpl_1_max_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis toute la colonne, puis compare les nombres.",
    tags: ["cm2", "tableau", "interpreter", "maximum", "template", "qcm", "canvas"],
    generate: genInterpMaxColonne,
  },

  {
    kind: "template",
    id: "cm2_tableau_interpreter_tpl_2_total_fruits_jour",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    hint: "Additionne toutes les cases de la ligne ou de la colonne.",
    tags: ["cm2", "tableau", "interpreter", "total", "fruits", "reunion", "template", "short", "canvas"],
    generate: genInterpTotal,
  },

  {
    kind: "template",
    id: "cm2_tableau_interpreter_tpl_3_difference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis les deux cases, puis soustrais la plus petite à la plus grande.",
    tags: ["cm2", "tableau", "interpreter", "difference", "template", "short", "canvas"],
    generate: genInterpEcartCroise,
  },

  {
    kind: "template",
    id: "cm2_tableau_interpreter_tpl_4_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les deux totaux avant de répondre.",
    tags: ["cm2", "tableau", "interpreter", "erreur", "template", "qcm", "canvas"],
    generate: genInterpVraiFaux,
  },
  // ============================================================
  // TABLEAU_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_1_question_mixte_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché, quel jour a-t-on vendu le plus de fruits au total ?",
    format: "qcm",
    choices: ["Mercredi", "Mardi", "Lundi", "On ne peut pas savoir"],
    expected: ["Mercredi"],
    comparator: "mcq_exact",
    hint: "Calcule le total de chaque colonne.",
    explanation:
      "On calcule les totaux par jour : lundi 18 + 30 + 12 = 60, mardi 24 + 28 + 15 = 67, mercredi 20 + 35 + 18 = 73. Le plus grand total est mercredi.",
    tags: ["cm2", "tableau", "defi", "fruits", "reunion", "total", "maximum", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas({
      col: 2,
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_2_question_mixte_fruits_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Combien de fruits ont été vendus au total sur les trois jours ?",
    format: "short",
    expected: ["200"],
    comparator: "number_equal",
    hint: "Additionne les totaux des trois jours.",
    explanation:
      "On peut additionner par colonnes : lundi 60, mardi 67, mercredi 73. Donc 60 + 67 + 73 = 200 fruits vendus au total.",
    tags: ["cm2", "tableau", "defi", "fruits", "reunion", "total", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_3_difference_jours",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Combien de fruits de plus ont été vendus mercredi que lundi ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Calcule le total du mercredi, le total du lundi, puis compare.",
    explanation:
      "Le total du mercredi est 73. Le total du lundi est 60. La différence est 73 - 60 = 13.",
    tags: ["cm2", "tableau", "defi", "fruits", "difference", "reunion", "short", "canvas"],
    canvas: tableauFruitsReunionCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_4_livres_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle conclusion est correcte à partir du tableau des livres lus ?",
    format: "qcm",
    choices: [
      "Les BD sont les livres les plus lus",
      "Les documentaires sont les livres les plus lus",
      "Les romans sont plus lus que les mangas",
      "Tous les types de livres ont été lus autant de fois",
    ],
    expected: ["Les BD sont les livres les plus lus"],
    comparator: "mcq_exact",
    hint: "Cherche la plus grande valeur du tableau.",
    explanation:
      "On compare les valeurs : Romans 14, BD 22, Mangas 18, Documentaires 9. La plus grande valeur est 22 : les BD sont donc les livres les plus lus.",
    tags: ["cm2", "tableau", "defi", "livres", "conclusion", "maximum", "qcm", "canvas"],
    canvas: tableauBibliothequeCanvas({
      cell: {
        row: 0,
        col: 1,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_5_cantine_ecart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À la cantine, combien d’élèves de plus ont choisi le cari que la salade ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compare 16 et 8.",
    explanation:
      "Cari : 16 élèves. Salade : 8 élèves. On calcule 16 - 8 = 8. Il y a donc 8 élèves de plus pour le cari.",
    tags: ["cm2", "tableau", "defi", "cantine", "difference", "reunion", "short", "canvas"],
    canvas: tableauCantineCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_6_temperature_ecart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Quel est l’écart entre la température la plus haute et la plus basse ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Trouve la plus grande température et la plus petite, puis soustrais.",
    explanation:
      "La température la plus haute est 28°C et la plus basse est 25°C. L’écart est 28 - 25 = 3°C.",
    tags: ["cm2", "tableau", "defi", "temperature", "ecart", "reunion", "short", "canvas"],
    canvas: tableauMeteoCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_7_erreur_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Le basket est l’activité la plus choisie.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare les quatre valeurs du tableau.",
    explanation:
      "Non. Le basket a été choisi par 10 élèves, mais le football a été choisi par 12 élèves. Le football est donc l’activité la plus choisie.",
    tags: ["cm2", "tableau", "defi", "erreur", "conclusion", "qcm", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_8_erreur_total_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un élève dit : “Au total, 190 fruits ont été vendus.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Additionne toutes les valeurs du tableau.",
    explanation:
      "Non. Le total correct est 18 + 24 + 20 + 30 + 28 + 35 + 12 + 15 + 18 = 200. L’élève s’est trompé dans son total.",
    tags: ["cm2", "tableau", "defi", "erreur", "total", "fruits", "qcm", "canvas"],
    canvas: tableauFruitsReunionCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_9_question_a_deux_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans le tableau des activités, combien d’élèves ont choisi un sport collectif : football ou basket ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Additionne seulement football et basket.",
    explanation:
      "Football : 12 élèves. Basket : 10 élèves. On additionne 12 + 10 = 22. Donc 22 élèves ont choisi football ou basket.",
    tags: ["cm2", "tableau", "defi", "deux_etapes", "sport", "short", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_10_question_a_deux_etapes_livres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de livres de loisirs ont été lus si on regroupe BD et mangas ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Additionne BD et mangas.",
    explanation:
      "BD : 22 livres. Mangas : 18 livres. Donc 22 + 18 = 40 livres de loisirs.",
    tags: ["cm2", "tableau", "defi", "livres", "regrouper", "short", "canvas"],
    canvas: tableauBibliothequeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_11_open_methode_defi",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique une méthode pour résoudre un problème à partir d’un tableau.",
    format: "open",
    expected: ["question", "ligne", "colonne", "valeurs", "calcul", "réponse"],
    comparator: "contains_keyword",
    hint: "Commence par lire la question, puis repère les bonnes données.",
    explanation:
      "Méthode : d’abord, on lit bien la question. Ensuite, on repère les lignes et colonnes utiles. Puis on lit les valeurs nécessaires, on fait le calcul demandé, et on rédige une réponse claire.",
    tags: ["cm2", "tableau", "defi", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_12_open_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi il ne faut pas répondre à une question de tableau en prenant un nombre au hasard.",
    format: "open",
    expected: ["ligne", "colonne", "question", "donnée", "vérifier"],
    comparator: "contains_keyword",
    hint: "Une valeur du tableau correspond toujours à une information précise.",
    explanation:
      "Chaque nombre du tableau a un sens : il dépend d’une ligne et d’une colonne. Pour répondre correctement, il faut lire la question, repérer la bonne donnée et vérifier que la valeur utilisée correspond bien à ce qui est demandé.",
    tags: ["cm2", "tableau", "defi", "open", "erreur", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "cm2_tableau_defi_fixed_13_open_conclusion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    text: "À partir du tableau des activités, rédige une conclusion vraie.",
    format: "open",
    expected: ["football", "12", "natation", "7", "plus", "moins"],
    comparator: "contains_keyword",
    hint: "Tu peux parler de l’activité la plus choisie ou la moins choisie.",
    explanation:
      "Exemples de conclusions vraies : le football est l’activité la plus choisie avec 12 élèves ; la natation est l’activité la moins choisie avec 7 élèves.",
    tags: ["cm2", "tableau", "defi", "open", "conclusion", "sport", "canvas"],
    canvas: tableauSportCanvas(),
  },

  {
    kind: "template",
    id: "cm2_tableau_defi_tpl_1_totaux_fruits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule le total de chaque ligne, puis additionne ces totaux.",
    tags: ["cm2", "tableau", "defi", "fruits", "total", "template", "short", "canvas"],
    generate: genDefiTotalGeneral,
  },

  {
    kind: "template",
    id: "cm2_tableau_defi_tpl_2_plus_moins",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule le total de chaque colonne avant de comparer.",
    tags: ["cm2", "tableau", "defi", "maximum", "minimum", "template", "qcm", "canvas"],
    generate: genDefiMeilleureColonne,
  },

  {
    kind: "template",
    id: "cm2_tableau_defi_tpl_3_differences",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule les deux totaux, puis leur écart.",
    tags: ["cm2", "tableau", "defi", "difference", "template", "short", "canvas"],
    generate: genDefiEcartTotaux,
  },

  {
    kind: "template",
    id: "cm2_tableau_defi_tpl_4_erreurs",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par la colonne dont le total est connu.",
    tags: ["cm2", "tableau", "defi", "erreur", "template", "qcm", "canvas"],
    generate: genDefiDeuxInconnues,
  },

  // ============================================================
  // ⭐ 20/10/2026 — GÉNÉRATEURS AJOUTÉS (situation × tournure à chaque étoile)
  // ============================================================
  tpl("cm2_tableau_lire_tpl_4_case", "tableau_lire", 1, "Repère la ligne, puis la colonne : la réponse est au croisement.", ["lire", "cellule"], genLireCase),
  tpl("cm2_tableau_lire_tpl_5_quoi", "tableau_lire", 1, "Une ligne se lit de gauche à droite ; une colonne de haut en bas.", ["lire", "ligne", "colonne"], genLireQuoi),
  tpl("cm2_tableau_lire_tpl_6_ou", "tableau_lire", 3, "Parcours le tableau case par case.", ["lire", "inverse"], genLireOu),
  tpl("cm2_tableau_completer_tpl_5_placer", "tableau_completer", 1, "Le titre de la ligne et celui de la colonne te guident.", ["completer", "placer"], genCompleterPlacer),
  tpl("cm2_tableau_completer_tpl_6_sens", "tableau_completer", 1, "Regarde le titre de la ligne et celui de la colonne du « ? ».", ["completer", "sens"], genCompleterSens),
  tpl("cm2_tableau_completer_tpl_7_total_general", "tableau_completer", 3, "Le total général, c'est tout le tableau.", ["completer", "total"], genCompleterTotalGeneral),
  tpl("cm2_tableau_completer_tpl_8_deux_etapes", "tableau_completer", 4, "Trouve d'abord la case effacée grâce au total de sa colonne.", ["completer", "deux_etapes"], genCompleterDeuxEtapes),
  tpl("cm2_tableau_interpreter_tpl_5_max_ligne", "tableau_interpreter", 1, "Lis toute la ligne, puis compare les nombres.", ["interpreter", "maximum", "minimum"], genInterpMaxLigne),
  tpl("cm2_tableau_interpreter_tpl_6_comparer", "tableau_interpreter", 1, "Lis les deux cases de la colonne, puis compare.", ["interpreter", "comparer"], genInterpComparer),
  tpl("cm2_tableau_interpreter_tpl_7_ecart", "tableau_interpreter", 2, "« Combien de plus » : on soustrait.", ["interpreter", "difference"], genInterpEcart),
  tpl("cm2_tableau_interpreter_tpl_8_meilleur_total", "tableau_interpreter", 4, "Calcule le total de chaque ligne avant de comparer.", ["interpreter", "total", "maximum"], genInterpMeilleurTotal),
  tpl("cm2_tableau_defi_tpl_5_objectif", "tableau_defi", 4, "Calcule le total, puis ce qui manque pour l'objectif.", ["defi", "deux_etapes"], genDefiObjectif),
  tpl("cm2_tableau_defi_tpl_6_regrouper", "tableau_defi", 5, "Repère les quatre cases, puis additionne-les.", ["defi", "regrouper"], genDefiRegrouper),
];
