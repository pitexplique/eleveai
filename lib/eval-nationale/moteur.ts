// MOTEUR COMMUN DES ÉPREUVES BLANCHES de l'évaluation nationale du collège.
//
// Quatre épreuves sont prévues — 6ᵉ et 4ᵉ, français et maths. Elles partagent
// TOUT : le format (une diapositive qui glisse vers la droite, sans retour en
// arrière, par thèmes, chronométrée), la prise en main d'avant-épreuve, le
// tirage, le bilan par micro-compétence. Ce qui change d'une épreuve à
// l'autre tient dans une `ConfigEpreuve` : la banque où piocher, les thèmes,
// et la durée.
//
// LA CLASSE TESTÉE N'EST PAS LA CLASSE DE L'ÉLÈVE (le point posé par
// Frédéric) : l'évaluation de rentrée de 6ᵉ porte sur le CM2, celle de 4ᵉ sur
// la 5ᵉ. L'élève vient d'arriver — on mesure ce qu'il emporte, pas ce qu'il
// n'a pas encore appris. D'où `classe` (la sienne) et `classeSource` (le
// programme testé), qui ne sont jamais la même chose.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import type { SupportTexte } from "./supports";

/**
 * LES DEUX TESTS SPÉCIFIQUES DE L'ÉVALUATION OFFICIELLE, et le reste.
 *
 * Ils ne sont pas des domaines : ils les TRAVERSENT. Le test d'automatismes
 * pioche 15 questions dans « Nombres et calculs » et 8 dans « Grandeurs et
 * mesures » ; celui de résolution de problèmes, 10 et 9. Un item appartient
 * donc à la fois à un domaine et — parfois — à un test. L'élève reçoit cinq
 * groupes de maîtrise : trois pour les domaines, deux pour les tests.
 *
 * `autre` est la catégorie du document officiel lui-même : « items appartenant
 * à un domaine donné mais qui ne sont pas intégrés à un test spécifique ».
 * Tout « Espace et géométrie » est de ce type — aucun test spécifique n'y
 * touche.
 */
export type TypeItem = "automatisme" | "resolution_probleme" | "autre";

/**
 * LES SEUILS SONT DONNÉS EN NOMBRE DE RÉPONSES, PAS EN POURCENTAGE, et ils ne
 * sont pas les mêmes d'un domaine à l'autre (document professeur DEPP,
 * septembre 2025). Sur 30 questions en nombres et calculs il faut 17 bonnes
 * réponses pour être « satisfaisant » — 57 % ; sur 14 en géométrie, 9 — 64 %.
 * Appliquer un 30/60 uniforme rangeait donc des élèves dans le mauvais groupe.
 */
export type SeuilsMaitrise = {
  /** Au-dessus de ce nombre de bonnes réponses, on quitte « à besoins ». */
  aBesoinsMax: number;
  /** À partir de ce nombre de bonnes réponses, on est « satisfaisant ». */
  satisfaisantMin: number;
};

export type ThemeEval = {
  id: string;
  label: string;
  /** Ce que le thème recouvre, dit à l'élève avant d'y entrer. */
  quoi: string;
  /** Notions de la banque source qui l'alimentent. */
  notions: string[];
  nbQuestions: number;
  /**
   * COMMENT LES QUESTIONS DU DOMAINE SE RÉPARTISSENT entre les deux tests
   * spécifiques. Quand elle est présente, c'est elle qui commande le tirage —
   * `nbQuestions` n'est plus qu'un total, et doit valoir leur somme.
   * Absente, on tire comme avant, sans distinguer.
   */
  repartition?: { type: TypeItem; nbQuestions: number }[];
  /** Seuils officiels du domaine. Absents, on retombe sur 30 % / 60 %. */
  seuils?: SeuilsMaitrise;
  /**
   * TEXTES SUPPORTS — pour les thèmes de compréhension de l'écrit. Quand un
   * thème en a, l'épreuve tire UN support et pose SES questions à la suite,
   * le texte restant affiché. C'est ainsi que procède l'évaluation officielle
   * (dix questions sur un même texte littéraire), et c'est la seule façon de
   * tester la compréhension d'un texte plutôt que celle d'une phrase.
   * Les notions ci-dessus servent alors de secours, si tous les supports ont
   * déjà été vus.
   */
  supports?: SupportTexte[];
};

