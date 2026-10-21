# proba_cond_defi_short.py
# EleveAI — Maths Tle spé (micro proba_conditionnelle_defi) — short jumeau de
# « Probabilités conditionnelles : un exercice type bac ». Ceinture ORANGE.
# Il AMUSE : après une alerte fortes pluies, il pleut 8 fois sur 10… donc un
# jour de pluie, l'alerte était là 8 fois sur 10 ? Pas du tout : 57 %.
#   · en HAUT l'île et le cyclone, puis 100 jours de calendrier qui se
#     colorent (25 alertes, 20 sous la pluie, 15 jours de pluie sans alerte) ;
#   · en BAS, EN MÊME TEMPS : les flèches 8 sur 10, puis le TABLEAU À DOUBLE
#     ENTRÉE (alerte / sans alerte × pluie / total) qui se remplit ;
#   · fin : l'arbre du coach (0,25 ; 0,8 ; 0,2) et la question « il n'a pas
#     plu : l'alerte ? » (réponse 1/13 ≈ 0,077), « Réponds en commentaire ! »,
#     puis « Entraîne-toi sur eleveai.fr ».
# Ti-Margo en bas (margo_bas). Nombres en Python (20/35 = 0,571).
#
# Voix : manim/voix/terminale-proba-cond-defi-short.json (débit −6), calée
# par proba_cond_defi_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_cond_defi_short.py ShortProbaCondDefiTerminale -o eleveai-maths-terminale-proba-cond-defi-short --media_dir manim/scripts/terminale/media-cond_defi-1s

import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_cond_defi import (  # noqa: E402
    ALERTE, OCEAN, P, P_FA, PLUIE, ArbreAF, MotsCales, cyclone, ile, nuage, panneau_alerte, suite,
)
from proba_pc_conditionnelle import BORD, ENCRE, TableauCroise  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

assert round(float(P_FA) * 100) == 57
LARGEUR_MAX = 4.1


def fleche(s=0.35):
    return Arrow(LEFT, RIGHT, color=WHITE, stroke_width=5, buff=0).scale(s)


class CentJours(VGroup):
    """100 jours en 10 × 10 cases : 25 jours d'alerte (bord orange) dont 20 de
    pluie, et 15 jours de pluie sans alerte (cases bleues). Positions tirées
    une fois pour toutes (graine fixe), effectifs exacts."""

    def __init__(self, pas=0.22, c=0.18):
        super().__init__()
        self.cases = VGroup(*[Square(side_length=c, fill_color="#334155", fill_opacity=1, stroke_color="#64748B",
                                     stroke_width=1) for _ in range(100)])
        self.cases.arrange_in_grid(rows=10, cols=10, buff=pas - c)
        self.add(self.cases)
        rnd = random.Random(974)
        idx = list(range(100))
        rnd.shuffle(idx)
        self.alerte = sorted(idx[:25])
        self.alerte_pluie = sorted(rnd.sample(self.alerte, 20))
        self.sans_pluie = sorted(rnd.sample(idx[25:], 15))

    def anim_alerte(self):
        return [self.cases[i].animate.set_stroke(ALERTE, 3.5) for i in self.alerte]

    def anim_pluie(self, ids):
        return [self.cases[i].animate.set_fill(PLUIE, 1) for i in ids]

    def garder_pluie(self, op=0.15):
        pluie = set(self.alerte_pluie) | set(self.sans_pluie)
        return [c.animate.set_opacity(op) for i, c in enumerate(self.cases) if i not in pluie]


