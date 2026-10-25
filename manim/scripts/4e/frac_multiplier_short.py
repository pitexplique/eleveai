# frac_multiplier_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 07 « Multiplier des
# fractions » (micro fraction_multiplier). CEINTURE BLANCHE (règle du short
# blanc) : on VOIT le produit, aucun calcul posé.
# Il AMUSE : « Plier, c'est multiplier ». Yuna, ARTISTE EN ORIGAMI :
#   · EN HAUT, l'image qui bouge : la feuille pliée, de plus en plus petite ;
#   · EN BAS, au même instant, la feuille dépliée : les plis la coupent et le
#     morceau rose (celui qu'on voit en haut) rétrécit : 1/2, 1/4, 1/8 ;
#     « chaque pli multiplie par 1/2 » : 1/2 × 1/2 × 1/2 = 1/8 ;
#   · 1 question-pause (3 s) : en 2 puis en 3 → 1/2 × 1/3 = 1/6 (leurres 1/5 :
#     on ajoute les bas ; 2/3) ;
#   · SURPRISE : 7 plis → 1/128 de la feuille, 128 épaisseurs ;
#   · commentaire : « en 3 puis encore en 3 : quelle fraction ? » (1/9).
# Vérifié (Python) : (1/2)^3 = 1/8 ; 1/2 × 1/3 = 1/6 ; (1/2)^7 = 1/128 ;
# 1/3 × 1/3 = 1/9. Aucune donnée réelle citée. Centres : art-design, jeux-defis.
#
# Voix : manim/voix/4e-frac-multiplier-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_multiplier_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/frac_multiplier_short.py FracMultiplierShort4e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_multiplier_short.py FracMultiplierShort4e -o eleveai-maths-4e-frac-multiplier-short --media_dir manim/scripts/4e/media-frac-multiplier-short
# Sortie : manim/sorties/4e/maths/fractions/07-multiplier/eleveai-maths-4e-frac-multiplier-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lote_commun import *  # noqa: E402,F403

ROSE = "#f472b6"
W, H = 3.4, 2.2           # la feuille dépliée (en bas)
CF = P(0, -1.35)          # son centre
YP = 1.45                 # la hauteur de l'image du haut


def feuille(cols, rangs, kc, kr, couleur=ROSE, w=W, h=H, centre=CF):
    """La feuille dépliée : cols × rangs morceaux ; le morceau rose = kc colonnes
    × kr rangées en haut à gauche. .fond .rose .plis."""
    fond = Rectangle(width=w, height=h, fill_color="#fdf2f8", fill_opacity=1, stroke_color=BORD, stroke_width=4)
    g, hh = -w / 2, h / 2
    rose = Rectangle(width=w * kc / cols, height=h * kr / rangs, fill_color=couleur, fill_opacity=1, stroke_width=0)
    rose.move_to(P(g + w * kc / cols / 2, hh - h * kr / rangs / 2))
    plis = VGroup(*[DashedLine(P(g + w * j / cols, -hh), P(g + w * j / cols, hh), color=BORD, stroke_width=3,
                               dash_length=0.08) for j in range(1, cols)],
                  *[DashedLine(P(g, hh - h * i / rangs), P(-g, hh - h * i / rangs), color=BORD, stroke_width=3,
                               dash_length=0.08) for i in range(1, rangs)])
    out = VGroup(fond, rose, plis).move_to(centre)
    out.fond, out.rose, out.plis = fond, rose, plis
    return out


def pliee(frac_w, frac_h, couches=1):
    """La feuille pliée, en haut : un rectangle rose de taille réduite, avec
    quelques bords décalés pour les épaisseurs."""
    w, h = W * 0.55 * frac_w, H * 0.55 * frac_h
    g = VGroup()
    for k in range(min(couches, 6) - 1, -1, -1):
        g.add(Rectangle(width=w, height=h, fill_color=ROSE if k == 0 else "#f9a8d4", fill_opacity=1,
                        stroke_color="#831843", stroke_width=2).shift(P(0.05 * k, -0.05 * k)))
    return g.move_to(P(0.9, YP))


def artiste(s=0.5):
    p = personne(peau="#f1c27d", tenue="#7c3aed", cheveux="#111827", longs=True, s=s)
    return p


