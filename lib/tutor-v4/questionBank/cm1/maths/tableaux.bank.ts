// lib/tutor-v4/question-banks/maths/cm1/tableaux.bank.ts

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  DifficultyLevel,
} from "@/lib/tutor-v4/types";

type CellValue = string | number;

type TableauDonneesCanvasData = {
  kind: "tableau_donnees";
  title?: string;
  caption?: string;
  headers: string[];
  rows: {
    label?: string;
    values: CellValue[];
  }[];
  highlight?: {
    row?: number;
    col?: number;
    cell?: {
      row: number;
      col: number;
    };
  };
  display?: {
    compact?: boolean;
    striped?: boolean;
  };
  questionLabel?: string;
};

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  // La bonne réponse ne doit JAMAIS sauter au découpage : on la met de côté,
  // on tire trois distracteurs distincts, puis on mélange l'ensemble.
  // ⚠️ 05/08/2026 — les versions précédentes jetaient la bonne réponse dans le
  // même chapeau que les pièges avant de couper à quatre. Avec quatre pièges
  // écrits, elle pouvait rester au fond : l'élève voyait alors quatre
  // propositions dont aucune n'était bonne, sans que rien ne le signale.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function tableauCanvas(
  data: Omit<TableauDonneesCanvasData, "kind">
): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    ...data,
  };
}

const CONTEXTES_FRUITS = [
  ["Mangues", "Ananas", "Bananes"],
  ["Letchis", "Papayes", "Goyaviers"],
  ["Citrons", "Avocats", "Cocos"],
];

const CONTEXTES_SPORTS = [
  ["Football", "Danse", "Natation"],
  ["Basket", "Course", "Tennis"],
  ["Surf", "Volley", "Randonnée"],
];

const CONTEXTES_ECOLE = [
  ["CM1 A", "CM1 B", "CM1 C"],
  ["Groupe 1", "Groupe 2", "Groupe 3"],
  ["Lundi", "Mardi", "Mercredi"],
];

/* ═══════════════════════════════════════════════════════════════════════════
   ⭐ 20/10/2026 — DES SITUATIONS, PAS UNE PHRASE (robustesse des statistiques).
   Mesuré avant : lire 53 squelettes (★2 7,0 répétitions sur 20), compléter 11
   (★2 13,1 · ★3 16,0), interpréter 34 (★3 10,5), défi 13 (★3 15,0 · ★4 12,5).
   Chaque gabarit ci-dessous croise une SITUATION (un relevé tiré d'un domaine :
   biologie, météo, écologie, musique, cinéma, sport, cantine, jeux…) × une
   TOURNURE × des nombres tirés, et dessine le tableau avec les MÊMES nombres.
   Les maths sont transversales : on lit des tableaux partout.
   ═══════════════════════════════════════════════════════════════════════════ */

type Q = TutorGeneratedQuestionV4;

type Situation = {
  titre: string;
  /** Phrase courte qui pose le décor (sans point final). */
  intro: string;
  /** Ce qu'on compte, au pluriel : « nids », « élèves ». */
  unite: string;
  /** Étiquette de la ligne unique. */
  ligne: string;
  /** Étiquettes des deux lignes d'un tableau à double entrée. */
  lignes: [string, string];
  /** Au moins 5 colonnes possibles ; on en tire 3 ou 4. */
  cats: string[];
  min: number;
  max: number;
  /** Pas des nombres (1, 5 ou 10) : nombres ronds pour les grands relevés. */
  pas: number;
};

const SITUATIONS: Situation[] = [
  { titre: "Nids de tortues", intro: "Une biologiste compte les nids de tortues sur les plages", unite: "nids", ligne: "Nids", lignes: ["Janvier", "Février"], cats: ["Saint-Leu", "L'Hermitage", "Étang-Salé", "Boucan Canot", "Grande Anse"], min: 3, max: 25, pas: 1 },
  { titre: "Jours de pluie", intro: "Une météorologue note les jours de pluie du mois", unite: "jours de pluie", ligne: "Jours", lignes: ["Janvier", "Juillet"], cats: ["Saint-Denis", "Saint-Pierre", "Cilaos", "Le Port", "Salazie"], min: 2, max: 25, pas: 1 },
  { titre: "Déchets de la plage", intro: "Des enfants ramassent les déchets d'une plage", unite: "déchets", ligne: "Déchets", lignes: ["Samedi", "Dimanche"], cats: ["Bouteilles", "Bouchons", "Canettes", "Sacs", "Filets"], min: 5, max: 40, pas: 1 },
  { titre: "Oiseaux observés", intro: "Un ornithologue compte les oiseaux d'une forêt", unite: "oiseaux", ligne: "Oiseaux", lignes: ["Matin", "Soir"], cats: ["Tec-tec", "Paille-en-queue", "Martin", "Bulbul", "Oiseau-lunettes"], min: 4, max: 30, pas: 1 },
  { titre: "Livres empruntés", intro: "La bibliothécaire compte les livres empruntés", unite: "livres", ligne: "Livres", lignes: ["Lundi", "Jeudi"], cats: ["BD", "Contes", "Romans", "Mangas", "Documentaires"], min: 5, max: 35, pas: 1 },
  { titre: "Plats de la cantine", intro: "Le cuisinier de la cantine compte les assiettes servies", unite: "assiettes", ligne: "Assiettes", lignes: ["Mardi", "Vendredi"], cats: ["Carry", "Rougail", "Pâtes", "Poisson", "Lentilles"], min: 10, max: 60, pas: 1 },
  { titre: "Passagers du car jaune", intro: "Le chauffeur du car jaune compte les passagers à chaque arrêt", unite: "passagers", ligne: "Passagers", lignes: ["Aller", "Retour"], cats: ["Gare", "Mairie", "École", "Plage", "Marché"], min: 3, max: 30, pas: 1 },
  { titre: "Instruments choisis", intro: "Le professeur de musique note les instruments choisis", unite: "élèves", ligne: "Élèves", lignes: ["Filles", "Garçons"], cats: ["Guitare", "Piano", "Kayamb", "Flûte", "Batterie"], min: 2, max: 15, pas: 1 },
  { titre: "Entrées au cinéma", intro: "La caissière du cinéma compte les entrées par film", unite: "entrées", ligne: "Entrées", lignes: ["Samedi", "Dimanche"], cats: ["Dessin animé", "Aventure", "Comédie", "Documentaire", "Policier"], min: 20, max: 90, pas: 1 },
  { titre: "Buts du tournoi", intro: "L'arbitre note les buts marqués par chaque équipe", unite: "buts", ligne: "Buts", lignes: ["Match aller", "Match retour"], cats: ["Les Requins", "Les Tigres", "Les Margouillats", "Les Dauphins", "Les Cardinaux"], min: 1, max: 12, pas: 1 },
  { titre: "Tickets de la kermesse", intro: "À la kermesse, on compte les tickets de chaque stand", unite: "tickets", ligne: "Tickets", lignes: ["Matin", "Après-midi"], cats: ["Pêche à la ligne", "Chamboule-tout", "Tombola", "Maquillage", "Crêpes"], min: 10, max: 50, pas: 1 },
  { titre: "Billes par couleur", intro: "Deux amis comptent leurs billes par couleur", unite: "billes", ligne: "Billes", lignes: ["Sac de Léa", "Sac de Tom"], cats: ["Rouges", "Bleues", "Vertes", "Jaunes", "Noires"], min: 3, max: 25, pas: 1 },
  { titre: "Bonbons du paquet", intro: "Un confiseur trie les bonbons par parfum", unite: "bonbons", ligne: "Bonbons", lignes: ["Paquet 1", "Paquet 2"], cats: ["Fraise", "Citron", "Menthe", "Cola", "Orange"], min: 4, max: 30, pas: 1 },
  { titre: "Visiteurs du volcan", intro: "Un guide compte les visiteurs du Piton de la Fournaise", unite: "visiteurs", ligne: "Visiteurs", lignes: ["Samedi", "Dimanche"], cats: ["Pas de Bellecombe", "Formica Léo", "Cratère Dolomieu", "Plaine des Sables", "Piton Partage"], min: 100, max: 600, pas: 10 },
  { titre: "Potager de l'école", intro: "Le jardinier de l'école compte les plants du potager", unite: "plants", ligne: "Plants", lignes: ["Carré A", "Carré B"], cats: ["Tomates", "Salades", "Carottes", "Piments", "Brèdes"], min: 5, max: 30, pas: 1 },
  { titre: "Œufs ramassés", intro: "Une fermière ramasse les œufs chaque jour", unite: "œufs", ligne: "Œufs", lignes: ["Poulailler A", "Poulailler B"], cats: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"], min: 6, max: 30, pas: 1 },
  { titre: "Poissons pêchés", intro: "Un pêcheur de Saint-Gilles note ses poissons", unite: "poissons", ligne: "Poissons", lignes: ["Semaine 1", "Semaine 2"], cats: ["Thons", "Dorades", "Capitaines", "Vivaneaux", "Espadons"], min: 2, max: 20, pas: 1 },
  { titre: "Visiteurs du musée", intro: "Une guide de musée compte les visiteurs de chaque salle", unite: "visiteurs", ligne: "Visiteurs", lignes: ["Matin", "Après-midi"], cats: ["Préhistoire", "Égypte", "Moyen Âge", "Volcans", "Océans"], min: 20, max: 80, pas: 1 },
  { titre: "Bouteilles recyclées", intro: "L'école compte les bouteilles recyclées par classe", unite: "bouteilles", ligne: "Bouteilles", lignes: ["Septembre", "Octobre"], cats: ["CP", "CE1", "CE2", "CM1", "CM2"], min: 10, max: 60, pas: 1 },
  { titre: "Tours de piste", intro: "La coach d'athlétisme note les tours de piste", unite: "tours", ligne: "Tours", lignes: ["Lundi", "Jeudi"], cats: ["Léa", "Noah", "Inès", "Hugo", "Maya"], min: 3, max: 15, pas: 1 },
  { titre: "Pages lues", intro: "Des enfants notent les pages lues dans la semaine", unite: "pages", ligne: "Pages", lignes: ["Semaine 1", "Semaine 2"], cats: ["Jade", "Enzo", "Lina", "Sacha", "Nour"], min: 10, max: 60, pas: 1 },
  { titre: "Bouquets vendus", intro: "Une fleuriste compte ses bouquets vendus", unite: "bouquets", ligne: "Bouquets", lignes: ["Vendredi", "Samedi"], cats: ["Roses", "Anthuriums", "Orchidées", "Tulipes", "Lys"], min: 4, max: 25, pas: 1 },
  { titre: "Animaux de la ferme", intro: "Un vétérinaire compte les animaux de deux fermes", unite: "animaux", ligne: "Animaux", lignes: ["Ferme du haut", "Ferme du bas"], cats: ["Vaches", "Cabris", "Moutons", "Cochons", "Lapins"], min: 3, max: 30, pas: 1 },
  { titre: "Longueurs nagées", intro: "Le maître-nageur note les longueurs de chaque nageur", unite: "longueurs", ligne: "Longueurs", lignes: ["Mardi", "Vendredi"], cats: ["Zoé", "Rayan", "Emma", "Adam", "Chloé"], min: 4, max: 20, pas: 1 },
  { titre: "Billets de tombola", intro: "Chaque classe vend des billets de tombola", unite: "billets", ligne: "Billets", lignes: ["Semaine 1", "Semaine 2"], cats: ["CM1 A", "CM1 B", "CM2 A", "CM2 B", "CE2"], min: 10, max: 50, pas: 1 },
  { titre: "Lettres distribuées", intro: "La factrice compte les lettres de chaque rue", unite: "lettres", ligne: "Lettres", lignes: ["Lundi", "Mardi"], cats: ["Rue des Letchis", "Rue du Port", "Rue de l'École", "Rue des Fleurs", "Rue du Marché"], min: 5, max: 40, pas: 1 },
  { titre: "Ventes de la boulangerie", intro: "Le boulanger compte ce qu'il a vendu", unite: "produits", ligne: "Produits", lignes: ["Matin", "Soir"], cats: ["Baguettes", "Croissants", "Pains au chocolat", "Samoussas", "Bouchons"], min: 10, max: 70, pas: 1 },
  { titre: "Insectes du jardin", intro: "Une entomologiste compte les insectes du jardin", unite: "insectes", ligne: "Insectes", lignes: ["Matin", "Après-midi"], cats: ["Papillons", "Coccinelles", "Abeilles", "Fourmis", "Libellules"], min: 3, max: 30, pas: 1 },
  { titre: "Élection des délégués", intro: "On compte les voix pour chaque candidat", unite: "voix", ligne: "Voix", lignes: ["CM1", "CM2"], cats: ["Lou", "Ilyes", "Manon", "Timéo", "Sarah"], min: 1, max: 15, pas: 1 },
  { titre: "Jeux de société", intro: "La ludothécaire note les jeux préférés des enfants", unite: "enfants", ligne: "Enfants", lignes: ["Filles", "Garçons"], cats: ["Petits chevaux", "Jeu de l'oie", "Dominos", "Cartes", "Dames"], min: 2, max: 15, pas: 1 },
  { titre: "Fruits du marché", intro: "Une marchande du marché de Saint-Paul compte ses fruits", unite: "fruits", ligne: "Fruits", lignes: ["Matin", "Après-midi"], cats: ["Mangues", "Letchis", "Ananas", "Papayes", "Bananes"], min: 10, max: 50, pas: 1 },
  { titre: "Randonneurs des cirques", intro: "Un garde du parc compte les randonneurs", unite: "randonneurs", ligne: "Randonneurs", lignes: ["Samedi", "Dimanche"], cats: ["Cilaos", "Mafate", "Salazie", "Maïdo", "Bélouve"], min: 20, max: 90, pas: 1 },
  { titre: "Arbres plantés", intro: "Un forestier compte les arbres plantés", unite: "arbres", ligne: "Arbres", lignes: ["Année 1", "Année 2"], cats: ["Tamarins", "Bois de couleur", "Manguiers", "Filaos", "Benjoins"], min: 10, max: 60, pas: 1 },
  { titre: "Glaces vendues", intro: "Un glacier de la plage compte ses glaces", unite: "glaces", ligne: "Glaces", lignes: ["Samedi", "Dimanche"], cats: ["Vanille", "Chocolat", "Coco", "Fraise", "Mangue"], min: 10, max: 60, pas: 1 },
  { titre: "Vélos du garage", intro: "Le gardien compte les vélos du garage par couleur", unite: "vélos", ligne: "Vélos", lignes: ["Garage A", "Garage B"], cats: ["Rouges", "Bleus", "Noirs", "Verts", "Blancs"], min: 2, max: 20, pas: 1 },
  { titre: "Spectateurs du concert", intro: "L'organisatrice compte les spectateurs de chaque concert", unite: "spectateurs", ligne: "Spectateurs", lignes: ["Vendredi", "Samedi"], cats: ["Maloya", "Séga", "Rock", "Jazz", "Reggae"], min: 50, max: 300, pas: 10 },
  { titre: "Médailles des jeux", intro: "Un journaliste sportif compte les médailles des écoles", unite: "médailles", ligne: "Médailles", lignes: ["Course", "Natation"], cats: ["École du Tampon", "École de Saint-Leu", "École du Port", "École de Sainte-Rose", "École de Bras-Panon"], min: 1, max: 12, pas: 1 },
  { titre: "Dauphins observés", intro: "Une guide en mer compte les dauphins observés", unite: "dauphins", ligne: "Dauphins", lignes: ["Matin", "Après-midi"], cats: ["Saint-Gilles", "Saint-Leu", "Le Port", "Saint-Paul", "Étang-Salé"], min: 2, max: 25, pas: 1 },
];

/** « d'élèves », « de livres », « d'œufs ». */
const deMot = (mot: string) => (/^[aeiouéèêhœ]/i.test(mot) ? `d'${mot}` : `de ${mot}`);

/** Un nombre de la situation (dans [min, max], multiple du pas). */
function tirerNombre(s: Situation): number {
  const k0 = Math.ceil(s.min / s.pas);
  const k1 = Math.floor(s.max / s.pas);
  return randomInt(k0, k1) * s.pas;
}

/** `n` nombres DISTINCTS de la situation. */
function nombresDistincts(s: Situation, n: number): number[] {
  const set = new Set<number>();
  while (set.size < n) set.add(tirerNombre(s));
  return shuffle([...set]);
}

/** `n` colonnes de la situation, dans l'ordre d'origine. */
function colonnes(s: Situation, n: number): string[] {
  return shuffle(s.cats.map((_, i) => i))
    .slice(0, n)
    .sort((a, b) => a - b)
    .map((i) => s.cats[i]);
}

const somme = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

function gab(
  id: string,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "tableau", microId, "template", "canvas", ...tags],
    generate,
  };
}

