# proba6_frequence_comparer.py
# EleveAI — Maths 6e — série « Probabilités », épisode 8 : ce qu'on observe,
# ce qu'on calcule (micro : proba_frequence_comparer), AVEC VOIX. Paysage 16:9,
# CEINTURE JAUNE. Short jumeau : proba6_frequence_comparer_short.py.
#
# Écrans : 00 garde · 01 un dé, 1 sur 6 ≈ 0,17 (repère « calculé » sur
# l'échelle), 60 lancers, 13 six (grille de 60 dés) · 02 la fréquence observée
# 13 sur 60 ≈ 0,22 (repère « observé ») · 03 comparer (le tableau du coach,
# l'écart sur l'échelle, d'autres séries tombent autour) · 04 40 sur 60 ≈ 0,67 :
# beaucoup trop loin, truqué ? · 05 le piège des 6 lancers · 06 défi pièce
# 100 lancers, 48 piles · 06b correction (0,48 tout près de 0,5) · 07 ce que
# tu as appris · 08 abonnement.
#
# ⭐ FIL ROUGE : l'échelle de 0 à 1. Le « calculé » se pose AU-DESSUS (bleu),
# l'« observé » EN DESSOUS (orange) : l'écart entre les deux se voit.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque 6e/maths/probabilites.bank.ts) :
#   · « de » : carte blanche, 6 faces en 3 × 2, points foncés aux positions du
#     composant, face surlignée sur fond ambré (ici le 6) ; les 60 lancers
#     reprennent la même face, en petit, les 6 surlignés ;
#   · « tableau » (micro proba_frequence_comparer) : en-têtes sur fond gris
#     clair en gras, cases blanches, case surlignée ambre.
#
# Voix : manim/voix/6e-proba-frequence-comparer.json (Julie, débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/proba6_frequence_comparer.py Proba6FrequenceComparer -o eleveai-maths-6e-proba-frequence-comparer --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/08-observe-calcule/.

import math
import random
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import piece_qui_tourne  # noqa: E402

# Les couleurs du coach
ENCRE = "#0f172a"        # liserés et points
FACE_DE = "#f8fafc"
FACE_ACTIVE = "#fef3c7"  # face surlignée (ambre)
BORD_ACTIF = "#fbbf24"
ENTETE = "#f1f5f9"       # en-tête du tableau (slate-100)
CASE_BORD = "#cbd5e1"
AMBRE_TEXTE = "#78350f"
GRIS_ETEINT = "#6B7280"
CALCULE = BLEU_CALCUL
OBSERVE = ORANGE_RETENUE


class Notion6eProba(Notion6e):
    identite = "Maths 6e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les canvas du coach ─────────────────────────────────────────────────────

POINTS_COACH = {
    1: [(50, 50)],
    2: [(30, 30), (70, 70)],
    3: [(30, 30), (50, 50), (70, 70)],
    4: [(30, 30), (70, 30), (30, 70), (70, 70)],
    5: [(30, 30), (70, 30), (50, 50), (30, 70), (70, 70)],
    6: [(30, 28), (70, 28), (30, 50), (70, 50), (30, 72), (70, 72)],
}


def de_coach(face, cote=1.0, actif=False):
    """Une face de dé comme sur le coach : carré arrondi, liseré foncé, points
    aux positions du composant (viewBox 100, carré de 84)."""
    k = cote / 84
    corps = RoundedRectangle(width=cote, height=cote, corner_radius=16 * k,
                             fill_color=FACE_ACTIVE if actif else FACE_DE, fill_opacity=1,
                             stroke_color=BORD_ACTIF if actif else ENCRE, stroke_width=6 if actif else 3)
    pts = VGroup(*[Dot(P((x - 50) * k, -(y - 50) * k), radius=6 * k, color=ENCRE)
                   for x, y in POINTS_COACH[face]])
    return VGroup(corps, pts)


def surligner(face_mob, on=True, sw=6):
    face_mob[0].set_fill(FACE_ACTIVE if on else FACE_DE)
    face_mob[0].set_stroke(BORD_ACTIF if on else ENCRE, sw if on else 3)


