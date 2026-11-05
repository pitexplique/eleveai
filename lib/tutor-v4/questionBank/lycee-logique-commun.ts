// LA CONTRAPOSÉE (05/11/2026). Programme 2026 de seconde et de première technologique :
// « formuler la réciproque, la contraposée ». Le même jeu sert les deux classes.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { expl, qcm, un } from "./lycee-commun";

/**
 * « Si P, alors Q ». La proposition du « si » porte le sujet indéfini (`suj` : « un nombre »),
 * celle du « alors » le sujet repris (`dem` : « ce nombre ») : chaque sens se lit bien en français.
 * `recVrai` n'est renseigné que là où la réciproque se tranche sans discussion.
 */
export type Impl = { suj?: string; dem?: string; P: string; Q: string; nP: string; nQ: string; recVrai: boolean };
const nombre = (P: string, Q: string, nP: string, nQ: string, recVrai = false): Impl => ({ suj: "un nombre", dem: "ce nombre", P, Q, nP, nQ, recVrai });
export const IMPLICATIONS: Impl[] = [
  { P: "il pleut", Q: "le sol est mouillé", nP: "il ne pleut pas", nQ: "le sol n'est pas mouillé", recVrai: false },
  nombre("se termine par 0", "est divisible par 5", "ne se termine pas par 0", "n'est pas divisible par 5"),
  nombre("est multiple de 6", "est multiple de 3", "n'est pas multiple de 6", "n'est pas multiple de 3"),
  nombre("est multiple de 4", "est pair", "n'est pas multiple de 4", "est impair"),
  nombre("est multiple de 10", "est pair", "n'est pas multiple de 10", "est impair"),
  { suj: "un quadrilatère", dem: "ce quadrilatère", P: "est un carré", Q: "est un rectangle", nP: "n'est pas un carré", nQ: "n'est pas un rectangle", recVrai: false },
  { suj: "un triangle", dem: "ce triangle", P: "est équilatéral", Q: "est isocèle", nP: "n'est pas équilatéral", nQ: "n'est pas isocèle", recVrai: false },
  { suj: "un animal", dem: "cet animal", P: "est un chat", Q: "est un mammifère", nP: "n'est pas un chat", nQ: "n'est pas un mammifère", recVrai: false },
  { suj: "un monument", dem: "ce monument", P: "est à Paris", Q: "est en France", nP: "n'est pas à Paris", nQ: "n'est pas en France", recVrai: false },
  { suj: "un conducteur", dem: "ce conducteur", P: "a le permis de conduire", Q: "a au moins 17 ans", nP: "n'a pas le permis de conduire", nQ: "a moins de 17 ans", recVrai: false },
  { suj: "une lampe", dem: "cette lampe", P: "est allumée", Q: "reçoit du courant", nP: "n'est pas allumée", nQ: "ne reçoit pas de courant", recVrai: false },
  { suj: "un salarié", dem: "ce salarié", P: "est en congé", Q: "n'est pas au bureau", nP: "n'est pas en congé", nQ: "est au bureau", recVrai: false },
  { suj: "une note", dem: "cette note", P: "dépasse 15", Q: "dépasse 10", nP: "ne dépasse pas 15", nQ: "ne dépasse pas 10", recVrai: false },
  { suj: "un prix", dem: "ce prix", P: "augmente de 10 %", Q: "augmente", nP: "n'augmente pas de 10 %", nQ: "n'augmente pas", recVrai: false },
  { suj: "un rectangle", dem: "ce rectangle", P: "a quatre côtés égaux", Q: "est un carré", nP: "n'a pas quatre côtés égaux", nQ: "n'est pas un carré", recVrai: true },
  { suj: "une entreprise", dem: "cette entreprise", P: "est bénéficiaire", Q: "a des recettes supérieures à ses coûts", nP: "n'est pas bénéficiaire", nQ: "n'a pas des recettes supérieures à ses coûts", recVrai: true },
  { P: "$n$ est pair", Q: "$n^{2}$ est pair", nP: "$n$ est impair", nQ: "$n^{2}$ est impair", recVrai: true },
  { P: "$x = 3$", Q: "$x^{2} = 9$", nP: "$x \\neq 3$", nQ: "$x^{2} \\neq 9$", recVrai: false },
  { P: "$x > 2$", Q: "$x > 1$", nP: "$x \\leq 2$", nQ: "$x \\leq 1$", recVrai: false },
  { P: "$a$ et $b$ sont positifs", Q: "$a + b$ est positif", nP: "$a$ et $b$ ne sont pas tous les deux positifs", nQ: "$a + b$ n'est pas positif", recVrai: false },
  { P: "$ABCD$ est un rectangle", Q: "les diagonales de $ABCD$ ont la même longueur", nP: "$ABCD$ n'est pas un rectangle", nQ: "les diagonales de $ABCD$ n'ont pas la même longueur", recVrai: false },
];
/** La proposition en tête de phrase, puis reprise. */
export const debutDe = (i: Impl, x: string) => (i.suj ? `${i.suj} ${x}` : x);
export const repriseDe = (i: Impl, x: string) => (i.dem ? `${i.dem} ${x}` : x);
export const siAlors = (i: Impl, a: string, b: string) => `Si ${debutDe(i, a)}, alors ${repriseDe(i, b)}.`.replace(/^Si il /, "S'il ");
export const SI = (a: string, b: string) => `Si ${a}, alors ${b}.`;
const P = () => un(IMPLICATIONS);
const DEF = "la contraposée de « si $P$, alors $Q$ » est « si non $Q$, alors non $P$ » ; elle a toujours la même valeur de vérité que l'implication.";
const SOIT = ["On considère l'implication :", "Voici une proposition :", "On lit la phrase :", "Soit la proposition :"];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function gabaritsContraposee(tpl: (m: string, n: number, d: number, h: string, g: () => any) => TutorBankItemV4, micro = "logique_contraposee"): TutorBankItemV4[] {
  const ch = (i: Impl) => ({ imp: siAlors(i, i.P, i.Q), contra: siAlors(i, i.nQ, i.nP), rec: siAlors(i, i.Q, i.P), neg: siAlors(i, i.nP, i.nQ), inv: siAlors(i, i.nQ, i.P) });
  return [
    tpl(micro, 1, 1, "Contraposée : on échange les deux parties ET on les nie toutes les deux.", () => {
      const i = P();
      const c = ch(i);
      return qcm(`${un(SOIT)} « ${c.imp} » ${un(["Quelle est sa contraposée ?", "Choisis sa contraposée.", "Laquelle de ces phrases est sa contraposée ?"])}`, c.contra, [c.rec, c.neg, c.inv], expl(DEF, "on échange les deux parties, puis on nie chacune.", `$P$ : « ${debutDe(i, i.P)} » ; $Q$ : « ${repriseDe(i, i.Q)} ».`, `la contraposée est : « ${c.contra} »`));
    }),
    tpl(micro, 2, 1, "Réciproque : on échange seulement. Contraposée : on échange et on nie.", () => {
      const i = P();
      const c = ch(i);
      const contra = un([true, false]);
      const juste = contra ? "sa contraposée" : "sa réciproque";
      return qcm(`${un(SOIT)} « ${c.imp} » ${un(["Comment appelle-t-on, par rapport à elle, la phrase suivante ?", "Que représente, pour elle, la phrase suivante ?", "Quel est le nom de la phrase suivante, par rapport à elle ?"])} « ${contra ? c.contra : c.rec} »`, juste, [contra ? "sa réciproque" : "sa contraposée", "sa négation", "un exemple"], expl(DEF, "réciproque : on échange. Contraposée : on échange et on nie.", `ici, ${contra ? "on a échangé et nié" : "on a seulement échangé"}.`, `c'est ${juste}.`));
    }),
    tpl(micro, 3, 2, "Une implication vraie a toujours une contraposée vraie.", () => {
      const i = P();
      const c = ch(i);
      return qcm(`${un(["On admet que cette proposition est vraie :", "Cette proposition est vraie :", "Prenons pour vraie la proposition :"])} « ${c.imp} » ${un(["Laquelle de ces phrases est alors forcément vraie ?", "Que peut-on en déduire à coup sûr ?", "Quelle phrase est vraie à coup sûr ?"])}`, c.contra, [c.rec, c.neg, c.inv], expl(DEF, "seule la contraposée garde toujours la même valeur de vérité.", `la réciproque (« ${c.rec} ») n'est pas garantie.`, `la phrase sûre est : « ${c.contra} »`));
    }),
    tpl(micro, 4, 2, "Traduis les deux parties, puis applique la contraposée.", () => {
      const i = P();
      const c = ch(i);
      return qcm(`${un(["On sait que :", "Règle admise :"])} « ${c.imp} » ${un(["On constate que", "On observe que", "Or, dans ce cas,"])} ${repriseDe(i, i.nQ)}. ${un(["Que peut-on conclure ?", "Quelle conclusion tirer ?"])}`, cap(`${repriseDe(i, i.nP)}.`), [cap(`${repriseDe(i, i.P)}.`), cap(`${repriseDe(i, i.Q)}.`), "On ne peut rien conclure."], expl(DEF, "on applique la contraposée à la situation observée.", `« ${c.contra} »`, `on conclut : ${repriseDe(i, i.nP)}.`));
    }),
    tpl(micro, 5, 3, "Pour prouver « si P, alors Q », on peut prouver « si non Q, alors non P ».", () => {
      const a = un<[string, string, string, string]>([
        ["$n^{2}$ est pair", "$n$ est pair", "$n$ est impair", "$n^{2}$ est impair"],
        ["$n^{2}$ est impair", "$n$ est impair", "$n$ est pair", "$n^{2}$ est pair"],
        ["$x^{2} \\neq 16$", "$x \\neq 4$", "$x = 4$", "$x^{2} = 16$"],
        ["$x^{2} \\neq 25$", "$x \\neq 5$", "$x = 5$", "$x^{2} = 25$"],
        ["$3n$ est impair", "$n$ est impair", "$n$ est pair", "$3n$ est pair"],
        ["$n + 1$ est pair", "$n$ est impair", "$n$ est pair", "$n + 1$ est impair"],
        ["$2x + 1 \\neq 7$", "$x \\neq 3$", "$x = 3$", "$2x + 1 = 7$"],
        ["$xy \\neq 0$", "$x \\neq 0$", "$x = 0$", "$xy = 0$"],
      ]);
      return qcm(`On veut démontrer : « ${SI(a[0], a[1])} » ${un(["La preuve directe est difficile. Quelle proposition équivalente démontrer ?", "On passe par la contraposée. Que faut-il démontrer ?", "Quelle proposition, plus simple, suffit-il de démontrer ?"])}`, SI(a[2], a[3]), [SI(a[1], a[0]), SI(a[3], a[2]), SI(a[0], a[2])], expl(DEF, "on nie les deux parties et on les échange.", `non $Q$ : « ${a[2]} » ; non $P$ : « ${a[3]} ».`, `il suffit de démontrer : « ${SI(a[2], a[3])} »`));
    }),
    tpl(micro, 6, 3, "Une réciproque peut être fausse même si l'implication est vraie. La contraposée, jamais.", () => {
      const i = P();
      const c = ch(i);
      const j = i.recVrai ? "La réciproque et la contraposée sont vraies." : "La contraposée est vraie, la réciproque est fausse.";
      return qcm(`${un(["Cette proposition est vraie :", "On admet que cette règle est vraie :"])} « ${c.imp} » ${un(["Que dire de sa réciproque et de sa contraposée ?", "Laquelle de ces affirmations est juste ?"])}`, j, [i.recVrai ? "La contraposée est vraie, la réciproque est fausse." : "La réciproque et la contraposée sont vraies.", "La contraposée est fausse, la réciproque est vraie.", "La réciproque et la contraposée sont fausses."], expl(DEF, "la contraposée garde la valeur de vérité ; la réciproque doit être étudiée à part.", `réciproque : « ${c.rec} » ; contraposée : « ${c.contra} ».`, j));
    }),
  ];
}
