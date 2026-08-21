"use client";

// LE SUJET SUR PAPIER — l'épreuve blanche telle qu'on la pose sur une table.
//
// POURQUOI CETTE PAGE EXISTE (Frédéric, 21/08/2026) : les quatre épreuves ne se
// passent qu'à l'écran, une question à la fois, chronométrées. C'est le jour J
// reproduit — et c'est précisément ce qui les rend inutilisables en classe, en
// salle d'étude, ou le dimanche après-midi sur la table de la cuisine. Un
// professeur qui veut faire passer l'épreuve à ses 28 élèves n'a pas 28
// ordinateurs ; un parent qui veut voir son enfant chercher n'a pas envie de lui
// tendre un écran.
//
// ⭐ ON REPREND LE GESTE DES CAHIERS DE VACANCES, à la lettre : une page de
// garde qu'on reconnaît, un bouton « Imprimer / PDF », le navigateur qui fait le
// PDF, et rien à télécharger de notre côté. Onze cahiers tournent comme ça
// depuis juillet, c'est le seul objet du site qui circule hors du site. Le sujet
// d'éval nationale rejoint la même famille — même couverture, même signature,
// même QR pour revenir.
//
// ⭐ CE FICHIER NE CONTIENT QUE LES QUESTIONS ET LA MÉCANIQUE. Tout ce qui se lit
// sur la feuille et qui n'est pas une question vit dans `EncartsSujet.tsx` :
// couverture, signature, mode d'emploi, pied de fin. C'est une demande explicite
// (Frédéric, même jour) et c'est la bonne : ces mots-là se retouchent entre deux
// impressions, les questions non.
//
// ⚠️ LE TIRAGE NE SE FAIT JAMAIS AU RENDU, seulement après le montage : le
// serveur et le navigateur ne tireraient pas le même sujet, et React refuse
// l'hydratation. Même règle que dans `EpreuveClient` — voir son
// `commencerPriseEnMain`.
//
// ⚠️ LE MENU DÉROULANT N'EXISTE PAS SUR PAPIER. Le moteur distribue trois habits
// (`cases`, `liste`, `tableau`) : à l'écran c'est un choix pédagogique — on
// rencontre les deux formes du sujet officiel pour ne pas les découvrir le jour
// J. Sur une feuille, une `liste` redevient forcément des cases à cocher. Le
// tableau série, lui, survit tel quel : c'est déjà un objet de papier.

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Download, Printer, RefreshCw } from "lucide-react";

import { CanvasRenderer } from "@/lib/canvas";
import { MarkdownMath } from "@/components/MarkdownMath";
import {
  tirerEpreuve,
  type ConfigEpreuve,
  type QuestionEval,
} from "@/lib/eval-nationale/moteur";

import { accentDe } from "./couleurs";
import {
  EncartAppartientA,
  EncartBadges,
  EncartMarque,
  EncartModeEmploi,
  EncartPhraseDeGarde,
  EncartPiedDeFin,
  EncartRetourEnLigne,
  EncartSignature,
  EncartSommaire,
  EncartTextesALire,
  EncartTitre,
  EnteteImprimee,
} from "./EncartsSujet";

/** A · B · C · D — l'étiquette d'une proposition sur le papier. */
const LETTRES = ["A", "B", "C", "D", "E", "F"];

/* LES TROIS FORMATS. « Différents formats » ne veut pas dire différents types de
   fichiers — le navigateur ne sait faire qu'un PDF, et c'est le bon. Ce sont
   trois documents différents, tirés du même sujet, et chacun a son usage réel :
   l'élève reçoit le sujet nu, le professeur garde le corrigé, et celui qui veut
   les deux (le parent, l'élève en autonomie) imprime tout d'un coup. */
type Format = "sujet" | "sujet-corrige" | "corrige";

const FORMATS: { id: Format; label: string; quoi: string }[] = [
  {
    id: "sujet",
    label: "Le sujet seul",
    quoi: "Ce qu'on pose devant l'élève : les questions et les cases à cocher.",
  },
  {
    id: "sujet-corrige",
    label: "Le sujet et son corrigé",
    quoi: "Le sujet, puis les réponses à la fin — pour travailler seul ou en famille.",
  },
  {
    id: "corrige",
    label: "Le corrigé seul",
    quoi: "La feuille du professeur : les réponses, compétence par compétence.",
  },
];

