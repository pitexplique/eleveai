# proba_probaC_distinguer.py
# EleveAI — Probabilités conditionnelles, commun STMG (micro : probaC_distinguer)
# et 1re tronc commun (micro : auto_proba_distinguer) : DISTINGUER P(A ∩ B),
# P_A(B) et P_B(A), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_probaC_distinguer_short.py (jaune).
#
# ⭐ UNE voix, UN script, DEUX rendus (règle du 18/10) : la classe de base porte
# toutes les scènes ; les deux sous-classes ne changent que l'identité.
#
# ⭐ La figure est CELLE DU COACH (banque stmg probabilites-conditionnelles,
# probaC_distinguer → canvasTableau → `tableau_donnees`) : en-tête sombre,
# colonne des libellés bleu clair, cases blanches, ligne / colonne allumée en
# jaune. Reprise de premiere/proba_pc_conditionnelle.py (TableauCroise, p_cond).
# ⛔ PAS D'ÉCART : seuls les nombres DITS sont dans le tableau (500, 300, 200,
# 120 ; le 80 de la correction quand la voix le dit). Les autres cases : vides.
#
# Écrans : 00 garde (les trois écritures) · 01 la boutique de seconde main ·
# 02 le tableau (ligne M, colonne F, le 120 au croisement) · 03 « et » : TOUT
# le tableau entouré, 120 / 500 = P(M ∩ F) · 04 « parmi les clients sur
# mobile » : la LIGNE M, 120 / 300 = P_M(F) · 05 « parmi les fidèles » : la
# COLONNE F, 120 / 200 = P_F(M) · 06 le piège : le même 120 en haut, les trois
# dénominateurs changent de couleur, le mot « parmi » · 07 défi · 07b
# correction (80 / 200 = P_F(M̄)) · 08 ce que tu as appris · 09 abonnement.
#
# Voix : manim/voix/stmg-premiere-proba-distinguer.json (débit −7).
# Rendus :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaC_distinguer.py ProbaDistinguerSTMG -o eleveai-maths-stmg-proba-distinguer --media_dir manim/scripts/stmg/media-probaC_distinguer
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaC_distinguer.py ProbaDistinguerPremiere -o eleveai-maths-premiere-commun-proba-distinguer --media_dir manim/scripts/stmg/media-probaC_distinguer
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_distinguer_short.py ShortProbaDistinguerSTMG -o eleveai-maths-stmg-proba-distinguer-short --media_dir manim/scripts/stmg/media-probaC_distinguer
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_distinguer_short.py ShortProbaDistinguerPremiere -o eleveai-maths-premiere-commun-proba-distinguer-short --media_dir manim/scripts/stmg/media-probaC_distinguer
# Puis copier les mp4 dans manim/sorties/stmg/maths/probabilites/04-distinguer/
# et manim/sorties/premiere-commun/maths/probabilites/04-distinguer/.

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
from proba_pc_conditionnelle_short import joueur  # noqa: E402

# les trois « bas de fraction » : tout le monde, le groupe M, le groupe F
C_TOUT = BLEU_CALCUL
C_M = JAUNE_TITRE
C_F = ORANGE_RETENUE
CLIENT = "#94A3B8"

LIGNES = ["Sur mobile", "Pas sur mobile", "Total"]
COLONNES = ["Fidèle", "Pas fidèle", "Total"]
# ⛔ seuls les nombres DITS ; le 80 n'apparaît qu'à la correction
VALEURS = [[120, None, 300], [80, None, None], [200, None, 500]]


def P(x, y):
    return np.array([x, y, 0.0])


def p_inter(a, b, fs=40, color=WHITE):
    return Text(f"P({a} ∩ {b})", font_size=fs, color=color)


