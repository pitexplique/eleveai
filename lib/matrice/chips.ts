// lib/matrice/chips.ts
//
// LES CHIPS SE DÉDUISENT DES RESSOURCES, ELLES NE SE DÉCRÈTENT PAS.
//
// Avant (05/08), elles étaient écrites à la main par cycle dans profils.ts :
// on affichait « Créer une évaluation » à un professeur sans savoir si quoi que
// ce soit existait derrière. Une chip qui ne mène nulle part coûte plus cher en
// confiance qu'elle ne rapporte en promesse.
//
// Maintenant :
//   profil → ressources publiables compatibles → intentions réellement
//   couvertes → chips, triées par ce qu'il y a derrière.
//
// Conséquence voulue : une intention sans ressource N'APPARAÎT PAS. Le jour où
// une ressource « créer une remédiation » entre dans ressources.ts, sa chip
// apparaît toute seule. Rien à synchroniser à la main.

import { getProfil, rangNiveaux } from "./profils";
import { RESSOURCES, STATUTS_PUBLIABLES } from "./ressources";
import type { Intention, ProfilId } from "./types";

export type ChipDynamique = {
  intention: Intention;
  label: string;
  /** Combien de ressources cette chip ouvre réellement. Sert au tri. */
  nombre: number;
};

/**
 * Le mot juste selon à qui l'on parle. Un CP lit « Compter », un lycéen
 * « M'entraîner », un professeur « Trouver une ressource » — même intention,
 * trois vocabulaires. `defaut` sert dès qu'un profil n'a pas son mot à lui.
 */
const LIBELLES: Record<Intention, { defaut: string; primaire?: string; adulte?: string }> = {
  comprendre: { defaut: "Comprendre une notion", primaire: "Comprendre", adulte: "Comprendre une notion" },
  entrainer: { defaut: "M'entraîner", primaire: "M'entraîner", adulte: "Trouver une activité" },
  // « Teste-toi » — les parcours. Un adulte ne se teste pas lui-même : il vient
  // voir où en est quelqu'un, d'où « Faire le point ».
  tester: { defaut: "Teste-toi", primaire: "Teste-toi", adulte: "Faire le point" },
  preparer: { defaut: "Préparer un contrôle", primaire: "Me préparer", adulte: "Préparer une évaluation" },
  corriger: { defaut: "Corriger une erreur", primaire: "Corriger une erreur" },
  decouvrir: { defaut: "Découvrir", primaire: "Découvrir" },
  rituel: { defaut: "Cinq minutes", primaire: "Un petit défi" },
  suivre: { defaut: "Voir la progression", adulte: "Voir la progression" },
  enseigner: { defaut: "Trouver une ressource", adulte: "Trouver une ressource" },
  // « humain » n'a aucune ressource derrière (pas d'annuaire de professeurs) :
  // elle ne sortira donc jamais d'ici. C'est exactement le but du fichier.
  humain: { defaut: "Trouver quelqu'un" },
};

function libelle(intention: Intention, profil: ProfilId | null): string {
  const l = LIBELLES[intention];
  // Personne n'a encore dit qui il est : on prend le mot le plus courant, pas
  // celui d'un profil qu'on aurait supposé.
  if (!profil) return l.defaut;
  const p = getProfil(profil);
  if (p.groupe === "adulte") return l.adulte ?? l.defaut;
  if (p.cycle === "primaire") return l.primaire ?? l.defaut;
  return l.defaut;
}

/**
 * Les ressources qu'un profil peut réellement se voir proposer.
 *
 * ⭐ `null` = PERSONNE N'A ENCORE DIT QUI IL EST. On ne filtre alors sur aucun
 * niveau, et c'est important : le composant démarre sur « 6e » par défaut, si
 * bien qu'avant le moindre clic la page montrait le monde d'un sixième — pas
 * d'espagnol, pas de spécialités — à un lycéen, à un professeur, à un CP.
 * Un défaut technique se lisait comme une réponse. Tant que la question « qui
 * es-tu ? » est ouverte, la réponse honnête est : tout ce qu'on a.
 *
 * ⭐ `classe` — LA CLASSE DITE PAR UN ADULTE (16/08/2026, Frédéric : « il faut
 * afficher classe et matière pas que pour l'élève mais aussi pour prof et
 * parents »). Un parent voyait UNE matière, un enseignant aussi : leurs profils
 * n'acceptent que les ressources marquées « parent » ou « prof », et il y en a
 * huit en tout, presque toutes en maths. La rangée des matières ne s'affichait
 * donc jamais chez eux — pas par choix, par arithmétique.
 *
 * Une ressource passe désormais si elle est au niveau du PROFIL **ou** à celui
 * de la classe dite. Ce n'est pas un élargissement du filtre : c'est le filtre
 * qui manquait. Un parent ne cherche pas « une ressource pour parents », il
 * cherche ce que son enfant de 5ᵉ peut faire ce soir.
 */
