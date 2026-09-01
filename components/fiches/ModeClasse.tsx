"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, Maximize, Minimize, Monitor } from "lucide-react";
// ⭐ Le mode classe ne passe PAS par `TexteMath` — il rend le texte brut. Il lui
// faut donc sa propre pose d'insécables, et c'est l'écran qui compte le plus :
// une coupure fautive projetée au tableau se voit de tout le fond de la classe.
import { insecables, typographier } from "@/lib/fiches/typographie";
import { LargeurProjetee } from "@/lib/canvas/largeur-projetee";

/** ⭐ Largeur de repli des canvas projetés, en unités de viewBox. Réglée par la
 *  mesure du 01/09/2026 : voir le commentaire du provider, plus bas. */
const LARGEUR_PROJETEE = 320;

/**
 * Mode classe : version vidéoprojetable d'une fiche de cours.
 *
 * Composant autonome : il affiche son propre bouton déclencheur (à glisser
 * dans la barre d'actions de la fiche) puis ouvre un overlay plein écran
 * piloté par des « slides ». Le style est volontairement identique d'une fiche
 * à l'autre (palette emerald/cyan/amber) pour une projection cohérente.
 *
 * Navigation : flèches ← →, Espace/Entrée pour révéler, Échap pour quitter.
 */

type Variante = "info" | "histoire" | "piege" | "ok";

const VARIANTES: Record<Variante, { carte: string; label: string }> = {
  info: { carte: "border-cyan-200 bg-cyan-50", label: "text-cyan-700" },
  histoire: { carte: "border-amber-200 bg-amber-50", label: "text-amber-700" },
  piege: { carte: "border-amber-200 bg-amber-50", label: "text-amber-700" },
  ok: { carte: "border-emerald-200 bg-emerald-50", label: "text-emerald-700" },
};

/* ⭐⭐ LES COULEURS DU MODE CLASSE — 31/08/2026, demande de Frédéric : « en mode
   classe les élèves ont besoin de couleurs ! »
   Le constat mesuré avant de toucher à quoi que ce soit : `slidesDepuisFiche`
   rend la DÉFINITION, les PROPRIÉTÉS, la MÉTHODE, le RÉEL et l'HISTOIRE en
   section `objectif`, c'est-à-dire du texte noir sur fond pâle. Soit environ
   les deux tiers d'un diaporama sans une seule couleur, pendant que seuls les
   exemples et les exercices en avaient.
   ⭐ Une teinte par NATURE DE BLOC, pas par slide : l'élève apprend en trois
   diapos que le violet est une propriété et le rose un piège. La couleur porte
   une information, elle ne décore pas.
   ⚠️ Le violet est celui des arcs du `PhraseCanvas`, gardé sur demande
   explicite de Frédéric le même jour (« j'aime bien le violet »).
   ⚠️ Palette pâle imposée : fond 50, bordure 200, texte 700. Un fond saturé
   au vidéoprojecteur mange le texte noir. */
export type TeinteSlide =
  | "objectif"
  | "definition"
  | "propriete"
  | "methode"
  | "reel"
  | "histoire"
  | "piege"
  | "essentiel"
  | "exemple"
  | "exercice";

const TEINTES: Record<TeinteSlide, { carte: string; badge: string; accent: string }> = {
  objectif: { carte: "border-emerald-200 bg-emerald-50", badge: "text-emerald-700", accent: "text-emerald-600" },
  definition: { carte: "border-sky-200 bg-sky-50", badge: "text-sky-700", accent: "text-sky-600" },
  propriete: { carte: "border-violet-200 bg-violet-50", badge: "text-violet-700", accent: "text-violet-600" },
  methode: { carte: "border-amber-200 bg-amber-50", badge: "text-amber-700", accent: "text-amber-600" },
  reel: { carte: "border-teal-200 bg-teal-50", badge: "text-teal-700", accent: "text-teal-600" },
  histoire: { carte: "border-orange-200 bg-orange-50", badge: "text-orange-700", accent: "text-orange-600" },
  piege: { carte: "border-rose-200 bg-rose-50", badge: "text-rose-700", accent: "text-rose-600" },
  essentiel: { carte: "border-emerald-200 bg-emerald-50", badge: "text-emerald-700", accent: "text-emerald-600" },
  exemple: { carte: "border-cyan-200 bg-cyan-50", badge: "text-cyan-700", accent: "text-cyan-600" },
  exercice: { carte: "border-amber-200 bg-amber-50", badge: "text-amber-700", accent: "text-amber-600" },
};

