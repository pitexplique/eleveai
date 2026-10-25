# frac_defi_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 07 « Défis sur les fractions »
# (micro fraction_defi). CEINTURE JAUNE : un cran sous la paysage orange (même
# choix que le défi statistiques 6e) — on compare trois fractions et on
# SIMPLIFIE 2/6 en 1/3, un pas de plus que le short blanc « on voit, sans calcul ».
# Il AMUSE : « Le défi des drapeaux ». Moussa, GRAPHISTE, dessine des drapeaux :
#   · EN HAUT, l'image : le drapeau se dessine bande par bande, la bande BLEUE
#     clignote ;
#   · EN BAS, AU MÊME INSTANT, la barre du pays se partage (3, 4, 6 parts) et
#     se colorie en BLEU à la place exacte de la bande (code couleur partagé) ;
#   · surprise : la Thaïlande (2/6) a autant de bleu que la France (1/3) ;
#     Maurice (1/4) en a le moins ;
#   · 1 question-pause (3 s) : laquelle est égale à 1/3 ? 4/12 ;
#   · fin : « Colombie : jaune sur la moitié, combien de huitièmes ? » (4).
# Données réelles vérifiées le 25/10/2026 (WebSearch) : France, 3 bandes
# verticales égales ; Maurice, 4 bandes horizontales égales (rouge, bleu, jaune,
# vert, Wikipédia « Flag of Mauritius ») ; Thaïlande, 5 bandes 1:1:2:1:1, le bleu
# au centre en double largeur (Wikipédia « Flag of Thailand », loi B.E. 2522) ;
# Colombie, jaune 1/2, bleu 1/4, rouge 1/4 (Wikipédia « Flag of Colombia »).
# Centres d'intérêt : histoire-geographie, art-design.
# Voix : manim/voix/6e-frac-defi-short.json (débit −10) ; marques :
# manim/scripts/6e/frac_defi_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/frac_defi_short.py FracDefiShort6e -o eleveai-maths-6e-frac-defi-short --media_dir manim/scripts/6e/media-frac-defi-short
# Sortie : manim/sorties/6e/maths/fractions/07-defi/eleveai-maths-6e-frac-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotb_commun import *  # noqa: E402,F403

BLEU_F, ROUGE_F, JAUNE_F, VERT_F = "#1d4ed8", "#dc2626", "#facc15", "#16a34a"
FW, FH, FY = 2.6, 1.5, 1.4       # le drapeau : largeur, hauteur, centre (en haut)
YS = [-0.12, -1.12, -2.12]          # les trois barres (en bas)


def drapeau(bandes, vertical=False, traits=False):
    """bandes = [(couleur, poids)] ; vertical=True : bandes verticales (France).
    .bandes[i] : le rectangle de la i-ième bande."""
    tot = sum(p for _, p in bandes)
    g = VGroup()
    g.bandes = VGroup()
    pos = 0
    for c, p in bandes:
        if vertical:
            r = Rectangle(width=FW * p / tot, height=FH, fill_color=c, fill_opacity=1, stroke_width=0)
            r.move_to(P(-FW / 2 + FW * (pos + p / 2) / tot, 0))
        else:
            r = Rectangle(width=FW, height=FH * p / tot, fill_color=c, fill_opacity=1, stroke_width=0)
            r.move_to(P(0, FH / 2 - FH * (pos + p / 2) / tot))
        g.bandes.add(r)
        pos += p
    cadre = Rectangle(width=FW, height=FH, stroke_color="#cbd5e1", stroke_width=3)
    g.add(g.bandes, cadre)
    if traits:  # les parts égales, en pointillé (la Thaïlande : 6 parts)
        g.add(VGroup(*[DashedLine(P(-FW / 2, FH / 2 - FH * j / tot), P(FW / 2, FH / 2 - FH * j / tot), color="#475569",
                                  stroke_width=2, dash_length=0.08) for j in range(1, tot)]))
    return g.move_to(P(0, FY))


