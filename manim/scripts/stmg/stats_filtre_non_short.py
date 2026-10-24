# stats_filtre_non_short.py
# EleveAI — Maths 1re (tronc commun) / STMG — short jumeau de l'épisode
# « Filtrer avec NON ». CEINTURE ORANGE (un cran sous la paysage verte).
# Il AMUSE : « quelles planètes n'ont aucune lune ? »
#   · en HAUT, la barre de filtre « NON Lune = Oui » puis le calcul 8 − 6 = 2 ;
#   · en BAS, EN MÊME TEMPS, le fichier du coach : 6 lignes se masquent,
#     Mercure et Vénus restent ;
#   · 1 question-pause (3 s) : NON Type = Gazeuse, combien ? (4) ;
#   · fin : NON Diamètre (km) ≥ 10 000 : combien ? (2), en commentaire.
# ⭐ Données RÉELLES : voir l'en-tête de stats_filtre_non.py (NASA).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
#
# Voix : manim/voix/lycee-stats-filtre-non-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_filtre_non_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_filtre_non_short.py StatsFiltreNonShort -o eleveai-maths-stmg-stats-filtre-non-short --media_dir manim/scripts/stmg/media-stats-filtre-non-short
# Sorties : manim/sorties/stmg/maths/statistiques/16-filtre-non/eleveai-maths-stmg-stats-filtre-non-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/17-filtre-non/eleveai-maths-premiere-commun-stats-filtre-non-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403
from stats_filtre_non import DIAM, LUNE, N, PLANETES, TYPE  # noqa: E402

Y1, Y2 = 2.0, 1.42   # les deux lignes de la bande du haut
HAUT_CARTE = 1.08
SANS_LUNE = [i for i in range(N) if LUNE[i] == "Non"]


class StatsFiltreNonShort(ShortH2):
    nom_voix = "lycee-stats-filtre-non-short"
    fichier_marques = "stats_filtre_non_short_marques.json"

    def tableur(self):
        tb = fichier("Planète", PLANETES, ["Diamètre (km)", "Type", "Lune"],
                     [[DIAM[i], TYPE[i], LUNE[i]] for i in range(N)], fs=30, largeur_id=1.9,
                     largeurs=[2.3, 1.85, 1.05], hauteur=0.62)
        k = min(1.0, (config.frame_width - 0.3) / tb.width, (HAUT_CARTE + 3.72) / tb.height)
        tb.scale(k)
        return tb.move_to(P(0, HAUT_CARTE - tb.height / 2))

    def barre(self, morceaux, y=Y1):
        return self.borne(barre_filtre(morceaux, 21)).move_to(P(0, y))

    def haut_txt(self, morceaux, fs=38):
        return self.borne(self.ligne(morceaux, fs), 0.5).move_to(P(0, 3.45))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Planètes sans lune ?", "orange")
        self.add(badge)
        tb = self.tableur()

        # ── 00 : qui n'a aucune lune ? ──
        self.dire("00-accroche")
        self.au_mot("Les 8 planètes")
        self.play(Write(titre), FadeIn(tb, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Filtre NON")
        b = self.barre([("NON", AMBRE), ("Lune = Oui", WHITE)])
        self.play(FadeIn(b, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("qui n'a aucune lune")
        self.play(*tb.allumer_colonne(2), run_time=0.4)
        self.play(*tb.eteindre(), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : Mercure et Vénus ──
        self.dire("01-image")
        self.au_mot("Mercure et Vénus")
        self.play(*masquer(tb, [i for i in range(N) if i not in SANS_LUNE]),
                  *[a for r in SANS_LUNE for a in tb.allumer_ligne(r)], run_time=0.6)
        self.au_mot("Seulement 2 planètes sur 8")
        t1 = self.ligne([("2", VERT_OK), ("planètes sur", WHITE), ("8", WHITE)], 32).move_to(P(0, Y2))
        self.play(FadeIn(t1, scale=0.7), run_time=0.35)
        self.au_mot("8 moins 6")
        c = self.haut_txt([("8", WHITE), ("−", WHITE), ("6", WHITE), ("=", WHITE), ("2", VERT_OK)], 44)
        self.play(FadeOut(titre), FadeIn(c, scale=0.7), run_time=0.35)
        self.insister(c[-1], 1.5)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, self.mobjects[0])])), run_time=0.4)
        self.play(FadeIn(titre), run_time=0.3)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["« NON Type = Gazeuse » :", "combien de planètes ?"],
                            ["4", "8", "0"], 0, ["les 4 rocheuses :", "8 − 4."], mot_q="NON, Type")
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, titre, self.mobjects[0])])),
                  run_time=0.4)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        tb2 = self.tableur()
        self.play(FadeIn(tb2, shift=UP * 0.2), run_time=0.4)
        self.au_mot("NON, Diamètre")
        b2 = self.barre([("NON", AMBRE), ("Diamètre (km) ≥ 10 000", WHITE)])
        self.play(FadeIn(b2, shift=DOWN * 0.2), Indicate(tb2.tetes[0], color=AMBRE), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        appel = self.haut_txt([("Réponds en commentaire !", VERT_OK)], 34)
        self.play(FadeOut(titre), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.08, 0.25)
        self.attendre_voix(marge=1.5)
