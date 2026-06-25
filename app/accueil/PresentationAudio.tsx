"use client";

// Présentation audio d'EleveAI sur la page d'accueil — synthèse vocale du
// navigateur (voix FR, gratuit, sans serveur). Sert aussi l'accessibilité :
// un visiteur déficient visuel entend la présentation d'un clic.

import { useEffect, useState } from "react";

const PRESENTATION = [
  "Bienvenue sur EleveAI.",
  "EleveAI est un coach scolaire intelligent, créé par un enseignant de La Réunion, pour les élèves du CP à la Terminale.",
  "Quand tu te trompes, EleveAI ne te ressert pas le même exercice : il repère la base qui coince et te fait progresser pas à pas, en maths, en français, en anglais et bien plus encore.",
  "Et parce que chaque élève compte, EleveAI lit les questions à voix haute et fonctionne avec les lecteurs d'écran, pour les élèves qui ont des difficultés de vue.",
  "Bonne découverte !",
].join(" ");

function speechAvailable() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function getFrenchVoice(): SpeechSynthesisVoice | null {
  if (!speechAvailable()) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang && v.lang.toLowerCase() === "fr-fr") ??
    voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("fr")) ??
    null
  );
}

export default function PresentationAudio() {
  // Rendu seulement après montage → pas de différence SSR / client (hydratation).
  const [mounted, setMounted] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (speechAvailable()) window.speechSynthesis.cancel();
    };
  }, []);

  if (!mounted || !speechAvailable()) return null;

  function toggle() {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(PRESENTATION);
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
      aria-label={
        speaking ? "Arrêter la présentation audio" : "Écouter la présentation d'EleveAI"
      }
      className="group mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-1.5 text-xs font-black tracking-wide text-emerald-200 transition hover:scale-105 hover:border-emerald-300/70 hover:bg-emerald-300/20 sm:text-sm"
    >
      <span aria-hidden="true">{speaking ? "⏹️" : "🔊"}</span>
      {speaking ? "Arrêter" : "Écouter la présentation"}
    </button>
  );
}
