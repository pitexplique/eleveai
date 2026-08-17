// LES GABARITS DU COACH IA — un item, plusieurs questions.
//
// POURQUOI (16/08/2026). Les 230 questions Pix sont toutes figées : une
// question écrite, une question servie. Rapporté aux 95 savoir-faire, cela
// fait une médiane de DEUX questions chacun. Un coach sert à revenir sans
// retomber sur la même : à deux, l'élève a tout vu au troisième passage. Et
// tout ce qu'on veut construire ensuite puise dans la même réserve — le défi
// du jour le plus vorace de tous.
//
// Le reste du dépôt a réglé cela depuis longtemps : un générateur bat dix
// items figés. Le coach IA n'en avait aucun. Ironie du chantier, les seules
// bonnes mécaniques étaient dans les banques A1→C1 qu'on remplace —
// `vraiFauxTemplate` et `scenarioTemplate`. C'est d'elles qu'on garde
// quelque chose, pas de leurs questions.
//
// ⚠️ CE QUI COMPTE, C'EST LA QUESTION, PAS L'HABILLAGE. Un gabarit qui tire
// « la boulangerie Vanille » puis « le garage Delmas » sur le même
// raisonnement produit deux textes et UNE question. La clé d'une question,
// c'est son énoncé ET ses propositions (cf scripts/echantillon-banque.mjs).
// Les réservoirs ci-dessous changent donc le CAS traité, jamais le décor.
//
// ⚠️ QUATRE PROPOSITIONS, JAMAIS DEUX. L'ancien coach IA comptait 49 items en
// vrai/faux, soit un quart de sa banque à pile ou face. Un élève qui ne sait
// pas y avait une chance sur deux, et le score ne mesurait plus rien. Les deux
// helpers d'ici rendent toujours quatre lignes.
//
// CONVENTION : `choices[0]` est la bonne réponse, comme partout dans
// lib/pix-ia. Le mélange a lieu à l'affichage (`shuffle` côté éval,
// `shuffleChoices` côté coach), jamais ici.

import type { PixQuestion } from "../questionTypes";
import { contentFingerprint } from "@/lib/tutor-v4/fingerprint";

/** Un gabarit produit une question différente à chaque tirage. */
export type PixGabarit = {
  /** Identifiant stable du GABARIT (pas de la question qu'il tire). */
  id: string;
  microskillId: string;
  /**
   * `ctx.eviter` = les empreintes déjà servies récemment. Les trois helpers
   * d'ici s'en servent pour TIRER SANS REMISE dans leur réservoir : un seul
   * appel, du neuf garanti tant qu'il reste un cas non vu.
   */
  generate: (ctx?: { eviter?: ReadonlySet<string> }) => PixQuestion;
};

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Tire un cas dont la question n'a pas déjà été servie.
 *
 * On construit la question de CHAQUE cas — trois concaténations de chaînes, le
 * coût est négligeable — on écarte celles dont l'empreinte est déjà connue, et
 * on tire dans ce qui reste. Quand tout a été vu, on reprend le réservoir
 * entier : mieux vaut une répétition qu'un écran vide.
 *
 * ⚠️ L'empreinte doit être calculée EXACTEMENT comme le fera le moteur, sans
 * quoi le filtre porterait à côté. D'où l'import de `contentFingerprint`
 * plutôt qu'une copie locale : deux définitions qui divergent, et le tri ne
 * trie plus rien.
 */
function tirerSansRemise<T>(
  pool: readonly T[],
  question: (cas: T) => { text: string; choices: string[] },
  eviter?: ReadonlySet<string>,
): T {
  if (!eviter || eviter.size === 0) return pick(pool);

  const neufs = pool.filter((cas) => {
    const q = question(cas);
    return !eviter.has(contentFingerprint(q.text, q.choices));
  });

  return pick(neufs.length > 0 ? neufs : pool);
}

/**
 * MISE EN SITUATION — un cas concret, quatre réactions possibles.
 *
 * Le cas change à chaque tirage, et avec lui le raisonnement demandé : ce
 * n'est pas le même exercice reformulé, c'est une autre situation.
 * Les trois pièges sont écrits AVEC le cas, parce qu'une erreur plausible
 * dépend de la situation — un piège générique redevient une blague.
 */
export type CasSituation = {
  /** Le cas, tel que l'élève le lit. */
  cas: string;
  bonne: string;
  /** Trois erreurs que des élèves font vraiment, de longueur comparable. */
  pieges: [string, string, string];
  pourquoi: string;
};

