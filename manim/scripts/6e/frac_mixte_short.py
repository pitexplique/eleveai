# frac_mixte_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 06 « Encadrer, ranger, écriture
# mixte » (micro fraction_mixte). CEINTURE BLANCHE (règle du short blanc) : on VOIT
# la notion, aucun calcul posé.
# Il AMUSE : « La grenouille sauteuse ». Lou, BIOLOGISTE, suit une grenouille qui
# avance de 1/4 de mètre à chaque saut :
#   · EN HAUT, l'image qui bouge : la grenouille saute au-dessus de l'eau ;
#   · EN BAS, AU MÊME INSTANT, le point de la demi-droite graduée en quarts avance
#     d'un quart, JUSTE SOUS ELLE (même abscisse : un fil pointillé les relie) ;
#   · code couleur partagé : la grenouille VERTE, le point et les sauts VERTS ;
#   · surprise : 9 quarts, ce n'est pas vers 9 : c'est 2 + 1/4, entre 2 et 3 ;
#   · 1 question-pause (3 s) : 5/2 → entre 2 et 3 ;
#   · fin : « 11 tiers, c'est entre quels entiers ? » en commentaire (3 et 4).
# Centres d'intérêt : animaux, sciences.
# Voix : manim/voix/6e-frac-mixte-short.json (débit −10) ; marques :
# manim/scripts/6e/frac_mixte_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/frac_mixte_short.py FracMixteShort6e -o eleveai-maths-6e-frac-mixte-short --media_dir manim/scripts/6e/media-frac-mixte-short
# Sortie : manim/sorties/6e/maths/fractions/06-mixte/eleveai-maths-6e-frac-mixte-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotb_commun import *  # noqa: E402,F403

VERT_G = "#22c55e"
Y_EAU = 0.75      # la ligne de l'eau (en haut)
Y_DR = -0.3      # la demi-droite (en bas), sans carte


def grenouille(s=1.0):
    """Une grenouille vue de profil, tournée vers la droite."""
    corps = Ellipse(width=0.62, height=0.38, fill_color=VERT_G, fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.17, fill_color=VERT_G, fill_opacity=1, stroke_width=0).move_to(P(0.27, 0.12))
    oeil = VGroup(Circle(radius=0.08, fill_color=WHITE, fill_opacity=1, stroke_width=0),
                  Dot(radius=0.04, color="#111827")).move_to(P(0.3, 0.27))
    patte = Polygon(P(-0.3, -0.05), P(-0.05, -0.18), P(-0.32, -0.2), fill_color="#15803d", fill_opacity=1,
                    stroke_width=0)
    ventre = Ellipse(width=0.4, height=0.14, fill_color="#bbf7d0", fill_opacity=1, stroke_width=0).move_to(P(0.05, -0.12))
    g = VGroup(corps, ventre, patte, tete, oeil).scale(s)
    return g


