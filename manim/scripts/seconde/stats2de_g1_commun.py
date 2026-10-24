# stats2de_g1_commun.py
# EleveAI — Maths 2de — série « Statistiques », lycée, LOT G1 (24/10/2026) :
# 01-lire-serie, 02-moyenne, 03-moyenne-ponderee, 04-mediane-quartiles,
# 05-frequence. Les OUTILS COMMUNS du lot. Pas de scène ici.
#
# ⭐ Repris sans les modifier : le module commun du cycle 4
#   (manim/scripts/4e/stats4e_lote_commun.py : MotsCales4, OutilsPaysage,
#   OutilsShort, AxePoints, croix, Tableau / Barres de canvas_stats.py).
#   Les marques mot à mot sont lues ici, dans manim/scripts/seconde/.
# ⭐ AJOUTÉ ICI : la QUESTION-PAUSE (règle du 23/10, REGLES.md ; décision de
#   Frédéric du 24/10 : compte à rebours de 5 s en paysage, 3 s en short ; la
#   correction vient juste après : bonne réponse allumée, agrandie puis
#   rétrécie, les autres estompées, UNE phrase qui nomme l'erreur des leurres).
#   Le pictogramme « pause » est DESSINÉ (deux barres) : pas d'emoji dans Text.

import json
import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "4e"))

from stats4e_lote_commun import *  # noqa: E402,F401,F403
from stats4e_lote_commun import MotsCales4, Notion6e, OutilsPaysage, OutilsShort, Short6e  # noqa: E402
from stats_tableau_commun import allumer, eteindre, teinter, teinter_colonne, teinter_ligne  # noqa: E402,F401

from mascotte import MascotteMargouillat  # noqa: E402

ICI = Path(__file__).resolve().parent
DROITE = 6.55            # le bord droit de tout texte (marge ≥ 3 % de 14,2)
GAUCHE = -6.6            # le bord gauche de toute carte
ROUGE_CLAIR = "#fca5a5"   # l'erreur d'un leurre, en clair (red-300)
VERT_CARTE = "#14532d"   # le fond de la bonne réponse (green-900)
BORD_CHOIX = "#64748b"   # le bord d'une carte de choix (slate-500)


class MotsCales2de(MotsCales4):
    """MotsCales du pilote (au_mot calé sur les mots, n-ième occurrence), les
    marques lues dans manim/scripts/seconde/<fichier_marques>."""

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = ICI / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8-sig"))
        return self._cache_marques


class Notion2de(Notion6e):
    identite = "Maths 2de — EleveAI"


def picto_pause(h=0.55, couleur=ORANGE_RETENUE):
    """Le symbole « pause » : deux barres arrondies."""
    b = RoundedRectangle(width=h * 0.3, height=h, corner_radius=h * 0.08, fill_color=couleur, fill_opacity=1,
                         stroke_width=0)
    return VGroup(b, b.copy()).arrange(RIGHT, buff=h * 0.22)


