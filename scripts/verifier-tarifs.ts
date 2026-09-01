// VÉRIFIER QUE LES PRIX SONT LES MÊMES PARTOUT — à l'exécution, pas en relisant.
//
// POURQUOI CE SCRIPT EXISTE (22/08/2026, demande de Frédéric : « vérifie que
// les tarifs sont identiques partout »).
//
// `lib/tarifs.ts` empêche deux prix de diverger — MAIS SEULEMENT DANS LES
// FICHIERS QUI L'IMPORTENT. Il ne peut rien contre quelqu'un qui écrit « 12 € »
// à la main, et c'est très exactement ce qui s'était produit :
//   — /espace-ecoles disait « un tarif par élève, sur devis selon vos
//     effectifs » sans jamais connaître le fichier ;
//   — /presse annonçait « un abonnement autour de 5 € », un montant qui n'a
//     jamais existé, sur la page que lit un journaliste ;
//   — /faq/faq-tarifs servait « phase pilote » et « contactez-nous pour un
//     devis » DANS UN JSON-LD, donc directement dans les résultats Google ;
//   — /parents affichait « Offre famille » là où ses deux cartes voisines
//     affichaient un chiffre, et promettait un « prix de lancement bloqué ».
// Aucun de ces défauts ne se voyait dans un chiffre faux : trois d'entre eux ne
// citaient AUCUN prix. Ce qui divergeait, c'était la FORMULE — par élève, sur
// devis, à terme. Un vérificateur qui ne cherche que des nombres les rate tous.
//
// D'où les deux passes ci-dessous : les montants écrits à la main, ET le
// vocabulaire qui décrit un mode de facturation abandonné.
//
// Usage — tsx n'est pas une dépendance du projet, npx le récupère au vol :
//   npx --yes tsx@4 scripts/verifier-tarifs.ts
// Sort en code 1 si quelque chose est à regarder : utilisable avant un push.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

import {
  ANNUEL_AU_TARIF_MENSUEL,
  MOIS_OFFERTS,
  PERIODE_ANNUELLE,
  PRIX_ANNUEL,
  PRIX_MENSUEL,
  REDUCTION_ANNUEL_POURCENT,
  centimes,
  montant,
} from "@/lib/tarifs";

const RACINE = process.cwd();

/* ─────────────────────────────────────────────────────────────────────────────
   CE QU'ON REGARDE, ET CE QU'ON NE REGARDE PAS.

   ⚠️ Le piège de ce script, c'est le faux positif : le site est bourré
   d'euros parfaitement légitimes — « 3 croissants coûtent 2,40 € » dans un
   cahier de vacances, le RevPAR du simulateur d'hôtel, l'abonnement de bus d'un
   guide de survie. Un vérificateur qui crie sur ceux-là ne sera plus lu, et
   c'est la seule façon sûre de le rendre inutile.

   On ne balaie donc QUE les pages de vitrine — celles qui parlent du produit à
   quelqu'un qui pourrait payer — et on écarte tout ce qui est contenu
   pédagogique.
   ──────────────────────────────────────────────────────────────────────────── */

/** Les répertoires où un prix du produit a le droit d'apparaître. */
const DOSSIERS_VITRINE = ["app", "components"];

/** Contenu pédagogique : les euros y sont des énoncés, jamais des prix. */
const EXCLUS = [
  "cahier-vacances",
  "guide-de-survie",
  "simulateur-",
  "questionBank",
  "knowledge",
  "podcast-maths",
  "fiches-cours",
  "coach-ia",
  "programme",
  "eval-pix-ia",
  "evaluation-nationale-college",
  "concours-",
  "node_modules",
  ".next",
];

/** ⛔ Hors périmètre sur demande de Frédéric (22/08) : espaces internes. */
const HORS_PERIMETRE = [
  `app${sep}admin`,
  `app${sep}dashboard`,
  `app${sep}auth`,
  `app${sep}api`,
  // ⚠️ LES CGV SONT UN TEXTE JURIDIQUE, PAS UNE VITRINE. Elles disent « sur
  // devis » parce que c'est vrai et que ça doit y être : les missions aux
  // professionnels se facturent ainsi (décidé le 19/08), et un client a le
  // droit de savoir comment il paie. Les alerter, c'était demander de retirer
  // une mention légale exacte — le genre de bruit qui fait abandonner un
  // vérificateur au bout de trois exécutions.
  `app${sep}cgv`,
  `app${sep}mentions-legales`,
  `app${sep}cgu`,
];

