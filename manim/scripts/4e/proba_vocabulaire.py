# proba_vocabulaire.py
# EleveAI — Maths 4e — série « Probabilités », épisode 1 : le vocabulaire
# (micro : proba_vocabulaire), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Short jumeau : proba_vocabulaire_short.py (ceinture blanche, « hasard ou pas ? »).
#
# Écrans : 00 garde · 01 le badminton (filet, raquettes, la pièce qui tourne,
# pile / face) · 02 expérience aléatoire (pièce, dé, ticket de tombola ; le lever
# du soleil barré) · 03 les issues (2 pour la pièce, 6 pour le dé) · 04
# l'événement « plus grand que 4 » (5 et 6 s'allument) · 05 impossible / possible
# / certain sur la barre · 06 le piège de la tombola (rare ≠ impossible) · 07
# défi du sac (3 rouges, 2 bleues) · 07b correction · 08 ce que tu as appris ·
# 09 abonnement.
#
# Code des dessins repris de la 3e (proba_vocabulaire.py) et de la bande-annonce
# (annonce_probabilites.py) ; textes propres à la 4e.
#
# Voix : manim/voix/4e-proba-vocabulaire.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_vocabulaire.py ProbaVocabulaire4e -o eleveai-maths-4e-proba-vocabulaire --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/01-vocabulaire/.

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
from annonce_probabilites import bille, de, de_qui_roule, piece_qui_tourne, sac_vide  # noqa: E402

BILLE_ROUGE = "#DC2626"
BILLE_BLEUE = "#2563EB"
BILLE_VERTE = "#16A34A"
GRIS_ETEINT = "#6B7280"
TICKET = "#FDBA74"


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins (paysage et short) ──────────────────────────────────────────

def piece_fixe(cote, r=0.7):
    """La pièce posée, sur PILE ou sur FACE (mêmes couleurs que la pièce qui tourne)."""
    disque = Circle(radius=r, fill_color=JAUNE_TITRE if cote == "P" else ORANGE_RETENUE, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=3)
    mot = Text("PILE" if cote == "P" else "FACE", font_size=int(r * 34), color=BLACK, weight=BOLD)
    return VGroup(disque, mot.move_to(disque))


def raquette(couleur, s=1.0):
    """Une raquette de badminton : tamis ovale cordé, tige, manche."""
    tamis = Ellipse(width=0.8, height=1.05, stroke_color=couleur, stroke_width=5).move_to(P(0, 0.55))
    cordes = VGroup(*[Line(P(x, 0.55 - 0.5 * math.sqrt(max(0, 1 - (x / 0.4) ** 2))),
                           P(x, 0.55 + 0.5 * math.sqrt(max(0, 1 - (x / 0.4) ** 2))))
                      for x in (-0.24, -0.12, 0.0, 0.12, 0.24)]
                    + [Line(P(-0.38 * math.sqrt(max(0, 1 - ((y - 0.55) / 0.52) ** 2)), y),
                            P(0.38 * math.sqrt(max(0, 1 - ((y - 0.55) / 0.52) ** 2)), y))
                       for y in (0.25, 0.4, 0.55, 0.7, 0.85)]).set_stroke(WHITE, 1, 0.7)
    tige = Line(P(0, 0.02), P(0, -0.55), color=GREY_B, stroke_width=4)
    manche = RoundedRectangle(width=0.14, height=0.5, corner_radius=0.05, fill_color=couleur,
                              fill_opacity=1, stroke_width=0).move_to(P(0, -0.8))
    return VGroup(cordes, tamis, tige, manche).scale(s)


def volant(s=1.0):
    """Un volant : la jupe de plumes (trapèze blanc) et le bouchon rond."""
    jupe = Polygon(P(-0.12, 0), P(0.12, 0), P(0.28, 0.45), P(-0.28, 0.45),
                   fill_color=WHITE, fill_opacity=0.95, stroke_color=GREY_B, stroke_width=1.5)
    traits = VGroup(*[Line(P(0.06 * k, 0.02), P(0.14 * k, 0.43)) for k in (-1, 0, 1)]).set_stroke(GREY_B, 1)
    bouchon = Circle(radius=0.13, fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.06))
    return VGroup(jupe, traits, bouchon).scale(s)


