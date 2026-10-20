# proba_totales_short.py
# EleveAI — short jumeau de « La formule des probabilités totales »
# (STMG : probaT_probabilites_totales ; 1re spé : pc_totales).
# Il AMUSE : « 2 %, 4 %, 5 % de défauts… donc 3,7 % en tout ? » Non !
#   · en HAUT : les trois usines, posées au-dessus de LEUR PART de la rangée de
#     panneaux (5 | 3 | 2) : on VOIT que A pèse le plus ;
#   · en BAS, EN MÊME TEMPS : les trois produits qui s'empilent, puis 3,2 % ;
#   · fin : A grossit jusqu'à 80 %, « plus haut ou plus bas ? », « Réponds en
#     commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran, mais la CEINTURE
# diffère : ShortProbaTotalesSTMG (jaune), ShortProbaTotalesPremiereSpe (orange).
# ⛔ PAS D'ÉCART : chaque nombre n'apparaît qu'au moment où la voix le dit.
#
# Voix : manim/voix/stmg-premiere-proba-totales-short.json (débit −7).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_totales_short.py ShortProbaTotalesSTMG -o eleveai-maths-stmg-proba-totales-short --media_dir manim/scripts/stmg/media-probaT_totales
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_totales_short.py ShortProbaTotalesPremiereSpe -o eleveai-maths-premiere-proba-totales-short --media_dir manim/scripts/stmg/media-probaT_totales

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_totales import COUL_F, P, panneau, suite, usine  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
PROBA_C = "#60A5FA"   # le bleu des probabilités, lisible sur fond noir


