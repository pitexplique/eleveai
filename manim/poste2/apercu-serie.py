# apercu-serie.py — EleveAI, 2e poste, série « Périmètre, aire, volume, solides » (17/11/2026).
#
# Écrit `manim/sorties/apercu-4e-3e-complet.html` : les 28 épisodes (28 paysages + 28 shorts),
# 4e et 3e, à montrer à Frédéric. Toutes les vidéos sont EN PAUSE (`preload="metadata"`,
# pas d'`autoplay`) : ⛔ jamais de lecture automatique, il projette ces vidéos en classe.
#
# Rien n'est saisi à la main (leçon 32) : la page se construit sur
#   · `manim/poste2/manifeste-4e.json` — titres, ceintures, instants et lettres des
#     questions-pauses, métiers et `aussi`, eux-mêmes générés par `manifeste-4e.py` ;
#   · les MP4 eux-mêmes — la durée réelle, lue par `ffprobe`, et non celle d'un tableau.
#
# Lancer :  PYTHONIOENCODING=utf-8 python manim/poste2/apercu-serie.py
# Servir :  python -m http.server 3907 --directory manim/sorties
#           puis http://localhost:3907/apercu-4e-3e-complet.html
#
# `--partiel` tolère les vidéos encore absentes (utile pendant un rendu) ; sans lui, le
# script s'arrête et nomme ce qui manque, pour qu'un aperçu amputé ne passe pas inaperçu.

import html
import json
import subprocess
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
MANIFESTE = RACINE / "manim/poste2/manifeste-4e.json"
SORTIES = RACINE / "manim/sorties"
PAGE = SORTIES / "apercu-4e-3e-complet.html"

LETTRE = ["A", "B", "C"]

# Les familles, dans l'ordre de la série, avec leur titre et leur phrase de présentation.
FAMILLES = [
    ("4e", "volume", "4e · Volume et contenance",
     "Quatre épisodes : le lien aire-volume, la pyramide, le cône, et le défi de la citerne."),
    ("4e", "solides", "4e · Solides et espace",
     "Six épisodes : reconnaître, les vues, la perspective cavalière, le patron, la section, "
     "et le défi du drone."),
    ("4e", "perimetre", "4e · Périmètre",
     "Cinq épisodes : les polygones, le cercle, les figures composées, un problème, "
     "et le défi de l'enclos."),
    ("4e", "aire", "4e · Aire",
     "Cinq épisodes : rectangle et carré, le disque, les figures composées, un problème, "
     "et le défi des maillots."),
    ("3e", "volume", "3e · Volume : la boule et la réduction",
     "Deux épisodes propres à la 3e : le volume d'une boule, et la réduction par une section."),
    ("3e", "sections", "3e · Sections planes de solides",
     "Six épisodes propres à la 3e : le pavé et le cube, le cylindre, le cône et la pyramide, "
     "la sphère, le calcul d'une longueur, et le défi du scanner 3D."),
]

STYLE = """
  :root { --fond: #0f172a; --texte: #f8fafc; --doux: #94a3b8; --trait: #1e293b; }
  body { margin: 0; padding: 18px; background: var(--fond); color: var(--texte);
         font-family: "Segoe UI", sans-serif; }
  h1 { font-size: 23px; margin: 0 0 4px; }
  h2 { font-size: 19px; margin: 34px 0 4px; border-top: 2px solid var(--trait);
       padding-top: 20px; color: #facc15; }
  h3 { font-size: 16px; margin: 22px 0 8px; }
  p.intro, p.fam { color: var(--doux); margin: 0 0 10px; }
  .grille { display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start; }
  figure { margin: 0; }
  figcaption { margin-top: 6px; color: var(--doux); font-size: 13px; max-width: 720px; }
  video { background: #000; border-radius: 8px; }
  .paysage { width: min(100%, 720px); }
  .short { height: 520px; max-width: 100%; }
  code { color: #a5b4fc; }
"""


def duree(mp4):
    """La durée réelle du MP4, en « M min SS ». None si le fichier n'est pas là."""
    if not mp4.exists():
        return None
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "csv=p=0", str(mp4)], capture_output=True, text=True)
    if out.returncode != 0 or not out.stdout.strip():
        return None
    s = round(float(out.stdout.strip()))
    return f"{s // 60} min {s % 60:02d}"


