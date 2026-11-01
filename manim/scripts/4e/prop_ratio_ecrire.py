# prop_ratio_ecrire.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 28 : EXPRIMER UN RATIO (micro du coach : prop_rapport, notion
# prop_ratio), AVEC VOIX. PAYSAGE SEULEMENT (les shorts 4e-prop-ratio-short-*
# existent déjà), CEINTURE VERTE.
# ⭐ Méthode travaillée : écrire le ratio « a : b », dit « a pour b », DANS
# L'ORDRE de la phrase ; le simplifier comme une fraction (÷ le même nombre) ;
# l'utiliser en multipliant les deux nombres par le même nombre ; les parts du
# tout (3 : 2 → 5 parts). Pas de produit en croix (réservé à l'épisode 24) ;
# « ÷ » écrit, jamais 5/2.
# ⭐ Le dessin qui porte tout : les BARRES DE PARTS (une rangée par couleur,
# une part = un bloc, la valeur d'une part écrite DEDANS). Simplifier = regrouper
# les blocs (6 blocs de 1 pot → 3 blocs de 2 pots, même longueur) ; utiliser =
# trouver la valeur d'une part (12 = 3 × 4 → chaque bloc vaut 4).
# ⭐ Fil rouge (erreur 1) : AJOUTER AU LIEU DE MULTIPLIER. Piège : 3 : 2, on
# ajoute 9 de chaque → 12 : 11, le vert trop jaune (ligne barrée). Question 2 :
# B = 11 pots (on ajoute 8 au lieu de multiplier), C ≈ 6,7 pots (l'ordre
# inversé). Question 1 : B = 3 : 2 (l'ordre inversé, barré quand la voix dit
# « dans cet ordre »), C = 5 : 10 (on a enlevé 5 au lieu de diviser).
#
# Décor et métier : DESSIN-MANGA, Tom, COLORISTE de mangas : le vert de la
# forêt (6 pots de bleu, 4 de jaune), le ciel (8 de blanc, 12 de bleu).
# Chiffres : tous inventés (recettes de couleurs). Aucun chiffre du monde
# réel : pas de source à citer.
# Centres d'intérêt : dessin-manga, art-design.
#
# Écrans : 00 garde · 01 Tom, la planche, 6 pots de bleu + 4 de jaune ·
# 02 le ratio 6 : 4 (« 6 pour 4 »), l'ordre · 03 simplifier : 6 : 4 = 3 : 2
# (blocs regroupés par 2) · 04 QUESTION 1 (10 rouges : 15 blancs) · 05 utiliser :
# 12 bleus → chaque part vaut 4 → 8 jaunes · 06 piège : ajouter 9 de chaque ·
# 07 QUESTION 2 (10 jaunes → ? bleus) · 08 les parts du tout (5 parts, 3 sur 5)
# · 09 défi le ciel (8 blancs, 12 bleus) · 09b correction 2 : 3 · 10 ce que tu
# as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-ratio-ecrire.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/4e-prop-ratio-ecrire/ ; marques mot à mot :
# manim/scripts/4e/prop_ratio_ecrire_marques.json (scripts/marques_dump.ps1
# puis le convertisseur « une marque par occurrence » de l'agent 19).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropReconnaitreBase de l'épisode 20 (lc, jouer, montre,
# ligne_rep bornée, coche loin du texte des choix). Ajouté ICI : pot(), tom(),
# planche_manga(), tache(), RangeeParts (la barre de parts), barrer_choix().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_ratio_ecrire.py PropRatioEcrire4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_ratio_ecrire.py PropRatioEcrire4e -o eleveai-maths-4e-prop-ratio-ecrire --media_dir manim/media-prop-4e-28
# Sortie : manim/sorties/4e/maths/proportionnalite/28-ratio-ecrire/eleveai-maths-4e-prop-ratio-ecrire.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import sans  # noqa: E402
import importlib.util  # noqa: E402

# le 6e a aussi un prop_reconnaitre.py, PLUS HAUT dans sys.path : on charge le 4e par son chemin
_spec = importlib.util.spec_from_file_location("prop_reconnaitre_4e", Path(__file__).resolve().parent / "prop_reconnaitre.py")
_p20 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_p20)
PropReconnaitreBase = _p20.PropReconnaitreBase

BLEU_P = "#3b82f6"     # la peinture bleue
JAUNE_P = "#facc15"    # la peinture jaune
ROUGE_P = "#ef4444"    # la peinture rouge
BLANC_P = "#e5e7eb"    # la peinture blanche
VERT_F = "#15803d"     # le vert de la forêt (la bonne recette)
VERT_J = "#a3e635"     # le vert « trop jaune » (la recette fausse)
CIEL = "#93c5fd"       # le bleu du ciel (défi)


def pot(couleur, s=1.0):
    """Un pot de peinture : le seau de sa couleur et son couvercle gris."""
    seau = Polygon(P(-0.3, 0.3), P(0.3, 0.3), P(0.24, -0.32), P(-0.24, -0.32), stroke_width=2.5,
                   color=WHITE).set_fill(couleur, opacity=1)
    couvercle = Rectangle(width=0.7, height=0.1, stroke_width=0).set_fill(GREY_B, opacity=1)
    couvercle.next_to(seau, UP, buff=0.02)
    return VGroup(seau, couvercle).scale(s)


