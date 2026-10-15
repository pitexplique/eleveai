# proba_frequence_calculer.py
# EleveAI — Maths 4e — Probabilités, épisode 9 : calculer une fréquence
# (micro : frequence_calculer), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Short jumeau (ceinture jaune) : proba_frequence_calculer_short.py.
#
# ⭐ LE DESSIN QUI PORTE TOUT : une pièce qui tombe et le tableau de BÂTONS
# (pile / face) qui se remplit jusqu'à 40 lancers : 18 piles, 22 faces.
# Les 18 bâtons de pile SAUTENT au numérateur, les 40 au dénominateur.
# Écrans : 00 garde · 01 les 40 lancers · 02 la définition · 03 le calcul
# (18 ÷ 40 = 0,45 = 45 %) · 04 après / avant · 05 le piège « ÷ 2 » ·
# 06 entre 0 et 1 · 07 défi (dé, 12 six sur 60) · 07b correction · 08 appris.
#
# Voix : manim/voix/4e-proba-frequence-calculer.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_frequence_calculer.py ProbaFrequenceCalculer4e -o eleveai-maths-4e-proba-frequence-calculer --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/09-frequence-calculer/.

import math
import random
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

COUL_PILE = JAUNE_TITRE
COUL_FACE = ORANGE_RETENUE
GRIS = "#9CA3AF"

# les 40 lancers de la classe : 18 piles, 22 faces, dans un ordre de hasard (graine fixe)
_r = random.Random(4018)
LANCERS = ["P"] * 18 + ["F"] * 22
_r.shuffle(LANCERS)


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins communs (paysage et short) ──────────────────────────────────

def piece(face="P", r=0.6, lettres=True, court=None):
    """Une pièce vue de dessus : PILE jaune, FACE orange."""
    pile = face == "P"
    disque = Circle(radius=r, fill_color=COUL_PILE if pile else COUL_FACE, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=3)
    anneau = Circle(radius=r * 0.78, stroke_color=WHITE, stroke_width=2, stroke_opacity=0.6)
    g = VGroup(disque, anneau)
    if lettres:
        mot = "PILE" if pile else "FACE"
        if (r < 0.3) if court is None else court:
            mot = mot[0]
        t = Text(mot, font_size=max(int(r * 40), 14), color=BLACK, weight=BOLD).move_to(disque)
        if t.width > r * 1.5:
            t.scale_to_fit_width(r * 1.5)
        g.add(t)
    return g


def piece_lancee(centre, r=0.6, haut=1.0, periode=0.9):
    """Une pièce LANCÉE SANS FIN (updater) : elle monte en tournant, retombe, rebondit."""
    etat = {"t": 0.0}

    def faire(t):
        c = math.cos(t * 9)
        g = piece("P" if c >= 0 else "F", r, lettres=False)
        g.stretch(max(abs(c), 0.06), 1)
        ph = (t % periode) / periode
        return g.move_to(centre + UP * haut * 4 * ph * (1 - ph))

    holder = faire(0)

    def maj(m, dt):
        etat["t"] += dt
        m.become(faire(etat["t"]))

    holder.add_updater(maj)
    return holder


def batons(n, x0, y, h=0.5, pas=0.15, gpas=0.85, color=WHITE, sw=4):
    """n bâtons, groupés par 5 : quatre droits et le cinquième en travers."""
    g = VGroup()
    for k in range(n):
        grp, i = divmod(k, 5)
        xg = x0 + grp * gpas
        if i < 4:
            g.add(Line(P(xg + i * pas, y - h / 2), P(xg + i * pas, y + h / 2), stroke_width=sw, color=color))
        else:
            g.add(Line(P(xg - 0.1, y - h / 2 + 0.06), P(xg + 3 * pas + 0.1, y + h / 2 - 0.06),
                       stroke_width=sw, color=color))
    return g