class QuestionPause:
    """L'écran « Question ! » : 3 choix A / B / C, compte à rebours, réponse."""

    DUREE_REBOURS = 5

    def carte_choix(self, lettre, txt, largeur=4.0, fs=40):
        rond = Circle(radius=0.24, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        let = Text(lettre, font_size=26, color=WHITE, weight=BOLD).move_to(rond)
        val = Text(txt, font_size=fs, color=WHITE)
        cadre = RoundedRectangle(width=largeur, height=0.9, corner_radius=0.16, stroke_color=BORD_CHOIX,
                                 stroke_width=4, fill_color="#1e293b", fill_opacity=1)
        VGroup(rond, let).move_to(cadre.get_left() + RIGHT * 0.36)
        place = largeur - 0.82
        if val.width > place:
            val.scale_to_fit_width(place)
        val.move_to(P(cadre.get_left()[0] + 0.68 + place / 2, cadre.get_center()[1]))
        return VGroup(cadre, rond, let, val)

    def rebours(self, centre, rayon=0.55, duree=None):
        """Le compte à rebours visible : un anneau qui se vide et le nombre de
        secondes. Structure fixe + become (pas de remove/add dans un updater)."""
        duree = duree or self.DUREE_REBOURS
        tr = ValueTracker(0)
        fond = Circle(radius=rayon, stroke_color="#334155", stroke_width=10).move_to(centre)

        def anneau():
            reste = max(1e-3, 1 - tr.get_value() / duree)
            return Arc(radius=rayon, start_angle=PI / 2, angle=-TAU * reste, arc_center=centre,
                       stroke_color=ORANGE_RETENUE, stroke_width=10)

        def nombre():
            n = max(1, math.ceil(duree - tr.get_value() - 1e-6))
            return Text(str(n), font_size=int(70 * rayon / 0.55), color=ORANGE_RETENUE, weight=BOLD).move_to(centre)

        arc, nb = anneau(), nombre()
        arc.add_updater(lambda m: m.become(anneau()))
        nb.add_updater(lambda m: m.become(nombre()))
        self.add(fond, arc, nb)
        self.play(tr.animate.set_value(duree), run_time=duree, rate_func=linear)
        arc.clear_updaters()
        nb.clear_updaters()
        return VGroup(fond, arc, nb)

    def question(self, cle_q, cle_r, question, choix, bonne, explication, x0=None, y0=2.55,
                 mots=("A :", "B :", "C :"), largeur=1.7, fs_q=38, centre_rebours=None, geste=None,
                 rangee=True, avant_choix=None):
        """Joue l'écran entier (la figure éventuelle est déjà posée à gauche).

        question : lignes de la question (affichées au mot « Question ») ;
        choix : 3 textes ; bonne : 0, 1 ou 2 ;
        explication : [(ligne, couleur, extrait de la voix de réponse), …].
        Renvoie le temps (s) du DÉBUT de l'écran, pour la liste `questions`.
        """
        x0 = self.XL if x0 is None else x0
        t0 = self.renderer.time
        self.dire(cle_q)
        pp = picto_pause(0.5)
        tit = Text("Question !", font_size=50, color=ORANGE_RETENUE, weight=BOLD)
        entete = VGroup(pp, tit).arrange(RIGHT, buff=0.25).move_to(P(0, y0)).align_to(P(x0, 0), LEFT)
        self.au_mot("Question")
        self.play(FadeIn(pp, scale=1.4), Write(tit), run_time=0.5)
        q = VGroup(*[Text(s, font_size=fs_q, color=WHITE) for s in question]).arrange(DOWN, aligned_edge=LEFT,
                                                                                    buff=0.12)
        q.next_to(entete, DOWN, buff=0.35).align_to(P(x0, 0), LEFT)
        if q.get_right()[0] > DROITE:
            q.scale_to_fit_width(DROITE - x0).align_to(P(x0, 0), LEFT)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        if avant_choix is not None:  # un geste sur la figure, calé par l'appelant (au_mot)
            avant_choix()
        if not rangee:  # des choix longs : en colonne, larges, sous la ligne « Mets pause » et son compte à rebours
            largeur = min(DROITE - x0 - 1.4, max(largeur, 4.2))
        cartes = VGroup(*[self.carte_choix(l, c, largeur) for l, c in zip("ABC", choix)])
        pause = Text("Mets pause, et choisis !", font_size=34, color=ORANGE_RETENUE)
        if rangee:  # des choix courts : côte à côte, le compte à rebours dessous
            cartes.arrange(RIGHT, buff=0.22).next_to(q, DOWN, buff=0.45).align_to(P(x0, 0), LEFT)
            pause.next_to(cartes, DOWN, buff=0.3).align_to(P(x0, 0), LEFT)
        else:
            pause.scale(0.9).next_to(q, DOWN, buff=0.3).align_to(P(x0, 0), LEFT)
            cartes.arrange(DOWN, buff=0.15).next_to(pause, DOWN, buff=0.25).align_to(P(x0, 0), LEFT)
        for c, m in zip(cartes, mots):
            self.au_mot(m)
            self.play(FadeIn(c, shift=RIGHT * 0.25), run_time=0.35)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.2)
        if centre_rebours is not None:
            cr = centre_rebours
        elif rangee:
            cr = P(cartes.get_center()[0], pause.get_bottom()[1] - 0.8)
        else:
            cr = P(cartes.get_right()[0] + 0.6, cartes.get_center()[1])   # à droite des cartes
        rb = self.rebours(cr, rayon=0.55 if rangee else 0.4)
        # ── la réponse, juste après le compte à rebours ──
        self.dire(cle_r)
        bon = cartes[bonne]
        autres = [c for i, c in enumerate(cartes) if i != bonne]
        self.play(FadeOut(rb), FadeOut(pause), *[c.animate.set_opacity(0.3) for c in autres],
                  bon[0].animate.set_fill(VERT_CARTE).set_stroke(VERT_OK, width=7),
                  bon[1].animate.set_fill(VERT_OK), run_time=0.45)
        if not rangee:  # en colonne : la bonne carte monte en tête (agrandie), les autres partent
            haut = cartes[0].get_center()
            self.play(*[FadeOut(c) for c in autres], bon.animate.move_to(haut).scale(1.18), run_time=0.3)
        else:
            self.play(bon.animate.scale(1.18), run_time=0.25)
        self.play(bon.animate.scale(1 / 1.18), run_time=0.25)
        # le geste sur la figure de gauche part AVEC la première ligne d'explication
        gestes = list(geste()) if geste is not None else []
        bas = (bon if not rangee else cartes).get_bottom()[1] - 0.35
        for ligne, couleur, extrait in explication:
            if extrait:
                self.au_mot(extrait)
            t = Text(ligne, font_size=34, color=couleur)
            t.move_to(P(0, bas - t.height / 2)).align_to(P(x0, 0), LEFT)
            if t.get_right()[0] > 6.2:  # Ti-Margo est dans le coin bas-droit
                t.scale_to_fit_width(6.2 - x0).align_to(P(x0, 0), LEFT)
            self.play(FadeIn(t, shift=UP * 0.15), *gestes, run_time=0.6 if gestes else 0.4)
            gestes = []
            bas = t.get_bottom()[1] - 0.14
        self.attendre_voix(marge=1.0)
        return t0


