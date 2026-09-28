"use client";

// ─── La feuille COMPOSÉE ───────────────────────────────────────────────────────
// Voir lib/fiches-exercices/composer.ts pour le tirage. Ici, ce qu'en fait le
// professeur (Frédéric, 28/09/2026) : « une page qui sera imprimable donc
// modifiable et éditable au tableau, en mode normal et aussi en mode classe,
// et le best qu'il y ait une partie droite et gauche pour ne pas que les
// élèves trichent trop ».
//
// ⭐ TOUT TEXTE SE MODIFIE D'UN DOUBLE-CLIC — énoncé, corrigé, rappel, titre —
// sur la page comme en mode classe (le tableau interactif sait double-cliquer).
// Les modifications restent dans CE navigateur (localStorage) : le lien, lui,
// redonne le tirage d'origine, c'est celui qu'on donne aux élèves.
// ⭐ DEUX SUJETS : chaque ligne aligne l'exercice A (rangée de gauche) et
// l'exercice B (rangée de droite), même niveau, mêmes micros autant que
// possible. À l'impression, côte à côte ou un sujet par page.

import { Children, Fragment, isValidElement, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Link2,
  Lightbulb,
  Pencil,
  Plus,
  Printer,
  RefreshCw,
  RotateCcw,
  Shuffle,
  Sparkles,
  Trash2,
} from "lucide-react";
import ModeClasse, { type ClasseSlide } from "@/components/fiches/ModeClasse";
import TexteMath from "@/components/fiches/TexteMath";
import { LargeurProjetee } from "@/lib/canvas/largeur-projetee";
import { libelleClasse } from "@/lib/fiches/registre";
import { insecables } from "@/lib/fiches/typographie";
import {
  composer,
  remplacant,
  type ExerciceCompose,
  type LigneComposee,
} from "@/lib/fiches-exercices/composer";
import { decouper } from "@/lib/fiches-exercices/slides";
import type { NiveauExercice } from "@/lib/fiches-exercices/types";

export type FeuilleSource = {
  slug: string;
  titre: string;
  series: { niveau: NiveauExercice; titre: string; rappel: string[] }[];
};

type Cote = "a" | "b";
type Textes = Record<string, { enonce?: string; correction?: string; titre?: string }>;
type Perso = Record<string, { niveau: NiveauExercice; enonce: string; correction: string }>;
type Etat = {
  titre: string;
  lignes: LigneComposee[];
  textes: Textes;
  perso: Perso;
  rappels: Record<string, string>;
};

const NIVEAUX: NiveauExercice[] = [1, 2, 3];
const ETOILES: Record<NiveauExercice, string> = { 1: "★", 2: "★★", 3: "★★★" };
const TITRES_NIVEAU: Record<NiveauExercice, string> = { 1: "Un seul geste", 2: "Type devoir", 3: "Problèmes" };

// ⚠️ Classes Tailwind écrites en entier (Tailwind lit le source en texte).
const STYLES_NIVEAU: Record<NiveauExercice, { pastille: string; bordure: string; etoiles: string }> = {
  1: { pastille: "bg-emerald-100 text-emerald-800", bordure: "border-emerald-200", etoiles: "text-emerald-500" },
  2: { pastille: "bg-sky-100 text-sky-800", bordure: "border-sky-200", etoiles: "text-sky-500" },
  3: { pastille: "bg-violet-100 text-violet-800", bordure: "border-violet-200", etoiles: "text-violet-500" },
};
const STYLES_COTE: Record<Cote, { titre: string; carte: string; etiquette: string }> = {
  a: { titre: "Sujet A · rangée de gauche", carte: "border-cyan-200 bg-cyan-50", etiquette: "text-cyan-700" },
  b: { titre: "Sujet B · rangée de droite", carte: "border-fuchsia-200 bg-fuchsia-50", etiquette: "text-fuchsia-700" },
};

