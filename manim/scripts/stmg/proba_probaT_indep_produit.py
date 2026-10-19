# proba_probaT_indep_produit.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# DEUX ÉVÉNEMENTS INDÉPENDANTS, la règle du produit P(A ∩ B) = P(A) × P(B)
# (micros : probaT_indep_produit en STMG, alea_indep_produit en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_probaT_indep_produit_short.py
# (ceinture jaune, deux réveils : 0,9 × 0,9 = 0,81 puis 0,1 × 0,1 = 0,01).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaIndepProduitBase porte toutes les scènes ; les deux
# sous-classes ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ Les deux banques n'ont pas de canvas pour cette micro (énoncé seul) : la
# figure est l'ARBRE PONDÉRÉ du coach repris de proba_probaT_chemin.py (carte
# blanche, branches grises, probabilités en bleu, chemin allumé en orange).
# Les DEUX branches vers V portent 0,4 : elles s'encadrent ensemble
# (« identiques »). ⛔ PAS D'ÉCART : S → V barre reste sans nombre ; S barre →
# V barre ne reçoit 0,6 qu'à la correction, quand la voix le dit.
#
# Écrans : 00 garde · 01 la maison (panneaux solaires + éolienne ; soleil 0,7,
# vent 0,4, indépendants) · 02 l'arbre (0,7 ; 0,3 ; 0,4 après S comme après
# S barre) · 03 le chemin S → V : 0,7 × 0,4 = 0,28 et P(S ∩ V) = P(S) × P(V)
# · 04 pourquoi : P_S(V) = P(V) · 05 le piège : QUE si indépendants, sinon
# P_A(B) sur la branche · 06 défi (ni soleil ni vent) · 06b correction
# (S barre → V barre : 0,3 × 0,6 = 0,18) · 07 ce que tu as appris · 08 fin
# (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! @eleveai974 »).
#
# Voix : manim/voix/stmg-premiere-proba-indep-produit.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_indep_produit.py ProbaIndepProduitSTMG -o eleveai-maths-stmg-proba-indep-produit --media_dir manim/scripts/stmg/media-probaT_indep_produit
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_indep_produit.py ProbaIndepProduitPremiere -o eleveai-maths-premiere-commun-proba-indep-produit --media_dir manim/scripts/stmg/media-probaT_indep_produit
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_indep_produit_short.py ShortProbaIndepProduitSTMG -o eleveai-maths-stmg-proba-indep-produit-short --media_dir manim/scripts/stmg/media-probaT_indep_produit
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_indep_produit_short.py ShortProbaIndepProduitPremiere -o eleveai-maths-premiere-commun-proba-indep-produit-short --media_dir manim/scripts/stmg/media-probaT_indep_produit
# Puis copier dans manim/sorties/stmg/maths/probabilites/14-indep-produit/ et
# manim/sorties/premiere-commun/maths/probabilites/14-indep-produit/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import CHEMIN, PROBA, lettre, p_cond, pastille, suite  # noqa: E402
from proba_probaT_chemin import ArbrePR, carte_lettre  # noqa: E402

SOLEIL = "#FACC15"      # le soleil
VENT = "#7DD3FC"        # le vent
PANNEAU = "#1E3A8A"     # les panneaux solaires
MUR = "#E2E8F0"
TOIT = "#B45309"
BLEU_CLAIR = "#60A5FA"  # les probabilités recopiées dans un calcul
ANNEAU_J = "#EAB308"    # le cadre jaune des deux branches identiques


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : soleil, vent, maison, éolienne ────────────────────────────

def soleil(r=0.45):
    disque = Circle(radius=r, fill_color=SOLEIL, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(np.cos(a) * r * 1.3, np.sin(a) * r * 1.3), P(np.cos(a) * r * 1.75, np.sin(a) * r * 1.75),
                           color=SOLEIL, stroke_width=5) for a in np.arange(0, TAU, TAU / 10)])
    return VGroup(disque, rayons)


