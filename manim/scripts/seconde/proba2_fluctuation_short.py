# proba2_fluctuation_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 13 :
# la fluctuation d'échantillonnage. CEINTURE JAUNE. Il AMUSE : « 25 % de
# letchis très sucrés, tu en trouves 29 sur 100 : il ment ? »
#   · en HAUT le cageot de 100 letchis, les très sucrés allumés en or, qui
#     « bouge » d'un échantillon à l'autre ;
#   · en BAS, EN MÊME TEMPS, l'axe de 0 à 1 : la bande [0,15 ; 0,35], le 29
#     posé dedans ; fin : 40 sur 100, hors de la bande ? « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-fluctuation-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_fluctuation_short.py ShortProba2Fluctuation -o eleveai-maths-seconde-proba-fluctuation-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/13-fluctuation/.

import importlib.util
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI))

_spec = importlib.util.spec_from_file_location("proba2_fluctuation_paysage", ICI / "proba2_fluctuation.py")
_pf = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pf)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402

P = _pf.P
Cageot = _pf.Cageot
Axe = _pf.Axe
echelle_ceintures = _pf.echelle_ceintures
SUCRE, BANDE, CLIENTS = _pf.SUCRE, _pf.BANDE, _pf.CLIENTS

Y_CAG = 0.85       # le cageot (zone image, en haut)
Y_AXE = -1.95      # l'axe (zone maths, en bas)


