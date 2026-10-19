# proba_va_equitable.py
# EleveAI — Maths STMG ET Maths 1re spécialité — série « Probabilités » :
# UN JEU ÉQUITABLE, l'espérance du gain NET (micros : va_esp_jeu_equitable en
# STMG, va_esperance_probleme en 1re spé), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_va_equitable_short.py
# (ceinture jaune, la roulette : 18/37 − 19/37 = −1/37, « le casino gagne toujours »).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaVaEquitableBase porte toutes les scènes ; les deux
# sous-classes ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure : la ROUE de la kermesse (style de proba_va_esperance.py :
# carte blanche, parts cerclées d'encre, étiquettes blanches liserées), un
# secteur gagnant de 0,2, et une pièce de 1 € qui PART (la mise) ; le TABLEAU
# DE LOI du coach (canvasLoi « Loi du gain algébrique (mise déduite) » →
# tableau_donnees : en-tête sombre « xᵢ | 4 | −1 », ligne « P(X = xᵢ) » au
# libellé bleu clair, cases blanches, colonne allumée en jaune) ; une BALANCE
# joueur / organisateur : à l'équilibre (équitable), puis penchée côté
# organisateur (la variante à 4 €).
#   · 02 : reçu − payé : 5 − 1 = 4 et −1, posés dans l'en-tête du tableau ;
#   · 03 : la ligne P(X = xᵢ) se remplit quand la voix dit 0,2 puis 0,8 ;
#     E(X) = 0,8 − 0,8 = 0 ;
#   · 06 : « 5 × 0,2 = 1 » barré : la mise oubliée ;
#   · 07b : g × 0,1 − 1 × 0,9 = 0, g = 9, la roue rend 10 €.
# ⛔ PAS D'ÉCART : chaque nombre n'apparaît que quand la voix le dit.
#
# Écrans : 00 garde · 01 la roue · 02 le gain net · 03 le calcul ·
# 04 équitable (la balance) · 05 la variante à 4 € · 06 le piège · 07 défi ·
# 07b correction · 08 ce que tu as appris · 09 fin « Entraîne-toi sur eleveai.fr ».
#
# Voix : manim/voix/stmg-premiere-spe-proba-va-equitable.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_equitable.py ProbaVaEquitableSTMG -o eleveai-maths-stmg-proba-va-equitable --media_dir manim/scripts/stmg/media-va_equitable
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_equitable.py ProbaVaEquitablePremiereSpe -o eleveai-maths-premiere-proba-va-equitable --media_dir manim/scripts/stmg/media-va_equitable
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_equitable_short.py ShortProbaVaEquitableSTMG -o eleveai-maths-stmg-proba-va-equitable-short --media_dir manim/scripts/stmg/media-va_equitable
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_equitable_short.py ShortProbaVaEquitablePremiereSpe -o eleveai-maths-premiere-proba-va-equitable-short --media_dir manim/scripts/stmg/media-va_equitable
# (le short ne montre aucune classe : un seul rendu, copié sous les deux noms.)
# Puis copier dans manim/sorties/stmg/maths/probabilites/26-va-equitable/ et
# manim/sorties/premiere/maths/probabilites/26-va-equitable/.

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
from proba_pc_conditionnelle import ANNEAU, BORD, ENCRE, ENTETE, LIBELLE, SURLIGNE, suite  # noqa: E402

# Les couleurs de la roue (palette du coach : resolveColor)
COUL_RIEN = "#94A3B8"   # rien : gris
COUL_GAGNE = "#F97316"  # le secteur gagnant : orange
CARTE_BORD = "#E2E8F0"
COMMUN = "#FDE047"      # le clignotement
OR = "#FBBF24"          # la pièce de 1 €
OR_FONCE = "#B45309"
BOIS = "#CBD5E1"        # la balance
JOUEUR = "#38BDF8"
ORGA = "#F97316"


def P(x, y):
    return np.array([x, y, 0.0])


def etiquette_blanche(texte, fs):
    t = Text(texte, font_size=fs, color=WHITE, weight=BOLD)
    t.set_stroke(ENCRE, width=4, background=True)
    return t


def xi(fs=28, color=WHITE, weight=BOLD):
    """« xᵢ » : un x et un petit i en indice (dessiné, sans dépendre de la police)."""
    x = Text("x", font_size=fs, color=color, weight=weight)
    i = Text("i", font_size=int(fs * 0.62), color=color, weight=weight)
    i.next_to(x, RIGHT, buff=0.02).align_to(x, DOWN).shift(DOWN * fs * 0.0045)
    return VGroup(x, i)


