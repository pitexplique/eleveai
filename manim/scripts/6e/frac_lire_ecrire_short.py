# frac_lire_ecrire_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 01 « Lire et écrire une
# fraction » (micro fraction_lire_ecrire). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : on VOIT la fraction, aucun calcul à poser.
# Il AMUSE : la BARRE DE VIE d'un jeu vidéo. Jade, CRÉATRICE DE JEUX VIDÉO :
#   · EN HAUT, l'image qui bouge : le héros prend des coups, ses CŒURS se
#     brisent un à un (rouge → gris) ;
#   · EN BAS, au même instant, la barre du coach perd la part située
#     EXACTEMENT sous le cœur (même abscisse, un pointillé relie les deux) ;
#   · 3 cœurs sur 5 → 3/5 de vie ; contre le boss, 7 sur 10 → 7/10 ;
#   · 1 question-pause (3 s) : 2 cœurs sur 8 → 2/8 (leurres : 8/2, 6/8) ;
#   · fin : « 6 cœurs, il en perd 1 : quelle fraction de vie ? » en
#     commentaire (5/6).
# Centres d'intérêt : jeux-video, jeux-defis.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/6e-frac-lire-ecrire-short.json (débit −10) ; marques :
# manim/scripts/6e/frac_lire_ecrire_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/frac_lire_ecrire_short.py FracLireEcrireShort6e -o eleveai-maths-6e-frac-lire-ecrire-short --media_dir manim/scripts/6e/media-frac-lire-ecrire-short
# Sortie : manim/sorties/6e/maths/fractions/01-lire-ecrire/eleveai-maths-6e-frac-lire-ecrire-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F403

ROUGE_COEUR, GRIS_COEUR = "#ef4444", "#475569"
VIE = "#22c55e"
Y_HEROS, Y_COEURS, Y_BARRE = 1.62, 0.72, -0.42
LARG = 3.8


def coeur(r=0.3, couleur=ROUGE_COEUR):
    """Un cœur dessiné (courbe classique), jamais un emoji."""
    ts = np.linspace(0, TAU, 80)
    pts = [P(16 * np.sin(t) ** 3 / 17 * r, (13 * np.cos(t) - 5 * np.cos(2 * t) - 2 * np.cos(3 * t) - np.cos(4 * t))
             / 17 * r) for t in ts]
    c = VMobject(fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    c.set_points_smoothly(pts)
    return c


def heros(s=1.0):
    """Le héros du jeu : casque, visière, épée levée."""
    corps = RoundedRectangle(width=0.5, height=0.55, corner_radius=0.1, fill_color="#3b82f6", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.3))
    tete = Circle(radius=0.22, fill_color="#fcd34d", fill_opacity=1, stroke_width=0).move_to(P(0, 0.18))
    casque = Sector(radius=0.25, angle=PI, start_angle=0, fill_color="#94a3b8", fill_opacity=1,
                    stroke_width=0).move_to(P(0, 0.3))
    epee = VGroup(Line(P(0.32, -0.2), P(0.62, 0.45), color="#e2e8f0", stroke_width=6),
                  Line(P(0.25, -0.05), P(0.45, -0.15), color="#a16207", stroke_width=6))
    return VGroup(corps, tete, casque, epee).scale(s)


def boss(s=1.0):
    """Le boss : un gros monstre violet à cornes."""
    corps = Circle(radius=0.5, fill_color="#7c3aed", fill_opacity=1, stroke_width=0)
    yeux = VGroup(*[Circle(radius=0.08, fill_color=YELLOW, fill_opacity=1, stroke_width=0).move_to(P(x, 0.12))
                    for x in (-0.18, 0.18)])
    cornes = VGroup(*[Triangle(fill_color="#f8fafc", fill_opacity=1, stroke_width=0).scale(0.13)
                      .move_to(P(x, 0.55)) for x in (-0.3, 0.3)])
    bouche = Line(P(-0.2, -0.2), P(0.2, -0.2), color="#fbbf24", stroke_width=5)
    return VGroup(corps, yeux, cornes, bouche).scale(s)


