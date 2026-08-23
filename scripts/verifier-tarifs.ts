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
  ECHELLE,
  EXEMPLE_CLASSE,
  EXEMPLE_ETABLISSEMENT,
  PLAFOND_ETABLISSEMENT_AN,
  PRIX_CLASSE_ELEVE_MOIS,
  PRIX_ETABLISSEMENT_ELEVE_MOIS,
  PRIX_FAMILLE_AN,
  PRIX_FAMILLE_MOIS,
  centimes,
  euros,
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
  [
    PRIX_FAMILLE_AN,
    PLAFOND_ETABLISSEMENT_AN,
    EXEMPLE_ETABLISSEMENT.total,
    ECHELLE.siLesFamillesPaient,
    ECHELLE.siLesClassesPaient,
    ECHELLE.siLEtablissementPaie,
  ].map(String),
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
  {
    // Le professeur ne paie plus un forfait : son prix dépend de son effectif.
    // Seul l'établissement a le droit de dire « quel que soit l'effectif », et
    // seulement parce qu'un plafond le rend vrai.
    motif: /forfait|quel que soit (le nombre d.[ée]l[èe]ves|l.effectif)/i,
    pourquoi:
      "le FORFAIT a été abandonné le 22/08 au soir : le prix suit une échelle par élève",
    contexte: /€|euros?|tarif|prix|abonnement/i,
    // ⚠️ TROIS FAUX POSITIFS À NE PAS RÉVEILLER, ils ont tous été vus le 22/08 :
    // l'indemnité légale « forfaitaire de recouvrement de 40 € » des CGV, le
    // « pas de forfait » d'une matinée de formation CRPE, et l'établissement,
    // seul autorisé à dire « quel que soit l'effectif » parce qu'un plafond le
    // rend vrai. Un vérificateur qui crie sur des lignes justes cesse d'être lu.
    sauf: /plafond|jamais plus de|[ée]tablissement|recouvrement|pas de forfait/i,
  },
  {
    // Vrai du forfait professeur, faux depuis : ce sont les familles qui paient,
    // moins cher, et c'est tout l'intérêt de passer par la classe.
    motif: /les familles (de (cette|votre|la) classe )?ne paient rien/i,
    pourquoi:
      "faux depuis le 22/08 : dans une classe, ce sont les familles qui s'abonnent (25 % moins cher)",
    sauf: /[ée]tablissement/i,
  },
  {
    motif: /sur devis|demander un devis|nous consulter pour un tarif/i,
    pourquoi: "le prix établissement est FERME et public depuis le 22/08",
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
  `  Famille        ${euros(PRIX_FAMILLE_AN).padEnd(7)} / an   · ${centimes(
    PRIX_FAMILLE_MOIS,
  )} par mois · par FOYER`,
);
console.log(
  `  Classe         ${montant(PRIX_CLASSE_ELEVE_MOIS).padEnd(7)} / mois · par élève · ${centimes(
    EXEMPLE_CLASSE.parMois,
  )} par mois pour ${EXEMPLE_CLASSE.eleves}`,
);
console.log(
  `  Établissement  ${montant(PRIX_ETABLISSEMENT_ELEVE_MOIS).padEnd(7)} / mois · par élève · ${euros(
    EXEMPLE_ETABLISSEMENT.total,
  )} par an pour ${EXEMPLE_ETABLISSEMENT.eleves} (plafond ${euros(PLAFOND_ETABLISSEMENT_AN)})`,
);

/* ── L'ÉCHELLE DOIT RESTER STRICTEMENT DÉCROISSANTE ────────────────────────────
   ⭐ LE SEUL TEST QUI DISTINGUE CETTE GRILLE DES CINQ QUI SONT MORTES LE 22/08.
   Si un payeur plus large finit par coûter plus cher qu'un payeur plus étroit,
   il a intérêt à le contourner — et c'est par là qu'un principal est entré dans
   chacune des versions précédentes. L'inversion ne se voit JAMAIS dans les taux,
   uniquement dans ces trois totaux : elle doit donc se tester, pas se relire. */
const paliers = [
  ECHELLE.siLesFamillesPaient,
  ECHELLE.siLesClassesPaient,
  ECHELLE.siLEtablissementPaie,
];
const decroissante = paliers.every((v, i) => i === 0 || v < paliers[i - 1]);
console.log(
  `\n  Échelle sur ${ECHELLE.eleves} élèves : ${paliers.map((v) => euros(v)).join("  >  ")}`,
);
if (!decroissante) {
  alertes.push({
    fichier: "lib/tarifs.ts",
    ligne: 0,
    extrait: paliers.map((v) => euros(v)).join(" / "),
    pourquoi:
      "ÉCHELLE INVERSÉE : un payeur plus large coûte plus cher qu'un payeur plus étroit",
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
