// /offre/<pays> — L'OFFRE EN FCFA DU SÉNÉGAL ET DE LA CÔTE D'IVOIRE (02/11/2026).
//
// Frédéric : « as-tu fait une offre pour Sénégal et Côte d'Ivoire ? », puis
// « ouvre les deux pages ». Le tableau de /tarifs ne suffisait pas : un parent
// de Dakar se reconnaît dans une page à lui, en FCFA, avec ses examens et ses
// moyens de paiement.
// ⚠️ PAS SOUS /pays/<pays> : cette adresse est déjà le PROGRAMME du pays
// (app/pays/[pays]/page.tsx), qui renvoie ici par un bandeau.
// ⛔ Aucun prix écrit à la main : tout vient de lib/tarifs.ts (DUREES_FCFA,
// OFFRE_PAYS, ETABLISSEMENT_ETRANGER).
// ⛔ Le paiement mobile est « prévu » : le compte chez l'intermédiaire
// (CinetPay, PayDunya) n'est pas ouvert. Rien n'est encaissé avant l'ouverture.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, Check, Eye, MonitorPlay, Smartphone } from "lucide-react";
import {
  DUREES_FCFA,
  ETABLISSEMENT_ETRANGER,
  OFFRE_PAYS,
  OUVERTURE_SUIVI,
  OUVERTURE_VISIO,
  VIDEOS_SITE,
  VIDEOS_YOUTUBE,
  VISIO_FCFA,
} from "@/lib/tarifs";
import { programmesDuPays } from "@/lib/programmes-pays/pays";

const nombre = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export function generateStaticParams() {
  return Object.keys(OFFRE_PAYS).map((pays) => ({ pays }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ pays: string }> }): Promise<Metadata> {
  const { pays } = await params;
  const o = OFFRE_PAYS[pays];
  if (!o) return {};
  return {
    title: `EleveAI ${o.du} : le suivi en maths à ${DUREES_FCFA[0].prix} par mois`,
    description: `Pour les familles et les écoles ${o.du} : le coach de maths ouvert à tous, et le suivi famille — ${VIDEOS_SITE} vidéos, un bilan chaque semaine — à ${DUREES_FCFA[0].prix} par mois. Paiement mobile prévu. Ouverture ${OUVERTURE_SUIVI}.`,
    alternates: { canonical: `/offre/${pays}` },
  };
}

