# volume_6e_commun.py
# EleveAI — Maths 6e — série « VOLUME ET SOLIDES » (15/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux 9 paysages volume_{unite,compter,comparer,assemblage,defi} (notion volume_solide)
# et vision_{vues,representation,patron_pave,defi} (notion vision_espace).
# Base : manim/scripts/cm1/solides_cm1_commun.py (→ ce2/solides_ce2_commun.py) IMPORTÉE sans la modifier :
#   Solide en cavalière (arêtes cachées en pointillés), cube, pave, pyramide, Patron / PatronLibre /
#   patron_pave, Empilement (cubes opaques du fond vers l'avant, fantome, boite), pave_cubes.
# Ici :
#   · cm3(n) / cm2(n) : « 18 cm³ », « 24 cm² » (petit 3, petit 2) ;
#   · vue_grille : une vue (face, dessus, droite) = des carreaux ;
#   · les personnages-métiers du lot : Mathis, Yanis, Léna, Manon, Clara, Samuel, Lina, Jeanne, Enzo ;
#   · base PaysageVolume6e (identité « Maths 6e — EleveAI »).
# Voix : manim/voix/6e-<volume|vision>-<ép>.json ; marques : manim/scripts/6e/<volume|vision>_<ép>_marques.json
# (python manim/scripts/6e/volume_marques_6e.py volume:<ép> vision:<ép>, ⛔ jamais sans argument).

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from solides_cm1_commun import *  # noqa: E402,F401,F403
from solides_cm1_commun import _rot, _normale  # noqa: E402,F401

_EmpilementCM1 = Empilement  # noqa: F405


class Empilement(_EmpilementCM1):
    """L'Empilement du CM1, mais pp() suit les déplacements : shift (donc move_to, next_to, align_to)
    recale aussi l'origine _dec (le bug du 15/11 : la cote « 1 m » restait à l'ancienne place)."""

    def shift(self, *vecteurs):
        super().shift(*vecteurs)
        if hasattr(self, "_dec"):
            self._dec = self._dec + sum(np.array(v, dtype=float) for v in vecteurs)
        return self

VOL_C = "#22c55e"     # le volume (cubes verts)
AIRE_C = "#38bdf8"    # l'aire (carré à plat, bleu)
LONG_C = "#f97316"    # la longueur (trait orange)


def cm3(n="", u="cm"):
    """« 18 cm³ » (u = "cm" ou "m")."""
    return f"{n} {u}³".strip()


def cm2(n="", u="cm"):
    return f"{n} {u}²".strip()


def vue_grille(cases, c=0.5, centre=ORIGIN, couleur="#38bdf8", sw=3, trait=WHITE):
    """Une vue (de face, de dessus, de droite) : des carreaux aux positions (col, ligne)
    (ligne 0 en bas). Renvoie un VGroup ; .carreaux[(col, ligne)]."""
    g = VGroup()
    g.carreaux = {}
    for (x, y) in cases:
        s = Square(side_length=c, fill_color=couleur, fill_opacity=0.85, stroke_color=trait, stroke_width=sw) \
            .move_to(P(x * c, y * c))
        g.carreaux[(x, y)] = s
        g.add(s)
    g.move_to(centre)
    return g


def fleche_cote(a, b, texte, fs=26, couleur=WHITE, cote=DOWN, buff=0.18):
    """Une cote : double flèche de a à b + son texte."""
    f = DoubleArrow(a, b, buff=0, color=couleur, stroke_width=3, tip_length=0.14, max_tip_length_to_length_ratio=0.2)
    t = Text(texte, font_size=fs, color=couleur).next_to(f, cote, buff=buff)
    return VGroup(f, t)


# ── Personnages-métiers du lot ─────────────────────────────────────────────

