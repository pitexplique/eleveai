# proba_probaT_chemin.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# la PROBABILITÉ D'UN CHEMIN sur un arbre pondéré : on multiplie les branches
# (micros : probaT_chemin en STMG, alea_arbre_chemin en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_probaT_chemin_short.py
# (ceinture jaune, deux feux tricolores, chemin vert → vert).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaCheminBase porte toutes les scènes ; les deux sous-classes ne
# changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE PONDÉRÉ du coach (`canvasArbre` des deux banques ;
# le même dessin que proba_probaC_interpreter.py : carte blanche, branches
# grises, probabilités en bleu, chemin allumé en orange). Il se construit
# BRANCHE PAR BRANCHE quand la voix dit le nombre. ⛔ PAS D'ÉCART : les
# branches P → R barre et P barre → R barre restent SANS nombre.
#
# Écrans : 00 garde · 01 le centre de tri (60 % plastique, 70 % / 95 %
# recyclées) · 02 l'arbre (P 0,6 ; P barre 0,4 ; R 0,7 après P ; R 0,95 après
# P barre) · 03 la question « plastique ET recyclée » = P(P ∩ R), le chemin
# P puis R s'allume · 04 0,6 × 0,7 = 0,42 au bout du chemin · 05 pourquoi :
# 100 bouteilles, 60 en plastique, 42 recyclées (7 sur chaque rangée de 10)
# · 06 le piège 0,6 + 0,7 = 1,3 barré en rouge · 07 défi (verre ET recyclée)
# · 07b correction (chemin P barre → R : 0,4 × 0,95 = 0,38) · 08 ce que tu as
# appris · 09 abonnement.
#
# Voix : manim/voix/stmg-premiere-proba-chemin.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_chemin.py ProbaCheminSTMG -o eleveai-maths-stmg-proba-chemin --media_dir manim/scripts/stmg/media-probaT_chemin
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_chemin.py ProbaCheminPremiere -o eleveai-maths-premiere-commun-proba-chemin --media_dir manim/scripts/stmg/media-probaT_chemin
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_chemin_short.py ShortProbaCheminSTMG -o eleveai-maths-stmg-proba-chemin-short --media_dir manim/scripts/stmg/media-probaT_chemin
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_chemin_short.py ShortProbaCheminPremiere -o eleveai-maths-premiere-commun-proba-chemin-short --media_dir manim/scripts/stmg/media-probaT_chemin
# Puis copier dans manim/sorties/stmg/maths/probabilites/10-chemin/ et
# manim/sorties/premiere-commun/maths/probabilites/10-chemin/.

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
    BORD, BRANCHE, CHEMIN, ENCRE, PROBA, frac, lettre, pastille, suite,
)

PLASTIQUE = "#38BDF8"   # les bouteilles en plastique
VERRE = "#34D399"       # les bouteilles en verre
GRIS = "#64748B"        # une bouteille pas encore triée


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : bouteilles ────────────────────────────────────────────────

def bouteille(couleur=PLASTIQUE, s=1.0, bouchon=True):
    corps = RoundedRectangle(width=0.36, height=0.62, corner_radius=0.1, fill_color=couleur, fill_opacity=0.85,
                             stroke_color=WHITE, stroke_width=1.5)
    epaule = Polygon(P(-0.18, 0.2), P(0.18, 0.2), P(0.07, 0.42), P(-0.07, 0.42), fill_color=couleur,
                     fill_opacity=0.85, stroke_width=0)
    col = Rectangle(width=0.12, height=0.14, fill_color=couleur, fill_opacity=0.85, stroke_width=0)
    col.move_to(P(0, 0.48))
    g = VGroup(corps, epaule, col)
    if bouchon:
        g.add(Rectangle(width=0.15, height=0.07, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.58)))
    return g.scale(s)


def mini_bouteille(couleur=GRIS):
    """La petite bouteille de la grille de 100 : un corps et un goulot."""
    corps = RoundedRectangle(width=0.2, height=0.3, corner_radius=0.05, fill_color=couleur, fill_opacity=1,
                             stroke_width=0)
    col = Rectangle(width=0.08, height=0.08, fill_color=couleur, fill_opacity=1, stroke_width=0)
    col.next_to(corps, UP, buff=0)
    return VGroup(corps, col)


