# frac_mixte_regrouper_short.py
# EleveAI — Maths CM2 — short jumeau de l'épisode 11 « Une seule fraction »
# (micro fraction_mixte_regrouper). CEINTURE BLANCHE (règle du short blanc) : on
# VOIT les bouteilles se compter, carton par carton, aucun calcul posé à la main.
# Il AMUSE : « Un jeu de livreur ». Sami, LIVREUR :
#   · EN HAUT : Sami, puis ce qu'on lit (3 cartons et 2 bouteilles ; 3 + 2/4 = 14/4) ;
#   · EN BAS, au même instant : les cartons de 4 bouteilles (1 bouteille = 1
#     quart du carton), qui se remplissent quand la voix compte ;
#   · 1 question-pause (3 s) : 2 cartons et 1 bouteille = 9 quarts (leurres 3 :
#     2 + 1 ; 8 : on oublie la bouteille) ;
#   · commentaire : « 5 cartons et 1 bouteille : combien de quarts de carton ? » (21).
# Vérifié (Python) : 3 × 4 + 2 = 14 ; 2 × 4 + 1 = 9 ; 5 × 4 + 1 = 21.
# Aucune donnée réelle citée. Centres : transports, jeux-defis.
#
# Voix : manim/voix/cm2-frac-mixte-regrouper-short.json (débit −10) ; marques :
# manim/scripts/cm2/frac_mixte_regrouper_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm2/frac_mixte_regrouper_short.py FracMixteRegrouperShortCM2
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm2/frac_mixte_regrouper_short.py FracMixteRegrouperShortCM2 -o eleveai-maths-cm2-frac-mixte-regrouper-short --media_dir manim/scripts/cm2/media-frac-mixte-regrouper-short
# Sortie : manim/sorties/cm2/maths/fractions/11-mixte-regrouper/eleveai-maths-cm2-frac-mixte-regrouper-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cmk_commun import *  # noqa: E402,F403

YC = -1.2
Y1, Y2, Y3 = 1.95, 1.4, 0.85
JUS = ORANGE_PART
CARTON = "#a16207"


def bouteille(h=0.62, plein=True):
    corps = RoundedRectangle(width=0.17, height=h * 0.7, corner_radius=0.05, stroke_color=WHITE, stroke_width=2,
                             fill_color=JUS, fill_opacity=1 if plein else 0)
    col = Rectangle(width=0.08, height=h * 0.2, stroke_color=WHITE, stroke_width=2, fill_color=JUS,
                    fill_opacity=1 if plein else 0).next_to(corps, UP, buff=0)
    return VGroup(corps, col)


def carton(k=0, w=0.95, h=0.85):
    """Un carton de 4 bouteilles (k présentes) : .bouteilles[i] ; vide = pointillé."""
    boite = RoundedRectangle(width=w, height=h, corner_radius=0.06, fill_color=CARTON, fill_opacity=0.35,
                             stroke_color=CARTON, stroke_width=4)
    bs = VGroup(*[bouteille(h * 0.85, i < k) for i in range(4)]).arrange(RIGHT, buff=0.04).move_to(boite)
    for i in range(k, 4):
        bs[i].set_opacity(0)
    g = VGroup(boite, bs)
    g.bouteilles, g.boite = bs, boite
    return g


def poser(c, i):
    return c.bouteilles[i].animate.set_opacity(1)


def livreur(s=0.45):
    return metier("#8d5524", "#2563eb", "#111827", s=s, accessoires=(lambda p: casquette(p, "#f59e0b"),))


