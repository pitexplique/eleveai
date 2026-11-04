# denombrement_defi.py
# EleveAI — Maths Tle spé — paysage « Dénombrement : un exercice de bac »
# (16:9), ceinture BLEUE. Micro du coach : denombrement_defi
# (lib/tutor-v4/questionBank/terminale-spe/maths/denombrement.bank.ts).
# Rédaction du bac EN LIGNES, comme continuite_tvi.py. Short jumeau :
# denombrement_defi_short.py (les poignées de main).
#
# Clé de voix → écran :
#   · 00-accroche     : la caisse de 20 rivets (4 rouges), 3 pris au hasard ;
#   · 01-titre        : page de garde, l'échelle ENTIÈRE (bleue) ;
#   · 02-metier       : Karima, ingénieure qualité ; un rivet testé est détruit ;
#   · 03-enonce       : l'énoncé, ses cinq questions numérotées ;
#   · 04-reconnaitre  : pas d'ordre, pas de répétition → combinaison ;
#   · 05/05b          : question-pause n° 1 (C : 3 parmi 20 = 1 140) ;
#   · 06-rediger      : les lignes 1 et 2 (1 140 ; 3 parmi 16 = 560) ;
#   · 07/07b          : question-pause n° 2 (B : 4 × 120 = 480) ;
#   · 08-rediger      : les lignes 3 et 4 (480 ; 1 140 − 560 = 580) ;
#   · 09-verifier     : 480 + 96 + 4 = 580, la barre des 1 140 prélèvements ;
#   · 10-piege        : 4 × 171 = 684, un prélèvement compté deux fois ;
#   · 11-probabilite  : 580 / 1 140 ≈ 0,51 ; « 3 rivets, c'est trop peu » ;
#   · 12/12b          : le défi (10 pièces, 3 défectueuses) et sa correction ;
#   · 13-appris       : « Ce que tu as appris », titre en haut et centré ;
#   · 14-abonne       : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
#
# Code couleur du lot : bleu = l'ordre compte, orange = sans ordre /
# combinaison, vert = résultat juste, rouge = piège (et les rivets défectueux).
# ⛔ Pas de LaTeX : « k parmi n » = deux Text empilés entre grandes parenthèses.
# ⛔ Rien n'apparaît avant que la voix le dise (marques : denombrement_defi_marques.json).
#
# Voix : manim/voix/terminale-denombrement-defi.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/denombrement_defi.py DenombrementDefiTerminale -o eleveai-maths-terminale-denombrement-defi --media_dir manim/scripts/terminale/media-denombrement-defi
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-defi/

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import P, puissance  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from denombrement_pascal import FOND_CARTE, SANS_ORDRE, OutilsDenombrement, binom, personne  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

C = math.comb
# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert C(20, 3) == 1140 == 20 * 19 * 18 // 6 and C(16, 3) == 560 and C(16, 2) == 120
assert C(4, 1) * C(16, 2) == 480 and 1140 - 560 == 580 and 4 + 120 == 124 and 4 * 560 == 2240
assert C(4, 2) * 16 == 96 and C(4, 3) == 4 and 480 + 96 + 4 == 580
assert C(19, 2) == 171 and 4 * 171 == 684
assert f"{580 / 1140:.2f}" == "0.51"
assert C(10, 2) == 45 and C(7, 2) == 21 and 45 - 21 == 24 and f"{24 / 45:.2f}" == "0.53"

BON, DEFAUT = "#CBD5E1", ROUGE_ERREUR
BOIS = "#92400E"


def rivet(defectueux=False, s=1.0):
    """Un rivet : la tête bombée, la tige ; défectueux = rouge et fissuré."""
    c = DEFAUT if defectueux else BON
    tete = Ellipse(width=0.42, height=0.2, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0, 0.12))
    tige = Rectangle(width=0.14, height=0.34, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0, -0.08))
    g = VGroup(tige, tete)
    if defectueux:
        g.add(VMobject(stroke_color="#450a0a", stroke_width=3).set_points_as_corners(
            [P(-0.03, 0.2), P(0.03, 0.08), P(-0.02, -0.02), P(0.04, -0.15)]))
    return g.scale(s)


