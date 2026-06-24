"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  Landmark,
  Lightbulb,
  PencilLine,
  Printer,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import ModeClasse, { type ClasseSlide } from "@/components/fiches/ModeClasse";

const identite = [
  { label: "Prérequis", valeur: "Savoir formuler une consigne" },
  { label: "Idée clé", valeur: "Un bon prompt = précis + contexte" },
  { label: "Réflexe", valeur: "Toujours vérifier la réponse" },
];

// La « recette » d'un bon prompt (structure rôle / contexte / tâche / contraintes / format).
const recette = [
  { etape: "Contexte", detail: "Dis qui tu es et pour quoi : « Je suis en 4e, pour un exposé… »" },
  { etape: "Tâche", detail: "Donne un verbe d'action clair : résume, explique, compare, traduis, propose…" },
  { etape: "Contraintes", detail: "Précise les limites : longueur, niveau, langue, ce qu'il faut éviter." },
  { etape: "Format", detail: "Indique la forme voulue : liste, tableau, plan en 3 parties, paragraphe court." },
];

const notions = [
  {
    titre: "Écrire un bon prompt",
    texte:
      "Plus ta demande est précise et donne du contexte, plus la réponse colle à ton besoin. Un mot seul ne suffit pas.",
  },
  {
    titre: "Itérer",
    texte:
      "Si la réponse ne convient pas, reformule ou précise. On avance par allers-retours : « plus court », « avec un exemple »…",
  },
  {
    titre: "Vérifier & rester responsable",
    texte:
      "L'IA peut inventer (hallucinations). On vérifie les infos importantes, et on ne lui confie jamais de données personnelles.",
  },
];

const exemples = [
  {
    titre: "Prompt trop vague → prompt précis",
    donnees: "Vague : « volcan ».",
    question: "Comment mieux demander ?",
    solution:
      "« Je suis en 6e. Explique en 5 phrases simples comment se forme un volcan, avec un exemple. » → contexte + tâche + format.",
  },
  {
    titre: "Itérer pour améliorer",
    donnees: "L'IA donne un texte trop long.",
    question: "Que faire ensuite ?",
    solution:
      "On relance : « Résume ta réponse en 3 phrases, pour un élève de 6e. » On affine sans tout réécrire.",
  },
];

const pieges = [
  "Tout croire sans vérifier : l'IA peut inventer des faits (hallucinations).",
  "Donner des données personnelles, sensibles ou confidentielles.",
  "Copier-coller la réponse sans la comprendre (et sans citer l'aide de l'IA).",
  "Écrire un prompt trop court ou trop vague.",
];

const aRetenir = [
  "Un bon prompt est précis, avec le contexte, la tâche et le format attendus.",
  "On progresse par itérations : on reformule jusqu'au bon résultat.",
  "On vérifie toujours les informations importantes en croisant les sources.",
  "On ne confie jamais de données personnelles à une IA en ligne.",
  "L'IA aide à apprendre, elle ne remplace pas ta réflexion.",
];

const entrainement = [
  {
    question:
      "Réécris ce prompt pour qu'il soit efficace : « parle-moi des dinosaures ».",
    correction:
      "Par exemple : « Je suis en 6e. Explique en 5 phrases simples pourquoi les dinosaures ont disparu, avec un exemple. » (contexte + tâche + format)",
  },
  {
    question:
      "Une IA t'affirme une date précise pour un exposé noté. Quel est le bon réflexe ?",
    correction:
      "Vérifier cette date dans une source fiable (manuel, encyclopédie, site sérieux) avant de l'utiliser : l'IA peut se tromper.",
  },
  {
    question:
      "La réponse de l'IA est correcte mais trop compliquée. Que fais-tu ?",
    correction:
      "Tu itères : « Explique plus simplement, pour un élève de 6e, avec un exemple du quotidien. »",
  },
  {
    question:
      "Tu veux que l'IA t'aide pour un devoir. Quelles informations ne dois-tu PAS lui donner ?",
    correction:
      "Aucune donnée personnelle ou sensible : nom complet, adresse, numéro, mot de passe, informations privées sur toi ou les autres.",
  },
];