class FracLireEcrireShort6e(ShortFrac):
    nom_voix = "6e-frac-lire-ecrire-short"
    fichier_marques = "frac_lire_ecrire_short_marques.json"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """Les cartes SOUS la question (jamais par-dessus), la consigne dessous."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.22).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.15).set_x(0)
        ph.next_to(cartes, DOWN, buff=0.15).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def vie(self, n):
        """n cœurs et la barre de n parts (vertes), alignés part sous cœur."""
        b = Barre(n, n, largeur=LARG, hauteur=0.42, couleur=VIE, marge=0.12, sw=2, centre=P(0, Y_BARRE))
        r = min(0.3, LARG / n * 0.4)
        cs = VGroup(*[coeur(r).move_to(P(b.parts[i].get_x(), Y_COEURS)) for i in range(n)])
        return cs, b

    def coup(self, cible, cs, b, i, rt=(0.6, 0.4)):
        """Un coup : le cœur i se brise EN MÊME TEMPS que sa part de la barre se vide."""
        lien = DashedLine(cs[i].get_bottom() + DOWN * 0.05, b.parts[i].get_top() + UP * 0.02, color=AMBRE,
                          stroke_width=4, dash_length=0.08)
        self.play(Flash(cible, color=ROUGE_COEUR, line_length=0.15, flash_radius=0.45), Create(lien),
                  cs[i].animate.set_fill(GRIS_COEUR).scale(0.85), b.vider([i]), run_time=rt[0])
        self.play(FadeOut(lien), Wiggle(cs[i], scale_value=1.05), run_time=rt[1])

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Combien de vie ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Jade et son héros ──
        self.dire("00-accroche")
        self.au_mot("Jade")
        j = self.ligne([("Jade,", BLEU_CALCUL), ("créatrice de jeux", WHITE)], 30).move_to(P(0, Y_BARRE))
        self.play(FadeIn(j, scale=0.8), run_time=0.4)
        h = heros(1.1).move_to(P(0, Y_HEROS))
        self.au_mot("Son héros")
        self.play(FadeIn(h, shift=UP * 0.2), run_time=0.5)
        cs, b = self.vie(5)
        self.au_mot("barre de vie")
        self.play(FadeOut(j), b.apparaitre(0.8), run_time=0.8)
        self.au_mot("5 cœurs")
        l5 = self.ligne([("5", VIE), ("cœurs", WHITE)], 32).move_to(P(0, -1.45))
        self.play(LaggedStart(*[GrowFromCenter(c) for c in cs], lag_ratio=0.15), FadeIn(l5, shift=UP * 0.15),
                  run_time=0.8)
        self.au_mot("Combien de vie")
        self.play(Write(titre), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : deux coups ──
        self.dire("01-coups")
        self.au_mot("perd 1")
        self.coup(h, cs, b, 4)
        self.au_mot("en perd 2")
        self.coup(h, cs, b, 3)
        self.au_mot("reste 3")
        self.play(FadeOut(l5), *[Indicate(cs[i], color=ROUGE_COEUR, scale_factor=1.25) for i in range(3)],
                  *[Indicate(b.parts[i], color=WHITE, scale_factor=1.1) for i in range(3)], run_time=0.7)
        self.au_mot("3 cinquièmes")
        f = EcritureFraction(3, 5, fs=62).move_to(P(-0.75, -1.6))
        dv = self.t("de vie", 34, VIE).next_to(f, RIGHT, buff=0.3)
        self.play(FadeIn(f, scale=1.4), run_time=0.4)
        self.play(FadeIn(dv, shift=RIGHT * 0.15), run_time=0.3)
        self.insister(f, 1.25)
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(VGroup(cs, b, f, dv)), run_time=0.4)

        # ── 02 : le boss, 10 cœurs ──
        self.dire("02-boss")
        bs = boss(0.75).move_to(P(1.2, Y_HEROS))
        self.au_mot("le boss")
        self.play(h.animate.shift(LEFT * 1.2), FadeIn(bs, scale=0.6), run_time=0.6)
        cs, b = self.vie(10)
        self.au_mot("10 cœurs")
        l10 = self.ligne([("10", VIE), ("cœurs", WHITE)], 32).move_to(P(0, -1.45))
        self.play(b.apparaitre(0.8), LaggedStart(*[GrowFromCenter(c) for c in cs], lag_ratio=0.08),
                  FadeIn(l10, shift=UP * 0.15), run_time=0.9)
        self.au_mot("perd 3")
        for i in (9, 8, 7):
            self.coup(h, cs, b, i, rt=(0.35, 0.2))
        self.au_mot("reste 7")
        self.play(FadeOut(l10), LaggedStart(*[Indicate(cs[i], color=ROUGE_COEUR, scale_factor=1.25) for i in range(7)],
                                            lag_ratio=0.08), run_time=0.7)
        self.au_mot("7 dixièmes")
        f = EcritureFraction(7, 10, fs=62).move_to(P(-0.75, -1.6))
        dv = self.t("de vie", 34, VIE).next_to(f, RIGHT, buff=0.3)
        self.play(FadeIn(f, scale=1.4), run_time=0.4)
        self.play(FadeIn(dv, shift=RIGHT * 0.15), run_time=0.3)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["Il reste 2 cœurs sur 8.", "Quelle fraction de vie ?"],
                            [self.inline("8/2", 30), self.inline("2/8", 30), self.inline("6/8", 30)], 1,
                            ["8 en tout, en bas ;", "2 qui restent, en haut."], mot_q="Il reste")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        h2 = heros(1.1).move_to(P(0, Y_HEROS))
        self.add(h2)
        cs, b = self.vie(6)
        self.au_mot("6 cœurs")
        self.play(b.apparaitre(0.8), LaggedStart(*[GrowFromCenter(c) for c in cs], lag_ratio=0.12), run_time=0.9)
        self.au_mot("perd 1")
        self.coup(h2, cs, b, 5)
        self.au_mot("Quelle fraction")
        f = EcritureFraction("?", 6, fs=62).move_to(P(-0.75, -1.6))
        dv = self.t("de vie", 34, VIE).next_to(f, RIGHT, buff=0.3)
        self.play(FadeIn(f, scale=1.3), FadeIn(dv), run_time=0.4)
        self.insister(f.num, 1.5)
        self.appel_commentaire(y=-2.62)
