# frac_pourcentage_decimal_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 13 « Pourcentages et nombres
# décimaux » (micro pourcentage_decimal). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : on VOIT la notion, aucun calcul posé.
# Il AMUSE : l'affiche ratée. Sami, VENDEUR, écrit « −0,25 % » au lieu de
# « −25 % » sur des baskets à 100 € :
#   · EN HAUT, l'image : l'affiche des soldes, les baskets et leur étiquette
#     de prix qui change (99,75 € puis 75 €) ;
#   · EN BAS, au même instant, les 100 € en 100 cases (1 € par case) : la
#     remise s'allume — un QUART DE CASE pour 0,25 %, 25 cases pour 25 % ;
#   · c'est SA troisième erreur des 6e (0,75 = 75 %, leurre 0,75 %) ;
#   · 1 question-pause (3 s) : 0,1 = ? % (10) ;
#   · fin : « 0,3 du prix, combien de pour cent ? » en commentaire (30).
# Centres d'intérêt : argent-budget, jeux-defis. Prix inventés.
#
# Voix : manim/voix/6e-frac-pourcentage-decimal-short.json (débit −10) ;
# marques : manim/scripts/6e/frac_pourcentage_decimal_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/frac_pourcentage_decimal_short.py FracPourcentageDecimalShort6e -o eleveai-maths-6e-frac-pourcentage-decimal-short --media_dir manim/scripts/6e/media-frac-pourcentage-decimal-short
# Sortie : manim/sorties/6e/maths/fractions/13-pourcentage-decimal/eleveai-maths-6e-frac-pourcentage-decimal-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotc_commun import *  # noqa: E402,F403

ROUGE_SOLDES = "#dc2626"
Y_LIGNE = 0.62


def affiche(txt, couleur=ROUGE_SOLDES):
    fond = RoundedRectangle(width=2.1, height=1.05, corner_radius=0.1, fill_color=couleur, fill_opacity=1,
                            stroke_color=WHITE, stroke_width=3)
    s = Text("SOLDES", font_size=26, color=WHITE, weight=BOLD).move_to(fond.get_top() + DOWN * 0.27)
    v = Text(txt, font_size=28, color="#fef08a", weight=BOLD).move_to(fond.get_center() + DOWN * 0.15)
    v.sans_synchro = True
    g = VGroup(fond, s, v)
    g.valeur = v
    return g


def basket():
    """Une basket de profil : semelle blanche, tige bleue, lacets."""
    semelle = RoundedRectangle(width=1.5, height=0.18, corner_radius=0.08, fill_color=WHITE, fill_opacity=1,
                               stroke_width=0)
    tige = Polygon(P(-0.72, 0.08), P(0.72, 0.08), P(0.7, 0.25), P(0.1, 0.42), P(-0.25, 0.75), P(-0.7, 0.75),
                   fill_color="#2563eb", fill_opacity=1, stroke_width=0)
    lacets = VGroup(*[Line(P(-0.2 + 0.12 * i, 0.55 - 0.08 * i), P(0.0 + 0.12 * i, 0.62 - 0.08 * i),
                           stroke_color=WHITE, stroke_width=3) for i in range(3)])
    return VGroup(tige, semelle, lacets)


