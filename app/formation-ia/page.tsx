// /formation-ia — L'ÉCOLE IA PRATIQUE, VOLET ENTREPRISES.
//
// ⚠️ CETTE PAGE N'EST PAS /entreprises, ET NE DOIT PAS LA REMPLACER.
// /entreprises invite les maisons de l'île à nourrir le journal : partenariat
// PÉDAGOGIQUE et GRATUIT, aucun euro dans aucun sens. Ici, c'est l'inverse :
// une prestation, avec un chiffre au bout. Fondre les deux ferait douter de la
// première — « alors le partenariat gratuit, c'était l'appât ? ». Deux pages,
// deux promesses, aucun malentendu.
//
// ⛔ TANT QUE LE STATUT N'EST PAS RÉGLÉ, elle reste en `noindex` et n'est
// liée depuis nulle part : ni le header, ni le sitemap, ni le pied de page.
// Un fonctionnaire qui facture une prestation doit y être autorisé (cumul
// d'activités). La page existe, elle est prête, elle ne se voit pas encore.
// Pour l'ouvrir : retirer le bloc `robots` ci-dessous, ajouter la ligne dans
// `app/sitemap.ts`, et la lier depuis là où c'est utile.
//
// ⭐ LE PARI DE LA PAGE : ne rien promettre, montrer. On ne dit pas « je forme
// à l'IA », on dit « voilà ce que j'ai trouvé chez quelqu'un, voilà combien ça
// vaut, voilà comment je l'ai trouvé ». La formation est la suite logique, pas
// l'argument.

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://www.eleveai.fr";

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️⚠️ LE CHIFFRE — À REMPLIR AVANT TOUTE MISE EN LIGNE ⚠️⚠️
//
// Toute la page repose sur cet objet. Il est volontairement faux : personne ne
// peut inventer le résultat d'un audit à ta place, et un chiffre inventé sur
// une page publique vaut moins que pas de chiffre du tout — il suffit d'un
// client qui demande à voir le détail.
//
// `montant`   : le gain annuel estimé, tel que tu le défends à l'oral.
// `client`    : « un hôtel de Saint-Pierre », « un garage du Tampon »… Le
//               secteur et le lieu suffisent, le nom seulement s'il t'autorise
//               par écrit à le citer.
// `duree`     : le temps que l'analyse t'a réellement pris.
// `constats`  : ce que tu as trouvé. Un constat = un fait mesuré + sa
//               conséquence en euros. Pas d'adjectif, pas de « il faudrait ».
// `methode`   : comment le montant se calcule, en une phrase qu'un dirigeant
//               peut refaire de tête. C'est CE bloc qui fait la différence
//               entre un audit et une devinette.
//
// Tant que `montant` vaut null, la page affiche l'encart « audit en cours de
// publication » au lieu d'un faux chiffre. Rien à supprimer : tu remplis, elle
// s'allume.
// ─────────────────────────────────────────────────────────────────────────────
const AUDIT: {
  montant: number | null;
  client: string;
  duree: string;
  constats: { fait: string; consequence: string }[];
  methode: string;
} = {
  montant: null,
  client: "— à compléter —",
  duree: "— à compléter —",
  constats: [
    { fait: "— le fait mesuré —", consequence: "— ce que ça coûte, en euros —" },
    { fait: "— le fait mesuré —", consequence: "— ce que ça coûte, en euros —" },
    { fait: "— le fait mesuré —", consequence: "— ce que ça coûte, en euros —" },
  ],
  methode: "— la phrase de calcul, refaisable de tête —",
};

const montantLisible =
  AUDIT.montant === null
    ? null
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(AUDIT.montant);

export const metadata: Metadata = {
  // Le layout ajoute déjà « — EleveAI » : pas de suffixe ici.
  title: "L'IA en pratique, pour les entreprises",
  description:
    "Pas un cours sur l'intelligence artificielle : un audit chiffré de votre site, la correction faite devant vous, puis vos équipes qui la refont sans moi. La Réunion.",
  alternates: { canonical: `${SITE_URL}/formation-ia` },
  // ⛔ Voir l'en-tête : tant que le statut n'est pas réglé, cette page ne
  // s'indexe pas. C'est la seule ligne à retirer pour l'ouvrir.
  robots: { index: false, follow: false },
};

