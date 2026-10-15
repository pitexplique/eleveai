# proba_equiprobabilite_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 4 des probabilités :
# l'équiprobabilité. CEINTURE BLANCHE. Il AMUSE : « une punaise qui tombe,
# pointe en haut, 1 chance sur 2 ? » En HAUT la punaise qui tombe, puis une
# pluie de punaises qui se couchent presque toutes ; en BAS, EN MÊME TEMPS,
# « 2 issues… pas la même chance… pas équiprobables ». Fin : la tartine,
# côté confiture, et « Réponds en commentaire ! ».
# Dessins de la paysage (proba_equiprobabilite.py) : punaise, chute.
# Voix : manim/voix/4e-proba-equiprobabilite-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_equiprobabilite_short.py ProbaEquiprobabilite4eShort -o eleveai-maths-4e-proba-equiprobabilite-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/04-equiprobabilite/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_equiprobabilite import P, punaise_posee, tomber  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 3.7


def tartine(s=1.0):
    pain = RoundedRectangle(width=1.9 * s, height=0.4 * s, corner_radius=0.12 * s, fill_color="#E0B36A",
                            fill_opacity=1, stroke_color="#92400E", stroke_width=4)
    confiture = RoundedRectangle(width=1.7 * s, height=0.14 * s, corner_radius=0.06 * s, fill_color="#B91C1C",
                                 fill_opacity=1, stroke_width=0).move_to(pain.get_top() + DOWN * 0.02 * s)
    gouttes = VGroup(*[Dot(confiture.get_center() + P(x * s, 0.06 * s), radius=0.06 * s, color="#B91C1C")
                       for x in (-0.5, 0.1, 0.6)])
    return VGroup(pain, confiture, gouttes)


