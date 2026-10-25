# frac_simplifier_short.py
# EleveAI — Maths 5e — short jumeau de l'épisode 02 « Simplifier une fraction »
# (micro fraction_simplifier). CEINTURE BLANCHE (règle du short blanc,
# REGLES.md) : on VOIT la simplification, aucun calcul à poser au-delà d'une
# division par la taille d'une rangée.
# Il AMUSE : « Même chocolat ? » Maëva, CHOCOLATIÈRE, fabrique une tablette de
# 24 carrés ; son neveu en mange 18 :
#   · EN HAUT, l'image qui bouge : les 18 carrés mangés font 3 rangées entières
#     de la tablette (4 rangées de 6) ;
#   · EN BAS, au même instant, la barre du coach se regroupe 6 par 6 :
#     18/24 = 3/4 (même code couleur : orange = mangé) ;
#   · le piège de la classe : enlever 6 en haut et en bas → 12/18, la barre
#     est plus courte (12/18 = 2/3 < 3/4) ;
#   · 1 question-pause (3 s) : 15 carrés dont 10 mangés, regroupés 5 par 5 ;
#   · fin : « 30 carrés, dont 20 mangés : la fraction la plus simple ? » en
#     commentaire (20/30 = 2/3).
# Centres d'intérêt : cuisine, jeux-defis. Aucune donnée réelle citée.
# Vérifié (Python) : 18/24 = 3/4 ; 12/18 = 2/3 < 3/4 ; 10/15 = 2/3 ; 20/30 = 2/3.
#
# Bases : 5e/frac_lotg_commun.py (ShortG ← 4e/frac_lotd_commun.py).
# Voix : manim/voix/5e-frac-simplifier-short.json (débit −10) ; marques :
# manim/scripts/5e/frac_simplifier_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/5e/frac_simplifier_short.py FracSimplifierShort5e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/frac_simplifier_short.py FracSimplifierShort5e -o eleveai-maths-5e-frac-simplifier-short --media_dir manim/scripts/5e/media-frac-simplifier-short
# Sortie : manim/sorties/5e/maths/fractions/02-simplifier/eleveai-maths-5e-frac-simplifier-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotg_commun import *  # noqa: E402,F403

CHOCO, CHOCO_B, MANGE = "#7c2d12", "#451a03", ORANGE_PART
Y_TAB, Y_BARRE = 1.15, -0.5


def tablette(cols, lignes, w=0.95, h=0.34, centre=P(0, Y_TAB)):
    """Une tablette de chocolat DEBOUT : cols rangées verticales de `lignes`
    carrés, chaque rangée exactement au-dessus d'un quart de la barre (w = 3,8 / 4).
    .carres[c][l] ; .rangee(c) : la rangée c."""
    carres = []
    g = VGroup()
    for c in range(cols):
        rg = []
        for l in range(lignes):
            sq = VGroup(RoundedRectangle(width=w - 0.04, height=h - 0.04, corner_radius=0.04, fill_color=CHOCO,
                                         fill_opacity=1, stroke_color=CHOCO_B, stroke_width=3),
                        RoundedRectangle(width=(w - 0.04) * 0.6, height=(h - 0.04) * 0.5, corner_radius=0.03,
                                         fill_color="#9a3412", fill_opacity=1, stroke_width=0))
            sq.move_to(P(c * w, -l * h))
            rg.append(sq)
            g.add(sq)
        carres.append(rg)
    g.move_to(centre)
    g.carres = carres
    g.rangee = lambda c: VGroup(*carres[c])
    return g


def manger(sq):
    """Un carré mangé : il pâlit, bordé d'orange (le code couleur de la barre)."""
    return AnimationGroup(sq[0].animate.set_fill(CHOCO, 0.15).set_stroke(MANGE, 3), sq[1].animate.set_opacity(0))