def mathis(s=1.0):
    """Mathis, maître-nageur : t-shirt rouge, sifflet."""
    p = visage(personne(peau="#c68642", tenue="#dc2626", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Line(c + P(-r * 0.5, -r * 1.1), c + P(0, -r * 2.2), color=WHITE, stroke_width=3),
          Line(c + P(r * 0.5, -r * 1.1), c + P(0, -r * 2.2), color=WHITE, stroke_width=3),
          RoundedRectangle(width=r * 0.6, height=r * 0.32, corner_radius=r * 0.1, fill_color="#facc15",
                           fill_opacity=1, stroke_width=0).move_to(c + P(0, -r * 2.35)))
    return p


def yanis(s=1.0):
    """Yanis, logisticien : gilet jaune fluo à bandes, casque blanc."""
    p = visage(personne(peau="#8d5524", tenue="#facc15", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    for dy in (2.4, 3.1):
        p.add(Rectangle(width=r * 2.0, height=r * 0.18, fill_color="#9ca3af", fill_opacity=1, stroke_width=0)
              .move_to(c + DOWN * r * dy))
    p.add(chapeau(p, "#f8fafc"))
    return p


def lena(s=1.0):
    """Léna, ingénieure de l'eau : tenue bleue, goutte d'eau à côté."""
    p = visage(personne(peau="#e0ac69", tenue="#0ea5e9", cheveux="#78350f", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    goutte = VGroup(Circle(radius=r * 0.4, fill_color="#38bdf8", fill_opacity=1, stroke_width=0),
                    Triangle(fill_color="#38bdf8", fill_opacity=1, stroke_width=0).scale(r * 0.42)
                    .shift(UP * r * 0.42))
    p.add(goutte.move_to(c + P(r * 1.9, -r * 1.6)))
    return p


def manon(s=1.0):
    """Manon, menuisière : tablier marron, crayon sur l'oreille."""
    p = visage(personne(peau="#f1c27d", tenue="#16a34a", cheveux="#b45309", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(RoundedRectangle(width=r * 1.5, height=r * 1.7, corner_radius=r * 0.1, fill_color="#92400e",
                           fill_opacity=1, stroke_width=0).move_to(c + DOWN * r * 3.0))
    p.add(Line(c + P(r * 0.7, r * 0.5), c + P(r * 1.4, r * 0.1), color="#facc15", stroke_width=6))
    return p


def clara(s=1.0):
    """Clara, pâtissière-chocolatière : veste blanche, toque."""
    p = visage(personne(peau="#8d5524", tenue="#f8fafc", cheveux="#111827", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Rectangle(width=r * 1.6, height=r * 0.5, fill_color="#ffffff", fill_opacity=1, stroke_width=0)
          .move_to(c + P(0, r * 1.05)),
          Circle(radius=r * 0.75, fill_color="#ffffff", fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 1.65)))
    for dy in (2.3, 2.9):
        p.add(Dot(c + P(0, -r * dy), radius=r * 0.1, color="#78350f"))
    return p


def samuel(s=1.0):
    """Samuel, architecte : chemise bleu nuit, rouleau de plans sous le bras."""
    p = visage(personne(peau="#5c3a21", tenue="#1e3a8a", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(RoundedRectangle(width=r * 0.45, height=r * 2.2, corner_radius=r * 0.2, fill_color="#e0f2fe",
                           fill_opacity=1, stroke_color="#0284c7", stroke_width=2)
          .rotate(0.5).move_to(c + P(r * 1.4, -r * 2.6)))
    return p


def lina(s=1.0):
    """Lina, animatrice 3D : sweat violet, casque audio, stylet."""
    p = visage(personne(peau="#c68642", tenue="#7c3aed", cheveux="#111827", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Arc(radius=r * 1.12, start_angle=PI * 0.05, angle=PI * 0.9, stroke_color="#111827", stroke_width=5)
          .move_to(c + UP * r * 0.55))
    for x in (-1, 1):
        p.add(RoundedRectangle(width=r * 0.35, height=r * 0.6, corner_radius=r * 0.12, fill_color="#22d3ee",
                               fill_opacity=1, stroke_width=0).move_to(c + P(x * r * 1.05, -r * 0.05)))
    return p


def jeanne(s=1.0):
    """Jeanne, designer d'emballages : tenue orange, une boîte en carton à la main."""
    p = visage(personne(peau="#f1c27d", tenue="#ea580c", cheveux="#78350f", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(RoundedRectangle(width=r * 1.0, height=r * 0.8, corner_radius=r * 0.05, fill_color=CARTON,
                           fill_opacity=1, stroke_color="#78350f", stroke_width=2).move_to(c + P(r * 1.9, -r * 1.9)))
    return p


def enzo(s=1.0):
    """Enzo, dessinateur-projeteur : pull vert sapin, lunettes, crayon."""
    p = visage(personne(peau="#e0ac69", tenue="#065f46", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(VGroup(*[Circle(radius=0.22 * r, stroke_color="#111827", stroke_width=3).move_to(c + P(x * r, -0.18 * r))
                   for x in (-0.36, 0.36)]))
    p.add(Line(c + P(r * 1.5, -r * 1.4), c + P(r * 2.1, -r * 2.4), color="#facc15", stroke_width=7))
    return p


class PaysageVolume6e(PaysageSolidesCM1):
    identite = "Maths 6e — EleveAI"
    ceinture = "jaune"

    def rep_bas(self, i, morceaux, fs=32, x=-6.2, y0=-1.6, pas=0.62, buff=0.24):
        """Comme le modèle, mais au moins une vraie espace entre les morceaux (à 0,14 on lisait
        « 3 couches :3 × 5= 15 »)."""
        return super().rep_bas(i, morceaux, fs=fs, x=x, y0=y0, pas=pas, buff=max(buff, 0.24 * fs / 32))

    def ligne(self, morceaux, fs=40, buff=0.2):
        """La ligne de morceaux, posés sur la MÊME ligne d'écriture (centrés, « 8 cm³ » et
        « = 8 petits cubes » flottaient : l'exposant d'un côté, le jambage de l'autre)."""
        lg = super().ligne(morceaux, fs, buff)
        bases = [base_ecriture(m) for m in lg]
        if len(lg) > 1 and bases[0] is not None:
            for m, b in zip(lg[1:], bases[1:]):
                if b is not None:
                    m.shift(UP * (bases[0] - b))
        return lg


def base_ecriture(t):
    """Le bas des lettres et chiffres sans jambage d'un Text (ni exposant) ; None sinon."""
    if not isinstance(t, Text):
        return None
    chars = [c for c in t.text if not c.isspace()]
    if len(chars) != len(t.submobjects):
        return None
    bas = [g.get_bottom()[1] for c, g in zip(chars, t.submobjects)
           if (c.isalpha() and c not in "gjpqyçQ") or c in "0123456789"]
    return max(bas) if bas else None
