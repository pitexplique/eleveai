# stats_donnee_defi_short.py
# EleveAI — Maths 4e — short jumeau de la série « Statistiques », épisode 05 :
# défis sur la lecture de données. CEINTURE ORANGE (un cran sous la paysage
# verte). Il AMUSE : « Une barre a disparu ! »
#   · en HAUT, la bulle de la langue (« Bonjou ! », « Bonjour ! »…) apparaît au
#     moment où
#   · en BAS, EN MÊME TEMPS, sa barre pousse dans le diagramme du coach
#     (`stat_graph` barres, manim/canvas_stats.py), sa valeur écrite au mot dit ;
#   · la barre du français est un cadre pointillé « ? » ; 200 − 160 = 40 la fait
#     pousser ; fin : « quel pourcentage parle français ? » (40 ÷ 200 = 20 %).
# Données vraisemblables (enquête imaginée, voir stats_donnee_defi.py).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/4e-stats-donnee-defi-short.json (débit −10) ; marques :
# manim/scripts/4e/stats_donnee_defi_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/stats_donnee_defi_short.py StatsDonneeDefiShort4e -o eleveai-maths-4e-stats-donnee-defi-short --media_dir manim/scripts/4e/media-donnee-defi-short
# Sortie : manim/sorties/4e/maths/statistiques/05-donnee-defi/eleveai-maths-4e-stats-donnee-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403
from stats_donnee_defi import COUL, LAB, VALS, bulle  # noqa: E402

Y_IMG, Y_TXT = 1.7, 0.95
HAUT_CARTE = 0.45
MOTS = {0: ["Bonjou !"], 1: ["Bonjou !", "Bonjour !"], 2: ["Bonjour !"], 3: ["Hello !"]}


class StatsDonneeDefiShort4e(Short4e):
    nom_voix = "4e-stats-donnee-defi-short"
    fichier_marques = "stats_donnee_defi_short_marques.json"

    def graphe(self):
        g = Barres(LAB, VALS, pas=20, sous_pas=10, couleurs=COUL, nom_axe="Élèves", largeur=3.75, hauteur=2.0,
                   fs=21)
        # « Français » : plus long que ses voisins courts, on lui laisse un peu de leur place
        e = g.etiquettes[2]
        neuf = texte("Français", 21)
        neuf.scale_to_fit_width(min(neuf.width, 3.75 / 4 * 0.97)).move_to(e).align_to(e, UP)
        e.become(neuf)
        if g.width > 4.35:
            g.scale_to_fit_width(4.35)
        if g.height > 3.3:
            g.scale_to_fit_height(3.3)
        return g.move_to(P(0, HAUT_CARTE - g.height / 2))

    def bulles(self, i):
        cols = [COUL[0], COUL[2]] if i == 1 else [COUL[i]]
        g = VGroup(*[bulle(m, c, 34) for m, c in zip(MOTS[i], cols)]).arrange(RIGHT, buff=0.25)
        return self.borne(g, 0.4).move_to(P(0, Y_IMG))

    def trou(self, g):
        b = g.barres[2]
        r = Rectangle(width=b.width, height=0.7).move_to(b.get_bottom(), aligned_edge=DOWN)
        return VGroup(DashedVMobject(r, num_dashes=20).set_stroke(ORANGE_Q, 4), texte("?", 34, ORANGE_Q).move_to(r))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La barre perdue", "orange")
        self.add(badge)
        g = self.graphe()
        trou = self.trou(g)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), FadeIn(g.fond), run_time=0.5)
        self.au_mot("200 élèves")
        e = self.ligne([("200", AMBRE), ("élèves", WHITE)], 38).move_to(P(0, Y_TXT))
        self.play(FadeIn(e, scale=0.8), run_time=0.35)
        img, vals = None, VGroup()
        for i, mot in [(0, "Créole : 70"), (1, "Les deux langues : 80"), (3, "Autre : 10")]:
            self.au_mot(mot)
            neuf = self.bulles(i)
            v = g.valeur(i, fs=26)
            vals.add(v)
            anims = [FadeIn(neuf, scale=0.6)] + ([FadeOut(img)] if img is not None else [])
            self.play(*anims, g.pousser(i, run_time=0.35), FadeIn(v, scale=1.6, run_time=0.35), run_time=0.35)
            img = neuf
        self.au_mot("Et le français")
        neuf = self.bulles(2)
        self.play(FadeOut(img), FadeIn(neuf, scale=0.6), Create(trou[0]), FadeIn(trou[1], scale=1.5), run_time=0.45)
        img = neuf
        self.insister(trou[1], 1.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : la barre retrouvée ──
        self.dire("01-image")
        self.au_mot("Le total, c'est 200")
        self.play(Indicate(e[0], color=AMBRE, scale_factor=1.4), run_time=0.5)
        som = self.ligne([("70", WHITE), ("+", WHITE), ("80", WHITE), ("+", WHITE), ("10", WHITE)], 40, 0.1)
        som.move_to(P(0, Y_IMG))
        for k, (mot, i) in enumerate([("70 plus", 0), ("80 plus", 1), ("10, égale", 2)]):
            self.au_mot(mot)
            morceaux = [som[2 * k]] + ([som[2 * k - 1]] if k else [])
            extra = [FadeOut(img)] if k == 0 else []
            self.play(*[FadeIn(m, scale=1.4) for m in morceaux], Indicate(vals[i], color=AMBRE), *extra,
                      run_time=0.25)
        self.au_mot("160")
        r = self.ligne([("=", WHITE), ("160", BLEU_CALCUL)], 40).next_to(som, RIGHT, buff=0.1)
        self.borne(VGroup(som, r), 0.3).move_to(P(0, Y_IMG))
        self.play(FadeIn(r, scale=1.3), run_time=0.3)
        self.au_mot("Il manque 40")
        m40 = self.ligne([("200", AMBRE), ("−", WHITE), ("160", BLEU_CALCUL), ("=", WHITE), ("40", VERT_OK)], 40)
        m40.move_to(P(0, Y_TXT))
        self.play(FadeOut(e), FadeIn(m40, shift=UP * 0.2), run_time=0.35)
        self.au_mot("la barre du français pousse")
        v2 = g.valeur(2, fs=26)
        self.play(FadeOut(trou), g.pousser(2, run_time=0.8), run_time=0.8)
        self.au_mot("jusqu'à 40")
        self.play(FadeIn(v2, scale=1.8), Flash(v2, color=VERT_OK), run_time=0.5)
        self.insister(m40[4], 1.4)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("quel pourcentage")
        q = self.ligne([("sur 200,", WHITE), ("français :", "#93c5fd"), ("?", ORANGE_RETENUE), ("%", WHITE)], 40).move_to(P(0, Y_IMG))
        self.play(FadeOut(VGroup(som, r), shift=UP * 0.2), FadeOut(m40), FadeIn(q, shift=DOWN * 0.2),
                  g.focus(2, 0.35), run_time=0.45)
        self.insister(q[2], 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