// LES TROIS TEMPS. Un dirigeant n'achète pas une formation, il achète un
// résultat ; il n'accepte une formation que s'il a vu le résultat d'abord.
// D'où l'ordre : on mesure, on corrige devant lui, on lui rend la main.
const TEMPS = [
  {
    n: "1",
    titre: "On mesure",
    duree: "Gratuit",
    texte:
      "J'analyse votre page comme un client l'utilise, et je chiffre ce que vous laissez sur la table. Vous recevez le montant ET le calcul : vous pouvez le refaire, le contester, le montrer à votre comptable.",
  },
  {
    n: "2",
    titre: "On corrige ensemble",
    duree: "Une demi-journée",
    texte:
      "Je ne repars pas avec un rapport que personne ne lira. On ouvre la page, on la reprend, et vous voyez le chiffre bouger. Vous n'apprenez pas l'IA : vous vous en servez, sur vos propres pages.",
  },
  {
    n: "3",
    titre: "Vos équipes le refont sans moi",
    duree: "À définir ensemble",
    texte:
      "Le but n'est pas que vous me rappeliez tous les mois. C'est que la personne qui tient votre site sache refaire l'analyse seule, sur la page suivante — et sache reconnaître quand l'IA se trompe.",
  },
];

// CE QUE VOS ÉQUIPES SAVENT FAIRE À LA FIN.
//
// ⭐ Des GESTES, pas des connaissances. Chaque ligne commence par un verbe et
// se vérifie en regardant quelqu'un travailler. « Comprendre les limites d'un
// modèle de langage » ne se vérifie pas : c'est du Pix, c'est de la théorie, et
// c'est exactement ce que cette page ne vend pas.
const GESTES = [
  {
    verbe: "Écrire une consigne",
    texte:
      "qui donne un résultat utilisable du premier coup, au lieu de six allers-retours. C'est la compétence qui fait gagner le plus d'heures, et celle qu'on enseigne le moins.",
  },
  {
    verbe: "Vérifier ce qui est affirmé",
    texte:
      "L'IA invente avec aplomb. Savoir en trente secondes si un chiffre sorti d'une machine tient debout — c'est ça, la culture numérique utile.",
  },
  {
    verbe: "Refaire l'audit seuls",
    texte:
      "Sur la page suivante, sans moi. La méthode est écrite, elle tient sur une feuille, et elle marche sur n'importe quelle page.",
  },
  {
    verbe: "Chiffrer avant de lancer",
    texte:
      "Combien rapporte ce chantier, combien il coûte, et donc s'il faut le faire. Décider avant de dépenser, plutôt que l'inverse.",
  },
  {
    verbe: "Savoir quand s'en passer",
    texte:
      "La moitié du travail. Il y a des tâches où l'IA fait perdre du temps, et le reconnaître évite les projets qu'on abandonne au bout de trois mois.",
  },
];

// CE QUE ÇA N'EST PAS. Dit franchement, parce que le marché est saturé de
// promesses et qu'un dirigeant a déjà reçu quatre mails cette semaine.
const CE_QUE_CE_NEST_PAS = [
  "Un cours sur « qu'est-ce que l'intelligence artificielle ». Vos équipes le savent déjà, et ça ne leur a rien rapporté.",
  "Une certification. Il n'y a pas de diplôme au bout, il y a une page qui marche mieux qu'avant.",
  "Un abonnement à un outil de plus. Vous repartez avec une méthode, pas avec une licence à renouveler.",
];

