import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title:
    "Les évaluations nationales du collège — 6e et 4e, français et maths | EleveAI",
  description:
    "En 6e et en 4e, à la rentrée, tout le monde passe deux évaluations nationales : français et mathématiques. Ce qu'elles testent, épreuve par épreuve, et de quoi s'entraîner sur les mêmes compétences — gratuit, sans publicité.",
  keywords: [
    "évaluations nationales 6e",
    "évaluations nationales 4e",
    "évaluation nationale français",
    "évaluation nationale mathématiques",
    "s'entraîner évaluation nationale collège",
    "évaluation de rentrée sixième",
    "évaluation de rentrée quatrième",
  ],
  alternates: {
    canonical: "https://www.eleveai.fr/evaluation-nationale-college",
  },
};

// ─── LES COULEURS ─────────────────────────────────────────────────────────────
// LE PAPIER JOURNAL S'EN VA (Frédéric, 09/08 : « cette page demande un fond
// fun »). Le crème `#f6f1e4` et ses filets noirs venaient de l'accueil-journal,
// qui n'est plus rendu depuis le 06/08 : cette page portait donc les habits
// d'un journal qui n'existe plus, pour parler à des 6ᵉ et des 4ᵉ la semaine de
// la rentrée. Un fond d'annonce officielle, sur une page dont tout le propos
// est « ce n'est pas un examen, il n'y a pas de note ».
//
// On reprend la palette de l'île déjà tranchée le 02/08 — SES mots : boucan
// canot, flamboyant, canne, safran péi — et sa règle : la couleur PORTE, elle
// ne décore pas. Ici elle porte l'épreuve : une couleur par carte, jamais deux
// voisines identiques. L'encre ne bouge pas.
const CIEL = "#e7f4f7"; // le boucan canot dilué de l'accueil, encore éclairci
const INK = "#1d1c16";

const BOUCAN = "#0e7490";
const FLAMBOYANT = "#bf3b1e";
const CANNE = "#3f6b0c";
const SAFRAN = "#a34c07";

// Le fond : quatre lavis de l'île très dilués + le quadrillage d'un cahier
// par-dessus. Aucune image, aucun octet téléchargé — que du CSS, sur une page
// qui doit s'ouvrir vite en septembre. ⚠️ L'ORDRE COMPTE : la première couche
// est celle du DESSUS (le quadrillage), et `backgroundSize` se lit dans le
// même ordre.
const FOND = {
  backgroundColor: CIEL,
  backgroundImage: [
    "linear-gradient(rgba(29,28,22,0.045) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(29,28,22,0.045) 1px, transparent 1px)",
    "radial-gradient(58rem 40rem at 88% -8%, rgba(163,76,7,0.20), transparent 62%)",
    "radial-gradient(52rem 38rem at -8% 14%, rgba(14,116,144,0.24), transparent 62%)",
    "radial-gradient(46rem 34rem at 16% 108%, rgba(63,107,12,0.18), transparent 62%)",
    "radial-gradient(42rem 32rem at 104% 92%, rgba(191,59,30,0.16), transparent 62%)",
  ].join(", "),
  backgroundSize: "30px 30px, 30px 30px, auto, auto, auto, auto",
  color: INK,
};