function fichiers(dir: string): string[] {
  const sortie: string[] = [];
  let entrees: string[];
  try {
    entrees = readdirSync(dir);
  } catch {
    return sortie;
  }
  for (const e of entrees) {
    const chemin = join(dir, e);
    const rel = relative(RACINE, chemin);
    if (EXCLUS.some((x) => rel.includes(x))) continue;
    if (HORS_PERIMETRE.some((x) => rel.startsWith(x))) continue;
    if (statSync(chemin).isDirectory()) {
      sortie.push(...fichiers(chemin));
    } else if (/\.tsx?$/.test(e)) {
      sortie.push(chemin);
    }
  }
  return sortie;
}

type Alerte = { fichier: string; ligne: number; texte: string; motif: string };
const alertes: Alerte[] = [];

/* ── PASSE 1 — LES MONTANTS ÉCRITS À LA MAIN ──────────────────────────────── */

/**
 * Un montant en euros dans le texte. On ne peut pas se contenter de chercher
 * nos propres prix : c'est un montant FAUX (« autour de 5 € ») qu'il faut
 * attraper, et il ne ressemble à aucune de nos constantes.
 */
const MONTANT = /(\d{1,4}(?:[ .,]\d{1,3})*)\s*(?:€|euros?)\b/gi;

/**
 * Les montants qui appartiennent à quelqu'un d'autre : le tableau comparatif
 * cite les prix de Kwyk, IXL, Mathia, Lumni. Ils sont écrits à la main et c'est
 * NORMAL — ce sont des relevés, pas nos prix, et ils ne doivent surtout pas
 * suivre notre grille.
 */
const CONCURRENTS = /IXL|Kwyk|Mathia|Lumni|Khanmigo|Galac6|Nathan|concurrent/i;

/**
 * Ce que nos propres constantes produisent aujourd'hui.
 *
 * ⛔ `EXEMPLE_CLASSE.parAn` (270 €) N'EST PAS DANS CETTE LISTE, ET C'EST VOLONTAIRE.
 * Le total annuel d'une classe est un nombre juste qui ne doit jamais s'afficher :
 * 22,50 € par mois se décide seul, 270 € renvoie un professeur à sa coopérative,
 * donc à une réunion, donc à la rentrée suivante. S'il apparaît quelque part, on
 * veut une alerte — pas une absolution.
 */
const NOS_MONTANTS = new Set(
  [PRIX_MENSUEL, PRIX_ANNUEL, ANNUEL_AU_TARIF_MENSUEL].map(String),
);

/* ── PASSE 2 — LE VOCABULAIRE D'UN MODÈLE ABANDONNÉ ───────────────────────── */

