# frac_comparer_short.py
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 04 « Comparer des
# fractions » (micro fraction_comparer). CEINTURE BLANCHE (règle du short
# blanc) : on VOIT la taille des parts, aucun calcul posé.
# Il AMUSE : Malo, VÉTÉRINAIRE AU ZOO, a 2 gâteaux pareils :
#   · EN HAUT : ce qu'on lit (1 demi, 1 dixième, « 10 > 2… mais toute petite ! ») ;
#   · EN BAS, au même instant : les 2 gâteaux (le disque du coach), la part de
#     l'éléphant et celle de la fourmi s'allument quand la voix les nomme ;
#   · SURPRISE : 100 fourmis → 1 centième, une miette (le gâteau en grille de
#     10 × 10, une case allumée, cerclée et agrandie) ;
#   · 1 question-pause (3 s) : 4 singes / 3 lions → 1 tiers plus gros que 1 quart
#     (leurres 1 quart : « 4 est plus grand » ; pareil : « c'est 1 part chacun ») ;
#   · commentaire : « combien de parts d'1 huitième pour faire 1 demi ? » (4).
# Vérifié (Python, Fraction) : 1/10 < 1/2 ; 1/100 < 1/10 ; 1/4 < 1/3 ; 4 × 1/8 = 1/2.
# Aucune donnée réelle citée. Centres : animaux, cuisine.
#
# Le short n'affiche pas la classe : rendu UNE fois, copié sous les noms cm1 et cm2.
# Voix : manim/voix/cm-frac-comparer-short.json (débit −10) ; marques :
# manim/scripts/cm1/frac_comparer_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/frac_comparer_short.py FracComparerShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/frac_comparer_short.py FracComparerShortCM -o eleveai-maths-cm1-frac-comparer-short --media_dir manim/scripts/cm1/media-frac-comparer-short
# Sorties : manim/sorties/{cm1,cm2}/maths/fractions/04-comparer/eleveai-maths-{cm1,cm2}-frac-comparer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403

YC = -1.15                    # le centre des gâteaux
XG, XD = -1.05, 1.05          # gâteau des éléphants, gâteau des fourmis
RG = 0.78
Y1, Y2 = 1.95, 1.35           # les lignes de la bande du haut
YE = 0.2                      # les étiquettes au-dessus des gâteaux


def veterinaire(s=0.45):
    p = personne(peau="#e0ac69", tenue="#16a34a", cheveux="#78350f", s=s)
    c = p.corps.get_center()
    croix_v = VGroup(Rectangle(width=0.08 * s / 0.45, height=0.26 * s / 0.45),
                     Rectangle(width=0.26 * s / 0.45, height=0.08 * s / 0.45))
    croix_v.set_fill(WHITE, 1).set_stroke(width=0).move_to(c + UP * 0.05)
    p.add(croix_v)
    return p


def gateau(n, x, k=0, sw=3):
    d = Disque(n, k, rayon=RG, marge=0.14, sw=sw, centre=P(x, YC))
    return d


