# proba_va_calculer.py
# EleveAI — Maths STMG — variables aléatoires : CALCULER AVEC UNE LOI
# (micro va_calculer_probabilites ; couvre aussi va_somme_un), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_va_calculer_short.py.
#
# ⭐ La figure est CELLE DU COACH : le TABLEAU DE LOI (`tableau_donnees` de
# canvasLoi, banque stmg/maths/variables-aleatoires) : en-tête sombre « xᵢ »
# et les valeurs, libellé bleu clair « P(X = xᵢ) », cases blanches. Les cases
# utiles s'allument en jaune et leurs nombres GLISSENT vers la somme.
# ⛔ PAS D'ÉCART : seuls les nombres dits s'écrivent, au moment où ils sont dits.
# « inférieur ou égal » s'écrit ≤ (Text), « supérieur ou égal » ≥.
#
# Écrans : 00 garde · 01 le livreur à vélo, la loi se remplit · 02 la somme
# fait 1 · 03 P(X = 1) : une case · 04 P(X ≤ 1) : deux cases · 05 P(X ≥ 2),
# et 1 − 0,8 · 06 le piège < / ≤ · 07 défi P(X ≤ 2) · 07b correction ·
# 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/stmg-proba-va-calculer.json (débit −7).
# Rendu (depuis la racine du dépôt) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_calculer.py ProbaVaCalculerSTMG -o eleveai-maths-stmg-proba-va-calculer --media_dir manim/scripts/stmg/media-va_calculer
# Puis copier dans manim/sorties/stmg/maths/probabilites/29-va-calculer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_loi import P, TableauLoi  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import ANNEAU, BORD, ENCRE, ENTETE, SURLIGNE, suite  # noqa: E402

VALEURS = [0, 1, 2, 3]
PROBAS = ["0,5", "0,3", "0,15", "0,05"]
CARTON = "#D97706"
CARTON_FONCE = "#78350F"
ROSE_CPL = "#FDBA74"   # les cases du contraire (1 − …), orange clair


# ── les dessins ─────────────────────────────────────────────────────────────

def colis(c=0.34):
    """Un colis : carton orangé, ruban."""
    boite = Square(side_length=c, fill_color=CARTON, fill_opacity=1, stroke_color=CARTON_FONCE, stroke_width=2)
    ruban = Line(boite.get_top(), boite.get_bottom(), color="#FEF3C7", stroke_width=3)
    return VGroup(boite, ruban)


