// ─── La CARTE MENTALE d'une notion, A4 recto verso ──────────────────────────────
// /cartes-mentales/maths/<classe>/<notion> (27/10 ; avant : /video/bilan/…, redirigé).
// ⭐ 27/10/2026 — Frédéric : « une feuille A4 pour les micros d'une notion, elle
// peut être recto verso », puis « on n'est pas sur une feuille d'exercices, on
// est sur une feuille de ce qu'ont retenu les élèves en regardant toutes les
// vidéos de toutes les micros », « pas de question, ils ont les feuilles
// d'exercices pour cela », « cette feuille doit être un brainstorming, carte
// mentale » (« j'adore la carte mentale »).
// Les micros viennent du COACH, qu'il y ait des vidéos ou non (« tu fais comme si
// les vidéos existaient ») : lib/videos/bilans-notions.json, par
// scripts/generer-bilans-videos.mjs.
// Disposition, la sienne : « en haut 1 2 3, au milieu 4 5, puis 6 7 8 », la
// notion au centre ; « au-delà de 6 ou 7, tu partages en deux » (deux faces).
// ⭐ 27/10, suite : « le verso doit prendre toute la page, l'encadré est trop
// petit » → chaque face est une page A4 entière, l'encadré s'étire jusqu'en
// bas ; « il faut plusieurs formats : on écrit plus en Terminale, 1re, 2de
// qu'en 3e et 4e, et peu en 5e, 6e » → l'écart des lignes dépend de la classe.
// ⭐ 09/11/2026 — « elles ne sont pas très bien faites, il y a des soucis ».
// Corrigé : (1) plus de rangée vide — la grille n'a que les rangées qui portent
// des bulles (DISPOSITIONS), les bulles prennent toute la hauteur ; (2) une
// carte de 8 micros au plus tient sur UNE face, à toutes les classes (le
// partage dès 5 micros au lycée laissait des faces à 2-3 bulles perdues dans le
// vide) ; au-delà, faces de 8 et la dernière garde le bas pour « ce que je
// retiens » ; (3) les lignes d'écriture sont un motif SVG (le dégradé de 1 px
// sautait des lignes à l'impression), la première est à un écart sous
// « Ce que j'ai retenu » ; (4) plus de page blanche en fin d'impression ;
// (5) exposants et indices (a², P_A(B)) au lieu de « ^2 », « _A » ;
// (6) à l'écran, chaque face est une feuille A4 posée sur la page.
// ⭐ 09/11, PILOTE (6e et 4e, ses classes, 5 notions, lib/cartes/cartes-remplies.ts) : à
// l'écran la carte REMPLIE (règle, exemple, piège) ; « Version à compléter »
// garde la feuille d'avant. ⛔ À valider par Frédéric avant les 477 cartes.
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import NOTIONS from "@/lib/videos/bilans-notions.json";
import BoutonImprimer from "@/components/BoutonImprimer";
import ModeTableau from "@/components/cartes/ModeTableau";
import TexteMaths from "@/components/cartes/TexteMaths";
import { enClair } from "@/lib/cartes/texte-maths";
import { carteRemplie, type BulleRemplie } from "@/lib/cartes/cartes-remplies";

type Props = {
  params: Promise<{ classe: string; notion: string }>;
  searchParams: Promise<{ version?: string }>;
};
type Notion = { classe: string; notion: string; micros: string[] };

const NOM_CLASSE: Record<string, string> = {
  seconde: "2de",
  premiere: "1re",
  "premiere-spe": "1re spé",
  "terminale-spe": "Tle spé",
  stmg: "STMG",
  adulte: "adultes",
};
const nomClasse = (c: string) => NOM_CLASSE[c] ?? c.toUpperCase().replace(/^(\d)E$/, "$1e");

// L'écart entre deux lignes d'écriture, en mm : grand pour les petits (écriture
// large, peu de texte), serré au lycée (on écrit davantage).
const LYCEE = new Set(["seconde", "premiere", "premiere-spe", "terminale-spe", "stmg", "adulte"]);
const ECART_MM = (classe: string) => (LYCEE.has(classe) ? 6.5 : classe === "4e" || classe === "3e" ? 8 : 10);