class FracMultiplierShort4e(ShortE):
    nom_voix = "4e-frac-multiplier-short"
    fichier_marques = "frac_multiplier_short_marques.json"
    ceinture = "blanche"

    def eq(self, *items):
        e = expression(*items, fs=44)
        e.scale_to_fit_width(min(e.width, 3.9)).move_to(P(0, 0.3))
        return e

    def plier(self, ancienne, cols, rangs, fw, fh, couches, haut_old):
        """Un pli : en haut la feuille rétrécit, en bas les plis et le rose."""
        neuve = feuille(cols, rangs, 1, 1)
        h2 = pliee(fw, fh, couches)
        self.play(Transform(haut_old, h2), FadeIn(neuve.plis), Transform(ancienne.rose, neuve.rose), run_time=0.6)
        self.remove(ancienne.plis)
        self.add(neuve.plis)
        ancienne.plis = neuve.plis
        return ancienne

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Plier, c'est multiplier", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Yuna plie en 2 ──
        self.dire("00-accroche")
        yu = artiste(0.55).move_to(P(-1.2, YP - 0.05))
        f = feuille(1, 1, 1, 1)
        haut = pliee(1, 1)
        self.au_mot("Yuna")
        nm = self.bloc(["Yuna,", "origami"], 26, BLEU_CALCUL).next_to(yu, DOWN, buff=0.08).set_x(-1.1)
        self.play(FadeIn(yu, shift=UP * 0.2), FadeIn(nm), FadeIn(haut), run_time=0.5)
        self.au_mot("plie une feuille")
        self.play(FadeIn(f), Write(titre), run_time=0.7)
        self.au_nb("en 2")
        f = self.plier(f, 2, 1, 0.5, 1, 2, haut)
        e = self.eq((1, 2, ROSE))
        self.au_mot("1 demi de la feuille")
        self.play(FadeOut(nm), FadeIn(e, scale=1.3), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 01 : 1/2 de 1/2, puis 1/2 de 1/4 ──
        self.dire("01-plis")
        self.au_nb("Encore en 2")
        f = self.plier(f, 2, 2, 0.5, 0.5, 4, haut)
        e2 = self.eq((1, 2), "×", (1, 2), "=", (1, 4, ROSE))
        self.au_mot("1 demi de 1 demi")
        self.play(FadeOut(e), FadeIn(e2[0], scale=1.2), run_time=0.3)
        self.au_nb("1 demi de 1")
        self.play(FadeIn(e2[1:3], scale=1.2), run_time=0.3)
        self.au_mot("1 quart")
        self.play(FadeIn(e2[3:], scale=1.3), run_time=0.3)
        self.au_mot("Et encore")
        f = self.plier(f, 4, 2, 0.25, 0.5, 6, haut)
        e3 = self.eq((1, 2), "×", (1, 4), "=", (1, 8, ROSE))
        self.au_mot("1 demi de 1 quart")
        self.play(FadeOut(e2), FadeIn(e3[0], scale=1.2), run_time=0.3)
        self.au_nb("1 demi de 1 quart")
        self.play(FadeIn(e3[1:3], scale=1.2), run_time=0.3)
        self.au_mot("1 huitième")
        self.play(FadeIn(e3[3:], scale=1.3), run_time=0.3)
        self.au_mot("Chaque pli")
        regle = self.ligne([("1 pli = ", AMBRE), ("× 1/2", AMBRE)], 40).move_to(P(0, 0.3))
        pas_audit(regle)
        self.play(FadeOut(e3), FadeIn(regle, scale=1.2), run_time=0.35)
        self.insister(regle, 1.15)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["En 2, puis en 3 :", "quelle fraction ?"],
                            [self.inline("1/5", 30), self.inline("1/6", 30), self.inline("2/3", 30)], 1,
                            ["1/2 × 1/3 = 1/6"], mot_q="Elle plie")
        self.vider(garder)

        # ── 03 : la surprise : 7 plis ──
        self.dire("03-surprise")
        f7 = feuille(16, 8, 1, 1)
        f7.plis.set_stroke(width=1.5)
        self.au_nb("après 7")
        t7 = self.inline("7 plis :", 32, AMBRE)
        r = self.inline("1/128", 42, ROSE)
        VGroup(t7, r).arrange(RIGHT, buff=0.25).move_to(P(0, 0.35))
        self.play(FadeIn(f7.fond), FadeIn(f7.plis), FadeIn(f7.rose), FadeIn(t7, shift=RIGHT * 0.1), run_time=0.6)
        self.au_mot("1 cent-vingt-huitième")
        self.play(FadeIn(r, scale=1.4), Indicate(f7.rose, color=WHITE, scale_factor=2.5), run_time=0.5)
        pile = VGroup(*[Line(P(-0.35, 0), P(0.35, 0), stroke_color=ROSE if k % 2 else "#f9a8d4", stroke_width=3)
                        .shift(UP * 0.018 * k) for k in range(64)]).move_to(P(-1.45, YP))
        self.au_nb("le papier a 128")
        e128 = VGroup(self.inline("128", 44, AMBRE), self.inline("épaisseurs !", 28, AMBRE)).arrange(DOWN, buff=0.1)
        e128.move_to(P(0.55, YP))
        self.play(LaggedStart(*[Create(l) for l in pile], lag_ratio=0.02, run_time=0.6), FadeIn(e128, scale=1.2))
        self.insister(e128, 1.15)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        f9 = feuille(3, 1, 1, 1, w=3.0, h=2.0, centre=P(0, -1.2))
        self.au_nb("plie en 3")
        self.play(FadeIn(f9), run_time=0.4)
        f9b = feuille(3, 3, 1, 1, w=3.0, h=2.0, centre=P(0, -1.2))
        self.au_nb("encore en 3")
        self.play(FadeIn(f9b.plis), Transform(f9.rose, f9b.rose), run_time=0.5)
        e = self.eq((1, 3), "×", (1, 3), "=", "?")
        e[4].set_color(AMBRE)
        self.montre(["1 tiers fois", "fois 1 tiers", "quelle fraction"], [e[0], e[1:3], e[3:]])
        self.insister(e[4], 1.5)
        self.appel_commentaire(y=1.35)
