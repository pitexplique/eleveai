// /formation-crpe — STAGE INTENSIF DE MATHS DU CRPE, 4 → 8 JANVIER 2027.
//
// ⭐ 25/11/2026, en fin de soirée : « stage du 3 au 7 janvier » → UNE semaine,
// lundi 4 → vendredi 8 janvier (choisi par Frédéric : le 3 est un dimanche).
// Les « 15 jours » de plus haut sont remplacés par ces 5 jours.
//
// ⭐⭐ 25/11/2026 — LA PAGE EST REFAITE. La formule des 14 samedis d'octobre à
// mars (60 € la matinée) n'a eu AUCUN inscrit au 19/10. Frédéric, 25/11 :
// « le concours est en mars », « 15 jours en présentiel à l'hôtel Terre-
// Sainte », « stage intensif en bloc », « en janvier c'est le moment à La
// Réunion où les personnes sont libres », « 10 places maximum c'est un atout »,
// « élèves sélectionnés », « je peux faire deux sessions », « je peux aussi
// vendre en distance avec une caméra », « 300 € la semaine » (« les 15 jours ne
// peuvent pas être à 850 » : PAS de remise), « je paie pas café ! », « elle
// doit être encourageante ». Il est libre du 19 décembre au 1er février.
// Le candidat « stresse » : la page rassure d'abord. Et la première semaine
// de l'année = « les bonnes résolutions de l'année » (son accroche, 25/11).
//
// ⚠️ CE QUI EST UNE PROPOSITION DE CLAUDE, PAS UNE DÉCISION DE FRÉDÉRIC :
// - la date de la 2e semaine (lundi 11 → vendredi 15 janvier ; lui : « une
//   seconde semaine en janvier du lundi au vendredi ») ;
// - 250 €/semaine à distance, l'acompte de 100 €, le seuil de 4 par session ;
// - les options d'après-stage (épreuve blanche de mars 60 €, suivi 100 €/mois).
// Tout se change dans les constantes ci-dessous, une seule fois.
//
// ✅ Cumul d'activité : le rectorat a dit le 02/11/2026 qu'aucune autorisation
// n'est nécessaire pour être indépendant — la distance payante est donc possible.
//
// L'ARGENT (pour mémoire, jamais à l'écran) : salle de l'hôtel 250 €/semaine
// QUEL QUE SOIT le nombre d'élèves ; URSSAF ~26 % du CA ; pub Insta/Facebook
// ~300 €. Par session de 10 en salle : 3 000 € de CA (son chiffre du 25/11).
//
// ⚠️ L'URL reste en minuscules et courte (elle se dit au téléphone).
// Le langage visuel est celui de /parents et /espace-profs : fond clair, cartes
// blanches, UN seul bloc #041B33 (l'inscription).

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import VideoStage from "./VideoStage";

const SITE_URL = "https://www.eleveai.fr";
const TEL = "06 92 74 29 58";
const TEL_HREF = "tel:+262692742958";

const LIEU = {
  nom: "Hôtel Terre-Sainte",
  ville: "Saint-Pierre",
};
const LIEU_LONG = `l'${LIEU.nom}, à ${LIEU.ville}`;

const STAGE = {
  periode: "du lundi au vendredi, au choix du 4 au 8 ou du 11 au 15 janvier 2027",
  periodeCourte: "4-8 ou 11-15 janvier 2027",
  // Frédéric, 25/11 : « les horaires à La Réunion 14 h-18 h » (= 11 h-15 h à
  // Paris en janvier : la distance convient à la métropole).
  horaire: "14 h – 18 h",
  heuresParJour: 4,
};

// Deux sessions identiques d'une semaine (Frédéric, 25/11 : « stage du 3 au
// 7 janvier », puis « et une seconde semaine en janvier du lundi au vendredi »).
const SESSIONS = [
  { nom: "Session 1", dates: "lundi 4 → vendredi 8 janvier", debutIso: "2027-01-04", finIso: "2027-01-08", emoji: "🎉" },
  { nom: "Session 2", dates: "lundi 11 → vendredi 15 janvier", debutIso: "2027-01-11", finIso: "2027-01-15", emoji: "🌴" },
];

