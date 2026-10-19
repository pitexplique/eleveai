# proba_probaT_indep_produit_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Indépendants : la règle du produit » (micros probaT_indep_produit /
# alea_indep_produit). CEINTURE JAUNE. Il AMUSE : deux réveils qui sonnent
# chacun 9 fois sur 10 ; les deux ? 0,9 × 0,9 = 0,81 (moins que 0,9 !) ;
# aucun ? 0,1 × 0,1 = 0,01, une chance sur cent d'être en retard.
#   · en HAUT les deux réveils qui sonnent (ou dorment) ;
#   · en BAS, EN MÊME TEMPS, les calculs qui se remplissent ;
#   · fin : trois alarmes, « aucune ne sonne ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN SEUL rendu suffit,
# copié sous les deux noms (STMG, 1re). Les deux sous-classes existent quand
# même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-indep-produit-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_indep_produit_short.py ShortProbaIndepProduitSTMG -o eleveai-maths-stmg-proba-indep-produit-short --media_dir manim/scripts/stmg/media-probaT_indep_produit
# (ShortProbaIndepProduitPremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/14-indep-produit/ et
# manim/sorties/premiere-commun/maths/probabilites/14-indep-produit/
# (eleveai-maths-premiere-commun-proba-indep-produit-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaT_indep_produit import P, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
BLEU_CLAIR = "#60A5FA"
CORPS = ["#EF4444", "#3B82F6", "#22C55E"]


