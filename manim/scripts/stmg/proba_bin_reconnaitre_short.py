# proba_bin_reconnaitre_short.py
# EleveAI — short jumeau de « Reconnaître une loi binomiale »
# (STMG : vaT_bin_reconnaitre ; Tle spé : binomiale_reconnaitre).
# Il AMUSE : « 10 appels, 20 % de chances… combien de ventes ? »
#   · en HAUT : les 10 téléphones qui sonnent, puis affichent vente (panneau
#     solaire, écran vert) ou pas (croix) ;
#   · en BAS, EN MÊME TEMPS : les quatre conditions cochées, puis B(10 ; 0,2) ;
#   · fin : le PREMIER appel qui vend s'encadre, « loi binomiale ? »,
#     « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran, mais la CEINTURE
# diffère : ShortProbaBinReconnaitreSTMG (jaune), ShortProbaBinReconnaitreTerminale (orange).
# ⛔ PAS D'ÉCART : aucun nombre de ventes n'est écrit (la voix n'en dit aucun).
#
# Voix : manim/voix/stmg-terminale-proba-bin-reconnaitre-short.json (débit −7).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bin_reconnaitre_short.py ShortProbaBinReconnaitreSTMG -o eleveai-maths-stmg-proba-bin-reconnaitre-short --media_dir manim/scripts/stmg/media-vaT_bin_reconnaitre
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bin_reconnaitre_short.py ShortProbaBinReconnaitreTerminale -o eleveai-maths-terminale-proba-bin-reconnaitre-short --media_dir manim/scripts/stmg/media-vaT_bin_reconnaitre

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bin_reconnaitre import (  # noqa: E402  (pose les chemins)
    C_S, PROBA_C, VENTES, P, colorer_tel, issue_tel, loi_B, ondes, suite, telephone,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaBinReconnaitreBase(Short6e):
    nom_voix = "stmg-terminale-proba-bin-reconnaitre-short"
    ceinture = "jaune"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=34, y=-1.0, buff=0.14):
        g = suite(*[Text(x, font_size=fs, color=c) for x, c in morceaux], buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 10 appels, 20 %… combien de ventes ? ──
        self.dire("00-accroche")
        titre = self.grand("Le centre d'appels", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        tels = VGroup(*[telephone(0.62) for _ in range(10)]).arrange_in_grid(rows=2, cols=5, buff=(0.32, 0.3))
        tels.move_to(P(0, 0.75))
        l1 = self.ligne([("10", JAUNE_TITRE), ("appels", WHITE)], 42, -0.85, 0.2)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(l1, scale=1.1),
                  LaggedStart(*[FadeIn(t, scale=0.4) for t in tels], lag_ratio=0.06), run_time=0.7)
        self.au_mot("20 %")
        l2 = self.ligne([("20 %", JAUNE_TITRE), ("de vendre", WHITE)], 38, -1.6, 0.2)
        self.play(FadeIn(l2, scale=1.1), run_time=0.4)
        self.insister(l2[0], 1.2, 0.2)
        self.au_mot("Combien de ventes")
        q = self.ligne([("Combien de ventes ?", ORANGE_RETENUE)], 38, -2.4)
        ond = VGroup(*[ondes(t, 1).scale(0.8) for t in tels])
        self.play(FadeIn(q, scale=1.1), Create(ond), *[Wiggle(t, scale_value=1.12) for t in tels], run_time=0.8)
        self.attendre_voix(marge=0.1)

        # ── 01 : les conditions cochées ; B(10 ; 0,2) ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(l1, l2, q), shift=DOWN * 0.2), FadeOut(ond), run_time=0.3)
        conds = [("même épreuve", "Même épreuve"), ("répétée 10 fois", "répétée 10 fois"),
                 ("indépendante", "indépendante"), ("on compte les ventes", "on compte les ventes")]
        lignes = VGroup()
        for k, (txt, _) in enumerate(conds):
            l = suite(self.coche(taille=0.15), self.t(txt, 30), buff=0.2)
            lignes.add(l)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        if lignes.width > 3.9:
            lignes.scale_to_fit_width(3.9)
        lignes.move_to(P(0, -1.45))
        anims, marques = [], []
        for t, v in zip(tels, VENTES):
            marques.append(issue_tel(t, v))
        seps = VGroup(*[DashedLine(P((tels[k].get_x() + tels[k + 1].get_x()) / 2, tels[k].get_top()[1]),
                                   P((tels[k].get_x() + tels[k + 1].get_x()) / 2, tels[k].get_bottom()[1]),
                                   color=BLEU_CALCUL, dash_length=0.06, stroke_width=2)
                        for k in list(range(4)) + list(range(5, 9))])
        for k, (_, mot) in enumerate(conds):
            self.au_mot(mot)
            extra = []
            if k == 0:
                extra = [Indicate(tels[0], color=JAUNE_TITRE, scale_factor=1.3)]
            elif k == 1:
                extra = [*[colorer_tel(t, v) for t, v in zip(tels, VENTES)],
                         *[FadeIn(m, scale=0.4) for m in marques]]
            elif k == 2:
                extra = [Create(seps)]
            else:
                extra = [Indicate(t, color=C_S, scale_factor=1.35) for t, v in zip(tels, VENTES) if v]
            self.play(FadeIn(lignes[k], shift=RIGHT * 0.2), *extra, run_time=0.45)
        self.au_mot("c'est une loi binomiale")
        lb = self.ligne([("loi binomiale !", JAUNE_TITRE)], 44, -1.0)
        self.play(FadeOut(lignes), run_time=0.2)
        self.play(FadeIn(lb, scale=1.08), run_time=0.3)
        self.au_mot("B de 10")
        n_obj, p_obj = Text("10", font_size=56, color=JAUNE_TITRE), Text("0,2", font_size=56, color=PROBA_C)
        b = loi_B(n_obj, p_obj, 56).move_to(P(0, -2.1))
        if b.width > 3.6:
            b.scale_to_fit_width(3.6)
        self.play(FadeIn(VGroup(b[0], b[1], b[2]), scale=1.3), run_time=0.4)
        self.au_mot("virgule 0,2")
        self.play(FadeIn(VGroup(b[3], b[4], b[5]), scale=1.3), run_time=0.4)
        cadre = SurroundingRectangle(b, color=JAUNE_TITRE, buff=0.18, stroke_width=5, corner_radius=0.1)
        self.play(Create(cadre), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : le premier appel qui vend ? ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(lb, b, cadre), shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("le numéro")
        k0 = VENTES.index(True)
        enc = SurroundingRectangle(tels[k0], color=ORANGE_RETENUE, buff=0.08, stroke_width=6)
        q1 = VGroup(self.t("le numéro du premier", 32), self.t("appel qui vend", 32)).arrange(DOWN, buff=0.08)
        q1.move_to(P(0, -0.95))
        self.play(*[tels[j].animate.set_opacity(0.3) for j in range(10) if j != k0], Create(enc),
                  FadeIn(q1, shift=UP * 0.15), run_time=0.6)
        foc = VGroup(tels[k0], enc)
        self.play(foc.animate.scale(1.4), run_time=0.25)
        self.play(foc.animate.scale(1 / 1.4), run_time=0.25)
        self.au_mot("c'est aussi")
        q2 = self.ligne([("loi binomiale ?", ORANGE_RETENUE)], 42, -2.1)
        self.play(FadeIn(q2, scale=1.1), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.4))
        self.play(FadeOut(badge), FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaBinReconnaitreSTMG(ShortProbaBinReconnaitreBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"


class ShortProbaBinReconnaitreTerminale(ShortProbaBinReconnaitreBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"
