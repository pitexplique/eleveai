// lib/matrice/moteur.ts
//
// Le moteur. Déterministe, sans aucun appel d'API : la même phrase donne
// toujours le même résultat, et on peut expliquer pourquoi.
//
//   [ qui es-tu · question · chip ]  ×  [ ressources validées ]  =  2 ou 3 ressources
//
// Trois étages, dans cet ordre :
//   1. le PROFIL filtre dur (une ressource de Terminale ne sort jamais en CP) ;
//   2. l'INTENTION vient de la chip si elle est cliquée, sinon de la façon de dire ;
//   3. la NOTION vient des mots, avec les alias et une tolérance aux fautes.
//
// On ne renvoie jamais plus de trois ressources : au-delà, on a recréé le
// catalogue qu'on voulait enterrer.

import { notionCoach, urlCoachCiblee } from "./coach";
import { MARQUEURS_INTENTION, NOTIONS } from "./lexique";
import { getProfil, chipsPour } from "./profils";
import { RESSOURCES, STATUTS_PUBLIABLES } from "./ressources";
import type {
  Intention,
  LectureDemande,
  Recommandation,
  ResultatMatrice,
  RessourceEleveAI,
  VecteurEntree,
} from "./types";

const NB_MAX = 3;

/** Minuscules, accents retirés, ponctuation en espaces. */
export function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9' ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Distance de Levenshtein, bornée : au-delà de `max` on abandonne. */
function distance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let precedente = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const courante = [i];
    let meilleure = i;
    for (let j = 1; j <= b.length; j++) {
      const cout = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min(courante[j - 1] + 1, precedente[j] + 1, precedente[j - 1] + cout);
      courante.push(v);
      if (v < meilleure) meilleure = v;
    }
    if (meilleure > max) return max + 1;
    precedente = courante;
  }
  return precedente[b.length];
}

/**
 * Tolérance aux fautes, proportionnée à la longueur : « fracsion » trouve
 * « fraction », mais « pain » ne trouve pas « bain ». En dessous de 5 lettres,
 * aucune tolérance — sinon tous les petits mots se ressemblent.
 */
function motProche(mot: string, cible: string): boolean {
  if (mot === cible) return true;
  if (cible.length < 5) return false;
  const marge = cible.length >= 9 ? 2 : 1;
  return distance(mot, cible, marge) <= marge;
}

/**
 * L'expression est-elle dans la phrase ? Un seul mot : on tolère la faute.
 * Plusieurs mots : chacun doit se retrouver, DANS L'ORDRE, mais pas forcément
 * collés — « j'ai rien compri aux fractions » accroche « rien compris ».
 * L'ordre évite les faux positifs (« j'ai compris, pas besoin » ≠ « pas compris »).
 */
function expressionPresente(mots: string[], expression: string): boolean {
  const cibles = normaliser(expression).split(" ").filter(Boolean);
  if (cibles.length === 0) return false;
  let depart = 0;
  for (const cible of cibles) {
    const trouve = mots.findIndex((m, i) => i >= depart && motProche(m, cible));
    if (trouve < 0) return false;
    depart = trouve + 1;
  }
  return true;
}

export function lireIntention(vecteur: VecteurEntree): Intention | null {
  // La chip a toujours raison : la personne l'a cliquée exprès.
  if (vecteur.chip) {
    const chip = chipsPour(vecteur.quiEsTu).find((c) => c.label === vecteur.chip);
    if (chip) return chip.intention;
  }
  const phrase = normaliser(vecteur.question);
  if (!phrase) return null;
  const mots = phrase.split(" ").filter(Boolean);
  for (const bloc of MARQUEURS_INTENTION) {
    for (const marqueur of bloc.marqueurs) {
      if (expressionPresente(mots, marqueur)) return bloc.intention;
    }
  }
  return null;
}

export function lireNotion(question: string) {
  const phrase = normaliser(question);
  if (!phrase) return null;
  const mots = phrase.split(" ").filter(Boolean);
  for (const notion of NOTIONS) {
    for (const alias of notion.alias) {
      if (expressionPresente(mots, alias)) return notion;
    }
  }
  return null;
}

/** Mots « pleins » qu'aucune notion n'a reconnus — le carburant du chantier. */
const MOTS_VIDES = new Set([
  "je", "j", "tu", "il", "elle", "on", "nous", "vous", "ils", "me", "ma", "mon", "mes",
  "le", "la", "les", "un", "une", "des", "du", "de", "d", "au", "aux", "et", "ou", "a",
  "pas", "plus", "en", "sur", "pour", "avec", "dans", "que", "qui", "quoi", "est", "sont",
  "veux", "veut", "voudrais", "aimerais", "faire", "fait", "sais", "suis", "c", "ce", "ca",
  "mais", "donc", "car", "si", "y", "n", "l", "s", "t", "m", "comme", "tres", "bien",
]);

function motsInconnus(question: string, notionTrouvee: boolean): string[] {
  if (notionTrouvee) return [];
  return normaliser(question)
    .split(" ")
    .filter((m) => m.length >= 4 && !MOTS_VIDES.has(m))
    .slice(0, 6);
}