/** Une empreinte courte, pour nommer la sauvegarde d'un tirage. */
function empreinte(texte: string) {
  let h = 5381;
  for (let i = 0; i < texte.length; i += 1) h = ((h << 5) + h + texte.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

// ── Un texte qu'on modifie d'un double-clic ──────────────────────────────────

function TexteEditable({
  valeur,
  onChange,
  className = "",
  placeholder = "Double-clic pour écrire",
  crayon = "survol",
  lectureSeule = false,
  grand = false,
}: {
  valeur: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  crayon?: "survol" | "toujours";
  lectureSeule?: boolean;
  /** En mode classe : la zone de saisie se lit du fond de la salle. */
  grand?: boolean;
}) {
  const [edition, setEdition] = useState(false);
  const [brouillon, setBrouillon] = useState(valeur);

  if (lectureSeule) {
    return (
      <div className={`whitespace-pre-line ${className}`}>
        <TexteMath>{valeur}</TexteMath>
      </div>
    );
  }

  if (edition) {
    const valider = () => {
      onChange(brouillon);
      setEdition(false);
    };
    return (
      <div className="screen-only">
        <textarea
          autoFocus
          value={brouillon}
          rows={Math.max(3, brouillon.split("\n").length + Math.ceil(brouillon.length / 60))}
          onChange={(e) => setBrouillon(e.target.value)}
          onBlur={valider}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Escape") setEdition(false);
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) valider();
          }}
          className={`w-full rounded-xl border-2 border-amber-300 bg-white p-2 font-mono text-slate-900 outline-none focus:border-amber-500 ${grand ? "text-xl" : "text-sm"}`}
        />
        <p className={`mt-1 text-slate-400 ${grand ? "text-base" : "text-xs"}`}>
          Formules entre $…$ · une ligne par étape · Ctrl+Entrée ou clic ailleurs pour valider, Échap pour annuler
        </p>
      </div>
    );
  }

  const ouvrir = () => {
    setBrouillon(valeur);
    setEdition(true);
  };
  return (
    <div className="group relative" onDoubleClick={ouvrir} title="Double-clic pour modifier">
      <div className={`whitespace-pre-line ${className}`}>
        {valeur ? <TexteMath>{valeur}</TexteMath> : <span className="screen-only italic text-slate-400">{placeholder}</span>}
      </div>
      <button
        type="button"
        onClick={ouvrir}
        aria-label="Modifier ce texte"
        className={`screen-only absolute -right-2 -top-2 rounded-full border border-amber-200 bg-white p-1 text-amber-600 shadow-sm transition hover:bg-amber-50 ${
          crayon === "toujours" ? "opacity-70" : "opacity-0 focus:opacity-100 group-hover:opacity-100"
        }`}
      >
        <Pencil className={grand ? "h-5 w-5" : "h-3.5 w-3.5"} />
      </button>
    </div>
  );
}

// ── Le composant ─────────────────────────────────────────────────────────────

