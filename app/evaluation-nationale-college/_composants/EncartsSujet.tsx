// LES ENCARTS DU SUJET PAPIER — tout ce qui entoure les questions.
//
// POURQUOI UN FICHIER À PART (Frédéric, 21/08/2026 : « prévoir des composants
// partagés pour les encarts du début de page et fin de cahier pour pouvoir les
// modifier facilement si besoin ») : les questions viennent des banques et se
// tirent toutes seules ; ces encarts-là, non. Ce sont des mots écrits à la main
// — la signature, le mode d'emploi, ce qu'on dit au lecteur en refermant la
// feuille — et ce sont exactement ceux qu'on retouche le plus souvent, parfois
// entre deux impressions.
//
// ⭐ LA RÈGLE : rien de ce qui se lit sur la feuille et qui n'est pas une
// question ne vit dans `SujetImprimable`. Un mot à changer se change ICI, une
// fois, et les quatre sujets — 6ᵉ maths, 6ᵉ français, 4ᵉ maths, 4ᵉ français —
// le portent le lendemain. C'est la leçon des cahiers de vacances : la
// signature de la couverture a été reprise onze fois parce qu'elle était
// recopiée onze fois.
//
// ⚠️ AUCUN ENCART NE CONNAÎT L'ÉPREUVE. Ils reçoivent ce dont ils ont besoin
// (l'accent, le slug, la durée) et rien de plus : c'est ce qui leur permet de
// servir aussi, demain, à un autre document imprimable.
//
// ⚠️ CE FICHIER N'EST PAS « use client ». Aucun de ces encarts n'a d'état ni de
// gestionnaire d'événement — ils s'affichent, on les imprime. Ils sont importés
// par un composant client, donc ils seront rendus côté client ; ne rien
// déclarer ici les laisse utilisables tels quels depuis un composant serveur le
// jour où l'on en aura besoin ailleurs.

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

/* Où va le lecteur quand il quitte le papier — l'accueil, jamais un formulaire.
   Même arbitrage que sur les cahiers (voir `lienAccueil` dans
   components/cahier/CahierVacances.tsx) : le QR imprimé ne doit dépendre de
   rien, donc /accueil en direct et TOUJOURS le www — eleveai.fr répond 308 vers
   www.eleveai.fr, et une fois la feuille sortie de l'imprimante l'adresse ne se
   corrige plus. */
/* ⚠️ « DE » + « LE CM2 » DONNE « DE LE CM2 » (vu au rendu le 21/08).
   `labelSource` porte déjà son article — « le CM2 » en 6ᵉ, « la 5ᵉ » en 4ᵉ —
   parce qu'il sert ailleurs dans des phrases qui en ont besoin. On contracte
   donc ici comme le français le fait : « du CM2 », « de la 5ᵉ ». */
const deLaSource = (label: string) => `de ${label}`.replace(/^de le /, "du ");

export const lienAccueilQR = (slug: string) =>
  `https://www.eleveai.fr/accueil?from=eval-nationale&utm_source=sujet-papier&utm_medium=qr-couverture&utm_content=${slug}`;

/* ══════════════════════════════════════════════════════════════════════════ */
/*  DÉBUT DE PAGE                                                            */
/* ══════════════════════════════════════════════════════════════════════════ */

/**
 * Le bandeau de tête, répété en haut de chaque grande section imprimée.
 *
 * Il porte l'adresse de la page : une feuille photocopiée trois fois, passée de
 * main en main, doit encore dire d'où elle vient.
 */
export function EnteteImprimee({ slug }: { slug: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-slate-400">
      <span className="flex items-center gap-1.5">
        <span className="text-sm font-black text-teal-600">eleveai.fr</span>
        <span className="text-slate-300">—</span>
        Plusieurs portes pour apprendre
      </span>
      <span className="hidden font-bold text-teal-600 sm:inline">
        eleveai.fr/evaluation-nationale-college/{slug}
      </span>
    </div>
  );
}

/** La marque, centrée, juste sous le bandeau — comme sur les cahiers. */
export function EncartMarque() {
  return (
    <div className="mt-4 text-center tracking-tight">
      <span className="text-2xl font-black text-teal-600 sm:text-3xl">
        eleveai.fr
      </span>
      <span className="ml-2 text-sm font-bold italic text-slate-500">
        · La liberté d&apos;apprendre
      </span>
    </div>
  );
}

/**
 * Le titre de la couverture : ce que c'est, pour qui, en combien de temps.
 * Ti Margo l'accompagne — c'est la figure des cahiers et des vidéos, et elle
 * fait ici le même travail que sur le hub : dire « ne t'inquiète pas » sans
 * l'écrire.
 */
