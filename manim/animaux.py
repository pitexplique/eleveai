# manim/animaux.py — la bibliothèque d'animaux dans les vidéos (14/11/2026).
#
# Les dessins viennent de `lib/canvas/animaux/dessins.ts` (la MÊME source que
# le coach), exportés en SVG par :
#     npx tsx scripts/exporter-animaux.mts   →   manim/assets/animaux/<id>.svg
# ⚠️ Ne jamais retoucher un SVG à la main : modifier dessins.ts et réexporter.
#
# Usage dans une scène :
#     from animaux import animal, troupeau, ANIMAUX
#     poule = animal("poule", hauteur=1.2)
#     poules = troupeau("poule", 7, par_ligne=5, hauteur=0.9)   # VGroup de 7
#     self.play(LaggedStart(*[FadeIn(p, scale=0.6) for p in poules], lag_ratio=0.15))
#
# ⭐ `troupeau` rend un VGroup : on peut les compter un à un à l'écran
# (Indicate, numéro au-dessus de chacun), ce qui est tout l'intérêt d'un short
# « Combien de… ? ».

from pathlib import Path

from manim import SVGMobject, VGroup

DOSSIER = Path(__file__).resolve().parent / "assets" / "animaux"
ANIMAUX = sorted(p.stem for p in DOSSIER.glob("*.svg"))


def animal(nom: str, hauteur: float = 1.0) -> SVGMobject:
    """Un animal de la bibliothèque, à la hauteur voulue (unités Manim).

    `hauteur` est celle de la BOITE 60 × 60, pas du dessin : tous les animaux
    gardent entre eux les proportions du coach. Le submobject 0 est ce cadre
    invisible (posé par l'export) — ne pas le colorier."""
    chemin = DOSSIER / f"{nom}.svg"
    if not chemin.exists():
        raise ValueError(f"Animal inconnu : {nom!r}. Connus : {', '.join(ANIMAUX)}")
    m = SVGMobject(str(chemin), height=hauteur)
    m[0].set_fill(opacity=0).set_stroke(opacity=0, width=0)
    return m


def troupeau(nom: str, nombre: int, par_ligne: int = 5, hauteur: float = 0.9,
             ecart: float = 0.25) -> VGroup:
    """`nombre` animaux identiques en grille, `par_ligne` par ligne, centrés."""
    groupe = VGroup(*[animal(nom, hauteur) for _ in range(nombre)])
    groupe.arrange_in_grid(cols=min(par_ligne, max(1, nombre)), buff=ecart)
    return groupe


__all__ = ["animal", "troupeau", "ANIMAUX", "DOSSIER"]
