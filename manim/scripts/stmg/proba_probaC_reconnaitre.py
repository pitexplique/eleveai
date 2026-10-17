# proba_probaC_reconnaitre.py
# EleveAI — Maths STMG — série « Probabilités conditionnelles », épisode 1 :
# RECONNAÎTRE une probabilité conditionnelle (micro : probaC_reconnaitre),
# AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_probaC_reconnaitre_short.py (ceinture jaune, les déchets triés).
#
# Écrans : 00 garde · 01 la boutique de vélos électriques (500 points-clients,
# 200 vélos, 150 vont au travail) · 02 le tableau croisé (seul 500 s'écrit) ·
# 03 « tout le tableau » s'encadre : 200 sur 500 · 04 « parmi les acheteurs » :
# la LIGNE vélo électrique s'allume, 150 sur 200 · 05 les mots-signaux ·
# 06 le piège du « ET » : UNE case rapportée au total, 150 sur 500 · 07 défi ·
# 07b correction : la COLONNE « va au travail à vélo » s'allume · 08 ce que tu
# as appris · 09 abonnement.
#
# Canvas du coach repris : le TABLEAU CROISÉ (tableau_donnees de
# canvasTableau, banque stmg/maths/probabilites-conditionnelles) : en-tête
# slate-800, libellés sky-100, cases blanches, case allumée yellow-200 +
# anneau yellow-500. Classe TableauCroise reprise de premiere/proba_pc_conditionnelle.py.
# ⛔ PAS D'ÉCART : seuls 500, 200 et 150 s'écrivent dans le tableau, au moment
# où la voix les dit ; les autres cases restent vides.
#
# Voix : manim/voix/stmg-proba-reconnaitre.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaC_reconnaitre.py ProbaReconnaitreSTMG -o eleveai-maths-stmg-proba-reconnaitre --media_dir manim/scripts/stmg/media
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/01-reconnaitre/.

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
from proba_pc_conditionnelle import (  # noqa: E402
    ANNEAU, ETEINT, TableauCroise, frac, lettre, p_cond, suite,
)

VERT_VELO = "#22C55E"   # les acheteurs d'un vélo électrique
GRIS_CLIENT = "#94A3B8"

LIGNES = ["Vélo électrique", "Autre achat", "Total"]
COLONNES = ["Va au travail à vélo", "Non", "Total"]
# ⛔ PAS D'ÉCART : 150 (ligne 0, colonne 0), 200 (ligne 0, total), 500 (total).
VALEURS = [[150, None, 200], [None, None, None], [None, None, 500]]


