# proba2_contraire.py
# EleveAI — Maths 2de — série « Probabilités », épisode 4 : l'événement
# contraire (micro : proba_evenement_contraire), AVEC VOIX. Paysage 16:9,
# CEINTURE BLEUE. Short jumeau : proba2_contraire_short.py (ceinture jaune).
#
# Écrans : 00 garde · 01 deux dés, « total différent de 12 » · 02 compter les
# 35 cases : long · 03 le contraire « égal à 12 » : UNE case (6 et 6), P(Ā) =
# 1/36 · 04 P(A) = 1 − P(Ā) = 35/36 · 05 « au moins un 6 » : les 25 cases
# « aucun 6 », puis les 11 autres · 06 le piège « deux 6 » · 07 défi « total au
# moins 3 » · 07b correction · 08 ce que tu as appris · 09 fin.
#
# ⭐ Canvas du coach repris (lib/tutor-v4/components/ProbabilitesCanvas.tsx) :
#   · variant « tableau » : en-têtes gris clair (#f1f5f9), cases blanches bordées
#     slate-300, cases SURLIGNÉES ambre (#fef3c7, bord #fbbf24) = l'événement ;
#     le contraire en bleu clair (#dbeafe, bord #3b82f6), comme l'épisode 1 ;
#   · variant « de » : les en-têtes sont des FACES de dé dessinées (carré
#     arrondi clair, points sombres) : ⛔ aucun nombre non dit dans le tableau.
#
# Voix : manim/voix/seconde-proba-contraire.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_contraire.py Proba2Contraire -o eleveai-maths-seconde-proba-contraire --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/04-contraire/.

import importlib.util
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parent / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402


def _charger(nom, chemin):
    """Un module chargé par son CHEMIN EXACT (des homonymes existent ailleurs)."""
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_modele = _charger("proba_modele_2de", ICI / "proba_modele.py")
_signes = _charger("signes_expression_2de_c", ICI / "signes_expression_2de.py")
_annonce = _charger("annonce_probabilites_c", ICI.parent / "annonce" / "annonce_probabilites.py")

face_coach = _modele.face_coach
frac_txt = _modele.frac_txt
echelle_ceintures = _signes.echelle_ceintures
de_qui_roule = _annonce.de_qui_roule
de = _annonce.de

# Les couleurs du canvas « tableau » du coach.
ENTETE_FOND = "#F1F5F9"
CASE_BORD = "#CBD5E1"
ENCRE = "#1E293B"
AMBRE_FOND = "#FEF3C7"
AMBRE_BORD = "#FBBF24"
BLEU_FOND = "#DBEAFE"
BLEU_BORD = "#3B82F6"
ROUGE_FOND = "#FEE2E2"
ROUGE_BORD = "#EF4444"


def P(x, y):
    return np.array([x, y, 0.0])


class NotionSeconde4(Notion6e):
    identite = "Maths 2de — EleveAI"


# ── le texte avec des A barre ───────────────────────────────────────────────

def txt_barre(s, fs=40, color=WHITE):
    """Un Text où chaque « Ā » devient un A surmonté d'un trait dessiné."""
    T = Text(s.replace("Ā", "A"), font_size=fs, color=color)
    pleins = [c for c in s if not c.isspace()]
    g = VGroup(T)
    if len(T) != len(pleins):  # ligature : on n'ose pas indexer
        return g
    ep = max(2.5, fs / 13)
    for k, c in enumerate(pleins):
        if c == "Ā":
            a = T[k]
            y = a.get_top()[1] + fs * 0.0028
            g.add(Line(P(a.get_left()[0] - 0.01, y), P(a.get_right()[0] + 0.01, y), color=color, stroke_width=ep))
    return g


# ── le tableau 6 × 6 des deux dés (canvas « tableau » du coach) ─────────────

