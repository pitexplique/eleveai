// app/communaute/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  UsersRound,
  ShieldCheck,
  GraduationCap,
  Users,
  HeartHandshake,
  ExternalLink,
  Sparkles,
  MessageSquareText,
  ClipboardCheck,
} from "lucide-react";

const DISCORD_INVITE_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || "https://discord.gg/Z6HyN6SV";
  
export const metadata: Metadata = {
  title: "Communauté — EleveAI",
  description:
    "Rejoignez la communauté EleveAI : élèves, professeurs et parents échangent autour d’un usage responsable et encadré de l’IA à l’école (anti-triche, esprit critique, bonnes pratiques).",
  alternates: {
    canonical: "/communaute",
  },
  openGraph: {
    title: "Communauté — EleveAI",
    description:
      "Un espace d’échanges (élèves · professeurs · parents) pour apprendre à utiliser l’IA à l’école de façon responsable : cadre anti-triche, méthodologie, retours d’expérience.",
    url: "/communaute",
    siteName: "EleveAI",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Communauté — EleveAI",
    description:
      "Un espace d’échanges pour un usage responsable de l’IA à l’école (anti-triche, méthode, esprit critique).",
  },
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/40 px-2.5 py-1 text-[11px] font-semibold text-slate-200">
      {children}
    </span>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/60 text-slate-200">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
          <div className="mt-1 text-sm text-slate-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

function MiniFaq({
  q,
  a,
}: {
  q: string;
  a: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-5">
      <div className="text-sm font-semibold text-slate-100">{q}</div>
      <div className="mt-2 text-sm text-slate-300 leading-relaxed">{a}</div>
    </div>
  );
}

export default function CommunautePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>
              <span className="inline-flex items-center gap-2">
                <UsersRound className="h-3.5 w-3.5" />
                Élèves · Profs · Parents
              </span>
            </Badge>
            <Badge>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                IA autorisée, mais encadrée
              </span>
            </Badge>
            <Badge>
              <span className="inline-flex items-center gap-2">
                <ClipboardCheck className="h-3.5 w-3.5" />
                Anti-triche · Esprit critique
              </span>
            </Badge>
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            La communauté EleveAI
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300 leading-relaxed">
            Un espace d’échanges pour apprendre à utiliser l’intelligence artificielle à l’école de
            façon responsable : méthode, bonnes pratiques, exemples de prompts encadrés, retours
            d’expérience, et accompagnement.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/15 hover:border-emerald-400/60"
              title="Rejoindre la communauté EleveAI sur Discord"
            >
              <MessageSquareText className="h-4 w-4" />
              Rejoindre sur Discord sans discorde
              <ExternalLink className="h-4 w-4 opacity-80" />
            </a>

            <Link
              href="/atelier-IA/vision"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/30 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:border-slate-500"
            >
              <Sparkles className="h-4 w-4" />
              Comprendre la vision EleveAI
            </Link>
          </div>

          <div className="mt-6 max-w-3xl text-xs text-slate-400 leading-relaxed">
            EleveAI est une communauté éducative indépendante. Elle utilise des outils d’IA (dont
            ChatGPT) à des fins pédagogiques, sans affiliation ni validation par OpenAI.
          </div>
        </div>
      </section>

      {/* POUR QUI + OBJECTIFS */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <h2 className="text-xl font-bold">Pour qui ? Pour quoi faire ?</h2>
        <p className="mt-2 max-w-3xl text-slate-300">
          La communauté EleveAI est pensée pour être utile immédiatement, même si tu débutes avec l’IA.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card icon={<GraduationCap className="h-5 w-5" />} title="Élèves">
            Apprendre à <span className="text-slate-100 font-semibold">raisonner</span> avec l’IA :
            reformuler, justifier, corriger, vérifier. Pas de devoir “clé en main”.
          </Card>

          <Card icon={<Users className="h-5 w-5" />} title="Professeurs">
            Partager des <span className="text-slate-100 font-semibold">prompts encadrés</span>,
            des méthodes, des devoirs IA-friendly et des retours terrain.
          </Card>

          <Card icon={<HeartHandshake className="h-5 w-5" />} title="Parents">
            Comprendre l’IA, poser un cadre simple à la maison, et accompagner sans stress ni conflit.
          </Card>
        </div>
      </section>

      {/* CE QUE TU TROUVES SUR DISCORD */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:pb-12">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/20 p-6 sm:p-8">
          <h2 className="text-xl font-bold">Ce que tu trouveras sur Discord</h2>
          <p className="mt-2 max-w-3xl text-slate-300">
            Un serveur simple au départ, qui grandit doucement avec des échanges de qualité.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card icon={<ShieldCheck className="h-5 w-5" />} title="Un cadre anti-triche">
              On privilégie la compréhension : étapes, justification, et capacité à expliquer.
            </Card>

            <Card icon={<ClipboardCheck className="h-5 w-5" />} title="Méthodes & exemples">
              Exemples de bons prompts, grilles de vérification, erreurs fréquentes.
            </Card>

            <Card icon={<MessageSquareText className="h-5 w-5" />} title="Échanges humains">
              Questions/réponses, retours d’expérience, et entraide bienveillante.
            </Card>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/15 hover:border-emerald-400/60"
            >
              Rejoindre la communauté sur Discord <ExternalLink className="h-4 w-4 opacity-80" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/30 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:border-slate-500"
            >
              Une question ? Contact
            </Link>
          </div>
        </div>
      </section>

      {/* CHARTE COURTE */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:pb-12">
        <h2 className="text-xl font-bold">Charte (version courte)</h2>
        <p className="mt-2 max-w-3xl text-slate-300">
          L’objectif : apprendre à penser avec l’IA, pas à déléguer son travail.
        </p>

        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/20 p-6 sm:p-8">
          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <span className="font-semibold text-slate-100">1) L’IA aide, elle ne remplace pas.</span>{" "}
              On progresse en comprenant.
            </li>
            <li>
              <span className="font-semibold text-slate-100">2) Aucun devoir “clé en main”.</span>{" "}
              On travaille avec des étapes et des explications.
            </li>
            <li>
              <span className="font-semibold text-slate-100">3) Respect du cadre scolaire.</span>{" "}
              Le rôle de l’enseignant reste central.
            </li>
            <li>
              <span className="font-semibold text-slate-100">4) Bienveillance.</span>{" "}
              On s’entraide sans juger.
            </li>
            <li>
              <span className="font-semibold text-slate-100">5) Transparence & esprit critique.</span>{" "}
              On discute des limites et des erreurs de l’IA.
            </li>
          </ul>

          <div className="mt-6 text-xs text-slate-400 leading-relaxed">
            EleveAI est une communauté éducative indépendante. Elle utilise des outils d’IA (dont ChatGPT)
            à des fins pédagogiques, sans affiliation ni validation par OpenAI.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <h2 className="text-xl font-bold">FAQ</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <MiniFaq
            q="Je suis parent : est-ce que je suis légitime ici ?"
            a={
              <>
                Oui. L’objectif est justement de{" "}
                <span className="text-slate-100 font-semibold">comprendre</span> et
                d’installer un cadre simple à la maison.
              </>
            }
          />
          <MiniFaq
            q="Je suis professeur : est-ce que c’est compatible avec le cadre scolaire ?"
            a={
              <>
                Oui : la communauté EleveAI est construite autour d’une règle :{" "}
                <span className="text-slate-100 font-semibold">IA autorisée mais encadrée</span>.
                Pas de “fait à la place”, mais des méthodes, des traces et de l’esprit critique.
              </>
            }
          />
          <MiniFaq
            q="Je suis élève : est-ce que vous pouvez faire mon devoir ?"
            a={
              <>
                Non. En revanche, on peut t’aider à{" "}
                <span className="text-slate-100 font-semibold">comprendre</span>,{" "}
                <span className="text-slate-100 font-semibold">justifier</span> et{" "}
                <span className="text-slate-100 font-semibold">corriger</span>, étape par étape.
              </>
            }
          />
          <MiniFaq
            q="Le serveur est calme au début : c’est normal ?"
            a={
              <>
                Oui. EleveAI grandit doucement :{" "}
                <span className="text-slate-100 font-semibold">qualité</span> plutôt que quantité.
              </>
            }
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/15 hover:border-emerald-400/60"
          >
            Rejoindre la communauté sur Discord <ExternalLink className="h-4 w-4 opacity-80" />
          </a>
          <Link
            href="/atelier-IA"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/30 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:border-slate-500"
          >
            Découvrir Atelier-IA
          </Link>
        </div>
      </section>
    </main>
  );
}
