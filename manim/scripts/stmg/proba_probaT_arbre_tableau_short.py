# proba_probaT_arbre_tableau_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de « De
# l'arbre au tableau croisé, et retour ». CEINTURE JAUNE. Il AMUSE : un arbre,
# ça se transforme en tableau ? Oui, avec 100 personnes !
#   · en HAUT : la grille de 100 bonshommes ; 30 font du sport (orange), puis
#     24 d'entre eux dorment bien (vert) ;
#   · en BAS, EN MÊME TEMPS : l'arbre se construit (100 → 30 → 24), « 80 % de
#     30 = 24 », puis le CHEMIN allumé fait glisser 24 dans SA case du tableau
#     croisé du coach (Grille de proba_pc_conditionnelle_short.py) ;
#   · fin : les 70 autres, 50 % ; « Combien dorment bien en tout ? » et
#     « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran :
# UN seul rendu, copié dans les dossiers STMG et 1re.
#
# Voix : manim/voix/stmg-premiere-proba-arbre-tableau-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_arbre_tableau_short.py ShortProbaArbreTableau -o eleveai-maths-stmg-proba-arbre-tableau-short --media_dir manim/scripts/stmg/media-probaT_arbre_tableau
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/12-arbre-tableau/ et, sous le nom
# eleveai-maths-premiere-commun-proba-arbre-tableau-short.mp4, dans manim/sorties/premiere-commun/maths/probabilites/12-arbre-tableau/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BRANCHE, CHEMIN, pastille  # noqa: E402
from proba_pc_conditionnelle_short import Grille, ballon, joueur  # noqa: E402

LARGEUR_MAX = 4.1
SPORT = ORANGE_RETENUE
DORT = VERT_OK
GRIS = "#94A3B8"


def P(x, y):
    return np.array([x, y, 0.0])


def lune(r=0.13, couleur=JAUNE_TITRE):
    """Un croissant de lune : « dort bien »."""
    c = Difference(Circle(radius=r), Circle(radius=r).shift(P(r * 0.55, r * 0.35)),
                   fill_color=couleur, fill_opacity=1, stroke_width=0)
    return c


def foule_100(pas=0.3, s=0.28):
    """10 × 10 bonshommes gris ; l'indice k = 10 × rangée + colonne."""
    g = VGroup(*[joueur(GRIS, s).move_to(P((c - 4.5) * pas, (4.5 - r) * 0.22)) for r in range(10)
                 for c in range(10)])
    return g