def piece(texte="1 €", r=0.42, fs=26):
    """Une pièce : disque doré, liseré, sa valeur écrite."""
    d = Circle(radius=r, fill_color=OR, fill_opacity=1, stroke_color=OR_FONCE, stroke_width=5)
    anneau = Circle(radius=r * 0.8, stroke_color=OR_FONCE, stroke_width=2)
    t = Text(texte, font_size=fs, color=ENCRE, weight=BOLD)
    return VGroup(d, anneau, t)


class RoueKermesse(VGroup):
    """La roue de la kermesse (style de proba_va_esperance.py) : secteurs
    proportionnels à leurs probabilités, du haut dans le sens horaire.
    secteurs = [(étiquette, proba, couleur), …]. Les étiquettes ne sont PAS
    ajoutées : on les pose quand la voix les dit (self.etiq[k])."""

    def __init__(self, secteurs, centre=P(-4.55, -0.35), r=1.6, fs=30, carte=True, **kw):
        super().__init__(**kw)
        self.c, self.r = centre, r
        self.parts, self.etiq = VGroup(), VGroup()
        a0 = PI / 2
        for nom, p, coul in secteurs:
            ang = TAU * p
            s = AnnularSector(inner_radius=0, outer_radius=r, angle=-ang, start_angle=a0, fill_color=coul,
                              fill_opacity=1, stroke_color=ENCRE, stroke_width=3).shift(centre)
            m = a0 - ang / 2
            k = 0.6 if p >= 0.2 else 0.7
            e = etiquette_blanche(nom, fs if p >= 0.2 else int(fs * 0.85))
            e.move_to(centre + P(k * r * np.cos(m), k * r * np.sin(m))).set_z_index(2)
            self.parts.add(s)
            self.etiq.add(e)
            a0 -= ang
        self.disque = VGroup(self.parts, self.etiq)
        self.moyeu = Dot(centre, radius=0.08, color=ENCRE).set_z_index(3)
        self.pointe = Polygon(P(0, 0), P(-0.17, 0.3), P(0.17, 0.3), fill_color=ENCRE, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=1.5).move_to(centre + UP * (r + 0.33),
                                                                            aligned_edge=DOWN)
        self.carte = RoundedRectangle(width=2 * r + 0.95, height=2 * r + 1.25, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=CARTE_BORD, stroke_width=2)
        self.carte.move_to(centre + UP * 0.14)
        if carte:
            self.add(self.carte)
        self.add(self.parts, self.moyeu, self.pointe)

    def tout(self, ks=None):
        """Les étiquettes déjà posées (toutes, ou celles des indices ks)."""
        for k, e in enumerate(self.etiq):
            if ks is None or k in ks:
                self.add(e)
        return self

    def clignote(self, scene, k, fois=3, couleur=COMMUN):
        bord = self.parts[k].copy().set_fill(opacity=0).set_stroke(couleur, 10).set_z_index(4)
        for _ in range(fois):
            scene.play(FadeIn(bord), run_time=0.2)
            scene.play(FadeOut(bord), run_time=0.2)
        scene.play(FadeIn(bord), run_time=0.2)
        return bord

    def tourner(self, scene, tours=2.0, run_time=2.0):
        """La roue tourne (sens horaire) ; les étiquettes restent droites."""
        angle = -tours * TAU
        # ⛔ Seules les étiquettes DÉJÀ posées tournent : jouer une animation sur
        # le disque entier ajouterait à l'écran des nombres pas encore dits.
        presents = scene.get_mobject_family_members()
        self.disque = VGroup(self.parts, VGroup(*[e for e in self.etiq if e in presents]))
        depart = self.disque.copy()

        def f(m, a):
            m.become(depart)
            m.rotate(angle * a, about_point=self.c)
            for e in m[1]:
                e.rotate(-angle * a)

        scene.play(UpdateFromAlphaFunc(self.disque, f), run_time=run_time,
                   rate_func=rate_functions.ease_out_cubic)


