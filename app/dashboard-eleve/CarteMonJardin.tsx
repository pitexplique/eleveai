"use client";

// 🌿 MON JARDIN (23/11/2026). Frédéric : « un autre chips, un peu plus
// poétique… un peu plus nature, écologique ».
//
// La même progression que le cockpit, racontée autrement : chaque notion
// travaillée au coach est une plante. Elle grandit avec les bonnes réponses.
//   🌰 graine       : moins de 3 réponses, trop tôt pour dire
//   🌱 pousse       : moins de 50 % de justes
//   🌿 jeune plante : de 50 % à 80 %
//   🌳 arbre        : 80 % ou plus (le seuil « compris » du prof)
// Chaque micro compris donne un fruit 🍎. Mêmes seuils que CarteMesNotions.

import Link from "next/link";
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";
import type { Notion } from "./CarteMesNotions";

type Etat = "graine" | "pousse" | "plante" | "arbre";

const ETATS: Record<Etat, { emoji: string; nom: string; pluriel: string }> = {
  graine: { emoji: "🌰", nom: "graine", pluriel: "graines" },
  pousse: { emoji: "🌱", nom: "pousse", pluriel: "pousses" },
  plante: { emoji: "🌿", nom: "jeune plante", pluriel: "jeunes plantes" },
  arbre: { emoji: "🌳", nom: "arbre", pluriel: "arbres" },
};

function mesurer(n: Notion) {
  const j = n.micros.reduce((a, m) => a + m.j, 0);
  const t = n.micros.reduce((a, m) => a + m.t, 0);
  const fruits = n.micros.filter((m) => m.t >= 3 && m.j / m.t >= 0.8).length;
  const r = t ? j / t : 0;
  const etat: Etat = t < 3 ? "graine" : r >= 0.8 ? "arbre" : r >= 0.5 ? "plante" : "pousse";
  return { j, t, r, fruits, etat };
}

const lienCoach = (n: Notion) =>
  `/coach/serie?classe=${encodeURIComponent(n.classe)}&matiere=maths&notion=${encodeURIComponent(
    n.notionId
  )}&${displayParamForClasse(n.classe)}`;

export default function CarteMonJardin({ notions }: { notions: Notion[] | null }) {
  if (!notions || notions.length === 0) {
    return (
      <section className="mt-6 rounded-[2rem] bg-gradient-to-b from-sky-100 to-emerald-100 p-6 text-center shadow-xl">
        <div className="text-5xl">🌰</div>
        <h2 className="mt-2 text-2xl font-black text-emerald-950">Mon jardin</h2>
        <p className="mt-1 font-semibold text-emerald-900">
          Ton jardin attend sa première graine. Fais une séance au coach pour la planter.
        </p>
      </section>
    );
  }

  const plantes = notions.map((n) => ({ n, ...mesurer(n) }));
  const compte = (e: Etat) => plantes.filter((p) => p.etat === e).length;
  const fruits = plantes.reduce((a, p) => a + p.fruits, 0);
  const resume = (["arbre", "plante", "pousse", "graine"] as Etat[])
    .filter((e) => compte(e) > 0)
    .map((e) => `${compte(e)} ${compte(e) > 1 ? ETATS[e].pluriel : ETATS[e].nom}`)
    .join(", ");

  // La plante à arroser : la plus fragile parmi celles qui ont déjà poussé.
  const aArroser = plantes
    .filter((p) => p.etat === "pousse" || p.etat === "plante")
    .sort((a, b) => a.r - b.r)[0];

  // Les arbres d'abord, puis les jeunes plantes… comme un verger qui monte.
  const ordre: Etat[] = ["arbre", "plante", "pousse", "graine"];
  const triees = [...plantes].sort((a, b) => ordre.indexOf(a.etat) - ordre.indexOf(b.etat) || b.r - a.r);

  return (
    <section className="relative mt-6 overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-emerald-900/10">
      <div className="relative bg-gradient-to-b from-sky-200 via-sky-50 to-lime-50 px-5 pb-4 pt-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(253,224,71,1)_0%,_rgba(253,224,71,0.5)_45%,_rgba(253,224,71,0)_70%)]"
        />
        <span aria-hidden className="pointer-events-none absolute right-[34%] top-4 text-xl opacity-70">🦋</span>
        <h2 className="relative text-2xl font-black text-emerald-950">🌿 Mon jardin</h2>
        <p className="relative mt-1 max-w-xl font-semibold text-emerald-900">
          Chaque notion est une plante. Chaque bonne réponse est une goutte d&apos;eau.
        </p>
        <p className="relative mt-2 font-black text-emerald-950">
          Ton jardin : {resume}
          {fruits > 0 && ` · ${fruits} fruit${fruits > 1 ? "s" : ""} 🍎`}.
        </p>
      </div>

      <div className="bg-gradient-to-b from-lime-50 to-emerald-100 px-4 pb-5 pt-2">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {triees.map(({ n, etat, r, t, fruits: f }) => (
            <li key={n.cle}>
              <Link
                href={lienCoach(n)}
                className="flex h-full flex-col items-center rounded-2xl bg-white/80 p-3 text-center shadow-sm ring-1 ring-emerald-900/5 transition hover:-translate-y-0.5 hover:bg-white"
              >
                <span className={etat === "arbre" ? "text-5xl" : etat === "plante" ? "text-4xl" : "text-3xl"} aria-hidden>
                  {ETATS[etat].emoji}
                </span>
                <span className="mt-1 line-clamp-2 text-sm font-black leading-tight text-emerald-950">{n.titre}</span>
                <span className="mt-0.5 text-xs font-bold text-emerald-700">{n.classe.toUpperCase()}</span>
                <span className="mt-1 text-xs font-semibold text-slate-600">
                  {t < 3 ? "trop tôt pour dire" : `${Math.round(r * 100)} % de justes`}
                  {f > 0 && ` · ${"🍎".repeat(Math.min(f, 5))}`}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {aArroser && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/85 p-4 shadow-sm">
            <p className="font-semibold text-emerald-950">
              💧 Arrose ta {ETATS[aArroser.etat].nom} « {aArroser.n.titre} » : quelques exercices, et elle grandira.
            </p>
            <Link
              href={lienCoach(aArroser.n)}
              className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-500"
            >
              💧 Arroser
            </Link>
          </div>
        )}
        <p className="mt-3 text-center text-xs font-semibold text-emerald-800">
          🌰 graine · 🌱 pousse · 🌿 jeune plante · 🌳 arbre (80 % de justes) · 🍎 un micro compris
        </p>
      </div>
    </section>
  );
}
