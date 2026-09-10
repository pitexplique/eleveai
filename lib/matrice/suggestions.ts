// lib/matrice/suggestions.ts
//
// ⭐ LA RECHERCHE QUI PROPOSE PENDANT QU'ON TAPE (09/09/2026).
//
// Frédéric, rapportant sa fille devant l'accueil : « je voulais réviser les
// pourcentages, je ne savais pas où aller. » Elle n'a rien tapé — le champ dit
// « Écris ta question ou explique ce qui coince… », c'est-à-dire « décris ton
// problème », et elle n'avait pas de problème à décrire : elle avait un
// CHAPITRE à réviser. Le moteur, lui, répond très bien à « pourcentage » ;
// encore fallait-il deviner qu'on pouvait le lui demander.
//
// La référence est explicite (Frédéric, capture à l'appui) : chez IXL, trois
// lettres suffisent — « pou » ouvre une liste où chaque ligne porte le nom de
// la compétence ET son niveau, et un clic ouvre l'exercice. Rien à rédiger,
// rien à valider, aucun aller-retour.
//
// ⭐ CE QUE ÇA NE COÛTE PAS, ET C'EST CE QUI REND LA CHOSE POSSIBLE :
// `notions.generated.ts` (126 Ko, 799 notions) est DÉJÀ dans le paquet du
// navigateur — `moteur.ts` l'importe par `notionsClasse.ts`, et le moteur vit
// dans un composant client. La liste ci-dessous se construit donc sur des
// données déjà téléchargées : zéro requête, zéro octet de plus au chargement.
// C'est la règle posée par la refonte du 06/08 (« zéro requête, zéro donnée
// distante ») — on ne la casse pas pour ajouter une recherche.
//
// ⛔ CE FICHIER NE DEVINE RIEN. Il ne cherche que dans les libellés RÉELS du
// programme. Une notion absente du programme ne sera jamais suggérée, et une
// notion suggérée mène toujours à une porte ouverte — l'inverse exact du piège
// documenté pour la matrice d'entrée, où un mot du lexique pointait une ligne
// de `coach.ts` qui n'existait pas.

import { NOTIONS_COACH, type NotionCoach } from "./notions.generated";
import { CLASSE_COACH } from "./coach";
import { MOTS_FAIBLES } from "./notionsClasse";
import { normaliser } from "./normaliser";
import { PROFILS } from "./profils";
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";
import type { ProfilId } from "./types";

export type Suggestion = {
  /** L'identifiant de notion du coach — celui qui part dans `?notion=`. */
  id: string;
  /** Le libellé du programme, affiché tel quel. */
  label: string;
  /** « Maths », « Anglais »… ce qui s'affiche à droite de la ligne. */
  matiereLabel: string;
  /** « 6e », « Seconde », « A1 », « Collège » — le niveau, à droite aussi. */
  niveauLabel: string;
  /** L'URL du coach, ouverte sur cette notion, à ce niveau. */
  url: string;
};

/**
 * ⚠️ LES CINQ MATIÈRES, ET ELLES NE SE RANGENT PAS PAREIL (Frédéric, 09/09 :
 * « il y a maths francais anglais espagnol ia »).
 *
 * Les maths et le français sont rangés par CLASSE (`6e`, `seconde`) ; l'anglais
 * et l'espagnol par niveau du CECRL (`a1`…`b2`), l'IA par palier Pix
 * (`pix-college`, `pix-lycee`). Les trois derniers n'ont donc AUCUNE classe
 * scolaire, et c'est voulu : on n'apprend pas l'anglais au rythme du collège.
 *
 * ⛔ Les écarter aurait été le choix silencieux — `chercherNotionDeClasse` les
 * ignore déjà, faute de trouver « 6e » dans leurs paquets, et personne ne
 * l'aurait vu. Mais ces trois matières sont dans la rangée de l'écran : une
 * recherche qui n'en dit rien ment sur ce que le site contient.
 *
 * ⚠️ LE NOM DE LA MATIÈRE CHANGE ENTRE LES DEUX MONDES : le knowledge dit
 * « anglais » (voir NOM_MATIERE dans generer-notions-matrice.mjs), le coach dit
 * « english-maths » (SubjectCode, lib/tutor-v4/types.ts). C'est la seule
 * traduction à faire ici, et l'oublier donnerait une URL qui répond — le coach
 * retombe en silence sur ses valeurs par défaut — mais sur la mauvaise matière.
 */
const MATIERES: Record<string, { code: string; label: string }> = {
  maths: { code: "maths", label: "Maths" },
  francais: { code: "francais", label: "Français" },
  anglais: { code: "english-maths", label: "Anglais" },
  espagnol: { code: "espagnol", label: "Espagnol" },
  // ⭐ 10/09/2026 — SIX MATIÈRES. L'économie se range par PALIER (a1…b2) comme
  // l'anglais et l'espagnol, et son code est le même des deux côtés : pas de
  // traduction à faire, contrairement à « anglais » / « english-maths ».
  economie: { code: "economie", label: "Économie" },
  ia: { code: "ia", label: "IA" },
};

