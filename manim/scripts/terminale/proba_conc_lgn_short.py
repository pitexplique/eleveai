# proba_conc_lgn_short.py
# EleveAI — Maths Tle spé (micro concentration_loi_grands_nombres) — short
# jumeau de « La loi des grands nombres ». Ceinture ORANGE.
# Il AMUSE : sept faces de suite (le VRAI début du tirage Python, graine 7833)…
# tu paries sur pile ? Pile ! mais il n'avait pas plus de chances. Puis le
# naturaliste Buffon : 4 040 lancers, 2 048 piles, environ 0,507.
#   · en HAUT les pièces, puis le tableau du coach (lancers, piles) ;
#   · en BAS, EN MÊME TEMPS : 7 faces, « pas de mémoire », 2 048 / 4 040 ≈ 0,507 ;
#   · fin : combien de piles de plus que la moitié ? « Réponds en commentaire ! »
#     (réponse : 2 048 − 2 020 = 28), puis « Entraîne-toi sur eleveai.fr ».
#
# Voix : manim/voix/terminale-proba-conc-lgn-short.json (débit −6).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_conc_lgn_short.py ShortProbaConcLgnTerminale -o eleveai-maths-terminale-proba-conc-lgn-short --media_dir manim/scripts/terminale/media-conc_lgn-s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conc_lgn import (  # noqa: E402
    BLEU_NB, FACE_C, LANCERS, MotsCales, P, Tableau, fraction, piece_fixe, piece_tournante, rangee_pieces, suite,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
assert 2048 - 4040 // 2 == 28


