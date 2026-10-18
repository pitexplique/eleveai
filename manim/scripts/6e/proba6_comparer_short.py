# proba6_comparer_short.py
# EleveAI — Maths 6e — short jumeau de la série « Probabilités », épisode 2 :
# comparer (micro : proba_comparer). CEINTURE BLANCHE. Il AMUSE : « 3 couleurs,
# donc 1 chance sur 3 chacune ? »
#   · en HAUT la roue du coach (3 rouges, 2 bleues, 1 verte) qui tourne ;
#   · en BAS, EN MÊME TEMPS, les parts sortent de la roue et se rangent en
#     barres : 3, 2, 1 ; la part verte recopiée 3 fois recouvre le rouge ;
#   · fin : la question, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/6e-proba-comparer-short.json (Julie, débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/proba6_comparer_short.py ShortProba6Comparer -o eleveai-maths-6e-proba-comparer-short --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/02-comparer/.

import importlib.util
import sys
from pathlib import Path

# ⛔ import PAR CHEMIN EXACT : un module de même nom ailleurs se chargerait à la place
_ICI = Path(__file__).resolve().parent
_spec = importlib.util.spec_from_file_location("proba6_comparer", _ICI / "proba6_comparer.py")
_mod = importlib.util.module_from_spec(_spec)
sys.modules["proba6_comparer"] = _mod
_spec.loader.exec_module(_mod)  # pose aussi les chemins (manim/, seconde/)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

P, roue, Toupie, ROUE_6, ENCRE = _mod.P, _mod.roue, _mod.Toupie, _mod.ROUE_6, _mod.ENCRE
C_ROUGE, C_BLEU, C_VERT = _mod.C_ROUGE, _mod.C_BLEU, _mod.C_VERT

LARGEUR_MAX = 4.1
CENTRE = P(0, 0.55)
R = 1.2
COTE, X_BARRE = 0.5, -0.75           # les barres du bas : une case par part
Y_BARRES = {C_ROUGE: -1.0, C_BLEU: -1.65, C_VERT: -2.3}


