// /formation-crpe — PRÉPARATION AUX MATHS DU CRPE, EN SALLE, À SAINT-PIERRE.
//
// ⚠️ L'URL EST EN MINUSCULES. Les routes Next sont sensibles à la casse :
// /formation-CRPE renverrait un 404. Si le sigle en capitales est indispensable
// à l'oral, il reste dans le titre de la page — pas dans l'adresse.
//
// ⛔ ET ELLE RESTE COURTE. La question s'est posée le 22/08 :
// `/formation-crpe-ile-de-la-reunion` mettrait le lieu dans l'adresse. Non, pour
// deux raisons. La première : les mots de l'URL pèsent très peu aujourd'hui face
// au titre, au H1 et au texte — et le lieu y est déjà partout. La seconde, qui
// tranche vraiment : cette adresse se DIT. Au téléphone, sur un message, sur une
// affiche en salle des profs. « eleveai.fr slash formation crpe » se retient ;
// « slash formation crpe île de la Réunion » ne se dit pas. Le référencement
// local se gagne dans le titre, pas dans le chemin.
//
// ⭐ OUVERTE LE 22/08/2026. Frédéric : « je suis déclaré URSSAF ». Le `noindex`
// et l'absence du sitemap tenaient au statut, et le statut est réglé — micro-
// entrepreneur depuis le 19/08. La page s'indexe, elle est au sitemap, et elle
// sort en encart chez l'adulte (`lib/matrice/ressources.ts`, PORTES_ADULTE).
//
// ⚠️ CE QUI N'EST PAS ENCORE RÉGLÉ, ET QUI SE VOIT DANS LE TEXTE : l'agrément
// formation. Vendre une « action de formation » ouvre un régime à part —
// déclaration d'activité (NDA) auprès de la DREETS, règlement intérieur,
// convention, feuilles d'émargement. Sans NDA : ni CPF ni financeur public.
// C'est pourquoi la page dit noir sur blanc « aucun financement CPF n'est
// possible aujourd'hui : vous payez directement ». Elle est donc juste EN
// L'ÉTAT, et le jour où le numéro d'agrément arrive, c'est cette ligne-là qu'on
// remplace — pas le `robots`, qui n'a plus lieu d'être.
//
// ⚠️ L'ACCORD DE L'HÔTEL RESTE À OBTENIR. La page est désormais publique et le
// nomme : `LIEU.nom = null` la fait retomber sur « Terre-Sainte, à Saint-Pierre »
// en une ligne, si jamais il fallait retirer le nom vite.
//
// ⭐ LE PARI DE LA PAGE : ne vendre que ce qui est rare. Le site est gratuit et
// se copie à coût nul ; un samedi matin en salle, non. C'est pourquoi la
// coupure d'été austral n'est pas cachée — elle est assumée, et c'est le site
// qui la couvre. Le payant, c'est la présence ; le gratuit, c'est le reste.

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://www.eleveai.fr";

// ─────────────────────────────────────────────────────────────────────────────
// LE LIEU.
//
// ✅ L'HÔTEL A CONFIRMÉ (22/08/2026). Son directeur est un ami de Frédéric et a
// donné son accord — la salle ne se loue pas facilement le samedi matin, l'hôtel
// y gagne autant que nous. C'était le dernier verrou : nommer une maison sur une
// page commerciale ne l'informe pas, ça l'engage, et il fallait donc son accord
// avant que la page devienne publique. Il existe.
//
// ⚠️ `nom: null` reste la sortie de secours : la page retombe alors sur
// « à Terre-Sainte, Saint-Pierre » sans rien casser ailleurs. Une amitié n'est
// pas un bail — si l'arrangement s'arrête, c'est UNE ligne à changer, pas la
// page à réécrire.
//
// ✅ `debut` / `fin` : 8 h – 12 h, CONFIRMÉ AVEC L'HÔTEL le 22/08/2026. La salle
// se loue à la matinée, d'où les 4 h. Le créneau n'était au départ qu'une
// déduction de « 50 € la matinée » ; il ne l'est plus. C'était la dernière
// hypothèse de la page — il n'en reste aucune, hors la date des écrits, qui ne
// dépend de personne ici.
//
// Deux champs et non une chaîne toute faite, parce que l'horaire s'écrit
// « 8 h – 12 h » dans un encart et « de 8 h à 12 h » dans une phrase : une seule
// source, deux rendus. Un candidat qui vient de Saint-Joseph organise son samedi
// sur cette ligne-là — si elle bouge, elle bouge ICI et nulle part ailleurs.
// ─────────────────────────────────────────────────────────────────────────────
const LIEU: {
  nom: string | null;
  quartier: string;
  ville: string;
  debut: string;
  fin: string;
} = {
  nom: "Hôtel Terre-Sainte",
  quartier: "Terre-Sainte",
  ville: "Saint-Pierre",
  debut: "8 h",
  fin: "12 h",
};

