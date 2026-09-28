import type { Metadata } from "next";
import ComposeurClient, { type FeuilleSource } from "@/components/fiches-exercices/ComposeurClient";
import SelecteurComposeur, { type FeuilleAChoisir } from "@/components/fiches-exercices/SelecteurComposeur";
import { CHARGEURS_FICHES_EXERCICES } from "@/lib/fiches-exercices/chargeurs";
import { lireSelection, type ExerciceCompose } from "@/lib/fiches-exercices/composer";
import { FICHES_EXERCICES_REGISTRE } from "@/lib/fiches-exercices/registre";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { getMicroLabelMathMap, type Classe } from "@/lib/tutor-v4/catalog";

// ⭐ La feuille COMPOSÉE (28/09/2026) — voir lib/fiches-exercices/composer.ts.
// Une adresse par sélection : c'est ce qui permet au professeur de la donner à
// ses élèves. Mais elle n'a rien à faire dans Google : autant de pages que de
// combinaisons, et toutes répètent des feuilles déjà publiées.
export const metadata: Metadata = {
  title: "Composer une feuille d'exercices corrigés",
  description:
    "Cochez les notions et les compétences : la feuille se compose avec les exercices corrigés d'eleveai.fr, en un ou deux sujets (gauche et droite), à imprimer ou à projeter.",
  robots: { index: false, follow: true },
};

type Params = Record<string, string | string[] | undefined>;

const un = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/** Les feuilles d'une classe, dans l'ordre du registre (celui du coach). */
function clesDeLaClasse(c: string) {
  return Object.keys(FICHES_EXERCICES_REGISTRE).filter((k) => k.startsWith(`${c}/`));
}

function libellesMicros(classe: string): Record<string, string> {
  try {
    return getMicroLabelMathMap(classe as Classe, "maths");
  } catch {
    return {};
  }
}

export default async function ComposerPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const c = un(params.c).toLowerCase();
  const [matiere = "maths", classe = ""] = c.split("/");
  const selection = lireSelection(params.s);
  const nb = Math.max(1, Math.min(40, Number.parseInt(un(params.nb), 10) || 10));
  const duo = un(params.duo) !== "0";
  const graine = Number.parseInt(un(params.t), 10) || 1;

  // Les classes qui ont des feuilles : le choix de départ.
  const classes = [...new Set(Object.keys(FICHES_EXERCICES_REGISTRE).map((k) => k.split("/").slice(0, 2).join("/")))];
  const cles = classe ? clesDeLaClasse(`${matiere}/${classe}`) : [];

  // Toutes les feuilles de la classe, pour le sélecteur : leurs micros se
  // LISENT dans les exercices, on ne propose pas une micro sans exercice.
  const donnees = new Map<string, FicheExercicesData>();
  await Promise.all(
    cles.map(async (cle) => {
      const charger = CHARGEURS_FICHES_EXERCICES[cle];
      if (charger) donnees.set(cle, await charger());
    }),
  );
  const libelles = libellesMicros(classe);
  const aChoisir: FeuilleAChoisir[] = cles
    .filter((cle) => donnees.has(cle))
    .map((cle) => {
      const fiche = donnees.get(cle)!;
      const compte = new Map<string, number>();
      for (const s of fiche.series) for (const ex of s.exercices) for (const m of ex.micros ?? []) compte.set(m, (compte.get(m) ?? 0) + 1);
      return {
        slug: cle.split("/")[2],
        titre: fiche.titre,
        microsParExercice: fiche.series.flatMap((s) => s.exercices.map((ex) => ex.micros ?? [])),
        micros: [...compte.entries()].map(([id, n]) => ({ id, libelle: libelles[id] ?? id, nb: n })),
      };
    });

  const selecteur = (
    <SelecteurComposeur
      classes={classes}
      c={classe ? `${matiere}/${classe}` : ""}
      feuilles={aChoisir}
      selection={selection}
      nb={nb}
      duo={duo}
    />
  );

  if (!classe || !selection.length) {
    return (
      <main className="min-h-screen bg-[#f5f8ff] px-5 py-8 text-slate-800 sm:px-8">
        <div className="mx-auto max-w-5xl">{selecteur}</div>
      </main>
    );
  }

  // Le réservoir : les exercices des feuilles cochées, filtrés par micros.
  const reservoir: ExerciceCompose[] = [];
  const feuilles: FeuilleSource[] = [];
  for (const choix of selection) {
    const fiche = donnees.get(`${matiere}/${classe}/${choix.slug}`);
    if (!fiche) continue;
    feuilles.push({
      slug: choix.slug,
      titre: fiche.titre,
      series: fiche.series.map((s) => ({ niveau: s.niveau, titre: s.titre, rappel: s.rappel })),
    });
    let rang = 0;
    for (const s of fiche.series) {
      for (const ex of s.exercices) {
        rang += 1;
        const retenu = !choix.micros.length || (ex.micros ?? []).some((m) => choix.micros.includes(m));
        if (retenu) reservoir.push({ ...ex, id: `${choix.slug}#${rang}`, niveau: s.niveau, source: choix.slug });
      }
    }
  }

  const premiere = donnees.get(`${matiere}/${classe}/${selection[0].slug}`);
  return (
    <ComposeurClient
      // La clé remonte l'état à chaque nouvelle sélection ou nouveau tirage.
      key={JSON.stringify([c, params.s, nb, duo, graine])}
      matiereLabel={premiere?.matiereLabel ?? "Mathématiques"}
      classe={classe}
      coachHref={premiere?.coachHref ?? `/coach-ia/${matiere}`}
      feuilles={feuilles}
      reservoir={reservoir}
      nb={nb}
      duo={duo}
      graine={graine}
      selecteur={selecteur}
    />
  );
}