def reveil(couleur="#EF4444", r=0.5):
    """Un réveil : deux cloches, un marteau, le boîtier, le cadran, deux aiguilles, deux pieds."""
    cloches = VGroup(*[Sector(radius=r * 0.42, angle=PI, start_angle=0, fill_color="#FBBF24", fill_opacity=1,
                              stroke_width=0).rotate(s * 0.55, about_point=ORIGIN).move_to(P(s * r * 0.62, r * 0.98))
                       for s in (-1, 1)])
    marteau = Line(P(0, r * 0.95), P(0, r * 1.25), color="#94A3B8", stroke_width=5)
    pieds = VGroup(*[Line(P(s * r * 0.5, -r * 0.8), P(s * r * 0.75, -r * 1.15), color="#94A3B8", stroke_width=6)
                     for s in (-1, 1)])
    boite = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0)
    cadran = Circle(radius=r * 0.78, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    graduations = VGroup(*[Line(P(0, r * 0.62), P(0, r * 0.7), color="#0F172A", stroke_width=3)
                           .rotate(k * TAU / 12, about_point=ORIGIN) for k in range(12)])
    petite = Line(ORIGIN, P(r * 0.3, r * 0.2), color="#0F172A", stroke_width=5)
    grande = Line(ORIGIN, P(0, r * 0.55), color="#0F172A", stroke_width=4)
    return VGroup(pieds, cloches, marteau, boite, cadran, graduations, petite, grande)


def ondes(clock, couleur="#FBBF24"):
    """Les arcs du son, de chaque côté des cloches."""
    c = clock.get_center() + P(0, clock.height * 0.18)
    w = clock.width / 2
    g = VGroup()
    for s in (-1, 1):
        for k, rr in enumerate((0.18, 0.32)):
            arc = Arc(radius=rr, start_angle=(PI if s < 0 else 0) - 0.6, angle=1.2, color=couleur, stroke_width=4)
            arc.move_arc_center_to(c + P(s * (w + 0.02), 0))
            g.add(arc)
    return g


class ShortProbaIndepProduitBase(Short6e):
    nom_voix = "stmg-premiere-proba-indep-produit-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=50, y=-1.3):
        g = suite(*[Text(tx, font_size=fs, color=c) for tx, c in morceaux], buff=0.14)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def sonner(self, reveils, run_time=0.9):
        """Les réveils tremblent et le son sort des cloches."""
        o = VGroup(*[ondes(r) for r in reveils])
        self.play(*[Wiggle(r, scale_value=1.08, rotation_angle=0.08 * TAU, n_wiggles=8) for r in reveils],
                  FadeIn(o, scale=0.6), run_time=run_time)
        return o

    def titre(self, lignes, couleur=JAUNE_TITRE, fs=40):
        g = VGroup(*[self.t(l, fs, couleur) for l in lignes]).arrange(DOWN, buff=0.08)
        return g.move_to(P(0, 3.35))

    def construct(self):
        self.margo_bas()

        # ── 00 : deux alarmes, chacune 9 fois sur 10 ; les deux ? ──
        self.dire("00-accroche")
        titre = self.titre(["Deux alarmes"], fs=46)
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        r1 = reveil(CORPS[0]).move_to(P(-1.05, 0.85))
        r2 = reveil(CORPS[1]).move_to(P(1.05, 0.85))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(r1, shift=DOWN * 0.4),
                  FadeIn(r2, shift=DOWN * 0.4), run_time=0.8)
        self.au_mot("Chacune sonne")
        o = self.sonner([r1], 0.6)
        l1 = self.t("9 fois sur 10", 21, BLEU_CLAIR).next_to(r1, DOWN, buff=0.15)
        self.play(FadeIn(l1, scale=1.4), FadeOut(o), run_time=0.4)
        o = self.sonner([r2], 0.6)
        l2 = self.t("9 fois sur 10", 21, BLEU_CLAIR).next_to(r2, DOWN, buff=0.15)
        self.play(FadeIn(l2, scale=1.4), FadeOut(o), run_time=0.4)
        self.au_mot("Les deux sonnent")
        o = self.sonner([r1, r2], 0.7)
        q = VGroup(self.t("Les deux :", 40, WHITE), suite(self.t("9 fois sur 10", 40, BLEU_CLAIR),
                                                          self.t("?", 56, ORANGE_RETENUE), buff=0.15))
        q.arrange(DOWN, buff=0.15).move_to(P(0, -1.3))
        self.play(FadeIn(q[0], shift=UP * 0.15), FadeOut(o), run_time=0.4)
        self.au_mot("aussi")
        self.play(FadeIn(q[1], scale=1.3), run_time=0.4)
        self.insister(q[1][1], 1.6, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : 0,9 × 0,9 = 0,81 ; puis 0,1 × 0,1 = 0,01 ──
        self.dire("01-image")
        self.au_mot("indépendantes")
        ind = self.t("indépendantes", 40, ORANGE_RETENUE).move_to(P(0, -0.55))
        self.play(FadeOut(q, shift=DOWN * 0.2), FadeIn(ind, scale=1.4), run_time=0.5)
        self.au_mot("Les deux sonnent")
        o = self.sonner([r1, r2], 0.8)
        p1 = self.ligne([("0,9", BLEU_CLAIR), ("×", WHITE), ("0,9", BLEU_CLAIR), ("=", WHITE), ("0,81", JAUNE_TITRE)],
                        y=-1.35)
        self.au_mot("0,9 fois")
        self.play(FadeIn(p1[0], shift=UP * 0.2), FadeIn(p1[1], scale=1.8), Wiggle(r1), run_time=0.5)
        self.au_mot("0,9, égale")
        self.play(FadeIn(p1[2], shift=UP * 0.2), Wiggle(r2), run_time=0.4)
        self.au_mot("égale 0,81")
        self.play(FadeIn(p1[3]), FadeIn(p1[4], scale=2.0), run_time=0.4)
        self.insister(p1[4], 1.5, 0.25)
        self.au_mot("Moins que 0,9")
        moins = self.titre(["Moins que 0,9 !"], couleur=ORANGE_RETENUE, fs=46)
        self.play(FadeOut(badge), ReplacementTransform(titre, moins), FadeOut(o), run_time=0.5)
        self.play(Wiggle(moins), run_time=0.5)
        self.au_mot("Mais aucune")
        zz = VGroup(*[self.t("z", fs, "#CBD5E1").move_to(r.get_corner(UR) + P(0.1 + 0.15 * k, 0.15 + 0.2 * k))
                      for r in (r1, r2) for k, fs in enumerate((22, 28, 34))])
        aucune = self.titre(["Aucune ne sonne ?"], couleur=JAUNE_TITRE, fs=44)
        self.play(ReplacementTransform(moins, aucune), r1.animate.set_opacity(0.45), r2.animate.set_opacity(0.45),
                  FadeOut(l1), FadeOut(l2), LaggedStart(*[FadeIn(z, shift=UP * 0.2) for z in zz], lag_ratio=0.15),
                  run_time=0.9)
        p2 = self.ligne([("0,1", BLEU_CLAIR), ("×", WHITE), ("0,1", BLEU_CLAIR), ("=", WHITE), ("0,01", JAUNE_TITRE)],
                        y=-2.15)
        self.au_mot("0,1 fois")
        self.play(FadeIn(p2[0], shift=UP * 0.2), FadeIn(p2[1], scale=1.8), run_time=0.4)
        self.au_mot("0,1, égale")
        self.play(FadeIn(p2[2], shift=UP * 0.2), run_time=0.4)
        self.au_mot("égale 0,01")
        self.play(FadeIn(p2[3]), FadeIn(p2[4], scale=2.0), run_time=0.4)
        self.insister(p2[4], 1.5, 0.25)
        self.au_mot("Une chance")
        chance = self.titre(["1 chance sur 100", "d'être en retard"], couleur=VERT_OK, fs=38)
        self.play(ReplacementTransform(aucune, chance), run_time=0.6)
        self.play(Indicate(p2[4], color=VERT_OK, scale_factor=1.3), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 02 : et avec trois alarmes ? ──
        self.dire("02-question")
        self.au_mot("trois alarmes")
        r3 = reveil(CORPS[2]).scale(0.85).move_to(P(1.45, 0.85))
        self.play(FadeOut(VGroup(ind, p1, p2, zz), shift=DOWN * 0.2),
                  r1.animate.scale(0.85).move_to(P(-1.45, 0.85)).set_opacity(1),
                  r2.animate.scale(0.85).move_to(P(0, 0.85)).set_opacity(1),
                  FadeOut(chance), run_time=0.6)
        self.play(FadeIn(r3, shift=LEFT * 0.4, scale=1.3), run_time=0.4)
        trois = self.titre(["Trois alarmes"], fs=46)
        self.play(FadeIn(trois, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("9 fois sur 10")
        neuf = self.t("chacune 9 fois sur 10", 30, BLEU_CLAIR).move_to(P(0, 0.0))
        self.play(FadeIn(neuf, shift=UP * 0.15), run_time=0.4)
        self.au_mot("quelle est la probabilit")
        q2 = VGroup(self.t("Aucune", 46, WHITE), self.t("ne sonne ?", 46, ORANGE_RETENUE)).arrange(DOWN, buff=0.1)
        q2.move_to(P(0, -0.8))
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.5)
        self.insister(q2[1], 1.15, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaIndepProduitSTMG(ShortProbaIndepProduitBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaIndepProduitPremiere(ShortProbaIndepProduitBase):
    identite = "Maths 1re — EleveAI"
