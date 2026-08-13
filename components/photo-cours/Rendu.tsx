"use client";

// components/photo-cours/Rendu.tsx
//
// Le document produit, rendu LISIBLE — « comme un epub » (Frédéric, 13/08).
//
// ⚠️ IL S'AFFICHAIT EN TEXTE BRUT, avec les `##` et les `**` visibles. Le
// modèle rend du Markdown — on lui demande explicitement des titres et des
// listes — et un <pre> les montrait tels quels. Une série d'exercices y
// ressemblait à un fichier de configuration.
//
// ⭐ CE QUI FAIT LA PAGE DE LIVRE, et ce n'est pas une question de goût :
//   — UNE COLONNE ÉTROITE (~65 caractères). C'est la mesure des livres depuis
//     cinq siècles : au-delà, l'œil rate la ligne suivante en revenant à la
//     marge, et on relit deux fois la même. Un document plein écran sur un
//     ordinateur de 27 pouces est illisible, quelle que soit la police.
//   — UNE SERIF pour le corps. Le site est en sans-serif, et il a raison :
//     c'est de l'interface, on la BALAIE. Ici on LIT, parfois vingt minutes —
//     les empattements guident la ligne.
//   — DE L'INTERLIGNE. 1,75 : ce qu'on donne à un texte suivi, pas à un
//     bouton.
//   — PAS D'ASCENSEUR INTERNE. Le document coule dans la page. Une boîte de
//     32rem avec sa barre de défilement, c'est un aperçu ; un livre se fait
//     dérouler d'un seul geste, et s'imprime.
//
// ⛔ ON NE RÉUTILISE PAS `MarkdownMath` : il ne stylise que les paragraphes.
// Sous le preflight de Tailwind, un <h2> a la taille d'un <p> et un <ul> n'a
// pas de puces — le document sortait donc à plat, ce qui est à peine mieux que
// les astérisques. Le toucher pour cette page-ci, c'est risquer de déplacer
// tout ce qui l'utilise déjà ailleurs.
//
// ⚠️ Pas de KaTeX ici : les prompts interdisent le LaTeX (« 3/4 », « x^2 »),
// et la sortie passe de toute façon par nettoyerLatex() côté serveur.

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Rendu({ children }: { children: string }) {
  return (
    <div
      // `bg-[#fdfcfa]` : un blanc à peine cassé. Le blanc pur d'un écran
      // fatigue sur un texte long — c'est la seule chose que le papier fait
      // mieux, et elle ne coûte rien à imiter.
      className="rounded-lg border border-slate-200 bg-[#fdfcfa] px-5 py-8 sm:px-10 sm:py-12"
    >
      <article className="mx-auto max-w-[65ch] font-serif text-[15px] leading-[1.75] text-slate-800 sm:text-base">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Le modèle ouvre parfois sur un h1, parfois sur un h2 : les deux
            // premiers niveaux se ressemblent donc volontairement, sinon le
            // même document change d'allure d'une fois sur l'autre.
            h1: ({ children }) => (
              <h2 className="mb-3 mt-8 text-xl font-bold tracking-tight text-slate-900 first:mt-0">
                {children}
              </h2>
            ),
            h2: ({ children }) => (
              <h2 className="mb-3 mt-8 text-xl font-bold tracking-tight text-slate-900 first:mt-0">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-2 mt-6 text-base font-bold text-slate-900 first:mt-0">
                {children}
              </h3>
            ),
            p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
            ul: ({ children }) => (
              <ul className="mb-4 list-disc space-y-2 pl-6 marker:text-slate-400">
                {children}
              </ul>
            ),
            // `space-y-3` sur les listes numérotées : ce sont les exercices et
            // les questions, on doit pouvoir en isoler un du regard.
            ol: ({ children }) => (
              <ol className="mb-4 list-decimal space-y-3 pl-6 marker:font-semibold marker:text-slate-500">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="pl-1">{children}</li>,
            strong: ({ children }) => (
              <strong className="font-semibold text-slate-900">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            // Le modèle sépare souvent les exercices de leur corrigé par un
            // trait. On lui donne de l'air : c'est une respiration, pas un
            // filet de tableau.
            hr: () => <hr className="my-8 border-slate-200" />,
            blockquote: ({ children }) => (
              <blockquote className="my-4 border-l-2 border-slate-300 pl-4 italic text-slate-600">
                {children}
              </blockquote>
            ),
            // Les formules restent en sans-serif : « 3/4 » et « x^2 » se
            // lisent mieux sans empattements, et ça les détache du texte.
            code: ({ children }) => (
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-sans text-[0.9em] text-slate-900">
                {children}
              </code>
            ),
            // Les tableaux servent aux barèmes et aux corrigés. `overflow-x`
            // sur le conteneur : sur téléphone, un tableau à quatre colonnes
            // déborde et pousserait toute la page de côté.
            table: ({ children }) => (
              <div className="my-5 overflow-x-auto">
                <table className="w-full border-collapse text-left font-sans text-sm">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border-b border-slate-300 pb-2 pr-4 font-semibold text-slate-900">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border-b border-slate-100 py-2 pr-4 align-top">
                {children}
              </td>
            ),
          }}
        >
          {children}
        </ReactMarkdown>
      </article>
    </div>
  );
}