class FracMixteRegrouperShortCM2(ShortCM2):
    nom_voix = "cm2-frac-mixte-regrouper-short"
    fichier_marques = "frac_mixte_regrouper_short_marques.json"

    def cartons(self, n, y=YC):
        return VGroup(*[carton(0) for _ in range(n)]).arrange(RIGHT, buff=0.1).move_to(P(0, y))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le jeu du livreur", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Sami et ses cartons ──
        self.dire("00-accroche")
        self.au_mot("Un jeu")
        self.play(Write(titre), run_time=0.6)
        sam = livreur(0.45).move_to(P(-1.3, Y2))
        nm = self.bloc(["Sami,", "livreur"], 26, BLEU_CALCUL).next_to(sam, RIGHT, buff=0.25)
        au_fil(self, [("Sami", [sam, nm], [])])
        c0 = carton(0, w=1.9, h=1.5).move_to(P(0, YC))
        au_fil(self, [("Un carton", [c0], []),
                      ("4 bouteilles", [], [LaggedStart(*[poser(c0, i) for i in range(4)], lag_ratio=0.25,
                                                        run_time=0.8)])])
        l = self.inline("1 bouteille = 1/4", 30, JUS).next_to(c0, DOWN, buff=0.25)
        au_fil(self, [("1 quart du carton", [l], [Indicate(c0.bouteilles[0], color=AMBRE, scale_factor=1.3)])])
        self.attendre_voix(marge=0.2)

        # ── 01 : 3 cartons et 2 bouteilles ──
        self.dire("01-compter")
        self.play(FadeOut(VGroup(sam, nm, c0, l)), run_time=0.3)
        cs = self.cartons(4)
        e0 = self.borne(self.t("3 cartons + 2 bouteilles", 26), 0.6).move_to(P(0, Y1))
        au_fil(self, [("livre 3", [], [FadeIn(cs)])])
        self.poser_lignes(VGroup(e0), "fade", 0.3)
        self.play(*[poser(cs[j], i) for j in range(3) for i in range(4)], poser(cs[3], 0), poser(cs[3], 1),
                  run_time=0.6)
        c1 = self.t("3 × 4 = 12", 34).move_to(P(0, Y2))
        acc = Brace(VGroup(*cs[:3]), DOWN, color=VERT_OK)
        au_fil(self, [("3 cartons, c'est", [], [GrowFromCenter(acc)])])
        self.poser_lignes(VGroup(c1), "fade", 0.3)
        c2 = self.t("+ 2 = 14", 34, VERT_OK).move_to(P(0, Y3))
        au_fil(self, [("Plus", [], [Indicate(cs[3], color=AMBRE, scale_factor=1.08)])])
        self.poser_lignes(VGroup(c2), "fade", 0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : la surprise ──
        self.dire("02-surprise")
        e = frac_ligne(["3", "+", (2, 4, JUS), "=", (14, 4, VERT_OK)], fs=46).move_to(P(0, Y2 - 0.1))
        au_fil(self, [("Donc 3", [e[0]], [FadeOut(VGroup(e0, c1, c2))]), ("plus 2", [e[1], e[2]], []),
                      ("égale 14", [e[3], e[4]], [])])
        self.au_mot("Le dénominateur")
        self.play(*[Indicate(e[i].den, color=AMBRE, scale_factor=1.6) for i in (2, 4)], run_time=0.8)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["2 cartons et 1 bouteille :", "combien de quarts ?"],
                            [self.inline("3", 30), self.inline("9", 30), self.inline("8", 30)], 1,
                            ["2 cartons = 8 bouteilles,", "+ 1 : 9 quarts"], mot_q="2 cartons")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        q = self.borne(self.t("5 cartons + 1 bouteille", 28), 0.6).move_to(P(0, Y1))
        q2 = self.inline("= ? quarts", 32, AMBRE).move_to(P(0, Y1 - 0.55))
        cs = VGroup(*[carton(4 if i < 5 else 1, w=0.8, h=0.72) for i in range(6)]).arrange_in_grid(
            2, 3, buff=0.12).move_to(P(0, YC))
        au_fil(self, [("À toi", [], [FadeIn(cs, lag_ratio=0.1)])])
        self.poser_lignes(VGroup(q), "fade", 0.3)
        au_fil(self, [("combien", [q2], [])])
        self.appel_commentaire(y=Y3 - 0.05)
