"use client";

import Link from "next/link";

import { VENTE } from "@/lib/legal/editeur";
import { PRIX_ANNUEL, montant } from "@/lib/tarifs";

// ─────────────────────────────────────────────────────────────────────────────
// LA FENÊTRE DU PARENT, REFAITE LE 21/08/2026.
//
// Ce qu'elle disait avant : « une plateforme de soutien en maths pour les
// collégiens et lycéens, du CM1 au Bac Spé ». C'était vrai il y a des mois —
// il y a désormais cinq matières et ça commence au CP. Elle envoyait aussi le
// parent vers `/dashboard-eleve`, qui est le tableau de bord de l'ENFANT,
// derrière une connexion élève ; et elle s'organisait autour du code
// établissement, le canal qui n'existe pas cette année.
//
// ⚠️ ELLE NE REFAIT PAS `/parents`. Les deux pages sortaient côte à côte dans
// les résultats de recherche avec des descriptions qui se ressemblaient — c'est
// ce doublon qu'on est en train de défaire. Le partage est net et il faut le
// tenir :
//   `/parents`        → est-ce sérieux, est-ce sans danger pour mon enfant
//   `/espace-parents` → qu'est-ce qu'il y fait, et qu'est-ce que j'en vois
// Toutes les questions de confiance renvoient vers l'autre page, elles ne se
// recopient pas ici.
//
// ⛔ ET ELLE NE PROMET PAS CE QUI N'EXISTE PAS. La vue du parent est la seule
// chose que vend l'abonnement famille, et elle reste à construire : le bloc qui
// la décrit le dit, et le bouton lit `VENTE.ouverte` comme celui des tarifs.
// ─────────────────────────────────────────────────────────────────────────────

/** Les quatre choses qu'un parent retient. Forme reprise d'IXL : un visuel, un
 *  titre court, une ligne — jamais un paragraphe. */
const avantages = [
  {
    emoji: "🧠",
    titre: "Cinq coachs, du CP à la Terminale",
    texte: "Maths, français, anglais, espagnol et IA. Un seul endroit, toutes les années.",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    emoji: "✅",
    titre: "Chaque exercice est corrigé",
    texte: "Et expliqué. Votre enfant ne reste jamais bloqué devant une réponse fausse.",
    gradient: "from-emerald-400 to-green-500",
  },
  {
    emoji: "🔥",
    titre: "Un rituel chaque jour",
    texte: "Dictée, calcul rapide, défi du jour. Cinq minutes qui font la régularité.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    emoji: "💾",
    titre: "Rien ne se perd",
    texte: "Ses résultats sont gardés, notion par notion, depuis le premier jour.",
    gradient: "from-violet-400 to-purple-500",
  },
];

/** Ce que l'enfant peut faire — gratuitement, sans compte pour l'essentiel. */
const outils = [
  { emoji: "🧠", titre: "Coach Maths", texte: "Notion par notion, du CP à la Terminale", href: "/coach-ia/maths" },
  { emoji: "📖", titre: "Coach Français", texte: "Sons, grammaire, conjugaison", href: "/coach-ia/francais" },
  { emoji: "🇬🇧", titre: "English Maths", texte: "A1 → B2, avec l'audio", href: "/coach-ia/english-maths" },
  { emoji: "🛤️", titre: "Parcours", texte: "Un bilan : maîtrisé, à revoir, fragile", href: "/parcours" },
  { emoji: "⚡", titre: "Calcul rapide", texte: "Les automatismes en 5 minutes", href: "/calcul-rapide" },
  { emoji: "✍️", titre: "Dictée du jour", texte: "Une dictée courte, corrigée", href: "/dictee-du-jour" },
  { emoji: "🎯", titre: "Défis du jour", texte: "Des problèmes ancrés à La Réunion", href: "/defis-du-jour" },
  { emoji: "☀️", titre: "Cahiers de vacances", texte: "14 cahiers, à imprimer", href: "/cahier-vacances" },
  { emoji: "📄", titre: "Fiches de cours", texte: "À lire ou à imprimer", href: "/fiches-cours/maths" },
];

/** Ce que l'abonnement ouvre — et rien d'autre. */
const fenetre = [
  "Son bulletin, mis à jour tout seul à chaque exercice",
  "Ce qu'il a travaillé cette semaine, et ce qui coince",
  "Son historique depuis le début, sans rien à saisir",
  "Ses séries de rituels : la régularité se voit d'un coup d'œil",
];

