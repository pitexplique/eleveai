// Le champ `nom` (table acces_etablissement) est saisi au format
// « NOM EN MAJUSCULES prénom en minuscules » (ex. « DIDUX Lucie »).
// On n'affiche jamais le nom de famille : on garde les mots qui ne sont pas
// entièrement en majuscules, c'est le prénom.
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

  const prenom = nom
    .trim()
    .split(/\s+/)
    .filter((mot) => mot !== mot.toLocaleUpperCase("fr-FR"))
    .map(capitaliser)
    .join(" ")
    .trim();
  return prenom || null;
}
