# proba_modele_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 2 :
# la loi de probabilité. CEINTURE JAUNE. Il AMUSE : « ce dé est truqué, tes
# chances de faire 6 ? »
#   · en HAUT le dé qui roule et les barres de ses résultats (le 6 double) ;
#   · en BAS, EN MÊME TEMPS, les maths : 1/6 et 1/3 barrés, le tableau de loi
#     du coach (p, p, p, p, p, 2p), 7p = 1, et P(6) = 2/7 ;
#   · fin : le 6 triple, « P(6) = ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-modele-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba_modele_short.py ShortProbaModeleSeconde -o eleveai-maths-seconde-proba-modele-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/02-loi-de-probabilite/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_modele import (P, TableauLoi, AMBRE_FOND, AMBRE_ENCRE, barres_resultats,  # noqa: E402
                          de, de_qui_roule, face_coach, frac_txt)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

SOL = 0.8          # la ligne de base des barres (zone image, en haut)
X_BARRES = 0.75
C_DE = P(-1.45, 1.15)


class ShortProbaModeleSeconde(Short6e):
    nom_voix = "seconde-proba-modele-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, sw=6):
        return Line(mob.get_corner(DL) + P(-0.06, -0.03), mob.get_corner(UR) + P(0.06, 0.03),
                    stroke_width=sw, color=ROUGE_ERREUR)

    def barres(self, unite):
        b, f, s = barres_resultats([1] * 6, pas=0.42, larg=0.3, unite=unite, cote_face=0.3)
        g = VGroup(b, f, s)
        g.shift(P(X_BARRES - s.get_center()[0], SOL - s.get_center()[1]))
        for x in b:
            x.stretch_to_fit_height(0.01, about_edge=DOWN)
        return b, f, s

    def tableau(self, probas=None, y=-1.25):
        tab = TableauLoi([face_coach(k, 0.32) for k in range(1, 7)], probas, larg_lab=1.05, larg=0.52,
                         h_ent=0.45, h_val=0.62, fs=24, fs_lab=20, noms=("Face", "Proba"))
        return tab.move_to(P(0, y))

    def p_de_6(self, valeur, y, fs=44):
        tete = self.t("P(6) =", fs, BLEU_CALCUL)
        return VGroup(tete, valeur).arrange(RIGHT, buff=0.2).move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Dé truqué !", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        roule = de_qui_roule(C_DE, 0.95, periode=0.12)
        b, f, s = self.barres(0.42)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), Create(s), FadeIn(f), run_time=0.7)
        self.add(roule)
        self.play(*[x.animate.stretch_to_fit_height(0.42, about_edge=DOWN) for x in b], run_time=0.7)
        self.au_mot("deux fois plus")
        self.play(b[5].animate.stretch_to_fit_height(0.84, about_edge=DOWN), run_time=0.5)
        x2 = self.t("× 2", 30, ORANGE_RETENUE).next_to(b[5].get_corner(UL), DL, buff=0.08)
        self.play(FadeIn(x2, scale=0.5), run_time=0.25)
        self.insister(x2, 1.4, 0.2)
        self.au_mot("Tes chances")
        q = self.p_de_6(self.t("?", 52, ORANGE_RETENUE), -0.15)
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q[1], 1.5, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : la surprise : 2/7 ──
        self.dire("01-image")
        y = -1.3
        un6 = frac_txt(1, 6, 40, WHITE).move_to(P(-0.9, y))
        un3 = frac_txt(1, 3, 40, WHITE).move_to(P(0.9, y))
        self.au_mot("Pas 1 sur 6")
        self.play(FadeIn(un6, scale=0.6), run_time=0.25)
        self.play(Create(self.barrer(un6)), run_time=0.25)
        self.au_mot("pas 1 sur 3")
        self.play(FadeIn(un3, scale=0.6), run_time=0.25)
        self.play(Create(self.barrer(un3)), run_time=0.25)
        barres_croix = [m for m in self.mobjects if isinstance(m, Line) and m.get_color() == ManimColor(ROUGE_ERREUR)]

        self.au_mot("5 faces à p")
        tab = self.tableau(y=-1.5)
        self.play(FadeOut(VGroup(un6, un3, *barres_croix)), FadeIn(tab), run_time=0.35)
        ps = [tab.ecrire(i, "p") for i in range(5)]
        self.play(LaggedStart(*[FadeIn(p, scale=0.4) for p in ps], lag_ratio=0.12),
                  *[Indicate(x, color=BLEU_CALCUL, scale_factor=1.1) for x in b[:5]], run_time=0.6)
        self.au_mot("le 6 à 2p")
        p6 = tab.ecrire(5, "2p", ORANGE_RETENUE)
        self.play(tab.val[5].animate.set_fill(AMBRE_FOND), FadeIn(p6, scale=0.4),
                  Indicate(b[5], color=ORANGE_RETENUE, scale_factor=1.1), run_time=0.35)
        self.au_mot("7p égale 1")
        eq = VGroup(self.t("7p", 44, JAUNE_TITRE), self.t("=", 44), self.t("1", 44, VERT_OK)).arrange(RIGHT, buff=0.2)
        eq.move_to(P(0, -2.45))
        self.play(FadeIn(eq, shift=UP * 0.15), run_time=0.35)
        self.insister(eq, 1.25, 0.2)
        self.au_mot("2 sur 7")
        roule.clear_updaters()
        self.remove(roule)
        six = de(6, 0.95).move_to(C_DE)
        self.add(six)
        rep = frac_txt(2, 7, 38, VERT_OK).move_to(q[1]).shift(RIGHT * 0.12)
        f6 = tab.ecrire(5, "2/7", AMBRE_ENCRE)
        self.play(ReplacementTransform(q[1], rep), ReplacementTransform(p6, f6), Flash(six, color=VERT_OK),
                  run_time=0.45)
        self.play(Create(SurroundingRectangle(rep, color=VERT_OK, buff=0.1)), run_time=0.25)
        self.insister(rep, 1.4, 0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        roule = de_qui_roule(C_DE, 0.95, periode=0.12)
        b, f, s = self.barres(0.32)
        self.play(Write(toi), Create(s), FadeIn(f), run_time=0.5)
        self.add(roule)
        self.play(*[x.animate.stretch_to_fit_height(0.32, about_edge=DOWN) for x in b], run_time=0.5)
        self.au_mot("trois fois plus")
        # ⛔ PAS D'ÉCART : ni tableau ni « 3p » ici, la voix ne les dit pas.
        self.play(b[5].animate.stretch_to_fit_height(0.96, about_edge=DOWN), run_time=0.5)
        x3 = self.t("× 3", 30, ORANGE_RETENUE).next_to(b[5].get_corner(UL), DL, buff=0.08)
        self.play(FadeIn(x3, scale=0.5), run_time=0.3)
        self.insister(x3, 1.4, 0.2)
        self.au_mot("ce serait combien")
        q = self.p_de_6(self.t("?", 60, ORANGE_RETENUE), -0.7)
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q[1], 1.5, 0.2)
        self.au_mot("Réponds en commentaire")
        roule.clear_updaters()
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.0))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
