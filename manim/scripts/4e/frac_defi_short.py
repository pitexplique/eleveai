# frac_defi_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 12 « Défis sur les fractions »
# (micro fraction_defi, item fixed_1 « 1/2 + 1/3 = 2/5 ? »). CEINTURE JAUNE
# (comme le défi 6e) : un calcul court, mais on le VOIT sur une barre.
# Il AMUSE : Yanis, JOURNALISTE (vérificateur d'infos), démonte un post qui
# buzze : « 1/2 + 1/3 = 2/5 » :
#   · EN HAUT, la barre : 1/2 puis 1/3 → ça dépasse la moitié ;
#   · 2/5 = 2 ÷ 5 = 0,4 = 40 % : moins que la moitié → FAUX ;
#   · le bon calcul : on coupe en sixièmes : 3/6 + 2/6 = 5/6 ≈ 0,83 ≈ 83 % ;
#   · 1 question-pause (3 s) : 1/4 + 1/4 = 1/2 ;
#   · commentaire : « 1/3 + 1/6, quel pourcentage ? » (1/2 = 50 %).
# Le post est inventé. Centres d'intérêt : reseaux-sociaux, jeux-defis.
# Vérifié (Python) : 1/2 + 1/3 = 5/6 ; 2/5 = 0,4 ; 5/6 = 0,833… ;
# 1/4 + 1/4 = 1/2 ; 1/3 + 1/6 = 1/2.
#
# Voix : manim/voix/4e-frac-defi-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_defi_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/frac_defi_short.py FracDefiShort4e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_defi_short.py FracDefiShort4e -o eleveai-maths-4e-frac-defi-short --media_dir manim/scripts/4e/media-frac-defi-short
# Sortie : manim/sorties/4e/maths/fractions/12-defi/eleveai-maths-4e-frac-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotf_commun import *  # noqa: E402,F403

DEMI_C, TIERS_C = "#38bdf8", "#fb923c"
YB = 0.6                    # la barre (en haut)
LB = 3.2                    # sa largeur


