# stats_moyenne_short.py
# EleveAI — Maths 4e / 3e — short jumeau de la série « Statistiques » (cycle 4),
# épisode commun « calculer une moyenne ». CEINTURE JAUNE (la moyenne se VOIT
# comme un partage égal, un seul calcul dit : 84 ÷ 7 ; sous les paysages verte
# et orange). Il AMUSE : « Une pluie d'étoiles filantes ! Devine ! »
#   · en HAUT, les étoiles filantes de chaque nuit, empilées au-dessus de LEUR
#     barre ;
#   · en BAS, EN MÊME TEMPS, le diagramme du coach (canvas_stats.Barres) : la
#     barre pousse quand ses étoiles arrivent ; puis les grandes nuits donnent
#     leurs étoiles aux petites, étoiles ET barres bougent ensemble jusqu'à 12 ;
#   · fin : « moyenne 15 sur 7 nuits : combien en tout ? » (105).
# Données (voir stats_moyenne.py) : 12, 8, 15, 20, 10, 6, 13 = 84.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# Voix : manim/voix/4e-stats-moyenne-short.json ; calage :
# manim/scripts/4e/stats_moyenne_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/stats_moyenne_short.py StatsMoyenneShort -o eleveai-maths-4e-stats-moyenne-short --media_dir manim/scripts/4e/media-moyenne-short
# Sorties : manim/sorties/4e/maths/statistiques/06-moyenne/eleveai-maths-4e-stats-moyenne-short.mp4
#           manim/sorties/3e/maths/statistiques/04-moyenne/eleveai-maths-3e-stats-moyenne-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lotf_commun import *  # noqa: E402,F403
from stats_moyenne import C_BAR, FIL, NUITS, TRANSFERTS, etoile, filante, hauteur_vers  # noqa: E402

Y_PILE = 0.35   # le bas des piles d'étoiles
Y_TXT = 1.85
HAUT_CARTE = 0.1
DY, DX = 0.1, 0.11