export default async function OffrePays({ params }: { params: Promise<{ pays: string }> }) {
  const { pays } = await params;
  const o = OFFRE_PAYS[pays];
  if (!o) notFound();
  const niveaux = programmesDuPays(pays).map((p) => p.niveau);

  const SUIVI = [
    `Toute la vidéothèque : ${nombre(VIDEOS_SITE)} vidéos de maths (${nombre(VIDEOS_YOUTUBE)} seulement sur YouTube)`,
    "Un bilan de départ : ce que votre enfant sait, et ce qui lui manque",
    "Un compte rendu chaque semaine, et une alerte quand il décroche",
    `La préparation ciblée des examens : ${o.examens}`,
    "Un seul paiement pour tous les enfants de la maison",
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 [color-scheme:light]">
      <div className="mx-auto max-w-5xl space-y-12 px-4 py-12">
        {/* 1. LA PROMESSE */}
        <section className="text-center">
          <p className="text-5xl" aria-hidden="true">{o.drapeau}</p>
          <p className="mt-3 inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
            Ouverture {OUVERTURE_SUIVI}
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">EleveAI {o.du}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Le coach de maths qui suit votre enfant, micro-compétence par micro-compétence, avec les vidéos d&apos;un
            professeur. Pour les familles et les écoles, à {o.villes} et partout dans le pays.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/coach-ia/maths" className="rounded-full bg-emerald-600 px-7 py-3.5 font-black text-white shadow hover:bg-emerald-700">
              Essayer le coach
            </Link>
            <Link href={`/pays/${pays}`} className="rounded-full bg-white px-7 py-3.5 font-black text-slate-800 ring-1 ring-slate-300 hover:bg-slate-50">
              Le programme {o.du}
            </Link>
          </div>
          {niveaux.length > 0 && (
            <p className="mt-3 text-sm text-slate-500">Programme officiel déjà relevé : {niveaux.join(", ")}.</p>
          )}
        </section>

        {/* 2. LE SUIVI FAMILLE, EN DURÉES PRÉPAYÉES */}
        <section className="rounded-3xl border-2 border-sky-300 p-6 shadow-lg sm:p-8">
          <h2 className="flex items-center gap-2 text-2xl font-black sm:text-3xl">
            <Eye className="h-7 w-7 text-sky-700" aria-hidden="true" /> Le suivi famille
          </h2>
          <p className="mt-1 text-slate-600">Sans abonnement, votre enfant garde le coach sur tout le programme. Le suivi ajoute :</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {SUIVI.map((t) => <Puce key={t} couleur="text-sky-600">{t}</Puce>)}
          </ul>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {DUREES_FCFA.map((d, i) => (
              <div key={d.duree} className={`rounded-2xl p-5 text-center ${i === DUREES_FCFA.length - 1 ? "bg-sky-700 text-white" : "bg-sky-50"}`}>
                <p className="text-sm font-black uppercase tracking-wide opacity-80">{d.duree}</p>
                <p className="mt-1 text-3xl font-black">{d.prix}</p>
                {d.note && <p className="mt-1 text-xs font-bold opacity-80">{d.note}</p>}
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2 text-sm text-slate-600">
            <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
            Paiement prévu par {o.paiements}. On paie pour une durée, comme un forfait téléphone : un rappel arrive
            quelques jours avant la fin, rien n&apos;est prélevé tout seul.
          </p>
        </section>

        {/* 3. LA VISIO */}
        <section className="rounded-3xl border border-slate-200 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-2xl font-black">
            <MonitorPlay className="h-6 w-6 text-violet-700" aria-hidden="true" /> Les cours en visio
          </h2>
          <p className="mt-2 text-slate-700">
            En petit groupe, 1 h 30 avec un professeur de maths, pour préparer {o.examens}. Le replay reste. Pas besoin
            de caméra pour l&apos;élève, et une connexion téléphone suffit.
          </p>
          <p className="mt-3 text-2xl font-black">
            {VISIO_FCFA} <span className="text-base font-bold text-slate-500">la séance · à partir de {OUVERTURE_VISIO}</span>
          </p>
        </section>

        {/* 4. LES ÉCOLES */}
        <section className="grid gap-6 rounded-3xl border border-amber-200 bg-amber-50/50 p-6 sm:p-8 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-black">
              <Building2 className="h-6 w-6 text-amber-700" aria-hidden="true" /> Pour les écoles {o.du}
            </h2>
            <p className="mt-2 text-slate-700">
              Écoles privées, bilingues ou confessionnelles : tous vos professeurs et tous vos élèves sur EleveAI, avec le
              bilan de chaque classe micro-compétence par micro-compétence.
            </p>
            <p className="mt-4 text-3xl font-black">
              {ETABLISSEMENT_ETRANGER.parEleveEtParAnAfrique} <span className="text-base font-bold text-slate-500">par élève et par an</span>
            </p>
            <p className="text-sm text-slate-600">
              À partir de {ETABLISSEMENT_ETRANGER.minimumEleves} élèves · professeurs inclus · paiement par virement, sur facture.
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-black text-slate-900 hover:bg-amber-400">
              Écrire pour votre école <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="mt-2 text-xs text-slate-500">Réponse sous {ETABLISSEMENT_ETRANGER.delaiReponse}.</p>
          </div>
          <ul className="space-y-3 self-center text-slate-800">
            <Puce couleur="text-amber-600">Un compte pour chaque professeur et chaque élève, avec « Mes classes »</Puce>
            <Puce couleur="text-amber-600">{`La vidéothèque entière pour tous les élèves : ${nombre(VIDEOS_SITE)} vidéos`}</Puce>
            <Puce couleur="text-amber-600">Le suivi famille ouvert aux parents, sans rien de plus à payer</Puce>
            <Puce couleur="text-amber-600">Une formation de vos professeurs en visio au démarrage</Puce>
          </ul>
        </section>

        <p className="text-center text-sm text-slate-500">
          Rien n&apos;est encaissé avant l&apos;ouverture. Toutes les offres et les autres pays :{" "}
          <Link href="/tarifs" className="font-bold text-sky-700 underline">la page des offres</Link>.
        </p>
      </div>
    </main>
  );
}

function Puce({ children, couleur }: { children: React.ReactNode; couleur: string }) {
  return (
    <li className="flex gap-2">
      <Check className={`mt-0.5 h-5 w-5 shrink-0 ${couleur}`} aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
