# proba_va_variance_short.py
# EleveAI — Maths 1re spé — short jumeau de « Calculer une variance ».
# CEINTURE ORANGE. Il AMUSE : « de combien s'écarte-t-on de la moyenne ? »
# On fait la moyenne pondérée des écarts… et on trouve 0 ! La BALANÇOIRE :
# les trois gains de la roue (0, 2, 10 €) posés sur une planche, des poids
# proportionnels à leurs probabilités, le pivot à E = 1,6 : elle tient en
# équilibre. Les écarts se compensent TOUJOURS, d'où le carré de la variance.
#   · en HAUT la roue qui tourne, puis la balançoire qui oscille et s'arrête ;
#   · en BAS, EN MÊME TEMPS : −0,96 + 0,12 + 0,84 = 0 ;
#   · fin : « une roue qui paie 2 € à tous les coups : sa variance ? »,
#     « Réponds en commentaire ! », puis « Entraîne-toi sur eleveai.fr ».
# Nombres (Python, fractions exactes) : 0,6 × (−1,6) = −0,96 ; 0,3 × 0,4 =
# 0,12 ; 0,1 × 8,4 = 0,84 ; somme 0.
#
# Voix : manim/voix/premiere-proba-va-variance-short.json (débit −6), calée
# par proba_va_variance_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/proba_va_variance_short.py ShortProbaVaVariancePremiereSpe -o eleveai-maths-premiere-proba-va-variance-short --media_dir manim/scripts/premiere/media-va_variance-1s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_variance import (  # noqa: E402
    COUL_0, COUL_2, COUL_10, ENCRE, MOINS, ROUE, MotsCales, P, RoueKermesse, suite,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
PLANCHE = "#B45309"     # le bois de la balançoire