class StatsMoyenneShort(ShortF):
    nom_voix = "4e-stats-moyenne-short"
    fichier_marques = "stats_moyenne_short_marques.json"

    def graphe(self):
        g = Barres(NUITS, FIL, pas=5, maxi=25, couleurs=C_BAR, largeur=3.55, hauteur=2.0, fs=20)
        g.scale_to_fit_width(4.1)
        if g.height > 2.9:
            g.scale_to_fit_height(2.9)
        return g.move_to(P(0, HAUT_CARTE), aligned_edge=UP)

    def place(self, g, i, k):
        """La k-ième étoile (0 = en bas) de la pile de la nuit i : deux colonnes."""
        x = g.base(i)[0] + (-DX / 2 if k % 2 == 0 else DX / 2)
        return P(x, Y_PILE + (k // 2) * DY)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Pluie d'étoiles", "jaune")
        self.add(badge)
        g = self.graphe()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        fils = [filante(0.7).move_to(P(-1.6 + 1.1 * k, 1.4 - 0.25 * (k % 2))) for k in range(4)]
        self.play(Write(titre), LaggedStart(*[AnimationGroup(FadeIn(f), f.animate.shift(RIGHT * 0.5 + DOWN * 0.22))
                                              for f in fils], lag_ratio=0.25), run_time=1.0)
        self.au_mot("Combien en voit-on")
        q = self.ligne([("Par heure :", WHITE), ("?", ORANGE_RETENUE)], 34).move_to(P(0, Y_TXT))
        self.play(*[FadeOut(f) for f in fils], FadeIn(q, shift=UP * 0.2), FadeIn(g.fond), run_time=0.4)
        self.au_mot("Devine")
        self.insister(q[1], 1.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : les étoiles et les barres ──
        self.dire("01-image")
        piles = [VGroup(*[etoile(0.05).move_to(self.place(g, i, k)) for k in range(v)]) for i, v in enumerate(FIL)]
        vals = VGroup()
        for i, p in enumerate(self.nombres_apres("nuit après nuit", 7)):
            self.au_i(p)
            v = g.valeur(i, fs=24)
            vals.add(v)
            self.play(GrowFromEdge(g.barres[i], DOWN), FadeIn(v, scale=1.6),
                      LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in piles[i]], lag_ratio=0.04), run_time=0.35)
        self.au_mot("Les grandes nuits")
        self.play(FadeOut(vals), run_time=0.2)
        etat = list(FIL)
        for de, vers, n in TRANSFERTS:
            partants = [piles[de][-1 - j] for j in range(n)]
            anims = []
            for j, b in enumerate(partants):
                cible = self.place(g, vers, etat[vers] + j)
                anims.append(MoveAlongPath(b, ArcBetweenPoints(b.get_center(), cible, angle=-PI / 2)))
            etat[de] -= n
            etat[vers] += n
            anims += [Transform(g.barres[de], hauteur_vers(g, de, etat[de])),
                      Transform(g.barres[vers], hauteur_vers(g, vers, etat[vers]))]
            self.play(*anims, run_time=0.45)
            for b in partants:
                piles[de].remove(b)
                piles[vers].add(b)
        self.au_mot("Toutes les nuits en ont 12")
        y12 = g.y_axe(12)[1]
        lm = DashedLine(P(g.base(0)[0] - 0.3, y12), P(g.base(6)[0] + 0.3, y12), color=VERT_OK, stroke_width=5,
                        dash_length=0.1)
        douze = self.ligne([("12", VERT_OK), ("partout !", WHITE)], 34).move_to(P(0, Y_TXT))
        self.play(FadeOut(q), FadeIn(douze, scale=0.7), Create(lm), run_time=0.45)
        self.play(LaggedStart(*[Indicate(piles[i], color=VERT_OK, scale_factor=1.12) for i in range(7)],
                              lag_ratio=0.1), run_time=0.8)
        self.au_mot("La moyenne, c'est 12")
        moy = self.ligne([("Moyenne :", WHITE), ("12", VERT_OK)], 38).move_to(P(0, Y_TXT))
        self.play(FadeOut(douze, shift=UP * 0.2), FadeIn(moy, shift=UP * 0.2), run_time=0.35)
        self.insister(moy[1], 1.5)
        self.au_mot("7 nuits")
        calc = self.borne(self.ligne([("84", BLEU_CALCUL), ("étoiles", WHITE), ("÷", WHITE), ("7", BLEU_CALCUL),
                                      ("nuits", WHITE)], 30)).move_to(P(0, 1.42))
        self.play(FadeIn(calc, shift=UP * 0.15), *[FadeOut(p) for p in piles], run_time=0.35)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("une moyenne de 15")
        self.play(FadeOut(VGroup(moy, calc), shift=UP * 0.2), run_time=0.3)
        y15 = g.y_axe(15)[1]
        l15 = DashedLine(P(g.base(0)[0] - 0.3, y15), P(g.base(6)[0] + 0.3, y15), color=ORANGE_RETENUE,
                         stroke_width=5, dash_length=0.1)
        q1 = self.ligne([("Moyenne", WHITE), ("15", ORANGE_RETENUE)], 36).move_to(P(0, Y_TXT))
        self.play(FadeIn(q1, shift=DOWN * 0.2), Create(l15), FadeOut(lm), run_time=0.4)
        self.au_mot("sur 7 nuits")
        q2 = self.borne(self.ligne([("Moyenne", WHITE), ("15", ORANGE_RETENUE), ("sur", WHITE), ("7", ORANGE_RETENUE),
                                    ("nuits", WHITE)], 34)).move_to(P(0, Y_TXT))
        self.play(FadeOut(q1), FadeIn(q2), run_time=0.35)
        self.au_mot("combien faut-il")
        q3 = self.ligne([("En tout :", WHITE), ("?", ORANGE_RETENUE)], 40).move_to(P(0, 1.15))
        self.play(FadeIn(q3, scale=0.7), run_time=0.35)
        self.insister(q3[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 0.5))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
