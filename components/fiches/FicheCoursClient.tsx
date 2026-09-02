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
import { slidesDepuisFiche } from "@/lib/fiches/slidesDepuisFiche";
import Flashcards from "@/components/fiches/Flashcards";
import VideoNotion from "@/components/fiches/VideoNotion";
import EncartsFiche from "@/components/fiches/EncartsFiche";
import { libelleClasse } from "@/lib/fiches/registre";
import { DOSSIER_PDF, nomPdf } from "@/lib/fiches/pdf";
import { PDF_DISPONIBLES } from "@/lib/fiches/pdf-disponibles";
import TexteMath from "@/components/fiches/TexteMath";
import { insecables } from "@/lib/fiches/typographie";
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

/**
 * ⭐ LE CYCLE 2 S'IMPRIME AUTREMENT (02/09/2026).
 *
 * Un CP ne lit pas sa fiche : sur le papier, ce qu'il tient est une FEUILLE À
 * FAIRE — le dessin, sa consigne de coloriage, la ligne à recopier. Les blocs
 * écrits pour l'adulte (à quoi ça sert, méthode, exemples, pièges, exercices)
 * restent à l'écran, où l'adulte les lit.
 *
 * ⚠️ C'est un attribut sur l'article, pas un réglage de la fiche : les 161
 * fiches existantes n'ont rien à changer, et les 45 notions de CP, CE1 et CE2
 * l'auront sans qu'on ait à y penser.
 */
const CYCLE_2 = new Set(["cp", "ce1", "ce2"]);

const ICONES_METHODE = [BookOpen, Lightbulb, CheckCircle2];
const STYLES_METHODE = [
  { carte: "border-sky-200 bg-sky-50", icone: "text-sky-500" },
  { carte: "border-amber-200 bg-amber-50", icone: "text-amber-500" },
  { carte: "border-emerald-200 bg-emerald-50", icone: "text-emerald-500" },
];

/**
 * Le titre de la fiche tel qu'il se pose APRÈS un deux-points.
 *
 * En français, ce qui suit un deux-points ne prend pas de majuscule :
 * « Définition : les fractions ». Mais on ne peut pas abaisser l'initiale de
 * n'importe quoi — « Définition : pythagore » serait une faute, et une faute
 * visible. La règle ne touche donc QUE les titres qui commencent par un article
 * défini ou indéfini : aucun nom propre ne commence par « Les », « Un » ou
 * « L' ». Tout le reste est rendu intact.
 */
const ARTICLES = ["Le ", "La ", "Les ", "L'", "L’", "Un ", "Une ", "Des ", "Du "];
/**
 * Le titre de la fiche, prêt à suivre un deux-points : « Les angles » devient
 * « les angles », pour écrire « Définition : les angles ».
 *
 * ⭐ TOUS LES H2 RAPPELLENT LA NOTION (Frédéric, 25/08/2026). Quatre le
 * faisaient déjà (Définition, Propriétés, Méthode, Exercices corrigés) ; sept
 * restaient génériques — « La formule », « À retenir », « Pièges à éviter »…
 * Sur une page, le contexte est donné par le h1 juste au-dessus ; sur un PDF
 * détaché, dans un résultat Google, ou sur la troisième feuille d'une pile
 * imprimée, « À retenir » ne dit plus de quoi. Les onze h2 nomment maintenant la
 * notion.
 */
function apresDeuxPoints(titre: string): string {
  return ARTICLES.some((a) => titre.startsWith(a))
    ? titre[0].toLowerCase() + titre.slice(1)
    : titre;
}

