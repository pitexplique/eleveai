# proba_probaC_notation.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités conditionnelles », épisode 2 :
# la notation P_A(B) (micro : probaC_notation), AVEC VOIX. Paysage 16:9,
# CEINTURE BLEUE. Short jumeau : proba_probaC_notation_short.py (jaune).
#
# ⭐ La figure est CELLE DU COACH (banque stmg probabilites-conditionnelles,
# canvasTableau → `tableau_donnees`) : en-tête sombre, colonne des libellés
# bleu clair, cases blanches, ligne / colonne allumée en jaune. Elle est reprise
# de la 1re spé (premiere/proba_pc_conditionnelle.py : TableauCroise, p_cond).
# ⛔ PAS D'ÉCART : les cases restent VIDES (aucun effectif n'est dit).
#
# Écrans : 00 garde · 01 le tri des déchets (R, T) · 02 « parmi les
# recyclables » : la LIGNE R s'allume, le R DESCEND en indice → P_R(T) = 0,7 ·
# 03 lire : T entre parenthèses, R en indice · 04 l'autre sens : la COLONNE T
# s'allume → P_T(R) = 0,8 · 05 le piège : ligne puis colonne côte à côte ·
# 06 défi (épicerie bio, B / V) · 06b correction · 07 ce que tu as appris ·
# 08 abonnement.
#
# Voix : manim/voix/stmg-proba-notation.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaC_notation.py ProbaNotationSTMG -o eleveai-maths-stmg-proba-notation --media_dir manim/scripts/stmg/media
# ⭐ UNE voix, UN script, DEUX rendus (comme proba_bern_epreuve.py) : la micro
# 1re tronc commun alea_cond_notation est identique ; ProbaNotationPremiere
# ne change que l'identité (« Maths 1re — EleveAI »). La voix ne cite aucune classe.
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaC_notation.py ProbaNotationPremiere -o eleveai-maths-premiere-commun-proba-notation --media_dir manim/scripts/stmg/media-notation-1re
# Puis copier dans manim/sorties/premiere-commun/maths/probabilites/24-notation/ (le short
# n'affiche aucune classe : le short STMG y est copié sous le nom …-premiere-commun-…-short.mp4).
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/02-notation/.

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
from proba_pc_conditionnelle import ANNEAU, TableauCroise, lettre, p_cond, suite  # noqa: E402

JAUNE_BAC = "#FACC15"   # le bac jaune : recyclable
GRIS_BAC = "#64748B"    # la poubelle grise


class NotionSTMG(Notion6e):
    identite = "Maths STMG — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : déchets et bacs ───────────────────────────────────────────

def bouteille(s=1.0):
    corps = RoundedRectangle(width=0.42, height=0.85, corner_radius=0.12, fill_color="#22C55E", fill_opacity=0.85,
                             stroke_color=WHITE, stroke_width=2)
    col = Rectangle(width=0.18, height=0.25, fill_color="#22C55E", fill_opacity=0.85, stroke_color=WHITE,
                    stroke_width=2).next_to(corps, UP, buff=0)
    bouchon = Rectangle(width=0.22, height=0.08, fill_color=BLEU_CALCUL, fill_opacity=1,
                        stroke_width=0).next_to(col, UP, buff=0)
    return VGroup(corps, col, bouchon).scale(s)


