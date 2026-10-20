# proba_probaT_arbre_construire_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Construire un arbre pondéré à partir d'un énoncé ».
# CEINTURE JAUNE. Il AMUSE : au trail, 80 % des coureurs s'entraînent en
# montagne, et parmi eux 75 % finissent. Qui passe en premier sur l'arbre ?
#   · en HAUT la montagne, le sentier, les coureurs qui montent ; les entraînés
#     (maillot orange) ; 6 sur 8 passent l'arche d'arrivée ;
#   · en BAS, EN MÊME TEMPS : les phrases, puis l'arbre du coach qui se construit
#     (entraîné 0,8 / pas 0,2 ; après « entraîné » : finit 0,75) ;
#   · fin : le 0,25 des pas entraînés, « après quelle branche ? »,
#     « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : la branche « ne finit pas » après « entraîné » reste sans
# nombre ; les branches après « pas » se tracent SANS nombre.
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN SEUL rendu suffit,
# copié sous les deux noms (STMG, 1re). Les deux sous-classes existent quand
# même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-arbre-construire-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_arbre_construire_short.py ShortProbaArbreConstruireSTMG -o eleveai-maths-stmg-proba-arbre-construire-short --media_dir manim/scripts/stmg/media-probaT_arbre_construire
# (ShortProbaArbreConstruirePremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/09-arbre-construire/ et
# manim/sorties/premiere-commun/maths/probabilites/09-arbre-construire/
# (eleveai-maths-premiere-commun-proba-arbre-construire-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaT_arbre_construire import P, Arbre, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

import numpy as np  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
ROCHE = "#334155"
ROCHE2 = "#475569"
TERRE = "#A16207"
ENTRAINE = "#F97316"    # maillot des entraînés en montagne
AUTRE = "#38BDF8"
DEPART, ARRIVEE = P(-2.0, 0.3), P(1.35, 1.2)
U = (ARRIVEE - DEPART) / np.linalg.norm(ARRIVEE - DEPART)
NORMALE = np.array([-U[1], U[0], 0.0])


def coureur(couleur, s=1.0):
    tete = Circle(radius=0.065, fill_color="#FDE68A", fill_opacity=1, stroke_width=0).move_to(P(0.02, 0.27))
    corps = Line(P(0, 0.2), P(-0.03, 0.04), color=couleur, stroke_width=7)
    bras = VGroup(Line(P(0, 0.17), P(0.1, 0.1), color=couleur, stroke_width=4),
                  Line(P(0, 0.17), P(-0.1, 0.12), color=couleur, stroke_width=4))
    jambes = VGroup(Line(P(-0.03, 0.04), P(0.07, -0.08), color="#E2E8F0", stroke_width=4),
                    Line(P(-0.03, 0.04), P(-0.11, -0.08), color="#E2E8F0", stroke_width=4))
    return VGroup(corps, bras, jambes, tete).scale(s)