/** ⭐⭐ LE TITRE DE SECTION PERD LA CLASSE ET L'ANNÉE (31/08/2026).
 *
 *  Frédéric : « pourquoi après tu répètes 20 fois en CM1 (2026-2027) ? ».
 *  Mesuré sur la fiche de CM1 : **neuf titres de section sur dix** reprenaient le
 *  titre entier, soit 333 signes de redite sur une page. L'information utile de
 *  chaque titre tient en un mot — Définition, Propriétés, Méthode.
 *
 *  ⭐ ET ICI, CONTRAIREMENT AU H1, LISIBILITÉ ET RÉFÉRENCEMENT VONT DANS LE MÊME
 *  SENS : répéter onze fois la même expression exacte est du bourrage de
 *  mots-clés, que Google pénalise. On ne protège pas un gain, on retire un
 *  risque. Le grand titre, lui, garde tout — c'est lui le signal.
 *
 *  ⛔ SEULES 33 FICHES SUR 216 SONT CONCERNÉES, et ce sont les récentes : les
 *  anciennes s'appellent « Les fractions » et donnaient déjà « Propriétés : les
 *  fractions ». C'est l'ajout de la classe et de l'année dans le titre qui a
 *  créé la redite.
 *
 *  ⚠️⚠️ ON NE DEVINE PAS PAR MOTIF, ON UTILISE LA CLASSE DE LA FICHE. Un titre
 *  finit par « … en voix (2026-2027) », où « en voix » porte le sens : une regex
 *  sur « en <mot> (année) » l'aurait amputé en « Mettre un texte ». On retire
 *  donc exactement « en <libellé de CETTE classe> » et la parenthèse d'année,
 *  rien d'autre.
 */
function titreDeSection(titre: string, classe: string): string {
  const sansAnnee = titre.replace(/\s*\((?:20\d\d)(?:-20\d\d)?\)\s*$/, "");
  const suffixe = ` en ${libelleClasse(classe)}`;
  const nu = sansAnnee.endsWith(suffixe)
    ? sansAnnee.slice(0, -suffixe.length)
    : sansAnnee;
  return apresDeuxPoints(nu.trim());
}

