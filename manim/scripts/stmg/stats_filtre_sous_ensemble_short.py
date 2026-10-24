# stats_filtre_sous_ensemble_short.py
# EleveAI — Maths 1re (tronc commun) / STMG — short jumeau de l'épisode
# « Filtrer des données avec un critère ». CEINTURE JAUNE (un cran sous la
# paysage orange). Il AMUSE : « soirée cinéma, que des films de 140 minutes ou plus ! »
#   · en HAUT, la barre de filtre du tableur (« Durée (min) ≥ 140 ») ;
#   · en BAS, EN MÊME TEMPS, le fichier du coach : les films trop courts se
#     masquent, les 5 films longs s'allument ; Monte-Cristo, 178 min, le plus long ;
#   · 1 question-pause (3 s) : Animation = Oui, combien de films ? (3) ;
#   · fin : filtre Durée (min) ≥ 120 : combien de films ? (6), en commentaire.
# ⭐ Données RÉELLES : voir l'en-tête de stats_filtre_sous_ensemble.py.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit (les durées
# du fichier sont les données de la figure, comme les nombres d'un axe).
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
#
# Voix : manim/voix/lycee-stats-filtre-sous-ensemble-short.json (débit −7) ;
# marques : manim/scripts/stmg/stats_filtre_sous_ensemble_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_filtre_sous_ensemble_short.py StatsFiltreSousEnsembleShort -o eleveai-maths-stmg-stats-filtre-sous-ensemble-short --media_dir manim/scripts/stmg/media-stats-filtre-sous-ensemble-short
# Sorties : manim/sorties/stmg/maths/statistiques/13-filtre-sous-ensemble/eleveai-maths-stmg-stats-filtre-sous-ensemble-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/14-filtre-sous-ensemble/eleveai-maths-premiere-commun-stats-filtre-sous-ensemble-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403
from stats_filtre_sous_ensemble import ANIMES, DUREE, FILMS, LONGS, N  # noqa: E402

Y1, Y2 = 2.0, 1.42   # les deux lignes de la bande du haut
HAUT_CARTE = 1.08


class StatsFiltreSousEnsembleShort(ShortH2):
    nom_voix = "lycee-stats-filtre-sous-ensemble-short"
    fichier_marques = "stats_filtre_sous_ensemble_short_marques.json"

    def tableur(self):
        tb = fichier("Film", FILMS, ["Durée (min)"], [[d] for d in DUREE], fs=22, largeur_id=2.7,
                     largeurs=[1.6], hauteur=0.42)
        k = min(1.0, (config.frame_width - 0.35) / tb.width, (HAUT_CARTE + 3.72) / tb.height)
        tb.scale(k)
        return tb.move_to(P(0, HAUT_CARTE - tb.height / 2))

    def barre(self, txt, y=Y1):
        b = barre_filtre(txt, 21)
        return self.borne(b).move_to(P(0, y))

    def ligne_haut(self, morceaux, y=Y2, fs=30):
        return self.ligne(morceaux, fs).move_to(P(0, y))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Soirée cinéma", "jaune")
        self.add(badge)
        tb = self.tableur()
        autres = [i for i in range(N) if i not in LONGS]

        # ── 00 : que des films longs ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(tb, shift=UP * 0.2), run_time=0.6)
        self.au_mot("140 minutes")
        b = self.barre("Durée (min) ≥ 140")
        self.play(FadeIn(b, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("et hop")
        self.play(*masquer(tb, autres), *[a for r in LONGS for a in tb.allumer_case(r, 0)], run_time=0.6)
        self.au_mot("5 films sur 10")
        t0 = self.ligne_haut([("5", VERT_OK), ("films sur", WHITE), ("10", WHITE), ("!", WHITE)], fs=34)
        self.play(FadeIn(t0, scale=0.7), run_time=0.35)
        self.insister(t0[0], 1.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : le plus long ; masqués, pas effacés ──
        self.dire("01-image")
        self.au_mot("Le Comte de Monte-Cristo")
        t1 = self.ligne_haut([("Monte-Cristo :", JAUNE_TITRE)], fs=32)
        self.play(FadeOut(t0), FadeIn(t1), run_time=0.3)
        self.au_mot("178 minutes")
        t2 = self.ligne_haut([("Monte-Cristo :", JAUNE_TITRE), ("178 min", AMBRE)], fs=32)
        self.play(FadeOut(t1), FadeIn(t2), Indicate(rang(tb, 1), color=AMBRE, scale_factor=1.08), run_time=0.5)
        self.au_mot("Masqués")
        t3 = self.ligne_haut([("Masqués,", ORANGE_RETENUE), ("pas effacés !", ORANGE_RETENUE)], fs=32)
        self.play(FadeOut(t2), FadeIn(t3), *[rang(tb, r).animate.set_opacity(0.55) for r in autres], run_time=0.4)
        self.play(*[rang(tb, r).animate.set_opacity(0.16) for r in autres], run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, titre, self.mobjects[0])])),
                  run_time=0.4)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Filtre « Animation = Oui » :", "combien de films ?"],
                            ["3", "7", "10"], 0, ["7, ce sont les autres !"], mot_q="Filtre Animation")
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, titre, self.mobjects[0])])),
                  run_time=0.4)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        tb2 = self.tableur()
        self.play(FadeIn(tb2, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Durée supérieure ou égale à 120")
        b2 = self.barre("Durée (min) ≥ 120")
        self.play(FadeIn(b2, shift=DOWN * 0.2), Indicate(tb2.tetes[0], color=AMBRE), run_time=0.5)
        self.au_mot("combien de films")
        q = self.ligne_haut([("Combien de films ?", ORANGE_RETENUE)], fs=32)
        self.play(FadeIn(q, scale=0.7), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = self.ligne_haut([("Réponds en commentaire !", VERT_OK)], fs=30)
        self.play(FadeOut(q), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
