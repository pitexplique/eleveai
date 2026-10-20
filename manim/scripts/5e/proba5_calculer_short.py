# proba5_calculer_short.py
# EleveAI — Maths 5e — short jumeau de la série « Probabilités », épisode 4 :
# calculer une probabilité (micro : proba_calculer). CEINTURE JAUNE. Il AMUSE :
# « le gros lot, tes chances en pourcentage ? »
#   · en HAUT la roue de kermesse du coach (1 dorée, 3 rouges, 4 bleues) qui
#     tourne puis s'arrête sur la dorée ;
#   · en BAS, EN MÊME TEMPS, 1/8 = 0,125 = 12,5 % et la jauge qui se remplit,
#     puis le bleu : 4/8 = 50 %, la jauge monte à la moitié ;
#   · fin : 3 parts rouges sur 8, « ? % », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/5e-proba-calculer-short.json (Julie, débit −8).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/proba5_calculer_short.py ShortProba5Calculer -o eleveai-maths-5e-proba-calculer-short --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/probabilites/04-calculer/.

import importlib.util
import sys
from pathlib import Path

# ⛔ import PAR CHEMIN EXACT : un module de même nom ailleurs se chargerait à la place
_ICI = Path(__file__).resolve().parent
_spec = importlib.util.spec_from_file_location("proba5_calculer", _ICI / "proba5_calculer.py")
_mod = importlib.util.module_from_spec(_spec)
sys.modules["proba5_calculer"] = _mod
_spec.loader.exec_module(_mod)  # pose aussi les chemins (manim/, seconde/)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

P, roue, Toupie, ROUE_8, ENCRE = _mod.P, _mod.roue, _mod.Toupie, _mod.ROUE_8, _mod.ENCRE
C_ROUGE, C_BLEU, C_DORE = _mod.C_ROUGE, _mod.C_BLEU, _mod.C_DORE

LARGEUR_MAX = 4.1
CENTRE = P(0, 0.4)
R = 1.1
JX0, JX1, JY, JH = -1.8, 1.8, -0.9, 0.26   # la jauge 100 %