def pots(n, couleur, s=0.5, par_rang=None, buff=0.12):
    """n pots en rangées (par_rang par rangée)."""
    g = VGroup(*[pot(couleur, s) for _ in range(n)])
    par_rang = par_rang or n
    g.arrange_in_grid(cols=par_rang, buff=buff) if n > par_rang else g.arrange(RIGHT, buff=buff)
    return g


def tache(couleur, r=0.55):
    """Une tache de peinture (le mélange obtenu) : un rond et trois gouttes."""
    rond = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    gouttes = VGroup(*[Circle(radius=r * k, fill_color=couleur, fill_opacity=1, stroke_width=0)
                       .move_to(rotate_vector(RIGHT * r * 1.15, a)) for k, a in ((0.22, 0.5), (0.16, 2.2), (0.18, 4.0))])
    return VGroup(rond, gouttes)


def tom(s=1.0):
    """Tom, coloriste : t-shirt noir, tablette graphique et stylet."""
    p = personne(peau="#e0ac69", tenue="#1f2937", cheveux="#111827")
    c = p.corps.get_center()
    tab = RoundedRectangle(width=0.75, height=0.55, corner_radius=0.06, fill_color="#334155", fill_opacity=1,
                           stroke_color=WHITE, stroke_width=2).move_to(c + P(0.55, -0.25)).rotate(0.15)
    ecran = RoundedRectangle(width=0.6, height=0.4, corner_radius=0.04, fill_color=VERT_F, fill_opacity=1,
                             stroke_width=0).move_to(tab).rotate(0.15)
    stylet = Line(c + P(0.2, 0.25), c + P(0.6, -0.1), color=AMBRE, stroke_width=5)
    p.add(tab, ecran, stylet)
    return p.scale(s)


def arbre(h=0.9):
    """Un sapin de manga (trois triangles) : .feuilles à colorier."""
    tronc = Rectangle(width=h * 0.14, height=h * 0.22, fill_color="#78350f", fill_opacity=1, stroke_width=0)
    feuilles = VGroup(*[Triangle(stroke_color=NUIT, stroke_width=2).set_fill(WHITE, 1).scale(h * (0.42 - 0.08 * k))
                        .move_to(UP * h * (0.25 + 0.22 * k)) for k in range(3)])
    tronc.next_to(feuilles, DOWN, buff=-0.05)
    g = VGroup(tronc, feuilles)
    g.feuilles = feuilles
    return g


def planche_manga(l=3.0, h=2.2):
    """Une planche de manga : feuille blanche, trois cases, une forêt de sapins
    encore blancs dans la grande case (.sapins[i].feuilles à colorier)."""
    feuille = RoundedRectangle(width=l, height=h, corner_radius=0.08, fill_color=WHITE, fill_opacity=1,
                               stroke_width=0)
    m = 0.12
    grande = Rectangle(width=l - 2 * m, height=h * 0.6, stroke_color=NUIT, stroke_width=3).move_to(
        feuille.get_top() + DOWN * (m + h * 0.3))
    pw = (l - 3 * m) / 2
    petites = VGroup(*[Rectangle(width=pw, height=h * 0.4 - 3 * m, stroke_color=NUIT, stroke_width=3)
                       for _ in range(2)]).arrange(RIGHT, buff=m).next_to(grande, DOWN, buff=m)
    sapins = VGroup(*[arbre(h * 0.42) for _ in range(4)]).arrange(RIGHT, buff=l * 0.08).move_to(grande)
    bulle_ = Ellipse(width=pw * 0.7, height=0.3, stroke_color=NUIT, stroke_width=2).move_to(petites[0])
    g = VGroup(feuille, grande, petites, sapins, bulle_)
    g.sapins = sapins
    return g


def encre(couleur):
    """La couleur du nombre écrit DANS un bloc : blanc sur le bleu et le rouge."""
    return WHITE if couleur in (BLEU_P, ROUGE_P) else NUIT


