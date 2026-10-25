# frac_diviser_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 09 « Diviser des fractions »
# (micro fraction_diviser). CEINTURE BLANCHE (règle du short blanc) : on VOIT
# la division (on compte les morceaux), aucun calcul posé.
# Il AMUSE : « Diviser… et ça grossit ! ». Jules, FLEURISTE :
#   · EN HAUT, l'image qui bouge : un bouquet de plus à chaque coupe ;
#   · EN BAS, au même instant, le ruban de 3 m (3 barres de 4 quarts) est
#     coupé quart par quart : 3 ÷ 1/4 = 3 × 4 = 12 ;
#   · SURPRISE : on divise 3… et on trouve 12, plus grand !
#   · 1 question-pause (3 s) : 2 ÷ 1/3 = 6 (leurres 2/3 : on multiplie ;
#     1/6 : on divise le dénominateur) ;
#   · commentaire : « 5 divisé par 1 demi ? » (10).
# Vérifié (Python) : 3 ÷ 1/4 = 12 ; 2 ÷ 1/3 = 6 ; 5 ÷ 1/2 = 10.
# Aucune donnée réelle citée. Centres : nature-ecologie, art-design.
#
# Voix : manim/voix/4e-frac-diviser-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_diviser_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/frac_diviser_short.py FracDiviserShort4e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_diviser_short.py FracDiviserShort4e -o eleveai-maths-4e-frac-diviser-short --media_dir manim/scripts/4e/media-frac-diviser-short
# Sortie : manim/sorties/4e/maths/fractions/09-diviser/eleveai-maths-4e-frac-diviser-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lote_commun import *  # noqa: E402,F403

RUBAN = "#f43f5e"
YH = 1.5
YS = [-0.35, -1.15, -1.95]     # les trois mètres de ruban


def fleuriste(s=0.5):
    p = personne(peau="#f1c27d", tenue="#16a34a", cheveux="#78350f", s=s)
    tablier = p.corps.copy().set_fill("#86efac", 1).scale(0.7).shift(DOWN * 0.08 * s / 0.5)
    p.add(tablier)
    return p


def bouquet(s=0.32):
    tiges = VGroup(*[Line(P(0, -0.5), P(x, 0.15), stroke_color="#15803d", stroke_width=4) for x in (-0.2, 0, 0.2)])
    fleurs = VGroup(*[Circle(radius=0.14, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(x, 0.2 + y))
                      for x, y, c in ((-0.2, 0, "#f472b6"), (0, 0.12, "#facc15"), (0.2, 0, "#a78bfa"))])
    noeud = VGroup(*[Triangle(fill_color=RUBAN, fill_opacity=1, stroke_width=0).scale(0.09).rotate(a)
                     .move_to(P(dx, -0.25)) for a, dx in ((-PI / 2, -0.08), (PI / 2, 0.08))])
    return VGroup(tiges, fleurs, noeud).scale(s / 0.32)


