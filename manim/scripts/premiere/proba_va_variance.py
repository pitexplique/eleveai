# proba_va_variance.py
# EleveAI — Maths 1re spécialité (micro va_variance, notion variables_aleatoires)
# — série « Probabilités » : CALCULER UNE VARIANCE, AVEC VOIX.
# Paysage 16:9, ceinture MARRON. Short jumeau : proba_va_variance_short.py (orange).
#
# ⭐ La MÊME loi que l'épisode « espérance » (stmg/proba_va_esperance.py) : la
# roue de la kermesse, X = 0 € (0,6), 2 € (0,3), 10 € (0,1), E(X) = 1,6.
# Nombres calculés en Python (fractions exactes) :
#   écarts −1,6 ; 0,4 ; 8,4 · carrés 2,56 ; 0,16 ; 70,56 ·
#   produits 1,536 ; 0,048 ; 7,056 · V(X) = 8,64.
#   Piège 1 (sans carré) : −0,96 + 0,12 + 0,84 = 0. Piège 2 (sans P) : 73,28.
#   Défi : 0 € / 4 € à 0,5 ; E = 2 ; écarts −2, 2 ; carrés 4, 4 ; V = 4.
#
# ⭐ Les figures du coach (banque premiere-spe/maths/variables-aleatoires) :
#   · le TABLEAU DE LOI (en-tête sombre « xᵢ | 0 | 2 | 10 », libellés bleu
#     clair, cases blanches, colonne allumée en jaune), repris de l'épisode
#     espérance, avec trois lignes de plus qui se remplissent colonne par
#     colonne : « xᵢ − E », « (xᵢ − E)² », « P × (xᵢ − E)² » ;
#   · le `stat_graph` « bâtons » (« Loi de probabilité de X » : carte blanche,
#     axe, un bâton gris par valeur, pastille au sommet) — ici sur un axe
#     GRADUÉ À L'ÉCHELLE pour voir les écarts à l'espérance ;
#   · la roue de la kermesse (style de la roue du coach).
# ⛔ PAS D'ÉCART : un nombre ne s'écrit que quand la voix le dit (les lignes
#   de calcul sous le tableau ne recopient que des cases déjà écrites).
#
# Écrans : 00 garde · 01 la roue et sa loi · 02 l'idée (les écarts) · 03 la
# recette · 04 le tableau · 05 les deux pièges · 06 défi · 06b correction ·
# 07 ce que tu as appris · 08 fin.
#
# Voix : manim/voix/premiere-proba-va-variance.json (Julie, débit −6), calée
# mot à mot par proba_va_variance_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/premiere/proba_va_variance.py ProbaVaVariancePremiereSpe -o eleveai-maths-premiere-proba-va-variance --media_dir manim/scripts/premiere/media-va_variance-1s
# Sortie : manim/sorties/premiere/maths/probabilites/40-va-variance/

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import ANNEAU, BORD, ENCRE, SURLIGNE, suite  # noqa: E402
from proba_va_esperance import (  # noqa: E402
    COUL_0, COUL_2, COUL_4, COUL_10, COMMUN, RoueKermesse, TableauLoi, avec_indice, lab_p, lab_xi,
)

BATON = "#64748B"       # le bâton du stat_graph (gris ardoise)
MOINS = "−"             # U+2212


def P(x, y):
    return np.array([x, y, 0.0])


