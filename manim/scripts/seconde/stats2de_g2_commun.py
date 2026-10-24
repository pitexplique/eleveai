# stats2de_g2_commun.py
# EleveAI — Maths 2de — série « Statistiques », lycée, LOT G2 (24/10/2026) :
# 06-ecart-interquartile, 07-linearite-moyenne, 08-ecart-type, 09-interpreter.
# Les OUTILS COMMUNS du lot. Pas de scène ici.
#
# ⭐ IMPORTE, sans le modifier, le module du lot G1
#   (manim/scripts/seconde/stats2de_g1_commun.py : Paysage2de, Short2de, la
#   QUESTION-PAUSE à compte à rebours 5 s / 3 s, mmss, P, AxePoints…).
# ⭐ AJOUTÉ ICI (copié du lot G1, stats_mediane_quartiles.py, pour ne pas
#   dépendre d'un fichier d'épisode) : Boite (le diagramme en boîte du coach),
#   puce (une valeur dans une pastille) ; et, propres au lot G2 : xbarre (le x̄
#   DESSINÉ : un x et sa barre, Pango ne pose pas bien le macron combinant),
#   tube (un pluviomètre), bobine (une bobine de film), thermometre.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g1_commun import *  # noqa: E402,F401,F403
from stats2de_g1_commun import Paysage2de, Short2de, mmss  # noqa: E402,F401

GRIS = "#cbd5e1"
VIOLET = "#c4b5fd"


def puce(v, w=0.95, h=0.62, fs=30, couleur=BLEU_CALCUL):
    fond = RoundedRectangle(width=w, height=h, corner_radius=0.12, fill_color="#1e293b", fill_opacity=1,
                            stroke_color=couleur, stroke_width=3)
    return VGroup(fond, Text(str(v), font_size=fs, color=WHITE).move_to(fond))


class Boite(VGroup):
    """Le diagramme en boîte du coach, posé au-dessus d'un axe (axe.x(v))."""

    def __init__(self, axe, mini, q1, me, q3, maxi, y, h=0.8, couleur="#2563eb", fond="#bfdbfe", **kw):
        super().__init__(**kw)
        X = lambda v: axe.x(v)[0]  # noqa: E731
        self.moust_g = Line(P(X(mini), y), P(X(q1), y), color=couleur, stroke_width=5)
        self.moust_d = Line(P(X(q3), y), P(X(maxi), y), color=couleur, stroke_width=5)
        self.bouts = VGroup(Line(P(X(mini), y - h / 3), P(X(mini), y + h / 3), color=couleur, stroke_width=5),
                            Line(P(X(maxi), y - h / 3), P(X(maxi), y + h / 3), color=couleur, stroke_width=5))
        self.boite = Rectangle(width=max(0.02, X(q3) - X(q1)), height=h, fill_color=fond, fill_opacity=0.9,
                               stroke_color=couleur, stroke_width=5).move_to(P((X(q1) + X(q3)) / 2, y))
        self.med = Line(P(X(me), y - h / 2), P(X(me), y + h / 2), color=NUIT, stroke_width=7)
        self.add(self.moust_g, self.moust_d, self.bouts, self.boite, self.med)


def xbarre(fs=40, couleur=WHITE):
    """x̄ dessiné : la lettre x et une barre au-dessus."""
    x = Text("x", font_size=fs, color=couleur, slant=ITALIC)
    b = Line(LEFT, RIGHT, color=couleur, stroke_width=max(2, fs / 14)).set_width(x.width * 1.05)
    b.next_to(x, UP, buff=fs / 400)
    return VGroup(x, b)


def avec_xbarre(morceaux, fs=40, buff=0.15):
    """Une ligne de morceaux (texte, couleur) où le texte « x̄ » est dessiné."""
    g = VGroup()
    for s, c in morceaux:
        g.add(xbarre(fs, c) if s == "x̄" else Text(s, font_size=fs, color=c))
    g.arrange(RIGHT, buff=buff)
    return g


def tube(h_max=2.0, w=0.32, couleur=BLEU_CALCUL):
    """Un pluviomètre vide : un tube gradué (on le remplit avec eau())."""
    verre = RoundedRectangle(width=w, height=h_max, corner_radius=w * 0.3, stroke_color="#94a3b8",
                             stroke_width=3, fill_opacity=0)
    return verre


def eau(verre, frac, couleur=BLEU_CALCUL):
    """L'eau dans un tube, à la fraction frac de sa hauteur."""
    h = max(0.02, verre.height * frac)
    r = Rectangle(width=verre.width * 0.82, height=h, fill_color=couleur, fill_opacity=0.85, stroke_width=0)
    return r.move_to(verre.get_bottom() + UP * (h / 2 + 0.02))


