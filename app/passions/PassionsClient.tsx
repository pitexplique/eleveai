"use client";

// Le choix des passions (grandes icônes : les 6e lisent mal) puis, aussitôt,
// les vidéos qui en parlent, chacune avec sa porte vers le coach.
// Voir app/passions/page.tsx pour le pourquoi.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEleve } from "@/context/EleveContext";
import {
  CENTRES_INTERET,
  CENTRE_PAR_ID,
  EMOJI_CENTRE,
  MAX_PASSIONS,
  PRECISIONS_CENTRE,
  centreDePassion,
  libellePassion,
  type TrancheAge,
} from "@/lib/videos/centres-interet";
import { chargerPassions, enregistrerPassions, remettrePlusTard } from "@/lib/passions";

export type VideoPassion = {
  id: string;
  titre: string;
  sousTitre: string;
  vignette: string;
  short: boolean;
  coach: string | null;
  classe: string | null;
  centres: string[];
};

const ORDRE_CLASSES = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "stmg", "terminale"];

const classeNormalisee = (c: string | null | undefined) =>
  (c ?? "").toLowerCase().replace(/-spe$/, "").replace(/^terminale.*/, "terminale") || null;

function trancheDeClasse(c: string | null): TrancheAge | null {
  if (!c) return null;
  if (["cp", "ce1", "ce2"].includes(c)) return "6-8";
  if (["cm1", "cm2", "6e"].includes(c)) return "9-11";
  if (["5e", "4e", "3e"].includes(c)) return "12-14";
  return "15-18";
}

/** Une vidéo de sa classe d'abord, puis des classes voisines. */
function distance(v: VideoPassion, classe: string | null) {
  const i = ORDRE_CLASSES.indexOf(classe ?? "");
  const j = ORDRE_CLASSES.indexOf(v.classe ?? "");
  if (i < 0) return 0;
  return j < 0 ? 99 : Math.abs(i - j) + (j > i ? 0.5 : 0); // à égalité, la classe d'avant (plus facile)
}

