// app/tarifs/TarifsClient.tsx — LES TARIFS DU 22/11/2026.
//
// ⭐ Frédéric, 22/11, après en avoir parlé avec sa compagne et regardé IXL :
// 10 questions offertes par jour sur tout le site, puis l'inscription PAYANTE ;
// Famille 10 €/mois (autant d'enfants qu'on veut, sans IA) ; Prof 10 €/mois
// (toutes ses classes, sans IA) ; une option Premium avec l'aide de Ti Margo ;
// des prix RONDS partout. Note mémoire : modele-tarifaire-22-11.
// La page d'avant (modèle du 19/11 : contenu offert, Suivi 7,95 €, prix de
// lancement, établissements, visio) est entière dans l'historique :
//     git show 32927aab:app/tarifs/TarifsClient.tsx
//
// ⛔ Aucun prix écrit à la main : tout vient de lib/tarifs.ts (`OFFRE`).
// ⛔ Ce qui n'est PAS validé (l'année, l'essai prof, le prix du Premium, les
//    pays, les établissements) est dit « à venir », SANS chiffre.
// ⛔ Les vidéos ne sont pas tranchées (libres ou comptées) : on n'en dit rien.
// ⛔ Aucun bouton de paiement avant l'ouverture (`VENTE.ouverte`).
// ⛔ Jamais aux élèves actuels ou anciens de Frédéric.