class TableauLoi(VGroup):
    """Le tableau de loi du coach : en-tête sombre « xᵢ | valeurs », puis la
    ligne « P(X = xᵢ) » à libellé bleu clair et cases blanches. Toutes les
    cases de nombres sont vides au départ : `poser(r, j)` écrit le nombre."""

    def __init__(self, lignes, valeurs, coin=P(-1.6, 2.55), larg_lab=2.9, larg=1.45, h=0.72, fs=28, **kw):
        super().__init__(**kw)
        nl, nc = len(lignes), len(valeurs[0])
        self.rect = [[None] * (nc + 1) for _ in range(nl)]
        self.fonds, self.labs = VGroup(), VGroup()
        for r in range(nl):
            for c in range(nc + 1):
                coul = ENTETE if r == 0 else (LIBELLE if c == 0 else WHITE)
                w = larg_lab if c == 0 else larg
                x = coin[0] + (larg_lab / 2 if c == 0 else larg_lab + larg * (c - 0.5))
                y = coin[1] - h * (r + 0.5)
                rc = Rectangle(width=w, height=h, fill_color=coul, fill_opacity=1, stroke_color=BORD,
                               stroke_width=2).move_to(P(x, y))
                self.rect[r][c] = rc
                self.fonds.add(rc)
        for r, lab in enumerate(lignes):
            lab.move_to(self.rect[r][0]).set_z_index(3)
            if lab.width > larg_lab - 0.2:
                lab.scale_to_fit_width(larg_lab - 0.2)
            self.labs.add(lab)
        self.val = [[Text(v, font_size=int(fs * 1.15), color=WHITE if r == 0 else ENCRE, weight=BOLD)
                     .move_to(self.rect[r][j + 1]).set_z_index(3) for j, v in enumerate(ligne)]
                    for r, ligne in enumerate(valeurs)]
        self.add(self.fonds, self.labs)

    def case(self, r, j):
        return self.rect[r][j + 1]

    def poser(self, r, j):
        return FadeIn(self.val[r][j], scale=1.6)

    def tout(self, lignes=None):
        for r, ligne in enumerate(self.val):
            if lignes is None or r in lignes:
                for t in ligne:
                    self.add(t)
        return self

    def allumer(self, j, rangs=None):
        """La colonne j en jaune (cases blanches seulement), comme le coach."""
        rangs = range(1, len(self.rect)) if rangs is None else rangs
        return [self.case(r, j).animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5) for r in rangs]

    def eteindre(self, j, rangs=None):
        rangs = range(1, len(self.rect)) if rangs is None else rangs
        return [self.case(r, j).animate.set_fill(WHITE, 1).set_stroke(BORD, 2) for r in rangs]


def lab_xi(fs=28):
    return xi(fs, WHITE)


def lab_p(fs=26):
    """« P(X = xᵢ) » en encre, gras."""
    return suite(Text("P(X =", font_size=fs, color=ENCRE, weight=BOLD), xi(fs, ENCRE),
                 Text(")", font_size=fs, color=ENCRE, weight=BOLD), buff=0.06)


