# proba2_arbre_chemins_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 10 :
# les chemins de l'arbre. CEINTURE ORANGE. Il AMUSE : « 90 % et 80 % finissent :
# donc 85 % ? » — Pas la moyenne !
#   · en HAUT les coureurs du trail de Cilaos (réunionnais / autres), puis
#     l'ARBRE du coach (carte blanche) dont les deux chemins vers F s'allument ;
#   · en BAS, EN MÊME TEMPS, les maths : 85 % ? barré, puis
#     0,7 × 0,9 + 0,3 × 0,8 = 0,87 ;
#   · fin : « si 90 % venaient de La Réunion ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-arbre-chemins-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_arbre_chemins_short.py ShortProba2ArbreChemins -o eleveai-maths-seconde-proba-arbre-chemins-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/10-arbre-chemins/.

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

# ⛔ Les helpers de la paysage, chargés par CHEMIN EXACT (des modules de même
# nom existent dans d'autres dossiers).
_spec = importlib.util.spec_from_file_location(
    "proba2_arbre_chemins_paysage", Path(__file__).resolve().parent / "proba2_arbre_chemins.py")
_pa = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pa)
P, ArbreCoach, coureur, montagnes = _pa.P, _pa.ArbreCoach, _pa.coureur, _pa.montagnes
PROBA, C_RF, C_NRF = _pa.PROBA, _pa.C_RF, _pa.C_NRF

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

C_ARBRE = P(0, 0.5)
BLEU_C = "#38BDF8"   # le maillot des autres coureurs


