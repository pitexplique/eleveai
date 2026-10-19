# proba_probaT_arbre_tableau.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — probabilités : passer de
# l'ARBRE PONDÉRÉ au TABLEAU CROISÉ, et retour (micros : probaT_arbre_vers_tableau
# en STMG, alea_arbre_vers_tableau en 1re), AVEC VOIX. Paysage 16:9, CEINTURE
# MARRON. Short jumeau : proba_probaT_arbre_tableau_short.py (ceinture jaune).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (18/10, « pour vendre en pack ») :
# ProbaArbreTableauBase porte toutes les scènes ; les deux sous-classes ne
# changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ LE PONT : l'arbre du coach (`ArbreSB`, repris tel quel de
# proba_probaC_interpreter.py) à GAUCHE, le tableau croisé du coach
# (`TableauCroise`, comme proba_probaC_tableau.py) à DROITE. Chaque chemin
# allumé fait GLISSER son effectif dans SA case quand la voix le dit (360, 40,
# 150, 450), puis 510. Retour : la ligne S allumée, 360 sur 400 remonte sur la
# branche S → B. Piège : la COLONNE B, 360 sur 510 ≈ 0,71, et un « ? » sur
# l'arbre (ce nombre n'y est pas). Correction : la ligne S barre.
# ⛔ PAS D'ÉCART : les branches vers B barre restent sans nombre ; la case
# « Total × B barre » reste vide (jamais dite).
#
# Écrans : 00 garde · 01 les chauffe-eau solaires · 02 l'arbre · 03 1 000
# maisons : 400, 600 · 04 les quatre cases · 05 la colonne B : 510 · 06 retour
# · 07 piège · 08 défi · 08b correction · 09 ce que tu as appris · 10 abonnement.
#
# Voix : manim/voix/stmg-premiere-proba-arbre-tableau.json (débit −7).
# Rendus (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_arbre_tableau.py ProbaArbreTableauSTMG -o eleveai-maths-stmg-proba-arbre-tableau --media_dir manim/scripts/stmg/media-probaT_arbre_tableau
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_arbre_tableau.py ProbaArbreTableauPremiere -o eleveai-maths-premiere-commun-proba-arbre-tableau --media_dir manim/scripts/stmg/media-probaT_arbre_tableau
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_arbre_tableau_short.py ShortProbaArbreTableau -o eleveai-maths-stmg-proba-arbre-tableau-short --media_dir manim/scripts/stmg/media-probaT_arbre_tableau
# (le short n'affiche aucune classe : un seul rendu, copié sous les deux noms,
#  eleveai-maths-premiere-commun-proba-arbre-tableau-short.mp4 pour la 1re)
# Puis copier dans manim/sorties/stmg/maths/probabilites/12-arbre-tableau/ et
# manim/sorties/premiere-commun/maths/probabilites/12-arbre-tableau/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import (  # noqa: E402
    ANNEAU, BORD, CHEMIN, ENCRE, PROBA, TableauCroise, frac, lettre, pastille, suite,
)
from proba_probaC_interpreter import ArbreSB, carte_lettre, facture, maison, soleil  # noqa: E402

PANNEAU = "#1E3A8A"


def P(x, y):
    return np.array([x, y, 0.0])


# ── le dessin : la maison au chauffe-eau solaire ────────────────────────────

def chauffe_eau(s=1.0):
    """Un capteur (bleu nuit, quadrillé) surmonté de son ballon blanc."""
    capteur = Rectangle(width=0.46, height=0.24, fill_color=PANNEAU, fill_opacity=1, stroke_color="#93C5FD",
                        stroke_width=1.5)
    traits = VGroup(*[Line(P(x, -0.12), P(x, 0.12), color="#93C5FD", stroke_width=1) for x in (-0.115, 0, 0.115)])
    ballon = RoundedRectangle(width=0.5, height=0.12, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                              stroke_color="#94A3B8", stroke_width=1.5).move_to(P(0, 0.19))
    return VGroup(capteur, traits, ballon).scale(s)


