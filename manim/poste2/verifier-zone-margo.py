# verifier-zone-margo.py — EleveAI, 2e poste (17/11/2026).
#
# ⭐ POURQUOI CET OUTIL EXISTE
# Le 17/11, les 20 shorts de 4e sont partis en rendu HD avec la poignée « @eleveai974 »
# posée SUR Ti-Margo : sa tête couvrait une lettre du nom du compte. `BORDS=1` ne voit
# rien de ce défaut — le texte ne sort pas du cadre, il tombe sur la mascotte. Et il n'a
# été vu qu'APRÈS les 20 rendus HD, c'est-à-dire au prix le plus élevé.
#
# Cet outil ramène ce contrôle AVANT le HD : il tourne sur n'importe quel MP4, donc sur
# un rendu `-ql` qui coûte quelques secondes.
#
# COMMENT IL S'Y PREND, sans rien savoir du dessin
# Ti-Margo ne bouge jamais dans une vidéo : il est posé une fois pour toutes. Donc, dans
# son rectangle, le nombre de pixels allumés est MINIMAL sur les écrans où il est seul.
# Tout instant qui dépasse ce minimum a quelque chose de dessiné par-dessus lui.
# L'étalon est donc la vidéo elle-même : aucune image de référence à tenir à jour.
#
# Mesures (prises sur un rendu HD 1080 × 1920 de la série, et vérifiées dans le code —
# `gabarit_seconde.margo_bas` : MascotteMargouillat().scale(0.38).move_to([0, -3.45, 0])) :
#   · SHORT   (cadre 4,5 × 8,0) : pixels réels x ∈ [-0.28, +0.29], y ∈ [-3.85, -3.02].
#     ⚠️ Sa boîte englobante descend à -2.918, mais elle contient du vide : c'est -3.02
#     qui compte. Un bloc de deux lignes en corps 30 (haut 0,852) doit donc être centré
#     à y ≥ -2.51 pour le dégager. `commentaire(y=-2.6)` le touche à 1 pixel près.
#   · PAYSAGE (cadre 14,2 × 8,0) : en bas à DROITE, x > 4,6 et y < -2,2.
#
# Usage :
#   python manim/poste2/verifier-zone-margo.py <mp4> [--pas 0.4] [--planche sortie.png]
# Sortie : « 0 instant où quelque chose recouvre Ti-Margo », ou la liste des instants.
# Code de retour 1 s'il y a au moins un instant fautif : utilisable dans un enchaînement.

import argparse
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

# La zone de la mascotte, en unités de scène, par format de cadre.
ZONES = {
    "short":   dict(cadre=(4.5, 8.0), x=(-0.40, 0.40), y=(-3.95, -2.98)),
    # Paysage : `gabarit_seconde.add_mascotte` fait
    # `MascotteMargouillat().scale(0.5).to_corner(DOWN + RIGHT, buff=0.35)`
    # → boîte x ∈ [+5.63, +6.75], y ∈ [-3.65, -2.25]. ⚠️ Un premier rectangle trop
    # large d'une unité vers la gauche (x à partir de +4.55) attrapait le contenu de
    # la colonne de droite et criait au loup sur 200 instants par paysage.
    "paysage": dict(cadre=(14.2, 8.0), x=(5.55, 6.85), y=(-3.70, -2.20)),
}


def format_du_cadre(largeur, hauteur):
    return "short" if hauteur > largeur else "paysage"


