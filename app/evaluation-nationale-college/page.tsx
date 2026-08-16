import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

// La palette vit dans `_composants/couleurs.ts` : le hub et les quatre
// épreuves y puisent la MÊME couleur par slug, sinon une carte safran
// ouvrirait une épreuve boucan.
import { BOUCAN, CANNE, FLAMBOYANT, FOND, SAFRAN } from "./_composants/couleurs";

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
// ⭐ LES QUATRE ÉPREUVES SONT DÉSORMAIS À 50 MINUTES, la durée officielle de
// passation, et toutes reprennent le volume de leur sujet : 6ᵉ maths 62
// questions (11/08), 4ᵉ maths 62 (15/08), 6ᵉ français 60 et 4ᵉ français 67
// (16/08). L'arbitrage du 01/08 — une minute par question sur un échantillon
// — n'a plus cours nulle part : il tenait la cadence faute de connaître les
// effectifs, nous les avons tous.
const EPREUVES = [
  {
    niveau: "6ᵉ",
    matiere: "Français",
    slug: "6e-francais",
    minutes: 50,
    emoji: "📖",
    accent: BOUCAN,
    // LES SIX DOMAINES DU BILAN OFFICIEL, dans son ordre. La fluence y figure
    // parce qu'elle EST un domaine de l'épreuve — la page de l'épreuve dit
    // ensuite, en clair, que c'est le seul que nous ne pouvons pas évaluer.
    teste: [
      "Compréhension de l'écrit",
      "Compréhension de l'oral",
      "Lexique",
      "Étude de la langue — Grammaire",
      "Étude de la langue — Orthographe",
      "Fluence",
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
    minutes: 50,
    emoji: "🔢",
    accent: FLAMBOYANT,
    // LES INTITULÉS DU SUJET OFFICIEL, dans son ordre. « Résoudre un problème »
    // a quitté la liste des domaines pour rejoindre les tests spécifiques :
    // ce n'en a jamais été un.
    teste: [
      "L'espace et la géométrie",
      "Les grandeurs et les mesures",
      "Les nombres et le calcul",
      "Automatismes et résolution de problèmes",
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
    minutes: 50,
    emoji: "✍️",
    accent: CANNE,
    // LES SIX DOMAINES DU BILAN OFFICIEL, comme en 6ᵉ. La fluence y figure
    // parce qu'elle EST un domaine de l'épreuve — la page de l'épreuve dit
    // ensuite, en clair, que c'est le seul que nous ne pouvons pas évaluer.
    teste: [
      "Compréhension de l'écrit",
      "Compréhension de l'oral",
      "Lexique",
      "Étude de la langue — Grammaire",
      "Étude de la langue — Orthographe",
      "Fluence",
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
    minutes: 50,
    emoji: "📐",
    accent: SAFRAN,
    // LES QUATRE DOMAINES, PUIS LES DEUX TESTS, comme en 6ᵉ : depuis le 15/08
    // l'épreuve reprend le volume du sujet officiel, et le bilan rend donc
    // les automatismes et la résolution de problèmes à part.
    // LES INTITULÉS DU BILAN OFFICIEL, mot pour mot — ce sont ceux que le
    // professeur retrouvera sur ses résultats du jour J.
    teste: [
      "Nombres et calculs",
      "Grandeurs et mesures",
      "Espace et géométrie",
      "Organisation et gestion de données",
      "Automatismes et résolution de problèmes",
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
          className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/60 shadow-sm ring-1 ring-[#1d1c16]/10 transition hover:bg-white hover:text-[#0e7490]"
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

        {/* POUR LA DIRECTION ET LES PROFESSEURS (11/08/2026, demande de
            M. Pelka : « pour une classe et pour un niveau, les compétences
            réussies et celles qui posent des difficultés »).
            ⚠️ Le lien est montré à TOUT LE MONDE, et c'est assumé : la page
            elle-même vérifie la session et le rôle, et un élève qui l'ouvre
            voit un écran de connexion, pas des données. Le cacher derrière
            une condition côté client ne protégerait rien de plus et rendrait
            la page introuvable pour ceux à qui elle est destinée. */}
        <section className="mt-8 rounded-2xl border-2 border-[#1d1c16]/15 bg-white/80 p-5 sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
            Pour la direction et les professeurs
          </p>
          <Link href="/evaluation-nationale-college/ma-classe" className="group mt-2 block">
            <span className="block font-serif text-lg font-black leading-snug group-hover:underline">
              Voir où en est votre classe, avant le jour J
            </span>
            <span className="mt-1 block max-w-2xl text-sm font-medium leading-6 text-[#1d1c16]/75">
              Vos élèves passent l&apos;épreuve blanche, et vous les retrouvez
              rangés dans les trois groupes de l&apos;institution — à besoins,
              fragile, satisfaisant — domaine par domaine. Les mots mêmes du
              bilan officiel, mais des semaines avant lui. Ni note, ni
              classement.
            </span>
            <span
              className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black text-white transition group-hover:brightness-110"
              style={{ backgroundColor: "#1d1c16" }}
            >
              Ouvrir la vue de classe <span aria-hidden>→</span>
            </span>
          </Link>
        </section>

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

        {/* ⚠️ CE PARAGRAPHE MENTAIT (corrigé le 09/08). Écrit le 01/08 quand
            aucune épreuve n'existait, il annonçait encore « les quatre épreuves
            blanches sont en construction » — juste sous quatre cartes qui
            affichent « L'épreuve blanche est prête ». Deux points relus dans le
            code avant de réécrire, parce que la phrase se trompait deux fois :
            il n'y a AUCUN bouton retour (`validerEtContinuer` n'incrémente
            que), et rien n'est corrigé « au fur et à mesure » — `construireBilan`
            ne tourne qu'à l'étape `bilan`, thème par thème et micro par micro. */}
        <p className="mt-8 rounded-2xl bg-white/60 p-4 text-xs font-medium italic leading-5 text-[#1d1c16]/70 ring-1 ring-[#1d1c16]/10">
          Les quatre épreuves blanches — français et maths, en 6ᵉ et en 4ᵉ —
          sont en ligne : même durée, même forme, une question à la fois et pas
          de retour en arrière. La correction arrive à la fin, compétence par
          compétence, sans note. Les liens sous chaque épreuve travaillent
          exactement les mêmes compétences, sans chrono.
        </p>
      </div>
    </main>
  );
}
