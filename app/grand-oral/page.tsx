// app/grand-oral/page.tsx

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Mic,
  Sparkles,
  ShieldCheck,
  Star,
} from "lucide-react";

export const metadata = {
  title: "Grand Oral Terminale | EleveAI",
  description:
    "Préparation express au Grand Oral : envoie ta fiche par WhatsApp et reçois un retour personnalisé sur ta problématique, ton plan et les questions possibles du jury.",
};

const whatsappNumber = "262XXXXXXXXX";

const whatsappText = encodeURIComponent(
  "Bonjour, je souhaite préparer mon Grand Oral. Je vais vous envoyer ma fiche, mes spécialités, mes deux questions et mon horaire de passage."
);

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

const checklist = [
  "As-tu une vraie problématique, pas seulement un thème ?",
  "Ton plan est-il clair en 2 ou 3 parties ?",
  "As-tu une accroche simple pour commencer ?",
  "Sais-tu expliquer les mots importants de ton sujet ?",
  "As-tu préparé les questions possibles du jury ?",
  "As-tu déjà essayé de parler à voix haute sans tout lire ?",
];

const helpItems = [
  "problématique",
  "plan",
  "accroche",
  "conclusion",
  "exemples",
  "questions du jury",
  "clarté à l’oral",
  "gestion du stress",
];