const classeSlides: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Utiliser une IA générative",
    section: {
      type: "objectif",
      phrase: "Bien demander, vérifier et rester responsable",
      sousPhrase:
        "Une IA générative produit du texte à partir d'une consigne (un « prompt »). Tout dépend de la façon de demander.",
      encadre: {
        titre: "Question à poser",
        texte: "Ma demande est-elle assez précise, et ai-je vérifié la réponse ?",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Résumer un texte, traduire, trouver des idées, faire expliquer autrement, s'entraîner avant un contrôle, rédiger un plan.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Une IA générative ne « sait » pas si c'est vrai : elle prédit les mots les plus probables. Elle peut donc inventer — c'est ce qu'on appelle une hallucination.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: { type: "cartes", cartes: notions },
  },
  {
    titre: "La recette d'un bon prompt",
    badge: "Contexte · Tâche · Contraintes · Format",
    section: { type: "etapes", etapes: recette.map((m) => `${m.etape} : ${m.detail}`) },
  },
  {
    titre: "Exemple guidé",
    badge: "Vague → précis",
    section: {
      type: "exemple",
      enonce: "Prompt vague : « volcan ».",
      question: "Comment mieux demander ?",
      correction:
        "« Je suis en 6e. Explique en 5 phrases simples comment se forme un volcan, avec un exemple. »",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "« parle-moi des dinosaures »",
      question: "Réécris ce prompt pour qu'il soit efficace.",
      indice: "Ajoute le contexte, une tâche claire et le format.",
      correction:
        "« Je suis en 6e. Explique en 5 phrases simples pourquoi les dinosaures ont disparu, avec un exemple. »",
    },
  },
];

