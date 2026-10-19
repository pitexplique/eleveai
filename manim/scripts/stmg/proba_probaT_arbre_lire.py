# proba_probaT_arbre_lire.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# LIRE UN ARBRE PONDÉRÉ, ce que dit chaque branche (micros : probaT_arbre_ponderer
# en STMG, alea_arbre_lire en 1re), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_probaT_arbre_lire_short.py (ceinture jaune, le plateau
# du self, frites et ketchup).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaArbreLireBase porte toutes les scènes ; les deux sous-classes
# ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE PONDÉRÉ du coach (`canvasArbre` des banques
# probaT_arbre_ponderer / alea_arbre_lire), comme proba_probaC_interpreter.py :
# carte blanche, branches grises, probabilités en bleu au milieu des branches,
# chemin allumé en orange. Il se construit NIVEAU PAR NIVEAU quand la voix dit
# chaque nombre (E 0,3 / E barre 0,7, puis A 0,6, A barre 0,4, A 0,2,
# A barre 0,8).
#
# Écrans : 00 garde · 01 le magasin : vélo électrique / classique, 30 %, 60 %,
# 20 % · 02 premier niveau (0,3 ; 0,7 ; « font 1 ») · 03 deuxième niveau ·
# 04 la branche E → A s'allume, « P_E(A) » s'écrit, le E DESCEND en indice ·
# 05 le piège : 0,6 isolé, « tout court ? » barré, le deuxième niveau est
# conditionnel · 06 défi (le 0,8) · 06b correction : E barre → A barre,
# P_Ē(Ā), 80 % · 07 ce que tu as appris · 08 abonnement.
#
# Voix : manim/voix/stmg-premiere-proba-arbre-lire.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_arbre_lire.py ProbaArbreLireSTMG -o eleveai-maths-stmg-proba-arbre-lire --media_dir manim/scripts/stmg/media-probaT_arbre_lire
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_arbre_lire.py ProbaArbreLirePremiere -o eleveai-maths-premiere-commun-proba-arbre-lire --media_dir manim/scripts/stmg/media-probaT_arbre_lire
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_arbre_lire_short.py ShortProbaArbreLireSTMG -o eleveai-maths-stmg-proba-arbre-lire-short --media_dir manim/scripts/stmg/media-probaT_arbre_lire
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_arbre_lire_short.py ShortProbaArbreLirePremiere -o eleveai-maths-premiere-commun-proba-arbre-lire-short --media_dir manim/scripts/stmg/media-probaT_arbre_lire
# Puis copier dans manim/sorties/stmg/maths/probabilites/07-arbre-lire/ et
# manim/sorties/premiere-commun/maths/probabilites/07-arbre-lire/.

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

CADRE_ELEC = "#14B8A6"   # le vélo électrique
CADRE_CLASS = "#EF4444"  # le vélo classique
BATTERIE = "#22C55E"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : vélos, éclair, bouclier d'assurance ───────────────────────

def eclair(s=1.0, color=JAUNE_TITRE):
    pts = [P(0.05, 0.3), P(-0.12, -0.02), P(0.0, -0.02), P(-0.06, -0.3), P(0.13, 0.05), P(0.0, 0.05)]
    return Polygon(*pts, fill_color=color, fill_opacity=1, stroke_width=0).scale(s)


