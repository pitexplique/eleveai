# proba_defi_short.py
# EleveAI — Maths 4e — short jumeau de Probabilités, épisode 8 : le défi.
# CEINTURE JAUNE. Il AMUSE : le pari « pair » ou « plus grand que 6 » ?
#   · en HAUT, la roue de 1 à 10 qui tourne, puis s'éteint : les secteurs
#     favorables s'allument un par un, au moment où la voix les nomme ;
#   · en BAS, EN MÊME TEMPS, la liste des favorables et la fraction (5/10 contre 4/10) ;
#   · fin : « multiple de 3 » ou « plus petit que 4 » ? (piège : 3/10 partout),
#     « Réponds en commentaire ! ».
# Roue reprise de la paysage (proba_defi.py). Ti-Margo en bas (margo_bas).
# Voix : manim/voix/4e-proba-defi-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_defi_short.py ProbaDefi4eShort -o eleveai-maths-4e-proba-defi-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/08-defi/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_defi import GRIS_ETEINT, P, allumer, angle_pour, eteindre, fleche_roue, roue10, roue_qui_tourne  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
C_ROUE, R_ROUE = P(0, 0.95), 1.05


class ProbaDefi4eShort(Short6e):
    nom_voix = "4e-proba-defi-short"

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

    def carte(self, texte, couleur, y):
        lbl = self.t(texte, 30, couleur, 3.6)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                stroke_color=couleur, stroke_width=3, fill_color=couleur, fill_opacity=0.1)
        return VGroup(fond, lbl.move_to(fond)).move_to(P(0, y))

    def tourner(self, k_fin, tours=2, run_time=1.6, depart=0.0):
        ang = ValueTracker(depart)
        w = always_redraw(lambda: roue10(R_ROUE, ang.get_value()).move_to(C_ROUE))
        self.add(w)
        self.play(ang.animate.set_value(tours * TAU + angle_pour(k_fin)), run_time=run_time,
                  rate_func=rate_functions.ease_out_cubic)
        w.clear_updaters()
        return w

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Sur quoi tu paries ?", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.78))
        fl = fleche_roue(roue10(R_ROUE).move_to(C_ROUE), R_ROUE)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.8)
        self.au_mot("Une roue")
        tourne = roue_qui_tourne(C_ROUE, R_ROUE, vitesse=2.5)
        self.add(tourne, fl)
        self.au_mot("« pair »")
        c1 = self.carte("pair", BLEU_CALCUL, -0.75)
        self.play(FadeIn(c1, scale=0.7), run_time=0.4)
        self.au_mot("« plus grand que 6 »")
        ou = self.t("ou", 28).move_to(P(0, -1.35))
        c2 = self.carte("plus grand que 6", ORANGE_RETENUE, -1.95)
        self.play(FadeIn(ou), FadeIn(c2, scale=0.7), run_time=0.4)
        self.play(Wiggle(c1), Wiggle(c2), run_time=0.7)
        self.attendre_voix(marge=0.1)

        # ── 01 : la roue s'allume ──
        self.dire("01-image")
        tourne.clear_updaters()
        self.remove(tourne)
        w = roue10(R_ROUE, angle_pour(10)).move_to(C_ROUE)
        self.add(w, fl)
        self.play(*eteindre(w), FadeOut(VGroup(c1, c2, ou)), run_time=0.5)
        y1, y2 = -0.55, -1.45
        lab1 = self.t("Pair :", 28, BLEU_CALCUL).move_to(P(-1.6, y1))
        self.add(lab1)
        nums1 = VGroup()
        for k, ex in ((2, "Pair : 2"), (4, "4, 6"), (6, "6, 8"), (8, "8, 10"), (10, "10. 5")):
            self.au_mot(ex)
            n = self.t(str(k) + ("" if k == 10 else ","), 26, WHITE)
            nums1.add(n)
            nums1.arrange(RIGHT, buff=0.15, aligned_edge=UP).next_to(lab1, RIGHT, buff=0.15)
            self.play(*allumer(w, k, bord=BLEU_CALCUL), FadeIn(n, scale=1.5), run_time=0.3)
        self.au_mot("5 chances sur 10")
        f1 = self.fraction(5, 10, 32, JAUNE_TITRE).move_to(P(1.75, y1))
        self.play(FadeIn(f1, shift=LEFT * 0.2), run_time=0.4)
        self.insister(f1, 1.4, 0.25)

        self.au_mot("Plus grand que 6")
        self.play(*eteindre(w), run_time=0.4)
        lab2 = self.t("> 6 :", 28, ORANGE_RETENUE).move_to(P(-1.6, y2))
        self.play(FadeIn(lab2), run_time=0.3)
        nums2 = VGroup()
        for k, ex in ((7, "6 : 7"), (8, "8, 9"), (9, "9, 10"), (10, "10. 4")):
            self.au_mot(ex)
            n = self.t(str(k) + ("" if k == 10 else ","), 26, WHITE)
            nums2.add(n)
            nums2.arrange(RIGHT, buff=0.15, aligned_edge=UP).next_to(lab2, RIGHT, buff=0.15)
            self.play(*allumer(w, k, bord=ORANGE_RETENUE), FadeIn(n, scale=1.5), run_time=0.3)
        self.au_mot("4 chances sur 10")
        f2 = self.fraction(4, 10, 32, JAUNE_TITRE).move_to(P(1.75, y2))
        self.play(FadeIn(f2, shift=LEFT * 0.2), run_time=0.4)

        self.au_mot("Pair gagne")
        cadre = SurroundingRectangle(VGroup(lab1, nums1, f1), color=VERT_OK, buff=0.1, stroke_width=4)
        gagne = self.grand("Pair gagne !", font_size=44, color=VERT_OK).move_to(P(0, -2.35))
        self.play(Create(cadre), FadeIn(gagne, scale=0.6), run_time=0.5)
        self.insister(gagne, 1.15, 0.25)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(titre.become(self.grand("Et toi ?", font_size=46, color=JAUNE_TITRE).next_to(badge, UP, buff=0.15)), badge)
        tourne = roue_qui_tourne(C_ROUE, R_ROUE, vitesse=2.5)
        self.add(tourne, fl)
        self.au_mot("« multiple de 3 »")
        c1 = self.carte("multiple de 3", BLEU_CALCUL, -0.6)
        self.play(FadeIn(c1, scale=0.7), run_time=0.4)
        self.au_mot("« plus petit que 4 »")
        ou = self.t("ou", 28).move_to(P(0, -1.15))
        c2 = self.carte("plus petit que 4", ORANGE_RETENUE, -1.7)
        self.play(FadeIn(ou), FadeIn(c2, scale=0.7), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        self.play(FadeOut(VGroup(c1, c2, ou), shift=UP * 0.2), run_time=0.3)
        mini = VGroup(self.carte("multiple de 3", BLEU_CALCUL, 0), self.t("ou", 24),
                      self.carte("plus petit que 4", ORANGE_RETENUE, 0)).arrange(DOWN, buff=0.08)
        mini.scale(0.7).move_to(P(0, -0.75))
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.1))
        self.play(FadeIn(mini), FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
        tourne.clear_updaters()