class ShortProba2ArbreChemins(Short6e):
    nom_voix = "seconde-proba-arbre-chemins-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=40, buff=0.16):
        g = VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > 4.1:
            g.scale_to_fit_width(4.1)
        return g

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, sw=6):
        return Line(mob.get_corner(DL) + P(-0.06, -0.03), mob.get_corner(UR) + P(0.06, 0.03),
                    stroke_width=sw, color=ROUGE_ERREUR)

    def arbre(self):
        return ArbreCoach(centre=C_ARBRE, dx=1.2, dy1=0.55, dy2=0.28, fs=19, lab_fs=24, titre=None,
                          ecart=0.19)


    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Trail de Cilaos", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        m = montagnes(4.3, 1.1).move_to(P(0, 1.1))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(m, shift=UP * 0.2), run_time=0.6)
        g1 = VGroup(*[coureur(ORANGE_RETENUE, 0.45) for _ in range(3)]).arrange(RIGHT, buff=0.06).move_to(P(-1.1, 0.2))
        g2 = VGroup(*[coureur(BLEU_C, 0.45) for _ in range(3)]).arrange(RIGHT, buff=0.06).move_to(P(1.1, 0.2))
        e1 = self.t("réunionnais", 22, ORANGE_RETENUE).next_to(g1, DOWN, buff=0.15)
        e2 = self.t("autres", 22, BLEU_C).next_to(g2, DOWN, buff=0.15)
        self.play(FadeIn(g1, shift=RIGHT * 0.4), FadeIn(g2, shift=RIGHT * 0.4), FadeIn(e1), FadeIn(e2), run_time=0.4)
        self.au_mot("90 %")
        p1 = self.t("90 %", 40, VERT_OK).move_to(P(-1.1, -0.95))
        self.play(FadeIn(p1, scale=0.5), Indicate(g1, color=VERT_OK), run_time=0.35)
        self.au_mot("80 %")
        p2 = self.t("80 %", 40, VERT_OK).move_to(P(1.1, -0.95))
        self.play(FadeIn(p2, scale=0.5), Indicate(g2, color=VERT_OK), run_time=0.35)
        self.au_mot("Donc 85 %")
        q = VGroup(self.t("85 %", 64, ORANGE_RETENUE), self.t("?", 72, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        q.move_to(P(0, -1.95))
        tous = self.t("de tous les coureurs", 26).next_to(q, DOWN, buff=0.12)
        self.play(FadeIn(q, scale=0.5), FadeIn(tous), run_time=0.35)
        self.insister(q[1], 1.4, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : pas la moyenne ! ──
        self.dire("01-image")
        self.au_mot("Pas la moyenne")
        barre = self.barrer(q[0])
        non = self.grand("pas la moyenne !", font_size=40, color=ROUGE_ERREUR).move_to(P(0, -1.0))
        self.play(Create(barre), FadeOut(VGroup(p1, p2)), FadeIn(non, scale=0.6), run_time=0.35)
        self.au_mot("70 % viennent")
        foule = VGroup(*[coureur(ORANGE_RETENUE if k < 7 else BLEU_C, 0.38) for k in range(10)])
        foule.arrange(RIGHT, buff=0.02).move_to(P(0, 0.35))
        if foule.width > 4.2:
            foule.scale_to_fit_width(4.2)
        p7 = self.t("70 %", 40, ORANGE_RETENUE).next_to(foule[:7], DOWN, buff=0.12)
        self.play(FadeOut(VGroup(g1, g2, e1, e2)), FadeOut(VGroup(q, barre, tous, non)),
                  LaggedStart(*[FadeIn(c, shift=RIGHT * 0.3) for c in foule], lag_ratio=0.08), run_time=0.7)
        self.play(FadeIn(p7, scale=0.5), Indicate(foule[:7], color=ORANGE_RETENUE), run_time=0.35)
        self.au_mot("0,7 fois 0,9")
        A = self.arbre()
        self.play(FadeOut(VGroup(m, foule, p7)), FadeIn(A), FadeIn(A.depart), Create(A.b1), Create(A.b2),
                  FadeIn(A.l1), FadeIn(A.l2), run_time=0.4)
        l1 = self.ligne([("0,7", PROBA), ("×", WHITE), ("0,9", PROBA)], 44)
        l1.move_to(P(0, -1.05))
        self.play(*A.allumer(0), FadeIn(A.q1[0], scale=0.5), FadeIn(A.q2[0], scale=0.5), FadeIn(l1, shift=UP * 0.1),
                  run_time=0.4)
        self.au_mot("plus 0,3 fois 0,8")
        l2 = self.ligne([("+", WHITE), ("0,3", PROBA), ("×", WHITE), ("0,8", PROBA)], 44)
        l2.move_to(P(0, -1.72))
        self.play(*A.allumer(2), FadeIn(A.q1[1], scale=0.5), FadeIn(A.q2[2], scale=0.5), FadeIn(l2, shift=UP * 0.1),
                  run_time=0.4)
        self.au_mot(": 0,87")
        l3 = self.ligne([("=", WHITE), ("0,87", VERT_OK)], 58)
        l3.move_to(P(0, -2.47))
        self.play(FadeIn(l3, scale=0.5), run_time=0.3)
        self.play(Create(SurroundingRectangle(l3[1], color=VERT_OK, buff=0.1)), run_time=0.2)
        self.insister(l3[1], 1.3, 0.2)
        self.au_mot("C'est l'arbre")
        self.insister(VGroup(A, A.depart, A.b1, A.b2, A.l1, A.l2, A.q1, A.q2[0], A.q2[2]), 1.12, 0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        A = self.arbre()
        self.play(Write(toi), FadeIn(A), FadeIn(A.depart), FadeIn(A.b1), FadeIn(A.b2), FadeIn(A.l1),
                  FadeIn(A.l2), FadeIn(A.q2[0]), FadeIn(A.q2[2]), run_time=0.5)
        self.au_mot("si 90 %")
        n90 = self.t("90 %", 24, ORANGE_RETENUE).move_to(A.q1[0].get_center() + P(-0.2, 0.14))
        self.play(A.b1[0].animate.set_stroke(ORANGE_RETENUE, 9), FadeIn(n90, scale=0.5), run_time=0.4)
        self.insister(n90, 1.5, 0.2)
        self.au_mot("ce serait combien")
        q = self.t("combien ?", 54, ORANGE_RETENUE).move_to(P(0, -1.0))
        self.play(FadeIn(q, scale=0.6), *A.allumer(0), *A.allumer(2), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
