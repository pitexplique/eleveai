"use client";

import Script from "next/script";
import Link from "next/link";
// ⛔ CETTE PAGE A ÉTÉ RÉÉCRITE LE 22/08/2026, ET C'ÉTAIT LA PLUS URGENTE.
// Elle décrivait encore le modèle d'avant, mot pour mot : « EleveAI est
// actuellement en phase pilote », « contactez-nous pour un devis », « un accès
// individuel payant pour les familles est prévu, les modalités seront
// communiquées prochainement ». Le prix était publié sur /tarifs depuis le
// 21/08 ; ici, il n'existait pas encore.
//
// ⚠️ ET ELLE ÉMET UN JSON-LD `FAQPage` : ces réponses-là ne dorment pas dans
// une page peu visitée, elles peuvent s'afficher DANS les résultats de Google,
// sous la marque. Une FAQ périmée est le pire endroit où laisser un ancien
// modèle économique — c'est le seul format que les moteurs recopient tel quel.
//
// ⛔ Aucun prix n'est écrit à la main ici. Ils viennent tous de `lib/tarifs.ts`,
// et l'état de la vente de `lib/legal/editeur.ts`, exactement comme /tarifs et
// le llms.txt. C'est ce couple-là qui s'était désaccordé en juin.
import { VENTE } from "@/lib/legal/editeur";
// ⛔⛔ LES QUATRE CONSTANTES `*_ETABLISSEMENT*` SONT PARTIES LE 01/09/2026 avec
// la question qu'elles servaient. Cette FAQ ÉMET UN `FAQPage` : la réponse
// « et pour un établissement entier ? » ne dormait pas dans une page peu
// visitée, elle partait dans les résultats de Google et y proposait encore un
// contrat qu'il est interdit de signer — six jours après la décision du 29/08.
// C'est pour ça qu'on la SUPPRIME au lieu de la réécrire en « non » : une
// réponse qui reste ici reste dans le JSON-LD.
import {
  ANNUEL_AU_TARIF_MENSUEL,
  ENSEIGNANT,
  MOIS_OFFERTS,
  PERIODE_ANNUELLE,
  PRIX_ANNUEL,
  PRIX_MENSUEL,
  REDUCTION_ANNUEL_POURCENT,
  montant,
  pourcent,
} from "@/lib/tarifs";

