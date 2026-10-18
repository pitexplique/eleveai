# proba6_lire_short.py
# EleveAI — Maths 6e — short jumeau de la série « Probabilités », épisode 5 :
# lire une situation. CEINTURE JAUNE. Il AMUSE : « 5 gagnants, 50 perdants :
# 5 sur 50 ? » … piège !
#   · en HAUT les tickets : 5 gagnants (ambre), puis 50 perdants (gris, 10 × 5) ;
#     au « piège », les 5 gagnants glissent en 11e colonne : 11 × 5 = 55 ;
#   · en BAS, EN MÊME TEMPS : 5 sur 50 ?, barré ; 5 + 50 = 55 ; 5 sur 55 ;
#   · fin : le canvas « billes » du coach (3 rouges, 7 bleues), la question,
#     « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/6e-proba-lire-short.json (débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/proba6_lire_short.py ShortProba6Lire -o eleveai-maths-6e-proba-lire-short --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/05-lire/.

import importlib.util
import sys
from pathlib import Path

# ⚠️ import PAR CHEMIN EXACT (des modules de même nom existent ailleurs)
_spec = importlib.util.spec_from_file_location("proba6_lire", Path(__file__).resolve().parent / "proba6_lire.py")
_mod = importlib.util.module_from_spec(_spec)
sys.modules["proba6_lire"] = _mod
_spec.loader.exec_module(_mod)  # pose aussi les chemins (manim/, seconde/)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

P, ticket, carte_billes = _mod.P, _mod.ticket, _mod.carte_billes
GAGNANT, PERDANT, ROUGE_BILLE, BLEU_BILLE = _mod.GAGNANT, _mod.PERDANT, _mod.ROUGE_BILLE, _mod.BLEU_BILLE

LARGEUR_MAX = 4.1
W, PX, PY = 0.3, 0.35, 0.26     # ticket, pas en x, pas en y
X0G, Y0G = -1.75, 1.15          # 1re colonne, 1re rangée de la grille
Y_GAG = 1.6                     # la rangée des 5 gagnants


