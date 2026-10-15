# proba_defi.py
# EleveAI — Maths 4e — Probabilités, épisode 8 : le défi (toute la méthode dans un seul jeu), AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE. Short jumeau : proba_defi_short.py (ceinture jaune).
#
# ⭐ LE DESSIN QUI PORTE TOUT : une roue de 10 secteurs numérotés de 1 à 10 qui
# tourne ; selon la règle choisie, la roue s'éteint et les secteurs FAVORABLES
# s'allument un par un, au moment où la voix les nomme (premiers : 2, 3, 5, 7 ;
# multiples de 3 : 3, 6, 9 ; plus grand que 7 : 8, 9, 10). Deux jauges comparent
# 40 % et 30 % ; le piège du 1 (pas premier) allume un secteur de trop.
#
# Voix : manim/voix/4e-proba-defi.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_defi.py ProbaDefi4e -o eleveai-maths-4e-proba-defi --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/08-defi/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

COUL_ROUE = ["#2563EB", "#DC2626", "#16A34A", "#D97706", "#9333EA"]
GRIS_ETEINT = "#4B5563"


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── la roue (paysage et short) ──────────────────────────────────────────────

def roue10(r=1.7, angle=0.0):
    """Une roue à 10 secteurs numérotés de 1 à 10 : [secteurs, numéros, moyeu].
    Tournée de `angle` ; les numéros restent droits."""
    secteurs, nums = VGroup(), VGroup()
    for i in range(10):
        a0 = PI / 2 - (i + 1) * TAU / 10 + angle
        secteurs.add(Sector(radius=r, angle=TAU / 10, start_angle=a0, fill_color=COUL_ROUE[i % 5],
                            fill_opacity=1, stroke_color=WHITE, stroke_width=3))
        am = a0 + TAU / 20
        nums.add(Text(str(i + 1), font_size=int(24 * r), color=WHITE, weight=BOLD)
                 .move_to(P(0.7 * r * math.cos(am), 0.7 * r * math.sin(am))))
    moyeu = Circle(radius=r * 0.12, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    moyeu.set_z_index(3)
    return VGroup(secteurs, nums, moyeu)


def angle_pour(k):
    """L'angle qui amène le numéro k sous la flèche du haut."""
    return k * TAU / 10 - TAU / 20


def fleche_roue(w, r):
    return Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.2 * r / 1.7 + 0.04).rotate(PI) \
        .next_to(w, UP, buff=0.02)


def placer_roue(w, centre, r, angle_actuel, angle_vise):
    """Tourne la roue SANS la redessiner (les Text coûtent cher à recréer) :
    les secteurs pivotent, les numéros suivent en restant droits."""
    w[0].rotate(angle_vise - angle_actuel, about_point=centre)
    for i, n in enumerate(w[1]):
        am = PI / 2 - (i + 1) * TAU / 10 + TAU / 20 + angle_vise
        n.move_to(centre + P(0.7 * r * math.cos(am), 0.7 * r * math.sin(am)))
    return angle_vise


def roue_qui_tourne(centre, r=1.3, vitesse=1.6):
    """Une roue qui tourne SANS FIN (updater)."""
    etat = {"a": 0.0}
    w = roue10(r).move_to(centre)

    def maj(m, dt):
        etat["a"] = placer_roue(m, centre, r, etat["a"], etat["a"] - vitesse * dt)

    w.add_updater(maj)
    return w


def eteindre(w, garder=()):
    """Toutes les cases s'éteignent (sauf `garder`, des numéros de 1 à 10)."""
    anims = []
    for i in range(10):
        if i + 1 in garder:
            continue
        anims += [w[0][i].animate.set_fill(GRIS_ETEINT, 0.45).set_stroke(WHITE, 3),
                  w[1][i].animate.set_opacity(0.45)]
    return anims


def allumer(w, k, couleur=None, bord=JAUNE_TITRE):
    """La case k s'allume : sa couleur revient, bordée de jaune."""
    i = k - 1
    w[0][i].set_z_index(1)
    w[1][i].set_z_index(2)
    return [w[0][i].animate.set_fill(couleur or COUL_ROUE[i % 5], 1).set_stroke(bord, 6),
            w[1][i].animate.set_opacity(1)]


