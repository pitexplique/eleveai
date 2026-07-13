# Mascotte des vidéos EleveAI : le margouillat (signe d'EleveAI, La Réunion).
# ⚠️ JAMAIS le π : c'est la signature visuelle de 3Blue1Brown/Manim, pas la nôtre.
# Dessin provisoire : le concours logo élèves (/concours-logo) fournira peut-être
# le margouillat officiel — on ne changera alors QUE ce fichier, toutes les
# vidéos suivantes l'adopteront.

from manim import *

VERT_CORPS = "#4ADE80"
VERT_TRAIT = "#15803D"
NUIT = "#0F172A"


class MascotteMargouillat(VGroup):
    """Margouillat stylisé, vu de dessus, posé sur le mur comme à la maison."""

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        queue = VMobject()
        queue.set_points_smoothly([
            [0.00, -0.60, 0],
            [0.22, -0.98, 0],
            [0.55, -1.12, 0],
            [0.76, -0.96, 0],
            [0.80, -0.72, 0],
        ])
        queue.set_stroke(VERT_CORPS, width=7)

        pattes = VGroup(
            self._patte([-0.44, 0.40, 0], 150),
            self._patte([0.44, 0.40, 0], 30),
            self._patte([-0.44, -0.32, 0], 210),
            self._patte([0.44, -0.32, 0], -30),
        )

        corps = Ellipse(width=0.95, height=1.30)
        corps.set_fill(VERT_CORPS, opacity=1).set_stroke(VERT_TRAIT, width=3)

        tete = Circle(radius=0.40)
        tete.set_fill(VERT_CORPS, opacity=1).set_stroke(VERT_TRAIT, width=3)
        tete.move_to([0, 0.92, 0])

        sourire = ArcBetweenPoints([-0.13, 0.76, 0], [0.13, 0.76, 0], angle=1.0)
        sourire.set_stroke(VERT_TRAIT, width=3)

        yeux = VGroup(self._oeil([-0.17, 1.04, 0]), self._oeil([0.17, 1.04, 0]))

        self.add(queue, pattes, corps, tete, sourire, yeux)

    def _oeil(self, pos):
        blanc = Circle(radius=0.125).set_fill(WHITE, opacity=1)
        blanc.set_stroke(VERT_TRAIT, width=2).move_to(pos)
        pupille = Dot(radius=0.055, color=NUIT).move_to([pos[0], pos[1] + 0.02, 0])
        return VGroup(blanc, pupille)

    def _patte(self, attache, angle_deg):
        a = np.array(attache, dtype=float)
        u = np.array([np.cos(angle_deg * DEGREES), np.sin(angle_deg * DEGREES), 0.0])
        bout = a + 0.32 * u
        segment = Line(a, bout, stroke_width=6, color=VERT_CORPS)
        doigts = VGroup()
        for deviation in (-28, 0, 28):
            v = np.array([
                np.cos((angle_deg + deviation) * DEGREES),
                np.sin((angle_deg + deviation) * DEGREES),
                0.0,
            ])
            doigts.add(Dot(point=bout + 0.12 * v, radius=0.05, color=VERT_CORPS))
        return VGroup(segment, doigts)
