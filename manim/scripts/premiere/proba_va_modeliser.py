# proba_va_modeliser.py
# EleveAI — Maths 1re spé (micro va_modeliser, notion variables_aleatoires) —
# série « Probabilités » : MODÉLISER UNE SITUATION PAR UNE VARIABLE ALÉATOIRE,
# AVEC VOIX. Paysage 16:9, ceinture MARRON. Short jumeau :
# proba_va_modeliser_short.py (orange).
#
# ⭐ Les figures du coach : la micro va_modeliser n'a pas de canvas propre ;
# on reprend ceux de la notion (banque premiere-spe/maths/variables-aleatoires
# et probabilités conditionnelles) :
#   · l'ARBRE PONDÉRÉ (carte blanche, branches grises, probabilités en bleu,
#     chemin allumé en orange), de GAUCHE à DROITE ;
#   · le TABLEAU DE LOI (en-tête sombre « xᵢ », libellé bleu clair
#     « P(X = xᵢ) », cases blanches, ligne allumée en jaune).
# ⛔ PAS D'ÉCART : un nombre ne s'écrit que quand la voix le dit.
#   Nombres calculés en Python : 20 − 2 = 18 ; 5 − 2 = 3 ; 0,2 × 0,25 = 0,05 ;
#   0,2 × 0,75 = 0,15 ; 0,05 + 0,15 + 0,8 = 1 ; défi : 10 − 3 = 7, 1 − 0,1 = 0,9.
#
# Écrans : 00 garde · 01 le ticket à gratter des tortues · 02 étape 1 : définir
# X (gain net) · 03 étape 2 : ses valeurs · 04 étape 3 : l'arbre · 05 les
# chemins · 06 le tableau de la loi · 07 le piège (oublier la mise) · 08 défi
# (tombola d'une recyclerie) · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/premiere-proba-va-modeliser.json (débit −6), calée mot à
# mot par proba_va_modeliser_marques.json (MotsCales).
# python -m manim render -qh --disable_caching manim/scripts/premiere/proba_va_modeliser.py ProbaVaModeliserPremiere -o eleveai-maths-premiere-proba-va-modeliser --media_dir manim/scripts/premiere/media-va_modeliser-1s
# Sortie : manim/sorties/premiere/maths/probabilites/39-va-modeliser/

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "terminale"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, BRANCHE, CHEMIN, ENCRE, PROBA, suite  # noqa: E402
from proba_bin_defi import MotsCales  # noqa: E402
from proba_va_loi import TableauLoi  # noqa: E402

# les nombres de l'épisode, vérifiés
assert 20 - 2 == 18 and 5 - 2 == 3 and 0 - 2 == -2
assert round(0.2 * 0.25, 4) == 0.05 and round(0.2 * 0.75, 4) == 0.15
assert round(0.05 + 0.15 + 0.8, 4) == 1 and round(1 - 0.2, 4) == 0.8 and round(1 - 0.25, 4) == 0.75
assert 10 - 3 == 7 and round(1 - 0.1, 4) == 0.9

BLEU_NB = "#60A5FA"
TICKET = "#FDE68A"
TICKET_BORD = "#B45309"
GRATTE = "#9CA3AF"
CARAPACE = "#15803D"
ECAILLE = "#4ADE80"
PEAU = "#86EFAC"
OR = "#EAB308"
ARGENT = "#CBD5E1"
MINUS = "−"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : la tortue marine, le ticket à gratter ─────────────────────

