# prop_lycee_evo_reciproque_short.py
# EleveAI — Maths 1re, STMG et 2de (automatismes) — short jumeau de l'épisode
# 13 « L'évolution réciproque » (micro auto_evo_reciproque). CEINTURE BLANCHE
# (échelle entière), rendu UNE fois, sans identité de classe.
#   · EN HAUT, la jauge du score (10 morceaux) : − 20 % = 2 morceaux rouges ;
#   · EN BAS, au même instant, le calcul : 100 → 80 ; 80 × 1,2 = 96 (barré,
#     la jauge n'atteint pas le trait des 100) ; 80 × 1,25 = 100 (vert) ;
#   · 1 question-pause (3 s) : après − 10 %, ≈ + 11,1 % (B) ;
#   · fin : après − 75 %, quelle hausse ? (+ 300 %) en commentaire.
# Centre d'intérêt : jeux-video. Aucun fait réel, pas de source.
#
# Voix : manim/voix/lycee-evo-reciproque-short.json (go de Frédéric le 23/11,
# débit −10) ; WAV : public/sons/lycee-evo-reciproque-short/ ; marques :
# manim/scripts/premiere/prop_lycee_evo_reciproque_short_marques.json.
# Outils (non modifiés) : prop_commun.py (ShortProp), fin_commune.py.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_evo_reciproque_short.py PropLyceeEvoReciproqueShort
# Brouillon : PYTHONIOENCODING=utf-8 python -m manim render -ql -r 480,854 --disable_caching manim/scripts/premiere/prop_lycee_evo_reciproque_short.py PropLyceeEvoReciproqueShort -o eleveai-maths-premiere-evo-reciproque-short --media_dir manim/scripts/premiere/media-prop-lycee-evo-reciproque-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

DEP = "#60a5fa"
HAUSSE = "#22c55e"
BAISSE = "#ef4444"
FOND_B = "#0f172a"
G, U = -1.7, 0.034     # la jauge : bord gauche, longueur d'un point de score