class ShortProbaCondDefiTerminale(MotsCales, Short6e):
    fichier_marques = "proba_cond_defi_short_marques.json"
    nom_voix = "terminale-proba-cond-defi-short"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def cap(self, g, larg=LARGEUR_MAX):
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : 8 fois sur 10… et dans l'autre sens ? ──
        self.dire("00-accroche")
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        titre = self.t("Alerte fortes pluies", 40, ALERTE).move_to(P(0, 3.3))
        mer = Circle(radius=1.05, fill_color=OCEAN, fill_opacity=1, stroke_color="#38BDF8", stroke_width=3)
        mer.move_to(P(0, 0.8))
        terre = ile(0.55).move_to(mer.get_center() + P(-0.2, -0.25))
        cy = cyclone(0.6).move_to(mer.get_center() + P(0.45, 0.45))
        cy.add_updater(lambda m, dt: m.rotate(-1.6 * dt))
        self.add(badge, titre, mer, terre, cy)          # l'image de la 1re seconde
        self.au_mot("météorologue")
        metier = self.t("météorologue", 34, BLEU_CALCUL).move_to(P(0, -0.55))
        self.play(FadeIn(metier, shift=UP * 0.15), run_time=0.4)
        self.au_mot("après son alerte")
        l1 = suite(panneau_alerte(0.55), fleche(), nuage(0.6), self.t("8 sur 10", 46, PLUIE), buff=0.2)
        self.cap(l1).move_to(P(0, -1.35))
        self.play(FadeOut(metier), FadeIn(l1[0], scale=1.5), run_time=0.4)
        self.au_mot("il pleut 8")
        self.play(GrowArrow(l1[1]), FadeIn(l1[2], shift=DOWN * 0.15), run_time=0.35)
        self.play(FadeIn(l1[3], scale=1.6), run_time=0.35)
        self.au_mot("Donc quand il pleut")
        l2 = suite(nuage(0.6), fleche(), panneau_alerte(0.55), self.t("8 sur 10 ?", 46, ORANGE_RETENUE), buff=0.2)
        self.cap(l2).move_to(P(0, -2.45))
        self.play(FadeIn(l2[0], scale=1.4), GrowArrow(l2[1]), run_time=0.4)
        self.au_mot("l'alerte était là")
        self.play(FadeIn(l2[2], scale=1.5), run_time=0.3)
        self.au_mot("était là 8 fois")
        self.play(FadeIn(l2[3], scale=1.6), run_time=0.4)
        self.au_mot("Pas du tout")
        non = self.t("Pas du tout !", 54, ROUGE_ERREUR).move_to(P(0, 3.3))
        croix = Line(l2.get_left() + LEFT * 0.05, l2.get_right() + RIGHT * 0.05, color=ROUGE_ERREUR, stroke_width=7)
        self.play(ReplacementTransform(titre, non), Create(croix), run_time=0.4)
        self.play(Wiggle(non), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : 100 jours, puis le tableau à double entrée ──
        self.dire("01-image")
        cent = CentJours().move_to(P(0, 0.85))
        tab = TableauCroise(lignes=["Alerte", "Sans alerte", "Total"], colonnes=["Pluie", "Total"],
                            valeurs=[[20, 25], [15, None], [35, 100]], larg_lab=2.0, larg=1.05, h=0.62,
                            h_ent=0.55, fs=26)
        self.cap(tab).move_to(P(0, -1.65))
        sur100 = self.t("Sur 100 jours", 46, JAUNE_TITRE).move_to(P(0, 3.3))
        cy.clear_updaters()
        self.play(FadeOut(VGroup(mer, terre, cy, l1, l2, croix)), ReplacementTransform(non, sur100), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in cent.cases], lag_ratio=0.004),
                  FadeIn(tab.fonds), FadeIn(tab.textes), run_time=0.7)
        self.play(tab.poser(2, 1), run_time=0.3)
        self.au_mot("25 alertes")
        self.play(*cent.anim_alerte(), tab.poser(0, 1), *tab.etat(lignes=(0,), eteindre=False), run_time=0.5)
        self.au_mot("dont 20")
        self.play(*cent.anim_pluie(cent.alerte_pluie), tab.poser(0, 0), run_time=0.5)
        self.au_mot("Mais 15")
        self.play(*tab.etat(), run_time=0.2)
        self.play(*cent.anim_pluie(cent.sans_pluie), tab.poser(1, 0), *tab.etat(lignes=(1,), eteindre=False),
                  run_time=0.5)
        self.au_mot("20 sur 35")
        self.play(*cent.garder_pluie(), tab.poser(2, 0), *tab.etat(colonnes=(0,)), run_time=0.6)
        self.play(*[Indicate(cent.cases[i], color=ALERTE, scale_factor=1.6) for i in cent.alerte_pluie],
                  Indicate(tab.val[0][0], color=ALERTE), run_time=0.6)
        self.au_mot("57 %")
        res = self.t("57 % seulement !", 46, ORANGE_RETENUE, largeur=3.7).move_to(P(0, 3.3))
        self.play(ReplacementTransform(sur100, res), run_time=0.4)
        self.insister(res, 1.12)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question, sur l'arbre du coach ──
        self.dire("02-question")
        toi = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.3))
        a = ArbreAF(dx=2.4, dy1=1.25, dy2=0.65, fs=46, titre=None, pad=2.4, decal=0.35)
        a.scale_to_fit_width(4.2).move_to(P(0, 0.2))
        self.play(ReplacementTransform(res, toi), FadeOut(VGroup(cent, tab)), FadeIn(a), run_time=0.5)
        self.au_mot("alerte 0,25")
        self.play(FadeIn(a.nombre(0, "0,25", fs=36), scale=1.6), *a.allumer([0], ALERTE, 7), run_time=0.35)
        self.au_mot("pluie après alerte 0,8")
        self.play(FadeIn(a.nombre(2, "0,8", fs=36), scale=1.6), *a.allumer([2], PLUIE, 7), run_time=0.35)
        self.au_mot("sans alerte 0,2")
        self.play(FadeIn(a.nombre(4, "0,2", fs=36), scale=1.6), *a.allumer([4], PLUIE, 7), run_time=0.35)
        self.au_mot("S'il n'a pas plu")
        q = suite(nuage(0.5, pluie=False), self.t("pas de pluie :", 36), panneau_alerte(0.5),
                  self.t("?", 48, ORANGE_RETENUE), buff=0.15)
        self.cap(q).move_to(P(0, -1.55))
        self.play(FadeIn(q[:2], shift=UP * 0.1), *a.allumer([3, 5], ORANGE_RETENUE, 7),
                  Indicate(a.lab_feuilles[1], color=ORANGE_RETENUE), Indicate(a.lab_feuilles[3], color=ORANGE_RETENUE),
                  run_time=0.5)
        self.au_mot("une alerte ?")
        self.play(FadeIn(q[2:], scale=1.5), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 50, VERT_OK, largeur=3.8), self.t("commentaire !", 50, VERT_OK, largeur=3.8))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.4))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 03 : la fin : « Entraîne-toi sur eleveai.fr. Et abonne-toi ! » ──
        self.fin_short("03-abonne", [toi, a, *[n for n in a.nombres if n is not None], q, appel, badge])

    def fin_short(self, voix, a_effacer):
        self.dire(voix)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.4))
        site = self.t("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.0))
        poignee = self.t("@eleveai974", 44, VERT_OK).move_to(P(0, -0.85))
        self.play(FadeOut(VGroup(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)
