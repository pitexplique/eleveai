# proba_probaC_tableau.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — probabilités
# conditionnelles : CALCULER avec un tableau croisé d'effectifs (micros :
# probaC_calculer_tableau en STMG, alea_cond_tableau en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_probaC_tableau_short.py.
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (18/10, « pour vendre en pack ») :
# ProbaTableauBase porte toutes les scènes ; ProbaTableauSTMG et
# ProbaTableauPremiere ne changent que l'identité de la page de garde.
#
# ⭐ La figure est CELLE DU COACH (`tableau_donnees`, canvasTableau / canvasV
# des deux banques) : 2 × 2 avec marges « Total », en-tête sombre, libellés
# bleu clair, cases blanches, ligne / colonne allumée en jaune.
# ⛔ PAS D'ÉCART : une case s'écrit quand la voix dit son nombre ; le 32 n'arrive
# qu'à la correction ; les cases « Plus loin × Vélo / Voiture » restent vides.
#
# Écrans : 00 garde · 01 l'entreprise, 200 salariés, deux questions ·
# 02 le tableau se remplit · 03 D, V, « sachant D » : la LIGNE D s'allume ·
# 04 48 sur 80 = 0,6 · 05 l'autre sens : la COLONNE V, 48 sur 60 = 0,8 ·
# 06 le piège : 48 sur 200, le total général entouré en rouge = P(D ∩ V) ·
# 07 défi (colonne Voiture) · 07b correction · 08 ce que tu as appris ·
# 09 abonnement.
#
# Voix : manim/voix/stmg-premiere-proba-tableau.json (débit −7).
# Rendus (depuis la racine du dépôt) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaC_tableau.py ProbaTableauSTMG -o eleveai-maths-stmg-proba-tableau --media_dir manim/scripts/stmg/media-probaC_tableau
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaC_tableau.py ProbaTableauPremiere -o eleveai-maths-premiere-commun-proba-tableau --media_dir manim/scripts/stmg/media-probaC_tableau
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_tableau_short.py ShortProbaTableau -o eleveai-maths-stmg-proba-tableau-short --media_dir manim/scripts/stmg/media-probaC_tableau
# (le short n'affiche aucune classe : un seul rendu, copié sous les deux noms)
# Puis copier dans manim/sorties/stmg/maths/probabilites/03-tableau/ et
# manim/sorties/premiere-commun/maths/probabilites/03-tableau/.

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

GRIS_SAL = "#94A3B8"     # un salarié
COUL_D = "#F97316"       # habite près (orange)


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins ─────────────────────────────────────────────────────────────