def filet(larg=0.15, haut=1.4):
    """Le filet de badminton vu de côté : deux poteaux et le filet quadrillé."""
    poteau = Line(P(0, -haut), P(0, haut * 0.55), color=GREY_B, stroke_width=6)
    bande = Rectangle(width=0.08, height=haut * 0.55, fill_color=WHITE, fill_opacity=0.15,
                      stroke_color=WHITE, stroke_width=2).move_to(P(0, haut * 0.27))
    sol = Line(P(-3.2, -haut), P(3.2, -haut), color="#16A34A", stroke_width=6)
    return VGroup(sol, poteau, bande)


def soleil(r=0.45):
    disque = Circle(radius=r, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(math.cos(a) * r * 1.25, math.sin(a) * r * 1.25),
                           P(math.cos(a) * r * 1.6, math.sin(a) * r * 1.6))
                      for a in np.linspace(0, TAU, 12, endpoint=False)]).set_stroke(JAUNE_TITRE, 4)
    return VGroup(disque, rayons)


def ticket(texte="", w=0.62, h=0.34, couleur=TICKET):
    corps = RoundedRectangle(width=w, height=h, corner_radius=0.04, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=1.5)
    pointilles = DashedLine(P(-w / 2 + 0.15, -h / 2), P(-w / 2 + 0.15, h / 2), dash_length=0.04,
                            color=BLACK, stroke_width=1.2)
    g = VGroup(corps, pointilles)
    if texte:
        lbl = Text(texte, font_size=int(h * 40), color=BLACK, weight=BOLD)
        lbl.scale_to_fit_width(min(lbl.width, w - 0.35)).move_to(corps).shift(RIGHT * 0.07)
        g.add(lbl)
    return g


