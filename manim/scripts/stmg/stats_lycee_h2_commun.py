# stats_lycee_h2_commun.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# LYCÉE, lot H2 (24/10/2026) : les OUTILS COMMUNS des épisodes nuage-lire,
# nuage-construire, nuage-tendance et des quatre filtres. Pas de scène ici.
#
# ⭐ Repris du cycle 3 et du cycle 4 (sans les modifier) :
#   · MotsCales du pilote (manim/scripts/cm1/stats_graphique_lire.py), marques
#     lues ICI, dans manim/scripts/stmg/stats_<slug>[_short]_marques.json ;
#   · OutilsPaysage / OutilsShort (manim/scripts/6e/stats6_lotc_commun.py).
# ⭐ Ajouté ici :
#   · Nuage : le nuage de points du coach (`fonctionGraphique` de
#     lib/canvas/FonctionGraphiqueCanvas.tsx, tel que l'emploient
#     information-chiffree.bank.ts en 1re et statistique-deux-variables.bank.ts
#     en STMG) : carte blanche, titre en gras, grille (un trait par unité),
#     axes bleu nuit, points ROUGES (#dc2626), verticale de lecture ORANGE
#     (#f97316) et horizontale VIOLETTE (#7c3aed), en pointillé.
#   · question_pause() : l'écran « Question ! » de la règle du 23/10
#     (REGLES.md) : 3 choix A / B / C, compte à rebours visible (5 s en
#     paysage, 3 s en short, décision du 24/10), puis la bonne réponse
#     s'allume (agrandie puis rétrécie), les autres pâlissent, UNE phrase.
#     Chaque question imprime « QUESTION <clé> t=… » : le t du manifeste.
# Les figures du coach viennent de manim/canvas_stats.py (NON modifié).

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))            # manim/
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from manim import *  # noqa: E402,F401

from charte import *  # noqa: E402,F401
from canvas_stats import (AMBRE, ENCRE, GRILLE, NUIT, ORANGE_Q, Tableau, carte_autour, fr,  # noqa: E402,F401
                          texte)
from stats_graphique_lire import MotsCales  # noqa: E402,F401
from stats6_lotc_commun import OutilsPaysage, OutilsShort, croix  # noqa: E402,F401
from gabarit_sixieme import Notion6e, Short6e  # noqa: E402,F401
from signes_expression_2de import echelle_ceintures  # noqa: E402,F401

ROUGE_PT = "#dc2626"      # les points du coach
ORANGE_V = "#f97316"      # la verticale de lecture
VIOLET_H = "#7c3aed"      # l'horizontale de lecture
VIOLET_CLAIR = "#a78bfa"  # le violet, lisible sur le fond noir
GRILLE_FORTE = "#cbd5e1"  # la grille du coach (slate-300)


def P(x, y):
    return np.array([x, y, 0.0])


