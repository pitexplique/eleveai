// /formation-crpe/test — OÙ EN ÊTES-VOUS EN MATHS POUR LE CRPE ? (15/10/2026)
//
// L'épreuve d'entrée du 24 octobre, en ligne et gratuite : pour qui rejoint le
// groupe en cours d'année, et pour qui hésite encore à venir. Les questions et
// la raison d'être du test sont dans `questions.ts`.

import type { Metadata } from "next";
import Link from "next/link";
import TestCrpeClient from "./TestCrpeClient";
import { QUESTIONS, THEMES } from "./questions";

const SITE_URL = "https://www.eleveai.fr";

export const metadata: Metadata = {
  title: "CRPE maths : le test pour savoir où vous en êtes",
  description:
    `${QUESTIONS.length} questions sur les ${THEMES.length} thèmes de l'épreuve de mathématiques du CRPE, ` +
    `corrigées une à une, et un bilan qui dit quels thèmes travailler en priorité. Gratuit, environ 15 minutes.`,
  alternates: { canonical: `${SITE_URL}/formation-crpe/test` },
};

export default function TestCrpePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50/40 to-sky-50 px-4 pb-16 pt-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/formation-crpe"
          className="text-sm font-bold text-slate-500 underline underline-offset-2 hover:text-slate-800"
        >
          ← La préparation du samedi
        </Link>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          Les maths du CRPE&nbsp;: où en êtes-vous&nbsp;?
        </h1>
        <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
          {QUESTIONS.length} questions, deux par thème de l&apos;épreuve, du CM2
          à la troisième. Chacune est corrigée dès que vous répondez. À la fin,
          un bilan vous dit quels samedis comptent le plus pour vous. Gratuit,
          environ 15 minutes, un brouillon à côté.
        </p>
        <div className="mt-8">
          <TestCrpeClient />
        </div>
      </div>
    </main>
  );
}
