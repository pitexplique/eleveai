# stats_graphique_donnees_short.py
# EleveAI — Maths 1re / STMG — short jumeau de la série « Statistiques », lycée,
# épisode « du graphique aux données ». CEINTURE BLANCHE. Il AMUSE :
# « Mbappé a-t-il marqué la moitié des buts de la France en 2022 ? »
#   · en HAUT le ballon et la phrase ; en BAS les bâtons du coach (8, 4, 4) dont
#     les valeurs s'écrivent au mot ; « 8 sur 16 : pile la moitié ! » ;
#   · question-pause : l'angle de la moitié (50°, 180°, 360°) ;
#   · puis le camembert : le secteur de Mbappé fait la moitié du disque ;
#   · fin : 2018, 4 buts sur 14, « quelle part ? Réponds en commentaire ! ».
# Données : résultats officiels FIFA 2022 et 2018 (voir stats_graphique_donnees.py).
# Centres d'intérêt : sport.
#
# Voix : manim/voix/lycee-stats-graphique-donnees-short.json (débit −7) ; calage :
# manim/scripts/stmg/stats_graphique_donnees_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/stats_graphique_donnees_short.py StatsGraphiqueDonneesShort -o eleveai-maths-stmg-stats-graphique-donnees-short --media_dir manim/scripts/stmg/media-stats-graphique-donnees-short
# Sorties : manim/sorties/stmg/maths/statistiques/04-graphique-donnees/eleveai-maths-stmg-stats-graphique-donnees-short.mp4
#           manim/sorties/premiere-commun/maths/statistiques/03-graphique-donnees/eleveai-maths-premiere-commun-stats-graphique-donnees-short.mp4 (copie)

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("stmg_stats_graphique_donnees",
                                               Path(__file__).resolve().parent / "stats_graphique_donnees.py")
_ep = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ep)
JOUEURS, BUTS, COUL, ballon = _ep.JOUEURS, _ep.BUTS, _ep.COUL, _ep.ballon

Y_TXT = 1.55
HAUT_CARTE = 1.0


class StatsGraphiqueDonneesShort(ShortLycee):
    nom_voix = "lycee-stats-graphique-donnees-short"
    fichier_marques = "stats_graphique_donnees_short_marques.json"

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La moitié des buts ?")
        self.add(badge)
        g = Barres(JOUEURS, BUTS, pas=2, maxi=10, batons=True, couleurs=COUL, nom_axe="Buts 2022", largeur=2.6,
                   hauteur=2.1, fs=22)
        caser(g, -2.0, 2.0, -2.8, HAUT_CARTE)
        b = ballon(0.25).move_to(P(-1.65, Y_TXT))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(b, scale=0.4), run_time=0.4)
        self.play(Rotate(b, -TAU / 2), run_time=0.4)
        self.au_mot("Mbappé")
        moit = self.t("Mbappé : la moitié ?", 34, ORANGE_RETENUE)
        moit.scale_to_fit_width(min(moit.width, 3.2)).move_to(P(0.35, Y_TXT))
        self.play(FadeIn(moit, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("des buts de la France")
        self.play(FadeIn(g.fond), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : les bâtons ──
        self.dire("01-image")
        self.au_mot("16 buts")
        seize = self.ligne([("16", JAUNE_TITRE), ("buts", WHITE)], 38).move_to(P(0.35, Y_TXT))
        self.play(FadeOut(moit), FadeIn(seize, scale=0.7), g.pousser(run_time=0.8))
        self.add(g)
        vals = []
        for i, mot in enumerate(["Mbappé : 8", "Giroud : 4", "Les autres joueurs : 4"]):
            self.au_mot(mot)
            v = g.valeur(i, fs=28)
            self.play(g.focus(i, 0.4), FadeIn(v, scale=1.8), run_time=0.35)
            vals.append(v)
        self.au_mot("8 sur 16")
        sur = self.ligne([("8", COUL[0]), ("sur", WHITE), ("16", JAUNE_TITRE)], 40).move_to(P(0.35, Y_TXT + 0.25))
        self.play(FadeOut(seize), FadeIn(sur, scale=0.7), g.focus(0, 0.4), run_time=0.4)
        self.au_mot("pile la moitié")
        pile = self.t("= la moitié !", 36, VERT_OK).move_to(P(0, Y_TXT - 0.3))
        self.play(FadeIn(pile, scale=0.7), run_time=0.35)
        self.insister(pile, 1.15)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question-pause ──
        tout = Group(*[m for m in self.mobjects if m is not badge and m is not margo])
        self.play(FadeOut(tout), run_time=0.3)
        ecran = self.question_short("02-question", "02b-reponse", ["L'angle de la moitié ?"],
                                    ["50°", "180°", "360°"], 1, ["360 ÷ 2 = 180°", "50 : le % ; 360 : le disque"])
        self.play(FadeOut(ecran), run_time=0.3)

        # ── 03 : le camembert, puis la question en commentaire ──
        self.dire("03-question")
        cam = Camembert(["Mbappé", "Autres"], [4, 10], rayon=1.15, couleurs=[COUL[0], "#e2e8f0"], titre="Buts 2018",
                        fs=22)
        for t in cam.textes:
            t.set_z_index(5)
        caser(cam, -2.0, 2.0, -2.8, HAUT_CARTE)
        self.add(titre)
        l1 = self.ligne([("2018 :", WHITE), ("4", COUL[0]), ("buts sur", WHITE), ("14", JAUNE_TITRE)], 34)
        l1.move_to(P(0, Y_TXT + 0.3))
        self.au_mot("En 2018")
        self.play(FadeIn(cam.fond), cam.apparaitre(run_time=0.8), FadeIn(l1, shift=DOWN * 0.2))
        self.play(cam.focus(0, 0.4), run_time=0.4)
        self.au_mot("Quelle part")
        l2 = self.t("? %", 40, ORANGE_RETENUE).next_to(l1, RIGHT, buff=0.2)
        VGroup(l1, l2).move_to(P(0, Y_TXT + 0.3))
        self.borne(VGroup(l1, l2))
        self.play(FadeIn(l2, scale=1.5), run_time=0.4)
        self.insister(l2, 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK)).move_to(P(0, Y_TXT - 0.35))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