class FracComparerShortCM(ShortCM):
    nom_voix = "cm-frac-comparer-short"
    fichier_marques = "frac_comparer_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La part de la fourmi", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Malo et ses 2 gâteaux ──
        self.dire("00-accroche")
        self.au_mot("Malo")
        malo = veterinaire().move_to(P(-1.35, 1.65))
        nm = self.bloc(["Malo,", "vétérinaire"], 26, BLEU_CALCUL).next_to(malo, RIGHT, buff=0.2)
        self.play(Write(titre), FadeIn(malo, shift=UP * 0.2), FadeIn(nm), run_time=0.6)
        g2 = gateau(1, XG)
        g10 = gateau(1, XD)
        self.au_mot("2 gâteaux")
        self.play(FadeIn(g2), FadeIn(g10), run_time=0.5)
        e1 = self.inline("2 éléphants", 24, AMBRE).move_to(P(XG, YE))
        self.au_nb("pour 2")
        d2, anim2 = g2.repartager(2, run_time=0.5)
        self.play(FadeIn(e1, shift=DOWN * 0.1), anim2)
        e2 = self.inline("10 fourmis", 24, AMBRE).move_to(P(XD, YE))
        self.au_nb("pour 10")
        d10, anim10 = g10.repartager(10, run_time=0.7)
        self.play(FadeIn(e2, shift=DOWN * 0.1), anim10)
        self.attendre_voix(marge=0.2)

        # ── 01 : 1 demi, 1 dixième ; 10 > 2… mais toute petite ──
        self.dire("01-parts")
        self.play(FadeOut(malo), FadeOut(nm), run_time=0.3)
        l1 = self.inline("1 demi", 25, BLEU_PART).move_to(P(XG, YE))
        self.au_nb("éléphant a 1")
        self.play(FadeOut(e1), FadeIn(l1, scale=1.2), d2.colorier([0], run_time=0.4))
        l2 = self.inline("1 dixième", 25, BLEU_PART).move_to(P(XD, YE))
        self.au_nb("fourmi a 1")
        self.play(FadeOut(e2), FadeIn(l2, scale=1.2), d10.colorier([0], run_time=0.4))
        c10 = self.inline("10", 40, AMBRE)
        sup = self.inline(">", 40, AMBRE)
        c2 = self.inline("2", 40, AMBRE)
        VGroup(c10, sup, c2).arrange(RIGHT, buff=0.2).move_to(P(0, Y1))
        self.au_nb("dixième. 10")
        self.play(FadeIn(c10, scale=1.2), FadeIn(sup), run_time=0.3)
        self.au_nb("que 2")
        self.play(FadeIn(c2, scale=1.2), run_time=0.3)
        mais = self.borne(self.inline("… mais toute petite !", 30, ROUGE_ERREUR), 0.85).move_to(P(0, Y2))
        self.au_mot("mais la part")
        self.play(FadeIn(mais, shift=UP * 0.1), Indicate(d10.parts[0], color=ROUGE_ERREUR, scale_factor=1.4),
                  run_time=0.6)
        self.au_mot("toute petite")
        self.play(Indicate(d10.parts[0], color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 02 : la surprise : 100 fourmis, 1 centième ──
        self.dire("02-surprise")
        self.play(FadeOut(VGroup(c10, sup, c2, mais)), run_time=0.25)
        q100 = self.inline("100 fourmis ?", 32, AMBRE).move_to(P(0, Y1))
        self.au_nb("pour 100")
        d100 = Grille(10, 10, 0, cote=0.156, marge=0.14, sw=1.5, centre=P(XD, YC))  # 100 parts : en grille, lisible
        self.play(FadeIn(q100, scale=1.2), FadeOut(d10), FadeIn(d100), run_time=0.6)
        l3 = self.inline("1 centième", 25, BLEU_PART).move_to(P(XD, YE))
        self.au_nb("? 1")
        self.play(FadeOut(l2), FadeIn(l3, scale=1.2), d100.colorier([0], run_time=0.4))
        miette = self.inline("une miette !", 34, ROUGE_ERREUR).move_to(P(0, Y2))
        loupe = Circle(radius=0.24, stroke_color=JAUNE_TITRE, stroke_width=5).move_to(d100.parts[0])
        self.au_mot("une miette")
        self.play(FadeIn(miette, scale=1.3), Create(loupe), run_time=0.4)
        self.play(loupe.animate.scale(1.5), run_time=0.25)
        self.play(loupe.animate.scale(1 / 1.5), run_time=0.25)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["4 singes, 3 lions :", "la plus grosse part ?"],
                            [self.inline("1 quart", 30), self.inline("1 tiers", 30), self.inline("pareil", 30)], 1,
                            ["En 3 parts : plus grosses !"], mot_q="Un gâteau pour 4")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        d8 = Disque(8, 1, rayon=1.05, marge=0.2, centre=P(0, YC - 0.1))
        e = self.borne(self.inline("1 demi = ? huitièmes", 32), 0.85).move_to(P(0, Y1))
        self.au_nb("d'1")
        self.play(d8.apparaitre(0.6), run_time=0.6)
        moitie = Line(d8.centre_disque() + UP * 1.12, d8.centre_disque() + DOWN * 1.12, color=AMBRE,
                      stroke_width=7)
        self.au_nb("faire 1")
        self.play(FadeIn(e, scale=1.1), Create(moitie), run_time=0.45)
        self.appel_commentaire(y=Y2 - 0.1)
