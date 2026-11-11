# suite_arith_terme_rang_short.py
# EleveAI — Maths 1re (sans spé) — short « Un terme lointain : tu paries que tu
# ne te trompes pas d'un pas ? » (9:16), ceinture BLANCHE (échelle entière sous
# le titre). Série SUITES, épisode 04. Micro du coach : lin_suite_terme_rang.
#   · 00-garde      : le titre, l'échelle (70 %), le pari en gros ; dessous, une
#                     rangée de cases : les sauts s'allument, un saut de trop
#                     (rouge) vers une case fantôme, barré ;
#   · 01-situation  : EN HAUT Chloé à vélo sur la route, un poteau par semaine ;
#                     EN BAS les cases u₁ … u₁₀, chacune JUSTE SOUS son poteau ;
#                     « 1re semaine : 20 km », « + 5 km chaque semaine », u₁ = 20 ;
#   · 02-pas        : de la semaine 1 à la semaine 10, le vélo saute de poteau en
#                     poteau EN MÊME TEMPS que le saut s'allume dessous (orange) :
#                     9 pas (vert), « pas 10 » barré (rouge) ;
#   · 03/03b        : question-pause (C : 65 = 20 + 9 × 5), 3 s ;
#   · 04-commentaire: « Et toi ? » la 30e semaine (réponse 165 km = 20 + 29 × 5,
#                     NON affichée), « Réponds en commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = sauts, vert = juste, rouge = piège.
# Voix : manim/voix/premiere-suite-arith-terme-rang-short.json (débit −6),
# calée par suite_arith_terme_rang_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_arith_terme_rang_short.py SuiteArithTermeRangShort -o eleveai-maths-premiere-suite-arith-terme-rang-short --media_dir manim/scripts/premiere/media-suite-arith-terme-rang-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_terme_rang import Rangee  # noqa: E402  (l'outil de l'épisode 04)

assert 20 + 9 * 5 == 65 and 20 + 10 * 5 == 70 and 20 + 11 * 5 == 75     # réponse C
assert 20 + 29 * 5 == 165                                                # la 30e semaine (commentaire)
Y_ROUTE, Y_CASES = 0.75, -0.3
X0, X1 = -1.7, 1.7
PEAU, MAILLOT = "#8d5524", "#EC4899"


def velo(s=1.0):
    """Chloé à vélo, de profil vers la droite (origine : sous les roues)."""
    k = dict(stroke_color=WHITE, stroke_width=4)
    r1 = Circle(radius=0.15, **k).move_to(P(-0.26, 0.15))
    r2 = Circle(radius=0.15, **k).move_to(P(0.26, 0.15))
    cadre = VMobject(stroke_color=TERME, stroke_width=5).set_points_as_corners(
        [P(-0.26, 0.15), P(-0.02, 0.15), P(0.16, 0.38), P(-0.1, 0.38), P(-0.26, 0.15)])
    fourche = Line(P(0.26, 0.15), P(0.18, 0.45), stroke_color=TERME, stroke_width=5)
    corps = Line(P(-0.1, 0.42), P(0.04, 0.7), stroke_color=MAILLOT, stroke_width=9)
    bras = Line(P(0.03, 0.66), P(0.18, 0.47), stroke_color=WHITE, stroke_width=4)
    jambe = VMobject(**k).set_points_as_corners([P(-0.1, 0.42), P(0.05, 0.3), P(-0.02, 0.15)])
    tete = Circle(radius=0.085, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0.09, 0.81))
    casque = Arc(radius=0.095, start_angle=0, angle=PI, fill_color=RAISON, fill_opacity=1,
                 stroke_width=0).move_to(P(0.09, 0.86))
    return VGroup(r1, r2, cadre, fourche, jambe, corps, bras, tete, casque).scale(s, about_point=ORIGIN)


