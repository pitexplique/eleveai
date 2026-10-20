# proba_bern_representer_short.py
# EleveAI — Maths STMG — short jumeau de « Représenter des fréquences : nuage
# de points et histogramme » (épisode 33). CEINTURE JAUNE.
# Il AMUSE : 100 échantillons, un seul à 0,46… le site a-t-il menti ?
#   · en HAUT : le nuage des 100 fréquences (le même tirage fixé que la
#     paysage) ; le point 0,46 s'allume en rouge ; puis la bande 0,2 – 0,4 et
#     la droite 0,3 ;
#   · en BAS, EN MÊME TEMPS : « un seul : 0,46 », « Le site a menti ? »,
#     « la plupart entre 0,2 et 0,4 », « 0,46 : rare, pas une preuve » ;
#   · fin : la zone au-dessus de 0,4 s'allume, « combien de points ? » et
#     « Réponds en commentaire ! » (réponse : 3).
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran.
#
# Voix : manim/voix/stmg-proba-bern-representer-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_representer_short.py ShortProbaBernRepresenter -o eleveai-maths-stmg-proba-bern-representer-short --media_dir manim/scripts/stmg/media-bern_representer
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/33-bern-representer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bern_representer import BANDE, FREQ, I_ISOLE, ISOLE, Nuage, P  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import suite  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaBernRepresenter(Short6e):
    nom_voix = "stmg-proba-bern-representer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 100 échantillons, un seul à 0,46 ──
        self.dire("00-accroche")
        titre = self.grand("100 échantillons", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        nu = Nuage(o=P(-1.38, -0.65), W=3.22, H=2.1, r=0.04, fs=20)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), GrowArrow(nu.axe_x), GrowArrow(nu.axe_y),
                  FadeIn(nu.titre_y), run_time=0.6)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.4) for p in nu.pts], lag_ratio=0.08), run_time=1.6)
        p = nu.pts[I_ISOLE]
        self.au_mot("Un seul donne")
        seul = suite(self.t("un seul :", 40), self.t("0,46", 52, ISOLE), buff=0.22).move_to(P(0, -1.35))
        self.play(*[q.animate.set_opacity(0.3) for q in nu.pts if q is not p], p.animate.set_color(ISOLE).scale(2.4),
                  FadeIn(seul[0], shift=UP * 0.15), run_time=0.45)
        self.au_mot("0,46")
        cer = Circle(radius=0.22, color=ISOLE, stroke_width=4).move_to(p)
        l46 = self.t("0,46", 30, ISOLE).next_to(cer, RIGHT, buff=0.08)
        self.play(Create(cer), FadeIn(l46, scale=1.6), FadeIn(seul[1], scale=1.6), run_time=0.4)
        self.insister(seul[1], 1.3)
        self.au_mot("Le site a menti")
        menti = self.t("Le site a menti ?", 46, ORANGE_RETENUE).move_to(P(0, -2.2))
        self.play(FadeIn(menti, scale=0.5), run_time=0.35)
        self.play(Wiggle(menti), Wiggle(VGroup(p, cer)), run_time=0.7)
        self.attendre_voix(marge=0.1)

        # ── 01 : la plupart entre 0,2 et 0,4, autour de 0,3 ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(seul, menti), shift=DOWN * 0.2), FadeOut(badge), run_time=0.3)
        self.au_mot("Regarde le nuage")
        self.play(*[q.animate.set_opacity(1) for q in nu.pts], run_time=0.4)
        self.au_mot("la plupart")
        l1 = self.t("la plupart :", 36).move_to(P(0, -1.15))
        self.play(FadeIn(l1, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("entre 0,2")
        d2 = nu.droite(0.2, "0,2", BANDE, tirets=True, fs=24, sw=3)
        bande = nu.bande(opacity=0.2)
        l2 = suite(self.t("entre", 36), self.t("0,2", 42, BANDE), self.t("et", 36), self.t("0,4", 42, BANDE),
                   buff=0.15).move_to(P(0, -1.7))
        self.play(Create(d2[0]), FadeIn(d2[1], scale=1.5), FadeIn(l2[:2], shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("et 0,4")
        d4 = nu.droite(0.4, "0,4", BANDE, tirets=True, fs=24, sw=3)
        dedans = [q for i, q in enumerate(nu.pts) if 0.2 - 1e-9 <= FREQ[i] <= 0.4 + 1e-9]
        self.play(Create(d4[0]), FadeIn(d4[1], scale=1.5), FadeIn(bande), FadeIn(l2[2:], shift=DOWN * 0.1),
                  *[q.animate.set_color(BANDE) for q in dedans], run_time=0.5)
        self.au_mot("autour de 0,3")
        d3 = nu.droite(0.3, "0,3", JAUNE_TITRE, fs=24, sw=3)
        l3 = suite(self.t("autour de", 36), self.t("0,3", 46, JAUNE_TITRE), buff=0.15).move_to(P(0, -2.3))
        self.play(Create(d3[0]), FadeIn(d3[1], scale=1.5), FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.insister(l3[1], 1.3)
        self.au_mot("c'est un point rare")
        l4 = suite(self.t("0,46 :", 40, ISOLE), self.t("rare", 46, ORANGE_RETENUE), buff=0.2).move_to(P(0, -1.45))
        self.play(FadeOut(VGroup(l1, l2, l3)), FadeIn(l4, shift=UP * 0.1), Flash(p, color=ISOLE), run_time=0.5)
        self.au_mot("pas une preuve")
        l5 = self.t("pas une preuve", 42, VERT_OK).move_to(P(0, -2.15))
        self.play(FadeIn(l5, scale=0.6), run_time=0.4)
        self.insister(l5, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : combien de points au-dessus de 0,4 ? ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.4))
        SH = 0.55
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(l4, l5), shift=DOWN * 0.2),
                  FadeOut(VGroup(bande, cer, l46)), *[q.animate.set_color("#60A5FA") for q in dedans],
                  p.animate.set_color("#60A5FA").scale(1 / 2.4), run_time=0.4)
        self.play(VGroup(nu, nu.titre_y, nu.pts, d2, d3, d4).animate.shift(UP * SH), run_time=0.4)
        self.au_mot("au-dessus de 0,4")
        haut = Rectangle(width=nu.W, height=nu.y(0.5) - nu.y(0.4), stroke_width=0, fill_color=ORANGE_RETENUE,
                         fill_opacity=0.25).move_to(P(nu.o[0] + nu.W / 2, (nu.y(0.4) + nu.y(0.5)) / 2 + SH))
        q1 = self.t("combien de points", 38).move_to(P(0, -0.6))
        q2 = suite(self.t("au-dessus de", 38), self.t("0,4", 44, BANDE), self.t("?", 50, ORANGE_RETENUE),
                   buff=0.15)
        q2.scale_to_fit_width(min(q2.width, LARGEUR_MAX)).move_to(P(0, -1.15))
        self.play(FadeIn(haut), FadeIn(q1, shift=UP * 0.1), FadeIn(q2, shift=UP * 0.1),
                  Indicate(d4, color=ORANGE_RETENUE), run_time=0.6)
        self.insister(q2[2], 1.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.1))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
