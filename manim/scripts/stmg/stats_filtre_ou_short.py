# stats_filtre_ou_short.py
# EleveAI — Maths 1re (tronc commun) / STMG — short jumeau de l'épisode
# « Filtrer avec OU ». CEINTURE VERTE (un cran sous la paysage bleue).
# Il AMUSE : « 6 tours + 4 tours, avec OU, ça fait 10 ? Perdu ! »
#   · en HAUT, les deux barres de filtre (≥ 500 m, Amérique) et le calcul ;
#   · en BAS, EN MÊME TEMPS, le fichier du coach : les cases s'allument, One
#     World Trade Center est dans les deux groupes : 6 + 4 − 1 = 9 ;
#   · 1 question-pause (3 s) : le OU des maths garde-t-il « les deux » ? (oui) ;
#   · fin : Hauteur (m) ≥ 600 OU Continent = Amérique : combien ? (3 + 4 = 7).
# ⭐ Données RÉELLES : voir l'en-tête de stats_filtre_ou.py.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
#
# Voix : manim/voix/lycee-stats-filtre-ou-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_filtre_ou_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_filtre_ou_short.py StatsFiltreOuShort -o eleveai-maths-stmg-stats-filtre-ou-short --media_dir manim/scripts/stmg/media-stats-filtre-ou-short
# Sorties : manim/sorties/stmg/maths/statistiques/15-filtre-ou/eleveai-maths-stmg-stats-filtre-ou-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/16-filtre-ou/eleveai-maths-premiere-commun-stats-filtre-ou-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403
from stats_filtre_ou import AMERIQUE, CONT, GRANDES, HAUT, N, OWTC  # noqa: E402

NOMS = ["Burj Khalifa", "Merdeka 118", "Shanghai Tower", "Lotte Tower", "One WTC", "Taipei 101", "Central Park T.",
        "Petronas", "Willis Tower", "Empire State"]
Y1, Y2 = 2.0, 1.42   # les deux lignes de la bande du haut
HAUT_CARTE = 1.08


class StatsFiltreOuShort(ShortH2):
    nom_voix = "lycee-stats-filtre-ou-short"
    fichier_marques = "stats_filtre_ou_short_marques.json"

    def tableur(self):
        tb = fichier("Tour", NOMS, ["Hauteur (m)", "Continent"], [[HAUT[i], CONT[i]] for i in range(N)], fs=24,
                     largeur_id=2.6, largeurs=[1.7, 1.6], hauteur=0.44)
        k = min(1.0, (config.frame_width - 0.35) / tb.width, (HAUT_CARTE + 3.72) / tb.height)
        tb.scale(k)
        return tb.move_to(P(0, HAUT_CARTE - tb.height / 2))

    def ligne_filtre(self, txt, y, compte=None, couleur=VERT_OK, mot=None):
        g = VGroup()
        if mot:
            g.add(self.t(mot, 26, AMBRE))
        g.add(barre_filtre(txt, 20))
        if compte is not None:
            g.add(self.t("→ " + str(compte), 30, couleur))
        g.arrange(RIGHT, buff=0.12)
        return self.borne(g).move_to(P(0, y))

    def haut_txt(self, morceaux, fs=40):
        return self.borne(self.ligne(morceaux, fs), 0.5).move_to(P(0, 3.45))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Gratte-ciel", "verte")
        self.add(badge)
        tb = self.tableur()

        # ── 00 : 6 + 4 = 10 ? ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(tb, shift=UP * 0.2), run_time=0.6)
        self.au_mot("500 mètres")
        b1 = self.ligne_filtre("Hauteur (m) ≥ 500", Y1)
        self.play(FadeIn(b1, shift=DOWN * 0.2),
                  *[a for r in GRANDES for a in tb.allumer_case(r, 0, couleur="#fed7aa", anneau=ORANGE_V)],
                  run_time=0.5)
        self.au_mot(": 6.")
        b1c = self.ligne_filtre("Hauteur (m) ≥ 500", Y1, 6, ORANGE_V)
        self.play(ReplacementTransform(b1, b1c), run_time=0.3)
        self.au_mot("Ceux d'Amérique")
        b2 = self.ligne_filtre("Continent = Amérique", Y2, mot="OU")
        self.play(FadeIn(b2, shift=DOWN * 0.2),
                  *[a for r in AMERIQUE for a in tb.allumer_case(r, 1, couleur="#ddd6fe", anneau=VIOLET_H)],
                  run_time=0.5)
        self.au_mot(": 4.")
        b2c = self.ligne_filtre("Continent = Amérique", Y2, 4, VIOLET_CLAIR, mot="OU")
        self.play(ReplacementTransform(b2, b2c), run_time=0.3)
        self.au_mot("ça fait 10")
        c10 = self.haut_txt([("6", ORANGE_V), ("+", WHITE), ("4", VIOLET_CLAIR), ("=", WHITE), ("10 ?", WHITE)])
        self.play(FadeOut(titre), FadeIn(c10, scale=0.7), run_time=0.35)
        self.au_mot("Perdu")
        x = croix(c10, sw=6)
        self.play(Create(x), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : la tour des deux groupes ──
        self.dire("01-image")
        self.au_mot("One World Trade Center")
        cadre = SurroundingRectangle(rang(tb, OWTC), color=AMBRE, buff=0.03, stroke_width=6)
        self.play(Create(cadre), run_time=0.4)
        self.au_mot("dans les deux groupes")
        self.play(Indicate(rang(tb, OWTC), color=AMBRE, scale_factor=1.06), run_time=0.5)
        self.au_mot("qu'une fois")
        c9 = self.haut_txt([("6", ORANGE_V), ("+", WHITE), ("4", VIOLET_CLAIR), ("−", WHITE), ("1", AMBRE)])
        self.play(FadeOut(VGroup(c10, x)), FadeIn(c9, scale=0.7), run_time=0.35)
        self.au_mot("9 tours")
        c9b = self.haut_txt([("6", ORANGE_V), ("+", WHITE), ("4", VIOLET_CLAIR), ("−", WHITE), ("1", AMBRE),
                             ("=", WHITE), ("9", VERT_OK)])
        self.play(ReplacementTransform(c9, c9b), run_time=0.35)
        self.insister(c9b[-1], 1.5)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, self.mobjects[0])])), run_time=0.4)
        self.play(FadeIn(titre), run_time=0.3)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Le OU des maths garde-t-il", "les tours qui vérifient",
                                                           "les deux critères ?"],
                            ["oui", "non", "une fois sur deux"], 0, ["Le OU mathématique", "n'est pas exclusif."],
                            mot_q="Le OU des maths")
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, titre, self.mobjects[0])])),
                  run_time=0.4)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        tb2 = self.tableur()
        self.play(FadeIn(tb2, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Hauteur supérieure ou égale à 600")
        d1 = self.ligne_filtre("Hauteur (m) ≥ 600", Y1)
        self.play(FadeIn(d1, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("OU Continent")
        d2 = self.ligne_filtre("Continent = Amérique", Y2, mot="OU")
        self.play(FadeIn(d2, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = self.haut_txt([("Réponds en commentaire !", VERT_OK)], 34)
        self.play(FadeOut(titre), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.08, 0.25)
        self.attendre_voix(marge=1.5)
