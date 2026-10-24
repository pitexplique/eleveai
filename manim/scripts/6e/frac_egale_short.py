# frac_egale_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 03 « Fractions égales,
# simplifier » (micro fraction_egale). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : on VOIT la notion, aucun calcul à poser.
# Il AMUSE : « Qui a mangé le plus ? » Malik, PIZZAÏOLO, sert trois pizzas de
# la même taille :
#   · EN HAUT, l'image qui bouge : chaque pizza se coupe (4, 8, 12 parts) et
#     les parts mangées deviennent ORANGE puis s'envolent ;
#   · EN BAS, au même instant, la barre de chaque ami se colorie en ORANGE
#     (même code couleur : orange = mangé), part pour part ;
#   · surprise : les trois barres s'arrêtent AU MÊME ENDROIT : 2/4 = 4/8 =
#     6/12 = 1/2 ;
#   · 1 question-pause (3 s) : laquelle n'est pas égale à 1/2 ? (4/6) ;
#   · fin : « 15 vingtièmes, c'est combien de quarts ? » en commentaire (3).
# Centres d'intérêt : cuisine, jeux-defis.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/6e-frac-egale-short.json (débit −10) ; marques :
# manim/scripts/6e/frac_egale_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/frac_egale_short.py FracEgaleShort6e -o eleveai-maths-6e-frac-egale-short --media_dir manim/scripts/6e/media-frac-egale-short
# Sortie : manim/sorties/6e/maths/fractions/03-egale/eleveai-maths-6e-frac-egale-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F403

FROMAGE, CROUTE, TOMATE, COUPE = "#fcd34d", "#c2410c", "#dc2626", "#7c2d12"
# les pepperonis : (rayon relatif, angle) fixes, pour que la pizza ne « saute » pas quand on la coupe
PEPPE = [(0.55, 0.35), (0.6, 1.4), (0.35, 2.3), (0.62, 3.0), (0.5, 4.0), (0.62, 4.9), (0.3, 5.6), (0.68, 5.95),
         (0.15, 1.0)]
XS = [-1.42, 0.0, 1.42]      # les trois pizzas
Y_PIZ = 1.62
R_PIZ = 0.55
YS_B = [0.2, -0.85, -1.9]     # les trois barres (la moitié tombe en x = 0)
NOMS = ["Léo", "Inès", "Zoé"]
PARTS = [4, 8, 12]


def pizza(n, r=R_PIZ, centre=ORIGIN):
    """Une pizza en n parts (n = 1 : entière). .parts[i] = VGroup(fromage,
    pepperonis de la part) ; .coupes : les traits de coupe ; .bord : la croûte."""
    a = TAU / n
    g = VGroup()
    g.parts = VGroup()
    for i in range(n):
        dep = PI / 2 - i * a
        s = AnnularSector(inner_radius=0, outer_radius=r, angle=-a, start_angle=dep, fill_color=FROMAGE,
                          fill_opacity=1, stroke_width=0)
        dots = VGroup()
        for (k, ang) in PEPPE:
            # l'angle compté depuis le haut, dans le sens des aiguilles d'une montre
            if n == 1 or i * a <= ang < (i + 1) * a:
                t = PI / 2 - ang
                dots.add(Dot(r * k * np.array([np.cos(t), np.sin(t), 0]), radius=r * 0.12, color=TOMATE))
        g.parts.add(VGroup(s, dots))
    g.coupes = VGroup(*[Line(ORIGIN, r * np.array([np.cos(PI / 2 - j * a), np.sin(PI / 2 - j * a), 0]),
                             color=COUPE, stroke_width=4) for j in range(n)]) if n > 1 else VGroup()
    g.bord = Circle(radius=r, stroke_color=CROUTE, stroke_width=7)
    g.add(g.parts, g.bord)
    g.move_to(centre)
    g.coupes.shift(g.bord.get_center())  # les coupes (hors du groupe : tracées au mot) suivent la pizza
    return g


