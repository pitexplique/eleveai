# proba_bern_arbre_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « L'arbre de trois épreuves de Bernoulli » (micros probaI_bernoulli_repetition
# / alea_bern_arbre). CEINTURE JAUNE. Il AMUSE : trois tirs au but, exactement
# deux réussis… une seule façon ? Non : trois ordres, trois chemins.
#   · en HAUT la cage, le ballon qui part à chaque tir (dedans / à côté), et
#     les trois cases du tir qui se remplissent (rond vert coché / rond rouge
#     barré) ;
#   · en BAS, EN MÊME TEMPS : le petit arbre à 3 niveaux (réussi en haut, raté
#     en bas), le chemin de chaque ordre s'allume en orange ;
#   · fin : avec quatre tirs, exactement trois réussis ? « Réponds en
#     commentaire ! ».
# ⛔ PAS D'ÉCART : aucun nombre sur les branches (la voix n'en dit aucun).
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN SEUL rendu suffit,
# copié sous les deux noms (STMG, 1re). Les deux sous-classes existent quand
# même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-bern-arbre-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_arbre_short.py ShortProbaBernArbreSTMG -o eleveai-maths-stmg-proba-bern-arbre-short --media_dir manim/scripts/stmg/media-bern_arbre
# (ShortProbaBernArbrePremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/20-bern-arbre/ et
# manim/sorties/premiere-commun/maths/probabilites/20-bern-arbre/
# (eleveai-maths-premiere-commun-proba-bern-arbre-short.mp4).

import re
import sys
from itertools import product
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bern_arbre import CHEMIN, P, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
OK = "#22C55E"
RATE = "#EF4444"
GRIS_BR = "#CBD5E1"


def marque(reussi, r=0.13):
    """Un rond vert coché (réussi) ou rouge barré d'une croix (raté)."""
    d = Circle(radius=r, fill_color=OK if reussi else RATE, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    if reussi:
        s = VMobject(stroke_color=WHITE, stroke_width=3)
        s.set_points_as_corners([P(-0.55 * r, 0), P(-0.15 * r, -0.45 * r), P(0.55 * r, 0.45 * r)])
    else:
        s = VGroup(Line(P(-0.45 * r, -0.45 * r), P(0.45 * r, 0.45 * r), color=WHITE, stroke_width=3),
                   Line(P(-0.45 * r, 0.45 * r), P(0.45 * r, -0.45 * r), color=WHITE, stroke_width=3))
    return VGroup(d, s.move_to(d))


def cage(larg=2.6, haut=1.15):
    """La cage vue de face : poteaux, barre, filet."""
    g, d, h = -larg / 2, larg / 2, haut
    filet = VGroup(*[Line(P(x, 0), P(x, h), color="#64748B", stroke_width=1.2)
                     for x in [g + k * larg / 10 for k in range(1, 10)]],
                   *[Line(P(g, y), P(d, y), color="#64748B", stroke_width=1.2) for y in (h / 4, h / 2, 3 * h / 4)])
    montants = VMobject(stroke_color=WHITE, stroke_width=7)
    montants.set_points_as_corners([P(g, 0), P(g, h), P(d, h), P(d, 0)])
    sol = Line(P(-2.1, 0), P(2.1, 0), color="#16A34A", stroke_width=5)
    return VGroup(sol, filet, montants)


def ballon(r=0.15):
    b = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=BLACK, stroke_width=1.5)
    pent = RegularPolygon(5, radius=r * 0.42, fill_color=BLACK, fill_opacity=1, stroke_width=0)
    return VGroup(b, pent)