def canette(s=1.0):
    corps = Rectangle(width=0.5, height=0.8, fill_color="#94A3B8", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    bande = Rectangle(width=0.5, height=0.26, fill_color="#DC2626", fill_opacity=1, stroke_width=0).move_to(corps)
    haut = Ellipse(width=0.5, height=0.12, fill_color="#CBD5E1", fill_opacity=1, stroke_color=WHITE,
                   stroke_width=2).move_to(corps.get_top())
    return VGroup(corps, bande, haut).scale(s)


def carton(s=1.0):
    boite = Rectangle(width=0.85, height=0.65, fill_color="#B45309", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2)
    scotch = Rectangle(width=0.14, height=0.65, fill_color="#FDE68A", fill_opacity=1, stroke_width=0).move_to(boite)
    return VGroup(boite, scotch).scale(s)


def trognon(s=1.0):
    haut = Circle(radius=0.22, fill_color="#DC2626", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    milieu = Rectangle(width=0.16, height=0.34, fill_color="#FEF3C7", fill_opacity=1, stroke_width=0)
    bas = Circle(radius=0.2, fill_color="#DC2626", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    haut.move_to(P(0, 0.3))
    bas.move_to(P(0, -0.3))
    tige = Line(P(0, 0.5), P(0.06, 0.68), color="#78350F", stroke_width=4)
    return VGroup(haut, bas, milieu, tige).scale(s)


def bac(couleur, s=1.0):
    cuve = Polygon(P(-0.65, 0.6), P(0.65, 0.6), P(0.52, -0.7), P(-0.52, -0.7), fill_color=couleur,
                   fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    couvercle = RoundedRectangle(width=1.5, height=0.16, corner_radius=0.05, fill_color=couleur, fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=2).next_to(cuve, UP, buff=0.02)
    rainures = VGroup(*[Line(P(x, 0.4), P(x * 0.85, -0.5), color=WHITE, stroke_width=2, stroke_opacity=0.5)
                        for x in (-0.3, 0.0, 0.3)])
    return VGroup(cuve, couvercle, rainures).scale(s)


def velo(s=1.0, couleur=BLEU_CALCUL):
    r1 = Circle(radius=0.38, stroke_color=WHITE, stroke_width=4).move_to(P(-0.6, 0))
    r2 = Circle(radius=0.38, stroke_color=WHITE, stroke_width=4).move_to(P(0.6, 0))
    pedalier = P(-0.05, 0)
    selle = P(-0.25, 0.55)
    guidon = P(0.42, 0.62)
    cadre = VMobject(stroke_color=couleur, stroke_width=5)
    cadre.set_points_as_corners([P(-0.6, 0), selle, pedalier, P(-0.6, 0)])
    cadre2 = VMobject(stroke_color=couleur, stroke_width=5)
    cadre2.set_points_as_corners([selle, P(0.35, 0.45), pedalier])
    fourche = Line(P(0.6, 0), guidon, color=couleur, stroke_width=5)
    poignee = Line(guidon, guidon + P(0.18, 0.04), color=WHITE, stroke_width=5)
    assise = Line(selle + P(-0.14, 0.04), selle + P(0.12, 0.04), color=WHITE, stroke_width=6)
    return VGroup(r1, r2, cadre, cadre2, fourche, poignee, assise).scale(s)


def panier_bio(s=1.0):
    corbeille = Polygon(P(-0.6, 0.15), P(0.6, 0.15), P(0.45, -0.5), P(-0.45, -0.5), fill_color="#A16207",
                        fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    anse = Arc(radius=0.5, start_angle=0, angle=PI, color=WHITE, stroke_width=4).move_to(P(0, 0.42))
    feuille = Ellipse(width=0.3, height=0.55, fill_color="#22C55E", fill_opacity=1, stroke_width=0).rotate(-0.6)
    feuille.move_to(P(-0.2, 0.3))
    pomme = Circle(radius=0.17, fill_color="#DC2626", fill_opacity=1, stroke_width=0).move_to(P(0.18, 0.25))
    carotte = Polygon(P(0.0, 0.5), P(0.12, 0.5), P(0.06, 0.05), fill_color="#F97316", fill_opacity=1,
                      stroke_width=0).rotate(0.4)
    return VGroup(anse, feuille, pomme, carotte, corbeille).scale(s)


def carte_lettre(lt, phrase, fs=32):
    """« R : « le déchet est recyclable » » sur une carte sombre."""
    g = suite(lettre(lt, fs + 6, BLEU_CALCUL), Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.15)
    fond = RoundedRectangle(width=g.width + 0.5, height=g.height + 0.4, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


class ProbaNotationSTMG(NotionSTMG):
    nom_voix = "stmg-proba-notation"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def tableau(self, centre, echelle, lignes=("Recyclable", "Non recyclable"), colonnes=("Bien trié", "Mal trié"),
                l_lig="R", l_col="T"):
        """Le tableau croisé du coach, 2 × 2, cases VIDES ; la lettre de la
        ligne 1 à sa gauche, celle de la colonne 1 au-dessus."""
        tb = TableauCroise(lignes=list(lignes), colonnes=list(colonnes), valeurs=[[None, None], [None, None]],
                           larg_lab=3.4, larg=2.2)
        lr = lettre(l_lig, 50, BLEU_CALCUL).next_to(tb.rect[1][0], LEFT, buff=0.2)
        lc = lettre(l_col, 50, BLEU_CALCUL).next_to(tb.rect[0][1], UP, buff=0.14)
        VGroup(tb, lr, lc).scale(echelle).move_to(centre)
        return tb, lr, lc

    def cadre_ligne(self, tb, i=0, color=ANNEAU):
        return SurroundingRectangle(VGroup(tb.rect[i + 1][0], tb.rect[i + 1][2]), color=color, buff=0.05,
                                    stroke_width=6)

    def cadre_colonne(self, tb, j=0, color=ANNEAU):
        return SurroundingRectangle(VGroup(tb.rect[0][j + 1], tb.rect[2][j + 1]), color=color, buff=0.05,
                                    stroke_width=6)

    def formule(self, cond, cible, fs=90):
        """P_cond(cible) : l'indice (le groupe) en jaune, la parenthèse en vert."""
        return p_cond(cond, cible, fs, WHITE, JAUNE_TITRE, VERT_OK)

    def descendre(self, source, f, cond, fs):
        """⭐ LE GESTE DE L'ÉPISODE : la lettre du groupe quitte le tableau, se
        pose à côté du P en grand… puis DESCEND en indice."""
        grand = lettre(cond, fs, JAUNE_TITRE)
        grand.next_to(f[0], RIGHT, buff=0.06).align_to(f[0], DOWN)
        self.play(FadeIn(f[0], shift=UP * 0.1), TransformFromCopy(source, grand), run_time=0.8)
        fl = Arrow(grand.get_right() + RIGHT * 0.25 + UP * 0.1, f[1].get_right() + RIGHT * 0.25 + DOWN * 0.05,
                   buff=0, color=JAUNE_TITRE, stroke_width=4, max_tip_length_to_length_ratio=0.35)
        self.play(GrowArrow(fl), run_time=0.3)
        self.play(ReplacementTransform(grand, f[1]), run_time=0.8)
        self.play(FadeOut(fl), Indicate(f[1], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.6)

    def egale(self, f, valeur, fs=90):
        eg = self.t("=", fs).next_to(f, RIGHT, buff=0.3)
        v = self.t(valeur, fs, JAUNE_TITRE).next_to(eg, RIGHT, buff=0.3)
        v.shift(UP * (f[0].get_bottom()[1] - v[0].get_bottom()[1]))
        eg.match_y(f[0])
        return eg, v

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        identite = self.t(self.identite, 28)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        f = self.formule("A", "B", 130).move_to(P(-0.6, 0.35))
        self.play(FadeIn(ech), run_time=0.5)
        a = lettre("A", 130, BLEU_CALCUL)
        a.move_to(P(-0.6, 2.4))
        self.play(FadeIn(a, scale=0.6), run_time=0.4)
        self.descendre(a, f, "A", 130)
        self.remove(a)
        self.play(FadeIn(f[2], shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("écrire une probabilité")
        titre = self.t("Écrire une probabilité conditionnelle", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite.next_to(titre, DOWN, buff=0.22)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), run_time=1.0)
        self.attendre_voix(marge=1.0)

    # ── 01 : le tri des déchets ─────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le tri des déchets")
        dechets = [bouteille(), canette(), carton(), trognon()]
        for d, x in zip(dechets, [-5.7, -4.5, -3.2, -1.9]):
            d.move_to(P(x, 1.5)).set_z_index(2)
        bj = bac(JAUNE_BAC).move_to(P(-4.9, -1.35))
        bg = bac(GRIS_BAC).move_to(P(-2.5, -1.35))
        self.au_mot("Une entreprise")
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.3) for d in dechets], lag_ratio=0.15),
                  FadeIn(bj), FadeIn(bg), run_time=1.0)
        self.au_mot("trie ses déchets")
        # bouteille et canette au bac jaune ; carton (erreur !) et trognon à la grise
        cibles = [P(-5.25, -1.05), P(-4.55, -1.05), P(-2.15, -1.1), P(-2.85, -1.05)]
        self.play(*[d.animate.scale(0.75).move_to(c) for d, c in zip(dechets, cibles)], run_time=1.0,
                  rate_func=rate_functions.ease_in_quad)
        self.au_mot("On note R")
        cR = carte_lettre("R", "« le déchet est recyclable »").move_to(P(2.3, 1.1))
        self.play(FadeIn(cR, shift=LEFT * 0.2), run_time=0.5)
        self.play(*[Indicate(d, color=BLEU_CALCUL, scale_factor=1.3) for d in dechets[:3]], run_time=0.8)
        self.au_mot("T : « il est bien trié")
        cT = carte_lettre("T", "« il est bien trié »").move_to(P(1.9, -0.3)).align_to(cR, LEFT)
        self.play(FadeIn(cT, shift=LEFT * 0.2), run_time=0.5)
        oks = VGroup(*[self.coche().next_to(dechets[k], UP, buff=0.12) for k in (0, 1, 3)])
        croix = VGroup(Line(P(-0.15, -0.15), P(0.15, 0.15)), Line(P(-0.15, 0.15), P(0.15, -0.15)))
        croix.set_stroke(ROUGE_ERREUR, 6).next_to(dechets[2], UP, buff=0.12)
        self.play(LaggedStart(*[Create(o) for o in oks], lag_ratio=0.2), Create(croix), run_time=0.8)
        self.attendre_voix()

    # ── 02 : « parmi les recyclables » → la LIGNE R, et R DESCEND ───────────

    def ecran_ecrire(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-ecrire")
        self.titre_ecran("On se place dans R")
        tb, lr, lc = self.tableau(P(-2.4, 0.5), 0.78)
        self.play(FadeIn(tb), FadeIn(lr), FadeIn(lc), run_time=0.5)
        self.au_mot("Parmi les déchets recyclables")
        q1 = self.t("« Parmi les déchets recyclables,", 32)
        q2 = suite(self.t("70 %", 32, JAUNE_TITRE), self.t("sont bien triés. »", 32), buff=0.15)
        q = suite(q1, q2, buff=0.18).move_to(P(-0.6, 2.4))
        self.play(FadeIn(q1, shift=UP * 0.15), *tb.etat(lignes=(0,)), run_time=0.7)
        self.au_mot("70 %")
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.4)
        self.insister(q2[0], 0.3)
        self.au_mot("On se place dans R")
        cad = self.cadre_ligne(tb)
        self.play(Create(cad), Indicate(lr, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.7)
        self.au_mot("R va en indice")
        f = self.formule("R", "T", 96)
        f.move_to(P(-2.6, -2.0))
        self.descendre(lr, f, "R", 96)
        self.au_mot("On écrit P indice R de T")
        self.play(FadeIn(f[2], shift=LEFT * 0.2), Indicate(lc, color=VERT_OK, scale_factor=1.6), run_time=0.6)
        self.au_mot("égale 0,7")
        eg, v = self.egale(f, "0,7", 96)
        self.play(FadeIn(eg), FadeIn(v, scale=0.6), run_time=0.5)
        self.insister(v, 0.35)
        self.attendre_voix()

    # ── 03 : lire la notation ───────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lire")
        self.titre_ecran("Lire la notation")
        tb, lr, lc = self.tableau(P(2.9, 1.2), 0.58)
        f = self.formule("R", "T", 120).move_to(P(-3.3, 1.2))
        self.play(FadeIn(f), FadeIn(tb), FadeIn(lr), FadeIn(lc), run_time=0.6)
        self.au_mot("probabilité de T sachant R")
        lu = suite(self.t("probabilité de", 36), lettre("T", 38, VERT_OK), self.t("sachant", 36),
                   lettre("R", 38, JAUNE_TITRE), buff=0.16)
        lu.move_to(P(-1.6, -0.45))
        self.play(FadeIn(lu, shift=UP * 0.15), run_time=0.6)
        self.au_mot("L'événement dont on parle")
        rT = SurroundingRectangle(f[2], color=VERT_OK, buff=0.08, stroke_width=5)
        l2 = suite(lettre("T", 34, VERT_OK), self.t(": l'événement dont on parle, entre parenthèses", 30), buff=0.14)
        l2.move_to(P(-6.4 + l2.width / 2, -1.45))
        self.play(Create(rT), FadeIn(l2, shift=RIGHT * 0.2), Indicate(lc, color=VERT_OK, scale_factor=1.5),
                  run_time=0.7)
        self.au_mot("Le groupe dans lequel")
        rR = SurroundingRectangle(f[1], color=JAUNE_TITRE, buff=0.08, stroke_width=5)
        l3 = suite(lettre("R", 34, JAUNE_TITRE), self.t(": le groupe où l'on se place, en bas, en indice", 30),
                   buff=0.14)
        l3.move_to(P(-6.4 + l3.width / 2, -2.35))
        self.play(Create(rR), FadeIn(l3, shift=RIGHT * 0.2), *tb.etat(lignes=(0,)), run_time=0.7)
        self.au_mot("en bas, en indice")
        self.play(FadeOut(rR), run_time=0.2)
        self.insister(f[1], 0.4)
        self.attendre_voix()

    # ── 04 : l'autre sens → la COLONNE T ────────────────────────────────────

    def ecran_autre_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-autre-sens")
        self.titre_ecran("Dans l'autre sens")
        tb, lr, lc = self.tableau(P(-2.4, 0.5), 0.78)
        self.play(FadeIn(tb), FadeIn(lr), FadeIn(lc), run_time=0.5)
        self.au_mot("Parmi les déchets bien triés")
        q1 = self.t("« Parmi les déchets bien triés,", 32)
        q2 = suite(self.t("80 %", 32, JAUNE_TITRE), self.t("sont recyclables. »", 32), buff=0.15)
        suite(q1, q2, buff=0.18).move_to(P(-0.6, 2.4))
        self.play(FadeIn(q1, shift=UP * 0.15), *tb.etat(colonnes=(0,)), run_time=0.7)
        self.au_mot("80 %")
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.4)
        self.insister(q2[0], 0.3)
        self.au_mot("on se place dans T")
        cad = self.cadre_colonne(tb)
        self.play(Create(cad), Indicate(lc, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.7)
        self.au_mot("P indice T de R")
        f = self.formule("T", "R", 96)
        f.move_to(P(-2.6, -2.0))
        self.descendre(lc, f, "T", 96)
        self.play(FadeIn(f[2], shift=LEFT * 0.2), Indicate(lr, color=VERT_OK, scale_factor=1.6), run_time=0.6)
        self.au_mot("égale 0,8")
        eg, v = self.egale(f, "0,8", 96)
        self.play(FadeIn(eg), FadeIn(v, scale=0.6), run_time=0.5)
        self.insister(v, 0.35)
        self.attendre_voix()

    # ── 05 : le piège : la LIGNE puis la COLONNE, côte à côte ───────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        tg, lrg, lcg = self.tableau(P(-3.9, 1.05), 0.5)
        td, lrd, lcd = self.tableau(P(1.9, 1.05), 0.5)
        self.play(FadeIn(VGroup(tg, lrg, lcg)), FadeIn(VGroup(td, lrd, lcd)), run_time=0.5)
        fg = self.formule("R", "T", 60)
        eg1, v1 = self.egale(fg, "0,7", 60)
        VGroup(fg, eg1, v1).move_to(P(-3.9, -1.0))
        fd = self.formule("T", "R", 60)
        eg2, v2 = self.egale(fd, "0,8", 60)
        VGroup(fd, eg2, v2).move_to(P(1.9, -1.0))
        self.au_mot("P indice R de T et")
        self.play(Write(fg), *tg.etat(lignes=(0,)), run_time=0.7)
        self.au_mot("P indice T de R, ce")
        self.play(Write(fd), *td.etat(colonnes=(0,)), run_time=0.7)
        self.au_mot("pas la même chose")
        neq = self.t("≠", 80, ROUGE_ERREUR).move_to(P(-1.0, -0.95))
        self.play(FadeIn(neq, scale=0.5), run_time=0.4)
        self.insister(neq, 0.3)
        self.au_mot("0,7 et")
        self.play(FadeIn(eg1), FadeIn(v1, scale=0.6), run_time=0.4)
        self.au_mot("et 0,8")
        self.play(FadeIn(eg2), FadeIn(v2, scale=0.6), run_time=0.4)
        self.au_mot("deux groupes différents")
        cg = self.cadre_ligne(tg)
        cd = self.cadre_colonne(td)
        ch1 = self.t("deux groupes différents,", 34, JAUNE_TITRE).move_to(P(-1.0, -2.2))
        ch2 = self.t("deux nombres différents", 34, VERT_OK).move_to(P(-1.0, -2.85))
        self.play(Create(cg), Create(cd), FadeIn(ch1, shift=UP * 0.15), run_time=0.7)
        self.au_mot("deux nombres différents")
        self.play(FadeIn(ch2, shift=UP * 0.15), run_time=0.4)
        self.play(v1.animate.scale(1.5), v2.animate.scale(1.5), run_time=0.35)
        self.play(v1.animate.scale(1 / 1.5), v2.animate.scale(1 / 1.5), run_time=0.35)
        self.attendre_voix()

    # ── 06 : défi : l'épicerie bio ──────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Une épicerie bio")
        pan = panier_bio(1.1).move_to(P(-5.4, 1.75))
        self.play(FadeIn(pan, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("B : « le client")
        cB = carte_lettre("B", "« le client achète bio »", 30)
        cB.move_to(P(-4.3 + cB.width / 2, 1.75))
        self.play(FadeIn(cB, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("V : « il vient")
        v = velo(1.0).move_to(P(-5.4, 0.4))
        cV = carte_lettre("V", "« il vient à vélo »", 30)
        cV.move_to(P(-4.3 + cV.width / 2, 0.4))
        self.play(FadeIn(v, shift=RIGHT * 0.4), FadeIn(cV, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("Parmi les clients qui achètent bio")
        q1 = self.t("« Parmi les clients qui achètent bio,", 34).move_to(P(-0.6, -0.85))
        self.play(FadeIn(q1, shift=UP * 0.15), Indicate(cB, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.6)
        self.au_mot("40 %")
        q2 = suite(self.t("40 %", 34, JAUNE_TITRE), self.t("viennent à vélo. »", 34), buff=0.15)
        q2.move_to(P(-0.6, -1.5))
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.4)
        self.insister(q2[0], 0.3)
        self.au_mot("Comment l'écrire")
        q3 = self.t("Comment l'écrire ?", 40, BLEU_CALCUL).move_to(P(-0.6, -2.25))
        self.play(FadeIn(q3, scale=0.7), run_time=0.4)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        tb, lr, lc = self.tableau(P(-2.4, 0.5), 0.78, lignes=("Bio", "Pas bio"), colonnes=("Vélo", "Pas vélo"),
                                  l_lig="B", l_col="V")
        self.add(tb, lr, lc)
        self.au_mot("On se place parmi les clients bio")
        cad = self.cadre_ligne(tb)
        self.play(*tb.etat(lignes=(0,)), run_time=0.6)
        self.play(Create(cad), Indicate(lr, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.6)
        self.au_mot("B va en indice")
        f = self.formule("B", "V", 96).move_to(P(-2.6, -1.95))
        self.descendre(lr, f, "B", 96)
        self.au_mot("P indice B de V")
        self.play(FadeIn(f[2], shift=LEFT * 0.2), Indicate(lc, color=VERT_OK, scale_factor=1.6), run_time=0.6)
        self.au_mot("égale 0,4")
        eg, v = self.egale(f, "0,4", 96)
        self.play(FadeIn(eg), FadeIn(v, scale=0.6), run_time=0.5)
        ok = self.coche(taille=0.3).next_to(v, RIGHT, buff=0.45)
        self.play(Create(ok), run_time=0.4)
        self.insister(v, 0.35)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = suite(self.formule("A", "B", fs + 6), self.t(": la probabilité de B sachant A", fs), buff=0.15)
        l2 = self.t("Le groupe où l'on se place va en indice", fs)
        l3 = suite(self.formule("A", "B", fs + 6), self.t("n'est pas", fs, ROUGE_ERREUR),
                   p_cond("B", "A", fs + 6, WHITE, JAUNE_TITRE, VERT_OK), buff=0.22)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.9, 0.5))
        for mot, l in zip(["P indice A de B : la", "Le groupe où", "P indice A de B n'est"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("Épisode 3 : calculer avec un tableau croisé", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ecrire()
        self.ecran_lire()
        self.ecran_autre_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaNotationPremiere(ProbaNotationSTMG):
    """Même vidéo pour la 1re tronc commun : seule l'identité change."""

    identite = "Maths 1re — EleveAI"
