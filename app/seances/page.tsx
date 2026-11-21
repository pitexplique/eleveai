// /seances — LE HUB « En classe avec EleveAI » (17/11/2026).
// Frédéric : « donc il faut préparer un hub », « comment ils font concrètement »,
// « titre plan descrit audio », « avec des compétences cochées ».
// L'argument, mot pour mot : « 20 minutes de cours, 25 minutes de coach et de
// vidéos et 10 minutes de synthèse, alors c'est gagné, car ils vont économiser
// leur énergie ! »
// ⛔ 17/11, rectifié par Frédéric : PAS « vous économisez votre énergie » sur la
// page, mais « les élèves travaillent en autonomie assistée » et « vous mettez
// votre énergie au bon endroit, au bon moment ».
// Ordre de la page (tranché dans le brief) : 1) ses deux vraies séances, en
// témoignage (4e « vidéo coupée », puis 6e « restaurant ») ; 2) la séance type
// 20 / 25 / 10 ; 3) les types de séances ; 4) ce que voit le prof ; 5) les outils ;
// 6) une place pour d'autres témoignages.
// Les séances sont des DONNÉES : lib/seances/seances.ts (un objet par séance).
// ⛔ Pas de photo ni de vidéo de Frédéric : sa voix (note vocale WhatsApp) et
// une pastille avec Ti Margo. ⛔ Le lecteur audio ne démarre jamais seul.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mic } from "lucide-react";
import { urlR2 } from "@/lib/videos/r2";
import MenuDuJour from "@/components/seances/MenuDuJour";
import {
  AVANT_UNE_FOIS,
  COMPETENCES,
  SEANCES,
  TYPES_SEANCES,
  type Bloc,
  type EtapeClic,
  type EtapePlan,
  type EtatCompetence,
  type Seance,
} from "@/lib/seances/seances";

export const metadata: Metadata = {
  title: "En classe avec EleveAI : des séances qui marchent",
  description:
    "20 min de cours, 25 min de coach et de vidéos, 10 min de synthèse : des séances vécues en 6e et en 4e, racontées par un prof de maths, avec le clic par clic.",
  alternates: { canonical: "https://www.eleveai.fr/seances" },
};

const COULEUR_BLOC: Record<Bloc, { barre: string; pastille: string; texte: string; nom: string }> = {
  cours: { barre: "bg-violet-500", pastille: "bg-violet-100 text-violet-900 ring-violet-200", texte: "text-violet-800", nom: "Cours" },
  entrainement: { barre: "bg-sky-500", pastille: "bg-sky-100 text-sky-900 ring-sky-200", texte: "text-sky-800", nom: "Coach et vidéos" },
  synthese: { barre: "bg-amber-500", pastille: "bg-amber-100 text-amber-900 ring-amber-200", texte: "text-amber-800", nom: "Synthèse" },
};

const ETAT: Record<EtatCompetence, { signe: string; nom: string; classe: string }> = {
  oui: { signe: "✅", nom: "a fonctionné", classe: "bg-emerald-50 ring-emerald-200 text-slate-900" },
  partiel: { signe: "➖", nom: "en partie", classe: "bg-amber-50 ring-amber-200 text-slate-900" },
  non: { signe: "⬜", nom: "pas visé", classe: "bg-slate-50 ring-slate-200 text-slate-500" },
};

/** La frise minutée : une barre proportionnelle, puis les étapes en clair. */
function Frise({ plan }: { plan: EtapePlan[] }) {
  const total = plan.reduce((s, e) => s + e.minutes, 0);
  return (
    <div>
      <div className="flex h-4 overflow-hidden rounded-full ring-1 ring-slate-200" aria-hidden="true">
        {plan.map((e, i) => (
          <div
            key={i}
            className={`${COULEUR_BLOC[e.bloc].barre} ${i > 0 ? "border-l-2 border-white" : ""}`}
            style={{ width: `${(e.minutes / total) * 100}%` }}
          />
        ))}
      </div>
      <ol className="mt-3 grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        {plan.map((e, i) => (
          <li key={i} className={`rounded-xl px-3 py-2 ring-1 ${COULEUR_BLOC[e.bloc].pastille}`}>
            <p className="text-sm font-black">
              <span className="tabular-nums">{e.minutes} min</span> · {e.titre}
            </p>
            <p className="mt-0.5 text-sm font-semibold leading-snug opacity-90">{e.detail}</p>
          </li>
        ))}
      </ol>
      <p className="sr-only">Durée totale : {total} minutes.</p>
    </div>
  );
}