/**
 * Les niveaux hors classe, avec le libellé COURT.
 *
 * ⚠️ « A1 » et non « A1 — débutant » (LABEL_NIVEAU_LANGUE, lib/programme.ts) :
 * ce libellé-ci vit dans une pastille à droite d'une ligne, sur un écran de
 * 375 px où le nom de la notion a déjà besoin de toute la place. Le tiret et le
 * mot qui suit tiennent sur une page de programme, pas ici.
 */
const NIVEAUX_HORS_CLASSE: Record<string, string> = {
  a1: "A1",
  a2: "A2",
  b1: "B1",
  b2: "B2",
  c1: "C1",
  "pix-college": "Collège",
  "pix-lycee": "Lycée",
};

type Entree = Suggestion & {
  /** Les mots forts du libellé, normalisés. C'est là-dessus qu'on cherche. */
  mots: string[];
  /** La classe de la matrice, quand il y en a une — sert au classement seul. */
  profil: ProfilId | null;
  /** L'identifiant de matière du knowledge (« anglais »), pas le SubjectCode. */
  matiere: string;
};

/**
 * L'index, construit UNE FOIS et gardé.
 *
 * ⚠️ Paresseux, et pas au chargement du module : ce fichier est importé par la
 * matrice, qui est montée sur l'accueil — la page dont on essaie justement de
 * réduire le temps jusqu'au premier contenu. Le premier caractère tapé paie les
 * ~800 itérations, personne d'autre.
 */
let index: Entree[] | null = null;

/** Les mots du libellé qui désignent vraiment la notion. Vide = introuvable. */
function motsForts(label: string): string[] {
  // Les mêmes mots faibles que `chercherNotionDeClasse`, et pour la même
  // raison : un libellé du BO commence par un verbe d'action pédagogique
  // (« Comprendre l'aire et ses unités »), et ce verbe dit ce qu'on doit savoir
  // FAIRE, pas de quoi il s'agit. Laisser « comprendre » ouvrir la liste, c'est
  // proposer l'aire à qui tape « comprendre ».
  const bruts = normaliser(label).split(" ");

  /**
   * ⛔ L'ÉLISION MANGEAIT LE MOT (mesuré le 10/09/2026, en branchant l'économie).
   *
   * `normaliser` GARDE l'apostrophe : « L'impôt : qui paie quoi » donne le
   * jeton « l'impot », et la comparaison se fait en `startsWith`. Taper
   * « impot » ne trouvait donc RIEN — ni « L'impôt », ni « L'entreprise », ni
   * « L'argent ». Le mot le plus évident d'une notion était le seul à ne pas
   * l'ouvrir, et en silence : la liste restait simplement vide.
   *
   * ⚠️ Ça ne concerne pas que l'économie : « L'aire d'un rectangle » avait le
   * même trou sur « aire ». On garde les DEUX formes — « l'impot » ET
   * « impot » — parce que quelqu'un peut taper l'une ou l'autre.
   *
   * ⚠️ LA QUEUE SE POSE JUSTE APRÈS SON JETON, jamais à la fin du tableau : le
   * premier mot du libellé porte un bonus de rang (voir la boucle de notation),
   * et déplacer l'ordre le donnerait au mauvais mot.
   */
  const avecElisions: string[] = [];
  for (const mot of bruts) {
    avecElisions.push(mot);
    const apostrophe = mot.indexOf("'");
    if (apostrophe > 0 && apostrophe < mot.length - 1) {
      avecElisions.push(mot.slice(apostrophe + 1));
    }
  }

  return avecElisions.filter((m) => m.length >= 4 && !MOTS_FAIBLES.has(m));
}

function construire(): Entree[] {
  const sortie: Entree[] = [];

  const ajouter = (
    matiere: string,
    classeCoach: string,
    niveauLabel: string,
    profil: ProfilId | null,
    notions: NotionCoach[],
  ) => {
    const m = MATIERES[matiere];
    if (!m) return;
    for (const n of notions) {
      const mots = motsForts(n.label);
      if (mots.length === 0) continue;
      sortie.push({
        id: n.id,
        label: n.label,
        matiere,
        matiereLabel: m.label,
        niveauLabel,
        profil,
        mots,
        url: `/tutor-v4?classe=${classeCoach}&matiere=${m.code}&notion=${n.id}&${displayParamForClasse(classeCoach)}`,
      });
    }
  };

  // ── 1. Ce qui se range par classe. PROFILS est déjà dans l'ordre de l'école
  // (CP → Terminale → Adulte) : c'est lui qui donne l'ordre des lignes à score
  // égal, et non l'alphabet, qui mettrait la 3ᵉ avant le CP.
  //
  // ⛔ ON PASSE PAR `CLASSE_COACH`, ET PAS PAR LES CLÉS DE `NOTIONS_COACH`.
  // Ce dernier porte aussi « stmg » et « premiere-spe », qu'aucune pastille de
  // la rangée ne sait allumer. Une ligne « Terminale STMG » dans la liste
  // renverrait vers un niveau introuvable partout ailleurs sur l'écran.
  for (const p of PROFILS) {
    const classeCoach = CLASSE_COACH[p.id];
    if (!classeCoach) continue;
    for (const [matiere, parClasse] of Object.entries(NOTIONS_COACH)) {
      const notions = parClasse[classeCoach];
      if (notions) ajouter(matiere, classeCoach, p.label, p.id, notions);
    }
  }

  // ── 2. Ce qui se range par niveau. Même boucle, sans classe scolaire.
  for (const [matiere, parClasse] of Object.entries(NOTIONS_COACH)) {
    for (const [niveau, notions] of Object.entries(parClasse)) {
      const label = NIVEAUX_HORS_CLASSE[niveau];
      if (label) ajouter(matiere, niveau, label, null, notions);
    }
  }

  return sortie;
}