def immeuble(s=1.0):
    corps = Rectangle(width=1.6, height=2.5, fill_color="#334155", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2)
    fen = VGroup(*[Rectangle(width=0.26, height=0.26, fill_color="#FDE68A", fill_opacity=0.9, stroke_width=0)
                   .move_to(P(-0.45 + 0.45 * c, 0.85 - 0.5 * r)) for r in range(4) for c in range(3)])
    porte = Rectangle(width=0.4, height=0.5, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
    porte.align_to(corps, DOWN)
    return VGroup(corps, fen, porte).scale(s)


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


def voiture(s=1.0, couleur="#DC2626"):
    caisse = RoundedRectangle(width=1.8, height=0.5, corner_radius=0.15, fill_color=couleur, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=2)
    toit = Polygon(P(-0.5, 0.25), P(0.45, 0.25), P(0.25, 0.65), P(-0.3, 0.65), fill_color=couleur,
                   fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    vitre = Polygon(P(-0.38, 0.3), P(0.35, 0.3), P(0.2, 0.58), P(-0.24, 0.58), fill_color="#BAE6FD",
                    fill_opacity=1, stroke_width=0)
    roues = VGroup(*[Circle(radius=0.2, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                            stroke_width=2).move_to(P(x, -0.25)) for x in (-0.5, 0.5)])
    return VGroup(toit, vitre, caisse, roues).scale(s)


def carte_lettre(lt, phrase, fs=32):
    """« D : « il habite à moins de 5 km » » sur une carte sombre."""
    g = suite(lettre(lt, fs + 6, BLEU_CALCUL), Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.15)
    fond = RoundedRectangle(width=g.width + 0.5, height=g.height + 0.4, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


# ── le tableau croisé du coach ──────────────────────────────────────────────

LIGNES = ["Moins de 5 km", "Plus loin", "Total"]
COLONNES = ["Vélo", "Voiture", "Total"]
# ⛔ PAS D'ÉCART : les cases « Plus loin × Vélo / Voiture » ne sont jamais dites.
VALEURS = [[48, 32, 80], [None, None, 120], [60, 140, 200]]
DITES = {(0, 0), (0, 2), (1, 2), (2, 0), (2, 1), (2, 2)}   # tout sauf le 32 (dit à la correction)


class ProbaTableauBase(Notion6e):
    nom_voix = "stmg-premiere-proba-tableau"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def tableau(self, centre, echelle, montres=DITES, lettres=True):
        """Le tableau du coach. Les nombres de `montres` sont déjà écrits ; les
        autres (dits plus tard) sont retirés et se posent avec `tb.poser`."""
        tb = TableauCroise(lignes=LIGNES, colonnes=COLONNES, valeurs=VALEURS, larg_lab=3.4, larg=2.2)
        groupe = VGroup(tb)
        lD = lV = None
        if lettres:
            lD = lettre("D", 50, BLEU_CALCUL).next_to(tb.rect[1][0], LEFT, buff=0.2)
            lV = lettre("V", 50, BLEU_CALCUL).next_to(tb.rect[0][1], UP, buff=0.14)
            groupe.add(lD, lV)
        groupe.scale(echelle).move_to(centre)
        for i, ligne in enumerate(tb.val):
            for j, v in enumerate(ligne):
                if v is None:
                    continue
                if (i, j) in montres:
                    tb.posees.add((i, j))
                else:
                    tb.vals.remove(v)
        return tb, lD, lV

    def cadre_ligne(self, tb, i=0, color=ANNEAU):
        return SurroundingRectangle(VGroup(tb.rect[i + 1][0], tb.rect[i + 1][3]), color=color, buff=0.05,
                                    stroke_width=6)

    def cadre_colonne(self, tb, j=0, color=ANNEAU):
        return SurroundingRectangle(VGroup(tb.rect[0][j + 1], tb.rect[3][j + 1]), color=color, buff=0.05,
                                    stroke_width=6)

    def formule(self, cond, cible, fs=80):
        return p_cond(cond, cible, fs, WHITE, JAUNE_TITRE, VERT_OK)

    def calcul(self, tb, f, n_ij, d_ij, resultat, fs=80, color_d=JAUNE_TITRE, mot_frac=None, mot_res=None):
        """P_X(Y) = n / d = résultat : n et d quittent leurs cases."""
        fsf = int(fs * 0.68)
        eg = self.t("=", fs)
        fr_ = frac(VALEURS[n_ij[0]][n_ij[1]], VALEURS[d_ij[0]][d_ij[1]], fsf, WHITE, VERT_OK, color_d)
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
        titre = self.t("Calculer une probabilité conditionnelle", 48, JAUNE_TITRE).to_edge(UP, buff=0.55)
        sous = self.t("avec un tableau croisé", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        tb, _, _ = self.tableau(P(-0.6, -0.35), 0.58, montres=(), lettres=False)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tb, shift=UP * 0.2),
                  run_time=1.0)
        self.au_mot("avec un tableau croisé")
        self.play(FadeIn(sous, shift=UP * 0.15), *tb.etat(lignes=(0,)), run_time=0.7)
        self.attendre_voix(marge=1.0)

    # ── 01 : l'entreprise, 200 salariés, deux questions ─────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Venir travailler à vélo ?")
        imm = immeuble(0.95).move_to(P(-5.5, 0.55))
        pts = VGroup(*[Circle(radius=0.075, fill_color=GRIS_SAL, fill_opacity=1, stroke_width=0)
                       .move_to(P(-3.9 + 0.235 * c, -0.45 + 0.235 * r)) for r in range(10) for c in range(20)])
        self.au_mot("Une entreprise")
        self.play(FadeIn(imm, shift=UP * 0.2), run_time=0.5)
        self.au_mot("200 salariés")
        n200 = self.t("200 salariés", 38).next_to(pts, UP, buff=0.25)
        self.play(LaggedStart(*[FadeIn(d, scale=0.3) for d in pts], lag_ratio=0.003), FadeIn(n200), run_time=1.0)
        self.insister(n200[:3], 0.3)
        self.au_mot("à vélo. Elle")
        v = velo(1.1).move_to(P(3.6, 1.0))
        self.play(FadeIn(v, shift=RIGHT * 0.6), run_time=0.6)
        self.au_mot("habites-tu")
        q1 = self.t("Habites-tu à moins de 5 km ?", 36, COUL_D)
        q1.move_to(P(-6.0 + q1.width / 2, -1.75))
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(q1[18:21], 0.3)
        self.au_mot("Viens-tu à vélo")
        q2 = self.t("Viens-tu à vélo ?", 36, BLEU_CALCUL)
        q2.move_to(P(-6.0 + q2.width / 2, -2.6))
        self.play(FadeIn(q2, shift=RIGHT * 0.2), Indicate(v, color=BLEU_CALCUL, scale_factor=1.15), run_time=0.6)
        self.attendre_voix()

    # ── 02 : le tableau se remplit, case par case ───────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        self.titre_ecran("Le tableau croisé")
        tb, _, _ = self.tableau(P(-0.8, 0.1), 0.85, montres=(), lettres=False)
        self.au_mot("Voici le tableau")
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.6)
        self.play(tb.poser(2, 2), run_time=0.4)
        for mot, ij in (("80 salariés", (0, 2)), ("120 plus loin", (1, 2)), ("60 viennent", (2, 0)),
                        ("140 en voiture", (2, 1))):
            self.au_mot(mot)
            self.play(tb.poser(*ij), run_time=0.45)
        self.au_mot("Et 48")
        self.play(tb.poser(0, 0), run_time=0.45)
        self.au_mot("habitent près et viennent")
        self.play(*tb.etat(cases=((0, 0),), eteindre=False), run_time=0.5)
        self.insister(tb.val[0][0], 0.35)
        self.attendre_voix()

    # ── 03 : D, V, « sachant D » → la LIGNE D s'allume ──────────────────────

    def ecran_sachant(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-sachant")
        self.titre_ecran("On choisit un salarié au hasard")
        tb, lD, lV = self.tableau(P(-0.6, 1.0), 0.78)
        self.play(FadeIn(tb), run_time=0.5)
        self.au_mot("D : « il habite")
        cD = carte_lettre("D", "« il habite à moins de 5 km »", 30)
        cD.move_to(P(-6.2 + cD.width / 2, -0.95))
        self.play(FadeIn(cD, shift=RIGHT * 0.2), FadeIn(lD, scale=1.6), run_time=0.6)
        self.au_mot("V : « il vient")
        cV = carte_lettre("V", "« il vient à vélo »", 30)
        cV.next_to(cD, RIGHT, buff=0.3)
        self.play(FadeIn(cV, shift=RIGHT * 0.2), FadeIn(lV, scale=1.6), run_time=0.6)
        self.au_mot("Sachant qu'il habite près")
        q = suite(self.t("Sachant qu'il habite près,", 28, JAUNE_TITRE),
                  self.t("probabilité qu'il vienne à vélo ?", 28), buff=0.2)
        q.move_to(P(-6.2 + q.width / 2, -1.85))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.6)
        self.au_mot("« Sachant D »")
        s = suite(self.t("« Sachant D » :", 34, JAUNE_TITRE), self.t("on allume la ligne D", 34), buff=0.2)
        s.move_to(P(-6.2 + s.width / 2, -2.7))
        self.play(FadeIn(s, shift=UP * 0.15), Indicate(lD, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.6)
        self.au_mot("on allume la ligne D")
        cad = self.cadre_ligne(tb)
        self.play(*tb.etat(lignes=(0,), eteindre=False), Create(cad), run_time=0.7)
        self.au_mot("on oublie le reste")
        self.play(*tb.etat(lignes=(0,)), run_time=0.8)
        self.attendre_voix()

    # ── 04 : sur la ligne D : 48 sur 80 ─────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-calcul")
        self.titre_ecran("Sur la ligne D")
        tb, lD, lV = self.tableau(P(-0.6, 1.0), 0.78)
        cad = self.cadre_ligne(tb)
        self.add(tb, lD, lV)
        self.play(*tb.etat(lignes=(0,)), Create(cad), run_time=0.6)
        self.au_mot("80 salariés")
        self.insister(tb.val[0][2], 0.35)
        self.au_mot("48 à vélo")
        self.insister(tb.val[0][0], 0.35)
        self.au_mot("P indice D de V")
        f = self.formule("D", "V", 80).move_to(P(-5.2, -1.75))
        self.play(Write(f), run_time=0.7)
        self.play(Indicate(f[1], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.5)
        self.calcul(tb, f, (0, 0), (0, 2), "0,6", 80, mot_frac="48 sur 80", mot_res="égale 0,6")
        self.attendre_voix()

    # ── 05 : l'autre sens : la COLONNE V ────────────────────────────────────

    def ecran_autre_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-autre-sens")
        self.titre_ecran("Dans l'autre sens")
        tb, lD, lV = self.tableau(P(-0.6, 1.0), 0.78)
        self.add(tb, lD, lV)
        self.au_mot("Sachant qu'il vient à vélo")
        q = suite(self.t("Sachant qu'il vient à vélo,", 28, JAUNE_TITRE),
                  self.t("probabilité qu'il habite près ?", 28), buff=0.2)
        q.move_to(P(-6.2 + q.width / 2, -1.0))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.6)
        self.au_mot("On allume la colonne V")
        cad = self.cadre_colonne(tb)
        self.play(*tb.etat(colonnes=(0,)), Create(cad), Indicate(lV, color=JAUNE_TITRE, scale_factor=1.6),
                  run_time=0.8)
        self.au_mot("60 salariés")
        self.insister(tb.val[2][0], 0.35)
        self.au_mot("dont 48")
        self.insister(tb.val[0][0], 0.35)
        self.au_mot("P indice V de D")
        f = self.formule("V", "D", 80).move_to(P(-5.2, -2.25))
        self.play(Write(f), run_time=0.7)
        self.play(Indicate(f[1], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.5)
        self.calcul(tb, f, (0, 0), (2, 0), "0,8", 80, mot_frac="48 sur 60", mot_res="égale 0,8")
        self.attendre_voix()

    # ── 06 : le piège : diviser par 200 ─────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        tb, lD, lV = self.tableau(P(-2.3, 1.2), 0.66)
        self.add(tb, lD, lV)
        self.au_mot("diviser par 200")
        faux = self.t("÷ 200 ?", 60, ROUGE_ERREUR).move_to(P(3.9, 1.3))
        rond = Ellipse(width=tb.case(2, 2).width * 1.35, height=tb.case(2, 2).height * 1.6,
                       color=ROUGE_ERREUR, stroke_width=7).move_to(tb.case(2, 2))
        self.play(FadeIn(faux, scale=0.6), Create(rond), *tb.etat(cases=((2, 2),)), run_time=0.7)
        self.insister(faux, 0.3)
        self.au_mot("48 sur 200")
        fa = frac(48, 200, 48, WHITE, VERT_OK, ROUGE_ERREUR)
        eg1 = self.t("=", 50)
        r = self.t("0,24", 50, ORANGE_RETENUE)
        eg2 = self.t("=", 50)
        pinter = self.t("P(D ∩ V)", 50, ORANGE_RETENUE)
        la = suite(fa, eg1, r, eg2, pinter, buff=0.3)
        la.move_to(P(-6.2 + la.width / 2, -1.0))
        self.play(TransformFromCopy(tb.val[0][0], fa[0]), GrowFromCenter(fa[1]),
                  TransformFromCopy(tb.val[2][2], fa[2]), *tb.etat(cases=((0, 0), (2, 2))), run_time=0.7)
        self.au_mot("égale 0,24")
        self.play(FadeIn(eg1), FadeIn(r, scale=0.6), run_time=0.4)
        self.au_mot("P de D inter V")
        self.play(FadeIn(eg2), Write(pinter), run_time=0.6)
        self.au_mot("habiter près ET")
        et = suite(self.t("près", 32, COUL_D), self.t("ET", 36, JAUNE_TITRE), self.t("à vélo", 32, BLEU_CALCUL),
                   buff=0.18).next_to(la, RIGHT, buff=0.45)
        self.play(FadeIn(et, shift=LEFT * 0.2), *tb.etat(cases=((0, 0),)), FadeOut(rond), run_time=0.6)
        self.insister(tb.val[0][0], 0.3)
        self.au_mot("Avec « sachant »")
        barre = Line(faux.get_corner(DL), faux.get_corner(UR), color=ROUGE_ERREUR, stroke_width=8)
        s1 = suite(self.t("Avec « sachant » :", 34, JAUNE_TITRE), self.t("jamais par le total", 34, ROUGE_ERREUR),
                   buff=0.2)
        s1.move_to(P(-6.2 + s1.width / 2, -2.35))
        self.play(Create(barre), FadeIn(s1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("on divise par la ligne")
        s2 = self.t("on divise par la ligne ou la colonne allumée", 32, VERT_OK)
        s2.move_to(P(-6.2 + s2.width / 2, -3.1))
        cl = self.cadre_ligne(tb)
        self.play(FadeIn(s2, shift=UP * 0.15), *tb.etat(lignes=(0,)), Create(cl), run_time=0.6)
        self.au_mot("ou la colonne allumée")
        cc = self.cadre_colonne(tb)
        self.play(*tb.etat(colonnes=(0,)), ReplacementTransform(cl, cc), run_time=0.7)
        self.attendre_voix()

    # ── 07 : défi : la colonne Voiture ──────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tb, lD, lV = self.tableau(P(-0.6, 1.0), 0.78)
        self.play(FadeIn(tb), FadeIn(lD), FadeIn(lV), run_time=0.5)
        self.au_mot("Parmi les salariés qui viennent en voiture")
        q1 = suite(self.t("Parmi les salariés qui viennent", 34), self.t("en voiture,", 34, "#F87171"), buff=0.18)
        q1.move_to(P(-0.8, -1.05))
        self.play(FadeIn(q1, shift=UP * 0.15), Indicate(tb.ent[1], color=JAUNE_TITRE, scale_factor=1.3),
                  run_time=0.7)
        self.au_mot("quelle est la probabilité")
        q2 = suite(self.t("probabilité d'habiter", 34), self.t("à moins de 5 km ?", 34, COUL_D), buff=0.18)
        q2.move_to(P(-0.8, -1.75))
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        tb, lD, lV = self.tableau(P(-0.6, 1.0), 0.78)
        self.add(tb, lD, lV)
        self.au_mot("On allume la colonne Voiture")
        cad = self.cadre_colonne(tb, 1)
        self.play(*tb.etat(colonnes=(1,)), Create(cad), run_time=0.8)
        self.au_mot("140 salariés")
        self.insister(tb.val[2][1], 0.35)
        self.au_mot("dont 32")
        self.play(tb.poser(0, 1), run_time=0.5)
        self.play(*tb.etat(colonnes=(1,)), run_time=0.2)
        self.insister(tb.val[0][1], 0.35)
        self.au_mot("32 sur 140")
        f1 = frac(32, 140, 62, WHITE, VERT_OK, JAUNE_TITRE)
        eg = self.t("=", 56)
        f2 = frac(8, 35, 62, WHITE, VERT_OK, JAUNE_TITRE)
        env = self.t("≈", 56)
        r = self.t("0,23", 56, VERT_OK)
        ligne = suite(f1, eg, f2, env, r, buff=0.35).move_to(P(-1.2, -1.85))
        self.play(TransformFromCopy(tb.val[0][1], f1[0]), GrowFromCenter(f1[1]),
                  TransformFromCopy(tb.val[2][1], f1[2]), run_time=0.8)
        self.au_mot("égale 8 sur 35")
        self.play(FadeIn(eg), FadeIn(f2, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("environ 0,23")
        self.play(FadeIn(env), FadeIn(r, scale=0.6), run_time=0.5)
        ok = self.coche(taille=0.3).next_to(r, RIGHT, buff=0.4)
        self.play(Create(ok), run_time=0.4)
        self.insister(r, 0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 40
        l1 = suite(self.t("« Sachant D » :", fs, JAUNE_TITRE), self.t("on allume la ligne ou la colonne de D", fs),
                   buff=0.18)
        l2 = VGroup(self.t("Le bas de la fraction :", fs), self.t("le total de cette ligne ou de cette colonne", fs))
        l2.arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        l3 = self.t("Jamais le total général", fs, ROUGE_ERREUR)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 12.6:
            lignes.scale_to_fit_width(12.6)
        lignes.move_to(P(-0.3, 0.6))
        for mot, l in zip(["« Sachant D » : on", "Le bas de la fraction", "jamais le total général"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        fs2 = 36
        ch = suite(self.t("Prochaine vidéo :", fs2, VERT_OK), self.t("P(A ∩ B),", fs2),
                   VGroup(p_cond("A", "B", fs2), self.t(",", fs2)).arrange(RIGHT, buff=0.04, aligned_edge=DOWN),
                   p_cond("B", "A", fs2), self.t("?", fs2, VERT_OK), buff=0.22)
        ch.move_to(P(-0.9, -2.6))
        self.play(FadeIn(ch[:2], shift=UP * 0.15), run_time=0.6)
        self.au_mot("P indice A de B et")
        self.play(FadeIn(ch[2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("P indice B de A")
        self.play(FadeIn(ch[3:], shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_sachant()
        self.ecran_calcul()
        self.ecran_autre_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaTableauSTMG(ProbaTableauBase):
    identite = "Maths STMG — EleveAI"


class ProbaTableauPremiere(ProbaTableauBase):
    identite = "Maths 1re — EleveAI"


# 19/10 : la même vidéo pour la 1re SPÉ (micro jumelle, pack par classe).
class ProbaTableauPremiereSpe(ProbaTableauBase):
    identite = "Maths 1re spé — EleveAI"