class FracDefiShort6e(ShortB):
    nom_voix = "6e-frac-defi-short"
    fichier_marques = "frac_defi_short_marques.json"
    ceinture = "jaune"

    def barre(self, i, n, nom):
        b = Barre(n, 0, largeur=3.4, hauteur=0.36, couleur=BLEU_F, marge=0.1, sw=2, centre=P(0, YS[i]))
        t = self.mor(nom, 24, "#93c5fd").next_to(b.carte, UP, buff=0.05).align_to(b.carte, LEFT).shift(RIGHT * 0.05)
        return b, t

    def pays(self, cle, i, flag, n, bleus, nom, mot_bandes, mot_bleu, frac, mot_frac, ancien=None):
        """Le drapeau se dessine en haut ; la barre se partage en bas, en même temps ;
        la bande bleue et les parts bleues s'allument ensemble."""
        self.dire(cle)
        b, t = self.barre(i, n, nom)
        self.au_mot(mot_bandes)
        sortie = [FadeOut(ancien)] if ancien is not None else []
        self.play(*sortie, LaggedStart(*[FadeIn(r) for r in flag.bandes], lag_ratio=0.15), FadeIn(VGroup(*flag[1:])),
                  b.apparaitre(0.8), FadeIn(t), run_time=0.8)
        self.au_mot(mot_bleu)
        bl = [flag.bandes[k] for k in bleus["bandes"]]
        self.play(*[Indicate(r, color="#60a5fa", scale_factor=1.06) for r in bl], b.colorier(bleus["parts"], lag=0.1),
                  run_time=0.6)
        lab = self.inline(frac, 26, "#93c5fd").next_to(b.carte, UP, buff=0.05).align_to(b.carte, RIGHT).shift(LEFT * 0.05)
        self.au_mot(mot_frac)
        self.play(FadeIn(lab, scale=1.3), run_time=0.35)
        self.attendre_voix(marge=0.2)
        return b, t, lab

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le défi des drapeaux", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Moussa, graphiste ──
        self.dire("00-accroche")
        self.au_mot("Moussa")
        m = self.borne(self.mor("Moussa, graphiste", 34, BLEU_CALCUL), 0.7).move_to(P(0, 1.3))
        self.play(FadeIn(m, scale=0.8), run_time=0.4)
        self.au_mot("le plus de bleu")
        self.play(Write(titre), run_time=0.6)
        self.attendre_voix(marge=0.2)

        fr_ = drapeau([(BLEU_F, 1), (WHITE, 1), (ROUGE_F, 1)], vertical=True)
        b1, t1, l1 = self.pays("01-france", 0, fr_, 3, {"bandes": [0], "parts": [0]}, "France", "3 bandes",
                               "Le bleu", "1/3", "1 tiers", ancien=m)
        mu = drapeau([(ROUGE_F, 1), (BLEU_F, 1), (JAUNE_F, 1), (VERT_F, 1)])
        b2, t2, l2 = self.pays("02-maurice", 1, mu, 4, {"bandes": [1], "parts": [1]}, "Maurice", "4 bandes",
                               "Le bleu", "1/4", "1 quart", ancien=fr_)
        th = drapeau([(ROUGE_F, 1), (WHITE, 1), (BLEU_F, 1), (BLEU_F, 1), (WHITE, 1), (ROUGE_F, 1)], traits=True)
        b3, t3, l3 = self.pays("03-thailande", 2, th, 6, {"bandes": [2, 3], "parts": [2, 3]}, "Thaïlande",
                               "6 parts", "le bleu", "2/6", "2 sixièmes", ancien=mu)
        self.surprise(th, (b1, b2, b3), (l1, l2, l3), garder)

    def surprise(self, th, barres, labs, garder):
        b1, b2, b3 = barres
        self.dire("04-surprise")
        # les deux parts bleues glissent au début de la barre, puis on regroupe 2 par 2
        b3b = Barre(6, colories=[0, 1], largeur=3.4, hauteur=0.36, couleur=BLEU_F, marge=0.1, sw=2, centre=P(0, YS[2]))
        l = self.ligne_mots([(EcritureFraction(2, 6, fs=40, couleur="#93c5fd"), WHITE, "2 sixièmes"),
                             ("=", WHITE, None), (EcritureFraction(1, 3, fs=40, couleur="#93c5fd"), WHITE, "1 tiers")], fs=36)
        l.move_to(P(0, 1.55))
        etat = {}

        def glisser():
            return [FadeOut(th, run_time=0.4), ReplacementTransform(b3, b3b, run_time=0.6)]

        def regrouper():
            b, anim = b3b.regrouper(2, run_time=0.8)
            etat["b"] = b
            return [anim]

        l.extras[0] = glisser
        l.extras[2] = regrouper
        self.jouer_mots(l)
        x = b1.x_trait(1)
        tir = DashedLine(P(x, b1.contour.get_top()[1] + 0.1), P(x, etat["b"].contour.get_bottom()[1] - 0.1),
                         color=AMBRE, stroke_width=5, dash_length=0.1)
        self.au_mot("autant de bleu")
        eg = self.mor("autant de bleu !", 30, VERT_OK).move_to(P(0, 0.82))
        self.play(Create(tir), FadeIn(eg, scale=1.2), Indicate(VGroup(labs[0], labs[2]), color=VERT_OK), run_time=0.6)
        self.au_mot("Maurice en a le moins")
        moins = self.mor("Maurice : le moins", 28, ORANGE_RETENUE)
        moins.next_to(b2.carte, UP, buff=0.05).align_to(b2.carte, LEFT).shift(RIGHT * 0.05)
        self.play(FadeOut(VGroup(*[m for m in self.mobjects if getattr(m, "original_text", "") == "Maurice"])),
                  FadeIn(moins), Indicate(b2.parts[1], color=ORANGE_RETENUE, scale_factor=1.2), run_time=0.5)
        self.attendre_voix(marge=0.5)
        self.vider(garder)

        # ── 05 : la question-pause (3 s) ──
        self.question_b("05-question", "05b-reponse", ["Laquelle est", "égale à 1 tiers ?"],
                        [bloc_fixe(self.inline("4/12", 30)), bloc_fixe(self.inline("3/4", 30)),
                         bloc_fixe(self.inline("2/5", 30))], 0,
                        [[("4 ÷ 4", WHITE, "4 divisé"), ("= 1", VERT_OK, "1. 12"),
                          ("12 ÷ 4", WHITE, "12 divisé"), ("= 3", VERT_OK, "3.")]],
                        fs_rep=26, mot_q="Laquelle")
        self.vider(garder)

        # ── 06 : la question en commentaire (Colombie) ──
        self.dire("06-question")
        co = drapeau([(JAUNE_F, 2), (BLEU_F, 1), (ROUGE_F, 1)]).shift(RIGHT * 0.4)
        self.au_mot("la Colombie")
        self.play(LaggedStart(*[FadeIn(r) for r in co.bandes], lag_ratio=0.2), FadeIn(co[1]), run_time=0.6)
        self.au_mot("la moitié")
        acc = Brace(co.bandes[0], LEFT, color=JAUNE_F, buff=0.08)
        dm = EcritureFraction(1, 2, fs=36, couleur=JAUNE_F).next_to(acc, LEFT, buff=0.08)
        self.play(GrowFromCenter(acc), FadeIn(dm), Indicate(co.bandes[0], color=WHITE, scale_factor=1.04), run_time=0.5)
        self.au_mot("Combien de huitièmes")
        f = EcritureFraction("…", 8, fs=60, couleur=JAUNE_F)
        f.move_to(P(0, -0.35))
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.insister(f.num, 1.5)
        self.appel_commentaire(y=-1.6)
