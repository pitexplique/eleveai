# frac_unite_short.py
# EleveAI — Maths CM1 — short jumeau de l'épisode 08 « L'unité dans une
# fraction » (micro fraction_unite). CEINTURE BLANCHE (règle du short blanc) :
# on VOIT qu'un quart d'un grand tout dépasse la moitié d'un petit, aucun calcul.
# Il AMUSE : « La moitié peut-elle être plus petite qu'un quart ? ». Lucie,
# ASTRONOME :
#   · EN HAUT : Lucie, puis ce qu'on compare (1/4 de la Terre, 1/2 de la Lune) ;
#   · EN BAS, au même instant : la Terre et la Lune (le disque du coach, parts
#     allumées), dessinées à la bonne échelle ; le quart de la Terre et la
#     moitié de la Lune sortent côte à côte ;
#   · 1 question-pause (3 s) : 1/2 d'une petite pomme ou 1/4 d'une grosse
#     pastèque (leurre « c'est pareil » : l'erreur du coach, tpl_125) ;
#   · commentaire : « 1 quart de 20 bonbons, ou 1 demi de 6 ? » (le quart : 5 > 3).
# Donnée réelle (sans nombre à l'écran) : le diamètre de la Lune vaut environ
# 27 % de celui de la Terre (3 474 km contre 12 742 km, NASA, fiches « Moon /
# Earth fact sheet », consultées le 25/10/2026) ; le dessin garde ce rapport
# (rayons 1,1 et 0,3). Vérifié (Python) : 20 ÷ 4 = 5 > 6 ÷ 2 = 3.
# Centres : espace, jeux-defis.
#
# CM1 seul : rendu une fois, sortie cm1 uniquement.
# Voix : manim/voix/cm-frac-unite-short.json (débit −10) ; marques : frac_unite_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/frac_unite_short.py FracUniteShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/frac_unite_short.py FracUniteShortCM -o eleveai-maths-cm1-frac-unite-short --media_dir manim/scripts/cm1/media-frac-unite-short
# Sortie : manim/sorties/cm1/maths/fractions/08-unite/eleveai-maths-cm1-frac-unite-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403
from frac_cmj_commun import *  # noqa: E402,F403

Y1, Y2, Y3 = 1.95, 1.4, 0.85
YB = -1.35
TERRE, MER = "#22c55e", "#1d4ed8"
LUNE, LUNE_V = "#e5e7eb", "#6b7280"


def astronome(s=0.42):
    p = personne(peau="#c68642", tenue="#1e293b", cheveux="#111827", longs=True, s=s)
    c = p.corps.get_right() + UP * 0.5 * s
    p.add(Polygon(c, c + RIGHT * 0.55 * s + UP * 0.35 * s, c + RIGHT * 0.65 * s + UP * 0.2 * s,
                  c + RIGHT * 0.1 * s + DOWN * 0.15 * s, fill_color="#94a3b8", fill_opacity=1, stroke_width=0))
    return p


