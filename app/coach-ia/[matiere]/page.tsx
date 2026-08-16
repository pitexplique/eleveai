"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  getNotionOptions,
  getNotionMicroMap,
  getMicroLabelMap,
  getDomaineMap,
  notionLabel,
  type Classe,
  type Matiere,
} from "@/lib/tutor-v4/catalog";
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";
import FloatingCoach from "@/components/FloatingCoach";
import BoiteAOutils from "@/components/BoiteAOutils";
import { useEleve } from "@/context/EleveContext";
import Link from "next/link";
import { BookOpen, CirclePlay, Play } from "lucide-react";
import { ficheHrefPourCoach } from "@/lib/fiches/registre";
import {
  youtubeSearchUrl,
  CLASSE_YOUTUBE_LABEL,
  MATIERE_YOUTUBE_LABEL,
} from "@/lib/videos/youtubeSearch";

const CLASSES: Classe[] = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "premiere-spe", "terminale-spe", "stmg", "adulte"];
const FRANCAIS_READY_CLASSES: Classe[] = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e"];
const ECONOMIE_CLASSES: Classe[] = ["eco-decouverte", "eco-college", "eco-lycee"];
const ESPAGNOL_CLASSES: Classe[] = ["a1", "a2", "b1", "b2"];
const IA_CLASSES: Classe[] = ["a1", "a2", "b1", "b2", "c1"];

function getClassesForMatiere(matiere: Matiere): Classe[] {
  if (matiere === "francais") return FRANCAIS_READY_CLASSES;
  if (matiere === "economie") return ECONOMIE_CLASSES;
  if (matiere === "espagnol") return ESPAGNOL_CLASSES;
  if (matiere === "ia") return IA_CLASSES;
  return CLASSES;
}

/**
 * Les classes rangées par cycle, et au lycée par VOIE.
 *
 * À quinze boutons, une colonne plate ne se lit plus : un élève de STMG
 * cherchait sa classe au milieu des CP. Les groupes portent un intitulé
 * minuscule qui sert de repère, pas de titre.
 *
 * ⚠️ Une classe absente d'un groupe DISPARAÎT du sélecteur. Le dernier groupe
 * ramasse donc tout ce qui n'a pas été rangé : ajouter une classe à `CLASSES`
 * sans la ranger ici la laisse visible, à la fin, plutôt que de l'effacer en
 * silence — c'est le même genre de repli muet que le `default:` du catalogue.
 */
const GROUPES: { titre: string; classes: Classe[] }[] = [
  { titre: "Primaire", classes: ["cp", "ce1", "ce2", "cm1", "cm2"] },
  { titre: "Collège", classes: ["6e", "5e", "4e", "3e"] },
  { titre: "Lycée général", classes: ["seconde", "premiere", "premiere-spe", "terminale-spe"] },
  { titre: "Voie techno.", classes: ["stmg"] },
  { titre: "Adultes", classes: ["adulte"] },
];

function getGroupesForMatiere(matiere: Matiere): { titre: string | null; classes: Classe[] }[] {
  const disponibles = getClassesForMatiere(matiere);
  if (matiere !== "maths") return [{ titre: null, classes: disponibles }];

  const groupes = GROUPES.map((g) => ({
    titre: g.titre,
    classes: g.classes.filter((c) => disponibles.includes(c)),
  })).filter((g) => g.classes.length > 0);

  const rangees = new Set(GROUPES.flatMap((g) => g.classes));
  const orphelines = disponibles.filter((c) => !rangees.has(c));
  if (orphelines.length > 0) groupes.push({ titre: "Autres", classes: orphelines });

  return groupes;
}

function normalizeClasse(value: string | null, classes: Classe[], fallback: Classe): Classe {
  return classes.includes(value as Classe) ? (value as Classe) : fallback;
}

