"use client";

// components/photo-cours/PhotoCours.tsx
//
// LA BRIQUE. Autonome : elle ne connaît que /api/photo-cours/* et le contexte
// élève. On la pose où on veut — <PhotoCours /> — sans rien câbler d'autre.
//
// Le parcours en trois temps est VOLONTAIREMENT visible : on photographie, on
// RELIT, puis on produit. Tout le monde passe par l'écran de relecture, même
// quand la lecture est bonne — c'est le prix d'un document dont on répond.

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEleve } from "@/context/EleveContext";
import { compresserPhoto } from "@/lib/photo-cours/compresser";
import {
  productionsPour,
  type LectureCours,
  type Pont,
  type PublicPhoto,
} from "@/lib/photo-cours/types";

type Etape = "photo" | "relecture" | "resultat";

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
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Lecture impossible.");

      const lu = data.lecture as LectureCours;
      setLecture(lu);
      setTexte(lu.texte);
      setPub(data.public as PublicPhoto);
      setType(productionsPour(data.public as PublicPhoto)[0].id);
      // La classe du COMPTE d'abord — un cahier peut porter l'en-tête de l'an
      // dernier, un compte non. Celle lue sur la photo en second.
      setClasse(normaliserClasse(data.classeDuCompte) || normaliserClasse(lu.niveau));
      setMatiere(normaliserMatiere(lu.matiere));
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
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
            <p className="text-sm font-semibold text-amber-900">
              {vouvoie ? "Relisez avant de produire." : "Relis avant de continuer."}
            </p>
            <p className="mt-1 text-xs text-amber-800">
              Ce texte est ce que la machine a cru voir. Tout ce qui suit en
              découle — une erreur laissée ici s&apos;y retrouvera.
            </p>
          </div>

          <Etiquette>Lisibilité : {lecture.confiance}/100</Etiquette>

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
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm leading-relaxed focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />

          {/* ⭐ LA CLASSE ET LA MATIÈRE, DEMANDÉES ICI ET PAS AVANT (Frédéric,
              12/08 : « fraction en 5e et en 4e, ce n'est pas la même »). La
              LECTURE n'en a pas besoin — elle lit, elle ne juge pas ; c'est la
              production qui en dépend, et le pont vers le coach ne peut pas
              ouvrir la bonne notion sans la classe. Pré-remplies : zéro geste
              en plus quand c'est juste. */}
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">
                Classe
              </span>
              <select
                value={classe}
                onChange={(e) => setClasse(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">Non précisée</option>
                {CLASSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">
                Matière
              </span>
              <select
                value={matiere}
                onChange={(e) => setMatiere(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">Non précisée</option>
                {MATIERES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
          </div>

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

          <input
            type="text"
            value={precisions}
            onChange={(e) => setPrecisions(e.target.value)}
            placeholder={
              vouvoie
                ? "Une précision ? (ex. : 20 minutes, sans calculatrice)"
                : "Une précision ? (ex. : j'ai un contrôle vendredi)"
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
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
          <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-white px-4 py-3 font-sans text-sm leading-relaxed text-slate-800">
            {sortie}
          </pre>

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

          <div className="flex flex-wrap gap-2">
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
