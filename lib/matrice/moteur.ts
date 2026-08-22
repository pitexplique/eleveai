// lib/matrice/moteur.ts
//
// Le moteur. Déterministe, sans aucun appel d'API : la même phrase donne
// toujours le même résultat, et on peut expliquer pourquoi.
//
//   [ qui es-tu · question · chip ]  ×  [ ressources validées ]  =  2 à 6 ressources
//
// Trois étages, dans cet ordre :
//   1. le PROFIL filtre dur (une ressource de Terminale ne sort jamais en CP) ;
//   2. l'INTENTION vient de la chip si elle est cliquée, sinon de la façon de dire ;
//   3. la NOTION vient des mots, avec les alias et une tolérance aux fautes.
//
// On ne renvoie jamais plus de SIX ressources : au-delà, on a recréé le
// catalogue qu'on voulait enterrer.

import { intentionDeLaChip, matiereDeLaChip } from "./chips";
import { normaliser } from "./normaliser";
import { chercherNotionDeClasse } from "./notionsClasse";
import { CLASSE_COACH, notionCoach, urlCoachCiblee } from "./coach";
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";
import { MARQUEURS_INTENTION, NOTIONS } from "./lexique";
import { getProfil, chipsPour, rangNiveaux } from "./profils";
import { PORTES_ECRITES, RESSOURCES, STATUTS_PUBLIABLES } from "./ressources";
import { ressourcesDeSaison } from "./saison";
export { normaliser };

import type {
  Intention,
  LectureDemande,
  Recommandation,
  ResultatMatrice,
  VecteurEntree,
} from "./types";

/**
 * ⭐ SIX PLACES, ET C'ÉTAIT TROIS (22/08/2026).
 *
 * Frédéric : « 3 c'est trop peu […] on passe de 3 à 4, 5 ou 6 suivant le
 * besoin, donc max à 6 ».
 *
 * ⚠️ SIX EST UN PLAFOND, PAS UN QUOTA — et c'est toute la nuance de « suivant
 * le besoin ». Rien dans le calcul ci-dessous ne cherche à remplir les six
 * cases : le `seuil` reste le même, la règle « une seule par famille » reste la
 * même. Un CP continuera donc de sortir deux cartes, parce qu'il n'a que deux
 * ressources à son niveau — et servir une ressource à peine pertinente pour
 * tenir une case serait exactement ce que le trou « * » des portes écrites
 * refuse déjà de faire.
 *
 * Ce que trois coûtait, en revanche, était réel : sur un profil bien fourni —
 * une 4ᵉ, un enseignant — le moteur avait dix candidats au-dessus du seuil et
 * en jetait sept. La troisième carte était souvent la dernière chose que le
 * visiteur voyait de tout le site.
 *
 * ⛔ NE PAS MONTER PLUS HAUT. Le jour où l'écran d'accueil affiche dix
 * ressources, il a rouvert le catalogue que la refonte du 06/08 a enterré, et
 * la promesse « on te propose CE qui correspond » redevient « débrouille-toi ».
 */