class ShortProba6Lire(Short6e):
    nom_voix = "6e-proba-lire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=40, buff=0.15):
        g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > 3.7:
            g.scale_to_fit_width(3.7)
        return g

    def frac(self, a, b, font_size=56, ca=GAGNANT, cb=JAUNE_TITRE):
        n = Text(str(a), font_size=font_size, color=ca)
        d = Text(str(b), font_size=font_size, color=cb)
        larg = max(n.width, d.width) + 0.16
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=WHITE, stroke_width=4)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.1)

    def insister(self, mob, k=1.4, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Tes chances ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.35))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        gag = VGroup(*[ticket(True, W).move_to(P((i - 2) * PX, Y_GAG)) for i in range(5)])
        self.play(LaggedStart(*[FadeIn(tk, shift=DOWN * 0.4, scale=0.3) for tk in gag], lag_ratio=0.12),
                  run_time=0.6)
        l5 = self.ligne([("5", GAGNANT), ("gagnants", WHITE)], 38).move_to(P(0, -0.55))
        self.play(FadeIn(l5, shift=UP * 0.2), run_time=0.3)
        self.au_mot("50 tickets perdants")
        per = VGroup(*[ticket(False, W).move_to(P(X0G + c * PX, Y0G - r * PY))
                       for r in range(5) for c in range(10)])
        l50 = self.ligne([("50", PERDANT), ("perdants", WHITE)], 38).move_to(P(0, -1.05))
        self.play(LaggedStart(*[FadeIn(tk, shift=DOWN * 0.3) for tk in per], lag_ratio=0.015),
                  FadeIn(l50, shift=UP * 0.2), run_time=0.9)
        self.au_mot("5 sur 50")
        f = self.frac(5, 50, 56).move_to(P(-0.35, -1.9))
        q = Text("?", font_size=80, color=ORANGE_RETENUE).next_to(f, RIGHT, buff=0.3)
        self.play(FadeOut(VGroup(l5, l50)), FadeIn(f, scale=0.5), run_time=0.35)
        self.play(FadeIn(q, scale=0.4), run_time=0.25)
        self.insister(VGroup(f, q), 1.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : le piège ──
        self.dire("01-image")
        piege = self.grand("Piège !", font_size=60, color=ROUGE_ERREUR).move_to(P(0, 3.35))
        croix = Line(f[2].get_corner(DL) + LEFT * 0.08, f[2].get_corner(UR) + RIGHT * 0.08,
                     color=ROUGE_ERREUR, stroke_width=7)
        self.play(ReplacementTransform(titre, piege), FadeOut(q), Create(croix), run_time=0.4)
        self.play(Wiggle(piege, scale_value=1.3), run_time=0.5)
        self.au_mot("5 plus 50")
        calc = self.ligne([("5", GAGNANT), ("+", WHITE), ("50", PERDANT)], 48).move_to(P(0, -0.65))
        self.play(FadeOut(VGroup(f, croix)), FadeIn(calc, shift=UP * 0.2), run_time=0.35)
        # les 5 gagnants glissent en 11e colonne : 11 × 5
        self.play(*[tk.animate.move_to(P(X0G + 10 * PX, Y0G - i * PY)) for i, tk in enumerate(gag)],
                  run_time=0.8, rate_func=rate_functions.ease_in_out_sine)
        self.au_mot("55 tickets en tout")
        tout = VGroup(per, gag)
        cadre = SurroundingRectangle(tout, color=JAUNE_TITRE, buff=0.1, stroke_width=5)
        res = self.ligne([("=", WHITE), ("55", JAUNE_TITRE)], 48)
        groupe = VGroup(calc.copy(), res).arrange(RIGHT, buff=0.2).move_to(P(0, -0.65))
        res.move_to(groupe[1])
        self.play(calc.animate.move_to(groupe[0]), FadeIn(res, shift=LEFT * 0.2), Create(cadre), run_time=0.4)
        self.insister(res[1], 1.4)
        self.au_mot("5 sur 55")
        f2 = self.frac(5, 55, 60, cb=VERT_OK).move_to(P(0, -1.95))
        self.play(FadeIn(f2, scale=0.5), run_time=0.35)
        self.insister(f2, 1.3)
        self.au_mot("Lis bien le total")
        lis = self.grand("Lis bien le total !", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.35))
        self.play(ReplacementTransform(piege, lis), Indicate(cadre, color=JAUNE_TITRE), run_time=0.5)
        self.play(Flash(res[1], color=JAUNE_TITRE, line_length=0.2), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.35))
        self.play(Write(toi), run_time=0.4)
        elements = [(ROUGE_BILLE, "R")] * 3 + [(BLEU_BILLE, "B")] * 7
        carte, billes = carte_billes(elements, r=0.24, pas=0.6)
        carte.move_to(P(0, 0.85))
        self.play(FadeIn(carte[0]), run_time=0.3)
        self.au_mot("3 billes rouges")
        l1 = self.ligne([("3", ROUGE_BILLE), ("rouges", WHITE)], 36)
        self.play(LaggedStart(*[FadeIn(b, scale=0.3) for b in billes[:3]], lag_ratio=0.15), run_time=0.45)
        self.au_mot("7 bleues")
        l2 = self.ligne([("7", BLEU_BILLE), ("bleues", WHITE)], 36)
        lignes = VGroup(l1, l2).arrange(RIGHT, buff=0.4)
        lignes.scale_to_fit_width(3.5).move_to(P(0, -0.5))
        self.play(FadeIn(l1), LaggedStart(*[FadeIn(b, scale=0.3) for b in billes[3:]], lag_ratio=0.08),
                  FadeIn(l2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("tirer une rouge")
        q2 = self.ligne([("une", WHITE), ("rouge", ROUGE_BILLE), ("?", ORANGE_RETENUE)], 42).move_to(P(0, -1.15))
        self.play(FadeIn(q2, scale=0.6), Indicate(billes[:3], color=WHITE, scale_factor=1.3), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.0))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
