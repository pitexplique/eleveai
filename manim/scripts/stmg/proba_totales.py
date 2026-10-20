# proba_totales.py
# EleveAI — Maths STMG (micro probaT_probabilites_totales, notion
# proba_arbre_calcul) ET Maths 1re spé (micro pc_totales, notion
# probabilites_conditionnelles) — série « Probabilités » :
# LA FORMULE DES PROBABILITÉS TOTALES, AVEC VOIX. Paysage 16:9.
#
# ⭐⭐ UNE voix, UN script, DEUX rendus : ProbaTotalesBase porte toutes les
# scènes ; les sous-classes ne changent que l'identité et la ceinture
# (STMG BLEUE, 1re spé MARRON). La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE PONDÉRÉ du coach (`canvasArbre` / `arbre(...)` des
# deux banques : carte blanche, branches grises, probabilités en bleu au milieu
# des branches, nœud étiqueté au-dessus, feuille à droite), repris de
# proba_probaT_somme_chemins.py et étendu à TROIS branches (A, B, C) puis
# D / D barre. Il se construit branche par branche quand la voix dit le
# nombre ; les trois chemins vers D s'allument, leurs produits s'écrivent au
# bout puis se somment.
# ⛔ PAS D'ÉCART : les branches vers D barre restent SANS nombre (la voix ne
# dit jamais 0,98, 0,96, 0,95).
#
# Écrans : 00 garde · 01 les trois fournisseurs (50 / 30 / 20 %, défauts
# 2 / 4 / 5 %) · 02 la partition · 03 l'arbre · 04 la formule, les trois
# chemins · 05 le calcul : 0,032 = 3,2 % · 06 le piège de la moyenne (≈ 3,7 %)
# · 07 défi (pas de défaut) · 07b correction : 1 − 0,032 = 0,968 · 08 ce que
# tu as appris · 09 fin (« Entraîne-toi sur eleveai.fr » + abonnement).
#
# Voix : manim/voix/stmg-premiere-proba-totales.json (débit −7).
# Rendus (media à soi) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_totales.py ProbaTotalesSTMG -o eleveai-maths-stmg-proba-totales --media_dir manim/scripts/stmg/media-probaT_totales
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_totales.py ProbaTotalesPremiereSpe -o eleveai-maths-premiere-proba-totales --media_dir manim/scripts/stmg/media-probaT_totales
# Sorties : manim/sorties/stmg/maths/probabilites/28-probabilites-totales/ et
# manim/sorties/premiere/maths/probabilites/28-probabilites-totales/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import (  # noqa: E402
    BORD, BRANCHE, CHEMIN, ENCRE, PROBA, lettre, p_cond, pastille, suite,
)

CELLULE = "#1E3A8A"     # les cellules du panneau solaire
GRILLE = "#93C5FD"
CADRE_P = "#CBD5E1"
COUL_F = {"A": "#22C55E", "B": "#38BDF8", "C": "#F59E0B"}   # les trois fournisseurs


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : panneau solaire, usine ────────────────────────────────────

def panneau(s=1.0, defaut=False):
    """Un panneau solaire (3 × 2 cellules) ; défectueux : une fissure rouge."""
    corps = Rectangle(width=0.9, height=0.6, fill_color=CELLULE, fill_opacity=1, stroke_color=CADRE_P,
                      stroke_width=2.5)
    lignes = VGroup(Line(P(-0.45, 0), P(0.45, 0), color=GRILLE, stroke_width=1.5),
                    Line(P(-0.15, -0.3), P(-0.15, 0.3), color=GRILLE, stroke_width=1.5),
                    Line(P(0.15, -0.3), P(0.15, 0.3), color=GRILLE, stroke_width=1.5))
    g = VGroup(corps, lignes)
    if defaut:
        f = VMobject(stroke_color=ROUGE_ERREUR, stroke_width=4)
        f.set_points_as_corners([P(-0.3, 0.3), P(-0.1, 0.05), P(0.05, 0.15), P(0.3, -0.3)])
        g.add(f)
    return g.scale(s)


