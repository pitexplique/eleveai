# stats_lycee_i1_commun.py
# EleveAI — série « Statistiques », LYCÉE, lot I1 (24/10/2026) : les OUTILS
# COMMUNS des épisodes 1re tronc commun 07-rep-barres, 08-rep-circulaire,
# 09-rep-choisir, 10-rep-commenter, 18-filtre-effectif et STMG 03-boite,
# 06-tab-marges. Pas de scène ici.
#
# ⭐ Repris SANS LES MODIFIER : stats_lycee_h1_commun.py (question-pause,
#   caser(), contrôle BORDS=1, PaysageLycee / ShortLycee) et, au besoin,
#   stats_lycee_h2_commun.py (tableau croisé avec marges : croise()).
# ⭐ Ajouté ici :
#   · MotsCalesI1 : les marques de calage sont lues à côté du SCRIPT DE LA
#     SCÈNE (manim/scripts/premiere/ ou manim/scripts/stmg/), et non à côté de
#     ce module : les épisodes de 1re ont leurs propres scripts.
#   · DemiCamembert : le diagramme SEMI-circulaire (demi-disque = 100 %, 180°).
#   · AxeBoite + Boite : le diagramme en boîte du coach (`diagramme_boite`,
#     lib/canvas/DiagrammeBoiteCanvas.tsx) : carte blanche, axe gradué, boîte
#     bleue (#2563eb, fond #dbeafe), moustaches et bouts ardoise, MÉDIANE ROUGE.
# Les figures du coach viennent de manim/canvas_stats.py (NON modifié).

import inspect
import json
import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F401,F403
from canvas_stats import COULEURS_CAMEMBERT, GRIS_NOM, pourcentages_entiers  # noqa: E402,F401

BLEU_BOITE, FOND_BOITE, ROUGE_MED, ARDOISE = "#2563eb", "#dbeafe", "#dc2626", "#0f172a"
VERT_BOITE, FOND_VERT = "#059669", "#d1fae5"


class MotsCalesI1:
    """Les marques de calage, lues dans le dossier du script de la scène."""

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = Path(inspect.getfile(type(self))).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8"))
        return self._cache_marques