class ShortProba5Calculer(Short6e):
    nom_voix = "5e-proba-calculer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def roue_short(self):
        """Sans carte blanche, la pointe noire disparaîtrait sur le fond : elle passe en blanc."""
        tout, d = roue(CENTRE, r=R, carte=False)
        tout[-1].set_fill(WHITE)
        return tout, d

    def parts(self, d, couleur):
        return [p for p, c in zip(d, ROUE_8) if c == couleur]

    def eclairer(self, d, couleur, run_time=0.25):
        self.play(*[p.animate.set_fill(opacity=1 if c == couleur else 0.35) for p, c in zip(d, ROUE_8)],
                  run_time=run_time)

    def gonfler(self, ps, k=1.15, run_time=0.18):
        self.play(*[p.animate.scale(k, about_point=CENTRE) for p in ps], run_time=run_time)
        self.play(*[p.animate.scale(1 / k, about_point=CENTRE) for p in ps], run_time=run_time)

    def fraction(self, num, den, font_size=44, color=WHITE, color_num=None, color_den=None):
        """Comme NotionBases.fraction : numérateur, barre (une Line), dénominateur."""
        n = Text(str(num), font_size=font_size, color=color_num or color)
        d = Text(str(den), font_size=font_size, color=color_den or color)
        larg = max(n.width, d.width) + 0.16
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3.5)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.10)

    def remplissage(self, p, couleur):
        return Rectangle(width=max(0.001, (JX1 - JX0) * p), height=JH, fill_color=couleur, fill_opacity=1,
                         stroke_width=0).move_to(P(JX0, JY), aligned_edge=LEFT)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Le gros lot !", font_size=50, color=C_DORE).move_to(P(0, 3.35))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        tout, d = self.roue_short()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(tout, scale=0.6), run_time=0.7)
        top = Toupie(self, d, CENTRE, vitesse=8.0)
        self.au_mot("1 part dorée")
        top.arreter(0.7)
        f1 = self.fraction(1, 8, 50, WHITE, color_num=C_DORE, color_den=JAUNE_TITRE).move_to(P(-1.1, -1.65))
        self.play(FadeIn(f1[0], scale=0.4), Flash(tout[-1], color=C_DORE, line_length=0.25), run_time=0.3)
        self.gonfler(self.parts(d, C_DORE), 1.2)
        self.au_mot("sur 8")
        self.play(Create(f1[1]), FadeIn(f1[2], shift=UP * 0.15), run_time=0.3)
        self.au_mot("en pourcentage")
        q = self.t("en % ?", 56, ORANGE_RETENUE).move_to(P(0.75, -1.65))
        self.play(FadeIn(q, scale=0.5), run_time=0.3)
        self.insister(q, 1.25, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : 12,5 %, puis le bleu : 50 % ──
        self.dire("01-image")
        jauge = Rectangle(width=JX1 - JX0, height=JH, stroke_color=WHITE, stroke_width=3).move_to(P(0, JY))
        self.play(FadeOut(q, shift=DOWN * 0.2), Create(jauge), run_time=0.3)
        self.insister(f1, 1.3, 0.2)
        self.au_mot("0,125")
        dec = self.t("= 0,125", 46, BLEU_CALCUL).move_to(P(0.7, -1.65))
        self.play(FadeIn(dec, shift=LEFT * 0.2), run_time=0.3)
        self.au_mot("12,5")
        pct = self.grand("= 12,5 %", font_size=56, color=C_DORE).move_to(P(0.25, -2.5))
        plein = self.remplissage(0.125, C_DORE)
        vide = self.remplissage(0.0, C_DORE)
        self.play(FadeIn(pct, scale=0.4), Transform(vide, plein), run_time=0.45)
        self.insister(pct, 1.2, 0.2)
        self.au_mot("Et le bleu")
        self.eclairer(d, C_BLEU)
        self.gonfler(self.parts(d, C_BLEU), 1.15)
        self.au_mot("4 parts sur 8")
        f2 = self.fraction(4, 8, 50, WHITE, color_num=C_BLEU, color_den=JAUNE_TITRE).move_to(f1)
        self.play(FadeOut(f1, shift=UP * 0.3), FadeOut(dec), FadeIn(f2, shift=UP * 0.3), run_time=0.35)
        self.au_mot("50")
        cinquante = self.grand("= 50 % !", font_size=60, color=C_BLEU).move_to(P(0.25, -2.5))
        moitie = self.remplissage(0.5, C_BLEU)
        self.play(FadeOut(pct, shift=DOWN * 0.2), FadeIn(cinquante, scale=0.4), Transform(vide, moitie), run_time=0.5)
        self.play(Wiggle(cinquante, scale_value=1.3), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=52, color=JAUNE_TITRE).move_to(P(0, 3.35))
        tout, d = self.roue_short()
        self.add(badge, tout)
        self.play(Write(toi), run_time=0.4)
        self.au_mot("3 parts rouges")
        self.eclairer(d, C_ROUGE)
        f3 = self.fraction(3, 8, 60, WHITE, color_num=C_ROUGE, color_den=JAUNE_TITRE).move_to(P(-1.05, -1.2))
        self.play(FadeIn(f3[0], scale=0.4), run_time=0.25)
        self.gonfler(self.parts(d, C_ROUGE), 1.15)
        self.au_mot("sur 8")
        self.play(Create(f3[1]), FadeIn(f3[2], shift=UP * 0.15), run_time=0.3)
        self.au_mot("en pourcentage")
        q2 = self.t("= ? %", 60, ORANGE_RETENUE).move_to(P(0.8, -1.2))
        self.play(FadeIn(q2, scale=0.5), run_time=0.3)
        self.insister(q2, 1.25, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.06)
        appel.move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