def tortue(s=1.0):
    """Une tortue marine vue de dessus : carapace à écailles, tête, nageoires."""
    nag = VGroup(
        Ellipse(width=0.9, height=0.32).rotate(0.6).move_to(P(-0.55, 0.42)),
        Ellipse(width=0.9, height=0.32).rotate(-0.6).move_to(P(0.55, 0.42)),
        Ellipse(width=0.55, height=0.24).rotate(-0.5).move_to(P(-0.42, -0.5)),
        Ellipse(width=0.55, height=0.24).rotate(0.5).move_to(P(0.42, -0.5)),
    ).set_fill(PEAU, 1).set_stroke(CARAPACE, 2)
    tete = Ellipse(width=0.34, height=0.42, fill_color=PEAU, fill_opacity=1,
                   stroke_color=CARAPACE, stroke_width=2).move_to(P(0, 0.78))
    yeux = VGroup(Dot(P(-0.08, 0.84), radius=0.035, color=ENCRE), Dot(P(0.08, 0.84), radius=0.035, color=ENCRE))
    cara = Ellipse(width=0.95, height=1.2, fill_color=CARAPACE, fill_opacity=1, stroke_color="#14532D",
                   stroke_width=3)
    ecailles = VGroup(RegularPolygon(6, radius=0.17).move_to(P(0, 0.05)),
                      *[RegularPolygon(6, radius=0.13).move_to(P(0.27 * np.cos(a), 0.05 + 0.36 * np.sin(a)))
                        for a in np.arange(0, TAU, TAU / 6)])
    ecailles.set_fill(ECAILLE, 0.85).set_stroke("#14532D", 1.5)
    return VGroup(nag, tete, yeux, cara, ecailles).scale(s)


class Ticket(VGroup):
    """Le ticket à gratter : carte jaune, petite tortue, zone grise à gratter.
    Sous la zone, ce que rapporte le ticket (`lot`), révélé par `gratter()`."""

    def __init__(self, lot="5 €", s=1.0, couleur_lot=ENCRE, fond=TICKET):
        super().__init__()
        self.carte = RoundedRectangle(width=2.8, height=1.5, corner_radius=0.14, fill_color=fond,
                                      fill_opacity=1, stroke_color=TICKET_BORD, stroke_width=3)
        self.dessin = tortue(0.5).move_to(P(-0.85, 0))
        self.lot = Text(lot, font_size=40, color=couleur_lot, weight=BOLD).move_to(P(0.5, 0))
        self.zone = RoundedRectangle(width=1.55, height=1.0, corner_radius=0.1, fill_color=GRATTE,
                                     fill_opacity=1, stroke_color="#6B7280", stroke_width=2).move_to(P(0.5, 0))
        rayures = VGroup(*[Line(P(-0.6 + 0.24 * k, -0.4), P(-0.35 + 0.24 * k, 0.4)) for k in range(6)])
        rayures.set_stroke(WHITE, 2, opacity=0.35).move_to(self.zone)
        self.cache = VGroup(self.zone, rayures)
        self.add(self.carte, self.dessin, self.lot, self.cache)
        self.scale(s)

    def gratter(self, run_time=0.7):
        """La zone grise s'efface de gauche à droite."""
        return AnimationGroup(
            *[m.animate.shift(RIGHT * 0.15).set_opacity(0) for m in self.cache],
            lag_ratio=0.15, run_time=run_time)


def piece_euro(s=1.0):
    disque = Circle(radius=0.32, fill_color=OR, fill_opacity=1, stroke_color="#A16207", stroke_width=3)
    mot = Text("€", font_size=30, color="#422006", weight=BOLD)
    return VGroup(disque, mot).scale(s)


def tableau_loi(valeurs, probas, centre, echelle=1.0, **kw):
    """Le TableauLoi du coach, placé : ses nombres (prêts, absents) suivent."""
    tb = TableauLoi(valeurs, probas, **kw)
    tb.scale(echelle).move_to(centre)
    for r in range(2):
        for j, v in enumerate(tb.val[r]):
            v.scale(echelle).move_to(tb.rect[r][j + 1])
    return tb


def p_x(texte, fs=40, color=WHITE):
    return Text(f"P(X = {texte})", font_size=fs, color=color)


# ── l'ARBRE PONDÉRÉ du coach, de GAUCHE à DROITE ────────────────────────────