export type ClasseSection =
  | {
      type: "objectif";
      phrase: string;
      sousPhrase?: string;
      encadre?: { titre: string; texte: string };
    }
  | {
      type: "duo";
      gauche: { variante?: Variante; titre: string; contenu: ReactNode };
      droite: { variante?: Variante; titre: string; contenu: ReactNode };
    }
  | { type: "cartes"; cartes: { titre: string; texte: string }[] }
  | { type: "etapes"; etapes: string[] }
  | {
      type: "exemple";
      enonce: string;
      question: string;
      correction: string;
    }
  | {
      type: "exercice";
      enonce: string;
      question?: string;
      indice?: string;
      correction: string;
    };

export type ClasseSlide = {
  titre: string;
  badge: string;
  section: ClasseSection;
  /** La nature du bloc, qui décide de la couleur. Défaut : « objectif ». */
  teinte?: TeinteSlide;
  /**
   * Le DESSIN de la slide, projeté à côté du texte.
   *
   * ⛔ Ajouté le 20/08/2026. Le mode classe était resté un diaporama de texte
   * pendant que les fiches devenaient visuelles : aucune section ne pouvait
   * porter une figure, alors que le prof projette justement pour MONTRER.
   * Frédéric : « le mode classe est vraiment essentiel pour les profs ».
   */
  schema?: ReactNode;
};

const BTN_REVELER =
  "mt-8 self-start rounded-full bg-emerald-500 px-8 py-5 text-2xl font-black text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400";

/** ⭐ LA TAILLE D'UNE PHRASE PROJETÉE DÉPEND DE SA LONGUEUR (30/08/2026).
 *  Les seuils sont calés sur ce qui tient dans la colonne de gauche du mode
 *  classe, la plus étroite : une phrase de quarante signes garde la pleine
 *  taille, trois phrases descendent de deux crans.
 *  ⚠️ On ne descend jamais sous `text-2xl` : au-delà, mieux vaut raccourcir le
 *  texte de la fiche que le rendre illisible du fond de la classe. Le
 *  conteneur garde son `overflow-y-auto` comme filet — il ne doit plus servir,
 *  mais couper du texte serait pire que le faire défiler. */
function tailleProjetee(texte: string): string {
  const n = texte.length;
  if (n <= 40) return "text-5xl";
  if (n <= 90) return "text-4xl";
  if (n <= 170) return "text-3xl";
  return "text-2xl";
}

