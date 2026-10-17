# proba_probaC_notation_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 2 (la notation P_A(B)).
# CEINTURE JAUNE. Il AMUSE : une boutique en ligne, les clients qui laissent
# un avis… reviennent-ils ?
#   · en HAUT la boutique (une fenêtre de navigateur, cinq clients, leurs
#     étoiles ; trois reviennent) puis le TABLEAU CROISÉ du coach
#     (`tableau_donnees`) : les clients descendent dans la ligne « Avis », la
#     LIGNE s'allume ; à la question, c'est la COLONNE « Revient » ;
#   · en BAS, EN MÊME TEMPS : 60 %, A et R, le A qui DESCEND en indice,
#     P_A(R) = 0,6 ;
#   · fin : 30 %, « P_A(R) ou P_R(A) ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/stmg-proba-notation-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_notation_short.py ShortProbaNotationSTMG -o eleveai-maths-stmg-proba-notation-short --media_dir manim/scripts/stmg/media
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/02-notation/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaC_notation import P, lettre, p_cond, suite  # noqa: E402  (pose les chemins)
from proba_pc_conditionnelle_short import Grille, joueur  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
CLIENT = "#94A3B8"


def fenetre(larg=3.9, haut=1.75):
    """Une fenêtre de navigateur : la boutique en ligne."""
    cadre = RoundedRectangle(width=larg, height=haut, corner_radius=0.12, fill_color="#0F172A", fill_opacity=1,
                             stroke_color=BLEU_CALCUL, stroke_width=3)
    barre = Rectangle(width=larg, height=0.26, fill_color=BLEU_CALCUL, fill_opacity=0.35, stroke_width=0)
    barre.align_to(cadre, UP)
    points = VGroup(*[Dot(radius=0.04, color=c) for c in (ROUGE_ERREUR, JAUNE_TITRE, VERT_OK)])
    points.arrange(RIGHT, buff=0.07).move_to(barre).align_to(barre, LEFT).shift(RIGHT * 0.15)
    adresse = RoundedRectangle(width=larg * 0.55, height=0.13, corner_radius=0.06, fill_color=WHITE,
                               fill_opacity=0.25, stroke_width=0).move_to(barre)
    return VGroup(cadre, barre, points, adresse)


def etoile(r=0.12):
    return Star(5, outer_radius=r, inner_radius=r * 0.45, fill_color=JAUNE_TITRE, fill_opacity=1,
                stroke_color=WHITE, stroke_width=1)


