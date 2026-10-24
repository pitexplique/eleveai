# stats_lycee_h1_commun.py
# EleveAI — série « Statistiques », LYCÉE, lot H1 (24/10/2026) : les OUTILS
# COMMUNS des six épisodes communs 1re tronc commun / STMG
#   01-lire-graphique, 02-graphiques-usuels (STMG : diagrammes-usuels),
#   03-graphique-donnees (STMG 04), 04-tab-lire (STMG 05),
#   05-tab-completer (STMG 07), 06-tab-construire (STMG 08 : tab-dresser).
# Pas de scène ici.
#
# ⭐ Repris sans les modifier :
#   · MotsCales du pilote (cm1/stats_graphique_lire.py) : au_mot() calé sur les
#     MOTS (marques WinRT, débit −7 au lycée), lus ici dans
#     manim/scripts/stmg/stats_<slug>[_short]_marques.json ;
#   · OutilsPaysage / OutilsShort du lot C de 6e (6e/stats6_lotc_commun.py) ;
#   · remplir / teinter / allumer des tableaux (cm1/stats_tableau_commun.py).
# Les figures viennent de manim/canvas_stats.py (NON modifié).
#
# ⭐⭐ NOUVEAU (règle du 23/10, format validé le 24/10) : la QUESTION-PAUSE.
#   question_pause() : écran « Question ! » (icône pause dessinée : pas
#   d'emoji dans un Text), la question, 3 choix A / B / C ; la voix dit la
#   question puis « Mets pause, et choisis ! » ; compte à rebours VISIBLE
#   (5 s en paysage, 3 s en short) ; puis la bonne réponse s'allume (agrandie
#   puis rétrécie), les autres s'estompent, UNE phrase nomme l'erreur des leurres.
#   Chaque dire() imprime « CHAP <clé> <t> » : t mesuré pour le champ `questions`.

import json
import os
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))            # manim/
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from manim import *  # noqa: E402,F401,F403

from charte import *  # noqa: E402,F401,F403
from canvas_stats import (AMBRE, ANNEAU, CARTE, CASE_ALLUMEE, ENCRE, GRILLE, NUIT, ORANGE_Q, Barres,  # noqa: E402,F401
                          Camembert, Courbe, Tableau, carte_autour, fr, texte)
from stats_graphique_lire import MotsCales  # noqa: E402,F401
from stats_tableau_commun import (BLEU_PALE, PALE, allumer, eteindre, fleche_colonne, fleche_ligne, remplir, teinter,  # noqa: E402,F401
                                  teinter_colonne, teinter_ligne, textes_devant)
from stats6_lotc_commun import OutilsPaysage, OutilsShort, croix  # noqa: E402,F401
from gabarit_sixieme import Notion6e, Short6e  # noqa: E402,F401
from signes_expression_2de import echelle_ceintures  # noqa: E402,F401

LETTRES = ["A", "B", "C"]


def P(x, y):
    return np.array([x, y, 0.0])


def icone_pause(h=0.42, couleur=ORANGE_RETENUE):
    """Le symbole pause dessiné (deux barres arrondies)."""
    b = [RoundedRectangle(width=h * 0.3, height=h, corner_radius=h * 0.08, fill_color=couleur, fill_opacity=1,
                          stroke_width=0) for _ in range(2)]
    return VGroup(*b).arrange(RIGHT, buff=h * 0.22)


def elargir_carte(g, dx=0.5):
    """Élargit la carte d'un graphique vers la GAUCHE : la pastille lu() du
    coach (à gauche des nombres) débordait du bord de la carte."""
    c = g.carte
    neuf = RoundedRectangle(width=c.width + dx, height=c.height, corner_radius=0.25, fill_color=CARTE,
                            fill_opacity=1, stroke_color=GRILLE, stroke_width=3)
    neuf.move_to(c).shift(LEFT * dx / 2)
    c.become(neuf)
    return g


def caser(mob, gauche=-6.6, droite=0.45, bas=-3.4, haut=3.1):
    """Réduit (jamais n'agrandit) et place mob dans le rectangle donné : la
    marge de 3 % aux bords du cadre (règle du 24/10) est tenue d'office."""
    k = min(1.0, (droite - gauche) / mob.width, (haut - bas) / mob.height)
    mob.scale(k)
    mob.move_to(P((gauche + droite) / 2, (bas + haut) / 2))
    return mob