export function EncartTitre({
  niveau,
  matiere,
  accent,
  nbQuestions,
  minutes,
  labelSource,
}: {
  niveau: string;
  matiere: string;
  accent: string;
  nbQuestions: number;
  minutes: number;
  labelSource: string;
}) {
  return (
    <div className="mt-8 text-center">
      <p className="text-xl font-black uppercase tracking-[0.2em] text-slate-700 sm:text-2xl">
        Évaluation nationale
      </p>
      {/* ⚠️ `flex-wrap` ET UN TITRE PLUS PETIT SUR TÉLÉPHONE (mesuré le 21/08 en
          375 px) : « 6ᵉ · Mathématiques » en `text-5xl` ne se coupe pas, la
          ligne poussait Ti Margo 53 px hors du cadre, et la couverture a
          `overflow-hidden` — le margouillat sortait donc tranché en deux. À
          l'impression, la largeur est celle d'une A4 : le titre reprend sa
          taille (`print:text-4xl`) et rien ne passe à la ligne. */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl print:text-4xl">
          {niveau} · <span style={{ color: accent }}>{matiere}</span>
        </h1>
        <Image
          src="/cahier-vacances/ti-margo.png"
          alt="Ti Margo, le margouillat d'EleveAI, avec son crayon"
          width={1122}
          height={1402}
          sizes="96px"
          className="h-16 w-auto shrink-0 sm:h-24 print:h-24"
        />
      </div>
      <p className="mt-3 text-base font-bold text-slate-500">
        L&apos;épreuve blanche, sur papier — {nbQuestions} questions en {minutes}{" "}
        minutes, sur le programme {deLaSource(labelSource)}.
      </p>
    </div>
  );
}

/** Les trois pastilles de la couverture : ce qui rassure en un coup d'œil. */
export function EncartBadges({
  nbQuestions,
  minutes,
}: {
  nbQuestions: number;
  minutes: number;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
        ✅ Aux effectifs du sujet officiel
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black text-slate-600">
        ⏱️ {minutes} min · {nbQuestions} questions
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-black text-rose-700">
        🌺 100&nbsp;% Réunion
      </span>
    </div>
  );
}

/**
 * LA SIGNATURE, mot pour mot celle des cahiers de vacances et de l'accueil.
 *
 * ⚠️ NE PAS LA REFORMULER ICI SANS LA REFORMULER AILLEURS. C'est en la répétant
 * à l'identique qu'un nom finit par valoir quelque chose — et une feuille
 * d'épreuve circule autant qu'un cahier de vacances : elle passe d'un collègue à
 * l'autre, elle traîne sur un bureau de salle des profs.
 * ⚠️ « Enseignant » et non « professeur » : Frédéric est contractuel, et c'est
 * le mot des mentions légales.
 * ⚠️ « — et pour toi » n'est pas de la politesse : sans cette moitié, la phrase
 * se referme sur « SES élèves », ceux d'un enseignant de La Réunion, et 86 % des
 * visiteurs sont ailleurs. Le site tutoie tout le monde, ici comme sur l'accueil.
 */
export function EncartSignature() {
  return (
    <>
      <p className="mt-4 text-sm font-bold italic text-slate-500">
        Conçu par Frédéric Lacoste, enseignant à La Réunion, pour ses élèves — et
        pour toi.
      </p>
      <p className="mt-1 text-base font-black text-teal-600">
        « Nou la fé&nbsp;! » 🌺
      </p>
    </>
  );
}

/**
 * Le sommaire des domaines : ce qu'on va demander, et en combien de questions.
 *
 * Les effectifs viennent des questions RÉELLEMENT tirées, pas de la config : si
 * le tirage n'a pas pu honorer un effectif, la couverture doit annoncer ce qui
 * est vraiment sur la feuille.
 */
export function EncartSommaire({
  accent,
  domaines,
}: {
  accent: string;
  domaines: { id: string; label: string; quoi: string; n: number }[];
}) {
  return (
    <div
      className="mt-7 rounded-2xl border p-4"
      style={{ borderColor: `${accent}55`, backgroundColor: `${accent}0d` }}
    >
      <p
        className="text-center text-[11px] font-black uppercase tracking-[0.16em]"
        style={{ color: accent }}
      >
        Ce qu&apos;on te demandera
      </p>
      <ul className="mt-3 space-y-1.5">
        {domaines.map((t) => (
          <li
            key={t.id}
            className="flex items-baseline gap-2 text-sm font-bold text-slate-700"
          >
            <span
              aria-hidden
              className="relative top-[-2px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="flex-1">
              {t.label}
              <span className="font-medium text-slate-500"> — {t.quoi}</span>
            </span>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black text-white"
              style={{ backgroundColor: accent }}
            >
              {t.n} q.
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * « Ce sujet appartient à » + le QR.
 *
 * Sur le PAPIER, ce QR est le seul lien qui existe : les boutons de l'écran ne
 * s'impriment pas. Il mène à l'entrée du site, pas à un formulaire — aucun mur,
 * l'impression est libre, et c'est ce qui fait revenir.
 */
export function EncartAppartientA({ slug }: { slug: string }) {
  return (
    <div className="mx-auto mt-7 flex max-w-lg items-center gap-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-4">
      <div className="flex-1">
        <p className="text-sm font-black uppercase tracking-wide text-slate-500">
          Ce sujet appartient à
        </p>
        <div className="mt-5 border-b-2 border-dotted border-slate-300" />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <p className="max-w-[84px] text-right text-[10px] font-black leading-tight text-slate-600">
          Scanne pour continuer <span className="text-teal-600">gratuitement</span>
        </p>
        <div className="inline-block rounded-lg border border-slate-200 bg-white p-1">
          <QRCodeSVG value={lienAccueilQR(slug)} size={52} level="M" marginSize={1} />
        </div>
      </div>
    </div>
  );
}

/**
 * Le mode d'emploi — les cinq règles de passation.
 *
 * ⚠️ « Aucune note, rien sur le bulletin » N'EST PAS UN DÉTAIL rassurant qu'on
 * pourrait couper pour gagner une ligne : c'est le message principal de toute la
 * rubrique, celui que l'élève qui panique doit lire avant de commencer.
 */
export function EncartModeEmploi({ minutes }: { minutes: number }) {
  return (
    <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h2 className="text-base font-black text-slate-900">📋 Mode d&apos;emploi</h2>
      <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">
        <li>
          • <b>{minutes} minutes</b>, montre posée sur la table. Le jour J,
          c&apos;est la durée exacte.
        </li>
        <li>
          • Une seule case cochée par question — sauf les tableaux, où il faut
          cocher <b>chaque ligne</b>.
        </li>
        <li>• On ne revient pas en arrière&nbsp;: si tu bloques, tu passes.</li>
        <li>
          • <b>Aucune note</b>, rien sur le bulletin. Ça sert à voir où tu en es.
        </li>
        <li>
          • Les corrigés sont à la fin — et le même sujet se refait à
          l&apos;écran, corrigé tout seul, sur eleveai.fr.
        </li>
      </ul>
    </div>
  );
}

/** La phrase qui clôt la couverture, juste avant la première question. */
export function EncartPhraseDeGarde() {
  return (
    <p className="mt-7 text-center text-lg font-black italic text-teal-600">
      Prends ton temps de lire&nbsp;: la moitié des points est dans
      l&apos;énoncé.
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  FIN DE CAHIER                                                            */
/* ══════════════════════════════════════════════════════════════════════════ */

/**
 * Ce qu'on dit au moment où l'élève repose son crayon.
 *
 * ⭐ C'EST LE SEUL POINT DE FUITE DU DOCUMENT avec le QR de la couverture, et il
 * arrive au bon moment : celui qui vient de corriger sa feuille sait exactement
 * ce qui lui a manqué. On ne vend rien, on ne demande pas d'inscription — on dit
 * que la même chose existe à l'écran et qu'elle se corrige toute seule.
 */
export function EncartRetourEnLigne() {
  return (
    <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs font-medium italic leading-5 text-slate-500">
      Le même sujet se repasse à l&apos;écran sur eleveai.fr, chronométré et
      corrigé tout seul&nbsp;: à la fin, un groupe de maîtrise par domaine, dans
      les mots du bilan officiel. Gratuit, sans publicité.
    </p>
  );
}

/**
 * Le pied de la dernière page imprimée : l'adresse en clair et un second QR.
 *
 * Le QR de la couverture part souvent avec elle — un professeur qui photocopie
 * ne photocopie pas toujours la garde. Celui-ci reste avec le corrigé, donc avec
 * la feuille qu'on garde.
 */
export function EncartPiedDeFin({ slug }: { slug: string }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-4 border-t-2 border-slate-200 pt-4">
      <div className="min-w-0">
        <p className="text-sm font-black text-slate-900">
          Continuer gratuitement sur{" "}
          <span className="text-teal-600">eleveai.fr</span>
        </p>
        <p className="mt-0.5 text-xs font-medium leading-5 text-slate-500">
          Les quatre épreuves blanches, les guides de survie et les cahiers de
          vacances — sans inscription, sans publicité.
        </p>
      </div>
      <div className="inline-block shrink-0 rounded-lg border border-slate-200 bg-white p-1">
        <QRCodeSVG value={lienAccueilQR(slug)} size={52} level="M" marginSize={1} />
      </div>
    </div>
  );
}
