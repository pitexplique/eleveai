# denombrement_pascal.py
# EleveAI — Maths Tle spé — paysage « La relation de Pascal et son triangle »
# (16:9), ceinture VERTE. Micro du coach : denombrement_pascal
# (lib/tutor-v4/questionBank/terminale-spe/maths/denombrement.bank.ts :
# relation de Pascal, triangle, lecture d'un coefficient). Short jumeau :
# denombrement_pascal_short.py.
#
# Clé de voix → écran :
#   · 00-accroche : la ville en damier, chez toi → le lycée, 3 est, 2 nord ;
#   · 01-titre    : page de garde, l'échelle ENTIÈRE (verte) ;
#   · 02-metier   : Mélissa, urbaniste, un carrefour embouteillé ;
#   · 03-grille   : les nombres de chemins se propagent (gauche + bas) ;
#   · 04-resultat : 10 chemins ; 5 déplacements dont 2 nord : 2 parmi 5 = 10 ;
#   · 05/05b      : question-pause n° 1 (grille 4 × 4 → B : 70) ;
#   · 06-triangle : la grille tourne d'un huitième de tour, le triangle se
#                   construit ligne par ligne, flèches des deux voisins ;
#   · 07-relation : k parmi n + k+1 parmi n = k+1 parmi n+1 ; 4 + 6 = 10 ;
#   · 08-pourquoi : n + 1 élèves dont Sam : choisi / pas choisi ;
#   · 09-arbre    : l'arbre succès / échec à 4 niveaux, 6 chemins à 2 succès ;
#   · 10/10b      : question-pause n° 2 (ligne 6 → A ; somme 64 = 2⁶) ;
#   · 11-piege    : le résultat descend d'une ligne ET avance d'un cran ;
#   · 12-appris   : « Ce que tu as appris », titre en haut et centré ;
#   · 13-abonne   : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
#
# Code couleur (lot dénombrement) : bleu = l'ordre compte, orange = sans ordre
# / combinaison, vert = résultat juste, rouge = piège ; jaune = les flèches
# d'addition (les deux voisins).
# ⛔ Pas de LaTeX : « k parmi n » = deux Text empilés entre grandes parenthèses.
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos / au_nb
#   (marques mot à mot : denombrement_pascal_marques.json).
#   Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run …
#
# Voix : manim/voix/terminale-denombrement-pascal.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/denombrement_pascal.py DenombrementPascalTerminale -o eleveai-maths-terminale-denombrement-pascal --media_dir manim/scripts/terminale/media-denombrement-pascal
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-pascal/

import math
import os
import sys
from itertools import product
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P, puissance  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

C = math.comb
# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
assert C(5, 2) == 10 and C(8, 4) == 70 and 4 * 4 == 16 and 2 ** 8 == 256
assert [C(6, k) for k in range(7)] == [1, 6, 15, 20, 15, 6, 1] and 2 ** 6 == 64
assert C(4, 1) + C(4, 2) == C(5, 2) == 10 and C(4, 2) == 6
assert C(5, 1) + C(5, 2) == C(6, 2) == 15 and C(6, 1) == 6
assert all(C(n, k) + C(n, k + 1) == C(n + 1, k + 1) for n in range(12) for k in range(n))

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6            # la colonne de droite (marge de 3 % : 0,43 du bord)
ORDRE, SANS_ORDRE = BLEU_CALCUL, ORANGE_RETENUE
FLECHE = JAUNE_TITRE
RUE = "#475569"
IMMEUBLE = "#1e293b"


def binom(n, k, fs=40, color=SANS_ORDRE):
    """« k parmi n » comme au bac : n au-dessus de k, entre grandes parenthèses.
    Morceaux : [0] « ( », [1] = VGroup(haut, bas), [2] « ) »."""
    haut = Text(str(n), font_size=fs, color=color)
    bas = Text(str(k), font_size=fs, color=color)
    pile = VGroup(haut, bas).arrange(DOWN, buff=0.1 * fs / 40)
    h = pile.height + 0.22 * fs / 40
    pg = Text("(", font_size=fs, color=color).stretch_to_fit_height(h).stretch_to_fit_width(0.16 * fs / 40)
    pd = Text(")", font_size=fs, color=color).stretch_to_fit_height(h).stretch_to_fit_width(0.16 * fs / 40)
    pg.next_to(pile, LEFT, buff=0.05 * fs / 40)
    pd.next_to(pile, RIGHT, buff=0.05 * fs / 40)
    for p in (pg, pd):
        p._pas_audit = True
    return VGroup(pg, pile, pd)


