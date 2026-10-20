# proba_ech_distance_short.py
# EleveAI — Maths STMG — short jumeau de « La distance entre f et p ».
# CEINTURE JAUNE. Il AMUSE : 5 % garantis, 8 % trouvés sur 400 colis : on réclame ?
#   · en HAUT : les 400 colis (32 deviennent rouges), puis l'axe avec p, f,
#     l'accolade de la distance, la règle de la marge (bande verte / rouge) ;
#   · en BAS, EN MÊME TEMPS : 0,08 − 0,05 = 0,03 ; marge : 0,05 ; « dans la marge ! » ;
#   · fin : 12 % sur 400 colis, « Tu réclames ? » et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran.
#
# Voix : manim/voix/stmg-proba-ech-distance-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_ech_distance_short.py ShortProbaEchDistance -o eleveai-maths-stmg-proba-ech-distance-short --media_dir manim/scripts/stmg/media-ech_distance
# Copier dans manim/sorties/stmg/maths/probabilites/35-ech-distance/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_ech_distance import (ABIME, ABIMES_32, ABIMES_48, COUL_F, COUL_P, REGLE, ROUGE_BANDE, Axe,  # noqa: E402
                                Grille, P, suite)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaEchDistance(Short6e):
    nom_voix = "stmg-proba-ech-distance-short"
    identite = "Maths STMG — EleveAI"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, weight=NORMAL):
        t = Text(texte, font_size=font_size, color=color, weight=weight)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=34, y=-1.0, buff=0.12):
        g = suite(*[Text(x, font_size=fs, color=c, weight=BOLD) for x, c in morceaux], buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 5 % garantis, 8 % trouvés ──
        self.dire("00-accroche")
        titre = self.grand("Colis abîmés", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        gr = Grille(centre=P(0, 0.62), pas=0.1)
        self.play(LaggedStart(*[FadeIn(c, scale=0.3) for c in gr.cases], lag_ratio=0.002), run_time=0.7)
        self.au_mot("5 %")
        l1 = self.ligne([("garantis :", WHITE), ("5 %", COUL_P)], 38, -0.78, buff=0.18)
        self.play(FadeIn(l1, scale=1.3), run_time=0.4)
        self.au_mot("8 %")
        l2 = self.ligne([("trouvés :", WHITE), ("8 %", ABIME)], 38, -1.38, buff=0.18)
        self.play(LaggedStart(*gr.abimer(ABIMES_32), lag_ratio=0.03), FadeIn(l2, scale=1.3), run_time=0.8)
        self.au_mot("sur 400")
        l3 = self.ligne([("sur 400 colis", WHITE)], 32, -1.92)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.insister(gr, 1.08, 0.18)
        self.au_mot("Écart trop grand")
        q = self.ligne([("Écart trop grand ?", JAUNE_TITRE)], 40, -2.48)
        self.play(FadeIn(q, scale=1.4), run_time=0.4)
        self.insister(q, 1.2, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'axe : la distance 0,03 tient dans la marge 0,05 ──
        self.dire("01-image")
        ax = Axe(gauche=-1.95, longueur=3.7, vmax=0.12, y=1.3, fs=24)
        rp, rf = ax.repere(0.05, "p", COUL_P, r=0.08), ax.repere(0.08, "f", COUL_F, r=0.08)
        self.play(FadeOut(VGroup(gr, l1, l2, l3, q, badge)), FadeIn(ax), run_time=0.4)
        self.play(FadeIn(rp, scale=1.5), FadeIn(rf, scale=1.5), run_time=0.3)
        self.au_mot("Distance")
        br = ax.accolade(0.05, 0.08, WHITE, buff=0.15)
        self.play(GrowFromCenter(br), run_time=0.35)
        self.au_mot("0,08")
        c = self.ligne([("0,08", COUL_F), ("−", WHITE), ("0,05", COUL_P), ("=", WHITE), ("0,03", VERT_OK)],
                       36, -1.05, buff=0.13)
        vf, vp = ax.valeur(0.08, "0,08", COUL_F), ax.valeur(0.05, "0,05", COUL_P)
        self.play(FadeIn(vf, scale=1.4), FadeIn(c[0], scale=1.4), run_time=0.35)
        self.au_mot("moins 0,05")
        self.play(FadeIn(vp, scale=1.4), FadeIn(c[1:3], scale=1.4), run_time=0.35)
        self.au_mot("0,03. ")
        lab = ax.sur_accolade(br, "0,03", VERT_OK, fs=28)
        self.play(FadeIn(c[3:], scale=1.6), br.animate.set_color(VERT_OK), FadeIn(lab, scale=1.6), run_time=0.4)
        self.au_mot("La marge")
        rg = ax.regle(0.05, 0.05, dy=-1.45, h=0.24)
        mg, md = ax.mesure(rg, -1), ax.mesure(rg, 1)
        bande = ax.bande(0.05, 0.05, h=0.4)
        m = self.ligne([("marge :", REGLE), ("0,05", REGLE)], 36, -1.68, buff=0.16)
        self.play(GrowFromPoint(rg, ax.x(0.05) + DOWN * 1.45), FadeIn(bande), FadeIn(m[0]), run_time=0.5)
        self.au_mot("colis : 0,05")
        self.play(FadeIn(m[1], scale=1.6), FadeIn(mg, scale=1.4), FadeIn(md, scale=1.4), run_time=0.4)
        self.au_mot("0,03, c'est")
        copie = br.copy()
        self.play(copie.animate.shift(DOWN * (br.get_bottom()[1] - rg[0].get_top()[1] + 0.02)), run_time=0.6)
        ok = self.ligne([("dans la marge !", VERT_OK)], 42, -2.35)
        self.au_mot("dans la marge")
        self.play(FadeIn(ok, scale=1.5), bande[0].animate.set_fill(opacity=0.55), rf[0].animate.set_color(VERT_OK),
                  run_time=0.45)
        self.insister(ok, 1.2, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : 12 % sur 400, tu réclames ? ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        gr2 = Grille(centre=P(0, 0.5), pas=0.1)
        self.play(FadeOut(titre), FadeOut(VGroup(ax, rp, rf, br, lab, vf, vp, c, rg, mg, md, bande, m, copie, ok)),
                  run_time=0.35)
        self.play(FadeIn(toi, shift=DOWN * 0.2), FadeIn(gr2, scale=0.8), run_time=0.4)
        self.au_mot("12 %")
        q1 = self.ligne([("12 %", ROUGE_BANDE), ("sur 400 colis", WHITE)], 36, -1.0, buff=0.16)
        self.play(LaggedStart(*gr2.abimer(ABIMES_48), lag_ratio=0.02), FadeIn(q1, scale=1.3), run_time=0.8)
        self.au_mot("tu réclames")
        q2 = self.ligne([("Tu réclames ?", ORANGE_RETENUE)], 44, -1.8)
        self.play(FadeIn(q2, scale=1.4), run_time=0.4)
        self.insister(q2, 1.2, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK, weight=BOLD), self.t("commentaire !", 40, VERT_OK, weight=BOLD))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.4))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
