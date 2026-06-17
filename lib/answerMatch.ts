// Comparaison tolérante des réponses libres, partagée par les Parcours
// (lib/parcours/scoreParcours.ts) et le Coach (lib/tutor/evaluation/comparators.ts).
//
// Issue des retours élèves du 11/06/2026 : « 190cm » refusé alors que la bonne
// réponse était « 190 cm », « 5 cm » refusé quand la réponse attendue est « 5 »,
// « 12 eleve » refusé pour « 12 ». On accepte désormais les espaces en plus ou
// en moins, toutes les virgules décimales, et une unité ajoutée ou omise par
// l'élève — mais jamais une unité DIFFÉRENTE de celle attendue (« 5 m » reste
// faux si on attend « 5 cm »).

export function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/,/g, ".")
    .replace(/\s+/g, " ");
}

type NumberWithUnit = { num: number; unit: string };

// « 190cm », « 190 cm », « 12 élèves », « 25 cm² », « 8 m3 », « -1.5 » → nombre
// + unité éventuelle. L'unité doit être un seul mot (lettres, chiffres pour les
// exposants « cm2 », %, °, €, ², ³) : « 4 ou 5 » ne passe pas.
function parseNumberWithUnit(value: string): NumberWithUnit | null {
  const match = value.match(/^(-?\d+(?:\.\d+)?)\s*([a-zà-öø-ÿ€%°²³0-9]{0,15})$/);
  if (!match) return null;

  const num = Number(match[1]);
  if (!Number.isFinite(num)) return null;

  return { num, unit: match[2] ?? "" };
}

function sameUnit(userUnit: string, expectedUnit: string) {
  // Unité omise d'un côté : l'énoncé fixe déjà l'unité, on accepte.
  if (!userUnit || !expectedUnit) return true;
  // Tolère le pluriel, les accents (« eleve » vs « élèves ») et les exposants
  // tapés en chiffres (« cm2 » vs « cm² », « m3 » vs « m³ ») : c'est une unité,
  // pas un exercice d'orthographe ni de saisie de caractères spéciaux.
  const strip = (u: string) =>
    u
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/²/g, "2")
      .replace(/³/g, "3")
      .replace(/s$/, "");
  return strip(userUnit) === strip(expectedUnit);
}

export function answersMatch(userAnswer: string, expectedAnswer: string) {
  const user = normalizeAnswer(userAnswer);
  const expected = normalizeAnswer(expectedAnswer);

  // Garde-fou : une réponse vide ne doit jamais matcher (Number("") vaut 0).
  if (user === "") return false;

  if (user === expected) return true;

  // « 190cm » vs « 190 cm » : mêmes caractères une fois les espaces retirés.
  if (user.replace(/ /g, "") === expected.replace(/ /g, "")) return true;

  const userNumber = Number(user);
  const expectedNumber = Number(expected);
  if (!Number.isNaN(userNumber) && !Number.isNaN(expectedNumber)) {
    return Math.abs(userNumber - expectedNumber) < 0.0001;
  }

  // « 5 cm » vs « 5 », « 12 élèves » vs « 12 », « 1,9m » vs « 1.9 m »…
  const userParsed = parseNumberWithUnit(user);
  const expectedParsed = parseNumberWithUnit(expected);
  if (userParsed && expectedParsed) {
    return (
      Math.abs(userParsed.num - expectedParsed.num) < 0.0001 &&
      sameUnit(userParsed.unit, expectedParsed.unit)
    );
  }

  return false;
}
