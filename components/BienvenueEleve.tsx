"use client";

// ⭐ LA FENÊTRE DE BIENVENUE DE L'ÉLÈVE (24/11/2026). Frédéric : « j'aimerais
// que lorsqu'il se connecte, il ait plusieurs propositions en direct sur une
// modale ». Avant, l'élève qui venait de se connecter arrivait sur l'accueil
// des parents (« Votre enfant progresse en maths… ») et devait chercher seul
// où aller.
//
// Elle s'ouvre UNE fois, juste après la connexion (la page de connexion pose
// la marque `marquerBienvenue`), seulement pour un élève, et seulement quand
// il ne se connectait pas POUR quelque chose de précis (`?next=`).
// Les propositions sont « en direct » : elles viennent de SES données —
// la dernière notion travaillée (/api/mes-notions), un message du prof pas
// encore lu (/api/eleve/messages-classe), sa classe.
// Phrases courtes, gros boutons, un dessin par bouton : les 6e lisent mal.
//
// ☁️ 24/11/2026 (soir) — Frédéric, vu chez une prof de graphisme : « un petit
// nuage avec au centre Ti Margo et des petites flèches » vers le tableau de
// bord, le coach, les vidéos… ; Ti Margo dit « Je te suis et je
// t'accompagne ! ». Dans l'ordre, de haut en bas :
//   1. ✉️ le message du prof pas encore lu (« J'ai lu », « ▶ Commencer la séance ») ;
//   2. 💬 le mot PERSONNEL de Ti Margo : ce que CET élève doit faire
//      maintenant (lib/conseilTiMargo.ts, sans IA) ;
//   3. ☁️ le nuage et ses flèches (sur téléphone : le nuage, puis la liste).

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { prenomAffichable } from "@/lib/prenom";
import { conseilTiMargo, notionARetravailler, type NotionEleve, type Reprise } from "@/lib/conseilTiMargo";
import { CENTRE_PAR_ID, EMOJI_CENTRE } from "@/lib/videos/centres-interet";

const CLE = "eleveai_bienvenue";

/** Appelée par la page de connexion, juste avant de quitter la page. */
export function marquerBienvenue(type: string | null | undefined) {
  if (type !== "eleve") return;
  try {
    sessionStorage.setItem(CLE, "1");
  } catch {
    /* navigation privée : pas de fenêtre, rien de grave */
  }
}

type Choix = { href: string; emoji: string; titre: string; detail?: string };
type MessageProf = { id: string; texte: string; lu?: boolean; lien?: string | null };
type Notions = { notions: NotionEleve[]; titres: Record<string, string>; reprise: Reprise };

// Six places autour du nuage, dans un repère 600 × 420 : le cadre garde ces
// proportions, les flèches tombent donc juste à toutes les largeurs.
const W = 600;
const H = 420;
const PLACES: { x: number; y: number; de: [number, number]; vers: [number, number]; l?: number }[] = [
  { x: 100, y: 52, de: [215, 120], vers: [150, 82] },
  { x: 500, y: 52, de: [385, 120], vers: [450, 82] },
  // Les bulles du milieu, plus étroites : leurs flèches se voient.
  { x: 78, y: 210, de: [188, 210], vers: [160, 210], l: 26 },
  { x: 522, y: 210, de: [412, 210], vers: [440, 210], l: 26 },
  { x: 100, y: 368, de: [215, 300], vers: [150, 338] },
  { x: 500, y: 368, de: [385, 300], vers: [450, 338] },
];

// Même garde que la carte du tableau de bord : seulement un chemin du coach.
const lienSur = (l?: string | null) => (l && l.startsWith("/coach") && !l.includes("//") ? l : null);

// Ses passions → une bulle à lui. Certaines ont leur simulateur (Frédéric,
// 24/11 : « certains veulent voir les cyclones »).
const SIMULATEUR_PASSION: Record<string, { titre: string; href: string }> = {
  "meteo-climat": { titre: "Les cyclones", href: "/simulateur-cyclone" },
  "nature-ecologie": { titre: "Le volcan", href: "/simulateur-volcan" },
};