class FracUniteShortCM(ShortCM):
    nom_voix = "cm-frac-unite-short"
    fichier_marques = "frac_unite_short_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """La coche ✓ ne touche jamais le libellé : les trois libellés finissent
        à 0,9 du bord droit de leur carte (même réduction pour les trois)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        k = min(1.0, *[(c[0].get_right()[0] - 0.9 - c[1][1].get_left()[0]) / c[1][1].width for c in cartes])
        for c in cartes:
            corps, gauche = c[1][1], c[1][1].get_left()[0]
            corps.scale(k)
            corps.shift(RIGHT * (gauche - corps.get_left()[0]))
        return tete, q, cartes, pause, rebours, ph

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Moitié ou quart ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Lucie, la Terre et la Lune ──
        self.dire("00-accroche")
        q1 = VGroup(self.inline("La moitié,", 30, ORANGE_RETENUE), self.inline("plus petite", 30, ORANGE_RETENUE))
        q1.arrange(RIGHT, buff=0.15)
        q2 = self.inline("qu'un quart ?", 30, ORANGE_RETENUE)
        q = self.borne(VGroup(q1, q2).arrange(DOWN, buff=0.12), 0.5).move_to(P(0, 1.6))
        au_fil(self, [("La moitié", [q1[0]], [Write(titre)]), ("plus petite", [q1[1]], []), ("qu'un quart", [q2], [])])
        lu = astronome(0.42).move_to(P(-1.3, 1.5))
        nm = self.bloc(["Lucie,", "astronome"], 26, BLEU_CALCUL).next_to(lu, RIGHT, buff=0.3)
        terre = Disque(4, 0, rayon=1.1, couleur=TERRE, vide=MER, carte=False, centre=P(-0.75, YB))
        lune = Disque(2, 0, rayon=0.3, couleur=LUNE, vide=LUNE_V, carte=False, centre=P(1.45, YB + 0.6))
        for d in (terre, lune):
            for t in d.traits:
                t.set_stroke(opacity=0)
        au_fil(self, [("Lucie", [lu, nm], [FadeOut(q)]),
                      ("la Terre", [terre], []), ("et la Lune", [lune], [])], run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : 1 quart de la Terre ──
        self.dire("01-quart")
        self.play(FadeOut(lu), FadeOut(nm), run_time=0.25)
        f = EcritureFraction(1, 4, fs=36, couleur=TERRE)
        l1 = VGroup(f, self.inline("de la Terre", 30, TERRE)).arrange(RIGHT, buff=0.2)
        l1[1].set_y(f.trait.get_y())
        l1.move_to(P(0, 1.6))  # sous la ceinture, jamais collé
        au_fil(self, [("Voici 1 quart", [l1], [*[t.animate.set_stroke(opacity=1) for t in terre.traits],
                                                terre.parts[0].animate.set_fill(YELLOW, 1)])], run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 02 : 1 demi de la Lune ; le quart est plus gros ──
        self.dire("02-demi")
        g = EcritureFraction(1, 2, fs=36, couleur=LUNE)
        l2 = VGroup(g, self.inline("de la Lune", 30, LUNE)).arrange(RIGHT, buff=0.2)
        l2[1].set_y(g.trait.get_y())
        l2.move_to(P(0, 0.55))
        au_fil(self, [("voici 1 demi", [l2], [*[t.animate.set_stroke(opacity=1) for t in lune.traits],
                                               lune.parts[0].animate.set_fill(YELLOW, 1)])], run_time=0.6)
        self.au_mot("bien plus petite")
        self.play(Indicate(lune, color=AMBRE, scale_factor=1.4), run_time=0.7)
        sup = self.t(">", 60, AMBRE).move_to(P(0.9, YB))
        gros = self.bloc(["bien plus", "gros !"], 26, VERT_OK).move_to(P(1.25, YB - 0.8))  # sous la Lune, loin des fractions
        au_fil(self, [("le quart de la Terre", [], [terre.parts[0].animate.set_fill(VERT_OK, 1)]),
                      ("bien plus gros", [sup, gros], [])])
        qt = terre.parts[0]
        self.insister(qt, 1.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["Quel morceau est", "le plus gros ?"],
                            [self.inline("1/2 de pomme", 25), self.inline("1/4 de pastèque", 25),
                             self.inline("c'est pareil", 25)], 1,
                            ["Tout dépend de l'unité !"])
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        b20 = VGroup(*[Circle(radius=0.1, fill_color=TEINTES[i % 6], fill_opacity=1, stroke_width=0)
                       for i in range(20)]).arrange_in_grid(rows=4, buff=0.12).move_to(P(-1.0, YB))
        b6 = VGroup(*[Circle(radius=0.1, fill_color=TEINTES[i % 6], fill_opacity=1, stroke_width=0)
                      for i in range(6)]).arrange_in_grid(rows=2, buff=0.12).move_to(P(1.2, YB))
        f1 = EcritureFraction(1, 4, fs=36)
        e1 = VGroup(f1, self.inline("de 20", 30)).arrange(RIGHT, buff=0.15)
        e1[1].set_y(f1.trait.get_y())
        f2 = EcritureFraction(1, 2, fs=36)
        e2 = VGroup(self.inline("ou", 30, AMBRE), f2, self.inline("de 6 ?", 30)).arrange(RIGHT, buff=0.15)
        e2[0].set_y(f2.trait.get_y())
        e2[2].set_y(f2.trait.get_y())
        ligne = self.borne(VGroup(e1, e2).arrange(RIGHT, buff=0.25), 0.5).move_to(P(0, Y1))
        au_fil(self, [(("1 quart de 20", 1, "1"), [f1], []), ("1 quart de 20", [e1[1]], [FadeIn(b20)]),
                      (("1 demi de 6", 1, "1"), [e2[0], f2], []), ("1 demi de 6", [e2[2]], [FadeIn(b6)])])
        self.appel_commentaire(y=Y2 - 0.2)
