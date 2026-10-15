# proba_evenement_short.py
# EleveAI — Maths 3e — short jumeau des probabilités, épisode 4 : les événements.
# CEINTURE BLANCHE. Il AMUSE : « plus de 4 » ou « au moins 4 », c'est pareil ?
# En HAUT le dé qui roule (et s'arrête sur une face gagnante) ; en BAS les 6 faces
# en rangée qui s'allument EN MÊME TEMPS : plus de 4 → 5, 6 ; au moins 4 → 4, 5, 6
# (le 4 surgit, agrandi puis rétréci). Fin : « strictement moins de 3 ? ».
# Voix : manim/voix/3e-proba-evenement-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/proba_evenement_short.py ShortProbaEvenement3e -o eleveai-maths-3e-proba-evenement-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/04-evenements/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_evenement import P, rangee_faces  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import de, de_qui_roule  # noqa: E402

LARGEUR_MAX = 4.1
Y_DE = 1.3
Y_FACES = -0.1


class ShortProbaEvenement3e(Short6e):
    nom_voix = "3e-proba-evenement-short"

    def t(self, texte, font_size=34, color=WHITE):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > LARGEUR_MAX:
            t.scale_to_fit_width(LARGEUR_MAX)
        return t

    def ligne(self, morceaux, font_size=34, buff=0.18):
        g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def cadre(self, f, couleur):
        return SurroundingRectangle(f, color=couleur, buff=0.05, stroke_width=5, corner_radius=0.08)

    def arreter_de(self, roule, face, cote=1.3, y=Y_DE):
        roule.clear_updaters()
        self.remove(roule)
        d = de(face, cote).move_to(P(0, y))
        self.add(d)
        self.play(d.animate.scale(1.25), run_time=0.15)
        self.play(d.animate.scale(1 / 1.25), run_time=0.15)
        return d

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = VGroup(self.grand("Plus de 4", font_size=44, color=JAUNE_TITRE),
                       self.grand("ou au moins 4 ?", font_size=44, color=JAUNE_TITRE)).arrange(DOWN, buff=0.1)
        titre.move_to(P(0, 3.3))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.4))
        roule = de_qui_roule(P(0, Y_DE), 1.3)
        faces = rangee_faces(0.55, 0.13).move_to(P(0, Y_FACES))
        self.play(FadeIn(titre[0], scale=0.8), FadeIn(badge), run_time=0.6)
        self.add(roule)
        self.au_mot("ou au moins 4")
        self.play(FadeIn(titre[1], scale=0.8),
                  LaggedStart(*[FadeIn(f, shift=UP * 0.2) for f in faces], lag_ratio=0.12), run_time=0.7)
        self.au_mot("c'est pareil")
        q = self.grand("C'est pareil ?", font_size=48, color=BLEU_CALCUL).move_to(P(0, -1.2))
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q, 1.2, 0.25)
        self.attendre_voix(marge=0.2)

        # ── 01 : l'image ──
        self.dire("01-image")
        y_a, y_b = -0.95, -1.6
        self.au_mot("Plus de 4")
        la = self.ligne([("plus de 4 :", JAUNE_TITRE), ("5 et 6", VERT_OK)], 34)
        la.move_to(P(0, y_a))
        self.play(FadeOut(q, shift=DOWN * 0.2), run_time=0.2)
        self.play(FadeIn(la[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("5 et 6")
        c56 = VGroup(self.cadre(faces[4], VERT_OK), self.cadre(faces[5], VERT_OK))
        d = self.arreter_de(roule, 5)
        self.play(Write(la[1]), Create(c56), *[faces[k].animate.set_opacity(0.22) for k in range(4)],
                  run_time=0.4)
        self.insister(VGroup(faces[4:], c56), 1.25, 0.2)

        self.au_mot("Au moins 4")
        self.remove(d)
        roule = de_qui_roule(P(0, Y_DE), 1.3, faces=[2, 6, 1, 3, 5, 4])
        self.add(roule)
        lb = self.ligne([("au moins 4 :", ORANGE_RETENUE), ("4, 5 et 6", VERT_OK)], 34)
        lb.move_to(P(0, y_b))
        self.play(FadeIn(lb[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("4, 5 et 6")
        c4 = self.cadre(faces[3], JAUNE_TITRE)
        d = self.arreter_de(roule, 4)
        self.play(faces[3].animate.set_opacity(1), Create(c4), Write(lb[1]), run_time=0.4)
        self.insister(VGroup(faces[3], c4), 1.6, 0.3)
        self.play(Indicate(lb[1][0], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.5)

        self.au_mot("Un seul mot")
        ch = VGroup(self.grand("Un seul mot,", font_size=38, color=BLEU_CALCUL),
                    self.grand("ça change tout !", font_size=38, color=BLEU_CALCUL)).arrange(DOWN, buff=0.08)
        ch.move_to(P(0, -2.35))
        self.play(FadeIn(ch, scale=0.7), run_time=0.4)
        self.insister(ch, 1.12, 0.25)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 3.4))), run_time=0.5)
        roule = de_qui_roule(P(0, 1.95), 0.95)
        self.add(roule)
        faces = rangee_faces(0.55, 0.13).move_to(P(0, 0.2))
        self.au_mot("Strictement moins de 3")
        cond = self.t("strictement moins de 3", 36, ORANGE_RETENUE).move_to(P(0, 1.0))
        self.play(FadeIn(cond, shift=UP * 0.15),
                  LaggedStart(*[FadeIn(f, shift=UP * 0.2) for f in faces], lag_ratio=0.1), run_time=0.6)
        self.au_mot("quelles faces")
        qf = self.t("quelles faces ?", 40, BLEU_CALCUL).move_to(P(0, -0.55))
        self.play(FadeIn(qf, scale=0.7), run_time=0.35)
        self.play(LaggedStart(*[Wiggle(f, scale_value=1.25) for f in faces],
                              lag_ratio=0.15), run_time=1.0)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=48, color=VERT_OK),
                       self.grand("commentaire !", font_size=48, color=VERT_OK)).arrange(DOWN, buff=0.12)
        appel.move_to(P(0, -1.7))
        poignee = Text("@eleveai974", font_size=30, color=BLEU_CALCUL).move_to(P(0, -2.6))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.play(GrowFromCenter(poignee), run_time=0.35)
        self.attendre_voix(marge=1.5)
        roule.clear_updaters()