def montagne():
    m1 = Polygon(P(-2.25, 0.05), P(-0.7, 1.8), P(0.8, 0.05), fill_color=ROCHE, fill_opacity=1, stroke_width=0)
    m2 = Polygon(P(-0.2, 0.05), P(1.25, 1.6), P(2.25, 0.05), fill_color=ROCHE2, fill_opacity=1, stroke_width=0)
    n1 = Polygon(P(-1.0, 1.46), P(-0.7, 1.8), P(-0.4, 1.46), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    n2 = Polygon(P(0.98, 1.31), P(1.25, 1.6), P(1.52, 1.31), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    sentier = Line(DEPART + DOWN * 0.08, ARRIVEE + DOWN * 0.08, color=TERRE, stroke_width=10)
    return VGroup(m2, m1, n1, n2, sentier)


def arche():
    g = Line(P(-0.28, 0), P(-0.28, 0.6), color=WHITE, stroke_width=4)
    d = Line(P(0.28, 0), P(0.28, 0.6), color=WHITE, stroke_width=4)
    bande = Rectangle(width=0.75, height=0.2, fill_color=VERT_OK, fill_opacity=1, stroke_width=0).move_to(P(0, 0.62))
    mot = Text("ARRIVÉE", font_size=40, color=BLACK, weight=BOLD).scale_to_fit_width(0.6).move_to(bande)
    return VGroup(g, d, bande, mot).move_to(ARRIVEE + UP * 0.22 + RIGHT * 0.05)


class ShortProbaArbreConstruireBase(Short6e):
    ceinture = "jaune"
    nom_voix = "stmg-premiere-proba-arbre-construire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def bloc(self, lignes, fs=26, y=-0.9, buff=0.12):
        """Des lignes centrées ; chaque ligne est une liste de (texte, couleur)."""
        g = VGroup(*[suite(*[Text(tx, font_size=fs, color=c) for tx, c in l], buff=0.1) for l in lignes])
        g.arrange(DOWN, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : la montagne, 80 %, 75 % ──
        self.dire("00-accroche")
        titre = self.grand("Le trail", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        mont = montagne()
        couleurs = [ENTRAINE, ENTRAINE, AUTRE, ENTRAINE, ENTRAINE, ENTRAINE, AUTRE, ENTRAINE, ENTRAINE, ENTRAINE]
        gens = VGroup()
        for i, c in enumerate(couleurs):
            r = coureur(WHITE, 0.9)
            r.move_to(DEPART + U * (0.13 * i) + NORMALE * (0.07 if i % 2 else -0.05) + UP * 0.12)
            r.couleur = c
            gens.add(r)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(mont), run_time=0.7)
        self.play(FadeIn(gens, shift=RIGHT * 0.3), run_time=0.4)
        self.play(gens.animate.shift(U * 0.45), run_time=1.0, rate_func=linear)
        # ils continuent de monter, doucement, pendant que la voix parle
        gens.add_updater(lambda m, dt: m.shift(U * 0.07 * dt))
        self.au_mot("80 %")
        l0 = self.bloc([[("80 %", JAUNE_TITRE), ("s'entraînent", WHITE)], [("en montagne", ENTRAINE)]], 30, -0.55)
        oranges = [r for r in gens if r.couleur == ENTRAINE]
        self.play(FadeIn(l0, shift=UP * 0.15),
                  *[r[0].animate.set_color(ENTRAINE) for r in oranges], *[r[1].animate.set_color(ENTRAINE)
                                                                          for r in oranges],
                  *[r[0].animate.set_color(AUTRE) for r in gens if r.couleur == AUTRE],
                  *[r[1].animate.set_color(AUTRE) for r in gens if r.couleur == AUTRE], run_time=0.6)
        self.insister(l0[0][0], 1.4, 0.2)
        self.au_mot("parmi eux")
        l1 = self.bloc([[("parmi eux,", ENTRAINE), ("75 %", JAUNE_TITRE)], [("finissent la course", WHITE)]], 30,
                       -1.5)
        ar = arche()
        self.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(ar, scale=0.6), run_time=0.6)
        self.au_mot("75 %")
        self.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.4)
        self.insister(l1[0][1], 1.4, 0.2)
        self.au_mot("qui passe en premier")
        q = VGroup(self.t("Qui passe en premier ?", 30, ORANGE_RETENUE),
                   self.t("l'entraînement ou l'arrivée", 26, WHITE)).arrange(DOWN, buff=0.12).move_to(P(0, -2.45))
        self.play(FadeIn(q[0], scale=0.6), run_time=0.4)
        self.au_mot("l'entraînement ou")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.4)
        self.insister(q[0], 1.12, 0.2)
        self.attendre_voix(marge=0.1)
        self.oranges, self.gens, self.titre, self.badge, self.mont, self.ar = oranges, gens, titre, badge, mont, ar
        self.vieux = VGroup(l0, l1, q)

        # ── 01 : « parmi eux » : l'entraînement d'abord ; l'arbre se construit ──
        self.dire("01-image")
        oranges, gens = self.oranges, self.gens
        gens.clear_updaters()
        self.au_mot("« Parmi eux »")
        pe = self.bloc([[("« Parmi eux » :", JAUNE_TITRE)], [("d'abord les entraînés", ENTRAINE)]], 32, -0.9)
        self.play(FadeOut(self.vieux, shift=DOWN * 0.2), FadeIn(pe, shift=UP * 0.15), run_time=0.5)
        self.play(*[Indicate(r, color=ENTRAINE, scale_factor=1.5) for r in oranges], run_time=0.7)
        self.au_mot("Premier niveau")
        a = Arbre([("entraîné", False), ("pas", False)], [("finit", False), ("ne finit pas", False)] * 2,
                  dx=1.2, dy1=0.6, dy2=0.4, fs=32, pad_x=0.3, pad_y=0.8, titre=None)
        a.lab[0].shift(RIGHT * 0.1)
        a.move_to(P(0, -1.4))
        n0 = a.nombre(0, "0,8", 26)
        n1 = a.nombre(1, "0,2", 26)
        n2 = a.nombre(2, "0,75", 26)
        self.play(FadeOut(pe, shift=DOWN * 0.2), FadeIn(a.socle()), run_time=0.5)
        self.au_mot("entraîné, 0,8")
        self.play(a.construire(0, 0.5))
        self.play(FadeIn(n0, scale=1.8), run_time=0.3)
        self.au_mot("ou pas, 0,2")
        self.play(a.construire(1, 0.5))
        self.play(FadeIn(n1, scale=1.8), run_time=0.3)
        self.au_mot("après « entraîné »")
        self.play(*a.allume([0, 2, 3]), run_time=0.3)
        self.play(a.construire(2, 0.5), a.construire(3, 0.5))
        self.au_mot("finit, 0,75")
        arrivants = VGroup(*oranges[:6])
        self.play(FadeIn(n2, scale=1.8),
                  LaggedStart(*[r.animate.move_to(self.ar.get_center() + DOWN * 0.15) for r in arrivants],
                              lag_ratio=0.12), run_time=1.0)
        self.play(FadeOut(arrivants, shift=U * 0.3), Flash(self.ar[2], color=VERT_OK, line_length=0.2),
                  run_time=0.4)
        self.au_mot("L'entraînement d'abord")
        dab = self.grand("L'entraînement d'abord !", font_size=40, color=ENTRAINE, marge=0.4).move_to(P(0, 3.4))
        self.play(ReplacementTransform(self.titre, dab), *a.eteint(), run_time=0.5)
        self.insister(dab, 1.1, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : le 0,25 des pas entraînés ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(dab, toi), FadeOut(VGroup(self.badge, self.mont, self.ar, gens)),
                  run_time=0.5)
        self.au_mot("Parmi les coureurs pas")
        l3 = self.bloc([[("Parmi les", WHITE), ("pas entraînés,", AUTRE)], [("25 %", JAUNE_TITRE), ("finissent", WHITE)]],
                       30, 2.45)
        self.play(FadeIn(l3[0], shift=UP * 0.15), *a.allume([1]), run_time=0.5)
        self.au_mot("25 %")
        self.play(FadeIn(l3[1], shift=UP * 0.15), run_time=0.4)
        self.insister(l3[1][0], 1.4, 0.2)
        self.au_mot("Après quelle branche")
        self.play(*a.allume([4, 5]), a.construire(4, 0.5), a.construire(5, 0.5))
        q = suite(self.t("Où va ce", 30, WHITE), Text("0,25", font_size=36, color=JAUNE_TITRE, weight=BOLD),
                  self.t("?", 34, ORANGE_RETENUE), buff=0.15).move_to(P(0, 1.6))
        self.play(FadeIn(q, scale=0.7), run_time=0.4)
        self.play(*[Indicate(a.branches[k], color=ORANGE_RETENUE, scale_factor=1.05) for k in (4, 5)], run_time=0.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 38, VERT_OK), self.t("commentaire !", 38, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 0.72))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaArbreConstruireSTMG(ShortProbaArbreConstruireBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaArbreConstruirePremiere(ShortProbaArbreConstruireBase):
    identite = "Maths 1re — EleveAI"


# 20/10 : la 1re SPÉ, même voix, ceinture ORANGE.
class ShortProbaArbreConstruirePremiereSpe(ShortProbaArbreConstruireBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "orange"
