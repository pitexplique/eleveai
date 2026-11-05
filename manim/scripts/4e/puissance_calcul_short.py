# puissance_calcul_short.py
# EleveAI — Maths 4e — série PUISSANCES, épisode 07 « calcul », le SHORT
# ceinture BLANCHE « Le jeu des zéros » : 10² × 10⁴ = 10⁶, pas 10⁸.
#   · ACCROCHE : en bas 10² × 10⁴ = 10⁸ ? → « Perdu ! », le 10⁸ barré ROUGE ;
#   · EN HAUT, l'image : « 100 » et « 10 000 », leurs zéros ORANGE glissent et
#     se rassemblent en UNE rangée de 6 zéros : 1 000 000 ;
#   · EN BAS, au même instant : l'exposant 2 (puis 4) s'allume quand ses
#     zéros s'allument, « 2 + 4 = 6 » se remplit, puis = 10⁶ ;
#   · 1 question-pause (3 s) : 10⁴ × 10⁴ → 10¹⁶ / 10⁸ / 20⁸ ;
#   · fin : 10⁷ ÷ 10³, réponse en commentaire, puis la fin standard.
# Micro du coach : 4e puissance_calcul.
# Centres d'intérêt : jeux-defis.
#
# Voix : manim/voix/4e-puissance-calcul-short.json (validée), débit −6 ; WAV :
# public/sons/4e-puissance-calcul-short/ ; marques :
# manim/scripts/4e/puissance_calcul_short_marques.json (copie corrigée de
# cues2marques.py : « 10 puissance », « 4 zéros » répétés gardent chacun leur instant).
# Outils : OutilsCalcul, puiss, suite… importés de puissance_calcul.py (la paysage).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_calcul_short.py PuissanceCalculShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_calcul_short.py PuissanceCalculShort -o eleveai-maths-4e-puissance-calcul-short --media_dir manim/scripts/4e/media-puiss-07-short
# Sortie : manim/sorties/4e/maths/puissances/07-calcul/eleveai-maths-4e-puissance-calcul-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from puissance_calcul import (OutilsCalcul, T, puiss, suite, ligne_base, pied, sans_audit,  # noqa: E402
                              barre_oblique, EXPO_C, BASE_C, PIEGE)

Y_CENT, Y_DIXM, Y_RANG = 1.82, 1.1, 0.38   # en haut : 100, × 10 000, la rangée (fs 46 : aérées)
Y_PROD, Y_EGAL, Y_SOM = -0.6, -1.45, -2.3   # en bas : 10² × 10⁴, = 10⁶, 2 + 4 = 6


def zeros_orange(t, depuis):
    """Les chiffres 0 d'un Text (à partir du glyphe `depuis`) en ORANGE."""
    cs = [c for c in t.text if not c.isspace()]
    zs = VGroup(*[g for c, g in list(zip(cs, t.submobjects))[depuis:] if c == "0"])
    zs.set_color(EXPO_C)
    return zs