async function lire(params: Props["params"]) {
  const { classe, notion } = await params;
  const cle = `${decodeURIComponent(classe)}/${decodeURIComponent(notion)}`;
  const n = (NOTIONS as Record<string, Notion>)[cle];
  return n ? { cle, ...n } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = await lire(params);
  if (!n) return { title: "Carte mentale" };
  const classe = nomClasse(n.classe);
  const notion = enClair(n.notion);
  const remplie = carteRemplie(n.cle, n.micros.length);
  // Indexée (au sitemap, 27/10) : la requête est « carte mentale <notion> <classe> ».
  return {
    title: `Carte mentale : ${notion} (maths ${classe})${remplie ? "" : " à imprimer"}`,
    description: remplie
      ? `La carte mentale de ${notion} en maths ${classe} : les ${n.micros.length} compétences autour de la notion, chacune avec sa règle, un exemple chiffré et le piège à éviter. Version à compléter en A4 recto verso, gratuite.`
      : `La carte mentale de ${notion} en maths ${classe} : les ${n.micros.length} compétences autour de la notion, à cocher (compris, pas tout à fait, pas compris) et à compléter avec ce que l'élève a retenu. A4 recto verso, gratuite.`,
    alternates: { canonical: `/cartes-mentales/maths/${n.cle}` },
  };
}

// Des lignes d'écriture qui REMPLISSENT leur boîte, quelle que soit sa hauteur :
// un motif SVG (vectoriel, net à l'impression), la première ligne à un écart du
// haut. 1 mm = 96/25,4 px CSS, à l'écran comme sur papier.
const PX_PAR_MM = 96 / 25.4;
function ZoneEcriture({ id, ecartMm, className = "" }: { id: string; ecartMm: number; className?: string }) {
  const h = ecartMm * PX_PAR_MM;
  return (
    <svg className={`block min-h-0 w-full flex-1 ${className}`} aria-hidden="true">
      <defs>
        <pattern id={id} width="8" height={h} patternUnits="userSpaceOnUse">
          <line x1="0" x2="8" y1={h - 0.4} y2={h - 0.4} stroke="#b6c2d1" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function PetiteCase({ texte }: { texte: string }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      <span className="inline-block h-2.5 w-2.5 rounded-sm border-[1.5px] border-slate-500" />
      {texte}
    </span>
  );
}

// ─── La disposition d'une face, selon son nombre de bulles ────────────────────
// Sa règle : « en haut 1 2 3, au milieu 4 5, puis 6 7 8 », la notion (C) au
// centre. Seules les rangées qui portent des bulles existent, chacune prend sa
// part de la hauteur (poids) ; une rangée qui ne porte que la notion est basse.
type Rang = { cases: (number | "C")[]; poids: number };
const BAS = 0.3; // la rangée de la notion seule
const DISPOSITIONS: Record<number, Rang[]> = {
  1: [{ cases: ["C"], poids: BAS }, { cases: [0], poids: 1 }],
  2: [{ cases: [0, "C", 1], poids: 1 }],
  3: [{ cases: [0, 1], poids: 1 }, { cases: ["C"], poids: BAS }, { cases: [2], poids: 1 }],
  4: [{ cases: [0, 1], poids: 1 }, { cases: ["C"], poids: BAS }, { cases: [2, 3], poids: 1 }],
  5: [{ cases: [0, 1, 2], poids: 1 }, { cases: [3, "C", 4], poids: 1 }],
  6: [{ cases: [0, 1, 2], poids: 1 }, { cases: ["C"], poids: BAS }, { cases: [3, 4, 5], poids: 1 }],
  7: [{ cases: [0, 1, 2], poids: 1 }, { cases: [3, "C", 4], poids: 1 }, { cases: [5, 6], poids: 1 }],
  8: [{ cases: [0, 1, 2], poids: 1 }, { cases: [3, "C", 4], poids: 1 }, { cases: [5, 6, 7], poids: 1 }],
};
const LARGEUR_CENTRE = 1; // la notion, entre deux bulles : même largeur, les colonnes restent alignées

// Le centre de chaque case, en % de la carte, pour tracer les traits notion →
// bulle (sous les bulles : il suffit qu'ils partent du centre et y arrivent).
function centres(rangs: Rang[]) {
  const total = rangs.reduce((s, r) => s + r.poids, 0);
  const pos = new Map<number | "C", [number, number]>();
  let y = 0;
  for (const r of rangs) {
    const largeurs = r.cases.map((c) => (c === "C" && r.cases.length > 1 ? LARGEUR_CENTRE : 1));
    const somme = largeurs.reduce((s, l) => s + l, 0);
    let x = 0;
    r.cases.forEach((c, i) => {
      pos.set(c, [((x + largeurs[i] / 2) / somme) * 100, ((y + r.poids / 2) / total) * 100]);
      x += largeurs[i];
    });
    y += r.poids;
  }
  return pos;
}

function Centre({ texte, seul }: { texte: string; seul: boolean }) {
  // Entre deux bulles, le centre est étroit (un tiers de la carte) : un mot long
  // (« Pourcentages ») y débordait du cercle → une taille de moins, moins de marge.
  const etroitLong = !seul && /\S{12,}/.test(texte);
  const tailles = ["text-xl", "text-lg", "text-base", "text-sm"];
  const rang = texte.length <= 18 ? 0 : texte.length <= 32 ? 1 : texte.length <= 50 ? 2 : 3;
  const taille = tailles[Math.min(3, rang + (etroitLong ? 1 : 0))];
  return (
    <div
      className={`flex items-center justify-center rounded-[50%] border-[3px] border-teal-600 bg-teal-50 py-3 text-center font-black leading-tight text-teal-900 ${taille} ${seul ? "min-h-full w-[44%]" : "min-h-[42%] w-full"} ${etroitLong ? "px-2" : "px-4"}`}
    >
      <span>
        <TexteMaths texte={texte} />
      </span>
    </div>
  );
}

function BulleVierge({ numero, titre, ecartMm, id }: { numero: number; titre: string; ecartMm: number; id: string }) {
  return (
    <>
      <p className="text-[12px] font-black leading-tight">
        {numero}. <TexteMaths texte={titre} />
      </p>
      <p className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] leading-none text-slate-700">
        <PetiteCase texte="compris" />
        <PetiteCase texte="pas tout à fait" />
        <PetiteCase texte="pas compris" />
      </p>
      <p className="mt-1.5 text-[9px] font-bold uppercase tracking-wide text-slate-400">Ce que j&apos;ai retenu</p>
      <ZoneEcriture id={id} ecartMm={ecartMm} />
    </>
  );
}