/**
 * ⭐ TROIS LETTRES, PAS DEUX.
 *
 * IXL ouvre sa liste à trois (« pou » sur la capture), et c'est le bon seuil
 * ici aussi : à deux lettres, « de », « la », « pi » ramènent des dizaines de
 * lignes sans rapport, et une liste qui se remplit de bruit dès la deuxième
 * frappe apprend à ne plus la regarder.
 */
const MINIMUM = 3;

/** Combien de lignes au maximum. IXL en montre sept ; huit tient encore. */
const PLAFOND = 8;

/**
 * Les notions du programme qui commencent par ce qu'on est en train de taper.
 *
 * @param saisie   ce qu'il y a dans le champ, à l'instant
 * @param profil   la classe allumée dans la rangée, si elle l'est. Elle ne
 *                 FILTRE pas — elle passe devant. Un élève de 5ᵉ a le droit
 *                 d'aller réviser les pourcentages de 6ᵉ, et c'est même le
 *                 geste le plus courant en révision.
 * @param matiere  le libellé de la matière allumée (« Mathématiques »), même
 *                 règle : elle pousse en tête, elle n'exclut personne.
 */
export function suggerer(
  saisie: string,
  profil: ProfilId | null,
  matiere: string | null,
): Suggestion[] {
  const mots = normaliser(saisie)
    .split(" ")
    .filter((m) => m.length >= MINIMUM);
  if (mots.length === 0) return [];

  index ??= construire();

  // ⚠️ La rangée allume un LIBELLÉ (« Mathématiques ») quand l'index range par
  // IDENTIFIANT (« maths »). On compare donc sur le début du premier — une
  // égalité stricte ne serait jamais vraie, et le bonus ne tomberait jamais,
  // en silence. « Français » → « francais » après normalisation, « Anglais »
  // → « anglais » : les cinq passent.
  const matiereNormalisee = matiere ? normaliser(matiere) : null;

  const notes: Array<{ s: Entree; note: number; rang: number }> = [];

  for (let i = 0; i < index.length; i++) {
    const e = index[i];
    let note = 0;
    let toutTrouve = true;

    for (const q of mots) {
      let meilleur = 0;
      for (let j = 0; j < e.mots.length; j++) {
        const m = e.mots[j];
        // Le mot entier vaut mieux que son début, et le PREMIER mot du libellé
        // mieux qu'un mot enfoui : « Pourcentages » doit passer devant « Aires
        // et pourcentages » quand on tape « pour ».
        const valeur = m === q ? 3 : m.startsWith(q) ? 2 : 0;
        if (valeur > 0 && valeur + (j === 0 ? 1 : 0) > meilleur) {
          meilleur = valeur + (j === 0 ? 1 : 0);
        }
      }
      if (meilleur === 0) {
        toutTrouve = false;
        break;
      }
      note += meilleur;
    }
    // ⚠️ TOUS les mots tapés doivent être retrouvés, pas seulement un. Sans
    // cette exigence, « pourcentage 5e » ramènerait les pourcentages de TOUS
    // les niveaux — c'est-à-dire exactement ce que la seconde moitié de la
    // saisie demandait d'écarter.
    if (!toutTrouve) continue;

    // La classe allumée passe devant, et de loin : c'est la réponse qu'on
    // attend en premier. Mais les autres restent visibles en dessous, avec leur
    // niveau écrit — c'est là toute la leçon d'IXL, qui montre « CM2 » et
    // « 6e » sur deux lignes voisines et laisse choisir.
    if (profil && e.profil === profil) note += 8;
    if (matiereNormalisee && matiereNormalisee.startsWith(e.matiere)) note += 3;

    notes.push({ s: e, note, rang: i });
  }

  notes.sort((a, b) => b.note - a.note || a.rang - b.rang);
  return notes.slice(0, PLAFOND).map(({ s }) => ({
    id: s.id,
    label: s.label,
    matiereLabel: s.matiereLabel,
    niveauLabel: s.niveauLabel,
    url: s.url,
  }));
}
