"use client";

// ─── Le rendu unifié d'une fiche de cours ──────────────────────────────────────
// UNE fiche-donnée, TROIS habillages :
//   • non connecté  → la fiche complète (vitrine SEO) + invitation à se connecter ;
//   • élève connecté → toggle « Fiche » / « Flashcards » (dérivées des blocs) ;
//   • prof connecté  → composeur : il coche et ordonne SES rubriques
//     (composition enregistrée sur l'appareil — partage aux classes plus tard,
//     via l'import Pronote).

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BookMarked,
  BookOpen,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Download,
  Landmark,
  Layers,
  Lightbulb,
  ListChecks,
  LogIn,
  Printer,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useEleve } from "@/context/EleveContext";
import ModeClasse, { type ClasseSlide } from "@/components/fiches/ModeClasse";
import Flashcards from "@/components/fiches/Flashcards";
import VideoNotion from "@/components/fiches/VideoNotion";
import {
  ORDRE_CANONIQUE,
  RUBRIQUES_LABELS,
  type FicheCoursData,
  type FicheRubriqueId,
} from "@/lib/fiches/types";

type Composition = {
  ordre: FicheRubriqueId[];
  actives: Record<FicheRubriqueId, boolean>;
};

function compositionParDefaut(): Composition {
  return {
    ordre: [...ORDRE_CANONIQUE],
    actives: Object.fromEntries(
      ORDRE_CANONIQUE.map((id) => [id, true])
    ) as Record<FicheRubriqueId, boolean>,
  };
}

const ICONES_METHODE = [BookOpen, Lightbulb, CheckCircle2];
const STYLES_METHODE = [
  { carte: "border-sky-200 bg-sky-50", icone: "text-sky-500" },
  { carte: "border-amber-200 bg-amber-50", icone: "text-amber-500" },
  { carte: "border-emerald-200 bg-emerald-50", icone: "text-emerald-500" },
];

