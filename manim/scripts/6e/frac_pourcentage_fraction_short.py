# frac_pourcentage_fraction_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 12 « Pourcentages et
# fractions » (micro pourcentage_fraction). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : on VOIT la notion, aucun calcul posé.
# Il AMUSE : « Qui tire le mieux ? » Awa, ENTRAÎNEUSE DE BASKET, compare trois
# joueurs aux lancers francs :
#   · EN HAUT, l'image qui bouge : le panier ; chaque ballon part, entre (ou
#     rebondit sur le cercle) ;
#   · EN BAS, au même instant, la barre du joueur se colorie en ORANGE (la
#     couleur du ballon) à chaque panier : 3/4, 7/10, 18/25 ;
#   · le geste : chaque barre est coupée en 100 (même longueur orange) → 75 %,
#     70 %, 72 % ; surprise : Sacha marque le plus, mais Noa tire le mieux ;
#   · 1 question-pause (3 s) : 1 sur 2 = ? % (leurre 12 %, l'erreur « 1,2 ») ;
#   · fin : « 4 lancers réussis sur 5, combien de pour cent ? » (80).
# Centres d'intérêt : sport, jeux-defis. Aucune donnée réelle citée.
#
# Voix : manim/voix/6e-frac-pourcentage-fraction-short.json (débit −10) ;
# marques : manim/scripts/6e/frac_pourcentage_fraction_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/frac_pourcentage_fraction_short.py FracPourcentageFractionShort6e -o eleveai-maths-6e-frac-pourcentage-fraction-short --media_dir manim/scripts/6e/media-frac-pourcentage-fraction-short
# Sortie : manim/sorties/6e/maths/fractions/12-pourcentage-fraction/eleveai-maths-6e-frac-pourcentage-fraction-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotc_commun import *  # noqa: E402,F403

BALLON = "#f97316"
RIM = P(0, 1.18)           # le centre du cercle du panier
DEPART = P(-1.75, 0.75)    # d'où part le ballon
YS = [0.15, -0.85, -1.85]  # les trois barres
JOUEURS = [("Noa", 4, [1, 1, 0, 1]), ("Lina", 10, [1, 1, 0, 1, 1, 0, 1, 1, 0, 1]),
           ("Sacha", 25, [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0])]
PCT = [75, 70, 72]


def panier():
    """Le panneau, le cercle orange et le filet."""
    panneau = RoundedRectangle(width=1.5, height=0.95, corner_radius=0.06, stroke_color=WHITE, stroke_width=4,
                               fill_color="#1e293b", fill_opacity=1).move_to(RIM + UP * 0.5)
    carre = Rectangle(width=0.55, height=0.38, stroke_color=WHITE, stroke_width=3).move_to(RIM + UP * 0.32)
    cercle = Ellipse(width=0.62, height=0.16, stroke_color="#ea580c", stroke_width=6).move_to(RIM)
    filet = VGroup(*[Line(RIM + P(x, 0), RIM + P(x * 0.6, -0.42), stroke_color="#e5e7eb", stroke_width=2)
                     for x in (-0.3, -0.15, 0, 0.15, 0.3)])
    return VGroup(panneau, carre, filet, cercle)


def ballon(r=0.12):
    b = Circle(radius=r, fill_color=BALLON, fill_opacity=1, stroke_color="#7c2d12", stroke_width=2)
    return VGroup(b, Line(b.get_left(), b.get_right(), stroke_color="#7c2d12", stroke_width=2),
                  Line(b.get_top(), b.get_bottom(), stroke_color="#7c2d12", stroke_width=2)).move_to(DEPART)


def tir(dedans, run_time=0.6):
    """Un lancer : le ballon monte en arc ; dedans → il traverse le filet,
    sinon il touche le cercle et ressort à droite. Renvoie (ballon, animation)."""
    b = ballon()
    if dedans:
        arc = ArcBetweenPoints(DEPART, RIM + UP * 0.1, angle=-PI / 2.2)
        fin = Line(RIM + UP * 0.1, RIM + DOWN * 0.5)
    else:
        arc = ArcBetweenPoints(DEPART, RIM + P(0.33, 0.12), angle=-PI / 2.2)
        fin = ArcBetweenPoints(RIM + P(0.33, 0.12), P(1.75, 0.7), angle=-PI / 2)
    anim = Succession(MoveAlongPath(b, arc, run_time=run_time * 0.65, rate_func=linear),
                      MoveAlongPath(b, fin, run_time=run_time * 0.35, rate_func=linear),
                      FadeOut(b, run_time=0.01))
    return b, anim


