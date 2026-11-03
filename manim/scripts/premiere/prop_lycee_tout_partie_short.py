# prop_lycee_tout_partie_short.py
# EleveAI — Maths 1re (automatismes) — short jumeau de l'épisode 05 « Retrouver
# le tout connaissant une partie » (micro auto_prop_tout_connaissant_partie,
# notion auto_partie_tout). CEINTURE BLANCHE (règle du short blanc, REGLES.md) :
# on VOIT le tout se reconstruire. Il AMUSE : « Ta batterie affiche 30 %… »
#   · EN HAUT, l'image qui bouge : une batterie de téléphone (sans marque) à
#     30 %, ses 3 tranches de 10 % qui se détachent, puis elle se remplit
#     jusqu'à 100 % ;
#   · EN BAS, au même instant : 30 % = 1 200 mAh ; 3 tranches de 10 % = 400 ;
#     100 % = 4 000 mAh ; code couleur partagé : le VERT de la batterie = la
#     charge connue, le JAUNE = le tout retrouvé ;
#   · 1 question-pause (3 s) : 25 % = 1 000 → 4 000 (250 = 1 000 × 0,25 ;
#     1 250 = 1 000 + 25 %) ;
#   · fin : 20 % = 900 mAh, capacité totale ? (4 500) en commentaire.
# Centre d'intérêt : technologie-ia. Chiffres : une batterie de 4 000 mAh,
# ordre de grandeur courant d'un téléphone, inventée : pas de source.
#
# Voix : manim/voix/premiere-prop-tout-partie-short.json (validée par Frédéric
# le 02/11, débit −10) ; WAV : public/sons/premiere-prop-tout-partie-short/ ;
# marques : manim/scripts/premiere/prop_lycee_tout_partie_short_marques.json.
# Outils (non modifiés) : prop_commun.py (ShortProp), canvas_proportion.py.
# Ajouté ICI : Batterie (corps, borne, 10 tranches de 10 %).
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_tout_partie_short.py PropLyceeToutPartieShort
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/prop_lycee_tout_partie_short.py PropLyceeToutPartieShort -o eleveai-maths-premiere-prop-tout-partie-short --media_dir manim/scripts/premiere/media-prop-lycee-tout-partie-short
# Sortie : manim/sorties/premiere/maths/proportionnalite/05-tout-partie/eleveai-maths-premiere-prop-tout-partie-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403

PLEIN = "#22c55e"      # la charge connue (vert)
TOUT_C = "#facc15"     # le tout retrouvé (jaune)
PISTE = "#1e293b"


