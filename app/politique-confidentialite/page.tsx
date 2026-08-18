// ⚠️ CETTE PAGE DISAIT TROIS CHOSES QU'ELLE NE POUVAIT PAS TENIR (18/08/2026).
//
// 1. « Le responsable du traitement est l'éditeur de la plateforme » — c'est
//    une non-réponse. Le RGPD (art. 13.1.a) demande une IDENTITÉ, et le site
//    nomme Frédéric partout ailleurs. Même angle mort que les mentions légales.
// 2. Deux adresses pour exercer les mêmes droits : `contact@eleveai.fr` ici,
//    `academienumerique@gmail.com` dans les mentions légales. Les trois pages
//    lisent maintenant `EDITEUR.contact`.
// 3. ⛔ « 🇪🇺 Données hébergées dans l'UE », en gras dans le résumé, alors que
//    la page nommait trois lignes plus bas Vercel (société américaine, et sans
//    `vercel.json` déclarant `regions` les fonctions tournent dans la région
//    par défaut du projet) et OpenAI (États-Unis). Une promesse que des parents
//    et des principaux lisent : elle doit être vraie ou ne pas être écrite. Ce
//    qui la remplace dit le mécanisme réel — chapitre V du RGPD — et la
//    section 6 nomme, prestataire par prestataire, ce qui part et où.
//
// ⏳ La région exacte de Supabase reste à confirmer dans le tableau de bord du
// projet, et à écrire dans la section 6 le jour où elle est connue.

import type { Metadata } from "next";
import Link from "next/link";
import { EDITEUR, PSP, VENTE, cgvEnVigueur } from "@/lib/legal/editeur";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment EleveAI protège les données des élèves, des professeurs et des établissements : données minimales, aucune revente, vos droits (accès, rectification, suppression).",
  alternates: {
    canonical: "https://www.eleveai.fr/politique-confidentialite",
  },
};

const MAILTO = `mailto:${EDITEUR.contact}`;

