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
      <span className={alerte}>Tes réponses précédentes n'ont pas pu être gardées.</span>
    );
  } else if (connecte) {
    if (nbReponses > 0 && sessionARenouveler) {
      contenu = (
        <span className={alerte}>
          Ta séance n'est pas enregistrée : déconnecte-toi puis reconnecte-toi.
        </span>
      );
    } else if (nbReponses > 0 && etatAuto === "ok") {
      contenu = <span className={discret}>✓ Séance enregistrée automatiquement</span>;
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