class ShortProba6Comparer(Short6e):
    nom_voix = "6e-proba-comparer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def roue_short(self):
        """Sans carte blanche, la pointe noire disparaîtrait sur le fond : elle passe en blanc."""
        tout, d = roue(CENTRE, r=R, carte=False)
        tout[-1].set_fill(WHITE)
        return tout, d

    def parts(self, d, couleur):
        return [p for p, c in zip(d, ROUE_6) if c == couleur]

    def case(self, couleur, i):
        return Square(COTE, fill_color=couleur, fill_opacity=1, stroke_color=ENCRE, stroke_width=3).move_to(
            P(X_BARRE + COTE / 2 + i * COTE, Y_BARRES[couleur]))

    def barre(self, d, couleur, nombre):
        """Les parts d'une couleur sortent de la roue et se rangent en barre."""
        ps = self.parts(d, couleur)
        cases = VGroup(*[self.case(couleur, i) for i in range(len(ps))])
        nb = self.t(nombre, 44, couleur).move_to(P(X_BARRE - 0.45, Y_BARRES[couleur]))
        self.play(*[p.animate.scale(1.15, about_point=CENTRE) for p in ps], run_time=0.2)
        self.play(*[p.animate.scale(1 / 1.15, about_point=CENTRE) for p in ps],
                  *[TransformFromCopy(p, c) for p, c in zip(ps, cases)], FadeIn(nb, scale=0.5), run_time=0.45)
        return cases, nb

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("3 couleurs sur la roue", font_size=36, color=JAUNE_TITRE).move_to(P(0, 3.35))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        tout, d = self.roue_short()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(tout, scale=0.6), run_time=0.7)
        top = Toupie(self, d, CENTRE, vitesse=7.0)
        trois = VGroup(*[Circle(radius=0.2, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                         for c in (C_ROUGE, C_BLEU, C_VERT)]).arrange(RIGHT, buff=0.25).move_to(P(0, -1.05))
        self.play(LaggedStart(*[FadeIn(p, scale=0.3) for p in trois], lag_ratio=0.25), run_time=0.5)
        self.au_mot("1 chance sur 3")
        q = VGroup(self.t("1 chance sur 3", 40, ORANGE_RETENUE), self.t("chacune ?", 40, ORANGE_RETENUE))
        q.arrange(DOWN, buff=0.12).move_to(P(0, -1.95))
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q, 1.15, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! les parts se rangent ──
        self.dire("01-image")
        non = self.grand("Non !", font_size=72, color=ROUGE_ERREUR).move_to(P(0, -1.5))
        self.play(FadeOut(q), FadeOut(trois), FadeIn(non, scale=0.5), run_time=0.3)
        top.arreter(0.8)
        self.au_mot("Rouge")
        self.play(FadeOut(non, shift=DOWN * 0.3), run_time=0.2)
        rouge, nr = self.barre(d, C_ROUGE, "3")
        self.au_mot("Bleu")
        bleu, nb = self.barre(d, C_BLEU, "2")
        self.au_mot("Vert")
        vert, nv = self.barre(d, C_VERT, "1")
        self.au_mot("1 seule")
        self.insister(VGroup(vert, nv), 1.3, 0.2)
        self.au_mot("3 fois plus probable")
        trois_f = VGroup(self.t("3 fois", 44, C_ROUGE), self.t("plus probable !", 36, C_ROUGE)).arrange(DOWN, buff=0.08)
        trois_f.move_to(P(0, 3.3))
        self.play(FadeOut(titre, shift=UP * 0.2), FadeIn(trois_f, shift=DOWN * 0.2), run_time=0.35)
        # la part verte, recopiée 3 fois, recouvre exactement le rouge
        verte = self.parts(d, C_VERT)[0]
        copies = []
        for k in (1, 2, 3):
            c = verte.copy().set_stroke(WHITE, 4)
            self.play(Rotate(c, -k * TAU / 6, about_point=CENTRE), run_time=0.3)
            copies.append(c)
        fantomes = VGroup(*[self.case(C_VERT, i).set_fill(opacity=0.45).set_stroke(WHITE, 3) for i in (1, 2)])
        self.play(LaggedStart(*[FadeIn(f, shift=RIGHT * 0.3) for f in fantomes], lag_ratio=0.3), run_time=0.45)
        self.insister(trois_f, 1.15, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=52, color=JAUNE_TITRE).move_to(P(0, 3.35))
        tout, d = self.roue_short()
        self.add(badge, tout)
        self.play(Write(toi), run_time=0.4)
        self.au_mot("le bleu")
        l1 = self.t("le bleu", 32, C_BLEU).move_to(P(0, -0.88))
        self.play(FadeIn(l1, shift=UP * 0.15), *[p.animate.scale(1.15, about_point=CENTRE) for p in self.parts(d, C_BLEU)],
                  run_time=0.3)
        self.play(*[p.animate.scale(1 / 1.15, about_point=CENTRE) for p in self.parts(d, C_BLEU)], run_time=0.2)
        self.au_mot("plus ou moins probable")
        l2 = self.t("plus ou moins probable", 28, WHITE).move_to(P(0, -1.26))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.3)
        self.au_mot("que le rouge")
        l3 = self.t("que le rouge ?", 32, C_ROUGE).move_to(P(0, -1.64))
        self.play(FadeIn(l3, shift=UP * 0.15), *[p.animate.scale(1.15, about_point=CENTRE) for p in self.parts(d, C_ROUGE)],
                  run_time=0.3)
        self.play(*[p.animate.scale(1 / 1.15, about_point=CENTRE) for p in self.parts(d, C_ROUGE)], run_time=0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=38, color=VERT_OK),
                       self.grand("commentaire !", font_size=38, color=VERT_OK)).arrange(DOWN, buff=0.06)
        appel.move_to(P(0, -2.4))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