class ShortProbaNotationSTMG(Short6e):
    nom_voix = "stmg-proba-notation-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def formule(self, cond, cible, fs=64):
        return p_cond(cond, cible, fs, WHITE, JAUNE_TITRE, VERT_OK)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : la boutique, les avis, ceux qui reviennent ──
        self.dire("00-accroche")
        titre = self.grand("La boutique en ligne", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        fen = fenetre().move_to(P(0, 0.85))
        clients = VGroup(*[joueur(CLIENT, 1.5) for _ in range(5)]).arrange(RIGHT, buff=0.35)
        clients.move_to(P(0, 0.6))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(fen), run_time=0.8)
        self.play(LaggedStart(*[FadeIn(c, shift=LEFT * 0.4) for c in clients], lag_ratio=0.12), run_time=0.7)
        self.au_mot("qui ont laissé un avis")
        etoiles = VGroup(*[etoile().next_to(c, UP, buff=0.1) for c in clients])
        self.play(LaggedStart(*[GrowFromCenter(e) for e in etoiles], lag_ratio=0.12), run_time=0.6)
        self.au_mot("60 %")
        soixante = self.grand("60 %", font_size=80, color=JAUNE_TITRE).move_to(P(0, -0.75))
        self.play(FadeIn(soixante, scale=0.5), run_time=0.35)
        self.insister(soixante, 1.3, 0.2)
        self.au_mot("reviennent acheter")
        reviennent = [0, 2, 3]
        self.play(*[clients[k].animate.set_color(VERT_OK).shift(UP * 0.25) for k in reviennent], run_time=0.3)
        self.play(*[clients[k].animate.shift(DOWN * 0.25) for k in reviennent], run_time=0.3)
        self.au_mot("Comment l'écrire")
        q = self.grand("Comment l'écrire ?", font_size=40, color=ORANGE_RETENUE).move_to(P(0, -1.75))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.insister(q, 1.15, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : A, R ; la LIGNE « Avis » s'allume ; A DESCEND en indice ──
        self.dire("01-image")
        g = Grille(["Avis", "Sans avis"], ["Revient", "Ne revient pas"], larg_lab=1.0, larg=1.3,
                   hs=(0.5, 0.62, 0.62), fs=22, haut=1.45)
        g.shift(RIGHT * 0.22)
        lA = lettre("A", 34, BLEU_CALCUL).next_to(g.r[1][0], LEFT, buff=0.08)
        lR = lettre("R", 34, BLEU_CALCUL).next_to(g.r[0][1], UP, buff=0.08)
        # les clients descendent dans la ligne « Avis » : 3 reviennent, 2 non
        place = {}
        for k, c in enumerate(clients):
            case = g.case(0, 0) if k in reviennent else g.case(0, 1)
            place[k] = case
        cibles = {}
        for case, ks in ((g.case(0, 0), reviennent), (g.case(0, 1), [1, 4])):
            for n, k in enumerate(ks):
                cibles[k] = case.get_center() + RIGHT * (n - (len(ks) - 1) / 2) * 0.36
        self.play(FadeOut(VGroup(soixante, q), shift=DOWN * 0.3), FadeOut(fen), FadeOut(etoiles), FadeIn(g),
                  *[c.animate.scale(0.55).move_to(cibles[k]).set_z_index(5) for k, c in enumerate(clients)],
                  run_time=0.9)
        dA = suite(lettre("A", 34, BLEU_CALCUL), self.t(": « laisse un avis »", 26), buff=0.1)
        dA.scale_to_fit_width(min(dA.width, LARGEUR_MAX)).move_to(P(0, -0.6))
        dR = suite(lettre("R", 34, BLEU_CALCUL), self.t(": « revient acheter »", 26), buff=0.1)
        dR.scale_to_fit_width(min(dR.width, LARGEUR_MAX)).move_to(P(0, -1.1))
        self.au_mot("A : « laisse")
        self.play(FadeIn(dA, shift=UP * 0.15), FadeIn(lA, scale=1.6), run_time=0.4)
        self.au_mot("R : « revient")
        self.play(FadeIn(dR, shift=UP * 0.15), FadeIn(lR, scale=1.6), run_time=0.4)
        extra = [(0, 0, VGroup(*[clients[k] for k in reviennent])), (0, 1, VGroup(clients[1], clients[4]))]
        self.au_mot("On se place parmi")
        cad = SurroundingRectangle(VGroup(g.r[1][0], g.r[1][2]), color=JAUNE_TITRE, buff=0.03, stroke_width=5)
        self.play(*g.etat(ligne=0, extra=extra), run_time=0.5)
        self.play(Create(cad), Indicate(lA, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.5)
        self.au_mot("A en indice")
        f = self.formule("A", "R", 54)
        eg = self.t("=", 50).next_to(f, RIGHT, buff=0.15)
        v = self.t("0,6", 54, JAUNE_TITRE).next_to(eg, RIGHT, buff=0.15)
        v.shift(UP * (f[0].get_bottom()[1] - v[0].get_bottom()[1]))
        VGroup(f, eg, v).move_to(P(0, -1.95))
        grand = lettre("A", 54, JAUNE_TITRE).next_to(f[0], RIGHT, buff=0.05).align_to(f[0], DOWN)
        self.play(FadeOut(dA), FadeOut(dR), FadeIn(f[0]), TransformFromCopy(lA, grand), run_time=0.6)
        self.play(ReplacementTransform(grand, f[1]), run_time=0.6)
        self.play(Indicate(f[1], color=JAUNE_TITRE, scale_factor=1.7), FadeIn(f[2], shift=LEFT * 0.15), run_time=0.5)
        self.au_mot("égale 0,6")
        self.play(FadeIn(eg), FadeIn(v, scale=0.5), run_time=0.35)
        self.insister(v, 1.25, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : la COLONNE « Revient » ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(f, eg, v), shift=DOWN * 0.3), FadeOut(cad),
                  *g.etat(extra=extra), run_time=0.5)
        self.au_mot("parmi les clients qui reviennent")
        l1 = self.t("« parmi les clients qui reviennent,", 26).move_to(P(0, -0.5))
        cadc = SurroundingRectangle(VGroup(g.r[0][1], g.r[2][1]), color=JAUNE_TITRE, buff=0.03, stroke_width=5)
        self.play(FadeIn(l1, shift=UP * 0.15), *g.etat(colonne=0, extra=extra), run_time=0.5)
        self.play(Create(cadc), Indicate(lR, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.4)
        self.au_mot("30 %")
        l2 = suite(self.t("30 %", 30, JAUNE_TITRE), self.t("ont laissé un avis »", 26), buff=0.12)
        l2.scale_to_fit_width(min(l2.width, LARGEUR_MAX)).move_to(P(0, -0.92))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.35)
        self.insister(l2[0], 1.4, 0.2)
        self.au_mot("P indice A de R ou")
        o1 = self.formule("A", "R", 56)
        ou = self.t("ou", 34)
        o2 = self.formule("R", "A", 56)
        q = self.t("?", 56, ORANGE_RETENUE)
        choix = suite(o1, ou, o2, q, buff=0.2)
        choix.scale_to_fit_width(min(choix.width, LARGEUR_MAX)).move_to(P(0, -1.6))
        self.play(FadeIn(o1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("P indice R de A")
        self.play(FadeIn(ou), FadeIn(o2, shift=UP * 0.15), FadeIn(q, scale=0.5), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = self.grand("Réponds en commentaire !", font_size=46, color=VERT_OK, marge=0.25).move_to(P(0, -2.25))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