const sections = [
  {
    emoji: "🧑‍🏫",
    titre: "1. Qui est responsable de vos données ?",
    contenu: (
      <>
        <p>
          EleveAI est une plateforme éducative conçue par un enseignant en activité
          à La Réunion. Le responsable du traitement des données est{" "}
          <span className="font-semibold text-slate-50">{EDITEUR.nomComplet}</span>,
          éditeur de la plateforme EleveAI.
        </p>
        <p>
          Lorsqu&apos;un établissement scolaire ouvre des comptes pour ses élèves,
          il détermine avec EleveAI les données transmises et la durée de leur
          conservation : les deux agissent alors chacun dans son rôle, et toute
          demande peut être adressée indifféremment à l&apos;établissement ou à
          EleveAI.
        </p>
        <p>
          Pour toute question sur vos données :{" "}
          <a href={MAILTO} className="font-semibold text-emerald-300 hover:text-emerald-200">
            {EDITEUR.contact}
          </a>
        </p>
      </>
    ),
  },
  {
    emoji: "📦",
    titre: "2. Quelles données collectons-nous ?",
    contenu: (
      <>
        <p>Le principe d&apos;EleveAI : collecter le minimum nécessaire.</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <span className="font-semibold text-slate-50">Élèves</span> : un code établissement et un
            code élève fournis par l&apos;établissement, le prénom transmis par
            l&apos;établissement, la classe, et les résultats des exercices (scores, réponses,
            progression notion par notion).
          </li>
          <li>
            <span className="font-semibold text-slate-50">Aucune autre donnée élève</span> : pas
            d&apos;adresse e-mail élève, pas de numéro de téléphone, pas d&apos;adresse postale,
            pas de photo.
          </li>
          <li>
            <span className="font-semibold text-slate-50">Professeurs et établissements</span> : une
            adresse e-mail professionnelle pour la création et la gestion du compte.
          </li>
          <li>
            <span className="font-semibold text-slate-50">Questions posées au coach IA</span> : le texte
            des questions et des réponses est conservé pour le suivi pédagogique et
            l&apos;amélioration du service.
          </li>
          {/* Les données de facturation n'existent pas tant que rien ne se vend :
              on ne déclare pas un traitement qui n'a jamais lieu. */}
          {VENTE.ouverte && (
            <li>
              <span className="font-semibold text-slate-50">Clients d&apos;un abonnement</span> : nom,
              adresse de facturation et historique des commandes. Les données de carte
              bancaire sont saisies chez notre prestataire de paiement et ne sont
              jamais reçues ni conservées par EleveAI.
            </li>
          )}
        </ul>
      </>
    ),
  },
  {
    emoji: "🎯",
    titre: "3. Pourquoi ces données ?",
    contenu: (
      <>
        <ul className="ml-5 list-disc space-y-2">
          <li>Permettre à chaque élève d&apos;accéder à ses exercices et de suivre sa progression.</li>
          <li>Donner aux professeurs et aux établissements un tableau de bord de suivi pédagogique.</li>
          <li>Adapter les contenus au niveau de l&apos;élève.</li>
          <li>Assurer la sécurité de la plateforme.</li>
        </ul>
        <p>
          <span className="font-semibold text-slate-50">Base légale</span> : les données
          scolaires sont traitées sur la base du contrat conclu avec l&apos;établissement
          (ou la famille) et de la mission éducative. Lorsqu&apos;un prénom apparaît
          publiquement, il n&apos;est jamais associé à une classe précise ni à un
          établissement, de sorte qu&apos;aucun élève n&apos;est identifiable ; tout élève
          ou représentant légal peut demander le retrait d&apos;un prénom ou d&apos;un avis.
        </p>
      </>
    ),
  },
  {
    emoji: "🚫",
    titre: "4. Ce que nous ne faisons jamais",
    contenu: (
      <ul className="ml-5 list-disc space-y-2">
        <li>
          <span className="font-semibold text-slate-50">Aucune vente ni location de données</span> à des
          tiers, sous aucune forme.
        </li>
        <li>
          <span className="font-semibold text-slate-50">Aucune publicité</span> sur la plateforme, donc
          aucun profilage publicitaire ni cookie publicitaire.
        </li>
        <li>
          <span className="font-semibold text-slate-50">Aucune publication de nom de famille
          d&apos;élève</span> : sur les pages publiques (élèves remerciés, élèves à
          l&apos;honneur), seul le prénom apparaît, et il n&apos;est jamais associé à une
          classe précise ni à un établissement — ce qui empêche d&apos;identifier l&apos;élève.
        </li>
        <li>
          <span className="font-semibold text-slate-50">Avis publiés avec parcimonie</span> :
          lorsqu&apos;un avis d&apos;élève est mis en avant sur le site, seuls le prénom et le
          niveau (par exemple « 6e ») apparaissent — jamais la classe précise, ni le nom de
          famille. Le retrait d&apos;un avis peut être demandé à tout moment (voir la section 8).
        </li>
      </ul>
    ),
  },
  {
    emoji: "🤖",
    titre: "5. Et l'intelligence artificielle ?",
    contenu: (
      <>
        <p>
          Les réponses du coach IA et les audios de prononciation sont générés via l&apos;API
          d&apos;OpenAI. Seul le contenu nécessaire à la réponse (la question de l&apos;élève et son
          contexte d&apos;exercice) est transmis — jamais les codes d&apos;accès.
        </p>
        <p>
          Conformément aux conditions de l&apos;API d&apos;OpenAI, ces échanges ne sont pas utilisés
          pour entraîner leurs modèles.
        </p>
      </>
    ),
  },
  {
    emoji: "🗄️",
    titre: "6. Où sont stockées les données ?",
    contenu: (
      <>
        <p>
          EleveAI s&apos;appuie sur quatre prestataires techniques. Voici, pour
          chacun, ce qu&apos;il traite et d&apos;où il le traite :
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <span className="font-semibold text-slate-50">Vercel</span> — hébergement du site.
            Société de droit américain.
          </li>
          <li>
            <span className="font-semibold text-slate-50">Supabase</span> — base de données :
            comptes, résultats, progression. C&apos;est là que vivent les données des élèves.
          </li>
          <li>
            <span className="font-semibold text-slate-50">OpenAI</span> — génération des réponses
            du coach IA et des audios. Société de droit américain.
          </li>
          <li>
            <span className="font-semibold text-slate-50">Resend</span> — envoi des courriels
            (confirmations, lettre d&apos;information).
          </li>
          {VENTE.ouverte && (
            <li>
              <span className="font-semibold text-slate-50">{PSP.nom}</span> — traitement des
              paiements par carte. Les coordonnées bancaires sont saisies chez lui et ne
              transitent pas par EleveAI.
            </li>
          )}
        </ul>
        <p>
          Certains de ces prestataires sont établis aux États-Unis, ou peuvent y
          traiter une partie des données. Ces transferts sont encadrés par les
          garanties prévues au chapitre V du RGPD — clauses contractuelles types
          de la Commission européenne, et, pour les prestataires américains qui y
          adhèrent, le cadre de protection des données UE–États-Unis.
        </p>
        <p>
          Aucune donnée d&apos;élève n&apos;est transmise à un prestataire au-delà
          de ce que son rôle exige : le coach IA reçoit la question et son contexte
          d&apos;exercice, jamais les codes d&apos;accès, jamais le tableau de bord de
          la classe.
        </p>
        <p>
          La mesure d&apos;audience du site (Vercel Analytics) est anonyme et fonctionne sans cookie
          publicitaire. La session élève est conservée localement sur l&apos;appareil (stockage local
          du navigateur), pas sur nos serveurs.
        </p>
      </>
    ),
  },
  {
    emoji: "⏳",
    titre: "7. Combien de temps ?",
    contenu: (
      <>
        <p>
          Les données des élèves sont conservées pendant la durée du contrat avec
          l&apos;établissement (ou de l&apos;abonnement famille), puis supprimées. Un établissement
          peut demander à tout moment la suppression des comptes de ses élèves.
        </p>
        <p>
          Un compte resté sans aucune connexion pendant deux années scolaires est
          supprimé, sans qu&apos;il soit besoin de le demander.
        </p>
        {VENTE.ouverte && (
          <p>
            Une seule catégorie échappe à cette règle : les factures et les pièces
            comptables, que la loi impose de conserver dix ans (art. L123-22 du code
            de commerce). Elles ne contiennent aucune donnée d&apos;élève.
          </p>
        )}
      </>
    ),
  },
  {
    emoji: "⚖️",
    titre: "8. Vos droits (RGPD)",
    contenu: (
      <>
        <p>
          Conformément au RGPD, chaque utilisateur (ou son représentant légal pour les mineurs)
          dispose d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
          d&apos;opposition et de limitation du traitement de ses données.
        </p>
        <p>
          Aucune décision produisant des effets juridiques n&apos;est prise
          automatiquement à partir de ces données : le coach adapte les exercices
          au niveau de l&apos;élève, il ne l&apos;oriente pas, ne le note pas et ne
          décide de rien à sa place.
        </p>
        <p>
          Pour exercer ces droits, écrivez à{" "}
          <a href={MAILTO} className="font-semibold text-emerald-300 hover:text-emerald-200">
            {EDITEUR.contact}
          </a>{" "}
          — réponse sous 30 jours maximum. Vous pouvez également saisir la CNIL
          (<a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="font-semibold text-emerald-300 hover:text-emerald-200">cnil.fr</a>).
        </p>
      </>
    ),
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.20),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_35%)]" />

        <div className="relative mx-auto max-w-4xl space-y-8 px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-emerald-300">
              Accueil
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Politique de confidentialité</span>
          </div>

          {/* Header */}
          <header className="space-y-5">
            <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              EleveAI · Politique de confidentialité
            </p>

            <h1 className="text-3xl font-black tracking-tight text-slate-50 sm:text-5xl">
              Politique de confidentialité
            </h1>

            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              EleveAI s&apos;adresse à des élèves, dont beaucoup sont mineurs.{" "}
              <span className="font-semibold text-slate-50">
                La protection de leurs données n&apos;est pas une formalité : c&apos;est un engagement.
              </span>
            </p>

            {/* L'essentiel en 4 points */}
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-4 sm:p-5">
              <p className="text-sm font-semibold text-emerald-300">
                L&apos;essentiel en 4 points
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
                <li>🔑 Les élèves se connectent avec des codes — sans e-mail ni téléphone.</li>
                <li>🚫 Aucune donnée vendue, aucune publicité, aucun profilage.</li>
                <li>⚖️ Droits d&apos;accès, de rectification et de suppression sur simple demande, sous 30 jours.</li>
                <li>🌍 Nos prestataires sont nommés un par un (section 6) ; les transferts hors de l&apos;UE sont encadrés par le RGPD.</li>
                <li>🗑️ Données supprimées à la fin du contrat avec l&apos;établissement.</li>
              </ul>
            </div>
          </header>
        </div>
      </section>

      {/* CONTENU */}
      <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:py-12">
        {sections.map((s) => (
          <div key={s.titre} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-emerald-300">
              <span className="mr-2">{s.emoji}</span>
              {s.titre}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-200">{s.contenu}</div>
          </div>
        ))}

        {/* Footer */}
        <div className="space-y-3 border-t border-slate-800 pt-8 text-sm leading-7 text-slate-300">
          <p>
            Dernière mise à jour : août 2026. Une question, un doute ?{" "}
            <a href={MAILTO} className="font-semibold text-emerald-300 hover:text-emerald-200">
              {EDITEUR.contact}
            </a>
          </p>
          <p>
            Voir aussi :{" "}
            <Link href="/mentions-legales" className="font-semibold text-emerald-300 hover:text-emerald-200">
              mentions légales
            </Link>
            {" · "}
            <Link href="/cgu" className="font-semibold text-emerald-300 hover:text-emerald-200">
              conditions générales d&apos;utilisation
            </Link>
            {cgvEnVigueur && (
              <>
                {" · "}
                <Link href="/cgv" className="font-semibold text-emerald-300 hover:text-emerald-200">
                  conditions générales de vente
                </Link>
              </>
            )}
          </p>
        </div>
      </section>
    </main>
  );
}