export type ConfigEpreuve = {
  /** Segment d'URL, ex. « 4e-maths ». */
  slug: string;
  /** La classe de l'élève : '6e' | '4e'. Va en base. */
  classe: string;
  /** 'maths' | 'francais'. Va en base. */
  matiere: string;
  /** Le programme réellement testé, ex. '5e'. Sert aussi à la remédiation. */
  classeSource: string;
  /** Comment on le dit à l'élève, ex. « la 5ᵉ ». */
  labelSource: string;
  matiereLabel: string;
  dureeSecondes: number;
  /**
   * L'ÉPREUVE REPREND LE VOLUME DU SUJET OFFICIEL, et pas seulement sa cadence.
   * Ce qu'on écrit à l'élève sur la page d'accueil en dépend, et ce n'est pas
   * un détail de formulation : lui promettre « la même épreuve » quand on lui
   * en pose un tiers, c'est lui mentir sur ce qu'il vient de mesurer.
   * Seule l'épreuve de 6ᵉ en maths est dans ce cas — le document professeur de
   * la DEPP en donne les effectifs exacts, aucun équivalent n'est publié pour
   * les trois autres.
   */
  volumeOfficiel?: boolean;
  /**
   * Ce que notre épreuve NE couvre pas de l'épreuve officielle, dit à l'élève
   * sur la page d'accueil. En français, la fluence n'est pas numérique et la
   * compréhension de l'oral demande un support audio : taire ces deux
   * domaines laisserait croire qu'on reproduit toute l'épreuve.
   */
  reserve?: string;
  themes: ThemeEval[];
  /**
   * LES TESTS SPÉCIFIQUES, qui traversent les domaines. Ils ne changent rien
   * au tirage — ce sont les `repartition` des domaines qui le font — mais ils
   * portent leur libellé et leurs seuils propres, et le bilan les rend à part.
   */
  testsSpecifiques?: {
    id: TypeItem;
    label: string;
    quoi: string;
    seuils: SeuilsMaitrise;
  }[];
  /**
   * Range une micro-compétence dans un test spécifique. Ce qui n'y figure pas
   * est « autre » — c'est le défaut, et c'est ce qui vaut pour les épreuves
   * qui ne connaissent pas les tests spécifiques.
   */
  typesMicro?: Map<string, TypeItem>;
  /** La banque où piocher — déjà transformée (zéro-clavier au primaire). */
  banque: TutorBankItemV4[];
  /** Libellés lisibles, portés par le knowledge et non par la banque. */
  labelsNotion: Map<string, string>;
  labelsMicro: Map<string, string>;
};

export function nbQuestions(config: ConfigEpreuve) {
  return config.themes.reduce((n, t) => n + t.nbQuestions, 0);
}

/** Où l'on renvoie l'élève pour retravailler une micro-compétence ratée. */
export function routeRemediation(
  config: ConfigEpreuve,
  notionId: string,
  microId: string,
) {
  return (
    `/tutor-v4?classe=${encodeURIComponent(config.classeSource)}` +
    `&matiere=${encodeURIComponent(config.matiere)}` +
    `&notion=${encodeURIComponent(notionId)}` +
    `&microId=${encodeURIComponent(microId)}&display=simple`
  );
}

/**
 * COMMENT LA QUESTION SE PRÉSENTE À L'ÉLÈVE.
 *
 * Le sujet officiel n'emploie qu'un seul type de question — le QCM à quatre
 * propositions, une juste et trois distracteurs — mais il l'affiche de DEUX
 * façons : « sous la forme d'une liste de cases à cocher » ou « sous la forme
 * d'un menu déroulant ». Ce n'est pas de la décoration : un menu déroulant se
 * lit après l'avoir ouvert, il masque les propositions tant qu'on n'a pas
 * cliqué, et il se manipule autrement. Un élève qui ne l'a jamais rencontré
 * perd du temps le jour J — ce que la prise en main est justement là pour
 * éviter.
 */
export type FormatReponse = "cases" | "liste";

