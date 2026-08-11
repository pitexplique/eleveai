"use client";

// LA CLASSE VUE PAR SON PRINCIPAL.
//
// Demande de M. Pelka, 11/08/2026 : « pour une classe et pour un niveau, les
// compétences réussies et celles qui posent des difficultés ». Sa restitution
// officielle a servi de maquette — une ligne par élève, la répartition en
// groupes de maîtrise, et la couleur qui saute aux yeux avant le chiffre.
//
// ⛔ CE QU'ON NE MET PAS : de classement, et aucune moyenne présentée comme
// une note. L'évaluation nationale ne note pas — elle range en trois groupes,
// et c'est dans ces mots-là que l'équipe recevra son bilan officiel. Afficher
// un « 24/62 » en gros à côté d'un prénom, c'est refabriquer la note que
// l'institution a justement retirée.
//
// ⚠️ ET ON N'ÉCRIT JAMAIS « écart au national » : nous n'avons pas les données
// nationales. Voir [[eval-6e-maths-spec-officielle]].

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { useEleve } from "@/context/EleveContext";
import { GROUPES, type GroupeMaitrise } from "@/lib/eval-nationale/moteur";

import { FOND, accentDe } from "../_composants/couleurs";

type BlocBilan = {
  id: string;
  label: string;
  justes: number;
  total: number;
  groupe: string;
};

type MicroBilan = {
  microId: string;
  microLabel: string;
  notionId: string;
  notionLabel: string;
  reussi: boolean;
};

type EleveDeLaClasse = {
  codeUtilisateur: string;
  groupe: string;
  nom: string | null;
  resultat: {
    score: number;
    total: number;
    groupe: string | null;
    dureeSec: number | null;
    chronoEcoule: boolean;
    simule: boolean;
    domaines: BlocBilan[];
    tests: BlocBilan[];
    micros: MicroBilan[];
    passeLe: string;
  } | null;
};

/**
 * UNE LIGNE PAR SAVOIR-FAIRE — la colonne de gauche de la restitution
 * officielle, celle que M. Pelka a envoyée en exemple.
 *
 * C'est la moitié de sa demande que les domaines ne servent pas : savoir que
 * « Nombres et calculs » coince ne dit pas quoi reprendre lundi. Savoir que
 * « Comparer et ordonner des nombres décimaux » est à 26 %, si.
 *
 * ⚠️ TOUS LES ÉLÈVES N'ONT PAS EU LES MÊMES QUESTIONS — le tirage est
 * individuel, contrairement au jour J où toute la France a le même sujet. Le
 * «sur combien» varie donc d'une ligne à l'autre, et il est AFFICHÉ : un
 * 100 % sur deux élèves ne se lit pas comme un 100 % sur vingt.
 */
type SavoirFaire = {
  microId: string;
  notionId: string;
  label: string;
  notionLabel: string;
  reussites: number;
  sur: number;
  pct: number;
};

function savoirsFaire(eleves: EleveDeLaClasse[]): SavoirFaire[] {
  const acc = new Map<string, SavoirFaire>();
  for (const e of eleves) {
    for (const m of e.resultat?.micros ?? []) {
      const v = acc.get(m.microId) ?? {
        microId: m.microId,
        notionId: m.notionId,
        label: m.microLabel,
        notionLabel: m.notionLabel,
        reussites: 0,
        sur: 0,
        pct: 0,
      };
      v.sur += 1;
      if (m.reussi) v.reussites += 1;
      acc.set(m.microId, v);
    }
  }
  return [...acc.values()]
    .map((v) => ({ ...v, pct: Math.round((v.reussites / v.sur) * 100) }))
    // ⭐ LE PLUS BAS EN PREMIER. La restitution officielle garde l'ordre des
    // questions ; nous n'en avons pas de commun puisque le tirage est
    // individuel. Trier par réussite croissante répond directement à la
    // question posée — « celles qui posent des difficultés » d'abord.
    .sort((a, b) => a.pct - b.pct || b.sur - a.sur);
}

/**
 * LES TROIS COULEURS DES GROUPES DE MAÎTRISE, en dur pour le SVG.
 *
 * Ce sont celles de la restitution officielle — orange, ocre, vert — pour que
 * M. Pelka retrouve son code couleur. ⚠️ VALIDÉES, PAS CHOISIES À L'ŒIL : le
 * premier jeu (rouge/ambre/cyan, celui des barres empilées) était refusé —
 * le cyan tombait sous le plancher de chroma et passait pour du gris.
 * Celui-ci passe le seuil de séparation daltonienne (ΔE 12,5) et le plancher
 * de vision normale (16,5). Le seul avertissement porte sur le contraste de
 * l'ocre sur fond clair : il est levé parce que chaque part porte son nombre
 * écrit à côté — la couleur ne porte jamais l'information seule.
 */
const COULEUR_GROUPE: Record<GroupeMaitrise, string> = {
  a_besoins: "#c2410c",
  fragile: "#ca8a04",
  satisfaisant: "#166534",
};

