# proba_probaT_indep_incompatible_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Indépendants ou incompatibles : deux mots qu'on confond ».
# CEINTURE JAUNE. Il AMUSE : UNE pièce, pile et face. « Indépendants ? » —
# beaucoup répondent oui… et c'est faux !
#   · en HAUT la pièce qui saute et retombe (pile, donc PAS face) ;
#   · en BAS, EN MÊME TEMPS : « incompatibles », « PAS indépendants »,
#     0,5 × 0,5 = 0,25 mais P(pile ∩ face) = 0 ;
#   · fin : deux lancers, « pile au premier » / « pile au second » :
#     indépendants, incompatibles, ou les deux ? « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne, aucune classe à l'écran :
# UN SEUL rendu suffit, copié sous les deux noms (STMG, 1re). Les deux
# sous-classes existent quand même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-indep-incompatible-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_indep_incompatible_short.py ShortProbaIndepIncompatibleSTMG -o eleveai-maths-stmg-proba-indep-incompatible-short --media_dir manim/scripts/stmg/media-probaT_indep_incompatible
# (ShortProbaIndepIncompatiblePremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/16-indep-incompatible/ et
# manim/sorties/premiere-commun/maths/probabilites/16-indep-incompatible/
# (eleveai-maths-premiere-commun-proba-indep-incompatible-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaT_indep_incompatible import COUL_B, COUL_C, ENCRE, P, suite  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
OR = "#FBBF24"
OR_FONCE = "#B45309"


def piece(r=0.64, fs=28):
    """Une pièce : disque doré, liseré, et ses DEUX faces écrites (une seule visible)."""
    d = Circle(radius=r, fill_color=OR, fill_opacity=1, stroke_color=OR_FONCE, stroke_width=6)
    anneau = Circle(radius=r * 0.8, stroke_color=OR_FONCE, stroke_width=2.5)
    pile = Text("PILE", font_size=fs, color=ENCRE, weight=BOLD)
    face = Text("FACE", font_size=fs, color=ENCRE, weight=BOLD).set_opacity(0)
    return VGroup(d, anneau, pile, face)