def maison_solaire(avec=True, s=1.0):
    """La maison du coach-vidéo (maison() de l'épisode « interpréter ») ;
    avec=True : un chauffe-eau solaire posé sur le pan gauche du toit."""
    m = maison(False, 1.0)
    if avec:
        d = np.array([0.62, 0.575, 0.0])
        angle = np.arctan2(d[1], d[0])
        n = np.array([-d[1], d[0], 0.0]) / np.linalg.norm(d)
        ce = chauffe_eau().rotate(angle).move_to(P(-0.31, 0.66) + n * 0.17)
        m.add(ce)
    return m.scale(s)


def b_barre_texte(t, color):
    """Une barre au-dessus d'un Text déjà posé (S barre, B barre dans le tableau)."""
    b = Line(LEFT, RIGHT, color=color, stroke_width=2.5)
    b.set_width(t.width * 1.1).next_to(t, UP, buff=0.04)
    return b


# ── le tableau croisé du coach : S / S barre, B / B barre ───────────────────

LIGNES = ["S", "S", "Total"]
COLONNES = ["B", "B", "Total"]
# ⛔ PAS D'ÉCART : la case « Total × B barre » n'est jamais dite → vide.
VALEURS = [[360, 40, 400], [150, 450, 600], [510, None, "1 000"]]
TOUTES = {(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 2)}
# Branches de l'arbre : 0 → S, 1 → S̄, 2 S → B, 3 S → B̄, 4 S̄ → B, 5 S̄ → B̄.
CHEMIN_DE = {(0, 0): (0, 2), (0, 1): (0, 3), (1, 0): (1, 4), (1, 1): (1, 5)}
FEUILLE_DE = {(0, 0): 2, (0, 1): 3, (1, 0): 4, (1, 1): 5}


class ProbaArbreTableauBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-arbre-tableau"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    # ── les deux figures du pont ────────────────────────────────────────────

    def arbre(self, centre=P(-3.95, 0.4), echelle=0.85, nombres=((0, "0,4"), (1, "0,6"), (2, "0,9"), (4, "0,25"))):
        """L'arbre du coach. Les nombres DITS sont posés (visibles) ; la carte
        est élargie pour loger les effectifs au bout des chemins."""
        a = ArbreSB()
        large = RoundedRectangle(width=a.carte.width + 1.0, height=a.carte.height, corner_radius=0.2,
                                 fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        large.move_to(a.carte).shift(RIGHT * 0.35)
        a.carte.become(large)
        a.titre.next_to(a.carte.get_top(), DOWN, buff=0.14)
        for k, v in nombres:
            a.nombre(k, v)
        a.scale(echelle).move_to(centre)
        return a

    def tableau(self, centre=P(3.5, 0.75), echelle=0.95, montres=TOUTES):
        """Le tableau du coach ; les nombres hors `montres` se posent plus tard."""
        tb = TableauCroise(lignes=LIGNES, colonnes=COLONNES, valeurs=VALEURS, larg_lab=1.6, larg=1.45)
        bl = b_barre_texte(tb.lab[1], ENCRE).set_z_index(3)
        be = b_barre_texte(tb.ent[1], WHITE).set_z_index(3)
        tb.textes.add(bl, be)
        tb.lab[1] = VGroup(tb.lab[1], bl)
        tb.ent[1] = VGroup(tb.ent[1], be)
        tb.scale(echelle).move_to(centre)
        for i, ligne in enumerate(tb.val):
            for j, v in enumerate(ligne):
                if v is None:
                    continue
                if (i, j) in montres:
                    tb.posees.add((i, j))
                else:
                    tb.vals.remove(v)
        return tb

    def cadre_ligne(self, tb, i=0, color=ANNEAU):
        return SurroundingRectangle(VGroup(tb.rect[i + 1][0], tb.rect[i + 1][3]), color=color, buff=0.05,
                                    stroke_width=6)

    def cadre_colonne(self, tb, j=0, color=ANNEAU):
        return SurroundingRectangle(VGroup(tb.rect[0][j + 1], tb.rect[3][j + 1]), color=color, buff=0.05,
                                    stroke_width=6)

    def eff_noeud(self, a, k, texte, fs=22):
        """L'effectif d'un nœud (S : au-dessus de sa lettre ; S barre : en dessous du nœud)."""
        p = pastille(texte, fs)
        p.scale(a.carte.width / 7.1)
        if k == 0:
            p.next_to(a.lab[0], UP, buff=0.06)
        else:
            p.next_to(a.lab[1], DOWN, buff=0.06 + a.lab[1].height * 1.25)
        return p

    def eff_racine(self, a, texte="1 000", fs=22):
        p = pastille(texte, fs).scale(a.carte.width / 7.1)
        return p.next_to(a.depart, DOWN, buff=0.12)

    def eff_feuille(self, a, k, texte, fs=22):
        p = pastille(texte, fs).scale(a.carte.width / 7.1)
        return p.next_to(a.lab[k], RIGHT, buff=0.1)

    def glisser(self, source, tb, i, j, run_time=0.8):
        """Une copie de l'effectif quitte l'arbre et devient le nombre de sa case."""
        tb.posees.add((i, j))
        return TransformFromCopy(source, tb.val[i][j], run_time=run_time, path_arc=-0.35)

    def ligne_calc(self, morceaux, fs=44, x_gauche=-6.2, y=-2.45):
        """Une ligne de calcul sous les figures, à gauche de Ti-Margo."""
        g = suite(*[self.t(tx, fs, c) for tx, c in morceaux], buff=0.2)
        g.move_to(P(x_gauche + g.width / 2, y))
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("De l'arbre au tableau croisé", 50, JAUNE_TITRE).to_edge(UP, buff=0.55)
        sous = self.t("… et retour", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.22)
        ech = echelle_ceintures("marron").move_to(P(-0.6, -2.75))
        a = self.arbre(P(-3.7, -0.35), 0.5, nombres=())
        tb = self.tableau(P(2.6, -0.45), 0.6, montres=())
        aller = Arrow(P(-1.15, -0.15), P(0.55, -0.15), buff=0, color=JAUNE_TITRE, stroke_width=7)
        retour = Arrow(P(0.55, -0.75), P(-1.15, -0.75), buff=0, color=VERT_OK, stroke_width=7)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(a, shift=UP * 0.2),
                  run_time=1.0)
        self.au_mot("au tableau croisé")
        self.play(GrowArrow(aller), FadeIn(tb, shift=LEFT * 0.3), run_time=0.7)
        self.au_mot("et retour")
        self.play(FadeIn(sous, shift=UP * 0.15), GrowArrow(retour), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 01 : les chauffe-eau solaires, la facture ───────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le chauffe-eau solaire")
        sol = soleil().move_to(P(-6.1, 2.55))
        avec = (0, 3)
        maisons = VGroup(*[maison_solaire(k in avec, 0.95) for k in range(5)]).arrange(RIGHT, buff=0.3)
        maisons.move_to(P(-3.1, 0.75))
        for k in avec:
            maisons[k][4].set_opacity(0)
        self.play(FadeIn(sol, scale=0.6), LaggedStart(*[FadeIn(m, shift=UP * 0.3) for m in maisons], lag_ratio=0.12),
                  run_time=1.0)
        self.au_mot("40 %")
        quarante = self.t("40 %", 64, JAUNE_TITRE).move_to(P(3.7, 1.35))
        q2 = self.t("des maisons ont", 30).next_to(quarante, DOWN, buff=0.25)
        q3 = self.t("un chauffe-eau solaire", 30).next_to(q2, DOWN, buff=0.15)
        self.play(FadeIn(quarante, scale=0.6), *[maisons[k][4].animate.set_opacity(1) for k in avec],
                  run_time=0.6)
        self.play(FadeIn(q2, shift=UP * 0.1), FadeIn(q3, shift=UP * 0.1), run_time=0.5)
        self.play(*[Indicate(maisons[k][4], color=BLEU_CALCUL, scale_factor=1.6) for k in avec], run_time=0.8)
        fac = facture(0.9).move_to(P(-5.6, -1.85))
        self.au_mot("Parmi elles")
        l1 = suite(self.t("Parmi elles :", 32, BLEU_CALCUL), self.t("90 %", 44, JAUNE_TITRE),
                   self.t("facture en baisse", 32), buff=0.22)
        l1.move_to(P(-4.7 + l1.width / 2, -1.45))
        self.play(FadeIn(fac[:3], shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("90 %")
        self.play(FadeIn(l1[1], scale=1.6), GrowArrow(fac[3]), run_time=0.5)
        self.play(FadeIn(l1[2], shift=LEFT * 0.1), run_time=0.4)
        self.au_mot("Parmi les autres")
        l2 = suite(self.t("Parmi les autres :", 32, BLEU_CALCUL), self.t("25 %", 44, JAUNE_TITRE), buff=0.22)
        l2.next_to(l1, DOWN, buff=0.35).align_to(l1, LEFT)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("25 %")
        self.play(FadeIn(l2[1], scale=1.6), run_time=0.4)
        self.attendre_voix()

    # ── 02 : l'arbre, branche par branche ───────────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arbre")
        self.titre_ecran("L'arbre pondéré")
        a = self.arbre(P(-3.4, 0.0), 1.0)
        self.play(FadeIn(a.socle()), run_time=0.5)
        cS = carte_lettre("S", "« chauffe-eau solaire »", 28)
        cB = carte_lettre("B", "« facture en baisse »", 28)
        cS.move_to(P(0.6 + cS.width / 2, 1.3))
        cB.move_to(P(0.6 + cB.width / 2, -0.1))
        self.au_mot("S : « chauffe-eau")
        self.play(a.construire(0), FadeIn(cS, shift=LEFT * 0.2))
        self.au_mot("0,4")
        self.play(FadeIn(a.nombres[0], scale=1.6), run_time=0.4)
        self.insister(a.nombres[0], 0.25)
        self.au_mot("S barre, 0,6")
        self.play(a.construire(1))
        self.au_mot("0,6")
        self.play(FadeIn(a.nombres[1], scale=1.6), run_time=0.4)
        self.au_mot("Après S : B")
        self.play(Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.4), run_time=0.4)
        self.play(a.construire(2), a.construire(3))
        self.au_mot("« facture en baisse »")
        self.play(FadeIn(cB, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,9")
        self.play(FadeIn(a.nombres[2], scale=1.6), run_time=0.4)
        self.insister(a.nombres[2], 0.25)
        self.au_mot("Après S barre")
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.4), run_time=0.4)
        self.play(a.construire(4), a.construire(5))
        self.au_mot("B, 0,25")
        self.play(FadeIn(a.nombres[4], scale=1.6), run_time=0.4)
        self.insister(a.nombres[4], 0.25)
        self.attendre_voix()

    # ── 03 : 1 000 maisons : 400 et 600 glissent dans la colonne Total ──────

    def ecran_mille(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-mille")
        a = self.arbre()
        tb = self.tableau(montres=())
        self.add(a)
        self.titre_ecran("De l'arbre au tableau")
        self.au_mot("Pour passer au tableau")
        pont = Arrow(P(-0.85, 0.75), P(0.6, 0.75), buff=0, color=JAUNE_TITRE, stroke_width=7)
        self.play(GrowArrow(pont), FadeIn(tb, shift=LEFT * 0.3), run_time=0.7)
        self.au_mot("1 000 maisons")
        r = self.eff_racine(a)
        self.play(FadeIn(r, scale=1.6), run_time=0.5)
        self.play(self.glisser(r[1], tb, 2, 2))
        self.insister(tb.val[2][2], 0.25)
        self.au_mot("S : 0,4 fois")
        calc = self.ligne_calc([("0,4", PROBA), ("×", WHITE), ("1 000", WHITE), ("=", WHITE), ("400", JAUNE_TITRE)])
        self.play(*a.etat([0]), *tb.etat(lignes=(0,), eteindre=False), TransformFromCopy(a.nombres[0], calc[0]),
                  run_time=0.6)
        self.au_mot("fois 1 000")
        self.play(FadeIn(calc[1]), TransformFromCopy(r[1], calc[2]), run_time=0.5)
        self.au_mot("égale 400")
        n400 = self.eff_noeud(a, 0, "400")
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=1.6), run_time=0.4)
        self.play(TransformFromCopy(calc[4], n400), run_time=0.6)
        self.play(self.glisser(n400[1], tb, 0, 2))
        self.insister(tb.val[0][2], 0.25)
        self.au_mot("S barre : 600")
        n600 = self.eff_noeud(a, 1, "600")
        self.play(*a.etat([1]), *tb.etat(lignes=(1,), eteindre=False), FadeOut(calc), FadeIn(n600, scale=1.6),
                  run_time=0.6)
        self.play(self.glisser(n600[1], tb, 1, 2))
        self.insister(tb.val[1][2], 0.25)
        self.play(*a.etat(None), *tb.etat(), run_time=0.4)
        self.attendre_voix()

    # ── 04 : chaque chemin glisse dans SA case ──────────────────────────────

    def ecran_cases(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-cases")
        a = self.arbre()
        tb = self.tableau(montres={(0, 2), (1, 2), (2, 2)})
        n400, n600 = self.eff_noeud(a, 0, "400"), self.eff_noeud(a, 1, "600")
        self.add(a, tb, n400, n600)
        self.titre_ecran("Chaque chemin, une case")
        etapes = (
            ((0, 0), "S et B : 0,9", "360", ("0,9", "400"), ("0,9 fois 400", "égale 360")),
            ((0, 1), "S et B barre : 40", "40", None, None),
            ((1, 0), "S barre et B : 0,25", "150", ("0,25", "600"), ("0,25 fois 600", "égale 150")),
            ((1, 1), "S barre et B barre : 450", "450", None, None),
        )
        calc = None
        for ij, mot, val, facteurs, mots in etapes:
            self.au_mot(mot)
            br = CHEMIN_DE[ij]
            anims = [*a.etat(list(br)), *tb.etat(cases=(ij,), eteindre=False)]
            if calc is not None:
                anims.append(FadeOut(calc))
                calc = None
            self.play(*anims, run_time=0.6)
            p = self.eff_feuille(a, FEUILLE_DE[ij], val)
            if facteurs:
                noeud = n400 if ij[0] == 0 else n600
                calc = self.ligne_calc([(facteurs[0], PROBA), ("×", WHITE), (facteurs[1], JAUNE_TITRE),
                                        ("=", WHITE), (val, JAUNE_TITRE)])
                self.au_mot(mots[0])
                self.play(TransformFromCopy(a.nombres[br[1]], calc[0]), FadeIn(calc[1]),
                          TransformFromCopy(noeud[1], calc[2]), run_time=0.6)
                self.au_mot(mots[1])
                self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=1.6), run_time=0.4)
                self.play(TransformFromCopy(calc[4], p), run_time=0.5)
            else:
                self.play(FadeIn(p, scale=1.6), run_time=0.4)
            self.play(self.glisser(p[1], tb, *ij))
            self.insister(tb.val[ij[0]][ij[1]], 0.2)
        self.play(*a.etat(None), *tb.etat(), run_time=0.4)
        self.attendre_voix()

    # ── 05 : la colonne B : 360 + 150 = 510 ─────────────────────────────────

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-total")
        a = self.arbre()
        tb = self.tableau(montres=TOUTES - {(2, 0)})
        self.add(a, tb)
        self.titre_ecran("La colonne B")
        self.au_mot("La colonne B")
        cad = self.cadre_colonne(tb, 0)
        self.play(*tb.etat(colonnes=(0,)), Create(cad), *a.etat([0, 2, 1, 4]), run_time=0.7)
        calc = self.ligne_calc([("360", JAUNE_TITRE), ("+", WHITE), ("150", JAUNE_TITRE), ("=", WHITE),
                                ("510", VERT_OK)])
        self.au_mot("360 plus")
        self.play(TransformFromCopy(tb.val[0][0], calc[0]), run_time=0.5)
        self.au_mot("plus 150")
        self.play(FadeIn(calc[1]), TransformFromCopy(tb.val[1][0], calc[2]), run_time=0.5)
        self.au_mot("égale 510")
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=1.6), run_time=0.4)
        self.play(self.glisser(calc[4], tb, 2, 0))
        self.insister(tb.val[2][0], 0.3)
        self.au_mot("Le tableau est rempli")
        self.play(FadeOut(cad), *tb.etat(), *a.etat(None), run_time=0.5)
        self.play(Circumscribe(tb, color=VERT_OK, buff=0.1), run_time=0.9)
        self.attendre_voix()

    # ── 06 : retour : la ligne S donne la branche S → B ─────────────────────

    def ecran_retour(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-retour")
        a = self.arbre(nombres=((0, "0,4"), (1, "0,6"), (4, "0,25")))
        tb = self.tableau()
        self.add(tb)
        self.titre_ecran("Du tableau à l'arbre")
        self.au_mot("Du tableau, on retrouve")
        retour = Arrow(P(0.6, 0.75), P(-0.85, 0.75), buff=0, color=VERT_OK, stroke_width=7)
        self.play(GrowArrow(retour), FadeIn(a, shift=RIGHT * 0.3), run_time=0.8)
        self.au_mot("La branche de S vers B")
        neuf = a.nombre(2, "0,9")
        a.remove(neuf)
        del a.nombres[2]
        q = self.t("?", 30, ROUGE_ERREUR).scale(a.carte.width / 7.1).move_to(neuf)
        self.play(*a.etat([2]), FadeIn(q, scale=1.8), run_time=0.7)
        self.insister(q, 0.25)
        self.au_mot("on allume la ligne S")
        cad = self.cadre_ligne(tb, 0)
        self.play(*tb.etat(lignes=(0,)), Create(cad), run_time=0.7)
        f = frac("360", "400", 44, WHITE, JAUNE_TITRE, JAUNE_TITRE)
        eg = self.t("=", 48)
        r = self.t("0,9", 52, VERT_OK)
        ligne = suite(f, eg, r, buff=0.3)
        ligne.move_to(P(-6.2 + ligne.width / 2, -2.5))
        self.au_mot("360 sur 400")
        self.play(TransformFromCopy(tb.val[0][0], f[0]), GrowFromCenter(f[1]), TransformFromCopy(tb.val[0][2], f[2]),
                  run_time=0.8)
        self.au_mot("égale 0,9")
        self.play(FadeIn(eg), FadeIn(r, scale=1.6), run_time=0.4)
        self.play(FadeOut(q), TransformFromCopy(r, neuf, path_arc=0.5), run_time=0.9)
        self.insister(neuf, 0.3)
        self.attendre_voix()

    # ── 07 : le piège : la COLONNE B, 360 sur 510 ; « ? » sur l'arbre ───────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        a = self.arbre()
        tb = self.tableau()
        self.add(a, tb)
        self.titre_ecran("Le piège")
        self.au_mot("croire que le tableau")
        faux = self.t("« Rien de plus que l'arbre » ?", 30, ROUGE_ERREUR)
        faux.move_to(P(3.5, -1.2))
        self.play(FadeIn(faux, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Il répond à la question inverse")
        barre = Line(faux.get_left() + LEFT * 0.05, faux.get_right() + RIGHT * 0.05, color=ROUGE_ERREUR,
                     stroke_width=5)
        inv = self.t("Il répond à la question inverse !", 28, VERT_OK).move_to(P(3.5, -1.85))
        self.play(Create(barre), faux.animate.set_opacity(0.6), FadeIn(inv, shift=UP * 0.15), run_time=0.7)
        self.au_mot("Parmi les 510")
        cad = self.cadre_colonne(tb, 0)
        self.play(*tb.etat(colonnes=(0,)), Create(cad), run_time=0.7)
        self.insister(tb.val[2][0], 0.3)
        self.au_mot("360 ont un chauffe-eau")
        self.insister(tb.val[0][0], 0.3)
        f = frac("360", "510", 44, WHITE, JAUNE_TITRE, JAUNE_TITRE)
        env = self.t("≈", 48)
        r = self.t("0,71", 52, ORANGE_RETENUE)
        ligne = suite(f, env, r, buff=0.3)
        ligne.move_to(P(-6.2 + ligne.width / 2, -2.5))
        self.au_mot("360 sur 510")
        self.play(TransformFromCopy(tb.val[0][0], f[0]), GrowFromCenter(f[1]), TransformFromCopy(tb.val[2][0], f[2]),
                  run_time=0.8)
        self.au_mot("environ 0,71")
        self.play(FadeIn(env), FadeIn(r, scale=1.6), run_time=0.4)
        self.insister(r, 0.3)
        self.au_mot("Sur l'arbre")
        q = self.t("?", 150, ROUGE_ERREUR).move_to(a.carte.get_center() + RIGHT * 0.6 + DOWN * 0.15)
        self.play(*a.etat([], op=0.35), FadeIn(q, scale=0.4), run_time=0.7)
        fl = Arrow(r.get_top() + UP * 0.05, q.get_bottom() + P(0.1, -0.05), buff=0.05, color=ORANGE_RETENUE,
                   stroke_width=5)
        self.play(GrowArrow(fl), run_time=0.5)
        self.au_mot("nulle part")
        self.play(Wiggle(q, scale_value=1.25), run_time=0.8)
        self.attendre_voix()

    # ── 08 : défi : la ligne S barre ────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tb = self.tableau(P(-0.6, 1.15), 0.95)
        self.play(FadeIn(tb), run_time=0.5)
        self.au_mot("Avec le tableau")
        q1 = suite(self.t("Une maison", 34), self.t("sans chauffe-eau solaire,", 34, BLEU_CALCUL), buff=0.18)
        q2 = suite(self.t("probabilité que sa facture", 34), self.t("n'ait pas baissé ?", 34, ORANGE_RETENUE),
                   buff=0.18)
        VGroup(q1, q2).arrange(DOWN, buff=0.3).move_to(P(-0.6, -1.25))
        self.play(Indicate(tb, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.6)
        self.au_mot("qu'une maison sans")
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("n'ait pas vu")
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def p_barres(self, fs=48):
        """P indice S barre de B barre : la condition en indice, les deux barres dessinées."""
        p = self.t("P", fs)
        ind = lettre("S", int(fs * 0.62), JAUNE_TITRE, True)
        ind.next_to(p, RIGHT, buff=0.03).align_to(p, DOWN).shift(DOWN * fs * 0.0045)
        g = self.t("(", fs).next_to(ind, RIGHT, buff=0.04)
        b = lettre("B", fs, VERT_OK, True).next_to(g, RIGHT, buff=0.04)
        d = self.t(")", fs).next_to(b, RIGHT, buff=0.04)
        for m in (g, d):
            m.match_y(p)
        b.align_to(p, DOWN)
        return VGroup(p, ind, g, b, d)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        a = self.arbre()
        tb = self.tableau()
        self.add(a, tb)
        self.titre_ecran("Correction")
        self.au_mot("On allume la ligne S barre")
        cad = self.cadre_ligne(tb, 1)
        self.play(*tb.etat(lignes=(1,)), Create(cad), run_time=0.8)
        self.au_mot("600 maisons")
        self.insister(tb.val[1][2], 0.3)
        self.au_mot("dont 450")
        self.insister(tb.val[1][1], 0.3)
        f = frac("450", "600", 44, WHITE, JAUNE_TITRE, JAUNE_TITRE)
        eg = self.t("=", 48)
        r = self.t("0,75", 52, VERT_OK)
        ligne = suite(f, eg, r, buff=0.3)
        ligne.move_to(P(4.0, -1.7))
        self.au_mot("450 sur 600")
        self.play(TransformFromCopy(tb.val[1][1], f[0]), GrowFromCenter(f[1]), TransformFromCopy(tb.val[1][2], f[2]),
                  run_time=0.8)
        self.au_mot("égale 0,75")
        self.play(FadeIn(eg), FadeIn(r, scale=1.6), run_time=0.4)
        self.insister(r, 0.3)
        self.au_mot("C'est P indice S barre")
        pf = self.p_barres(46)
        eg2 = self.t("=", 44)
        r2 = self.t("0,75", 48, VERT_OK)
        eg3 = self.t("=", 44)
        un = self.t("1 − 0,25", 44, WHITE)
        form = suite(pf, eg2, r2, eg3, un, buff=0.22)
        form.move_to(P(-6.2 + form.width / 2, -2.6))
        for m in (eg2, r2, eg3, un):
            m.match_y(pf[0])
        trois = a.nombre(5, "0,75")
        a.remove(trois)
        del a.nombres[5]
        # sous la branche S barre → B barre (au-dessus, il toucherait le 0,25)
        d = a.branches[5].get_end() - a.branches[5].get_start()
        n = np.array([d[1], -d[0], 0.0]) / np.linalg.norm(d)
        trois.move_to(a.branches[5].get_center() + n * (abs(n[0]) * trois.width / 2 + abs(n[1]) * trois.height / 2 + 0.05))
        self.play(*a.etat([5]), FadeIn(pf, shift=UP * 0.15), FadeIn(eg2), TransformFromCopy(r, r2), run_time=0.7)
        self.play(TransformFromCopy(r2, trois, path_arc=0.4), run_time=0.7)
        self.au_mot("1 moins 0,25")
        self.play(*a.etat([4, 5]), FadeIn(eg3), FadeIn(un[:2]), TransformFromCopy(a.nombres[4], un[2:]), run_time=0.8)
        ok = self.coche(taille=0.3).next_to(form, UP, buff=0.3).align_to(form, RIGHT)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        l1 = VGroup(suite(self.t("De l'arbre au tableau :", fs, BLEU_CALCUL), self.t("on prend 1 000,", fs), buff=0.18),
                    self.t("et chaque case est un chemin", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        l2 = VGroup(suite(self.t("Du tableau à l'arbre :", fs, VERT_OK), self.t("une branche, c'est", fs), buff=0.18),
                    self.t("une case ÷ le total de sa ligne", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        l3 = self.t("Le tableau donne aussi l'autre sens", fs, ORANGE_RETENUE)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.8, 0.0))
        for mot, l in zip(["De l'arbre au tableau", "Du tableau à l'arbre", "Et le tableau donne"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_arbre()
        self.ecran_mille()
        self.ecran_cases()
        self.ecran_total()
        self.ecran_retour()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="10-abonne")


class ProbaArbreTableauSTMG(ProbaArbreTableauBase):
    identite = "Maths STMG — EleveAI"


class ProbaArbreTableauPremiere(ProbaArbreTableauBase):
    identite = "Maths 1re — EleveAI"
