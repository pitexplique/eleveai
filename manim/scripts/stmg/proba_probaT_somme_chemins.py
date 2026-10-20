# proba_probaT_somme_chemins.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# PLUSIEURS CHEMINS VERS LE MÊME ÉVÉNEMENT : ON ADDITIONNE (micros :
# probaT_somme_chemins en STMG, alea_arbre_somme_chemins en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_probaT_somme_chemins_short.py
# (ceinture jaune, la roue et les deux sacs de billes).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaSommeCheminsBase porte toutes les scènes ; les deux
# sous-classes ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE PONDÉRÉ du coach (`canvasArbre` de la banque :
# carte blanche, branches grises, probabilités en bleu au milieu des branches,
# nœud étiqueté au-dessus, feuille à droite), repris du modèle validé
# proba_probaC_interpreter.py. Il se construit BRANCHE PAR BRANCHE quand la
# voix dit le nombre. ⛔ PAS D'ÉCART : les branches vers R barre restent SANS
# nombre jusqu'à la correction, où 0,9 et 0,6 n'apparaissent QUE quand la voix
# les dit.
#
# Écrans : 00 garde · 01 les colis, les deux entrepôts (Saint-Pierre 70 %,
# 10 % en retard ; Saint-Denis, 40 %) · 02 l'arbre (S 0,7 ; S barre 0,3 ;
# R 0,1 après S ; R 0,4 après S barre) · 03 la question, les deux chemins vers R
# · 04 chaque chemin se multiplie : 0,07 ; 0,12 · 05 on additionne : 0,19 ·
# 06 le piège de la moyenne : (0,1 + 0,4) ÷ 2 = 0,25 barré, la grosse branche
# 0,7 · 07 défi (à l'heure) · 07b correction : 0,63 + 0,18 = 0,81 = 1 − 0,19 ·
# 08 ce que tu as appris · 09 abonnement.
#
# Voix : manim/voix/stmg-premiere-proba-somme-chemins.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_somme_chemins.py ProbaSommeCheminsSTMG -o eleveai-maths-stmg-proba-somme-chemins --media_dir manim/scripts/stmg/media-probaT_somme_chemins
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_somme_chemins.py ProbaSommeCheminsPremiere -o eleveai-maths-premiere-commun-proba-somme-chemins --media_dir manim/scripts/stmg/media-probaT_somme_chemins
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_somme_chemins_short.py ShortProbaSommeCheminsSTMG -o eleveai-maths-stmg-proba-somme-chemins-short --media_dir manim/scripts/stmg/media-probaT_somme_chemins
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_somme_chemins_short.py ShortProbaSommeCheminsPremiere -o eleveai-maths-premiere-commun-proba-somme-chemins-short --media_dir manim/scripts/stmg/media-probaT_somme_chemins
# Puis copier dans manim/sorties/stmg/maths/probabilites/11-somme-chemins/ et
# manim/sorties/premiere-commun/maths/probabilites/11-somme-chemins/.

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
    BORD, BRANCHE, CHEMIN, ENCRE, PROBA, lettre, pastille, suite,
)

CARTON = "#B45309"      # les colis
SCOTCH = "#FCD34D"
TOLE = "#64748B"        # le bardage des entrepôts
TOIT_E = "#334155"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : colis, entrepôts, horloge ─────────────────────────────────

def colis(s=1.0):
    c = Square(0.42, fill_color=CARTON, fill_opacity=1, stroke_color="#78350F", stroke_width=2)
    ruban = Line(c.get_top(), c.get_bottom(), color=SCOTCH, stroke_width=5)
    return VGroup(c, ruban).scale(s)