class TableauDes(VGroup):
    """En-têtes = faces dessinées (dé 1 en ligne, dé 2 en colonne) ; 36 cases
    VIDES (aucun nombre non dit). self.cases[(i, j)], self.lig[i], self.col[j]."""

    def __init__(self, cell=0.6):
        super().__init__()
        self.cell = cell
        self.cases, self.lig, self.col = {}, {}, {}
        coin = Square(cell, fill_color=ENTETE_FOND, fill_opacity=1, stroke_color=CASE_BORD, stroke_width=2)
        self.entetes = VGroup(coin)
        for k in range(1, 7):
            for pos, d in ((P(k * cell, 0), self.col), (P(0, -k * cell), self.lig)):
                sq = Square(cell, fill_color=ENTETE_FOND, fill_opacity=1, stroke_color=CASE_BORD,
                            stroke_width=2).move_to(pos)
                f = face_coach(k, cell * 0.74).move_to(pos)
                d[k] = VGroup(sq, f)
                self.entetes.add(d[k])
        self.grille = VGroup()
        for i in range(1, 7):
            for j in range(1, 7):
                sq = Square(cell, fill_color=WHITE, fill_opacity=1, stroke_color=CASE_BORD,
                            stroke_width=2).move_to(P(j * cell, -i * cell))
                self.cases[(i, j)] = sq
                self.grille.add(sq)
        self.add(self.entetes, self.grille)

    def lot(self, filtre):
        return [c for (i, j), c in self.cases.items() if filtre(i, j)]

    @staticmethod
    def allumer(cases, fond=AMBRE_FOND, bord=AMBRE_BORD, lag=0.0, run_time=0.6):
        for c in cases:
            c.set_z_index(1)
        anims = [c.animate.set_fill(fond, 1).set_stroke(bord, 4) for c in cases]
        if lag:
            return LaggedStart(*anims, lag_ratio=lag, run_time=run_time)
        return AnimationGroup(*anims, run_time=run_time)

    @staticmethod
    def poser(cases, fond, bord):
        for c in cases:
            c.set_fill(fond, 1).set_stroke(bord, 4)
        # les bords épais des cases allumées passent devant les cases voisines
        for c in cases:
            c.set_z_index(1)

    def eteindre(self, run_time=0.4):
        return AnimationGroup(*[c.animate.set_fill(WHITE, 1).set_stroke(CASE_BORD, 2)
                                for c in self.cases.values()], run_time=run_time)