def tableau_batons(np_, nf, longueur=4.9):
    """Le tableau de relevé : une ligne PILE, une ligne FACE, les bâtons à droite.
    Construit autour de l'origine (coin gauche des pièces en x = 0)."""
    ip = piece("P", 0.32).move_to(P(0, 0.45))
    if_ = piece("F", 0.32).move_to(P(0, -0.45))
    sep = VGroup(Line(P(-0.45, 0), P(longueur, 0)), Line(P(0.45, 0.9), P(0.45, -0.9)),
                 Line(P(-0.45, 0.9), P(longueur, 0.9)), Line(P(-0.45, -0.9), P(longueur, -0.9))
                 ).set_stroke(GRIS, 2)
    tp = batons(np_, 0.75, 0.45, color=COUL_PILE)
    tf = batons(nf, 0.75, -0.45, color=COUL_FACE)
    return VGroup(VGroup(ip, if_), sep, tp, tf)


def compte(n):
    s = LANCERS[:n]
    return s.count("P"), s.count("F")


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


class ProbaFrequenceCalculer4e(Notion4e):
    nom_voix = "4e-proba-frequence-calculer"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.45):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.1, mob.get_corner(UR) + RIGHT * 0.1,
                    stroke_width=7, color=color)

    def bande40(self, y=1.7, c=0.22, h=0.5, x0=-4.6, n_pile=18, n=40):
        """Les 40 lancers en bande : les piles d'abord (jaunes), puis les faces (orange)."""
        return VGroup(*[Rectangle(width=c, height=h, stroke_color=WHITE, stroke_width=1.5,
                                  fill_color=COUL_PILE if i < n_pile else COUL_FACE, fill_opacity=0.9)
                        .move_to(P(x0 + c / 2 + i * c, y)) for i in range(n)])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La fréquence observée", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        pc = piece_lancee(P(-4.6, -0.4), 0.6, 1.1)
        self.add(pc)
        tab = tableau_batons(0, 0).shift(P(-1.9, 0.15))
        self.play(FadeIn(tab[0]), Create(tab[1]), run_time=0.6)
        self.au_mot("Ce que l'expérience")
        for n in range(1, 11):
            npi, nfa = compte(n)
            neuf = tableau_batons(npi, nfa).shift(P(-1.9, 0.15))
            self.remove(tab)
            tab = neuf
            self.add(tab)
            self.wait(0.22)
        self.attendre_voix(marge=1.0)
        pc.clear_updaters()

    # ── 01 : les 40 lancers ────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("40 lancers d'une pièce")
        pc = piece_lancee(P(-5.2, -0.2), 0.6, 1.4, periode=0.5)
        self.add(pc)
        off = P(-2.9, 0.6)
        n = ValueTracker(0)
        tab = always_redraw(lambda: tableau_batons(*compte(int(n.get_value()))).shift(off))
        self.add(tab)

        self.au_mot("40 fois")
        cpt = always_redraw(lambda: self.ligne(
            [(str(int(n.get_value())), JAUNE_TITRE), ("lancers", WHITE)], 38, 0.2).move_to(P(-5.2, -1.9)))
        but = self.ligne([("objectif :", GRIS), ("40", JAUNE_TITRE)], 30, 0.2).move_to(P(-0.3, 2.35))
        self.play(FadeIn(cpt), FadeIn(but), run_time=0.5)

        self.au_mot("Elle note")
        self.play(n.animate.set_value(40), run_time=3.2, rate_func=linear)
        tab.clear_updaters()
        cpt.clear_updaters()
        pc.clear_updaters()
        self.remove(pc)
        self.add(piece("P", 0.6).move_to(P(-5.2, -0.2)))

        self.au_mot("18 fois pile")
        dix8 = self.ligne([("18", COUL_PILE), ("piles", WHITE)], 44, 0.2).move_to(P(3.7, 1.05))
        self.play(FadeIn(dix8, shift=LEFT * 0.3), Indicate(tab[2], color=WHITE, scale_factor=1.08), run_time=0.7)
        self.insister(dix8, 0.4)

        self.au_mot("Comment dire")
        self.play(Write(self.chute("Un seul nombre pour le dire ?", color=BLEU_CALCUL, font_size=40)))
        self.attendre_voix()

    # ── 02 : la définition ─────────────────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-definition")
        self.titre_ecran("La fréquence")
        tab = tableau_batons(18, 22).shift(P(-3.2, 1.75))
        self.play(FadeIn(tab), run_time=0.6)

        self.au_mot("la fréquence de pile")
        gauche = self.t("fréquence de pile =", 40, COUL_PILE)
        frac = self.fraction("nombre de fois où pile est sorti", "nombre total de lancers", 32)
        formule = VGroup(gauche, frac).arrange(RIGHT, buff=0.35)
        if formule.width > 12.5:
            formule.scale_to_fit_width(12.5)
        formule.move_to(P(-0.4, -1.0))
        self.play(Write(gauche), run_time=0.8)

        self.au_mot("le nombre de fois où pile")
        sauts = tab[2].copy()
        self.play(sauts.animate.move_to(frac[0]).scale(0.6), run_time=0.9)
        self.play(ReplacementTransform(sauts, frac[0]), run_time=0.5)

        self.au_mot("divisé par")
        self.play(Create(frac[1]), run_time=0.4)

        self.au_mot("nombre total")
        tous = VGroup(tab[2], tab[3]).copy()
        self.play(tous.animate.move_to(frac[2]).scale(0.5), run_time=0.9)
        self.play(ReplacementTransform(tous, frac[2]), run_time=0.5)
        self.play(Create(SurroundingRectangle(formule, color=VERT_OK, buff=0.2)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : le calcul ─────────────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        self.titre_ecran("Le calcul")
        bande = self.bande40()
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in bande], lag_ratio=0.02), run_time=0.8)

        self.au_mot("18 piles")
        p18 = VGroup(*bande[:18])
        acc = Brace(p18, UP, buff=0.08, color=COUL_PILE)
        l18 = self.t("18 piles", 28, COUL_PILE).next_to(acc, UP, buff=0.08)
        self.play(GrowFromCenter(acc), FadeIn(l18), Indicate(p18, color=WHITE, scale_factor=1.05), run_time=0.6)
        self.au_mot("sur 40 lancers")
        acc40 = Brace(bande, DOWN, buff=0.08, color=WHITE)
        l40 = self.t("40 lancers", 28).next_to(acc40, DOWN, buff=0.08)
        self.play(GrowFromCenter(acc40), FadeIn(l40), run_time=0.6)

        x0 = -4.2
        self.au_mot("18 sur 40")
        f = self.fraction(18, 40, 50, COUL_PILE)
        l1 = VGroup(self.t("f =", 46), f).arrange(RIGHT, buff=0.3).move_to(P(x0, -0.35))
        self.play(FadeIn(l1, shift=UP * 0.2), run_time=0.6)

        self.au_mot("18 divisé par 40")
        l2a = self.t("18 ÷ 40", 44).move_to(P(0.2, 0.2), aligned_edge=LEFT).shift(LEFT * 1.6)
        self.play(FadeIn(l2a), run_time=0.5)
        self.au_mot("égale 0,45")
        l2b = self.t("= 0,45", 44, BLEU_CALCUL).next_to(l2a, RIGHT, buff=0.25)
        self.play(FadeIn(l2b, shift=LEFT * 0.2), run_time=0.5)
        self.insister(l2b[1:], 0.35)

        self.au_mot("0,45 fois 100")
        l3a = self.t("0,45 × 100", 44).next_to(l2a, DOWN, buff=0.55, aligned_edge=LEFT)
        self.play(FadeIn(l3a), run_time=0.5)
        self.au_mot("égale 45")
        l3b = self.t("= 45", 44, BLEU_CALCUL).next_to(l3a, RIGHT, buff=0.25)
        self.play(FadeIn(l3b, shift=LEFT * 0.2), run_time=0.5)

        self.au_mot("45 %")
        res = self.t("45 %", 64, VERT_OK).move_to(P(x0, -2.1))
        self.play(FadeIn(res, scale=1.5), run_time=0.5)
        self.play(Create(SurroundingRectangle(res, color=VERT_OK, buff=0.15)), run_time=0.4)
        self.insister(res, 0.4)
        self.attendre_voix()

    # ── 04 : après / avant ─────────────────────────────────────────────────

    def ecran_difference(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-difference")
        self.titre_ecran("Après ou avant ?")
        fleche = Arrow(P(-6.3, -2.2), P(4.6, -2.2), buff=0, stroke_width=5, color=GRIS)
        lav = self.t("avant", 30, BLEU_CALCUL).move_to(P(-4.0, -2.65))
        lap = self.t("après", 30, VERT_OK).move_to(P(2.6, -2.65))
        pc = piece_lancee(P(-0.7, -1.0), 0.45, 1.6, periode=0.7)
        lexp = self.t("l'expérience", 26, WHITE).move_to(P(-0.7, -2.65))
        self.play(GrowArrow(fleche), FadeIn(lav), FadeIn(lap), FadeIn(lexp), run_time=0.7)
        self.add(pc)

        self.au_mot("la fréquence")
        fr = self.t("La fréquence", 40, VERT_OK).move_to(P(2.6, 2.2))
        tab = tableau_batons(18, 22).scale(0.62).move_to(P(2.6, 0.95))
        sous = self.t("on la trouve après", 28).move_to(P(2.6, -0.4))
        self.play(FadeIn(fr, shift=DOWN * 0.2), FadeIn(tab), run_time=0.7)
        self.au_mot("après avoir")
        self.play(FadeIn(sous), Indicate(lap, color=VERT_OK, scale_factor=1.4), run_time=0.7)

        self.au_mot("La probabilité")
        pr = self.t("La probabilité", 40, BLEU_CALCUL).move_to(P(-4.0, 2.2))
        immobile = piece("P", 0.55).move_to(P(-4.0, 0.95))
        crayon = VGroup(Rectangle(width=0.18, height=1.0, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0),
                        Triangle(fill_color="#F5DEB3", fill_opacity=1, stroke_width=0).scale(0.12).rotate(PI)
                        .shift(DOWN * 0.58)).rotate(-0.6).move_to(P(-2.9, 0.95))
        self.play(FadeIn(pr, shift=DOWN * 0.2), FadeIn(immobile), FadeIn(crayon), run_time=0.7)
        self.au_mot("on la calcule avant")
        sous2 = self.t("on la calcule avant", 28).move_to(P(-4.0, -0.4))
        self.play(FadeIn(sous2), Indicate(lav, color=BLEU_CALCUL, scale_factor=1.4),
                  Wiggle(crayon), run_time=0.8)
        self.au_mot("sans lancer")
        sl = self.t("sans lancer", 28, BLEU_CALCUL).next_to(sous2, DOWN, buff=0.15)
        self.play(FadeIn(sl), run_time=0.4)
        self.attendre_voix()
        pc.clear_updaters()

    # ── 05 : le piège ──────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("diviser par le nombre de faces")
        deux = VGroup(piece("P", 0.6), piece("F", 0.6)).arrange(RIGHT, buff=0.4).move_to(P(-4.4, 1.5))
        l2 = self.ligne([("2", JAUNE_TITRE), ("faces", WHITE)], 32, 0.15).next_to(deux, DOWN, buff=0.25)
        self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in deux], lag_ratio=0.3), FadeIn(l2), run_time=0.8)

        self.au_mot("18 divisé par 2")
        faux = self.t("18 ÷ 2 ?", 52, ROUGE_ERREUR).move_to(P(1.0, 1.5))
        self.play(FadeIn(faux, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("ça ne veut rien dire")
        barre = self.barrer(faux)
        self.play(Create(barre), run_time=0.4)
        self.play(Wiggle(VGroup(faux, barre)), run_time=0.6)

        self.au_mot("On divise toujours")
        bande = self.bande40(y=-0.15, x0=-5.2)
        acc = Brace(bande, DOWN, buff=0.08)
        l40 = self.t("40 lancers", 28).next_to(acc, DOWN, buff=0.08)
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in bande], lag_ratio=0.02),
                  run_time=0.8)
        self.au_mot("nombre total de lancers")
        bon = self.t("18 ÷ 40", 52, VERT_OK).move_to(P(-3.0, -2.2))
        self.play(GrowFromCenter(acc), FadeIn(l40), FadeIn(bon, shift=UP * 0.2), run_time=0.7)
        self.play(Create(SurroundingRectangle(bon, color=VERT_OK, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 06 : entre 0 et 1 ──────────────────────────────────────────────────

    def ecran_bornes(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-bornes")
        self.titre_ecran("Toujours entre 0 et 1")
        y = 0.2
        x0, x1 = -5.4, 3.8
        axe = Line(P(x0, y), P(x1, y), stroke_width=5)
        zone = Rectangle(width=x1 - x0, height=0.5, stroke_width=0, fill_color=VERT_OK,
                         fill_opacity=0.25).move_to(P((x0 + x1) / 2, y))
        self.play(Create(axe), run_time=0.6)
        pc = piece_lancee(P(-0.8, 1.7), 0.5, 0.6, periode=0.7)
        self.add(pc)

        self.au_mot("entre 0 et 1")
        t0 = self.t("0", 56).move_to(P(x0, y - 0.65))
        t1 = self.t("1", 56).move_to(P(x1, y - 0.65))
        ticks = VGroup(Line(P(x0, y - 0.25), P(x0, y + 0.25)), Line(P(x1, y - 0.25), P(x1, y + 0.25))
                       ).set_stroke(WHITE, 5)
        self.play(FadeIn(t0, scale=1.5), FadeIn(t1, scale=1.5), Create(ticks), FadeIn(zone), run_time=0.6)
        curseur = Triangle(fill_color=VERT_OK, fill_opacity=1, stroke_width=0).scale(0.2).rotate(PI)
        curseur.move_to(P(x0 + 1.0, y + 0.45))
        self.play(FadeIn(curseur), run_time=0.2)
        self.play(curseur.animate.move_to(P(x1 - 0.4, y + 0.45)), run_time=0.8)
        self.play(curseur.animate.move_to(P(x0 + 0.8, y + 0.45)), run_time=0.7)

        self.au_mot("100 %")
        p0 = self.t("0 %", 46, BLEU_CALCUL).move_to(P(x0, y - 1.55))
        p1 = self.t("100 %", 46, BLEU_CALCUL).move_to(P(x1, y - 1.55))
        self.play(FadeIn(p0, shift=UP * 0.2), FadeIn(p1, shift=UP * 0.2), run_time=0.5)
        self.insister(p1, 0.35)
        self.play(curseur.animate.move_to(P((x0 + x1) / 2, y + 0.45)), run_time=0.6)
        self.attendre_voix()
        pc.clear_updaters()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def de(self, face, cote=1.2):
        pts = {1: [(0, 0)], 2: [(-1, 1), (1, -1)], 3: [(-1, 1), (0, 0), (1, -1)],
               4: [(-1, 1), (1, 1), (-1, -1), (1, -1)], 5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
               6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]}[face]
        corps = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.18, fill_color=WHITE,
                                 fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
        return VGroup(corps, VGroup(*[Dot(P(x * cote * 0.27, y * cote * 0.27), radius=cote * 0.085,
                                          color="#111827") for x, y in pts]))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        etat = {"t": 0.0}
        faces = [3, 6, 1, 5, 2, 6, 4, 1, 6, 2, 5, 3]
        d = self.de(3, 1.4).move_to(P(-4.6, 1.0))

        def roule(m, dt):
            etat["t"] += dt
            k = int(etat["t"] / 0.12)
            m.become(self.de(faces[k % len(faces)], 1.4).rotate(0.3 * math.sin(etat["t"] * 9))
                  .move_to(P(-4.6, 1.0) + UP * 0.15 * abs(math.sin(etat["t"] * 9))))

        self.au_mot("Hugo lance")
        d.add_updater(roule)
        self.add(d)
        self.au_mot("60 fois")
        l60 = self.ligne([("60", JAUNE_TITRE), ("lancers", WHITE)], 40, 0.2).move_to(P(-0.2, 1.6))
        self.play(FadeIn(l60, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("12 fois")
        d.clear_updaters()
        self.remove(d)
        six = self.de(6, 1.4).move_to(P(-4.6, 1.0))
        self.add(six)
        l12 = self.ligne([("le 6 :", WHITE), ("12", JAUNE_TITRE), ("fois", WHITE)], 40, 0.2)
        l12.next_to(l60, DOWN, buff=0.4, aligned_edge=LEFT)
        self.play(FadeIn(l12, shift=LEFT * 0.2), Indicate(six, color=JAUNE_TITRE), run_time=0.6)
        self.au_mot("Quelle est la fréquence")
        q = VGroup(self.t("Fréquence du 6 ?", 40, BLEU_CALCUL),
                   self.t("en décimal  ·  en pourcentage", 32, BLEU_CALCUL)).arrange(DOWN, buff=0.2)
        q.move_to(P(-1.0, -0.9))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        # les 60 lancers en grille : 6 rangées de 10, 12 six (2 par rangée)
        c = 0.38
        grille = VGroup()
        six = {(r, k) for r in range(6) for k in ((r * 3) % 10, (r * 3 + 6) % 10)}
        for r in range(6):
            for k in range(10):
                est6 = (r, k) in six
                grille.add(Square(c * 0.86, stroke_color=WHITE, stroke_width=1.5,
                                  fill_color=GRIS, fill_opacity=0.25)
                           .move_to(P(1.4 + k * c, 2.2 - r * c)))
        sixes = VGroup(*[grille[r * 10 + k] for (r, k) in sorted(six)])
        self.play(LaggedStart(*[FadeIn(q, scale=0.5) for q in grille], lag_ratio=0.01), run_time=0.8)
        l60 = self.t("60 lancers", 28).next_to(grille, DOWN, buff=0.2)
        self.play(FadeIn(l60), run_time=0.3)

        x0 = -5.6
        self.au_mot("12 sur 60")
        self.play(*[q.animate.set_fill(JAUNE_TITRE, 1) for q in sixes], run_time=0.5)
        f = self.fraction(12, 60, 48, JAUNE_TITRE)
        l1 = VGroup(self.t("f =", 44), f).arrange(RIGHT, buff=0.3).move_to(P(x0, 1.4), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.2), run_time=0.5)
        self.au_mot("12 divisé par 60")
        l2a = self.t("12 ÷ 60", 44).move_to(P(x0, -0.1), aligned_edge=LEFT)
        self.play(FadeIn(l2a), run_time=0.4)
        self.au_mot("égale 0,2")
        l2b = self.t("= 0,2", 44, BLEU_CALCUL).next_to(l2a, RIGHT, buff=0.25)
        self.play(FadeIn(l2b, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("0,2 fois 100")
        l3a = self.t("0,2 × 100", 44).move_to(P(x0, -1.1), aligned_edge=LEFT)
        self.play(FadeIn(l3a), run_time=0.4)
        self.au_mot("égale 20")
        l3b = self.t("= 20", 44, BLEU_CALCUL).next_to(l3a, RIGHT, buff=0.25)
        self.play(FadeIn(l3b, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("20 %")
        res = self.ligne([("fréquence du 6 :", WHITE), ("20 %", VERT_OK)], 44, 0.45).move_to(P(-2.6, -2.3))
        self.play(FadeIn(res, scale=1.3), run_time=0.5)
        self.play(Create(SurroundingRectangle(res[1], color=VERT_OK, buff=0.12)), run_time=0.4)
        self.insister(res[1], 0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        pc = piece_lancee(P(-5.6, 3.1), 0.32, 0.4, periode=0.6)
        self.add(pc)
        l1 = VGroup(self.coche(), self.t("fréquence =", 34),
                    self.fraction("nombre de fois où le résultat est sorti", "nombre total d'essais", 28,
                                  JAUNE_TITRE))
        l2 = VGroup(self.coche(), self.t("On la trouve après l'expérience", 34))
        lignes = VGroup(l1, l2)
        for l in lignes:
            l.arrange(RIGHT, buff=0.3)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.6, 0.7))
        for mot, l in zip(["La fréquence observée", "On la trouve"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1:], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode suivant")
        self.play(Write(self.chute("Épisode suivant : comparer fréquence et probabilité", color=VERT_OK,
                                   font_size=36)))
        self.attendre_voix(marge=1.0)
        pc.clear_updaters()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_garde()
        self.ecran_situation()
        self.ecran_definition()
        self.ecran_calcul()
        self.ecran_difference()
        self.ecran_piege()
        self.ecran_bornes()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
