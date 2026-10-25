# frac_rationnel_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 04 « Les nombres rationnels »
# (micro fraction_rationnel). CEINTURE JAUNE : on voit la roue tourner, mais le
# short lit aussi des écritures décimales (un cran au-dessus du short « on voit »).
# Il AMUSE : « La roue magique de 1/7 ». Lina, MAGICIENNE DES NOMBRES :
#   · EN HAUT, la roue : les 6 chiffres 1 4 2 8 5 7 sur un cercle, une
#     aiguille qui tourne d'un chiffre à l'autre ;
#   · EN BAS, au même instant, l'écriture décimale de 1/7 s'allonge chiffre par
#     chiffre (même couleur que la case allumée de la roue) ;
#   · surprise : 2/7 = 0,285714… et 3/7 = 0,428571… : les MÊMES chiffres, qui
#     partent d'un autre endroit de la roue ;
#   · 1 question-pause (3 s) : 1/3 = 0,333… sans fin (leurres 0,3 et 1,3) ;
#   · fin : « le 7e chiffre après la virgule de 1/7 ? » en commentaire (1).
# Un rationnel n'est pas toujours décimal : son écriture décimale se RÉPÈTE.
# Centres d'intérêt : jeux-defis. Vérifié (Python) : 1/7, 2/7, 3/7.
#
# Voix : manim/voix/4e-frac-rationnel-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_rationnel_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_rationnel_short.py FracRationnelShort4e -o eleveai-maths-4e-frac-rationnel-short --media_dir manim/scripts/4e/media-frac-rationnel-short
# Sortie : manim/sorties/4e/maths/fractions/04-rationnel/eleveai-maths-4e-frac-rationnel-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotd_commun import *  # noqa: E402,F403

CHIFFRES = "142857"
COUL = [BLEU_PART, VERT_PART, ORANGE_PART, VIOLET_PART, "#f472b6", "#facc15"]
C_ROUE = P(0, 1.0)
R_ROUE = 1.05


def roue():
    """La roue : 6 cases en couronne, un chiffre dans chacune, une aiguille."""
    g = VGroup()
    g.cases, g.txt = VGroup(), VGroup()
    for i, ch in enumerate(CHIFFRES):
        a0 = PI / 2 - i * TAU / 6 + TAU / 12
        s = AnnularSector(inner_radius=R_ROUE * 0.45, outer_radius=R_ROUE, angle=-TAU / 6, start_angle=a0,
                          fill_color=COUL[i], fill_opacity=0.35, stroke_color=WHITE, stroke_width=2).shift(C_ROUE)
        am = PI / 2 - i * TAU / 6
        t = Text(ch, font_size=40, color=WHITE, weight=BOLD).move_to(C_ROUE + R_ROUE * 0.73 * np.array([np.cos(am), np.sin(am), 0]))
        t.sans_synchro = True
        t.set_z_index(3)  # toujours au-dessus de la case allumée
        g.cases.add(s)
        g.txt.add(t)
    g.aiguille = Arrow(C_ROUE, C_ROUE + UP * R_ROUE * 0.42, buff=0, color=AMBRE, stroke_width=6,
                       max_tip_length_to_length_ratio=0.35).set_z_index(4)
    g.add(g.cases, g.txt, Dot(C_ROUE, radius=0.07, color=AMBRE), g.aiguille)
    g.pos = 0
    return g


def tourner(r, vers, run_time=0.4):
    """L'aiguille va sur la case `vers` (dans le sens des aiguilles d'une montre)."""
    pas = (vers - r.pos) % 6
    r.pos = vers
    return AnimationGroup(Rotate(r.aiguille, -pas * TAU / 6, about_point=C_ROUE),
                          r.cases[vers].animate.set_fill(opacity=1), run_time=run_time)