def en_pixels(zone, W, H):
    """La zone, en lignes et colonnes de l'image."""
    cw, ch = zone["cadre"]
    ux, uy = cw / W, ch / H
    x0 = int(W / 2 + zone["x"][0] / ux)
    x1 = int(W / 2 + zone["x"][1] / ux)
    y0 = int(H / 2 - zone["y"][1] / uy)   # y haut  -> ligne basse
    y1 = int(H / 2 - zone["y"][0] / uy)   # y bas   -> ligne haute
    return max(0, y0), min(H, y1), max(0, x0), min(W, x1)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4")
    ap.add_argument("--pas", type=float, default=0.4, help="secondes entre deux images")
    ap.add_argument("--planche", help="PNG : les instants fautifs, côte à côte")
    ap.add_argument("--marge", type=float, default=0.02,
                    help="tolérance, en part du minimum (anti-compression)")
    ap.add_argument("--tailles", type=int, default=0,
                    help="nombre de tailles légitimes de la mascotte "
                         "(1 pour un short, 2 pour un paysage : la page de garde la "
                         "montre plus grande). Par défaut, déduit du format du cadre.")
    a = ap.parse_args()

    mp4 = Path(a.mp4)
    if not mp4.exists():
        sys.exit(f"⛔ vidéo introuvable : {mp4}")

    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        subprocess.run(["ffmpeg", "-v", "error", "-i", str(mp4),
                        "-vf", f"fps={1 / a.pas}", str(tmp / "i%05d.png")], check=True)
        images = sorted(tmp.glob("*.png"))
        if not images:
            sys.exit(f"⛔ aucune image extraite de {mp4}")

        W, H = Image.open(images[0]).size
        quel = format_du_cadre(W, H)
        y0, y1, x0, x1 = en_pixels(ZONES[quel], W, H)
        if not a.tailles:
            a.tailles = 1 if quel == "short" else 2

        comptes = []
        for p in images:
            bande = np.asarray(Image.open(p).convert("RGB"))[y0:y1, x0:x1, :]
            comptes.append(int((bande.max(axis=2) > 45).sum()))

        # ⭐⭐ L'ÉTALON, et les deux pièges qui l'ont faussé le 17/11.
        # 1. Un écran peut ne PAS porter Ti-Margo (l'écran de commentaire depuis le
        #    17/11) : prendre le MINIMUM donnerait ~0 et tout le reste serait fautif.
        # 2. En PAYSAGE, il est dessiné à DEUX tailles selon les écrans (≈6 970 px et
        #    ≈8 911 px en 1920 × 1080) : un étalon unique criait au loup sur la moitié
        #    de la vidéo, alors que rien ne le recouvrait.
        # D'où la règle : un PALIER est une valeur que l'on retrouve sur au moins 10 %
        # des images — c'est Ti-Margo seul, à l'une de ses tailles. L'étalon est le
        # PLUS HAUT des paliers. Un recouvrement, lui, est bref : il ne fait jamais
        # palier, et il s'ajoute à celui de son écran.
        n_max = max(comptes) or 1
        seuil_palier = max(2, len(comptes) // 10)
        paniers = {}
        for n in comptes:                          # paniers de 0,5 % : regroupe les
            paniers.setdefault(round(n / n_max * 200), []).append(n)   # quasi-égaux
        paliers = sorted(max(v) for v in paniers.values() if len(v) >= seuil_palier)
        # ⛔⛔ Ne PAS prendre le plus haut palier : un texte qui reste posé sur la
        # mascotte pendant 15 % de la vidéo fait palier LUI AUSSI, et l'outil
        # déclarerait alors propre la vidéo fautive (`4e-solides-vues-short`, 17/11).
        # Les `tailles` plus PETITS paliers sont les tailles légitimes de la mascotte :
        # une seule dans un short, deux dans un paysage (la page de garde la montre
        # plus grande — `REGLES.md` : « plus grande sur l'écran d'accueil »).
        paliers = paliers or [max(comptes)]
        # ⛔ Et écarter d'abord le palier « mascotte ABSENTE » : depuis le 17/11
        # l'écran de commentaire n'en porte pas, ses ~0 pixel font palier eux aussi,
        # et ils deviendraient l'étalon — toute la vidéo passerait pour fautive.
        plancher = 0.30 * max(paliers)
        paliers = [p for p in paliers if p >= plancher] or [max(paliers)]
        seul = paliers[min(a.tailles, len(paliers)) - 1]
        plafond = seul * (1 + a.marge) + 40       # 40 px : le bruit de compression
        absents = sum(1 for n in comptes if n < seul * 0.5)
        fautifs = [(i * a.pas, n) for i, n in enumerate(comptes) if n > plafond]

        print(f"{mp4.name} — cadre {quel}, zone de Ti-Margo "
              f"x[{x0}:{x1}] y[{y0}:{y1}] ; {len(images)} images, "
              f"Ti-Margo seul = {seul} pixels"
              + (f", absent sur {absents} images" if absents else ""))
        if not fautifs:
            print("0 instant où quelque chose recouvre Ti-Margo")
            return 0

        print(f"⛔ {len(fautifs)} instants où quelque chose recouvre Ti-Margo :")
        for t, n in fautifs[:40]:
            print(f"   {int(t) // 60:02d}:{t % 60:04.1f}  {n} pixels "
                  f"(+{n - seul} de trop)")
        if len(fautifs) > 40:
            print(f"   … et {len(fautifs) - 40} autres")

        if a.planche:
            bouts = [Image.open(images[int(t / a.pas)]).crop(
                (max(0, x0 - 260), max(0, y0 - 120), min(W, x1 + 260), min(H, y1 + 20)))
                for t, _ in fautifs[:6]]
            lw, lh = bouts[0].size
            f = Image.new("RGB", (lw * len(bouts), lh), "black")
            for i, b in enumerate(bouts):
                f.paste(b, (i * lw, 0))
            f.save(a.planche)
            print(f"planche : {a.planche}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