export function ressourcesPour(
  profil: ProfilId | null,
  matiere?: string | null,
  classe?: ProfilId | null,
) {
  const p = profil ? getProfil(profil) : null;
  return RESSOURCES.filter((r) => {
    if (!STATUTS_PUBLIABLES.includes(r.statut)) return false;
    // ⭐ LA MATIÈRE FILTRE AUSSI (07/08). Depuis qu'elle se choisit AVANT
    // « Que veux-tu faire aujourd'hui ? », les intentions proposées doivent
    // être celles de cette matière-là. Un élève qui clique « Espagnol » lisait
    // « Corriger une erreur » — une chip qui n'ouvrait rien en espagnol, parce
    // qu'elle avait été comptée sur le coach de maths.
    // « transversal » traverse tout : elle ne contredit aucune matière.
    if (matiere && r.matiere && r.matiere !== "transversal" && r.matiere !== matiere) return false;
    if (matiere && !r.matiere) return false;
    if (!p && !classe) return true;
    if (r.niveaux.includes("*")) return true;
    return rangNiveaux(profil, r.niveaux) >= 0 || rangNiveaux(classe, r.niveaux) >= 0;
  });
}

/**
 * Les chips d'un profil, dans l'ordre de ce qu'il y a derrière.
 *
 * ⚠️ Aucun nombre visé. S'il y a deux intentions couvertes, il y a deux chips.
 * On ne remplit pas l'écran pour faire croire à plus de fonctionnalités qu'il
 * n'y en a — c'est la même règle que pour les banques de questions.
 */
export function chipsDisponibles(
  profil: ProfilId | null,
  matiere?: string | null,
  classe?: ProfilId | null,
): ChipDynamique[] {
  // ⭐ « ENSEIGNER » N'EST PAS UNE INTENTION D'ÉLÈVE (corrigé le 07/08).
  // Un 6ᵉ lisait « Trouver une ressource » à côté de « M'entraîner » : la
  // chip existait parce que « Les maths en vrai » et « La carte de l'île »
  // portent l'intention `enseigner` ET sont ouvertes aux collégiens. Le compte
  // était juste, la conclusion fausse — ces ressources sont bonnes pour un
  // élève, mais il ne vient pas les chercher pour préparer un cours.
  // ⚠️ On filtre la CHIP, pas la ressource : « Les maths en vrai » continue de
  // sortir pour un élève qui demande à découvrir.
  const adulte = profil ? getProfil(profil).groupe === "adulte" : false;

  const compte = new Map<Intention, number>();
  for (const r of ressourcesPour(profil, matiere, classe)) {
    for (const i of r.intentions) {
      if (i === "enseigner" && !adulte) continue;
      // ⛔ « PRÉPARER UN CONTRÔLE » RETIRÉE AUX ÉLÈVES (Frédéric, 12/08) — sa
      // place va à « Photographier un cours », dans EntreeMatrice.
      //
      // ⚠️ L'INTENTION RESTE ENTIÈRE, comme pour « corriger » plus bas : le
      // lexique lit toujours « j'ai un contrôle », le moteur la score toujours,
      // et un élève qui l'écrit dans le champ obtient toujours ses parcours et
      // son guide de survie. On retire le BOUTON, pas la fonction.
      //
      // ⚠️ `!adulte` : le professeur et le chef d'établissement gardent
      // « Préparer une évaluation », qui ne désigne pas le même geste.
      if (i === "preparer" && !adulte) continue;
      if (SANS_CHIP.has(i)) continue;
      compte.set(i, (compte.get(i) ?? 0) + 1);
    }
  }

  return [...compte.entries()]
    .map(([intention, nombre]) => ({ intention, nombre, label: libelle(intention, profil) }))
    .sort((a, b) => rang(a.intention) - rang(b.intention) || a.label.localeCompare(b.label));
}

