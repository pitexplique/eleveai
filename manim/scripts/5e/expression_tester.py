# expression_tester.py
# EleveAI — Maths 5e — Expression littérale, épisode 5 : tester une égalité
# (notionId : litteral_calcul, micro : litteral_tester), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau (modèle Pythagore 4e). Même structure que l'épisode 1
# (expression_comprendre.py). Paysage ceinture JAUNE.
#
# ⭐ LE DESSIN QUI PORTE TOUT : la BALANCE à deux plateaux. Le côté gauche de
# l'égalité s'écrit sous le plateau gauche, le côté droit sous le plateau droit,
# et chaque plateau reçoit sa valeur. Vraie → la balance reste horizontale
# (coche verte) ; fausse → elle penche du côté le plus lourd (croix rouge).
#
# Exemples repris de l'écran « tester » de la paysage 5e générale
# (litteral_calcul.py) : 3x + 1 = 10 pour x = 3 (vraie) et x = 2 (fausse) ;
# puis une lettre des deux côtés : 2x − 3 = x + 2 pour x = 5.
# Défi : 4x = 12 pour x = 3 (vraie) et x = 1 (fausse).
#
# Voix : manim/voix/5e-expression-tester.json (Julie, débit −8).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/expression_tester.py ExpressionTester5e -o eleveai-maths-5e-expression-tester --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/expression-litterale/05-tester/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from signes_expression_2de import echelle_ceintures

METAL = "#CBD5E1"
PENTE = 0.2  # l'inclinaison (radians) d'une balance qui penche
BAL_C = np.array([-0.6, 0.9, 0.0])  # l'axe de la grande balance
BAL_S = 1.15


class Notion5e(Notion6e):
    identite = "Maths 5e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