class ShortProbaArbreTableau(Short6e):
    nom_voix = "stmg-premiere-proba-arbre-tableau-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def morceaux(self, *parts, fs=28, buff=0.15):
        g = VGroup(*[Text(m, font_size=fs, color=c) for m, c in parts]).arrange(RIGHT, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def recolorer(self, gens, ks, couleur):
        return [gens[k].animate.set_fill(couleur) for k in ks]

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : un arbre → un tableau ? 100 personnes ──
        self.dire("00-accroche")
        titre = self.grand("Arbre → tableau ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        # les deux icônes : un petit arbre, un petit tableau
        r0 = P(-1.75, 0.6)
        mini_arbre = VGroup(*[Line(a, b, color=WHITE, stroke_width=4) for a, b in (
            (r0, P(-1.15, 1.0)), (r0, P(-1.15, 0.2)), (P(-1.15, 1.0), P(-0.6, 1.2)), (P(-1.15, 1.0), P(-0.6, 0.8)),
            (P(-1.15, 0.2), P(-0.6, 0.4)), (P(-1.15, 0.2), P(-0.6, 0.0)))])
        mini_tab = VGroup(*[Rectangle(width=0.5, height=0.36, stroke_color="#CBD5E1", stroke_width=2,
                                      fill_color=("#1E293B" if r == 0 else "#E0F2FE" if c == 0 else WHITE),
                                      fill_opacity=1).move_to(P(0.5 * c, -0.36 * r)) for r in range(3) for c in range(3)])
        mini_tab.move_to(P(1.3, 0.6))
        fl = Arrow(P(-0.4, 0.6), P(0.35, 0.6), buff=0, color=JAUNE_TITRE, stroke_width=6)
        q = self.t("?", 60, ORANGE_RETENUE).next_to(fl, UP, buff=0.1)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), Create(mini_arbre), run_time=0.9)
        self.au_mot("ça se transforme")
        self.play(GrowArrow(fl), FadeIn(mini_tab, shift=LEFT * 0.3), FadeIn(q, scale=0.4), run_time=0.6)
        self.play(Wiggle(q), run_time=0.5)
        self.au_mot("Oui, avec 100")
        gens = foule_100().move_to(P(0, 0.75))
        l1 = self.morceaux(("100", JAUNE_TITRE), ("personnes", WHITE), fs=40).move_to(P(0, -0.7))
        self.play(FadeOut(VGroup(mini_arbre, mini_tab, fl, q), scale=0.6),
                  LaggedStart(*[FadeIn(g, scale=0.3) for g in gens], lag_ratio=0.006), FadeIn(l1, scale=0.6),
                  run_time=1.0)
        self.play(gens.animate.shift(UP * 0.08), rate_func=there_and_back, run_time=0.3)
        self.au_mot("30 % font")
        l2 = self.morceaux(("30 %", SPORT), ("font du sport", WHITE), fs=34).move_to(P(0, -1.35))
        self.play(FadeIn(l2, shift=UP * 0.15), *self.recolorer(gens, range(30), SPORT), run_time=0.6)
        self.play(*[gens[k].animate.shift(UP * 0.07) for k in range(30)], rate_func=there_and_back, run_time=0.35)
        self.au_mot("80 % dorment")
        l3 = self.morceaux(("parmi eux,", WHITE), ("80 %", DORT), ("dorment bien", WHITE), fs=30)
        l3.move_to(P(0, -2.0))
        zz = self.t("z z z", 26, BLEU_CALCUL).move_to(P(1.6, -1.55))
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.5)
        self.play(FadeIn(zz, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'arbre se construit ; le chemin devient une case ──
        self.dire("01-image")
        carte = RoundedRectangle(width=4.25, height=1.95, corner_radius=0.15, fill_color=WHITE, fill_opacity=1,
                                 stroke_color="#CBD5E1", stroke_width=2).move_to(P(0, 0.2))
        carte.stretch_to_fit_height(1.9)
        R, S, NS = P(-1.65, 0.15), P(-0.3, 0.6), P(-0.3, -0.35)
        SB, SM = P(1.15, 0.85), P(1.15, 0.3)
        brs = [Line(a, b, color=BRANCHE, stroke_width=4) for a, b in ((R, S), (R, NS), (S, SB), (S, SM))]
        p100 = pastille("100", 24).move_to(R).set_z_index(3)
        self.play(FadeOut(VGroup(l1, l2, l3, zz, badge), shift=DOWN * 0.2),
                  gens.animate.scale(0.66).move_to(P(0, 2.05)), FadeIn(carte), run_time=0.7)
        self.au_mot("Sur 100")
        self.play(FadeIn(p100, scale=1.6), Indicate(gens, color=WHITE, scale_factor=1.05), run_time=0.6)
        self.au_mot("30 font du sport")
        p30 = pastille("30", 24).move_to(S).set_z_index(3)
        b_s = ballon(0.13).next_to(p30, LEFT, buff=0.08).shift(UP * 0.12)
        self.play(Create(brs[0]), Create(brs[1]), run_time=0.4)
        self.play(FadeIn(p30, scale=1.6), FadeIn(b_s), *[gens[k].animate.scale(1.2) for k in range(30)], run_time=0.4)
        self.play(*[gens[k].animate.scale(1 / 1.2) for k in range(30)], run_time=0.25)
        self.au_mot("80 % de 30")
        self.play(Create(brs[2]), Create(brs[3]), run_time=0.4)
        b80 = Text("80 %", font_size=22, color="#2563EB", weight=BOLD)
        d = SB - S
        n = np.array([-d[1], d[0], 0.0]) / np.linalg.norm(d)
        b80.move_to(S + 0.4 * d + n * 0.2)
        calc = self.morceaux(("80 % de", WHITE), ("30", SPORT), ("=", WHITE), ("24", DORT), fs=40)
        calc.move_to(P(0, -1.05))
        self.play(FadeIn(b80, scale=1.5), FadeIn(calc[:2], shift=UP * 0.15), run_time=0.5)
        self.au_mot("ça fait 24")
        p24 = pastille("24", 24).move_to(SB).set_z_index(3)
        m24 = lune(0.12, "#1E3A8A").next_to(p24, RIGHT, buff=0.08)
        self.play(FadeIn(calc[2:], scale=1.4), *self.recolorer(gens, range(24), DORT), run_time=0.5)
        self.play(TransformFromCopy(calc[3], p24), FadeIn(m24), run_time=0.5)
        self.au_mot("sport ET bien dormi")
        et = self.morceaux(("sport", SPORT), ("ET", JAUNE_TITRE), ("bien dormi", DORT), fs=34).move_to(P(0, -1.7))
        self.play(brs[0].animate.set_stroke(CHEMIN, 9), brs[2].animate.set_stroke(CHEMIN, 9),
                  FadeIn(et, shift=UP * 0.15), run_time=0.5)
        self.insister(et[1], 1.4, 0.2)
        self.au_mot("Le chemin de l'arbre")
        g = Grille(["Sport", "Pas sport"], ["Dort bien", "Dort mal"], larg_lab=1.25, larg=1.42, hs=(0.38, 0.48, 0.48), haut=-1.0)
        self.play(*[Indicate(b, color=CHEMIN, scale_factor=1.05) for b in (brs[0], brs[2])], run_time=0.5)
        self.au_mot("une case du tableau")
        self.play(FadeOut(VGroup(calc, et), shift=DOWN * 0.2), FadeIn(g, shift=UP * 0.3), run_time=0.5)
        self.au_mot("du tableau : 24")
        v24 = Text("24", font_size=34, color="#0F172A", weight=BOLD).move_to(g.case(0, 0)).set_z_index(4)
        self.play(TransformFromCopy(p24[1], v24, path_arc=-0.6), g.case(0, 0).animate.set_fill("#FEF08A")
                  .set_stroke("#EAB308", 5), run_time=0.8)
        self.insister(v24, 1.5, 0.25)
        self.attendre_voix(marge=0.1)
        self.question(titre, gens, brs, g, v24, NS)

    # ── 02 : les 70 autres ; la question ──

    def question(self, titre, gens, brs, g, v24, NS):
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        NSB, NSM = P(1.15, -0.1), P(1.15, -0.6)
        br_n = VGroup(Line(NS, NSB, color=BRANCHE, stroke_width=4), Line(NS, NSM, color=BRANCHE, stroke_width=4))
        self.play(ReplacementTransform(titre, toi), brs[0].animate.set_stroke(BRANCHE, 4),
                  brs[2].animate.set_stroke(BRANCHE, 4), run_time=0.5)
        self.au_mot("70 autres")
        p70 = pastille("70", 24).move_to(NS).set_z_index(3)
        self.play(FadeIn(p70, scale=1.6), *[gens[k].animate.scale(1.2) for k in range(30, 100)], run_time=0.5)
        self.play(*[gens[k].animate.scale(1 / 1.2) for k in range(30, 100)], run_time=0.25)
        self.au_mot("50 %")
        b50 = Text("50 %", font_size=22, color="#2563EB", weight=BOLD)
        d = NSB - NS
        n = np.array([-d[1], d[0], 0.0]) / np.linalg.norm(d)
        b50.move_to(NS + 0.55 * d + n * 0.17)
        qn = self.t("?", 34, ROUGE_ERREUR).move_to(NSB + RIGHT * 0.12)
        m2 = lune(0.12, "#1E3A8A").next_to(qn, RIGHT, buff=0.08)
        self.play(Create(br_n), run_time=0.35)
        self.play(FadeIn(b50, scale=1.5), FadeIn(qn, scale=1.5), FadeIn(m2), run_time=0.45)
        self.au_mot("Combien de personnes")
        q1 = self.morceaux(("Combien", WHITE), ("dorment bien", DORT), fs=38)
        q2 = self.t("en tout ?", 38, WHITE)
        qq = VGroup(q1, q2).arrange(DOWN, buff=0.12).move_to(P(0, -1.25))
        self.play(FadeOut(VGroup(g, v24), shift=DOWN * 0.3), FadeIn(qq, shift=UP * 0.2), run_time=0.6)
        self.insister(q1[1], 1.25, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