// youtu.be/ID, youtube.com/watch?v=ID, /embed/ID… → l'identifiant seul, pour
// afficher la miniature YouTube (i.ytimg.com) à la place d'une icône générique.
function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function getMatiereTitle(matiere: string, classe: Classe) {
  const classeLabel: Record<Classe, string> = {
    cp: "CP",
    ce1: "CE1",
    ce2: "CE2",
    cm1: "CM1",
    cm2: "CM2",
    "6e": "6e",
    "5e": "5e",
    "4e": "4e",
    "3e": "3e",
    seconde: "Seconde",
    premiere: "Première",
    "premiere-spe": "Première spé",
    "terminale-spe": "Term Spe",
    stmg: "STMG",
    adulte: "Calculs du quotidien",
    a1: "A1",
    a2: "A2",
    b1: "B1",
    b2: "B2",
    c1: "C1",
    "pix-college": "Collège",
    "pix-lycee": "Lycée",
    "eco-decouverte": "Déco.",
    "eco-college":    "Collège",
    "eco-lycee":      "Lycée",
  };
  const matiereLabel: Record<string, string> = {
    maths: "Maths",
    francais: "Français",
    economie: "Économie",
    espagnol: "Espagnol",
    "english-maths": "English",
    ia: "IA",
  };
  return `${matiereLabel[matiere] ?? matiere} ${classeLabel[classe] ?? classe}`;
}

function getClasseNavLabel(classe: Classe) {
  const labels: Partial<Record<Classe, string>> = {
    cp: "CP",
    ce1: "CE1",
    ce2: "CE2",
    cm1: "CM1",
    cm2: "CM2",
    seconde: "2nd",
    premiere: "1re",
    "premiere-spe": "1re spé",
    "terminale-spe": "Term spec",
    stmg: "STMG",
    adulte: "Adulte",
    "eco-decouverte": "D�couverte",
    "eco-college": "Coll�ge",
    "eco-lycee": "Lyc�e",
  };

  return labels[classe] ?? classe;
}

function getClasseButtonSize(classe: Classe) {
  if (["seconde", "premiere", "premiere-spe", "terminale-spe", "stmg", "adulte", "eco-decouverte", "eco-college", "eco-lycee"].includes(classe)) {
    return "h-14 min-w-16 px-2 rounded-full text-sm leading-tight";
  }

  return "h-14 w-14 rounded-full text-lg";
}

function getMatiereColor(matiere: string) {
  switch (matiere) {
    case "maths":    return "text-orange-500";
    case "francais": return "text-sky-600";
    case "economie": return "text-amber-600";
    case "espagnol": return "text-red-600";
    case "english-maths": return "text-sky-600";
    case "ia": return "text-cyan-700";
    default:         return "text-slate-700";
  }
}

function getClasseBadgeColor(item: Classe, active: boolean) {
  if (!active) {
    return "border-slate-200 bg-white text-orange-500 hover:bg-orange-50";
  }
  if (["cp", "ce1", "ce2", "cm1", "cm2", "6e"].includes(item))
    return "border-lime-500 bg-lime-500 text-white";
  if (["5e", "4e", "3e", "seconde", "premiere", "premiere-spe", "terminale-spe"].includes(item))
    return "border-sky-500 bg-sky-500 text-white";
  if (item === "adulte") return "border-violet-500 bg-violet-500 text-white";
  if (item === "eco-decouverte") return "border-lime-500 bg-lime-500 text-white";
  if (item === "eco-college")    return "border-amber-500 bg-amber-500 text-white";
  if (item === "eco-lycee")      return "border-orange-500 bg-orange-500 text-white";
  if (item === "a1") return "border-green-500 bg-green-500 text-white";
  if (item === "a2") return "border-sky-500 bg-sky-500 text-white";
  if (item === "b1") return "border-indigo-500 bg-indigo-500 text-white";
  if (item === "b2") return "border-violet-500 bg-violet-500 text-white";
  if (item === "c1") return "border-cyan-600 bg-cyan-600 text-white";
  return "border-violet-500 bg-violet-500 text-white";
}

function getMicroButtonStyle(microId: string) {
  if (microId.includes("defis")) return "text-orange-700 hover:bg-orange-50";
  return "text-green-800 hover:bg-green-50";
}

