// lib/photo-cours/programme.ts
//
// « CONFORME AU BO » — mais pour de vrai.
//
// ⭐ Frédéric, 13/08 : « on pourrait même rajouter dans l'envoi conforme au BO,
// etc. non ? ». Oui, et c'est là qu'il faut se méfier de soi-même : ÉCRIRE
// « respecte le Bulletin Officiel » dans un prompt ne rend rien conforme. Le
// modèle ne connaît pas le BO ligne à ligne — et surtout pas le nouveau
// programme de cycle 4 du 5 mars 2026, postérieur à tout ce qu'il a pu lire.
// Il produirait une conformité déclarative : le mot « BO » dans le prompt, et
// des exercices de 3ᵉ sur un cours de 5ᵉ.
//
// ⭐ CE QUI REND VRAIMENT CONFORME, c'est qu'EleveAI a déjà le programme
// encodé, classe par classe, dans lib/tutor-v4/knowledge — des mois de travail
// aligné sur les attendus, relu, vérifié. On ne demande donc pas au modèle de
// se souvenir du BO : on lui DONNE la liste des notions de la classe, et on
// lui interdit d'en sortir.
//
// ⚠️ MATHS SEULEMENT POUR L'INSTANT. `getClasseNotions` ne couvre que les
// maths. Pour les autres matières, on retombe sur une consigne générique — et
// on ne prétend pas mieux. La SVT de Jeanne n'a pas de programme encodé ici,
// et le dire vaut mieux que de le laisser croire.

import { getClasseNotions } from "@/lib/parcours/getClasseNotions";
import type { ParcoursClasse } from "@/lib/parcours/types";
import { niveauVersProfil, matiereCoach } from "./coach";
import { CLASSE_COACH } from "@/lib/matrice/coach";

/** Les classes que le parcours (donc le programme encodé) connaît. */
const CLASSES_CONNUES = new Set<string>([
  "cp", "ce1", "ce2", "cm1", "cm2",
  "6e", "5e", "4e", "3e",
  "seconde", "premiere-spe", "terminale-spe",
]);

/**
 * Le bloc de contexte « programme » à glisser dans la production.
 * Vide quand on ne sait rien — mieux vaut se taire que d'affirmer.
 */
export function contexteProgramme(args: {
  classe?: string | null;
  matiere?: string | null;
}): string {
  const profil = niveauVersProfil(args.classe);
  const matiere = matiereCoach(args.matiere);

  // Hors maths, ou classe inconnue : une consigne générale, sans promesse.
  if (!profil || matiere !== "maths") {
    return [
      "PROGRAMME : tu respectes les programmes français en vigueur (Eduscol,",
      "Bulletin Officiel) pour la classe indiquée. Tu restes au niveau de cette",
      "classe : ni au-dessus (des notions pas encore vues), ni en dessous.",
    ].join("\n");
  }

  const classeParcours = CLASSE_COACH[profil];
  if (!classeParcours || !CLASSES_CONNUES.has(classeParcours)) return "";

  let notions: { label: string }[] = [];
  try {
    notions = getClasseNotions(classeParcours as ParcoursClasse);
  } catch {
    // Une classe qui n'a pas de banque ne doit pas faire échouer la production.
    return "";
  }
  if (notions.length === 0) return "";

  // ⚠️ Les LABELS seulement, pas les identifiants ni les micro-compétences :
  // c'est une carte du niveau, pas un sommaire à recopier. Une liste trop
  // détaillée noierait la consigne et coûterait des centaines de tokens à
  // chaque appel.
  const liste = notions
    .map((n) => n.label)
    .filter(Boolean)
    .slice(0, 40)
    .join(" · ");

  return [
    "PROGRAMME DE LA CLASSE — c'est la liste réelle des notions au programme",
    "de ce niveau, telle qu'EleveAI l'a établie à partir des attendus officiels :",
    liste,
    "",
    "⛔ Tu ne sors PAS de ce périmètre. Si le cours photographié touche à une",
    "notion qui n'y figure pas, tu traites ce qui est écrit sans aller plus loin.",
    "Tu n'utilises jamais un outil des classes supérieures pour « faire mieux ».",
  ].join("\n");
}