const TARIF = {
  salleSemaine: 300,
  distanceSemaine: 250,
  acompte: 100,
  placesParSession: 10,
  placesDistance: 10,
  seuilOuverture: 4,
  epreuveBlancheMars: 60,
  suiviMois: 100,
};

// Les écrits du concours externe 2027 (CNED et prépas, 25/11/2026 ; à revoir
// si le ministère publie autre chose).
const ECRITS = "30 et 31 mars 2027";

// Chiffres officiels 2026, académie de La Réunion, concours externe public
// (devenirenseignant.gouv.fr, « données statistiques des CRPE session 2026 ») :
// 68 + 81 postes ; ~2 056 présents ; ~509 admissibles ; 149 admis.
const REUNION_2026 = { postes: 149, presents: "2 000", admissibles: "500" };

type Jour = { date: string; titre: string; detail: string };

// ⛔ L'ORDRE est celui de la progression validée par Frédéric le 22/08/2026
// (« les 14 séances sont parfaites »). Le 25/11 il ramène le stage à UNE
// semaine (« stage du 3 au 7 janvier » → lundi 4 → vendredi 8, choisi par lui) :
// les 14 thèmes + l'orthographe sont regroupés en 5 journées, dans le même
// ordre, sans en retirer. Les jours de `test/questions.ts` suivent ceux-ci.
const SEMAINES: { titre: string; jours: Jour[] }[] = [
  {
    titre: "Une semaine, cinq journées",
    jours: [
      {
        date: "Jour 1 · lundi",
        titre: "Nombres et proportionnalité",
        detail:
          "On ouvre par une courte épreuve d'entrée, puis on travaille le socle : fractions, décimaux, priorités, ordres de grandeur, puis la proportionnalité, les pourcentages et les échelles, le thème le plus rentable du concours.",
      },
      {
        date: "Jour 2 · mardi",
        titre: "Arithmétique, grandeurs et mesures",
        detail:
          "Divisibilité, nombres premiers, PGCD et PPCM, puis conversions, périmètres, aires, volumes et durées. Des points faciles à prendre, et le chapitre que vous enseignerez le plus souvent.",
      },
      {
        date: "Jour 3 · mercredi",
        titre: "Géométrie, espace, statistiques, probabilités",
        detail:
          "Triangles, quadrilatères, Thalès, Pythagore : on rédige une démonstration entière, ensemble. Puis solides et patrons, lecture de données, probabilités : souvent négligés, donc rentables.",
      },
      {
        date: "Jour 4 · jeudi",
        titre: "Élèves, algèbre, rédaction",
        detail:
          "Analyser des productions d'élèves (la partie qui rapporte le plus), mettre en équation, raisonner et justifier. Et la copie : les mots des maths, l'orthographe, des phrases qu'un correcteur a plaisir à suivre.",
      },
      {
        date: "Jour 5 · vendredi",
        titre: "Épreuve blanche, et votre plan jusqu'à l'écrit",
        detail:
          "Un sujet complet, en temps réel. On corrige ensemble les pièges qui reviennent, puis vous repartez avec un plan clair pour février et mars. Votre copie vous est rendue annotée.",
      },
    ],
  },
];

const NB_JOURS = SEMAINES.reduce((n, s) => n + s.jours.length, 0);
const NB_SEMAINES = SEMAINES.length;
const NB_HEURES = NB_JOURS * STAGE.heuresParJour;

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

