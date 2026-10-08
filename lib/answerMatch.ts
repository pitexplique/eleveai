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
    // 05/10/2026 : le vrai moins « − » affiché vaut le « - » du clavier.
    .replace(/[−–]/g, "-")
    .replace(/\s+/g, " ");
}

// 05/10/2026 (Frédéric) : « 7x » et « 7*x » sont la même réponse, partout.
// On efface le signe fois (*, ×, ·) quand il est suivi d'une lettre ou d'une
// parenthèse : 7*t → 7t, 2 × (x + 1) → 2(x+1), 3*a*b → 3ab, π × r² → πr².
// Entre deux nombres (3 × 4) il reste : ce n'est pas une multiplication implicite.
function sansFoisImplicite(value: string) {
  return value
    .replace(/ /g, "")
    .replace(/([0-9a-zà-öø-ÿα-ω²³)])[*×·](?=[a-zà-öø-ÿα-ω(])/g, "$1");
}

type NumberWithUnit = { num: number; unit: string };

// « 190cm », « 190 cm », « 12 élèves », « 25 cm² », « 8 m3 », « -1.5 » → nombre
// + unité éventuelle. L'unité doit être un seul mot (lettres, chiffres pour les
// exposants « cm2 », %, °, €, ², ³) : « 4 ou 5 » ne passe pas.
function parseNumberWithUnit(value: string): NumberWithUnit | null {
  // ⛔ 08/10/2026 : « 32 000 » était lu « 32 » + unité « 000 », si bien que
  // « 32 » passait pour « 32 000 ». On colle d'abord les espaces des milliers,
  // et une unité ne commence jamais par un chiffre.
  value = value.replace(/(\d) (?=\d{3}(?!\d))/g, "$1");
  const match = value.match(/^(-?\d+(?:\.\d+)?)\s*((?:[a-zà-öø-ÿ€%°²³][a-zà-öø-ÿ€%°²³0-9]{0,14})?)$/);
  if (!match) return null;

  const num = Number(match[1]);
  if (!Number.isFinite(num)) return null;

  return { num, unit: match[2] ?? "" };
}

function sameUnit(userUnit: string, expectedUnit: string) {
  // ⛔ 08/10/2026 : « pi » n'est pas une unité : « 300 » ne vaut pas « 300 pi ».
  if (/^pi$/.test(userUnit) !== /^pi$/.test(expectedUnit)) return false;
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

  // « 7*x », « 7 × x » vs « 7x ».
  if (sansFoisImplicite(user) === sansFoisImplicite(expected)) return true;

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