/** Au-delà, une proposition n'entre pas lisiblement dans un menu déroulant. */
const LONGUEUR_MAX_LISTE = 40;

/**
 * ⚠️ LE FORMAT SE TIRE SUR L'EMPREINTE DE L'ÉNONCÉ, jamais au hasard : une
 * question doit garder le même habit d'un rendu à l'autre. Avec `Math.random`,
 * le moindre re-rendu de React aurait fait passer la question de la liste aux
 * cases sous les yeux de l'élève.
 *
 * Une sur quatre en menu déroulant : le document officiel dit le QCM en cases
 * « majoritairement employé », et une épreuve où le format alterne sans cesse
 * mesurerait l'agilité plutôt que les mathématiques.
 */
function formatDe(q: QuestionEval): FormatReponse {
  if (q.choices.some((c) => c.length > LONGUEUR_MAX_LISTE)) return "cases";
  // ⛔ NI LATEX NI MARKDOWN DANS UN MENU DÉROULANT. Les propositions passent
  // partout ailleurs par `MarkdownMath` ; une <option> ne rend que du texte
  // brut, et une fraction y apparaîtrait telle quelle — « \dfrac{1}{2} ».
  if (q.choices.some((c) => /[$\\^_{}]/.test(c))) return "cases";
  return parseInt(q.cle, 36) % 4 === 0 ? "liste" : "cases";
}

export type QuestionEval = {
  /**
   * CE QU'ON MÉMORISE POUR NE PAS LE REVOIR — et ce n'est pas l'identifiant de
   * l'item (corrigé le 01/08). Un item `template` porte un seul id pour tout
   * son pool : le marquer « vu » après un tirage brûlait ses sept à treize
   * énoncés d'un coup. Mesuré : l'épreuve de français de 6ᵉ n'allait pas
   * au-delà de quatre passages complets. La clé est donc l'id pour un item
   * fixe, et l'id PLUS l'empreinte de l'énoncé pour un gabarit.
   */
  cle: string;
  /** Identifiant de l'item d'origine (un gabarit en produit plusieurs énoncés). */
  itemId: string;
  themeId: string;
  themeLabel: string;
  notionId: string;
  notionLabel: string;
  microId: string;
  microLabel: string;
  /** Le test spécifique dont relève la question, « autre » sinon. */
  typeItem: TypeItem;
  /** Comment la question s'affiche. Posé par `tirerEpreuve`, « cases » sinon. */
  format?: FormatReponse;
  text: string;
  choices: string[];
  expected: string[];
  explanation?: string;
  canvas?: CanvasFigure;
  /** Le texte à lire, affiché au-dessus de la question et gardé pendant toute
   *  la série tirée sur ce support. */
  support?: {
    kicker: string;
    titre: string;
    source: string;
    texte: string;
    /** Présent = support ORAL : le texte se joue, il ne s'affiche pas. */
    oral?: { ecoutes: number };
  };
};

export type EpreuveEval = {
  questions: QuestionEval[];
  dureeSecondes: number;
};

// ─── Tirage ───────────────────────────────────────────────────────────────────