function Pastille({ nom, role }: { nom: string; role: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 py-1 pl-1 pr-3 text-sm font-black text-orange-900 ring-1 ring-orange-200">
      <Image src="/ti-margo/animations/encouragement.png" alt="" width={320} height={320} sizes="32px" className="h-8 w-8 shrink-0" />
      {nom}, {role}
    </p>
  );
}

function Liens({ liens }: { liens?: EtapeClic["liens"] }) {
  if (!liens?.length) return null;
  return (
    <p className="mt-1.5 flex flex-wrap gap-2">
      {liens.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-bold text-violet-800 ring-1 ring-violet-200 hover:bg-violet-50"
        >
          {l.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      ))}
    </p>
  );
}

function ClicParClic({ etapes }: { etapes: EtapeClic[] }) {
  return (
    <ol className="space-y-3">
      {etapes.map((e, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-700 text-sm font-black text-white">{i + 1}</span>
          <div className="min-w-0">
            <p className="text-sm font-black uppercase tracking-wide text-violet-800">{e.moment}</p>
            <p className="font-semibold leading-snug text-slate-800">{e.texte}</p>
            <Liens liens={e.liens} />
          </div>
        </li>
      ))}
    </ol>
  );
}

function Audio({ seance }: { seance: Seance }) {
  if (seance.audio) {
    return (
      <div>
        <audio controls preload="none" className="w-full" src={urlR2(seance.audio.fichier)}>
          Votre navigateur ne lit pas l&apos;audio.
        </audio>
        <p className="mt-1 text-sm font-semibold text-slate-600">Sa voix, {seance.audio.duree}.</p>
      </div>
    );
  }
  return (
    <p className="flex items-center gap-2 rounded-xl border-2 border-dashed border-orange-300 bg-orange-50/60 px-4 py-3 font-bold text-orange-900">
      <Mic className="h-5 w-5 shrink-0" aria-hidden="true" />
      Bientôt en audio : la voix de {seance.temoin?.nom ?? "ce prof"}, qui raconte sa séance.
    </p>
  );
}