def etiquette(prix, couleur=WHITE):
    t = Text(prix, font_size=30, color=NUIT, weight=BOLD)
    fond = RoundedRectangle(width=t.width + 0.35, height=0.5, corner_radius=0.08, fill_color=couleur,
                            fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    t.move_to(fond)
    return VGroup(fond, t)


class FracPourcentageDecimalShort6e(ShortLotC):
    nom_voix = "6e-frac-pourcentage-decimal-short"
    fichier_marques = "frac_pourcentage_decimal_short_marques.json"
    ceinture = "blanche"

    def ligne_haut(self, morceaux, fs=28):
        return self.ligne(morceaux, fs).move_to(P(0, Y_LIGNE))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Bonne affaire ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        aff = affiche("−0,25 %").move_to(P(-0.98, 1.6))
        bk = basket().move_to(P(1.1, 1.85))
        tag = etiquette("100 €").move_to(P(1.1, 1.15))
        gr = grille100(0, cote=0.24, centre=P(0, -1.1), couleur=ORANGE_PART)

        # ── 00 : l'affiche ──
        self.dire("00-accroche")
        self.au_mot("Sami, vendeur")
        sv = self.t("Sami, vendeur", 34, BLEU_CALCUL).move_to(P(0, 1.65))
        self.play(FadeIn(sv, scale=0.8), run_time=0.4)
        self.au_mot("l'affiche des soldes")
        self.play(FadeOut(sv), FadeIn(aff[0]), FadeIn(aff[1]), run_time=0.4)
        self.au_mot("0,25 %")
        self.play(FadeIn(aff.valeur, scale=1.4), run_time=0.3)
        self.au_mot("baskets")
        self.play(FadeIn(bk, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("100 €")
        cent = self.ligne_haut([("100 €", WHITE), ("=", WHITE), ("100 cases", ORANGE_PART)])
        self.play(FadeIn(tag, scale=1.3), FadeIn(cent), gr.apparaitre(0.8), run_time=0.8)
        self.au_mot("Bonne affaire")
        self.play(Write(titre), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : 0,25 % = un quart de case ──
        self.dire("01-vrai")
        c0 = gr.liste[0]
        bout = Rectangle(width=c0.width * 0.25, height=c0.height, fill_color=ROUGE_SOLDES, fill_opacity=1,
                         stroke_width=0).align_to(c0, LEFT).align_to(c0, UP)
        l1 = self.ligne_haut([("remise : 0,25 €", ROUGE_SOLDES)])
        l1[0].sans_synchro = True
        self.au_mot("0,25 €")
        loupe = Circle(radius=0.3, stroke_color=AMBRE, stroke_width=6).move_to(c0)
        self.play(FadeOut(cent), FadeIn(l1, shift=UP * 0.1), FadeIn(bout), Create(loupe), run_time=0.5)
        self.au_mot("25 centimes")
        l2 = self.ligne_haut([("= 25 centimes !", ROUGE_SOLDES)])
        self.play(FadeOut(l1), FadeIn(l2, scale=1.2), loupe.animate.scale(1.5), run_time=0.4)
        self.play(loupe.animate.scale(1 / 1.5), run_time=0.3)
        self.au_mot("99,75 €")
        tag2 = etiquette("99,75 €").move_to(tag)
        self.play(FadeOut(tag), FadeIn(tag2, scale=1.3), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : il voulait 0,25 du prix = 25 % ──
        self.dire("02-voulu")
        self.au_mot("Sami voulait")
        l3 = self.ligne_haut([("Il voulait :", WHITE), ("0,25", BLEU_CALCUL), ("du prix", WHITE)])
        self.play(FadeOut(l2), FadeIn(l3[0]), run_time=0.3)
        self.au_mot("0,25 du prix")
        self.play(FadeIn(l3[1:], scale=1.2), run_time=0.3)
        self.au_mot("0,25 fois 100")
        l4 = self.ligne_haut([("0,25 × 100 =", WHITE), ("25", VERT_OK), ("→ 25 %", VERT_OK)])
        self.play(FadeOut(l3), run_time=0.2)
        self.poser_lignes(l4, "fade", 0.3)
        self.attendre_voix(marge=0.2)

        # ── 03 : −25 % : 25 cases, 75 € ──
        self.dire("03-bon")
        self.au_mot("moins 25 %")
        aff2 = affiche("−25 %", couleur="#16a34a").move_to(aff)
        self.play(FadeOut(loupe), FadeOut(bout), Transform(aff, aff2), run_time=0.5)
        self.au_mot("25 €")
        l5 = self.ligne_haut([("25 € de remise", VERT_OK)])
        self.play(FadeOut(l4), FadeIn(l5, shift=UP * 0.1), gr.colorier(range(25), couleur=VERT_PART, lag=0.03),
                  run_time=1.1)
        self.au_mot("75 €")
        tag3 = etiquette("75 €", "#bbf7d0").move_to(tag)
        self.play(FadeOut(tag2), FadeIn(tag3, scale=1.3), run_time=0.4)
        self.au_mot("Un seul signe")
        self.play(Indicate(aff, color=AMBRE, scale_factor=1.15), run_time=0.7)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) ──
        self.question_pause("04-question", "04b-reponse", ["0,1, c'est", "combien de pour cent ?"],
                            [self.inline("1 %", 30), self.inline("0,1 %", 30), self.inline("10 %", 30)], 2,
                            ["0,1 × 100 = 10", "→ 10 %"], mot_q="0,1")
        self.vider(garder)

        # ── 05 : la question en commentaire ──
        self.dire("05-question")
        self.au_mot("0,3 du prix")
        f = self.t("0,3 du prix", 48, BLEU_CALCUL).move_to(P(0, 1.3))
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("combien de pour cent")
        q = self.t("= ? %", 64, ORANGE_PART).move_to(P(0, 0.3))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.insister(q, 1.3)
        self.appel_commentaire(y=-1.0)