class PetitArbre3(VGroup):
    """Trois niveaux, réussi en haut, raté en bas ; un nœud = le tuple du chemin."""

    def __init__(self, x0=-1.95, dx=1.28, h=0.29, y0=-1.6, **kw):
        super().__init__(**kw)
        self.pos = {(): P(x0, y0)}
        for L in (1, 2, 3):
            for c in product((True, False), repeat=L):
                i = int("".join("0" if g else "1" for g in c), 2)
                bloc = 2 ** (3 - L)
                ys = [(3.5 - j) * h for j in range(i * bloc, (i + 1) * bloc)]
                self.pos[c] = P(x0 + L * dx, y0 + sum(ys) / len(ys))
        self.branches, self.lab = {}, {}
        for c, v in self.pos.items():
            if not c:
                continue
            u = self.pos[c[:-1]]
            d = (v - u) / np.linalg.norm(v - u)
            self.branches[c] = Line(u + d * (0.05 if len(c) == 1 else 0.16), v - d * 0.16, color=GRIS_BR,
                                    stroke_width=3)
            self.lab[c] = marque(c[-1], 0.12 if len(c) < 3 else 0.11).move_to(v).set_z_index(3)
        self.depart = Dot(self.pos[()], radius=0.06, color=WHITE)
        self.add(self.depart)

    def pousser(self, L, run_time=0.5):
        cs = [c for c in self.pos if len(c) == L]
        return Succession(AnimationGroup(*[Create(self.branches[c]) for c in cs], run_time=run_time * 0.6),
                          AnimationGroup(*[FadeIn(self.lab[c], scale=1.5) for c in cs], run_time=run_time * 0.4))

    def etat(self, chemins=None, op=0.22):
        on_b = set() if chemins is None else {ch[:k] for ch in chemins for k in (1, 2, 3)}
        anims = []
        for c, br in self.branches.items():
            on = chemins is None or c in on_b
            lit = chemins is not None and on
            anims.append(br.animate.set_stroke(CHEMIN if lit else GRIS_BR, 7 if lit else 3, opacity=1 if on else op))
            anims.append(self.lab[c].animate.set_opacity(1 if on else op))
        return anims


