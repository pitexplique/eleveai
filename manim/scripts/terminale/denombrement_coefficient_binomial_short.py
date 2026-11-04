# denombrement_coefficient_binomial_short.py
# EleveAI — Maths Tle spé — short « 10 garnitures, combien de pizzas ? » (9:16),
# ceinture BLANCHE. Paysage jumelle : denombrement_coefficient_binomial.py.
#   · 00 : la pizzeria, 10 garnitures, « autant que tu veux » ;
#   · 01 : EN HAUT Enzo, pizzaïolo, et sa pizza où la garniture apparaît (oui)
#          ou disparaît (non) ; EN BAS l'arbre oui / non qui pousse EN MÊME
#          TEMPS (champignons, puis olives) : 2 choix à chaque fois ;
#   · 02 : question-pause « 3 garnitures ? » (C : 8 = 2³), les 8 pizzas ;
#   · 03 : la surprise : 2¹⁰ = 1 024 pizzas (la grille se remplit), presque
#          3 ans, puis 20 garnitures : le compteur file jusqu'à 1 048 576 ;
#   · 04 : « combien de pizzas à exactement 2 garnitures ? » en commentaire ;
#   · 05 : « Entraîne-toi sur eleveai.fr ».
# Code couleur de la paysage : orange = sans ordre (un ensemble), vert = juste.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
#
# Voix : manim/voix/terminale-denombrement-coefficient-binomial-short.json
# (débit −6), calée par denombrement_coefficient_binomial_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/denombrement_coefficient_binomial_short.py DenombrementCoefficientBinomialShort -o eleveai-maths-terminale-denombrement-coefficient-binomial-short --media_dir manim/scripts/terminale/media-denombrement-coefficient-binomial-short
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-coefficient-binomial/

import math
import random
import sys
from itertools import product
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from denombrement_arrangement_combinaison import personne, txt  # noqa: E402
from denombrement_arrangement_combinaison_short import DenombrementArrangementCombinaisonShort  # noqa: E402
from proba_bin_defi import P, puissance  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

assert 2 ** 3 == 8 and 2 ** 10 == 1024 and 2 ** 20 == 1048576 and 2 ** 20 > 10 ** 6
assert 2.7 < 1024 / 365.25 < 3  # « presque 3 ans »


def garniture(i, s=1.0):
    """Dix garnitures dessinées : champignon, olive, tomate, poivron, jambon,
    oignon, basilic, ananas, maïs, piment."""
    if i == 0:
        g = VGroup(Rectangle(width=0.1, height=0.14, fill_color="#F5F5DC", fill_opacity=1, stroke_width=0)
                   .move_to(P(0, -0.07)),
                   AnnularSector(inner_radius=0, outer_radius=0.15, angle=PI, fill_color="#A8A29E",
                                 fill_opacity=1, stroke_width=0).move_to(P(0, 0.04)))
    elif i == 1:
        g = Annulus(inner_radius=0.05, outer_radius=0.12, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                    stroke_width=1)
    elif i == 2:
        g = VGroup(Circle(radius=0.14, fill_color="#DC2626", fill_opacity=1, stroke_width=0),
                   Circle(radius=0.07, fill_color="#F87171", fill_opacity=1, stroke_width=0))
    elif i == 3:
        g = Arc(radius=0.12, angle=PI * 1.2, stroke_color="#16A34A", stroke_width=7)
    elif i == 4:
        g = RoundedRectangle(width=0.24, height=0.2, corner_radius=0.05, fill_color="#F9A8D4", fill_opacity=1,
                             stroke_width=0)
    elif i == 5:
        g = Annulus(inner_radius=0.08, outer_radius=0.12, fill_color="#C084FC", fill_opacity=1, stroke_width=0)
    elif i == 6:
        g = Ellipse(width=0.28, height=0.13, fill_color="#22C55E", fill_opacity=1, stroke_width=0).rotate(0.6)
    elif i == 7:
        g = Triangle(fill_color="#FACC15", fill_opacity=1, stroke_width=0).scale(0.13)
    elif i == 8:
        g = VGroup(*[Dot(P(dx, dy), radius=0.05, color="#FDE047") for dx, dy in ((-0.07, 0), (0.07, 0), (0, 0.1))])
    else:
        g = Ellipse(width=0.3, height=0.08, fill_color="#EF4444", fill_opacity=1, stroke_width=0).rotate(-0.7)
    return g.scale(s)


