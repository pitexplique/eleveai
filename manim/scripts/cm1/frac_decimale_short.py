# frac_decimale_short.py
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 06 « Les fractions
# décimales » (micro fraction_decimale). CEINTURE BLANCHE (règle du short
# blanc) : on VOIT les centimes sur la grille de 100 cases, aucun calcul posé.
# Il AMUSE : « 7 pièces de 1 centime : Kenji écrit 0,7 euro. A-t-il raison ? ».
# Kenji, MARCHAND DE GLACES :
#   · EN HAUT : Kenji, les 7 pièces, puis ce qu'on lit (1 € = 100 centimes) ;
#   · EN BAS, au même instant : la grille de 100 cases du coach (1 case = 1
#     centime) : 7 cases = 0,07 € ; 7 colonnes = 70 centimes = 0,7 € (10 fois plus) ;
#   · 1 question-pause (3 s) : 50 centimes = 0,5 € (leurres 0,05 : le piège du
#     zéro ; 50 : on oublie l'unité) ;
#   · commentaire : « 35 centimes, ça s'écrit comment en euro ? » (0,35).
# Vérifié (Python) : 7/100 = 0,07 ; 0,7 = 70/100 ; 50/100 = 0,5 ; 35/100 = 0,35.
# Aucune donnée réelle citée (pas de prix réel). Centres : argent-budget.
#
# Le short n'affiche pas la classe : rendu UNE fois, copié sous les noms cm1 et cm2.
# Voix : manim/voix/cm-frac-decimale-short.json (débit −10) ; marques :
# manim/scripts/cm1/frac_decimale_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/frac_decimale_short.py FracDecimaleShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/frac_decimale_short.py FracDecimaleShortCM -o eleveai-maths-cm1-frac-decimale-short --media_dir manim/scripts/cm1/media-frac-decimale-short
# Sorties : manim/sorties/{cm1,cm2}/maths/fractions/06-decimale/eleveai-maths-{cm1,cm2}-frac-decimale-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403
from frac_cmj_commun import *  # noqa: E402,F403

YG = -1.45     # le centre de la grille
Y1, Y2, Y3 = 1.95, 1.35, 0.75


def glacier(s=0.42):
    p = personne(peau="#f1c27d", tenue="#db2777", cheveux="#111827", s=s)
    c = p.corps.get_right() + RIGHT * 0.12 + UP * 0.25 * s
    cone = Polygon(c + LEFT * 0.12 * s * 2, c + RIGHT * 0.12 * s * 2, c + DOWN * 0.5 * s * 2, fill_color="#d97706",
                   fill_opacity=1, stroke_width=0)
    boule = Circle(radius=0.16 * s * 2, fill_color="#f9a8d4", fill_opacity=1, stroke_width=0).move_to(
        c + UP * 0.1 * s * 2)
    p.add(cone, boule)
    return p


