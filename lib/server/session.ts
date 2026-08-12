// Jeton de session signé (HMAC-SHA256), délivré côté serveur au login.
// Permet aux routes API (/api/resultats, /api/dashboard) de vérifier
// l'identité d'un utilisateur sans session Supabase Auth : la session
// "codes établissement" ne vit que dans le localStorage du navigateur,
// donc seule une signature serveur prouve que les codes ont bien été
// validés par /api/code-login ou /api/email-session.
//
// Ce module ne doit être importé que côté serveur (routes API).

import { createHmac, timingSafeEqual } from "node:crypto";

export type SessionTokenPayload = {
  acces_id: string;
  code_etablissement: string;
  code_utilisateur: string;
  nom: string | null;
  type_utilisateur: string;
  classe: string | null;
  /** Expiration en secondes epoch. */
  exp: number;
};

const TOKEN_VALIDITY_SECONDS = 30 * 24 * 60 * 60; // 30 jours

/**
 * L'ÉTABLISSEMENT QUI N'EN EST PAS UN.
 *
 * Un compte créé par e-mail n'a pas de collège : `/api/email-session` lui en
 * forge un, « INDEPENDANT », partagé par TOUS les inscrits individuels. Ce
 * n'est pas un établissement, c'est un fourre-tout.
 */
export const ETABLISSEMENT_INDEPENDANT = "INDEPENDANT";

/** Les rôles qui, dans un vrai établissement, en voient tous les comptes. */
export const ROLES_ETABLISSEMENT = new Set(["prof", "principal", "boss"]);

/**
 * Cette session voit-elle son établissement entier, ou seulement son porteur ?
 *
 * ⚠️ DEUX CONDITIONS — ET LA SECONDE EST LA PLUS IMPORTANTE (12/08/2026).
 *
 * Le rôle ne suffit pas. `type_utilisateur` est AUTO-DÉCLARÉ à l'inscription
 * par e-mail : on choisit « prof » dans le formulaire, ou on arrive avec
 * `?type=prof` dans l'URL (app/auth/signin/page.tsx), et RIEN ne le vérifie.
 * Accorder le périmètre établissement à un compte INDEPENDANT revenait donc à
 * montrer à n'importe quel inscrit les noms et les résultats de tous les
 * autres inscrits par e-mail. Les élèves des vrais collèges n'ont jamais été
 * exposés — ils vivent sous leur propre `code_etablissement` — mais les
 * particuliers, eux, l'étaient les uns aux autres.
 *
 * Le repli est le bon : un compte INDEPENDANT retombe sur « moi seul », ce qui
 * est exact puisqu'aucun élève ne lui est rattaché. Le jour où un prof pourra
 * relier ses établissements à son compte e-mail (colonne `personne_id`), le
 * périmètre viendra de ce rattachement — d'un fait vérifiable, jamais d'un
 * rôle qu'on se donne à soi-même.
 */
export function voitToutSonEtablissement(session: {
  type_utilisateur: string;
  code_etablissement: string;
}): boolean {
  return (
    ROLES_ETABLISSEMENT.has(session.type_utilisateur) &&
    session.code_etablissement !== ETABLISSEMENT_INDEPENDANT
  );
}

function getSecret(): string {
  const secret =
    process.env.ELEVEAI_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error(
      "ELEVEAI_SESSION_SECRET (ou SUPABASE_SERVICE_ROLE_KEY) manquant"
    );
  }
  return secret;
}

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function hmac(data: string): Buffer {
  return createHmac("sha256", getSecret()).update(data).digest();
}

export function signSessionToken(
  payload: Omit<SessionTokenPayload, "exp">
): string {
  const full: SessionTokenPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + TOKEN_VALIDITY_SECONDS,
  };
  const body = b64url(Buffer.from(JSON.stringify(full), "utf8"));
  return `${body}.${b64url(hmac(body))}`;
}

export function verifySessionToken(
  token: unknown
): SessionTokenPayload | null {
  if (typeof token !== "string" || token.length > 4096) return null;

  const dot = token.indexOf(".");
  if (dot <= 0) return null;

  const body = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  let expected: Buffer;
  let provided: Buffer;
  try {
    expected = hmac(body);
    provided = Buffer.from(signature, "base64url");
  } catch {
    return null;
  }
  if (
    expected.length !== provided.length ||
    !timingSafeEqual(expected, provided)
  ) {
    return null;
  }

  let payload: SessionTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  if (
    !payload ||
    typeof payload.code_etablissement !== "string" ||
    !payload.code_etablissement ||
    typeof payload.code_utilisateur !== "string" ||
    !payload.code_utilisateur ||
    typeof payload.type_utilisateur !== "string" ||
    typeof payload.exp !== "number" ||
    payload.exp < Math.floor(Date.now() / 1000)
  ) {
    return null;
  }

  return payload;
}