const LIBELLE_INTENTION: Record<Intention, string> = {
  comprendre: "comprendre",
  entrainer: "s'entraîner",
  preparer: "préparer une échéance",
  corriger: "corriger une erreur",
  decouvrir: "découvrir",
  rituel: "faire court",
  suivre: "suivre une progression",
  enseigner: "enseigner",
  humain: "trouver quelqu'un",
};

export function libelleIntention(i: Intention): string {
  return LIBELLE_INTENTION[i];
}

function raisonner(
  r: RessourceEleveAI,
  rangNiveau: number,
  notionOk: boolean,
  intentionOk: boolean,
  intention: Intention | null,
  eleve: boolean,
): string {
  const bouts: string[] = [];
  if (notionOk) bouts.push("sur la notion demandée");
  if (intentionOk && intention) bouts.push(`pour ${LIBELLE_INTENTION[intention]}`);
  // On ne dit « à ton niveau » qu'à un élève : un parent n'a pas de niveau.
  if (eleve && rangNiveau === 0) bouts.push("à ton niveau");
  else if (eleve && rangNiveau > 0) bouts.push("au niveau juste en dessous");
  if (r.testeeAvec) bouts.push("déjà utilisée en classe");
  return bouts.length ? bouts.join(", ") : "disponible pour ce profil";
}

export function chercher(vecteur: VecteurEntree): ResultatMatrice {
  const profil = getProfil(vecteur.quiEsTu);
  const intention = lireIntention(vecteur);
  const notion = lireNotion(vecteur.question);

  const lecture: LectureDemande = {
    profil: profil.id,
    intention,
    notionId: notion?.id ?? null,
    notionLabel: notion?.label ?? null,
    motsInconnus: motsInconnus(vecteur.question, Boolean(notion)),
  };

  const candidates: Recommandation[] = [];

  for (const r of RESSOURCES) {
    // ── 1. Le statut. Rien d'autre ne compte tant que ce n'est pas relu.
    if (!STATUTS_PUBLIABLES.includes(r.statut)) continue;

    // ── 2. Le profil, filtre dur.
    const rangNiveau = profil.niveaux.findIndex((n) => r.niveaux.includes(n));
    const tousNiveaux = r.niveaux.includes("*");
    if (rangNiveau < 0 && !tousNiveaux) continue;
    let score = rangNiveau === 0 ? 6 : rangNiveau > 0 ? 3 : 1;

    // ── 3. La matière. Une question de conjugaison ne doit pas faire sortir le
    // coach maths, même s'il est « toutes notions » : générique ne veut pas
    // dire toutes matières.
    if (notion && r.matiere && r.matiere !== "transversal" && r.matiere !== notion.matiere) {
      continue;
    }

    // ── 4. La notion. Si on en a lu une, on écarte ce qui parle d'autre chose.
    const generique = r.notions.includes("*");
    const notionOk = Boolean(notion && r.notions.includes(notion.id));
    if (notion && !notionOk && !generique) continue;
    if (notionOk) score += 5;
    else if (notion && generique) score += 1;

    // ── 4. L'intention. Elle départage, elle n'exclut pas.
    const intentionOk = Boolean(intention && r.intentions.includes(intention));
    if (intentionOk) score += 4;

    // ── 5. Ce qui a déjà servi à de vrais élèves passe devant.
    if (r.statut === "testee_eleves") score += 1;

    // Le coach s'ouvre sur la classe de la personne plutôt que sur sa page
    // générale. Le bonus, lui, ne tombe que si la notion demandée existe
    // vraiment à ce niveau — sinon on avantagerait le coach pour rien.
    const url = r.accepteNotion
      ? urlCoachCiblee(profil.id, notion?.id ?? null, r.accepteNotion)
      : null;
    const viseNotion = r.accepteNotion
      ? Boolean(notionCoach(profil.id, notion?.id ?? null, r.accepteNotion))
      : false;
    if (viseNotion) score += 2;

    candidates.push({
      ressource: r,
      score,
      raison: raisonner(r, rangNiveau, notionOk, intentionOk, intention, profil.groupe === "eleve"),
      url: url ?? r.url,
      ciblee: viseNotion,
    });
  }

  // À score égal, on garde l'ORDRE DU FICHIER ressources.ts : c'est l'ordre
  // dans lequel un prof les a rangées, pas l'alphabet.
  const rang = new Map(RESSOURCES.map((r, i) => [r.id, i]));
  candidates.sort(
    (a, b) => b.score - a.score || (rang.get(a.ressource.id) ?? 0) - (rang.get(b.ressource.id) ?? 0),
  );

  // Sans notion NI intention, la personne n'a rien dit d'exploitable : on ne
  // devine pas, on montre les portes de son niveau (les mieux placées).
  const seuil = notion || intention ? 8 : 6;
  const retenues = candidates.filter((c) => c.score >= seuil).slice(0, NB_MAX);

  return { lecture, recommandations: retenues };
}
