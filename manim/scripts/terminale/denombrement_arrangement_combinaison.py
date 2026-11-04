# denombrement_arrangement_combinaison.py
# EleveAI — Maths Tle spé — paysage « Quand l'ordre compte… ou pas » (16:9),
# ceinture VERTE. Micro du coach : denombrement_arrangement_combinaison
# (lib/tutor-v4/questionBank/terminale-spe/maths/denombrement.bank.ts :
# k-uplets d'éléments distincts n!/(n − k)!, permutations n!, combinaisons
# k parmi n). Short jumeau : denombrement_arrangement_combinaison_short.py.
#
# Clé de voix → écran :
#   · 00-accroche      : le tournoi de jeu vidéo, 8 équipes, un podium ;
#   · 01-titre         : page de garde, l'échelle ENTIÈRE (verte) ;
#   · 02-metier        : Léa, organisatrice de tournois d'e-sport ;
#   · 03-podium        : le podium se compose, l'arbre pousse (8, 56, 336) ;
#   · 04-formule       : 3-uplet, n × (n − 1) × …, n!/(n − k)!, 8!/5! = 336 ;
#   · 05-permutations  : l'ordre de passage sur scène, 8! = 40 320 ;
#   · 06/06b           : question-pause n° 1 (5 joueurs : B, 120) ;
#   · 07-groupe        : la finale sans classement, les 6 podiums d'un groupe,
#                        336 ÷ 6 = 56 ;
#   · 08-combinaison   : 3 parmi 8 = 8!/(3! × 5!) = 56 ;
#   · 09-piege         : 336 au lieu de 56, le test de l'échange ;
#   · 10/10b           : question-pause n° 2 (match d'ouverture : B, 28, les
#                        28 cordes entre 8 points) ;
#   · 11/11b           : question-pause n° 3 (capitaine + vice : B, 20) ;
#   · 12-appris        : « Ce que tu as appris », titre en haut et centré ;
#   · 13-abonne        : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
#
# Code couleur (paysage ET short) : bleu = l'ordre compte / k-uplet, orange =
# sans ordre / combinaison, vert = résultat juste, rouge = piège.
# Modèles : convexite_tangente.py, loi_normale_escalier.py (rien n'en est
# importé hors modules communs).
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos (marques mot à
#   mot : denombrement_arrangement_combinaison_marques.json).
#   Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run …
#
# Voix : manim/voix/terminale-denombrement-arrangement-combinaison.json (−6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/denombrement_arrangement_combinaison.py DenombrementArrangementCombinaisonTerminale -o eleveai-maths-terminale-denombrement-arrangement-combinaison --media_dir manim/scripts/terminale/media-denombrement-arrangement-combinaison
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-arrangement-combinaison/

import math
import os
import sys
from itertools import permutations
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P, puissance  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert 8 * 7 * 6 == 336 == math.perm(8, 3) == math.factorial(8) // math.factorial(5)
assert math.factorial(8) == 40320 and math.factorial(5) == 120 and math.factorial(3) == 6
assert 336 // 6 == 56 == math.comb(8, 3)
assert math.comb(8, 2) == 28 == 8 * 7 // 2 and 5 * 4 == 20 and math.comb(5, 2) == 10

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6  # la colonne de droite (marge de 3 % : 0,43 du bord)
ORDRE, SANS_ORDRE = BLEU_CALCUL, ORANGE_RETENUE
EQUIPES = "ABCDEFGH"
COUL_EQ = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#A855F7", "#EC4899", "#14B8A6", "#84CC16"]
OR, ARGENT, BRONZE = "#FACC15", "#CBD5E1", "#D97706"


def txt(texte, fs=36, color=WHITE, audit=True, **kw):
    t = Text(texte, font_size=fs, color=color, **kw)
    if not audit:
        t._pas_audit = True
    return t


def badge(i, s=1.0):
    """L'écusson d'une équipe : un carré arrondi de sa couleur et sa lettre."""
    b = RoundedRectangle(width=0.62, height=0.62, corner_radius=0.14, fill_color=COUL_EQ[i], fill_opacity=1,
                         stroke_color=WHITE, stroke_width=2)
    return VGroup(b, txt(EQUIPES[i], 30, WHITE, weight=BOLD).move_to(b)).scale(s)


def personne(couleur=BLEU_CALCUL, peau="#8d5524", cheveux="#1f1308", longs=False, s=1.0):
    """Un pictogramme : tête, cheveux, buste (modèle : ingenieur() de la convexité)."""
    tete = Circle(radius=0.3, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    ch = Arc(radius=0.32, start_angle=0.2, angle=PI - 0.4, stroke_color=cheveux, stroke_width=10)
    ch.move_to(tete.get_top() + DOWN * 0.07)
    buste = RoundedRectangle(width=1.0, height=1.15, corner_radius=0.3, fill_color=couleur, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    g = VGroup(buste, tete, ch)
    if longs:
        g.add(*[RoundedRectangle(width=0.14, height=0.55, corner_radius=0.06, fill_color=cheveux, fill_opacity=1,
                                 stroke_width=0).move_to(P(dx, 0.9)) for dx in (-0.32, 0.32)])
    return g.scale(s)


def casque(s=1.0):
    """Le casque-micro de la joueuse / organisatrice (à poser sur la tête)."""
    arc = Arc(radius=0.36, start_angle=0.1, angle=PI - 0.2, stroke_color=GREY_B, stroke_width=6)
    oreilles = VGroup(*[RoundedRectangle(width=0.14, height=0.26, corner_radius=0.05, fill_color=GREY_D,
                                         fill_opacity=1, stroke_color=GREY_B, stroke_width=2).move_to(P(dx, -0.05))
                        for dx in (-0.36, 0.36)])
    micro = Line(P(0.36, -0.12), P(0.12, -0.3), stroke_width=3, color=GREY_B)
    return VGroup(arc, oreilles, micro).scale(s)


def manette(s=1.0, couleur="#475569"):
    corps = RoundedRectangle(width=1.3, height=0.62, corner_radius=0.28, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    croix = VGroup(Rectangle(width=0.26, height=0.08), Rectangle(width=0.08, height=0.26)).set_fill(WHITE, 1)
    croix.set_stroke(width=0).move_to(P(-0.34, 0))
    btn = VGroup(*[Dot(P(0.3 + dx, dy), radius=0.055, color=c)
                   for dx, dy, c in ((0.12, 0, ROUGE_ERREUR), (-0.12, 0, BLEU_CALCUL), (0, 0.11, VERT_OK),
                                     (0, -0.11, JAUNE_TITRE))])
    return VGroup(corps, croix, btn).scale(s)


def parmi(n, k, fs=44, color=SANS_ORDRE):
    """« k parmi n » comme au bac : n sur k, entre deux grandes parenthèses."""
    h, b = txt(str(n), fs, color), txt(str(k), fs, color)
    pile = VGroup(h, b).arrange(DOWN, buff=0.12 * fs / 44)
    H = pile.height + 0.2 * fs / 44
    pg, pd = txt("(", fs, color, audit=False), txt(")", fs, color, audit=False)
    for p in (pg, pd):
        p.stretch_to_fit_height(H).stretch_to_fit_width(0.18 * fs / 44)
    return VGroup(pg, pile, pd).arrange(RIGHT, buff=0.07 * fs / 44)


def frac(num, den, fs=40, color=WHITE):
    a = num if isinstance(num, Mobject) else txt(num, fs, color)
    b = den if isinstance(den, Mobject) else txt(den, fs, color)
    w = max(a.width, b.width) + 0.18
    barre = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=3, color=color)
    a.next_to(barre, UP, buff=0.1)
    b.next_to(barre, DOWN, buff=0.1)
    return VGroup(a, barre, b)


def podium(s=1.0):
    """Trois marches : 2e à gauche, 1re au centre, 3e à droite (dans l'ordre 1, 2, 3)."""
    m = []
    for rang, (x, h, c) in enumerate(((0, 1.1, OR), (-1.05, 0.78, ARGENT), (1.05, 0.52, BRONZE))):
        r = Rectangle(width=1.0, height=h, fill_color=c, fill_opacity=0.9, stroke_color=WHITE, stroke_width=2)
        r.move_to(P(x, h / 2))
        m.append(VGroup(r, txt(str(rang + 1), 30, BLACK, audit=False, weight=BOLD).move_to(r.get_top() + DOWN * 0.25)))
    return VGroup(*m).scale(s)


def lasso(mobs, color=SANS_ORDRE, buff=0.25):
    """Le groupe entouré (sans ordre) : une ellipse orange autour des écussons."""
    g = VGroup(*mobs)
    return Ellipse(width=g.width + 2 * buff + 0.2, height=g.height + 2 * buff, stroke_color=color,
                   stroke_width=5).move_to(g)


def mini_podium(ids, s=0.5):
    """Un petit podium avec ses trois écussons posés (icône)."""
    pd = podium(s)
    bs = VGroup(*[badge(i, s * 0.9).next_to(pd[r][0], UP, buff=0.04) for r, i in enumerate(ids)])
    return VGroup(pd, bs)


def mini_groupe(ids, s=0.5):
    bs = VGroup(*[badge(i, s) for i in ids]).arrange(RIGHT, buff=0.12 * s / 0.5)
    bs[1].shift(UP * 0.3 * s)
    return VGroup(bs, lasso(bs, buff=0.15))


def mini_passage(n=4, s=0.5):
    cases = VGroup(*[VGroup(Square(0.62, stroke_color=ORDRE, stroke_width=3),
                            txt(str(k + 1), 26, ORDRE, audit=False)) for k in range(n)])
    for c in cases:
        c[1].move_to(c[0])
    return cases.arrange(RIGHT, buff=0.1).scale(s / 0.5)


class DenombrementArrangementCombinaisonBase(AuditSynchro, MotsCales, Notion6e):
    fichier_marques = "denombrement_arrangement_combinaison_marques.json"
    nom_voix = "terminale-denombrement-arrangement-combinaison"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"

    # ── outils (recopiés de convexite_tangente.py) ──────────────────────────

    def t(self, texte, fs=36, color=WHITE, larg=None, audit=True):
        t = txt(texte, fs, color, audit)
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
        return t

    def col(self, mob, y, xl=XL):
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > BORD_X:
            mob.scale_to_fit_width(BORD_X - xl).align_to(P(xl, 0), LEFT)
        if mob.get_bottom()[1] < -1.95 and mob.get_right()[0] > 5.3:  # Ti-Margo
            mob.scale_to_fit_width(5.3 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def ligne(self, *morceaux, y, xl=XL, buff=0.15):
        return self.col(VGroup(*morceaux).arrange(RIGHT, buff=buff), y, xl)

    def insister(self, mob, k=1.35, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        self._margo = m
        return m

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def au_pos(self, i):
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > -0.02:
            self.wait(max(reste, 0) + 0.07)  # + 1 image : jamais une image d'avance

    def au_mot(self, extrait, n=1):
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        self.au_pos(i)

    def au_nb(self, contexte, nb, n=1):
        """Attend le NOMBRE nb dit juste après la n-ième occurrence de contexte."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(contexte, i + 1)
            if i < 0:
                raise ValueError(f"« {contexte} » (n = {n}) absent de la voix")
        j = self._texte_voix.find(nb, i)
        assert j >= 0, (contexte, nb)
        self.au_pos(j)

    def _bords(self):
        super()._bords()
        margo = getattr(self, "_margo", None)
        if margo is None or margo not in self.mobjects:
            return
        for m in self.mobjects:
            if m is margo or m.width == 0 or m.width > 9:
                continue
            if m.get_right()[0] > margo.get_left()[0] - 0.05 and m.get_bottom()[1] < margo.get_top()[1] + 0.05:
                print(f"MARGO {getattr(self, '_cle_voix', '?')} t={self.renderer.time:.1f} {type(m).__name__} "
                      f"x[{m.get_left()[0]:.2f}, {m.get_right()[0]:.2f}] y[{m.get_bottom()[1]:.2f}, "
                      f"{m.get_top()[1]:.2f}]", flush=True)

    # ── la question-pause (modèle : convexite_tangente.py) ─────────────────

    def carte_choix(self, lettre, corps, largeur=4.1, fs=32):
        rond = Circle(radius=0.25 * fs / 32, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 1.15:
            ligne.scale_to_fit_width(largeur - 1.15)
        cadre = RoundedRectangle(width=largeur, height=max(0.72, ligne.height + 0.28), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def q_tete(self, question, choix):
        tete = VGroup(pastille_pause(0.38), self.t("Question !", 38, ORANGE_RETENUE)).arrange(RIGHT, buff=0.22)
        self.col(tete, 3.15)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(tete, RIGHT, buff=0.35)
        if rebours.get_right()[0] > BORD_X:
            rebours.shift(LEFT * (rebours.get_right()[0] - BORD_X))
        q = VGroup(*[x if isinstance(x, Mobject) else self.t(x, 34, larg=BORD_X - XL) for x in question])
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(q, 0)
        q.align_to(P(0, tete.get_bottom()[1] - 0.25), UP)
        cartes = VGroup(*[self.carte_choix(l, c) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.16)
        self.col(cartes, 0)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        pause = self.col(self.t("Mets pause, et choisis !", 32, ORANGE_RETENUE), cartes.get_bottom()[1] - 0.45)
        return tete, q, cartes, pause, rebours

    def q_montrer_choix(self, cartes):
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.15), run_time=0.2)

    def q_pause(self, pause, rebours, cle_q, t0, bonne):
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)

    def q_reponse(self, cartes, bonne, pause, rebours):
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.25)
        ok = self.coche(VERT_OK, 0.2).move_to(b[0].get_right() + LEFT * 0.35)
        self.play(b.animate.scale(1.12), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.12), ok.animate.scale(1 / 1.12, about_point=b.get_center()), run_time=0.25)
        return ok

    def question(self, cle, lignes, choix, bonne, dessin=None):
        """L'écran « Question ! » complet jusqu'au compte à rebours. `dessin` :
        une fonction appelée quand la tête est posée (le dessin de gauche)."""
        self.clear()
        self.add_mascotte()
        self.dire(cle)
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours = self.q_tete(lignes, choix)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        if dessin:
            dessin(q)
        else:
            self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, cle, t0, bonne)
        return q, cartes, pause, rebours

    # ── 00 : le tournoi ────────────────────────────────────────────────────

    def ecran_accroche(self):
        self.clear()
        self.add_mascotte()
        self.dire("00-accroche")
        bs = VGroup(*[badge(i, 1.2) for i in range(8)]).arrange(RIGHT, buff=0.55).move_to(P(-0.4, 1.35))
        l8 = self.t("8 équipes", 40, ORDRE).next_to(bs, DOWN, buff=0.3)
        self.au_mot("8 équipes")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.4, scale=0.6) for b in bs], lag_ratio=0.07),
                  FadeIn(l8), run_time=0.7)
        man = manette(1.0).move_to(P(-5.3, 2.85))
        tour = self.t("Tournoi de jeu vidéo", 46, JAUNE_TITRE).next_to(man, RIGHT, buff=0.35)
        self.au_mot("tournoi")
        self.play(FadeIn(man, scale=1.4), Write(tour), run_time=0.6)
        self.play(*[b.animate.shift(UP * 0.15) for b in bs[::2]], *[b.animate.shift(DOWN * 0.15) for b in bs[1::2]],
                  rate_func=there_and_back, run_time=0.5)
        pd = podium(1.15).move_to(P(-3.0, 0)).align_to(P(0, -3.1), DOWN)
        self.au_mot("un podium")
        self.play(LaggedStart(*[GrowFromEdge(m, DOWN) for m in pd], lag_ratio=0.15), run_time=0.6)
        haut = [bs[2], bs[5], bs[0]]
        self.play(*[haut[r].animate.scale(0.8).next_to(pd[r][0], UP, buff=0.05) for r in range(3)],
                  l8.animate.set_opacity(0.4), run_time=0.7)
        q = VGroup(self.t("Combien de podiums", 42, ORDRE), self.t("différents ?", 42, ORDRE))
        q.arrange(DOWN, buff=0.12).move_to(P(1.7, -1.8))
        self.au_mot("Combien")
        self.play(FadeIn(q, scale=1.2), run_time=0.45)
        self.insister(q, 1.08)
        self.attendre_voix(marge=0.6)

    # ── 01 : page de garde ─────────────────────────────────────────────────

    def ecran_titre(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("01-titre")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Quand l'ordre compte… ou pas", 56, JAUNE_TITRE).to_edge(UP, buff=0.5)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.au_mot("Quand")
        self.play(Write(titre), FadeIn(ident), run_time=0.5)
        mp = mini_podium([2, 5, 0], 0.75).move_to(P(-3.6, -0.55))
        lp = self.t("l'ordre compte", 32, ORDRE).next_to(mp, DOWN, buff=0.2)
        self.au_mot("compte,")
        self.play(FadeIn(mp, shift=UP * 0.2), FadeIn(lp), run_time=0.5)
        mg = mini_groupe([2, 5, 0], 0.75).move_to(P(1.3, -0.45))
        lg = self.t("l'ordre ne compte pas", 32, SANS_ORDRE).next_to(mg, DOWN, buff=0.2).match_y(lp)
        self.au_mot("ne compte pas")
        self.play(FadeIn(mg[0], shift=UP * 0.2), Create(mg[1]), FadeIn(lg), run_time=0.5)
        tags = [("k-uplets d'éléments distincts", ORDRE), ("permutations", ORDRE), ("combinaisons", SANS_ORDRE)]
        ts = VGroup(*[self.t(a, 34, c) for a, c in tags]).arrange(RIGHT, buff=0.55)
        ts.scale_to_fit_width(min(ts.width, 12.4)).move_to(P(0, 1.55))
        for tg, mot in zip(ts, ("k-uplets", "permutations", "combinaisons")):
            self.au_mot(mot)
            self.play(FadeIn(tg, shift=UP * 0.15), run_time=0.35)
        self.attendre_voix(marge=0.9)

    # ── 02 : Léa, organisatrice de tournois d'e-sport ──────────────────────

    def ecran_metier(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-metier")
        lea = personne("#7C3AED", longs=True, s=1.5).move_to(P(-4.9, 1.3))
        cq = casque(1.5).move_to(lea[1].get_center() + UP * 0.12)
        nom = self.t("Léa", 48, ORDRE).move_to(P(0, 2.2)).align_to(P(-3.4, 0), LEFT)
        met = self.t("organisatrice de tournois d'e-sport", 36).move_to(P(0, 1.45)).align_to(P(-3.4, 0), LEFT)
        self.au_mot("Léa")
        self.play(FadeIn(lea, shift=UP * 0.2), FadeIn(cq), FadeIn(nom, shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("organise")
        man = manette(0.8).next_to(met, RIGHT, buff=0.3)
        self.play(FadeIn(met, shift=RIGHT * 0.15), FadeIn(man, scale=1.3), run_time=0.45)
        self.au_mot("tout prévoir")
        prev = self.t("Tout prévoir :", 38, JAUNE_TITRE).move_to(P(0, 0.3)).align_to(P(-3.4, 0), LEFT)
        self.play(FadeIn(prev, shift=UP * 0.1), run_time=0.35)
        icones = [(mini_podium([2, 5, 0], 0.55), ["les podiums"], ORDRE, "les podiums"),
                  (mini_passage(4, 0.5), ["les ordres", "de passage"], ORDRE, "les ordres"),
                  (mini_groupe([1, 3, 6], 0.55), ["les groupes", "de la finale"], SANS_ORDRE, "les groupes")]
        for k, (ic, lab, c, mot) in enumerate(icones):
            x = (-4.6, -1.0, 2.6)[k]
            ic.move_to(P(x, -1.25))
            lb = VGroup(*[self.t(z, 30, c) for z in lab]).arrange(DOWN, buff=0.08)
            lb.next_to(ic, DOWN, buff=0.25)
            self.au_mot(mot)
            self.play(FadeIn(ic, shift=UP * 0.2, scale=0.8), FadeIn(lb, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 03 : le podium se compose, l'arbre pousse ──────────────────────────

    def arbre(self, x0=-1.95, xs=(-0.95, 0.25, 1.35), H=2.4):
        """Les trois niveaux : 8 branches, puis 7 sous chacune, puis 6 (336 feuilles)."""
        racine = P(x0, 0)
        n1 = [P(xs[0], H - k * 2 * H / 7) for k in range(8)]
        n2 = [[P(xs[1], p[1] + 0.3 - j * 0.6 / 6) for j in range(7)] for p in n1]
        lv1 = VGroup(*[Line(racine, p, stroke_width=3, color=ORDRE) for p in n1])
        lv2 = VGroup(*[Line(p, q, stroke_width=1.6, color=ORDRE) for p, qs in zip(n1, n2) for q in qs])
        lv3 = VGroup(*[Line(q, P(xs[2], q[1] + 0.04 - i * 0.08 / 5), stroke_width=0.7, color=ORDRE)
                       for qs in n2 for q in qs for i in range(6)])
        return Dot(racine, radius=0.07, color=ORDRE), lv1, lv2, lv3

    def ecran_podium(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-podium")
        bs = VGroup(*[badge(i, 0.72) for i in range(8)]).arrange(RIGHT, buff=0.1).move_to(P(-4.4, 2.95))
        pd = podium(0.95).move_to(P(-4.4, 0)).align_to(P(0, -1.9), DOWN)
        self.au_mot("Le podium")
        self.play(FadeIn(bs, shift=DOWN * 0.2), LaggedStart(*[GrowFromEdge(m, DOWN) for m in pd], lag_ratio=0.15),
                  run_time=0.6)
        rac, lv1, lv2, lv3 = self.arbre()
        choix = [2, 5, 0]
        noms = ["1re place :", "2e place :", "3e place :"]
        vals = ["8", "7", "6"]
        mots = [("première", "8"), ("reste", "7"), ("troisième", "6")]
        niveaux = [lv1, lv2, lv3]
        xs = (-1.45, -0.35, 0.8)
        restants = list(range(8))
        lignes = []
        for r in range(3):
            self.au_nb(*mots[r])
            v = self.t(vals[r], 40, ORDRE)
            lg = self.ligne(self.t(noms[r], 34, audit=False), v, y=2.35 - r * 0.72)
            sous = self.t(("" if r == 0 else "× ") + vals[r], 32, ORDRE).move_to(P(xs[r], -2.85))
            anims = [FadeIn(lg, shift=RIGHT * 0.15), FadeIn(sous),
                     Create(niveaux[r], lag_ratio=0.02 if r else 0.1)]
            if r == 0:
                anims.append(FadeIn(rac))
            self.play(*anims, *[Indicate(bs[i], color=WHITE, scale_factor=1.15) for i in restants], run_time=0.8)
            b = bs[choix[r]]
            self.play(b.animate.scale(1.1).next_to(pd[r][0], UP, buff=0.05), run_time=0.45)
            restants.remove(choix[r])
            lignes.append(lg)
        self.au_mot("8 fois")
        p = [self.t(x, 42, ORDRE) for x in ("8", "× 7", "× 6", "=", "336")]
        prod = self.ligne(*p, y=-0.15)
        p[4].set_color(VERT_OK)
        self.play(FadeIn(p[0], shift=UP * 0.1), run_time=0.25)
        self.au_nb("8 fois", "7")
        self.play(FadeIn(p[1], shift=UP * 0.1), run_time=0.25)
        self.au_nb("7 fois", "6")
        self.play(FadeIn(p[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("336")
        feuilles = self.t("336", 30, VERT_OK).move_to(P(1.75, 2.85))
        self.play(FadeIn(VGroup(*p[3:]), scale=1.4), lv3.animate.set_color(VERT_OK), FadeIn(feuilles), run_time=0.5)
        self.insister(p[4], 1.25)
        self.au_mot("l'ordre compte")
        oc = self.ligne(self.t("L'ordre compte !", 40, ORDRE), y=-1.1)
        self.play(FadeIn(oc, scale=1.2), run_time=0.4)
        self.au_mot("or,")
        a, b = bs[choix[0]], bs[choix[1]]
        pa, pb = a.get_center(), b.get_center()
        self.play(a.animate.move_to(pb), b.animate.move_to(pa), path_arc=PI / 2, run_time=0.9)
        ne = self.ligne(self.t("or, argent, bronze :", 32), self.t("pas pareil", 30, ORDRE), y=-1.6)
        self.au_mot("ce n'est pas")
        self.play(FadeIn(ne, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 04 : le 3-uplet, la formule, 8!/5! = 336 ───────────────────────────

    def uplet(self, ids, s=0.7, color=ORDRE):
        """( C , F , A ) : les écussons dans l'ordre, entre parenthèses bleues."""
        els = []
        for k, i in enumerate(ids):
            els.append(badge(i, s))
            if k < len(ids) - 1:
                els.append(self.t(",", 40, color, audit=False))
        corps = VGroup(*els).arrange(RIGHT, buff=0.12)
        pg, pd = self.t("(", 60, color, audit=False), self.t(")", 60, color, audit=False)
        return VGroup(pg, corps, pd).arrange(RIGHT, buff=0.12)

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-formule")
        up = self.uplet([2, 5, 0]).move_to(P(-4.4, 2.75))
        l1 = self.t("un 3-uplet", 36, ORDRE).next_to(up, RIGHT, buff=0.4).shift(UP * 0.25)
        l2 = self.t("d'éléments distincts", 30, ORDRE).next_to(l1, DOWN, buff=0.1, aligned_edge=LEFT)
        self.au_mot("3-uplet")
        self.play(FadeIn(up, shift=RIGHT * 0.2), FadeIn(l1, shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("d'éléments distincts")
        self.play(FadeIn(l2, shift=RIGHT * 0.1), run_time=0.35)
        g1 = self.t("Nombre de k-uplets d'éléments distincts", 32).move_to(P(0, 1.65)).align_to(P(-6.3, 0), LEFT)
        g2 = self.t("d'un ensemble à n éléments :", 32).next_to(g1, DOWN, buff=0.12, aligned_edge=LEFT)
        self.au_mot("Le nombre")
        self.play(FadeIn(g1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("d'un ensemble")
        self.play(FadeIn(g2, shift=UP * 0.1), run_time=0.35)
        f = [self.t("n", 42, ORDRE), self.t("× (n − 1)", 42, ORDRE),
             self.t("× … × (n − k + 1)", 42, ORDRE, audit=False)]
        fo = VGroup(*f).arrange(RIGHT, buff=0.18).move_to(P(0, 0.2)).align_to(P(-6.3, 0), LEFT)
        self.au_mot("c'est n")
        self.play(FadeIn(f[0], scale=1.3), run_time=0.3)
        self.au_nb("n moins", "1")
        self.play(FadeIn(f[1], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("suite")
        self.play(FadeIn(f[2], shift=RIGHT * 0.15), run_time=0.35)
        br = Brace(fo, DOWN, buff=0.12, color=GREY_B)
        kf = self.t("k facteurs", 30, GREY_A).next_to(br, DOWN, buff=0.08)
        self.au_mot("k facteurs")
        self.play(GrowFromCenter(br), FadeIn(kf), run_time=0.4)
        self.au_mot("n factorielle")
        eg = self.t("=", 44, ORDRE)
        fr = frac(self.t("n!", 42, ORDRE), self.t("(n − k)!", 42, ORDRE), color=ORDRE)
        ec = VGroup(eg, fr).arrange(RIGHT, buff=0.25).next_to(fo, RIGHT, buff=0.3)
        self.play(FadeIn(eg), FadeIn(fr[0], scale=1.3), run_time=0.35)
        self.au_mot("sur n moins")
        self.play(Create(fr[1]), FadeIn(fr[2], shift=UP * 0.1), run_time=0.4)
        cad = SurroundingRectangle(ec, color=ORDRE, buff=0.15, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        # l'exemple, colonne de droite
        self.au_nb("Ici", "8")
        ici = self.t("Ici :", 36, JAUNE_TITRE)
        f8 = frac(self.t("8!", 44), self.t("5!", 44))
        na = self.t("8 × 7 × 6 ×", 26, audit=False)
        nb = self.t("5 × 4 × 3 × 2 × 1", 26, audit=False)
        num = VGroup(na, nb).arrange(RIGHT, buff=0.1)
        den = self.t("5 × 4 × 3 × 2 × 1", 26, audit=False)
        dv = frac(num, den)
        dv[2].align_to(nb, LEFT)
        eg8 = self.t("=", 40)
        res = VGroup(self.t("= 8 × 7 × 6 =", 36, audit=False), self.t("336", 46, VERT_OK)).arrange(RIGHT, buff=0.15)
        rang = VGroup(ici, f8, eg8, dv, res).arrange(RIGHT, buff=0.25)
        rang.scale_to_fit_width(min(rang.width, 11.2)).move_to(P(0, -2.2)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(ici), FadeIn(f8[0], scale=1.3), run_time=0.35)
        self.au_nb("sur 5", "5")
        self.play(Create(f8[1]), FadeIn(f8[2], shift=UP * 0.1), run_time=0.35)
        barres = VGroup(*[Line(m.get_corner(DL) + P(-0.05, 0.02), m.get_corner(UR) + P(0.05, -0.02),
                               color=ROUGE_ERREUR, stroke_width=4) for m in (nb, dv[2])])
        self.play(FadeIn(eg8), FadeIn(dv, shift=DOWN * 0.15), run_time=0.4)
        self.play(Create(barres), run_time=0.35)
        self.au_mot("336")
        self.play(FadeIn(res, scale=1.3), run_time=0.4)
        self.insister(res[1], 1.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : l'ordre de passage sur scène, 8! = 40 320 ─────────────────────

    def ecran_permutations(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-permutations")
        ordre = [3, 0, 6, 2, 7, 5, 1, 4]
        vrac = [(3.0, 2.65), (3.9, 2.4), (4.8, 2.75), (5.7, 2.45), (3.3, 1.8), (4.25, 1.6), (5.2, 1.9), (6.0, 1.65)]
        bs = VGroup(*[badge(i, 1.0).move_to(P(*vrac[i])) for i in range(8)])
        self.au_mot("8 équipes")
        self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in bs], lag_ratio=0.06), run_time=0.6)
        cases = VGroup(*[Square(0.95, stroke_color=ORDRE, stroke_width=3) for _ in range(8)])
        cases.arrange(RIGHT, buff=0.12).move_to(P(-2.15, 0.55))
        nums = VGroup(*[self.t(str(k + 1), 24, GREY_A, audit=False).next_to(c, UP, buff=0.08)
                        for k, c in enumerate(cases)])
        self.au_mot("toutes")
        self.play(Create(cases), run_time=0.4)
        self.play(LaggedStart(*[bs[i].animate.move_to(cases[k]) for k, i in enumerate(ordre)], lag_ratio=0.12),
                  run_time=1.0)
        scene = Rectangle(width=4.6, height=0.3, fill_color="#7C2D12", fill_opacity=1, stroke_width=0)
        scene.move_to(P(-4.0, 2.05))
        rideaux = VGroup(*[Polygon(P(x, 3.1), P(x + 0.7 * s, 3.1), P(x + 0.2 * s, 2.2), P(x, 2.2),
                                   fill_color="#B91C1C", fill_opacity=1, stroke_width=0)
                           for x, s in ((-6.3, 1), (-1.7, -1))])
        spot = Polygon(P(-4.0, 3.1), P(-4.9, 2.2), P(-3.1, 2.2), fill_color=JAUNE_TITRE, fill_opacity=0.25,
                       stroke_width=0)
        tit = self.t("Ordre de passage sur scène", 30, JAUNE_TITRE, larg=4.2).move_to(P(-4.0, 2.65))
        self.au_mot("passage")
        self.play(FadeIn(scene), FadeIn(rideaux), FadeIn(spot), Write(tit), FadeIn(nums), run_time=0.6)
        ch = [self.t(str(8 - k), 34, ORDRE, audit=k not in (3, 4, 5, 6)).next_to(cases[k], DOWN, buff=0.15)
              for k in range(8)]
        for k, (ctx, nb) in enumerate((("8 fois", "8"), ("8 fois", "7"), ("7 fois", "6"))):
            self.au_nb(ctx, nb)
            self.play(FadeIn(ch[k], scale=1.4), Indicate(bs[ordre[k]], scale_factor=1.15, color=WHITE), run_time=0.3)
        self.au_mot("jusqu'à")
        self.play(LaggedStart(*[FadeIn(c, scale=1.4) for c in ch[3:7]], lag_ratio=0.15), run_time=0.45)
        self.au_nb("jusqu'à", "1")
        self.play(FadeIn(ch[7], scale=1.4), run_time=0.25)
        self.au_mot("8 factorielle")
        p1 = self.t("8 × 7 × 6 × 5 × 4 × 3 × 2 × 1", 38, ORDRE, audit=False)
        p2 = self.t("= 8!", 42, ORDRE)
        p3 = self.t("= 40 320", 46, VERT_OK, audit=False)
        VGroup(p1, p2, p3).arrange(RIGHT, buff=0.2).move_to(P(0, -1.2)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(p1, shift=UP * 0.1), FadeIn(p2, scale=1.2), run_time=0.45)
        self.au_mot("40 320")
        self.play(FadeIn(p3, scale=1.4), run_time=0.35)
        self.insister(p3, 1.2)
        self.au_mot("permutation")
        r1 = VGroup(self.t("Ranger tous les éléments :", 34), self.t("une permutation", 34, ORDRE))
        r1.arrange(RIGHT, buff=0.2).move_to(P(0, -2.1)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Un ensemble")
        r2a = self.t("n éléments :", 36)
        r2b = self.t("n! permutations", 36, VERT_OK)
        VGroup(r2a, r2b).arrange(RIGHT, buff=0.2).move_to(P(0, -2.85)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(r2a, shift=UP * 0.1), run_time=0.35)
        self.au_mot("n factorielle")
        cad = SurroundingRectangle(r2b, color=VERT_OK, buff=0.1, stroke_width=3)
        self.play(FadeIn(r2b, scale=1.2), Create(cad), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 06 : question-pause n° 1 : 5 joueurs, 5! = 120 ─────────────────────

    def joueurs(self, n=5, s=0.5):
        cs = [BLEU_CALCUL, "#F472B6", VERT_OK, JAUNE_TITRE, VIOLET_ACCENT]
        peaux = ["#8d5524", "#f1c27d", "#c68642", "#e0ac69", "#5c3317"]
        return VGroup(*[personne(cs[k], peaux[k], longs=k % 2 == 1, s=s) for k in range(n)])

    def ecran_question1(self):
        js = self.joueurs().arrange(RIGHT, buff=0.35).move_to(P(-3.6, 1.6))
        cases = VGroup(*[Square(0.85, stroke_color=ORDRE, stroke_width=3) for _ in range(5)])
        cases.arrange(RIGHT, buff=0.18).move_to(P(-3.6, -0.6))

        def dessin(q):
            self.au_mot("5 joueurs")
            self.play(FadeIn(q[0], shift=UP * 0.1), LaggedStart(*[FadeIn(j, shift=UP * 0.2) for j in js],
                                                                  lag_ratio=0.1), run_time=0.5)
            self.au_mot("défi")
            self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
            self.au_mot("Combien")
            self.play(FadeIn(q[2], shift=UP * 0.1), Create(cases), run_time=0.4)

        q, cartes, pause, rebours = self.question(
            "06-question", ["5 joueurs passent", "un par un pour un défi.", "Combien d'ordres ?"],
            ["25", "120", "5"], 1, dessin)
        self.dire("06b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        self.au_nb("Réponse B", "5")
        f5 = self.t("5! =", 38, ORDRE)
        pr = [self.t(x, 38, ORDRE) for x in ("5", "× 4", "× 3", "× 2", "× 1")]
        eg = self.t("= 120", 42, VERT_OK)
        VGroup(f5, *pr, eg).arrange(RIGHT, buff=0.14).move_to(P(-2.6, -2.3))
        self.play(FadeIn(f5, scale=1.3), run_time=0.3)
        mots = [("5 fois", "5"), ("4 fois", "4"), ("3 fois", "3"), ("2 fois", "2"), ("fois 1", "1")]
        for k, (ctx, nb) in enumerate(mots):
            self.au_nb(ctx, nb)
            n = self.t(nb, 32, ORDRE).next_to(cases[k], DOWN, buff=0.12)
            self.play(js[k].animate.scale(0.75).move_to(cases[k]), FadeIn(pr[k], shift=UP * 0.1), FadeIn(n),
                      run_time=0.28)
        self.au_mot("120")
        self.play(FadeIn(eg, scale=1.4), run_time=0.3)
        self.insister(eg, 1.2)
        self.attendre_voix(marge=0.8)

    # ── 07 : la finale sans classement, 336 ÷ 6 = 56 ───────────────────────

    def ecran_groupe(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-groupe")
        fin = self.t("Finale :", 38, JAUNE_TITRE).move_to(P(-5.4, 2.85))
        trois = VGroup(*[badge(i, 0.8) for i in range(3)]).arrange(RIGHT, buff=0.15).next_to(fin, RIGHT, buff=0.3)
        n3 = self.t("3 équipes,", 36).next_to(trois, RIGHT, buff=0.3)
        sc = self.t("sans classement", 36, SANS_ORDRE).next_to(n3, RIGHT, buff=0.2)
        self.au_mot("3 équipes")
        self.play(FadeIn(fin), LaggedStart(*[FadeIn(b, scale=0.5) for b in trois], lag_ratio=0.15),
                  FadeIn(n3), run_time=0.5)
        self.au_mot("sans classement")
        self.play(FadeIn(sc, shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("L'ordre ne compte plus")
        onc = self.t("L'ordre ne compte plus.", 36, SANS_ORDRE).move_to(P(0, 2.1)).align_to(fin, LEFT)
        self.play(FadeIn(onc, shift=UP * 0.1), run_time=0.35)
        p1 = mini_podium([0, 1, 2], 0.7).move_to(P(-5.0, 0.2))
        p2 = mini_podium([2, 1, 0], 0.7).move_to(P(-1.9, 0.2))
        self.au_mot("podium A")
        self.play(FadeIn(p1, shift=UP * 0.2), run_time=0.4)
        self.au_mot("podium C")
        self.play(FadeIn(p2, shift=UP * 0.2), run_time=0.4)
        gr = mini_groupe([0, 1, 2], 0.8).move_to(P(3.6, 0.45))
        lgr = self.t("le même groupe", 34, SANS_ORDRE).next_to(gr, DOWN, buff=0.2)
        fl = VGroup(*[Arrow(p.get_right() + RIGHT * 0.05, gr.get_left(), buff=0.1, color=SANS_ORDRE,
                            stroke_width=4, max_tip_length_to_length_ratio=0.12) for p in (p1, p2)])
        fl[0] = CurvedArrow(p1.get_top() + UP * 0.08, gr.get_left() + P(-0.05, 0.3), angle=-PI / 5,
                            color=SANS_ORDRE, stroke_width=4, tip_length=0.2)
        self.au_mot("même groupe")
        self.play(LaggedStart(*[Create(f) for f in fl], lag_ratio=0.2), FadeIn(gr[0], scale=0.8),
                  Create(gr[1]), FadeIn(lgr), run_time=0.6)
        # les 6 podiums du groupe {A, B, C}
        ups = VGroup(*[self.uplet(list(pm), 0.5) for pm in permutations([0, 1, 2])])
        ups.arrange_in_grid(rows=3, cols=2, buff=(0.5, 0.25)).move_to(P(-3.4, -0.3))
        br = Brace(ups, RIGHT, buff=0.15, color=SANS_ORDRE)
        f6a, f6b = self.t("3! =", 34, ORDRE), self.t("6 podiums", 34, ORDRE)
        VGroup(f6a, f6b).arrange(RIGHT, buff=0.15).next_to(gr, DOWN, buff=0.75)
        self.au_mot("3 factorielle")
        self.play(FadeOut(p1), FadeOut(p2), FadeOut(fl), FadeIn(f6a, scale=1.2), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(u, shift=RIGHT * 0.15) for u in ups], lag_ratio=0.1), run_time=0.7)
        self.au_nb("soit", "6")
        fl2 = Arrow(br.get_right(), gr.get_left() + DOWN * 0.1, buff=0.12, color=SANS_ORDRE, stroke_width=4,
                    max_tip_length_to_length_ratio=0.12)
        self.play(GrowFromCenter(br), GrowArrow(fl2), FadeIn(f6b, scale=1.2), run_time=0.5)
        eq = [self.t("336", 46, ORDRE), self.t("÷ 6", 46), self.t("= 56 groupes", 46, VERT_OK)]
        VGroup(*eq).arrange(RIGHT, buff=0.2).move_to(P(-1.2, -2.75))
        self.au_mot("336")
        self.play(FadeIn(eq[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("divisé par", "6")
        self.play(FadeIn(eq[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("56")
        self.play(FadeIn(eq[2], scale=1.3), run_time=0.35)
        self.insister(eq[2], 1.15)
        self.attendre_voix(marge=0.6)

    # ── 08 : 3 parmi 8 = 8! / (3! × 5!) = 56 ───────────────────────────────

    def ecran_combinaison(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-combinaison")
        tit = self.t("Une combinaison", 48, SANS_ORDRE).to_edge(UP, buff=0.45)
        self.au_mot("combinaison")
        self.play(Write(tit), run_time=0.5)
        bs = VGroup(*[badge(i, 0.9) for i in range(8)]).arrange(RIGHT, buff=0.45).move_to(P(-0.4, 1.75))
        self.play(FadeIn(bs, shift=DOWN * 0.15), run_time=0.3)
        choisis = [bs[0], bs[1], bs[2]]
        self.au_mot("3 éléments")
        las = lasso(choisis, buff=0.12)
        l3 = self.t("3 éléments", 32, SANS_ORDRE).next_to(las, DOWN, buff=0.15)
        self.play(Create(las), FadeIn(l3), *[b.animate.shift(DOWN * 0.08) for b in choisis], run_time=0.45)
        self.au_nb("parmi", "8")
        l8 = self.t("parmi 8", 32, SANS_ORDRE).next_to(bs, DOWN, buff=0.27).align_to(bs, RIGHT)
        self.play(FadeIn(l8), Indicate(bs, color=WHITE, scale_factor=1.05), run_time=0.45)
        bn = parmi(8, 3, 64)
        dit = self.t("« 3 parmi 8 »", 32, SANS_ORDRE, audit=False)
        eg1 = self.t("=", 54)
        f = frac(self.t("8!", 50), VGroup(self.t("3!", 50), self.t("×", 50), self.t("5!", 50)).arrange(RIGHT,
                                                                                                      buff=0.15))
        eg2 = self.t("= 56", 60, VERT_OK)
        ligne = VGroup(bn, eg1, f, eg2).arrange(RIGHT, buff=0.35).move_to(P(-0.5, -1.25))
        dit.next_to(bn, DOWN, buff=0.25)
        self.au_mot("3 parmi")
        self.play(FadeIn(bn[0]), FadeIn(bn[2]), FadeIn(bn[1][1], scale=1.3), run_time=0.3)
        self.au_nb("3 parmi", "8")
        self.play(FadeIn(bn[1][0], scale=1.3), FadeIn(dit), run_time=0.3)
        self.au_mot("factorielle")
        self.play(FadeIn(eg1), FadeIn(f[0], scale=1.2), run_time=0.35)
        self.au_mot("3 factorielle")
        self.play(Create(f[1]), FadeIn(f[2][0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("5 factorielle")
        self.play(FadeIn(f[2][1:], shift=UP * 0.1), run_time=0.35)
        self.au_mot("56")
        self.play(FadeIn(eg2, scale=1.4), run_time=0.35)
        self.insister(eg2, 1.2)
        self.attendre_voix(marge=0.6)

    # ── 09 : le piège ──────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-piege")
        tri = Triangle(fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0).scale(0.32)
        tri.add(txt("!", 30, WHITE, weight=BOLD).move_to(tri.get_center() + DOWN * 0.06))
        pg = VGroup(tri, self.t("Le piège !", 50, ROUGE_ERREUR)).arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.45)
        self.au_mot("piège")
        self.play(FadeIn(pg, scale=1.3), run_time=0.45)
        mp = mini_podium([0, 1, 2], 0.65).move_to(P(-4.8, 1.0))
        lp = self.t("compter des podiums", 32, ORDRE, larg=3.5).next_to(mp, DOWN, buff=0.2)
        self.au_mot("Compter des podiums")
        self.play(FadeIn(mp, shift=UP * 0.15), FadeIn(lp), run_time=0.4)
        mg = mini_groupe([0, 1, 2], 0.65).move_to(P(-0.2, 1.0))
        lg = self.t("quand on cherche des groupes", 32, SANS_ORDRE, larg=3.9).next_to(mg, DOWN, buff=0.2)
        self.au_mot("cherche des groupes")
        self.play(FadeIn(mg, shift=UP * 0.15), FadeIn(lg), run_time=0.4)
        self.au_mot("336")
        x336 = self.t("336", 54, ROUGE_ERREUR).move_to(P(4.3, 1.25))
        self.play(FadeIn(x336, scale=1.4), run_time=0.35)
        self.au_mot("6 fois")
        f6 = self.t("chaque groupe compté 6 fois", 32, ROUGE_ERREUR, larg=4.1).next_to(x336, DOWN, buff=0.2)
        barre = Line(x336.get_corner(DL), x336.get_corner(UR), color=ROUGE_ERREUR, stroke_width=6)
        self.play(FadeIn(f6, shift=UP * 0.1), Create(barre), run_time=0.45)
        # le test de l'échange
        self.au_mot("j'échange")
        a, b = badge(3, 1.1).move_to(P(-4.9, -1.25)), badge(6, 1.1).move_to(P(-3.5, -1.25))
        q1 = self.t("J'échange deux éléments :", 34).move_to(P(0, -0.85)).align_to(P(-2.6, 0), LEFT)
        self.play(FadeIn(a), FadeIn(b), FadeIn(q1, shift=RIGHT * 0.1), run_time=0.4)
        self.play(a.animate.move_to(b.get_center()), b.animate.move_to(a.get_center()), path_arc=PI * 0.8,
                  run_time=0.8)
        self.au_mot("change quelque")
        q2 = self.t("ça change quelque chose ?", 34, JAUNE_TITRE).next_to(q1, RIGHT, buff=0.2)
        if q2.get_right()[0] > BORD_X:
            VGroup(q1, q2).scale_to_fit_width(BORD_X + 2.6).align_to(P(-2.6, 0), LEFT)
        self.play(FadeIn(q2, shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("Si oui")
        oui = VGroup(self.t("oui :", 34, ORDRE), self.t("l'ordre compte", 34, ORDRE)).arrange(RIGHT, buff=0.15)
        oui.move_to(P(0, -2.0)).align_to(P(-2.6, 0), LEFT)
        c1 = SurroundingRectangle(oui, color=ORDRE, buff=0.12, stroke_width=3)
        self.play(FadeIn(oui[0]), run_time=0.25)
        self.au_mot("l'ordre compte")
        self.play(FadeIn(oui[1], shift=RIGHT * 0.1), Create(c1), run_time=0.35)
        self.au_mot("Sinon")
        non = VGroup(self.t("non :", 34, SANS_ORDRE), self.t("combinaison", 34, SANS_ORDRE)).arrange(RIGHT, buff=0.15)
        non.move_to(P(0, -2.8)).align_to(P(-2.6, 0), LEFT)
        c2 = SurroundingRectangle(non, color=SANS_ORDRE, buff=0.12, stroke_width=3)
        self.play(FadeIn(non[0]), run_time=0.25)
        self.au_mot("combinaison")
        self.play(FadeIn(non[1], shift=RIGHT * 0.1), Create(c2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 10 : question-pause n° 2 : le match d'ouverture, 28 ────────────────

    def ecran_question2(self):
        c0, R = P(-3.4, -0.05), 1.9
        pos = [c0 + R * P(math.cos(PI / 2 - k * TAU / 8), math.sin(PI / 2 - k * TAU / 8)) for k in range(8)]
        bs = VGroup(*[badge(k, 0.8).move_to(pos[k]) for k in range(8)])
        a, e = 0, 3
        seg = Line(pos[a], pos[e], color=SANS_ORDRE, stroke_width=5)
        vs = txt("VS", 30, SANS_ORDRE, weight=BOLD).move_to(seg.get_center() + P(-0.3, 0.25))

        def dessin(q):
            self.au_mot("2 équipes")
            self.play(FadeIn(q[0][:15], shift=UP * 0.1), LaggedStart(*[FadeIn(b, scale=0.6) for b in bs],
                                                                        lag_ratio=0.06), run_time=0.5)
            self.play(Indicate(bs[a], color=WHITE), Indicate(bs[e], color=WHITE), run_time=0.4)
            self.au_mot("8 pour")
            self.play(FadeIn(q[0][15:], shift=UP * 0.1), run_time=0.3)
            self.au_mot("match")
            self.add(seg)
            self.bring_to_front(bs)
            self.play(FadeIn(q[1], shift=UP * 0.1), Create(seg), FadeIn(vs), run_time=0.4)
            self.au_mot("Combien")
            self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.3)

        q, cartes, pause, rebours = self.question(
            "10-question", ["Léa tire 2 équipes parmi les 8", "pour le match d'ouverture.", "Combien de matchs ?"], ["56", "28", "64"], 1, dessin)
        self.dire("10b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        self.au_mot("Échanger")
        self.play(bs[a].animate.move_to(pos[e]), bs[e].animate.move_to(pos[a]), path_arc=PI / 2, run_time=0.8)
        mm = VGroup(self.t("A contre D", 32), self.t("=", 32, SANS_ORDRE), self.t("D contre A", 32))
        mm.arrange(RIGHT, buff=0.2).move_to(P(-3.4, -2.55))
        self.au_mot("même match")
        self.play(FadeIn(mm, shift=UP * 0.1), Indicate(seg, color=SANS_ORDRE), run_time=0.4)
        self.au_mot("l'ordre ne compte")
        onc = self.t("l'ordre ne compte pas", 30, SANS_ORDRE).next_to(mm, DOWN, buff=0.15)
        self.play(FadeIn(onc, shift=UP * 0.1), run_time=0.35)
        f = [self.t("8 × 7", 44), self.t("÷ 2", 44), self.t("= 28", 48, VERT_OK)]
        VGroup(*f).arrange(RIGHT, buff=0.2).move_to(P(-3.4, 2.65))
        self.au_mot("8 fois")
        self.play(FadeIn(f[0][0], shift=UP * 0.1), run_time=0.25)
        self.au_nb("8 fois", "7")
        self.play(FadeIn(f[0][1:], shift=UP * 0.1), run_time=0.25)
        self.au_nb("divisé par", "2")
        self.play(FadeIn(f[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("28")
        cordes = VGroup(*[Line(pos[i], pos[j], color=SANS_ORDRE, stroke_width=2.5).set_opacity(0.8)
                          for i in range(8) for j in range(i + 1, 8)])
        self.add(cordes)
        self.bring_to_front(bs)
        self.play(FadeIn(f[2], scale=1.4), LaggedStart(*[Create(c) for c in cordes], lag_ratio=0.05),
                  FadeOut(mm), FadeOut(onc), run_time=0.9)
        n28 = self.t("28 matchs", 34, VERT_OK).move_to(P(-3.4, -2.6))
        self.add(n28)
        self.play(FadeIn(n28, scale=1.2), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 11 : question-pause n° 3 : capitaine et vice-capitaine, 20 ─────────

    def brassard(self, lettre, couleur):
        c = Circle(radius=0.2, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        return VGroup(c, txt(lettre, 24, BLACK, weight=BOLD).move_to(c))

    def ecran_question3(self):
        js = self.joueurs(s=0.55).arrange(RIGHT, buff=0.4).move_to(P(-3.5, 1.4))
        cap = self.brassard("C", OR).move_to(js[1][0].get_center())
        vic = self.brassard("V", ARGENT).move_to(js[3][0].get_center())

        def dessin(q):
            self.au_mot("5 joueurs")
            self.play(FadeIn(q[0], shift=UP * 0.1), LaggedStart(*[FadeIn(j, shift=UP * 0.2) for j in js],
                                                                  lag_ratio=0.1), run_time=0.5)
            self.au_mot("capitaine")
            self.play(FadeIn(q[1][:9], shift=UP * 0.1), FadeIn(cap, scale=2), run_time=0.35)
            self.au_mot("vice-capitaine")
            self.play(FadeIn(q[1][9:], shift=UP * 0.1), FadeIn(vic, scale=2), run_time=0.35)
            self.au_mot("Combien")
            self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.3)

        q, cartes, pause, rebours = self.question(
            "11-question", ["Équipe de 5 joueurs :", "capitaine + vice-capitaine", "Combien de choix ?"],
            ["10", "20", "25"], 1, dessin)
        self.dire("11b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        self.au_mot("rôles sont différents")
        pc, pv = cap.get_center(), vic.get_center()
        self.play(cap.animate.move_to(pv), vic.animate.move_to(pc), path_arc=PI / 2, run_time=0.7)
        aut = self.t("rôles échangés : un autre choix", 28, ORDRE, larg=5.6).move_to(P(-3.5, -0.2))
        self.play(FadeIn(aut, shift=UP * 0.1), run_time=0.3)
        self.au_mot("l'ordre compte")
        oc = self.t("l'ordre compte", 34, ORDRE).move_to(P(-3.5, -0.8))
        self.play(FadeIn(oc, scale=1.2), run_time=0.3)
        f = [self.t("5", 46, ORDRE), self.t("× 4", 46, ORDRE), self.t("= 20", 50, VERT_OK)]
        VGroup(*f).arrange(RIGHT, buff=0.2).move_to(P(-3.5, -1.7))
        self.au_mot("5 fois")
        self.play(FadeIn(f[0], shift=UP * 0.1), run_time=0.25)
        self.au_nb("5 fois", "4")
        self.play(FadeIn(f[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("20")
        self.play(FadeIn(f[2], scale=1.4), run_time=0.3)
        self.au_mot("10")
        dix = VGroup(self.t("10", 38, ROUGE_ERREUR), self.t(": on oublie les rôles", 32, ROUGE_ERREUR))
        dix.arrange(RIGHT, buff=0.18).move_to(P(-3.5, -2.6))
        self.play(FadeIn(dix[0], scale=1.3), run_time=0.3)
        self.au_mot("oublie")
        self.play(FadeIn(dix[1], shift=RIGHT * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 12 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("12-appris")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 38
        a1 = self.t("L'ordre compte, sans répétition :", fs, ORDRE)
        a2 = frac(self.t("n!", fs), self.t("(n − k)!", fs), fs)
        b1 = self.t("Ranger tous les éléments :", fs)
        b2 = self.t("n! permutations", fs, VERT_OK)
        c1 = self.t("L'ordre ne compte pas :", fs, SANS_ORDRE)
        c2 = parmi("n", "k", fs)
        c3 = self.t("= le nombre précédent ÷ k!", fs)
        blocs = [VGroup(a1, a2).arrange(RIGHT, buff=0.3), VGroup(b1, b2).arrange(RIGHT, buff=0.25),
                 VGroup(c1, c2, c3).arrange(RIGHT, buff=0.25)]
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3) for b in blocs])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.4, 0.0))
        self.au_mot("L'ordre compte")
        self.play(Create(lignes[0][0]), FadeIn(a1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("n factorielle")
        self.play(FadeIn(a2[0], scale=1.2), run_time=0.3)
        self.au_mot("sur n moins")
        self.play(Create(a2[1]), FadeIn(a2[2], shift=UP * 0.1), run_time=0.35)
        self.au_mot("Ranger")
        self.play(Create(lignes[1][0]), FadeIn(b1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("n factorielle", n=2)
        self.play(FadeIn(b2, scale=1.2), run_time=0.35)
        self.au_mot("L'ordre ne compte")
        self.play(Create(lignes[2][0]), FadeIn(c1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("k parmi")
        self.play(FadeIn(c2, scale=1.3), run_time=0.35)
        self.au_mot("le nombre précédent")
        self.play(FadeIn(c3, shift=RIGHT * 0.2), run_time=0.45)
        self.attendre_voix(marge=0.8)

    # ── 13 : la fin (identique aux modèles) ────────────────────────────────

    def page_abonnement(self, voix="13-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK, audit=False).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_titre()
        self.ecran_metier()
        self.ecran_podium()
        self.ecran_formule()
        self.ecran_permutations()
        self.ecran_question1()
        self.ecran_groupe()
        self.ecran_combinaison()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_question3()
        self.ecran_appris()
        self.page_abonnement()


class DenombrementArrangementCombinaisonTerminale(DenombrementArrangementCombinaisonBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