class ArbreGain(VGroup):
    """Départ → gagnant / perdant ; gagnant → gros lot / petit lot.
    Branches : 0 départ → gagnant, 1 départ → perdant, 2 gagnant → gros lot,
    3 gagnant → petit lot. Les mots aux nœuds, aucune probabilité : elles se
    posent (`nombre`) quand la voix les dit. `valeur(k, texte)` pose « X = … »
    au bout des feuilles 0 gros lot, 1 petit lot, 2 perdant."""

    def __init__(self, fs=30, mots=("gagnant", "perdant", "gros lot", "petit lot"), deux_niveaux=True,
                 titre="Arbre pondéré"):
        super().__init__()
        self.fs = fs
        self.depart = Dot(P(0, 0), radius=0.08, color=ENCRE)
        pos = [P(2.6, 1.05), P(2.6, -1.15), P(5.6, 1.75), P(5.6, 0.35)]
        self.mots = [Text(m, font_size=fs, color=ENCRE, weight=BOLD) for m in mots]
        for m, p in zip(self.mots, pos):
            m.move_to(p)
        if not deux_niveaux:
            self.mots = self.mots[:2]
        bouts = [(self.depart.get_center() + P(0.08, 0.03), self.mots[0].get_left() + P(-0.12, 0)),
                 (self.depart.get_center() + P(0.08, -0.03), self.mots[1].get_left() + P(-0.12, 0))]
        if deux_niveaux:
            g = self.mots[0].get_right() + P(0.12, 0)
            bouts += [(g, self.mots[2].get_left() + P(-0.12, 0)), (g, self.mots[3].get_left() + P(-0.12, 0))]
        self.branches = [Line(a, b, color=BRANCHE, stroke_width=4) for a, b in bouts]
        tout = VGroup(self.depart, *self.branches, *self.mots)
        self.x_val = (pos[2][0] + 1.1) if deux_niveaux else (pos[0][0] + 1.4)
        larg = (self.x_val + 1.3) + 1.5
        self._larg0 = larg
        self.carte = RoundedRectangle(width=larg, height=tout.height + 1.5, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(P(larg / 2 - 0.5, tout.get_center()[1] + 0.3))
        self.titre = Text(titre, font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.mots)

    def nombre(self, k, texte, fs=None, color=PROBA):
        """La probabilité, au milieu de la branche k, du côté extérieur."""
        t = Text(texte, font_size=fs or self.fs, color=color, weight=BOLD).scale(self.ech)
        br = self.branches[k]
        a, b = br.get_start(), br.get_end()
        m = (a + b) / 2
        d = b - a
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        monte = d[1] > 0
        if (monte and n[1] < 0) or (not monte and n[1] > 0):
            n = -n
        t.move_to(m)
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.shift(n * (demi + 0.08 * self.ech))
        return t

    @property
    def ech(self):
        return self.carte.width / self._larg0

    def valeur(self, k, texte, color=VERT_OK, fs=None):
        """« X = … » au bout d'une feuille (0 gros lot, 1 petit lot, 2 perdant)."""
        cible = [self.mots[2], self.mots[3], self.mots[1]][k] if len(self.mots) > 2 else self.mots[k]
        t = Text(texte, font_size=fs or self.fs, color=color, weight=BOLD).scale(self.ech)
        feuilles = self.mots[2:] if len(self.mots) > 2 else self.mots
        x = max(m.get_right()[0] for m in feuilles) + 0.4 * self.ech
        return t.move_to(P(x + t.width / 2, cible.get_center()[1]))

    def chemin(self, ks, color=CHEMIN):
        return [self.branches[k].animate.set_stroke(color, 9) for k in ks]

    def eteindre_sauf(self, ks, op=0.25):
        anims = []
        for k, br in enumerate(self.branches):
            if k in ks:
                anims.append(br.animate.set_stroke(CHEMIN, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
        return anims


class ProbaVaModeliserBase(MotsCales, Notion6e):
    fichier_marques = "proba_va_modeliser_marques.json"
    nom_voix = "premiere-proba-va-modeliser"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "marron"

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def titre_ecran(self, texte, *avec, font_size=40):
        t = Text(texte, font_size=font_size, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t), *avec, run_time=0.8)
        return t

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg):
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Modéliser une situation", 56, JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.t("avec une variable aléatoire", 42, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.0))
        tk = Ticket("X ?", s=1.25, couleur_lot=CHEMIN).move_to(P(-0.6, -0.75))
        self.add(ech, titre, tk)
        self.au_mot("avec une variable")
        self.play(FadeIn(sous, shift=UP * 0.15), FadeIn(identite, shift=DOWN * 0.2), run_time=0.5)
        self.play(tk.gratter(0.9))
        self.insister(tk.lot)
        self.attendre_voix(marge=0.6)

    # ── 01 : le ticket à gratter des tortues ────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        to = tortue(1.7).move_to(P(-4.6, 0.9))
        self.titre_ecran("Le ticket à gratter des tortues", FadeIn(to, shift=UP * 0.2))
        fs = 44
        self.au_mot("tickets à gratter")
        tk = Ticket("?", s=1.15).move_to(P(-4.6, -1.65))
        self.play(FadeIn(tk, shift=UP * 0.2), run_time=0.5)
        self.au_mot("2 euros")
        l1 = suite(self.t("Un ticket :", fs), self.t("2 €", fs + 6, ROUGE_ERREUR), buff=0.25)
        l1.move_to(P(1.6, 1.6))
        self.play(FadeIn(l1[0], shift=RIGHT * 0.15), FadeIn(l1[1], scale=1.6), run_time=0.5)
        self.au_mot("gagne avec")
        l2 = suite(self.t("gagnant :", fs), self.t("0,2", fs + 6, BLEU_NB), buff=0.25)
        l2.next_to(l1, DOWN, buff=0.5, aligned_edge=LEFT)
        self.play(FadeIn(l2[0], shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("0,2 :")
        self.play(FadeIn(l2[1], scale=1.6), run_time=0.4)
        self.au_mot("20 euros")
        l3 = suite(self.t("alors", fs), self.t("20 €", fs + 6, VERT_OK), buff=0.25)
        l3.next_to(l2, DOWN, buff=0.5, aligned_edge=LEFT).shift(RIGHT * 0.6)
        self.play(FadeIn(l3, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("0,25")
        p25 = suite(self.t(":", fs), self.t("0,25", fs + 6, BLEU_NB), buff=0.2).next_to(l3, RIGHT, buff=0.2)
        self.play(FadeIn(p25, scale=1.6), run_time=0.4)
        self.au_mot("sinon 5")
        l4 = suite(self.t("sinon", fs), self.t("5 €", fs + 6, VERT_OK), buff=0.25)
        l4.next_to(l3, DOWN, buff=0.5, aligned_edge=LEFT)
        self.play(FadeIn(l4, shift=RIGHT * 0.15), tk.gratter(0.6), run_time=0.6)
        self.attendre_voix(marge=0.45)

    # ── 02 : étape 1, définir X ─────────────────────────────────────────────

    def ecran_definir(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-definir")
        self.titre_ecran("Étape 1 : définir X")
        fs = 48
        self.au_mot("gain net")
        l1 = suite(self.t("X =", fs + 4, JAUNE_TITRE), self.t("le gain net du joueur", fs), buff=0.3)
        l1.move_to(P(-0.3, 1.5))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.6)
        self.insister(l1[1])
        self.au_mot("ce que rapporte")
        tk = Ticket("5 €", s=1.0).move_to(P(-3.4, -0.6))
        tk.cache.set_opacity(0)
        rap = self.t("ce que rapporte le ticket", 40, VERT_OK).next_to(tk, DOWN, buff=0.3)
        self.play(FadeIn(tk, shift=UP * 0.15), FadeIn(rap, shift=UP * 0.15), run_time=0.6)
        self.au_mot("moins la mise")
        moins = self.t(MINUS, 90).move_to(P(-0.4, -0.6))
        self.play(FadeIn(moins, scale=1.6), run_time=0.4)
        self.au_mot("2 euros")
        pieces = VGroup(piece_euro(1.3), piece_euro(1.3)).arrange(RIGHT, buff=0.15).move_to(P(2.4, -0.6))
        mise = self.t("la mise : 2 €", 40, ROUGE_ERREUR).next_to(pieces, DOWN, buff=0.3)
        mise.match_y(rap)
        self.play(FadeIn(pieces, shift=DOWN * 0.3), FadeIn(mise, shift=UP * 0.15), run_time=0.6)
        self.insister(mise)
        self.attendre_voix(marge=0.45)

    # ── 03 : étape 2, les valeurs de X ──────────────────────────────────────

    def ecran_valeurs(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-valeurs")
        self.titre_ecran("Étape 2 : les valeurs de X")
        fs = 50
        rangs = [("Gros lot :", "20", "18", VERT_OK, "20 €", OR, 1.45),
                 ("Petit lot :", "5", "3", VERT_OK, "5 €", ARGENT, 0.0),
                 ("Perdant :", "0", MINUS + "2", ROUGE_ERREUR, "0 €", GRATTE, -1.45)]
        mots = [("Gros lot", "20 moins", "18."), ("Petit lot", "5 moins", "3. Perdant"),
                ("Perdant", "0 moins 2, moins", "moins 2.")]
        for (mot, g, x, c, lot, fond, y), (cle, m_calc, m_res) in zip(rangs, mots):
            self.au_mot(cle)
            tk = Ticket(lot, s=0.62, fond=fond).move_to(P(-5.2, y))
            tk.cache.set_opacity(0)
            lab = self.t(mot, fs - 6).next_to(tk, RIGHT, buff=0.3)
            calc = suite(self.t("X =", fs, JAUNE_TITRE), self.t(g, fs, BLEU_NB), self.t(MINUS, fs),
                         self.t("2", fs, ROUGE_ERREUR), buff=0.22)
            calc.move_to(P(0.6, y), aligned_edge=LEFT)
            res = suite(self.t("=", fs), self.t(x, fs + 8, c), buff=0.22)
            res.next_to(calc, RIGHT, buff=0.22)
            self.play(FadeIn(tk, shift=RIGHT * 0.2), FadeIn(lab, shift=RIGHT * 0.2), run_time=0.45)
            self.au_mot(m_calc)
            self.play(FadeIn(calc[:2], scale=1.3), run_time=0.3)
            self.play(FadeIn(calc[2:], shift=LEFT * 0.1), run_time=0.35)
            self.au_mot(m_res)
            self.play(FadeIn(res[0]), FadeIn(res[1], scale=1.8), run_time=0.45)
        self.attendre_voix(marge=0.45)

    # ── 04 : étape 3, l'arbre ───────────────────────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-arbre")
        a = ArbreGain(fs=34)
        a.move_to(P(-0.7, -0.2))
        self.titre_ecran("Étape 3 : l'arbre", FadeIn(a.carte), FadeIn(a.titre), FadeIn(a.depart))
        self.au_mot("Gagnant, 0,2")
        self.play(Create(a.branches[0]), FadeIn(a.mots[0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("0,2 ;")
        n0 = a.nombre(0, "0,2")
        self.play(FadeIn(n0, scale=1.6), run_time=0.35)
        self.au_mot("perdant, 0,8")
        self.play(Create(a.branches[1]), FadeIn(a.mots[1], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("0,8.")
        n1 = a.nombre(1, "0,8")
        self.play(FadeIn(n1, scale=1.6), run_time=0.35)
        self.au_mot("Puis gros lot")
        self.play(Indicate(a.mots[0], color=CHEMIN, scale_factor=1.3), run_time=0.5)
        self.au_mot("lot, 0,25")
        self.play(Create(a.branches[2]), FadeIn(a.mots[2], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("0,25 ;")
        n2 = a.nombre(2, "0,25")
        self.play(FadeIn(n2, scale=1.6), run_time=0.35)
        self.au_mot("petit lot, 0,75")
        self.play(Create(a.branches[3]), FadeIn(a.mots[3], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("0,75.")
        n3 = a.nombre(3, "0,75")
        self.play(FadeIn(n3, scale=1.6), run_time=0.35)
        self.attendre_voix(marge=0.45)

    def arbre_complet(self, s=0.68, centre=P(-3.45, 0.15)):
        a = ArbreGain(fs=34)
        nb = VGroup(*[a.nombre(k, t) for k, t in enumerate(["0,2", "0,8", "0,25", "0,75"])])
        a.add(nb)
        a.nb = nb
        a.scale(s).move_to(centre)
        return a

    # ── 05 : les chemins ────────────────────────────────────────────────────

    def ecran_chemins(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-chemins")
        a = self.arbre_complet()
        self.add(a)
        self.titre_ecran("Un chemin, une probabilité")
        fs = 40
        X0, LARG = 0.7, 6.2
        lignes = [
            (["P(X = 18)", "=", "0,2", "×", "0,25", "=", "0,05"], 1.75, [2]),
            (["P(X = 3)", "=", "0,2", "×", "0,75", "=", "0,15"], 0.15, [3]),
            (["P(X = " + MINUS + "2)", "=", "0,8"], -1.45, [1]),
        ]
        objs = []
        for morceaux, y, _ in lignes:
            cols = [WHITE] * len(morceaux)
            for i, m in enumerate(morceaux):
                if m[0].isdigit() and i > 0:
                    cols[i] = BLEU_NB
            cols[-1] = VERT_OK
            g = suite(*[self.t(m, fs, c) for m, c in zip(morceaux, cols)], buff=0.16)
            self.caser(g, LARG).move_to(P(X0, y), aligned_edge=LEFT)
            objs.append(g)
        # P(X = 18) : gagnant puis gros lot
        self.au_mot("égale 18")
        v0 = a.valeur(0, "X = 18")
        self.play(FadeIn(objs[0][0], shift=RIGHT * 0.15), FadeIn(v0, scale=1.5), run_time=0.5)
        self.au_mot("gagnant puis")
        self.play(*a.eteindre_sauf([0, 2]), run_time=0.6)
        self.au_mot("0,2 fois 0,25")
        self.play(FadeIn(objs[0][1]), TransformFromCopy(a.nb[0], objs[0][2]), run_time=0.5)
        self.play(FadeIn(objs[0][3]), TransformFromCopy(a.nb[2], objs[0][4]), run_time=0.5)
        self.au_mot("0,05")
        self.play(FadeIn(objs[0][5]), FadeIn(objs[0][6], scale=1.8), run_time=0.45)
        # P(X = 3) : gagnant puis petit lot
        self.au_mot("égale 3")
        v1 = a.valeur(1, "X = 3")
        self.play(FadeIn(objs[1][0], shift=RIGHT * 0.15), FadeIn(v1, scale=1.5), *a.eteindre_sauf([0, 3]),
                  run_time=0.6)
        self.au_mot("0,2 fois 0,75")
        self.play(FadeIn(objs[1][1]), TransformFromCopy(a.nb[0], objs[1][2]), run_time=0.5)
        self.play(FadeIn(objs[1][3]), TransformFromCopy(a.nb[3], objs[1][4]), run_time=0.5)
        self.au_mot("0,15")
        self.play(FadeIn(objs[1][5]), FadeIn(objs[1][6], scale=1.8), run_time=0.45)
        # P(X = −2) : perdant
        self.au_mot("égale moins 2")
        v2 = a.valeur(2, "X = " + MINUS + "2", color=ROUGE_ERREUR)
        self.play(FadeIn(objs[2][0], shift=RIGHT * 0.15), FadeIn(v2, scale=1.5), *a.eteindre_sauf([1]),
                  run_time=0.6)
        self.au_mot("0,8.")
        self.play(FadeIn(objs[2][1]), TransformFromCopy(a.nb[1], objs[2][2]), run_time=0.5)
        self.insister(objs[2][2])
        self.attendre_voix(marge=0.45)

    # ── 06 : le tableau de la loi ───────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-tableau")
        tab = tableau_loi([MINUS + "2", "3", "18"], ["0,8", "0,15", "0,05"], P(-0.6, 0.55), 1.15,
                          larg_lab=3.4, larg=2.3, fs=32)
        self.titre_ecran("La loi de X", FadeIn(tab, shift=UP * 0.15))
        for v, p, j in (("Moins 2", "0,8.", 0), ("3 :", "0,15", 1), ("18 :", "0,05", 2)):
            self.au_mot(v)
            self.play(tab.poser(0, j), run_time=0.35)
            self.au_mot(p)
            self.play(tab.poser(1, j), Indicate(tab.colonne(j), color=CHEMIN, scale_factor=1.05), run_time=0.45)
        self.au_mot("La somme")
        somme = suite(self.t("La somme", 50), self.t("=", 50), self.t("1", 62, VERT_OK), buff=0.3)
        somme.move_to(P(-0.9, -1.75))
        self.play(*tab.allumer_ligne(1), FadeIn(somme[:2], shift=UP * 0.15), run_time=0.6)
        self.au_mot("bien 1")
        c = self.coche(taille=0.32).next_to(somme, RIGHT, buff=0.4)
        self.play(FadeIn(somme[2], scale=1.8), Create(c), run_time=0.5)
        self.insister(somme[2])
        self.attendre_voix(marge=0.45)

    # ── 07 : le piège, oublier la mise ──────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        self.titre_ecran("Le piège : oublier la mise")
        lots = [("20 €", OR), ("5 €", ARGENT), ("0 €", GRATTE)]
        tks = VGroup(*[Ticket(l, s=0.95, fond=f) for l, f in lots]).arrange(RIGHT, buff=1.0).move_to(P(-0.9, 1.05))
        for tk in tks:
            tk.cache.set_opacity(0)
        self.play(LaggedStart(*[FadeIn(tk, shift=UP * 0.2) for tk in tks], lag_ratio=0.2), run_time=0.8)
        fs = 52
        self.au_mot("20, 5 et 0")
        faux = VGroup(*[self.t(v, fs + 6, ROUGE_ERREUR).next_to(tk, DOWN, buff=0.4) for v, tk in zip(["20", "5", "0"], tks)])
        self.play(LaggedStart(*[FadeIn(f, scale=1.6) for f in faux], lag_ratio=0.3), run_time=0.8)
        self.au_mot("ce que rapporte")
        rap = self.t("ce que rapporte le ticket", 40, ROUGE_ERREUR).move_to(P(-0.9, -1.25))
        self.play(FadeIn(rap, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mais les 2 euros")
        tampons = VGroup()
        for tk in tks:
            t = Text(MINUS + "2 €", font_size=40, color=WHITE, weight=BOLD)
            fond = RoundedRectangle(width=t.width + 0.3, height=t.height + 0.24, corner_radius=0.1,
                                    fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
            tampons.add(VGroup(fond, t.move_to(fond)).rotate(0.18).move_to(tk.get_corner(UR) + P(-0.25, 0.05)))
        self.play(LaggedStart(*[FadeIn(tp, scale=2.2) for tp in tampons], lag_ratio=0.25), run_time=0.9)
        self.au_mot("dans tous les cas")
        tous = self.t("payés dans tous les cas", 44, JAUNE_TITRE).move_to(P(-0.9, -2.2))
        croix = VGroup(*[Line(f.get_left() + P(-0.15, 0), f.get_right() + P(0.15, 0)) for f in faux])
        croix.set_stroke(ROUGE_ERREUR, 7)
        self.play(FadeIn(tous, shift=UP * 0.15), Create(croix), run_time=0.6)
        self.au_mot("même quand on gagne")
        self.insister(VGroup(tks[0], tampons[0]))
        self.attendre_voix(marge=0.8)

    # ── 08 : défi : la tombola de la recyclerie ─────────────────────────────

    def recyclage(self, s=1.0):
        """Le symbole du recyclage : trois flèches en triangle."""
        pts = [P(0, 0.85), P(0.74, -0.43), P(-0.74, -0.43)]
        fl = VGroup()
        for i in range(3):
            a, b = pts[i], pts[(i + 1) % 3]
            d = b - a
            fl.add(Arrow(a + 0.18 * d, b - 0.12 * d, buff=0, color=VERT_OK, stroke_width=10,
                         max_tip_length_to_length_ratio=0.35))
        return fl.scale(s)

    def billet(self, s=1.0):
        carte = RoundedRectangle(width=3.0, height=1.6, corner_radius=0.14, fill_color="#DCFCE7", fill_opacity=1,
                                 stroke_color="#15803D", stroke_width=3)
        pointilles = DashedLine(P(0.5, -0.8), P(0.5, 0.8), color="#15803D", dash_length=0.08)
        sym = self.recyclage(0.85).move_to(P(-0.55, -0.05))
        mot = Text("tombola", font_size=26, color="#15803D", weight=BOLD).rotate(PI / 2)
        mot.scale_to_fit_height(1.25).move_to(P(1.0, 0))
        return VGroup(carte, pointilles, sym, mot).scale(s)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        fs = 46
        self.au_mot("Un billet")
        b = self.billet(1.3).move_to(P(-4.3, 0.9))
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.5)
        self.au_mot("3 euros")
        l1 = suite(self.t("Un billet :", fs), self.t("3 €", fs + 6, ROUGE_ERREUR), buff=0.25).move_to(P(1.5, 1.7))
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("10 euros")
        l2 = suite(self.t("il rapporte", fs), self.t("10 €", fs + 6, VERT_OK), buff=0.25)
        l2.next_to(l1, DOWN, buff=0.45, aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("0,1")
        p1 = suite(self.t(":", fs), self.t("0,1", fs + 6, BLEU_NB), buff=0.2).next_to(l2, RIGHT, buff=0.3)
        self.play(FadeIn(p1, scale=1.6), run_time=0.4)
        self.au_mot("sinon rien")
        l3 = self.t("sinon : rien", fs).next_to(l2, DOWN, buff=0.45, aligned_edge=LEFT)
        self.play(FadeIn(l3, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("La loi du gain net")
        q = self.t("La loi du gain net X ?", 52, ORANGE_RETENUE).move_to(P(-1.0, -1.3))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.insister(q, 0.25)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(-1.4, -2.55))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=1.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        a = ArbreGain(fs=34, deux_niveaux=False)
        a.scale(0.78).move_to(P(-3.6, 0.5))
        tab = tableau_loi([MINUS + "3", "7"], ["0,9", "0,1"], P(-1.8, -2.05), 1.0, larg_lab=3.4, larg=2.1, fs=32)
        self.titre_ecran("Correction", FadeIn(a.carte), FadeIn(a.titre), FadeIn(a.depart), FadeIn(tab))
        fs = 48
        self.au_mot("Gagnant")
        self.play(Create(a.branches[0]), FadeIn(a.mots[0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("10 moins 3")
        calc = suite(self.t("10", fs, BLEU_NB), self.t(MINUS, fs), self.t("3", fs, ROUGE_ERREUR), self.t("=", fs),
                     self.t("7", fs + 10, VERT_OK), buff=0.22).move_to(P(3.2, 1.35))
        self.play(FadeIn(calc[:3], shift=UP * 0.15), run_time=0.5)
        self.au_mot("7, prob")
        v7 = a.valeur(0, "X = 7")
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=1.8), FadeIn(v7, scale=1.5), tab.poser(0, 1), run_time=0.5)
        self.au_mot("0,1.")
        n0 = a.nombre(0, "0,1")
        self.play(FadeIn(n0, scale=1.6), tab.poser(1, 1), run_time=0.5)
        self.au_mot("Perdant")
        self.play(Create(a.branches[1]), FadeIn(a.mots[1], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("moins 3, prob")
        v3 = a.valeur(1, "X = " + MINUS + "3", color=ROUGE_ERREUR)
        self.play(FadeIn(v3, scale=1.5), tab.poser(0, 0), run_time=0.5)
        self.au_mot("0,9.")
        n1 = a.nombre(1, "0,9")
        self.play(FadeIn(n1, scale=1.6), tab.poser(1, 0), run_time=0.5)
        self.insister(tab)
        self.attendre_voix(marge=0.45)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 44
        l1 = suite(self.t("X, le gain net :", fs, JAUNE_TITRE), self.t("gain " + MINUS + " mise", fs, ROUGE_ERREUR),
                   buff=0.3)
        l2 = self.t("Ses valeurs", fs)
        l3 = suite(self.t("Leurs probabilités :", fs), self.t("l'arbre", fs, BLEU_CALCUL),
                   buff=0.3)
        l4 = suite(self.t("La somme fait", fs), self.t("1", fs + 6, VERT_OK), buff=0.3)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3, l4)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.9, -0.1))
        for mot, l in zip(["X, le gain", "Ses valeurs", "leurs probabilités", "Et la somme"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 10 : la fin (modèle proba_au_moins_un.py) ───────────────────────────

    def page_abonnement(self, voix="10-abonne"):
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
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_definir()
        self.ecran_valeurs()
        self.ecran_arbre()
        self.ecran_chemins()
        self.ecran_tableau()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="10-abonne")


class ProbaVaModeliserPremiere(ProbaVaModeliserBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "marron"
