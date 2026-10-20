# proba_ech_rare_short.py
# EleveAI — Maths STMG — short jumeau de « Fréquent ou rare : faut-il douter
# du modèle ? ». CEINTURE JAUNE. Il AMUSE : l'enseigne crie « 60 % », les
# clients entrent avec leur sac… et on en voit 51 %. On la croit ?
#   · en HAUT : l'enseigne, sa bulle « 60 % », les clients qui entrent, leur
#     sac réutilisable à la main ;
#   · en BAS, EN MÊME TEMPS : « 60 % », « sur 400 : 51 % », puis l'axe et sa
#     bande verte « normal » (55 % à 65 %), le point 51 % qui tombe DEHORS,
#     rouge : « rare ! », « on a le droit de douter ! » ;
#   · fin : « 57 % ? » et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran.
#
# Voix : manim/voix/stmg-proba-ech-rare-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_ech_rare_short.py ShortProbaEchRare -o eleveai-maths-stmg-proba-ech-rare-short --media_dir manim/scripts/stmg/media-va_ech_rare
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/36-ech-rare/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_ech_rare import (BANDE, FREQUENT, RARE, AxeFreq, P, bulle, client,  # noqa: E402  (pose les chemins)
                            enseigne)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import suite  # noqa: E402

LARGEUR_MAX = 4.1


class AxeCourt(AxeFreq):
    """L'axe du short : de 45 % à 75 %, assez large pour lire la bande."""

    V0, V1 = 0.45, 0.75


