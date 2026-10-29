"use client";

// ─── La réponse de l'élève, à droite de l'exercice ─────────────────────────────
// Un prof (29/10/2026) : l'élève écrit sa réponse et la VALIDE sans voir la
// correction. ⛔ SANS IA (Frédéric : « je veux pas passer par l'IA ») : la
// réponse attendue est écrite dans la fiche (`reponses`) et comparée ici, dans
// le navigateur, en calculant — voir lib/fiches-exercices/verifier-saisie.ts.
// Aucun appel réseau, aucun coût. « Voir la correction » reste dessous, pour après.
//
// Le clavier maths (Frédéric : « un moyen de rentrer exponentielles etc. ») :
// voir lib/fiches-exercices/saisie-maths.ts. Il écrit dans le dernier champ
// touché ; l'aperçu sous chaque champ montre la saisie écrite comme au tableau.

import { useMemo, useRef, useState } from "react";
import katex from "katex";
import { CheckCircle2, CircleAlert, Keyboard, XCircle } from "lucide-react";
import { saisieEnLatex, touchesPourClasse, type ToucheMaths } from "@/lib/fiches-exercices/saisie-maths";
import { saisieJuste, type ReponseAttendue } from "@/lib/fiches-exercices/verifier-saisie";

function Apercu({ saisie }: { saisie: string }) {
  const html = useMemo(() => {
    const ligne = saisieEnLatex(saisie)[0];
    if (!ligne) return null;
    try {
      return katex.renderToString(ligne, { throwOnError: true });
    } catch {
      return null;
    }
  }, [saisie]);
  if (!html) return null;
  return <div className="overflow-x-auto px-1 text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function ReponseExercice({
  reponses,
  idBase,
  clavierMaths,
  classe,
}: {
  reponses: ReponseAttendue[];
  /** Unique sur la page, pour les `id` des champs. */
  idBase: string;
  clavierMaths: boolean;
  /** La classe de la fiche : le clavier n'offre que les touches de son niveau. */
  classe: string;
}) {
  const [saisies, setSaisies] = useState<string[]>(() => reponses.map(() => ""));
  const [clavier, setClavier] = useState(clavierMaths);
  const [verdicts, setVerdicts] = useState<boolean[] | null>(null);
  const champs = useRef<(HTMLInputElement | null)[]>([]);
  const actif = useRef(0);

  function changer(k: number, valeur: string) {
    setSaisies((s) => s.map((x, j) => (j === k ? valeur : x)));
    setVerdicts(null);
  }

  function appuyer(t: ToucheMaths) {
    const k = actif.current;
    const el = champs.current[k];
    const texte = saisies[k];
    const debut = el?.selectionStart ?? texte.length;
    const fin = el?.selectionEnd ?? texte.length;
    changer(k, texte.slice(0, debut) + t.inserer + texte.slice(fin));
    const pos = debut + (t.curseur ?? t.inserer.length);
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(pos, pos);
    });
  }

  function valider() {
    setVerdicts(reponses.map((r, k) => saisieJuste(saisies[k], r)));
  }

  const rempli = saisies.some((s) => s.trim());
  const nbJustes = verdicts?.filter(Boolean).length ?? 0;
  const tout = verdicts !== null && nbJustes === reponses.length;

  return (
    <div className="screen-only flex min-w-0 flex-col gap-2 self-start rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-black text-slate-700">Ma réponse</p>
        {clavierMaths ? (
          <button
            type="button"
            onClick={() => setClavier((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold text-slate-500 hover:bg-slate-200"
            aria-pressed={clavier}
          >
            <Keyboard className="h-3.5 w-3.5" />
            {clavier ? "Masquer le clavier" : "Clavier maths"}
          </button>
        ) : null}
      </div>

      {reponses.map((r, k) => {
        const v = verdicts?.[k];
        return (
          <div key={k} className="min-w-0">
            <div className="flex items-center gap-2">
              {r.question ? (
                <label htmlFor={`${idBase}-${k}`} className="min-w-7 shrink-0 text-sm font-black text-slate-600">
                  {r.question}
                </label>
              ) : null}
              <input
                id={`${idBase}-${k}`}
                ref={(el) => {
                  champs.current[k] = el;
                }}
                value={saisies[k]}
                onFocus={() => (actif.current = k)}
                onChange={(e) => changer(k, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") valider();
                }}
                maxLength={200}
                autoComplete="off"
                aria-label={r.question ? `Réponse ${r.question}` : "Ma réponse"}
                className={`min-w-0 flex-1 rounded-xl border bg-white px-3 py-1.5 font-mono text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-100 ${
                  v === true ? "border-emerald-400" : v === false ? "border-rose-400" : "border-slate-300 focus:border-sky-400"
                }`}
              />
              {v === true ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" aria-label="juste" /> : null}
              {v === false ? <XCircle className="h-5 w-5 shrink-0 text-rose-500" aria-label="pas encore" /> : null}
            </div>
            {clavierMaths && saisies[k].trim() ? (
              <div className={r.question ? "pl-9" : ""}>
                <Apercu saisie={saisies[k]} />
              </div>
            ) : null}
          </div>
        );
      })}

      {clavier ? (
        <div className="grid grid-cols-6 gap-1" role="group" aria-label="Clavier maths">
          {touchesPourClasse(classe).map((t) => (
            <button
              key={t.label}
              type="button"
              title={t.titre}
              aria-label={t.titre}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => appuyer(t)}
              className="rounded-lg border border-slate-200 bg-white py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 active:scale-95"
            >
              {t.label}
            </button>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        onClick={valider}
        disabled={!rempli}
        className="inline-flex items-center justify-center gap-2 self-end rounded-full bg-sky-500 px-4 py-2 text-sm font-black text-white shadow-md shadow-sky-500/30 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CheckCircle2 className="h-4 w-4" />
        Valider
      </button>

      {verdicts ? (
        <p
          role="status"
          className={`flex items-center gap-1.5 rounded-xl border p-2.5 text-sm font-bold ${
            tout
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          {tout ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <CircleAlert className="h-4 w-4 shrink-0" />}
          {tout
            ? "Bravo, c'est juste !"
            : reponses.length > 1
              ? `${nbJustes} sur ${reponses.length} : relis le rappel de cours et retente.`
              : "Pas encore : relis le rappel de cours et retente."}
        </p>
      ) : null}
    </div>
  );
}