class ExpressionTester5e(Notion5e):
    nom_voix = "5e-expression-tester"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        """Une ligne faite de morceaux (texte, couleur), pour colorier un seul nombre."""
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, facteur=1.5):
        self.play(mob.animate.scale(facteur), run_time=0.5)
        self.play(mob.animate.scale(1 / facteur), run_time=0.5)

    def calc(self, morceaux, font_size=46, buff=0.3):
        """Un calcul écrit symbole par symbole : « 3 × 3 + 1 = 10 », espacement régulier."""
        out = []
        for texte, c in morceaux:
            out += [(m, c) for m in texte.split()]
        return self.ligne(out, font_size, buff)

    def croix(self, couleur=ROUGE_ERREUR, taille=0.2):
        return VGroup(Line(P(-taille, -taille), P(taille, taille)),
                      Line(P(-taille, taille), P(taille, -taille))).set_stroke(couleur, 6)

    # ── la balance ──────────────────────────────────────────────────────────

    def pied(self, centre=BAL_C, s=BAL_S):
        """Le support fixe : le mât, le socle, l'axe."""
        bas = centre + DOWN * 2.0 * s
        mat = Line(centre, bas + UP * 0.08 * s, stroke_width=8 * s, color=METAL)
        socle = RoundedRectangle(width=2.0 * s, height=0.18 * s, corner_radius=0.06 * s,
                                 fill_color=METAL, fill_opacity=1, stroke_width=0).move_to(bas)
        axe = Dot(centre, radius=0.11 * s, color=JAUNE_TITRE)
        return VGroup(mat, socle, axe)

    def poids(self, texte, s=1.0, color=BLEU_CALCUL):
        k = s ** 0.6
        lbl = self.t(texte, 48 * k, BLACK)
        fond = RoundedRectangle(width=max(0.8 * k, lbl.width + 0.3 * k), height=0.7 * k,
                                corner_radius=0.1 * k, fill_color=color, fill_opacity=1,
                                stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def fleau(self, angle=0.0, g=None, d=None, centre=BAL_C, s=BAL_S):
        """Le bras et ses deux plateaux, inclinés de `angle` (positif : la droite monte).

        Les plateaux restent horizontaux ; un poids (texte) peut être posé sur chacun.
        """
        L = 3.0 * s
        u = np.array([np.cos(angle), np.sin(angle), 0.0])
        bras = Line(centre - L * u, centre + L * u, stroke_width=8 * s, color=METAL)
        groupe = VGroup(bras)
        for bout, texte in [(centre - L * u, g), (centre + L * u, d)]:
            haut_plateau = bout + DOWN * 1.0 * s
            fils = VGroup(Line(bout, haut_plateau + LEFT * 0.85 * s),
                          Line(bout, haut_plateau + RIGHT * 0.85 * s)).set_stroke(METAL, 2.5 * s)
            plateau = Polygon(haut_plateau + LEFT * 0.95 * s, haut_plateau + RIGHT * 0.95 * s,
                              haut_plateau + RIGHT * 0.6 * s + DOWN * 0.25 * s,
                              haut_plateau + LEFT * 0.6 * s + DOWN * 0.25 * s,
                              stroke_color=WHITE, stroke_width=2 * s,
                              fill_color="#64748B", fill_opacity=1)
            p = self.poids(texte, s) if texte else VGroup()
            if texte:
                p.next_to(haut_plateau, UP, buff=0.02)
            groupe.add(VGroup(fils, plateau, p))
        return groupe

    def penche(self, fleau, angle, g, d, centre=BAL_C, s=BAL_S):
        cible = self.fleau(angle, g, d, centre, s)
        self.play(Transform(fleau, cible), run_time=1.2, rate_func=smooth)

    def poser(self, fleau, cote, texte, centre=BAL_C, s=BAL_S):
        """Pose un poids sur un plateau (cote 1 = gauche, 2 = droite) d'une balance horizontale."""
        p = self.poids(texte, s)
        haut = fleau[cote][1].get_top()
        p.next_to(haut, UP, buff=0.02)
        self.play(FadeIn(p, shift=DOWN * 0.4), run_time=0.6)
        self.remove(p)
        fleau[cote].remove(fleau[cote][2])
        fleau[cote].add(p)
        self.add(fleau)

    def balance(self, centre=BAL_C, s=BAL_S):
        pied = self.pied(centre, s)
        fl = self.fleau(0.0, None, None, centre, s)
        return pied, fl

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Tester une égalité", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("Une égalité avec")
        q = self.ligne([("Une égalité avec une lettre est-elle", BLEU_CALCUL), ("vraie", VERT_OK),
                        ("?", BLEU_CALCUL)], 42, buff=0.2)
        q.move_to(P(-0.4, 0.3))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.insister(q[1])
        self.attendre_voix(marge=1.5)

    # ── 01 : la devinette ───────────────────────────────────────────────────

    def ecran_devinette(self):
        self.clear()
        self.dire("01-devinette")
        m = self.add_mascotte(scale=1.35)
        m.move_to(P(-4.8, -0.8))
        self.titre_ecran("La devinette de Ti Margo")
        bulle = RoundedRectangle(width=6.6, height=1.7, corner_radius=0.4, stroke_color=WHITE,
                                 stroke_width=3, fill_color="#1E293B", fill_opacity=1)
        bulle.move_to(P(1.5, 1.4))
        queue = Polygon(P(-1.15, 0.62), P(-0.4, 0.62), P(-3.3, 0.25),
                        stroke_width=0, fill_color="#1E293B", fill_opacity=1)
        bords = VGroup(Line(P(-1.15, 0.55), P(-3.3, 0.25)), Line(P(-0.4, 0.55), P(-3.3, 0.25))
                       ).set_stroke(WHITE, 3)
        contenu = self.ligne([("?", JAUNE_TITRE), ("× 3", BLEU_CALCUL), ("+ 1", BLEU_CALCUL),
                              ("→", WHITE), ("10", WHITE)], 60, buff=0.35).move_to(bulle)
        self.au_mot("pense à un nombre")
        self.play(FadeIn(bulle), FadeIn(queue), FadeIn(bords))
        self.play(GrowFromCenter(contenu[0]))
        self.au_mot("multiplie par 3")
        self.play(FadeIn(contenu[1], shift=RIGHT * 0.2))
        self.au_mot("il ajoute 1")
        self.play(FadeIn(contenu[2], shift=RIGHT * 0.2))
        self.au_mot("Il trouve 10")
        self.play(FadeIn(contenu[3]), GrowFromCenter(contenu[4]))
        self.au_mot("son nombre est 3")
        toi = self.ligne([("Toi :", WHITE), ("3", JAUNE_TITRE), ("?", WHITE)], 64, buff=0.3)
        toi.move_to(P(2.2, -0.9))
        self.play(FadeIn(toi, shift=UP * 0.2))
        self.insister(toi[1])
        self.au_mot("Comment en être sûr")
        self.play(Write(self.chute("Comment en être sûr ?", color=BLEU_CALCUL, font_size=40)))
        self.attendre_voix()

    # ── 02 : écrire l'égalité ───────────────────────────────────────────────

    def ecran_ecrire(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-ecrire")
        self.titre_ecran("Écrire l'égalité")
        self.au_mot("J'appelle x")
        a = self.ligne([("son nombre", WHITE), ("→", WHITE), ("x", JAUNE_TITRE)], 44).move_to(P(-0.6, 2.2))
        self.play(FadeIn(a[0]), FadeIn(a[1], shift=RIGHT * 0.2))
        self.play(GrowFromCenter(a[2]))
        eq = self.ligne([("3x + 1", WHITE), ("=", WHITE), ("10", WHITE)], 96, buff=0.5).move_to(P(-0.6, 0.5))
        eq[0][1].set_color(JAUNE_TITRE)
        self.au_mot("3 x plus 1.")
        self.play(Write(eq[0]))
        self.au_mot("Il trouve 10")
        self.play(Write(eq[1]), Write(eq[2]))
        self.au_mot("Une égalité a deux côtés")
        self.insister(eq[1])
        self.au_mot("à gauche")
        sg = Line(eq[0].get_corner(DL) + DOWN * 0.25, eq[0].get_corner(DR) + DOWN * 0.25,
                  stroke_width=6, color=BLEU_CALCUL)
        lg = self.t("côté gauche", 38, BLEU_CALCUL).next_to(sg, DOWN, buff=0.3)
        self.play(Create(sg), FadeIn(lg, shift=UP * 0.2))
        self.au_mot("et à droite")
        sd = Line(eq[2].get_corner(DL) + DOWN * 0.25, eq[2].get_corner(DR) + DOWN * 0.25,
                  stroke_width=6, color=BLEU_CALCUL)
        ld = self.t("côté droit", 38, BLEU_CALCUL).next_to(sd, DOWN, buff=0.3)
        ld.align_to(lg, UP)
        self.play(Create(sd), FadeIn(ld, shift=UP * 0.2))
        self.au_mot("du signe égal")
        self.play(Indicate(eq[1], color=JAUNE_TITRE, scale_factor=1.6))
        self.play(Write(self.chute("Deux côtés, de part et d'autre du signe =", color=JAUNE_TITRE, font_size=34)))
        self.attendre_voix()

    # ── les écrans « balance » (03, 04, 05) ─────────────────────────────────

    def ecran_balance(self, voix, titre, egalite, x_val, mot_x,
                      gauche, mot_g, res_g, mot_res_g, val_g,
                      droite, mot_d, res_d, mot_res_d, val_d,
                      mot_cmp, verdict_mot, verdict, mot_eq=None):
        """Un test d'égalité sur la balance.

        `gauche` / `droite` : morceaux (texte, couleur) du calcul écrit sous le plateau ;
        `res_g` / `res_d` : le résultat (« = 10 ») qui s'ajoute au bout, ou None.
        En bas : la comparaison (« 10 = 10 »), puis le verdict.
        """
        self.clear()
        self.add_mascotte()
        self.dire(voix)
        self.titre_ecran(titre)
        eq = self.t(egalite, 56).move_to(P(-0.6, 2.5))
        pied, fl = self.balance()
        if mot_eq:
            self.play(FadeIn(pied), FadeIn(fl))
            self.au_mot(mot_eq)
            self.play(Write(eq))
        else:
            self.play(FadeIn(eq), FadeIn(pied), FadeIn(fl))

        self.au_mot(mot_x)
        xv = self.t(f"x = {x_val}", 56, JAUNE_TITRE).move_to(P(-5.4, 2.5))
        self.play(GrowFromCenter(xv))
        self.insister(xv, 1.4)

        L = 3.0 * BAL_S
        xg, xd, y = BAL_C[0] - L, BAL_C[0] + L, -1.95
        for cote, x, morceaux, mot, res, mot_res, val in [
                (1, xg, gauche, mot_g, res_g, mot_res_g, val_g),
                (2, xd, droite, mot_d, res_d, mot_res_d, val_d)]:
            complet = morceaux + ([(res, WHITE)] if res else [])
            ligne = self.calc(complet).move_to(P(x, y))
            n = len(self.calc(morceaux))
            self.au_mot(mot)
            self.play(FadeIn(ligne[:n], shift=UP * 0.2))
            if res:
                self.au_mot(mot_res)
                self.play(FadeIn(ligne[n:], shift=LEFT * 0.2))
            self.poser(fl, cote, val)

        self.au_mot(mot_cmp)
        vraie = int(val_g) == int(val_d)
        coul = VERT_OK if vraie else ROUGE_ERREUR
        signe = self.coche(taille=0.28) if vraie else self.croix(taille=0.22)
        bas = VGroup(signe, self.calc([(f"{val_g} {'=' if vraie else '≠'} {val_d}", coul)], 52),
                     self.t(": " + verdict, 46, coul)).arrange(RIGHT, buff=0.35)
        bas.move_to(P(-0.6, -3.1))
        if vraie:
            self.play(Wiggle(fl, scale_value=1.03, rotation_angle=0.02 * TAU), run_time=1.0)
        else:
            angle = -PENTE if int(val_d) > int(val_g) else PENTE
            self.penche(fl, angle, val_g, val_d)
        self.play(FadeIn(bas[1]))
        self.insister(bas[1])

        self.au_mot(verdict_mot)
        self.play(FadeIn(bas[2], shift=UP * 0.15), Create(signe))
        self.attendre_voix()

    def ecran_vrai(self):
        J, B = JAUNE_TITRE, BLEU_CALCUL
        self.ecran_balance(
            "03-tester-vrai", "Je teste x = 3", "3x + 1 = 10", "3", "Je teste x égale 3",
            [("3 ×", B), ("3", J), ("+ 1", B)], "À gauche : 3 fois 3", "= 10", "ça fait 10", "10",
            [("10", B)], "À droite : 10", None, None, "10",
            "Les deux côtés sont égaux", "vraie pour x égale 3", "vraie pour x = 3")

    def ecran_faux(self):
        J, B = JAUNE_TITRE, BLEU_CALCUL
        self.ecran_balance(
            "04-tester-faux", "Et pour x = 2 ?", "3x + 1 = 10", "2", "Et pour x égale 2",
            [("3 ×", B), ("2", J), ("+ 1", B)], "À gauche : 3 fois 2", "= 7", "ça fait 7", "7",
            [("10", B)], "À droite : 10", None, None, "10",
            "7 n'est pas égal", "fausse pour x égale 2", "fausse pour x = 2")

    def ecran_deux_cotes(self):
        J, B = JAUNE_TITRE, BLEU_CALCUL
        self.ecran_balance(
            "05-deux-cotes", "Une lettre des deux côtés", "2x − 3 = x + 2", "5", "pour x égale 5",
            [("2 ×", B), ("5", J), ("− 3", B)], "À gauche : 2 fois 5", "= 7", "moins 3, ça fait 7", "7",
            [("5", J), ("+ 2", B)], "À droite : 5 plus 2", "= 7", "plus 2, ça fait 7", "7",
            "7 égale 7", "vraie pour x égale 5", "vraie pour x = 5",
            mot_eq="2 x moins 3 égale")

    # ── 06 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-methode")
        self.titre_ecran("La méthode en 3 étapes")
        etapes = [("Un : je calcule", "1.", "Je calcule le côté gauche."),
                  ("Deux : je calcule", "2.", "Je calcule le côté droit."),
                  ("Trois : je compare", "3.", "Je compare.")]
        lignes = VGroup(*[self.ligne([(n, JAUNE_TITRE), (txt, WHITE)], 44, buff=0.25)
                          for _, n, txt in etapes])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to(P(-1.6, 1.4))
        for (mot, _, _), l in zip(etapes, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.7)
        s = 0.6
        cv, cf = P(-4.2, -0.8), P(2.2, -0.8)
        self.au_mot("Égaux ?")
        pv, fv = self.balance(cv, s)
        fv = self.fleau(0.0, "7", "7", cv, s)
        tv = VGroup(self.coche(), self.t("Égaux : vraie", 40, VERT_OK)).arrange(RIGHT, buff=0.25)
        tv.move_to(cv + DOWN * 2.0 + LEFT * 0.2)
        self.play(FadeIn(pv), FadeIn(fv))
        self.play(FadeIn(tv, shift=UP * 0.2))
        self.au_mot("Différents ?")
        pf, ff = self.balance(cf, s)
        ff = self.fleau(0.0, "7", "10", cf, s)
        tf = VGroup(self.croix(taille=0.17), self.t("Différents : fausse", 40, ROUGE_ERREUR)).arrange(RIGHT, buff=0.25)
        tf.move_to(cf + DOWN * 2.0 + RIGHT * 0.2)
        self.play(FadeIn(pf), FadeIn(ff), run_time=0.6)
        self.penche(ff, -PENTE, "7", "10", cf, s)
        self.play(FadeIn(tf, shift=UP * 0.2), run_time=0.6)
        self.attendre_voix(marge=1.5)

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("L'égalité 4 x égale 12")
        eq = self.t("4x = 12", 96).move_to(P(-3.6, 1.6))
        eq[1].set_color(JAUNE_TITRE)
        self.play(Write(eq))
        c = P(3.3, 1.95)
        pied, fl = self.balance(c, 0.72)
        fl = self.fleau(0.0, "?", "?", c, 0.72)
        self.play(FadeIn(pied), FadeIn(fl))
        self.au_mot("vraie pour x égale 3")
        self.play(FadeIn(self.t("1. Vraie pour x = 3 ?", 44, BLEU_CALCUL).move_to(P(-0.6, -0.1))))
        self.au_mot("Et pour x égale 1")
        self.play(FadeIn(self.t("2. Vraie pour x = 1 ?", 44, BLEU_CALCUL).move_to(P(-0.6, -0.95))))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        eq = self.t("4x = 12", 60).move_to(P(-0.6, 2.35))
        eq[1].set_color(JAUNE_TITRE)
        self.add(eq)
        s = 0.6
        for y, xv, mot_x, mot_calc, res, mot_cmp, val, vraie, verdict in [
            (1.15, "3", "Pour x égale 3", "4 fois 3", "= 12", "12 égale 12", "12", True, "12 = 12 : vraie"),
            (-1.15, "1", "Pour x égale 1", "4 fois 1", "= 4", "4 n'est pas égal", "4", False, "4 ≠ 12 : fausse"),
        ]:
            self.au_mot(mot_x)
            tx = self.t(f"x = {xv} :", 46, JAUNE_TITRE).move_to(P(-5.6, y))
            self.play(FadeIn(tx, shift=RIGHT * 0.2))
            self.au_mot(mot_calc)
            tc = self.calc([("4 ×", BLEU_CALCUL), (xv, JAUNE_TITRE), (res, BLEU_CALCUL)], 46)
            tc.next_to(tx, RIGHT, buff=0.45)
            self.play(Write(tc))
            c = P(3.4, y + 0.45)
            pied, fl = self.balance(c, s)
            fl = self.fleau(0.0, val, "12", c, s)
            self.play(FadeIn(pied), FadeIn(fl), run_time=0.6)
            self.au_mot(mot_cmp)
            signe = self.coche(taille=0.22) if vraie else self.croix(taille=0.17)
            v = VGroup(signe, self.t(verdict, 44, VERT_OK if vraie else ROUGE_ERREUR)).arrange(RIGHT, buff=0.25)
            v.next_to(tc, DOWN, buff=0.35, aligned_edge=LEFT)
            if not vraie:
                self.penche(fl, -PENTE, val, "12", c, s)
            self.play(FadeIn(v[1], shift=UP * 0.15), Create(signe))
            self.insister(v[1], 1.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris (règle du 13/10 : des affirmations) ─────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("on calcule chaque côté", "On calcule chaque côté"),
            ("puis on compare", "Puis on compare"),
            ("Égaux", "Égaux : l'égalité est vraie"),
            ("Différents", "Différents : l'égalité est fausse"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 34)).arrange(RIGHT, buff=0.3)
                          for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 10.0:  # ne pas toucher Ti-Margo (coin bas-droit)
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.5))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 6")
        self.play(Write(self.chute("Épisode 6 : développer", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_devinette()
        self.ecran_ecrire()
        self.ecran_vrai()
        self.ecran_faux()
        self.ecran_deux_cotes()
        self.ecran_methode()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
