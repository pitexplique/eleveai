# proba_va_calculer_short.py
# EleveAI — Maths STMG — short jumeau de « Calculer avec une loi ».
# CEINTURE JAUNE. Il AMUSE : « au plus 1 colis en retard, c'est 0,3 ? » Non !
#   · en HAUT : le livreur à vélo qui roule ; le tableau de loi du coach ;
#   · en BAS, EN MÊME TEMPS : « c'est 0,3 ? » barré, « 0 OU 1 retard », les
#     cases 0,5 et 0,3 qui glissent vers la somme 0,5 + 0,3 = 0,8 ;
#   · fin : « Au moins 2 retards ? » et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran.
#
# Voix : manim/voix/stmg-proba-va-calculer-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_calculer_short.py ShortProbaVaCalculer -o eleveai-maths-stmg-proba-va-calculer-short --media_dir manim/scripts/stmg/media-va_calculer
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/29-va-calculer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_calculer import PROBAS, ROSE_CPL, VALEURS, velo  # noqa: E402  (pose les chemins)
from proba_va_loi import P, TableauLoi  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import ANNEAU, BORD, ENCRE, ENTETE, SURLIGNE  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaVaCalculer(Short6e):
    nom_voix = "stmg-proba-va-calculer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, weight=NORMAL):
        t = Text(texte, font_size=font_size, color=color, weight=weight)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def rouler(self, v, dx, run_time=1.0):
        etat = {"a": 0.0}

        def f(m, a):
            da = a - etat["a"]
            etat["a"] = a
            m.shift(RIGHT * dx * da)
            for roue in m.roues:
                roue.rotate(-dx * da / m.rayon, about_point=roue[0].get_center())

        self.play(UpdateFromAlphaFunc(v, f), run_time=run_time, rate_func=rate_functions.ease_out_sine)

    def allumer(self, tb, j, coul=SURLIGNE):
        return [tb.rect[0][j + 1].animate.set_fill(coul, 1).set_stroke(ANNEAU, 4).set_z_index(1),
                tb.rect[1][j + 1].animate.set_fill(coul, 1).set_stroke(ANNEAU, 4).set_z_index(1),
                tb.val[0][j].animate.set_color(ENCRE)]

    def eteindre(self, tb, j):
        return [tb.rect[0][j + 1].animate.set_fill(ENTETE, 1).set_stroke(BORD, 2).set_z_index(0),
                tb.rect[1][j + 1].animate.set_fill(WHITE, 1).set_stroke(BORD, 2).set_z_index(0),
                tb.val[0][j].animate.set_color(WHITE)]

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : au plus 1 retard, c'est 0,3 ? ──
        self.dire("00-accroche")
        titre = self.grand("Au plus 1 retard ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        v = velo(0.62).move_to(P(-1.6, 1.15))
        tb = TableauLoi(VALEURS, PROBAS, larg_lab=2.1, larg=1.35, fs=30).tout_poser()
        tb.scale_to_fit_width(4.3).move_to(P(0, -0.05))
        # 0,15 et 0,05 ne s'écrivent que quand la voix les dit (écran 02)
        tb.remove(tb.val[1][2], tb.val[1][3])
        self.add(v, tb, badge)
        self.play(FadeIn(titre, scale=1.3), run_time=0.3)
        self.rouler(v, 1.6, 0.9)
        self.au_mot("0,3")
        q = VGroup(self.t("c'est", 40, ORANGE_RETENUE), self.t("0,3", 52, ORANGE_RETENUE, weight=BOLD),
                   self.t("?", 48, ORANGE_RETENUE, weight=BOLD)).arrange(RIGHT, buff=0.2).move_to(P(0, -1.2))
        q[0].match_y(q[1])
        self.play(*self.allumer(tb, 1, ROSE_CPL), FadeIn(q[0]), TransformFromCopy(tb.val[1][1], q[1]),
                  FadeIn(q[2]), run_time=0.5)
        self.play(Wiggle(q), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : Non ! 0 OU 1 retard : 0,5 + 0,3 = 0,8 ──
        self.dire("01-image")
        barre = Line(q.get_corner(DL) + P(-0.15, -0.05), q.get_corner(UR) + P(0.15, 0.05), color=ROUGE_ERREUR,
                     stroke_width=8)
        non = self.t("Non !", 50, ROUGE_ERREUR, weight=BOLD).move_to(P(1.15, 1.25))
        self.play(Create(barre), q.animate.set_opacity(0.4), FadeIn(non, scale=1.8), v.animate.shift(LEFT * 0.9),
                  run_time=0.4)
        self.au_mot("0 OU 1")
        ou = VGroup(self.t("0", 46, JAUNE_TITRE, weight=BOLD), self.t("OU", 40, BLEU_CALCUL, weight=BOLD),
                    self.t("1", 46, JAUNE_TITRE, weight=BOLD), self.t("retard", 36)).arrange(RIGHT, buff=0.2)
        ou.move_to(P(0, -1.2))
        ou[3].align_to(ou[0], DOWN)
        self.play(FadeOut(VGroup(q, barre)), run_time=0.2)
        self.play(FadeIn(ou, shift=UP * 0.2), *self.allumer(tb, 0), *self.allumer(tb, 1), run_time=0.4)
        self.insister(ou[1], 1.4, 0.2)
        fs = 40
        a, plus, b = self.t("0,5", fs, VERT_OK, weight=BOLD), self.t("+", fs), self.t("0,3", fs, VERT_OK, weight=BOLD)
        eg, res = self.t("=", fs), self.t("0,8", fs + 10, JAUNE_TITRE, weight=BOLD)
        som = VGroup(a, plus, b, eg, res).arrange(RIGHT, buff=0.16)
        if som.width > LARGEUR_MAX:
            som.scale_to_fit_width(LARGEUR_MAX)
        som.move_to(P(0, -2.0))
        for m in (plus, b, eg, res):
            m.match_y(a)
        self.au_mot("0,5 plus")
        self.play(TransformFromCopy(tb.val[1][0], a), FadeOut(non), run_time=0.45)
        self.au_mot("plus 0,3")
        self.play(FadeIn(plus), TransformFromCopy(tb.val[1][1], b), run_time=0.45)
        self.au_mot("0,8.")
        self.play(FadeIn(eg), FadeIn(res, scale=1.8), run_time=0.4)
        self.insister(res, 1.4, 0.2)
        self.rouler(v, 1.2, 0.6)
        self.au_mot("On additionne")
        regle = self.t("On additionne les cases !", 32, BLEU_CALCUL).move_to(P(0, -2.65))
        self.play(FadeIn(regle, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : au moins 2 retards ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        anims = self.eteindre(tb, 0) + self.eteindre(tb, 1)
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(ou, som, regle)), *anims, run_time=0.5)
        for j, (mot, proba) in ((2, ("2 retards,", "0,15")), (3, ("3 retards,", "0,05"))):
            self.au_mot(mot)
            self.play(*self.allumer(tb, j, ROSE_CPL), run_time=0.3)
            self.au_mot(proba)
            self.play(FadeIn(tb.val[1][j], scale=1.8), run_time=0.35)
        self.au_mot("Au moins 2")
        cases = VGroup(tb.colonne(2), tb.colonne(3))
        cadre = SurroundingRectangle(cases, color=ORANGE_RETENUE, buff=0.05, stroke_width=6)
        moins = self.grand("Au moins 2 retards ?", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Create(cadre), ReplacementTransform(toi, moins), run_time=0.5)
        self.rouler(v, 3.6, 0.8)
        self.au_mot("combien")
        cb = self.t("Combien ?", 48, ORANGE_RETENUE, weight=BOLD).move_to(P(0, -1.15))
        self.play(FadeIn(cb, scale=1.5), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK, weight=BOLD),
                       self.t("commentaire !", 46, VERT_OK, weight=BOLD)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.15))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
