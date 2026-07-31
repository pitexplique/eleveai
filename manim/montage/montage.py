#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
montage.py - pipeline montage video EleveAI (ffmpeg)

Colle la VOIX (iPhone) sur un rendu Manim muet, ajoute un FOND MUSICAL dose
(ducking : la musique baisse automatiquement quand tu parles), normalise le
son a -14 LUFS (standard YouTube), et - en option - sort une version
VERTICALE 9:16 pour les Shorts avec SOUS-TITRES incrustes.

Pourquoi cet outil : le montage repetitif (muxer la voix, doser la musique,
normaliser, recadrer en vertical, incruster les sous-titres) est mecanique.
On l'offloade au code (comme Manim) pour ne garder que l'humain : enregistrer
la voix et penser le hook.

------------------------------------------------------------------------------
EXEMPLES
------------------------------------------------------------------------------
# 1) Notion 16:9 : rendu Manim muet + ta voix, son normalise -14 LUFS
python manim/montage/montage.py \
    --video eleveai-maths-6e-entier-calcul-pose.mp4 \
    --voice voix-calcul-pose.m4a

# 2) Idem + fond musical (baisse tout seul sous la voix)
python manim/montage/montage.py --video ...mp4 --voice voix.m4a --music bed.mp3

# 3) Caler la voix : couper les 3.5 s de blabla + "top" du debut de l'enregistrement
python manim/montage/montage.py --video ...mp4 --voice voix.m4a --voice-start 3.5

# 4) Short vertical 9:16 + sous-titres incrustes (fichier .srt)
python manim/montage/montage.py --video ...mp4 --voice voix.m4a --srt sous-titres.srt --vertical

# Voir la commande ffmpeg sans l'executer :
python manim/montage/montage.py --video ...mp4 --voice voix.m4a --dry-run

