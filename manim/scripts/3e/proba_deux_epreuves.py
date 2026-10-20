# proba_deux_epreuves.py
# EleveAI — Maths 3e — Probabilités, épisode 7 : deux épreuves
# (micro : proba_deux_epreuve), AVEC VOIX. Paysage, ceinture VERTE.
#
# Les dessins : deux pièces qui tournent ; l'ARBRE qui se dessine branche par
# branche (1/2 sur chaque branche, les 4 chemins PP, PF, FP, FF) ; le chemin PP
# surligné et 1/2 × 1/2 = 1/4 ; le SAC (2 rouges, 3 bleues) avec remise (la
# bille ressort et rentre : 2/5 × 2/5 = 4/25) puis sans remise (elle reste
# dehors : 2/5 × 1/4 = 1/10) ; le TABLEAU 6 × 6 de deux dés, les 6 doubles en
# diagonale ; le piège 1/2 + 1/2 = 1 barré ; défi 6 perles jaunes, 4 noires
# sans remise : 6/10 × 5/9 = 30/90 = 1/3.
# Pièces : PILE en JAUNE, FACE en ORANGE (comme la bande-annonce).
#
# Voix : manim/voix/3e-proba-deux-epreuves.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/proba_deux_epreuves.py ProbaDeuxEpreuves3e -o eleveai-maths-3e-proba-deux-epreuves --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/07-deux-epreuves/.

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
from annonce_probabilites import BILLE_BLEUE, BILLE_ROUGE, bille, de, de_qui_roule, sac_vide  # noqa: E402

PILE_C = JAUNE_TITRE
FACE_C = ORANGE_RETENUE
PERLE_NOIRE = "#1F2937"


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins communs (paysage et short) ──────────────────────────────────

def piece_fixe(face, r=0.6, mot=True):
    """Une pièce posée : PILE (jaune) ou FACE (orange)."""
    pile = face == "P"
    disque = Circle(radius=r, fill_color=PILE_C if pile else FACE_C, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=3)
    if mot:
        txt = Text("PILE" if pile else "FACE", font_size=max(int(r * 34), 12), color=BLACK, weight=BOLD)
    else:
        txt = Text("P" if pile else "F", font_size=max(int(r * 60), 14), color=BLACK, weight=BOLD)
    return VGroup(disque, txt.move_to(disque))


def piece_tournante(ancre, r=0.6, vitesse=7.0, phase=0.0):
    """Une pièce qui tourne SANS FIN, sans lettres ; elle suit le point `ancre`
    (on peut donc la faire tomber en animant l'ancre)."""
    etat = {"t": phase}

    def faire(t):
        c = math.cos(t * vitesse)
        disque = Circle(radius=r, fill_color=PILE_C if c >= 0 else FACE_C, fill_opacity=1,
                        stroke_color=WHITE, stroke_width=3)
        anneau = Circle(radius=r * 0.7, stroke_color=WHITE, stroke_width=2, stroke_opacity=0.7)
        g = VGroup(disque, anneau)
        g.stretch(max(abs(c), 0.06), 0)
        return g.move_to(ancre.get_center())

    holder = faire(phase)

    # ⛔ 20/10 : `become` et non remove/add (l'ancien enfant restait dessiné sous le nouveau pendant un `play`).
    def maj(m, dt):
        etat["t"] += dt
        m.become(faire(etat["t"]))

    holder.add_updater(maj)
    return holder


def noeud(face, r=0.26):
    """Un nœud de l'arbre : une petite pièce marquée P ou F."""
    return piece_fixe(face, r, mot=False)