class MotsCalesL(MotsCales):
    """MotsCales du pilote, marques lues dans manim/scripts/stmg/ ; `n` vise la
    n-ième occurrence d'un extrait ; chaque dire() imprime son instant."""

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = Path(__file__).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8"))
        return self._cache_marques

    def dire(self, nom, dossier=None):
        print(f"CHAP {nom} {self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def play(self, *args, **kwargs):
        """Après chaque animation (variable BORDS=1) : signale tout objet à moins
        de 3 % du bord du cadre (règle du 24/10), Ti-Margo excepté."""
        super().play(*args, **kwargs)
        if os.environ.get("BORDS") == "1":
            self.verifier_bords()

    def verifier_bords(self):
        m = config.frame_width * 0.03
        lx, ly = config.frame_width / 2 - m, config.frame_height / 2 - m
        vus = getattr(self, "_bords_vus", set())
        for mob in self.mobjects:
            if type(mob).__name__.startswith("Mascotte") or mob.get_family() == [mob] and mob.width < 1e-3:
                continue
            for f in [mob] + list(mob.submobjects):
                if type(f).__name__.startswith("Mascotte") or not f.has_points() and not f.submobjects:
                    continue
                if f.width < 1e-3 and f.height < 1e-3:
                    continue
                g, d = f.get_left()[0], f.get_right()[0]
                b, h = f.get_bottom()[1], f.get_top()[1]
                if g < -lx or d > lx or b < -ly or h > ly:
                    cle = (getattr(self, "_cle_voix", "?"), type(f).__name__, round(g, 1), round(d, 1), round(b, 1),
                           round(h, 1))
                    if cle not in vus:
                        vus.add(cle)
                        print(f"BORD {cle[0]} {cle[1]} x[{cle[2]}, {cle[3]}] y[{cle[4]}, {cle[5]}]", flush=True)
        self._bords_vus = vus

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


class _Question:
    """La question-pause, commune à la paysage et au short. La scène fournit
    t(), insister(), et la place : x0 (bord gauche), largeur, y_haut."""

    def carte_choix(self, lettre, txt, largeur, fs):
        """Un choix : pastille ronde à la lettre, texte, cadre arrondi."""
        rond = Circle(radius=0.26, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        let = self.t(lettre, 30, WHITE).move_to(rond)
        corps = self.t(txt, fs) if isinstance(txt, str) else txt
        contenu = VGroup(VGroup(rond, let), corps).arrange(RIGHT, buff=0.3)
        if contenu.width > largeur - 0.4:
            contenu.scale_to_fit_width(largeur - 0.4)
        cadre = RoundedRectangle(width=largeur, height=max(0.8, contenu.height + 0.3), corner_radius=0.16,
                                 stroke_color=GREY_B, stroke_width=3, fill_color="#111827", fill_opacity=1)
        contenu.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, contenu)

    def rebours(self, secondes, centre, r=0.42):
        """Le compte à rebours visible : un anneau qui se vide, le nombre au
        centre (structure fixe + become). Joué ici, puis effacé."""
        suivi = ValueTracker(secondes)
        fond = Circle(radius=r, stroke_color=GREY_D, stroke_width=8).move_to(centre)
        anneau = Arc(radius=r, start_angle=PI / 2, angle=TAU, stroke_color=ORANGE_RETENUE, stroke_width=8)
        anneau.move_to(centre)
        nb = self.t(str(secondes), 40, ORANGE_RETENUE).move_to(centre)

        def maj_anneau(m):
            f = max(suivi.get_value() / secondes, 0.001)
            m.become(Arc(radius=r, start_angle=PI / 2, angle=TAU * f, stroke_color=ORANGE_RETENUE,
                         stroke_width=8, arc_center=centre))

        def maj_nb(m):
            k = max(1, int(np.ceil(suivi.get_value() - 1e-6)))
            m.become(self.t(str(k), 40, ORANGE_RETENUE).move_to(centre))

        anneau.add_updater(maj_anneau)
        nb.add_updater(maj_nb)
        self.add(fond, anneau, nb)
        self.play(suivi.animate.set_value(0), run_time=secondes, rate_func=linear)
        anneau.clear_updaters()
        nb.clear_updaters()
        self.play(FadeOut(VGroup(fond, anneau, nb)), run_time=0.25)

    def question_pause(self, cle_q, cle_r, question, choix, bonne, explication, secondes=5, x0=0.95, largeur=5.2,
                       y_titre=3.1, y_q=2.45, ys=(1.05, 0.1, -0.85), y_bas=-1.85, fs=34, fs_choix=34,
                       rebours_centre=None, mots=None, mot_explication=None, geste=None, avant=None, fs_tete=46):
        """L'écran « Question ! » puis sa réponse (deux clés de voix).
        question, explication : listes de lignes ; choix : 3 textes ; bonne : 0, 1 ou 2 ;
        mots : les extraits de la voix où chaque choix apparaît (« A : »… par défaut).
        Renvoie le groupe de l'écran (à effacer par la scène)."""
        mots = mots or [f"{L} :" for L in LETTRES]
        self.dire(cle_q)
        tete = VGroup(icone_pause(0.42 * fs_tete / 46), self.t("Question !", fs_tete, ORANGE_RETENUE)).arrange(RIGHT, buff=0.25)
        tete.move_to(P(0, y_titre)).align_to(P(x0, 0), LEFT)
        q = VGroup(*[self.t(s, fs) for s in question]).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        if q.width > largeur:
            q.scale_to_fit_width(largeur)
        q.next_to(tete, DOWN, buff=0.35).align_to(P(x0, 0), LEFT)
        cartes = VGroup(*[self.carte_choix(L, c, largeur, fs_choix) for L, c in zip(LETTRES, choix)])
        for c, y in zip(cartes, ys):
            c.move_to(P(x0 + largeur / 2, y))
        self.au_mot("Question")
        if avant:
            avant()  # un geste sur la figure pendant la question (ex. allumer la barre)
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        for c, m in zip(cartes, mots):
            self.au_mot(m)
            self.play(FadeIn(c, shift=UP * 0.15), run_time=0.3)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et choisis !", 34, ORANGE_RETENUE).move_to(P(0, y_bas))
        pause.align_to(P(x0, 0), LEFT)
        if pause.width > largeur:
            pause.scale_to_fit_width(largeur).align_to(P(x0, 0), LEFT)
        self.play(Write(pause), run_time=0.6)
        self.attendre_voix(marge=0.15)
        centre = rebours_centre if rebours_centre is not None else             P(min(max(x0 + largeur - 0.5, tete.get_right()[0] + 0.7), 6.15), y_titre)
        self.rebours(secondes, centre)
        # ── la réponse ──
        self.dire(cle_r)
        self.au_mot("Réponse")
        juste = cartes[bonne]
        autres = [c for k, c in enumerate(cartes) if k != bonne]
        self.play(juste[0].animate.set_stroke(VERT_OK, 6).set_fill("#14532d", 1),
                  *[c.animate.set_opacity(0.3) for c in autres], FadeOut(pause), run_time=0.4)
        self.insister(juste, 1.08)
        if geste:
            geste()  # le geste qui MONTRE la réponse sur la figure
        ex = VGroup(*[self.t(s, 30, VERT_OK if k == 0 else WHITE) for k, s in enumerate(explication)])
        ex.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        if ex.width > largeur:
            ex.scale_to_fit_width(largeur)
        ex.next_to(cartes, DOWN, buff=0.3).align_to(P(x0, 0), LEFT)
        if mot_explication:
            self.au_mot(mot_explication)
        self.play(FadeIn(ex, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix(marge=0.8)
        return VGroup(tete, q, cartes, ex)


class PaysageLycee(_Question, MotsCalesL, OutilsPaysage, Notion6e):
    """La base d'une paysage du lot H1. Sous-classes : identite et ceinture."""

    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
    X_MAX = 6.55  # le bord droit de la colonne de droite (marge de 3 %)

    def col(self, mob, y, xl=None):
        """Pose mob dans la colonne de droite, calé à gauche, sans dépasser X_MAX."""
        xl = self.XL if xl is None else xl
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > self.X_MAX:
            mob.scale_to_fit_width(self.X_MAX - xl).align_to(P(xl, 0), LEFT)
        return mob

    def insister(self, mob, k=1.5, run_time=0.35, about=None):
        """Agrandir puis rétrécir (règle du 07/10), sans sortir de la marge de 3 %."""
        if about is None:
            c = mob.get_center()
            lim = min(6.6 - c[0], c[0] + 6.6) * 2 / max(mob.width, 1e-3)
            lim = min(lim, min(3.5 - c[1], c[1] + 3.5) * 2 / max(mob.height, 1e-3))
            k = max(1.02, min(k, lim))
        super().insister(mob, k, run_time, about)

    def garde(self, titre_txt, identite, ceinture, y_ech=-2.55):
        return super().garde(titre_txt, identite, ceinture, y_ech=y_ech)

    def finale(self, textes, ys, fs=36):
        """« Ce que tu as appris » comme OutilsPaysage.finale (titre EN HAUT, CENTRÉ),
        mais à 0,45 du bord (marge de 3 %)."""
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)), run_time=0.7)
        lignes = VGroup()
        for morceaux, y in zip(textes, ys):
            bloc = VGroup(*[self.t(s, fs) for s in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
            lg = VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.3)
            lignes.add(self.col(lg, y))
        return lignes


class ShortLycee(_Question, MotsCalesL, OutilsShort, Short6e):
    """La base d'un short du lot H1 (9:16, cadre 4,5 × 8)."""

    def borne(self, mob, marge=0.7):
        """Comme OutilsShort.borne, avec la marge de 3 % de chaque côté."""
        if mob.width > config.frame_width - marge:
            mob.scale_to_fit_width(config.frame_width - marge)
        return mob

    def insister(self, mob, k=1.3, run_time=0.2):
        """Agrandir puis rétrécir, sans jamais sortir du cadre (largeur ≤ 4,1)."""
        k = max(1.02, min(k, 4.1 / max(mob.width, 1e-3)))
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def question_short(self, cle_q, cle_r, question, choix, bonne, explication, **kw):
        """La question-pause du short : pleine largeur, 3 s de compte à rebours."""
        opts = dict(secondes=3, x0=-1.85, largeur=3.7, y_titre=1.85, y_q=1.2, ys=(0.2, -0.65, -1.5), y_bas=-2.3,
                    fs=30, fs_choix=30, rebours_centre=P(1.66, 1.85), fs_tete=32)
        opts.update(kw)
        return self.question_pause(cle_q, cle_r, question, choix, bonne, explication, **opts)