class PaysageI1(MotsCalesI1, PaysageLycee):
    """La paysage du lot I1 : celle du lot H1, marques à côté du script."""

    def pause_defi(self, y=-1.2):
        g = VGroup(icone_pause(0.36), self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        return self.col(g, y)


class ShortI1(MotsCalesI1, ShortLycee):
    """Le short du lot I1."""


# ── le diagramme semi-circulaire ────────────────────────────────────────────

class DemiCamembert(VGroup):
    """Le demi-disque (180° = 100 %), de 9 h à 3 h dans le sens des aiguilles,
    comme le camembert du coach. Morceaux : .parts[i] .textes[i] .carte .titre.
    Gestes : apparaitre(), focus(i), rallumer()."""

    def __init__(self, etiquettes, valeurs, rayon=2.0, couleurs=None, valeurs_parts=True, titre=None, fs=28,
                 centre=ORIGIN, **kw):
        super().__init__(**kw)
        couleurs = couleurs or [COULEURS_CAMEMBERT[i % 8] for i in range(len(valeurs))]
        somme = sum(valeurs)
        self.parts, self.textes = VGroup(), VGroup()
        self.ref_c = Dot(ORIGIN, radius=0.01, fill_opacity=0, stroke_width=0)
        debut = PI
        for i, v in enumerate(valeurs):
            ang = v / somme * PI
            s = Sector(radius=rayon, start_angle=debut, angle=-ang, fill_color=couleurs[i], fill_opacity=1,
                       stroke_color=WHITE, stroke_width=4)
            m = debut - ang / 2
            d = np.array([math.cos(m), math.sin(m), 0.0])
            lignes = [texte(etiquettes[i], fs, NUIT)]
            if valeurs_parts:
                lignes.append(texte(f"{fr(v)} %", fs - 2, NUIT))
            t = VGroup(*lignes).arrange(DOWN, buff=0.06)
            for x in t:
                x.set_stroke(WHITE, width=5, background=True)
            if ang < 0.5:
                t.move_to(d * (rayon + 0.3), aligned_edge=LEFT if d[0] >= 0 else RIGHT)
            else:
                t.move_to(d * rayon * 0.62)
            self.parts.add(s)
            self.textes.add(t)
            debut -= ang
        self.base = Line(P(-rayon - 0.15, 0), P(rayon + 0.15, 0), color=NUIT, stroke_width=4)
        self.ref_r = Line(ORIGIN, P(rayon, 0), stroke_width=0)
        self.add(self.parts, self.base, self.textes, self.ref_c, self.ref_r)
        self.titre = None
        if titre:
            self.titre = texte(titre, int(fs * 1.05), NUIT).next_to(VGroup(*self.submobjects), UP, buff=0.3)
            self.add(self.titre)
        self.carte = carte_autour(VGroup(*self.submobjects), marge=0.35)
        self.add_to_back(self.carte)
        self.move_to(centre)

    @property
    def centre(self):
        return self.ref_c.get_center()

    def _rayon(self):
        return np.linalg.norm(self.ref_r.get_end() - self.ref_r.get_start())

    def apparaitre(self, run_time=1.4, lag=0.35):
        c = self.centre
        return LaggedStart(*[AnimationGroup(GrowFromPoint(p, c), FadeIn(t)) for p, t in zip(self.parts, self.textes)],
                           lag_ratio=lag, run_time=run_time)

    def focus(self, i, opacite=0.3):
        return AnimationGroup(*[p.animate.set_fill(opacity=1 if j == i else opacite)
                                .set_stroke(AMBRE if j == i else WHITE, width=10 if j == i else 4)
                                for j, p in enumerate(self.parts)])

    def rallumer(self):
        return AnimationGroup(*[p.animate.set_fill(opacity=1).set_stroke(WHITE, width=4) for p in self.parts])


def arc_angle(centre, r, debut, angle, couleur=AMBRE, txt=None, fs=30):
    """Un arc d'angle (en radians, sens des aiguilles si angle < 0), avec son
    étiquette en degrés posée au milieu de l'arc, dehors."""
    a = Arc(radius=r, start_angle=debut, angle=angle, arc_center=centre, color=couleur, stroke_width=7)
    if not txt:
        return a
    m = debut + angle / 2
    d = np.array([math.cos(m), math.sin(m), 0.0])
    t = Text(txt, font_size=fs, color=couleur, weight=BOLD).set_stroke(WHITE, 5, background=True)
    t.move_to(centre + d * (r + 0.42))
    return VGroup(a, t)


# ── le diagramme en boîte du coach ──────────────────────────────────────────

class AxeBoite(VGroup):
    """L'axe horizontal gradué de la boîte : de vmin à vmax, un nombre tous les
    `pas`, longueur L (unités Manim). .x(v) = le point de l'axe à la valeur v
    (suit les déplacements). Morceaux : .ligne .traits .nombres {v} .nom."""

    def __init__(self, vmin, vmax, pas, L=9.0, fs=26, nom=None, **kw):
        super().__init__(**kw)
        self.vmin, self.vmax, self.L = vmin, vmax, L
        self.ref = Line(P(0, 0), P(L, 0), stroke_width=0)
        self.ligne = Line(P(-0.1, 0), P(L + 0.1, 0), color=NUIT, stroke_width=4)
        self.traits, self.nombres = VGroup(), {}
        v = vmin
        while v <= vmax + 1e-9:
            x = (v - vmin) / (vmax - vmin) * L
            self.traits.add(Line(P(x, 0), P(x, -0.15), color=NUIT, stroke_width=4))
            self.nombres[v] = texte(v, fs, ENCRE).move_to(P(x, -0.38))
            v += pas
        self.add(self.ref, self.ligne, self.traits, *self.nombres.values())
        self.nom = None
        if nom:
            self.nom = texte(nom, fs - 2, GRIS_NOM).next_to(VGroup(*self.nombres.values()), DOWN, buff=0.15)
            self.add(self.nom)

    def x(self, v):
        a, b = self.ref.get_start(), self.ref.get_end()
        return a + (b - a) * (v - self.vmin) / (self.vmax - self.vmin)


class Boite(VGroup):
    """La boîte du coach au-dessus de l'axe ax, à la hauteur y (au-dessus de
    l'axe). Morceaux : .moust_g .moust_d .bout_g .bout_d .corps .med.
    nombres(v) : l'étiquette d'un des cinq nombres, au-dessus de la boîte,
    reliée par un pointillé (rouge pour la médiane). Le tout suit ax."""

    def __init__(self, ax, mini, q1, me, q3, maxi, dy=1.0, h=0.75, couleur=BLEU_BOITE, fond=FOND_BOITE,
                 label=None, fs=26, **kw):
        super().__init__(**kw)
        self.ax, self.v = ax, dict(mini=mini, q1=q1, me=me, q3=q3, maxi=maxi)
        self.fs, self.couleur = fs, couleur
        X = lambda v: ax.x(v)[0]  # noqa: E731
        y = ax.x(mini)[1] + dy
        self.moust_g = Line(P(X(mini), y), P(X(q1), y), color=ARDOISE, stroke_width=4)
        self.moust_d = Line(P(X(q3), y), P(X(maxi), y), color=ARDOISE, stroke_width=4)
        self.bout_g = Line(P(X(mini), y - h * 0.32), P(X(mini), y + h * 0.32), color=ARDOISE, stroke_width=6)
        self.bout_d = Line(P(X(maxi), y - h * 0.32), P(X(maxi), y + h * 0.32), color=ARDOISE, stroke_width=6)
        self.corps = Rectangle(width=max(0.05, X(q3) - X(q1)), height=h, fill_color=fond, fill_opacity=1,
                               stroke_color=couleur, stroke_width=5).move_to(P((X(q1) + X(q3)) / 2, y))
        self.med = Line(P(X(me), y - h / 2), P(X(me), y + h / 2), color=ROUGE_MED, stroke_width=8)
        self.add(self.moust_g, self.moust_d, self.bout_g, self.bout_d, self.corps, self.med)
        self.label = None
        if label:
            self.label = texte(label, fs, couleur).next_to(self.bout_g, LEFT, buff=0.25)
            self.add(self.label)

    @property
    def y(self):
        return self.corps.get_center()[1]

    @property
    def h(self):
        return self.corps.height

    def _k(self):
        """Le facteur d'échelle actuel (la figure a pu être réduite par caser)."""
        return np.linalg.norm(self.ax.ref.get_end() - self.ax.ref.get_start()) / self.ax.L

    def nombre(self, cle, etage=0, couleur=None):
        """L'étiquette d'un des cinq nombres (cle : mini q1 me q3 maxi), au-dessus
        de la boîte (étage 0 ou 1), avec son pointillé. Renvoyée, non ajoutée."""
        v = self.v[cle]
        x = self.ax.x(v)[0]
        haut = self.y + self.h / 2
        rouge = cle == "me"
        c = couleur or (ROUGE_MED if rouge else ARDOISE)
        k = self._k()
        t = texte(v, self.fs, c).set_stroke(WHITE, 5, background=True).scale(k)
        t.move_to(P(x, haut + (0.32 + etage * 0.42) * k))
        pt = DashedLine(P(x, t.get_bottom()[1] - 0.04), P(x, haut), color=ROUGE_MED if rouge else "#94a3b8",
                        stroke_width=3, dash_length=0.06)
        return VGroup(pt, t)

    def vers_axe(self, cle, couleur=AMBRE):
        """Le pointillé d'un des cinq nombres jusqu'à l'axe gradué (lecture)."""
        x = self.ax.x(self.v[cle])
        return DashedLine(P(x[0], self.y - self.h / 2), x, color=couleur, stroke_width=5, dash_length=0.1)

    def accolade_dessus(self, a, b, txt, couleur=None, fs=None, monte=0.0):
        """Une accolade AU-DESSUS de la boîte (de a à b), son texte au-dessus."""
        c = couleur or self.couleur
        k = self._k()
        xa, xb = self.ax.x(self.v[a])[0], self.ax.x(self.v[b])[0]
        yb = self.y + self.h / 2 + (0.12 + monte) * k
        br = VMobject(stroke_color=c, stroke_width=5).set_points_as_corners(
            [P(xa, yb), P(xa, yb + 0.15 * k), P(xb, yb + 0.15 * k), P(xb, yb)])
        t = texte(txt, fs or self.fs, c).set_stroke(WHITE, 5, background=True).scale(k).next_to(br, UP, buff=0.08)
        return VGroup(br, t)

    def accolade(self, a, b, txt, couleur=None, fs=None):
        """Une accolade SOUS la boîte, de la valeur a à la valeur b, et son texte."""
        c = couleur or self.couleur
        xa, xb = self.ax.x(self.v[a])[0], self.ax.x(self.v[b])[0]
        k = self._k()
        yb = self.y - self.h / 2 - 0.12 * k
        br = VMobject(stroke_color=c, stroke_width=5).set_points_as_corners(
            [P(xa, yb), P(xa, yb - 0.15 * k), P(xb, yb - 0.15 * k), P(xb, yb)])
        t = texte(txt, fs or self.fs, c).set_stroke(WHITE, 5, background=True).scale(k).next_to(br, DOWN, buff=0.08)
        return VGroup(br, t)


def carte_boite(ax, boites, titre=None, fs=28):
    """Pose une carte blanche (et le titre du coach, dedans en haut) autour de
    l'axe et des boîtes. Renvoie (groupe, carte, titre)."""
    contenu = VGroup(ax, *boites)
    t = None
    if titre:
        t = texte(titre, fs, NUIT).next_to(contenu, UP, buff=1.45)
        contenu.add(t)
    c = carte_autour(contenu, marge=0.35)
    return VGroup(c, contenu), c, t
