// lib/photo-cours/coach.ts
//
// LES PONTS VERS CE QUI EXISTE DÉJÀ — la seule partie de cette brique qui ne
// soit pas du prompt, et celle qui a le plus de valeur.
//
// ⭐ POURQUOI ELLE COMPTE PLUS QUE LE RESTE.
// Ce que le modèle fabrique à partir d'une photo est neuf à chaque fois :
// personne ne l'a relu, rien ne le calibre, et ça ne laisse aucune trace dans
// le tableau de bord. Les banques du coach, elles, sont écrites, vérifiées,
// rangées par micro-compétence, et ce qu'un élève y fait remonte.
//
// Donc : quand la notion photographiée existe dans le coach, on n'invente pas
// d'exercices — on ouvre la bonne porte. Le modèle ne sert qu'à ce que le
// coach ne couvre pas (la SVT de Jeanne, l'histoire, la physique).
//
// ⚠️ On réutilise le lexique et les tables de la MATRICE (lib/matrice) plutôt
// que d'en refaire ici. Il y a déjà eu deux tables de notions dans ce dépôt ;
// la troisième aurait divergé avant la fin du mois.

import { lireNotion } from "@/lib/matrice/moteur";
import { CLASSE_COACH, urlCoachCiblee } from "@/lib/matrice/coach";
import type { ProfilId } from "@/lib/matrice/types";
import type { Pont } from "./types";

/**
 * Les classes que le coach connaît, et les formes sous lesquelles elles
 * arrivent — le modèle rend ce qu'il lit sur la photo (« 5e », « Cinquième »,
 * « 5ème B »), et un compte rend son propre libellé.
 *
 * ⚠️ ORDRE IMPORTANT : « ce1 » avant « ce2 » n'a pas d'incidence, mais les
 * formes longues passent avant les courtes dans chaque entrée, sans quoi
 * « seconde » ne serait jamais atteint (« 2de » ne s'y trouve pas, mais
 * « premiere » contient « 1re » nulle part — on compare des mots entiers).
 */
const NIVEAUX: { profil: ProfilId; formes: string[] }[] = [
  { profil: "cp", formes: ["cp"] },
  { profil: "ce1", formes: ["ce1"] },
  { profil: "ce2", formes: ["ce2"] },
  { profil: "cm1", formes: ["cm1"] },
  { profil: "cm2", formes: ["cm2"] },
  { profil: "6e", formes: ["6eme", "sixieme", "6e", "6"] },
  { profil: "5e", formes: ["5eme", "cinquieme", "5e", "5"] },
  { profil: "4e", formes: ["4eme", "quatrieme", "4e", "4"] },
  { profil: "3e", formes: ["3eme", "troisieme", "3e", "3"] },
  { profil: "seconde", formes: ["seconde", "2nde", "2de"] },
  { profil: "premiere", formes: ["premiere", "1ere", "1re"] },
  { profil: "terminale", formes: ["terminale", "tale", "term"] },
];

function sansAccents(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * La classe, telle que le coach l'appelle.
 *
 * ⚠️ La classe du COMPTE fait foi quand elle existe, et c'est pour ça qu'elle
 * se passe en premier : un cahier peut porter l'en-tête de l'an dernier, un
 * compte non. La photo ne sert que si le compte ne dit rien — celui d'un
 * professeur ou d'un parent n'a pas de classe.
 *
 * On compare des MOTS ENTIERS. Chercher « 3 » dans « 13/09 » ou « 5 » dans
 * « exercice 5 » ramènerait n'importe quoi.
 */
export function niveauVersProfil(
  ...candidats: (string | null | undefined)[]
): ProfilId | null {
  for (const brut of candidats) {
    if (!brut) continue;
    const mots = sansAccents(brut).split(" ").filter(Boolean);
    for (const { profil, formes } of NIVEAUX) {
      if (formes.some((f) => mots.includes(f))) return profil;
    }
  }
  return null;
}

/** La matière, quand c'est une de celles dont le coach a les notions. */
export function matiereCoach(
  ...candidats: (string | null | undefined)[]
): "maths" | "francais" | null {
  for (const brut of candidats) {
    if (!brut) continue;
    const m = sansAccents(brut);
    if (m.includes("math")) return "maths";
    if (m.includes("francais") || m.includes("lettres")) return "francais";
  }
  return null;
}

/**
 * Les ponts pour un cours photographié. Une liste vide est une réponse
 * honnête : la SVT, l'histoire et la physique ne sont pas dans le coach, et
 * proposer un lien qui ne correspond à rien serait pire que de n'en proposer
 * aucun.
 *
 * ⛔ NE JAMAIS FABRIQUER UNE URL DE COACH À LA MAIN ICI. `urlCoachCiblee`
 * connaît les deux pièges (la whitelist de `normalizeClasse`, qui retombe
 * silencieusement sur la 6e, et les identifiants de notions qui changent de
 * nom d'une classe à l'autre : « fraction » en CM2, « fraction_nombre » en 6e,
 * « fraction_rationnel » en 3e). Les contourner, c'est ouvrir la 6e à un élève
 * de Terminale sans que rien ne le signale.
 */
export function pontsPour(args: {
  texte: string;
  niveau?: string | null;
  notion?: string | null;
  matiere?: string | null;
  classeDuCompte?: string | null;
}): Pont[] {
  const profil = niveauVersProfil(args.classeDuCompte, args.niveau);
  const matiere = matiereCoach(args.matiere, args.notion, args.texte.slice(0, 200));
  if (!profil || !matiere) return [];

  const ponts: Pont[] = [];

  // On cherche la notion dans le titre annoncé PUIS dans le début du cours :
  // un « Chapitre 4 : les fractions » vaut mieux qu'une occurrence perdue en
  // bas de page.
  const notion = lireNotion(args.notion ?? "") ?? lireNotion(args.texte.slice(0, 600));

  const urlCoach = urlCoachCiblee(profil, notion?.id ?? null, matiere);
  if (urlCoach) {
    ponts.push({
      url: urlCoach,
      libelle: notion
        ? `S'entraîner sur ${notion.label.toLowerCase()}`
        : `S'entraîner dans le coach de ${matiere === "maths" ? "maths" : "français"}`,
      detail: notion
        ? "Le coach, ouvert sur cette notion : une question à la fois, corrigée."
        : "Le coach de la classe : une question à la fois, corrigée.",
    });
  }

  // ⚠️ LE PARCOURS ÉVALUE TOUTE L'ANNÉE, PAS LE CHAPITRE. Frédéric, 08/08 :
  // « plus tard on pourra sélectionner le chapitre ». Tant que ce n'est pas
  // fait, le libellé DOIT le dire — un élève qui lance ça en croyant réviser
  // sa page de fractions tombe sur douze chapitres, et c'est le genre de
  // déception qui coûte un utilisateur.
  //
  // ⚠️ Maths seulement : /parcours est le seul à lire `?classe=`. Les autres
  // parcours ouvriraient sur la 6e sans le dire.
  //
  // ⚠️ CLASSE_COACH et pas `profil` : le parcours nomme ses classes comme le
  // coach — « premiere-spe », « terminale-spe ». Passer « premiere » tout court
  // serait ignoré par la validation, et l'élève retomberait sur la 6e.
  const classeParcours = matiere === "maths" ? CLASSE_COACH[profil] : null;
  if (classeParcours) {
    ponts.push({
      url: `/parcours?classe=${classeParcours}`,
      libelle: "Se tester sur toute l'année",
      detail: "Une évaluation notée qui remonte dans le tableau de bord.",
    });
  }

  return ponts;
}
