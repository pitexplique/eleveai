"use client";

// Accessibilité — lecture à voix haute (synthèse vocale du navigateur, voix FR).
// Pensé en priorité pour les élèves déficients visuels : gratuit, instantané,
// sans appel serveur. Voir aussi le mode « lecture auto » côté TutorV4Client.

import { useEffect, useState } from "react";
import type { TutorQuestionOption } from "@/lib/tutor-v4/types";

let cachedVoices: SpeechSynthesisVoice[] = [];

function speechAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function refreshVoices() {
  if (!speechAvailable()) return;
  const v = window.speechSynthesis.getVoices();
  if (v.length) cachedVoices = v;
}

function getFrenchVoice(): SpeechSynthesisVoice | null {
  if (!speechAvailable()) return null;
  refreshVoices();
  const pool = cachedVoices.length
    ? cachedVoices
    : window.speechSynthesis.getVoices();
  // Préférence : une voix fr-FR, sinon n'importe quelle voix française.
  return (
    pool.find((v) => v.lang && v.lang.toLowerCase() === "fr-fr") ??
    pool.find((v) => v.lang && v.lang.toLowerCase().startsWith("fr")) ??
    null
  );
}

/** Lit un texte en français. Annule toute lecture en cours d'abord. */
export function speakText(text: string) {
  if (!speechAvailable() || !text.trim()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr-FR";
  utter.rate = 1;
  const fr = getFrenchVoice();
  if (fr) utter.voice = fr;
  synth.speak(utter);
}

export function stopSpeak() {
  if (speechAvailable()) window.speechSynthesis.cancel();
}

/**
 * Construit un texte lisible d'une question : l'énoncé + les choix annoncés
 * « Réponse A, … » pour un QCM (indispensable pour un élève qui n'voit pas).
 */
export function buildReadableQuestion(question: TutorQuestionOption): string {
  const parts = [question.text];
  if (question.format === "qcm" && question.choices?.length) {
    const lettres = ["A", "B", "C", "D", "E", "F"];
    const choix = question.choices
      .map((c, i) => `Réponse ${lettres[i] ?? i + 1} : ${c}`)
      .join(". ");
    parts.push(`Voici les réponses possibles. ${choix}.`);
  }
  return parts.join(". ");
}

export function ListenButton({
  text,
  className,
  label = "Écouter",
}: {
  text: string;
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
    utter.lang = "fr-FR";
    utter.rate = 1;
    const fr = getFrenchVoice();
    if (fr) utter.voice = fr;
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