def balance_vg(c, d, theta, h_post, L, noms=("Joueur", "Organisateur"), fs=26):
    """Une balance : fléau incliné de theta (theta < 0 : le plateau de DROITE
    descend), deux plateaux suspendus, leur nom dessous, un pied, un socle."""
    u = np.array([np.cos(theta), np.sin(theta), 0.0])
    g, dr = c - d * u, c + d * u
    pied = Line(c, c + DOWN * h_post, stroke_width=12, color=BOIS)
    socle = RoundedRectangle(width=1.7, height=0.22, corner_radius=0.08, fill_color=BOIS, fill_opacity=1,
                             stroke_width=0).move_to(c + DOWN * h_post)
    fleau = Line(g, dr, stroke_width=10, color=BOIS)
    axe = Dot(c, radius=0.13, color=JAUNE_TITRE)
    vg = VGroup(pied, socle, fleau)
    for bout, nom, coul in ((g, noms[0], JOUEUR), (dr, noms[1], ORGA)):
        pc = bout + DOWN * L
        plateau = Polygon(pc + P(-0.75, 0), pc + P(0.75, 0), pc + P(0.5, -0.2), pc + P(-0.5, -0.2),
                          fill_color=coul, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        fils = VGroup(Line(bout, pc + P(-0.7, 0)), Line(bout, pc + P(0.7, 0))).set_stroke(BOIS, 2.5)
        t = Text(nom, font_size=fs, color=coul, weight=BOLD).next_to(plateau, DOWN, buff=0.14)
        vg.add(fils, plateau, t)
    vg.add(axe)
    return vg


class Balance:
    """La balance animée : self.angle (ValueTracker), self.mob (redessiné)."""

    def __init__(self, c, d=2.6, h_post=2.7, L=1.2, fs=26, theta=0.0):
        self.angle = ValueTracker(theta)
        self.mob = always_redraw(lambda: balance_vg(c, d, self.angle.get_value(), h_post, L, fs=fs))

    def pencher(self, theta, run_time=0.8, rate_func=smooth):
        return self.angle.animate(run_time=run_time, rate_func=rate_func).set_value(theta)


X0 = -1.6   # le bord gauche de la colonne de droite (la roue occupe la gauche)
ROUE = [("5 €", 0.2, COUL_GAGNE), ("rien", 0.8, COUL_RIEN)]
LOI = [["4", "−1"], ["0,2", "0,8"]]


class ProbaVaEquitableBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-spe-proba-va-equitable"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE, weight=NORMAL):
        return Text(texte, font_size=font_size, color=color, weight=weight)

    def insister(self, mob, run_time=0.3, bord=None):
        """Agrandir puis rétrécir (×1,5 puis ÷1,5), jamais de zoom de caméra."""
        self.play(mob.animate.scale(1.5, about_edge=bord), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5, about_edge=bord), run_time=run_time)

    def calcul(self, morceaux, fs=44, buff=0.16):
        """Une ligne de calcul ; morceaux = [(texte, couleur), …]."""
        return suite(*[self.t(x, fs, c) for x, c in morceaux], buff=buff)

    def gauche(self, mob, y):
        return mob.move_to(P(X0, y), aligned_edge=LEFT)

    def tableau(self, valeurs=LOI):
        return TableauLoi([lab_xi(), lab_p()], valeurs)

    def barrer(self, mob, couleur=ROUGE_ERREUR):
        return Line(mob.get_left() + LEFT * 0.1, mob.get_right() + RIGHT * 0.1, color=couleur, stroke_width=7)

    def mise_part(self, r, depart):
        """La pièce de 1 € (la mise) quitte le joueur et file dans la roue."""
        pc = piece().move_to(depart)
        self.play(FadeIn(pc, scale=0.4), run_time=0.35)
        self.play(pc.animate.move_to(r.c + UP * 0.2).scale(0.5), run_time=0.7, rate_func=rate_functions.ease_in_quad)
        self.play(FadeOut(pc, scale=0.3), Indicate(r.parts, color=COMMUN, scale_factor=1.04), run_time=0.4)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Un jeu équitable ?", 54, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.85))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        r = RoueKermesse(ROUE, centre=P(-0.6, -0.15), r=1.05, fs=24, carte=False)
        self.play(FadeIn(r, scale=0.6), run_time=0.5)
        r.tourner(self, tours=1.5, run_time=1.6)
        self.attendre_voix(marge=1.0)

    # ── 01 : la roue : 1 € pour jouer, 0,2 de recevoir 5 € ──────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La roue de la kermesse")
        r = RoueKermesse(ROUE)
        self.play(FadeIn(r, scale=0.8), run_time=0.6)
        self.au_mot("on paie 1 euro")
        l1 = self.gauche(suite(self.t("On paie", 40), self.t("1 €", 48, OR, BOLD), self.t("pour jouer", 40),
                               buff=0.22), 1.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.mise_part(r, l1[1].get_center() + DOWN * 0.75)
        self.au_mot("probabilité de 0,2")
        l2 = self.gauche(suite(self.t("Avec", 40), self.t("0,2", 48, BLEU_CALCUL, BOLD), self.t(":", 40),
                               buff=0.2), 0.25)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        bord = r.clignote(self, 0)
        self.au_mot("on reçoit 5 euros")
        l2b = suite(self.t("on reçoit", 40), self.t("5 €", 48, COUL_GAGNE, BOLD), buff=0.2)
        l2b.next_to(l2, RIGHT, buff=0.22)
        self.play(FadeIn(l2b, shift=LEFT * 0.1), FadeIn(r.etiq[0], scale=1.6), run_time=0.5)
        self.au_mot("Sinon, rien")
        l3 = self.gauche(suite(self.t("Sinon :", 40), self.t("rien", 44, COUL_RIEN, BOLD), buff=0.2), -1.1)
        self.play(FadeOut(bord), FadeIn(l3, shift=UP * 0.1), FadeIn(r.etiq[1], scale=1.6), run_time=0.5)
        r.tourner(self, tours=1.6, run_time=1.6)
        self.attendre_voix()

    # ── 02 : le gain NET : reçu − payé ───────────────────────────────────────

    def ecran_gain(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-gain")
        self.titre_ecran("Le gain NET")
        r = RoueKermesse(ROUE).tout()
        self.add(r)
        tab = self.tableau()
        self.au_mot("le gain NET, X")
        self.play(FadeIn(tab, shift=DOWN * 0.1), run_time=0.5)
        self.au_mot("ce qu'on reçoit moins")
        l1 = self.gauche(suite(self.t("X", 44, JAUNE_TITRE, BOLD), self.t("=", 40), self.t("reçu", 40, COUL_GAGNE),
                               self.t("−", 40), self.t("payé", 40, OR), buff=0.2), 0.45)
        self.play(FadeIn(l1[:3], shift=UP * 0.1), run_time=0.4)
        self.au_mot("moins ce qu'on a payé")
        self.play(FadeIn(l1[3:], shift=UP * 0.1), run_time=0.4)
        self.au_mot("Si on gagne")
        bord = r.clignote(self, 0, fois=2)
        l2 = self.gauche(self.calcul([("Gagné :", WHITE), ("5", COUL_GAGNE), ("−", WHITE), ("1", OR), ("=", WHITE),
                                      ("4 €", JAUNE_TITRE)], 44), -0.6)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("5 moins 1")
        self.play(FadeIn(l2[1:4], shift=UP * 0.1), run_time=0.4)
        self.au_mot("égale 4 euros")
        self.play(FadeIn(l2[4]), FadeIn(l2[5], scale=1.8), *tab.allumer(0, [1]), run_time=0.4)
        self.play(TransformFromCopy(l2[5][0], tab.val[0][0]), run_time=0.6)
        self.au_mot("Si on perd")
        self.play(FadeOut(bord), *tab.eteindre(0, [1]), run_time=0.3)
        bord2 = r.clignote(self, 1, fois=2)
        self.au_mot("moins 1 euro")
        l3 = self.gauche(self.calcul([("Perdu :", WHITE), ("−1 €", ROUGE_ERREUR)], 44), -1.6)
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(l3[1], scale=1.8), *tab.allumer(1, [1]), run_time=0.4)
        self.play(TransformFromCopy(l3[1][:2], tab.val[0][1]), run_time=0.6)
        self.play(FadeOut(bord2), *tab.eteindre(1, [1]), run_time=0.3)
        self.attendre_voix()

    # ── 03 : le calcul de E(X) ──────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        self.titre_ecran("L'espérance du gain NET")
        r = RoueKermesse(ROUE).tout()
        tab = self.tableau().tout(lignes=[0])
        self.add(r, tab)
        self.au_mot("4 fois 0,2")
        l1 = self.gauche(self.calcul([("4", WHITE), ("×", WHITE), ("0,2", BLEU_CALCUL), ("=", WHITE),
                                      ("0,8", JAUNE_TITRE)], 46), 0.55)
        self.play(*tab.allumer(0, [1]), tab.poser(1, 0), TransformFromCopy(tab.val[0][0], l1[0]), FadeIn(l1[1]),
                  FadeIn(l1[2], scale=1.4), run_time=0.6)
        self.au_mot("égale 0,8. Moins")
        self.play(FadeIn(l1[3]), FadeIn(l1[4], scale=1.6), run_time=0.4)
        self.au_mot("Moins 1 fois 0,8")
        l2 = self.calcul([("−1", WHITE), ("×", WHITE), ("0,8", BLEU_CALCUL), ("=", WHITE), ("−0,8", JAUNE_TITRE)], 46)
        self.gauche(l2, -0.4)
        self.play(*tab.eteindre(0, [1]), *tab.allumer(1, [1]), tab.poser(1, 1),
                  TransformFromCopy(tab.val[0][1], l2[0]), FadeIn(l2[1]), FadeIn(l2[2], scale=1.4), run_time=0.6)
        self.au_mot("égale moins 0,8")
        self.play(FadeIn(l2[3]), FadeIn(l2[4], scale=1.6), run_time=0.4)
        self.au_mot("E de X égale")
        ex = self.gauche(self.calcul([("E(X)", JAUNE_TITRE), ("=", WHITE), ("0,8", WHITE), ("−", WHITE),
                                      ("0,8", WHITE), ("=", WHITE), ("0", JAUNE_TITRE)], 52), -1.55)
        self.play(*tab.eteindre(1, [1]), FadeIn(ex[:2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("0,8 moins 0,8")
        self.play(TransformFromCopy(l1[4], ex[2]), FadeIn(ex[3]), TransformFromCopy(l2[4][1:], ex[4]), run_time=0.6)
        self.au_mot(", égale 0.")
        cadre = SurroundingRectangle(ex, color=JAUNE_TITRE, buff=0.2, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(ex[5]), FadeIn(ex[6], scale=2), run_time=0.4)
        self.play(Create(cadre), run_time=0.4)
        self.insister(ex[6], 0.25)
        self.attendre_voix()

    # ── 04 : espérance nulle : la balance à l'équilibre ─────────────────────

    def ecran_equitable(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-equitable")
        self.titre_ecran("Équitable")
        ex = self.calcul([("E(X)", JAUNE_TITRE), ("=", WHITE), ("0", JAUNE_TITRE)], 48).move_to(P(-0.8, 2.6))
        self.play(FadeIn(ex, scale=1.3), run_time=0.5)
        b = Balance(P(-0.8, 0.9), d=2.6, h_post=2.7, L=1.2, theta=0.22)
        self.play(FadeIn(b.mob), run_time=0.4)
        self.au_mot("en moyenne")
        self.play(b.pencher(-0.16, 0.7), run_time=0.7)
        self.play(b.pencher(0.08, 0.6), run_time=0.6)
        self.play(b.pencher(0.0, 0.6), run_time=0.6)
        self.au_mot("on ne gagne rien")
        l1 = self.t("En moyenne : on ne gagne rien,", 34).move_to(P(-0.8, -2.45))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("et on ne perd rien")
        l2 = self.t("on ne perd rien", 34).next_to(l1, DOWN, buff=0.15)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Le jeu est équitable")
        eq = self.t("Jeu équitable !", 40, VERT_OK, BOLD).move_to(P(-0.8, 1.6))
        self.play(FadeIn(eq, scale=1.6), run_time=0.5)
        self.insister(eq, 0.25)
        self.attendre_voix()

    # ── 05 : la variante : la roue ne rend que 4 € ──────────────────────────

    def ecran_variante(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-variante")
        self.titre_ecran("Et si… ?")
        r = RoueKermesse([("4 €", 0.2, COUL_GAGNE), ("rien", 0.8, COUL_RIEN)])
        self.add(r)
        self.add(r.etiq[1])
        self.au_mot("que 4 euros")
        self.play(FadeIn(r.etiq[0], scale=1.8), run_time=0.5)
        bord = r.clignote(self, 0, fois=2)
        self.au_mot("Gain net : 3")
        l1 = self.gauche(suite(self.t("Gain net :", 40), self.t("3 €", 46, JAUNE_TITRE, BOLD), buff=0.2), 2.1)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(l1[1], scale=1.6), run_time=0.5)
        self.au_mot("3 fois 0,2")
        l2 = self.gauche(self.calcul([("3", WHITE), ("×", WHITE), ("0,2", BLEU_CALCUL), ("=", WHITE),
                                      ("0,6", JAUNE_TITRE)], 44), 1.35)
        self.play(FadeIn(l2[:3], shift=UP * 0.1), run_time=0.4)
        self.au_mot("égale 0,6")
        self.play(FadeIn(l2[3]), FadeIn(l2[4], scale=1.6), run_time=0.4)
        self.au_mot("0,6 moins 0,8")
        l3 = self.gauche(self.calcul([("0,6", WHITE), ("−", WHITE), ("0,8", BLEU_CALCUL), ("=", WHITE),
                                      ("−0,2", ROUGE_ERREUR)], 44), 0.6)
        self.play(TransformFromCopy(l2[4], l3[0]), FadeIn(l3[1:3], shift=UP * 0.1), run_time=0.5)
        self.au_mot("égale moins 0,2")
        self.play(FadeIn(l3[3]), FadeIn(l3[4], scale=1.8), run_time=0.4)
        self.au_mot("Espérance négative")
        neg = self.gauche(self.t("Espérance négative", 40, ROUGE_ERREUR, BOLD), -0.2)
        # la roue s'efface : la balance prend sa place et penche côté organisateur
        b = Balance(P(-4.4, 0.75), d=1.6, h_post=2.6, L=1.0, fs=22)
        self.play(FadeIn(neg, scale=1.3), FadeOut(VGroup(r, r.etiq, bord)), run_time=0.5)
        self.play(FadeIn(b.mob), run_time=0.3)
        self.au_mot("défavorable au joueur")
        self.play(b.pencher(-0.3, 1.0, rate_functions.ease_out_bounce), run_time=1.0)
        l4 = self.gauche(self.t("Défavorable au joueur", 40, ORANGE_RETENUE, BOLD), -1.0)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Il perd 20 centimes")
        l5 = self.gauche(suite(self.t("Il perd", 38), self.t("20 centimes", 42, ROUGE_ERREUR, BOLD), buff=0.2),
                         -1.8)
        l6 = self.gauche(suite(self.t("par partie,", 38), self.t("en moyenne", 38), buff=0.2), -2.5)
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(l6[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("en moyenne.")
        self.play(FadeIn(l6[1], shift=UP * 0.1), run_time=0.4)
        self.insister(l5[1], 0.25)
        self.attendre_voix()

    # ── 06 : le piège : oublier la mise ─────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        r = RoueKermesse(ROUE).tout()
        self.add(r)
        self.au_mot("oublier la mise")
        l1 = self.gauche(self.t("Oublier la mise", 42, ORANGE_RETENUE, BOLD), 2.0)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("5 fois 0,2")
        l2 = self.gauche(self.calcul([("5", COUL_GAGNE), ("×", WHITE), ("0,2", BLEU_CALCUL), ("=", WHITE),
                                      ("1", JAUNE_TITRE)], 46), 1.0)
        self.play(TransformFromCopy(r.etiq[0][0], l2[0]), FadeIn(l2[1:3], shift=UP * 0.1), run_time=0.5)
        self.au_mot("égale 1 :")
        self.play(FadeIn(l2[3]), FadeIn(l2[4], scale=1.8), run_time=0.4)
        self.au_mot("on croirait gagner 1 euro")
        l3 = self.gauche(suite(self.t("On croirait gagner", 32), self.t("1 €", 38, JAUNE_TITRE, BOLD),
                               self.t("par partie ?", 32), buff=0.18), 0.1)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Mais on a payé")
        b2, b3 = self.barrer(l2), self.barrer(l3)
        self.play(Create(b2), Create(b3), l2.animate.set_opacity(0.45), l3.animate.set_opacity(0.45), run_time=0.5)
        l4 = self.gauche(suite(self.t("Mais on a payé", 38), self.t("1 €", 44, OR, BOLD), self.t("!", 38),
                               buff=0.2), -0.85)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.mise_part(r, l4[1].get_center() + DOWN * 0.7)
        self.au_mot("toujours le gain NET")
        l5 = self.gauche(self.t("Toujours le gain NET", 40, VERT_OK, BOLD), -2.1)
        self.play(FadeIn(l5, scale=1.3), run_time=0.5)
        self.insister(l5, 0.25, LEFT)
        self.attendre_voix()

    # ── 07 : défi : une chance sur 10, combien rendre ? ─────────────────────

    def roue_defi(self):
        return RoueKermesse([("?", 0.1, COUL_GAGNE), ("rien", 0.9, COUL_RIEN)], fs=36)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        r = self.roue_defi()
        self.play(FadeIn(r, scale=0.8), run_time=0.5)
        self.au_mot("Mise de 1 euro")
        l1 = self.gauche(suite(self.t("Mise :", 40), self.t("1 €", 46, OR, BOLD), buff=0.2), 1.9)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.mise_part(r, l1[1].get_center() + DOWN * 0.75)
        self.au_mot("une chance sur 10")
        l2 = self.gauche(suite(self.t("1 chance sur 10", 42, BLEU_CALCUL, BOLD), self.t("de gagner", 40),
                               buff=0.22), 0.75)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        bord = r.clignote(self, 0)
        self.au_mot("Combien la roue")
        l3 = self.gauche(suite(self.t("La roue rend :", 40), self.t("? €", 50, ORANGE_RETENUE, BOLD), buff=0.22),
                         -0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(r.etiq[0], scale=2), run_time=0.5)
        self.insister(l3[1], 0.25)
        self.au_mot("pour que le jeu soit équitable")
        l4 = self.gauche(self.t("pour un jeu équitable", 40, VERT_OK), -1.3)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeOut(bord), run_time=0.4)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction : g × 0,1 − 1 × 0,9 = 0 ────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        r = self.roue_defi().tout(ks=[0])
        tab = self.tableau(valeurs=[["g", "−1"], ["0,1", "0,9"]])
        self.add(r, tab)
        self.au_mot("On appelle g")
        l1 = self.gauche(suite(self.t("g", 44, JAUNE_TITRE, BOLD), self.t(": le gain net quand on gagne", 34),
                               buff=0.15), 0.5)
        self.play(FadeIn(l1, shift=UP * 0.1), tab.poser(0, 0), run_time=0.5)
        l2 = self.gauche(self.calcul([("g", JAUNE_TITRE), ("×", WHITE), ("0,1", BLEU_CALCUL), ("−", WHITE),
                                      ("1", WHITE), ("×", WHITE), ("0,9", BLEU_CALCUL), ("=", WHITE), ("0", WHITE)],
                                     46), -0.5)
        self.au_mot("g fois 0,1")
        self.play(*tab.allumer(0, [1]), tab.poser(1, 0), TransformFromCopy(tab.val[0][0], l2[0]), FadeIn(l2[1]),
                  FadeIn(l2[2], scale=1.4), run_time=0.6)
        self.au_mot("moins 1 fois 0,9")
        self.play(*tab.eteindre(0, [1]), *tab.allumer(1, [1]), tab.poser(0, 1), tab.poser(1, 1),
                  FadeIn(l2[3:7], shift=UP * 0.1), run_time=0.6)
        self.au_mot(", égale 0.")
        self.play(*tab.eteindre(1, [1]), FadeIn(l2[7]), FadeIn(l2[8], scale=1.8), run_time=0.4)
        self.au_mot("Donc g égale 9")
        l3 = self.gauche(suite(self.calcul([("g", JAUNE_TITRE), ("=", WHITE), ("9 €", JAUNE_TITRE)], 50),
                               self.t("de gain net", 36), buff=0.25), -1.5)
        cadre = SurroundingRectangle(l3[0], color=JAUNE_TITRE, buff=0.15, stroke_width=4, corner_radius=0.08)
        self.play(FadeIn(l3[0], scale=1.4), run_time=0.5)
        self.play(FadeIn(l3[1], shift=LEFT * 0.1), Create(cadre), run_time=0.4)
        self.au_mot("doit rendre 10 euros")
        l4 = self.gauche(suite(self.t("La roue rend", 40), self.t("10 €", 50, COUL_GAGNE, BOLD), buff=0.22), -2.45)
        dix = etiquette_blanche("10 €", 26).move_to(r.etiq[0])
        self.play(FadeIn(l4, shift=UP * 0.1), ReplacementTransform(r.etiq[0], dix), run_time=0.5)
        self.insister(l4[1], 0.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        items = [
            suite(self.t("L'espérance du gain NET,", fs, JAUNE_TITRE, BOLD), self.t("mise retirée", fs), buff=0.2),
            suite(self.t("Nulle :", fs, VERT_OK, BOLD), self.t("jeu équitable", fs), buff=0.2),
            suite(self.t("Négative :", fs, ROUGE_ERREUR, BOLD), self.t("défavorable au joueur", fs), buff=0.2),
            suite(self.t("Positive :", fs, BLEU_CALCUL, BOLD), self.t("favorable au joueur", fs), buff=0.2),
        ]
        blocs = VGroup(*[VGroup(self.coche(), it).arrange(RIGHT, buff=0.3) for it in items])
        blocs.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if blocs.width > 11.0:
            blocs.scale_to_fit_width(11.0)
        blocs.move_to(P(-0.8, 0.45))
        reperes = [("On calcule l'espérance", "mise retirée"), ("Nulle", "jeu équitable"),
                   ("Négative", "défavorable au joueur"), ("Positive", "favorable au joueur. Prochaine")]
        for (m1, m2), b in zip(reperes, blocs):
            self.au_mot(m1)
            self.play(FadeIn(b[1][0], shift=RIGHT * 0.2), Create(b[0]), run_time=0.4)
            self.au_mot(m2)
            self.play(FadeIn(b[1][1], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        self.play(Write(self.chute("Prochaine vidéo : l'espérance, une moyenne à long terme", font_size=32)))
        self.attendre_voix(marge=1.0)

    # ── 09 : l'écran de fin (règle du 19/10) ────────────────────────────────

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
        self.ecran_gain()
        self.ecran_calcul()
        self.ecran_equitable()
        self.ecran_variante()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement()


class ProbaVaEquitableSTMG(ProbaVaEquitableBase):
    identite = "Maths STMG — EleveAI"


class ProbaVaEquitablePremiereSpe(ProbaVaEquitableBase):
    identite = "Maths 1re spé — EleveAI"