def usine(lt, couleur, s=1.0):
    """Une usine (fournisseur) : murs, toit en dents de scie, cheminée, sa lettre."""
    murs = Rectangle(width=1.6, height=0.9, fill_color="#334155", fill_opacity=1, stroke_color=WHITE,
                     stroke_width=2)
    dents = VGroup(*[Polygon(P(-0.8 + 0.4 * k, 0.45), P(-0.4 + 0.4 * k, 0.45), P(-0.4 + 0.4 * k, 0.8),
                             fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                     for k in range(4)])
    chem = Rectangle(width=0.18, height=0.55, fill_color="#475569", fill_opacity=1, stroke_color=WHITE,
                     stroke_width=2).move_to(P(0.6, 0.95))
    nom = Text(lt, font_size=40, color=WHITE, weight=BOLD).move_to(P(0, -0.02))
    return VGroup(chem, murs, dents, nom).scale(s)


# ── l'ARBRE PONDÉRÉ du coach, à trois branches ──────────────────────────────

class Arbre3(VGroup):
    """Carte blanche du coach : départ → A / B / C, puis D / D barre.
    Branches : 0, 1, 2 = départ → A, B, C ; 3 + 2i = i → D ; 4 + 2i = i → D̄.
    Étiquettes `lab` dans le même ordre."""

    def __init__(self, dx=2.0, dy1=1.55, dy2=0.42, fs=30, marge_droite=0.0, **kw):
        super().__init__(**kw)
        racine = P(0, 0)
        noeuds = [P(dx, dy1), P(dx, 0), P(dx, -dy1)]
        bouts, self.feuilles = [(racine, n) for n in noeuds], []
        for n in noeuds:
            for sg in (1, -1):
                f = n + P(dx, sg * dy2)
                self.feuilles.append(f)
                bouts.append((n, f))
        self.branches = [Line(a, b, color=BRANCHE, stroke_width=4) for a, b in bouts]
        self.depart = Dot(racine, radius=0.07, color=ENCRE)
        self.lab = []
        for k, lt in enumerate("ABC"):
            m = lettre(lt, fs, ENCRE).next_to(noeuds[k], UP, buff=0.08)
            fond = BackgroundRectangle(m, color=WHITE, fill_opacity=1, buff=0.05)
            self.lab.append(VGroup(fond, m))
        for k, f in enumerate(self.feuilles):
            self.lab.append(lettre("D", fs, ENCRE, k % 2 == 1).next_to(f, RIGHT, buff=0.12))
        tout = VGroup(self.depart, *self.branches, *self.lab)
        self.carte = RoundedRectangle(width=tout.width + 1.3 + marge_droite, height=tout.height + 1.1,
                                      corner_radius=0.2, fill_color=WHITE, fill_opacity=1, stroke_color=BORD,
                                      stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.28 + RIGHT * marge_droite / 2)
        self.titre = Text("Arbre pondéré", font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.12)
        self.nombres = {}
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.lab)

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    def construire(self, k, run_time=0.6):
        return Succession(Create(self.branches[k], run_time=run_time * 0.6),
                          FadeIn(self.lab[k], scale=1.4, run_time=run_time * 0.4))

    def nombre(self, k, texte, fs=24, buff=0.07, dessous=False):
        """Le nombre de la branche k, en bleu, contre le trait."""
        t = Text(texte, font_size=fs, color=PROBA, weight=BOLD)
        a, b = self.branches[k].get_start(), self.branches[k].get_end()
        d = b - a
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if (n[1] < 0) != dessous:
            n = -n
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.move_to((a + b) / 2 + n * (demi + buff))
        self.nombres[k] = t
        self.add(t)
        return t

    def etat(self, ks=None, op=0.18):
        """Allume les branches ks (orange épais) et estompe le reste ; ks=None : tout normal."""
        anims = []
        for k, br in enumerate(self.branches):
            if ks is None:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif k in ks:
                anims.append(br.animate.set_stroke(CHEMIN, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
            if k in self.nombres:
                on = ks is None or k in ks
                anims.append(self.nombres[k].animate.set_opacity(1 if on else op))
        for k, m in enumerate(self.lab):
            if ks is None:
                on = True
            elif k < 3:
                on = k in ks or any(j in ks for j in (3 + 2 * k, 4 + 2 * k))
            else:
                on = k in ks
            cible = m[1] if k < 3 else m
            anims.append(cible.animate.set_opacity(1 if on else op))
        return anims


class ProbaTotalesBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que identité et ceinture."""

    nom_voix = "stmg-premiere-proba-totales"
    identite = "Maths — EleveAI"
    ceinture = "bleue"
    POS = dict(centre=P(-3.55, -0.35), echelle=0.85, marge_droite=2.0)
    XD = 0.15   # le bord gauche de la colonne de droite, à côté de la carte

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def calcul(self, morceaux, fs=46, buff=0.18):
        """Une ligne de calcul ; morceaux = [(texte, couleur), …]."""
        return suite(*[self.t(x, fs, c) for x, c in morceaux], buff=buff)

    def arbre(self, centre=P(-3.75, -0.4), echelle=1.0, nombres=True, marge_droite=0.0):
        """L'arbre de la vidéo : branches, lettres et les SIX nombres dits."""
        a = Arbre3(marge_droite=marge_droite).scale(echelle).move_to(centre)
        if nombres:
            fs = 24 if echelle >= 1 else int(24 * echelle + 2)
            for k, v in ((0, "0,5"), (1, "0,3"), (3, "0,02"), (5, "0,04"), (7, "0,05")):
                a.nombre(k, v, fs=fs)
            a.nombre(2, "0,2", fs=fs, dessous=True)
        return a

    def bout(self, a, i, texte, fs=22):
        """Une pastille au bout de la feuille D du chemin i (0 = A, 1 = B, 2 = C)."""
        return pastille(texte, fs).next_to(a.lab[3 + 2 * i], RIGHT, buff=0.15)

    @staticmethod
    def chemin(i):
        """Les deux branches du chemin « fournisseur i puis D »."""
        return [i, 3 + 2 * i]

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La formule des probabilités totales", 46, JAUNE_TITRE)
        if titre.width > 12.6:
            titre.scale_to_fit_width(12.6)
        titre.to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.95))
        a = self.arbre(P(-0.6, -0.35), 0.6, nombres=False)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(a), run_time=1.0)
        self.play(*a.etat([0, 3, 1, 5, 2, 7]), run_time=0.7)
        self.attendre_voix(marge=1.2)

    # ── 01 : les trois fournisseurs ─────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Trois fournisseurs de panneaux solaires")
        xs = {"A": -4.3, "B": -0.7, "C": 2.9}
        parts = {"A": ("50 %", 5), "B": ("30 %", 3), "C": ("20 %", 2)}
        defauts = {"A": "2 %", "B": "4 %", "C": "5 %"}
        self.au_mot("panneaux solaires")
        pile = VGroup(*[panneau(1.1) for _ in range(5)]).arrange(RIGHT, buff=0.15).move_to(P(-0.7, 0.6))
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.4) for p in pile], lag_ratio=0.15), run_time=0.9)
        self.au_mot("trois fournisseurs")
        us = {lt: usine(lt, COUL_F[lt]).move_to(P(xs[lt], 1.55)) for lt in "ABC"}
        self.play(FadeOut(pile, shift=DOWN * 0.3), LaggedStart(*[FadeIn(us[lt], shift=UP * 0.2) for lt in "ABC"],
                                                               lag_ratio=0.25), run_time=1.0)
        rangs = {}
        for lt in "ABC":
            txt, n = parts[lt]
            self.au_mot(f"{lt} : {txt}")
            pc = self.t(txt, 50, JAUNE_TITRE).next_to(us[lt], DOWN, buff=0.25)
            rg = VGroup(*[panneau(0.55) for _ in range(n)]).arrange(RIGHT, buff=0.06).next_to(pc, DOWN, buff=0.2)
            rangs[lt] = rg
            self.play(Indicate(us[lt], color=COUL_F[lt], scale_factor=1.08), FadeIn(pc, scale=1.6),
                      LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in rg], lag_ratio=0.12), run_time=0.8)
        self.au_mot("Les taux de défaut")
        lib = self.t("taux de défaut", 32, ROUGE_ERREUR).move_to(P(-0.7, -1.15))
        self.play(FadeIn(lib, shift=UP * 0.2), run_time=0.4)
        for lt in "ABC":
            self.au_mot(f"{defauts[lt]} chez {lt}")
            cass = panneau(0.75, defaut=True)
            d = suite(cass, self.t(defauts[lt], 44, ROUGE_ERREUR), buff=0.2)
            d.move_to(P(xs[lt], -2.0))
            self.play(FadeIn(d[0], scale=0.5), FadeIn(d[1], scale=1.6), run_time=0.5)
            self.play(Wiggle(d[0], scale_value=1.15), run_time=0.5)
        self.attendre_voix()

    # ── 02 : la partition ───────────────────────────────────────────────────

    def ecran_partition(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-partition")
        self.titre_ecran("A, B, C : une partition")
        g, larg, h, y = -5.6, 9.0, 3.0, 0.45
        zones = VGroup()
        x = g
        for lt, part, n in (("A", 0.5, 5), ("B", 0.3, 3), ("C", 0.2, 2)):
            w = larg * part
            r = Rectangle(width=w, height=h, fill_color=COUL_F[lt], fill_opacity=0.22, stroke_color=COUL_F[lt],
                          stroke_width=3).move_to(P(x + w / 2, y))
            nom = self.t(lt, 48, COUL_F[lt]).move_to(r.get_top() + DOWN * 0.45)
            pans = VGroup(*[panneau(0.62) for _ in range(n)])
            pans.arrange_in_grid(rows=(n + 2) // 3 if n > 2 else 1, buff=0.12).move_to(r.get_center() + DOWN * 0.35)
            zones.add(VGroup(r, nom, pans))
            x += w
        self.play(LaggedStart(*[FadeIn(z, shift=UP * 0.2) for z in zones], lag_ratio=0.3), run_time=1.2)
        self.au_mot("une partition")
        mot = self.t("une partition", 40, JAUNE_TITRE).move_to(P(-1.1, -1.65))
        self.play(FadeIn(mot, scale=1.4), run_time=0.5)
        self.au_mot("chaque panneau")
        p = panneau(0.9).move_to(P(5.3, 2.2))
        self.play(FadeIn(p, shift=LEFT * 0.3), run_time=0.4)
        self.au_mot("un seul fournisseur")
        cible = zones[1][0].get_corner(DR) + P(-0.6, 0.45)
        self.play(p.animate.scale(0.7).move_to(cible), run_time=0.8, rate_func=rate_functions.ease_in_out_sine)
        self.play(Indicate(zones[1][0], color=COUL_F["B"], scale_factor=1.04), run_time=0.5)
        un = self.t("un seul fournisseur", 32).move_to(P(-1.1, -2.35))
        self.play(FadeIn(un, shift=UP * 0.1), run_time=0.4)
        self.au_mot("les trois ensemble")
        cadre = Rectangle(width=larg, height=h, stroke_color=JAUNE_TITRE, stroke_width=8).move_to(P(g + larg / 2, y))
        self.play(Create(cadre), run_time=0.7)
        self.au_mot("c'est tout")
        tout = self.t("les trois ensemble : tout", 32, VERT_OK).move_to(P(-1.1, -3.0))
        self.play(FadeIn(tout, shift=UP * 0.1), Indicate(cadre, color=VERT_OK, scale_factor=1.03), run_time=0.6)
        self.attendre_voix()

    # ── 03 : l'arbre, branche par branche ───────────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-arbre")
        self.titre_ecran("L'arbre pondéré")
        a = self.arbre(**self.POS)
        for t in a.nombres.values():
            a.remove(t)
        self.au_mot("L'arbre")
        self.play(FadeIn(a.socle()), run_time=0.5)
        self.au_mot("trois branches")
        self.play(LaggedStart(*[a.construire(k) for k in range(3)], lag_ratio=0.35), run_time=1.2)
        for k, mot in ((0, "0,5,"), (1, "0,3 et"), (2, "0,2.")):
            self.au_mot(mot)
            self.play(FadeIn(a.nombres[k], scale=1.6), Indicate(a.lab[k][1], color=CHEMIN, scale_factor=1.3),
                      run_time=0.45)
        self.au_mot("Puis D")
        self.play(LaggedStart(*[a.construire(k) for k in range(3, 9)], lag_ratio=0.15), run_time=1.4)
        cD = suite(lettre("D", 34, ROUGE_ERREUR), self.t(": défaut", 32), buff=0.15)
        cDb = suite(lettre("D", 34, VERT_OK, barre=True), self.t(": pas de défaut", 32), buff=0.15)
        leg = VGroup(cD, cDb).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        leg.move_to(P(self.XD + 0.4, 1.2), aligned_edge=LEFT)
        self.au_mot("défaut")
        self.play(FadeIn(leg, shift=LEFT * 0.2), *[Indicate(a.lab[3 + 2 * i], color=ROUGE_ERREUR, scale_factor=1.6)
                                                   for i in range(3)], run_time=0.7)
        for k, mot in ((3, "0,02"), (5, "0,04"), (7, "0,05")):
            self.au_mot(mot)
            self.play(FadeIn(a.nombres[k], scale=1.6), run_time=0.4)
            self.insister(a.nombres[k], 0.2)
        self.attendre_voix()

    # ── 04 : la formule : la somme des trois chemins ────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-formule")
        self.titre_ecran("La somme des trois chemins")
        a = self.arbre(**self.POS)
        self.add(a)
        fs = 44
        pd = self.t("P(D) =", 50).move_to(P(self.XD + 0.1, 1.9), aligned_edge=LEFT)
        lignes = []
        for i, (p, q) in enumerate((("0,5", "0,02"), ("0,3", "0,04"), ("0,2", "0,05"))):
            m = [("+", WHITE)] if i else []
            l = self.calcul(m + [(p, PROBA), ("×", WHITE), (q, ROUGE_ERREUR)], fs, 0.2)
            y = 0.95 - 0.95 * i
            if i:
                l.move_to(P(self.XD + 0.9, y), aligned_edge=LEFT).shift(LEFT * (l[0].width + 0.2))
            else:
                l.move_to(P(self.XD + 0.9, y), aligned_edge=LEFT)
            lignes.append(l)
        self.au_mot("P de D")
        self.play(FadeIn(pd, shift=UP * 0.1), run_time=0.5)
        self.au_mot("la somme des trois chemins")
        self.play(*a.etat([0, 3, 1, 5, 2, 7]), run_time=0.7)
        self.play(*[Indicate(a.lab[3 + 2 * i], color=CHEMIN, scale_factor=1.7) for i in range(3)], run_time=0.7)
        self.pastilles = []
        for i, (m1, m2) in enumerate((("0,5 fois", "0,02, plus"), ("0,3 fois", "0,04, plus"),
                                      ("0,2 fois", "0,05."))):
            l = lignes[i]
            o = 1 if i else 0
            self.au_mot(m1)
            self.play(*a.etat(self.chemin(i)), run_time=0.5)
            anims = [TransformFromCopy(a.nombres[i], l[o]), FadeIn(l[o + 1])]
            if i:
                anims.append(FadeIn(l[0], scale=2))
            self.play(*anims, run_time=0.6)
            self.au_mot(m2)
            self.play(TransformFromCopy(a.nombres[3 + 2 * i], l[o + 2]), run_time=0.6)
            b = self.bout(a, i, ("0,5 × 0,02", "0,3 × 0,04", "0,2 × 0,05")[i], 20)
            self.play(TransformFromCopy(l[o:o + 3], b), run_time=0.6)
            self.pastilles.append(b)
        self.play(*a.etat([0, 3, 1, 5, 2, 7]), run_time=0.5)
        self.attendre_voix()

    # ── 05 : le calcul : 0,032 = 3,2 % ──────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-calcul")
        self.titre_ecran("Le calcul")
        a = self.arbre(**self.POS)
        bs = [self.bout(a, i, txt, 20) for i, txt in enumerate(("0,5 × 0,02", "0,3 × 0,04", "0,2 × 0,05"))]
        self.add(a, *bs)
        self.play(*a.etat([0, 3, 1, 5, 2, 7]), run_time=0.5)
        fs = 46
        k = [self.t(x, fs, c) for x, c in (("0,01", JAUNE_TITRE), ("+", WHITE), ("0,012", JAUNE_TITRE),
                                            ("+", WHITE), ("0,01", JAUNE_TITRE))]
        somme = suite(*k, buff=0.2).move_to(P(self.XD, 1.7), aligned_edge=LEFT)
        egal = suite(self.t("=", 54), self.t("0,032", 54, VERT_OK), buff=0.25)
        egal.next_to(somme, DOWN, buff=0.45).align_to(somme, LEFT).shift(RIGHT * 0.3)
        for i, (mot, val) in enumerate((("0,01 plus", "0,01"), ("0,012 plus", "0,012"), ("0,01 :", "0,01"))):
            self.au_mot(mot)
            nb = pastille(val, 22).move_to(bs[i], aligned_edge=LEFT)
            self.play(Transform(bs[i], nb), run_time=0.5)
            anims = [TransformFromCopy(bs[i][1], k[2 * i])]
            if i:
                anims.append(FadeIn(k[2 * i - 1], scale=2))
            self.play(*anims, run_time=0.5)
        self.au_mot("0,032")
        self.play(FadeIn(egal[0]), FadeIn(egal[1], scale=1.6), run_time=0.5)
        self.insister(egal[1], 0.3)
        self.au_mot("3,2 %")
        pc = self.t("3,2 %", 64, VERT_OK)
        res = VGroup(pc, VGroup(self.t("des panneaux", 32), self.t("ont un défaut", 32))
                     .arrange(DOWN, aligned_edge=LEFT, buff=0.08)).arrange(RIGHT, buff=0.35)
        res.next_to(egal, DOWN, buff=0.6).align_to(somme, LEFT)
        cadre = SurroundingRectangle(pc, color=VERT_OK, buff=0.2, stroke_width=5, corner_radius=0.12)
        self.play(TransformFromCopy(egal[1], pc), run_time=0.6)
        self.play(Create(cadre), FadeIn(res[1], shift=LEFT * 0.15), run_time=0.6)
        self.attendre_voix()

    # ── 06 : le piège : la moyenne des taux ─────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège : la moyenne")
        a = self.arbre(**self.POS)
        self.add(a)
        self.au_mot("faire la moyenne")
        moy = self.t("La moyenne des taux ?", 36, ORANGE_RETENUE).move_to(P(self.XD, 1.9), aligned_edge=LEFT)
        self.play(FadeIn(moy, shift=UP * 0.15), *a.etat([3, 5, 7]), run_time=0.6)
        fs = 44
        k = [self.t(x, fs, c) for x, c in (("2", ROUGE_ERREUR), (",", WHITE), ("4", ROUGE_ERREUR), ("et", WHITE),
                                            ("5", ROUGE_ERREUR))]
        nums = suite(*k, buff=0.2)
        k[1].shift(LEFT * 0.12).align_to(k[0], DOWN).shift(DOWN * 0.08)
        nums.next_to(moy, DOWN, buff=0.4).align_to(moy, LEFT)
        for i, mot in ((0, "2, 4"), (2, "4 et"), (4, "et 5")):
            self.au_mot(mot)
            anims = [FadeIn(k[i], scale=1.6), Indicate(a.nombres[3 + i], color=ROUGE_ERREUR, scale_factor=1.5)]
            if i:
                anims.append(FadeIn(k[i - 1]))
            self.play(*anims, run_time=0.4)
        self.au_mot("environ 3,7 %")
        env = suite(self.t("≈", 50, ORANGE_RETENUE), self.t("3,7 %", 50, ORANGE_RETENUE), buff=0.2)
        env.next_to(nums, RIGHT, buff=0.5)
        self.play(FadeIn(env, scale=1.5), run_time=0.5)
        self.au_mot("Faux")
        bloc = VGroup(nums, env)
        barre = Line(bloc.get_corner(DL) + P(-0.1, 0), bloc.get_corner(UR) + P(0.1, 0), color=ROUGE_ERREUR,
                     stroke_width=7)
        faux = self.t("FAUX !", 46, ROUGE_ERREUR).rotate(0.15).next_to(bloc, DOWN, buff=0.35).align_to(moy, LEFT)
        self.play(Create(barre), FadeIn(faux, scale=1.8), run_time=0.45)
        self.insister(faux, 0.25)
        self.au_mot("n'ont pas le même poids")
        poids = VGroup(self.t("Les fournisseurs n'ont pas", 32, VERT_OK), self.t("le même poids", 32, VERT_OK))
        poids.arrange(DOWN, aligned_edge=LEFT, buff=0.1).next_to(faux, DOWN, buff=0.4).align_to(moy, LEFT)
        self.play(*a.etat([0, 1, 2]), FadeIn(poids, shift=UP * 0.1), run_time=0.6)
        self.play(a.branches[0].animate.set_stroke(CHEMIN, 22), a.branches[1].animate.set_stroke(CHEMIN, 13),
                  a.branches[2].animate.set_stroke(CHEMIN, 7), run_time=0.9)
        self.play(*[Indicate(a.nombres[i], color=CHEMIN, scale_factor=1.5) for i in range(3)], run_time=0.7)
        self.attendre_voix()

    # ── 07 : défi : pas de défaut ───────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre(**self.POS)
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("Quelle est la probabilité")
        q = VGroup(self.t("Un panneau", 38, BLEU_CALCUL), self.t("sans défaut :", 38, BLEU_CALCUL),
                   self.t("quelle probabilité ?", 38, BLEU_CALCUL)).arrange(DOWN, buff=0.15)
        q.move_to(P(3.3, 1.0))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.6)
        self.au_mot("pas de défaut")
        self.play(*[Indicate(a.lab[4 + 2 * i], color=VERT_OK, scale_factor=1.8) for i in range(3)], run_time=0.8)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        a = self.arbre(**self.POS)
        self.add(a)
        sd = suite(self.t("sans défaut :", 34, VERT_OK), lettre("D", 38, VERT_OK, barre=True), buff=0.2)
        sd.move_to(P(self.XD + 0.2, 1.6), aligned_edge=LEFT)
        self.play(*a.etat([4, 6, 8]), FadeIn(sd, shift=UP * 0.1), run_time=0.7)
        l = self.calcul([("1", WHITE), ("−", WHITE), ("0,032", JAUNE_TITRE), ("=", WHITE), ("0,968", VERT_OK)], 50, 0.25)
        l.next_to(sd, DOWN, buff=0.6).align_to(sd, LEFT)
        self.au_mot("1 moins")
        self.play(FadeIn(l[0], scale=1.5), FadeIn(l[1]), run_time=0.5)
        self.au_mot("0,032")
        self.play(FadeIn(l[2], scale=1.5), run_time=0.5)
        self.au_mot("0,968")
        self.play(FadeIn(l[3]), FadeIn(l[4], scale=1.6), run_time=0.5)
        cadre = SurroundingRectangle(l[4], color=VERT_OK, buff=0.15, stroke_width=5, corner_radius=0.1)
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(l[4], cadre), 0.3)
        self.attendre_voix(marge=0.8)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        l1 = self.t("A, B, C forment une partition", fs)
        f = 32
        termes = [self.t("P(D)", f), self.t("=", f)]
        for i, lt in enumerate("ABC"):
            if i:
                termes.append(self.t("+", f))
            termes += [self.t(f"P({lt})", f, PROBA), self.t("×", f), p_cond(lt, "D", f, CHEMIN)]
        l2 = suite(*termes, buff=0.14)
        l3 = self.t("Chaque chemin pèse selon sa branche", fs, VERT_OK)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7)
        if lignes.width > 12.4:
            lignes.scale_to_fit_width(12.4)
        lignes.move_to(P(-0.4, 0.3))
        for mot, l in zip(["Si A, B, C", "P de D est la somme", "Chaque chemin"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.7)
            self.play(Create(l[0]), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_partition()
        self.ecran_arbre()
        self.ecran_formule()
        self.ecran_calcul()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaTotalesSTMG(ProbaTotalesBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"


class ProbaTotalesPremiereSpe(ProbaTotalesBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "marron"
