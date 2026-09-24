"use client";

// app/automatismes-maths/livret/LivretClient.tsx
//
// ⭐ LE LIVRET PDF DES AUTOMATISMES (24/09/2026). Frédéric : « pdf gratuit ou
// livre sur Amazon ? » → le PDF d'abord, qui se mesure ; Amazon ensuite, si le
// PDF prend.
//
// Une couverture, VINGT séries (une par page imprimée), puis les corrigés.
// Le PDF est celui du navigateur (« Enregistrer au format PDF ») : aucune
// dépendance de plus, et les figures sont les mêmes canvas qu'en ligne.
//
// ⭐ UNE ÉDITION = UNE GRAINE. Les générateurs tirent avec Math.random ; on le
// remplace, le temps du tirage, par un générateur à graine (mulberry32). La
// même édition redonne EXACTEMENT le même livret — on peut donc publier un
// fichier fixe —, et l'édition suivante donne deux cents questions neuves.

import { useEffect, useState } from "react";

import { CanvasRenderer } from "@/lib/canvas";
import { MarkdownMath } from "@/components/MarkdownMath";
import {
  getNiveauAutomatismes,
  tirerSerie,
  type AutoQuestionServie,
} from "@/lib/automatismes";

const NB_SERIES = 20;

function avecGraine<T>(graine: number, tirer: () => T): T {
  const original = Math.random;
  let s = graine >>> 0;
  Math.random = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  try {
    return tirer();
  } finally {
    Math.random = original;
  }
}

const LETTRES = ["A", "B", "C", "D"];