// ─── TABLEAU_LIRE ───────────────────────────────────────────────────────────

const GEN_LIRE: TutorBankItemV4[] = [
  // ★1 — une ligne, lire la case d'une colonne (QCM : leurres = cases voisines, total).
  gab("cm1_tableau_lire_gen_1_une_ligne", "tableau_lire", 1, "Trouve la bonne colonne, puis lis le nombre dessous.", ["qcm", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 3);
    const vals = nombresDistincts(s, 3);
    const c = randomInt(0, 2);
    const cat = cols[c];
    const correct = String(vals[c]);
    const text = randomChoice([
      `${s.intro}. Combien ${deMot(s.unite)} pour « ${cat} » ?`,
      `Lis le tableau « ${s.titre} ». Quel nombre est écrit sous « ${cat} » ?`,
      `${s.intro}. Que vaut la case « ${cat} » ?`,
      `Tableau « ${s.titre} » : combien ${deMot(s.unite)} pour « ${cat} » ?`,
      `${s.intro}. Regarde la colonne « ${cat} ». Quel nombre lis-tu ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: makeChoices(correct, [
        String(vals[(c + 1) % 3]),
        String(vals[(c + 2) % 3]),
        String(somme(vals)),
      ]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp(
        "Un tableau range les nombres en colonnes.",
        `On cherche la colonne « ${cat} », puis on lit le nombre dessous.`,
        `Sous « ${cat} », on lit ${correct}.`,
        `Il y a ${correct} ${s.unite} pour « ${cat} ».`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [{ label: s.ligne, values: vals }],
        highlight: { cell: { row: 0, col: c } },
        questionLabel: `« ${cat} » ?`,
      }),
    };
  }),

  // ★2 — deux lignes : croiser une ligne et une colonne (réponse libre).
  gab("cm1_tableau_lire_gen_2_croiser", "tableau_lire", 2, "Trouve d'abord la ligne, puis la colonne : le nombre est à leur croisement.", ["short", "deux_lignes", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 3);
    const vals = [nombresDistincts(s, 3), nombresDistincts(s, 3)];
    const r = randomInt(0, 1);
    const c = randomInt(0, 2);
    const ligne = s.lignes[r];
    const cat = cols[c];
    const correct = String(vals[r][c]);
    const text = randomChoice([
      `${s.intro}. Combien ${deMot(s.unite)} pour « ${cat} », ligne « ${ligne} » ?`,
      `Tableau « ${s.titre} » : lis la case de la ligne « ${ligne} » et de la colonne « ${cat} ».`,
      `${s.intro}. Ligne « ${ligne} », colonne « ${cat} » : quel nombre lis-tu ?`,
      `Dans le tableau « ${s.titre} », quel nombre est au croisement de « ${ligne} » et de « ${cat} » ?`,
      `${s.intro}. Pour « ${ligne} », combien ${deMot(s.unite)} dans la colonne « ${cat} » ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [correct],
      comparator: "number_equal",
      explanation: exp(
        "Dans un tableau à double entrée, une case est le croisement d'une ligne et d'une colonne.",
        `On suit la ligne « ${ligne} » jusqu'à la colonne « ${cat} ».`,
        `Au croisement, on lit ${correct}. (Attention : l'autre ligne donne ${vals[1 - r][c]}.)`,
        `La réponse est ${correct} ${s.unite}.`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [
          { label: s.lignes[0], values: vals[0] },
          { label: s.lignes[1], values: vals[1] },
        ],
        questionLabel: `${ligne} — ${cat} ?`,
      }),
    };
  }),

  // ★2 — lecture à l'envers : dans quelle colonne est ce nombre ? (QCM de colonnes)
  gab("cm1_tableau_lire_gen_3_quelle_colonne", "tableau_lire", 2, "Suis la bonne ligne et cherche le nombre : regarde ensuite le haut de sa colonne.", ["qcm", "deux_lignes", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 4);
    // Les 8 cases toutes différentes : une seule colonne peut contenir le nombre.
    const tout = nombresDistincts(s, 8);
    const vals = [tout.slice(0, 4), tout.slice(4, 8)];
    const r = randomInt(0, 1);
    const c = randomInt(0, 3);
    const ligne = s.lignes[r];
    const n = vals[r][c];
    const correct = cols[c];
    const text = randomChoice([
      `${s.intro}. Sur la ligne « ${ligne} », quelle colonne contient ${n} ?`,
      `Tableau « ${s.titre} » : ligne « ${ligne} », où lis-tu le nombre ${n} ?`,
      `${s.intro}. On a compté ${n} ${s.unite} pour « ${ligne} ». Dans quelle colonne ?`,
      `Dans le tableau « ${s.titre} », le nombre ${n} est sur la ligne « ${ligne} ». Sous quel titre ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: makeChoices(correct, cols.filter((x) => x !== correct)),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp(
        "Chaque nombre d'un tableau a une ligne et une colonne.",
        `On suit la ligne « ${ligne} » jusqu'à trouver ${n}, puis on remonte en haut de la colonne.`,
        `Ligne « ${ligne} » : ${cols.map((x, i) => `${x} → ${vals[r][i]}`).join(", ")}.`,
        `${n} est dans la colonne « ${correct} ».`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [
          { label: s.lignes[0], values: vals[0] },
          { label: s.lignes[1], values: vals[1] },
        ],
        highlight: { row: r },
        questionLabel: `Où est ${n} ?`,
      }),
    };
  }),
];