class Arbre:
    """L'arbre de deux lancers de pièce : racine, 2 nœuds, 4 nœuds, 6 branches.

    chemins (dans l'ordre) : PP, PF, FP, FF ; `self.b2[k]` est la 2e branche du
    chemin k, `self.b1[k // 2]` la 1re.
    """

    def __init__(self, racine, dx=2.8, dy1=1.6, dy2=0.8, r=0.26, fs=28, lab_fs=36, x_lab=1.0,
                 couleur1=BLEU_CALCUL, couleur2=VERT_OK, epaisseur=4):
        self.racine = racine
        self.p1 = [racine + P(dx, dy1), racine + P(dx, -dy1)]
        self.p2 = [self.p1[0] + P(dx, dy2), self.p1[0] + P(dx, -dy2),
                   self.p1[1] + P(dx, dy2), self.p1[1] + P(dx, -dy2)]
        self.rac = Dot(racine, radius=0.08)
        self.b1 = VGroup(*[Line(racine, p, stroke_width=epaisseur, color=couleur1, buff=r + 0.05)
                           for p in self.p1])
        self.n1 = VGroup(*[noeud(f, r).move_to(p) for f, p in zip("PF", self.p1)])
        self.b2 = VGroup(*[Line(self.p1[k // 2], p, stroke_width=epaisseur, color=couleur2, buff=r + 0.05)
                           for k, p in enumerate(self.p2)])
        self.n2 = VGroup(*[noeud(f, r).move_to(p) for f, p in zip("PFPF", self.p2)])
        self.q1 = VGroup(*[self._proba(b, haut, fs) for b, haut in zip(self.b1, [True, False])])
        self.q2 = VGroup(*[self._proba(b, k % 2 == 0, fs) for k, b in enumerate(self.b2)])
        self.chemins = VGroup()
        for k, (a, b) in enumerate(["PP", "PF", "FP", "FF"]):
            lab = VGroup(Text(a, font_size=lab_fs, color=PILE_C if a == "P" else FACE_C, weight=BOLD),
                         Text(b, font_size=lab_fs, color=PILE_C if b == "P" else FACE_C, weight=BOLD)
                         ).arrange(RIGHT, buff=0.04)
            lab.next_to(self.p2[k], RIGHT, buff=x_lab)
            self.chemins.add(lab)

    @staticmethod
    def _proba(branche, haut, fs):
        t = Text("1/2", font_size=fs, color=WHITE)
        d = branche.get_end() - branche.get_start()
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if n[1] < 0:
            n = -n
        return t.move_to(branche.get_center() + n * (0.3 if haut else -0.3))

    def tout(self):
        return VGroup(self.rac, self.b1, self.n1, self.b2, self.n2, self.q1, self.q2, self.chemins)

    def chemin(self, k):
        return VGroup(self.b1[k // 2], self.b2[k])


class ProbaDeuxEpreuves3e(Notion3e):
    nom_voix = "3e-proba-deux-epreuves"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m[0], font_size, m[1]) for m in morceaux]
                      ).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.45):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def frac(self, n, d, fs=44, color=WHITE):
        return self.fraction(n, d, fs, color)

    def signe(self, s, fs=44, color=WHITE):
        return self.t(s, fs, color)

    # le sac et ses billes ----------------------------------------------------

    def places_sac(self, centre, n, r):
        """Les places des billes au fond du sac, rangées de bas en haut."""
        rangs = [4, 4, 2] if n > 5 else [3, 2]
        pas = 2.25 * r
        out, y = [], centre[1] - 0.85
        for k in rangs:
            for i in range(k):
                out.append(P(centre[0] + (i - (k - 1) / 2) * pas, y))
            y += 2.1 * r
        return out[:n]

    def remplir_sac(self, centre, couleurs, r=0.27, depuis_haut=True):
        places = self.places_sac(centre, len(couleurs), r)
        billes = VGroup(*[bille(c, r).move_to(p + (UP * 3.0 if depuis_haut else 0)) for c, p in zip(couleurs, places)])
        return billes, places

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Probabilités : deux épreuves", 52, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.55))
        a1, a2 = Dot(P(-2.4, 0.5)).set_opacity(0), Dot(P(1.2, 0.5)).set_opacity(0)
        p1 = piece_tournante(a1, 0.95)
        p2 = piece_tournante(a2, 0.95, vitesse=6.0, phase=0.7)
        self.add(a1, a2)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.add(p1, p2)
        fl = Arrow(P(-1.2, 0.5), P(0.0, 0.5), color=WHITE, buff=0.1)
        self.play(GrowArrow(fl), run_time=0.4)
        self.au_mot("Que se passe-t-il")
        q = self.t("Et si on recommence ?", 40, BLEU_CALCUL).move_to(P(-0.6, -1.2))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.insister(q, 0.4)
        self.attendre_voix(marge=1.2)
        for m in (p1, p2):
            m.clear_updaters()

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Deux pièces, l'une après l'autre")
        self.au_mot("Deux pièces")
        a1 = Dot(P(-3.0, 1.9)).set_opacity(0)
        a2 = Dot(P(1.4, 1.9)).set_opacity(0)
        p1 = piece_tournante(a1, 1.0)
        self.add(a1, p1)
        self.play(a1.animate.move_to(P(-3.0, 0.75)), run_time=0.9, rate_func=rate_functions.ease_out_bounce)
        l1 = self.t("1er lancer", 32, BLEU_CALCUL).move_to(P(-3.0, -1.4))
        self.play(FadeIn(l1), run_time=0.3)
        self.au_mot("l'une après l'autre")
        p1.clear_updaters()
        self.remove(p1)
        f1 = piece_fixe("P", 1.0).move_to(P(-3.0, 0.75))
        self.add(f1)
        p2 = piece_tournante(a2, 1.0, phase=0.5)
        self.add(a2, p2)
        self.play(a2.animate.move_to(P(1.4, 0.75)), run_time=0.9, rate_func=rate_functions.ease_out_bounce)
        l2 = self.t("2e lancer", 32, BLEU_CALCUL).move_to(P(1.4, -1.4))
        fl = Arrow(P(-1.7, 0.75), P(0.1, 0.75), color=WHITE, buff=0.1)
        self.play(FadeIn(l2), GrowArrow(fl), run_time=0.4)
        self.au_mot("Quelle chance")
        p2.clear_updaters()
        self.remove(p2)
        f2 = piece_fixe("P", 1.0).move_to(P(1.4, 0.75))
        self.add(f2)
        q = self.t("Deux fois PILE : quelle chance ?", 40, BLEU_CALCUL).move_to(P(-0.8, -2.5))
        self.play(Write(q), run_time=0.9)
        self.insister(VGroup(f1, f2), 0.4)
        self.attendre_voix()

    # ── 02 : l'arbre ────────────────────────────────────────────────────────

    def arbre_ecran(self):
        return Arbre(P(-5.6, -0.3), dx=2.8, dy1=1.6, dy2=0.8, x_lab=0.5)

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arbre")
        self.titre_ecran("On dessine un arbre")
        A = self.arbre_ecran()
        xc = 4.4
        self.play(FadeIn(A.rac, scale=2), run_time=0.4)

        self.au_mot("Premier lancer")
        a1 = Dot(P(xc, 1.5)).set_opacity(0)
        c1 = piece_tournante(a1, 0.6)
        e1 = self.t("1er lancer", 28, BLEU_CALCUL).next_to(P(xc, 1.5), LEFT, buff=0.9)
        self.add(a1, c1)
        self.play(FadeIn(e1), Create(A.b1[0]), Create(A.b1[1]), run_time=0.8)
        self.play(FadeIn(A.n1, scale=0.5), run_time=0.4)
        self.au_mot("1 chance sur 2 chacun")
        self.play(FadeIn(A.q1, shift=UP * 0.1), run_time=0.4)
        self.insister(A.q1, 0.35)

        self.au_mot("Deuxième lancer")
        a2 = Dot(P(xc, -0.2)).set_opacity(0)
        c2 = piece_tournante(a2, 0.6, phase=0.5)
        e2 = self.t("2e lancer", 28, VERT_OK).next_to(P(xc, -0.2), LEFT, buff=0.9)
        self.add(a2, c2)
        self.play(FadeIn(e2), LaggedStart(*[Create(b) for b in A.b2], lag_ratio=0.25), run_time=1.0)
        self.play(FadeIn(A.n2, scale=0.5), FadeIn(A.q2), run_time=0.5)

        self.au_mot("4 chemins")
        c1.clear_updaters()
        c2.clear_updaters()
        self.remove(c1, c2)
        n4 = self.t("4 chemins", 36, JAUNE_TITRE).move_to(P(xc - 0.4, -1.5))
        f1 = piece_fixe("P", 0.6).move_to(P(xc, 1.5))
        f2 = piece_fixe("P", 0.6).move_to(P(xc, -0.2))
        self.add(f1, f2)
        self.play(FadeIn(n4), run_time=0.4)
        faces = ["PP", "PF", "FP", "FF"]
        extraits = ["pile pile", "pile face", "face pile", "face face"]
        for k, (ex, (a, b)) in enumerate(zip(extraits, faces)):
            self.au_mot(ex)
            g1 = piece_fixe(a, 0.6).move_to(f1)
            g2 = piece_fixe(b, 0.6).move_to(f2)
            ch = A.chemin(k)
            self.remove(f1, f2)
            f1, f2 = g1, g2
            self.add(f1, f2)
            self.play(FadeIn(A.chemins[k], shift=RIGHT * 0.2),
                      ShowPassingFlash(ch.copy().set_stroke(WHITE, 10), time_width=0.6), run_time=0.5)
        self.attendre_voix()

    # ── 03 : multiplier ─────────────────────────────────────────────────────

    def ecran_multiplier(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-multiplier")
        self.titre_ecran("Sur un chemin, on multiplie")
        A = self.arbre_ecran()
        self.add(A.tout())
        self.au_mot("on multiplie")
        x = self.t("×", 90, VERT_OK).move_to(P(4.3, 1.8))
        self.play(GrowFromCenter(x), run_time=0.4)
        self.insister(x, 0.3)

        self.au_mot("Pile puis pile")
        autres = VGroup(*[A.b2[k] for k in (1, 2, 3)], A.b1[1], A.q1[1], *[A.q2[k] for k in (1, 2, 3)],
                        *[A.n2[k] for k in (1, 2, 3)], A.n1[1], *[A.chemins[k] for k in (1, 2, 3)])
        self.play(autres.animate.set_opacity(0.25),
                  A.chemin(0).animate.set_stroke(JAUNE_TITRE, 9), FadeOut(x), run_time=0.7)
        self.play(Indicate(A.chemins[0], color=JAUNE_TITRE, scale_factor=1.4), run_time=0.5)

        f1 = self.frac(1, 2, 52, JAUNE_TITRE)
        fois = self.signe("×", 52)
        f2 = self.frac(1, 2, 52, JAUNE_TITRE)
        eg = self.signe("=", 52)
        f3 = self.frac(1, 4, 60, VERT_OK)
        calc = VGroup(f1, fois, f2, eg, f3).arrange(RIGHT, buff=0.3).move_to(P(4.0, 0.9))
        self.au_mot("1 sur 2 fois")
        self.play(TransformFromCopy(A.q1[0], f1), run_time=0.6)
        self.au_mot("fois 1 sur 2")
        self.play(FadeIn(fois), TransformFromCopy(A.q2[0], f2), run_time=0.6)
        self.au_mot("c'est 1 sur 4")
        self.play(FadeIn(eg), FadeIn(f3, scale=0.6), run_time=0.5)
        self.insister(f3, 0.4)
        pp = self.t("= 1/4", 34, VERT_OK).next_to(A.chemins[0], RIGHT, buff=0.25)
        self.play(FadeIn(pp, shift=LEFT * 0.2), Create(SurroundingRectangle(f3, color=VERT_OK, buff=0.15)),
                  run_time=0.5)
        self.attendre_voix()

    # ── 04 : avec remise ────────────────────────────────────────────────────

    def ecran_avec_remise(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-avec-remise")
        self.titre_ecran("Avec remise : la bille revient")
        c = P(-4.6, -0.7)
        sac = sac_vide(2.8, 2.6).move_to(c)
        self.play(FadeIn(sac), run_time=0.4)
        billes, places = self.remplir_sac(c, [BILLE_ROUGE, BILLE_BLEUE, BILLE_ROUGE, BILLE_BLEUE, BILLE_BLEUE])
        rouges = VGroup(billes[0], billes[2])
        bleues = VGroup(billes[1], billes[3], billes[4])

        self.au_mot("2 billes rouges")
        t1 = self.ligne([("2", JAUNE_TITRE), ("billes rouges", BILLE_ROUGE)], 38, 0.2).move_to(P(1.2, 2.2))
        self.add(rouges)
        self.play(*[b.animate.move_to(places[i]) for i, b in zip((0, 2), rouges)], FadeIn(t1),
                  run_time=0.7, rate_func=rate_functions.ease_out_bounce)
        self.au_mot("et 3 bleues")
        t2 = self.ligne([("3", JAUNE_TITRE), ("bleues", BILLE_BLEUE)], 38, 0.2).next_to(t1, DOWN, buff=0.3)
        self.add(bleues)
        self.play(*[b.animate.move_to(places[i]) for i, b in zip((1, 3, 4), bleues)], FadeIn(t2),
                  run_time=0.7, rate_func=rate_functions.ease_out_bounce)

        dehors = c + P(0, 2.35)
        self.au_mot("On tire une bille")
        self.play(billes[2].animate.move_to(dehors).scale(1.3), run_time=0.6)
        self.au_mot("on la remet")
        self.play(billes[2].animate.move_to(places[2]).scale(1 / 1.3), run_time=0.6)
        fl = CurvedArrow(dehors + P(0.7, 0), c + P(1.0, 0.6), angle=-PI / 2, color=VERT_OK)
        rem = self.t("remise", 28, VERT_OK).next_to(fl, RIGHT, buff=0.1)
        self.play(Create(fl), FadeIn(rem), run_time=0.4)
        self.au_mot("on en tire une autre")
        self.play(billes[0].animate.move_to(dehors).scale(1.3), run_time=0.6)
        self.play(billes[0].animate.move_to(places[0]).scale(1 / 1.3), run_time=0.5)

        self.au_mot("Deux rouges")
        h = self.t("Deux rouges :", 38, BILLE_ROUGE).move_to(P(1.2, 0.35))
        self.play(FadeIn(h), run_time=0.4)
        f1, fois, f2, eg, f3 = (self.frac(2, 5, 48, JAUNE_TITRE), self.signe("×", 48), self.frac(2, 5, 48, JAUNE_TITRE),
                                self.signe("=", 48), self.frac(4, 25, 54, VERT_OK))
        calc = VGroup(f1, fois, f2, eg, f3).arrange(RIGHT, buff=0.3).move_to(P(1.2, -0.95))
        self.au_mot("2 sur 5 fois")
        self.play(FadeIn(f1, shift=UP * 0.15), Indicate(rouges, color=WHITE), run_time=0.5)
        self.au_mot("fois 2 sur 5")
        self.play(FadeIn(fois), FadeIn(f2, shift=UP * 0.15), Indicate(rouges, color=WHITE), run_time=0.5)
        self.au_mot("c'est 4 sur 25")
        self.play(FadeIn(eg), FadeIn(f3, scale=0.6), run_time=0.5)
        self.insister(f3, 0.4)
        self.attendre_voix()

    # ── 05 : sans remise ────────────────────────────────────────────────────

    def ecran_sans_remise(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sans-remise")
        self.titre_ecran("Sans remise : le sac change")
        c = P(-4.6, -0.7)
        sac = sac_vide(2.8, 2.6).move_to(c)
        billes, places = self.remplir_sac(c, [BILLE_ROUGE, BILLE_BLEUE, BILLE_ROUGE, BILLE_BLEUE, BILLE_BLEUE],
                                          depuis_haut=False)
        self.add(sac, billes)
        compte = self.ligne([("5", JAUNE_TITRE), ("billes", WHITE)], 32, 0.15).next_to(sac, DOWN, buff=0.25)
        self.play(FadeIn(compte), run_time=0.3)

        self.au_mot("Après une rouge")
        dehors = c + P(2.2, 2.2)
        self.play(billes[2].animate.move_to(dehors).scale(1.3), run_time=0.7)
        reste_dehors = self.t("reste dehors", 26, ORANGE_RETENUE).next_to(billes[2], DOWN, buff=0.15)
        self.play(FadeIn(reste_dehors), run_time=0.3)

        self.au_mot("il reste 1 rouge")
        compte2 = self.ligne([("4", JAUNE_TITRE), ("billes", WHITE)], 32, 0.15).move_to(compte)
        self.play(Transform(compte, compte2), run_time=0.4)
        t = self.ligne([("1 rouge", BILLE_ROUGE), ("sur", WHITE), ("4 billes", WHITE)], 38, 0.2).move_to(P(1.6, 2.2))
        self.play(FadeIn(t), Indicate(billes[0], color=WHITE, scale_factor=1.6), run_time=0.6)

        self.au_mot("Deux rouges")
        h = self.t("Deux rouges :", 38, BILLE_ROUGE).move_to(P(2.3, 0.9))
        self.play(FadeIn(h), run_time=0.4)
        f1, x1, f2, e1, f3, e2, f4 = (self.frac(2, 5, 46, JAUNE_TITRE), self.signe("×", 46), self.frac(1, 4, 46, JAUNE_TITRE),
                                      self.signe("=", 46), self.frac(2, 20, 46), self.signe("=", 46),
                                      self.frac(1, 10, 54, VERT_OK))
        VGroup(f1, x1, f2, e1, f3, e2, f4).arrange(RIGHT, buff=0.28).move_to(P(2.3, -0.45))
        self.au_mot("2 sur 5 fois")
        self.play(FadeIn(f1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("fois 1 sur 4")
        self.play(FadeIn(x1), FadeIn(f2, shift=UP * 0.15), Indicate(billes[0], color=WHITE), run_time=0.5)
        self.au_mot("c'est 2 sur 20")
        self.play(FadeIn(e1), FadeIn(f3, shift=UP * 0.15), run_time=0.4)
        self.au_mot("donc 1 sur 10")
        self.play(FadeIn(e2), FadeIn(f4, scale=0.6), run_time=0.5)
        self.insister(f4, 0.4)
        self.attendre_voix()

    # ── 06 : le tableau de deux dés ─────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-tableau")
        self.titre_ecran("Deux dés : un tableau")
        self.au_mot("deux dés")
        d1 = de_qui_roule(P(-5.7, 1.1), 0.9)
        d2 = de_qui_roule(P(-5.7, -0.4), 0.9, faces=[2, 6, 4, 1, 5, 3])
        self.add(d1, d2)
        self.wait(0.6)

        cote, x0, y0 = 0.6, -2.6, 1.55  # coin haut-gauche de la grille
        def centre(i, j):  # ligne i, colonne j
            return P(x0 + cote * (j + 0.5), y0 - cote * (i + 0.5))
        cases = VGroup(*[Square(cote, stroke_color=GREY_B, stroke_width=1.5, fill_opacity=0).move_to(centre(i, j))
                         for i in range(6) for j in range(6)])
        lignes = VGroup(*[de(i + 1, 0.42).move_to(centre(i, -1) + LEFT * 0.08) for i in range(6)])
        colonnes = VGroup(*[de(j + 1, 0.42).move_to(centre(-1, j) + UP * 0.08) for j in range(6)])
        txt = VGroup(*[self.t(f"{i + 1};{j + 1}", 17).move_to(centre(i, j)) for i in range(6) for j in range(6)])

        self.au_mot("6 lignes")
        d1.clear_updaters()
        self.play(LaggedStart(*[FadeIn(m, shift=RIGHT * 0.2) for m in lignes], lag_ratio=0.15), run_time=0.8)
        l1 = self.t("6 lignes", 32, BLEU_CALCUL).move_to(P(3.9, 1.9))
        self.play(FadeIn(l1), run_time=0.3)
        self.au_mot("6 colonnes")
        d2.clear_updaters()
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.2) for m in colonnes], lag_ratio=0.15), run_time=0.8)
        l2 = self.t("× 6 colonnes", 32, BLEU_CALCUL).next_to(l1, DOWN, buff=0.2)
        self.play(FadeIn(l2), Create(cases), run_time=0.5)
        self.au_mot("36 issues")
        l3 = self.ligne([("=", WHITE), ("36", JAUNE_TITRE), ("issues", WHITE)], 36, 0.18).next_to(l2, DOWN, buff=0.25)
        self.play(LaggedStart(*[FadeIn(m) for m in txt], lag_ratio=0.03), FadeIn(l3), run_time=1.3)

        self.au_mot("Faire un double")
        diag = [6 * i + i for i in range(6)]
        self.play(LaggedStart(*[AnimationGroup(cases[k].animate.set_fill(JAUNE_TITRE, 0.85),
                                               txt[k].animate.set_color(BLACK)) for k in diag],
                              lag_ratio=0.3), run_time=1.2)
        self.au_mot("6 cases sur 36")
        f1, e, f2 = self.frac(6, 36, 48, JAUNE_TITRE), self.signe("=", 48), self.frac(1, 6, 56, VERT_OK)
        calc = VGroup(f1, e, f2).arrange(RIGHT, buff=0.3).move_to(P(3.9, -1.25))
        dbl = self.t("un double :", 32, JAUNE_TITRE).next_to(calc, UP, buff=0.3)
        self.play(FadeIn(dbl), FadeIn(f1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("c'est 1 sur 6")
        self.play(FadeIn(e), FadeIn(f2, scale=0.6), run_time=0.5)
        self.insister(f2, 0.4)
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        self.titre_ecran("Le piège")
        A = Arbre(P(-6.2, -0.4), dx=2.0, dy1=1.3, dy2=0.65, r=0.22, fs=24, lab_fs=30, x_lab=0.3)
        self.add(A.tout())
        autres = VGroup(*[A.b2[k] for k in (1, 2, 3)], A.b1[1], A.q1[1], *[A.q2[k] for k in (1, 2, 3)],
                        *[A.n2[k] for k in (1, 2, 3)], A.n1[1], *[A.chemins[k] for k in (1, 2, 3)])
        autres.set_opacity(0.25)
        A.chemin(0).set_stroke(JAUNE_TITRE, 8)

        self.au_mot("additionner")
        plus = self.t("+", 110, ROUGE_ERREUR)
        ou = self.t("au lieu de", 30)
        fois = self.t("×", 110, VERT_OK)
        VGroup(plus, ou, fois).arrange(RIGHT, buff=0.4).move_to(P(2.2, 1.7))
        self.play(GrowFromCenter(plus), run_time=0.4)
        self.au_mot("au lieu de multiplier")
        self.play(FadeIn(ou), GrowFromCenter(fois), run_time=0.5)
        self.insister(fois, 0.3)

        f1, p, f2, e, un = (self.frac(1, 2, 52, ROUGE_ERREUR), self.signe("+", 52, ROUGE_ERREUR),
                            self.frac(1, 2, 52, ROUGE_ERREUR), self.signe("=", 52, ROUGE_ERREUR),
                            self.signe("1", 60, ROUGE_ERREUR))
        calc = VGroup(f1, p, f2, e, un).arrange(RIGHT, buff=0.3).move_to(P(2.2, -0.3))
        self.au_mot("1 sur 2 plus")
        self.play(TransformFromCopy(A.q1[0], f1), run_time=0.5)
        self.au_mot("plus 1 sur 2")
        self.play(FadeIn(p), TransformFromCopy(A.q2[0], f2), run_time=0.5)
        self.au_mot("ça fait 1")
        self.play(FadeIn(e), FadeIn(un, scale=0.6), run_time=0.4)
        self.insister(un, 0.3)
        self.au_mot("ce n'est pas")
        self.play(Create(self.barrer(calc)), run_time=0.5)
        ch = self.chute("Ce n'est pas la chance d'avoir deux piles !", color=ROUGE_ERREUR, font_size=34)
        self.play(FadeIn(ch), run_time=0.5)
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def sac_perles(self, c):
        couleurs = [JAUNE_TITRE] * 6 + [PERLE_NOIRE] * 4
        ordre = [0, 6, 1, 7, 2, 3, 8, 4, 9, 5]  # mélangées
        cols = [couleurs[k] for k in ordre]
        places = self.places_sac(c, 10, 0.22)
        perles = VGroup(*[bille(col, 0.22).move_to(p) for col, p in zip(cols, places)])
        return perles, places, cols

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        c = P(-4.4, -0.4)
        sac = sac_vide(2.8, 2.6).move_to(c)
        perles, places, cols = self.sac_perles(c)
        jaunes = VGroup(*[p for p, col in zip(perles, cols) if col == JAUNE_TITRE])
        noires = VGroup(*[p for p, col in zip(perles, cols) if col != JAUNE_TITRE])
        self.play(FadeIn(sac), run_time=0.3)
        self.au_mot("6 perles jaunes")
        for p in jaunes:
            p.shift(UP * 3)
        self.add(jaunes)
        t1 = self.ligne([("6", JAUNE_TITRE), ("perles jaunes", JAUNE_TITRE)], 38, 0.2).move_to(P(1.4, 1.9))
        self.play(*[p.animate.shift(DOWN * 3) for p in jaunes], FadeIn(t1), run_time=0.7,
                  rate_func=rate_functions.ease_out_bounce)
        self.au_mot("et 4 noires")
        for p in noires:
            p.shift(UP * 3)
        self.add(noires)
        t2 = self.ligne([("4", JAUNE_TITRE), ("perles noires", WHITE)], 38, 0.2).next_to(t1, DOWN, buff=0.3)
        self.play(*[p.animate.shift(DOWN * 3) for p in noires], FadeIn(t2), run_time=0.7,
                  rate_func=rate_functions.ease_out_bounce)
        self.au_mot("On en tire deux")
        t3 = self.t("On en tire deux,", 36, BLEU_CALCUL).next_to(t2, DOWN, buff=0.45)
        self.play(FadeIn(t3), Wiggle(sac), run_time=0.6)
        self.au_mot("sans remise")
        t4 = self.t("sans remise.", 36, ORANGE_RETENUE).next_to(t3, DOWN, buff=0.2)
        self.play(FadeIn(t4), run_time=0.4)
        self.au_mot("Probabilité de deux")
        q = self.ligne([("Deux perles jaunes :", JAUNE_TITRE), ("?", WHITE)], 40, 0.25).next_to(t4, DOWN, buff=0.45)
        self.play(Write(q), run_time=0.7)
        self.insister(q[1], 0.35)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        c = P(-4.6, -0.6)
        sac = sac_vide(2.8, 2.6).move_to(c)
        perles, places, cols = self.sac_perles(c)
        self.add(sac, perles)
        compte = self.ligne([("10", JAUNE_TITRE), ("perles", WHITE)], 30, 0.15).next_to(sac, DOWN, buff=0.22)
        self.add(compte)
        sortie = [i for i, col in enumerate(cols) if col == JAUNE_TITRE][2]

        self.au_mot("Première jaune")
        dehors = c + P(2.5, 1.7)
        self.play(perles[sortie].animate.move_to(dehors).scale(1.4), run_time=0.6)
        self.au_mot("6 sur 10.")
        a = self.ligne([("1re jaune :", JAUNE_TITRE), self.frac(6, 10, 40, JAUNE_TITRE)], 34, 0.25)
        a.move_to(P(2.6, 2.1))
        self.play(FadeIn(a), run_time=0.4)
        self.au_mot("Il reste alors")
        compte2 = self.ligne([("9", JAUNE_TITRE), ("perles", WHITE)], 30, 0.15).move_to(compte)
        self.play(Transform(compte, compte2), run_time=0.4)
        self.au_mot("5 jaunes sur 9")
        b = self.ligne([("2e jaune :", JAUNE_TITRE), self.frac(5, 9, 40, JAUNE_TITRE)], 34, 0.25)
        b.next_to(a, DOWN, buff=0.3).align_to(a, LEFT)
        rest = VGroup(*[p for i, (p, col) in enumerate(zip(perles, cols)) if col == JAUNE_TITRE and i != sortie])
        self.play(FadeIn(b), Indicate(rest, color=WHITE), run_time=0.6)

        f1, x1, f2, e1, f3, e2, f4 = (self.frac(6, 10, 46, JAUNE_TITRE), self.signe("×", 46),
                                      self.frac(5, 9, 46, JAUNE_TITRE), self.signe("=", 46), self.frac(30, 90, 46),
                                      self.signe("=", 46), self.frac(1, 3, 54, VERT_OK))
        VGroup(f1, x1, f2, e1, f3, e2, f4).arrange(RIGHT, buff=0.28).move_to(P(1.7, -1.0))
        self.au_mot("6 sur 10 fois")
        self.play(FadeIn(f1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("fois 5 sur 9")
        self.play(FadeIn(x1), FadeIn(f2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("c'est 30 sur 90")
        self.play(FadeIn(e1), FadeIn(f3, shift=UP * 0.15), run_time=0.4)
        self.au_mot("donc 1 sur 3")
        self.play(FadeIn(e2), FadeIn(f4, scale=0.6), run_time=0.5)
        self.insister(f4, 0.4)
        self.play(Create(SurroundingRectangle(f4, color=VERT_OK, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Deux épreuves se", "Deux épreuves : un arbre ou un tableau"),
            ("Sur un chemin", "Sur un chemin, on multiplie"),
            ("Sans remise", "Sans remise, le sac change"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 40)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 10.0:
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.7))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 8")
        self.play(Write(self.chute("Épisode 8 : les défis", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_garde()
        self.ecran_situation()
        self.ecran_arbre()
        self.ecran_multiplier()
        self.ecran_avec_remise()
        self.ecran_sans_remise()
        self.ecran_tableau()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="10-abonne")
