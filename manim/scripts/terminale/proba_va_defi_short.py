# proba_va_defi_short.py
# EleveAI — Maths Tle spé (micro va_defi) — short jumeau de « Variable
# aléatoire : un exercice type bac ». Ceinture ORANGE.
# Il AMUSE : le titre d'un groupe de maloya rapportera 500, 800, 1 000 ou
# 4 000 €… en moyenne 1 575 € ? Raté : le tube n'arrive qu'une fois sur 20,
# l'espérance est 850 €, et une fois sur deux ce n'est que 500 €.
#   · en HAUT les 20 disques (10 à 500 €, 5 à 800 €, 4 à 1 000 €, 1 tube à
#     4 000 € : exactement la loi, sur 20) ;
#   · en BAS, EN MÊME TEMPS : les valeurs, 1 575 € barré, E = 850 €, 1 fois
#     sur 2 : 500 € ;
#   · fin : le TABLEAU DE LOI du coach qui se remplit, la question P(X > 900)
#     (réponse 0,25), « Réponds en commentaire ! », puis « Entraîne-toi ».
# Ti-Margo en bas (margo_bas). Nombres en Python.
#
# Voix : manim/voix/terminale-proba-va-defi-short.json (débit −6), calée par
# proba_va_defi_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_va_defi_short.py ShortProbaVaDefiTerminale -o eleveai-maths-terminale-proba-va-defi-short --media_dir manim/scripts/terminale/media-va_defi-1s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_defi import (  # noqa: E402
    COUL_N, PROBS, T_PROBS, T_VALS, VALS, MotsCales, P, TableauLoi, casque, lab_p, lab_xi, ravanne, suite,
    telephone,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

COMPTES = [int(p * 20) for p in PROBS]
assert COMPTES == [10, 5, 4, 1] and PROBS[2] + PROBS[3] == 0.25
LARGEUR_MAX = 4.1


def disque(couleur, r=0.26):
    """Un disque (le titre vendu) : vinyle noir, étiquette de couleur."""
    return VGroup(Circle(radius=r, fill_color="#111827", fill_opacity=1, stroke_color="#64748B", stroke_width=2),
                  Circle(radius=r * 0.42, fill_color=couleur, fill_opacity=1, stroke_width=0),
                  Dot(radius=r * 0.08, color="#111827"))