class FracPourcentageFractionShort6e(ShortLotC):
    nom_voix = "6e-frac-pourcentage-fraction-short"
    fichier_marques = "frac_pourcentage_fraction_short_marques.json"
    ceinture = "blanche"

    def barre(self, i):
        return Barre(JOUEURS[i][1], 0, largeur=3.7, hauteur=0.36, couleur=ORANGE_PART, marge=0.1, sw=2,
                     centre=P(0, YS[i]))

    def joueur(self, cle, i, barres, noms, attendre=True):
        nom, n, tirs = JOUEURS[i]
        self.dire(cle)
        b = self.barre(i)
        k = sum(tirs)
        etiq = self.ligne([(nom + " :", BLEU_CALCUL)], 26).next_to(b, UP, buff=0.07).align_to(b, LEFT)
        etiq.shift(RIGHT * 0.05)
        frac = self.inline(f"{k}/{n}", 28, ORANGE_PART).next_to(etiq, RIGHT, buff=0.15)
        dt = {4: 0.5, 10: 0.26, 25: 0.11}[n]
        anims, c = [], 0
        for ok in tirs:
            bal, a = tir(ok, run_time=0.6)
            if ok:
                a = AnimationGroup(a, Succession(Wait(0.4), b.parts[c].animate(run_time=0.2).set_fill(ORANGE_PART, 1)))
                c += 1
            anims.append(a)
        b.colories = list(range(k))
        b.k = k
        self.au_mot(nom)
        d = self.t_mot(f"sur {n}")
        self.play(FadeIn(etiq, shift=RIGHT * 0.1, run_time=0.4), b.apparaitre(0.4),
                  Succession(Wait(d), FadeIn(frac, scale=1.3, run_time=0.3)),
                  Succession(Wait(0.3), LaggedStart(*anims, lag_ratio=dt / 0.6, run_time=0.6 + dt * (n - 1))))
        barres[i], noms[i] = b, VGroup(etiq, frac)
        if attendre:
            self.attendre_voix(marge=0.15)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Qui tire le mieux ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        pan = panier()
        barres, noms = [None] * 3, [None] * 3

        # ── 00 : Awa et le panier ──
        self.dire("00-accroche")
        self.au_mot("Awa")
        a = self.bloc(["Awa,", "entraîneuse de basket"], 32, BLEU_CALCUL).move_to(P(0, -0.6))
        self.play(FadeIn(a, scale=0.8), FadeIn(pan, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("lancers francs")
        bal, anim = tir(True, 0.8)
        self.play(anim)
        self.au_mot("Qui tire le mieux")
        self.play(FadeOut(a), Write(titre), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 à 03 : Noa, Lina, Sacha ──
        for i, cle in enumerate(["01-noa", "02-lina", "03-sacha"]):
            self.joueur(cle, i, barres, noms, attendre=i < 2)
            if i == 2:
                self.au_mot("le plus")
                p = self.t("le plus de paniers !", 28, AMBRE).next_to(barres[2], DOWN, buff=0.2)
                self.play(FadeIn(p, scale=0.8), Indicate(noms[2], color=AMBRE), run_time=0.5)
                self.attendre_voix(marge=0.2)
                self.play(FadeOut(p), run_time=0.3)

        # ── 04 : chaque barre coupée en 100 ──
        self.dire("04-cent")
        self.au_mot("pas tiré le même nombre")
        self.play(*[Indicate(b.parts[b.n - 1], color=WHITE) for b in barres], run_time=0.6)
        self.au_mot("on coupe chaque barre en 100")
        anims = []
        for i, b in enumerate(barres):
            nb, an = b.repartager(100 // b.n, run_time=1.4)
            barres[i] = nb
            anims.append(an)
        self.play(*anims)
        self.play(*[b.traits.animate.set_stroke(opacity=0.3) for b in barres], run_time=0.3)
        self.au_mot("sur 100")
        cent = self.t("100 parts", 26, AMBRE).next_to(barres[2], DOWN, buff=0.12).align_to(barres[2], RIGHT)
        self.play(FadeIn(cent, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(cent), run_time=0.3)

        # ── 05 : 75 %, 70 %, 72 % ──
        self.dire("05-pourcents")
        pcs = []
        for i, mot in enumerate(["75 %", "70 %", "72 %"]):
            self.au_mot(mot)
            t = self.t(f"= {mot}", 26, VERT_OK).next_to(noms[i], RIGHT, buff=0.15)
            pcs.append(t)
            self.play(FadeIn(t, scale=1.3), Indicate(barres[i].parts[PCT[i] - 1], color=WHITE), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 06 : la surprise ──
        self.dire("06-surprise")
        self.au_mot("le meilleur tireur")
        tirets = VGroup(*[b.fin_coloriee(vers=-0.12).set_stroke(width=4) for b in barres])
        self.play(Create(tirets), run_time=0.6)
        self.au_mot("Noa")
        self.play(Circumscribe(VGroup(noms[0], pcs[0]), color=AMBRE), run_time=0.6)
        self.au_mot("75 %")
        self.insister(pcs[0], 1.2)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 07 : la question-pause (3 s) ──
        self.question_pause("07-question", "07b-reponse", ["1 sur 2, c'est", "combien de pour cent ?"],
                            [self.inline("12 %", 30), self.inline("2 %", 30), self.inline("50 %", 30)], 2,
                            ["La moitié :", "50 sur 100."], mot_q="1 sur 2")
        self.vider(garder)

        # ── 08 : la question en commentaire ──
        self.dire("08-question")
        self.au_mot("4 lancers")
        b = Barre(5, 0, largeur=3.6, hauteur=0.45, couleur=ORANGE_PART, marge=0.12, centre=P(0, -0.45))
        f = self.inline("4/5 = ? %", 44, ORANGE_PART).move_to(P(0, 0.35))
        self.play(b.apparaitre(0.5), run_time=0.5)
        self.play(b.colorier(range(4), lag=0.2), run_time=0.7)
        self.au_mot("sur 5")
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("combien de pour cent")
        self.insister(f, 1.3)
        self.appel_commentaire(y=-1.55)
