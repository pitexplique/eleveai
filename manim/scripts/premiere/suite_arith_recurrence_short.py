# suite_arith_recurrence_short.py
# EleveAI — Maths 1re (sans spé) — short « Relation de récurrence : tu paries
# que tu remontes le temps d'une suite ? » (9:16), ceinture BLANCHE (échelle
# entière sous le titre). Série SUITES, épisode 02. Micro : lin_suite_recurrence.
#   · 00-garde      : le titre, l'échelle, le pari en gros, un chrono qui tourne
#                     À L'ENVERS (on remonte le temps) ;
#   · 01-situation  : EN HAUT le food truck arrive, ses piles d'assiettes
#                     grandissent d'une assiette orange par semaine ; EN BAS,
#                     sous chaque pile, sa case u₀, u₁, u₂, u₃ (EN MÊME TEMPS) ;
#   · 02-relation   : les flèches « +35 » sautent de case en case,
#                     uₙ₊₁ = uₙ + 35, puis la flèche retour « −35 » ;
#   · 03/03b        : question-pause (B : 565 = 600 − 35), 3 s ;
#   · 04-commentaire: u₀ = 250, … u₄ = ? « Réponds en commentaire ! » (réponse
#                     390 = 250 + 4 × 35, NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison, vert = juste.
# Voix : manim/voix/premiere-suite-arith-recurrence-short.json (débit −6),
# calée par suite_arith_recurrence_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_arith_recurrence_short.py SuiteArithRecurrenceShort -o eleveai-maths-premiere-suite-arith-recurrence-short --media_dir manim/scripts/premiere/media-suite-arith-recurrence-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_recurrence import OutilsEp02, arc_fleche  # noqa: E402

assert 600 - 35 == 565                                   # la question : B
assert 250 + 4 * 35 == 390                               # le commentaire (non affiché)
XS = (-1.5, -0.5, 0.5, 1.5)                              # piles et cases : mêmes abscisses
ASSIETTES = [3, 4, 5, 6]                                 # une assiette de plus par semaine
CAMION, AUVENT = "#14B8A6", "#F43F5E"


def food_truck(s=1.0):
    """Le food truck de profil : caisse, cabine, comptoir, auvent rayé, roues."""
    caisse = RoundedRectangle(width=1.9, height=1.0, corner_radius=0.1, fill_color=CAMION, fill_opacity=1,
                              stroke_width=0).move_to(P(-0.25, 0.6))
    cabine = RoundedRectangle(width=0.6, height=0.72, corner_radius=0.1, fill_color=CAMION, fill_opacity=1,
                              stroke_width=0).move_to(P(0.95, 0.46))
    vitre = Polygon(P(0.75, 0.75), P(1.12, 0.75), P(1.2, 0.5), P(0.75, 0.5), fill_color="#BAE6FD", fill_opacity=1,
                    stroke_width=0)
    comptoir = Rectangle(width=1.1, height=0.42, fill_color="#0F172A", fill_opacity=1, stroke_width=0)
    comptoir.move_to(P(-0.3, 0.7))
    auvent = VGroup(*[Polygon(P(-0.85 + 0.22 * k, 0.95), P(-0.63 + 0.22 * k, 0.95), P(-0.6 + 0.24 * k, 1.12),
                              P(-0.84 + 0.24 * k, 1.12),
                              fill_color=AUVENT if k % 2 == 0 else WHITE, fill_opacity=1, stroke_width=0)
                      for k in range(5)])
    tablette = Rectangle(width=1.2, height=0.06, fill_color=GREY_B, fill_opacity=1, stroke_width=0).move_to(
        P(-0.3, 0.47))
    roues = VGroup(*[VGroup(Circle(radius=0.17, fill_color="#1F2937", fill_opacity=1, stroke_color=GREY_B,
                                   stroke_width=3),
                            Dot(radius=0.05, color=GREY_B)).move_to(P(x, 0.08)) for x in (-0.75, 0.85)])
    fumee = VGroup(*[Arc(radius=0.08, start_angle=-PI / 2, angle=PI, stroke_color=GREY_A, stroke_width=3)
                     .move_to(P(-0.1 + 0.07 * (k % 2), 1.3 + 0.16 * k)) for k in range(3)])
    return VGroup(caisse, cabine, vitre, comptoir, tablette, auvent, roues, fumee).scale(s)


def pile(n, x, y0, neuve=True, pas=0.13):
    """Une pile de n assiettes depuis y0 ; la dernière (la neuve) en orange."""
    g = VGroup()
    for k in range(n):
        c = RAISON if (neuve and k == n - 1) else WHITE
        g.add(Ellipse(width=0.7, height=0.16, fill_color=c, fill_opacity=1, stroke_color=GREY_B,
                      stroke_width=1.5).move_to(P(x, y0 + pas * k)))
    return g