class ShortProbaVaDefiTerminale(MotsCales, Short6e):
    fichier_marques = "proba_va_defi_short_marques.json"
    nom_voix = "terminale-proba-va-defi-short"
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

        # ── 00 : 500, 800, 1 000 ou 4 000 € ; en moyenne 1 575 ? Raté ! ──
        self.dire("00-accroche")
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        titre = self.t("Combien va rapporter", 36, JAUNE_TITRE).move_to(P(0, 3.45))
        titre2 = self.t("le titre ?", 36, JAUNE_TITRE).move_to(P(0, 3.0))
        r = ravanne(0.8).move_to(P(-1.25, 0.9))
        c = casque(0.85).move_to(P(0.2, 1.0))
        tel = telephone(0.75).move_to(P(1.55, 0.9))
        self.add(badge, titre, titre2, r, c, tel)          # l'image de la 1re seconde
        self.au_mot("ingénieur du son")
        metier = self.t("ingénieur du son", 32, BLEU_CALCUL).move_to(P(0, -0.3))
        self.play(FadeIn(metier, shift=UP * 0.15), Wiggle(c), run_time=0.6)
        self.au_mot("maloya")
        self.play(Wiggle(r, scale_value=1.2), run_time=0.6)
        vals = VGroup(*[self.t(v + " €", 36, c_) for v, c_ in zip(T_VALS, COUL_N)])
        VGroup(VGroup(*vals[:2]).arrange(RIGHT, buff=0.5), VGroup(*vals[2:]).arrange(RIGHT, buff=0.5))
        lignes = VGroup(VGroup(*vals[:2]), VGroup(*vals[2:])).arrange(DOWN, buff=0.25).move_to(P(0, -1.2))
        for k, mot in enumerate(["500,", "800,", "1 000,", "4 000"]):
            self.au_mot(mot)
            anims = [FadeOut(metier)] if k == 0 else []
            self.play(*anims, FadeIn(vals[k], scale=1.6), run_time=0.3)
        self.au_mot("En moyenne")
        moy = suite(self.t("moyenne :", 36), self.t("1 575 € ?", 44, ORANGE_RETENUE), buff=0.2)
        self.cap(moy).move_to(P(0, -2.45))
        self.play(FadeIn(moy[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 575")
        self.play(FadeIn(moy[1], scale=1.6), run_time=0.35)
        self.au_mot("Raté")
        rate = self.t("Raté !", 60, ROUGE_ERREUR).move_to(P(0, 3.25))
        croix = Line(moy.get_left() + LEFT * 0.05, moy.get_right() + RIGHT * 0.05, color=ROUGE_ERREUR, stroke_width=7)
        self.play(FadeOut(titre2), ReplacementTransform(titre, rate), Create(croix), run_time=0.4)
        self.play(Wiggle(rate), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : 20 disques : 1 tube, E = 850 €, 1 fois sur 2 : 500 € ──
        self.dire("01-image")
        disques = VGroup()
        for n, coul in zip(COMPTES, COUL_N):
            disques.add(*[disque(coul) for _ in range(n)])
        disques.arrange_in_grid(rows=4, cols=5, buff=0.14).move_to(P(0, 0.6))
        tube = disques[-1]
        self.au_mot("Le tube")
        un20 = self.t("1 fois sur 20", 50, COUL_N[3]).move_to(P(0, 3.25))
        self.play(FadeOut(VGroup(r, c, tel, vals, moy, croix)), ReplacementTransform(rate, un20),
                  LaggedStart(*[FadeIn(d, scale=0.5) for d in disques], lag_ratio=0.03), run_time=0.8)
        self.play(tube.animate.scale(1.7).rotate(PI), run_time=0.35)
        self.play(tube.animate.scale(1 / 1.7).rotate(PI), run_time=0.35)
        q4 = self.t("4 000 €", 34, COUL_N[3]).next_to(disques, DOWN, buff=0.12).align_to(disques, RIGHT)
        self.play(FadeIn(q4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Espérance")
        ex = suite(self.t("E =", 52, VERT_OK), self.t("850 €", 60, VERT_OK), buff=0.2).move_to(P(0, -1.65))
        self.play(FadeIn(ex[0], shift=UP * 0.1), FadeOut(q4), run_time=0.3)
        self.au_mot("850 euros")
        self.play(FadeIn(ex[1], scale=1.6), run_time=0.35)
        self.insister(ex[1], 1.25)
        self.au_mot("une fois sur deux")
        dix = VGroup(*disques[:10])
        self.play(*[d.animate.set_opacity(0.2) for d in disques[10:]],
                  *[Indicate(d, color=COUL_N[0], scale_factor=1.3) for d in dix], run_time=0.6)
        self.au_mot("seulement 500")
        u2 = self.t("1 fois sur 2 : 500 €", 40, ROUGE_ERREUR).move_to(P(0, -2.5))
        self.play(FadeIn(u2, scale=1.3), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question, sur le tableau de loi du coach ──
        self.dire("02-question")
        toi = self.t("Et toi ?", 56, JAUNE_TITRE).move_to(P(0, 3.25))
        tab = TableauLoi([lab_xi(24), self.t("P", 26, "#0F172A")], [T_VALS, T_PROBS], coin=P(-2.09, 1.35),
                         larg_lab=0.46, larg=0.93, h=0.62, fs=19)
        self.play(ReplacementTransform(un20, toi), FadeOut(VGroup(disques, ex, u2)), FadeIn(tab.fonds),
                  FadeIn(tab.labs), run_time=0.5)
        reperes = [("500 euros", "0,5 ;"), ("800,", "0,25"), ("1 000,", "0,2 ;"), ("4 000,", "0,05.")]
        for j, (m1, m2) in enumerate(reperes):
            self.au_mot(m1)
            self.play(tab.poser(0, j), run_time=0.25)
            self.au_mot(m2)
            self.play(tab.poser(1, j), run_time=0.25)
        self.au_mot("plus de 900")
        q = suite(self.t("P(X > 900)", 46), self.t("= ?", 50, ORANGE_RETENUE), buff=0.2)
        self.cap(q, 3.7).move_to(P(0, -0.65))
        self.play(FadeIn(q, scale=1.3), *tab.allumer(2), *tab.allumer(3), run_time=0.5)
        self.insister(q[1], 1.3)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 50, VERT_OK, largeur=3.8), self.t("commentaire !", 50, VERT_OK, largeur=3.8))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.1))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 03 : la fin : « Entraîne-toi sur eleveai.fr. Et abonne-toi ! » ──
        self.fin_short("03-abonne", [toi, tab, *[v for ligne in tab.val for v in ligne], q, appel, badge])

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
