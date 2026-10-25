# frac_multiplier_short.py
# EleveAI — Maths 5e — short jumeau de l'épisode 08 « Multiplier des
# fractions » (micro fraction_multiplier). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : une seule idée, on la VOIT — « 1 quart de 1 tiers » d'une
# tablette, c'est 1 carré sur 12 ; en haut l'écriture se remplit pendant qu'en
# bas la tablette se partage, au même instant.
# Il AMUSE : « Le partage du chocolat ». Anaïs, CHOCOLATIÈRE ; Malo prend 1/3
# de la tablette (une rangée de 4), sa sœur lui en demande 1/4 : 1 carré !
#   · SURPRISE : 1/4 de 1/3 = 1/4 × 1/3 = 1/12 de la tablette ;
#   · 1 question-pause (3 s) : la moitié de la moitié → 1/4 (leurres 1/2, 1/8) ;
#   · commentaire : « tablette de 24 carrés, 1/2 de 1/3 : combien de carrés ? » (4).
# Aucune donnée réelle citée. Vérifié (Python) : 1/4 × 1/3 = 1/12 ;
# 1/2 × 1/2 = 1/4 = 3/12 ; 1/2 × 1/3 × 24 = 4.
# Centres d'intérêt : cuisine, jeux-defis.
#
# Voix : manim/voix/5e-frac-multiplier-short.json (débit −10) ; marques :
# manim/scripts/5e/frac_multiplier_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/5e/frac_multiplier_short.py FracMultiplierShort5e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/frac_multiplier_short.py FracMultiplierShort5e -o eleveai-maths-5e-frac-multiplier-short --media_dir manim/scripts/5e/media-frac-multiplier-short
# Sortie : manim/sorties/5e/maths/fractions/08-multiplier/eleveai-maths-5e-frac-multiplier-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_loth_commun import *  # noqa: E402,F403

CHOCO = "#7c3f1d"
CHOCO_C = "#b45309"   # la part de Malo
PART = "#fb923c"      # le carré de la sœur


def tablette(rangs=3, cols=4, cote=0.7, centre=P(0, -1.45)):
    """Une tablette de chocolat : .carres[r][c] (r = 0 en haut)."""
    g = VGroup()
    g.carres = []
    for r in range(rangs):
        ligne = []
        for c in range(cols):
            sq = RoundedRectangle(width=cote * 0.92, height=cote * 0.92, corner_radius=0.06, fill_color=CHOCO,
                                  fill_opacity=1, stroke_color="#451a03", stroke_width=3)
            sq.move_to(P((c - (cols - 1) / 2) * cote, ((rangs - 1) / 2 - r) * cote))
            ligne.append(sq)
            g.add(sq)
        g.carres.append(ligne)
    fond = RoundedRectangle(width=cote * cols + 0.2, height=cote * rangs + 0.2, corner_radius=0.1,
                            fill_color="#451a03", fill_opacity=1, stroke_width=0)
    tout = VGroup(fond, g).move_to(centre)
    tout.carres = g.carres
    return tout