def carte_de(cote=0.6, gap=0.16):
    """Le canvas « de » : carte blanche, les 6 faces en grille 3 × 2. Renvoie (carte, faces)."""
    faces = VGroup(*[de_coach(f, cote) for f in range(1, 7)])
    faces.arrange_in_grid(rows=2, cols=3, buff=gap)
    fond = RoundedRectangle(width=faces.width + 0.4, height=faces.height + 0.4, corner_radius=0.18,
                            fill_color=WHITE, fill_opacity=1, stroke_color="#e2e8f0", stroke_width=2)
    fond.move_to(faces)
    return VGroup(fond, faces), faces


def tirages(n, nb_six, graine):
    """n faces de dé dont EXACTEMENT nb_six six, mélangées (toujours les mêmes)."""
    rng = random.Random(graine)
    autres = [rng.randint(1, 5) for _ in range(n - nb_six)]
    faces = autres + [6] * nb_six
    rng.shuffle(faces)
    return faces


def grille_lancers(faces, cote=0.3, gap=0.07, cols=10):
    """Les lancers en grille (10 par ligne), chaque lancer = une petite face du coach."""
    g = VGroup(*[de_coach(f, cote) for f in faces])
    g.arrange_in_grid(cols=cols, buff=gap)
    return g


def allumer_six(grille, faces):
    """Anims : les 6 surlignés (ambre), les autres s'estompent."""
    anims = []
    for d, f in zip(grille, faces):
        if f == 6:
            anims.append(d[0].animate.set_fill(FACE_ACTIVE).set_stroke(BORD_ACTIF, 4))
        else:
            anims.append(d.animate.set_opacity(0.25))
    return anims


def de_coach_qui_roule(centre, cote=1.0, periode=0.16, faces=(3, 5, 2, 6, 1, 4)):
    """Le dé du coach qui roule sans fin (updater) : la face change, il tangue."""
    etat = {"t": 0.0}
    holder = VGroup(de_coach(faces[0], cote).move_to(centre))

    def maj(m, dt):
        etat["t"] += dt
        k = int(etat["t"] / periode)
        ang = 0.35 * math.sin(etat["t"] * 9)
        saut = 0.12 * abs(math.sin(etat["t"] * 9))
        m.remove(*m.submobjects)
        m.add(de_coach(faces[k % len(faces)], cote).rotate(ang).move_to(centre + UP * saut))

    holder.add_updater(maj)
    return holder


def tableau_coach(entetes, n_lignes=1, larg=2.3, h=0.75, fs=28):
    """Le canvas « tableau » : en-têtes gris clair en gras, cases blanches.
    Renvoie (tableau, cases[ligne][colonne]) ; les cases sont des rectangles vides."""
    g, cases = VGroup(), []
    n = len(entetes)
    for j, e in enumerate(entetes):
        r = Rectangle(width=larg, height=h, fill_color=ENTETE, fill_opacity=1, stroke_color=CASE_BORD,
                      stroke_width=2).move_to(P((j - (n - 1) / 2) * larg, 0))
        g.add(r, Text(e, font_size=fs, color="#1e293b", weight=BOLD).move_to(r))
    for i in range(n_lignes):
        ligne = []
        for j in range(n):
            r = Rectangle(width=larg, height=h, fill_color=WHITE, fill_opacity=1, stroke_color=CASE_BORD,
                          stroke_width=2).move_to(P((j - (n - 1) / 2) * larg, -(i + 1) * h))
            g.add(r)
            ligne.append(r)
        cases.append(ligne)
    return g, cases


