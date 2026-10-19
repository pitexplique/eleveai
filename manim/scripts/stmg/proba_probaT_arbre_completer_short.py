# proba_probaT_arbre_completer_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Compléter un arbre pondéré ». CEINTURE JAUNE. Il AMUSE : la pêche aux
# canards, on gagne avec 0,35 ; sur l'arbre, la branche « perdu » est EFFACÉE
# (une gomme passe), puis elle RÉAPPARAÎT avec son 0,65.
#   · en HAUT la mare : des canards qui flottent, la canne qui pêche ;
#   · en BAS, EN MÊME TEMPS : l'arbre du coach (« Arbre à compléter », la case
#     « ? » en pointillé) et le calcul 1 − 0,35 = 0,65 ;
#   · fin : « rejoue » 0,8, « ne rejoue pas » ? — « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne, aucune classe à l'écran :
# UN SEUL rendu suffit, copié sous les deux noms (STMG, 1re). Les deux
# sous-classes existent quand même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-arbre-completer-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_arbre_completer_short.py ShortProbaArbreCompleterSTMG -o eleveai-maths-stmg-proba-arbre-completer-short --media_dir manim/scripts/stmg/media-probaT_arbre_completer
# (ShortProbaArbreCompleterPremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/08-arbre-completer/ et
# manim/sorties/premiere-commun/maths/probabilites/08-arbre-completer/
# (eleveai-maths-premiere-commun-proba-arbre-completer-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaT_arbre_completer import (  # noqa: E402  (pose les chemins)
    BORD, BRANCHE, CHEMIN, ENCRE, P, PROBA, TROU, case_trou, suite,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

import numpy as np  # noqa: E402

LARGEUR_MAX = 4.1
EAU = "#0EA5E9"
CANARD = "#FACC15"
BEC = "#F97316"


def canard(s=1.0):
    corps = Ellipse(width=0.62, height=0.32, fill_color=CANARD, fill_opacity=1, stroke_color="#CA8A04",
                    stroke_width=2)
    queue = Polygon(P(-0.3, 0.02), P(-0.42, 0.16), P(-0.22, 0.1), fill_color=CANARD, fill_opacity=1,
                    stroke_width=0)
    tete = Circle(radius=0.13, fill_color=CANARD, fill_opacity=1, stroke_color="#CA8A04", stroke_width=2)
    tete.move_to(P(0.2, 0.2))
    bec = Polygon(P(0.31, 0.22), P(0.45, 0.18), P(0.31, 0.14), fill_color=BEC, fill_opacity=1, stroke_width=0)
    oeil = Dot(P(0.24, 0.25), radius=0.025, color=ENCRE)
    return VGroup(queue, corps, tete, bec, oeil).scale(s)


class Arbre2(VGroup):
    """L'arbre du short, carte blanche du coach : Gagné / Perdu, puis, après
    Gagné, Rejoue / Ne rejoue pas. Branches : 0 → Gagné, 1 → Perdu,
    2 Gagné → Rejoue, 3 Gagné → Ne rejoue pas."""

    def __init__(self, fs=19, **kw):
        super().__init__(**kw)
        racine, g, p = P(-1.85, 0), P(-0.65, 0.55), P(-0.65, -0.55)
        f1, f2 = P(0.55, 0.95), P(0.55, 0.15)
        self.branches = [Line(a, b, color=BRANCHE, stroke_width=4) for a, b in
                         ((racine, g), (racine, p), (g, f1), (g, f2))]
        self.depart = Dot(racine, radius=0.06, color=ENCRE)
        mg = Text("Gagné", font_size=fs, color=ENCRE).next_to(g, UP, buff=0.06).shift(LEFT * 0.25)
        self.lab = [VGroup(BackgroundRectangle(mg, color=WHITE, fill_opacity=1, buff=0.03), mg),
                    Text("Perdu", font_size=fs, color=ENCRE).next_to(p, RIGHT, buff=0.1),
                    Text("Rejoue", font_size=fs - 1, color=ENCRE).next_to(f1, RIGHT, buff=0.1),
                    VGroup(Text("Ne rejoue", font_size=fs - 1, color=ENCRE),
                           Text("pas", font_size=fs - 1, color=ENCRE)).arrange(DOWN, aligned_edge=LEFT, buff=0.05)
                    .next_to(f2, RIGHT, buff=0.1)]
        self.carte = RoundedRectangle(width=4.3, height=2.6, corner_radius=0.18, fill_color=WHITE, fill_opacity=1,
                                      stroke_color=BORD, stroke_width=2).move_to(P(0.0, 0.3))
        self.titre = Text("Arbre à compléter", font_size=18, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.08)
        self.nombres, self.trous = {}, {}
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.lab)

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    def _place(self, k, mob, buff=0.06):
        a, b = self.branches[k].get_start(), self.branches[k].get_end()
        d = b - a
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if (n[1] < 0) != (d[1] < 0):
            n = -n
        if k == 0:      # sous la branche « gagné » : l'étiquette du nœud est au-dessus
            n = -n
        demi = abs(n[0]) * mob.width / 2 + abs(n[1]) * mob.height / 2
        return mob.move_to((a + b) / 2 + n * (demi + buff))

    def nombre(self, k, texte, fs=21):
        t = self._place(k, Text(texte, font_size=fs, color=PROBA, weight=BOLD))
        self.nombres[k] = t
        return t

    def trou(self, k):
        c = self._place(k, case_trou(22).scale(0.75), buff=0.04)
        self.trous[k] = c
        return c