class MotsCalesH2(MotsCales):
    """au_mot() calé sur les MOTS ; marques lues dans manim/scripts/stmg/.
    `n` vise la n-ième occurrence. Une marque manquante lève une erreur."""

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = Path(__file__).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8"))
        return self._cache_marques

    def au_mot(self, extrait, n=1):
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix : {self._texte_voix[:60]}…")
        marques = self._marques().get(getattr(self, "_cle_voix", None))
        if not marques:
            raise ValueError(f"pas de marques pour {getattr(self, '_cle_voix', None)}")
        t = max([m[1] for m in marques if m[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} « {extrait} » : {-reste:.2f} s", flush=True)
        if reste > 0.05:
            self.wait(reste)

    def dire(self, nom, dossier=None):
        d = super().dire(nom, dossier)
        t = self.renderer.time
        print(f"ECRAN {nom} t={int(t // 60):02d}:{int(t % 60):02d} ({t:.2f})", flush=True)
        return d


def pastille_pause(h=0.5, couleur=ORANGE_RETENUE):
    """Le signe « pause » DESSINÉ (deux barres), jamais un emoji."""
    b = lambda: RoundedRectangle(width=h * 0.3, height=h, corner_radius=0.04, fill_color=couleur,  # noqa: E731
                                 fill_opacity=1, stroke_width=0)
    return VGroup(b(), b()).arrange(RIGHT, buff=h * 0.22)


class CompteARebours(VGroup):
    """Un anneau qui se vide et le chiffre au centre (5, 4, 3…). Structure fixe :
    l'anneau et le chiffre se mettent à jour par become, jamais remove/add."""

    def __init__(self, duree=5, r=0.45, couleur=ORANGE_RETENUE, fs=40, **kw):
        super().__init__(**kw)
        self.duree, self.r, self.couleur, self.fs = duree, r, couleur, fs
        self.fond = Circle(radius=r, stroke_color=GREY_D, stroke_width=8)
        self.anneau = Arc(radius=r, start_angle=PI / 2, angle=-TAU * 0.9999, stroke_color=couleur, stroke_width=8)
        self.chiffre = Text(str(duree), font_size=fs, color=WHITE)
        self.add(self.fond, self.anneau, self.chiffre)

    def jouer(self, scene):
        c = self.fond.get_center()
        r = self.fond.width / 2
        for k in range(self.duree, 0, -1):
            self.chiffre.become(Text(str(k), font_size=self.fs, color=WHITE).scale(r / self.r).move_to(c))
            debut = k / self.duree

            def maj(m, a, debut=debut):
                frac = max(1e-4, debut - a / self.duree)
                m.become(Arc(radius=r, start_angle=PI / 2, angle=-TAU * frac, arc_center=c,
                             stroke_color=self.couleur, stroke_width=8))

            scene.play(UpdateFromAlphaFunc(self.anneau, maj, rate_func=linear),
                       Indicate(self.chiffre, scale_factor=1.25, color=self.couleur), run_time=1.0)
        self.chiffre.become(Text("0", font_size=self.fs, color=WHITE).scale(r / self.r).move_to(c))


# ── le nuage de points du coach ─────────────────────────────────────────────

class Nuage(VGroup):
    """Le nuage de points du coach (`fonctionGraphique`, grille, points).

    xs, ys : les coordonnées ; xmin..xmax, ymin..ymax : la fenêtre ; pas_x,
    pas_y : un NOMBRE tous les pas (la grille garde un trait par `fin`) ;
    largeur, hauteur : la zone de tracé ; nom_x (sous l'axe), nom_y (au-dessus) ;
    titre : dans la carte, en haut. Morceaux : .carte .titre .grille .axe_x
    .axe_y .nx {v} .ny {v} .nom_x .nom_y .ronds[i] (Dot)
    ⭐ .fond = tout sauf les points. Gestes (renvoyés, NON ajoutés) :
    p(x, y) · vers_x(i) / vers_y(i) (pointillés du point vers un axe) ·
    verticale(x) / horizontale(y) (toute la fenêtre) · lu_x(v) / lu_y(v)
    (pastille sous l'axe / à gauche) · etiquette(i, txt) · allumer(i) / eteindre(i).
    """

    def __init__(self, xs, ys, xmin, xmax, ymin, ymax, pas_x=5, pas_y=5, fin_x=1, fin_y=1, largeur=6.0,
                 hauteur=4.2, nom_x=None, nom_y=None, titre=None, fs=26, rayon=0.09, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.xs, self.ys = list(xs), list(ys)
        self.xmin, self.xmax, self.ymin, self.ymax = xmin, xmax, ymin, ymax
        self.L, self.H, self.fs, self.rayon = largeur, hauteur, fs, rayon
        self.ref = Line(P(0, 0), P(largeur, hauteur), stroke_width=0)
        X = lambda v: (v - xmin) / (xmax - xmin) * largeur  # noqa: E731
        Y = lambda v: (v - ymin) / (ymax - ymin) * hauteur  # noqa: E731
        self.grille = VGroup()
        for v in self._vals(xmin, xmax, fin_x):
            if v > xmin:
                fort = abs((v - xmin) / pas_x - round((v - xmin) / pas_x)) < 1e-6
                self.grille.add(Line(P(X(v), 0), P(X(v), hauteur), color=GRILLE_FORTE if fort else GRILLE,
                                     stroke_width=2.5 if fort else 1.4))
        for v in self._vals(ymin, ymax, fin_y):
            if v > ymin:
                fort = abs((v - ymin) / pas_y - round((v - ymin) / pas_y)) < 1e-6
                self.grille.add(Line(P(0, Y(v)), P(largeur, Y(v)), color=GRILLE_FORTE if fort else GRILLE,
                                     stroke_width=2.5 if fort else 1.4))
        self.axe_x = Line(P(0, 0), P(largeur + 0.15, 0), color=NUIT, stroke_width=5)
        self.axe_y = Line(P(0, 0), P(0, hauteur + 0.15), color=NUIT, stroke_width=5)
        self.nx, self.ny = {}, {}
        for v in self._vals(xmin, xmax, pas_x):
            self.nx[v] = texte(v, fs, ENCRE).move_to(P(X(v), -0.32))
        for v in self._vals(ymin, ymax, pas_y):
            self.ny[v] = texte(v, fs, ENCRE).move_to(P(-0.16, Y(v)), aligned_edge=RIGHT)
        self.add(self.grille, self.axe_x, self.axe_y, *self.nx.values(), *self.ny.values(), self.ref)
        self.nom_x = self.nom_y = None
        if nom_x:
            self.nom_x = texte(nom_x, fs, NUIT).next_to(
                VGroup(*self.nx.values()), DOWN, buff=0.18)
            self.add(self.nom_x)
        if nom_y:
            self.nom_y = texte(nom_y, fs, NUIT).move_to(P(-0.1, hauteur + 0.42), aligned_edge=LEFT)
            self.add(self.nom_y)
        self.ronds = VGroup(*[Dot(P(X(x), Y(y)), radius=rayon, fill_color=ROUGE_PT, fill_opacity=1,
                                  stroke_color=WHITE, stroke_width=2) for x, y in zip(self.xs, self.ys)])
        self.titre = None
        if titre:
            self.titre = texte(titre, int(fs * 1.08), NUIT).next_to(VGroup(*self.submobjects), UP, buff=0.25)
            self.add(self.titre)
        self.carte = carte_autour(VGroup(*self.submobjects), marge=0.3)
        self.add_to_back(self.carte)
        self.add(self.ronds)
        self.move_to(centre)

    @staticmethod
    def _vals(a, b, pas):
        k, out = 0, []
        while a + k * pas <= b + 1e-9:
            out.append(round(a + k * pas, 9))
            k += 1
        return [int(v) if float(v).is_integer() else v for v in out]

    @property
    def fond(self):
        return VGroup(*[m for m in self.submobjects if m is not self.ronds])

    def _k(self):
        """Le facteur d'agrandissement actuel."""
        return np.linalg.norm(self.ref.get_end() - self.ref.get_start()) / np.hypot(self.L, self.H)

    def p(self, x, y):
        a, b = self.ref.get_start(), self.ref.get_end()
        return P(a[0] + (b[0] - a[0]) * (x - self.xmin) / (self.xmax - self.xmin),
                 a[1] + (b[1] - a[1]) * (y - self.ymin) / (self.ymax - self.ymin))

    def vers_x(self, i=None, x=None, y=None, couleur=ORANGE_V):
        """Le pointillé vertical du point (i, ou (x, y)) jusqu'à l'axe horizontal."""
        x, y = (self.xs[i], self.ys[i]) if i is not None else (x, y)
        return DashedLine(self.p(x, y), self.p(x, self.ymin), color=couleur, stroke_width=5, dash_length=0.1)

    def vers_y(self, i=None, x=None, y=None, couleur=VIOLET_H):
        """Le pointillé horizontal du point jusqu'à l'axe vertical."""
        x, y = (self.xs[i], self.ys[i]) if i is not None else (x, y)
        return DashedLine(self.p(x, y), self.p(self.xmin, y), color=couleur, stroke_width=5, dash_length=0.1)

    def verticale(self, x, couleur=ORANGE_V):
        return DashedLine(self.p(x, self.ymin), self.p(x, self.ymax), color=couleur, stroke_width=4,
                          dash_length=0.1)

    def horizontale(self, y, couleur=VIOLET_H):
        return DashedLine(self.p(self.xmin, y), self.p(self.xmax, y), color=couleur, stroke_width=4,
                          dash_length=0.1)

    def _pastille(self, v, couleur):
        t = texte(v, self.fs + 2, WHITE)
        f = RoundedRectangle(width=t.width + 0.22, height=t.height + 0.16, corner_radius=0.08, fill_color=couleur,
                             fill_opacity=1, stroke_width=0)
        return VGroup(f, t.move_to(f)).scale(self._k())

    def lu_x(self, v, couleur=ORANGE_V):
        """La valeur lue sous l'axe horizontal, sur les nombres (pastille orange)."""
        return self._pastille(v, couleur).move_to(P(self.p(v, self.ymin)[0], self.p(v, self.ymin)[1] - 0.32 * self._k()))

    def lu_y(self, v, couleur=VIOLET_H):
        """La valeur lue à gauche de l'axe vertical (pastille violette)."""
        g = self._pastille(v, couleur)
        return g.move_to(self.p(self.xmin, v) + LEFT * 0.12 * self._k(), aligned_edge=RIGHT)

    def etiquette(self, i, txt, direction=UR, couleur=ROUGE_PT, fs=None):
        t = texte(txt, fs or self.fs - 2, couleur).set_stroke(WHITE, 5, background=True).scale(self._k())
        return t.next_to(self.ronds[i], direction, buff=0.06)

    def allumer(self, i, couleur=AMBRE):
        """Le point i grossit et prend un anneau ambre. Animation."""
        r = self.ronds[i]
        return r.animate.scale(1.6).set_stroke(couleur, width=5)

    def eteindre(self, i):
        r = self.ronds[i]
        return r.animate.scale(1 / 1.6).set_stroke(WHITE, width=2)


# ── la QUESTION-PAUSE (règle du 23/10, compte à rebours du 24/10) ───────────

class _Questions:
    """question_pause() : partagée par la paysage et le short (dispositions
    différentes, voir _disposer_q)."""

    duree_q = 5

    def _carte_choix(self, lettre, txt, largeur, fs):
        rond = Circle(radius=0.26 * fs / 34, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        corps = txt if isinstance(txt, Mobject) else Text(txt, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), corps).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 0.4:
            ligne.scale_to_fit_width(largeur - 0.4)
        cadre = RoundedRectangle(width=largeur, height=max(0.78, ligne.height + 0.3), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color="#0b1220", fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def question_pause(self, cle_q, cle_r, question, choix, bonne, phrase, mots_choix=("A :", "B :", "C :"),
                       autres_q=None, autres_r=None, mot_q=None):
        """Écran « Question ! » : la figure éventuelle est déjà posée par l'appelant.
        question : liste de lignes ; choix : 3 textes (ou Mobjects) ; bonne : 0, 1, 2 ;
        phrase : liste de lignes, l'explication écrite (= la voix de cle_r).
        autres_q / autres_r : fonctions appelées (avec la scène) pour animer la
        figure pendant la question / la réponse (au mot)."""
        self.dire(cle_q)
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours, ph = self._disposer_q(question, choix, phrase)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        if mot_q:  # la question s'écrit quand la voix la commence
            self.au_mot(mot_q)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        for c, mot in zip(cartes, mots_choix):
            self.au_mot(mot)
            self.play(FadeIn(c, shift=RIGHT * 0.25), run_time=0.3)
        if autres_q:
            autres_q(self)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)
        # la correction, juste après le compte à rebours
        self.dire(cle_r)
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(3) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.45)
        self.play(b.animate.scale(1.08), run_time=0.3)
        self.play(b.animate.scale(1 / 1.08), run_time=0.3)
        ok = self.coche(VERT_OK, 0.24).next_to(b, RIGHT, buff=0.15)
        bord = getattr(self, "BORD_X", config.frame_width / 2 - 0.15)
        if ok.get_right()[0] > bord:  # pas de place à droite : dans la carte, au bout
            ok.move_to(b[0].get_right() + LEFT * 0.4)
        self.play(Create(ok), FadeIn(ph, shift=UP * 0.15), run_time=0.5)
        if autres_r:
            autres_r(self)
        self.attendre_voix(marge=0.8)
        return t0


class PaysageH2(MotsCalesH2, _Questions, OutilsPaysage, Notion6e):
    """La base d'une paysage du lot H2 (figure à gauche, colonne à droite)."""

    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
    duree_q = 5

    def _disposer_q(self, question, choix, phrase):
        tete = VGroup(pastille_pause(0.45), self.t("Question !", 46, ORANGE_RETENUE)).arrange(RIGHT, buff=0.25)
        self.col(tete, 3.1)
        q = self.col(self.bloc(question, 36), 2.2)
        q.align_to(P(0, tete.get_bottom()[1] - 0.18), UP)  # jamais sur « Question ! »
        cartes = VGroup(*[self._carte_choix(l, c, min(5.4, (self.BORD_X - self.XL - 0.1) / 1.08), 34) for l, c in zip("ABC", choix)])
        cartes.arrange(DOWN, buff=0.18)
        self.col(cartes, 0.1 if q.get_bottom()[1] > 1.6 else -0.1)
        if cartes.get_top()[1] > q.get_bottom()[1] - 0.2:
            cartes.shift(DOWN * (cartes.get_top()[1] - q.get_bottom()[1] + 0.2))
        pause = self.col(self.t("Mets pause, et choisis !", 34, ORANGE_RETENUE), cartes.get_bottom()[1] - 0.45)
        rebours = CompteARebours(self.duree_q, r=0.42).move_to(P(self.BORD_X - 0.5, 3.1))
        ph = self.col(self.bloc(phrase, 30, VERT_OK), cartes.get_bottom()[1] - 0.25)
        ph.align_to(P(0, cartes.get_bottom()[1] - 0.25), UP)
        return tete, q, cartes, pause, rebours, ph

    # ⛔ « relis bien tes écrans pour ne pas rogner » (Frédéric, 24/10) : marge
    # ≥ 3 % de la largeur (0,43 unité) sur les quatre côtés.
    BORD_X, BORD_Y = 6.62, 3.55

    def col(self, mob, y, xl=None):
        """La colonne de droite, sans jamais approcher le bord droit."""
        xl = self.XL if xl is None else xl
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > self.BORD_X - 0.05:
            mob.scale_to_fit_width(self.BORD_X - 0.05 - xl).align_to(P(xl, 0), LEFT)
        if mob.get_bottom()[1] < -1.85 and mob.get_right()[0] > 5.3:  # Ti-Margo, en bas à droite
            mob.scale_to_fit_width(5.3 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def add_mascotte(self, scale=0.5):
        """Ti-Margo dans le coin, à 0,45 du bord (3 % de la largeur)."""
        from mascotte import MascotteMargouillat
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        return m

    def cadrer(self, mob, gauche=None, droite=0.65, haut=None, bas=None):
        """Réduit mob (si besoin) et le centre dans la boîte [gauche, droite] ×
        [bas, haut] : la figure de gauche ne touche jamais le bord."""
        gauche = -self.BORD_X if gauche is None else gauche
        haut = self.BORD_Y if haut is None else haut
        bas = -self.BORD_Y if bas is None else bas
        k = min(1.0, (droite - gauche) / mob.width, (haut - bas) / mob.height)
        mob.scale(k)
        return mob.move_to(P((gauche + droite) / 2, (haut + bas) / 2))

    def finale_colonne(self, textes, fs=38, figure=None):
        """« Ce que tu as appris » (Frédéric, 24/10) : le titre EN HAUT ET CENTRÉ,
        les points dans la colonne de droite, sous lui ; la figure (déjà posée)
        est recadrée SOUS le titre, entière, sans rien d'effacé à moitié. Le titre
        est joué ; les lignes (coche + bloc) sont renvoyées pour être montrées AU
        MOT (montrer_ligne)."""
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.3)
        if figure is not None:
            self.cadrer(figure, droite=self.XL - 0.3, haut=tit.get_bottom()[1] - 0.2)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in textes:
            bloc = VGroup(*[self.t(x, fs) for x in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        xl = self.XL if figure is None else min(self.XL, figure.get_right()[0] + 0.45)
        largeur = self.BORD_X - 0.05 - xl
        if lignes.width > largeur:
            lignes.scale_to_fit_width(largeur)
        if lignes.height > 2.55 + 1.75:  # jamais jusqu'à Ti-Margo
            lignes.scale_to_fit_height(4.3)
        lignes.align_to(P(xl, 0), LEFT).align_to(P(0, 2.55), UP)
        return lignes

    def ecran_question(self, cle_q, cle_r, question, choix, bonne, phrase, figure=None, **kw):
        """Un écran de question complet : efface, pose la figure (à gauche), questionne."""
        self.clear()
        self.add_mascotte(scale=0.5)
        if figure is not None:
            self.add(figure)
        return self.question_pause(cle_q, cle_r, question, choix, bonne, phrase, **kw)


class ShortH2(MotsCalesH2, _Questions, OutilsShort, Short6e):
    """La base d'un short du lot H2 (9:16, cadre 4,5 × 8). La question s'écrit
    dans la bande du haut (y de 2,2 à -0,2 environ) ; la figure reste en bas."""

    duree_q = 3
    Y_Q = 1.45

    def bloc(self, lignes, fs=30, color=WHITE, buff=0.1):
        return self.borne(VGroup(*[self.t(s, fs, color) for s in lignes]).arrange(DOWN, buff=buff))

    def _disposer_q(self, question, choix, phrase):
        tete = VGroup(pastille_pause(0.36), self.t("Question !", 38, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        tete.move_to(P(-0.35, self.Y_Q + 0.55))
        rebours = CompteARebours(self.duree_q, r=0.3, fs=30).next_to(tete, RIGHT, buff=0.3)
        q = self.bloc(question, 28).next_to(tete, DOWN, buff=0.2)
        cartes = VGroup(*[self._carte_choix(l, c, 3.95, 28) for l, c in zip("ABC", choix)])
        cartes.arrange(DOWN, buff=0.1).next_to(q, DOWN, buff=0.2)
        pause = self.bloc(["Mets pause, et choisis !"], 26, ORANGE_RETENUE).next_to(cartes, DOWN, buff=0.12)
        ph = self.bloc(phrase, 26, VERT_OK).next_to(cartes, DOWN, buff=0.12)
        for m in (q, cartes, pause, ph):  # tout au centre du cadre étroit
            m.set_x(0)
        return tete, q, cartes, pause, rebours, ph


# ── le TABLEUR des filtres (fichier : une ligne = un individu) ──────────────
# Le coach montre le fichier en `tableau_donnees` (canvasFichier : la colonne
# d'identifiant, deux colonnes de texte, une colonne de nombres) et le tableau
# croisé (canvasCroise / canvasTableau). Les filtres s'écrivent comme dans un
# tableur : « Durée (min) ≥ 140 », « Animation = Oui ».

def fichier(idcol, ids, colonnes, lignes, fs=22, largeur_id=3.2, largeurs=None, hauteur=0.5):
    """Le fichier du tableur (Tableau du coach) : une ligne = un individu.
    colonnes : les titres ; lignes : une liste de valeurs par individu."""
    tb = Tableau(colonnes, lignes, libelles=ids, coin=idcol, largeur_case=1.45, largeur_libelle=largeur_id,
                 hauteur=hauteur, fs=fs)
    if largeurs:  # des colonnes de largeurs différentes : on les redimensionne
        x = tb.coin.get_right()[0]
        for j, w in enumerate(largeurs):
            for m in [tb.tetes[j]] + [tb.cases[r][j] for r in range(len(lignes))]:
                m[0].stretch_to_fit_width(w)
                m.move_to(P(x + w / 2, m.get_y()))
                if m[1].width > w * 0.9:
                    m[1].scale_to_fit_width(w * 0.9)
            x += w
        neuf = carte_autour(VGroup(*[m for m in tb.submobjects if m is not tb.carte]), marge=0.3, rayon=0.3)
        tb.carte.become(neuf)
    return tb


def rang(tb, r):
    """Toute la ligne r du fichier : l'identifiant et ses cases."""
    return VGroup(tb.libelles[r], *tb.cases[r])


def masquer(tb, rs, opacite=0.16):
    """Les lignes rs sont MASQUÉES (pâlies), pas effacées. Liste d'animations."""
    return [rang(tb, r).animate.set_opacity(opacite) for r in rs]


def demasquer(tb, rs):
    return [rang(tb, r).animate.set_opacity(1) for r in rs]


def entonnoir(h=0.4, couleur=AMBRE):
    """L'icône du filtre (un entonnoir), dessinée."""
    haut = Polygon(P(-h * 0.6, h * 0.5), P(h * 0.6, h * 0.5), P(h * 0.12, -h * 0.05), P(-h * 0.12, -h * 0.05),
                   fill_color=couleur, fill_opacity=1, stroke_width=0)
    tige = Rectangle(width=h * 0.24, height=h * 0.45, fill_color=couleur, fill_opacity=1, stroke_width=0)
    tige.next_to(haut, DOWN, buff=0)
    return VGroup(haut, tige)


def barre_filtre(texte_filtre, fs=34, largeur=None):
    """La barre de filtre du tableur : entonnoir + le critère en police Consolas,
    sur fond sombre bordé d'ambre. texte_filtre : str ou liste de (str, couleur)."""
    morceaux = [(texte_filtre, WHITE)] if isinstance(texte_filtre, str) else texte_filtre
    t = VGroup(*[Text(s, font="Consolas", font_size=fs, color=c) for s, c in morceaux]).arrange(RIGHT, buff=0.18)
    k = fs / 34
    contenu = VGroup(entonnoir(0.42 * k), t).arrange(RIGHT, buff=0.25 * k)
    w = max(largeur or 0, contenu.width + 0.5 * k)
    fond = RoundedRectangle(width=w, height=contenu.height + 0.36 * k, corner_radius=0.12, fill_color="#1e293b",
                            fill_opacity=1, stroke_color=AMBRE, stroke_width=4)
    contenu.move_to(fond).align_to(fond.get_left() + RIGHT * 0.25 * k, LEFT)
    g = VGroup(fond, contenu)
    g.texte = t
    return g


def croise(lignes_noms, colonnes_noms, cases, fs=30, coin="", largeur_case=1.7, largeur_libelle=2.6, hauteur=0.75):
    """Le tableau croisé du coach AVEC ses marges (« Total »), à partir des cases
    [[a, b], [c, d]]. Ligne et colonne « Total » en dernier."""
    a = [list(r) + [sum(r)] for r in cases]
    tot = [sum(r[j] for r in a) for j in range(len(a[0]))]
    return Tableau(list(colonnes_noms) + ["Total"], a + [tot], libelles=list(lignes_noms) + ["Total"], coin=coin,
                   largeur_case=largeur_case, largeur_libelle=largeur_libelle, hauteur=hauteur, fs=fs)
