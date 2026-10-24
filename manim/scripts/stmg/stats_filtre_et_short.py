# stats_filtre_et_short.py
# EleveAI — Maths 1re (tronc commun) / STMG — short jumeau de l'épisode
# « Filtrer avec ET ». CEINTURE ORANGE (un cran sous la paysage verte).
# Il AMUSE : « mission volcans : combien passent le double filtre ? »
#   · en HAUT, les deux barres de filtre du tableur, l'une après l'autre, et le
#     nombre de volcans qui restent (10 → 6 → 3) ;
#   · en BAS, EN MÊME TEMPS, le fichier du coach : les lignes se masquent ;
#   · 1 question-pause (3 s) : avec ET, le nombre de lignes peut-il augmenter ? ;
#   · fin : Altitude (m) < 3 000 ET Éruption = Oui : combien ? (3), en commentaire.
# ⭐ Données RÉELLES : voir l'en-tête de stats_filtre_et.py.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit (les
# altitudes du fichier sont les données de la figure).
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
#
# Voix : manim/voix/lycee-stats-filtre-et-short.json (débit −7) ; marques :
# manim/scripts/stmg/stats_filtre_et_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_filtre_et_short.py StatsFiltreEtShort -o eleveai-maths-stmg-stats-filtre-et-short --media_dir manim/scripts/stmg/media-stats-filtre-et-short
# Sorties : manim/sorties/stmg/maths/statistiques/14-filtre-et/eleveai-maths-stmg-stats-filtre-et-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/15-filtre-et/eleveai-maths-premiere-commun-stats-filtre-et-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403
from stats_filtre_et import ALT, ERUP, HAUTS, HAUTS_ACTIFS, N, VOLCANS  # noqa: E402

Y1, Y2 = 2.0, 1.42   # les deux lignes de la bande du haut
HAUT_CARTE = 1.08


class StatsFiltreEtShort(ShortH2):
    nom_voix = "lycee-stats-filtre-et-short"
    fichier_marques = "stats_filtre_et_short_marques.json"

    def tableur(self):
        tb = fichier("Volcan", VOLCANS, ["Altitude (m)", "Éruption"], [[ALT[i], ERUP[i]] for i in range(N)], fs=24,
                     largeur_id=2.9, largeurs=[1.7, 1.35], hauteur=0.44)
        k = min(1.0, (config.frame_width - 0.35) / tb.width, (HAUT_CARTE + 3.72) / tb.height)
        tb.scale(k)
        return tb.move_to(P(0, HAUT_CARTE - tb.height / 2))

    def ligne_filtre(self, txt, y, compte=None, mot=None):
        g = VGroup()
        if mot:
            g.add(self.t(mot, 26, AMBRE))
        g.add(barre_filtre(txt, 20))
        if compte is not None:
            g.add(self.t("→ " + str(compte), 32, VERT_OK))
        g.arrange(RIGHT, buff=0.12)
        return self.borne(g).move_to(P(0, y))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Mission volcans", "orange")
        self.add(badge)
        tb = self.tableur()

        # ── 00 : le double filtre ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(tb, shift=UP * 0.2), run_time=0.6)
        self.au_mot("3 000 mètres")
        b1 = self.ligne_filtre("Altitude (m) ≥ 3 000", Y1)
        self.play(FadeIn(b1, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("ET une éruption")
        b2 = self.ligne_filtre("Éruption = Oui", Y2, mot="ET")
        self.play(FadeIn(b2, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("Sur 10 volcans")
        self.play(Indicate(tb.libelles, color=AMBRE, scale_factor=1.05), run_time=0.6)
        self.au_mot("combien passent")
        self.attendre_voix(marge=0.1)

        # ── 01 : 6, puis 3 ──
        self.dire("01-image")
        self.au_mot("Premier filtre")
        self.play(*masquer(tb, [i for i in range(N) if i not in HAUTS]),
                  *[a for r in HAUTS for a in tb.allumer_case(r, 0)], run_time=0.6)
        self.au_mot("6 volcans")
        b1c = self.ligne_filtre("Altitude (m) ≥ 3 000", Y1, 6)
        self.play(ReplacementTransform(b1, b1c), run_time=0.35)
        self.au_mot("Deuxième filtre")
        self.play(*[a for r in HAUTS for a in tb.allumer_case(r, 1)], run_time=0.4)
        self.au_mot("il en reste 3")
        self.play(*masquer(tb, [r for r in HAUTS if r not in HAUTS_ACTIFS]), run_time=0.5)
        b2c = self.ligne_filtre("Éruption = Oui", Y2, 3, mot="ET")
        self.play(ReplacementTransform(b2, b2c), run_time=0.35)
        self.insister(b2c[-1], 1.15)
        for r, mot in zip(HAUTS_ACTIFS, ["Le Mauna Loa", "l'Erebus", "le Nyiragongo"]):
            self.au_mot(mot)
            self.play(Indicate(rang(tb, r), color=AMBRE, scale_factor=1.06), run_time=0.3)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, titre, self.mobjects[0])])),
                  run_time=0.4)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Avec ET, le nombre de lignes", "peut-il augmenter ?"],
                            ["oui", "non, jamais", "ça dépend du tableur"], 1,
                            ["ET ajoute une condition :", "on ne fait que retirer."], mot_q="Avec ET")
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (badge, titre, self.mobjects[0])])),
                  run_time=0.4)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        tb2 = self.tableur()
        self.play(FadeIn(tb2, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Altitude inférieure à 3 000")
        c1 = self.ligne_filtre("Altitude (m) < 3 000", Y1)
        self.play(FadeIn(c1, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("ET Éruption égale Oui")
        c2 = self.ligne_filtre("Éruption = Oui", Y2, mot="ET")
        self.play(FadeIn(c2, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK), 0.5).move_to(P(0, 3.45))
        self.play(FadeOut(titre), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.08, 0.25)
        self.attendre_voix(marge=1.5)