def premiers_allumes(w, favs=(2, 3, 5, 7)):
    """La roue figée : seuls les favorables sont allumés (sans animation)."""
    for i in range(10):
        if i + 1 in favs:
            w[0][i].set_stroke(JAUNE_TITRE, 6).set_z_index(1)
            w[1][i].set_z_index(2)
        else:
            w[0][i].set_fill(GRIS_ETEINT, 0.45)
            w[1][i].set_opacity(0.45)


class DessinsDefi:
    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        g = VGroup()
        for m, c in morceaux:
            g.add(m if isinstance(m, Mobject) else self.t(m, font_size, c))
        return g.arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def tourner(self, centre, r, k_fin, tours=2, run_time=2.0, depart=0.0, w=None):
        """Fait tourner la roue et l'arrête sur le numéro k_fin ; rend la roue."""
        ang = ValueTracker(depart)
        if w is None:
            w = roue10(r, depart).move_to(centre)
            self.add(w)
        etat = {"a": depart}

        def maj(m):
            etat["a"] = placer_roue(m, centre, r, etat["a"], ang.get_value())

        w.add_updater(maj)
        self.play(ang.animate.set_value(tours * TAU + angle_pour(k_fin)), run_time=run_time,
                  rate_func=rate_functions.ease_out_cubic)
        w.remove_updater(maj)
        return w