class FracMixteShort6e(ShortB):
    nom_voix = "6e-frac-mixte-short"
    fichier_marques = "frac_mixte_short_marques.json"
    ceinture = "blanche"

    def decor(self):
        dr = Droite(0, 3, 12, etiquettes={0: "0", 1: "1", 2: "2", 3: "3"}, longueur=3.1, fs=30, carte=False,
                    depasse=0.22, centre=P(-0.1, Y_DR))
        dr.shift(P(-0.1, Y_DR) - dr.p(1.5) + RIGHT * 0.0)
        corps = VGroup(dr.axe, *dr.ticks.values(), *dr.etiquettes.values())
        carte = RoundedRectangle(width=corps.width + 0.3, height=corps.height + 0.75, corner_radius=0.18,
                                 fill_color=CARTE, fill_opacity=1, stroke_color=GRILLE, stroke_width=3)
        carte.move_to(corps).shift(UP * 0.22)
        eau = VGroup(Rectangle(width=4.0, height=0.3, fill_color="#0ea5e9", fill_opacity=0.55, stroke_width=0),
                     *[Arc(radius=0.12, start_angle=0, angle=PI, color="#7dd3fc", stroke_width=3)
                       .move_to(P(-1.7 + 0.42 * k, 0.12)) for k in range(9)]).move_to(P(0, Y_EAU - 0.15))
        return dr, carte, eau

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La grenouille sauteuse", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        dr, carte, eau = self.decor()
        gr = grenouille(1.15)
        gr.move_to(P(dr.p(0)[0], Y_EAU + gr.height / 2 - 0.02))
        haut_carte = carte.get_top()[1]
        fil = always_redraw(lambda: DashedLine(P(gr.get_x(), gr.get_bottom()[1] - 0.04), P(gr.get_x(), haut_carte),
                                               color=VERT_G, stroke_width=3, dash_length=0.08))
        pt = Dot(dr.p(0), radius=0.1, color=VERT_G)

        # ── 00 : Lou, la grenouille ──
        self.dire("00-accroche")
        self.au_mot("Lou")
        m = self.mor("Lou, biologiste", 34, BLEU_CALCUL).move_to(P(0, -1.45))
        self.play(FadeIn(m, scale=0.8), run_time=0.4)
        self.au_mot("une grenouille")
        self.play(FadeIn(eau), GrowFromCenter(gr), run_time=0.6)
        self.au_mot("1 quart de mètre")
        acc = BraceBetweenPoints(dr.p(0) + UP * 0.28, dr.p(0.25) + UP * 0.28, color=AMBRE)
        q = self.mor("1/4 m", 28, AMBRE).next_to(acc, RIGHT, buff=0.08).shift(UP * 0.15)
        self.play(FadeIn(carte), FadeIn(dr), FadeIn(pt), Create(fil), GrowFromCenter(acc), FadeIn(q), run_time=0.5)
        self.au_mot("9 sauts")
        n9 = self.mor("9 sauts ?", 36, AMBRE).move_to(P(0, -2.1))
        self.play(FadeIn(n9, scale=1.3), run_time=0.35)
        self.au_mot("où est-elle")
        self.play(Write(titre), FadeOut(VGroup(acc, q)), run_time=0.6)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(m, n9)), run_time=0.3)

        # ── 01 : les 9 sauts, en haut ET en bas en même temps ──
        self.dire("01-sauts")
        mots = ["1, 2", "2, 3", "3, 4", "4 :", "5, 6", "6, 7", "7, 8", "8 :", "Et 9"]
        compteur = None
        for k, mot in enumerate(mots):
            self.au_mot(mot)
            if mot == "Et 9":
                self.wait(0.35)  # la marque tombe sur « Et » : le 9 arrive 0,3 s après
            a, b = dr.p(k / 4), dr.p((k + 1) / 4)
            arc = ArcBetweenPoints(P(a[0], gr.get_y()), P(b[0], gr.get_y()), angle=-PI * 0.7)
            sb = ArcBetweenPoints(a + UP * 0.05, b + UP * 0.05, angle=-PI / 2, color=VERT_G, stroke_width=4)
            neuf = VGroup(self.mor(str(k + 1), 54, VERT_G), self.mor("quart" + ("s" if k else ""), 32, VERT_G))
            neuf.arrange(RIGHT, buff=0.15, aligned_edge=DOWN).move_to(P(0, 1.85))
            anims = [MoveAlongPath(gr, arc), pt.animate.move_to(b), Create(sb)]
            anims += [FadeIn(neuf, scale=1.3)] + ([FadeOut(compteur)] if compteur else [])
            compteur = neuf
            self.play(*anims, run_time=0.32)
            if k in (3, 7):
                e = self.mor(f"{(k + 1) // 4} m", 30, AMBRE).move_to(P(dr.p((k + 1) / 4)[0], -1.35))
                self.au_mot("1 mètre" if k == 3 else "2 mètres")
                self.play(FadeIn(e, scale=1.4), Flash(pt, color=AMBRE, flash_radius=0.3), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.suite(dr, pt, gr, garder)

    def suite(self, dr, pt, gr, garder):
        # ── 02 : la surprise (9 quarts = 2 + 1/4) ──
        self.dire("02-surprise")
        metres = [m for m in self.mobjects if isinstance(m, Text) and getattr(m, "original_text", "").endswith(" m")]
        l1 = self.ligne_mots([(EcritureFraction(9, 4, fs=44, couleur=VERT_G), WHITE, "9 quarts,"),
                              ("=", WHITE, ("2 mètres", 1)), ("2", AMBRE, None), ("+", WHITE, "plus 1"),
                              (EcritureFraction(1, 4, fs=44, couleur=VERT_G), WHITE, "1 quart.")], fs=40)
        l1.move_to(P(0, -1.4))
        l1.extras[0] = lambda: [FadeOut(VGroup(*metres)), Indicate(gr, color=AMBRE)]
        lot1 = VGroup(l1[0])
        lot1.mots, lot1.extras = [l1.mots[0]], [l1.extras[0]]
        self.jouer_mots(lot1)
        self.au_mot("pas vers 9")
        pas9 = self.mor("pas vers 9 !", 34, ROUGE_ERREUR).move_to(P(0, -2.2))
        self.play(FadeIn(pas9, scale=1.3), run_time=0.35)
        reste = VGroup(*l1[1:])
        reste.mots, reste.extras = l1.mots[1:], [None] * 4
        reste.extras[0] = lambda: [FadeOut(pas9)]
        self.jouer_mots(reste)
        l2 = self.ligne_mots([("entre", WHITE, "entre 2"), ("2", AMBRE, None), ("et", WHITE, "et 3"), ("3", AMBRE, None)],
                             fs=36)
        l2.move_to(P(0, -2.2))
        self.jouer_mots(l2, avec=[Indicate(VGroup(dr.etiquettes[2], dr.etiquettes[3]), color=AMBRE, scale_factor=1.6)])
        self.attendre_voix(marge=0.5)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_b("03-question", "03b-reponse", ["5 demis, c'est entre", "quels entiers ?"],
                        [bloc_fixe(self.inline("entre 1 et 2", 28)), bloc_fixe(self.inline("entre 2 et 3", 28)),
                         bloc_fixe(self.inline("entre 5 et 6", 28))], 1,
                        [[("4/2", WHITE, "4 demis"), ("= 2,", WHITE, "2. Donc"),
                          ("5/2", VERT_OK, "5 demis égale"), ("= 2 +", VERT_OK, "2 plus"), ("1/2", VERT_OK, "1 demi.")]],
                        fs_rep=26, mot_q="5 demis")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        f = EcritureFraction(11, 3, fs=80)
        f.move_to(P(0, 1.0))
        self.au_mot("11 tiers")
        self.play(FadeIn(f, scale=1.4), run_time=0.4)
        self.au_mot("entre quels")
        q = self.ligne([("entre", WHITE), ("…", ORANGE_TROU), ("et", WHITE), ("…", ORANGE_TROU), ("?", WHITE)], 40)
        q.move_to(P(0, -0.35))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.appel_commentaire(y=-1.5)
