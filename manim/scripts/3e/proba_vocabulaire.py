# proba_vocabulaire.py
# EleveAI — Maths 3e — série « Probabilités », épisode 1 : le vocabulaire
# (micro : proba_vocabulaire), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : proba_vocabulaire_short.py (ceinture blanche, le loto).
#
# Écrans : 00 garde · 01 les petits chevaux (plateau + le dé qui roule, les
# 6 faces en rangée) · 02 expérience aléatoire (dé, carte, pièce ; la table
# mesurée barrée) · 03 les 6 issues · 04 l'événement « pair » (2, 4, 6
# s'allument) · 05 ⭐ L'ÉCHELLE DE 0 À 1 (8 → 0, « plus petit que 7 » → 1) ·
# 06 le piège du loto (tout près de 0, pas 0) · 07 défi du jeu de 32 cartes en
# éventail · 07b correction (les rouges s'allument, aucun 2) · 08 ce que tu as
# appris · 09 abonnement.
#
# Dessins repris de la bande-annonce (annonce_probabilites.py) : dé, dé qui
# roule, pièce qui tourne, billes.
#
# Voix : manim/voix/3e-proba-vocabulaire.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/proba_vocabulaire.py ProbaVocabulaire3e -o eleveai-maths-3e-proba-vocabulaire --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/01-vocabulaire/.

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
from annonce_probabilites import bille, de, de_qui_roule, piece_qui_tourne  # noqa: E402

GRIS_ETEINT = "#6B7280"
CARTE_ROUGE = "#DC2626"
CARTE_NOIRE = "#111827"
CHEVAUX = ["#DC2626", "#2563EB", "#16A34A", "#EAB308"]  # haut-gauche, haut-droite, bas-droite, bas-gauche
VALEURS = ["7", "8", "9", "10", "V", "D", "R", "As"]
ENSEIGNES = [("♥", CARTE_ROUGE), ("♠", CARTE_NOIRE), ("♦", CARTE_ROUGE), ("♣", CARTE_NOIRE)]


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins (paysage et short) ──────────────────────────────────────────

def carte(valeur, enseigne, couleur, w=0.8, h=1.15, police=20):
    """Une carte à jouer : coin (valeur + enseigne) en haut à gauche, enseigne au centre."""
    fond = RoundedRectangle(width=w, height=h, corner_radius=0.07, fill_color=WHITE, fill_opacity=1,
                            stroke_color=GREY_B, stroke_width=2)
    coin = VGroup(Text(valeur, font_size=police, color=couleur, weight=BOLD),
                  Text(enseigne, font_size=police, color=couleur)).arrange(DOWN, buff=0.03)
    coin.move_to(fond.get_corner(UL) + P(0.07 + coin.width / 2, -0.07 - coin.height / 2))
    centre = Text(enseigne, font_size=int(police * 2.1), color=couleur).move_to(fond.get_center() + DOWN * 0.08)
    return VGroup(fond, coin, centre)


def dos_de_carte(w=0.8, h=1.15):
    fond = RoundedRectangle(width=w, height=h, corner_radius=0.07, fill_color="#1E3A8A", fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2)
    motif = RoundedRectangle(width=w - 0.18, height=h - 0.18, corner_radius=0.05, stroke_color=BLEU_CALCUL,
                             stroke_width=2).move_to(fond)
    return VGroup(fond, motif)


def jeu_de_32(pivot, rayon=3.0, a0=158, a1=22, w=0.8, h=1.15):
    """Les 32 cartes EN ÉVENTAIL (♥, ♠, ♦, ♣ ; 7 → As). Renvoie (éventail, rouges?, valeurs)."""
    cartes, rouges, valeurs = VGroup(), [], []
    k = 0
    for ens, coul in ENSEIGNES:
        for v in VALEURS:
            a = math.radians(a0 - k * (a0 - a1) / 31)
            c = carte(v, ens, coul, w, h)
            c.rotate(a - PI / 2).move_to(pivot + rayon * np.array([math.cos(a), math.sin(a), 0.0]))
            cartes.add(c)
            rouges.append(coul == CARTE_ROUGE)
            valeurs.append(v)
            k += 1
    return cartes, rouges, valeurs


