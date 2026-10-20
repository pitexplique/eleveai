# proba_bin_parametres_short.py
# EleveAI — Maths STMG — short jumeau de « Les paramètres d'une loi
# binomiale : n et p ». CEINTURE JAUNE. Il AMUSE : un piège à éviter.
#   · en HAUT : cinq pots de vanille, quatre germent, le cinquième non ; il
#     reçoit le S du succès ; puis 12 colis, dont un abîmé ;
#   · en BAS, EN MÊME TEMPS : « 80 % germent », « X compte : ne germent pas »,
#     « p = 0,8 ? », barré, « Non ! », « succès : ne pas germer », « p = 0,2 » ;
#   · fin : « 12 colis, 5 % abîmés », « X compte : intacts », « p = ? » et
#     « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/stmg-proba-bin-parametres-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bin_parametres_short.py ShortProbaBinParametres -o eleveai-maths-stmg-proba-bin-parametres-short --media_dir manim/scripts/stmg/media-bin_parametres
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/41-bin-parametres/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bin_parametres import COUL_P, POT_NON, P, egal  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import lettre, suite  # noqa: E402
from proba_bern_epreuve import SUCCES  # noqa: E402
from proba_ech_distance import colis  # noqa: E402
from proba_bern_arbre import pot, pousse  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaBinParametres(Short6e):
    nom_voix = "stmg-proba-bin-parametres-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, *morceaux, largeur=LARGEUR_MAX, buff=0.15):
        g = suite(*morceaux, buff=buff)
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 80 % germent… p = 0,8 ? ──
        self.dire("00-accroche")
        titre = self.grand("Graines de vanille", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        pots = VGroup(*[pot(0.62) for _ in range(5)]).arrange(RIGHT, buff=0.18).move_to(P(0, 0.75))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2),
                  LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in pots], lag_ratio=0.1), run_time=0.8)
        self.au_mot("80 %")
        pousses = VGroup(*[pousse(pots[k]) for k in range(4)])
        l1 = self.ligne(self.t("80 %", 38, VERT_OK), self.t("germent", 34)).move_to(P(0, -0.45))
        self.play(LaggedStart(*[GrowFromPoint(p, p.get_bottom()) for p in pousses], lag_ratio=0.15),
                  FadeIn(l1, shift=UP * 0.15), run_time=0.8)
        self.play(*[Wiggle(p) for p in pousses], run_time=0.5)
        self.au_mot("X compte celles")
        l2 = VGroup(self.ligne(self.t("X", 38, JAUNE_TITRE), self.t("compte :", 34)),
                    self.t("ne germent pas", 36, POT_NON)).arrange(DOWN, buff=0.1).move_to(P(0, -1.4))
        self.play(FadeIn(l2, shift=UP * 0.15), pots[4][0].animate.set_fill(POT_NON),
                  pots[4][1].animate.set_fill(POT_NON), run_time=0.5)
        self.play(Wiggle(pots[4], scale_value=1.3), run_time=0.5)
        self.au_mot("p égale 0,8")
        faux = egal("p", "0,8 ?", 64, COUL_P, ORANGE_RETENUE)
        faux.scale_to_fit_width(min(faux.width, 3.6)).move_to(P(0, -2.3))
        self.play(FadeIn(faux, scale=0.5), run_time=0.4)
        self.insister(faux[2], 1.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : Non ! le succès, c'est ne pas germer : 0,2 ──
        self.dire("01-image")
        croix = Line(faux.get_left() + LEFT * 0.1, faux.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR,
                     stroke_width=8)
        non = self.grand("Non !", font_size=72, color=ROUGE_ERREUR).move_to(P(0, -0.7))
        self.play(Create(croix), FadeOut(VGroup(l1, l2), shift=UP * 0.2), FadeOut(badge), run_time=0.35)
        self.play(FadeIn(non, scale=2.2), faux.animate.set_opacity(0.4), run_time=0.35)
        self.play(Wiggle(non), run_time=0.45)
        self.au_mot("Le succès")
        s = lettre("S", 50, SUCCES).next_to(pots[4], UP, buff=0.75)
        bulle = Circle(radius=0.38, color=SUCCES, stroke_width=5).move_to(s)
        self.play(FadeOut(VGroup(faux, croix), shift=DOWN * 0.2), non.animate.scale(0.6).move_to(P(0, 2.4)),
                  run_time=0.35)
        self.play(FadeIn(s, scale=2), Create(bulle), pots[4].animate.shift(UP * 0.25), run_time=0.4)
        self.play(pots[4].animate.shift(DOWN * 0.25), run_time=0.2)
        self.au_mot("ne pas germer")
        l3 = self.ligne(lettre("S", 40, SUCCES), self.t(":", 32), self.t("ne pas germer", 34, SUCCES)).move_to(P(0, -0.9))
        self.play(FadeIn(l3, shift=UP * 0.15), Indicate(pots[4], color=SUCCES, scale_factor=1.3), run_time=0.5)
        self.au_mot("p égale 0,2")
        vrai = egal("p", "0,2", 72, COUL_P, VERT_OK).move_to(P(0, -2.05))
        self.play(FadeIn(vrai, scale=0.5), run_time=0.4)
        self.play(Flash(vrai[2], color=VERT_OK, line_length=0.35), run_time=0.5)
        self.insister(vrai[2], 1.3)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : 12 colis, X compte les intacts ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=56, color=JAUNE_TITRE).move_to(P(0, 3.4))
        rang = VGroup(*[colis(0.48, k == 6) for k in range(12)])
        rang.arrange_in_grid(3, 4, buff=(0.16, 0.16)).move_to(P(0, 1.55))
        self.play(ReplacementTransform(titre, toi),
                  FadeOut(VGroup(pots, pousses, s, bulle, non, l3, vrai), shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("12 colis")
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in rang], lag_ratio=0.05), run_time=0.6)
        a = self.t("12 colis,", 32, BLEU_CALCUL)
        b = self.t("5 % abîmés", 32, ROUGE_ERREUR)
        l4 = self.ligne(a, b, buff=0.2).move_to(P(0, 0.15))
        self.play(FadeIn(a, shift=UP * 0.15), run_time=0.3)
        self.au_mot("5 %")
        self.play(FadeIn(b, shift=UP * 0.15), Wiggle(rang[6], scale_value=1.4), run_time=0.5)
        self.au_mot("X compte les colis intacts")
        l5 = self.ligne(self.t("X", 36, JAUNE_TITRE), self.t("compte :", 32), self.t("intacts", 34, SUCCES)).move_to(P(0, -0.55))
        intacts = [rang[k] for k in range(12) if k != 6]
        self.play(FadeIn(l5, shift=UP * 0.15), *[c[0].animate.set_stroke(SUCCES, 4) for c in intacts],
                  rang[6].animate.set_opacity(0.35), run_time=0.5)
        self.au_mot("Combien vaut p")
        pq = egal("p", "?", 64, COUL_P, ORANGE_RETENUE).move_to(P(0, -1.25))
        self.play(FadeIn(pq, scale=0.6), run_time=0.35)
        self.insister(pq[2], 1.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.25))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
