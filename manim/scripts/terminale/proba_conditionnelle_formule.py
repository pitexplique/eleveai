# proba_conditionnelle_formule.py
# EleveAI — Maths Tle spé — série « Probabilités », épisode 2 : la formule
# P_A(B) = P(A ∩ B) / P(A), et l'INVERSION (micro : proba_conditionnelle_formule).
# AVEC VOIX. Paysage 16:9, CEINTURE NOIRE.
# Short jumeau : proba_conditionnelle_formule_short.py (ceinture orange).
#
# Le fil : un test rapide de la dengue (2 % de malades ; positif chez 95 % des
# malades, chez 4 % des sains). ⭐ L'ARBRE PONDÉRÉ porte toute l'explication,
# dessiné comme le canvas `arbre_proba` du coach (lib/canvas/ArbreProbabilitesCanvas.tsx) :
# un point de départ, l'étiquette d'un nœud intérieur AU-DESSUS du nœud, celle
# d'une feuille À DROITE, la probabilité au milieu de la branche, en bleu.
#
# Écrans : 00 garde · 01 la situation (100 personnes, 2 malades ; le test) ·
# 02 la formule sur l'arbre A / Ā → B / B̄ (on suit la branche A ; le chemin
# A → B = P(A ∩ B)) · 03 l'arbre M / M̄ → T / T̄ construit branche par branche,
# P(T) = somme des deux chemins vers T · 04 l'inversion : les deux chemins vers
# T s'allument, puis le chemin M → T seul · 05 seulement 33 % (la barre des
# positifs) · 06 le piège : les deux arbres (M puis T / T puis M) · 07 défi ·
# 07b correction · 08 ce que tu as appris · 09 abonnement.
#
# Voix : manim/voix/terminale-proba-formule.json (débit −6).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/terminale/proba_conditionnelle_formule.py ProbaFormuleTerminale -o eleveai-maths-terminale-proba-formule --media_dir manim/scripts/terminale/media
# Puis copier le mp4 dans manim/sorties/terminale/maths/probabilites/02-formule-et-inversion/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

GRIS_BRANCHE = "#94A3B8"   # les branches (coach : #475569, éclairci pour le fond noir)
BLEU_PROBA = BLEU_CALCUL    # les probabilités sur les branches (coach : bleu)
ROUGE_MALADE = "#EF4444"
GRIS_SAIN = "#64748B"


class NotionTerminale(Notion6e):
    identite = "Maths Tle spé — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── l'écriture : indices et barres, en Text ─────────────────────────────────

def formule(segments, fs=40, couleur=WHITE):
    """Une écriture mathématique en Text, sur UNE ligne de base.

    `segments` : liste de (genre, texte[, couleur]) ; genre « n » normal, « b »
    normal BARRÉ (Ā), « i » indice, « ib » indice barré. Renvoie un VGroup dont
    l'élément k est le k-ième segment (pour le colorer ou l'animer).
    """
    segs = [(s[0], s[1], s[2] if len(s) > 2 else couleur) for s in segments]
    principal = "".join(t for g, t, _ in segs if g in ("n", "b"))
    T = Text(principal, font_size=fs)
    sans_blanc = [c for c in principal if c != " "]
    assert len(T) == len(sans_blanc), "ligature dans la formule"
    ref = [k for k, c in enumerate(sans_blanc) if c.isupper()]
    base = T[ref[0]].get_bottom()[1] if ref else T.get_bottom()[1]
    haut = T[ref[0]].get_top()[1] if ref else T.get_top()[1]
    groupe, k, decal, dernier = VGroup(), 0, 0.0, None
    ecart = fs / 48 * 0.04
    for g, t, c in segs:
        if g in ("n", "b"):
            n = len(t.replace(" ", ""))
            seg = VGroup(*T[k:k + n]).set_color(c)
            seg.shift(RIGHT * decal)
            k += n
            if g == "b":
                barre = Line(seg.get_left(), seg.get_right(), stroke_width=fs / 14, color=c)
                barre.move_to(P(seg.get_center()[0], haut + fs / 48 * 0.12))
                seg = VGroup(seg, barre)
            if len(seg):
                dernier = seg
            groupe.add(seg)
        else:
            petit = Text(t, font_size=int(fs * 0.62), color=c)
            x0 = (dernier.get_right()[0] if dernier is not None else T.get_left()[0]) + ecart
            petit.move_to(P(x0 + petit.width / 2, base - fs / 48 * 0.15 + petit.height / 2))
            seg = petit
            if g == "ib":
                barre = Line(petit.get_left(), petit.get_right(), stroke_width=fs / 20, color=c)
                barre.next_to(petit, UP, buff=fs / 48 * 0.05)
                seg = VGroup(petit, barre)
            decal += petit.width + 2 * ecart
            dernier = seg
            groupe.add(seg)
    return groupe


