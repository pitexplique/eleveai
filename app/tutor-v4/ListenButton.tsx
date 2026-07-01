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
  for (const pref of VOICE_PREFS[lang]) {
    const exact = pool.find((v) => v.lang && v.lang.toLowerCase() === pref);
    if (exact) return exact;
    const starts = pool.find(
      (v) => v.lang && v.lang.toLowerCase().startsWith(pref)
    );
    if (starts) return starts;
  }
  // Pas de voix cible installée : pour le français, on prend n'importe quelle
  // voix fr. Pour l'anglais/espagnol, on NE force PAS une voix française (sinon
  // le mot est prononcé « à la française ») → on renvoie null et `utter.lang`
  // (en-GB / es-ES) guidera le moteur vers la bonne langue.
  if (lang === "fr") {
    return pool.find((v) => v.lang && v.lang.toLowerCase().startsWith("fr")) ?? null;
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

/** Lit un texte dans la langue donnée (français par défaut). Annule la lecture en cours. */
export function speakText(text: string, lang: SpeechLang = "fr") {
  if (!speechAvailable() || !text.trim()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  applyVoice(utter, lang);
  synth.speak(utter);
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
