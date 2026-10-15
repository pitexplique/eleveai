# reels_short_moinsx.py
# EleveAI — Maths seconde — le short « −x est parfois positif »
# (notionId : reels_intervalles — micro `valeur_absolue_distance`)
#
# ⭐ 21/09/2026 — le JUMEAU de `reels_short_0999.py`, voulu par Frédéric (« il
# faut short 1 et 2 »). Même notion, même HEURE de publication, mais à un ou deux
# jours d'écart : c'est sa cadence du 12/09 (une rubrique ne reçoit qu'une vidéo
# tous les 1 à 2 jours — deux shorts du même sujet le même soir se disputent le
# même fil, et on ne sait plus lire lequel a marché). La paire reste un test :
# « 0,999… = 1 » est un paradoxe CÉLÈBRE ; celui-ci est
# inconnu, mais c'est l'erreur réelle de la classe — un élève lit le « − » de
# −x comme « négatif », et écrit |π − 4| = π − 4. Si les deux montent, c'est la
# FORME qui voyage ; si seul le premier monte, c'était sa renommée.
#
# ⛔ Le titre dit « PARFOIS » : « −x est positif » tout court serait faux, et une
# chaîne qui apprend à vérifier ne s'offre pas une accroche fausse.
# ⛔ Le piège et le défi sont ceux de la feuille
# `lib/fiches-exercices/maths-seconde-reels.tsx` (|π − 4| = 4 − π).
# ⛔ FICHIER À PART, pas de LaTeX, aucune étiquette de classe : voir l'en-tête
# de `reels_short_0999.py`.
#
# Voix : powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/seconde-reels-short-moinsx.json -Debit -4
# Rendu :
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/seconde/reels_short_moinsx.py Reels2deShortMoinsX -o eleveai-maths-seconde-reels-intervalles-short-moinsx --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, ShortSeconde

VOIX_MOINSX = SONS / "seconde-reels-short-moinsx"


