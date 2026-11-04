# proba_va_somme.py
# EleveAI — Maths Tle spé — paysage « Additionner des variables aléatoires »
# (16:9), ceinture VERTE. Micro du coach : va_somme (notion variable_aleatoire,
# lib/tutor-v4/knowledge/maths/terminale-spe/microSkills.ts : E(X + Y), V(X + Y)
# si indépendantes, binomiale = somme de Bernoulli, Sₙ = X₁ + … + Xₙ).
# Short jumeau : proba_va_somme_short.py.
#
# Domaine : la SANTÉ et l'ARGENT. Métier : Maëlle, actuaire dans une mutuelle.
# Clé de voix → écran :
#   · 00-accroche     : un adhérent, ses frais qui sautent (0 €, 2 000 €), puis
#                       une foule d'adhérents et un total qui ne bouge presque plus ;
#   · 01-titre        : page de garde, l'échelle ENTIÈRE des ceintures (verte) ;
#   · 02-metier       : Maëlle, X = le remboursement annuel ; E = 200, V = 2 500,
#                       σ = 50 (sur une règle en euros) ;
#   · 03-linearite    : deux adhérents, deux barres de 200 qui s'empilent : 400 ;
#   · 04-affine       : T = 1,2X + 30 : le nuage des remboursements glisse (+ 30,
#                       l'écart ne change pas) et s'étire (× 1,2) ; 270 € ;
#   · 05/05b          : question-pause n° 1 (V(1,2X + 30) → B : 3 600) ;
#   · 06-independance : indépendants : les barres se compensent ; jumeaux (Y = X) :
#                       elles montent et descendent ensemble, V = 10 000 ;
#   · 07/07b          : question-pause n° 2 (V(X − Y) → B : 5 000) ;
#   · 08-bernoulli    : 100 adhérents, 10 hospitalisés en moyenne, B(100 ; 0,1),
#                       E = 10, V = 9, np et np(1 − p) ;
#   · 09-echantillon  : S = X₁ + … + X₁₀₀ : la caisse de la mutuelle ; 20 000,
#                       250 000, σ = 500 ;
#   · 10/10b          : question-pause n° 3 (σ du total → B : 500) ;
#   · 11-sens         : l'écart-type rapporté à la moyenne : 25 % → 2,5 % ;
#   · 12-appris       : « Ce que tu as appris », titre en haut et centré ;
#   · 13-abonne       : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
#
# Code couleur (paysage ET short) : bleu = X (un adhérent, un dé), orange = Y /
# le hasard qui s'ajoute, jaune = l'espérance, vert = résultat juste, rouge =
# piège.
# Modèles : convexite_tangente.py et loi_normale_escalier.py (structure,
# question-pause, audit) ; proba_va_defi.py (notations E(X), V(X), σ(X)).
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos (marques mot à
#   mot : proba_va_somme_marques.json). Audit : AUDIT=1 BORDS=1 … --dry_run.
#
# Voix : manim/voix/terminale-proba-va-somme.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_va_somme.py ProbaVaSommeTerminale -o eleveai-maths-terminale-proba-va-somme --media_dir manim/scripts/terminale/media-va_somme
# Sortie : manim/sorties/terminale/maths/probabilites/va-somme/

import math
import os
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert math.isclose(math.sqrt(2500), 50) and 200 + 200 == 400
assert math.isclose(1.2 * 200 + 30, 270) and math.isclose(1.2 ** 2, 1.44)
assert math.isclose(1.44 * 2500, 3600) and 2500 + 2500 == 5000 and 4 * 2500 == 10000
assert math.isclose((-1) ** 2 * 2500, 2500)
assert math.isclose(100 * 0.1, 10) and math.isclose(100 * 0.1 * 0.9, 9)
assert 100 * 200 == 20000 and 100 * 2500 == 250000 and math.isclose(math.sqrt(250000), 500)
assert math.isclose(math.sqrt(100), 10) and 10 * 50 == 500
assert math.isclose(50 / 200, 0.25) and math.isclose(500 / 20000, 0.025)

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.25  # la colonne de droite (marge de 3 % : 0,43 du bord, + la place des cadres)
COUL_X, COUL_Y = BLEU_CALCUL, ORANGE_RETENUE
ESP = JAUNE_TITRE
SANTE = "#34D399"       # la croix verte de la mutuelle
PEAUX = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#5c3a21"]


# ── les dessins ─────────────────────────────────────────────────────────────

def personne(couleur=BLEU_CALCUL, s=1.0, peau="#c68642"):
    """Un pictogramme : la tête et le buste."""
    buste = RoundedRectangle(width=0.62, height=0.62, corner_radius=0.22, fill_color=couleur, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.12))
    tete = Circle(radius=0.19, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0, 0.42))
    return VGroup(buste, tete).scale(s)