class ProbaDefi4e(DessinsDefi, Notion4e):
    nom_voix = "4e-proba-defi"
    C_ROUE, R_ROUE = P(-4.4, -0.3), 1.7

    def roue_fixe(self, k=10):
        w = roue10(self.R_ROUE, angle_pour(k)).move_to(self.C_ROUE)
        return w, fleche_roue(w, self.R_ROUE)

    def cartes_numeros(self, y=1.6, cx=1.7):
        boites = VGroup(*[RoundedRectangle(width=0.6, height=0.7, corner_radius=0.1, stroke_color=WHITE,
                                           stroke_width=2.5) for _ in range(10)]).arrange(RIGHT, buff=0.1)
        boites.move_to(P(cx, y))
        nums = VGroup(*[self.t(str(i + 1), 32).move_to(b) for i, b in enumerate(boites)])
        return boites, nums

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le défi des probabilités", 52, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.5))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        w = roue_qui_tourne(P(-3.4, -0.05), 1.25)
        fl = fleche_roue(roue10(1.25).move_to(P(-3.4, -0.05)), 1.25)
        self.add(w, fl)
        self.au_mot("Tout ce que")
        q = VGroup(self.t("Tout ce que tu as appris,", 38, BLEU_CALCUL),
                   self.t("dans un seul jeu !", 44, JAUNE_TITRE)).arrange(DOWN, buff=0.25).move_to(P(2.2, 0.0))
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.5)
        self.au_mot("dans un seul jeu")
        self.play(FadeIn(q[1], scale=0.8), run_time=0.5)
        self.insister(q[1], 0.35)
        self.attendre_voix(marge=1.0)
        w.clear_updaters()

    # ── 01 : la situation ───────────────────────────────────────────────────

    def carte_regle(self, lettre, texte, y, cx=1.9, couleur=JAUNE_TITRE):
        haut = self.t(f"Règle {lettre}", 34, couleur)
        bas = self.t(texte, 30)
        g = VGroup(haut, bas).arrange(DOWN, buff=0.15)
        fond = RoundedRectangle(width=max(g.width + 0.6, 5.6), height=g.height + 0.4, corner_radius=0.15,
                                stroke_color=couleur, stroke_width=3, fill_color=couleur, fill_opacity=0.08)
        return VGroup(fond, g.move_to(fond)).move_to(P(cx, y))

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La roue de 1 à 10")
        self.au_mot("Une roue")
        w0, fl = self.roue_fixe(10)
        self.play(FadeIn(w0, scale=0.8), FadeIn(fl), run_time=0.6)
        self.remove(w0)
        w = self.tourner(self.C_ROUE, self.R_ROUE, 4, tours=1, run_time=1.6, depart=angle_pour(10))

        self.au_mot("Avant de la faire tourner")
        av_ = self.t("Avant de tourner, tu choisis ta règle.", 32, BLEU_CALCUL).move_to(P(1.9, 2.1))
        self.play(FadeIn(av_, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("Règle A")
        ca = self.carte_regle("A", "gagner avec un nombre premier", 0.8)
        self.play(FadeIn(ca, shift=LEFT * 0.3), run_time=0.6)
        self.au_mot("Règle B")
        cb = self.carte_regle("B", "gagner avec un multiple de 3", -0.75)
        self.play(FadeIn(cb, shift=LEFT * 0.3), run_time=0.6)
        self.au_mot("Laquelle")
        q = self.t("A ou B ?", 52, JAUNE_TITRE).move_to(P(1.4, -2.3))
        self.play(FadeIn(q, scale=0.7), run_time=0.4)
        self.remove(w)
        self.tourner(self.C_ROUE, self.R_ROUE, 7, tours=2, run_time=2.0, depart=angle_pour(4))
        self.attendre_voix()

    # ── 02 : les issues ─────────────────────────────────────────────────────

    def ecran_issues(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-issues")
        self.titre_ecran("D'abord, les issues")
        w, fl = self.roue_fixe(7)
        self.add(w, fl)
        boites, nums = self.cartes_numeros(1.4)
        self.au_mot("1, 2")
        self.play(FadeIn(boites), run_time=0.3)
        extraits = ["1, 2", "2, 3", "3, 4", "4, 5", "5, 6", "6, 7", "7, 8", "8, 9", "9, 10", "10. Il"]
        for k, ex in enumerate(extraits):
            self.au_mot(ex)
            self.play(FadeIn(nums[k], scale=1.6), Indicate(VGroup(w[0][k], w[1][k]), color=WHITE, scale_factor=1.12),
                      run_time=0.35)
            self.bring_to_front(w[1], w[2])
        self.au_mot("Il y en a 10")
        dix = self.ligne([("10", JAUNE_TITRE), ("issues", VERT_OK)], 48, 0.2).move_to(P(1.7, 0.1))
        acc = Brace(boites, DOWN, buff=0.1, color=WHITE)
        self.play(GrowFromCenter(acc), FadeIn(dix, shift=UP * 0.15), run_time=0.6)
        self.insister(dix[0], 0.35)
        self.au_mot("équiprobables")
        eq = self.t("équiprobables : 10 cases de même taille", 30, BLEU_CALCUL).move_to(P(1.9, -1.1))
        self.play(FadeIn(eq, shift=UP * 0.15),
                  LaggedStart(*[Indicate(VGroup(s, n), color=WHITE, scale_factor=1.08) for s, n in zip(w[0], w[1])],
                              lag_ratio=0.1), run_time=1.4)
        self.bring_to_front(w[1], w[2])
        self.attendre_voix()

    # ── 03 / 04 : une règle ─────────────────────────────────────────────────

    def ecran_regle(self, cle, lettre, titre, favs, extraits, n, dec, pct):
        self.clear()
        self.add_mascotte()
        self.dire(cle)
        self.titre_ecran(titre)
        w, fl = self.roue_fixe(7)
        self.add(w, fl)
        boites, nums = self.cartes_numeros(1.6)
        self.add(boites, nums)
        self.play(*eteindre(w), nums.animate.set_opacity(0.45), run_time=0.6)
        for k, ex in zip(favs, extraits[:len(favs)]):
            self.au_mot(ex)
            self.play(*allumer(w, k), nums[k - 1].animate.set_opacity(1).set_color(VERT_OK),
                      boites[k - 1].animate.set_stroke(VERT_OK, 5), run_time=0.4)
            self.play(Flash(w[1][k - 1], color=JAUNE_TITRE, line_length=0.15, flash_radius=0.35), run_time=0.3)
        ex_fav, ex_frac, ex_dec, ex_pct = extraits[len(favs):]
        self.au_mot(ex_fav)
        fav = self.ligne([(str(n), JAUNE_TITRE), ("issues favorables", VERT_OK)], 40, 0.2).move_to(P(1.7, 0.5))
        self.play(FadeIn(fav, shift=UP * 0.15), run_time=0.5)
        self.au_mot(ex_frac)
        frac = self.ligne([(f"P({lettre}) =", WHITE), (self.fraction(n, 10, 48, JAUNE_TITRE), None)], 44, 0.3)
        frac.move_to(P(1.7, -0.75))
        self.play(FadeIn(frac[0]), FadeIn(frac[1], shift=LEFT * 0.2), run_time=0.5)
        self.au_mot(ex_dec)
        l3 = VGroup(self.t("soit", 40), self.t(dec, 44), self.t("soit", 40), self.t(f"{pct} %", 48, VERT_OK))
        l3.arrange(RIGHT, buff=0.28).move_to(P(1.7, -1.95))
        self.play(FadeIn(l3[:2], shift=LEFT * 0.2), run_time=0.5)
        self.au_mot(ex_pct)
        self.play(FadeIn(l3[2:], shift=LEFT * 0.2), run_time=0.5)
        self.insister(l3[3], 0.35)
        self.attendre_voix()

    # ── 05 : la conclusion ──────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-conclusion")
        self.titre_ecran("Quelle règle choisir ?")
        c, r = P(-4.6, -0.5), 1.5
        w = roue10(r, angle_pour(7)).move_to(c)
        fl = fleche_roue(w, r)
        self.add(w, fl)
        premiers_allumes(w)

        L = 3.6
        x0 = -1.0

        def rangee(lettre, pct, y):
            lab = self.t(lettre, 36, JAUNE_TITRE).move_to(P(x0 - 0.45, y))
            cadre = Rectangle(width=L, height=0.5, stroke_color=WHITE, stroke_width=2.5)
            cadre.move_to(P(x0 + L / 2, y))
            rempli = Rectangle(width=L * pct / 100, height=0.5, stroke_width=0, fill_color=VERT_OK, fill_opacity=0.85)
            rempli.align_to(cadre, LEFT).set_y(y)
            txt = self.t(f"{pct} %", 36, VERT_OK).next_to(cadre, RIGHT, buff=0.2)
            return lab, cadre, rempli, txt

        ra = rangee("A", 40, 2.0)
        rb = rangee("B", 30, 1.15)
        self.add(ra[0], ra[1], rb[0], rb[1])
        self.au_mot("40 % contre")
        self.play(GrowFromEdge(ra[2], LEFT), FadeIn(ra[3]), run_time=0.7)
        self.au_mot("30 %")
        self.play(GrowFromEdge(rb[2], LEFT), FadeIn(rb[3]), run_time=0.7)
        self.au_mot("la règle A est")
        cadre = SurroundingRectangle(VGroup(*ra), color=VERT_OK, buff=0.1, stroke_width=4)
        concl = self.t("La règle A est plus favorable.", 36, VERT_OK).move_to(P(1.4, 0.25))
        self.play(Create(cadre), FadeIn(concl, shift=UP * 0.15), run_time=0.6)

        self.au_mot("Et le contraire")
        q = self.t("Et le contraire de A ?", 36, BLEU_CALCUL).move_to(P(1.4, -0.65))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Ne pas tomber")
        contraires = (1, 4, 6, 8, 9, 10)
        anims = []
        for k in range(1, 11):
            if k in contraires:
                anims += allumer(w, k, bord=BLEU_CALCUL)
            else:
                anims += [w[0][k - 1].animate.set_fill(GRIS_ETEINT, 0.45).set_stroke(WHITE, 3),
                          w[1][k - 1].animate.set_opacity(0.45)]
        np_ = self.t("pas un nombre premier", 32).next_to(q, DOWN, buff=0.25)
        self.play(*anims, FadeIn(np_), run_time=0.8)
        self.au_mot("6 issues")
        res = VGroup(self.t("P =", 40), self.fraction(6, 10, 44, JAUNE_TITRE)).arrange(RIGHT, buff=0.25)
        res.move_to(P(0.6, -2.3))
        self.play(FadeIn(res, shift=UP * 0.15), run_time=0.5)
        self.au_mot("60 %")
        soit = VGroup(self.t("soit", 40), self.t("60 %", 44, VERT_OK)).arrange(RIGHT, buff=0.25)
        soit.next_to(res, RIGHT, buff=0.35)
        self.play(FadeIn(soit, shift=LEFT * 0.2), run_time=0.5)
        self.insister(soit[1], 0.35)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège : le nombre 1")
        w, fl = self.roue_fixe(7)
        self.add(w, fl)
        premiers_allumes(w)

        self.au_mot("1 n'est pas")
        l1 = self.t("1 n'est pas un nombre premier.", 38, ORANGE_RETENUE).move_to(P(1.7, 1.7))
        self.play(FadeIn(l1, shift=DOWN * 0.15), Indicate(w[1][0], color=ORANGE_RETENUE, scale_factor=1.8), run_time=0.8)
        self.au_mot("Il n'a qu'un")
        l2 = self.ligne([("Diviseurs de 1 :", WHITE), ("1", JAUNE_TITRE), ("— un seul.", WHITE)], 34, 0.2)
        l2.move_to(P(1.7, 0.75))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.6)
        self.insister(l2[1], 0.3)

        self.au_mot("Si tu le comptes")
        self.play(*allumer(w, 1, couleur=ROUGE_ERREUR, bord=ROUGE_ERREUR), run_time=0.5)
        self.play(Wiggle(w[0][0]), run_time=0.5)
        self.au_mot("50 %")
        faux = self.ligne([("Avec le 1 :", WHITE), ("50 %", ROUGE_ERREUR)], 40, 0.25).move_to(P(1.7, -0.4))
        self.play(FadeIn(faux, shift=UP * 0.15), run_time=0.4)
        self.play(Create(self.barrer(faux[1])), run_time=0.4)
        self.au_mot("au lieu de 40 %")
        juste = self.ligne([("Sans le 1 :", WHITE), ("40 %", VERT_OK)], 40, 0.25).move_to(P(1.7, -1.45))
        juste.align_to(faux, LEFT)
        self.play(FadeIn(juste, shift=UP * 0.15),
                  w[0][0].animate.set_fill(GRIS_ETEINT, 0.45).set_stroke(WHITE, 3), w[1][0].animate.set_opacity(0.45),
                  run_time=0.6)
        self.play(Create(SurroundingRectangle(juste[1], color=VERT_OK, buff=0.1)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : le défi ────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-defi")
        self.titre_ecran("À toi de jouer")
        w0, fl = self.roue_fixe(7)
        self.add(w0, fl)
        self.au_mot("Même roue")
        self.remove(w0)
        self.tourner(self.C_ROUE, self.R_ROUE, 2, tours=2, run_time=1.8, depart=angle_pour(7))
        self.au_mot("Règle C")
        cc = self.carte_regle("C", "gagner avec un nombre plus grand que 7", 1.65, cx=1.8, couleur=BLEU_CALCUL)
        self.play(FadeIn(cc, shift=LEFT * 0.3), run_time=0.6)
        x_g = -1.0
        self.au_mot("Quelle est la probabilité")
        q1 = self.t("1. P(C), en pourcentage ?", 34).move_to(P(0, 0.2)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Est-elle meilleure")
        q2 = self.t("2. Meilleure que la règle B ?", 34).move_to(P(0, -0.65)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Obtenir 11")
        q3 = self.t("3. Obtenir 11 : quel événement ?", 34).move_to(P(0, -1.5)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(q3, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        ch = self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=38)
        self.play(Write(ch), run_time=0.8)
        self.insister(ch, 0.35)
        self.attendre_voix(marge=2.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        w, fl = self.roue_fixe(2)
        self.add(w, fl)
        self.au_mot("Plus grand que 7")
        self.play(*eteindre(w), run_time=0.5)
        l1 = self.t("Plus grand que 7 :", 36).move_to(P(0.6, 1.7))
        self.play(FadeIn(l1), run_time=0.4)
        nums = VGroup()
        for k, ex in ((8, "8, 9"), (9, "9 et 10"), (10, "et 10")):
            self.au_mot(ex)
            n = self.t(str(k), 40, VERT_OK)
            nums.add(n)
            nums.arrange(RIGHT, buff=0.3).next_to(l1, RIGHT, buff=0.3)
            self.play(*allumer(w, k), FadeIn(n, scale=1.5), run_time=0.4)
        self.au_mot("3 issues sur 10")
        frac = self.ligne([("P(C) =", WHITE), (self.fraction(3, 10, 46, JAUNE_TITRE), None)], 42, 0.3)
        frac.move_to(P(0.3, 0.55))
        self.play(FadeIn(frac, shift=UP * 0.15), run_time=0.5)
        self.au_mot("donc 30 %")
        soit = VGroup(self.t("soit", 40), self.t("30 %", 46, VERT_OK)).arrange(RIGHT, buff=0.25)
        soit.next_to(frac, RIGHT, buff=0.4)
        self.play(FadeIn(soit, shift=LEFT * 0.2), run_time=0.5)
        self.insister(soit[1], 0.35)
        self.au_mot("Autant que")
        aut = self.t("Autant que la règle B : pas mieux.", 32, BLEU_CALCUL).move_to(P(1.9, -0.6))
        self.play(FadeIn(aut, shift=UP * 0.15), run_time=0.5)
        self.au_mot("obtenir 11")
        onze = self.t("11", 54, ROUGE_ERREUR).move_to(P(0.5, -2.4))
        self.play(FadeIn(onze, scale=0.5), run_time=0.3)
        self.play(onze.animate.move_to(P(-2.2, -2.35)), run_time=0.5)
        self.play(Create(self.barrer(onze)), run_time=0.3)
        l4 = self.ligne([("Obtenir 11 :", WHITE), ("impossible", ROUGE_ERREUR)], 38, 0.25).move_to(P(1.9, -1.6))
        self.play(FadeIn(l4, shift=UP * 0.15), run_time=0.5)
        self.au_mot("probabilité 0")
        p0 = self.ligne([("P = 0", JAUNE_TITRE)], 44).move_to(P(1.9, -2.5))
        self.play(FadeIn(p0, scale=0.7), run_time=0.4)
        self.insister(p0, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        w = roue_qui_tourne(P(4.3, 0.9), 1.15, vitesse=1.0)
        fl = fleche_roue(roue10(1.15).move_to(P(4.3, 0.9)), 1.15)
        self.add(w, fl)
        acquis = [
            ("Lister", "Lister les issues."),
            ("repérer", "Repérer les favorables."),
            ("calculer, convertir", "Calculer la probabilité."),
            ("convertir", "Convertir en pourcentage."),
            ("comparer. Voilà", "Comparer."),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 34)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.38)
        lignes.move_to(P(-2.6, 0.45))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(Create(l[0]), FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Voilà toute")
        meth = self.t("Toute la méthode !", 36, VERT_OK).move_to(P(4.3, -0.65))
        self.play(FadeIn(meth, scale=0.8), run_time=0.5)
        self.au_mot("L'épisode suivant")
        self.play(Write(self.chute("Épisode suivant : les fréquences", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)
        w.clear_updaters()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_issues()
        self.ecran_regle("03-regle-a", "A", "Règle A : un nombre premier", (2, 3, 5, 7),
                         ["2, 3", "3, 5", "5 et 7", "et 7", "4 issues favorables", "4 sur 10", "c'est 0,4", "40 %"],
                         4, "0,4", 40)
        self.ecran_regle("04-regle-b", "B", "Règle B : un multiple de 3", (3, 6, 9),
                         ["3, 6", "6 et 9", "et 9", "3 issues favorables", "3 sur 10", "c'est 0,3", "30 %"],
                         3, "0,3", 30)
        self.ecran_conclusion()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