def chrono(r=0.85):
    cadran = Circle(radius=r, stroke_color=WHITE, stroke_width=7)
    bouton = RoundedRectangle(width=0.3, height=0.2, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).next_to(cadran, UP, buff=0.03)
    aiguille = Line(ORIGIN, UP * r * 0.8, stroke_color=RAISON, stroke_width=7)
    return VGroup(cadran, bouton), aiguille


class SuiteArithRecurrenceShort(OutilsEp02, ShortSuites):
    fichier_marques = "suite_arith_recurrence_short_marques.json"
    nom_voix = "premiere-suite-arith-recurrence-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari en gros ──
        self.dire("00-garde")
        self.entete("Relation de récurrence", extrait="Relation")
        pari = self.paragraphe(["Tu paries que", "tu remontes le temps", ("d'une suite ?", RAISON)], self.fs_grand,
                               buff=0.2, y=1.45)
        for ligne, ex in zip(pari, ("Tu paries", "tu remontes", "d'une suite")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.3)
        cad, aig = chrono(0.85)
        VGroup(cad, aig).move_to(P(0, -1.35))
        centre = cad[0].get_center()
        aig.shift(centre - aig.get_start())
        retour = Arc(radius=1.08, start_angle=PI / 2 + 0.3, angle=1.3, stroke_color=RAISON, stroke_width=5,
                     arc_center=centre).add_tip(tip_length=0.18)
        self.play(FadeIn(cad, scale=0.7), FadeIn(aig), Create(retour), run_time=0.35)
        self.play(Rotate(aig, TAU, about_point=centre), run_time=1.0, rate_func=linear)  # à l'envers
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT le food truck et ses piles ; EN BAS les cases dessous ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        ft = food_truck(1.0).move_to(P(0, 1.85))
        self.au_mot("food truck")
        self.play(FadeIn(ft, shift=RIGHT * 1.2), run_time=0.6)
        piles = [pile(n, x, 0.15, neuve=k > 0) for k, (n, x) in enumerate(zip(ASSIETTES, XS))]
        lg = LigneTermes(["", "", "", ""], xs=XS, centre=P(0, -0.55), largeur=0.82, hauteur=0.6, fs=34)
        for k in range(4):
            lg.cases[k][1].become(self.t(u(k), 34, TERME).move_to(lg.cases[k][0]))
        self.au_mot("chaque semaine")
        cs = self.t("chaque semaine", 36, GREY_A).move_to(P(0, -1.75))
        self.play(FadeIn(cs, shift=UP * 0.1), FadeIn(piles[0], shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("35 repas")
        plus = self.t("+ 35 repas", 46, RAISON).move_to(P(0, -2.4))
        self.play(FadeIn(plus, scale=1.3), run_time=0.3)
        for k in (1, 2, 3):
            self.play(TransformFromCopy(piles[k - 1][:ASSIETTES[k - 1]], piles[k][:-1]),
                      FadeIn(piles[k][-1], shift=DOWN * 0.3, scale=1.4), run_time=0.35)
            piles[k][:-1].set_fill(WHITE)
        self.au_mot("On note")
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in lg.cases], lag_ratio=0.2), run_time=0.6)
        self.au_mot("le nombre de repas")
        def_ = self.paragraphe([("uₙ : les repas", TERME), "de la semaine n"], 38, buff=0.12, y=-2.05)
        self.play(FadeOut(cs), FadeOut(plus), run_time=0.2)
        self.play(FadeIn(def_, shift=UP * 0.1), *[Indicate(c, color=TERME, scale_factor=1.1) for c in lg.cases],
                  run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 02 : la relation : avancer (+35), reculer (−35) ──
        self.dire("02-relation")
        self.play(FadeOut(VGroup(ft, *piles, def_)), run_time=0.25)
        self.play(lg.animate.shift(UP * 2.05), run_time=0.4)
        self.au_mot("ajoute")
        self.suivre("35")
        sauts = [lg.saut(k, "+35", cote=UP, fs=28, creux=0.2) for k in range(3)]
        self.play(LaggedStart(*[AnimationGroup(Create(s_[0]), FadeIn(s_[1], scale=1.3)) for s_ in sauts],
                              lag_ratio=0.3), run_time=0.5)
        f = self.calcul([("uₙ₊₁", TERME, "u indice n plus 1"), ("=", WHITE, "égale"), ("uₙ", TERME, "u indice n"),
                         ("+ 35", RAISON, "35")], -0.15, fs=40)
        self.play(Create(self.encadre(f, JAUNE_TITRE, 0.12)), run_time=0.3)
        self.au_mot("Pour reculer")
        rec = self.paragraphe(["Pour reculer", "d'une semaine :"], 38, buff=0.1, y=-1.35)
        self.play(FadeIn(rec, shift=UP * 0.1), run_time=0.3)
        y_b = lg.cases.get_bottom()[1] - 0.08
        fl = arc_fleche(P(XS[3], y_b), P(XS[2], y_b), DOWN, creux=0.22)
        self.lancer(fl, RAISON, 0.45)
        self.au_mot("retire")
        self.suivre("35")
        lab = self.t("−35", 28, RAISON).next_to(fl, DOWN, buff=0.04)
        ret = self.t("on retire 35", 44, RAISON).move_to(P(0, -2.45))
        self.play(FadeIn(lab, scale=1.3), FadeIn(ret, scale=1.2), run_time=0.3)
        self.insister(ret, 1.08)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → B ──
        l1 = self.phrase([("u₁₀ = 600.", "600", TERME)], 42)
        l2 = self.t("Combien vaut u₉ ?", 42)
        q = self.poser_question("03-question", [(l1, None), (l2, "Combien")], ["635", "565", "35"], 1,
                                y_question=2.8)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 1)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), run_time=0.25)
        b = q.cartes[1]
        self.play(VGroup(b, ok).animate.shift(P(0, 1.1) - b.get_center()), run_time=0.3)
        self.au_mot("On recule")
        mini = LigneTermes(["", ""], xs=(-1.0, 1.0), centre=P(0, -0.35), largeur=1.25, hauteur=0.72, fs=38)
        for k, nom in enumerate((u(9), u(10))):
            mini.cases[k][1].become(self.t(nom, 38, TERME).move_to(mini.cases[k][0]))
        self.play(FadeIn(mini.cases[0]), FadeIn(mini.cases[1]), run_time=0.3)
        fl = arc_fleche(mini.cases[1][0].get_bottom() + DOWN * 0.08, mini.cases[0][0].get_bottom() + DOWN * 0.08,
                        DOWN, couleur=JUSTE, creux=0.25)
        self.lancer(fl, JUSTE, 0.45)
        self.au_mot("600 moins")
        lab = self.t("− 35", 34, JUSTE).next_to(fl, DOWN, buff=0.05)
        calc = VGroup(self.t("600", 38), self.t("− 35", 38, JUSTE), self.t("=", 38), self.t("565", 38, JUSTE))
        calc.arrange(RIGHT, buff=0.16).move_to(P(0, -2.4))
        self.play(FadeIn(calc[0], shift=UP * 0.1), run_time=0.2)
        self.suivre("35")
        self.play(FadeIn(lab, scale=1.3), FadeIn(calc[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("565")
        cad = self.encadre(calc[3], JUSTE, 0.1)
        self.play(FadeIn(calc[2:], scale=1.3), Create(cad), run_time=0.3)
        self.insister(VGroup(calc[3], cad), 1.08)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        ft2 = food_truck(0.75).move_to(P(0, 1.95))
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(ft2, shift=RIGHT * 0.8), run_time=0.4)
        lc = LigneTermes(["250", "", "", "", "?"], pas=0.84, largeur=0.72, hauteur=0.62, fs=32, centre=P(0, 0.35),
                         noms=[u(k) for k in range(5)], fs_noms=28)
        lc.cases[0][1].scale_to_fit_width(0.46).move_to(lc.cases[0][0])  # une marge nette dans la case
        self.au_mot("250")
        self.play(*[FadeIn(lc.cases[k][0], scale=0.8) for k in range(4)], FadeIn(lc.cases[0][1], scale=1.4),
                  *[FadeIn(lc.noms[k]) for k in range(4)], run_time=0.35)
        self.au_mot("Combien")
        q4 = self.paragraphe([("Combien vaut", RAISON), ("u₄ ?", RAISON)], 50, buff=0.1, y=-0.95)
        sauts = [arc_fleche(lc.cases[k][0].get_top() + UP * 0.06, lc.cases[k + 1][0].get_top() + UP * 0.06, UP,
                            creux=0.16, epais=3) for k in range(4)]
        self.play(FadeIn(lc.cases[4], scale=1.3), FadeIn(lc.noms[4]), FadeIn(q4[0], shift=UP * 0.1),
                  *[Create(s) for s in sauts], run_time=0.45)
        self.au_mot("u indice 4")
        self.play(FadeIn(q4[1], shift=UP * 0.1), Indicate(lc.cases[4], color=RAISON, scale_factor=1.2), run_time=0.4)
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