const FAQ: { q: string; r: string }[] = [
  {
    q: "Je ne suis pas à l'aise en maths. C'est pour moi ?",
    r: "Oui, c'est même pour vous qu'il existe. Les tests servent à savoir d'où vous partez, pas à vous écarter : on part de là où vous êtes, et on avance un jour après l'autre.",
  },
  {
    q: "Pourquoi une sélection ?",
    r: `Pour que le groupe avance au même rythme et que je corrige toutes les copies chaque jour. D'où ${TARIF.placesParSession} places en salle par session, pas plus. On vérifie ensemble, au téléphone, que le stage vous convient.`,
  },
  {
    q: "Comment se passe la distance ?",
    r: "Vous suivez la journée en direct, avec le groupe en salle : une caméra filme le tableau. Vous envoyez votre copie en photo, je vous la rends annotée, comme aux autres.",
  },
  {
    q: "Comment se règle le stage ?",
    r: `Un acompte de ${eur(TARIF.acompte)} réserve votre place quand vous êtes retenu ; le reste se règle le premier jour. Si le stage n'ouvre pas, l'acompte vous est rendu.`,
  },
  {
    q: "Et si la session ne se remplit pas ?",
    r: `Une session ouvre à partir de ${TARIF.seuilOuverture} candidats. Sinon, on vous propose l'autre semaine, ou votre acompte vous est rendu.`,
  },
  {
    q: "C'est finançable par le CPF ?",
    r: "Non. Il n'y a pas de diplôme au bout et aucun financement CPF n'est possible aujourd'hui : vous payez directement.",
  },
  {
    q: "Vous préparez aussi le français, les oraux, le dossier ?",
    r: "Non. Ici, ce sont les mathématiques, et la copie qui va avec. Je préfère faire une épreuve très bien que quatre à moitié.",
  },
];

function donneesStructurees() {
  const offre = (prix: number, nom: string) => ({
    "@type": "Offer",
    name: nom,
    price: prix * NB_SEMAINES,
    priceCurrency: "EUR",
    category: "Paid",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/formation-crpe#inscription`,
  });
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Stage intensif de mathématiques du CRPE — ${LIEU.ville}, La Réunion`,
    description:
      `${NB_JOURS} jours de ${STAGE.heuresParJour} heures, ${STAGE.periode}, pour préparer ` +
      `l'épreuve écrite de mathématiques du CRPE. En salle à ${LIEU_LONG} ou à distance en direct, ` +
      `par un professeur de mathématiques en exercice.`,
    url: `${SITE_URL}/formation-crpe`,
    inLanguage: "fr-FR",
    provider: { "@type": "Organization", name: "EleveAI", url: SITE_URL },
    offers: [
      offre(TARIF.salleSemaine, "Stage en salle"),
      offre(TARIF.distanceSemaine, "Stage à distance"),
    ],
    hasCourseInstance: SESSIONS.flatMap((sess) => [
      {
        "@type": "CourseInstance",
        name: sess.nom,
        courseMode: "onsite",
        courseWorkload: `PT${NB_HEURES}H`,
        startDate: sess.debutIso,
        endDate: sess.finIso,
        maximumAttendeeCapacity: TARIF.placesParSession,
        location: {
          "@type": "Place",
          name: LIEU.nom,
          address: {
            "@type": "PostalAddress",
            addressLocality: LIEU.ville,
            addressRegion: "La Réunion",
            addressCountry: "RE",
          },
        },
        instructor: { "@type": "Person", name: "Frédéric Lacoste" },
      },
      {
        "@type": "CourseInstance",
        name: sess.nom,
        courseMode: "online",
        courseWorkload: `PT${NB_HEURES}H`,
        startDate: sess.debutIso,
        endDate: sess.finIso,
        maximumAttendeeCapacity: TARIF.placesDistance,
        instructor: { "@type": "Person", name: "Frédéric Lacoste" },
      },
    ]),
  };
}

function donneesFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };
}

const DESCRIPTION =
  `Stage intensif de ${NB_JOURS} jours, ${STAGE.periodeCourte}, pour réussir l'écrit de maths du CRPE ` +
  `(${ECRITS}). À l'${LIEU.nom}, ${LIEU.ville}, ou à distance en direct. ` +
  `${eur(TARIF.salleSemaine)} la semaine. ${TARIF.placesParSession} places par session.`;