function Section({
  section,
  revealed,
  reveal,
  teinte = "objectif",
}: {
  teinte?: TeinteSlide;
  section: ClasseSection;
  revealed: boolean;
  reveal: () => void;
}) {
  const t = TEINTES[teinte];
  switch (section.type) {
    // ⛔⛔ UNE DIAPO DOIT TENIR DANS L'ÉCRAN — Frédéric, le 30/08/2026, capture à
    // l'appui : « pas bien, il faut une hauteur de section maximum ». Sur la
    // propriété 4, le titre était coupé en haut et le texte débordait en bas.
    // La cause : `phrase` était rendu à `text-5xl` QUELLE QUE SOIT SA LONGUEUR.
    // Trois phrases à cette taille, dans une colonne étroite, ne peuvent pas
    // tenir — et le conteneur se contentait de défiler.
    // ⭐ `tailleProjetee` fait donc dépendre la taille du NOMBRE DE SIGNES. Pas
    // de mesure au rendu, pas de JavaScript : le calcul est le même au premier
    // affichage qu'au redimensionnement, et il ne peut pas osciller.
    case "objectif":
      return (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ⭐ La carte teintée remplace le texte nu (31/08/2026). C'était la
              section la plus fréquente du diaporama et la seule sans couleur. */}
          {/* ⚠️ Padding volontairement serré : mesuré le 31/08, une carte en
              `p-5 lg:p-7` coutait une soixantaine de pixels de hauteur sur des
              diapos déjà justes. La couleur ne demande pas d'espace. */}
          <div className={`rounded-3xl border-4 p-3 lg:p-4 ${t.carte}`}>
            <p className={`${tailleProjetee(section.phrase)} font-black leading-tight text-slate-950`}>
              {section.phrase}
            </p>
            {section.sousPhrase ? (
              <p className="mt-5 text-xl font-bold leading-snug text-slate-600 lg:text-2xl">
                {section.sousPhrase}
              </p>
            ) : null}
          </div>
          {section.encadre ? (
            <div className="rounded-3xl border-4 border-emerald-200 bg-emerald-50 p-8">
              <p className="text-2xl font-black uppercase text-emerald-700">
                {section.encadre.titre}
              </p>
              <p className="mt-3 text-xl font-bold leading-snug text-slate-700 lg:text-2xl">
                {section.encadre.texte}
              </p>
            </div>
          ) : null}
        </div>
      );

    case "duo":
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          {[section.gauche, section.droite].map((panel, index) => {
            const v = VARIANTES[panel.variante ?? "info"];
            return (
              <div
                key={index}
                className={`rounded-3xl border-4 p-10 ${v.carte}`}
              >
                <p className={`text-3xl font-black uppercase ${v.label}`}>
                  {panel.titre}
                </p>
                <div className="mt-5 text-3xl font-black leading-snug text-slate-950">
                  {panel.contenu}
                </div>
              </div>
            );
          })}
        </div>
      );

    case "cartes":
      return (
        <div className="grid gap-6 lg:grid-cols-3">
          {section.cartes.map((carte, index) => (
            <div
              key={carte.titre}
              className={`rounded-3xl border-4 p-8 shadow-sm ${t.carte}`}
            >
              <p className={`text-6xl font-black ${t.accent}`}>
                {index + 1}
              </p>
              <p className="mt-4 text-3xl font-black leading-tight text-slate-950">
                {carte.titre}
              </p>
              <p className="mt-3 text-2xl font-bold leading-snug text-slate-600">
                {carte.texte}
              </p>
            </div>
          ))}
        </div>
      );

    case "etapes":
      return (
        <div className="grid gap-6">
          {section.etapes.map((etape, index) => (
            <div
              key={etape}
              className={`grid items-center gap-5 rounded-3xl border-4 p-7 shadow-sm md:grid-cols-[120px_1fr] ${t.carte}`}
            >
              <p className={`text-5xl font-black ${t.accent}`}>
                {index + 1}
              </p>
              <p className="text-3xl font-black leading-tight text-slate-950">
                {etape}
              </p>
            </div>
          ))}
        </div>
      );

    /* ⛔⛔ EN LIGNES, PAS EN COLONNES (31/08/2026). Frédéric, capture à l'appui :
       « pour les exercices corrigés en mode classe tu mets trois colonnes au lieu
       de mettre 3 lignes, donc on comprend pas ». La diapo empilait le DESSIN,
       l'ÉNONCÉ et la CORRECTION côte à côte : trois colonnes étroites, deux mots
       par ligne, illisibles au vidéoprojecteur.
       ⭐ Un énoncé et sa correction se lisent l'un APRÈS l'autre — c'est un
       ordre, pas une comparaison. Les mettre côte à côte n'apportait rien et
       coutait toute la largeur. */
    case "exemple":
      return (
        <div className="grid gap-6">
          <div className="rounded-3xl border-4 border-cyan-200 bg-cyan-50 p-6 lg:p-8">
            <p className="text-2xl font-black leading-tight text-slate-950 lg:text-3xl">
              {section.enonce}
            </p>
            <p className="mt-4 text-2xl font-black leading-tight text-cyan-700 lg:text-3xl">
              {section.question}
            </p>
          </div>
          <div className="flex flex-col rounded-3xl border-4 border-emerald-200 bg-emerald-50 p-6 lg:p-8">
            <p className="text-2xl font-black uppercase text-emerald-700">
              Correction
            </p>
            {revealed ? (
              <p className="mt-4 text-2xl font-black leading-snug text-slate-950 lg:text-3xl">
                {section.correction}
              </p>
            ) : (
              <button type="button" onClick={reveal} className={BTN_REVELER}>
                Révéler la correction
              </button>
            )}
          </div>
        </div>
      );

    /* Même correction que pour « exemple » : en lignes, jamais en colonnes. */
    case "exercice":
      return (
        <div className="grid gap-6">
          <div className="rounded-3xl border-4 border-cyan-200 bg-cyan-50 p-6 lg:p-8">
            <p className="text-2xl font-black leading-tight text-slate-950 lg:text-3xl">
              {section.enonce}
            </p>
            {section.question ? (
              <p className="mt-4 text-2xl font-black leading-tight text-cyan-700 lg:text-3xl">
                {section.question}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col rounded-3xl border-4 border-amber-200 bg-amber-50 p-6 lg:p-8">
            <p className="text-3xl font-black uppercase text-amber-700">
              Consigne
            </p>
            {section.indice ? (
              <p className="mt-5 text-4xl font-black leading-tight text-slate-950">
                {section.indice}
              </p>
            ) : null}
            {revealed ? (
              <p className="mt-4 text-2xl font-black leading-snug text-emerald-700 lg:text-3xl">
                {section.correction}
              </p>
            ) : (
              <button type="button" onClick={reveal} className={BTN_REVELER}>
                Révéler la correction
              </button>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function ModeClasse({
  sousTitre,
  slides: slidesBrutes,
}: {
  sousTitre: string;
  slides: ClasseSlide[];
}) {
  // ⭐ LA TYPOGRAPHIE SE POSE À L'ENTRÉE, UNE FOIS POUR TOUTES LES SECTIONS.
  // Les diapos arrivent de deux sources — `slidesDepuisFiche` pour la plupart,
  // et le tableau `slides` écrit à la main dans certaines fiches. Les traiter
  // ici les couvre toutes les deux, et couvrira les sections qu'on ajoutera.
  // `typographier` ne descend pas dans les `ReactNode` : les dessins passent
  // intacts.
  const slides = useMemo(() => slidesBrutes.map(typographier), [slidesBrutes]);

  const [ouvert, setOuvert] = useState(false);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [plein, setPlein] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  function aller(suivant: number) {
    setIndex(Math.max(0, Math.min(slides.length - 1, suivant)));
    setRevealed(false);
  }

  function fermer() {
    setOuvert(false);
    setIndex(0);
    setRevealed(false);
  }

  function basculerPlein() {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      overlayRef.current?.requestFullscreen?.();
    }
  }

  useEffect(() => {
    function onFullscreenChange() {
      setPlein(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!ouvert) return;
    function handleKey(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
          event.preventDefault();
          setIndex((current) => Math.min(slides.length - 1, current + 1));
          setRevealed(false);
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          setIndex((current) => Math.max(0, current - 1));
          setRevealed(false);
          break;
        case " ":
        case "Enter":
          event.preventDefault();
          setRevealed(true);
          break;
        case "Escape":
          // En plein écran, le 1er Échap sort du fullscreen ;
          // un second Échap quitte le mode classe.
          if (!document.fullscreenElement) fermer();
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ouvert, slides.length]);

  const declencheur = (
    <button
      type="button"
      onClick={() => setOuvert(true)}
      className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-black text-emerald-700 shadow-sm transition hover:bg-emerald-50"
    >
      <Monitor className="h-4 w-4" />
      Mode classe
    </button>
  );

  if (!ouvert || typeof document === "undefined") {
    return declencheur;
  }

  const slide = slides[index];

  const overlay = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col bg-[#eef8f2] text-slate-950"
    >
      <header className="border-b border-emerald-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={fermer}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la fiche
          </button>
          <div className="text-center">
            <p className="text-sm font-black uppercase text-emerald-700">
              Mode classe
            </p>
            <p className="text-xl font-black text-slate-950">
              {insecables(sousTitre)}
            </p>
            <p className="mt-0.5 text-xs font-bold text-slate-400">
              ← → naviguer · Espace révéler · Échap quitter
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={basculerPlein}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              {plein ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
              {plein ? "Quitter" : "Plein écran"}
            </button>
            <button
              type="button"
              onClick={() => aller(index - 1)}
              disabled={index === 0}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Précédent
            </button>
            <button
              type="button"
              onClick={() => aller(index + 1)}
              disabled={index === slides.length - 1}
              className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Suivant
            </button>
          </div>
        </div>
      </header>

      {/* ⭐ HAUTEUR DE DIAPO — 30/08/2026, demande de Frédéric : « il faut une
          hauteur de section maximum ». Mesure à 1280×800 AVANT de toucher à
          quoi que ce soit : 11 diapos sur 28 débordaient, au pire de 196 px.
          Le cout fixe venait des MARGES, pas du texte : `py-8` + `p-10` + `mb-8`
          perdent à eux seuls plus de 200 px en haut et en bas. Ils se resserrent
          donc sur les écrans courts et retrouvent leur ampleur en `lg`.
          ⚠️ La toute première mesure, faite dans un panneau de 49 px de haut,
          annonçait « les 28 débordent, jusqu'à 1978 px ». Un étalon cassé
          invente un problème : fixer la fenêtre AVANT de conclure. */}
      <section className="flex flex-1 items-center overflow-y-auto px-6 py-3 lg:py-6">
        <div className="mx-auto w-full max-w-7xl rounded-[2rem] border-4 border-white bg-white/90 p-5 shadow-2xl shadow-emerald-900/10 lg:p-8">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-4 lg:mb-6">
            <div>
              <p className={`text-2xl font-black uppercase ${TEINTES[slide.teinte ?? "objectif"].badge}`}>
                {slide.badge}
              </p>
              <h2 className="mt-3 text-6xl font-black tracking-normal text-slate-950">
                {slide.titre}
              </h2>
            </div>
            <p className="rounded-full bg-slate-100 px-5 py-3 text-xl font-black text-slate-700">
              {index + 1} / {slides.length}
            </p>
          </div>
          {slide.schema ? (
            /* Le dessin à gauche, le texte à droite : en vidéoprojection, la
               figure est ce qu'on regarde, elle prend la moitié de l'écran.
               ⛔⛔ SAUF POUR UN EXERCICE (31/08/2026). Là, la section se déplie
               déjà en lignes — énoncé PUIS correction — et lui coller le dessin
               à côté redonnait exactement les TROIS COLONNES que Frédéric a
               signalées. Sur un exercice, tout s'empile : le dessin, l'énoncé,
               la correction. Trois lignes, pleine largeur, dans l'ordre où on
               les lit. */
            <div
              className={
                slide.section.type === "exemple" || slide.section.type === "exercice"
                  ? "grid gap-6"
                  : "grid gap-6 lg:grid-cols-2 lg:gap-10"
              }
            >
              {/* ⛔ LE DESSIN ÉTAIT LA VRAIE CAUSE DU DÉBORDEMENT — mesuré le
                  30/08/2026 sur la diapo 20 : contenu 850 px pour 701 visibles,
                  dont 355 px de SVG. J'avais d'abord accusé la longueur des
                  textes et je les ai raccourcis pour rien : la mesure n'a bougé
                  que de 7 px. Le canvas se rendait à sa taille naturelle.
                  ⭐ Il est maintenant plafonné à 40 % de la hauteur d'écran et
                  se met à l'échelle sans se déformer. Un dessin plus petit reste
                  à sa taille : le plafond ne s'applique qu'aux grands. */}
              {/* ⚠️ Plafonner le SVG pendant qu'il garde `w-full` ne sert à rien :
                  la largeur impose la hauteur par le rapport d'image. C'est le
                  CONTENEUR qu'il faut borner, en laissant le dessin s'y adapter.
                  ⛔⛔ MAIS CE PLAFOND NE RÈGLE PAS LES DÉBORDEMENTS RESTANTS, et
                  il ne faut pas le croire : mesuré le 30/08, les sept diapos qui
                  dépassent encore (au pire 149 px) n'empruntent PAS ce chemin.
                  Elles sont de type `exemple` et dessinent leur figure DANS la
                  section, sous `grid gap-8 lg:grid-cols-[1fr_0.85fr]`. C'est là
                  qu'il faudra porter le même plafond. Trois mesures identiques
                  au pixel près m'ont mis sur la piste — quand un chiffre ne
                  bouge pas d'un iota, le correctif n'atteint pas sa cible. */}
              {/* ⛔⛔ PLAFOND RETIRÉ LE 31/08/2026 — c'était une régression de ma
                  main. J'avais borné le conteneur (`max-h-[42vh] overflow-hidden`)
                  et mis `[&_svg]:w-auto` pour faire tenir les diapos. Deux
                  constats : d'une part la mesure n'avait PAS bougé d'un pixel,
                  donc ça ne corrigeait rien ; d'autre part, privé de largeur, le
                  SVG s'effondrait — Frédéric a vu un cercle vide à la place du
                  dessin. Un correctif qui ne corrige rien et qui casse s'enlève.
                  ⭐ La vraie cause du débordement était ailleurs : les trois
                  colonnes des exercices, corrigées le même jour. */}
              {/* ⭐ LE MODE CLASSE IMPOSE SA LARGEUR DE REPLI (01/09/2026).
                  Les fiches écrivent `largeurMax: 190`, calé sur leur carte de
                  222 px : projeté, le dessin se plie à un mot par ligne et
                  monte à 702 px de haut dans une diapo qui en montre 621.
                  Voir lib/canvas/largeur-projetee.tsx pour les mesures. */}
              <div className="mx-auto w-full max-w-xl [&_svg]:w-full">
                <LargeurProjetee.Provider value={LARGEUR_PROJETEE}>
                  {slide.schema}
                </LargeurProjetee.Provider>
              </div>
              <Section
                section={slide.section}
                teinte={slide.teinte}
                revealed={revealed}
                reveal={() => setRevealed(true)}
              />
            </div>
          ) : (
            <Section
              section={slide.section}
                teinte={slide.teinte}
              revealed={revealed}
              reveal={() => setRevealed(true)}
            />
          )}
        </div>
      </section>
    </div>
  );

  return (
    <>
      {declencheur}
      {createPortal(overlay, document.body)}
    </>
  );
}
