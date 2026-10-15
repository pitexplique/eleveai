# proba_issue.py
# EleveAI — Maths 3e — Probabilités, épisode 2 : les issues (micro : proba_issue), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE. Short jumeau : proba_issue_short.py (ceinture blanche).
#
# ⭐ LE DESSIN QUI PORTE TOUT : le chapeau et les 6 étiquettes B-A-N-A-N-E. Les
# étiquettes identiques se REGROUPENT en piles (2 A, 2 N) : 4 piles = 4 issues.
# Puis la roue à 8 cases, l'arbre des deux pièces (PF ≠ FP), le défi PAPAYE.
# Une couleur par lettre, la même dans tous les écrans (et dans le short).
#
# Voix : manim/voix/3e-proba-issue.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/proba_issue.py ProbaIssue3e -o eleveai-maths-3e-proba-issue --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/02-issues/.

import math
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

GRIS_ETEINT = "#6B7280"
COUL_LETTRE = {
    "B": BLEU_CALCUL, "A": JAUNE_TITRE, "N": VERT_OK, "E": ORANGE_RETENUE,
    "P": VIOLET_ACCENT, "Y": "#F472B6", "S": "#22D3EE",
}
COUL_ROUE = ["#2563EB", "#DC2626", "#16A34A", "#D97706"]


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins communs (paysage et short) ──────────────────────────────────

