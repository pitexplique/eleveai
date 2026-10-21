# stats_lire_tableau_short.py
# EleveAI — Maths 6e — short jumeau de la série « Statistiques », épisode 01 :
# lire un tableau. CEINTURE BLANCHE. Il AMUSE : « À quel moment le bus est-il
# plein à craquer ? »
#   · en HAUT, un bus par moment (matin, midi, soir) se remplit de voyageurs
#     (le niveau monte, haut comme le nombre) ; le bus du soir déborde ;
#   · en BAS, EN MÊME TEMPS, la ligne 1 du tableau du coach se remplit sous son bus ;
#   · fin : une accolade sous les trois cases, « en tout ? »,
#     « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/6e-stats-lire-tableau-short.json (débit −10), WAV dans
# public/sons/6e-stats-lire-tableau-short/ ; calage mot à mot :
# manim/scripts/6e/stats6_lire_tableau_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/stats_lire_tableau_short.py StatsLireTableauShort6e -o eleveai-maths-6e-stats-lire-tableau-short --media_dir manim/scripts/6e/media-stats-lire-tableau-short
# Sortie : manim/sorties/6e/maths/statistiques/01-lire-tableau/eleveai-maths-6e-stats-lire-tableau-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_tableau_commun import P, BaseTableauShort, allumer, eteindre, remplir, textes_devant  # noqa: E402
from stats_lire_tableau import MOMENTS, lune, soleil  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import Tableau  # noqa: E402

Y_TXT = 1.98
LIGNE1 = [180, 60, 210]
PLACES = 200          # ce qu'un bus contient « plein » : au-delà, il déborde
FOND_BUS = 0.05       # le bas des bus


def bus_jauge(x):
    """Un bus vu de côté, vide : la caisse (contour), deux roues. Renvoie (bus, caisse)."""
    caisse = RoundedRectangle(width=0.86, height=0.95, corner_radius=0.12, fill_color="#1e293b", fill_opacity=1,
                              stroke_color="#facc15", stroke_width=4).move_to(P(x, FOND_BUS + 0.62))
    roues = VGroup(*[Circle(radius=0.12, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                            stroke_width=2).move_to(caisse.get_bottom() + P(dx, 0)) for dx in (-0.22, 0.22)])
    return VGroup(caisse, roues), caisse


def niveau(caisse, v, couleur=ORANGE_RETENUE):
    """Les voyageurs dans le bus : un niveau haut comme v (plafonné à la caisse)."""
    hmax = caisse.height - 0.1
    h = min(v / PLACES, 1.0) * hmax
    return Rectangle(width=caisse.width - 0.12, height=h, fill_color=couleur, fill_opacity=0.9,
                     stroke_width=0).move_to(caisse.get_bottom() + UP * (0.05 + h / 2))


class StatsLireTableauShort6e(BaseTableauShort):
    nom_voix = "6e-stats-lire-tableau-short"
    fichier_marques = "stats6_lire_tableau_short_marques.json"

    def legende(self, s, color=WHITE, fs=36):
        return self.borne(self.t(s, fs, color)).move_to(P(0, Y_TXT))

    def construct(self):
        self.margo_bas()
        titre = self.entete_short("Bus plein ?", "blanche")
        tab = Tableau(MOMENTS, [[None] * 3], libelles=["Ligne 1"], coin="", largeur_case=1.3, largeur_libelle=1.45,
                      hauteur=0.8, fs=30, centre=P(0, -1.5))
        tab.scale_to_fit_width(config.frame_width - 0.25)
        textes_devant(tab.move_to(P(0, -1.5)))
        xs = [tab.case(0, c).get_center()[0] for c in range(3)]
        bus_l, caisses = [], []
        for x in xs:
            b, c = bus_jauge(x)
            bus_l.append(b)
            caisses.append(c)
        icones = VGroup(soleil(0.14, "#fdba74"), soleil(0.18), lune(0.16))
        for ic, x in zip(icones, xs):
            ic.move_to(P(x, 1.4))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(tab, shift=UP * 0.2), run_time=0.5)
        self.au_mot("le bus")
        self.play(LaggedStart(*[FadeIn(b, shift=RIGHT * 0.6) for b in bus_l], lag_ratio=0.2), FadeIn(icones),
                  run_time=0.7)
        self.au_mot("plein à craquer")
        q = self.legende("À quel moment ?", ORANGE_RETENUE, 40)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.35)
        self.insister(q, 1.12)
        self.attendre_voix(marge=0.1)

        # ── 01 : 180, 60, 210 : le soir ! ──
        self.dire("01-image")
        self.au_mot("Ligne 1")
        l1 = self.legende("Ligne 1", "#ef4444", 44)
        self.play(FadeOut(q, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.2), Indicate(tab.libelles[0][1]),
                  run_time=0.35)
        niveaux = []
        for c, mot in enumerate(["180 voyageurs", "60 le", "210 le"]):
            self.au_mot(mot)
            n = niveau(caisses[c], LIGNE1[c])
            self.play(GrowFromEdge(n, DOWN), remplir(tab, 0, c, LIGNE1[c]), *allumer(tab, 0, c),
                      run_time=0.5)
            niveaux.append(n)
        self.au_mot("Le soir !")
        soir = self.legende("Le soir !", VERT_OK, 48)
        trop = VGroup(*[Circle(radius=0.07, fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0)
                        .move_to(caisses[2].get_top() + P(dx, 0.12)) for dx in (-0.24, -0.08, 0.08, 0.24)])
        self.play(FadeOut(l1, shift=UP * 0.2), FadeIn(soir, scale=0.7), FadeIn(trop, shift=UP * 0.2), run_time=0.4)
        self.play(Wiggle(VGroup(bus_l[2], niveaux[2], trop)), run_time=0.8)
        self.au_mot("Tout le monde rentre")
        rentre = self.legende("Tout le monde rentre !", WHITE, 34)
        self.play(FadeOut(soir, shift=UP * 0.2), FadeIn(rentre, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("combien de voyageurs en tout")
        acc = Brace(VGroup(*[tab.case(0, c) for c in range(3)]), DOWN, buff=0.08, color=ORANGE_RETENUE)
        pq = self.t("?", 48, ORANGE_RETENUE).next_to(acc, DOWN, buff=0.05)
        cb = self.legende("En tout dans la journée ?", ORANGE_RETENUE, 32)
        self.play(FadeOut(rentre, shift=UP * 0.2), FadeIn(cb, shift=UP * 0.2), GrowFromCenter(acc),
                  FadeIn(pq, scale=1.5), run_time=0.5)
        self.insister(pq, 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.legende("Réponds en commentaire !", VERT_OK, 32)
        self.play(FadeOut(cb, shift=UP * 0.2), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