const NB_MAX = 6;


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
  // Les chips viennent des ressources réelles (chips.ts) ; on garde la table
  // historique de profils.ts en repli, pour ne pas casser un libellé mémorisé
  // dans un historique ou partagé dans un lien.
  if (vecteur.chip) {
    const parRessources = intentionDeLaChip(vecteur.quiEsTu, vecteur.chip, vecteur.classe);
    if (parRessources) return parRessources;
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
  tester: "se tester",
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
  rangNiveau: number,
  notionOk: boolean,
  intentionOk: boolean,
  intention: Intention | null,
  eleve: boolean,
  /**
   * La classe dite par un adulte, quand c'est ELLE qui a fait entrer la
   * ressource. `null` chez un élève (il a déjà « à ton niveau ») et chez un
   * adulte dont c'est le profil qui l'a fait entrer — dire « au niveau 5e »
   * de l'espace parents serait faux.
   */
  libelleClasse: string | null,
): string {
  const bouts: string[] = [];
  if (notionOk) bouts.push("sur la notion demandée");
  if (intentionOk && intention) bouts.push(`pour ${LIBELLE_INTENTION[intention]}`);

  // ⛔ « À TON NIVEAU » NE SORT PLUS QUAND LE NIVEAU EST LE BON (20/08/2026).
  //
  // Cette phrase s'écrivait sous LES TROIS cartes à la fois — et le niveau est
  // un filtre DUR : aucune ressource ne remonte s'il ne colle pas. Une mention
  // vraie sur tout ce qu'on affiche ne distingue rien ; elle occupe la seule
  // ligne où une carte avait quelque chose à dire pour elle-même. L'en-tête la
  // porte déjà, une fois : « Par où tu peux commencer en Terminale », ou
  // « Ce que j'ai compris : Terminale · … ».
  //
  // ⚠️ « AU NIVEAU JUSTE EN DESSOUS », ELLE, RESTE. Celle-là n'est PAS dans
  // l'en-tête et n'est pas vraie de toutes les cartes : c'est un avertissement
  // — la ressource ne vient pas de l'année en cours. La retirer avec l'autre
  // reviendrait à faire passer un contenu de 4ᵉ pour un contenu de 3ᵉ.
  if (rangNiveau > 0 && (eleve || libelleClasse)) bouts.push("au niveau juste en dessous");

  // ⛔ ET « DÉJÀ UTILISÉE EN CLASSE » NON PLUS : c'est mot pour mot le badge
  // « testée en classe » posé trois centimètres au-dessus, sur la MÊME carte.
  // Deux fois la même preuve ne fait pas une preuve plus solide — elle fait
  // douter qu'on parle de la même chose.

  // ⚠️ CHAÎNE VIDE ET NON « disponible pour ce profil ». Ce repli ne disait rien
  // que la carte ne dise déjà (elle est affichée, donc elle est disponible) ;
  // la carte n'affiche simplement pas la ligne quand il n'y a rien à y mettre.
  return bouts.join(", ");
}