class NotionSTMG(Notion6e):
    identite = "Maths STMG — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def velo(s=1.0, couleur=WHITE, eclair=True):
    """Un vélo électrique DESSINÉ : deux roues, le cadre, la selle, le guidon,
    la batterie et son éclair."""
    r = 0.42
    ar, av = P(-0.75, 0), P(0.75, 0)
    roues = VGroup(*[Circle(radius=r, stroke_color=couleur, stroke_width=5).move_to(c) for c in (ar, av)])
    moyeux = VGroup(*[Dot(c, radius=0.05, color=couleur) for c in (ar, av)])
    pedalier = P(-0.05, 0)
    selle_p = P(-0.3, 0.62)
    guidon_p = P(0.52, 0.66)
    cadre = VGroup(
        Line(ar, pedalier), Line(pedalier, selle_p), Line(ar, selle_p),
        Line(selle_p + P(0.06, 0.0), guidon_p + P(-0.1, -0.12)), Line(pedalier, guidon_p + P(-0.1, -0.12)),
        Line(guidon_p + P(-0.1, -0.12), av),
    ).set_stroke(couleur, 5)
    selle = Line(selle_p + P(-0.18, 0.06), selle_p + P(0.12, 0.06), stroke_width=8, color=couleur)
    guidon = Line(guidon_p, guidon_p + P(0.22, 0.08), stroke_width=6, color=couleur)
    g = VGroup(roues, moyeux, cadre, selle, guidon)
    if eclair:
        batt = RoundedRectangle(width=0.42, height=0.2, corner_radius=0.05, fill_color=VERT_VELO,
                                fill_opacity=1, stroke_width=0)
        batt.move_to((pedalier + selle_p) / 2 + P(0.05, -0.02)).rotate(np.arctan2(0.62, -0.25) - PI)
        ecl = Polygon(P(0.02, 0.09), P(-0.06, -0.01), P(0.0, -0.01), P(-0.03, -0.09), P(0.07, 0.02),
                      P(0.01, 0.02), fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
        ecl.move_to(batt)
        g.add(batt, ecl)
    return g.scale(s)


def clients(x0=-6.6, y0=-2.35, pas=0.205, ncol=25, nrang=20):
    """500 points-clients, 25 colonnes × 20 rangées. Les 10 premières colonnes
    (200 points) seront les acheteurs d'un vélo électrique ; leurs 15 rangées
    du bas (150 points), ceux qui vont au travail à vélo.
    Renvoie (tous, acheteurs, travail) : des listes de points."""
    tous, acheteurs, travail = [], [], []
    for r in range(nrang):
        for c in range(ncol):
            x = x0 + c * pas + (0.12 if c >= 10 else 0)
            d = Circle(radius=0.07, fill_color=GRIS_CLIENT, fill_opacity=1, stroke_width=0).move_to(P(x, y0 + r * pas))
            tous.append(d)
            if c < 10:
                acheteurs.append(d)
                if r < 15:
                    travail.append(d)
    return tous, acheteurs, travail


def mot_cle(texte, couleur=ORANGE_RETENUE, fs=34):
    """Un mot-signal dans son étiquette (fond coloré, texte sombre)."""
    t = Text(texte, font_size=fs, color=BLACK, weight=BOLD)
    fond = RoundedRectangle(width=t.width + 0.45, height=t.height + 0.3, corner_radius=0.12,
                            fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(fond, t.move_to(fond))


class ProbaReconnaitreSTMG(NotionSTMG):
    nom_voix = "stmg-proba-reconnaitre"

    T_CENTRE = P(-0.9, 0.15)   # le tableau des écrans 03 à 07b
    T_ECHELLE = 0.8

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=34, buff=0.2):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def tableau(self, centre=None, echelle=None, posees=()):
        """Le tableau croisé du coach ; seuls les nombres de `posees` y sont écrits."""
        tb = TableauCroise(LIGNES, COLONNES, VALEURS, larg_lab=3.4, larg=2.5, h=0.72, h_ent=1.0, fs=28)
        # l'en-tête long, sur DEUX lignes centrées, dans sa case
        vieux = tb.ent[0]
        neuf = VGroup(*[Text(m, font_size=28, color=WHITE, weight=BOLD) for m in ("Va au travail", "à vélo")])
        neuf.arrange(DOWN, buff=0.08)
        if neuf.width > 2.3:
            neuf.scale_to_fit_width(2.3)
        neuf.move_to(tb.rect[0][1]).set_z_index(3)
        tb.textes.remove(vieux)
        tb.textes.add(neuf)
        tb.ent[0] = neuf
        tb.scale(self.T_ECHELLE if echelle is None else echelle)
        tb.move_to(self.T_CENTRE if centre is None else centre)
        for i, rang in enumerate(tb.val):
            for j, m in enumerate(rang):
                if m is not None and (i, j) not in posees:
                    tb.vals.remove(m)
        tb.posees = set(posees)
        return tb

    def cadre_ligne(self, tb, i):
        return SurroundingRectangle(VGroup(tb.rect[i + 1][0], tb.rect[i + 1][3]), color=ANNEAU, buff=0.05,
                                    stroke_width=6)

    def cadre_colonne(self, tb, j):
        return SurroundingRectangle(VGroup(tb.rect[0][j + 1], tb.rect[3][j + 1]), color=ANNEAU, buff=0.05,
                                    stroke_width=6)

    def question(self, l1, l2, fs=30):
        """La question de l'écran, sur deux lignes, sous le titre."""
        q = VGroup(l1 if isinstance(l1, Mobject) else self.t(l1, fs),
                   l2 if isinstance(l2, Mobject) else self.t(l2, fs)).arrange(DOWN, buff=0.14)
        return q.move_to(P(-0.9, 2.2))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Probabilité conditionnelle", 54, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        tb = self.tableau(P(-0.6, 0.5), 0.55)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tb, shift=UP * 0.2),
                  run_time=1.0)
        self.au_mot("comment la reconnaître")
        q = self.t("Comment la reconnaître dans un énoncé ?", 40, BLEU_CALCUL).move_to(P(-0.6, -1.4))
        self.play(FadeIn(q, shift=UP * 0.2), *tb.etat(lignes=(0,)), run_time=0.7)
        self.insister(q[:19], 0.35)
        self.attendre_voix(marge=1.0)

    # ── 01 : la boutique de vélos électriques ───────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le bilan de la boutique")
        v = velo(1.35).move_to(P(2.3, 1.75))
        self.au_mot("Une boutique de vélos")
        self.play(Create(v[:5]), run_time=0.9)
        self.play(FadeIn(v[5:], scale=1.6), run_time=0.4)
        tous, acheteurs, travail = clients()
        self.au_mot("500 clients")
        n500 = self.t("500 clients", 34).next_to(VGroup(*tous), UP, buff=0.2)
        self.play(LaggedStart(*[FadeIn(d, scale=0.3) for d in tous], lag_ratio=0.002), FadeIn(n500), run_time=1.0)
        self.insister(n500[:3], 0.3)
        x_txt = 0.0
        self.au_mot("200 ont acheté")
        l1 = self.ligne([("200", VERT_VELO), ("ont acheté un vélo électrique", WHITE)], 32, 0.18)
        l1.move_to(P(x_txt + l1.width / 2, 0.15))
        acc = Brace(VGroup(*acheteurs), DOWN, color=VERT_VELO, buff=0.08)
        self.play(*[d.animate.set_fill(VERT_VELO) for d in acheteurs], GrowFromCenter(acc),
                  FadeIn(l1, shift=LEFT * 0.2), run_time=0.8)
        self.insister(l1[0], 0.3)
        self.au_mot("150 s'en servent")
        l2 = self.ligne([("parmi eux,", ORANGE_RETENUE), ("150", JAUNE_TITRE), ("vont au travail à vélo", WHITE)],
                        32, 0.18)
        l2.move_to(P(x_txt + 0.4 + l2.width / 2, -0.65))
        if l2.get_right()[0] > 6.8:
            l2.shift(LEFT * (l2.get_right()[0] - 6.8))
        bloc = SurroundingRectangle(VGroup(*travail), color=JAUNE_TITRE, buff=0.06, stroke_width=4)
        self.play(LaggedStart(*[d.animate.set_fill(JAUNE_TITRE).scale(1.2) for d in travail], lag_ratio=0.006),
                  Create(bloc), FadeIn(l2, shift=LEFT * 0.2), run_time=1.1)
        self.insister(l2[1], 0.3)
        self.attendre_voix()

    # ── 02 : le tableau croisé ──────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        self.titre_ecran("Le tableau croisé")
        tb = self.tableau(P(-0.9, 0.2), 0.88)
        self.au_mot("tableau croisé")
        self.play(FadeIn(tb.fonds, shift=UP * 0.2), run_time=0.7)

        def entre(m):
            return FadeIn(m, scale=1.4)

        self.au_mot("vélo électrique, autre")
        self.play(entre(tb.lab[0]), Indicate(tb.rect[1][0], color=VERT_VELO), run_time=0.5)
        self.au_mot("autre achat")
        self.play(entre(tb.lab[1]), run_time=0.5)
        self.au_mot("va au travail à vélo")
        self.play(entre(tb.ent[0]), run_time=0.5)
        self.au_mot("ou non")
        self.play(entre(tb.ent[1]), run_time=0.4)
        self.au_mot("Total")
        self.play(entre(tb.lab[2]), entre(tb.ent[2]), run_time=0.5)
        self.au_mot("500")
        self.play(tb.poser(2, 2), *tb.etat(cases=((2, 2),), eteindre=False), run_time=0.4)
        self.insister(tb.val[2][2], 0.3)
        self.attendre_voix()

    # ── 03 : sur tout le tableau : 200 sur 500 ──────────────────────────────

    def ecran_simple(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-simple")
        self.titre_ecran("Première question")
        tb = self.tableau(posees=((2, 2),))
        self.play(FadeIn(tb), run_time=0.5)
        self.au_mot("quelle proportion")
        q = self.question(self.ligne([("Quelle proportion des", WHITE), ("500", JAUNE_TITRE), ("clients", WHITE)], 30, 0.14),
                          "a acheté un vélo électrique ?")
        self.play(FadeIn(q, shift=DOWN * 0.15), run_time=0.6)
        self.au_mot("500 clients")
        self.play(Indicate(tb.val[2][2], color=ANNEAU, scale_factor=1.5), Indicate(q[0][1], scale_factor=1.3),
                  run_time=0.7)
        self.au_mot("On regarde tout le tableau")
        cadre = SurroundingRectangle(tb, color=BLEU_CALCUL, buff=0.1, stroke_width=7)
        self.play(Create(cadre), run_time=0.7)
        self.au_mot("200 sur 500")
        self.play(tb.poser(0, 2), *tb.etat(cases=((0, 2), (2, 2)), eteindre=False), run_time=0.5)
        f = frac(200, 500, 46, WHITE, VERT_VELO, JAUNE_TITRE).move_to(P(-0.9, -1.8))
        self.play(TransformFromCopy(tb.val[0][2], f[0]), GrowFromCenter(f[1]),
                  TransformFromCopy(tb.val[2][2], f[2]), run_time=0.7)
        self.insister(f, 0.35)
        self.au_mot("Ce n'est pas")
        ch = self.chute("Ce n'est pas une probabilité conditionnelle.", color=ROUGE_ERREUR, font_size=34)
        self.play(Write(ch), run_time=0.9)
        self.attendre_voix()

    # ── 04 : parmi les acheteurs : la LIGNE s'allume, 150 sur 200 ───────────

    def ecran_conditionnelle(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-conditionnelle")
        self.titre_ecran("Deuxième question")
        tb = self.tableau(posees=((0, 2), (2, 2)))
        self.play(FadeIn(tb), run_time=0.5)
        self.au_mot("parmi les acheteurs")
        q = self.question(self.ligne([("parmi", ORANGE_RETENUE), ("les acheteurs de vélo électrique,", WHITE)], 30, 0.14),
                          "quelle proportion va au travail à vélo ?")
        self.play(FadeIn(q, shift=DOWN * 0.15), run_time=0.6)
        self.play(*tb.etat(lignes=(0,)), run_time=0.7)
        self.insister(q[0][0], 0.3)
        self.au_mot("va au travail à vélo ?")
        self.play(Indicate(tb.ent[0], color=JAUNE_TITRE, scale_factor=1.2), run_time=0.7)
        self.au_mot("On ne regarde plus")
        cadre = self.cadre_ligne(tb, 0)
        self.play(Create(cadre), run_time=0.6)
        self.au_mot("150 sur 200")
        self.play(tb.poser(0, 0), run_time=0.4)
        f = frac(150, 200, 46, WHITE, JAUNE_TITRE, VERT_VELO).move_to(P(-0.9, -1.8))
        self.play(TransformFromCopy(tb.val[0][0], f[0]), GrowFromCenter(f[1]),
                  TransformFromCopy(tb.val[0][2], f[2]), run_time=0.7)
        self.insister(f, 0.35)
        self.au_mot("C'est une probabilité")
        ch = self.chute("C'est une probabilité conditionnelle.", color=VERT_OK, font_size=34)
        self.play(Write(ch), run_time=0.9)
        self.attendre_voix()

    # ── 05 : les mots-signaux ───────────────────────────────────────────────

    def ecran_mots(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-mots")
        self.titre_ecran("Les mots qui la signalent")
        tb = self.tableau(P(1.75, 0.4), 0.6, posees=((0, 0), (0, 2), (2, 2)))
        self.play(FadeIn(tb), run_time=0.5)
        mots = ["parmi", "sachant que", "chez les", "si"]
        tags = VGroup(*[mot_cle(m) for m in mots]).arrange(DOWN, buff=0.32).move_to(P(-4.9, 0.4))
        for m, tag in zip(["parmi, sachant", "sachant que", "chez les", "si."], tags):
            self.au_mot(m)
            self.play(GrowFromCenter(tag), run_time=0.4)
        self.au_mot("dans quel groupe")
        fl = Arrow(tags.get_right() + RIGHT * 0.1, tb.rect[1][0].get_left() + LEFT * 0.05, buff=0.1,
                   color=ORANGE_RETENUE, stroke_width=6)
        self.play(GrowArrow(fl), *tb.etat(lignes=(0,)), run_time=0.7)
        self.play(Create(self.cadre_ligne(tb, 0)), run_time=0.5)
        self.au_mot("nouveau total")
        ch = self.chute("Le groupe devient le nouveau total.", color=VERT_OK, font_size=34)
        self.play(Write(ch), run_time=0.8)
        self.insister(tb.val[0][2], 0.35)
        self.attendre_voix()

    # ── 06 : le piège du « ET » : UNE case rapportée au total ───────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        tb = self.tableau(posees=((0, 0), (0, 2), (2, 2)))
        self.play(FadeIn(tb), run_time=0.5)
        self.au_mot("les clients qui ont")
        q = self.question("« les clients qui ont acheté un vélo électrique",
                          self.ligne([("ET", ORANGE_RETENUE), ("vont au travail à vélo »", WHITE)], 30, 0.14))
        q[1][0].scale(1.3)
        self.play(FadeIn(q, shift=DOWN * 0.15), run_time=0.6)
        self.au_mot("ET vont")
        self.play(*tb.etat(cases=((0, 0),)), run_time=0.6)
        self.insister(q[1][0], 0.3)
        self.insister(tb.val[0][0], 0.3)
        self.au_mot("Pas de groupe")
        cadre = SurroundingRectangle(tb, color=BLEU_CALCUL, buff=0.1, stroke_width=7)
        pg = self.t("pas de groupe de référence", 28, BLEU_CALCUL).move_to(P(2.3, -1.8))
        self.play(Create(cadre), FadeIn(pg, shift=UP * 0.15), run_time=0.7)
        self.au_mot("150 sur 500")
        self.play(*tb.etat(cases=((0, 0), (2, 2))), run_time=0.5)
        f = frac(150, 500, 46, WHITE, JAUNE_TITRE, JAUNE_TITRE).move_to(P(-2.0, -1.8))
        self.play(TransformFromCopy(tb.val[0][0], f[0]), GrowFromCenter(f[1]),
                  TransformFromCopy(tb.val[2][2], f[2]), run_time=0.7)
        self.insister(f, 0.35)
        self.au_mot("pas une probabilité")
        ch = self.chute("Pas une probabilité conditionnelle.", color=ROUGE_ERREUR, font_size=34)
        self.play(Write(ch), run_time=0.8)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.5)
        self.dire("07-defi")
        self.titre_ecran("À toi de jouer")
        tb = self.tableau(posees=((0, 0), (0, 2), (2, 2)))
        self.play(FadeIn(tb), run_time=0.5)
        self.au_mot("Chez les clients")
        q = self.question(self.ligne([("« Chez les", ORANGE_RETENUE), ("clients qui vont au travail à vélo,", WHITE)],
                                     30, 0.14),
                          "quelle proportion a acheté un vélo électrique ? »")
        self.play(FadeIn(q, shift=DOWN * 0.15), run_time=0.6)
        self.au_mot("Conditionnelle ou pas")
        q1 = self.t("1. Conditionnelle ou pas ?", 32).move_to(P(-0.9, -1.55))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Dans quel groupe")
        q2 = self.t("2. Dans quel groupe se place-t-on ?", 32).next_to(q1, DOWN, buff=0.25)
        q1.align_to(q2, LEFT)
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        tb = self.tableau(posees=((0, 0), (0, 2), (2, 2)))
        self.add(tb)
        self.au_mot("Chez les")
        tag = mot_cle("chez les", fs=30)
        r1 = suite(tag, self.t(": c'est conditionnel", 32, VERT_OK), buff=0.2).move_to(P(-0.9, 2.2))
        self.play(GrowFromCenter(tag), run_time=0.4)
        self.au_mot("c'est conditionnel")
        self.play(FadeIn(r1[1], shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("On se place")
        self.play(*tb.etat(colonnes=(0,)), run_time=0.7)
        cadre = self.cadre_colonne(tb, 0)
        self.play(Create(cadre), run_time=0.5)
        self.insister(tb.ent[0], 0.3)
        self.au_mot("le groupe des clients")
        ch = self.chute("Le groupe des clients qui vont au travail à vélo.", color=VERT_OK, font_size=34)
        self.play(Write(ch), run_time=0.9)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Parmi, sachant que", "parmi, sachant que, chez les, si : conditionnelle"),
            ("Le groupe qui suit", "le groupe qui suit devient le nouveau total"),
            ("sans groupe", "« et », sans groupe : pas conditionnel"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 36)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.65)
        if lignes.width > 10.5:
            lignes.scale_to_fit_width(10.5)
        lignes.move_to(P(-0.9, 0.7))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 2")
        ep2 = suite(self.t("Épisode 2 : la notation", 36, VERT_OK), p_cond("A", "B", 40, VERT_OK), buff=0.25)
        ep2.to_edge(DOWN, buff=0.7).shift(LEFT * 0.6)
        self.play(Write(ep2))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_simple()
        self.ecran_conditionnelle()
        self.ecran_mots()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
