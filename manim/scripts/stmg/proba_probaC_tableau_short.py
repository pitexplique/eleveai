# proba_probaC_tableau_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Calculer une probabilité conditionnelle avec un tableau croisé ».
# CEINTURE JAUNE. Il AMUSE : un festival, des gobelets triés… qui trie le
# mieux, ceux venus en bus ou ceux venus en voiture ? 150 > 80, et pourtant
# le bus gagne.
#   · en HAUT : la scène, la foule, les gobelets, le bus et la voiture, puis le
#     TABLEAU CROISÉ du coach (`tableau_donnees`), lignes Bus / Voiture, qui se
#     remplit quand la voix dit les nombres ; la LIGNE Bus puis la LIGNE
#     Voiture s'allument ; à la question, la COLONNE « Trient » ;
#   · en BAS, EN MÊME TEMPS : 150 > 80, puis 80 sur 100 = 0,8, 150 sur 300 = 0,5 ;
#   · fin : la question et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran :
# UN seul rendu, copié dans les dossiers STMG et 1re.
#
# Voix : manim/voix/stmg-premiere-proba-tableau-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_tableau_short.py ShortProbaTableau -o eleveai-maths-stmg-proba-tableau-short --media_dir manim/scripts/stmg/media-probaC_tableau
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/03-tableau/ et, sous le nom
# eleveai-maths-premiere-commun-proba-tableau-short.mp4, dans manim/sorties/premiere-commun/maths/probabilites/03-tableau/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaC_tableau import P, TableauCroise, frac, voiture  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
JAUNE_BUS = "#FACC15"


def bus(s=1.0):
    caisse = RoundedRectangle(width=1.9, height=0.8, corner_radius=0.12, fill_color=JAUNE_BUS, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=2)
    vitres = VGroup(*[RoundedRectangle(width=0.3, height=0.26, corner_radius=0.04, fill_color="#BAE6FD",
                                       fill_opacity=1, stroke_width=0).move_to(P(-0.65 + 0.4 * k, 0.12))
                      for k in range(4)])
    roues = VGroup(*[Circle(radius=0.17, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                            stroke_width=2).move_to(P(x, -0.4)) for x in (-0.55, 0.55)])
    return VGroup(caisse, vitres, roues).scale(s)


def gobelet(s=1.0, couleur="#22C55E"):
    corps = Polygon(P(-0.2, 0.28), P(0.2, 0.28), P(0.14, -0.28), P(-0.14, -0.28), fill_color=WHITE,
                    fill_opacity=1, stroke_color="#CBD5E1", stroke_width=2)
    bande = Polygon(P(-0.18, 0.08), P(0.18, 0.08), P(0.16, -0.08), P(-0.16, -0.08), fill_color=couleur,
                    fill_opacity=1, stroke_width=0)
    return VGroup(corps, bande).scale(s)