export default function FicheCoursClient({
  fiche,
  slides,
}: {
  fiche: FicheCoursData;
  /**
   * ⛔ N'EST PLUS LA SOURCE DU MODE CLASSE (20/08/2026). Les tableaux de slides
   * écrits à la main dans chaque fiche étaient un second contenu, figé : ils ne
   * montraient ni les propriétés, ni aucun dessin, et divergeaient dès qu'on
   * enrichissait la fiche. Le diaporama se fabrique désormais depuis la donnée
   * (`slidesDepuisFiche`), donc il est complet par construction.
   *
   * La prop reste acceptée pour ne casser aucune page ; elle ne sert plus qu'à
   * DÉSACTIVER le mode classe en passant un tableau vide (les fiches IA sans
   * slides le faisaient déjà).
   */
  slides: ClasseSlide[];
}) {
  const slidesProjetees = slides.length === 0 ? [] : slidesDepuisFiche(fiche);

  // ⭐ LE PDF EXISTE-T-IL VRAIMENT POUR CETTE FICHE ? (23/08/2026)
  //
  // Le bouton disait « Télécharger en PDF » et appelait `window.print()`. Sur un
  // ordinateur on peut y choisir « Enregistrer en PDF » ; sur un téléphone on
  // tombe sur une boîte d'impression, sans imprimante. Il promettait un fichier
  // que le site ne produisait pas.
  //
  // Les fichiers existent maintenant, fabriqués par scripts/build-fiches-pdf.ts
  // et servis en statique. Mais TOUTES les fiches ne les ont pas encore : la
  // liste générée dit lesquelles. Une fiche sans PDF garde son bouton
  // d'impression — on ne remplace pas une demi-promesse par un lien mort.
  const fichierPdf = nomPdf(fiche.titre, fiche.classe);
  const pdfPret = PDF_DISPONIBLES.has(fichierPdf);
  const hrefPdf = `${DOSSIER_PDF}/${fichierPdf}`;
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

  /**
   * Le titre d'une rubrique : son libellé, puis la notion rappelée.
   *
   * ⭐ MESURÉ LE 31/08/2026, ET C'EST LE DERNIER DÉFAUT QUI RESTAIT. Une fois
   * l'insécable posée dans `TexteMath`, les six coupures fautives encore
   * visibles sur l'échantillon venaient d'ICI : ces onze titres ne passent par
   * aucun composant de texte, ils sont écrits en dur dans le JSX. À 375 px,
   * « Exercices corrigés : » laissait son deux-points seul en début de ligne.
   *
   * Les onze sites répétaient par ailleurs le même appel à `titreDeSection` ;
   * ils tiennent maintenant en un endroit, qui pose aussi la typographie.
   */
  function titreRubrique(libelle: string): string {
    return insecables(`${libelle} : ${titreDeSection(fiche.titre, fiche.classe)}`);
  }

  const estCycle2 = CYCLE_2.has(fiche.classe.toLowerCase());

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
                  <TexteMath>{item.valeur}</TexteMath>
                </span>
              </div>
            ))}
          </div>
        );

      case "reel":
        /* ⭐ 30/08/2026 — les blocs à tableau savaient déjà disparaitre quand ils
           étaient vides (`if (!fiche.proprietes.length) return null` et ses
           frères) ; les deux blocs de TEXTE, non : ils rendaient une carte
           colorée vide. Or c'est le seul levier qui raccourcit vraiment une
           fiche — mesuré le même jour, les douze blocs du CM1 pèsent chacun
           1 000 à 3 300 px et AUCUN ne domine : raccourcir ne suffit jamais, il
           faut pouvoir en retirer. Une fiche qui laisse le texte vide ne montre
           plus le bloc. */
        if (!fiche.reel.texte.trim()) return null;
        return (
          <section className="pt-6 print:pt-4">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
              <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                <Wrench className="h-5 w-5 text-sky-500 print:hidden" />
                {titreRubrique("À quoi ça sert")}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                <TexteMath>{fiche.reel.texte}</TexteMath>
              </p>
            </div>
          </section>
        );

      case "historique":
        /* Même garde-fou que pour « reel » — voir le commentaire au-dessus. */
        if (!fiche.historique.texte.trim()) return null;
        return (
          <section className="pt-4 print:pt-3">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <h2 className="flex items-center gap-2 text-lg font-black text-slate-900 print:text-base">
                <Landmark className="h-5 w-5 text-amber-500 print:hidden" />
                {titreRubrique("Un peu d'histoire")}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-700 print:text-xs">
                <TexteMath>{fiche.historique.texte}</TexteMath>
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
                  {titreRubrique("Définition")}
                </h2>
                {/* ⭐ `whitespace-pre-line` — ajouté le 30/08/2026. Frédéric, en
                    lisant la définition du CM1 : « il faut des retours à la
                    ligne ». `TexteMath` rend la chaîne telle quelle et le HTML
                    écrasait les `\n` : une définition de cent mots arrivait en
                    un seul pavé justifié, illisible pour un enfant.
                    ⚠️ Sans risque pour l'existant : aucune fiche n'avait de `\n`
                    dans sa définition, donc rien ne bouge là où l'on n'en met
                    pas. La classe collapse les espaces et ne garde que les
                    sauts de ligne voulus. */}
                <p className="mt-3 whitespace-pre-line text-base font-bold leading-7 text-slate-900 print:text-sm">
                  <TexteMath>{fiche.definition.texte}</TexteMath>
                </p>
              </div>
              {fiche.figure ? (
                <figure className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  {fiche.figure.schema}
                  {fiche.figure.legende ? (
                    <figcaption className="mt-2 text-center text-xs font-bold text-slate-500">
                      <TexteMath>{fiche.figure.legende}</TexteMath>
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
              {titreRubrique("Propriétés")}
            </h2>
            {/* ⚠️ TROIS COLONNES SEULEMENT À PARTIR DE 1024 (mesuré le 24/08/2026).
                À `md` (768), la page tenait déjà trois cartes dans 820 px : chacune
                tombait à 155 px, et TOUS les dessins d'une fiche d'angles y passaient
                sous 8 px — le rapporteur, la droite graduée, les légendes. Le palier
                intermédiaire à deux colonnes rend 340 px par carte. Le `print` garde
                ses trois colonnes : sur A4, la largeur ne manque pas. */}
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-3">
              {fiche.proprietes.map((p) => (
                <div
                  key={p.titre}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <h3 className="font-black text-slate-900"><TexteMath>{p.titre}</TexteMath></h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                    <TexteMath>{p.texte}</TexteMath>
                  </p>
                  {/* ⭐ LE SCHÉMA DE LA PROPRIÉTÉ (19/08). Trois pavés de texte
                      côte à côte, c'est le bloc qu'un élève survole — un dessin
                      par propriété lui donne une raison de s'arrêter. Optionnel :
                      les fiches écrites avant n'en ont pas et ne changent pas. */}
                  {p.schema && <div className="mt-3">{p.schema}</div>}
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
              {titreRubrique("La formule")}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.25fr] print:grid-cols-[1fr_1.25fr]">
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-center">
                <p className="text-sm font-bold uppercase text-sky-600">
                  <TexteMath>{fiche.formule.contexte}</TexteMath>
                </p>
                <p className="mt-4 text-2xl font-black text-slate-900 print:text-xl">
                  <TexteMath>{fiche.formule.expression}</TexteMath>
                </p>
                <p className="mt-4 text-sm font-bold text-slate-600">
                  <TexteMath>{fiche.formule.legende}</TexteMath>
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
          <section className="py-6 print:py-4">
            {/* ⭐ LE BLOC MÉTHODE N'AVAIT AUCUN TITRE (23/08/2026) : ses trois
                étapes étaient des <h2> posés côte à côte, donc trois titres de
                même rang que « Définition » pour une seule idée. On ajoute le
                titre qui manquait — « comment calculer une aire » est une
                requête, « 1. Je repère » n'en est pas une — et les étapes
                passent en <h3>, ce qu'elles ont toujours été. */}
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              {titreRubrique("Méthode")}
            </h2>
            {/* Même palier que les propriétés : les étapes de méthode portent
                elles aussi un dessin. */}
            <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-3">
            {fiche.methode.map((etape, i) => {
              const Icone = ICONES_METHODE[i % ICONES_METHODE.length];
              const style = STYLES_METHODE[i % STYLES_METHODE.length];
              return (
                <div
                  key={etape.titre}
                  className={`rounded-2xl border p-4 ${style.carte}`}
                >
                  <Icone className={`h-5 w-5 print:hidden ${style.icone}`} />
                  <h3 className="mt-3 text-lg font-black text-slate-900 print:mt-0 print:text-base">
                    {i + 1}. <TexteMath>{etape.titre}</TexteMath>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                    <TexteMath>{etape.texte}</TexteMath>
                  </p>
                  {etape.schema && <div className="mt-3">{etape.schema}</div>}
                </div>
              );
            })}
            </div>
          </section>
        );

      case "usages":
        if (!fiche.usages.length) return null;
        return (
          <section className="border-t border-slate-200 py-6 print:py-4">
            <h2 className="text-2xl font-black text-slate-900 print:text-xl">
              {titreRubrique("Selon ce que l'on cherche")}
            </h2>
            {/* Même palier : les usages portent un dessin dès la 5e. */}
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-3">
              {fiche.usages.map((usage) => (
                <div
                  key={usage.titre}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <h3 className="font-black text-slate-900"><TexteMath>{usage.titre}</TexteMath></h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 print:text-xs">
                    <TexteMath>{usage.detail}</TexteMath>
                  </p>
                  {usage.schema && <div className="mt-3">{usage.schema}</div>}
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
              {titreRubrique("Exemples corrigés")}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
              {fiche.exemples.map((exemple) => (
                <div
                  key={exemple.titre}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-black text-slate-900"><TexteMath>{exemple.titre}</TexteMath></h3>
                  <p className="mt-2 text-sm text-slate-600 print:text-xs">
                    <TexteMath>{exemple.donnees}</TexteMath>
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900 print:text-xs">
                    <TexteMath>{exemple.question}</TexteMath>
                  </p>
                  {exemple.schema ? (
                    <div className="mt-3 flex justify-center rounded-xl border border-slate-200 bg-white p-3">
                      {exemple.schema}
                    </div>
                  ) : null}
                  <p className="mt-3 rounded-xl border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-sky-800 print:text-xs">
                    <TexteMath>{exemple.solution}</TexteMath>
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
                {titreRubrique("Pièges à éviter")}
              </h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 print:text-xs">
                {fiche.pieges.map((piege) => (
                  <li key={piege}><TexteMath>{piege}</TexteMath></li>
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
                {titreRubrique("À retenir")}
              </h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 print:text-xs">
                {fiche.aRetenir.map((point) => (
                  <li key={point}><TexteMath>{point}</TexteMath></li>
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
              {titreRubrique("Exercices corrigés")}
            </h2>
            <ol className="mt-4 grid gap-4 text-sm leading-6 text-slate-700 print:gap-2 print:text-xs">
              {fiche.entrainement.map((item, index) => (
                <li
                  key={item.question}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <p className="font-bold text-slate-900">
                    {index + 1}. <TexteMath>{item.question}</TexteMath>
                  </p>
                  <details className="fiche-correction mt-2">
                    <summary className="cursor-pointer text-sm font-bold text-sky-600">
                      Voir la correction
                    </summary>
                    <p className="mt-2 rounded-xl border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-sky-800">
                      <TexteMath>{item.correction}</TexteMath>
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
              {pdfPret ? (
                // ⚠️ UN VRAI LIEN, PAS UN BOUTON — c'est ce qui fait marcher le
                // téléphone. Sur iPhone il ouvre le PDF dans le lecteur, d'où
                // « Partager → Enregistrer dans Fichiers » ; sur Android il
                // atterrit dans Téléchargements. Aucun des deux ne savait quoi
                // faire d'une boîte d'impression.
                // ⚠️ `download` porte le nom du fichier, celui-là même qui est
                // indexé : on ne le laisse pas au hasard du navigateur.
                <a
                  href={hrefPdf}
                  download={fichierPdf}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-3 text-sm font-black text-sky-700 shadow-sm transition hover:bg-sky-50"
                >
                  <Download className="h-4 w-4" />
                  Télécharger en PDF
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-3 text-sm font-black text-sky-700 shadow-sm transition hover:bg-sky-50"
                >
                  <Printer className="h-4 w-4" />
                  Imprimer
                </button>
              )}
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
            <span>{libelleClasse(fiche.classe)}</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">{insecables(fiche.titre)}</span>
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
            {slidesProjetees.length > 0 && (
              <ModeClasse sousTitre={`${fiche.titre} - ${libelleClasse(fiche.classe)}`} slides={slidesProjetees} />
            )}
            {pdfPret ? (
              <>
                <a
                  href={hrefPdf}
                  download={fichierPdf}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                >
                  <Download className="h-4 w-4" />
                  Télécharger en PDF
                </a>
                {/* ⚠️ « Imprimer » RESTE, à côté et en second. Le PDF sert celui
                    qui veut garder le fichier ; l'impression directe sert celui
                    qui a une feuille dans le bac et ne veut pas d'un fichier de
                    plus sur son bureau. Ce sont deux gestes, pas deux chemins
                    vers le même. */}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-3 text-sm font-black text-sky-700 shadow-sm transition hover:bg-sky-50"
                >
                  <Printer className="h-4 w-4" />
                  Imprimer
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
              >
                <Printer className="h-4 w-4" />
                Imprimer
              </button>
            )}
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
        <article
          data-cycle={estCycle2 ? "2" : undefined}
          className="mx-auto max-w-5xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0"
        >
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
                {/* ⭐⭐ AU CYCLE 2, CE N'EST PAS UNE FICHE DE COURS : C'EST UNE
                    FICHE D'ACTIVITÉ (Frédéric, 02/09/2026). Le nom n'est pas
                    cosmétique — il dit à l'enseignant ce qu'il tient. Un CP ne
                    lit pas sa fiche : il la COLORIE, il TRACE dessus, il entoure.
                    L'appeler « cours » promettait un texte à lire.
                    ⚠️ L'URL, le titre et la description ne bougent PAS : ils
                    portent l'indexation, et le rendez-vous du 26/09 juge le
                    ratio indexées/soumises. On renomme l'objet, pas l'adresse. */}
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                  {estCycle2 ? "Fiche d'activité" : "Fiche de cours"}
                </span>
              </div>
              {/* ⭐ UN H1 EXPLICITE (Frédéric, 25/08/2026). Il valait « Les
                  angles » : la matière et la classe étaient à côté, dans des
                  pastilles — donc invisibles pour Google, pour un PDF détaché de
                  sa page, et pour un élève qui imprime trois fiches et les
                  mélange. Le titre dit maintenant de quoi il s'agit, pour qui,
                  et ce que c'est.

                  ⚠️ `data-titre-pdf` N'EST PAS DÉCORATIF. `build-fiches-pdf.ts`
                  lisait le TEXTE du h1 pour nommer le fichier : rendre le h1
                  explicite aurait donné « angles-cours-de-maths-6e-6e-cours-
                  exercices-corriges.pdf » et orphelin les 87 PDF existants. Le
                  script lit désormais cet attribut, qui porte le titre nu — le
                  même que `urlPdf()` côté lien. Le nom du fichier ne dépend plus
                  de la façon dont le titre s'affiche. */}
              <h1
                data-titre-pdf={fiche.titre}
                className="mt-5 text-3xl font-black tracking-normal text-slate-900 sm:text-5xl print:text-3xl"
              >
                {/* ⚠️ `libelleClasse`, PAS `fiche.classe` (25/08/2026). Le champ
                    brut est un SLUG D'URL : il donnait « cours de maths cm2 »
                    sur les trente-six fiches de CM2, et « cours de maths
                    premiere-spe » sur celle de première — un identifiant de
                    route affiché en gros titre, dans le premier signal que
                    Google lit. La fonction existe depuis le 20/08 pour cette
                    raison exacte, et le bas de page s'en sert déjà (l. 909). */}
                {/* ⭐⭐ LE SUFFIXE RESTE, MAIS IL CESSE DE CRIER (31/08/2026).
                    Frédéric, capture à l'appui : « regarde le titre ». Sur la
                    fiche de CM1 il donnait « Lire avec fluidité en CM1
                    (2026-2027) — cours de français CM1 » : deux lignes, et
                    « CM1 » écrit DEUX FOIS, juste sous trois pastilles qui
                    annoncent déjà FRANÇAIS · CM1 · FICHE DE COURS. L'information
                    utile fait quatre mots, noyés dans le reste — au moment le
                    plus visible de la page, pour un enfant de neuf ans.
                    ⛔ MAIS ON NE RETIRE RIEN : ce suffixe attrape la requête
                    « cours de français CM1 », et le H1 est le premier signal que
                    Google lit. À quatre semaines du rendez-vous d'indexation du
                    26/09, changer le TEXTE de 216 fiches rendrait le verdict
                    illisible — on ne saurait plus si le résultat vient des pages
                    ou de ce changement.
                    ⭐ D'où ce compromis : seule la HIÉRARCHIE VISUELLE change, le
                    titre en grand et le reste en petit dessous. Vérifié : le
                    sitemap ne transporte que des URL construites sur les clés du
                    registre — aucun titre n'y figure, donc rien de tout cela ne
                    le touche.
                    ⭐⭐ ET LE SUFFIXE S'ENRICHIT SANS RIEN PERDRE (formulation de
                    Frédéric) : « cours ET EXERCICES CORRIGÉS de français CM1 »
                    contient mot pour mot l'ancien « cours de français CM1 », plus
                    une requête réellement tapée. Avant un relevé d'indexation,
                    AJOUTER est sans risque ; retirer ne l'est pas.
                    ⚠️ Et c'est enfin la convention des PDF, qui s'appellent déjà
                    `…-2026-2027-5e-cours-exercices-corriges.pdf` : le titre à
                    l'écran dit désormais la même chose que le fichier.
                    ⛔ Ne pas « simplifier » en retirant la matière : le `<title>`
                    de plusieurs fiches ne contient PAS le nom de la matière (celle
                    du CM1 dit « Lire avec fluidité en CM1 : 110 mots par
                    minute »). Le mot ne survivrait alors que dans l'URL et la
                    pastille. */}
                {/* ⚠️ `insecables` ici, mais SURTOUT PAS sur `data-titre-pdf`
                    ci-dessus : cet attribut sert à nommer le fichier PDF, et un
                    caractère invisible dans un nom de fichier est un piège. */}
                {insecables(fiche.titre)}
                <span className="mt-1 block text-base font-bold text-slate-400 sm:text-lg print:text-sm">
                  cours et exercices corrigés de{" "}
                  {fiche.matiereLabel.toLowerCase()} {libelleClasse(fiche.classe)}
                </span>
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 print:text-sm">
                <TexteMath>{fiche.accroche}</TexteMath>
              </p>
              <VideoNotion
                matiere={fiche.matiere}
                classe={fiche.classe}
                notion={fiche.notion}
              />

              <EncartsFiche matiere={fiche.matiere} classe={fiche.classe} />
            </header>

            {/* ⭐ `data-rubrique` EST LE SEUL POINT D'ACCROCHE D'UN BLOC (02/09/2026).
                Aucune rubrique ne portait d'identifiant : la feuille d'impression
                ne pouvait donc RIEN décider bloc par bloc, et c'est ce qui
                empêchait de fabriquer une feuille propre au cycle 2. Posé ici,
                en un seul endroit, plutôt que dans les onze `<section>`. */}
            {rubriquesVisibles.map((id) => (
              <div key={id} data-rubrique={id}>
                {rendreRubrique(id)}
              </div>
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
              <span>eleveai.fr - {estCycle2 ? "Fiche d'activité" : "Fiche de cours"}</span>
              <span>
                {fiche.titre} - {libelleClasse(fiche.classe)}
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