/**
 * L'ANNEAU DES TROIS GROUPES — la forme que porte sa restitution officielle.
 *
 * Dessiné en SVG, sans aucune librairie : trois arcs, un trait de fond de la
 * couleur de la page entre eux pour qu'ils ne se touchent pas. Un camembert
 * n'est légitime que pour une part-de-tout lue d'un coup d'œil, à peu de
 * parts — trois, ici. Les nombres sont écrits à côté, jamais dans les parts.
 */
function Anneau({
  parts,
  total,
}: {
  parts: { groupe: GroupeMaitrise; n: number }[];
  total: number;
}) {
  const R = 54;
  const C = 2 * Math.PI * R;
  let depart = 0;
  return (
    <svg viewBox="0 0 140 140" className="h-32 w-32 shrink-0" role="img"
      aria-label={parts
        .map((p) => `${GROUPES[p.groupe].label} ${p.n} sur ${total}`)
        .join(", ")}
    >
      <g transform="translate(70,70) rotate(-90)">
        <circle r={R} fill="none" stroke="#1d1c16" strokeOpacity={0.08} strokeWidth={20} />
        {parts.map((p) => {
          const part = total > 0 ? p.n / total : 0;
          const longueur = part * C;
          const el = (
            <circle
              key={p.groupe}
              r={R}
              fill="none"
              stroke={COULEUR_GROUPE[p.groupe]}
              strokeWidth={20}
              strokeDasharray={`${Math.max(longueur - 2, 0)} ${C - Math.max(longueur - 2, 0)}`}
              strokeDashoffset={-depart}
            />
          );
          depart += longueur;
          return el;
        })}
      </g>
      <text
        x="70" y="66" textAnchor="middle"
        className="fill-[#1d1c16] font-serif text-[26px] font-black"
      >
        {total}
      </text>
      <text
        x="70" y="82" textAnchor="middle"
        className="fill-[#1d1c16]/60 text-[10px] font-bold"
      >
        {total > 1 ? "élèves" : "élève"}
      </text>
    </svg>
  );
}

/** Les couleurs de la restitution officielle : rouge, orange, jaune, vert. */
function couleurPct(pct: number) {
  if (pct < 30) return "bg-red-100 text-red-900";
  if (pct < 50) return "bg-orange-100 text-orange-900";
  if (pct < 70) return "bg-amber-100 text-amber-900";
  return "bg-emerald-100 text-emerald-900";
}

/**
 * OÙ ENVOYER RETRAVAILLER UNE COMPÉTENCE.
 *
 * ⚠️ L'épreuve porte sur l'année d'AVANT — un entrant de 6ᵉ est évalué sur le
 * CM2. Le coach doit donc s'ouvrir sur le CM2, pas sur la 6ᵉ, sans quoi on
 * enverrait l'élève réviser une notion qu'il n'a pas encore vue.
 *
 * La table est écrite ici plutôt qu'importée de la `ConfigEpreuve` : importer
 * la config embarquerait toute la banque de questions dans le bundle de cette
 * page, qui n'en pose aucune.
 */
const CLASSE_SOURCE: Record<string, string> = { "6e": "cm2", "4e": "5e" };

function lienRemediation(classe: string, matiere: string, sf: SavoirFaire) {
  if (!sf.notionId) return null;
  return (
    `/tutor-v4?classe=${encodeURIComponent(CLASSE_SOURCE[classe] ?? classe)}` +
    `&matiere=${encodeURIComponent(matiere)}` +
    `&notion=${encodeURIComponent(sf.notionId)}` +
    `&microId=${encodeURIComponent(sf.microId)}&display=simple`
  );
}

const ORDRE: GroupeMaitrise[] = ["a_besoins", "fragile", "satisfaisant"];

function estGroupe(v: string | null | undefined): v is GroupeMaitrise {
  return v === "a_besoins" || v === "fragile" || v === "satisfaisant";
}

/** La pastille de couleur d'un groupe — la même sur toute la page. */
function Pastille({ groupe }: { groupe: string }) {
  if (!estGroupe(groupe)) return null;
  const g = GROUPES[groupe];
  return (
    <span
      className={`text-[10px] font-black uppercase tracking-[0.12em] ${g.couleur}`}
    >
      {g.label}
    </span>
  );
}

