"use client";

// ⭐ 24/11/2026 — LES EXERCICES INTERACTIFS COMPTENT AUSSI. Frédéric, après le
// test en classe : « un bouton enregistrement de séance s'ils veulent
// conserver », « et le mettre dans la moyenne et le tableau de bord », avec en
// haut « le même choix qu'au coach » (📝 Ma séance compte / 🏋️ Entraînement).
//
// La fiche compte les réponses validées (événement de ReponseExercice). Un
// exercice = une question ; c'est la PREMIÈRE validation qui compte (comme une
// copie rendue) : corriger ensuite reste utile, mais ne change pas la note.
// L'envoi va dans resultats_tutor (type « exercices ») : la moyenne pondérée,
// le cockpit, le jardin, la ligne du prof et les bulletins le lisent déjà.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEleve } from "@/context/EleveContext";
import { saveResultat } from "@/lib/resultats";
import { ChoixSeance } from "@/app/coach/serie/EtatEnregistrementSeance";
import { EVENEMENT_REPONSE_EXERCICE } from "@/components/fiches-exercices/ReponseExercice";

type Etat = "rien" | "envoi" | "ok" | "erreur";

export function useSeanceExercices() {
  const { eleve } = useEleve() as unknown as { eleve?: { token?: string | null } | null };
  const [entrainement, setEntrainement] = useState(false);
  const [reponses, setReponses] = useState<Record<string, boolean>>({});
  const [etat, setEtat] = useState<Etat>("rien");
  const [message, setMessage] = useState("");
  const seanceId = useRef(
    `ex-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
  );

  useEffect(() => {
    const ecouter = (e: Event) => {
      const d = (e as CustomEvent<{ id?: string; juste?: boolean }>).detail;
      if (!d?.id) return;
      setReponses((r) => (d.id! in r ? r : { ...r, [d.id!]: !!d.juste }));
    };
    window.addEventListener(EVENEMENT_REPONSE_EXERCICE, ecouter);
    return () => window.removeEventListener(EVENEMENT_REPONSE_EXERCICE, ecouter);
  }, []);

  const questions = Object.keys(reponses).length;
  const bonnes = Object.values(reponses).filter(Boolean).length;

  // Une nouvelle réponse après l'envoi : le bouton redevient « Enregistrer ».
  useEffect(() => {
    setEtat((e) => (e === "ok" ? "rien" : e));
  }, [questions, entrainement]);

  return {
    eleve: eleve ?? null,
    entrainement,
    setEntrainement,
    questions,
    bonnes,
    etat,
    setEtat,
    message,
    setMessage,
    seanceId: seanceId.current,
  };
}

export type SeanceExercices = ReturnType<typeof useSeanceExercices>;

/** En haut de la fiche : le même choix qu'au coach. */
export function ChoixSeanceExercices({ seance }: { seance: SeanceExercices }) {
  const { eleve } = seance;
  if (!eleve) return null;
  return (
    <div className="screen-only mt-4 flex flex-wrap items-center gap-2">
      <ChoixSeance
        connecte={!!eleve}
        sessionARenouveler={!eleve.token}
        entrainement={seance.entrainement}
        onEntrainement={seance.setEntrainement}
      />
      <span className="text-xs font-semibold text-slate-500">
        {seance.entrainement
          ? "Entraînement : ta séance ne compte pas dans ta moyenne."
          : "Ta séance compte dans ta moyenne si tu l’enregistres à la fin."}
      </span>
    </div>
  );
}

/** À la fin de la fiche : le bouton « Enregistrer ma séance ». */
export function EnregistrerSeanceExercices({
  seance,
  classe,
  notion,
  titre,
}: {
  seance: SeanceExercices;
  classe: string;
  notion: string;
  titre: string;
}) {
  const pathname = usePathname();
  const { eleve, questions, bonnes, etat, entrainement } = seance;

  async function enregistrer() {
    if (!eleve || questions === 0) return;
    seance.setEtat("envoi");
    const { error } = await saveResultat(eleve, "exercices", {
      classe,
      matiere: "maths",
      // Le coach écrit ses notions avec « _ » ; la fiche, avec « - ».
      notion_id: notion.replace(/-/g, "_"),
      score_sur_20: parseFloat(((bonnes / questions) * 20).toFixed(1)),
      bonnes_reponses: bonnes,
      nb_tentatives: questions,
      temps_sec: 0,
      details: {
        seance_id: seance.seanceId,
        entrainement,
        notionLabel: titre,
        fiche: pathname,
        savedAt: new Date().toISOString(),
      },
    });
    seance.setMessage(error?.message ?? "");
    seance.setEtat(error ? "erreur" : "ok");
  }

  return (
    <section className="screen-only mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
      <p className="text-lg font-black text-emerald-900">
        {questions === 0
          ? "Valide tes réponses : elles se comptent ici."
          : `${bonnes} bonne${bonnes > 1 ? "s" : ""} réponse${bonnes > 1 ? "s" : ""} sur ${questions} question${
              questions > 1 ? "s" : ""
            }`}
      </p>
      {questions > 0 && (
        <p className="mt-1 text-sm font-semibold text-emerald-800">
          {bonnes} ÷ {questions} × 20 = {((bonnes / questions) * 20).toFixed(1).replace(".", ",")}/20
          {entrainement && " · 🏋️ entraînement, ne compte pas"}
        </p>
      )}
      <p className="mt-1 text-xs text-emerald-700">C’est ta première réponse à chaque exercice qui compte.</p>

      {!eleve ? (
        <Link
          href={`/auth/signin?mode=eleve&next=${encodeURIComponent(pathname || "/fiches-exercices")}`}
          className="mt-4 inline-flex rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-black text-white shadow hover:bg-emerald-500"
        >
          Connecte-toi pour enregistrer ta séance
        </Link>
      ) : !eleve.token ? (
        <p className="mt-4 text-sm font-semibold text-amber-700">
          Déconnecte-toi puis reconnecte-toi pour enregistrer ta séance.
        </p>
      ) : (
        <button
          type="button"
          onClick={() => void enregistrer()}
          disabled={questions === 0 || etat === "envoi" || etat === "ok"}
          className="mt-4 inline-flex rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-black text-white shadow transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {etat === "envoi"
            ? "Enregistrement…"
            : etat === "ok"
              ? "✓ Séance enregistrée"
              : "💾 Enregistrer ma séance"}
        </button>
      )}
      {etat === "ok" && (
        <p className="mt-2 text-xs font-semibold text-emerald-800">
          Retrouve-la dans ton{" "}
          <Link href="/dashboard-eleve" className="underline">
            tableau de bord
          </Link>
          . Tu peux continuer : enregistre de nouveau à la fin.
        </p>
      )}
      {etat === "erreur" && <p className="mt-2 text-xs font-semibold text-red-700">{seance.message}</p>}
    </section>
  );
}
