"use client";

// Accessibilité — lecture à voix haute (synthèse vocale du navigateur).
// Pensé en priorité pour les élèves déficients visuels : gratuit, instantané,
// sans appel serveur. Voir aussi le mode « lecture auto » côté TutorV4Client.
//
// Multilingue : les coachs de langue (anglais = matière `english-maths`,
// espagnol = `espagnol`) lisent leur contenu avec une VRAIE voix cible — sinon
// le texte anglais/espagnol était massacré par une voix française. Le reste
// (maths, français, IA, éco) reste en français. Repli gracieux sur le français
// si aucune voix cible n'est installée sur l'appareil.

import { useEffect, useState } from "react";
import type { TutorQuestionOption } from "@/lib/tutor-v4/types";
import type { Matiere } from "@/lib/tutor-v4/catalog";

export type SpeechLang = "fr" | "en" | "es";

// Préférences de voix par langue, de la plus précise à la plus large.
const VOICE_PREFS: Record<SpeechLang, string[]> = {
  fr: ["fr-fr", "fr"],
  en: ["en-gb", "en-us", "en"],
  es: ["es-es", "es-mx", "es"],
};

// Code BCP-47 par défaut (hint moteur quand on n'a pas de voix précise).
const BCP47: Record<SpeechLang, string> = {
  fr: "fr-FR",
  en: "en-GB",
  es: "es-ES",
};

// Béquilles de lecture d'un QCM, dans la langue lue (cohérence sonore).
const SCAFFOLD: Record<SpeechLang, { answer: string; intro: string }> = {
  fr: { answer: "Réponse", intro: "Voici les réponses possibles." },
  en: { answer: "Answer", intro: "Here are the possible answers." },
  es: { answer: "Respuesta", intro: "Estas son las respuestas posibles." },
};

/** Langue de lecture à partir de la matière du coach. */
export function speechLangForMatiere(matiere?: Matiere): SpeechLang {
  if (matiere === "english-maths") return "en";
  if (matiere === "espagnol") return "es";
  return "fr";
}

let cachedVoices: SpeechSynthesisVoice[] = [];

function speechAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function refreshVoices() {
  if (!speechAvailable()) return;
  const v = window.speechSynthesis.getVoices();
  if (v.length) cachedVoices = v;
}

/**
 * Choisit la meilleure voix pour la langue demandée. Repli ultime sur une voix
 * française (mieux que rien qu'un échec), sinon null.
 */
function pickVoice(lang: SpeechLang): SpeechSynthesisVoice | null {
  if (!speechAvailable()) return null;
  refreshVoices();
  const pool = cachedVoices.length
    ? cachedVoices
    : window.speechSynthesis.getVoices();
  // On PRÉFÈRE une voix LOCALE (localService) parmi les correspondances : les
  // voix « en ligne » (réseau) — typiques des voix anglaises d'Edge/Chrome —
  // peuvent rester muettes ou lentes. C'est ce qui donnait « anglais muet,
  // espagnol OK » (l'espagnol avait une voix locale, l'anglais une voix réseau).
  const best = (matches: SpeechSynthesisVoice[]) =>
    matches.find((v) => v.localService) ?? matches[0];
  for (const pref of VOICE_PREFS[lang]) {
    const exact = pool.filter((v) => v.lang && v.lang.toLowerCase() === pref);
    if (exact.length) return best(exact);
    const starts = pool.filter(
      (v) => v.lang && v.lang.toLowerCase().startsWith(pref)
    );
    if (starts.length) return best(starts);
  }
  // Pas de voix cible : pour le français on prend n'importe quelle voix fr
  // (locale de préférence). Pour l'anglais/espagnol on NE force PAS le français
  // → null, et `utter.lang` (en-GB / es-ES) guidera le moteur.
  if (lang === "fr") {
    const fr = pool.filter((v) => v.lang && v.lang.toLowerCase().startsWith("fr"));
    if (fr.length) return best(fr);
  }
  return null;
}