def metier(e):
    """Le prénom et le métier : ils sont déjà dans les chapitres du manifeste (01-situation)."""
    for _, libelle in e["chapitres"][1:2]:
        return libelle
    return ""


def main():
    partiel = "--partiel" in sys.argv
    m = json.loads(MANIFESTE.read_text(encoding="utf-8"))
    longues = [e for e in m.values() if e["type"] == "longue"]

    manquants, lignes, faits = [], [], 0
    lignes += ['<!doctype html>', '<html lang="fr">', '<head>', '<meta charset="utf-8">',
               '<meta name="viewport" content="width=device-width, initial-scale=1">',
               '<title>Maths 4e et 3e · Périmètre, aire, volume, solides</title>',
               '<style>' + STYLE + '</style>', '</head>', '<body>',
               '<h1>Maths 4e et 3e · Périmètre, aire, volume, solides</h1>',
               f'<p class="intro">Les {len(longues)} épisodes de la série, rendus en HD : '
               f'{sum(1 for e in longues if e["classe"] == "4e")} en 4e et '
               f'{sum(1 for e in longues if e["classe"] == "3e")} propres à la 3e, '
               f'chacun avec son short.<br>'
               f'Toutes les vidéos sont EN PAUSE : appuie sur lecture. '
               f'Les épisodes de 4e marqués « aussi 3e » servent en plus un micro de 3e, '
               f'sans retournage.</p>']

    for classe, famille, titre, phrase in FAMILLES:
        lignes += [f'<h2>{html.escape(titre)}</h2>',
                   f'<p class="fam">{html.escape(phrase)}</p>']
        for e in longues:
            # la famille se lit dans le chemin de sortie : <classe>/maths/<famille>/NN-<slug>/
            if e["classe"] != classe or e["fichier"].split("/")[2] != famille:
                continue
            faits += 1
            court = e["titre"].split(" — ")[-2] if " — " in e["titre"] else e["titre"]
            lignes.append(f'<h3>{html.escape(court)} — {html.escape(metier(e))}</h3>')
            lignes.append('<div class="grille">')
            short = m[e["id"] + "-short"]
            for entree, classe_css in ((e, "paysage"), (short, "short")):
                mp4 = SORTIES / entree["fichier"]
                d = duree(mp4)
                if d is None:
                    manquants.append(entree["fichier"])
                    d = "⏳ pas encore rendue"
                qs = " · ".join(f'question à {q["t"]} ({LETTRE[q["reponse"]]})'
                                for q in entree.get("questions", []))
                if classe_css == "paysage":
                    legende = f'{d} · ceinture {entree["ceinture"]} · {qs}'
                    a = entree.get("aussi", [])
                    if a:
                        micros = ", ".join(f'<code>{html.escape(x["microId"])}</code>' for x in a)
                        legende += f' · aussi 3e : {micros}'
                else:
                    lettre = LETTRE[entree["questions"][0]["reponse"]]
                    titre_court = entree["titre"].split(" #")[0]
                    legende = f'{d} · {html.escape(titre_court)} · réponse {lettre}.'
                lignes += [
                    '  <figure>',
                    f'    <video class="{classe_css}" controls preload="metadata" '
                    f'src="{entree["fichier"]}"></video>',
                    f'    <figcaption>{legende}</figcaption>',
                    '  </figure>']
            lignes.append('</div>')

    lignes += ['</body>', '</html>']

    if faits != len(longues):
        raise SystemExit(f"⛔ {faits} épisodes rangés sur {len(longues)} : une famille de "
                         f"`FAMILLES` manque, et des épisodes seraient absents de la page.")
    if manquants and not partiel:
        raise SystemExit("⛔ " + f"{len(manquants)} vidéos absentes, aperçu NON écrit :\n  "
                         + "\n  ".join(manquants)
                         + "\nRelancer après le rendu, ou passer --partiel.")

    PAGE.write_text("\n".join(lignes) + "\n", encoding="utf-8")
    print(f"{PAGE.relative_to(RACINE)} : {len(longues)} épisodes, "
          f"{2 * len(longues) - len(manquants)} vidéos en pause"
          + (f", {len(manquants)} encore absentes" if manquants else "")
          + ".\nServir : python -m http.server 3907 --directory manim/sorties"
            "  →  http://localhost:3907/apercu-4e-3e-complet.html")


if __name__ == "__main__":
    main()