function getDomaineAccent(domaineId: string) {
  // Espagnol A1
  if (domaineId === "ESP_A1_DIGITS")    return { title: "text-red-700",    pill: "bg-red-100 text-red-800"    };
  if (domaineId === "ESP_A1_NUMBERS")   return { title: "text-orange-700", pill: "bg-orange-100 text-orange-800" };
  if (domaineId === "ESP_A1_OPERATIONS")return { title: "text-amber-700",  pill: "bg-amber-100 text-amber-800"  };
  if (domaineId === "ESP_A1_SHAPES")    return { title: "text-sky-700",    pill: "bg-sky-100 text-sky-800"    };
  if (domaineId === "ESP_A1_COLORS")    return { title: "text-violet-700", pill: "bg-violet-100 text-violet-800"};
  if (domaineId === "ESP_A1_FAMILY")    return { title: "text-pink-700",   pill: "bg-pink-100 text-pink-800"  };
  if (domaineId === "ESP_A1_SCHOOL")    return { title: "text-emerald-700",pill: "bg-emerald-100 text-emerald-800"};
  if (domaineId === "ESP_A1_BODY")      return { title: "text-teal-700",   pill: "bg-teal-100 text-teal-800"  };
  if (domaineId === "ESP_A1_FOOD")      return { title: "text-lime-700",   pill: "bg-lime-100 text-lime-800"  };
  if (domaineId === "ESP_A1_ANIMALS")   return { title: "text-green-700",  pill: "bg-green-100 text-green-800"};
  if (domaineId === "ESP_A1_CLOTHES")   return { title: "text-indigo-700", pill: "bg-indigo-100 text-indigo-800"};
  if (domaineId === "ESP_A1_HOUSE")     return { title: "text-cyan-700",   pill: "bg-cyan-100 text-cyan-800"  };
  if (domaineId === "ESP_A1_DAYS")      return { title: "text-blue-700",   pill: "bg-blue-100 text-blue-800"  };
  if (domaineId === "ESP_A1_GREETINGS") return { title: "text-rose-700",   pill: "bg-rose-100 text-rose-800"  };
  // Espagnol A2/B1/B2
  if (domaineId.startsWith("ESP_A2_") || domaineId.startsWith("ESP_B1_") || domaineId.startsWith("ESP_B2_"))
    return { title: "text-red-700", pill: "bg-red-100 text-red-800" };
  // IA
  if (domaineId.startsWith("IA_")) return { title: "text-cyan-800", pill: "bg-cyan-100 text-cyan-800" };
  // ?conomie
  if (domaineId === "ECO_4E_ENTREPRISE") return { title: "text-amber-700",   pill: "bg-amber-100 text-amber-800"   };
  if (domaineId === "ECO_4E_MARCHE")     return { title: "text-emerald-700", pill: "bg-emerald-100 text-emerald-800"};
  if (domaineId === "ECO_4E_TRAVAIL")    return { title: "text-sky-700",     pill: "bg-sky-100 text-sky-800"       };
  if (domaineId === "ECO_4E_MONNAIE")    return { title: "text-blue-700",    pill: "bg-blue-100 text-blue-800"     };
  if (domaineId === "ECO_4E_BUDGET")     return { title: "text-violet-700",  pill: "bg-violet-100 text-violet-800" };
  if (domaineId === "ECO_4E_FISCALITE")  return { title: "text-rose-700",    pill: "bg-rose-100 text-rose-800"     };
  if (domaineId === "ECO_4E_ELECTIONS")  return { title: "text-orange-700",  pill: "bg-orange-100 text-orange-800" };
  // Maths
  if (domaineId.includes("N") || domaineId.includes("P"))
    return { title: "text-green-700", pill: "bg-green-100 text-green-800" };
  if (domaineId.includes("G"))
    return { title: "text-sky-700", pill: "bg-sky-100 text-sky-800" };
  if (domaineId.includes("M"))
    return { title: "text-orange-600", pill: "bg-orange-100 text-orange-700" };
  if (domaineId.includes("D"))
    return { title: "text-violet-700", pill: "bg-violet-100 text-violet-800" };
  return { title: "text-slate-700", pill: "bg-slate-100 text-slate-800" };
}