class ShortProbaArbreCompleterBase(Short6e):
    nom_voix = "stmg-premiere-proba-arbre-completer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def bas(self, morceaux, fs=34, y=-2.62):
        """La ligne de maths du bas, entre l'arbre et Ti-Margo."""
        g = suite(*[Text(tx, font_size=fs, color=c) for tx, c in morceaux], buff=0.14)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def mare(self):
        eau = Ellipse(width=4.2, height=1.25, fill_color=EAU, fill_opacity=0.85, stroke_color="#BAE6FD",
                      stroke_width=3).move_to(P(0, 1.0))
        canards = VGroup(*[canard(0.8) for _ in range(4)])
        for k, c in enumerate(canards):
            c.move_to(P(-1.5 + 1.0 * k, 1.1 + 0.1 * (k % 2)))
            c.phase = k * 1.3

        def nage(m, dt):
            for c in m:
                c.phase += dt * 3
                c.shift(RIGHT * dt * 0.45 + UP * 0.025 * np.cos(c.phase))
                if c.get_x() > 1.65:
                    c.shift(LEFT * 3.3)
        canards.add_updater(nage)
        return eau, canards

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : la pêche aux canards, la branche effacée ──
        self.dire("00-accroche")
        titre = self.grand("La pêche aux canards", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        eau, canards = self.mare()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(eau), FadeIn(canards), run_time=0.8)
        a = Arbre2().move_to(P(0, -1.05))
        self.au_mot("on gagne")
        canne = Line(P(-2.1, 1.85), P(0.3, 1.65), color="#A16207", stroke_width=6)
        fil = Line(P(0.3, 1.65), P(0.3, 1.3), color=WHITE, stroke_width=2)
        self.play(Create(canne), Create(fil), FadeIn(a.socle()), Create(a.branches[0]), FadeIn(a.lab[0]),
                  run_time=0.6)
        self.au_mot("0,35")
        n0 = a.nombre(0, "0,35")
        etoile = Star(5, outer_radius=0.28, inner_radius=0.12, fill_color=JAUNE_TITRE, fill_opacity=1,
                      stroke_width=0).move_to(P(0.3, 1.55))
        self.play(FadeIn(n0, scale=1.8), GrowFromCenter(etoile), fil.animate.put_start_and_end_on(P(0.3, 1.65),
                                                                                              P(0.3, 1.45)),
                  run_time=0.5)
        self.play(Rotate(etoile, PI), run_time=0.4)
        self.insister(n0, 1.5, 0.2)
        self.au_mot("la branche « perdu »")
        b1 = a.branches[1].copy()      # la copie sera gommée ; l'original reviendra
        self.play(Create(b1), FadeIn(a.lab[1]), run_time=0.5)
        self.au_mot("est effacée")
        gomme = RoundedRectangle(width=0.5, height=0.28, corner_radius=0.06, fill_color="#F9A8D4", fill_opacity=1,
                                 stroke_color="#BE185D", stroke_width=2).rotate(-0.5)
        gomme.move_to(b1.get_start())
        fantome = DashedLine(b1.get_start(), b1.get_end(), dash_length=0.08, color=BRANCHE, stroke_width=2)
        fantome.set_opacity(0.4)
        tr = a.trou(1)
        self.play(FadeIn(gomme, scale=1.3), run_time=0.2)
        self.play(gomme.animate.move_to(b1.get_end()), FadeOut(b1, run_time=0.8), FadeIn(fantome),
                  a.lab[1].animate.set_opacity(0.3), run_time=0.8)
        self.play(FadeOut(gomme, shift=RIGHT * 0.4), FadeIn(tr, scale=1.6), run_time=0.4)
        self.au_mot("Tu la retrouves")
        q = self.t("Tu la retrouves ?", 40, ORANGE_RETENUE).move_to(P(0, -2.62))
        self.play(FadeIn(q, scale=0.6), Indicate(tr, color=TROU, scale_factor=1.5), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : ensemble, elles font 1 ; la branche réapparaît ──
        self.dire("01-image")
        self.au_mot("Les deux branches")
        self.play(FadeOut(q, shift=DOWN * 0.2), Flash(a.depart, color=CHEMIN, line_length=0.2),
                  a.branches[0].animate.set_stroke(CHEMIN, 7), fantome.animate.set_stroke(CHEMIN, opacity=1),
                  run_time=0.6)
        self.au_mot("elles font 1")
        un = self.bas([("ensemble :", WHITE), ("1", JAUNE_TITRE)], 38)
        self.play(FadeIn(un, scale=0.7), run_time=0.4)
        self.insister(un[1], 1.6, 0.2)
        self.au_mot("Perdu : 1 moins")
        calc = self.bas([("1", WHITE), ("−", WHITE), ("0,35", PROBA), ("=", WHITE), ("0,65", JAUNE_TITRE)], 40)
        self.play(FadeOut(un, shift=UP * 0.2), FadeIn(calc[0]), FadeIn(calc[1]), run_time=0.4)
        self.play(TransformFromCopy(n0, calc[2]), run_time=0.5)
        self.au_mot("égale 0,65")
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=1.6), run_time=0.4)
        b1o = a.branches[1].set_stroke(CHEMIN, 7)
        n1 = a.nombre(1, "0,65")
        self.play(Create(b1o), FadeOut(fantome), a.lab[1].animate.set_opacity(1),
                  ReplacementTransform(tr, n1), run_time=0.7)
        self.play(GrowFromCenter(etoile.copy().scale(0.6).next_to(a.lab[1], RIGHT, buff=0.1)), run_time=0.3)
        self.insister(n1, 1.5, 0.2)
        self.au_mot("Même règle")
        regle = self.bas([("Même règle à chaque point !", VERT_OK)], 34)
        self.play(FadeOut(calc, shift=UP * 0.2), FadeIn(regle, shift=UP * 0.2),
                  a.branches[0].animate.set_stroke(BRANCHE, 4), b1o.animate.set_stroke(BRANCHE, 4), run_time=0.5)
        noeud_g = a.branches[0].get_end()
        self.play(Flash(a.depart, color=VERT_OK, line_length=0.2), Flash(noeud_g, color=VERT_OK, line_length=0.2),
                  run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : « ne rejoue pas » ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.au_mot("Après « gagné »")
        self.play(ReplacementTransform(titre, toi), FadeOut(regle, shift=DOWN * 0.2),
                  Indicate(a.lab[0], color=CHEMIN, scale_factor=1.3), run_time=0.6)
        self.play(Create(a.branches[2]), Create(a.branches[3]), FadeIn(a.lab[2]), FadeIn(a.lab[3]), run_time=0.7)
        self.au_mot("vaut 0,8")
        n2 = a.nombre(2, "0,8")
        tr3 = a.trou(3)
        self.play(FadeIn(n2, scale=1.8), run_time=0.4)
        self.insister(n2, 1.5, 0.2)
        self.au_mot("Que vaut")
        self.play(FadeIn(tr3, scale=1.6), a.branches[3].animate.set_stroke(CHEMIN, 7), run_time=0.5)
        canards.clear_updaters()
        question = VGroup(self.t("« Ne rejoue pas » :", 34, WHITE), self.t("?", 60, TROU)).arrange(RIGHT, buff=0.2)
        if question.width > LARGEUR_MAX:
            question.scale_to_fit_width(LARGEUR_MAX)
        question.move_to(P(0, 2.4))
        self.play(FadeOut(VGroup(eau, canards, canne, fil, etoile), shift=DOWN * 0.3), FadeOut(badge),
                  FadeIn(question, shift=DOWN * 0.2), run_time=0.6)
        self.play(Indicate(tr3, color=TROU, scale_factor=1.5), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=56, color=VERT_OK),
                       self.grand("commentaire !", font_size=56, color=VERT_OK))
        appel.arrange(DOWN, buff=0.1).move_to(P(0, 1.1))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaArbreCompleterSTMG(ShortProbaArbreCompleterBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaArbreCompleterPremiere(ShortProbaArbreCompleterBase):
    identite = "Maths 1re — EleveAI"