const IMAGE_HUMEUR = {
  bravo: "/ti-margo/animations/bravo.png",
  encouragement: "/ti-margo/animations/encouragement.png",
  salut: "/ti-margo/animations/salut.png",
} as const;

export default function BienvenueEleve() {
  const { eleve, pret } = useEleve();
  const [ouvert, setOuvert] = useState(false);
  const [prenom, setPrenom] = useState<string | null>(null);
  const [classe, setClasse] = useState<string | null>(null);
  const [notions, setNotions] = useState<Notions | null>(null);
  const [messages, setMessages] = useState<MessageProf[]>([]);
  const [passions, setPassions] = useState<string[]>([]);
  // Les bulles attendent ses notions et ses passions : sinon elles changent
  // sous ses yeux (« Mes passions » devient « Les cyclones »…).
  const [donneesPretes, setDonneesPretes] = useState(false);

  useEffect(() => {
    if (!pret || !eleve || eleve.type_utilisateur !== "eleve") return;
    let marque = false;
    try {
      marque = sessionStorage.getItem(CLE) === "1";
      if (marque) sessionStorage.removeItem(CLE);
    } catch {
      /* rien */
    }
    if (!marque) return;
    setOuvert(true);
    setPrenom(prenomAffichable(eleve.nom));
    setClasse(eleve.classe ?? null);
    if (!eleve.token) {
      setDonneesPretes(true);
      return;
    }
    const h = { Authorization: `Bearer ${eleve.token}` };

    // Le pseudo choisi par l'élève passe avant le nom de la base.
    const passionsLues = fetch("/api/passions", { headers: h })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const p = typeof d?.pseudo === "string" ? d.pseudo.trim() : "";
        if (p) setPrenom(p);
        if (Array.isArray(d?.passions)) setPassions(d.passions.filter((x: unknown) => typeof x === "string"));
      })
      .catch(() => null);

    if (!eleve.classe) {
      fetch("/api/ma-classe", { headers: h })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (typeof d?.classe === "string") setClasse(d.classe);
        })
        .catch(() => null);
    }

    // Ses notions, ses scores et la série où il en était (24/11 : « reprise »).
    const notionsLues = fetch("/api/mes-notions", { headers: h })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.ok) return;
        setNotions({
          notions: Array.isArray(d.notions) ? d.notions : [],
          titres: (d.titres ?? {}) as Record<string, string>,
          reprise: (d.reprise ?? null) as Reprise,
        });
      })
      .catch(() => null);
    const fin = () => setDonneesPretes(true);
    Promise.allSettled([passionsLues, notionsLues]).then(fin);
    const secours = setTimeout(fin, 4000);

    fetch("/api/eleve/messages-classe", { headers: h })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const msgs = (d?.messages ?? []) as MessageProf[];
        setMessages(msgs.filter((m) => !m.lu && typeof m.texte === "string"));
      })
      .catch(() => null);
    return () => clearTimeout(secours);
  }, [pret, eleve]);

  // Échap ferme la fenêtre.
  useEffect(() => {
    if (!ouvert) return;
    const f = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [ouvert]);

  if (!ouvert) return null;

  const message = messages[0] ?? null;
  function marquerLu(id: string) {
    setMessages((m) => m.filter((x) => x.id !== id));
    if (!eleve?.token) return;
    fetch("/api/eleve/messages-classe", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${eleve.token}` },
      body: JSON.stringify({ id }),
    }).catch(() => null);
  }

  // Le mot personnel attend les notions (sinon il dirait « Bienvenue ! » à
  // un élève qui a déjà travaillé).
  const conseil = notions && donneesPretes ? conseilTiMargo({ ...notions, classe }) : null;

  // Les bulles autour du nuage, dans l'ordre des places (haut gauche, haut
  // droite, gauche, droite, bas gauche, bas droite).
  const choix: Choix[] = [
    { href: "/dashboard-eleve", emoji: "✈️", titre: "Où j'en suis", detail: "Mon tableau de bord." },
    {
      href: classe ? `/coach-ia/maths?classe=${encodeURIComponent(classe)}` : "/coach-ia/maths",
      emoji: "🎯",
      titre: "Le coach",
      detail: "Je m'entraîne.",
    },
  ];
  const faible = notions ? notionARetravailler(notions.notions) : null;
  if (faible) choix.push({ href: faible.href, emoji: "🔁", titre: "À revoir", detail: faible.titre });
  choix.push({
    href: classe ? `/video?classe=${encodeURIComponent(classe.toLowerCase())}` : "/video",
    emoji: "🎬",
    titre: "Les vidéos",
    detail: "Je regarde.",
  });
  const passion = passions[0];
  const simu = passion ? SIMULATEUR_PASSION[passion] : undefined;
  if (simu) {
    choix.push({ href: simu.href, emoji: EMOJI_CENTRE[passion] ?? "💛", titre: simu.titre, detail: "Ma passion." });
  } else if (passion && CENTRE_PAR_ID.get(passion)) {
    choix.push({ href: "/passions", emoji: EMOJI_CENTRE[passion] ?? "💛", titre: CENTRE_PAR_ID.get(passion)!.nom, detail: "Ma passion." });
  } else {
    choix.push({ href: "/passions", emoji: "💛", titre: "Mes passions", detail: "Je les choisis." });
  }
  if (classe && /^(cp|ce1|ce2|cm1|cm2|6e|5e|4e|3e)$/i.test(classe)) {
    choix.push({
      href: `/fiches-exercices?classe=${encodeURIComponent(classe.toLowerCase())}`,
      emoji: "📝",
      titre: "Une fiche",
      detail: "Des exercices.",
    });
  }
  choix.push({ href: "/simulateurs", emoji: "🧪", titre: "Les simulateurs", detail: "J'expérimente." });
  const places = donneesPretes ? choix.slice(0, PLACES.length) : [];

  const bouton = (c: Choix, classes = "") => (
    <Link
      href={c.href}
      onClick={() => setOuvert(false)}
      className={`flex items-center gap-2 rounded-2xl bg-white px-2.5 py-2 text-slate-900 shadow-md ring-2 ring-sky-200 transition hover:scale-105 hover:ring-sky-400 ${classes}`}
    >
      <span className="text-2xl" aria-hidden>
        {c.emoji}
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-sm font-black leading-tight sm:text-base">{c.titre}</span>
        {c.detail ? <span className="block text-xs font-bold leading-tight text-slate-500 sm:truncate">{c.detail}</span> : null}
      </span>
    </Link>
  );

  // Le nuage : des ronds blancs qui se chevauchent, Ti Margo au milieu.
  const nuage = (petit: boolean) => (
    <div className={`relative mx-auto ${petit ? "h-32 w-60" : "h-full w-full"}`}>
      <div className="absolute inset-x-[6%] inset-y-[24%] rounded-[50%] bg-white" />
      <div className="absolute left-[10%] top-[10%] h-[52%] w-[34%] rounded-full bg-white" />
      <div className="absolute left-[33%] top-0 h-[60%] w-[36%] rounded-full bg-white" />
      <div className="absolute right-[8%] top-[12%] h-[50%] w-[32%] rounded-full bg-white" />
      <div className="absolute bottom-[2%] left-[14%] h-[46%] w-[38%] rounded-full bg-white" />
      <div className="absolute bottom-0 left-[34%] h-[50%] w-[34%] rounded-full bg-white" />
      <div className="absolute bottom-[2%] right-[12%] h-[48%] w-[38%] rounded-full bg-white" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <Image
          src={IMAGE_HUMEUR[conseil?.humeur ?? "salut"]}
          alt="Ti Margo"
          width={320}
          height={320}
          sizes="112px"
          className={petit ? "h-14 w-14" : "h-28 w-28"}
          priority
        />
        <p className={`font-black leading-tight text-sky-900 ${petit ? "text-sm" : "text-lg"}`}>
          Je te suis
          <br />
          et je t&apos;accompagne !
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-950/60 p-3 sm:items-center"
      onClick={() => setOuvert(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bienvenue-titre"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[95vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:max-w-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="bienvenue-titre" className="text-2xl font-black text-slate-900">
            {prenom ? `Bonjour ${prenom} !` : "Bonjour !"} 👋
          </h2>
          <button
            type="button"
            onClick={() => setOuvert(false)}
            aria-label="Fermer"
            className="-mr-1 -mt-1 rounded-full px-3 py-1 text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        {/* 1. Le message du prof, en premier. */}
        {message ? (
          <div className="mt-3 rounded-2xl bg-amber-100 p-3 ring-2 ring-amber-300 sm:p-4">
            <p className="text-sm font-black uppercase text-amber-800">✉️ Ton prof t&apos;a écrit</p>
            <p className="mt-1 whitespace-pre-wrap break-words text-base font-bold leading-snug text-slate-900 sm:text-lg">{message.texte}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {lienSur(message.lien) ? (
                <a
                  href={lienSur(message.lien)!}
                  onClick={() => marquerLu(message.id)}
                  className="rounded-2xl bg-emerald-600 px-4 py-2.5 text-base font-black text-white shadow-lg hover:bg-emerald-500 sm:px-5 sm:py-3 sm:text-lg"
                >
                  ▶ Commencer la séance
                </a>
              ) : null}
              <button
                type="button"
                onClick={() => marquerLu(message.id)}
                className="rounded-2xl bg-white px-4 py-2.5 text-base font-black text-slate-900 shadow ring-1 ring-amber-300 hover:bg-amber-50 sm:px-5 sm:py-3 sm:text-lg"
              >
                ✓ J&apos;ai lu
              </button>
            </div>
            {messages.length > 1 ? (
              <Link
                href="/dashboard-eleve"
                onClick={() => setOuvert(false)}
                className="mt-2 block text-sm font-bold text-amber-900 underline"
              >
                + {messages.length - 1} autre{messages.length > 2 ? "s" : ""} message{messages.length > 2 ? "s" : ""}
              </Link>
            ) : null}
          </div>
        ) : null}

        {/* 2. Le mot personnel de Ti Margo : quoi faire maintenant. */}
        {conseil ? (
          <div className="mt-3 flex flex-col gap-2 rounded-2xl bg-emerald-50 p-3 ring-2 ring-emerald-300 sm:flex-row sm:items-center sm:gap-3 sm:p-4">
            <p className="flex-1 text-base font-bold leading-snug text-slate-900 sm:text-lg">
              <span className="font-black text-emerald-800">💬 Ti Margo : </span>
              {conseil.texte}
            </p>
            <Link
              href={conseil.href}
              onClick={() => setOuvert(false)}
              className={`shrink-0 rounded-2xl px-4 py-2.5 text-center text-base font-black shadow-lg sm:px-5 sm:py-3 sm:text-lg ${
                message ? "bg-white text-emerald-800 ring-2 ring-emerald-500 hover:bg-emerald-100" : "bg-emerald-600 text-white hover:bg-emerald-500"
              }`}
            >
              ▶ {conseil.bouton}
            </Link>
          </div>
        ) : null}

        {/* 3a. Téléphone : le nuage, puis les choix en grosse liste. */}
        <div className="mt-4 sm:hidden">
          <div className="rounded-3xl bg-sky-100 py-2">{nuage(true)}</div>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {places.map((c) => (
              <li key={c.titre}>{bouton(c, "h-full")}</li>
            ))}
          </ul>
        </div>

        {/* 3b. PC et tablette : le nuage au centre, les flèches, les choix autour. */}
        <div className="relative mt-4 hidden w-full rounded-3xl bg-sky-100 sm:block" style={{ aspectRatio: `${W} / ${H}` }}>
          <div className="absolute" style={{ left: "28%", top: "18%", width: "44%", height: "64%" }}>
            {nuage(false)}
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <marker id="bienvenue-fleche" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#0369a1" />
              </marker>
            </defs>
            {places.map((c, i) => {
              const p = PLACES[i];
              return (
                <line
                  key={c.titre}
                  x1={p.de[0]}
                  y1={p.de[1]}
                  x2={p.vers[0]}
                  y2={p.vers[1]}
                  stroke="#0369a1"
                  strokeWidth={3}
                  strokeLinecap="round"
                  markerEnd="url(#bienvenue-fleche)"
                />
              );
            })}
          </svg>
          {places.map((c, i) => {
            const p = PLACES[i];
            return (
              <div
                key={c.titre}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%`, width: `${p.l ?? 31}%` }}
              >
                {bouton(c, "w-full")}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
