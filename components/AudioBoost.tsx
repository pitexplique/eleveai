"use client";

/**
 * AudioBoost — lecteur audio amplifié via Web Audio API (GainNode).
 *
 * Le volume HTML natif est plafonné à 1.0.
 * Ici on applique un gain > 1 pour compenser les fichiers TTS trop faibles.
 *
 * Usage : <AudioBoost src="/audio/english-maths/digits/a1/one.mp3" autoPlay />
 */

import { useEffect, useRef, useState } from "react";
import { Volume2, Play, Pause } from "lucide-react";

interface Props {
  src: string;
  autoPlay?: boolean;
  gain?: number;           // multiplicateur de volume, défaut 1.8
  className?: string;
  compact?: boolean;       // mode bouton uniquement (sans barre de progression)
}

export default function AudioBoost({
  src,
  autoPlay = false,
  gain = 3.5,
  className = "",
  compact = false,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  // Initialise Web Audio API une seule fois
  function ensureContext() {
    if (contextRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;

    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const gainNode = ctx.createGain();
    gainNode.gain.value = gain;

    const source = ctx.createMediaElementSource(audio);
    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    contextRef.current = ctx;
    gainRef.current = gainNode;
    sourceRef.current = source;
  }

  async function play() {
    const audio = audioRef.current;
    if (!audio) return;
    ensureContext();
    if (contextRef.current?.state === "suspended") {
      await contextRef.current.resume();
    }
    await audio.play();
  }

  function pause() {
    audioRef.current?.pause();
  }

  function toggle() {
    if (playing) pause();
    else play();
  }

  // AutoPlay au montage (nécessite une interaction utilisateur sur mobile)
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      // délai court pour laisser le DOM se stabiliser
      const t = setTimeout(() => play(), 120);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Re-init when src changes
  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setDuration(0);
    setReady(false);
  }, [src]);

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  if (compact) {
    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          ref={audioRef}
          src={src}
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setProgress(0); }}
          onCanPlay={() => setReady(true)}
          onTimeUpdate={(e) => setProgress((e.target as HTMLAudioElement).currentTime)}
          onDurationChange={(e) => setDuration((e.target as HTMLAudioElement).duration)}
        />
        <button
          type="button"
          onClick={toggle}
          disabled={!ready}
          className={[
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition",
            playing
              ? "bg-sky-100 text-sky-700 hover:bg-sky-200"
              : "bg-sky-600 text-white hover:bg-sky-700",
            !ready ? "opacity-50 cursor-not-allowed" : "",
            className,
          ].join(" ")}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {playing ? "Pause" : "Écouter"}
        </button>
      </>
    );
  }

  return (
    <div className={["flex items-center gap-3 rounded-2xl bg-sky-50 border border-sky-200 px-4 py-3", className].join(" ")}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setProgress(0); }}
        onCanPlay={() => setReady(true)}
        onTimeUpdate={(e) => setProgress((e.target as HTMLAudioElement).currentTime)}
        onDurationChange={(e) => setDuration((e.target as HTMLAudioElement).duration)}
      />

      {/* Bouton play/pause */}
      <button
        type="button"
        onClick={toggle}
        disabled={!ready}
        className={[
          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition",
          playing ? "bg-sky-600 text-white hover:bg-sky-700" : "bg-sky-100 text-sky-700 hover:bg-sky-200",
          !ready ? "opacity-40 cursor-not-allowed" : "",
        ].join(" ")}
        aria-label={playing ? "Pause" : "Lire"}
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>

      {/* Barre de progression */}
      <div className="flex flex-1 flex-col gap-1">
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={0.01}
          value={progress}
          onChange={(e) => {
            const t = Number(e.target.value);
            if (audioRef.current) audioRef.current.currentTime = t;
            setProgress(t);
          }}
          className="h-1.5 w-full cursor-pointer accent-sky-600"
        />
        <div className="flex justify-between text-[10px] text-sky-500/70">
          <span>{fmt(progress)}</span>
          <span>{duration ? fmt(duration) : "–"}</span>
        </div>
      </div>

      {/* Icône volume */}
      <Volume2 className="h-4 w-4 flex-shrink-0 text-sky-400" />
    </div>
  );
}