class Paysage2de(MotsCales2de, QuestionPause, OutilsPaysage, Notion2de):
    """La base d'une paysage du lot G1.

    ⛔ Marge ≥ 3 % de la largeur sur les 4 côtés (Frédéric, 24/10 : « relis
    bien tes écrans pour ne pas rogner ») : la colonne de droite s'arrête à
    DROITE, Ti-Margo est posé à 0,45 du coin ; contrôle après chaque rendu :
    python scripts/verifier-bords-video.py <mp4>."""

    def col(self, mob, y, xl=None):
        xl = self.XL if xl is None else xl
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > DROITE:
            mob.scale_to_fit_width(DROITE - xl).align_to(P(xl, 0), LEFT)
        return mob

    def finale(self, textes, ys, fs=36):
        """« Ce que tu as appris » : titre EN HAUT, CENTRÉ (Frédéric, 24/10),
        à 0,5 du bord (marge ≥ 3 %) ; les lignes sont renvoyées, montrées au mot."""
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)), run_time=0.7)
        lignes = VGroup()
        for morceaux, y in zip(textes, ys):
            bloc = VGroup(*[self.t(s, fs) for s in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
            lg = VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.3)
            lignes.add(self.col(lg, y))
        return lignes

    def ligne2(self, gauche, droite, y, fs=42, xl=None, maxi=None):
        """Une ligne de calcul « gauche = droite » posée dans la colonne et bornée
        (jamais un morceau ajouté au bout avec next_to : il déborderait). Renvoie
        (partie gauche, partie droite), à montrer l'une après l'autre."""
        lg = self.ligne(list(gauche) + list(droite), fs)
        self.col(lg, y, xl)
        lim = (DROITE if maxi is None else maxi) - (self.XL if xl is None else xl)
        if lg.width > lim:
            lg.scale_to_fit_width(lim).align_to(P(self.XL if xl is None else xl, 0), LEFT)
        n = len(gauche)
        return lg[:n], lg[n:]

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        return m


class Short2de(MotsCales2de, QuestionPause, OutilsShort, Short6e):
    """La base d'un short du lot G1 (compte à rebours de 3 s)."""

    DUREE_REBOURS = 3

    def question_short(self, cle_q, cle_r, question, choix, bonne, explication, y0=2.0, fs_q=28,
                       mots=("A :", "B :", "C :"), geste=None, avant_choix=None, efface=()):
        """La question-pause d'un short (cadre 4,5 × 8) : « Question ! » et le
        compte à rebours (3 s) côte à côte en haut, la question, les 3 cartes en
        rangée, puis la réponse (allumée, agrandie, rétrécie) et UNE phrase.
        `efface` : ce qui disparaît au début (et revient à la fin). Renvoie t0."""
        t0 = self.renderer.time
        self.dire(cle_q)
        pp = picto_pause(0.36)
        tit = Text("Question !", font_size=34, color=ORANGE_RETENUE, weight=BOLD)
        entete = VGroup(pp, tit).arrange(RIGHT, buff=0.16).move_to(P(-0.4, y0))
        self.au_mot("Question")
        self.play(FadeIn(pp, scale=1.4), Write(tit), *[FadeOut(m) for m in efface], run_time=0.5)
        q = self.borne(VGroup(*[Text(l, font_size=fs_q, color=WHITE) for l in question]).arrange(DOWN, buff=0.08))
        q.next_to(entete, DOWN, buff=0.22).set_x(0)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        if avant_choix is not None:
            avant_choix()
        cartes = VGroup(*[self.carte_choix(l, c, 1.9, fs=44).scale(0.66) for l, c in zip("ABC", choix)])
        cartes.arrange(RIGHT, buff=0.12).next_to(q, DOWN, buff=0.25).set_x(0)
        self.borne(cartes, 0.35)
        for c, m in zip(cartes, mots):
            self.au_mot(m)
            self.play(FadeIn(c, shift=UP * 0.2), run_time=0.3)
        self.au_mot("Mets pause")
        # « Mets pause, et choisis ! » prend la place du titre, le compte à rebours à sa droite
        pause = VGroup(Text("Mets pause,", font_size=22, color=ORANGE_RETENUE),
                       Text("et choisis !", font_size=22, color=ORANGE_RETENUE)).arrange(DOWN, aligned_edge=LEFT,
                                                                                         buff=0.04)
        pause.next_to(pp, RIGHT, buff=0.16)
        self.play(FadeOut(tit, shift=UP * 0.12), FadeIn(pause, shift=UP * 0.12), run_time=0.3)
        self.attendre_voix(marge=0.15)
        rb = self.rebours(P(pause.get_right()[0] + 0.45, y0), rayon=0.26)
        self.dire(cle_r)
        bon = cartes[bonne]
        autres = [c for i, c in enumerate(cartes) if i != bonne]
        self.play(FadeOut(rb), FadeOut(pause), FadeIn(tit), *[c.animate.set_opacity(0.3) for c in autres],
                  bon[0].animate.set_fill(VERT_CARTE).set_stroke(VERT_OK, width=6),
                  bon[1].animate.set_fill(VERT_OK), run_time=0.4)
        self.play(bon.animate.scale(1.2), run_time=0.22)
        self.play(bon.animate.scale(1 / 1.2), run_time=0.22)
        # l'explication prend la place de la question (au-dessus des cartes)
        gestes = list(geste()) if geste is not None else []
        gestes.append(FadeOut(q))
        bas = q.get_top()[1]
        expl = VGroup()
        for ligne, couleur, extrait in explication:
            if extrait:
                self.au_mot(extrait)
            t = self.borne(Text(ligne, font_size=26, color=couleur))
            t.move_to(P(0, bas - t.height / 2))
            self.play(FadeIn(t, shift=UP * 0.12), *gestes, run_time=0.5 if gestes else 0.35)
            gestes = []
            expl.add(t)
            bas = t.get_bottom()[1] - 0.1
        self.attendre_voix(marge=0.6)
        self.play(FadeOut(VGroup(entete, cartes, expl)), *[FadeIn(m) for m in efface], run_time=0.4)
        return t0


def mmss(t):
    return f"{int(t // 60):02d}:{int(t % 60):02d}"