def pion(couleur, s=1.0):
    tete = Circle(radius=0.08, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    corps = Polygon(P(-0.1, -0.18), P(0.1, -0.18), P(0.045, 0.0), P(-0.045, 0.0),
                    fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    tete.move_to(P(0, 0.06))
    return VGroup(corps, tete).scale(s)


def plateau_chevaux(cote=3.6):
    """Un plateau SIMPLIFIÉ de petits chevaux : 4 écuries en coin, la croix des cases, des pions.
    Renvoie (plateau, pions, chemin du pion rouge)."""
    c = cote / 2
    m = cote * 0.4
    bande = cote - 2 * m
    case = bande / 3
    fond = Square(cote, fill_color="#FFF7ED", fill_opacity=0.10, stroke_color=WHITE, stroke_width=3)
    coins = VGroup()
    for (sx, sy), coul in zip([(-1, 1), (1, 1), (1, -1), (-1, -1)], CHEVAUX):
        coins.add(Square(m, fill_color=coul, fill_opacity=0.45, stroke_color=coul, stroke_width=2)
                  .move_to(P(sx * (c - m / 2), sy * (c - m / 2))))
    cases = VGroup()
    for i in range(6):
        for j in range(3):
            u = -c + case * (i + 0.5)
            v = -bande / 2 + case * (j + 0.5)
            for x, y in [(u, v), (-u, v), (v, u), (v, -u)]:
                cases.add(Square(case, stroke_color=WHITE, stroke_width=1.2, stroke_opacity=0.7).move_to(P(x, y)))
    centre = VGroup(*[Polygon(P(0, 0), a, b, fill_color=coul, fill_opacity=0.8, stroke_width=0)
                      for (a, b), coul in zip(
                          [(P(-bande / 2, bande / 2), P(-bande / 2, -bande / 2)),
                           (P(-bande / 2, bande / 2), P(bande / 2, bande / 2)),
                           (P(bande / 2, bande / 2), P(bande / 2, -bande / 2)),
                           (P(bande / 2, -bande / 2), P(-bande / 2, -bande / 2))], CHEVAUX)])
    pions = VGroup()
    for (sx, sy), coul in zip([(-1, 1), (1, 1), (1, -1), (-1, -1)], CHEVAUX):
        cx, cy = sx * (c - m / 2), sy * (c - m / 2)
        for dx, dy in [(-0.25, 0.22), (0.25, 0.22), (-0.25, -0.22), (0.25, -0.22)]:
            pions.add(pion(coul, 1.1).move_to(P(cx + dx, cy + dy)))
    chemin = [P(-c + case * (i + 0.5), bande / 2 - case / 2) for i in range(6)]
    return VGroup(fond, coins, cases, centre, pions), pions, chemin


def table_mesuree(s=1.0):
    plateau = Rectangle(width=1.8, height=0.14, fill_color="#92400E", fill_opacity=1, stroke_width=0)
    pieds = VGroup(*[Rectangle(width=0.12, height=0.75, fill_color="#78350F", fill_opacity=1, stroke_width=0)
                     .move_to(P(x, -0.44)) for x in (-0.75, 0.75)])
    regle = Rectangle(width=1.8, height=0.18, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.3))
    traits = VGroup(*[Line(P(-0.85 + 0.1 * k, 0.39), P(-0.85 + 0.1 * k, 0.39 - (0.1 if k % 5 == 0 else 0.05)),
                           color=BLACK, stroke_width=1.5) for k in range(18)])
    return VGroup(pieds, plateau, regle, traits).scale(s)


class ProbaVocabulaire3e(Notion3e):
    nom_voix = "3e-proba-vocabulaire"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        """Une ligne en morceaux colorés, d'UN SEUL Text (même ligne de base) ;
        ligne[i] reste le i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):  # ligature : on retombe sur des morceaux séparés
            return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        g, k = VGroup(), 0
        for (m, c), n in zip(morceaux, tailles):
            g.add(VGroup(*T[k:k + n]).set_color(c))
            k += n
        return g

    def insister(self, mob, run_time=0.45):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=sw, color=color)

    def etiquette(self, texte, color, font_size=30):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def rangee_de_des(self, y, cote=0.95, pas=1.35, x_c=-0.6):
        return VGroup(*[de(f, cote).move_to(P(x_c + (f - 3.5) * pas, y)) for f in range(1, 7)])

    # ── l'échelle des probabilités ──────────────────────────────────────────

    X0, X1, YE = -5.0, 3.2, -0.6

    def x_de(self, p):
        return self.X0 + (self.X1 - self.X0) * p

    def echelle(self):
        barre = Line(P(self.X0, self.YE), P(self.X1, self.YE), stroke_width=12)
        barre.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])
        bouts = VGroup(*[Line(P(x, self.YE - 0.22), P(x, self.YE + 0.22), stroke_width=5)
                         for x in (self.X0, self.X1)])
        return VGroup(barre, bouts)

    def borne(self, p, texte_nb, mot, couleur):
        nb = self.t(texte_nb, 52, JAUNE_TITRE).next_to(P(self.x_de(p), self.YE), DOWN, buff=0.35)
        m = self.t(mot, 32, couleur).next_to(nb, DOWN, buff=0.15)
        return nb, m

    def pointe(self, tag, p, couleur, haut=1.1):
        """Une étiquette posée au-dessus de l'échelle, avec sa flèche vers le point p."""
        x = self.x_de(p)
        tag.move_to(P(x, self.YE + haut + tag.height / 2))
        tag.shift(RIGHT * max(0, (self.X0 - 0.4) - tag.get_left()[0]))
        fl = Arrow(P(x, self.YE + haut), P(x, self.YE + 0.1), buff=0.04, color=couleur, stroke_width=5,
                   max_tip_length_to_length_ratio=0.3)
        return fl

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le vocabulaire des probabilités", 52, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.5))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        d = de_qui_roule(P(-0.6, 0.85), 1.3)
        self.add(d)
        self.au_mot("Quand peut-on")
        q = self.t("Quand peut-on parler de hasard ?", 44, BLEU_CALCUL).move_to(P(-0.6, -0.75))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.play(q[-7:-1].animate.set_color(VERT_OK), run_time=0.4)
        self.insister(q[-7:-1], 0.4)
        self.attendre_voix(marge=1.2)
        d.clear_updaters()

    # ── 01 : les petits chevaux ─────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Qui commence ?")
        plat, pions, chemin = plateau_chevaux(4.0)
        plat.move_to(P(-3.9, 0.85))
        decal = plat[0].get_center()
        chemin = [p + decal for p in chemin]
        self.au_mot("Avant une partie")
        self.play(FadeIn(plat, scale=0.9), run_time=0.8)
        self.au_mot("on lance un dé")
        roule = de_qui_roule(P(1.4, 1.2), 1.6, periode=0.16)
        self.add(roule)
        self.au_mot("Personne ne sait")
        q = self.t("?", 120, ORANGE_RETENUE).move_to(P(3.6, 1.2))
        self.play(FadeIn(q, scale=0.5), run_time=0.5)
        self.insister(q, 0.4)
        self.au_mot("Mais on sait")
        rangee = self.rangee_de_des(-2.15, 0.9, 1.3, -0.9)
        for ex, d in zip(["1, 2", "2, 3", "3, 4", "4, 5", "5 ou", "ou 6"], rangee):
            self.au_mot(ex)
            self.play(FadeIn(d, shift=UP * 0.3, scale=0.6), run_time=0.3)
        roule.clear_updaters()
        self.remove(roule)
        fini = de(6, 1.6).move_to(P(1.4, 1.2))
        self.add(fini)
        self.play(FadeOut(q), Indicate(rangee[5], color=JAUNE_TITRE), run_time=0.5)
        rouge = pions[0]
        for p in chemin[:3]:
            self.play(rouge.animate.move_to(p), run_time=0.3)
        self.attendre_voix()

    # ── 02 : expérience aléatoire ───────────────────────────────────────────

    def ecran_experience(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-experience")
        self.titre_ecran("Une expérience aléatoire")
        self.au_mot("dont on connaît")
        l1 = self.ligne([("on connaît", WHITE), ("tous les résultats possibles,", VERT_OK)], 34, 0.2)
        l1.move_to(P(-0.6, 2.35))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("sans savoir lequel")
        l2 = self.ligne([("sans savoir", WHITE), ("lequel va sortir.", ORANGE_RETENUE)], 34, 0.2)
        l2.move_to(P(-0.6, 1.75))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.6)

        xs = [-5.3, -2.4, 0.5, 3.4]
        y = -0.45
        cadres = [RoundedRectangle(width=2.45, height=2.3, corner_radius=0.18, stroke_color=BLEU_CALCUL,
                                   stroke_width=3, fill_color="#0F172A", fill_opacity=0.6).move_to(P(x, y))
                  for x in xs]
        noms = ["lancer un dé", "tirer une carte", "pile ou face", "mesurer une table"]
        lbls = [self.t(n, 26, JAUNE_TITRE).next_to(c, DOWN, buff=0.18) for n, c in zip(noms, cadres)]

        self.au_mot("Lancer un dé")
        dv = de_qui_roule(P(xs[0], y), 1.1)
        self.play(FadeIn(cadres[0]), FadeIn(lbls[0]), run_time=0.4)
        self.add(dv)

        self.au_mot("tirer une carte")
        dos = dos_de_carte(0.95, 1.35).move_to(P(xs[1], y))
        face = carte("D", "♥", CARTE_ROUGE, 0.95, 1.35, 24).move_to(P(xs[1], y))
        self.play(FadeIn(cadres[1]), FadeIn(lbls[1]), FadeIn(dos, shift=DOWN * 0.3), run_time=0.4)
        self.play(dos.animate.stretch(0.02, 0), run_time=0.25)
        face.stretch(0.02, 0)
        self.remove(dos)
        self.add(face)
        self.play(face.animate.stretch(50, 0), run_time=0.25)

        self.au_mot("jouer à pile ou face")
        pc = piece_qui_tourne(P(xs[2], y), 0.7)
        self.play(FadeIn(cadres[2]), FadeIn(lbls[2]), run_time=0.4)
        self.add(pc)

        self.au_mot("Mesurer la longueur")
        tb = table_mesuree(1.0).move_to(P(xs[3], y - 0.1))
        self.play(FadeIn(cadres[3]), FadeIn(lbls[3]), FadeIn(tb), run_time=0.5)
        self.au_mot("ce n'est pas aléatoire")
        croix = VGroup(Line(cadres[3].get_corner(UL), cadres[3].get_corner(DR)),
                       Line(cadres[3].get_corner(UR), cadres[3].get_corner(DL))).set_stroke(ROUGE_ERREUR, 7)
        self.play(Create(croix), run_time=0.5)
        self.au_mot("ne dépend pas du hasard")
        pas = self.t("pas de hasard", 28, ROUGE_ERREUR).next_to(lbls[3], DOWN, buff=0.15)
        self.play(FadeIn(pas, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()
        dv.clear_updaters()
        pc.clear_updaters()

    # ── 03 : les issues ─────────────────────────────────────────────────────

    def ecran_issue(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-issue")
        self.titre_ecran("Les issues")
        rangee = self.rangee_de_des(-0.6, 1.05, 1.5)
        for d in rangee:
            d.set_opacity(0.15)
        roule = de_qui_roule(P(-0.6, 1.1), 1.1, periode=0.18)
        self.add(roule)
        self.play(FadeIn(rangee), run_time=0.5)
        self.au_mot("s'appelle une issue")
        d1 = self.ligne([("une issue", VERT_OK), ("=", WHITE), ("un résultat possible", WHITE)], 42, 0.3)
        d1.move_to(P(-0.6, 2.2))
        self.play(FadeIn(d1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("il y a 6 issues")
        roule.clear_updaters()
        six = self.ligne([("6", JAUNE_TITRE), ("issues", VERT_OK)], 56, 0.25).move_to(P(-0.6, 1.1))
        self.play(FadeOut(roule), FadeIn(six, scale=0.7), run_time=0.5)
        self.insister(six[0], 0.35)
        noms = VGroup(*[self.t(str(f), 40, JAUNE_TITRE).next_to(d, DOWN, buff=0.3) for f, d in zip(range(1, 7), rangee)])
        for ex, d, n in zip(["1, 2", "2, 3", "3, 4", "4, 5", "5 et", "et 6"], rangee, noms):
            self.au_mot(ex)
            self.play(d.animate.set_opacity(1).scale(1.3), FadeIn(n, shift=UP * 0.15), run_time=0.3)
            self.play(d.animate.scale(1 / 1.3), run_time=0.2)
        acc = Brace(VGroup(rangee, noms), DOWN, color=VERT_OK)
        self.play(GrowFromCenter(acc), Indicate(six, color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 04 : l'événement ────────────────────────────────────────────────────

    def ecran_evenement(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-evenement")
        self.titre_ecran("Un événement")
        self.au_mot("une phrase")
        d1 = self.ligne([("un événement", BLEU_CALCUL), ("=", WHITE), ("une phrase", WHITE)], 40, 0.3)
        d1.move_to(P(-0.6, 2.3))
        self.play(FadeIn(d1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("vraie ou fausse")
        d2 = self.ligne([("vraie", VERT_OK), ("ou", WHITE), ("fausse", ROUGE_ERREUR), ("après l'expérience", WHITE)],
                        34, 0.2).move_to(P(-0.6, 1.65))
        self.play(FadeIn(d2, shift=UP * 0.15), run_time=0.5)
        rangee = self.rangee_de_des(0.2, 1.05, 1.5)
        self.play(LaggedStart(*[FadeIn(d, shift=UP * 0.2) for d in rangee], lag_ratio=0.1), run_time=0.7)
        self.au_mot("Obtenir un nombre pair")
        ev = self.etiquette("Obtenir un nombre pair", BLEU_CALCUL, 34).move_to(P(-0.6, -1.4))
        self.play(GrowFromCenter(ev), run_time=0.5)
        self.play(*[rangee[i].animate.set_opacity(0.3) for i in (0, 2, 4)], run_time=0.4)
        cadres = []
        for ex, i in zip(["par 2", "4 et", "et 6"], (1, 3, 5)):
            self.au_mot(ex)
            c = SurroundingRectangle(rangee[i], color=VERT_OK, buff=0.12, stroke_width=5)
            fl = Arrow(ev.get_top(), rangee[i].get_bottom(), buff=0.18, color=VERT_OK, stroke_width=4,
                       max_tip_length_to_length_ratio=0.15)
            self.play(Create(c), GrowArrow(fl), rangee[i].animate.scale(1.25), run_time=0.35)
            self.play(rangee[i].animate.scale(1 / 1.25), run_time=0.25)
            cadres.append(c)
        res = self.ligne([("réalisé par", WHITE), ("2, 4 et 6", VERT_OK)], 34, 0.2).move_to(P(-0.6, -2.4))
        self.play(FadeIn(res, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 05 : certain, impossible : L'ÉCHELLE ────────────────────────────────

    def ecran_certain_impossible(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-certain-impossible")
        self.titre_ecran("Certain ou impossible ?")
        ech = self.echelle()
        self.play(Create(ech), run_time=0.8)

        self.au_mot("plus petit que 7")
        t1 = self.etiquette("plus petit que 7", VERT_OK, 30).move_to(P(-0.9, 2.2))
        des = VGroup(*[de(f, 0.42) for f in range(1, 7)]).arrange(RIGHT, buff=0.1).next_to(t1, DOWN, buff=0.15)
        self.play(GrowFromCenter(t1), run_time=0.5)
        self.au_mot("toujours vrai")
        self.play(LaggedStart(*[FadeIn(d, scale=0.5) for d in des], lag_ratio=0.1), run_time=0.6)
        cert = SurroundingRectangle(des, color=VERT_OK, buff=0.08)
        self.play(Create(cert), run_time=0.3)
        self.au_mot("événement certain")
        bloc1 = VGroup(t1, des, cert)
        fl1 = Arrow(P(self.X1, self.YE + 1.0), P(self.X1, self.YE + 0.1), buff=0.04, color=VERT_OK,
                    stroke_width=5, max_tip_length_to_length_ratio=0.3)
        self.play(bloc1.animate.move_to(P(self.X1, self.YE + 1.0 + bloc1.height / 2 + 0.1)), run_time=0.8)
        self.play(GrowArrow(fl1), run_time=0.3)
        nb1, m1 = self.borne(1, "1", "certain", VERT_OK)
        self.play(FadeIn(m1, shift=UP * 0.15), run_time=0.3)
        self.au_mot("de probabilité 1")
        self.play(FadeIn(nb1, scale=0.5), run_time=0.3)
        self.insister(nb1, 0.35)

        self.au_mot("Obtenir 8")
        t0 = self.etiquette("obtenir 8", ROUGE_ERREUR, 30).move_to(P(-0.9, 2.2))
        self.play(GrowFromCenter(t0), run_time=0.5)
        self.au_mot("c'est jamais")
        jamais = self.t("jamais !", 32, ROUGE_ERREUR).next_to(t0, DOWN, buff=0.2)
        self.play(FadeIn(jamais, scale=0.6), run_time=0.3)
        self.au_mot("événement impossible")
        bloc0 = VGroup(t0, jamais)
        fl0 = Arrow(P(self.X0, self.YE + 1.0), P(self.X0, self.YE + 0.1), buff=0.04, color=ROUGE_ERREUR,
                    stroke_width=5, max_tip_length_to_length_ratio=0.3)
        self.play(bloc0.animate.move_to(P(self.X0 + 0.55, self.YE + 1.0 + bloc0.height / 2 + 0.1)), run_time=0.8)
        self.play(GrowArrow(fl0), run_time=0.3)
        nb0, m0 = self.borne(0, "0", "impossible", ROUGE_ERREUR)
        m0.shift(RIGHT * max(0, -6.6 - m0.get_left()[0]))
        self.play(FadeIn(m0, shift=UP * 0.15), run_time=0.3)
        self.au_mot("de probabilité 0")
        self.play(FadeIn(nb0, scale=0.5), run_time=0.3)
        self.insister(nb0, 0.35)

        self.au_mot("toujours entre 0 et 1")
        ch = self.chute("Une probabilité est toujours entre 0 et 1.", color=BLEU_CALCUL, font_size=36)
        self.play(Write(ch), Indicate(ech[0], color=WHITE, scale_factor=1.05), run_time=1.0)
        self.attendre_voix()

    # ── 06 : le piège du loto ───────────────────────────────────────────────

    def boules_loto(self, centre):
        nums = [7, 23, 41, 12, 36, 5, 49, 18]
        couleurs = [JAUNE_TITRE, BLEU_CALCUL, VERT_OK, ORANGE_RETENUE]
        g = VGroup()
        for k, n in enumerate(nums):
            b = Circle(radius=0.2, fill_color=couleurs[k % 4], fill_opacity=1, stroke_color=WHITE, stroke_width=2)
            g.add(VGroup(b, Text(str(n), font_size=18, color=BLACK, weight=BOLD).move_to(b)))
        bocal = Circle(radius=0.85, stroke_color=WHITE, stroke_width=3, fill_color="#E0F2FE", fill_opacity=0.08)
        bocal.move_to(centre)
        horloge = {"t": 0.0}

        def tourne(m, dt):
            horloge["t"] += dt
            tt = horloge["t"]
            for k, b in enumerate(m):
                v = [2.6, -3.1, 3.7, -2.2, 3.3, -3.9, 2.9, -2.6][k]  # pas proportionnel à k
                a = tt * v + [0.0, 2.3, 4.1, 1.2, 5.5, 3.1, 0.7, 4.8][k]
                r = 0.45 + 0.15 * math.sin(tt * (2.0 + 0.5 * abs(v)) + k)
                b.move_to(centre + P(r * math.cos(a), r * math.sin(a)))

        g.add_updater(tourne)
        return bocal, g

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        ech = self.echelle()
        nb0, m0 = self.borne(0, "0", "impossible", ROUGE_ERREUR)
        m0.shift(RIGHT * max(0, -6.6 - m0.get_left()[0]))
        nb1, m1 = self.borne(1, "1", "certain", VERT_OK)
        self.add(ech, nb0, m0, nb1, m1)
        self.au_mot("peu probable ne veut pas dire impossible")
        regle = self.ligne([("peu probable", ORANGE_RETENUE), ("≠", WHITE), ("impossible", ROUGE_ERREUR)], 44, 0.35)
        regle.move_to(P(-0.6, 2.4))
        self.play(FadeIn(regle, shift=UP * 0.15), run_time=0.6)
        self.insister(regle[1], 0.35)

        self.au_mot("Gagner au loto")
        bocal, boules = self.boules_loto(P(3.6, 0.85))
        self.play(FadeIn(bocal), FadeIn(boules), run_time=0.4)
        tag = self.etiquette("gagner au loto", JAUNE_TITRE, 28)
        curseur = Triangle(fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).scale(0.16).rotate(PI)
        p = ValueTracker(0.75)

        def place_curseur(m):
            m.move_to(P(self.x_de(p.get_value()), self.YE + 0.33))

        def place_tag(m):
            m.next_to(curseur, UP, buff=0.12)
            m.shift(RIGHT * max(0, (self.X0 - 0.6) - m.get_left()[0]))

        curseur.add_updater(place_curseur)
        tag.add_updater(place_tag)
        place_curseur(curseur)
        place_tag(tag)
        self.play(FadeIn(curseur), FadeIn(tag), run_time=0.4)
        self.play(p.animate.set_value(0.012), run_time=2.2, rate_func=rate_functions.ease_out_cubic)
        curseur.clear_updaters()
        tag.clear_updaters()

        self.au_mot("très peu probable")
        tp = self.t("très peu probable", 32, ORANGE_RETENUE).move_to(P(-1.6, 1.15))
        self.play(FadeIn(tp, shift=LEFT * 0.2), run_time=0.4)
        # la loupe : l'écart entre le curseur et 0 grandit, puis revient
        loupe = VGroup(curseur, tag)
        self.play(loupe.animate.scale(1.5, about_point=P(self.X0, self.YE)), run_time=0.5)
        self.play(loupe.animate.scale(1 / 1.5, about_point=P(self.X0, self.YE)), run_time=0.5)

        self.au_mot("pas impossible")
        pas0 = self.ligne([("pas", VERT_OK), ("0", JAUNE_TITRE), ("!", VERT_OK)], 40, 0.15)
        pas0.move_to(P(-1.6, -1.55))
        self.play(FadeIn(pas0, scale=0.6), run_time=0.4)
        self.insister(pas0, 0.35)
        self.attendre_voix()
        boules.clear_updaters()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def eventail(self):
        cartes, rouges, valeurs = jeu_de_32(P(-0.6, -1.55), 2.9)
        return cartes, rouges, valeurs

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("On tire une carte")
        cartes, _, _ = self.eventail()
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.3) for c in cartes], lag_ratio=0.05), run_time=1.6)
        self.au_mot("32 cartes")
        lbl = self.ligne([("un jeu de", WHITE), ("32", JAUNE_TITRE), ("cartes", WHITE)], 34, 0.2).move_to(P(-0.6, 2.45))
        self.play(FadeIn(lbl, shift=DOWN * 0.15), run_time=0.4)
        self.insister(lbl[1], 0.3)
        self.au_mot("Tirer une carte rouge")
        q1 = self.ligne([("1. Une carte", WHITE), ("rouge", CARTE_ROUGE), (": certain, possible ou impossible ?", WHITE)],
                        32, 0.15).move_to(P(-0.6, -1.6))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Et tirer un 2")
        q2 = self.ligne([("2. Tirer un", WHITE), ("2", JAUNE_TITRE), ("?", WHITE)], 32, 0.15)
        q2.next_to(q1, DOWN, buff=0.3).align_to(q1, LEFT)
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        cartes, rouges, valeurs = self.eventail()
        self.add(cartes)
        self.au_mot("Une carte rouge : possible")
        r1 = self.ligne([("1. Une carte rouge :", WHITE), ("possible", VERT_OK)], 34, 0.2).move_to(P(-1.2, -1.6))
        anims = []
        for c, rg in zip(cartes, rouges):
            if rg:
                anims.append(c[0].animate.set_stroke(JAUNE_TITRE, 5))
            else:
                anims.append(c.animate.set_opacity(0.3))
        self.play(*anims, FadeIn(r1, shift=UP * 0.15), run_time=0.7)
        rouges_g = VGroup(*[c for c, rg in zip(cartes, rouges) if rg])
        self.play(rouges_g.animate.shift(UP * 0.15), run_time=0.3)
        self.au_mot("16 sur 32")
        f = self.fraction(16, 32, 36, JAUNE_TITRE).next_to(r1, RIGHT, buff=0.5)
        self.play(FadeIn(f, shift=UP * 0.15), run_time=0.4)
        self.insister(f, 0.35)
        self.au_mot("Un 2 : impossible")
        self.play(rouges_g.animate.shift(DOWN * 0.15),
                  *[c.animate.set_opacity(1) for c, rg in zip(cartes, rouges) if not rg],
                  *[c[0].animate.set_stroke(GREY_B, 2) for c, rg in zip(cartes, rouges) if rg], run_time=0.4)
        deux = carte("2", "♠", CARTE_NOIRE, 0.8, 1.15).move_to(P(4.3, 1.0))
        self.play(FadeIn(deux, shift=LEFT * 0.3), run_time=0.4)
        self.play(Create(self.barrer(deux, sw=8)), run_time=0.4)
        r2 = self.ligne([("2. Un", WHITE), ("2", JAUNE_TITRE), (":", WHITE), ("impossible", ROUGE_ERREUR)], 34, 0.15)
        r2.next_to(r1, DOWN, buff=0.45).align_to(r1, LEFT)
        self.play(FadeIn(r2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("commence au 7")
        septs = [c for c, v in zip(cartes, valeurs) if v == "7"]
        sept = self.ligne([("le jeu commence au", WHITE), ("7", JAUNE_TITRE)], 28, 0.15).next_to(r2, RIGHT, buff=0.4)
        self.play(FadeIn(sept), *[Indicate(c, color=JAUNE_TITRE, scale_factor=1.25) for c in septs], run_time=0.7)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Une expérience aléatoire", "Aléatoire : issues connues, résultat imprévisible"),
            ("Un événement est réalisé", "Un événement : réalisé par certaines issues"),
            ("Certain, c'est 1", "Certain : probabilité 1"),
            ("impossible, c'est 0", "Impossible : probabilité 0"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 38)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 10.0:
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.6))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : compter les issues", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_experience()
        self.ecran_issue()
        self.ecran_evenement()
        self.ecran_certain_impossible()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