// Peu de bulles (4 au plus) : elles sont grandes, on écrit plus gros. À 6 (la
// rangée du milieu ne porte que la notion), les bulles sont hautes : 14 px.
function BulleRemplieContenu({ numero, titre, b, nb }: { numero: number; titre: string; b: BulleRemplie; nb: number }) {
  const taille = nb <= 4 ? "text-[15px]" : nb === 6 ? "text-[14px]" : "text-[13px]";
  return (
    <>
      <p className={`${taille} font-black leading-tight text-slate-900`}>
        {numero}. <TexteMaths texte={titre} />
      </p>
      <div className={`mt-2 flex flex-1 flex-col justify-evenly gap-2 leading-snug ${taille}`}>
        <p className="rounded-lg bg-teal-50 px-2 py-1.5 font-bold text-teal-950 [print-color-adjust:exact]">
          <TexteMaths texte={b.regle} />
        </p>
        <p className="text-slate-800">
          <span className="mr-1 text-[10px] font-black uppercase tracking-wide text-sky-700">Exemple</span>
          <TexteMaths texte={b.exemple} />
        </p>
        <p className="rounded-lg bg-amber-50 px-2 py-1.5 text-amber-950 [print-color-adjust:exact]">
          <span className="mr-1 text-[10px] font-black uppercase tracking-wide text-amber-700">Piège</span>
          <TexteMaths texte={b.piege} />
        </p>
      </div>
    </>
  );
}