class FracDecimaleShortCM(ShortCM):
    nom_voix = "cm-frac-decimale-short"
    fichier_marques = "frac_decimale_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Combien d'euros ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Kenji, les 7 pièces, « 0,7 euro » ──
        self.dire("00-accroche")
        kenji = glacier(0.42).move_to(P(-1.35, 1.55))
        nm = self.bloc(["Kenji,", "glacier"], 26, BLEU_CALCUL).next_to(kenji, RIGHT, buff=0.3)
        self.au_mot("Kenji")
        self.play(Write(titre), FadeIn(kenji, shift=UP * 0.2), FadeIn(nm), run_time=0.6)
        pieces = VGroup(*[piece(0.22) for _ in range(7)]).arrange(RIGHT, buff=0.08).move_to(P(0, 0.2))
        l7 = VGroup(self.inline("7 pièces", 26, AMBRE), self.inline("de 1 centime", 26, AMBRE)).arrange(RIGHT, buff=0.15)
        self.borne(l7, 0.6)
        l7.move_to(P(0, -0.35))
        self.au_nb("avec 7")
        self.play(LaggedStart(*[FadeIn(p, scale=1.4) for p in pieces], lag_ratio=0.12), FadeIn(l7[0]), run_time=0.7)
        au_fil(self, [("de 1 centime", [l7[1]], [])])
        ticket = VGroup(RoundedRectangle(width=2.6, height=0.9, corner_radius=0.12, fill_color=WHITE, fill_opacity=1,
                                         stroke_width=0),
                        Text("0,7 €", font_size=46, color=NUIT, weight=BOLD)).move_to(P(0, -1.5))
        ticket[1].move_to(ticket[0])
        self.au_nb("écrit : 0,7")
        self.play(FadeIn(ticket, shift=UP * 0.2), run_time=0.4)
        q = self.t("?", 80, ORANGE_RETENUE).next_to(ticket, RIGHT, buff=0.2)
        self.au_mot("A-t-il raison")
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.insister(q, 1.3)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 01 : 1 euro = 100 centimes ──
        self.dire("01-cent")
        g = Grille(10, 10, 0, cote=0.2, sw=2, centre=P(0, YG))
        l1 = VGroup(self.inline("1 euro", 30), self.inline("= 100 centimes", 30)).arrange(RIGHT, buff=0.15)
        self.borne(l1, 0.6)
        l1.move_to(P(0, Y1))
        au_fil(self, [("1 euro", [l1[0]], []), ("1 euro, c'est 100", [l1[1]], [g.apparaitre(0.8)])], run_time=0.8)
        l2 = self.borne(self.inline("1 centime = 1 case", 30, AMBRE)).move_to(P(0, Y2))
        f = EcritureFraction(1, 100, fs=34, couleur=AMBRE)
        l3 = VGroup(self.inline("=", 30, AMBRE), f, self.inline("d'euro", 28, AMBRE)).arrange(RIGHT, buff=0.2)
        l3.move_to(P(0, Y3 - 0.05))
        l3[0].set_y(f.trait.get_y())
        l3[2].set_y(f.trait.get_y())
        au_fil(self, [("Alors 1 centime", [l2], [g.liste[0].animate.set_fill(AMBRE, 1)]),
                      ("1 centième", [l3], [])])
        self.attendre_voix(marge=0.2)

        # ── 02 : 7 centimes = 0,07 € ; 0,7 € = 70 centimes ──
        self.dire("02-surprise")
        self.play(FadeOut(VGroup(l1, l2, l3)), g.liste[0].animate.set_fill(VIDE, 1), run_time=0.3)
        a1 = VGroup(self.inline("7 centimes", 32, VERT_OK), self.inline("= 0,07 €", 32, VERT_OK)).arrange(RIGHT,
                                                                                                         buff=0.15)
        self.borne(a1, 0.6)
        a1.move_to(P(0, Y1))
        au_fil(self, [("7 centimes", [a1[0]], [g.colorier(range(7), couleur=VERT_OK, lag=0.1, run_time=0.6)]),
                      ("on écrit 0,07", [a1[1]], [])])
        a2 = VGroup(self.inline("0,7 €", 32, BLEU_PART), self.inline("= 7 dixièmes", 32, BLEU_PART)).arrange(RIGHT,
                                                                                                         buff=0.15)
        self.borne(a2, 0.6)
        a2.move_to(P(0, Y2))
        a3 = self.borne(self.inline("= 70 centimes !", 32, BLEU_PART)).move_to(P(0, Y3))
        cols7 = [r * 10 + c for r in range(10) for c in range(7)]
        au_fil(self, [("Et 0,7", [a2[0]], []), ("C'est 7 dixièmes", [a2[1]], [g.colorier([i for i in cols7 if i >= 10 or i >= 7],
                                                                                couleur=BLEU_PART, lag=0.005,
                                                                                run_time=0.8)]),
                      ("70 centimes", [a3], [])], run_time=0.5)
        x10 = self.borne(self.inline("10 fois plus !", 34, ORANGE_RETENUE)).move_to(P(0, Y3 - 0.55))
        au_fil(self, [("10 fois plus", [x10], [])])
        self.insister(x10, 1.2)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["50 centimes :", "combien d'euros ?"],
                            [self.inline("0,05", 30), self.inline("0,5", 30), self.inline("50", 30)], 1,
                            ["50 centièmes = 5 dixièmes", "= 0,5 €, la moitié"])
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        g2 = Grille(10, 10, 0, cote=0.2, sw=2, centre=P(0, YG))
        e = self.borne(self.inline("35 centimes = ? €", 34), 0.6).move_to(P(0, Y1))
        au_fil(self, [("À toi : 35", [e], [g2.apparaitre(0.5)])], run_time=0.5)
        self.play(g2.colorier(range(35), couleur=VERT_OK, lag=0.01, run_time=0.8))
        self.appel_commentaire(y=Y2 - 0.1)
