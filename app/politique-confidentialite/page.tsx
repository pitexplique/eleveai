import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité | EleveAI",
  description:
    "Comment EleveAI protège les données des élèves, des professeurs et des établissements : données minimales, aucune revente, conformité RGPD.",
};

const sections = [
  {
    emoji: "🧑‍🏫",
    titre: "1. Qui est responsable de vos données ?",
    contenu: (
      <>
        <p>
          EleveAI est une plateforme éducative conçue par un enseignant en activité
          à La Réunion. Le responsable du traitement des données est l&apos;éditeur
          de la plateforme EleveAI.
        </p>
        <p>
          Pour toute question sur vos données :{" "}
          <a href="mailto:contact@eleveai.fr" className="font-bold text-emerald-300 underline">
            contact@eleveai.fr
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
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <span className="font-bold text-white">Élèves</span> : un code établissement et un
            code élève fournis par l&apos;établissement, le prénom et le nom transmis par
            l&apos;établissement, la classe, et les résultats des exercices (scores, réponses,
            progression notion par notion).
          </li>
          <li>
            <span className="font-bold text-white">Aucune autre donnée élève</span> : pas
            d&apos;adresse e-mail élève, pas de numéro de téléphone, pas d&apos;adresse postale,
            pas de photo.
          </li>
          <li>
            <span className="font-bold text-white">Professeurs et établissements</span> : une
            adresse e-mail professionnelle pour la création et la gestion du compte.
          </li>
          <li>
            <span className="font-bold text-white">Questions posées au coach IA</span> : le texte
            des questions et des réponses est conservé pour le suivi pédagogique et
            l&apos;amélioration du service.
          </li>
        </ul>
      </>
    ),
  },
  {
    emoji: "🎯",
    titre: "3. Pourquoi ces données ?",
    contenu: (
      <ul className="ml-5 list-disc space-y-1">
        <li>Permettre à chaque élève d&apos;accéder à ses exercices et de suivre sa progression.</li>
        <li>Donner aux professeurs et aux établissements un tableau de bord de suivi pédagogique.</li>
        <li>Adapter les contenus au niveau de l&apos;élève.</li>
        <li>Assurer la sécurité de la plateforme.</li>
      </ul>
    ),
  },
  {
    emoji: "🚫",
    titre: "4. Ce que nous ne faisons jamais",
    contenu: (
      <ul className="ml-5 list-disc space-y-1">
        <li>
          <span className="font-bold text-white">Aucune vente ni location de données</span> à des
          tiers, sous aucune forme.
        </li>
        <li>
          <span className="font-bold text-white">Aucune publicité</span> sur la plateforme, donc
          aucun profilage publicitaire ni cookie publicitaire.
        </li>
        <li>
          <span className="font-bold text-white">Aucune publication de nom de famille
          d&apos;élève</span> : lorsque des élèves testeurs sont remerciés publiquement, seuls les
          prénoms apparaissent.
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
        <p>EleveAI s&apos;appuie sur des prestataires techniques reconnus :</p>
        <ul className="ml-5 list-disc space-y-1">
          <li><span className="font-bold text-white">Vercel</span> — hébergement du site.</li>
          <li><span className="font-bold text-white">Supabase</span> — base de données (comptes, résultats).</li>
          <li><span className="font-bold text-white">OpenAI</span> — génération des réponses du coach IA et des audios.</li>
        </ul>
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
      <p>
        Les données des élèves sont conservées pendant la durée du contrat avec
        l&apos;établissement (ou de l&apos;abonnement famille), puis supprimées. Un établissement
        peut demander à tout moment la suppression des comptes de ses élèves.
      </p>
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
          Pour exercer ces droits, écrivez à{" "}
          <a href="mailto:contact@eleveai.fr" className="font-bold text-emerald-300 underline">
            contact@eleveai.fr
          </a>{" "}
          — réponse sous 30 jours maximum. Vous pouvez également saisir la CNIL
          (<a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="text-sky-300 underline">cnil.fr</a>).
        </p>
      </>
    ),
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
          EleveAI
        </p>
        <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mt-3 text-base font-medium leading-relaxed text-slate-400">
          EleveAI s&apos;adresse à des élèves, dont beaucoup sont mineurs. La protection de leurs
          données n&apos;est pas une formalité : c&apos;est un engagement.
        </p>

        {/* L'essentiel en 4 points */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            { emoji: "🔑", texte: "Les élèves se connectent avec des codes — sans e-mail ni téléphone." },
            { emoji: "🚫", texte: "Aucune donnée vendue, aucune publicité, aucun profilage." },
            { emoji: "🇪🇺", texte: "Conforme au RGPD : accès, rectification, suppression sur simple demande." },
            { emoji: "🗑️", texte: "Données supprimées à la fin du contrat avec l'établissement." },
          ].map((item) => (
            <div
              key={item.texte}
              className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm font-semibold leading-relaxed text-slate-200"
            >
              <span className="mr-2">{item.emoji}</span>
              {item.texte}
            </div>
          ))}
        </div>

        {/* Sections détaillées */}
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.titre} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-3 text-lg font-black text-white">
                <span className="mr-2">{s.emoji}</span>
                {s.titre}
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-slate-300">{s.contenu}</div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-400">
          <p>
            Dernière mise à jour : juin 2026. Une question, un doute ?{" "}
            <a href="mailto:contact@eleveai.fr" className="font-bold text-emerald-300 underline">
              contact@eleveai.fr
            </a>
          </p>
          <p className="mt-2">
            Voir aussi : <Link href="/mentions-legales" className="text-sky-300 underline">mentions légales</Link>
            {" · "}
            <Link href="/cgu" className="text-sky-300 underline">conditions générales d&apos;utilisation</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