def etiquette(lettre, s=0.75):
    """Une étiquette de carton, une lettre noire sur fond de couleur."""
    fond = RoundedRectangle(width=s, height=s * 1.12, corner_radius=s * 0.14,
                            fill_color=COUL_LETTRE[lettre], fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    l = Text(lettre, font_size=int(56 * s), color=BLACK, weight=BOLD).move_to(fond)
    return VGroup(fond, l)


def etiquettes(mot, s=0.75, buff=0.18):
    return VGroup(*[etiquette(c, s) for c in mot]).arrange(RIGHT, buff=buff)


def chapeau(larg=2.2, haut=1.5):
    """Un chapeau de magicien RETOURNÉ : l'ouverture en haut, on y tire les étiquettes."""
    corps = Polygon(P(-larg / 2, 0), P(larg / 2, 0), P(larg * 0.47, -haut), P(-larg * 0.47, -haut),
                    fill_color="#1F2937", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    fond = Ellipse(width=larg * 0.94, height=0.32, fill_color="#1F2937", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=3).move_to(P(0, -haut))
    bande = Rectangle(width=larg * 0.99, height=0.28, fill_color="#DC2626", fill_opacity=1,
                      stroke_width=0).move_to(P(0, -0.3))
    bord = Ellipse(width=larg * 1.45, height=0.42, fill_color="#374151", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=3)
    trou = Ellipse(width=larg * 0.92, height=0.24, fill_color=BLACK, fill_opacity=1,
                   stroke_color=GREY_B, stroke_width=1.5)
    return VGroup(fond, corps, bande, bord, trou)


def ouverture(ch):
    """Le centre de l'ouverture d'un chapeau (là où tombent les étiquettes)."""
    return ch[4].get_center()


def piles(mot, xs, y, dx=0.16, dy=-0.16):
    """Où va chaque étiquette : les lettres identiques s'empilent sur la même pile.
    `xs` : une abscisse par lettre DIFFÉRENTE, dans l'ordre d'apparition."""
    ordre, cibles, deja = [], [], {}
    for c in mot:
        if c not in ordre:
            ordre.append(c)
        k = deja.get(c, 0)
        deja[c] = k + 1
        cibles.append(P(xs[ordre.index(c)] + dx * k, y + dy * k))
    return ordre, cibles


def roue(r=1.7, angle=0.0):
    """Une roue de jeu à 8 cases numérotées de 1 à 8, tournée de `angle` (les numéros restent droits)."""
    secteurs = VGroup()
    nums = VGroup()
    for i in range(8):
        a0 = PI / 2 - (i + 1) * TAU / 8 + angle
        secteurs.add(Sector(radius=r, angle=TAU / 8, start_angle=a0,
                            fill_color=COUL_ROUE[i % 4], fill_opacity=1, stroke_color=WHITE, stroke_width=3))
        am = a0 + TAU / 16
        nums.add(Text(str(i + 1), font_size=int(26 * r), color=WHITE, weight=BOLD)
                 .move_to(P(0.68 * r * math.cos(am), 0.68 * r * math.sin(am))))
    moyeu = Circle(radius=r * 0.12, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    return VGroup(secteurs, nums, moyeu)


def piece_fixe(centre, cote, r=0.7):
    """La pièce posée, sur PILE ou sur FACE (mêmes couleurs que la pièce qui tourne)."""
    disque = Circle(radius=r, fill_color=JAUNE_TITRE if cote == "P" else ORANGE_RETENUE, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=3)
    mot = Text("PILE" if cote == "P" else "FACE", font_size=int(r * 34), color=BLACK, weight=BOLD)
    return VGroup(disque, mot.move_to(disque)).move_to(centre)


class ProbaIssue3e(Notion3e):
    nom_voix = "3e-proba-issue"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.45):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def sautiller(self, groupe, amp=0.08, vitesse=5.0):
        """Les étiquettes sautillent sur place, chacune à son rythme (updater)."""
        bases = [m.get_center().copy() for m in groupe]
        h = {"t": 0.0}

        def maj(g, dt):
            h["t"] += dt
            for i, (m, b) in enumerate(zip(g, bases)):
                m.move_to(b + UP * amp * abs(math.sin(h["t"] * vitesse + i * 1.1)))

        groupe.add_updater(maj)

    def regrouper(self, tuiles, mot, xs, y, extraits):
        """Les étiquettes descendent sur leurs piles, une lettre DIFFÉRENTE par extrait de voix."""
        ordre, cibles = piles(mot, xs, y)
        for lettre, ex in zip(ordre, extraits):
            self.au_mot(ex)
            idx = [i for i, c in enumerate(mot) if c == lettre]
            self.play(*[tuiles[i].animate.move_to(cibles[i]) for i in idx], run_time=0.45)
        return ordre

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les issues", 60, JAUNE_TITRE).to_edge(UP, buff=0.6)
        ident = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.6))
        ch = chapeau(2.0, 1.3).move_to(P(-4.0, -0.75))
        tu = etiquettes("BANANE", 0.55, 0.12).move_to(P(-4.0, 0.75))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.play(FadeIn(ch), LaggedStart(*[FadeIn(m, shift=DOWN * 0.3) for m in tu], lag_ratio=0.15),
                  run_time=0.8)
        self.sautiller(tu)
        self.au_mot("Combien")
        q = VGroup(self.t("Combien de résultats", 44, BLEU_CALCUL),
                   self.t("possibles ?", 44, BLEU_CALCUL)).arrange(DOWN, buff=0.15).move_to(P(1.6, 0.0))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.attendre_voix(marge=1.2)
        tu.clear_updaters()

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un tirage dans un chapeau")
        self.au_mot("le mot BANANE")
        mot = self.t("BANANE", 80, WHITE).move_to(P(-1.6, 1.7))
        self.play(Write(mot), run_time=0.8)
        self.au_mot("une lettre par étiquette")
        tu = etiquettes("BANANE", 0.8, 0.2).move_to(P(-1.6, 1.7))
        self.play(*[ReplacementTransform(mot[i], tu[i]) for i in range(6)], run_time=0.8)
        self.au_mot("les 6 étiquettes")
        six = self.ligne([("6", JAUNE_TITRE), ("étiquettes", WHITE)], 40, 0.18).move_to(P(3.7, 1.7))
        self.play(FadeIn(six, shift=LEFT * 0.2), run_time=0.5)
        self.insister(six[0], 0.35)
        self.au_mot("dans un chapeau")
        ch = chapeau(2.4, 1.6).move_to(P(-1.6, -1.2))
        self.play(FadeIn(ch, shift=UP * 0.2), run_time=0.4)
        trou = ouverture(ch)
        self.play(LaggedStart(*[m.animate.move_to(trou).scale(0.3).set_opacity(0) for m in tu],
                              lag_ratio=0.18), run_time=1.4)
        self.play(Wiggle(ch, scale_value=1.08, rotation_angle=0.06 * TAU), run_time=0.8)
        self.au_mot("On en tire une")
        tiree = etiquette("A", 0.9).move_to(trou).scale(0.3)
        self.add(tiree)
        self.play(tiree.animate.scale(1 / 0.3).move_to(P(1.6, -0.4)), run_time=0.7)
        self.au_mot("on regarde la lettre")
        self.insister(tiree, 0.35)
        note = self.ligne([("on note :", WHITE), ("A", JAUNE_TITRE)], 40, 0.2).next_to(tiree, RIGHT, buff=0.5)
        self.play(FadeIn(note, shift=LEFT * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 02 : les issues ─────────────────────────────────────────────────────

    def ecran_issues(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-issues")
        self.titre_ecran("Les issues : ce qu'on peut noter")
        tu = etiquettes("BANANE", 0.75, 0.25).move_to(P(-0.6, 2.0))
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.2) for m in tu], lag_ratio=0.1), run_time=0.7)
        xs = [-4.2, -2.0, 0.2, 2.4]
        ordre = self.regrouper(tu, "BANANE", xs, 0.45, ["B,", "A,", "N,", "E."])
        self.au_mot("Il y a 4 issues")
        cases = VGroup()
        for lettre, x in zip(ordre, xs):
            n = "BANANE".count(lettre)
            c = RoundedRectangle(width=1.35, height=1.45, corner_radius=0.15, stroke_color=WHITE, stroke_width=3)
            c.move_to(P(x + 0.08 * (n - 1), 0.45 - 0.08 * (n - 1)))
            cases.add(c)
        self.play(LaggedStart(*[Create(c) for c in cases], lag_ratio=0.2), run_time=0.8)
        quatre = self.ligne([("4", JAUNE_TITRE), ("issues", VERT_OK)], 46, 0.2).move_to(P(1.4, -1.15))
        self.play(FadeIn(quatre, scale=0.8), run_time=0.5)
        self.insister(quatre[0], 0.35)
        self.au_mot("Pas 6")
        faux = self.ligne([("6", ROUGE_ERREUR), ("issues", ROUGE_ERREUR)], 46, 0.2).move_to(P(-3.4, -1.15))
        self.play(FadeIn(faux), run_time=0.4)
        self.play(Create(self.barrer(faux)), run_time=0.4)
        self.au_mot("il y a 6 étiquettes")
        tout = self.ligne([("6", JAUNE_TITRE), ("étiquettes,", WHITE), ("mais seulement", WHITE),
                           ("4", JAUNE_TITRE), ("lettres différentes", VERT_OK)], 34, 0.15)
        if tout.width > 9.6:
            tout.scale_to_fit_width(9.6)
        tout.move_to(P(-0.9, -2.35))
        self.play(FadeIn(tout[:2]), run_time=0.4)
        self.au_mot("mais seulement 4 lettres")
        self.play(FadeIn(tout[2:]), run_time=0.5)
        self.play(*[Indicate(c, color=VERT_OK, scale_factor=1.08) for c in cases], run_time=0.7)
        self.attendre_voix(marge=0.8)

    # ── 03 : la liste (la roue) ─────────────────────────────────────────────

    def ecran_liste(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-liste")
        self.titre_ecran("On fait la liste")
        self.au_mot("on fait la liste")
        tete = self.t("Liste des issues :", 36, BLEU_CALCUL).move_to(P(1.4, 1.65))
        self.play(FadeIn(tete), run_time=0.4)
        self.au_mot("Une roue de jeu")
        ang = ValueTracker(0.0)
        w = roue(1.7).move_to(P(-4.3, -0.4))
        fleche = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.22).rotate(PI)
        fleche.move_to(P(-4.3, 1.5))
        self.play(FadeIn(w, scale=0.8), FadeIn(fleche), run_time=0.5)
        self.remove(w)
        w = always_redraw(lambda: roue(1.7, ang.get_value()).move_to(P(-4.3, -0.4)))
        self.add(w, fleche)
        self.play(ang.animate.set_value(2 * TAU + 3 * TAU / 8), run_time=2.0,
                  rate_func=rate_functions.ease_out_cubic)
        w.clear_updaters()
        self.au_mot("8 cases")
        huit = self.ligne([("8", JAUNE_TITRE), ("cases", WHITE)], 34, 0.15).move_to(P(-4.3, -2.55))
        self.play(FadeIn(huit), run_time=0.4)
        self.au_mot("8 issues")
        boites = VGroup(*[RoundedRectangle(width=0.65, height=0.75, corner_radius=0.1, stroke_color=WHITE,
                                           stroke_width=2.5) for _ in range(8)]).arrange(RIGHT, buff=0.12)
        boites.move_to(P(1.4, 0.65))
        nums = VGroup(*[self.t(str(i + 1), 36, WHITE).move_to(b) for i, b in enumerate(boites)])
        self.play(FadeIn(boites), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(n, scale=1.6) for n in nums], lag_ratio=0.2), run_time=1.4)
        tot = self.ligne([("8", JAUNE_TITRE), ("issues, de", VERT_OK), ("1", JAUNE_TITRE),
                          ("à", VERT_OK), ("8", JAUNE_TITRE)], 44, 0.18).move_to(P(1.4, -0.6))
        self.play(FadeIn(tot, shift=UP * 0.15), run_time=0.5)
        self.insister(tot[0], 0.35)
        self.attendre_voix(marge=0.8)

    # ── 04 : deux pièces ────────────────────────────────────────────────────

    def ecran_deux_pieces(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-deux-pieces")
        self.titre_ecran("Deux pièces : l'une puis l'autre")
        c1, c2 = P(-5.2, 1.3), P(-3.3, 1.3)
        p1, p2 = piece_fixe(c1, "P"), piece_fixe(c2, "P")
        n1 = self.t("1re pièce", 26).next_to(p1, DOWN, buff=0.4)
        n2 = self.t("2e pièce", 26).next_to(p2, DOWN, buff=0.4)
        self.play(FadeIn(p1), FadeIn(p2), FadeIn(n1), FadeIn(n2), run_time=0.5)
        self.au_mot("on lance l'une")
        self.remove(p1)
        t1 = piece_qui_tourne(c1, 0.7)
        self.add(t1)
        self.wait(0.4)
        self.au_mot("puis l'autre")
        self.remove(p2)
        t2 = piece_qui_tourne(c2, 0.7)
        self.add(t2)
        legende = self.t("P : pile    F : face", 28, BLEU_CALCUL).move_to(P(-4.25, -0.5))
        self.play(FadeIn(legende), run_time=0.4)

        # l'arbre
        racine = P(-1.4, 0.0)
        n1p = [P(0.5, 1.3), P(0.5, -1.3)]
        n2p = [P(2.4, 1.95), P(2.4, 0.65), P(2.4, -0.65), P(2.4, -1.95)]
        dot = Dot(racine, radius=0.08)
        b1 = VGroup(*[Line(racine, p, buff=0.25, stroke_width=4, color=BLEU_CALCUL) for p in n1p])
        l1 = VGroup(*[self.t(s, 34, JAUNE_TITRE if s == "P" else ORANGE_RETENUE).move_to(p)
                      for s, p in zip("PF", n1p)])
        b2 = VGroup(*[Line(n1p[i // 2], p, buff=0.25, stroke_width=4, color=VERT_OK) for i, p in enumerate(n2p)])
        l2 = VGroup(*[self.t(s, 34, JAUNE_TITRE if s == "P" else ORANGE_RETENUE).move_to(p)
                      for s, p in zip("PFPF", n2p)])
        self.au_mot("Les issues")
        self.play(FadeIn(dot), Create(b1), FadeIn(l1), run_time=0.6)
        self.play(Create(b2), FadeIn(l2), run_time=0.6)
        issues = VGroup()
        for i, (ex, s) in enumerate(zip(["pile pile,", "pile face,", "face pile,", "face face."],
                                        ["PP", "PF", "FP", "FF"])):
            self.au_mot(ex)
            r = self.t(s, 38, WHITE).move_to(n2p[i] + RIGHT * 1.3)
            chemin = VGroup(b1[i // 2], b2[i]).copy().set_color(WHITE).set_stroke(width=7)
            self.play(ShowPassingFlash(chemin, time_width=0.6), FadeIn(r, shift=LEFT * 0.2), run_time=0.45)
            issues.add(r)
            if i == 1:
                for tt, c, s in ((t1, c1, "P"), (t2, c2, "F")):
                    tt.clear_updaters()
                    tt.remove(*tt.submobjects)
                    tt.add(piece_fixe(c, s))
        self.au_mot("4 issues")
        quatre = self.ligne([("4", JAUNE_TITRE), ("issues", VERT_OK)], 44, 0.2).move_to(P(-4.25, -1.4))
        accol = Brace(issues, RIGHT, color=WHITE)
        self.play(FadeIn(quatre, scale=0.8), GrowFromCenter(accol), run_time=0.5)
        self.insister(quatre[0], 0.35)
        self.au_mot("Pile face et face pile")
        cad = VGroup(*[SurroundingRectangle(issues[k], color=VIOLET_ACCENT, buff=0.1) for k in (1, 2)])
        self.play(Create(cad), run_time=0.4)
        a, b = issues[1].copy(), issues[2].copy()
        ne = self.t("≠", 46, ROUGE_ERREUR)
        cible = VGroup(a.copy(), ne, b.copy()).arrange(RIGHT, buff=0.3).move_to(P(-4.25, -2.35))
        self.play(a.animate.move_to(cible[0]), b.animate.move_to(cible[2]), run_time=0.6)
        self.au_mot("pas la même chose")
        self.play(FadeIn(ne, scale=1.6), run_time=0.4)
        self.insister(VGroup(a, ne, b), 0.35)
        self.attendre_voix(marge=0.8)

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        tu = etiquettes("BANANE", 0.75, 0.25).move_to(P(-1.4, 1.85))
        self.add(tu)
        self.au_mot("compter les objets")
        cpt = VGroup(*[self.t(str(i + 1), 28, ROUGE_ERREUR).next_to(m, DOWN, buff=0.12)
                       for i, m in enumerate(tu)])
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in cpt], lag_ratio=0.15), run_time=1.0)
        self.au_mot("6 étiquettes")
        six = self.ligne([("6", JAUNE_TITRE), ("étiquettes,", WHITE)], 40, 0.18).move_to(P(-3.6, -2.2))
        self.play(FadeIn(six), FadeOut(cpt), run_time=0.5)
        self.au_mot("mais 4 lettres")
        xs = [-4.4, -2.5, -0.6, 1.3]
        ordre, cibles = piles("BANANE", xs, 0.0)
        self.play(*[m.animate.move_to(c) for m, c in zip(tu, cibles)], run_time=0.7)
        quatre = self.ligne([("mais", WHITE), ("4", JAUNE_TITRE), ("lettres", VERT_OK)], 40, 0.18)
        quatre.next_to(six, RIGHT, buff=0.3)
        self.play(FadeIn(quatre), run_time=0.4)
        self.insister(quatre[1], 0.35)
        self.au_mot("qu'est-ce que je note")
        carnet = RoundedRectangle(width=2.0, height=2.4, corner_radius=0.12, fill_color=WHITE,
                                  fill_opacity=1, stroke_color=GREY_B, stroke_width=2).move_to(P(4.1, 0.9))
        lignes_c = VGroup(*[Line(P(3.3, y), P(4.9, y), stroke_width=1.5, color="#93C5FD")
                            for y in (1.5, 0.95, 0.4)])
        ecrit = VGroup(*[Text(c, font_size=34, color=k, weight=BOLD)
                         for c, k in zip("BANE", ["#1D4ED8", "#B45309", "#15803D", "#C2410C"])]).arrange(RIGHT, buff=0.18).move_to(P(4.1, 1.25))
        q = self.t("Qu'est-ce que je note ?", 40, BLEU_CALCUL).move_to(P(2.5, -1.1))
        self.play(FadeIn(carnet), Create(lignes_c), Write(q), run_time=0.6)
        self.play(LaggedStart(*[Write(e) for e in ecrit], lag_ratio=0.3), run_time=1.0)
        self.attendre_voix(marge=0.8)

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("du mot PAPAYE")
        tu = etiquettes("PAPAYE", 0.8, 0.22).move_to(P(-0.6, 1.9))
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.3) for m in tu], lag_ratio=0.15), run_time=0.9)
        self.sautiller(tu)
        ch = chapeau(2.2, 1.4).move_to(P(-4.0, -0.5))
        mystere = etiquette("A", 0.7)
        mystere[1].become(Text("?", font_size=40, color=BLACK, weight=BOLD).move_to(mystere[0]))
        mystere[0].set_fill(WHITE)
        mystere.move_to(ouverture(ch) + UP * 0.45)
        self.play(FadeIn(ch), FadeIn(mystere, shift=UP * 0.3), run_time=0.5)
        self.au_mot("Combien d'issues")
        q = self.t("Combien d'issues ?", 50, BLEU_CALCUL).move_to(P(1.2, -0.4))
        self.play(Write(q), run_time=0.8)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)
        tu.clear_updaters()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        tu = etiquettes("PAPAYE", 0.75, 0.25).move_to(P(-0.6, 2.0))
        self.add(tu)
        xs = [-4.2, -2.0, 0.2, 2.4]
        ordre = self.regrouper(tu, "PAPAYE", xs, 0.45, ["P,", "A,", "Y et", "E :"])
        cases = VGroup()
        for lettre, x in zip(ordre, xs):
            n = "PAPAYE".count(lettre)
            c = RoundedRectangle(width=1.35, height=1.45, corner_radius=0.15, stroke_color=WHITE, stroke_width=3)
            cases.add(c.move_to(P(x + 0.08 * (n - 1), 0.45 - 0.08 * (n - 1))))
        self.play(LaggedStart(*[Create(c) for c in cases], lag_ratio=0.15), run_time=0.6)
        self.au_mot("4 issues")
        res = self.ligne([("4", JAUNE_TITRE), ("issues", VERT_OK)], 50, 0.2).move_to(P(-2.2, -1.4))
        self.play(FadeIn(res, scale=0.8), run_time=0.5)
        self.insister(res[0], 0.35)
        self.au_mot("pour 6 étiquettes")
        six = self.ligne([("pour", WHITE), ("6", JAUNE_TITRE), ("étiquettes", WHITE)], 40, 0.18)
        six.next_to(res, RIGHT, buff=0.5)
        self.play(FadeIn(six, shift=LEFT * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Une issue, c'est", "Une issue : un résultat qu'on peut noter"),
            ("On les liste", "On les liste pour n'en oublier aucune"),
            ("Et on compte", "On compte les résultats, pas les objets"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 40)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 10.0:
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.8))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("Épisode 3 : l'équiprobabilité", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_garde()
        self.ecran_situation()
        self.ecran_issues()
        self.ecran_liste()
        self.ecran_deux_pieces()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
