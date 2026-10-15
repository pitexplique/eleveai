# nombres_premiers_short.py
# EleveAI — « Les bases » — le short des nombres premiers : 13 billes, impossible.
#
# ⭐ 07/10/2026 — Frédéric : « on peut en faire une vidéo paysage et un short »,
# voix validée (« go ») : manim/voix/bases-nombres-premiers-short.json (−7).
# ⛔ Zone sûre : rien de vital au-dessus de y = +3,0 ni sous y = −2,2.
#
# Rendu :
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/bases/nombres_premiers_short.py ShortTreizeBilles -o eleveai-maths-bases-nombres-premiers-short --media_dir manim/scripts/bases/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_bases import ShortBases
from gabarit_sixieme import _Voix6e
from multiplication_division_shorts import _ShortMultiplication
from nombres_premiers import _Billes


class ShortTreizeBilles(_Billes, _ShortMultiplication):

    nom_voix = "bases-nombres-premiers-short"

    def construct(self):
        # 00 — ⭐ l'image de la première seconde : 12 en rectangle, 13 qui déborde
        self.ecran("00-accroche")
        g12 = self.jetons(3, 4, pas=0.55, rayon=0.2).move_to([0, 1.8, 0])
        l12 = self.grand("12 billes", font_size=44, color=VERT_OK).next_to(g12, UP, buff=0.3)
        self.add(g12, l12)
        self.au_mot("13 billes")
        g13, _, _ = self.essai(13, 3, pas=0.55, rayon=0.2)
        g13.move_to([0, -0.85, 0])
        l13 = self.grand("13 billes", font_size=44, color=ROUGE_ERREUR).next_to(g13, UP, buff=0.3)
        self.play(FadeIn(g13), FadeIn(l13))
        self.au_mot("impossible")
        self.play(GrowFromCenter(self.grand("impossible ?", font_size=48, color=ROUGE_ERREUR).move_to([0, -2.05, 0])))
        self.attendre_voix(marge=0.3)

        # 01 — 12 billes : deux rectangles
        self.ecran("01-douze")
        self.add(self.grand("12 billes", font_size=48, color=VERT_OK).move_to([0, 2.7, 0]))
        self.au_mot("2 rangées de 6")
        a = self.jetons(2, 6, pas=0.5, rayon=0.18).move_to([0, 1.5, 0])
        self.play(FadeIn(a), *[Create(self.cadre(l, VERT_OK, buff=0.07)) for l in a])
        self.play(FadeIn(self.grand("2 × 6", font_size=40).next_to(a, DOWN, buff=0.25)))
        self.au_mot("3 rangées de 4")
        b = self.jetons(3, 4, pas=0.5, rayon=0.18).move_to([0, -0.6, 0])
        self.play(FadeIn(b), *[Create(self.cadre(l, ORANGE_RETENUE, buff=0.07)) for l in b])
        self.play(FadeIn(self.grand("3 × 4", font_size=40).next_to(b, DOWN, buff=0.25)))
        self.attendre_voix(marge=0.3)

        # 02 — 13 billes : ça ne tombe jamais juste
        self.ecran("02-treize")
        self.add(self.grand("13 billes", font_size=48, color=ROUGE_ERREUR).move_to([0, 2.9, 0]))
        for extrait, rangees, y in [("en 2 rangées", 2, 1.75), ("En 3 rangées", 3, 0.2), ("En 4 rangées", 4, -1.65)]:
            self.au_mot(extrait)
            g, _, _ = self.essai(13, rangees, pas=0.4, rayon=0.14)
            g.move_to([0, y, 0])
            lbl = self.grand(f"{rangees} rangées", font_size=26).next_to(g, UP, buff=0.12)
            self.play(FadeIn(g), FadeIn(lbl), run_time=0.6)
        self.attendre_voix(marge=0.3)

        # 03 — une seule rangée : nombre premier
        self.ecran("03-premier")
        self.au_mot("une seule rangée")
        r = self.rangee(13, pas=0.3, rayon=0.11).move_to([0, 2.1, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in r], lag_ratio=0.04))
        self.play(Create(self.cadre(r, VERT_OK, buff=0.08)))
        self.play(FadeIn(self.grand("une seule rangée", font_size=34, color=VERT_OK).move_to([0, 1.3, 0])))
        self.au_mot("C'est un nombre premier")
        np_ = VGroup(self.grand("13 est un", font_size=56, color=JAUNE_TITRE),
                     self.grand("nombre premier", font_size=56, color=JAUNE_TITRE)).arrange(DOWN, buff=0.15)
        np_.move_to([0, -0.1, 0])
        self.play(GrowFromCenter(np_))
        self.au_mot("deux diviseurs")
        self.play(FadeIn(self.grand("2 diviseurs, 1 et 13", font_size=38, color=BLEU_CALCUL).move_to([0, -1.6, 0])))
        self.attendre_voix(marge=0.3)

        # 04 — le défi
        self.ecran("04-defi")
        self.play(Write(self.grand("À toi !", font_size=60, color=JAUNE_TITRE).move_to([0, 2.4, 0])))
        self.au_mot("17 billes")
        self.play(Write(self.grand("17 billes", font_size=72, color=BLEU_CALCUL).move_to([0, 0.9, 0])))
        self.play(FadeIn(VGroup(self.grand("des groupes", font_size=44),
                                self.grand("égaux ?", font_size=44)).arrange(DOWN, buff=0.15).move_to([0, -0.6, 0])))
        self.attendre_voix(marge=1.5)

        # 05 — la fin
        self.fin("05-fin")


