# equation_resoudre_reduction_short.py
# EleveAI — Maths 4e — série ÉQUATIONS, épisode 04, le SHORT ceinture BLANCHE
# « Les paquets de cartes » : EN HAUT les paquets qui se regroupent ; EN BAS, au même
# instant, les phrases et l'équation qui se remplissent.
#   · 2 paquets + 3 paquets = 5 paquets, 5x = 15 ;
#   · 1 question-pause (3 s) : 3x + 4x = 21 ;
#   · fin : 6x − 2x = 20, réponse en commentaire, fin standard.
# Micro : equation_resoudre_reduction. Centres : course-trail, sport (ceux de l'épisode).
#
# Voix : manim/voix/4e-equation-resoudre-reduction-short.json (validée, débit −6) ;
# marques : equation_resoudre_reduction_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/equation_resoudre_reduction_short.py EquationResoudreReductionShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/equation_resoudre_reduction_short.py EquationResoudreReductionShort -o eleveai-maths-4e-equation-resoudre-reduction-short --media_dir manim/scripts/4e/media-eq-04-short
# Sortie : manim/sorties/4e/maths/equations/04-resoudre-reduction/eleveai-maths-4e-equation-resoudre-reduction-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_resoudre_reduction import _OutilsReduc  # noqa: E402


class Paquet(VGroup):
    """Un paquet de cartes (3 cartes décalées) : .txt = ce qui est écrit dessus."""

    def __init__(self, s="x", w=0.56, h=0.8, **kw):
        super().__init__(**kw)
        self.cartes = VGroup(*[RoundedRectangle(width=w, height=h, corner_radius=0.06, stroke_color=INCONNUE, stroke_width=3,
                                                fill_color="#f8fafc", fill_opacity=1).shift(P(-0.04 + 0.04 * k, -0.04 + 0.04 * k))
                               for k in range(3)])
        self.txt = T(s, 34, BLEU_CALCUL, audit=False, gras=True).move_to(self.cartes[-1])
        self.add(self.cartes, self.txt)

    def devient(self, s, couleur=None):
        t = T(s, 34, couleur or "#047857", audit=False, gras=True).move_to(self.txt)
        a = ReplacementTransform(self.txt, t)
        self.txt = t
        return a


def paquets(n, buff=0.08):
    return VGroup(*[Paquet() for _ in range(n)]).arrange(RIGHT, buff=buff)