function Competences({ seance }: { seance: Seance }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {COMPETENCES.map((c) => {
        const etat = ETAT[seance.competences[c.id] ?? "non"];
        return (
          <li key={c.id} className={`flex items-start gap-2 rounded-xl px-3 py-2 ring-1 ${etat.classe}`}>
            <span aria-hidden="true" className="text-lg leading-6">{etat.signe}</span>
            <span className="min-w-0">
              <span className="block font-black leading-snug">{c.nom}</span>
              <span className="block text-sm font-semibold leading-snug opacity-80">
                <span className="sr-only">{etat.nom}. </span>
                {c.aide}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function TitreBloc({ n, children }: { n: number; children: ReactNode }) {
  return (
    <h4 className="flex items-center gap-2 text-lg font-black text-slate-900">
      <span className="text-sm font-black text-slate-400">{n}.</span> {children}
    </h4>
  );
}

/** Le « restaurant » : une vraie carte, plat IMPOSÉ, À LA CARTE, dessert. */
function Menu({ seance }: { seance: Seance }) {
  return seance.menu ? <MenuDuJour menu={seance.menu} /> : null;
}

/** UNE SÉANCE : titre · plan · descriptif · audio · compétences cochées. */
function CarteSeance({ seance }: { seance: Seance }) {
  return (
    <article id={seance.id} className="scroll-mt-24 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200">
      {/* TITRE */}
      <header className="bg-gradient-to-r from-violet-700 to-indigo-700 px-5 py-4 text-white sm:px-7">
        <p className="text-sm font-black uppercase tracking-wide text-violet-100">
          {seance.niveau} · {seance.notion} · {seance.type}
        </p>
        <h3 className="mt-1 text-2xl font-black sm:text-3xl">{seance.titre}</h3>
        <p className="mt-1 font-semibold text-violet-50">{seance.objectif}</p>
      </header>

      <div className="space-y-7 px-5 py-6 sm:px-7">
        {seance.temoin && <Pastille nom={seance.temoin.nom} role={seance.temoin.role} />}

        {/* PLAN */}
        <section>
          <TitreBloc n={1}>Le plan</TitreBloc>
          <div className="mt-2">
            <Frise plan={seance.plan} />
          </div>
        </section>

        {/* DESCRIPTIF */}
        <section className="space-y-5">
          <TitreBloc n={2}>Le descriptif</TitreBloc>
          <Menu seance={seance} />
          {seance.descriptif.citation && (
            <blockquote className="border-l-4 border-orange-400 pl-4 text-xl font-black italic text-slate-800">
              « {seance.descriptif.citation} »
            </blockquote>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-violet-50 p-4 ring-1 ring-violet-100">
              <p className="font-black text-violet-900">Ce que fait le prof</p>
              <ul className="mt-1.5 space-y-1 font-semibold leading-snug text-slate-800">
                {seance.descriptif.prof.map((t) => (
                  <li key={t} className="flex gap-1.5"><span aria-hidden="true" className="text-violet-600">•</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100">
              <p className="font-black text-sky-900">Ce que font les élèves</p>
              <ul className="mt-1.5 space-y-1 font-semibold leading-snug text-slate-800">
                {seance.descriptif.eleves.map((t) => (
                  <li key={t} className="flex gap-1.5"><span aria-hidden="true" className="text-sky-600">•</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="mb-3 text-lg font-black text-slate-900">Concrètement, clic par clic</p>
            <ClicParClic etapes={seance.clicParClic} />
          </div>

          <div className="rounded-2xl bg-pink-50 p-4 ring-1 ring-pink-200">
            <p className="font-black text-pink-900">🍨 Le dessert : la mission « passions »</p>
            <p className="mt-1 font-semibold leading-snug text-slate-800">{seance.dessert}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <p className="rounded-2xl bg-white p-4 font-semibold leading-snug text-slate-700 ring-1 ring-slate-200">
              <span className="block font-black text-slate-900">Sans salle info</span>
              {seance.sansSalleInfo}
            </p>
            {/* 17/11, Frédéric : « il faut rajouter devoir maison : rappeler qu'il
                gagne des points ! chez eux ». Les points sont ceux du coach (étoiles),
                le podium a la médaille « travail à la maison ». */}
            <div className="rounded-2xl bg-emerald-50 p-4 font-semibold leading-snug text-slate-700 ring-1 ring-emerald-200">
              <p className="font-black text-slate-900">🏠 Le devoir maison, chez eux</p>
              <p>{seance.aLaMaison}</p>
              <p className="mt-2 rounded-xl bg-white px-3 py-2 font-black text-emerald-900 ring-1 ring-emerald-200">
                ⭐ Rappelez-leur : chez eux aussi, chaque bonne réponse au coach leur fait gagner des points. Le travail à la maison a sa médaille au podium.
              </p>
            </div>
          </div>
        </section>

        {/* AUDIO + transcription */}
        <section>
          <TitreBloc n={3}>Le récit, en audio</TitreBloc>
          <div className="mt-2 space-y-3">
            <Audio seance={seance} />
            <details className="rounded-2xl bg-orange-50/50 p-4 ring-1 ring-orange-100" open>
              <summary className="cursor-pointer font-black text-orange-900">
                {seance.transcriptionExacte ? "La transcription" : "Son récit, à lire"}
              </summary>
              <div className="mt-2 space-y-2 font-semibold leading-relaxed text-slate-800">
                {seance.transcription.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </details>
          </div>
        </section>

        {/* COMPÉTENCES COCHÉES */}
        <section>
          <TitreBloc n={4}>Ce qui a marché</TitreBloc>
          <p className="mb-2 mt-1 text-sm font-semibold text-slate-600">✅ a fonctionné · ➖ en partie · ⬜ pas visé dans cette séance</p>
          <Competences seance={seance} />
        </section>
      </div>
    </article>
  );
}

const BLOCS_TYPE: { minutes: number; bloc: Bloc; titre: string; qui: string; detail: string }[] = [
  { minutes: 20, bloc: "cours", titre: "Le cours", qui: "Vous", detail: "La vidéo projetée et ses questions-pauses, ou la carte mentale à colorier." },
  { minutes: 25, bloc: "entrainement", titre: "Le coach et les vidéos", qui: "En autonomie assistée", detail: "Chacun s'entraîne à son niveau, guidé par le coach. Vous circulez et suivez en direct." },
  { minutes: 10, bloc: "synthese", titre: "La synthèse", qui: "Tous ensemble", detail: "Les élèves résument, la carte mentale, le podium projeté." },
];

const VOIT_LE_PROF = [
  { emoji: "🟢", titre: "En direct", texte: "Dès qu'ils se connectent : ce que fait chacun, et sur quelle question il est.", href: "/prof/classes/direct" },
  { emoji: "📋", titre: "Le bilan", texte: "La réussite de chaque élève, micro-compétence par micro-compétence.", href: "/prof/classes/bilan" },
  { emoji: "🏆", titre: "Le podium", texte: "À projeter en fin de séance pour féliciter la classe.", href: "/prof/classes/podium" },
  { emoji: "🗓️", titre: "Le bulletin du mois", texte: "Ce que chacun a travaillé, et qui n'a pas travaillé. À copier dans Pronote.", href: "/prof/classes/bulletin" },
];

const OUTILS = [
  { titre: "Créer ma classe", href: "/prof/classes", principal: true },
  { titre: "Les cartes mentales", href: "/cartes-mentales" },
  // 19/11 : le hub des énigmes à projeter (adresse /enigmes-maths).
  { titre: "Les énigmes à projeter", href: "/enigmes-maths" },
  { titre: "Le coach", href: "/coach/serie" },
  { titre: "Les exercices interactifs", href: "/fiches-exercices" },
  { titre: "Les vidéos", href: "/video" },
  { titre: "Le calcul rapide", href: "/calcul-rapide" },
  { titre: "Les automatismes", href: "/automatismes-maths" },
  { titre: "Les passions des élèves", href: "/passions" },
];

const SOMMAIRE = [
  { label: "Les séances vécues", href: "#temoignages" },
  { label: "20 / 25 / 10", href: "#seance-type" },
  { label: "Les types de séances", href: "#types" },
  { label: "Ce que voit le prof", href: "#prof" },
  { label: "Les outils", href: "#outils" },
];

export default function PageSeances() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-amber-50 px-4 pb-16 pt-8 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-14">
        {/* EN-TÊTE */}
        <section className="text-center">
          <p className="text-sm font-black uppercase tracking-wide text-violet-700">En classe avec EleveAI</p>
          <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">
            20&nbsp;min de cours, 25&nbsp;min de coach, 10&nbsp;min de synthèse
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg font-bold text-slate-700 sm:text-xl">
            Les élèves travaillent en autonomie assistée : vous mettez votre énergie au bon endroit, au bon moment.
          </p>
          {/* 17/11, Frédéric : « si chaque élève décide comment il apprend, vous
              retrouvez le plaisir d'enseigner ». */}
          <p className="mx-auto mt-3 max-w-2xl text-lg font-black text-violet-800 sm:text-xl">
            Si chaque élève décide comment il apprend, vous retrouvez le plaisir d&apos;enseigner.
          </p>
          <div className="mx-auto mt-5 flex h-5 max-w-xl overflow-hidden rounded-full ring-1 ring-slate-200" aria-hidden="true">
            {BLOCS_TYPE.map((b, i) => (
              <div key={b.bloc} className={`${COULEUR_BLOC[b.bloc].barre} ${i > 0 ? "border-l-2 border-white" : ""}`} style={{ width: `${(b.minutes / 55) * 100}%` }} />
            ))}
          </div>
          <nav aria-label="Sommaire" className="mt-6 flex flex-wrap justify-center gap-2">
            {SOMMAIRE.map((s) => (
              <a key={s.href} href={s.href} className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-violet-50">
                {s.label}
              </a>
            ))}
          </nav>
        </section>

        {/* 1. LES SÉANCES VÉCUES */}
        <section id="temoignages" className="scroll-mt-24 space-y-6">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">Ce que j&apos;ai fait cette semaine avec mes 4e et mes 6e</h2>
            <p className="mt-1 font-bold text-slate-600">Deux vraies séances, deux façons d&apos;utiliser EleveAI. Racontées par Frédéric, prof de maths.</p>
          </div>
          {SEANCES.map((s) => (
            <CarteSeance key={s.id} seance={s} />
          ))}
          <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-violet-100">
            <p className="mb-3 font-black text-slate-900">Avant votre première séance : 2 gestes</p>
            <ClicParClic etapes={AVANT_UNE_FOIS} />
          </div>
        </section>

        {/* 2. LA SÉANCE TYPE 20 / 25 / 10 */}
        <section id="seance-type" className="scroll-mt-24">
          <h2 className="text-2xl font-black sm:text-3xl">La séance type : 55 minutes, trois blocs</h2>
          <p className="mt-1 font-bold text-slate-600">Le même découpage pour toutes les séances de cette page.</p>
          <ol className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,20fr)_minmax(0,25fr)_minmax(11rem,10fr)]">
            {BLOCS_TYPE.map((b) => (
              <li key={b.bloc} className={`rounded-2xl p-4 ring-1 ${COULEUR_BLOC[b.bloc].pastille}`}>
                <p className="text-3xl font-black tabular-nums">{b.minutes} min</p>
                <p className="mt-1 text-lg font-black">{b.titre}</p>
                <p className="text-sm font-black uppercase tracking-wide opacity-80">{b.qui}</p>
                <p className="mt-1 font-semibold leading-snug">{b.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 font-bold text-emerald-900 ring-1 ring-emerald-200">
            🏠 Et le devoir maison : chez eux aussi, chaque bonne réponse au coach leur fait gagner des points. Rappelez-le-leur en fin de séance.
          </p>
        </section>

        {/* 3. LES TYPES DE SÉANCES */}
        <section id="types" className="scroll-mt-24">
          <h2 className="text-2xl font-black sm:text-3xl">Les types de séances</h2>
          <p className="mt-1 font-bold text-slate-600">Chacun finit par un dessert : « va trouver… dans ce que tu aimes ».</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {TYPES_SEANCES.map((t) => (
              <li key={t.titre} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <span aria-hidden="true" className="text-3xl">{t.emoji}</span>
                <div className="min-w-0">
                  <p className="text-lg font-black">{t.titre}</p>
                  <p className="font-semibold leading-snug text-slate-700">{t.resume}</p>
                  {t.seanceId ? (
                    <a href={`#${t.seanceId}`} className="mt-1 inline-block text-sm font-black text-violet-800 underline">Voir la séance vécue</a>
                  ) : (
                    <p className="mt-1 text-sm font-black text-slate-500">Exemples bientôt</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. CE QUE VOIT LE PROF */}
        <section id="prof" className="scroll-mt-24">
          <h2 className="text-2xl font-black sm:text-3xl">Ce que voit le prof</h2>
          <p className="mt-1 font-bold text-slate-600">Dès que les élèves se connectent avec leur code, tout remonte. Sans corriger de copies.</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {VOIT_LE_PROF.map((v) => (
              <li key={v.href}>
                <Link href={v.href} className="flex h-full gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 hover:ring-violet-300">
                  <span aria-hidden="true" className="text-3xl">{v.emoji}</span>
                  <span className="min-w-0">
                    <span className="block text-lg font-black">{v.titre}</span>
                    <span className="block font-semibold leading-snug text-slate-700">{v.texte}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. LES OUTILS */}
        <section id="outils" className="scroll-mt-24">
          <h2 className="text-2xl font-black sm:text-3xl">Les outils</h2>
          <p className="mt-4 flex flex-wrap gap-2">
            {OUTILS.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className={
                  o.principal
                    ? "inline-flex items-center gap-1.5 rounded-xl bg-violet-700 px-4 py-2 font-black text-white shadow-sm hover:bg-violet-800"
                    : "inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-violet-50"
                }
              >
                {o.titre} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </p>
        </section>

        {/* 6. D'AUTRES TÉMOIGNAGES */}
        <section className="rounded-3xl border-2 border-dashed border-violet-300 bg-white/70 p-6 text-center">
          <p className="text-xl font-black">Et vous, quelle séance avez-vous faite ?</p>
          <p className="mx-auto mt-1 max-w-xl font-semibold text-slate-700">
            Racontez-la en une note vocale de 1 à 2 minutes : elle rejoindra cette page, avec votre prénom.
          </p>
          <Link href="/contact" className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 font-black text-violet-800 ring-2 ring-violet-300 hover:bg-violet-50">
            Raconter ma séance <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </main>
  );
}
