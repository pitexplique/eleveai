# proba_probaC_distinguer_short.py
# EleveAI — short jumeau de « Distinguer P(A ∩ B), P_A(B) et P_B(A) »,
# commun STMG (probaC_distinguer) et 1re tronc commun (auto_proba_distinguer).
# CEINTURE JAUNE. Il AMUSE : au cinéma, 90 % des mangeurs de pop-corn prennent
# une boisson… donc 90 % des buveurs prennent du pop-corn ? Non : 0,3 !
#   · en HAUT le pop-corn et la boisson, qui échangent leurs places ; puis UN
#     pot de pop-corn (100) face à TROIS gobelets (300) ;
#   · en BAS, EN MÊME TEMPS, le tableau croisé du coach (`tableau_donnees`) :
#     100 dans la ligne Pop-corn, 90 au croisement, 300 au bas de la colonne
#     Boisson, la COLONNE s'allume, 90 / 300 = 0,3 ; « Pas 0,9 ! » ;
#   · fin : 1 000 clients, « pop-corn ET boisson ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
# ⭐ L'identité n'apparaît pas : UN rendu suffit, copié sous les deux noms.
#
# Voix : manim/voix/stmg-premiere-proba-distinguer-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_distinguer_short.py ShortProbaDistinguerSTMG -o eleveai-maths-stmg-proba-distinguer-short --media_dir manim/scripts/stmg/media-probaC_distinguer
# (ShortProbaDistinguerPremiere → eleveai-maths-premiere-commun-proba-distinguer-short : même image.)
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/04-distinguer/
# et manim/sorties/premiere-commun/maths/probabilites/04-distinguer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaC_distinguer import P, TableauCroise, frac, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


def popcorn(s=1.0):
    pot = Polygon(P(-0.38, 0.3), P(0.38, 0.3), P(0.28, -0.45), P(-0.28, -0.45), fill_color=WHITE, fill_opacity=1,
                  stroke_color=WHITE, stroke_width=2)
    bandes = VGroup()
    for k in range(3):
        x = -0.24 + 0.24 * k
        bandes.add(Polygon(P(x - 0.06, 0.3), P(x + 0.06, 0.3), P(x * 0.74 + 0.045, -0.45), P(x * 0.74 - 0.045, -0.45),
                           fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0))
    grains = VGroup(*[Circle(radius=0.11, fill_color="#FEF3C7", fill_opacity=1, stroke_color="#F59E0B",
                             stroke_width=1.5).move_to(P(x, y))
                      for x, y in ((-0.28, 0.36), (-0.1, 0.42), (0.1, 0.4), (0.28, 0.35), (-0.18, 0.55),
                                   (0.02, 0.6), (0.2, 0.53))])
    return VGroup(pot, bandes, grains).scale(s)


