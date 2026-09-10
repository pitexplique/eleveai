# temperature_altitude.py
# EleveAI — « Maths Réel · 974 » — La température et l'altitude
#
# ⭐ PREMIER SHORT DE LA SÉRIE « UNE CARTE, TOUS LES NIVEAUX » (10/09/2026).
# Frédéric, devant une carte météo : « et si on faisait des shorts sur la carte
# de la Réunion — CP jusqu'en terminale ». Le même fait — quinze degrés d'écart
# sur soixante kilomètres — porte huit vidéos : au CP on le CONSTATE, ici on le
# MODÉLISE.
#
# ⛔ CE N'EST PAS UNE VIDÉO DE NOTION. Pas de notionId, pas de fiche, pas de
# playlist « Maths seconde » : cette série vit dans « Maths Réel · 974 »
# (`/maths-974`), et son écran de fin renvoie à la rubrique, pas à une vidéo
# longue qui n'existe pas.
#
# ⭐ MAIS ELLE S'APPUIE SUR LE COACH. Le geste enseigné ici est le micro
# `affine_forme` de la seconde — « Reconnaitre une fonction affine f(x) = ax+b ».
# L'élève qui vient du short trouve de quoi s'entraîner.
#
# La carte, les lieux et le gradient viennent de `manim/carte_reunion.py`.
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/974/temperature_altitude.py TemperatureAltitude974 -o eleveai-maths-974-temperature-altitude --media_dir manim/scripts/974/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from carte_reunion import LIEUX, PENTE, PENTE_100, T0, CarteReunion, temperature
from gabarit_seconde import SONS, ShortSeconde

VOIX = SONS / "974-temperature-altitude-seconde"