import Link from "next/link";
import { ArrowRight, Check, Clock, GraduationCap, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";
import { DONS, VENTE } from "@/lib/legal/editeur";
import { MENTION_TVA, OFFRE, OUVERTURE_SUIVI, montant } from "@/lib/tarifs";

const n = OFFRE.questionsGratuitesParJour;
const libres = OFFRE.libres.join(", ").replace(/, ([^,]*)$/, " et $1");

const SANS_COMPTE = [
  `${n} questions par jour, sur tout le site`,
  "Un seul compteur : coach, exercices interactifs, calcul rapide, automatismes, QCM",
  `Toujours libres : ${libres}`,
];

const FAMILLE = [
  "Autant d'enfants que vous voulez",
  "Toutes les classes, du CP à la Terminale",
  "Ce qu'ils ont compris, les 3 choses à revoir",
  "Un bilan chaque semaine par courriel",
  "Un compte par courriel, sans aide de l'IA",
];

const PROF = [
  "Toutes vos classes",
  "Vos élèves entrent avec votre code quand vous êtes connecté",
  "Un devoir daté pour la maison, sur les micros choisies",
  "La séance en direct, le bilan, le bulletin à copier dans Pronote",
  "Sans aide de l'IA",
];

const A_VENIR = [
  "Une formule à l'année",
  "Un essai pour les professeurs",
  "Les prix des autres pays",
  "Une offre pour les établissements",
];

const faq = [
  {
    q: "Pourquoi payer, alors qu'une IA explique tout ?",
    a: "Une IA explique, mais elle ne sait pas où en est votre enfant dans son programme. Elle ne garde pas ses résultats d'une semaine à l'autre. EleveAI le suit, micro-compétence par micro-compétence, et vous dit quoi revoir.",
  },
  {
    q: `Qu'est-ce qui compte dans les ${n} questions ?`,
    a: `Chaque réponse donnée au coach, aux exercices interactifs, au calcul rapide, aux automatismes ou à un QCM. C'est un seul compteur pour tout le site, chaque jour. Les fiches de cours, les énigmes à projeter et les PDF ne comptent pas.`,
  },
  {
    q: "Mon enfant utilise EleveAI en classe : est-il bloqué ?",
    a: "Non. Avec le code de son professeur, il n'est jamais compté. Pendant le cours, il ne voit ni compteur ni offre. Le code de classe et le compte Famille sont deux accès séparés : à la maison, il passe par le compte Famille.",
  },
  {
    q: "Et l'aide de Ti Margo, par l'IA ?",
    a: "Les comptes Famille et Prof n'utilisent pas l'IA. L'aide de Ti Margo viendra dans une option Premium : il donne un indice, puis un autre, sans donner la réponse. Son prix sera annoncé plus tard.",
  },
];

export default function TarifsClient() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 [color-scheme:light]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12">
        {/* 1. LA PROMESSE */}
        <section className="text-center">
          <p className="inline-flex rounded-full bg-sky-100 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-sky-800 ring-1 ring-sky-200">
            {VENTE.ouverte ? "Les abonnements sont ouverts" : `Ouverture ${OUVERTURE_SUIVI}`}
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
            Des prix simples : <span className="whitespace-nowrap text-sky-700">{montant(OFFRE.famille)} par mois</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {n} questions offertes chaque jour pour essayer. Ensuite, un abonnement pour toute la famille, ou pour toutes vos classes.
          </p>
        </section>

        {/* 2. LES TROIS CARTES */}
        <section className="grid gap-5 md:grid-cols-3">
          <Carte
            etiquette="Pour essayer"
            titre="Sans compte"
            prix="Offert"
            sousPrix="chaque jour"
            Icone={Clock}
            couleurs={{ bord: "border-emerald-300", fond: "bg-emerald-50/50", texte: "text-emerald-700", puce: "text-emerald-600" }}
            lignes={SANS_COMPTE}
          >
            <Link href="/coach-ia/maths" className="mt-6 block rounded-full bg-emerald-600 px-5 py-3 text-center font-black text-white hover:bg-emerald-700">
              Essayer le coach
            </Link>
          </Carte>

          <Carte
            id="famille"
            etiquette="La famille"
            titre="Famille"
            prix={montant(OFFRE.famille)}
            sousPrix="par mois"
            Icone={Users}
            couleurs={{ bord: "border-sky-400", fond: "bg-white shadow-lg", texte: "text-sky-700", puce: "text-sky-600" }}
            lignes={FAMILLE}
          >
            <BoutonOuverture href="/abonnement" couleur="bg-sky-700 hover:bg-sky-800 text-white" />
          </Carte>

          <Carte
            id="prof"
            etiquette="Le prof"
            titre="Prof"
            prix={montant(OFFRE.prof)}
            sousPrix="par mois"
            Icone={GraduationCap}
            couleurs={{ bord: "border-violet-300", fond: "bg-violet-50/40", texte: "text-violet-700", puce: "text-violet-600" }}
            lignes={PROF}
          >
            <Link href="/prof/classes" className="mt-6 block rounded-full bg-violet-700 px-5 py-3 text-center font-black text-white hover:bg-violet-800">
              Créer ma classe
            </Link>
          </Carte>
        </section>
        <p className="-mt-8 text-center text-sm text-slate-500">
          Sans engagement. Prix en France. {MENTION_TVA}.{" "}
          {!VENTE.ouverte && <>Rien n&apos;est encaissé avant l&apos;ouverture. </>}
          Ces offres ne s&apos;adressent pas aux élèves de l&apos;auteur du site.
        </p>

        {/* 3. L'OPTION PREMIUM — ⏳ idée du 22/11, prix NON validé : aucun chiffre. */}
        <section className="rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50/60 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ti-margo/animations/encouragement.png" alt="Ti Margo" width={96} height={96} className="h-24 w-24 shrink-0 self-center" />
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-amber-700">Bientôt · prix à venir</p>
              <h2 className="mt-1 flex items-center gap-2 text-2xl font-black sm:text-3xl">
                <Sparkles className="h-7 w-7 text-amber-600" aria-hidden="true" /> L&apos;option Premium : l&apos;aide de Ti Margo
              </h2>
              <p className="mt-2 max-w-3xl text-slate-700">
                Ti Margo guide votre enfant avec l&apos;IA. Il donne un indice, puis un autre, mais jamais la réponse. Pour les moins de 15 ans, c&apos;est le parent qui l&apos;active.
              </p>
            </div>
          </div>
        </section>

        {/* 4. EN CLASSE — la déontologie du 02/11 : aucune offre dans le coach en classe. */}
        <section className="rounded-3xl bg-teal-50 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-2xl font-black sm:text-3xl">
            <ShieldCheck className="h-7 w-7 text-teal-700" aria-hidden="true" /> En classe, aucune publicité
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              { titre: "Le code du prof", texte: "Avec le code de leur professeur, les élèves ne sont jamais comptés. Le code marche quand le professeur est connecté." },
              { titre: "Ni compteur, ni offre", texte: "Pendant le cours, le coach ne montre aucun compteur et ne propose aucun abonnement. L'offre se lit ici, et sur l'accueil." },
              { titre: "Deux accès séparés", texte: "Le code de classe sert en classe et pour le devoir daté. À la maison, l'élève passe par le compte Famille." },
            ].map((b) => (
              <div key={b.titre} className="rounded-2xl bg-white p-5 ring-1 ring-teal-100">
                <h3 className="font-black">{b.titre}</h3>
                <p className="mt-1 text-sm text-slate-600">{b.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. À VENIR — ⏳ non validé le 22/11 : aucun chiffre. */}
        <section className="rounded-3xl bg-slate-50 p-6 sm:p-8">
          <h2 className="text-2xl font-black sm:text-3xl">Bientôt</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {A_VENIR.map((t) => (
              <li key={t} className="flex gap-2 text-slate-800">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-black text-slate-900 ring-1 ring-slate-300 hover:ring-sky-400">
            Un établissement, un autre pays ? Écrivez-nous <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        {DONS.ouverts && (
          <p className="text-center">
            <Link href="/soutenir" className="inline-flex items-center gap-2 font-black text-rose-700 hover:underline">
              <Heart className="h-5 w-5" aria-hidden="true" /> Vous préférez simplement encourager le site ? Faire un don
            </Link>
          </p>
        )}

        {/* 6. FAQ */}
        <section>
          <h2 className="text-2xl font-black sm:text-3xl">Vos questions</h2>
          <div className="mt-5 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="rounded-2xl border border-slate-200 px-5 py-4">
                <summary className="cursor-pointer font-black">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Carte({
  id,
  etiquette,
  titre,
  prix,
  sousPrix,
  Icone,
  couleurs,
  lignes,
  children,
}: {
  id?: string;
  etiquette: string;
  titre: string;
  prix: string;
  sousPrix: string;
  Icone: typeof Users;
  couleurs: { bord: string; fond: string; texte: string; puce: string };
  lignes: readonly string[];
  children: React.ReactNode;
}) {
  return (
    <div id={id} className={`flex scroll-mt-24 flex-col rounded-3xl border-2 p-6 ${couleurs.bord} ${couleurs.fond}`}>
      <p className={`flex items-center gap-2 text-sm font-black uppercase tracking-wide ${couleurs.texte}`}>
        <Icone className="h-5 w-5" aria-hidden="true" /> {etiquette}
      </p>
      <h2 className="mt-1 text-2xl font-black">{titre}</h2>
      <p className="mt-3 text-4xl font-black">
        {prix} <span className="text-base font-bold text-slate-500">{sousPrix}</span>
      </p>
      <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-800">
        {lignes.map((t) => (
          <li key={t} className="flex gap-2">
            <Check className={`mt-0.5 h-5 w-5 shrink-0 ${couleurs.puce}`} aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

/** ⛔ Avant l'ouverture, aucun bouton de paiement : la date, à la place. */
function BoutonOuverture({ href, couleur }: { href: string; couleur: string }) {
  if (VENTE.ouverte) {
    return (
      <Link href={href} className={`mt-6 block rounded-full px-5 py-3 text-center font-black ${couleur}`}>
        S&apos;abonner
      </Link>
    );
  }
  return (
    <p className="mt-6 rounded-full bg-slate-100 px-5 py-3 text-center font-black text-slate-600">
      Ouverture {OUVERTURE_SUIVI}
    </p>
  );
}
