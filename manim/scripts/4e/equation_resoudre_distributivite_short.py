# equation_resoudre_distributivite_short.py
# EleveAI — Maths 4e — série ÉQUATIONS, épisode 05, le SHORT ceinture BLANCHE
# « La course du x » : deux élèves, deux colonnes qui descendent vers la même ligne
# d'arrivée. Elle divise (une foulée, deux lignes), lui développe (trois lignes).
#   · 1 question-pause (3 s) : 2(x + 5) = 16 ;
#   · fin : 5(x + 2) = 35, réponse en commentaire, fin standard.
# Micro : equation_resoudre_distributivite. Centres : electro-dj, musique (ceux de l'épisode).
#
# Voix : manim/voix/4e-equation-resoudre-distributivite-short.json (validée, débit −6) ;
# marques : equation_resoudre_distributivite_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/equation_resoudre_distributivite_short.py EquationResoudreDistributiviteShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/equation_resoudre_distributivite_short.py EquationResoudreDistributiviteShort -o eleveai-maths-4e-equation-resoudre-distributivite-short --media_dir manim/scripts/4e/media-eq-05-short
# Sortie : manim/sorties/4e/maths/equations/05-resoudre-distributivite/eleveai-maths-4e-equation-resoudre-distributivite-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_resoudre_distributivite import E, _OutilsDj, partie  # noqa: E402

XE_ELLE, XE_LUI = -0.78, 1.28  # le = de chaque colonne
Y_ARR = -1.9  # la ligne d'arrivée
X_PISTE = 2.0
Y_D = 0.52  # le départ des pistes
D_P = 0.3  # le pion s'arrête juste au-dessus de la ligne écrite : il ne touche jamais les nombres
FS_C = 23  # les lignes de calcul : « 2x + 6 = 14 » tient dans sa colonne, sans toucher la piste


