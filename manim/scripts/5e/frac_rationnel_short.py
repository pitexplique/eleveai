# frac_rationnel_short.py
# EleveAI — Maths 5e — short jumeau de l'épisode 03 « Fraction et quotient »
# (micro fraction_rationnel). CEINTURE BLANCHE (règle du short blanc,
# REGLES.md) : on VOIT que 3 ÷ 4 = 3/4, sans poser de division.
# Il AMUSE : « Combien chacun ? » Malo, CRÊPIER :
#   · EN HAUT, l'image qui bouge : les 3 crêpes, coupées chacune en 4 ;
#   · EN BAS, au même instant, l'assiette d'un ami se remplit (le disque du
#     coach) : 1 quart de chaque crêpe → 3 quarts ; 3 ÷ 4 = 3/4 (même code
#     couleur : orange = la part d'un ami) ;
#   · 1 question-pause (3 s) : 2 crêpes pour 5 amis → 2/5 (leurres 5/2 et 2,5) ;
#   · fin : « 5 crêpes pour 4 amis, combien chacun avec une virgule ? » (1,25).
# Centres d'intérêt : cuisine, jeux-defis. Aucune donnée réelle citée.
# Vérifié (Python) : 3 ÷ 4 = 3/4 = 0,75 ; 2 ÷ 5 = 2/5 ; 5 ÷ 4 = 1,25.
#
# Bases : 5e/frac_lotg_commun.py (ShortG ← 4e/frac_lotd_commun.py).
# Voix : manim/voix/5e-frac-rationnel-short.json (débit −10) ; marques :
# manim/scripts/5e/frac_rationnel_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/5e/frac_rationnel_short.py FracRationnelShort5e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/frac_rationnel_short.py FracRationnelShort5e -o eleveai-maths-5e-frac-rationnel-short --media_dir manim/scripts/5e/media-frac-rationnel-short
# Sortie : manim/sorties/5e/maths/fractions/03-rationnel/eleveai-maths-5e-frac-rationnel-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotg_commun import *  # noqa: E402,F403

CREPE, PART = "#fcd34d", ORANGE_PART


def crepe(x, y, r=0.55):
    """Une crêpe : le disque du coach, tout doré (sans carte)."""
    return Disque(1, 0, rayon=r, couleur=CREPE, vide=CREPE, carte=False, centre=P(x, y))


def ami(couleur, s=0.5):
    tete = Circle(radius=0.3, fill_color=PEAUX[2], fill_opacity=1, stroke_width=0)
    corps = AnnularSector(inner_radius=0, outer_radius=0.42, angle=PI, start_angle=0, fill_color=couleur,
                          fill_opacity=1, stroke_width=0).next_to(tete, DOWN, buff=-0.02)
    return VGroup(corps, tete).scale(s)


class FracRationnelShort5e(ShortG):
    nom_voix = "5e-frac-rationnel-short"
    fichier_marques = "frac_rationnel_short_marques.json"
    ceinture = "blanche"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Combien chacun ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : 3 crêpes, 4 amis ──
        self.dire("00-accroche")
        self.au_mot("Malo")
        nm = self.bloc(["Malo,", "crêpier"], 30, BLEU_CALCUL).move_to(P(0, -2.2))
        self.play(FadeIn(nm, scale=0.8), run_time=0.4)
        cs = [crepe(x, 1.6) for x in (-1.35, 0, 1.35)]
        amis = VGroup(*[ami(c) for c in (PART, "#38bdf8", "#a78bfa", "#4ade80")]).arrange(RIGHT, buff=0.45)
        amis.move_to(P(0, 0.4))
        self.au_nb("a 3")
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in cs], lag_ratio=0.2), run_time=0.7)
        self.au_nb("pour 4")
        self.play(LaggedStart(*[FadeIn(a, shift=UP * 0.2) for a in amis], lag_ratio=0.15), run_time=0.6)
        self.au_mot("Impossible")
        imp = self.bloc(["une crêpe entière", "chacun ?"], 32, ROUGE_ERREUR).move_to(P(0, -0.65))
        sans_synchro(imp)
        self.play(FadeIn(imp), FadeOut(nm), run_time=0.4)
        xx = croix(imp, sw=4)
        self.play(Create(xx), run_time=0.4)
        self.au_mot("combien chacun")
        self.play(Write(titre), run_time=0.7)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(imp), FadeOut(xx), run_time=0.3)

        # ── 01 : chaque crêpe en 4 ──
        self.dire("01-partage")
        self.au_mot("Il coupe")
        neufs, anims = [], []
        for c in cs:
            n4, an = c.repartager(4, run_time=1.0)
            neufs.append(n4)
            anims.append(an)
        self.play(*anims, run_time=1.0)
        cs = neufs
        assiette = Disque(4, 0, rayon=0.8, couleur=PART, centre=P(0, -1.55))
        self.au_mot("Chaque ami prend")
        self.play(*[c.colorier([0], couleur=PART) for c in cs], FadeOut(amis[1:]),
                  amis[0].animate.scale(1.4).move_to(P(-1.55, -1.55)), run_time=0.6)
        self.au_nb("prend 1")
        self.play(FadeIn(assiette, shift=UP * 0.2), run_time=0.4)
        copies = [c.parts[0].copy() for c in cs]
        self.play(*[Transform(cp, assiette.parts[i].copy().set_fill(PART, 1)) for i, cp in enumerate(copies)],
                  run_time=1.0)
        self.au_nb("3 quarts en")
        f = EcritureFraction(3, 4, fs=52, couleur=PART).next_to(assiette, RIGHT, buff=0.35)
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.L([("3 ÷", WHITE, "tout. 3"), ("4 =", WHITE, "divisé par 4"), (EcritureFraction(3, 4, fs=48), WHITE,
                                                                             "égale 3")], 0.2, fs=40)
        self.attendre_voix(marge=0.3)
        self.vider(garder)
        self.ecran2(garder)

    def ecran2(self, garder):
        # ── 02 : la question-pause (3 s) ──
        def apres(sc):
            sc.rep_mots(0, [("2 ÷", None, "B. 2"), ("5 =", None, "divisé par 5"), ("2/5", None, "égale 2")])
            sc.fin_rep()

        self.question_pause("02-question", "02b-reponse", ["2 crêpes pour 5 amis :", "combien chacun ?"],
                            [self.inline("5/2", 30), self.inline("2/5", 30), self.inline("2,5", 30)], 1,
                            ["2 ÷ 5 = 2/5"], mot_q="2 crêpes", autres_r=apres)
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        cs = VGroup(*[crepe(0, 0, 0.36) for _ in range(5)]).arrange(RIGHT, buff=0.15).move_to(P(0, 1.55))
        amis = VGroup(*[ami(c) for c in (PART, "#38bdf8", "#a78bfa", "#4ade80")]).arrange(RIGHT, buff=0.45)
        amis.move_to(P(0, 0.55))
        self.L([("5 crêpes", CREPE, "toi : 5")], -0.35, fs=36, avec=[LaggedStart(*[FadeIn(c, scale=0.6) for c in cs],
                                                                                   lag_ratio=0.15)])
        self.L([("pour 4 amis", WHITE, "pour 4")], -0.9, fs=36,
               avec=[LaggedStart(*[FadeIn(a, shift=UP * 0.2) for a in amis], lag_ratio=0.15)])
        self.au_mot("avec une virgule")
        q = self.bloc(["chacun, avec", "une virgule ?"], 32, ORANGE_RETENUE).move_to(P(0, -1.65))
        sans_synchro(q)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.appel_commentaire(y=-2.5)