class ShortProbaBernArbreBase(Short6e):
    nom_voix = "stmg-premiere-proba-bern-arbre-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def au_index(self, i):
        """Attend l'instant où la voix arrive au caractère i de la phrase en cours."""
        if not self._duree_voix:
            return
        reste = self._debut_voix + self._duree_voix * i / len(self._texte_voix) - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def titre(self, texte, color=JAUNE_TITRE, fs=44):
        return self.grand(texte, font_size=fs, color=color).move_to(P(0, 3.4))

    def tir(self, b, reussi, k):
        """Le ballon part : dans la cage, ou à côté du poteau."""
        cible = [P(-0.7, 1.15), P(0.15, 1.3), P(0.75, 1.1)][k] if reussi else [P(-1.7, 1.05), P(1.7, 1.25),
                                                                               P(-1.65, 1.4)][k]
        chemin = ArcBetweenPoints(b.get_center(), cible, angle=-0.6 if cible[0] > 0 else 0.6)
        return MoveAlongPath(b, chemin, rate_func=rate_functions.ease_out_quad)

    def construct(self):
        self.margo_bas()

        # ── 00 : trois tirs au but ; exactement deux réussis ; une seule façon ? ──
        self.dire("00-accroche")
        titre = self.titre("Trois tirs au but")
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        but = cage().move_to(P(0, 1.12))
        depart = P(0, 0.3)
        b = ballon().move_to(depart).set_z_index(4)
        a = PetitArbre3(y0=-1.75)
        self.add(a)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(but, shift=UP * 0.2),
                  FadeIn(b, scale=0.5), run_time=0.8)
        for L in (1, 2, 3):
            self.play(a.pousser(L, 0.45))
        self.au_mot("Exactement deux")
        ex = suite(self.t("Exactement", 34), self.t("2", 46, JAUNE_TITRE), self.t("réussis", 34, OK), buff=0.15)
        ex.scale_to_fit_width(min(ex.width, LARGEUR_MAX)).move_to(P(0, -0.2))
        self.play(FadeIn(ex, shift=UP * 0.15), run_time=0.5)
        self.insister(ex[1])
        self.au_mot("Une seule")
        seule = self.titre("Une seule façon ?", ORANGE_RETENUE, 46)
        self.play(ReplacementTransform(titre, seule), run_time=0.5)
        self.play(Wiggle(seule), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : les trois ordres, trois chemins ──
        self.dire("01-image")
        texte = self._texte_voix
        mots = [(m.start(), m.group().lower() == "réussi") for m in re.finditer(r"[Rr]éussi|[Rr]até", texte)][:9]
        ordres = [tuple(r for _, r in mots[3 * k:3 * k + 3]) for k in range(3)]
        cases_x = (-0.6, 0.0, 0.6)
        allumes, marques = [], VGroup()
        self.play(FadeOut(ex), run_time=0.2)
        for k, ordre in enumerate(ordres):
            for j in range(3):
                i, reussi = mots[3 * k + j]
                self.au_index(i)
                m = marque(reussi, 0.17).move_to(P(cases_x[j], -0.2))
                self.play(self.tir(b, reussi, j), *a.etat(allumes + [ordre[:j + 1]]), run_time=0.35)
                self.play(FadeIn(m, scale=1.6), b.animate.set_opacity(0), run_time=0.2)
                b.move_to(depart).set_opacity(1)
                marques.add(m)
            allumes.append(ordre)
            if k < 2:
                self.play(FadeOut(marques, shift=DOWN * 0.15), run_time=0.25)
                marques = VGroup()
        self.au_mot("Trois chemins")
        trois = self.titre("3 chemins !", JAUNE_TITRE, 50)
        self.play(ReplacementTransform(seule, trois), *[Indicate(a.lab[o], color=WHITE, scale_factor=1.8)
                                                        for o in ordres], run_time=0.7)
        self.au_mot("Le tir raté")
        rangs = [(False, True, True), (True, False, True), (True, True, False)]
        lignes = VGroup(*[VGroup(*[marque(r, 0.2) for r in o]).arrange(RIGHT, buff=0.35) for o in rangs])
        lignes.arrange(DOWN, buff=0.22).move_to(P(0, 0.75))
        self.play(FadeOut(VGroup(but, b, marques)), FadeIn(lignes, shift=UP * 0.2), run_time=0.5)
        for k, mot in enumerate(["le premier", "le deuxième", "le troisième"]):
            self.au_mot(mot)
            self.play(lignes[k][k].animate.scale(1.6), Indicate(a.lab[rangs[k]], color=WHITE, scale_factor=1.8),
                      run_time=0.3)
            self.play(lignes[k][k].animate.scale(1 / 1.6), run_time=0.25)
        self.attendre_voix(marge=0.1)

        # ── 02 : et avec quatre tirs ? ──
        self.dire("02-question")
        self.au_mot("Avec quatre tirs")
        quatre = self.titre("Et avec 4 tirs ?", JAUNE_TITRE, 46)
        self.play(ReplacementTransform(trois, quatre), FadeOut(lignes),
                  FadeOut(VGroup(a, *a.branches.values(), *a.lab.values())), run_time=0.6)
        self.au_mot("combien de chemins")
        q1 = suite(self.t("Exactement", 36), self.t("3", 50, JAUNE_TITRE), self.t("réussis :", 36, OK), buff=0.15)
        q2 = self.t("combien de chemins ?", 40, WHITE)
        q1.scale_to_fit_width(min(q1.width, LARGEUR_MAX))
        q = VGroup(q1, q2).arrange(DOWN, buff=0.3).move_to(P(0, 0.9))
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.5)
        self.au_mot("exactement trois")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.5)
        self.insister(q1[1])
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK), self.t("commentaire !", 46, VERT_OK))
        appel.arrange(DOWN, buff=0.1).move_to(P(0, -1.5))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaBernArbreSTMG(ShortProbaBernArbreBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaBernArbrePremiere(ShortProbaBernArbreBase):
    identite = "Maths 1re — EleveAI"
