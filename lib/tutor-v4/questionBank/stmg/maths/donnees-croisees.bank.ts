// lib/tutor-v4/questionBank/stmg/maths/donnees-croisees.bank.ts
//
// Notions : donnees_tableau_croise, donnees_frequences, donnees_filtres
//           (domaine STMGDC — « Croisement de deux variables catégorielles »,
//            classe de première)
//
// ⭐ TOUTES les questions de ce fichier portent un TABLEAU. C'est le sujet
// même de la partie : on ne peut pas demander de lire un effectif marginal ou
// de calculer une fréquence conditionnelle sur un énoncé en toutes lettres.
// Le tableau est généré avec la question, donc les effectifs changent à chaque
// tirage.
//
// Les contextes sont ceux que le BO nomme — « sécurité routière, démographie,
// économie, agronomie » — et ceux du contrôle qualité, qui parlent
// directement à un élève de STMG : un lot non conforme, une livraison en
// retard, un client insatisfait.
//
// ⚠️ LE POINT DUR DE CETTE PARTIE, et le texte le dit : « l'étude des
// fréquences conditionnelles permet un travail sur la langue française en
// considérant les formulations usuellement utilisées dans les médias ». La
// difficulté n'est pas le calcul — c'est de repérer QUELLE population sert de
// référence. « 40 % des clients insatisfaits ont commandé en ligne » et « 40 %
// des clients en ligne sont insatisfaits » ne parlent pas de la même chose.
//
// ⛔ Ce domaine est de PREMIÈRE : aucune probabilité conditionnelle ici, ni
// arbre. Le tableau croisé d'effectifs et les fréquences, rien de plus. Le BO
// renvoie l'arbre et les probabilités totales à la terminale.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fr(n: number): string {
  const arrondi = Math.round(n * 10000) / 10000;
  return String(arrondi).replace(".", ",");
}