class ShortProbaTotalesBase(Short6e):
    nom_voix = "stmg-premiere-proba-totales-short"
    ceinture = "jaune"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=34, y=-1.0):
        g = suite(*[Text(x, font_size=fs, color=c) for x, c in morceaux], buff=0.12)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def rangee(self):
        """La rangée de 10 panneaux : 5 de A, 3 de B, 2 de C (bord à la couleur du fournisseur)."""
        groupes = VGroup()
        for lt, n in (("A", 5), ("B", 3), ("C", 2)):
            g = VGroup(*[panneau(0.32) for _ in range(n)]).arrange(RIGHT, buff=0.035)
            for p in g:
                p[0].set_stroke(COUL_F[lt], 3)
            groupes.add(g)
        groupes.arrange(RIGHT, buff=0.16).move_to(P(0, 0.0))
        if groupes.width > 3.9:
            groupes.scale_to_fit_width(3.9)
        return groupes

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 2 %, 4 %, 5 %… donc 3,7 % ? ──
        self.dire("00-accroche")
        titre = self.grand("Panneaux solaires", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        rg = self.rangee()
        us = VGroup(*[usine(lt, COUL_F[lt], 0.5).next_to(rg[i], UP, buff=0.75) for i, lt in enumerate("ABC")])
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        self.au_mot("Trois fournisseurs")
        self.play(LaggedStart(*[FadeIn(u, shift=DOWN * 0.3) for u in us], lag_ratio=0.25), run_time=0.8)
        defs = VGroup()
        for i, txt in enumerate(("2 %", "4 %", "5 %")):
            d = self.t(txt, 28, ROUGE_ERREUR)
            d.next_to(us[i], DOWN, buff=0.12)
            defs.add(d)
        for i, mot in enumerate(("2 %", "4 %", "5 %")):
            self.au_mot(mot)
            self.play(FadeIn(defs[i], scale=1.6), Wiggle(us[i], scale_value=1.1), run_time=0.45)
        self.au_mot("environ 3,7 %")
        moy = self.ligne([("en tout :", ORANGE_RETENUE), ("≈ 3,7 % ?", ORANGE_RETENUE)], 40, -1.3)
        self.play(FadeIn(moy, scale=1.4), run_time=0.5)
        self.insister(moy[1], 1.25, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! A pèse la moitié ; les trois produits, 3,2 % ──
        self.dire("01-image")
        self.au_mot("Non")
        non = self.grand("NON !", font_size=56, color=ROUGE_ERREUR).move_to(P(0, -2.2))
        barre = Line(moy.get_left() + LEFT * 0.1, moy.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=6)
        self.play(FadeIn(non, scale=2), Create(barre), run_time=0.4)
        self.insister(non, 1.2, 0.2)
        self.play(FadeOut(non), FadeOut(moy), FadeOut(barre), run_time=0.4)
        self.au_mot("la moitié des panneaux")
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for g in rg for p in g], lag_ratio=0.06), run_time=0.9)
        self.play(rg[0].animate.scale(1.15), us[0].animate.scale(1.15), run_time=0.3)
        self.play(rg[0].animate.scale(1 / 1.15), us[0].animate.scale(1 / 1.15), run_time=0.3)
        fs = 36
        termes = [("0,5", "0,02"), ("0,3", "0,04"), ("0,2", "0,05")]
        mots = [("0,5 fois", "0,02, plus"), ("0,3 fois", "0,04, plus"), ("0,2 fois", "0,05 :")]
        lignes, parts = [], []
        for i, (p, q) in enumerate(termes):
            m = [("+", WHITE)] if i else []
            l = self.ligne(m + [(p, PROBA_C), ("×", WHITE), (q, ROUGE_ERREUR)], fs, -0.82 - 0.5 * i)
            if not i:
                l.shift(RIGHT * 0.2)
            lignes.append(l)
            parts.append(self.t(p, 28, PROBA_C).next_to(rg[i], DOWN, buff=0.12))
        for i, l in enumerate(lignes):
            o = 1 if i else 0
            self.au_mot(mots[i][0])
            anims = [FadeIn(parts[i], scale=1.5), FadeIn(l[o], scale=1.4), FadeIn(l[o + 1]),
                     rg[i].animate.set_opacity(1)]
            anims += [rg[j].animate.set_opacity(0.3) for j in range(3) if j != i]
            if i:
                anims.append(FadeIn(l[0], scale=2))
            self.play(*anims, run_time=0.45)
            self.au_mot(mots[i][1])
            self.play(FadeIn(l[o + 2], scale=1.4), Indicate(defs[i], color=ROUGE_ERREUR, scale_factor=1.3),
                      run_time=0.45)
        self.au_mot("3,2 %")
        res = self.ligne([("=", WHITE), ("3,2 %", VERT_OK)], 46, -2.42)
        self.play(*[rg[j].animate.set_opacity(1) for j in range(3)], FadeIn(res[0]), FadeIn(res[1], scale=1.8),
                  run_time=0.5)
        self.play(Indicate(res[1], color=VERT_OK, scale_factor=1.15), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : et si A fournissait 80 % ? ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(*lignes, res, *parts[1:]), shift=DOWN * 0.2),
                  run_time=0.5)
        self.au_mot("80 %")
        q80 = self.t("80 %", 40, JAUNE_TITRE).move_to(parts[0])
        self.play(Transform(parts[0], q80), rg[0].animate.scale(1.12), us[0].animate.scale(1.25), run_time=0.6)
        self.insister(parts[0], 1.4, 0.25)
        self.au_mot("plus haut")
        haut = suite(Arrow(DOWN * 0.4, UP * 0.4, color=VERT_OK, buff=0, stroke_width=8),
                     self.t("plus haut", 34, VERT_OK), buff=0.15)
        bas = suite(Arrow(UP * 0.4, DOWN * 0.4, color=ROUGE_ERREUR, buff=0, stroke_width=8),
                    self.t("plus bas", 34, ROUGE_ERREUR), buff=0.15)
        hb = VGroup(haut, self.t("ou", 30), bas).arrange(DOWN, buff=0.12).move_to(P(0, -1.75))
        self.play(FadeIn(haut, shift=UP * 0.2), run_time=0.4)
        self.au_mot("ou plus bas")
        self.play(FadeIn(hb[1]), FadeIn(bas, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 38, VERT_OK), self.t("commentaire !", 38, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.55))
        self.play(FadeOut(badge), FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaTotalesSTMG(ShortProbaTotalesBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"


class ShortProbaTotalesPremiereSpe(ShortProbaTotalesBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "orange"
