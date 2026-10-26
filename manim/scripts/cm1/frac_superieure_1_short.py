# frac_superieure_1_short.py
# EleveAI — Maths CM1 — short jumeau de l'épisode 09 « Une fraction plus grande
# que 1 » (micro fraction_superieure_1). CEINTURE BLANCHE (règle du short
# blanc) : on VOIT les quarts de cœur remplir plus d'un cœur, aucun calcul posé.
# Il AMUSE : les CŒURS DE VIE d'un jeu vidéo ; Hugo, CRÉATEUR DE JEUX VIDÉO :
#   · EN HAUT : Hugo, puis ce qu'on lit (7 quarts = 1 cœur et 3 quarts) ;
#   · EN BAS, au même instant : les cœurs coupés en 4 quarts qui se remplissent
#     quart par quart (la barre de vie du jeu = le disque du coach en 4 parts) ;
#   · 1 question-pause (3 s) : 7 quarts + 2 quarts = 9 quarts (leurres 5 : 7 − 2,
#     2 : la potion seule) ;
#   · commentaire : « 11 quarts de cœur, combien de cœurs pleins ? » (2, et 3 quarts).
# Vérifié (Python) : 7/4 = 1 + 3/4 ; 7/4 + 2/4 = 9/4 = 2 + 1/4 ; 11/4 = 2 + 3/4.
# Aucune donnée réelle citée. Centres : jeux-video, jeux-defis.
#
# CM1 seul : rendu une fois, sortie cm1 uniquement.
# Voix : manim/voix/cm-frac-superieure-1-short.json (débit −10) ; marques :
# frac_superieure_1_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/frac_superieure_1_short.py FracSuperieure1ShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/frac_superieure_1_short.py FracSuperieure1ShortCM -o eleveai-maths-cm1-frac-superieure-1-short --media_dir manim/scripts/cm1/media-frac-superieure-1-short
# Sortie : manim/sorties/cm1/maths/fractions/09-superieure-1/eleveai-maths-cm1-frac-superieure-1-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403
from frac_cmj_commun import *  # noqa: E402,F403

Y1, Y2, Y3 = 1.95, 1.3, 0.65
YH = -1.6
ROUGE = "#ef4444"


def createur(s=0.42):
    p = personne(peau="#e0ac69", tenue="#4f46e5", cheveux="#1f2937", s=s)
    p.add(casque_audio(p))
    return p