/**
 * ⛔ MARKDOWN MANGE LE SIGNE « PLUS GRAND QUE », et ça rend un sujet insoluble.
 *
 * Mesuré au rendu le 21/08, question 38 du tirage : « À La Réunion, deux
 * compteurs indiquent 63 594 et 62 694. Complète : 63 594 … 62 694 »,
 * propositions `>`, `<`, `=`. Un `>` seul en tête de ligne EST la syntaxe d'une
 * citation Markdown : `remark` le mangeait et rendait une citation vide. La
 * case A sortait BLANCHE sur la feuille — trois propositions dont une invisible,
 * et l'élève ne pouvait pas répondre juste.
 *
 * On échappe donc les caractères qui ouvrent un bloc quand ils sont en tête. Le
 * `\` disparaît au rendu, le caractère reste.
 *
 * ⚠️ LE MÊME DÉFAUT EXISTE SUR L'ÉPREUVE À L'ÉCRAN (`EpreuveClient` passe ses
 * propositions au même `MarkdownMath`, sans protection). Il n'est pas corrigé
 * ici : ce fichier ne doit pas changer le comportement de l'épreuve chronométrée
 * en passant. À traiter à part, dans `MarkdownMath` ou dans le moteur.
 */
function protegerMarkdown(texte: string): string {
  const s = texte.trim();
  if (/^[>#\-+*]/.test(s)) return `\\${s}`;
  // « 1. » en tête ouvre une liste numérotée : on échappe le point, pas le
  // chiffre — sinon « \1. » s'afficherait tel quel.
  if (/^\d+\./.test(s)) return s.replace(".", "\\.");
  return texte;
}

/** Une case à cocher vide, dessinée — elle doit survivre à une photocopie. */
function Case({ lettre }: { lettre?: string }) {
  return (
    <span className="inline-flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[3px] border-2 border-slate-400 text-[9px] font-black text-slate-400">
      {lettre ?? ""}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Le sujet                                                                  */
/* -------------------------------------------------------------------------- */

export default function SujetImprimable({ config }: { config: ConfigEpreuve }) {
  const accent = accentDe(config.slug);
  const [questions, setQuestions] = useState<QuestionEval[] | null>(null);
  const [format, setFormat] = useState<Format>("sujet-corrige");
  /* Incrémenté par « Tirer un autre sujet » : un professeur qui fait passer
     l'épreuve deux fois dans l'année, ou qui veut deux rangs différents dans la
     même salle, ne doit pas avoir à recharger la page. */
  const [tirage, setTirage] = useState(0);

  useEffect(() => {
    // Après le montage, jamais au rendu — sinon serveur et navigateur ne tirent
    // pas le même sujet (erreur d'hydratation).
    setQuestions(tirerEpreuve(config).questions);
  }, [config, tirage]);

  const montreSujet = format !== "corrige";
  const montreCorrige = format !== "sujet";
  const minutes = Math.round(config.dureeSecondes / 60);

  /* LES ENREGISTREMENTS, NUMÉROTÉS UNE FOIS POUR TOUTE LA FEUILLE.
     Le sujet de l'élève dit « Enregistrement 2 », la feuille de l'adulte porte
     le texte n° 2 : c'est le seul lien entre les deux documents, puisque le
     titre du texte trahirait déjà son contenu. On les numérote dans l'ordre où
     ils tombent, et on déduplique sur le titre — un même enregistrement porte
     plusieurs questions d'affilée. */
  const supportsOraux = (questions ?? [])
    .filter((q) => q.support?.oral)
    .reduce<
      { numero: number; titre: string; source: string; texte: string; ecoutes: number }[]
    >((acc, q) => {
      const s = q.support!;
      if (acc.some((x) => x.titre === s.titre)) return acc;
      acc.push({
        numero: acc.length + 1,
        titre: s.titre,
        source: s.source,
        texte: s.texte,
        ecoutes: s.oral!.ecoutes,
      });
      return acc;
    }, []);
  const numeroOral = new Map(supportsOraux.map((s) => [s.titre, s.numero]));

  /* Le sommaire de la couverture : un domaine, son nombre de questions — lu sur
     les questions tirées et non sur la config. Voir `EncartSommaire`. */
  const sommaire = config.themes.map((t) => ({
    id: t.id,
    label: t.label,
    quoi: t.quoi,
    n: questions?.filter((q) => q.themeId === t.id).length ?? t.nbQuestions,
  }));

  return (
    <main className="relative isolate min-h-screen bg-[#f8f6ff] text-slate-800">
      {/* ===================== BARRE D'ACTIONS (écran) ===================== */}
      <div className="screen-only border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/evaluation-nationale-college/${config.slug}`}
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              L&apos;épreuve à l&apos;écran
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setTirage((t) => t + 1)}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-black text-slate-600 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
              >
                <RefreshCw className="h-4 w-4" />
                Tirer un autre sujet
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-white shadow-sm transition hover:brightness-110"
                style={{ backgroundColor: accent }}
              >
                <Download className="h-4 w-4" />
                Imprimer / PDF
              </button>
            </div>
          </div>

          {/* LE CHOIX DU FORMAT, au-dessus du bouton et non caché dans un menu :
              c'est la décision qui change le document, elle doit se voir avant
              de cliquer sur « Imprimer ». */}
          <fieldset className="rounded-2xl border border-slate-200 bg-white p-4">
            <legend className="px-1 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
              Ce qu&apos;on imprime
            </legend>
            <div className="mt-1 grid gap-2 sm:grid-cols-3">
              {FORMATS.map((f) => (
                <label
                  key={f.id}
                  className={[
                    "cursor-pointer rounded-xl border-2 p-3 transition",
                    format === f.id
                      ? "bg-slate-50"
                      : "border-slate-200 hover:border-slate-300",
                  ].join(" ")}
                  style={format === f.id ? { borderColor: accent } : undefined}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="format-sujet"
                      className="h-4 w-4"
                      checked={format === f.id}
                      onChange={() => setFormat(f.id)}
                    />
                    <span className="text-sm font-black text-slate-900">
                      {f.label}
                    </span>
                  </span>
                  <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">
                    {f.quoi}
                  </span>
                </label>
              ))}
            </div>
            {/* ⚠️ LA MISE EN GARDE NE PEUT PAS VIVRE DANS LE LIBELLÉ DU FORMAT :
                les quatre épreuves partagent cette liste, et seules celles de
                français ont des enregistrements. Elle n'apparaît donc que
                lorsqu'il y en a — sinon on avertirait d'un piège inexistant. */}
            {supportsOraux.length > 0 && (
              <p className="mt-2 rounded-xl border-l-4 border-amber-400 bg-amber-50 py-2 pl-3 pr-3 text-xs font-medium leading-5 text-amber-900">
                🎧 Cette épreuve demande quelqu&apos;un à côté —{" "}
                <b>toi, parent ou professeur</b>. Elle contient{" "}
                {supportsOraux.length} texte
                {supportsOraux.length > 1 ? "s" : ""} à lire à voix haute, sur
                une page à part qui est jointe aux trois formats.{" "}
                <b>Détache-la avant de donner le sujet à l&apos;élève</b> —
                s&apos;il lit le texte au lieu de l&apos;écouter, ces questions
                ne mesurent plus rien.
              </p>
            )}
          </fieldset>
        </div>
      </div>

      {/* Tant que le tirage n'a pas eu lieu : on annonce, on ne fait pas
          semblant d'avoir une feuille. */}
      {!questions && (
        <p className="screen-only mx-auto max-w-4xl px-5 py-16 text-center text-sm font-black uppercase tracking-[0.16em] text-slate-400">
          Tirage du sujet…
        </p>
      )}

      {questions && (
        <article className="mx-auto max-w-4xl px-5 py-8 sm:px-8 print:max-w-none print:px-0 print:py-0">
          {/* ======================= PAGE DE GARDE =======================
              Elle ressemble à celle des cahiers de vacances parce que c'est la
              même famille d'objets : quelque chose qu'on imprime et qui traîne
              ensuite sur une table. Chaque bloc vient de `EncartsSujet.tsx`. */}
          <section className="sujet-page overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 print:rounded-none print:border-0 print:shadow-none">
            <EnteteImprimee slug={config.slug} />
            <EncartMarque />
            <EncartTitre
              niveau={config.classe === "6e" ? "6ᵉ" : "4ᵉ"}
              matiere={config.matiereLabel}
              accent={accent}
              nbQuestions={questions.length}
              minutes={minutes}
              labelSource={config.labelSource}
            />
            <div className="text-center">
              <EncartBadges nbQuestions={questions.length} minutes={minutes} />
              <EncartSignature />
            </div>
            <EncartSommaire accent={accent} domaines={sommaire} />
            <EncartAppartientA slug={config.slug} />
            <EncartModeEmploi minutes={minutes} />
            <EncartPhraseDeGarde />
          </section>

          {/* ========================= LE SUJET ========================= */}
          {montreSujet && (
            <section className="sujet-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:mt-0 print:rounded-none print:border-0 print:p-0 print:shadow-none">
              <EnteteImprimee slug={config.slug} />
              <h2 className="mt-3 border-b-2 border-slate-200 pb-2 text-2xl font-black tracking-tight text-slate-900">
                Le sujet
              </h2>

              <ol className="mt-4">
                {questions.map((q, i) => {
                  const nouveauDomaine =
                    i === 0 || questions[i - 1].themeId !== q.themeId;
                  /* Un support couvre plusieurs questions d'affilée : on
                     l'imprime UNE fois, au-dessus de la première, et les
                     suivantes y renvoient. Le sujet officiel fait pareil — le
                     texte reste sous les yeux, on ne teste pas la mémoire. */
                  const nouveauSupport =
                    q.support &&
                    (i === 0 ||
                      questions[i - 1].support?.titre !== q.support.titre);

                  return (
                    <li key={q.cle} className="list-none">
                      {nouveauDomaine && (
                        <h3
                          className="domaine-titre mt-6 rounded-lg px-3 py-1.5 text-[12px] font-black uppercase tracking-[0.16em] text-white first:mt-0"
                          style={{ backgroundColor: accent }}
                        >
                          {q.themeLabel}
                        </h3>
                      )}

                      {/* ⛔ LE SUPPORT ORAL N'IMPRIME PAS SON TEXTE ICI.
                          Corrigé le 21/08, en montant le français : la première
                          version rendait le texte à l'élève avec la mention
                          « tu n'as pas ce texte sous les yeux » — écrite juste
                          au-dessus du texte. Absurde, et pire qu'absurde : huit
                          questions sur soixante seraient devenues un exercice
                          de lecture. Le texte part sur la feuille de l'adulte
                          (`EncartTextesALire`, avec le corrigé) ; ici, on
                          n'annonce que l'enregistrement et son numéro. */}
                      {nouveauSupport && q.support && q.support.oral && (
                        <div
                          className="question-bloc mt-4 rounded-xl border-2 border-dashed p-3"
                          style={{ borderColor: accent }}
                        >
                          <p
                            className="text-[10px] font-black uppercase tracking-[0.16em]"
                            style={{ color: accent }}
                          >
                            {q.support.kicker}
                          </p>
                          <p className="mt-1 font-serif text-base font-black leading-tight">
                            🎧 Enregistrement {numeroOral.get(q.support.titre)}
                          </p>
                          <p className="mt-1 text-[13px] font-medium leading-5 text-slate-600">
                            Un adulte va te lire un texte{" "}
                            <b>
                              {q.support.oral.ecoutes} fois
                            </b>
                            . Écoute sans rien écrire, puis réponds aux questions
                            qui suivent. Tu n&apos;as pas le texte&nbsp;: c&apos;est
                            exactement ce qu&apos;on te demande le jour J.
                          </p>
                          <p className="mt-1 text-[11px] font-bold italic text-slate-400">
                            (Le texte est sur la feuille de l&apos;adulte qui te
                            le lira.)
                          </p>
                        </div>
                      )}

                      {nouveauSupport && q.support && !q.support.oral && (
                        <figure
                          className="question-bloc mt-4 rounded-xl border-2 p-3"
                          style={{ borderColor: accent }}
                        >
                          <figcaption
                            className="text-[10px] font-black uppercase tracking-[0.16em]"
                            style={{ color: accent }}
                          >
                            {q.support.kicker}
                          </figcaption>
                          <p className="mt-1 font-serif text-base font-black leading-tight">
                            {q.support.titre}
                          </p>
                          {/* Le texte support S'IMPRIME EN ENTIER, sans hauteur
                              bornée : à l'écran il défile dans un cadre, sur
                              papier il doit être lisible d'un bout à l'autre —
                              dix questions en dépendent. */}
                          <div className="mt-2 whitespace-pre-line font-serif text-[14px] leading-6">
                            {q.support.texte}
                          </div>
                          <p className="mt-2 border-t border-slate-200 pt-1.5 text-[11px] font-medium italic text-slate-500">
                            {q.support.source}
                          </p>
                        </figure>
                      )}

                      <div className="question-bloc mt-4 border-t border-slate-200 pt-3 first:border-0">
                        <div className="flex items-start gap-2.5">
                          <span
                            className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-black text-white"
                            style={{ backgroundColor: accent }}
                          >
                            {i + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <MarkdownMath className="whitespace-pre-line text-[15px] font-black leading-6 text-slate-900">
                              {q.text}
                            </MarkdownMath>

                            {q.support && !nouveauSupport && (
                              <p className="mt-1 text-[11px] font-bold italic text-slate-400">
                                (même{" "}
                                {q.support.oral ? "enregistrement" : "texte"} que
                                la question précédente)
                              </p>
                            )}

                            {q.canvas && (
                              <div className="mt-2 max-w-md rounded-lg border border-slate-200 p-2">
                                <CanvasRenderer figure={q.canvas} />
                              </div>
                            )}

                            {q.format === "tableau" ? (
                              <div className="mt-2 overflow-hidden rounded-lg border-2 border-slate-300">
                                <p className="bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-600">
                                  Vrai ou faux à chaque ligne — il faut les
                                  quatre justes
                                </p>
                                {q.choices.map((c, rang) => (
                                  <div
                                    key={c}
                                    className={[
                                      "flex items-center gap-3 px-2.5 py-1.5",
                                      rang > 0 ? "border-t border-slate-200" : "",
                                    ].join(" ")}
                                  >
                                    <span className="min-w-0 flex-1 text-[13px] font-bold leading-5">
                                      <MarkdownMath inline>{protegerMarkdown(c)}</MarkdownMath>
                                    </span>
                                    <span className="flex shrink-0 items-center gap-2">
                                      <Case lettre="V" />
                                      <Case lettre="F" />
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              /* `cases` ET `liste` se rendent pareil : un menu
                                 déroulant n'existe pas sur une feuille. */
                              <ul className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-2">
                                {q.choices.map((c, rang) => (
                                  <li
                                    key={c}
                                    className="flex items-start gap-2 text-[13px] font-bold leading-5"
                                  >
                                    <span className="mt-0.5">
                                      <Case lettre={LETTRES[rang]} />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <MarkdownMath inline>{protegerMarkdown(c)}</MarkdownMath>
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          {/* ======================== LE CORRIGÉ ========================
              TOUJOURS À LA FIN, et sur une page neuve (Frédéric, 21/08) : il ne
              doit jamais tomber sous les yeux de l'élève qui cherche encore.
              Quand on imprime « le sujet et son corrigé », la dernière feuille
              se détache ; quand on imprime « le corrigé seul », c'est la seule
              qui sorte. */}
          {/* LA FEUILLE DU LECTEUR, DANS LES TROIS FORMATS — y compris « le
              sujet seul » (Frédéric, 21/08). Sans elle, le parent qui imprime
              le sujet ne peut pas poser les questions d'écoute : elle fait
              partie du matériel de passation, au même titre que les questions.
              Ce qui protège l'élève n'est pas son absence, c'est qu'elle
              commence sur une page neuve et qu'elle s'annonce comme n'étant pas
              pour lui — voir `EncartTextesALire`.
              Elle ne s'affiche que s'il y a des enregistrements : les deux
              épreuves de maths n'en ont aucun et n'en verront jamais la trace. */}
          <EncartTextesALire accent={accent} supports={supportsOraux} />

          {montreCorrige && (
            <section className="sujet-page mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8 print:mt-0 print:rounded-none print:border-0 print:p-0 print:shadow-none">
              <EnteteImprimee slug={config.slug} />
              <h2 className="mt-3 border-b-2 border-slate-200 pb-2 text-2xl font-black tracking-tight text-slate-900">
                ✅ Le corrigé
              </h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                Chaque ligne porte la compétence travaillée&nbsp;: c&apos;est elle
                qu&apos;on retravaille quand la question a coincé, pas la question
                elle-même.
              </p>

              <ol className="mt-4">
                {questions.map((q, i) => {
                  const nouveauDomaine =
                    i === 0 || questions[i - 1].themeId !== q.themeId;
                  return (
                    <li key={q.cle} className="list-none">
                      {nouveauDomaine && (
                        <h3
                          className="domaine-titre mt-5 rounded-lg px-3 py-1.5 text-[12px] font-black uppercase tracking-[0.16em] text-white first:mt-0"
                          style={{ backgroundColor: accent }}
                        >
                          {q.themeLabel}
                        </h3>
                      )}
                      <div className="question-bloc flex items-start gap-2.5 border-t border-slate-200 py-1.5 first:border-0">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-black text-white">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          {/* ⚠️ DES <div> ET NON DES <p> : `MarkdownMath` peut
                              rendre un bloc (liste, citation) si une réponse ou
                              une explication de banque en contient un, et un
                              bloc dans un <p> est du HTML invalide — React
                              refuse alors d'hydrater la page entière. */}
                          <div className="text-[13px] font-black leading-5 text-emerald-700">
                            {q.format === "tableau" ? (
                              <>
                                Vrai&nbsp;:{" "}
                                <MarkdownMath inline>{protegerMarkdown(q.expected[0])}</MarkdownMath>{" "}
                                <span className="font-bold text-slate-500">
                                  — les autres lignes sont fausses.
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-slate-400">
                                  {LETTRES[q.choices.indexOf(q.expected[0])] ??
                                    "•"}{" "}
                                  ·{" "}
                                </span>
                                <MarkdownMath inline>{protegerMarkdown(q.expected[0])}</MarkdownMath>
                              </>
                            )}
                          </div>
                          {q.explanation && (
                            <div className="mt-0.5 text-[12px] font-medium leading-5 text-slate-600">
                              <MarkdownMath inline>
                                {q.explanation}
                              </MarkdownMath>
                            </div>
                          )}
                          <p className="mt-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                            {q.notionLabel} · {q.microLabel}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <EncartRetourEnLigne />
              <EncartPiedDeFin slug={config.slug} />
            </section>
          )}
        </article>
      )}

      {/* Bouton imprimer flottant (écran) — même geste que sur les cahiers. */}
      <div className="screen-only fixed bottom-5 right-5 hidden sm:block">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-xl shadow-slate-300/50 transition hover:bg-slate-100"
        >
          <Printer className="h-4 w-4" />
          Imprimer / PDF
        </button>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            /* haut · droite · bas · gauche — marge gauche élargie pour la
               reliure (perforation / agrafage), comme sur les cahiers. */
            margin: 8mm 8mm 10mm 16mm;
          }

          html,
          body {
            background: white !important;
            color: #0f172a !important;
          }

          body > header,
          body > footer,
          .screen-only,
          .remerciements-bar {
            display: none !important;
          }

          main {
            min-height: auto !important;
            background: white !important;
          }

          /* La garde, le sujet et le corrigé commencent chacun sur une page
             neuve. Le sujet, lui, coule sur autant de pages qu'il en faut :
             62 questions ne tiennent pas sur une A4, et prétendre le contraire
             produirait des feuilles à moitié vides. */
          .sujet-page {
            break-after: page;
            page-break-after: always;
          }
          .sujet-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }

          /* ⛔ UNE QUESTION NE SE COUPE JAMAIS EN DEUX : son énoncé en bas d'une
             page et ses propositions en haut de la suivante, c'est une question
             ratée pour rien. */
          .question-bloc {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          /* Un titre de domaine seul en bas de page ne veut rien dire. */
          .domaine-titre {
            break-after: avoid;
            page-break-after: avoid;
          }

          /* Les pastilles de couleur et les fonds d'accent doivent sortir de
             l'imprimante : ce sont eux qui rangent les questions par domaine. */
          .sujet-page [style*="background"],
          .domaine-titre {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </main>
  );
}