def velo(s=1.0):
    """Un livreur à vélo, un colis sur le porte-bagages. `v.roues` : les roues."""
    r = 0.42

    def roue(x):
        return VGroup(Circle(radius=r, stroke_color=WHITE, stroke_width=4),
                      Line(P(-r, 0), P(r, 0), color="#94A3B8",stroke_width=2),
                      Line(P(0, -r), P(0, r), color="#94A3B8", stroke_width=2)).move_to(P(x, 0))

    ar, av = roue(-0.78), roue(0.78)
    selle, pedale, guidon = P(-0.32, 0.55), P(0.0, 0.0), P(0.55, 0.62)
    cadre = VGroup(Line(P(-0.78, 0), selle), Line(selle, pedale), Line(pedale, P(-0.78, 0)),
                   Line(selle + P(0.05, 0), guidon), Line(guidon, P(0.78, 0)))
    cadre.set_stroke(BLEU_CALCUL, 5)
    epaule = P(0.05, 1.18)
    corps = VGroup(Line(selle + P(0, 0.06), epaule), Line(epaule, guidon + P(0, 0.05)),
                   Line(selle + P(0, 0.06), P(0.12, 0.42)), Line(P(0.12, 0.42), pedale))
    corps.set_stroke(WHITE, 6)
    tete = Circle(radius=0.17, fill_color="#FDE68A", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    tete.move_to(epaule + P(0.08, 0.26))
    caisse = colis(0.46).move_to(P(-0.82, 0.78))
    v = VGroup(ar, av, cadre, caisse, corps, tete).scale(s)
    v.roues = [ar, av]
    v.rayon = r * s
    return v


def piles_colis(tb, c=0.32):
    """Au-dessus de chaque colonne du tableau : j colis pour X = j (0 à 3)."""
    g = VGroup()
    for j in range(len(VALEURS)):
        haut = tb.rect[0][j + 1].get_top()
        pile = VGroup(*[colis(c).move_to(haut + P(0, 0.12 + c * (k + 0.5) + 0.04 * k)) for k in range(j)])
        g.add(pile)
    return g


class ProbaVaCalculerBase(Notion6e):
    nom_voix = "stmg-proba-va-calculer"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE, weight=NORMAL):
        return Text(texte, font_size=font_size, color=color, weight=weight)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def rouler(self, v, dx, run_time=1.2):
        """Le vélo avance de dx ; ses roues tournent d'autant."""
        etat = {"a": 0.0}

        def f(m, a):
            da = a - etat["a"]
            etat["a"] = a
            m.shift(RIGHT * dx * da)
            for roue in m.roues:
                roue.rotate(-dx * da / m.rayon, about_point=roue[0].get_center())

        self.play(UpdateFromAlphaFunc(v, f), run_time=run_time, rate_func=rate_functions.ease_out_sine)

    def tableau(self, centre, echelle=0.92, posees=False):
        tb = TableauLoi(VALEURS, PROBAS, larg_lab=3.2, larg=2.0)
        if posees:
            tb.tout_poser()
        tb.scale(echelle).move_to(centre)
        if not posees:
            for r in range(2):
                for j, v in enumerate(tb.val[r]):
                    v.scale(echelle).move_to(tb.rect[r][j + 1])
        return tb

    # cases : allumer (jaune), contraire (orange clair), estomper, rétablir
    def allumer(self, tb, j, coul=SURLIGNE):
        return [tb.rect[0][j + 1].animate.set_fill(coul, 1).set_stroke(ANNEAU, 5).set_z_index(1),
                tb.rect[1][j + 1].animate.set_fill(coul, 1).set_stroke(ANNEAU, 5).set_z_index(1),
                tb.val[0][j].animate.set_color(ENCRE).set_opacity(1),
                tb.val[1][j].animate.set_opacity(1)]

    def estomper(self, tb, j):
        return [tb.rect[0][j + 1].animate.set_fill(ENTETE, 0.35).set_stroke(BORD, 2).set_z_index(0),
                tb.rect[1][j + 1].animate.set_fill(WHITE, 0.35).set_stroke(BORD, 2).set_z_index(0),
                tb.val[0][j].animate.set_opacity(0.35), tb.val[1][j].animate.set_opacity(0.35)]

    def retablir(self, tb, j):
        return [tb.rect[0][j + 1].animate.set_fill(ENTETE, 1).set_stroke(BORD, 2).set_z_index(0),
                tb.rect[1][j + 1].animate.set_fill(WHITE, 1).set_stroke(BORD, 2).set_z_index(0),
                tb.val[0][j].animate.set_color(WHITE).set_opacity(1), tb.val[1][j].animate.set_opacity(1)]

    def ligne_somme(self, termes, signes, resultat=None, fs=58, egal="="):
        """« a + b (+ …) = r » : les morceaux, prêts, non affichés."""
        ts = [self.t(p, fs, VERT_OK, BOLD) for p in termes]
        ss = [self.t(s, fs) for s in signes]
        morceaux = [ts[0]]
        for s, tt in zip(ss, ts[1:]):
            morceaux += [s, tt]
        eg = self.t(egal, fs)
        morceaux.append(eg)
        res = self.t(resultat, fs + 10, JAUNE_TITRE, BOLD) if resultat else None
        if res is not None:
            morceaux.append(res)
        lig = suite(*morceaux, buff=0.28)
        for m in ss + [eg]:
            m.match_y(ts[0])
        if res is not None:
            res.match_y(ts[0])
        return lig, ts, ss, eg, res

    def glisser(self, tb, j, cible, run_time=0.6, extra=()):
        """Le nombre de la case j glisse vers sa place dans la somme."""
        self.play(TransformFromCopy(tb.val[1][j], cible), *extra, run_time=run_time)

    def expr(self, signe, a, fs=60):
        """« P(X ≤ 1) » en Text : X et la valeur en jaune."""
        g = self.t(f"P(X {signe} {a})", fs, WHITE)
        g[2].set_color(JAUNE_TITRE)
        g[-2].set_color(JAUNE_TITRE)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer avec une loi", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        tb = self.tableau(P(-0.6, 0.85), 0.75)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tb, shift=UP * 0.2),
                  run_time=1.0)
        e1 = self.expr("=", "a", 54)
        e2 = self.expr("≤", "a", 54)
        VGroup(e1, e2).arrange(RIGHT, buff=1.4).move_to(P(-0.6, -1.0))
        self.au_mot("P de X égale a")
        self.play(FadeIn(e1, scale=1.4), run_time=0.5)
        self.au_mot("inférieur ou égal")
        self.play(FadeIn(e2, scale=1.4), run_time=0.5)
        self.insister(e2[3], 0.3)
        self.attendre_voix(marge=1.0)

    # ── 01 : le livreur à vélo ; la loi de X ────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le livreur à vélo")
        v = velo(0.8).move_to(P(-9.6, 1.6))
        self.add(v)
        self.rouler(v, 4.3, 1.5)
        self.au_mot("le nombre")
        lx = suite(self.t("X", 54, JAUNE_TITRE, BOLD), self.t("=", 46),
                   self.t("nombre de colis en retard par jour", 34, BLEU_CALCUL), buff=0.25)
        lx.move_to(P(0.9, 1.6))
        self.play(Write(lx), run_time=1.0)
        self.au_mot("Sa loi")
        tb = self.tableau(P(-0.75, -1.55), 0.92)
        piles = piles_colis(tb)
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.6)
        for j, (mot, proba) in enumerate((("0 retard,", "0,5."), ("1 retard", "0,3."), ("2 retards", "0,15."),
                                          ("3 retards", "0,05."))):
            self.au_mot(mot)
            self.play(tb.poser(0, j), *[FadeIn(c, shift=DOWN * 0.4) for c in piles[j]], run_time=0.4)
            self.au_mot(proba)
            self.play(tb.poser(1, j), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la somme fait 1 ────────────────────────────────────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-somme")
        tb = self.tableau(P(-0.75, 1.2), 0.92, posees=True)
        self.add(tb)
        self.titre_ecran("D'abord, on vérifie")
        lig, ts, ss, eg, un = self.ligne_somme(PROBAS, ["+"] * 3, "1")
        lig.move_to(P(-0.9, -0.9))
        for j, mot in enumerate(("0,5 plus", "0,3 plus", "0,15 plus", "0,05,")):
            self.au_mot(mot)
            extra = [FadeIn(ss[j - 1])] if j > 0 else []
            self.glisser(tb, j, ts[j], 0.55, extra=extra + self.allumer(tb, j))
        self.au_mot("égale 1")
        self.play(FadeIn(eg), FadeIn(un, scale=1.6), run_time=0.5)
        ok = self.coche(taille=0.32).next_to(lig, RIGHT, buff=0.45)
        self.play(Create(ok), run_time=0.4)
        self.insister(un, 0.3)
        self.au_mot("C'est bien")
        cadre = SurroundingRectangle(VGroup(*tb.fonds), color=VERT_OK, buff=0.1, stroke_width=5)
        mot = self.t("C'est bien une loi de probabilité", 42, VERT_OK).move_to(P(-0.9, -2.5))
        self.play(Create(cadre), FadeIn(mot, shift=UP * 0.15), run_time=0.7)
        self.attendre_voix()

    # ── 03 : P(X = 1) : une case ────────────────────────────────────────────

    def ecran_egal(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-egal")
        tb = self.tableau(P(-0.75, 1.2), 0.92, posees=True)
        self.add(tb)
        self.titre_ecran("Une seule valeur")
        e = self.expr("=", 1, 64)
        eg = self.t("=", 64)
        res = self.t("0,3", 72, JAUNE_TITRE, BOLD)
        lig = suite(e, eg, res, buff=0.35).move_to(P(-0.9, -1.2))
        eg.match_y(e)
        res.match_y(e)
        self.play(FadeIn(e, shift=UP * 0.2), run_time=0.5)
        self.au_mot("on lit")
        anims = self.allumer(tb, 1)
        for j in (0, 2, 3):
            anims += self.estomper(tb, j)
        self.play(*anims, run_time=0.6)
        self.au_mot("la case")
        self.insister(tb.val[1][1], 0.3)
        self.au_mot("0,3.")
        self.play(FadeIn(eg), TransformFromCopy(tb.val[1][1], res), run_time=0.6)
        self.insister(res, 0.3)
        self.attendre_voix()

    # ── 04 : P(X ≤ 1) : on additionne les cases jusqu'à 1 ───────────────────

    def ecran_cumul(self, cle, titre, signe, a, cols, mot_cols, legende, termes, mots, mot_res, res_txt):
        """P(X ≤ a) ou P(X ≥ a) : les colonnes utiles s'allument, leurs nombres
        glissent vers la somme. Renvoie ce qu'il faut pour la suite."""
        self.clear()
        self.add_mascotte()
        self.dire(cle)
        tb = self.tableau(P(-0.75, 1.2), 0.92, posees=True)
        self.add(tb)
        self.titre_ecran(titre)
        e = self.expr(signe, a, 60)
        e.move_to(P(-3.6, -0.55))
        self.play(FadeIn(e, shift=UP * 0.2), run_time=0.5)
        self.insister(e[3], 0.25)
        self.au_mot(mot_cols)
        anims = []
        for j in range(4):
            anims += self.allumer(tb, j) if j in cols else self.estomper(tb, j)
        leg = self.t(legende, 44, BLEU_CALCUL).move_to(P(1.7, -0.55))
        self.play(*anims, FadeIn(leg, shift=LEFT * 0.2), run_time=0.7)
        lig, ts, ss, eg, res = self.ligne_somme(termes, ["+"] * (len(termes) - 1), res_txt)
        lig.move_to(P(-0.9, -1.9))
        for k, (j, mot) in enumerate(zip(cols, mots)):
            self.au_mot(mot)
            extra = [FadeIn(ss[k - 1])] if k > 0 else []
            self.glisser(tb, j, ts[k], 0.55, extra=extra)
        self.au_mot(mot_res)
        self.play(FadeIn(eg), FadeIn(res, scale=1.6), run_time=0.5)
        self.insister(res, 0.3)
        return tb, lig

    def ecran_inferieur(self):
        self.ecran_cumul("04-inferieur", "Inférieur ou égal", "≤", 1, [0, 1], "0 ou 1 retard", "0 ou 1 retard",
                         ["0,5", "0,3"], ["0,5 plus", "0,3,"], "soit 0,8", "0,8")
        self.attendre_voix()

    # ── 05 : P(X ≥ 2) ; c'est aussi 1 − 0,8 ─────────────────────────────────

    def ecran_superieur(self):
        tb, lig = self.ecran_cumul("05-superieur", "Supérieur ou égal", "≥", 2, [2, 3], "2 ou 3 retards",
                                   "2 ou 3 retards", ["0,15", "0,05"], ["0,15 plus", "0,05,"], "soit 0,2", "0,2")
        self.au_mot("1 moins")
        fs = 58
        aussi = self.t("c'est aussi", 40, BLEU_CALCUL)
        un, moins, huit = self.t("1", fs, WHITE, BOLD), self.t("−", fs), self.t("0,8", fs, ROSE_CPL, BOLD)
        l2 = suite(aussi, un, moins, huit, buff=0.3).move_to(P(-1.2, -3.05))
        for m in (aussi, moins, huit):
            m.match_y(un)
        anims = []
        for j in (0, 1):
            anims += self.allumer(tb, j, ROSE_CPL)
        self.play(FadeIn(aussi, shift=UP * 0.15), FadeIn(un, scale=1.5), *anims, run_time=0.6)
        self.au_mot("0,8.")
        self.play(FadeIn(moins), FadeIn(huit, scale=1.5), run_time=0.5)
        self.attendre_voix()

    # ── 06 : le piège : < ou ≤ ──────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        tb = self.tableau(P(-0.75, 1.2), 0.92, posees=True)
        self.add(tb)
        self.titre_ecran("Le piège")
        self.au_mot("confondre")
        blocs = VGroup()
        for s, mot, coul in (("<", "inférieur", ORANGE_RETENUE), ("≤", "inférieur ou égal", VERT_OK)):
            blocs.add(VGroup(self.t(s, 96, coul, BOLD), self.t(mot, 34, coul)).arrange(DOWN, buff=0.15))
        blocs.arrange(RIGHT, buff=2.2).move_to(P(-0.9, -1.3))
        self.play(FadeIn(blocs[0], shift=UP * 0.2), run_time=0.4)
        self.au_mot("ou égal")
        self.play(FadeIn(blocs[1], shift=UP * 0.2), run_time=0.4)
        self.insister(blocs[1][0], 0.3)
        self.au_mot("strictement")
        e = self.expr("<", 1, 60).move_to(P(-3.6, -0.55))
        e[3].set_color(ORANGE_RETENUE)
        self.play(FadeOut(blocs, shift=DOWN * 0.2), FadeIn(e, shift=UP * 0.2), run_time=0.5)
        self.au_mot("seulement")
        anims = self.allumer(tb, 0)
        for j in (2, 3):
            anims += self.estomper(tb, j)
        col1 = VGroup(tb.rect[0][2], tb.rect[1][2])
        croix = Cross(col1, stroke_color=ROUGE_ERREUR, stroke_width=8).set_z_index(5)
        leg = self.t("seulement 0 retard", 44, BLEU_CALCUL).move_to(P(1.8, -0.55))
        self.play(*anims, run_time=0.5)
        self.play(Create(croix), FadeIn(leg, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("0,5.")
        eg = self.t("=", 60)
        res = self.t("0,5", 70, JAUNE_TITRE, BOLD)
        VGroup(eg, res).arrange(RIGHT, buff=0.35).move_to(P(-1.6, -1.95))
        self.play(FadeIn(eg), TransformFromCopy(tb.val[1][0], res), run_time=0.6)
        self.insister(res, 0.3)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tb = self.tableau(P(-0.75, 1.2), 0.92, posees=True)
        self.play(FadeIn(tb), run_time=0.4)
        self.au_mot("Que vaut")
        e = self.expr("≤", 2, 70)
        q = suite(e, self.t("= ?", 70, ORANGE_RETENUE, BOLD), buff=0.35).move_to(P(-0.9, -1.0))
        q[1].match_y(e)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.insister(e[3], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        tb = self.tableau(P(-0.75, 1.2), 0.92, posees=True)
        self.add(tb)
        self.titre_ecran("Correction")
        e = self.expr("≤", 2, 56).move_to(P(-4.3, -0.55))
        self.play(FadeIn(e, shift=UP * 0.15), *self.estomper(tb, 3), run_time=0.5)
        lig, ts, ss, eg, res = self.ligne_somme(PROBAS[:3], ["+"] * 2, "0,95", fs=54)
        lig.move_to(P(-0.9, -1.75))
        for k, mot in enumerate(("0,5 plus", "0,3 plus", "0,15 :")):
            self.au_mot(mot)
            extra = [FadeIn(ss[k - 1])] if k > 0 else []
            self.glisser(tb, k, ts[k], 0.5, extra=extra + self.allumer(tb, k))
        self.au_mot("0,95.")
        self.play(FadeIn(eg), FadeIn(res, scale=1.6), run_time=0.5)
        self.insister(res, 0.3)
        self.au_mot("Ou 1 moins")
        fs = 54
        ou, un, moins, c5 = self.t("ou", 40, BLEU_CALCUL), self.t("1", fs, WHITE, BOLD), self.t("−", fs), \
            self.t("0,05", fs, ROSE_CPL, BOLD)
        l2 = suite(ou, un, moins, buff=0.3).move_to(P(-2.0, -2.95))
        for m in (ou, moins):
            m.match_y(un)
        self.play(FadeIn(ou), FadeIn(un, scale=1.5), FadeIn(moins), *self.allumer(tb, 3, ROSE_CPL), run_time=0.5)
        self.au_mot("0,05.")
        c5.next_to(moins, RIGHT, buff=0.3).match_y(un)
        self.glisser(tb, 3, c5, 0.6)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = suite(self.t("Une loi fait", fs), self.t("1", fs + 6, JAUNE_TITRE, BOLD), buff=0.18)
        l2 = suite(self.expr("=", "a", fs + 2), self.t(": une case", fs), buff=0.2)
        l3 = suite(self.expr("≤", "a", fs + 2), self.t(": on additionne les cases jusqu'à", fs),
                   self.t("a", fs + 2, JAUNE_TITRE), buff=0.2)
        l4 = suite(self.t("Attention au", fs), self.t("« ou égal »", fs, ORANGE_RETENUE, BOLD), buff=0.18)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3, l4)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 12.0:
            lignes.scale_to_fit_width(12.0)
        lignes.move_to(P(-0.5, 0.2))
        for mot, l in zip(["Une loi", "P de X égale a", "inférieur ou égal à a", "Attention"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
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
        self.ecran_somme()
        self.ecran_egal()
        self.ecran_inferieur()
        self.ecran_superieur()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaVaCalculerSTMG(ProbaVaCalculerBase):
    identite = "Maths STMG — EleveAI"