const FORMULES_MORTES: {
  motif: RegExp;
  pourquoi: string;
  /** Si présent, le motif ne compte que dans une ligne qui parle aussi d'argent. */
  contexte?: RegExp;
  /** Si présent, la ligne est innocentée quand elle contient ceci. */
  sauf?: RegExp;
}[] = [
  // ⚠️⚠️ LA RÈGLE QUI ÉTAIT ICI INTERDISAIT LA FACTURATION « PAR ÉLÈVE ».
  // Elle a vécu quelques heures, le 22/08 : le forfait par établissement l'a
  // remplacée le matin, l'échelle par élève l'a rétablie le soir. Elle est
  // retirée et NON pas assouplie — un vérificateur qui crie sur le modèle en
  // vigueur est pire qu'un vérificateur absent, parce qu'on apprend à l'ignorer.
  // Ce qui reste vrai des deux versions : c'est la FORMULE qui diverge, jamais
  // le chiffre. Les règles ci-dessous traquent donc les formules mortes de la
  // grille actuelle.
  /* ⛔⛔ LA RÈGLE LA PLUS IMPORTANTE DE CE FICHIER DEPUIS LE 01/09/2026, ET
     ELLE NE CHERCHE AUCUN CHIFFRE. Le site a raconté pendant dix jours une
     ÉCHELLE DE PAYEURS — famille, classe, établissement, « plus le payeur est
     large moins l'élève coûte ». Les trois barreaux sont tombés (l'établissement
     interdit le 31/08, la classe supprimée le 01/09) et il ne reste qu'un
     payeur. Le vocabulaire, lui, était encore vivant dans huit fichiers, dont le
     llms.txt et deux JSON-LD — c'est-à-dire dans ce que recopient les moteurs.
     ⚠️ Aucune de ces phrases ne contenait un prix faux : elles décrivaient un
     MODÈLE mort avec des montants justes, et c'est exactement ce qu'une
     constante partagée ne peut pas attraper. */
  {
    motif:
      /[ée]chelle des payeurs|plus le payeur est large|tarif de groupe|tarif classe|prix d.un livre|payeur plus large/i,
    pourquoi:
      "l'ÉCHELLE DES PAYEURS n'existe plus depuis le 01/09 : un seul payeur (la famille), deux formules",
  },
  {
    // ⚠️ Le mot « forfait » a survécu à DEUX changements de grille (22/08, puis
    // 01/09) en restant sur un titre qu'on n'avait pas relu. Rien n'est
    // forfaitaire : la famille paie au mois ou à l'année, l'enseignant ne paie
    // pas.
    motif: /forfait|quel que soit (le nombre d.[ée]l[èe]ves|l.effectif)/i,
    pourquoi: "il n'y a aucun FORFAIT dans la grille du 01/09",
    contexte: /€|euros?|tarif|prix|abonnement/i,
    // ⚠️ DEUX FAUX POSITIFS À NE PAS RÉVEILLER : l'indemnité légale
    // « forfaitaire de recouvrement de 40 € » des CGV, et la matinée de
    // formation CRPE, qui se vend « sans forfait ». Un vérificateur qui crie sur
    // des lignes justes cesse d'être lu.
    // ⚠️ ÉCRIT `(de\s+)?` ET NON `de? ?` : `de?` exige un « d » suivi d'un « e »
    // facultatif, donc il RÉCLAME la lettre d au lieu de la rendre optionnelle.
    // La formule « sans forfait » restait accusée, et le motif avait l'air juste
    // à la relecture. C'est le genre de faute qu'on ne voit qu'à l'exécution.
    sauf: /recouvrement|(pas|sans)\s+(de\s+)?forfait/i,
  },
  /* ⛔ LA CONFUSION QUI COÛTE LE PLUS CHER DANS LA GRILLE DU 01/09, et elle se
     fait de bonne foi : « gratuit pour les enseignants » se comprend « gratuit
     pour ma classe ». Un professeur l'annonce à ses familles, et ce sont elles
     qui découvrent le prix. Toute page qui parle de la gratuité enseignant doit
     dire dans la même phrase qu'elle ne s'étend pas aux familles. */
  {
    motif: /gratuit (pour )?(les |aux )?(enseignants?|professeurs?|profs?)/i,
    pourquoi:
      "la gratuité enseignant est PERSONNELLE : la même phrase doit dire qu'elle ne couvre pas les familles des élèves",
    sauf: /titre personnel|pas pour les familles|ne s.[ée]tend pas|personnelle/i,
  },
  /* ⛔ LA MENTION OBLIGATOIRE DU 01/09 : l'abonnement annuel couvre l'ANNÉE
     SCOLAIRE, pas douze mois glissants. Elle doit accompagner le prix annuel
     partout où il s'affiche — pas seulement dans les CGV. */
  {
    motif: /19,90|19\.90/,
    pourquoi:
      "le prix annuel s'affiche sans sa période : « année scolaire, et non douze mois glissants » est obligatoire",
    sauf: /ann[ée]e scolaire|PERIODE_ANNUELLE/i,
  },
  {
    motif: /sur devis|demander un devis|nous consulter pour un tarif/i,
    pourquoi:
      "rien ne se vend sur devis aux particuliers : les deux prix sont fermes et publics",
  },
  /* ⛔⛔ CE QUI NE DOIT JAMAIS RÉAPPARAÎTRE, ET CE N'EST PAS UN ARBITRAGE
     COMMERCIAL. Vendre à un établissement ou à une collectivité est INTERDIT à
     un enseignant contractuel en CDI (Frédéric, 31/08 : « c'est du pénal »). Une
     grille du 01/09 proposait des packs de comptes pour les mairies et des
     ateliers facturés : elle n'a pas été mise en œuvre. Si le vocabulaire
     réapparaît sur une page de vitrine, c'est qu'on l'a rouverte sans décision.
     ⚠️ `sauf` innocente les phrases qui NIENT l'offre — le llms.txt en contient
     une, exprès, pour les modèles de langage. */
  {
    motif:
      /pack de comptes|comptes activ[ée]s|devis hors ligne|tarif pilote|collectivit[ée]s?|atelier de \d|cycle de \d+ s[ée]ances/i,
    pourquoi:
      "⛔ INTERDIT : ni vente à une collectivité, ni prestation facturée (contractuel en CDI, 31/08)",
    // ⚠️ `nie`, le filtre général de négation, NE SUFFIT PAS ICI : il cherche
    // « n'est pas / n'y a aucun », et rate « rien n'est vendu à une
    // collectivité » — la phrase de /presse, qui dit exactement ce qu'on veut
    // lire. Un vérificateur qui punit la page faisant le mieux son travail perd
    // sa crédibilité en une exécution.
    sauf: /ne (peut|peuvent) rien acheter|il n.y a (ni|pas)|aucune? (offre|vente)|rien n.est vendu/i,
  },
  {
    motif: /phase pilote|offre pilote|[ée]tablissements? partenaires?/i,
    pourquoi: "il n'y a plus de phase pilote : l'offre est publiée",
  },
  {
    motif: /prix de lancement|tarif de lancement|offre de lancement/i,
    pourquoi:
      "il n'y a pas de prix de lancement — le prix est ferme, et le dire suggère qu'il montera",
  },
  {
    motif: /quotas? de requ[êe]tes|d[ée]passement factur|plafonds? clairs?/i,
    pourquoi: "aucun quota n'a jamais existé dans l'offre",
  },
  {
    motif: /ouvre dans quelques jours|prochainement|d'ici quelques semaines|bient[ôo]t disponible/i,
    pourquoi:
      "une date implicite se périme seule et personne ne vient la corriger (voir /tarifs, 22/08)",
    contexte: /abonn|paiement|prix|tarif|offre|€|euro|ouvertur|vente/i,
  },
  {
    motif: /divise par deux|moins ça coûte par (enfant|[ée]l[èe]ve)/i,
    pourquoi:
      "ancienne grille 12/6/3 : le prix par élève MONTE quand le cercle s'élargit (0,40 € prof → 2,25 € établissement)",
  },
];