class SuiteArithTermeRangShort(ShortSuites):
    fichier_marques = "suite_arith_terme_rang_short_marques.json"
    nom_voix = "premiere-suite-arith-terme-rang-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def route(self, xs):
        """La route et un poteau par semaine (au-dessus de sa case)."""
        bande = Rectangle(width=4.2, height=0.22, fill_color="#475569", fill_opacity=1, stroke_width=0)
        bande.move_to(P(0, Y_ROUTE - 0.11))
        tirets = DashedLine(P(-2.05, Y_ROUTE - 0.11), P(2.05, Y_ROUTE - 0.11), stroke_color=WHITE, stroke_width=2,
                            dash_length=0.1)
        poteaux = VGroup(*[VGroup(Line(P(x, Y_ROUTE), P(x, Y_ROUTE + 0.42), stroke_color=GREY_B, stroke_width=3),
                                  Polygon(P(x, Y_ROUTE + 0.42), P(x + 0.16, Y_ROUTE + 0.35), P(x, Y_ROUTE + 0.28),
                                          fill_color=TERME, fill_opacity=1, stroke_width=0)) for x in xs])
        return VGroup(bande, tirets), poteaux

    def construct(self):
        # ── 00 : la garde : titre, échelle (70 %), le pari ; un saut de trop ──
        self.dire("00-garde")
        self.entete("Un terme lointain", extrait="Un terme")
        pari = self.paragraphe(["Tu paries que", "tu ne te trompes", ("pas d'un pas ?", RAISON)], self.fs_grand,
                               buff=0.2, y=1.3)
        for ligne, ex in zip(pari, ("Tu paries", "tu ne", "pas d'un")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.25)
        rg = Rangee(5, -1.65, 1.45, -1.2, larg=0.62, haut=0.68, creux=0.26)
        fant = DashedVMobject(rg.cases[4].copy().set_stroke(PIEGE, 3), num_dashes=14)
        self.play(*[FadeIn(c, scale=0.8) for c in rg.cases[:4]], *[Create(s) for s in rg.sauts], Create(fant),
                  run_time=0.3)
        self.play(LaggedStart(*[s.animate.set_color(RAISON if k < 3 else PIEGE) for k, s in enumerate(rg.sauts)],
                              lag_ratio=1.0), run_time=0.6)
        self.play(Create(self.barrer(VGroup(rg.sauts[3], fant), buff=0.04)), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT Chloé à vélo ; EN BAS les cases, sous les poteaux ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        nom = self.t("Chloé", 48, JAUNE_TITRE).move_to(P(0, 2.36))
        metier = self.t("prépare une course à vélo", 34, TERME).move_to(P(0, 1.88))
        self.au_mot("Chloé")
        self.play(FadeIn(nom, shift=UP * 0.1), run_time=0.35)
        self.au_mot("prépare")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.3)
        lg = Rangee(10, X0, X1, Y_CASES, larg=0.36, haut=0.48, creux=0.13, sw=3)
        xs = [c.get_center()[0] for c in lg.cases]
        rt, poteaux = self.route(xs)
        v = velo(0.75).move_to(P(xs[0], Y_ROUTE), aligned_edge=DOWN)
        self.au_mot("vélo")
        self.play(FadeIn(rt), LaggedStart(*[GrowFromEdge(p, DOWN) for p in poteaux], lag_ratio=0.08),
                  FadeIn(v, shift=RIGHT * 0.3), run_time=0.5)
        self.au_mot("1re")
        s1 = self.t("semaine 1", 24, GREY_A).move_to(P(0, 1.56)).align_to(P(-1.95, 0), LEFT)
        l1 = VGroup(self.t("1re semaine :", 40), self.t("20 km", 40, TERME)).arrange(RIGHT, buff=0.18)
        if l1.width > self.largeur_texte:
            l1.scale_to_fit_width(self.largeur_texte)
        l1.move_to(P(0, -1.3))
        n1 = Text("u₁", font_size=28, color=GREY_A).next_to(lg.cases[0], DOWN, buff=0.1)
        self.play(FadeIn(s1), FadeIn(l1[0], shift=UP * 0.1), Indicate(poteaux[0], color=TERME), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in lg.cases], lag_ratio=0.06), FadeIn(n1), run_time=0.4)
        self.suivre("20")
        t20 = Text("20", font_size=24, color=WHITE).move_to(lg.cases[0])
        self.play(FadeIn(l1[1], scale=1.3), FadeIn(t20, scale=1.4), Wiggle(v, scale_value=1.1), run_time=0.4)
        self.suivre("5")
        l2 = VGroup(self.t("puis", 40), self.t("+ 5 km", 44, RAISON)).arrange(RIGHT, buff=0.18)
        if l2.width > self.largeur_texte:
            l2.scale_to_fit_width(self.largeur_texte)
        l2.move_to(P(0, -1.92))
        self.play(FadeIn(l2, shift=UP * 0.1), *[Create(s) for s in lg.sauts], run_time=0.35)
        self.au_mot("chaque semaine")
        l3 = self.t("chaque semaine", 40, RAISON).move_to(P(0, -2.5))
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("On note")
        self.play(FadeOut(VGroup(l1, l2, l3)), run_time=0.25)
        note = VGroup(self.t("uₙ", 42, TERME), self.t(": la distance", 38)).arrange(RIGHT, buff=0.14)
        note2 = self.t("de la semaine n", 38)
        VGroup(note, note2).arrange(DOWN, buff=0.12).move_to(P(0, -1.45))
        self.play(FadeIn(note, shift=UP * 0.1), run_time=0.3)
        self.au_mot("distance")
        self.play(FadeIn(note2, shift=UP * 0.1), run_time=0.3)
        self.suivre("1")
        u1 = VGroup(self.t("u₁ =", 52, TERME), self.t("20", 52, WHITE)).arrange(RIGHT, buff=0.18).move_to(P(0, -2.5))
        self.play(FadeIn(u1[0], shift=UP * 0.1), Indicate(n1, color=TERME), run_time=0.25)
        self.suivre("20")
        self.play(FadeIn(u1[1], scale=1.4), Indicate(lg.cases[0], color=TERME, scale_factor=1.2), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : on compte les pas : le vélo saute EN MÊME TEMPS que le saut s'allume ──
        self.dire("02-pas")
        self.play(FadeOut(VGroup(note, note2, u1)), run_time=0.25)
        self.suivre("1")
        self.play(Indicate(poteaux[0], color=TERME, scale_factor=1.3), Indicate(lg.cases[0], color=TERME),
                  run_time=0.25)
        self.suivre("10")
        s10 = self.t("semaine 10", 24, GREY_A).move_to(P(0, 1.56)).align_to(P(1.95, 0), RIGHT)
        n10 = Text("u₁₀", font_size=28, color=GREY_A).next_to(lg.cases[9], DOWN, buff=0.1)
        self.play(FadeIn(s10), FadeIn(n10), Indicate(poteaux[9], color=TERME, scale_factor=1.3), run_time=0.15)
        for k in range(9):
            self.play(lg.sauts[k].animate.set_color(RAISON),
                      v.animate.move_to(P(xs[k + 1], Y_ROUTE), aligned_edge=DOWN), run_time=0.065)
        self.suivre("9")
        neuf = self.t("9 pas", 72, JUSTE).move_to(P(0, -1.4))
        self.play(FadeIn(neuf, scale=1.4), Indicate(lg.sauts, color=RAISON, scale_factor=1.1), run_time=0.3)
        self.suivre("10")
        dix = self.t("pas 10", 52, PIEGE).move_to(P(0, -2.45))
        self.play(FadeIn(dix, shift=UP * 0.1), run_time=0.25)
        self.play(Create(self.barrer(dix)), run_time=0.25)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → C ──
        q = self.poser_question("03-question",
                                [(self.t("Combien de kilomètres", 40), "Combien"),
                                 (self.t("roule-t-elle", 40), "roule"),
                                 (self.t("la 10e semaine ?", 40, RAISON), "10e")],
                                ["70", "75", "65"], 2, y_question=2.85)
        self.dire("03b-reponse")
        self.q_reponse(q, 2)
        ya, yb = q.cartes[0].get_center()[1], q.cartes[1].get_center()[1]
        c1 = [self.t(m, 60, c) for m, c in (("20", WHITE), ("+", WHITE), ("9", RAISON), ("×", WHITE), ("5", RAISON))]
        g1 = VGroup(*c1).arrange(RIGHT, buff=0.18).move_to(P(0, ya))
        c2 = [self.t("=", 64, WHITE), self.t("65", 64, JUSTE)]
        g2 = VGroup(*c2).arrange(RIGHT, buff=0.22).move_to(P(0, yb))
        self.suivre("20")
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), FadeIn(c1[0], scale=1.3), run_time=0.25)
        self.suivre("9")
        self.play(FadeIn(c1[1]), FadeIn(c1[2], scale=1.3), run_time=0.2)
        self.suivre("5")
        self.play(FadeIn(c1[3]), FadeIn(c1[4], scale=1.3), run_time=0.2)
        self.au_mot("égale")
        self.play(FadeIn(c2[0]), run_time=0.2)
        self.suivre("65")
        cad = self.encadre(c2[1], JUSTE, 0.14)
        self.play(FadeIn(c2[1], scale=1.4), Create(cad), run_time=0.3)
        self.insister(VGroup(c2[1], cad), 1.1)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        v2 = velo(0.95).move_to(P(-1.2, 2.05), aligned_edge=DOWN)
        sol = Line(P(-2.0, 2.05), P(2.0, 2.05), stroke_color="#475569", stroke_width=6)
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(sol), FadeIn(v2, shift=RIGHT * 0.3), run_time=0.35)
        question = self.paragraphe([("Combien de", RAISON), ("kilomètres", RAISON), "Chloé roulera-t-elle",
                                    ("la 30e semaine ?", RAISON)], 44, buff=0.14, y=0.75)
        for ligne, ex in zip(question, ("combien", "kilomètres", "Chloé", "30e")):
            self.au_mot(ex)
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if ex == "kilomètres":
                anims.append(v2.animate.shift(RIGHT * 2.0))
            self.play(*anims, run_time=0.5 if ex == "kilomètres" else 0.3)
        case = RoundedRectangle(width=1.0, height=0.75, corner_radius=0.1, stroke_color=RAISON, stroke_width=4,
                                fill_color=FOND_CARTE, fill_opacity=1)
        qm = Text("?", font_size=48, color=RAISON).move_to(case)
        u30 = VGroup(self.t("u₃₀ =", 50, TERME), VGroup(case, qm)).arrange(RIGHT, buff=0.2).move_to(P(0, -0.95))
        self.play(FadeIn(u30, scale=1.2), run_time=0.3)
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
