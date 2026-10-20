# proba2_arbre_chemins.py
# EleveAI — Maths 2de — série « Probabilités », épisode 10 : les CHEMINS de
# l'arbre (micro : proba_arbre_chemins), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba2_arbre_chemins_short.py
# (ceinture orange : « 90 % et 80 % : donc 85 % ? »).
#
# Écrans : 00 garde · 01 le trail de Cilaos, l'arbre construit branche par
# branche (0,7 ; 0,9 ; 0,3 ; 0,8) · 02 un chemin = une intersection :
# 0,7 × 0,9 = 0,63 au bout de la feuille, P(R ∩ F) · 03 P(F) : deux chemins,
# 0,63 + 0,24 = 0,87 · 04 les quatre chemins font 1 · 05 87 % des coureurs
# (100 coureurs, 87 allumés) · 06 le piège : 0,9 + 0,8 barré, les branches
# du premier niveau n'ont pas le même poids · 07 défi (abandon) ·
# 07b correction (0,07 + 0,06 = 0,13 ; ou 1 − 0,87) · 08 ce que tu as appris ·
# 09 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! @eleveai974 »).
#
# ⭐ Canvas du coach repris : arbre_proba (lib/canvas/ArbreProbabilitesCanvas.tsx,
# tel que le dessine probabilites-conditionnelles.bank.ts, fonction arbre()) :
# carte blanche titrée « R : … · F : … », point de départ sombre, branches gris
# ardoise #475569, probabilités DÉCIMALES en bleu #2563eb le long des branches,
# feuilles étiquetées par la lettre (F, F̄) à DROITE, nœuds R / R̄. Le chemin
# calculé s'allume, son produit s'écrit au bout de la feuille.
#
# Voix : manim/voix/seconde-proba-arbre-chemins.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_arbre_chemins.py Proba2ArbreChemins -o eleveai-maths-seconde-proba-arbre-chemins --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/10-arbre-chemins/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Les couleurs du canvas arbre_proba du coach.
ENCRE = "#0F172A"         # slate-900 : départ, étiquettes
BRANCHE = "#475569"       # slate-600 : les branches
PROBA = "#2563EB"         # blue-600 : les probabilités des branches
BORD_CARTE = "#E2E8F0"    # slate-200
# Les quatre chemins, chacun sa couleur.
C_RF = "#F59E0B"          # R puis F (orange)
C_RNF = "#EC4899"         # R puis F̄ (rose)
C_NRF = "#7C3AED"         # R̄ puis F (violet)
C_NRNF = "#0D9488"        # R̄ puis F̄ (sarcelle)
COUL = [C_RF, C_RNF, C_NRF, C_NRNF]
ETEINT = 0.2


class NotionSeconde10(Notion6e):
    identite = "Maths 2de — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def lettre(l, fs=34, color=ENCRE, barre=False, bold=True):
    """Une lettre d'événement, avec sa barre si c'est le contraire (R̄, F̄)."""
    t = Text(l, font_size=fs, color=color, weight=BOLD if bold else NORMAL)
    if not barre:
        return VGroup(t)
    y = t.get_top()[1] + fs * 0.0035
    b = Line(P(t.get_left()[0] + 0.01, y), P(t.get_right()[0] - 0.01, y), color=color,
             stroke_width=max(2.0, fs / 12))
    return VGroup(t, b)


def nota(texte, fs=40, color=WHITE, barres=()):
    """Une notation en UN Text : « P(R ∩ F) » ; `barres` = indices des
    caractères (sans les espaces) à surligner (F̄)."""
    T = Text(texte, font_size=fs, color=color)
    g = VGroup(T)
    for i in barres:
        c = T[i]
        y = c.get_top()[1] + fs * 0.003
        g.add(Line(P(c.get_left()[0] + 0.01, y), P(c.get_right()[0] - 0.01, y), color=color,
                   stroke_width=max(2.0, fs / 13)))
    return g


# ── l'ARBRE pondéré du coach (arbre_proba) : R / R̄, puis F / F̄ ────────────────

PROBAS = ["0,7", "0,3", "0,9", "0,1", "0,8", "0,2"]   # b1[0], b1[1], b2[0..3]