class ShortProbaEchRare(Short6e):
    nom_voix = "stmg-proba-ech-rare-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def entrer(self, porte, avec=(True, True, False), run_time=1.4):
        """Des clients arrivent de la droite et entrent dans le magasin."""
        cl = VGroup(*[client(a, 0.75, color="#E2E8F0") for a in avec]).arrange(RIGHT, buff=0.3)
        cl.move_to(P(2.6, porte[1] + 0.1))
        self.add(cl)
        self.play(LaggedStart(*[Succession(c.animate(run_time=0.75).move_to(P(porte[0], porte[1] + 0.1)),
                                           FadeOut(c, scale=0.6, run_time=0.25)) for c in cl],
                              lag_ratio=0.3), run_time=run_time)
        self.remove(cl)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : l'enseigne annonce 60 % ──
        self.dire("00-accroche")
        titre = self.grand("Les sacs réutilisables", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        e = enseigne(0.6).move_to(P(-0.95, 0.75))
        porte = e[5].get_bottom() + UP * 0.25
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(e, shift=UP * 0.2), run_time=0.7)
        c60 = self.t("60 %", 46, JAUNE_TITRE)
        bu = bulle(c60, sens=-1).move_to(P(1.15, 1.45))
        self.play(FadeIn(VGroup(*bu[:3]), scale=0.6), FadeIn(c60, scale=1.8), run_time=0.4)
        l1 = suite(self.t("l'enseigne :", 32), self.t("60 %", 42, JAUNE_TITRE), buff=0.2).move_to(P(0, -0.6))
        if l1.width > LARGEUR_MAX:
            l1.scale_to_fit_width(LARGEUR_MAX)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.35)
        self.entrer(porte)
        self.au_mot("Sur 400")
        l2 = suite(self.t("sur 400 :", 34, BLEU_CALCUL), self.t("51 %", 50, WHITE), buff=0.2).move_to(P(0, -1.45))
        n51 = l2[1]
        self.play(FadeIn(l2[0], shift=UP * 0.15), run_time=0.35)
        self.entrer(porte, (False, True, False), 1.2)
        self.au_mot("51 %")
        self.play(FadeIn(n51, scale=1.8), run_time=0.4)
        self.insister(n51, 1.3)
        self.au_mot("Tu la crois")
        q = self.t("Tu la crois ?", 46, ORANGE_RETENUE).move_to(P(0, -2.3))
        self.play(FadeIn(q, scale=0.6), Wiggle(bu), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : la bande « normal », 51 % tombe dehors : rare ──
        self.dire("01-image")
        haut = VGroup(e, bu)
        self.play(FadeOut(VGroup(l1, l2, q), shift=DOWN * 0.2), FadeOut(badge),
                  haut.animate.scale(0.85).move_to(P(0, 2.0)), run_time=0.4)
        porte = e[5].get_bottom() + UP * 0.2
        a = AxeCourt(x0=-1.9, x1=1.7, y=-0.6, fs=26, h=0.45)
        self.play(Create(a.ligne), FadeIn(a.grad), run_time=0.4)
        self.au_mot("Normal entre 55 %")
        b = a.bande(0.6, 0.6, color=FREQUENT).stretch_to_fit_width(0.02)
        self.add(b)
        self.bring_to_front(a)
        nm = self.t("normal", 34, FREQUENT).move_to(a.pt(0.66, 0.6))
        b1 = a.borne(0.55, "55 %", color=FREQUENT)
        self.play(Transform(b, a.bande(0.55, 0.65, color=FREQUENT)), FadeIn(nm, shift=DOWN * 0.15),
                  FadeIn(b1, scale=1.4), run_time=0.6)
        self.bring_to_front(a)
        self.au_mot("65 %")
        b2 = a.borne(0.65, "65 %", color=FREQUENT)
        self.play(FadeIn(b2, scale=1.4), run_time=0.35)
        self.entrer(porte, (True, False, True), 1.0)
        self.au_mot("51 %, c'est")
        j = a.jalon(0.51, "51 %", RARE, haut=0.7)
        d0 = j[0].copy().move_to(a.pt(0.51, 1.6))
        self.play(FadeIn(d0, scale=0.5), run_time=0.2)
        self.play(d0.animate.move_to(j[0]), run_time=0.35, rate_func=rate_functions.ease_in_quad)
        self.remove(d0)
        self.add(j[0])
        self.play(FadeIn(j[1], shift=UP * 0.1), Create(j[2]), Flash(j[0], color=RARE, line_length=0.18),
                  run_time=0.35)
        self.au_mot("en dehors")
        fl = DoubleArrow(a.pt(0.51, 0.28), a.pt(0.55, 0.28), buff=0.02, color=RARE, stroke_width=4,
                         tip_length=0.12, max_tip_length_to_length_ratio=0.4)
        self.play(GrowFromCenter(fl), Indicate(b, color=RARE, scale_factor=1.06), run_time=0.45)
        self.au_mot("c'est rare")
        rare = self.t("rare !", 50, RARE).move_to(P(-1.1, 0.75))
        self.play(FadeIn(rare, scale=2.0), run_time=0.35)
        self.insister(rare, 1.3)
        self.au_mot("douter")
        dt = VGroup(self.t("On a le droit", 36, ORANGE_RETENUE),
                    self.t("de douter !", 42, ORANGE_RETENUE)).arrange(DOWN, buff=0.08).move_to(P(0, -2.0))
        qm = self.t("?", 60, ORANGE_RETENUE).next_to(bu, LEFT, buff=0.1).shift(UP * 0.15)
        self.play(FadeIn(dt, shift=UP * 0.15), FadeIn(qm, scale=2.0), Wiggle(bu), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : et 57 % ? ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(FadeOut(titre, shift=UP * 0.2), FadeIn(toi, scale=1.3), FadeOut(VGroup(rare, dt, fl, qm), shift=DOWN * 0.2),
                  j.animate.set_opacity(0.25), run_time=0.45)
        self.au_mot("57 %")
        n57 = suite(self.t("57 %", 56, ORANGE_RETENUE), self.t("?", 60, ORANGE_RETENUE), buff=0.15)
        n57.move_to(P(0, -1.85))
        self.play(FadeIn(n57, scale=1.8), run_time=0.4)
        self.insister(n57, 1.25)
        self.au_mot("tu doutes encore")
        de = self.t("tu doutes encore ?", 38, WHITE).move_to(P(0, -2.6))
        self.play(FadeIn(de, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK), self.t("commentaire !", 46, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, 1.9))
        self.play(FadeOut(VGroup(e, bu), shift=UP * 0.2), FadeIn(appel, scale=0.7), run_time=0.45)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