class ProbaEquiprobabilite4eShort(Short6e):
    nom_voix = "4e-proba-equiprobabilite-short"

    def t(self, texte, font_size=34, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def frac(self, n, d, font_size=40, color=WHITE):
        a = Text(str(n), font_size=font_size, color=color)
        b = Text(str(d), font_size=font_size, color=color)
        barre = Line(LEFT * (max(a.width, b.width) / 2 + 0.08), RIGHT * (max(a.width, b.width) / 2 + 0.08),
                     color=color, stroke_width=3.5)
        return VGroup(a, barre, b).arrange(DOWN, buff=0.08)

    def insister(self, mob, k=1.4, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=6, color=color)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.t("Pointe en haut ?", 46, JAUNE_TITRE, 3.7).move_to(P(0, 3.25))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        sol = Line(P(-1.9, 0.4), P(1.9, 0.4), color=GREY_B, stroke_width=3)
        self.play(FadeIn(titre), FadeIn(badge), Create(sol), run_time=0.6)
        self.au_mot("qui tombe")
        pu = punaise_posee(0.4, 0, False, 1.15)
        tomber(self, pu, 1.5, 1.5, 0.8)
        self.au_mot("pointe en haut")
        l1 = self.t("pointe en haut :", 36, BLEU_CALCUL).move_to(P(0, -0.35))
        self.play(FadeIn(l1, shift=UP * 0.15), Indicate(pu, color=BLEU_CALCUL), run_time=0.5)
        self.au_mot("1 chance sur 2")
        f = self.frac(1, 2, 52, JAUNE_TITRE)
        q = Text("?", font_size=52, color=JAUNE_TITRE)
        l2 = VGroup(f, q).arrange(RIGHT, buff=0.2).move_to(P(0, -1.35))
        self.play(FadeIn(l2, scale=0.6), run_time=0.4)
        self.insister(f, 1.3)
        self.attendre_voix(marge=0.2)

        # ── 01 : l'image ──
        self.dire("01-image")
        b = self.barrer(l2)
        self.play(Create(b), run_time=0.3)
        non = self.t("Non !", 70, ROUGE_ERREUR).move_to(P(0, 1.2))
        self.play(FadeOut(pu), FadeIn(non, scale=0.5), run_time=0.3)
        self.insister(non, 1.2, 0.2)
        self.au_mot("Elle tombe")
        self.play(FadeOut(non), FadeOut(VGroup(l1, l2, b)), run_time=0.3)
        # la pluie de punaises : 2 restent pointe en haut, 6 se couchent
        haut = [punaise_posee(0.4, x, False, 0.5) for x in (-1.65, -1.15)]
        cote = [punaise_posee(y, x, True, 0.5, 1 if k % 2 else -1)
                for k, (x, y) in enumerate([(-0.35, 0.4), (0.4, 0.4), (1.2, 0.4),
                                            (-0.35, 1.15), (0.4, 1.15), (1.2, 1.15)])]
        sep = DashedLine(P(-0.85, 0.2), P(-0.85, 1.75), color=GREY_B, stroke_width=2)
        etage = Line(P(-0.75, 1.15), P(1.9, 1.15), color=GREY_B, stroke_width=2)
        self.add(sep, etage)
        for m in [cote[0], haut[0], cote[1], cote[2], cote[3], haut[1], cote[4], cote[5]]:
            tomber(self, m, 0.6, 1.0, 0.28)
        lh = self.t("en haut", 24, BLEU_CALCUL).move_to(P(-1.4, 0.05))
        lc = self.t("sur le côté", 24, ORANGE_RETENUE).move_to(P(0.45, 0.05))
        self.au_mot("sur le côté")
        y1, y2, y3 = -0.6, -1.3, -2.0
        a = self.t("sur le côté : bien plus souvent", 32, ORANGE_RETENUE).move_to(P(0, y1))
        self.play(FadeIn(lh), FadeIn(lc), FadeIn(a, shift=UP * 0.15), run_time=0.5)
        self.play(VGroup(*cote).animate.scale(1.25), rate_func=there_and_back, run_time=0.6)
        self.au_mot("2 issues")
        b2 = self.t("2 issues,", 38).move_to(P(0, y2))
        self.play(FadeIn(b2, shift=UP * 0.15), run_time=0.3)
        self.au_mot("mais pas la même chance")
        b23 = VGroup(self.t("2 issues, mais", 34), self.t("pas la même chance", 34, ORANGE_RETENUE))
        b23.arrange(DOWN, buff=0.12).move_to(P(0, y2 - 0.15))
        self.play(ReplacementTransform(b2, b23[0]), FadeIn(b23[1], shift=UP * 0.15), run_time=0.5)
        self.au_mot("Elles ne sont pas")
        fin = self.t("pas équiprobables !", 40, ROUGE_ERREUR).move_to(P(0, y3 - 0.35))
        self.play(FadeIn(fin, scale=0.7), run_time=0.4)
        self.insister(fin, 1.15)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.t("À toi !", 56, JAUNE_TITRE, 4.1).move_to(P(0, 2.7))), run_time=0.5)
        sol2 = Line(P(-1.9, 1.2), P(1.9, 1.2), color=GREY_B, stroke_width=3)
        self.add(sol2)
        self.au_mot("une tartine")
        ta = tartine(1.0)
        ta.move_to(P(0, 1.2 + ta.height / 2))
        tomber(self, ta, 1.0, 1.5, 1.0)
        self.au_mot("côté confiture")
        q1 = self.t("côté confiture :", 36, "#F87171").move_to(P(0, 0.6))
        self.play(FadeIn(q1), Indicate(ta[1], color="#F87171"), run_time=0.5)
        self.au_mot("1 chance sur 2")
        f2 = self.frac(1, 2, 46, JAUNE_TITRE)
        q2 = VGroup(f2, Text("?", font_size=46, color=JAUNE_TITRE)).arrange(RIGHT, buff=0.2).move_to(P(0, -0.2))
        self.play(FadeIn(q2, scale=0.6), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK, 3.9), self.t("commentaire !", 46, VERT_OK, 3.9))
        appel.arrange(DOWN, buff=0.1)
        rep = VGroup(appel, self.grand("@eleveai974", font_size=30, color=BLEU_CALCUL)).arrange(DOWN, buff=0.12)
        rep.move_to(P(0, -1.75))
        self.play(FadeIn(rep, scale=0.8), run_time=0.5)
        self.insister(appel, 1.1)
        self.attendre_voix(marge=1.5)