// LE HUB D'ABORD, LES ÉPREUVES ENSUITE (Frédéric, 01/08) : on branche la
// rubrique maintenant — deux niveaux, deux matières — et les quatre épreuves
// blanches viendront s'y ranger sans retoucher l'accueil. En attendant, AUCUNE
// carte ne mène nulle part : chacune envoie vers le coach du niveau et vers le
// guide de survie correspondant, qui existent tous les deux. Règle du journal :
// on ne promet que ce qui existe, et on ne laisse jamais un lecteur dans le vide.
//
// ⚠️ `minutes` EST RECOPIÉ À LA MAIN de `dureeSecondes` (lib/eval-nationale/
// <slug>.ts). Importer les configs ici embarquerait les quatre banques dans le
// bundle de ce hub, alors que chaque épreuve n'emporte que la sienne. Une
// minute par question depuis l'arbitrage du 01/08 : 20 en maths, 25 en
// français.
const EPREUVES = [
  {
    niveau: "6ᵉ",
    matiere: "Français",
    slug: "6e-francais",
    minutes: 25,
    emoji: "📖",
    accent: BOUCAN,
    teste: [
      "Comprendre un texte qu'on lit",
      "Comprendre un texte qu'on écoute",
      "Le vocabulaire et la grammaire",
      "Lire à voix haute, sans buter",
    ],
    // LIVRÉE (01/08) : l'épreuve pioche dans le programme de CM2. La fluence
    // et la compréhension de l'oral n'y sont pas — c'est dit sur la page.
    epreuve: "/evaluation-nationale-college/6e-francais",
    coach: "/coach-ia/francais?classe=6e",
    guide: "/guide-de-survie/francais-6e",
  },
  {
    niveau: "6ᵉ",
    matiere: "Mathématiques",
    slug: "6e-maths",
    minutes: 20,
    emoji: "🔢",
    accent: FLAMBOYANT,
    teste: [
      "Les nombres et le calcul",
      "Les grandeurs et les mesures",
      "L'espace et la géométrie",
      "Résoudre un problème",
    ],
    // LIVRÉE (01/08) : l'épreuve blanche existe pour ce couple niveau/matière.
    epreuve: "/evaluation-nationale-college/6e-maths",
    coach: "/coach-ia/maths?classe=6e",
    guide: "/guide-de-survie/maths-sixieme",
  },
  {
    niveau: "4ᵉ",
    matiere: "Français",
    slug: "4e-francais",
    minutes: 25,
    emoji: "✍️",
    accent: CANNE,
    teste: [
      "Comprendre un texte long",
      "Comprendre un texte qu'on écoute",
      "Le vocabulaire",
      "La grammaire et l'orthographe",
    ],
    // LIVRÉE (01/08) : l'épreuve pioche dans le programme de 5ᵉ.
    epreuve: "/evaluation-nationale-college/4e-francais",
    coach: "/coach-ia/francais?classe=4e",
    guide: "/guide-de-survie/francais-4e",
  },
  {
    niveau: "4ᵉ",
    matiere: "Mathématiques",
    slug: "4e-maths",
    minutes: 20,
    emoji: "📐",
    accent: SAFRAN,
    teste: [
      "Les nombres et les calculs",
      "Lire et organiser des données",
      "Les grandeurs et les mesures",
      "La géométrie",
    ],
    // LIVRÉE (01/08) : l'épreuve pioche dans le programme de 5ᵉ.
    epreuve: "/evaluation-nationale-college/4e-maths",
    coach: "/coach-ia/maths?classe=4e",
    guide: "/guide-de-survie/maths-quatrieme",
  },
];

