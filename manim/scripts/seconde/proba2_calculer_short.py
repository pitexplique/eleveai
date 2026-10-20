# proba2_calculer_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 3 :
# calculer en additionnant les issues. CEINTURE JAUNE. Il AMUSE : « 2 couleurs
# chaudes sur 4, donc 1 chance sur 2 ? » — non, 0,55.
#   · en HAUT la roue de kermesse du coach (parts inégales) qui tourne ;
#   · en BAS, EN MÊME TEMPS : « 1 chance sur 2 ? » barré, 0,4 + 0,15 = 0,55,
#     additionner ✓ / compter barré ;
#   · fin : « rouge 0,4 ou vert 0,2 » : 0,4 + 0,2 = ?, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-calculer-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_calculer_short.py ShortProba2Calculer -o eleveai-maths-seconde-proba-calculer-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/03-calculer/.

import importlib.util
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI))


def _charger(nom_fichier, nom_module):
    if nom_module in sys.modules:
        return sys.modules[nom_module]
    spec = importlib.util.spec_from_file_location(nom_module, ICI / nom_fichier)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[nom_module] = mod
    spec.loader.exec_module(mod)
    return mod


_ep3 = _charger("proba2_calculer.py", "seconde_proba2_calculer")

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402

P, RoueKermesse, echelle_ceintures = _ep3.P, _ep3.RoueKermesse, _ep3.echelle_ceintures
ROUGE_C, VERT_C, JAUNE_C, TXT = _ep3.ROUGE_C, _ep3.VERT_C, _ep3.JAUNE_C, _ep3.TXT

C_ROUE = P(0, 0.5)
R_ROUE = 1.2


class ShortProba2Calculer(Short6e):
    nom_voix = "seconde-proba-calculer-short"

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

    def eteindre(self, roue, ks, op=0.3):
        return [roue.sect[k].animate.set_fill(opacity=op).set_stroke(opacity=op) for k in ks]

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("La roue de kermesse", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        roue = RoueKermesse(C_ROUE, R_ROUE)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(roue, scale=0.8), run_time=0.6)
        self.play(roue.tourner(2, 1.2))
        self.au_mot("2 couleurs chaudes")
        self.play(*self.eteindre(roue, [1, 2]), Indicate(roue.sect[0], color=ROUGE_C, scale_factor=1.08),
                  Indicate(roue.sect[3], color=JAUNE_C, scale_factor=1.08), run_time=0.45)
        sur4 = self.t("2 chaudes sur 4", 36).move_to(P(0, -1.15))
        self.play(FadeIn(sur4, scale=0.6), run_time=0.3)
        self.au_mot("1 chance sur 2")
        q = self.t("1 chance sur 2 ?", 40, ORANGE_RETENUE).move_to(P(0, -1.95))
        self.play(FadeIn(q, scale=0.6), run_time=0.3)
        self.insister(q, 1.25, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : la surprise : 0,55 ──
        self.dire("01-image")
        self.au_mot("Pas avec")
        b1, b2 = self.barrer(sur4), self.barrer(q)
        self.play(Create(b1), Create(b2), run_time=0.3)
        self.play(roue.tourner(1, 0.8), FadeOut(VGroup(sur4, q, b1, b2)), run_time=0.8)
        y = -1.1
        rouge = self.t("0,4", 46, ROUGE_C)
        plus = self.t("+", 46)
        jaune = self.t("0,15", 46, JAUNE_C)
        eg = self.t("=", 46)
        res = self.t("0,55", 50, VERT_OK)
        ligne = VGroup(rouge, plus, jaune, eg, res).arrange(RIGHT, buff=0.15)
        if ligne.width > 4.1:
            ligne.scale_to_fit_width(4.1)
        ligne.move_to(P(0, y))
        self.au_mot("Rouge 0,4")
        l0 = roue.lbl(0, "0,4", 26)
        self.play(FadeIn(l0, scale=0.5), TransformFromCopy(l0, rouge), Indicate(roue.sect[0], color=ROUGE_C, scale_factor=1.08),
                  run_time=0.4)
        self.au_mot("jaune 0,15")
        l3 = roue.lbl(3, "0,15", 22)
        self.play(FadeIn(l3, scale=0.5), FadeIn(plus), TransformFromCopy(l3, jaune),
                  Indicate(roue.sect[3], color=JAUNE_C, scale_factor=1.08), run_time=0.4)
        self.au_mot("0,55")
        self.play(FadeIn(eg), FadeIn(res, scale=0.5), run_time=0.3)
        self.play(Create(SurroundingRectangle(res, color=VERT_OK, buff=0.1)), run_time=0.25)
        self.insister(res, 1.4, 0.25)
        self.au_mot("On additionne")
        add = VGroup(self.t("additionner", 34, VERT_OK), self.coche(taille=0.2)).arrange(RIGHT, buff=0.2)
        add.move_to(P(0, -1.8))
        self.play(FadeIn(add[0], shift=UP * 0.15), Create(add[1]), run_time=0.4)
        self.au_mot("on ne les compte pas")
        cpt = self.t("compter", 34).move_to(P(0, -2.4))
        self.play(FadeIn(cpt, shift=UP * 0.15), run_time=0.3)
        self.play(Create(self.barrer(cpt)), run_time=0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        roue = RoueKermesse(C_ROUE, R_ROUE)
        self.play(Write(toi), FadeIn(roue, scale=0.8), run_time=0.5)
        self.play(roue.tourner(1, 0.6))
        r = self.t("0,4", 46, ROUGE_C)
        plus = self.t("+", 46)
        v = self.t("0,2", 46, VERT_C)
        eg = self.t("=", 46)
        qm = self.t("?", 62, ORANGE_RETENUE)
        VGroup(r, plus, v, eg, qm).arrange(RIGHT, buff=0.18).move_to(P(0, -1.0))
        self.au_mot("rouge 0,4")
        l0 = roue.lbl(0, "0,4", 26)
        self.play(*self.eteindre(roue, [1, 3]), FadeIn(l0, scale=0.5), TransformFromCopy(l0, r),
                  Indicate(roue.sect[0], color=ROUGE_C, scale_factor=1.08), run_time=0.45)
        self.au_mot("vert 0,2")
        l2 = roue.lbl(2, "0,2", 26)
        self.play(FadeIn(l2, scale=0.5), FadeIn(plus), TransformFromCopy(l2, v),
                  Indicate(roue.sect[2], color=VERT_C, scale_factor=1.08), run_time=0.45)
        self.au_mot("combien")
        self.play(FadeIn(eg), FadeIn(qm, scale=0.6), run_time=0.35)
        self.insister(qm, 1.5, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.0))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