class MotsCales:
    """au_mot() calé sur l'instant RÉEL de chaque mot (moteur WinRT, Julie,
    débit −6, hauteur +6, IncludeWordBoundaryMetadata), relu dans
    <script>_marques.json : {clé: [[position dans la phrase, instant], …]}.
    Le dry run imprime « RETARD » quand l'image arrive plus de 0,3 s trop tard."""

    fichier_marques = None

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = Path(__file__).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8")) if ch.exists() else {}
        return self._cache_marques

    def dire(self, nom, dossier=None):
        self._cle_voix = nom
        return super().dire(nom, dossier)

    def au_mot(self, extrait):
        marques = self._marques().get(getattr(self, "_cle_voix", None))
        if not marques or not self._duree_voix:
            return super().au_mot(extrait)
        i = self._texte_voix.find(extrait)
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la voix : {self._texte_voix[:60]}…")
        t = max([m[1] for m in marques if m[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} « {extrait} » : {-reste:.2f} s", flush=True)
        if reste > 0.05:
            self.wait(reste)


def lab_ecart(fs=26):
    """« xᵢ − E »."""
    return avec_indice(f"x {MOINS} E", 0, fs)


def lab_carre(fs=26):
    """« (xᵢ − E)² »."""
    return avec_indice(f"(x {MOINS} E)²", 1, fs)


def lab_prod_carre(fs=26):
    """« P × (xᵢ − E)² »."""
    return avec_indice(f"P × (x {MOINS} E)²", 3, fs)


class BatonsReels(VGroup):
    """Le stat_graph « bâtons » du coach (carte blanche, titre, axe, un bâton
    gris à pastille par valeur), mais sur un axe À L'ÉCHELLE : l'abscisse d'un
    bâton est sa valeur, sa hauteur sa probabilité. Les étiquettes des
    valeurs sont prêtes (self.etiq) mais posées seulement quand on les dit."""

    def __init__(self, valeurs, probas, xmin, xmax, centre=P(1.9, 0.9), larg=7.0, haut=3.4,
                 titre="Loi de probabilité de X", couleur=BATON, pmax=None, fs=26, hmax=None, **kw):
        super().__init__(**kw)
        self.xmin, self.xmax = xmin, xmax
        self.carte = RoundedRectangle(width=larg, height=haut, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=BORD, stroke_width=2).move_to(centre)
        self.add(self.carte)
        self.titre = None
        if titre:
            self.titre = Text(titre, font_size=22, color=ENCRE, weight=BOLD)
            self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
            self.add(self.titre)
        self.gx = self.carte.get_left()[0] + 0.45
        self.dx = larg - 0.9
        self.y0 = self.carte.get_bottom()[1] + 0.6
        self.axe = Line(P(self.gx - 0.15, self.y0), P(self.gx + self.dx + 0.15, self.y0), color=ENCRE,
                        stroke_width=2.5)
        self.add(self.axe)
        hmax = hmax or haut - (1.35 if titre else 0.95)
        pmax = pmax or max(probas)
        self.batons, self.etiq = VGroup(), VGroup()
        for v, p in zip(valeurs, probas):
            x = self.x(v)
            h = p / pmax * hmax
            tr = Line(P(x, self.y0), P(x, self.y0 + h), color=couleur, stroke_width=9)
            pt = Dot(P(x, self.y0 + h), radius=0.085, color=couleur).set_stroke(ENCRE, 1.5)
            self.batons.add(VGroup(tr, pt))
            e = Text(MOINS + str(-v) if v < 0 else str(v), font_size=fs, color=ENCRE, weight=BOLD)
            self.etiq.add(e.move_to(P(x, self.y0 - 0.3)))
        self.add(self.batons)

    def x(self, v):
        return self.gx + (v - self.xmin) / (self.xmax - self.xmin) * self.dx

    def pied(self, v):
        return P(self.x(v), self.y0)

    def ligne_e(self, e, couleur=ORANGE_RETENUE):
        """La verticale pointillée de l'espérance."""
        haut = self.carte.get_top()[1] - (0.5 if self.titre else 0.2)
        return DashedLine(P(self.x(e), self.y0), P(self.x(e), haut), color=couleur, stroke_width=4,
                          dash_length=0.12)

    def fleche(self, e, v, y, couleur=ROUGE_ERREUR, texte=None, fs=24):
        """Une flèche horizontale de l'espérance e vers la valeur v, à la hauteur y
        (au-dessus de l'axe) ; texte optionnel posé au-dessus."""
        a = Arrow(P(self.x(e), self.y0 + y), P(self.x(v), self.y0 + y), buff=0, color=couleur,
                  stroke_width=5, max_tip_length_to_length_ratio=0.35, tip_length=0.18)
        if texte is None:
            return a
        t = Text(texte, font_size=fs, color=couleur, weight=BOLD).next_to(a, UP, buff=0.06)
        return VGroup(a, t)


X0 = -1.6   # le bord gauche de la colonne de droite (la roue occupe la gauche)
ROUE = [("0 €", 0.6, COUL_0), ("2 €", 0.3, COUL_2), ("10 €", 0.1, COUL_10)]
LOI5 = [["0", "2", "10"], ["0,6", "0,3", "0,1"], [MOINS + "1,6", "0,4", "8,4"], ["2,56", "0,16", "70,56"],
        ["1,536", "0,048", "7,056"]]
DEFI = [["0", "4"], ["0,5", "0,5"], [MOINS + "2", "2"], ["4", "4"]]
H5 = 0.62   # hauteur d'une ligne quand le tableau en a cinq


class ProbaVaVarianceBase(MotsCales, Notion6e):
    nom_voix = "premiere-proba-va-variance"
    fichier_marques = "proba_va_variance_marques.json"
    identite = "Maths 1re spé — EleveAI"

    def t(self, texte, font_size=36, color=WHITE, weight=NORMAL):
        return Text(texte, font_size=font_size, color=color, weight=weight)

    def insister(self, mob, run_time=0.25, bord=None):
        """Agrandir puis rétrécir (×1,5 puis ÷1,5), jamais de zoom de caméra."""
        self.play(mob.animate.scale(1.5, about_edge=bord), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5, about_edge=bord), run_time=run_time)

    def titre_vite(self, texte, *anims, run_time=0.6):
        """Le titre d'écran, écrit EN MÊME TEMPS que la figure (titre_ecran prend 1 s seul)."""
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t), *anims, run_time=run_time)
        return t

    def calcul(self, morceaux, fs=44, buff=0.16):
        return suite(*[self.t(x, fs, c) for x, c in morceaux], buff=buff)

    def gauche(self, mob, y, x=X0):
        return mob.move_to(P(x, y), aligned_edge=LEFT)

    def tableau(self, nl=2, valeurs=LOI5, coin=P(X0, 2.55), h=None):
        """Le tableau de loi du coach, nl lignes parmi xᵢ, P, écart, carré, produit."""
        labs = [lab_xi(), lab_p(), lab_ecart(), lab_carre(), lab_prod_carre()][:nl]
        if nl <= 3:
            return TableauLoi(labs, valeurs[:nl], coin=coin, h=h or 0.72)
        # « 1,536 », « 70,56 » : une case plus large, un chiffre un peu plus petit
        return TableauLoi(labs, valeurs[:nl], coin=coin, h=h or H5, larg=1.6, fs=26)

    def rangs_caches(self, tab, rangs):
        """Retire du tableau les lignes `rangs` (fond + libellé) ; renvoie
        leurs groupes pour les faire entrer plus tard."""
        groupes = []
        for r in rangs:
            g = VGroup(tab.rect[r][0], *[tab.case(r, j) for j in range(len(tab.val[r]))])
            groupes.append((g, tab.labs[r]))
        for g, lab in groupes:
            tab.fonds.remove(*g)
            tab.labs.remove(lab)
        return [VGroup(g, lab) for g, lab in groupes]

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer une variance", 52, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("marron").move_to(P(-0.6, -2.85))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        r = RoueKermesse(ROUE, centre=P(-0.6, -0.15), r=1.05, fs=24, carte=False)
        self.play(FadeIn(r, scale=0.6), run_time=0.4)
        r.tourner(self, tours=1.0, run_time=1.0)
        self.attendre_voix(marge=0.8)

    # ── 01 : la roue de la kermesse et sa loi ───────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        r = RoueKermesse(ROUE)
        self.titre_vite("La roue de la kermesse", FadeIn(r, scale=0.8))
        self.au_mot("organisatrice")
        metier = self.t("Organisatrice de kermesse", 28, BLEU_CALCUL)
        metier.scale_to_fit_width(min(metier.width, 4.1)).move_to(P(-4.55, -2.8))
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)
        self.au_mot("X, le gain")
        tab = self.tableau()
        gain = self.gauche(suite(self.t("X", 40, JAUNE_TITRE, BOLD), self.t(": le gain", 36), buff=0.18), -0.6)
        self.play(FadeIn(gain, shift=UP * 0.1), FadeIn(tab, shift=DOWN * 0.1), run_time=0.6)
        for k, (m_val, m_p) in enumerate([("0 euro", "0,6"), ("2 euros", "0,3"), ("10 euros", "0,1")]):
            self.au_mot(m_val)
            self.play(tab.poser(0, k), FadeIn(r.etiq[k], scale=1.6),
                      Indicate(r.parts[k], color=COMMUN, scale_factor=1.05), run_time=0.45)
            self.au_mot(m_p)
            self.play(tab.poser(1, k), run_time=0.35)
        self.au_mot("Espérance")
        ex = self.gauche(self.calcul([("E(X)", JAUNE_TITRE), ("=", WHITE)], 52), -1.7)
        self.play(FadeIn(ex, shift=UP * 0.1), run_time=0.4)
        self.au_mot("1,6 euro")
        e = self.t("1,6 €", 52, JAUNE_TITRE, BOLD).next_to(ex, RIGHT, buff=0.2)
        cadre = SurroundingRectangle(VGroup(ex, e), color=JAUNE_TITRE, buff=0.2, stroke_width=4,
                                     corner_radius=0.1)
        self.play(FadeIn(e, scale=1.6), Create(cadre), run_time=0.5)
        r.tourner(self, tours=1.0, run_time=1.0)
        self.attendre_voix()

    # ── 02 : l'idée : les gains s'écartent de 1,6 ───────────────────────────

    def batons(self):
        return BatonsReels([0, 2, 10], [0.6, 0.3, 0.1], -0.6, 10.6, centre=P(1.95, 0.75))

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        r = RoueKermesse(ROUE).tout()
        b = self.batons()
        self.add(r)
        self.titre_vite("Les écarts", FadeIn(b.carte), FadeIn(b.titre), Create(b.axe), run_time=0.5)
        self.play(*[GrowFromEdge(bt, DOWN) for bt in b.batons], *[FadeIn(e) for e in b.etiq], run_time=0.4)
        self.au_mot("de 1,6")
        le = b.ligne_e(1.6)
        lab = suite(self.t("E =", 24, ORANGE_RETENUE, BOLD), self.t("1,6", 26, ORANGE_RETENUE, BOLD), buff=0.1)
        lab.next_to(le, RIGHT, buff=0.08).align_to(le, UP)
        self.play(Create(le), FadeIn(lab, scale=1.5), run_time=0.5)
        self.au_mot("un peu")
        f0 = b.fleche(1.6, 0, 1.3, BLEU_CALCUL)
        f2 = b.fleche(1.6, 2, 0.55, BLEU_CALCUL)
        self.play(GrowArrow(f0), GrowArrow(f2), run_time=0.45)
        self.au_mot("beaucoup")
        f10 = b.fleche(1.6, 10, 0.55, ROUGE_ERREUR)
        self.play(GrowArrow(f10), run_time=0.6)
        self.au_mot("La variance")
        v = self.gauche(suite(self.t("V(X)", 44, JAUNE_TITRE, BOLD), self.t(": la dispersion", 36), buff=0.2), -1.75)
        self.play(FadeIn(v, shift=UP * 0.1), run_time=0.5)
        self.play(*[Indicate(f, color=COMMUN, scale_factor=1.1) for f in (f0, f2, f10)], run_time=0.7)
        self.attendre_voix()

    # ── 03 : la recette : écart, carré, probabilité, somme ──────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-formule")
        self.titre_ecran("La recette")
        r = RoueKermesse(ROUE).tout()
        tab = self.tableau(5).tout(lignes=[0, 1])
        rangs = self.rangs_caches(tab, [2, 3, 4])
        self.add(r, tab)
        for rang, mot in zip(rangs, ["l'écart", "Au carré", "Fois la probabilité"]):
            self.au_mot(mot)
            self.play(FadeIn(rang, shift=DOWN * 0.12), run_time=0.45)
            self.play(Indicate(rang[1], color=COMMUN, scale_factor=1.15), run_time=0.45)
        self.au_mot("Puis la somme")
        sig = self.t("Σ", 56, JAUNE_TITRE, BOLD)
        terme = lab_prod_carre(40).set_color(WHITE)
        f = suite(self.t("V(X) =", 48, JAUNE_TITRE, BOLD), sig, terme, buff=0.2)
        self.gauche(f, -1.45)
        self.play(FadeIn(VGroup(sig, terme), shift=UP * 0.1), Indicate(rangs[2], color=COMMUN), run_time=0.6)
        self.au_mot("c'est V de X")
        cadre = SurroundingRectangle(f, color=JAUNE_TITRE, buff=0.2, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(f[0], shift=RIGHT * 0.2), Create(cadre), run_time=0.5)
        self.insister(f[0], 0.25, LEFT)
        self.attendre_voix()

    # ── 04 : le tableau se remplit, ligne par ligne, colonne par colonne ────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-tableau")
        self.titre_ecran("Le calcul")
        r = RoueKermesse(ROUE).tout()
        tab = self.tableau(5).tout(lignes=[0, 1])
        self.add(r, tab)
        Y = -1.3
        # (rang, mots de la voix, morceaux de la ligne de calcul, rangs allumés)
        etapes = [
            (2, ["moins 1,6,", "0,4 et", "8,4."],
             lambda j: [(LOI5[0][j], WHITE), (MOINS, WHITE), ("1,6", ORANGE_RETENUE), ("=", WHITE),
                        (LOI5[2][j], JAUNE_TITRE)], [2]),
            (3, ["2,56,", "0,16", "70,56"],
             lambda j: [(f"({LOI5[2][j]})²" if j == 0 else f"{LOI5[2][j]}²", WHITE), ("=", WHITE),
                        (LOI5[3][j], JAUNE_TITRE)], [2, 3]),
            (4, ["1,536", "0,048", "7,056"],
             lambda j: [(LOI5[1][j], BLEU_CALCUL), ("×", WHITE), (LOI5[3][j], WHITE), ("=", WHITE),
                        (LOI5[4][j], JAUNE_TITRE)], [1, 3, 4]),
        ]
        ligne, allume = None, None
        for rang, mots, morceaux, rangs in etapes:
            for j, mot in enumerate(mots):
                self.au_mot(mot)
                l = self.gauche(self.calcul(morceaux(j), 44), Y)
                anims = [FadeOut(ligne, shift=UP * 0.15)] if ligne is not None else []
                if allume is not None:
                    anims += tab.eteindre(*allume)
                self.play(*anims, *tab.allumer(j, rangs), FadeIn(l, shift=UP * 0.12), tab.poser(rang, j),
                          run_time=0.35)
                ligne, allume = l, (j, rangs)
        self.au_mot("La somme")
        s = self.gauche(self.calcul([("1,536", WHITE), ("+", WHITE), ("0,048", WHITE), ("+", WHITE),
                                     ("7,056", WHITE), ("=", WHITE), ("8,64", JAUNE_TITRE)], 42), Y)
        self.play(FadeOut(ligne, shift=UP * 0.15), *tab.eteindre(*allume),
                  *[tab.case(4, j).animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5) for j in range(3)],
                  *[TransformFromCopy(tab.val[4][j], s[2 * j]) for j in range(3)], FadeIn(s[1]), FadeIn(s[3]),
                  run_time=0.6)
        self.au_mot("8,64.")
        self.play(FadeIn(s[5]), FadeIn(s[6], scale=1.8), run_time=0.4)
        self.au_mot("V de X")
        vx = self.gauche(self.calcul([("V(X)", JAUNE_TITRE), ("=", WHITE), ("8,64", JAUNE_TITRE)], 56), -2.3)
        cadre = SurroundingRectangle(vx, color=JAUNE_TITRE, buff=0.2, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(vx[:2], shift=UP * 0.1), TransformFromCopy(s[6], vx[2]), run_time=0.6)
        self.play(Create(cadre), run_time=0.3)
        self.insister(vx[2], 0.25)
        self.attendre_voix()

    # ── 05 : les deux pièges : sans le carré (0), sans les probabilités ─────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        XG = -6.4
        tab = self.tableau(4, coin=P(XG, 2.55), h=0.66).tout(lignes=[0, 1, 2, 3])
        (rang3,) = self.rangs_caches(tab, [3])
        for v in tab.val[3]:
            tab.remove(v)
        self.add(tab)
        XD = 1.75

        def bloc(haut, bas, couleur):
            g = VGroup(self.t(haut, 32, couleur, BOLD), self.t(bas, 32, WHITE))
            g.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
            return g.move_to(P(XD, 1.6), aligned_edge=LEFT)

        p1 = bloc("Piège 1 :", "oublier le carré", ORANGE_RETENUE)
        self.titre_vite("Les pièges", FadeIn(p1, shift=LEFT * 0.2), run_time=0.6)
        l1 = self.gauche(self.calcul([(MOINS + "0,96", WHITE), ("+", WHITE), ("0,12", WHITE), ("+", WHITE),
                                      ("0,84", WHITE), ("=", WHITE), ("0", ROUGE_ERREUR)], 46), -1.0, XG)
        allume = None
        for j, (mot, morceaux) in enumerate([("moins 0,96", [l1[0]]), ("plus 0,12", [l1[1], l1[2]]),
                                             ("plus 0,84", [l1[3], l1[4]])]):
            self.au_mot(mot)
            anims = tab.eteindre(j - 1, [1, 2]) if j > 0 else []
            self.play(*anims, *tab.allumer(j, [1, 2]), *[FadeIn(m, scale=1.4) for m in morceaux], run_time=0.35)
        self.au_mot(": 0 !")
        self.play(*tab.eteindre(2, [1, 2]), FadeIn(l1[5]), FadeIn(l1[6], scale=2.2), run_time=0.45)
        self.insister(l1[6], 0.25)
        self.au_mot("se compensent")
        comp = VGroup(self.t("Les écarts", 32, ROUGE_ERREUR), self.t("se compensent !", 32, ROUGE_ERREUR))
        comp.arrange(DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(XD, 0.1), aligned_edge=LEFT)
        self.play(FadeIn(comp, shift=UP * 0.1), Indicate(tab.val[2][0], color=ROUGE_ERREUR),
                  Indicate(tab.val[2][2], color=ROUGE_ERREUR), run_time=0.6)
        self.au_mot("Deuxième piège")
        p2 = bloc("Piège 2 :", "oublier les probabilités", ORANGE_RETENUE)
        rang_p = VGroup(tab.rect[1][0], tab.labs[1], *[tab.case(1, j) for j in range(3)], *tab.val[1])
        self.play(FadeOut(VGroup(p1, comp, l1), shift=UP * 0.15), FadeIn(p2, shift=LEFT * 0.2),
                  FadeIn(rang3, shift=DOWN * 0.1), *[FadeIn(v) for v in tab.val[3]],
                  rang_p.animate.set_opacity(0.25), run_time=0.6)
        l2 = self.gauche(self.calcul([("2,56", WHITE), ("+", WHITE), ("0,16", WHITE), ("+", WHITE),
                                      ("70,56", WHITE), ("=", WHITE), ("73,28", ROUGE_ERREUR)], 46), -1.0, XG)
        for j, (mot, morceaux) in enumerate([("2,56 plus", [l2[0]]), ("0,16 plus", [l2[1], l2[2]]),
                                             ("70,56 :", [l2[3], l2[4]])]):
            self.au_mot(mot)
            self.play(*[TransformFromCopy(tab.val[3][j], morceaux[-1])], *[FadeIn(m) for m in morceaux[:-1]],
                      run_time=0.35)
        self.au_mot("73,28")
        self.play(FadeIn(l2[5]), FadeIn(l2[6], scale=1.8), run_time=0.4)
        self.au_mot("Bien trop grand")
        barre = Line(l2.get_left() + LEFT * 0.1, l2.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=7)
        trop = self.t("Bien trop grand !", 40, ROUGE_ERREUR, BOLD)
        self.gauche(trop, -2.0, XG)
        self.play(Create(barre), FadeIn(trop, scale=1.4), run_time=0.5)
        self.attendre_voix()

    # ── 06 : défi : la roue 0 € / 4 € ───────────────────────────────────────

    def roue_defi(self):
        return RoueKermesse([("0 €", 0.5, COUL_0), ("4 €", 0.5, COUL_4)])

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Une autre roue")
        r = self.roue_defi()
        tab = self.tableau(2, valeurs=DEFI)
        self.play(FadeIn(r, scale=0.8), FadeIn(tab, shift=DOWN * 0.1), run_time=0.5)
        self.au_mot("0 euro")
        self.play(tab.poser(0, 0), FadeIn(r.etiq[0], scale=1.6), run_time=0.4)
        self.au_mot("4 euros")
        self.play(tab.poser(0, 1), FadeIn(r.etiq[1], scale=1.6), run_time=0.4)
        self.au_mot("0,5 chacun")
        self.play(tab.poser(1, 0), tab.poser(1, 1), run_time=0.4)
        self.au_mot("Espérance")
        e = self.gauche(self.calcul([("E(X)", JAUNE_TITRE), ("=", WHITE), ("2", JAUNE_TITRE)], 50), 0.4)
        self.play(FadeIn(e[:2], shift=UP * 0.1), run_time=0.3)
        self.au_mot(": 2.")
        self.play(FadeIn(e[2], scale=1.8), run_time=0.3)
        self.au_mot("Calcule la variance")
        q = self.gauche(self.calcul([("V(X)", JAUNE_TITRE), ("=", WHITE), ("?", ORANGE_RETENUE)], 60), -0.75)
        self.play(FadeIn(q, scale=1.3), run_time=0.45)
        self.insister(q[2], 0.25)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        r = self.roue_defi().tout()
        tab = self.tableau(4, valeurs=DEFI, h=0.66).tout(lignes=[0, 1])
        self.add(r, tab)
        self.titre_vite("Correction", run_time=0.5)
        avant = None
        for mot, rang, j in [("moins 2 et", 2, 0), ("et 2.", 2, 1), ("4 et", 3, 0), ("et 4.", 3, 1)]:
            self.au_mot(mot)
            eteint = tab.eteindre(*avant) if avant else []
            self.play(*eteint, *tab.allumer(j, [rang]), tab.poser(rang, j), run_time=0.22)
            avant = (j, [rang])
        self.play(*tab.eteindre(*avant), run_time=0.15)
        l = self.gauche(self.calcul([("0,5", BLEU_CALCUL), ("×", WHITE), ("4", WHITE), ("+", WHITE),
                                     ("0,5", BLEU_CALCUL), ("×", WHITE), ("4", WHITE)], 46), -1.0)
        self.au_mot("0,5 fois 4, plus")
        self.play(*tab.allumer(0, [1, 3]), TransformFromCopy(tab.val[1][0], l[0]), FadeIn(l[1]),
                  TransformFromCopy(tab.val[3][0], l[2]), run_time=0.5)
        self.au_mot("plus 0,5 fois 4")
        self.play(*tab.eteindre(0, [1, 3]), *tab.allumer(1, [1, 3]), FadeIn(l[3]),
                  TransformFromCopy(tab.val[1][1], l[4]), FadeIn(l[5]), TransformFromCopy(tab.val[3][1], l[6]),
                  run_time=0.5)
        self.au_mot("V de X égale 4")
        vx = self.gauche(self.calcul([("V(X)", JAUNE_TITRE), ("=", WHITE), ("4", JAUNE_TITRE)], 56), -2.1)
        cadre = SurroundingRectangle(vx, color=JAUNE_TITRE, buff=0.2, stroke_width=4, corner_radius=0.1)
        self.play(*tab.eteindre(1, [1, 3]), FadeIn(vx, shift=UP * 0.1), run_time=0.5)
        self.play(Create(cadre), run_time=0.3)
        self.insister(vx[2], 0.25)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        items = [
            (suite(self.t("V(X) :", fs, JAUNE_TITRE, BOLD), self.t("les écarts au carré,", fs), buff=0.18),
             self.t("× les probabilités, puis la somme", fs)),
            (self.t("Sans le carré :", fs, ROUGE_ERREUR, BOLD), self.t("on trouverait 0", fs)),
        ]
        blocs = VGroup()
        for haut, bas in items:
            txt = VGroup(haut, bas).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
            blocs.add(VGroup(self.coche(), txt).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        blocs.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if blocs.width > 11.0:
            blocs.scale_to_fit_width(11.0)
        blocs.move_to(P(-0.8, 0.5))
        for b in blocs:
            b[0].shift(DOWN * 0.12)
        for (m1, m2), b in zip([("La variance", "puis la somme"), ("Sans le carré", "on trouverait 0")], blocs):
            self.au_mot(m1)
            self.play(FadeIn(b[1][0], shift=RIGHT * 0.2), run_time=0.5)
            self.au_mot(m2)
            self.play(FadeIn(b[1][1], shift=RIGHT * 0.2), Create(b[0]), run_time=0.5)
        self.au_mot("Prochaine vidéo")
        self.play(Write(self.chute("Prochaine vidéo : l'écart-type", font_size=34)))
        self.attendre_voix(marge=1.0)

    # ── 08 : l'écran de fin (règle du 19/10) ────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » + @eleveai974."""
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
        self.ecran_idee()
        self.ecran_formule()
        self.ecran_tableau()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement()


class ProbaVaVariancePremiereSpe(ProbaVaVarianceBase):
    identite = "Maths 1re spé — EleveAI"