export default function MaClasseClient() {
  const { eleve } = useEleve();
  const accent = accentDe("6e-maths");

  const [classe, setClasse] = useState("6e");
  const [matiere, setMatiere] = useState("maths");
  const [eleves, setEleves] = useState<EleveDeLaClasse[] | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [simule, setSimule] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [besoinConnexion, setBesoinConnexion] = useState(false);
  // ── LA PORTE ADMIN ───────────────────────────────────────────────────────
  // Frédéric doit pouvoir ouvrir la page sans le compte de M. Pelka. Le
  // cookie admin part tout seul avec la requête ; c'est donc la RÉPONSE qui
  // nous apprend qu'on est admin, et non l'inverse — le cookie est httpOnly,
  // la page ne peut pas le lire. Sans établissement choisi, la route rend la
  // liste de ceux qui ont des résultats.
  const [admin, setAdmin] = useState(false);
  const [etablissements, setEtablissements] = useState<string[] | null>(null);
  const [etab, setEtab] = useState("");
  // ── LE GROUPE CLASSE ─────────────────────────────────────────────────────
  // Un college n'a pas « une 6e ». A Dimitile, la vraie 6e C et la classe de
  // demonstration sortaient d'un seul bloc de cinquante eleves — un tas dont
  // un principal ne peut rien faire.
  const [groupes, setGroupes] = useState<string[]>([]);
  /** Les groupes du niveau dont personne n'a encore passé l'épreuve. */
  const [groupesEnAttente, setGroupesEnAttente] = useState<string[]>([]);
  const [groupe, setGroupe] = useState("");

  const charger = useCallback(async () => {
    setChargement(true);
    setErreur(null);
    setBesoinConnexion(false);
    try {
      const params = new URLSearchParams({ classe, matiere });
      if (etab) params.set("etab", etab);
      const r = await fetch(
        `/api/evaluation-nationale/classe?${params.toString()}`,
        eleve?.token
          ? { headers: { authorization: `Bearer ${eleve.token}` } }
          : undefined,
      );
      const j = await r.json();
      if (!j.ok) {
        // 401 = ni cookie admin ni session : ce n'est pas une panne, c'est
        // qu'il faut se connecter. Les deux ne se disent pas pareil.
        if (r.status === 401) setBesoinConnexion(true);
        else setErreur(j.error ?? "Lecture impossible.");
        setEleves(null);
      } else if (j.choisirEtablissement) {
        setAdmin(true);
        setEtablissements(j.etablissements as string[]);
        setEleves(null);
      } else {
        setAdmin(Boolean(j.admin));
        setEleves(j.eleves as EleveDeLaClasse[]);
        setSimule(Boolean(j.contientDesSimulations));
        // ⭐ UN GROUPE N'ENTRE DANS CETTE VUE QUE SI L'UN DES SIENS A PASSÉ
        // L'ÉPREUVE (règle posée le 11/08, demande de Frédéric : « enlève la
        // 6°C… mes anciens élèves doivent avoir leurs comptes actifs »).
        //
        // La 6ᵉ C de Dimitile est sa classe de l'an dernier : vingt comptes
        // bien vivants, qui n'ont rien à faire dans une évaluation de rentrée
        // qu'ils ne passeront pas. ⛔ ILS NE SONT PAS SUPPRIMÉS POUR AUTANT —
        // ce serait effacer une année de travail. C'est la VUE qui les ignore.
        //
        // La règle se maintient toute seule : le jour où une classe passe
        // l'épreuve, elle apparaît ; tant qu'elle ne l'a pas passée, elle
        // n'encombre pas. Aucune liste d'exclusion à tenir à jour.
        const eleves = j.eleves as EleveDeLaClasse[];
        const concernes = [
          ...new Set(eleves.filter((e) => e.resultat).map((e) => e.groupe)),
        ].sort();
        setGroupes(concernes);
        setGroupesEnAttente(
          ((j.groupes as string[]) ?? []).filter((g) => !concernes.includes(g)),
        );
        setGroupe((actuel) =>
          actuel && concernes.includes(actuel) ? actuel : concernes[0] ?? "",
        );
      }
    } catch {
      setErreur("Lecture impossible. Réessayez.");
    }
    setChargement(false);
  }, [eleve?.token, classe, matiere, etab]);

  // L'ÉTABLISSEMENT PEUT ARRIVER PAR L'URL — c'est ainsi que le tableau de
  // bord admin fait suivre le collège déjà sélectionné. Lu sur
  // `window.location` plutôt qu'avec `useSearchParams`, qui imposerait une
  // frontière Suspense à toute la page pour un seul paramètre.
  // ⚠️ Sans droits admin, ce paramètre ne donne rien : la route l'ignore et
  // s'en tient à l'établissement de la session.
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("etab");
    if (v) setEtab(v);
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  // ⚠️ TOUT CE QUI SUIT PORTE SUR LE GROUPE CHOISI, pas sur le niveau entier :
  // une repartition qui melangerait deux classes ne decrirait aucune des deux.
  const duGroupe = (eleves ?? []).filter((e) => !groupe || e.groupe === groupe);
  const passes = duGroupe.filter((e) => e.resultat);
  const enAttente = duGroupe.filter((e) => !e.resultat);

  // La répartition en groupes, sur l'ENSEMBLE de l'épreuve.
  const repartition = ORDRE.map((g) => ({
    groupe: g,
    n: passes.filter((e) => e.resultat?.groupe === g).length,
  }));

  // Et par domaine — c'est la vraie demande : « les compétences réussies et
  // celles qui posent des difficultés ». Les domaines sont les mêmes pour
  // tous, on prend donc ceux du premier élève qui a passé l'épreuve.
  const colonnes = [
    ...(passes[0]?.resultat?.domaines ?? []),
    ...(passes[0]?.resultat?.tests ?? []),
  ].map((b) => ({ id: b.id, label: b.label }));

  // ⚠️ ON N'AFFICHE PAS UN SAVOIR-FAIRE VU PAR DEUX ÉLÈVES (seuil posé le
  // 11/08). Le tirage étant individuel, la première synthèse sortait 122
  // lignes pour 15 élèves, dont beaucoup à « 100 % (1/1) » ou « 0 % (0/1) ».
  // Ces lignes-là ne disent rien de la classe — elles disent qu'un enfant a eu
  // de la chance, ou pas. Les laisser en tête du tableau trié par réussite
  // croissante, c'est envoyer un professeur préparer une séance sur un hasard.
  // Le jour J le problème n'existe pas : toute la France a le même sujet.
  const MINIMUM_ELEVES = 3;
  const tousSavoirs = savoirsFaire(passes);
  const savoirs = tousSavoirs.filter((sf) => sf.sur >= MINIMUM_ELEVES);
  const savoirsEcartes = tousSavoirs.length - savoirs.length;

  const parColonne = colonnes.map((c) => {
    const blocsDe = (e: EleveDeLaClasse) =>
      [...(e.resultat?.domaines ?? []), ...(e.resultat?.tests ?? [])].find(
        (b) => b.id === c.id,
      );
    return {
      ...c,
      groupes: ORDRE.map((g) => ({
        groupe: g,
        n: passes.filter((e) => blocsDe(e)?.groupe === g).length,
      })),
    };
  });

  // ── LA CONCLUSION ────────────────────────────────────────────────────────
  // Demande de Frédéric le 11/08 : « c'est bien mais il manque une
  // conclusion ». Il a raison — la page rendait quatre tableaux et laissait
  // le lecteur en tirer lui-même la phrase. Or c'est cette phrase-là qu'un
  // principal cherche, et il la cherchera de toute façon : autant qu'elle
  // soit calculée juste plutôt que devinée de travers.
  //
  // ⛔ ELLE NE COMMENTE PAS, ELLE COMPTE. Aucun adjectif sur le niveau de la
  // classe, aucun « des résultats encourageants » : des nombres, les noms des
  // compétences les plus basses, et ce que ça implique. Un principal qui lit
  // « satisfaisant dans l'ensemble » sous des chiffres moyens cesse de nous
  // croire, et il a raison.
  const aBesoins = repartition.find((r) => r.groupe === "a_besoins")?.n ?? 0;
  const fragiles = repartition.find((r) => r.groupe === "fragile")?.n ?? 0;
  const aRenforcer = aBesoins + fragiles;
  const coupes = passes.filter((e) => e.resultat?.chronoEcoule).length;
  // Le domaine où le plus d'élèves sont « à besoins ».
  const domaineFaible = [...parColonne].sort(
    (a, b) =>
      (b.groupes.find((g) => g.groupe === "a_besoins")?.n ?? 0) -
      (a.groupes.find((g) => g.groupe === "a_besoins")?.n ?? 0),
  )[0];
  const troisPlusBas = savoirs.slice(0, 3);
  // ⭐ LE GROUPE DE BESOINS, NOMMÉ. C'est l'usage que le document officiel
  // assigne à la restitution : « faciliter l'accompagnement personnalisé et la
  // mise en place de groupes de besoins ». Une répartition en pourcentages ne
  // se transforme pas en emploi du temps ; une liste de prénoms, si.
  const groupeDeBesoins = passes
    .filter((e) => e.resultat?.groupe === "a_besoins")
    .map((e) => e.nom ?? e.codeUtilisateur);

  if (besoinConnexion) {
    return (
      <main className="min-h-screen" style={FOND}>
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-serif text-3xl font-black">Votre classe</h1>
          <p className="mt-3 text-sm font-medium leading-6 text-[#1d1c16]/75">
            Cette page lit les résultats de votre établissement : il faut être
            connecté avec vos codes pour l&apos;ouvrir.
          </p>
          <Link
            href="/auth/signin-eleve"
            className="mt-5 inline-flex rounded-xl px-5 py-3 text-sm font-black text-white"
            style={{ backgroundColor: accent }}
          >
            Se connecter
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={FOND}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <Link
          href="/evaluation-nationale-college"
          className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1d1c16]/60 hover:text-[#1d1c16]"
        >
          ← Les évaluations du collège
        </Link>

        <h1 className="mt-3 font-serif text-3xl font-black leading-tight sm:text-4xl">
          Votre classe, avant le jour J
        </h1>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-[#1d1c16]/75">
          Chaque élève est rangé dans les trois groupes de l&apos;institution —
          à besoins, fragile, satisfaisant — domaine par domaine. Ce sont les
          mots du bilan officiel que recevront vos professeurs. Il n&apos;y a
          pas de note, et pas de classement.
        </p>

        {/* ⚠️ L'AVERTISSEMENT EN HAUT, jamais en bas de page : un principal qui
            lit une répartition sans savoir qu'elle contient des élèves
            inventés prend une décision sur du vide. */}
        {simule && (
          <p className="mt-4 rounded-xl border-l-4 border-amber-600 bg-white/80 py-2.5 pl-3 pr-3 text-sm font-medium leading-6">
            <strong className="font-black">
              Cette liste contient des résultats simulés.
            </strong>{" "}
            Ce sont les élèves de la classe de démonstration, créés pour vous
            montrer la page avant la rentrée. Ils seront effacés avant que vos
            vraies classes ne passent l&apos;épreuve.
          </p>
        )}

        {/* LE SÉLECTEUR D'ÉTABLISSEMENT — pour l'administration seulement.
            Un principal ne le voit jamais : la route ignore `?etab=` sur une
            session, et refuserait de toute façon de lire un autre collège. */}
        {admin && (
          <div className="mt-5 rounded-xl border-2 border-[#1d1c16]/15 bg-white/80 p-3">
            <label
              className="flex flex-wrap items-center gap-2 text-sm font-black"
              htmlFor="etab"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                Administration
              </span>
              Établissement
              <select
                id="etab"
                value={etab}
                onChange={(e) => setEtab(e.target.value)}
                className="rounded-lg border-2 border-[#1d1c16]/20 bg-white px-3 py-2 text-sm font-black"
              >
                <option value="">— en choisir un —</option>
                {(etablissements ?? []).map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </label>
            {etablissements?.length === 0 && (
              <p className="mt-2 text-xs font-medium leading-5 text-[#1d1c16]/70">
                Aucun établissement n&apos;a de résultat pour ce couple
                classe/matière — personne n&apos;a encore passé cette épreuve,
                ou le jeu de démonstration n&apos;est pas encore chargé.
              </p>
            )}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {(["6e", "4e"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setClasse(c)}
              className={[
                "rounded-xl border-2 px-4 py-2 text-sm font-black transition",
                classe === c
                  ? "text-white"
                  : "border-[#1d1c16]/20 hover:border-[#1d1c16]/50",
              ].join(" ")}
              style={
                classe === c
                  ? { backgroundColor: accent, borderColor: accent }
                  : undefined
              }
            >
              {c.replace(/e$/, "ᵉ")}
            </button>
          ))}
          <span className="text-[#1d1c16]/30">·</span>
          {(["maths", "francais"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMatiere(m)}
              className={[
                "rounded-xl border-2 px-4 py-2 text-sm font-black transition",
                matiere === m
                  ? "text-white"
                  : "border-[#1d1c16]/20 hover:border-[#1d1c16]/50",
              ].join(" ")}
              style={
                matiere === m
                  ? { backgroundColor: accent, borderColor: accent }
                  : undefined
              }
            >
              {m === "maths" ? "Mathématiques" : "Français"}
            </button>
          ))}
        </div>

        {/* LE GROUPE CLASSE. Il n'apparaît que s'il y en a plusieurs — un
            collège à une seule 6ᵉ n'a rien à choisir, et un bouton unique
            ferait croire qu'il manque quelque chose. */}
        {groupes.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
              Classe
            </span>
            {groupes.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroupe(g)}
                className={[
                  "rounded-lg border-2 px-3 py-1.5 text-xs font-black transition",
                  groupe === g
                    ? "text-white"
                    : "border-[#1d1c16]/20 hover:border-[#1d1c16]/50",
                ].join(" ")}
                style={
                  groupe === g
                    ? { backgroundColor: accent, borderColor: accent }
                    : undefined
                }
              >
                {g}
                {g === "6ETEST" && (
                  <span className="ml-1.5 font-medium opacity-70">démo</span>
                )}
              </button>
            ))}
            {/* Dit sans en faire un onglet : ces classes existent, elles n'ont
                simplement pas passé l'épreuve. Les taire laisserait croire
                qu'elles n'existent pas ; leur donner un bouton vide laisserait
                croire qu'il y a quelque chose à y voir. */}
            {groupesEnAttente.length > 0 && (
              <span className="text-xs font-medium text-[#1d1c16]/55">
                {groupesEnAttente.join(", ")} n&apos;
                {groupesEnAttente.length > 1 ? "ont" : "a"} pas passé
                l&apos;épreuve.
              </span>
            )}
          </div>
        )}

        {erreur && (
          <p className="mt-5 rounded-xl border-l-4 border-red-800 bg-white/80 py-2.5 pl-3 pr-3 text-sm font-medium leading-6 text-red-900">
            {erreur}
          </p>
        )}

        {chargement && (
          <p className="mt-6 text-sm font-medium text-[#1d1c16]/70">
            Lecture en cours…
          </p>
        )}

        {eleves && !chargement && (
          <>
            {/* ── OÙ EN EST LA CLASSE ───────────────────────────────────── */}
            <section className="mt-7 rounded-2xl bg-white/90 p-4 shadow-[0_10px_28px_-16px_rgba(29,28,22,0.55)] sm:p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                Où en est la classe
              </p>
              <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/75">
                {passes.length} élève{passes.length > 1 ? "s" : ""} sur{" "}
                {duGroupe.length} {passes.length > 1 ? "ont" : "a"} passé
                l&apos;épreuve.
                {enAttente.length > 0 && (
                  <>
                    {" "}
                    {enAttente.length} ne l&apos;{enAttente.length > 1 ? "ont" : "a"}{" "}
                    pas encore passée.
                  </>
                )}
              </p>

              {passes.length > 0 && (
                <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                  <Anneau
                    parts={repartition.map((r) => ({ groupe: r.groupe, n: r.n }))}
                    total={passes.length}
                  />
                  <div className="grid w-full flex-1 gap-3 sm:grid-cols-3">
                  {repartition.map(({ groupe, n }) => {
                    const g = GROUPES[groupe];
                    return (
                      <div
                        key={groupe}
                        className="rounded-xl border-2 border-[#1d1c16]/12 p-3"
                      >
                        <p className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.12em]">
                          {/* La pastille relie la carte à sa part de l'anneau —
                              sans elle, il faudrait deviner quelle couleur va
                              avec quel groupe. */}
                          <span
                            aria-hidden
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: COULEUR_GROUPE[groupe] }}
                          />
                          <span className={g.couleur}>{g.label}</span>
                        </p>
                        <p className="mt-1 font-serif text-3xl font-black leading-none">
                          {n}
                        </p>
                        <p className="text-xs font-medium text-[#1d1c16]/70">
                          {Math.round((n / passes.length) * 100)} % de ceux qui
                          ont passé l&apos;épreuve
                        </p>
                      </div>
                    );
                  })}
                  </div>
                </div>
              )}
            </section>

            {/* ── CE QU'IL FAUT EN RETENIR ────────────────────────────────
                Placée APRÈS les chiffres et AVANT les tableaux : on ne conclut
                pas avant d'avoir montré, et on ne laisse pas le lecteur
                traverser quatre tableaux sans lui dire ce qu'il cherche. */}
            {passes.length > 0 && (
              <section
                className="mt-5 rounded-2xl border-l-4 bg-white/90 p-4 shadow-[0_10px_28px_-16px_rgba(29,28,22,0.55)] sm:p-5"
                style={{ borderColor: accent }}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                  Ce qu&apos;il faut en retenir
                </p>
                <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-[#1d1c16]/85">
                  Sur {passes.length} élève{passes.length > 1 ? "s" : ""} ayant
                  passé l&apos;épreuve,{" "}
                  <strong className="font-black">
                    {aRenforcer} {aRenforcer > 1 ? "sont" : "est"} à besoins ou
                    fragile
                  </strong>
                  {aBesoins > 0 && (
                    <>
                      , dont {aBesoins} pour {aBesoins > 1 ? "lesquels" : "lequel"}{" "}
                      un accompagnement ciblé paraît nécessaire
                    </>
                  )}
                  .
                  {domaineFaible &&
                    (domaineFaible.groupes.find((g) => g.groupe === "a_besoins")
                      ?.n ?? 0) > 0 && (
                      <>
                        {" "}
                        C&apos;est en{" "}
                        <strong className="font-black">
                          {domaineFaible.label}
                        </strong>{" "}
                        que le groupe « à besoins » est le plus fourni.
                      </>
                    )}
                  {enAttente.length > 0 && (
                    <>
                      {" "}
                      {enAttente.length} élève{enAttente.length > 1 ? "s" : ""}{" "}
                      n&apos;{enAttente.length > 1 ? "ont" : "a"} pas encore
                      passé l&apos;épreuve : ces chiffres ne décrivent pas
                      encore toute la classe.
                    </>
                  )}
                </p>

                {troisPlusBas.length > 0 && (
                  <>
                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                      Par où reprendre
                    </p>
                    <ul className="mt-1 space-y-1">
                      {troisPlusBas.map((sf) => (
                        <li
                          key={sf.microId}
                          className="flex flex-wrap items-baseline gap-x-2 text-sm font-medium leading-6"
                        >
                          <span
                            className={`inline-block rounded-md px-1.5 py-0.5 text-xs font-black ${couleurPct(sf.pct)}`}
                          >
                            {sf.pct} %
                          </span>
                          <span className="font-black">{sf.label}</span>
                          <span className="text-xs text-[#1d1c16]/55">
                            {sf.reussites}/{sf.sur} élèves
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* ── LES ACTIONS ────────────────────────────────────────
                    Demande de Frédéric : « il faut rajouter actions
                    correctives ». Un constat sans suite se lit une fois et ne
                    change rien. ⚠️ Ce sont les actions D'UN PRINCIPAL — former
                    un groupe, dire à une équipe quoi reprendre — et non celles
                    d'un élève : il ne cliquera pas sur « s'entraîner ». */}
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                  Ce que ça appelle
                </p>
                <ul className="mt-1.5 space-y-2.5">
                  {groupeDeBesoins.length > 0 && (
                    <li className="text-sm font-medium leading-6">
                      <span className="font-black">
                        Constituer le groupe de besoins
                      </span>{" "}
                      — {groupeDeBesoins.length} élève
                      {groupeDeBesoins.length > 1 ? "s" : ""} :{" "}
                      <span className="text-[#1d1c16]/75">
                        {groupeDeBesoins.join(", ")}
                      </span>
                      . C&apos;est l&apos;usage que le bilan officiel assigne à
                      ces groupes : l&apos;accompagnement personnalisé.
                    </li>
                  )}
                  {troisPlusBas.length > 0 && (
                    <li className="text-sm font-medium leading-6">
                      <span className="font-black">
                        Faire reprendre {troisPlusBas.length === 1 ? "cette compétence" : "ces compétences"} par l&apos;équipe
                      </span>{" "}
                      — {troisPlusBas.map((sf) => sf.label.toLowerCase()).join(", ")}.
                      {troisPlusBas.some((sf) =>
                        lienRemediation(classe, matiere, sf),
                      ) && (
                        <>
                          {" "}
                          Chacune ouvre un entraînement prêt à donner :{" "}
                          {troisPlusBas.map((sf, i) => {
                            const href = lienRemediation(classe, matiere, sf);
                            if (!href) return null;
                            return (
                              <span key={sf.microId}>
                                {i > 0 && " · "}
                                <Link
                                  href={href}
                                  className="font-black underline underline-offset-2"
                                  style={{ color: accent }}
                                >
                                  {sf.label}
                                </Link>
                              </span>
                            );
                          })}
                          .
                        </>
                      )}
                    </li>
                  )}
                  {enAttente.length > 0 && (
                    <li className="text-sm font-medium leading-6">
                      <span className="font-black">
                        Faire passer l&apos;épreuve aux {enAttente.length}{" "}
                        élève{enAttente.length > 1 ? "s" : ""} restant
                        {enAttente.length > 1 ? "s" : ""}
                      </span>{" "}
                      — elle dure cinquante minutes, sur ordinateur, et se
                      corrige seule. Tant qu&apos;ils manquent, la répartition
                      ci-dessus peut encore bouger.
                    </li>
                  )}
                  {coupes > 0 && (
                    <li className="text-sm font-medium leading-6">
                      <span className="font-black">Travailler le rythme</span> —{" "}
                      {coupes} élève{coupes > 1 ? "s" : ""}{" "}
                      {coupes > 1 ? "ont été arrêtés" : "a été arrêté"} par le
                      chrono. Savoir faire ne suffit pas le jour J : il reste
                      moins de cinquante secondes par question.
                    </li>
                  )}
                </ul>

                {/* ⚠️ LE CHRONO EST UNE INFORMATION, PAS UN DÉTAIL. Un élève
                    coupé par le temps n'a pas le même problème qu'un élève qui
                    s'est trompé : le premier sait peut-être faire, mais pas
                    assez vite. Le jour J laisse 48 secondes par question. */}
                {simule && (
                  <p className="mt-3 text-xs font-medium italic leading-5 text-[#1d1c16]/60">
                    Rappel : cette classe est une démonstration. Ces phrases
                    sont calculées sur des résultats inventés.
                  </p>
                )}
              </section>
            )}

            {/* ── SAVOIR-FAIRE PAR SAVOIR-FAIRE ─────────────────────────────
                La colonne de gauche de sa restitution officielle. C'est la
                moitié de sa demande que les domaines ne servent pas : « Nombres
                et calculs coince » ne dit pas quoi reprendre lundi. */}
            {savoirs.length > 0 && (
              <section className="mt-5 rounded-2xl bg-white/90 p-4 shadow-[0_10px_28px_-16px_rgba(29,28,22,0.55)] sm:p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                  Compétence par compétence
                </p>
                <p className="mt-1 max-w-3xl text-sm font-medium leading-6 text-[#1d1c16]/75">
                  Ce que la classe réussit et ce qu&apos;elle rate, savoir-faire
                  par savoir-faire, du plus bas au plus haut. C&apos;est cette
                  liste qui se transforme en séance.
                </p>
                {savoirsEcartes > 0 && (
                  <p className="mt-1 max-w-3xl text-xs font-medium leading-5 text-[#1d1c16]/60">
                    {savoirsEcartes} autre{savoirsEcartes > 1 ? "s" : ""}{" "}
                    savoir-faire {savoirsEcartes > 1 ? "ont" : "a"} été
                    rencontré{savoirsEcartes > 1 ? "s" : ""} par moins de{" "}
                    {MINIMUM_ELEVES} élèves : chaque élève tire ses propres
                    questions, et sur si peu de monde un pourcentage ne dirait
                    rien. Ils apparaîtront quand la classe aura passé
                    l&apos;épreuve plus souvent.
                  </p>
                )}
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#1d1c16]/12 text-[10px] font-black uppercase tracking-[0.12em] text-[#1d1c16]/55">
                        <th className="px-3 py-2 w-8">N°</th>
                        <th className="px-3 py-2">Savoir-faire</th>
                        <th className="px-3 py-2 whitespace-nowrap">
                          % réussite
                        </th>
                        <th className="px-3 py-2 whitespace-nowrap">Sur</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savoirs.map((sf, i) => (
                        <tr
                          key={sf.microId}
                          className="border-b border-[#1d1c16]/8 last:border-0"
                        >
                          <td className="px-3 py-2 text-xs font-medium text-[#1d1c16]/45">
                            {i + 1}
                          </td>
                          <td className="px-3 py-2">
                            <span className="font-black">{sf.label}</span>
                            {sf.notionLabel && (
                              <span className="ml-2 text-xs font-medium text-[#1d1c16]/50">
                                {sf.notionLabel}
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-block rounded-md px-2 py-0.5 text-xs font-black ${couleurPct(sf.pct)}`}
                            >
                              {sf.pct} %
                            </span>
                          </td>
                          {/* ⚠️ « SUR COMBIEN » EST AFFICHÉ, et ce n'est pas un
                              détail : le tirage étant individuel, tous les
                              élèves n'ont pas eu la même question. Un 100 %
                              sur deux élèves ne vaut pas un 100 % sur vingt,
                              et sans cette colonne on lirait les deux pareil. */}
                          <td className="px-3 py-2 text-xs font-medium text-[#1d1c16]/60 whitespace-nowrap">
                            {sf.reussites}/{sf.sur} élève
                            {sf.sur > 1 ? "s" : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ── DOMAINE PAR DOMAINE ───────────────────────────────────── */}
            {parColonne.length > 0 && (
              <section className="mt-5 rounded-2xl bg-white/90 p-4 shadow-[0_10px_28px_-16px_rgba(29,28,22,0.55)] sm:p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                  Ce qui tient, ce qui coince
                </p>
                <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/75">
                  Le nombre d&apos;élèves dans chaque groupe, pour chaque
                  domaine et pour les deux tests spécifiques.
                </p>
                <div className="mt-4 space-y-3">
                  {parColonne.map((c) => {
                    const total = c.groupes.reduce((n, g) => n + g.n, 0) || 1;
                    return (
                      <div key={c.id}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-sm font-black">{c.label}</p>
                          <p className="flex gap-3 text-xs font-medium text-[#1d1c16]/70">
                            {c.groupes.map(({ groupe, n }) => (
                              <span key={groupe}>
                                {GROUPES[groupe].label} {n}
                              </span>
                            ))}
                          </p>
                        </div>
                        {/* La barre empilée : rouge, ambre, cyan — de gauche à
                            droite, du plus en difficulté au plus solide. */}
                        <div className="mt-1.5 flex h-3 w-full overflow-hidden rounded-full bg-[#1d1c16]/10">
                          {c.groupes.map(({ groupe, n }) => (
                            <div
                              key={groupe}
                              className={
                                groupe === "a_besoins"
                                  ? "bg-red-800"
                                  : groupe === "fragile"
                                    ? "bg-amber-500"
                                    : "bg-cyan-700"
                              }
                              style={{ width: `${(n / total) * 100}%` }}
                              title={`${GROUPES[groupe].label} : ${n}`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── ÉLÈVE PAR ÉLÈVE ───────────────────────────────────────── */}
            <section className="mt-5 overflow-hidden rounded-2xl bg-white/90 shadow-[0_10px_28px_-16px_rgba(29,28,22,0.55)]">
              <p className="px-4 pt-4 text-[10px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                Élève par élève
              </p>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#1d1c16]/12 text-[10px] font-black uppercase tracking-[0.12em] text-[#1d1c16]/55">
                      <th className="px-4 py-2">Élève</th>
                      <th className="px-4 py-2">Ensemble</th>
                      {colonnes.map((c) => (
                        <th key={c.id} className="px-4 py-2">
                          {c.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {duGroupe.map((e) => {
                      const tous = [
                        ...(e.resultat?.domaines ?? []),
                        ...(e.resultat?.tests ?? []),
                      ];
                      return (
                        <tr
                          key={e.codeUtilisateur}
                          className="border-b border-[#1d1c16]/8 last:border-0"
                        >
                          <td className="px-4 py-2.5">
                            <span className="font-black">
                              {e.nom ?? e.codeUtilisateur}
                            </span>
                            <span className="ml-2 text-xs font-medium text-[#1d1c16]/50">
                              {e.codeUtilisateur}
                            </span>
                          </td>
                          {e.resultat === null ? (
                            <td
                              className="px-4 py-2.5 text-xs font-medium italic text-[#1d1c16]/55"
                              colSpan={colonnes.length + 1}
                            >
                              n&apos;a pas encore passé l&apos;épreuve
                            </td>
                          ) : (
                            <>
                              <td className="px-4 py-2.5">
                                <Pastille groupe={e.resultat.groupe ?? ""} />
                                {e.resultat.chronoEcoule && (
                                  <span
                                    className="ml-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#1d1c16]/50"
                                    title="Le temps s'est écoulé avant la fin"
                                  >
                                    ⏱ coupé
                                  </span>
                                )}
                              </td>
                              {colonnes.map((c) => {
                                const b = tous.find((x) => x.id === c.id);
                                return (
                                  <td key={c.id} className="px-4 py-2.5">
                                    {b ? (
                                      <>
                                        <Pastille groupe={b.groupe} />
                                        <span className="ml-2 text-xs font-medium text-[#1d1c16]/60">
                                          {b.justes}/{b.total}
                                        </span>
                                      </>
                                    ) : (
                                      <span className="text-xs text-[#1d1c16]/35">
                                        —
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {eleves.length === 0 && (
              <p className="mt-6 rounded-xl bg-white/80 p-4 text-sm font-medium leading-6 text-[#1d1c16]/75">
                Aucun élève de {classe.replace(/e$/, "ᵉ")} n&apos;est enregistré
                dans votre établissement. Les comptes se créent depuis votre
                espace, et la liste apparaîtra ici.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
