# proba_pc_conditionnelle_short.py
# EleveAI — Maths 1re spé — short jumeau de l'épisode 1 (probabilité
# conditionnelle). CEINTURE ORANGE. Il AMUSE : « 90 % des footballeurs sont
# des garçons… donc 90 % des garçons jouent au foot ? »
#   · en HAUT le tableau croisé du coach (tableau_donnees), mais peuplé de
#     PERSONNES : lignes Foot / Pas foot, colonnes Garçons / Filles. Les dix
#     joueurs de l'accroche descendent dans la ligne Foot ;
#   · « parmi les joueurs de foot » : la LIGNE Foot s'allume (9 garçons sur
#     10) ; « parmi les garçons » : la COLONNE Garçons s'allume (9 sur 45) ;
#   · en BAS, EN MÊME TEMPS, les phrases et les pourcentages ;
#   · fin : le test et les malades, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/premiere-proba-conditionnelle-short.json (débit −6).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/proba_pc_conditionnelle_short.py ShortProbaConditionnellePremiere -o eleveai-maths-premiere-proba-conditionnelle-short --media_dir manim/scripts/premiere/media
# Puis copier le mp4 dans manim/sorties/premiere/maths/probabilites/01-conditionnelle/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_pc_conditionnelle import (ANNEAU, BORD, ENCRE, ENTETE, LIBELLE, SURLIGNE,  # noqa: E402
                                     P)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
GARCON = "#2563EB"
FILLE = "#A855F7"
ETEINT = 0.22


def joueur(couleur, s=1.0):
    tete = Circle(radius=0.1, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    corps = RoundedRectangle(width=0.24, height=0.3, corner_radius=0.08, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=1.5)
    tete.next_to(corps, UP, buff=0.03)
    return VGroup(corps, tete).scale(s)


def ballon(r=0.2):
    b = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=BLACK, stroke_width=2)
    penta = RegularPolygon(5, fill_color=BLACK, fill_opacity=1, stroke_width=0).scale(r * 0.38).move_to(b)
    return VGroup(b, penta)


class Grille(VGroup):
    """Le tableau croisé du coach, à deux lignes et deux colonnes, sans total."""

    def __init__(self, lignes, colonnes, larg_lab=1.05, larg=1.52, hs=(0.42, 0.55, 1.05), fs=22, haut=1.78, **kw):
        super().__init__(**kw)
        x0 = -(larg_lab + 2 * larg) / 2
        xs = [x0 + larg_lab / 2, x0 + larg_lab + larg / 2, x0 + larg_lab + 1.5 * larg]
        ws = [larg_lab, larg, larg]
        ys, y = [], haut
        for h in hs:
            ys.append(y - h / 2)
            y -= h
        self.r = [[Rectangle(width=ws[c], height=hs[r], fill_color=(ENTETE if r == 0 else LIBELLE if c == 0 else WHITE),
                             fill_opacity=1, stroke_color=BORD, stroke_width=2).move_to(P(xs[c], ys[r]))
                   for c in range(3)] for r in range(3)]
        self.ent = [Text(n, font_size=fs, color=WHITE, weight=BOLD).move_to(self.r[0][j + 1]) for j, n in enumerate(colonnes)]
        self.lab = [Text(n, font_size=fs, color=ENCRE, weight=BOLD).move_to(self.r[i + 1][0]) for i, n in enumerate(lignes)]
        # une seule échelle par famille : les mots gardent la même taille
        for fam, w in ((self.ent, larg), (self.lab, larg_lab)):
            k = min(1.0, min((w - 0.14) / t.width for t in fam))
            for t in fam:
                t.scale(k).set_z_index(3)
        self.add(*[x for ligne in self.r for x in ligne], *self.ent, *self.lab)

    def case(self, i, j):
        return self.r[i + 1][j + 1]

    def etat(self, ligne=None, colonne=None, extra=()):
        """Allume une ligne OU une colonne (jaune), estompe le reste ; `extra` :
        les objets posés dans les cases (liste de (i, j, mob))."""
        rien = ligne is None and colonne is None
        anims = []
        for i in range(2):
            for j in range(2):
                on = rien or i == ligne or j == colonne
                rc = self.case(i, j)
                if rien:
                    anims.append(rc.animate.set_fill(WHITE, 1).set_stroke(BORD, 2).set_z_index(0))
                elif on:
                    anims.append(rc.animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5).set_z_index(1))
                else:
                    anims.append(rc.animate.set_fill(WHITE, ETEINT).set_stroke(BORD, 2, opacity=ETEINT).set_z_index(0))
        for (i, j, m) in extra:
            on = rien or i == ligne or j == colonne
            anims.append(m.animate.set_opacity(1 if on else 0.25))
        for i, t in enumerate(self.lab):
            on = rien or ligne == i or colonne is not None
            anims.append(t.animate.set_opacity(1 if on else 0.3))
        for j, t in enumerate(self.ent):
            on = rien or colonne == j or ligne is not None
            anims.append(t.animate.set_opacity(1 if on else 0.3))
        return anims