class EquationResoudreReductionShort(_OutilsReduc, ShortEq):
    nom_voix = "4e-equation-resoudre-reduction-short"
    fichier_marques = "equation_resoudre_reduction_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def ligne_eq(self, s, y, fs=30, couleur=WHITE, lettres=""):
        e = Eq(s, fs, couleur, lettres=lettres)
        if e.width > 3.9:
            e.scale_to_fit_width(3.9)
        return e.move_to(P(0, y))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Les paquets de cartes", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]
        Y = 1.2

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        g2 = paquets(2).move_to(P(-1.42, Y))
        pl = T("+", 40, OPERATION, audit=False, gras=True).move_to(P(-0.53, Y))
        g3 = paquets(3).move_to(P(0.84, Y))
        a1 = self.ligne_eq("2 paquets de cartes,", 0.3)
        self.dire_eq(a1, "2 paquets de cartes,", echelle=1.0, rt=0.14, avec=[FadeIn(titre), FadeIn(g2, shift=DOWN * 0.2)])
        a2 = self.ligne_eq("+ 3 paquets,", -0.15)
        self.par_morceaux(a2, (1, "plus", [FadeIn(pl, scale=1.3)]), (3, "3 paquets,", [FadeIn(g3, shift=DOWN * 0.2)]))
        a3 = self.ligne_eq("ça fait 15 cartes.", -0.6, 32, CIEL)
        self.dire_eq(a3, "ça fait 15 cartes.", echelle=1.0, rt=0.14)
        a4 = self.ligne_eq("Tu vois combien il y a", -1.25, 32, JAUNE_TITRE)
        a5 = self.ligne_eq("de cartes par paquet ?", -1.7, 32, JAUNE_TITRE)
        self.dire_eq(a4, "Tu vois combien il y a", echelle=1.0, rt=0.12)
        self.dire_eq(a5, "de cartes par paquet ?", echelle=1.0, rt=0.12)
        self.attendre_voix(marge=0.3)
        lignes = VGroup(a1, a2, a3, a4, a5)

        # ── 01 : on regroupe ──
        self.dire("01-jeu")
        self.play(FadeOut(lignes), run_time=0.1)
        cible = VGroup(g2.copy(), g3.copy()).arrange(RIGHT, buff=0.08).move_to(P(0, Y))
        c1 = self.ligne_eq("On regroupe : 5 paquets.", 0.3, 32, VERT_OK)
        self.dire_eq(c1, "On regroupe :", echelle=1.0, rt=0.14, sauf=c1.atomes[3:])
        self.play(FadeOut(pl), g2.animate.move_to(cible[0]), g3.animate.move_to(cible[1]), run_time=0.3)
        self.dire_eq(c1, "5 paquets.", echelle=1.0, rt=0.14, sauf=c1.atomes[:3])
        cad = SurroundingRectangle(VGroup(g2, g3), color=VERT_OK, buff=0.09, corner_radius=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.15)
        e1 = Eq("5x = 15", 44).mis_sur_egal(0.6, -0.3)
        self.dire_eq(e1, "5 x égale 15")
        self.play(e1.egal.animate.set_color(EGAL), run_time=0.1)
        e2 = Eq("Donc x = 3.", 44).mis_sur_egal(0.6, -0.95)
        self.dire_eq(e2, "Donc x égale 3.")
        e2c = SurroundingRectangle(VGroup(*e2.atomes[1:4]), color=VERT_OK, buff=0.08, corner_radius=0.08, stroke_width=4)
        self.play(e2.atomes[3].animate.set_color(VERT_OK), Create(e2c), run_time=0.12)
        d = self.ligne_eq("3 cartes par paquet.", -1.55, 32, VERT_OK)
        self.dire_eq(d, "3 cartes par paquet.", echelle=1.0, rt=0.13)
        self.play(*[p.devient("3") for p in list(g2) + list(g3)], run_time=0.2)
        r1 = self.ligne_eq("Regrouper d'abord,", -2.05, 32, JAUNE_TITRE)
        r2 = self.ligne_eq("et tout devient facile.", -2.5, 32, JAUNE_TITRE)
        self.dire_eq(r1, "Regrouper d'abord,", echelle=1.0, rt=0.12)
        self.dire_eq(r2, "et tout devient facile.", echelle=1.0, rt=0.12)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "3x + 4x = 21.", "3 x plus 4 x égale 21.", fs=34)
            sc.eq_dans_q(0, "Que vaut x ?", "Que vaut x ?", fs=34, lettres="x")

        def apres(sc):
            sc.ph_eq(0, "Réponse A : 3.", "Réponse A : 3.", premier=True)
            sc.ph_eq(1, "3x + 4x, 7x.", "3 x plus 4 x, 7 x.", lettres="x")
            sc.ph_eq(2, "Donc 7x = 21.", "Donc 7 x égale 21.", lettres="x")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["3x + 4x = 21.", "Que vaut x ?"],
                            [Eq("3", 28), Eq("7", 28), Eq("14", 28)], 0,
                            ["Réponse A : 3.", "3x + 4x, 7x.", "Donc 7x = 21."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        g6 = VGroup(*[Paquet() for _ in range(6)]).arrange(RIGHT, buff=0.05).scale(0.9).move_to(P(0, Y))
        e = Eq("6x − 2x = 20", 44).move_to(P(0, -0.1))
        self.dire_eq(e, "6 x moins 2 x égale 20", avec=[FadeIn(g6)], sauf=e.atomes[3:])
        self.dire_eq(e, "2 x égale 20", sauf=e.atomes[:3])
        non = VGroup(*[self.barrer(p) for p in g6[-2:]])
        self.play(Create(non), g6[-2].animate.set_opacity(0.35), g6[-1].animate.set_opacity(0.35), run_time=0.15)
        q = self.ligne_eq("Que vaut x ?", -0.95, 38, JAUNE_TITRE, lettres="x")
        self.dire_eq(q, "Que vaut x ?", echelle=1.0, rt=0.13)
        self.appel_commentaire(-1.9)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