export default function EvaluationNationaleCollegePage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-8 sm:px-6 lg:px-8" style={FOND}>
      <div className="mx-auto max-w-4xl">
        {/* ⚠️ Le lien disait « ← Le journal ». Le journal n'est plus rendu
            depuis le 06/08 : la route mène bien à l'accueil, mais elle
            annonçait une page qui n'existe plus. */}
        <Link
          href="/accueil"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/60 shadow-sm ring-1 ring-[#1d1c16]/10 transition hover:bg-white hover:text-cyan-800"
        >
          ← L&apos;accueil
        </Link>

        <header className="mt-4 flex items-start gap-4 sm:gap-6">
          <div className="min-w-0 flex-1">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[#a34c07] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#fff6ea]">
              🎓 Les évaluations du collège
            </p>
            {/* Le trait de surligneur passe SOUS les mots, il ne les touche
                pas : le titre reste noir, exactement le même.
                ⚠️ `boxDecorationBreak: clone` n'est pas décoratif : sans lui,
                un titre qui passe à la ligne sur téléphone ne reçoit son trait
                que sur le dernier fragment.
                ⚠️ `text-4xl` sur téléphone coupait le titre en TROIS lignes
                surlignées (Ti Margo prend 51 px de la largeur) : trois traits
                de marqueur empilés, ce n'est plus un accent. */}
            <h1 className="mt-2 font-serif text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              <span
                className="px-1"
                style={{
                  backgroundImage: "linear-gradient(#ffd9a2, #ffd9a2)",
                  backgroundSize: "100% 0.3em",
                  backgroundPosition: "0 88%",
                  backgroundRepeat: "no-repeat",
                  WebkitBoxDecorationBreak: "clone",
                  boxDecorationBreak: "clone",
                }}
              >
                Les évaluations nationales
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-[#1d1c16]/75">
              En 6ᵉ et en 4ᵉ, à la rentrée, tout le monde passe les mêmes deux
              épreuves : français et mathématiques, sur ordinateur. Il n&apos;y a
              pas de note, rien ne va sur le bulletin. Ça sert à ton professeur —
              et à toi — à voir où tu en es.
            </p>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#1d1c16]/75">
              Donc rien à réviser la veille. Mais si tu veux arriver tranquille,
              voilà ce qu&apos;on te demandera, épreuve par épreuve.
            </p>
          </div>

          {/* Ti Margo : la figure d'EleveAI, celle des cahiers et des vidéos.
              Sur une page qui dit « ne t'inquiète pas », un margouillat au
              crayon fait plus que trois adjectifs. Il reste sur téléphone —
              plus petit — parce que c'est là que les élèves arrivent. */}
          <Image
            src="/cahier-vacances/ti-margo.png"
            alt="Ti Margo, le margouillat d'EleveAI, avec son crayon"
            width={1122}
            height={1402}
            sizes="112px"
            className="h-16 w-auto shrink-0 sm:h-28"
          />
        </header>

        {/* LES QUATRE ÉPREUVES */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {EPREUVES.map((e) => (
            <section
              key={e.slug}
              className="flex flex-col overflow-hidden rounded-2xl border-2 bg-white/85 shadow-[0_8px_24px_-12px_rgba(29,28,22,0.45)] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_30px_-14px_rgba(29,28,22,0.5)]"
              style={
                { borderColor: e.accent, "--accent": e.accent } as CSSProperties
              }
            >
              {/* Le bandeau de couleur : c'est lui qui dit de quelle épreuve
                  on parle, avant même de lire. */}
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ backgroundColor: e.accent }}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {e.emoji}
                </span>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white">
                  {e.niveau} · {e.matiere}
                </p>
                <span className="ml-auto rounded-full bg-white/25 px-2 py-0.5 text-[11px] font-black text-white">
                  {e.minutes} min
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h2 className="font-serif text-xl font-black leading-tight">
                  Ce qu&apos;on te demandera
                </h2>
                <ul className="mt-2 space-y-1.5">
                  {e.teste.map((t) => (
                    <li
                      key={t}
                      className="flex gap-2 text-sm font-medium leading-6 text-[#1d1c16]/75"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: e.accent }}
                      />
                      {t}
                    </li>
                  ))}
                </ul>

                {/* L'épreuve blanche quand elle existe, l'entraînement sinon —
                    jamais une carte morte, jamais une promesse en vitrine. */}
                {e.epreuve ? (
                  <>
                    <p
                      className="mt-4 text-[10px] font-black uppercase tracking-[0.16em]"
                      style={{ color: e.accent }}
                    >
                      ● L&apos;épreuve blanche est prête
                    </p>
                    <Link
                      href={e.epreuve}
                      className="mt-1.5 inline-flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-black text-white shadow-sm transition hover:brightness-110"
                      style={{ backgroundColor: e.accent }}
                    >
                      <span>Passer l&apos;épreuve · {e.minutes} min</span>
                      <span aria-hidden>→</span>
                    </Link>
                    <div className="mt-2.5 flex flex-col gap-1">
                      <Link
                        href={e.coach}
                        className="text-sm font-black text-[#1d1c16]/70 hover:text-[color:var(--accent)] hover:underline"
                      >
                        ✏️ Ou t&apos;entraîner sans chrono →
                      </Link>
                      <Link
                        href={e.guide}
                        className="text-sm font-black text-[#1d1c16]/70 hover:text-[color:var(--accent)] hover:underline"
                      >
                        📗 Le guide de survie du niveau →
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <p
                      className="mt-4 text-[10px] font-black uppercase tracking-[0.16em]"
                      style={{ color: e.accent }}
                    >
                      L&apos;épreuve blanche arrive
                    </p>
                    <p className="mt-1 text-xs font-medium leading-5 text-[#1d1c16]/70">
                      En attendant, ce sont exactement les mêmes compétences :
                    </p>
                    <div className="mt-2 flex flex-col gap-1">
                      <Link
                        href={e.coach}
                        className="text-sm font-black text-[#1d1c16]/70 hover:text-[color:var(--accent)] hover:underline"
                      >
                        ✏️ T&apos;entraîner en {e.matiere.toLowerCase()}{" "}
                        {e.niveau} →
                      </Link>
                      <Link
                        href={e.guide}
                        className="text-sm font-black text-[#1d1c16]/70 hover:text-[color:var(--accent)] hover:underline"
                      >
                        📗 Le guide de survie du niveau →
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* PIX N'EST PAS LA MÊME ÉCHÉANCE (info de Frédéric, 01/08) : la
            certification Pix au collège, c'est la 3ᵉ, au printemps — pas la
            6ᵉ ni la 4ᵉ à la rentrée. La ranger avec les évaluations
            nationales brouillait la page comme le dico la brouillait. Elle
            garde sa ligne, mais à part et datée correctement.
            ⚠️ PAS DE DATES EN DUR : le calendrier Pix est publié chaque
            année (2025-2026 : 16 mars → 13 juin pour la 3ᵉ). Écrire ces
            dates-là ici, c'est une page périmée dès la rentrée suivante.
            Le bloc est SOMBRE : quatre cartes claires puis une cinquième
            claire, on ne verrait plus que « c'est autre chose, et plus tard ». */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-[#1d1c16] p-5 text-[#f2efe6] sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8fd3e0]">
            Et plus tard au collège
          </p>
          <Link href="/eval-pix-ia" className="group mt-2 block">
            <span className="block font-serif text-lg font-black leading-snug group-hover:underline">
              En 3ᵉ, au printemps : la certification Pix
            </span>
            <span className="mt-1 block max-w-2xl text-sm font-medium leading-6 text-[#f2efe6]/75">
              Celle-là compte : elle atteste les 16 compétences numériques du
              CRCN, dure 1 h 45 en 32 questions qui s&apos;adaptent à tes
              réponses, et son résultat va au livret scolaire. Notre éval
              blanche te prépare au volet intelligence artificielle.
            </span>
            <span className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#0e7490] px-4 py-2.5 text-sm font-black text-white transition group-hover:brightness-110">
              Passer l&apos;éval blanche IA <span aria-hidden>→</span>
            </span>
          </Link>
        </section>

        {/* CE QUI EST EN CHANTIER — dit en clair plutôt que promis en vitrine. */}
        <p className="mt-8 rounded-2xl bg-white/60 p-4 text-xs font-medium italic leading-5 text-[#1d1c16]/70 ring-1 ring-[#1d1c16]/10">
          Les quatre épreuves blanches — français et maths, en 6ᵉ et en 4ᵉ —
          sont en construction : même durée, même forme, corrigées au fur et à
          mesure. Elles se rangeront ici. En attendant, les liens ci-dessus
          travaillent sur les mêmes compétences.
        </p>
      </div>
    </main>
  );
}