def recyclage(r=0.32, couleur=VERT_OK):
    """Trois flèches en rond : le signe « recyclé »."""
    fl = VGroup(*[Arc(radius=r, start_angle=a, angle=TAU / 3 - 0.45, color=couleur, stroke_width=6)
                  .add_tip(tip_length=0.14, tip_width=0.14) for a in (0, TAU / 3, 2 * TAU / 3)])
    return fl


def carte_lettre(lt, phrase, fs=28, barre=False):
    g = suite(lettre(lt, fs + 6, BLEU_CALCUL, barre), Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.14)
    fond = RoundedRectangle(width=g.width + 0.45, height=g.height + 0.35, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


# ── l'ARBRE PONDÉRÉ du coach (repris d'ArbreSB, lettres P / R) ──────────────

class ArbrePR(VGroup):
    """Carte blanche du coach : départ, P / P barre, puis R / R barre.
    Branches : 0 → P, 1 → P̄, 2 P → R, 3 P → R̄, 4 P̄ → R, 5 P̄ → R̄.
    lab : 0 P, 1 P̄ (fond blanc + lettre), 2 R, 3 R̄, 4 R, 5 R̄."""

    def __init__(self, a="P", b="R", dx=2.1, dy1=1.15, dy2=0.55, fs=30, **kw):
        super().__init__(**kw)
        racine = P(0, 0)
        noeuds = [P(dx, dy1), P(dx, -dy1)]
        feuilles = [P(2 * dx, dy1 + dy2), P(2 * dx, dy1 - dy2), P(2 * dx, -dy1 + dy2), P(2 * dx, -dy1 - dy2)]
        bouts = [(racine, noeuds[0]), (racine, noeuds[1]), (noeuds[0], feuilles[0]), (noeuds[0], feuilles[1]),
                 (noeuds[1], feuilles[2]), (noeuds[1], feuilles[3])]
        self.branches = [Line(u, v, color=BRANCHE, stroke_width=4) for u, v in bouts]
        self.depart = Dot(racine, radius=0.07, color=ENCRE)
        self.lab = []
        for k, br in enumerate([False, True]):
            m = lettre(a, fs, ENCRE, br).next_to(noeuds[k], UP, buff=0.08)
            fond = BackgroundRectangle(m, color=WHITE, fill_opacity=1, buff=0.04)
            self.lab.append(VGroup(fond, m))
        for k, br in enumerate([False, True, False, True]):
            self.lab.append(lettre(b, fs, ENCRE, br).next_to(feuilles[k], RIGHT, buff=0.12))
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
        """Le nombre de la branche k, en bleu, au-dessus du trait."""
        t = Text(texte, font_size=fs, color=PROBA, weight=BOLD)
        u, v = self.branches[k].get_start(), self.branches[k].get_end()
        d = v - u
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if n[1] < 0:
            n = -n
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.move_to((u + v) / 2 + n * (demi + buff))
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


class ProbaCheminBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-chemin"
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

    def arbre(self, centre=P(-3.55, -0.3), echelle=1.0, nombres=True):
        """L'arbre de la vidéo, avec les QUATRE nombres dits (0,6 ; 0,4 ; 0,7 ; 0,95)."""
        a = ArbrePR().scale(echelle).move_to(centre)
        if nombres:
            for k, v in ((0, "0,6"), (1, "0,4"), (2, "0,7"), (4, "0,95")):
                a.nombre(k, v, fs=int(26 * echelle))
        return a

    def calcul(self, morceaux, fs=52, centre=P(3.15, 2.1)):
        """Une ligne de calcul : liste de (texte, couleur)."""
        return suite(*[self.t(tx, fs, c) for tx, c in morceaux], buff=0.22).move_to(centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La probabilité d'un chemin", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        a = ArbrePR().scale(0.72).move_to(P(-3.3, 0.05))
        a.remove(*a.branches, *a.lab)
        regle = VGroup(self.t("branche", 44, CHEMIN), self.t("×", 60, JAUNE_TITRE), self.t("branche", 44, CHEMIN))
        regle.arrange(RIGHT, buff=0.3).move_to(P(2.9, 0.15))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(a.socle()), run_time=1.0)
        self.au_mot("d'un chemin")
        self.play(*[Create(b) for b in a.branches], *[FadeIn(m) for m in a.lab], run_time=0.6)
        self.play(*a.etat([0, 2]), run_time=0.6)
        self.au_mot("on multiplie")
        self.play(FadeIn(regle[0], shift=LEFT * 0.2), FadeIn(regle[2], shift=RIGHT * 0.2), run_time=0.4)
        self.play(FadeIn(regle[1], scale=2.0), run_time=0.4)
        self.insister(regle[1], 0.3)
        self.attendre_voix(marge=1.0)

    # ── 01 : le centre de tri ───────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le centre de tri")
        pla = VGroup(*[bouteille(PLASTIQUE, 0.95) for _ in range(6)]).arrange(RIGHT, buff=0.18)
        ver = VGroup(*[bouteille(VERRE, 0.95, bouchon=False) for _ in range(4)]).arrange(RIGHT, buff=0.18)
        pla.move_to(P(-3.3, 1.35))
        ver.move_to(P(2.4, 1.35))
        tapis = Line(P(-6.3, 0.85), P(4.8, 0.85), color=GRIS, stroke_width=10)
        self.au_mot("Un centre de tri")
        tout = VGroup(*pla, *ver)
        tout.shift(LEFT * 9)
        self.add(tout)
        self.play(FadeIn(tapis), tout.animate.shift(RIGHT * 9), run_time=1.2, rate_func=rate_functions.ease_out_cubic)
        self.au_mot("60 %")
        soixante = self.t("60 %", 54, JAUNE_TITRE).next_to(pla, DOWN, buff=0.45)
        lp = self.t("en plastique", 30, PLASTIQUE).next_to(soixante, DOWN, buff=0.15)
        self.play(FadeIn(soixante, scale=1.6), Indicate(pla, color=WHITE, scale_factor=1.08), run_time=0.6)
        self.play(FadeIn(lp, shift=UP * 0.1), run_time=0.4)
        self.au_mot("en verre")
        lv = self.t("en verre", 30, VERRE).next_to(ver, DOWN, buff=0.45).match_y(lp)
        self.play(FadeIn(lv, shift=UP * 0.1), Indicate(ver, color=WHITE, scale_factor=1.08), run_time=0.6)
        self.au_mot("Parmi les bouteilles en plastique")
        cadre_p = SurroundingRectangle(VGroup(pla, lp), color=PLASTIQUE, buff=0.15, stroke_width=4)
        self.play(Create(cadre_p), run_time=0.5)
        self.au_mot("70 %")
        r1 = suite(recyclage(0.26), self.t("70 %", 46, JAUNE_TITRE), self.t("recyclées", 30, VERT_OK), buff=0.2)
        r1.next_to(cadre_p, DOWN, buff=0.4)
        self.play(FadeIn(r1, scale=1.3), run_time=0.6)
        self.insister(r1[1], 0.25)
        self.au_mot("Parmi celles en verre")
        cadre_v = SurroundingRectangle(VGroup(ver, lv), color=VERRE, buff=0.15, stroke_width=4)
        self.play(Create(cadre_v), run_time=0.5)
        self.au_mot("95 %")
        r2 = suite(recyclage(0.26), self.t("95 %", 46, JAUNE_TITRE), self.t("recyclées", 30, VERT_OK), buff=0.2)
        r2.next_to(cadre_v, DOWN, buff=0.4).match_y(r1)
        self.play(FadeIn(r2, scale=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 02 : l'arbre, branche par branche ───────────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arbre")
        self.titre_ecran("L'arbre pondéré")
        a = self.arbre()
        self.add(a.socle())
        cP = carte_lettre("P", "« bouteille en plastique »", 26)
        cP.move_to(P(-0.3 + cP.width / 2, 1.5))
        cPb = carte_lettre("P", "en verre", 26, barre=True)
        cPb.move_to(P(-0.3 + cPb.width / 2, 0.45))
        cR = carte_lettre("R", "« recyclée »", 26)
        cR.move_to(P(-0.3 + cR.width / 2, -0.6))
        self.au_mot("P :")
        self.play(a.construire(0))
        self.play(FadeIn(cP, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,6")
        self.play(FadeIn(a.nombres[0], scale=1.6), run_time=0.4)
        self.insister(a.nombres[0], 0.25)
        self.au_mot("P barre")
        self.play(a.construire(1))
        self.au_mot("en verre")
        self.play(FadeIn(cPb, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,4")
        self.play(FadeIn(a.nombres[1], scale=1.6), run_time=0.4)
        self.au_mot("Après P :")
        self.play(Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.4), run_time=0.4)
        self.play(a.construire(2), a.construire(3))
        self.au_mot("« recyclée »")
        self.play(FadeIn(cR, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,7")
        self.play(FadeIn(a.nombres[2], scale=1.6), run_time=0.4)
        self.insister(a.nombres[2], 0.25)
        self.au_mot("Après P barre")
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.4), run_time=0.4)
        self.play(a.construire(4), a.construire(5))
        self.au_mot("0,95")
        self.play(FadeIn(a.nombres[4], scale=1.6), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la question : plastique ET recyclée = un chemin ────────────────

    def ecran_question(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-question")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Plastique ET recyclée ?")
        self.au_mot("On prend une bouteille")
        b = bouteille(PLASTIQUE, 1.1).move_to(P(1.0, 1.75))
        hasard = self.t("au hasard", 30, BLEU_CALCUL).next_to(b, RIGHT, buff=0.35)
        self.play(FadeIn(b, shift=DOWN * 0.4), run_time=0.5)
        self.au_mot("au hasard")
        self.play(FadeIn(hasard, shift=LEFT * 0.15), Wiggle(b), run_time=0.7)
        self.au_mot("Quelle est la probabilité")
        q = VGroup(self.t("en plastique", 42, PLASTIQUE), self.t("ET", 50, ORANGE_RETENUE),
                   self.t("recyclée ?", 42, VERT_OK))
        suite(q[0], q[1], buff=0.22).move_to(P(3.15, 0.75))
        q[2].next_to(VGroup(q[0], q[1]), DOWN, buff=0.15)
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.5)
        self.au_mot("ET recyclée")
        self.play(FadeIn(q[1], scale=2.0), run_time=0.4)
        self.play(FadeIn(q[2], shift=UP * 0.15), run_time=0.4)
        self.insister(q[1], 0.3)
        self.au_mot("C'est P de P inter R")
        inter = self.t("P(P ∩ R)", 64, JAUNE_TITRE).move_to(P(3.15, -0.95))
        self.play(FadeIn(inter, shift=UP * 0.2), run_time=0.6)
        self.au_mot("le chemin P")
        ch = self.t("le chemin P, puis R", 34, CHEMIN).next_to(inter, DOWN, buff=0.45)
        self.play(*a.etat([0]), FadeIn(ch[:9], shift=UP * 0.1), run_time=0.7)
        self.play(Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.6), run_time=0.5)
        self.au_mot("puis R")
        self.play(*a.etat([0, 2]), FadeIn(ch[9:], shift=UP * 0.1), run_time=0.7)
        self.play(Indicate(a.lab[2], color=CHEMIN, scale_factor=1.6), run_time=0.5)
        self.attendre_voix()

    # ── 04 : on suit le chemin, on multiplie : 0,6 × 0,7 = 0,42 ─────────────

    def ecran_produit(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-produit")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("On multiplie le long du chemin")
        rappel = self.t("P(P ∩ R)", 44, JAUNE_TITRE).move_to(P(3.15, 2.2))
        self.add(rappel)
        self.au_mot("On suit le chemin")
        mob = Dot(a.depart.get_center(), radius=0.12, color=CHEMIN)
        self.add(mob)
        self.play(*a.etat([0]), MoveAlongPath(mob, a.branches[0].copy()), run_time=0.9)
        self.play(*a.etat([0, 2]), MoveAlongPath(mob, a.branches[2].copy()), run_time=0.9)
        self.play(FadeOut(mob), run_time=0.2)
        self.au_mot("on multiplie ses branches")
        regle = self.t("× ses branches", 36, CHEMIN).move_to(P(3.15, 1.25))
        self.play(FadeIn(regle, shift=UP * 0.1), run_time=0.5)
        fs = 60
        k = [self.t(x, fs, c) for x, c in (("0,6", PROBA), ("×", WHITE), ("0,7", PROBA), ("=", WHITE),
                                            ("0,42", JAUNE_TITRE))]
        calc = self.caser(suite(*k, buff=0.25)).move_to(P(3.15, -0.05))
        for m in (k[0], k[2]):
            m.set_color("#60A5FA")
        self.au_mot("0,6 fois")
        self.play(TransformFromCopy(a.nombres[0], k[0]), Indicate(a.nombres[0], color=CHEMIN), run_time=0.7)
        self.play(FadeIn(k[1], scale=1.6), run_time=0.3)
        self.au_mot("0,7, égale")
        self.play(TransformFromCopy(a.nombres[2], k[2]), Indicate(a.nombres[2], color=CHEMIN), run_time=0.7)
        self.au_mot("égale 0,42")
        self.play(FadeIn(k[3]), FadeIn(k[4], scale=1.8), run_time=0.5)
        self.insister(k[4], 0.3)
        bout = pastille("0,42", 26).next_to(a.lab[2], RIGHT, buff=0.2)
        self.play(TransformFromCopy(k[4], bout), run_time=0.7)
        cad = SurroundingRectangle(bout, color=CHEMIN, buff=0.08, stroke_width=4)
        self.play(Create(cad), run_time=0.4)
        self.attendre_voix()

    # ── 05 : pourquoi multiplier : 100 bouteilles ───────────────────────────

    def ecran_pourquoi(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-pourquoi")
        self.titre_ecran("Pourquoi multiplier ?")
        # 10 rangées de 10 : les 6 du haut seront en plastique ; dans chacune,
        # les 7 de gauche seront recyclées (70 % de chaque rangée).
        grille = VGroup()
        for r in range(10):
            for c in range(10):
                grille.add(mini_bouteille().move_to(P(-5.6 + 0.42 * c, 2.05 - 0.5 * r)))
        cadre = SurroundingRectangle(grille, color=BORD, buff=0.15, stroke_width=2)
        x0 = -0.9
        self.au_mot("Prenons 100 bouteilles")
        l1 = self.t("100 bouteilles", 38).move_to(P(x0, 1.9), aligned_edge=LEFT)
        self.play(LaggedStart(*[FadeIn(m, scale=0.5) for m in grille], lag_ratio=0.008), Create(cadre),
                  run_time=1.4)
        self.play(FadeIn(l1, shift=LEFT * 0.15), run_time=0.4)
        self.au_mot("60 sont en plastique")
        pla = [grille[10 * r + c] for r in range(6) for c in range(10)]
        l2 = suite(self.t("60", 44, PLASTIQUE), self.t("en plastique", 34, PLASTIQUE), buff=0.2)
        l2.move_to(P(x0, 0.95), aligned_edge=LEFT)
        self.play(LaggedStart(*[m.animate.set_fill(PLASTIQUE) for m in pla], lag_ratio=0.015),
                  FadeIn(l2, shift=LEFT * 0.15), run_time=1.1)
        self.insister(l2[0], 0.25)
        self.au_mot("70 % de ces 60")
        rec = [grille[10 * r + c] for r in range(6) for c in range(7)]
        l3a = suite(self.t("70 %", 44, JAUNE_TITRE), self.t("de 60", 40, PLASTIQUE), buff=0.2)
        l3 = suite(l3a, self.t("=", 44), self.t("42", 48, VERT_OK), self.t("recyclées", 32, VERT_OK), buff=0.22)
        l3.move_to(P(x0, 0.0), aligned_edge=LEFT)
        self.play(FadeIn(l3a, shift=LEFT * 0.15), run_time=0.5)
        self.au_mot("ça fait 42")
        self.play(LaggedStart(*[m.animate.set_fill(VERT_OK) for m in rec], lag_ratio=0.02), run_time=1.0)
        self.play(FadeIn(l3[1]), FadeIn(l3[2], scale=1.8), FadeIn(l3[3], shift=LEFT * 0.1), run_time=0.5)
        self.insister(l3[2], 0.25)
        self.au_mot("42 sur 100")
        fr_ = frac("42", "100", 40, WHITE, color_n=VERT_OK)
        eg = self.t("=", 44)
        res = self.t("0,42", 52, JAUNE_TITRE)
        q = suite(fr_, eg, res, buff=0.25).move_to(P(x0, -1.2), aligned_edge=LEFT)
        self.play(TransformFromCopy(l3[2], fr_[0]), GrowFromCenter(fr_[1]), FadeIn(fr_[2]), run_time=0.7)
        self.au_mot("0,42. Prendre")
        self.play(FadeIn(eg), FadeIn(res, scale=1.8), run_time=0.5)
        self.insister(res, 0.3)
        self.au_mot("Prendre 70 % de 60 %")
        l5 = suite(self.t("70 % de 60 %", 36, WHITE), self.t(":", 36), buff=0.12)
        l6 = suite(self.t("c'est multiplier", 36, CHEMIN), self.t("×", 52, JAUNE_TITRE), buff=0.2)
        l5.move_to(P(x0, -2.35), aligned_edge=LEFT)
        l6.next_to(l5, RIGHT, buff=0.25)
        if l6.get_right()[0] > 5.0:
            l6.next_to(l5, DOWN, buff=0.15, aligned_edge=LEFT)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.5)
        self.au_mot("c'est multiplier")
        self.play(FadeIn(l6, scale=1.3), run_time=0.5)
        self.insister(l6[1], 0.3)
        self.attendre_voix()

    # ── 06 : le piège : additionner ─────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Le piège : additionner")
        self.play(*a.etat([0, 2]), run_time=0.5)
        fs = 60
        k = [self.t(x, fs, c) for x, c in (("0,6", "#60A5FA"), ("+", WHITE), ("0,7", "#60A5FA"), ("=", WHITE),
                                            ("1,3", ORANGE_RETENUE))]
        calc = self.caser(suite(*k, buff=0.25)).move_to(P(3.15, 1.9))
        self.au_mot("0,6 plus")
        self.play(TransformFromCopy(a.nombres[0], k[0]), run_time=0.5)
        self.play(FadeIn(k[1], scale=1.8), run_time=0.3)
        self.au_mot("0,7, égale")
        self.play(TransformFromCopy(a.nombres[2], k[2]), run_time=0.5)
        self.au_mot("égale 1,3")
        self.play(FadeIn(k[3]), FadeIn(k[4], scale=1.8), run_time=0.5)
        self.au_mot("plus que 1")
        plus = suite(self.t("1,3", 48, ORANGE_RETENUE), self.t(">", 48), self.t("1", 48), buff=0.25)
        plus.next_to(calc, DOWN, buff=0.55)
        self.play(FadeIn(plus, shift=UP * 0.15), run_time=0.5)
        self.au_mot("c'est impossible")
        barre = Line(calc.get_corner(DL) + P(-0.15, -0.05), calc.get_corner(UR) + P(0.15, 0.05),
                     color=ROUGE_ERREUR, stroke_width=8)
        imp = self.t("IMPOSSIBLE !", 46, ROUGE_ERREUR).rotate(0.12).next_to(plus, DOWN, buff=0.4)
        self.play(Create(barre), calc.animate.set_opacity(0.6), run_time=0.4)
        self.play(FadeIn(imp, scale=1.8), run_time=0.4)
        self.insister(imp, 0.25)
        self.au_mot("Sur un chemin")
        fin = VGroup(self.t("Sur un chemin :", 36, WHITE),
                     suite(self.t("on multiplie", 38, VERT_OK), self.t("×", 52, VERT_OK), buff=0.18))
        fin.arrange(DOWN, buff=0.15)
        fin.move_to(P(3.0, -1.95))
        if fin.get_right()[0] > 5.4:
            fin.shift(LEFT * (fin.get_right()[0] - 5.4))
        self.play(FadeIn(fin[0], shift=UP * 0.1), *[Indicate(a.branches[i], color=VERT_OK, scale_factor=1.05)
                                                   for i in (0, 2)], run_time=0.6)
        self.au_mot("on multiplie toujours")
        self.play(FadeIn(fin[1], scale=1.3), run_time=0.5)
        self.insister(fin[1][1], 0.3)
        self.attendre_voix()

    # ── 07 : défi : verre ET recyclée ───────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre(P(-3.4, 0.05), 0.95)
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("Quelle est la probabilité")
        q1 = VGroup(self.t("La probabilité qu'une", 34, WHITE), self.t("bouteille soit", 34, WHITE)).arrange(DOWN, buff=0.1)
        q2 = suite(self.t("en verre", 38, VERRE), self.t("ET", 44, ORANGE_RETENUE), self.t("recyclée ?", 38, VERT_OK),
                   buff=0.22)
        q = self.caser(VGroup(q1, q2).arrange(DOWN, buff=0.3), 5.4).move_to(P(3.2, 1.0))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("en verre")
        self.play(FadeIn(q2[0], shift=UP * 0.15), Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.6), run_time=0.6)
        self.au_mot("ET recyclée")
        self.play(FadeIn(q2[1], scale=2.0), run_time=0.4)
        self.play(FadeIn(q2[2], shift=UP * 0.15), Indicate(a.lab[4], color=CHEMIN, scale_factor=1.6), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Correction")
        self.au_mot("Le chemin P barre")
        self.play(*a.etat([1]), run_time=0.6)
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.6), run_time=0.5)
        self.au_mot("puis R")
        self.play(*a.etat([1, 4]), run_time=0.6)
        self.play(Indicate(a.lab[4], color=CHEMIN, scale_factor=1.6), run_time=0.5)
        fs = 60
        k = [self.t(x, fs, c) for x, c in (("0,4", "#60A5FA"), ("×", WHITE), ("0,95", "#60A5FA"), ("=", WHITE),
                                            ("0,38", JAUNE_TITRE))]
        calc = self.caser(suite(*k, buff=0.25)).move_to(P(3.15, 1.2))
        self.au_mot("0,4 fois")
        self.play(TransformFromCopy(a.nombres[1], k[0]), run_time=0.6)
        self.play(FadeIn(k[1], scale=1.8), run_time=0.3)
        self.au_mot("0,95, égale")
        self.play(TransformFromCopy(a.nombres[4], k[2]), run_time=0.6)
        self.au_mot("égale 0,38")
        self.play(FadeIn(k[3]), FadeIn(k[4], scale=1.8), run_time=0.5)
        self.insister(k[4], 0.3)
        bout = pastille("0,38", 26).next_to(a.lab[4], RIGHT, buff=0.2)
        self.play(TransformFromCopy(k[4], bout), run_time=0.7)
        ok = self.coche(taille=0.35).next_to(calc, DOWN, buff=0.6)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 34
        l1 = suite(self.t("« Et » sur un arbre :", fs), self.t("un chemin", fs, CHEMIN), buff=0.15)
        l2 = suite(self.t("Probabilité d'un chemin :", fs), self.t("le produit de ses branches", fs, VERT_OK),
                   buff=0.15)
        l3 = suite(self.t("Le long d'un chemin :", fs), self.t("on n'additionne jamais", fs, ROUGE_ERREUR),
                   buff=0.15)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.6, 0.6))
        for mot, l in zip(["« Et » sur un arbre", "La probabilité d'un chemin, c'est", "On n'additionne"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        self.play(Write(self.chute("Prochaine vidéo : quand plusieurs chemins mènent au même événement",
                                   color=VERT_OK, font_size=32)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_arbre()
        self.ecran_question()
        self.ecran_produit()
        self.ecran_pourquoi()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaCheminSTMG(ProbaCheminBase):
    identite = "Maths STMG — EleveAI"


class ProbaCheminPremiere(ProbaCheminBase):
    identite = "Maths 1re — EleveAI"


# 19/10 : la même vidéo pour la 1re SPÉ (micro jumelle, pack par classe).
class ProbaCheminPremiereSpe(ProbaCheminBase):
    identite = "Maths 1re spé — EleveAI"