export default function ComposeurClient({
  matiereLabel,
  classe,
  coachHref,
  feuilles,
  reservoir,
  nb,
  duo,
  graine,
  selecteur,
}: {
  matiereLabel: string;
  classe: string;
  coachHref: string;
  feuilles: FeuilleSource[];
  reservoir: ExerciceCompose[];
  nb: number;
  duo: boolean;
  graine: number;
  selecteur: ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const libClasse = libelleClasse(classe);

  const titreDefaut =
    feuilles.length === 1
      ? feuilles[0].titre
      : feuilles.length <= 3
        ? feuilles.map((f) => f.titre).join(" · ")
        : `Feuille d'exercices : ${feuilles.length} notions`;

  const etatInitial = useMemo<Etat>(
    () => ({ titre: titreDefaut, lignes: composer(reservoir, { nb, duo, graine }), textes: {}, perso: {}, rappels: {} }),
    // Le composant est remonté (clé) à chaque changement de sélection.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [etat, setEtat] = useState<Etat>(etatInitial);
  const [impression, setImpression] = useState<"cote" | "separe">("cote");
  const [message, setMessage] = useState("");
  const charge = useRef(false);

  const cleStockage = useMemo(
    () => `composeur:v1:${classe}:${empreinte(reservoir.map((e) => e.id).join(","))}:${nb}:${duo ? 1 : 0}:${graine}`,
    [classe, reservoir, nb, duo, graine],
  );

  // Les modifications de CE navigateur, reprises au retour sur le même tirage.
  useEffect(() => {
    try {
      const brut = localStorage.getItem(cleStockage);
      if (brut) {
        const lu = JSON.parse(brut) as Etat;
        const connus = new Set([...reservoir.map((e) => e.id), ...Object.keys(lu.perso ?? {})]);
        const lignes = (lu.lignes ?? []).filter((l) => connus.has(l.a) && (!l.b || connus.has(l.b)));
        setEtat({ ...etatInitial, ...lu, lignes });
      }
    } catch {
      /* navigation privée : on garde le tirage d'origine */
    }
    charge.current = true;
  }, [cleStockage, etatInitial, reservoir]);

  const modifie = etat !== etatInitial;
  useEffect(() => {
    if (!charge.current) return;
    try {
      if (modifie) localStorage.setItem(cleStockage, JSON.stringify(etat));
      else localStorage.removeItem(cleStockage);
    } catch {
      /* rien : la page marche sans */
    }
  }, [etat, cleStockage, modifie]);

  const parId = useMemo(() => new Map(reservoir.map((e) => [e.id, e])), [reservoir]);

  function exercice(id: string): ExerciceCompose {
    const p = etat.perso[id];
    const base: ExerciceCompose = p
      ? { id, niveau: p.niveau, source: "perso", enonce: p.enonce, correction: p.correction }
      : parId.get(id)!;
    const t = etat.textes[id];
    return t ? { ...base, ...t } : base;
  }

  function changerTexte(id: string, champ: "enonce" | "correction" | "titre", v: string) {
    setEtat((e) => ({ ...e, textes: { ...e.textes, [id]: { ...e.textes[id], [champ]: v } } }));
  }

  function remplacer(index: number, cote: Cote) {
    const utilises = new Set(etat.lignes.flatMap((l) => [l.a, l.b].filter(Boolean) as string[]));
    const actuel = etat.lignes[index][cote]!;
    const r = remplacant(reservoir, utilises, actuel);
    if (!r) {
      setMessage("Plus d'autre exercice de ce niveau dans ta sélection : coche une notion de plus.");
      return;
    }
    setEtat((e) => ({ ...e, lignes: e.lignes.map((l, i) => (i === index ? { ...l, [cote]: r.id } : l)) }));
  }

  function retirer(index: number) {
    setEtat((e) => ({ ...e, lignes: e.lignes.filter((_, i) => i !== index) }));
  }

  function ajouter(niveau: NiveauExercice) {
    const n = Date.now().toString(36);
    const vide = { niveau, enonce: "", correction: "" };
    const ligne: LigneComposee = duo ? { a: `perso-${n}-a`, b: `perso-${n}-b` } : { a: `perso-${n}-a` };
    setEtat((e) => ({
      ...e,
      perso: { ...e.perso, [ligne.a]: vide, ...(ligne.b ? { [ligne.b]: vide } : {}) },
      lignes: [...e.lignes, ligne],
    }));
  }

  function allerA(changements: Record<string, string>) {
    if (modifie && !window.confirm("Tes modifications de cette feuille seront perdues. Continuer ?")) return;
    const p = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(changements)) p.set(k, v);
    router.push(`/fiches-exercices/composer?${p.toString()}`);
  }

  async function copierLien() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("Lien copié : il redonne ce tirage, sans tes modifications.");
    } catch {
      setMessage("Copie impossible ici : copie l'adresse de la page.");
    }
  }

  // Les lignes, rangées par niveau ; la numérotation court de 1 à N.
  const niveauDe = (l: LigneComposee) => exercice(l.a).niveau;
  const indexees = etat.lignes.map((l, index) => ({ l, index }));
  const blocs = NIVEAUX.map((n) => ({ niveau: n, lignes: indexees.filter(({ l }) => niveauDe(l) === n) })).filter(
    (b) => b.lignes.length,
  );
  const numeros = new Map<number, number>();
  blocs.flatMap((b) => b.lignes).forEach(({ index }, k) => numeros.set(index, k + 1));
  const total = etat.lignes.length;

  /** Le rappel d'un niveau : celui de chaque feuille qui y a un exercice. */
  function rappelDe(niveau: NiveauExercice, lignes: { l: LigneComposee }[]): { cle: string; titre: string; texte: string }[] {
    const sources = new Set(lignes.flatMap(({ l }) => [l.a, l.b].filter(Boolean).map((id) => exercice(id!).source)));
    return feuilles
      .filter((f) => sources.has(f.slug))
      .map((f) => {
        const cle = `${f.slug}:${niveau}`;
        const serie = f.series.find((s) => s.niveau === niveau);
        return { cle, titre: f.titre, texte: etat.rappels[cle] ?? (serie?.rappel ?? []).join("\n") };
      })
      .filter((r) => r.texte);
  }

  const cotes: Cote[] = duo ? ["a", "b"] : ["a"];

  // ── Une carte d'exercice (page et impression) ──
  function carte({ id, numero, cote, index, lectureSeule }: { id: string; numero: number; cote: Cote; index: number; lectureSeule?: boolean }) {
    const ex = exercice(id);
    const st = STYLES_NIVEAU[ex.niveau];
    return (
      <div data-exercice={numero} className={`min-w-0 rounded-2xl border bg-white p-4 ${st.bordure}`}>
        <div className="flex items-start gap-2">
          <span className={`inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-1.5 text-xs font-black ${st.pastille}`}>
            {numero}
            {duo ? cote.toUpperCase() : ""}
          </span>
          <div className="min-w-0 flex-1 text-sm leading-6 text-slate-800 print:text-xs">
            {ex.titre ? (
              <TexteEditable
                valeur={ex.titre}
                onChange={(v) => changerTexte(id, "titre", v)}
                className="mb-1 font-bold text-slate-900"
                lectureSeule={lectureSeule}
              />
            ) : null}
            <TexteEditable
              valeur={ex.enonce}
              onChange={(v) => changerTexte(id, "enonce", v)}
              placeholder="Double-clic pour écrire l'énoncé"
              lectureSeule={lectureSeule}
            />
          </div>
        </div>
        {ex.figure ? <div className="mt-3 max-w-xl whitespace-normal print:max-w-[34rem]">{ex.figure}</div> : null}
        {!lectureSeule ? (
          <>
            <details className="fiche-correction mt-3 print:hidden">
              <summary className="cursor-pointer text-sm font-bold text-sky-600">Voir la correction</summary>
              <div className="mt-2 rounded-xl border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-sky-900">
                <TexteEditable
                  valeur={ex.correction}
                  onChange={(v) => changerTexte(id, "correction", v)}
                  placeholder="Double-clic pour écrire la correction"
                />
                {ex.schema ? <div className="-mx-3 mt-3 max-w-md whitespace-normal sm:mx-0">{ex.schema}</div> : null}
              </div>
            </details>
            {ex.source !== "perso" ? (
              <button
                type="button"
                onClick={() => remplacer(index, cote)}
                className="screen-only mt-2 inline-flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-sky-600"
              >
                <RefreshCw className="h-3 w-3" />
                Un autre exercice
              </button>
            ) : null}
          </>
        ) : null}
      </div>
    );
  }

  // ── Un bloc de niveau : en-tête, rappel, lignes ──
  function bloc({ niveau, lignes, seul }: { niveau: NiveauExercice; lignes: { l: LigneComposee; index: number }[]; seul?: Cote }) {
    const st = STYLES_NIVEAU[niveau];
    const premier = numeros.get(lignes[0].index)!;
    const dernier = numeros.get(lignes[lignes.length - 1].index)!;
    const rappels = rappelDe(niveau, lignes);
    const colonnes = seul ? [seul] : cotes;
    const lecture = Boolean(seul);
    return (
      <section className="pt-8 print:pt-5" data-niveau={niveau}>
        <div data-entete-serie={niveau}>
          <h2 className="flex flex-wrap items-center gap-2 text-2xl font-black text-slate-900 print:text-xl">
            <span className={st.etoiles} aria-hidden="true">
              {ETOILES[niveau]}
            </span>
            {insecables(`${TITRES_NIVEAU[niveau]} : exercice${premier === dernier ? ` ${premier}` : `s ${premier} à ${dernier}`}`)}
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${st.pastille}`}>niveau {niveau}</span>
          </h2>
          {rappels.length ? (
            <div className="mt-4 rounded-2xl border bg-amber-50 p-4 print:p-3" style={{ borderColor: "#fde68a" }}>
              <p className="flex items-center gap-2 text-sm font-black text-amber-900">
                <Lightbulb className="h-4 w-4 text-amber-500 print:hidden" />
                Rappel de cours
              </p>
              <div className="mt-2 grid gap-2 text-sm leading-6 text-slate-800 print:text-xs">
                {rappels.map((r) => (
                  <div key={r.cle}>
                    {rappels.length > 1 ? (
                      <p className="text-xs font-black uppercase text-amber-700">
                        <TexteMath>{r.titre}</TexteMath>
                      </p>
                    ) : null}
                    <TexteEditable
                      valeur={r.texte}
                      lectureSeule={lecture}
                      onChange={(v) => setEtat((e) => ({ ...e, rappels: { ...e.rappels, [r.cle]: v } }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {duo && !seul ? (
          <div className="mt-4 hidden grid-cols-2 gap-3 md:grid print:grid">
            {cotes.map((c) => (
              <p key={c} className={`text-xs font-black uppercase ${STYLES_COTE[c].etiquette}`}>
                {STYLES_COTE[c].titre}
              </p>
            ))}
          </div>
        ) : null}

        <div className="mt-2 grid gap-3 print:gap-2">
          {lignes.map(({ l, index }) => (
            <div key={`${l.a}-${l.b ?? ""}`} className="group/ligne relative">
              <div className={colonnes.length === 2 ? "grid gap-3 md:grid-cols-2 print:grid-cols-2 print:gap-2" : "grid"}>
                {colonnes.map((c) => (
                  <Fragment key={c}>{carte({ id: l[c]!, numero: numeros.get(index)!, cote: c, index, lectureSeule: lecture })}</Fragment>
                ))}
              </div>
              {!lecture ? (
                <button
                  type="button"
                  onClick={() => retirer(index)}
                  aria-label="Retirer cet exercice de la feuille"
                  title="Retirer de la feuille"
                  className="screen-only absolute -left-3 top-3 rounded-full border border-slate-200 bg-white p-1 text-slate-400 opacity-0 shadow-sm transition hover:text-rose-600 focus:opacity-100 group-hover/ligne:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>
          ))}
        </div>

        {!lecture ? (
          <button
            type="button"
            onClick={() => ajouter(niveau)}
            className="screen-only mt-3 inline-flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:border-sky-400 hover:text-sky-600"
          >
            <Plus className="h-3.5 w-3.5" />
            Ajouter un exercice à écrire{duo ? " (A et B)" : ""}
          </button>
        ) : null}
      </section>
    );
  }

  // ── Le mode classe ──
  const slides: ClasseSlide[] = [
    {
      titre: etat.titre,
      badge: `${libClasse} · ${total} exercice${total > 1 ? "s" : ""}${duo ? " par élève" : ""}`,
      teinte: "objectif",
      section: duo
        ? {
            type: "duo",
            gauche: { variante: "info", titre: "Rangée de gauche", contenu: "Sujet A" },
            droite: { variante: "histoire", titre: "Rangée de droite", contenu: "Sujet B" },
          }
        : {
            type: "objectif",
            phrase: `${total} exercice${total > 1 ? "s" : ""}, du geste seul au problème.`,
            sousPhrase: "Un seul sujet : on cherche, et on peut en parler avec son voisin.",
          },
    },
  ];
  // ⛔ UNE DIAPO DOIT TENIR DANS L'ÉCRAN (règle du mode classe, 30/08/2026).
  // Mesuré le 28/09 à 1280 × 800 : les deux corrections révélées SOUS les deux
  // énoncés débordaient de 450 à 1 270 px. D'où : une diapo pour les énoncés
  // A | B, puis une diapo de correction PAR SUJET, en pleine largeur. Et un
  // rappel par feuille : trois rappels fondus en un débordaient de 85 px.
  for (const b of blocs) {
    const rappels = rappelDe(b.niveau, b.lignes);
    for (const r of rappels) {
      slides.push({
        titre: `${ETOILES[b.niveau]} ${TITRES_NIVEAU[b.niveau]} : le rappel`,
        badge: rappels.length > 1 ? `Niveau ${b.niveau} · ${r.titre.replace(/\$/g, "")}` : `Niveau ${b.niveau}`,
        teinte: "propriete",
        section: { type: "corrige", lignes: r.texte.split("\n").filter(Boolean) },
      });
    }
    for (const { l, index } of b.lignes) {
      const numero = numeros.get(index)!;
      const badge = `${ETOILES[b.niveau]} ${TITRES_NIVEAU[b.niveau]} · exercice ${numero} sur ${total}`;
      const ids = cotes.map((c) => l[c]!);
      // Deux problèmes trop longs pour tenir ensemble : une diapo chacun.
      const ensemble = !duo || poidsEnonces(ids.map(exercice), true) <= SEUIL_DUO;
      const groupes = ensemble ? [ids] : ids.map((id) => [id]);
      groupes.forEach((groupe) => {
        const c = cotes[ids.indexOf(groupe[0])];
        slides.push({
          titre: `Exercice ${numero}${groupe.length === 1 && duo ? c.toUpperCase() : ""}`,
          badge: groupe.length === 1 && duo ? `${badge} · ${STYLES_COTE[c].titre}` : badge,
          teinte: "exercice",
          section: {
            type: "libre",
            rendu: () => (
              <DiapoEnonces
                ids={groupe}
                duo={duo}
                cote={groupe.length === 1 && duo ? c : undefined}
                exercice={exercice}
                changerTexte={changerTexte}
              />
            ),
          },
        });
      });
      for (const c of cotes) {
        const ex = exercice(l[c]!);
        // ⭐ Un problème se corrige QUESTION PAR QUESTION quand il ne tient pas
        // en une diapo — la règle des feuilles d'exercices (slides.ts).
        const parties = partiesProjetables(ex);
        (parties ?? [null]).forEach((partie) => {
          slides.push({
            titre: `Correction ${numero}${duo ? c.toUpperCase() : ""}${partie ? ` — ${partie.lettre})` : ""}`,
            badge: duo ? `${badge} · ${STYLES_COTE[c].titre}` : badge,
            teinte: "exercice",
            section: {
              type: "libre",
              rendu: ({ revealed, reveal }) => (
                <DiapoCorrection
                  id={l[c]!}
                  cote={duo ? c : undefined}
                  partie={partie?.rang}
                  revealed={revealed}
                  reveal={reveal}
                  exercice={exercice}
                  changerTexte={changerTexte}
                />
              ),
            },
          });
        });
      }
    }
  }

  const sousTitreClasse = `${etat.titre} - ${libClasse}`;

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800 print:bg-white">
      <article className="mx-auto max-w-6xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
        <details className="screen-only mb-4 rounded-2xl border border-slate-200 bg-white/70 p-3">
          <summary className="cursor-pointer text-sm font-bold text-slate-600">Modifier la sélection des notions</summary>
          <div className="mt-3">{selecteur}</div>
        </details>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <header className="border-b border-slate-200 pb-6 print:pb-3">
            <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 print:mb-2">
              <span className="flex items-center gap-2 text-lg font-black tracking-tight text-sky-600">
                <Sparkles className="h-5 w-5" />
                eleveai.fr
              </span>
              <span className="text-sm font-bold italic text-slate-500">La liberté d&apos;apprendre</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-normal">
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-cyan-700">{matiereLabel}</span>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">{libClasse}</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">Feuille composée</span>
              {duo ? <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-fuchsia-700">Sujets A et B</span> : null}
            </div>
            <div className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-4xl print:mt-3 print:text-2xl">
              <TexteEditable valeur={etat.titre} onChange={(v) => setEtat((e) => ({ ...e, titre: v || titreDefaut }))} />
            </div>
            <p className="mt-1 text-base font-bold text-slate-400 print:text-sm">
              {total} exercice{total > 1 ? "s" : ""} corrigé{total > 1 ? "s" : ""}
              {duo ? " par élève, deux sujets" : ""} — {matiereLabel.toLowerCase()} {libClasse}
            </p>
            <p className="mt-2 hidden text-sm print:block">Nom : ................................................ Classe : ..........</p>

            <div className="screen-only mt-5 flex flex-wrap items-center gap-2">
              <ModeClasse sousTitre={sousTitreClasse} slides={slides} />
              <button type="button" onClick={() => window.print()} className={BOUTON}>
                <Printer className="h-4 w-4" />
                Imprimer
              </button>
              {duo ? (
                <select
                  value={impression}
                  onChange={(e) => setImpression(e.target.value as "cote" | "separe")}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700"
                  aria-label="Mise en page à l'impression"
                >
                  <option value="cote">À l&apos;impression : A et B côte à côte</option>
                  <option value="separe">À l&apos;impression : un sujet par page</option>
                </select>
              ) : null}
              <button type="button" onClick={() => allerA({ t: String(graine + 1) })} className={BOUTON}>
                <Shuffle className="h-4 w-4" />
                Un autre tirage
              </button>
              <button type="button" onClick={() => allerA({ duo: duo ? "0" : "1", t: "1" })} className={BOUTON}>
                {duo ? "Passer à un seul sujet" : "Passer à deux sujets (gauche / droite)"}
              </button>
              <button type="button" onClick={copierLien} className={BOUTON}>
                <Link2 className="h-4 w-4" />
                Copier le lien
              </button>
              {modifie ? (
                <button
                  type="button"
                  onClick={() => window.confirm("Revenir au tirage d'origine ?") && setEtat(etatInitial)}
                  className={BOUTON}
                >
                  <RotateCcw className="h-4 w-4" />
                  Annuler mes modifications
                </button>
              ) : null}
            </div>
            <p className="screen-only mt-3 text-xs text-slate-500">
              ✏️ Double-clic sur un texte (énoncé, correction, rappel, titre) pour le modifier, ici ou en mode classe.
              Tes modifications restent enregistrées sur cet ordinateur.
            </p>
            {message ? (
              <p className="screen-only mt-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-800">{message}</p>
            ) : null}
          </header>

          {!total ? (
            <p className="pt-8 text-slate-500">
              Aucun exercice pour cette sélection. Ouvre « Modifier la sélection » et coche une notion.
            </p>
          ) : null}

          {/* La feuille telle qu'on la voit ; à l'impression « un sujet par page »,
              elle cède la place aux deux sujets séparés plus bas. */}
          <div className={duo && impression === "separe" ? "print:hidden" : ""}>
            {blocs.map((b) => (
              <Fragment key={b.niveau}>{bloc({ niveau: b.niveau, lignes: b.lignes })}</Fragment>
            ))}
          </div>

          {duo && impression === "separe"
            ? cotes.map((c, i) => (
                <div key={c} className="hidden print:block" style={i ? { breakBefore: "page" } : undefined}>
                  <p className={`pt-4 text-xl font-black uppercase ${STYLES_COTE[c].etiquette}`}>
                    {c === "a" ? "Sujet A" : "Sujet B"} — {etat.titre}
                  </p>
                  <p className="mt-1 text-sm">Nom : ................................................ Classe : ..........</p>
                  {blocs.map((b) => (
                    <Fragment key={b.niveau}>{bloc({ niveau: b.niveau, lignes: b.lignes, seul: c })}</Fragment>
                  ))}
                </div>
              ))
            : null}

          {/* Les corrigés, sur leurs propres pages — papier seulement. */}
          <section className="corrections-a-part hidden print:block">
            {cotes.map((c) => (
              <div key={c} className="mb-6">
                <h2 className="flex items-center gap-2 text-xl font-black text-slate-900">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 print:hidden" />
                  {insecables(`Corrigés${duo ? ` du sujet ${c.toUpperCase()}` : ""} : ${etat.titre}`)}
                </h2>
                <ol className="mt-3 grid gap-3 text-xs leading-5 text-slate-700">
                  {blocs.flatMap((b) =>
                    b.lignes.map(({ l, index }) => {
                      const ex = exercice(l[c]!);
                      return (
                        <li key={ex.id} className="whitespace-pre-line">
                          <span className="font-black text-slate-900">
                            {numeros.get(index)}
                            {duo ? c.toUpperCase() : ""}. {ex.titre ? <TexteMath>{ex.titre}</TexteMath> : null}
                          </span>
                          {ex.titre ? "\n" : " "}
                          <TexteMath>{ex.correction}</TexteMath>
                          {ex.schema ? <span className="mt-2 block max-w-xs whitespace-normal">{ex.schema}</span> : null}
                        </li>
                      );
                    }),
                  )}
                </ol>
              </div>
            ))}
          </section>

          <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 print:mt-6">
            <span>eleveai.fr - Feuille d&apos;exercices composée</span>
            <a href={coachHref} className="screen-only font-bold text-sky-600 hover:underline">
              Encore des exercices comme ceux-là, avec le Coach
            </a>
            <span className="hidden print:inline">{libClasse}</span>
          </footer>
        </section>
      </article>

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
          }
          [data-exercice],
          [data-entete-serie] {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
}

const BOUTON =
  "inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm transition hover:bg-sky-50";



// ── Les diapos du mode classe ────────────────────────────────────────────────
// Tailles calées à 1280 × 800 sur les feuilles de dérivation de 1re (28/09) :
// la taille suit le POIDS du texte, comme la section « corrige » du mode classe.
// ⚠️ Une correction, c'est huit étapes COURTES : ses LIGNES pèsent plus que ses
// signes (mesuré : 367 signes en 24 px débordaient). Chaque ligne compte donc
// pour 40 à 50 signes ; une figure empilée dans une demi-colonne, pour 350.

type Changer = (id: string, champ: "enonce" | "correction" | "titre", v: string) => void;

const poids = (texte: string, parLigne: number) => texte.length + parLigne * texte.split("\n").length;

function taille(n: number) {
  if (n <= 260) return "text-3xl";
  if (n <= 560) return "text-2xl";
  if (n <= 900) return "text-xl";
  return "text-lg";
}

/** Au-delà, A et B ne tiennent pas côte à côte : une diapo chacun. */
const SEUIL_DUO = 1250;

/** Le poids d'une diapo d'énoncés : celui du côté le plus lourd, pour que A
 *  et B s'affichent À LA MÊME TAILLE (deux voisins, deux textes égaux). */
function poidsEnonces(exercices: ExerciceCompose[], duo: boolean) {
  return Math.max(
    ...exercices.map((ex) => {
      const p = poids(`${ex.titre ?? ""}\n${ex.enonce}`, 40);
      // Seul sur la diapo, la figure prend une colonne de 22rem à gauche : le
      // texte n'a plus que les deux tiers de la largeur.
      return duo ? p * 2 + (ex.figure ? 350 : 0) : p * (ex.figure ? 1.6 : 1);
    }),
  );
}

/** Seuil au-delà duquel une correction se projette question par question. */
const SEUIL_CORRECTION = 800;

/** Combien de dessins porte un corrigé : un fragment peut en empiler deux. */
function nbDessins(schema: ReactNode): number {
  if (!schema) return 0;
  if (isValidElement<{ children?: ReactNode }>(schema) && schema.type === Fragment) {
    return Children.toArray(schema.props.children).length;
  }
  return 1;
}

/** Avec un dessin, le texte perd un tiers de la largeur ; avec deux, la moitié. */
const poidsCorrection = (texte: string, schema: ReactNode) =>
  poids(texte, 50) * [1, 1.5, 2][Math.min(2, nbDessins(schema))];

/** Les sous-questions d'un problème, si sa correction est trop lourde pour une
 *  diapo ET que ses lettres répondent à celles de l'énoncé ; sinon null. */
function partiesProjetables(ex: ExerciceCompose): { lettre: string; rang: number }[] | null {
  if (poidsCorrection(ex.correction, ex.schema) <= SEUIL_CORRECTION) return null;
  const e = decouper(ex.enonce);
  const c = decouper(ex.correction);
  const memes =
    e.parties.length >= 2 &&
    e.parties.length === c.parties.length &&
    e.parties.every((p, i) => p.lettre === c.parties[i].lettre);
  return memes ? e.parties.map((p, rang) => ({ lettre: p.lettre, rang })) : null;
}

/** A à gauche, B à droite — ou un seul énoncé en pleine largeur. */
function DiapoEnonces({
  ids,
  duo,
  cote,
  exercice,
  changerTexte,
}: {
  ids: string[];
  duo: boolean;
  /** Un seul sujet sur la diapo (problème trop long pour deux). */
  cote?: Cote;
  exercice: (id: string) => ExerciceCompose;
  changerTexte: Changer;
}) {
  const exercices = ids.map(exercice);
  const cote2 = ids.length === 2;
  const classeTaille = taille(poidsEnonces(exercices, cote2));
  return (
    <div className={cote2 ? "grid gap-5 lg:grid-cols-2" : "grid gap-5"}>
      {exercices.map((ex, i) => {
        const id = ids[i];
        const c: Cote | undefined = cote ?? (duo ? (i === 0 ? "a" : "b") : undefined);
        const st = c ? STYLES_COTE[c] : null;
        const figure = ex.figure ? (
          <div className={`mx-auto w-full ${cote2 ? "max-w-[12rem]" : "max-w-[22rem]"} [&_svg]:w-full`}>
            <LargeurProjetee.Provider value={320}>{ex.figure}</LargeurProjetee.Provider>
          </div>
        ) : null;
        const texte = (
          <div className="min-w-0">
            {ex.titre ? (
              <TexteEditable
                valeur={ex.titre}
                onChange={(v) => changerTexte(id, "titre", v)}
                className="mb-2 text-xl font-black text-slate-950"
                crayon="toujours"
                grand
              />
            ) : null}
            <TexteEditable
              valeur={ex.enonce}
              onChange={(v) => changerTexte(id, "enonce", v)}
              className={`font-black leading-tight text-slate-950 ${classeTaille}`}
              crayon="toujours"
              grand
            />
          </div>
        );
        return (
          <div key={id} className={`flex min-w-0 flex-col gap-3 rounded-3xl border-4 p-5 ${st ? st.carte : "border-cyan-200 bg-cyan-50"}`}>
            {st ? <p className={`text-lg font-black uppercase ${st.etiquette}`}>{st.titre}</p> : null}
            {figure && !cote2 ? (
              <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start">
                {figure}
                {texte}
              </div>
            ) : (
              <>
                {texte}
                {figure}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** La correction d'UN sujet — entière, ou d'une seule question (`partie`) —
 *  en pleine largeur, derrière « Révéler ». */
function DiapoCorrection({
  id,
  cote,
  partie,
  revealed,
  reveal,
  exercice,
  changerTexte,
}: {
  id: string;
  cote?: Cote;
  partie?: number;
  revealed: boolean;
  reveal: () => void;
  exercice: (id: string) => ExerciceCompose;
  changerTexte: Changer;
}) {
  const ex = exercice(id);
  const st = cote ? STYLES_COTE[cote] : null;

  let rappel = ex.enonce;
  let texte = ex.correction;
  let ecrire = (v: string) => changerTexte(id, "correction", v);
  if (partie !== undefined) {
    const e = decouper(ex.enonce);
    const c = decouper(ex.correction);
    rappel = [...e.preambule, ...(e.parties[partie]?.lignes ?? [])].join("\n");
    texte = [...(partie === 0 ? c.preambule : []), ...(c.parties[partie]?.lignes ?? [])].join("\n");
    // On réécrit la question modifiée à sa place dans la correction entière.
    ecrire = (v: string) => {
      const lignes = v.split("\n").map((x) => x.trim()).filter(Boolean);
      // À la question a), le préambule du corrigé était affiché avec elle : il
      // revient donc dans `lignes`.
      const morceaux = c.parties.map((p, i) => (i === partie ? lignes : p.lignes));
      const preambule = partie === 0 ? [] : c.preambule;
      changerTexte(id, "correction", [...preambule, ...morceaux.flat()].join("\n"));
    };
  }
  const schema = partie === undefined || partie === (decouper(ex.correction).parties.length - 1) ? ex.schema : undefined;

  return (
    <div className="grid gap-4">
      {/* L'énoncé en rappel, discret : on corrige en le relisant. */}
      <div className={`rounded-2xl border-2 px-4 py-3 ${st ? st.carte : "border-cyan-200 bg-cyan-50"}`}>
        <div className={`${partie === undefined ? "line-clamp-2" : "line-clamp-3"} whitespace-pre-line text-base font-bold leading-snug text-slate-600`}>
          <TexteMath>{rappel}</TexteMath>
        </div>
      </div>
      <div className="rounded-3xl border-4 border-emerald-200 bg-emerald-50 p-5">
        {revealed ? (
          <div
            className={
              nbDessins(schema) >= 2
                ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-start"
                : schema
                  ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] lg:items-start"
                  : ""
            }
          >
            <TexteEditable
              valeur={texte}
              onChange={ecrire}
              className={`font-bold leading-snug text-slate-950 ${taille(poidsCorrection(texte, schema) * 1.1)}`}
              crayon="toujours"
              grand
            />
            {/* ⚠️ Un corrigé peut dessiner DEUX tableaux (signes puis variations) :
                empilés, 421 px de haut (mesuré le 28/09). Côte à côte ici, chacun
                plafonné en largeur — donc en hauteur. */}
            {schema ? (
              <div className="flex w-full items-start justify-center gap-3 [&>*]:min-w-0 [&>*]:max-w-[17rem] [&>*]:flex-1 [&_svg]:w-full">
                <LargeurProjetee.Provider value={320}>{schema}</LargeurProjetee.Provider>
              </div>
            ) : null}
          </div>
        ) : (
          <button
            type="button"
            onClick={reveal}
            className="rounded-full bg-emerald-500 px-8 py-5 text-2xl font-black text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            Révéler la correction
          </button>
        )}
      </div>
    </div>
  );
}
