"use client";

// LE TEST DE POSITIONNEMENT CRPE — LE DÉROULÉ (15/10/2026).
//
// Une question à la fois, corrigée dès qu'on a choisi : un candidat apprend
// autant de la correction que du score. À la fin, le bilan par thème renvoie
// aux samedis — c'est ce qui le rend utile, et ce qui mène à la page.
//
// ⭐ CONNECTÉ, LE BILAN S'ENREGISTRE TOUT SEUL (activité `parcours_maths`,
// classe « crpe ») et se retrouve au tableau de bord. Non connecté, rien ne se
// perd : le bilan reste à l'écran, et on propose le compte, sans l'imposer.

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { useEleve } from "@/context/EleveContext";
import { saveResultat } from "@/lib/resultats";
import { QUESTIONS, THEMES } from "./questions";

const LETTRES = ["A", "B", "C", "D"];

export default function TestCrpeClient() {
  const { eleve } = useEleve();
  const [rang, setRang] = useState(0);
  const [reponses, setReponses] = useState<(number | null)[]>(
    () => QUESTIONS.map(() => null),
  );
  const [fini, setFini] = useState(false);
  // ⭐ 16/10/2026, Frédéric : « avant de commencer le test tu peux proposer de
  // te connecter ». On PROPOSE, on n'impose pas : « Commencer sans compte »
  // reste un bouton à égalité. Connecté, l'écran ne s'affiche pas.
  const [parti, setParti] = useState(false);
  const [enregistrement, setEnregistrement] = useState<
    "rien" | "en_cours" | "ok" | "erreur"
  >("rien");
  const dejaEnregistre = useRef(false);

  const q = QUESTIONS[rang];
  const choisi = reponses[rang];
  const score = reponses.filter((r, i) => r === QUESTIONS[i].bonne).length;

  const bilan = useMemo(
    () =>
      THEMES.map((t) => {
        const indices = QUESTIONS.map((qq, i) => (qq.theme === t.id ? i : -1)).filter(
          (i) => i >= 0,
        );
        const justes = indices.filter((i) => reponses[i] === QUESTIONS[i].bonne).length;
        return { ...t, justes, total: indices.length };
      }),
    [reponses],
  );

  // Les priorités d'abord : ce qui est à 0, puis à moitié, puis acquis.
  const bilanTrie = [...bilan].sort((a, b) => a.justes / a.total - b.justes / b.total);

  useEffect(() => {
    if (!fini || dejaEnregistre.current) return;
    dejaEnregistre.current = true;
    track("crpe_test_fini", { score });
    if (!eleve?.token) return;
    setEnregistrement("en_cours");
    saveResultat(eleve, "parcours_maths", {
      classe: "crpe",
      niveau: "positionnement",
      matiere: "maths",
      score,
      total: QUESTIONS.length,
      details: {
        test: "positionnement-crpe",
        themes: bilan.map(({ id, titre, justes, total }) => ({ id, titre, justes, total })),
        reponses,
      },
    }).then(({ error }) => setEnregistrement(error ? "erreur" : "ok"));
  }, [fini, eleve, score, bilan, reponses]);

  function choisir(i: number) {
    if (choisi !== null) return;
    setReponses((r) => r.map((v, k) => (k === rang ? i : v)));
  }

  function suivante() {
    if (rang + 1 < QUESTIONS.length) setRang(rang + 1);
    else {
      setFini(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (!eleve?.token && !parti) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-7">
        <h2 className="text-xl font-black text-slate-900">Avant de commencer</h2>
        <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
          Connecté, votre bilan s&apos;enregistre sur votre compte et vous le
          retrouvez quand vous voulez. Sans compte, il s&apos;affiche à la fin,
          et vous pouvez l&apos;imprimer ou l&apos;enregistrer en PDF.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {/* `?next=` : la page de connexion ramène ici (app/auth/signin). */}
          <Link
            href="/auth/signin?next=/formation-crpe/test"
            onClick={() => track("crpe_test_connexion")}
            className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-500"
          >
            Me connecter
          </Link>
          <Link
            href="/auth/signup"
            onClick={() => track("crpe_test_inscription")}
            className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-sky-700 ring-1 ring-sky-200 transition hover:bg-sky-50"
          >
            Créer un compte gratuit
          </Link>
          <button
            type="button"
            onClick={() => {
              track("crpe_test_sans_compte");
              setParti(true);
            }}
            className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400"
          >
            Commencer sans compte →
          </button>
        </div>
      </div>
    );
  }

  if (fini) {
    return (
      // ⭐ IMPRIMER PLUTÔT QUE TÉLÉCHARGER (16/10/2026). `window.print()` ne
      // coûte rien — ni bibliothèque PDF dans le paquet, ni serveur — et la
      // fenêtre d'impression propose « Enregistrer au format PDF » : un seul
      // bouton fait les deux. La règle `@media print` n'affiche que ce bloc.
      <div id="bilan-crpe">
        <style>{`@media print {
          body * { visibility: hidden !important; }
          #bilan-crpe, #bilan-crpe * { visibility: visible !important; }
          #bilan-crpe { position: absolute; left: 0; top: 0; width: 100%; }
          #bilan-crpe * { -webkit-print-color-adjust: exact; print-color-adjust: exact; box-shadow: none !important; }
        }`}</style>
        <div className="mb-4 hidden print:block">
          <p className="text-lg font-black text-slate-900">
            Test de positionnement — les maths du CRPE
          </p>
          <p className="text-sm font-semibold text-slate-600">
            Passé le {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            {" "}· eleveai.fr/formation-crpe
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-7">
          <p className="text-xs font-black uppercase tracking-wide text-orange-600">Votre bilan</p>
          <p className="mt-1 text-5xl font-black text-slate-900">
            {score}
            <span className="text-2xl text-slate-400"> / {QUESTIONS.length}</span>
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
            Ce score ne classe personne. Ce qui compte, c&apos;est la liste du
            dessous&nbsp;: les thèmes en rouge sont les samedis à ne pas manquer,
            ceux en vert sont ceux que vous pourriez presque sauter.
          </p>
          {enregistrement === "ok" && (
            <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
              ✓ Bilan enregistré sur votre compte : vous le retrouverez dans votre{" "}
              <Link href="/dashboard-eleve" className="underline">tableau de bord</Link>.
            </p>
          )}
          {enregistrement === "erreur" && (
            <p className="mt-3 rounded-xl bg-rose-50 px-4 py-2 text-sm font-bold text-rose-800">
              Le bilan n&apos;a pas pu être enregistré. Il reste affiché ici :
              imprimez-le ou enregistrez-le en PDF pour le garder.
            </p>
          )}
        </div>

        <ol className="mt-5 space-y-3">
          {bilanTrie.map((t) => {
            const etat =
              t.justes === t.total
                ? { mot: "Acquis", c: "bg-emerald-100 text-emerald-800", p: "bg-emerald-500" }
                : t.justes === 0
                  ? { mot: "Priorité", c: "bg-rose-100 text-rose-800", p: "bg-rose-500" }
                  : { mot: "À consolider", c: "bg-amber-100 text-amber-800", p: "bg-amber-500" };
            return (
              <li
                key={t.id}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70"
              >
                <span aria-hidden className={`h-3 w-3 shrink-0 rounded-full ${etat.p}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-base font-black text-slate-900">{t.titre}</p>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Séance du {t.seance}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${etat.c}`}>
                  {etat.mot} · {t.justes}/{t.total}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Sur papier seulement : un bilan imprimé circule, il dit où venir. */}
        <p className="mt-5 hidden text-sm font-semibold text-slate-700 print:block">
          Les maths du CRPE, le samedi de 8 h à 12 h à l&apos;Hôtel Terre-Sainte
          (Saint-Pierre) · eleveai.fr/formation-crpe · 06 92 74 29 58
        </p>

        <button
          type="button"
          onClick={() => {
            track("crpe_test_imprimer");
            window.print();
          }}
          className="mt-5 w-full rounded-2xl bg-white px-6 py-3.5 text-base font-black text-slate-800 ring-1 ring-slate-300 transition hover:bg-slate-50 print:hidden"
        >
          🖨️ Imprimer ou enregistrer en PDF
        </button>
        <p className="mt-2 text-center text-xs font-semibold text-slate-500 print:hidden">
          Pour le PDF : choisissez « Enregistrer au format PDF » comme imprimante.
        </p>

        {!eleve?.token && (
          <div className="mt-6 rounded-3xl bg-sky-50 p-6 shadow-sm ring-1 ring-sky-200 print:hidden">
            <h2 className="text-lg font-black text-sky-950">Garder ce bilan</h2>
            <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
              Avec un compte gratuit, le bilan s&apos;enregistre, et tout ce que
              vous faites ensuite sur le site aussi&nbsp;: vos séries du coach,
              leurs notes, ce qui reste à réviser.
            </p>
            <Link
              href="/auth/signup"
              className="mt-4 inline-block rounded-2xl bg-sky-600 px-6 py-3 text-sm font-black text-white transition hover:bg-sky-500"
            >
              Créer mon compte gratuit →
            </Link>
          </div>
        )}

        <div className="mt-6 rounded-3xl bg-[#041B33] p-6 text-white shadow-xl sm:p-7 print:hidden">
          <h2 className="text-xl font-black">Travailler ces thèmes avec moi, le samedi</h2>
          <p className="mt-2 text-sm font-semibold leading-7 text-white/75">
            Apportez ce bilan à la première séance où vous venez&nbsp;: on part
            de vos rouges, pas d&apos;un programme générique.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/formation-crpe#inscription"
              className="rounded-2xl bg-amber-400 px-6 py-3 text-sm font-black text-[#041B33] transition hover:bg-amber-300"
            >
              Rejoindre le groupe du samedi →
            </Link>
            <Link
              href="/formation-crpe#calendrier"
              className="rounded-2xl bg-white/10 px-6 py-3 text-sm font-black text-white ring-1 ring-white/25 transition hover:bg-white/20"
            >
              Voir les samedis
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const theme = THEMES.find((t) => t.id === q.theme);

  return (
    <div>
      {/* La progression : une barre, et le thème en cours. */}
      <div className="flex items-center justify-between text-xs font-black uppercase tracking-wide text-slate-500">
        <span>Question {rang + 1} / {QUESTIONS.length}</span>
        <span className="text-orange-600">{theme?.titre}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all"
          style={{ width: `${((rang + (choisi !== null ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="mt-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-7">
        <p className="text-lg font-black leading-8 text-slate-900">{q.enonce}</p>

        <div className="mt-5 grid gap-3">
          {q.choix.map((c, i) => {
            const estBonne = i === q.bonne;
            const estChoisi = i === choisi;
            let style = "bg-slate-50 ring-slate-200 hover:bg-amber-50 hover:ring-amber-300";
            if (choisi !== null) {
              if (estBonne) style = "bg-emerald-50 ring-emerald-400";
              else if (estChoisi) style = "bg-rose-50 ring-rose-400";
              else style = "bg-slate-50 ring-slate-200 opacity-60";
            }
            return (
              <button
                key={c}
                type="button"
                onClick={() => choisir(i)}
                disabled={choisi !== null}
                className={`flex items-center gap-3 rounded-2xl p-4 text-left text-base font-bold text-slate-800 ring-1 transition ${style}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-slate-500 ring-1 ring-slate-200">
                  {choisi !== null && estBonne ? "✓" : choisi !== null && estChoisi ? "✗" : LETTRES[i]}
                </span>
                <span>{c}</span>
              </button>
            );
          })}
        </div>

        {choisi !== null && (
          <div
            className={`mt-5 rounded-2xl p-4 text-sm font-semibold leading-7 ${
              choisi === q.bonne ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"
            }`}
          >
            <p className="font-black">{choisi === q.bonne ? "Juste." : "Pas tout à fait."}</p>
            <p className="mt-1">{q.correction}</p>
          </div>
        )}

        {choisi !== null && (
          <button
            type="button"
            onClick={suivante}
            className="mt-5 rounded-2xl bg-orange-500 px-7 py-3.5 text-base font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400"
          >
            {rang + 1 < QUESTIONS.length ? "Question suivante →" : "Voir mon bilan →"}
          </button>
        )}
      </div>
    </div>
  );
}