class FracSimplifierShort5e(ShortG):
    nom_voix = "5e-frac-simplifier-short"
    fichier_marques = "frac_simplifier_short_marques.json"
    ceinture = "blanche"

    def barre(self, n, k, couleur=MANGE, y=Y_BARRE):
        return Barre(n, k, largeur=3.8, hauteur=0.45, couleur=couleur, marge=0.14, sw=2, centre=P(0, y))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Même chocolat ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : la tablette de 24, 18 mangés ──
        self.dire("00-accroche")
        self.au_mot("Maëva")
        nm = self.bloc(["Maëva,", "chocolatière"], 30, BLEU_CALCUL).move_to(P(0, -2.2))
        self.play(FadeIn(nm, scale=0.8), run_time=0.4)
        tab = tablette(4, 6)
        b = self.barre(24, 0)
        self.au_mot("fabrique")
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in tab], lag_ratio=0.03), run_time=1.0)
        lab = self.L([("24 carrés", WHITE, "de 24")], -1.25, fs=32, avec=[b.apparaitre()])
        self.au_nb("mange 18")
        mange = [sq for c in range(3) for sq in tab.carres[c]]
        f = EcritureFraction(18, 24, fs=56).move_to(P(-1.2, -1.75))
        self.play(LaggedStart(*[manger(sq) for sq in mange], lag_ratio=0.04), b.colorier(range(18), lag=0.03),
                  FadeOut(lab), FadeOut(nm), FadeIn(f, scale=1.3), run_time=1.2)
        self.au_mot("plus simplement")
        self.play(Write(titre), run_time=0.7)
        self.attendre_voix(marge=0.2)
        self.ecran1(tab, b, f, garder)

    def ecran1(self, tab, b, f, garder):
        # ── 01 : 3 rangées entières → 3/4 ──
        self.dire("01-rangees")
        self.au_nb("La tablette a 4")
        cadres = VGroup(*[SurroundingRectangle(tab.rangee(c), color=AMBRE, buff=0.03, stroke_width=4) for c in range(4)])
        self.play(LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.2), run_time=0.8)
        self.au_nb("Les 18")
        self.play(*[Indicate(tab.rangee(c), color=MANGE, scale_factor=1.06) for c in range(3)], run_time=0.8)
        gb = b.groupes(6)
        self.play(Create(gb), run_time=0.5)
        c1 = self.morceaux([("24 ÷", WHITE, "24 divisé"), ("6 =", WHITE, "24 divisé par 6"), ("4", WHITE, "égale 4")],
                           fs=30).move_to(P(0.9, -1.45))
        self.jouer(c1)
        c2 = self.morceaux([("18 ÷", MANGE, "18 divisé"), ("6 =", MANGE, "18 divisé par 6"), ("3", MANGE, "égale 3")],
                           fs=30).move_to(P(0.9, -2.0))
        self.jouer(c2)
        self.au_nb("3 rangées. 18")
        b4, anim = b.regrouper(6, run_time=1.0)
        self.play(anim, FadeOut(gb), Indicate(f, color=AMBRE), run_time=1.0)
        self.au_nb("égale 3 quarts")
        g = EcritureFraction(3, 4, fs=56)
        eg = VGroup(f.copy(), self.t("=", 56), g).arrange(RIGHT, buff=0.3).move_to(P(0, -1.95))
        eg[1].sans_synchro = True
        self.play(FadeOut(c1), FadeOut(c2), f.animate.move_to(eg[0]), FadeIn(eg[1]), FadeIn(g, scale=1.3),
                  run_time=0.5)
        self.au_mot("le même chocolat")
        tir = DashedLine(P(b4.x_trait(3), Y_TAB + 1.0), P(b4.x_trait(3), Y_BARRE - 0.35), color=AMBRE, stroke_width=4,
                         dash_length=0.08)
        self.play(Create(tir), run_time=0.5)
        self.insister(g, 1.3)
        self.attendre_voix(marge=0.3)
        self.vider(garder)
        self.ecran2(garder)

    def ecran2(self, garder):
        # ── 02 : le piège : enlever 6 en haut et en bas ──
        self.dire("02-piege")
        b4 = self.barre(4, 3, y=1.95)
        f = EcritureFraction(18, 24, fs=48)
        g = EcritureFraction(12, 18, fs=48, couleur=ROUGE_ERREUR)
        eg = egalite(f, g, signe="→", buff=0.55).move_to(P(0, -0.75))
        h, bb = fleches(f, g, "− 6", couleur=ROUGE_ERREUR, fs=30, angle=TAU / 12)
        self.au_mot("Et si")
        self.play(b4.apparaitre(0.6), run_time=0.6)
        self.au_nb("enlève 6")
        self.play(Create(h[0]), FadeIn(h[1]), Create(bb[0]), FadeIn(bb[1]), run_time=0.5)
        self.au_nb("bas de 18")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        b18 = self.barre(18, 12, couleur=ROUGE_COACH, y=1.0)
        self.au_nb("trouve 12")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), b18.apparaitre(0.6), run_time=0.6)
        self.au_mot("plus courte")
        t1 = b4.fin_coloriee(vers=-1.05)
        self.play(Create(t1), Indicate(VGroup(*b18.parts[10:12]), color=ROUGE_ERREUR), run_time=0.7)
        self.au_mot("Faux")
        self.play(Create(croix(g, sw=6)), run_time=0.4)
        self.au_mot("On divise")
        r = self.bloc(["On divise,", "on ne soustrait jamais !"], 28, VERT_OK).move_to(P(0, -2.6))
        r.scale_to_fit_width(min(r.width, 3.7))
        r.sans_synchro = True
        for x in r:
            x.sans_synchro = True
        self.play(FadeIn(r[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("on ne soustrait")
        self.play(FadeIn(r[1], shift=UP * 0.15), run_time=0.35)
        self.insister(r, 1.06)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        def apres(sc):
            sc.rep_mots(0, [("10 ÷", None, "B. 10"), ("5 =", None, "divisé par 5"), ("2", None, "égale 2")])
            sc.rep_mots(1, [("2/3 de la tablette", None, "2 tiers")])
            sc.fin_rep()

        self.question_pause("03-question", "03b-reponse", ["15 carrés, dont 10 mangés,", "regroupés 5 par 5 :",
                                                           "combien de gros carrés mangés ?"],
                            [self.inline("5", 30), self.inline("2", 30), self.inline("3", 30)], 1,
                            ["10 ÷ 5 = 2", "2/3 de la tablette"], mot_q="15 carrés", autres_r=apres)
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        tab = tablette(3, 10, w=1.0, h=0.2, centre=P(0, 1.2))
        tab.scale_to_fit_height(2.0).move_to(P(0, 1.2))
        self.au_mot("une tablette")
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in tab], lag_ratio=0.02), run_time=0.8)
        self.L([("30 carrés", WHITE, "tablette de 30")], -0.15, fs=32)
        mange = [sq for c in range(2) for sq in tab.carres[c]]
        self.L([("dont 20 mangés", MANGE, "dont 20")], -0.7, fs=32,
               avec=[LaggedStart(*[manger(sq) for sq in mange], lag_ratio=0.03)])
        self.au_mot("la plus simple")
        q = self.bloc(["la fraction", "la plus simple ?"], 32, ORANGE_RETENUE).move_to(P(0, -1.55))
        for x in q:
            x.sans_synchro = True
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.appel_commentaire(y=-2.55)