/** Empreinte courte d'un énoncé — on en stocke des centaines côté navigateur. */
function empreinte(texte: string): string {
  let h = 0;
  for (let i = 0; i < texte.length; i += 1) {
    h = (h * 31 + texte.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}

function melanger<T>(liste: readonly T[]): T[] {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/**
 * Les propositions d'un QCM, sans doublon — filet posé le 02/08/2026.
 * Certains gabarits produisent un piège qui coïncide avec la bonne réponse
 * pour certains tirages : l'élève voyait alors deux lignes identiques, toutes
 * les deux justes. Le jour d'une épreuve, ça se paie cher. Ici on n'affiche la
 * ligne qu'une fois ; le vrai correctif est dans la banque, et
 * `scripts/verifier-doublons-choix.ts` liste ce qui reste à réécrire.
 * On compare les chaînes rognées : une espace de plus ne fait pas une autre
 * proposition pour celui qui lit.
 */
function sansDoublon(choices: readonly string[]): string[] {
  const vus = new Set<string>();
  return choices.filter((c) => {
    const k = c.trim();
    if (vus.has(k)) return false;
    vus.add(k);
    return true;
  });
}

/** Dans quel test spécifique tombe une micro-compétence. « autre » par défaut. */
function typeDeMicro(config: ConfigEpreuve, microId: string): TypeItem {
  return config.typesMicro?.get(microId) ?? "autre";
}

/**
 * Rend l'item jouable : un `template` se génère à la volée, un `fixed` se
 * prend tel quel. On ne garde que ce qui a des propositions — l'épreuve se
 * corrige toute seule. Les propositions sont remélangées : dans nos banques
 * la bonne réponse est souvent en première position, ce qui la trahirait.
 */
function materialiser(
  item: TutorBankItemV4,
  config: ConfigEpreuve,
): QuestionEval | null {
  const genere =
    item.kind === "template"
      ? ({ ...item, ...item.generate() } as Record<string, unknown>)
      : (item as unknown as Record<string, unknown>);

  const brutes = genere.choices as string[] | undefined;
  const expected = genere.expected as string[] | undefined;
  const text = genere.text as string | undefined;

  // On déduplique AVANT de contrôler : sans ça, une question réduite à une
  // seule proposition par le filet passerait le test « au moins deux ».
  const choices = brutes ? sansDoublon(brutes) : undefined;

  if (!text) return null;
  if (!choices || choices.length < 2) return null;
  if (!expected || expected.length !== 1) return null;
  if (!choices.includes(expected[0])) return null;

  return {
    // L'empreinte de l'ÉNONCÉ, pas de l'item : deux gabarits différents
    // peuvent produire la même question, et c'est la question que l'élève
    // reconnaît — pas son origine.
    cle: empreinte(text),
    itemId: item.id,
    themeId: "",
    themeLabel: "",
    notionId: item.notionId,
    notionLabel: config.labelsNotion.get(item.notionId) ?? item.notionId,
    microId: item.microId,
    microLabel: config.labelsMicro.get(item.microId) ?? item.microId,
    typeItem: typeDeMicro(config, item.microId),
    text,
    choices: melanger(choices),
    expected,
    explanation: genere.explanation as string | undefined,
    canvas: genere.canvas as CanvasFigure | undefined,
  };
}

/**
 * Tire les questions d'un thème en TOURNANT sur ses notions plutôt qu'en
 * piochant au hasard dans le tas : sans ça, une notion à 200 items rafle les
 * cinq questions et le thème ne teste qu'elle.
 */
function tirerTheme(
  theme: ThemeEval,
  config: ConfigEpreuve,
  dejaVus: Set<string>,
  textesDuTirage: Set<string>,
): QuestionEval[] {
  // ── LE THÈME EST PORTÉ PAR UN TEXTE ─────────────────────────────────────
  // On choisit d'abord un support dont l'élève n'a pas déjà vu les questions.
  // Si tous ont servi, on retombe sur le tirage ordinaire dans les notions :
  // mieux vaut une question isolée qu'un texte relu par cœur.
  if (theme.supports?.length) {
    // ON CLASSE PAR QUESTIONS NEUVES, PAS PAR QUESTIONS VUES (corrigé le
    // 01/08, en ajoutant les troisièmes supports). Les deux revenaient au même
    // tant que tous les supports avaient cinq questions ; ils divergent dès
    // qu'un support en porte huit et un autre cinq — le moins vu n'est alors
    // pas le plus disponible. Et l'on prend le premier qui a DE QUOI TENIR le
    // thème, pas le premier tout court : sinon un support à une seule question
    // neuve faisait basculer tout le thème vers le repli, alors qu'un autre
    // était intact.
    const neuvesDe = (s: SupportTexte) =>
      s.questions.filter((q) => !dejaVus.has(empreinte(q.text)));
    const dispos = melanger(theme.supports).sort(
      (a, b) => neuvesDe(b).length - neuvesDe(a).length,
    );
    const support =
      dispos.find((s) => neuvesDe(s).length >= theme.nbQuestions) ?? dispos[0];
    const neuves = neuvesDe(support);

    if (neuves.length >= theme.nbQuestions) {
      return melanger(neuves)
        .slice(0, theme.nbQuestions)
        .map((q) => {
          textesDuTirage.add(q.text);
          return {
            cle: empreinte(q.text),
            itemId: `${support.id}_${q.microId}`,
            themeId: theme.id,
            themeLabel: theme.label,
            notionId: q.notionId,
            notionLabel: config.labelsNotion.get(q.notionId) ?? q.notionId,
            microId: q.microId,
            microLabel: config.labelsMicro.get(q.microId) ?? q.microId,
            typeItem: typeDeMicro(config, q.microId),
            text: q.text,
            choices: melanger(sansDoublon(q.choices)),
            expected: [q.expected],
            explanation: q.explanation,
            support: {
              kicker: support.kicker,
              titre: support.titre,
              source: support.source,
              texte: support.texte,
              oral: support.oral,
            },
          };
        });
    }

    // ⚠️ PAS DE REPLI POUR L'ORAL. Quand un thème visuel a épuisé ses textes,
    // retomber sur la banque reste honnête : ce sont des questions de lecture.
    // Pour l'oral, non — la banque contient des questions SUR la pratique de
    // l'oral, qu'on lit à l'écran. Les servir sous un thème intitulé
    // « Comprendre ce qu'on écoute », sans rien à écouter, serait un mensonge
    // d'étiquette. Le thème disparaît alors de l'épreuve, et le bilan avec
    // (il ne garde que les thèmes qui ont des questions).
    if (theme.supports.some((s) => s.oral)) return [];
  }

  // ── LE TIRAGE ORDINAIRE, TRANCHE PAR TRANCHE ────────────────────────────
  // Sans `repartition`, il n'y a qu'une tranche et rien ne change pour les
  // trois autres épreuves. Avec, on tire séparément les questions de chaque
  // test spécifique : leurs effectifs sont fixés par le sujet officiel — en
  // nombres et calculs, 15 automatismes et 10 problèmes, et pas l'inverse.
  // Tirer 30 questions d'un coup dans le domaine donnerait le bon total et la
  // mauvaise épreuve.
  const tranches: { type: TypeItem; nbQuestions: number }[] =
    theme.repartition ?? [{ type: "autre", nbQuestions: theme.nbQuestions }];

  // PARTAGÉ ENTRE LES TRANCHES : une micro-compétence prise en automatismes ne
  // doit pas revenir en résolution de problèmes. Le bilan doit couvrir large.
  const microsPris = new Set<string>();

  return tranches.flatMap((tranche) =>
    tirerTranche(
      theme,
      config,
      tranche,
      Boolean(theme.repartition),
      dejaVus,
      textesDuTirage,
      microsPris,
    ),
  );
}

/**
 * Une tranche du tirage : les questions d'un même test spécifique, prises en
 * TOURNANT sur les notions du domaine plutôt qu'en piochant au hasard dans le
 * tas — sans ça, une notion à 200 items rafle tout et le domaine ne teste
 * qu'elle.
 */
function tirerTranche(
  theme: ThemeEval,
  config: ConfigEpreuve,
  tranche: { type: TypeItem; nbQuestions: number },
  filtrerParType: boolean,
  dejaVus: Set<string>,
  textesDuTirage: Set<string>,
  microsPris: Set<string>,
): QuestionEval[] {
  // AUCUN PRÉ-FILTRE SUR L'ID : on ne peut juger qu'après génération, puisque
  // « déjà vu » porte désormais sur l'énoncé et non sur l'item. Le type, lui,
  // se lit sur la micro-compétence sans rien générer : il se filtre ici.
  const parNotion = melanger(theme.notions).map((notionId) =>
    melanger(
      config.banque.filter(
        (item) =>
          item.notionId === notionId &&
          (!filtrerParType ||
            typeDeMicro(config, item.microId) === tranche.type),
      ),
    ),
  );

  const questions: QuestionEval[] = [];

  // Deux passes : la première refuse deux fois la même micro-compétence
  // (le bilan doit couvrir large), la seconde accepte tout pour compléter.
  for (const strict of [true, false]) {
    // ⚠️ COMPTEUR REMIS À ZÉRO À CHAQUE PASSE. Partagé, il était épuisé par la
    // passe stricte — qui tourne à vide une fois toutes les micro-compétences
    // prises, puisque les recalés lui reviennent — et la passe permissive
    // n'était alors jamais exécutée. C'est ce qui laissait l'épreuve de
    // français de 4ᵉ à 19 questions sur 20.
    let tour = 0;
    while (questions.length < tranche.nbQuestions && tour < 400) {
      tour += 1;
      let piocheFaite = false;

      for (const pile of parNotion) {
        if (questions.length >= tranche.nbQuestions) break;
        if (!pile.length) continue;
        piocheFaite = true;

        // ON DÉPILE JUSQU'À TROUVER UN ITEM JOUABLE (corrigé le 01/08).
        // Avant, un seul essai par notion et par tour : si l'item tiré
        // n'était pas un QCM, la notion passait son tour. Or les banques
        // sont très inégales — en 5ᵉ, 8 QCM sur 50 items pour les opérations
        // avec les relatifs, contre 40 pour l'algorithmique. Résultat : les
        // notions pauvres en QCM disparaissaient de l'épreuve, et le thème
        // « nombres et calcul » ne testait ni les opérations sur les
        // relatifs ni le calcul littéral. La couverture suivait la forme des
        // items au lieu de suivre le programme.
        let retenue: QuestionEval | null = null;
        let microRetenu = "";
        // LES RECALÉS SONT RENDUS À LA PILE (corrigé le 01/08). La passe
        // stricte refuse un item dont la micro-compétence est déjà prise —
        // mais elle le JETAIT, alors que la seconde passe, elle, l'aurait
        // accepté. Un thème bâti sur une seule notion (« la phrase et les
        // accords », 4 micro-compétences) ne pouvait donc pas atteindre ses
        // 5 questions : mesuré, l'épreuve de français de 4ᵉ sortait 19/20 dès
        // le premier passage.
        const recales: typeof pile = [];
        while (pile.length) {
          const item = pile.pop()!;
          if (strict && microsPris.has(item.microId)) {
            recales.push(item);
            continue;
          }
          const candidat = materialiser(item, config);
          // Déjà tombé lors d'un passage précédent, ou déjà dans CETTE
          // épreuve : deux gabarits différents peuvent produire le même
          // énoncé.
          if (
            !candidat ||
            dejaVus.has(candidat.cle) ||
            textesDuTirage.has(candidat.text)
          ) {
            continue;
          }
          retenue = candidat;
          microRetenu = item.microId;
          break;
        }
        pile.push(...recales);
        if (!retenue) continue;

        textesDuTirage.add(retenue.text);
        microsPris.add(microRetenu);
        questions.push({
          ...retenue,
          themeId: theme.id,
          themeLabel: theme.label,
        });
      }

      if (!piocheFaite) break;
    }
    if (questions.length >= tranche.nbQuestions) break;
  }

  return questions;
}

/**
 * @param dejaVus identifiants des items déjà rencontrés lors des passages
 *   précédents — l'élève doit pouvoir refaire l'épreuve sans la revoir.
 */
export function tirerEpreuve(
  config: ConfigEpreuve,
  dejaVus: string[] = [],
): EpreuveEval {
  const vus = new Set(dejaVus);
  // Partagé entre les thèmes : un même énoncé ne doit pas tomber deux fois
  // dans la même épreuve, fût-ce sous deux notions différentes.
  const textesDuTirage = new Set<string>();
  const questions = config.themes
    .flatMap((theme) => tirerTheme(theme, config, vus, textesDuTirage))
    // L'habit se pose EN DERNIER, quand l'énoncé et ses propositions sont
    // arrêtés : il se décide sur eux.
    .map((q) => ({ ...q, format: formatDe(q) }));

  return { questions, dureeSecondes: config.dureeSecondes };
}

// ─── Le bilan ─────────────────────────────────────────────────────────────────

export type BilanMicro = {
  microId: string;
  microLabel: string;
  notionId: string;
  notionLabel: string;
  reussi: boolean;
};

// ─── Les groupes de maîtrise ──────────────────────────────────────────────────
// LE VOCABULAIRE DE L'INSTITUTION, PAS LE NÔTRE (Frédéric, 01/08, document
// éduscol à l'appui). L'évaluation nationale ne rend pas une note : elle range
// dans trois groupes — « à besoins », « fragile », « satisfaisant » — et le
// professeur reçoit sa classe dans ces termes-là. Parler la même langue que le
// bilan officiel, c'est ce qui rend le nôtre lisible pour lui.
//
// LES SEUILS. Deux régimes, et le second est le bon quand on les connaît.
//
// Quand l'épreuve porte les seuils officiels (`theme.seuils`), on les applique
// tels quels, EN NOMBRE DE RÉPONSES. Ils ne se déduisent d'aucune règle : le
// document professeur DEPP de septembre 2025 les fixe domaine par domaine, et
// ils ne tombent pas sur les mêmes proportions — 17/30 en nombres et calculs
// (57 %), 10/18 en grandeurs et mesures (56 %), 9/14 en espace et géométrie
// (64 %), 13/23 en automatismes, 10/19 en résolution de problèmes.
//
// À défaut — les trois autres épreuves, dont aucune n'a de barème publié —
// on garde le 30 % / 60 % appliqué en proportion. C'est une approximation,
// elle est désormais nommée comme telle.
//
// LE TON : UN MIX, ET IL EST DÉLIBÉRÉ (Frédéric, 01/08).
//
// Les descriptions officielles enveloppent — jusqu'au groupe « à besoins »,
// décrit par ce que l'élève « est éventuellement capable » de faire. Dit à un
// enfant qui a 6 sur 20, ce n'est pas de la bienveillance : c'est du coussin,
// et il le sent. Frédéric : « bienveillance à la con ».
//
// Mais tout dire à sec ne vaut pas mieux : un enfant à qui l'on annonce « ce
// n'est pas acquis » et rien d'autre ferme la page.
//
// D'où DEUX TEMPS, et la structure du code les tient séparés pour qu'on ne
// puisse pas les confondre en les réécrivant :
//   `constat` — ce qui est là, dit sans flatterie. C'est leur apport : on
//               commence par ce que l'élève tient, pas par ce qui manque.
//   `geste`   — ce qu'il fait maintenant, dit sans détour. C'est le nôtre :
//               un élève qu'on informe peut agir, un élève qu'on rassure
//               reste où il est.

export type GroupeMaitrise = "a_besoins" | "fragile" | "satisfaisant";

export const GROUPES: Record<
  GroupeMaitrise,
  { label: string; constat: string; geste: string; couleur: string }
> = {
  satisfaisant: {
    label: "Satisfaisant",
    constat: "Ce que tu sais là-dessus tient.",
    geste: "Passe à la suite : tu n'as rien à reprendre ici.",
    couleur: "text-cyan-800",
  },
  fragile: {
    label: "Fragile",
    constat: "Tu sais faire — pas encore à tous les coups.",
    geste:
      "Ce qui manque, ce sont des passages, pas des explications. Reprends les compétences de droite, elles y sont presque.",
    couleur: "text-amber-700",
  },
  a_besoins: {
    label: "À besoins",
    constat: "Il y a des bases, elles ne portent pas encore ici.",
    geste:
      "Reprends par la première compétence de la liste, une seule à la fois. Il n'y a pas de raccourci — et c'est la seule mauvaise nouvelle.",
    couleur: "text-red-800",
  },
};

export function groupeDeMaitrise(
  justes: number,
  total: number,
  seuils?: SeuilsMaitrise,
): GroupeMaitrise {
  if (total === 0) return "a_besoins";
  if (seuils) {
    if (justes >= seuils.satisfaisantMin) return "satisfaisant";
    if (justes > seuils.aBesoinsMax) return "fragile";
    return "a_besoins";
  }
  const pct = (justes / total) * 100;
  if (pct >= 60) return "satisfaisant";
  if (pct > 30) return "fragile";
  return "a_besoins";
}

export type BilanTheme = {
  themeId: string;
  themeLabel: string;
  justes: number;
  total: number;
  micros: BilanMicro[];
  /** Seuils à appliquer à CE bloc — déjà ramenés au nombre de questions
   *  réellement posées. Absents, on retombe sur les pourcentages. */
  seuils?: SeuilsMaitrise;
};

/**
 * LES SEUILS OFFICIELS SUPPOSENT L'ÉPREUVE ENTIÈRE. Si une tranche n'a pas pu
 * être remplie — banque à sec sur un type, ou tout déjà vu lors des passages
 * précédents — le domaine sort avec moins de questions que prévu, et un seuil
 * absolu se retourne contre l'élève : exiger 9 bonnes réponses sur 14, c'est
 * lui laisser 5 erreurs ; exiger les mêmes 9 sur 11 questions posées, plus que
 * 2. On ramène donc le seuil au nombre de questions réellement posées.
 */
function seuilsAjustes(
  theme: ThemeEval,
  total: number,
): SeuilsMaitrise | undefined {
  if (!theme.seuils) return undefined;
  if (total === theme.nbQuestions || theme.nbQuestions === 0) {
    return theme.seuils;
  }
  const ratio = total / theme.nbQuestions;
  return {
    aBesoinsMax: Math.round(theme.seuils.aBesoinsMax * ratio),
    satisfaisantMin: Math.ceil(theme.seuils.satisfaisantMin * ratio),
  };
}

export function construireBilan(
  config: ConfigEpreuve,
  questions: QuestionEval[],
  reponses: Record<number, string>,
): BilanTheme[] {
  return config.themes
    .map((theme) => {
      const micros: BilanMicro[] = [];
      let justes = 0;
      let total = 0;

      questions.forEach((q, index) => {
        if (q.themeId !== theme.id) return;
        total += 1;
        const reussi = reponses[index] === q.expected[0];
        if (reussi) justes += 1;
        micros.push({
          microId: q.microId,
          microLabel: q.microLabel,
          notionId: q.notionId,
          notionLabel: q.notionLabel,
          reussi,
        });
      });

      return {
        themeId: theme.id,
        themeLabel: theme.label,
        justes,
        total,
        micros,
        seuils: seuilsAjustes(theme, total),
      };
    })
    .filter((t) => t.total > 0);
}

/**
 * LE BILAN DES TESTS SPÉCIFIQUES — la seconde moitié de ce que rend
 * l'évaluation officielle, et celle qui manquait.
 *
 * Il ne se déduit pas du bilan par domaine : un test spécifique les traverse.
 * Les 23 questions d'automatismes sont dispersées entre « Nombres et calculs »
 * et « Grandeurs et mesures », et c'est leur total à elles qui décide du
 * groupe. Un élève peut donc être satisfaisant en nombres et calculs et à
 * besoins en automatismes — c'est même l'information la plus utile au
 * professeur, puisqu'elle dit que ce qui manque, ce sont des réflexes et non
 * des connaissances.
 */
export function construireBilanTests(
  config: ConfigEpreuve,
  questions: QuestionEval[],
  reponses: Record<number, string>,
): BilanTheme[] {
  if (!config.testsSpecifiques?.length) return [];

  // L'effectif officiel du test : la somme de ce que les domaines lui donnent.
  const attenduDe = (type: TypeItem) =>
    config.themes.reduce(
      (n, t) =>
        n +
        (t.repartition ?? []).reduce(
          (m, r) => m + (r.type === type ? r.nbQuestions : 0),
          0,
        ),
      0,
    );

  return config.testsSpecifiques
    .map((test) => {
      const micros: BilanMicro[] = [];
      let justes = 0;
      let total = 0;

      questions.forEach((q, index) => {
        if (q.typeItem !== test.id) return;
        total += 1;
        const reussi = reponses[index] === q.expected[0];
        if (reussi) justes += 1;
        micros.push({
          microId: q.microId,
          microLabel: q.microLabel,
          notionId: q.notionId,
          notionLabel: q.notionLabel,
          reussi,
        });
      });

      return {
        themeId: test.id,
        themeLabel: test.label,
        justes,
        total,
        micros,
        // On réutilise l'ajusteur des domaines : un test spécifique tronqué
        // pose exactement le même piège.
        seuils: seuilsAjustes(
          {
            id: test.id,
            label: test.label,
            quoi: test.quoi,
            notions: [],
            nbQuestions: attenduDe(test.id),
            seuils: test.seuils,
          },
          total,
        ),
      };
    })
    .filter((t) => t.total > 0);
}
