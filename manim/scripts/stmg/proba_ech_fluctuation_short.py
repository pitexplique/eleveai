# proba_ech_fluctuation_short.py
# EleveAI — Maths STMG — short jumeau de « La fluctuation d'échantillonnage ».
# CEINTURE JAUNE. Il AMUSE : la marque annonce 10 % de clics, on en trouve
# 12 % sur 400 personnes : elle ment ?
#   · en HAUT : le flacon bio et la foule de 400 silhouettes qui CLIQUENT
#     (elles s'allument en rose, une à une) ;
#   · en BAS, EN MÊME TEMPS : « annoncé 10 % », « observé 12 % », « La marque
#     ment ? », puis la marge 1/√400 = 0,05 et la bande de 5 % à 15 % sur un
#     axe, le point 12 % dedans ;
#   · fin : 16 % ? le point sort de la bande, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/stmg-proba-ech-fluctuation-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_ech_fluctuation_short.py ShortProbaEchFluctuation -o eleveai-maths-stmg-proba-ech-fluctuation-short --media_dir manim/scripts/stmg/media-va_ech_fluctuation
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/34-ech-fluctuation/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_ech_fluctuation import BANDE, DEDANS, DEHORS, Foule, P, flacon  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import frac, suite  # noqa: E402

LARGEUR_MAX = 4.1
ROSE = "#F0ABFC"


class AxePct(VGroup):
    """Un axe de 0 % à 20 % (graduations tous les 1 %, aucun nombre écrit)."""

    def __init__(self, x0=-1.95, x1=1.95, y=-1.75):
        super().__init__()
        self.x0, self.x1, self.y = x0, x1, y
        self.add(Arrow(P(x0 - 0.15, y), P(x1 + 0.3, y), buff=0, color=WHITE, stroke_width=3,
                       tip_length=0.16, max_tip_length_to_length_ratio=0.06))
        for i in range(21):
            h = 0.22 if i % 5 == 0 else 0.1
            self.add(Line(self.pt(i, -h / 2), self.pt(i, h / 2), color=WHITE, stroke_width=1.5))

    def pt(self, pc, dy=0.0):
        return P(self.x0 + (self.x1 - self.x0) * pc / 20, self.y + dy)

    def bande(self, a, b, h=0.7):
        r = Rectangle(width=self.pt(b)[0] - self.pt(a)[0], height=h, fill_color=BANDE, fill_opacity=0.25,
                      stroke_color=BANDE, stroke_width=3)
        return r.move_to(P((self.pt(a)[0] + self.pt(b)[0]) / 2, self.y + h / 2 - 0.1))

    def nombre(self, pc, texte, color=BANDE, fs=26):
        return Text(texte, font_size=fs, color=color).move_to(self.pt(pc, -0.38))


class ShortProbaEchFluctuation(Short6e):
    nom_voix = "stmg-proba-ech-fluctuation-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def cliquer(self, foule, n, run_time=1.4):
        return LaggedStart(*[p.animate.set_color(ROSE) for p in foule.lot(n)], lag_ratio=0.1, run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 10 % annoncés, 12 % trouvés ──
        self.dire("00-accroche")
        titre = self.grand("10 % de clics annoncés", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.45))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.75))
        fl = flacon(0.7).move_to(P(-1.35, 1.25))
        foule = Foule(pas=0.09, s=0.25).move_to(P(0.95, 1.3))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(fl, scale=0.5), run_time=0.7)
        ann = suite(self.t("annoncé :", 34), self.t("10 %", 44, JAUNE_TITRE), buff=0.2).move_to(P(0, -0.6))
        self.play(FadeIn(ann, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Sur 400 personnes")
        n400 = self.t("400 personnes", 28, BLEU_CALCUL).move_to(P(0, 0.05))
        self.play(FadeIn(foule, lag_ratio=0.002), FadeIn(n400, scale=0.6), run_time=0.6)
        self.play(self.cliquer(foule, 48, 1.6))
        self.au_mot("tu trouves 12 %")
        obs = suite(self.t("observé :", 34), self.t("12 %", 44, ROSE), buff=0.2).move_to(P(0, -1.45))
        self.play(FadeIn(obs, shift=UP * 0.15), run_time=0.4)
        self.insister(obs[1], 1.4)
        self.au_mot("La marque ment")
        ment = self.t("La marque ment ?", 46, ROUGE_ERREUR).move_to(P(0, -2.4))
        self.play(FadeIn(ment, scale=1.6), Wiggle(fl), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : la marge 0,05 : de 5 % à 15 %, c'est normal ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(ann, obs, ment), shift=DOWN * 0.2), FadeOut(badge), run_time=0.3)
        self.au_mot("la marge")
        ligne = suite(self.t("marge =", 34), frac("1", "√400", 28, ORANGE_RETENUE), self.t("=", 34),
                      self.t("0,05", 40, ORANGE_RETENUE), buff=0.15)
        if ligne.width > LARGEUR_MAX:
            ligne.scale_to_fit_width(LARGEUR_MAX)
        ligne.move_to(P(0, -0.6))
        m, v = ligne[:2], ligne[2:]
        self.play(FadeIn(m, shift=UP * 0.15), run_time=0.4)
        self.au_mot("0,05")
        self.play(FadeIn(v, scale=1.6), run_time=0.35)
        self.insister(v[1], 1.4)
        axe = AxePct()
        p12 = Dot(axe.pt(12, 0.05), radius=0.1, color=ROSE)
        self.play(FadeIn(axe), FadeIn(p12, shift=DOWN * 0.6), run_time=0.4)
        self.au_mot("Entre 5 %")
        bande = axe.bande(5, 15)
        n5 = axe.nombre(5, "5 %")
        self.play(FadeIn(n5, scale=1.5), GrowFromEdge(bande, LEFT), run_time=0.5)
        self.au_mot("et 15 %")
        n15 = axe.nombre(15, "15 %")
        self.play(FadeIn(n15, scale=1.5), Indicate(bande, color=BANDE), run_time=0.5)
        self.au_mot("c'est normal")
        ok = suite(self.t("c'est normal", 38, DEDANS), self.coche(taille=0.2), buff=0.2).move_to(P(0, -2.65))
        self.play(p12.animate.set_color(DEDANS).scale(1.4), FadeIn(ok[0], shift=UP * 0.15), Create(ok[1]),
                  Flash(p12, color=DEDANS), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : 16 % ? ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(ok, m, v), shift=DOWN * 0.2),
                  p12.animate.scale(1 / 1.4).set_color(ROSE).set_opacity(0.35), run_time=0.45)
        self.au_mot("16 %")
        q = suite(self.t("16 %", 46, ROSE), self.t("de clics", 32), buff=0.2).move_to(P(0, -0.55))
        p16 = Dot(axe.pt(16, 0.05), radius=0.12, color=ROSE)
        self.play(FadeIn(q, scale=1.5), FadeIn(p16, shift=DOWN * 0.8), self.cliquer(foule, 64, 0.5), run_time=0.6)
        self.au_mot("c'est normal ?")
        nq = self.t("normal ?", 34, ORANGE_RETENUE).move_to(P(0.85, -2.62))
        self.play(FadeIn(nq, scale=1.4), Flash(p16, color=ORANGE_RETENUE), run_time=0.5)
        self.insister(nq, 1.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, 1.25))
        self.play(FadeOut(VGroup(fl, foule, n400), scale=0.8), run_time=0.3)
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
