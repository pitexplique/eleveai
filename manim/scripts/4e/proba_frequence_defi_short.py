# proba_frequence_defi_short.py
# EleveAI — Maths 4e — short jumeau de Probabilités, épisode 13 : le défi des fréquences.
# CEINTURE JAUNE. Il AMUSE : le pari de la punaise.
#   · en HAUT, une punaise DESSINÉE qui saute (pointe en haut / sur le côté) et un
#     compteur qui file jusqu'à 1 000 lancers, dont 620 pointe en haut ;
#   · en BAS, EN MÊME TEMPS : 620 sur 1 000, 620 ÷ 1 000 = 0,62, 0,62 × 100 = 62,
#     environ 62 (100 punaises dont 62 pointe en haut, en haut de l'écran) ;
#   · fin : 500 lancers, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Voix : manim/voix/4e-proba-frequence-defi-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_frequence_defi_short.py ProbaFrequenceDefi4eShort -o eleveai-maths-4e-proba-frequence-defi-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/13-frequence-defi/.

import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_frequence_defi import P, qui_saute  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

TETE = "#FACC15"
TETE_BORD = "#A16207"
AIGUILLE = "#E5E7EB"
GRIS_P = "#6B7280"
LARGEUR_MAX = 4.1


def punaise(pointe_haut=True, s=1.0, gris=False):
    """Une punaise DESSINÉE, de profil : la tête plate, l'aiguille.
    pointe_haut : posée sur sa tête, l'aiguille en l'air ; sinon couchée sur le côté."""
    fond = GRIS_P if gris else TETE
    tete = Ellipse(width=0.8, height=0.2, fill_color=fond, fill_opacity=1, stroke_color=TETE_BORD if not gris
                   else "#374151", stroke_width=2)
    dome = Ellipse(width=0.44, height=0.2, fill_color=fond, fill_opacity=1, stroke_color=TETE_BORD if not gris
                   else "#374151", stroke_width=2).move_to(P(0, 0.08))
    aiguille = Polygon(P(-0.05, 0.12), P(0.05, 0.12), P(0, 0.75), fill_color=AIGUILLE, fill_opacity=1,
                       stroke_color=GREY_B, stroke_width=1.5)
    g = VGroup(aiguille, tete, dome)
    if not pointe_haut:
        g.rotate(-1.25)
    return g.scale(s)