def pizza(r=0.8):
    pate = Circle(radius=r, fill_color="#D97706", fill_opacity=1, stroke_width=0)
    sauce = Circle(radius=r * 0.86, fill_color="#B91C1C", fill_opacity=1, stroke_width=0)
    fromage = Circle(radius=r * 0.78, fill_color="#FDE68A", fill_opacity=0.85, stroke_width=0)
    return VGroup(pate, sauce, fromage)


def garnir(pz, i, n=4, s=1.0, graine=0):
    """n morceaux de la garniture i posés sur la pizza pz."""
    rng = random.Random(100 * i + graine)
    r = pz[2].width / 2 * 0.7
    c = pz.get_center()
    out = VGroup()
    for k in range(n):
        a = TAU * k / n + rng.random() * 0.8 + i
        d = r * (0.35 + 0.6 * rng.random())
        out.add(garniture(i, s).move_to(c + d * P(math.cos(a), math.sin(a))))
    return out


def toque(s=1.0):
    bas = Rectangle(width=0.5, height=0.16, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    haut = VGroup(*[Circle(radius=0.16, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(dx, 0.22))
                    for dx in (-0.14, 0, 0.14)])
    return VGroup(bas, haut).scale(s)


def calendrier(s=1.0):
    fond = RoundedRectangle(width=0.9, height=0.85, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                            stroke_width=0)
    tete = Rectangle(width=0.9, height=0.2, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0)
    tete.align_to(fond, UP)
    pts = VGroup(*[Dot(radius=0.03, color=GREY_D) for _ in range(20)]).arrange_in_grid(4, 5, buff=0.09)
    pts.move_to(fond.get_center() + DOWN * 0.1)
    return VGroup(fond, tete, pts).scale(s)


class DenombrementCoefficientBinomialShort(DenombrementArrangementCombinaisonShort):
    fichier_marques = "denombrement_coefficient_binomial_short_marques.json"
    nom_voix = "terminale-denombrement-coefficient-binomial-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"

    # ── 00 : la pizzeria, 10 garnitures ────────────────────────────────────

    def accroche(self):
        self.dire("00-accroche")
        pz = pizza(0.85).move_to(P(0, 1.5))
        self.au_mot("pizzeria")
        self.play(GrowFromCenter(pz), run_time=0.45)
        bols = VGroup(*[VGroup(Circle(radius=0.27, fill_color="#1f2937", fill_opacity=1, stroke_color=GREY_B,
                                      stroke_width=2), garniture(i, 1.3)) for i in range(10)])
        for b in bols:
            b[1].move_to(b[0])
        bols.arrange_in_grid(2, 5, buff=0.16).move_to(P(0, -0.8))
        l10 = self.t("10 garnitures", 36, ORANGE_RETENUE).move_to(P(0, 0.3))
        self.au_mot("10")
        self.play(FadeIn(l10, scale=1.3), LaggedStart(*[FadeIn(b, scale=0.5) for b in bols], lag_ratio=0.06),
                  run_time=0.6)
        self.au_mot("autant")
        mis = VGroup()
        for i in (0, 1, 2, 6, 8):
            g = garnir(pz, i, 3, 1.1)
            mis.add(g)
            self.play(*[TransformFromCopy(bols[i][1], x) for x in g], run_time=0.22)
        q = VGroup(self.t("Combien de pizzas", 34, BLEU_CALCUL), self.t("différentes ?", 34, BLEU_CALCUL))
        q.arrange(DOWN, buff=0.12).move_to(P(0, -2.3))
        self.au_mot("Combien")
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.insister(q, 1.06)
        self.attendre_voix(marge=0.2)
        return VGroup(pz, mis, bols, l10, q)

    # ── 01 : Enzo : je la mets, ou pas ? L'arbre oui / non ─────────────────

    def image(self):
        self.dire("01-image")
        enzo = personne(WHITE, peau="#e0ac69", s=0.55).move_to(P(-1.3, 1.55))
        tq = toque(0.75).next_to(enzo[1], UP, buff=-0.06)
        nom = self.t("Enzo", 28, ORANGE_RETENUE).move_to(P(-1.3, 0.52))
        met = self.t("pizzaïolo", 22).move_to(P(-1.3, 0.12))
        self.au_mot("Enzo")
        self.play(FadeIn(enzo, shift=UP * 0.2), FadeIn(tq, shift=DOWN * 0.2), FadeIn(nom), run_time=0.45)
        self.au_mot("pizzaïolo")
        pz = pizza(0.75).move_to(P(0.95, 1.45))
        self.play(FadeIn(met), GrowFromCenter(pz), run_time=0.45)
        q = self.t("je la mets, ou pas ?", 32, JAUNE_TITRE).move_to(P(0, -0.1))
        self.au_mot("je la mets")
        self.play(FadeIn(q, scale=1.2), run_time=0.35)
        # l'arbre
        rac = P(-1.85, -1.55)
        n1 = [P(-0.75, -0.95), P(-0.75, -2.15)]
        n2 = [P(0.45, y) for y in (-0.65, -1.25, -1.85, -2.45)]
        champ = garniture(0, 1.6).move_to(P(-1.4, -0.5))
        oliv = garniture(1, 1.6).move_to(P(-0.15, -0.5))
        b1 = VGroup(*[Line(rac, n, color=ORANGE_RETENUE, stroke_width=4) for n in n1])
        e1 = VGroup(self.t("oui", 22, VERT_OK).next_to(n1[0], UP, buff=0.04),
                    self.t("non", 22, ROUGE_ERREUR).next_to(n1[1], DOWN, buff=0.04))
        champs = garnir(pz, 0, 4, 1.2)
        self.au_mot("Champignons")
        self.play(FadeOut(q), FadeIn(champ, scale=1.4), run_time=0.3)
        self.au_mot("oui")
        self.play(Create(b1[0]), FadeIn(e1[0]), FadeIn(champs, scale=1.5), run_time=0.3)
        self.au_pos(self._texte_voix.find("ou non") + 3)
        self.play(Create(b1[1]), FadeIn(e1[1]), FadeOut(champs, scale=0.5), run_time=0.3)
        b2 = VGroup(*[Line(n1[k // 2], n2[k], color=ORANGE_RETENUE, stroke_width=3) for k in range(4)])
        e2 = VGroup(*[self.t("oui" if k % 2 == 0 else "non", 18, VERT_OK if k % 2 == 0 else ROUGE_ERREUR)
                      .next_to(n2[k], RIGHT, buff=0.06) for k in range(4)])
        olives = garnir(pz, 1, 4, 1.2, graine=3)
        self.au_mot("Olives")
        self.play(FadeIn(oliv, scale=1.4), run_time=0.3)
        self.au_mot("oui", n=2)
        self.play(Create(b2[0]), Create(b2[2]), FadeIn(e2[0]), FadeIn(e2[2]), FadeIn(olives, scale=1.5),
                  run_time=0.3)
        self.au_pos(self._texte_voix.find("ou non", self._texte_voix.find("Olives")) + 3)
        self.play(Create(b2[1]), Create(b2[3]), FadeIn(e2[1]), FadeIn(e2[3]), FadeOut(olives, scale=0.5),
                  run_time=0.3)
        mini = VGroup()
        for k, (c, o) in enumerate(product((1, 0), (1, 0))):
            m = pizza(0.2).move_to(n2[k] + RIGHT * 1.05)
            if c:
                m.add(garnir(m, 0, 2, 0.6))
            if o:
                m.add(garnir(m, 1, 2, 0.6, graine=5))
            mini.add(m)
        self.au_mot("2 choix")
        ch = self.t("2 choix à chaque fois", 28, VERT_OK).move_to(P(0, -2.85))
        self.play(FadeIn(ch, scale=1.2), LaggedStart(*[FadeIn(m, scale=0.5) for m in mini], lag_ratio=0.1),
                  run_time=0.5)
        self.attendre_voix(marge=0.2)
        return VGroup(enzo, tq), VGroup(nom, met), pz, VGroup(champ, oliv, b1, e1, b2, e2, mini, ch)

    # ── 02 : question-pause : 3 garnitures, 2³ = 8 ─────────────────────────

    def question(self, enzo, legende, pz, arbre):
        self.dire("02-question")
        t0 = self.renderer.time
        self.au_mot("Question")
        tete = VGroup(pastille_pause(0.3), self.t("Question !", 32, ORANGE_RETENUE)).arrange(RIGHT, buff=0.18)
        rebours = CompteARebours(3, r=0.24, fs=26)
        VGroup(tete, rebours).arrange(RIGHT, buff=0.35).move_to(P(0, 0.15))
        self.play(FadeOut(arbre), FadeOut(legende), FadeIn(tete, shift=DOWN * 0.15), run_time=0.4)
        q1 = self.t("Avec 3 garnitures, combien", 28).move_to(P(0, -0.32))
        q2 = self.t("de pizzas (même sans rien) ?", 28).move_to(P(0, -0.7))
        trois = VGroup(*[garniture(i, 1.2) for i in (0, 1, 2)]).arrange(DOWN, buff=0.12).next_to(pz, RIGHT, buff=0.03)
        self.au_mot("3 garnitures")
        self.play(FadeIn(q1), LaggedStart(*[FadeIn(g, scale=1.5) for g in trois], lag_ratio=0.15), run_time=0.4)
        self.au_mot("pizzas")
        self.play(FadeIn(q2[:8], shift=UP * 0.1), run_time=0.25)
        self.au_mot("sans rien")
        self.play(FadeIn(q2[8:], shift=UP * 0.1), run_time=0.25)
        cartes = VGroup(*[self.carte_q(l, c) for l, c in zip("ABC", ["6", "9", "8"])])
        cartes.arrange(DOWN, buff=0.1).move_to(P(0, -1.78))
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.1), run_time=0.15)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.1), run_time=0.15)
        pause = self.t("Mets pause, et choisis !", 26, ORANGE_RETENUE).move_to(P(0, -2.8))
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.3)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        print(f"QUESTION 02-question t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse=2", flush=True)
        # la réponse : les 8 pizzas
        self.dire("02b-reponse")
        b = cartes[2]
        self.play(b[0].animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1), b[1][0][0].animate.set_fill(VERT_OK),
                  cartes[0].animate.set_opacity(0.3), cartes[1].animate.set_opacity(0.3), FadeOut(pause),
                  FadeOut(rebours), run_time=0.25)
        ok = self.coche(VERT_OK, 0.16).move_to(b[0].get_right() + LEFT * 0.3)
        self.play(b.animate.scale(1.12), Create(ok), run_time=0.2)
        self.play(b.animate.scale(1 / 1.12), ok.animate.scale(1 / 1.12, about_point=b.get_center()), run_time=0.2)
        f = [self.t("2", 36, ORANGE_RETENUE), self.t("× 2", 36, ORANGE_RETENUE), self.t("× 2", 36, ORANGE_RETENUE)]
        p3 = puissance("2", "3", 36, ORANGE_RETENUE)
        r = VGroup(*f, self.t("=", 36), p3, self.t("= 8", 38, VERT_OK)).arrange(RIGHT, buff=0.12).move_to(P(0, -0.5))
        self.play(FadeOut(q1), FadeOut(q2), run_time=0.15)
        for k in range(3):
            self.au_mot("2", n=k + 1)
            self.play(FadeIn(f[k], shift=UP * 0.1), run_time=0.15)
        self.au_mot("2 puissance")
        self.play(FadeIn(r[3]), FadeIn(p3[0]), run_time=0.15)
        self.au_nb("puissance", "3")
        self.play(FadeIn(p3[1], scale=1.4), run_time=0.15)
        self.au_mot("8 pizzas")
        huit = VGroup()
        for combo in product((0, 1), repeat=3):
            m = pizza(0.3)
            for i, c in enumerate(combo):
                if c:
                    m.add(garnir(m, i, 2, 0.75, graine=i))
            huit.add(m)
        huit.arrange_in_grid(2, 4, buff=0.15).move_to(P(0, 1.5))
        self.play(FadeOut(VGroup(enzo, pz, trois)), FadeIn(r[5], scale=1.3),
                  LaggedStart(*[GrowFromCenter(m) for m in huit], lag_ratio=0.08), run_time=0.6)
        self.attendre_voix(marge=0.3)
        return VGroup(huit, tete, cartes, ok, r)

    # ── 03 : la surprise : 1 024, puis 1 048 576 ───────────────────────────

    def surprise(self, avant):
        self.dire("03-surprise")
        self.play(FadeOut(avant), run_time=0.3)
        self.au_mot("10")
        l10 = self.t("10 garnitures", 34, ORANGE_RETENUE).move_to(P(0, 0.1))
        self.play(FadeIn(l10, scale=1.2), run_time=0.3)
        p10 = puissance("2", "10", 44, ORANGE_RETENUE)
        r = VGroup(p10, self.t("=", 42), self.t("1 024 pizzas", 42, VERT_OK, audit=False)).arrange(RIGHT, buff=0.15)
        r.scale_to_fit_width(min(r.width, 3.7)).move_to(P(0, -0.6))
        self.au_mot("2 puissance")
        self.play(FadeIn(p10[0]), run_time=0.2)
        self.au_nb("puissance", "10")
        self.play(FadeIn(p10[1], scale=1.4), run_time=0.2)
        grille = VGroup(*[Square(0.055, fill_color="#F59E0B", fill_opacity=1, stroke_width=0) for _ in range(1024)])
        grille.arrange_in_grid(32, 32, buff=0.01).move_to(P(0, 1.45))
        self.au_mot("1 024")
        self.play(FadeIn(r[1:], scale=1.2), LaggedStart(*[FadeIn(c) for c in grille], lag_ratio=0.002),
                  run_time=1.2)
        self.au_mot("par jour")
        cal = calendrier(0.9).move_to(P(-1.2, -1.75))
        j1 = self.t("une par jour", 28).next_to(cal, RIGHT, buff=0.25).shift(UP * 0.2)
        self.play(FadeIn(cal, scale=1.3), FadeIn(j1), run_time=0.35)
        self.au_mot("3 ans")
        j2 = self.t("≈ 3 ans !", 30, JAUNE_TITRE).next_to(j1, DOWN, buff=0.12, aligned_edge=LEFT)
        self.play(FadeIn(j2, scale=1.3), Wiggle(cal), run_time=0.5)
        self.au_mot("20")
        l20 = self.t("20 garnitures", 34, ORANGE_RETENUE).move_to(l10)
        self.play(FadeOut(VGroup(cal, j1, j2, r)), Transform(l10, l20), grille.animate.scale(0.13).move_to(P(-1.8, 2.3)),
                  run_time=0.5)
        # le grand tableau : chaque petit carré = 1 024 pizzas
        grand = VGroup(*[Square(0.05, fill_color="#F59E0B", fill_opacity=1, stroke_width=0) for _ in range(1024)])
        grand.arrange_in_grid(32, 32, buff=0.013).move_to(P(0, 1.45))
        v = ValueTracker(1024)
        compteur = always_redraw(lambda: self._nb(v.get_value()))
        self.au_mot("plus d'un million")
        self.add(compteur)
        self.play(ReplacementTransform(grille, grand[0]), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(c) for c in grand[1:]], lag_ratio=0.002), v.animate.set_value(1000000),
                  run_time=1.3, rate_func=rate_functions.ease_in_quad)
        self.au_mot("Exactement")
        self.play(v.animate.set_value(1048576), run_time=0.6)
        compteur.clear_updaters()
        self.remove(compteur)
        exact = self.t("1 048 576", 52, VERT_OK, audit=False).move_to(P(0, -0.85))
        self.au_mot("1 048 576")
        self.add(exact)
        pz = self.t("pizzas !", 34, VERT_OK).next_to(exact, DOWN, buff=0.15)
        self.play(Flash(exact, color=VERT_OK, line_length=0.35), FadeIn(pz), run_time=0.5)
        self.insister(exact, 1.15)
        self.attendre_voix(marge=0.3)
        return VGroup(l10, grand, exact, pz)

    def _nb(self, x):
        t = Text(f"{int(x):,}".replace(",", " "), font_size=52, color=ORANGE_RETENUE)
        t._pas_audit = True
        return t.move_to(P(0, -0.85))

    # ── 04 : à toi : exactement 2 garnitures ───────────────────────────────

    def commentaire(self, avant):
        self.dire("04-commentaire")
        self.au_mot("À toi")
        toi = self.t("À toi !", 40, JAUNE_TITRE).move_to(P(0, 2.2))
        self.play(FadeOut(avant), FadeIn(toi, scale=1.2), run_time=0.4)
        bols = VGroup(*[garniture(i, 1.4) for i in range(10)]).arrange(RIGHT, buff=0.12)
        bols.scale_to_fit_width(min(bols.width, 3.7)).move_to(P(0, 1.5))
        q1 = self.t("Avec 10 garnitures,", 32, ORANGE_RETENUE).move_to(P(0, -0.35))
        self.au_mot("10")
        self.play(FadeIn(q1), LaggedStart(*[FadeIn(b, scale=0.5) for b in bols], lag_ratio=0.05), run_time=0.45)
        q2 = self.t("combien de pizzas ont", 32, ORANGE_RETENUE).move_to(P(0, -0.8))
        self.au_mot("combien")
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.3)
        pz = pizza(0.5).move_to(P(0, 0.5))
        deux = VGroup(garnir(pz, 0, 3, 1.0), garnir(pz, 1, 3, 1.0, graine=2))
        q3 = self.t("exactement 2 garnitures ?", 32, ORANGE_RETENUE).move_to(P(0, -1.25))
        self.au_mot("exactement")
        self.play(FadeIn(q3[:10]), GrowFromCenter(pz), run_time=0.3)
        self.au_mot("2 garnitures")
        self.play(FadeIn(q3[10:], scale=1.2), FadeIn(deux, scale=1.5), Indicate(VGroup(bols[0], bols[1])),
                  run_time=0.4)
        self.au_mot("Réponds")
        appel = self.t("Réponds en commentaire !", 30, VERT_OK, largeur=3.7).move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.5)
        return VGroup(toi, bols, q1, q2, q3, pz, deux, appel)

    def construct(self):
        self.margo_bas()
        titre = self.t("10 garnitures, combien de pizzas ?", 28, JAUNE_TITRE).move_to(P(0, 3.5))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.95))
        self.add(titre, badge)
        a = self.accroche()
        self.play(FadeOut(a), run_time=0.3)
        enzo, legende, pz, arbre = self.image()
        b = self.question(enzo, legende, pz, arbre)
        c = self.surprise(b)
        d = self.commentaire(c)
        self.fin_short("05-abonne", [titre, badge, d])
