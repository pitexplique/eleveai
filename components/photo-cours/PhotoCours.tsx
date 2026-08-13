"use client";

// components/photo-cours/PhotoCours.tsx
//
// LA BRIQUE. Autonome : elle ne connaît que /api/photo-cours/* et le contexte
// élève. On la pose où on veut — <PhotoCours /> — sans rien câbler d'autre.
//
// Le parcours en trois temps est VOLONTAIREMENT visible : on photographie, on
// RELIT, puis on produit. Tout le monde passe par l'écran de relecture, même
// quand la lecture est bonne — c'est le prix d'un document dont on répond.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEleve } from "@/context/EleveContext";
import { compresserPhoto } from "@/lib/photo-cours/compresser";
import Rendu from "./Rendu";
import {
  productionsPour,
  type LectureCours,
  type Pont,
  type PublicPhoto,
} from "@/lib/photo-cours/types";

type Etape = "photo" | "relecture" | "resultat";

/**
 * ⭐ LE MÊME OUTIL, DEUX MÉTIERS (Frédéric, 13/08 : « le prompt pédagogique
 * est de faire un prompt pédagogique, ça sert surtout aux profs — faire un
 * cours — et aux élèves pour bien formuler une demande à une IA »).
 *
 * Ma première version disait « apprendre à mieux demander » pour tout le
 * monde : juste pour l'élève, à côté pour le professeur, qui ne vient pas
 * s'entraîner à écrire — il vient produire un cours.
 *
 * ⚠️ ET C'EST UNE COMPÉTENCE, côté élève, pas une ficelle. Savoir formuler
 * une demande à une IA est au référentiel ; le dire ainsi vaut mieux que de le
 * vendre comme une astuce pour obtenir de meilleures réponses.
 */
const PROMPT_PEDA: Record<PublicPhoto, { titre: string; detail: string }> = {
  prof: {
    titre: "Écrire le prompt qui fera le cours",
    detail:
      "Vous décrivez ce que vous voulez enseigner : la demande est notée sur 20, complétée de ce qui lui manque, puis réécrite.",
  },
  eleve: {
    titre: "Apprendre à bien demander à une IA",
    detail:
      "Tu écris ta demande, elle est notée sur 20, on te dit ce qui lui manque et on la réécrit. C'est une compétence à part entière — et elle sert partout.",
  },
  parent: {
    titre: "Apprendre à bien demander à une IA",
    detail:
      "Vous écrivez votre demande, elle est notée sur 20, complétée puis réécrite. Utile ici, et partout ailleurs où vous en utiliserez une.",
  },
};

/** Les classes, dans l'ordre de la scolarité. Vide = « je ne sais pas ». */
const CLASSES = [
  "CP", "CE1", "CE2", "CM1", "CM2",
  "6e", "5e", "4e", "3e",
  "Seconde", "Première", "Terminale",
];

// ⚠️ PLUS LARGE QUE LE COACH, ET C'EST VOULU. Le coach ne couvre que les maths
// et le français ; la photo, elle, sert d'abord en SVT (Jeanne, 12/08) et en
// histoire. Une matière hors coach ne donne pas de pont — elle donne quand
// même des exercices.
const MATIERES = [
  "Mathématiques", "Français", "Histoire-Géographie", "SVT",
  "Physique-Chimie", "Anglais", "Espagnol", "Technologie", "Autre",
];

