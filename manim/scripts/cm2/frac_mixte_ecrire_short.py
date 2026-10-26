# frac_mixte_ecrire_short.py
# EleveAI — Maths CM2 — short jumeau de l'épisode 10 « L'écriture mixte »
# (micro fraction_mixte_ecrire). CEINTURE BLANCHE (règle du short blanc) : on
# VOIT les quarts de pizza se ranger en pizzas entières, aucun calcul posé.
# Il AMUSE : « Une fraction plus grande qu'une pizza ? ». Marco, PIZZAÏOLO :
#   · EN HAUT : Marco, puis ce qu'on lit (9/4 de pizza ; 9/4 = 2 + 1/4) ;
#   · EN BAS, au même instant : 3 pizzas (le disque du coach en 4 parts) ;
#     chaque quart se colorie quand la voix le compte ;
#   · 1 question-pause (3 s) : 8 quarts = 2 pizzas (leurres 8 : le numérateur ;
#     4 : le dénominateur) ;
#   · commentaire : « 11 quarts de pizza : combien de pizzas entières ? » (2).
# Vérifié (Python) : 9 = 2 × 4 + 1 ; 8 = 2 × 4 ; 11 = 2 × 4 + 3.
# Aucune donnée réelle citée. Centres : cuisine, jeux-defis.
#
# Voix : manim/voix/cm2-frac-mixte-ecrire-short.json (débit −10) ; marques :
# manim/scripts/cm2/frac_mixte_ecrire_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm2/frac_mixte_ecrire_short.py FracMixteEcrireShortCM2
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm2/frac_mixte_ecrire_short.py FracMixteEcrireShortCM2 -o eleveai-maths-cm2-frac-mixte-ecrire-short --media_dir manim/scripts/cm2/media-frac-mixte-ecrire-short
# Sortie : manim/sorties/cm2/maths/fractions/10-mixte-ecrire/eleveai-maths-cm2-frac-mixte-ecrire-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cmk_commun import *  # noqa: E402,F403

YP = -1.25                      # le centre des pizzas
Y1, Y2, Y3 = 1.95, 1.4, 0.85    # les trois lignes de la bande du haut
PATE = "#fbbf24"                # une part servie (couleur pizza)
XS = (-1.35, 0.0, 1.35)


def toque(p):
    c = p.tete.get_center()
    r = p.tete.width / 2
    bande = Rectangle(width=r * 1.7, height=r * 0.35, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    bande.move_to(c + UP * r * 0.95)
    haut = VGroup(*[Circle(radius=r * 0.45, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                    .move_to(c + UP * r * 1.45 + RIGHT * x * r) for x in (-0.45, 0, 0.45)])
    return VGroup(haut, bande)


def pizzaiolo(s=0.45):
    return metier("#e0ac69", "#dc2626", "#1f2937", s=s, accessoires=(toque,))


def pizza(x, rayon=0.52):
    d = Disque(4, 0, rayon=rayon, couleur=PATE, marge=0.12, centre=P(x, YP))
    return d


def num_part(d, i, txt):
    a = PI / 2 - (i + 0.5) * TAU / 4
    t = Text(str(txt), font_size=24, color=NUIT, weight=BOLD)
    t.move_to(d.centre_disque() + 0.55 * d.cercle.width / 2 * np.array([np.cos(a), np.sin(a), 0]))
    return pas_audit(t)


class FracMixteEcrireShortCM2(ShortCM2):
    nom_voix = "cm2-frac-mixte-ecrire-short"
    fichier_marques = "frac_mixte_ecrire_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Plus qu'une pizza ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Marco et ses pizzas en quarts ──
        self.dire("00-accroche")
        self.au_mot("Une fraction")
        self.play(Write(titre), run_time=0.6)
        mar = pizzaiolo(0.45).move_to(P(-1.3, Y2))
        nm = self.bloc(["Marco,", "pizzaïolo"], 26, BLEU_CALCUL).next_to(mar, RIGHT, buff=0.25)
        au_fil(self, [("Marco", [mar, nm], [])])
        ps = [pizza(x) for x in XS]
        au_fil(self, [("chaque pizza en 4", [], [ps[0].apparaitre(0.6)]),
                      ("des quarts", [], [LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.08)
                                                        for p in ps[0].parts], lag_ratio=0.2, run_time=0.7)])])
        self.attendre_voix(marge=0.2)

        # ── 01 : compter 9 quarts ──
        self.dire("01-compter")
        self.play(FadeOut(mar), FadeOut(nm), FadeIn(ps[1]), FadeIn(ps[2]), run_time=0.3)
        f = EcritureFraction(9, 4, fs=50)
        l1 = VGroup(f, self.inline("de pizza !", 32)).arrange(RIGHT, buff=0.25).move_to(P(0, Y2))
        l1[1].set_y(f.trait.get_y())
        au_fil(self, [("il sert 9", [l1], [])])
        mots = ["! 1", "1, 2", "2, 3", "3, 4", "entière. 5", "5, 6", "6, 7", "7, 8", "Et 9"]
        for k, mot in enumerate(mots):
            d, i = ps[k // 4], k % 4
            au_fil(self, [(mot, [num_part(d, i, k + 1)], [d.parts[i].animate.set_fill(PATE, 1)])], run_time=0.2)
            if k == 3:
                e1 = self.inline("1 pizza", 22, VERT_OK).next_to(ps[0], DOWN, buff=0.15)
                au_fil(self, [("1 pizza entière", [e1], [Flash(ps[0], color=VERT_OK, line_length=0.2,
                                                                flash_radius=0.8)])])
            if k == 7:
                e2 = self.inline("2 pizzas", 22, VERT_OK).next_to(ps[1], DOWN, buff=0.15)
                au_fil(self, [("8 : 2 pizzas", [e2], [Flash(ps[1], color=VERT_OK, line_length=0.2,
                                                             flash_radius=0.8)])])
        e3 = self.inline("+ 1 quart", 22, AMBRE).next_to(ps[2], DOWN, buff=0.5)
        au_fil(self, [("1 quart de plus", [e3], [])])
        self.attendre_voix(marge=0.2)

        # ── 02 : la surprise ──
        self.dire("02-surprise")
        e = frac_ligne([(9, 4), "=", ["2", VERT_OK], "+", (1, 4, AMBRE)], fs=50).move_to(P(0, Y3 + 0.1))
        au_fil(self, [("Surprise : 9", [e[0]], [FadeOut(l1)]), ("c'est 2", [e[1], e[2]], []),
                      ("et 1 quart", [e[3], e[4]], [])])
        self.insister(e, 1.2)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["8 quarts de pizza :", "combien de pizzas ?"],
                            [self.inline("8", 30), self.inline("2", 30), self.inline("4", 30)], 1,
                            ["4 quarts = 1 pizza :", "8 quarts = 2 pizzas"], mot_q="8 quarts")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        ps = [pizza(x) for x in XS]
        q = self.borne(self.t("11 quarts = ? pizzas", 30), 0.6).move_to(P(0, Y1))
        au_fil(self, [("À toi : 11", [q], [*[FadeIn(p) for p in ps]])])
        self.play(LaggedStart(*[p.parts.animate.set_fill(PATE, 1) for p in ps[:2]],
                              *[ps[2].parts[i].animate.set_fill(PATE, 1) for i in range(3)], lag_ratio=0.15),
                  run_time=1.0)
        self.appel_commentaire(y=Y2 - 0.1)