class FracSuperieure1ShortCM(ShortCM):
    nom_voix = "cm-frac-superieure-1-short"
    fichier_marques = "frac_superieure_1_short_marques.json"

    def remplir_quart(self, c, i, run_time=0.3):
        return c.parts[i].animate.set_fill(ROUGE, 1)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Combien de cœurs ?", self.ceinture)
        self.add(badge)
        sans_synchro(titre)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Hugo, ses cœurs coupés en 4, 7 quarts ──
        self.dire("00-accroche")
        hugo = createur(0.42).move_to(P(-1.3, 1.55))
        nm = self.bloc(["Hugo,", "créateur de jeux"], 24, BLEU_CALCUL).next_to(hugo, RIGHT, buff=0.25)
        au_fil(self, [("Hugo", [hugo, nm], [Write(titre)])], run_time=0.6)
        c1 = coeur(0.8).move_to(P(-1.0, YH))
        c2 = coeur(0.8).move_to(P(1.0, YH))
        au_fil(self, [("chaque cœur de vie", [c1], []), ("en 4 quarts", [], [Indicate(c1.traits, color=AMBRE)])])
        f = EcritureFraction(7, 4, fs=60, couleur=ROUGE)
        l = VGroup(self.inline("héros :", 34), f).arrange(RIGHT, buff=0.25)
        l[0].set_y(f.trait.get_y())
        l.move_to(P(0, 0.35))
        au_fil(self, [("Ton héros a 7", [l], [FadeOut(hugo), FadeOut(nm)])])
        self.attendre_voix(marge=0.2)

        # ── 01 : on remplit les cœurs ──
        self.dire("01-remplir")
        self.play(FadeOut(l), run_time=0.25)
        au_fil(self, [("On remplit", [c2], [])])
        l1 = ligne_calc(self, [("4 quarts :", VERT_OK), ("1 cœur plein !", VERT_OK)], centre=P(0, Y1), fs=30)
        self.borne(l1, 0.5)
        au_fil(self, [("4 quarts", [l1[0]], [LaggedStart(*[self.remplir_quart(c1, i) for i in range(4)],
                                                          lag_ratio=0.35)])], run_time=1.0)
        au_fil(self, [("1 cœur plein", [l1[1]], [Flash(c1, color=VERT_OK, flash_radius=0.9)])])
        l2 = self.borne(self.inline("+ 3 quarts", 30, ROUGE)).move_to(P(0, Y2))
        au_fil(self, [("Puis 3", [l2], [LaggedStart(*[self.remplir_quart(c2, i) for i in range(3)],
                                                     lag_ratio=0.35)])], run_time=0.9)
        f = EcritureFraction(7, 4, fs=46, couleur=ROUGE)
        l3 = VGroup(f, self.inline("= 1 cœur", 28), self.inline("et 3 quarts", 28)).arrange(RIGHT, buff=0.2)
        l3[1].set_y(f.trait.get_y())
        l3[2].set_y(f.trait.get_y())
        self.borne(l3, 0.5).move_to(P(0, Y3 - 0.05))
        au_fil(self, [("7 quarts, c'est", [f], []), ("c'est 1 cœur", [l3[1]], []), ("cœur et 3", [l3[2]], [])])
        pq = self.borne(self.t("plus que 1 !", 36, JAUNE_TITRE)).move_to(P(0, -0.25))  # entre « 7/4 = … » et les cœurs, collé à aucun
        au_fil(self, [("plus que 1", [pq], [])])
        self.insister(pq, 1.2)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        def apres(sc):
            ph = sc.ph_q
            lg = ligne_calc(sc, [("7", VERT_OK), ("+", VERT_OK), ("2", VERT_OK), ("=", VERT_OK), ("9 quarts", VERT_OK)],
                            centre=ph[0].get_center(), fs=26)
            lg.arrange(RIGHT, buff=0.12).move_to(ph[0])
            l2 = ligne_calc(sc, [("2 cœurs", VERT_OK), ("et 1 quart !", VERT_OK)], centre=ph[1].get_center(),
                            fs=26)
            l2.arrange(RIGHT, buff=0.15).move_to(ph[1])
            au_fil(sc, [("7 plus", [lg[0]], []), ("7 plus 2", [lg[1], lg[2]], []), ("égale 9", [lg[3], lg[4]], []),
                        ("quarts : 2", [l2[0]], []), ("et 1 quart", [l2[1]], [])])
            ph.submobjects = []

        self.question_pause("02-question", "02b-reponse", ["Potion : 2 quarts de plus.", "Combien de quarts ?"],
                            [self.inline("9", 30), self.inline("5", 30), self.inline("2", 30)], 0,
                            ["7 + 2 = 9 quarts", "2 cœurs et 1 quart !"], autres_r=apres)
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        cs = VGroup(*[coeur(0.55) for _ in range(3)]).arrange(RIGHT, buff=0.15).move_to(P(0, YH))
        f = EcritureFraction(11, 4, fs=50, couleur=ROUGE)
        e = VGroup(f, self.inline("de cœur :", 32)).arrange(RIGHT, buff=0.2)
        e[1].set_y(f.trait.get_y())
        e.move_to(P(0, Y1 - 0.3))
        e2 = self.borne(self.inline("combien de cœurs pleins ?", 30)).move_to(P(0, Y2 - 0.5))
        au_fil(self, [("À toi : 11", [e], [FadeIn(cs)]), ("combien de cœurs pleins", [e2], [])])
        self.appel_commentaire(y=0.05)
