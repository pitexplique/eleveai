# Les vignettes des Shorts — une image verticale par vidéo, à téléverser.
#
# ── POURQUOI (04/09/2026) ─────────────────────────────────────────────────────
# ⭐⭐ Sur un Short, YouTube ne montre PAS le PNG 1280×720 du générateur de
# miniatures : le fil lance la vidéo. La seule image qui compte est celle qu'il
# prélève lui-même, vers 1 à 1,5 s — et elle décide de tout. Rappel du chiffre
# qui commande ce chantier : **126 vues pour un Short contre 2 pour la même
# vidéo en paysage**.
#
# ⛔ CE PRÉLÈVEMENT A DÉJÀ RATÉ. Trois Shorts (`a`, `i`, `o`) sont partis en
# ligne avec une vignette NOIRE : la page de garde s'arrêtait pile au moment du
# prélèvement. Le réglage a bougé trois fois (0,75 → 1,30 → 1,80 → 1,50) sans
# jamais être sûr, parce qu'on devinait le moment exact.
#
# ⭐ LA VIGNETTE TÉLÉVERSÉE À LA MAIN SUPPRIME LA DEVINETTE. On ne dépend plus
# de l'instant choisi par YouTube : on lui donne l'image. C'est ce qui permet de
# revenir à 1,50 s de garde — la durée redevient une question de rythme, et sur
# un Short 0,3 s au démarrage ne sont pas rien (Frédéric, 04/09 : « on revient à
# 1,5 s et on crée miniature »).
#
# ⚠️ L'IMAGE EST PRISE DANS LA VIDÉO, pas redessinée. Une vignette qui ne serait
# pas exactement la première image ferait une promesse que la vidéo ne tient
# pas — et c'est le genre d'écart que personne ne revérifie ensuite.
#
# ── USAGE ─────────────────────────────────────────────────────────────────────
#   python scripts/vignettes-shorts.py            → toutes les vidéos trouvées
#   python scripts/vignettes-shorts.py lettre_u   → un seul dossier
#
# Sortie : manim/miniatures/cp/francais/shorts/vignette-short-<nom>.png

import sys
from pathlib import Path

import av

RACINE = Path(__file__).resolve().parents[1]
VIDEOS = RACINE / "manim" / "scripts" / "cp" / "media" / "videos"
MINIATURES = RACINE / "manim" / "miniatures" / "cp"


def dossier_de(mp4: Path) -> Path:
    """`cp/maths/shorts` pour un chiffre, `cp/francais/shorts` pour une lettre.

    ⭐ Frédéric, 04/09 : « dans le répertoire cp maths ». Un chiffre n'est pas
    du français — et le jour où les chiffres auront leurs fiches, elles devront
    se ranger là aussi. La matière se lit dans le nom du fichier, qui commence
    par `eleveai-maths-` ou `eleveai-francais-`.
    """
    matiere = "maths" if "-maths-" in mp4.name else "francais"
    return MINIATURES / matiere / "shorts"

# ⚠️ 0,60 s et non 1,00 : on veut être au MILIEU de la page de garde, loin du
# fondu de sortie quel que soit le réglage en vigueur. L'image y est identique —
# la garde ne bouge pas — mais la marge, elle, protège des futurs changements.
INSTANT = 0.60


def vignette(mp4: Path) -> Path | None:
    conteneur = av.open(str(mp4))
    for image in conteneur.decode(video=0):
        if image.time >= INSTANT:
            sortie = dossier_de(mp4)
            sortie.mkdir(parents=True, exist_ok=True)
            # « eleveai-francais-cp-lettre-u-gaucher-portrait » → « lettre-u-gaucher »
            nom = (mp4.stem.replace("eleveai-francais-cp-", "")
                   .replace("eleveai-maths-cp-", "").replace("-portrait", ""))
            chemin = sortie / f"vignette-short-{nom}.png"
            im = image.to_image()
            im.save(chemin, "PNG")
            print(f"{chemin}  {im.width}x{im.height}")
            return chemin
    print(f"⚠️  {mp4.name} : aucune image à {INSTANT} s")
    return None


def main():
    filtre = sys.argv[1] if len(sys.argv) > 1 else None
    # ⚠️ 1920p60 UNIQUEMENT : c'est le dossier des portraits (Manim range par
    # HAUTEUR d'image). Le paysage vit dans 1080p60 et n'a pas de vignette à
    # téléverser — sa miniature 1280×720 est faite par `manim/miniature.py`.
    trouves = sorted(VIDEOS.glob("*/1920p60/*.mp4"))
    if not trouves:
        print("Aucun Short rendu. Rendre d'abord en -qh -r 1080,1920.")
        return
    for mp4 in trouves:
        if filtre and filtre not in str(mp4):
            continue
        vignette(mp4)


if __name__ == "__main__":
    main()