def entrepot(s=1.0):
    corps = Rectangle(width=2.2, height=1.2, fill_color=TOLE, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    toit = Polygon(P(-1.25, 0.6), P(1.25, 0.6), P(0.9, 1.05), P(-0.9, 1.05), fill_color=TOIT_E, fill_opacity=1,
                   stroke_color=WHITE, stroke_width=2)
    porte = Rectangle(width=0.95, height=0.8, fill_color="#CBD5E1", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=1.5).align_to(corps, DOWN)
    lames = VGroup(*[Line(P(-0.47, y), P(0.47, y), color="#94A3B8", stroke_width=2)
                     for y in np.linspace(-0.45, -0.0, 4)])
    return VGroup(corps, toit, porte, lames).scale(s)


def horloge(r=0.32, couleur=ROUGE_ERREUR):
    c = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=couleur, stroke_width=4)
    a1 = Line(ORIGIN, P(0, r * 0.7), color=ENCRE, stroke_width=4)
    a2 = Line(ORIGIN, P(r * 0.55, -r * 0.2), color=ENCRE, stroke_width=4)
    return VGroup(c, a1, a2)


def carte_lettre(lt, phrase, fs=28, barre=False):
    g = suite(lettre(lt, fs + 6, BLEU_CALCUL, barre), Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.14)
    fond = RoundedRectangle(width=g.width + 0.45, height=g.height + 0.35, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


def chemin_txt(barre, fs=30, color=WHITE):
    """« S puis R » ou « S̄ puis R »."""
    return suite(lettre("S", fs + 4, color, barre), Text("puis", font_size=fs, color=color),
                 lettre("R", fs + 4, color), buff=0.15)

# ── l'ARBRE PONDÉRÉ du coach (canvasArbre), construit branche par branche ───

class ArbreSR(VGroup):
    """Carte blanche du coach : départ, S / S barre, puis R / R barre.
    Branches : 0 → S, 1 → S̄, 2 S → R, 3 S → R̄, 4 S̄ → R, 5 S̄ → R̄.
    Rien n'est visible tant que `construire(k)` n'a pas été joué, sauf la
    carte, son titre et le point de départ."""

    def __init__(self, dx=2.1, dy1=1.15, dy2=0.55, fs=30, **kw):
        super().__init__(**kw)
        racine = P(0, 0)
        noeuds = [P(dx, dy1), P(dx, -dy1)]
        feuilles = [P(2 * dx, dy1 + dy2), P(2 * dx, dy1 - dy2), P(2 * dx, -dy1 + dy2), P(2 * dx, -dy1 - dy2)]
        bouts = [(racine, noeuds[0]), (racine, noeuds[1]), (noeuds[0], feuilles[0]), (noeuds[0], feuilles[1]),
                 (noeuds[1], feuilles[2]), (noeuds[1], feuilles[3])]
        self.branches = [Line(a, b, color=BRANCHE, stroke_width=4) for a, b in bouts]
        self.depart = Dot(racine, radius=0.07, color=ENCRE)
        self.lab = []
        for k, b in enumerate([False, True]):
            m = lettre("S", fs, ENCRE, b).next_to(noeuds[k], UP, buff=0.08)
            fond = BackgroundRectangle(m, color=WHITE, fill_opacity=1, buff=0.04)
            self.lab.append(VGroup(fond, m))
        for k, b in enumerate([False, True, False, True]):
            self.lab.append(lettre("R", fs, ENCRE, b).next_to(feuilles[k], RIGHT, buff=0.12))
        tout = VGroup(self.depart, *self.branches, *self.lab)
        self.carte = RoundedRectangle(width=tout.width + 1.5, height=tout.height + 1.15, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.3 + RIGHT * 0.1)
        self.titre = Text("Arbre pondéré", font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.nombres = {}
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.lab)

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    def construire(self, k, run_time=0.6):
        """La branche k se trace, puis son étiquette apparaît au bout."""
        return Succession(Create(self.branches[k], run_time=run_time * 0.6),
                          FadeIn(self.lab[k], scale=1.4, run_time=run_time * 0.4))

    def nombre(self, k, texte, fs=26, buff=0.08):
        """Le nombre de la branche k, en bleu, au-dessus du trait (pas encore affiché)."""
        t = Text(texte, font_size=fs, color=PROBA, weight=BOLD)
        a, b = self.branches[k].get_start(), self.branches[k].get_end()
        d = b - a
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if n[1] < 0:
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
        gardes = set() if ks is None else ({0} if any(k in (0, 2, 3) for k in ks) else set()) | (
            {1} if any(k in (1, 4, 5) for k in ks) else set()) | {k for k in ks if k >= 2}
        for k, m in enumerate(self.lab):
            on = ks is None or k in gardes
            cible = m[1] if k < 2 else m
            anims.append(cible.animate.set_opacity(1 if on else op))
        return anims


class ProbaSommeCheminsBase(Notion6e):
    ceinture = "bleue"  # 20/10 : la 1re spé passe en marron (sous-classe)
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-somme-chemins"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def calcul(self, morceaux, fs=46, buff=0.18):
        """Une ligne de calcul ; morceaux = [(texte, couleur), …]."""
        return suite(*[self.t(x, fs, c) for x, c in morceaux], buff=buff)

    def arbre(self, centre=P(-3.55, -0.3), echelle=1.0, nombres=True):
        """L'arbre de la vidéo : branches, lettres et les QUATRE nombres dits."""
        a = ArbreSR().scale(echelle).move_to(centre)
        if nombres:
            for k, v in ((0, "0,7"), (1, "0,3"), (2, "0,1"), (4, "0,4")):
                a.nombre(k, v, fs=int(26 * echelle) if echelle < 1 else 26)
        return a

    def bout(self, a, k, texte, fs=24):
        """Le produit d'un chemin, en pastille au bout de la feuille k."""
        return pastille(texte, fs).next_to(a.lab[k], RIGHT, buff=0.2)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Plusieurs chemins : on additionne", 46, JAUNE_TITRE)
        if titre.width > 12.6:
            titre.scale_to_fit_width(12.6)
        titre.to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.75))
        a = self.arbre(P(-3.2, -0.1), 0.62, nombres=False)
        for k in range(6):
            a.lab[k].set_opacity(1)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(a), run_time=1.0)
        self.au_mot("Plusieurs chemins")
        self.play(*a.etat([0, 2, 1, 4]), run_time=0.7)
        self.au_mot("on additionne")
        somme = self.calcul([("chemin 1", CHEMIN), ("+", WHITE), ("chemin 2", CHEMIN)], 44, 0.3)
        somme.move_to(P(2.6, -0.1))
        self.play(FadeIn(somme[0], shift=RIGHT * 0.2), FadeIn(somme[2], shift=LEFT * 0.2), run_time=0.5)
        self.play(FadeIn(somme[1], scale=2.5), run_time=0.4)
        self.insister(somme[1], 0.25)
        self.attendre_voix(marge=1.0)

    # ── 01 : les colis, les deux entrepôts ──────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Les colis et les deux entrepôts")
        xp, xd, ye = -4.0, 1.6, 0.55
        ep = entrepot().move_to(P(xp, ye))
        ed = entrepot().move_to(P(xd, ye))
        np_ = self.t("Saint-Pierre", 30).next_to(ep, DOWN, buff=0.15)
        nd = self.t("Saint-Denis", 30).next_to(ed, DOWN, buff=0.15)
        cp = VGroup(*[colis() for _ in range(7)]).arrange(RIGHT, buff=0.1).next_to(np_, DOWN, buff=0.25)
        cd = VGroup(*[colis() for _ in range(3)]).arrange(RIGHT, buff=0.1).next_to(nd, DOWN, buff=0.25)
        self.au_mot("livre des colis")
        pile = VGroup(*[colis(1.2) for _ in range(3)]).arrange(RIGHT, buff=0.08).move_to(P(-1.2, 0.6))
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in pile], lag_ratio=0.2), run_time=0.8)
        self.au_mot("70 %")
        soixante = self.t("70 %", 60, JAUNE_TITRE).next_to(ep, UP, buff=0.2)
        self.play(FadeOut(pile, shift=DOWN * 0.3), FadeIn(ep, shift=UP * 0.2), FadeIn(np_), run_time=0.6)
        self.play(FadeIn(soixante, scale=1.6),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in cp], lag_ratio=0.1), run_time=0.9)
        self.au_mot("les autres de Saint-Denis")
        self.play(FadeIn(ed, shift=UP * 0.2), FadeIn(nd), run_time=0.6)
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in cd], lag_ratio=0.15), run_time=0.6)
        self.au_mot("Depuis Saint-Pierre")
        self.play(Indicate(ep, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.6)
        self.au_mot("10 %")
        h1 = horloge().next_to(cp, DOWN, buff=0.35).shift(LEFT * 1.1)
        r1 = suite(self.t("10 %", 44, ROUGE_ERREUR), self.t("en retard", 32, ROUGE_ERREUR), buff=0.2)
        r1.next_to(h1, RIGHT, buff=0.25)
        self.play(FadeIn(h1, scale=0.5), FadeIn(r1[0], scale=1.6), run_time=0.5)
        self.au_mot("en retard")
        self.play(FadeIn(r1[1], shift=LEFT * 0.15), Rotate(h1[2], -TAU, about_point=h1[0].get_center()),
                  run_time=0.8)
        self.au_mot("Depuis Saint-Denis")
        self.play(Indicate(ed, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.6)
        self.au_mot("40 %")
        h2 = horloge().next_to(cd, DOWN, buff=0.35).shift(LEFT * 1.0)
        r2 = suite(self.t("40 %", 44, ROUGE_ERREUR), self.t("en retard", 32, ROUGE_ERREUR), buff=0.2)
        r2.next_to(h2, RIGHT, buff=0.25)
        self.play(FadeIn(h2, scale=0.5), FadeIn(r2[0], scale=1.6), run_time=0.5)
        self.play(FadeIn(r2[1], shift=LEFT * 0.15), Rotate(h2[2], -TAU, about_point=h2[0].get_center()),
                  run_time=0.8)
        self.attendre_voix()

    # ── 02 : l'arbre, branche par branche ───────────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arbre")
        self.titre_ecran("L'arbre pondéré")
        a = self.arbre()
        for t in a.nombres.values():
            a.remove(t)
        self.au_mot("L'arbre")
        self.play(FadeIn(a.socle()), run_time=0.5)
        cS = carte_lettre("S", "« part de Saint-Pierre »", 26)
        cS.move_to(P(0.2 + cS.width / 2, 1.5))
        cSb = carte_lettre("S", "Saint-Denis", 26, barre=True)
        cSb.move_to(P(0.2 + cSb.width / 2, 0.4))
        cR = carte_lettre("R", "« en retard »", 26)
        cR.move_to(P(0.2 + cR.width / 2, -0.7))
        self.au_mot("S : « part")
        self.play(a.construire(0), FadeIn(cS, shift=LEFT * 0.2), run_time=0.8)
        self.au_mot("0,7")
        self.play(FadeIn(a.nombres[0], scale=1.6), run_time=0.4)
        self.insister(a.nombres[0], 0.25)
        self.au_mot("S barre, Saint-Denis")
        self.play(a.construire(1), FadeIn(cSb, shift=LEFT * 0.2), run_time=0.8)
        self.au_mot("0,3")
        self.play(FadeIn(a.nombres[1], scale=1.6), run_time=0.4)
        self.au_mot("Après S : R")
        self.play(Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.4), run_time=0.4)
        self.play(a.construire(2), a.construire(3))
        self.au_mot("« en retard »")
        self.play(FadeIn(cR, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,1")
        self.play(FadeIn(a.nombres[2], scale=1.6), run_time=0.4)
        self.insister(a.nombres[2], 0.25)
        self.au_mot("Après S barre")
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.4), run_time=0.4)
        self.play(a.construire(4), a.construire(5))
        self.au_mot("0,4")
        self.play(FadeIn(a.nombres[4], scale=1.6), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la question ; les deux chemins vers R ──────────────────────────

    def ecran_question(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-question")
        self.titre_ecran("Un colis en retard ?")
        a = self.arbre()
        self.add(a)
        q = VGroup(self.t("Un colis en retard :", 36, BLEU_CALCUL), self.t("quelle probabilité ?", 36, BLEU_CALCUL))
        q.arrange(DOWN, buff=0.15).move_to(P(2.9, 1.7))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.7)
        self.au_mot("Deux chemins")
        deux = self.t("Deux chemins mènent à R", 34).move_to(P(2.9, 0.45))
        self.play(FadeIn(deux, shift=UP * 0.1), run_time=0.5)
        self.play(*[Indicate(a.lab[i], color=CHEMIN, scale_factor=1.8) for i in (2, 4)], run_time=0.8)
        self.au_mot("S puis R")
        c1 = chemin_txt(False, 36, CHEMIN).move_to(P(2.9, -0.5))
        self.play(*a.etat([0, 2]), FadeIn(c1, shift=UP * 0.1), run_time=0.7)
        self.au_mot("et S barre puis R")
        c2 = chemin_txt(True, 36, CHEMIN).move_to(P(2.9, -1.45))
        self.play(*a.etat([0, 2, 1, 4]), FadeIn(c2, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix()

    # ── 04 : chaque chemin se multiplie ─────────────────────────────────────

    def ecran_chemins(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-chemins")
        self.titre_ecran("Chaque chemin : on multiplie")
        a = self.arbre()
        self.add(a)
        fs = 46
        l1 = self.calcul([("0,7", PROBA), ("×", WHITE), ("0,1", PROBA), ("=", WHITE), ("0,07", JAUNE_TITRE)], fs)
        l2 = self.calcul([("0,3", PROBA), ("×", WHITE), ("0,4", PROBA), ("=", WHITE), ("0,12", JAUNE_TITRE)], fs)
        e1 = chemin_txt(False, 28, CHEMIN)
        e2 = chemin_txt(True, 28, CHEMIN)
        e1.move_to(P(0.6, 1.55), aligned_edge=LEFT)
        l1.next_to(e1, DOWN, buff=0.25).align_to(e1, LEFT)
        e2.move_to(P(0.6, -0.35), aligned_edge=LEFT)
        l2.next_to(e2, DOWN, buff=0.25).align_to(e2, LEFT)
        self.au_mot("on le multiplie")
        self.play(*[Indicate(a.nombres[k], color=CHEMIN, scale_factor=1.3) for k in (0, 2, 1, 4)], run_time=0.7)
        self.au_mot("S puis R")
        self.play(*a.etat([0, 2]), FadeIn(e1, shift=UP * 0.1), run_time=0.6)
        self.au_mot("0,7 fois")
        self.play(TransformFromCopy(a.nombres[0], l1[0]), FadeIn(l1[1]), run_time=0.6)
        self.au_mot("0,1, égale")
        self.play(TransformFromCopy(a.nombres[2], l1[2]), run_time=0.6)
        self.au_mot("égale 0,07")
        b1 = self.bout(a, 2, "0,07")
        self.play(FadeIn(l1[3]), FadeIn(l1[4], scale=1.6), run_time=0.5)
        self.play(TransformFromCopy(l1[4], b1), run_time=0.6)
        self.au_mot("S barre puis R")
        self.play(*a.etat([1, 4]), FadeIn(e2, shift=UP * 0.1), run_time=0.6)
        self.au_mot("0,3 fois")
        self.play(TransformFromCopy(a.nombres[1], l2[0]), FadeIn(l2[1]), run_time=0.6)
        self.au_mot("0,4, égale")
        self.play(TransformFromCopy(a.nombres[4], l2[2]), run_time=0.6)
        self.au_mot("égale 0,12")
        b2 = self.bout(a, 4, "0,12")
        self.play(FadeIn(l2[3]), FadeIn(l2[4], scale=1.6), run_time=0.5)
        self.play(TransformFromCopy(l2[4], b2), run_time=0.6)
        self.play(*a.etat([0, 2, 1, 4]), run_time=0.5)
        self.attendre_voix()

    # ── 05 : on additionne les chemins qui mènent à R ───────────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-somme")
        self.titre_ecran("Puis on additionne les chemins")
        a = self.arbre()
        b1 = self.bout(a, 2, "0,07")
        b2 = self.bout(a, 4, "0,12")
        self.add(a, b1, b2)
        fs = 50
        k = [self.t(x, fs, c) for x, c in (("0,07", JAUNE_TITRE), ("+", WHITE), ("0,12", JAUNE_TITRE),
                                            ("=", WHITE), ("0,19", VERT_OK))]
        calc = suite(*k, buff=0.22).move_to(P(1.0, 1.3), aligned_edge=LEFT)
        # Relecture du 19/10 : « 0,19 » touchait le bord droit (et grossit à
        # l'insistance) ; la ligne s'arrête à x = 6,2.
        if calc.get_right()[0] > 6.2:
            calc.scale_to_fit_width(6.2 - calc.get_left()[0], about_edge=LEFT)
        self.au_mot("on additionne les chemins")
        self.play(*a.etat([0, 2, 1, 4]), run_time=0.6)
        self.play(Indicate(b1, scale_factor=1.4), Indicate(b2, scale_factor=1.4), run_time=0.7)
        self.au_mot("0,07 plus")
        self.play(TransformFromCopy(b1[1], k[0]), FadeIn(k[1], scale=2), run_time=0.7)
        self.au_mot("0,12, égale")
        self.play(TransformFromCopy(b2[1], k[2]), run_time=0.7)
        self.au_mot("égale 0,19")
        self.play(FadeIn(k[3]), FadeIn(k[4], scale=1.6), run_time=0.5)
        self.insister(k[4], 0.3)
        self.au_mot("P de R")
        pr = suite(self.t("P(R)", 60), self.t("=", 60), self.t("0,19", 60, VERT_OK), buff=0.25)
        pr.move_to(P(3.3, -0.3))
        cadre = SurroundingRectangle(pr, color=VERT_OK, buff=0.25, stroke_width=5, corner_radius=0.12)
        self.play(FadeIn(pr[:2], shift=UP * 0.1), TransformFromCopy(k[4], pr[2]), run_time=0.7)
        self.play(Create(cadre), run_time=0.5)
        self.attendre_voix()

    # ── 06 : le piège : la moyenne ; la grosse branche 0,7 ──────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège : la moyenne")
        a = self.arbre()
        self.add(a)
        self.au_mot("faire la moyenne")
        moy = self.t("La moyenne ?", 36, ORANGE_RETENUE).move_to(P(0.7, 1.95), aligned_edge=LEFT)
        self.play(FadeIn(moy, shift=UP * 0.15), run_time=0.5)
        fs = 38
        k = [self.t(x, fs, c) for x, c in (("(", WHITE), ("0,1", PROBA), ("+", WHITE), ("0,4", PROBA), (")", WHITE),
                                            ("÷", WHITE), ("2", WHITE), ("=", WHITE), ("0,25", ORANGE_RETENUE))]
        calc = VGroup(*k).arrange(RIGHT, buff=0.15)
        k[1].shift(LEFT * 0.08)
        k[4].shift(LEFT * 0.08)
        calc.next_to(moy, DOWN, buff=0.5).align_to(moy, LEFT)
        self.au_mot("0,1 plus")
        self.play(*a.etat([2, 4]), FadeIn(k[0]), TransformFromCopy(a.nombres[2], k[1]), FadeIn(k[2]), run_time=0.7)
        self.au_mot("0,4, divisé")
        self.play(TransformFromCopy(a.nombres[4], k[3]), FadeIn(k[4]), run_time=0.6)
        self.au_mot("divisé par 2")
        self.play(FadeIn(k[5]), FadeIn(k[6]), run_time=0.5)
        self.au_mot("0,25")
        self.play(FadeIn(k[7]), FadeIn(k[8], scale=1.6), run_time=0.5)
        self.au_mot("Faux")
        barre = Line(calc.get_corner(DL) + P(-0.1, 0.0), calc.get_corner(UR) + P(0.1, 0.0), color=ROUGE_ERREUR,
                     stroke_width=7)
        faux = self.t("FAUX !", 44, ROUGE_ERREUR).rotate(0.18).next_to(moy, RIGHT, buff=0.5)
        self.play(Create(barre), FadeIn(faux, scale=1.8), run_time=0.45)
        self.insister(faux, 0.25)
        self.au_mot("Saint-Pierre envoie")
        g1 = self.t("Saint-Pierre : beaucoup", 30).move_to(P(0.7, 0.05), aligned_edge=LEFT)
        g2 = self.t("plus de colis", 30).next_to(g1, DOWN, buff=0.12).align_to(g1, LEFT)
        self.play(*a.etat([0]), FadeIn(g1, shift=UP * 0.1), FadeIn(g2, shift=UP * 0.1), run_time=0.6)
        self.play(a.branches[0].animate.set_stroke(CHEMIN, 22), run_time=0.9)
        self.insister(a.nombres[0], 0.35)
        self.au_mot("son petit retard")
        g3 = self.t("son petit retard compte plus", 28, JAUNE_TITRE).next_to(g2, DOWN, buff=0.3).align_to(g1, LEFT)
        self.play(a.branches[2].animate.set_stroke(CHEMIN, 9, opacity=1), a.nombres[2].animate.set_opacity(1),
                  a.lab[2].animate.set_opacity(1), FadeIn(g3, shift=UP * 0.1), run_time=0.6)
        self.insister(a.nombres[2], 0.3)
        self.au_mot("Les branches du premier niveau")
        g4 = self.t("Le premier niveau pèse !", 30, VERT_OK).next_to(g3, DOWN, buff=0.3).align_to(g1, LEFT)
        self.play(a.branches[1].animate.set_stroke(CHEMIN, 9, opacity=1), a.nombres[1].animate.set_opacity(1),
                  a.lab[1][1].animate.set_opacity(1), FadeIn(g4, shift=UP * 0.1), run_time=0.6)
        self.play(*[Indicate(a.nombres[i], color=CHEMIN, scale_factor=1.5) for i in (0, 1)], run_time=0.8)
        self.attendre_voix()

    # ── 07 : défi : un colis à l'heure ──────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre(P(-3.4, 0.05), 0.95)
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("arrive à l'heure")
        q = VGroup(self.t("Un colis à l'heure :", 38, BLEU_CALCUL), self.t("quelle probabilité ?", 38, BLEU_CALCUL))
        q.arrange(DOWN, buff=0.2).move_to(P(3.2, 1.0))
        h = horloge(0.4, VERT_OK).next_to(q, UP, buff=0.35)
        self.play(FadeIn(q, shift=UP * 0.15), FadeIn(h, scale=0.5), run_time=0.6)
        self.play(*[Indicate(a.lab[i], color=VERT_OK, scale_factor=1.8) for i in (3, 5)], run_time=0.8)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        a = self.arbre()
        self.add(a)
        fs = 42
        l1 = self.calcul([("0,7", PROBA), ("×", WHITE), ("0,9", PROBA), ("=", WHITE), ("0,63", JAUNE_TITRE)], fs)
        l2 = self.calcul([("0,3", PROBA), ("×", WHITE), ("0,6", PROBA), ("=", WHITE), ("0,18", JAUNE_TITRE)], fs)
        l3 = self.calcul([("0,63", JAUNE_TITRE), ("+", WHITE), ("0,18", JAUNE_TITRE), ("=", WHITE),
                          ("0,81", VERT_OK)], fs)
        l4 = self.calcul([("1", WHITE), ("−", WHITE), ("0,19", WHITE), ("=", WHITE), ("0,81", VERT_OK)], fs)
        for l, y in ((l1, 1.95), (l2, 1.0), (l3, -0.15), (l4, -1.3)):
            l.move_to(P(0.7, y), aligned_edge=LEFT)
        verif = self.t("On vérifie :", 28, BLEU_CALCUL).next_to(l4, UP, buff=0.18).align_to(l4, LEFT)
        self.au_mot("Deux chemins")
        self.play(*a.etat([0, 3, 1, 5]), run_time=0.7)
        self.play(*[Indicate(a.lab[i], color=CHEMIN, scale_factor=1.8) for i in (3, 5)], run_time=0.7)
        self.au_mot("0,7 fois")
        self.play(*a.etat([0, 3]), TransformFromCopy(a.nombres[0], l1[0]), FadeIn(l1[1]), run_time=0.7)
        self.au_mot("0,9, égale")
        n3 = a.nombre(3, "0,9")
        a.remove(n3)
        self.play(FadeIn(n3, scale=1.6), run_time=0.4)
        self.play(TransformFromCopy(n3, l1[2]), run_time=0.5)
        self.au_mot("égale 0,63")
        b3 = self.bout(a, 3, "0,63")
        self.play(FadeIn(l1[3]), FadeIn(l1[4], scale=1.6), run_time=0.5)
        self.play(TransformFromCopy(l1[4], b3), run_time=0.5)
        self.au_mot("0,3 fois")
        self.play(*a.etat([1, 5]), TransformFromCopy(a.nombres[1], l2[0]), FadeIn(l2[1]), run_time=0.7)
        self.au_mot("0,6, égale")
        n5 = a.nombre(5, "0,6")
        a.remove(n5)
        self.play(FadeIn(n5, scale=1.6), run_time=0.4)
        self.play(TransformFromCopy(n5, l2[2]), run_time=0.5)
        self.au_mot("égale 0,18")
        b5 = self.bout(a, 5, "0,18")
        self.play(FadeIn(l2[3]), FadeIn(l2[4], scale=1.6), run_time=0.5)
        self.play(TransformFromCopy(l2[4], b5), run_time=0.5)
        self.au_mot("0,63 plus")
        self.play(*a.etat([0, 3, 1, 5]), TransformFromCopy(b3[1], l3[0]), FadeIn(l3[1], scale=2), run_time=0.7)
        self.au_mot("0,18, égale")
        self.play(TransformFromCopy(b5[1], l3[2]), run_time=0.6)
        self.au_mot("égale 0,81")
        self.play(FadeIn(l3[3]), FadeIn(l3[4], scale=1.6), run_time=0.5)
        self.insister(l3[4], 0.3)
        self.au_mot("On vérifie")
        self.play(FadeIn(verif, shift=UP * 0.1), run_time=0.4)
        self.au_mot("1 moins")
        self.play(FadeIn(l4[0]), FadeIn(l4[1]), run_time=0.4)
        self.au_mot("0,19, égale")
        self.play(FadeIn(l4[2], scale=1.4), run_time=0.4)
        self.play(FadeIn(l4[3]), FadeIn(l4[4], scale=1.6), run_time=0.5)
        ok = self.coche(taille=0.3).next_to(l4, RIGHT, buff=0.35)
        self.play(Create(ok), Indicate(l3[4], color=VERT_OK, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        l1 = self.t("On multiplie le long de chaque chemin", fs)
        l2 = self.t("Puis on additionne les chemins", fs)
        l3 = self.t("Jamais de moyenne", fs, ROUGE_ERREUR)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.6, 0.4))
        for mot, l in zip(["on multiplie le long", "puis on additionne", "Jamais de moyenne"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        self.play(Write(self.chute("Prochaine vidéo : passer de l'arbre au tableau croisé", color=VERT_OK,
                                   font_size=32)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_arbre()
        self.ecran_question()
        self.ecran_chemins()
        self.ecran_somme()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaSommeCheminsSTMG(ProbaSommeCheminsBase):
    identite = "Maths STMG — EleveAI"


class ProbaSommeCheminsPremiere(ProbaSommeCheminsBase):
    identite = "Maths 1re — EleveAI"


# 19/10 : la même vidéo pour la 1re SPÉ (micro jumelle, pack par classe).
class ProbaSommeCheminsPremiereSpe(ProbaSommeCheminsBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "marron"
