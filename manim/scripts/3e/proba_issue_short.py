# proba_issue_short.py
# EleveAI — Maths 3e — short jumeau des probabilités, épisode 2 : les issues.
# CEINTURE BLANCHE. Il AMUSE : en HAUT le chapeau, les étiquettes BANANE qui
# volent ; en BAS la liste B, A, N, E qui se remplit EN MÊME TEMPS — les doublons
# (le 2e A, le 2e N) rebondissent sur leur case sans s'ajouter. Fin : ANANAS.
# Dessins et couleurs de la paysage (proba_issue.py).
# Voix : manim/voix/3e-proba-issue-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/proba_issue_short.py ShortProbaIssue3e -o eleveai-maths-3e-proba-issue-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/02-issues/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_issue import P, chapeau, etiquette, etiquettes, ouverture  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaIssue3e(Short6e):
    nom_voix = "3e-proba-issue-short"

    def t(self, texte, font_size=34, color=WHITE):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > LARGEUR_MAX:
            t.scale_to_fit_width(LARGEUR_MAX)
        return t

    def ligne(self, morceaux, font_size=34, buff=0.14):
        g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def vol(self, tuile, cible, hauteur=1.0, run_time=0.55):
        """L'étiquette jaillit du chapeau et retombe sur sa case, en arc."""
        depart = tuile.get_center()
        sommet = (depart + cible) / 2 + UP * hauteur
        chemin = VMobject().set_points_smoothly([depart, sommet, cible])
        return MoveAlongPath(tuile, chemin, run_time=run_time, rate_func=rate_functions.ease_in_out_sine)

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Le chapeau à lettres", font_size=42, color=JAUNE_TITRE).move_to(P(0, 2.85))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.6)
        self.au_mot("BANANE")
        tu = etiquettes("BANANE", 0.55, 0.1).move_to(P(0, 1.45))
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.3) for m in tu], lag_ratio=0.12), run_time=0.7)
        self.au_mot("6 étiquettes")
        six = self.ligne([("6", JAUNE_TITRE), ("étiquettes", WHITE)], 40).move_to(P(0, -1.15))
        self.play(FadeIn(six, scale=0.8), run_time=0.4)
        self.insister(six[0])
        self.au_mot("dans un chapeau")
        ch = chapeau(1.8, 1.1).move_to(P(0, 0.35))
        trou = ouverture(ch)
        self.play(FadeIn(ch, shift=UP * 0.2), run_time=0.35)
        self.play(LaggedStart(*[m.animate.move_to(trou).scale(0.3).set_opacity(0) for m in tu],
                              lag_ratio=0.15), run_time=1.1)
        self.remove(*tu)
        self.play(Wiggle(ch, scale_value=1.1, rotation_angle=0.07 * TAU), run_time=0.6)
        self.au_mot("Combien")
        q = VGroup(self.t("Combien de résultats", 32, BLEU_CALCUL),
                   self.t("possibles ?", 32, BLEU_CALCUL)).arrange(DOWN, buff=0.1).move_to(P(0, -1.95))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        self.play(FadeOut(six), FadeOut(q), ch.animate.move_to(P(0, 0.75)), run_time=0.4)
        trou = ouverture(ch)
        xs = [-1.5, -0.5, 0.5, 1.5]
        y_case = -0.75
        cases = VGroup(*[RoundedRectangle(width=0.82, height=0.9, corner_radius=0.12, stroke_color=WHITE,
                                          stroke_width=3).move_to(P(x, y_case)) for x in xs])
        self.au_mot("4 seulement")
        quatre = self.ligne([("4", JAUNE_TITRE), ("seulement !", VERT_OK)], 40).move_to(P(0, -1.75))
        self.play(Create(cases), FadeIn(quatre, scale=0.8), run_time=0.5)
        self.insister(quatre[0])

        def sortir(lettre):
            m = etiquette(lettre, 0.62).move_to(trou).scale(0.3)
            self.add(m)
            return m

        for lettre, x, ex in zip("BANE", xs, ["B,", "A,", "N,", "E."]):
            self.au_mot(ex)
            m = sortir(lettre)
            self.play(m.animate.scale(1 / 0.3).move_to(trou + UP * 0.6), run_time=0.15)
            self.play(self.vol(m, P(x, y_case), 0.6, 0.32))
        self.au_mot("6 étiquettes")
        six = self.ligne([("6", JAUNE_TITRE), ("étiquettes,", WHITE)], 36).move_to(P(0, -1.6))
        self.play(FadeOut(quatre), FadeIn(six), run_time=0.3)
        # les doublons : le 2e A et le 2e N rebondissent sur leur case et retournent au chapeau
        for lettre, k in (("A", 1), ("N", 2)):
            m = sortir(lettre)
            haut_case = P(xs[k], y_case + 0.95)
            self.play(m.animate.scale(1 / 0.3).move_to(trou + UP * 0.6), run_time=0.15)
            self.play(self.vol(m, haut_case, 0.5, 0.3), cases[k].animate.set_stroke(ROUGE_ERREUR), run_time=0.3)
            self.play(self.vol(m, trou + UP * 0.1, 1.0, 0.45), cases[k].animate.set_stroke(WHITE), run_time=0.45)
            self.play(m.animate.scale(0.3).set_opacity(0), run_time=0.12)
            self.remove(m)
        self.au_mot("mais 4 lettres")
        mais = self.ligne([("mais", WHITE), ("4", JAUNE_TITRE), ("lettres !", VERT_OK)], 36).move_to(P(0, -2.2))
        self.play(FadeIn(mais, shift=UP * 0.15), run_time=0.35)
        self.insister(mais[1])
        self.au_mot("On compte les résultats")
        fin = VGroup(self.t("On compte les résultats,", 30, VERT_OK),
                     self.t("pas les objets !", 30, ORANGE_RETENUE)).arrange(DOWN, buff=0.1).move_to(P(0, -1.9))
        self.play(FadeOut(six), FadeOut(mais), run_time=0.25)
        self.play(FadeIn(fin, shift=UP * 0.15), run_time=0.35)
        self.play(Wiggle(ch, scale_value=1.08, rotation_angle=0.05 * TAU), run_time=0.6)
        self.attendre_voix(marge=0.4)

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))), run_time=0.5)
        self.au_mot("ANANAS")
        an = etiquettes("ANANAS", 0.58, 0.1).move_to(P(0, 1.55))
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.4) for m in an], lag_ratio=0.12), run_time=0.7)
        bases = [m.get_center().copy() for m in an]
        h = {"t": 0.0}

        def danse(g, dt):
            h["t"] += dt
            for i, (m, b) in enumerate(zip(g, bases)):
                m.move_to(b + UP * 0.12 * abs(math.sin(h["t"] * 6 + i * 0.9)))

        an.add_updater(danse)
        self.au_mot("combien d'issues")
        q = self.t("Combien d'issues ?", 40, BLEU_CALCUL).move_to(P(0, 0.6))
        self.play(Write(q), run_time=0.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 48, VERT_OK), self.t("commentaire !", 48, VERT_OK)).arrange(DOWN, buff=0.14)
        rep = VGroup(appel, self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.2)), scale=0.8), run_time=0.6)
        self.attendre_voix(marge=1.5)
        an.clear_updaters()
