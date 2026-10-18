# proba_roue_short.py
# EleveAI — Maths CM2 — short jumeau de la série « Probabilités », épisode 4 :
# la roue de 8 parts. CEINTURE JAUNE. Il AMUSE : « ne pas tomber sur le bleu,
# c'est combien ? »… une chance sur deux !
#   · en HAUT la roue du coach (3 R, 4 B, 1 V) qui tourne puis s'arrête ;
#   · en BAS, EN MÊME TEMPS, 8 − 4 = 4 se remplit, puis 4 chances sur 8 et
#     « 1 chance sur 2 » quand la roue se coupe en deux ;
#   · fin : et le rouge ? « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/cm2-proba-roue-short.json (Julie, débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm2/proba_roue_short.py ShortProbaRoueCM2 -o eleveai-maths-cm2-proba-roue-short --media_dir manim/scripts/cm2/media
# Puis copier le mp4 dans manim/sorties/cm2/maths/probabilites/04-roue-de-sac/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_roue import P, C_ROUGE, C_BLEU, C_VERT, GRIS_PART, ROUE_8, Toupie, roue  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
HAUT = P(0, 0.6)


class ShortProbaRoueCM2(Short6e):
    nom_voix = "cm2-proba-roue-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=40, buff=0.15, largeur=LARGEUR_MAX):
        """Morceaux colorés d'UN SEUL Text ; g[i] = i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):
            g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        else:
            g, k = VGroup(), 0
            for (m, c), n in zip(morceaux, tailles):
                g.add(VGroup(*T[k:k + n]).set_color(c))
                k += n
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def pulser(self, mobs, k=1.15, run_time=0.2):
        self.play(*[m.animate.scale(k) for m in mobs], run_time=run_time)
        self.play(*[m.animate.scale(1 / k) for m in mobs], run_time=run_time)

    def badge(self):
        return echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def parts(self, d, idx):
        return [VGroup(d[0][i], d[1][i]) for i in idx]

    def construct(self):
        self.margo_bas()
        badge = self.badge()
        self.add(badge)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        r, d = roue(HAUT, ROUE_8, 1.15, 24, carte=False)
        self.play(FadeIn(r, scale=0.7), run_time=0.4)
        toupie = Toupie(self, d, HAUT, 7.0)
        self.au_mot("8 parts")
        huit = self.ligne([("8", JAUNE_TITRE), ("parts", WHITE)], 46).move_to(P(0, -0.95))
        self.play(FadeIn(huit, scale=0.6), run_time=0.35)
        self.au_mot("Ne pas tomber")
        titre = VGroup(self.t("Ne pas tomber", 38, WHITE),
                       self.ligne([("sur le", WHITE), ("bleu ?", C_BLEU)], 38)).arrange(DOWN, buff=0.1)
        titre.move_to(P(0, 3.25))
        self.play(FadeIn(titre, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("combien de chances")
        q = self.grand("combien de chances ?", font_size=40, color=ORANGE_RETENUE).move_to(P(0, -1.85))
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.insister(q, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'image ──
        self.dire("01-image")
        toupie.arreter(0.9)
        self.au_mot("4 parts bleues")
        bleues = range(3, 7)
        lb = self.ligne([("4", JAUNE_TITRE), ("parts bleues", C_BLEU)], 40).move_to(P(0, -0.95))
        self.play(FadeOut(VGroup(huit, q)), FadeIn(lb, scale=0.6), run_time=0.3)
        self.pulser(self.parts(d, bleues), 1.18, 0.2)
        self.au_mot("8 moins 4")
        calc = self.ligne([("8", JAUNE_TITRE), ("−", WHITE), ("4", C_BLEU), ("=", WHITE), ("4", VERT_OK)], 56, 0.25)
        calc.move_to(P(0, -0.95))
        self.play(ReplacementTransform(lb, VGroup(*calc[:3])),
                  *[d[0][i].animate.set_fill(GRIS_PART) for i in bleues],
                  *[d[1][i].animate.set_opacity(0.25) for i in bleues], run_time=0.5)
        self.au_mot("il reste 4 parts")
        reste = [0, 1, 2, 7]
        contours = VGroup(*[d[0][i].copy().set_fill(opacity=0).set_stroke(WHITE, 7) for i in reste])
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=0.5), Create(contours), run_time=0.45)
        self.insister(calc[4], 1.4, 0.2)
        self.au_mot("4 chances sur 8")
        res = self.ligne([("4", VERT_OK), ("chances sur", WHITE), ("8", JAUNE_TITRE)], 44).move_to(P(0, -1.9))
        self.play(FadeIn(res, scale=0.6), run_time=0.35)
        self.au_mot("Une chance sur deux")
        coupe = Line(HAUT + 1.35 * P(math.cos(-PI / 4), math.sin(-PI / 4)),
                     HAUT + 1.35 * P(math.cos(3 * PI / 4), math.sin(3 * PI / 4)), color=JAUNE_TITRE, stroke_width=10)
        moitie = self.ligne([("1", VERT_OK), ("chance sur", WHITE), ("2 !", JAUNE_TITRE)], 50).move_to(P(0, -1.9))
        self.play(Create(coupe), ReplacementTransform(res, moitie), run_time=0.5)
        self.insister(moitie, 1.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.add(badge)
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.4))
        r2, d2 = roue(P(0, 0.7), ROUE_8, 1.05, 22, carte=False)
        self.play(Write(toi), FadeIn(r2, scale=0.8), run_time=0.45)
        self.au_mot("ne pas tomber sur le rouge")
        qr = self.ligne([("Ne pas tomber sur le", WHITE), ("rouge ?", C_ROUGE)], 32).move_to(P(0, -0.6))
        self.play(FadeIn(qr, shift=UP * 0.15), run_time=0.35)
        self.au_mot("3 parts rouges")
        tr = self.ligne([("3", JAUNE_TITRE), ("parts rouges sur", C_ROUGE), ("8", JAUNE_TITRE)], 34).move_to(P(0, -1.15))
        self.play(FadeIn(tr, shift=UP * 0.15), run_time=0.35)
        self.pulser(self.parts(d2, range(0, 3)), 1.2, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.15))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1)
        self.attendre_voix(marge=1.5)