def lettre(l, barre=False, fs=40, couleur=WHITE):
    return formule([("b" if barre else "n", l, couleur)], fs)


def fraction_mob(haut, bas, couleur=WHITE, sw=3.5):
    """Une fraction de deux objets : haut, barre, bas."""
    larg = max(haut.width, bas.width) + 0.2
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=couleur, stroke_width=sw)
    return VGroup(haut, barre, bas).arrange(DOWN, buff=0.12)


def ecrit(s, fs=40, couleur=WHITE):
    """« P_A(B) », « P_~T(~M) », « P(A ∩ B) » → formule() : « _ » met en
    indice le caractère suivant, « ~ » le barre."""
    segs, courant, i = [], "", 0
    while i < len(s):
        c = s[i]
        if c in "_~":
            if courant:
                segs.append(("n", courant))
                courant = ""
            indice = c == "_"
            if indice:
                i += 1
            barre = s[i] == "~"
            if barre:
                i += 1
            segs.append((("i" if indice else "") + ("b" if barre else "") or "n", s[i]))
        else:
            courant += c
        i += 1
    if courant:
        segs.append(("n", courant))
    return formule(segs, fs, couleur)


# ── l'arbre pondéré, comme le canvas « arbre_proba » du coach ────────────────

class Arbre:
    """Un arbre pondéré à deux niveaux : départ → (X, X̄) → (Y, Ȳ) sous chacun.

    b1[i] : branche du 1er niveau (i = 0 : X, 1 : X̄) ; b2[i][j] : branche vers
    la feuille j (0 : Y, 1 : Ȳ) sous le nœud i. n1[i], f[i][j] : les points.
    lab1 / lab2 : les étiquettes ; p1 / p2 : les probabilités (créées à la demande).
    """

    def __init__(self, racine=P(-6.2, 0.1), dx1=2.0, dy1=1.55, dx2=2.0, dy2=0.82,
                 x="M", y="T", fs=36, pfs=28):
        self.fs, self.pfs = fs, pfs
        self.racine = Dot(racine, radius=0.07, color=WHITE)
        self.n1 = [racine + P(dx1, dy1), racine + P(dx1, -dy1)]
        self.f = [[n + P(dx2, dy2), n + P(dx2, -dy2)] for n in self.n1]
        self.b1 = [Line(racine, n, color=GRIS_BRANCHE, stroke_width=4) for n in self.n1]
        self.b2 = [[Line(n, ff, color=GRIS_BRANCHE, stroke_width=4) for ff in fs_]
                   for n, fs_ in zip(self.n1, self.f)]
        # nœud intérieur : étiquette AU-DESSUS ; feuille : À DROITE (règle du canvas)
        # ⚠️ le nœud du BAS porte son étiquette dessous : au-dessus, la branche
        # qui arrive du départ la traversait (vu au rendu du 17/10).
        self.lab1 = [lettre(x, k == 1, fs).next_to(n, DOWN if k else UP, buff=0.16) for k, n in enumerate(self.n1)]
        self.lab2 = [[lettre(y, j == 1, fs).next_to(ff, RIGHT, buff=0.14) for j, ff in enumerate(fs_)]
                     for fs_ in self.f]
        self.p1 = [None, None]
        self.p2 = [[None, None], [None, None]]
        self.bouts = {}  # (i, j) → ce qui est écrit au bout du chemin (un produit…)

    def proba(self, branche, texte, couleur=BLEU_PROBA, fs=None):
        """Le nombre posé au milieu de la branche, décalé du côté « haut »."""
        a, b = branche.get_start(), branche.get_end()
        d = (b - a) / np.linalg.norm(b - a)
        n = np.array([-d[1], d[0], 0.0])
        t = texte if isinstance(texte, Mobject) else Text(texte, font_size=fs or self.pfs, color=couleur)
        r = 0.5 * (abs(n[0]) * t.width + abs(n[1]) * t.height) + 0.1
        return t.move_to((a + b) / 2 + n * r)

    def pose1(self, i, texte, couleur=BLEU_PROBA):
        self.p1[i] = self.proba(self.b1[i], texte, couleur)
        return self.p1[i]

    def pose2(self, i, j, texte, couleur=BLEU_PROBA):
        self.p2[i][j] = self.proba(self.b2[i][j], texte, couleur)
        return self.p2[i][j]

    def branches(self):
        return [self.b1[0], self.b1[1]] + [b for r in self.b2 for b in r]

    def tout(self):
        g = VGroup(self.racine, *self.branches(), *self.lab1, *[l for r in self.lab2 for l in r])
        g.add(*[p for p in self.p1 if p is not None], *[p for r in self.p2 for p in r if p is not None])
        g.add(*self.bouts.values())
        return g

    def chemin(self, i, j):
        return VGroup(self.b1[i], self.b2[i][j])

    def elements_chemin(self, i, j):
        """Tout ce qui appartient au chemin i → j (branches, lettres, nombres)."""
        g = VGroup(self.b1[i], self.b2[i][j], self.lab1[i], self.lab2[i][j])
        for p in (self.p1[i], self.p2[i][j], self.bouts.get((i, j))):
            if p is not None:
                g.add(p)
        return g

    def allumer(self, chemins, couleur=JAUNE_TITRE, garder=()):
        """Les animations : les chemins donnés s'allument, le reste s'estompe."""
        dedans = VGroup(*[self.elements_chemin(i, j) for i, j in chemins])
        ids = {id(m) for m in dedans.get_family()} | {id(m) for g in garder for m in g.get_family()}
        allumees = {id(b) for i, j in chemins for b in (self.b1[i], self.b2[i][j])}
        anims = []
        for m in self.tout():
            if id(m) in allumees:
                continue
            if id(m) in ids or m is self.racine:
                anims.append(m.animate.set_opacity(1))
            else:
                anims.append(m.animate.set_opacity(0.22))
        for i, j in chemins:
            anims += [self.b1[i].animate.set_stroke(couleur, 8, 1), self.b2[i][j].animate.set_stroke(couleur, 8, 1)]
        return anims

    def eteindre(self):
        anims = [m.animate.set_opacity(1) for m in self.tout() if m not in self.branches()]
        anims += [b.animate.set_stroke(GRIS_BRANCHE, 4, 1) for b in self.branches()]
        return anims