class Proba6FrequenceComparer(Notion6eProba):
    nom_voix = "6e-proba-frequence-comparer"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=sw, color=color)

    def environ(self, nombre, font_size=44, color=JAUNE_TITRE):
        return VGroup(self.t("≈", font_size, WHITE), self.t(nombre, font_size, color)).arrange(RIGHT, buff=0.18)

    def remplir(self, case, texte, color, font_size=32):
        return Text(texte, font_size=font_size, color=color, weight=BOLD).move_to(case)

    # ── l'échelle de 0 à 1 : « calculé » au-dessus, « observé » en dessous ──

    X0, X1, YE = -5.6, 3.2, -1.5

    def x_de(self, p):
        return self.X0 + (self.X1 - self.X0) * p

    def echelle(self):
        barre = Line(P(self.X0, self.YE), P(self.X1, self.YE), stroke_width=10, color="#CBD5E1")
        bouts = VGroup(*[Line(P(x, self.YE - 0.22), P(x, self.YE + 0.22), stroke_width=5, color=WHITE)
                         for x in (self.X0, self.X1)])
        mil = Line(P(self.x_de(0.5), self.YE - 0.13), P(self.x_de(0.5), self.YE + 0.13), stroke_width=3,
                   color=GREY_B)
        imp = self.t("impossible", 24, "#F87171").move_to(P(self.X0, self.YE - 0.42))
        cer = self.t("certain", 24, VERT_OK).move_to(P(self.X1, self.YE - 0.42))
        return VGroup(barre, bouts, mil, imp, cer)

    def repere(self, p, mot, nombre, couleur, haut=True):
        """Un repère posé sur l'échelle : triangle + étiquette (mot, et nombre s'il est dit).
        haut=True : au-dessus (le calculé) ; haut=False : en dessous (l'observé)."""
        x = self.x_de(p)
        tri = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.16)
        m = self.t(mot, 26, couleur)
        n = self.t(nombre, 36, JAUNE_TITRE) if nombre else None
        if haut:
            tri.rotate(PI).move_to(P(x, self.YE + 0.25))
            tag = VGroup(m, n).arrange(DOWN, buff=0.06) if n else VGroup(m)
            tag.move_to(P(x, self.YE + 0.42 + tag.height / 2))
        else:
            tri.move_to(P(x, self.YE - 0.25))
            tag = VGroup(n, m).arrange(DOWN, buff=0.06) if n else VGroup(m)
            tag.move_to(P(x, self.YE - 0.72 - tag.height / 2))
            lien = Line(P(x, self.YE - 0.36), P(x, self.YE - 0.7), color=couleur, stroke_width=3)
            return VGroup(tri, lien, tag)
        return VGroup(tri, tag)

    def ecart(self, p1, p2, couleur, sw=22):
        return Line(P(self.x_de(p1), self.YE), P(self.x_de(p2), self.YE), stroke_width=sw, color=couleur,
                    stroke_opacity=0.85)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Observé ou calculé ?", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        roule = de_coach_qui_roule(P(-3.6, 0.35), 1.5)
        self.add(roule)
        self.au_mot("observe")
        obs = self.t("observé", 54, OBSERVE).move_to(P(0.9, 0.95))
        self.play(FadeIn(obs, shift=LEFT * 0.3), run_time=0.5)
        self.au_mot("calcule")
        cal = self.t("calculé", 54, CALCULE).move_to(P(0.9, -0.25))
        self.play(FadeIn(cal, shift=LEFT * 0.3), run_time=0.5)
        self.attendre_voix(marge=1.0)
        roule.clear_updaters()

    # ── 01 : un dé, 1 sur 6 ; 60 lancers, 13 six ────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre01 = self.titre_ecran("Avec un dé")
        self.ech = self.echelle()
        self.play(Create(self.ech[:3]), FadeIn(self.ech[3:]), run_time=0.7)
        self.au_mot("Avec un dé")
        carte, faces = carte_de(0.5, 0.14)
        carte.move_to(P(-4.6, 1.45))
        self.carte = carte
        self.play(FadeIn(carte, scale=0.9), run_time=0.5)
        self.au_mot("faire 6")
        self.play(*[faces[i].animate.set_opacity(0.35) for i in range(5)], run_time=0.3)
        surligner(faces[5])
        self.insister(faces[5], 0.35)
        self.au_mot("1 sur 6")
        f = self.fraction(1, 6, 50, CALCULE).move_to(P(-2.4, 1.45))
        self.play(FadeIn(f, shift=UP * 0.2), run_time=0.4)
        self.au_mot("environ 0,17")
        env = self.environ("0,17").next_to(f, RIGHT, buff=0.3)
        self.f16 = VGroup(f, env)
        self.play(FadeIn(env, shift=LEFT * 0.2), run_time=0.4)
        self.calc = self.repere(1 / 6, "calculé", "0,17", CALCULE, haut=True)
        self.play(FadeIn(self.calc[0], shift=DOWN * 0.2), FadeIn(self.calc[1][0]),
                  TransformFromCopy(env[1], self.calc[1][1]), run_time=0.8)
        self.au_mot("On lance 60 fois")
        faces60 = tirages(60, 13, 8)
        grille = grille_lancers(faces60, 0.27, 0.06).move_to(P(1.9, 1.1))
        l60 = self.t("60 lancers", 32).move_to(P(1.2, 2.5))
        self.play(FadeIn(l60, shift=DOWN * 0.15),
                  LaggedStart(*[FadeIn(d, scale=0.5) for d in grille], lag_ratio=0.02), run_time=1.4)
        self.au_mot("13 six")
        l13 = self.t(": 13 six", 32, OBSERVE).next_to(l60, RIGHT, buff=0.15)
        self.play(*allumer_six(grille, faces60), FadeIn(l13, shift=LEFT * 0.15), run_time=0.6)
        self.insister(l13, 0.3)
        self.grille, self.faces60, self.lbl60 = grille, faces60, VGroup(l60, l13)
        self.attendre_voix(marge=0.5)

    # ── 02 : la fréquence observée ──────────────────────────────────────────

    def ecran_observe(self):
        self.dire("02-observe")
        t2 = self.t("La fréquence observée", 40, JAUNE_TITRE).to_edge(UP)
        self.play(FadeOut(self.carte), FadeOut(self.f16), ReplacementTransform(self.titre01, t2), run_time=0.6)
        self.titre02 = t2
        self.au_mot("13 sur 60")
        f = self.fraction(13, 60, 50, WHITE, color_num=OBSERVE).move_to(P(-3.9, 1.3))
        six = VGroup(*[d for d, v in zip(self.grille, self.faces60) if v == 6])
        self.play(FadeIn(f, shift=UP * 0.2), Indicate(six, color=BORD_ACTIF, scale_factor=1.15), run_time=0.6)
        self.au_mot("environ 0,22")
        env = self.environ("0,22").next_to(f, RIGHT, buff=0.3)
        self.play(FadeIn(env, shift=LEFT * 0.2), run_time=0.4)
        self.obs = self.repere(13 / 60, "observé", "0,22", OBSERVE, haut=False)
        self.play(FadeIn(self.obs[0], shift=UP * 0.2), Create(self.obs[1]), FadeIn(self.obs[2][1]),
                  TransformFromCopy(env[1], self.obs[2][0]), run_time=0.8)
        self.f1360 = VGroup(f, env)
        self.attendre_voix(marge=0.5)

    # ── 03 : comparer ───────────────────────────────────────────────────────

    def ecran_comparer(self):
        self.dire("03-comparer")
        t3 = self.t("Comparer", 40, JAUNE_TITRE).to_edge(UP)
        self.play(FadeOut(self.grille), FadeOut(self.lbl60), FadeOut(self.f1360),
                  ReplacementTransform(self.titre02, t3), run_time=0.5)
        tab, cases = tableau_coach(["observé", "calculé"], 1, 2.6, 0.8, 30)
        tab.move_to(P(-2.0, 1.6))
        self.play(FadeIn(tab, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("0,22 observé")
        v1 = self.remplir(cases[0][0], "0,22", "#c2410c", 36)
        self.play(FadeIn(v1, scale=0.6), run_time=0.3)
        self.insister(self.obs, 0.3)
        self.au_mot("0,17 calculé")
        v2 = self.remplir(cases[0][1], "0,17", "#0369a1", 36)
        self.play(FadeIn(v2, scale=0.6), run_time=0.3)
        self.insister(self.calc, 0.3)
        self.au_mot("pas pareil")
        neq = self.t("≠", 80, ROUGE_ERREUR).next_to(tab, RIGHT, buff=0.5)
        ec = self.ecart(1 / 6, 13 / 60, JAUNE_TITRE)
        self.play(FadeIn(neq, scale=0.5), Create(ec), run_time=0.5)
        self.play(ec.animate.set_stroke(width=40), run_time=0.35)
        self.play(ec.animate.set_stroke(width=22), run_time=0.35)
        self.au_mot("c'est normal")
        ok = VGroup(self.coche(taille=0.3), self.t("normal", 44, VERT_OK)).arrange(RIGHT, buff=0.25)
        ok.next_to(neq, RIGHT, buff=0.5)
        self.play(FadeIn(ok[1], shift=LEFT * 0.2), Create(ok[0]), run_time=0.5)
        self.au_mot("le hasard fait varier")
        fantomes = VGroup(*[Dot(P(self.x_de(p), self.YE), radius=0.1, color=OBSERVE, fill_opacity=0.9)
                            for p in (0.15, 0.25, 0.2, 0.13, 0.18, 0.23)])
        self.play(LaggedStart(*[FadeIn(d, scale=2.0) for d in fantomes], lag_ratio=0.35), run_time=2.2)
        self.attendre_voix(marge=0.6)
        self.titre03 = t3
        self.a_effacer = VGroup(tab, v1, v2, neq, ec, ok, fantomes)

    # ── 04 : 40 sur 60 ? truqué ─────────────────────────────────────────────

    def ecran_truque(self):
        self.dire("04-truque")
        t4 = self.t("Et si… ?", 40, JAUNE_TITRE).to_edge(UP)
        self.play(FadeOut(self.a_effacer), FadeOut(self.obs), ReplacementTransform(self.titre03, t4),
                  run_time=0.5)
        self.au_mot("40 six sur 60 lancers")
        faces = tirages(60, 40, 21)
        grille = grille_lancers(faces, 0.27, 0.06).move_to(P(1.9, 1.1))
        lbl = self.t("40 six sur 60 lancers", 32, WHITE).move_to(P(1.9, 2.5))
        lbl[:2].set_color(ROUGE_ERREUR)
        self.play(FadeIn(lbl, shift=DOWN * 0.15),
                  LaggedStart(*[FadeIn(d, scale=0.5) for d in grille], lag_ratio=0.015), run_time=1.1)
        self.play(*allumer_six(grille, faces), run_time=0.5)
        self.au_mot("40 sur 60,")
        f = self.fraction(40, 60, 50, WHITE, color_num=ROUGE_ERREUR).move_to(P(-3.9, 1.3))
        self.play(FadeIn(f, shift=UP * 0.2), run_time=0.4)
        self.au_mot("environ 0,67")
        env = self.environ("0,67").next_to(f, RIGHT, buff=0.3)
        self.play(FadeIn(env, shift=LEFT * 0.2), run_time=0.4)
        obs = self.repere(40 / 60, "observé", "0,67", ROUGE_ERREUR, haut=False)
        self.play(FadeIn(obs[0], shift=UP * 0.2), Create(obs[1]), FadeIn(obs[2][1]),
                  TransformFromCopy(env[1], obs[2][0]), run_time=0.8)
        self.au_mot("Beaucoup trop loin")
        ec = self.ecart(1 / 6, 40 / 60, ROUGE_ERREUR)
        self.play(Create(ec), run_time=0.8)
        self.play(ec.animate.set_stroke(width=40), run_time=0.35)
        self.play(ec.animate.set_stroke(width=22), run_time=0.35)
        self.au_mot("de 0,17")
        self.insister(self.calc, 0.3)
        self.au_mot("truqué")
        icone = de_coach(6, 0.75, actif=True).rotate(0.25)
        tq = self.t("truqué ?", 48, ROUGE_ERREUR)
        bloc = VGroup(icone, tq).arrange(RIGHT, buff=0.35).move_to(P(-0.4, -0.4))
        self.play(FadeIn(icone, shift=DOWN * 0.3), FadeIn(tq, scale=0.6), run_time=0.5)
        self.play(Wiggle(icone), run_time=0.6)
        self.attendre_voix(marge=0.7)

    # ── 05 : le piège des 6 lancers ─────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("sur 6 lancers")
        xs = [-4.9 + 1.4 * k for k in range(6)]
        cadres = VGroup(*[RoundedRectangle(width=1.05, height=1.05, corner_radius=0.15, stroke_color=GREY_B,
                                           stroke_width=3).move_to(P(x, 1.2)) for x in xs])
        l6 = self.t("6 lancers", 36).move_to(P(-1.4, 2.35))
        self.play(FadeIn(l6, shift=DOWN * 0.15), LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.1),
                  run_time=0.8)
        self.au_mot("forcément un 6")
        bulle = self.t("forcément un 6 ?", 44, ORANGE_RETENUE).move_to(P(-1.4, -0.2))
        self.play(FadeIn(bulle, scale=0.7), run_time=0.4)
        des = VGroup(*[de_coach(f, 0.85).move_to(P(x, 1.2)) for f, x in zip([3, 1, 5, 2, 4, 1], xs)])
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.6, scale=0.6) for d in des], lag_ratio=0.25),
                  run_time=1.6)
        self.play(Create(self.barrer(bulle, sw=7)), run_time=0.4)
        self.au_mot("en moyenne")
        moy = VGroup(self.coche(taille=0.3), self.t("en moyenne", 44, VERT_OK)).arrange(RIGHT, buff=0.3)
        moy.move_to(P(-1.4, -1.4))
        self.play(FadeIn(moy[1], shift=UP * 0.15), Create(moy[0]), run_time=0.5)
        self.au_mot("pas à chaque fois")
        pas = self.t("pas à chaque fois", 40, ROUGE_ERREUR).move_to(P(-1.4, -2.35))
        self.play(FadeIn(pas, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix(marge=0.7)

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Une pièce")
        pc = piece_qui_tourne(P(-3.6, 0.9), 1.0)
        self.add(pc)
        self.au_mot("100 lancers")
        l1 = self.t("100 lancers", 48).move_to(P(1.2, 1.55))
        self.play(FadeIn(l1, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("48 piles")
        l2 = self.t("48 piles", 48, JAUNE_TITRE).move_to(P(1.2, 0.45))
        self.play(FadeIn(l2, shift=LEFT * 0.2), run_time=0.4)
        self.insister(l2, 0.3)
        self.au_mot("bien équilibrée")
        q = self.t("La pièce est-elle bien équilibrée ?", 40, BLEU_CALCUL).move_to(P(-0.6, -1.0))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)
        pc.clear_updaters()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        ech = self.echelle()
        tab, cases = tableau_coach(["observé", "calculé"], 1, 2.6, 0.8, 30)
        tab.move_to(P(-2.0, 1.6))
        self.play(Create(ech[:3]), FadeIn(ech[3:]), FadeIn(tab, shift=DOWN * 0.2), run_time=0.7)
        self.au_mot("48 sur 100")
        f = self.fraction(48, 100, 46, WHITE, color_num=OBSERVE).move_to(P(2.6, 1.3))
        self.play(FadeIn(f, shift=UP * 0.2), run_time=0.4)
        self.au_mot("100, 0,48")
        v1 = self.remplir(cases[0][0], "0,48", "#c2410c", 36)
        obs = self.repere(0.48, "observé", "0,48", OBSERVE, haut=False)
        self.play(FadeIn(v1, scale=0.6), FadeIn(obs[0], shift=UP * 0.2), Create(obs[1]), FadeIn(obs[2][1]),
                  TransformFromCopy(v1, obs[2][0]), run_time=0.7)
        self.au_mot("un demi")
        cal = self.repere(0.5, "un demi", "0,5", CALCULE, haut=True)
        self.play(FadeIn(cal[0], shift=DOWN * 0.2), FadeIn(cal[1][0]), run_time=0.5)
        self.au_mot("demi, 0,5")
        v2 = self.remplir(cases[0][1], "0,5", "#0369a1", 36)
        self.play(FadeIn(v2, scale=0.6), FadeIn(cal[1][1], scale=0.6), run_time=0.4)
        ec = self.ecart(0.48, 0.5, VERT_OK, 26)
        self.play(Create(ec), run_time=0.3)
        self.insister(VGroup(obs, cal, ec), 0.35)
        self.au_mot("Rien d'anormal")
        ok = VGroup(self.coche(taille=0.3), self.t("Rien d'anormal", 40, VERT_OK)).arrange(RIGHT, buff=0.3)
        ok.move_to(P(3.0, -0.15))
        self.play(FadeIn(ok[1], shift=UP * 0.15), Create(ok[0]), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("La fréquence observée varie", "La fréquence observée varie,"),
            ("elle reste proche", "mais elle reste proche de la probabilité."),
            ("Trop loin", "Trop loin : il y a peut-être un truc !"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 38)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 10.4:
            lignes.scale_to_fit_width(10.4)
        lignes.move_to(P(-0.8, 0.7))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 9")
        self.play(Write(self.chute("Épisode 9 : répéter beaucoup", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_observe()
        self.ecran_comparer()
        self.ecran_truque()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
