"use client";

// ☁️ LE NUAGE DE L'ACCUEIL (24/11/2026) — /accueil-2.
//
// Frédéric, 24/11 : « les élèves attendent de faire des choses dans l'ordinateur
// qui leur correspond. […] Certains veulent commencer par des moteurs, d'autres
// par des coachs, d'autres par des vidéos… Le modal avec la carte est super et
// le CEO doit en tenir compte pour la page d'accueil. » Puis : « Il y a 2 cas.
// 1, les gens ne sont pas connectés, donc on montre ce que les connectés peuvent
// faire, et après, ceux qui sont connectés. »
//
// Trois cas, un seul dessin (Ti Margo au centre, six bulles fléchées) :
//   • VISITEUR : « Que veux-tu faire ? » → six activités à essayer tout de
//     suite, puis « Avec ton compte, en plus » (tableau de bord, médailles,
//     message du prof, le coach qui retient où tu en es) ;
//   • ÉLÈVE connecté : SON nuage, comme la fenêtre de bienvenue — le message du
//     prof pas lu, le mot personnel de Ti Margo, puis ses bulles ;
//   • PROF (ou direction) connecté : ses classes, le direct, le bulletin, et ce
//     qu'il projette.
// ⛔ Le dessin est COPIÉ de components/BienvenueEleve.tsx (une autre session y
// travaillait le 24/11) : à mettre en commun quand les deux seront stables.
// ⛔ Le cas est choisi seulement quand `pret` est vrai : avant, on montre le
// nuage sans bulles (pas de bulles « visiteur » qui sautent chez un élève).

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { prenomAffichable } from "@/lib/prenom";
import { conseilTiMargo, notionARetravailler, type NotionEleve, type Reprise } from "@/lib/conseilTiMargo";
import { CENTRE_PAR_ID, EMOJI_CENTRE } from "@/lib/videos/centres-interet";

type Choix = { href: string; emoji: string; titre: string; detail?: string };
type MessageProf = { id: string; texte: string; lu?: boolean; lien?: string | null };
type Notions = { notions: NotionEleve[]; titres: Record<string, string>; reprise: Reprise };

// Six places autour du nuage, dans un repère 600 × 420 (comme la fenêtre de bienvenue).
const W = 600;
const H = 420;
const PLACES: { x: number; y: number; de: [number, number]; vers: [number, number]; l?: number }[] = [
  { x: 100, y: 52, de: [215, 120], vers: [150, 82] },
  { x: 500, y: 52, de: [385, 120], vers: [450, 82] },
  // 25/11 : 28 % (au lieu de 26 %) pour que « Automatismes » tienne sur une ligne.
  { x: 84, y: 210, de: [192, 210], vers: [174, 210], l: 28 },
  { x: 516, y: 210, de: [408, 210], vers: [426, 210], l: 28 },
  { x: 100, y: 368, de: [215, 300], vers: [150, 338] },
  { x: 500, y: 368, de: [385, 300], vers: [450, 338] },
];

const lienSur = (l?: string | null) => (l && l.startsWith("/coach") && !l.includes("//") ? l : null);

const SIMULATEUR_PASSION: Record<string, { titre: string; href: string }> = {
  "meteo-climat": { titre: "Les cyclones", href: "/simulateur-cyclone" },
  "nature-ecologie": { titre: "Le volcan", href: "/simulateur-volcan" },
};

const IMAGE_HUMEUR = {
  bravo: "/ti-margo/animations/bravo.png",
  encouragement: "/ti-margo/animations/encouragement.png",
  salut: "/ti-margo/animations/salut.png",
} as const;

/** ⭐ 25/11/2026 — Frédéric : « le cœur est quand même le coach » ; les élèves
 *  aiment « le coach, les vidéos, les exercices interactifs et même la dictée ».
 *  Son ordre : « coach fiches exercices vidéos automatisme énigme simulateur
 *  dictée », « la dictée est en dernier ». Le coach a son bandeau vert
 *  au-dessus du nuage (BandeauCoach) ; le nuage garde les six autres, dans
 *  cet ordre (haut gauche, haut droite, milieu gauche… bas droite = dictée). */
