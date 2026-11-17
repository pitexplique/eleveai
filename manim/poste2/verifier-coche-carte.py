# verifier-coche-carte.py — EleveAI, 2e poste (17/11/2026).
#
# ⭐ POURQUOI : sur la carte GAGNANTE d'une question-pause, le ✓ se pose dans la carte à
# 0,4 du bord droit, alors que le gabarit étire le libellé jusqu'à 0,4 du bord : sur un
# libellé long, le ✓ TOUCHE la dernière lettre (« en vraie grandeu✓r »). `BORDS=1` ne voit
# rien — rien ne sort du cadre. Remède connu : `manim/scripts/cm2/aire_comprendre.py`.
#
# ⛔ Deux pièges qui font mesurer à côté, et qui m'ont eu tous les deux :
#   · le libellé de la CARTE n'est pas le texte DIT (« 30 m³ » contre « 30 mètres cubes ») :
#     mesurer sur les voix ou sur le manifeste donne un chiffre faux, toujours trop grand ;
#   · dans un paysage, l'explication est écrite en VERT elle aussi, à gauche : chercher le
#     cadre vert sur toute l'image attrape l'explication et le cadrage part en vrille.
#     On ne regarde donc que la COLONNE DES CARTES (la moitié droite en paysage).
#
# Usage : python manim/poste2/verifier-coche-carte.py <mp4> <instant en secondes> [--planche p.png]
# Sortie : l'écart, en pixels, entre la fin du libellé et le début du ✓. Négatif = ils se
# chevauchent ; 0 à quelques pixels = ils se touchent.

import argparse
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image


def mesurer(png):
    im = Image.open(png).convert("RGB")
    a = np.asarray(im).astype(int)
    H, W, _ = a.shape
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    vert = (g > 170) & (r < 130) & (b < 150)
    blanc = (r > 195) & (g > 195) & (b > 195)

    # la colonne des cartes : moitié droite en paysage, toute la largeur en 9:16
    xd = int(W * 0.52) if W > H else 0
    v = np.zeros_like(vert); v[:, xd:] = vert[:, xd:]
    if v.sum() < 300:
        return None, "pas de carte verte à cet instant"

    # le cadre de la carte gagnante : ses bords HAUT et BAS sont les lignes les plus vertes
    par_ligne = v.sum(axis=1)
    seuil = par_ligne.max() * 0.55
    lignes = np.nonzero(par_ligne >= seuil)[0]
    y0, y1 = int(lignes.min()), int(lignes.max())
    if y1 - y0 < 12:
        return None, "cadre trop plat pour être une carte"
    colonnes = np.nonzero(v[y0:y1 + 1].any(axis=0))[0]
    x0, x1 = int(colonnes.min()), int(colonnes.max())
    larg = x1 - x0

    # la bande du MILIEU : on évite les bords haut et bas du cadre
    m0, m1 = y0 + int((y1 - y0) * 0.30), y1 - int((y1 - y0) * 0.30)
    if m1 - m0 < 4:
        return None, "carte trop basse"

    # le libellé : blanc, hors de la pastille de lettre (les 22 % de gauche)
    bt = blanc[m0:m1, x0 + int(larg * 0.22):x1]
    xs_t = np.nonzero(bt.any(axis=0))[0]
    # le ✓ : vert, dans le dernier quart de la carte, hors du trait du cadre
    bc = v[m0:m1, x0 + int(larg * 0.70):x1 - int(larg * 0.015)]
    xs_c = np.nonzero(bc.any(axis=0))[0]
    if not len(xs_t) or not len(xs_c):
        return None, "libellé ou ✓ introuvable dans la carte"

    fin_texte = x0 + int(larg * 0.22) + int(xs_t.max())
    debut_coche = x0 + int(larg * 0.70) + int(xs_c.min())
    return debut_coche - fin_texte, (x0, y0, x1, y1)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4")
    ap.add_argument("seconde", type=float)
    ap.add_argument("--planche")
    a = ap.parse_args()
    with tempfile.TemporaryDirectory() as tmp:
        f = Path(tmp) / "i.png"
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(a.seconde), "-i", a.mp4,
                        "-frames:v", "1", str(f)], check=True)
        ecart, info = mesurer(f)
        if ecart is None:
            print(f"? {Path(a.mp4).name} à {a.seconde}s : {info}")
            return 2
        x0, y0, x1, y1 = info
        etat = "⛔ LE ✓ TOUCHE LE LIBELLÉ" if ecart <= 6 else "ok"
        print(f"{Path(a.mp4).name} à {a.seconde}s : écart libellé→✓ = {ecart} px "
              f"(carte {x1-x0}×{y1-y0}) {etat}")
        if a.planche:
            Image.open(f).crop((max(0, x0 - 8), max(0, y0 - 8), x1 + 8, y1 + 8)).save(a.planche)
        return 1 if ecart <= 6 else 0


if __name__ == "__main__":
    sys.exit(main())