/* ── LE BALAYAGE ──────────────────────────────────────────────────────────── */

const tous = DOSSIERS_VITRINE.flatMap((d) => fichiers(join(RACINE, d)));

for (const fichier of tous) {
  const rel = relative(RACINE, fichier);
  // Le fichier des prix a le droit d'écrire les prix : c'est son travail.
  if (rel.endsWith(join("lib", "tarifs.ts"))) continue;

  const lignes = readFileSync(fichier, "utf8").split(/\r?\n/);

  // ⚠️ IL FAUT SUIVRE LES COMMENTAIRES DE BLOC, PAS SEULEMENT LES LIGNES QUI
  // COMMENCENT PAR `//`. Premier jet : la deuxième ligne d'un `/* … */` et le
  // corps d'un `{/* … */}` de JSX passaient pour du code. Or ces blocs-là sont
  // précisément ceux qui RACONTENT le défaut qu'on vient de corriger — le
  // script signalait donc la cicatrice au lieu de la plaie, et cinq de ses
  // vingt alertes étaient ses propres explications.
  let dansBloc = false;

  lignes.forEach((ligne, i) => {
    const numero = i + 1;
    const nue = ligne.trim();

    const ouvre = ligne.lastIndexOf("/*");
    const ferme = ligne.lastIndexOf("*/");
    const etaitDansBloc = dansBloc;
    if (!dansBloc && ouvre !== -1 && ferme < ouvre) dansBloc = true;
    else if (dansBloc && ferme !== -1 && ferme > ouvre) dansBloc = false;

    const estCommentaire =
      etaitDansBloc ||
      dansBloc ||
      nue.startsWith("//") ||
      nue.startsWith("*") ||
      nue.startsWith("/*") ||
      nue.startsWith("{/*");
    if (estCommentaire) return;

    // ⚠️ UNE NÉGATION N'EST PAS UNE PROMESSE. « Ce n'est pas un tarif de
    // lancement » et « il n'y a aucun quota » sont exactement ce qu'on VEUT
    // lire : ils démentent le modèle abandonné au lieu de le vendre. Sans ce
    // filtre, le script punissait la page qui fait le mieux son travail.
    // ⚠️ L'APOSTROPHE EST ÉCHAPPÉE EN JSX. La ligne réelle est
    // « Ce n&apos;est pas un tarif de lancement » : cherchée avec une vraie
    // apostrophe, la négation restait invisible et le script accusait la phrase
    // qui dit exactement le contraire de ce qu'il reproche. On normalise donc
    // l'entité HTML avant de tester.
    const normalisee = ligne.replace(/&apos;|&#39;|&rsquo;/g, "'");
    const nie =
      /n['’ ]?(est|y a|ont|avons|aura)\s+(pas|aucun|plus|jamais)|aucun[e]?\s|jamais|il n['’]y a|sans\s+(quota|engagement|devis)/i.test(
        normalisee,
      );

    // ── Passe 1
    for (const m of ligne.matchAll(MONTANT)) {
      if (CONCURRENTS.test(ligne)) continue;
      const brut = m[1].replace(/[ .]/g, "");
      alertes.push({
        fichier: rel,
        ligne: numero,
        texte: nue.slice(0, 110),
        motif: NOS_MONTANTS.has(brut)
          ? `montant ÉCRIT À LA MAIN (${m[0]}) alors qu'il vaut une de nos constantes — importer lib/tarifs.ts`
          : `montant inconnu de la grille (${m[0]})`,
      });
    }

    // ── Passe 2
    for (const f of FORMULES_MORTES) {
      if (!f.motif.test(ligne)) continue;
      if (nie) continue;
      if (f.sauf && f.sauf.test(ligne)) continue;
      // Certains motifs ne veulent rien dire hors d'un contexte de prix :
      // « prochainement » sur la page des remerciements parle de prénoms.
      if (f.contexte && !f.contexte.test(ligne)) continue;
      alertes.push({
        fichier: rel,
        ligne: numero,
        texte: nue.slice(0, 110),
        motif: f.pourquoi,
      });
    }
  });
}

/* ── CE QUE LA GRILLE DIT AUJOURD'HUI ─────────────────────────────────────── */

console.log("LA GRILLE, telle que lib/tarifs.ts la calcule");
console.log("──────────────────────────────────────────────────────────────");
console.log(
  `  Famille · mois   ${centimes(PRIX_MENSUEL).padEnd(8)} par FOYER, sans engagement`,
);
console.log(
  `  Famille · année  ${centimes(PRIX_ANNUEL).padEnd(8)} ${PERIODE_ANNUELLE}`,
);
console.log(
  `                   ${"".padEnd(8)} soit ${REDUCTION_ANNUEL_POURCENT} % de moins que ${centimes(
    ANNUEL_AU_TARIF_MENSUEL,
  )}, l'équivalent de ${MOIS_OFFERTS} mois offerts`,
);
console.log(`  Enseignant       ${"0 €".padEnd(8)} à titre personnel, adresse ac-*.fr`);

/* ── LE TEST D'ARBITRAGE ENTRE LES DEUX FORMULES ───────────────────────────────
   ⛔ CE BLOC A REMPLACÉ LE TEST DE L'ÉCHELLE le 01/09/2026. L'ancien vérifiait
   que trois totaux annuels restaient strictement décroissants — famille, classe,
   établissement : une inversion, et un payeur avait intérêt à en contourner un
   autre. Cinq grilles sont mortes de cette inversion. Avec un seul payeur il n'y
   a plus d'échelle, donc plus rien à inverser ; le test disparaît parce que le
   risque disparaît.

   ⭐ CE QUI LE REMPLACE EST LE RISQUE DE LA GRILLE ACTUELLE : l'annuel doit
   rester strictement moins cher que douze mensualités. Si le rapport s'inverse
   un jour — mensuel baissé, annuel oublié — la page recommanderait l'annuel en
   affichant une remise négative, et personne ne le verrait dans les deux taux.
   ⚠️ Le second test est arithmétique, pas commercial : « ${MOIS_OFFERTS} mois
   offerts » doit correspondre à l'économie réelle. La grille annonçait « deux
   mois offerts » à 19,90 € alors que le calcul en donne quatre. */
console.log(
  `\n  Sur douze mois : ${centimes(ANNUEL_AU_TARIF_MENSUEL)} au mois  >  ${centimes(
    PRIX_ANNUEL,
  )} à l'année`,
);
if (PRIX_ANNUEL >= ANNUEL_AU_TARIF_MENSUEL) {
  alertes.push({
    fichier: "lib/tarifs.ts",
    ligne: 0,
    texte: `${centimes(PRIX_ANNUEL)} / ${centimes(ANNUEL_AU_TARIF_MENSUEL)}`,
    motif:
      "FORMULES INVERSÉES : l'abonnement annuel coûte autant ou plus que douze mensualités",
  });
}
if (MOIS_OFFERTS < 1) {
  alertes.push({
    fichier: "lib/tarifs.ts",
    ligne: 0,
    texte: `${MOIS_OFFERTS} mois`,
    motif:
      "l'annuel ne fait pas gagner un mois entier : ne pas parler de « mois offerts »",
  });
}
console.log(`\n  ${tous.length} fichiers de vitrine balayés.\n`);

if (!alertes.length) {
  console.log("✅ Aucun prix écrit à la main, aucune formule abandonnée.");
  process.exit(0);
}

console.log(`⚠️  ${alertes.length} chose(s) à regarder :\n`);
let courant = "";
for (const a of alertes) {
  if (a.fichier !== courant) {
    courant = a.fichier;
    console.log(`  ${courant}`);
  }
  console.log(`    ligne ${String(a.ligne).padStart(4)} · ${a.motif}`);
  console.log(`               ${a.texte}`);
}
process.exit(1);
