"use client";

// ─── Le choix des exercices d'une feuille composée ─────────────────────────────
// Une case par feuille (la notion entière), et sous elle une case par micro —
// seulement les micros qui ont au moins un exercice : on ne propose pas une
// case qui donnerait une feuille vide. Le compteur est EXACT : un exercice qui
// travaille deux micros cochées ne compte qu'une fois.

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Sparkles } from "lucide-react";
import TexteMath from "@/components/fiches/TexteMath";
import { ecrireSelection, type SelectionFeuille } from "@/lib/fiches-exercices/composer";
import { libelleClasse } from "@/lib/fiches/registre";

export type FeuilleAChoisir = {
  slug: string;
  titre: string;
  microsParExercice: string[][];
  micros: { id: string; libelle: string; nb: number }[];
};

type Choix = Record<string, "entiere" | string[]>;

const NOMBRES = [5, 8, 10, 12, 15, 20];

export default function SelecteurComposeur({
  classes,
  c,
  feuilles,
  selection,
  nb: nbInitial,
  duo: duoInitial,
}: {
  classes: string[];
  c: string;
  feuilles: FeuilleAChoisir[];
  selection: SelectionFeuille[];
  nb: number;
  duo: boolean;
}) {
  const router = useRouter();
  const [choix, setChoix] = useState<Choix>(() =>
    Object.fromEntries(selection.map((f) => [f.slug, f.micros.length ? f.micros : "entiere"])),
  );
  const [ouvertes, setOuvertes] = useState<Set<string>>(
    () => new Set(selection.filter((f) => f.micros.length).map((f) => f.slug)),
  );
  const [nb, setNb] = useState(nbInitial);
  const [duo, setDuo] = useState(duoInitial);

  const compte = useMemo(() => {
    let total = 0;
    for (const f of feuilles) {
      const ch = choix[f.slug];
      if (!ch) continue;
      total += ch === "entiere" ? f.microsParExercice.length : f.microsParExercice.filter((ms) => ms.some((m) => ch.includes(m))).length;
    }
    return total;
  }, [choix, feuilles]);

  const parEleve = duo ? Math.floor(compte / 2) : compte;

  function basculerFeuille(slug: string) {
    setChoix((prev) => {
      const suivant = { ...prev };
      if (suivant[slug]) delete suivant[slug];
      else suivant[slug] = "entiere";
      return suivant;
    });
  }

  function basculerMicro(f: FeuilleAChoisir, micro: string) {
    setChoix((prev) => {
      const actuel = prev[f.slug];
      const liste = actuel === "entiere" ? f.micros.map((m) => m.id) : actuel ? [...actuel] : [];
      const i = liste.indexOf(micro);
      if (i >= 0) liste.splice(i, 1);
      else liste.push(micro);
      const suivant = { ...prev };
      if (!liste.length) delete suivant[f.slug];
      else suivant[f.slug] = liste.length === f.micros.length ? "entiere" : liste;
      return suivant;
    });
  }

  function composer() {
    const sel: SelectionFeuille[] = feuilles
      .filter((f) => choix[f.slug])
      .map((f) => ({ slug: f.slug, micros: choix[f.slug] === "entiere" ? [] : (choix[f.slug] as string[]) }));
    const p = new URLSearchParams();
    p.set("c", c);
    for (const s of ecrireSelection(sel)) p.append("s", s);
    p.set("nb", String(nb));
    p.set("duo", duo ? "1" : "0");
    router.push(`/fiches-exercices/composer?${p.toString()}`);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8">
      <p className="flex items-center gap-2 text-lg font-black tracking-tight text-sky-600">
        <Sparkles className="h-5 w-5" />
        Composer ma feuille d&apos;exercices
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Coche les notions, ou seulement les compétences qui t&apos;intéressent : la feuille se compose avec les
        exercices corrigés du site, à imprimer, à modifier ou à projeter.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {classes.map((k) => (
          <Link
            key={k}
            href={`/fiches-exercices/composer?c=${k}`}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-bold transition ${
              k === c ? "border-sky-500 bg-sky-500 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {libelleClasse(k.split("/")[1])}
          </Link>
        ))}
      </div>

      {c ? (
        <>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {feuilles.map((f) => {
              const ch = choix[f.slug];
              const ouverte = ouvertes.has(f.slug);
              return (
                <li key={f.slug} className={`rounded-2xl border p-3 ${ch ? "border-sky-300 bg-sky-50" : "border-slate-200 bg-white"}`}>
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-sky-600"
                      checked={Boolean(ch)}
                      ref={(el) => {
                        if (el) el.indeterminate = Array.isArray(ch);
                      }}
                      onChange={() => basculerFeuille(f.slug)}
                      aria-label={f.titre}
                    />
                    <button
                      type="button"
                      className="flex min-w-0 flex-1 items-start justify-between gap-2 text-left"
                      onClick={() =>
                        setOuvertes((prev) => {
                          const s = new Set(prev);
                          if (s.has(f.slug)) s.delete(f.slug);
                          else s.add(f.slug);
                          return s;
                        })
                      }
                    >
                      <span className="text-sm font-bold text-slate-900">
                        <TexteMath>{f.titre}</TexteMath>
                        <span className="ml-1 font-normal text-slate-400">· {f.microsParExercice.length} ex.</span>
                      </span>
                      <ChevronDown className={`mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition ${ouverte ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  {ouverte ? (
                    <ul className="mt-2 grid gap-1 pl-6">
                      {f.micros.map((m) => (
                        <li key={m.id}>
                          <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
                            <input
                              type="checkbox"
                              className="mt-1 h-3.5 w-3.5 accent-sky-600"
                              checked={ch === "entiere" || (Array.isArray(ch) && ch.includes(m.id))}
                              onChange={() => basculerMicro(f, m.id)}
                            />
                            <span className="min-w-0">
                              <TexteMath>{m.libelle}</TexteMath>
                              <span className="ml-1 text-slate-400">({m.nb})</span>
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
            <fieldset>
              <legend className="text-sm font-black text-slate-900">Sujets</legend>
              <label className="mt-1 flex items-center gap-2 text-sm">
                <input type="radio" className="accent-sky-600" checked={duo} onChange={() => setDuo(true)} />
                Deux sujets, gauche et droite : chacun le sien
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" className="accent-sky-600" checked={!duo} onChange={() => setDuo(false)} />
                Un seul sujet : on peut s&apos;entraider
              </label>
            </fieldset>
            <label className="text-sm font-black text-slate-900">
              Exercices par élève
              <select
                className="ml-2 rounded-lg border border-slate-300 bg-white px-2 py-1 font-bold"
                value={nb}
                onChange={(e) => setNb(Number(e.target.value))}
              >
                {NOMBRES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={!parEleve}
              onClick={composer}
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Sparkles className="h-4 w-4" />
              Composer la feuille
            </button>
            <span className="text-sm text-slate-500">
              {compte} exercice{compte > 1 ? "s" : ""} trouvé{compte > 1 ? "s" : ""}
              {compte ? ` · jusqu'à ${Math.min(parEleve, 40)} par élève${duo ? " et par sujet" : ""}` : ""}
            </span>
          </div>
        </>
      ) : (
        <p className="mt-4 text-sm text-slate-500">Choisis d&apos;abord une classe.</p>
      )}
    </section>
  );
}