class Proba2Contraire(NotionSeconde4):
    nom_voix = "seconde-proba-contraire"

    X_T = -3.75     # le centre du tableau (à gauche)
    Y_T = -0.4
    X_D = -0.75     # le bord gauche de la colonne de droite

    # ── petits outils ───────────────────────────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.2):
        """Des morceaux côte à côte : un str (Text, Ā barré) ou un Mobject."""
        return VGroup(*[m if isinstance(m, Mobject) else txt_barre(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def a_gauche(self, mob, y):
        return mob.move_to(P(0, y)).align_to(P(self.X_D, 0), LEFT)

    def insister(self, mob, run_time=0.35, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, sw=7):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=ROUGE_ERREUR)

    def etiquette(self, texte, color, font_size=30):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def pf(self, num, den, fs=40, color=WHITE):
        return frac_txt(num, den, fs, color)

    def tableau(self, cell=0.7, centre=None):
        tab = TableauDes(cell)
        return tab.move_to(centre if centre is not None else P(self.X_T, self.Y_T))

    def deux_des(self, x1, x2, y, cote=1.3):
        d1 = de_qui_roule(P(x1, y), cote, periode=0.16)
        d2 = de_qui_roule(P(x2, y), cote, periode=0.2, faces=[4, 1, 6, 2, 5, 3])
        return d1, d2

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'événement contraire", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        d1, d2 = self.deux_des(-1.7, 0.5, 0.55)
        self.add(d1, d2)
        self.au_mot("le chemin le plus court")
        q = self.t("le chemin le plus court", 44, BLEU_CALCUL).move_to(P(-0.6, -1.05))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.insister(q, 0.3, 1.15)
        self.attendre_voix(marge=1.0)
        d1.clear_updaters()
        d2.clear_updaters()

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Deux dés")
        self.au_mot("On lance deux dés")
        d1, d2 = self.deux_des(-3.4, -0.2, 1.0, 1.5)
        self.add(d1, d2)
        self.au_mot("on additionne")
        plus = self.t("+", 80, JAUNE_TITRE).move_to(P(-1.8, 1.0))
        self.play(FadeIn(plus, scale=0.5), run_time=0.4)
        self.au_mot("différent de 12")
        q = self.ligne([("P(total différent de 12)", WHITE), ("=", WHITE), ("?", ORANGE_RETENUE)], 44, 0.25)
        q.move_to(P(-0.9, -1.15))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.insister(q[2], 0.3)
        self.attendre_voix()
        d1.clear_updaters()
        d2.clear_updaters()

    # ── 02 : compter les 35 cases ? c'est long ──────────────────────────────

    def ecran_long(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-long")
        self.titre_ecran("Compter ?")
        tab = self.tableau()
        self.play(FadeIn(tab), run_time=0.6)
        self.au_mot("les 35 cases")
        r1 = self.ligne([("35", AMBRE_BORD), ("cases", WHITE)], 44, 0.2)
        self.a_gauche(r1, 1.2)
        r2 = self.t("qui ne font pas 12", 38).next_to(r1, DOWN, buff=0.3).align_to(r1, LEFT)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("qui ne font pas 12")
        self.play(FadeIn(r2, shift=RIGHT * 0.2), run_time=0.4)
        lot = tab.lot(lambda i, j: (i, j) != (6, 6))
        self.play(tab.allumer(lot, lag=0.25, run_time=3.0))
        self.au_mot("C'est long")
        lg = self.t("C'est long !", 48, ORANGE_RETENUE).next_to(r2, DOWN, buff=0.7).align_to(r1, LEFT)
        self.play(FadeIn(lg, scale=0.6), run_time=0.4)
        self.insister(lg, 0.3)
        self.attendre_voix()

    # ── 03 : le contraire : une seule case ──────────────────────────────────

    def ecran_contraire(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-contraire")
        self.titre_ecran("Le contraire")
        tab = self.tableau()
        self.add(tab)
        self.au_mot("différent de 12")
        l1 = self.ligne([("A", AMBRE_BORD), (":", WHITE), ("« différent de 12 »", AMBRE_BORD)], 38, 0.2)
        self.a_gauche(l1, 1.75)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égal à 12")
        l2 = self.ligne([("Ā", BLEU_BORD), (":", WHITE), ("« égal à 12 »", BLEU_BORD)], 38, 0.2)
        self.a_gauche(l2, 0.65)
        fl = CurvedArrow(l1.get_left() + P(-0.12, -0.12), l2.get_left() + P(-0.12, 0.12), angle=PI / 1.5,
                         color=BLEU_BORD, stroke_width=4, tip_length=0.18)
        self.play(Create(fl), FadeIn(l2[2], shift=DOWN * 0.15), run_time=0.6)
        self.au_mot("A barre")
        self.play(FadeIn(l2[:2], scale=0.6), run_time=0.4)
        self.insister(l2[0], 0.3)
        self.au_mot("Une seule case")
        c66 = tab.cases[(6, 6)]
        self.play(tab.allumer([c66], BLEU_FOND, BLEU_BORD, run_time=0.5))
        self.insister(c66, 0.3, 1.6)
        self.au_mot("6 et 6")
        self.play(Indicate(tab.lig[6], color=BLEU_BORD, scale_factor=1.3), run_time=0.5)
        self.play(Indicate(tab.col[6], color=BLEU_BORD, scale_factor=1.3), run_time=0.5)
        self.au_mot("P de A barre")
        l3 = self.ligne([("P(Ā)", BLEU_BORD), ("=", WHITE)], 44, 0.25)
        self.a_gauche(l3, -0.85)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("1 sur 36")
        f = self.pf(1, 36, 42, VERT_OK).next_to(l3, RIGHT, buff=0.3)
        self.play(FadeIn(f, scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(f, color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(f, 0.3)
        self.attendre_voix()

    # ── 04 : la formule ─────────────────────────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-formule")
        self.titre_ecran("Un événement et son contraire")
        tab = self.tableau()
        self.add(tab)
        self.au_mot("Un événement")
        lot = tab.lot(lambda i, j: (i, j) != (6, 6))
        self.play(tab.allumer(lot, lag=0.04, run_time=0.9))
        self.au_mot("son contraire")
        self.play(tab.allumer([tab.cases[(6, 6)]], BLEU_FOND, BLEU_BORD, run_time=0.4))
        self.au_mot("font 1")
        cadre = SurroundingRectangle(tab.grille, color=JAUNE_TITRE, buff=0.06, stroke_width=6)
        l1 = self.ligne([("P(A)", AMBRE_BORD), ("+", WHITE), ("P(Ā)", BLEU_BORD), ("=", WHITE), ("1", JAUNE_TITRE)],
                        42, 0.22)
        self.a_gauche(l1, 1.75)
        self.play(Create(cadre), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.6)
        self.insister(l1[4], 0.3)
        self.au_mot("P de A égale")
        l2 = self.ligne([("P(A)", AMBRE_BORD), ("=", WHITE), ("1", JAUNE_TITRE), ("−", WHITE), ("P(Ā)", BLEU_BORD)],
                        46, 0.22)
        self.a_gauche(l2, 0.55)
        boite = SurroundingRectangle(l2, color=VERT_OK, buff=0.2)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(boite), run_time=0.4)
        self.au_mot("1 moins 1 sur 36")
        f1 = self.pf(1, 36, 40, BLEU_BORD)
        l3 = self.ligne([("P(A)", AMBRE_BORD), ("=", WHITE), ("1", JAUNE_TITRE), ("−", WHITE), (f1, None)], 44, 0.22)
        self.a_gauche(l3, -0.95)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), Indicate(tab.cases[(6, 6)], color=BLEU_BORD), run_time=0.6)
        self.au_mot("35 sur 36")
        eg = self.t("=", 44).next_to(l3, RIGHT, buff=0.25)
        r = self.pf(35, 36, 42, VERT_OK).next_to(eg, RIGHT, buff=0.25)
        self.play(FadeIn(eg), FadeIn(r, scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(r, color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(r, 0.3)
        self.attendre_voix()

    # ── 05 : au moins un 6 ──────────────────────────────────────────────────

    def ecran_au_moins(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-au-moins")
        self.titre_ecran("Au moins un 6")
        tab = self.tableau()
        self.add(tab)
        self.au_mot("l'outil des")
        l0 = self.t("l'outil des « au moins un »", 34, BLEU_CALCUL)
        self.a_gauche(l0, 1.9)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Au moins un 6 avec")
        l1 = self.ligne([("« au moins un 6 »", AMBRE_BORD), ("?", ORANGE_RETENUE)], 38, 0.2)
        self.a_gauche(l1, 0.95)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(tab.lig[6], color=AMBRE_BORD, scale_factor=1.3),
                  Indicate(tab.col[6], color=AMBRE_BORD, scale_factor=1.3), run_time=0.6)
        self.au_mot("aucun 6")
        l2 = self.ligne([("contraire :", WHITE), ("« aucun 6 »", BLEU_BORD)], 38, 0.2)
        self.a_gauche(l2, -0.1)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("25 cases")
        aucun = tab.lot(lambda i, j: i < 6 and j < 6)
        self.play(tab.allumer(aucun, BLEU_FOND, BLEU_BORD, lag=0.08, run_time=1.4))
        l3 = self.ligne([("aucun 6 :", BLEU_BORD), (self.pf(25, 36, 38, BLEU_BORD), None)], 38, 0.25)
        self.a_gauche(l3, -1.2)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Donc au moins")
        autres = tab.lot(lambda i, j: i == 6 or j == 6)
        self.play(tab.allumer(autres, lag=0.15, run_time=1.2))
        self.au_mot("11 sur 36")
        r = self.pf(11, 36, 40, VERT_OK)
        l4 = self.ligne([("au moins un 6 :", AMBRE_BORD), (r, None)], 38, 0.25)
        self.a_gauche(l4, -2.4)
        self.play(FadeIn(l4, shift=RIGHT * 0.2), run_time=0.4)
        self.play(Create(SurroundingRectangle(r, color=VERT_OK, buff=0.1)), run_time=0.3)
        self.insister(r, 0.3)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        g = self.tableau(0.5, P(-4.0, -0.15))
        d = self.tableau(0.5, P(0.6, -0.15))
        self.add(g, d)
        self.au_mot("au moins un 6")
        h = self.ligne([("le contraire de", WHITE), ("« au moins un 6 »", AMBRE_BORD)], 38, 0.2).move_to(P(-1.9, 2.2))
        autres = lambda i, j: i == 6 or j == 6  # noqa: E731
        self.play(FadeIn(h, shift=DOWN * 0.15),
                  g.allumer(g.lot(autres), lag=0.1, run_time=0.8), d.allumer(d.lot(autres), lag=0.1, run_time=0.8))
        self.au_mot("deux 6")
        c66 = g.cases[(6, 6)]
        self.play(g.allumer([c66], ROUGE_FOND, ROUGE_BORD, run_time=0.4))
        self.insister(c66, 0.3, 1.6)
        lg = self.t("« deux 6 »", 38, ROUGE_ERREUR).next_to(g, DOWN, buff=0.35)
        self.play(FadeIn(lg, shift=UP * 0.15), run_time=0.4)
        self.play(Create(self.barrer(lg)), run_time=0.4)
        self.au_mot("aucun 6")
        self.play(d.allumer(d.lot(lambda i, j: i < 6 and j < 6), BLEU_FOND, BLEU_BORD, lag=0.06, run_time=1.0))
        ld = VGroup(self.t("« aucun 6 »", 38, BLEU_BORD), self.coche(taille=0.25)).arrange(RIGHT, buff=0.3)
        ld.next_to(d, DOWN, buff=0.35)
        self.play(FadeIn(ld[0], shift=UP * 0.15), run_time=0.4)
        self.play(Create(ld[1]), run_time=0.4)
        self.insister(ld[0], 0.3, 1.3)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tab = self.tableau(centre=P(self.X_T, -0.15))
        self.au_mot("Avec deux dés")
        d1, d2 = self.deux_des(0.4, 2.4, 1.7, 1.2)
        self.add(d1, d2)
        self.play(FadeIn(tab), run_time=0.5)
        self.au_mot("au moins 3")
        q = self.ligne([("P(total au moins 3)", WHITE), ("=", WHITE), ("?", ORANGE_RETENUE)], 42, 0.22)
        self.a_gauche(q, 0.0)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(q[2], 0.3)
        self.au_mot("Mets pause")
        d1.clear_updaters()
        d2.clear_updaters()
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        tab = self.tableau()
        self.add(tab)
        self.au_mot("total égal à 2")
        l1 = self.ligne([("contraire :", WHITE), ("« total égal à 2 »", BLEU_BORD)], 38, 0.2)
        self.a_gauche(l1, 1.5)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("une seule case")
        c11 = tab.cases[(1, 1)]
        self.play(tab.allumer([c11], BLEU_FOND, BLEU_BORD, run_time=0.4),
                  Indicate(tab.lig[1], color=BLEU_BORD, scale_factor=1.3),
                  Indicate(tab.col[1], color=BLEU_BORD, scale_factor=1.3), run_time=0.6)
        self.insister(c11, 0.3, 1.6)
        self.au_mot("1 moins 1 sur 36")
        l2 = self.ligne([("1", JAUNE_TITRE), ("−", WHITE), (self.pf(1, 36, 40, BLEU_BORD), None)], 44, 0.22)
        self.a_gauche(l2, 0.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("35 sur 36")
        eg = self.t("=", 44).next_to(l2, RIGHT, buff=0.25)
        r = self.pf(35, 36, 42, VERT_OK).next_to(eg, RIGHT, buff=0.25)
        self.play(FadeIn(eg), FadeIn(r, scale=0.5),
                  tab.allumer(tab.lot(lambda i, j: (i, j) != (1, 1)), lag=0.03, run_time=0.9))
        self.play(Create(SurroundingRectangle(r, color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(r, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 42
        l1 = self.ligne([("P(A)", AMBRE_BORD), ("=", WHITE), ("1", JAUNE_TITRE), ("−", WHITE), ("P(Ā)", BLEU_BORD)],
                        fs + 4, 0.2)
        l2 = self.ligne([("A long à compter :", WHITE), ("on compte son contraire", BLEU_BORD)], fs, 0.2)
        l3 = self.ligne([("contraire de « au moins un » :", WHITE), ("« aucun »", BLEU_BORD)], fs, 0.2)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.7, 0.4))
        for mot, l in zip(["P de A égale", "Quand A est long", "Le contraire de « au moins un »"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 5")
        self.play(Write(self.chute("Épisode 5 : réunion et intersection", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre (modèle : stmg/proba_au_moins_un.py)."""
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
        self.ecran_long()
        self.ecran_contraire()
        self.ecran_formule()
        self.ecran_au_moins()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