# ══════════════════════════════════════════════════════════════════════════════
# 2 · Défi mémoire : les 15 nombres premiers jusqu'à 50
# ══════════════════════════════════════════════════════════════════════════════
# ⭐ 07/10/2026 — Frédéric : « défi : retiens le plus de nombres premiers
# possible, avec un défi à la fin ». Voix validée : bases-nombres-premiers-short-memoire.json.
# ⭐ Chaque nombre GROSSIT puis reprend sa taille quand la voix le dit — c'est sa
# règle du 07/10 pour insister (pas de zoom de caméra).
# ⚠️ Le compte à rebours est un `Text` redessiné : `Integer`/`DecimalNumber`
# passent par LaTeX, absent du poste.

PREMIERS_50 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
# L'extrait de la voix où chaque nombre est dit (premier endroit où il apparaît).
REPERES = ["2,", "3, 5", "5, 7", "7. 11", "11", "13", "17", "19", "23", "29", "31", "37", "41", "43", "47"]


class ShortMemoire(_Billes, _ShortMultiplication):

    nom_voix = "bases-nombres-premiers-short-memoire"

    def grille_nombres(self):
        g = VGroup()
        for i, n in enumerate(PREMIERS_50):
            r, c = divmod(i, 3)
            g.add(self.grand(str(n), font_size=60, color=WHITE).move_to([(c - 1) * 1.4, 1.75 - r * 0.92, 0]))
        return g

    def construct(self):
        # 00 — ⭐ l'image de la première seconde : le défi, en grand
        self.ecran("00-accroche")
        titre = VGroup(self.grand("DÉFI", font_size=96, color=JAUNE_TITRE),
                       self.grand("MÉMOIRE", font_size=96, color=JAUNE_TITRE)).arrange(DOWN, buff=0.15)
        titre.move_to([0, 1.7, 0])
        self.add(titre)
        self.au_mot("nombres premiers")
        self.play(FadeIn(VGroup(self.grand("Retiens un max de", font_size=36),
                                self.grand("nombres premiers", font_size=36, color=BLEU_CALCUL))
                         .arrange(DOWN, buff=0.12).move_to([0, -0.15, 0])))
        self.au_mot("quinze secondes")
        chrono = self.grand("15 s", font_size=80, color=ORANGE_RETENUE).move_to([0, -1.5, 0])
        self.play(GrowFromCenter(chrono))
        self.au_mot("Prêt")
        self.play(Indicate(chrono, scale_factor=1.3, color=ORANGE_RETENUE))
        self.attendre_voix(marge=0.2)

        # 01 — la liste, chaque nombre grossit quand il est dit, le chrono tourne
        self.ecran("01-liste")
        temps = ValueTracker(15)
        temps.add_updater(lambda m, dt: m.set_value(max(0, m.get_value() - dt)))
        self.add(temps)
        chrono = always_redraw(lambda: self.grand(f"{math.ceil(temps.get_value())} s", font_size=56,
                                                  color=ORANGE_RETENUE if temps.get_value() > 0 else ROUGE_ERREUR)
                               .move_to([0, 2.85, 0]))
        self.add(chrono)
        g = self.grille_nombres()
        for n, rep in zip(g, REPERES):
            self.au_mot(rep)
            n.set_color(VERT_OK)
            self.play(FadeIn(n, scale=1.6), run_time=0.25)
            self.play(n.animate.scale(1.35), run_time=0.15)
            self.play(n.animate.scale(1 / 1.35), run_time=0.15)
        # ⭐ Le chrono a promis quinze secondes : l'écran les tient jusqu'au bout.
        reste = temps.get_value()
        self.attendre_voix(marge=max(0.4, reste + 0.4))
        temps.clear_updaters()

        # 02 — l'astuce : le dernier chiffre
        self.ecran("02-astuce")
        g = self.grille_nombres()
        for n in g:
            n.set_color(VERT_OK)
        self.add(g)
        self.au_mot("à part 2 et 5")
        self.play(*[g[i].animate.set_color(ORANGE_RETENUE).scale(1.4) for i in (0, 2)])
        self.play(*[g[i].animate.scale(1 / 1.4) for i in (0, 2)])
        self.au_mot("1, 3, 7 ou 9")
        autres = [n for i, n in enumerate(g) if i not in (0, 2)]
        self.play(*[n[-1].animate.set_color(JAUNE_TITRE).scale(1.5) for n in autres], run_time=0.6)
        self.play(*[n[-1].animate.scale(1 / 1.5) for n in autres], run_time=0.4)
        self.play(FadeIn(self.grand("finissent par 1, 3, 7 ou 9", font_size=30, color=JAUNE_TITRE).move_to([0, 2.85, 0])))
        self.attendre_voix(marge=0.3)

        # 03 — on cache tout
        self.ecran("03-cache")
        g = self.grille_nombres()
        for n in g:
            n.set_color(VERT_OK)
        self.add(g)
        self.au_mot("Je cache tout")
        caches = VGroup(*[RoundedRectangle(width=1.1, height=0.72, corner_radius=0.12, stroke_color=GREY_B,
                                           stroke_width=2).set_fill(GREY_E, opacity=1).move_to(n) for n in g])
        self.play(LaggedStart(*[FadeTransform(n, c) for n, c in zip(g, caches)], lag_ratio=0.04), run_time=1.2)
        self.au_mot("Combien")
        q = self.grand("?", font_size=160, color=JAUNE_TITRE).move_to([0, -0.1, 0])
        self.play(GrowFromCenter(q))
        self.play(Wiggle(q))
        self.attendre_voix(marge=0.3)

        # 04 — le défi
        self.ecran("04-defi")
        self.play(Write(self.grand("À toi !", font_size=60, color=JAUNE_TITRE).move_to([0, 2.6, 0])))
        self.au_mot("écris en commentaire")
        self.play(FadeIn(VGroup(self.grand("Écris-les", font_size=44),
                                self.grand("en commentaire", font_size=44)).arrange(DOWN, buff=0.12).move_to([0, 1.4, 0])))
        self.au_mot("quinze sur quinze")
        score = self.grand("15 / 15 ?", font_size=72, color=VERT_OK).move_to([0, 0.1, 0])
        self.play(GrowFromCenter(score))
        self.play(score.animate.scale(1.3), run_time=0.2)
        self.play(score.animate.scale(1 / 1.3), run_time=0.2)
        self.au_mot("en bonus")
        bonus = VGroup(self.grand("Bonus", font_size=40, color=ORANGE_RETENUE),
                       self.grand("le premier après 47 ?", font_size=40, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.12)
        bonus.move_to([0, -1.5, 0])
        self.play(FadeIn(bonus, shift=UP * 0.15))
        self.attendre_voix(marge=1.5)

        # 05 — la fin de la série
        self.ecran_renvoi("05-fin")
