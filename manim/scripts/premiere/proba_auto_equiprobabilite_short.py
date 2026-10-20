# proba_auto_equiprobabilite_short.py
# EleveAI — Maths 1re TRONC COMMUN — short jumeau de la série « Probabilités » :
# l'équiprobabilité, Card(A) / Card(Ω). CEINTURE JAUNE. Il AMUSE :
# « 12 producteurs bio sur 40 : tes chances d'en tirer un bio ? »
#   · en HAUT la coopérative : 40 producteurs, les 12 bio en vert, l'anneau du
#     tirage qui saute de l'un à l'autre ;
#   · en BAS, EN MÊME TEMPS : P(bio) = ? → 12/40 → 0,3, puis Card(A) / Card(Ω) ;
#   · fin : les 25 bus dont 5 électriques, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/premiere-commun-proba-equiprobabilite-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/proba_auto_equiprobabilite_short.py ShortProbaEquiprobabilitePremiere -o eleveai-maths-premiere-commun-proba-equiprobabilite-short --media_dir manim/scripts/premiere/media-equiprobabilite
# Puis copier le mp4 dans manim/sorties/premiere-commun/maths/probabilites/26-equiprobabilite/.

import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_auto_equiprobabilite import (  # noqa: E402  (pose les chemins)
    BUS_VERT, VERT_BIO, Cooperative, P, Parc, card, fraction,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaEquiprobabilitePremiere(Short6e):
    nom_voix = "premiere-commun-proba-equiprobabilite-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        return echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def tirage(self, mobs, n=10, fin=None, run_time=0.08):
        rng = random.Random(3)
        anneau = Circle(radius=0.24, color=JAUNE_TITRE, stroke_width=6).move_to(mobs[rng.randrange(len(mobs))])
        self.play(Create(anneau), run_time=0.15)
        for _ in range(n):
            self.play(anneau.animate.move_to(mobs[rng.randrange(len(mobs))]), run_time=run_time)
        if fin is not None:
            self.play(anneau.animate.move_to(fin), run_time=0.2)
        return anneau

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Vanille bio ?", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.35))
        badge = self.badge()
        c = Cooperative(centre=P(0, 0.88), dx=0.37, dy=0.4, s=0.85)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2),
                  LaggedStart(*[FadeIn(p, scale=0.5) for p in c.prods], lag_ratio=0.01), run_time=0.8)
        self.au_mot("12 producteurs bio")
        l1 = self.t("12 bio", 36, VERT_BIO)
        l1b = self.t("sur 40", 36)
        ligne = VGroup(l1, l1b).arrange(RIGHT, buff=0.25).move_to(P(0, -0.75))
        self.play(*c.verdir(), FadeIn(l1, scale=0.5), run_time=0.5)
        self.au_mot("sur 40")
        self.play(FadeIn(l1b, scale=0.5), run_time=0.3)
        self.au_mot("On en tire un au hasard")
        anneau = self.tirage(c.prods, n=12, fin=c.prods[1])
        self.au_mot("tes chances")
        q = VGroup(self.t("P(bio) =", 32), self.t("?", 50, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        q.move_to(P(0, -1.6))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.insister(q[1], 1.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : 12 sur 40 = 0,3 ──
        self.dire("01-image")
        self.play(FadeOut(anneau), FadeOut(ligne), q.animate.move_to(P(0, -0.95)), run_time=0.4)
        self.au_mot("même chance")
        self.play(LaggedStart(*[Indicate(p, color=JAUNE_TITRE, scale_factor=1.4) for p in c.prods], lag_ratio=0.015),
                  run_time=1.0)
        self.au_mot("12 sur 40")
        om, a = c.cadre_omega(), c.cadre_a()
        for cadre in (om, a):
            cadre[0].set_stroke(width=4)
            cadre[0].stretch_to_fit_width(min(cadre[0].width, 4.3))
            cadre[1].scale(0.6).next_to(cadre[0], DOWN, buff=0.04)
        om[1].align_to(om[0], RIGHT).shift(LEFT * 0.1)
        a[1].align_to(a[0], LEFT).shift(RIGHT * 0.1)
        f = fraction(self.t("12", 30, VERT_BIO), self.t("40", 30, BLEU_CALCUL), buff=0.06).move_to(q[1])
        f.align_to(q[1], LEFT)
        self.play(Create(a[0]), FadeIn(a[1]), Create(om[0]), FadeIn(om[1]), ReplacementTransform(q[1], f), run_time=0.6)
        self.au_mot("soit 0,3")
        res = VGroup(self.t("=", 32), self.t("0,3", 40, VERT_OK)).arrange(RIGHT, buff=0.2).next_to(f, RIGHT, buff=0.2)
        grp = VGroup(q[0], f, res)
        self.play(FadeIn(res, scale=0.5), grp.animate.move_to(P(0, -0.95)), run_time=0.45)
        self.insister(res[1], 1.5)
        self.au_mot("Card de A")
        fc = fraction(card("A", 28, VERT_BIO), card("Ω", 28, BLEU_CALCUL), buff=0.05).move_to(P(0, -1.92))
        self.play(FadeIn(fc[0], shift=DOWN * 0.15), Indicate(a, color=VERT_BIO, scale_factor=1.05), run_time=0.4)
        self.au_mot("sur card d'oméga")
        self.play(Create(fc[1]), FadeIn(fc[2], shift=UP * 0.15), Indicate(om[1], color=BLEU_CALCUL), run_time=0.4)
        self.insister(fc, 1.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(self.badge())
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.35))
        pk = Parc(centre=P(0, 0.85), dx=0.72, dy=0.4, s=0.6)
        self.play(Write(toi), LaggedStart(*[FadeIn(b, shift=RIGHT * 0.2) for b in pk.bus], lag_ratio=0.02),
                  run_time=0.6)
        self.au_mot("5 bus électriques")
        l2 = VGroup(self.t("5 électriques", 32, BUS_VERT), self.t("sur 25", 32)).arrange(RIGHT, buff=0.2)
        if l2.width > LARGEUR_MAX:
            l2.scale_to_fit_width(LARGEUR_MAX)
        l2.move_to(P(0, -0.35))
        self.play(*pk.electrifier(), FadeIn(l2[0], scale=0.5), run_time=0.5)
        self.au_mot("sur 25")
        self.play(FadeIn(l2[1], scale=0.5), run_time=0.3)
        self.au_mot("quelle probabilité")
        q2 = VGroup(self.t("P(électrique) =", 34), self.t("?", 50, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        q2.move_to(P(0, -1.0))
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.4)
        self.insister(q2[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.92))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1)
        poignee = Text("@eleveai974", font_size=26, color=BLEU_CALCUL).move_to(P(0, -2.75))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
