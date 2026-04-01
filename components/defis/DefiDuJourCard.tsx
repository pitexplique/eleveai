"use client";

// 🔹 Composant principal : affiche un défi + gestion des réponses

import { useMemo, useState } from "react";
import type { Defi } from "@/lib/defis/types";

type Props = {
  defi: Defi;
};

export default function DefiDuJourCard({ defi }: Props) {
  // 🔸 choix sélectionné par l'utilisateur
  const [selected, setSelected] = useState("");

  // 🔸 état après validation
  const [submitted, setSubmitted] = useState(false);

  // 🔸 vérifie si la réponse est correcte
  const isCorrect = useMemo(() => {
    return selected === defi.bonneReponse;
  }, [selected, defi.bonneReponse]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Badge */}
      <div className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700">
        Défi IA du jour
      </div>

      {/* Question */}
      <p className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        {defi.question}
      </p>

      {/* Image (si présente) */}
      {defi.image && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
          <img
            src={defi.image}
            alt={defi.question}
            className="h-56 w-full object-cover"
          />
        </div>
      )}

      {/* Choix */}
      <div className="mt-6 space-y-3">
        {defi.choix.map((choix) => {
          const isSelected = selected === choix;
          const isBonne = choix === defi.bonneReponse;

          let style = "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50";
          let icon = null;

          // 🔹 Avant validation : l'option cliquée devient bleue
          if (!submitted && isSelected) {
            style = "border-blue-400 bg-blue-50 text-blue-700";
          }

          // 🔹 Après validation : vert si bon, rouge si mauvais choix
          if (submitted) {
            if (isBonne) {
              style = "border-emerald-400 bg-emerald-50 text-emerald-700";
              icon = <span className="ml-2">✅</span>;
            } else if (isSelected && !isBonne) {
              style = "border-red-400 bg-red-50 text-red-700";
              icon = <span className="ml-2">❌</span>;
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
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${style} ${
                submitted ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span>{choix}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Boutons */}
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!selected || submitted}
          onClick={() => setSubmitted(true)}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-indigo-500 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Rejouer
          </button>
        )}
      </div>

      {/* Feedback après validation */}
      {submitted && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p
            className={`text-sm font-extrabold ${
              isCorrect ? "text-emerald-700" : "text-red-600"
            }`}
          >
            {isCorrect ? "Vrai ✅" : "Faux ❌"}
          </p>

          {!isCorrect && (
            <p className="mt-2 text-sm text-slate-700">
              Bonne réponse :{" "}
              <span className="font-semibold text-emerald-700">
                {defi.bonneReponse}
              </span>
            </p>
          )}

          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            <span className="font-semibold">Explication :</span>{" "}
            {defi.explication}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            <span className="font-semibold">Réflexion EleveAI :</span>{" "}
            {defi.reflexion}
          </p>
        </div>
      )}
    </div>
  );
}