export default function FAQTarifs() {
  // La même phrase que sur /tarifs et dans le llms.txt : tant que Stripe
  // n'encaisse pas, on annonce un prix ferme et une caisse fermée. Annoncer une
  // offre achetable dont le paiement ne répond pas est pire que le silence.
  const etatVente = VENTE.ouverte
    ? "L'abonnement est ouvert."
    : "L'abonnement n'ouvre pas encore : la vue du parent se construit en ce moment, et rien n'est encaissé tant qu'elle n'est pas prête. Le prix, lui, est ferme.";

  const faq = [
    {
      q: "Mon enfant peut-il travailler sur EleveAI sans que je paie ?",
      a: "Oui, entièrement et sans limite de temps. Le coach dans les cinq matières, les exercices corrigés, les parcours, le calcul rapide, les défis, les cahiers, les fiches de cours et les évaluations blanches ne se paient pas, et il n'y a aucune publicité. Il garde ses résultats. Rien de tout cela ne deviendra payant.",
    },
    {
      q: "Alors qu'est-ce qui se paie ?",
      a: "La fenêtre du parent. Votre enfant voit déjà sa progression ; ce que l'abonnement ouvre, c'est votre vue à vous — son bulletin, ce qu'il a travaillé cette semaine, son historique, et des recommandations qui vous disent quoi reprendre maintenant, notion par notion. Elles sont calculées sur des règles explicites et non par une IA opaque : chacune s'explique devant un professeur.",
    },
    {
      q: "Par enfant ou par famille ?",
      a: `Par famille, quel que soit le nombre d'enfants, sur une seule adresse courriel. Le frère ou la sœur d'à côté n'a pas à apprendre moins parce qu'il est le deuxième. Cela fait ${montant(
        PRIX_MENSUEL,
      )} par mois pour toute la maison.`,
    },
    /* ⛔ LE NOMBRE DE MOIS OFFERTS SE CALCULE. La grille du 01/09 annonçait
       « deux mois offerts » ; deux mois de 2,50 € font 25 € par an, pas 19,90 €.
       L'offre est plus généreuse que sa propre formule — voir `MOIS_OFFERTS`. */
    {
      q: "Mensuel ou annuel ?",
      a: `Au mois, c'est ${montant(
        PRIX_MENSUEL,
      )}, sans engagement, résiliable quand vous voulez. À l'année, c'est ${montant(
        PRIX_ANNUEL,
      )} au lieu de ${montant(
        ANNUEL_AU_TARIF_MENSUEL,
      )} : ${pourcent(REDUCTION_ANNUEL_POURCENT)} de moins, l'équivalent de ${MOIS_OFFERTS} mois offerts. En échange, l'abonnement annuel couvre l'année scolaire et non douze mois glissants — souscrit en janvier, il s'arrête à la fin de l'année scolaire en cours.`,
    },
    {
      q: "Et si je suis professeur ?",
      a: `Vous ne payez rien : le compte enseignant est gratuit, à titre personnel, et s'ouvre sur ${ENSEIGNANT.verification}. Tableau de bord de classe compris, sans demander l'autorisation de personne.`,
    },
    /* ⭐ LA QUESTION QUI ÉVITE UN MALENTENDU EN SALLE DES PROFS, AJOUTÉE LE
       01/09. « Gratuit pour les enseignants » se comprend spontanément
       « gratuit pour ma classe » : un professeur de bonne foi l'annoncera à ses
       familles, et ce sont elles qui découvriront le prix. Cette FAQ part dans
       les résultats de Google, c'est-à-dire à l'endroit exact où la question se
       pose — la réponse doit être celle qu'on donnerait en face. */
    {
      q: "Mon professeur a EleveAI : est-ce gratuit pour ma classe ?",
      a: "Votre enfant l'a déjà gratuitement, et tous les élèves : le coach, les exercices, les parcours et les évaluations ne se paient pas, avec ou sans professeur. Ce que le compte gratuit de l'enseignant ne débloque pas, c'est l'abonnement des parents — votre fenêtre à vous, celle qui montre le bulletin et dit quoi reprendre. Elle reste au tarif normal.",
    },
    {
      q: "Pourquoi est-ce à ce point moins cher qu'ailleurs ?",
      a: "Parce que la structure n'est pas la même : aucun investisseur à rémunérer, aucun commercial, des exercices écrits ici plutôt qu'achetés, et un élève de plus qui ne coûte presque rien. L'IA démultiplie le travail, et l'enseignant vérifie — les deux moitiés ne se séparent jamais. C'est un professeur en exercice qui relit ses propres exercices.",
    },
    {
      // ⛔ CETTE RÉPONSE PROMETTAIT « SI SON ÉTABLISSEMENT PARTICIPE, LA
      // FAMILLE N'A RIEN À PAYER DU TOUT ». Aucun établissement ne participe et
      // aucun ne le peut : la vente à un établissement est interdite depuis le
      // 31/08 (contractuel en CDI). La phrase donnait au parent une raison
      // d'attendre au lieu d'essayer — la pire des deux issues.
      q: "Comment mon enfant se connecte-t-il ?",
      a: "Il n'a même pas besoin de compte : le coach, les exercices, les parcours et les évaluations sont ouverts tout de suite, sans adresse e-mail à donner. Créer un compte élève ne se paie pas non plus — ça sert à garder sa progression d'une fois sur l'autre.",
    },
    {
      q: "Puis-je arrêter quand je veux ?",
      a: "Oui. Sans engagement, résiliable à tout moment depuis votre espace, et vous avez quatorze jours pour changer d'avis, remboursés, même si votre enfant a déjà tout utilisé. C'est écrit dans les conditions de vente.",
    },
    {
      q: "Et si je ne peux pas payer ?",
      a: "Alors vous ne payez pas, et personne ne le saura. Si l'enfant d'à côté ne paie pas, il apprend exactement la même chose : aucun élève n'a jamais eu à demander quoi que ce soit pour travailler ici.",
    },
    {
      q: "Les données de mon enfant sont-elles protégées ?",
      a: "Oui. On ne collecte que le strict nécessaire — de quoi l'identifier dans sa classe et suivre ses résultats. Aucune donnée sensible n'est stockée, et les recommandations sont calculées chez nous, sans appel à un service externe. Le détail est dans la politique de confidentialité.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-16">
      <Script
        id="faq-tarifs-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-sm text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-300 transition">
            Accueil
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/faq" className="hover:text-emerald-300 transition">
            FAQ
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200">Tarifs</span>
        </div>

        <h1 className="text-3xl font-bold text-emerald-300">
          FAQ Tarifs – EleveAI
        </h1>

        {/* ⚠️ « CELUI D'UNE FAMILLE COMME CELUI D'UN PROFESSEUR » ÉTAIT FAUX
            DEPUIS LE 22/08 et a tenu jusqu'au 01/09 : le professeur ne paie pas
            de tableau de bord, il ouvre un tarif à ses familles. Une constante
            protège d'un chiffre faux, jamais d'une phrase fausse — celle-ci
            citait le bon montant à côté du mauvais payeur, et c'est ce qui l'a
            rendue invisible à toutes les relectures. */}
        <p className="text-slate-300 text-sm leading-relaxed">
          La vue du parent, c&apos;est {montant(PRIX_MENSUEL)} par mois pour toute
          la maison, ou {montant(PRIX_ANNUEL)} {PERIODE_ANNUELLE}. Le professeur,
          lui, ne paie rien. Et l&apos;élève ne paie jamais. {etatVente}
        </p>

        <section className="space-y-4">
          {faq.map((f, i) => (
            <details
              key={i}
              className="rounded-xl border border-slate-700 bg-slate-900/60 p-4"
            >
              <summary className="cursor-pointer font-semibold text-emerald-300">
                {f.q}
              </summary>
              <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </section>

        <div className="pt-6 border-t border-slate-800 text-sm text-slate-400">
          Besoin d&apos;un avis ?{" "}
          <Link
            href="/contact"
            className="text-emerald-300 font-semibold hover:text-emerald-200"
          >
            Écrire à l&apos;équipe
          </Link>
          {/* ⛔ « EleveAI dans un établissement » menait à /espace-ecoles,
              supprimée le 31/08/2026 : rien ne se vend à un établissement. */}
          {" · "}
          <Link
            href="/tarifs"
            className="text-emerald-300 font-semibold hover:text-emerald-200"
          >
            Page Tarifs
          </Link>
        </div>
      </div>
    </main>
  );
}