Prerequis : ffmpeg dans le PATH (deja le cas, Manim en depend).
Musique/bruitages gratuits : YouTube Studio -> Audio library (libre de droits).
"""
from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys


def esc_sub(path: str) -> str:
    """Echappe un chemin pour le filtre libass `subtitles=` (Windows compris)."""
    ap = os.path.abspath(path)
    try:
        p = os.path.relpath(ap)          # relatif au dossier courant = pas de "C:"
    except ValueError:
        p = ap                            # autre disque : on garde l'absolu
    return p.replace("\\", "/").replace(":", "\\:")


def probe_duration(path: str) -> float:
    """Duree de la video, en secondes (borne la sortie => termine toujours)."""
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", path],
        capture_output=True, text=True,
    )
    try:
        return float(out.stdout.strip())
    except ValueError:
        return 0.0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Montage EleveAI : voix + musique dosee + -14 LUFS + vertical 9:16 + sous-titres.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    p.add_argument("--video", required=True, help="Rendu Manim (mp4 muet).")
    p.add_argument("--voice", help="Voix enregistree (m4a/mp3/wav).")
    p.add_argument("--music", help="Fond musical (baisse sous la voix). Optionnel.")
    p.add_argument("--srt", help="Sous-titres .srt a incruster. Optionnel.")
    p.add_argument("--out", help="Fichier de sortie. Defaut : <video>-sonorise.mp4 (ou -short.mp4).")
    p.add_argument("--voice-start", type=float, default=0.0, dest="voice_start",
                   help="Couper les N premieres secondes de la voix (le blabla + le 'top').")
    p.add_argument("--delay", type=float, default=0.0,
                   help="Ajouter N s de silence AVANT la voix (caler apres coupe).")
    p.add_argument("--music-vol", type=float, default=0.18, dest="music_vol",
                   help="Volume du fond musical, 0..1 (defaut 0.18).")
    p.add_argument("--lufs", type=float, default=-14.0,
                   help="Cible loudness (defaut -14, standard YouTube).")
    p.add_argument("--vertical", action="store_true",
                   help="Sortir en 9:16 (1080x1920) pour les Shorts.")
    p.add_argument("--crf", type=int, default=18, help="Qualite video au re-encodage (18 = tres bon).")
    p.add_argument("--dry-run", action="store_true", dest="dry_run",
                   help="Afficher la commande ffmpeg sans l'executer.")
    return p


def main() -> int:
    args = build_parser().parse_args()

    if not shutil.which("ffmpeg") or not shutil.which("ffprobe"):
        print("ERREUR: ffmpeg/ffprobe introuvables dans le PATH.")
        return 1
    if not os.path.isfile(args.video):
        print(f"ERREUR: video introuvable : {args.video}")
        return 1
    if not args.voice and not args.music:
        print("ERREUR: donne au moins --voice (ou --music).")
        return 1
    for f in (args.voice, args.music, args.srt):
        if f and not os.path.isfile(f):
            print(f"ERREUR: fichier introuvable : {f}")
            return 1

    # ------------------------------------------------------------------ inputs
    inputs: list[str] = ["-i", args.video]
    idx = 1
    voice_i = music_i = -1
    if args.voice:
        inputs += ["-i", args.voice]
        voice_i = idx
        idx += 1
    if args.music:
        inputs += ["-stream_loop", "-1", "-i", args.music]   # boucle pour couvrir toute la video
        music_i = idx
        idx += 1

    delay_ms = int(round(args.delay * 1000))
    ln = f"loudnorm=I={args.lufs}:TP=-1:LRA=11"

    def voice_chain(out_label: str) -> str:
        parts = [f"[{voice_i}:a]"]
        if args.voice_start > 0:
            parts.append(f"atrim=start={args.voice_start},asetpts=PTS-STARTPTS,")
        if delay_ms > 0:
            parts.append(f"adelay={delay_ms}|{delay_ms},")
        parts.append(f"aresample=async=1,apad{out_label}")
        return "".join(parts)

    # ------------------------------------------------------------- audio graph
    if voice_i >= 0 and music_i >= 0:
        af = (
            voice_chain("[v0];")
            + "[v0]asplit=2[v1][v2];"                                  # une copie pour le ducking, une pour le mix
            + f"[{music_i}:a]volume={args.music_vol}[mb];"
            + "[mb][v1]sidechaincompress=threshold=0.03:ratio=6:attack=5:release=300[md];"
            + "[v2][md]amix=inputs=2:duration=longest:normalize=0[mx];"
            + f"[mx]{ln}[aout]"
        )
    elif voice_i >= 0:
        af = voice_chain("[v0];") + f"[v0]{ln}[aout]"
    else:  # musique seule
        af = f"[{music_i}:a]volume={args.music_vol},{ln}[aout]"

    # ------------------------------------------------------------- video graph
    vf = None
    if args.vertical:
        vf = "[0:v]scale=1080:-2,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=black"
        if args.srt:
            style = ("FontName=Arial,Fontsize=64,Bold=1,PrimaryColour=&H00FFFFFF&,"
                     "OutlineColour=&H00000000&,BorderStyle=1,Outline=4,Shadow=0,"
                     "Alignment=2,MarginV=300")
            vf += f",subtitles='{esc_sub(args.srt)}':force_style='{style}'"
        vf += "[vout]"
    elif args.srt:
        style = ("FontName=Arial,Fontsize=44,Bold=1,PrimaryColour=&H00FFFFFF&,"
                 "OutlineColour=&H00000000&,BorderStyle=1,Outline=3,Shadow=0,"
                 "Alignment=2,MarginV=70")
        vf = f"[0:v]subtitles='{esc_sub(args.srt)}':force_style='{style}'[vout]"

    filter_complex = af + (";" + vf if vf else "")

    # ------------------------------------------------------------------- output
    if args.out:
        out = args.out
    else:
        base, _ = os.path.splitext(args.video)
        out = base + ("-short.mp4" if args.vertical else "-sonorise.mp4")

    dur = probe_duration(args.video)

    cmd = ["ffmpeg", "-y", *inputs, "-filter_complex", filter_complex]
    if vf:
        cmd += ["-map", "[vout]", "-map", "[aout]",
                "-c:v", "libx264", "-crf", str(args.crf), "-preset", "medium",
                "-pix_fmt", "yuv420p"]
    else:
        cmd += ["-map", "0:v", "-map", "[aout]", "-c:v", "copy"]
    cmd += ["-c:a", "aac", "-b:a", "192k"]
    if dur > 0:
        cmd += ["-t", f"{dur:.3f}"]        # borne a la duree video => se termine toujours
    cmd += ["-movflags", "+faststart", out]

    if args.dry_run:
        print(" ".join(f'"{c}"' if (" " in c or ";" in c) else c for c in cmd))
        return 0

    print(f"-> Montage : {os.path.basename(out)}"
          + ("  [9:16 Short]" if args.vertical else "  [16:9]")
          + (f"  voix (coupe {args.voice_start}s)" if args.voice else "")
          + ("  + musique dosee" if args.music else "")
          + ("  + sous-titres" if args.srt else "")
          + f"  -> {args.lufs} LUFS")
    proc = subprocess.run(cmd)
    if proc.returncode != 0:
        print("ERREUR: ffmpeg a echoue (voir ci-dessus).")
        return proc.returncode
    print(f"-> OK : {out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
