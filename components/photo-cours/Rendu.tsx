"use client";

// components/photo-cours/Rendu.tsx
//
// Le document produit, rendu lisible.
//
// ⚠️ IL S'AFFICHAIT EN TEXTE BRUT, avec les `##` et les `**` visibles. Le
// modèle rend du Markdown — on lui demande explicitement des titres et des
// listes — et un <pre> les montrait tels quels. Une série d'exercices y
// ressemblait à un fichier de configuration.
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
    <div className="max-h-[32rem] overflow-auto rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Le modèle ouvre parfois sur un h1, parfois sur un h2 : les deux
          // premiers niveaux se ressemblent donc volontairement, sinon le même
          // document change d'allure d'une fois sur l'autre.
          h1: ({ children }) => (
            <h2 className="mb-2 mt-4 border-b border-slate-200 pb-1 text-base font-bold text-slate-900 first:mt-0">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="mb-2 mt-4 border-b border-slate-200 pb-1 text-base font-bold text-slate-900 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-1 mt-3 text-sm font-bold text-slate-800 first:mt-0">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-2 list-disc space-y-1 pl-5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 list-decimal space-y-1 pl-5">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-0.5">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          hr: () => <hr className="my-3 border-slate-200" />,
          blockquote: ({ children }) => (
            <blockquote className="my-2 border-l-2 border-slate-300 pl-3 text-slate-600">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[13px]">
              {children}
            </code>
          ),
          // Les tableaux servent aux barèmes et aux corrigés. `overflow-x` sur
          // le conteneur : sur téléphone, un tableau à quatre colonnes déborde
          // et pousserait toute la page de côté.
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto">
              <table className="w-full border-collapse text-left text-[13px]">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-slate-300 pb-1 pr-3 font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-slate-100 py-1 pr-3 align-top">
              {children}
            </td>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
