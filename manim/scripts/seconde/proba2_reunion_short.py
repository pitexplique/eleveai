# proba2_reunion_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 5 :
# A ∩ B et A ∪ B. CEINTURE JAUNE. Il AMUSE : « un cœur OU une figure : 8 + 12,
# 20 cartes ? »… NON !
#   · en HAUT les 32 cartes en grille 4 × 8 (cœurs en bleu, figures en orange),
#     les 3 figures de cœur clignotent « × 2 » ;
#   · en BAS, EN MÊME TEMPS, le calcul : 8 + 12 = 20 barré, 20 − 3 = 17 cartes ;
#   · fin : « une carte rouge OU un as ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-reunion-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_reunion_short.py ShortProba2Reunion -o eleveai-maths-seconde-proba-reunion-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/05-reunion-intersection/.

import importlib.util
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI))

# Les dessins de la paysage, chargés par CHEMIN EXACT.
_spec = importlib.util.spec_from_file_location("proba2_reunion_seconde", ICI / "proba2_reunion.py")
_pr = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pr)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

P, Grille, frac_txt = _pr.P, _pr.Grille, _pr.frac_txt
CASES_A, CASES_B, CASES_INTER, CASES_UNION = _pr.CASES_A, _pr.CASES_B, _pr.CASES_INTER, _pr.CASES_UNION
COUL_A, COUL_B, COUL_C, FIGURES, COEUR = _pr.COUL_A, _pr.COUL_B, _pr.COUL_C, _pr.FIGURES, _pr.COEUR

C_GRILLE = P(0, 0.45)
Y1, Y2 = -1.25, -2.0       # les deux lignes de maths


class ShortProba2Reunion(Short6e):
    nom_voix = "seconde-proba-reunion-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=40, y=0.0, buff=0.16, largeur=4.1):
        g = VGroup(*[m if isinstance(m, Mobject) else Text(m, font_size=font_size, color=c)
                     for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g.move_to(P(0, y))

    def insister(self, mob, k=1.5, run_time=0.22):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, sw=6):
        return Line(mob.get_corner(DL) + P(-0.06, -0.03), mob.get_corner(UR) + P(0.06, 0.03),
                    stroke_width=sw, color=ROUGE_ERREUR)

    def grille(self):
        return Grille(C_GRILLE, w=0.46, h=0.56, dx=0.52, dy=0.62, police=11)

    def halos(self, g, cases, color, buff=0.03, sw=4):
        return VGroup(*[SurroundingRectangle(g.c[r][k], color=color, buff=buff, stroke_width=sw, corner_radius=0.05)
                        for r, k in cases])

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 8 + 12 = 20 ? ──
        self.dire("00-accroche")
        titre = self.grand("Cœur OU figure ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        g = self.grille()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.15) for c in g], lag_ratio=0.015), run_time=0.8)
        self.au_mot("8 plus")
        ha = self.halos(g, CASES_A, COUL_A)
        huit = Text("8", font_size=52, color=COUL_A)
        plus = VGroup(Text("+", font_size=52), Text("12", font_size=52, color=COUL_B)).arrange(RIGHT, buff=0.16)
        vingt = VGroup(Text("=", font_size=52), Text("20", font_size=52, color=ORANGE_RETENUE),
                       Text("?", font_size=52, color=ORANGE_RETENUE)).arrange(RIGHT, buff=0.16)
        VGroup(huit, plus, vingt).arrange(RIGHT, buff=0.18).move_to(P(0, Y1))
        self.play(*g.allumer(CASES_A), Create(ha), FadeIn(huit, scale=0.5), run_time=0.35)
        self.au_mot("plus 12")
        hb = self.halos(g, CASES_B, COUL_B, buff=0.07)
        self.play(*g.allumer(CASES_UNION), Create(hb), FadeIn(plus, scale=0.5), run_time=0.35)
        self.au_mot("20 cartes")
        self.play(FadeIn(vingt, scale=0.5), run_time=0.3)
        self.insister(vingt[1], 1.4, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : NON ! les 3 figures de cœur comptent deux fois ──
        self.dire("01-image")
        self.au_mot("Non !")
        non = Text("NON !", font_size=110, color=ROUGE_ERREUR, weight=BOLD).rotate(0.18).move_to(C_GRILLE)
        non.set_stroke(BLACK, width=8, background=True)
        croix = self.barrer(vingt[1])
        self.play(FadeIn(non, scale=1.8), Create(croix), run_time=0.3)
        self.play(FadeOut(non, scale=0.8), run_time=0.35)
        self.au_mot("Le valet")
        inter = g.groupe(CASES_INTER)
        x2 = VGroup()
        for k in FIGURES:
            lb = Text("× 2", font_size=18, color=WHITE, weight=BOLD)
            fond = RoundedRectangle(width=lb.width + 0.1, height=lb.height + 0.08, corner_radius=0.05,
                                    fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0)
            x2.add(VGroup(fond, lb.move_to(fond)).move_to(g.c[COEUR][k].get_bottom()).set_z_index(3))
        self.play(LaggedStart(*[FadeIn(x, scale=0.4) for x in x2], lag_ratio=0.3), run_time=0.6)
        self.au_mot("comptés deux fois")
        deux = self.ligne([("comptés deux fois", ROUGE_ERREUR)], 34, Y2)
        self.play(FadeIn(deux, shift=UP * 0.15), run_time=0.25)
        for _ in range(3):  # elles clignotent
            self.play(inter.animate.set_opacity(0.15), run_time=0.15)
            self.play(inter.animate.set_opacity(1), run_time=0.15)
        self.au_mot("20 moins 3")
        res = self.ligne([("20", ORANGE_RETENUE), ("−", WHITE), ("3", ROUGE_ERREUR), ("=", WHITE), ("17", VERT_OK),
                          ("cartes", WHITE)], 50, Y2)
        self.play(FadeOut(deux), FadeIn(res[:3], shift=UP * 0.15), FadeOut(hb), FadeOut(x2), run_time=0.35)
        self.au_mot("17 cartes")
        hu = self.halos(g, CASES_UNION, VERT_OK)
        self.play(FadeIn(res[3:], shift=LEFT * 0.15), FadeOut(ha), FadeIn(hu), run_time=0.4)
        self.play(Create(SurroundingRectangle(res[4], color=VERT_OK, buff=0.08)), run_time=0.25)
        self.insister(res[4], 1.5, 0.22)
        self.attendre_voix(marge=1.0)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        g = self.grille()
        self.play(Write(toi), FadeIn(g), run_time=0.5)
        self.au_mot("une carte rouge")
        rouges = [(r, k) for r in (0, 1) for k in range(8)]
        cr = g.cadre_lignes(0, 1, COUL_C, sw=5)
        self.play(*g.allumer(rouges), Create(cr), run_time=0.4)
        self.au_mot("OU un as")
        cas_ = g.cadre_colonnes(7, 7, BLEU_CALCUL, sw=5)
        self.play(*g.allumer(rouges + [(2, 7), (3, 7)]), Create(cas_), run_time=0.4)
        self.au_mot("combien de cartes")
        q = self.ligne([("rouge", COUL_C), ("OU", JAUNE_TITRE), ("as", BLEU_CALCUL), (":", WHITE),
                        (frac_txt("?", 32, 34, ORANGE_RETENUE), None)], 40, Y1)
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q[4], 1.6, 0.22)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.06)
        appel.move_to(P(0, -2.15))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