function CarteMentale({
  centre,
  micros,
  debut,
  ecartMm,
  remplies,
  className,
  idFace,
}: {
  centre: string;
  micros: string[];
  debut: number;
  ecartMm: number;
  remplies: BulleRemplie[] | null;
  className: string;
  idFace: string;
}) {
  const rangs = DISPOSITIONS[micros.length];
  const pos = centres(rangs);
  const [cx, cy] = pos.get("C")!;
  return (
    <div className={`relative w-full ${className}`} data-carte>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {micros.map((_, i) => {
          const [x, y] = pos.get(i)!;
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#94a3b8" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col gap-3">
        {rangs.map((r, ri) => (
          <div key={ri} className="flex min-h-0 gap-3" style={{ flex: `${r.poids} 1 0` }}>
            {r.cases.map((c) =>
              c === "C" ? (
                <div
                  key="C"
                  className="flex min-w-0 items-center justify-center"
                  style={{ flex: `${r.cases.length > 1 ? LARGEUR_CENTRE : 1} 1 0` }}
                >
                  <Centre texte={centre} seul={r.cases.length === 1} />
                </div>
              ) : (
                <div
                  key={c}
                  data-bulle
                  className="relative flex min-h-0 min-w-0 flex-col rounded-2xl border-2 border-slate-500 bg-white px-2.5 py-2"
                  style={{ flex: "1 1 0" } as CSSProperties}
                >
                  {remplies ? (
                    <BulleRemplieContenu numero={debut + c + 1} titre={micros[c]} b={remplies[debut + c]} nb={micros.length} />
                  ) : (
                    <BulleVierge numero={debut + c + 1} titre={micros[c]} ecartMm={ecartMm} id={`${idFace}-b${c}`} />
                  )}
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Les faces ─────────────────────────────────────────────────────────────────
// Jusqu'à 8 micros : une face de carte, et tout le verso pour « ce que je
// retiens ». Au-delà : des faces de 8 bulles ; la dernière, si elle en a 5 au
// plus, garde le bas de la page pour « ce que je retiens » (en haut 1 2 3, au
// milieu 4 5) ; sinon le verso suit. La carte remplie a toujours son verso.
type Face = { debut: number; micros: string[]; retiens: boolean };
function decouper(micros: string[], remplie: boolean): { faces: Face[]; verso: boolean } {
  // ⭐ 09/11 soir — Frédéric aime la page entière « ce que je retiens » + « la
  // question au prof » : la carte remplie la garde aussi au verso.
  if (micros.length <= 8) return { faces: [{ debut: 0, micros, retiens: false }], verso: true };
  const faces: Face[] = [];
  // ⭐ 09/11 soir — la carte remplie : faces ÉQUILIBRÉES (9 → 5 + 4), plus de
  // dernière face à une bulle géante presque vide.
  if (remplie) {
    const nb = Math.ceil(micros.length / 8);
    for (let f = 0, i = 0; f < nb; f++) {
      const t = Math.ceil((micros.length - i) / (nb - f));
      faces.push({ debut: i, micros: micros.slice(i, i + t), retiens: false });
      i += t;
    }
    return { faces, verso: true };
  }
  for (let i = 0; i < micros.length; i += 8) faces.push({ debut: i, micros: micros.slice(i, i + 8), retiens: false });
  const derniere = faces[faces.length - 1];
  if (derniere.micros.length <= 5) {
    derniere.retiens = true;
    return { faces, verso: false };
  }
  return { faces, verso: true };
}

// Une face = une feuille A4 (210 × 297 mm, marges de 10 mm). À l'écran, une
// feuille posée sur la page ; à l'impression, la page elle-même. Seules les
// faces qui en suivent une autre forcent un saut de page (pas de page blanche
// à la fin).
const FEUILLE =
  "flex flex-col bg-white aspect-[210/297] min-w-[210mm] p-[4.76%] print:min-w-0 shadow-md ring-1 ring-slate-200 print:aspect-auto print:h-[277mm] print:p-0 print:shadow-none print:ring-0 break-inside-avoid";
const SUIVANTE = "mt-8 print:mt-0 print:break-before-page";

function Encadre({ id, titre, ecartMm, className }: { id: string; titre: string; ecartMm: number; className: string }) {
  return (
    <section className={`flex min-h-0 flex-col ${className}`}>
      <h2 className="text-base font-black">
// ⛔ 09/11 — à l'écran, une feuille plus étroite que l'A4 (panneau, tablette,
// téléphone) faisait déborder le texte des bulles : elle rétrécissait, pas le
// texte. Elle garde donc au moins 210 mm (la largeur imprimée, celle que
// l'audit vérifie) et la page défile sur le côté si l'écran est plus étroit.
        <TexteMaths texte={titre} />
      </h2>
      <div className="mt-1.5 flex min-h-0 flex-1 flex-col rounded-xl border-2 border-slate-400 px-3 pb-2 pt-0">
        <ZoneEcriture id={id} ecartMm={ecartMm} />
      </div>
    </section>
  );
}

export default async function PageCarteMentale({ params, searchParams }: Props) {
  const n = await lire(params);
  if (!n) notFound();
  const { version } = await searchParams;
  const classe = nomClasse(n.classe);
  const ecartMm = ECART_MM(n.classe);
  const pilote = carteRemplie(n.cle, n.micros.length);
  const remplies = pilote && version !== "a-completer" ? pilote : null;
  const { faces, verso } = decouper(n.micros, Boolean(remplies));
  const nbFeuilles = faces.length + (verso ? 1 : 0);

  return (
    <div className="bg-slate-100 print:bg-white">
      <main data-bilan className="mx-auto max-w-4xl overflow-x-auto px-4 py-6 text-slate-900 print:max-w-none print:overflow-visible print:px-0 print:py-0">
        {/* À l'impression : seulement la feuille (ni l'en-tête ni le pied du site). */}
        <style>{`@media print { @page { size: A4; margin: 10mm; } body:has([data-bilan]) header.sticky, body:has([data-bilan]) > footer, body:has([data-bilan]) > * > footer { display: none !important; } }`}</style>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link href="/cartes-mentales" className="text-sm font-bold text-teal-700 hover:underline">
            ← Toutes les cartes mentales
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <ModeTableau notion={enClair(n.notion)} classe={classe} micros={n.micros.map(enClair)} />
            <BoutonImprimer />
          </div>
        </div>

        {/* Ce que le visiteur voit avant la feuille (il arrive souvent d'un moteur). */}
        <div className="mb-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm ring-1 ring-slate-200 print:hidden">
          <p>
            La carte mentale de <strong className="text-slate-900"><TexteMaths texte={n.notion} /></strong> en maths {classe} :
            {" "}les {n.micros.length} compétence{n.micros.length > 1 ? "s" : ""} de la notion autour du centre.
            {remplies
              ? " Dans chaque bulle : la règle, un exemple chiffré et le piège à éviter."
              : ` Après les vidéos, l'élève coche ce qu'il a compris et écrit ce qu'il a retenu. ${nbFeuilles === 2 ? "Une feuille A4 recto verso." : `${nbFeuilles} pages A4.`}`}
          </p>
          {pilote ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`/cartes-mentales/maths/${n.cle}`}
                className={`rounded-xl px-3 py-1.5 font-bold ${remplies ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-800 hover:bg-slate-200"}`}
                aria-current={remplies ? "page" : undefined}
              >
                Carte remplie (pour réviser)
              </Link>
              <Link
                href={`/cartes-mentales/maths/${n.cle}?version=a-completer`}
                className={`rounded-xl px-3 py-1.5 font-bold ${!remplies ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-800 hover:bg-slate-200"}`}
                aria-current={!remplies ? "page" : undefined}
                rel="nofollow"
              >
                Version à compléter (à imprimer)
              </Link>
            </div>
          ) : null}
        </div>

        {faces.map((f, p) => (
          <section key={p} className={`${FEUILLE} ${p > 0 ? SUIVANTE : ""}`} data-face>
            {p === 0 ? (
              <header className="mb-3 border-b-2 border-slate-900 pb-2">
                <p className="text-xs font-bold tracking-wide text-slate-500">
                  EleveAI · {remplies ? "Carte mentale" : "Ma carte mentale"} · Maths {classe}
                </p>
                <h1 className="mt-0.5 text-xl font-black leading-tight">
                  <TexteMaths texte={n.notion} />
                </h1>
                {remplies ? (
                  <p className="mt-1 text-xs text-slate-600">Dans chaque bulle : la règle, un exemple, le piège à éviter.</p>
                ) : (
                  <>
                    <div className="mt-2 grid grid-cols-3 gap-x-6 text-sm">
                      <p>Nom : <span className="inline-block w-28 border-b border-slate-400" /></p>
                      <p>Classe : <span className="inline-block w-14 border-b border-slate-400" /></p>
                      <p>Date : <span className="inline-block w-20 border-b border-slate-400" /></p>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">Pour chaque vidéo : je coche, puis j&apos;écris ce que j&apos;ai retenu.</p>
                  </>
                )}
              </header>
            ) : (
              <p className="mb-2 border-b border-slate-300 pb-1 text-sm font-black text-slate-600">
                <TexteMaths texte={n.notion} /> (suite)
              </p>
            )}
            <CarteMentale
              centre={n.notion}
              micros={f.micros}
              debut={f.debut}
              ecartMm={ecartMm}
              remplies={remplies}
              idFace={`f${p}`}
              className={f.retiens ? "basis-[56%] shrink-0" : "min-h-0 flex-1"}
            />
            {f.retiens ? (
              <>
                <Encadre id={`f${p}-retiens`} titre="Ce que je retiens de toute la notion" ecartMm={ecartMm} className="mt-4 flex-[3]" />
                <Encadre id={`f${p}-question`} titre="Ma question pour le prof" ecartMm={ecartMm} className="mt-3 flex-1" />
              </>
            ) : null}
          </section>
        ))}

        {/* Le verso : tout pour ce que je retiens. */}
        {verso ? (
          <section className={`${FEUILLE} ${SUIVANTE}`} data-face>
            <Encadre id="verso-retiens" titre={`Ce que je retiens de toute la notion « ${n.notion} »`} ecartMm={ecartMm} className="flex-[4]" />
            <Encadre id="verso-question" titre="Ma question pour le prof" ecartMm={ecartMm} className="mt-4 flex-1" />
          </section>
        ) : null}
      </main>
    </div>
  );
}