def pas_audit(m):
    """Décor ou donnée redite : sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


class Batterie(VGroup):
    """La batterie du téléphone : corps sombre, borne à droite, 10 tranches de
    10 % (rectangles, transparents au départ). .tranche(i, couleur) → animation ;
    .seg[i] ; .interieur(a, b) → le rectangle des tranches a à b-1. Rien n'est
    ajouté à la scène."""

    def __init__(self, largeur=3.6, h=1.1, centre=P(0, 1.4), **kw):
        super().__init__(**kw)
        self.corps = RoundedRectangle(width=largeur, height=h, corner_radius=0.16, fill_color=PISTE, fill_opacity=1,
                                      stroke_color=WHITE, stroke_width=5).move_to(centre)
        self.borne = RoundedRectangle(width=0.16, height=h * 0.42, corner_radius=0.05, fill_color=WHITE,
                                      fill_opacity=1, stroke_width=0).next_to(self.corps, RIGHT, buff=0.02)
        W, hh = largeur - 0.2, h - 0.2
        x0 = self.corps.get_left()[0] + 0.1
        self.lt = W / 10
        self.seg = VGroup(*[Rectangle(width=W / 10 - 0.04, height=hh, fill_color=PLEIN, fill_opacity=0,
                                      stroke_width=0).move_to(P(x0 + (i + 0.5) * W / 10, centre[1]))
                            for i in range(10)])
        self.add(self.corps, self.borne, self.seg)

    def tranche(self, i, couleur=PLEIN):
        return self.seg[i].animate.set_fill(couleur, 1)

    def interieur(self, a, b):
        return VGroup(*self.seg[a:b])


class PropLyceeToutPartieShort(ShortProp):
    nom_voix = "premiere-prop-tout-partie-short"
    fichier_marques = "prop_lycee_tout_partie_short_marques.json"
    ceinture = "blanche"

    def etiquette(self, s, mob, fs=28):
        """Le pourcentage écrit SUR la batterie : blanc cerné de noir (lisible sur les tranches)."""
        t = Text(s, font_size=fs, color=WHITE, weight=BOLD)
        t.set_stroke(BLACK, 6, background=True)
        return t.move_to(mob)

    def _disposer_q(self, question, choix, phrase):
        """La phrase de réponse se pose À LA PLACE des choix B et C (estompés puis
        retirés à la réponse) ; la batterie vient dessous, au-dessus de Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        # ⭐ 03/11 (défauts) : pendant la question, l'écran n'avait que du texte ;
        # les cartes, plus étroites, font place à une petite batterie DEBOUT
        # chargée à 25 % (sans la réponse), posée avec l'énoncé (avant_q).
        centre = cartes.get_center()  # avant : les choix (Text) passent dans les nouvelles cartes
        neuves = VGroup(*[self._carte_choix(l, c, 2.75, 28) for l, c in zip("ABC", choix)])
        neuves.arrange(DOWN, buff=0.1).move_to(centre).set_x(-0.55)
        self.cartes_q = neuves
        bd = self.batterie_debout(neuves)
        self.bd = bd
        ph2 = self.borne(self.bloc(phrase, 30, VERT_OK)).next_to(neuves[0], DOWN, buff=0.3).set_x(0)
        self.ph_q = ph2
        return tete, q, neuves, pause, rebours, ph2

    def ligne_rep(self, i, morceaux, fs=30):
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=0.14)
        if lg.width > 4.1:
            lg.scale_to_fit_width(4.1)
        return lg.move_to(self.ph_q[i])

    def batterie_debout(self, cartes):
        """La petite batterie debout, à droite des cartes : 25 % en vert, en bas."""
        corps = RoundedRectangle(width=0.7, height=1.55, corner_radius=0.1, fill_color=PISTE, fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=4)
        borne = RoundedRectangle(width=0.3, height=0.1, corner_radius=0.03, fill_color=WHITE, fill_opacity=1,
                                 stroke_width=0).next_to(corps, UP, buff=0.02)
        plein = Rectangle(width=0.56, height=(1.55 - 0.14) * 0.25, fill_color=PLEIN, fill_opacity=1, stroke_width=0)
        plein.align_to(corps, DOWN).shift(UP * 0.07)
        g = VGroup(corps, borne, plein).move_to(P(1.55, cartes.get_y() + 0.15))
        et = Text("25 %", font_size=26, color=PLEIN, weight=BOLD).next_to(corps, DOWN, buff=0.12)
        return VGroup(g, et)

    def _rep_q(self, sc):
        mb, p25 = self.mb, self.p25
        g = mb.corps.get_left()[0] + 0.1
        W, hh = 10 * mb.lt, mb.corps.height - 0.2
        traits = VGroup(*[DashedLine(P(g + f * W, mb.corps.get_y() + hh / 2 + 0.08),
                                     P(g + f * W, mb.corps.get_y() - hh / 2 - 0.08), color=WHITE, stroke_width=4)
                          for f in (0.25, 0.5, 0.75)])
        reste = Rectangle(width=W * 0.75, height=hh, fill_color=TOUT_C, fill_opacity=1, stroke_width=0)
        reste.move_to(P(g + W * 0.625, mb.corps.get_y()))
        l0 = sc.ligne_rep(0, ["25 % =", "un quart."], fs=30)
        l1 = sc.ligne_rep(1, ["4 ×", "1 000 =", "4 000 mAh."], fs=28)  # 03/11 : 28 sans réduction (et non 30 réduit à ~24)
        sc.au_mot("25 %, c'est")
        sc.play(FadeIn(l0[0], shift=UP * 0.12), FadeOut(sc.cartes_q[1]), FadeOut(sc.cartes_q[2]), FadeIn(mb),
                FadeIn(p25), FadeOut(sc.bd), run_time=0.35)
        sc.au_mot("un quart")
        sc.play(FadeIn(l0[1], shift=UP * 0.12), Create(traits), run_time=0.4)
        sc.au_mot("4 fois")
        sc.play(FadeIn(l1[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("1 000,")
        sc.play(FadeIn(l1[1], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("égale 4 000")
        sc.play(FadeIn(l1[2], scale=1.3), GrowFromEdge(reste, LEFT), run_time=0.5)
        sc.add(traits)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La batterie", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]
        bt = Batterie(centre=P(-0.08, 1.4))

        # ── 00 : l'accroche : 30 % = 1 200 mAh ; capacité totale ? ──
        self.dire("00-accroche")
        self.au_mot("Ta batterie")
        self.play(Write(titre), FadeIn(bt, shift=DOWN * 0.2), run_time=0.6)
        t30 = self.etiquette("30 %", bt.interieur(0, 3))  # 03/11 : À DROITE des 3 tranches, sans déborder dessus
        t30.next_to(bt.seg[2], RIGHT, buff=0.14)
        l1 = self.ligne([("30 % =", PLEIN), ("1 200 mAh", AMBRE)], 44).move_to(P(0, 0.25))
        self.au_mot("30 %")
        self.play(*[bt.tranche(i) for i in range(3)], FadeIn(t30), FadeIn(l1[0], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("1 200")
        self.play(FadeIn(l1[1], scale=1.3), run_time=0.35)
        note = self.ligne([("mAh = milliampères-heures", GREY_B)], 22).move_to(P(0, -0.35))
        self.au_mot("milliampères")
        self.play(FadeIn(note), run_time=0.3)
        q = Text("?", font_size=56, color=GREY_B, weight=BOLD).move_to(bt.interieur(7, 10))
        q2 = self.ligne([("Capacité totale ?", ORANGE_RETENUE)], 32).move_to(P(0, -1.2))
        self.au_mot("Quelle est")
        self.play(FadeIn(q, scale=1.5), run_time=0.3)
        self.au_mot("capacité totale")
        self.play(FadeIn(q2, scale=1.2), run_time=0.4)
        self.insister(q2, 1.08)
        self.attendre_voix(marge=0.2)

        # ── 01 : 30 % = 1 200 → 3 tranches de 10 % = 400 → 100 % = 4 000 ──
        self.dire("01-image")
        self.au_mot("30 % font")
        self.play(FadeOut(q2), FadeOut(note), Indicate(l1, color=PLEIN), Indicate(bt.interieur(0, 3), color=PLEIN),
                  run_time=0.45)
        boites = VGroup(*[RoundedRectangle(width=1.15, height=0.75, corner_radius=0.1, fill_color=PLEIN,
                                           fill_opacity=1, stroke_color=WHITE, stroke_width=3) for _ in range(3)])
        boites.arrange(RIGHT, buff=0.15).move_to(P(0, -0.75))
        e10 = VGroup(*[Text("10 %", font_size=22, color=PLEIN, weight=BOLD).next_to(b, UP, buff=0.08)
                       for b in boites])
        v400 = VGroup(*[Text("400", font_size=30, color=NUIT, weight=BOLD).move_to(b) for b in boites])
        copies = VGroup(*[bt.seg[i].copy().set_fill(PLEIN, 1) for i in range(3)])
        self.au_mot("10 %")
        self.play(*[Transform(copies[i], boites[i]) for i in range(3)], FadeIn(e10), run_time=0.6)
        self.au_mot("font 400")
        self.play(LaggedStart(*[FadeIn(v, scale=1.4) for v in v400], lag_ratio=0.25), run_time=0.5)
        self.au_mot("100 %")
        t100 = self.etiquette("100 %", bt.corps, 32)
        l2 = self.ligne([("100 % =", TOUT_C), ("4 000 mAh", TOUT_C)], 40).move_to(P(0, -1.95))
        l2.scale_to_fit_width(min(l2.width, 3.6))  # le cadre et l'insistance restent loin du bord
        self.play(FadeOut(t30), FadeIn(t100, scale=1.3), FadeIn(l2[0], shift=RIGHT * 0.12),
                  LaggedStart(*[bt.seg[i].animate.set_fill(TOUT_C, 1) for i in range(3, 10)], lag_ratio=0.15),
                  run_time=0.9)
        self.au_mot("4 000")
        self.play(FadeIn(l2[1], scale=1.3), run_time=0.4)
        self.play(Create(SurroundingRectangle(l2[1], color=TOUT_C, buff=0.1, corner_radius=0.1)), run_time=0.3)
        self.insister(l2[1], 1.05)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : la question-pause (3 s) : 25 % = 1 000 mAh ──
        mb = Batterie(largeur=3.0, h=0.6, centre=P(-0.1, -2.45))
        p25 = Rectangle(width=mb.lt * 2.5 - 0.04, height=0.4, fill_color=PLEIN, fill_opacity=1, stroke_width=0)
        p25.align_to(mb.seg[0], LEFT).set_y(mb.corps.get_y())
        self.mb, self.p25 = mb, p25

        self.question_pause("02-question", "02b-reponse", ["25 % de batterie", "= 1 000 mAh.", "Capacité totale ?"],
                            [self.t("4 000", 30), self.t("250", 30), self.t("1 250", 30)], 0,
                            ["25 % = un quart.", "4 × 1 000 = 4 000 mAh."], mot_q="25 %",
                            avant_q=lambda sc: sc.play(FadeIn(sc.bd, shift=UP * 0.15), run_time=0.3),
                            autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question en commentaire : 20 % = 900 mAh ──
        self.dire("03-commentaire")
        b2 = Batterie(centre=P(-0.08, 1.4))
        self.au_mot("À toi")
        self.play(FadeIn(b2, shift=DOWN * 0.2), run_time=0.4)
        t20 = self.etiquette("20 %", b2.interieur(0, 2), 28)  # 03/11 : à droite des 2 tranches
        t20.next_to(b2.seg[1], RIGHT, buff=0.14)
        l1 = self.ligne([("20 % =", PLEIN), ("900 mAh", AMBRE)], 44).move_to(P(0, 0.25))
        self.au_mot("20 %")
        self.play(b2.tranche(0), b2.tranche(1), FadeIn(t20), FadeIn(l1[0], shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("900")
        self.play(FadeIn(l1[1], scale=1.3), run_time=0.35)
        q = Text("?", font_size=56, color=GREY_B, weight=BOLD).move_to(b2.interieur(6, 10))
        l2 = self.ligne([("Capacité totale ?", ORANGE_RETENUE)], 32).move_to(P(0, -0.75))
        self.au_mot("Quelle capacité")
        self.play(FadeIn(q, scale=1.5), FadeIn(l2, scale=1.2), run_time=0.4)
        self.insister(l2, 1.08)
        self.appel_commentaire(y=-1.9)