class FracDiviserShort4e(ShortE):
    nom_voix = "4e-frac-diviser-short"
    fichier_marques = "frac_diviser_short_marques.json"
    ceinture = "blanche"

    def rubans(self):
        return VGroup(*[Barre(4, 4, largeur=3.6, hauteur=0.42, couleur=RUBAN, marge=0.1, sw=2, centre=P(0, y))
                        for y in YS])

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Diviser… et ça grossit !", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        jules = fleuriste(0.5).move_to(P(-1.55, YH - 0.05))

        # ── 00 : Jules et son ruban ──
        self.dire("00-accroche")
        self.au_mot("Jules")
        nm = self.bloc(["Jules,", "fleuriste"], 26, BLEU_CALCUL).next_to(jules, DOWN, buff=0.1).set_x(-1.2)
        self.play(FadeIn(jules, shift=UP * 0.2), FadeIn(nm), Write(titre), run_time=0.6)
        rb = self.rubans()
        for b in rb:
            for t in b.traits:
                t.set_stroke(opacity=0)
        self.au_nb("a 3")
        self.play(LaggedStart(*[FadeIn(b, shift=RIGHT * 0.3) for b in rb], lag_ratio=0.2), run_time=0.6)
        self.au_mot("il coupe 1 quart")
        self.au_nb("il coupe 1")
        q = self.inline("1 bouquet = 1/4 m", 30, AMBRE).move_to(P(0, 0.45))
        self.play(FadeOut(nm), FadeIn(q, shift=UP * 0.1), rb[0].traits[0].animate.set_stroke(opacity=1), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(q), run_time=0.25)

        # ── 01 : on coupe, quart par quart ──
        self.dire("01-couper")
        e = expression("3", "÷", (1, 4), "=", "?", fs=44).move_to(P(0, 0.45))
        self.au_nb("3 divisé")
        self.play(FadeIn(e[0], scale=1.2), run_time=0.25)
        self.au_nb("par 1 quart")
        self.play(FadeIn(e[1:], scale=1.2), run_time=0.3)
        self.au_nb("il y a 4")
        self.play(*[t.animate.set_stroke(opacity=1) for t in rb[0].traits],
                  LaggedStart(*[Indicate(p, color=WHITE, scale_factor=1.15) for p in rb[0].parts], lag_ratio=0.2),
                  run_time=0.6)
        self.au_mot("Dans 3 mètres")
        bq = VGroup(*[bouquet() for _ in range(12)]).arrange_in_grid(rows=2, cols=6, buff=0.08)
        bq.scale_to_fit_width(2.5).move_to(P(0.8, YH))
        anims = []
        for k in range(12):
            r, c = divmod(k, 4)
            x = rb[r].x_trait(c + 1)
            y = rb[r].get_y()
            coupe = Line(P(x, y - 0.3), P(x, y + 0.3), color=WHITE, stroke_width=6)
            anims.append(AnimationGroup(Create(coupe), FadeIn(bq[k], scale=0.4)))
        self.play(*[t.animate.set_stroke(opacity=1) for b in rb[1:] for t in b.traits],
                  LaggedStart(*anims, lag_ratio=0.25), run_time=1.15)
        self.au_mot("3 fois 4")
        res = self.ligne([("3 ×", VERT_OK), ("4 =", VERT_OK), ("12", VERT_OK)], 40).move_to(P(0, 0.45))
        self.play(FadeOut(e), run_time=0.2)
        self.poser_lignes(res, "pop", 0.3)
        self.insister(res, 1.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : la surprise : plus grand ! ──
        self.dire("02-surprise")
        self.au_nb("on a divisé 3")
        g3 = self.inline("3", 60, RUBAN).move_to(P(-1.2, 0.45))
        g12 = self.inline("12", 60, VERT_OK).move_to(P(1.2, 0.45))
        fl = Arrow(P(-0.8, 0.45), P(0.7, 0.45), color=AMBRE, stroke_width=6, buff=0)
        self.play(FadeOut(res), FadeIn(g3, scale=1.3), run_time=0.3)
        self.au_nb("on trouve 12")
        self.play(GrowArrow(fl), FadeIn(g12, scale=1.6), run_time=0.4)
        self.au_mot("plus grand")
        self.insister(g12, 1.4)
        r = VGroup(self.inline("÷ 1/4", 40, AMBRE), self.inline("= × 4", 40, AMBRE)).arrange(RIGHT, buff=0.3)
        r.move_to(P(0, 0.45))
        pas_audit(r)
        self.au_nb("Diviser par 1")
        self.play(FadeOut(VGroup(g3, fl, g12)), FadeIn(r[0], scale=1.2), run_time=0.3)
        self.au_nb("multiplier par 4")
        self.play(FadeIn(r[1], scale=1.2), run_time=0.3)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["2 ÷ 1 tiers ?"],
                            [self.inline("2/3", 30), self.inline("6", 30), self.inline("1/6", 30)], 1,
                            ["3 tiers dans 1 m :", "2 × 3 = 6"], mot_q="2 divisé")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        rb5 = VGroup(*[Barre(2, 2, largeur=1.6, hauteur=0.4, couleur=RUBAN, marge=0.08, sw=2) for _ in range(5)])
        rb5.arrange_in_grid(rows=3, cols=2, buff=(0.25, 0.2)).move_to(P(0, -1.6))
        e = expression("5", "÷", (1, 2), "=", "?", fs=50).move_to(P(0, 0.35))
        e[4].set_color(AMBRE)
        self.montre(["5 divisé", "par 1 demi"], [e[0], e[1:3]], avec=[FadeIn(rb5)])
        self.au_mot("combien")
        self.play(FadeIn(e[3:], scale=1.3), run_time=0.3)
        self.insister(e[4], 1.5)
        self.appel_commentaire(y=1.4)