class FracEgaleShort6e(ShortFrac):
    nom_voix = "6e-frac-egale-short"
    fichier_marques = "frac_egale_short_marques.json"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """Les cartes SOUS la question (jamais par-dessus), la consigne dessous."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.22).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.15).set_x(0)
        ph.next_to(cartes, DOWN, buff=0.15).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def barre(self, i):
        return Barre(PARTS[i], 0, largeur=3.8, hauteur=0.36, couleur=ORANGE_PART, marge=0.1, sw=2,
                     centre=P(0, YS_B[i]))

    def ami(self, cle, i, pizzas, barres, labels):
        """Un ami : sa pizza se coupe en n et sa barre se partage en même temps ;
        il mange la moitié (orange en haut ET en bas, au même instant)."""
        n = PARTS[i]
        self.dire(cle)
        b = self.barre(i)
        nom = self.t(NOMS[i] + " :", 26, BLEU_CALCUL).next_to(b, UP, buff=0.06).align_to(b, LEFT).shift(RIGHT * 0.05)
        self.au_mot(NOMS[i])
        self.play(Indicate(pizzas[i], color=WHITE, scale_factor=1.12), FadeIn(nom, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot(f"en {n} parts")
        neuve = pizza(n, centre=pizzas[i].get_center())
        self.remove(pizzas[i])
        self.add(neuve)
        pizzas[i] = neuve
        barres[i] = b
        self.play(LaggedStart(*[Create(c) for c in neuve.coupes], lag_ratio=0.15), b.apparaitre(0.9), run_time=0.9)
        self.au_mot(f"mange {n // 2}")
        lab = self.inline(f"{n // 2}/{n}", 28, ORANGE_PART).next_to(nom, RIGHT, buff=0.15)
        labels.append(lab)
        mangees = [neuve.parts[k] for k in range(n // 2)]
        self.play(*[m[0].animate.set_fill(ORANGE_PART) for m in mangees], b.colorier(range(n // 2), lag=0.1),
                  FadeIn(lab, scale=1.3), run_time=0.8)
        self.play(*[m.animate.shift(UP * 0.3).set_opacity(0) for m in mangees], run_time=0.6)
        self.attendre_voix(marge=0.2)
        return nom

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Qui a mangé le plus ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        pizzas = [pizza(1, centre=P(x, Y_PIZ)) for x in XS]
        barres, labels = [None] * 3, []

        # ── 00 : trois pizzas ──
        self.dire("00-accroche")
        self.au_mot("Malik, pizzaïolo")
        m = self.t("Malik, pizzaïolo", 34, BLEU_CALCUL).move_to(P(0, -0.6))
        self.play(FadeIn(m, scale=0.8), run_time=0.4)
        self.au_mot("trois pizzas")
        self.play(LaggedStart(*[GrowFromCenter(p) for p in pizzas], lag_ratio=0.25), run_time=0.9)
        self.au_mot("de la même taille")
        tailles = VGroup(*[DashedVMobject(Circle(radius=R_PIZ + 0.06, color=AMBRE, stroke_width=3), num_dashes=20)
                           .move_to(p) for p in pizzas])
        self.play(Create(tailles), run_time=0.6)
        self.au_mot("Qui en a mangé le plus")
        self.play(FadeOut(m), FadeOut(tailles), Write(titre), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 à 03 : Léo, Inès, Zoé ──
        for i, cle in enumerate(["01-leo", "02-ines", "03-zoe"]):
            self.ami(cle, i, pizzas, barres, labels)

        # ── 04 : la surprise ──
        self.dire("04-surprise")
        self.au_mot("au même endroit")
        h = barres[0].contour.get_top()[1] + 0.12
        tir = DashedLine(P(0, h), P(0, barres[2].contour.get_bottom()[1] - 0.12), color=AMBRE, stroke_width=6,
                         dash_length=0.12)
        self.play(Create(tir), run_time=0.8)
        self.play(*[Flash(P(0, b.contour.get_y()), color=AMBRE, line_length=0.15, flash_radius=0.3) for b in barres],
                  run_time=0.6)
        for lab, mot in zip(labels, ["2 quarts", "4 huitièmes", "6 douzièmes"]):
            self.au_mot(mot)
            self.play(Indicate(lab, color=AMBRE, scale_factor=1.4), run_time=0.4)
        self.au_mot("1 demi")
        d = self.ligne([("toujours", WHITE), ("1/2", VERT_OK), ("!", WHITE)], 36).move_to(P(0, -2.62))
        d[1].sans_synchro = True
        self.play(FadeIn(d, scale=1.3), run_time=0.4)
        self.insister(d[1], 1.4)
        self.attendre_voix(marge=0.5)
        self.vider(garder)

        # ── 05 : la question-pause (3 s) ──
        self.question_pause("05-question", "05b-reponse", ["Laquelle n'est pas", "égale à 1/2 ?"],
                            [self.inline("3/6", 30), self.inline("4/6", 30), self.inline("5/10", 30)], 1,
                            ["La moitié de 6, c'est 3,", "pas 4."], mot_q="Laquelle")
        self.vider(garder)

        # ── 06 : la question en commentaire ──
        self.dire("06-question")
        self.au_mot("15 vingtièmes")
        f = EcritureFraction(15, 20, fs=60)
        g = EcritureFraction("…", 4, fs=60)
        eg = egalite(f, g, buff=0.4).move_to(P(0, 1.4))
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        gr = Grille(4, 5, 15, cote=0.42, couleur=ORANGE_PART, centre=P(0, -0.65))
        self.play(gr.apparaitre(1.0))
        self.au_mot("combien de quarts")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g.num, 1.5)
        self.appel_commentaire(y=-2.3)