def damier(y, largeur=4.0, n=26, cote=0.08):
    """La ligne d'arrivée : un damier sur deux rangs."""
    g = VGroup()
    for r in range(2):
        for k in range(n):
            if (k + r) % 2 == 0:
                g.add(Square(cote, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(
                    P(-largeur / 2 + (k + 0.5) * largeur / n, y + (0.5 - r) * cote)))
    return g


def pion(couleur, cheveux, longs):
    """La tête du coureur, qui descend sa piste au bord du cadre."""
    p = VGroup()
    if longs:
        p.add(RoundedRectangle(width=0.24, height=0.26, corner_radius=0.08, fill_color=cheveux, fill_opacity=1, stroke_width=0).move_to(P(0, -0.03)))
    p.add(Circle(radius=0.1, fill_color=couleur, fill_opacity=1, stroke_width=0))
    p.add(AnnularSector(inner_radius=0, outer_radius=0.11, angle=PI, start_angle=0, fill_color=cheveux, fill_opacity=1, stroke_width=0).move_to(P(0, 0.055)))
    return p.scale(0.8)


class EquationResoudreDistributiviteShort(_OutilsDj, ShortEq):
    nom_voix = "4e-equation-resoudre-distributivite-short"
    fichier_marques = "equation_resoudre_distributivite_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def ligne_eq(self, s, y, fs=30, couleur=WHITE, x=0.0, lettres=""):
        e = Eq(s, fs, couleur, lettres=lettres)
        if e.width > 3.9:
            e.scale_to_fit_width(3.9)
        return e.move_to(P(x, y))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La course du x", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        a1 = self.ligne_eq("Deux élèves, une même équation :", 2.02, 28)
        elle = personne(peau="#c68642", tenue="#f472b6", cheveux="#1f2937", longs=True, s=0.42).move_to(P(-1.05, 0.2))
        lui = personne(peau="#8d5524", tenue="#22c55e", cheveux="#111827", s=0.42).move_to(P(1.05, 0.2))
        self.dire_eq(a1, "Deux élèves, une même équation :", echelle=1.0, rt=0.14,
                     avec=[FadeIn(titre), FadeIn(elle, shift=RIGHT * 0.3), FadeIn(lui, shift=LEFT * 0.3)])
        e = Eq("2(x + 3) = 14", 40).move_to(P(0, 1.4))
        self.dire_eq(e, "2 fois, entre parenthèses, x plus 3, égale 14")
        self.play(e.egal.animate.set_color(EGAL), run_time=0.1)
        l1 = self.ligne_eq("L'une divise,", -0.75, 26, OPERATION, x=-1.05)
        l2 = self.ligne_eq("l'autre développe.", -0.75, 26, OPERATION, x=1.05)
        if l2.width > 2.0:
            k = 2.0 / l2.width
            l2.scale(k)
            l1.scale(k)
        self.dire_eq(l1, "L'une divise,", echelle=1.0, rt=0.12)
        self.dire_eq(l2, "l'autre développe.", echelle=1.0, rt=0.12)
        q = self.ligne_eq("Qui trouve le bon x ?", -1.5, 36, JAUNE_TITRE, lettres="x")
        self.dire_eq(q, "Qui trouve le bon x ?", echelle=1.0, rt=0.13)
        self.insister(q.x, 1.5, 0.18)
        self.attendre_voix(marge=0.2)

        # ── 01 : la course, deux colonnes qui descendent ──
        self.dire("01-course")
        pe = pion("#c68642", "#1f2937", True).move_to(P(-X_PISTE, Y_D))
        pl = pion("#8d5524", "#111827", False).move_to(P(X_PISTE, Y_D))
        pistes = VGroup(*[DashedLine(P(s * X_PISTE, Y_D), P(s * X_PISTE, Y_ARR), color="#64748b", stroke_width=3) for s in (-1, 1)])
        sep = Line(P(0, Y_D), P(0, Y_ARR), color="#334155", stroke_width=2)
        arr = damier(Y_ARR)
        self.play(FadeOut(VGroup(a1, l1, l2, q)), e.animate.move_to(P(0, 1.78)),
                  elle.animate.scale(0.62).move_to(P(-1.05, 1.14)), lui.animate.scale(0.62).move_to(P(1.05, 1.14)),
                  FadeIn(pistes), FadeIn(sep), FadeIn(arr), FadeIn(pe), FadeIn(pl), run_time=0.22)
        n2 = self.ligne_eq("Lui développe :", Y_D, 26, OPERATION, x=1.0)
        k = 1.66 / n2.width
        n2.scale(k).move_to(P(0.98, Y_D))
        n1 = self.ligne_eq("Elle divise :", Y_D, 26, OPERATION, x=-1.0)
        n1.scale(k).move_to(P(-0.98, Y_D))
        self.dire_eq(n1, "Elle divise :", echelle=1.0, rt=0.1)
        y1, y2, y3 = 0.02, -0.76, -1.54
        e1 = Eq("x + 3 = 7", FS_C).mis_sur_egal(XE_ELLE, y1)
        self.glisser(e, e1, "x plus 3 égale 7", {0: 2, 1: 3, 2: 4, 3: 6}, rt=0.14)
        self.play(pe.animate.move_to(P(-X_PISTE, y1 + D_P)), e1.egal.animate.set_color(EGAL), run_time=0.14)
        e2 = Eq("x = 4", FS_C).mis_sur_egal(XE_ELLE, y3)
        self.glisser(e1, e2, "x égale 4", {0: 0, 1: 3}, rt=0.14)
        self.play(pe.animate.move_to(P(-X_PISTE, y3 + D_P)), e2.egal.animate.set_color(EGAL), e2.droite.animate.set_color(VERT_OK), run_time=0.2)
        self.dire_eq(n2, "Lui développe :", echelle=1.0, rt=0.1)
        d1 = Eq("2x + 6 = 14", FS_C).mis_sur_egal(XE_LUI, y1)
        self.dire_eq(d1, "2 x plus 6 égale 14", rt=0.14, echelle=1.1)
        self.play(pl.animate.move_to(P(X_PISTE, y1 + D_P)), d1.egal.animate.set_color(EGAL), run_time=0.14)
        d2 = Eq("2x = 8", FS_C).mis_sur_egal(XE_LUI, y2)
        self.glisser(d1, d2, "2 x égale 8", {0: 0, 1: 1, 2: 4}, rt=0.14)
        self.play(pl.animate.move_to(P(X_PISTE, y2 + D_P)), d2.egal.animate.set_color(EGAL), run_time=0.14)
        d3 = Eq("x = 4", FS_C).mis_sur_egal(XE_LUI, y3)
        self.glisser(d2, d3, "x égale 4", {0: 1, 1: 2}, n=2, rt=0.14)
        self.play(pl.animate.move_to(P(X_PISTE, y3 + D_P)), d3.egal.animate.set_color(EGAL), d3.droite.animate.set_color(VERT_OK), run_time=0.14)
        c1 = SurroundingRectangle(e2, color=VERT_OK, buff=0.08, corner_radius=0.08, stroke_width=4)
        c2 = SurroundingRectangle(d3, color=VERT_OK, buff=0.08, corner_radius=0.08, stroke_width=4)
        f1 = self.ligne_eq("Les deux ont raison !", -2.3, 32, VERT_OK)
        self.dire_eq(f1, "Les deux ont raison !", echelle=1.0, rt=0.13, avec=[Create(c1), Create(c2)])
        # « fini » : Eq plante sur la ligature « fi », ce mot se pose avec T
        f2a = Eq("Mais elle a", 28, JAUNE_TITRE, lettres="")
        f2b = T("fini", 28, JAUNE_TITRE)
        f2c = Eq("la première.", 28, JAUNE_TITRE, lettres="")
        f2 = VGroup(f2a, f2b, f2c).arrange(RIGHT, buff=0.17)
        f2b.align_to(f2a.atomes[0], DOWN)
        f2c.shift(UP * (f2a.atomes[0].get_bottom()[1] - f2c.atomes[0].get_bottom()[1]))
        f2.scale_to_fit_width(3.9).move_to(P(0, -2.74))
        self.dire_eq(f2a, "Mais elle a", echelle=1.0, rt=0.12)
        self.au("fini", FadeIn(f2b), rt=0.12)
        self.dire_eq(f2c, "la première.", echelle=1.0, rt=0.12)
        etoile = Star(5, outer_radius=0.2, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).next_to(elle, LEFT, buff=0.1)
        self.play(FadeIn(etoile, scale=2), run_time=0.2)
        self.insister(VGroup(elle, etoile), 1.15, 0.15)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "2(x + 5) = 16.", "2 fois, entre parenthèses, x plus 5, égale 16.", fs=36)
            sc.eq_dans_q(0, "Que vaut x ?", "Que vaut x ?", fs=36)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : 3.", "Réponse A : 3.", premier=True)
            sc.ph_eq(1, "x + 5 = 8, donc x = 3.", "x plus 5 égale 8, donc x égale 3.", lettres="x")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["2(x + 5) = 16.", "Que vaut x ?"],
                            [Eq("3", 28), Eq("8", 28), E("5,5", 28)], 0,
                            ["Réponse A : 3.", "x + 5 = 8, donc x = 3."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        e5 = Eq("5(x + 2) = 35", 40).move_to(P(0, 1.85))
        rangs = VGroup(*[partie(0.36, 0.3, n=2, x_val=5, txt_x="x", txt_n="2", fs=22) for _ in range(5)]).arrange(DOWN, buff=0.04).move_to(P(-0.3, 0.45))
        acc = Brace(rangs, RIGHT, buff=0.06, color=WHITE)
        t35 = T("35", 34, JAUNE_TITRE, audit=False, gras=True).next_to(acc, RIGHT, buff=0.06)
        self.dire_eq(e5, "5 fois, entre parenthèses, x plus 2, égale 35")
        self.play(e5.egal.animate.set_color(EGAL), *[FadeIn(r, shift=RIGHT * 0.15) for r in rangs], GrowFromCenter(acc), FadeIn(t35), run_time=0.25)
        q2 = self.ligne_eq("Que vaut x ?", -1.2, 40, JAUNE_TITRE, lettres="x")
        self.dire_eq(q2, "Que vaut x ?", echelle=1.0, rt=0.13)
        self.appel_commentaire(-1.95)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