export const metadata: Metadata = {
  title: `Stage intensif CRPE maths, janvier 2027, à ${LIEU.ville} (La Réunion)`,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/formation-crpe` },
  // ⚠️ Next ne fusionne pas `openGraph` avec celui du layout : l'image est
  // déclarée ici. Elle est régénérée pour le stage de janvier (25/11) par
  // scripts/pub-crpe-instagram.py, avec le post et la story.
  openGraph: {
    title: `Les maths du CRPE en ${NB_JOURS} jours, en janvier, à ${LIEU.ville}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/formation-crpe`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/images/formation-crpe-partage-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Stage intensif de maths du CRPE, une semaine en janvier 2027, Saint-Pierre, La Réunion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Les maths du CRPE en ${NB_JOURS} jours, en janvier, à ${LIEU.ville}`,
    description: DESCRIPTION,
    images: ["/images/formation-crpe-partage-1200x630.jpg"],
  },
};

const TEINTES = [
  "from-amber-400 to-orange-500",
  "from-rose-400 to-pink-500",
  "from-sky-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-fuchsia-500",
];

export default function FormationCrpePage() {
  let numero = 0;
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-amber-50 via-rose-50/40 to-sky-50 px-4 pb-28 pt-10 text-slate-900 sm:px-6 sm:pb-12 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesStructurees()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesFaq()) }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-[-6%] h-[32rem] w-[32rem] rounded-full bg-amber-200/40 blur-[120px]" />
        <div className="absolute right-[-14%] top-[30%] h-[30rem] w-[30rem] rounded-full bg-rose-200/40 blur-[120px]" />
        <div className="absolute left-[6%] top-[70%] h-[30rem] w-[30rem] rounded-full bg-sky-200/40 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <p className="inline-flex items-center rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
          🎉 Bonne résolution 2027 · stage intensif · {STAGE.periodeCourte}
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
          Les maths du CRPE{" "}
          <span className="relative whitespace-nowrap text-orange-600">
            en {NB_JOURS} jours
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-orange-300/70"
            />
          </span>
          , pour arriver serein en mars
        </h1>

        <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-lg">
          Votre bonne résolution pour 2027&nbsp;: commencer l&apos;année par le
          concours. Une semaine intensive, {STAGE.periode}, de 14 h à 18 h (heure de La Réunion), à {LIEU_LONG}{" "}
          ou à distance en direct. Vous écrivez, je corrige votre copie chaque
          jour, et vous voyez vos progrès. Les écrits sont les {ECRITS}&nbsp;:
          vous avez le temps, et un plan.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/formation-crpe/test"
            className="rounded-2xl bg-orange-500 px-7 py-3.5 text-base font-black text-white shadow-lg shadow-orange-500/20 transition hover:scale-105 hover:bg-orange-400"
          >
            🎯 Faire le test d&apos;entrée (15 min)
          </Link>
          <a
            href="#programme"
            className="rounded-2xl bg-white px-7 py-3.5 text-base font-black text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Voir les {NB_JOURS} jours
          </a>
        </div>
        {/* Frédéric, 25/11 : « met mon numéro de téléphone », « frederic : ». */}
        <p className="mt-4 text-base font-black text-slate-800">
          <a href={TEL_HREF} className="underline decoration-orange-300 decoration-2 underline-offset-4 hover:text-orange-600">
            📞 Frédéric&nbsp;: {TEL}
          </a>
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: `${NB_JOURS} jours`, v: `${NB_HEURES} h en une semaine, ${STAGE.horaire} · deux sessions en janvier`, c: "text-sky-600" },
            { k: eur(TARIF.salleSemaine), v: `la semaine en salle · ${eur(TARIF.distanceSemaine)} à distance`, c: "text-orange-600" },
            { k: `${TARIF.placesParSession} places`, v: "par session, après les tests : chaque copie corrigée", c: "text-rose-600" },
            { k: "30-31 mars", v: "les écrits 2027 : vous arrivez prêt", c: "text-emerald-600" },
          ].map((c) => (
            <div key={c.k} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <p className={`whitespace-nowrap text-2xl font-black sm:text-3xl lg:text-2xl ${c.c}`}>{c.k}</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{c.v}</p>
            </div>
          ))}
        </div>

        {/* La vidéo YouTube du stage : visible à partir du 25/11 21 h 30
            (heure de La Réunion), voir VideoStage.tsx. */}
        <VideoStage />

        {/* ── LE STRESS : LA PAGE RASSURE D'ABORD ─────────────────────────
            Frédéric, 25/11 : le candidat « stresse », la page « doit être
            encourageante ». Les chiffres 2026 disent que l'écrit est l'étape
            décisive — dits comme une bonne nouvelle : c'est celle qui se
            prépare. */}
        <div className="mt-8 rounded-3xl bg-emerald-50 p-6 shadow-sm ring-1 ring-emerald-200 sm:p-7">
          <h2 className="text-lg font-black text-emerald-950 sm:text-xl">
            💚 Le concours approche et vous stressez&nbsp;? C&apos;est normal, et ça se prépare.
          </h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
            À La Réunion, en 2026, {REUNION_2026.postes} postes étaient ouverts.
            Sur environ {REUNION_2026.presents} candidats présents à
            l&apos;écrit, environ {REUNION_2026.admissibles} l&apos;ont
            franchi. L&apos;écrit est donc l&apos;étape décisive, et c&apos;est
            une bonne nouvelle&nbsp;: c&apos;est celle qui se travaille le mieux.
            Des exercices qui reviennent, une méthode, des copies corrigées.
          </p>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { n: "1", t: "Vous savez où vous en êtes", d: "Le test de 15 minutes vous le dit, thème par thème." },
              { n: "2", t: "Vous avez un plan", d: `${NB_JOURS} jours, dans l'ordre qui rapporte, et vos copies corrigées.` },
              { n: "3", t: "Vous arrivez prêt", d: "Une épreuve blanche corrigée, et un plan jusqu'au 30 mars." },
            ].map((e) => (
              <li key={e.n} className="rounded-2xl bg-white p-4 ring-1 ring-emerald-100">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-sm font-black text-white">
                  {e.n}
                </span>
                <p className="mt-2 text-sm font-black text-slate-900">{e.t}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{e.d}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* L'argument de métier (correction de Frédéric, 22/08) : l'épreuve
            porte sur l'école ET le collège. */}
        <div className="mt-6 rounded-3xl bg-rose-50 p-6 shadow-sm ring-1 ring-rose-200 sm:p-7">
          <h2 className="text-lg font-black text-rose-900 sm:text-xl">
            🎯 L&apos;épreuve va jusqu&apos;au collège, et c&apos;est là que je vous aide le plus
          </h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
            Vous préparez un métier qui s&apos;arrête au CM2, mais l&apos;épreuve
            porte sur le programme de l&apos;école{" "}
            <strong className="text-rose-800">et du collège</strong>&nbsp;:
            Thalès, Pythagore, PGCD, mise en équation, probabilités. Beaucoup de
            candidats révisent le primaire, qu&apos;ils maîtrisent déjà. Vous,
            vous travaillerez aussi le collège, avec quelqu&apos;un qui
            l&apos;enseigne tous les jours.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:flex-row sm:items-center sm:p-7">
          <Image
            src="/images/avatar-frederic-Lacoste.jpg"
            alt="Frédéric Lacoste, professeur de mathématiques à La Réunion, fondateur d'EleveAI"
            width={96}
            height={96}
            className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-amber-200 sm:h-24 sm:w-24"
          />
          <p className="text-sm font-semibold leading-7 text-slate-700">
            «&nbsp;J&apos;enseigne les mathématiques au collège, et j&apos;écris
            les fiches de cours du primaire, du CP au CM2. Le programme sur lequel
            on vous interroge, du CP à la troisième, je le relis ligne à ligne.
            C&apos;est de là que je vous prépare&nbsp;: du programme réel, avec
            des copies corrigées chaque jour.&nbsp;»
            <span className="mt-2 block text-xs font-black uppercase tracking-wide text-slate-400">
              — Frédéric Lacoste, professeur de mathématiques, fondateur d&apos;EleveAI
            </span>
          </p>
        </div>

        {/* ── COMMENT ON ENTRE ─────────────────────────────────────────── */}
        <h2 className="mt-12 text-2xl font-black sm:text-3xl">🔑 Comment on entre</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Des groupes petits, choisis, au même rythme. C&apos;est ce qui permet de
          corriger toutes les copies, tous les jours.
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            {
              t: "Les deux tests",
              d: (
                <>
                  Le{" "}
                  <Link href="/formation-crpe/test" className="font-black text-sky-700 underline underline-offset-2">
                    test de maths
                  </Link>{" "}
                  (18 questions) et le{" "}
                  <Link href="/formation-crpe/test-orthographe" className="font-black text-sky-700 underline underline-offset-2">
                    test d&apos;orthographe
                  </Link>{" "}
                  (21 questions). Un quart d&apos;heure chacun.
                </>
              ),
            },
            {
              t: "Un appel",
              d: (
                <>
                  Vous m&apos;appelez avec votre bilan&nbsp;:{" "}
                  <a href={TEL_HREF} className="whitespace-nowrap font-black text-sky-700 underline underline-offset-2">
                    Frédéric, {TEL}
                  </a>
                  . On choisit ensemble votre semaine, en salle ou à distance.
                </>
              ),
            },
            {
              t: "Votre place réservée",
              d: <>Un acompte de {eur(TARIF.acompte)} la réserve. Le reste se règle le premier jour.</>,
            },
          ].map((e, i) => (
            <li key={e.t} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-sm font-black text-white">
                {i + 1}
              </span>
              <p className="mt-2 text-base font-black text-slate-900">{e.t}</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{e.d}</p>
            </li>
          ))}
        </ol>

        {/* ── DEUX SESSIONS ────────────────────────────────────────────── */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {SESSIONS.map((g) => (
            <div key={g.nom} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-amber-200">
              <p className="text-xs font-black uppercase tracking-wide text-orange-600">
                {g.emoji} {g.nom} · {STAGE.horaire}
              </p>
              <p className="mt-1 text-2xl font-black text-slate-900">{g.dates}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {TARIF.placesParSession} places en salle, à l&apos;{LIEU.nom}.
                Le même programme dans les deux sessions&nbsp;: choisissez votre semaine.
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-3xl bg-sky-50 p-6 shadow-sm ring-1 ring-sky-200">
          <p className="text-base font-black text-sky-950">
            🎥 Pas à La Réunion&nbsp;? Suivez le stage à distance, en direct.
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
            Une caméra filme le tableau&nbsp;: vous êtes avec le groupe, vous
            posez vos questions, vous envoyez votre copie en photo et je vous la
            rends annotée. Les écrits ont lieu les mêmes jours dans toutes les
            académies. Horaires de La Réunion&nbsp;: 14 h – 18 h, soit 11 h – 15 h à
            Paris en janvier. {TARIF.placesDistance} places par session.
          </p>
        </div>

        {/* ── LE PROGRAMME ─────────────────────────────────────────────── */}
        <h2 id="programme" className="mt-12 scroll-mt-24 text-2xl font-black sm:text-3xl">
          🗓️ Les {NB_JOURS} jours
        </h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Une grande partie du programme par jour, dans l&apos;ordre qui rapporte. Vous savez dès
          aujourd&apos;hui ce que vous ferez chaque jour, dans l&apos;une ou l&apos;autre session.
        </p>
        {SEMAINES.map((s) => (
          <section key={s.titre}>
            <p className="mt-6 text-xs font-black uppercase tracking-wide text-orange-600">
              {s.titre}
            </p>
            <ol className="mt-3 space-y-3">
              {s.jours.map((j) => {
                numero += 1;
                return <JourLigne key={j.date} n={numero} j={j} />;
              })}
            </ol>
          </section>
        ))}

        {/* ── LE PRIX ──────────────────────────────────────────────────── */}
        <h2 className="mt-12 text-2xl font-black sm:text-3xl">💶 Le prix</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { titre: "En salle", lieu: `à l'${LIEU.nom}, ${LIEU.ville}`, semaine: TARIF.salleSemaine, ton: "from-amber-100 to-orange-100 ring-amber-200" },
            { titre: "À distance", lieu: "en direct, avec le groupe", semaine: TARIF.distanceSemaine, ton: "from-sky-100 to-cyan-100 ring-sky-200" },
          ].map((p) => (
            <div key={p.titre} className={`rounded-3xl bg-gradient-to-br p-6 shadow-md ring-1 sm:p-7 ${p.ton}`}>
              <p className="text-xs font-black uppercase tracking-wide text-slate-600">
                {p.titre} · {p.lieu}
              </p>
              <p className="mt-2 text-5xl font-black text-slate-900">
                {eur(p.semaine)}
                <span className="ml-2 align-middle text-base font-bold text-slate-600">la semaine</span>
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                Pour les {NB_JOURS} jours du stage, de {STAGE.heuresParJour} h chacun.
              </p>
            </div>
          ))}
        </div>
        <ul className="mt-4 grid gap-3 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:grid-cols-2 sm:p-7">
          {[
            "Les sujets, les corrigés, et votre copie annotée de ma main, chaque jour.",
            "L'épreuve blanche complète, et votre copie rendue annotée.",
            "Les fiches de cours et le coach du site, pour s'entraîner le soir.",
            `Un acompte de ${eur(TARIF.acompte)} pour réserver, rendu si le stage n'ouvre pas.`,
          ].map((l) => (
            <li key={l} className="flex gap-2.5 text-sm font-semibold leading-6 text-slate-700">
              <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white">
                ✓
              </span>
              <span>{l}</span>
            </li>
          ))}
        </ul>

        {/* ── APRÈS LE STAGE ───────────────────────────────────────────── */}
        <div
          id="suivi"
          className="mt-6 scroll-mt-24 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-amber-200 sm:p-7"
        >
          <p className="text-xs font-black uppercase tracking-wide text-orange-600">
            Après le stage, jusqu&apos;à l&apos;écrit
          </p>
          <h2 className="mt-1 text-lg font-black text-slate-900 sm:text-xl">
            👤 Vous n&apos;êtes pas seul en février et en mars
          </h2>
          <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-slate-700">
            <li>
              <strong>Une épreuve blanche en mars</strong>, un samedi avant
              l&apos;écrit, en salle ou à distance&nbsp;: {eur(TARIF.epreuveBlancheMars)}.
            </li>
            <li>
              <strong>Un suivi individuel</strong>&nbsp;: je regarde vos copies
              chaque semaine jusqu&apos;au concours, {eur(TARIF.suiviMois)} par mois.
            </li>
          </ul>
        </div>

        <div className="mt-6 rounded-3xl bg-violet-50 p-6 shadow-sm ring-1 ring-violet-200 sm:p-7">
          <h2 className="text-lg font-black text-violet-950">🏆 Les résultats seront publiés</h2>
          <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
            Après le concours, je publierai les résultats du groupe. C&apos;est un
            engagement&nbsp;: je ne prends que les candidats que je peux vraiment
            faire progresser, et je donne tout pour eux.
          </p>
        </div>

        {/* ── CE QUE ÇA N'EST PAS ──────────────────────────────────────── */}
        <div className="mt-10 rounded-3xl bg-slate-100 p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
          <h2 className="text-lg font-black text-slate-900 sm:text-xl">🚫 Ce que ce n&apos;est pas</h2>
          <ul className="mt-4 space-y-2.5 text-sm font-semibold leading-7 text-slate-600">
            {[
              "Une préparation complète au concours : ici, ce sont les mathématiques et la copie qui va avec. Le français, les oraux, le dossier : ce n'est pas moi.",
              "Une formation certifiante : pas de diplôme au bout, pas de financement CPF aujourd'hui.",
              "Un cours magistral : on fait des exercices, vous écrivez, je corrige.",
            ].map((l) => (
              <li key={l} className="flex gap-2.5">
                <span aria-hidden className="text-slate-400">—</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── LA FAQ ───────────────────────────────────────────────────── */}
        <h2 className="mt-12 text-2xl font-black sm:text-3xl">🙋 Les questions qu&apos;on me pose</h2>
        <div className="mt-5 space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 open:ring-orange-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-slate-900">
                {f.q}
                <span aria-hidden className="shrink-0 text-xl font-black text-orange-500 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{f.r}</p>
            </details>
          ))}
        </div>

        {/* ── INSCRIPTION (le seul bloc sombre) ────────────────────────── */}
        <div
          id="inscription"
          className="mt-12 scroll-mt-24 rounded-3xl bg-[#041B33] p-6 text-white shadow-xl sm:p-8"
        >
          <h2 className="text-2xl font-black sm:text-3xl">Réserver ma place au stage</h2>
          <p className="mt-2 text-sm font-semibold leading-7 text-white/75">
            Faites le test, puis appelez-moi avec votre bilan. On choisit
            ensemble votre semaine, en salle ou à distance.{" "}
            {TARIF.placesParSession} places par session&nbsp;: les premières
            réservées partent en premier.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/formation-crpe/test"
              className="rounded-2xl bg-orange-500 px-6 py-3.5 text-base font-black text-white shadow-lg transition hover:scale-105 hover:bg-orange-400"
            >
              🎯 Le test d&apos;entrée
            </Link>
            <a
              href={TEL_HREF}
              className="rounded-2xl bg-amber-400 px-6 py-3.5 text-base font-black text-[#041B33] shadow-lg transition hover:scale-105 hover:bg-amber-300"
            >
              📞 Frédéric&nbsp;: {TEL}
            </a>
            <a
              href="mailto:contact@eleveai.fr?subject=Stage%20CRPE%20maths%20-%204-8%20janvier%202027"
              className="rounded-2xl bg-white/10 px-6 py-3.5 text-base font-black text-white ring-1 ring-white/25 transition hover:bg-white/20"
            >
              ✉️ contact@eleveai.fr
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-slate-200 pt-8">
          <Image
            src="/cahier-vacances/ti-margo.png"
            alt="Ti Margo, le margouillat d'EleveAI, avec son crayon"
            width={1122}
            height={1402}
            sizes="44px"
            loading="lazy"
            className="h-11 w-auto"
          />
          <p className="text-center text-sm font-semibold text-slate-500">
            Un stage écrit et tenu par un professeur de mathématiques en exercice, à La Réunion.
          </p>
          <Link href="/" className="mt-1 text-sm font-bold text-slate-500 underline underline-offset-2 hover:text-slate-800">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>

      {/* Barre collante du téléphone (réserve `pb-28` sur le <main>). */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur sm:hidden">
        <a href={TEL_HREF} className="flex-1 rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-black text-white">
          📞 Appeler
        </a>
        <Link
          href="/formation-crpe/test"
          className="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-black text-slate-800"
        >
          🎯 Le test
        </Link>
      </div>
    </main>
  );
}

function JourLigne({ n, j }: { n: number; j: Jour }) {
  const teinte = TEINTES[(n - 1) % TEINTES.length];
  return (
    <li className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${teinte} text-sm font-black text-white shadow-sm`}
      >
        {n}
      </span>
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-slate-400">{j.date}</p>
        <h3 className="mt-0.5 text-base font-black text-slate-900">{j.titre}</h3>
        <p className="mt-1.5 text-sm font-semibold leading-7 text-slate-600">{j.detail}</p>
      </div>
    </li>
  );
}