export default function CoachIA() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const matiere = ((params?.matiere as string) ?? "maths") as Matiere;

  const defaultClasse: Classe =
    matiere === "francais" ? "cp" :
    matiere === "economie" ? "eco-college" :
    matiere === "espagnol" ? "a1" :
    matiere === "english-maths" ? "a1" :
    matiere === "ia" ? "a1" :
    "6e";
  const classes = useMemo(() => getClassesForMatiere(matiere), [matiere]);
  const groupes = useMemo(() => getGroupesForMatiere(matiere), [matiere]);

  // LA CLASSE DE L'ÉLÈVE CONNECTÉ SERT DE DÉFAUT (12/08/2026).
  //
  // Le coach ne lisait que `?classe=`. Or les liens du tableau de bord et du
  // header pointent vers `/coach-ia/maths` tout court : un élève de 5e
  // atterrissait donc sur le repli — la 6e en maths, le CP en français — et
  // devait re-choisir sa classe à chaque visite. Corriger les liens un par un
  // n'aurait rien réglé : le prochain lien oublié rouvrait le trou.
  //
  // ORDRE DE PRIORITÉ. L'URL gagne toujours : un prof qui ouvre `?classe=3e`
  // veut voir la 3e, même connecté. Vient ensuite la classe de l'élève
  // connecté, puis le repli de la matière. `normalizeClasse` écarte au passage
  // ce qui n'existe pas pour cette matière — un élève de 5e sur le coach
  // d'anglais retombe sur `a1`, les niveaux y étant CECRL.
  const { eleve } = useEleve();
  const classeEleve = eleve?.classe ?? null;

  const [classe, setClasse] = useState<Classe>(() =>
    normalizeClasse(
      searchParams.get("classe") ?? classeEleve,
      classes,
      defaultClasse
    )
  );

  useEffect(() => {
    setClasse(
      normalizeClasse(
        searchParams.get("classe") ?? classeEleve,
        classes,
        defaultClasse
      )
    );
  }, [searchParams, classes, defaultClasse, classeEleve]);

  const notionOptions = getNotionOptions(classe, matiere);
  const notionMicroMap = getNotionMicroMap(classe, matiere);
  const microLabels = getMicroLabelMap(classe, matiere);

  // Vidéos attachées aux notions (table notion_ressources, gérée depuis
  // /admin/ressources). Clé = notionId du coach → aucune correspondance.
  const [videosParNotion, setVideosParNotion] = useState<
    Record<string, { url: string; titre: string | null }[]>
  >({});
  // Vidéos attachées à une MICRO-COMPÉTENCE précise (clé = microId) : un petit
  // lien YouTube « pile sur la compétence », en plus de la vidéo de notion.
  const [videosParMicro, setVideosParMicro] = useState<
    Record<string, { url: string; titre: string | null }[]>
  >({});
  useEffect(() => {
    let annule = false;
    fetch(`/api/notion-videos?matiere=${matiere}&classe=${classe}`)
      .then((r) => r.json())
      .then((d) => {
        if (!annule && d?.ok) {
          setVideosParNotion(d.videos ?? {});
          setVideosParMicro(d.videosMicro ?? {});
        }
      })
      .catch(() => {
        /* pas de vidéos : aucun badge */
      });
    return () => {
      annule = true;
    };
  }, [matiere, classe]);

  const domaines = useMemo(() => getDomaineMap(classe, matiere), [classe, matiere]);

  const [search, setSearch] = useState("");

  const totalNotions = notionOptions.length;
  const totalMicros = notionOptions.reduce((sum, notionId) => {
    return sum + (notionMicroMap[notionId]?.length ?? 0);
  }, 0);

  const searchLower = search.trim().toLowerCase();

  function handleClick(notionId: string, microId: string) {
    router.push(
      `/tutor-v4?classe=${encodeURIComponent(classe)}&matiere=${encodeURIComponent(matiere)}&notion=${encodeURIComponent(notionId)}&microId=${encodeURIComponent(microId)}&${displayParamForClasse(classe)}`
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f8ef] text-slate-800">
      <div className="flex min-h-screen">
        {/* Sidebar classes */}
        <aside className="sticky top-0 hidden h-screen w-28 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col md:items-center md:gap-3 md:py-6">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-white">
            IA
          </div>
          {groupes.map((groupe) => (
            <div key={groupe.titre ?? "tous"} className="flex flex-col items-center gap-2">
              {groupe.titre && (
                <span className="mt-1 text-[10px] font-black uppercase tracking-wide text-slate-400">
                  {groupe.titre}
                </span>
              )}
              {groupe.classes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setClasse(item)}
                  className={[
                    "flex items-center justify-center border text-center font-bold transition",
                    getClasseButtonSize(item),
                    getClasseBadgeColor(item, classe === item),
                  ].join(" ")}
                >
                  {getClasseNavLabel(item)}
                </button>
              ))}
            </div>
          ))}
        </aside>

        <section className="w-full px-4 py-5 sm:px-6 lg:px-8">
          <header className="mb-6 border-b border-slate-200 pb-5">
            {/* Classes mobiles */}
            <div className="mb-4 space-y-2 md:hidden">
              {groupes.map((groupe) => (
                <div key={groupe.titre ?? "tous"} className="flex flex-wrap items-center gap-2">
                  {groupe.titre && (
                    <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                      {groupe.titre}
                    </span>
                  )}
                  {groupe.classes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setClasse(item)}
                      className={[
                        "rounded-full border px-4 py-2 text-sm font-bold transition",
                        getClasseBadgeColor(item, classe === item),
                      ].join(" ")}
                    >
                      {getClasseNavLabel(item)}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Mot d'accueil chaleureux (arrivée depuis un cahier / une carte). */}
            <div className="mb-5 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
              <p className="flex items-center gap-2 text-base font-black text-slate-900">
                🦎 Bienvenue — ici, tu es chez toi&nbsp;!
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                Chaque ligne ci-dessous lance une <strong>série d&apos;exercices
                corrigés</strong>. Choisis une notion, clique, et entraîne-toi à ton
                rythme, <strong>sans jugement</strong>. C&apos;est gratuit — et chaque
                erreur t&apos;aide à progresser. 🌱
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Coach IA · série d&apos;exercices
                </p>
                <h1 className={["mt-1 text-4xl font-bold tracking-tight sm:text-5xl", getMatiereColor(matiere)].join(" ")}>
                  {getMatiereTitle(matiere, classe)}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                  Des exercices corrigés pour t&apos;entraîner : choisis une
                  compétence, puis clique sur une ligne pour démarrer ta série.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-orange-300 bg-white px-4 py-2 text-sm font-semibold text-orange-600">
                  {totalNotions} notions
                </span>
                <span className="rounded-full border border-green-300 bg-white px-4 py-2 text-sm font-semibold text-green-700">
                  {totalMicros} séries d&apos;exercices
                </span>
                {matiere === "francais" ? (
                  <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
                    CP a 3e ouverts
                  </span>
                ) : null}
              </div>
            </div>

            {/* Barre de recherche */}
            <div className="mt-4 relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">🔍</span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une notion ou micro-compétence…"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 sm:max-w-md"
              />
            </div>
          </header>

          <div className="columns-1 gap-8 lg:columns-2 2xl:columns-3">
            {domaines.map((domaine) => {
              const notionsAvecMicros = domaine.notions
                .map((notionId) => ({ notionId, micros: notionMicroMap[notionId] ?? [] }))
                .filter((item) => {
                  if (!searchLower) return item.micros.length > 0;
                  const notionMatch = notionLabel(item.notionId, classe, matiere).toLowerCase().includes(searchLower);
                  const filteredMicros = item.micros.filter((microId) =>
                    (microLabels[microId] || microId).toLowerCase().includes(searchLower)
                  );
                  return notionMatch ? item.micros.length > 0 : filteredMicros.length > 0;
                })
                .map((item) => {
                  if (!searchLower) return item;
                  const notionMatch = notionLabel(item.notionId, classe, matiere).toLowerCase().includes(searchLower);
                  return {
                    ...item,
                    micros: notionMatch
                      ? item.micros
                      : item.micros.filter((microId) =>
                          (microLabels[microId] || microId).toLowerCase().includes(searchLower)
                        ),
                  };
                });

              if (notionsAvecMicros.length === 0) return null;

              const accent = getDomaineAccent(domaine.id);

              return (
                <section
                  key={domaine.id}
                  className="mb-8 break-inside-avoid rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className={["text-xl font-bold", accent.title].join(" ")}>
                      {domaine.label}
                    </h2>
                    <span className={["rounded-full px-3 py-1 text-xs font-bold", accent.pill].join(" ")}>
                      {notionsAvecMicros.length}
                    </span>
                  </div>

                  <div className="space-y-5">
                    {notionsAvecMicros.map(({ notionId, micros }) => {
                      const ficheHref = ficheHrefPourCoach(matiere, classe, notionId);
                      const videos = videosParNotion[notionId] ?? [];
                      return (
                      <article key={notionId}>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-slate-800">
                            {notionLabel(notionId, classe, matiere)}
                          </h3>
                          {ficheHref ? (
                            <Link
                              href={ficheHref}
                              className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
                              title="Lire la fiche de cours de cette notion"
                            >
                              <BookOpen className="h-3.5 w-3.5" />
                              Fiche
                            </Link>
                          ) : null}
                          {videos.length ? (() => {
                            // Miniature YouTube réelle (mini 16:9) à la place de
                            // l'icône générique : plus vivant, cohérent avec
                            // l'accueil, mais volontairement PETIT pour garder la
                            // densité de la liste de notions.
                            const vid = youtubeId(videos[0].url);
                            return (
                            <a
                              href={videos[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/vid inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 p-0.5 pr-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                              title={videos[0].titre ?? "Voir la vidéo de cette notion"}
                            >
                              {vid ? (
                                <span className="relative block aspect-video w-12 shrink-0 overflow-hidden rounded bg-black/10">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={`https://i.ytimg.com/vi/${vid}/mqdefault.jpg`}
                                    alt=""
                                    loading="lazy"
                                    className="h-full w-full object-cover transition group-hover/vid:scale-105"
                                  />
                                  <span className="absolute inset-0 flex items-center justify-center">
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-600/90 shadow">
                                      <Play className="h-2.5 w-2.5 fill-white text-white" />
                                    </span>
                                  </span>
                                </span>
                              ) : (
                                <Play className="ml-1 h-3.5 w-3.5" />
                              )}
                              Vidéo
                            </a>
                            );
                          })() : null}
                        </div>
                        <ol className="space-y-1">
                          {micros.map((microId, index) => {
                            const microVideos = videosParMicro[microId] ?? [];
                            // « defi » au singulier selon les classes ; le
                            // libellé sert de filet. Pas de loupe YouTube sur
                            // les défis : une vidéo « défis sur… » n'existe pas.
                            const estDefi =
                              microId.includes("defi") ||
                              (microLabels[microId] || "").toLowerCase().includes("défi");
                            return (
                            <li key={microId} className="flex items-stretch gap-1">
                              <button
                                type="button"
                                onClick={() => handleClick(notionId, microId)}
                                className={[
                                  "group flex flex-1 items-start gap-2 rounded-lg px-2 py-1.5 text-left text-sm leading-5 transition",
                                  getMicroButtonStyle(microId),
                                ].join(" ")}
                              >
                                <span className="w-6 shrink-0 font-semibold text-slate-500">
                                  {index + 1}
                                </span>
                                <span className="underline-offset-2 group-hover:underline">
                                  {microLabels[microId] || microId}
                                </span>
                                {microId.includes("defis") && (
                                  <span className="ml-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-600">
                                    défi
                                  </span>
                                )}
                              </button>
                              {microVideos.length ? (
                                // Lien YouTube « pile sur la compétence » : petit,
                                // pour ne pas alourdir la liste. La vidéo EleveAI
                                // de la notion reste dans l'en-tête, au-dessus.
                                <a
                                  href={microVideos[0].url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex shrink-0 items-center gap-1 self-center rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                                  title={microVideos[0].titre ?? "Vidéo sur cette compétence"}
                                >
                                  <Play className="h-3 w-3 fill-current" />
                                  Vidéo
                                </a>
                              ) : !estDefi ? (
                                // Pas encore de vidéo curatée : petite icône
                                // vidéo discrète (façon IXL) → recherche YouTube
                                // « matière classe notion micro » (libellés
                                // naturels, jamais les slugs). Disparaît dès
                                // qu'une vidéo est choisie dans /admin/ressources.
                                <a
                                  href={youtubeSearchUrl([
                                    MATIERE_YOUTUBE_LABEL[matiere] ?? matiere,
                                    CLASSE_YOUTUBE_LABEL[classe] ?? classe,
                                    notionLabel(notionId, classe, matiere),
                                    microLabels[microId] || "",
                                  ])}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex shrink-0 items-center self-center rounded-lg px-1.5 py-1 text-slate-300 transition hover:bg-slate-100 hover:text-slate-500"
                                  title="Chercher une vidéo sur YouTube"
                                  aria-label={`Chercher une vidéo YouTube : ${microLabels[microId] || microId}`}
                                >
                                  <CirclePlay className="h-4 w-4" />
                                </a>
                              ) : null}
                            </li>
                            );
                          })}
                        </ol>
                      </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </div>

      <FloatingCoach />
      {matiere === "maths" && <BoiteAOutils />}
    </main>
  );
}