// ─── TABLEAU_COMPLETER ──────────────────────────────────────────────────────

const GEN_COMPLETER: TutorBankItemV4[] = [
  // ★2 — la case « Total » d'une ligne de 3 ou 4 colonnes.
  gab("cm1_tableau_completer_gen_1_case_total", "tableau_completer", 2, "Le total, c'est la somme de toutes les cases de la ligne.", ["short", "total", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const k = randomChoice([3, 3, 4]);
    const cols = colonnes(s, k);
    const vals = nombresDistincts(s, k);
    const total = somme(vals);
    const text = randomChoice([
      `${s.intro}. Quel nombre faut-il écrire dans la case « Total » ?`,
      `Tableau « ${s.titre} » : complète la case « Total ».`,
      `${s.intro}. Combien ${deMot(s.unite)} en tout ? Écris le total.`,
      `Complète le tableau « ${s.titre} » : que vaut la case « Total » ?`,
      `${s.intro}. Le tableau a ${k} colonnes et une case « Total » vide. Que faut-il y écrire ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(total)],
      comparator: "number_equal",
      explanation: exp(
        "La case « Total » regroupe toutes les cases de la ligne.",
        "On additionne tous les nombres de la ligne.",
        `${vals.join(" + ")} = ${total}.`,
        `On écrit ${total} dans la case « Total ».`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: [...cols, "Total"],
        rows: [{ label: s.ligne, values: [...vals, "?"] }],
        highlight: { cell: { row: 0, col: k } },
        questionLabel: "Total ?",
      }),
    };
  }),

  // ★2 — deux colonnes et le total : retrouver la case vide.
  gab("cm1_tableau_completer_gen_2_deux_cases", "tableau_completer", 2, "Le total moins la case connue donne la case vide.", ["short", "valeur_manquante", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 2);
    const vals = nombresDistincts(s, 2);
    const total = somme(vals);
    const m = randomInt(0, 1);
    const cat = cols[m];
    const connu = vals[1 - m];
    const text = randomChoice([
      `${s.intro}. Le total est ${total}. Combien ${deMot(s.unite)} pour « ${cat} » ?`,
      `Tableau « ${s.titre} » : il y a ${total} ${s.unite} en tout. Quel nombre manque sous « ${cat} » ?`,
      `${s.intro}. La case « ${cat} » est vide. Le total vaut ${total}. Complète-la.`,
      `Complète la case « ${cat} » du tableau « ${s.titre} ». Le total est ${total}.`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(vals[m])],
      comparator: "number_equal",
      explanation: exp(
        "Le total est la somme des cases de la ligne.",
        "Pour trouver la case vide, on enlève la case connue au total.",
        `${total} − ${connu} = ${vals[m]}. Vérification : ${vals[0]} + ${vals[1]} = ${total}.`,
        `Il y a ${vals[m]} ${s.unite} pour « ${cat} ».`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: [...cols, "Total"],
        rows: [{ label: s.ligne, values: m === 0 ? ["?", connu, total] : [connu, "?", total] }],
        highlight: { cell: { row: 0, col: m } },
        questionLabel: `« ${cat} » ?`,
      }),
    };
  }),

  // ★3 — trois ou quatre colonnes, une case vide, le total connu.
  gab("cm1_tableau_completer_gen_3_case_vide", "tableau_completer", 3, "Additionne les cases connues, puis enlève ce résultat au total.", ["short", "valeur_manquante", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const k = randomChoice([3, 4]);
    const cols = colonnes(s, k);
    const vals = nombresDistincts(s, k);
    const total = somme(vals);
    const m = randomInt(0, k - 1);
    const cat = cols[m];
    const connus = vals.filter((_, i) => i !== m);
    const sc = somme(connus);
    const text = randomChoice([
      `${s.intro}. Le total est ${total}. Combien ${deMot(s.unite)} pour « ${cat} » ?`,
      `Tableau « ${s.titre} » : la case « ${cat} » s'est effacée. Le total vaut ${total}. Retrouve-la.`,
      `${s.intro}. Il y a ${total} ${s.unite} en tout. Quel nombre manque dans la colonne « ${cat} » ?`,
      `Complète le tableau « ${s.titre} » : que vaut la case « ${cat} » ?`,
      `${s.intro}. Une case est vide : « ${cat} ». Quel nombre faut-il écrire ?`,
    ]);
    const values: CellValue[] = vals.map((v, i) => (i === m ? "?" : v));
    return {
      text,
      format: "short",
      expected: [String(vals[m])],
      comparator: "number_equal",
      explanation: exp(
        "Le total est la somme de toutes les cases de la ligne.",
        "On additionne les cases connues, puis on enlève ce résultat au total.",
        `${connus.join(" + ")} = ${sc}, puis ${total} − ${sc} = ${vals[m]}.`,
        `La case « ${cat} » vaut ${vals[m]}.`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: [...cols, "Total"],
        rows: [{ label: s.ligne, values: [...values, total] }],
        highlight: { cell: { row: 0, col: m } },
        questionLabel: `« ${cat} » ?`,
      }),
    };
  }),

  // ★3 — tableau à deux lignes + ligne « Total » : retrouver une case d'une colonne.
  gab("cm1_tableau_completer_gen_4_ligne_total", "tableau_completer", 3, "Dans une colonne, le total moins l'autre ligne donne la case vide.", ["short", "valeur_manquante", "deux_lignes", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 3);
    const vals = [nombresDistincts(s, 3), nombresDistincts(s, 3)];
    const tot = [0, 1, 2].map((j) => vals[0][j] + vals[1][j]);
    const r = randomInt(0, 1);
    const c = randomInt(0, 2);
    const ligne = s.lignes[r];
    const cat = cols[c];
    const autre = vals[1 - r][c];
    const text = randomChoice([
      `${s.intro}. Colonne « ${cat} », le total est ${tot[c]}. Combien pour « ${ligne} » ?`,
      `Tableau « ${s.titre} » : la case « ${ligne} » / « ${cat} » est vide. Complète-la avec la ligne « Total ».`,
      `${s.intro}. Il y a ${tot[c]} ${s.unite} en tout pour « ${cat} ». Combien pour « ${ligne} » ?`,
      `Dans le tableau « ${s.titre} », retrouve la case vide de la colonne « ${cat} ».`,
    ]);
    const lignesVal: CellValue[][] = vals.map((row, i) => row.map((v, j) => (i === r && j === c ? "?" : v)));
    return {
      text,
      format: "short",
      expected: [String(vals[r][c])],
      comparator: "number_equal",
      explanation: exp(
        "La ligne « Total » additionne les deux lignes de chaque colonne.",
        `Dans la colonne « ${cat} », on enlève l'autre ligne au total.`,
        `${tot[c]} − ${autre} = ${vals[r][c]}. Vérification : ${vals[0][c]} + ${vals[1][c]} = ${tot[c]}.`,
        `La case vide vaut ${vals[r][c]}.`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [
          { label: s.lignes[0], values: lignesVal[0] },
          { label: s.lignes[1], values: lignesVal[1] },
          { label: "Total", values: tot },
        ],
        highlight: { cell: { row: r, col: c } },
        questionLabel: `${ligne} — ${cat} ?`,
      }),
    };
  }),
];

// ─── TABLEAU_INTERPRETER ────────────────────────────────────────────────────

