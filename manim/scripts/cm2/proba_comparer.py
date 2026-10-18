# proba_comparer.py
# EleveAI — Maths CM2 — série « Probabilités », épisode 3 : comparer des
# chances (micro : probabilite_comparer), AVEC VOIX. Paysage 16:9, CEINTURE
# BLANCHE. Short jumeau : proba_comparer_short.py (ceinture jaune).
#
# Écrans : 00 garde (le grand sac ou le petit ?) · 01 la tombola, stand A
# (3 gagnants sur 10) et stand B (1 sur 5) · 02 ramener au même total : les
# 5 tickets du stand B se DOUBLENT en 10 · 03 3 sur 10 contre 2 sur 10 ·
# 04 la méthode · 05 le piège (4 sur 20 contre 2 sur 5 = 8 sur 20 : la rangée
# de D se copie quatre fois) · 06 défi des deux sacs (2 sur 8, 1 sur 3) ·
# 06b correction (tout ramené à 24) · 07 ce que tu as appris · 08 abonnement.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque cm2/maths/probabilites.bank.ts, micro probabilite_comparer) :
#   · « billes » (urneCanvas) : billes en grille, colonnes = min(6, max(3,
#     ⌈√n⌉)), rouge #ef4444 / bleu #3b82f6, liseré ardoise, lettre R / B
#     blanche au centre, sur une carte blanche (défi des deux sacs) ;
#   · les urnes « tombola » de la banque (tickets) : dessinées en tickets, les
#     gagnants en couleur (ambre du coach + étoile), les autres en gris.
# ⛔ 17/10 « pas d'écart » : aucun nombre n'est écrit avant d'être dit ; le
# « × 2 » ou le « × 4 » ne s'écrit pas (la voix ne le dit pas) : on le VOIT,
# la rangée de tickets se recopie.
#
# Voix : manim/voix/cm2-proba-comparer.json (Julie, débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/cm2/proba_comparer.py ProbaComparerCM2 -o eleveai-maths-cm2-proba-comparer --media_dir manim/scripts/cm2/media
# Puis copier le mp4 dans manim/sorties/cm2/maths/probabilites/03-comparer/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# couleurs du coach
ARDOISE = "#0F172A"
CARTE_FOND = "#FFFFFF"
BORD_GRIS = "#CBD5E1"
ROUGE_BILLE = "#EF4444"
BLEU_BILLE = "#3B82F6"
GAGNANT = "#FBBF24"      # l'ambre du coach (case surlignée)
PERDANT = "#94A3B8"      # ticket ordinaire, gris
GRIS_ETEINT = "#6B7280"


class NotionCM2(Notion6e):
    identite = "Maths CM2 — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les tickets de la tombola ───────────────────────────────────────────────

def ticket(gagnant, w=0.8):
    """Un ticket : rectangle à encoches ; gagnant = ambre + étoile blanche,
    sinon gris. [0] corps, [1] encoches, [2] étoile (ou vide)."""
    h = w * 0.55
    corps = RoundedRectangle(width=w, height=h, corner_radius=w * 0.06,
                             fill_color=GAGNANT if gagnant else PERDANT, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    enc = VGroup(*[Circle(radius=h * 0.16, fill_color=ARDOISE, fill_opacity=1, stroke_width=0)
                   .move_to(corps.get_edge_center(d)) for d in (LEFT, RIGHT)])
    etoile = VGroup()
    if gagnant:
        etoile = Star(5, outer_radius=h * 0.36, fill_color=WHITE, fill_opacity=1, stroke_color=ARDOISE,
                      stroke_width=1.5).move_to(corps)
    return VGroup(corps, enc, etoile)


def rangee(gagnants, n, w=1.0, pas=1.15):
    """Une rangée de n tickets ; `gagnants` = indices des gagnants."""
    return VGroup(*[ticket(i in gagnants, w).move_to(P(i * pas, 0)) for i in range(n)])


def bloc(lignes, w=1.0, pas=1.15, pas_y=0.78):
    """Plusieurs rangées : lignes = [(gagnants, n), …] de haut en bas."""
    g = VGroup()
    for k, (gs, n) in enumerate(lignes):
        g.add(rangee(gs, n, w, pas).shift(DOWN * k * pas_y))
    return g


def stand(nom, largeur, hauteur, centre):
    """Le cadre d'un stand, son nom au-dessus (le nom est dit par la voix)."""
    c = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.2, stroke_color=BLEU_CALCUL,
                         stroke_width=3, fill_color=ARDOISE, fill_opacity=0.6).move_to(centre)
    t = Text(nom, font_size=40, color=BLEU_CALCUL, weight=BOLD).next_to(c, UP, buff=0.15)
    return VGroup(c, t)


