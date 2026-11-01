# pythagore_rediger_short.py
# EleveAI — Maths 4e — short jumeau de Pythagore, épisode 7 : théorème ou réciproque ?
# CEINTURE BLANCHE : l'écran coupé en deux. En haut à gauche, un triangle AVEC son
# petit carré (angle droit connu → théorème : je calcule) ; à droite, un triangle
# avec un « ? » au coin (angle droit cherché → réciproque : je prouve).
# Voix : manim/voix/4e-pythagore-rediger-short.json.
# ⭐ 31/10/2026 : + 1 question-pause après 01-image (questions-pythagore.md, Ép. 7),
# compte à rebours de 3 s, module commun pythagore_pauses.py ; marques mot à mot :
# 4e-pythagore-rediger-short.marques.json. Avant tout rendu :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/pythagore_rediger_short.py ShortTheoremeOuReciproque4e
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/pythagore_rediger_short.py ShortTheoremeOuReciproque4e -o eleveai-maths-4e-pythagore-rediger-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/07-rediger/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_verifier_short import COTE, COUL_HYP, P, ShortCorde4e  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from pythagore_pauses import PausesShort, sans_audit  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Le mixin EN PREMIER, sauf si le short parent (ép. 5, un autre agent) l'a déjà : MRO cohérent.
_BASES = (ShortCorde4e,) if issubclass(ShortCorde4e, PausesShort) else (PausesShort, ShortCorde4e)


class ShortTheoremeOuReciproque4e(*_BASES):
    nom_voix = "4e-pythagore-rediger-short"
    FS_C = 24  # (31/10) choix en mots : place pour la coche verte au bout de la carte

    def triangle(self, A, u=0.32):
        B, C = A + RIGHT * 4 * u, A + UP * 3 * u
        return A, B, C, Polygon(A, B, C, color=WHITE, stroke_width=4)

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Théorème ou réciproque ?", font_size=36, color=JAUNE_TITRE).move_to(P(0, 2.85))
        # (01/11) l'ÉCHELLE ENTIÈRE des ceintures sous le titre (REGLES.md, 13/10), pas le badge seul
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7)
        badge.next_to(titre, DOWN, buff=0.16)
        q = self.grand("Lequel écrire ?", font_size=30, color=BLEU_CALCUL).next_to(badge, DOWN, buff=0.14)
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("Lequel")
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        A1, B1, C1, t1 = self.triangle(P(-2.0, 0.1))
        A2, B2, C2, t2 = self.triangle(P(0.35, 0.1))
        sep = DashedLine(P(0.05, 1.45), P(0.05, -2.2), color=GRAY_B, stroke_width=2)
        self.play(Create(t1), Create(t2), Create(sep))
        self.au_mot("tu le connais")
        carre = self.carre_droit(A1, RIGHT, UP, s=0.2)
        self.play(GrowFromCenter(carre))
        self.au_mot("Théorème")
        g = VGroup(self.t("connu", 24, BLEU_CALCUL), self.t("THÉORÈME", 23, COUL_HYP),
                   self.t("je calcule", 22), self.t("une longueur", 22)).arrange(DOWN, buff=0.1)
        g.scale_to_fit_width(min(g.width, 1.85)).move_to(P(-1.08, -1.1))  # (31/10) 3 % du bord
        self.play(FadeIn(g), Create(Line(B1, C1, color=COUL_HYP, stroke_width=6)))
        self.au_mot("Tu le cherches")
        q2 = self.t("?", 40, BLEU_CALCUL).move_to(A2 + UR * 0.22)
        self.play(Write(q2))
        self.au_mot("Réciproque")
        d = VGroup(self.t("cherché", 24, BLEU_CALCUL), self.t("RÉCIPROQUE", 23, VERT_OK),
                   self.t("je prouve", 22), self.t("l'angle droit", 22)).arrange(DOWN, buff=0.1)
        d.scale_to_fit_width(min(d.width, 1.85)).move_to(P(1.1, -1.1))
        self.play(FadeIn(d))
        self.play(Transform(q2, self.carre_droit(A2, RIGHT, UP, s=0.2)))
        self.attendre_voix(marge=0.5)

        # ── 01q : la question-pause (3 s) ──
        self.ecran_question("01q-question", "01r-reponse",
                            ["Un triangle a pour côtés", ["7,", "24", "et 25."], "Est-il rectangle ?", "Pour le savoir :"],
                            ["le théorème", "la réciproque", "aucun des deux"], 1, ["On cherche l'angle droit."])

        # ── 02 ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(FadeIn(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.55))), run_time=0.3)
        A, B, C, t = self.triangle(P(-1.0, 0.0), u=0.45)
        self.au_mot("RST est rectangle en S")
        self.play(Create(t), GrowFromCenter(self.carre_droit(A, RIGHT, UP, s=0.22)),
                  FadeIn(self.t("S", 26).move_to(A + DL * 0.22)), FadeIn(self.t("T", 26).move_to(B + DR * 0.22)),
                  FadeIn(self.t("R", 26).move_to(C + UL * 0.22)))
        self.au_nb("RS égale 9")
        self.play(FadeIn(self.t("9", 26, COTE).next_to(Line(A, C), LEFT, buff=0.1)))
        self.au_nb("ST égale 12")
        self.play(FadeIn(self.t("12", 26, COTE).next_to(Line(A, B), DOWN, buff=0.1)))
        self.au_mot("Pour trouver RT")
        self.play(FadeIn(self.t("RT = ?", 30, COUL_HYP).move_to((B + C) / 2 + UR * 0.6)))
        self.play(FadeIn(self.grand("théorème ou réciproque ?", font_size=30, color=BLEU_CALCUL).move_to(P(0, -0.9))))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=36, color=VERT_OK),
                     sans_audit(self.grand("@eleveai974", font_size=36, color=BLEU_CALCUL))).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -1.75))))
        self.attendre_voix(marge=1.5)