function pct(x: number): string {
  return fr(Math.round(x * 1000) / 10);
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/* ─────────────────── contextes ─────────────────── */

type Contexte = {
  sujet: string;
  /** QUI a mené l'étude — un métier, pour que les maths se voient servir
   *  (21/10/2026 : les énoncés sans contexte revenaient mot pour mot). */
  auteur: string;
  /** Les deux modalités du caractère en LIGNE. */
  lignes: [string, string];
  /**
   * Les deux modalités du caractère en COLONNE.
   * ⚠️ TOUJOURS la modalité POSITIVE en premier (« Lot conforme », « A
   * renouvelé »), la négative en second. Une question qui NIE un critère prend
   * la première : « NON "A renouvelé" » se lit, « NON "N'a pas renouvelé" » est
   * une double négation que personne ne démêle en STMG.
   */
  colonnes: [string, string];
  /**
   * ⭐ 24/10/2026 — la FORME VERBALE de chaque modalité, au pluriel, pour les
   * phrases : « les clients qui ONT ACHETÉ EN LIGNE », « Combien de clients
   * SONT SATISFAITS ? ». Les libellés bruts (« Achat en ligne ») restent dans
   * la figure ; glissés dans une phrase, ils donnaient « 67,9 % des clients
   * relevant de "Achat en ligne" relèvent de "Client satisfait" » —
   * du jargon de tableur, pas du français.
   * ⚠️ Chaque forme doit pouvoir suivre « les {individu} qui … » ET
   * « Combien de {individu} … ? », et s'enchaîner par « et ».
   */
  lignesQui: [string, string];
  colonnesQui: [string, string];
  individu: string;
  /**
   * Le GENRE du nom d'individu. « livraisons » est féminin, tous les autres
   * sont masculins — et « parmi ceux-là » devient « parmi celles-là ».
   *
   * ⚠️ Même famille que les 55 tournures fautives trouvées à la lecture du
   * 16/08 : un nom glissé dans une phrase figée ne s'accorde pas tout seul, et
   * aucun des cinq vérificateurs ne lit la langue. Ne jamais ajouter un
   * contexte sans son genre.
   */
  genre: "m" | "f";
};

/**
 * « de » élidé devant une voyelle.
 *
 * Le nom des individus vient du réservoir ci-dessous et s'insère dans des
 * phrases figées : « Combien de {individu} … ». Avec « abonnés », cela
 * produisait « Combien de abonnés ». Aucun des cinq vérificateurs ne lit la
 * langue — c'est la lecture à la main qui l'a trouvé.
 */
function de(nom: string): string {
  return /^[aeiouyéèêàâîôûAEIOU]/.test(nom) ? `d'${nom}` : `de ${nom}`;
}

/** « parmi ceux-là » / « parmi celles-là », selon le genre des individus. */
function ceuxLa(ctx: Contexte): string {
  return ctx.genre === "f" ? "celles-là" : "ceux-là";
}

/** « ceux qui ont… » / « celles qui ont… ». */
function ceuxQui(ctx: Contexte): string {
  return ctx.genre === "f" ? "celles" : "ceux";
}

/** « aux clients » / « aux livraisons ». */
function aux(ctx: Contexte): string {
  return `aux ${ctx.individu}`;
}

/** « les clients qui ont acheté en ligne ». */
function lesQui(ctx: Contexte, forme: string): string {
  return `les ${ctx.individu} qui ${forme}`;
}

const CONTEXTES: readonly Contexte[] = [
  {
    sujet: "Contrôle qualité à la réception",
    auteur: "Un responsable qualité",
    lignes: ["Fournisseur A", "Fournisseur B"],
    colonnes: ["Lot conforme", "Lot non conforme"],
    lignesQui: ["viennent du fournisseur A", "viennent du fournisseur B"],
    colonnesQui: ["sont conformes", "ne sont pas conformes"],
    individu: "lots",
    genre: "m",
  },
  {
    sujet: "Satisfaction de la clientèle",
    auteur: "Une chargée de relation client",
    lignes: ["Achat en ligne", "Achat en magasin"],
    colonnes: ["Client satisfait", "Client insatisfait"],
    lignesQui: ["ont acheté en ligne", "ont acheté en magasin"],
    colonnesQui: ["sont satisfaits", "sont insatisfaits"],
    individu: "clients",
    genre: "m",
  },
  {
    sujet: "Ponctualité des livraisons",
    auteur: "Un responsable logistique",
    lignes: ["Transporteur Nord", "Transporteur Sud"],
    colonnes: ["Livraison à l'heure", "Livraison en retard"],
    lignesQui: ["ont été faites par le transporteur Nord", "ont été faites par le transporteur Sud"],
    colonnesQui: ["sont arrivées à l'heure", "sont arrivées en retard"],
    individu: "livraisons",
    genre: "f",
  },
  {
    sujet: "Organisation du travail",
    auteur: "Une responsable des ressources humaines",
    lignes: ["Cadres", "Employés"],
    colonnes: ["Télétravaille", "Ne télétravaille pas"],
    lignesQui: ["sont cadres", "sont employés"],
    colonnesQui: ["télétravaillent", "ne télétravaillent pas"],
    individu: "salariés",
    genre: "m",
  },
  {
    sujet: "Conditionnement en fromagerie",
    auteur: "Un technicien de production",
    lignes: ["Chaîne 1", "Chaîne 2"],
    colonnes: ["Poids conforme", "Poids hors tolérance"],
    lignesQui: ["sortent de la chaîne 1", "sortent de la chaîne 2"],
    colonnesQui: ["ont un poids conforme", "ont un poids hors tolérance"],
    individu: "camemberts",
    genre: "m",
  },
  {
    sujet: "Contrôle des conteneurs au port",
    auteur: "Une inspectrice sanitaire",
    lignes: ["Navire du matin", "Navire du soir"],
    colonnes: ["Chaîne du froid tenue", "Chaîne du froid rompue"],
    lignesQui: ["sont arrivés par le navire du matin", "sont arrivés par le navire du soir"],
    colonnesQui: ["ont gardé la chaîne du froid", "ont subi une rupture de la chaîne du froid"],
    individu: "conteneurs",
    genre: "m",
  },
  {
    sujet: "Renouvellement des abonnements",
    auteur: "Un chargé de fidélisation",
    lignes: ["Abonnement mensuel", "Abonnement annuel"],
    colonnes: ["A renouvelé", "N'a pas renouvelé"],
    lignesQui: ["avaient un abonnement mensuel", "avaient un abonnement annuel"],
    colonnesQui: ["ont renouvelé", "n'ont pas renouvelé"],
    individu: "abonnés",
    genre: "m",
  },
  // ⭐ 21/10/2026 — quinze contextes de plus (santé, RH, environnement, sport,
  // culture, marketing) : à sept, la même phrase revenait une fois sur deux.
  { sujet: "Vaccination contre la grippe", auteur: "Un médecin de santé publique", lignes: ["Moins de 65 ans", "65 ans et plus"], colonnes: ["Vacciné", "Non vacciné"], lignesQui: ["ont moins de 65 ans", "ont 65 ans ou plus"], colonnesQui: ["sont vaccinés", "ne sont pas vaccinés"], individu: "patients", genre: "m" },
  { sujet: "Trajets domicile-travail", auteur: "Une chargée de mobilité durable", lignes: ["Moins de 10 km", "10 km ou plus"], colonnes: ["Vient à vélo", "Ne vient pas à vélo"], lignesQui: ["habitent à moins de 10 km", "habitent à 10 km ou plus"], colonnesQui: ["viennent à vélo", "ne viennent pas à vélo"], individu: "salariés", genre: "m" },
  { sujet: "Tri des déchets à la cantine", auteur: "Un responsable environnement", lignes: ["Service du midi", "Service du soir"], colonnes: ["Plateau trié", "Plateau non trié"], lignesQui: ["ont été servis le midi", "ont été servis le soir"], colonnesQui: ["ont été triés", "n'ont pas été triés"], individu: "plateaux", genre: "m" },
  { sujet: "Résultats à l'examen du permis", auteur: "Une gérante d'auto-école", lignes: ["Conduite accompagnée", "Formation classique"], colonnes: ["Reçu", "Ajourné"], lignesQui: ["ont suivi la conduite accompagnée", "ont suivi la formation classique"], colonnesQui: ["ont été reçus", "ont été ajournés"], individu: "candidats", genre: "m" },
  { sujet: "Renouvellement des licences", auteur: "Un dirigeant de club de handball", lignes: ["Licence loisir", "Licence compétition"], colonnes: ["A repris sa licence", "N'a pas repris sa licence"], lignesQui: ["avaient une licence loisir", "avaient une licence compétition"], colonnesQui: ["ont repris leur licence", "n'ont pas repris leur licence"], individu: "licenciés", genre: "m" },
  { sujet: "Retours des colis vendus en ligne", auteur: "Une responsable du service après-vente", lignes: ["Vêtements", "Chaussures"], colonnes: ["Colis gardé", "Colis retourné"], lignesQui: ["contenaient des vêtements", "contenaient des chaussures"], colonnesQui: ["ont été gardés", "ont été retournés"], individu: "colis", genre: "m" },
  { sujet: "Paiement des factures", auteur: "Un comptable", lignes: ["Clients particuliers", "Clients professionnels"], colonnes: ["Payée à temps", "Payée en retard"], lignesQui: ["concernent des particuliers", "concernent des professionnels"], colonnesQui: ["ont été payées à temps", "ont été payées en retard"], individu: "factures", genre: "f" },
  { sujet: "Recrutement des stagiaires", auteur: "Une chargée de recrutement", lignes: ["Candidature spontanée", "Réponse à une offre"], colonnes: ["Retenue", "Non retenue"], lignesQui: ["sont spontanées", "répondent à une offre"], colonnesQui: ["ont été retenues", "n'ont pas été retenues"], individu: "candidatures", genre: "f" },
  { sujet: "Isolation des logements", auteur: "Un conseiller en rénovation énergétique", lignes: ["Maison", "Appartement"], colonnes: ["Logement isolé", "Logement non isolé"], lignesQui: ["sont des maisons", "sont des appartements"], colonnesQui: ["sont isolés", "ne sont pas isolés"], individu: "logements", genre: "m" },
  { sujet: "Visites d'un musée", auteur: "Une médiatrice culturelle", lignes: ["Visiteurs français", "Visiteurs étrangers"], colonnes: ["A pris l'audioguide", "N'a pas pris l'audioguide"], lignesQui: ["sont français", "sont étrangers"], colonnesQui: ["ont pris l'audioguide", "n'ont pas pris l'audioguide"], individu: "visiteurs", genre: "m" },
  { sujet: "Réservations d'un hôtel", auteur: "Une directrice d'hôtel", lignes: ["Réservation en ligne", "Réservation par téléphone"], colonnes: ["Séjour maintenu", "Séjour annulé"], lignesQui: ["ont été faites en ligne", "ont été faites par téléphone"], colonnesQui: ["ont été maintenues", "ont été annulées"], individu: "réservations", genre: "f" },
  { sujet: "Ventes d'une concession automobile", auteur: "Un chef des ventes", lignes: ["Voiture électrique", "Voiture thermique"], colonnes: ["Payée comptant", "Payée à crédit"], lignesQui: ["concernent une voiture électrique", "concernent une voiture thermique"], colonnesQui: ["ont été payées comptant", "ont été payées à crédit"], individu: "ventes", genre: "f" },
  { sujet: "Campagne publicitaire en ligne", auteur: "Une chargée de marketing numérique", lignes: ["Publicité vue sur mobile", "Publicité vue sur ordinateur"], colonnes: ["A cliqué", "N'a pas cliqué"], lignesQui: ["ont vu la publicité sur mobile", "ont vu la publicité sur ordinateur"], colonnesQui: ["ont cliqué", "n'ont pas cliqué"], individu: "internautes", genre: "m" },
  { sujet: "Suivi des formations", auteur: "Un responsable de la formation", lignes: ["Formation en présentiel", "Formation à distance"], colonnes: ["Formation terminée", "Formation abandonnée"], lignesQui: ["suivent la formation en présentiel", "suivent la formation à distance"], colonnesQui: ["ont terminé leur formation", "ont abandonné leur formation"], individu: "inscrits", genre: "m" },
  { sujet: "Venue des festivaliers", auteur: "Une organisatrice de festival", lignes: ["Billet en prévente", "Billet sur place"], colonnes: ["Venu en transport en commun", "Venu en voiture"], lignesQui: ["ont acheté leur billet en prévente", "ont acheté leur billet sur place"], colonnesQui: ["sont venus en transport en commun", "sont venus en voiture"], individu: "festivaliers", genre: "m" },
] as const;

/** « Un responsable qualité » → « un responsable qualité ». */
function minuscule(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * La phrase d'entrée : qui a mené l'étude, et sur quoi. Trois tournures × 22
 * contextes, devant des consignes qui étaient FIXES (« Une case du tableau a été
 * effacée… ») : c'est elle qui empêche la même phrase de revenir.
 */
function amorce(ctx: Contexte): string {
  return pick([
    `${ctx.auteur} a dressé ce tableau croisé : « ${ctx.sujet} ».`,
    `${ctx.auteur} présente une étude intitulée « ${ctx.sujet} ».`,
    `Étude « ${ctx.sujet} », menée par ${minuscule(ctx.auteur)}.`,
  ]);
}

/** Un tableau croisé complet : 2 lignes, 2 colonnes, plus les marges. */
type Tableau = {
  ctx: Contexte;
  a: number; // ligne 1, colonne 1
  b: number; // ligne 1, colonne 2
  c: number; // ligne 2, colonne 1
  d: number; // ligne 2, colonne 2
  ligne1: number;
  ligne2: number;
  col1: number;
  col2: number;
  total: number;
};

function tirerTableau(options?: { rondes?: boolean }): Tableau {
  const ctx = pick(CONTEXTES);
  const pas = options?.rondes === false ? 1 : 10;
  const a = randomInt(6, 30) * pas;
  const b = randomInt(2, 15) * pas;
  const c = randomInt(5, 28) * pas;
  const d = randomInt(2, 14) * pas;
  return {
    ctx,
    a,
    b,
    c,
    d,
    ligne1: a + b,
    ligne2: c + d,
    col1: a + c,
    col2: b + d,
    total: a + b + c + d,
  };
}

/**
 * Toutes les cases masquables du tableau : les quatre effectifs croisés, les
 * quatre marges, et le total général.
 *
 * ⚠️ MASQUER PLUSIEURS CASES, ET PAS UNE SEULE (18/08/2026). Un second item
 * d'angle différent demande souvent de retrouver une valeur QUE LE TABLEAU NE
 * DOIT PAS DÉJÀ DONNER : si l'énoncé demande l'effectif de référence d'une
 * fréquence conditionnelle et que la ligne est affichée, l'élève lit la réponse
 * au lieu de la calculer. Une case masquée ne suffisait pas — il faut pouvoir
 * en éteindre toute une ligne.
 */
type CaseTableau = "a" | "b" | "c" | "d" | "ligne1" | "ligne2" | "col1" | "col2" | "total";

/** Le tableau croisé, avec ou sans ses marges, et autant de cases masquées qu'il faut. */
function canvasTableau(
  t: Tableau,
  options?: { avecMarges?: boolean; masquer?: CaseTableau | readonly CaseTableau[]; titre?: string }
): CanvasFigure {
  const avecMarges = options?.avecMarges !== false;
  const masquees = new Set<CaseTableau>(
    options?.masquer === undefined
      ? []
      : typeof options.masquer === "string"
        ? [options.masquer]
        : options.masquer
  );
  const v = (cle: CaseTableau, valeur: number) => (masquees.has(cle) ? "?" : String(valeur));
  const headers = [t.ctx.sujet, t.ctx.colonnes[0], t.ctx.colonnes[1], ...(avecMarges ? ["Total"] : [])];
  return {
    kind: "tableau_donnees",
    title: options?.titre ?? `${t.ctx.sujet} — ${t.total} ${t.ctx.individu}`,
    headers,
    rows: [
      {
        label: t.ctx.lignes[0],
        values: [v("a", t.a), v("b", t.b), ...(avecMarges ? [v("ligne1", t.ligne1)] : [])],
      },
      {
        label: t.ctx.lignes[1],
        values: [v("c", t.c), v("d", t.d), ...(avecMarges ? [v("ligne2", t.ligne2)] : [])],
      },
      ...(avecMarges
        ? [
            {
              label: "Total",
              values: [v("col1", t.col1), v("col2", t.col2), v("total", t.total)],
            },
          ]
        : []),
    ],
  };
}

/**
 * Un tableau dont les quatre effectifs croisés sont deux à deux DIFFÉRENTS.
 *
 * ⚠️ Indispensable dès qu'une question part de la valeur pour retrouver la case
 * (« l'effectif $120$ se trouve à quel croisement ? ») : deux cases égales, et
 * le QCM a deux bonnes réponses. Même famille que les racines opposées trouvées
 * à la lecture du 16/08 — l'élève a raison et il est compté faux.
 */
function tirerTableauCasesDistinctes(): Tableau {
  for (let essai = 0; essai < 40; essai++) {
    const t = tirerTableau();
    if (new Set([t.a, t.b, t.c, t.d]).size === 4) return t;
  }
  // Repli explicite : des valeurs construites distinctes par construction.
  const ctx = pick(CONTEXTES);
  const [a, b, c, d] = shuffle([10, 20, 30, 40]).map((n, i) => n * (i + 1) + n);
  return {
    ctx,
    a,
    b,
    c,
    d,
    ligne1: a + b,
    ligne2: c + d,
    col1: a + c,
    col2: b + d,
    total: a + b + c + d,
  };
}

/** Les quatre effectifs marginaux deux à deux différents (même raison). */
function tirerTableauMargesDistinctes(): Tableau {
  for (let essai = 0; essai < 40; essai++) {
    const t = tirerTableau();
    if (new Set([t.ligne1, t.ligne2, t.col1, t.col2]).size === 4) return t;
  }
  const ctx = pick(CONTEXTES);
  const a = 60;
  const b = 30;
  const c = 20;
  const d = 90;
  return { ctx, a, b, c, d, ligne1: 90, ligne2: 110, col1: 80, col2: 120, total: 200 };
}

export const donneesCroiseesBank: TutorBankItemV4[] = [
  /* ═══════════════════ don_tab_lire ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_tab_lire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "On croise la LIGNE et la COLONNE : la case cherchée est à leur intersection.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const cases = [
        { i: 0, j: 0, val: t.a },
        { i: 0, j: 1, val: t.b },
        { i: 1, j: 0, val: t.c },
        { i: 1, j: 1, val: t.d },
      ] as const;
      const k = pick(cases);
      return {
        text:
          `Combien ${de(t.ctx.individu)} ${t.ctx.lignesQui[k.i]} ` +
          `et ${t.ctx.colonnesQui[k.j]} ?`,
        format: "short",
        expected: [String(k.val)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Dans un tableau croisé, chaque case donne l'effectif des individus qui possèdent SIMULTANÉMENT la modalité de la ligne et celle de la colonne.",
          "On repère la ligne, puis la colonne, et l'on lit la case à leur croisement — pas dans la colonne « Total ».",
          `À l'intersection de « ${t.ctx.lignes[k.i]} » et « ${t.ctx.colonnes[k.j]} » se trouve l'effectif $${k.val}$.`,
          `$${k.val}$ ${t.ctx.individu} ${t.ctx.lignesQui[k.i]} et ${t.ctx.colonnesQui[k.j]}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la lecture À L'ENVERS. Le premier item part du croisement et
    // demande l'effectif ; celui-ci part de l'effectif et demande le
    // croisement. C'est le même tableau, ce n'est pas le même geste : l'élève
    // doit balayer les quatre cases au lieu de suivre une ligne et une colonne.
    kind: "template",
    id: "stmg_don_tab_lire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la case qui porte ce nombre, puis lis SON intitulé de ligne et SON intitulé de colonne.",
    tags: ["stmg", "maths", "donnees", "canvas", "template"],
    generate: () => {
      const t = tirerTableauCasesDistinctes();
      const cases = [
        { i: 0, j: 0, val: t.a },
        { i: 0, j: 1, val: t.b },
        { i: 1, j: 0, val: t.c },
        { i: 1, j: 1, val: t.d },
      ] as const;
      const k = pick(cases);
      const libelle = (i: 0 | 1, j: 0 | 1) =>
        `« ${t.ctx.lignes[i]} » et « ${t.ctx.colonnes[j]} »`;
      const bonne = libelle(k.i, k.j);
      return {
        text: `Dans ce tableau, l'effectif $${k.val}$ correspond au croisement de quelles modalités ?`,
        format: "qcm",
        choices: makeChoices(
          bonne,
          cases
            .filter((c) => !(c.i === k.i && c.j === k.j))
            .map((c) => libelle(c.i, c.j))
        ),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Chaque case d'un tableau croisé porte deux étiquettes : celle de sa ligne et celle de sa colonne.",
          "On repère la case qui contient le nombre cherché, puis on remonte à gauche pour lire la ligne, et en haut pour lire la colonne.",
          `L'effectif $${k.val}$ occupe la ligne « ${t.ctx.lignes[k.i]} » et la colonne « ${t.ctx.colonnes[k.j]} ».`,
          `Ces $${k.val}$ ${t.ctx.individu} ${t.ctx.lignesQui[k.i]} et ${t.ctx.colonnesQui[k.j]} : la case ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: libelle((1 - k.i) as 0 | 1, k.j),
            cause: "a lu la bonne colonne mais s'est trompé de ligne",
          },
          {
            choice: libelle(k.i, (1 - k.j) as 0 | 1),
            cause: "a lu la bonne ligne mais s'est trompé de colonne",
          },
        ],
      };
    },
  },

  /* ═══════════════════ don_tab_marges ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_tab_marges_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_marges",
    difficulty: 2,
    theme: "neutral",
    hint: "Un effectif marginal s'obtient en additionnant toute une ligne, ou toute une colonne.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const quoi = pick(["ligne1", "ligne2", "col1", "col2", "total"] as const);
      const valeur =
        quoi === "ligne1" ? t.ligne1 : quoi === "ligne2" ? t.ligne2 : quoi === "col1" ? t.col1 : quoi === "col2" ? t.col2 : t.total;
      const forme =
        quoi === "ligne1"
          ? t.ctx.lignesQui[0]
          : quoi === "ligne2"
            ? t.ctx.lignesQui[1]
            : quoi === "col1"
              ? t.ctx.colonnesQui[0]
              : quoi === "col2"
                ? t.ctx.colonnesQui[1]
                : null;
      return {
        text:
          `Le tableau est donné SANS ses marges. ` +
          (forme === null
            ? `Combien ${de(t.ctx.individu)} y a-t-il en tout ?`
            : `Combien ${de(t.ctx.individu)} ${forme} ?`),
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        canvas: canvasTableau(t, { avecMarges: false }),
        explanation: exp(
          "Les effectifs marginaux sont les totaux par ligne et par colonne ; l'effectif total est la somme de toutes les cases.",
          "On additionne la ligne entière, ou la colonne entière, selon ce qui est demandé.",
          quoi === "total"
            ? `$${t.a} + ${t.b} + ${t.c} + ${t.d} = ${t.total}$.`
            : quoi === "ligne1"
              ? `$${t.a} + ${t.b} = ${t.ligne1}$.`
              : quoi === "ligne2"
                ? `$${t.c} + ${t.d} = ${t.ligne2}$.`
                : quoi === "col1"
                  ? `$${t.a} + ${t.c} = ${t.col1}$.`
                  : `$${t.b} + ${t.d} = ${t.col2}$.`,
          `Il y en a $${valeur}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — reconnaître le CALCUL, au lieu de l'exécuter. Le premier item
    // fait additionner une ligne ; celui-ci demande LEQUEL des quatre calculs
    // donne la marge cherchée. C'est l'erreur la plus fréquente du chapitre —
    // additionner la ligne quand on demande la colonne —, et elle ne se voit
    // pas quand la réponse est un nombre juste obtenu par hasard.
    kind: "template",
    id: "stmg_don_tab_marges_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_marges",
    difficulty: 2,
    theme: "neutral",
    hint: "Un effectif marginal de COLONNE s'obtient en descendant la colonne, pas en parcourant une ligne.",
    tags: ["stmg", "maths", "donnees", "canvas", "piege", "template"],
    generate: () => {
      // Les quatre sommes proposées doivent être deux à deux différentes :
      // sinon deux propositions sont justes en même temps.
      let t = tirerTableau();
      for (let essai = 0; essai < 40; essai++) {
        if (new Set([t.a + t.c, t.a + t.b, t.b + t.d, t.c + t.d]).size === 4) break;
        t = tirerTableau();
      }
      const colonne = pick([0, 1] as const);
      const bonne =
        colonne === 0 ? `$${t.a} + ${t.c}$` : `$${t.b} + ${t.d}$`;
      const autreColonne =
        colonne === 0 ? `$${t.b} + ${t.d}$` : `$${t.a} + ${t.c}$`;
      return {
        text:
          `Le tableau est donné SANS ses marges. ` +
          `Quel calcul donne l'effectif marginal de la colonne « ${t.ctx.colonnes[colonne]} » ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `$${t.a} + ${t.b}$`,
          `$${t.c} + ${t.d}$`,
          autreColonne,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t, { avecMarges: false }),
        explanation: exp(
          "L'effectif marginal d'une colonne est le total de cette colonne : la somme des effectifs de toutes ses cases.",
          "On descend la colonne demandée et on additionne ses deux cases — une par ligne du tableau.",
          `La colonne « ${t.ctx.colonnes[colonne]} » contient $${colonne === 0 ? t.a : t.b}$ et $${colonne === 0 ? t.c : t.d}$, ` +
            `donc sa marge vaut $${colonne === 0 ? t.col1 : t.col2}$.`,
          `Le bon calcul est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${t.a} + ${t.b}$`,
            cause: `a additionné la LIGNE « ${t.ctx.lignes[0]} » au lieu de la colonne demandée`,
          },
          {
            choice: `$${t.c} + ${t.d}$`,
            cause: `a additionné la LIGNE « ${t.ctx.lignes[1]} » au lieu de la colonne demandée`,
          },
          {
            choice: autreColonne,
            cause: "a additionné l'autre colonne",
          },
        ],
      };
    },
  },

  /* ═══════════════════ don_tab_completer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_tab_completer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Une case manquante se retrouve par soustraction, à partir du total de sa ligne ou de sa colonne.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const cle = pick(["a", "b", "c", "d"] as const);
      const valeur = cle === "a" ? t.a : cle === "b" ? t.b : cle === "c" ? t.c : t.d;
      const ligne = cle === "a" || cle === "b" ? t.ligne1 : t.ligne2;
      const autre =
        cle === "a" ? t.b : cle === "b" ? t.a : cle === "c" ? t.d : t.c;
      const nomLigne = cle === "a" || cle === "b" ? t.ctx.lignes[0] : t.ctx.lignes[1];
      return {
        text: `${amorce(t.ctx)} ${pick(["Une case du tableau a été effacée.", "Une case du tableau est illisible.", "Une valeur manque dans le tableau."])} ${pick(["Quelle valeur doit y figurer ?", "Retrouve la valeur manquante.", "Quel nombre faut-il y écrire ?"])}`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        canvas: canvasTableau(t, { masquer: cle }),
        explanation: exp(
          "Dans un tableau croisé complet, chaque total est la somme de sa ligne ou de sa colonne : une case manquante se déduit donc par soustraction.",
          "On choisit la ligne (ou la colonne) qui contient la case manquante et dont toutes les autres valeurs sont connues.",
          `Sur la ligne « ${nomLigne} », le total vaut $${ligne}$ et l'autre case $${autre}$ : ` +
            `la case manquante vaut $${ligne} - ${autre} = ${valeur}$.`,
          `La case manquante vaut $${valeur}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — TROIS cases effacées au lieu d'une. Le premier item se règle
    // par une soustraction, celui-ci oblige à choisir PAR OÙ commencer : la
    // seule case calculable d'emblée est celle dont la ligne (ou la colonne)
    // ne contient plus qu'une inconnue. C'est le geste réel de reconstitution
    // d'un tableau, et il ne se réduit pas à « total moins l'autre ».
    kind: "template",
    id: "stmg_don_tab_completer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par la ligne — ou la colonne — où il ne manque qu'une seule case.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      // Seule la case « a » reste visible : toutes les marges sont données,
      // donc chaque case manquante se déduit, mais dans un ORDRE imposé.
      const cible = pick(["b", "c", "d"] as const);
      const valeur = cible === "b" ? t.b : cible === "c" ? t.c : t.d;
      const nomLigne = cible === "b" ? t.ctx.lignes[0] : t.ctx.lignes[1];
      const nomColonne = cible === "c" ? t.ctx.colonnes[0] : t.ctx.colonnes[1];
      const calcul =
        cible === "b"
          ? `Sur la ligne « ${t.ctx.lignes[0]} », le total vaut $${t.ligne1}$ et la case connue $${t.a}$ : ` +
            `la case cherchée vaut $${t.ligne1} - ${t.a} = ${t.b}$.`
          : cible === "c"
            ? `Dans la colonne « ${t.ctx.colonnes[0]} », le total vaut $${t.col1}$ et la case connue $${t.a}$ : ` +
              `la case cherchée vaut $${t.col1} - ${t.a} = ${t.c}$.`
            : `On passe d'abord par la colonne « ${t.ctx.colonnes[0]} » : $${t.col1} - ${t.a} = ${t.c}$. ` +
              `Puis, sur la ligne « ${t.ctx.lignes[1]} » : $${t.ligne2} - ${t.c} = ${t.d}$.`;
      return {
        text:
          `${amorce(t.ctx)} Trois cases du tableau ont été effacées, mais toutes les marges sont connues. ` +
          `Quelle valeur doit figurer au croisement de « ${nomLigne} » et « ${nomColonne} » ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        canvas: canvasTableau(t, { masquer: ["b", "c", "d"] }),
        explanation: exp(
          "Dans un tableau croisé, chaque marge est la somme de sa ligne ou de sa colonne : une case manquante se déduit dès qu'elle est la SEULE inconnue de sa ligne ou de sa colonne.",
          "On cherche d'abord une ligne, ou une colonne, où il ne manque qu'une case. On la complète, ce qui en libère une autre, et ainsi de suite.",
          calcul,
          `La case cherchée vaut $${valeur}$.`
        ),
      };
    },
  },

  /* ═══════════════════ don_tab_dresser ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_tab_dresser_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_dresser",
    difficulty: 3,
    theme: "neutral",
    hint: "On part du total, puis on retire ce que l'énoncé donne, case après case.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      return {
        text:
          `${amorce(t.ctx)} L'étude porte sur $${t.total}$ ${t.ctx.individu}. ` +
          `$${t.ligne1}$ ${t.ctx.lignesQui[0]}, et parmi ${ceuxLa(t.ctx)} $${t.a}$ ${t.ctx.colonnesQui[0]}. ` +
          `Par ailleurs, en tout, $${t.col1}$ ${t.ctx.individu} ${t.ctx.colonnesQui[0]}. ` +
          `Combien ${de(t.ctx.individu)} ${t.ctx.lignesQui[1]} et ${t.ctx.colonnesQui[1]} ?`,
        format: "short",
        expected: [String(t.d)],
        comparator: "number_equal",
        canvas: canvasTableau(t, { masquer: "d", titre: "Le tableau à dresser" }),
        explanation: exp(
          "Dresser un tableau croisé à partir d'un énoncé, c'est placer chaque information dans la bonne case, puis compléter par différences.",
          "On remplit d'abord ce que l'énoncé donne directement, puis on déduit les marges manquantes, puis les cases.",
          `Ligne « ${t.ctx.lignes[1]} » : $${t.total} - ${t.ligne1} = ${t.ligne2}$. ` +
            `Case « ${t.ctx.lignes[1]} » × « ${t.ctx.colonnes[0]} » : $${t.col1} - ${t.a} = ${t.c}$. ` +
            `Donc la case cherchée vaut $${t.ligne2} - ${t.c} = ${t.d}$.`,
          `$${t.d}$ ${t.ctx.individu} ${t.ctx.lignesQui[1]} et ${t.ctx.colonnesQui[1]}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le tableau est VIDE, et la question porte sur une MARGE.
    // Le premier item laisse trois cases remplies et demande la quatrième :
    // l'élève complète. Ici rien n'est écrit, tout est dans l'énoncé, et ce
    // qu'on demande n'est pas une case mais un total de colonne. Impossible d'y
    // répondre sans avoir vraiment dressé le tableau.
    kind: "template",
    id: "stmg_don_tab_dresser_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_dresser",
    difficulty: 3,
    theme: "neutral",
    hint: "Place d'abord les deux effectifs croisés que l'énoncé donne, puis additionne la colonne.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      return {
        text:
          `${amorce(t.ctx)} L'étude porte sur $${t.total}$ ${t.ctx.individu}. ` +
          `$${t.ligne1}$ ${t.ctx.lignesQui[0]}, et parmi ${ceuxLa(t.ctx)} $${t.a}$ ${t.ctx.colonnesQui[0]}. ` +
          `Parmi ${ceuxQui(t.ctx)} qui ${t.ctx.lignesQui[1]}, $${t.c}$ ${t.ctx.colonnesQui[0]}. ` +
          `En tout, combien ${de(t.ctx.individu)} ${t.ctx.colonnesQui[1]} ?`,
        format: "short",
        expected: [String(t.col2)],
        comparator: "number_equal",
        canvas: canvasTableau(t, {
          masquer: ["a", "b", "c", "d", "ligne1", "ligne2", "col1", "col2", "total"],
          titre: `Le tableau à dresser — ${t.ctx.sujet}`,
        }),
        explanation: exp(
          "Dresser un tableau croisé, c'est ranger chaque information de l'énoncé dans la case qu'elle désigne, puis obtenir les marges par addition.",
          "On place les effectifs croisés donnés, on complète la colonne qu'ils remplissent, puis on retire ce total de l'effectif total pour obtenir l'autre colonne.",
          `Colonne « ${t.ctx.colonnes[0]} » : $${t.a} + ${t.c} = ${t.col1}$. ` +
            `Colonne « ${t.ctx.colonnes[1]} » : $${t.total} - ${t.col1} = ${t.col2}$.`,
          `En tout, $${t.col2}$ ${t.ctx.individu} ${t.ctx.colonnesQui[1]}.`
        ),
      };
    },
  },

  {
    // ANGLE 3 — les DONNÉES BRUTES, comme le dit l'intitulé : une liste
    // d'individus avec leurs deux caractères, qu'il faut dépouiller soi-même.
    kind: "template",
    id: "stmg_don_tab_dresser_tpl_3",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_dresser",
    difficulty: 3,
    theme: "neutral",
    hint: "Dépouille la liste ligne par ligne : une coche dans la case du tableau croisé qui correspond aux DEUX caractères de chaque individu.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const n = randomInt(12, 16);
      const liste = Array.from({ length: n }, () => ({ l: randomInt(0, 1), c: randomInt(0, 1) }));
      const i = randomInt(0, 1);
      const j = randomInt(0, 1);
      const quoi = pick(["case", "ligne", "colonne"] as const);
      const compte =
        quoi === "case"
          ? liste.filter((p) => p.l === i && p.c === j).length
          : quoi === "ligne"
            ? liste.filter((p) => p.l === i).length
            : liste.filter((p) => p.c === j).length;
      const question =
        quoi === "case"
          ? `Combien ${de(ctx.individu)} ${ctx.lignesQui[i]} et ${ctx.colonnesQui[j]} ?`
          : quoi === "ligne"
            ? `Quel est l'effectif total de la ligne « ${ctx.lignes[i]} » du tableau croisé ?`
            : `Quel est l'effectif total de la colonne « ${ctx.colonnes[j]} » du tableau croisé ?`;
      return {
        text:
          // Pas l'amorce commune : « a dressé ce tableau croisé » contredirait la consigne.
          `${pick([`${ctx.auteur} a recueilli les données brutes de l'étude « ${ctx.sujet} ».`, `Étude « ${ctx.sujet} », menée par ${minuscule(ctx.auteur)} : voici les relevés bruts.`])} ` +
          `La liste donne $${n}$ ${ctx.individu}, avec leurs deux caractères. ` +
          `On veut en dresser le tableau croisé. ${question}`,
        format: "short",
        expected: [String(compte)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: `${ctx.sujet} — données brutes`,
          headers: ["N°", "Premier caractère", "Second caractère"],
          rows: liste.map((p, k) => ({ label: String(k + 1), values: [ctx.lignes[p.l], ctx.colonnes[p.c]] })),
        },
        explanation: exp(
          "Dresser un tableau croisé à partir de données brutes, c'est compter, pour chaque couple de modalités, les individus qui les présentent toutes les deux.",
          "On parcourt la liste une seule fois et l'on range chaque individu dans la case de son couple ; les marges s'obtiennent ensuite par addition.",
          `Dans la liste, on compte $${compte}$ ${ctx.individu} qui conviennent` +
            (quoi === "case" ? "." : ` (les deux cases de la ${quoi} réunies).`),
          `La réponse est $${compte}$.`
        ),
      };
    },
  },

  /* ═══════════════════ don_freq_marginale ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_freq_marginale_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_marginale",
    difficulty: 2,
    theme: "neutral",
    hint: "Une fréquence MARGINALE se rapporte à l'effectif TOTAL.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const quoi = pick(["ligne1", "col2", "col1", "ligne2"] as const);
      const eff = quoi === "ligne1" ? t.ligne1 : quoi === "ligne2" ? t.ligne2 : quoi === "col1" ? t.col1 : t.col2;
      const forme =
        quoi === "ligne1"
          ? t.ctx.lignesQui[0]
          : quoi === "ligne2"
            ? t.ctx.lignesQui[1]
            : quoi === "col1"
              ? t.ctx.colonnesQui[0]
              : t.ctx.colonnesQui[1];
      const f = eff / t.total;
      return {
        text:
          `${amorce(t.ctx)} ` +
          pick([
            `Quelle est la fréquence marginale des ${t.ctx.individu} qui ${forme} ?`,
            `Sur tous les ${t.ctx.individu} de l'étude, quelle part ${forme} ?`,
            `Dans toute l'étude, quelle proportion des ${t.ctx.individu} ${forme} ?`,
          ]) +
          ` (en pourcentage arrondi au dixième)`,
        format: "short",
        expected: [pct(f)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une fréquence marginale rapporte un effectif marginal à l'effectif TOTAL de l'étude.",
          "On divise le total de la ligne (ou de la colonne) par l'effectif total.",
          `$\\dfrac{${eff}}{${t.total}} = ${fr(Math.round(f * 10000) / 10000)}$, soit $${pct(f)}\\,\\%$.`,
          `La fréquence marginale vaut $${pct(f)}\\,\\%$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — choisir le bon QUOTIENT, au lieu de le calculer. Le premier
    // item fait poser la division ; celui-ci met côte à côte les quatre
    // quotients que l'élève peut former avec la même case, dont la fréquence
    // CONDITIONNELLE — qui est juste, mais qui répond à une autre question.
    // C'est la confusion que le BO signale lui-même sur ce chapitre.
    kind: "template",
    id: "stmg_don_freq_marginale_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_marginale",
    difficulty: 2,
    theme: "neutral",
    hint: "MARGINALE : le dénominateur est l'effectif TOTAL de l'étude, jamais celui d'une ligne.",
    tags: ["stmg", "maths", "donnees", "canvas", "piege", "template"],
    generate: () => {
      // Les quatre pourcentages proposés doivent différer : deux quotients qui
      // tombent sur le même arrondi donneraient deux bonnes réponses.
      let t = tirerTableau();
      for (let essai = 0; essai < 60; essai++) {
        const p = [t.col1 / t.total, t.a / t.total, t.col1 / t.ligne1, t.a / t.col1].map(pct);
        // … et le quotient « par la ligne » ne doit pas dépasser 100 % : un
        // leurre à $129\,\%$ s'élimine sans réfléchir.
        if (new Set(p).size === 4 && t.col1 < t.ligne1) break;
        t = tirerTableau();
      }
      const bonne = `$${pct(t.col1 / t.total)}\\,\\%$`;
      return {
        text:
          `${amorce(t.ctx)} ` +
          pick([
            `Quelle est la fréquence marginale des ${t.ctx.individu} qui ${t.ctx.colonnesQui[0]} ? `,
            `Sur tous les ${t.ctx.individu} de l'étude, quelle part ${t.ctx.colonnesQui[0]} ? `,
          ]) +
          `(en pourcentage arrondi au dixième)`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `$${pct(t.a / t.total)}\\,\\%$`,
          `$${pct(t.col1 / t.ligne1)}\\,\\%$`,
          `$${pct(t.a / t.col1)}\\,\\%$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une fréquence marginale rapporte un effectif marginal — le total d'une ligne ou d'une colonne — à l'effectif TOTAL de l'étude.",
          "On prend la marge de la colonne demandée, et on la divise par l'effectif total, pas par un total de ligne.",
          `$\\dfrac{${t.col1}}{${t.total}} = ${fr(Math.round((t.col1 / t.total) * 10000) / 10000)}$, soit $${pct(t.col1 / t.total)}\\,\\%$.`,
          `La fréquence marginale vaut $${pct(t.col1 / t.total)}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${pct(t.a / t.total)}\\,\\%$`,
            cause: "a pris une seule case au lieu du total de la colonne",
          },
          {
            choice: `$${pct(t.col1 / t.ligne1)}\\,\\%$`,
            cause: `a divisé par le total de la ligne « ${t.ctx.lignes[0]} » au lieu de l'effectif total`,
          },
          {
            choice: `$${pct(t.a / t.col1)}\\,\\%$`,
            cause: "a calculé une fréquence CONDITIONNELLE : juste, mais elle répond à une autre question",
          },
        ],
      };
    },
  },

  /* ═══════════════ don_freq_conditionnelle ═══════════════ */

  {
    kind: "template",
    id: "stmg_don_freq_conditionnelle_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "La population de référence est celle qui suit le mot « parmi » — elle sert de DÉNOMINATEUR.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const sens = pick(["ligne", "colonne"] as const);
      const i = pick([0, 1] as const);
      const j = pick([0, 1] as const);
      const numerateur = i === 0 ? (j === 0 ? t.a : t.b) : j === 0 ? t.c : t.d;
      const denominateur = sens === "ligne" ? (i === 0 ? t.ligne1 : t.ligne2) : j === 0 ? t.col1 : t.col2;
      const reference = sens === "ligne" ? t.ctx.lignes[i] : t.ctx.colonnes[j];
      const referenceQui = sens === "ligne" ? t.ctx.lignesQui[i] : t.ctx.colonnesQui[j];
      const cibleQui = sens === "ligne" ? t.ctx.colonnesQui[j] : t.ctx.lignesQui[i];
      const f = numerateur / denominateur;
      return {
        text:
          `Parmi ${lesQui(t.ctx, referenceQui)}, ` +
          `quelle est la fréquence de ${ceuxQui(t.ctx)} qui ${cibleQui} ? ` +
          `(en pourcentage arrondi au dixième)`,
        format: "short",
        expected: [pct(f)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une fréquence conditionnelle se calcule DANS une sous-population : le dénominateur n'est plus l'effectif total, mais celui de la population de référence.",
          "On repère le mot « parmi » : ce qui le suit donne le dénominateur. Le numérateur est la case qui croise les deux caractères.",
          `Population de référence : ${lesQui(t.ctx, referenceQui)} (${sens === "ligne" ? "ligne" : "colonne"} « ${reference} »), soit $${denominateur}$ ${t.ctx.individu}. ` +
            `Effectif croisé : $${numerateur}$. Donc $\\dfrac{${numerateur}}{${denominateur}} = ${pct(f)}\\,\\%$.`,
          `La fréquence conditionnelle vaut $${pct(f)}\\,\\%$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — COMPARER deux fréquences conditionnelles pour trancher, au lieu
    // d'en calculer une. C'est l'usage réel du chapitre en gestion : « quel
    // fournisseur nous livre le plus de rebuts ? » ne se lit pas sur les
    // effectifs bruts.
    //
    // ⭐ Le piège est CONSTRUIT, pas subi : la première ligne a toujours PLUS
    // d'individus concernés en valeur absolue, et TOUJOURS un taux plus faible.
    // Répondre par le plus gros nombre, c'est se tromper à coup sûr — et c'est
    // exactement l'erreur qu'un élève commet devant un tableau croisé.
    kind: "template",
    id: "stmg_don_freq_conditionnelle_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux effectifs ne se comparent pas quand les populations n'ont pas la même taille : ramène chacun à SA ligne.",
    tags: ["stmg", "maths", "donnees", "canvas", "piege", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      let ligne1 = 400;
      let ligne2 = 100;
      let p1 = 20;
      let p2 = 50;
      for (let essai = 0; essai < 60; essai++) {
        ligne1 = pick([300, 400, 500, 600] as const);
        ligne2 = pick([80, 100, 120, 150] as const);
        p1 = pick([10, 15, 20, 25] as const);
        p2 = pick([40, 50, 60, 70] as const);
        const bEssai = (ligne1 * p1) / 100;
        const dEssai = (ligne2 * p2) / 100;
        // Le piège n'existe que si la ligne au PLUS FORT effectif concerné est
        // celle au PLUS FAIBLE taux, et que les deux comptes sont entiers.
        if (bEssai > dEssai && Number.isInteger(bEssai) && Number.isInteger(dEssai)) break;
      }
      const b = (ligne1 * p1) / 100;
      const d = (ligne2 * p2) / 100;
      const a = ligne1 - b;
      const c = ligne2 - d;
      const t: Tableau = {
        ctx,
        a,
        b,
        c,
        d,
        ligne1,
        ligne2,
        col1: a + c,
        col2: b + d,
        total: ligne1 + ligne2,
      };
      const groupe1 = lesQui(ctx, ctx.lignesQui[0]);
      const groupe2 = lesQui(ctx, ctx.lignesQui[1]);
      const bonne = groupe2;
      return {
        text:
          `Dans quel groupe la part ${de(ctx.individu)} qui ${ctx.colonnesQui[1]} est-elle la plus FORTE : ` +
          `${groupe1}, ou ${ceuxQui(ctx)} qui ${ctx.lignesQui[1]} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          groupe1,
          "la part est la même dans les deux groupes",
          "on ne peut pas comparer : les deux groupes n'ont pas le même effectif",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Comparer deux sous-populations de tailles différentes exige de passer par les fréquences conditionnelles : chaque effectif est rapporté à SA propre ligne.",
          "On calcule une fréquence par ligne, avec le total de cette ligne au dénominateur, puis on compare les deux pourcentages.",
          `« ${ctx.lignes[0]} » : $\\dfrac{${b}}{${ligne1}} = ${p1}\\,\\%$. ` +
            `« ${ctx.lignes[1]} » : $\\dfrac{${d}}{${ligne2}} = ${p2}\\,\\%$. ` +
            `En effectifs bruts, $${b}$ dépasse pourtant $${d}$ : c'est le piège.`,
          `La part est plus forte chez ${groupe2}, avec $${p2}\\,\\%$ contre $${p1}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: groupe1,
            cause: `a comparé les effectifs bruts ($${b}$ contre $${d}$) sans les rapporter à leur ligne`,
          },
          {
            choice: "on ne peut pas comparer : les deux groupes n'ont pas le même effectif",
            cause: "des effectifs différents n'empêchent pas la comparaison — c'est justement à cela que servent les fréquences",
          },
        ],
      };
    },
  },

  /* ═══════════════ don_freq_completer ═══════════════ */

  {
    kind: "template",
    id: "stmg_don_freq_completer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Une fréquence conditionnelle appliquée à sa population de référence redonne un effectif.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      // ⚠️ Un pourcentage rond NE SUFFIT PAS à rendre l'effectif entier : sur
      // une ligne de 475, 25 % font 118,75 — et la question demande « combien
      // cela représente-t-il d'abonnés ». Les fractions réduites des taux
      // employés sont /2, /4 et /5 : une ligne multiple de 20 les absorbe
      // toutes, donc l'effectif retrouvé est toujours un entier.
      const ctx = pick(CONTEXTES);
      const ligne1 = randomInt(5, 25) * 20;
      const ligne2 = randomInt(5, 25) * 20;
      const p1 = pick([20, 25, 40, 50, 60, 75, 80] as const);
      const a = (ligne1 * p1) / 100;
      const b = ligne1 - a;
      // c se tire DANS ligne2 : tiré indépendamment, il la dépassait et le
      // tableau affichait un effectif négatif.
      const c = randomInt(1, Math.floor(ligne2 / 10) - 1) * 10;
      const d = ligne2 - c;
      const t: Tableau = {
        ctx,
        a,
        b,
        c,
        d,
        ligne1,
        ligne2,
        col1: a + c,
        col2: b + d,
        total: ligne1 + ligne2,
      };
      return {
        text:
          `${amorce(ctx)} Le tableau est incomplet. On sait que, parmi ${lesQui(ctx, ctx.lignesQui[0])}, ` +
          `$${p1}\\,\\%$ ${ctx.colonnesQui[0]}. ` +
          pick([`Combien cela représente-t-il ${de(ctx.individu)} ?`, `Quel effectif faut-il écrire dans la case manquante ?`, `Combien ${de(ctx.individu)} cela fait-il ?`]),
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        canvas: canvasTableau(t, { masquer: "a" }),
        explanation: exp(
          "Une fréquence conditionnelle s'applique à sa population de référence : effectif $=$ fréquence $\\times$ effectif de référence.",
          "On identifie la population de référence — celle qui suit « parmi » —, puis on lui applique le pourcentage.",
          `La ligne « ${ctx.lignes[0]} » compte $${ligne1}$ ${ctx.individu}, et $${p1}\\,\\%$ de $${ligne1}$ font ` +
            `$${ligne1} \\times ${fr(p1 / 100)} = ${a}$.`,
          `Cela représente $${a}$ ${ctx.individu}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — remonter à la POPULATION DE RÉFÉRENCE. Le premier item applique
    // un pourcentage à une population connue ; celui-ci fait l'inverse : on
    // connaît le pourcentage et le résultat, on cherche la population. C'est
    // une division là où l'autre est une multiplication, et c'est la question
    // que pose un tableau de bord (« 45 retards, c'est 15 % — de combien ? »).
    //
    // ⚠️ La ligne concernée est ÉTEINTE dans le tableau, marges comprises :
    // affichée, elle donnerait la réponse et la question ne vaudrait plus rien.
    kind: "template",
    id: "stmg_don_freq_completer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Si $p\\,\\%$ de la population font $N$, alors la population vaut $N \\div \\dfrac{p}{100}$.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      // Ligne multiple de 20 : les taux employés se réduisent en /2, /4 et /5,
      // donc l'effectif annoncé tombe toujours juste (voir tpl_1).
      const ligne1 = randomInt(5, 25) * 20;
      const p = pick([20, 25, 40, 50, 60, 75, 80] as const);
      const a = (ligne1 * p) / 100;
      const b = ligne1 - a;
      const ligne2 = randomInt(5, 25) * 20;
      const c = randomInt(1, Math.floor(ligne2 / 10) - 1) * 10;
      const d = ligne2 - c;
      const t: Tableau = {
        ctx,
        a,
        b,
        c,
        d,
        ligne1,
        ligne2,
        col1: a + c,
        col2: b + d,
        total: ligne1 + ligne2,
      };
      return {
        text:
          `${amorce(ctx)} Parmi ${lesQui(ctx, ctx.lignesQui[0])}, $${p}\\,\\%$ ${ctx.colonnesQui[0]} ` +
          `— soit $${a}$ ${ctx.individu}. ` +
          `Combien ${de(ctx.individu)} ${ctx.lignesQui[0]} ?`,
        format: "short",
        expected: [String(ligne1)],
        comparator: "number_equal",
        canvas: canvasTableau(t, { avecMarges: false, masquer: ["a", "b"] }),
        explanation: exp(
          "Une fréquence conditionnelle relie trois nombres : la population de référence, le pourcentage, et l'effectif obtenu. Deux d'entre eux donnent toujours le troisième.",
          "On connaît le pourcentage et l'effectif : la population de référence s'obtient en DIVISANT l'effectif par la fréquence.",
          `$${a} \\div ${fr(p / 100)} = ${ligne1}$ — autrement dit, $${p}\\,\\%$ de $${ligne1}$ font bien $${a}$.`,
          `$${ligne1}$ ${ctx.individu} ${ctx.lignesQui[0]}.`
        ),
      };
    },
  },

  /* ═══════════════ don_freq_interpreter ═══════════════ */

  {
    kind: "template",
    id: "stmg_don_freq_interpreter_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère la population de référence : ce qui suit « parmi » ou « des ».",
    tags: ["stmg", "maths", "donnees", "canvas", "piege", "template"],
    generate: () => {
      const t = tirerTableau();
      const fLigne = t.a / t.ligne1;
      const fColonne = t.a / t.col1;
      const sens = pick(["ligne", "colonne"] as const);
      const phrase =
        sens === "ligne"
          ? `« $${pct(fLigne)}\\,\\%$ des ${t.ctx.individu} qui ${t.ctx.lignesQui[0]} ${t.ctx.colonnesQui[0]}. »`
          : `« $${pct(fColonne)}\\,\\%$ des ${t.ctx.individu} qui ${t.ctx.colonnesQui[0]} ${t.ctx.lignesQui[0]}. »`;
      const bonne =
        sens === "ligne"
          ? `tous ${lesQui(t.ctx, t.ctx.lignesQui[0])}`
          : `tous ${lesQui(t.ctx, t.ctx.colonnesQui[0])}`;
      return {
        text: `${amorce(t.ctx)} ${pick(["Un journal en tire", "Un communiqué en tire", "Une infographie en tire", "Un rapport annuel en tire"])} cette phrase : ${phrase}\n\n${pick(["Sur quelle population ce pourcentage a-t-il été calculé ?", "Quelle est la population de référence de ce pourcentage ?", "Ce pourcentage est calculé parmi quels individus ?"])}`,
        format: "qcm",
        choices: makeChoices(bonne, [
          sens === "ligne"
            ? `tous ${lesQui(t.ctx, t.ctx.colonnesQui[0])}`
            : `tous ${lesQui(t.ctx, t.ctx.lignesQui[0])}`,
          `les $${t.total}$ ${t.ctx.individu} de l'étude, en tout`,
          `tous ${lesQui(t.ctx, t.ctx.lignesQui[1])}`,
          `tous ${lesQui(t.ctx, t.ctx.colonnesQui[1])}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une fréquence conditionnelle dépend entièrement de sa population de référence : c'est elle qui figure au dénominateur.",
          "Dans une phrase, la population de référence est celle qui suit « parmi », ou celle que le complément « des … » désigne juste après le pourcentage.",
          `Ici la référence est ${bonne} : $\\dfrac{${t.a}}{${sens === "ligne" ? t.ligne1 : t.col1}} = ${pct(sens === "ligne" ? fLigne : fColonne)}\\,\\%$. ` +
            `En inversant la référence, on obtiendrait $${pct(sens === "ligne" ? fColonne : fLigne)}\\,\\%$ — un autre nombre, une autre phrase.`,
          `Le pourcentage porte sur ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `les $${t.total}$ ${t.ctx.individu} de l'étude, en tout`,
            cause: "a pris l'effectif total : ce serait une fréquence marginale, pas conditionnelle",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — ÉCRIRE la phrase juste, au lieu de décoder celle d'un autre.
    // Le premier item donne une phrase de journal et demande sur quelle
    // population elle porte ; celui-ci part du tableau et demande LAQUELLE des
    // quatre phrases est exacte. Le BO le demande explicitement pour ce
    // chapitre : « un travail sur la langue française en considérant les
    // formulations usuellement utilisées dans les médias ».
    //
    // Les trois fausses phrases sont les trois façons de se tromper, et une
    // seule : le bon nombre sur la mauvaise population, le mauvais nombre sur
    // la bonne, et la marginale prise pour une conditionnelle.
    kind: "template",
    id: "stmg_don_freq_interpreter_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d'abord la fréquence de la case dans SA ligne, puis lis chaque phrase en cherchant son dénominateur.",
    tags: ["stmg", "maths", "donnees", "canvas", "piege", "template"],
    generate: () => {
      // Les trois fréquences en jeu doivent être distinctes à l'arrondi :
      // sinon deux phrases deviennent vraies en même temps.
      let t = tirerTableau();
      for (let essai = 0; essai < 60; essai++) {
        const p = [t.a / t.ligne1, t.a / t.col1, t.col1 / t.total].map(pct);
        if (new Set(p).size === 3) break;
        t = tirerTableau();
      }
      const pLigne = pct(t.a / t.ligne1);
      const pColonne = pct(t.a / t.col1);
      const pMarginale = pct(t.col1 / t.total);
      const bonne =
        `$${pLigne}\\,\\%$ des ${t.ctx.individu} qui ${t.ctx.lignesQui[0]} ${t.ctx.colonnesQui[0]}.`;
      const inversee =
        `$${pLigne}\\,\\%$ des ${t.ctx.individu} qui ${t.ctx.colonnesQui[0]} ${t.ctx.lignesQui[0]}.`;
      const mauvaisNombre =
        `$${pColonne}\\,\\%$ des ${t.ctx.individu} qui ${t.ctx.lignesQui[0]} ${t.ctx.colonnesQui[0]}.`;
      const marginale =
        `$${pLigne}\\,\\%$ des ${t.ctx.individu}, en tout, ${t.ctx.colonnesQui[0]}.`;
      return {
        text: `${amorce(t.ctx)} ${pick(["D'après ce tableau, laquelle de ces quatre phrases est EXACTE ?", "Quelle phrase, reprise dans un article, décrit correctement ce tableau ?", "Parmi ces quatre formulations, laquelle est juste ?"])}`,
        format: "qcm",
        choices: makeChoices(bonne, [inversee, mauvaisNombre, marginale]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une phrase du type « $p\\,\\%$ des A sont B » annonce une fréquence conditionnelle : les A forment la population de référence, donc le DÉNOMINATEUR.",
          "On repère dans chaque phrase la population placée juste après le pourcentage, on calcule le quotient correspondant, et on compare au nombre annoncé.",
          `Case croisée : $${t.a}$. Rapportée à la ligne « ${t.ctx.lignes[0]} » ($${t.ligne1}$) : $${pLigne}\\,\\%$. ` +
            `Rapportée à la colonne « ${t.ctx.colonnes[0]} » ($${t.col1}$) : $${pColonne}\\,\\%$. ` +
            `La fréquence marginale de la colonne, elle, vaut $${pMarginale}\\,\\%$.`,
          `La phrase exacte est « ${bonne} » : $${pLigne}\\,\\%$ se rapporte bien ${aux(t.ctx)} qui ${t.ctx.lignesQui[0]}.`
        ),
        choiceDiagnostics: [
          {
            choice: inversee,
            cause: "a gardé le bon nombre mais échangé les deux populations : ce pourcentage-là vaudrait " + pColonne + " %",
          },
          {
            choice: mauvaisNombre,
            cause: "a divisé par le total de la colonne au lieu du total de la ligne",
          },
          {
            choice: marginale,
            cause: "a transformé une fréquence conditionnelle en fréquence marginale",
          },
        ],
      };
    },
  },

  /* ═══════════════ don_filtre_sous_ensemble ═══════════════ */

  {
    kind: "template",
    id: "stmg_don_filtre_sous_ens_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_sous_ensemble",
    difficulty: 2,
    theme: "neutral",
    hint: "Un filtre à un seul critère sélectionne une ligne entière, ou une colonne entière.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const quoi = pick(["ligne1", "ligne2", "col1", "col2"] as const);
      const eff = quoi === "ligne1" ? t.ligne1 : quoi === "ligne2" ? t.ligne2 : quoi === "col1" ? t.col1 : t.col2;
      const libelle =
        quoi === "ligne1" ? t.ctx.lignes[0] : quoi === "ligne2" ? t.ctx.lignes[1] : quoi === "col1" ? t.ctx.colonnes[0] : t.ctx.colonnes[1];
      const forme =
        quoi === "ligne1" ? t.ctx.lignesQui[0] : quoi === "ligne2" ? t.ctx.lignesQui[1] : quoi === "col1" ? t.ctx.colonnesQui[0] : t.ctx.colonnesQui[1];
      return {
        text: `Sur le tableur, on applique le filtre « ${libelle} » : il garde ${lesQui(t.ctx, forme)}. Combien ${de(t.ctx.individu)} sélectionne-t-il ?`,
        format: "short",
        expected: [String(eff)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Un filtre à un critère sélectionne tous les individus qui possèdent la modalité demandée, quelle que soit leur situation sur l'autre caractère.",
          "On additionne toute la ligne — ou toute la colonne — correspondant au critère.",
          `Le filtre « ${libelle} » retient l'effectif marginal $${eff}$.`,
          `Le filtre sélectionne $${eff}$ ${t.ctx.individu}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — retrouver LE FILTRE à partir du résultat. Le premier item
    // applique un filtre annoncé ; celui-ci donne le nombre de lignes obtenues
    // et fait remonter au critère. C'est le geste de quelqu'un qui reprend le
    // travail d'un autre sur un tableur : « il reste 260 lignes, qu'a-t-il
    // filtré ? »
    kind: "template",
    id: "stmg_don_filtre_sous_ens_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_sous_ensemble",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule les quatre marges du tableau, puis cherche celle qui vaut le nombre annoncé.",
    tags: ["stmg", "maths", "donnees", "canvas", "template"],
    generate: () => {
      const t = tirerTableauMargesDistinctes();
      const quoi = pick(["ligne1", "ligne2", "col1", "col2"] as const);
      const eff =
        quoi === "ligne1" ? t.ligne1 : quoi === "ligne2" ? t.ligne2 : quoi === "col1" ? t.col1 : t.col2;
      const nom = (cle: typeof quoi) =>
        cle === "ligne1"
          ? `« ${t.ctx.lignes[0]} »`
          : cle === "ligne2"
            ? `« ${t.ctx.lignes[1]} »`
            : cle === "col1"
              ? `« ${t.ctx.colonnes[0]} »`
              : `« ${t.ctx.colonnes[1]} »`;
      const bonne = nom(quoi);
      return {
        text:
          `Un filtre à un seul critère a été appliqué : il a sélectionné $${eff}$ ${t.ctx.individu}. ` +
          `Quel filtre a été appliqué ?`,
        format: "qcm",
        choices: makeChoices(
          bonne,
          (["ligne1", "ligne2", "col1", "col2"] as const).filter((c) => c !== quoi).map(nom)
        ),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t, { avecMarges: false }),
        explanation: exp(
          "Un filtre à un critère sélectionne tout un sous-ensemble : son effectif est un effectif marginal, donc le total d'une ligne ou d'une colonne.",
          "On calcule les quatre marges du tableau, puis on repère celle qui vaut le nombre annoncé.",
          `Lignes : $${t.ligne1}$ et $${t.ligne2}$. Colonnes : $${t.col1}$ et $${t.col2}$. ` +
            `Seule ${bonne} donne $${eff}$.`,
          `Le filtre appliqué est ${bonne}.`
        ),
      };
    },
  },

  /* ═══════════════════ don_filtre_et ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_filtre_et_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_et",
    difficulty: 2,
    theme: "neutral",
    hint: "Le filtre ET ne garde que les individus qui vérifient les DEUX critères : une seule case.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const i = pick([0, 1] as const);
      const j = pick([0, 1] as const);
      const valeur = i === 0 ? (j === 0 ? t.a : t.b) : j === 0 ? t.c : t.d;
      return {
        text:
          `Combien ${de(t.ctx.individu)} le filtre « ${t.ctx.lignes[i]} » ET « ${t.ctx.colonnes[j]} » sélectionne-t-il ? ` +
          `Autrement dit, combien ${t.ctx.lignesQui[i]} et ${t.ctx.colonnesQui[j]} ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Le connecteur ET impose les DEUX conditions simultanément : dans un tableau croisé, cela correspond à une seule case.",
          "On croise la ligne et la colonne, et l'on lit l'intersection.",
          `L'intersection de « ${t.ctx.lignes[i]} » et « ${t.ctx.colonnes[j]} » vaut $${valeur}$.`,
          `Le filtre sélectionne $${valeur}$ ${t.ctx.individu}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — DEUX connecteurs dans le même filtre. Le premier item fait
    // lire une case ; celui-ci compose ET avec NON, ce que fait n'importe quel
    // filtre de tableur réel (« Fournisseur A » et « pas conforme »). La case
    // est toujours unique, mais il faut l'atteindre en niant d'abord.
    kind: "template",
    id: "stmg_don_filtre_et_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_et",
    difficulty: 3,
    theme: "neutral",
    hint: "NON « X » désigne l'autre modalité de la même colonne : il n'y en a que deux.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const i = pick([0, 1] as const);
      // ⚠️ ON NIE TOUJOURS LA MODALITÉ POSITIVE — la première colonne. Nier la
      // seconde donnerait « NON "N'a pas renouvelé" » ou « NON "Lot non
      // conforme" » : une double négation, qui ne travaille plus le connecteur
      // mais la grammaire. Voir le commentaire du type `Contexte`.
      const j = 0 as const;
      // NON « colonne j » désigne l'autre colonne : la case cherchée est donc
      // celle de la ligne i et de la colonne opposée à j.
      const jOppose = (1 - j) as 0 | 1;
      const valeur = i === 0 ? (jOppose === 0 ? t.a : t.b) : jOppose === 0 ? t.c : t.d;
      const ligneEff = i === 0 ? t.ligne1 : t.ligne2;
      const casePosee = i === 0 ? (j === 0 ? t.a : t.b) : j === 0 ? t.c : t.d;
      return {
        text:
          `Combien ${de(t.ctx.individu)} le filtre « ${t.ctx.lignes[i]} » ET NON « ${t.ctx.colonnes[j]} » ` +
          `sélectionne-t-il ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "NON inverse un critère : puisque le caractère en colonne n'a que deux modalités, NON « une modalité » désigne exactement l'autre.",
          "On remplace d'abord le critère nié par son contraire, puis on applique le ET comme d'habitude : une seule case.",
          `NON « ${t.ctx.colonnes[j]} » désigne « ${t.ctx.colonnes[jOppose]} ». ` +
            `À l'intersection avec « ${t.ctx.lignes[i]} », on lit $${valeur}$ — ` +
            `ce qui se vérifie par $${ligneEff} - ${casePosee} = ${valeur}$.`,
          `Le filtre sélectionne $${valeur}$ ${t.ctx.individu}.`
        ),
      };
    },
  },

  /* ═══════════════════ don_filtre_ou ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_filtre_ou_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_ou",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionner la ligne et la colonne compte DEUX FOIS ceux qui vérifient les deux critères.",
    tags: ["stmg", "maths", "donnees", "canvas", "piege", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const i = pick([0, 1] as const);
      const j = pick([0, 1] as const);
      const ligne = i === 0 ? t.ligne1 : t.ligne2;
      const colonne = j === 0 ? t.col1 : t.col2;
      const inter = i === 0 ? (j === 0 ? t.a : t.b) : j === 0 ? t.c : t.d;
      const valeur = ligne + colonne - inter;
      return {
        text:
          `Combien ${de(t.ctx.individu)} le filtre « ${t.ctx.lignes[i]} » OU « ${t.ctx.colonnes[j]} » sélectionne-t-il ? ` +
          `Autrement dit, combien ${t.ctx.lignesQui[i]} ou ${t.ctx.colonnesQui[j]} ? ` +
          `(le « ou » mathématique n'est pas exclusif)`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Le connecteur OU retient les individus qui vérifient l'un des deux critères AU MOINS — donc aussi ceux qui vérifient les deux.",
          "On additionne la ligne et la colonne, puis on RETIRE une fois l'intersection, qui vient d'être comptée deux fois.",
          `$${ligne} + ${colonne} - ${inter} = ${valeur}$. ` +
            `Sans retirer l'intersection, on trouverait $${ligne + colonne}$, en comptant deux fois les $${inter}$ ${t.ctx.individu} qui vérifient les deux critères.`,
          `Le filtre sélectionne $${valeur}$ ${t.ctx.individu}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER l'erreur au lieu de l'éviter. Le premier item
    // demande le bon nombre ; celui-ci met l'élève devant un compte faux et lui
    // fait nommer la correction. On ne cherche plus un résultat, on cherche la
    // RAISON — et c'est ce qu'on retient du « ou » inclusif.
    kind: "template",
    id: "stmg_don_filtre_ou_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_ou",
    difficulty: 3,
    theme: "neutral",
    hint: "Ceux qui vérifient les DEUX critères ont été comptés dans la ligne, puis une seconde fois dans la colonne.",
    tags: ["stmg", "maths", "donnees", "canvas", "piege", "template"],
    generate: () => {
      const t = tirerTableau();
      const i = pick([0, 1] as const);
      const j = pick([0, 1] as const);
      const ligne = i === 0 ? t.ligne1 : t.ligne2;
      const colonne = j === 0 ? t.col1 : t.col2;
      const inter = i === 0 ? (j === 0 ? t.a : t.b) : j === 0 ? t.c : t.d;
      const bonne = `retirer une fois les $${inter}$ ${t.ctx.individu} qui vérifient les DEUX critères`;
      return {
        text:
          `Pour compter ${lesQui(t.ctx, t.ctx.lignesQui[i])} OU ${t.ctx.colonnesQui[j]}, ` +
          `un stagiaire additionne le total de la ligne et le total de la colonne : ` +
          `$${ligne} + ${colonne} = ${ligne + colonne}$. Que faut-il corriger ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `ajouter les $${inter}$ ${t.ctx.individu} qui vérifient les deux critères`,
          `retirer l'effectif total, soit $${t.total}$`,
          "rien : le compte est juste",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Le « ou » mathématique n'est pas exclusif : il retient les individus qui vérifient au moins l'un des deux critères, y compris ceux qui vérifient les deux.",
          "En additionnant la ligne entière et la colonne entière, on compte DEUX FOIS la case commune. On la retire donc une fois.",
          `$${ligne} + ${colonne} - ${inter} = ${ligne + colonne - inter}$, ` +
            `au lieu de $${ligne + colonne}$ : l'écart vaut exactement $${inter}$, l'effectif de la case commune.`,
          `Il faut retirer une fois les $${inter}$ ${t.ctx.individu} comptés deux fois.`
        ),
        choiceDiagnostics: [
          {
            choice: "rien : le compte est juste",
            cause: "a pris le « ou » pour une simple addition, en oubliant la case commune",
          },
          {
            choice: `ajouter les $${inter}$ ${t.ctx.individu} qui vérifient les deux critères`,
            cause: "a bien repéré la case commune, mais elle est en trop, pas en moins",
          },
        ],
      };
    },
  },

  /* ═══════════════════ don_filtre_non ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_filtre_non_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_non",
    difficulty: 2,
    theme: "neutral",
    hint: "Le filtre NON retient tout le reste : on retire du total.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      // Jamais NON sur la seconde colonne : « NON « N'a pas pris l'audioguide » »
      // est une double négation (voir le type `Contexte`).
      const quoi = pick(["ligne1", "ligne2", "col1"] as const);
      const eff = quoi === "ligne1" ? t.ligne1 : quoi === "ligne2" ? t.ligne2 : quoi === "col1" ? t.col1 : t.col2;
      const libelle =
        quoi === "ligne1" ? t.ctx.lignes[0] : quoi === "ligne2" ? t.ctx.lignes[1] : quoi === "col1" ? t.ctx.colonnes[0] : t.ctx.colonnes[1];
      return {
        text: `Combien ${de(t.ctx.individu)} le filtre NON « ${libelle} » sélectionne-t-il ?`,
        format: "short",
        expected: [String(t.total - eff)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Le connecteur NON sélectionne le COMPLÉMENTAIRE : tous les individus qui ne vérifient pas le critère.",
          "On retire l'effectif du critère à l'effectif total.",
          `$${t.total} - ${eff} = ${t.total - eff}$.`,
          `Le filtre sélectionne $${t.total - eff}$ ${t.ctx.individu}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — nier un ET, pas un critère simple. Le premier item retire une
    // marge du total ; celui-ci retire UNE CASE, parce que ce qu'on nie est un
    // croisement. La différence est exactement celle qui sépare « ni l'un ni
    // l'autre » de « pas les deux à la fois » — et c'est le contresens le plus
    // fréquent sur ce point du programme.
    kind: "template",
    id: "stmg_don_filtre_non_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_non",
    difficulty: 3,
    theme: "neutral",
    hint: "« Pas les deux à la fois » ne veut pas dire « ni l'un ni l'autre » : on ne retire qu'UNE case.",
    tags: ["stmg", "maths", "donnees", "canvas", "piege", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const i = pick([0, 1] as const);
      const j = pick([0, 1] as const);
      const inter = i === 0 ? (j === 0 ? t.a : t.b) : j === 0 ? t.c : t.d;
      const autre = i === 0 ? (j === 0 ? t.d : t.c) : j === 0 ? t.b : t.a;
      return {
        text:
          `On écarte seulement ${lesQui(t.ctx, t.ctx.lignesQui[i])} ET ${t.ctx.colonnesQui[j]}, les deux à la fois. ` +
          `Combien ${de(t.ctx.individu)} reste-t-il ?`,
        format: "short",
        expected: [String(t.total - inter)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Nier un ET, c'est écarter les individus qui vérifient les DEUX critères en même temps — et garder tous les autres, y compris ceux qui en vérifient un seul.",
          "On repère la case qui croise les deux critères, et on la retire de l'effectif total. Une seule case, pas une ligne entière.",
          `La case commune vaut $${inter}$, donc $${t.total} - ${inter} = ${t.total - inter}$. ` +
            `Attention : « ni l'un ni l'autre » aurait désigné la seule case opposée, soit $${autre}$ — un tout autre nombre.`,
          `Il reste $${t.total - inter}$ ${t.ctx.individu}.`
        ),
      };
    },
  },
];