def personne(couleur=GRIS_SAIN, r=0.15):
    """Un petit bonhomme rond (tête + épaules), pour la population."""
    tete = Circle(radius=r * 0.45, fill_color=couleur, fill_opacity=1, stroke_width=0).shift(UP * r * 0.55)
    corps = Sector(radius=r * 0.8, start_angle=0, angle=PI, fill_color=couleur, fill_opacity=1,
                   stroke_width=0).shift(DOWN * r * 0.55)
    return VGroup(tete, corps)


def cassette(positif=False, w=2.7, h=0.95):
    """Un test rapide : boîtier blanc, fenêtre, trait C (contrôle) et trait T."""
    boite = RoundedRectangle(width=w, height=h, corner_radius=0.2, fill_color="#F8FAFC", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    puits = Circle(radius=h * 0.22, fill_color="#CBD5E1", fill_opacity=1, stroke_color=GREY_C,
                   stroke_width=2).move_to(boite.get_left() + RIGHT * w * 0.17)
    fen = RoundedRectangle(width=w * 0.45, height=h * 0.42, corner_radius=0.06, fill_color="#E2E8F0",
                           fill_opacity=1, stroke_color=GREY_C, stroke_width=2).move_to(boite.get_center() + RIGHT * w * 0.12)
    xc, xt = fen.get_center()[0] - w * 0.09, fen.get_center()[0] + w * 0.09
    trait_c = Line(P(xc, fen.get_bottom()[1] + 0.05), P(xc, fen.get_top()[1] - 0.05), color="#B91C1C", stroke_width=7)
    trait_t = Line(P(xt, fen.get_bottom()[1] + 0.05), P(xt, fen.get_top()[1] - 0.05), color="#B91C1C", stroke_width=7)
    lc = Text("C", font_size=16, color=GREY_D).next_to(trait_c, UP, buff=0.1)
    lt = Text("T", font_size=16, color=GREY_D).next_to(trait_t, UP, buff=0.1)
    if not positif:
        trait_t.set_opacity(0)
    return VGroup(boite, puits, fen, trait_c, trait_t, lc, lt), trait_t


class ProbaFormuleTerminale(NotionTerminale):
    nom_voix = "terminale-proba-formule"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        """Une ligne en morceaux colorés, d'UN SEUL Text (même ligne de base)."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):
            return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        g, k = VGroup(), 0
        for (m, c), n in zip(morceaux, tailles):
            g.add(VGroup(*T[k:k + n]).set_color(c))
            k += n
        return g

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def cadre(self, mob, color=JAUNE_TITRE):
        return SurroundingRectangle(mob, color=color, buff=0.15, corner_radius=0.1, stroke_width=4)

    # ── l'arbre de la dengue, à l'état « construit » ─────────────────────────

    def arbre_dengue(self, produits=False, racine=P(-6.2, 0.1)):
        A = Arbre(racine=racine)
        A.pose1(0, "0,02")
        A.pose1(1, "0,98")
        A.pose2(0, 0, "0,95")
        A.pose2(1, 0, "0,04")
        self.prod = None
        if produits:
            self.prod = [self.t("0,019", 32, VERT_OK).next_to(A.lab2[0][0], RIGHT, buff=0.3),
                         self.t("0,0392", 32, VERT_OK).next_to(A.lab2[1][0], RIGHT, buff=0.3)]
            A.bouts[(0, 0)], A.bouts[(1, 0)] = self.prod
        return A

    def legende(self):
        g = VGroup(self.ligne([("M", ROUGE_MALADE), (": malade", WHITE)], 26, 0.12),
                   self.ligne([("T", JAUNE_TITRE), (": test positif", WHITE)], 26, 0.12)).arrange(RIGHT, buff=0.6)
        return g.move_to(P(-6.75 + g.width / 2, -3.4))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Probabilité conditionnelle", 52, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("noire").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        pab = ecrit("P_A(B)", 72, BLEU_CALCUL)
        egal = self.t("=", 60)
        frac = fraction_mob(ecrit("P(A ∩ B)", 48), ecrit("P(A)", 48))
        ligne = VGroup(pab, egal, frac).arrange(RIGHT, buff=0.35).move_to(P(-0.6, 0.55))
        self.play(FadeIn(pab, scale=0.6), run_time=0.4)
        self.au_mot("la formule")
        self.play(FadeIn(egal), FadeIn(frac, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("à l'envers")
        env = VGroup(self.t("et à l'envers :", 40, ORANGE_RETENUE), ecrit("P_B(A) ?", 52, ORANGE_RETENUE))
        env.arrange(RIGHT, buff=0.6).move_to(P(-0.6, -1.15))
        self.play(FadeIn(env, shift=UP * 0.2), run_time=0.5)
        self.insister(env[1], 0.35)
        self.attendre_voix(marge=1.0)

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un test de la dengue")
        gens = VGroup(*[personne(GRIS_SAIN, 0.16) for _ in range(100)])
        gens.arrange_in_grid(rows=10, cols=10, buff=0.16).move_to(P(-4.3, -0.3))
        boite, trait_t = cassette(False)
        boite.move_to(P(2.0, 2.0))
        self.au_mot("Un test rapide")
        self.play(FadeIn(boite, shift=DOWN * 0.2), LaggedStart(*[FadeIn(g, scale=0.5) for g in gens],
                                                              lag_ratio=0.01), run_time=1.0)
        self.au_mot("2 %")
        malades = [gens[23], gens[67]]
        l1 = self.ligne([("2 %", ROUGE_MALADE), ("des personnes sont malades", WHITE)], 34, 0.2)
        l1.move_to(P(-1.4, 0.6), aligned_edge=LEFT)
        self.play(*[m.animate.set_color(ROUGE_MALADE).scale(1.4) for m in malades],
                  FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.play(*[m.animate.scale(1 / 1.4) for m in malades], run_time=0.3)
        self.au_mot("Le test est positif")
        self.play(trait_t.animate.set_opacity(1), run_time=0.4)
        pos = self.t("positif", 30, ROUGE_MALADE).next_to(boite, DOWN, buff=0.15)
        self.play(FadeIn(pos, shift=UP * 0.1), run_time=0.3)
        self.au_mot("95 %")
        l2 = self.ligne([("malades :", ROUGE_MALADE), ("positif chez", WHITE), ("95 %", JAUNE_TITRE)], 34, 0.2)
        l2.move_to(P(-1.4, -0.4), aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.insister(l2[2], 0.3)
        self.au_mot("4 %")
        l3 = self.ligne([("sains :", GRIS_BRANCHE), ("positif chez", WHITE), ("4 %", JAUNE_TITRE)], 34, 0.2)
        l3.move_to(P(-1.4, -1.4), aligned_edge=LEFT)
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.5)
        self.insister(l3[2], 0.3)
        self.attendre_voix()

    # ── 02 : la formule, sur l'arbre A / Ā → B / B̄ ─────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-formule")
        self.titre_ecran("La formule")
        A = Arbre(x="A", y="B")
        A.pose1(0, ecrit("P(A)", 28, BLEU_PROBA))
        A.pose2(0, 0, ecrit("P_A(B)", 28, BLEU_PROBA))
        self.play(FadeIn(A.racine), *[Create(b) for b in A.branches()], run_time=0.8)
        self.play(*[FadeIn(l) for l in A.lab1], *[FadeIn(l) for r in A.lab2 for l in r],
                  FadeIn(A.p1[0]), FadeIn(A.p2[0][0]), run_time=0.5)

        self.au_mot("P indice A de B")
        pab = ecrit("P_A(B)", 52, BLEU_CALCUL)
        egal = self.t("=", 48)
        num, den = ecrit("P(A ∩ B)", 44), ecrit("P(A)", 44)
        frac = fraction_mob(num, den)
        f1 = VGroup(pab, egal, frac).arrange(RIGHT, buff=0.3).move_to(P(3.4, 1.2))
        # « sachant A » : on suit la branche A, le reste s'estompe
        self.play(*A.allumer([(0, 0), (0, 1)], BLEU_CALCUL), FadeIn(pab, shift=LEFT * 0.2), run_time=0.6)
        self.play(Indicate(A.p2[0][0], color=JAUNE_TITRE, scale_factor=1.4), run_time=0.6)

        self.au_mot("P de A inter B")
        self.play(*A.allumer([(0, 0)]), FadeIn(egal), FadeIn(num, shift=LEFT * 0.2), run_time=0.5)
        bout = ecrit("P(A ∩ B)", 30, JAUNE_TITRE).next_to(A.lab2[0][0], RIGHT, buff=0.3)
        self.play(TransformFromCopy(num, bout), run_time=0.6)
        self.au_mot("divisé par P de A")
        self.play(Create(frac[1]), TransformFromCopy(A.p1[0], den), run_time=0.7)
        self.play(Create(self.cadre(f1)), run_time=0.4)

        self.au_mot("Et donc")
        l2 = VGroup(ecrit("P(A ∩ B)", 44, JAUNE_TITRE), self.t("=", 44), ecrit("P(A)", 44, BLEU_PROBA),
                    self.t("×", 44), ecrit("P_A(B)", 44, BLEU_PROBA)).arrange(RIGHT, buff=0.25)
        l2.move_to(P(3.2, -1.3))
        self.play(TransformFromCopy(bout, l2[0]), FadeIn(l2[1]), run_time=0.6)
        self.au_mot("P de A fois")
        self.play(TransformFromCopy(A.p1[0], l2[2]), run_time=0.6)
        self.au_mot("fois P indice A de B")
        self.play(FadeIn(l2[3]), TransformFromCopy(A.p2[0][0], l2[4]), run_time=0.6)
        self.attendre_voix()

    # ── 03 : l'arbre de la dengue, branche par branche ──────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-arbre")
        self.titre_ecran("L'arbre pondéré")
        A = self.arbre_dengue()
        leg = self.legende()
        self.play(FadeIn(A.racine), run_time=0.3)
        self.au_mot("M, malade")
        self.play(Create(A.b1[0]), FadeIn(A.lab1[0]), FadeIn(leg[0]), run_time=0.5)
        self.au_mot("0,02")
        self.play(FadeIn(A.p1[0], scale=0.6), run_time=0.3)
        self.insister(A.p1[0], 0.3)
        self.au_mot("puis T, positif")
        self.play(*[Create(b) for b in A.b2[0]], *[FadeIn(l) for l in A.lab2[0]], FadeIn(leg[1]), run_time=0.6)
        self.au_mot("0,95")
        self.play(FadeIn(A.p2[0][0], scale=0.6), run_time=0.3)
        self.insister(A.p2[0][0], 0.3)
        self.au_mot("M barre")
        self.play(Create(A.b1[1]), FadeIn(A.lab1[1]), run_time=0.5)
        self.au_mot("0,98")
        self.play(FadeIn(A.p1[1], scale=0.6), run_time=0.3)
        self.au_mot("puis T, 0,04")
        self.play(*[Create(b) for b in A.b2[1]], *[FadeIn(l) for l in A.lab2[1]], run_time=0.5)
        self.play(FadeIn(A.p2[1][0], scale=0.6), run_time=0.3)
        self.insister(A.p2[1][0], 0.3)

        self.au_mot("P de T")
        x0, fs = 0.6, 36
        pt = ecrit("P(T)", fs, JAUNE_TITRE)
        self.play(*A.allumer([(0, 0), (1, 0)]), run_time=0.6)
        self.au_mot("0,02 fois 0,95")
        l1 = VGroup(pt, self.t("=", fs), self.t("0,02 × 0,95", fs)).arrange(RIGHT, buff=0.25)
        l1.move_to(P(x0, 1.7), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=LEFT * 0.2), Indicate(A.chemin(0, 0), color=VERT_OK), run_time=0.7)
        self.au_mot("plus 0,98 fois 0,04")
        l2 = self.t("+ 0,98 × 0,04", fs)
        l2.next_to(l1, DOWN, buff=0.35).align_to(l1[2], LEFT).shift(LEFT * 0.38)
        self.play(FadeIn(l2, shift=LEFT * 0.2), Indicate(A.chemin(1, 0), color=VERT_OK), run_time=0.7)
        self.au_mot("0,019 plus")
        prod = [self.t("0,019", 32, VERT_OK).next_to(A.lab2[0][0], RIGHT, buff=0.3),
                self.t("0,0392", 32, VERT_OK).next_to(A.lab2[1][0], RIGHT, buff=0.3)]
        l3 = self.ligne([("=", WHITE), ("0,019", VERT_OK), ("+", WHITE), ("0,0392", VERT_OK)], fs, 0.25)
        l3.next_to(l2, DOWN, buff=0.35).align_to(l1[1], LEFT)
        self.play(FadeIn(prod[0], shift=RIGHT * 0.2), FadeIn(l3[:2]), run_time=0.5)
        self.au_mot("0,0392")
        self.play(FadeIn(prod[1], shift=RIGHT * 0.2), FadeIn(l3[2:]), run_time=0.5)
        self.au_mot("0,0582")
        l4 = self.ligne([("=", WHITE), ("0,0582", JAUNE_TITRE)], 40, 0.25)
        l4.next_to(l3, DOWN, buff=0.35).align_to(l1[1], LEFT)
        self.play(FadeIn(l4, scale=0.7), run_time=0.4)
        self.play(Create(self.cadre(l4[1])), run_time=0.3)
        self.insister(l4[1], 0.35)
        self.attendre_voix()

    # ── 04 : inverser la condition ──────────────────────────────────────────

    def tableau_arbre(self):
        """L'arbre de la dengue déjà construit, avec les produits au bout des chemins vers T."""
        A = self.arbre_dengue(produits=True)
        leg = self.legende()
        self.add(A.tout(), leg)
        return A, leg

    def ecran_inverser(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-inverser")
        self.titre_ecran("Inverser la condition")
        A, leg = self.tableau_arbre()
        x0 = 0.5
        self.au_mot("mon test est positif")
        q1 = self.ligne([("test", WHITE), ("positif", JAUNE_TITRE)], 36, 0.2).move_to(P(x0, 2.3), aligned_edge=LEFT)
        self.play(*A.allumer([(0, 0), (1, 0)]), FadeIn(q1, shift=LEFT * 0.2), run_time=0.7)
        self.au_mot("suis-je malade")
        q2 = self.ligne([("→", WHITE), ("malade ?", ROUGE_MALADE)], 36, 0.2).next_to(q1, RIGHT, buff=0.25)
        self.play(FadeIn(q2, shift=LEFT * 0.2), Indicate(A.lab1[0], color=ROUGE_MALADE, scale_factor=1.6), run_time=0.6)
        self.au_mot("C'est P indice T de M")
        ptm = ecrit("P_T(M)", 48, BLEU_CALCUL)
        egal = self.t("=", 40)
        num, den = ecrit("P(M ∩ T)", 38), ecrit("P(T)", 38)
        frac = fraction_mob(num, den)
        f1 = VGroup(ptm, egal, frac).arrange(RIGHT, buff=0.3).move_to(P(x0, 0.8), aligned_edge=LEFT)
        self.play(FadeIn(ptm, scale=0.6), run_time=0.4)
        self.insister(ptm, 0.3)
        self.au_mot("P de M inter T")
        self.play(*A.allumer([(0, 0)]), FadeIn(egal), FadeIn(num, shift=LEFT * 0.2),
                  run_time=0.6)
        self.au_mot("divisé par P de T")
        self.play(*A.allumer([(0, 0), (1, 0)]), Create(frac[1]), FadeIn(den, shift=UP * 0.2),
                  run_time=0.6)
        self.au_mot("0,019 sur")
        n2, d2 = self.t("0,019", 38, VERT_OK), self.t("0,0582", 38, JAUNE_TITRE)
        frac2 = fraction_mob(n2, d2)
        f2 = VGroup(self.t("=", 40), frac2).arrange(RIGHT, buff=0.3)
        f2.move_to(P(x0 + 0.2, -1.1), aligned_edge=LEFT)
        self.play(FadeIn(f2[0]), TransformFromCopy(self.prod[0], n2), Create(frac2[1]), run_time=0.7)
        self.play(FadeIn(d2, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Environ 0,33")
        res = self.ligne([("≈", WHITE), ("0,33", JAUNE_TITRE)], 44, 0.25).next_to(f2, RIGHT, buff=0.3)
        self.play(FadeIn(res, scale=0.7), run_time=0.4)
        self.play(Create(self.cadre(res[1])), run_time=0.3)
        self.insister(res[1], 0.35)
        self.attendre_voix()

    # ── 05 : seulement 33 % ─────────────────────────────────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sens")
        self.titre_ecran("Seulement 33 % ?")
        A, leg = self.tableau_arbre()
        self.au_mot("Seulement 33 %")
        gros = self.t("33 %", 96, JAUNE_TITRE).move_to(P(3.2, 1.6))
        self.play(FadeIn(gros, scale=0.5), run_time=0.4)
        self.insister(gros, 0.35)
        self.au_mot("Les malades sont rares")
        self.play(*A.allumer([(0, 0), (0, 1)], ROUGE_MALADE), run_time=0.5)
        self.play(Indicate(A.p1[0], color=ROUGE_MALADE, scale_factor=1.6), run_time=0.6)

        self.au_mot("la plupart des tests positifs")
        x0, x1, y = 0.9, 6.1, -0.6
        xr = x0 + (x1 - x0) * 0.019 / 0.0582
        rouge = Rectangle(width=xr - x0, height=0.7, fill_color=ROUGE_MALADE, fill_opacity=0.9,
                          stroke_color=WHITE, stroke_width=2).move_to(P((x0 + xr) / 2, y))
        gris = Rectangle(width=x1 - xr, height=0.7, fill_color=GRIS_SAIN, fill_opacity=0.9,
                         stroke_color=WHITE, stroke_width=2).move_to(P((xr + x1) / 2, y))
        tit = self.t("les tests positifs", 28)
        tit.next_to(VGroup(rouge, gris), UP, buff=0.2)
        lr = self.t("malades", 26, ROUGE_MALADE)
        lr.next_to(rouge, DOWN, buff=0.15)
        lg = self.t("sains", 26, GRIS_BRANCHE)
        lg.next_to(gris, DOWN, buff=0.15)
        self.play(*A.allumer([(0, 0), (1, 0)]), FadeIn(tit), GrowFromEdge(rouge, LEFT), FadeIn(lr), run_time=0.7)
        self.au_mot("98 %")
        self.play(*A.allumer([(1, 0)], GRIS_BRANCHE), GrowFromEdge(gris, LEFT), FadeIn(lg), run_time=0.7)
        self.play(Indicate(A.p1[1], color=WHITE, scale_factor=1.5), Indicate(lg, color=WHITE), run_time=0.6)
        self.attendre_voix()

    # ── 06 : le piège, les deux arbres ──────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        kw = dict(dx1=1.75, dy1=1.2, dx2=1.75, dy2=0.62, fs=30, pfs=24)
        G = Arbre(racine=P(-6.4, 0.5), x="M", y="T", **kw)
        G.pose1(0, "0,02")
        G.pose1(1, "0,98")
        G.pose2(0, 0, "0,95")
        G.pose2(1, 0, "0,04")
        D = Arbre(racine=P(-0.3, 0.5), x="T", y="M", **kw)
        D.pose2(0, 0, "≈ 0,33")
        self.play(FadeIn(G.tout()), run_time=0.6)
        self.play(FadeIn(D.tout()), run_time=0.6)
        y = -1.85
        self.au_mot("P indice M de T")
        eg = VGroup(ecrit("P_M(T)", 40, BLEU_CALCUL), self.t("= 0,95", 40)).arrange(RIGHT, buff=0.2)
        eg.move_to(P(-4.5, y))
        self.play(*G.allumer([(0, 0)]), FadeIn(eg[0], shift=UP * 0.2), run_time=0.6)
        self.au_mot("0,95")
        self.play(FadeIn(eg[1]), Indicate(G.p2[0][0], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.6)
        self.au_mot("P indice T de M")
        ed = VGroup(ecrit("P_T(M)", 40, ORANGE_RETENUE), self.t("≈ 0,33", 40)).arrange(RIGHT, buff=0.2)
        ed.move_to(P(1.6, y))
        neq = self.t("≠", 60, ROUGE_ERREUR).move_to(P(-1.45, y))
        self.play(*D.allumer([(0, 0)]), FadeIn(ed[0], shift=UP * 0.2), run_time=0.6)
        self.au_mot("0,33")
        self.play(FadeIn(ed[1]), Indicate(D.p2[0][0], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.6)
        self.play(FadeIn(neq, scale=0.5), run_time=0.3)
        self.insister(neq, 0.3)
        self.au_mot("Le test détecte bien")
        c1 = self.coche().next_to(eg, DOWN, buff=0.25)
        m1 = self.t("détecte les malades", 26, VERT_OK).next_to(c1, RIGHT, buff=0.15)
        self.play(Create(c1), FadeIn(m1), run_time=0.5)
        self.au_mot("un positif n'est pas sûr")
        m2 = self.t("un positif : pas sûr", 26, ORANGE_RETENUE).next_to(ed, DOWN, buff=0.25)
        self.play(FadeIn(m2, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def arbre_complet(self):
        """L'arbre de la dengue, branches vers T̄ SANS nombre : 0,96 ne s'écrit
        qu'au moment où la correction le dit."""
        A = self.arbre_dengue()
        leg = self.legende()
        return A, leg

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        A = self.arbre_dengue()
        self.add(A.tout())
        x0 = 0.6
        self.au_mot("Test négatif")
        q1 = self.ligne([("test", WHITE), ("négatif", ORANGE_RETENUE)], 36, 0.2).move_to(P(x0, 1.9), aligned_edge=LEFT)
        # ⛔ « pas d'écart » (Frédéric, 17/10) : les branches vers T̄ restent sans
        # nombre, la voix n'en dit aucun ici.
        self.play(*A.allumer([(0, 1), (1, 1)], ORANGE_RETENUE), FadeIn(q1, shift=LEFT * 0.2), run_time=0.7)
        self.au_mot("être sain")
        q2 = self.ligne([("→", WHITE), ("sain ?", VERT_OK)], 36, 0.2).next_to(q1, RIGHT, buff=0.25)
        self.play(FadeIn(q2, shift=LEFT * 0.2), Indicate(A.lab1[1], color=VERT_OK, scale_factor=1.6), run_time=0.6)
        f = VGroup(ecrit("P_~T(~M)", 52, BLEU_CALCUL), self.t("= ?", 52, ORANGE_RETENUE)).arrange(RIGHT, buff=0.3)
        f.move_to(P(x0, 0.6), aligned_edge=LEFT)
        self.play(FadeIn(f, scale=0.7), run_time=0.5)
        self.au_mot("Arrondi au millième")
        arr = self.t("arrondi au millième", 32, WHITE).move_to(P(x0, -0.5), aligned_edge=LEFT)
        self.play(FadeIn(arr, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        A, leg = self.arbre_complet()
        self.add(A.tout(), leg)
        x0, fs = 0.5, 34
        self.au_mot("P de T barre")
        l1 = VGroup(ecrit("P(~T)", fs, ORANGE_RETENUE), self.t("=", fs)).arrange(RIGHT, buff=0.2)
        l1.move_to(P(x0, 2.5), aligned_edge=LEFT)
        self.play(*A.allumer([(0, 1), (1, 1)], ORANGE_RETENUE), FadeIn(l1), run_time=0.6)
        self.au_mot("1 moins 0,0582")
        a1 = self.t("1 − 0,0582", fs).next_to(l1, RIGHT, buff=0.2)
        self.play(FadeIn(a1, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("0,9418")
        r1 = self.ligne([("=", WHITE), ("0,9418", JAUNE_TITRE)], fs, 0.2)
        r1.next_to(l1, DOWN, buff=0.2).align_to(l1[1], LEFT)
        self.play(FadeIn(r1, scale=0.7), run_time=0.4)

        self.au_mot("P de M barre inter T barre")
        l2 = VGroup(ecrit("P(~M ∩ ~T)", fs, VERT_OK), self.t("=", fs)).arrange(RIGHT, buff=0.2)
        l2.move_to(P(x0, 0.95), aligned_edge=LEFT)
        self.play(*A.allumer([(1, 1)], VERT_OK), FadeIn(l2), run_time=0.6)
        self.au_mot("0,98 fois 0,96")
        a2 = self.t("0,98 × 0,96", fs).next_to(l2, RIGHT, buff=0.2)
        p96 = A.pose2(1, 1, "0,96", ORANGE_RETENUE)
        self.play(FadeIn(a2, shift=LEFT * 0.2), FadeIn(p96, scale=0.6), Indicate(A.chemin(1, 1), color=VERT_OK),
                  run_time=0.6)
        self.au_mot("0,9408")
        r2 = self.ligne([("=", WHITE), ("0,9408", VERT_OK)], fs, 0.2)
        r2.next_to(l2, DOWN, buff=0.25).align_to(l2[1], LEFT)
        bout = self.t("0,9408", 30, VERT_OK).next_to(A.lab2[1][1], RIGHT, buff=0.3)
        self.play(FadeIn(r2, scale=0.7), FadeIn(bout, shift=RIGHT * 0.2), run_time=0.5)

        self.au_mot("Le quotient")
        frac = fraction_mob(self.t("0,9408", fs, VERT_OK), self.t("0,9418", fs, JAUNE_TITRE))
        l3 = VGroup(ecrit("P_~T(~M)", 40, BLEU_CALCUL), self.t("=", fs), frac).arrange(RIGHT, buff=0.2)
        l3.move_to(P(x0 - 0.2, -1.3), aligned_edge=LEFT)
        self.play(*A.allumer([(0, 1), (1, 1)], ORANGE_RETENUE), FadeIn(l3[:2]), run_time=0.5)
        self.play(TransformFromCopy(r2[1], frac[0]), Create(frac[1]), TransformFromCopy(r1[1], frac[2]), run_time=0.8)
        self.au_mot("environ 0,999")
        res = self.ligne([("≈", WHITE), ("0,999", JAUNE_TITRE)], 38, 0.18).next_to(l3, RIGHT, buff=0.2)
        self.play(FadeIn(res, scale=0.7), run_time=0.4)
        self.play(Create(self.cadre(res[1])), run_time=0.3)
        self.insister(res[1], 0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        l1 = VGroup(ecrit("P_A(B)", 48, BLEU_CALCUL), self.t("=", 48),
                    fraction_mob(ecrit("P(A ∩ B)", 42), ecrit("P(A)", 42))).arrange(RIGHT, buff=0.3)
        l2 = self.ligne([("Inverser :", ORANGE_RETENUE), ("P(B) avec l'arbre, puis diviser", WHITE)], 40, 0.2)
        l3 = VGroup(ecrit("P_A(B)", 48, BLEU_CALCUL), self.t("≠", 52, ROUGE_ERREUR),
                    ecrit("P_B(A)", 48, ORANGE_RETENUE)).arrange(RIGHT, buff=0.3)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.35) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7).move_to(P(-0.9, 0.4))
        for mot, l in zip(["P indice A de B égale", "Pour inverser", "n'est pas"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("Épisode 3 : les probabilités totales", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_formule()
        self.ecran_arbre()
        self.ecran_inverser()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
