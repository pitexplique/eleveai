# stats_lire_graphique_short.py
# EleveAI — Maths 1re / STMG — short jumeau de la série « Statistiques », lycée,
# épisode 01 : lire un graphique. CEINTURE BLANCHE. Il AMUSE :
# « Le CO₂ a triplé ? » Le diagramme du coach (axe qui part de 300) fait croire
# que la barre de 2023 vaut trois fois celle de 1980 ; on lit l'axe (340, 420),
# question-pause (×3, +80 ou +420 ?), puis le même diagramme redessiné depuis 0.
# Fin : « De combien entre 2010 et 2023 ? Réponds en commentaire ! »
# Données : NOAA GML, Mauna Loa, moyennes annuelles (1980 : 338,76 ; 2010 : 390,10 ;
# 2023 : 421,08 ppm, lu le 24/10/2026), arrondies à 10 près pour la lecture.
# Centres d'intérêt : meteo-climat, nature-ecologie.
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit (les
# nombres de l'axe sont des étiquettes).
#
# Voix : manim/voix/lycee-stats-lire-graphique-short.json (débit −7) ; calage :
# manim/scripts/stmg/stats_lire_graphique_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_lire_graphique_short.py StatsLireGraphiqueShort -o eleveai-maths-stmg-stats-lire-graphique-short --media_dir manim/scripts/stmg/media-stats-lire-graphique-short
# Sorties : manim/sorties/stmg/maths/statistiques/01-lire-graphique/eleveai-maths-stmg-stats-lire-graphique-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/01-lire-graphique/eleveai-maths-premiere-commun-stats-lire-graphique-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403
import importlib.util  # noqa: E402

# ⚠️ manim/scripts/6e/ a aussi un stats_lire_graphique.py : on charge LE NÔTRE par son chemin.
_spec = importlib.util.spec_from_file_location("stmg_stats_lire_graphique",
                                               Path(__file__).resolve().parent / "stats_lire_graphique.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
BLEU_BARRE, molecule = _ep.BLEU_BARRE, _ep.molecule

Y_TXT = 1.55
HAUT_CARTE = 1.0


class StatsLireGraphiqueShort(ShortLycee):
    nom_voix = "lycee-stats-lire-graphique-short"
    fichier_marques = "stats_lire_graphique_short_marques.json"

    def graphe(self, mini=300, pas=20, maxi=440):
        g = Barres(["1980", "2010", "2023"], [340, 390, 420], pas=pas, mini=mini, maxi=maxi,
                   couleurs=[BLEU_BARRE] * 3, nom_axe="CO2 (ppm)", largeur=2.3, hauteur=1.95, fs=22,
                   colonne_lue=True)
        return caser(g, -2.0, 2.0, -2.8, HAUT_CARTE)

    def hauteur(self, g, i, txt):
        x = g.barres[i].get_right()[0] + 0.12
        fl = DoubleArrow(P(x, g.base(i)[1]), P(x, g.point(i)[1]), buff=0, color=ORANGE_RETENUE, stroke_width=5,
                         tip_length=0.12, max_tip_length_to_length_ratio=0.25)
        lab = self.t(txt, 26, ORANGE_RETENUE)
        lab.next_to(fl, RIGHT, buff=0.05) if i == 0 else lab.next_to(fl, UP, buff=0.05)
        return VGroup(fl, lab)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le CO₂ a triplé ?")
        self.add(badge)
        g = self.graphe()
        mols = VGroup(*[molecule(0.1).rotate(a) for a in (0.4, -0.3)]).arrange(RIGHT, buff=3.0).move_to(P(0, 2.05))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(mols), FadeIn(g.fond), run_time=0.6)
        self.play(g.pousser(run_time=0.8))
        self.add(g)
        self.au_mot("la barre de 2023")
        self.play(g.estomper([0, 2], 0.3), run_time=0.4)
        self.au_mot("trois fois plus haute")
        h0, h2 = self.hauteur(g, 0, "1"), self.hauteur(g, 2, "3")
        fois = self.ligne([("2023 :", WHITE), ("× 3 ?", ORANGE_RETENUE)], 40).move_to(P(0, Y_TXT))
        self.play(GrowFromCenter(h0[0]), GrowFromCenter(h2[0]), FadeIn(h0[1]), FadeIn(h2[1]), run_time=0.5)
        self.play(FadeIn(fois, scale=0.7), run_time=0.3)
        self.insister(fois, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 01 : regarde l'axe ──
        self.dire("01-image")
        self.au_mot("il commence à 300")
        n300 = g.nombre(300)
        axe = self.ligne([("l'axe part de", WHITE), ("300", ROUGE_ERREUR)], 34).move_to(P(0, Y_TXT))
        self.play(FadeOut(fois), FadeIn(axe), n300.animate.scale(2).set_color(ROUGE_ERREUR), run_time=0.4)
        self.play(n300.animate.scale(0.5), run_time=0.3)
        self.au_mot("1980 : 340")
        lu0 = g.lu(340)
        self.play(FadeOut(h0), FadeIn(lu0, scale=1.6), Create(g.vers_axe(0, jusqu_au_lu=True)), run_time=0.4)
        self.au_mot("2023 : 420")
        lu2 = g.lu(420)
        self.play(FadeOut(h2), FadeIn(lu2, scale=1.6), Create(g.vers_axe(2, jusqu_au_lu=True)), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["Le CO₂ a…"],
                                    ["été multiplié par 3", "augmenté de 80", "augmenté de 420"], 1,
                                    ["420 − 340 = 80", "l'axe ne part pas de 0"], ys=(0.3, -0.5, -1.3))
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : redessiné depuis 0 ──
        self.dire("03-zero")
        self.add(titre)
        z = self.graphe(mini=0, pas=100, maxi=500)
        self.au_mot("Redessinée depuis 0")
        self.play(FadeIn(z.fond, scale=0.9), run_time=0.4)
        self.play(z.pousser(run_time=0.8))
        self.add(z)
        self.au_mot("n'est pas trois fois")
        pas3 = self.ligne([("× 3 ?", ORANGE_RETENUE), ("Non !", ROUGE_ERREUR)], 40).move_to(P(0, Y_TXT))
        self.play(FadeIn(pas3, scale=0.7), z.estomper([0, 2], 0.3), run_time=0.4)
        self.au_mot("lis-la sur l'axe")
        lis = self.t("Lis sur l'axe !", 40, VERT_OK).move_to(P(0, Y_TXT))
        self.play(FadeOut(pas3), FadeIn(lis, scale=0.7), Indicate(z.axe_y, color=AMBRE), run_time=0.5)
        self.insister(lis, 1.15)
        self.attendre_voix(marge=0.2)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        self.play(FadeOut(VGroup(z, lis)), FadeIn(g), run_time=0.4)
        self.play(g.rallumer(), run_time=0.2)
        self.au_mot("390")
        l1 = self.ligne([("2010 :", WHITE), ("390", BLEU_CALCUL)], 34)
        l2 = self.ligne([("2023 :", WHITE), ("+ ?", ORANGE_RETENUE)], 34)
        VGroup(l1, l2).arrange(RIGHT, buff=0.45).move_to(P(0, 2.0))
        self.borne(VGroup(l1, l2))
        self.play(FadeOut(mols), FadeIn(l1), FadeIn(g.lu(390), scale=1.6), g.focus(1, 0.35), run_time=0.4)
        self.au_mot("entre 2010 et 2023")
        self.play(FadeIn(l2), g.estomper([1, 2], 0.35), run_time=0.4)
        self.insister(l2[1], 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, 1.35))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
