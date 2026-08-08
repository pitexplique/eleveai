import type { Metadata } from "next";
import Link from "next/link";

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

const PAPER = "#f6f1e4";
const INK = "#1d1c16";

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
    <main
      className="min-h-screen px-4 pb-16 pt-8 sm:px-6 lg:px-8"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      <div className="mx-auto max-w-4xl">
        <Link
          href="/accueil"
          className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55 hover:text-cyan-800"
        >
          ← Le journal
        </Link>

        <header className="mt-3 border-b-4 border-double border-[#1d1c16] pb-5">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-800">
            🎓 Les évaluations du collège
          </p>
          <h1 className="mt-1 font-serif text-4xl font-black leading-none tracking-tight sm:text-5xl">
            Les évaluations nationales
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[#1d1c16]/70">
            En 6ᵉ et en 4ᵉ, à la rentrée, tout le monde passe les mêmes deux
            épreuves : français et mathématiques, sur ordinateur. Il n&apos;y a
            pas de note, rien ne va sur le bulletin. Ça sert à ton professeur —
            et à toi — à voir où tu en es.
          </p>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#1d1c16]/70">
            Donc rien à réviser la veille. Mais si tu veux arriver tranquille,
            voilà ce qu&apos;on te demandera, épreuve par épreuve.
          </p>
        </header>

        {/* LES QUATRE ÉPREUVES */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {EPREUVES.map((e) => (
            <section
              key={e.slug}
              className="flex flex-col border-2 border-[#1d1c16] p-4"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                {e.niveau} · {e.matiere}
              </p>
              <h2 className="mt-1 font-serif text-xl font-black leading-tight">
                Ce qu&apos;on te demandera
              </h2>
              <ul className="mt-2 space-y-1">
                {e.teste.map((t) => (
                  <li
                    key={t}
                    className="border-b border-dotted border-[#1d1c16]/25 pb-1 text-sm font-medium leading-6 text-[#1d1c16]/70"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              {/* L'épreuve blanche quand elle existe, l'entraînement sinon —
                  jamais une carte morte, jamais une promesse en vitrine. */}
              {e.epreuve ? (
                <>
                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-red-800">
                    L&apos;épreuve blanche est prête
                  </p>
                  <Link
                    href={e.epreuve}
                    className="mt-1 inline-flex items-center gap-2 rounded-sm bg-cyan-800 px-4 py-2.5 text-sm font-black text-[#f0fafc] transition hover:bg-[#1d1c16]"
                  >
                    Passer l&apos;épreuve · {e.minutes} min →
                  </Link>
                  <div className="mt-2 flex flex-col gap-1">
                    <Link
                      href={e.coach}
                      className="text-sm font-black text-cyan-800 hover:underline"
                    >
                      ✏️ Ou t&apos;entraîner sans chrono →
                    </Link>
                    <Link
                      href={e.guide}
                      className="text-sm font-black text-cyan-800 hover:underline"
                    >
                      📗 Le guide de survie du niveau →
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-red-800">
                    L&apos;épreuve blanche arrive
                  </p>
                  <p className="mt-1 text-xs font-medium leading-5 text-[#1d1c16]/70">
                    En attendant, ce sont exactement les mêmes compétences :
                  </p>
                  <div className="mt-2 flex flex-col gap-1">
                    <Link
                      href={e.coach}
                      className="text-sm font-black text-cyan-800 hover:underline"
                    >
                      ✏️ T&apos;entraîner en {e.matiere.toLowerCase()} {e.niveau} →
                    </Link>
                    <Link
                      href={e.guide}
                      className="text-sm font-black text-cyan-800 hover:underline"
                    >
                      📗 Le guide de survie du niveau →
                    </Link>
                  </div>
                </>
              )}
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
            dates-là ici, c'est une page périmée dès la rentrée suivante. */}
        <section className="mt-8 border-t-2 border-[#1d1c16] pt-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
            Et plus tard au collège
          </p>
          <Link href="/eval-pix-ia" className="group mt-2 block">
            <span className="block font-serif text-lg font-black leading-snug group-hover:underline">
              En 3ᵉ, au printemps : la certification Pix
            </span>
            <span className="mt-1 block max-w-2xl text-sm font-medium leading-6 text-[#1d1c16]/70">
              Celle-là compte : elle atteste les 16 compétences numériques du
              CRCN, dure 1 h 45 en 32 questions qui s&apos;adaptent à tes
              réponses, et son résultat va au livret scolaire. Notre éval
              blanche te prépare au volet intelligence artificielle.
            </span>
            <span className="mt-1.5 block text-sm font-black text-cyan-800">
              Passer l&apos;éval blanche IA →
            </span>
          </Link>
        </section>

        {/* CE QUI EST EN CHANTIER — dit en clair plutôt que promis en vitrine. */}
        <p className="mt-8 border-t border-[#1d1c16]/25 pt-3 text-xs font-medium italic leading-5 text-[#1d1c16]/70">
          Les quatre épreuves blanches — français et maths, en 6ᵉ et en 4ᵉ —
          sont en construction : même durée, même forme, corrigées au fur et à
          mesure. Elles se rangeront ici. En attendant, les liens ci-dessus
          travaillent sur les mêmes compétences.
        </p>
      </div>
    </main>
  );
}
