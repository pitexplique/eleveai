import type { FamilleDico, MotDico } from "../types";

// 🇬🇧 Dico Anglais Terminale (CARTES) — le vocabulaire du bac et des axes du
// programme (identités, territoire, citoyenneté…), orthographe piégeuse.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsAnglaisTerminale: MotDico[] = [
  carte("term-a-nevertheless", "nevertheless", "anglais", "néanmoins, pourtant"),
  carte("term-a-whereas", "whereas", "anglais", "tandis que, alors que"),
  carte("term-a-achievement", "achievement", "anglais", "une réussite, un accomplissement"),
  carte("term-a-acknowledge", "acknowledge", "anglais", "reconnaître, admettre"),
  carte("term-a-commitment", "commitment", "anglais", "un engagement"),
  carte("term-a-citizenship", "citizenship", "anglais", "la citoyenneté"),
  carte("term-a-sustainability", "sustainability", "anglais", "la durabilité (développement durable)"),
  carte("term-a-heritage", "heritage", "anglais", "l'héritage, le patrimoine"),
  carte("term-a-controversy", "controversy", "anglais", "une controverse, une polémique"),
  carte("term-a-thorough", "thorough", "anglais", "minutieux, approfondi", "À ne pas confondre avec through (à travers)."),
  carte("term-a-empowerment", "empowerment", "anglais", "l'émancipation, la prise de pouvoir sur sa vie"),
  carte("term-a-belonging", "belonging", "anglais", "l'appartenance (à un groupe, un lieu)"),
];