export default function PhotoCours() {
  const { eleve } = useEleve();
  const chemin = usePathname();

  const [etape, setEtape] = useState<Etape>("photo");
  const [apercu, setApercu] = useState<string | null>(null);
  const [poidsKo, setPoidsKo] = useState<number | null>(null);
  const [lecture, setLecture] = useState<LectureCours | null>(null);
  const [texte, setTexte] = useState("");
  const [pub, setPub] = useState<PublicPhoto>("eleve");
  const [classe, setClasse] = useState("");
  const [matiere, setMatiere] = useState("");
  const [type, setType] = useState("");
  const [precisions, setPrecisions] = useState("");
  const [sortie, setSortie] = useState("");
  const [ponts, setPonts] = useState<Pont[]>([]);
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [survol, setSurvol] = useState(false);

  // ⚠️ ELLE NE MARCHAIT QUE SUR TÉLÉPHONE (essayée sur ordinateur le 12/08).
  // En cause `capture="environment"` : sur mobile il ouvre l'appareil photo
  // arrière, ce qu'on veut ; sur ordinateur le navigateur ne l'ignore pas
  // toujours poliment et ouvre la webcam, qui ne photographie pas un tableau.
  // On teste `pointer: coarse` plutôt que l'user-agent — c'est le doigt qu'on
  // cherche, pas le nom du système. Dans un effet, jamais au premier rendu :
  // le serveur n'a pas de `window`, et un attribut qui change entre le HTML et
  // l'hydratation ferait hurler React.
  const [surMobile, setSurMobile] = useState(false);
  useEffect(() => {
    setSurMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // La classe du compte, dès l'ouverture — un élève ne doit pas avoir à dire
  // ce que le site sait déjà. ⚠️ Elle arrive en différé (localStorage, puis
  // /api/ma-classe), d'où la dépendance : au premier rendu, elle est absente.
  // ⛔ On ne touche à rien si la personne a déjà choisi : le compte informe,
  // il ne corrige pas quelqu'un qui vient de parler.
  useEffect(() => {
    if (!classe && eleve?.classe) setClasse(normaliserClasse(eleve.classe));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eleve?.classe]);

  // COLLER (Ctrl+V) — le geste du bureau que personne ne pense à offrir. Sur
  // ordinateur, un cours arrive rarement par l'appareil photo : c'est une
  // capture d'écran, une image reçue, une page scannée. Tout ça vit dans le
  // presse-papier.
  useEffect(() => {
    function auCollage(e: ClipboardEvent) {
      const fichier = [...(e.clipboardData?.files ?? [])].find((f) =>
        f.type.startsWith("image/")
      );
      if (fichier) {
        e.preventDefault();
        void choisirPhoto(fichier);
      }
    }
    document.addEventListener("paste", auCollage);
    return () => document.removeEventListener("paste", auCollage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ouvert à tout compte connecté (12/08). La restriction par rôle se rallume
  // côté serveur dans lib/photo-cours/auth.ts, pas ici : une porte qui ne tient
  // que dans le navigateur ne tient pas.
  if (!eleve) {
    return (
      <Cadre>
        {/* ⭐ UN BOUTON, PAS UNE PHRASE (Frédéric, 12/08). « Connectez-vous
            pour photographier un cours » demandait de trouver soi-même où se
            connecter. `next` porte le chemin COURANT, pas /photo-cours en dur :
            la brique est faite pour être posée ailleurs. */}
        <Link
          href={`/auth/signin?next=${encodeURIComponent(chemin || "/photo-cours")}`}
          className="inline-block rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
        >
          Se connecter pour photographier un cours
        </Link>
      </Cadre>
    );
  }

  async function choisirPhoto(fichier: File | undefined) {
    if (!fichier) return;
    setErreur(null);
    setSortie("");
    try {
      const photo = await compresserPhoto(fichier);
      setApercu(photo.dataUri);
      setPoidsKo(photo.poidsKo);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Photo illisible.");
    }
  }

  async function lire() {
    if (!apercu || !eleve) return;
    setEnCours(true);
    setErreur(null);
    try {
      const r = await fetch("/api/photo-cours/lire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeEtablissement: eleve.code_etablissement,
          codeUtilisateur: eleve.code_eleve,
          image: apercu,
          // Le contexte aide à LIRE, pas à juger : savoir qu'on est en maths
          // de 4ᵉ lève des ambiguïtés d'écriture manuscrite.
          classe,
          matiere,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Lecture impossible.");

      const lu = data.lecture as LectureCours;
      setLecture(lu);
      setTexte(lu.texte);
      setPub(data.public as PublicPhoto);
      setType(productionsPour(data.public as PublicPhoto)[0].id);
      // ⛔ ON N'ÉCRASE PAS CE QUE LA PERSONNE A CHOISI À L'ÉCRAN 1. Ce que la
      // machine croit avoir lu sur la page ne comble que les trous : quelqu'un
      // qui a dit « 4ᵉ » a raison contre un en-tête de cahier de l'an dernier.
      setClasse(
        (c) => c || normaliserClasse(data.classeDuCompte) || normaliserClasse(lu.niveau)
      );
      setMatiere((m) => m || normaliserMatiere(lu.matiere));
      setEtape("relecture");
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Lecture impossible.");
    } finally {
      setEnCours(false);
    }
  }

  async function produire() {
    if (!eleve) return;
    setEnCours(true);
    setErreur(null);
    try {
      const r = await fetch("/api/photo-cours/produire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeEtablissement: eleve.code_etablissement,
          codeUtilisateur: eleve.code_eleve,
          texte,
          type,
          niveau: classe,
          matiere,
          notion: lecture?.notion ?? "",
          precisions,
          confiance: lecture?.confiance ?? null,
          compteurs: {
            illisibles: lecture?.zonesIllisibles.length ?? 0,
            manques: lecture?.manques.length ?? 0,
            erreurs: lecture?.erreursProbables.length ?? 0,
          },
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Production impossible.");
      setSortie(data.output);
      setPonts(Array.isArray(data.ponts) ? data.ponts : []);
      setEtape("resultat");
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Production impossible.");
    } finally {
      setEnCours(false);
    }
  }

  async function telechargerLivre() {
    if (!eleve || !sortie) return;
    setEnCours(true);
    setErreur(null);
    try {
      const r = await fetch("/api/photo-cours/livre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeEtablissement: eleve.code_etablissement,
          codeUtilisateur: eleve.code_eleve,
          cours: texte,
          document: sortie,
          intitule: productionsPour(pub).find((p) => p.id === type)?.label ?? "",
          classe,
          matiere,
          notion: lecture?.notion ?? "",
        }),
      });
      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        throw new Error(data?.error || "Téléchargement impossible.");
      }

      // ⚠️ On passe par un blob et un <a> plutôt que par une navigation : la
      // route est en POST (elle porte le cours dans son corps), et un
      // `window.location` ne saurait pas l'appeler. Le nom du fichier vient de
      // l'en-tête Content-Disposition, qu'on relit ici.
      const nom =
        /filename="([^"]+)"/.exec(r.headers.get("Content-Disposition") ?? "")?.[1] ??
        "cours-eleveai.epub";
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = nom;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Téléchargement impossible.");
    } finally {
      setEnCours(false);
    }
  }

  function recommencer() {
    setEtape("photo");
    setApercu(null);
    setPoidsKo(null);
    setLecture(null);
    setTexte("");
    setSortie("");
    setPonts([]);
    setPrecisions("");
    setErreur(null);
  }

  const productions = productionsPour(pub);
  const vouvoie = pub !== "eleve";

  return (
    <Cadre>
      <Fil etape={etape} />

      {erreur && (
        <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {erreur}
        </p>
      )}

      {/* ── 1. La photo ─────────────────────────────────────────────────── */}
      {etape === "photo" && (
        <div className="space-y-4">
          {/* ⭐ LA CLASSE ET LA MATIÈRE AVANT LA PHOTO (Frédéric, 13/08 :
              « je voudrais que tu mettes classe et matière dans le premier
              écran »). Elles ont d'abord vécu sous la zone de texte, puis en
              haut de la relecture ; leur place est ici.

              Deux raisons, dont une que je n'avais pas vue :
              1. « Fraction en 5e et en 4e, ce n'est pas la même » — c'est le
                 contexte de tout ce qui suit, et un contexte se pose d'abord ;
              2. ⭐ ON PEUT LE DIRE AU LECTEUR. Savoir qu'on lit un cours de 4ᵉ
                 en maths lève des ambiguïtés d'écriture manuscrite qu'aucune
                 relecture ne rattrape : un « x » de multiplication contre une
                 inconnue, un « 1 » contre un « l ». La lecture ne JUGE
                 toujours pas — elle sait juste où elle est.

              La classe est pré-remplie depuis le compte de l'élève ; un
              professeur ou un parent n'en a pas, il la choisit. */}
          <div className="space-y-3">
            <ChoixChips
              intitule="Classe"
              options={CLASSES}
              valeur={classe}
              onChange={setClasse}
            />
            <ChoixChips
              intitule="Matière"
              options={MATIERES}
              valeur={matiere}
              onChange={setMatiere}
            />
          </div>

          {/* Une lecture déjà faite ne se rejette pas parce qu'on a corrigé une
              pastille : relire coûte un appel au modèle pour rien. */}
          {lecture && (
            <BoutonPlat onClick={() => setEtape("relecture")}>
              Revenir au cours lu
            </BoutonPlat>
          )}

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setSurvol(true);
            }}
            onDragLeave={() => setSurvol(false)}
            onDrop={(e) => {
              e.preventDefault();
              setSurvol(false);
              void choisirPhoto(
                [...e.dataTransfer.files].find((f) => f.type.startsWith("image/"))
              );
            }}
            className={`block cursor-pointer rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${
              survol
                ? "border-sky-400 bg-sky-50"
                : "border-slate-300 bg-slate-50 hover:border-sky-300 hover:bg-sky-50"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              capture={surMobile ? "environment" : undefined}
              className="hidden"
              onChange={(e) => choisirPhoto(e.target.files?.[0])}
            />
            <span className="block text-sm font-semibold text-slate-700">
              {surMobile ? "Photographier le cours" : "Choisir une image du cours"}
            </span>
            <span className="mt-1 block text-xs text-slate-500">
              {surMobile
                ? "Le tableau, le cahier, le polycopié. Bien à plat, bien éclairé."
                : "Déposez-la ici, ou collez-la avec Ctrl+V — photo du tableau, capture d'écran, page scannée."}
            </span>
          </label>

          {apercu && (
            <div className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={apercu}
                alt="Aperçu du cours photographié"
                className="max-h-80 w-full rounded-lg border border-slate-200 object-contain"
              />
              <p className="text-xs text-slate-500">
                {poidsKo} Ko envoyés. La photo n&apos;est pas conservée : elle est
                lue, puis oubliée.
              </p>
              <Bouton onClick={lire} enCours={enCours}>
                {enCours ? "Lecture en cours…" : "Lire ce cours"}
              </Bouton>
            </div>
          )}
        </div>
      )}

      {/* ── 2. La relecture — le garde-fou ──────────────────────────────── */}
      {etape === "relecture" && lecture && (
        <div className="space-y-4">
          {/* UNE LIGNE, PAS UN ENCADRÉ (Frédéric, 13/08 : « plus simple »).
              L'avertissement tenait sur deux phrases et une étiquette séparée
              disait la lisibilité. Sur un téléphone, ça poussait le cours —
              la seule chose à relire — sous le pli. */}
          <p className="text-sm text-slate-700">
            <span className="font-semibold">
              {vouvoie ? "Relisez :" : "Relis :"}
            </span>{" "}
            c&apos;est ce que la machine a cru voir.
            <span className="ml-1 text-slate-400">
              Lisibilité {lecture.confiance}/100
            </span>
          </p>

          {/* La classe et la matière se choisissent AVANT la photo (écran 1)
              depuis le 13/08 — voir la note là-bas. On les rappelle ici, où
              elles restent corrigeables : c'est le moment où l'on découvre que
              le cahier ne disait pas ce qu'on croyait. */}
          <p className="text-xs text-slate-500">
            {classe || "Classe non précisée"} ·{" "}
            {matiere || "matière non précisée"}
            <button
              type="button"
              onClick={() => setEtape("photo")}
              className="ml-2 underline hover:text-slate-800"
            >
              corriger
            </button>
          </p>

          {lecture.confiance < 60 && (
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
              La photo est difficile à lire. Une reprise avec plus de lumière
              donnera un bien meilleur résultat qu&apos;une correction à la main.
            </p>
          )}

          {/* ⭐ TROIS SIGNALEMENTS QUI NE SE MÉLANGENT PAS (12/08). Ils
              n'appellent pas la même réponse : le premier est notre problème,
              le deuxième un trou dans le cours, le troisième une faute de
              recopie. Les fondre dans une seule liste, c'est demander à
              quelqu'un de faire le tri lui-même. */}
          {lecture.zonesIllisibles.length > 0 && (
            <Bloc titre="Ce que je n'ai pas réussi à lire" ton="slate">
              <ul className="list-inside list-disc">
                {lecture.zonesIllisibles.map((z, i) => (
                  <li key={i}>{z}</li>
                ))}
              </ul>
            </Bloc>
          )}

          {lecture.manques.length > 0 && (
            <Bloc titre="Ce qui n'est pas dans la page" ton="sky">
              <ul className="space-y-1">
                {lecture.manques.map((m, i) => (
                  <li key={i}>
                    {m.quoi}
                    {m.ou && <span className="text-slate-500"> — {m.ou}</span>}
                  </li>
                ))}
              </ul>
            </Bloc>
          )}

          {lecture.erreursProbables.length > 0 && (
            <Bloc titre="À revérifier — recopié un peu vite ?" ton="amber">
              <ul className="space-y-1">
                {lecture.erreursProbables.map((m, i) => (
                  <li key={i}>
                    {m.quoi}
                    {m.ou && <span className="text-slate-500"> — {m.ou}</span>}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] italic text-slate-500">
                Dans le doute, c&apos;est le professeur qui tranche — pas nous.
              </p>
            </Bloc>
          )}

          <textarea
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            rows={14}
            // Mêmes couleurs explicites que les <select> : c'est le cours de
            // quelqu'un, il doit se lire sans effort pour être relu.
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm leading-relaxed text-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">
              À partir de ce cours :
            </p>
            <div className="flex flex-wrap gap-2">
              {productions.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setType(p.id)}
                  title={p.aide}
                  aria-pressed={type === p.id}
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition ${
                    type === p.id
                      ? "border-sky-200 bg-sky-100 text-sky-800"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {productions.find((p) => p.id === type)?.aide}
            </p>
          </div>

          {/* ⭐ « UNE PRÉCISION ? » — retiré le matin du 13/08 en simplifiant
              l'écran, REMIS dans l'heure : « ne enlève pas le champ une
              précision que je trouve super ». C'est le seul endroit où la
              personne parle avec ses mots au lieu de choisir dans une liste —
              « j'ai un contrôle vendredi », « sans calculatrice », « elle est
              en difficulté ». Aucune pastille ne remplace ça.
              🔑 Simplifier, c'est enlever ce qui encombre, pas ce qui est peu
              rempli. */}
          <input
            type="text"
            value={precisions}
            onChange={(e) => setPrecisions(e.target.value)}
            placeholder={
              vouvoie
                ? "Une précision ? (ex. : 20 minutes, sans calculatrice)"
                : "Une précision ? (ex. : j'ai un contrôle vendredi)"
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />

          <div className="flex flex-wrap gap-2">
            <Bouton onClick={produire} enCours={enCours}>
              {enCours ? "En cours…" : "Allons-y"}
            </Bouton>
            <BoutonPlat onClick={recommencer}>Reprendre la photo</BoutonPlat>
          </div>
        </div>
      )}

      {/* ── 3. Le résultat ──────────────────────────────────────────────── */}
      {etape === "resultat" && (
        <div className="space-y-3">
          {/* Le Markdown du modèle était affiché tel quel : les `##` et les
              `**` se lisaient à l'écran. Voir Rendu.tsx. */}
          <Rendu>{sortie}</Rendu>

          {/* ⭐ LES PONTS. Ce qu'on vient de générer est neuf : personne ne l'a
              relu. Les banques du coach, elles, sont écrites, vérifiées et
              laissent une trace dans le tableau de bord. Quand la notion y
              existe, c'est là qu'il faut aller. */}
          {ponts.length > 0 && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
              <p className="text-xs font-semibold text-emerald-900">
                Pour travailler cette notion pour de bon :
              </p>
              <div className="mt-2 space-y-2">
                {ponts.map((p) => (
                  <Link
                    key={p.url}
                    href={p.url}
                    prefetch={false}
                    className="block rounded border border-emerald-300 bg-white px-3 py-2 transition hover:border-emerald-500"
                  >
                    <span className="text-sm font-semibold text-emerald-900">
                      {p.libelle}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-600">
                      {p.detail}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ⭐ LE PROMPT PÉDAGOGIQUE (Frédéric, 13/08). ⚠️ UN COMPLÉMENT, PAS
              UN RATTRAPAGE — première version corrigée dans la foulée : « le
              prompt pédagogique est autre chose ». Il ne répare pas une
              production ratée, il apprend à demander. Le champ « une
              précision ? » juste au-dessus reste, lui, le moyen normal
              d'ajuster ce qu'on veut ici.

              ⚠️ ON DIT CE QU'IL FAIT, PAS SON NOM. « Prompt pédagogique » ne
              veut rien dire à un parent, et un lien qu'on ne comprend pas ne se
              clique pas. */}
          <Link
            href="/prompt-pedagogique?from=photo-cours"
            prefetch={false}
            className="block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition hover:border-slate-400"
          >
            <span className="text-sm font-semibold text-slate-800">
              {PROMPT_PEDA[pub].titre}
            </span>
            <span className="mt-0.5 block text-xs text-slate-600">
              {PROMPT_PEDA[pub].detail}
            </span>
          </Link>

          <div className="flex flex-wrap gap-2">
            {/* ⭐ LE LIVRE (Frédéric, 13/08 : « comme un epub », « avec le
                margouillat et eleveai.fr »). Une page se ferme ; un fichier se
                garde, se lit dans le train sans réseau, s'envoie à l'élève
                absent, se retrouve avant le brevet.
                ⚠️ Aucun appel au modèle : le document est déjà produit et payé,
                on ne fait que le mettre en forme. */}
            <BoutonPlat onClick={telechargerLivre}>
              {enCours ? "…" : "Télécharger le livre"}
            </BoutonPlat>
            <BoutonPlat onClick={() => navigator.clipboard.writeText(sortie)}>
              Copier
            </BoutonPlat>
            <BoutonPlat onClick={() => setEtape("relecture")}>
              Changer la demande
            </BoutonPlat>
            <BoutonPlat onClick={recommencer}>Un autre cours</BoutonPlat>
          </div>
        </div>
      )}
    </Cadre>
  );
}

/* ── Normalisation des libellés ─────────────────────────────────────────── */
// Le modèle rend ce qu'il lit (« 5ème B », « Cinquième »), le compte rend son
// propre libellé (« 5E », « 5e4 »). Les deux doivent tomber sur une option du
// menu, sinon le <select> affiche « Non précisée » alors qu'on savait.

function normaliserClasse(brut: string | null | undefined): string {
  if (!brut) return "";
  const n = brut.toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g, "");
  for (const c of CLASSES) {
    const cible = c.toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g, "");
    if (n === cible || n.startsWith(cible)) return c;
  }
  if (n.startsWith("6")) return "6e";
  if (n.startsWith("5")) return "5e";
  if (n.startsWith("4")) return "4e";
  if (n.startsWith("3")) return "3e";
  if (n.includes("2nd") || n.includes("2de")) return "Seconde";
  if (n.startsWith("1")) return "Première";
  if (n.startsWith("t")) return "Terminale";
  return "";
}

function normaliserMatiere(brut: string | null | undefined): string {
  if (!brut) return "";
  const n = brut.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (n.includes("math")) return "Mathématiques";
  if (n.includes("franc") || n.includes("lettre")) return "Français";
  if (n.includes("hist") || n.includes("geo")) return "Histoire-Géographie";
  if (n.includes("svt") || n.includes("vie et de la terre") || n.includes("bio"))
    return "SVT";
  if (n.includes("physi") || n.includes("chimi")) return "Physique-Chimie";
  if (n.includes("angl")) return "Anglais";
  if (n.includes("espagn")) return "Espagnol";
  if (n.includes("techno")) return "Technologie";
  return "";
}

/* ── Petites pièces ─────────────────────────────────────────────────────── */

function Cadre({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      {children}
    </div>
  );
}

function Fil({ etape }: { etape: Etape }) {
  const etapes: [Etape, string][] = [
    ["photo", "1. Photographier"],
    ["relecture", "2. Relire"],
    ["resultat", "3. Travailler"],
  ];
  return (
    <div className="mb-4 flex flex-wrap gap-2 text-[11px] font-semibold">
      {etapes.map(([id, label]) => (
        <span
          key={id}
          className={[
            "rounded-full px-3 py-1",
            etape === id ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-500",
          ].join(" ")}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function Bloc({
  titre,
  ton,
  children,
}: {
  titre: string;
  ton: "slate" | "sky" | "amber";
  children: React.ReactNode;
}) {
  const tons = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    sky: "border-sky-200 bg-sky-50 text-sky-900",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
  };
  return (
    <div className={`rounded-lg border px-3 py-2 text-xs ${tons[ton]}`}>
      <p className="mb-1 font-semibold">{titre}</p>
      {children}
    </div>
  );
}

/**
 * Une rangée de pastilles pour choisir une valeur — la classe, la matière.
 *
 * ⚠️ Douze classes ne tiennent pas sur la largeur d'un téléphone. Elles
 * défilent au doigt plutôt que de casser la mise en page en trois lignes,
 * comme partout ailleurs sur le site.
 *
 * ⭐ AVEC DEUX FLÈCHES (Frédéric, 13/08 : « si tu fais défiler ajoute deux
 * flèches, plus pratique »). Une rangée qui défile ne dit pas qu'elle défile :
 * au doigt on le découvre par hasard, à la souris on ne le découvre jamais —
 * il n'y a pas de barre de défilement sur une rangée de cette hauteur. Les
 * flèches sont le seul indice que la Terminale existe à droite du CP.
 *
 * ⚠️ Elles n'apparaissent QUE quand il y a de quoi aller — masquées aux deux
 * bords et quand tout tient à l'écran. Une flèche qui ne fait rien apprend à
 * ne plus cliquer les flèches.
 *
 * ⚠️ Recliquer la pastille active la DÉSÉLECTIONNE. Il n'y a donc pas de
 * pastille « non précisée » à faire vivre : ne rien choisir est déjà une
 * réponse, et c'est celle qu'on a par défaut.
 */
function ChoixChips({
  intitule,
  options,
  valeur,
  onChange,
}: {
  intitule: string;
  options: string[];
  valeur: string;
  onChange: (v: string) => void;
}) {
  const piste = useRef<HTMLDivElement>(null);
  const [aGauche, setAGauche] = useState(false);
  const [aDroite, setADroite] = useState(false);

  function mesurer() {
    const el = piste.current;
    if (!el) return;
    setAGauche(el.scrollLeft > 4);
    // -4 : les largeurs sont fractionnaires, et un `scrollLeft` à 0,5 px du
    // bout laisserait une flèche droite allumée qui ne bouge plus rien.
    setADroite(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    mesurer();
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.length]);

  function pousser(sens: -1 | 1) {
    const el = piste.current;
    if (!el) return;
    // Les deux tiers de la largeur visible : on avance franchement tout en
    // gardant une pastille déjà vue à l'écran, pour ne pas perdre le fil.
    el.scrollBy({ left: sens * el.clientWidth * 0.66, behavior: "smooth" });
  }

  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold text-slate-600">{intitule}</p>
      <div className="relative">
        {aGauche && <Fleche sens="gauche" onClick={() => pousser(-1)} />}
        <div
          ref={piste}
          onScroll={mesurer}
          className="flex gap-1.5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {options.map((o) => {
            const actif = valeur === o;
            return (
              <button
                key={o}
                type="button"
                onClick={() => onChange(actif ? "" : o)}
                aria-pressed={actif}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-[13px] transition ${
                  actif
                    ? "border-slate-800 bg-slate-800 font-semibold text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-500"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
        {aDroite && <Fleche sens="droite" onClick={() => pousser(1)} />}
      </div>
    </div>
  );
}

function Fleche({
  sens,
  onClick,
}: {
  sens: "gauche" | "droite";
  onClick: () => void;
}) {
  const gauche = sens === "gauche";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={gauche ? "Voir les précédents" : "Voir les suivants"}
      className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-300 bg-white/95 px-2 py-1.5 text-slate-600 shadow-sm transition hover:border-slate-500 hover:text-slate-900 ${
        gauche ? "left-0" : "right-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-3.5 w-3.5"
      >
        <path d={gauche ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </button>
  );
}

function Etiquette({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
      {children}
    </span>
  );
}

function Bouton({
  onClick,
  enCours,
  children,
}: {
  onClick: () => void;
  enCours: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={enCours}
      className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function BoutonPlat({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      {children}
    </button>
  );
}