class RangeeParts(VGroup):
    """Une rangée de la barre de parts : n blocs égaux et collés, la valeur
    d'UNE part écrite dans chaque bloc (« 1 », « 2 », « ? »…).
    .blocs[i] = VGroup(rectangle, texte) ; .textes[i] = le texte du bloc i.
    Les textes sont `sans` (décor) ; la scène les rend synchronisés au besoin."""

    def __init__(self, n, couleur, valeur="1", bw=0.6, h=0.6, fs=28, synchro=False, **kw):
        super().__init__(**kw)
        self.n, self.couleur, self.bw, self.h, self.fs = n, couleur, bw, h, fs
        self.blocs = VGroup()
        self.textes = VGroup()
        for _ in range(n):
            r = Rectangle(width=bw, height=h, fill_color=couleur, fill_opacity=1, stroke_color=BLACK, stroke_width=3)
            t = Text(str(valeur), font_size=fs, color=encre(couleur), weight=BOLD).move_to(r)
            if t.width > bw - 0.1:
                t.scale_to_fit_width(bw - 0.1)
            if not synchro:
                sans(t)
            self.blocs.add(VGroup(r, t))
            self.textes.add(t)
        self.blocs.arrange(RIGHT, buff=0)
        self.add(self.blocs)

    def cadres(self, k, couleur=AMBRE):
        """Les groupes de k blocs entourés (le geste de « ÷ k ») : une liste de
        rectangles, un par groupe, à faire apparaître (Create)."""
        out = VGroup()
        for i in range(0, self.n, k):
            g = VGroup(*self.blocs[i:i + k])
            out.add(SurroundingRectangle(g, color=couleur, buff=0.06, stroke_width=5, corner_radius=0.05))
        return out

    def regroupee(self, k, valeur, synchro=True):
        """La même rangée, MÊME LONGUEUR, en blocs de k parts : n ÷ k blocs
        de valeur `valeur` (non ajoutée ; posée exactement par-dessus)."""
        r = RangeeParts(self.n // k, self.couleur, valeur, self.bw * k, self.h, self.fs, synchro=synchro)
        r.move_to(self.blocs).align_to(self.blocs, LEFT)
        return r

    def valeurs(self, valeur, synchro=True, couleur=None):
        """De nouveaux textes « valeur » dans chaque bloc (à faire entrer par
        FadeIn pendant que les anciens sortent)."""
        out = VGroup()
        for b in self.blocs:
            t = Text(str(valeur), font_size=self.fs, color=couleur or encre(self.couleur), weight=BOLD).move_to(b[0])
            if t.width > self.bw - 0.1:
                t.scale_to_fit_width(self.bw - 0.1)
            if not synchro:
                sans(t)
            out.add(t)
        return out


def barre_ratio(rangees, noms, x_gauche=-5.0, y_haut=1.0, ecart=0.95, fs_nom=32):
    """Les rangées de la barre de parts, l'une SOUS l'autre, calées à gauche
    sur x_gauche (blocs de même taille d'une rangée à l'autre), le nom de
    chaque couleur à gauche (« Bleu »). Renvoie (rangées, noms) placés."""
    ts = VGroup()
    for i, (r, (s, c)) in enumerate(zip(rangees, noms)):
        r.move_to(P(0, y_haut - i * ecart)).align_to(P(x_gauche, 0), LEFT)
        t = sans(Text(s, font_size=fs_nom, color=c, weight=BOLD)).next_to(r, LEFT, buff=0.25)
        ts.add(t)
    return rangees, ts


class PropRatioEcrireBase(PropReconnaitreBase):
    nom_voix = "4e-prop-ratio-ecrire"
    fichier_marques = "prop_ratio_ecrire_marques.json"

    def barrer_choix(self, i):
        """Un trait rouge sur le texte du choix i (le leurre cité par la voix)."""
        corps = self.cartes_q[i][1][1]
        return Line(corps.get_left() + LEFT * 0.08, corps.get_right() + RIGHT * 0.08, color=ROUGE_ERREUR,
                    stroke_width=6)

    def deux_rangees(self, n1, c1, nom1, n2, c2, nom2, valeur="1", bw=0.6, y=0.9, x=-5.0, ecart=0.95,
                     synchro=False):
        """La barre de parts à deux couleurs (même taille de bloc) et ses noms."""
        r1 = RangeeParts(n1, c1, valeur, bw, synchro=synchro)
        r2 = RangeeParts(n2, c2, valeur, bw, synchro=synchro)
        (r1, r2), noms = barre_ratio([r1, r2], [(nom1, c1), (nom2, c2)], x, y, ecart)
        return r1, r2, noms

    def total(self, rangee, s, couleur=WHITE, fs=30):
        """« 6 pots » écrit à droite d'une rangée."""
        t = self.t(s, fs, couleur).next_to(rangee, RIGHT, buff=0.3)
        t.original_text = s.split()[0]  # n'attend que le nombre (« pots » revient plus loin)
        return t

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Exprimer un ratio", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Exprimer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        pb = pots(3, BLEU_P, 0.8).move_to(P(-5.0, 0.5))
        pj = pots(2, JAUNE_P, 0.8).move_to(P(-2.6, 0.5))
        plus = sans(self.t("+", 48)).move_to(P(-3.7, 0.5))
        eg = sans(self.t("→", 48)).move_to(P(-1.6, 0.5))
        ta = tache(VERT_F, 0.5).move_to(P(-0.7, 0.5))
        nom = self.t("Les couleurs de Tom", 36, AMBRE).move_to(P(3.45, 0.5))
        self.play(FadeIn(pb, shift=DOWN * 0.3), FadeIn(pj, shift=DOWN * 0.3), FadeIn(plus), run_time=0.5)
        self.au_mot("Les couleurs")
        self.play(FadeIn(nom, shift=LEFT * 0.2), FadeIn(eg), GrowFromCenter(ta), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Tom, coloriste ; le vert de la forêt : 6 bleus + 4 jaunes ──────
    def ecran_situation(self):
        self.ecran("01-situation")
        tm = tom(1.0).move_to(P(-5.5, -0.9))
        nom = self.t("Tom", 40, BLEU_CALCUL).next_to(tm, UP, buff=0.3)
        self.montre("Voici Tom", FadeIn(tm, shift=UP * 0.3), FadeIn(nom), rt=0.5)
        pl = planche_manga(3.0, 2.2).move_to(P(-2.4, 1.75))
        L0 = self.lc([("Coloriste", JAUNE_TITRE), ("de mangas", WHITE)], 2.95, fs=40)
        self.jouer(L0, ["coloriste", "des mangas"], {1: [FadeIn(pl, scale=0.8)]})
        L1 = self.lc([("Le vert de la forêt :", VERT_OK)], 2.1, fs=38)
        self.jouer(L1, ["le vert de"], {0: [Circumscribe(pl.sapins, color=VERT_OK, buff=0.08)]})
        pb = pots(6, BLEU_P, 0.55).move_to(P(-2.4, -0.25))
        pj = pots(4, JAUNE_P, 0.55).move_to(P(-2.4, -1.15)).align_to(pb, LEFT)
        L2 = self.lc([("6 pots", BLEU_P), ("de bleu", BLEU_P)], 1.25, fs=40)
        self.jouer(L2, ["6 pots", "de bleu"],
                   {0: [LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in pb], lag_ratio=0.12)]})
        L3 = self.lc([("et 4 pots", JAUNE_P), ("de jaune", JAUNE_P)], 0.5, fs=40)
        self.jouer(L3, ["4 pots", "de jaune"],
                   {0: [LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in pj], lag_ratio=0.12)]})
        ta = tache(VERT_F, 0.45).move_to(P(-2.4, -2.45))
        self.play(GrowFromCenter(ta), *[f.animate.set_fill(VERT_F, 1) for s in pl.sapins for f in s.feuilles],
                  run_time=0.7)
        L4 = self.lc([("Comment noter", ORANGE_RETENUE)], -0.6, fs=38)
        L5 = self.lc([("cette recette ?", ORANGE_RETENUE)], -1.3, fs=38)
        self.jouer(L4, ["Comment noter"])
        self.jouer(L5, ["cette recette"], {0: [Indicate(ta, scale_factor=1.15)]})
        self.attendre_voix()

    # ── 02 : le ratio 6 : 4, dit « 6 pour 4 » ; l'ordre compte ──────────────
    def ecran_ratio(self):
        self.ecran("02-ratio")
        ta = sans(tache(VERT_F, 0.4)).move_to(P(-3.2, 2.5))
        rb, rj, noms = self.deux_rangees(6, BLEU_P, "Bleu", 4, JAUNE_P, "Jaune", y=1.0)
        tb, tj = self.total(rb, "6 pots", BLEU_P), self.total(rj, "4 pots", JAUNE_P)
        L0 = self.lc([("Un ratio", JAUNE_TITRE)], 2.95, fs=46)
        self.jouer(L0, ["un ratio"], {0: [FadeIn(ta), FadeIn(noms), FadeIn(rb, shift=RIGHT * 0.3),
                                          FadeIn(rj, shift=RIGHT * 0.3)]})
        L1 = self.lc([("bleu", BLEU_P), ("pour", WHITE), ("jaune :", JAUNE_P)], 2.1, fs=40)
        self.jouer(L1, ["bleu pour", None, "jaune, 6"], {0: [Indicate(noms[0], color=BLEU_P)],
                                                         2: [Indicate(noms[1], color=JAUNE_P)]})
        L2 = self.lc([("6", BLEU_P), ("pour", WHITE), ("4", JAUNE_P)], 1.3, fs=46)
        self.jouer(L2, ["6 pour", None, "4. On"], {0: [FadeIn(tb, scale=1.3)], 2: [FadeIn(tj, scale=1.3)]})
        L3 = self.lc([("6", BLEU_P), (":", WHITE), ("4", JAUNE_P)], 0.1, fs=80, xl=2.2)
        cadre = SurroundingRectangle(L3, color=AMBRE, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.jouer(L3, ["aussi 6", "deux-points", ("4. L'ordre", 1)])
        self.play(Create(cadre), run_time=0.4)
        L4 = self.lc([("L'ordre compte :", ORANGE_RETENUE)], -1.15, fs=38)
        self.jouer(L4, ["L'ordre compte"])
        L5 = self.lc([("d'abord le bleu,", BLEU_P)], -1.85, fs=36)
        L6 = self.lc([("puis le jaune.", JAUNE_P)], -2.5, fs=36)
        self.jouer(L5, ["d'abord le bleu"], {0: [Indicate(L3[0], color=BLEU_P, scale_factor=1.3),
                                                 Circumscribe(rb, color=BLEU_P, buff=0.06)]})
        self.jouer(L6, ["puis le jaune"], {0: [Indicate(L3[2], color=JAUNE_P, scale_factor=1.3),
                                               Circumscribe(rj, color=JAUNE_P, buff=0.06)]})
        self.attendre_voix()

    # ── 03 : simplifier : 6 : 4 = 3 : 2 (les blocs regroupés par 2) ─────────
    def ecran_simplifier(self):
        self.ecran("03-simplifier")
        rb, rj, noms = self.deux_rangees(6, BLEU_P, "Bleu", 4, JAUNE_P, "Jaune", y=2.2)
        tb = sans(self.total(rb, "6 pots", BLEU_P))
        tj = sans(self.total(rj, "4 pots", JAUNE_P))
        self.add(noms, rb, rj, tb, tj)
        L0 = self.lc([("Comme une fraction,", WHITE)], 2.95, fs=38)
        L1 = self.lc([("un ratio se simplifie.", AMBRE)], 2.3, fs=38)
        self.jouer(L0, ["Comme une"])
        self.jouer(L1, ["un ratio se"])
        L2 = self.lc([("6 et 4", WHITE), ("÷ 2", AMBRE)], 1.45, fs=42)
        cb, cj = rb.cadres(2), rj.cadres(2)
        self.jouer(L2, ["6 et 4", "par 2"], {1: [Create(cb), Create(cj)]})
        rb2, rj2 = rb.regroupee(2, "2 pots", False), rj.regroupee(2, "2 pots", False)
        L3 = self.lc([("6 : 4", WHITE), ("=", WHITE), ("3", VERT_OK), (":", VERT_OK), ("2", VERT_OK)], 0.5, fs=56)
        for a, b, e in ((0, 1, 0.35), (1, 2, 0.35), (2, 3, 0.3), (3, 4, 0.3)):
            L3[b].next_to(L3[a], RIGHT, buff=e)
        L3[1].set_y(L3[0].get_y())
        n3 = sans(self.t("3 parts", 30, BLEU_P)).next_to(tb, DOWN, buff=0.05).align_to(tb, LEFT)
        n2 = sans(self.t("2 parts", 30, JAUNE_P)).next_to(tj, DOWN, buff=0.05).align_to(tj, LEFT)
        self.jouer(L3, ["6 pour 4", "c'est le ratio 3", "3 pour 2", None, "2. 3 pots"],
                   {4: [FadeOut(cb), FadeOut(cj), ReplacementTransform(rb, rb2), ReplacementTransform(rj, rj2),
                        FadeIn(n3), FadeIn(n2)]})
        self.insister(VGroup(*L3[2:]), 1.2, 0.25)
        pb = pots(3, BLEU_P, 0.5).move_to(P(-4.3, -0.6))
        pj = pots(2, JAUNE_P, 0.5).next_to(pb, RIGHT, buff=0.45)
        L4 = self.lc([("3 pots de bleu", BLEU_P), ("pour", WHITE)], -0.45, fs=36)
        L5 = self.lc([("2 pots de jaune", JAUNE_P)], -1.1, fs=36)
        self.jouer(L4, ["3 pots de bleu", "pour 2 pots"],
                   {0: [LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in pb], lag_ratio=0.12)]})
        self.jouer(L5, ["2 pots de jaune"],
                   {0: [LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in pj], lag_ratio=0.12)]})
        ta = tache(VERT_F, 0.35).move_to(P(-3.9, -1.8))
        L6 = self.lc([("Le même vert,", VERT_OK)], -1.75, fs=36)
        L7 = self.lc([("en plus petite quantité.", WHITE)], -2.4, fs=34)
        self.jouer(L6, ["le même vert"], {0: [GrowFromCenter(ta)]})
        self.jouer(L7, ["en plus petite"])
        self.attendre_voix()

    # ── 04 : QUESTION 1 (10 rouges pour 15 blancs → 2 : 3) ──────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pr = pots(10, ROUGE_P, 0.55, par_rang=5).move_to(P(-3.4, 1.2))
        pw = pots(15, BLANC_P, 0.55, par_rang=5).move_to(P(-3.4, -0.9))

        def avant(sc):
            sc.play(FadeIn(pr, shift=DOWN * 0.3), FadeIn(pw, shift=DOWN * 0.3), run_time=0.4)

        def apres(sc):
            rr, rw, noms = sc.deux_rangees(10, ROUGE_P, "Rouge", 15, BLANC_P, "Blanc", bw=0.34, y=1.0, x=-4.6,
                                           ecart=1.0)
            for r in (rr, rw):
                for t in r.textes:
                    t.scale(0.8)
            l0 = sc.ligne_rep(0, ["10 et 15", "÷ 5", "→ 2 : 3"])
            l1 = sc.ligne_rep(1, ["Rouge pour blanc,", "dans cet ordre."])
            cr, cw = rr.cadres(5), rw.cadres(5)
            rr2, rw2 = rr.regroupee(5, "5 pots", False), rw.regroupee(5, "5 pots", False)
            sc.montre("10 et 15", FadeOut(pr), FadeOut(pw), FadeIn(noms), FadeIn(rr), FadeIn(rw),
                      FadeIn(l0[0], shift=UP * 0.15), rt=0.4)
            sc.montre("par 5", FadeIn(l0[1], shift=UP * 0.15), Create(cr), Create(cw), rt=0.4)
            sc.montre("2 pour 3", FadeIn(l0[2], scale=1.2), FadeOut(cr), FadeOut(cw), ReplacementTransform(rr, rr2),
                      ReplacementTransform(rw, rw2), rt=0.5)
            sc.montre("Rouge pour", FadeIn(l1[0], shift=UP * 0.15), Indicate(noms[0], color=ROUGE_P), rt=0.4)
            sc.montre("dans cet ordre", FadeIn(l1[1], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.4)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["10 rouges pour 15 blancs.", "Ratio rouge : blanc simplifié ?"],
                            [self.t("2 : 3", 34), self.t("3 : 2", 34), self.t("5 : 10", 34)], 0,
                            ["10 et 15 ÷ 5 → 2 : 3", "Rouge pour blanc, dans cet ordre."],
                            mot_q="10 pots", avant_q=avant, autres_r=apres)

    # ── 05 : utiliser : 12 bleus → une part vaut 4 → 8 jaunes ───────────────
    def ecran_utiliser(self):
        self.ecran("05-utiliser")
        tm = tom(0.8).move_to(P(-5.6, -1.6))
        rb, rj, noms = self.deux_rangees(3, BLEU_P, "Bleu", 2, JAUNE_P, "Jaune", valeur="?", bw=1.1, y=1.7, x=-4.6,
                                         ecart=1.1)
        L0 = self.lc([("Beaucoup de vert :", VERT_OK)], 2.95, fs=38)
        self.jouer(L0, ["beaucoup de"], {0: [FadeIn(tm, shift=UP * 0.3)]})
        L1 = self.lc([("12 pots de bleu.", BLEU_P)], 2.25, fs=40)
        self.jouer(L1, ["12 pots"])
        L2 = self.lc([("Combien de jaune ?", ORANGE_RETENUE)], 1.55, fs=40)
        self.jouer(L2, ["Combien"])
        L3 = self.lc([("Ratio :", WHITE), ("3 : 2", AMBRE)], 0.75, fs=42)
        self.jouer(L3, ["Le ratio", "3 pour 2"], {1: [FadeIn(noms), FadeIn(rb, shift=RIGHT * 0.3),
                                                     FadeIn(rj, shift=RIGHT * 0.3)]})
        t12 = self.total(rb, "12 pots", BLEU_P, fs=34)
        br = Brace(rb, UP, color=BLEU_P, buff=0.08)
        t12.next_to(br, UP, buff=0.08)
        L4 = self.lc([("12 =", WHITE), ("3 × 4", WHITE)], -0.15, fs=44)
        v4b = rb.valeurs("4")
        self.jouer(L4, ["12, c'est", "3 fois 4"],
                   {0: [GrowFromCenter(br), FadeIn(t12, scale=1.2)],
                    1: [FadeOut(rb.textes), FadeIn(v4b, scale=1.4)]})
        self.play(Indicate(v4b, color=AMBRE, scale_factor=1.3), run_time=0.5)
        L5 = self.lc([("Jaune :", JAUNE_P), ("2 × 4 =", WHITE), ("8 pots", VERT_OK)], -1.05, fs=44)
        v4j = rj.valeurs("4")
        t8 = self.t("8 pots", 34, VERT_OK).next_to(rj, RIGHT, buff=0.3)
        self.jouer(L5, ["Donc le jaune", "2 fois 4", "8 pots"],
                   {1: [FadeOut(rj.textes), FadeIn(v4j, scale=1.4)], 2: [FadeIn(t8, scale=1.3)]})
        self.insister(L5[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 06 : piège : on ajoute 9 de chaque → 12 : 11, le vert trop jaune ────
    def ecran_piege(self):
        self.ecran("06-piege")
        T = self.lc([("Attention au piège !", ROUGE_ERREUR)], 2.95, fs=44)
        self.jouer(T, ["Attention"])
        L1 = self.lc([("On croit qu'il suffit d'ajouter.", WHITE)], 2.25, fs=32)
        self.jouer(L1, ["On croit"])
        rb, rj, noms = self.deux_rangees(3, BLEU_P, "Bleu", 2, JAUNE_P, "Jaune", bw=0.42, y=1.9, x=-4.8)
        bon = tache(VERT_F, 0.5).move_to(P(-4.0, -1.2))
        faux = tache(VERT_J, 0.5).move_to(P(-1.6, -1.2))
        lb = self._nombre_seul(self.t("3 : 2", 32, VERT_OK).next_to(bon, DOWN, buff=0.3), "2")
        lf = self._nombre_seul(self.t("12 : 11", 32, ROUGE_ERREUR).next_to(faux, DOWN, buff=0.3), "11")
        L2 = self.lc([("3 bleus", BLEU_P), ("et 2 jaunes", JAUNE_P)], 1.55, fs=40)
        self.jouer(L2, ["3 bleus", "et 2 jaunes"], {0: [FadeIn(noms[0]), FadeIn(rb, shift=RIGHT * 0.2)],
                                                     1: [FadeIn(noms[1]), FadeIn(rj, shift=RIGHT * 0.2),
                                                         GrowFromCenter(bon), FadeIn(lb)]})
        ab = RangeeParts(9, BLEU_P, "1", 0.42).next_to(rb, RIGHT, buff=0)
        aj = RangeeParts(9, JAUNE_P, "1", 0.42).next_to(rj, RIGHT, buff=0)
        cab = SurroundingRectangle(ab, color=ORANGE_RETENUE, buff=0.05, stroke_width=5)
        caj = SurroundingRectangle(aj, color=ORANGE_RETENUE, buff=0.05, stroke_width=5)
        pb = self.t("+ 9", 30, ORANGE_RETENUE).next_to(cab, UP, buff=0.1)
        pj = self.t("+ 9", 30, ORANGE_RETENUE).next_to(caj, DOWN, buff=0.1)
        L3 = self.lc([("+ 9 bleus,", ORANGE_RETENUE), ("+ 9 jaunes", ORANGE_RETENUE)], 0.85, fs=40)
        self.jouer(L3, ["ajoute 9 bleus", "ajoute 9 jaunes"],
                   {0: [LaggedStart(*[FadeIn(b, shift=RIGHT * 0.2) for b in ab.blocs], lag_ratio=0.06), Create(cab),
                        FadeIn(pb)],
                    1: [LaggedStart(*[FadeIn(b, shift=RIGHT * 0.2) for b in aj.blocs], lag_ratio=0.06), Create(caj),
                        FadeIn(pj)]})
        L4 = self.lc([("12 bleus,", BLEU_P), ("11 jaunes ?", JAUNE_P)], 0.15, fs=40)
        self.jouer(L4, ["12 bleus", "11 jaunes"], {1: [GrowFromCenter(faux), FadeIn(lf)]})
        barre = Line(L4.get_left() + LEFT * 0.1, L4.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=6)
        L5 = self.lc([("Non !", ROUGE_ERREUR)], -0.6, fs=44)
        self.jouer(L5, ["Non"], {0: [Create(barre)]})
        xf = Cross(faux, stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=0.8)
        L6 = self.lc([("Le vert : trop jaune !", VERT_J)], -1.3, fs=36)
        self.jouer(L6, ["Le vert devien"], {0: [Indicate(faux, scale_factor=1.15)]})
        self.play(Create(xf), run_time=0.4)
        L7 = self.lc([("Un ratio se multiplie,", VERT_OK)], -2.0, fs=36)
        L8 = self.lc([("il ne s'ajoute pas.", ROUGE_ERREUR)], -2.65, fs=36)
        self.jouer(L7, ["Un ratio se"])
        self.jouer(L8, ["il ne s'ajoute"])
        cadre = SurroundingRectangle(VGroup(L7, L8), color=VERT_OK, buff=0.15, corner_radius=0.1)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (3 : 2, 10 jaunes → 15 bleus) ───────────────────────
    @staticmethod
    def _nombre_seul(t, n):
        """La synchro de t n'attend que le nombre n (« 6 virgule 7 » est long)."""
        t.original_text = n
        return t

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pj = pots(10, JAUNE_P, 0.6, par_rang=5).move_to(P(-3.4, 0.9))
        pq = VGroup(pot(BLEU_P, 0.9), self.t("?", 48, ORANGE_RETENUE)).arrange(RIGHT, buff=0.3).move_to(P(-3.4, -1.0))
        sans(pq)

        def avant(sc):
            sc.play(FadeIn(pj, shift=DOWN * 0.3), FadeIn(pq), run_time=0.4)

        def apres(sc):
            rb, rj, noms = sc.deux_rangees(3, BLEU_P, "Bleu", 2, JAUNE_P, "Jaune", valeur="?", bw=1.1, y=1.0,
                                           x=-4.6, ecart=1.1)
            t10 = sans(sc.total(rj, "10 pots", JAUNE_P, fs=32))
            l0 = sc.ligne_rep(0, ["10 =", "2 × 5"])
            l1 = sc.ligne_rep(1, ["Bleu :", "3 × 5 =", "15 pots."])
            v5j, v5b = rj.valeurs("5"), rb.valeurs("5")
            t15 = sc.t("15 pots", 32, VERT_OK).next_to(rb, RIGHT, buff=0.3)
            sc.montre("10, c'est", FadeOut(pj), FadeOut(pq), FadeIn(noms), FadeIn(rb), FadeIn(rj), FadeIn(t10),
                      FadeIn(l0[0], shift=UP * 0.15), rt=0.4)
            sc.montre("2 fois 5", FadeIn(l0[1], shift=UP * 0.15), FadeOut(rj.textes), FadeIn(v5j, scale=1.4), rt=0.4)
            sc.montre("Donc le bleu", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("3 fois 5", FadeIn(l1[1], shift=UP * 0.15), FadeOut(rb.textes), FadeIn(v5b, scale=1.4), rt=0.4)
            sc.montre("15 pots", FadeIn(l1[2], scale=1.3), FadeIn(t15, scale=1.3), rt=0.4)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Bleu pour jaune = 3 : 2.", "Tom a 10 pots de jaune.", "Combien de bleu ?"],
                            [self.t("15 pots", 34), self.t("11 pots", 34),
                             self._nombre_seul(self.t("environ 6,7 pots", 34), "6,7")], 0,
                            ["10 = 2 × 5", "Bleu : 3 × 5 = 15 pots."],
                            mot_q="Bleu pour", avant_q=avant, autres_r=apres)

    # ── 08 : les parts du tout : 3 + 2 = 5 parts, le bleu fait 3 parts sur 5 ─
    def ecran_parts(self):
        self.ecran("08-parts")
        rb = RangeeParts(3, BLEU_P, "1 part", 1.1, fs=24)
        rj = RangeeParts(2, JAUNE_P, "1 part", 1.1, fs=24)
        bande = VGroup(rb, rj).arrange(RIGHT, buff=0).move_to(P(-3.0, 0.9))
        L0 = self.lc([("Les parts du tout", JAUNE_TITRE)], 2.95, fs=44)
        self.jouer(L0, ["les parts du"])
        L1 = self.lc([("3 : 2", AMBRE)], 2.05, fs=56)
        self.jouer(L1, ["3 pour 2"], {0: [FadeIn(rb, shift=RIGHT * 0.3), FadeIn(rj, shift=LEFT * 0.3)]})
        bb, bj = Brace(rb, UP, color=BLEU_P, buff=0.08), Brace(rj, UP, color=JAUNE_P, buff=0.08)
        tb3 = self.t("3 parts", 30, BLEU_P).next_to(bb, UP, buff=0.08)
        tj2 = self.t("2 parts", 30, JAUNE_P).next_to(bj, UP, buff=0.08)
        L2 = self.lc([("3 parts de bleu,", BLEU_P)], 1.15, fs=38)
        L3 = self.lc([("2 parts de jaune,", JAUNE_P)], 0.45, fs=38)
        self.jouer(L2, ["3 parts de"], {0: [GrowFromCenter(bb), FadeIn(tb3)]})
        self.jouer(L3, ["2 parts de"], {0: [GrowFromCenter(bj), FadeIn(tj2)]})
        bt = Brace(bande, DOWN, color=WHITE, buff=0.08)
        t5 = self.t("5 parts en tout", 30, WHITE).next_to(bt, DOWN, buff=0.08)
        L4 = self.lc([("5 parts en tout.", WHITE)], -0.25, fs=38)
        self.jouer(L4, ["5 parts"], {0: [GrowFromCenter(bt), FadeIn(t5)]})
        ta = tache(VERT_F, 0.45).move_to(P(-3.0, -2.2))
        L5 = self.lc([("Le bleu :", BLEU_P), ("3 parts sur 5", VERT_OK)], -1.2, fs=40)
        cadre = SurroundingRectangle(L5[1], color=VERT_OK, buff=0.15, corner_radius=0.1)
        self.jouer(L5, ["Le bleu fait", "3 parts sur"],
                   {0: [Circumscribe(rb, color=BLEU_P, buff=0.06)], 1: [GrowFromCenter(ta)]})
        self.play(Create(cadre), Indicate(rb, color=AMBRE, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 09 : défi : le ciel, 8 blancs pour 12 bleus ─────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.montre("À toi de jouer", Write(tit), rt=0.6)
        ciel = tache(CIEL, 0.45).move_to(P(-5.2, 1.85))
        pw = pots(8, BLANC_P, 0.55, par_rang=4).move_to(P(-2.6, 1.3))
        pb = pots(12, BLEU_P, 0.55, par_rang=6).move_to(P(-2.6, -0.9))
        L0 = self.lc([("Le ciel :", CIEL)], 2.1, fs=40)
        self.jouer(L0, ["le ciel"], {0: [GrowFromCenter(ciel)]})
        L1 = self.lc([("8 pots de blanc", WHITE)], 1.35, fs=40)
        self.jouer(L1, ["8 pots"], {0: [LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in pw], lag_ratio=0.08)]})
        L2 = self.lc([("et 12 pots de bleu", BLEU_P)], 0.6, fs=40)
        self.jouer(L2, ["12 pots"], {0: [LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in pb], lag_ratio=0.06)]})
        L3 = self.lc([("Ratio blanc pour bleu ?", ORANGE_RETENUE)], -0.2, fs=38)
        self.jouer(L3, ["le ratio blanc"])
        L4 = self.lc([("Puis simplifie-le !", ORANGE_RETENUE)], -0.9, fs=38)
        self.jouer(L4, ["puis simplifie"])
        self.pause_defi(y=-1.7)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.5)
        rw, rb, noms = self.deux_rangees(8, BLANC_P, "Blanc", 12, BLEU_P, "Bleu", bw=0.36, y=1.3, x=-4.9, ecart=1.1)
        L1 = self.lc([("Blanc pour bleu :", WHITE)], 2.1, fs=40)
        self.jouer(L1, ["Blanc pour"], {0: [FadeIn(noms)]})
        L2 = self.lc([("8 : 12", WHITE)], 1.3, fs=52)
        self.jouer(L2, ["8 pour 12"], {0: [FadeIn(rw, shift=RIGHT * 0.2), FadeIn(rb, shift=RIGHT * 0.2)]})
        L3 = self.lc([("8 et 12", WHITE), ("÷ 4", AMBRE)], 0.4, fs=44)
        cw, cb = rw.cadres(4), rb.cadres(4)
        self.jouer(L3, ["8 et 12 se", "par 4"], {1: [Create(cw), Create(cb)]})
        rw2, rb2 = rw.regroupee(4, "4 pots", False), rb.regroupee(4, "4 pots", False)
        L4 = self.lc([("2", VERT_OK), (":", VERT_OK), ("3", VERT_OK)], -0.65, fs=64)
        L4[1].next_to(L4[0], RIGHT, buff=0.32)
        L4[2].next_to(L4[1], RIGHT, buff=0.32)
        cadre = SurroundingRectangle(L4, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=5)
        n2 = sans(self.t("2 parts", 30, WHITE)).next_to(rw2, RIGHT, buff=0.3)
        n3 = sans(self.t("3 parts", 30, BLEU_P)).next_to(rb2, RIGHT, buff=0.3)
        self.jouer(L4, ["2 pour 3", None, "3."], {2: [FadeOut(cw), FadeOut(cb), ReplacementTransform(rw, rw2),
                                          ReplacementTransform(rb, rb2), FadeIn(n2), FadeIn(n3)]})
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(cadre, L4), 1.1, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        rb, rj, noms = self.deux_rangees(3, BLEU_P, "Bleu", 2, JAUNE_P, "Jaune", bw=0.8, y=0.4, x=-3.6)
        lab = sans(self.t("3 : 2", 48, AMBRE)).next_to(VGroup(rb, rj), DOWN, buff=0.45).align_to(rb, LEFT)
        ta = sans(tache(VERT_F, 0.35)).next_to(lab, RIGHT, buff=0.5)
        fig = VGroup(noms, rb, rj, lab, ta)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Un ratio compare", "deux quantités, dans un ordre :", "a pour b, noté a : b."),
            ("Il se simplifie", "comme une fraction."),
            ("Même recette : on multiplie", "les deux nombres", "par le même nombre.")], fs=36)
        self.au_mot("Un ratio compare")
        self.montrer_ligne(lignes[0], Indicate(noms[0], color=BLEU_P), Indicate(noms[1], color=JAUNE_P))
        self.au_mot("Il se simplifie")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et pour garder")
        self.montrer_ligne(lignes[2], Indicate(lab, color=AMBRE))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ratio()
        self.ecran_simplifier()
        self.ecran_question1()
        self.ecran_utiliser()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_parts()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropRatioEcrire4e(PropRatioEcrireBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
