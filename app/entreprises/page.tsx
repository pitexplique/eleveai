// /entreprises — « Participez à l'aventure » : inviter les entreprises et
// institutions de La Réunion à nourrir le journal. Pas seulement des
// simulations : TOUS les formats (article, simulation, défi, vidéo « en
// vrai », picto). Partenariat PÉDAGOGIQUE et GRATUIT — pédagogie d'abord,
// jamais de pub ; l'entreprise fournit le réel, EleveAI garde la main
// pédagogique. (Pas de prestation payante tant que le statut n'est pas réglé.)

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FormulaireAventure from "./FormulaireAventure";

const SITE_URL = "https://www.eleveai.fr";

export const metadata: Metadata = {
  // Le layout ajoute déjà « — EleveAI » : pas de suffixe ici (sinon doublon).
  title: "Entreprises, participez à l'aventure",
  description:
    "Entreprises de La Réunion : votre métier peut devenir un article, une simulation, un défi ou une vidéo pour les élèves de l'île. Partenariat pédagogique gratuit — pédagogie d'abord, jamais de pub.",
  alternates: { canonical: `${SITE_URL}/entreprises` },
  openGraph: {
    title: "Entreprises, participez à l'aventure — EleveAI",
    description:
      "Votre métier, raconté aux élèves de La Réunion : article, simulation, défi, vidéo. Partenariat pédagogique gratuit.",
    url: `${SITE_URL}/entreprises`,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

// Ce qu'on a DÉJÀ fait avec le réel de l'île — les preuves, cliquables.
const PREUVES = [
  {
    emoji: "🏨",
    titre: "L'hôtel Le Terre Sainte",
    ligne:
      "Sa vraie grille de tarifs devenue une façade qui s'allume : remplissage, prix moyen, RevPAR, point mort.",
    href: "/simulateur-hotel",
    color: "border-amber-300/25 from-amber-400/[0.10]",
  },
  {
    emoji: "🏭",
    titre: "La machine à sucre",
    ligne: "De la canne au cristal : le rendement d'une usine sucrière, à manipuler.",
    href: "/simulateur-sucre",
    color: "border-amber-300/25 from-amber-400/[0.10]",
  },
  {
    emoji: "🧀",
    titre: "La fromagerie",
    ligne: "Du lait au fromage : litres, proportions et pertes, en vrai.",
    href: "/simulateur-fromage",
    color: "border-emerald-300/25 from-emerald-400/[0.10]",
  },
  {
    emoji: "💧",
    titre: "Le barrage hydroélectrique",
    ligne: "Débit, hauteur de chute, puissance : l'énergie de l'eau expliquée.",
    href: "/simulateur-barrage",
    color: "border-sky-300/25 from-sky-400/[0.10]",
  },
  {
    emoji: "🖼️",
    titre: "Picto Maths · 974",
    ligne: "25 défis « 1 image, 1 question » pris dans le quotidien de l'île.",
    href: "/picto-maths",
    color: "border-rose-300/25 from-rose-400/[0.10]",
  },
];

// LA PROPOSITION, EN CLAIR — écrite pour la personne qui décide, en deux
// colonnes : ce qu'elle donne, ce qu'elle reçoit. Un dirigeant n'a pas besoin
// d'être convaincu, il a besoin de savoir ce qu'on lui demande exactement.
const VOUS_DONNEZ = [
  {
    titre: "30 minutes, une fois",
    texte:
      "Vos vrais chiffres — ceux que vous regardez déjà tous les matins — et ce qui, dans votre métier, mérite d'être compris.",
  },
  {
    titre: "Le droit d'être cité",
    texte:
      "Vous relisez et validez tout avant publication. Un mot qui ne va pas, on le change ; un chiffre que vous ne voulez pas donner, on s'en passe.",
  },
  {
    titre: "Une heure sur place, si on filme",
    texte:
      "Seulement si on décide ensemble qu'une vidéo « en vrai » raconte mieux votre métier qu'une page. Un jour qui vous arrange.",
  },
];

const VOUS_RECEVEZ = [
  {
    titre: "Une page permanente sur eleveai.fr",
    texte:
      "Votre métier devenu une machine qu'on manipule — pas une plaquette qu'on feuillette. Elle reste en ligne, elle est indexée, elle travaille toute l'année.",
  },
  {
    titre: "Votre maison citée, avec le lien vers votre site",
    texte:
      "Créditée comme partenaire du journal. Jamais comme annonceur : il n'y aura pas d'encart publicitaire sur votre page, parce qu'il n'y en a nulle part.",
  },
  {
    titre: "L'outil est le vôtre aussi",
    texte:
      "Montrez-le à vos apprentis, à vos stagiaires, au lycée professionnel d'à côté. C'est un support de formation, gratuit, que vous pouvez projeter tel quel.",
  },
  {
    titre: "Vos métiers connus des élèves de l'île",
    texte:
      "Ceux qui vous recruteront dans cinq ans ont douze ans aujourd'hui. Ils apprendront votre métier en calculant dessus.",
  },
];

// Le parcours d'un partenariat, en 3 pas simples.
const ETAPES = [
  {
    n: "1",
    titre: "Vous racontez votre métier",
    texte:
      "Quelques lignes dans le formulaire : ce que vous faites, ce que vous aimeriez faire découvrir. Pas besoin d'être « matheux » — le réel suffit.",
  },
  {
    n: "2",
    titre: "On construit le bon format",
    texte:
      "Article du journal, simulation à manipuler, défi, vidéo « en vrai »… On choisit ensemble ce qui raconte le mieux votre activité — et on le fabrique.",
  },
  {
    n: "3",
    titre: "Les élèves s'en emparent",
    texte:
      "Votre métier entre dans leur apprentissage, et votre entreprise est mise à l'honneur — comme partenaire du journal, pas comme annonceur.",
  },
];

export default function EntreprisesPage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#041B33] px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Fond : quadrillage « cahier » + halos, même esprit que l'accueil. */}
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
        <div className="absolute right-[-12%] top-[24%] h-[30rem] w-[30rem] rounded-full bg-emerald-500/12 blur-[120px]" />
        <div className="absolute left-[8%] top-[64%] h-[30rem] w-[30rem] rounded-full bg-sky-500/12 blur-[120px]" />
        <span className="absolute right-[6%] top-[4%] rotate-12 text-7xl opacity-15 sm:text-8xl">🏭</span>
        <span className="absolute left-[3%] top-[30%] -rotate-12 text-6xl opacity-15 sm:text-7xl">🌾</span>
        <span className="absolute right-[5%] top-[55%] rotate-6 text-6xl opacity-15 sm:text-7xl">🧀</span>
        <span className="absolute left-[6%] top-[80%] -rotate-6 text-6xl opacity-15 sm:text-7xl">💧</span>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <p className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-300">
          🏝️ Entreprises &amp; institutions de La Réunion
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
          🚀 Entreprises,{" "}
          <span className="text-amber-300">participez à l&apos;aventure</span>
        </h1>

        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/80 sm:text-lg">
          Nos contenus sont variés — articles, simulations, défis, vidéos
          «&nbsp;en vrai&nbsp;» — et votre savoir-faire peut nourrir chacun
          d&apos;eux. Pour les élèves de La Réunion.
        </p>

        {/* Le mot de Frédéric : qui invite, et pourquoi. */}
        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <Image
            src="/images/avatar-frederic-Lacoste.jpg"
            alt="Frédéric Lacoste, professeur de mathématiques à La Réunion, fondateur d'EleveAI"
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 rounded-full border-2 border-amber-300/60 object-cover sm:h-16 sm:w-16"
          />
          <p className="text-sm font-semibold leading-6 text-white/85">
            «&nbsp;On apprend mieux avec ce qu&apos;on a sous les yeux. La
            canne, le lait, l&apos;eau, l&apos;énergie&nbsp;: chaque métier de
            l&apos;île est un cours qui s&apos;ignore. Ouvrez-moi votre porte —
            j&apos;en fais un contenu que les élèves manipulent.&nbsp;»
            <span className="mt-1 block text-xs font-black text-white/50">
              — Frédéric Lacoste, professeur de mathématiques, fondateur d&apos;EleveAI
            </span>
          </p>
        </div>

        {/* ── LA PROPOSITION, EN CLAIR ────────────────────────────────────
            Placée haut, avant les preuves : un dirigeant qui ouvre cette page
            sur son téléphone doit savoir en dix secondes ce qu'on lui demande
            et ce qu'il y gagne. Deux colonnes, rien à deviner. */}
        <h2 className="mt-10 text-xl font-black text-white sm:text-2xl">
          🤝 La proposition, en clair
        </h2>
        <p className="mt-1 text-sm font-semibold text-white/60">
          Ce que vous donnez, ce que vous recevez. Rien d&apos;autre en dessous.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-sky-300/25 bg-gradient-to-br from-sky-400/[0.10] to-white/[0.03] p-5">
            <h3 className="text-base font-black text-sky-200">Ce que vous donnez</h3>
            <ul className="mt-3 space-y-3">
              {VOUS_DONNEZ.map((d) => (
                <li key={d.titre}>
                  <p className="text-sm font-black text-white">{d.titre}</p>
                  <p className="mt-0.5 text-sm font-semibold leading-6 text-white/70">
                    {d.texte}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-400/[0.10] to-white/[0.03] p-5">
            <h3 className="text-base font-black text-amber-200">Ce que vous recevez</h3>
            <ul className="mt-3 space-y-3">
              {VOUS_RECEVEZ.map((r) => (
                <li key={r.titre}>
                  <p className="text-sm font-black text-white">{r.titre}</p>
                  <p className="mt-0.5 text-sm font-semibold leading-6 text-white/70">
                    {r.texte}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Le prix et le délai — les deux questions qu'on pose toujours en
            dernier, répondues avant qu'on ait à les poser. */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-400/[0.10] to-white/[0.03] p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
              Ce que ça coûte
            </p>
            <p className="mt-1 text-3xl font-black text-white">0 €</p>
            <p className="mt-1.5 text-sm font-semibold leading-6 text-white/75">
              Des deux côtés : vous ne payez rien, vous ne recevez rien. Pas de
              contrat, pas d&apos;engagement, pas d&apos;exclusivité. Si un jour
              ça ne vous va plus, on retire la page — un appel suffit.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-white/50">
              En combien de temps
            </p>
            <p className="mt-1 text-3xl font-black text-white">Le jour même</p>
            <p className="mt-1.5 text-sm font-semibold leading-6 text-white/75">
              La machine de l&apos;hôtel ci-dessous est née d&apos;une
              conversation à Terre-Sainte, et elle a été écrite dans
              l&apos;après-midi. On se parle, et vous voyez votre métier tourner
              avant de vous quitter.
            </p>
          </div>
        </div>

        {/* L'exemple qui vient d'être fabriqué — la démonstration se clique. */}
        <Link
          href="/simulateur-hotel"
          className="group mt-4 flex flex-col gap-1 rounded-2xl border border-amber-300/40 bg-gradient-to-br from-amber-400/[0.14] to-white/[0.03] p-5 transition hover:bg-white/[0.08]"
        >
          <p className="text-xs font-black uppercase tracking-wide text-amber-300">
            🏨 L&apos;exemple, à manipuler tout de suite
          </p>
          <p className="text-lg font-black text-white group-hover:underline">
            « L&apos;hôtel Le Terre Sainte dans ta main » — Saint-Pierre
          </p>
          <p className="text-sm font-semibold leading-6 text-white/75">
            La maison a simplement ouvert sa grille de tarifs 2026. Choisissez
            la saison, réglez le remplissage&nbsp;: les baies s&apos;allument une
            à une, les petits-déjeuners se comptent, le linge s&apos;empile, la
            caisse se remplit — et le{" "}
            <strong className="font-black text-white">point mort</strong> dit à
            partir de quel taux la nuit se paie enfin. Le tableau à double
            entrée d&apos;un élève de CM2 et l&apos;équation d&apos;un élève de
            Seconde, dans le même écran. →
          </p>
        </Link>

        {/* ── LES PREUVES : déjà en ligne ─────────────────────────────────── */}
        <h2 className="mt-10 text-xl font-black text-white sm:text-2xl">
          Déjà en ligne, avec le réel de l&apos;île
        </h2>
        <p className="mt-1 text-sm font-semibold text-white/60">
          Cliquez : c&apos;est exactement ce que votre métier peut devenir.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {PREUVES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group flex flex-col rounded-2xl border bg-gradient-to-br to-white/[0.03] p-5 transition hover:bg-white/[0.06] ${p.color}`}
            >
              <p className="text-2xl" aria-hidden>
                {p.emoji}
              </p>
              <h3 className="mt-2 text-lg font-black text-white group-hover:underline">
                {p.titre}
              </h3>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-white/75">
                {p.ligne}
              </p>
            </Link>
          ))}
        </div>

        {/* ── COMMENT ÇA SE PASSE ─────────────────────────────────────────── */}
        <h2 className="mt-10 text-xl font-black text-white sm:text-2xl">
          Comment ça se passe
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {ETAPES.map((e) => (
            <div key={e.n} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-sm font-black text-[#041B33]">
                {e.n}
              </p>
              <h3 className="mt-3 text-base font-black text-white">{e.titre}</h3>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-white/70">
                {e.texte}
              </p>
            </div>
          ))}
        </div>

        {/* ── L'ESPRIT — écrit noir sur blanc, pour que tout soit clair. ──── */}
        <div className="mt-8 rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-400/[0.10] to-white/[0.03] p-5 sm:p-6">
          <h2 className="text-lg font-black text-white">🧭 L&apos;esprit du partenariat</h2>
          <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-white/80">
            <li>
              <strong className="font-black text-emerald-200">Pédagogie d&apos;abord.</strong>{" "}
              Le contenu sert l&apos;élève — ce n&apos;est jamais une publicité.
              Vous fournissez le réel (le métier, les chiffres, l&apos;accès),
              EleveAI garde la main pédagogique.
            </li>
            <li>
              <strong className="font-black text-emerald-200">Gratuit, des deux côtés.</strong>{" "}
              C&apos;est un partenariat pédagogique : personne ne paie personne.
              Votre entreprise est créditée et mise à l&apos;honneur, comme nos
              partenaires le sont déjà.
            </li>
            <li>
              <strong className="font-black text-emerald-200">Simple.</strong>{" "}
              Quelques lignes pour se présenter, un échange, et on fabrique.
              Vous validez ce qui concerne votre entreprise avant publication.
            </li>
          </ul>
        </div>

        {/* ── LE FORMULAIRE ───────────────────────────────────────────────── */}
        <div id="participer" className="mt-10 rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-400/[0.08] to-white/[0.03] p-5 sm:p-6">
          <h2 className="text-xl font-black text-white">🚀 Participez à l&apos;aventure</h2>
          <p className="mt-1 text-sm font-semibold text-white/70">
            Racontez votre métier en quelques lignes — Frédéric vous répond
            personnellement.
          </p>

          {/* Contact direct : l'avatar de Frédéric + son numéro (cliquable sur
              mobile). Certains partenaires préfèrent décrocher plutôt qu'écrire. */}
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 sm:p-4">
            <Image
              src="/images/avatar-frederic-Lacoste.jpg"
              alt="Frédéric Lacoste, fondateur d'EleveAI"
              width={56}
              height={56}
              className="h-12 w-12 shrink-0 rounded-full border-2 border-amber-300/60 object-cover sm:h-14 sm:w-14"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-white/50">
                Ou appelez Frédéric directement
              </p>
              <a
                href="tel:+262692742958"
                className="text-xl font-black tracking-wide text-amber-300 hover:underline sm:text-2xl"
              >
                06 92 74 29 58
              </a>
            </div>
          </div>

          <div className="mt-4">
            <FormulaireAventure />
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