export function chercher(vecteur: VecteurEntree): ResultatMatrice {
  const profil = getProfil(vecteur.quiEsTu);
  const intention = lireIntention(vecteur);

  // ⭐ LE NIVEAU DONT ON PARLE (16/08/2026) — la classe de l'élève, ou celle
  // qu'un adulte vient de dire. Tout ce qui dépend d'une CLASSE et non d'un
  // rôle passe par lui : le programme, le calendrier, la porte du coach.
  //
  // Sans lui, un parent était traité comme s'il n'avait pas de classe du tout
  // (`CLASSE_COACH.parent` vaut `null`) : « ma fille bloque sur les fractions »
  // ne reconnaissait aucune notion, n'ouvrait le coach sur rien, et rendait la
  // même réponse que « bonjour ».
  const classeDite = vecteur.classe ?? null;
  const niveau = classeDite ?? profil.id;
  const profilClasse = classeDite ? getProfil(classeDite) : null;

  // LE PROGRAMME DE SA CLASSE D'ABORD. Ce sont les libellés officiels des 431
  // notions du knowledge, comparés au mot près : quand ça accroche, c'est sûr.
  // Le lexique passe ensuite — il porte les mots des élèves (« les x »,
  // « fracsion ») et tolère les fautes, mais cette souplesse a un prix :
  // « racine carrée » tombait sur « la géométrie », par l'alias « carré ».
  const notionProgramme = chercherNotionDeClasse(niveau, vecteur.question);
  const notion = notionProgramme ? null : lireNotion(vecteur.question);

  // La chip peut porter une MATIÈRE au lieu d'une intention — c'est toujours
  // le même et unique champ `chip` du vecteur, jamais un quatrième. Cliquer
  // « Mathématiques » filtre dur : on ne propose pas de dictée à quelqu'un qui
  // vient de dire qu'il veut des maths.
  const matiereChip = vecteur.chip
    ? matiereDeLaChip(vecteur.quiEsTu, vecteur.chip, classeDite)
    : null;
  // ⚠️ « transversal » n'est PAS une matière voulue : c'est l'absence de
  // matière. Une notion comme « les vidéos » traverse tout — la prendre pour
  // une matière écartait le coach, la chaîne et le reste, et « je veux voir
  // une vidéo » renvoyait les défis du jour.
  const matiereNotion = notion?.matiere === "transversal" ? null : notion?.matiere;
  const matiereVoulue = matiereChip ?? matiereNotion ?? notionProgramme?.matiere ?? null;

  const lecture: LectureDemande = {
    profil: profil.id,
    intention,
    notionId: notion?.id ?? notionProgramme?.id ?? null,
    // Le libellé du programme s'affiche tel qu'il est écrit dans le knowledge :
    // c'est le mot que l'élève a sous les yeux dans son cours.
    notionLabel: notion?.label ?? notionProgramme?.label ?? null,
    // ⭐ `matiereVoulue` ET NON `matiereChip` (17/08/2026). La lecture ne
    // rendait que la matière CLIQUÉE, alors que trois lignes plus haut le
    // moteur en connaissait une quatrième fois sur cinq : celle de la notion,
    // celle du programme de la classe. Il s'en servait pour choisir les
    // ressources, puis la jetait en sortant.
    //
    // Le seul lecteur de ce champ est le RÉCENT de la colonne de gauche, et ça
    // se voyait à l'œil nu : « fraction » en CM1, « automatisme » en Première,
    // « dictee » en 5ᵉ — le moteur avait reconnu les trois notions, et les
    // trois lignes se rangeaient dans « Autres ». La barre de filtres ne
    // proposait qu'une matière, celle de l'unique demande faite en cliquant un
    // bouton. Le tri existait, il n'avait rien à trier.
    matiere: matiereVoulue,
    motsInconnus: motsInconnus(
      vecteur.question,
      Boolean(notion) || Boolean(matiereChip) || Boolean(notionProgramme),
    ),
  };

  const candidates: Recommandation[] = [];

  // Personne n'a rien dit d'exploitable : on montrera les portes du niveau.
  // C'est là que les ressources « sur demande » doivent se taire.
  const repliSurLeNiveau = !notion && !intention && !matiereChip && !notionProgramme;

  // ⭐ CE QUI TOMBE MAINTENANT (07/08) — les évaluations nationales de 6ᵉ et de
  // 4ᵉ, en août et en septembre. Voir lib/matrice/saison.ts.
  //
  // ⚠️ LE BONUS NE S'APPLIQUE PAS À TOUTES LES DEMANDES, et c'est la moitié de
  // la règle : un 6ᵉ qui écrit « je comprends rien aux fractions » un 3
  // septembre doit recevoir le coach. Sa demande est précise, on ne la recouvre
  // pas avec le calendrier. Le rendez-vous ne passe devant que si personne n'a
  // rien demandé de précis, ou si l'intention lue est justement « préparer une
  // échéance » — auquel cas c'est LA bonne échéance.
  const saison =
    repliSurLeNiveau || intention === "preparer"
      ? // Le calendrier suit la CLASSE, pas le rôle : l'évaluation nationale de
        // 6ᵉ tombe à la rentrée pour l'élève comme pour le parent qui la lui
        // prépare.
        ressourcesDeSaison(niveau)
      : new Set<string>();

  for (const r of RESSOURCES) {
    // ── 1. Le statut. Rien d'autre ne compte tant que ce n'est pas relu.
    if (!STATUTS_PUBLIABLES.includes(r.statut)) continue;

    // ── 1 bis. Les ressources qui ne s'invitent pas. Une machine est
    // excellente quand on veut découvrir ; en première réponse à quelqu'un qui
    // vient seulement de dire son niveau, elle est à côté.
    if (r.surDemande && repliSurLeNiveau) continue;

    // ── 2. Le profil, filtre dur. DEUX PORTES D'ENTRÉE depuis le 16/08 : le
    // rôle, et la classe dont on parle. Une ressource passe par la meilleure
    // des deux — un parent qui a dit « 5ᵉ » est au niveau d'une ressource de
    // 5ᵉ, exactement comme l'élève qu'il accompagne.
    //
    // ⚠️ ON GARDE LES DEUX RANGS SÉPARÉS, on ne les fond pas. Le rang sert au
    // score, mais il sert AUSSI à écrire la raison affichée : sans savoir par
    // laquelle des deux portes la ressource est entrée, « L'espace parents » se
    // serait annoncé « au niveau 5e ».
    const rangProfil = rangNiveaux(profil.id, r.niveaux);
    const rangClasse = rangNiveaux(classeDite, r.niveaux);
    const rangNiveau =
      rangProfil < 0 ? rangClasse : rangClasse < 0 ? rangProfil : Math.min(rangProfil, rangClasse);
    const parLaClasse = rangClasse >= 0 && (rangProfil < 0 || rangClasse < rangProfil);
    const tousNiveaux = r.niveaux.includes("*");
    if (rangNiveau < 0 && !tousNiveaux) continue;
    let score = rangNiveau === 0 ? 6 : rangNiveau > 0 ? 3 : 1;

    // ── 3. La matière. Une question de conjugaison ne doit pas faire sortir le
    // coach maths, même s'il est « toutes notions » : générique ne veut pas
    // dire toutes matières. Une chip de matière cliquée est plus stricte
    // encore — elle écarte aussi ce qui n'a pas de matière du tout.
    if (matiereVoulue && r.matiere && r.matiere !== "transversal" && r.matiere !== matiereVoulue) {
      continue;
    }
    if (matiereChip && !r.matiere) continue;
    // Le joker `transversal` dit « toutes les matières », et c'est presque
    // toujours faux : une ressource peut être transversale SAUF une. Sans
    // cette exception, la dictée du jour — qui n'a pas un mot d'informatique —
    // sortait en TÊTE sur la chip « IA », devant le coach IA.
    // ⭐ LE SPÉCIALISTE PASSE DEVANT LE GÉNÉRALISTE (Frédéric, 16/08 : « coach
    // toujours en 1er »). `transversal` est un joker, pas une compétence : une
    // ressource dont la matière est EXACTEMENT celle demandée doit devancer
    // celle qui l'attrape par défaut. Sans ce bonus, la dictée du jour passait
    // devant le coach d'anglais et celui d'espagnol sur leur propre chip —
    // elle gagnait d'un point, celui de « déjà utilisée en classe ».
    if (matiereVoulue && r.matiere === matiereVoulue) score += 2;

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

    // ── 5 bis. La saison. +6, c'est-à-dire autant que d'être pile au bon
    // niveau : en septembre, l'évaluation nationale d'un 6ᵉ passe devant le
    // coach et les cahiers. C'est beaucoup, et c'est voulu — elle a une date,
    // eux non.
    const deSaison = saison.has(r.id);
    if (deSaison) score += 6;

    // ── 6. Une ressource qui ne s'invite jamais passe DEVANT quand on
    // l'appelle VRAIMENT : « découvrir », ou sa notion nommée. Pas dès qu'une
    // notion quelconque traîne dans la phrase — « fractions » en Seconde
    // faisait remonter les machines, que personne n'avait demandées.
    if (r.surDemande && (notionOk || intention === "decouvrir")) score += 2;

    // Le coach s'ouvre sur la classe de la personne plutôt que sur sa page
    // générale. Le bonus, lui, ne tombe que si la notion demandée existe
    // vraiment à ce niveau — sinon on avantagerait le coach pour rien.
    // Deux chemins vers la même porte : la table du lexique (les mots des
    // élèves) ou le programme de la classe (les libellés officiels). Le second
    // donne DIRECTEMENT l'identifiant du coach — pas de traduction à faire.
    const notionDuCoach =
      r.accepteNotion && notionProgramme?.matiere === r.accepteNotion
        ? notionProgramme.id
        : r.accepteNotion
          ? notionCoach(niveau, notion?.id ?? null, r.accepteNotion)
          : null;

    const classeCoach = CLASSE_COACH[niveau];
    const url =
      r.accepteNotion && notionDuCoach && classeCoach
        ? `/tutor-v4?classe=${classeCoach}&matiere=${r.accepteNotion}&notion=${notionDuCoach}&${displayParamForClasse(classeCoach)}`
        : r.accepteNotion
          ? urlCoachCiblee(profil.id, notion?.id ?? null, r.accepteNotion)
          : null;

    const viseNotion = Boolean(notionDuCoach);
    if (viseNotion) score += 2;

    candidates.push({
      ressource: r,
      score,
      // Quand c'est le calendrier qui la fait remonter, on le DIT. Sinon la
      // raison affichée ne colle pas à la place occupée, et c'est exactement le
      // genre de décalage qui fait passer une recommandation pour un hasard.
      //
      // ⚠️ ON ASSEMBLE, ON NE CONCATÈNE PLUS (20/08/2026). Depuis que
      // `raisonner` peut rendre une chaîne vide — le niveau juste ne s'écrit
      // plus, l'en-tête le porte — un gabarit « c'est la saison — ${…} »
      // laissait un tiret cadratin suspendu dans le vide sous la carte.
      raison: [deSaison ? "c'est la saison" : null, raisonner(
        rangNiveau,
        notionOk,
        intentionOk,
        intention,
        profil.groupe === "eleve",
        parLaClasse ? (profilClasse?.label ?? null) : null,
      ) || null]
        .filter(Boolean)
        .join(" — "),
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

  // UNE SEULE PAR FAMILLE. Sans ça, huit machines à égalité de score
  // occupaient les trois places : le lagon, le cyclone et le volcan, quand une
  // machine + les maths en vrai + la chaîne disent bien plus. On garde la
  // mieux classée de chaque famille, les autres attendent leur tour.
  const famillesVues = new Set<string>();
  const retenues: Recommandation[] = [];

  // ⭐ LES PORTES ÉCRITES PASSENT D'ABORD — et seulement quand la personne n'a
  // rien demandé. Voir PORTES_ECRITES dans ressources.ts : sur le premier
  // écran, « les mieux classées » n'est pas la même chose que « les bonnes ».
  // Dès qu'une notion ou une intention est lue, le score reprend la main : il
  // répond alors à une demande, et il le fait mieux qu'une liste figée.
  //
  // ⚠️ Elles ne sont pas soumises au seuil — elles sont écrites, c'est leur
  // raison d'être. Mais elles sont prises DANS `candidates`, donc elles ont
  // passé tous les filtres durs (profil, statut, matière). Un id qui n'y est
  // pas est sauté sans bruit.
  // ⚠️ `repliSurLeNiveau` ET NON `!notion && !intention` (16/08/2026). La
  // condition oubliait la MATIÈRE, et c'est ce qui a fait échouer la demande de
  // Frédéric — « si un parent coche IA, tu affiches coach IA et parcours IA
  // dans les encarts ». Chez lui, les portes écrites sont des identifiants
  // (espace-parents, coach-maths) : la matière « IA » les écarte tous les
  // deux, sauf « photographier un cours », qui est transversal et survit à
  // tous les filtres. Résultat, la première carte d'une demande d'IA était un
  // appareil photo.
  //
  // Le fichier disait déjà la règle, il ne l'appliquait qu'à moitié : les
  // portes valent quand personne n'a rien demandé, et cliquer une matière EST
  // une demande. `repliSurLeNiveau` est justement le nom que porte cet
  // état-là — notion, intention ET matière, toutes muettes.
  //
  // ⚠️ Conséquence à connaître : sur une matière cliquée, la 3ᵉ carte n'est
  // plus « Photographier un cours » d'office ; elle revient au score. La photo
  // garde sa place écrite sur l'écran d'accueil, là où elle avait été demandée
  // (12/08) — c'est-à-dire quand on n'a encore rien dit.
  const portes = repliSurLeNiveau ? PORTES_ECRITES[profil.id] : undefined;
  if (portes) {
    const pris = new Set<string>();
    // `candidates` est déjà trié : le PREMIER qui correspond est toujours le
    // mieux classé. C'est ce qui fait marcher « type:coach » et « * » sans
    // retrier quoi que ce soit.
    const premier = (va: (c: Recommandation) => boolean) =>
      candidates.find((c) => !pris.has(c.ressource.id) && va(c));

    for (const porte of portes) {
      const c = porte.startsWith("type:")
        ? premier((x) => x.ressource.type === porte.slice(5))
        : porte === "*"
          ? // Le trou laissé au score. Il respecte le seuil, lui : une porte
            // écrite nomme quelque chose, « * » ne nomme rien — et servir une
            // ressource à peine pertinente pour tenir une case serait pire
            // que de n'en montrer que deux.
            premier((x) => x.score >= seuil)
          : premier((x) => x.ressource.id === porte);
      if (!c) continue;
      pris.add(c.ressource.id);
      if (c.ressource.famille) famillesVues.add(c.ressource.famille);
      retenues.push(c);
      if (retenues.length >= NB_MAX) break;
    }
  }

  const dejaPrises = new Set(retenues.map((c) => c.ressource.id));
  for (const c of candidates) {
    if (retenues.length >= NB_MAX) break;
    if (dejaPrises.has(c.ressource.id)) continue;
    if (c.score < seuil) continue;
    const f = c.ressource.famille;
    if (f) {
      if (famillesVues.has(f)) continue;
      famillesVues.add(f);
    }
    retenues.push(c);
  }

  return { lecture, recommandations: retenues };
}