def velo(electrique=False, s=1.0):
    couleur = CADRE_ELEC if electrique else CADRE_CLASS
    R, C, S, H, F = P(-0.62, 0), P(0, 0), P(-0.2, 0.62), P(0.45, 0.62), P(0.62, 0)
    roues = VGroup(*[VGroup(Circle(radius=0.4, color=WHITE, stroke_width=4).move_to(c),
                            Dot(c, radius=0.04, color=WHITE)) for c in (R, F)])
    cadre = VGroup(*[Line(a, b, color=couleur, stroke_width=6) for a, b in
                     ((R, C), (C, S), (S, R), (S, H), (H, C), (H, F))])
    guidon = VMobject(color=WHITE, stroke_width=5).set_points_as_corners([H, P(0.38, 0.88), P(0.6, 0.88)])
    selle = RoundedRectangle(width=0.32, height=0.09, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(P(-0.24, 0.7))
    g = VGroup(roues, cadre, guidon, selle)
    if electrique:
        d = C - H
        bat = RoundedRectangle(width=0.36, height=0.16, corner_radius=0.04, fill_color=BATTERIE, fill_opacity=1,
                               stroke_color=WHITE, stroke_width=1.5)
        bat.rotate(np.arctan2(d[1], d[0])).move_to((H + C) / 2 + P(-0.04, 0.02))
        g.add(bat, eclair(0.8).move_to(P(0.0, 1.15)))
    return g.scale(s)


def bouclier(s=1.0, color=VERT_OK):
    b = Polygon(P(-0.3, 0.35), P(0.3, 0.35), P(0.3, 0.02), P(0, -0.4), P(-0.3, 0.02), fill_color=color,
                fill_opacity=0.25, stroke_color=color, stroke_width=4)
    c = VMobject(stroke_color=color, stroke_width=5).set_points_as_corners(
        [P(-0.13, 0.0), P(-0.03, -0.11), P(0.14, 0.12)])
    return VGroup(b, c).scale(s)


def carte_lettre(lt, phrase, fs=28, barre=False):
    g = suite(lettre(lt, fs + 6, BLEU_CALCUL, barre), Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.14)
    fond = RoundedRectangle(width=g.width + 0.45, height=g.height + 0.35, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


def p_ind(cond, cible, fs=80, barre_cond=False, barre_cible=False, color=WHITE, c_cond=JAUNE_TITRE,
          c_cible=VERT_OK):
    """P_cond(cible), avec une barre possible sur la condition ET sur la cible.
    Renvoie VGroup(P, indice, VGroup(« ( », cible, « ) »))."""
    p = Text("P", font_size=fs, color=color)
    ind = lettre(cond, int(fs * 0.62), c_cond, barre_cond)
    ind.next_to(p, RIGHT, buff=0.03).align_to(p, DOWN).shift(DOWN * fs * 0.0045)
    po = Text("(", font_size=fs, color=color)
    lc = lettre(cible, fs, c_cible, barre_cible)
    pf = Text(")", font_size=fs, color=color)
    par = VGroup(po, lc, pf).arrange(RIGHT, buff=0.04)
    par.next_to(ind, RIGHT, buff=0.03)
    # la lettre de la cible sur la ligne de base du P ; les parenthèses centrées sur elle
    par.shift(UP * (p.get_bottom()[1] - lc[0].get_bottom()[1]))
    for x in (po, pf):
        x.match_y(lc[0])
    return VGroup(p, ind, par)


# ── l'ARBRE PONDÉRÉ du coach, construit niveau par niveau ───────────────────

class Arbre2(VGroup):
    """Carte blanche du coach : départ, L1 / L1 barre, puis L2 / L2 barre.
    Branches : 0 → L1, 1 → L1̄, 2 L1 → L2, 3 L1 → L2̄, 4 L1̄ → L2, 5 L1̄ → L2̄.
    lab[0], lab[1] : VGroup(fond, lettre) ; lab[2..5] : les lettres des feuilles."""

    def __init__(self, l1="E", l2="A", dx=2.1, dy1=1.15, dy2=0.55, fs=30, titre="Arbre pondéré", tfs=22, **kw):
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
            m = lettre(l1, fs, ENCRE, b).next_to(noeuds[k], UP, buff=0.08)
            fond = BackgroundRectangle(m, color=WHITE, fill_opacity=1, buff=0.04)
            self.lab.append(VGroup(fond, m))
        for k, b in enumerate([False, True, False, True]):
            self.lab.append(lettre(l2, fs, ENCRE, b).next_to(feuilles[k], RIGHT, buff=0.12))
        tout = VGroup(self.depart, *self.branches, *self.lab)
        self.carte = RoundedRectangle(width=tout.width + 1.5 * fs / 30, height=tout.height + 1.15 * fs / 30,
                                      corner_radius=0.2, fill_color=WHITE, fill_opacity=1, stroke_color=BORD,
                                      stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.3 * fs / 30 + RIGHT * 0.1 * fs / 30)
        self.titre = Text(titre, font_size=tfs, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14 * fs / 30)
        self.nombres = {}
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.lab)

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    def construire(self, k, run_time=0.6):
        """La branche k se trace, puis son étiquette apparaît au bout."""
        return Succession(Create(self.branches[k], run_time=run_time * 0.6),
                          FadeIn(self.lab[k], scale=1.4, run_time=run_time * 0.4))

    def nombre(self, k, texte, fs=26, buff=0.08, color=PROBA, dessous=None):
        """Le nombre de la branche k, en bleu, au-dessus du trait (pas encore affiché)."""
        t = Text(texte, font_size=fs, color=color, weight=BOLD)
        a, b = self.branches[k].get_start(), self.branches[k].get_end()
        d = b - a
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if n[1] < 0:
            n = -n
        if (k >= 2 if dessous is None else dessous) and d[1] < 0:
            n = -n  # au deuxième niveau, la branche du bas porte son nombre SOUS le trait
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


NOMBRES = ((0, "0,3"), (1, "0,7"), (2, "0,6"), (3, "0,4"), (4, "0,2"), (5, "0,8"))


class ProbaArbreLireBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-arbre-lire"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def lignes(self, morceaux, fs=30, centre=P(2.9, 0.0), buff=0.22):
        """Des lignes de texte ; chaque ligne est une liste de (texte, couleur)."""
        g = VGroup(*[suite(*[self.t(tx, fs, c) for tx, c in ligne], buff=0.13) for ligne in morceaux])
        g.arrange(DOWN, buff=buff, aligned_edge=LEFT).move_to(centre)
        return g

    def arbre(self, centre=P(-3.55, -0.3), echelle=1.0, nombres=NOMBRES):
        """L'arbre de la vidéo ; `nombres` : les branches dont le nombre est déjà dit."""
        a = Arbre2("E", "A", dy1=1.35, dy2=0.75).scale(echelle).move_to(centre)
        for k, v in nombres:
            a.nombre(k, v)
        return a

    def cadrer(self, mob, cx=3.25, larg=6.4):
        """À droite de l'arbre, sans le toucher ni sortir du cadre."""
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        mob.set_x(cx)
        return mob

    def niveaux(self, a, fs=22):
        """« Type de vélo » sous le premier niveau, « Assurance » sous le second."""
        y = a.carte.get_bottom()[1] - 0.3
        x1 = (a.branches[0].get_start()[0] + a.branches[0].get_end()[0]) / 2
        x2 = (a.branches[2].get_start()[0] + a.branches[2].get_end()[0]) / 2
        n1 = self.t("Type de vélo", fs, BLEU_CALCUL).move_to(P(x1 - 0.25, y))
        n2 = self.t("Assurance", fs, BLEU_CALCUL).move_to(P(x2, y))
        return n1, n2

    def cartes(self):
        cE = carte_lettre("E", "« vélo électrique »", 26)
        cE.move_to(P(-0.2 + cE.width / 2, 1.6))
        cEb = carte_lettre("E", "« vélo classique »", 26, barre=True)
        cEb.move_to(P(-0.2 + cEb.width / 2, 0.55))
        cA = carte_lettre("A", "« prend l'assurance »", 26)
        cA.move_to(P(-0.2 + cA.width / 2, -0.5))
        return cE, cEb, cA

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Lire un arbre pondéré", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        a = self.arbre(P(-2.6, 0.05), 0.6, nombres=())
        for br in a.branches:
            br.set_opacity(0)
        for m in a.lab:
            m.set_opacity(0)
        bulle = RoundedRectangle(width=3.6, height=1.5, corner_radius=0.5, fill_color="#0F172A", fill_opacity=1,
                                 stroke_color=BLEU_CALCUL, stroke_width=4).move_to(P(3.4, 0.2))
        guill = self.t("« … »", 64, WHITE).move_to(bulle)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(a.socle()), run_time=1.0)
        self.play(*[br.animate.set_opacity(1) for br in a.branches], *[m.animate.set_opacity(1) for m in a.lab],
                  run_time=0.8)
        self.au_mot("chaque branche")
        for k in (0, 2):
            self.play(*a.etat([k] if k == 0 else [0, k]), run_time=0.35)
        fl = Arrow(a.branches[2].get_center() + P(0.3, 0.1), bulle.get_left() + LEFT * 0.1, buff=0,
                   color=JAUNE_TITRE, stroke_width=6)
        self.play(GrowArrow(fl), FadeIn(bulle, scale=0.7), run_time=0.5)
        self.play(Write(guill), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 01 : le magasin : électrique / classique, l'assurance ───────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le magasin de vélos")
        ve = velo(True, 1.35).move_to(P(-3.6, 1.35))
        vc = velo(False, 1.35).move_to(P(2.8, 1.2))
        le = self.t("Électrique", 32, CADRE_ELEC).next_to(ve, DOWN, buff=0.25)
        lc = self.t("Classique", 32, CADRE_CLASS).next_to(vc, DOWN, buff=0.25)
        lc.match_y(le)
        self.play(FadeIn(ve, shift=RIGHT * 0.6), FadeIn(vc, shift=LEFT * 0.6), run_time=0.9)
        self.au_mot("30 %")
        trente = suite(self.t("30 %", 50, JAUNE_TITRE), self.t("des clients", 30), buff=0.2)
        trente.next_to(le, DOWN, buff=0.3)
        self.play(FadeIn(le), FadeIn(trente, scale=0.7), Wiggle(ve), run_time=0.7)
        self.au_mot("les autres un vélo classique")
        self.play(FadeIn(lc), Wiggle(vc), run_time=0.7)
        self.au_mot("Parmi les clients")
        be = bouclier(1.0).next_to(ve, RIGHT, buff=0.3).shift(DOWN * 0.1)
        pe = suite(self.t("Parmi eux :", 28), self.t("60 %", 42, JAUNE_TITRE), self.t("assurés", 28), buff=0.18)
        pe.next_to(trente, DOWN, buff=0.45).set_x(-3.6)
        self.play(FadeIn(pe[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("60 %")
        self.play(FadeIn(pe[1], scale=1.6), FadeIn(pe[2]), GrowFromCenter(be), run_time=0.6)
        self.insister(pe[1], 0.25)
        self.au_mot("Parmi les autres")
        bc = bouclier(1.0).next_to(vc, RIGHT, buff=0.3).shift(DOWN * 0.1)
        pc = suite(self.t("Parmi eux :", 28), self.t("20 %", 42, JAUNE_TITRE), self.t("assurés", 28), buff=0.18)
        pc.match_y(pe).set_x(2.8)
        self.play(FadeIn(pc[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("20 %")
        self.play(FadeIn(pc[1], scale=1.6), FadeIn(pc[2]), GrowFromCenter(bc), run_time=0.6)
        self.attendre_voix()

    # ── 02 : le premier niveau ──────────────────────────────────────────────

    def ecran_premier_niveau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-premier-niveau")
        self.titre_ecran("L'arbre : premier niveau")
        a = self.arbre()
        n1, _ = self.niveaux(a)
        cE, cEb, _ = self.cartes()
        self.au_mot("On dessine")
        self.play(FadeIn(a.socle()), run_time=0.5)
        self.au_mot("le type de vélo")
        self.play(FadeIn(n1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Une branche vers E,")
        self.play(a.construire(0))
        self.au_mot("« vélo électrique »")
        self.play(FadeIn(cE, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot(": 0,3")
        self.play(FadeIn(a.nombres[0], scale=1.6), run_time=0.4)
        self.insister(a.nombres[0], 0.25)
        self.au_mot("Une branche vers E barre")
        self.play(a.construire(1))
        self.au_mot("« vélo classique »")
        self.play(FadeIn(cEb, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot(": 0,7")
        self.play(FadeIn(a.nombres[1], scale=1.6), run_time=0.4)
        self.insister(a.nombres[1], 0.25)
        fs = 52
        k = [self.t(x, fs, c) for x, c in (("0,3", PROBA), ("+", WHITE), ("0,7", PROBA), ("=", WHITE), ("1", VERT_OK))]
        somme = suite(*k, buff=0.22).move_to(P(2.4, -1.15))
        self.au_mot("font 1")
        self.play(*[a.branches[i].animate.set_stroke(CHEMIN, 9) for i in (0, 1)], run_time=0.5)
        self.play(FadeIn(k[3]), FadeIn(k[4], scale=1.8), run_time=0.5)
        self.au_mot("0,3 plus")
        self.play(TransformFromCopy(a.nombres[0], k[0]), FadeIn(k[1]), run_time=0.6)
        self.au_mot("plus 0,7")
        self.play(TransformFromCopy(a.nombres[1], k[2]), run_time=0.6)
        self.play(Circumscribe(somme, color=VERT_OK), run_time=0.8)
        self.attendre_voix()

    # ── 03 : le deuxième niveau ─────────────────────────────────────────────

    def ecran_deuxieme_niveau(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-deuxieme-niveau")
        self.titre_ecran("L'arbre : deuxième niveau")
        a = self.arbre()
        n1, n2 = self.niveaux(a)
        cE, cEb, cA = self.cartes()
        self.add(a.socle(), a.branches[0], a.branches[1], a.lab[0], a.lab[1], a.nombres[0], a.nombres[1], n1,
                 cE, cEb)
        self.au_mot("Puis l'assurance")
        self.play(FadeIn(n2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Après E :")
        self.play(Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.5), run_time=0.5)
        self.au_mot("A, « prend")
        self.play(a.construire(2))
        self.au_mot("« prend l'assurance »")
        self.play(FadeIn(cA, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,6, et")
        self.play(FadeIn(a.nombres[2], scale=1.6), run_time=0.4)
        self.insister(a.nombres[2], 0.25)
        self.au_mot("A barre, 0,4")
        self.play(a.construire(3))
        self.au_mot("0,4.")
        self.play(FadeIn(a.nombres[3], scale=1.6), run_time=0.4)
        self.au_mot("Après E barre")
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.5), run_time=0.5)
        self.au_mot("A, 0,2")
        self.play(a.construire(4))
        self.au_mot("0,2, et")
        self.play(FadeIn(a.nombres[4], scale=1.6), run_time=0.4)
        self.au_mot("A barre, 0,8")
        self.play(a.construire(5))
        self.au_mot("0,8.")
        self.play(FadeIn(a.nombres[5], scale=1.6), run_time=0.4)
        self.insister(a.nombres[5], 0.25)
        self.attendre_voix()

    # ── 04 : que dit le 0,6 ? La branche E → A ; le E DESCEND en indice ─────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-lire")
        self.titre_ecran("Que dit le 0,6 ?")
        a = self.arbre()
        self.add(a, *self.niveaux(a))
        self.au_mot("Que dit le 0,6")
        self.insister(a.nombres[2], 0.35)
        self.au_mot("Il part de E")
        self.play(*a.etat([2]), run_time=0.7)
        self.play(Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.7), run_time=0.6)
        self.au_mot("on est déjà parmi")
        ph = self.lignes([[("On est déjà", WHITE), ("parmi", JAUNE_TITRE)],
                          [("les clients « électrique »", WHITE)]], 30, P(3.25, 2.05), buff=0.15)
        self.cadrer(ph)
        self.play(FadeIn(ph, shift=UP * 0.15), run_time=0.6)
        self.au_mot("C'est P indice E de A")
        f = p_ind("E", "A", 80)
        eg = self.t("=", 80).next_to(f, RIGHT, buff=0.25)
        v = self.t("0,6", 80, PROBA).next_to(eg, RIGHT, buff=0.25)
        v.shift(UP * (f[0].get_bottom()[1] - v[0].get_bottom()[1]))
        eg.match_y(f[0])
        self.cadrer(VGroup(f, eg, v).move_to(P(3.25, 0.35)))
        # le E arrive en GRAND à côté du P, puis DESCEND en indice
        grand_e = self.t("E", 80, JAUNE_TITRE).next_to(f[0], RIGHT, buff=0.08).align_to(f[0], DOWN)
        self.play(FadeIn(f[0]), TransformFromCopy(a.lab[0][1], grand_e), run_time=0.7)
        self.wait(0.2)
        self.play(ReplacementTransform(grand_e, f[1]), run_time=0.8)
        self.play(Indicate(f[1], color=JAUNE_TITRE, scale_factor=1.8), run_time=0.5)
        self.play(FadeIn(f[2][0]), FadeIn(f[2][2]), TransformFromCopy(a.lab[2], f[2][1]), run_time=0.6)
        self.play(FadeIn(eg), TransformFromCopy(a.nombres[2], v), run_time=0.6)
        self.au_mot("la probabilité de prendre")
        ex = self.lignes([[("la probabilité de prendre l'assurance", WHITE)],
                          [("sachant", JAUNE_TITRE), ("qu'on achète un électrique", WHITE)]], 27, P(3.25, -1.3),
                         buff=0.15)
        self.cadrer(ex)
        self.play(FadeIn(ex[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("sachant")
        self.play(FadeIn(ex[1], shift=UP * 0.1), run_time=0.5)
        self.play(Indicate(ex[1][0], color=JAUNE_TITRE, scale_factor=1.3), Indicate(f[1], color=JAUNE_TITRE,
                                                                                     scale_factor=1.6), run_time=0.7)
        self.attendre_voix()

    # ── 05 : le piège : 0,6 « tout court » ? Non : conditionnelle ───────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        a = self.arbre()
        n1, n2 = self.niveaux(a)
        self.add(a, n1, n2)
        self.play(*a.etat([2]), run_time=0.6)
        self.au_mot("croire que 0,6")
        six = self.t("0,6", 64, PROBA).move_to(P(0.6, 1.9))
        l1 = self.t("= la probabilité", 30).next_to(six, RIGHT, buff=0.25)
        l2 = self.t("de prendre l'assurance", 30).next_to(l1, DOWN, buff=0.15).align_to(l1, LEFT)
        l3 = self.t("tout court ?", 36, ORANGE_RETENUE).next_to(l2, DOWN, buff=0.2).align_to(l1, LEFT)
        self.cadrer(VGroup(six, l1, l2, l3), cx=2.95, larg=5.6)
        self.play(TransformFromCopy(a.nombres[2], six), run_time=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        self.au_mot("tout court")
        self.play(FadeIn(l3, scale=1.4), run_time=0.4)
        self.au_mot("Non !")
        barre = Line(l3.get_left() + LEFT * 0.1, l3.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=7)
        non = self.t("NON !", 48, ROUGE_ERREUR).rotate(0.15).next_to(l3, RIGHT, buff=0.35)
        self.play(Create(barre), FadeIn(non, scale=1.8), run_time=0.45)
        self.insister(non, 0.25)
        self.au_mot("Au deuxième niveau")
        zone = SurroundingRectangle(VGroup(*a.branches[2:], *a.lab[2:]), color=CHEMIN, buff=0.12,
                                    stroke_width=4, corner_radius=0.12)
        self.play(*a.etat([2, 3, 4, 5]), Create(zone), Indicate(n2, color=CHEMIN), run_time=0.8)
        self.au_mot("probabilité conditionnelle")
        c1 = self.t("Deuxième niveau :", 30, CHEMIN)
        c2 = self.t("probabilités conditionnelles", 34, JAUNE_TITRE)
        cc = VGroup(c1, c2).arrange(DOWN, buff=0.15, aligned_edge=LEFT).move_to(P(3.25, -0.45))
        d = self.t("elle dépend de la branche d'où elle part", 26, WHITE).next_to(cc, DOWN, buff=0.35)
        d.align_to(cc, LEFT)
        self.cadrer(VGroup(cc, d))
        self.play(FadeIn(c1, shift=UP * 0.1), FadeIn(c2, shift=UP * 0.1), run_time=0.6)
        self.insister(c2, 0.3)
        self.au_mot("elle dépend")
        self.play(FadeIn(d, shift=UP * 0.1), run_time=0.5)
        self.au_mot("d'où elle part")
        self.play(*a.etat([0, 1, 2, 3, 4, 5]), run_time=0.4)
        self.play(Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.7),
                  Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.7), run_time=0.8)
        self.attendre_voix()

    # ── 06 : défi : le 0,8 ──────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre(P(-3.5, 0.0), 0.9)
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("Que dit le 0,8")
        q = suite(self.t("Que dit le", 40, BLEU_CALCUL), self.t("0,8", 48, PROBA), self.t("?", 40, BLEU_CALCUL),
                  buff=0.18).move_to(P(2.9, 1.6))
        self.play(FadeIn(q, shift=UP * 0.15), *a.etat([5]), run_time=0.6)
        self.insister(a.nombres[5], 0.35)
        self.au_mot("Écris-le")
        e = self.t("Écris-le avec la notation :", 30).move_to(P(2.9, 0.55))
        p = self.t("P", 90)
        trou_i = Square(0.36, color=JAUNE_TITRE, stroke_width=4)
        po, pf = self.t("(", 90), self.t(")", 90)
        trou_c = Square(0.62, color=VERT_OK, stroke_width=4)
        modele = VGroup(p, trou_i, po, trou_c, pf).arrange(RIGHT, buff=0.08)
        trou_i.align_to(p, DOWN).shift(DOWN * 0.18)
        trou_c.match_y(p)
        eg = self.t("=", 80)
        v = self.t("0,8", 80, PROBA)
        ligne = VGroup(modele, eg, v).arrange(RIGHT, buff=0.25).move_to(P(2.9, -0.6))
        eg.match_y(p)
        v.align_to(p, DOWN)
        self.play(FadeIn(e, shift=UP * 0.1), run_time=0.5)
        self.au_mot("P indice")
        self.play(FadeIn(modele, scale=0.8), FadeIn(eg), TransformFromCopy(a.nombres[5], v), run_time=0.7)
        self.play(Indicate(trou_i, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE).move_to(P(2.55, -2.3))
        self.play(Write(pause))
        self.attendre_voix(marge=2.0)

    # ── 06b : correction : E barre → A barre ────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        a = self.arbre()
        self.add(a, *self.niveaux(a))
        self.au_mot("part de E barre")
        self.play(*a.etat([5]), run_time=0.6)
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.7), run_time=0.5)
        self.au_mot("va vers A barre")
        self.play(Indicate(a.lab[5], color=CHEMIN, scale_factor=1.7), run_time=0.5)
        self.au_mot("C'est P indice E barre")
        f = p_ind("E", "A", 80, barre_cond=True, barre_cible=True)
        eg = self.t("=", 80).next_to(f, RIGHT, buff=0.25)
        v = self.t("0,8", 80, PROBA).next_to(eg, RIGHT, buff=0.25)
        v.shift(UP * (f[0].get_bottom()[1] - v[0].get_bottom()[1]))
        eg.match_y(f[0])
        self.cadrer(VGroup(f, eg, v).move_to(P(3.25, 1.7)))
        self.play(FadeIn(f[0]), TransformFromCopy(a.lab[1][1], f[1]), run_time=0.7)
        self.au_mot("de A barre :")
        self.play(FadeIn(f[2][0]), FadeIn(f[2][2]), TransformFromCopy(a.lab[5], f[2][1]), run_time=0.6)
        self.play(FadeIn(eg), TransformFromCopy(a.nombres[5], v), run_time=0.5)
        self.au_mot("parmi les clients")
        ph = self.lignes([[("« Parmi les clients qui", WHITE)],
                          [("achètent un vélo classique,", WHITE)],
                          [("80 %", JAUNE_TITRE), ("ne prennent pas", WHITE)],
                          [("l'assurance. »", WHITE)]], 30, P(3.0, -0.65), buff=0.16)
        self.cadrer(ph, cx=3.0, larg=5.6)
        cad = SurroundingRectangle(VGroup(ph[0], ph[1]), color=JAUNE_TITRE, buff=0.08, stroke_width=4)
        self.play(FadeIn(ph[0], shift=UP * 0.1), FadeIn(ph[1], shift=UP * 0.1), run_time=0.6)
        self.play(Create(cad), Indicate(f[1], color=JAUNE_TITRE, scale_factor=1.8), run_time=0.6)
        self.au_mot("80 %")
        self.play(TransformFromCopy(a.nombres[5], ph[2][0]), run_time=0.6)
        self.play(FadeIn(ph[2][1:], shift=UP * 0.1), FadeIn(ph[3], shift=UP * 0.1), run_time=0.5)
        self.insister(ph[2][0], 0.3)
        ok = self.coche(taille=0.3).next_to(ph, DOWN, buff=0.35)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 32
        l1 = suite(self.t("Premier niveau :", fs, BLEU_CALCUL), self.t("probabilités simples", fs), buff=0.2)
        l2a = suite(self.t("Deuxième niveau :", fs, BLEU_CALCUL), self.t("probabilités conditionnelles", fs),
                    buff=0.2)
        l2b = suite(self.t("la branche de départ va en indice :", fs), p_ind("E", "A", fs + 14), buff=0.25)
        l2 = VGroup(l2a, l2b).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        l3 = self.t("Les branches d'un même point font 1", fs)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes[1][0].align_to(l2a, UP).shift(DOWN * 0.08)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.6, 0.55))
        self.au_mot("Au premier niveau")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(lignes[0][0]), run_time=0.4)
        self.au_mot("Au deuxième niveau")
        self.play(FadeIn(l2a, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("la branche de départ")
        self.play(FadeIn(l2b, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Indicate(l2b[1][1], color=JAUNE_TITRE, scale_factor=1.8), Create(lignes[1][0]), run_time=0.6)
        self.au_mot("Les branches qui partent")
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(lignes[2][0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        self.play(Write(self.chute("Prochaine vidéo : compléter un arbre", color=VERT_OK, font_size=32)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_premier_niveau()
        self.ecran_deuxieme_niveau()
        self.ecran_lire()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaArbreLireSTMG(ProbaArbreLireBase):
    identite = "Maths STMG — EleveAI"


class ProbaArbreLirePremiere(ProbaArbreLireBase):
    identite = "Maths 1re — EleveAI"