export default function GrandOralPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FBFF] text-slate-950">
      {/* FOND LUMINEUX */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[360px] w-[360px] rounded-full bg-sky-200/60 blur-3xl" />
        <div className="absolute right-[-8%] top-[12%] h-[420px] w-[420px] rounded-full bg-amber-200/70 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[25%] h-[480px] w-[480px] rounded-full bg-emerald-200/60 blur-3xl" />

        <svg
          className="absolute inset-0 h-full w-full opacity-[0.28]"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="goGlow" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1440" height="900" fill="url(#goGlow)" />

          <path
            d="M120 180 C310 80 460 120 620 220 C810 340 960 270 1160 160 C1280 95 1370 90 1460 120"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <path
            d="M-80 670 C180 520 330 680 540 580 C760 475 920 600 1110 500 C1240 430 1360 430 1510 500"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <circle cx="210" cy="250" r="6" fill="#0EA5E9" />
          <circle cx="1180" cy="220" r="7" fill="#F97316" />
          <circle cx="1060" cy="680" r="6" fill="#10B981" />
          <circle cx="420" cy="710" r="5" fill="#8B5CF6" />
        </svg>
      </div>

      {/* HERO */}
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-12 pt-8 sm:px-8 lg:flex-row lg:items-center lg:pb-16 lg:pt-14">
        <div className="flex-1">
          <Link
            href="/"
            className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
          >
            ← Retour EleveAI
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-black text-amber-800 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Offre express Grand Oral
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Prépare ton{" "}
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
              Grand Oral
            </span>{" "}
            avec plus de clarté.
          </h1>

          <p className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-slate-700 sm:text-xl">
            Envoie ta fiche par WhatsApp. Je t’aide à améliorer ta
            problématique, ton plan, ton accroche et les questions possibles du
            jury.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-emerald-600/20 transition hover:scale-[1.02] hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp : +262 06 92 74 29 58
            </a>

            <a
              href="#exemple"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-black text-slate-900 shadow-lg transition hover:scale-[1.02] hover:bg-slate-50"
            >
              Voir un exemple
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <p className="mt-4 max-w-xl text-sm font-bold text-slate-500">
            Paiement après premier contact. Tu restes l’auteur de ton oral : je
            t’aide à mieux le construire et à mieux l’expliquer.
          </p>
        </div>

        <div className="flex-1">
          <div className="relative mx-auto max-w-md rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-2xl backdrop-blur">
            <div className="absolute -right-5 -top-5 rounded-3xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-xl">
              Terminale
            </div>

            <div className="rounded-[1.5rem] bg-gradient-to-br from-sky-50 via-white to-amber-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-3xl text-white shadow-lg">
                  🎙️
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-sky-700">
                    Grand Oral
                  </p>
                  <h2 className="text-2xl font-black text-slate-950">
                    Ta fiche est-elle prête ?
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Une vraie question",
                  "Un plan simple",
                  "Des exemples maîtrisés",
                  "Des réponses au jury",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="font-black text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
                <p className="text-sm font-bold text-slate-300">
                  Objectif simple
                </p>
                <p className="mt-1 text-lg font-black">
                  Arriver devant le jury avec une idée claire à défendre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIANCE */}
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-5 pb-10 sm:px-8 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg">
          <ShieldCheck className="h-8 w-8 text-emerald-600" />
          <h3 className="mt-3 text-lg font-black text-slate-950">
            Accompagnement sérieux
          </h3>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
            Le but n’est pas de faire le travail à ta place, mais de t’aider à
            clarifier tes idées.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg">
          <Mic className="h-8 w-8 text-sky-600" />
          <h3 className="mt-3 text-lg font-black text-slate-950">
            Préparation orale
          </h3>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
            Tu peux aussi envoyer un vocal WhatsApp pour recevoir un retour sur
            ta clarté et ton rythme.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg">
          <Star className="h-8 w-8 text-amber-500" />
          <h3 className="mt-3 text-lg font-black text-slate-950">
            Retour concret
          </h3>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
            Tu reçois des améliorations précises : problématique, plan,
            accroche et questions du jury.
          </p>
        </div>
      </section>

      {/* EXEMPLE AVANT/APRÈS */}
      <section
        id="exemple"
        className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8"
      >
        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur sm:p-8">
          <p className="text-sm font-black uppercase tracking-wide text-indigo-700">
            Exemple concret
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Avant / après : transformer un thème en vraie problématique.
          </h2>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-100 bg-rose-50 p-5">
              <p className="text-sm font-black uppercase tracking-wide text-rose-700">
                Avant
              </p>
              <h3 className="mt-3 text-2xl font-black text-slate-950">
                “Les probabilités dans les jeux”
              </h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
                C’est intéressant, mais c’est encore trop vague. Le jury attend
                une question claire, pas seulement un thème.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-sm font-black uppercase tracking-wide text-emerald-700">
                Après
              </p>
              <h3 className="mt-3 text-2xl font-black text-slate-950">
                “Comment les probabilités permettent-elles de prendre une
                meilleure décision dans un jeu de hasard ?”
              </h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
                La question est plus précise. Elle permet d’expliquer une notion
                mathématique et de la relier à une situation concrète.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black text-slate-950">
                Plan possible
              </h3>

              <ol className="mt-4 space-y-3 text-sm font-bold text-slate-700">
                <li>1. Comprendre ce que signifie une probabilité.</li>
                <li>2. Utiliser les probabilités pour comparer des choix.</li>
                <li>
                  3. Comprendre les limites : le hasard reste toujours présent.
                </li>
              </ol>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black text-slate-950">
                Questions possibles du jury
              </h3>

              <ul className="mt-4 space-y-3 text-sm font-bold text-slate-700">
                <li>• Quelle est la différence entre hasard et probabilité ?</li>
                <li>• Peut-on vraiment prévoir un résultat ?</li>
                <li>• Pourquoi ce sujet est-il lié aux mathématiques ?</li>
                <li>• Où retrouve-t-on ce raisonnement dans la vie réelle ?</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CE QUE TU REÇOIS */}
      <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-sky-700">
              Ce que je peux améliorer
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
              Une fiche plus claire, un oral plus solide.
            </h2>

            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
              Le Grand Oral ne doit pas être un texte récité. C’est une idée à
              défendre clairement devant le jury.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {helpItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                <span className="font-black capitalize text-slate-800">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        <div className="rounded-[2rem] border border-sky-100 bg-sky-50/90 p-6 shadow-xl sm:p-8">
          <p className="text-sm font-black uppercase tracking-wide text-sky-700">
            Mini questionnaire
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Où en es-tu dans ta préparation ?
          </h2>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {checklist.map((question) => (
              <div
                key={question}
                className="rounded-2xl border border-white bg-white/90 p-4 text-sm font-black text-slate-800 shadow-sm"
              >
                {question}
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-2xl bg-white px-5 py-4 text-sm font-bold leading-relaxed text-slate-700 shadow-sm">
            Si tu réponds “non” à plusieurs questions, tu peux m’envoyer ta
            fiche par WhatsApp pour recevoir un retour personnalisé.
          </p>
        </div>
      </section>

      {/* OFFRES */}
      <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-wide text-amber-700">
            Offres de lancement
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
            Choisis l’aide dont tu as besoin.
          </h2>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  Pack Express
                </h3>
                <p className="mt-1 text-sm font-bold text-slate-500">
                  Retour personnalisé sur ta fiche
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 px-4 py-2 text-2xl font-black text-white">
                39 €
              </div>
            </div>

            <ul className="mt-5 space-y-3 text-sm font-bold text-slate-700">
              <li>✅ Problématique améliorée</li>
              <li>✅ Plan conseillé</li>
              <li>✅ Accroche et conclusion possibles</li>
              <li>✅ Questions possibles du jury</li>
              <li>✅ Conseils personnalisés</li>
            </ul>
          </div>

          <div className="relative rounded-[2rem] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-sky-50 p-6 shadow-xl">
            <div className="absolute right-5 top-5 rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase text-amber-950">
              recommandé
            </div>

            <div className="flex items-start justify-between gap-4 pr-24">
              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  Pack Oral
                </h3>
                <p className="mt-1 text-sm font-bold text-slate-500">
                  Fiche + retour sur vocal WhatsApp
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-600 px-4 py-2 text-2xl font-black text-white">
                69 €
              </div>
            </div>

            <ul className="mt-5 space-y-3 text-sm font-bold text-slate-700">
              <li>✅ Tout le Pack Express</li>
              <li>✅ Retour sur un vocal d’entraînement</li>
              <li>✅ Conseils sur le rythme</li>
              <li>✅ Conseils sur la clarté</li>
              <li>✅ Points à retravailler avant le passage</li>
            </ul>
          </div>
        </div>

        <div className="mt-7 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-emerald-600/20 transition hover:scale-[1.02] hover:bg-emerald-700"
          >
            <MessageCircle className="h-5 w-5" />
            Me contacter sur WhatsApp
          </a>

          <p className="mt-3 text-sm font-bold text-slate-500">
            Paiement possible après contact par Wero/Paylib ou virement.
          </p>
        </div>
      </section>

      {/* CE QU'IL FAUT ENVOYER */}
      <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl sm:p-8">
          <h2 className="text-3xl font-black text-slate-950">
            Ce qu’il faut envoyer par WhatsApp
          </h2>

          <p className="mt-3 text-base font-semibold text-slate-700">
            Pour recevoir un retour efficace, prépare simplement ces éléments.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Ta classe",
              "Tes spécialités",
              "Tes deux questions",
              "Ta fiche ou ton brouillon",
              "Ton horaire de passage",
              "Ce que tu veux améliorer",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-3 font-black text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-6 sm:px-8">
        <div className="rounded-[2rem] bg-slate-950 p-7 text-center text-white shadow-2xl sm:p-10">
          <h2 className="text-3xl font-black sm:text-4xl">
            Ton Grand Oral ne doit pas être un texte récité.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-slate-300">
            Il doit devenir une discussion claire avec le jury. Envoie ta fiche
            par WhatsApp +262 06 92 74 29 58
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-black text-slate-950 shadow-xl transition hover:scale-[1.02] hover:bg-slate-100"
          >
            <MessageCircle className="h-5 w-5" />
            Envoyer ma fiche maintenant
          </a>
        </div>
      </section>
    </main>
  );
}