export default function FormationIaPage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#041B33] px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Fond : quadrillage « cahier » + halos, comme /entreprises et l'accueil —
          on reste chez soi. Accent cyan, celui de l'IA sur le site, pour que
          l'œil distingue tout de suite cette page de l'ambre du partenariat. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute -left-40 top-[-8%] h-[34rem] w-[34rem] rounded-full bg-cyan-400/12 blur-[120px]" />
        <div className="absolute right-[-12%] top-[26%] h-[30rem] w-[30rem] rounded-full bg-emerald-500/12 blur-[120px]" />
        <div className="absolute left-[8%] top-[66%] h-[30rem] w-[30rem] rounded-full bg-indigo-500/12 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <p className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-cyan-300">
          🏝️ Entreprises &amp; indépendants · La Réunion
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
          L&apos;IA en pratique&nbsp;:{" "}
          <span className="text-cyan-300">
            on commence par ce qu&apos;elle vous rapporte
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/80 sm:text-lg">
          Pas un cours sur l&apos;intelligence artificielle. Un audit chiffré de
          votre site, la correction faite devant vous, puis vos équipes qui la
          refont sans moi.
        </p>

        {/* Le mot de Frédéric : d'où vient la légitimité. Elle ne vient pas
            d'un certificat, elle vient de la salle de classe — et c'est
            précisément ce qui la rend crédible en entreprise. */}
        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <Image
            src="/images/avatar-frederic-Lacoste.jpg"
            alt="Frédéric Lacoste, professeur de mathématiques à La Réunion, fondateur d'EleveAI"
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 rounded-full border-2 border-cyan-300/60 object-cover sm:h-16 sm:w-16"
          />
          <p className="text-sm font-semibold leading-6 text-white/85">
            «&nbsp;J&apos;enseigne les maths, et je fabrique ce site tout seul,
            en direct, devant mes élèves. L&apos;IA, je ne l&apos;explique
            pas&nbsp;: je m&apos;en sers tous les jours, et ça se voit dans ce
            qui sort. C&apos;est la seule chose que je sais transmettre — le
            geste, pas la définition.&nbsp;»
            <span className="mt-1 block text-xs font-black text-white/50">
              — Frédéric Lacoste, professeur de mathématiques, fondateur d&apos;EleveAI
            </span>
          </p>
        </div>

        {/* ── LE CONSTAT ─────────────────────────────────────────────────── */}
        <h2 className="mt-10 text-xl font-black text-white sm:text-2xl">
          Tout le monde sait ce qu&apos;est l&apos;IA. Personne ne sait quoi en
          faire lundi matin.
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-white/75 sm:text-base">
          Les formations existantes répondent à une question que plus personne
          ne se pose. Vos équipes n&apos;ont pas besoin de savoir comment un
          modèle est entraîné&nbsp;: elles ont besoin de savoir quoi lui
          demander, comment vérifier ce qu&apos;il répond, et à quel moment il
          vaut mieux s&apos;en passer. Ça ne s&apos;apprend pas dans un
          diaporama&nbsp;— ça s&apos;apprend sur vos propres pages, avec vos
          propres chiffres.
        </p>

        {/* ── LA PREUVE ──────────────────────────────────────────────────── */}
        <h2 className="mt-10 text-xl font-black text-white sm:text-2xl">
          🔎 La preuve avant la promesse
        </h2>
        <p className="mt-1 text-sm font-semibold text-white/60">
          Un audit récent, et le calcul qui va avec. Vous pouvez le refaire.
        </p>

        {montantLisible === null ? (
          // Pas de chiffre tant que l'audit n'est pas rédigé : mieux vaut un
          // encart honnête qu'un montant inventé qu'on ne saurait pas défendre.
          <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-white/50">
              Audit en cours de publication
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
              Le premier audit chiffré est en cours de rédaction avec la maison
              concernée&nbsp;: on ne publie un montant qu&apos;avec son accord,
              et avec le détail du calcul. En attendant, la méthode est décrite
              plus bas — et l&apos;audit de votre page, lui, est disponible tout
              de suite.
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/[0.12] to-white/[0.03] p-5 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-cyan-300">
                  {AUDIT.client}
                </p>
                <p className="mt-1 text-4xl font-black text-white sm:text-5xl">
                  {montantLisible}
                </p>
                <p className="text-sm font-bold text-white/60">
                  de gain annuel estimé, trouvé en {AUDIT.duree}
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {AUDIT.constats.map((c) => (
                <li
                  key={c.fait}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5"
                >
                  <p className="text-sm font-black text-white">{c.fait}</p>
                  <p className="mt-0.5 text-sm font-semibold leading-6 text-white/70">
                    {c.consequence}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl border border-emerald-300/25 bg-emerald-400/[0.08] p-4">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                Comment le montant se calcule
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-white/80">
                {AUDIT.methode}
              </p>
            </div>
          </div>
        )}

        {/* ── LES TROIS TEMPS ────────────────────────────────────────────── */}
        <h2 className="mt-10 text-xl font-black text-white sm:text-2xl">
          Comment ça se passe
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {TEMPS.map((t) => (
            <div
              key={t.n}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-center gap-2">
                <p className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-sm font-black text-[#041B33]">
                  {t.n}
                </p>
                <p className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-black uppercase tracking-wide text-white/70">
                  {t.duree}
                </p>
              </div>
              <h3 className="mt-3 text-base font-black text-white">{t.titre}</h3>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-white/70">
                {t.texte}
              </p>
            </div>
          ))}
        </div>

        {/* ── LES GESTES ─────────────────────────────────────────────────── */}
        <h2 className="mt-10 text-xl font-black text-white sm:text-2xl">
          🛠️ Ce que vos équipes savent faire à la fin
        </h2>
        <p className="mt-1 text-sm font-semibold text-white/60">
          Des gestes, pas des définitions. Chacun se vérifie en les regardant
          travailler.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {GESTES.map((g) => (
            <div
              key={g.verbe}
              className="rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/[0.08] to-white/[0.03] p-5"
            >
              <h3 className="text-base font-black text-cyan-200">{g.verbe}</h3>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-white/75">
                {g.texte}
              </p>
            </div>
          ))}
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

        {/* ── LE LIEN AVEC L'ÉCOLE ───────────────────────────────────────
            Ce n'est pas un hors-sujet : c'est la preuve que la méthode tient
            debout ailleurs qu'en réunion. Un dirigeant qui hésite peut aller
            voir, tout de suite, ce qui tourne déjà. */}
        <div className="mt-8 rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-400/[0.10] to-white/[0.03] p-5 sm:p-6">
          <h2 className="text-lg font-black text-white">
            🎓 La même méthode, côté élèves
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-white/80">
            EleveAI, c&apos;est déjà des milliers de pages fabriquées avec ces
            outils, en direct, devant des classes. Vous pouvez tout ouvrir sans
            me parler&nbsp;:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/prompt-pedagogique"
              className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm font-black text-white transition hover:bg-white/[0.12]"
            >
              L&apos;optimiseur de consignes →
            </Link>
            <Link
              href="/parcours-ia"
              className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm font-black text-white transition hover:bg-white/[0.12]"
            >
              Le diagnostic d&apos;usage →
            </Link>
            <Link
              href="/coach-ia/ia"
              className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm font-black text-white transition hover:bg-white/[0.12]"
            >
              Le coach IA →
            </Link>
          </div>
        </div>

        {/* ── CONTACT ─────────────────────────────────────────────────────
            Pas de formulaire ici, volontairement. Une entreprise qui a vu un
            montant chiffré appelle ; un formulaire ajouterait un délai entre
            l'envie et le contact. */}
        <div
          id="audit"
          className="mt-10 rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/[0.10] to-white/[0.03] p-5 sm:p-6"
        >
          <h2 className="text-xl font-black text-white">
            L&apos;audit de votre page, gratuit
          </h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-white/75">
            Envoyez-moi l&apos;adresse de votre site. Vous recevez le montant et
            le calcul, sans engagement — et vous en faites ce que vous voulez,
            y compris le corriger vous-même.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="tel:+262692742958"
              className="rounded-xl bg-cyan-400 px-5 py-3 text-base font-black text-[#041B33] transition hover:bg-cyan-300"
            >
              📞 06 92 74 29 58
            </a>
            <a
              href="mailto:contact@eleveai.fr?subject=Audit%20de%20ma%20page"
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
