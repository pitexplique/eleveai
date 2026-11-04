# puissance_calculer_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 02 « Calculer une puissance :
# (−2)⁴ contre −2⁴ ». CEINTURE BLANCHE, 9:16, identité 4e.
# Il AMUSE : « Ma calculatrice dit −2^4 = −16. Elle est cassée ? »
#   · EN HAUT, la calculatrice qui affiche « −2^4 » puis « −16 », un « ? » ;
#     elle reçoit sa coche verte (« Non ! »), puis ses touches ( ) s'allument et
#     elle affiche « (−2)^4 = 16 » ;
#   · EN BAS, au même instant, le calcul décomposé : l'exposant ne touche que
#     le 2 (flèche orange), 2⁴ = 16, le « − » posé devant : −16 ; puis
#     (−2) × (−2) × (−2) × (−2) = 16 ;
#   · 1 question-pause (3 s) : (−3)² ; fin : −1¹⁰⁰ en commentaire, puis la fin standard.
# Centres d'intérêt : jeux-defis, technologie-ia.
#
# Voix : manim/voix/4e-puissance-calculer-short.json (validée, débit −6) ; WAV :
# public/sons/4e-puissance-calculer-short/ ; marques :
# manim/scripts/4e/puissance_calculer_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_calculer_short.py PuissanceCalculerShort
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_calculer_short.py PuissanceCalculerShort -o eleveai-maths-4e-puissance-calculer-short --media_dir manim/scripts/4e/media-puiss-02-short
# Sortie : manim/sorties/4e/maths/puissances/02-calculer/eleveai-maths-4e-puissance-calculer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from puissance_calculer import (AuNombre, BASE_C, EXPO_C, PIEGE, T, afficher, avec_expo, calculatrice,  # noqa: E402
                                facteur, paire)

Y_IMG = 1.12   # la bande de l'image (la calculatrice)


def ecran_txt(calc, expr, res=None):
    """L'écran de la calculatrice : l'expression en haut à gauche, le résultat en bas à droite."""
    e = calc.ecran
    expr.scale_to_fit_height(e.height * 0.3)
    if expr.width > e.width * 0.85:
        expr.scale_to_fit_width(e.width * 0.85)
    expr.align_to(e.get_left() + RIGHT * 0.1, LEFT).align_to(e.get_top() + DOWN * 0.07, UP)
    if res is not None:
        res.scale_to_fit_height(e.height * 0.3)
        res.align_to(e.get_right() + LEFT * 0.1, RIGHT).align_to(e.get_bottom() + UP * 0.07, DOWN)
    return expr, res