export default function PassionsClient({ videos }: { videos: VideoPassion[] }) {
  const { eleve } = useEleve();
  const params = useSearchParams();
  const suite = params.get("next");
  const classe = classeNormalisee(eleve?.classe);

  const [choix, setChoix] = useState<string[]>([]);
  const [ouvert, setOuvert] = useState<string | null>(null); // centre dont on montre les précisions
  const [autre, setAutre] = useState("");
  const [etape, setEtape] = useState<"chargement" | "choisir" | "ressources">("chargement");

  useEffect(() => {
    let vivant = true;
    chargerPassions(eleve).then((p) => {
      if (!vivant) return;
      if (p?.length) {
        setChoix(p);
        setEtape(params.get("modifier") ? "choisir" : "ressources");
      } else setEtape("choisir");
    });
    return () => {
      vivant = false;
    };
    // eleve arrive après le premier rendu (localStorage) : on relit à ce moment-là.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eleve?.code_eleve]);

  // Les centres de son âge d'abord ; les autres restent là (une passion n'a pas d'âge).
  const tranche = trancheDeClasse(classe);
  const centres = useMemo(
    () =>
      [...CENTRES_INTERET].sort(
        (a, b) => Number(!!tranche && !a.tranches.includes(tranche)) - Number(!!tranche && !b.tranches.includes(tranche))
      ),
    [tranche]
  );

  const plein = choix.length >= MAX_PASSIONS;
  const choisi = (centre: string) => choix.some((p) => p.split(":")[0] === centre);

  function basculerCentre(centre: string) {
    if (choisi(centre)) {
      setChoix(choix.filter((p) => p.split(":")[0] !== centre));
      if (ouvert === centre) setOuvert(null);
      return;
    }
    if (plein) return;
    setChoix([...choix, centre]);
    setOuvert(PRECISIONS_CENTRE[centre] ? centre : null);
    // « Lequel ? » s'ouvre sous la grille : sur un téléphone, on l'amène à l'écran.
    if (PRECISIONS_CENTRE[centre])
      setTimeout(() => document.getElementById("precisions")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }

  function preciser(centre: string, precision: string) {
    const p = `${centre}:${precision}`;
    setChoix(choix.map((x) => (x.split(":")[0] === centre ? (x === p ? centre : p) : x)));
  }

  function ajouterAutre() {
    const t = autre.trim().replace(/:/g, " ").slice(0, 40);
    if (t.length < 2 || plein) return;
    setChoix([...choix, `autre:${t}`]);
    setAutre("");
  }

  async function valider() {
    await enregistrerPassions(eleve, choix);
    setOuvert(null);
    setEtape("ressources");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (etape === "chargement") {
    return <main className="min-h-screen bg-amber-50 p-10 text-center text-slate-500">Chargement…</main>;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fef3c7,_#fff7ed_40%,_#ffffff_75%)] px-4 py-6">
      <div className="mx-auto max-w-5xl">
        {etape === "choisir" ? (
          <>
            <header className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/cahier-vacances/ti-margo.png" alt="" className="h-20 w-20 shrink-0 object-contain" />
              <div>
                <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Qu&apos;est-ce que tu aimes ?</h1>
                <p className="mt-1 text-lg font-semibold text-slate-600">
                  Touche jusqu&apos;à {MAX_PASSIONS} passions. On te montrera les maths qui en parlent !
                </p>
              </div>
            </header>

            {/* Ce qu'il a déjà choisi */}
            <div className="mt-5 flex min-h-[3.5rem] flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-amber-300 bg-white/70 p-3">
              {choix.length === 0 ? (
                <span className="text-slate-400">Tes passions apparaîtront ici.</span>
              ) : (
                choix.map((p) => {
                  const l = libellePassion(p);
                  return (
                    <button
                      key={p}
                      onClick={() => setChoix(choix.filter((x) => x !== p))}
                      className="flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-lg font-black text-slate-900 shadow"
                      title="Retirer"
                    >
                      <span className="text-2xl">{l.emoji}</span> {l.nom} <span className="text-slate-700">✕</span>
                    </button>
                  );
                })
              )}
              <span className="ml-auto text-sm font-bold text-slate-500">
                {choix.length} / {MAX_PASSIONS}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {centres.map((c) => {
                const actif = choisi(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => basculerCentre(c.id)}
                    disabled={!actif && plein}
                    className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-2 p-3 text-center transition ${
                      actif
                        ? "border-amber-500 bg-amber-100 shadow-lg ring-4 ring-amber-300"
                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-amber-300 hover:shadow disabled:opacity-40"
                    }`}
                  >
                    <span className="text-5xl leading-none">{EMOJI_CENTRE[c.id]}</span>
                    <span className="text-sm font-black text-slate-800">{c.nom}</span>
                  </button>
                );
              })}
            </div>

            {/* Les précisions : « Quel sport ? » → Lutte */}
            {ouvert && choisi(ouvert) && (
              <section id="precisions" className="mt-5 rounded-2xl border-2 border-amber-300 bg-white p-4 shadow">
                <h2 className="text-xl font-black text-slate-900">
                  {EMOJI_CENTRE[ouvert]} Lequel ? <span className="text-base font-semibold text-slate-500">(si tu veux)</span>
                </h2>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                  {PRECISIONS_CENTRE[ouvert].map((p) => {
                    const actif = choix.includes(`${ouvert}:${p.id}`);
                    return (
                      <button
                        key={p.id}
                        onClick={() => preciser(ouvert, p.id)}
                        className={`flex flex-col items-center gap-1 rounded-xl border-2 p-2 ${
                          actif ? "border-amber-500 bg-amber-100 ring-2 ring-amber-300" : "border-slate-200 bg-white hover:border-amber-300"
                        }`}
                      >
                        <span className="text-4xl leading-none">{p.emoji}</span>
                        <span className="text-xs font-bold text-slate-700">{p.nom}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Une passion qui n'est pas dans la liste */}
            <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3">
              <span className="text-3xl">⭐</span>
              <input
                value={autre}
                onChange={(e) => setAutre(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ajouterAutre()}
                maxLength={40}
                disabled={plein}
                placeholder="Autre passion ? Écris-la ici"
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-lg disabled:bg-slate-100"
              />
              <button
                onClick={ajouterAutre}
                disabled={plein || autre.trim().length < 2}
                className="rounded-lg bg-slate-800 px-4 py-2 font-bold text-white disabled:opacity-30"
              >
                Ajouter
              </button>
            </div>

            <div className="sticky bottom-3 mt-6 flex flex-wrap items-center justify-end gap-3">
              {suite && (
                <Link
                  href={suite}
                  onClick={remettrePlusTard}
                  className="rounded-xl px-4 py-3 font-bold text-slate-500 hover:text-slate-800"
                >
                  Plus tard
                </Link>
              )}
              <button
                onClick={valider}
                disabled={choix.length === 0}
                className="rounded-2xl bg-emerald-500 px-8 py-4 text-xl font-black text-white shadow-lg hover:bg-emerald-600 disabled:opacity-40"
              >
                C&apos;est parti ! →
              </button>
            </div>
            {!eleve && (
              <p className="mt-3 text-right text-xs text-slate-500">
                Tes passions restent sur cet appareil. Connecte-toi pour les retrouver partout.
              </p>
            )}
          </>
        ) : (
          <Ressources choix={choix} videos={videos} classe={classe} suite={suite} />
        )}
      </div>
    </main>
  );
}

function Ressources({
  choix,
  videos,
  classe,
  suite,
}: {
  choix: string[];
  videos: VideoPassion[];
  classe: string | null;
  suite: string | null;
}) {
  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Les maths de ce que tu aimes</h1>
          <p className="mt-1 text-lg font-semibold text-slate-600">
            Regarde une vidéo, puis entraîne-toi au coach sur la même chose.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/passions?modifier=1" className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-bold text-slate-700 hover:bg-slate-50">
            ✏️ Changer mes passions
          </Link>
          {suite && (
            <Link href={suite} className="rounded-xl bg-slate-800 px-4 py-2 font-bold text-white hover:bg-slate-700">
              Continuer →
            </Link>
          )}
        </div>
      </header>

      {choix.map((p) => {
        const l = libellePassion(p);
        const centre = centreDePassion(p);
        const precision = p.includes(":") ? p.split(":")[1] : null;
        const liste = centre
          ? videos
              .filter((v) => v.centres.includes(centre))
              .sort((a, b) => distance(a, classe) - distance(b, classe))
              .slice(0, 8)
          : [];
        const nomCentre = centre ? CENTRE_PAR_ID.get(centre)?.nom : null;
        return (
          <section key={p} className="mt-8">
            <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900">
              <span className="text-4xl">{l.emoji}</span> {l.nom}
            </h2>
            {precision && (
              <p className="mt-1 rounded-lg bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-900">
                {liste.length
                  ? `Pas encore de vidéo rien que sur « ${l.nom} » : ta passion est notée, elle donne des idées de vidéos ! En attendant, voici les maths du thème « ${nomCentre ?? l.nom} ».`
                  : `Pas encore de vidéo sur « ${l.nom} » : ta passion est notée, elle donne des idées de vidéos !`}
              </p>
            )}
            {liste.length === 0 && !precision && (
              <p className="mt-2 text-slate-500">Pas encore de vidéo sur ce thème. Ta passion est notée !</p>
            )}
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {liste.map((v) => (
                <article key={v.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <Link href={`/video/${v.id}${v.short ? "?format=short" : ""}`} className="group relative block aspect-video overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.vignette} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-2xl shadow">▶</span>
                    </span>
                    {v.classe && (
                      <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-bold uppercase text-white">
                        {v.classe}
                      </span>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col gap-2 p-3">
                    <h3 className="font-black leading-snug text-slate-900">{v.titre}</h3>
                    {v.sousTitre && <p className="line-clamp-2 text-xs text-slate-500">{v.sousTitre}</p>}
                    {v.coach && (
                      <Link
                        href={v.coach}
                        className="mt-auto rounded-xl bg-emerald-500 px-3 py-2 text-center font-black text-white hover:bg-emerald-600"
                      >
                        🎯 Je m&apos;entraîne au coach
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
