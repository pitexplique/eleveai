# proba2_contraire_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 4 :
# l'événement contraire. CEINTURE JAUNE. Il AMUSE : « au moins un 6 avec deux
# dés : plus ou moins de 1 chance sur 3 ? »
#   · en HAUT les deux dés qui roulent, puis le tableau 6 × 6 du coach dont les
#     cases s'allument (les 25 « aucun 6 » en bleu, les 11 autres en ambre) ;
#   · en BAS, EN MÊME TEMPS, les maths : 25/36, 11/36, un peu moins de 1/3 ;
#   · fin : « au moins un 1 : ?/36 », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-contraire-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_contraire_short.py ShortProba2Contraire -o eleveai-maths-seconde-proba-contraire-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/04-contraire/.

import importlib.util
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI))

_spec = importlib.util.spec_from_file_location("proba2_contraire_paysage", ICI / "proba2_contraire.py")
_pc = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pc)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402

P = _pc.P
TableauDes = _pc.TableauDes
frac_txt = _pc.frac_txt
echelle_ceintures = _pc.echelle_ceintures
de_qui_roule = _pc.de_qui_roule
AMBRE_BORD, BLEU_FOND, BLEU_BORD = _pc.AMBRE_BORD, _pc.BLEU_FOND, _pc.BLEU_BORD

Y_TAB = 0.62       # le centre du tableau (zone image, en haut)
CELL = 0.38


class ShortProba2Contraire(Short6e):
    nom_voix = "seconde-proba-contraire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def pilule(self, texte, color, fs=34):
        lbl = self.t(texte, fs, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.2,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def ligne(self, texte, color, frac, y, fs=30):
        g = VGroup(self.t(texte, fs, color), frac).arrange(RIGHT, buff=0.2)
        if g.width > 4.2:
            g.scale_to_fit_width(4.2)
        return g.move_to(P(0, y))

    def tableau(self):
        return TableauDes(CELL).move_to(P(0, Y_TAB))

    def entete(self, titre):
        t = self.grand(titre, font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.25))
        b = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        return t, b

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : plus ou moins de 1 chance sur 3 ? ──
        self.dire("00-accroche")
        titre, badge = self.entete("Au moins un 6 ?")
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        d1 = de_qui_roule(P(-0.85, 0.8), 1.1, periode=0.13)
        d2 = de_qui_roule(P(0.85, 0.8), 1.1, periode=0.17, faces=[4, 1, 6, 2, 5, 3])
        self.add(d1, d2)
        self.au_mot("Au moins un 6")
        a6 = self.t("au moins un 6", 40, AMBRE_BORD).move_to(P(0, -0.65))
        self.play(FadeIn(a6, scale=0.6), run_time=0.35)
        self.au_mot("plus ou moins")
        plus = self.pilule("plus ?", BLEU_CALCUL, 28)
        moins = self.pilule("moins ?", ORANGE_RETENUE, 28)
        VGroup(plus, moins).arrange(RIGHT, buff=0.3).move_to(P(0, -1.5))
        self.play(GrowFromCenter(plus), run_time=0.25)
        self.play(GrowFromCenter(moins), run_time=0.25)
        self.au_mot("1 chance sur 3")
        c3 = self.t("de 1 chance sur 3", 36, WHITE).move_to(P(0, -2.3))
        self.play(FadeIn(c3, shift=UP * 0.15), run_time=0.35)
        self.insister(c3, 1.2, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'image : 25 cases « aucun 6 », puis les 11 autres ──
        self.dire("01-image")
        d1.clear_updaters()
        d2.clear_updaters()
        tab = self.tableau()
        self.play(FadeOut(VGroup(d1, d2, plus, moins, c3, a6)), FadeIn(tab), run_time=0.4)
        self.au_mot("aucun 6")
        aucun = tab.lot(lambda i, j: i < 6 and j < 6)
        l1 = self.ligne("aucun 6 :", BLEU_BORD, frac_txt(25, 36, 30, BLEU_BORD), -1.25)
        self.play(tab.allumer(aucun, BLEU_FOND, BLEU_BORD, lag=0.06, run_time=0.9))
        self.au_mot("25 cases sur 36")
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.3)
        self.au_mot("Donc au moins")
        autres = tab.lot(lambda i, j: i == 6 or j == 6)
        self.play(tab.allumer(autres, lag=0.12, run_time=0.7))
        self.au_mot("11 sur 36")
        r = frac_txt(11, 36, 32, VERT_OK)
        l2 = self.ligne("au moins un 6 :", AMBRE_BORD, r, -2.1)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.3)
        self.insister(r, 1.4, 0.2)
        self.au_mot("Un peu moins")
        fin = VGroup(self.t("un peu moins de", 32, VERT_OK), frac_txt(1, 3, 32, VERT_OK),
                     self.t("!", 32, VERT_OK)).arrange(RIGHT, buff=0.15).move_to(P(0, -2.2))
        self.play(FadeOut(l1), l2.animate.move_to(P(0, -1.2)), run_time=0.35)
        self.play(FadeIn(fin, scale=0.6), run_time=0.35)
        self.insister(fin, 1.15, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        toi, badge = self.entete("Et toi ?")
        self.add(badge)
        tab = self.tableau()
        self.play(Write(toi), FadeIn(tab), run_time=0.5)
        self.au_mot("au moins un 1")
        q = self.ligne("au moins un 1 :", AMBRE_BORD, frac_txt("?", 36, 36, ORANGE_RETENUE), -1.2, fs=32)
        self.play(Indicate(tab.lig[1], color=AMBRE_BORD, scale_factor=1.4),
                  Indicate(tab.col[1], color=AMBRE_BORD, scale_factor=1.4),
                  FadeIn(q[0], shift=UP * 0.15), run_time=0.6)
        self.au_mot("combien sur 36")
        self.play(FadeIn(q[1], scale=0.5), run_time=0.35)
        self.insister(q[1], 1.4, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=38, color=VERT_OK),
                       self.grand("commentaire !", font_size=38, color=VERT_OK)).arrange(DOWN, buff=0.06)
        appel.move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