def caisse(rouges=(), n=20, cols=5, s=1.0):
    """La caisse de bois et ses rivets (une grille cols × n/cols)."""
    lignes = n // cols
    fond = Rectangle(width=cols * 0.55 + 0.3, height=lignes * 0.55 + 0.3, fill_color="#3b2412", fill_opacity=1,
                     stroke_color=BOIS, stroke_width=5)
    planches = VGroup(*[Line(fond.get_left() + UP * (y - lignes * 0.55 / 2 - 0.15) + RIGHT * 0.05,
                             fond.get_right() + UP * (y - lignes * 0.55 / 2 - 0.15) + LEFT * 0.05,
                             stroke_color=BOIS, stroke_width=1.5).set_opacity(0.5)
                        for y in np.arange(0.3, lignes * 0.55 + 0.3, 0.55)])
    rv = VGroup(*[rivet(i in rouges).move_to(P((i % cols - (cols - 1) / 2) * 0.55, ((lignes - 1) / 2 - i // cols) * 0.55))
                  for i in range(n)])
    return VGroup(fond, planches, rv).scale(s)


def avion(s=1.0, color="#94A3B8"):
    corps = RoundedRectangle(width=3.0, height=0.42, corner_radius=0.2, fill_color=color, fill_opacity=1,
                             stroke_width=0)
    aile = Polygon(P(-0.3, 0.0), P(0.5, 0.0), P(-0.5, -1.0), P(-0.95, -1.0), fill_color=color, fill_opacity=1,
                   stroke_width=0)
    aile2 = Polygon(P(-0.3, 0.1), P(0.4, 0.1), P(-0.3, 0.75), P(-0.65, 0.75), fill_color="#64748B", fill_opacity=1,
                    stroke_width=0)
    deriv = Polygon(P(-1.5, 0.1), P(-1.1, 0.1), P(-1.45, 0.7), P(-1.65, 0.7), fill_color=color, fill_opacity=1,
                    stroke_width=0)
    hublots = VGroup(*[Dot(P(x, 0.06), radius=0.045, color="#1e3a8a") for x in np.arange(-0.8, 1.2, 0.25)])
    nez = Ellipse(width=0.4, height=0.3, fill_color="#1e3a8a", fill_opacity=1, stroke_width=0).move_to(P(1.32, 0.04))
    return VGroup(aile2, corps, deriv, aile, hublots, nez).scale(s)


def piece(defectueuse=False, s=1.0):
    """Une pièce mécanique (écrou) : hexagone percé."""
    c = DEFAUT if defectueuse else BON
    h = RegularPolygon(6, fill_color=c, fill_opacity=1, stroke_width=0).scale(0.22)
    trou = Circle(radius=0.08, fill_color="#0f172a", fill_opacity=1, stroke_width=0)
    return VGroup(h, trou).scale(s)


def fraction(num, den, color=WHITE, fs=40):
    n = num if isinstance(num, Mobject) else Text(num, font_size=fs, color=color)
    d = den if isinstance(den, Mobject) else Text(den, font_size=fs, color=color)
    w = max(n.width, d.width) + 0.15
    barre = Line(LEFT * w / 2, RIGHT * w / 2, color=color, stroke_width=3)
    n.next_to(barre, UP, buff=0.1)
    d.next_to(barre, DOWN, buff=0.1)
    return VGroup(n, barre, d)


class DenombrementDefiBase(OutilsDenombrement):
    fichier_marques = "denombrement_defi_marques.json"
    nom_voix = "terminale-denombrement-defi"
    ceinture = "bleue"

    # ── une ligne de rédaction qui s'écrit au fil de la voix ───────────────

    def phr(self, texte, fs=32, color=WHITE, larg=None):
        t = Text(texte, font_size=fs, color=color, disable_ligatures=True)
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
        t._texte = texte
        t._pas_audit = True  # calée glyphe par glyphe par ecrire()
        return t

    def ecrire(self, ligne, depuis, rt=0.25):
        """Les mots s'écrivent ; chaque NOMBRE attend que la voix le dise (puis
        les mots qui le suivent). depuis = position dans la voix."""
        texte = ligne._texte
        glyphes = list(ligne.submobjects)
        nb_car = sum(1 for ch in texte if not ch.isspace())
        if len(glyphes) != nb_car:
            self.play(FadeIn(ligne), run_time=rt)
            return depuis
        import re
        segs, g = [], 0
        for m in re.finditer(r"\S+", texte):
            tok = m.group()
            segs.append((tok, VGroup(*glyphes[g:g + len(tok)])))
            g += len(tok)
        i = depuis
        paquet = []
        for tok, gl in segs:
            nb = tok.strip(" ,.:;?!«»()")
            if any(ch.isdigit() for ch in nb):
                if paquet:
                    self.play(*[FadeIn(x, shift=RIGHT * 0.06) for x in paquet], run_time=rt)
                    paquet = []
                j = self._texte_voix.find(nb, i)
                assert j >= 0, (nb, self._cle_voix)
                self.au_pos(j)
                i = j + len(nb)
            paquet.append(gl)
        if paquet:
            self.play(*[FadeIn(x, shift=RIGHT * 0.06) for x in paquet], run_time=rt)
        return i

    def gauche(self, mob, y, x=-5.35):
        return mob.move_to(P(0, y)).align_to(P(x, 0), LEFT)

    # ── 00 : la caisse de 20 rivets ─────────────────────────────────────────

    def ecran_accroche(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("00-accroche")
        av = avion(0.9).move_to(P(-3.3, 2.35))
        cs = caisse(s=1.0).move_to(P(-3.3, -0.75))
        rouges = [2, 8, 11, 17]
        self.au_mot("une caisse")
        self.play(FadeIn(cs[0]), FadeIn(cs[1]), run_time=0.4)
        self.au_mot("20 rivets")
        l1 = self.t("20 rivets", 40)
        l1b = self.t("pour avion", 40, GREY_A)
        self.ligne(l1, l1b, y=2.5, xl=1.0, buff=0.25)
        self.play(LaggedStart(*[FadeIn(r, shift=DOWN * 0.2) for r in cs[2]], lag_ratio=0.03),
                  FadeIn(l1, shift=RIGHT * 0.1), run_time=0.7)
        self.au_mot("pour avion")
        self.play(FadeIn(av, shift=RIGHT * 0.6), FadeIn(l1b, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("4 sont")
        l2 = self.ligne(self.t("4 défectueux", 40, DEFAUT), y=1.75, xl=1.0)
        neufs = VGroup(*[rivet(True).scale(1.05).move_to(cs[2][i]) for i in rouges])
        self.play(*[Transform(cs[2][i], n) for i, n in zip(rouges, neufs)], FadeIn(l2, shift=RIGHT * 0.1),
                  run_time=0.5)
        self.au_mot("Un contrôleur")
        main = VGroup(RoundedRectangle(width=1.6, height=0.9, corner_radius=0.25, fill_color="#8d5524",
                                       fill_opacity=1, stroke_width=0)).move_to(P(3.2, -0.9))
        plateau = Ellipse(width=2.2, height=0.5, fill_color="#334155", fill_opacity=1, stroke_width=0).move_to(P(3.2, -1.2))
        self.play(FadeIn(plateau, shift=UP * 0.1), run_time=0.3)
        self.au_nb("en prend", "3")
        l3 = self.ligne(self.t("on en prend 3 au hasard", 36), y=1.0, xl=1.0)
        pris = [cs[2][i] for i in (6, 11, 13)]
        cibles = [P(2.6 + 0.6 * k, -1.0) for k in range(3)]
        self.play(FadeIn(l3, shift=RIGHT * 0.1),
                  *[p.animate.move_to(c) for p, c in zip(pris, cibles)], run_time=0.8, rate_func=rate_functions.ease_in_out_sine)
        self.au_mot("A-t-il")
        q = VGroup(self.t("Bonnes chances de", 38, VERT_OK), self.t("repérer le problème ?", 38, VERT_OK))
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(q, -2.45, 1.0)
        self.play(FadeIn(q, scale=1.15), run_time=0.45)
        self.play(Indicate(pris[1], color=DEFAUT, scale_factor=1.6), run_time=0.6)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 01 : page de garde ─────────────────────────────────────────────────

    def ecran_titre(self):
        rv = VGroup(*[rivet(i in (1, 4)) for i in range(6)]).arrange(RIGHT, buff=0.35).move_to(P(-0.6, 0.0))
        self.page_garde("01-titre", "Dénombrement", "un exercice de bac", "Dénombrement", "exercice de bac", rv)

    # ── 02 : Karima, ingénieure qualité ────────────────────────────────────

    def ecran_metier(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("02-metier")
        kar = personne(peau="#a0662f", habit=BLEU_CALCUL, cheveux="#140c06", s=0.85, longs=True).move_to(P(-5.4, 2.3))
        casque = Arc(radius=0.33, start_angle=0, angle=PI, stroke_width=0, fill_color=JAUNE_TITRE,
                     fill_opacity=1).move_to(kar.get_top() + DOWN * 0.15)
        nom = self.t("Karima", 42, BLEU_CALCUL).move_to(P(0, 2.75)).align_to(P(-4.6, 0), LEFT)
        met = self.t("ingénieure qualité, aéronautique", 32).move_to(P(0, 2.1)).align_to(P(-4.6, 0), LEFT)
        self.au_mot("Karima")
        self.play(FadeIn(kar, shift=UP * 0.2), FadeIn(casque), FadeIn(nom, shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("ingénieure")
        av = avion(0.9).move_to(P(5.0, 2.4))
        self.play(FadeIn(met, shift=RIGHT * 0.15), FadeIn(av, shift=RIGHT * 0.5), run_time=0.45)
        self.au_mot("tester tous")
        cs = caisse(rouges=(3, 14), s=0.85).move_to(P(-3.6, -0.9))
        self.play(FadeIn(cs, shift=UP * 0.15), run_time=0.4)
        self.au_mot("un rivet testé")
        r = rivet(s=2.0).move_to(P(1.6, -0.6))
        enclume = Rectangle(width=1.6, height=0.35, fill_color="#475569", fill_opacity=1, stroke_width=0).move_to(P(1.6, -1.25))
        presse = Rectangle(width=1.2, height=0.5, fill_color="#64748B", fill_opacity=1, stroke_width=0).move_to(P(1.6, 1.0))
        tige = Line(P(1.6, 1.25), P(1.6, 1.7), stroke_width=8, color="#64748B")
        self.play(FadeIn(enclume), FadeIn(r, shift=DOWN * 0.2), FadeIn(presse), FadeIn(tige), run_time=0.4)
        self.au_mot("est détruit")
        lt = self.t("testé = détruit", 32, DEFAUT).move_to(P(4.6, -0.6))
        self.play(presse.animate.move_to(P(1.6, -0.6 + 0.35)), r.animate.stretch(0.3, 1).shift(DOWN * 0.3),
                  run_time=0.35, rate_func=rate_functions.rush_into)
        self.play(r.animate.set_color(DEFAUT), FadeIn(lt, scale=1.2), presse.animate.move_to(P(1.6, 1.0)), run_time=0.4)
        self.au_mot("elle prélève")
        l1 = self.t("Elle prélève,", 36, SANS_ORDRE).move_to(P(0, -2.6)).align_to(P(-2.9, 0), LEFT)
        pris = VGroup(*[cs[2][i].copy() for i in (2, 3, 9)])
        self.play(FadeIn(l1, shift=UP * 0.1), *[p.animate.move_to(P(-0.6 + 0.55 * k, -1.85)) for k, p in enumerate(pris)],
                  run_time=0.6)
        self.au_mot("elle compte")
        l2 = self.t("et elle compte.", 36, VERT_OK).next_to(l1, RIGHT, buff=0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 03 : l'énoncé ─────────────────────────────────────────────────────

    def ecran_enonce(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("03-enonce")
        self.au_mot("L'énoncé")
        tit = self.t("L'énoncé", 44, JAUNE_TITRE).move_to(P(0, 3.15)).align_to(P(-6.0, 0), LEFT)
        cadre = RoundedRectangle(width=12.4, height=5.85, corner_radius=0.2, stroke_color=GREY_B, stroke_width=2,
                                 fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-0.35, -0.1))
        self.play(Write(tit), FadeIn(cadre), run_time=0.5)
        self.bring_to_front(margo)
        cs = caisse(rouges=(2, 8, 11, 17), s=0.5).move_to(P(4.6, -2.3))
        x, fs = -6.1, 30
        l1 = self.gauche(self.phr("Un lot de 20 rivets contient 4 rivets défectueux.", fs), 2.3, x + 0.2)
        l2 = self.gauche(self.phr("On prélève simultanément 3 rivets.", fs), 1.7, x + 0.2)
        i = self.ecrire(l1, self.trouver("Un lot"))
        self.play(FadeIn(cs, shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("On prélève")
        self.ecrire(l2, self.trouver("On prélève"))
        qs = [("Un :", "Combien de prélèvements sont possibles ?"),
              ("Deux :", "Combien ne contiennent aucun rivet défectueux ?"),
              ("Trois :", "Combien contiennent exactement 1 rivet défectueux ?"),
              ("Quatre :", "Combien en contiennent au moins 1 ?"),
              ("Cinq :", "Quelle est la probabilité de repérer le problème ?")]
        y = 0.85
        for k, (mot, q) in enumerate(qs, start=1):
            j = self.trouver(mot)
            self.au_pos(j)
            n = self.pastille_num(k, ORANGE_RETENUE if k < 5 else VERT_OK, 0.22).move_to(P(x + 0.45, y))
            lq = self.gauche(self.phr(q, fs, larg=10.6), y, x + 0.85)
            self.play(FadeIn(n, scale=1.5), run_time=0.2)
            self.ecrire(lq, j)
            y -= 0.62
        self.attendre_voix(marge=0.6)

    # ── 04 : reconnaître : pas d'ordre, pas de répétition ──────────────────

    def ecran_reconnaitre(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("04-reconnaitre")
        self.au_mot("D'abord")
        tit = self.t("D'abord, reconnaître", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.5)
        sac = Circle(radius=1.45, stroke_color=SANS_ORDRE, stroke_width=5).move_to(P(-3.6, 0.2))
        trois = VGroup(rivet(True, 1.6), rivet(False, 1.6), rivet(False, 1.6))
        pos = [P(-4.2, 0.55), P(-3.0, 0.55), P(-3.6, -0.35)]
        for r, p in zip(trois, pos):
            r.move_to(p + UP * 2.2)
        self.au_mot("Simultanément")
        self.play(Create(sac), *[r.animate.move_to(p) for r, p in zip(trois, pos)], run_time=0.7,
                  rate_func=rate_functions.ease_out_bounce)
        l1 = self.t("Simultanément :", 36)
        l1b = self.t("pas d'ordre", 36, SANS_ORDRE)
        self.ligne(l1, l1b, y=1.9, xl=0.6, buff=0.2)
        self.play(FadeIn(l1, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("pas d'ordre")
        self.play(FadeIn(l1b, shift=RIGHT * 0.1), run_time=0.3)
        # on mélange : c'est le même prélèvement
        self.play(trois[0].animate.move_to(pos[1]), trois[1].animate.move_to(pos[2]), trois[2].animate.move_to(pos[0]),
                  run_time=0.6)
        self.au_mot("3 rivets différents")
        l2 = self.ligne(self.t("3 rivets différents :", 36), y=1.05, xl=0.6)
        l2b = self.ligne(self.t("pas de répétition", 36, SANS_ORDRE), y=0.5, xl=1.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.1), *[Indicate(r, scale_factor=1.25) for r in trois], run_time=0.5)
        self.au_mot("pas de répétition")
        self.play(FadeIn(l2b, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("Un prélèvement")
        l3 = self.ligne(self.t("un prélèvement :", 34), y=-0.35, xl=0.6)
        l3b = self.ligne(self.t("une partie à 3 éléments", 34), y=-0.9, xl=1.0)
        self.play(FadeIn(l3, shift=RIGHT * 0.1), sac.animate.set_fill(SANS_ORDRE, opacity=0.15), run_time=0.3)
        self.au_nb("partie à", "3")
        self.play(FadeIn(l3b, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("une combinaison")
        l4 = self.ligne(self.t("une combinaison", 44, SANS_ORDRE, larg=3.6), y=-1.75, xl=1.4)
        cad = SurroundingRectangle(l4, color=SANS_ORDRE, buff=0.18, stroke_width=3)
        lab = self.t("combinaison", 30, SANS_ORDRE, audit=False).next_to(sac, DOWN, buff=0.2)
        self.play(FadeIn(l4, scale=1.3), Create(cad), FadeIn(lab), run_time=0.45)
        self.insister(VGroup(l4, cad), 1.08)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 05 : question-pause n° 1 : combien de prélèvements ? ───────────────

    def ecran_question1(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("05-question")
        t0 = self.renderer.time
        ca = puissance("20", "3", 32)
        cc = binom(20, 3, 30)
        cc._bloc = True
        tete, q, cartes, pause, rebours = self.q_tete(["Le nombre de prélèvements", "possibles est :"],
                                                      [ca, "20 × 19 × 18", cc], xl=1.6, largeur=4.2)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        cs = caisse(rouges=(2, 8, 11, 17), s=0.95).move_to(P(-3.6, 0.6))
        self.au_mot("Le nombre")
        self.play(FadeIn(q, shift=UP * 0.1), FadeIn(cs), run_time=0.45)
        pris = [cs[2][i] for i in (6, 11, 13)]
        self.play(*[p.animate.move_to(P(-4.2 + 0.6 * k, -1.5)) for k, p in enumerate(pris)], run_time=0.6)
        self.q_montrer_choix(cartes)
        self.bring_to_front(margo)
        self.q_pause(pause, rebours, "05-question", t0, 2)
        self.dire("05b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        self.au_mot("Pas d'ordre")
        e1 = self.t("Pas d'ordre, pas de répétition :", 32, SANS_ORDRE).move_to(P(0, -2.1)).align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(e1, shift=RIGHT * 0.1), FadeOut(cs[0]), FadeOut(cs[1]),
                  *[FadeOut(r) for r in cs[2] if r not in pris], run_time=0.4)
        self.au_nb("3 parmi", "20")
        b = binom(20, 3, 38)
        fr = fraction(self.morceaux("20 × 19 × 18", 34), "6", WHITE, 34)
        eg1, eg2 = self.t("=", 38), self.t("=", 38, VERT_OK)
        res = self.t("1 140", 42, VERT_OK)
        res._pas_audit = True
        ligne = VGroup(b, eg1, fr, eg2, res).arrange(RIGHT, buff=0.22).move_to(P(0, 0.9)).align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(b, scale=1.3), FadeOut(VGroup(*pris)), run_time=0.35)
        nums = fr[0]
        i = self.trouver("20 fois")
        self.au_pos(i)
        self.play(FadeIn(eg1), FadeIn(nums[0], shift=UP * 0.1), run_time=0.15)
        i = self.reveler([nums[2]], i + 2)
        self.play(FadeIn(nums[1]), run_time=0.05)
        self.reveler([nums[4]], i)
        self.play(FadeIn(nums[3]), run_time=0.05)
        self.au_nb("sur", "6")
        self.play(FadeIn(fr[1]), FadeIn(fr[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 140")
        cad = SurroundingRectangle(VGroup(eg2, res), color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(eg2), FadeIn(res, scale=1.4), Create(cad), run_time=0.4)
        self.insister(VGroup(res, cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── la copie (rédaction en lignes) ─────────────────────────────────────

    def feuille(self, haut=2.75, bas=-3.2):
        f = RoundedRectangle(width=11.2, height=haut - bas, corner_radius=0.18, stroke_color=GREY_D, stroke_width=2,
                             fill_color=FOND_CARTE, fill_opacity=1)
        return f.move_to(P(-0.75, (haut + bas) / 2))

    def suite(self, morceaux_mobs, y, x=-5.3, buff=0.22):
        return VGroup(*morceaux_mobs).arrange(RIGHT, buff=buff).move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def montrer_resultat(self, ligne_mobs, cles, n=None):
        """ligne_mobs : liste de (mobject, extrait-de-voix | (contexte, nombre))."""
        for mob, cle in zip(ligne_mobs, cles):
            if isinstance(cle, tuple):
                self.au_nb(*cle)
            elif cle is not None:
                self.au_mot(cle)
            self.play(FadeIn(mob, scale=1.2), run_time=0.25)

    # ── 06 : rédigeons, lignes 1 et 2 ──────────────────────────────────────

    def ecran_rediger1(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("06-rediger")
        self.au_mot("Rédigeons")
        tit = self.t("Rédigeons, comme au bac", 44, JAUNE_TITRE).move_to(P(0, 3.2)).align_to(P(-6.2, 0), LEFT)
        f = self.feuille()
        self.play(Write(tit), FadeIn(f), run_time=0.5)
        self.bring_to_front(margo)
        cs = caisse(rouges=(2, 8, 11, 17), s=0.55).move_to(P(3.6, 0.8))
        n1 = self.pastille_num(1).move_to(P(-5.8, 2.2))
        a1 = self.gauche(self.phr("Un prélèvement est une combinaison", 32), 2.2)
        b1 = self.gauche(self.phr("de 3 rivets parmi 20.", 32), 1.62)
        j = self.trouver("un prélèvement")
        self.au_pos(j)
        self.play(FadeIn(n1, scale=1.5), FadeIn(cs), run_time=0.25)
        i = self.ecrire(a1, j)
        self.ecrire(b1, i)
        c1 = self.t("Il y en a", 32)
        bn = binom(20, 3, 34)
        eg = self.t("=", 34, VERT_OK)
        r1 = self.t("1 140.", 36, VERT_OK)
        r1._pas_audit = True
        self.suite([c1, bn, eg, r1], 0.75)
        self.montrer_resultat([c1, bn, VGroup(eg, r1)], ["Il y en a", ("Il y en a 3 parmi", "20"), "1 140"])
        self.play(Indicate(r1, color=VERT_OK), run_time=0.4)
        n2 = self.pastille_num(2).move_to(P(-5.8, -0.25))
        a2 = self.gauche(self.phr("Sans rivet défectueux : on choisit les 3 rivets", 32), -0.25)
        b2 = self.gauche(self.phr("parmi les 16 bons.", 32), -0.83)
        j = self.trouver("Deux :")
        self.au_pos(j)
        self.play(FadeIn(n2, scale=1.5), run_time=0.2)
        i = self.ecrire(a2, j)
        self.ecrire(b2, i)
        bons = VGroup(*[r for k, r in enumerate(cs[2]) if k not in (2, 8, 11, 17)])
        self.play(Indicate(bons, color=VERT_OK, scale_factor=1.1), run_time=0.4)
        bn2 = binom(16, 3, 34)
        eg2 = self.t("=", 34, VERT_OK)
        r2 = self.t("560.", 36, VERT_OK)
        self.suite([bn2, eg2, r2], -1.8)
        self.montrer_resultat([bn2, VGroup(eg2, r2)], [("bons. 3 parmi", "16"), "560"])
        self.insister(r2, 1.2)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 : exactement 1 défectueux ─────────────────

    def bacs(self):
        rouge = RoundedRectangle(width=1.5, height=1.5, corner_radius=0.15, stroke_color=DEFAUT, stroke_width=4)
        rouge.move_to(P(-5.0, 0.75))
        rr = VGroup(*[rivet(True).move_to(rouge.get_center() + P(0.35 * (k % 2 * 2 - 1), 0.35 * (1 - k // 2 * 2)))
                      for k in range(4)])
        gris = RoundedRectangle(width=2.6, height=2.6, corner_radius=0.15, stroke_color=BON, stroke_width=4)
        gris.move_to(P(-2.2, 0.75))
        gg = VGroup(*[rivet().move_to(gris.get_center() + P(0.6 * (k % 4) - 0.9, 0.9 - 0.6 * (k // 4)))
                      for k in range(16)])
        l1 = self.t("4 défectueux", 28, DEFAUT, audit=False).next_to(gris, DOWN, buff=0.2).set_x(-5.0)
        l2 = self.t("16 bons", 28, BON, audit=False).next_to(gris, DOWN, buff=0.2).set_x(-2.2)
        return VGroup(rouge, rr, gris, gg, l1, l2)

    def ecran_question2(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("07-question")
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Exactement 1 rivet défectueux.", "Combien de prélèvements ?"],
            ["4 + 120, soit 124", "4 × 120, soit 480", "4 × 560, soit 2 240"], xl=1.2, largeur=4.7)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        b = self.bacs()
        self.au_nb("Exactement", "1")
        self.play(FadeIn(q[0], shift=UP * 0.1), FadeIn(b), run_time=0.45)
        self.au_mot("Combien")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.q_montrer_choix(cartes)
        self.bring_to_front(margo)
        self.q_pause(pause, rebours, "07-question", t0, 1)
        self.dire("07b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        rouge, rr, gris, gg = b[0], b[1], b[2], b[3]
        self.au_nb("1 défectueux parmi", "4")
        o1 = Circle(radius=0.3, color=VERT_OK, stroke_width=4).move_to(rr[1])
        b1 = binom(4, 1, 38).move_to(P(-5.0, -1.8))
        self.play(Create(o1), FadeIn(b1, scale=1.3), run_time=0.4)
        self.au_mot("ET")
        et = self.t("ET", 34, JAUNE_TITRE).move_to(P(-3.6, -1.8))
        self.play(FadeIn(et, scale=1.4), run_time=0.25)
        self.au_nb("2 bons parmi", "16")
        o2 = VGroup(*[Circle(radius=0.3, color=VERT_OK, stroke_width=4).move_to(gg[k]) for k in (5, 10)])
        b2 = binom(16, 2, 38).move_to(P(-2.2, -1.8))
        self.play(Create(o2), FadeIn(b2, scale=1.3), run_time=0.4)
        self.au_mot("on multiplie")
        fois = self.t("×", 44, JAUNE_TITRE).move_to(et)
        mult = self.t("« Et » : on multiplie", 30, JAUNE_TITRE).move_to(P(-3.6, -2.6))
        self.play(Transform(et, fois), FadeIn(mult, shift=UP * 0.1), run_time=0.4)
        calc = self.morceaux("= 4 × 120 = 480", 36)
        calc[-1].set_color(VERT_OK)
        calc.move_to(P(-3.6, -3.2))
        i = self.trouver("4 fois")
        self.au_pos(i)
        self.play(FadeIn(calc[0]), FadeIn(calc[1]), run_time=0.15)
        i = self.reveler([calc[3]], i + 1)
        self.play(FadeIn(calc[2]), run_time=0.05)
        self.play(FadeIn(calc[4]), run_time=0.05)
        self.reveler([calc[5]], i)
        self.insister(calc[5], 1.3)
        self.attendre_voix(marge=0.6)

    # ── 08 : rédigeons, lignes 3 et 4 ──────────────────────────────────────

    def ecran_rediger2(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("08-rediger")
        tit = self.t("Rédigeons, comme au bac", 44, JAUNE_TITRE).move_to(P(0, 3.2)).align_to(P(-6.2, 0), LEFT)
        f = self.feuille()
        rappel = VGroup(self.pastille_num(1, GREY_B, 0.2), binom(20, 3, 26, GREY_A), self.t("= 1 140", 28, GREY_A, audit=False),
                        self.pastille_num(2, GREY_B, 0.2), binom(16, 3, 26, GREY_A), self.t("= 560", 28, GREY_A, audit=False))
        rappel.arrange(RIGHT, buff=0.18)
        rappel[3].shift(RIGHT * 0.5)
        rappel[4:].shift(RIGHT * 0.5)
        rappel.move_to(P(0, 2.2)).align_to(P(-5.95, 0), LEFT)
        for m in rappel.get_family():
            m._pas_audit = True
        self.add(tit, f, rappel)
        self.bring_to_front(margo)
        n3 = self.pastille_num(3).move_to(P(-5.8, 1.0))
        a = binom(4, 1, 34)
        x = self.t("×", 34)
        b = binom(16, 2, 34)
        c = self.morceaux("= 4 × 120 = 480.", 34)
        c[-1].set_color(VERT_OK)
        self.suite([a, x, b, c], 1.0)
        self.au_mot("Trois")
        self.play(FadeIn(n3, scale=1.5), run_time=0.2)
        self.au_nb("1 parmi", "4")
        self.play(FadeIn(a, scale=1.2), run_time=0.25)
        self.au_nb("2 parmi", "16")
        self.play(FadeIn(x), FadeIn(b, scale=1.2), run_time=0.25)
        i = self.trouver("égale 4")
        self.au_pos(i)
        self.play(FadeIn(c[0]), run_time=0.1)
        i = self.reveler([c[1]], i)
        self.play(FadeIn(c[2]), run_time=0.05)
        i = self.reveler([c[3]], i)
        self.play(FadeIn(c[4]), run_time=0.05)
        self.reveler([c[5]], i)
        n4 = self.pastille_num(4).move_to(P(-5.8, -0.3))
        l4 = self.gauche(self.phr("« au moins 1 défectueux » est le contraire de « aucun ».", 32, larg=10.0), -0.3)
        j = self.trouver("Quatre")
        self.au_pos(j)
        self.play(FadeIn(n4, scale=1.5), run_time=0.2)
        self.ecrire(l4, j)
        calc = self.morceaux("1 140 − 560 = 580", 40)
        calc[-1].set_color(VERT_OK)
        calc.move_to(P(0, -1.45)).align_to(P(-5.3, 0), LEFT)
        i = self.trouver("1 140 moins")
        i = self.reveler([calc[0], calc[1]], i)
        self.play(FadeIn(calc[2]), run_time=0.05)
        i = self.reveler([calc[3]], i)
        self.play(FadeIn(calc[4]), run_time=0.05)
        self.reveler([calc[5]], i)
        cad = SurroundingRectangle(calc, color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(calc, cad), 1.08)
        self.attendre_voix(marge=0.6)

    def derouler(self, morc, depuis, rt=0.15):
        """Un VGroup de Text (un par mot) : chaque nombre à son mot ; les signes
        et les mots qui le précèdent apparaissent avec lui."""
        i, attente = depuis, []
        for m in morc:
            nb = m.original_text.strip(" ,.:;?!«»()")
            if any(ch.isdigit() for ch in nb):
                j = self._texte_voix.find(nb, i)
                assert j >= 0, (nb, self._cle_voix)
                self.au_pos(j)
                self.play(*[FadeIn(x) for x in attente], FadeIn(m, shift=UP * 0.08), run_time=rt)
                attente = []
                i = j + len(nb)
            else:
                attente.append(m)
        if attente:
            self.play(*[FadeIn(x) for x in attente], run_time=rt)
        return i

    # ── 09 : vérifions : 480 + 96 + 4 = 580 ────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("09-verifier")
        self.au_mot("Vérifions")
        tit = self.t("Vérifions", 44, JAUNE_TITRE).move_to(P(0, 3.2)).align_to(P(-6.2, 0), LEFT)
        self.play(Write(tit), run_time=0.4)
        # la barre des 1 140 prélèvements, selon le nombre de défectueux
        x0, L, yb = -5.9, 10.6, -2.05
        k = L / 1140
        segs, x = [], x0
        for n, coul in [(560, GREY_D), (480, ORANGE_RETENUE), (96, "#C2410C"), (4, DEFAUT)]:
            r = Rectangle(width=max(n * k, 0.04), height=0.6, fill_color=coul, fill_opacity=1, stroke_color=BLACK,
                          stroke_width=1).move_to(P(x + n * k / 2, yb))
            segs.append(r)
            x += n * k
        lab0 = self.t("aucun : 560", 26, GREY_A, audit=False).next_to(segs[0], DOWN, buff=0.12)
        lab1 = self.t("exactement 1 : 480", 26, ORANGE_RETENUE, audit=False).next_to(segs[1], UP, buff=0.12)
        self.add(segs[0], segs[1], lab0, lab1)
        self.bring_to_front(margo)
        l1 = self.gauche(self.phr("Exactement 2 défectueux :", 32), 2.15)
        j = self.trouver("Exactement 2")
        self.ecrire(l1, j)
        b42 = binom(4, 2, 34).next_to(l1, RIGHT, buff=0.25)
        self.au_nb("2 parmi", "4")
        self.play(FadeIn(b42, scale=1.3), run_time=0.25)
        m1 = self.morceaux("× 16 = 6 × 16 = 96", 34).next_to(b42, RIGHT, buff=0.2)
        m1[-1].set_color(VERT_OK)
        self.derouler(m1, self.trouver("fois 16"))
        lab2 = self.t("2 : 96", 26, "#FB923C").next_to(segs[2], UP, buff=0.12)
        if lab2.get_right()[0] > 6.3:
            lab2.shift(LEFT * (lab2.get_right()[0] - 6.3))
        self.play(FadeIn(segs[2], scale=1.3), FadeIn(lab2), run_time=0.3)
        l2 = self.gauche(self.phr("Exactement 3 :", 32), 0.95)
        self.ecrire(l2, self.trouver("Exactement 3"))
        b43 = binom(4, 3, 34).next_to(l2, RIGHT, buff=0.25)
        self.au_nb("3 parmi", "4")
        self.play(FadeIn(b43, scale=1.3), run_time=0.25)
        m2 = self.morceaux("= 4", 34).next_to(b43, RIGHT, buff=0.2)
        m2[-1].set_color(VERT_OK)
        self.derouler(m2, self.trouver("soit 4"))
        lab3 = self.t("3 : 4", 26, DEFAUT).next_to(lab2, UP, buff=0.12).align_to(lab2, RIGHT)
        self.play(FadeIn(segs[3], scale=3), FadeIn(lab3), run_time=0.3)
        m3 = self.morceaux("480 + 96 + 4 = 580", 40)
        m3[-1].set_color(VERT_OK)
        m3.move_to(P(0, -0.2)).align_to(P(-5.3, 0), LEFT)
        self.derouler(m3, self.trouver("480 plus"))
        acc = BraceBetweenPoints(P(segs[1].get_left()[0], yb - 0.32), P(segs[3].get_right()[0], yb - 0.32),
                                 direction=DOWN, color=VERT_OK)
        self.play(GrowFromCenter(acc), run_time=0.3)
        self.au_mot("Ça colle")
        ok = self.coche(VERT_OK, 0.3).next_to(m3, RIGHT, buff=0.35)
        colle = self.t("Ça colle !", 36, VERT_OK).next_to(ok, RIGHT, buff=0.25)
        self.play(Create(ok), FadeIn(colle, shift=RIGHT * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 10 : le piège : 4 × 171 = 684 ──────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("10-piege")
        self.au_mot("Voilà le piège")
        tit = self.t("Voilà le piège !", 46, ROUGE_ERREUR).to_edge(UP, buff=0.45)
        self.play(FadeIn(tit, scale=1.3), run_time=0.4)
        l1 = self.gauche(self.phr("Pour « au moins 1 » :", 34), 2.25, -6.0)
        self.ecrire(l1, self.trouver("Pour"))
        b1 = binom(4, 1, 36, DEFAUT)
        puis = self.t("puis", 32)
        b2 = binom(19, 2, 36, DEFAUT)
        calc = self.morceaux("= 4 × 171 = 684", 36, DEFAUT)
        VGroup(b1, puis, b2, calc).arrange(RIGHT, buff=0.22).move_to(P(0, 1.2)).align_to(P(-6.0, 0), LEFT)
        self.au_nb("1 défectueux parmi", "4")
        self.play(FadeIn(b1, scale=1.3), run_time=0.25)
        self.au_nb("parmi les", "19")
        self.play(FadeIn(puis), FadeIn(b2, scale=1.3), run_time=0.25)
        self.derouler(calc, self.trouver("4 fois"))
        self.au_mot("Trop")
        trop = self.t("Trop ! (684 > 580)", 36, ROUGE_ERREUR, audit=False).next_to(calc, RIGHT, buff=0.35)
        if trop.get_right()[0] > 6.4:
            trop.scale_to_fit_width(6.4 - trop.get_left()[0])
        self.play(FadeIn(trop, scale=1.3), run_time=0.35)
        # le même prélèvement, compté deux fois
        self.au_mot("Un prélèvement avec 2")

        def ech(choisi, autres, y):
            d = rivet(True, 1.3)
            t1 = self.t(choisi, 26, DEFAUT, audit=False).next_to(d, DOWN, buff=0.32)
            prem = VGroup(d, t1, Circle(radius=0.42, color=JAUNE_TITRE, stroke_width=4).move_to(d))
            reste = VGroup()
            for nom, defe in autres:
                r = rivet(defe, 1.3)
                reste.add(VGroup(r, self.t(nom, 26, DEFAUT if defe else BON, audit=False).next_to(r, DOWN, buff=0.06)))
            reste.arrange(RIGHT, buff=0.35)
            acc = VGroup(self.t("puis", 28, audit=False), self.t("{", 60, audit=False), reste, self.t("}", 60, audit=False)).arrange(RIGHT, buff=0.15)
            return VGroup(prem, acc).arrange(RIGHT, buff=0.35).move_to(P(0, y)).align_to(P(-6.0, 0), LEFT)

        e1 = ech("D1", [("D2", True), ("B", False)], -0.35)
        e2 = ech("D2", [("D1", True), ("B", False)], -1.75)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), run_time=0.45)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("compté deux fois")
        acc = Brace(VGroup(e1, e2), RIGHT, color=ROUGE_ERREUR)
        dbl = VGroup(self.t("le même prélèvement", 32, ROUGE_ERREUR), self.t("compté deux fois !", 32, ROUGE_ERREUR))
        dbl.arrange(DOWN, aligned_edge=LEFT, buff=0.1).next_to(acc, RIGHT, buff=0.25)
        self.play(GrowFromCenter(acc), FadeIn(dbl, shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("Le contraire")
        sur = self.t("Le contraire est plus sûr.", 36, VERT_OK).move_to(P(-1.0, -3.05))
        self.play(FadeIn(sur, scale=1.2), run_time=0.4)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 11 : la probabilité ; Karima conclut ───────────────────────────────

    def ecran_probabilite(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("11-probabilite")
        tit = self.t("Rédigeons, comme au bac", 44, JAUNE_TITRE).move_to(P(0, 3.2)).align_to(P(-6.2, 0), LEFT)
        self.add(tit)
        n5 = self.pastille_num(5, VERT_OK).move_to(P(-5.8, 2.3))
        l1 = self.gauche(self.phr("Les prélèvements sont équiprobables.", 32), 2.3)
        j = self.trouver("les prélèvements")
        self.au_pos(j)
        self.play(FadeIn(n5, scale=1.5), run_time=0.2)
        self.ecrire(l1, j)
        self.au_mot("La probabilité")
        p = self.t("P(repérer le problème) =", 34)
        fr = fraction("580", "1 140", WHITE, 36)
        fr[2]._pas_audit = True
        approx = self.t("≈ 0,51", 40, VERT_OK)
        VGroup(p, fr, approx).arrange(RIGHT, buff=0.25).move_to(P(0, 1.0)).align_to(P(-5.3, 0), LEFT)
        self.play(FadeIn(p, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("580")
        self.play(FadeIn(fr[0], scale=1.3), FadeIn(fr[1]), run_time=0.25)
        self.au_mot("1 140")
        self.play(FadeIn(fr[2], scale=1.3), run_time=0.25)
        self.au_mot("0,51")
        cad = SurroundingRectangle(approx, color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(approx, scale=1.3), Create(cad), run_time=0.35)
        # la jauge
        x0, L, yj = -5.3, 6.0, -0.65
        fond = RoundedRectangle(width=L, height=0.5, corner_radius=0.12, stroke_color=GREY_B, stroke_width=2).move_to(
            P(x0 + L / 2, yj))
        rempli = Rectangle(width=0.01, height=0.46, fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0)
        rempli.move_to(P(x0, yj)).align_to(P(x0, 0), LEFT)
        self.play(FadeIn(fond), run_time=0.2)
        self.au_mot("Une chance sur deux")
        self.add(rempli)
        self.play(rempli.animate.stretch_to_fit_width(L * 0.51).align_to(P(x0, 0), LEFT), run_time=0.8)
        moitie = self.t("une chance sur deux seulement !", 32, ORANGE_RETENUE).move_to(P(x0 + L / 2, yj - 0.65))
        self.play(FadeIn(moitie, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Karima")
        kar = personne(peau="#a0662f", habit=BLEU_CALCUL, cheveux="#140c06", s=0.7, longs=True).move_to(P(2.5, -1.95))
        nom = self.t("Karima", 30, BLEU_CALCUL).next_to(kar, DOWN, buff=0.1)
        self.play(FadeIn(kar, shift=UP * 0.2), FadeIn(nom), run_time=0.4)
        self.au_nb("prélever", "3")
        bulle = RoundedRectangle(width=3.3, height=1.15, corner_radius=0.25, fill_color=FOND_CARTE, fill_opacity=1,
                                 stroke_color=BLEU_CALCUL, stroke_width=3).move_to(P(4.6, -0.55))
        pointe = Polygon(P(3.4, -1.1), P(3.75, -1.1), P(3.1, -1.5), fill_color=FOND_CARTE, fill_opacity=1,
                         stroke_color=BLEU_CALCUL, stroke_width=3)
        tb = VGroup(self.t("3 rivets,", 30), self.t("c'est trop peu !", 30, DEFAUT)).arrange(DOWN, buff=0.08)
        tb.move_to(bulle)
        self.play(FadeIn(pointe), FadeIn(bulle), FadeIn(tb[0]), run_time=0.35)
        self.au_mot("trop peu")
        self.play(FadeIn(tb[1], scale=1.2), run_time=0.3)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 12 : le défi ; 12b : la correction ─────────────────────────────────

    def lot_pieces(self, s=1.0):
        g = VGroup(*[piece(k in (1, 4, 8), s) for k in range(10)])
        return g.arrange_in_grid(2, 5, buff=0.25 * s)

    def ecran_defi(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("12-defi")
        t0 = self.renderer.time
        tete = VGroup(pastille_pause(0.42), self.t("À toi de jouer !", 42, ORANGE_RETENUE)).arrange(RIGHT, buff=0.25)
        tete.move_to(P(0, 3.1)).align_to(P(-6.0, 0), LEFT)
        self.au_mot("À toi de jouer")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        lot = self.lot_pieces(1.6).move_to(P(-3.9, 0.9))
        xl = 0.3
        l1 = self.col(self.phr("Un lot de 10 pièces", 34), 2.0, xl)
        j = self.trouver("Un lot")
        self.au_pos(j)
        self.play(FadeIn(lot[0]), run_time=0.15)
        i = self.ecrire(l1, j)
        self.play(LaggedStart(*[FadeIn(p, scale=1.4) for p in lot[1:]], lag_ratio=0.05), run_time=0.4)
        l2 = self.col(self.phr("dont 3 défectueuses.", 34, DEFAUT), 1.4, xl)
        self.ecrire(l2, i)
        l3 = self.col(self.phr("On en prélève 2 simultanément.", 34), 0.8, xl)
        self.ecrire(l3, self.trouver("On en prélève"))
        self.au_mot("Combien")
        l4 = self.ligne(self.t("Combien de prélèvements contiennent", 32, JAUNE_TITRE), y=0.0, xl=xl)
        l5 = self.ligne(self.t("au moins une pièce défectueuse ?", 32, JAUNE_TITRE), y=-0.5, xl=xl)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("au moins une")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Et quelle")
        l6 = self.ligne(self.t("Et la probabilité ?", 32, JAUNE_TITRE), y=-1.15, xl=xl)
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.3)
        rebours = CompteARebours(5, r=0.3, fs=28).move_to(P(xl + 0.3, -2.1))
        pause = self.t("Mets pause, et cherche !", 30, ORANGE_RETENUE, larg=4.0).next_to(rebours, RIGHT, buff=0.3)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION 12-defi t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f})", flush=True)
        self.wait(0.4)

    def ecran_correction(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("12b-correction")
        tit = self.t("Correction", 44, JAUNE_TITRE).move_to(P(0, 3.15)).align_to(P(-6.0, 0), LEFT)
        lot = self.lot_pieces(1.0).move_to(P(3.8, 3.0))
        self.play(FadeIn(tit, shift=DOWN * 0.1), FadeIn(lot), run_time=0.4)
        rows = [("Tous les prélèvements :", 10, 2, "45", "Tous", ("2 parmi", "10"), ("égale", "45")),
                ("Aucune pièce défectueuse :", 7, 2, "21", "Aucune", ("2 parmi", "7"), ("égale", "21"))]
        y = 2.0
        for k, (txt, n, kk, res, mot, cle_b, cle_r) in enumerate(rows):
            l = self.t(txt, 34)
            b = binom(n, kk, 36)
            r = self.t(f"= {res}", 38, VERT_OK)
            VGroup(l, b, r).arrange(RIGHT, buff=0.25).move_to(P(0, y)).align_to(P(-5.6, 0), LEFT)
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.1), run_time=0.3)
            self.au_nb(cle_b[0], cle_b[1], n=1 if k == 0 else 2)
            self.play(FadeIn(b, scale=1.3), run_time=0.25)
            self.au_nb(cle_r[0], cle_r[1], n=1 if k == 0 else 2)
            self.play(FadeIn(r, scale=1.3), run_time=0.25)
            if k == 1:
                bons = VGroup(*[p for j, p in enumerate(lot) if j not in (1, 4, 8)])
                self.play(Indicate(bons, color=VERT_OK, scale_factor=1.15), run_time=0.4)
            y -= 1.15
        self.au_mot("Au moins une")
        l3 = self.t("Au moins une :", 34)
        m3 = self.morceaux("45 − 21 = 24", 38)
        m3[-1].set_color(VERT_OK)
        VGroup(l3, m3).arrange(RIGHT, buff=0.3).move_to(P(0, y)).align_to(P(-5.6, 0), LEFT)
        self.play(FadeIn(l3, shift=RIGHT * 0.1), run_time=0.3)
        self.derouler(m3, self.trouver("Au moins une"))
        y -= 1.25
        self.au_mot("La probabilité")
        l4 = self.t("P =", 36)
        fr = fraction("24", "45", WHITE, 36)
        ap = self.t("≈ 0,53", 40, VERT_OK)
        VGroup(l4, fr, ap).arrange(RIGHT, buff=0.25).move_to(P(0, y)).align_to(P(-5.6, 0), LEFT)
        self.play(FadeIn(l4, shift=RIGHT * 0.1), run_time=0.25)
        self.au_nb("probabilité :", "24")
        self.play(FadeIn(fr[0], scale=1.3), FadeIn(fr[1]), run_time=0.25)
        self.au_nb("24 sur", "45")
        self.play(FadeIn(fr[2], scale=1.3), run_time=0.25)
        self.au_mot("0,53")
        cad = SurroundingRectangle(ap, color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(ap, scale=1.3), Create(cad), run_time=0.35)
        self.insister(VGroup(ap, cad), 1.12)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 13 : ce que tu as appris ───────────────────────────────────────────

    def ecran_bilan(self):
        fs = 40
        b1 = VGroup(self.t("Reconnais d'abord :", fs), self.t("ordre ? répétition ?", fs, SANS_ORDRE)).arrange(RIGHT, buff=0.2)
        b2 = VGroup(self.t("Prélèvement simultané =", fs), self.t("combinaison", fs, SANS_ORDRE)).arrange(RIGHT, buff=0.2)
        b3 = VGroup(self.t("« Et » multiplie,", fs, JAUNE_TITRE), self.t("« ou » additionne.", fs, JAUNE_TITRE)).arrange(RIGHT, buff=0.25)
        b4 = VGroup(self.t("« Au moins un » :", fs, VERT_OK), self.t("passe par le contraire.", fs, VERT_OK)).arrange(RIGHT, buff=0.2)
        self.ecran_appris_lignes("13-appris", [b1, b2, b3, b4],
                                 [["Reconnais", "ordre"], ["Un prélèvement", "combinaison"], ["Et »", "ou »"],
                                  ["Pour", "passe par"]])

    def construct(self):
        self.ecran_accroche()
        self.ecran_titre()
        self.ecran_metier()
        self.ecran_enonce()
        self.ecran_reconnaitre()
        self.ecran_question1()
        self.ecran_rediger1()
        self.ecran_question2()
        self.ecran_rediger2()
        self.ecran_verifier()
        self.ecran_piege()
        self.ecran_probabilite()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_bilan()
        self.page_abonnement("14-abonne")


class DenombrementDefiTerminale(DenombrementDefiBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "bleue"