def bobine(r=0.6, couleur="#94a3b8"):
    """Une bobine de film : un disque et six trous."""
    d = Circle(radius=r, stroke_color=couleur, stroke_width=5, fill_color="#1e293b", fill_opacity=1)
    trous = VGroup(*[Circle(radius=r * 0.2, stroke_color=couleur, stroke_width=3).move_to(
        r * 0.55 * np.array([np.cos(k * TAU / 6), np.sin(k * TAU / 6), 0])) for k in range(6)])
    axe = Dot(radius=r * 0.1, color=couleur)
    return VGroup(d, trous, axe)


def thermometre(h=2.2, couleur=ORANGE_RETENUE):
    """Un thermomètre vide (tige + bulbe), sans liquide."""
    tige = RoundedRectangle(width=0.22, height=h, corner_radius=0.11, stroke_color="#94a3b8", stroke_width=3)
    bulbe = Circle(radius=0.2, stroke_color="#94a3b8", stroke_width=3, fill_color=couleur,
                   fill_opacity=1).next_to(tige, DOWN, buff=-0.08)
    return VGroup(tige, bulbe)


class Short2deG2(Short2de):
    """Short2de du lot G1, plus une option : les 3 choix EN COLONNE (cartes
    larges) quand un choix est un mot long (« Strasbourg »). Le reste est la
    question_short du lot G1, recopiée (compte à rebours 3 s)."""

    def question_short(self, cle_q, cle_r, question, choix, bonne, explication, y0=2.0, fs_q=28,
                       mots=("A :", "B :", "C :"), geste=None, avant_choix=None, efface=(), colonne=False):
        if not colonne:
            return super().question_short(cle_q, cle_r, question, choix, bonne, explication, y0=y0, fs_q=fs_q,
                                          mots=mots, geste=geste, avant_choix=avant_choix, efface=efface)
        t0 = self.renderer.time
        self.dire(cle_q)
        pp = picto_pause(0.36)
        tit = Text("Question !", font_size=34, color=ORANGE_RETENUE, weight=BOLD)
        entete = VGroup(pp, tit).arrange(RIGHT, buff=0.16).move_to(P(-0.4, y0))
        self.au_mot("Question")
        self.play(FadeIn(pp, scale=1.4), Write(tit), *[FadeOut(m) for m in efface], run_time=0.5)
        q = self.borne(VGroup(*[Text(l, font_size=fs_q, color=WHITE) for l in question]).arrange(DOWN, buff=0.08))
        q.next_to(entete, DOWN, buff=0.22).set_x(0)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        if avant_choix is not None:
            avant_choix()
        cartes = VGroup(*[self.carte_choix(l, c, 3.4, fs=40).scale(0.72) for l, c in zip("ABC", choix)])
        cartes.arrange(DOWN, buff=0.1).next_to(q, DOWN, buff=0.22).set_x(0)
        for c, m in zip(cartes, mots):
            self.au_mot(m)
            self.play(FadeIn(c, shift=UP * 0.2), run_time=0.3)
        self.au_mot("Mets pause")
        pause = VGroup(Text("Mets pause,", font_size=22, color=ORANGE_RETENUE),
                       Text("et choisis !", font_size=22, color=ORANGE_RETENUE)).arrange(DOWN, aligned_edge=LEFT,
                                                                                         buff=0.04)
        pause.next_to(pp, RIGHT, buff=0.16)
        self.play(FadeOut(tit, shift=UP * 0.12), FadeIn(pause, shift=UP * 0.12), run_time=0.3)
        self.attendre_voix(marge=0.15)
        rb = self.rebours(P(pause.get_right()[0] + 0.45, y0), rayon=0.26)
        self.dire(cle_r)
        bon = cartes[bonne]
        autres = [c for i, c in enumerate(cartes) if i != bonne]
        self.play(FadeOut(rb), FadeOut(pause), FadeIn(tit), *[c.animate.set_opacity(0.3) for c in autres],
                  bon[0].animate.set_fill(VERT_CARTE).set_stroke(VERT_OK, width=6),
                  bon[1].animate.set_fill(VERT_OK), run_time=0.4)
        self.play(bon.animate.scale(1.12), run_time=0.22)
        self.play(bon.animate.scale(1 / 1.12), run_time=0.22)
        gestes = list(geste()) if geste is not None else []
        gestes.append(FadeOut(q))
        bas = q.get_top()[1]
        expl = VGroup()
        for ligne, couleur, extrait in explication:
            if extrait:
                self.au_mot(extrait)
            t = self.borne(Text(ligne, font_size=26, color=couleur))
            t.move_to(P(0, bas - t.height / 2))
            self.play(FadeIn(t, shift=UP * 0.12), *gestes, run_time=0.5 if gestes else 0.35)
            gestes = []
            expl.add(t)
            bas = t.get_bottom()[1] - 0.1
        self.attendre_voix(marge=0.6)
        self.play(FadeOut(VGroup(entete, cartes, expl)), *[FadeIn(m) for m in efface], run_time=0.4)
        return t0