/**
 * L'ORDRE DES CHIPS, ÉCRIT — pas déduit du nombre de ressources.
 *
 * ⭐ Changé le 07/08 (Frédéric : « Découvrir vient à la fin des chips, le
 * premier chip est M'entraîner »). Le tri se faisait sur le NOMBRE de
 * ressources derrière chaque intention : « Découvrir » sortait deuxième parce
 * qu'on a huit machines, une carte, des vidéos et les défis. Beaucoup de
 * ressources, oui — mais ce n'est pas ce pour quoi un élève ouvre le site un
 * mardi soir. Compter ce qu'on a produit n'est pas la même chose que classer
 * ce dont on a besoin, et c'est l'inventaire qui décidait.
 *
 * L'ordre est celui que Frédéric a dicté le 07/08, et il suit les OUTILS, pas
 * les mots :
 *   1-2. le COACH — « M'entraîner », « Comprendre une notion » ;
 *   3.   les PARCOURS — « Teste-toi » ;
 *   4.   les RITUELS — « Cinq minutes » ;
 *   (5.  la pastille CONCOURS s'insère ici, dans EntreeMatrice) ;
 *   puis le reste, et « Découvrir » tout à la fin — c'est un plaisir, pas un
 *   besoin, et c'est pourtant ce que l'ancien tri par nombre de ressources
 *   plaçait en deuxième, parce qu'on a huit machines.
 * Ce qui n'est pas listé passe à la fin.
 */
const ORDRE_INTENTIONS: Intention[] = [
  "entrainer",
  "comprendre",
  "tester",
  "rituel",
  "preparer",
  "suivre",
  "enseigner",
  "decouvrir",
  "corriger",
  "humain",
];

/**
 * DES INTENTIONS QUI NE DEVIENNENT PAS DES CHIPS.
 *
 * ⛔ « Corriger une erreur » retirée le 07/08. Frédéric : « corriger une
 * erreur ? en CP CM2 et seconde non ». Il visait trois niveaux ; en regardant
 * pourquoi, c'est partout que la chip est fausse — elle n'était simplement
 * visible qu'à ces trois-là, ailleurs le concours ou un rituel lui prenait sa
 * place.
 *
 * La raison : CORRIGER UNE ERREUR, ÇA SE FAIT APRÈS S'ÊTRE TROMPÉ. C'est un
 * geste du coach, une fois qu'une réponse est fausse et qu'on a l'explication
 * sous les yeux. Sur la page d'entrée, personne n'a encore rien fait — la chip
 * demandait de quelle erreur on parle avant qu'aucune erreur n'existe.
 * Un CP, en plus, ne se dit jamais « je vais corriger une erreur ».
 *
 * ⚠️ L'INTENTION RESTE ENTIÈRE. Le lexique la lit toujours (« c'est faux »,
 * « où est mon erreur », « je me trompe »), le moteur la score toujours, les
 * coachs la portent toujours. On a retiré le BOUTON, pas la fonction — même
 * distinction que pour « Écris-moi ».
 */
const SANS_CHIP = new Set<Intention>(["corriger"]);

function rang(i: Intention): number {
  const r = ORDRE_INTENTIONS.indexOf(i);
  return r < 0 ? ORDRE_INTENTIONS.length : r;
}

/**
 * Au-delà, les chips passent derrière « Plus d'options ».
 *
 * ⚠️ CINQ, PAS SIX (07/08) : la rangée doit tenir sur UNE ligne d'ordinateur,
 * et « Préparer un contrôle » + « Corriger une erreur » + « Comprendre une
 * notion » font déjà 55 caractères à elles trois. Six chips passaient à la
 * ligne à tous les coups, et deux lignes de pastilles repoussaient les
 * ressources sous le pli.
 */
export const CHIPS_VISIBLES = 5;

/**
 * Retrouve l'intention derrière une chip, même composite.
 *
 * ⚠️ LA CLASSE DOIT SUIVRE. Les libellés se déduisent des ressources : sans
 * elle, un parent qui a dit « 5ᵉ » puis cliqué « Teste-toi » voyait sa chip
 * relue dans une liste où elle n'existe pas — et le moteur repartait sans
 * intention, comme si le clic n'avait pas eu lieu.
 */
export function intentionDeLaChip(
  profil: ProfilId,
  chip: string,
  classe?: ProfilId | null,
): Intention | null {
  const dispo = chipsDisponibles(profil, null, classe);
  for (const partie of partiesDeLaChip(chip)) {
    const trouve = dispo.find((c) => c.label === partie);
    if (trouve) return trouve.intention;
  }
  return null;
}

// ─── LES MATIÈRES ──────────────────────────────────────────────────────────
// Même règle que les intentions : on n'affiche que ce qui a des ressources.
// Un CP voit « Maths · Français », un lycéen y ajoute l'anglais, l'espagnol et
// l'IA — parce que c'est ce qui existe pour eux, pas parce qu'on l'a décidé.

export type Matiere = NonNullable<
  (typeof RESSOURCES)[number]["matiere"]
>;

export type ChipMatiere = { matiere: Matiere; label: string; nombre: number };