class TemperatureAltitude974(ShortSeconde):

    dossier_voix = VOIX

    # ── écran 1 : l'accroche — la carte et les deux extrêmes ────────────────

    def ecran_accroche(self):
        self.clear()
        self.dire("00-accroche")

        # ⚠️ Carte décalée vers la DROITE : Saint-Gilles est sur la côte OUEST,
        # et son étiquette sortait du cadre par la gauche (premier tirage).
        carte = CarteReunion(hauteur=3.2, centre=[0.35, 0.9, 0])
        self.add(carte.mer())
        ile = carte.contour()
        # ⭐ Tout est posé en une demi-seconde : à UNE SECONDE, YouTube prélève
        # l'image du flux, et les deux nombres doivent déjà s'y opposer.
        self.play(FadeIn(ile), run_time=0.45)

        # ⛔ LES DEUX NOMBRES DOIVENT ÊTRE VISIBLES À UNE SECONDE — c'est l'image
        # que YouTube prélève. Les étiquettes partent donc vers l'INTÉRIEUR de
        # l'île, jamais vers le bord qu'elles longent.
        chaud = carte.pastille("Saint-Gilles", "26°", couleur=JAUNE_TITRE,
                               taille=44, direction=DR, buff=0.10)
        froid = carte.pastille("Le Maïdo", "11°", couleur=BLEU_CALCUL,
                               taille=44, direction=UR, buff=0.10)
        self.play(FadeIn(chaud), FadeIn(froid), run_time=0.4)

        q = VGroup(
            self.grand("le même matin", font_size=34, color=WHITE),
            self.grand("20 km d'écart", font_size=38, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.22).move_to([0, -2.1, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.play(Flash(froid[1], color=BLEU_CALCUL, line_length=0.3))
        self.attendre_voix(marge=0.4)

    # ── écran 2 : la cause, c'est l'altitude ───────────────────────────────

    def ecran_altitude(self):
        self.clear()
        self.margo_bas()
        self.dire("01-altitude")
        self.play(Write(self.grand("Pas la distance", font_size=40, color=WHITE).move_to([0, 3.15, 0])))
        self.play(Write(self.grand("L'ALTITUDE", font_size=56, color=JAUNE_TITRE).move_to([0, 2.5, 0])))

        # Une coupe : la mer, et le sommet.
        sol = Line([-1.9, -0.9, 0], [1.9, -0.9, 0], color=WHITE, stroke_width=3)
        montagne = Polygon([-1.9, -0.9, 0], [0.1, 1.5, 0], [1.9, -0.9, 0],
                           color=VERT_OK, stroke_width=3)
        montagne.set_fill(VERT_OK, opacity=0.25)
        self.play(Create(sol), Create(montagne))

        bas = VGroup(
            Text("Saint-Gilles", font_size=24, color=JAUNE_TITRE),
            Text("0 m  ·  26°", font_size=28, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.12).move_to([0, -1.6, 0])
        haut = VGroup(
            Text("Le Maïdo", font_size=24, color=BLEU_CALCUL),
            Text("2200 m  ·  11°", font_size=28, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.12).move_to([0, 2.0 - 3.6, 0])
        haut.move_to([0, 0.55, 0])
        self.play(FadeIn(bas, shift=UP * 0.12))
        self.play(FadeIn(haut, shift=DOWN * 0.12))
        self.attendre_voix(marge=0.4)

    # ── écran 3 : le gradient ───────────────────────────────────────────────

    def ecran_gradient(self):
        self.clear()
        self.margo_bas()
        self.dire("02-gradient")
        self.play(Write(self.grand("La règle", font_size=44, color=JAUNE_TITRE).move_to([0, 3.15, 0])))

        bloc = VGroup(
            self.grand("− 0,65 °C", font_size=76, color=BLEU_CALCUL),
            self.grand("tous les 100 m", font_size=44, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.7, 0])
        cadre = SurroundingRectangle(bloc, color=BLEU_CALCUL, buff=0.32, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        self.play(Flash(bloc[0], color=BLEU_CALCUL, line_length=0.35))

        note = VGroup(
            self.grand("la même partout", font_size=34, color=WHITE),
            self.grand("sur Terre", font_size=34, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.7, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    # ── écran 4 : LA FONCTION AFFINE ───────────────────────────────────────

    def ecran_affine(self):
        self.clear()
        self.margo_bas()
        self.dire("03-affine")
        self.play(Write(self.grand("Une FONCTION AFFINE", font_size=40,
                                   color=JAUNE_TITRE).move_to([0, 3.2, 0])))

        formule = self.grand("T = 26 − 0,0065 × h", font_size=48, color=WHITE)
        formule.move_to([0, 2.55, 0])
        self.play(FadeIn(formule, shift=DOWN * 0.12))

        # Le graphique : la droite qui traverse toute l'île.
        # ⚠️ Descendu et rétréci : les graduations du haut de l'axe vertical
        # venaient toucher la formule (premier tirage).
        axes = self.axes_notion([0, 3200, 1000], [0, 30, 10],
                                x_length=3.3, y_length=2.2, font_size=15)
        axes.move_to([0.2, 0.55, 0])
        self.play(Create(axes))
        droite = axes.plot(lambda h: temperature(h), x_range=[0, 3100, 50],
                           color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(droite))

        for nom, coul in [("Saint-Gilles", JAUNE_TITRE), ("Le Maïdo", BLEU_CALCUL)]:
            _, _, alt, t = LIEUX[nom]
            self.play(GrowFromCenter(Dot(axes.c2p(alt, t), color=coul, radius=0.08)),
                      run_time=0.35)

        lecture = VGroup(
            self.grand("26 : au niveau de la mer", font_size=26, color=JAUNE_TITRE),
            self.grand("la pente est NÉGATIVE", font_size=28, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.22).move_to([0, -1.35, 0])
        self.play(FadeIn(lecture, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    # ── écran 5 : la vérification ──────────────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        self.margo_bas()
        self.dire("04-verifier")
        self.play(Write(self.grand("Le Piton des Neiges", font_size=38,
                                   color=JAUNE_TITRE).move_to([0, 3.2, 0])))

        suite = VGroup(
            self.grand("3070 m", font_size=52, color=WHITE),
            self.grand("26 − 0,0065 × 3070", font_size=36, color=BLEU_CALCUL),
            self.grand("≈ 6 °C", font_size=76, color=VERT_OK),
        ).arrange(DOWN, buff=0.35).move_to([0, 1.5, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Flash(suite[2], color=VERT_OK, line_length=0.4))

        chute = VGroup(
            self.grand("et c'est bien", font_size=32, color=WHITE),
            self.grand("ce qu'on y relève", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.1, 0])
        self.play(FadeIn(chute, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    # ── écran 6 : le renvoi, propre à la série ─────────────────────────────

    def ecran_renvoi(self, voix="05-fin"):
        """⛔ PAS le renvoi des shorts de notion : cette série n'a pas de vidéo
        longue derrière elle. Elle renvoie à SA rubrique."""
        self.clear()
        self.margo_bas()
        self.dire(voix)

        titre = VGroup(
            self.grand("Maths Réel", font_size=48, color=JAUNE_TITRE),
            self.grand("· 974 ·", font_size=36, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.15).move_to([0, 2.3, 0])
        self.play(FadeIn(titre, shift=DOWN * 0.12))

        site = self.grand("eleveai.fr", font_size=54, color=BLEU_CALCUL).move_to([0, 0.9, 0])
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre))
        self.play(Flash(site, color=BLEU_CALCUL, line_length=0.3))

        sous = self.grand("les maths de l'île", font_size=34, color=VERT_OK).move_to([0, -0.5, 0])
        self.play(FadeIn(sous, shift=UP * 0.12))

        auteur = VGroup(
            self.grand("Frédéric Lacoste", font_size=26, color=WHITE),
            self.grand("La Réunion", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.15).move_to([0, -1.6, 0])
        self.play(FadeIn(auteur))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_altitude()
        self.ecran_gradient()
        self.ecran_affine()
        self.ecran_verifier()
        self.ecran_renvoi()
