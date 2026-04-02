"use client";

// 🔹 Composant principal : affiche un défi + gère les réponses
// 🔹 Version projection classe :
//    - textes plus gros
//    - boutons plus hauts
//    - meilleure lisibilité depuis le fond de la classe
//    - image affichée seulement si elle existe vraiment

import { useMemo, useState } from "react";
import type { Defi } from "@/lib/defis/types";

type Props = {
  defi: Defi;
};

export default function DefiDuJourCard({ defi }: Props) {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = useMemo(() => {
    return selected === defi.bonneReponse;
  }, [selected, defi.bonneReponse]);

  const imageSrc =
    defi.image && defi.image.trim() !== "" ? defi.image : null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      {/* Badge */}
      <div className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-bold uppercase tracking-wide text-indigo-700 sm:text-base">
        Défi IA du jour
      </div>

      {/* Question */}
      <p className="mt-6 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-4xl">
        {defi.question}
      </p>

      {/* Image (si présente) */}
      {imageSrc && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <img
            src={imageSrc}
            alt={defi.question}
            className="h-64 w-full object-cover sm:h-80"
          />
        </div>
      )}

      {/* Choix */}
      <div className="mt-8 space-y-4">
        {defi.choix.map((choix, index) => {
          const isSelected = selected === choix;
          const isBonne = choix === defi.bonneReponse;
          const label = String.fromCharCode(65 + index);

          let style =
            "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50";
          let icon = null;

          if (!submitted && isSelected) {
            style = "border-blue-400 bg-blue-50 text-blue-700";
          }

          if (submitted) {
            if (isBonne) {
              style = "border-emerald-400 bg-emerald-50 text-emerald-700";
              icon = <span className="ml-4 shrink-0 text-2xl">✅</span>;
            } else if (isSelected && !isBonne) {
              style = "border-red-400 bg-red-50 text-red-700";
              icon = <span className="ml-4 shrink-0 text-2xl">❌</span>;
            } else {
              style = "border-slate-200 bg-white text-slate-500";
            }
          }

          return (
            <button
              key={choix}
              type="button"
              onClick={() => {
                if (!submitted) setSelected(choix);
              }}
              className={`flex w-full items-center justify-between rounded-2xl border px-5 py-5 text-left text-lg font-semibold transition sm:text-2xl ${style} ${
                submitted ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current text-base font-bold sm:h-12 sm:w-12 sm:text-lg">
                  {label}
                </span>
                <span className="leading-snug">{choix}</span>
              </span>

              {icon}
            </button>
          );
        })}
      </div>

      {/* Boutons */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          disabled={!selected || submitted}
          onClick={() => setSubmitted(true)}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:from-indigo-500 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
        >
          Valider
        </button>

        {submitted && (
          <button
            type="button"
            onClick={() => {
              setSelected("");
              setSubmitted(false);
            }}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-lg"
          >
            Rejouer
          </button>
        )}
      </div>

      {/* Feedback après validation */}
      {submitted && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
          <p
            className={`text-lg font-extrabold sm:text-2xl ${
              isCorrect ? "text-emerald-700" : "text-red-600"
            }`}
          >
            {isCorrect ? "Vrai ✅" : "Faux ❌"}
          </p>

          {!isCorrect && (
            <p className="mt-3 text-base text-slate-700 sm:text-xl">
              Bonne réponse :{" "}
              <span className="font-semibold text-emerald-700">
                {defi.bonneReponse}
              </span>
            </p>
          )}

          <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-xl">
            <span className="font-semibold">Explication :</span>{" "}
            {defi.explication}
          </p>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-xl">
            <span className="font-semibold">Réflexion EleveAI :</span>{" "}
            {defi.reflexion}
          </p>
        </div>
      )}
    </div>
  );
}