class FracDefiShort4e(ShortF):
    nom_voix = "4e-frac-defi-short"
    fichier_marques = "frac_defi_short_marques.json"
    ceinture = "jaune"

    def mots(self, specs, y, fs=34):
        g = self.ligne_mots(specs, fs=fs, buff=0.12)
        self.borne(g, 0.9)
        g.move_to(P(0, y))
        self.jouer_mots(g)
        return g

    def F(self, a, b, fs=40, c=WHITE):
        return EcritureFraction(a, b, fs=fs, couleur=c)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le post qui buzze", self.ceinture)
        self.add(badge, titre)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Yanis et le post ──
        self.dire("00-accroche")
        self.au_mot("Yanis")
        ya = self.bas(self.ligne([("Yanis,", BLEU_CALCUL), ("journaliste", WHITE)], 32), -2.45)
        self.play(FadeIn(ya, scale=0.8), run_time=0.4)
        tel = RoundedRectangle(width=3.4, height=2.4, corner_radius=0.25, fill_color="#0b1220", fill_opacity=1,
                               stroke_color="#94a3b8", stroke_width=5).move_to(P(0, 0.75))
        coeur = self.mor("12 k vues", 24, "#94a3b8")
        pas_audit(coeur).move_to(tel.get_bottom() + UP * 0.35 + LEFT * 0.9)
        self.au_mot("Ce post")
        self.play(FadeIn(tel, shift=UP * 0.2), run_time=0.4)
        post = self.ligne_mots([(self.F(1, 2, 44), WHITE, "1 demi"), ("+", WHITE, None),
                                (self.F(1, 3, 44), WHITE, "1 tiers"), ("=", WHITE, None),
                                (self.F(2, 5, 44, ORANGE_RETENUE), WHITE, "2 cinquièmes")], fs=40, buff=0.15)
        post.move_to(tel).shift(UP * 0.15)
        self.jouer_mots(post)
        self.play(FadeIn(coeur, scale=1.3), run_time=0.3)
        self.au_mot("Vrai")
        vf = self.bas(self.ligne([("Vrai", VERT_OK), ("ou", WHITE), ("faux ?", ROUGE_ERREUR)], 36), -1.4)
        self.play(FadeIn(vf, scale=0.8), run_time=0.4)
        self.insister(vf, 1.08)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 01 : on regarde sur une barre ──
        self.dire("01-voir")
        b = Barre(6, 0, largeur=LB, hauteur=0.6, centre=P(0, YB))
        for t in b.traits:
            t.set_stroke(opacity=0)
        self.au_mot("Regardons")
        self.play(b.apparaitre(0.6), run_time=0.6)
        self.au_mot("1 demi")
        ld = self.F(1, 2, 36, DEMI_C).next_to(b.carte, UP, buff=0.12).set_x(b.x_trait(1.5))
        self.play(b.colorier([0, 1, 2], couleur=DEMI_C, lag=0.05), FadeIn(ld), run_time=0.5)
        self.au_mot("1 tiers")
        lt = self.F(1, 3, 36, TIERS_C).next_to(b.carte, UP, buff=0.12).set_x(b.x_trait(4))
        self.play(b.colorier([3, 4], couleur=TIERS_C, lag=0.05), FadeIn(lt), run_time=0.5)
        self.au_mot("dépasse la moitié")
        mil = DashedLine(P(0, YB + 0.55), P(0, YB - 0.55), color=WHITE, stroke_width=5, dash_length=0.08)
        lm = self.bas(self.t("plus que la moitié !", 34, VERT_OK), -0.85)
        self.play(Create(mil), FadeIn(lm, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 02 : 2/5 = 0,4 = 40 % : moins que la moitié → faux ──
        self.dire("02-faux")
        self.play(FadeOut(lm), run_time=0.2)
        self.au_mot("2 cinquièmes")
        b5 = Barre(5, 2, largeur=LB, hauteur=0.6, couleur=ORANGE_RETENUE, centre=P(0, YB - 1.25))
        mil2 = DashedLine(P(0, YB - 1.25 + 0.55), P(0, YB - 1.25 - 0.55), color=WHITE, stroke_width=5, dash_length=0.08)
        self.play(b5.apparaitre(0.5), Create(mil2), run_time=0.5)
        lc = self.mots([("2 ÷", WHITE, "2 divisé"), ("5", WHITE, "5, égale"), ("= 0,4", BLEU_CALCUL, "0,4"),
                   ("= 40 %", ORANGE_RETENUE, "40 %")], -1.7, fs=36)
        self.au_mot("Moins que la moitié")
        self.play(Indicate(b5.parts[1], color=ROUGE_ERREUR, scale_factor=1.15), run_time=0.4)
        self.au_mot("Le post est faux")
        faux = self.t("FAUX !", 64, ROUGE_ERREUR).rotate(0.15).move_to(P(0, -2.35))
        self.play(FadeIn(faux, scale=2.0), run_time=0.35)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(b5, mil2, faux, lc)), FadeOut(mil), run_time=0.4)
        self.etat = (b, ld, lt)

        # ── 03 : le bon calcul, en sixièmes ──
        self.dire("03-vrai")
        self.au_mot("on coupe en sixièmes")
        self.play(AnimationGroup(*[t.animate.set_stroke(opacity=1) for t in b.traits]), run_time=0.8)
        self.mots([(self.F(1, 2, 36, DEMI_C), WHITE, ("1 demi égale", 1)), ("=", WHITE, None),
                   (self.F(3, 6, 36, DEMI_C), WHITE, ("3 sixièmes. 1", 1)), (" ; ", WHITE, None),
                   (self.F(1, 3, 36, TIERS_C), WHITE, "1 tiers égale"), ("=", WHITE, None),
                   (self.F(2, 6, 36, TIERS_C), WHITE, ("2 sixièmes. 3", 1))], -0.7, fs=34)
        lc = self.mots([(self.F(3, 6, 40, DEMI_C), WHITE, "3 sixièmes plus"), ("+", WHITE, None),
                        (self.F(2, 6, 40, TIERS_C), WHITE, "2 sixièmes, égale"), ("=", WHITE, None),
                        (self.F(5, 6, 40, VERT_OK), WHITE, "5 sixièmes. 5")], -1.75, fs=36)
        self.play(Create(SurroundingRectangle(lc, color=VERT_OK, buff=0.1, corner_radius=0.1, stroke_width=4)), run_time=0.3)
        self.mots([("5 ÷", WHITE, "5 divisé"), ("6", WHITE, "6 :"), ("≈ 0,83", BLEU_CALCUL, "0,83"),
                   ("≈ 83 %", VERT_OK, "83 %")], -2.6, fs=34)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) ──
        self.question_b("04-question", "04b-reponse", ["1/4 + 1/4 = ?"],
                        [bloc_fixe(self.inline("2/8", 30)), bloc_fixe(self.inline("1/2", 30)),
                         bloc_fixe(self.inline("1/8", 30))], 1,
                        [[("2/4", WHITE, "2 quarts"),
                          ("= 1/2", VERT_OK, "1 demi")],
                         [("on n'additionne pas", ROUGE_ERREUR, "On n'additionne"),
                          ("les dénominateurs !", ROUGE_ERREUR, "les dénominateurs")]],
                        fs_rep=26, mot_q="1 quart")
        self.vider(garder)

        # ── 05 : la question en commentaire ──
        self.dire("05-question")
        bq = Barre(6, 0, largeur=LB, hauteur=0.6, centre=P(0, YB))
        self.add(bq)
        q = self.ligne_mots([(self.F(1, 3, 52, TIERS_C), WHITE, "1 tiers", lambda: [bq.colorier([0, 1], couleur=TIERS_C)]),
                             ("+", WHITE, None),
                             (self.F(1, 6, 52, DEMI_C), WHITE, "1 sixième", lambda: [bq.colorier([2], couleur=DEMI_C)]),
                             ("=", WHITE, None), ("? %", ORANGE_TROU, "quel pourcentage")], fs=48, buff=0.18)
        self.borne(q, 0.9)
        q.move_to(P(0, -0.5))
        self.jouer_mots(q)
        self.insister(q[4], 1.5)
        self.appel_commentaire(y=-2.0)
