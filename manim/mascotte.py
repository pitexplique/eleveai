# Mascotte des vidéos EleveAI : Ti-Margo, le margouillat (signe d'EleveAI, La Réunion).
# ⚠️ JAMAIS le π : c'est la signature visuelle de 3Blue1Brown/Manim, pas la nôtre.
#
# On réutilise LE MÊME visuel officiel que le cahier de vacances
# (public/cahier-vacances/ti-margo.png, PNG déjà transparent) : une seule
# mascotte pour tout EleveAI. Le jour où le concours logo élèves donne un
# margouillat officiel, on ne change QUE le chemin ci-dessous.

from pathlib import Path

from manim import ImageMobject

# manim/mascotte.py → racine du dépôt = parents[1]
TI_MARGO = Path(__file__).resolve().parents[1] / "public" / "cahier-vacances" / "ti-margo.png"

# Hauteur de base à l'écran (en unités Manim, cadre = 8 de haut).
# add_mascotte() multiplie par son `scale` : 0.5 → ~1.4 de haut dans un coin.
HAUTEUR_BASE = 2.8


class MascotteMargouillat(ImageMobject):
    """Ti-Margo, prêt à poser dans un coin de l'écran."""

    def __init__(self, **kwargs):
        super().__init__(str(TI_MARGO), **kwargs)
        self.height = HAUTEUR_BASE
