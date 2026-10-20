# proba_auto_somme_issues.py
# EleveAI — Maths 1re TRONC COMMUN (automatismes) — série « Probabilités »,
# épisode 25 : la probabilité d'un événement, somme de ses issues
# (micro : auto_proba_somme_issues, notion auto_proba_base), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_auto_somme_issues_short.py
# (ceinture jaune, « 2 notes sur 5, donc 40 % ? »).
#
# ⭐ Le fil : le TABLEAU DE LOI du coach (`canvasLoi` de la banque
# automatismes-probabilites.bank.ts → canvas `tableau_donnees`,
# lib/tutor-v4/components/TableauDonneesCanvas.tsx) : carte blanche, titre
# ardoise, ligne d'en-tête ardoise (#1E293B) « Issue | … », ligne
# « Probabilité » (étiquette bleu ciel #E0F2FE, cases blanches) ; une case
# mise en avant devient jaune (#FEF08A, cerclée de #EAB308).
#   Ici les issues sont des ÉTOILES DESSINÉES (1 à 5). Les cases de
# l'événement s'allument, leurs valeurs GLISSENT vers la somme.
# ⛔ PAS D'ÉCART : une valeur n'entre dans le tableau qu'au moment où la voix
# la dit (01) ; les bâtons du piège (05) ne portent aucun nombre.
#
# Écrans : 00 garde · 01 l'appli des paniers bio (la loi) · 02 la règle ·
# 03 « au moins 4 étoiles » = 0,3 + 0,4 = 0,7 · 04 la loi fait 1 · 05 le
# piège « 2 sur 5 » · 06 défi (moins de 3 étoiles) · 06b correction ·
# 07 ce que tu as appris · 08 fin (« Entraîne-toi sur eleveai.fr »).
#
# Voix : manim/voix/premiere-commun-proba-somme-issues.json (débit −7).
# Rendu (depuis la racine du dépôt) :
# python -m manim render -qh --disable_caching manim/scripts/premiere/proba_auto_somme_issues.py ProbaSommeIssuesPremiere -o eleveai-maths-premiere-commun-proba-somme-issues --media_dir manim/scripts/premiere/media-somme_issues
# Puis copier le mp4 dans manim/sorties/premiere-commun/maths/probabilites/25-somme-issues/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Couleurs du canvas du coach (TableauDonneesCanvas.tsx, Tailwind).
ARDOISE = "#1E293B"      # slate-800 : en-tête, titre
BORD_CASE = "#CBD5E1"    # slate-300
BORD_CARTE = "#E2E8F0"   # slate-200
CIEL = "#E0F2FE"         # sky-100 : la colonne des étiquettes
ENCRE = "#0F172A"        # slate-900
JAUNE_CASE = "#FEF08A"   # yellow-200 : case mise en avant
JAUNE_ANNEAU = "#EAB308"  # yellow-500
ETOILE = "#FACC15"
ETOILE_BORD = "#F59E0B"
BATON = "#93C5FD"

VALEURS = ["0,05", "0,1", "0,15", "0,3", "0,4"]   # 1 ★ … 5 ★
PROBAS = [0.05, 0.1, 0.15, 0.3, 0.4]


def P(x, y):
    return np.array([x, y, 0.0])


def etoile(r=0.14, plein=True):
    return Star(n=5, outer_radius=r, inner_radius=r * 0.45,
                fill_color=ETOILE if plein else ARDOISE, fill_opacity=1,
                stroke_color=ETOILE_BORD if plein else "#94A3B8", stroke_width=1.5)


def etoiles(k, r=0.14, buff=0.03, par_ligne=5):
    """k étoiles, en lignes de `par_ligne` au plus."""
    g = VGroup(*[etoile(r) for _ in range(k)])
    if k <= par_ligne:
        return g.arrange(RIGHT, buff=buff)
    haut = VGroup(*g[:par_ligne]).arrange(RIGHT, buff=buff)
    bas = VGroup(*g[par_ligne:]).arrange(RIGHT, buff=buff)
    VGroup(haut, bas).arrange(DOWN, buff=buff)
    return g


# ── les dessins ─────────────────────────────────────────────────────────────

