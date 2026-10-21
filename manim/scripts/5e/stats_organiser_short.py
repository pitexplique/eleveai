# stats_organiser_short.py
# EleveAI — Maths 5e — short jumeau de la série « Statistiques » (cycle 4),
# épisode 01 : organiser des données. CEINTURE BLANCHE (un cran sous la
# paysage jaune : on VOIT les données se ranger, sans rien calculer).
# Il AMUSE : sous le volcan, le sol tremble chaque jour… quel nombre de séismes
# revient le plus souvent ?
#   · en HAUT le Piton de la Fournaise et 14 fiches-jours ; chaque fiche porte
#     autant de points rouges que de séismes (aucun chiffre avant la voix) ;
#   · en BAS, EN MÊME TEMPS, le tableau du coach (`tableau_donnees`) : au mot
#     « 0 séisme », la valeur 0 s'écrit et les fiches à 0 point descendent dans
#     sa colonne, puis leur effectif s'écrit au mot « 2 jours »… ;
#   · fin : « au moins 2 séismes » → colonnes 2, 3, 4 teintées, « ? ».
# Réponse attendue en commentaire : 6 + 2 + 1 = 9 jours.
# Voix : manim/voix/5e-stats-organiser-short.json (débit −10) ; calage :
# manim/scripts/5e/stats5_organiser_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/stats_organiser_short.py StatsOrganiserShort5e -o eleveai-maths-5e-stats-organiser-short --media_dir manim/scripts/5e/media-organiser-short
# Sortie : manim/sorties/5e/maths/statistiques/01-organiser/eleveai-maths-5e-stats-organiser-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_organiser import EFFECTIFS, RELEVES, VALEURS, volcan  # noqa: E402

Y_TXT = -0.2


def fiche(k, w=0.5, h=0.42):
    """Une fiche-jour : k points rouges (les séismes du jour)."""
    f = RoundedRectangle(width=w, height=h, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                         stroke_color="#cbd5e1", stroke_width=2)
    pts = VGroup(*[Dot(radius=0.045, color="#dc2626") for _ in range(k)])
    if k:
        pts.arrange_in_grid(rows=1 if k <= 2 else 2, buff=0.05).move_to(f)
    return VGroup(f, pts)


class StatsOrganiserShort5e(Short5):
    nom_voix = "5e-stats-organiser-short"
    fichier_marques = "stats5_organiser_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Sous le volcan", "blanche")
        self.add(badge)
        v = volcan(0.55).move_to(P(0, 1.75))
        fiches = VGroup(*[fiche(k) for k in RELEVES]).arrange_in_grid(2, 7, buff=0.08).move_to(P(0, 0.62))
        tab = Tableau([str(x) for x in VALEURS], [[None] * 5], libelles=["Jours"], coin="Séismes",
                      largeur_case=0.62, largeur_libelle=1.25, hauteur=0.62, fs=26)
        tab.scale_to_fit_width(4.15).move_to(P(0, -1.65))
        textes_devant(tab)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(titre), FadeIn(v, shift=UP * 0.2), run_time=0.5)
        self.au_mot("le sol tremble")
        self.play(Wiggle(v, scale_value=1.08, rotation_angle=0.03 * TAU), run_time=0.8)
        self.au_mot("chaque jour")
        self.play(LaggedStart(*[FadeIn(f, scale=0.4) for f in fiches], lag_ratio=0.06), run_time=1.0)
        self.au_mot("le plus souvent")
        q = self.t("Le plus souvent ?", 38, ORANGE_RETENUE).move_to(P(0, Y_TXT))
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : je les range ──
        self.dire("01-image")
        self.au_mot("14 jours")
        n14 = self.ligne([("14", JAUNE_TITRE), ("jours", WHITE)], 38).move_to(P(0, Y_TXT))
        self.play(FadeOut(q), FadeIn(n14, scale=0.7), run_time=0.3)
        self.au_mot("Je les range")
        squelette = VGroup(tab.carte, tab.coin, *[c[0] for c in tab.tetes], tab.libelles, *tab.cases[0])
        self.play(FadeIn(squelette, shift=UP * 0.2), FadeOut(n14), run_time=0.4)
        foc = ["0 séisme", "1 séisme", "2 séismes", "3 séismes", "4 séismes"]
        nbm = ["2 jours. 1", "3 jours. 2", "6 jours", "2 jours. 4", "1 jour."]
        for c in range(5):
            self.au_mot(foc[c])
            mes = [fiches[k] for k in range(14) if RELEVES[k] == c]
            cible = tab.case(0, c).get_center()
            self.play(FadeIn(tab.tetes[c][1], scale=1.8), *[f.animate.scale(1.15) for f in mes], run_time=0.3)
            self.play(LaggedStart(*[f.animate.move_to(cible).scale(0.35).set_opacity(0) for f in mes],
                                  lag_ratio=0.15), run_time=0.6)
            self.au_mot(nbm[c])
            self.play(remplir(tab, 0, c, EFFECTIFS[c]), run_time=0.3)
        self.au_mot("Le champion")
        champ = self.ligne([("Le champion :", WHITE), ("2", JAUNE_TITRE)], 40).move_to(P(0, Y_TXT))
        self.play(FadeIn(champ[0], shift=UP * 0.2), *allumer(tab, 0, 2), run_time=0.35)
        self.au_mot("c'est 2")
        self.play(FadeIn(champ[1], scale=1.8), Indicate(tab.tetes[2], color=AMBRE, scale_factor=1.4), run_time=0.4)
        self.insister(champ[1], 1.5)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("au moins 2")
        qq = self.ligne([("au moins", WHITE), ("2", JAUNE_TITRE), ("séismes :", WHITE)], 36).move_to(P(0, 0.7))
        self.play(FadeOut(champ), *eteindre(tab), FadeIn(qq, shift=UP * 0.2), run_time=0.35)
        self.play(*teinter(tab, [(0, 2), (0, 3), (0, 4)]), run_time=0.35)
        jours = self.ligne([("combien de jours", WHITE), ("?", ORANGE_RETENUE)], 38).move_to(P(0, 0.1))
        self.play(FadeIn(jours, scale=0.7), run_time=0.35)
        self.insister(jours[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT - 0.45))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