# ── le canvas « billes » du coach ───────────────────────────────────────────

def bille_coach(couleur, lettre, r=0.3):
    d = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ARDOISE, stroke_width=3)
    l = Text(lettre, font_size=int(r * 70), color=WHITE, weight=BOLD)
    l.set_stroke(ARDOISE, width=2, background=True).move_to(d)
    return VGroup(d, l)


def carte_billes(elements, r=0.34, pas=0.85):
    """Le canvas « billes » : colonnes = min(6, max(3, ⌈√n⌉)). Renvoie (carte, billes)."""
    n = len(elements)
    cols = min(6, max(3, math.ceil(math.sqrt(n))))
    billes = VGroup()
    for i, (coul, lettre) in enumerate(elements):
        billes.add(bille_coach(coul, lettre, r).move_to(P((i % cols) * pas, -(i // cols) * pas)))
    lignes = math.ceil(n / cols)
    fond = RoundedRectangle(width=cols * pas + 0.3, height=lignes * pas + 0.3, corner_radius=0.2,
                            fill_color=CARTE_FOND, fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=2)
    fond.move_to(P((cols - 1) * pas / 2, -(lignes - 1) * pas / 2))
    return VGroup(fond, billes), billes


def sac_autour(carte):
    """Le sac (dessiné autour de la carte du coach)."""
    corps = RoundedRectangle(width=carte.width + 0.6, height=carte.height + 0.6, corner_radius=0.45,
                             stroke_color=WHITE, stroke_width=4, fill_color="#E0F2FE",
                             fill_opacity=0.08).move_to(carte)
    col = Polygon(P(-0.6, 0), P(0.6, 0), P(0.35, 0.35), P(-0.35, 0.35), stroke_color=WHITE, stroke_width=4,
                  fill_color="#E0F2FE", fill_opacity=0.08).move_to(corps.get_top() + UP * 0.17)
    lien = Line(P(-0.42, 0), P(0.42, 0), color=ORANGE_RETENUE, stroke_width=7).move_to(corps.get_top() + UP * 0.2)
    return VGroup(corps, col, lien)


def sac_simple(s=1.0):
    """Un sac de billes fermé (page de garde)."""
    corps = Ellipse(width=2.0, height=1.8, fill_color="#B45309", fill_opacity=1, stroke_color=WHITE,
                    stroke_width=3)
    col = Polygon(P(-0.45, 0.75), P(0.45, 0.75), P(0.65, 1.15), P(-0.65, 1.15), fill_color="#B45309",
                  fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    lien = Line(P(-0.5, 0.8), P(0.5, 0.8), color=ORANGE_RETENUE, stroke_width=7)
    return VGroup(corps, col, lien).scale(s)


# ── la vidéo ────────────────────────────────────────────────────────────────

XA, XB, YS = -3.55, 2.95, 0.85         # centres des deux stands
Y_TXT = -0.95                         # la ligne de texte sous les stands


def stand_a():
    """Stand A : 10 tickets en 2 rangées de 5, 3 gagnants."""
    return bloc([([1, 3], 5), ([2], 5)]).move_to(P(XA, YS))


def rangee_b():
    """Stand B : 1 rangée de 5 tickets, 1 gagnant (à la place de la 1re rangée)."""
    return rangee([1], 5).move_to(P(XB, YS + 0.39))


class ProbaComparerCM2(NotionCM2):
    nom_voix = "cm2-proba-comparer"

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        """Une ligne en morceaux colorés, d'UN SEUL Text ; ligne[i] = i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):
            return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        g, k = VGroup(), 0
        for (m, c), n in zip(morceaux, tailles):
            g.add(VGroup(*T[k:k + n]).set_color(c))
            k += n
        return g

    def sur(self, a, b, font_size=44, ca=GAGNANT, cb=JAUNE_TITRE, mot=None):
        """« a sur b » (ou « a gagnants sur b »), les nombres en couleur."""
        m = [(str(a), ca)]
        if mot:
            m.append((mot, WHITE))
        m += [("sur", WHITE), (str(b), cb)]
        return self.ligne(m, font_size, 0.2)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def gagnants(self, groupe):
        """Les tickets gagnants (ceux qui portent une étoile)."""
        return [tk for tk in self._tickets(groupe) if len(tk[2]) > 0]

    def _tickets(self, groupe):
        """Tous les tickets d'un groupe (rangée ou bloc), à plat."""
        out = []
        for m in groupe:
            if isinstance(m[0], RoundedRectangle):
                out.append(m)
            else:
                out += self._tickets(m)
        return out

    def sauter(self, tickets, h=0.2):
        self.play(*[tk.animate.shift(UP * h) for tk in tickets], run_time=0.2)
        self.play(*[tk.animate.shift(DOWN * h) for tk in tickets], run_time=0.3,
                  rate_func=rate_functions.ease_out_bounce)

    def deux_stands(self, nom_a="Stand A", nom_b="Stand B"):
        return stand(nom_a, 6.2, 2.3, P(XA, YS)), stand(nom_b, 6.2, 2.3, P(XB, YS))

    def doubler(self, r, decalage, run_time=0.8):
        """« Ramener au même total » : la rangée se RECOPIE juste en dessous."""
        copie = r.copy()
        self.play(copie.animate.shift(DOWN * decalage), run_time=run_time)
        return copie

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Comparer des chances", 60, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("blanche").move_to(P(-0.6, -2.75))
        self.add(ech)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), run_time=1.0)
        self.au_mot("le grand sac")
        grand = sac_simple(1.25).move_to(P(-3.4, -0.3))
        self.play(FadeIn(grand, scale=0.5), run_time=0.4)
        self.au_mot("ou le petit")
        petit = sac_simple(0.7).move_to(P(1.6, -0.55))
        self.play(FadeIn(petit, scale=0.5), run_time=0.4)
        q = self.t("?", 120, ORANGE_RETENUE).move_to(P(-0.9, -0.3))
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 0.3)
        self.attendre_voix(marge=1.0)

    # ── 01 : la tombola ─────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Tombola de l'école")
        sa, sb = self.deux_stands()
        A, B = stand_a(), rangee_b()
        self.au_mot("Stand A")
        self.play(FadeIn(sa, shift=UP * 0.2), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(tk, scale=0.4) for tk in self._tickets(A)], lag_ratio=0.08), run_time=0.9)
        self.au_mot("3 tickets gagnants")
        la = self.sur(3, 10, 50, mot="gagnants").move_to(P(XA, Y_TXT))
        self.play(FadeIn(la[:2], shift=UP * 0.15), run_time=0.3)
        self.sauter(self.gagnants(A))
        self.au_mot("sur 10")
        cadre_a = SurroundingRectangle(A, color=JAUNE_TITRE, buff=0.12, stroke_width=5)
        self.play(FadeIn(la[2:], shift=UP * 0.15), Create(cadre_a), run_time=0.4)
        self.play(FadeOut(cadre_a), run_time=0.3)
        self.au_mot("Stand B")
        self.play(FadeIn(sb, shift=UP * 0.2), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(tk, scale=0.4) for tk in B], lag_ratio=0.1), run_time=0.6)
        self.au_mot("1 ticket gagnant")
        lb = self.sur(1, 5, 50, mot="gagnant").move_to(P(XB, Y_TXT))
        self.play(FadeIn(lb[:2], shift=UP * 0.15), run_time=0.3)
        self.sauter(self.gagnants(B))
        self.au_mot("sur 5")
        cadre_b = SurroundingRectangle(B, color=JAUNE_TITRE, buff=0.12, stroke_width=5)
        self.play(FadeIn(lb[2:], shift=UP * 0.15), Create(cadre_b), run_time=0.4)
        self.play(FadeOut(cadre_b), run_time=0.3)
        self.au_mot("Où jouer")
        q = self.chute("Où jouer ?", color=ORANGE_RETENUE, font_size=52)
        self.play(FadeIn(q, scale=0.6), run_time=0.4)
        self.insister(q, 0.3)
        self.attendre_voix()

    # ── 02 : ramener au même total ──────────────────────────────────────────

    def ecran_meme_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-meme-total")
        self.titre_ecran("Le même total")
        sa, sb = self.deux_stands()
        A, B = stand_a(), rangee_b()
        self.add(sa, sb, A, B)
        self.au_mot("10 et 5")
        ca = SurroundingRectangle(A, color=JAUNE_TITRE, buff=0.12, stroke_width=5)
        dix = self.t("10", 66, JAUNE_TITRE).move_to(P(XA, Y_TXT))
        self.play(Create(ca), FadeIn(dix, scale=0.5), run_time=0.4)
        self.au_mot("et 5")
        cb = SurroundingRectangle(B, color=JAUNE_TITRE, buff=0.12, stroke_width=5)
        cinq = self.t("5", 66, JAUNE_TITRE).move_to(P(XB, Y_TXT))
        self.play(Create(cb), FadeIn(cinq, scale=0.5), run_time=0.4)
        self.au_mot("Pour comparer")
        self.play(FadeOut(ca), FadeOut(cb), run_time=0.3)
        self.au_mot("je ramène au même total")
        B2 = self.doubler(B, 0.78, 1.0)
        self.play(FadeOut(cinq), run_time=0.3)
        self.au_mot("1 sur 5")
        l1 = self.sur(1, 5, 50).move_to(P(XB, Y_TXT))
        self.play(FadeIn(l1, shift=UP * 0.15), Indicate(B, color=WHITE, scale_factor=1.06), run_time=0.5)
        self.au_mot("c'est comme 2 sur 10")
        l2 = self.ligne([("c'est comme", WHITE), ("2", GAGNANT), ("sur", WHITE), ("10", JAUNE_TITRE)], 50, 0.2)
        l2.move_to(P(XB, Y_TXT - 0.85))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.sauter(self.gagnants(VGroup(B, B2)))
        self.insister(l2[1:], 0.3)
        self.attendre_voix()

    # ── 03 : comparer ───────────────────────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-comparer")
        self.titre_ecran("On compare")
        sa, sb = self.deux_stands()
        A, B = stand_a(), rangee_b()
        B2 = B.copy().shift(DOWN * 0.78)
        self.add(sa, sb, A, B, B2)
        la = self.sur(3, 10, 56).move_to(P(XA, Y_TXT))
        lb = self.sur(2, 10, 56).move_to(P(XB, Y_TXT))
        self.au_mot("3 sur 10")
        self.play(FadeIn(la, shift=UP * 0.15), run_time=0.4)
        self.sauter(self.gagnants(A))
        self.au_mot("contre")
        vs = self.t("contre", 34, GRIS_ETEINT).move_to(P((XA + XB) / 2, Y_TXT))
        self.play(FadeIn(vs), run_time=0.3)
        self.au_mot("2 sur 10")
        self.play(FadeIn(lb, shift=UP * 0.15), run_time=0.4)
        self.sauter(self.gagnants(VGroup(B, B2)))
        self.au_mot("le stand A")
        self.play(sa[0].animate.set_stroke(VERT_OK, 7), sa[1].animate.set_color(VERT_OK), run_time=0.4)
        ok = self.chute("Le stand A donne plus de chances.", color=VERT_OK, font_size=44)
        self.play(Write(ok), run_time=0.8)
        self.insister(la, 0.3)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────

    def carte_methode(self, x, titre, couleur):
        c = RoundedRectangle(width=6.1, height=4.3, corner_radius=0.2, stroke_color=couleur, stroke_width=3,
                             fill_color=ARDOISE, fill_opacity=0.6).move_to(P(x, 0.4))
        t = self.t(titre, 44, couleur).move_to(P(x, 2.05))
        return c, t

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("La méthode")
        x1, x2 = -3.6, 2.75
        self.au_mot("si les totaux sont pareils")
        c1, t1 = self.carte_methode(x1, "Totaux pareils", BLEU_CALCUL)
        r1 = rangee([0, 2, 4], 5, 0.85, 1.0).move_to(P(x1, 1.1))
        r2 = rangee([1, 3], 5, 0.85, 1.0).move_to(P(x1, 0.4))
        self.play(FadeIn(c1), FadeIn(t1, shift=DOWN * 0.15), run_time=0.4)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), FadeIn(r2, shift=RIGHT * 0.2), run_time=0.5)
        cadre = SurroundingRectangle(VGroup(r1, r2), color=JAUNE_TITRE, buff=0.1, stroke_width=4)
        self.play(Create(cadre), run_time=0.3)
        self.play(FadeOut(cadre), run_time=0.2)
        self.au_mot("je compare les gagnants")
        cap1 = VGroup(self.t("je compare", 38, GAGNANT), self.t("les gagnants", 38, GAGNANT)).arrange(DOWN, buff=0.12)
        cap1.move_to(P(x1, -0.85))
        self.play(FadeIn(cap1, shift=UP * 0.15), run_time=0.4)
        self.sauter(self.gagnants(VGroup(r1, r2)))
        ok = self.coche(taille=0.25).next_to(r1, RIGHT, buff=0.15)
        self.play(Create(ok), run_time=0.3)

        self.au_mot("Sinon")
        c2, t2 = self.carte_methode(x2, "Sinon", ORANGE_RETENUE)
        r3 = rangee([2], 5, 0.85, 1.0).move_to(P(x2, 1.1))
        self.play(FadeIn(c2), FadeIn(t2, shift=DOWN * 0.15), FadeIn(r3, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("je ramène au même total")
        cap2 = VGroup(self.t("je ramène", 38, ORANGE_RETENUE), self.t("au même total", 38, ORANGE_RETENUE)).arrange(DOWN, buff=0.12)
        cap2.move_to(P(x2, -0.85))
        self.play(FadeIn(cap2, shift=UP * 0.15), run_time=0.4)
        r4 = self.doubler(r3, 0.7, 0.8)
        self.au_mot("en multipliant")
        cap3 = self.t("en multipliant les deux nombres", 40, WHITE).move_to(P(-0.4, -2.4))
        self.play(FadeIn(cap3, shift=UP * 0.15), run_time=0.4)
        # les deux nombres doublent : les gagnants, puis tous les tickets
        self.sauter(self.gagnants(VGroup(r3, r4)))
        tout = SurroundingRectangle(VGroup(r3, r4), color=JAUNE_TITRE, buff=0.1, stroke_width=4)
        self.play(Create(tout), run_time=0.4)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        titre = self.titre_ecran("Le piège")
        xc, xd, ys = -3.5, 2.9, 0.75
        self.au_mot("seulement les gagnants")
        sous = self.t(": seulement les gagnants ?", 40, ORANGE_RETENUE)
        cible = VGroup(titre.copy(), sous).arrange(RIGHT, buff=0.2).to_edge(UP)
        self.play(titre.animate.move_to(cible[0]), FadeIn(sous), run_time=0.5)
        sc = stand("Stand C", 5.6, 2.75, P(xc, ys))
        sd = stand("Stand D", 5.6, 2.75, P(xd, ys))
        C = bloc([([1], 5), ([3], 5), ([0], 5), ([4], 5)], 0.8, 0.95, 0.58).move_to(P(xc, ys))
        D = rangee([0, 3], 5, 0.8, 0.95).move_to(P(xd, ys + 0.87))
        self.au_mot("Stand C")
        self.play(FadeIn(sc, shift=UP * 0.2), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(tk, scale=0.4) for tk in self._tickets(C)], lag_ratio=0.04), run_time=0.8)
        self.au_mot("4 gagnants")
        lc = self.sur(4, 20, 46, mot="gagnants").move_to(P(xc, -1.15))
        self.play(FadeIn(lc[:2], shift=UP * 0.15), run_time=0.3)
        self.sauter(self.gagnants(C))
        self.au_mot("sur 20")
        self.play(FadeIn(lc[2:], shift=UP * 0.15), run_time=0.3)
        self.au_mot("Stand D")
        self.play(FadeIn(sd, shift=UP * 0.2), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(tk, scale=0.4) for tk in D], lag_ratio=0.1), run_time=0.5)
        self.au_mot("2 gagnants")
        ld = self.sur(2, 5, 46, mot="gagnants").move_to(P(xd, -1.15))
        self.play(FadeIn(ld[:2], shift=UP * 0.15), run_time=0.3)
        self.sauter(self.gagnants(D))
        self.au_mot("sur 5")
        self.play(FadeIn(ld[2:], shift=UP * 0.15), run_time=0.3)
        self.au_mot("4, c'est plus que 2")
        faux = self.ligne([("4,", GAGNANT), ("c'est plus que", WHITE), ("2…", GAGNANT)], 46).move_to(P(-0.4, -2.0))
        self.play(FadeIn(faux, shift=UP * 0.15), Indicate(lc[0], color=ORANGE_RETENUE),
                  Indicate(ld[0], color=ORANGE_RETENUE), run_time=0.6)
        self.au_mot("mais 2 sur 5")
        mais = self.ligne([("mais", ORANGE_RETENUE), ("2", GAGNANT), ("sur", WHITE), ("5,", JAUNE_TITRE)], 46)
        self.play(FadeOut(faux, shift=UP * 0.2), run_time=0.25)
        fin = self.ligne([("c'est", WHITE), ("8", GAGNANT), ("sur", WHITE), ("20", JAUNE_TITRE)], 46)
        VGroup(mais, fin).arrange(RIGHT, buff=0.3).move_to(P(-0.4, -2.0))
        self.play(FadeIn(mais, shift=UP * 0.15), run_time=0.3)
        copies = VGroup()
        for k in (1, 2, 3):  # la rangée de D se recopie : 20 tickets, comme au stand C
            c = D.copy()
            self.play(c.animate.shift(DOWN * 0.58 * k), run_time=0.3)
            copies.add(c)
        self.au_mot("c'est 8 sur 20")
        self.play(FadeIn(fin, shift=UP * 0.15), run_time=0.35)
        self.sauter(self.gagnants(VGroup(D, copies)))
        self.au_mot("Le stand D est meilleur")
        self.play(sd[0].animate.set_stroke(VERT_OK, 7), sd[1].animate.set_color(VERT_OK), run_time=0.3)
        ok = self.chute("Le stand D est meilleur !", color=VERT_OK, font_size=48)
        self.play(Write(ok), run_time=0.6)
        self.insister(fin, 0.3)
        self.attendre_voix()

    # ── 06 : défi, les deux sacs (le canvas « billes » du coach) ───────────

    X1, X2 = -3.6, 2.6

    def deux_sacs(self):
        e1 = [(ROUGE_BILLE, "R")] * 2 + [(BLEU_BILLE, "B")] * 6
        e2 = [(ROUGE_BILLE, "R")] + [(BLEU_BILLE, "B")] * 2
        k1, b1 = carte_billes(e1)
        k2, b2 = carte_billes(e2)
        k1.move_to(P(self.X1, 0.75))
        k2.move_to(P(self.X2, 0.75))
        return (sac_autour(k1), k1, b1), (sac_autour(k2), k2, b2)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 48, JAUNE_TITRE).to_edge(UP)))
        (s1, k1, b1), (s2, k2, b2) = self.deux_sacs()
        y = -1.6
        self.au_mot("Sac 1")
        self.play(Create(s1), FadeIn(k1[0]), run_time=0.5)
        self.au_mot("2 billes rouges")
        l1f = self.ligne([("Sac 1 :", WHITE), ("2", ROUGE_BILLE), ("rouges", ROUGE_BILLE), ("sur", WHITE),
                          ("8", JAUNE_TITRE)], 38).move_to(P(self.X1, y))
        self.play(FadeIn(l1f[:3], shift=UP * 0.15), LaggedStart(*[FadeIn(b, scale=0.3) for b in b1[:2]], lag_ratio=0.3),
                  run_time=0.6)
        self.au_mot("sur 8")
        self.play(FadeIn(l1f[3:], shift=UP * 0.15),
                  LaggedStart(*[FadeIn(b, scale=0.3) for b in b1[2:]], lag_ratio=0.1), run_time=0.7)
        self.au_mot("Sac 2")
        self.play(Create(s2), FadeIn(k2[0]), run_time=0.5)
        self.au_mot("1 bille rouge")
        l2f = self.ligne([("Sac 2 :", WHITE), ("1", ROUGE_BILLE), ("rouge", ROUGE_BILLE), ("sur", WHITE),
                          ("3", JAUNE_TITRE)], 38).move_to(P(self.X2, y))
        self.play(FadeIn(l2f[:3], shift=UP * 0.15), FadeIn(b2[0], scale=0.3), run_time=0.5)
        self.au_mot("sur 3")
        self.play(FadeIn(l2f[3:], shift=UP * 0.15), LaggedStart(*[FadeIn(b, scale=0.3) for b in b2[1:]],
                                                                 lag_ratio=0.2), run_time=0.5)
        self.au_mot("Lequel donne")
        q = self.t("Lequel donne plus de chances ?", 40, BLEU_CALCUL).move_to(P(-0.6, -2.35))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.au_mot("tirer une rouge")
        rouges = [b1[0], b1[1], b2[0]]
        self.play(*[b.animate.scale(1.3) for b in rouges], run_time=0.3)
        self.play(*[b.animate.scale(1 / 1.3) for b in rouges], run_time=0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=42)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        (s1, k1, b1), (s2, k2, b2) = self.deux_sacs()
        self.add(s1, k1, s2, k2)
        # les billes se rangent en une rangée (le sac s'efface) : on va les recopier
        r, pas, y0 = 0.24, 0.55, 1.9
        xs1, xs2 = -4.0, 0.0
        cibles1 = [P(xs1 - 3.5 * pas + i * pas, y0) for i in range(8)]
        cibles2 = [P(xs2 - pas + i * pas, y0) for i in range(3)]
        self.play(FadeOut(s1), FadeOut(k1[0]), FadeOut(s2), FadeOut(k2[0]),
                  *[b.animate.scale(r / 0.34).move_to(c) for b, c in zip(b1, cibles1)],
                  *[b.animate.scale(r / 0.34).move_to(c) for b, c in zip(b2, cibles2)], run_time=0.9)
        self.au_mot("Je ramène à 24")
        vingt4 = self.ligne([("je ramène à", WHITE), ("24", JAUNE_TITRE)], 44).move_to(P(-0.4, 2.6))
        self.play(FadeIn(vingt4, shift=DOWN * 0.15), run_time=0.4)
        self.insister(vingt4[1], 0.25)
        self.au_mot("2 sur 8")
        a1 = self.sur(2, 8, 46, ROUGE_BILLE)
        a1b = self.ligne([("c'est", WHITE), ("6", ROUGE_BILLE), ("sur", WHITE), ("24", JAUNE_TITRE)], 46)
        VGroup(a1, a1b).arrange(DOWN, buff=0.3).move_to(P(xs1, -0.35))
        self.play(FadeIn(a1, shift=UP * 0.15), run_time=0.3)
        c1 = VGroup()
        for k in (1, 2):
            c = b1.copy()
            self.play(c.animate.shift(DOWN * pas * k), run_time=0.3)
            c1.add(c)
        self.au_mot("c'est 6 sur 24")
        self.play(FadeIn(a1b, shift=UP * 0.15), run_time=0.3)
        rouges1 = [m[i] for m in (b1, *c1) for i in (0, 1)]
        self.play(*[b.animate.scale(1.4) for b in rouges1], run_time=0.25)
        self.play(*[b.animate.scale(1 / 1.4) for b in rouges1], run_time=0.25)
        self.au_mot("1 sur 3")
        a2 = self.sur(1, 3, 46, ROUGE_BILLE)
        a2b = self.ligne([("c'est", WHITE), ("8", ROUGE_BILLE), ("sur", WHITE), ("24", JAUNE_TITRE)], 46)
        VGroup(a2, a2b).arrange(DOWN, buff=0.3).move_to(P(3.4, 0.2))
        self.play(FadeIn(a2, shift=UP * 0.15), run_time=0.3)
        c2 = VGroup()
        for k in range(1, 8):
            c = b2.copy()
            self.play(c.animate.shift(DOWN * pas * k), run_time=0.13)
            c2.add(c)
        self.au_mot("c'est 8 sur 24")
        self.play(FadeIn(a2b, shift=UP * 0.15), run_time=0.3)
        rouges2 = [m[0] for m in (b2, *c2)]
        self.play(*[b.animate.scale(1.4) for b in rouges2], run_time=0.25)
        self.play(*[b.animate.scale(1 / 1.4) for b in rouges2], run_time=0.25)
        self.au_mot("Le sac 2")
        ok = self.chute("Le sac 2 donne plus de chances.", color=VERT_OK, font_size=44)
        self.play(Write(ok), run_time=0.7)
        self.insister(a2b, 0.3)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP)))
        l1 = VGroup(self.coche(), self.t("Je compare au même total.", 42))
        l2 = VGroup(self.coche(), self.t("Totaux différents : je les ramène au même nombre.", 42))
        l3 = VGroup(self.coche(), self.t("Plus de gagnants ne veut pas dire plus de chances.", 42, ORANGE_RETENUE))
        for l in (l1, l2, l3):
            l.arrange(RIGHT, buff=0.3)
        lignes = VGroup(l1, l2, l3).arrange(DOWN, aligned_edge=LEFT, buff=0.8)
        if lignes.width > 12.4:
            lignes.scale_to_fit_width(12.4)
        lignes.move_to(P(-0.2, 0.7))
        for ex, l in zip(["je compare au même total", "Si les totaux", "Plus de gagnants"], (l1, l2, l3)):
            self.au_mot(ex)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 4")
        self.play(Write(self.chute("L'épisode 4 t'attend : la roue, le dé et le sac.", color=VERT_OK,
                                   font_size=42)))
        self.attendre_voix(marge=1.0)

    # ── 08 : abonnement (la page du gabarit, réécrite : rien qui ne soit dit) ──

    def page_abonnement(self, voix="08-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        self.au_mot("va sur le coach")
        entraine = self.t("Va sur le coach", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("sur éleveai")
        site = self.t("eleveai.fr", 58, BLEU_CALCUL).move_to(P(0, 1.05))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        abonne = self.t("Abonne-toi à la chaîne !", 44, VERT_OK).move_to(P(0, -0.7))
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.5)
        self.play(Flash(abonne, color=VERT_OK, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_meme_total()
        self.ecran_comparer()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