class PuissanceCalculShort(OutilsCalcul, ShortProp):
    nom_voix = "4e-puissance-calcul-short"
    fichier_marques = "puissance_calcul_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """« Question ! » et le compte à rebours reculent vers la gauche (3 %) ;
        la question écrite plus grande."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = rebours.get_right()[0] - 1.9
        if d > 0:
            tete.shift(LEFT * d)
            rebours.shift(LEFT * d)
        return tete, q, cartes, pause, rebours, ph

    def appel_commentaire(self, y):
        self.au("Réponds en commentaire")
        appel = self.borne(T("Réponds en commentaire !", 32, VERT_OK), 0.95).move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.0)
        return appel

    def fin_short(self, voix, a_effacer):
        """La fin du 19/10 (celle des shorts des épisodes 01 à 04)."""
        self.dire(voix)
        entraine = self.borne(T("Entraîne-toi sur", 40, JAUNE_TITRE), 0.6).move_to(P(0, 2.2))
        site = T("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.25))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = T("Abonne-toi !", 42, VERT_OK).move_to(P(0, -0.2))
        poignee = T("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -1.05))
        self.play(FadeOut(Group(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)

    def carte(self):
        return RoundedRectangle(width=4.05, height=2.75, corner_radius=0.18, fill_color="#0b1220", fill_opacity=1,
                                stroke_color="#334155", stroke_width=2).move_to(P(0, -1.43))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le jeu des zéros", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : 10² × 10⁴ = 10⁸ ? Perdu ! ──
        self.dire("00-accroche")
        carte = self.carte()
        prod = suite((10, 2), "×", (10, 4), fs=58, buff=0.22).move_to(P(0, Y_PROD))
        self.au("10 puissance", Write(titre), FadeIn(carte), FadeIn(prod[0].base, scale=1.3), rt=0.45)
        self.au("2 fois", FadeIn(prod[0].expo, scale=1.6), rt=0.25)
        self.au("fois", FadeIn(prod[1]), rt=0.2)
        self.au("10 puissance", FadeIn(prod[2].base, scale=1.3), rt=0.3)
        self.au("4.", FadeIn(prod[2].expo, scale=1.6), rt=0.3)
        faux = suite("=", (10, 8, WHITE), ["?", EXPO_C], fs=58, buff=0.22)
        faux.shift(P(0, Y_EGAL) - VGroup(faux[0], faux[1]).get_center())
        faux[1].expo.set_color(PIEGE)
        self.au("10 puissance", FadeIn(faux[0]), FadeIn(faux[1].base, scale=1.3), rt=0.3)
        self.au("8 ?", FadeIn(faux[1].expo, scale=1.7), FadeIn(faux[2], scale=1.4), rt=0.3)
        perdu = T("Perdu !", 72, PIEGE).move_to(P(0, 1.35))
        barre = barre_oblique(faux[1], PIEGE, 7)
        self.au("Perdu", FadeIn(perdu, scale=1.6), Create(barre), FadeOut(faux[2]), rt=0.35)
        self.play(Wiggle(perdu, scale_value=1.15), run_time=0.6)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(perdu), FadeOut(VGroup(faux[:2], barre)), run_time=0.3)

        # ── 01 : les zéros qui glissent : 2 + 4 = 6 zéros → 10⁶ ──
        self.dire("01-zeros")
        cent = T("100", 46).move_to(P(0, Y_CENT))
        z1 = zeros_orange(cent, 1)
        dixm = suite("×", "10 000", fs=46, buff=0.22).move_to(P(0, Y_DIXM))
        z2 = zeros_orange(dixm[1], 1)
        self.au("100 fois", FadeIn(cent, scale=1.3), Indicate(prod[0], color=WHITE, scale_factor=1.2), rt=0.35)
        self.au("fois", FadeIn(dixm[0]), rt=0.15)
        self.au("10 000", FadeIn(dixm[1], scale=1.3), Indicate(prod[2], color=WHITE, scale_factor=1.2), rt=0.3)
        som = suite(["2", EXPO_C], ["+", EXPO_C], ["4", EXPO_C], ["=", EXPO_C], ["6", EXPO_C], fs=54,
                    buff=0.22).move_to(P(0, Y_SOM))
        self.au("2 zéros", Indicate(z1, color=EXPO_C, scale_factor=1.5),
                Indicate(prod[0].expo, color=EXPO_C, scale_factor=1.9), FadeIn(som[0], scale=1.4), rt=0.4)
        self.au("plus", FadeIn(som[1]), rt=0.15)
        self.au("4 zéros", Indicate(z2, color=EXPO_C, scale_factor=1.5),
                Indicate(prod[2].expo, color=EXPO_C, scale_factor=1.9), FadeIn(som[2], scale=1.4), rt=0.4)
        rang = T("1 000 000", 46).move_to(P(0, Y_RANG))
        zr = zeros_orange(rang, 1)
        un = rang[0]
        self.au("6 zéros", *[TransformFromCopy(a, b) for a, b in zip(list(z1) + list(z2), zr)],
                FadeIn(som[3]), FadeIn(som[4], scale=1.5), rt=0.8)
        self.au("1 000 000", FadeIn(un, shift=RIGHT * 0.2), z1.animate.set_opacity(0.35),
                z2.animate.set_opacity(0.35), rt=0.3)
        self.play(Indicate(zr, color=EXPO_C, scale_factor=1.25), run_time=0.4)
        bon = suite("=", (10, 6, VERT_OK), fs=58, buff=0.22).move_to(P(0, Y_EGAL))
        self.au("10 puissance", FadeIn(bon[0]), FadeIn(bon[1].base, scale=1.3), rt=0.3)
        self.au("6.", ReplacementTransform(som[4].copy(), bon[1].expo), rt=0.4)
        self.insister(bon[1].expo, 1.6, 0.2)
        cad = SurroundingRectangle(som, color=EXPO_C, buff=0.12, corner_radius=0.1, stroke_width=4)
        self.au("On additionne", Create(cad), rt=0.35)
        self.au("les exposants", Indicate(prod[0].expo, color=EXPO_C, scale_factor=1.8),
                Indicate(prod[2].expo, color=EXPO_C, scale_factor=1.8), rt=0.45)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : 10⁴ × 10⁴ ? ──
        choix = [puiss(10, 16, fs=36), puiss(10, 8, fs=36), puiss(20, 8, fs=36)]
        plans = [[("10 puissance", [choix[0].base]), ("16.", [choix[0].expo])],
                 [("10 puissance", [choix[1].base]), ("8.", [choix[1].expo])],
                 [("20 puissance", [choix[2].base]), ("8.", [choix[2].expo])]]

        def avant(sc, q):
            sc.poser_mots(q[0], [(0, "10 puissance"), (2, "4 fois"), (4, "fois"), (6, "10 puissance"), (8, "4 ?")])

        def apres(sc):
            l0 = sc.rep_compo(0, ["Réponse B :", (10, 8), "."], fs=30)  # une seule taille pour toute la réponse
            sc.au("B :", FadeIn(l0[0], shift=UP * 0.12), rt=0.25)
            sc.au("10 puissance", FadeIn(l0[1].base, shift=UP * 0.12), rt=0.25)
            sc.au("8.", FadeIn(l0[1].expo, l0[2], shift=UP * 0.12), rt=0.25)
            l1 = sc.rep_compo(1, [["4 zéros", EXPO_C], "+", ["4 zéros", EXPO_C]], fs=30)
            l2 = sc.rep_compo(2, ["=", ["8 zéros", EXPO_C]], fs=30)
            sc.au("4 zéros", FadeIn(l1[0], shift=UP * 0.12), rt=0.25)
            sc.au("plus", FadeIn(l1[1]), rt=0.15)
            sc.au("4 zéros", FadeIn(l1[2], shift=UP * 0.12), rt=0.25)
            sc.au("8 zéros", FadeIn(l2[0]), FadeIn(l2[1], scale=1.3), rt=0.3)
            sc.pieges(0, 2)
            sc.insister(l2, 1.2, 0.2)  # toute la ligne : le « 8 » ne mord plus sur le « = »

        self.qpause("01q-question", "01r-reponse", choix, plans, 1,
                    ["Réponse B : 10⁸.", "4 zéros + 4 zéros", "= 8 zéros"],
                    avant=avant, apres=apres, question=["10⁴ × 10⁴ ?"])
        self.vider(garder)

        # ── 02 : la question en commentaire : 10⁷ ÷ 10³ ──
        self.dire("02-question")
        carte = self.carte()
        haut = T("10 000 000", 50, audit=False).move_to(P(0, 1.75))
        zeros_orange(haut, 1)
        div = sans_audit(suite("÷", "1 000", fs=50, buff=0.25)).move_to(P(0, 0.95))
        zeros_orange(div[1], 1)
        q = suite((10, 7), "÷", (10, 3), "=", ["?", EXPO_C], fs=44, buff=0.18).move_to(P(0, -0.95))
        self.au("Et 10", FadeIn(carte), rt=0.3)
        self.au("10 puissance", FadeIn(q[0].base, scale=1.3), rt=0.3)
        self.au("7 divisé", FadeIn(q[0].expo, scale=1.6), FadeIn(haut, scale=1.1), rt=0.35)
        self.au("divisé", FadeIn(q[1]), FadeIn(div[0]), rt=0.2)
        self.au("10 puissance", FadeIn(q[2].base, scale=1.3), rt=0.3)
        self.au("3 ?", FadeIn(q[2].expo, scale=1.6), FadeIn(q[3]), FadeIn(q[4], scale=1.5), FadeIn(div[1], scale=1.1),
                rt=0.35)
        self.insister(q[4], 1.4, 0.2)
        self.appel_commentaire(-2.2)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