const CHOIX_VISITEUR: Choix[] = [
  { href: "/fiches-exercices", emoji: "📝", titre: "Fiches d'exercices", detail: "Corrigés tout de suite." },
  { href: "/video", emoji: "🎬", titre: "Les vidéos", detail: "Je regarde." },
  { href: "/automatismes-maths", emoji: "⚡", titre: "Automa­tismes" /* césure douce : coupe en 375 px seulement */, detail: "Vite, sans calculatrice." },
  { href: "/enigmes-maths", emoji: "🧩", titre: "Les énigmes", detail: "Je cherche." },
  { href: "/simulateurs", emoji: "🌋", titre: "Les simulateurs", detail: "Cyclone, volcan…" },
  { href: "/dictee-du-jour", emoji: "✍️", titre: "La dictée", detail: "J'écoute, j'écris." },
];

/** Le coach : la classe ouvre le coach maths AVEC cette classe sélectionnée
 *  (l'élève y choisit sa notion), pas la 1re série directement.
 *  Frédéric, 25/11 : « tu dois envoyer soit à choisis ta classe soit à coach
 *  maths avec la bonne classe sélectionnée, pas sur le tutor directement ». */
const CLASSES_COACH: { slug: string; label: string }[] = [
  { slug: "cp", label: "CP" },
  { slug: "ce1", label: "CE1" },
  { slug: "ce2", label: "CE2" },
  { slug: "cm1", label: "CM1" },
  { slug: "cm2", label: "CM2" },
  { slug: "6e", label: "6e" },
  { slug: "5e", label: "5e" },
  { slug: "4e", label: "4e" },
  { slug: "3e", label: "3e" },
  { slug: "seconde", label: "2de" },
  { slug: "premiere-spe", label: "1re" },
  { slug: "terminale-spe", label: "Tle" },
];
const lienCoachClasse = (classe: string) => `/coach-ia/maths?classe=${encodeURIComponent(classe)}`;

/** Ce qu'un compte ajoute (ce qui existe au 24/11 : Cockpit, récompenses, message du prof, reprise). */
const AVEC_UN_COMPTE: Choix[] = [
  { href: "/auth/signin", emoji: "✈️", titre: "Ton tableau de bord", detail: "Tes barres, notion par notion." },
  { href: "/auth/signin", emoji: "🏅", titre: "Tes médailles", detail: "Gagnées en t'entraînant." },
  { href: "/auth/signin", emoji: "✉️", titre: "Le message de ton prof", detail: "Et sa séance, en un clic." },
  { href: "/auth/signin", emoji: "🔁", titre: "Le coach se souvient", detail: "Tu reprends où tu t'es arrêté." },
];

const CHOIX_PROF: Choix[] = [
  { href: "/prof/classes", emoji: "🏫", titre: "Mes classes", detail: "Codes, messages." },
  { href: "/prof/classes/direct", emoji: "📡", titre: "En direct", detail: "Qui bloque, maintenant." },
  { href: "/coach-ia/maths", emoji: "🎯", titre: "Une séance", detail: "Je coche, j'envoie." },
  { href: "/prof/classes/bulletin", emoji: "📋", titre: "Le bulletin", detail: "À copier dans Pronote." },
  { href: "/enigmes-maths", emoji: "🧩", titre: "Une énigme", detail: "À projeter." },
  { href: "/video", emoji: "🎬", titre: "Une vidéo", detail: "À projeter." },
];

const CHOIX_AUTRE: Choix[] = [
  { href: "/dashboard", emoji: "📊", titre: "Mon tableau de bord", detail: "Les progrès." },
  { href: "/coach-ia/maths", emoji: "🎯", titre: "Le coach", detail: "S'entraîner." },
  { href: "/simulateurs", emoji: "🌋", titre: "Les simulateurs", detail: "Cyclone, volcan…" },
  { href: "/video", emoji: "🎬", titre: "Les vidéos", detail: "Regarder." },
  { href: "/fiches-exercices", emoji: "📝", titre: "Fiches d'exercices", detail: "Corrigés tout de suite." },
  { href: "/enigmes-maths", emoji: "🧩", titre: "Les énigmes", detail: "Chercher." },
];