def bac_tri(s=1.0):
    cuve = Polygon(P(-0.45, 0.4), P(0.45, 0.4), P(0.36, -0.5), P(-0.36, -0.5), fill_color="#16A34A",
                   fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    fleche = Arc(radius=0.18, start_angle=0.3, angle=TAU * 0.8, color=WHITE, stroke_width=4).move_to(P(0, -0.05))
    fleche.add_tip(tip_length=0.1, tip_width=0.1)
    return VGroup(cuve, fleche).scale(s)


def scene_festival():
    plateau = Rectangle(width=3.6, height=0.9, fill_color="#7C3AED", fill_opacity=1, stroke_color=WHITE,
                        stroke_width=2).move_to(P(0, 1.35))
    toit = Polygon(P(-1.95, 1.8), P(1.95, 1.8), P(1.5, 2.0), P(-1.5, 2.0), fill_color="#4C1D95", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=2)
    spots = VGroup(*[Polygon(P(x, 1.78), P(x - 0.35, 0.95), P(x + 0.35, 0.95), fill_color=JAUNE_TITRE,
                             fill_opacity=0.35, stroke_width=0) for x in (-1.1, 0, 1.1)])
    return VGroup(plateau, spots, toit)


def foule(n_lig=3, n_col=14):
    return VGroup(*[Circle(radius=0.09, fill_color=c, fill_opacity=1, stroke_width=0)
                    .move_to(P(-1.95 + 0.3 * k + (0.15 if r % 2 else 0), 0.65 - 0.22 * r))
                    for r in range(n_lig) for k, c in zip(range(n_col),
                                                          ["#38BDF8", "#F472B6", "#FBBF24", "#A3E635"] * 4)])


class ShortProbaTableau(Short6e):
    ceinture = "jaune"
    nom_voix = "stmg-premiere-proba-tableau-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : le festival, les gobelets, bus ou voiture ? ──
        self.dire("00-accroche")
        titre = self.grand("Le festival", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.55))
        sc = scene_festival()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(sc, shift=UP * 0.3), run_time=0.8)
        self.au_mot("400 festivaliers")
        gens = foule()
        n400 = self.grand("400 festivaliers", font_size=44).move_to(P(0, -0.45))
        self.play(LaggedStart(*[FadeIn(g, shift=UP * 0.3) for g in gens], lag_ratio=0.02), FadeIn(n400, scale=0.6),
                  run_time=0.8)
        self.play(gens.animate.shift(UP * 0.08), rate_func=there_and_back, run_time=0.3)
        self.au_mot("Qui trie")
        bac = bac_tri(0.75).move_to(P(1.75, -1.35))
        gobs = VGroup(*[gobelet(0.7).move_to(P(-1.6 + 0.55 * k, -1.2)) for k in range(5)])
        q = self.t("Qui trie le mieux ?", 36, ORANGE_RETENUE).move_to(P(0, -0.45))
        self.play(ReplacementTransform(n400, q), FadeIn(bac), LaggedStart(*[FadeIn(g, shift=DOWN * 0.4) for g in gobs],
                                                                          lag_ratio=0.1), run_time=0.7)
        self.play(*[g.animate.move_to(bac.get_top() + DOWN * 0.15).scale(0.4).set_opacity(0) for g in gobs[:3]],
                  run_time=0.6, rate_func=rate_functions.ease_in_quad)
        self.au_mot("en bus")
        b = bus(0.7).move_to(P(-1.2, -2.25))
        self.play(FadeIn(b, shift=RIGHT * 1.0), FadeOut(gobs[3:]), run_time=0.5)
        self.au_mot("ou ceux venus en voiture")
        ou = self.t("ou", 32).move_to(P(0.05, -2.25))
        v = voiture(0.65).move_to(P(1.3, -2.25))
        self.play(FadeIn(ou), FadeIn(v, shift=LEFT * 1.0), run_time=0.5)
        self.play(Indicate(b, scale_factor=1.15), Indicate(v, scale_factor=1.15), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : le tableau se remplit ; la LIGNE Bus, puis la LIGNE Voiture ──
        self.dire("01-image")
        tb = TableauCroise(lignes=["Bus", "Voiture", "Total"], colonnes=["Trient", "Total"],
                           valeurs=[[80, 100], [150, 300], [230, 400]], larg_lab=1.5, larg=1.3, h=0.62, h_ent=0.55,
                           fs=26)
        tb.scale(0.95).move_to(P(0, 1.45))
        for ij in ((0, 0), (0, 1), (1, 0), (1, 1), (2, 0)):
            tb.vals.remove(tb.val[ij[0]][ij[1]])
        tb.posees.add((2, 1))
        self.play(FadeOut(VGroup(sc, gens, badge, bac, q, ou), shift=UP * 0.2), FadeIn(tb, shift=UP * 0.3),
                  b.animate.scale(0.6).move_to(P(-1.0, -2.3)), v.animate.scale(0.6).move_to(P(1.0, -2.3)),
                  run_time=0.8)
        self.au_mot("100 sont venus")
        self.play(tb.poser(0, 1), run_time=0.4)
        self.play(b.animate.shift(RIGHT * 0.25), rate_func=there_and_back, run_time=0.3)
        self.au_mot("80 trient")
        self.play(tb.poser(0, 0), run_time=0.4)
        self.au_mot("300 sont venus")
        self.play(tb.poser(1, 1), run_time=0.4)
        self.play(v.animate.shift(LEFT * 0.25), rate_func=there_and_back, run_time=0.3)
        self.au_mot("150 trient")
        self.play(tb.poser(1, 0), run_time=0.4)
        self.au_mot("150, c'est plus")
        plus = VGroup(self.t("150", 60, "#F87171"), self.t(">", 60), self.t("80", 60, JAUNE_BUS)).arrange(RIGHT, buff=0.3)
        plus.move_to(P(0, -0.55))
        self.play(FadeIn(plus, scale=0.6), *tb.etat(cases=((0, 0), (1, 0)), eteindre=False), run_time=0.5)
        self.insister(plus[0], 1.3)
        self.au_mot("Mais on allume la ligne Bus")
        self.play(FadeOut(plus, shift=UP * 0.2), *tb.etat(lignes=(0,)), run_time=0.5)
        rb = VGroup(self.t("Bus :", 30, JAUNE_BUS), frac(80, 100, 36), self.t("= 0,8", 38, VERT_OK))
        rb.arrange(RIGHT, buff=0.2).move_to(P(0, -0.15))
        self.au_mot("80 sur 100")
        self.play(FadeIn(rb[0]), TransformFromCopy(tb.val[0][0], rb[1][0]), GrowFromCenter(rb[1][1]),
                  TransformFromCopy(tb.val[0][1], rb[1][2]), run_time=0.6)
        self.au_mot("égale 0,8")
        self.play(FadeIn(rb[2], scale=0.6), run_time=0.35)
        self.insister(rb[2], 1.3)
        self.au_mot("La ligne Voiture")
        self.play(*tb.etat(lignes=(1,)), run_time=0.5)
        rv = VGroup(self.t("Voiture :", 30, "#F87171"), frac(150, 300, 36), self.t("= 0,5", 38, VERT_OK))
        rv.arrange(RIGHT, buff=0.2).move_to(P(0, -1.4))
        rb.shift(RIGHT * (rv[1].get_center()[0] - rb[1].get_center()[0]))
        if rv.width > 3.9:
            k = 3.9 / rv.width
            rv.scale(k)
            rb.scale(k)
            rb.shift(RIGHT * (rv[1].get_center()[0] - rb[1].get_center()[0]))
        self.au_mot("150 sur 300")
        self.play(FadeIn(rv[0]), TransformFromCopy(tb.val[1][0], rv[1][0]), GrowFromCenter(rv[1][1]),
                  TransformFromCopy(tb.val[1][1], rv[1][2]), run_time=0.6)
        self.au_mot("égale 0,5")
        self.play(FadeIn(rv[2], scale=0.6), run_time=0.35)
        self.au_mot("Le bus gagne")
        gagne = self.t("Le bus gagne !", 36, VERT_OK)
        cible_b = bus(0.36)
        lg = VGroup(cible_b, gagne).arrange(RIGHT, buff=0.18)
        lg.scale_to_fit_width(min(lg.width, 4.0)).move_to(P(0, -2.45))
        self.play(FadeOut(v, shift=DOWN * 0.3), b.animate.scale(cible_b.width / b.width).move_to(cible_b),
                  FadeIn(gagne, scale=0.6),
                  Circumscribe(rb, color=JAUNE_BUS), run_time=0.7)
        self.play(b.animate.shift(RIGHT * 0.3 + UP * 0.12), rate_func=there_and_back, run_time=0.35)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : la COLONNE « Trient » ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(rb, rv, gagne, b), shift=DOWN * 0.3),
                  *tb.etat(), run_time=0.5)
        self.au_mot("230")
        self.play(tb.poser(2, 0), *tb.etat(colonnes=(0,)), run_time=0.5)
        cad = SurroundingRectangle(VGroup(tb.rect[0][1], tb.rect[3][1]), color=JAUNE_TITRE, buff=0.03,
                                   stroke_width=5)
        l1 = VGroup(self.t("Parmi les", 30), self.t("230", 34, JAUNE_TITRE), self.t("qui trient,", 30))
        l1.arrange(RIGHT, buff=0.15).move_to(P(0, -0.4))
        l1.scale_to_fit_width(min(l1.width, LARGEUR_MAX))
        self.play(Create(cad), FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.insister(tb.val[2][0], 1.4)
        self.au_mot("quelle est la probabilité")
        l2 = VGroup(self.t("probabilité d'être", 30), self.t("venu en bus ?", 30, JAUNE_BUS)).arrange(DOWN, buff=0.12)
        l2.move_to(P(0, -1.2))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.insister(l2[1], 1.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


# 20/10 : la 1re SPÉ, même voix, ceinture ORANGE.
class ShortProbaTableauPremiereSpe(ShortProbaTableau):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "orange"