def tambour(centre, r=0.85, n=7):
    """Le tambour de la tombola qui tourne (rayons), les tickets brassés dedans.
    Renvoie (cage, tickets) ; les deux portent un updater."""
    cercle = Circle(radius=r, stroke_color=WHITE, stroke_width=4, fill_color="#E0F2FE",
                    fill_opacity=0.06).move_to(centre)
    rayons = VGroup(*[Line(centre, centre + P(r * math.cos(a), r * math.sin(a)))
                      for a in np.linspace(0, TAU, 6, endpoint=False)]).set_stroke(GREY_B, 2)
    pied = Polygon(centre + P(-0.15, -r * 0.9), centre + P(0.15, -r * 0.9),
                   centre + P(0.55, -r - 0.35), centre + P(-0.55, -r - 0.35),
                   fill_color=GREY_D, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    rayons.add_updater(lambda m, dt: m.rotate(-2.4 * dt, about_point=centre))
    tickets = VGroup(*[ticket("", 0.42, 0.22, [TICKET, "#FDE68A", "#A7F3D0", "#BFDBFE"][k % 4])
                       for k in range(n)])
    horloge = {"t": 0.0}
    vit = [2.6, -3.1, 3.7, -2.2, 3.3, -3.9, 2.9]
    ph = [0.0, 2.3, 4.1, 1.2, 5.5, 3.1, 0.7]

    def brasse(m, dt):
        horloge["t"] += dt
        tt = horloge["t"]
        for k, b in enumerate(m):
            a = tt * vit[k % 7] + ph[k % 7]
            rr = r * (0.45 + 0.15 * math.sin(tt * 2.7 + k))
            b.move_to(centre + P(rr * math.cos(a), rr * math.sin(a)))

    tickets.add_updater(brasse)
    return VGroup(pied, cercle, rayons), tickets


class ProbaVocabulaire4e(Notion4e):
    nom_voix = "4e-proba-vocabulaire"

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

    # ── la barre impossible → certain ───────────────────────────────────────

    X0, X1, YE = -5.0, 3.2, -0.9

    def x_de(self, p):
        return self.X0 + (self.X1 - self.X0) * p

    def barre(self):
        b = Line(P(self.X0, self.YE), P(self.X1, self.YE), stroke_width=12)
        b.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])  # rendu : rouge à gauche, vert à droite
        bouts = VGroup(*[Line(P(x, self.YE - 0.22), P(x, self.YE + 0.22), stroke_width=5)
                         for x in (self.X0, self.X1)])
        return VGroup(b, bouts)

    def mots_barre(self):
        m0 = self.t("impossible", 32, ROUGE_ERREUR).next_to(P(self.X0, self.YE), DOWN, buff=0.35)
        m0.shift(RIGHT * max(0, -6.6 - m0.get_left()[0]))
        mp = self.t("possible", 32, ORANGE_RETENUE).next_to(P(self.x_de(0.5), self.YE), DOWN, buff=0.35)
        m1 = self.t("certain", 32, VERT_OK).next_to(P(self.X1, self.YE), DOWN, buff=0.35)
        return m0, mp, m1

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le vocabulaire des probabilités", 52, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        pc = piece_qui_tourne(P(-3.2, 0.75), 0.75)
        d = de_qui_roule(P(2.0, 0.75), 1.3)
        self.add(pc, d)
        self.au_mot("Le hasard")
        h = self.t("le hasard", 48, BLEU_CALCUL).move_to(P(-0.6, 0.75))
        self.play(FadeIn(h, scale=0.7), run_time=0.5)
        self.au_mot("des mots précis")
        mots = VGroup(self.etiquette("expérience aléatoire", BLEU_CALCUL, 26),
                      self.etiquette("issue", VERT_OK, 26),
                      self.etiquette("événement", JAUNE_TITRE, 26)).arrange(RIGHT, buff=0.4)
        mots.move_to(P(-0.6, -1.0))
        self.play(LaggedStart(*[GrowFromCenter(m) for m in mots], lag_ratio=0.3), run_time=1.0)
        self.attendre_voix(marge=1.0)
        pc.clear_updaters()
        d.clear_updaters()

    # ── 01 : le badminton ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Qui sert en premier ?")
        self.au_mot("Au badminton")
        fil = filet(0.15, 1.9).move_to(P(-3.6, 0.2))
        r1 = raquette(BLEU_CALCUL, 1.45).rotate(0.4).move_to(P(-5.6, 0.4))
        r2 = raquette(ROUGE_ERREUR, 1.45).rotate(-0.4).move_to(P(-1.6, 0.4))
        vo = volant(1.2).rotate(-0.6).move_to(P(-4.4, 2.0))
        self.play(FadeIn(fil), FadeIn(r1, shift=RIGHT * 0.3), FadeIn(r2, shift=LEFT * 0.3), run_time=0.7)
        self.play(FadeIn(vo, scale=0.5), run_time=0.3)
        self.au_mot("pile ou face")
        pc = piece_qui_tourne(P(2.4, 1.1), 0.85)
        self.add(pc)
        lbl = self.t("pile ou face", 34, JAUNE_TITRE).move_to(P(2.4, -0.25))
        self.play(FadeIn(lbl), r1.animate.rotate(-0.25), r2.animate.rotate(0.25), run_time=0.5)
        self.au_mot("Personne ne sait")
        q = self.t("?", 110, ORANGE_RETENUE).move_to(P(4.6, 1.1))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.insister(q, 0.35)
        self.au_mot("Mais tout le monde sait")
        pp = piece_fixe("P", 0.6).move_to(P(1.2, -1.75))
        pf = piece_fixe("F", 0.6).move_to(P(3.6, -1.75))
        self.au_mot("pile, ou face")
        self.play(FadeIn(pp, shift=UP * 0.3), run_time=0.35)
        ou = self.t("ou", 32).move_to(P(2.4, -1.75))
        self.play(FadeIn(ou), FadeIn(pf, shift=UP * 0.3), run_time=0.35)
        self.play(FadeOut(q), run_time=0.3)
        self.insister(VGroup(pp, ou, pf), 0.35)
        self.attendre_voix()
        pc.clear_updaters()

    # ── 02 : expérience aléatoire ───────────────────────────────────────────

    def ecran_experience(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-experience")
        self.titre_ecran("Une expérience aléatoire")
        self.au_mot("dont on connaît")
        l1 = self.ligne([("on connaît", WHITE), ("les résultats possibles,", VERT_OK)], 34, 0.2)
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
        noms = ["lancer une pièce", "lancer un dé", "tirer un ticket", "lever du soleil"]
        lbls = [self.t(n, 26, JAUNE_TITRE).next_to(c, DOWN, buff=0.18) for n, c in zip(noms, cadres)]

        self.au_mot("Lancer une pièce")
        pc = piece_qui_tourne(P(xs[0], y), 0.7)
        self.play(FadeIn(cadres[0]), FadeIn(lbls[0]), run_time=0.4)
        self.add(pc)

        self.au_mot("lancer un dé")
        dv = de_qui_roule(P(xs[1], y), 1.1)
        self.play(FadeIn(cadres[1]), FadeIn(lbls[1]), run_time=0.4)
        self.add(dv)

        self.au_mot("tirer un ticket")
        cage, tks = tambour(P(xs[2], y + 0.2), 0.7, 6)
        self.play(FadeIn(cadres[2]), FadeIn(lbls[2]), FadeIn(cage), FadeIn(tks), run_time=0.4)

        self.au_mot("L'heure du lever")
        c3 = cadres[3]
        sol = Rectangle(width=2.35, height=0.75, fill_color="#14532D", fill_opacity=1, stroke_width=0)
        sol.move_to(c3.get_bottom() + UP * 0.43)
        sol.set_z_index(2)
        sl = soleil(0.35).move_to(sol.get_top() + DOWN * 0.3)
        sl.set_z_index(1)
        self.play(FadeIn(c3), FadeIn(lbls[3]), FadeIn(sol), run_time=0.4)
        self.add(sl)
        self.play(sl.animate.shift(UP * 0.95), run_time=1.4, rate_func=rate_functions.ease_out_sine)

        self.au_mot("ce n'est pas du hasard")
        croix = VGroup(Line(c3.get_corner(UL), c3.get_corner(DR)),
                       Line(c3.get_corner(UR), c3.get_corner(DL))).set_stroke(ROUGE_ERREUR, 7).set_z_index(3)
        self.play(Create(croix), run_time=0.5)
        pas = self.t("pas de hasard", 28, ROUGE_ERREUR).next_to(lbls[3], DOWN, buff=0.15)
        self.play(FadeIn(pas, shift=UP * 0.1), run_time=0.4)
        self.au_mot("on peut la connaître")
        av = self.t("connu à l'avance", 28, VERT_OK).next_to(pas, DOWN, buff=0.12)
        self.play(FadeIn(av, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()
        for m in (pc, dv, tks):
            m.clear_updaters()
        cage[2].clear_updaters()

    # ── 03 : les issues ─────────────────────────────────────────────────────

    def ecran_issue(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-issue")
        self.titre_ecran("Les issues")
        self.au_mot("s'appelle une issue")
        d1 = self.ligne([("une issue", VERT_OK), ("=", WHITE), ("un résultat possible", WHITE)], 42, 0.3)
        d1.move_to(P(-0.6, 2.25))
        self.play(FadeIn(d1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("À pile ou face")
        pc = piece_qui_tourne(P(-4.6, 0.6), 0.7)
        self.add(pc)
        self.wait(0.6)
        self.au_mot("il y a 2 issues")
        pc.clear_updaters()
        self.remove(pc)
        pp = piece_fixe("P", 0.62).move_to(P(-5.4, 0.6))
        pf = piece_fixe("F", 0.62).move_to(P(-3.8, 0.6))
        deux = self.ligne([("2", JAUNE_TITRE), ("issues", VERT_OK)], 46, 0.2).move_to(P(-4.6, -0.8))
        self.play(FadeIn(pp, scale=0.6), FadeIn(pf, scale=0.6), FadeIn(deux, scale=0.7), run_time=0.5)
        self.insister(deux[0], 0.35)
        self.au_mot("pile et face")
        self.play(Indicate(pp, color=WHITE), run_time=0.4)
        self.play(Indicate(pf, color=WHITE), run_time=0.4)
        self.au_mot("Avec un dé")
        rangee = VGroup(*[de(f, 0.72) for f in range(1, 7)]).arrange_in_grid(2, 3, buff=0.22)
        rangee.move_to(P(1.6, 0.6))
        self.play(LaggedStart(*[FadeIn(d, shift=UP * 0.25, scale=0.6) for d in rangee], lag_ratio=0.12),
                  run_time=1.0)
        self.au_mot("il y en a 6")
        six = self.ligne([("6", JAUNE_TITRE), ("issues", VERT_OK)], 46, 0.2).move_to(P(1.6, -0.8))
        self.play(FadeIn(six, scale=0.7), run_time=0.4)
        self.insister(six[0], 0.35)
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
        self.au_mot("Avec un dé")
        rangee = self.rangee_de_des(0.2, 1.05, 1.5)
        self.play(LaggedStart(*[FadeIn(d, shift=UP * 0.2) for d in rangee], lag_ratio=0.1), run_time=0.7)
        self.au_mot("obtenir un nombre plus grand que 4")
        ev = self.etiquette("Obtenir un nombre plus grand que 4", BLEU_CALCUL, 32).move_to(P(-0.6, -1.4))
        self.play(GrowFromCenter(ev), run_time=0.6)
        self.play(*[rangee[i].animate.set_opacity(0.3) for i in range(4)], run_time=0.4)
        self.au_mot("Il est réalisé")
        res = self.ligne([("réalisé par", WHITE), ("5", VERT_OK), ("et par", WHITE), ("6", VERT_OK)], 36, 0.2)
        res.move_to(P(-0.6, -2.45))
        self.play(FadeIn(res[0]), run_time=0.3)
        for ex, i, morceau in (("par 5", 4, res[1]), ("par 6", 5, res[3])):
            self.au_mot(ex)
            c = SurroundingRectangle(rangee[i], color=VERT_OK, buff=0.12, stroke_width=5)
            anims = [Create(c), rangee[i].animate.scale(1.3), FadeIn(morceau, scale=0.6)]
            if i == 5:
                anims.append(FadeIn(res[2]))
            self.play(*anims, run_time=0.35)
            self.play(rangee[i].animate.scale(1 / 1.3), run_time=0.25)
        self.attendre_voix()

    # ── 05 : certain, impossible, possible ──────────────────────────────────

    def ecran_certain_impossible(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-certain-impossible")
        self.titre_ecran("Certain, possible ou impossible ?")
        br = self.barre()
        m0, mp, m1 = self.mots_barre()
        self.play(Create(br), run_time=0.7)

        self.au_mot("Obtenir un nombre entre 1 et 6")
        t1 = self.etiquette("un nombre entre 1 et 6", VERT_OK, 32).move_to(P(1.2, 2.0))
        des = VGroup(*[de(f, 0.55) for f in range(1, 7)]).arrange(RIGHT, buff=0.12).next_to(t1, DOWN, buff=0.2)
        self.play(GrowFromCenter(t1), run_time=0.5)
        self.au_mot("ça arrive toujours")
        self.play(LaggedStart(*[FadeIn(d, scale=0.5) for d in des], lag_ratio=0.1), run_time=0.6)
        cert = SurroundingRectangle(des, color=VERT_OK, buff=0.08)
        tj = self.t("toujours !", 32, VERT_OK).next_to(cert, DOWN, buff=0.15)
        self.play(Create(cert), FadeIn(tj), run_time=0.4)
        self.au_mot("C'est un événement certain")
        bloc1 = VGroup(t1, des, cert, tj)
        cible1 = bloc1.copy().scale(0.85)
        cible1.move_to(P(self.X1 + 0.9 - cible1.width / 2, self.YE + 1.2 + cible1.height / 2))
        self.play(Transform(bloc1, cible1), run_time=0.8)
        fl1 = Arrow(P(self.X1, self.YE + 1.1), P(self.X1, self.YE + 0.1), buff=0.04, color=VERT_OK,
                    stroke_width=5, max_tip_length_to_length_ratio=0.3)
        self.play(GrowArrow(fl1), FadeIn(m1, shift=UP * 0.15), run_time=0.4)
        self.insister(m1, 0.3)

        self.au_mot("Obtenir 9")
        t0 = self.etiquette("obtenir 9", ROUGE_ERREUR, 32).move_to(P(-3.4, 2.0))
        self.play(GrowFromCenter(t0), run_time=0.5)
        self.au_mot("ça n'arrive jamais")
        jamais = self.t("jamais !", 32, ROUGE_ERREUR).next_to(t0, DOWN, buff=0.2)
        self.play(FadeIn(jamais, scale=0.6), run_time=0.3)
        self.au_mot("C'est un événement impossible")
        bloc0 = VGroup(t0, jamais)
        self.play(bloc0.animate.move_to(P(self.X0 + 0.55, self.YE + 1.2 + bloc0.height / 2)), run_time=0.8)
        fl0 = Arrow(P(self.X0, self.YE + 1.1), P(self.X0, self.YE + 0.1), buff=0.04, color=ROUGE_ERREUR,
                    stroke_width=5, max_tip_length_to_length_ratio=0.3)
        self.play(GrowArrow(fl0), FadeIn(m0, shift=UP * 0.15), run_time=0.4)
        self.insister(m0, 0.3)

        self.au_mot("Entre les deux")
        zone = Line(P(self.x_de(0.08), self.YE), P(self.x_de(0.92), self.YE), stroke_width=26,
                    color=ORANGE_RETENUE).set_opacity(0.55)
        self.play(Create(zone), FadeIn(mp, shift=UP * 0.15), run_time=0.7)
        self.insister(mp, 0.35)
        self.attendre_voix()

    # ── 06 : le piège de la tombola ─────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        br = self.barre()
        m0, mp, m1 = self.mots_barre()
        self.add(br, m0, m1)
        self.au_mot("rare ne veut pas dire impossible")
        regle = self.ligne([("rare", ORANGE_RETENUE), ("≠", WHITE), ("impossible", ROUGE_ERREUR)], 46, 0.35)
        regle.move_to(P(-2.4, 2.3))
        self.play(FadeIn(regle, shift=UP * 0.15), run_time=0.6)
        self.insister(regle[1], 0.35)

        self.au_mot("Gagner le gros lot")
        cage, tks = tambour(P(4.3, 1.3), 0.85, 7)
        self.play(FadeIn(cage), FadeIn(tks), run_time=0.4)
        tag = self.etiquette("gagner le gros lot", JAUNE_TITRE, 26)
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
        self.au_mot("c'est rare")
        self.play(p.animate.set_value(0.03), run_time=1.2, rate_func=rate_functions.ease_out_cubic)
        curseur.clear_updaters()
        tag.clear_updaters()
        rr = self.t("rare", 34, ORANGE_RETENUE).next_to(tag, UP, buff=0.2).align_to(tag, LEFT)
        self.play(FadeIn(rr, shift=DOWN * 0.1), run_time=0.3)
        loupe = VGroup(curseur, tag, rr)
        self.play(loupe.animate.scale(1.5, about_point=P(self.X0, self.YE)), run_time=0.35)
        self.play(loupe.animate.scale(1 / 1.5, about_point=P(self.X0, self.YE)), run_time=0.35)

        self.au_mot("Mais quelqu'un le gagne")
        gagnant = ticket("GAGNANT", 1.9, 0.62, JAUNE_TITRE).move_to(P(4.3, 1.3)).scale(0.3)
        self.add(gagnant)
        self.play(gagnant.animate.scale(1 / 0.3).move_to(P(1.4, 1.0)).rotate(0.12), run_time=0.6)
        self.play(Flash(gagnant, color=JAUNE_TITRE, line_length=0.35, flash_radius=1.1), run_time=0.5)
        pas0 = self.t("pas impossible !", 36, VERT_OK).move_to(P(1.4, 0.1))
        self.play(FadeIn(pas0, scale=0.6), run_time=0.4)
        self.attendre_voix()
        tks.clear_updaters()
        cage[2].clear_updaters()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def sac_rempli(self, centre):
        sac = sac_vide(2.6, 2.4).move_to(centre)
        bases = [P(-0.6, -0.65), P(0.0, -0.75), P(0.6, -0.65), P(-0.3, -0.1), P(0.3, -0.1)]
        couleurs = [BILLE_ROUGE, BILLE_ROUGE, BILLE_ROUGE, BILLE_BLEUE, BILLE_BLEUE]
        billes = VGroup(*[bille(c, 0.27).move_to(centre + b) for c, b in zip(couleurs, bases)])
        return sac, billes

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        c = P(-4.4, 0.3)
        sac, billes = self.sac_rempli(c)
        self.au_mot("Dans un sac")
        self.play(FadeIn(sac), run_time=0.4)
        self.au_mot("3 billes rouges")
        l1 = self.ligne([("3", JAUNE_TITRE), ("billes rouges", BILLE_ROUGE)], 38, 0.2).move_to(P(1.0, 2.0))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 1.5) for b in billes[:3]], lag_ratio=0.25),
                  FadeIn(l1), run_time=0.9)
        self.au_mot("2 billes bleues")
        l2 = self.ligne([("2", JAUNE_TITRE), ("billes bleues", BILLE_BLEUE)], 38, 0.2).move_to(P(1.0, 1.35))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 1.5) for b in billes[3:]], lag_ratio=0.25),
                  FadeIn(l2), run_time=0.7)
        self.au_mot("On en tire une")
        mystere = VGroup(Circle(radius=0.27, fill_color=WHITE, fill_opacity=1, stroke_color=WHITE),
                         Text("?", font_size=30, color=BLACK, weight=BOLD)).move_to(c + DOWN * 0.3)
        self.play(FadeIn(mystere, scale=0.5), run_time=0.3)
        self.play(mystere.animate.move_to(c + UP * 1.75), run_time=0.6)
        self.au_mot("Tirer une bille verte")
        q1 = self.ligne([("1. Une bille", WHITE), ("verte", BILLE_VERTE), (":", WHITE)], 34, 0.15)
        q1b = self.t("certain, possible ou impossible ?", 32, BLEU_CALCUL)
        q1.move_to(P(1.0, 0.3)).align_to(P(-1.6, 0), LEFT)
        q1b.next_to(q1, DOWN, buff=0.2).align_to(q1, LEFT).shift(RIGHT * 0.4)
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.4)
        self.play(FadeIn(q1b, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Tirer une bille rouge ou bleue")
        q2 = self.ligne([("2. Une bille", WHITE), ("rouge", BILLE_ROUGE), ("ou", WHITE), ("bleue", BILLE_BLEUE),
                         ("?", WHITE)], 34, 0.15)
        q2.next_to(q1b, DOWN, buff=0.4).align_to(q1, LEFT)
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        c = P(-4.4, 0.0)
        sac, billes = self.sac_rempli(c)
        self.add(sac, billes)
        self.au_mot("Une bille verte")
        verte = bille(BILLE_VERTE, 0.3).move_to(P(-1.4, 1.5))
        self.play(FadeIn(verte, scale=0.5), run_time=0.35)
        self.au_mot("impossible")
        self.play(Create(self.barrer(verte, sw=7)), run_time=0.35)
        r1 = self.ligne([("1. Verte :", WHITE), ("impossible", ROUGE_ERREUR)], 36, 0.2)
        r1.next_to(verte, RIGHT, buff=0.5)
        self.play(FadeIn(r1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("il n'y en a aucune")
        auc = self.t("aucune bille verte dans le sac", 28, GRIS_ETEINT).next_to(r1, DOWN, buff=0.15).align_to(r1, LEFT)
        self.play(FadeIn(auc), Indicate(sac, color=ROUGE_ERREUR, scale_factor=1.04), run_time=0.6)
        self.au_mot("Une bille rouge ou bleue")
        r2 = self.ligne([("2. Rouge ou bleue :", WHITE), ("certain", VERT_OK)], 36, 0.2)
        r2.move_to(P(0, -1.0)).align_to(verte, LEFT)
        self.au_mot("certain")
        self.play(FadeIn(r2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("toutes les billes")
        cad = VGroup(*[SurroundingRectangle(b, color=VERT_OK, buff=0.05, stroke_width=4) for b in billes])
        self.play(LaggedStart(*[Create(k) for k in cad], lag_ratio=0.15), run_time=0.8)
        self.insister(r2[1], 0.35)
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
            ("Il peut être certain", "Certain, possible ou impossible"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 36)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.8)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.6, 0.6))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : trouver toutes les issues", color=VERT_OK, font_size=36)))
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