const GEN_INTERPRETER: TutorBankItemV4[] = [
  // ★2 — le plus / le moins dans une ligne (QCM de colonnes).
  gab("cm1_tableau_interpreter_gen_1_plus_moins", "tableau_interpreter", 2, "Compare les nombres de la ligne : cherche le plus grand ou le plus petit.", ["qcm", "comparer", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const k = randomChoice([3, 4]);
    const cols = colonnes(s, k);
    const vals = nombresDistincts(s, k);
    const plus = Math.random() < 0.5;
    const cible = plus ? Math.max(...vals) : Math.min(...vals);
    const c = vals.indexOf(cible);
    const correct = cols[c];
    const mot = plus ? "le plus" : "le moins";
    const text = randomChoice([
      `${s.intro}. Quelle colonne a ${mot} ${deMot(s.unite)} ?`,
      `Tableau « ${s.titre} » : où y a-t-il ${mot} ${deMot(s.unite)} ?`,
      `${s.intro}. Parmi ${cols.map((x) => `« ${x} »`).join(", ")}, quelle colonne a ${mot} ${deMot(s.unite)} ?`,
      `Lis le tableau « ${s.titre} ». Quelle case a ${plus ? "le plus grand" : "le plus petit"} nombre ?`,
      `${s.intro}. ${plus ? "Le record" : "Le plus faible"} : quelle colonne ?`,
    ]);
    const autres = cols.filter((x) => x !== correct);
    return {
      text,
      format: "qcm",
      choices: makeChoices(correct, autres),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp(
        "Interpréter un tableau, c'est comparer ses nombres.",
        `On cherche ${plus ? "le plus grand" : "le plus petit"} nombre de la ligne.`,
        `${cols.map((x, i) => `${x} : ${vals[i]}`).join(" ; ")}. ${plus ? "Le plus grand" : "Le plus petit"} est ${cible}.`,
        `C'est « ${correct} » qui a ${mot} ${deMot(s.unite)}.`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [{ label: s.ligne, values: vals }],
        questionLabel: plus ? "Le plus ?" : "Le moins ?",
      }),
    };
  }),

  // ★2 — dans une colonne, quelle ligne l'emporte ? (QCM de lignes)
  gab("cm1_tableau_interpreter_gen_2_quelle_ligne", "tableau_interpreter", 2, "Regarde seulement la colonne demandée et compare ses deux nombres.", ["qcm", "comparer", "deux_lignes", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 3);
    const c = randomInt(0, 2);
    const paire = nombresDistincts(s, 2);
    const vals = [nombresDistincts(s, 3), nombresDistincts(s, 3)];
    vals[0][c] = paire[0];
    vals[1][c] = paire[1];
    const cat = cols[c];
    const plus = Math.random() < 0.6;
    const r = plus ? (paire[0] > paire[1] ? 0 : 1) : (paire[0] < paire[1] ? 0 : 1);
    const correct = s.lignes[r];
    const mot = plus ? "le plus" : "le moins";
    const text = randomChoice([
      `${s.intro}. Pour « ${cat} », quelle ligne a ${mot} ${deMot(s.unite)} ?`,
      `Tableau « ${s.titre} » : colonne « ${cat} », où y a-t-il ${mot} ${deMot(s.unite)} ?`,
      `${s.intro}. Regarde « ${cat} ». Entre « ${s.lignes[0]} » et « ${s.lignes[1]} », quelle ligne a ${mot} ${deMot(s.unite)} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: makeChoices(correct, [s.lignes[1 - r], "Autant pour les deux", "On ne peut pas savoir"]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp(
        "On compare deux cases de la même colonne.",
        `On lit la colonne « ${cat} » sur les deux lignes.`,
        `${s.lignes[0]} : ${paire[0]} ; ${s.lignes[1]} : ${paire[1]}.`,
        `« ${correct} » a ${mot} ${deMot(s.unite)} pour « ${cat} ».`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [
          { label: s.lignes[0], values: vals[0] },
          { label: s.lignes[1], values: vals[1] },
        ],
        highlight: { col: c },
        questionLabel: `${cat} : quelle ligne ?`,
      }),
    };
  }),

  // ★3 — l'écart entre deux colonnes (soustraction).
  gab("cm1_tableau_interpreter_gen_3_ecart", "tableau_interpreter", 3, "Pour trouver « combien de plus », fais une soustraction : le grand moins le petit.", ["short", "difference", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 3);
    const vals = nombresDistincts(s, 3);
    const [i, j] = shuffle([0, 1, 2]).slice(0, 2);
    const g = vals[i] > vals[j] ? i : j;
    const p = g === i ? j : i;
    const diff = vals[g] - vals[p];
    const text = randomChoice([
      `${s.intro}. Combien ${deMot(s.unite)} de plus pour « ${cols[g]} » que pour « ${cols[p]} » ?`,
      `Tableau « ${s.titre} » : quel est l'écart entre « ${cols[g]} » et « ${cols[p]} » ?`,
      `${s.intro}. Combien ${deMot(s.unite)} de moins pour « ${cols[p]} » que pour « ${cols[g]} » ?`,
      `Lis le tableau « ${s.titre} ». De combien la case « ${cols[g]} » dépasse-t-elle la case « ${cols[p]} » ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(diff)],
      comparator: "number_equal",
      explanation: exp(
        "« Combien de plus » ou « combien de moins » : c'est un écart.",
        "On enlève le plus petit nombre au plus grand.",
        `« ${cols[g]} » : ${vals[g]}, « ${cols[p]} » : ${vals[p]}. ${vals[g]} − ${vals[p]} = ${diff}.`,
        `L'écart est de ${diff} ${s.unite}.`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [{ label: s.ligne, values: vals }],
        questionLabel: `${cols[g]} − ${cols[p]} ?`,
      }),
    };
  }),

  // ★3 — total d'une ligne ou d'une colonne d'un tableau à double entrée.
  gab("cm1_tableau_interpreter_gen_4_total_ligne_colonne", "tableau_interpreter", 3, "Additionne seulement les cases de la ligne (ou de la colonne) demandée.", ["short", "total_ligne", "deux_lignes", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 3);
    const vals = [nombresDistincts(s, 3), nombresDistincts(s, 3)];
    const parLigne = Math.random() < 0.5;
    let text: string, termes: number[], quoi: string;
    if (parLigne) {
      const r = randomInt(0, 1);
      quoi = `la ligne « ${s.lignes[r]} »`;
      termes = vals[r];
      text = randomChoice([
        `${s.intro}. Combien ${deMot(s.unite)} en tout pour « ${s.lignes[r]} » ?`,
        `Tableau « ${s.titre} » : quel est le total de la ligne « ${s.lignes[r]} » ?`,
        `${s.intro}. Additionne la ligne « ${s.lignes[r]} ». Combien trouves-tu ?`,
      ]);
    } else {
      const c = randomInt(0, 2);
      quoi = `la colonne « ${cols[c]} »`;
      termes = [vals[0][c], vals[1][c]];
      text = randomChoice([
        `${s.intro}. Combien ${deMot(s.unite)} en tout pour « ${cols[c]} », sur les deux lignes ?`,
        `Tableau « ${s.titre} » : quel est le total de la colonne « ${cols[c]} » ?`,
        `${s.intro}. « ${s.lignes[0]} » et « ${s.lignes[1]} » réunis : combien pour « ${cols[c]} » ?`,
      ]);
    }
    const total = somme(termes);
    return {
      text,
      format: "short",
      expected: [String(total)],
      comparator: "number_equal",
      explanation: exp(
        "Le total d'une ligne ou d'une colonne est la somme de ses cases.",
        `On additionne seulement les cases de ${quoi}.`,
        `${termes.join(" + ")} = ${total}.`,
        `Le total de ${quoi} est ${total} ${s.unite}.`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [
          { label: s.lignes[0], values: vals[0] },
          { label: s.lignes[1], values: vals[1] },
        ],
        questionLabel: `Total de ${quoi} ?`,
      }),
    };
  }),
];

// ─── TABLEAU_DEFI ───────────────────────────────────────────────────────────

const GEN_DEFI: TutorBankItemV4[] = [
  // ★3 — total général, ou total de deux colonnes sur les deux lignes.
  gab("cm1_tableau_defi_gen_1_total_general", "tableau_defi", 3, "Additionne toutes les cases demandées, ligne par ligne.", ["short", "total_general", "deux_lignes", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 3);
    const vals = [nombresDistincts(s, 3), nombresDistincts(s, 3)];
    const tout = Math.random() < 0.5;
    let text: string, termes: number[], quoi: string;
    if (tout) {
      termes = [...vals[0], ...vals[1]];
      quoi = "tout le tableau";
      text = randomChoice([
        `${s.intro}. Combien ${deMot(s.unite)} en tout dans le tableau ?`,
        `Tableau « ${s.titre} » : quel est le total de toutes les cases ?`,
        `${s.intro}. « ${s.lignes[0]} » et « ${s.lignes[1]} » réunis : combien ${deMot(s.unite)} au total ?`,
      ]);
    } else {
      const [a, b] = shuffle([0, 1, 2]).slice(0, 2).sort((x, y) => x - y);
      termes = [vals[0][a], vals[0][b], vals[1][a], vals[1][b]];
      quoi = `« ${cols[a]} » et « ${cols[b]} »`;
      text = randomChoice([
        `${s.intro}. Combien ${deMot(s.unite)} en tout pour « ${cols[a]} » et « ${cols[b]} », sur les deux lignes ?`,
        `Tableau « ${s.titre} » : additionne les colonnes « ${cols[a]} » et « ${cols[b]} ». Combien trouves-tu ?`,
        `${s.intro}. On réunit « ${cols[a]} » et « ${cols[b]} ». Combien ${deMot(s.unite)} cela fait-il ?`,
      ]);
    }
    const total = somme(termes);
    return {
      text,
      format: "short",
      expected: [String(total)],
      comparator: "number_equal",
      explanation: exp(
        "Un défi demande d'utiliser plusieurs cases du tableau.",
        `On additionne toutes les cases de ${quoi}.`,
        `${termes.join(" + ")} = ${total}.`,
        `Il y a ${total} ${s.unite} en tout.`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [
          { label: s.lignes[0], values: vals[0] },
          { label: s.lignes[1], values: vals[1] },
        ],
        questionLabel: "Total ?",
      }),
    };
  }),

  // ★3 — un objectif à atteindre : total, puis ce qui manque.
  gab("cm1_tableau_defi_gen_2_objectif", "tableau_defi", 3, "Calcule d'abord le total de la ligne, puis ce qu'il manque pour l'objectif.", ["short", "objectif", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 3);
    const vals = nombresDistincts(s, 3);
    const total = somme(vals);
    // Objectif rond, au-dessus du total.
    const rond = s.pas >= 10 ? 100 : 10;
    const objectif = (Math.floor(total / rond) + randomInt(1, 3)) * rond;
    const manque = objectif - total;
    const text = randomChoice([
      `${s.intro}. L'objectif était ${objectif} ${s.unite}. Combien en manque-t-il ?`,
      `Tableau « ${s.titre} » : on voulait atteindre ${objectif}. Combien ${deMot(s.unite)} manque-t-il ?`,
      `${s.intro}. Il en faudrait ${objectif} en tout. Combien ${deMot(s.unite)} faut-il encore ?`,
      `Avec le tableau « ${s.titre} », combien manque-t-il pour arriver à ${objectif} ${s.unite} ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(manque)],
      comparator: "number_equal",
      explanation: exp(
        "Ce défi se fait en deux étapes : le total, puis ce qui manque.",
        "On additionne la ligne, puis on enlève ce total à l'objectif.",
        `${vals.join(" + ")} = ${total}, puis ${objectif} − ${total} = ${manque}.`,
        `Il manque ${manque} ${s.unite}.`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [{ label: s.ligne, values: vals }],
        questionLabel: `Objectif : ${objectif}`,
      }),
    };
  }),

  // ★4 — comparer les totaux de deux lignes (QCM de lignes).
  gab("cm1_tableau_defi_gen_3_comparer_totaux", "tableau_defi", 4, "Calcule le total de chaque ligne, puis compare les deux totaux.", ["qcm", "comparer_totaux", "deux_lignes", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 3);
    let vals = [nombresDistincts(s, 3), nombresDistincts(s, 3)];
    // Le plus grand nombre ne doit pas suffire : les totaux diffèrent.
    while (somme(vals[0]) === somme(vals[1])) vals = [nombresDistincts(s, 3), nombresDistincts(s, 3)];
    const t = [somme(vals[0]), somme(vals[1])];
    const plus = Math.random() < 0.6;
    const r = plus ? (t[0] > t[1] ? 0 : 1) : (t[0] < t[1] ? 0 : 1);
    const correct = s.lignes[r];
    const mot = plus ? "le plus" : "le moins";
    const text = randomChoice([
      `${s.intro}. En tout, quelle ligne a ${mot} ${deMot(s.unite)} ?`,
      `Tableau « ${s.titre} » : « ${s.lignes[0]} » ou « ${s.lignes[1]} », laquelle a ${mot} ${deMot(s.unite)} au total ?`,
      `${s.intro}. Compare les totaux : quelle ligne a ${mot} ${deMot(s.unite)} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: makeChoices(correct, [s.lignes[1 - r], "Autant pour les deux", "On ne peut pas savoir"]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp(
        "Pour comparer deux lignes, on calcule d'abord le total de chacune.",
        "On additionne chaque ligne, puis on compare les deux totaux.",
        `${s.lignes[0]} : ${vals[0].join(" + ")} = ${t[0]}. ${s.lignes[1]} : ${vals[1].join(" + ")} = ${t[1]}.`,
        `« ${correct} » a ${mot} ${deMot(s.unite)} au total.`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [
          { label: s.lignes[0], values: vals[0] },
          { label: s.lignes[1], values: vals[1] },
        ],
        questionLabel: "Quelle ligne ?",
      }),
    };
  }),

  // ★4 — écart entre les totaux de deux lignes.
  gab("cm1_tableau_defi_gen_4_ecart_totaux", "tableau_defi", 4, "Deux étapes : le total de chaque ligne, puis la soustraction.", ["short", "difference_totaux", "deux_lignes", "situations"], () => {
    const s = randomChoice(SITUATIONS);
    const cols = colonnes(s, 3);
    let vals = [nombresDistincts(s, 3), nombresDistincts(s, 3)];
    while (somme(vals[0]) === somme(vals[1])) vals = [nombresDistincts(s, 3), nombresDistincts(s, 3)];
    const t = [somme(vals[0]), somme(vals[1])];
    const g = t[0] > t[1] ? 0 : 1;
    const p = 1 - g;
    const diff = t[g] - t[p];
    const text = randomChoice([
      `${s.intro}. Combien ${deMot(s.unite)} de plus pour « ${s.lignes[g]} » que pour « ${s.lignes[p]} », en tout ?`,
      `Tableau « ${s.titre} » : quel est l'écart entre le total de « ${s.lignes[g]} » et celui de « ${s.lignes[p]} » ?`,
      `${s.intro}. En tout, combien ${deMot(s.unite)} de moins pour « ${s.lignes[p]} » que pour « ${s.lignes[g]} » ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(diff)],
      comparator: "number_equal",
      explanation: exp(
        "Ce défi demande deux étapes : totaliser, puis comparer.",
        "On calcule le total de chaque ligne, puis on enlève le petit total au grand.",
        `${s.lignes[g]} : ${vals[g].join(" + ")} = ${t[g]}. ${s.lignes[p]} : ${vals[p].join(" + ")} = ${t[p]}. ${t[g]} − ${t[p]} = ${diff}.`,
        `L'écart est de ${diff} ${s.unite}.`,
      ),
      canvas: tableauCanvas({
        title: s.titre,
        headers: cols,
        rows: [
          { label: s.lignes[0], values: vals[0] },
          { label: s.lignes[1], values: vals[1] },
        ],
        questionLabel: "Écart des totaux ?",
      }),
    };
  }),
];