const LIBELLE_MATIERE: Record<string, string> = {
  // « Mathématiques » en entier (Frédéric, 06/08) : c'est le mot du programme
  // et celui que les parents lisent sur un bulletin. « Maths » reste compris
  // à la saisie — il est dans les alias du lexique.
  maths: "Mathématiques",
  francais: "Français",
  anglais: "Anglais",
  espagnol: "Espagnol",
  ia: "IA",
  transversal: "Tout",
};

/**
 * Matières qu'on NE PROPOSE PAS comme bouton, même si des ressources existent.
 *
 * ⭐ VIDE DEPUIS LE 07/08 — « ia » y était, Frédéric l'en sort lui-même :
 * « rajoute IA car coach IA existe ». Elle avait été masquée le 06/08 (« pas
 * assez robuste ») ; le coach IA, les parcours d'IA et l'éval Pix IA ont
 * tourné depuis. Elle apparaît donc à partir de la 4ᵉ — c'est le premier
 * niveau où ces trois ressources existent, pas une décision de plus.
 *
 * ⚠️ On garde l'ensemble et pas seulement la ligne supprimée : c'est le
 * mécanisme qui compte. Masquer une matière est un geste légitime — on l'a
 * fait, on l'a défait — mais il doit rester UN endroit, pas une condition
 * éparpillée dans les composants.
 */
const MATIERES_MASQUEES = new Set<string>();

/**
 * L'ORDRE DES MATIÈRES, ÉCRIT — pas déduit du nombre de ressources.
 *
 * ⭐ Fixé le 07/08 (Frédéric : « Mathématiques Français Anglais Espagnol IA »).
 * Le tri se faisait sur le NOMBRE de ressources derrière chaque matière, et
 * l'ordre changeait donc d'un niveau à l'autre : le français était deuxième au
 * collège, troisième en Seconde, et DERNIER en Première et en Terminale. Une
 * rangée qui se réordonne toute seule oblige à relire les cinq boutons à chaque
 * changement de classe.
 *
 * C'est l'ordre du bulletin, et c'est celui que tout le monde a en tête.
 */
const ORDRE_MATIERES: string[] = ["maths", "francais", "anglais", "espagnol", "ia"];

export function matieresDisponibles(
  profil: ProfilId | null,
  classe?: ProfilId | null,
): ChipMatiere[] {
  const compte = new Map<Matiere, number>();
  for (const r of ressourcesPour(profil, null, classe)) {
    // « transversal » n'est pas une matière qu'on choisit : c'est l'absence de
    // matière. L'afficher donnerait un bouton « Tout » à côté de « Maths »,
    // qui ne veut rien dire pour un élève.
    if (!r.matiere || r.matiere === "transversal") continue;
    if (MATIERES_MASQUEES.has(r.matiere)) continue;
    compte.set(r.matiere, (compte.get(r.matiere) ?? 0) + 1);
  }

  const rangMatiere = (m: string) => {
    const r = ORDRE_MATIERES.indexOf(m);
    return r < 0 ? ORDRE_MATIERES.length : r;
  };

  return [...compte.entries()]
    .map(([matiere, nombre]) => ({ matiere, nombre, label: LIBELLE_MATIERE[matiere] ?? matiere }))
    .sort((a, b) => rangMatiere(a.matiere) - rangMatiere(b.matiere) || a.label.localeCompare(b.label));
}

// ─── LA CHIP COMPOSITE ─────────────────────────────────────────────────────
// « Mathématiques » PUIS « M'entraîner » est le geste le plus naturel qui soit,
// plus que chacun séparément. Mais le vecteur d'entrée n'a qu'UN champ `chip`,
// et il n'en aura pas un deuxième : c'est une règle, pas une limite technique.
//
// D'où la chip composite — une seule chaîne, « Mathématiques · M'entraîner »,
// que le moteur découpe à la lecture. Le vecteur reste :
//   { quiEsTu, question, chip }
const SEP = " · ";

export function composerChip(matiere: string | null, intention: string | null): string | null {
  return [matiere, intention].filter(Boolean).join(SEP) || null;
}

export function partiesDeLaChip(chip: string | null): string[] {
  return chip ? chip.split(SEP).filter(Boolean) : [];
}

/** Retrouve la matière derrière une chip, même composite. */
export function matiereDeLaChip(
  profil: ProfilId,
  chip: string,
  classe?: ProfilId | null,
): Matiere | null {
  const dispo = matieresDisponibles(profil, classe);
  for (const partie of partiesDeLaChip(chip)) {
    const trouve = dispo.find((m) => m.label === partie);
    if (trouve) return trouve.matiere;
  }
  return null;
}