def points(rect, n, couleur, par_rangee=9, pas=0.16, r=0.06):
    rangs = (n + par_rangee - 1) // par_rangee
    g = VGroup()
    for k in range(n):
        a, b = k % par_rangee, k // par_rangee
        g.add(Dot(P(a * pas, -b * pas), radius=r, color=couleur))
    larg = (min(n, par_rangee) - 1) * pas
    g.shift(rect.get_center() - P(larg / 2, -(rangs - 1) * pas / 2))
    return g.set_z_index(4)


class ShortProbaConditionnellePremiere(Short6e):
    nom_voix = "premiere-proba-conditionnelle-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def morceaux(self, *parts, fs=28, buff=0.15):
        g = VGroup(*[Text(m, font_size=fs, color=c) for m, c in parts]).arrange(RIGHT, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Le foot au lycée", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        equipe = VGroup(*[joueur(GARCON if k < 9 else FILLE) for k in range(10)]).arrange(RIGHT, buff=0.12)
        equipe.move_to(P(0, 0.75))
        b = ballon().move_to(P(-1.6, 1.55))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2),
                  LaggedStart(*[FadeIn(j, shift=UP * 0.3) for j in equipe], lag_ratio=0.08), FadeIn(b), run_time=1.0)
        self.play(b.animate.move_to(P(1.6, 1.55)), Rotate(b, -2 * PI), run_time=0.9,
                  rate_func=rate_functions.there_and_back_with_pause)
        self.au_mot("90 % des joueurs")
        l1 = self.morceaux(("foot :", WHITE), ("90 %", JAUNE_TITRE), ("de garçons", GARCON), fs=32)
        l1.move_to(P(0, -0.35))
        self.play(FadeIn(l1, shift=UP * 0.2), *[equipe[k].animate.scale(1.25) for k in range(9)], run_time=0.5)
        self.play(*[equipe[k].animate.scale(1 / 1.25) for k in range(9)], run_time=0.3)
        self.insister(l1[1], 1.3, 0.2)
        self.au_mot("Donc 90 %")
        l2 = self.morceaux(("garçons :", GARCON), ("90 %", JAUNE_TITRE), ("de foot", WHITE), fs=32)
        l2.move_to(P(0, -1.05))
        self.play(FadeIn(l2, shift=UP * 0.2), run_time=0.45)
        q = self.grand("?", font_size=90, color=ORANGE_RETENUE).move_to(P(0, -1.85))
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : la LIGNE, puis la COLONNE ──
        self.dire("01-image")
        g = Grille(["Foot", "Pas foot"], ["Garçons", "Filles"])
        non = self.grand("Non !", font_size=72, color=ROUGE_ERREUR).move_to(P(0, -1.1))
        self.play(FadeOut(VGroup(l1, l2, q)), FadeOut(b), FadeIn(non, scale=0.5), run_time=0.4)
        self.play(Wiggle(non), FadeIn(g), equipe.animate.scale(0.75).move_to(P(0, -0.5)), run_time=0.6)
        gf = points(g.case(0, 0), 9, GARCON)
        ff = points(g.case(0, 1), 1, FILLE)
        gp = points(g.case(1, 0), 36, GARCON)
        fp = points(g.case(1, 1), 44, FILLE)
        self.play(*[ReplacementTransform(equipe[k], gf[k]) for k in range(9)],
                  ReplacementTransform(equipe[9], ff[0]), run_time=0.7)
        self.play(LaggedStart(FadeIn(gp, lag_ratio=0.05), FadeIn(fp, lag_ratio=0.05), lag_ratio=0.3), run_time=0.7)
        cases = [(0, 0, gf), (0, 1, ff), (1, 0, gp), (1, 1, fp)]

        self.au_mot("Parmi les joueurs de foot")
        L1 = self.morceaux(("parmi les", WHITE), ("foot :", JAUNE_TITRE), ("90 %", JAUNE_TITRE),
                           ("de garçons", GARCON), fs=30).move_to(P(0, -0.5))
        r1, v1 = L1[:2], L1[2:]
        self.play(FadeOut(non, shift=DOWN * 0.3), *g.etat(ligne=0, extra=cases), FadeIn(r1), run_time=0.6)
        self.au_mot("90 % de garçons")
        self.play(FadeIn(v1, scale=0.6), Indicate(gf, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.5)

        self.au_mot("Mais parmi les garçons")
        L2 = self.morceaux(("parmi les", WHITE), ("garçons :", GARCON), ("20 %", VERT_OK), ("de foot", WHITE),
                           fs=30).move_to(P(0, -1.1))
        r2, v2 = L2[:2], L2[2:]
        self.play(*g.etat(colonne=0, extra=cases), FadeIn(r2), VGroup(r1, v1).animate.set_opacity(0.45), run_time=0.6)
        self.au_mot("20 %")
        self.play(FadeIn(v2, scale=0.6), Indicate(gf, color=VERT_OK, scale_factor=1.15), run_time=0.5)
        self.insister(v2[0], 1.4, 0.2)

        self.au_mot("On ne divise pas")
        cl = SurroundingRectangle(VGroup(g.r[1][0], g.r[1][2]), color=JAUNE_TITRE, buff=0.03, stroke_width=5)
        cc = SurroundingRectangle(VGroup(g.r[0][1], g.r[2][1]), color=VERT_OK, buff=0.03, stroke_width=5)
        self.play(*g.etat(extra=cases), Create(cl), Create(cc), VGroup(r1, v1).animate.set_opacity(1), run_time=0.6)
        self.au_mot("même groupe")
        fin = self.t("pas le même groupe !", 34, ORANGE_RETENUE).move_to(P(0, -1.8))
        self.play(FadeIn(fin, scale=0.6), run_time=0.35)
        self.insister(fin, 1.15, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(toi), run_time=0.4)
        g2 = Grille(["Malades", "Sains"], ["Test +", "Test −"], hs=(0.42, 0.6, 0.6))
        cases2 = []
        for i in range(2):
            for j in range(2):
                c = VGroup(*[joueur(GREY_B, 0.55) for _ in range(5)]).arrange(RIGHT, buff=0.06)
                cases2.append((i, j, c.move_to(g2.case(i, j)).set_z_index(4)))
        self.play(FadeIn(g2), *[FadeIn(c) for _, _, c in cases2], run_time=0.5)
        self.au_mot("parmi les malades")
        q1 = self.morceaux(("parmi les", WHITE), ("malades :", ORANGE_RETENUE), ("95 %", JAUNE_TITRE),
                           ("test +", WHITE), fs=30).move_to(P(0, -0.15))
        self.play(*g2.etat(ligne=0, extra=cases2), FadeIn(q1[:2]), run_time=0.5)
        self.au_mot("95 % ont")
        self.play(FadeIn(q1[2:], scale=0.6), run_time=0.35)
        self.insister(q1[2], 1.3, 0.2)
        self.au_mot("Alors un test positif")
        q2 = self.morceaux(("test + :", BLEU_CALCUL), ("95 %", JAUNE_TITRE), ("malades ?", ORANGE_RETENUE),
                           fs=32).move_to(P(0, -0.7))
        self.play(*g2.etat(colonne=0, extra=cases2), FadeIn(q2[0]), run_time=0.5)
        self.au_mot("95 % de chances")
        self.play(FadeIn(q2[1:], scale=0.6), run_time=0.35)
        self.insister(q2[2], 1.2, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -1.6))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -2.5))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