def p_cond_barre(cond, cible, fs=40, color=WHITE, c_cond=None, c_cible=None):
    """P_cond(cible barre) : la barre sur l'événement entre parenthèses."""
    p = Text("P", font_size=fs, color=color)
    ind = lettre(cond, int(fs * 0.62), c_cond or color)
    ind.next_to(p, RIGHT, buff=0.03).align_to(p, DOWN).shift(DOWN * fs * 0.0045)
    po = Text("(", font_size=fs, color=color)
    lc = lettre(cible, fs, c_cible or color, barre=True)
    pf = Text(")", font_size=fs, color=color)
    po.next_to(ind, RIGHT, buff=0.03)
    lc.next_to(po, RIGHT, buff=0.03).align_to(p, DOWN)
    pf.next_to(lc, RIGHT, buff=0.03)
    for par in (po, pf):
        par.shift(UP * (p.get_center()[1] - par.get_center()[1]))
    return VGroup(p, ind, VGroup(po, lc, pf))


# ── les dessins : la boutique, le téléphone, la carte de fidélité ──────────

def boutique(s=1.0):
    mur = Rectangle(width=3.4, height=2.4, fill_color="#334155", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    mur.move_to(P(0, -0.4))
    bandes = VGroup()
    for k in range(8):
        x = -1.7 + 0.425 * (k + 0.5)
        tri = Polygon(P(x - 0.2125, 1.15), P(x + 0.2125, 1.15), P(x + 0.2125, 0.75), P(x, 0.6), P(x - 0.2125, 0.75),
                      fill_color=(ROUGE_ERREUR if k % 2 == 0 else WHITE), fill_opacity=1, stroke_width=0)
        bandes.add(tri)
    enseigne = RoundedRectangle(width=2.6, height=0.5, corner_radius=0.1, fill_color="#0F172A", fill_opacity=1,
                                stroke_color=JAUNE_TITRE, stroke_width=2).move_to(P(0, 1.5))
    mot = Text("Seconde main", font_size=24, color=JAUNE_TITRE).move_to(enseigne)
    vitrine = Rectangle(width=1.8, height=1.5, fill_color="#BAE6FD", fill_opacity=0.35, stroke_color=WHITE,
                        stroke_width=2).move_to(P(-0.6, -0.6))
    porte = Rectangle(width=0.7, height=1.6, fill_color="#78350F", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2).move_to(P(1.0, -0.8))
    poignee = Dot(P(0.78, -0.8), radius=0.05, color=JAUNE_TITRE)
    tringle = Line(P(-1.35, -0.05), P(0.15, -0.05), color=WHITE, stroke_width=3)
    habits = VGroup()
    for x, c in ((-1.05, "#22C55E"), (-0.6, "#A855F7"), (-0.15, "#F97316")):
        cintre = VMobject(stroke_color=WHITE, stroke_width=2)
        cintre.set_points_as_corners([P(x - 0.18, -0.25), P(x, -0.12), P(x + 0.18, -0.25)])
        tee = Polygon(P(x - 0.2, -0.25), P(x + 0.2, -0.25), P(x + 0.17, -0.4), P(x + 0.13, -0.4), P(x + 0.13, -0.8),
                      P(x - 0.13, -0.8), P(x - 0.13, -0.4), P(x - 0.17, -0.4), fill_color=c, fill_opacity=1,
                      stroke_color=WHITE, stroke_width=1.5)
        habits.add(VGroup(cintre, tee))
    return VGroup(mur, bandes, enseigne, mot, vitrine, tringle, habits, porte, poignee).scale(s)


def telephone(s=1.0):
    corps = RoundedRectangle(width=0.42, height=0.74, corner_radius=0.08, fill_color="#0F172A", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2.5)
    ecran = RoundedRectangle(width=0.32, height=0.52, corner_radius=0.03, fill_color=BLEU_CALCUL, fill_opacity=0.8,
                             stroke_width=0).move_to(corps).shift(UP * 0.03)
    bouton = Dot(radius=0.025, color=WHITE).move_to(corps.get_bottom() + UP * 0.07)
    return VGroup(corps, ecran, bouton).scale(s)


def carte_fidelite(s=1.0):
    carte = RoundedRectangle(width=0.8, height=0.52, corner_radius=0.07, fill_color="#B91C1C", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2.5)
    et = Star(5, outer_radius=0.15, inner_radius=0.065, fill_color=JAUNE_TITRE, fill_opacity=1,
              stroke_width=0).move_to(carte).shift(LEFT * 0.18)
    lig = VGroup(*[Line(P(0, 0), P(0.26, 0), color=WHITE, stroke_width=2) for _ in range(2)])
    lig.arrange(DOWN, buff=0.1).move_to(carte).shift(RIGHT * 0.17)
    return VGroup(carte, et, lig).scale(s)


def foule(n=10, s=1.0):
    return VGroup(*[joueur(CLIENT, 1.0) for _ in range(n)]).arrange(RIGHT, buff=0.08).scale(s)


class ProbaDistinguerBase(Notion6e):
    nom_voix = "stmg-premiere-proba-distinguer"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def tableau(self, centre, echelle, poses=((0, 0), (0, 2), (2, 0), (2, 2))):
        """Le tableau croisé du coach ; seules les cases `poses` portent leur
        nombre. La lettre M à gauche de la ligne 1, F au-dessus de la colonne 1."""
        tb = TableauCroise(lignes=LIGNES, colonnes=COLONNES, valeurs=VALEURS, larg_lab=3.6, larg=2.1)
        lm = lettre("M", 50, BLEU_CALCUL).next_to(tb.rect[1][0], LEFT, buff=0.2)
        lf = lettre("F", 50, BLEU_CALCUL).next_to(tb.rect[0][1], UP, buff=0.14)
        VGroup(tb, lm, lf).scale(echelle).move_to(centre)
        tb.remove(tb.vals)
        for (i, j) in poses:
            tb.add(tb.val[i][j])
            tb.posees.add((i, j))
        return tb, lm, lf

    def cadre_tout(self, tb, color=ANNEAU):
        return SurroundingRectangle(VGroup(tb.rect[1][1], tb.rect[3][3]), color=color, buff=0.05, stroke_width=6)

    def cadre_ligne(self, tb, i=0, color=ANNEAU):
        return SurroundingRectangle(VGroup(tb.rect[i + 1][0], tb.rect[i + 1][3]), color=color, buff=0.05,
                                    stroke_width=6)

    def cadre_colonne(self, tb, j=0, color=ANNEAU):
        return SurroundingRectangle(VGroup(tb.rect[0][j + 1], tb.rect[3][j + 1]), color=color, buff=0.05,
                                    stroke_width=6)

    def formule(self, cond, cible, fs=90, c_cond=JAUNE_TITRE):
        return p_cond(cond, cible, fs, WHITE, c_cond, VERT_OK)

    def descendre(self, source, f, cond, fs, color=JAUNE_TITRE):
        """La lettre du groupe quitte le tableau, se pose à côté du P… puis
        DESCEND en indice (le geste de la série)."""
        grand = lettre(cond, fs, color)
        grand.next_to(f[0], RIGHT, buff=0.06).align_to(f[0], DOWN)
        self.play(FadeIn(f[0], shift=UP * 0.1), TransformFromCopy(source, grand), run_time=0.7)
        self.play(ReplacementTransform(grand, f[1]), run_time=0.7)
        self.play(FadeIn(f[2], shift=LEFT * 0.2), Indicate(f[1], color=color, scale_factor=1.6), run_time=0.6)

    def phrase(self, morceaux, y=2.55, fs=32):
        """La phrase entre guillemets, morceau par morceau (texte, couleur)."""
        g = suite(*[self.t(m, fs, c) for m, c in morceaux], buff=0.14)
        if g.width > 12.6:
            g.scale_to_fit_width(12.6)
        return g.move_to(P(0, y))

    def calcul(self, tb, case_d, d, c_d, valeur, centre):
        """120 / d = valeur, les nombres partent du tableau. Renvoie les morceaux."""
        fr = frac(120, d, 72, WHITE, color_d=c_d)
        eg = self.t("=", 72)
        v = self.t(valeur, 72, JAUNE_TITRE)
        g = suite(fr, eg, v, buff=0.3).move_to(centre)
        return fr, eg, v

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.7))
        f1 = p_inter("A", "B", 64)
        f2 = self.formule("A", "B", 64)
        f3 = self.formule("B", "A", 64)
        trio = suite(f1, f2, f3, buff=1.0).move_to(P(-0.6, 0.15))
        self.play(FadeIn(ech), FadeIn(f1, shift=UP * 0.2), run_time=0.6)
        self.au_mot("P indice A de B")
        self.play(FadeIn(f2, shift=UP * 0.2), run_time=0.5)
        self.au_mot("P indice B de A")
        self.play(FadeIn(f3, shift=UP * 0.2), run_time=0.5)
        self.au_mot("trois nombres")
        titre = self.t("Trois nombres à ne pas confondre", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        neq = VGroup(*[self.t("≠", 60, ROUGE_ERREUR).move_to((a.get_right() + b.get_left()) / 2)
                       for a, b in ((f1, f2), (f2, f3))])
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(neq, scale=0.5), run_time=1.0)
        self.attendre_voix(marge=1.0)

    # ── 01 : la boutique de seconde main ────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.mascotte = self.add_mascotte()
        self.dire("01-situation")
        titre = self.titre_ecran("La boutique de seconde main")
        bt = boutique(1.05).move_to(P(-4.9, 0.0))
        self.play(FadeIn(bt, shift=UP * 0.2), run_time=0.6)
        x0 = -2.4
        lignes = []
        specs = [("500 clients", "500", foule(5, 0.9), 1.9),
                 ("300 achètent sur leur téléphone", "300", telephone(1.0), 0.75),
                 ("200 sont des clients fidèles", "200", carte_fidelite(1.0), -0.4),
                 ("120 sont les deux à la fois", "120",
                  suite(telephone(0.8), carte_fidelite(0.8), buff=0.08), -1.55)]
        mots = ["500 clients", "300 achètent", "200 sont", "120 sont"]
        for (texte, nb, icone, y), mot in zip(specs, mots):
            icone.move_to(P(x0 + 0.55, y))
            n = self.t(nb, 40, JAUNE_TITRE)
            reste = self.t(texte[len(nb) + 1:], 33)
            ligne = suite(n, reste, buff=0.18)
            ligne.next_to(icone, RIGHT, buff=0.3)
            if icone.width > 1.0:
                ligne.next_to(icone, RIGHT, buff=0.2)
            ligne.align_to(P(x0 + 1.5, 0), LEFT)
            self.au_mot(mot)
            self.play(FadeIn(icone, shift=RIGHT * 0.2), FadeIn(ligne, shift=RIGHT * 0.2), run_time=0.5)
            self.insister(n, 0.25)
            lignes.append((icone, n, reste))
        self.attendre_voix(marge=0.4)
        return titre, bt, lignes

    # ── 02 : le tableau ; les nombres de la boutique rejoignent leurs cases ──

    def ecran_tableau(self, avant):
        titre1, bt, lignes = avant
        self.dire("02-tableau")
        tb, lm, lf = self.tableau(P(-0.5, -0.35), 0.88, poses=())
        titre = self.t("Le tableau", 40, JAUNE_TITRE).to_edge(UP)
        restes = VGroup(bt, *[VGroup(ic, r) for ic, n, r in lignes])
        n500, n300, n200, n120 = [n for ic, n, r in lignes]
        self.play(ReplacementTransform(titre1, titre), FadeOut(restes), FadeOut(n120), FadeIn(tb, shift=UP * 0.2),
                  n500.animate.move_to(P(-5.6, 2.6)), n300.animate.move_to(P(-4.6, 2.6)),
                  n200.animate.move_to(P(-3.6, 2.6)), run_time=0.9)
        self.au_mot("dans un tableau")
        for n, (i, j) in ((n500, (2, 2)), (n300, (0, 2)), (n200, (2, 0))):
            tb.posees.add((i, j))
        self.play(ReplacementTransform(n500, tb.val[2][2]), ReplacementTransform(n300, tb.val[0][2]),
                  ReplacementTransform(n200, tb.val[2][0]), run_time=0.9)
        self.au_mot("Ligne M")
        self.play(FadeIn(lm, scale=1.6), *tb.etat(lignes=(0,)), run_time=0.6)
        self.insister(lm, 0.3)
        self.au_mot("Colonne F")
        self.play(FadeIn(lf, scale=1.6), *tb.etat(colonnes=(0,)), run_time=0.6)
        self.insister(lf, 0.3)
        self.au_mot("120")
        self.play(*tb.etat(cases=((0, 0),), eteindre=False), run_time=0.4)
        self.play(FadeIn(tb.val[0][0], scale=1.8), run_time=0.5)
        tb.posees.add((0, 0))
        tb.add(tb.val[0][2], tb.val[2][2], tb.val[2][0], tb.val[0][0])
        self.insister(tb.val[0][0], 0.35)
        self.attendre_voix()

    # ── 03 / 04 / 05 : les trois phrases, le même 120, trois bas ────────────

    def ecran_phrase(self, cle, titre_txt, morceaux, mots, mode, d, case_d, c_d, valeur, ecriture):
        """Un écran « phrase » : la phrase, la zone du tableau qui sert de
        « tous », la fraction 120 / d, puis la notation."""
        self.clear()
        self.add_mascotte()
        self.dire(cle)
        self.titre_ecran(titre_txt)
        tb, lm, lf = self.tableau(P(-2.75, -0.45), 0.72)
        self.play(FadeIn(tb), FadeIn(lm), FadeIn(lf), run_time=0.5)
        q = self.phrase(morceaux, y=2.3)
        m_phrase, m_zone, m_frac, m_eg, m_not = mots
        self.au_mot(m_phrase)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.6)
        self.insister(q[1], 0.3)
        if mode == "tout":
            # « Et », sans « parmi » : le ET de la phrase grossit
            self.au_mot("« Et », sans")
            self.insister(q[3], 0.35)
        self.au_mot(m_zone)
        if mode == "tout":
            cad = self.cadre_tout(tb)
            anims = tb.etat(cases=((0, 0), (2, 2)), eteindre=False)
            src = lm
        elif mode == "ligne":
            cad = self.cadre_ligne(tb)
            anims = tb.etat(lignes=(0,))
            src = lm
        else:
            cad = self.cadre_colonne(tb)
            anims = tb.etat(colonnes=(0,))
            src = lf
        self.play(Create(cad), *anims, run_time=0.7)
        if mode != "tout":
            self.play(Indicate(src, color=c_d, scale_factor=1.6), run_time=0.5)
        else:
            self.play(Indicate(tb.val[2][2], color=c_d, scale_factor=1.6), run_time=0.5)
        self.au_mot(m_frac)
        fr, eg, v = self.calcul(tb, case_d, d, c_d, valeur, P(3.75, 0.0))
        self.play(TransformFromCopy(tb.val[0][0], fr[0]), Create(fr[1]),
                  TransformFromCopy(tb.val[case_d[0]][case_d[1]], fr[2]), run_time=0.9)
        self.insister(fr[2], 0.3)
        self.au_mot(m_eg)
        self.play(FadeIn(eg), FadeIn(v, scale=0.6), run_time=0.5)
        self.au_mot(m_not)
        f = ecriture
        f.move_to(P(3.4, -2.0))
        if mode == "tout":
            self.play(Write(f), run_time=0.8)
        else:
            self.descendre(src, f, "M" if src is lm else "F", 80, c_d)
        self.insister(f, 0.35)
        self.attendre_voix()

    def ecran_inter(self):
        self.ecran_phrase(
            "03-inter", "Première phrase",
            [("«", WHITE), ("24 %", JAUNE_TITRE), ("des clients achètent sur mobile", WHITE), ("ET", BLEU_CALCUL),
             ("sont fidèles. »", WHITE)],
            ["Première phrase", "on divise par tous", "120 sur 500", "égale 0,24", "C'est P de M inter F"],
            "tout", 500, (2, 2), C_TOUT, "0,24", p_inter("M", "F", 80))

    def ecran_sachant_m(self):
        self.ecran_phrase(
            "04-sachant-m", "Deuxième phrase",
            [("« parmi les clients sur mobile,", WHITE), ("40 %", JAUNE_TITRE), ("sont fidèles. »", WHITE)],
            ["Deuxième phrase", "On allume la ligne M", "120 sur 300", "égale 0,4", "C'est P indice M de F"],
            "ligne", 300, (0, 2), C_M, "0,4", self.formule("M", "F", 80, C_M))

    def ecran_sachant_f(self):
        self.ecran_phrase(
            "05-sachant-f", "Troisième phrase",
            [("« parmi les clients fidèles,", WHITE), ("60 %", JAUNE_TITRE), ("achètent sur mobile. »", WHITE)],
            ["Troisième phrase", "On allume la colonne F", "120 sur 200", "égale 0,6", "C'est P indice F de M"],
            "colonne", 200, (2, 0), C_F, "0,6", self.formule("F", "M", 80, C_F))

    # ── 06 : le piège : le même 120 en haut, trois bas ──────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        xs = (-5.0, -0.7, 3.6)
        formules = [p_inter("M", "F", 54), self.formule("M", "F", 54, C_M), self.formule("F", "M", 54, C_F)]
        bas = (500, 300, 200)
        couleurs = (C_TOUT, C_M, C_F)
        valeurs = ("0,24", "0,4", "0,6")
        fracs, egs = [], []
        for x, f, d, v in zip(xs, formules, bas, valeurs):
            f.move_to(P(x, 1.75))
            fr = frac(120, d, 56)
            eg = suite(self.t("=", 50), self.t(v, 50, JAUNE_TITRE), buff=0.18)
            suite(fr, eg, buff=0.25).move_to(P(x, 0.0))
            fracs.append(fr)
            egs.append(eg)
        self.play(*[FadeIn(f, shift=DOWN * 0.15) for f in formules], run_time=0.6)
        self.play(*[FadeIn(fr) for fr in fracs], run_time=0.6)
        self.au_mot("le même 120")
        hauts = VGroup(*[fr[0] for fr in fracs])
        cad = VGroup(*[SurroundingRectangle(h, color=JAUNE_TITRE, buff=0.1, stroke_width=4) for h in hauts])
        self.play(Create(cad), *[Indicate(h, color=JAUNE_TITRE, scale_factor=1.5) for h in hauts], run_time=0.8)
        self.au_mot("trois nombres différents")
        self.play(LaggedStart(*[FadeIn(e, shift=LEFT * 0.2) for e in egs], lag_ratio=0.3), run_time=0.9)
        self.au_mot("le bas de la fraction")
        self.play(FadeOut(cad), run_time=0.2)
        for fr, c in zip(fracs, couleurs):
            self.play(fr[2].animate.set_color(c).scale(1.5), run_time=0.3)
            self.play(fr[2].animate.scale(1 / 1.5), run_time=0.25)
        self.au_mot("cherche le mot")
        parmi = self.t("« parmi »", 52, VERT_OK).move_to(P(-0.5, -1.9))
        self.play(FadeIn(parmi, scale=0.6), run_time=0.5)
        self.insister(parmi, 0.3)
        self.au_mot("il te dit")
        suite_parmi = self.t("le groupe où tu te places", 38, VERT_OK)
        g = suite(parmi.copy(), self.t(":", 44, VERT_OK), suite_parmi, buff=0.2).move_to(P(-0.5, -1.9))
        self.play(parmi.animate.move_to(g[0]), FadeIn(g[1]), FadeIn(suite_parmi, shift=LEFT * 0.2), run_time=0.6)
        self.attendre_voix()

    # ── 07 : défi ; 07b : correction ────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tb, lm, lf = self.tableau(P(-0.8, 0.75), 0.68)
        self.play(FadeIn(tb), FadeIn(lm), FadeIn(lf), run_time=0.5)
        self.au_mot("Quelle est")
        q1 = self.t("La probabilité qu'un client fidèle", 36).move_to(P(-0.8, -1.25))
        q2 = self.t("n'achète pas sur mobile ?", 36, BLEU_CALCUL).move_to(P(-0.8, -1.9))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("n'achète pas")
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        tb, lm, lf = self.tableau(P(-2.75, -0.3), 0.72)
        self.add(tb, lm, lf)
        self.titre_ecran("Correction")
        self.au_mot("On allume la colonne F")
        cad = self.cadre_colonne(tb)
        self.play(Create(cad), *tb.etat(colonnes=(0,)), Indicate(lf, color=C_F, scale_factor=1.6), run_time=0.8)
        self.au_mot("200 clients")
        self.insister(tb.val[2][0], 0.3)
        self.au_mot("dont 120")
        self.insister(tb.val[0][0], 0.3)
        self.au_mot("Donc 80")
        tb.posees.add((1, 0))
        self.play(FadeIn(tb.val[1][0], scale=1.8), run_time=0.5)
        tb.add(tb.val[1][0])
        self.insister(tb.val[1][0], 0.3)
        self.au_mot("80 sur 200")
        fr = frac(80, 200, 72, WHITE, color_d=C_F)
        eg = self.t("=", 72)
        v = self.t("0,4", 72, JAUNE_TITRE)
        suite(fr, eg, v, buff=0.3).move_to(P(3.75, 0.45))
        self.play(TransformFromCopy(tb.val[1][0], fr[0]), Create(fr[1]), TransformFromCopy(tb.val[2][0], fr[2]),
                  run_time=0.9)
        self.au_mot("égale 0,4")
        self.play(FadeIn(eg), FadeIn(v, scale=0.6), run_time=0.5)
        self.au_mot("C'est P indice F")
        f = p_cond_barre("F", "M", 80, WHITE, C_F, VERT_OK).move_to(P(3.3, -1.75))
        self.descendre(lf, f, "F", 80, C_F)
        ok = self.coche(taille=0.3).next_to(f, RIGHT, buff=0.45)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 40
        l1 = VGroup(self.coche(), self.t("Le haut de la fraction est souvent le même", fs - 4)).arrange(RIGHT, buff=0.3)
        l2 = VGroup(self.coche(), self.t("Le bas décide :", fs)).arrange(RIGHT, buff=0.3)
        subs = [suite(p_inter("A", "B", fs + 4), self.t(": tout le monde", fs, C_TOUT), buff=0.2),
                suite(self.formule("A", "B", fs + 4, C_M), self.t(": le groupe A", fs, C_M), buff=0.2),
                suite(self.formule("B", "A", fs + 4, C_F), self.t(": le groupe B", fs, C_F), buff=0.2)]
        l1.move_to(P(-0.8, 2.25))
        l1.align_to(P(-6.0, 0), LEFT)
        l2.next_to(l1, DOWN, buff=0.45).align_to(l1, LEFT)
        for k, s in enumerate(subs):
            s.move_to(P(0, 0.45 - 0.8 * k)).align_to(P(-4.6, 0), LEFT)
        self.au_mot("Le haut")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(l1[0]), run_time=0.4)
        self.au_mot("Le bas décide")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.5)
        self.play(Create(l2[0]), run_time=0.4)
        for mot, s in zip(["tout le monde", "le groupe A", "le groupe B"], subs):
            self.au_mot(mot)
            self.play(FadeIn(s, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Prochaine vidéo")
        pv = VGroup(self.t("Prochaine vidéo :", 30, VERT_OK),
                    self.t("dire une probabilité conditionnelle par une phrase", 28, VERT_OK))
        pv.arrange(DOWN, buff=0.18).move_to(P(-1.2, -2.75))
        self.play(Write(pv), run_time=1.2)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        avant = self.ecran_situation()
        self.ecran_tableau(avant)
        self.ecran_inter()
        self.ecran_sachant_m()
        self.ecran_sachant_f()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaDistinguerSTMG(ProbaDistinguerBase):
    identite = "Maths STMG — EleveAI"


class ProbaDistinguerPremiere(ProbaDistinguerBase):
    identite = "Maths 1re — EleveAI"
