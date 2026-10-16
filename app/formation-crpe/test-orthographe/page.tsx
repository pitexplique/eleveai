// /formation-crpe/test-orthographe — L'ORTHOGRAPHE DU CRPE (16/10/2026).
//
// Frédéric : « l'orthographe sera prise en compte ainsi que la rédaction, on
// peut déjà faire un test d'orthographe ». Le même moteur que le test de
// maths ; les questions et leur raison d'être sont dans ../test/orthographe.ts.
// (La rédaction viendra dans un second temps.)

import type { Metadata } from "next";
import Link from "next/link";
import TestCrpeClient from "../test/TestCrpeClient";
import { QUESTIONS_ORTHO, THEMES_ORTHO } from "../test/orthographe";

const SITE_URL = "https://www.eleveai.fr";

export const metadata: Metadata = {
  title: "CRPE : le test d'orthographe, gratuit",
  description:
    `${QUESTIONS_ORTHO.length} questions sur ${THEMES_ORTHO.length} thèmes (homophones, participe passé, ` +
    `conjugaison, accords, mots des maths…), corrigées une à une. Au CRPE, l'orthographe compte dans la note, maths comprises.`,
  alternates: { canonical: `${SITE_URL}/formation-crpe/test-orthographe` },
};

export default function TestOrthographeCrpePage() {
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
          L&apos;orthographe du CRPE&nbsp;: où en êtes-vous&nbsp;?
        </h1>
        <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
          Au CRPE, la qualité de la langue compte dans la note des épreuves
          écrites, <strong className="text-slate-800">maths comprises</strong>.{" "}
          {QUESTIONS_ORTHO.length} questions, des mots des maths
          (hypoténuse, parallèle…) aux participes passés, chacune corrigée dès
          que vous répondez. Gratuit, environ 10 minutes.
        </p>
        <div className="mt-8">
          <TestCrpeClient test="orthographe" />
        </div>
      </div>
    </main>
  );
}