export function situation(opts: {
  id: string;
  microskillId: string;
  /** La question posée après le cas. Par défaut : « Que fais-tu ? ». */
  consigne?: string;
  pool: CasSituation[];
}): PixGabarit {
  const enonce = (c: CasSituation) => ({
    text: `${c.cas}\n\n${opts.consigne ?? "Que fais-tu ?"}`,
    choices: [c.bonne, ...c.pieges],
  });

  return {
    id: opts.id,
    microskillId: opts.microskillId,
    generate: (ctx) => {
      const c = tirerSansRemise(opts.pool, enonce, ctx?.eviter);
      return {
        microskillId: opts.microskillId,
        ...enonce(c),
        explanation: c.pourquoi,
      };
    },
  };
}

/**
 * CLASSEMENT — à quelle famille ce cas appartient-il ?
 *
 * Les quatre propositions sont les MÊMES à chaque tirage : ce sont les
 * familles du référentiel. Deux conséquences heureuses. La longueur ne
 * désigne plus rien, puisque les intitulés ne bougent pas ; et l'élève doit
 * vraiment distinguer les familles entre elles, ce qu'aucune question à
 * distracteurs jetables ne demande.
 */
export function classer(opts: {
  id: string;
  microskillId: string;
  consigne: string;
  /** Les familles proposées. Il en faut au moins quatre. */
  familles: string[];
  pool: { cas: string; famille: string; pourquoi: string }[];
}): PixGabarit {
  /* On garde la bonne famille et trois autres. Le choix des trois est
     DÉTERMINISTE, dérivé du cas lui-même — pas tiré au hasard.
     ⚠️ Ce n'est pas un détail. Une question a pour empreinte son énoncé plus
     ses propositions : si les propositions changeaient d'un tirage à l'autre,
     un même cas produirait plusieurs empreintes, le compteur de vivier
     annoncerait des questions qui n'en sont pas, et le tirage sans remise ne
     saurait plus reconnaître ce qui a déjà été servi.
     À quatre familles, les « autres » sont toujours les trois restantes : cela
     ne changeait déjà rien. Le jour où une liste en comptera cinq, ce choix
     déterministe évitera le piège. */
  const autresDe = (c: { cas: string; famille: string }) => {
    const restantes = opts.familles.filter((f) => f !== c.famille);
    if (restantes.length <= 3) return restantes;
    const depart = [...c.cas].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
    return restantes
      .map((f, i) => ({ f, rang: (depart + i * 2654435761) >>> 0 }))
      .sort((a, b) => a.rang - b.rang)
      .slice(0, 3)
      .map((x) => x.f);
  };

  const enonce = (c: { cas: string; famille: string }) => ({
    text: `${opts.consigne}\n\n« ${c.cas} »`,
    choices: [c.famille, ...autresDe(c)],
  });

  return {
    id: opts.id,
    microskillId: opts.microskillId,
    generate: (ctx) => {
      const c = tirerSansRemise(opts.pool, enonce, ctx?.eviter);
      return {
        microskillId: opts.microskillId,
        ...enonce(c),
        explanation: c.pourquoi,
      };
    },
  };
}

/**
 * AFFIRMATION À CORRIGER — une phrase fausse, et ce qui cloche dedans.
 *
 * Remplace le vrai/faux : au lieu de demander si la phrase est juste (une
 * chance sur deux), on demande POURQUOI elle ne l'est pas. Même matière
 * travaillée, quatre lignes au lieu de deux, et l'élève doit nommer l'erreur
 * au lieu de la sentir.
 */
export function corriger(opts: {
  id: string;
  microskillId: string;
  pool: {
    affirmation: string;
    bonne: string;
    pieges: [string, string, string];
    pourquoi: string;
  }[];
}): PixGabarit {
  const enonce = (c: { affirmation: string; bonne: string; pieges: [string, string, string] }) => ({
    text: `On lit souvent cette phrase :\n\n« ${c.affirmation} »\n\nQu'est-ce qui ne va pas ?`,
    choices: [c.bonne, ...c.pieges],
  });

  return {
    id: opts.id,
    microskillId: opts.microskillId,
    generate: (ctx) => {
      const c = tirerSansRemise(opts.pool, enonce, ctx?.eviter);
      return {
        microskillId: opts.microskillId,
        ...enonce(c),
        explanation: c.pourquoi,
      };
    },
  };
}
