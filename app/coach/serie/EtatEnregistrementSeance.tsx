"use client";

import Link from "next/link";

/**
 * ⭐ 05/11/2026 — Frédéric : « dès la deuxième question on propose d'enregistrer
 * la séance, ça n'a pas de sens ». La séance d'un élève connecté s'enregistre
 * toute seule : plus de bouton, une simple ligne une fois que c'est fait.
 * L'élève sans compte n'est invité qu'à partir de 10 réponses, quand il a
 * vraiment quelque chose à garder.
 */
export const REPONSES_AVANT_INVITATION = 10;

export type EtatAuto = "ok" | "erreur" | null;

type Props = {
  connecte: boolean;
  /** Connecté avec une session trop ancienne : aucun envoi n'est possible. */
  sessionARenouveler: boolean;
  nbReponses: number;
  etatAuto: EtatAuto;
  /** Retour de connexion : la séance gardée de l'onglet a été envoyée, ou pas. */
  reprise: { nbReponses: number; ok: boolean } | null;
  lienConnexion: string;
  onAvantConnexion: () => void;
  /** Le bandeau du mode complet est sombre sur ordinateur. */
  surFondSombre?: boolean;
  /** 🏋️ Entraînement : la séance s'enregistre, sa note ne compte pas (23/11). */
  entrainement?: boolean;
  onEntrainement?: (v: boolean) => void;
};

export default function EtatEnregistrementSeance({
  connecte,
  sessionARenouveler,
  nbReponses,
  etatAuto,
  reprise,
  lienConnexion,
  onAvantConnexion,
  surFondSombre = false,
  entrainement = false,
}: Props) {
  const discret = surFondSombre ? "text-white/80" : "text-slate-500";
  const alerte = surFondSombre ? "text-amber-200" : "text-amber-700";
  const lien = surFondSombre ? "text-white" : "text-sky-700";

  let contenu = null;

  // La confirmation de reprise s'efface dès la première réponse de la nouvelle séance.
  if (reprise && nbReponses === 0) {
    contenu = reprise.ok ? (
      <span className={discret}>
        ✓ Tes {reprise.nbReponses} réponses sont gardées dans ton compte.
      </span>
    ) : (
      <span className={alerte}>Tes réponses précédentes n&apos;ont pas pu être gardées.</span>
    );
  } else if (connecte) {
    if (nbReponses > 0 && sessionARenouveler) {
      contenu = (
        <span className={alerte}>
          Ta séance n&apos;est pas enregistrée : déconnecte-toi puis reconnecte-toi.
        </span>
      );
    } else if (nbReponses > 0 && etatAuto === "ok") {
      contenu = (
        <span className={discret}>
          {entrainement
            ? "✓ Entraînement enregistré (ne compte pas dans ta moyenne)"
            : "✓ Séance enregistrée automatiquement"}
        </span>
      );
    } else if (nbReponses > 0 && etatAuto === "erreur") {
      contenu = (
        <span className={alerte}>
          Séance pas encore enregistrée : nouvel essai dans quelques questions.
        </span>
      );
    }
  } else if (nbReponses >= REPONSES_AVANT_INVITATION) {
    contenu = (
      <span className={discret}>
        Bravo, {nbReponses} questions !{" "}
        <Link
          href={lienConnexion}
          onClick={onAvantConnexion}
          className={`font-bold underline ${lien}`}
        >
          Connecte-toi pour garder tes progrès.
        </Link>
      </span>
    );
  }

  if (!contenu) return null;

  return <p className="text-center text-xs font-semibold leading-snug">{contenu}</p>;
}

/**
 * ⭐ 24/11/2026 — LE CHOIX MONTE EN HAUT DU COACH. Frédéric, après le test en
 * classe : en bas de la vue simple, sous les scores, « personne ne le voit » —
 * « oui, remonte-le ». Il vit maintenant dans la barre du haut (vue simple) et
 * à côté de « Démarrer une mission » (mode complet). La ligne « ✓ Séance
 * enregistrée » reste en bas, dans EtatEnregistrementSeance.
 */
export function ChoixSeance({
  connecte,
  sessionARenouveler,
  entrainement,
  onEntrainement,
  surFondSombre = false,
  classeHors = null,
}: {
  connecte: boolean;
  sessionARenouveler: boolean;
  entrainement: boolean;
  onEntrainement: (v: boolean) => void;
  surFondSombre?: boolean;
  /** ⭐ 24/11/2026 — la classe choisie n'est pas celle de l'élève (son
   *  niveau, ex. « 4e ») : « Ma séance compte » est grisé. Voir
   *  lib/moyenne/compteDansLaMoyenne.ts. */
  classeHors?: string | null;
}) {
  if (!connecte || sessionARenouveler) return null;
  const choix = (
    <div
      role="radiogroup"
      aria-label="Ma séance compte-t-elle pour ma note ?"
      className={`flex w-fit flex-wrap justify-center gap-1 rounded-full p-1 text-xs font-black ${
        surFondSombre ? "bg-white/15" : "bg-slate-100"
      }`}
    >
      {[
        { v: false, label: "📝 Ma séance compte" },
        { v: true, label: "🏋️ Entraînement" },
      ].map((o) => {
        const actif = (classeHors ? true : entrainement) === o.v;
        const grise = !!classeHors && !o.v;
        return (
          <button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={actif}
            aria-disabled={grise || undefined}
            disabled={grise}
            title={grise ? "Ce n'est pas ta classe : ta séance est un entraînement" : undefined}
            onClick={() => onEntrainement(o.v)}
            className={`rounded-full px-3 py-1.5 transition ${
              grise
                ? `cursor-not-allowed opacity-40 ${surFondSombre ? "text-white" : "text-slate-500"}`
                : actif
                ? o.v
                  ? "bg-amber-400 text-amber-950 shadow"
                  : "bg-emerald-600 text-white shadow"
                : surFondSombre
                  ? "text-white hover:bg-white/15"
                  : "text-slate-600 hover:bg-white"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
  if (!classeHors) return choix;
  return (
    <div className="flex flex-col items-start gap-1">
      {choix}
      <p className={`pl-2 text-xs font-bold ${surFondSombre ? "text-amber-200" : "text-amber-700"}`}>
        Ce n’est pas ta classe : ta séance est un entraînement.
      </p>
    </div>
  );
}