export const tableauxBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau, la ligne « Ananas » et la colonne « Mardi » se croisent sur la case 24. Combien d'ananas le mardi ?",
    format: "qcm",
    choices: ["24","2","42","4"],
    expected: ["24"],
    comparator: "mcq_exact",
    hint: "On croise la bonne ligne et la bonne colonne.",
    explanation: "La valeur est au croisement de la ligne « Ananas » et de la colonne « Mardi » : 24.",
    tags: ["cm1","tableau","tableau_lire","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_g2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau, pour trouver une valeur, on croise...",
    format: "qcm",
    choices: ["la bonne ligne et la bonne colonne","deux colonnes","deux lignes","le titre seulement"],
    expected: ["la bonne ligne et la bonne colonne"],
    comparator: "mcq_exact",
    hint: "La réponse est dans une case.",
    explanation: "On croise une ligne et une colonne : la valeur cherchée est dans la case au croisement.",
    tags: ["cm1","tableau","tableau_lire","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "neutral",
    text: "Un tableau indique 12 bananes lundi et 18 bananes mardi. La case « total » doit contenir...",
    format: "qcm",
    choices: ["30","6","24","1218"],
    expected: ["30"],
    comparator: "mcq_exact",
    hint: "Additionne les deux nombres.",
    explanation: "Total = 12 + 18 = 30.",
    tags: ["cm1","tableau","tableau_completer","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Un tableau montre : lundi 12, mardi 18, mercredi 9. Quel jour a-t-on vendu le plus ?",
    format: "qcm",
    choices: ["mardi","lundi","mercredi","tous pareil"],
    expected: ["mardi"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
    explanation: "Le plus grand nombre est 18 : c'est mardi.",
    tags: ["cm1","tableau","tableau_interpreter","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un tableau note 24 ananas et 30 bananes. Combien de bananes de plus que d'ananas ?",
    format: "qcm",
    choices: ["6","54","4","30"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Soustrais les deux nombres.",
    explanation: "30 − 24 = 6 bananes de plus.",
    tags: ["cm1","tableau","tableau_defi","guide","qcm"],
  },

  // ============================================================
  // TABLEAU_LIRE
  // Lire une information directe dans un tableau
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_1_activites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le tableau, combien d’élèves ont choisi la natation ?",
    format: "qcm",
    choices: ["10", "8", "12", "30"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne Natation.",
    explanation: exp(
      "Un tableau organise des informations en lignes et en colonnes.",
      "On repère la colonne demandée, puis on lit la valeur.",
      "Dans la colonne Natation, on lit 10.",
      "10 élèves ont choisi la natation."
    ),
    tags: ["cm1", "tableau", "lire", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Activités préférées",
      headers: ["Football", "Danse", "Natation"],
      rows: [
        {
          label: "Élèves",
          values: [12, 8, 10],
        },
      ],
      highlight: {
        cell: { row: 0, col: 2 },
      },
      questionLabel: "Combien d’élèves ont choisi la natation ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_2_fruits_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Au marché, combien de mangues ont été vendues le matin ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Regarde la ligne Matin et la colonne Mangues.",
    explanation: exp(
      "Pour lire un tableau, il faut croiser une ligne et une colonne.",
      "On cherche la ligne Matin et la colonne Mangues.",
      "À l’intersection, on lit 18.",
      "18 mangues ont été vendues le matin."
    ),
    tags: ["cm1", "tableau", "lire", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        {
          label: "Matin",
          values: [18, 12, 25],
        },
        {
          label: "Après-midi",
          values: [14, 10, 20],
        },
      ],
      highlight: {
        cell: { row: 0, col: 0 },
      },
      questionLabel: "Combien de mangues le matin ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_3_classes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves y a-t-il en CM1 B ?",
    format: "qcm",
    choices: ["24", "26", "22", "72"],
    expected: ["24"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne CM1 B.",
    explanation: exp(
      "Un tableau permet de retrouver rapidement une information.",
      "On repère la colonne CM1 B.",
      "Dans cette colonne, on lit 24.",
      "Il y a 24 élèves en CM1 B."
    ),
    tags: ["cm1", "tableau", "lire", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Effectifs des classes",
      headers: ["CM1 A", "CM1 B", "CM1 C"],
      rows: [
        {
          label: "Élèves",
          values: [22, 24, 26],
        },
      ],
      highlight: {
        cell: { row: 0, col: 1 },
      },
      questionLabel: "Combien d’élèves en CM1 B ?",
    }),
  },

  {
    kind: "template",
    id: "cm1_tableau_lire_tpl_1_ligne_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Repère la bonne colonne, puis lis la valeur.",
    tags: ["cm1", "tableau", "lire", "template", "qcm", "canvas"],
    generate: () => {
      const headers = randomChoice([
        ...CONTEXTES_SPORTS,
        ...CONTEXTES_FRUITS,
        ...CONTEXTES_ECOLE,
      ]);

      // ⚠️ Tirées séparément, les trois valeurs tombaient souvent égales : les
      // deux pièges « tu as lu la mauvaise colonne » devenaient alors la bonne
      // réponse et disparaissaient. Et un tableau dont les trois colonnes
      // portent le même nombre n'apprend rien à lire. On tire donc trois
      // valeurs DISTINCTES.
      const values = shuffle(
        Array.from({ length: 11 }, (_, i) => i + 8),
      ).slice(0, 3);

      const col = randomInt(0, 2);
      const correct = String(values[col]);

      return {
        text: `Dans le tableau, quelle est la valeur pour ${headers[col]} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(values[(col + 1) % 3]),
          String(values[(col + 2) % 3]),
          String(values.reduce((a, b) => a + b, 0)),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Lire un tableau, c’est retrouver une information rangée.",
          "On cherche la colonne demandée.",
          `Dans la colonne ${headers[col]}, on lit ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: tableauCanvas({
          title: "Lecture de tableau",
          headers,
          rows: [
            {
              label: "Valeur",
              values,
            },
          ],
          highlight: {
            cell: { row: 0, col },
          },
          questionLabel: `Valeur pour ${headers[col]} ?`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tableau_lire_tpl_2_deux_lignes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    hint: "Cherche d’abord la bonne ligne, puis la bonne colonne.",
    tags: ["cm1", "tableau", "lire", "deux_lignes", "template", "canvas"],
    generate: () => {
      const headers = randomChoice(CONTEXTES_FRUITS);
      const rows = ["Matin", "Après-midi"];
      const values = [
        [randomInt(10, 30), randomInt(10, 30), randomInt(10, 30)],
        [randomInt(10, 30), randomInt(10, 30), randomInt(10, 30)],
      ];

      const row = randomInt(0, 1);
      const col = randomInt(0, 2);
      const correct = String(values[row][col]);

      return {
        text: `Au marché, combien de ${headers[col].toLowerCase()} ont été vendus ${rows[row].toLowerCase()} ?`,
        format: "short",
        expected: [correct],
        comparator: "number_equal",
        explanation: exp(
          "Dans un tableau à plusieurs lignes, il faut croiser deux informations.",
          "On repère la bonne ligne et la bonne colonne.",
          `Ligne ${rows[row]}, colonne ${headers[col]} : on lit ${correct}.`,
          `La réponse est ${correct}.`
        ),
        canvas: tableauCanvas({
          title: "Ventes au marché",
          headers,
          rows: [
            {
              label: rows[0],
              values: values[0],
            },
            {
              label: rows[1],
              values: values[1],
            },
          ],
          highlight: {
            cell: { row, col },
          },
          questionLabel: `${headers[col]} — ${rows[row]}`,
        }),
      };
    },
  },

  // ============================================================
  // TABLEAU_COMPLETER
  // Compléter une case manquante ou retrouver une valeur
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_1_total_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Le total est 40 fruits. Il y a 15 mangues et 10 ananas. Combien y a-t-il de bananes ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Additionne les fruits connus, puis complète jusqu’à 40.",
    explanation: exp(
      "Compléter un tableau, c’est retrouver une information manquante.",
      "On additionne d’abord les valeurs connues.",
      "15 + 10 = 25, puis 40 - 25 = 15.",
      "Il manque 15 bananes."
    ),
    tags: ["cm1", "tableau", "completer", "total", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Fruits vendus",
      headers: ["Mangues", "Ananas", "Bananes", "Total"],
      rows: [
        {
          label: "Quantité",
          values: [15, 10, "?", 40],
        },
      ],
      highlight: {
        cell: { row: 0, col: 2 },
      },
      questionLabel: "Quelle valeur manque ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_2_sport_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "sport",
    text: "Dans une classe, 9 élèves choisissent le foot, 7 la danse et 8 la natation. Quel est le total ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Additionne les trois nombres.",
    explanation: exp(
      "Pour compléter un total, on additionne toutes les valeurs.",
      "On ajoute les élèves de chaque activité.",
      "9 + 7 + 8 = 24.",
      "Le total est 24 élèves."
    ),
    tags: ["cm1", "tableau", "completer", "total", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Activités choisies",
      headers: ["Football", "Danse", "Natation", "Total"],
      rows: [
        {
          label: "Élèves",
          values: [9, 7, 8, "?"],
        },
      ],
      highlight: {
        cell: { row: 0, col: 3 },
      },
      questionLabel: "Quel est le total ?",
    }),
  },

  {
    kind: "template",
    id: "cm1_tableau_completer_tpl_1_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour trouver un total, additionne toutes les valeurs.",
    tags: ["cm1", "tableau", "completer", "total", "template", "canvas"],
    generate: () => {
      // 20/10/2026 : décor tiré parmi les SITUATIONS (la phrase revenait à l'identique).
      const s = randomChoice(SITUATIONS);
      const headers = colonnes(s, 3);
      const [a, b, c] = [tirerNombre(s), tirerNombre(s), tirerNombre(s)];
      const total = a + b + c;

      return {
        text: randomChoice([
          `${s.intro}. Complète le total : ${a} + ${b} + ${c} = ?`,
          `Tableau « ${s.titre} » : ${a} + ${b} + ${c}. Quel total écris-tu ?`,
          `${s.intro}. Calcule la case « Total » : ${a} + ${b} + ${c}.`,
        ]),
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un total regroupe toutes les valeurs.",
          "On additionne les nombres du tableau.",
          `${a} + ${b} + ${c} = ${total}.`,
          `Le total est ${total}.`
        ),
        canvas: tableauCanvas({
          title: s.titre,
          headers: [...headers, "Total"],
          rows: [
            {
              label: s.ligne,
              values: [a, b, c, "?"],
            },
          ],
          highlight: {
            cell: { row: 0, col: 3 },
          },
          questionLabel: "Complète le total.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tableau_completer_tpl_2_valeur_manquante",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les valeurs connues, puis soustrais au total.",
    tags: ["cm1", "tableau", "completer", "valeur_manquante", "template", "canvas"],
    generate: () => {
      // 20/10/2026 : décor tiré parmi les SITUATIONS (la phrase revenait à l'identique).
      const s = randomChoice(SITUATIONS);
      const headers = colonnes(s, 3);
      const a = tirerNombre(s);
      const b = tirerNombre(s);
      const missing = tirerNombre(s);
      const total = a + b + missing;

      const missingCol = randomInt(0, 2);
      const values: CellValue[] =
        missingCol === 0
          ? ["?", a, b, total]
          : missingCol === 1
            ? [a, "?", b, total]
            : [a, b, "?", total];

      const knownSum = total - missing;

      return {
        text: randomChoice([`${s.intro}. Le total est ${total}. Quelle valeur manque dans le tableau ?`, `Tableau « ${s.titre} » : le total vaut ${total}. Retrouve la case effacée.`, `${s.intro}. Il y a ${total} ${s.unite} en tout. Quel nombre manque ?`]),
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Pour retrouver une valeur manquante, on utilise le total.",
          "On additionne les valeurs connues, puis on soustrait au total.",
          `${a} + ${b} = ${knownSum}, puis ${total} − ${knownSum} = ${missing}.`,
          `La valeur manquante est ${missing}.`
        ),
        canvas: tableauCanvas({
          title: s.titre,
          headers: [...headers, "Total"],
          rows: [
            {
              label: s.ligne,
              values,
            },
          ],
          highlight: {
            cell: { row: 0, col: missingCol },
          },
          questionLabel: "Quelle valeur manque ?",
        }),
      };
    },
  },

  // ============================================================
  // TABLEAU_INTERPRETER
  // Comprendre, comparer, totaliser, déduire
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_1_plus_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "sport",
    text: "Quelle activité est la plus choisie ?",
    format: "qcm",
    choices: ["Football", "Danse", "Natation", "On ne peut pas savoir"],
    expected: ["Football"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
    explanation: exp(
      "Interpréter un tableau, c’est utiliser les informations pour répondre.",
      "Pour trouver l’activité la plus choisie, on cherche le plus grand nombre.",
      "Football : 16, Danse : 9, Natation : 12. Le plus grand nombre est 16.",
      "L’activité la plus choisie est Football."
    ),
    tags: ["cm1", "tableau", "interpreter", "comparer", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Activités choisies",
      headers: ["Football", "Danse", "Natation"],
      rows: [
        {
          label: "Élèves",
          values: [16, 9, 12],
        },
      ],
      highlight: {
        cell: { row: 0, col: 0 },
      },
      questionLabel: "Quelle activité est la plus choisie ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_2_difference",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il d’élèves de plus en CM1 C qu’en CM1 A ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compare 26 et 22.",
    explanation: exp(
      "Comparer deux valeurs, c’est souvent chercher une différence.",
      "On soustrait la plus petite valeur à la plus grande.",
      "26 - 22 = 4.",
      "Il y a 4 élèves de plus en CM1 C."
    ),
    tags: ["cm1", "tableau", "interpreter", "difference", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Effectifs",
      headers: ["CM1 A", "CM1 B", "CM1 C"],
      rows: [
        {
          label: "Élèves",
          values: [22, 24, 26],
        },
      ],
      highlight: {
        row: 0,
      },
      questionLabel: "Différence entre CM1 C et CM1 A ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_3_total_deux_lignes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de fruits ont été vendus en tout le matin ?",
    format: "short",
    expected: ["55"],
    comparator: "number_equal",
    hint: "Additionne toute la ligne Matin.",
    explanation: exp(
      "Pour interpréter une ligne du tableau, on peut additionner ses valeurs.",
      "On additionne les fruits vendus le matin.",
      "18 + 12 + 25 = 55.",
      "55 fruits ont été vendus le matin."
    ),
    tags: ["cm1", "tableau", "interpreter", "total_ligne", "reunion", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        {
          label: "Matin",
          values: [18, 12, 25],
        },
        {
          label: "Après-midi",
          values: [14, 10, 20],
        },
      ],
      highlight: {
        row: 0,
      },
      questionLabel: "Total du matin ?",
    }),
  },

  {
    kind: "template",
    id: "cm1_tableau_interpreter_tpl_1_plus_grand",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la plus grande valeur du tableau.",
    tags: ["cm1", "tableau", "interpreter", "plus_grand", "template", "canvas"],
    generate: () => {
      const headers = randomChoice([
        ...CONTEXTES_SPORTS,
        ...CONTEXTES_FRUITS,
      ]);

      const values = shuffle([randomInt(6, 10), randomInt(11, 15), randomInt(16, 22)]);
      const max = Math.max(...values);
      const col = values.indexOf(max);
      const correct = headers[col];

      return {
        text: "Quelle catégorie a la plus grande valeur ?",
        format: "qcm",
        choices: makeChoices(correct, headers.filter((h) => h !== correct)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver la plus grande catégorie, on compare les nombres.",
          "On cherche le nombre le plus grand.",
          `Les valeurs sont ${values.join(", ")}. Le plus grand nombre est ${max}.`,
          `La catégorie la plus grande est ${correct}.`
        ),
        canvas: tableauCanvas({
          title: "Comparer des données",
          headers,
          rows: [
            {
              label: "Valeur",
              values,
            },
          ],
          highlight: {
            cell: { row: 0, col },
          },
          questionLabel: "Quelle catégorie est la plus grande ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tableau_interpreter_tpl_2_difference",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour trouver l’écart, fais une soustraction.",
    tags: ["cm1", "tableau", "interpreter", "difference", "template", "canvas"],
    generate: () => {
      const headers = randomChoice([
        ...CONTEXTES_ECOLE,
        ...CONTEXTES_SPORTS,
      ]);

      const small = randomInt(8, 15);
      const diff = randomInt(3, 9);
      const big = small + diff;
      const other = randomInt(8, 22);

      const values = [small, big, other];
      const correct = String(diff);

      return {
        text: `Quelle est la différence entre ${headers[1]} et ${headers[0]} ?`,
        format: "short",
        expected: [correct],
        comparator: "number_equal",
        explanation: exp(
          "Une différence se calcule avec une soustraction.",
          "On soustrait la plus petite valeur à la plus grande.",
          `${big} - ${small} = ${diff}.`,
          `La différence est ${diff}.`
        ),
        canvas: tableauCanvas({
          title: "Comparer deux valeurs",
          headers,
          rows: [
            {
              label: "Valeur",
              values,
            },
          ],
          highlight: {
            col: 1,
          },
          questionLabel: `Différence entre ${headers[1]} et ${headers[0]} ?`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tableau_interpreter_tpl_3_total_ligne",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    hint: "Additionne les trois valeurs de la ligne demandée.",
    tags: ["cm1", "tableau", "interpreter", "total_ligne", "template", "canvas"],
    generate: () => {
      const headers = randomChoice(CONTEXTES_FRUITS);
      const rowLabels = ["Matin", "Après-midi"];
      const row = randomInt(0, 1);

      const values = [
        [randomInt(5, 20), randomInt(5, 20), randomInt(5, 20)],
        [randomInt(5, 20), randomInt(5, 20), randomInt(5, 20)],
      ];

      const total = values[row].reduce((a, b) => a + b, 0);

      return {
        text: `Quel est le total de la ligne ${rowLabels[row]} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver le total d’une ligne, on additionne ses valeurs.",
          "On utilise seulement les nombres de la ligne demandée.",
          `${values[row].join(" + ")} = ${total}.`,
          `Le total de la ligne ${rowLabels[row]} est ${total}.`
        ),
        canvas: tableauCanvas({
          title: "Tableau de ventes",
          headers,
          rows: [
            {
              label: rowLabels[0],
              values: values[0],
            },
            {
              label: rowLabels[1],
              values: values[1],
            },
          ],
          highlight: {
            row,
          },
          questionLabel: `Total de la ligne ${rowLabels[row]} ?`,
        }),
      };
    },
  },

  // ============================================================
  // TABLEAU_DEFI
  // Petits problèmes à 2 étapes maximum
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_1_total_journee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché, combien de fruits ont été vendus en tout dans la journée ?",
    format: "short",
    expected: ["99"],
    comparator: "number_equal",
    hint: "Additionne toutes les valeurs du tableau.",
    explanation: exp(
      "Un défi avec tableau peut demander d’utiliser plusieurs cases.",
      "Ici, on additionne toutes les ventes du matin et de l’après-midi.",
      "18 + 12 + 25 + 14 + 10 + 20 = 99.",
      "99 fruits ont été vendus dans la journée."
    ),
    tags: ["cm1", "tableau", "defi", "total_general", "reunion", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        {
          label: "Matin",
          values: [18, 12, 25],
        },
        {
          label: "Après-midi",
          values: [14, 10, 20],
        },
      ],
      questionLabel: "Total de toute la journée ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_2_comparer_totaux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle classe a vendu le plus de tickets en tout ?",
    format: "qcm",
    choices: ["CM1 A", "CM1 B", "CM1 C", "Elles ont vendu pareil"],
    expected: ["CM1 B"],
    comparator: "mcq_exact",
    hint: "Calcule le total de chaque classe.",
    explanation: exp(
      "Pour comparer plusieurs lignes, on calcule d’abord chaque total.",
      "On additionne les valeurs de chaque classe.",
      "CM1 A : 12 + 9 = 21. CM1 B : 10 + 15 = 25. CM1 C : 8 + 11 = 19.",
      "La classe qui a vendu le plus est CM1 B."
    ),
    tags: ["cm1", "tableau", "defi", "comparer_totaux", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Vente de tickets",
      headers: ["Matin", "Après-midi"],
      rows: [
        {
          label: "CM1 A",
          values: [12, 9],
        },
        {
          label: "CM1 B",
          values: [10, 15],
        },
        {
          label: "CM1 C",
          values: [8, 11],
        },
      ],
      highlight: {
        row: 1,
      },
      questionLabel: "Quelle classe a vendu le plus ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_3_ecart_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "sport",
    text: "Combien d’élèves de plus ont choisi un sport collectif qu’un sport individuel ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Calcule chaque total, puis fais la différence.",
    explanation: exp(
      "Un défi peut demander deux étapes : totaliser puis comparer.",
      "On calcule les deux totaux, puis on cherche la différence.",
      "Sports collectifs : 14 + 12 = 26. Sports individuels : 9 + 11 = 20. Différence : 26 - 20 = 6.",
      "Il y a 6 élèves de plus pour les sports collectifs."
    ),
    tags: ["cm1", "tableau", "defi", "sport", "difference_totaux", "canvas"],
    canvas: tableauCanvas({
      title: "Choix des sports",
      headers: ["Activité 1", "Activité 2"],
      rows: [
        {
          label: "Sports collectifs",
          values: [14, 12],
        },
        {
          label: "Sports individuels",
          values: [9, 11],
        },
      ],
      questionLabel: "Différence entre les deux totaux ?",
    }),
  },

  {
    kind: "template",
    id: "cm1_tableau_defi_tpl_1_total_general",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les cases du tableau.",
    tags: ["cm1", "tableau", "defi", "total_general", "template", "canvas"],
    generate: () => {
      // 20/10/2026 : décor tiré parmi les SITUATIONS (la phrase revenait à l'identique).
      const s = randomChoice(SITUATIONS);
      const headers = colonnes(s, 3);
      const rows = s.lignes;

      const values = [
        [tirerNombre(s), tirerNombre(s), tirerNombre(s)],
        [tirerNombre(s), tirerNombre(s), tirerNombre(s)],
      ];

      const total = values.flat().reduce((a, b) => a + b, 0);

      return {
        text: randomChoice([
          `${s.intro}. Quel est le total de toutes les valeurs du tableau ?`,
          `Tableau « ${s.titre} » : additionne les six cases. Quel total trouves-tu ?`,
          `${s.intro}. Combien ${deMot(s.unite)} sur toute la grille ?`,
        ]),
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le total général regroupe toutes les valeurs du tableau.",
          "On additionne toutes les cases numériques.",
          `${values.flat().join(" + ")} = ${total}.`,
          `Le total général est ${total}.`
        ),
        canvas: tableauCanvas({
          title: s.titre,
          headers,
          rows: [
            {
              label: rows[0],
              values: values[0],
            },
            {
              label: rows[1],
              values: values[1],
            },
          ],
          questionLabel: "Total de toutes les valeurs ?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tableau_defi_tpl_2_comparer_deux_lignes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule le total de chaque ligne, puis compare.",
    tags: ["cm1", "tableau", "defi", "comparer_lignes", "template", "canvas"],
    generate: () => {
      // 20/10/2026 : décor tiré parmi les SITUATIONS ; le surlignage qui
      // montrait la bonne ligne est retiré (il donnait la réponse).
      const s = randomChoice(SITUATIONS);
      const headers = colonnes(s, 3);
      const rowLabels = s.lignes;

      const [a1, a2, a3] = [tirerNombre(s), tirerNombre(s), tirerNombre(s)];
      const [b1, b2, b3] = [tirerNombre(s), tirerNombre(s), tirerNombre(s)];

      const totalA = a1 + a2 + a3;
      const totalB = b1 + b2 + b3;

      const egalite = "Autant pour les deux";
      const correct =
        totalA > totalB ? rowLabels[0] : totalB > totalA ? rowLabels[1] : egalite;

      return {
        text: randomChoice([
          `${s.intro}. Quelle ligne a le plus grand total ?`,
          `Tableau « ${s.titre} » : « ${rowLabels[0]} » ou « ${rowLabels[1]} », laquelle a le plus ${deMot(s.unite)} en tout ?`,
          `${s.intro}. Calcule les deux totaux : quelle ligne gagne ?`,
        ]),
        format: "qcm",
        choices: [rowLabels[0], rowLabels[1], egalite],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux lignes, on calcule le total de chaque ligne.",
          "On additionne les valeurs de chaque ligne.",
          `${rowLabels[0]} : ${a1} + ${a2} + ${a3} = ${totalA}. ${rowLabels[1]} : ${b1} + ${b2} + ${b3} = ${totalB}.`,
          correct === egalite
            ? "Les deux lignes ont le même total."
            : `Le plus grand total est celui de « ${correct} ».`
        ),
        canvas: tableauCanvas({
          title: s.titre,
          headers,
          rows: [
            {
              label: rowLabels[0],
              values: [a1, a2, a3],
            },
            {
              label: rowLabels[1],
              values: [b1, b2, b3],
            },
          ],
          questionLabel: "Quelle ligne a le plus grand total ?",
        }),
      };
    },
  },

  // ============================================================
  // TOP-UP — TABLEAU_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_4_basket",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "sport",
    text: "Combien d’élèves ont choisi le basket ?",
    format: "qcm",
    choices: ["14", "9", "11", "34"],
    expected: ["14"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne Basket.",
    explanation: exp(
      "Un tableau range les informations en colonnes.",
      "On repère la colonne Basket et on lit la valeur.",
      "Dans la colonne Basket, on lit 14.",
      "14 élèves ont choisi le basket."
    ),
    tags: ["cm1", "tableau", "lire", "sport", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Sports préférés",
      headers: ["Basket", "Course", "Tennis"],
      rows: [{ label: "Élèves", values: [14, 9, 11] }],
      highlight: { cell: { row: 0, col: 0 } },
      questionLabel: "Combien d’élèves au basket ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_5_papayes_aprem",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché, combien de papayes ont été vendues l’après-midi ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Croise la ligne Après-midi et la colonne Papayes.",
    explanation: exp(
      "Lire un tableau à deux lignes, c’est croiser une ligne et une colonne.",
      "On cherche la ligne Après-midi et la colonne Papayes.",
      "À l’intersection, on lit 12.",
      "12 papayes ont été vendues l’après-midi."
    ),
    tags: ["cm1", "tableau", "lire", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Letchis", "Papayes", "Goyaviers"],
      rows: [
        { label: "Matin", values: [20, 15, 18] },
        { label: "Après-midi", values: [16, 12, 14] },
      ],
      highlight: { cell: { row: 1, col: 1 } },
      questionLabel: "Papayes — Après-midi",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_6_absents_mercredi",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’élèves étaient absents mercredi ?",
    format: "qcm",
    choices: ["1", "2", "3", "6"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne Mercredi.",
    explanation: exp(
      "Un tableau permet de retrouver vite une information.",
      "On repère la colonne Mercredi.",
      "Dans cette colonne, on lit 1.",
      "1 élève était absent mercredi."
    ),
    tags: ["cm1", "tableau", "lire", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Absents de la semaine",
      headers: ["Lundi", "Mardi", "Mercredi"],
      rows: [{ label: "Absents", values: [2, 3, 1] }],
      highlight: { cell: { row: 0, col: 2 } },
      questionLabel: "Absents mercredi ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_7_surf",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "sport",
    text: "Combien d’élèves font du surf ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche la colonne Surf.",
    explanation: exp(
      "Pour lire un tableau, on repère la bonne colonne.",
      "On cherche la colonne Surf et on lit la valeur.",
      "Dans la colonne Surf, on lit 7.",
      "7 élèves font du surf."
    ),
    tags: ["cm1", "tableau", "lire", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Sports de plein air",
      headers: ["Surf", "Volley", "Randonnée"],
      rows: [{ label: "Élèves", values: [7, 13, 9] }],
      highlight: { cell: { row: 0, col: 0 } },
      questionLabel: "Combien au surf ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_lire_fixed_8_citrons",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_lire",
    difficulty: 1,
    theme: "reunion",
    text: "Combien de citrons ont été vendus ?",
    format: "qcm",
    choices: ["22", "16", "30", "68"],
    expected: ["22"],
    comparator: "mcq_exact",
    hint: "Cherche la colonne Citrons.",
    explanation: exp(
      "Un tableau range chaque fruit dans sa colonne.",
      "On repère la colonne Citrons.",
      "Dans cette colonne, on lit 22.",
      "22 citrons ont été vendus."
    ),
    tags: ["cm1", "tableau", "lire", "reunion", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes du jour",
      headers: ["Citrons", "Avocats", "Cocos"],
      rows: [{ label: "Quantité", values: [22, 16, 30] }],
      highlight: { cell: { row: 0, col: 0 } },
      questionLabel: "Combien de citrons ?",
    }),
  },

  // ============================================================
  // TOP-UP — TABLEAU_COMPLETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_3_goyaviers",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "reunion",
    text: "Le total est 50 fruits. Il y a 20 letchis et 12 papayes. Combien y a-t-il de goyaviers ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Additionne les fruits connus, puis complète jusqu’à 50.",
    explanation: exp(
      "Compléter un tableau, c’est retrouver une case manquante.",
      "On additionne les valeurs connues, puis on soustrait au total.",
      "20 + 12 = 32, puis 50 - 32 = 18.",
      "Il y a 18 goyaviers."
    ),
    tags: ["cm1", "tableau", "completer", "total", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Fruits vendus",
      headers: ["Letchis", "Papayes", "Goyaviers", "Total"],
      rows: [{ label: "Quantité", values: [20, 12, "?", 50] }],
      highlight: { cell: { row: 0, col: 2 } },
      questionLabel: "Quelle valeur manque ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_4_total_activites",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "sport",
    text: "11 élèves font du football, 9 de la danse et 14 de la natation. Quel est le total ?",
    format: "short",
    expected: ["34"],
    comparator: "number_equal",
    hint: "Additionne les trois nombres.",
    explanation: exp(
      "Un total regroupe toutes les valeurs.",
      "On additionne les élèves de chaque activité.",
      "11 + 9 + 14 = 34.",
      "Le total est 34 élèves."
    ),
    tags: ["cm1", "tableau", "completer", "total", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Activités choisies",
      headers: ["Football", "Danse", "Natation", "Total"],
      rows: [{ label: "Élèves", values: [11, 9, 14, "?"] }],
      highlight: { cell: { row: 0, col: 3 } },
      questionLabel: "Quel est le total ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_5_ananas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "reunion",
    text: "Le total est 40 fruits. Il y a 15 mangues et 12 bananes. Combien y a-t-il d’ananas ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Additionne les fruits connus, puis complète jusqu’à 40.",
    explanation: exp(
      "On retrouve une case manquante grâce au total.",
      "On additionne les valeurs connues, puis on soustrait au total.",
      "15 + 12 = 27, puis 40 - 27 = 13.",
      "Il y a 13 ananas."
    ),
    tags: ["cm1", "tableau", "completer", "valeur_manquante", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Fruits vendus",
      headers: ["Mangues", "Ananas", "Bananes", "Total"],
      rows: [{ label: "Quantité", values: [15, "?", 12, 40] }],
      highlight: { cell: { row: 0, col: 1 } },
      questionLabel: "Quelle valeur manque ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_6_cm1a",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "neutral",
    text: "Les trois classes ont 72 élèves en tout. CM1 B a 24 élèves et CM1 C en a 26. Combien y a-t-il d’élèves en CM1 A ?",
    format: "short",
    expected: ["22"],
    comparator: "number_equal",
    hint: "Additionne CM1 B et CM1 C, puis complète jusqu’à 72.",
    explanation: exp(
      "On utilise le total pour retrouver la case manquante.",
      "On additionne les classes connues, puis on soustrait au total.",
      "24 + 26 = 50, puis 72 - 50 = 22.",
      "Il y a 22 élèves en CM1 A."
    ),
    tags: ["cm1", "tableau", "completer", "valeur_manquante", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Effectifs des classes",
      headers: ["CM1 A", "CM1 B", "CM1 C", "Total"],
      rows: [{ label: "Élèves", values: ["?", 24, 26, 72] }],
      highlight: { cell: { row: 0, col: 0 } },
      questionLabel: "Quelle valeur manque ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_7_tennis",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 2,
    theme: "sport",
    text: "Le total est 30 élèves. 13 font du basket et 8 de la course. Combien font du tennis ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Additionne basket et course, puis complète jusqu’à 30.",
    explanation: exp(
      "On retrouve la case manquante avec le total.",
      "On additionne les valeurs connues, puis on soustrait au total.",
      "13 + 8 = 21, puis 30 - 21 = 9.",
      "9 élèves font du tennis."
    ),
    tags: ["cm1", "tableau", "completer", "total", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Sports choisis",
      headers: ["Basket", "Course", "Tennis", "Total"],
      rows: [{ label: "Élèves", values: [13, 8, "?", 30] }],
      highlight: { cell: { row: 0, col: 2 } },
      questionLabel: "Combien au tennis ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_completer_fixed_8_volley",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_completer",
    difficulty: 3,
    theme: "sport",
    text: "Le total est 25 élèves. 7 font du surf et 9 de la randonnée. Combien font du volley ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Additionne surf et randonnée, puis complète jusqu’à 25.",
    explanation: exp(
      "Le total permet de retrouver la valeur cachée.",
      "On additionne les valeurs connues, puis on soustrait au total.",
      "7 + 9 = 16, puis 25 - 16 = 9.",
      "9 élèves font du volley."
    ),
    tags: ["cm1", "tableau", "completer", "valeur_manquante", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Sports de plein air",
      headers: ["Surf", "Volley", "Randonnée", "Total"],
      rows: [{ label: "Élèves", values: [7, "?", 9, 25] }],
      highlight: { cell: { row: 0, col: 1 } },
      questionLabel: "Combien au volley ?",
    }),
  },

  // ============================================================
  // TOP-UP — TABLEAU_INTERPRETER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_4_moins_choisie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "sport",
    text: "Quelle activité est la moins choisie ?",
    format: "qcm",
    choices: ["Football", "Danse", "Natation", "On ne peut pas savoir"],
    expected: ["Danse"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit nombre.",
    explanation: exp(
      "Interpréter un tableau, c’est comparer les valeurs.",
      "Pour la moins choisie, on cherche le plus petit nombre.",
      "Football : 16, Danse : 9, Natation : 12. Le plus petit est 9.",
      "L’activité la moins choisie est la Danse."
    ),
    tags: ["cm1", "tableau", "interpreter", "comparer", "sport", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Activités choisies",
      headers: ["Football", "Danse", "Natation"],
      rows: [{ label: "Élèves", values: [16, 9, 12] }],
      highlight: { cell: { row: 0, col: 1 } },
      questionLabel: "Quelle activité est la moins choisie ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_5_total_aprem",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de fruits ont été vendus en tout l’après-midi ?",
    format: "short",
    expected: ["44"],
    comparator: "number_equal",
    hint: "Additionne toute la ligne Après-midi.",
    explanation: exp(
      "Pour le total d’une ligne, on additionne ses valeurs.",
      "On additionne les fruits de l’après-midi.",
      "14 + 10 + 20 = 44.",
      "44 fruits ont été vendus l’après-midi."
    ),
    tags: ["cm1", "tableau", "interpreter", "total_ligne", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        { label: "Matin", values: [18, 12, 25] },
        { label: "Après-midi", values: [14, 10, 20] },
      ],
      highlight: { row: 1 },
      questionLabel: "Total de l’après-midi ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_6_difference_mangues",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de mangues de plus ont été vendues le matin que l’après-midi ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compare 18 et 14.",
    explanation: exp(
      "Comparer deux cases, c’est chercher leur différence.",
      "On soustrait la plus petite valeur à la plus grande.",
      "18 - 14 = 4.",
      "Il y a 4 mangues de plus le matin."
    ),
    tags: ["cm1", "tableau", "interpreter", "difference", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes de mangues",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        { label: "Matin", values: [18, 12, 25] },
        { label: "Après-midi", values: [14, 10, 20] },
      ],
      highlight: { col: 0 },
      questionLabel: "Mangues : matin − après-midi ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_interpreter_fixed_7_classe_moins",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle classe a le moins d’élèves ?",
    format: "qcm",
    choices: ["CM1 A", "CM1 B", "CM1 C", "Elles sont à égalité"],
    expected: ["CM1 A"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit nombre.",
    explanation: exp(
      "Pour comparer des effectifs, on regarde les nombres.",
      "On cherche le plus petit effectif.",
      "CM1 A : 22, CM1 B : 24, CM1 C : 26. Le plus petit est 22.",
      "La classe avec le moins d’élèves est CM1 A."
    ),
    tags: ["cm1", "tableau", "interpreter", "comparer", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Effectifs",
      headers: ["CM1 A", "CM1 B", "CM1 C"],
      rows: [{ label: "Élèves", values: [22, 24, 26] }],
      highlight: { cell: { row: 0, col: 0 } },
      questionLabel: "Quelle classe a le moins d’élèves ?",
    }),
  },

  // ============================================================
  // TOP-UP — TABLEAU_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_4_total_journee_letchis",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Combien de fruits ont été vendus en tout dans la journée ?",
    format: "short",
    expected: ["95"],
    comparator: "number_equal",
    hint: "Additionne toutes les cases du tableau.",
    explanation: exp(
      "Un défi peut demander d’additionner toutes les cases.",
      "On additionne les ventes du matin et de l’après-midi.",
      "20 + 15 + 18 + 16 + 12 + 14 = 95.",
      "95 fruits ont été vendus dans la journée."
    ),
    tags: ["cm1", "tableau", "defi", "total_general", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Letchis", "Papayes", "Goyaviers"],
      rows: [
        { label: "Matin", values: [20, 15, 18] },
        { label: "Après-midi", values: [16, 12, 14] },
      ],
      questionLabel: "Total de toute la journée ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_5_ecart_classes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de tickets de plus la classe CM1 B a-t-elle vendus que la classe CM1 A en tout ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Calcule le total de chaque classe, puis fais la différence.",
    explanation: exp(
      "Ce défi demande deux étapes : totaliser puis comparer.",
      "On calcule chaque total, puis on cherche la différence.",
      "CM1 A : 12 + 9 = 21. CM1 B : 10 + 15 = 25. Différence : 25 - 21 = 4.",
      "CM1 B a vendu 4 tickets de plus."
    ),
    tags: ["cm1", "tableau", "defi", "difference_totaux", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Vente de tickets",
      headers: ["Matin", "Après-midi"],
      rows: [
        { label: "CM1 A", values: [12, 9] },
        { label: "CM1 B", values: [10, 15] },
      ],
      questionLabel: "Différence CM1 B − CM1 A ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_6_marche_plus",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Quel marché a vendu le plus de fruits en tout ?",
    format: "qcm",
    choices: ["Marché Nord", "Marché Sud", "Ils ont vendu pareil", "On ne peut pas savoir"],
    expected: ["Marché Sud"],
    comparator: "mcq_exact",
    hint: "Calcule le total de chaque marché.",
    explanation: exp(
      "Pour comparer deux lignes, on calcule d’abord chaque total.",
      "On additionne les ventes de chaque marché.",
      "Nord : 30 + 25 = 55. Sud : 28 + 30 = 58.",
      "Le marché qui a vendu le plus est le Marché Sud."
    ),
    tags: ["cm1", "tableau", "defi", "comparer_totaux", "reunion", "qcm", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes de fruits",
      headers: ["Matin", "Après-midi"],
      rows: [
        { label: "Marché Nord", values: [30, 25] },
        { label: "Marché Sud", values: [28, 30] },
      ],
      highlight: { row: 1 },
      questionLabel: "Quel marché a vendu le plus ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_7_ecart_matin_aprem",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Combien de fruits de plus ont été vendus le matin que l’après-midi ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Calcule le total du matin et celui de l’après-midi, puis compare.",
    explanation: exp(
      "Ce défi demande de totaliser chaque ligne puis de comparer.",
      "On calcule les deux totaux, puis on fait la différence.",
      "Matin : 18 + 12 + 25 = 55. Après-midi : 14 + 10 + 20 = 44. Différence : 55 - 44 = 11.",
      "Il y a 11 fruits de plus le matin."
    ),
    tags: ["cm1", "tableau", "defi", "difference_totaux", "reunion", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Ventes au marché",
      headers: ["Mangues", "Ananas", "Bananes"],
      rows: [
        { label: "Matin", values: [18, 12, 25] },
        { label: "Après-midi", values: [14, 10, 20] },
      ],
      questionLabel: "Matin − Après-midi ?",
    }),
  },

  {
    kind: "fixed",
    id: "cm1_tableau_defi_fixed_8_total_general_sports",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tableau",
    microId: "tableau_defi",
    difficulty: 3,
    theme: "sport",
    text: "Combien d’élèves ont été comptés en tout dans ce tableau ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Additionne toutes les cases.",
    explanation: exp(
      "Le total général regroupe toutes les valeurs du tableau.",
      "On additionne toutes les cases.",
      "12 + 8 + 10 + 9 + 11 + 10 = 60.",
      "60 élèves ont été comptés en tout."
    ),
    tags: ["cm1", "tableau", "defi", "total_general", "sport", "short", "canvas"],
    canvas: tableauCanvas({
      title: "Sports par groupe",
      headers: ["Football", "Basket", "Tennis"],
      rows: [
        { label: "Groupe A", values: [12, 8, 10] },
        { label: "Groupe B", values: [9, 11, 10] },
      ],
      questionLabel: "Total général ?",
    }),
  },

  // ⭐ 20/10/2026 — générateurs situation × tournure (voir SITUATIONS).
  ...GEN_LIRE,
  ...GEN_COMPLETER,
  ...GEN_INTERPRETER,
  ...GEN_DEFI,
];