def personne(peau="#8d5524", habit=BLEU_CALCUL, cheveux="#1f1308", s=1.0, longs=False):
    """Un pictogramme simple : tête, cheveux, buste."""
    tete = Circle(radius=0.3, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    ch = Arc(radius=0.32, start_angle=0.2, angle=PI - 0.4, stroke_color=cheveux, stroke_width=10)
    ch.move_to(tete.get_top() + DOWN * 0.07)
    g = VGroup()
    if longs:
        g.add(RoundedRectangle(width=0.72, height=0.75, corner_radius=0.25, fill_color=cheveux, fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.88)))
    buste = RoundedRectangle(width=1.0, height=1.15, corner_radius=0.3, fill_color=habit, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    g.add(buste, tete, ch)
    return g.scale(s)


def maison(s=1.0, color="#F472B6"):
    mur = Square(0.6, fill_color=color, fill_opacity=1, stroke_width=0)
    toit = Polygon(P(-0.4, 0.3), P(0.4, 0.3), P(0, 0.62), fill_color="#B91C1C", fill_opacity=1, stroke_width=0)
    porte = Rectangle(width=0.16, height=0.28, fill_color="#3f2a14", fill_opacity=1, stroke_width=0)
    porte.align_to(mur, DOWN)
    return VGroup(mur, toit, porte).scale(s)


def lycee(s=1.0):
    corps = Rectangle(width=1.1, height=0.62, fill_color="#FDE68A", fill_opacity=1, stroke_width=0)
    fronton = Polygon(P(-0.62, 0.31), P(0.62, 0.31), P(0, 0.62), fill_color="#B45309", fill_opacity=1,
                      stroke_width=0)
    fen = VGroup(*[Rectangle(width=0.14, height=0.2, fill_color="#1e3a8a", fill_opacity=1, stroke_width=0)
                   .move_to(P(x, 0.05)) for x in (-0.35, 0, 0.35)])
    drapeau = VGroup(Line(P(0, 0.62), P(0, 0.95), stroke_width=2, color=GREY_B),
                     Rectangle(width=0.2, height=0.12, fill_color=BLEU_CALCUL, fill_opacity=1,
                               stroke_width=0).move_to(P(0.1, 0.89)))
    return VGroup(corps, fronton, fen, drapeau).scale(s)


def voiture_mini(color="#DC2626", s=1.0):
    caisse = RoundedRectangle(width=0.5, height=0.2, corner_radius=0.06, fill_color=color, fill_opacity=1,
                              stroke_width=0)
    toit = RoundedRectangle(width=0.26, height=0.12, corner_radius=0.04, fill_color=color, fill_opacity=1,
                            stroke_width=0).next_to(caisse, UP, buff=0)
    roues = VGroup(*[Dot(P(x, -0.1), radius=0.055, color="#111827") for x in (-0.15, 0.15)])
    return VGroup(caisse, toit, roues).scale(s)


class Damier:
    """La ville en damier : carrefours (i, j), i vers l'est, j vers le nord."""

    def __init__(self, ni, nj, origine, pas):
        self.ni, self.nj, self.o, self.pas = ni, nj, P(*origine), pas

    def N(self, i, j):
        return self.o + P(i * self.pas, j * self.pas)

    def rues(self, sw=10, color=RUE):
        g = VGroup()
        for j in range(self.nj + 1):
            g.add(Line(self.N(0, j), self.N(self.ni, j), stroke_width=sw, color=color))
        for i in range(self.ni + 1):
            g.add(Line(self.N(i, 0), self.N(i, self.nj), stroke_width=sw, color=color))
        return g

    def blocs(self):
        """Les immeubles entre les rues (petits carrés sombres)."""
        g = VGroup()
        for i in range(self.ni):
            for j in range(self.nj):
                g.add(Square(self.pas * 0.62, fill_color=IMMEUBLE, fill_opacity=1, stroke_width=0)
                      .move_to(self.N(i + 0.5, j + 0.5)))
        return g

    def chemin(self, pas_ej, color=VERT_OK, sw=8):
        """pas_ej : suite de 'E' / 'N'. Renvoie la ligne brisée."""
        i = j = 0
        pts = [self.N(0, 0)]
        for d in pas_ej:
            i, j = (i + 1, j) if d == "E" else (i, j + 1)
            pts.append(self.N(i, j))
        return VMobject(stroke_color=color, stroke_width=sw).set_points_as_corners(pts)


class OutilsDenombrement(AuditSynchro, MotsCales, Notion6e):
    """Les outils communs (paysage) : textes, colonne, calage mot à mot,
    question-pause. denombrement_defi.py s'en sert aussi."""

    identite = "Maths Tle — EleveAI"

    def t(self, texte, fs=36, color=WHITE, larg=None, audit=True):
        t = Text(texte, font_size=fs, color=color)
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
        if not audit:
            t._pas_audit = True
        return t

    def col(self, mob, y, xl=XL):
        """La colonne de droite : alignée à gauche sur xl, jamais près du bord."""
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > BORD_X:
            mob.scale_to_fit_width(BORD_X - xl).align_to(P(xl, 0), LEFT)
        if mob.get_bottom()[1] < -1.95 and mob.get_right()[0] > 5.3:  # Ti-Margo
            mob.scale_to_fit_width(5.3 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def ligne(self, *morceaux, y, xl=XL, buff=0.15):
        g = VGroup(*morceaux).arrange(RIGHT, buff=buff)
        return self.col(g, y, xl)

    def insister(self, mob, k=1.35, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def pastille_num(self, k, color=BLEU_CALCUL, r=0.24):
        """Le numéro d'une ligne de rédaction (pas un nombre dit)."""
        n = Text(str(k), font_size=30, color=BLACK, weight=BOLD)
        n._pas_audit = True
        return VGroup(Circle(radius=r, fill_color=color, fill_opacity=1, stroke_width=0), n)

    def add_mascotte(self, scale=0.5):
        """Ti-Margo dans le coin bas-droit, à 0,45 du bord (3 % de la largeur)."""
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        self._margo = m
        return m

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def au_pos(self, i):
        """Attend l'instant où la voix dit le mot à la position i."""
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > -0.02:
            self.wait(max(reste, 0) + 0.07)  # + 1 image : jamais une image d'avance

    def trouver(self, extrait, n=1, depuis=0):
        i = depuis - 1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix {self._cle_voix}")
        return i

    def au_mot(self, extrait, n=1):
        self.au_pos(self.trouver(extrait, n))

    def au_nb(self, contexte, nb, n=1):
        """Attend le NOMBRE nb dit juste après la n-ième occurrence de contexte."""
        i = self.trouver(contexte, n)
        j = self._texte_voix.find(nb, i)
        assert j >= 0, (contexte, nb)
        self.au_pos(j)

    def reveler(self, morceaux, depuis, run_time=0.15):
        """Chaque morceau (Text « 15, ») apparaît quand la voix dit son nombre,
        dans l'ordre, à partir de la position depuis. Renvoie la position atteinte."""
        i = depuis
        for m in morceaux:
            nb = m.original_text.strip(" ,.:")
            j = self._texte_voix.find(nb, i)
            assert j >= 0, (nb, self._cle_voix)
            self.au_pos(j)
            self.play(FadeIn(m, shift=UP * 0.08), run_time=run_time)
            i = j + len(nb)
        return i

    def _bords(self):
        super()._bords()
        margo = getattr(self, "_margo", None)
        if margo is None or margo not in self.mobjects:
            return
        for m in self.mobjects:
            if m is margo or m.width == 0 or m.width > 9:
                continue
            if m.get_right()[0] > margo.get_left()[0] - 0.05 and m.get_bottom()[1] < margo.get_top()[1] + 0.05:
                print(f"MARGO {getattr(self, '_cle_voix', '?')} t={self.renderer.time:.1f} {type(m).__name__} "
                      f"x[{m.get_left()[0]:.2f}, {m.get_right()[0]:.2f}] y[{m.get_bottom()[1]:.2f}, "
                      f"{m.get_top()[1]:.2f}]", flush=True)

    # ── la question-pause (modèle : convexite_tangente.py) ─────────────────

    def morceaux(self, texte, fs=32, color=WHITE):
        """« 4 + 120, soit 124 » → un Text par mot (les nombres apparaîtront à
        leur mot)."""
        return VGroup(*[Text(m, font_size=fs, color=color) for m in texte.split()]).arrange(RIGHT, buff=0.14)

    def carte_choix(self, lettre, corps, largeur=4.3, fs=32):
        rond = Circle(radius=0.25 * fs / 32, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        l._pas_audit = True
        c = corps if isinstance(corps, Mobject) else self.morceaux(corps, fs)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 0.4:
            ligne.scale_to_fit_width(largeur - 0.4)
        cadre = RoundedRectangle(width=largeur, height=max(0.72, ligne.height + 0.28), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def q_tete(self, question, choix, xl=XL, largeur=4.3, fs_q=34, y_tete=3.15):
        """« Question ! » + compte à rebours, la question (lignes), les cartes,
        la consigne. Rien n'est joué ici."""
        tete = VGroup(pastille_pause(0.38), self.t("Question !", 38, ORANGE_RETENUE)).arrange(RIGHT, buff=0.22)
        self.col(tete, y_tete, xl)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(tete, RIGHT, buff=0.35)
        if rebours.get_right()[0] > BORD_X:
            rebours.shift(LEFT * (rebours.get_right()[0] - BORD_X))
        q = VGroup(*[x if isinstance(x, Mobject) else self.t(x, fs_q) for x in question])
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(q, 0, xl)
        q.align_to(P(0, tete.get_bottom()[1] - 0.25), UP)
        cartes = VGroup(*[self.carte_choix(l, c, largeur) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.16)
        self.col(cartes, 0, xl)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        pause = self.col(self.t("Mets pause, et choisis !", 32, ORANGE_RETENUE), cartes.get_bottom()[1] - 0.45, xl)
        return tete, q, cartes, pause, rebours

    def q_montrer_choix(self, cartes):
        """Chaque carte À SA LETTRE ; ses nombres un à un, quand la voix les dit
        (un corps marqué _bloc apparaît d'un coup, à son dernier nombre)."""
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            assert i >= 0, L
            self.au_pos(i)
            corps = c[1][1]
            if getattr(corps, "_bloc", False):
                chiffres = [m for m in corps.get_family() if isinstance(m, Text)
                            and any(ch.isdigit() for ch in m.original_text)]
                self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
                fin = max(voix.find(m.original_text.strip(" ,."), i + 3) for m in chiffres)
                self.au_pos(fin)
                self.play(FadeIn(corps, scale=1.2), run_time=0.2)
                continue
            mots = [m for m in corps if not any(ch.isdigit() for ch in m.original_text)]
            chiffres = [m for m in corps if m not in mots]
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), *[FadeIn(m) for m in mots], run_time=0.2)
            self.reveler(chiffres, i + 3, run_time=0.12)

    def q_pause(self, pause, rebours, cle_q, t0, bonne):
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)

    def q_reponse(self, cartes, bonne, pause, rebours):
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.25)
        ok = self.coche(VERT_OK, 0.2).move_to(b[0].get_right() + LEFT * 0.35)
        self.play(b.animate.scale(1.12), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.12), ok.animate.scale(1 / 1.12, about_point=b.get_center()), run_time=0.25)
        return ok

    def ecran_appris_lignes(self, cle, lignes_txt, mots):
        """« Ce que tu as appris » : titre en haut et centré, une coche par ligne.
        lignes_txt : Mobject par ligne ; mots : l'extrait de voix de chaque ligne
        (ou une liste d'extraits, un par morceau de la ligne)."""
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire(cle)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP) for b in lignes_txt])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if lignes.width > 11.2:
            lignes.scale_to_fit_width(11.2)
        if lignes.height > 5.2:
            lignes.scale_to_fit_height(5.2)
        lignes.move_to(P(-0.5, -0.2))
        for lg, mot in zip(lignes, mots):
            if isinstance(mot, (list, tuple)):
                self.au_mot(mot[0])
                self.play(Create(lg[0]), FadeIn(lg[1][0], shift=RIGHT * 0.2), run_time=0.3)
                for k, m in enumerate(mot[1:], start=1):
                    self.au_mot(m)
                    self.play(FadeIn(lg[1][k], shift=RIGHT * 0.15), run_time=0.25)
            else:
                self.au_mot(mot)
                self.play(Create(lg[0]), FadeIn(lg[1], shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.8)

    def page_abonnement(self, voix):
        """La fin (règle du 19/10, identique aux modèles)."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK, audit=False).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def page_garde(self, cle, titre, sous, mot_titre, mot_sous, dessin=None):
        """Page de garde : titre, sous-titre, identité, l'échelle ENTIÈRE."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(cle)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t(titre, 56, JAUNE_TITRE, larg=12.4).to_edge(UP, buff=0.55)
        self.au_mot(mot_titre)
        self.play(Write(tit), run_time=0.7)
        st = self.t(sous, 42, SANS_ORDRE, larg=11).next_to(tit, DOWN, buff=0.25)
        ident = self.t(self.identite, 26, GREY_A).next_to(st, DOWN, buff=0.2)
        self.au_mot(mot_sous)
        self.play(FadeIn(st, shift=UP * 0.15), FadeIn(ident), run_time=0.45)
        if dessin is not None:
            self.play(FadeIn(dessin, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.9)


def badge(n, color=WHITE, fs=34, r=0.33, audit=True):
    """Le nombre de chemins posé sur un carrefour."""
    rond = Circle(radius=r, fill_color=FOND_CARTE, fill_opacity=1, stroke_color=color, stroke_width=3)
    t = Text(str(n), font_size=fs, color=color)
    if t.width > 1.6 * r:
        t.scale_to_fit_width(1.6 * r)
    if not audit:
        t._pas_audit = True
    return VGroup(rond, t.move_to(rond))


def triangle_pascal(nl, centre_haut, dx=0.62, dy=0.55, fs=30, color=WHITE, audit=True):
    """Le triangle, lignes 0 à nl − 1 : liste de lignes (VGroup de Text)."""
    lignes = []
    for n in range(nl):
        g = VGroup()
        for k in range(n + 1):
            t = Text(str(C(n, k)), font_size=fs, color=color)
            if not audit:
                t._pas_audit = True
            t.move_to(P(*centre_haut) + P((k - n / 2) * dx, -n * dy))
            g.add(t)
        lignes.append(g)
    return lignes


class DenombrementPascalBase(OutilsDenombrement):
    fichier_marques = "denombrement_pascal_marques.json"
    nom_voix = "terminale-denombrement-pascal"
    ceinture = "verte"

    # ── 00 : la ville en damier ─────────────────────────────────────────────

    def ecran_accroche(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("00-accroche")
        d = Damier(3, 2, (-5.0, -2.2), 1.6)
        self.au_mot("ville en damier")
        self.play(LaggedStart(*[Create(r) for r in d.rues()], lag_ratio=0.08), FadeIn(d.blocs()), run_time=0.8)
        self.au_mot("chez toi")
        m = maison(0.9).move_to(d.N(0, 0) + P(-0.55, -0.2))
        lm = self.t("chez toi", 26, "#F472B6").next_to(m, DOWN, buff=0.08)
        self.play(FadeIn(m, shift=DOWN * 0.2), FadeIn(lm), run_time=0.4)
        self.au_mot("au lycée")
        ly = lycee(0.95).move_to(d.N(3, 2) + P(0.55, 0.45))
        ll = self.t("lycée", 26, "#FDE68A").next_to(ly, LEFT, buff=0.12)
        self.play(FadeIn(ly, shift=DOWN * 0.2), FadeIn(ll), run_time=0.4)
        f_est = Arrow(d.N(0, 0) + DOWN * 0.45, d.N(3, 0) + DOWN * 0.45, buff=0, color=BLEU_CALCUL, stroke_width=5)
        f_nord = Arrow(d.N(0, 0) + LEFT * 0.35 + UP * 0.25, d.N(0, 2) + LEFT * 0.35, buff=0, color=ORANGE_RETENUE,
                       stroke_width=5)
        l1 = self.ligne(self.t("3 rues vers l'est", 36, BLEU_CALCUL), y=1.6, xl=1.9)
        l2 = self.ligne(self.t("2 rues vers le nord", 36, ORANGE_RETENUE), y=0.9, xl=1.9)
        self.au_mot("3 rues")
        self.play(GrowArrow(f_est), FadeIn(l1, shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("2 rues")
        self.play(GrowArrow(f_nord), FadeIn(l2, shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("sans jamais")
        l3 = self.ligne(self.t("sans jamais revenir en arrière", 32, GREY_A), y=0.2, xl=1.9)
        c1 = d.chemin("EENEN", VERT_OK, 8)
        c2 = d.chemin("NNEEE", JAUNE_TITRE, 8).shift(P(0.08, 0.08))
        self.play(FadeIn(l3, shift=RIGHT * 0.15), Create(c1), run_time=1.0)
        self.play(Create(c2), run_time=1.0)
        self.au_mot("Combien")
        q = VGroup(self.t("Combien de chemins", 38, VERT_OK), self.t("différents ?", 38, VERT_OK))
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(q, -1.0, 1.9)
        q.scale_to_fit_width(min(q.width, 4.3)).align_to(P(1.9, 0), LEFT)
        self.play(FadeIn(q, scale=1.2), run_time=0.45)
        self.insister(q, 1.08)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 01 : page de garde ─────────────────────────────────────────────────

    def ecran_titre(self):
        tri = VGroup(*triangle_pascal(5, (-0.6, 0.85), dx=0.62, dy=0.5, fs=30, color=GREY_A, audit=False))
        self.page_garde("01-titre", "La relation de Pascal", "et son triangle", "La relation", "triangle", tri)

    # ── 02 : Mélissa, urbaniste ────────────────────────────────────────────

    def ecran_metier(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("02-metier")
        mel = personne(peau="#c68642", habit=VERT_OK, cheveux="#2b1a0e", s=0.85, longs=True).move_to(P(-5.4, 2.3))
        nom = self.t("Mélissa", 42, VERT_OK).move_to(P(0, 2.75)).align_to(P(-4.6, 0), LEFT)
        met = self.t("urbaniste", 34).move_to(P(0, 2.1)).align_to(P(-4.6, 0), LEFT)
        self.au_mot("Mélissa")
        self.play(FadeIn(mel, shift=UP * 0.2), FadeIn(nom, shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("urbaniste")
        self.play(FadeIn(met, shift=RIGHT * 0.15), run_time=0.4)
        # le carrefour : deux avenues qui se croisent en (1,8 ; −0,6)
        cx, cy = 1.8, -0.6
        av = VGroup(Rectangle(width=7.0, height=0.9, fill_color=RUE, fill_opacity=1, stroke_width=0).move_to(P(cx, cy)),
                    Rectangle(width=0.9, height=4.4, fill_color=RUE, fill_opacity=1, stroke_width=0).move_to(P(cx, cy + 0.6)))
        traits = VGroup(*[DashedLine(P(cx - 3.4, cy), P(cx + 3.4, cy), dash_length=0.2, color=WHITE, stroke_width=2),
                          DashedLine(P(cx, cy - 1.6), P(cx, cy + 2.8), dash_length=0.2, color=WHITE, stroke_width=2)])
        self.au_mot("circulation")
        self.play(FadeIn(av), Create(traits), run_time=0.6)
        self.bring_to_front(margo)
        self.au_mot("beaucoup de chemins")
        couleurs = [BLEU_CALCUL, JAUNE_TITRE, VIOLET_ACCENT, "#F472B6", ORANGE_RETENUE]
        fl = VGroup(
            *[CurvedArrow(P(x0, y0), P(cx, cy) + P(dx, dy), angle=a, color=c, stroke_width=4, tip_length=0.18)
              for (x0, y0, dx, dy, a), c in zip([(-2.0, 1.3, -0.5, 0.2, -0.6), (-2.2, -2.6, -0.5, -0.2, 0.6),
                                                  (4.4, 1.6, 0.2, 0.5, 0.5), (-1.0, 0.9, -0.3, 0.45, -0.3),
                                                  (4.4, -2.2, 0.5, -0.2, -0.5)], couleurs)])
        self.play(LaggedStart(*[Create(f) for f in fl], lag_ratio=0.15), run_time=0.9)
        self.au_mot("embouteillages")
        autos = VGroup(*[voiture_mini(c, 0.8).move_to(P(cx + dx, cy + dy)) for c, (dx, dy) in zip(
            ["#DC2626", "#2563EB", "#F59E0B", "#DC2626", "#10B981", "#9333EA"],
            [(-0.75, -0.2), (-1.4, -0.2), (-2.05, -0.2), (0.75, 0.2), (1.4, 0.2), (2.05, 0.2)])])
        bouchon = self.t("embouteillage !", 34, ROUGE_ERREUR).move_to(P(cx + 2.4, cy + 1.25))
        self.play(LaggedStart(*[FadeIn(a, shift=RIGHT * 0.3) for a in autos], lag_ratio=0.1),
                  FadeIn(bouchon, scale=1.3), run_time=0.7)
        self.play(Wiggle(autos, scale_value=1.05), run_time=0.6)
        self.au_mot("Elle compte")
        cpt = self.t("Elle compte les chemins,", 30, VERT_OK).move_to(P(0, -3.05)).align_to(P(-5.9, 0), LEFT)
        self.play(FadeIn(cpt, shift=UP * 0.1), FadeOut(fl), run_time=0.45)
        self.au_mot("carrefour par carrefour")
        cpt2 = self.t("carrefour par carrefour.", 30, VERT_OK).next_to(cpt, RIGHT, buff=0.15)
        b = badge("?", JAUNE_TITRE, 34, 0.32, audit=False).move_to(P(cx, cy))
        self.play(FadeIn(cpt2, shift=UP * 0.1), FadeIn(b, scale=1.6), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 03 : la grille, les nombres se propagent ───────────────────────────

    def place_pour_coche(self, cartes, marge=1.0):
        """Les trois cartes à la MÊME taille de police, le texte s'arrêtant à
        « marge » du bord droit : la coche de la bonne réponse a sa place."""
        lim = cartes[0][0].width - 0.2 - marge
        ech = [c[1][0][0].width / 0.5 for c in cartes]          # l'échelle du rond (rayon 0,25)
        s = min(min(1.0, lim / (c[1].width / e)) for c, e in zip(cartes, ech))
        for c, e in zip(cartes, ech):
            c[1].scale(s / e, about_edge=LEFT)

    def q_reponse(self, cartes, bonne, pause, rebours):
        """La coche FINIT à 0,35 du bord droit de la carte : posée sur la carte
        agrandie, elle rétrécit avec elle (elle ne glisse plus sur le texte)."""
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.25)
        k = 1.12
        c = b.get_center()
        ok = self.coche(VERT_OK, 0.2 * k).move_to(c + (b[0].get_right() + LEFT * 0.35 - c) * k)
        self.play(b.animate.scale(k), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / k), ok.animate.scale(1 / k, about_point=c), run_time=0.25)
        return ok

    def grille(self):
        return Damier(3, 2, (-5.2, -2.45), 1.95)

    def ecran_grille(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("03-grille")
        d = self.grille()
        m = maison(0.6).move_to(d.N(0, 0) + P(-0.35, -0.55))
        ly = lycee(0.6).move_to(d.N(3, 2) + P(0.0, 0.62))
        self.play(FadeIn(d.rues(8)), FadeIn(d.blocs()), FadeIn(m), FadeIn(ly), run_time=0.5)
        self.bring_to_front(margo)
        self.badges = {}

        def pose(i, j, n, color=WHITE, audit=True):
            b = badge(n, color, audit=audit).move_to(d.N(i, j))
            self.badges[(i, j)] = b
            return b

        self.au_mot("1 façon")
        b0 = pose(0, 0, 1, VERT_OK)
        l1 = self.ligne(self.t("Départ : 1 façon", 34), y=2.6, xl=1.45)
        self.play(FadeIn(b0, scale=1.6), FadeIn(l1, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("bord du bas")
        bas = [pose(i, 0, 1) for i in (1, 2, 3)]
        self.play(LaggedStart(*[FadeIn(b, scale=1.5) for b in bas], lag_ratio=0.25), run_time=0.7)
        self.au_mot("bord de gauche")
        gau = [pose(0, j, 1) for j in (1, 2)]
        self.play(LaggedStart(*[FadeIn(b, scale=1.5) for b in gau], lag_ratio=0.25), run_time=0.5)
        self.au_mot("1 seule façon")
        l2 = self.ligne(self.t("Bords : 1 seule façon", 34), y=1.95, xl=1.45)
        self.play(FadeIn(l2, shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("tout droit")
        droit = VGroup(Line(d.N(0, 0), d.N(3, 0), color=VERT_OK, stroke_width=8),
                       Line(d.N(0, 0), d.N(0, 2), color=VERT_OK, stroke_width=8)).set_opacity(0.6)
        self.add(droit)
        self.bring_to_front(*[self.badges[k] for k in self.badges])
        self.play(Indicate(droit, color=VERT_OK, scale_factor=1.0), run_time=0.6)
        self.play(FadeOut(droit), run_time=0.3)
        self.au_mot("autre carrefour")
        cible = Circle(radius=0.42, color=JAUNE_TITRE, stroke_width=5).move_to(d.N(1, 1))
        l3 = self.ligne(self.t("Ailleurs : on arrive", 34), y=1.2, xl=1.45)
        self.play(Create(cible), FadeIn(l3, shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("par la gauche")
        fg = Arrow(d.N(0, 1) + RIGHT * 0.3, d.N(1, 1) + LEFT * 0.4, buff=0, color=FLECHE, stroke_width=7)
        l4 = self.ligne(self.t("par la gauche", 34, FLECHE), y=0.6, xl=1.75)
        self.play(GrowArrow(fg), FadeIn(l4, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("par le bas")
        fb = Arrow(d.N(1, 0) + UP * 0.3, d.N(1, 1) + DOWN * 0.4, buff=0, color=FLECHE, stroke_width=7)
        l5 = self.ligne(self.t("OU par le bas", 34, FLECHE), y=0.05, xl=1.75)
        self.play(GrowArrow(fb), FadeIn(l5, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("Deux cas disjoints")
        l6 = self.ligne(self.t("deux cas disjoints :", 34), y=-0.65, xl=1.45)
        self.play(FadeIn(l6, shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("on additionne")
        l7 = self.ligne(self.t("on additionne", 38, VERT_OK), y=-1.25, xl=1.45)
        self.play(FadeIn(l7, scale=1.2), run_time=0.35)
        self.au_mot("1 plus")
        s1 = self.t("1 + 1", 40, FLECHE)
        s1b = self.t("= 2", 40, VERT_OK)
        self.ligne(s1, s1b, y=-1.95, xl=1.45, buff=0.25)
        self.play(FadeIn(s1, shift=UP * 0.1), run_time=0.3)
        self.au_nb("1 plus 1", "2")
        b11 = pose(1, 1, 2, VERT_OK)
        self.play(FadeIn(s1b, shift=UP * 0.1), FadeOut(cible), FadeIn(b11, scale=1.7), run_time=0.4)
        self.au_mot("2 plus")
        fg2 = Arrow(d.N(1, 1) + RIGHT * 0.3, d.N(2, 1) + LEFT * 0.4, buff=0, color=FLECHE, stroke_width=7)
        fb2 = Arrow(d.N(2, 0) + UP * 0.3, d.N(2, 1) + DOWN * 0.4, buff=0, color=FLECHE, stroke_width=7)
        s2 = self.t("2 + 1", 40, FLECHE)
        s2b = self.t("= 3", 40, VERT_OK)
        self.ligne(s2, s2b, y=-2.65, xl=1.45, buff=0.25)
        self.play(FadeOut(fg), FadeOut(fb), GrowArrow(fg2), GrowArrow(fb2), FadeIn(s2, shift=UP * 0.1), run_time=0.35)
        self.au_nb("2 plus 1", "3")
        b21 = pose(2, 1, 3, VERT_OK)
        self.play(FadeIn(s2b, shift=UP * 0.1), FadeIn(b21, scale=1.7), run_time=0.4)
        # « Et ainsi de suite » : la figure se remplit D'UN COUP, sur ces mots
        # (4, 3, 6 ne sont pas dits : ils n'apparaissent pas avant la phrase).
        self.au_mot("ainsi de suite")
        restes = [pose(i, j, C(i + j, i), WHITE, audit=False) for (i, j) in [(3, 1), (1, 2), (2, 2)]]
        bq = pose(3, 2, "?", JAUNE_TITRE, audit=False)
        self.play(FadeOut(fg2), FadeOut(fb2), LaggedStart(*[FadeIn(b, scale=1.6) for b in restes + [bq]],
                                                          lag_ratio=0.15), run_time=0.6)
        self.attendre_voix(marge=0.5)
        self.d = d
        self.decor = VGroup(d.rues(8), d.blocs(), m, ly)

    # ── 04 : 10 chemins, et pourquoi : 2 parmi 5 ───────────────────────────

    def case_dep(self, sens, cote=0.62):
        """Une case de déplacement : flèche → (est, bleu) ou ↑ (nord, orange)."""
        c = BLEU_CALCUL if sens == "E" else ORANGE_RETENUE
        sq = RoundedRectangle(width=cote, height=cote, corner_radius=0.08, stroke_color=c, stroke_width=3,
                              fill_color=FOND_CARTE, fill_opacity=1)
        v = RIGHT if sens == "E" else UP
        f = Arrow(sq.get_center() - v * cote * 0.3, sq.get_center() + v * cote * 0.3, buff=0, color=c,
                  stroke_width=6, max_tip_length_to_length_ratio=0.45)
        return VGroup(sq, f)

    def ecran_resultat(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("04-resultat")
        d = self.d
        self.add(self.decor, *[b for k, b in self.badges.items() if k != (3, 2)])
        self.bring_to_front(margo)
        self.au_mot("10 chemins")
        b10 = badge(10, VERT_OK, 32).move_to(d.N(3, 2))
        l1 = self.ligne(self.t("Au lycée :", 36), self.t("10 chemins", 40, VERT_OK), y=2.75, xl=1.6)
        self.play(FadeIn(b10, scale=1.8), FadeIn(l1, shift=RIGHT * 0.1), run_time=0.45)
        self.insister(b10, 1.4)
        self.au_mot("Pourquoi")
        l2 = self.ligne(self.t("Pourquoi 10 ?", 36, JAUNE_TITRE), y=2.05, xl=1.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("Un chemin")
        sens = "ENEEN"
        ch = d.chemin(sens, VERT_OK, 9)
        self.add(ch)
        self.bring_to_front(*self.badges.values(), b10)
        self.play(Create(ch), run_time=0.9)
        self.au_mot("5 déplacements")
        cases = VGroup(*[self.case_dep(s) for s in sens]).arrange(RIGHT, buff=0.14)
        self.col(cases, 1.05, 1.9)
        l3 = self.ligne(self.t("5 déplacements", 34), y=0.35, xl=1.9)
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.15) for c in cases], lag_ratio=0.12),
                  FadeIn(l3, shift=RIGHT * 0.1), run_time=0.6)
        self.au_nb("dont", "2")
        nords = VGroup(*[cases[i] for i, s in enumerate(sens) if s == "N"])
        l4 = self.ligne(self.t("dont 2 vers le nord", 34, ORANGE_RETENUE), y=-0.3, xl=1.9)
        self.play(FadeIn(l4, shift=RIGHT * 0.1), *[Indicate(n, color=ORANGE_RETENUE, scale_factor=1.3) for n in nords],
                  run_time=0.6)
        self.au_mot("choisir la place")
        anneaux = VGroup(*[Circle(radius=0.42, color=ORANGE_RETENUE, stroke_width=4).move_to(n) for n in nords])
        l5 = self.ligne(self.t("on choisit leurs 2 places", 32), y=-1.0, xl=1.9)
        self.play(Create(anneaux), FadeIn(l5, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("parmi les 5")
        l6 = self.ligne(self.t("parmi les 5 :", 32), y=-1.55, xl=1.9)
        self.play(FadeIn(l6, shift=RIGHT * 0.1), run_time=0.35)
        self.au_nb("2 parmi", "5", n=1)
        bn = binom(5, 2, 44)
        eg = self.t("= 10", 48, VERT_OK)
        res = self.ligne(bn, eg, y=-2.55, xl=2.0, buff=0.25)
        self.play(FadeIn(bn, scale=1.3), run_time=0.35)
        self.au_mot("égale 10")
        self.au_pos(self.trouver("10", 1, self.trouver("égale")))
        cad = SurroundingRectangle(res, color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(FadeIn(eg, scale=1.3), Create(cad), run_time=0.4)
        self.insister(VGroup(res, cad), 1.1)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 05 : question-pause n° 1 : la grille 4 × 4 ─────────────────────────

    def ecran_question1(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("05-question")
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Grille : 4 rues vers l'est", "et 4 rues vers le nord.", "Combien de chemins ?"],
            ["16", "70", "256"], xl=1.6, largeur=3.6)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        d = Damier(4, 4, (-5.7, -1.3), 0.98)
        m = maison(0.5).move_to(d.N(0, 0) + P(-0.15, -0.45))
        ly = lycee(0.5).move_to(d.N(4, 4) + P(0.05, 0.42))
        self.au_mot("4 rues vers l'est")
        fe = Arrow(d.N(0, 0) + DOWN * 0.55, d.N(4, 0) + DOWN * 0.55, buff=0, color=BLEU_CALCUL, stroke_width=5)
        self.play(FadeIn(d.rues(7)), FadeIn(d.blocs()), FadeIn(m), FadeIn(ly), GrowArrow(fe),
                  FadeIn(q[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("4 rues vers le nord")
        fn = Arrow(d.N(0, 0) + LEFT * 0.3 + UP * 0.25, d.N(0, 4) + LEFT * 0.3, buff=0, color=ORANGE_RETENUE,
                   stroke_width=5)
        self.play(GrowArrow(fn), FadeIn(q[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("combien de chemins")
        self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.35)
        self.q_montrer_choix(cartes)
        self.bring_to_front(margo)
        self.q_pause(pause, rebours, "05-question", t0, 1)
        self.dire("05b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        self.au_mot("8 déplacements")
        ch = d.chemin("ENNEENEN", VERT_OK, 8)
        e1 = self.t("8 déplacements,", 32).move_to(P(0, -2.2)).align_to(P(-6.1, 0), LEFT)
        self.play(Create(ch), FadeIn(e1, shift=RIGHT * 0.1), run_time=0.8)
        self.au_nb("dont", "4")
        e2 = self.t("dont 4 vers le nord :", 32, ORANGE_RETENUE).next_to(e1, RIGHT, buff=0.15)
        self.play(FadeIn(e2, shift=RIGHT * 0.1), run_time=0.35)
        self.au_nb("4 parmi", "8")
        bn = binom(8, 4, 38)
        eg = self.t("= 70", 42, VERT_OK)
        r = VGroup(bn, eg).arrange(RIGHT, buff=0.2).move_to(P(0, -2.95)).align_to(P(-6.0, 0), LEFT)
        self.play(FadeIn(bn, scale=1.3), run_time=0.3)
        self.au_mot("70")
        self.play(FadeIn(eg, scale=1.3), run_time=0.3)
        self.insister(r, 1.12)
        self.au_mot("16, c'est")
        p16 = self.morceaux("16 = 4 × 4", 34, ROUGE_ERREUR)
        p256 = VGroup(self.t("256 =", 34, ROUGE_ERREUR), puissance("2", "8", 34, ROUGE_ERREUR))
        p256.arrange(RIGHT, buff=0.15)
        p16.move_to(P(0, -2.95)).align_to(P(-3.0, 0), LEFT)
        p256.move_to(P(0, -2.95)).align_to(p16.get_right() + RIGHT * 0.5, LEFT)
        self.reveler(list(p16)[:1], self.trouver("16, c'est"))
        self.play(FadeIn(p16[1]), run_time=0.1)
        i = self.reveler([p16[2]], self.trouver("4 fois"))
        self.play(FadeIn(p16[3]), run_time=0.1)
        self.reveler([p16[4]], i)
        self.au_mot("256")
        self.play(FadeIn(p256[0], shift=UP * 0.08), run_time=0.15)
        self.au_mot("2 puissance")
        self.play(FadeIn(p256[1][0]), run_time=0.12)
        self.au_nb("puissance", "8")
        self.play(FadeIn(p256[1][1]), run_time=0.12)
        self.au_mot("sans tenir compte")
        bar = VGroup(Line(p16.get_left(), p16.get_right(), color=ROUGE_ERREUR, stroke_width=4),
                     Line(p256.get_left(), p256.get_right(), color=ROUGE_ERREUR, stroke_width=4))
        self.play(Create(bar), Indicate(ly, color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 06 : la grille tourne, le triangle se construit ────────────────────

    def ecran_triangle(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("06-triangle")
        d = self.d
        grille = VGroup(d.rues(8), d.blocs())
        cles = [k for k in self.badges if k != (3, 2)]
        nums = VGroup(*[self.badges[k] for k in cles], badge(10, VERT_OK, 32).move_to(d.N(3, 2)))
        cles.append((3, 2))
        for b in nums:
            for f in b.get_family():
                f._pas_audit = True
        tout = VGroup(grille, nums)
        tout.scale(0.55).move_to(P(-3.9, 0.2))
        self.add(tout)
        self.au_mot("Fais tourner")
        depart = tout.copy()
        centre = tout.get_center()

        def tourner(m, a):
            m.become(depart.copy())
            m.rotate(a * PI / 4, about_point=centre)
            for b in m[1]:
                b.rotate(-a * PI / 4)

        self.play(UpdateFromAlphaFunc(tout, tourner), run_time=1.4)
        self.au_mot("le triangle de Pascal")
        tit = self.t("Le triangle de Pascal", 44, JAUNE_TITRE).move_to(P(2.6, 3.1))
        ys = sorted({round(tout[1][cles.index(k)].get_center()[1], 3) for k in cles})
        diag = VGroup(*[DashedLine(P(-6.2, y), P(-1.7, y), dash_length=0.1, color=GREY_C, stroke_width=2)
                        .set_opacity(0.6) for y in ys])
        self.add(diag)
        self.bring_to_front(tout)
        self.play(Write(tit), Create(diag), run_time=0.6)
        lignes = triangle_pascal(5, (2.75, 2.15), dx=0.88, dy=0.82, fs=42)
        noms = VGroup()
        for n, lg in enumerate(lignes):
            i0 = self.trouver(f"Ligne {n} :")
            self.au_pos(i0 + len("Ligne "))
            nom = self.t(f"ligne {n}", 26, GREY_A).move_to(P(-0.55, lg.get_center()[1]))
            noms.add(nom)
            self.play(FadeIn(nom, shift=RIGHT * 0.1), run_time=0.08)
            self.reveler(list(lg), i0 + len(f"Ligne {n} :"), run_time=0.08)
        self.au_mot("Chaque nombre")
        r3, r4 = lignes[3], lignes[4]
        fl = VGroup(Arrow(r3[1].get_center(), r4[2].get_center(), buff=0.28, color=FLECHE, stroke_width=6),
                    Arrow(r3[2].get_center(), r4[2].get_center(), buff=0.28, color=FLECHE, stroke_width=6))
        self.play(GrowArrow(fl[0]), GrowArrow(fl[1]), run_time=0.4)
        self.au_mot("la somme")
        somme = self.ligne(self.t("3 + 3 = 6", 38, FLECHE), y=-2.35, xl=1.6)
        somme._pas_audit = True
        for f in somme.get_family():
            f._pas_audit = True
        self.play(Indicate(r4[2], color=VERT_OK, scale_factor=1.6), FadeIn(somme, shift=UP * 0.1), run_time=0.6)
        fl2 = VGroup(Arrow(r3[0].get_center(), r4[1].get_center(), buff=0.28, color=FLECHE, stroke_width=5),
                     Arrow(r3[1].get_center(), r4[1].get_center(), buff=0.28, color=FLECHE, stroke_width=5))
        self.au_mot("au-dessus")
        self.play(FadeOut(fl), GrowArrow(fl2[0]), GrowArrow(fl2[1]), Indicate(r4[1], color=VERT_OK, scale_factor=1.5),
                  run_time=0.6)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 07 : la relation de Pascal, et l'exemple 4 + 6 = 10 ────────────────

    def ecran_relation(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("07-relation")
        self.au_mot("la relation de Pascal")
        tit = self.t("La relation de Pascal", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.6)
        fs = 50
        a = binom("n", "k", fs)
        plus = self.t("+", fs)
        b = binom("n", "k + 1", fs)
        eg = self.t("=", fs)
        c = binom("n + 1", "k + 1", fs, VERT_OK)
        f = VGroup(a, plus, b, eg, c).arrange(RIGHT, buff=0.3).move_to(P(-0.4, 1.55))
        self.au_nb("k parmi", "n")
        self.play(FadeIn(a, scale=1.3), run_time=0.3)
        self.au_mot("plus k")
        self.play(FadeIn(plus), run_time=0.15)
        self.au_nb("plus 1 parmi", "n")
        self.play(FadeIn(b, scale=1.3), run_time=0.3)
        self.au_mot("égale k")
        self.play(FadeIn(eg), run_time=0.15)
        self.au_nb("parmi n plus", "1")
        cad = SurroundingRectangle(f, color=VERT_OK, buff=0.22, stroke_width=3)
        self.play(FadeIn(c, scale=1.3), Create(cad), run_time=0.4)
        self.insister(VGroup(f, cad), 1.06, 0.3)
        # l'exemple, et le triangle à droite
        lignes = triangle_pascal(5, (3.75, 0.35), dx=0.62, dy=0.5, fs=28, color=GREY_A, audit=False)
        tri = VGroup(*lignes)
        self.au_mot("Par exemple")
        ex = self.t("Par exemple :", 34, JAUNE_TITRE).move_to(P(0, -0.35)).align_to(P(-6.0, 0), LEFT)
        self.play(FadeIn(ex, shift=RIGHT * 0.1), FadeIn(tri), run_time=0.45)
        e1 = binom(4, 1, 38)
        p1 = self.t("+", 38)
        e2 = binom(4, 2, 38)
        e3 = self.morceaux("= 4 + 6 = 10", 38)
        e4 = VGroup(self.t("=", 38, VERT_OK), binom(5, 2, 38, VERT_OK)).arrange(RIGHT, buff=0.15)
        ligne = VGroup(e1, p1, e2, e3, e4).arrange(RIGHT, buff=0.2).move_to(P(0, -1.5)).align_to(P(-6.0, 0), LEFT)
        e3[-1].set_color(VERT_OK)
        self.au_nb("1 parmi", "4")
        self.play(FadeIn(e1, scale=1.3), Indicate(lignes[4][1], color=ORANGE_RETENUE, scale_factor=1.6), run_time=0.4)
        self.au_nb("2 parmi", "4")
        self.play(FadeIn(p1), FadeIn(e2, scale=1.3), Indicate(lignes[4][2], color=ORANGE_RETENUE, scale_factor=1.6),
                  run_time=0.4)
        self.play(lignes[4][1].animate.set_color(ORANGE_RETENUE), lignes[4][2].animate.set_color(ORANGE_RETENUE),
                  run_time=0.2)
        i = self.trouver("4 plus 6")
        self.play(FadeIn(e3[0]), run_time=0.1)
        self.reveler([e3[1]], i)
        self.play(FadeIn(e3[2]), run_time=0.1)
        i = self.reveler([e3[3]], i + 2)
        self.play(FadeIn(e3[4]), run_time=0.1)
        self.au_nb("égale", "10", n=2)
        dix = Text("10", font_size=30, color=VERT_OK).move_to(P(3.75 + (2 - 2.5) * 0.62, 0.35 - 5 * 0.5))
        fl = VGroup(Arrow(lignes[4][1].get_center(), dix.get_center(), buff=0.2, color=FLECHE, stroke_width=5),
                    Arrow(lignes[4][2].get_center(), dix.get_center(), buff=0.2, color=FLECHE, stroke_width=5))
        self.play(FadeIn(e3[5], scale=1.3), GrowArrow(fl[0]), GrowArrow(fl[1]), FadeIn(dix, scale=1.6), run_time=0.45)
        self.au_nb("2 parmi", "5")
        cad2 = SurroundingRectangle(ligne, color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(FadeIn(e4, scale=1.3), Create(cad2), run_time=0.4)
        self.insister(dix, 1.6)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 08 : pourquoi ? Sam est choisi, ou pas ─────────────────────────────

    def eleve(self, color, s=0.36):
        return personne(peau="#c68642", habit=color, cheveux="#2b1a0e", s=s)

    def ecran_pourquoi(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("08-pourquoi")
        self.au_mot("Pourquoi")
        tit = self.t("Pourquoi ?", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.5)
        couleurs = [BLEU_CALCUL, VIOLET_ACCENT, "#F472B6", VERT_OK, "#38BDF8"]
        classe = VGroup(*[self.eleve(c) for c in couleurs], self.eleve(JAUNE_TITRE)).arrange(RIGHT, buff=0.35)
        classe.move_to(P(-1.6, 1.85))
        sam = classe[-1]
        nsam = self.t("Sam", 30, JAUNE_TITRE).next_to(sam, DOWN, buff=0.08)
        l1 = VGroup(self.t("Choisis", 34), self.t("k + 1", 34, ORANGE_RETENUE), self.t("élèves parmi", 34),
                    self.t("n + 1", 34, ORANGE_RETENUE)).arrange(RIGHT, buff=0.15)
        l1.move_to(P(0, 0.72)).align_to(P(-5.9, 0), LEFT)
        self.au_mot("Choisis")
        self.play(LaggedStart(*[FadeIn(e, shift=UP * 0.15) for e in classe], lag_ratio=0.08),
                  FadeIn(l1[0], shift=RIGHT * 0.1), run_time=0.6)
        self.au_nb("Choisis k plus", "1")
        self.play(FadeIn(l1[1], scale=1.2), FadeIn(l1[2]), run_time=0.3)
        self.au_nb("parmi n plus", "1")
        self.play(FadeIn(l1[3], scale=1.2), run_time=0.3)
        self.au_mot("dont Sam")
        self.play(FadeIn(nsam, scale=1.3), Indicate(sam, color=JAUNE_TITRE, scale_factor=1.3), run_time=0.5)
        # les deux cas
        x1, x2, yc, w = -3.55, 2.2, -1.6, 5.2
        cadres = VGroup(*[RoundedRectangle(width=w, height=2.8, corner_radius=0.18, stroke_color=GREY_B,
                                           stroke_width=2).move_to(P(x, yc)) for x in (x1, x2)])
        self.au_mot("Soit Sam est choisi")
        s1 = self.eleve(JAUNE_TITRE, 0.3).move_to(P(x1 - w / 2 + 0.5, yc + 0.85))
        ok = Circle(radius=0.42, color=VERT_OK, stroke_width=5).move_to(s1)
        c1 = self.t("Sam est choisi :", 30, VERT_OK, larg=w - 1.5).next_to(ok, RIGHT, buff=0.22)
        self.play(Create(cadres[0]), FadeIn(s1), Create(ok), FadeIn(c1, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("il reste k")
        c1b = self.t("il reste k élèves", 28, larg=w - 0.5)
        c1c = self.t("parmi les n autres", 28, larg=w - 0.5)
        VGroup(c1b, c1c).arrange(DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(0, yc + 0.05)).align_to(
            P(x1 - w / 2 + 0.25, 0), LEFT)
        self.play(FadeIn(c1b, shift=UP * 0.1), run_time=0.35)
        self.au_mot("parmi les n autres")
        b1 = binom("n", "k", 36).move_to(P(x1, yc - 0.85))
        self.play(FadeIn(c1c, shift=UP * 0.1), FadeIn(b1, scale=1.3), run_time=0.4)
        self.au_mot("Soit Sam n'est pas")
        s2 = self.eleve(JAUNE_TITRE, 0.3).move_to(P(x2 - w / 2 + 0.5, yc + 0.85))
        croix = VGroup(Line(s2.get_corner(UL), s2.get_corner(DR)), Line(s2.get_corner(UR), s2.get_corner(DL)))
        croix.set_stroke(ROUGE_ERREUR, 5)
        c2 = self.t("Sam n'est pas choisi :", 30, ROUGE_ERREUR, larg=w - 1.5).next_to(s2, RIGHT, buff=0.35)
        c2.align_to(P(c1.get_left()[0] + x2 - x1, 0), LEFT)
        self.play(Create(cadres[1]), FadeIn(s2), Create(croix), FadeIn(c2, shift=RIGHT * 0.1), run_time=0.5)
        self.au_nb("il faut k plus", "1")
        c2b = self.t("il faut k + 1 élèves", 28, larg=w - 0.5)
        c2c = self.t("parmi les n autres", 28, larg=w - 0.5)
        VGroup(c2b, c2c).arrange(DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(0, yc + 0.05)).align_to(
            P(x2 - w / 2 + 0.25, 0), LEFT)
        self.play(FadeIn(c2b, shift=UP * 0.1), run_time=0.35)
        self.au_mot("parmi les n autres", n=2)
        b2 = binom("n", "k + 1", 36).move_to(P(x2, yc - 0.85))
        self.play(FadeIn(c2c, shift=UP * 0.1), FadeIn(b2, scale=1.3), run_time=0.4)
        self.au_mot("Deux cas disjoints")
        plus = self.t("+", 60, VERT_OK).move_to(P((x1 + w / 2 + x2 - w / 2) / 2, yc))
        fin = self.t("Deux cas disjoints : on additionne.", 32, VERT_OK).move_to(P(-0.6, -3.3))
        self.play(FadeIn(plus, scale=1.6), FadeIn(fin, shift=UP * 0.1), run_time=0.45)
        self.insister(plus, 1.5)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 09 : l'arbre succès / échec, 4 niveaux ─────────────────────────────

    def ecran_arbre(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("09-arbre")
        xs = [-6.1, -4.75, -3.4, -2.05, -0.7]
        ys_f = [3.0 - 0.4 * i for i in range(16)]

        def y(niv, idx):
            larg = 16 // (2 ** niv)
            return sum(ys_f[idx * larg:(idx + 1) * larg]) / larg

        self.au_mot("compte les chemins d'un arbre")
        l0 = self.ligne(self.t("Le même triangle compte", 34), y=2.9, xl=1.0)
        l0b = self.ligne(self.t("les chemins d'un arbre.", 34), y=2.35, xl=1.0)
        racine = Dot(P(xs[0], y(0, 0)), radius=0.08, color=WHITE)
        self.play(FadeIn(l0, shift=RIGHT * 0.1), FadeIn(l0b, shift=RIGHT * 0.1), FadeIn(racine, scale=2), run_time=0.45)
        self.au_mot("succès ou échec")
        l1 = self.ligne(self.t("succès", 34, VERT_OK), self.t("ou", 34), self.t("échec", 34, ROUGE_ERREUR),
                        y=1.6, xl=1.0)
        self.play(FadeIn(l1, shift=RIGHT * 0.1), run_time=0.35)
        self.au_nb("répétée", "4")
        l2 = self.ligne(self.t("répétée 4 fois", 34), y=1.05, xl=1.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.1), run_time=0.3)
        branches = {}
        for niv in range(1, 5):
            anims = []
            for idx in range(2 ** niv):
                parent = P(xs[niv - 1], y(niv - 1, idx // 2))
                pt = P(xs[niv], y(niv, idx))
                succ = idx % 2 == 0
                c = VERT_OK if succ else ROUGE_ERREUR
                br = Line(parent, pt, color=c, stroke_width=2.5).set_opacity(0.75)
                lt = Text("S" if succ else "E", font_size=18 if niv == 4 else 22, color=c)
                lt.next_to(pt, RIGHT, buff=0.06)
                branches[(niv, idx)] = br
                anims.append(AnimationGroup(Create(br), FadeIn(lt)))
            self.play(LaggedStart(*anims, lag_ratio=0.05), run_time=0.45)
        self.au_mot("2 succès")
        l3 = self.ligne(self.t("chemins avec 2 succès :", 34, ORANGE_RETENUE), y=0.15, xl=1.0)
        bons = [f for f in range(16) if bin(f).count("1") == 2]  # bit 1 = échec : 2 échecs = 2 succès
        surl = VGroup()
        for f in bons:
            for niv in range(1, 5):
                surl.add(branches[(niv, f >> (4 - niv))].copy().set_stroke(ORANGE_RETENUE, 6, opacity=1))
        self.play(FadeIn(l3, shift=RIGHT * 0.1), LaggedStart(*[Create(s) for s in surl], lag_ratio=0.02),
                  run_time=1.0)
        self.au_nb("2 parmi", "4")
        bn = binom(4, 2, 44)
        eg = self.t("= 6", 48, VERT_OK)
        r = self.ligne(bn, eg, y=-0.95, xl=1.4, buff=0.25)
        self.play(FadeIn(bn, scale=1.3), run_time=0.3)
        self.au_mot("égale 6")
        self.au_pos(self.trouver("6", 1, self.trouver("égale 6")))
        fins = VGroup(*[Dot(P(xs[4], y(4, f)), radius=0.09, color=ORANGE_RETENUE) for f in bons])
        self.play(FadeIn(eg, scale=1.3), LaggedStart(*[FadeIn(d, scale=2) for d in fins], lag_ratio=0.1),
                  run_time=0.5)
        self.insister(r, 1.1)
        self.au_mot("loi binomiale")
        l4 = self.ligne(self.t("Ça sert pour la loi binomiale", 36, JAUNE_TITRE), y=-1.95, xl=1.0)
        self.play(FadeIn(l4, shift=RIGHT * 0.15), run_time=0.4)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 10 : question-pause n° 2 : la ligne 6 ──────────────────────────────

    def ecran_question2(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("10-question")
        t0 = self.renderer.time
        q1 = VGroup(self.t("Ligne 5 :", 32), self.morceaux("1, 5, 10, 10, 5, 1", 32)).arrange(RIGHT, buff=0.2)
        q2 = self.t("Quelle est la ligne 6 ?", 32)
        choix = ["1, 6, 15, 20, 15, 6, 1", "1, 6, 10, 20, 10, 6, 1", "1, 5, 15, 20, 15, 5, 1"]
        tete, q, cartes, pause, rebours = self.q_tete([q1, q2], choix, xl=1.0, largeur=5.25)
        self.place_pour_coche(cartes)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        lignes = triangle_pascal(7, (-3.6, 2.55), dx=0.62, dy=0.52, fs=26, color=GREY_A, audit=False)
        tri = VGroup(*lignes[:5])
        self.au_nb("La ligne", "5")
        self.play(FadeIn(tri), FadeIn(q1[0], shift=RIGHT * 0.1), run_time=0.4)
        i = self.trouver("est 1")
        for a, b in zip(q1[1], lignes[5]):
            nb = a.original_text.strip(" ,")
            j = self._texte_voix.find(nb, i)
            self.au_pos(j)
            b.set_color(WHITE)
            self.play(FadeIn(a, shift=UP * 0.08), FadeIn(b, scale=1.4), run_time=0.12)
            i = j + len(nb)
        self.au_nb("Quelle est la ligne", "6")
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.3)
        self.q_montrer_choix(cartes)
        self.bring_to_front(margo)
        self.q_pause(pause, rebours, "10-question", t0, 0)
        self.dire("10b-reponse")
        self.q_reponse(cartes, 0, pause, rebours)
        r5, r6 = lignes[5], lignes[6]
        for k in range(7):
            r6[k].set_color(VERT_OK)
        y_e = -1.75
        expl = []
        for (a, b, k, txt) in [(0, 1, 1, "1 plus 5"), (1, 2, 2, "5 plus 10"), (2, 3, 3, "10 plus 10")]:
            i = self.trouver(txt)
            fl = VGroup(Arrow(r5[a].get_center(), r6[k].get_center(), buff=0.17, color=FLECHE, stroke_width=4,
                              max_tip_length_to_length_ratio=0.35),
                        Arrow(r5[b].get_center(), r6[k].get_center(), buff=0.17, color=FLECHE, stroke_width=4,
                              max_tip_length_to_length_ratio=0.35))
            e = self.morceaux(f"{txt.replace(' plus ', ' + ')} = {C(6, k)}", 30, FLECHE)
            e[-1].set_color(VERT_OK)
            expl.append(e)
            e.move_to(P(0, y_e)).align_to(P(-6.1 + 2.6 * (k - 1), 0), LEFT)
            self.au_pos(i)
            self.play(GrowArrow(fl[0]), GrowArrow(fl[1]), FadeIn(e[0], shift=UP * 0.08), run_time=0.15)
            i += len(e[0].original_text)
            self.play(FadeIn(e[1]), run_time=0.08)
            i = self.reveler([e[2]], i)
            self.play(FadeIn(e[3]), run_time=0.08)
            self.reveler([e[4]], i)
            self.play(FadeIn(r6[k], scale=1.6), FadeOut(fl), run_time=0.25)
            if k == 1:
                self.play(FadeIn(r6[0]), run_time=0.1)
        self.play(*[FadeIn(r6[k], scale=1.3) for k in (4, 5, 6)], run_time=0.3)
        self.au_mot("la somme")
        s1 = self.t("Somme de la ligne 6 :", 32).move_to(P(0, -2.5)).align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(s1, shift=RIGHT * 0.1), Indicate(r6, color=VERT_OK, scale_factor=1.05), run_time=0.45)
        self.au_mot("64")
        s2 = self.t("64", 38, VERT_OK).next_to(s1, RIGHT, buff=0.2)
        self.play(FadeIn(s2, scale=1.3), run_time=0.3)
        self.au_mot("2 puissance")
        p2 = puissance("2", "6", 38, VERT_OK)
        s3 = VGroup(self.t("=", 38, VERT_OK), p2).arrange(RIGHT, buff=0.15).next_to(s2, RIGHT, buff=0.2)
        self.play(FadeIn(s3[0]), FadeIn(p2[0]), run_time=0.2)
        self.au_nb("puissance", "6")
        self.play(FadeIn(p2[1], scale=1.4), run_time=0.2)
        self.insister(VGroup(s2, s3), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 11 : le piège : descendre d'une ligne ET avancer d'un cran ─────────

    def ecran_piege(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("11-piege")
        self.au_mot("Voilà le piège")
        tit = self.t("Voilà le piège !", 46, ROUGE_ERREUR).to_edge(UP, buff=0.45)
        self.play(FadeIn(tit, scale=1.3), run_time=0.4)
        dx, xc = 0.92, -3.3
        r5 = VGroup(*[Text(str(C(5, k)), font_size=40, color=GREY_A).move_to(P(xc + (k - 2.5) * dx, 1.4))
                      for k in range(6)])
        r6 = VGroup(*[Text(str(C(6, k)), font_size=40, color=GREY_A).move_to(P(xc + (k - 3) * dx, 0.15))
                      for k in range(7)])
        for t in list(r5) + list(r6):
            t._pas_audit = True
        n5 = self.t("ligne 5", 26, GREY_B, audit=False).move_to(P(xc, 2.25))
        n6 = self.t("ligne 6", 26, GREY_B, audit=False).move_to(P(xc, -0.6))
        self.add(r5, r6, n5, n6)
        self.bring_to_front(margo)
        self.au_mot("deux voisins")
        voisins = VGroup(r5[1], r5[2])
        cad = SurroundingRectangle(voisins, color=ORANGE_RETENUE, buff=0.12, stroke_width=4)
        l1 = self.t("deux voisins de la même ligne", 32, ORANGE_RETENUE).move_to(P(0, -1.35)).align_to(P(-6.1, 0), LEFT)
        self.play(Create(cad), voisins.animate.set_color(ORANGE_RETENUE), FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("descend d'une ligne")
        f_bas = Arrow(r5[1].get_center() + DOWN * 0.25, r6[1].get_center() + UP * 0.28, buff=0, color=FLECHE,
                      stroke_width=6)
        l2 = self.t("descend d'une ligne", 32, FLECHE).move_to(P(0, -2.0)).align_to(P(-6.1, 0), LEFT)
        self.play(GrowArrow(f_bas), FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        self.au_mot("avance d'un cran")
        f_droite = Arrow(r6[1].get_center() + RIGHT * 0.25, r6[2].get_center() + LEFT * 0.33, buff=0,
                         color=FLECHE, stroke_width=6)
        l3 = self.t("ET avance d'un cran", 32, FLECHE).move_to(P(0, -2.65)).align_to(P(-6.1, 0), LEFT)
        self.play(GrowArrow(f_droite), FadeIn(l3, shift=UP * 0.1), r6[2].animate.set_color(VERT_OK), run_time=0.45)
        self.insister(r6[2], 1.5)
        # le calcul, à droite
        xr = 1.3
        a = binom(5, 1, 40)
        pl = self.t("+", 40)
        b = binom(5, 2, 40)
        e1 = VGroup(a, pl, b).arrange(RIGHT, buff=0.18)
        self.col(e1, 1.55, xr)
        self.au_nb("1 parmi", "5")
        self.play(FadeIn(a, scale=1.3), run_time=0.3)
        self.au_nb("2 parmi", "5")
        self.play(FadeIn(pl), FadeIn(b, scale=1.3), run_time=0.3)
        e2 = self.morceaux("= 5 + 10 = 15", 40)
        e2[-1].set_color(VERT_OK)
        self.col(e2, 0.45, xr)
        i = self.trouver("5 plus 10")
        self.play(FadeIn(e2[0]), run_time=0.08)
        i = self.reveler([e2[1]], i)
        self.play(FadeIn(e2[2]), run_time=0.08)
        i = self.reveler([e2[3]], i)
        self.play(FadeIn(e2[4]), run_time=0.08)
        self.reveler([e2[5]], i)
        self.au_nb("2 parmi", "6")
        ok = VGroup(self.t("=", 40, VERT_OK), binom(6, 2, 40, VERT_OK)).arrange(RIGHT, buff=0.15)
        self.col(ok, -0.65, xr)
        coche = self.coche(VERT_OK, 0.24).next_to(ok, RIGHT, buff=0.25)
        self.play(FadeIn(ok, scale=1.3), Create(coche), run_time=0.4)
        self.au_nb("pas 1 parmi", "6")
        faux = VGroup(self.t("et pas", 34, ROUGE_ERREUR), binom(6, 1, 40, ROUGE_ERREUR)).arrange(RIGHT, buff=0.18)
        self.col(faux, -1.85, xr)
        self.play(FadeIn(faux, scale=1.2), r6[1].animate.set_color(ROUGE_ERREUR), run_time=0.4)
        self.au_nb("qui vaut", "6")
        vaut = self.t("= 6", 40, ROUGE_ERREUR).next_to(faux, RIGHT, buff=0.18)
        barre = Line(r6[1].get_corner(DL), r6[1].get_corner(UR), color=ROUGE_ERREUR, stroke_width=5)
        self.play(FadeIn(vaut, scale=1.2), Create(barre), run_time=0.4)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 12 : ce que tu as appris ; 13 : la fin ─────────────────────────────

    def ecran_bilan(self):
        fs = 40
        f = VGroup(binom("n", "k", fs), VGroup(self.t("+", fs), binom("n", "k + 1", fs)).arrange(RIGHT, buff=0.2),
                   self.t("=", fs), binom("n + 1", "k + 1", fs, VERT_OK)).arrange(RIGHT, buff=0.25)
        b2 = self.t("Le triangle de Pascal se construit par additions.", fs, FLECHE)
        b3 = VGroup(self.t("Il compte les chemins :", fs), self.t("sur une grille comme dans un arbre.", fs,
                                                                   VERT_OK)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.ecran_appris_lignes("12-appris", [f, b2, b3],
                                 [["k parmi n", "1 parmi n,", "égale", "1."], "Le triangle", "il compte"])

    def construct(self):
        self.ecran_accroche()
        self.ecran_titre()
        self.ecran_metier()
        self.ecran_grille()
        self.ecran_resultat()
        self.ecran_question1()
        self.ecran_triangle()
        self.ecran_relation()
        self.ecran_pourquoi()
        self.ecran_arbre()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_bilan()
        self.page_abonnement("13-abonne")


class DenombrementPascalTerminale(DenombrementPascalBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