export default function FicheCoursClient({
  fiche,
  slides,
}: {
  fiche: FicheCoursData;
  slides: ClasseSlide[];
}) {
  const { eleve } = useEleve();
  const role = eleve?.type_utilisateur ?? null;
  const estStaff = role === "prof" || role === "principal" || role === "boss";
  const estEleveConnecte = !!eleve && !estStaff;
  // Primitives stables pour les dépendances d'effets (jamais l'objet entier).
  const connecte = !!eleve;
  const token = eleve?.token ?? null;

  // ── Toggle élève : fiche ou flashcards ──
  const [mode, setMode] = useState<"fiche" | "cartes">("fiche");

  // ── Composeur prof : ordre + rubriques actives, mémorisés sur l'appareil ──
  const cleCompo = `eleveai-fiche-compo-${fiche.matiere}-${fiche.classe}-${fiche.notion}`;
  const [compo, setCompo] = useState<Composition>(compositionParDefaut);
  const [compoChargee, setCompoChargee] = useState(false);
  const [composeurOuvert, setComposeurOuvert] = useState(false);

  // Ne pousse en base que ce que le prof a réellement modifié (jamais le
  // simple chargement d'une fiche).
  const modifieeRef = useRef(false);

  useEffect(() => {
    let annule = false;

    // On repart du canon pour absorber les rubriques ajoutées depuis.
    function normaliser(lue: Composition): Composition {
      const base = compositionParDefaut();
      const ordre = [
        ...lue.ordre.filter((id) => ORDRE_CANONIQUE.includes(id)),
        ...ORDRE_CANONIQUE.filter((id) => !lue.ordre.includes(id)),
      ];
      return { ordre, actives: { ...base.actives, ...lue.actives } };
    }

    // 1. Le localStorage d'abord (instantané, hors-ligne).
    try {
      const brut = localStorage.getItem(cleCompo);
      if (brut) setCompo(normaliser(JSON.parse(brut) as Composition));
    } catch {
      /* composition illisible : on garde le canon */
    }

    // 2. Prof connecté : la composition enregistrée en base gagne
    //    (elle le suit d'un appareil à l'autre).
    async function chargerDepuisBase() {
      if (!token) return;
      try {
        const res = await fetch(
          `/api/fiches/composition?matiere=${fiche.matiere}&classe=${fiche.classe}&notion=${fiche.notion}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json().catch(() => null);
        if (!annule && res.ok && data?.composition?.data) {
          setCompo(normaliser(data.composition.data as Composition));
        }
      } catch {
        /* hors-ligne : le localStorage suffit */
      }
    }

    chargerDepuisBase().finally(() => {
      if (!annule) setCompoChargee(true);
    });

    return () => {
      annule = true;
    };
  }, [cleCompo, token, fiche.matiere, fiche.classe, fiche.notion]);

  useEffect(() => {
    if (!compoChargee || !connecte) return;
    try {
      localStorage.setItem(cleCompo, JSON.stringify(compo));
    } catch {
      /* stockage indisponible */
    }

    // Enregistrement en base, débouncé, seulement après une vraie action.
    if (!modifieeRef.current || !token) return;
    const t = setTimeout(() => {
      fetch("/api/fiches/composition", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          matiere: fiche.matiere,
          classe: fiche.classe,
          notion: fiche.notion,
          ordre: compo.ordre,
          actives: compo.actives,
        }),
      }).catch(() => {
        /* hors-ligne : le localStorage garde la composition */
      });
    }, 800);
    return () => clearTimeout(t);
  }, [compo, compoChargee, cleCompo, connecte, token, fiche.matiere, fiche.classe, fiche.notion]);

  function reinitialiser() {
    modifieeRef.current = false;
    setCompo(compositionParDefaut());
    try {
      localStorage.removeItem(cleCompo);
    } catch {
      /* ignore */
    }
    if (token) {
      fetch("/api/fiches/composition", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          matiere: fiche.matiere,
          classe: fiche.classe,
          notion: fiche.notion,
        }),
      }).catch(() => {
        /* ignore */
      });
    }
  }

  function deplacer(id: FicheRubriqueId, sens: -1 | 1) {
    modifieeRef.current = true;
    setCompo((c) => {
      const ordre = [...c.ordre];
      const i = ordre.indexOf(id);
      const j = i + sens;
      if (i < 0 || j < 0 || j >= ordre.length) return c;
      [ordre[i], ordre[j]] = [ordre[j], ordre[i]];
      return { ...c, ordre };
    });
  }

  function basculer(id: FicheRubriqueId) {
    modifieeRef.current = true;
    setCompo((c) => ({
      ...c,
      actives: { ...c.actives, [id]: !c.actives[id] },
    }));
  }

  // Le visiteur voit l'ordre canonique ; tout connecté (prof COMME élève —
  // effet IKEA des deux côtés) voit SA composition.
  const rubriquesVisibles = useMemo(() => {
    const source = eleve ? compo : compositionParDefaut();
    return source.ordre.filter((id) => source.actives[id]);
  }, [eleve, compo]);

  // ── Les blocs de la fiche, rendus rubrique par rubrique ──
  function rendreRubrique(id: FicheRubriqueId) {
    switch (id) {
      case "identite":
        if (!fiche.identite.length) return null;
        return (
          <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-3 print:grid-cols-3 print:p-3">
            {fiche.identite.map((item) => (
              <div key={item.label}>
                <span className="block text-xs font-black uppercase text-slate-500">
                  {item.label}
                </span>
                <span className="mt-1 block font-black text-slate-900">
                  {item.valeur}
                </span>
              </div>
            ))}
          </div>
        );

      case "reel":
        return (
          <section className="pt-6 print:pt-4">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
              <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                <Wrench className="h-5 w-5 text-sky-500 print:hidden" />
                À quoi ça sert ?
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                {fiche.reel.texte}
              </p>
            </div>
          </section>
        );

      case "historique":
        return (
          <section className="pt-4 print:pt-3">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                <Landmark className="h-5 w-5 text-amber-500 print:hidden" />
                Un peu d&apos;histoire
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                {fiche.historique.texte}
              </p>
            </div>
          </section>
        );

      case "definition":
        return (
          <section className="pt-6 print:pt-4">
            <div
              className={`grid gap-4 ${
                fiche.figure ? "md:grid-cols-[1.3fr_1fr] print:grid-cols-[1.3fr_1fr]" : ""
              }`}
            >
              <div className="rounded-2xl border-2 border-sky-300 bg-white p-5">
                <h2 className="flex items-center gap-2 text-lg font-black text-sky-700 print:text-base">
                  <BookMarked className="h-5 w-5 print:hidden" />
                  Définition
                </h2>
                <p className="mt-3 text-base font-bold leading-7 text-slate-900 print:text-sm">
                  {fiche.definition.texte}
                </p>
              </div>
              {fiche.figure ? (
                <figure className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  {fiche.figure.schema}
                  {fiche.figure.legende ? (
                    <figcaption className="mt-2 text-center text-xs font-bold text-slate-500">
                      {fiche.figure.legende}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
            </div>
          </section>
        );

      case "proprietes":
        if (!fiche.proprietes.length) return null;
        return (
          <section className="pt-6 print:pt-4">
            <h2 className="flex items-center gap-2 text-2xl font-black text-slate-900 print:text-xl">
              <ListChecks className="h-6 w-6 text-sky-500 print:hidden" />
              Propriétés
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3 print:grid-cols-3 print:gap-3">
              {fiche.proprietes.map((p) => (
                <div
                  key={p.titre}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <h3 className="font-black text-slate-900">{p.titre}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                    {p.texte}
                  </p>
                </div>
              ))}
            </div>
          </section>
        );

      case "formule":
        if (!fiche.formule) return null;
        return (
          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              La formule
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.25fr] print:grid-cols-[1fr_1.25fr]">
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-center">
                <p className="text-sm font-bold uppercase text-sky-600">
                  {fiche.formule.contexte}
                </p>
                <p className="mt-4 text-2xl font-black text-slate-900 print:text-xl">
                  {fiche.formule.expression}
                </p>
                <p className="mt-4 text-sm font-bold text-slate-600">
                  {fiche.formule.legende}
                </p>
              </div>
              {fiche.formule.schema ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  {fiche.formule.schema}
                </div>
              ) : null}
            </div>
          </section>
        );

      case "methode":
        if (!fiche.methode.length) return null;
        return (
          <div className="grid gap-5 py-6 md:grid-cols-3 print:grid-cols-3 print:gap-3 print:py-4">
            {fiche.methode.map((etape, i) => {
              const Icone = ICONES_METHODE[i % ICONES_METHODE.length];
              const style = STYLES_METHODE[i % STYLES_METHODE.length];
              return (
                <div
                  key={etape.titre}
                  className={`rounded-2xl border p-4 ${style.carte}`}
                >
                  <Icone className={`h-5 w-5 print:hidden ${style.icone}`} />
                  <h2 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                    {i + 1}. {etape.titre}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                    {etape.texte}
                  </p>
                </div>
              );
            })}
          </div>
        );

      case "usages":
        if (!fiche.usages.length) return null;
        return (
          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              Selon ce que l&apos;on cherche
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3 print:grid-cols-3 print:gap-3">
              {fiche.usages.map((usage) => (
                <div
                  key={usage.titre}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <h3 className="font-black text-slate-900">{usage.titre}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                    {usage.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        );

      case "exemples":
        if (!fiche.exemples.length) return null;
        return (
          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              Exemples corrigés
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
              {fiche.exemples.map((exemple) => (
                <div
                  key={exemple.titre}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-black text-slate-900">{exemple.titre}</h3>
                  <p className="mt-2 text-sm text-slate-600 print:text-xs">
                    {exemple.donnees}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900 print:text-xs">
                    {exemple.question}
                  </p>
                  {exemple.schema ? (
                    <div className="mt-3 flex justify-center rounded-xl border border-slate-200 bg-white p-3">
                      {exemple.schema}
                    </div>
                  ) : null}
                  <p className="mt-3 rounded-xl border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-sky-800 print:text-xs">
                    {exemple.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>
        );

      case "pieges":
        if (!fiche.pieges.length) return null;
        return (
          <section className="pt-6 print:pt-4">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                <AlertTriangle className="h-5 w-5 text-amber-500 print:hidden" />
                Pièges à éviter
              </h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 print:text-xs">
                {fiche.pieges.map((piege) => (
                  <li key={piege}>{piege}</li>
                ))}
              </ul>
            </div>
          </section>
        );

      case "aRetenir":
        if (!fiche.aRetenir.length) return null;
        return (
          <section className="pt-4 print:pt-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 print:hidden" />
                À retenir
              </h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 print:text-xs">
                {fiche.aRetenir.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </section>
        );

      case "entrainement":
        if (!fiche.entrainement.length) return null;
        return (
          <section className="border-t border-slate-200 pt-6 print:pt-4">
            <h2 className="flex items-center gap-2 text-2xl font-black text-slate-900 print:text-xl">
              <Calculator className="h-6 w-6 text-sky-500 print:hidden" />
              Je m&apos;entraîne
            </h2>
            <ol className="mt-4 grid gap-4 text-sm leading-6 text-slate-700 print:gap-2 print:text-xs">
              {fiche.entrainement.map((item, index) => (
                <li
                  key={item.question}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <p className="font-bold text-slate-900">
                    {index + 1}. {item.question}
                  </p>
                  <details className="fiche-correction mt-2">
                    <summary className="cursor-pointer text-sm font-bold text-sky-600">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-xl border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-sky-800">
                      {item.correction}
                    </p>
                  </details>
                </li>
              ))}
            </ol>

            <div className="screen-only mt-6 flex flex-wrap gap-2">
              <Link
                href={fiche.coachHref}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
              >
                <Sparkles className="h-4 w-4" />
                M&apos;entraîner avec le Coach IA
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-3 text-sm font-black text-sky-700 shadow-sm transition hover:bg-sky-50"
              >
                <Download className="h-4 w-4" />
                Télécharger en PDF
              </button>
            </div>
          </section>
        );
    }
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f5f8ff] text-slate-800">
      <div
        aria-hidden="true"
        className="screen-only pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-200/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl" />
      </div>

      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <nav
            aria-label="Fil d'ariane"
            className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-bold text-slate-500"
          >
            <Link
              href="/fiches-cours"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Fiches de cours
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span>{fiche.matiereLabel}</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span>{fiche.classe}</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">{fiche.titre}</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            {eleve && (
              <button
                type="button"
                onClick={() => setComposeurOuvert((o) => !o)}
                className={`inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-black shadow-sm transition ${
                  composeurOuvert
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Composer ma fiche
              </button>
            )}
            {slides.length > 0 && (
              <ModeClasse sousTitre={`${fiche.titre} - ${fiche.classe}`} slides={slides} />
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
            >
              <Download className="h-4 w-4" />
              Télécharger en PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── Composeur (prof ET élève) : cocher + ordonner ses rubriques ── */}
      {eleve && composeurOuvert && (
        <div className="screen-only border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-5 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-black text-slate-900">
                {estStaff
                  ? "🎛️ Ta fiche, tes rubriques, ton ordre — comme tu fais cours."
                  : "🎛️ Ta fiche, tes rubriques, ton ordre — celles qui t'aident à réviser."}
              </p>
              <button
                type="button"
                onClick={reinitialiser}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-black text-slate-600 transition hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Revenir à la fiche EleveAI
              </button>
            </div>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {compo.ordre.map((id, i) => (
                <li
                  key={id}
                  className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm ${
                    compo.actives[id]
                      ? "border-slate-200 bg-slate-50"
                      : "border-slate-100 bg-white opacity-50"
                  }`}
                >
                  <label className="flex cursor-pointer items-center gap-2 font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={compo.actives[id]}
                      onChange={() => basculer(id)}
                      className="h-4 w-4 accent-sky-500"
                    />
                    {RUBRIQUES_LABELS[id]}
                  </label>
                  <span className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => deplacer(id, -1)}
                      disabled={i === 0}
                      aria-label={`Monter « ${RUBRIQUES_LABELS[id]} »`}
                      className="rounded-lg border border-slate-200 bg-white p-1 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deplacer(id, 1)}
                      disabled={i === compo.ordre.length - 1}
                      aria-label={`Descendre « ${RUBRIQUES_LABELS[id]} »`}
                      className="rounded-lg border border-slate-200 bg-white p-1 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs font-bold text-slate-500">
              {estStaff
                ? "Ta composition est enregistrée automatiquement et te suit d'un appareil à l'autre — retrouve-la dans ton dashboard (« Mes fiches de cours »). Elle s'applique à l'impression. Bientôt : la partager à tes classes."
                : "Ta composition est enregistrée automatiquement et te suit d'un appareil à l'autre. Elle s'applique aussi à l'impression."}
            </p>
          </div>
        </div>
      )}

      {/* ── Toggle élève : fiche ou flashcards ── */}
      {estEleveConnecte && (
        <div className="screen-only mx-auto max-w-5xl px-5 pt-6 sm:px-8">
          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setMode("fiche")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition ${
                mode === "fiche"
                  ? "bg-sky-500 text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              La fiche
            </button>
            <button
              type="button"
              onClick={() => setMode("cartes")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition ${
                mode === "cartes"
                  ? "bg-sky-500 text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="h-4 w-4" />
              Flashcards
            </button>
          </div>
        </div>
      )}

      {estEleveConnecte && mode === "cartes" ? (
        <Flashcards fiche={fiche} />
      ) : (
        <article className="mx-auto max-w-5xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:rounded-none print:border-0 print:p-0 print:shadow-none">
            <header className="border-b border-slate-200 pb-6">
              <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="flex items-center gap-2 text-lg font-black tracking-tight text-sky-600">
                  <Sparkles className="h-5 w-5" />
                  eleveai.fr
                </span>
                <span className="text-sm font-bold italic text-slate-500">
                  La liberté d&apos;apprendre
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-normal">
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-cyan-700">
                  {fiche.matiereLabel}
                </span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">
                  {fiche.classe}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                  Fiche de cours
                </span>
              </div>
              <h1 className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl">
                {fiche.titre}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
                {fiche.accroche}
              </p>
              <VideoNotion
                matiere={fiche.matiere}
                classe={fiche.classe}
                notion={fiche.notion}
              />
            </header>

            {rubriquesVisibles.map((id) => (
              <div key={id}>{rendreRubrique(id)}</div>
            ))}

            {!eleve && (
              <div className="screen-only mt-8 rounded-2xl border border-sky-200 bg-sky-50 p-5">
                <p className="font-black text-slate-900">
                  📚 Révise cette fiche en flashcards
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Connecte-toi pour retourner cette fiche en cartes de rappel
                  actif — et garder ta progression.
                </p>
                <Link
                  href="/auth/signin"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                >
                  <LogIn className="h-4 w-4" />
                  Se connecter
                </Link>
              </div>
            )}

            <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
              <span>eleveai.fr - Fiche de cours</span>
              <span>
                {fiche.titre} - {fiche.classe}
              </span>
            </footer>
          </section>
        </article>
      )}

      <div className="screen-only fixed bottom-5 right-5 hidden sm:block">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-xl shadow-slate-300/50 transition hover:bg-slate-100"
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </button>
      </div>

      <style jsx global>{`
        .remerciements-bar {
          display: none !important;
        }

        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          html,
          body {
            background: white !important;
            color: #0f172a !important;
          }

          body > header,
          body > footer,
          .screen-only {
            display: none !important;
          }

          main {
            min-height: auto !important;
            background: white !important;
            color: #0f172a !important;
          }

          .fiche-correction > summary {
            list-style: none;
            font-weight: 700;
            color: #475569 !important;
          }

          .fiche-correction > *:not(summary) {
            display: block !important;
          }
        }
      `}</style>
    </main>
  );
}