class ShortProbaIndepIncompatibleBase(Short6e):
    nom_voix = "stmg-premiere-proba-indep-incompatible-short"
    ceinture = "jaune"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, weight=NORMAL):
        t = Text(texte, font_size=font_size, color=color, weight=weight)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=34, y=-1.0):
        g = suite(*[Text(x, font_size=fs, color=c) for x, c in morceaux], buff=0.12)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def lancer(self, pc, demi_tours=6, fin="pile", haut=0.55, duree=0.09):
        """La pièce saute, tourne (demi-tours) et retombe sur `fin`."""
        bas = pc.get_center().copy()
        self.play(pc.animate.shift(UP * haut), run_time=0.25, rate_func=rate_functions.ease_out_quad)
        visible = 0 if pc[2].get_fill_opacity() > 0.5 else 1
        for k in range(demi_tours):
            self.play(pc.animate.stretch(0.04, 1), run_time=duree)
            reste = demi_tours - 1 - k
            if reste == 0:
                visible = 0 if fin == "pile" else 1
            else:
                visible = 1 - visible
            pc[2].set_opacity(1 if visible == 0 else 0)
            pc[3].set_opacity(1 if visible == 1 else 0)
            self.play(pc.animate.stretch(25, 1), run_time=duree)
        self.play(pc.animate.move_to(bas), run_time=0.25, rate_func=rate_functions.ease_in_quad)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : une pièce, pile et face : indépendants ? ──
        self.dire("00-accroche")
        titre = self.grand("Pile et face", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        pc = piece().move_to(P(0, 0.6))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(pc, scale=0.5), run_time=0.7)
        self.lancer(pc, 6, "face")
        self.au_mot("Pile et face")
        cp = self.t("Pile", 28, WHITE).move_to(P(-1.45, 0.6))
        cf = self.t("Face", 28, WHITE).move_to(P(1.45, 0.6))
        self.play(FadeIn(cp, shift=RIGHT * 0.2), FadeIn(cf, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("indépendants ?")
        q = self.ligne([("Indépendants ?", COUL_B)], 40, -0.75)
        self.play(FadeIn(q, scale=1.4), run_time=0.5)
        self.au_mot("Beaucoup répondent oui")
        oui = self.ligne([("Beaucoup :", WHITE), ("« oui ! »", ORANGE_RETENUE)], 34, -1.55)
        self.play(FadeIn(oui, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Et toi ?")
        toi = self.ligne([("Et toi ?", JAUNE_TITRE)], 44, -2.4)
        self.play(FadeIn(toi, scale=1.6), run_time=0.4)
        self.insister(toi, 1.3, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : incompatibles, donc PAS indépendants ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(q, oui, toi), shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("ne peuvent pas arriver ensemble")
        l1 = self.ligne([("Pas ensemble !", WHITE)], 38, -0.75)
        self.play(FadeIn(l1, scale=1.3), Wiggle(pc), run_time=0.7)
        self.au_mot("ils sont incompatibles")
        l1b = self.ligne([("Incompatibles", COUL_C)], 40, -0.75)
        self.play(ReplacementTransform(l1, l1b), run_time=0.5)
        self.insister(l1b, 1.25, 0.2)
        self.au_mot("si tu sais que c'est pile")
        self.lancer(pc, 5, "pile", haut=0.55, duree=0.08)
        self.play(Indicate(cp, color=JAUNE_TITRE, scale_factor=1.5), run_time=0.5)
        self.au_mot("ce n'est pas face")
        croix = VGroup(Line(cf.get_corner(DL) + P(-0.1, -0.1), cf.get_corner(UR) + P(0.1, 0.1)),
                       Line(cf.get_corner(UL) + P(-0.1, 0.1), cf.get_corner(DR) + P(0.1, -0.1)))
        croix.set_stroke(ROUGE_ERREUR, 7)
        self.play(cf.animate.set_opacity(0.35), Create(croix), run_time=0.5)
        self.au_mot("ils ne sont PAS")
        l2 = self.ligne([("PAS indépendants !", ROUGE_ERREUR)], 38, -1.4)
        self.play(FadeIn(l2, scale=1.5), run_time=0.5)
        self.insister(l2, 1.15, 0.2)
        self.au_mot("0,5 fois")
        l3 = self.ligne([("0,5", BLEU_CALCUL), ("×", WHITE), ("0,5", BLEU_CALCUL), ("=", WHITE),
                         ("0,25", JAUNE_TITRE)], 36, -2.05)
        self.play(FadeIn(l3[0], scale=1.4), FadeIn(l3[1]), run_time=0.4)
        self.au_mot("0,5, égale")
        self.play(FadeIn(l3[2], scale=1.4), run_time=0.4)
        self.au_mot("égale 0,25")
        self.play(FadeIn(l3[3]), FadeIn(l3[4], scale=1.6), run_time=0.4)
        self.au_mot("mais P de pile inter face")
        l4 = self.ligne([("P(pile ∩ face)", WHITE), ("=", WHITE)], 34, -2.7)
        zero = Text("0", font_size=40, color=JAUNE_TITRE)
        VGroup(l4, zero).arrange(RIGHT, buff=0.15).move_to(P(0, -2.7))
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        self.au_mot("égale 0")
        self.play(FadeIn(zero, scale=2), run_time=0.4)
        self.play(Indicate(zero, color=ROUGE_ERREUR, scale_factor=1.6), Indicate(l3[4], color=ROUGE_ERREUR),
                  run_time=0.7)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : deux lancers ──
        self.dire("02-question")
        toi2 = self.grand("Et toi ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        p1 = piece(0.55, 24).move_to(P(-1.0, 0.6))
        p2 = piece(0.55, 24).move_to(P(1.0, 0.6))
        self.play(ReplacementTransform(titre, toi2), FadeOut(VGroup(l1b, l2, l3, l4, zero, croix, cp, cf, pc)),
                  FadeIn(p1), FadeIn(p2), run_time=0.6)
        self.au_mot("pile au premier")
        e1 = self.ligne([("« pile au premier »", WHITE)], 32, -0.65)
        self.lancer(p1, 4, "pile", haut=0.55, duree=0.07)
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("pile au second")
        e2 = self.ligne([("« pile au second »", WHITE)], 32, -1.2)
        self.lancer(p2, 4, "pile", haut=0.55, duree=0.07)
        self.play(FadeIn(e2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Indépendants, incompatibles")
        q1 = self.ligne([("Indépendants,", COUL_B), ("incompatibles,", COUL_C)], 30, -1.95)
        q2 = self.ligne([("ou les deux ?", JAUNE_TITRE)], 36, -2.55)
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("ou les deux")
        self.play(FadeIn(q2, scale=1.4), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.3))
        self.play(FadeOut(badge), FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaIndepIncompatibleSTMG(ShortProbaIndepIncompatibleBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaIndepIncompatiblePremiere(ShortProbaIndepIncompatibleBase):
    identite = "Maths 1re — EleveAI"


# 20/10 : le même short pour la 1re SPÉ (ceinture orange).
class ShortProbaIndepIncompatiblePremiereSpe(ShortProbaIndepIncompatibleBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "orange"