class FracRationnelShort4e(ShortLotD):
    nom_voix = "4e-frac-rationnel-short"
    fichier_marques = "frac_rationnel_short_marques.json"
    ceinture = "jaune"

    def ecriture(self, debut, y, fs=36):
        """« a/7 = 0, » puis des cases vides où viendront les chiffres."""
        f = EcritureFraction(debut, 7, fs=40)
        tete = self.t("= 0,", fs)
        lg = VGroup(f, tete).arrange(RIGHT, buff=0.15)
        tete.set_y(f.trait.get_y())
        lg.move_to(P(-1.35, y))
        sans_synchro(lg)
        return lg, tete

    def chiffre(self, ch, ref, fs=36, c=WHITE):
        t = Text(ch, font_size=fs, color=c, weight=BOLD)
        t.sans_synchro = True
        return t.next_to(ref, RIGHT, buff=0.05).align_to(ref, DOWN)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La roue magique", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        r = roue()

        # ── 00 : Lina ──
        self.dire("00-accroche")
        self.au_mot("Lina")
        li = self.bloc(["Lina,", "magicienne des nombres"], 30, BLEU_CALCUL).move_to(P(0, -1.0))
        self.play(FadeIn(li, scale=0.8), run_time=0.4)
        self.au_mot("1 divisé par 7")
        c = self.t("1 ÷ 7", 46, AMBRE).move_to(P(0, -2.0))
        self.play(FadeIn(c, scale=1.3), run_time=0.4)
        self.au_mot("tourner en rond")
        self.play(FadeIn(VGroup(r.cases, r[2], r.aiguille), scale=0.6), Write(titre), FadeOut(li), run_time=0.8)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(c), run_time=0.3)

        # ── 01 : la roue ──
        self.dire("01-roue")
        lg, tete = self.ecriture(1, -0.8)
        self.au_mot("1 septième")
        self.play(FadeIn(lg[0], scale=1.2), run_time=0.4)
        self.au_mot("égale 0")
        self.play(FadeIn(tete), run_time=0.3)
        self.au_nb("0,142857")
        ref = tete
        prems = VGroup()
        for i, ch in enumerate(CHIFFRES):
            t = self.chiffre(ch, ref, c=COUL[i])
            self.play(tourner(r, i, 0.12), FadeIn(t), FadeIn(r.txt[i]), run_time=0.12)
            prems.add(t)
            ref = t
        mots = ["encore 1", "4, 2", "2, 8", "8, 5", "5, 7", "7. Les"]
        ligne2 = VGroup()
        for i, ch in enumerate(CHIFFRES):
            self.au_nb(mots[i], cible=ch)
            t = self.chiffre(ch, ref, c=COUL[i])
            if i == 0:  # le 2e tour, sous le 1er : les mêmes chiffres, en colonne
                t.next_to(prems[0], DOWN, buff=0.3).align_to(prems[0], LEFT)
            self.play(r.cases.animate.set_fill(opacity=0.35), run_time=0.01)
            self.play(tourner(r, i, 0.3), FadeIn(t, scale=1.4), run_time=0.3)
            ligne2.add(t)
            ref = t
        self.au_mot("sans fin")
        pts = self.t("…", 40).next_to(ref, RIGHT, buff=0.08).align_to(ref, DOWN)
        self.play(FadeIn(pts), Rotate(r.aiguille, -TAU, about_point=C_ROUE), run_time=1.2)
        self.attendre_voix(marge=0.2)
        self.vider(garder + [r, *r.txt, r.cases, r[2], r.aiguille])

        # ── 02 : 2/7 et 3/7 ──
        self.dire("02-surprise")
        self.play(r.cases.animate.set_fill(opacity=0.35), run_time=0.2)
        for k, (n, dec, depart, y, mot, mot_d) in enumerate(((2, "285714", 2, -0.9, "Et 2 septièmes", "0,285714"),
                                                              (3, "428571", 1, -2.0, "Et 3 septièmes", "0,428571"))):
            lg, tete = self.ecriture(n, y)
            self.au_mot(mot)
            self.play(FadeIn(lg[0], scale=1.2), run_time=0.4)
            self.au_nb(mot_d, cible="0")
            self.play(FadeIn(tete), run_time=0.2)
            ref = tete
            for j, ch in enumerate(dec):
                i = CHIFFRES.index(ch)
                t = self.chiffre(ch, ref, c=COUL[i])
                self.play(r.cases.animate.set_fill(opacity=0.35), run_time=0.01)
                self.play(tourner(r, i, 0.15), FadeIn(t, scale=1.3), run_time=0.15)
                ref = t
            pts = self.t("…", 40).next_to(ref, RIGHT, buff=0.08).align_to(ref, DOWN)
            self.play(FadeIn(pts), run_time=0.2)
            if k == 0:
                self.au_mot("partent d'ailleurs")
                self.play(Indicate(r.cases[2], color=AMBRE, scale_factor=1.15), run_time=0.6)
        self.au_mot("Magique")
        m = self.t("Magique !", 40, AMBRE).move_to(P(0, -2.75))
        self.play(FadeIn(m, scale=1.4), Rotate(r.aiguille, -TAU, about_point=C_ROUE), run_time=1.0)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["1/3 en nombre décimal ?"],
                            [self.inline("0,3", 30), self.inline("0,333… sans fin", 30), self.inline("1,3", 30)], 1,
                            ["Il reste toujours 1 :", "les 3 ne s'arrêtent jamais."], mot_q="1 tiers")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        r = roue()
        self.add(r)
        self.au_nb("dans 1 septième")
        lg, tete = self.ecriture(1, -0.8)
        ref = tete
        chs = VGroup()
        for ch in CHIFFRES:
            t = self.chiffre(ch, ref)
            chs.add(t)
            ref = t
        q = self.t("?", 40, ORANGE_TROU)
        q.sans_synchro = True
        q.next_to(chs[0], DOWN, buff=0.3).align_to(chs[0], LEFT)
        self.play(FadeIn(lg), FadeIn(chs), run_time=0.5)
        self.au_nb("le 7e chiffre", cible="7")
        rang = self.t("7e chiffre", 30, ORANGE_TROU).next_to(q, RIGHT, buff=0.3)
        self.play(FadeIn(q, scale=1.5), FadeIn(rang), run_time=0.4)
        self.insister(q, 1.5)
        self.appel_commentaire(y=-2.4)