class PropLyceeEvoReciproqueShort(ShortProp):
    nom_voix = "lycee-evo-reciproque-short"
    fichier_marques = "prop_lycee_evo_reciproque_short_marques.json"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for c in cartes:  # la place du ✓, réservée à droite (mesuré le 23/11 : 0 px sans elle)
            corps = c[1][1]
            lim = c[0].get_right()[0] - 0.85
            if corps.get_right()[0] > lim:
                g = corps.get_left()[0]
                corps.scale_to_fit_width(lim - g).align_to(P(g, 0), LEFT)
        ph2 = self.bloc(phrase, 28, VERT_OK).next_to(cartes, DOWN, buff=0.14).set_x(0)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def ligne_rep(self, i, morceaux, fs=28):
        return super().ligne_rep(i, morceaux, fs)

    def lg(self, morceaux, y, fs=34, largeur=3.8):
        g = self.ligne(morceaux, fs, buff=0.3)  # pas « puis− 50 % » (planche du 23/11)
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g.move_to(P(0, y))

    def jouer(self, lg, mots, anims=None, rt=0.3):
        anims = anims or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.12), *anims.get(i, []), run_time=rt)

    def _rep_q(self, sc):
        l0 = sc.ligne_rep(0, ["1 ÷ 0,9", "≈ 1,111 :"])
        l1 = sc.ligne_rep(1, ["+ 11,1 %."])
        sc.au_mot("1 divisé")
        sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("environ 1,111")
        sc.play(FadeIn(l0[1], scale=1.3), run_time=0.3)
        sc.au_mot("plus 11,1")
        sc.play(FadeIn(l1[0], scale=1.3), run_time=0.35)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Revenir au score ?", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche : la jauge perd 20 % ; + 20 % suffit ? ──
        self.dire("00-accroche")
        Y = 1.45
        jauge = VGroup(*[Rectangle(width=10 * U, height=0.55, fill_color=DEP, fill_opacity=1, stroke_color=FOND_B,
                                   stroke_width=2.5) for _ in range(10)]).arrange(RIGHT, buff=0)
        jauge.move_to(P(0, Y)).align_to(P(G, 0), LEFT)
        cadre = SurroundingRectangle(jauge, color=WHITE, buff=0.06, stroke_width=3)
        nom = self.t("Ton score", 30, JAUNE_TITRE).move_to(P(0, Y + 0.58))
        self.au_mot("Ton score")
        self.play(Write(titre), FadeIn(nom), FadeIn(jauge), Create(cadre), run_time=0.5)
        m20 = self.lg([("− 20 %", BAISSE)], 0.45, 44)
        self.au_mot("baisse de 20")
        self.play(FadeIn(m20, scale=1.3), jauge[8].animate.set_fill(BAISSE, 1), jauge[9].animate.set_fill(BAISSE, 1),
                  run_time=0.35)
        p20 = self.lg([("+ 20 % ?", HAUSSE)], -0.55, 52)
        self.au_mot("plus 20")
        self.play(FadeIn(p20, scale=1.3), run_time=0.35)
        self.insister(p20, 1.15, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 01 : 100 → 80 ; 80 × 1,2 = 96 (barré) ; 80 × 1,25 = 100 ──
        self.dire("01-image")
        self.play(FadeOut(m20), FadeOut(p20), run_time=0.25)
        x100 = G + 100 * U
        tr = DashedLine(P(x100, Y - 0.45), P(x100, Y + 0.45), color=JAUNE_TITRE, stroke_width=4)
        t100 = self.t("100", 26, JAUNE_TITRE).next_to(tr, UP, buff=0.06)
        L1 = self.lg([("100 − 20 %", WHITE), ("= 80", DEP)], 0.5)
        self.jouer(L1, ["Non ! 100", "égale 80"],
                   {0: [Create(tr), FadeIn(t100)], 1: [FadeOut(jauge[8]), FadeOut(jauge[9])]})
        x80 = G + 80 * U
        v16 = Rectangle(width=16 * U, height=0.55, fill_color=HAUSSE, fill_opacity=1, stroke_color=WHITE,
                        stroke_width=2).move_to(P(x80 + 8 * U, Y))
        trou = Rectangle(width=4 * U, height=0.55, fill_color=BAISSE, fill_opacity=0.9, stroke_width=0)
        trou.move_to(P(x80 + 18 * U, Y))
        L2 = self.lg([("80 + 20 %", WHITE), ("= 96", BAISSE)], -0.25)
        self.jouer(L2, ["80 plus", "égale 96"], {0: [GrowFromEdge(v16, LEFT)], 1: [FadeIn(trou)]})
        barre = Line(L2.get_left() + LEFT * 0.08, L2.get_right() + RIGHT * 0.08, color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(barre), Indicate(trou, color=BAISSE, scale_factor=1.3), run_time=0.35)
        L3 = self.lg([("Il faut", WHITE), ("+ 25 %", VERT_OK)], -1.05, 40)
        v20 = Rectangle(width=20 * U, height=0.55, fill_color=VERT_OK, fill_opacity=1, stroke_color=WHITE,
                        stroke_width=2).move_to(P(x80 + 10 * U, Y))
        self.jouer(L3, ["Il faut", "plus 25"])
        L4 = self.lg([("80 × 1,25", WHITE), ("= 100", VERT_OK)], -1.8, 38, largeur=3.5)
        self.jouer(L4, ["80 fois", "égale 100"], {1: [FadeOut(v16), FadeOut(trou), GrowFromEdge(v20, LEFT)]})
        self.play(Create(SurroundingRectangle(L4, color=VERT_OK, buff=0.1, corner_radius=0.1)), run_time=0.3)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : la question-pause (3 s) : après − 10 %, ≈ + 11,1 % ──
        choix = [self.t("+ 10 %", 30), self.t("≈ + 11,1 %", 30), self.t("+ 90 %", 30)]
        for c in choix:  # audités à la question ; à la réponse, les cartes ne font que pâlir
            for f in c.get_family():
                f._pas_audit = True
        self.question_pause("02-question", "02b-reponse", ["Après − 10 %, pour revenir,", "il faut environ :"],
                            choix, 1, ["1 ÷ 0,9 ≈ 1,111 :", "+ 11,1 %."], mot_q="Après",
                            autres_r=self._rep_q)

        # ── 03 : la question en commentaire (sans Ti-Margo, règle du 17/11) ──
        self.dire("03-commentaire")
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.3)
        self.remove(*self.mobjects)
        tit = self.t("À toi !", 52, JAUNE_TITRE).move_to(P(0, 2.6))
        self.au_mot("À toi")
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.35)
        Q1 = self.lg([("Après", WHITE), ("− 75 %,", BAISSE)], 1.55, 44)
        self.jouer(Q1, ["après moins", "75"])
        Q2 = self.lg([("quelle hausse", HAUSSE)], 0.8, 44)
        self.jouer(Q2, ["quelle hausse"])
        Q3 = self.lg([("pour revenir ?", WHITE)], 0.05, 44)
        self.jouer(Q3, ["pour revenir"])
        appel_commentaire(self, y=-1.1)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="04-abonne")
