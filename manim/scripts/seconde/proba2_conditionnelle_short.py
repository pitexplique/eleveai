# proba2_conditionnelle_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 8 :
# la probabilité conditionnelle. CEINTURE ORANGE. Il AMUSE : « 40 en retard
# sur 400 : donc 10 % des usagers du car ? » — Non !
#   · en HAUT le car jaune qui arrive, puis le TABLEAU CROISÉ du coach
#     (tableau_donnees) dont la ligne « Car jaune » s'allume ;
#   · en BAS, EN MÊME TEMPS, les maths : 40/400 = 10 % ? barré, puis
#     40/160 = 25 % ;
#   · fin : la ligne « Autre trajet », 24/240 = ? %, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-conditionnelle-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_conditionnelle_short.py ShortProba2Conditionnelle -o eleveai-maths-seconde-proba-conditionnelle-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/08-conditionnelle/.

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

# ⛔ Les helpers de la paysage, chargés par CHEMIN EXACT (des modules de même
# nom existent dans d'autres dossiers).
_spec = importlib.util.spec_from_file_location(
    "proba2_conditionnelle_paysage", Path(__file__).resolve().parent / "proba2_conditionnelle.py")
_pa = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pa)
P, TableauCoach, frac_txt, car_jaune = _pa.P, _pa.TableauCoach, _pa.frac_txt, _pa.car_jaune
CAR_L, AUTRE_L, TOT_L, RET_C, TOT_C = _pa.CAR_L, _pa.AUTRE_L, _pa.TOT_L, _pa.RET_C, _pa.TOT_C
NUM, DEN, CAR, RETARD, LIGNE_FOND = _pa.NUM, _pa.DEN, _pa.CAR, _pa.RETARD, _pa.LIGNE_FOND

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

C_TAB = P(0, 0.75)


class ShortProba2Conditionnelle(Short6e):
    nom_voix = "seconde-proba-conditionnelle-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, sw=6):
        return Line(mob.get_corner(DL) + P(-0.06, -0.03), mob.get_corner(UR) + P(0.06, 0.03),
                    stroke_width=sw, color=ROUGE_ERREUR)

    def centrer(self, grp, y, largeur=3.9):
        """Une ligne de calcul centrée, bornée à la largeur du cadre."""
        grp.arrange(RIGHT, buff=0.25)
        if grp.width > largeur:
            grp.scale_to_fit_width(largeur)
        return grp.move_to(P(0, y))

    def tableau(self):
        return TableauCoach(centre=C_TAB, lab_w=1.2, cw=0.88, h=0.52, fs=22, fs_ent=15, titre=None)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Le car jaune", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        car = car_jaune(0.95).move_to(P(-5.0, 0.4))
        self.play(car.animate.move_to(P(0, 0.4)), run_time=0.9, rate_func=rate_functions.ease_out_back)
        self.au_mot("souvent en retard")
        r40 = VGroup(self.t("40", 52, RETARD), self.t("en retard", 34, WHITE)).arrange(RIGHT, buff=0.2)
        r40.move_to(P(0, 1.55))
        self.play(FadeIn(r40, scale=0.5), Wiggle(car), run_time=0.6)
        y = -1.55
        self.au_mot("sur 400")
        f1 = frac_txt(40, 400, 46, ORANGE_RETENUE)
        dix = VGroup(self.t("=", 46, ORANGE_RETENUE), self.t("10 %", 50, ORANGE_RETENUE),
                     self.t("?", 60, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        self.centrer(VGroup(f1, dix), y)
        self.play(FadeIn(f1, scale=0.5), run_time=0.35)
        self.au_mot("Donc 10 %")
        self.play(FadeIn(dix[:2], shift=LEFT * 0.2), run_time=0.35)
        self.play(FadeIn(dix[2], scale=0.4), run_time=0.25)
        self.insister(dix[2], 1.5, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : non, le bon groupe ──
        self.dire("01-image")
        self.au_mot("Non")
        faux = VGroup(f1, dix[:2])
        barre = self.barrer(faux)
        non = self.grand("NON !", font_size=56, color=ROUGE_ERREUR).move_to(P(0, -2.6))
        self.play(Create(barre), FadeIn(non, scale=0.5), run_time=0.35)
        self.au_mot("Le car, c'est")
        tb = self.tableau()
        self.play(FadeOut(VGroup(car, r40)), FadeIn(tb, scale=0.9), run_time=0.45)
        self.au_mot("160 élèves")
        anims = tb.etat(CAR_L)
        v160 = tb.valeur(CAR_L, TOT_C, "160", DEN)
        self.play(*anims, FadeIn(v160, scale=0.4), FadeOut(VGroup(faux, dix[2], barre, non)), run_time=0.45)
        an = tb.anneau(CAR_L, TOT_C)
        self.play(Create(an), run_time=0.25)
        self.au_mot("40 en retard")
        v40 = tb.valeur(CAR_L, RET_C, "40", NUM)
        self.play(FadeIn(v40, scale=0.3), run_time=0.3)
        self.insister(v40, 1.6, 0.2)
        self.au_mot("40 sur 160")
        f2 = frac_txt(40, 160, 46, WHITE, c_num=CAR, c_den=LIGNE_FOND)
        vingt = VGroup(self.t("=", 46), self.t("25 %", 54, VERT_OK)).arrange(RIGHT, buff=0.2)
        self.centrer(VGroup(f2, vingt), y)
        self.play(TransformFromCopy(v40, f2[0]), Create(f2[1]), TransformFromCopy(v160, f2[2]), run_time=0.45)
        self.au_mot("25 %")
        self.play(FadeIn(vingt, shift=LEFT * 0.2), run_time=0.3)
        self.play(Create(SurroundingRectangle(vingt[1], color=VERT_OK, buff=0.1)), run_time=0.2)
        self.au_mot("le bon groupe")
        ligne = VGroup(tb.lab_lig[CAR_L], *[tb.cases[(CAR_L, c)] for c in range(3)])
        self.insister(ligne, 1.12, 0.25)
        self.bring_to_front(an, v40, v160)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        tb = self.tableau()
        self.play(Write(toi), FadeIn(tb), run_time=0.5)
        self.au_mot("24 en retard")
        v24 = tb.valeur(AUTRE_L, RET_C, "24", NUM)
        self.play(FadeIn(v24, scale=0.3), Indicate(tb.lab_col[RET_C], color=RETARD), run_time=0.4)
        self.au_mot("parmi 240")
        anims = tb.etat(AUTRE_L)
        v240 = tb.valeur(AUTRE_L, TOT_C, "240", DEN)
        self.play(*anims, FadeIn(v240, scale=0.4), run_time=0.45)
        self.play(Create(tb.anneau(AUTRE_L, TOT_C)), run_time=0.25)
        self.au_mot("combien de pour cent")
        f3 = frac_txt(24, 240, 44, WHITE, c_num=CAR, c_den=LIGNE_FOND)
        q = VGroup(f3, self.t("=", 44), self.t("?", 64, ORANGE_RETENUE), self.t("%", 46, WHITE))
        q.arrange(RIGHT, buff=0.2).move_to(P(0, -1.15))
        self.play(TransformFromCopy(v24, f3[0]), Create(f3[1]), TransformFromCopy(v240, f3[2]),
                  FadeIn(q[1:]), run_time=0.45)
        self.insister(q[2], 1.5, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.35))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