class ArbreCoach(VGroup):
    """La carte blanche du coach. Chemins : 0 = R→F, 1 = R→F̄, 2 = R̄→F, 3 = R̄→F̄ ;
    b2[k] est la 2e branche du chemin k, b1[k // 2] la 1re.
    Le groupe ne contient que la carte et son titre : la scène fait apparaître
    les morceaux (depart, b1, b2, l1, l2, q1, q2) quand la voix les dit."""

    def __init__(self, centre=P(-3.55, -0.4), dx=2.3, dy1=1.3, dy2=0.66, fs=30, lab_fs=38,
                 titre="R : réunionnais · F : finit la course", sw=4, ecart=0.27, titre_fs=21):
        super().__init__()
        r = P(0, 0)
        self.racine = r
        self.n1 = [r + P(dx, dy1), r + P(dx, -dy1)]
        self.n2 = [self.n1[0] + P(dx, dy2), self.n1[0] + P(dx, -dy2),
                   self.n1[1] + P(dx, dy2), self.n1[1] + P(dx, -dy2)]
        self.sw = sw
        self.depart = Dot(r, radius=0.08, color=ENCRE)
        self.b1 = VGroup(*[Line(r, p, stroke_width=sw, color=BRANCHE) for p in self.n1])
        self.b2 = VGroup(*[Line(self.n1[k // 2], p, stroke_width=sw, color=BRANCHE)
                           for k, p in enumerate(self.n2)])
        # nœuds intérieurs : R au-dessus, R̄ dessous ; feuilles : à DROITE
        self.l1 = VGroup(*[lettre("R", lab_fs, barre=k == 1).next_to(p, UP if k == 0 else DOWN, buff=0.12)
                           for k, p in enumerate(self.n1)])
        self.l2 = VGroup(*[lettre("F", lab_fs, barre=k % 2 == 1) for k in range(4)])
        for l, p in zip(self.l2, self.n2):
            l.next_to(p, RIGHT, buff=0.14)
            l.shift(UP * (p[1] - l[0].get_center()[1]))
        self.q1 = VGroup(*[self._proba(PROBAS[k], b, k == 0, fs, ecart) for k, b in enumerate(self.b1)])
        self.q2 = VGroup(*[self._proba(PROBAS[2 + k], b, k % 2 == 0, fs, ecart)
                           for k, b in enumerate(self.b2)])
        tout = VGroup(self.depart, self.b1, self.b2, self.l1, self.l2, self.q1, self.q2)
        self.titre = Text(titre, font_size=titre_fs, color=ENCRE, weight=BOLD) if titre else VGroup()
        h_t = (self.titre.height + 0.2) if titre else 0.0
        larg = max(tout.width, self.titre.width if titre else 0) + 0.6
        self.carte = RoundedRectangle(width=larg, height=tout.height + 0.45 + h_t, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD_CARTE, stroke_width=2)
        self.carte.move_to(tout).shift(UP * h_t / 2)
        if titre:
            self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.add(self.carte, self.titre)
        self.q2_vis = set()
        d = centre - self.carte.get_center()
        self.shift(d)
        tout.shift(d)
        self.racine = self.racine + d
        self.n1 = [p + d for p in self.n1]
        self.n2 = [p + d for p in self.n2]

    @staticmethod
    def _proba(texte, branche, haut, fs, ecart):
        t = Text(texte, font_size=fs, color=PROBA, weight=BOLD)
        dd = branche.get_end() - branche.get_start()
        n = np.array([-dd[1], dd[0], 0.0])
        n = n / np.linalg.norm(n)
        if n[1] < 0:
            n = -n
        return t.move_to(branche.get_center() + n * (ecart if haut else -ecart))

    def complet(self, q2=(0, 2)):
        """Tout l'arbre ; seules les probabilités de 2e niveau `q2` sont écrites
        (0,1 et 0,2 ne sont dites qu'à la correction)."""
        self.q2_vis = set(q2)
        return VGroup(self, self.depart, self.b1, self.b2, self.l1, self.l2, self.q1,
                      *[self.q2[k] for k in q2])

    def chemin(self, k):
        return VGroup(self.b1[k // 2], self.b2[k])

    def bout(self, k, texte, color=None, fs=30, buff=0.22):
        """Le produit écrit AU BOUT du chemin k, à droite de la carte."""
        t = Text(texte, font_size=fs, color=color or COUL[k], weight=BOLD)
        return t.move_to(P(self.carte.get_right()[0] + buff + t.width / 2, self.n2[k][1]))

    def eteindre(self, garder=(), opacite=ETEINT):
        """Seuls les chemins `garder` restent nets, le reste s'estompe."""
        anims = []
        for k in range(4):
            if k not in garder:
                anims += [self.b2[k].animate.set_stroke(opacity=opacite), self.l2[k].animate.set_opacity(opacite)]
                if k in self.q2_vis:
                    anims.append(self.q2[k].animate.set_opacity(opacite))
        for i in range(2):
            if not any(k // 2 == i for k in garder):
                anims += [self.b1[i].animate.set_stroke(opacity=opacite),
                          self.l1[i].animate.set_opacity(opacite), self.q1[i].animate.set_opacity(opacite)]
        return anims

    def allumer(self, k, color=None, sw=9):
        return [b.animate.set_stroke(color or COUL[k], sw, opacity=1) for b in self.chemin(k)]

    def colorier(self, k, color=None, sw=9):
        """Sans animation (rappel d'un écran précédent)."""
        for b in self.chemin(k):
            b.set_stroke(color or COUL[k], sw, opacity=1)


# ── le décor : le cirque de Cilaos et un coureur ────────────────────────────

def montagnes(larg=5.4, haut=1.9):
    """Les remparts du cirque : deux plans de crêtes, du vert sombre au vert."""
    fond = Polygon(P(-larg / 2, 0), P(-larg * 0.38, haut * 0.75), P(-larg * 0.22, haut * 0.55),
                   P(-larg * 0.05, haut), P(larg * 0.12, haut * 0.62), P(larg * 0.3, haut * 0.88),
                   P(larg / 2, haut * 0.4), P(larg / 2, 0),
                   fill_color="#14532D", fill_opacity=1, stroke_width=0)
    devant = Polygon(P(-larg / 2, 0), P(-larg * 0.3, haut * 0.42), P(-larg * 0.1, haut * 0.25),
                     P(larg * 0.12, haut * 0.5), P(larg * 0.35, haut * 0.3), P(larg / 2, haut * 0.45),
                     P(larg / 2, 0), fill_color="#15803D", fill_opacity=1, stroke_width=0)
    return VGroup(fond, devant)


def coureur(color=ORANGE_RETENUE, s=1.0):
    """Un coureur en pleine foulée, maillot coloré. Hauteur ≈ 1,2 × s."""
    peau = "#C68642"
    tete = Circle(radius=0.13, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0.1, 0.5))
    corps = Line(P(0.05, 0.36), P(-0.05, -0.05), stroke_width=12, color=color)
    bras = VGroup(Line(P(0.03, 0.28), P(0.28, 0.1), stroke_width=7, color=peau),
                  Line(P(0.03, 0.28), P(-0.22, 0.12), stroke_width=7, color=peau))
    jambes = VGroup(Line(P(-0.05, -0.05), P(0.22, -0.32), stroke_width=8, color="#CBD5E1"),
                    Line(P(0.22, -0.32), P(0.2, -0.62), stroke_width=8, color="#CBD5E1"),
                    Line(P(-0.05, -0.05), P(-0.28, -0.3), stroke_width=8, color="#CBD5E1"),
                    Line(P(-0.28, -0.3), P(-0.45, -0.5), stroke_width=8, color="#CBD5E1"))
    return VGroup(jambes, bras, corps, tete).scale(s)


# ── la vidéo ────────────────────────────────────────────────────────────────

C_ARBRE = P(-3.55, -0.4)   # le centre de la carte de l'arbre
X_D = 1.2                  # le bord gauche de la zone des calculs


class Proba2ArbreChemins(NotionSeconde10):
    nom_voix = "seconde-proba-arbre-chemins"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.2):
        """Une ligne en morceaux colorés ; un morceau peut déjà être un Mobject."""
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.35, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=color)

    def poser(self, mob, x, y, droite=6.7):
        """Bord gauche en x, centré en y ; réduit s'il dépasserait `droite`."""
        if mob.width > droite - x:
            mob.scale_to_fit_width(droite - x)
        mob.move_to(P(x + mob.width / 2, y))
        return mob

    def arbre(self, q2=(0, 2), **kw):
        A = ArbreCoach(centre=C_ARBRE, **kw)
        self.add(A.complet(q2))
        return A

    def suivre(self, A, k, color=None, run_time=0.9):
        """Un point lumineux parcourt le chemin k, qui s'allume derrière lui."""
        color = color or COUL[k]
        trajet = VMobject().set_points_as_corners([A.racine, A.n1[k // 2], A.n2[k]])
        d = Dot(A.racine, radius=0.12, color=color)
        self.add(d)
        self.play(MoveAlongPath(d, trajet), *A.allumer(k, color), run_time=run_time, rate_func=linear)
        self.play(FadeOut(d, scale=2), run_time=0.2)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les chemins de l'arbre", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        A = ArbreCoach(centre=P(-2.6, -0.25), dx=1.35, dy1=0.72, dy2=0.36, fs=18, lab_fs=24,
                       titre=None)
        self.play(FadeIn(A), FadeIn(A.depart), Create(A.b1), Create(A.b2), FadeIn(A.l1), FadeIn(A.l2),
                  run_time=0.8)
        self.au_mot("multiplier")
        self.suivre(A, 0, run_time=0.6)
        fois = self.t("×", 90, C_RF).move_to(P(1.4, -0.25))
        self.play(FadeIn(fois, scale=0.4), run_time=0.3)
        self.insister(fois, 0.25)
        self.au_mot("puis additionner")
        self.suivre(A, 2, run_time=0.6)
        plus = self.t("+", 90, VERT_OK).move_to(P(3.2, -0.25))
        self.play(FadeIn(plus, scale=0.4), run_time=0.3)
        self.insister(plus, 0.25)
        self.attendre_voix(marge=1.0)

    # ── 01 : le trail de Cilaos ─────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le trail de Cilaos")
        m = montagnes(4.6, 1.6).move_to(P(3.7, 1.35))
        sentier = VMobject(stroke_color="#FDE68A", stroke_width=4).set_points_smoothly(
            [P(1.6, 0.55), P(2.8, 0.85), P(3.6, 0.65), P(4.6, 1.1), P(5.8, 0.95)])
        A = ArbreCoach(centre=C_ARBRE)
        self.play(FadeIn(m, shift=UP * 0.2), Create(sentier), FadeIn(A), FadeIn(A.depart, scale=0.5),
                  run_time=0.7)
        cr = coureur(ORANGE_RETENUE, 0.8).move_to(P(1.7, 0.95))
        self.add(cr)
        self.play(MoveAlongPath(cr, sentier.copy().shift(UP * 0.42)), run_time=2.0, rate_func=linear)
        self.au_mot("R, 0,7")
        self.play(Create(A.b1[0]), FadeIn(A.l1[0], scale=0.6), run_time=0.4)
        self.play(FadeIn(A.q1[0], scale=0.5), run_time=0.3)
        self.au_mot("puis F, 0,9")
        self.play(Create(A.b2[0]), FadeIn(A.l2[0], shift=LEFT * 0.1), Create(A.b2[1]), FadeIn(A.l2[1]),
                  run_time=0.4)
        self.play(FadeIn(A.q2[0], scale=0.5), run_time=0.3)
        self.insister(A.q2[0], 0.25)
        self.au_mot("R barre, 0,3")
        self.play(Create(A.b1[1]), FadeIn(A.l1[1], scale=0.6), run_time=0.4)
        self.play(FadeIn(A.q1[1], scale=0.5), run_time=0.3)
        self.au_mot("puis F, 0,8")
        self.play(Create(A.b2[2]), FadeIn(A.l2[2], shift=LEFT * 0.1), Create(A.b2[3]), FadeIn(A.l2[3]),
                  run_time=0.4)
        self.play(FadeIn(A.q2[2], scale=0.5), run_time=0.3)
        self.insister(A.q2[2], 0.25)
        self.attendre_voix()

    # ── 02 : un chemin = une intersection ───────────────────────────────────

    def ecran_chemin(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-chemin")
        self.titre_ecran("Un chemin")
        A = self.arbre()
        X = X_D + 0.4
        self.au_mot("c'est une intersection")
        r = self.ligne([("un chemin", C_RF), ("=", WHITE), ("une intersection", WHITE)], 32, 0.2)
        self.poser(r, X - 0.3, 1.55)
        self.play(FadeIn(r, shift=UP * 0.1), run_time=0.5)
        self.au_mot("R puis F")
        self.play(*A.eteindre(garder=(0,)), run_time=0.4)
        self.suivre(A, 0)
        self.au_mot("0,7 fois 0,9")
        calc = self.ligne([("0,7", PROBA), ("×", WHITE), ("0,9", PROBA)], 50, 0.22)
        self.poser(calc, X, 0.45)
        self.play(FadeIn(calc[0], shift=UP * 0.1), Indicate(A.q1[0], color=C_RF), run_time=0.45)
        self.play(FadeIn(calc[1:], shift=UP * 0.1), Indicate(A.q2[0], color=C_RF), run_time=0.45)
        self.au_mot("soit 0,63")
        res = self.ligne([("=", WHITE), ("0,63", C_RF)], 50, 0.22).next_to(calc, RIGHT, buff=0.22)
        b = A.bout(0, "0,63")
        self.play(FadeIn(res, scale=0.6), FadeIn(b, shift=LEFT * 0.2), run_time=0.45)
        self.insister(b, 0.3)
        self.au_mot("C'est P de R inter F")
        n = VGroup(nota("P(R ∩ F)", 50, JAUNE_TITRE), self.t("=", 50), self.t("0,63", 50, C_RF))
        n.arrange(RIGHT, buff=0.22)
        self.poser(n, X, -0.75)
        self.play(FadeIn(n, shift=UP * 0.15), run_time=0.5)
        self.insister(n[0], 0.35)
        self.attendre_voix()

    # ── 03 : P(F) : deux chemins, on additionne ─────────────────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-somme")
        self.titre_ecran("Les chemins qui mènent à F")
        A = self.arbre()
        A.colorier(0)
        b0 = A.bout(0, "0,63")
        self.add(b0)
        X = X_D + 0.4
        self.au_mot("P de F")
        l0 = nota("P(F)", 54, JAUNE_TITRE)
        self.poser(l0, X - 0.3, 1.65)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("deux chemins mènent à F")
        self.play(*A.eteindre(garder=(0, 2)), run_time=0.4)
        self.suivre(A, 2, run_time=0.8)
        self.play(*[Indicate(A.l2[k], color=JAUNE_TITRE, scale_factor=1.6) for k in (0, 2)], run_time=0.6)
        self.au_mot("0,63 plus 0,3 fois 0,8")
        l1 = self.ligne([("=", WHITE), ("0,63", C_RF), ("+", WHITE), ("0,3", PROBA), ("×", WHITE),
                         ("0,8", PROBA)], 44, 0.2)
        self.poser(l1, X, 0.6)
        self.play(FadeIn(l1[:3], shift=UP * 0.1), Indicate(b0, color=WHITE), run_time=0.45)
        self.play(FadeIn(l1[3:], shift=UP * 0.1), Indicate(A.q1[1], color=C_NRF),
                  Indicate(A.q2[2], color=C_NRF), run_time=0.5)
        self.au_mot("0,63 plus 0,24")
        l2 = self.ligne([("=", WHITE), ("0,63", C_RF), ("+", WHITE), ("0,24", C_NRF)], 44, 0.2)
        self.poser(l2, X, -0.45)
        b2 = A.bout(2, "0,24")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(b2, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot(": 0,87")
        l3 = self.ligne([("=", WHITE), ("0,87", VERT_OK)], 56, 0.25)
        self.poser(l3, X, -1.6)
        self.play(FadeIn(l3, scale=0.6), run_time=0.4)
        self.play(Create(SurroundingRectangle(l3[1], color=VERT_OK, buff=0.12)), run_time=0.35)
        self.insister(l3[1], 0.35)
        self.attendre_voix()

    # ── 04 : les quatre chemins font 1 ──────────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-verifier")
        self.titre_ecran("On vérifie")
        A = self.arbre()
        for k in (0, 2):
            A.colorier(k)
        b = {0: A.bout(0, "0,63"), 2: A.bout(2, "0,24")}
        self.add(b[0], b[2])
        X = X_D + 0.4
        self.au_mot("les quatre chemins")
        self.suivre(A, 1, run_time=0.6)
        self.suivre(A, 3, run_time=0.6)
        self.au_mot("0,63 plus 0,07")
        l1 = self.ligne([("0,63", C_RF), ("+", WHITE), ("0,07", C_RNF)], 46, 0.22)
        self.poser(l1, X, 1.0)
        b[1] = A.bout(1, "0,07")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(b[0], color=WHITE), run_time=0.35)
        self.play(FadeIn(l1[1:], shift=UP * 0.1), FadeIn(b[1], shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("plus 0,24")
        l2 = self.ligne([("+", WHITE), ("0,24", C_NRF)], 46, 0.22)
        self.poser(l2, X + 0.5, 0.1)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(b[2], color=WHITE), run_time=0.4)
        self.au_mot("plus 0,06")
        l2b = self.ligne([("+", WHITE), ("0,06", C_NRNF)], 46, 0.22).next_to(l2, RIGHT, buff=0.22)
        b[3] = A.bout(3, "0,06")
        self.play(FadeIn(l2b, shift=UP * 0.1), FadeIn(b[3], shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("0,06 : 1")
        l3 = self.ligne([("=", WHITE), ("1", VERT_OK)], 60, 0.25)
        self.poser(l3, X + 0.5, -0.9)
        self.play(FadeIn(l3, scale=0.6), run_time=0.4)
        self.play(Create(SurroundingRectangle(l3[1], color=VERT_OK, buff=0.14)), run_time=0.35)
        self.insister(l3[1], 0.35)
        self.attendre_voix()

    # ── 05 : 87 % des coureurs ──────────────────────────────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sens")
        self.titre_ecran("Ce que ça veut dire")
        pts = VGroup(*[Circle(radius=0.14, fill_color=GREY_D, fill_opacity=1, stroke_width=0)
                       for _ in range(100)]).arrange_in_grid(10, 10, buff=0.12).move_to(P(-3.2, -0.3))
        self.play(LaggedStart(*[FadeIn(p, scale=0.4) for p in pts], lag_ratio=0.004), run_time=0.6)
        self.au_mot("87 %")
        self.play(LaggedStart(*[pts[i].animate.set_fill(VERT_OK) for i in range(87)], lag_ratio=0.01),
                  run_time=1.2)
        g = VGroup(self.t("87 %", 96, VERT_OK), self.t("des coureurs", 38),
                   self.t("finissent la course", 38)).arrange(DOWN, buff=0.25)
        g.move_to(P(2.6, 0.2))
        self.play(FadeIn(g[0], scale=0.5), run_time=0.4)
        self.play(FadeIn(g[1:], shift=UP * 0.1), run_time=0.4)
        self.insister(g[0], 0.3, 1.3)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        A = self.arbre()
        X = X_D + 0.4
        self.au_mot("additionner 0,9 et 0,8")
        faux = self.ligne([("0,9", PROBA), ("+", WHITE), ("0,8", PROBA)], 52, 0.25)
        self.poser(faux, X + 0.3, 1.1)
        self.play(*A.eteindre(garder=(0, 2)), run_time=0.4)
        self.play(FadeIn(faux, shift=UP * 0.1), Indicate(A.q2[0], color=ROUGE_ERREUR),
                  Indicate(A.q2[2], color=ROUGE_ERREUR), run_time=0.6)
        self.play(Create(self.barrer(faux, sw=8)), run_time=0.4)
        self.au_mot("pas le même poids")
        self.play(A.b1[0].animate.set_stroke(JAUNE_TITRE, 16, opacity=1),
                  A.b1[1].animate.set_stroke(JAUNE_TITRE, 7, opacity=1), run_time=0.6)
        self.play(Indicate(A.q1[0], color=JAUNE_TITRE, scale_factor=1.5),
                  Indicate(A.q1[1], color=JAUNE_TITRE, scale_factor=1.25), run_time=0.7)
        self.au_mot("on multiplie d'abord")
        bon = self.ligne([("0,7", JAUNE_TITRE), ("×", WHITE), ("0,9", PROBA), ("+", WHITE), ("0,3", JAUNE_TITRE),
                          ("×", WHITE), ("0,8", PROBA)], 48, 0.18)
        self.poser(bon, X + 0.3, -0.3)
        self.play(FadeIn(VGroup(bon[2], bon[3], bon[6]), shift=UP * 0.1), run_time=0.4)
        self.au_mot("par 0,7")
        self.play(FadeIn(VGroup(bon[0], bon[1]), shift=RIGHT * 0.15), run_time=0.35)
        self.insister(bon[0], 0.25)
        self.au_mot("et 0,3")
        self.play(FadeIn(VGroup(bon[4], bon[5]), shift=RIGHT * 0.15), run_time=0.35)
        self.insister(bon[4], 0.25)
        ok = self.coche(taille=0.3).next_to(bon, DOWN, buff=0.4)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        A = ArbreCoach(centre=C_ARBRE)
        self.add(A.complet().scale(0.88).shift(UP * 0.35))   # la chute « Mets pause » passe dessous
        self.au_mot("abandonne")
        cr = coureur(ORANGE_RETENUE, 1.1).move_to(P(3.0, 1.1))
        self.play(FadeIn(cr), run_time=0.3)
        self.play(Rotate(cr, angle=-PI / 2, about_point=cr.get_bottom()), run_time=0.6)
        q = VGroup(self.t("abandon :", 40, WHITE), self.t("?", 72, ORANGE_RETENUE)).arrange(RIGHT, buff=0.25)
        self.poser(q, X_D + 1.6, -0.55)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.insister(q[1], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        A = self.arbre()
        X = X_D + 0.4
        self.au_mot("Deux chemins vers F barre")
        self.play(*A.eteindre(garder=(1, 3)), run_time=0.4)
        self.suivre(A, 1, run_time=0.6)
        self.suivre(A, 3, run_time=0.6)
        h = VGroup(self.t("deux chemins vers", 34), lettre("F", 40, JAUNE_TITRE, barre=True))
        h.arrange(RIGHT, buff=0.2)
        self.poser(h, X - 0.3, 1.75)
        self.play(FadeIn(h, shift=UP * 0.1), *[Indicate(A.l2[k], color=JAUNE_TITRE, scale_factor=1.6)
                                               for k in (1, 3)], run_time=0.6)
        self.au_mot("0,7 fois 0,1")
        A.q2_vis |= {1, 3}
        l1 = self.ligne([("0,7", PROBA), ("×", WHITE), ("0,1", PROBA)], 40, 0.16)
        self.poser(l1, X, 0.85)
        self.play(FadeIn(A.q2[1], scale=0.5), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("plus 0,3 fois 0,2")
        l1b = self.ligne([("+", WHITE), ("0,3", PROBA), ("×", WHITE), ("0,2", PROBA)], 40, 0.16)
        l1b.next_to(l1, RIGHT, buff=0.18)
        self.play(FadeIn(A.q2[3], scale=0.5), FadeIn(l1b, shift=UP * 0.1), run_time=0.45)
        self.au_mot("0,07 plus 0,06")
        l2 = self.ligne([("=", WHITE), ("0,07", C_RNF), ("+", WHITE), ("0,06", C_NRNF)], 44, 0.2)
        self.poser(l2, X, -0.05)
        b1, b3 = A.bout(1, "0,07"), A.bout(3, "0,06")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(b1, shift=LEFT * 0.2), FadeIn(b3, shift=LEFT * 0.2),
                  run_time=0.5)
        self.au_mot(": 0,13")
        l3 = self.ligne([("=", WHITE), ("0,13", VERT_OK)], 54, 0.22)
        self.poser(l3, X, -1.0)
        self.play(FadeIn(l3, scale=0.6), run_time=0.4)
        self.play(Create(SurroundingRectangle(l3[1], color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(l3[1], 0.3)
        self.au_mot("Ou 1 moins 0,87")
        l4 = self.ligne([("ou", GREY_A), ("1", WHITE), ("−", WHITE), ("0,87", VERT_OK)], 44, 0.2)
        self.poser(l4, X, -2.0)
        ok = self.coche(taille=0.25).next_to(l4, RIGHT, buff=0.35)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.45)
        self.play(Create(ok), run_time=0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = self.ligne([("Un chemin :", C_RF), ("on multiplie les branches", WHITE)], fs, 0.2)
        l2 = self.ligne([("Un événement :", VERT_OK), ("on additionne ses chemins", WHITE)], fs, 0.2)
        l3 = self.ligne([("Les quatre chemins", WHITE), ("font 1", JAUNE_TITRE)], fs, 0.2)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 10.4:
            lignes.scale_to_fit_width(10.4)
        lignes.move_to(P(-0.9, 0.5))
        for mot, l in zip(["Un chemin", "Un événement", "Les quatre chemins"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("L'épisode 11")
        self.play(Write(self.chute("Épisode 11 : le tableau croisé", color=VERT_OK, font_size=36)))
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
        self.ecran_chemin()
        self.ecran_somme()
        self.ecran_verifier()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
