# proba_probaT_indep_definition.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — probabilités :
# DEUX ÉVÉNEMENTS INDÉPENDANTS, la définition (micros : probaT_indep_definition
# en STMG, alea_indep_definition en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_probaT_indep_definition_short.py.
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (18/10, « pour vendre en pack ») :
# ProbaIndepDefinitionBase porte toutes les scènes ; ProbaIndepDefinitionSTMG
# et ProbaIndepDefinitionPremiere ne changent que l'identité de la page de garde.
#
# ⭐ La figure est CELLE DU COACH (`tableau_donnees`, canvasTableau de
# stmg_probaT_indep_def_tpl_2) : 2 × 2 avec marges « Total », en-tête sombre,
# libellés bleu clair, cases blanches, ligne / colonne allumée en jaune.
# ⛔ PAS D'ÉCART : seuls les nombres dits s'écrivent (200, 50, 80, 20 ; puis
# 50, 200, 80, 40 pour l'épicerie d'à côté) ; les autres cases restent vides.
#
# Écrans : 00 garde · 01 l'épicerie, le tableau se remplit (200, 50, 80, 20) ·
# 02 P(V) : la COLONNE V sur le total, 50 sur 200 = 0,25 · 03 « sachant F » :
# la LIGNE F, 20 sur 80 = 0,25 · 04 les deux 0,25 côte à côte, « = » vert,
# P_F(V) = P(V) · 05 l'épicerie d'à côté : 40 sur 80 = 0,5, « ≠ » rouge ·
# 06 le piège : « sans rapport dans la vie » barré, la balance P_F(V) / P(V) ·
# 07 défi · 07b correction · 08 ce que tu as appris · 09 fin (« Entraîne-toi
# sur eleveai.fr », « Abonne-toi ! @eleveai974 »).
#
# Voix : manim/voix/stmg-premiere-proba-indep-definition.json (débit −7).
# Rendus (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_indep_definition.py ProbaIndepDefinitionSTMG -o eleveai-maths-stmg-proba-indep-definition --media_dir manim/scripts/stmg/media-probaT_indep_definition
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_indep_definition.py ProbaIndepDefinitionPremiere -o eleveai-maths-premiere-commun-proba-indep-definition --media_dir manim/scripts/stmg/media-probaT_indep_definition
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_indep_definition_short.py ShortProbaIndepDefinition -o eleveai-maths-stmg-proba-indep-definition-short --media_dir manim/scripts/stmg/media-probaT_indep_definition
# (le short n'affiche aucune classe : un seul rendu, copié sous les deux noms,
#  …-stmg-…-short.mp4 et …-premiere-commun-…-short.mp4)
# Puis copier dans manim/sorties/stmg/maths/probabilites/13-indep-definition/ et
# manim/sorties/premiere-commun/maths/probabilites/13-indep-definition/.

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
from proba_pc_conditionnelle import ANNEAU, TableauCroise, frac, lettre, p_cond, suite  # noqa: E402

COUL_F = "#F59E0B"       # la carte de fidélité (ambre)
GRIS_CLI = "#94A3B8"     # un client


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins ─────────────────────────────────────────────────────────────

def epicerie(s=1.0):
    """Une petite boutique : murs, store rayé, vitrine, porte."""
    murs = Rectangle(width=2.4, height=1.7, fill_color="#FEF3C7", fill_opacity=1, stroke_color=WHITE,
                     stroke_width=2).move_to(P(0, -0.35))
    bandes = VGroup(*[Polygon(P(-1.35 + 0.45 * k, 0.75), P(-0.9 + 0.45 * k, 0.75), P(-0.9 + 0.45 * k, 0.4),
                              P(-1.35 + 0.45 * k, 0.4), fill_color="#DC2626" if k % 2 == 0 else WHITE,
                              fill_opacity=1, stroke_width=0) for k in range(6)])
    feston = VGroup(*[Arc(radius=0.225, start_angle=PI, angle=PI, color="#DC2626" if k % 2 == 0 else WHITE,
                          fill_color="#DC2626" if k % 2 == 0 else WHITE, fill_opacity=1, stroke_width=0)
                      .move_to(P(-1.125 + 0.45 * k, 0.33)) for k in range(6)])
    vitrine = Rectangle(width=1.1, height=0.75, fill_color="#BAE6FD", fill_opacity=1, stroke_color="#78350F",
                        stroke_width=3).move_to(P(-0.45, -0.45))
    fruits = VGroup(*[Circle(radius=0.09, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(-0.75 + 0.2 * k, -0.7))
                      for k, c in enumerate(["#EF4444", "#F59E0B", "#22C55E", "#EF4444", "#F59E0B", "#22C55E"])])
    porte = Rectangle(width=0.55, height=1.0, fill_color="#78350F", fill_opacity=1, stroke_width=0)
    porte.move_to(P(0.7, -0.7))
    return VGroup(murs, bandes, feston, vitrine, fruits, porte).scale(s)


