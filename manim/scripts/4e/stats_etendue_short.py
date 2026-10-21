# stats_etendue_short.py
# EleveAI — Maths 4e / 3e — short jumeau de la série « Statistiques » (cycle 4),
# épisode commun « calculer l'étendue ». CEINTURE BLANCHE (on VOIT l'écart
# entre la mer haute et la mer basse ; une seule soustraction dite).
# Il AMUSE : « La mer peut monter de plus de 10 mètres en 6 heures ! »
#   · en HAUT, le quai de Saint-Malo : l'eau monte et descend, un bateau flotte ;
#   · en BAS, EN MÊME TEMPS, la courbe du coach (canvas_stats.Courbe) : à chaque
#     hauteur dite, l'eau arrive à ce niveau ET le point de la courbe apparaît ;
#     le plus haut, le plus bas, puis la double flèche de l'étendue, 11 m ;
#   · fin : La Réunion, de 0,2 à 0,7 m : l'étendue ? (0,5) en commentaire.
# Données (voir stats_etendue.py) : 11,5 ; 8 ; 4 ; 1,5 ; 4,5 ; 9 ; 12,5.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# Voix : manim/voix/4e-stats-etendue-short.json ; calage :
# manim/scripts/4e/stats_etendue_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/stats_etendue_short.py StatsEtendueShort -o eleveai-maths-4e-stats-etendue-short --media_dir manim/scripts/4e/media-etendue-short
# Sorties : manim/sorties/4e/maths/statistiques/08-etendue/eleveai-maths-4e-stats-etendue-short.mp4
#           manim/sorties/3e/maths/statistiques/06-etendue/eleveai-maths-3e-stats-etendue-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lotf_commun import *  # noqa: E402,F403
from stats_etendue import HEURES, MALO, MER, bateau, fleche_ecart  # noqa: E402

Y0, Y1 = 0.62, 2.12     # le fond et le haut (14 m) du bassin
Y_TXT = 0.3
X_G, X_D = -1.75, 2.0   # le bassin


def y_eau(h):
    return Y0 + (Y1 - Y0) * h / 14