def souffle(long=1.6, amp=0.1, couleur=VENT):
    """Une ligne de vent : une vague qui finit en boucle."""
    vague = ParametricFunction(lambda t: P(t, amp * np.sin(2 * PI * t / (long / 1.5))), t_range=[0, long],
                               color=couleur, stroke_width=4)
    boucle = Arc(radius=0.14, start_angle=-PI / 2, angle=1.6 * PI, color=couleur, stroke_width=4)
    boucle.move_to(vague.get_end() + P(0.06, 0.12))
    return VGroup(vague, boucle)


def vent(couleur=VENT):
    g = VGroup(souffle(1.6), souffle(1.2), souffle(1.8))
    g[0].move_to(P(0, 0.35))
    g[1].move_to(P(0.3, 0))
    g[2].move_to(P(-0.1, -0.35))
    return g


def eolienne(h=1.5, pale=0.55):
    """Mât, nacelle et trois pales ; les pales (indice 2) tournent autour du moyeu."""
    mat = Line(P(0, 0), P(0, h), color=WHITE, stroke_width=5)
    moyeu = Dot(P(0, h), radius=0.07, color=WHITE)
    pales = VGroup(*[Polygon(P(0, h), P(0.07, h + pale * 0.35), P(0, h + pale), P(-0.05, h + pale * 0.35),
                             fill_color=WHITE, fill_opacity=1, stroke_width=0).rotate(a, about_point=P(0, h))
                     for a in (0, TAU / 3, 2 * TAU / 3)])
    return VGroup(mat, moyeu, pales)


def maison(s=1.0):
    """Murs, porte, fenêtre, toit ; panneaux solaires posés sur le pan de droite."""
    murs = Rectangle(width=2.2, height=1.4, fill_color=MUR, fill_opacity=1, stroke_width=0).move_to(P(0, 0.7))
    porte = Rectangle(width=0.4, height=0.7, fill_color=TOIT, fill_opacity=1, stroke_width=0).move_to(P(-0.5, 0.35))
    fen = Square(0.45, fill_color=VENT, fill_opacity=0.8, stroke_color=WHITE, stroke_width=2).move_to(P(0.5, 0.8))
    toit = Polygon(P(-1.3, 1.4), P(1.3, 1.4), P(0, 2.3), fill_color=TOIT, fill_opacity=1, stroke_width=0)
    # deux panneaux couchés le long du pan droit du toit
    sommet, coin = P(0, 2.3), P(1.3, 1.4)
    d = (coin - sommet) / np.linalg.norm(coin - sommet)
    dedans = np.array([-d[1], d[0], 0.0])
    if dedans[1] > 0:
        dedans = -dedans
    panneaux = VGroup()
    for k in range(2):
        a = sommet + d * (0.25 + 0.6 * k) + dedans * 0.06
        b = a + d * 0.52
        h = dedans * 0.3
        pan = Polygon(a, b, b + h, a + h, fill_color=PANNEAU, fill_opacity=1, stroke_color="#93C5FD",
                      stroke_width=1.5)
        ligne = Line((a + b) / 2, (a + b) / 2 + h, color="#93C5FD", stroke_width=1)
        panneaux.add(VGroup(pan, ligne))
    return VGroup(murs, porte, fen, toit, panneaux).scale(s)


class ProbaIndepProduitBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-indep-produit"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=5.6):
        """Borne la largeur d'un bloc de droite : il ne mord ni sur la carte ni hors cadre."""
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def arbre(self, centre=P(-3.55, -0.3), echelle=1.0, nombres=((0, "0,7"), (1, "0,3"), (2, "0,4"), (4, "0,4"))):
        """L'arbre S / S barre puis V / V barre, avec les nombres DITS (0,7 ; 0,3 ; 0,4 deux fois)."""
        a = ArbrePR(a="S", b="V").scale(echelle).move_to(centre)
        for k, v in nombres:
            a.nombre(k, v, fs=int(26 * echelle))
        return a

    def calcul(self, morceaux, fs=60, centre=P(3.15, 1.2)):
        """Une ligne de calcul : liste de (texte, couleur)."""
        return self.caser(suite(*[self.t(tx, fs, c) for tx, c in morceaux], buff=0.25)).move_to(centre)

    def formule(self, fs=40, a="S", b="V"):
        """P(A ∩ B) = P(A) × P(B), en Text."""
        return suite(self.t(f"P({a} ∩ {b})", fs, JAUNE_TITRE), self.t("=", fs), self.t(f"P({a})", fs, BLEU_CLAIR),
                     self.t("×", fs, CHEMIN), self.t(f"P({b})", fs, BLEU_CLAIR), buff=0.2)

    def decor(self, centre=P(-3.4, -1.9), s=1.0, avec_eolienne=True):
        """La maison, son éolienne à droite ; renvoie (maison, éolienne)."""
        m = maison(s).move_to(centre)
        e = eolienne(1.6 * s, 0.6 * s)
        e.shift(P(m.get_right()[0] + 0.55 * s, m.get_bottom()[1]) - e[0].get_start())
        return m, e

    def tourner(self, e, vitesse=1.5):
        """Les pales tournent en continu autour du moyeu."""
        e[2].add_updater(lambda mob, dt: mob.rotate(-vitesse * dt, about_point=e[1].get_center()))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Indépendants : la règle du produit", 48, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        m, e = self.decor(P(-3.9, -0.55), 0.85)
        so = soleil(0.38).move_to(P(-5.6, 0.95))
        ve = vent().scale(0.6).move_to(P(-1.6, 0.85))
        self.tourner(e, 2.0)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(m), FadeIn(e), run_time=1.0)
        self.au_mot("indépendants")
        self.play(FadeIn(so, scale=0.5), FadeIn(ve, shift=RIGHT * 0.3), run_time=0.6)
        self.au_mot("produit")
        fois = self.t("×", 120, CHEMIN).move_to(P(2.6, -0.2))
        self.play(FadeIn(fois, scale=2.5), run_time=0.5)
        self.insister(fois, 0.3)
        self.attendre_voix(marge=1.0)
        e[2].clear_updaters()

    # ── 01 : la maison : soleil 0,7, vent 0,4, indépendants ─────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La maison qui produit son électricité")
        m, e = self.decor(P(-3.9, -1.25), 1.15)
        self.au_mot("Une maison")
        self.play(FadeIn(m, shift=UP * 0.3), run_time=0.7)
        self.au_mot("panneaux solaires")
        self.play(Indicate(m[4], color=SOLEIL, scale_factor=1.25), run_time=0.8)
        self.au_mot("petite éolienne")
        self.play(GrowFromEdge(e, DOWN), run_time=0.7)
        self.tourner(e, 0.6)
        x0 = 0.4
        self.au_mot("il fait soleil")
        so = soleil(0.42).move_to(P(-5.7, 1.75))
        self.play(FadeIn(so, scale=0.4), Rotate(so[1], PI / 5), run_time=0.8)
        self.au_mot("0,7")
        l1 = suite(soleil(0.16), self.t("Soleil :", 40, SOLEIL), self.t("0,7", 54, BLEU_CLAIR), buff=0.25)
        l1.move_to(P(x0, 1.4), aligned_edge=LEFT)
        self.play(FadeIn(l1[:2], shift=LEFT * 0.2), FadeIn(l1[2], scale=1.8), run_time=0.6)
        self.insister(l1[2], 0.25)
        self.au_mot("Le vent souffle")
        ve = vent().move_to(P(-1.0, 0.9))
        e[2].clear_updaters()
        self.tourner(e, 3.0)
        self.play(FadeIn(ve, shift=RIGHT * 0.6), run_time=0.8)
        self.au_mot("0,4")
        l2 = suite(vent().scale(0.25), self.t("Vent :", 40, VENT), self.t("0,4", 54, BLEU_CLAIR), buff=0.25)
        l2.move_to(P(x0, 0.2), aligned_edge=LEFT)
        self.play(FadeIn(l2[:2], shift=LEFT * 0.2), FadeIn(l2[2], scale=1.8), run_time=0.6)
        self.insister(l2[2], 0.25)
        self.au_mot("On admet")
        l3a = self.t("Soleil et vent :", 38).move_to(P(x0, -1.05), aligned_edge=LEFT)
        l3b = self.t("indépendants", 48, CHEMIN).next_to(l3a, DOWN, buff=0.2, aligned_edge=LEFT)
        self.play(FadeIn(l3a, shift=UP * 0.1), run_time=0.5)
        self.au_mot("indépendants")
        self.play(FadeIn(l3b, scale=1.4), run_time=0.5)
        self.insister(l3b, 0.3)
        self.attendre_voix()
        e[2].clear_updaters()

    # ── 02 : l'arbre, branche par branche ; 0,4 après S comme après S barre ──

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arbre")
        self.titre_ecran("L'arbre pondéré")
        a = self.arbre()
        self.add(a.socle())
        for k in a.nombres:
            a.remove(a.nombres[k])
        cS = carte_lettre("S", "soleil", 28)
        cS.move_to(P(-0.3 + cS.width / 2, 1.5))
        cV = carte_lettre("V", "vent", 28)
        cV.move_to(P(-0.3 + cV.width / 2, 0.45))
        self.au_mot("S, soleil")
        self.play(a.construire(0))
        self.play(FadeIn(cS, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,7")
        self.play(FadeIn(a.nombres[0], scale=1.6), run_time=0.4)
        self.au_mot("S barre")
        self.play(a.construire(1))
        self.au_mot("0,3")
        self.play(FadeIn(a.nombres[1], scale=1.6), run_time=0.4)
        self.au_mot("Puis V")
        self.play(a.construire(2), a.construire(3), a.construire(4), a.construire(5))
        self.au_mot("le vent")
        self.play(FadeIn(cV, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("Comme S et V")
        ind = suite(lettre("S", 34), self.t("et", 32), lettre("V", 34), self.t(":", 32),
                    self.t("indépendants", 38, CHEMIN), buff=0.16)
        ind.move_to(P(-0.3 + ind.width / 2, -0.65))
        self.play(FadeIn(ind, shift=UP * 0.1), run_time=0.6)
        self.au_mot("vaut 0,4")
        self.play(FadeIn(a.nombres[2], scale=1.8), FadeIn(a.nombres[4], scale=1.8), run_time=0.5)
        self.au_mot("après S comme")
        self.play(Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.5), Indicate(a.nombres[2], color=CHEMIN),
                  run_time=0.6)
        self.au_mot("après S barre")
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.5), Indicate(a.nombres[4], color=CHEMIN),
                  run_time=0.6)
        cad = VGroup(*[SurroundingRectangle(a.nombres[k], color=ANNEAU_J, buff=0.08, stroke_width=4) for k in (2, 4)])
        ident = self.t("identiques", 40, ANNEAU_J).next_to(ind, DOWN, buff=0.4, aligned_edge=LEFT)
        cad_i = SurroundingRectangle(ident, color=ANNEAU_J, buff=0.12, stroke_width=4)
        self.play(Create(cad), FadeIn(ident, shift=UP * 0.1), Create(cad_i), run_time=0.7)
        paires = [VGroup(a.nombres[k], c) for k, c in zip((2, 4), cad)]
        self.play(*[g.animate.scale(1.5) for g in paires], run_time=0.3)
        self.play(*[g.animate.scale(1 / 1.5) for g in paires], run_time=0.3)
        self.attendre_voix()

    # ── 03 : soleil ET vent = le chemin S → V ; 0,7 × 0,4 = 0,28 ; la formule ─

    def ecran_produit(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-produit")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Soleil ET vent")
        self.au_mot("le chemin S")
        mob = Dot(a.depart.get_center(), radius=0.12, color=CHEMIN)
        self.add(mob)
        self.play(*a.etat([0]), MoveAlongPath(mob, a.branches[0].copy()), run_time=0.8)
        self.au_mot("puis V")
        self.play(*a.etat([0, 2]), MoveAlongPath(mob, a.branches[2].copy()), run_time=0.8)
        self.play(FadeOut(mob), Indicate(a.lab[2], color=CHEMIN, scale_factor=1.6), run_time=0.5)
        k = [self.t(x, 60, c) for x, c in (("0,7", BLEU_CLAIR), ("×", WHITE), ("0,4", BLEU_CLAIR), ("=", WHITE),
                                            ("0,28", JAUNE_TITRE))]
        calc = self.caser(suite(*k, buff=0.25)).move_to(P(3.15, 1.75))
        self.au_mot("0,7 fois")
        self.play(TransformFromCopy(a.nombres[0], k[0]), Indicate(a.nombres[0], color=CHEMIN), run_time=0.6)
        self.play(FadeIn(k[1], scale=1.6), run_time=0.3)
        self.au_mot("0,4, égale")
        self.play(TransformFromCopy(a.nombres[2], k[2]), Indicate(a.nombres[2], color=CHEMIN), run_time=0.6)
        self.au_mot("égale 0,28")
        self.play(FadeIn(k[3]), FadeIn(k[4], scale=1.8), run_time=0.5)
        self.insister(k[4], 0.3)
        bout = pastille("0,28", 26).next_to(a.lab[2], RIGHT, buff=0.2)
        self.play(TransformFromCopy(k[4], bout), run_time=0.6)
        self.au_mot("Pour deux")
        si = suite(self.t("Si", 34), self.t("indépendants", 36, CHEMIN), self.t(":", 34), buff=0.15)
        si.move_to(P(3.15, 0.3))
        self.play(FadeIn(si, shift=UP * 0.1), run_time=0.5)
        f = self.caser(self.formule(42)).move_to(P(3.15, -0.75))
        self.au_mot("P de S inter V")
        self.play(FadeIn(f[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("égale P de S")
        self.play(FadeIn(f[1]), FadeIn(f[2], shift=UP * 0.1), run_time=0.5)
        self.au_mot("fois P de V")
        self.play(FadeIn(f[3], scale=1.8), FadeIn(f[4], shift=UP * 0.1), run_time=0.5)
        cad = SurroundingRectangle(f, color=JAUNE_TITRE, buff=0.2, stroke_width=4)
        self.play(Create(cad), run_time=0.5)
        self.insister(f[3], 0.3)
        self.attendre_voix()

    # ── 04 : pourquoi : P_S(V) = P(V) ───────────────────────────────────────

    def ecran_pourquoi(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-pourquoi")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Pourquoi ?")
        x0 = 0.4
        self.au_mot("Indépendants, ça")
        l1 = self.t("Indépendants :", 38, CHEMIN).move_to(P(x0, 1.8), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("P indice S de V")
        pc = p_cond("S", "V", 54, WHITE)
        eg = suite(pc, self.t("=", 54), self.t("P(V)", 54, BLEU_CLAIR), self.t("=", 54), self.t("0,4", 54, BLEU_CLAIR),
                   buff=0.22)
        self.caser(eg, 5.8).move_to(P(x0, 0.75), aligned_edge=LEFT)
        self.play(FadeIn(pc, shift=UP * 0.1), *a.etat([2]), run_time=0.6)
        self.au_mot("égale P de V")
        self.play(FadeIn(eg[1]), FadeIn(eg[2], scale=1.4), run_time=0.5)
        self.insister(eg[1], 0.25)
        self.au_mot("Sur la branche")
        self.play(*a.etat([0, 2]), run_time=0.5)
        self.au_mot("0,4, la")
        self.play(TransformFromCopy(a.nombres[2], eg[4]), FadeIn(eg[3]), Indicate(a.nombres[2], color=CHEMIN),
                  run_time=0.7)
        self.au_mot("la probabilité simple")
        simple = self.t("la probabilité simple", 34, BLEU_CLAIR).next_to(eg, DOWN, buff=0.3, aligned_edge=LEFT)
        self.play(FadeIn(simple, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Et un chemin")
        ch = VGroup(self.t("Un chemin :", 36), self.t("le produit de ses branches", 36, VERT_OK))
        self.caser(ch.arrange(DOWN, buff=0.15, aligned_edge=LEFT)).move_to(P(x0, -1.55), aligned_edge=LEFT)
        self.play(FadeIn(ch[0], shift=UP * 0.1), *[Indicate(a.branches[i], color=CHEMIN, scale_factor=1.05)
                                                   for i in (0, 2)], run_time=0.6)
        self.au_mot("le produit")
        self.play(FadeIn(ch[1], scale=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : le piège : la règle QUE si indépendants ; sinon P_A(B) ─────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège : appliquer sans vérifier")
        f = self.formule(44, "A", "B").move_to(P(-0.6, 2.05))
        self.play(FadeIn(f, shift=DOWN * 0.15), run_time=0.6)
        self.au_mot("QUE pour")
        que = suite(self.t("QUE si", 52, ORANGE_RETENUE), self.t("indépendants !", 52, CHEMIN), buff=0.25)
        que.move_to(P(-0.6, 1.0))
        self.play(FadeIn(que, scale=1.5), run_time=0.5)
        self.insister(que, 0.3)
        self.au_mot("Sinon")
        a = ArbrePR(a="A", b="B").scale(0.72).move_to(P(-3.7, -1.55))
        self.play(FadeIn(a), run_time=0.6)
        x0 = -0.6
        sinon = self.t("Sinon, sur la branche :", 36).move_to(P(x0, -0.3), aligned_edge=LEFT)
        self.play(FadeIn(sinon, shift=UP * 0.1), *a.etat([0, 2]), run_time=0.6)
        self.au_mot("P indice A de B")
        bon = p_cond("A", "B", 54, VERT_OK).move_to(P(x0, -1.3), aligned_edge=LEFT)
        ok = self.coche(taille=0.3).next_to(bon, RIGHT, buff=0.3)
        u, v = a.branches[2].get_start(), a.branches[2].get_end()
        sur = p_cond("A", "B", 22, PROBA).move_to((u + v) / 2 + P(-0.25, 0.3))
        sur_fond = BackgroundRectangle(sur, color=WHITE, fill_opacity=1, buff=0.03)
        self.play(FadeIn(bon, scale=1.4), run_time=0.5)
        self.play(TransformFromCopy(bon, sur), FadeIn(sur_fond), Create(ok), run_time=0.7)
        self.add(sur)
        self.au_mot("pas P de B")
        pas = suite(self.t("pas", 40, ROUGE_ERREUR), self.t("P(B)", 54, ROUGE_ERREUR), buff=0.25)
        pas.next_to(ok, RIGHT, buff=0.5)
        barre = Line(pas[1].get_corner(DL) + P(-0.08, -0.05), pas[1].get_corner(UR) + P(0.08, 0.05),
                     color=ROUGE_ERREUR, stroke_width=7)
        self.play(FadeIn(pas, shift=LEFT * 0.15), run_time=0.4)
        self.play(Create(barre), run_time=0.4)
        self.attendre_voix()

    # ── 06 : défi : ni soleil ni vent ───────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre(P(-3.4, 0.05), 0.95)
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("Quelle est la probabilité")
        q1 = VGroup(self.t("La probabilité", 36), self.t("qu'il n'y ait", 36)).arrange(DOWN, buff=0.1)
        q2 = VGroup(self.t("ni soleil", 44, SOLEIL), self.t("ni vent ?", 44, VENT)).arrange(DOWN, buff=0.15)
        q = self.caser(VGroup(q1, q2).arrange(DOWN, buff=0.35), 5.4).move_to(P(3.0, 1.0))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("ni soleil")
        self.play(FadeIn(q2[0], shift=UP * 0.15), Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.6), run_time=0.6)
        self.au_mot("ni vent")
        self.play(FadeIn(q2[1], shift=UP * 0.15), Indicate(a.lab[5], color=CHEMIN, scale_factor=1.6), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Correction")
        self.au_mot("S barre")
        self.play(*a.etat([1]), run_time=0.6)
        self.au_mot("0,3.")
        self.play(Indicate(a.nombres[1], color=CHEMIN, scale_factor=1.6), run_time=0.5)
        self.au_mot("V barre")
        self.play(*a.etat([1, 5]), run_time=0.6)
        self.play(Indicate(a.lab[5], color=CHEMIN, scale_factor=1.6), run_time=0.4)
        k1 = [self.t(x, 50, c) for x, c in (("1", WHITE), ("−", WHITE), ("0,4", BLEU_CLAIR), ("=", WHITE),
                                             ("0,6", BLEU_CLAIR))]
        c1 = suite(*k1, buff=0.22).move_to(P(3.15, 2.0))
        self.au_mot("1 moins")
        self.play(FadeIn(k1[0]), FadeIn(k1[1]), run_time=0.4)
        self.au_mot("0,4, égale")
        self.play(TransformFromCopy(a.nombres[4], k1[2]), run_time=0.5)
        self.au_mot("égale 0,6")
        self.play(FadeIn(k1[3]), FadeIn(k1[4], scale=1.8), run_time=0.4)
        n6 = a.nombre(5, "0,6")
        a.remove(n6)
        n6.set_color(PROBA)
        self.play(TransformFromCopy(k1[4], n6), run_time=0.6)
        self.au_mot("aussi indépendants")
        ind = self.t("aussi indépendants", 36, CHEMIN).move_to(P(3.15, 1.0))
        self.play(FadeIn(ind, shift=UP * 0.1), run_time=0.5)
        k = [self.t(x, 60, c) for x, c in (("0,3", BLEU_CLAIR), ("×", WHITE), ("0,6", BLEU_CLAIR), ("=", WHITE),
                                            ("0,18", JAUNE_TITRE))]
        calc = self.caser(suite(*k, buff=0.25)).move_to(P(3.15, -0.05))
        self.au_mot("0,3 fois")
        self.play(TransformFromCopy(a.nombres[1], k[0]), run_time=0.6)
        self.play(FadeIn(k[1], scale=1.8), run_time=0.3)
        self.au_mot("0,6, égale")
        self.play(TransformFromCopy(n6, k[2]), run_time=0.6)
        self.au_mot("égale 0,18")
        self.play(FadeIn(k[3]), FadeIn(k[4], scale=1.8), run_time=0.5)
        self.insister(k[4], 0.3)
        bout = pastille("0,18", 26).next_to(a.lab[5], RIGHT, buff=0.2)
        self.play(TransformFromCopy(k[4], bout), run_time=0.6)
        ok = self.coche(taille=0.32).next_to(calc, DOWN, buff=0.3)
        self.play(Create(ok), run_time=0.3)
        self.au_mot("Ce jour-là")
        m, e = self.decor(P(1.0, -2.4), 0.55)
        VGroup(m, e).set_opacity(0.45)
        rien = self.t("presque rien", 32, ORANGE_RETENUE).next_to(VGroup(m, e), RIGHT, buff=0.3)
        self.play(FadeIn(VGroup(m, e), shift=UP * 0.2), run_time=0.6)
        self.play(FadeIn(rien, scale=1.3), run_time=0.5)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 34
        l1 = suite(self.t("A et B indépendants :", fs), self.formule(fs, "A", "B"), buff=0.2)
        l2 = suite(self.t("Sur l'arbre : la même branche après", fs), lettre("A", fs, VERT_OK),
                   self.t("et après", fs), lettre("A", fs, VERT_OK, True), buff=0.15)
        l3 = suite(self.t("La règle :", fs), self.t("seulement si indépendants", fs, ORANGE_RETENUE), buff=0.15)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.4, 0.6))
        for mot, l in zip(["Si A et B", "Sur l'arbre", "Et la règle"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        self.play(Write(self.chute("Prochaine vidéo : prouver que deux événements sont indépendants, ou pas",
                                   color=VERT_OK, font_size=30)))
        self.attendre_voix(marge=1.0)

    # ── 08 : l'écran de fin (règle du 19/10) ────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        self.au_mot("Entraîne-toi")
        entraine = self.t("Entraîne-toi sur", 50, JAUNE_TITRE).move_to(P(0, 2.05))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 0.95))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        abonne = self.t("Abonne-toi !", 50, VERT_OK).move_to(P(0, -0.65))
        poignee = self.t("@eleveai974", 46, VERT_OK).move_to(P(0, -1.6))
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.5)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_arbre()
        self.ecran_produit()
        self.ecran_pourquoi()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaIndepProduitSTMG(ProbaIndepProduitBase):
    identite = "Maths STMG — EleveAI"


class ProbaIndepProduitPremiere(ProbaIndepProduitBase):
    identite = "Maths 1re — EleveAI"