def velo(s=1.0, couleur=BLEU_CALCUL):
    r1 = Circle(radius=0.38, stroke_color=WHITE, stroke_width=4).move_to(P(-0.6, 0))
    r2 = Circle(radius=0.38, stroke_color=WHITE, stroke_width=4).move_to(P(0.6, 0))
    pedalier, selle, guidon = P(-0.05, 0), P(-0.25, 0.55), P(0.42, 0.62)
    cadre = VMobject(stroke_color=couleur, stroke_width=5)
    cadre.set_points_as_corners([P(-0.6, 0), selle, pedalier, P(-0.6, 0)])
    cadre2 = VMobject(stroke_color=couleur, stroke_width=5)
    cadre2.set_points_as_corners([selle, P(0.35, 0.45), pedalier])
    fourche = Line(P(0.6, 0), guidon, color=couleur, stroke_width=5)
    poignee = Line(guidon, guidon + P(0.18, 0.04), color=WHITE, stroke_width=5)
    assise = Line(selle + P(-0.14, 0.04), selle + P(0.12, 0.04), color=WHITE, stroke_width=6)
    return VGroup(r1, r2, cadre, cadre2, fourche, poignee, assise).scale(s)


def carte_fidelite(s=1.0):
    """La carte de fidélité : un petit rectangle ambre, une bande, une étoile."""
    c = RoundedRectangle(width=1.5, height=0.95, corner_radius=0.12, fill_color=COUL_F, fill_opacity=1,
                         stroke_color=WHITE, stroke_width=2)
    bande = Rectangle(width=1.5, height=0.18, fill_color="#78350F", fill_opacity=1, stroke_width=0)
    bande.move_to(c.get_top() + DOWN * 0.27)
    etoile = Star(n=5, outer_radius=0.17, inner_radius=0.07, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    etoile.move_to(c.get_center() + P(-0.4, -0.15))
    return VGroup(c, bande, etoile).scale(s)


def balance(s=1.0):
    """Une balance à deux plateaux (pied, fléau, deux plateaux)."""
    pied = Polygon(P(-0.5, -1.4), P(0.5, -1.4), P(0.08, 0.6), P(-0.08, 0.6), fill_color="#64748B",
                   fill_opacity=1, stroke_width=0)
    socle = RoundedRectangle(width=1.6, height=0.2, corner_radius=0.06, fill_color="#475569", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -1.45))
    fleau = Line(P(-2.6, 0.6), P(2.6, 0.6), color=WHITE, stroke_width=6)
    axe = Dot(P(0, 0.6), radius=0.1, color=JAUNE_TITRE)
    plateaux = VGroup()
    for x in (-2.6, 2.6):
        fils = VGroup(Line(P(x, 0.6), P(x - 0.9, -0.4), color=GRIS_CLI, stroke_width=2),
                      Line(P(x, 0.6), P(x + 0.9, -0.4), color=GRIS_CLI, stroke_width=2))
        plat = Arc(radius=1.0, start_angle=PI + 0.45, angle=PI - 0.9, color=WHITE, stroke_width=5)
        plat.move_to(P(x, -0.55))
        plateaux.add(VGroup(fils, plat))
    return VGroup(socle, pied, fleau, plateaux, axe).scale(s)