export default function LivretClient({ classe: classeProp }: { classe?: string }) {
  const [classe, setClasse] = useState(classeProp ?? "3e");
  const [edition, setEdition] = useState(1);
  const [series, setSeries] = useState<AutoQuestionServie[][]>([]);

  // Tirage APRÈS le montage : le rendu serveur ne doit pas tirer au hasard.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = classeProp ?? p.get("classe") ?? "3e";
    const e = Math.max(1, Number(p.get("edition")) || 1);
    setClasse(c);
    setEdition(e);
    const niveau = getNiveauAutomatismes(c);
    if (!niveau) return;
    const graine = [...c].reduce((h, ch) => h * 31 + ch.charCodeAt(0), e * 1000003);
    setSeries(avecGraine(graine, () => Array.from({ length: NB_SERIES }, () => tirerSerie(niveau))));
  }, [classeProp]);

  const niveau = getNiveauAutomatismes(classe);
  if (!niveau) {
    return <main className="p-8">Classe inconnue.</main>;
  }

  return (
    <main className="mx-auto max-w-3xl bg-white px-6 py-8 text-slate-900 print:max-w-none print:px-0 print:py-0">
      <style>{`
        @media print {
          @page { size: A4; margin: 14mm; }
          .livret-page { break-before: page; }
          .livret-question { break-inside: avoid; }
          header, footer, nav { display: none !important; }
        }
      `}</style>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200 print:hidden">
        <p className="text-sm font-semibold text-emerald-900">
          Aperçu du livret — {niveau.label}, édition {edition}. Pour le fichier :
          « Enregistrer au format PDF » dans la fenêtre d&apos;impression.
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-black text-white hover:bg-emerald-600"
        >
          🖨️ Enregistrer en PDF
        </button>
      </div>

      {/* COUVERTURE */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center print:min-h-[250mm]">
        {/* ⭐ Frédéric, 24/09/2026 : « eleveai.fr avec ma photo et celle de
            Ti Margo et mon nom ». Même duo que l'en-tête du site, avec le
            « + » (« c'est une collaboration »), et la signature à l'identique
            (voir la note « la signature à répandre »). `<img>` et non
            `next/image` : l'impression en PDF doit les avoir chargées. */}
        <div className="flex items-center gap-3">
          <img
            src="/images/avatar-frederic-visage.webp"
            alt="Frédéric Lacoste"
            width={88}
            height={88}
            className="rounded-full object-cover ring-4 ring-emerald-200"
            style={{ width: 88, height: 88 }}
          />
          <span className="text-3xl font-black text-emerald-700" aria-hidden="true">+</span>
          <img
            src="/cahier-vacances/ti-margo.png"
            alt="Ti Margo"
            width={88}
            height={88}
            className="object-contain"
            style={{ width: 88, height: 88 }}
          />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-700">Frédéric Lacoste, enseignant à La Réunion</p>
        <p className="mt-6 text-lg font-black tracking-wide text-emerald-700">eleveai.fr</p>
        <h1 className="mt-2 text-5xl font-black">Automatismes de maths</h1>
        <p className="mt-2 text-3xl font-black text-emerald-800">{niveau.label}</p>
        <p className="mt-6 max-w-xl text-lg font-semibold text-slate-700">
          {NB_SERIES} séries de {niveau.nbQuestions ?? 10} questions, sans calculatrice, corrigées à la fin.
        </p>
        <p className="mt-2 max-w-xl text-base text-slate-600">{niveau.examen}.</p>
        <p className="mt-10 text-sm text-slate-500">
          Édition {edition} · d&apos;autres séries, toujours nouvelles, sur eleveai.fr/automatismes-maths
        </p>
      </section>

      {series.length === 0 ? <p className="text-center text-slate-500">Préparation du livret…</p> : null}

      {/* LES SÉRIES */}
      {series.map((serie, s) => (
        <section key={s} className="livret-page pt-8">
          <div className="mb-4 flex items-baseline justify-between border-b-2 border-emerald-700 pb-2">
            <h2 className="text-2xl font-black">Série {s + 1}</h2>
            <p className="text-sm font-semibold text-slate-600">
              {niveau.duree} min · sans calculatrice · note : …… / {serie.length}
            </p>
          </div>
          <ol className="space-y-4">
            {serie.map((q, i) => (
              <li key={i} className="livret-question">
                <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                  Question {i + 1} · {q.themeLabel}
                </p>
                <MarkdownMath className="mt-1 whitespace-pre-line text-[15px] leading-relaxed">{q.text}</MarkdownMath>
                {q.canvas ? (
                  <div className="mx-auto mt-2 max-w-[320px]">
                    <CanvasRenderer figure={q.canvas} />
                  </div>
                ) : null}
                {q.format === "qcm" && q.choices ? (
                  <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-[15px]">
                    {q.choices.map((c, k) => (
                      <div key={k} className="flex gap-2">
                        <span className="font-black">{LETTRES[k]}.</span>
                        <MarkdownMath inline>{c}</MarkdownMath>
                      </div>
                    ))}
                  </div>
                ) : q.format === "redaction" ? (
                  <div className="mt-2 space-y-5">
                    {[0, 1, 2, 3].map((l) => (
                      <div key={l} className="border-b border-dotted border-slate-400" />
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">Réponse : ……………………………………</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}

      {/* LES CORRIGÉS */}
      {series.length > 0 ? (
        <section className="livret-page pt-8">
          <h2 className="mb-4 border-b-2 border-emerald-700 pb-2 text-2xl font-black">Corrigés</h2>
          <div className="space-y-6">
            {series.map((serie, s) => (
              <div key={s} className="livret-question">
                <h3 className="text-lg font-black text-emerald-800">Série {s + 1}</h3>
                <ol className="mt-1 space-y-1 text-[13px] leading-snug">
                  {serie.map((q, i) => {
                    const rep =
                      q.format === "qcm" && q.choices
                        ? `${LETTRES[q.choices.indexOf(q.expected[0])]}. ${q.expected[0]}`
                        : q.format === "redaction"
                          ? q.modele ?? ""
                          : q.expected[0] ?? "";
                    return (
                      <li key={i} className="flex gap-2">
                        <span className="w-6 shrink-0 font-black">{i + 1}.</span>
                        <span>
                          <MarkdownMath inline>{rep}</MarkdownMath>
                          {q.format !== "redaction" ? (
                            <span className="text-slate-600">
                              {" — "}
                              <MarkdownMath inline>{(q.explanation.split("\n").pop() ?? "").trim()}</MarkdownMath>
                            </span>
                          ) : null}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