class Reels2deShortMoinsX(ShortSeconde):
    """L'ERREUR — le « − » de −x lu comme « négatif »."""

    dossier_voix = VOIX_MOINSX

    def borner(self, mobject, marge=0.5):
        """Le cadre vertical fait 4,5 unités : tout groupe composé passe ici."""
        largeur_max = config.frame_width - marge
        if mobject.width > largeur_max:
            mobject.scale_to_fit_width(largeur_max)
        return mobject

    def droite_opposes(self, y, longueur=3.9):
        """La droite de −4 à 4 ; seules −3, 0 et 3 sont étiquetées, à la main
        (`include_numbers` écrirait « -3 » avec un trait d'union)."""
        axe = NumberLine(x_range=[-4, 4, 1], length=longueur, include_numbers=False,
                         color=WHITE, tick_size=0.07).move_to([0, y, 0])
        etiquettes = VGroup(*[
            Text(t, font_size=26, color=WHITE).next_to(axe.n2p(v), DOWN, buff=0.22)
            for v, t in ((-3, "−3"), (0, "0"), (3, "3"))
        ])
        return axe, etiquettes

    # ── les écrans ──────────────────────────────────────────────────────────

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        l1 = self.grand("−x", font_size=130, color=WHITE).move_to([0, 2.15, 0])
        l2 = self.grand("est parfois", font_size=50, color=JAUNE_TITRE).move_to([0, 0.85, 0])
        l3 = self.grand("POSITIF", font_size=84, color=JAUNE_TITRE).move_to([0, -0.1, 0])
        # ⭐ l'image de la 1re seconde porte déjà la contradiction entière
        self.add(l1, l2, l3)
        self.play(Flash(l3, color=JAUNE_TITRE, line_length=0.4))
        l4 = Text("oui, positif", font_size=40, color=ORANGE_RETENUE).move_to([0, -1.35, 0])
        self.play(FadeIn(l4, shift=UP * 0.15))
        self.attendre_voix(marge=0.4)

    def ecran_reflexe(self):
        self.clear()
        self.margo_bas()
        self.dire("01-reflexe")
        self.play(Write(Text("Le réflexe", font_size=36, color=ROUGE_ERREUR).move_to([0, 2.9, 0])))
        faux = VGroup(
            Text("un « − » devant", font_size=42, color=WHITE),
            Text("donc négatif", font_size=48, color=WHITE),
        ).arrange(DOWN, buff=0.2)
        self.borner(faux, marge=0.8).move_to([0, 1.4, 0])
        self.play(FadeIn(faux))
        self.play(Create(Line(faux.get_corner(DL), faux.get_corner(UR), color=ROUGE_ERREUR, stroke_width=7)))
        self.play(Write(Text("c'est FAUX", font_size=46, color=ROUGE_ERREUR).move_to([0, -0.4, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_essai(self):
        self.clear()
        self.margo_bas()
        self.dire("02-essai")
        self.play(Write(Text("Essaie : x = −3", font_size=38, color=JAUNE_TITRE).move_to([0, 2.9, 0])))

        calcul = self.grand("−x = −(−3)", font_size=50, color=WHITE).move_to([0, 1.95, 0])
        resultat = self.grand("= 3", font_size=76, color=VERT_OK).move_to([0, 1.0, 0])
        self.play(FadeIn(calcul))
        self.play(FadeIn(resultat, scale=1.2))

        axe, etiquettes = self.droite_opposes(y=-0.55)
        self.play(Create(axe), FadeIn(etiquettes))
        x = Dot(axe.n2p(-3), radius=0.1, color=ROUGE_ERREUR)
        # VU AU RENDU : posées à la verticale du point, les deux lettres étaient
        # traversées par les bouts de l'arc. Elles s'écartent vers l'extérieur.
        tx = Text("x", font_size=30, color=ROUGE_ERREUR).next_to(x, UP, buff=0.18).shift(LEFT * 0.28)
        self.play(FadeIn(x, scale=1.5), FadeIn(tx))

        # ⚠️ Tracé de gauche à droite avec un angle NÉGATIF : l'arc passe AU-DESSUS.
        arc = ArcBetweenPoints(axe.n2p(-3) + UP * 0.12, axe.n2p(3) + UP * 0.12,
                               angle=-PI / 2.6, color=ORANGE_RETENUE, stroke_width=4)
        voyageur = Dot(axe.n2p(-3), radius=0.1, color=VERT_OK)
        self.play(Create(arc), MoveAlongPath(voyageur, arc), run_time=1.4)
        voyageur.move_to(axe.n2p(3))
        tmx = Text("−x", font_size=30, color=VERT_OK).next_to(voyageur, UP, buff=0.18).shift(RIGHT * 0.3)
        self.play(FadeIn(tmx))

        sens = VGroup(
            Text("« − » veut dire", font_size=30, color=ORANGE_RETENUE),
            Text("l'OPPOSÉ", font_size=40, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.14).move_to([0, -1.75, 0])
        self.play(FadeIn(sens, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("03-piege")
        self.play(Write(Text("Le piège de |x|", font_size=38, color=JAUNE_TITRE).move_to([0, 2.9, 0])))

        negatif = VGroup(
            self.grand("π − 4 ≈ −0,86", font_size=44, color=WHITE),
            Text("négatif", font_size=30, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.16).move_to([0, 1.85, 0])
        self.play(FadeIn(negatif[0]))
        self.play(FadeIn(negatif[1]))

        l1 = self.borner(Text("|π − 4| = −(π − 4)", font_size=44, color=WHITE), marge=0.6).move_to([0, 0.55, 0])
        l2 = self.grand("= 4 − π", font_size=72, color=VERT_OK).move_to([0, -0.4, 0])
        self.play(FadeIn(l1))
        self.play(FadeIn(l2, scale=1.15))
        self.play(Circumscribe(l2, color=VERT_OK, buff=0.18))

        note = VGroup(
            Text("une valeur absolue", font_size=32, color=ORANGE_RETENUE),
            Text("n'est JAMAIS", font_size=32, color=ORANGE_RETENUE),
            Text("négative", font_size=32, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.12)
        self.borner(note, marge=0.6).move_to([0, -1.7, 0])
        self.play(FadeIn(note))
        self.attendre_voix(marge=0.4)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("04-defi")
        self.play(Write(Text("À toi", font_size=44, color=ORANGE_RETENUE).move_to([0, 2.6, 0])))
        defi = self.grand("|3 − π| = ?", font_size=84, color=JAUNE_TITRE).move_to([0, 1.0, 0])
        self.play(FadeIn(defi, scale=1.15))
        self.play(Flash(defi, color=JAUNE_TITRE, line_length=0.4))
        indice = VGroup(
            Text("π ≈ 3,14", font_size=34, color=WHITE),
            Text("positif, ou négatif ?", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.16).move_to([0, -0.8, 0])
        self.play(FadeIn(indice))
        self.attendre_voix(marge=0.9)

    def construct(self):
        self.ecran_accroche()
        self.ecran_reflexe()
        self.ecran_essai()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_renvoi()