export default function UtiliserIaGenerativePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f5f6ff] text-slate-800">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-violet-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="absolute left-8 top-40 rotate-[-6deg] rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-indigo-500 shadow-sm">
          prompt
        </div>
        <div className="absolute right-10 top-56 rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-3xl font-black text-violet-500 shadow-sm">
          IA
        </div>
        <div className="absolute bottom-44 left-12 -rotate-3 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-sky-500 shadow-sm">
          ?
        </div>
        <div className="absolute bottom-60 right-16 rotate-6 rounded-2xl border border-white bg-white/80 px-4 py-2 text-2xl font-black text-emerald-500 shadow-sm">
          ✓
        </div>
      </div>

      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <nav
            aria-label="Fil d'ariane"
            className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-bold text-slate-500"
          >
            <Link
              href="/fiches-cours"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Fiches de cours
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span>IA</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span>Usages</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">Utiliser une IA générative</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            <ModeClasse sousTitre="Utiliser une IA générative" slides={classeSlides} />
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              <Download className="h-4 w-4" />
              Télécharger en PDF
            </button>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <header className="border-b border-slate-200 pb-6">
            <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="flex items-center gap-2 text-lg font-black tracking-tight text-indigo-600">
                <Sparkles className="h-5 w-5" />
                eleveai.fr
              </span>
              <span className="text-sm font-bold italic text-slate-500">
                La liberté d&apos;apprendre
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-normal">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-700">IA</span>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">
                Domaine 2 · Usages
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                Fiche de cours
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl">
              Utiliser une IA générative
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
              Une IA générative (comme un agent conversationnel) produit du texte,
              des images ou du code à partir d&apos;une consigne appelée{" "}
              <strong>prompt</strong>. Bien l&apos;utiliser, c&apos;est savoir lui
              demander, vérifier ses réponses et rester responsable.
            </p>
            <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-3 print:grid-cols-3 print:p-3">
              {identite.map((item) => (
                <div key={item.label}>
                  <span className="block text-xs font-black uppercase text-slate-500">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-black text-slate-900">
                    {item.valeur}
                  </span>
                </div>
              ))}
            </div>
          </header>

          <section className="py-6 print:py-4">
            <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Wrench className="h-5 w-5 text-indigo-500 print:hidden" />
                  À quoi ça sert ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Résumer un texte, traduire, trouver des idées, faire expliquer
                  autrement une notion, s&apos;entraîner avant un contrôle, rédiger
                  un plan d&apos;exposé. L&apos;IA générative est un assistant —
                  utile si on garde la main.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <Landmark className="h-5 w-5 text-amber-500 print:hidden" />
                  Le savais-tu ?
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                  Une IA générative ne « sait » pas si c&apos;est vrai : elle
                  prédit, mot après mot, la suite la plus probable. Elle peut donc
                  inventer une information fausse présentée comme vraie — on appelle
                  ça une <strong>hallucination</strong>.
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-5 py-6 md:grid-cols-3 print:grid-cols-3 print:gap-3 print:py-4">
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
              <BookOpen className="h-5 w-5 text-indigo-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                1. Écrire un bon prompt
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                Plus ta demande est précise et donne du contexte, plus la réponse
                colle à ton besoin. Un mot seul ne suffit pas.
              </p>
            </div>
            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
              <Lightbulb className="h-5 w-5 text-violet-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                2. Itérer
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                Si la réponse ne convient pas, reformule ou précise. On avance par
                allers-retours : « plus court », « avec un exemple »…
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-500 print:hidden" />
              <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                3. Vérifier
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                L&apos;IA peut se tromper : on vérifie les infos importantes, et on
                ne lui confie jamais de données personnelles.
              </p>
            </div>
          </div>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              La recette d&apos;un bon prompt
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
              Un prompt efficace tient souvent en quatre ingrédients. Tu n&apos;as
              pas besoin de tous à chaque fois, mais plus tu en donnes, mieux
              c&apos;est.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <tbody className="divide-y divide-slate-200">
                  {recette.map((m) => (
                    <tr key={m.etape}>
                      <th className="w-44 bg-slate-50 px-4 py-3 font-black text-indigo-700">
                        {m.etape}
                      </th>
                      <td className="px-4 py-3 text-slate-600">{m.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50 p-3 text-sm leading-6 text-indigo-800 print:text-xs">
              <strong>Exemple complet :</strong> « Je suis en 6e (contexte). Résume
              ce texte (tâche) en 5 phrases simples, sans mots compliqués
              (contraintes), sous forme de liste à puces (format). »
            </p>
          </section>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              Exemples corrigés
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
              {exemples.map((exemple) => (
                <div
                  key={exemple.titre}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-black text-slate-900">{exemple.titre}</h3>
                  <p className="mt-2 text-sm text-slate-600 print:text-xs">
                    {exemple.donnees}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900 print:text-xs">
                    {exemple.question}
                  </p>
                  <p className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50 p-3 text-sm leading-6 text-indigo-800 print:text-xs">
                    {exemple.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-slate-200 py-6 print:py-4">
            <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <AlertTriangle className="h-5 w-5 text-amber-500 print:hidden" />
                  Pièges à éviter
                </h2>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 print:text-xs">
                  {pieges.map((piege) => (
                    <li key={piege}>{piege}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 print:hidden" />
                  À retenir
                </h2>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 print:text-xs">
                  {aRetenir.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-6 print:pt-4">
            <h2 className="flex items-center gap-2 text-2xl font-black text-slate-900 print:text-xl">
              <PencilLine className="h-6 w-6 text-indigo-500 print:hidden" />
              Je m&apos;entraîne
            </h2>
            <ol className="mt-4 grid gap-4 text-sm leading-6 text-slate-700 print:gap-2 print:text-xs">
              {entrainement.map((item, index) => (
                <li
                  key={item.question}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <p className="font-bold text-slate-900">
                    {index + 1}. {item.question}
                  </p>
                  <details className="fiche-correction mt-2">
                    <summary className="cursor-pointer text-sm font-bold text-indigo-600">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-xl border border-indigo-100 bg-indigo-50 p-3 text-sm leading-6 text-indigo-800">
                      {item.correction}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            <div className="screen-only mt-6 flex flex-wrap gap-2">
              <Link
                href="/coach-ia/ia"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
              >
                <Sparkles className="h-4 w-4" />
                M&apos;entraîner avec le Coach IA
              </Link>
              <Link
                href="/eval-pix-ia"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-white px-5 py-3 text-sm font-black text-indigo-700 shadow-sm transition hover:bg-indigo-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                Me tester · éval Pix IA
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-white px-5 py-3 text-sm font-black text-indigo-700 shadow-sm transition hover:bg-indigo-50"
              >
                <Download className="h-4 w-4" />
                Télécharger en PDF
              </button>
            </div>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Fiche de cours</span>
            <span>Utiliser une IA générative</span>
          </footer>
        </section>
      </article>

      <div className="screen-only fixed bottom-5 right-5 hidden sm:block">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-xl shadow-slate-300/50 transition hover:bg-slate-100"
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </button>
      </div>

      <style jsx global>{`
        .remerciements-bar {
          display: none !important;
        }

        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          html,
          body {
            background: white !important;
            color: #0f172a !important;
          }

          body > header,
          body > footer,
          .screen-only {
            display: none !important;
          }

          main {
            min-height: auto !important;
            background: white !important;
            color: #0f172a !important;
          }

          .fiche-correction > summary {
            list-style: none;
            font-weight: 700;
            color: #475569 !important;
          }

          .fiche-correction > *:not(summary) {
            display: block !important;
          }
        }
      `}</style>
    </main>
  );
}