def boisson(s=1.0):
    gob = Polygon(P(-0.3, 0.35), P(0.3, 0.35), P(0.22, -0.45), P(-0.22, -0.45), fill_color="#2563EB",
                  fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    bande = Polygon(P(-0.27, 0.05), P(0.27, 0.05), P(0.25, -0.12), P(-0.25, -0.12), fill_color=WHITE,
                    fill_opacity=1, stroke_width=0)
    cou = RoundedRectangle(width=0.68, height=0.1, corner_radius=0.04, fill_color="#E2E8F0", fill_opacity=1,
                           stroke_width=0).move_to(P(0, 0.39))
    paille = Line(P(0.05, 0.42), P(0.2, 0.85), color=ROUGE_ERREUR, stroke_width=6)
    return VGroup(paille, gob, bande, cou).scale(s)


class ShortProbaDistinguerBase(Short6e):
    nom_voix = "stmg-premiere-proba-distinguer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def tableau(self):
        tb = TableauCroise(lignes=["Pop-corn", "Sans", "Total"], colonnes=["Boisson", "Sans", "Total"],
                           valeurs=[[90, None, 100], [None, None, None], [300, None, "1 000"]],
                           larg_lab=2.15, larg=1.95, fs=26)
        tb.scale_to_fit_width(LARGEUR_MAX).move_to(P(0, -0.38))
        tb.remove(tb.vals)
        return tb

    def poser(self, tb, i, j):
        tb.posees.add((i, j))
        tb.add(tb.val[i][j])
        return FadeIn(tb.val[i][j], scale=1.8)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 90 % dans un sens… et dans l'autre ? ──
        self.dire("00-accroche")
        titre = self.grand("Au cinéma", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        pc = popcorn(0.92).move_to(P(-1.15, 1.3))
        bo = boisson(0.92).move_to(P(1.15, 1.3))
        # ⭐ l'image à 1 s : titre, ceinture, pop-corn et boisson d'emblée
        self.add(titre, badge)
        self.play(FadeIn(pc, shift=UP * 0.3), FadeIn(bo, shift=UP * 0.3), run_time=0.4)

        def ligne(a, b, fin, c_fin=JAUNE_TITRE):
            g = suite(a, self.t("→", 40), b, self.t(":", 40), *fin, buff=0.16)
            return g.scale_to_fit_width(min(g.width, LARGEUR_MAX))

        self.au_mot("90 %")
        l1 = ligne(popcorn(0.5), boisson(0.5), [self.t("90 %", 52, JAUNE_TITRE)]).move_to(P(0, -0.35))
        self.play(FadeIn(l1[0], shift=UP * 0.2), FadeIn(l1[4], scale=0.5), Indicate(pc, scale_factor=1.25),
                  run_time=0.6)
        self.au_mot("prennent aussi une boisson")
        fl = Arrow(pc.get_right(), bo.get_left(), buff=0.15, color=JAUNE_TITRE, stroke_width=6)
        self.play(GrowArrow(fl), FadeIn(l1[1:4]), Indicate(bo, scale_factor=1.25), run_time=0.6)
        self.insister(l1[4], 1.3, 0.2)
        self.au_mot("Donc 90 %")
        # la surprise : le pop-corn et la boisson ÉCHANGENT leurs places
        self.play(FadeOut(fl), pc.animate.move_to(P(1.15, 1.3)), bo.animate.move_to(P(-1.15, 1.3)),
                  path_arc=PI * 0.8, run_time=0.8)
        fl2 = Arrow(P(-0.6, 1.3), P(0.6, 1.3), buff=0, color=ORANGE_RETENUE, stroke_width=6)
        self.play(GrowArrow(fl2), run_time=0.3)
        self.au_mot("prennent une boisson")
        l2 = ligne(boisson(0.5), popcorn(0.5), [self.t("90 %", 52, JAUNE_TITRE), self.t("?", 60, ORANGE_RETENUE)])
        l2.move_to(P(0, -1.45))
        self.play(FadeIn(l2, shift=UP * 0.2), run_time=0.6)
        self.insister(l2[5], 1.5, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : on compte : la LIGNE pop-corn, puis la COLONNE boisson ──
        self.dire("01-image")
        tb = self.tableau()
        self.au_mot("Comptons")
        self.play(FadeOut(VGroup(l1, l2), shift=DOWN * 0.3), FadeOut(fl2), FadeIn(tb, shift=UP * 0.2),
                  pc.animate.move_to(P(-1.15, 1.3)), bo.animate.move_to(P(1.15, 1.3)), run_time=0.8)
        self.au_mot("100 clients")
        self.play(*tb.etat(lignes=(0,)), self.poser(tb, 0, 2), pc.animate.scale(1.3), run_time=0.5)
        self.play(pc.animate.scale(1 / 1.3), run_time=0.3)
        self.au_mot("dont 90")
        self.play(self.poser(tb, 0, 0), run_time=0.5)
        self.insister(tb.val[0][0], 1.4, 0.2)
        self.au_mot("Mais 300")
        # UN pot de pop-corn… TROIS gobelets
        bos = VGroup(bo, boisson(0.74), boisson(0.74))
        self.play(bo.animate.scale(0.8).move_to(P(0.45, 1.3)), run_time=0.3)
        bos[1].move_to(P(1.15, 1.3))
        bos[2].move_to(P(1.85, 1.3))
        self.play(FadeIn(bos[1], shift=DOWN * 0.4), FadeIn(bos[2], shift=DOWN * 0.4), *tb.etat(colonnes=(0,)),
                  self.poser(tb, 2, 0), run_time=0.6)
        self.insister(tb.val[2][0], 1.4, 0.2)
        self.au_mot("Parmi eux")
        cad = SurroundingRectangle(VGroup(tb.rect[0][1], tb.rect[3][1]), color=JAUNE_TITRE, buff=0.03,
                                   stroke_width=5)
        self.play(Create(cad), Indicate(bos, color=JAUNE_TITRE, scale_factor=1.1), run_time=0.5)
        self.au_mot("90 sur 300")
        fr = frac(90, 300, 50, WHITE, color_d=ORANGE_RETENUE)
        eg = self.t("=", 52)
        v = self.t("0,3", 56, JAUNE_TITRE)
        suite(fr, eg, v, buff=0.22).move_to(P(0, -1.78))
        self.play(TransformFromCopy(tb.val[0][0], fr[0]), Create(fr[1]), TransformFromCopy(tb.val[2][0], fr[2]),
                  run_time=0.7)
        self.au_mot("égale 0,3")
        self.play(FadeIn(eg), FadeIn(v, scale=0.5), run_time=0.35)
        self.insister(v, 1.3, 0.2)
        self.au_mot("Pas 0,9")
        tampon = self.grand("Pas 0,9 !", font_size=70, color=ROUGE_ERREUR, marge=0.5)
        cadre_t = SurroundingRectangle(tampon, color=ROUGE_ERREUR, buff=0.12, stroke_width=6)
        tp = VGroup(cadre_t, tampon).rotate(0.18)
        tp.scale_to_fit_width(min(tp.width, 3.6)).move_to(P(0, 1.3)).set_z_index(10)
        fond = BackgroundRectangle(tp, fill_opacity=0.75, buff=0.05).set_z_index(9)
        self.play(FadeIn(fond), FadeIn(tp, scale=2.2), run_time=0.35)
        self.play(Wiggle(tp, scale_value=1.1), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : 1 000 clients, pop-corn ET boisson ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(fr, eg, v), shift=DOWN * 0.3), FadeOut(cad),
                  FadeOut(VGroup(fond, tp)), *tb.etat(), run_time=0.5)
        self.au_mot("1 000 clients")
        self.play(self.poser(tb, 2, 2), *tb.etat(cases=((2, 2),), eteindre=False), run_time=0.5)
        self.insister(tb.val[2][2], 1.4, 0.2)
        self.au_mot("Quelle est la probabilité")
        q1 = self.t("Probabilité qu'un client prenne", 28).move_to(P(0, -1.45))
        self.play(FadeIn(q1, shift=UP * 0.15), *tb.etat(), run_time=0.4)
        self.au_mot("pop-corn ET boisson")
        q2 = suite(popcorn(0.42), self.t("pop-corn", 32), self.t("ET", 36, ORANGE_RETENUE), self.t("boisson", 32),
                   boisson(0.42), self.t("?", 40, ORANGE_RETENUE), buff=0.12)
        q2.scale_to_fit_width(min(q2.width, LARGEUR_MAX)).move_to(P(0, -1.95))
        self.play(FadeIn(q2, shift=UP * 0.15), *tb.etat(cases=((0, 0),), eteindre=False), run_time=0.5)
        self.insister(q2[2], 1.4, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = self.grand("Réponds en commentaire !", font_size=46, color=VERT_OK, marge=0.25).move_to(P(0, -2.55))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaDistinguerSTMG(ShortProbaDistinguerBase):
    pass


class ShortProbaDistinguerPremiere(ShortProbaDistinguerBase):
    pass