class Balancoire(VGroup):
    """La planche de 0 à 10 (à l'échelle), trois poids (aire ∝ probabilité) et
    le pivot sous E = 1,6. self.bascule = ce qui tourne (planche + poids)."""

    def __init__(self, y=0.55, gauche=-1.65, larg=3.3):
        super().__init__()
        self.xv = lambda v: gauche + v / 10 * larg
        self.y = y
        planche = RoundedRectangle(width=larg + 0.3, height=0.12, corner_radius=0.05, fill_color=PLANCHE,
                                   fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
        planche.move_to(P(gauche + larg / 2, y))
        self.poids = VGroup()
        for v, p, c in [(0, 0.6, COUL_0), (2, 0.3, COUL_2), (10, 0.1, COUL_10)]:
            r = 0.42 * p ** 0.5
            d = Circle(radius=r, fill_color=c, fill_opacity=1, stroke_color=ENCRE, stroke_width=2)
            self.poids.add(d.move_to(P(self.xv(v), y + 0.06 + r)))
        self.etiq = VGroup(*[Text(f"{v} €", font_size=22, color=WHITE, weight=BOLD)
                             .next_to(d, UP, buff=0.08) for v, d in zip((0, 2, 10), self.poids)])
        self.pivot_pt = P(self.xv(1.6), y - 0.06)
        self.pivot = Polygon(self.pivot_pt, self.pivot_pt + P(-0.3, -0.55), self.pivot_pt + P(0.3, -0.55),
                             fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
        self.bascule = VGroup(planche, self.poids)
        self.add(self.pivot, self.bascule)

    def osciller(self, scene, a0=0.3, run_time=2.4):
        depart = self.bascule.copy()

        def f(m, a):
            m.become(depart)
            m.rotate(a0 * np.cos(3 * PI * a) * (1 - a) ** 1.5, about_point=self.pivot_pt)

        scene.play(UpdateFromAlphaFunc(self.bascule, f), run_time=run_time, rate_func=linear)


class ShortProbaVaVarianceBase(MotsCales, Short6e):
    nom_voix = "premiere-proba-va-variance-short"
    fichier_marques = "proba_va_variance_short_marques.json"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, weight=NORMAL):
        t = Text(texte, font_size=font_size, color=color, weight=weight)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, fs=34, y=-1.0, buff=0.12):
        g = suite(*[Text(x, font_size=fs, color=c) for x, c in morceaux], buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def insister(self, mob, k=1.3, run_time=0.22):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : la roue paie 0, 2 ou 10 € ; 1,6 en moyenne ; l'écart moyen ? ──
        self.dire("00-accroche")
        titre = self.grand("L'écart moyen ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        r = RoueKermesse(ROUE, centre=P(0, 0.3), r=0.95, fs=24, carte=False)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(r, scale=0.6), run_time=0.6)
        self.au_mot("organisatrice")
        metier = self.ligne([("Organisatrice de kermesse", BLEU_CALCUL)], 30, -1.0)
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.3)
        for k, mot in enumerate(["0, 2", "2 ou", "10 euros"]):
            self.au_mot(mot)
            self.play(FadeIn(r.etiq[k], scale=1.8), Indicate(r.parts[k], scale_factor=1.06), run_time=0.3)
        self.au_mot("1,6 en moyenne")
        moy = self.ligne([("En moyenne :", WHITE), ("1,6 €", JAUNE_TITRE)], 36, -1.6, buff=0.18)
        self.play(FadeIn(moy, scale=1.3), run_time=0.35)
        r.tourner(self, tours=0.8, run_time=0.7)
        self.au_mot("De combien")
        q = self.ligne([("Écart moyen ?", ORANGE_RETENUE)], 46, -2.35)
        self.play(FadeIn(q, scale=1.6), run_time=0.35)
        self.insister(q)
        self.attendre_voix(marge=0.1)

        # ── 01 : la balançoire : −0,96 + 0,12 + 0,84 = 0 ! ──
        self.dire("01-image")
        b = Balancoire()
        self.play(FadeOut(VGroup(r, r.etiq), scale=0.6), FadeOut(VGroup(metier, moy, q), shift=DOWN * 0.2), FadeIn(b, shift=UP * 0.2),
                  FadeIn(b.etiq), run_time=0.5)
        e_lab = self.t("1,6", 24, ORANGE_RETENUE, weight=BOLD).next_to(b.pivot, DOWN, buff=0.06)
        self.play(FadeIn(e_lab), run_time=0.2)
        b.osciller(self, run_time=1.1)
        s = self.ligne([(MOINS + "0,96", COUL_0), ("+", WHITE), ("0,12", COUL_2), ("+", WHITE), ("0,84", COUL_10),
                        ("=", WHITE), ("0", VERT_OK)], 40, -1.2, buff=0.1)
        self.au_mot("moins 0,96")
        self.play(FadeIn(s[0], scale=1.5), Indicate(b.poids[0], scale_factor=1.3), run_time=0.3)
        self.au_mot("plus 0,12")
        self.play(FadeIn(s[1]), FadeIn(s[2], scale=1.5), Indicate(b.poids[1], scale_factor=1.3), run_time=0.3)
        self.au_mot("plus 0,84")
        self.play(FadeIn(s[3]), FadeIn(s[4], scale=1.5), Indicate(b.poids[2], scale_factor=1.3), run_time=0.3)
        self.au_mot("égale 0")
        self.play(FadeIn(s[5]), FadeIn(s[6], scale=2.4), run_time=0.35)
        self.insister(s[6], 1.6)
        self.au_mot("Ça se compense")
        comp = self.ligne([("Ça se compense !", VERT_OK)], 40, -2.1)
        self.play(FadeIn(comp, scale=1.3), run_time=0.35)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : une roue qui paie 2 € à tous les coups ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        r2 = RoueKermesse([("2 €", 1.0, COUL_2)], centre=P(0, 0.3), r=0.9, fs=30, carte=False)
        r2.etiq[0].move_to(P(0, 0.75))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(b, b.etiq, e_lab, s, comp, badge)),
                  FadeIn(r2, scale=0.6), run_time=0.5)
        self.au_mot("2 euros")
        self.play(FadeIn(r2.etiq[0], scale=1.8), run_time=0.3)
        self.au_mot("à tous les coups")
        g = self.ligne([("2 €", JAUNE_TITRE), ("à tous les coups", WHITE)], 32, -1.15, buff=0.15)
        self.play(FadeIn(g, shift=UP * 0.1), run_time=0.35)
        r2.tourner(self, tours=1.0, run_time=0.8)
        self.au_mot("quelle est sa variance")
        v = self.ligne([("V(X)", JAUNE_TITRE), ("=", WHITE), ("?", ORANGE_RETENUE)], 54, -2.05)
        self.play(FadeIn(v, scale=1.4), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.5))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 03 : la fin : « Entraîne-toi sur eleveai.fr. Et abonne-toi ! » ──
        self.fin_short("03-abonne", [toi, r2, r2.etiq, g, v, appel])

    def fin_short(self, voix, a_effacer):
        self.dire(voix)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.4))
        site = self.t("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.0))
        poignee = self.t("@eleveai974", 44, VERT_OK).move_to(P(0, -0.85))
        self.play(FadeOut(VGroup(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)


class ShortProbaVaVariancePremiereSpe(ShortProbaVaVarianceBase):
    identite = "Maths 1re spé — EleveAI"