def panier_bio(s=1.0):
    """Un panier d'osier rempli de légumes : carotte, salade, tomates."""
    salade = VGroup(*[Circle(radius=r, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                      for x, y, r, c in [(-0.35, 0.42, 0.3, "#22C55E"), (-0.1, 0.55, 0.3, "#4ADE80"),
                                         (-0.5, 0.3, 0.22, "#16A34A")]])
    tomates = VGroup(*[Circle(radius=0.17, fill_color="#EF4444", fill_opacity=1, stroke_color="#B91C1C",
                              stroke_width=1.5).move_to(P(x, y)) for x, y in [(0.3, 0.38), (0.55, 0.3)]])
    carotte = Polygon(P(0.05, 0.3), P(0.25, 0.3), P(0.6, 1.0), fill_color="#F97316", fill_opacity=1,
                      stroke_color="#C2410C", stroke_width=1.5)
    fanes = VGroup(*[Line(P(0.6, 1.0), P(0.6 + dx, 1.25), color="#16A34A", stroke_width=4)
                     for dx in (-0.12, 0.0, 0.12)])
    corps = Polygon(P(-0.85, 0.3), P(0.85, 0.3), P(0.62, -0.5), P(-0.62, -0.5),
                    fill_color="#B45309", fill_opacity=1, stroke_color="#78350F", stroke_width=2.5)
    tresse = VGroup(*[Line(P(-0.8 + 0.05 * k, 0.3 - 0.27 * k), P(0.8 - 0.05 * k, 0.3 - 0.27 * k),
                           color="#78350F", stroke_width=2) for k in range(1, 3)])
    anse = Arc(radius=0.85, start_angle=0, angle=PI, color="#92400E", stroke_width=7).move_to(P(0, 0.72))
    return VGroup(anse, carotte, fanes, salade, tomates, corps, tresse).scale(s)


def telephone(s=1.0):
    """Un téléphone : l'appli demande une note, cinq étoiles vides.
    Renvoie (téléphone, étoiles vides)."""
    boitier = RoundedRectangle(width=0.95, height=1.7, corner_radius=0.14, fill_color="#111827",
                               fill_opacity=1, stroke_color="#94A3B8", stroke_width=2.5)
    ecran = RoundedRectangle(width=0.8, height=1.4, corner_radius=0.08, fill_color="#F0FDF4",
                             fill_opacity=1, stroke_width=0).shift(DOWN * 0.04)
    feuille = Ellipse(width=0.32, height=0.18, fill_color="#22C55E", fill_opacity=1,
                      stroke_width=0).rotate(PI / 5).move_to(P(0, 0.38))
    trait = VGroup(*[Line(P(-0.25, 0.1 - 0.12 * k), P(0.25 - 0.12 * k, 0.1 - 0.12 * k), color="#94A3B8",
                          stroke_width=3) for k in range(2)])
    vides = VGroup(*[Star(n=5, outer_radius=0.07, inner_radius=0.032, fill_color=WHITE, fill_opacity=1,
                          stroke_color="#94A3B8", stroke_width=1.5) for _ in range(5)]).arrange(RIGHT, buff=0.02)
    vides.move_to(P(0, -0.38))
    tel = VGroup(boitier, ecran, feuille, trait, vides).scale(s)
    return tel, vides


def remplir(vides, k):
    """Les k premières étoiles de l'appli se remplissent (animations)."""
    return [v.animate.set_fill(ETOILE).set_stroke(ETOILE_BORD) for v in vides[:k]] + \
           [v.animate.set_fill(WHITE).set_stroke("#94A3B8") for v in vides[k:]]


# ── le tableau de loi du coach (TableauDonneesCanvas.tsx) ──────────────────

class TableauLoi:
    """Carte blanche, titre, en-tête « Issue | ★ … ★★★★★ » en ardoise,
    ligne « Probabilité » : étiquette bleu ciel, cases blanches.

    Colonne i (0 → 4) = (i + 1) étoiles. Les nombres se posent à part
    (`valeur`), au moment où la voix les dit.
    """

    def __init__(self, centre=P(-0.6, -0.35), larg_lab=2.3, larg_col=1.7, h=0.85,
                 titre="Note donnée à l'appli", fs_lab=28, fs_val=34, fs_titre=28,
                 r_etoile=0.14, par_ligne=5, h_titre=0.55, marge=0.2, sw_anneau=7):
        self.fs_val = fs_val
        n = 5
        largeur = larg_lab + n * larg_col
        h_titre = h_titre if titre else 0.0
        haut = 2 * h + h_titre + 2 * marge
        self.carte = RoundedRectangle(width=largeur + 2 * marge, height=haut, corner_radius=0.22,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD_CARTE,
                                      stroke_width=2).move_to(centre)
        x0 = centre[0] - largeur / 2
        y_tete = centre[1] + haut / 2 - marge - h_titre - h / 2
        y_val = y_tete - h
        self.titre = VGroup()
        if titre:
            self.titre = Text(titre, font_size=fs_titre, color=ARDOISE, weight=BOLD)
            self.titre.move_to(P(centre[0], centre[1] + haut / 2 - marge - h_titre / 2 + 0.02))
            if self.titre.width > largeur:
                self.titre.scale_to_fit_width(largeur)

        def case(x, y, w, fond):
            return Rectangle(width=w, height=h, fill_color=fond, fill_opacity=1, stroke_color=BORD_CASE,
                             stroke_width=2).move_to(P(x, y))

        def mot(texte, cellule, couleur, fs):
            t = Text(texte, font_size=fs, color=couleur, weight=BOLD)
            if t.width > cellule.width - 0.14:
                t.scale_to_fit_width(cellule.width - 0.14)
            return t.move_to(cellule)

        self.lab_tete = case(x0 + larg_lab / 2, y_tete, larg_lab, ARDOISE)
        self.lab_val = case(x0 + larg_lab / 2, y_val, larg_lab, CIEL)
        self.mot_issue = mot("Issue", self.lab_tete, WHITE, fs_lab)
        self.mot_proba = mot("Probabilité", self.lab_val, ENCRE, fs_lab)
        xs = [x0 + larg_lab + larg_col * (k + 0.5) for k in range(n)]
        self.xs = xs
        self.tetes = VGroup(*[case(x, y_tete, larg_col, ARDOISE) for x in xs])
        self.cases = VGroup(*[case(x, y_val, larg_col, WHITE) for x in xs])
        self.etoiles = VGroup()
        for k, c in enumerate(self.tetes):
            e = etoiles(k + 1, r_etoile, par_ligne=par_ligne)
            if e.width > c.width - 0.1:
                e.scale_to_fit_width(c.width - 0.1)
            self.etoiles.add(e.move_to(c))
        self.anneaux = VGroup(*[
            Rectangle(width=larg_col, height=2 * h, stroke_color=JAUNE_ANNEAU, stroke_width=sw_anneau,
                      fill_opacity=0).move_to(P(x, (y_tete + y_val) / 2)) for x in xs])

    # les morceaux
    def cadre(self):
        return VGroup(self.carte, self.titre)

    def entete(self):
        return VGroup(self.lab_tete, self.tetes, self.mot_issue, self.etoiles)

    def ligne_proba(self):
        return VGroup(self.lab_val, self.cases, self.mot_proba)

    def tout(self):
        return VGroup(self.cadre(), self.entete(), self.ligne_proba())

    def valeur(self, i, texte=None, color=ENCRE):
        t = Text(texte or VALEURS[i], font_size=self.fs_val, color=color, weight=BOLD)
        if t.width > self.cases[i].width - 0.14:
            t.scale_to_fit_width(self.cases[i].width - 0.14)
        return t.move_to(self.cases[i])

    def valeurs(self):
        return VGroup(*[self.valeur(i) for i in range(5)])

    # les cases de l'événement s'allument
    def allumer(self, idx):
        anims = []
        for i in idx:
            anims += [self.cases[i].animate.set_fill(JAUNE_CASE), Create(self.anneaux[i])]
        return anims

    def eteindre(self, idx):
        anims = []
        for i in idx:
            anims += [self.cases[i].animate.set_fill(WHITE), FadeOut(self.anneaux[i])]
        return anims

    def allume(self, idx):
        """Sans animation (écran qui reprend un tableau déjà allumé)."""
        for i in idx:
            self.cases[i].set_fill(JAUNE_CASE)
        return VGroup(*[self.anneaux[i] for i in idx])


class ProbaSommeIssuesPremiere(Notion6e):
    identite = "Maths 1re — EleveAI"
    nom_voix = "premiere-commun-proba-somme-issues"

    TAB_Y = -0.35
    SOMME_Y = -2.6

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
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

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=sw, color=color)

    def tableau(self, y=None, **kw):
        return TableauLoi(centre=P(-0.6, self.TAB_Y if y is None else y), **kw)

    def glisser(self, tab, i, cible, run_time=0.6):
        """La valeur de la case i (copie) glisse vers `cible` dans la somme."""
        copie = tab.valeur(i)
        self.add(copie)
        self.play(ReplacementTransform(copie, cible), run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La somme des issues", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.85))
        tab = self.tableau(y=-0.05, titre=None)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech),
                  FadeIn(tab.tout()), run_time=1.0)
        self.au_mot("la somme")
        self.play(*tab.allumer([3, 4]), run_time=0.5)
        plus = Text("+", font_size=60, color=VERT_OK, weight=BOLD).move_to(
            (tab.cases[3].get_center() + tab.cases[4].get_center()) / 2)
        fond = Circle(radius=0.3, fill_color=ARDOISE, fill_opacity=1, stroke_color=VERT_OK,
                      stroke_width=3).move_to(plus)
        self.play(FadeIn(fond, scale=0.5), FadeIn(plus, scale=0.5), run_time=0.4)
        self.insister(VGroup(fond, plus), 0.35)
        self.attendre_voix(marge=1.2)

    # ── 01 : l'appli des paniers bio ────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Des paniers bio")
        pan = panier_bio(0.85).move_to(P(-3.3, 2.0))
        tel, vides = telephone(0.95)
        tel.move_to(P(1.9, 1.95))
        self.au_mot("paniers bio")
        self.play(FadeIn(pan, shift=UP * 0.2), run_time=0.5)
        self.au_mot("demande une note")
        self.play(FadeIn(tel, shift=LEFT * 0.3), run_time=0.5)
        self.play(LaggedStart(*remplir(vides, 5), lag_ratio=0.15), run_time=0.6)
        tab = self.tableau()
        self.au_mot("de 1 à 5 étoiles")
        self.play(FadeIn(tab.cadre()), FadeIn(tab.entete()), run_time=0.5)
        self.play(LaggedStart(*[Indicate(e, color=ETOILE, scale_factor=1.3) for e in tab.etoiles],
                              lag_ratio=0.12), run_time=0.9)
        self.au_mot("Sa loi")
        self.play(FadeIn(tab.ligne_proba(), shift=DOWN * 0.15), run_time=0.5)
        # 5 ★, 4 ★, 3 ★, 2 ★, 1 ★ : de droite à gauche, comme la voix
        for i, mot in [(4, "5 étoiles, 0,4"), (3, "4 étoiles, 0,3"), (2, "3 étoiles, 0,15"),
                       (1, "2 étoiles, 0,1"), (0, "1 étoile, 0,05")]:
            self.au_mot(mot)
            v = tab.valeur(i)
            self.play(*remplir(vides, i + 1), tab.cases[i].animate.set_fill(JAUNE_CASE), run_time=0.3)
            self.play(FadeIn(v, scale=0.5), tab.cases[i].animate.set_fill(WHITE), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la règle ───────────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regle")
        tab = self.tableau()
        self.add(tab.tout(), tab.valeurs())
        self.titre_ecran("La règle")
        l1 = self.ligne([("Un événement", BLEU_CALCUL), ("=", WHITE), ("plusieurs issues", JAUNE_CASE)],
                        38, 0.22).move_to(P(-0.6, 2.05))
        self.au_mot("Un événement")
        self.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.5)
        self.au_mot("plusieurs issues")
        self.play(FadeIn(l1[1:], shift=UP * 0.15), *tab.allumer([2, 3, 4]), run_time=0.6)
        self.au_mot("la somme")
        plus = VGroup()
        y_plus = tab.carte.get_bottom()[1] - 0.3
        for a, b in [(2, 3), (3, 4)]:
            c = P((tab.xs[a] + tab.xs[b]) / 2, y_plus)
            plus.add(VGroup(Circle(radius=0.22, fill_color=ARDOISE, fill_opacity=1, stroke_color=VERT_OK,
                                   stroke_width=3), Text("+", font_size=48, color=VERT_OK, weight=BOLD)).move_to(c))
        self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in plus], lag_ratio=0.3), run_time=0.6)
        regle = VGroup(self.ligne([("P(événement)", BLEU_CALCUL), ("=", WHITE), ("la somme", VERT_OK)], 36, 0.2),
                       self.t("des probabilités de ses issues", 36, VERT_OK)).arrange(DOWN, buff=0.16)
        regle.move_to(P(-0.9, -3.1))
        cadre = SurroundingRectangle(regle, color=VERT_OK, buff=0.18, stroke_width=3)
        self.play(Write(regle), run_time=1.0)
        self.play(Create(cadre), run_time=0.4)
        self.insister(plus, 0.35)
        self.attendre_voix()

    # ── 03 : « au moins 4 étoiles » ─────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        tab = self.tableau()
        self.add(tab.tout(), tab.valeurs())
        self.titre_ecran("Au moins 4 étoiles")
        ev = self.ligne([("A :", BLEU_CALCUL), ("« au moins 4 étoiles »", WHITE)], 40, 0.22).move_to(P(-0.6, 2.05))
        self.play(FadeIn(ev, shift=UP * 0.15), run_time=0.6)
        self.au_mot("A est réalisé par")
        self.au_mot("4 et 5 étoiles")
        self.play(*tab.allumer([3, 4]), run_time=0.5)
        self.play(*[Indicate(tab.etoiles[i], color=ETOILE, scale_factor=1.3) for i in (3, 4)], run_time=0.6)
        somme = self.ligne([("P(A)", BLEU_CALCUL), ("=", WHITE), ("0,3", WHITE), ("+", WHITE), ("0,4", WHITE),
                            ("=", WHITE), ("0,7", VERT_OK)], 48, 0.25).move_to(P(-0.9, self.SOMME_Y))
        self.au_mot("P de A égale")
        self.play(FadeIn(VGroup(somme[0], somme[1]), shift=UP * 0.15), run_time=0.5)
        self.au_mot("0,3 plus")
        self.glisser(tab, 3, somme[2])
        self.au_mot("plus 0,4")
        self.play(FadeIn(somme[3]), run_time=0.2)
        self.glisser(tab, 4, somme[4])
        self.au_mot("soit 0,7")
        self.play(FadeIn(VGroup(somme[5], somme[6]), shift=UP * 0.15), run_time=0.5)
        self.play(Create(SurroundingRectangle(somme[6], color=VERT_OK, buff=0.12, stroke_width=3)), run_time=0.3)
        self.insister(somme[6], 0.4)
        self.attendre_voix()

    # ── 04 : la loi fait 1 ──────────────────────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-verifier")
        tab = self.tableau()
        self.add(tab.tout(), tab.valeurs())
        self.titre_ecran("On vérifie la loi")
        somme = self.ligne([("0,4", WHITE), ("+", WHITE), ("0,3", WHITE), ("+", WHITE), ("0,15", WHITE),
                            ("+", WHITE), ("0,1", WHITE), ("+", WHITE), ("0,05", WHITE), ("=", WHITE),
                            ("1", VERT_OK)], 46, 0.22).move_to(P(-0.9, self.SOMME_Y))
        self.au_mot("On vérifie")
        self.play(*tab.allumer([0, 1, 2, 3, 4]), run_time=0.6)
        for k, (i, mot) in enumerate([(4, "0,4 plus"), (3, "0,3 plus"), (2, "0,15 plus"), (1, "0,1 plus"),
                                      (0, "0,05,")]):
            self.au_mot(mot)
            if k:
                self.play(FadeIn(somme[2 * k - 1]), run_time=0.15)
            self.glisser(tab, i, somme[2 * k], run_time=0.5)
        self.au_mot("égale 1")
        self.play(FadeIn(VGroup(somme[9], somme[10]), shift=UP * 0.15), run_time=0.4)
        self.play(Create(SurroundingRectangle(somme[10], color=VERT_OK, buff=0.12, stroke_width=3)), run_time=0.3)
        self.insister(somme[10], 0.4)
        self.attendre_voix()

    # ── 05 : le piège « 2 issues sur 5 » ────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        tab = self.tableau(y=1.1)
        anneaux = tab.allume([3, 4])
        self.add(tab.tout(), tab.valeurs(), anneaux)
        self.titre_ecran("Le piège")
        faux = self.ligne([("2 issues sur 5,", ORANGE_RETENUE), ("donc", WHITE), ("0,4", ORANGE_RETENUE)],
                          42, 0.22).move_to(P(-1.1, -0.85))
        self.au_mot("2 issues sur 5")
        self.play(FadeIn(faux[0], shift=UP * 0.15),
                  *[Indicate(tab.etoiles[i], color=ORANGE_RETENUE, scale_factor=1.3) for i in (3, 4)], run_time=0.6)
        self.au_mot("donc 0,4")
        self.play(FadeIn(faux[1:], shift=UP * 0.15), run_time=0.4)
        self.au_mot("Faux")
        trait = self.barrer(faux)
        tampon = self.t("Faux !", 44, ROUGE_ERREUR).next_to(faux, RIGHT, buff=0.4)
        self.play(Create(trait), FadeIn(tampon, scale=1.6), run_time=0.5)
        self.au_mot("n'ont pas la même probabilité")
        # des bâtons sous chaque colonne, hauteur ∝ probabilité, sans nombre
        base = -3.2
        batons = VGroup(*[Rectangle(width=1.1, height=p * 3.4, fill_color=BATON, fill_opacity=1,
                                    stroke_color=WHITE, stroke_width=2).move_to(P(x, base + p * 1.7))
                          for x, p in zip(tab.xs, PROBAS)])
        sol = Line(P(tab.xs[0] - 0.75, base), P(tab.xs[-1] + 0.75, base), color=GREY_B, stroke_width=3)
        self.play(Create(sol), LaggedStart(*[GrowFromEdge(b, DOWN) for b in batons], lag_ratio=0.15), run_time=1.0)
        self.play(*[batons[i].animate.set_fill(JAUNE_CASE) for i in (3, 4)], run_time=0.4)
        self.au_mot("On additionne")
        bon = self.ligne([("On additionne,", VERT_OK), ("on ne compte pas", ROUGE_ERREUR)], 40, 0.25)
        bon.move_to(P(-1.0, faux.get_center()[1]))
        self.play(FadeOut(VGroup(faux, trait, tampon), shift=UP * 0.2), FadeIn(bon[0], shift=UP * 0.15),
                  run_time=0.5)
        self.au_mot("on ne compte pas")
        self.play(FadeIn(bon[1], shift=UP * 0.15), run_time=0.4)
        self.insister(bon[0], 0.35)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tab = self.tableau(y=0.05)
        self.play(FadeIn(tab.tout()), FadeIn(tab.valeurs()), run_time=0.6)
        q = self.ligne([("P(« moins de 3 étoiles »)", BLEU_CALCUL), ("=", WHITE), ("?", ROUGE_ERREUR)], 40, 0.22)
        q.move_to(P(-0.6, 2.25))
        self.au_mot("moins de 3 étoiles")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.6)
        self.insister(q[2], 0.35)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        tab = self.tableau()
        self.add(tab.tout(), tab.valeurs())
        self.titre_ecran("Correction")
        ev = self.ligne([("moins de 3 étoiles :", BLEU_CALCUL), ("1 ou 2 étoiles", JAUNE_CASE)], 40, 0.25)
        ev.move_to(P(-0.6, 2.05))
        self.play(FadeIn(ev[0], shift=UP * 0.15), run_time=0.5)
        self.au_mot("1 ou 2 étoiles")
        self.play(FadeIn(ev[1], shift=UP * 0.15), *tab.allumer([0, 1]), run_time=0.6)
        somme = self.ligne([("0,05", WHITE), ("+", WHITE), ("0,1", WHITE), ("=", WHITE), ("0,15", VERT_OK)],
                           48, 0.25).move_to(P(-0.9, self.SOMME_Y))
        self.au_mot("0,05 plus")
        self.glisser(tab, 0, somme[0])
        self.au_mot("plus 0,1")
        self.play(FadeIn(somme[1]), run_time=0.2)
        self.glisser(tab, 1, somme[2])
        self.au_mot("soit 0,15")
        self.play(FadeIn(VGroup(somme[3], somme[4]), shift=UP * 0.15), run_time=0.4)
        self.play(Create(SurroundingRectangle(somme[4], color=VERT_OK, buff=0.12, stroke_width=3)), run_time=0.3)
        self.insister(somme[4], 0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 40
        l1 = VGroup(self.ligne([("P(événement)", BLEU_CALCUL), ("=", WHITE), ("la somme des probabilités", WHITE)],
                               fs, 0.18),
                    self.t("de ses issues", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        l2 = self.ligne([("On vérifie que la loi fait", WHITE), ("1", VERT_OK)], fs, 0.18)
        l3 = VGroup(self.t("On ne compte les issues", fs, ORANGE_RETENUE),
                    self.t("que si elles sont équiprobables", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.7, -0.1))
        for mot, l in zip(["P d'un événement", "On vérifie", "On ne compte"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
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
        self.ecran_regle()
        self.ecran_calcul()
        self.ecran_verifier()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