export default function NuageAccueil() {
  const { eleve, pret } = useEleve();
  const cas: "attente" | "visiteur" | "eleve" | "prof" | "autre" = !pret
    ? "attente"
    : !eleve
      ? "visiteur"
      : eleve.type_utilisateur === "eleve"
        ? "eleve"
        : ["prof", "principal", "boss"].includes(eleve.type_utilisateur ?? "")
          ? "prof"
          : "autre";

  const [prenom, setPrenom] = useState<string | null>(null);
  const [classe, setClasse] = useState<string | null>(null);
  const [notions, setNotions] = useState<Notions | null>(null);
  const [messages, setMessages] = useState<MessageProf[]>([]);
  const [passions, setPassions] = useState<string[]>([]);
  const [donneesPretes, setDonneesPretes] = useState(false);

  // Les données de l'élève connecté (mêmes routes que la fenêtre de bienvenue).
  useEffect(() => {
    if (!pret || !eleve) return;
    setPrenom(prenomAffichable(eleve.nom));
    if (eleve.type_utilisateur !== "eleve") return;
    setClasse(eleve.classe ?? null);
    if (!eleve.token) {
      setDonneesPretes(true);
      return;
    }
    const h = { Authorization: `Bearer ${eleve.token}` };
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

  const message = cas === "eleve" ? (messages[0] ?? null) : null;
  function marquerLu(id: string) {
    setMessages((m) => m.filter((x) => x.id !== id));
    if (!eleve?.token) return;
    fetch("/api/eleve/messages-classe", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${eleve.token}` },
      body: JSON.stringify({ id }),
    }).catch(() => null);
  }
  const conseil = cas === "eleve" && notions && donneesPretes ? conseilTiMargo({ ...notions, classe }) : null;

  // Les bulles du cas.
  let choix: Choix[] = [];
  if (cas === "visiteur") choix = CHOIX_VISITEUR;
  else if (cas === "prof") choix = CHOIX_PROF;
  else if (cas === "autre") choix = CHOIX_AUTRE;
  // Élève : le coach, « Où j'en suis » et « À revoir » vont dans le bandeau vert ;
  // le nuage garde l'ordre de Frédéric (exercices … dictée), la passion
  // remplaçant les simulateurs quand elle a le sien.
  const faible = cas === "eleve" && notions ? notionARetravailler(notions.notions) : null;
  const classeMin = classe ? classe.toLowerCase() : null;
  if (cas === "eleve" && donneesPretes) {
    const passion = passions[0];
    const simu = passion ? SIMULATEUR_PASSION[passion] : undefined;
    const centre = passion ? CENTRE_PAR_ID.get(passion) : undefined;
    choix = [
      {
        href:
          classeMin && /^(cp|ce1|ce2|cm1|cm2|6e|5e|4e|3e)$/.test(classeMin)
            ? `/fiches-exercices?classe=${encodeURIComponent(classeMin)}`
            : "/fiches-exercices",
        emoji: "📝",
        titre: "Fiches d'exercices",
        detail: "Corrigés tout de suite.",
      },
      {
        href: classeMin ? `/video?classe=${encodeURIComponent(classeMin)}` : "/video",
        emoji: "🎬",
        titre: "Les vidéos",
        detail: "Je regarde.",
      },
      CHOIX_VISITEUR[2],
      CHOIX_VISITEUR[3],
      simu
        ? { href: simu.href, emoji: EMOJI_CENTRE[passion] ?? "💛", titre: simu.titre, detail: "Ma passion." }
        : centre
          ? { href: "/passions", emoji: EMOJI_CENTRE[passion] ?? "💛", titre: centre.nom, detail: "Ma passion." }
          : CHOIX_VISITEUR[4],
      CHOIX_VISITEUR[5],
    ];
  }
  const places = choix.slice(0, PLACES.length);
  const lienCoachEleve = classe ? `/coach-ia/maths?classe=${encodeURIComponent(classe)}` : "/coach-ia/maths";

  const bulleCentre =
    // 25/11 (Frédéric) : « Je te suis et je t'accompagne » trop long →
    // l'élève a aussi « Que veux-tu faire ? », sous « Mon univers ».
    cas === "prof" ? (
      <>
        Que fait-on
        <br />
        avec vos classes ?
      </>
    ) : (
      <>
        Que veux-tu
        <br />
        faire ?
      </>
    );

  const bouton = (c: Choix, classes = "") => (
    <Link
      href={c.href}
      className={`flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 text-slate-900 shadow-md ring-2 ring-sky-200 transition hover:scale-105 hover:ring-sky-400 ${classes}`}
    >
      <span className="text-2xl sm:text-3xl" aria-hidden>
        {c.emoji}
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-base font-black leading-tight sm:text-lg">{c.titre}</span>
        {c.detail ? <span className="block text-xs font-bold leading-tight text-slate-500 sm:text-sm">{c.detail}</span> : null}
      </span>
    </Link>
  );

  const nuage = (petit: boolean) => (
    <div className={`relative mx-auto ${petit ? "h-36 w-64" : "h-full w-full"}`}>
      <div className="absolute inset-x-[6%] inset-y-[24%] rounded-[50%] bg-white" />
      <div className="absolute left-[10%] top-[10%] h-[52%] w-[34%] rounded-full bg-white" />
      <div className="absolute left-[33%] top-0 h-[60%] w-[36%] rounded-full bg-white" />
      <div className="absolute right-[8%] top-[12%] h-[50%] w-[32%] rounded-full bg-white" />
      <div className="absolute bottom-[2%] left-[14%] h-[46%] w-[38%] rounded-full bg-white" />
      <div className="absolute bottom-0 left-[34%] h-[50%] w-[34%] rounded-full bg-white" />
      <div className="absolute bottom-[2%] right-[12%] h-[48%] w-[38%] rounded-full bg-white" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {/* 25/11 (Frédéric) : « Mon univers » au-dessus de Ti Margo, pour l'élève
            connecté seulement ; le visiteur n'a pas encore le sien. */}
        {cas === "eleve" ? (
          <span className={`font-black uppercase tracking-wide text-teal-700 ${petit ? "text-xs" : "text-sm lg:text-base"}`}>
            ✨ Mon univers
          </span>
        ) : null}
        <Image
          src={IMAGE_HUMEUR[conseil?.humeur ?? "salut"]}
          alt="Ti Margo"
          width={320}
          height={320}
          sizes="128px"
          className={petit ? "h-16 w-16" : "h-28 w-28 lg:h-32 lg:w-32"}
          priority
        />
        <p className={`font-black leading-tight text-sky-900 ${petit ? "text-base" : "text-xl lg:text-2xl"}`}>{bulleCentre}</p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl">
      {cas === "eleve" || cas === "prof" ? (
        <p className="mb-3 text-center text-2xl font-black text-slate-900 sm:text-3xl">
          {prenom ? `Bonjour ${prenom} !` : "Bonjour !"} 👋
        </p>
      ) : null}

      {/* Élève : le message du prof, en premier. */}
      {message ? (
        <div className="mb-3 rounded-2xl bg-amber-100 p-3 ring-2 ring-amber-300 sm:p-4">
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
        </div>
      ) : null}

      {/* Élève : le mot personnel de Ti Margo. */}
      {conseil ? (
        <div className="mb-3 flex flex-col gap-2 rounded-2xl bg-emerald-50 p-3 ring-2 ring-emerald-300 sm:flex-row sm:items-center sm:gap-3 sm:p-4">
          <p className="flex-1 text-base font-bold leading-snug text-slate-900 sm:text-lg">
            <span className="font-black text-emerald-800">💬 Ti Margo : </span>
            {conseil.texte}
          </p>
          <Link
            href={conseil.href}
            className={`shrink-0 rounded-2xl px-4 py-2.5 text-center text-base font-black shadow-lg sm:px-5 sm:py-3 sm:text-lg ${
              message ? "bg-white text-emerald-800 ring-2 ring-emerald-500 hover:bg-emerald-100" : "bg-emerald-600 text-white hover:bg-emerald-500"
            }`}
          >
            ▶ {conseil.bouton}
          </Link>
        </div>
      ) : null}

      {/* LE CŒUR : le coach, en bandeau vert au-dessus du nuage.
          Visiteur : la classe d'un clic → le coach maths de CETTE classe
          (25/11 soir, Frédéric : pas le tuteur directement). */}
      {cas === "visiteur" ? (
        <div className="mb-4 rounded-3xl bg-emerald-600 p-4 text-white shadow-lg ring-4 ring-emerald-200 sm:p-5">
          <p className="text-center text-2xl font-black leading-tight sm:text-3xl">
            <span aria-hidden>🎯 </span>Le coach : choisis ta classe
          </p>
          <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
            {CLASSES_COACH.map((c) => (
              <li key={c.slug}>
                <Link
                  href={lienCoachClasse(c.slug)}
                  className="block rounded-2xl bg-white py-2.5 text-center text-lg font-black text-emerald-800 shadow transition hover:scale-105 hover:bg-emerald-50"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* « Choisis ta classe » (plus bas, section #classes) reste : Frédéric, 25/11. */}
          <p className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm font-bold">
            <Link href="/coach-ia/maths" className="text-white underline underline-offset-2 hover:text-emerald-100">
              Toutes les notions ›
            </Link>
            <a href="#classes" className="text-white underline underline-offset-2 hover:text-emerald-100">
              Tout ce qu&apos;il y a dans ma classe ↓
            </a>
          </p>
        </div>
      ) : cas === "eleve" ? (
        <div className="mb-4 flex flex-col gap-2 rounded-3xl bg-emerald-600 p-3 shadow-lg ring-4 ring-emerald-200 sm:flex-row sm:items-stretch sm:p-4">
          <Link
            href={lienCoachEleve}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-xl font-black text-emerald-800 shadow transition hover:scale-[1.02] hover:bg-emerald-50 sm:text-2xl"
          >
            <span aria-hidden>🎯</span> Le coach
            {classe ? <span className="text-base font-bold text-emerald-700">· {classe}</span> : null}
          </Link>
          {faible ? (
            <Link
              href={faible.href}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-base font-black text-white ring-2 ring-white/70 hover:bg-emerald-800"
            >
              <span aria-hidden>🔁</span>
              <span className="min-w-0 truncate">À revoir : {faible.titre}</span>
            </Link>
          ) : null}
          <Link
            href="/dashboard-eleve"
            className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-base font-black text-white ring-2 ring-white/70 hover:bg-emerald-800"
          >
            <span aria-hidden>✈️</span> Où j&apos;en suis
          </Link>
        </div>
      ) : null}

      {/* Téléphone : le nuage, puis les bulles en grosse liste. */}
      <div className="sm:hidden">
        <div className="rounded-3xl bg-sky-100/80 py-2">{nuage(true)}</div>
        <ul className="mt-3 grid min-h-[13rem] grid-cols-2 gap-2">
          {places.map((c) => (
            <li key={c.titre}>{bouton(c, "h-full")}</li>
          ))}
        </ul>
      </div>

      {/* PC et tablette : le nuage au centre, les flèches, les bulles autour. */}
      <div className="relative hidden w-full rounded-3xl bg-sky-100/80 sm:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <div className="absolute" style={{ left: "28%", top: "18%", width: "44%", height: "64%" }}>
          {nuage(false)}
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <marker id="accueil-fleche" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
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
                markerEnd="url(#accueil-fleche)"
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

      {/* Visiteur : ce qu'un compte ajoute, juste dessous. */}
      {/* 25/11 : la ligne « 10 questions offertes, sans compte » est retirée (Frédéric : « enlève »). */}
      {cas === "visiteur" ? (
        <div className="mt-5 rounded-3xl bg-white p-4 shadow-md ring-1 ring-teal-200 sm:p-5">
          <p className="text-center text-lg font-black text-teal-800 sm:text-xl">🔓 Avec ton compte, en plus :</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {AVEC_UN_COMPTE.map((c) => (
              <li key={c.titre} className="flex flex-col items-center rounded-2xl bg-teal-50 px-2 py-3 text-center">
                <span className="text-3xl" aria-hidden>
                  {c.emoji}
                </span>
                <span className="mt-1 text-sm font-black leading-tight text-slate-900 sm:text-base">{c.titre}</span>
                <span className="mt-0.5 text-xs font-bold leading-tight text-slate-600">{c.detail}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
            {/* 25/11 : le visiteur n'a pas encore de compte → « Créer mon compte » en plein. */}
            <Link
              href="/auth/signin?inscription=1"
              className="w-full rounded-full bg-teal-700 px-7 py-3 text-center text-lg font-black text-white shadow-lg hover:bg-teal-800 sm:w-auto"
            >
              Créer mon compte
            </Link>
            <Link
              href="/auth/signin"
              className="w-full rounded-full bg-white px-7 py-3 text-center text-lg font-black text-teal-800 shadow ring-2 ring-teal-600 hover:bg-teal-50 sm:w-auto"
            >
              Se connecter
            </Link>
          </div>
          <p className="mt-2 text-center text-sm font-bold text-slate-600">Ton prof t&apos;a donné un code ? Clique sur « Se connecter ».</p>
        </div>
      ) : null}

      {/* 25/11 : « Parent ou prof ? » seulement pour le visiteur et le parent ;
          un élève ou un prof connecté ne le voit plus (venu d'AccueilNuage). */}
      {cas === "visiteur" || cas === "autre" ? (
        <p className="mt-3 text-center">
          <Link
            href="#parents-profs"
            className="inline-block whitespace-nowrap rounded-full bg-white/90 px-5 py-2 text-base font-black text-violet-800 shadow ring-1 ring-violet-200 hover:ring-violet-400"
          >
            {/* Plus court, pour tenir sur une ligne en 375 px (la flèche tombait sur le dessin). */}
            Parent ou prof ? Par ici ↓
          </Link>
        </p>
      ) : null}
    </div>
  );
}