class ShortProba2Fluctuation(Short6e):
    nom_voix = "seconde-proba-fluctuation-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def entete(self, titre):
        t = self.grand(titre, font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.25))
        b = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        return t, b

    def axe(self):
        return Axe(x0=-1.85, x1=1.85, y=Y_AXE, fs=24)

    def cageot(self, graine=3):
        return Cageot(0.17, graine=graine, bord=CLIENTS[1]).move_to(P(-0.95, Y_CAG))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 29 sur 100, il ment ? ──
        self.dire("00-accroche")
        titre, badge = self.entete("Il ment ?")
        self.play(FadeIn(badge, shift=DOWN * 0.2), run_time=0.4)
        cag = self.cageot()
        self.play(FadeIn(cag, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("25 %")
        pc = self.t("25 %", 56, SUCRE).move_to(P(1.15, Y_CAG + 0.35))
        ts = self.t("très sucrés", 26, SUCRE).next_to(pc, DOWN, buff=0.15)
        self.play(FadeIn(pc, scale=0.5), run_time=0.35)
        self.au_mot("très sucrés")
        self.play(FadeIn(ts, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Tu en goûtes 100")
        cent = self.t("100", 34, CLIENTS[1]).next_to(cag, DOWN, buff=0.2)
        self.play(FadeIn(cent, scale=0.5), Wiggle(cag, scale_value=1.08), run_time=0.5)
        self.au_mot("tu en trouves 29")
        self.play(cag.allumer(29, run_time=0.9))
        vingt9 = VGroup(self.t("29", 64, SUCRE), self.t("sur 100", 40)).arrange(RIGHT, buff=0.25)
        vingt9.move_to(P(0, -1.2))
        self.play(FadeIn(vingt9, scale=0.6), run_time=0.35)
        self.insister(vingt9[0], 1.3, 0.2)
        self.au_mot("Il ment")
        self.play(Write(titre), run_time=0.5)
        self.insister(titre, 1.25, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : pas forcément : la bande [0,15 ; 0,35], le 29 dedans ──
        self.dire("01-image")
        pas = self.grand("Pas forcément !", font_size=44, color=VERT_OK).move_to(P(0, 3.25))
        self.play(ReplacementTransform(titre, pas), run_time=0.4)
        ax = self.axe()
        p_tick = Line(ax.pt(0.25, -0.22), ax.pt(0.25, 0.22), color=WHITE, stroke_width=5)
        p_lab = self.t("25 %", 24, SUCRE).move_to(ax.pt(0.25, -0.5))
        self.play(FadeOut(vingt9), FadeOut(cent), FadeIn(ax), Create(p_tick), FadeIn(p_lab), run_time=0.5)
        point = Dot(ax.pt(0.29), radius=0.09, color=CLIENTS[1])
        self.play(GrowFromCenter(point), run_time=0.3)
        self.au_mot("la fréquence bouge")
        # d'un cageot à l'autre, le nombre de très sucrés change : le point danse
        for k, g in ((22, 7), (31, 8), (24, 9), (27, 10)):
            cag.poser(k)
            cag.ordre = Cageot(0.17, graine=g).ordre
            cag.poser(k)
            self.play(point.animate.move_to(ax.pt(k / 100)), run_time=0.3)
        self.au_mot("plus ou moins 0,1")
        dy = 0.42
        fg = Arrow(ax.pt(0.25, dy), ax.pt(0.15, dy), buff=0, color=ORANGE_RETENUE, stroke_width=4,
                   tip_length=0.14, max_tip_length_to_length_ratio=0.4)
        fd = Arrow(ax.pt(0.25, dy), ax.pt(0.35, dy), buff=0, color=ORANGE_RETENUE, stroke_width=4,
                   tip_length=0.14, max_tip_length_to_length_ratio=0.4)
        pm = self.t("± 0,1", 48, ORANGE_RETENUE).move_to(P(0, -0.65))
        self.play(GrowArrow(fg), GrowArrow(fd), FadeIn(pm, scale=0.5), run_time=0.5)
        self.insister(pm, 1.3, 0.2)
        self.au_mot("Entre 0,15")
        bande = ax.bande(0.15, 0.35, h=0.5)
        b1 = self.t("0,15", 26, BANDE).move_to(ax.pt(0.15, 0.5)).shift(LEFT * 0.12)
        b2 = self.t("0,35", 26, BANDE).move_to(ax.pt(0.35, 0.5)).shift(RIGHT * 0.12)
        self.play(FadeIn(bande), FadeIn(b1, scale=0.5), FadeOut(p_lab), FadeOut(fg), FadeOut(fd), run_time=0.45)
        self.au_mot("et 0,35")
        self.play(FadeIn(b2, scale=0.5), run_time=0.3)
        cag.ordre = Cageot(0.17, graine=3).ordre
        cag.poser(29)
        self.play(point.animate.move_to(ax.pt(0.29)), run_time=0.3)
        self.au_mot("c'est normal")
        ok = VGroup(self.t("c'est normal", 40, VERT_OK), self.coche(taille=0.28)).arrange(RIGHT, buff=0.25)
        ok.move_to(P(0, -0.65))
        self.play(FadeOut(pm), FadeIn(ok[0], scale=0.6), Indicate(bande, color=VERT_OK, scale_factor=1.15), run_time=0.45)
        self.play(Create(ok[1]), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question : 40 sur 100 ? ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        toi, badge = self.entete("Et toi ?")
        self.add(badge, ax, p_tick, bande, b1, b2)
        cag = self.cageot(graine=12)
        self.play(Write(toi), FadeIn(cag), run_time=0.5)
        self.au_mot("40 sur 100")
        quarante = VGroup(self.t("40", 56, ORANGE_RETENUE), self.t("sur 100", 36)).arrange(RIGHT, buff=0.2)
        quarante.move_to(P(1.15, Y_CAG))
        if quarante.width > 2.0:
            quarante.scale_to_fit_width(2.0)
        pt40 = Dot(ax.pt(0.40), radius=0.1, color=ORANGE_RETENUE)
        self.play(cag.allumer(40, run_time=0.8), FadeIn(quarante, scale=0.6), GrowFromCenter(pt40))
        self.au_mot("tu le croirais encore")
        q = self.t("?", 90, ORANGE_RETENUE).move_to(P(0, -0.8))
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=34, color=VERT_OK),
                       self.grand("commentaire !", font_size=34, color=VERT_OK)).arrange(DOWN, buff=0.06)
        appel.move_to(P(0, -0.72))
        self.play(FadeOut(q), FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