def chocolatiere(s=0.6):
    p = personne(peau="#e0ac69", tenue="#7c2d12", cheveux="#1f2937", longs=True, s=s)
    toque = RoundedRectangle(width=0.7 * s, height=0.45 * s, corner_radius=0.12 * s, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(p.tete.get_top() + UP * 0.15 * s)
    p.add(toque)
    return p


class FracMultiplierShort5e(ShortH):
    nom_voix = "5e-frac-multiplier-short"
    fichier_marques = "frac_multiplier_short_marques.json"
    ceinture = "blanche"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le partage du chocolat", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Anaïs et la tablette ──
        self.dire("00-accroche")
        an = chocolatiere(0.6).move_to(P(-1.2, 1.3))
        self.au_mot("Anaïs")
        nm = self.bloc(["Anaïs,", "chocolatière"], 28, BLEU_CALCUL).move_to(P(0.75, 1.3))
        self.play(FadeIn(an, shift=UP * 0.2), FadeIn(nm[0]), Write(titre), run_time=0.5)
        self.au_mot("chocolatière")
        self.play(FadeIn(nm[1], shift=UP * 0.1), run_time=0.3)
        tb = tablette()
        self.au_nb("a 12")
        n12 = self.inline("12 carrés", 34, AMBRE).move_to(P(0, 0.25))
        self.play(FadeIn(tb, scale=0.8), FadeIn(n12, scale=1.2), run_time=0.5)
        self.au_nb("3 rangées")
        self.play(LaggedStart(*[Indicate(VGroup(*tb.carres[r]), color=CHOCO_C, scale_factor=1.05) for r in range(3)],
                              lag_ratio=0.3), run_time=0.8)
        self.au_nb("de 4")
        self.play(Indicate(VGroup(*[tb.carres[r][0] for r in range(3)]), color=AMBRE), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(an), FadeOut(nm), FadeOut(n12), run_time=0.3)

        # ── 01 : 1 tiers, puis 1 quart de ce tiers ──
        self.dire("01-partage")
        rang = VGroup(*tb.carres[0])
        e = expression((1, 4, PART), "de", (1, 3, CHOCO_C), fs=50).move_to(P(0, 1.35))
        e[1].set_color(GREY_B)
        self.au_nb("prend 1 tiers")
        self.play(rang.animate.set_fill(CHOCO_C, 1).shift(UP * 0.25), FadeIn(e[1:], scale=1.2), run_time=0.5)
        self.au_nb("4 carrés")
        self.play(Indicate(rang, color=AMBRE, scale_factor=1.05), run_time=0.5)
        self.au_nb("demande 1 quart")
        sq = tb.carres[0][3]
        self.play(sq.animate.set_fill(PART, 1), FadeIn(e[0], scale=1.3), run_time=0.4)
        self.au_nb("reçoit 1")
        self.play(sq.animate.shift(UP * 0.05 + RIGHT * 0.55).rotate(0.2), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 02 : la surprise : 1/12 ──
        self.dire("02-surprise")
        self.play(FadeOut(e), run_time=0.2)
        l1 = self.L([(EcritureFraction(1, 4, fs=40, couleur=PART), None, "Surprise : 1 quart"),
                     ("de", GREY_B, None), (EcritureFraction(1, 3, fs=40, couleur=CHOCO_C), None, "de 1 tiers"),
                     ("=", WHITE, "c'est 1 douzième"), (EcritureFraction(1, 12, fs=40, couleur=AMBRE), None, None)],
                    1.9, 36, x=0, buff=0.18)
        self.au_mot("de la tablette")
        self.play(LaggedStart(*[Indicate(c, color=AMBRE, scale_factor=1.08) for ligne in tb.carres for c in ligne],
                              lag_ratio=0.05), run_time=0.9)
        l2 = self.L([(EcritureFraction(1, 4, fs=40, couleur=PART), None, ("1 quart fois", 1)),
                     ("×", WHITE, None), (EcritureFraction(1, 3, fs=40, couleur=CHOCO_C), None, "fois 1 tiers"),
                     ("=", WHITE, ("égale 1 douzième", 1)), (EcritureFraction(1, 12, fs=40, couleur=AMBRE), None, None)],
                    0.6, 36, x=0, buff=0.18)
        self.play(Create(self.encadrer(l2, couleur=AMBRE, buff=0.12)), Flash(sq, color=PART), run_time=0.5)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["La moitié de la moitié", "de la tablette ?"],
                            [self.inline("1/4", 30), self.inline("1/2", 30), self.inline("1/8", 30)], 0,
                            ["1/2 × 1/2 = 1/4 : 3 carrés sur 12"], mot_q="la moitié")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        tb = tablette(4, 6, cote=0.55, centre=P(0, -1.45))
        self.au_nb("de 24")
        n24 = self.inline("24 carrés", 34, AMBRE).move_to(P(0, 0.15))
        self.play(FadeIn(tb, scale=0.8), FadeIn(n24, scale=1.2), run_time=0.5)
        e = expression((1, 2, PART), "de", (1, 3, CHOCO_C), "=", "?", fs=50).move_to(P(0, 1.65))
        e[1].set_color(GREY_B)
        e[4].set_color(AMBRE)
        self.au_nb("Tu prends 1 demi")
        self.play(FadeIn(e[0], scale=1.2), run_time=0.3)
        self.au_nb("de 1 tiers")
        self.play(FadeIn(e[1:3], scale=1.2), run_time=0.3)
        self.au_mot("Combien de carrés")
        self.play(FadeIn(e[3:], scale=1.2), run_time=0.3)
        self.insister(e[4], 1.4)
        self.appel_commentaire(y=0.75)