def croix(s=1.0, couleur=SANTE):
    """La croix de santé de la mutuelle."""
    a = Rectangle(width=0.22, height=0.66, fill_color=couleur, fill_opacity=1, stroke_width=0)
    b = Rectangle(width=0.66, height=0.22, fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(a, b).scale(s)


def actuaire(s=1.0):
    """Maëlle : la tête, les cheveux longs, la veste, une tablette avec un graphique."""
    cheveux = Ellipse(width=0.78, height=0.92, fill_color="#3b2412", fill_opacity=1, stroke_width=0)
    cheveux.move_to(P(0, 0.88))
    tete = Circle(radius=0.29, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    buste = RoundedRectangle(width=1.05, height=1.15, corner_radius=0.32, fill_color=VIOLET_ACCENT,
                             fill_opacity=1, stroke_width=0).move_to(P(0, 0.0))
    tab = RoundedRectangle(width=0.78, height=0.56, corner_radius=0.06, fill_color="#0F172A", fill_opacity=1,
                           stroke_color=GREY_B, stroke_width=2).move_to(P(0.62, -0.05))
    barres = VGroup(*[Rectangle(width=0.1, height=h, fill_color=c, fill_opacity=1, stroke_width=0)
                      for h, c in ((0.16, COUL_X), (0.3, ESP), (0.22, COUL_X), (0.36, VERT_OK))])
    barres.arrange(RIGHT, buff=0.05, aligned_edge=DOWN).move_to(tab).align_to(tab.get_bottom() + UP * 0.08, DOWN)
    return VGroup(cheveux, buste, tete, tab, barres).scale(s)


def indice(base, ind, fs=40, color=WHITE):
    """X₁ en Text : l'indice, plus petit, posé en bas à droite."""
    b = Text(base, font_size=fs, color=color)
    i = Text(ind, font_size=int(fs * 0.6), color=color)
    i.next_to(b, RIGHT, buff=0.03).align_to(b, DOWN).shift(DOWN * 0.1 * fs / 40)
    return VGroup(b, i)


class Regle:
    """Une règle graduée en euros : la valeur v → le point de l'axe."""

    def __init__(self, a, b, xa, xb, y):
        self.a, self.b, self.xa, self.xb, self.y = a, b, xa, xb, y

    def X(self, v):
        return self.xa + (v - self.a) / (self.b - self.a) * (self.xb - self.xa)

    def pt(self, v, dy=0.0):
        return P(self.X(v), self.y + dy)

    def axe(self):
        return Arrow(P(self.xa - 0.15, self.y), P(self.xb + 0.3, self.y), buff=0, stroke_width=3, color=GREY_B,
                     tip_length=0.18, max_tip_length_to_length_ratio=0.05)

    def grad(self, v, texte, fs=26, audit=True):
        tr = Line(self.pt(v, -0.09), self.pt(v, 0.09), stroke_width=2, color=GREY_B)
        t = Text(texte, font_size=fs, color=GREY_A).next_to(tr, DOWN, buff=0.08)
        if not audit:
            t._pas_audit = True
        return VGroup(tr, t)


class ProbaVaSommeBase(AuditSynchro, MotsCales, Notion6e):
    fichier_marques = "proba_va_somme_marques.json"
    nom_voix = "terminale-proba-va-somme"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "verte"

    # ── outils (recopiés de convexite_tangente.py) ──────────────────────────

    def t(self, texte, fs=36, color=WHITE, larg=None, audit=True):
        t = Text(texte, font_size=fs, color=color)
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
        if not audit:
            t._pas_audit = True
        return t

    def col(self, mob, y, xl=XL):
        """La colonne de droite : alignée à gauche sur xl, jamais près du bord."""
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > BORD_X:
            mob.scale_to_fit_width(BORD_X - xl).align_to(P(xl, 0), LEFT)
        if mob.get_bottom()[1] < -1.95 and mob.get_right()[0] > 5.3:  # Ti-Margo
            mob.scale_to_fit_width(5.3 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def ligne(self, *morceaux, y, xl=XL, buff=0.15):
        g = VGroup(*morceaux).arrange(RIGHT, buff=buff)
        return self.col(g, y, xl)

    def calc(self, morceaux, fs=40, buff=0.16):
        """Une ligne de calcul ; morceaux = [(texte ou Mobject, couleur), …]."""
        g = VGroup(*[m if isinstance(m, Mobject) else self.t(m, fs, c) for m, c in morceaux])
        return g.arrange(RIGHT, buff=buff)

    def insister(self, mob, k=1.35, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def add_mascotte(self, scale=0.5):
        """Ti-Margo dans le coin bas-droit, à 0,45 du bord (3 % de la largeur)."""
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        self._margo = m
        return m

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def au_pos(self, i):
        """Attend l'instant où la voix dit le mot à la position i."""
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > -0.02:
            self.wait(max(reste, 0) + 0.07)  # + 1 image : jamais une image d'avance

    def au_mot(self, extrait, n=1):
        """au_mot sur la n-ième occurrence de l'extrait."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        self.au_pos(i)

    def au_temps(self, t):
        """Attend l'instant t (s) de la phrase en cours (cue relevée à la main)."""
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} t {t} : {-reste:.2f} s", flush=True)
        if reste > -0.02:
            self.wait(max(reste, 0) + 0.07)

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

    def q_tete(self, question, choix, largeur=4.1):
        """« Question ! » + compte à rebours, la question (lignes), les cartes,
        la consigne. Rien n'est joué ici."""
        tete = VGroup(pastille_pause(0.38), self.t("Question !", 38, ORANGE_RETENUE)).arrange(RIGHT, buff=0.22)
        self.col(tete, 3.15)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(tete, RIGHT, buff=0.35)
        if rebours.get_right()[0] > BORD_X:
            rebours.shift(LEFT * (rebours.get_right()[0] - BORD_X))
        q = VGroup(*[x if isinstance(x, Mobject) else self.t(x, 34) for x in question])
        for x in q:
            if x.width > BORD_X - XL:
                x.scale_to_fit_width(BORD_X - XL)
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(q, 0)
        q.align_to(P(0, tete.get_bottom()[1] - 0.25), UP)
        cartes = VGroup(*[self.carte_choix(l, c, largeur) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.16)
        self.col(cartes, 0)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        pause = self.col(self.t("Mets pause, et choisis !", 32, ORANGE_RETENUE), cartes.get_bottom()[1] - 0.45)
        return tete, q, cartes, pause, rebours

    def q_montrer_choix(self, cartes):
        """Chaque carte À SA LETTRE, son nombre À SON NOMBRE."""
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

    def piege(self, carte):
        """Le leurre de l'erreur classique, rallumé en rouge et barré : les
        animations à jouer, et la barre."""
        barre = Line(carte[1][1].get_left() + LEFT * 0.08, carte[1][1].get_right() + RIGHT * 0.08,
                     color=ROUGE_ERREUR, stroke_width=6)
        anims = [carte[0].animate.set_opacity(1).set_stroke(ROUGE_ERREUR, width=5), carte[1].animate.set_opacity(1),
                 Create(barre)]
        return anims, barre

    def explic(self, lignes, y_haut, x=-6.2, fs=34):
        """Les lignes d'explication de la réponse, sous le dessin, à gauche ;
        lignes = [[(texte, couleur), …], …]."""
        g = VGroup(*[self.calc(l, fs, buff=0.14) for l in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        if g.width > 7.6:
            g.scale_to_fit_width(7.6)
        return g.move_to(P(0, 0)).align_to(P(x, 0), LEFT).align_to(P(0, y_haut), UP)

    def grille(self, x0, y0, pas=0.4, s=0.3, couleur=COUL_X):
        """Les 100 adhérents, 10 × 10, le coin haut-gauche en (x0, y0)."""
        g = VGroup()
        for k in range(100):
            i, j = divmod(k, 10)
            g.add(personne(couleur, s, PEAUX[(i + 2 * j) % 5]).move_to(P(x0 + j * pas, y0 - i * pas)))
        return g

    # ── 00 : les frais d'une personne, puis des milliers ───────────────────

    def ecran_accroche(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("00-accroche")
        moi = personne(COUL_X, 1.3).move_to(P(-5.55, 1.75))
        tit = self.t("Les frais de santé", 42, JAUNE_TITRE).move_to(P(0, 3.05)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Les frais")
        self.play(FadeIn(moi, shift=UP * 0.2), Write(tit), run_time=0.7)
        y0, k = -0.35, 1.0 / 900  # 2 000 € → 1,8 unité
        base = Line(P(-4.2, y0), P(-0.55, y0), stroke_width=3, color=GREY_B)
        self.play(Create(base), run_time=0.3)
        self.au_mot("impossible")
        imp = self.t("impossible à prévoir", 28, ORANGE_RETENUE).next_to(moi, DOWN, buff=0.25).align_to(P(-6.2, 0), LEFT)
        self.play(FadeIn(imp, shift=UP * 0.1), Wiggle(moi), run_time=0.6)
        self.au_nb("prévoir", "0")
        b1 = Rectangle(width=0.9, height=0.04, fill_color=COUL_X, fill_opacity=1, stroke_width=0)
        b1.move_to(P(-3.35, y0 + 0.02))
        l1 = self.t("0 €", 32, COUL_X).next_to(b1, UP, buff=0.12)
        a1 = self.t("une année", 24, GREY_A).next_to(P(-3.35, y0), DOWN, buff=0.15)
        self.play(FadeIn(b1), FadeIn(l1, scale=1.4), FadeIn(a1), run_time=0.35)
        self.au_mot("2 000")
        b2 = Rectangle(width=0.9, height=2000 * k, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0)
        b2.move_to(P(-1.3, y0 + 1000 * k))
        l2 = self.t("2 000 €", 32, ROUGE_ERREUR).next_to(b2, UP, buff=0.12)
        a2 = self.t("la suivante", 24, GREY_A).next_to(P(-1.3, y0), DOWN, buff=0.15)
        self.play(GrowFromEdge(b2, DOWN), FadeIn(l2, scale=1.4), FadeIn(a2), run_time=0.5)
        self.insister(l2, 1.3)
        # des milliers d'adhérents, la mutuelle
        self.au_mot("des milliers")
        foule = VGroup(*[personne(COUL_X, 0.36, PEAUX[(i * 3 + j) % 5]).move_to(P(0.75 + j * 0.42, 2.75 - i * 0.55))
                         for i in range(4) for j in range(11)])
        self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in foule], lag_ratio=0.015), run_time=1.0)
        self.au_mot("une mutuelle")
        cr = croix(0.6).move_to(P(1.1, 0.25))
        mu = self.t("une mutuelle", 34, SANTE).next_to(cr, RIGHT, buff=0.25)
        self.play(FadeIn(cr, scale=1.6), FadeIn(mu, shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("son budget")
        yb = -1.95
        haut = [1.32, 1.36, 1.3]
        budgets = VGroup(*[Rectangle(width=0.75, height=h, fill_color=SANTE, fill_opacity=0.85, stroke_width=0)
                           .move_to(P(1.3 + 1.05 * i, yb + h / 2)) for i, h in enumerate(haut)])
        sol = Line(P(0.7, yb), P(4.0, yb), stroke_width=3, color=GREY_B)
        self.play(Create(sol), LaggedStart(*[GrowFromEdge(b, DOWN) for b in budgets], lag_ratio=0.25), run_time=0.8)
        self.au_mot("avec précision")
        niv = DashedLine(P(0.75, yb + 1.33), P(4.0, yb + 1.33), color=ESP, stroke_width=3)
        pr = self.t("avec précision", 30, ESP).next_to(niv, UP, buff=0.12).align_to(niv, LEFT)
        self.play(Create(niv), FadeIn(pr, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Comment")
        q = self.t("Comment le hasard devient-il prévisible ?", 40, BLEU_CALCUL, larg=10.6).move_to(P(-0.8, -2.85))
        self.play(FadeIn(q, scale=1.15), run_time=0.5)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.7)

    # ── 01 : page de garde ─────────────────────────────────────────────────

    def ecran_titre(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("01-titre")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Additionner des variables aléatoires", 52, JAUNE_TITRE, larg=11.8).to_edge(UP, buff=0.5)
        self.au_mot("Additionner")
        x = self.t("X", 72, COUL_X)
        plus = self.t("+", 72)
        y = self.t("Y", 72, COUL_Y)
        xy = VGroup(x, plus, y).arrange(RIGHT, buff=0.4).move_to(P(-0.6, -0.15))
        self.play(Write(titre), FadeIn(x, shift=RIGHT * 0.3), FadeIn(y, shift=LEFT * 0.3), FadeIn(plus, scale=1.6),
                  run_time=0.8)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        self.au_mot("Espérance")
        s1 = self.t("Espérance", 40, ESP)
        s2 = self.t("et variance d'une somme", 40, BLEU_CALCUL)
        sous = VGroup(s1, s2).arrange(RIGHT, buff=0.2).move_to(P(-0.6, 1.3))
        self.play(FadeIn(s1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("et variance")
        self.play(FadeIn(s2, shift=UP * 0.15), run_time=0.4)
        self.play(Indicate(xy, color=ESP, scale_factor=1.1), run_time=0.6)
        self.attendre_voix(marge=0.9)

    # ── 02 : Maëlle, actuaire ; E(X) = 200, V(X) = 2 500, σ(X) = 50 ───────────

    def ecran_metier(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-metier")
        ma = actuaire(1.05).move_to(P(-5.35, 2.15))
        nom = self.t("Maëlle", 44, VIOLET_ACCENT).move_to(P(0, 2.95)).align_to(P(-4.1, 0), LEFT)
        met = self.t("actuaire dans une mutuelle", 34).move_to(P(0, 2.3)).align_to(P(-4.1, 0), LEFT)
        cr = croix(0.42).next_to(met, RIGHT, buff=0.25)
        self.au_mot("Maëlle")
        self.play(FadeIn(ma, shift=UP * 0.2), FadeIn(nom, shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("actuaire")
        self.play(FadeIn(met, shift=RIGHT * 0.15), FadeIn(cr, scale=1.5), run_time=0.45)
        self.au_mot("prévoir le hasard")
        pv = self.t("Son métier : prévoir le hasard", 34, ESP).move_to(P(0, 1.65)).align_to(P(-4.1, 0), LEFT)
        self.play(FadeIn(pv, shift=UP * 0.1), Indicate(ma[3], color=ESP), run_time=0.6)
        self.au_mot("X est")
        xd = self.calc([("X :", COUL_X), ("le remboursement annuel d'un adhérent, en euros", WHITE)], 32, buff=0.2)
        xd.move_to(P(0, 0.75)).align_to(P(-6.2, 0), LEFT)
        self.play(FadeIn(xd, shift=UP * 0.1), run_time=0.5)
        rg = Regle(0, 400, -5.8, 0.6, -2.35)
        axe = rg.axe()
        gr = VGroup(rg.grad(0, "0 €", audit=False), rg.grad(400, "400 €", audit=False))
        self.play(Create(axe), FadeIn(gr), run_time=0.5)
        fs = 42
        self.au_mot("espérance de X")
        l1 = self.ligne(self.t("E(X) =", fs, ESP), y=0.0)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_nb("espérance de X", "200")
        v1 = self.t("200", fs + 4, ESP).next_to(l1, RIGHT, buff=0.18)
        pt = Triangle(fill_color=ESP, fill_opacity=1, stroke_width=0).scale(0.14).rotate(PI).move_to(rg.pt(200, 0.2))
        g200 = rg.grad(200, "200", fs=28).set_color(ESP)
        self.play(FadeIn(v1, scale=1.4), FadeIn(pt, shift=DOWN * 0.3), FadeIn(g200), run_time=0.4)
        self.au_mot("Variance de X")
        l2 = self.ligne(self.t("V(X) =", fs, COUL_Y), y=-0.7)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 500")
        v2 = self.t("2 500", fs + 4, COUL_Y).next_to(l2, RIGHT, buff=0.18)
        self.play(FadeIn(v2, scale=1.4), run_time=0.35)
        self.au_mot("écart-type de X")
        l3 = self.ligne(self.t("σ(X) = √2 500 =", fs, VERT_OK), self.t("50", fs + 6, VERT_OK), y=-1.4, buff=0.18)
        l3[0]._pas_audit = True  # 2 500 : déjà dit, on le recopie sous la racine
        v3 = l3[1]
        l3 = l3[0]
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_nb("écart-type de X", "50")
        fl = DoubleArrow(rg.pt(200, 0.55), rg.pt(250, 0.55), buff=0, color=VERT_OK, stroke_width=4, tip_length=0.15)
        e50 = self.t("50", 28, VERT_OK).next_to(fl, UP, buff=0.08)
        bande = Rectangle(width=rg.X(250) - rg.X(150), height=0.5, stroke_width=0, fill_color=VERT_OK,
                          fill_opacity=0.25).move_to(rg.pt(200, 0.25))
        self.play(FadeIn(v3, scale=1.5), GrowFromCenter(fl), FadeIn(e50), FadeIn(bande), run_time=0.45)
        cad = SurroundingRectangle(VGroup(l3, v3), color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 03 : la linéarité : deux barres de 200 qui s'empilent ───────────────

    def barre(self, v, x, yb, couleur, k=0.008, larg=0.85):
        h = max(v * k, 0.01)
        return Rectangle(width=larg, height=h, fill_color=couleur, fill_opacity=0.9, stroke_color=WHITE,
                         stroke_width=1.5).move_to(P(x, yb + h / 2))

    def ecran_linearite(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-linearite")
        yb = -2.55
        px = personne(COUL_X, 1.05, PEAUX[1]).move_to(P(-5.3, 1.95))
        py = personne(COUL_Y, 1.05, PEAUX[3]).move_to(P(-3.85, 1.95))
        famille = self.t("une famille", 32, GREY_A).move_to(P(-4.55, 3.1))
        self.au_mot("Une famille")
        self.play(FadeIn(px, shift=UP * 0.2), FadeIn(py, shift=UP * 0.2), FadeIn(famille), run_time=0.5)
        self.au_mot("X et Y")
        lx = self.t("X", 40, COUL_X).next_to(px, DOWN, buff=0.12)
        ly = self.t("Y", 40, COUL_Y).next_to(py, DOWN, buff=0.12)
        sol = Line(P(-6.0, yb), P(-0.6, yb), stroke_width=3, color=GREY_B)
        self.play(FadeIn(lx, scale=1.4), FadeIn(ly, scale=1.4), Create(sol), run_time=0.4)
        self.au_mot("200")
        bx = self.barre(200, -5.3, yb, COUL_X)
        by = self.barre(200, -3.85, yb, COUL_Y)
        tx = self.t("200", 30, COUL_X).next_to(bx, UP, buff=0.1)
        ty = self.t("200", 30, COUL_Y).next_to(by, UP, buff=0.1)
        self.play(GrowFromEdge(bx, DOWN), GrowFromEdge(by, DOWN), FadeIn(tx), FadeIn(ty), run_time=0.5)
        self.au_mot("Le total moyen")
        tm = self.t("Le total moyen ?", 36, ESP).move_to(P(0, 2.75)).align_to(P(0.2, 0), LEFT)
        self.play(FadeIn(tm, shift=UP * 0.1), run_time=0.35)
        fs = 40
        self.au_mot("Espérance de X plus Y")
        e1 = self.ligne(self.t("E(X + Y)", fs, ESP), y=1.95, xl=0.2)
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("espérance de X plus espérance")
        e2 = self.ligne(self.t("= E(X)", fs, COUL_X), self.t("+ E(Y)", fs, COUL_Y), y=1.25, xl=0.2)
        self.play(FadeIn(e2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("espérance de Y")
        self.play(FadeIn(e2[1], shift=UP * 0.1), run_time=0.3)
        # les deux barres montent s'empiler
        sx, sy = bx.copy(), by.copy()
        self.play(sx.animate.move_to(P(-1.75, yb + bx.height / 2)), run_time=0.5)
        self.play(sy.animate.move_to(P(-1.75, yb + bx.height + by.height / 2)), run_time=0.5)
        self.au_mot("400")
        e3 = self.ligne(self.t("= 400", fs + 6, VERT_OK), y=0.5, xl=0.2)
        t4 = self.t("400", 34, VERT_OK).next_to(sy, UP, buff=0.1)
        lxy = self.t("X + Y", 30, ESP).next_to(P(-1.75, yb), DOWN, buff=0.12)
        self.play(FadeIn(e3, scale=1.4), FadeIn(t4, scale=1.5), FadeIn(lxy), run_time=0.4)
        self.insister(t4, 1.3)
        self.au_mot("Ça marche toujours")
        tj = self.ligne(self.t("toujours,", 36, VERT_OK), y=-0.4, xl=0.2)
        self.play(FadeIn(tj, shift=UP * 0.1), run_time=0.35)
        self.au_mot("même si")
        li = self.ligne(self.t("même si X et Y sont liées", 34, VERT_OK), y=-1.0, xl=0.2)
        lien = ArcBetweenPoints(px.get_top() + UP * 0.1, py.get_top() + UP * 0.1, angle=-1.2, color=VERT_OK,
                                stroke_width=4)
        self.play(FadeIn(li, shift=UP * 0.1), Create(lien), FadeOut(famille), run_time=0.45)
        self.au_mot("linéarité")
        lin = self.ligne(self.t("la linéarité de l'espérance", 36, ESP), y=-1.7, xl=0.2)
        cad = SurroundingRectangle(lin, color=ESP, buff=0.14, stroke_width=3)
        self.play(FadeIn(lin, scale=1.15), Create(cad), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 04 : T = 1,2X + 30 : le nuage glisse et s'étire ─────────────────────

    VALS_X = [110, 140, 160, 180, 200, 215, 235, 260, 300]   # moyenne 200
    assert sum(VALS_X) == 9 * 200

    def nuage(self, rg, vals, y, couleur):
        dy = [0.08, -0.06, 0.1, -0.1, 0.0, 0.07, -0.08, 0.05, -0.03]
        return VGroup(*[Dot(P(rg.X(v), y + d), radius=0.085, color=couleur).set_stroke(WHITE, 1)
                        for v, d in zip(vals, dy)])

    def accolade(self, nuage, couleur, dessous=True):
        b = Brace(nuage, DOWN if dessous else UP, buff=0.08, color=couleur)
        return b

    def decor_affine(self, y_rg=-1.75, y_x=-1.1, y_t=0.0):
        rg = Regle(0, 400, -5.7, 0.9, y_rg)
        nx = self.nuage(rg, self.VALS_X, y_x, COUL_X)
        nt = self.nuage(rg, [1.2 * v + 30 for v in self.VALS_X], y_t, COUL_Y)
        lx = self.t("X", 36, COUL_X).move_to(P(-6.25, y_x))
        lt = self.t("T", 36, COUL_Y).move_to(P(-6.25, y_t))
        gr = VGroup(rg.grad(0, "0 €", audit=False), rg.grad(400, "400 €", audit=False))
        return rg, nx, nt, lx, lt, VGroup(rg.axe(), gr)

    def ecran_affine(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-affine")
        ma = actuaire(0.6).move_to(P(-5.6, 2.55))
        rg, nx, nt, lx, lt, regle = self.decor_affine()
        self.play(FadeIn(ma, shift=UP * 0.15), Create(regle[0]), FadeIn(regle[1]), FadeIn(nx), FadeIn(lx),
                  run_time=0.6)
        self.au_mot("la cotisation")
        co = self.t("la cotisation", 36, COUL_Y).next_to(ma, RIGHT, buff=0.3)
        self.play(FadeIn(co, shift=RIGHT * 0.1), run_time=0.35)
        fs = 40
        self.au_mot("T égale")
        f1 = self.ligne(self.t("T =", fs, COUL_Y), self.t("1,2X", fs, COUL_Y), self.t("+ 30", fs, COUL_Y), y=2.7, xl=1.5)
        self.play(FadeIn(f1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,2")
        etire = nx.copy()
        self.play(FadeIn(f1[1], scale=1.3), FadeIn(lt), etire.animate.set_color(COUL_Y).apply_function(
            lambda p: np.array([rg.X(1.2 * ((p[0] - rg.xa) / (rg.xb - rg.xa) * 400)), p[1] + 1.1, 0])),
            run_time=0.7)
        self.au_nb("1,2 fois X plus", "30")
        self.play(FadeIn(f1[2], scale=1.3), etire.animate.shift(RIGHT * (rg.X(30) - rg.X(0))), run_time=0.6)
        self.remove(etire)
        self.add(nt)
        self.au_mot("Espérance de a X")
        f2 = self.ligne(self.t("E(aX + b) =", fs, ESP), self.t("aE(X) + b", fs, ESP), y=1.85, xl=1.5)
        self.play(FadeIn(f2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("a fois espérance")
        self.play(FadeIn(f2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,2 fois 200")
        self.au_nb("1,2 fois", "200")
        f3 = self.ligne(self.t("1,2 × 200", 36), self.t("+ 30 =", 36), self.t("270 €", 40, VERT_OK), y=1.05, xl=1.5)
        mx = DashedLine(P(rg.X(200), -1.45), P(rg.X(200), -0.75), color=ESP, stroke_width=3)
        self.play(FadeIn(f3[0], shift=UP * 0.1), Create(mx), run_time=0.35)
        self.au_nb("200, plus", "30")
        self.play(FadeIn(f3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("270")
        mt = DashedLine(P(rg.X(270), -0.12), P(rg.X(270), 0.4), color=ESP, stroke_width=3)
        t270 = self.t("270", 28, ESP).next_to(mt, UP, buff=0.06)
        self.play(FadeIn(f3[2], scale=1.4), Create(mt), FadeIn(t270), run_time=0.4)
        self.insister(f3[2], 1.25)
        self.au_mot("le b disparaît")
        f4 = self.ligne(self.t("Variance : le b disparaît", 34, GREY_A), y=0.2, xl=1.5)
        self.play(FadeIn(f4, shift=UP * 0.1), run_time=0.35)
        self.au_mot("décaler")
        f5 = self.ligne(self.t("décaler ne disperse pas", 34, VERT_OK), y=-0.45, xl=1.5)
        ghost = nx.copy().set_opacity(0.6)
        acc = self.accolade(ghost, VERT_OK)
        self.play(FadeIn(f5, shift=UP * 0.1), FadeIn(acc), run_time=0.35)
        dx = rg.X(30) - rg.X(0)
        self.play(ghost.animate.shift(RIGHT * dx), acc.animate.shift(RIGHT * dx), run_time=0.8)
        self.play(FadeOut(ghost), FadeOut(acc), run_time=0.3)
        self.au_mot("au carré")
        ax_ = self.accolade(nx, COUL_X)
        at_ = self.accolade(nt, COUL_Y)
        self.play(GrowFromCenter(ax_), GrowFromCenter(at_), run_time=0.4)
        self.au_mot("variance de a X plus b égale")
        f6 = self.ligne(self.t("V(aX + b) = a²V(X)", 38, VERT_OK), y=-1.3, xl=1.5)
        cad = SurroundingRectangle(f6, color=VERT_OK, buff=0.14, stroke_width=3)
        self.play(FadeIn(f6, scale=1.15), run_time=0.45)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.5)
        self.decor04 = (rg, nx, nt, lx, lt, regle, ax_, at_)

    # ── 05 : question-pause n° 1 : V(1,2X + 30) ────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-question")
        t0 = self.renderer.time
        rg, nx, nt, lx, lt, regle = self.decor_affine(y_rg=-2.55, y_x=-1.9, y_t=-0.8)
        q1 = self.t("V(X) = 2 500", 34)
        q2 = VGroup(self.t("V(1,2X", 34), self.t("+ 30) = ?", 34)).arrange(RIGHT, buff=0.12)
        tete, q, cartes, pause, rebours = self.q_tete([q1, q2], ["3 000", "3 600", "3 030"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), FadeIn(regle), FadeIn(nx), FadeIn(lx), run_time=0.4)
        self.au_mot("2 500")
        self.play(FadeIn(q1, shift=UP * 0.1), GrowFromCenter(self.accolade(nx, COUL_X)), run_time=0.4)
        self.au_mot("1,2")
        self.play(FadeIn(q2[0], shift=UP * 0.1), FadeIn(nt), FadeIn(lt), run_time=0.4)
        self.au_nb("X plus", "30")
        self.play(FadeIn(q2[1], shift=UP * 0.1), run_time=0.3)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "05-question", t0, 1)
        self.dire("05b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        fs = 38
        l1 = self.calc([("1,2² =", WHITE), ("1,44", COUL_Y)], fs)
        l2 = self.calc([("1,44 × 2 500 =", WHITE), ("3 600", VERT_OK)], fs)
        l3 = self.calc([("Le 30 ne compte pas.", GREY_A)], fs - 2)
        bloc = VGroup(l1, l2, l3).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        bloc.move_to(P(0, 0)).align_to(P(-6.2, 0), LEFT).align_to(P(0, 2.95), UP)
        self.au_mot("1,2 au carré")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("au carré", "1,44")
        self.play(FadeIn(l1[1], scale=1.4), run_time=0.3)
        self.au_nb("1,44 fois", "2 500")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 600")
        self.play(FadeIn(l2[1], scale=1.4), run_time=0.35)
        self.insister(l2[1], 1.25)
        self.au_nb("Le 30", "30")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("3 000,")
        anims, barre = self.piege(cartes[0])
        ou = self.t("3 000 : oublier le carré", 32, ROUGE_ERREUR, audit=False).next_to(l3, DOWN, buff=0.3).align_to(l3, LEFT)
        self.play(*anims, run_time=0.4)
        self.au_mot("oublier le carré")
        self.play(FadeIn(ou, shift=LEFT * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 06 : indépendants, les barres se compensent ; jumeaux, elles s'ajoutent

    def decor_barres(self, yb=-2.6, k=0.0062, xs=(-5.35, -4.0, -2.2), avec_total=True):
        """Les remboursements de l'année : la barre de X, celle de Y, et le
        total empilé, redessinés en direct (ValueTracker)."""
        vx, vy = ValueTracker(200), ValueTracker(200)
        sol = Line(P(xs[0] - 0.75, yb), P(xs[2] + 0.75, yb), stroke_width=3, color=GREY_B)
        bx = always_redraw(lambda: self.barre(vx.get_value(), xs[0], yb, COUL_X, k, 0.8))
        by = always_redraw(lambda: self.barre(vy.get_value(), xs[1], yb, COUL_Y, k, 0.8))
        grp = [sol, bx, by]
        if avec_total:
            tx = always_redraw(lambda: self.barre(vx.get_value(), xs[2], yb, COUL_X, k, 0.95))
            ty = always_redraw(lambda: self.barre(vy.get_value(), xs[2], yb + vx.get_value() * k, COUL_Y, k, 0.95))
            niv = DashedLine(P(xs[2] - 0.75, yb + 400 * k), P(xs[2] + 0.75, yb + 400 * k), color=ESP,
                             stroke_width=3)
            lt = self.t("X + Y", 30, ESP).next_to(P(xs[2], yb), DOWN, buff=0.12)
            grp += [tx, ty, niv, lt]
        return vx, vy, VGroup(*grp)

    def secouer(self, vx, vy, annees, rt=0.42):
        for a, b in annees:
            self.play(vx.animate.set_value(a), vy.animate.set_value(b), run_time=rt,
                      rate_func=rate_functions.ease_in_out_sine)

    def ecran_independance(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-independance")
        xl = -0.5
        px = personne(COUL_X, 1.0, PEAUX[1]).move_to(P(-5.35, 1.95))
        py = personne(COUL_Y, 1.0, PEAUX[3]).move_to(P(-4.0, 1.95))
        lx = self.t("X", 36, COUL_X).next_to(px, DOWN, buff=0.1)
        ly = self.t("Y", 36, COUL_Y).next_to(py, DOWN, buff=0.1)
        vx, vy, decor = self.decor_barres()
        self.add(decor)
        self.play(FadeIn(VGroup(px, py, lx, ly), shift=UP * 0.15), run_time=0.4)
        fs = 38
        self.au_mot("Et la variance")
        q = self.ligne(self.t("V(X + Y) ?", fs, ESP), y=2.75, xl=xl)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Si X et Y")
        ind = self.t("indépendants", 30, VERT_OK).move_to(P(-4.7, 3.05))
        self.play(FadeIn(ind, shift=DOWN * 0.1), run_time=0.3)
        self.secouer(vx, vy, [(240, 160), (165, 235)])
        self.au_mot("variance de X plus Y égale")
        f1 = self.ligne(self.t("V(X + Y) =", fs), self.t("V(X) + V(Y)", fs, VERT_OK), y=2.05, xl=xl)
        self.play(FadeIn(f1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("variance de X plus variance")
        self.play(FadeIn(f1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("5 000")
        f2 = self.ligne(self.t("= 5 000", fs + 4, VERT_OK), y=1.35, xl=xl + 1.0)
        self.play(FadeIn(f2, scale=1.4), run_time=0.35)
        self.secouer(vx, vy, [(215, 190), (180, 225)])
        self.au_mot("Mais seulement")
        f3 = self.ligne(self.t("seulement si indépendantes !", 32, ROUGE_ERREUR), y=0.65, xl=xl)
        self.play(FadeIn(f3, shift=UP * 0.1), run_time=0.35)
        self.insister(f3, 1.06)
        self.play(vx.animate.set_value(200), vy.animate.set_value(200), run_time=0.4)
        self.au_mot("Des jumeaux")
        jum = self.t("jumeaux", 30, ROUGE_ERREUR).move_to(ind)
        py2 = personne(COUL_Y, 1.0, PEAUX[1]).move_to(py)
        self.play(ReplacementTransform(ind, jum), Transform(py, py2), run_time=0.45)
        self.au_mot("Y égale X")
        f4 = self.ligne(self.t("Jumeaux :", fs - 2, ROUGE_ERREUR), self.t("Y = X", fs), y=-0.15, xl=xl)
        ly2 = self.t("Y = X", 32, COUL_Y).move_to(ly)
        self.play(FadeIn(f4, shift=UP * 0.1), ReplacementTransform(ly, ly2), run_time=0.4)
        self.secouer(vx, vy, [(250, 250), (150, 150)])
        self.au_nb("Alors", "2 X")
        f5 = self.ligne(self.t("X + Y = 2X", fs), y=-0.85, xl=xl)
        self.play(FadeIn(f5, shift=UP * 0.1), run_time=0.35)
        self.au_mot("4 fois")
        f6 = self.ligne(self.t("V(2X) = 4 ×", fs), self.t("2 500 =", fs), self.t("10 000", fs + 4, ROUGE_ERREUR),
                        y=-1.55, xl=xl)
        self.play(FadeIn(f6[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("4 fois", "2 500")
        self.play(FadeIn(f6[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 000")
        self.play(FadeIn(f6[2], scale=1.4), run_time=0.35)
        self.au_nb("Pas", "5 000")
        pas = self.ligne(self.t("Pas 5 000 !", fs, ROUGE_ERREUR), y=-2.3, xl=xl)
        self.play(FadeIn(pas, scale=1.3), run_time=0.35)
        self.secouer(vx, vy, [(240, 240), (160, 160), (200, 200)])
        self.attendre_voix(marge=0.5)
        decor.clear_updaters()
        for m in decor:
            m.clear_updaters()

    # ── 07 : question-pause n° 2 : V(X − Y) ────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-question")
        t0 = self.renderer.time
        vx, vy, decor = self.decor_barres(xs=(-5.35, -4.1, -2.2), avec_total=False)
        y_zero, k2 = -1.35, 0.011
        zero = Line(P(-2.95, y_zero), P(-1.45, y_zero), stroke_width=2, color=GREY_B)

        def ecart():
            d = vx.get_value() - vy.get_value()
            h = max(abs(d) * k2, 0.01)
            return Rectangle(width=0.9, height=h, fill_color=VIOLET_ACCENT, fill_opacity=0.9, stroke_color=WHITE,
                             stroke_width=1.5).move_to(P(-2.2, y_zero + (h / 2 if d >= 0 else -h / 2)))
        bd = always_redraw(ecart)
        labs = VGroup(self.t("X", 32, COUL_X).move_to(P(-5.35, -2.95)), self.t("Y", 32, COUL_Y).move_to(P(-4.1, -2.95)),
                      self.t("X − Y", 32, VIOLET_ACCENT).move_to(P(-2.2, -2.95)))
        q1 = self.t("X et Y indépendantes,", 32)
        q2 = VGroup(self.t("variance", 32), self.t("2 500", 32), self.t("chacune.", 32)).arrange(RIGHT, buff=0.14)
        q3 = self.t("V(X − Y) = ?", 34)
        tete, q, cartes, pause, rebours = self.q_tete([q1, q2, q3], ["0", "5 000", "2 500"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), FadeIn(decor), run_time=0.4)
        self.au_mot("X et Y")
        self.play(FadeIn(q1, shift=UP * 0.1), FadeIn(labs[:2]), run_time=0.35)
        self.au_mot("de variance")
        self.play(FadeIn(q2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("2 500")
        self.play(FadeIn(q2[1:], shift=UP * 0.1), run_time=0.3)
        self.secouer(vx, vy, [(235, 170), (175, 225)], rt=0.4)
        self.au_mot("X moins Y")
        self.add(zero, bd)
        self.play(FadeIn(q3, shift=UP * 0.1), FadeIn(labs[2]), FadeIn(zero), run_time=0.35)
        self.secouer(vx, vy, [(240, 165), (165, 235), (210, 190)], rt=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07-question", t0, 1)
        self.dire("07b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        fs = 36
        l1 = self.calc([("X − Y =", WHITE), ("X + (−Y)", COUL_Y)], fs)
        l2 = self.calc([("V(−Y) =", WHITE), ("(−1)²", COUL_Y), ("× 2 500", WHITE), ("= 2 500", VERT_OK)], fs)
        l3 = self.calc([("V(X − Y) =", WHITE), ("2 500 + 2 500", WHITE), ("= 5 000", VERT_OK)], fs)
        l3[1]._pas_audit = True  # 2 500 : déjà dit, on le recopie
        bloc = VGroup(l1, l2, l3).arrange(DOWN, aligned_edge=LEFT, buff=0.24)
        if bloc.width > 7.4:
            bloc.scale_to_fit_width(7.4)
        bloc.move_to(P(0, 0)).align_to(P(-6.2, 0), LEFT).align_to(P(0, 2.95), UP)
        self.au_mot("X moins Y, c'est")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("X plus moins Y")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("La variance de moins Y")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("vaut moins", "1")
        self.play(FadeIn(l2[1], scale=1.3), run_time=0.25)
        self.au_nb("au carré fois", "2 500")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.25)
        self.au_temps(9.0)  # le 2e « 2 500 » (marque fusionnée avec le 1er) : cue à 9,0 s
        self.play(FadeIn(l2[3], scale=1.3), run_time=0.3)
        self.au_mot("Les variances")
        self.play(FadeIn(l3[:2], shift=UP * 0.1), run_time=0.35)
        self.au_mot("5 000")
        self.play(FadeIn(l3[2], scale=1.4), run_time=0.35)
        self.insister(l3[2], 1.2)
        self.au_mot("Soustraire")
        anims, barre = self.piege(cartes[0])
        s1 = self.t("Soustraire ne retire pas le hasard,", 32, ROUGE_ERREUR)
        s1.move_to(P(0, 0)).align_to(P(-6.2, 0), LEFT).align_to(P(0, bloc.get_bottom()[1] - 0.35), UP)
        self.play(*anims, FadeIn(s1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("il s'ajoute")
        s2 = self.t("il s'ajoute.", 36, VERT_OK).next_to(s1, DOWN, buff=0.15).align_to(s1, LEFT)
        self.play(FadeIn(s2, scale=1.2), run_time=0.35)
        self.secouer(vx, vy, [(240, 160), (170, 230)], rt=0.4)
        self.attendre_voix(marge=0.5)
        for m in list(decor) + [bd]:
            m.clear_updaters()

    # ── 08 : la loi binomiale, somme de 100 Bernoulli ──────────────────────

    def allumer(self, grille, ids, run_time=0.5):
        anims = []
        for k, p in enumerate(grille):
            c = COUL_Y if k in ids else COUL_X
            anims.append(p[0].animate.set_fill(c, 1))
        self.play(*anims, run_time=run_time)

    def ecran_bernoulli(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-bernoulli")
        xl = -1.3
        fs = 36
        tit = self.t("Une somme célèbre : la loi binomiale", 40, JAUNE_TITRE).move_to(P(0, 3.1))
        tit.align_to(P(-6.2, 0), LEFT)
        self.au_mot("Une somme")
        self.play(Write(tit), run_time=0.8)
        g = self.grille(-6.0, 2.25)
        self.au_mot("Chaque adhérent")
        self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in g], lag_ratio=0.008), run_time=1.0)
        rng = random.Random(11)
        tirage1 = set(rng.sample(range(100), 10))
        tirage2 = set(rng.sample(range(100), 10))
        tirage3 = set(rng.sample(range(100), 10))
        self.au_mot("0,1")
        l1 = self.ligne(self.t("hospitalisé : probabilité", fs, COUL_Y), self.t("0,1", fs + 4, COUL_Y), y=2.45, xl=xl)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.allumer(g, tirage1, 0.4)
        self.au_mot("indépendamment")
        self.allumer(g, tirage2, 0.45)
        self.au_mot("Pour un adhérent")
        un = SurroundingRectangle(g[0], color=ESP, buff=0.05, stroke_width=4)
        self.play(Create(un), run_time=0.4)
        self.au_mot("Bernoulli")
        l2 = self.ligne(self.t("un adhérent : Bernoulli", fs, ESP), y=1.8, xl=xl)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_nb("espérance", "0,1")
        l3 = self.ligne(self.t("E = 0,1", fs), self.t("V = 0,1 ×", fs), self.t("0,9", fs), y=1.2, xl=xl, buff=0.2)
        l3[1].shift(RIGHT * 0.5)
        l3[2].shift(RIGHT * 0.5)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("variance", "0,1")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("0,9")
        self.play(FadeIn(l3[2], scale=1.3), run_time=0.3)
        self.au_nb("parmi", "100")
        acc = Brace(g, DOWN, buff=0.08, color=COUL_Y)
        cent = self.t("100", 32, COUL_Y).next_to(acc, DOWN, buff=0.06)
        l4 = self.ligne(self.t("parmi 100 :", 34, COUL_Y), self.t("somme de 100 Bernoulli", 34, COUL_Y), y=0.45,
                        xl=xl, buff=0.2)
        self.play(FadeOut(un), GrowFromCenter(acc), FadeIn(cent), FadeIn(l4[0], shift=UP * 0.1), run_time=0.4)
        self.allumer(g, tirage3, 0.4)
        self.au_nb("la somme de", "100")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("loi binomiale", n=2)
        l5 = self.ligne(self.t("suit la loi binomiale", fs), self.t("B(100 ; 0,1)", fs + 4, VERT_OK), y=-0.2, xl=xl)
        self.play(FadeIn(l5[0], shift=UP * 0.1), Write(l5[1]), run_time=0.6)
        self.au_nb("Espérance :", "100")
        l6 = self.ligne(self.t("E = 100 ×", fs), self.t("0,1", fs), self.t("= 10", fs + 4, VERT_OK), y=-0.95, xl=xl)
        self.play(FadeIn(l6[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("Espérance : 100 fois", "0,1")
        self.play(FadeIn(l6[1], shift=UP * 0.1), run_time=0.25)
        self.au_nb("soit", "10")
        self.play(FadeIn(l6[2], scale=1.4), run_time=0.3)
        self.au_nb("Variance :", "100")
        l7 = self.ligne(self.t("V = 100 ×", fs), self.t("0,1 ×", fs), self.t("0,9", fs), self.t("= 9", fs + 4, VERT_OK),
                        y=-1.65, xl=xl)
        self.play(FadeIn(l7[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("Variance : 100 fois", "0,1")
        self.play(FadeIn(l7[1], shift=UP * 0.1), run_time=0.25)
        self.au_nb("Variance : 100 fois 0,1 fois", "0,9")
        self.play(FadeIn(l7[2], shift=UP * 0.1), run_time=0.25)
        self.au_nb("soit", "9", n=2)
        self.play(FadeIn(l7[3], scale=1.4), run_time=0.3)
        self.au_mot("n p,")
        np1 = self.t("np", fs + 4, ESP)
        np2 = self.t("np(1 − p)", fs + 4, COUL_Y)
        l8 = self.ligne(self.t("On retrouve", fs - 2, GREY_A), np1, self.t("et", fs - 2, GREY_A), np2, y=-2.45, xl=xl,
                        buff=0.25)
        self.play(FadeIn(l8[:2], shift=UP * 0.1), Indicate(l6[2], color=ESP), run_time=0.45)
        self.au_mot("1 moins p")
        self.play(FadeIn(l8[2:], shift=UP * 0.1), Indicate(l7[3], color=COUL_Y), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 09 : S = X₁ + … + X₁₀₀ : la caisse de la mutuelle ─────────────────

    def ecran_echantillon(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-echantillon")
        xl = -1.4
        fs = 40
        g = self.grille(-6.0, 2.85, pas=0.36, s=0.27)
        self.au_mot("100 adhérents")
        self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in g], lag_ratio=0.008), run_time=1.0)
        self.au_mot("même loi")
        mx = self.t("même loi que X", 32, COUL_X).move_to(P(-4.4, -0.95))
        self.play(FadeIn(mx, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Leur total")
        caisse = RoundedRectangle(width=2.3, height=1.15, corner_radius=0.15, fill_color="#052e16", fill_opacity=1,
                                  stroke_color=SANTE, stroke_width=4).move_to(P(-4.4, -2.45))
        cr = croix(0.45).move_to(caisse.get_left() + RIGHT * 0.45)
        s = self.t("S", 56, ESP).move_to(caisse.get_center() + RIGHT * 0.35)
        self.play(FadeIn(caisse), FadeIn(cr), FadeOut(mx), run_time=0.3)
        pieces = VGroup(*[Dot(p.get_center(), radius=0.05, color=ESP) for p in g])
        self.add(pieces)
        self.play(LaggedStart(*[d.animate.move_to(caisse.get_center()) for d in pieces], lag_ratio=0.006),
                  run_time=0.6)
        self.remove(pieces, *pieces)
        self.au_mot("la somme X")
        l1 = [self.t("S =", fs, ESP), indice("X", "1", fs, COUL_X), self.t("+", fs), indice("X", "2", fs, COUL_X),
              self.t("+ … +", fs), indice("X", "100", fs, COUL_X)]
        l1 = self.ligne(*l1, y=2.45, xl=xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(s, scale=1.6), run_time=0.25)
        self.au_nb("la somme X", "1")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_nb("plus X", "2")
        self.play(FadeIn(l1[2:4], shift=UP * 0.1), run_time=0.25)
        self.au_nb("jusqu'à X", "100")
        self.play(FadeIn(l1[4:], shift=UP * 0.1), run_time=0.3)
        self.au_nb("Espérance de S", "100")
        l2 = self.ligne(self.t("E(S) = 100 ×", fs), self.t("200", fs), self.t("= 20 000", fs + 4, VERT_OK), y=1.4, xl=xl)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("Espérance de S : 100 fois", "200")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("20 000")
        self.play(FadeIn(l2[2], scale=1.3), run_time=0.3)
        self.au_nb("Variance de S", "100")
        l3 = self.ligne(self.t("V(S) = 100 ×", fs), self.t("2 500", fs), self.t("= 250 000", fs + 4, VERT_OK), y=0.45,
                        xl=xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("Variance de S : 100 fois", "2 500")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("250 000")
        self.play(FadeIn(l3[2], scale=1.3), run_time=0.3)
        self.au_mot("Écart-type")
        l4 = self.ligne(self.t("σ(S) =", fs, ESP), self.t("√250 000", fs), self.t("= 500", fs + 6, VERT_OK), y=-0.55,
                        xl=xl)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("racine", "250 000")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_nb("racine de 250 000", "500")
        cad = SurroundingRectangle(l4, color=VERT_OK, buff=0.14, stroke_width=3)
        self.play(FadeIn(l4[2], scale=1.4), Create(cad), run_time=0.4)
        self.insister(l4[2], 1.25)
        self.attendre_voix(marge=0.6)

    # ── 10 : question-pause n° 3 : l'écart-type du total ───────────────────

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        self.dire("10-question")
        t0 = self.renderer.time
        un = personne(COUL_X, 1.1, PEAUX[2]).move_to(P(-5.5, 2.15))
        g = self.grille(-4.05, 2.7, pas=0.34, s=0.25)
        acc = Brace(g, DOWN, buff=0.08, color=ORANGE_RETENUE)
        tot = self.t("σ du total ?", 32, ORANGE_RETENUE).next_to(acc, DOWN, buff=0.08)
        q1 = VGroup(self.t("Un adhérent : σ =", 34), self.t("50", 34)).arrange(RIGHT, buff=0.14)
        q2 = VGroup(self.t("100 adhérents", 34), self.t("indépendants :", 34)).arrange(DOWN, aligned_edge=LEFT,
                                                                                        buff=0.12)
        q3 = self.t("σ du total = ?", 34)
        tete, q, cartes, pause, rebours = self.q_tete([q1, q2, q3], ["5 000", "500", "50"], largeur=2.9)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("L'écart-type")
        self.play(FadeIn(q1[0], shift=UP * 0.1), FadeIn(un, shift=UP * 0.15), run_time=0.35)
        self.au_mot("50")
        s50 = self.t("σ = 50", 30, COUL_X).next_to(un, DOWN, buff=0.12)
        self.play(FadeIn(q1[1], scale=1.3), FadeIn(s50, scale=1.3), run_time=0.3)
        self.au_mot("100 adhérents")
        self.play(FadeIn(q2, shift=UP * 0.1), LaggedStart(*[FadeIn(p, scale=0.5) for p in g], lag_ratio=0.006),
                  run_time=0.8)
        self.au_mot("l'écart-type du total")
        self.play(FadeIn(q3, shift=UP * 0.1), GrowFromCenter(acc), FadeIn(tot), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "10-question", t0, 1)
        self.dire("10b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        fs = 36
        self.au_mot("le piège")
        anims, barre = self.piege(cartes[0])
        self.play(*anims, run_time=0.4)
        l1 = self.t("On additionne les variances,", fs, VERT_OK)
        l2 = self.t("pas les écarts-types !", fs, ROUGE_ERREUR)
        l3 = self.calc([("σ × √100", WHITE), ("soit × 10 :", WHITE), ("500", VERT_OK)], fs + 2, buff=0.25)
        bloc = VGroup(l1, l2, l3).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        bloc.move_to(P(0, 0)).align_to(P(-6.2, 0), LEFT).align_to(P(0, -1.5), UP)
        self.au_mot("on additionne")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("pas les écarts-types")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_nb("racine de", "100")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("soit", "10")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("500")
        tot2 = self.t("σ du total = 500", 32, VERT_OK).move_to(tot)
        self.play(FadeIn(l3[2], scale=1.5), ReplacementTransform(tot, tot2), run_time=0.4)
        self.insister(l3[2], 1.3)
        self.attendre_voix(marge=0.6)

    # ── 11 : le secret de l'assurance : 25 % → 2,5 % ─────────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("11-sens")
        self.au_mot("secret")
        tit = self.t("Le secret de l'assurance", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 36
        self.au_nb("multiplié par", "100")
        m1 = self.calc([("total moyen :", ESP), ("× 100", ESP)], fs).move_to(P(-3.3, 2.25))
        self.play(FadeIn(m1, shift=UP * 0.1), run_time=0.35)
        self.au_nb("seulement par", "10")
        m2 = self.calc([("écart-type :", COUL_Y), ("× 10", COUL_Y)], fs).move_to(P(2.4, 2.25))
        self.play(FadeIn(m2, shift=UP * 0.1), run_time=0.35)
        xa, L = -2.4, 6.4

        def rangee(y, nom, s):
            lab = self.t(nom, 32).move_to(P(0, y)).align_to(P(-6.2, 0), LEFT)
            moy = Rectangle(width=L, height=0.34, fill_color=ESP, fill_opacity=0.85, stroke_width=0)
            moy.move_to(P(xa + L / 2, y - 0.25))
            ec = Rectangle(width=L * s, height=0.34, fill_color=COUL_Y, fill_opacity=0.95, stroke_width=0)
            ec.move_to(P(xa + L * s / 2, y + 0.25))
            return lab, moy, ec

        lab1, moy1, ec1 = rangee(0.95, "un adhérent", 0.25)
        lab2, moy2, ec2 = rangee(-1.1, "100 adhérents", 0.025)
        self.au_mot("Pour un adhérent")
        lm = self.t("moyenne", 26, ESP).next_to(moy1, DOWN, buff=0.08).align_to(moy1, LEFT)
        self.play(FadeIn(lab1, shift=RIGHT * 0.1), GrowFromEdge(moy1, LEFT), run_time=0.5)
        self.au_mot("25 %")
        p1 = self.t("25 %", 34, COUL_Y).next_to(ec1, RIGHT, buff=0.15)
        self.play(GrowFromEdge(ec1, LEFT), FadeIn(p1, scale=1.3), run_time=0.45)
        self.au_mot("de la moyenne")
        self.play(FadeIn(lm, shift=UP * 0.1), Indicate(moy1, color=ESP, scale_factor=1.03), run_time=0.4)
        self.au_mot("50 sur")
        r1 = self.t("50", 30, GREY_A)
        r1b = self.t("/ 200", 30, GREY_A)
        rr1 = VGroup(r1, r1b).arrange(RIGHT, buff=0.1).next_to(p1, RIGHT, buff=0.45)
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.25)
        self.au_nb("50 sur", "200")
        self.play(FadeIn(r1b, shift=UP * 0.1), run_time=0.25)
        self.au_mot("100 adhérents")
        self.play(FadeIn(lab2, shift=RIGHT * 0.1), GrowFromEdge(moy2, LEFT), run_time=0.45)
        self.au_mot("2,5 %")
        p2 = self.t("2,5 %", 34, COUL_Y).next_to(ec2, RIGHT, buff=0.15)
        tr = ec1.copy()
        self.play(Transform(tr, ec2), FadeIn(p2, scale=1.3), run_time=0.8)
        self.insister(p2, 1.3)
        self.au_mot("500 sur")
        r2 = self.t("500", 30, GREY_A)
        r2b = self.t("/ 20 000", 30, GREY_A)
        VGroup(r2, r2b).arrange(RIGHT, buff=0.1).next_to(p2, RIGHT, buff=0.45)
        self.play(FadeIn(r2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("20 000")
        self.play(FadeIn(r2b, shift=UP * 0.1), run_time=0.25)
        self.au_mot("Plus on est")
        fin = self.t("Plus on est nombreux, plus le total est prévisible.", 38, VERT_OK, larg=10.0).move_to(P(-0.7, -2.6))
        self.play(FadeIn(fin, scale=1.1), run_time=0.5)
        self.insister(fin, 1.06)
        self.attendre_voix(marge=0.7)

    # ── 12 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("12-appris")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 36
        b1 = VGroup(self.t("E(X + Y) = E(X) + E(Y) :", fs, ESP), self.t("toujours.", fs, VERT_OK)).arrange(RIGHT,
                                                                                                    buff=0.2)
        b2a = self.t("V(X + Y) = V(X) + V(Y) :", fs, COUL_Y)
        b2b = self.t("seulement si X et Y sont indépendantes.", fs, ROUGE_ERREUR)
        b2 = VGroup(b2a, b2b).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        b3 = VGroup(self.t("V(aX + b) = a²V(X)", fs, VERT_OK))
        b4a = self.t("n copies indépendantes :", fs)
        e4 = [self.t("E × n,", fs, ESP), self.t("V × n,", fs, COUL_Y), self.t("σ × √n", fs, VERT_OK)]
        b4b = VGroup(*e4).arrange(RIGHT, buff=0.35)
        b4 = VGroup(b4a, b4b).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP) for b in (b1, b2, b3, b4)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.6, -0.35))
        self.au_mot("L'espérance d'une somme")
        self.play(Create(lignes[0][0]), FadeIn(b1[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("toujours")
        self.play(FadeIn(b1[1], scale=1.2), run_time=0.3)
        self.au_mot("La variance d'une somme")
        self.play(Create(lignes[1][0]), FadeIn(b2a, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("seulement si")
        self.play(FadeIn(b2b, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Variance de a X")
        self.play(Create(lignes[2][0]), FadeIn(b3, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Pour n copies")
        self.play(Create(lignes[3][0]), FadeIn(b4a, shift=RIGHT * 0.2), run_time=0.5)
        for mot, m in zip(["espérance fois", "variance fois", "écart-type fois"], e4):
            self.au_mot(mot)
            self.play(FadeIn(m, scale=1.2), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 13 : la fin (règle du 19/10, identique aux modèles) ────────────────

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
        self.ecran_linearite()
        self.ecran_affine()
        self.ecran_question1()
        self.ecran_independance()
        self.ecran_question2()
        self.ecran_bernoulli()
        self.ecran_echantillon()
        self.ecran_question3()
        self.ecran_sens()
        self.ecran_appris()
        self.page_abonnement()


class ProbaVaSommeTerminale(ProbaVaSommeBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "verte"