def carte_lettre(lt, phrase, fs=32):
    """« V : « il vient à vélo » » sur une carte sombre."""
    g = suite(lettre(lt, fs + 6, BLEU_CALCUL), Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.15)
    fond = RoundedRectangle(width=g.width + 0.5, height=g.height + 0.4, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


def p_de(lt, fs=40, color=WHITE, c_lt=None):
    """P(V) : la lettre en couleur dans les parenthèses."""
    t = Text("P(" + lt + ")", font_size=fs, color=color)
    if c_lt:
        t[2:-1].set_color(c_lt)
    return t


# ── le tableau croisé du coach ──────────────────────────────────────────────

LIGNES = ["Carte de fidélité", "Sans carte", "Total"]
COLONNES = ["Vélo", "Pas à vélo", "Total"]
# ⛔ PAS D'ÉCART : seules les cases DITES portent un nombre.
VALEURS = [[20, None, 80], [None, None, None], [50, None, 200]]
VALEURS_2 = [[40, None, 80], [None, None, None], [50, None, 200]]
TOUTES = {(0, 0), (0, 2), (2, 0), (2, 2)}


class ProbaIndepDefinitionBase(Notion6e):
    nom_voix = "stmg-premiere-proba-indep-definition"
    identite = "Maths — EleveAI"
    ceinture = "bleue"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def tableau(self, centre, echelle, montres=TOUTES, lettres=True, valeurs=VALEURS):
        """Le tableau du coach. Les nombres de `montres` sont déjà écrits ; les
        autres (dits plus tard) sont retirés et se posent avec `tb.poser`."""
        tb = TableauCroise(lignes=LIGNES, colonnes=COLONNES, valeurs=valeurs, larg_lab=3.4, larg=2.2)
        groupe = VGroup(tb)
        lF = lV = None
        if lettres:
            lF = lettre("F", 50, BLEU_CALCUL).next_to(tb.rect[1][0], LEFT, buff=0.2)
            lV = lettre("V", 50, BLEU_CALCUL).next_to(tb.rect[0][1], UP, buff=0.14)
            groupe.add(lF, lV)
        groupe.scale(echelle).move_to(centre)
        for i, ligne in enumerate(tb.val):
            for j, v in enumerate(ligne):
                if v is None:
                    continue
                if (i, j) in montres:
                    tb.posees.add((i, j))
                else:
                    tb.vals.remove(v)
        return tb, lF, lV

    def cadre_ligne(self, tb, i=0, color=ANNEAU):
        return SurroundingRectangle(VGroup(tb.rect[i + 1][0], tb.rect[i + 1][3]), color=color, buff=0.05,
                                    stroke_width=6)

    def cadre_colonne(self, tb, j=0, color=ANNEAU):
        return SurroundingRectangle(VGroup(tb.rect[0][j + 1], tb.rect[3][j + 1]), color=color, buff=0.05,
                                    stroke_width=6)

    def calcul(self, tb, f, n_ij, d_ij, valeurs, resultat, fs=72, color_d=JAUNE_TITRE, mot_frac=None,
               mot_res=None):
        """f = n / d = résultat : n et d quittent leurs cases."""
        fsf = int(fs * 0.68)
        eg = self.t("=", fs)
        fr_ = frac(valeurs[n_ij[0]][n_ij[1]], valeurs[d_ij[0]][d_ij[1]], fsf, WHITE, VERT_OK, color_d)
        eg2 = self.t("=", fs)
        r = self.t(resultat, fs, VERT_OK)
        suite(eg, fr_, eg2, r, buff=0.3).next_to(f, RIGHT, buff=0.3)
        for m in (eg, eg2, r):
            m.match_y(f[0])
        if mot_frac:
            self.au_mot(mot_frac)
        self.play(FadeIn(eg), TransformFromCopy(tb.val[n_ij[0]][n_ij[1]], fr_[0]), GrowFromCenter(fr_[1]),
                  TransformFromCopy(tb.val[d_ij[0]][d_ij[1]], fr_[2]), run_time=0.8)
        if mot_res:
            self.au_mot(mot_res)
        self.play(FadeIn(eg2), FadeIn(r, scale=0.6), run_time=0.5)
        self.insister(r, 0.35)
        return VGroup(eg, fr_, eg2, r)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Deux événements indépendants", 50, JAUNE_TITRE).to_edge(UP, buff=0.55)
        sous = self.t("quand savoir l'un ne change rien", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.75))
        tb, _, _ = self.tableau(P(-0.6, -0.35), 0.58, montres=(), lettres=False)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tb, shift=UP * 0.2),
                  run_time=1.0)
        self.au_mot("quand savoir")
        self.play(FadeIn(sous, shift=UP * 0.15), *tb.etat(lignes=(0,)), run_time=0.7)
        self.attendre_voix(marge=1.0)

    # ── 01 : l'épicerie ; le tableau se remplit ─────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("L'épicerie du quartier")
        ep = epicerie(0.85).move_to(P(-5.2, 1.3))
        tb, _, _ = self.tableau(P(1.3, 0.75), 0.7, montres=(), lettres=False)
        self.play(FadeIn(ep, shift=UP * 0.2), FadeIn(tb, shift=LEFT * 0.3), run_time=0.7)
        self.au_mot("200 clients")
        self.play(tb.poser(2, 2), run_time=0.45)
        self.insister(tb.val[2][2], 0.3)
        self.au_mot("50 viennent")
        v = velo(0.75).move_to(P(-5.2, -0.65))
        self.play(tb.poser(2, 0), FadeIn(v, shift=RIGHT * 0.6), run_time=0.5)
        self.au_mot("80 ont la carte")
        c = carte_fidelite(0.85).move_to(P(-5.2, -2.1))
        self.play(tb.poser(0, 2), FadeIn(c, shift=UP * 0.3), run_time=0.5)
        self.au_mot("parmi eux")
        self.play(*tb.etat(lignes=(0,), eteindre=False), run_time=0.5)
        self.au_mot("20 viennent")
        self.play(tb.poser(0, 0), run_time=0.45)
        self.play(*tb.etat(cases=((0, 0),), eteindre=False), run_time=0.4)
        self.insister(tb.val[0][0], 0.35)
        self.attendre_voix()

    # ── 02 : P(V) : la colonne V sur le total ───────────────────────────────

    def ecran_proba(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-proba")
        self.titre_ecran("On choisit un client au hasard")
        tb, lF, lV = self.tableau(P(-0.6, 1.0), 0.78)
        self.play(FadeIn(tb), run_time=0.5)
        self.au_mot("il vient à vélo")
        cV = carte_lettre("V", "« il vient à vélo »", 30)
        cV.move_to(P(-6.2 + cV.width / 2, -0.95))
        self.play(FadeIn(cV, shift=RIGHT * 0.2), FadeIn(lV, scale=1.6), run_time=0.6)
        self.au_mot("P de V")
        f = p_de("V", 72, c_lt=BLEU_CALCUL).move_to(P(-5.0, -2.2))
        cad = self.cadre_colonne(tb)
        self.play(Write(f), *tb.etat(colonnes=(0,), cases=((2, 2),)), Create(cad), run_time=0.8)
        self.calcul(tb, f, (2, 0), (2, 2), VALEURS, "0,25", 72, mot_frac="50 sur 200", mot_res="égale 0,25")
        self.attendre_voix()

    # ── 03 : « sachant F » : la ligne F, 20 sur 80 ──────────────────────────

    def ecran_sachant(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-sachant")
        self.titre_ecran("Sachant qu'il a la carte")
        tb, lF, lV = self.tableau(P(-0.6, 1.0), 0.78)
        self.play(FadeIn(tb), FadeIn(lV), run_time=0.5)
        self.au_mot("il a la carte")
        cF = carte_lettre("F", "« il a la carte de fidélité »", 30)
        cF.move_to(P(-6.2 + cF.width / 2, -0.95))
        self.play(FadeIn(cF, shift=RIGHT * 0.2), FadeIn(lF, scale=1.6), run_time=0.6)
        self.au_mot("Sachant F")
        self.play(Indicate(lF, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.6)
        self.au_mot("on allume la ligne F")
        cad = self.cadre_ligne(tb)
        self.play(*tb.etat(lignes=(0,)), Create(cad), run_time=0.8)
        f = p_cond("F", "V", 72, WHITE, JAUNE_TITRE, BLEU_CALCUL).move_to(P(-5.0, -2.2))
        self.au_mot("20 sur 80")
        self.play(Write(f), run_time=0.5)
        self.calcul(tb, f, (0, 0), (0, 2), VALEURS, "0,25", 72, mot_res="égale 0,25")
        self.attendre_voix()

    # ── 04 : même nombre : P_F(V) = P(V) ────────────────────────────────────

    def ecran_meme(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-meme")
        titre = self.titre_ecran("Même nombre !")
        g = self.t("0,25", 96, VERT_OK).move_to(P(-3.3, 1.75))
        d = self.t("0,25", 96, VERT_OK).move_to(P(2.1, 1.75))
        eg = self.t("=", 110, VERT_OK).move_to(P(-0.6, 1.75))
        lg = p_cond("F", "V", 48, WHITE, JAUNE_TITRE, BLEU_CALCUL).next_to(g, DOWN, buff=0.3)
        ld = p_de("V", 48, c_lt=BLEU_CALCUL).next_to(d, DOWN, buff=0.3)
        sg = self.t("ligne F", 26, JAUNE_TITRE).next_to(lg, DOWN, buff=0.15)
        sd = self.t("colonne V, sur le total", 26, BLEU_CALCUL).next_to(ld, DOWN, buff=0.15)
        self.play(FadeIn(VGroup(g, lg, sg), shift=RIGHT * 0.4), FadeIn(VGroup(d, ld, sd), shift=LEFT * 0.4),
                  run_time=0.7)
        self.play(GrowFromCenter(eg), run_time=0.4)
        self.insister(eg, 0.3)
        self.au_mot("Savoir que le client")
        l1 = suite(carte_fidelite(0.42), self.t("La carte ne change pas", 34),
                   self.t("la probabilité du vélo", 34, BLEU_CALCUL), buff=0.2)
        l1.move_to(P(-0.6, -0.95))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("On dit que F et V")
        l2 = self.t("F et V sont indépendants", 46, JAUNE_TITRE).move_to(P(-0.6, -1.9))
        self.play(Write(l2), run_time=0.8)
        self.au_mot("P indice F de V")
        f = suite(p_cond("F", "V", 60, WHITE, JAUNE_TITRE, BLEU_CALCUL), self.t("=", 60, VERT_OK),
                  p_de("V", 60, c_lt=BLEU_CALCUL), buff=0.3)
        f[1].match_y(f[2])
        f.move_to(P(-0.6, -2.95))
        cadre = SurroundingRectangle(f, color=VERT_OK, buff=0.2, stroke_width=4)
        self.play(FadeIn(f[0]), run_time=0.4)
        self.au_mot("égale P de V")
        self.play(FadeIn(f[1:]), Create(cadre), run_time=0.6)
        self.insister(VGroup(f, cadre), 0.35)
        self.attendre_voix()

    # ── 05 : l'épicerie d'à côté : 40 sur 80 = 0,5 ≠ 0,25 ───────────────────

    def ecran_contre(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-contre")
        self.titre_ecran("L'épicerie d'à côté")
        tb, lF, lV = self.tableau(P(-0.6, 1.0), 0.78, montres=(), valeurs=VALEURS_2)
        self.play(FadeIn(tb), FadeIn(lF), FadeIn(lV), run_time=0.5)
        self.au_mot("50 clients sur 200")
        self.play(tb.poser(2, 0), run_time=0.4)
        self.au_mot("sur 200")
        self.play(tb.poser(2, 2), run_time=0.4)
        self.au_mot("parmi les 80")
        cad = self.cadre_ligne(tb)
        self.play(tb.poser(0, 2), run_time=0.4)
        self.play(*tb.etat(lignes=(0,)), Create(cad), run_time=0.6)
        self.au_mot("40 viennent")
        self.play(tb.poser(0, 0), run_time=0.45)
        self.play(*tb.etat(lignes=(0,)), run_time=0.2)
        self.insister(tb.val[0][0], 0.35)
        f = p_cond("F", "V", 60, WHITE, JAUNE_TITRE, BLEU_CALCUL).move_to(P(-5.2, -1.15))
        self.au_mot("40 sur 80")
        self.play(Write(f), run_time=0.4)
        res = self.calcul(tb, f, (0, 0), (0, 2), VALEURS_2, "0,5", 60, mot_res="égale 0,5")
        self.au_mot("Ce n'est plus 0,25")
        neq = self.t("≠", 80, ROUGE_ERREUR)
        ancien = self.t("0,25", 60, WHITE)
        neq.next_to(res, RIGHT, buff=0.35)
        ancien.next_to(neq, RIGHT, buff=0.35)
        for m in (neq, ancien):
            m.match_y(res[3])
        self.play(GrowFromCenter(neq), FadeIn(ancien, shift=LEFT * 0.3), run_time=0.6)
        self.insister(neq, 0.3)
        self.au_mot("savoir F change tout")
        l1 = self.t("Savoir F change tout", 36, ORANGE_RETENUE).move_to(P(-6.2, -2.4), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("ne sont pas indépendants")
        l2 = suite(self.t("F et V", 40, JAUNE_TITRE), self.t("ne sont pas indépendants", 40, ROUGE_ERREUR), buff=0.2)
        l2.move_to(P(-6.2, -3.2), aligned_edge=LEFT)
        self.play(Write(l2), run_time=0.8)
        self.attendre_voix()

    # ── 06 : le piège : « sans rapport dans la vie » ────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("croire que")
        faux = suite(self.t("« indépendants »", 34, JAUNE_TITRE), self.t("=", 34),
                     self.t("« sans rapport dans la vie » ?", 34, ROUGE_ERREUR), buff=0.22)
        if faux.width > 12.4:
            faux.scale_to_fit_width(12.4)
        faux.move_to(P(-0.3, 2.05))
        self.play(FadeIn(faux[0], shift=UP * 0.15), run_time=0.5)
        self.au_mot("sans rapport")
        self.play(FadeIn(faux[1:], shift=UP * 0.15), run_time=0.6)
        self.au_mot("En maths")
        barre = Line(faux.get_corner(DL) + LEFT * 0.1, faux.get_corner(UR) + RIGHT * 0.1, color=ROUGE_ERREUR,
                     stroke_width=8)
        self.play(Create(barre), faux.animate.set_opacity(0.45), run_time=0.5)
        l1 = suite(self.t("En maths,", 38, VERT_OK), self.t("on ne devine pas :", 38), buff=0.2)
        l1.move_to(P(-0.6, 1.0))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("on compare deux nombres")
        l2 = self.t("on compare deux nombres", 38, JAUNE_TITRE).next_to(l1, DOWN, buff=0.25)
        bal = balance(0.9).move_to(P(-0.6, -2.1))
        self.play(FadeIn(l2, shift=UP * 0.15), FadeIn(bal, shift=UP * 0.2), run_time=0.6)
        plat_g, plat_d = bal[3][0][1], bal[3][1][1]
        self.au_mot("P indice F de V")
        g = p_cond("F", "V", 40, WHITE, JAUNE_TITRE, BLEU_CALCUL).next_to(plat_g.get_bottom(), UP, buff=0.2)
        self.play(FadeIn(g, shift=DOWN * 0.5), run_time=0.5)
        self.au_mot("et P de V")
        d = p_de("V", 40, c_lt=BLEU_CALCUL).next_to(plat_d.get_bottom(), UP, buff=0.2)
        self.play(FadeIn(d, shift=DOWN * 0.5), run_time=0.5)
        self.play(Indicate(bal[4], color=JAUNE_TITRE, scale_factor=1.8), run_time=0.6)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("P de A égale 0,3")
        l1 = suite(p_de("A", 64, c_lt=BLEU_CALCUL), self.t("=", 64), self.t("0,3", 64, VERT_OK), buff=0.3)
        l1.move_to(P(-0.6, 1.45))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("P indice B de A")
        f = p_cond("B", "A", 64, WHITE, JAUNE_TITRE, BLEU_CALCUL)
        l2 = suite(f, self.t("=", 64), self.t("0,3", 64, VERT_OK), buff=0.3)
        l2[1:].match_y(f[0])
        l2.move_to(P(-0.6, 0.15))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("A et B sont-ils")
        q = self.t("A et B sont-ils indépendants ?", 44, JAUNE_TITRE).move_to(P(-0.6, -1.2))
        self.play(Write(q), run_time=0.8)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        self.au_mot("P indice B de A")
        f = p_cond("B", "A", 64, WHITE, JAUNE_TITRE, BLEU_CALCUL)
        eg = self.t("=", 64, VERT_OK)
        pa = p_de("A", 64, c_lt=BLEU_CALCUL)
        l1 = suite(f, eg, pa, buff=0.35)
        eg.match_y(pa)
        l1.move_to(P(-0.6, 1.5))
        self.play(FadeIn(f, shift=UP * 0.15), run_time=0.5)
        self.au_mot("égale P de A")
        self.play(FadeIn(eg), FadeIn(pa), run_time=0.5)
        self.au_mot("0,3 et 0,3")
        a = self.t("0,3", 64, VERT_OK).next_to(f, DOWN, buff=0.45)
        b = self.t("0,3", 64, VERT_OK).next_to(pa, DOWN, buff=0.45)
        eg2 = self.t("=", 64, VERT_OK).move_to(P(eg.get_center()[0], a.get_center()[1]))
        self.play(FadeIn(a, shift=DOWN * 0.2), run_time=0.4)
        self.play(FadeIn(b, shift=DOWN * 0.2), GrowFromCenter(eg2), run_time=0.5)
        self.insister(eg2, 0.3)
        self.au_mot("Savoir B ne change rien")
        l2 = self.t("Savoir B ne change rien", 38).move_to(P(-0.6, -1.0))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("A et B sont indépendants")
        l3 = self.t("A et B sont indépendants", 46, JAUNE_TITRE).move_to(P(-0.9, -2.1))
        ok = self.coche(taille=0.3).next_to(l3, RIGHT, buff=0.4)
        self.play(Write(l3), run_time=0.8)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = VGroup(suite(self.t("A et B indépendants :", fs, JAUNE_TITRE), buff=0.1),
                    self.t("savoir B ne change pas la probabilité de A", fs))
        l1.arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        f = suite(p_cond("B", "A", 52, WHITE, JAUNE_TITRE, BLEU_CALCUL), self.t("=", 52, VERT_OK),
                  p_de("A", 52, c_lt=BLEU_CALCUL), buff=0.25)
        f[1].match_y(f[2])
        l3 = VGroup(self.t("On le vérifie par un calcul,", fs), self.t("jamais au jugé", fs, ROUGE_ERREUR))
        l3.arrange(RIGHT, buff=0.2)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, f, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 12.4:
            lignes.scale_to_fit_width(12.4)
        lignes.move_to(P(-0.4, 0.55))
        for mot, l in zip(["A et B sont indépendants", "P indice B de A", "On le vérifie"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        ch = suite(self.t("Prochaine vidéo :", 36, VERT_OK), self.t("la règle du produit", 36), buff=0.22)
        ch.move_to(P(-0.9, -2.6))
        self.play(FadeIn(ch, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre : la voix ne parle plus du coach."""
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
        self.ecran_proba()
        self.ecran_sachant()
        self.ecran_meme()
        self.ecran_contre()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaIndepDefinitionSTMG(ProbaIndepDefinitionBase):
    identite = "Maths STMG — EleveAI"


class ProbaIndepDefinitionPremiere(ProbaIndepDefinitionBase):
    identite = "Maths 1re — EleveAI"


# 19/10 : la même vidéo pour la 1re SPÉ (micro jumelle, pack par classe).
class ProbaIndepDefinitionPremiereSpe(ProbaIndepDefinitionBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "marron"