class ProbaFrequenceDefi4eShort(Short6e):
    nom_voix = "4e-proba-frequence-defi-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def fraction(self, num, den, font_size=32, color=WHITE):
        n = Text(str(num), font_size=font_size, color=color)
        d = Text(str(den), font_size=font_size, color=color)
        larg = max(n.width, d.width) + 0.14
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3.5)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.07)

    def insister(self, mob, k=1.4, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def entete(self, texte):
        titre = self.grand(texte, font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.45))
        return titre, badge

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre, badge = self.entete("La punaise")
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.7)
        sol = Line(P(-2.0, 0.35), P(-0.4, 0.35), stroke_width=3, color=GREY_B)
        p = punaise(True, 1.0).move_to(P(-1.2, 0.72))
        self.au_mot("Une punaise")
        self.play(FadeIn(p, shift=DOWN * 0.3), Create(sol), run_time=0.4)
        n = ValueTracker(0)

        def nb(v):
            return f"{int(v):,}".replace(",", " ")

        cpt = always_redraw(lambda: VGroup(self.t(nb(n.get_value()), 34, JAUNE_TITRE),
                                           self.t("lancers", 24)).arrange(DOWN, buff=0.06).move_to(P(1.0, 1.45)))
        haut = always_redraw(lambda: VGroup(
            VGroup(punaise(True, 0.45), self.t(nb(n.get_value() * 0.62), 34, VERT_OK)).arrange(RIGHT, buff=0.15),
            self.t("pointe en haut", 20, VERT_OK)).arrange(DOWN, buff=0.06).move_to(P(1.0, 0.55)))
        self.au_mot("lancée 1 000 fois")
        self.add(cpt, haut)
        qui_saute(p, 0.35, 0.45, vitesse=4.5)
        self.play(n.animate.set_value(1000), run_time=1.8, rate_func=linear)
        cpt.clear_updaters()
        haut.clear_updaters()
        p.clear_updaters()
        self.play(p.animate.become(punaise(True, 1.0).move_to(P(-1.2, 0.72))), run_time=0.2)
        self.au_mot("620 fois")
        self.insister(haut, 1.3)

        self.au_mot("Sur 100 lancers demain")
        l1 = VGroup(self.t("Sur", 34), self.t("100", 38, JAUNE_TITRE), self.t("lancers :", 34)).arrange(RIGHT,
                                                                                                    buff=0.15)
        l1.move_to(P(0, -0.5))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("combien")
        l2 = VGroup(punaise(True, 0.55), self.grand("≈ ? fois", font_size=50, color=BLEU_CALCUL)).arrange(
            RIGHT, buff=0.25).move_to(P(0, -1.45))
        self.play(FadeIn(l2, scale=0.6), run_time=0.4)
        self.insister(l2[1])
        self.attendre_voix(marge=0.1)

        # ── 01 : l'image ──
        self.clear()
        self.margo_bas()
        self.add(titre, badge)
        self.dire("01-image")
        grille = VGroup(*[punaise(False, 0.2, gris=True) for _ in range(100)])
        grille.arrange_in_grid(rows=5, cols=20, buff=(0.05, 0.12)).move_to(P(0, 1.25))
        if grille.width > 4.1:
            grille.scale_to_fit_width(4.1)
        self.play(LaggedStart(*[FadeIn(g, shift=DOWN * 0.2) for g in grille], lag_ratio=0.006), run_time=0.8)

        self.au_mot("620 sur 1 000")
        f = self.fraction(620, "1 000", 34, JAUNE_TITRE)
        lf = VGroup(punaise(True, 0.6), self.t(":", 30), f).arrange(RIGHT, buff=0.2).move_to(P(0, 0.05))
        self.play(FadeIn(lf, shift=UP * 0.15), run_time=0.4)
        self.au_mot("c'est 0,62")
        c1 = self.t("620 ÷ 1 000 = 0,62", 36, BLEU_CALCUL).move_to(P(0, -0.75))
        self.play(Write(c1), run_time=0.6)
        self.au_mot("Et 0,62 fois 100")
        c2 = self.t("0,62 × 100 = 62", 40, BLEU_CALCUL).move_to(P(0, -1.4))
        self.play(Write(c2[:8]), run_time=0.5)
        self.au_mot("égale 62")
        self.play(Write(c2[8:]), run_time=0.3)
        random.seed(62)
        choix = sorted(random.sample(range(100), 62))
        self.au_mot("Environ 62 fois")
        self.play(LaggedStart(*[Transform(grille[k], punaise(True, 0.2).move_to(grille[k])) for k in choix],
                              lag_ratio=0.01), run_time=0.9)
        res = self.grand("≈ 62 fois", font_size=50, color=VERT_OK).move_to(P(0, -2.1))
        self.play(FadeIn(res, scale=0.6), run_time=0.3)
        self.au_mot("Pas exactement")
        self.play(Wiggle(res, scale_value=1.3), run_time=0.7)
        self.au_mot("environ !")
        self.insister(res, 1.3)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        titre2, badge2 = self.entete("Et toi ?")
        self.add(titre2, badge2)
        sol = Line(P(-2.0, 0.35), P(-0.4, 0.35), stroke_width=3, color=GREY_B)
        p = punaise(True, 1.0).move_to(P(-1.2, 0.72))
        self.add(sol, p)
        qui_saute(p, 0.35, 0.45, vitesse=4.5)
        self.au_mot("sur 500 lancers")
        l1 = VGroup(self.t("500", 46, JAUNE_TITRE), self.t("lancers", 26)).arrange(DOWN, buff=0.06)
        l1.move_to(P(1.0, 1.0))
        self.play(FadeIn(l1, scale=0.6), run_time=0.4)
        self.insister(l1[0], 1.3)
        self.au_mot("combien de fois pointe en haut")
        q = VGroup(punaise(True, 0.55), self.grand("≈ ? fois", font_size=50, color=BLEU_CALCUL)).arrange(
            RIGHT, buff=0.25).move_to(P(0, -0.35))
        self.play(FadeIn(q, scale=0.6), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        p.clear_updaters()
        appel = VGroup(self.grand("Réponds en", font_size=46, color=VERT_OK),
                       self.grand("commentaire !", font_size=46, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.6))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
