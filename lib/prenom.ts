// Extraction du prénom à partir d'un champ « NOM Prénom » (nom de famille en
// MAJUSCULES en tête). On n'affiche JAMAIS le nom de famille (règle RGPD du
// palmarès, du classement et de /votre-avis). Le nom de famille peut faire
// plusieurs mots tous en capitales : on retire tous les tokens en MAJUSCULES
// *de tête*, on garde le reste comme prénom(s).

// Un token est « nom de famille » s'il est entièrement en MAJUSCULES (et
// contient au moins une lettre — un token sans lettre, ex. « 123 », n'est pas
// considéré comme un nom). Gère les accents (« ÉLÉONORE »).
function estTokenMajuscule(token: string): boolean {
  return (
    token === token.toLocaleUpperCase("fr-FR") &&
    token !== token.toLocaleLowerCase("fr-FR")
  );
}

// Retire les tokens MAJUSCULES de tête, renvoie les tokens du/des prénom(s).
function tokensPrenom(valeur: string): string[] {
  const tokens = valeur.trim().replace(/\s+/g, " ").split(" ").filter(Boolean);
  let i = 0;
  while (i < tokens.length && estTokenMajuscule(tokens[i])) i++;
  return tokens.slice(i);
}

// Champ `nom` (table acces_etablissement), saisi « NOM EN MAJUSCULES prénom »
// (ex. « DIDUX Lucie »). Renvoie le prénom capitalisé, ou null s'il ne reste
// rien.
//   « PONTALBA TURPIN kathalynna » → « Kathalynna »
//   « DIDUX jean-pierre »          → « Jean-Pierre »
export function prenomFromNom(nom: string | null | undefined): string | null {
  if (!nom) return null;
  // Capitalise chaque segment, y compris après un tiret (« Jean-Pierre »).
  const capitaliser = (mot: string) =>
    mot
      .split("-")
      .map(
        (part) =>
          part.charAt(0).toLocaleUpperCase("fr-FR") +
          part.slice(1).toLocaleLowerCase("fr-FR")
      )
      .join("-");

  const prenom = tokensPrenom(nom).map(capitaliser).join(" ").trim();
  return prenom || null;
}

// Champ saisi au format « NOM Prénom » (la table retours_eleves) → on ne garde
// que le(s) prénom(s) et JAMAIS le nom de famille. Prénom(s) gardé(s) tels
// quels (pas de re-capitalisation), fallback « Élève » s'il ne reste rien.
//   « PONTALBA TURPIN Kathalynna » → « Kathalynna »
//   « MAIR Victor Rafael »         → « Victor Rafael »
//   « ULRICH Arthur »              → « Arthur »
export function prenomCourt(nomComplet: string | null | undefined): string {
  const reste = tokensPrenom(nomComplet ?? "");
  return reste.length > 0 ? reste.join(" ") : "Élève";
}