class StatsEtendueShort(ShortF):
    nom_voix = "4e-stats-etendue-short"
    fichier_marques = "stats_etendue_short_marques.json"

    def eau(self, h):
        r = Rectangle(width=X_D - X_G, height=max(0.01, y_eau(h) - Y0), fill_color=MER, fill_opacity=0.75,
                      stroke_width=0)
        return r.move_to(P((X_G + X_D) / 2, (y_eau(h) + Y0) / 2))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La mer qui monte", "blanche")
        self.add(badge)
        g = Courbe(HEURES, MALO, pas=2, sous_pas=1, maxi=14, couleur=MER, largeur=3.3, hauteur=1.9, fs=18,
                   nom_axe="m")
        g.ronds.set_z_index(2)
        g.scale_to_fit_width(4.1)
        if g.height > 2.8:
            g.scale_to_fit_height(2.8)
        g.move_to(P(0, -0.1), aligned_edge=UP)
        mur = Rectangle(width=0.3, height=Y1 - Y0 + 0.15, fill_color="#57534e", fill_opacity=1, stroke_width=0)
        mur.move_to(P(X_G - 0.15, (Y0 + Y1 + 0.15) / 2))
        regle = VGroup(*[Line(P(X_G - 0.05, y_eau(h)), P(X_G - 0.2, y_eau(h)), color=WHITE, stroke_width=2)
                         for h in range(0, 15, 2)])
        eau = self.eau(1.5)
        bat = bateau(0.38).move_to(P(0.3, y_eau(1.5) + 0.1))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(mur), FadeIn(regle), FadeIn(eau), FadeIn(bat), run_time=0.6)
        self.au_mot("plus de 10 mètres")
        dix = self.ligne([("+ de", WHITE), ("10 m", AMBRE)], 30).move_to(P(-0.5, Y_TXT))
        self.play(Transform(eau, self.eau(12.5)), bat.animate.move_to(P(0.3, y_eau(12.5) + 0.1)), FadeIn(dix),
                  run_time=0.9)
        self.au_mot("en 6 heures")
        six = self.ligne([("en", WHITE), ("6 h", AMBRE), ("!", WHITE)], 30).next_to(dix, RIGHT, buff=0.15)
        self.play(FadeIn(six, scale=1.3), run_time=0.3)
        self.au_mot("Regarde")
        self.play(FadeIn(g.fond), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'eau et la courbe ensemble ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(dix, six)), run_time=0.2)
        for i, p in enumerate(self.nombres_apres("on mesure l'eau", 7)):
            self.au_i(p)
            lab = texte(fr(MALO[i]), 20, NUIT).set_stroke(WHITE, 5, background=True)
            lab.next_to(g.ronds[i], RIGHT if i in (0, 3) else UP, buff=0.08)
            an = [Transform(eau, self.eau(MALO[i])), bat.animate.move_to(P(0.3, y_eau(MALO[i]) + 0.1)),
                  FadeIn(g.ronds[i], scale=0.3), FadeIn(lab, scale=1.5)]
            if i:
                an.append(Create(Line(g.point(i - 1), g.point(i), color=MER, stroke_width=5)))
            self.play(*an, run_time=0.4)
        self.au_mot("Le plus haut")
        lh = DashedLine(P(X_G, y_eau(12.5)), P(X_D, y_eau(12.5)), color=VERT_OK, stroke_width=4)
        t1 = self.ligne([("Le plus haut :", WHITE), ("12,5", VERT_OK)], 30).move_to(P(0, Y_TXT))
        self.play(Transform(eau, self.eau(12.5)), bat.animate.move_to(P(0.3, y_eau(12.5) + 0.1)), Create(lh),
                  FadeIn(t1), Indicate(g.ronds[6], color=VERT_OK, scale_factor=2), run_time=0.5)
        self.au_mot("Le plus bas")
        lb = DashedLine(P(X_G, y_eau(1.5)), P(X_D, y_eau(1.5)), color=ORANGE_RETENUE, stroke_width=4)
        t2 = self.ligne([("Le plus bas :", WHITE), ("1,5", ORANGE_RETENUE)], 30).move_to(P(0, Y_TXT))
        self.play(Transform(eau, self.eau(1.5)), bat.animate.move_to(P(0.3, y_eau(1.5) + 0.1)), Create(lb),
                  FadeOut(t1), FadeIn(t2), Indicate(g.ronds[3], color=ORANGE_RETENUE, scale_factor=2), run_time=0.5)
        self.au_mot("L'écart, 11 mètres")
        f1 = fleche_ecart(X_D - 0.3, y_eau(1.5), y_eau(12.5), AMBRE)
        f2 = fleche_ecart(g.point(6)[0] + 0.2, g.point(3)[1], g.point(6)[1], AMBRE)
        t3 = self.ligne([("Écart :", WHITE), ("11 m", AMBRE)], 32).move_to(P(0, Y_TXT))
        self.play(GrowFromCenter(f1), GrowFromCenter(f2), FadeOut(t2), FadeIn(t3), run_time=0.5)
        self.au_mot("c'est l'étendue")
        t4 = self.borne(self.ligne([("11 m", AMBRE), ("= l'étendue !", VERT_OK)], 30)).move_to(P(0, Y_TXT))
        self.play(FadeOut(t3), FadeIn(t4, scale=0.7), run_time=0.35)
        self.insister(t4, 1.15)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("À La Réunion")
        self.play(FadeOut(VGroup(mur, regle, eau, bat, lh, lb, f1, t4)), run_time=0.3)
        r1 = self.t("À La Réunion :", 34, "#f97316").move_to(P(0, 2.0))
        self.play(FadeIn(r1, shift=DOWN * 0.2), run_time=0.3)
        self.au_mot("de 0,2")
        r2 = self.ligne([("de", WHITE), ("0,2", "#f97316")], 34).move_to(P(-0.8, 1.48))
        self.play(FadeIn(r2), run_time=0.3)
        self.au_mot("à 0,7")
        r3 = self.ligne([("à", WHITE), ("0,7 m", "#f97316")], 34).next_to(r2, RIGHT, buff=0.25)
        self.play(FadeIn(r3), run_time=0.3)
        self.au_mot("Quelle est l'étendue")
        q = self.ligne([("Étendue :", WHITE), ("?", ORANGE_RETENUE)], 40).move_to(P(0, 0.92))
        self.play(FadeIn(q, scale=0.7), run_time=0.35)
        self.insister(q[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 0.32))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