export default function EspaceParentsClient() {
  const venteOuverte = VENTE.ouverte;

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-950">
      {/* ── FOND ────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ep-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="50%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#FFFBEB" />
            </linearGradient>
            <radialGradient id="ep-g1" cx="10%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#86EFAC" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ep-g2" cx="88%" cy="18%" r="50%">
              <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ep-g3" cx="50%" cy="88%" r="55%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
            <filter id="ep-blur"><feGaussianBlur stdDeviation="28" /></filter>
          </defs>

          <rect width="1440" height="1000" fill="url(#ep-bg)" />
          <rect width="1440" height="1000" fill="url(#ep-g1)" />
          <rect width="1440" height="1000" fill="url(#ep-g2)" />
          <rect width="1440" height="1000" fill="url(#ep-g3)" />

          <circle cx="140" cy="160" r="130" fill="#4ADE80" opacity="0.18" filter="url(#ep-blur)" />
          <circle cx="1300" cy="150" r="150" fill="#38BDF8" opacity="0.18" filter="url(#ep-blur)" />
          <circle cx="720" cy="840" r="190" fill="#FCD34D" opacity="0.14" filter="url(#ep-blur)" />
          <circle cx="300" cy="680" r="100" fill="#C084FC" opacity="0.16" filter="url(#ep-blur)" />
          <circle cx="1150" cy="620" r="120" fill="#F9A8D4" opacity="0.15" filter="url(#ep-blur)" />

          <polygon
            points="1380,70 1390,100 1420,100 1396,118 1405,148 1380,130 1355,148 1364,118 1340,100 1370,100"
            fill="#FDE68A"
            opacity="0.5"
          />
          <polygon
            points="70,580 80,610 110,610 86,628 95,658 70,640 45,658 54,628 30,610 60,610"
            fill="#86EFAC"
            opacity="0.45"
          />
          <circle cx="60" cy="320" r="14" fill="#93C5FD" opacity="0.55" />
          <circle cx="1390" cy="400" r="16" fill="#F9A8D4" opacity="0.55" />
          <rect
            x="1220"
            y="490"
            width="26"
            height="26"
            rx="6"
            fill="#86EFAC"
            opacity="0.4"
            transform="rotate(20,1233,503)"
          />

          <g opacity="0.1" fill="#1E40AF" fontFamily="serif" fontSize="50" fontWeight="900">
            <text x="110" y="270">+</text>
            <text x="1310" y="290">÷</text>
            <text x="640" y="940">×</text>
            <text x="1080" y="200">π</text>
          </g>

          <path
            d="M0 870 C240 820 480 870 720 840 C960 810 1200 860 1440 830 L1440 1000 L0 1000 Z"
            fill="white"
            opacity="0.55"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-10">
        {/* ── HERO ───────────────────────────────────────────────────── */}
        <section className="rounded-[2rem] border border-white bg-white/85 p-8 text-center shadow-xl ring-1 ring-sky-100 backdrop-blur">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow">
            👨‍👩‍👧 Espace parents
          </div>

          <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Votre enfant apprend.
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              Vous le voyez avancer.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-relaxed text-slate-600">
            Cinq coachs, des exercices corrigés, un rituel chaque jour — du CP à la
            Terminale, et gratuits. Vous, vous suivez ce qu&apos;il travaille et ce qui
            coince.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/coach-ia/maths"
              className="rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5"
            >
              Essayer avec votre enfant
            </Link>
            <Link
              href="/parents"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Est-ce sans danger&nbsp;?
            </Link>
          </div>
        </section>

        {/* ── LES QUATRE AVANTAGES ───────────────────────────────────── */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-black text-slate-950 sm:text-3xl">
            Un accompagnement pensé pour votre enfant
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {avantages.map((a) => (
              <div
                key={a.titre}
                className="rounded-[1.75rem] border border-white bg-white/90 p-5 text-center shadow-lg backdrop-blur transition hover:-translate-y-1"
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${a.gradient} text-3xl shadow-md`}
                >
                  {a.emoji}
                </div>
                <h3 className="mt-3 text-base font-black text-slate-950">{a.titre}</h3>
                <p className="mt-1 text-sm font-bold leading-relaxed text-slate-600">{a.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CE QU'IL PEUT FAIRE ────────────────────────────────────── */}
        <section>
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-2 text-xs font-black uppercase tracking-wide text-white shadow">
              🎁 Gratuit
            </span>
            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
              Tout ce que votre enfant peut faire
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-bold text-slate-600">
              Sans limite de temps, sans publicité — et l&apos;essentiel sans même créer de
              compte.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {outils.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className="flex items-start gap-3 rounded-2xl border border-white bg-white/90 p-4 shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="text-2xl">{o.emoji}</span>
                <span>
                  <span className="block text-sm font-black text-slate-950">{o.titre}</span>
                  <span className="mt-0.5 block text-xs font-bold text-slate-500">{o.texte}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── LA FENÊTRE DU PARENT ───────────────────────────────────── */}
        <section className="rounded-[2rem] border border-white bg-white/90 p-8 shadow-2xl ring-4 ring-emerald-100 backdrop-blur">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow">
                🏠 Pour vous
              </span>

              <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                Et vous, vous voyez où il en est
              </h2>

              <p className="mt-3 text-base font-bold leading-relaxed text-slate-700">
                Tout ce qui est au-dessus reste gratuit, et votre enfant garde ses
                résultats.
                <br />
                <strong className="text-slate-950">
                  Ce qui se paie, c&apos;est que ça se souvienne de votre enfant.
                </strong>
              </p>

              <p className="mt-4">
                <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-4xl font-black text-transparent">
                  {montant(PRIX_ANNUEL)}
                </span>{" "}
                {/* ⛔ « PAR AN » SEUL ÉTAIT INSUFFISANT DEPUIS LE 01/09 :
                    l'abonnement annuel couvre l'ANNÉE SCOLAIRE, pas douze mois
                    glissants, et c'est une mention obligatoire. Elle se colle au
                    prix, elle ne se renvoie pas aux CGV. */}
                <span className="text-lg font-black text-slate-900">
                  pour l&apos;année scolaire
                </span>
              </p>
              <p className="mt-1 text-sm font-black text-emerald-700">
                Une adresse courriel, tous les enfants de la maison
              </p>

              {venteOuverte ? (
                <Link
                  href="/tarifs#famille"
                  className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 px-8 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  S&apos;abonner — {montant(PRIX_ANNUEL)} pour l&apos;année
                </Link>
              ) : (
                <>
                  <Link
                    href="/tarifs#famille"
                    className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 px-8 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5"
                  >
                    Voir l&apos;offre famille
                  </Link>
                  <p className="mt-3 text-xs font-bold text-slate-500">
                    Cette vue se construit en ce moment. Le prix ci-dessus est ferme, et
                    rien n&apos;est encaissé tant qu&apos;elle n&apos;est pas prête.
                  </p>
                </>
              )}
            </div>

            <ul className="space-y-3 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 p-6 ring-1 ring-emerald-100">
              {fenetre.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                  <span className="mt-0.5 text-lg text-emerald-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── L'ENFANT NE PAIE JAMAIS ──────────────────────────────────
            ⛔ CETTE SECTION S'APPELAIT « SI L'ÉCOLE PAIE » et disait « si le
            collège de votre enfant participe, vous ne payez rien », en invitant
            le parent à en parler « au chef d'établissement ». Deux modèles morts
            dans un seul encadré : le canal B2B, INTERDIT depuis le 31/08
            (contractuel en CDI), et l'échelle des payeurs — « deux fois moins
            cher pour une classe entière » — supprimée le 01/09. Aucun collège ne
            participe et aucun ne le peut ; la phrase envoyait le parent demander
            un code que personne ne distribue.
            ⭐ CE QUI LA REMPLACE EST PLUS FORT QU'ELLE : l'enfant n'a jamais eu
            besoin que quiconque paie. C'est vrai, c'est vérifiable en un clic,
            et aucun concurrent ne peut l'écrire. */}
        <section className="rounded-[2rem] border border-white bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-8 text-center shadow-xl ring-1 ring-sky-100">
          <p className="text-4xl">🎒</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Votre enfant ne paie jamais
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-bold text-slate-600">
            Le coach, les exercices, les parcours, les cahiers et les évaluations
            lui sont ouverts sans compte et sans limite de temps. Ce que
            l&apos;abonnement ouvre, c&apos;est votre vue à vous. Et si vous
            enseignez, votre compte à vous ne se paie pas — à titre personnel,
            pas pour les familles de vos élèves.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/signin?mode=eleve"
              className="rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5"
            >
              Se connecter avec un code
            </Link>
            {/* ⛔ CE LIEN POINTAIT VERS `/tarifs#classe`, UNE ANCRE QUI
                N'EXISTE PLUS depuis le 01/09/2026 — le tarif classe est
                supprimé. Un lien vers une ancre morte ne casse rien de visible :
                il ouvre la page en haut, et personne ne s'aperçoit qu'on a perdu
                le lecteur en route. C'est le vérificateur de tarifs qui l'a
                trouvé, sur le LIBELLÉ et non sur l'ancre.
                ⚠️⚠️ ET LE REMPLAÇANT ÉTAIT MORT AUSSI : `#enseignant` n'existe
                pas davantage. `/tarifs` ne porte plus qu'UN seul `id`, et c'est
                `#famille` (`TarifsClient.tsx:442`) — vérifié le 01/09 au soir.
                Corriger une ancre morte par une autre ancre morte ne se voit
                pas : les deux ouvrent la page en haut, exactement pareil. ⛔ Ne
                pas remettre d'ancre ici sans avoir grepé `id="` dans
                `app/tarifs/`. */}
            <Link
              href="/tarifs"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Si vous enseignez
            </Link>
            <Link
              href="/faq/faq-parents"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Questions des parents
            </Link>
          </div>
        </section>

        {/* ── SIGNATURE ──────────────────────────────────────────────── */}
        {/* Le nom est porté partout — les 14 cahiers, le pied de page, les
            tarifs. Il n'y a aucune raison qu'il manque sur la page qui parle
            directement aux parents. */}
        <p className="text-center text-base font-black text-slate-700">
          Conçu par Frédéric Lacoste, enseignant à La Réunion, pour ses élèves — et pour
          vous.
        </p>
      </div>
    </main>
  );
}