class ShortConc(MotsCales, Short6e):
    """Outils communs aux trois shorts de la concentration."""

    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def cap(self, g, larg=LARGEUR_MAX):
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        b = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.add(b)
        return b

    def appel(self, y=-2.3):
        a = VGroup(self.t("Réponds en", 50, VERT_OK), self.t("commentaire !", 50, VERT_OK)).arrange(DOWN, buff=0.06)
        a.move_to(P(0, y))
        self.play(FadeIn(a, scale=0.7), run_time=0.4)
        self.play(a.animate.scale(1.08), run_time=0.25)
        self.play(a.animate.scale(1 / 1.08), run_time=0.25)
        return a

    def fin(self, cle="03-abonne"):
        """« Entraîne-toi sur eleveai.fr. Et abonne-toi ! » (règle du 19/10)."""
        self.clear()
        self.margo_bas()
        self.dire(cle)
        e = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.2))
        site = self.t("eleveai.fr", 52, BLEU_CALCUL).move_to(P(0, 1.1))
        cad = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        ab = self.t("Abonne-toi !", 50, VERT_OK).move_to(P(0, -0.4))
        po = self.t("@eleveai974", 46, VERT_OK).move_to(P(0, -1.3))
        self.play(Write(e), run_time=0.5)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cad), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(ab, shift=UP * 0.15), GrowFromCenter(po), run_time=0.5)
        self.play(Flash(po, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)


class ShortProbaConcLgnTerminale(ShortConc):
    fichier_marques = "proba_conc_lgn_short_marques.json"
    nom_voix = "terminale-proba-conc-lgn-short"

    def construct(self):
        self.margo_bas()

        # ── 00 : sept faces de suite… tu paries sur pile ? ──
        self.dire("00-accroche")
        self.badge()
        r = 0.38
        rang = rangee_pieces(LANCERS[:8], r=r, buff=0.12)
        VGroup(*rang[4:]).next_to(rang[0], DOWN, buff=0.18, aligned_edge=LEFT)
        rang.move_to(P(0, 1.0))
        sept = VGroup(*rang[:7])
        self.au_mot("Sept faces")
        titre = self.t("7 faces de suite", 46, FACE_C).move_to(P(0, 3.25))
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.5) for p in sept], lag_ratio=0.1),
                  FadeIn(titre, scale=1.3), run_time=1.0)
        bas = suite(self.t("7", 64, FACE_C), self.t("faces", 44, FACE_C), buff=0.2).move_to(P(0, -0.9))
        self.play(TransformFromCopy(titre, bas), run_time=0.4)
        self.au_mot("prochain lancer")
        ancre = Dot(rang[7].get_center(), radius=0.01).set_opacity(0)
        tourne = piece_tournante(ancre, r=r)
        self.add(ancre)
        q = suite(self.t("pile", 50, JAUNE_TITRE), self.t("?", 60, JAUNE_TITRE), buff=0.15).move_to(P(0, -1.9))
        self.play(FadeIn(tourne, scale=0.4), FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.au_mot("tu paries")
        pari = self.t("Tu paries ?", 58, JAUNE_TITRE).move_to(P(0, 3.25))
        self.play(ReplacementTransform(titre, pari), run_time=0.4)
        self.play(Wiggle(pari), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : pile ! pas de mémoire. Buffon : 4 040, 2 048, ≈ 0,507 ──
        self.dire("01-image")
        tourne.clear_updaters()
        pile = rang[7]
        self.play(FadeOut(tourne), FadeIn(pile, scale=2.2), run_time=0.3)
        self.play(pile.animate.scale(1.8), run_time=0.2)
        self.play(pile.animate.scale(1 / 1.8), run_time=0.2)
        self.au_mot("pas plus de chances")
        egal = self.t("pas plus de chances", 40, VERT_OK).move_to(P(0, -1.9))
        self.play(FadeOut(q), run_time=0.2)
        self.play(FadeIn(egal, shift=UP * 0.1), run_time=0.3)
        self.au_mot("pas de mémoire")
        mem = self.t("pas de mémoire !", 50, ORANGE_RETENUE).move_to(P(0, -2.65))
        self.play(FadeIn(mem, scale=1.3), VGroup(*rang[:7]).animate.set_opacity(0.3), run_time=0.5)
        self.au_mot("Buffon")
        tb = Tableau(["lancers", "piles"], [2.05, 2.05], lignes=1, h_ent=0.6, h=0.85, fs_ent=30, fs=38)
        tb.move_to(P(0, 1.05))
        nat = self.t("un naturaliste", 44, VERT_OK).move_to(P(0, 3.25))
        self.play(FadeOut(VGroup(rang, bas, egal, mem)), FadeIn(tb, shift=UP * 0.2),
                  ReplacementTransform(pari, nat), run_time=0.5)
        self.au_mot("4 040")
        n = tb.texte(0, 0, "4 040")
        self.play(FadeIn(n, scale=1.6), tb.allumer(0, 0), run_time=0.4)
        self.au_mot("2 048")
        k = tb.texte(0, 1, "2 048")
        self.play(FadeIn(k, scale=1.6), tb.allumer(0, 0, False), tb.allumer(0, 1), run_time=0.4)
        fr = fraction(self.t("2 048", 50, BLEU_NB), self.t("4 040", 50, BLEU_NB))
        ligne = self.cap(suite(fr, self.t("≈", 54), self.t("0,507", 64, ORANGE_RETENUE), buff=0.2)).move_to(P(0, -1.3))
        self.play(TransformFromCopy(k, fr[0]), Create(fr[1]), TransformFromCopy(n, fr[2]), run_time=0.6)
        self.au_mot("environ 0,507")
        self.play(FadeIn(ligne[1]), FadeIn(ligne[2], scale=1.7), run_time=0.4)
        self.insister(ligne[2], 1.3)
        self.attendre_voix(marge=0.1)

        # ── 02 : combien de plus que la moitié ? ──
        self.dire("02-question")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 58, JAUNE_TITRE).move_to(P(0, 3.25))
        self.play(ReplacementTransform(nat, et), FadeOut(ligne), run_time=0.4)
        self.au_mot("combien de plus")
        q1 = self.t("combien de piles", 44, ORANGE_RETENUE)
        q2 = self.t("de plus que la moitié ?", 40, ORANGE_RETENUE)
        qq = VGroup(q1, q2).arrange(DOWN, buff=0.1).move_to(P(0, -0.75))
        self.play(FadeIn(qq, shift=UP * 0.15), Indicate(k, color=ORANGE_RETENUE), run_time=0.6)
        self.au_mot("Réponds en commentaire")
        self.appel(y=-2.35)
        self.attendre_voix(marge=1.2)

        # ── 03 : la fin ──
        self.fin("03-abonne")
