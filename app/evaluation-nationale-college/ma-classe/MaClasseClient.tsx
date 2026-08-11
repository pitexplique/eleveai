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

type EleveDeLaClasse = {
  codeUtilisateur: string;
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
    passeLe: string;
  } | null;
};

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

  const passes = (eleves ?? []).filter((e) => e.resultat);
  const enAttente = (eleves ?? []).filter((e) => !e.resultat);

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
                {eleves.length} {passes.length > 1 ? "ont" : "a"} passé
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
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {repartition.map(({ groupe, n }) => {
                    const g = GROUPES[groupe];
                    return (
                      <div
                        key={groupe}
                        className="rounded-xl border-2 border-[#1d1c16]/12 p-3"
                      >
                        <p
                          className={`text-[11px] font-black uppercase tracking-[0.12em] ${g.couleur}`}
                        >
                          {g.label}
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
              )}
            </section>

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
                    {eleves.map((e) => {
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