function applyVoice(utter: SpeechSynthesisUtterance, lang: SpeechLang) {
  const voice = pickVoice(lang);
  // La langue de l'utterance suit la voix réellement retenue (le repli
  // français doit lire « en français », pas en anglais avec une voix FR).
  utter.lang = voice?.lang ?? BCP47[lang];
  if (voice) utter.voice = voice;
}

/**
 * Lit un texte dans la langue donnée (français par défaut). Annule la lecture
 * en cours.
 *
 * ⭐ LE VOLUME EST POSÉ À FOND, EXPLICITEMENT (Frédéric, 16/08, avant de
 * tester la compréhension de l'oral). La spécification dit bien que `volume`
 * vaut 1 par défaut, mais on ne teste pas une épreuve d'écoute sur une valeur
 * qu'on n'a pas écrite : un défaut se lit dans le code, pas dans une norme.
 *
 * @param opts.rate débit ; 1 par défaut. L'épreuve d'oral descend à 0,95 —
 *   c'est le débit d'une émission, pas d'une dictée.
 * @param opts.onStart appelé quand le son PART VRAIMENT. Indispensable à la
 *   dictée : `true` ci-dessous veut seulement dire « la demande est passée »,
 *   pas « l'élève a entendu ». Une voix réseau absente reste muette sans lever
 *   la moindre erreur (cf. `pickVoice`) — l'appelant a besoin de la différence.
 * @param opts.onFail appelé si le moteur renonce.
 * @returns `false` si le navigateur n'a pas de synthèse vocale, pour que
 *   l'appelant puisse le dire à l'élève au lieu de le laisser devant un
 *   bouton muet.
 */
export function speakText(
  text: string,
  lang: SpeechLang = "fr",
  opts?: { rate?: number; onStart?: () => void; onFail?: () => void },
): boolean {
  if (!speechAvailable()) return false;
  if (!text.trim()) return true;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = opts?.rate ?? 1;
  utter.volume = 1;
  applyVoice(utter, lang);
  if (opts?.onStart) utter.onstart = opts.onStart;
  if (opts?.onFail) utter.onerror = opts.onFail;
  synth.speak(utter);
  return true;
}

export function stopSpeak() {
  if (speechAvailable()) window.speechSynthesis.cancel();
}

/**
 * Construit un texte lisible d'une question : l'énoncé + les choix annoncés
 * « Réponse A, … » pour un QCM (indispensable pour un élève qui n'voit pas).
 * Les béquilles suivent la langue lue pour rester cohérentes à l'oreille.
 */
export function buildReadableQuestion(
  question: TutorQuestionOption,
  lang: SpeechLang = "fr"
): string {
  const parts = [question.text];
  if (question.format === "qcm" && question.choices?.length) {
    const lettres = ["A", "B", "C", "D", "E", "F"];
    const { answer, intro } = SCAFFOLD[lang];
    const choix = question.choices
      .map((c, i) => `${answer} ${lettres[i] ?? i + 1} : ${c}`)
      .join(". ");
    parts.push(`${intro} ${choix}.`);
  }
  return parts.join(". ");
}

export function ListenButton({
  text,
  lang = "fr",
  className,
  label = "Écouter",
}: {
  text: string;
  lang?: SpeechLang;
  className?: string;
  label?: string;
}) {
  const [speaking, setSpeaking] = useState(false);

  // Précharge la liste des voix (souvent vide au 1er appel, peuplée via l'event).
  useEffect(() => {
    if (!speechAvailable()) return;
    refreshVoices();
    window.speechSynthesis.onvoiceschanged = refreshVoices;
    return () => stopSpeak();
  }, []);

  if (!speechAvailable() || !text.trim()) return null;

  function toggle() {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    applyVoice(utter, lang);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(utter);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={speaking ? "Arrêter la lecture" : label}
      className={
        className ??
        "inline-flex items-center gap-1 rounded-full border border-sky-300 px-3 py-1 text-xs font-bold text-sky-600 hover:bg-sky-50"
      }
    >
      {speaking ? "⏹️ Stop" : `🔊 ${label}`}
    </button>
  );
}