class PuissanceCalculerShort(AuNombre, ShortProp):
    nom_voix = "4e-puissance-calculer-short"
    fichier_marques = "puissance_calculer_short_marques.json"
    ceinture = "blanche"

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Calculatrice cassée ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, margo]
        titre.sans_synchro = True

        # ── 00 : l'accroche : −2^4 = −16, cassée ? ──
        self.dire("00-accroche")
        calc = calculatrice(1.35, 1.9).move_to(P(-0.85, Y_IMG))
        self.play(Write(titre), FadeIn(calc, shift=UP * 0.3), run_time=0.5)
        e1 = VGroup(T("−2", 40, NUIT, gras=True), T("^4", 40, NUIT, gras=True)).arrange(RIGHT, buff=0.04)
        r1 = T("−16", 40, NUIT, gras=True)
        ecran_txt(calc, e1, r1)
        bas = avec_expo(facteur("2", 52, paren=False), 4, 52)
        eg, rb = T("=", 46), T("−16", 46, PIEGE)
        la = VGroup(bas, eg, rb).arrange(RIGHT, buff=0.22).move_to(P(-0.25, -0.52))
        rb.shift(UP * (bas.nb.get_y() - rb.get_y()))
        eg.shift(UP * (bas.nb.get_y() - eg.get_y()))
        self.au_mot("moins 2")
        self.play(FadeIn(e1[0]), FadeIn(VGroup(bas.moins, bas.nb), scale=1.3), run_time=0.3)
        self.au_mot("puissance 4")
        self.play(FadeIn(e1[1]), FadeIn(bas.expo, scale=1.5), run_time=0.3)
        self.au_mot("moins 16")
        self.play(FadeIn(r1, scale=1.3), FadeIn(eg), FadeIn(rb, scale=1.3), run_time=0.35)
        q = T("?", 90, AMBRE, gras=True).move_to(P(0.95, Y_IMG + 0.1))
        qb = T("?", 46, AMBRE, gras=True).next_to(la, RIGHT, buff=0.2)
        self.au_mot("cassée")
        self.play(FadeIn(q, scale=1.6), FadeIn(qb, scale=1.4), Wiggle(calc), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : non ! la puissance d'abord ; avec des parenthèses : 16 ──
        self.dire("01-explication")
        ok = self.coche(VERT_OK, 0.45).move_to(q)
        self.au_mot("Non")
        self.play(FadeOut(q), FadeOut(qb), Create(ok), rb.animate.set_color(VERT_OK), run_time=0.4)
        fl = CurvedArrow(bas.expo.get_top() + UP * 0.08, bas.nb.get_top() + UP * 0.1 + LEFT * 0.04, angle=PI * 0.6,
                         color=EXPO_C, stroke_width=5, tip_length=0.16)
        boite = SurroundingRectangle(bas.nb, color=BASE_C, buff=0.08, corner_radius=0.08)
        self.au_mot("la puissance passe")
        self.play(Create(fl), Create(boite), bas.moins.animate.set_opacity(0.4), run_time=0.5)
        m1, d = T("−", 46), avec_expo(VGroup(T("2", 52, BASE_C)), 4, 52)
        eg2, m2, r16 = T("=", 46), T("−", 46, VERT_OK), T("16", 46)
        lb = VGroup(m1, d, eg2, m2, r16).arrange(RIGHT, buff=0.18).move_to(P(-0.25, -1.3))
        self.au_mot("2 puissance 4")
        self.play(TransformFromCopy(bas.nb, d[0]), run_time=0.35)
        self.au_mot("4, 16")
        self.play(TransformFromCopy(bas.expo, d.expo), run_time=0.3)
        self.au_mot("16,")
        self.play(FadeIn(eg2), FadeIn(r16, scale=1.4), run_time=0.3)
        self.au_mot("le moins devant")
        self.play(bas.moins.animate.set_opacity(1), TransformFromCopy(bas.moins, m1), run_time=0.45)
        self.au_mot("moins 16")
        self.play(FadeIn(m2, shift=RIGHT * 0.2), r16.animate.set_color(VERT_OK), run_time=0.35)
        self.insister(VGroup(m2, r16), 1.25)
        # avec des parenthèses : la calculatrice tape ( ) ; en bas, les quatre facteurs
        halo = VGroup(*[SurroundingRectangle(calc.par[k], color=EXPO_C, buff=0.04, corner_radius=0.04,
                                             stroke_width=5) for k in (0, 2)])
        e2 = VGroup(T("(−2)", 40, NUIT, gras=True), T("^4", 40, NUIT, gras=True, audit=False)).arrange(RIGHT, buff=0.04)
        r2 = T("16", 40, NUIT, gras=True)
        ecran_txt(calc, e2, r2)
        lc = avec_expo(facteur("2", 46), 4, 46, audit=False)
        eg3, r3 = T("=", 46), T("16", 46, VERT_OK)
        lcg = VGroup(lc, eg3, r3).arrange(RIGHT, buff=0.24).move_to(P(-0.25, -2.0))
        self.au_mot("Avec des parenthèses")
        self.play(FadeOut(VGroup(e1, r1, ok)), Create(halo), calc.par[0].animate.set_fill(EXPO_C, 1),
                  calc.par[2].animate.set_fill(EXPO_C, 1), run_time=0.45)
        fs = [facteur("2", 28) for _ in range(4)]
        fx = [T("×", 26) for _ in range(3)]
        rang = VGroup(fs[0], fx[0], fs[1], fx[1], fs[2], fx[2], fs[3]).arrange(RIGHT, buff=0.08).move_to(P(0, -2.7))
        self.au_mot("moins 2 fois")
        self.play(FadeIn(e2[0]), FadeIn(lc[:4], scale=1.2), FadeIn(e2[1]), FadeIn(lc.expo), FadeIn(fs[0], shift=UP * 0.15),
                  run_time=0.35)
        for k in range(3):
            self.au_mot("fois moins 2", k + 1)
            self.play(FadeIn(fx[k]), FadeIn(fs[k + 1], shift=RIGHT * 0.15), run_time=0.25)
        self.au_mot(": 16")
        self.play(FadeIn(r2, scale=1.3), FadeIn(eg3), FadeIn(r3, scale=1.4),
                  *[f.moins.animate.set_color(VERT_OK) for f in fs], run_time=0.4)
        self.insister(r3, 1.3)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : (−3)² ──
        self.question_pause("01q-question", "01r-reponse", ["(−3)² = ?"],
                            [self.t("−9", 30), self.t("9", 30), self.t("6", 30)], 1,
                            ["Deux signes moins :", "le résultat est positif."], mot_q="Moins 3")
        self.vider(garder)

        # ── 02 : la question en commentaire : −1¹⁰⁰ ──
        self.dire("02-question")
        calc = calculatrice(1.35, 1.9).move_to(P(-0.85, Y_IMG))
        e3 = VGroup(T("−1", 40, NUIT, gras=True), T("^100", 40, NUIT, gras=True)).arrange(RIGHT, buff=0.04)
        ecran_txt(calc, e3)
        q = T("?", 90, AMBRE, gras=True).move_to(P(0.95, Y_IMG + 0.1))
        g = avec_expo(facteur("1", 64, paren=False), 100, 56)
        qg = T("= ?", 56, AMBRE)
        lg = VGroup(g, qg).arrange(RIGHT, buff=0.25).move_to(P(0, -0.35))
        qg.shift(UP * (g.nb.get_y() - qg.get_y()))
        sp = T("sans parenthèses", 30, BASE_C).move_to(P(0, -1.3))
        self.play(FadeIn(calc, shift=UP * 0.3), run_time=0.4)
        self.au_mot("moins 1")
        self.play(FadeIn(e3[0]), FadeIn(VGroup(g.moins, g.nb), scale=1.3), run_time=0.3)
        self.au_mot("100")
        self.play(FadeIn(e3[1]), FadeIn(g.expo, scale=1.5), run_time=0.3)
        self.insister(g.expo, 1.4)
        self.au_mot("sans parenthèses")
        self.play(FadeIn(sp, shift=UP * 0.15), FadeIn(qg, scale=1.3), FadeIn(q, scale=1.6), run_time=0.4)
        self.appel_commentaire(y=-2.2)

        # ── 03 : la page d'abonnement (19/10) ──
        self.dire("03-abonne")
        self.play(FadeOut(Group(*[m for m in self.mobjects if m is not margo])), run_time=0.4)
        entraine = self.t("Entraîne-toi sur", 36, JAUNE_TITRE).move_to(P(0, 2.2))
        site = self.t("eleveai.fr", 50, BLEU_CALCUL).move_to(P(0, 1.2))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 40, VERT_OK).move_to(P(0, -0.2))
        poignee = self.t("@eleveai974", 40, VERT_OK).move_to(P(0, -1.0))
        self.play(Write(entraine), run_time=0.5)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.5)
        self.play(Indicate(poignee, color=VERT_OK, scale_factor=1.15))
        self.attendre_voix(marge=1.0)