const HORAIRES_COURT = `${LIEU.debut} – ${LIEU.fin}`;
const HORAIRES_PHRASE = `de ${LIEU.debut} à ${LIEU.fin}`;

// « Hôtel Terre-Sainte, à Saint-Pierre » tant que l'accord tient ; « Terre-
// Sainte, à Saint-Pierre » sinon. Un seul endroit à changer.
const LIEU_COURT = LIEU.nom
  ? `${LIEU.nom}, ${LIEU.ville}`
  : `${LIEU.quartier}, ${LIEU.ville}`;
// ⚠️ Ne pas réintroduire le quartier ici : « l'Hôtel Terre-Sainte, dans le
// quartier de Terre-Sainte » se lit comme un bégaiement. Le nom le porte déjà.
const LIEU_LONG = LIEU.nom
  ? `l'${LIEU.nom}, à ${LIEU.ville}`
  : `${LIEU.quartier}, à ${LIEU.ville}`;

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️ LA DATE DU CONCOURS — HYPOTHÈSE, PAS UNE INFORMATION.
//
// Le calendrier officiel de la session 2027 sort à l'automne 2026. Tant que
// `confirme` vaut false, la page affiche « attendue » et jamais une date sèche :
// un candidat qui organise ses six mois sur une date fausse ne revient pas.
//
// ⚠️ À VÉRIFIER EN MÊME TEMPS QUE LA DATE : depuis la session 2026 le concours
// est placé en fin de licence. Si c'est confirmé pour 2027, le public n'est plus
// M1/M2 mais L3 — l'INSPÉ les prépare déjà, et l'argument de cette page devient
// « le samedi, en plus, sur les maths seules », pas « à la place de ».
// ─────────────────────────────────────────────────────────────────────────────
const CONCOURS = {
  libelle: "1ᵉʳ avril 2027",
  confirme: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// L'ARGENT — CE BLOC EST LE RAISONNEMENT, PAS LA PAGE.
//
// ⛔ RIEN DE CE CALCUL NE DOIT APPARAÎTRE À L'ÉCRAN. La page vend une offre ;
// un stagiaire n'a pas à lire la marge de celui à qui il paie 60 €. Les seuls
// chiffres publics sont le prix, ce qui est compris dedans, et le seuil.
//
// `horaire` : 15 €/h. Volontairement bas, et ce n'est pas une erreur — le levier
// n'est pas le tarif, c'est le nombre. À 8 stagiaires, l'heure de présence vaut
// 120 €. Monter à 20 €/h ferait perdre plus d'inscrits qu'il ne rapporterait.
//
// Les charges réelles d'une matinée, arrêtées le 22/08/2026 :
//   • salle de séminaire ........ 50 € la matinée (coût fixe)
//   • café ou thé ............... 2 € par personne (coût variable)
// Donc : net d'une séance = 58 € × inscrits − 50 €. Le point mort tombe à UN
// inscrit — la salle ne décide rien, contrairement à ce qu'on croyait d'abord.
//   3 inscrits → 124 €   5 → 240 €   8 → 414 €   15 → 820 €
//
// ⛔ LA VIENNOISERIE EST SORTIE DE L'OFFRE (Frédéric, 22/08 : « je peux payer le
// café ou le thé, mais pas plus »). Ne pas la réintroduire au motif que « ça
// ferait mieux » : ce serait 2 € de plus par personne et par samedi, soit 420 €
// sur le cycle à 15 inscrits, pour une ligne que personne ne vient chercher.
// ⚠️ Et ne pas réécrire « rien à sortir sur place » : c'est devenu faux dès
// qu'il y a une vitrine à côté. Une promesse d'intendance ratée coûte plus cher
// que l'intendance elle-même.
//
// ⚠️ `seuilOuverture` N'EST DONC PAS UN SEUIL FINANCIER, C'EST UN SEUIL
// PÉDAGOGIQUE : à trois, personne ne se corrige mutuellement et la séance perd
// ce qui fait sa valeur. C'est ce motif-là qui est écrit sur la page — l'autre
// serait vrai mais impubliable.
// ─────────────────────────────────────────────────────────────────────────────
const TARIF = {
  horaire: 15,
  heuresParSeance: 4,
  seuilOuverture: 5,
  plafondGroupe: 15,
};

const PRIX_SEANCE = TARIF.horaire * TARIF.heuresParSeance;

// ─────────────────────────────────────────────────────────────────────────────
// LES 14 SAMEDIS.
//
// ⭐ POURQUOI DEUX SÉANCES EN MARS ET PAS HUIT EN AUTOMNE : le découpage
// spontané mettait 8 samedis avant Noël et rien après le 13/03 — soit trois
// semaines de vide juste avant l'écrit, au moment exact où un candidat a besoin
// d'être tenu. Deux séances ont donc été déplacées de l'automne vers le 20 et le
// 27 mars. On révise moins longtemps, on révise plus près.
//
// ⛔⛔ LA PROGRESSION A ÉTÉ RELUE ET VALIDÉE PAR FRÉDÉRIC LE 22/08/2026
// (« les 14 séances sont parfaites »). Elle avait d'abord été écrite par la
// machine, ce qui était l'inverse du bon sens sur le seul contenu que seul un
// prof puisse ordonner — c'est réparé, et ça ne se refait pas. Ne rien
// réordonner, ne rien fusionner, ne rien « enrichir » : l'ordre des thèmes, ce
// qui mérite une matinée entière et ce qui n'en mérite pas, c'est un jugement
// de métier, pas une optimisation. Toute modification passe par lui.
//
// `bloc` : "automne" | "austral" (la coupure, aucune séance) | "finale".
// Les dates sont écrites en dur parce qu'elles sont *décidées*, pas calculées :
// un générateur de samedis produirait aussi ceux qui tombent en vacances.
// ─────────────────────────────────────────────────────────────────────────────
type Seance = {
  date: string;
  bloc: "automne" | "finale";
  titre: string;
  detail: string;
};

const SEANCES: Seance[] = [
  {
    date: "samedi 3 octobre",
    bloc: "automne",
    titre: "Où vous en êtes vraiment",
    detail:
      "Une épreuve d'entrée, corrigée sur place. Pas pour classer : pour savoir quelles séances comptent le plus pour vous, et lesquelles vous pourriez presque sauter.",
  },
  {
    date: "samedi 31 octobre",
    bloc: "automne",
    titre: "Nombres, fractions, décimaux",
    detail:
      "Le socle qui fait perdre des points partout ailleurs. Priorités, écritures fractionnaires, ordres de grandeur — et les erreurs d'élèves qu'on vous demandera d'analyser.",
  },
  {
    date: "samedi 7 novembre",
    bloc: "automne",
    titre: "Proportionnalité, pourcentages, échelles",
    detail:
      "Le thème le plus rentable du concours : il revient chaque année, sous quatre habillages différents. On apprend à reconnaître lequel avant de calculer.",
  },
  {
    date: "samedi 14 novembre",
    bloc: "automne",
    titre: "Arithmétique",
    detail:
      "Divisibilité, nombres premiers, PGCD et PPCM. Peu de technique, beaucoup de raisonnement — c'est là que se joue la différence entre un candidat qui calcule et un candidat qui démontre.",
  },
  {
    date: "samedi 21 novembre",
    bloc: "automne",
    titre: "Grandeurs et mesures",
    detail:
      "Conversions, périmètres, aires, volumes, durées. Le chapitre où l'on perd des points bêtement, et celui qu'on enseignera le plus souvent en classe.",
  },
  {
    date: "samedi 28 novembre",
    bloc: "automne",
    titre: "Géométrie plane",
    detail:
      "Triangles, quadrilatères, Thalès, Pythagore, constructions. On rédige une démonstration entière, ensemble, ligne par ligne.",
  },
  {
    date: "samedi 5 décembre",
    bloc: "automne",
    titre: "Espace, statistiques, probabilités",
    detail:
      "Solides et patrons, puis lecture et interprétation de données. Deux thèmes courts au concours, deux thèmes qu'on travaille rarement — donc rentables.",
  },
  {
    date: "samedi 12 décembre",
    bloc: "automne",
    titre: "Premier problème en conditions réelles",
    detail:
      "Un sujet complet, chronométré, corrigé le jour même. Vous partez en vacances en sachant précisément ce qu'il vous reste à faire.",
  },
  {
    date: "samedi 6 février",
    bloc: "finale",
    titre: "Analyser des productions d'élèves",
    detail:
      "La partie qui rapporte le plus de points et qu'on prépare le moins. Reconnaître une erreur, dire d'où elle vient, proposer une remédiation. C'est du métier, pas des maths.",
  },
  {
    date: "samedi 13 février",
    bloc: "finale",
    titre: "Algèbre et mise en équation",
    detail:
      "Traduire un énoncé en équation, puis savoir revenir à la question posée. L'aller-retour, pas la technique de résolution.",
  },
  {
    date: "samedi 20 février",
    bloc: "finale",
    titre: "Raisonner, démontrer, rédiger",
    detail:
      "Vrai ou faux et justifiez, contre-exemples, raisonnement par disjonction. Le correcteur note ce qui est écrit, pas ce qui était dans votre tête.",
  },
  {
    date: "samedi 27 février",
    bloc: "finale",
    titre: "Vos erreurs, et seulement les vôtres",
    detail:
      "Séance construite à partir de ce que le groupe a raté depuis octobre. Rien de générique : je prépare cette séance avec vos copies.",
  },
  {
    date: "samedi 20 mars",
    bloc: "finale",
    titre: "Épreuve blanche complète",
    detail:
      "Durée réelle, format réel, dans les conditions réelles. Copies ramassées, corrigées par mes soins, rendues annotées.",
  },
  {
    date: "samedi 27 mars",
    bloc: "finale",
    titre: "Correction, et les derniers pièges",
    detail:
      "Cinq jours avant l'écrit. On reprend l'épreuve blanche, on liste ce qui se joue encore, et on arrête d'apprendre pour ne plus faire que consolider.",
  },
];

const NB_SEANCES = SEANCES.length;
const NB_HEURES = NB_SEANCES * TARIF.heuresParSeance;
const PRIX_CYCLE = NB_SEANCES * PRIX_SEANCE;

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

// CE QUE ÇA N'EST PAS. Dit avant qu'on le découvre : un candidat au CRPE a déjà
// reçu trois offres cette semaine, et la seule chose qui le fasse s'arrêter,
// c'est quelqu'un qui annonce ses limites en premier.
const CE_QUE_CE_NEST_PAS = [
  "Une préparation complète au concours. Ici, ce sont les mathématiques, et rien d'autre. Le français, les oraux, le dossier : ce n'est pas moi.",
  "Un remplacement de l'INSPÉ ou du CNED. C'est le samedi, en plus, sur le point précis où beaucoup de candidats lâchent.",
  "Une formation certifiante. Il n'y a pas de diplôme au bout, et aucun financement CPF n'est possible aujourd'hui : vous payez directement, séance par séance.",
  "Un cours magistral. On fait des exercices, vous écrivez, je regarde vos copies. Si vous cherchez un amphithéâtre, ce sera mal payé pour vous.",
];

export const metadata: Metadata = {
  // Le layout ajoute déjà « — EleveAI » : pas de suffixe ici.
  // ⭐ « (La Réunion) » AJOUTÉ : la ville seule ne dit rien à qui cherche depuis
  // ailleurs, et c'est le TITRE qui porte le référencement local — pas l'adresse
  // de la page. Voir la note sur l'URL en tête de fichier.
  title: `Les maths du CRPE, le samedi, à ${LIEU.ville} (La Réunion)`,
  description:
    `${NB_SEANCES} samedis de ${TARIF.heuresParSeance} h pour préparer l'épreuve de mathématiques du CRPE, ` +
    `à ${LIEU_COURT} (La Réunion). ${eur(PRIX_SEANCE)} la matinée, payable à la séance, ` +
    `café compris. Par un professeur de mathématiques en exercice.`,
  // ⚠️ La canonique se déclare ICI et jamais dans le layout — sinon toutes les
  // pages du site hériteraient de celle-ci. Toujours avec le `www`.
  alternates: { canonical: `${SITE_URL}/formation-crpe` },
  // ⭐ PLUS DE `robots` : il portait `index: false` tant que le statut n'était
  // pas réglé. Il l'est (URSSAF, 19/08), la page s'indexe. Ne pas le remettre
  // « par prudence » — une page au sitemap ET en noindex dit deux choses
  // contraires à Google, et c'est le noindex qui gagne.
};

export default function FormationCrpePage() {
  const automne = SEANCES.filter((s) => s.bloc === "automne");
  const finale = SEANCES.filter((s) => s.bloc === "finale");

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#041B33] px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Fond « cahier » + halos, comme /formation-ia — on reste chez soi.
          Accent ambre ici : la page parle d'une salle et d'un samedi matin, pas
          d'IA. L'œil doit voir tout de suite que ce n'est pas la même offre. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute -left-40 top-[-8%] h-[34rem] w-[34rem] rounded-full bg-amber-400/12 blur-[120px]" />
        <div className="absolute right-[-12%] top-[28%] h-[30rem] w-[30rem] rounded-full bg-rose-500/10 blur-[120px]" />
        <div className="absolute left-[8%] top-[68%] h-[30rem] w-[30rem] rounded-full bg-emerald-500/12 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <p className="inline-flex items-center rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-200">
          🏝️ {LIEU_COURT} · La Réunion · {NB_SEANCES} samedis
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
          Les maths du CRPE,{" "}
          {/* ⚠️ LA VILLE, PAS LE QUARTIER. « à Terre-Sainte » ne dit rien à
              quelqu'un de Saint-Denis ou de Saint-André, et c'est exactement
              celui-là qui doit décider s'il descend le samedi matin. Le
              quartier et le nom de l'hôtel sont juste au-dessus, dans le
              bandeau, et juste en dessous, dans le chapeau. */}
          <span className="text-amber-300">
            le samedi matin à {LIEU.ville}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/80 sm:text-lg">
          {NB_SEANCES} matinées de {TARIF.heuresParSeance} heures, d&apos;octobre
          à fin mars, à {LIEU_LONG}, pour une seule épreuve&nbsp;: celle de
          mathématiques. Vous écrivez, je corrige vos copies, on recommence.
        </p>

        {/* Les trois chiffres qui décident. Un candidat compare trois choses —
            combien d'heures, combien ça coûte, quand ça finit. Les lui donner
            au-dessus de la ligne de flottaison évite qu'il aille les chercher
            chez quelqu'un d'autre. */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { k: `${NB_HEURES} h`, v: `${NB_SEANCES} samedis, ${HORAIRES_COURT}` },
            { k: eur(PRIX_SEANCE), v: "la matinée, café compris — pas de forfait" },
            {
              k: CONCOURS.confirme ? CONCOURS.libelle : "printemps 2027",
              v: CONCOURS.confirme
                ? "date des écrits"
                : "écrits attendus — calendrier officiel à l'automne",
            },
          ].map((c) => (
            <div
              key={c.k}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-2xl font-black text-amber-200">{c.k}</p>
              <p className="mt-0.5 text-sm font-semibold leading-6 text-white/70">
                {c.v}
              </p>
            </div>
          ))}
        </div>

        {/* ⭐⭐ LE MALENTENDU QUI COÛTE LE PLUS CHER, ET QUI EST L'ARGUMENT DE
            LA PAGE (correction de Frédéric, 22/08).
            Un candidat se prépare à enseigner jusqu'au CM2 et croit donc réviser
            le programme du primaire. Or l'épreuve écrite de mathématiques du
            CRPE porte sur le programme de l'école ET du collège : Thalès,
            Pythagore, PGCD, mise en équation, probabilités y sont. C'est
            exactement l'écart qui fait rater l'épreuve à des gens qui savent
            enseigner.
            ⛔ NE PAS ÉCRIRE « le programme du primaire » AILLEURS SUR CETTE
            PAGE. Le premier jet le faisait, dans la citation et dans l'encart
            d'été austral, et ça sous-vendait la préparation autant que ça
            trompait le lecteur.
            ⚠️ La maquette a changé à la session 2026 : reverifier l'étendue
            exacte dans l'arrêté de la session 2027 quand il sortira, en même
            temps que la date des écrits. */}
        <div className="mt-6 rounded-2xl border border-rose-300/30 bg-gradient-to-br from-rose-400/[0.10] to-white/[0.03] p-5 sm:p-6">
          <h2 className="text-lg font-black text-white">
            ⚠️ L&apos;épreuve va bien plus loin que ce que vous enseignerez
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-white/80">
            Vous préparez un métier qui s&apos;arrête au CM2, mais
            l&apos;épreuve, elle, ne s&apos;arrête pas là&nbsp;: elle porte sur
            le programme de l&apos;école <strong>et du collège</strong>. Thalès,
            Pythagore, PGCD, mise en équation, probabilités — c&apos;est du
            programme de troisième, et c&apos;est dans le sujet. Beaucoup de
            candidats révisent le primaire, qu&apos;ils maîtrisent déjà, et se
            font sortir par un exercice de quatrième.
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-white/80">
            C&apos;est précisément là que je peux servir&nbsp;: j&apos;enseigne
            les mathématiques au collège, et j&apos;écris les fiches de cours du
            primaire. Les deux bouts du programme de l&apos;épreuve, je les ai
            sous la main tous les jours.
          </p>
        </div>

        {/* Le mot de Frédéric : d'où vient la légitimité. Pas d'un organisme,
            de la salle de classe — et c'est exactement ce qu'un candidat qui a
            déjà échoué une fois vient chercher. */}
        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <Image
            src="/images/avatar-frederic-Lacoste.jpg"
            alt="Frédéric Lacoste, professeur de mathématiques à La Réunion, fondateur d'EleveAI"
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 rounded-full border-2 border-amber-300/60 object-cover sm:h-16 sm:w-16"
          />
          <p className="text-sm font-semibold leading-6 text-white/85">
            «&nbsp;J&apos;enseigne les mathématiques au collège, et j&apos;écris
            en ce moment les fiches de cours du primaire, du CP au CM2. Le
            programme sur lequel on vous interroge, du CP à la troisième, je suis
            en train de le relire ligne à ligne. C&apos;est de là que je vous
            prépare&nbsp;: pas d&apos;un manuel de concours, du programme
            réel.&nbsp;»
            <span className="mt-1 block text-xs font-black text-white/50">
              — Frédéric Lacoste, professeur de mathématiques, fondateur d&apos;EleveAI
            </span>
          </p>
        </div>

        {/* ── LE CALENDRIER ──────────────────────────────────────────────── */}
        <h2 className="mt-10 text-xl font-black text-white sm:text-2xl">
          🗓️ Les {NB_SEANCES} samedis
        </h2>
        <p className="mt-1 text-sm font-semibold text-white/60">
          Deux blocs, une coupure assumée au milieu. Vous savez dès aujourd&apos;hui
          ce que vous faites le 27 mars.
        </p>

        <p className="mt-5 text-xs font-black uppercase tracking-wide text-amber-200/80">
          Bloc 1 · octobre → décembre · {automne.length} séances
        </p>
        <ol className="mt-3 space-y-3">
          {automne.map((s, i) => (
            <SeanceLigne key={s.date} n={i + 1} s={s} />
          ))}
        </ol>

        {/* ⭐ LA COUPURE. Elle était le point faible du plan ; elle devient
            l'argument. Six semaines sans salle, ce n'est pas six semaines sans
            travail — c'est le moment où le site fait son métier, gratuitement.
            C'est aussi ce qui rend la ligne payante défendable : on ne facture
            que ce qui ne se copie pas. */}
        <div className="mt-6 rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-400/[0.10] to-white/[0.03] p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
            Mi-décembre → fin janvier · aucune séance
          </p>
          <h3 className="mt-1 text-lg font-black text-white">
            L&apos;été austral&nbsp;: la salle ferme, le site reste ouvert
          </h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-white/80">
            Six semaines de vacances à La Réunion, et personne ne viendra
            travailler un samedi de janvier. Alors on ne fait pas semblant&nbsp;:
            il n&apos;y a pas de séance, et il n&apos;y a rien à payer. Ce qui
            reste, en accès libre, c&apos;est tout le programme sur lequel on
            vous interroge — les fiches de cours <strong>du CP à la
            troisième</strong>, et le coach pour s&apos;entraîner. Le collège
            surtout&nbsp;: c&apos;est là que se perdent les points, et c&apos;est
            là que l&apos;entretien compte. Vous entretenez, vous ne progressez
            pas&nbsp;: la progression reprend le 6 février.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/fiches-cours"
              className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm font-black text-white transition hover:bg-white/[0.12]"
            >
              Les fiches de cours →
            </Link>
            <Link
              href="/coach-maths-ia"
              className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm font-black text-white transition hover:bg-white/[0.12]"
            >
              Le coach, pour s&apos;entraîner →
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs font-black uppercase tracking-wide text-amber-200/80">
          Bloc 2 · février → mars · {finale.length} séances
        </p>
        <ol className="mt-3 space-y-3">
          {finale.map((s, i) => (
            <SeanceLigne key={s.date} n={automne.length + i + 1} s={s} />
          ))}
        </ol>

        {/* ── LE PRIX ────────────────────────────────────────────────────── */}
        <h2 className="mt-10 text-xl font-black text-white sm:text-2xl">
          💶 Le prix, et pourquoi il est à la séance
        </h2>

        <div className="mt-4 rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-400/[0.12] to-white/[0.03] p-5 sm:p-6">
          <p className="text-4xl font-black text-white sm:text-5xl">
            {eur(PRIX_SEANCE)}{" "}
            <span className="ml-1 align-middle text-base font-bold text-white/60">
              la séance de {TARIF.heuresParSeance} h ({TARIF.horaire} €/h)
            </span>
          </p>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/80">
            Soit {eur(PRIX_CYCLE)} si vous venez aux {NB_SEANCES} séances. Mais
            il n&apos;y a pas de forfait annuel, et c&apos;est délibéré&nbsp;:
            quelqu&apos;un qui nous rejoint en février ne doit pas payer octobre,
            et quelqu&apos;un qui arrête en novembre ne doit pas payer mars. Vous
            payez les samedis où vous êtes là.
          </p>

          {/* CE QUI EST COMPRIS. Le café n'est pas un détail d'intendance : il
              dit qu'une matinée de quatre heures a été pensée comme une matinée,
              avec une pause, et non comme un créneau qu'on subit. Il s'arrête
              là — voir le bloc TARIF : rien d'autre n'est promis, donc rien
              d'autre ne peut décevoir. */}
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              `La salle, à ${LIEU.nom ? `l'${LIEU.nom}` : LIEU.quartier} — on vient, on s'assoit, on travaille.`,
              "Le café ou le thé de la pause, au milieu de la matinée.",
              "Les sujets, les corrigés et vos copies annotées de ma main.",
              "Les fiches et le coach du site, toute l'année, sans surcoût.",
            ].map((l) => (
              <li
                key={l}
                className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.05] p-3 text-sm font-semibold leading-6 text-white/80"
              >
                <span aria-hidden className="text-amber-300">
                  ✓
                </span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ⚠️ LE SEUIL — motif PÉDAGOGIQUE, pas comptable (voir le bloc TARIF).
            Il est public parce qu'un candidat préfère largement l'apprendre
            maintenant que le 3 octobre à 8 h devant une porte fermée. */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-base font-black text-white">
            De {TARIF.seuilOuverture} à {TARIF.plafondGroupe} participants, pas plus
          </h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
            En dessous de {TARIF.seuilOuverture}, on ne confronte plus rien&nbsp;:
            la moitié de ce qu&apos;on apprend un samedi vient de la copie du
            voisin, pas de la mienne. Si le groupe ne se forme pas, vous êtes
            prévenu deux semaines avant le 3 octobre et vous n&apos;avez rien
            avancé. Au-delà de {TARIF.plafondGroupe}, je ne peux plus corriger
            toutes les copies dans la séance — et c&apos;est précisément ce que
            vous venez chercher.
          </p>
        </div>

        {/* ── CE QUE ÇA N'EST PAS ────────────────────────────────────────── */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <h2 className="text-lg font-black text-white">
            🚫 Ce que ce n&apos;est pas
          </h2>
          <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-white/75">
            {CE_QUE_CE_NEST_PAS.map((l) => (
              <li key={l} className="flex gap-2">
                <span aria-hidden className="text-white/30">
                  —
                </span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── CONTACT ─────────────────────────────────────────────────────
            Pas de formulaire : à ce stade, il n'y a rien à encaisser en ligne
            et une inscription se règle en trois phrases. Un formulaire
            ajouterait un délai entre l'envie et le contact. */}
        <div
          id="inscription"
          className="mt-10 rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-400/[0.10] to-white/[0.03] p-5 sm:p-6"
        >
          <h2 className="text-xl font-black text-white">
            Retenir votre place pour le 3 octobre
          </h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-white/75">
            Rendez-vous à {LIEU_LONG}, {HORAIRES_PHRASE}. Dites-moi où vous en
            êtes et ce que vous ratez d&apos;habitude en maths. Aucune avance à
            verser&nbsp;: on se compte, et la session s&apos;ouvre si nous sommes
            assez.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="tel:+262692742958"
              className="rounded-xl bg-amber-400 px-5 py-3 text-base font-black text-[#041B33] transition hover:bg-amber-300"
            >
              📞 06 92 74 29 58
            </a>
            <a
              href="mailto:contact@eleveai.fr?subject=Pr%C3%A9paration%20CRPE%20-%20maths%20-%20Saint-Pierre"
              className="rounded-xl border border-white/20 bg-white/[0.06] px-5 py-3 text-base font-black text-white transition hover:bg-white/[0.12]"
            >
              ✉️ contact@eleveai.fr
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-sm font-bold text-white/50">
          <Link href="/" className="underline underline-offset-2 hover:text-white">
            ← Retour au journal
          </Link>
        </p>
      </div>
    </main>
  );
}

// Une séance = une ligne. Le numéro compte : un candidat qui hésite regarde
// d'abord combien il en reste après celle où il pourrait entrer.
function SeanceLigne({ n, s }: { n: number; s: Seance }) {
  return (
    <li className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-black text-[#041B33]">
        {n}
      </span>
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-white/50">
          {s.date}
        </p>
        <h3 className="mt-0.5 text-base font-black text-white">{s.titre}</h3>
        <p className="mt-1 text-sm font-semibold leading-6 text-white/70">
          {s.detail}
        </p>
      </div>
    </li>
  );
}
