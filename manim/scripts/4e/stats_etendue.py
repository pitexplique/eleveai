# stats_etendue.py
# EleveAI — Maths 4e ET 3e — série « Statistiques », cycle 4 : CALCULER
# L'ÉTENDUE D'UNE SÉRIE (micro du coach : stat_etendue, notion
# stat_statistique), AVEC VOIX. ÉPISODE COMMUN : 4e 08-etendue et 3e 06-etendue
# (une voix, un script, deux rendus ; la voix ne cite aucune classe).
# Paysage 16:9. CEINTURES : 4e ORANGE (un seul calcul, max − min, mais il faut
# le chercher dans TOUTE la série, lire une courbe, des décimaux, comparer deux
# dispersions, ne pas confondre valeurs et effectifs : deux crans au-dessus du
# « je vois », sous la verte de la moyenne et de la médiane) ; 3e JAUNE
# (révision, un cran plus bas). Short jumeau : stats_etendue_short.py (blanche).
#
# ⭐ Décor et métier : la MER et la navigation ; un HYDROGRAPHE mesure la
# hauteur de l'eau pour que les bateaux ne touchent pas le fond (problématique :
# prévoir, sécurité). Le mot des marins, le MARNAGE, est une étendue.
# Données : faits réels — à Saint-Malo, aux grandes marées, le marnage peut
# atteindre environ 13 m (Météo Consult / Figaro Nautisme, parmi les plus
# grandes marées d'Europe) ; à La Réunion, il est faible (Pointe des Galets,
# station SHOM : environ 0,5 m en vives-eaux, REFMAR 2013). La série de la
# journée est VRAISEMBLABLE (pas un relevé), calculée en Python :
#   Saint-Malo, toutes les 2 h : 11,5 ; 8 ; 4 ; 1,5 ; 4,5 ; 9 ; 12,5 →
#   12,5 − 1,5 = 11 m ; piège dernière − première : 12,5 − 11,5 = 1 ;
#   Pointe des Galets : 0,6 ; 0,5 ; 0,3 ; 0,2 ; 0,3 ; 0,5 ; 0,7 → 0,5 m ;
#   défi (tableau, `etendue_effectifs` de la 3e) : vagues 1 m : 4 j · 2 m : 9 j ·
#   3 m : 5 j · 6 m : 2 j → 6 − 1 = 5 m ; piège 9 − 2 = 7 (des jours).
# ⭐ Figures du coach (manim/canvas_stats.py) : `stat_graph` courbe (une
# évolution heure par heure, 3e `etendue_courbe`) et `tableau_donnees`.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Mapping micro → écrans : 4e genEtendue / 3e etendue_non_rangee → 02-03 ;
# 3e etendue_qcm (dernière − première) → 04 ; 4e fixed « deux séries de même
# moyenne… » / 3e etendue_comparer → 05 ; 3e etendue_courbe → 02-05 ;
# 3e etendue_effectifs → 06 défi / 06b ; etendue_decimales → 03, 05.
# Écrans : 00 garde · 01 Saint-Malo, l'hydrographe, le marnage · 02 la série
# (courbe) · 03 max − min · 04 le piège · 05 La Réunion, comparer · 06 défi
# (vagues) · 06b correction · 07 ce que tu as appris · 08 fin (règle du 19/10).
#
# Voix : manim/voix/4e-stats-etendue.json (débit −10), WAV dans
# public/sons/4e-stats-etendue/ ; calage mot à mot :
# manim/scripts/4e/stats_etendue_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_etendue.py StatsEtendue4e -o eleveai-maths-4e-stats-etendue --media_dir manim/scripts/4e/media-etendue
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_etendue.py StatsEtendue3e -o eleveai-maths-3e-stats-etendue --media_dir manim/scripts/4e/media-etendue-3e
# Sorties : manim/sorties/4e/maths/statistiques/08-etendue/eleveai-maths-4e-stats-etendue.mp4
#           manim/sorties/3e/maths/statistiques/06-etendue/eleveai-maths-3e-stats-etendue.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lotf_commun import *  # noqa: E402,F403

HEURES = ["0 h", "2 h", "4 h", "6 h", "8 h", "10 h", "12 h"]
MALO = [11.5, 8, 4, 1.5, 4.5, 9, 12.5]
GALETS = [0.6, 0.5, 0.3, 0.2, 0.3, 0.5, 0.7]
VAGUES, JOURS_V = [1, 2, 3, 6], [4, 9, 5, 2]
MER = "#0ea5e9"
C_REU = "#f97316"


def phare(s=1.0):
    """Un phare rouge et blanc, sa lanterne jaune."""
    tour = Polygon(P(-0.3 * s, 0), P(0.3 * s, 0), P(0.2 * s, 1.8 * s), P(-0.2 * s, 1.8 * s), fill_color=WHITE,
                   fill_opacity=1, stroke_width=0)
    bandes = VGroup(*[Polygon(P(-0.3 * s + 0.1 * s * y0 / 1.8, y0 * s), P(0.3 * s - 0.1 * s * y0 / 1.8, y0 * s),
                              P(0.3 * s - 0.1 * s * (y0 + 0.35) / 1.8, (y0 + 0.35) * s),
                              P(-0.3 * s + 0.1 * s * (y0 + 0.35) / 1.8, (y0 + 0.35) * s),
                              fill_color="#dc2626", fill_opacity=1, stroke_width=0) for y0 in (0.2, 0.9)])
    lanterne = Rectangle(width=0.36 * s, height=0.3 * s, fill_color="#fde047", fill_opacity=1, stroke_width=0)
    lanterne.move_to(P(0, 1.95 * s))
    toit = Triangle(fill_color="#1f2937", fill_opacity=1, stroke_width=0).scale(0.25 * s).move_to(P(0, 2.25 * s))
    return VGroup(tour, bandes, lanterne, toit)


def bateau(s=1.0, couleur="#f8fafc"):
    coque = Polygon(P(-0.6 * s, 0), P(0.6 * s, 0), P(0.42 * s, -0.25 * s), P(-0.42 * s, -0.25 * s),
                    fill_color="#7c2d12", fill_opacity=1, stroke_width=0)
    mat = Line(P(0, 0), P(0, 1.0 * s), color=WHITE, stroke_width=3)
    voile = Polygon(P(0.04 * s, 0.95 * s), P(0.04 * s, 0.1 * s), P(0.5 * s, 0.1 * s), fill_color=couleur,
                    fill_opacity=1, stroke_width=0)
    return VGroup(coque, mat, voile)


def fleche_ecart(x, y0, y1, couleur, txt=None, fs=30, droite=True):
    """Une double flèche verticale de y0 à y1 à l'abscisse x, et son texte."""
    fl = DoubleArrow(P(x, y0), P(x, y1), buff=0, color=couleur, stroke_width=6, tip_length=0.18,
                     max_tip_length_to_length_ratio=0.25)
    g = VGroup(fl)
    if txt:
        t = texte(txt, fs, couleur).set_stroke(BLACK if couleur != NUIT else WHITE, 0)
        t.next_to(fl, RIGHT if droite else LEFT, buff=0.1)
        g.add(t)
    return g


class StatsEtendueBase(PaysageF):
    nom_voix = "4e-stats-etendue"
    fichier_marques = "stats_etendue_marques.json"
    G = P(-3.3, -0.35)

    def courbe(self, valeurs=MALO, couleur=MER, titre="Saint-Malo : hauteur de l'eau", centre=None, **kw):
        opts = dict(pas=2, sous_pas=1, maxi=14, nom_axe="Hauteur (m)", titre=titre, largeur=5.6, hauteur=3.7,
                    fs=24, centre=self.G if centre is None else centre)
        opts.update(kw)
        g = Courbe(HEURES, valeurs, couleur=couleur, **opts)
        g.ronds.set_z_index(2)
        return g

    def courbe_prete(self, valeurs=True):
        g = self.courbe()
        self.add(g)
        vals = VGroup(*[self.etiquette(g, i) for i in range(7)]) if valeurs else VGroup()
        self.add(vals)
        return g, vals

    def etiquette(self, g, i, couleur=NUIT):
        """La hauteur écrite au-dessus de son point (au mot où la voix la dit)."""
        t = texte(fr(g.valeurs[i]), 24, couleur).set_stroke(WHITE, 6, background=True)
        if i in (0, 3):
            return t.next_to(g.ronds[i], RIGHT, buff=0.1)
        return t.next_to(g.ronds[i], UP, buff=0.12)

    def niveau(self, g, v, couleur=AMBRE):
        """Le pointillé horizontal du niveau v, de l'axe jusqu'au bout de la courbe."""
        y = g.y_axe(v)[1]
        return DashedLine(P(g.y_axe(v)[0], y), P(g.point(6)[0] + 0.35, y), color=couleur, stroke_width=4,
                          dash_length=0.1)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une étendue", self.identite, self.ceinture)
        g = self.courbe(titre=None, nom_axe=None, largeur=3.6, hauteur=2.0, fs=20, centre=P(-0.6, 0.1))
        self.au_mot("Calculer une étendue")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9),
                  run_time=0.7)
        self.play(g.tracer(run_time=1.2))
        self.au_mot("quel écart")
        x = g.point(6)[0] + 0.55
        fl = fleche_ecart(x, g.point(3)[1], g.point(6)[1], ORANGE_RETENUE)
        q = self.t("?", 80, ORANGE_RETENUE).next_to(fl, RIGHT, buff=0.2)
        self.play(GrowFromCenter(fl), FadeIn(q, scale=0.4), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Saint-Malo, l'hydrographe, le marnage ─────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        bas, haut = -2.5, 0.9
        mur = Rectangle(width=0.5, height=4.6, fill_color="#57534e", fill_opacity=1, stroke_width=0)
        mur.move_to(P(-6.0, -0.55))
        fond_eau = -2.95
        eau = Rectangle(width=4.6, height=haut - fond_eau, fill_color=MER, fill_opacity=0.75, stroke_width=0)
        eau.move_to(P(-3.45, (haut + fond_eau) / 2))
        bat = bateau(0.8).move_to(P(-3.3, haut + 0.25))
        ph = phare(1.0).move_to(P(-1.45, 1.75))
        self.au_mot("À Saint-Malo")
        tit = self.col(self.t("Saint-Malo, Bretagne", 44, JAUNE_TITRE), 2.75, xl=0.3)
        self.play(FadeIn(mur), FadeIn(eau), FadeIn(bat), FadeIn(ph, shift=UP * 0.3), Write(tit), run_time=0.8)
        self.au_mot("la mer monte et descend")
        eau_basse = eau.copy().stretch_to_fit_height(bas - fond_eau).move_to(P(-3.45, (bas + fond_eau) / 2))
        self.play(Transform(eau, eau_basse), bat.animate.move_to(P(-3.3, bas + 0.25)), run_time=1.4)
        eau_haute = eau.copy().stretch_to_fit_height(haut - fond_eau).move_to(P(-3.45, (haut + fond_eau) / 2))
        self.play(Transform(eau, eau_haute), bat.animate.move_to(P(-3.3, haut + 0.25)), run_time=1.4)
        self.au_mot("c'est la marée")
        mar = self.col(self.ligne([("la marée :", BLEU_CALCUL), ("deux fois par jour", WHITE)], 36), 2.0, xl=0.3)
        self.play(FadeIn(mar, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Un hydrographe")
        hyd = personne("#0f766e", "#e0ac69", 0.32, "#78350f").move_to(P(1.0, 0.75))
        met = self.metier("Hydrographe", fs=44).next_to(hyd, RIGHT, buff=0.35)
        self.play(FadeIn(hyd, shift=UP * 0.2), FadeIn(met, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("mesure la hauteur de l'eau")
        regle = VGroup(*[Line(P(-5.75, y), P(-5.55 if k % 2 else -5.45, y), color=WHITE, stroke_width=3)
                         for k, y in enumerate(np.arange(fond_eau + 0.2, 1.6, 0.34))])
        mh = self.bloc(["mesure la hauteur", "de l'eau"], 32).next_to(met, DOWN, buff=0.15).align_to(met, LEFT)
        self.play(Create(regle), FadeIn(mh), run_time=0.6)
        self.au_mot("à marée basse")
        self.play(Transform(eau, eau_basse.copy()), bat.animate.move_to(P(-3.3, bas + 0.25)), run_time=1.2)
        self.au_mot("Les marins ont un mot")
        lh = DashedLine(P(-5.7, haut), P(-1.2, haut), color=WHITE, stroke_width=3, dash_length=0.1)
        lb = DashedLine(P(-5.7, bas), P(-1.2, bas), color=WHITE, stroke_width=3, dash_length=0.1)
        self.play(Create(lh), Create(lb), run_time=0.5)
        self.au_mot("le marnage")
        fl = fleche_ecart(-1.0, bas, haut, AMBRE)
        marn = self.col(self.ligne([("Les marins :", WHITE), ("le marnage", AMBRE)], 40), -0.9, xl=0.3)
        self.play(GrowFromCenter(fl), FadeIn(marn, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("l'étendue")
        stat = self.col(self.ligne([("Les statisticiens :", WHITE), ("l'étendue", VERT_OK)], 40), -1.85, xl=0.3)
        self.play(FadeIn(stat, shift=RIGHT * 0.2), Indicate(fl, color=VERT_OK), run_time=0.5)
        self.insister(stat[1], 1.3, 0.3)
        self.attendre_voix()

    # ── 02 : la série, point par point ──────────────────────────────────────

    def ecran_serie(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-serie")
        g = self.courbe()
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.5)
        self.au_mot("toutes les 2 heures")
        t2 = self.col(self.ligne([("Toutes les", WHITE), ("2", BLEU_CALCUL), ("heures", WHITE)], 40), 2.5)
        self.play(FadeIn(t2, shift=RIGHT * 0.2), LaggedStart(*[Indicate(e, color=AMBRE) for e in g.etiquettes],
                                                             lag_ratio=0.08), run_time=0.8)
        self.au_mot("en mètres")
        unite = self.col(self.t("hauteur de l'eau, en m", 36, MER), 1.75)
        self.play(FadeIn(unite, shift=RIGHT * 0.2), run_time=0.35)
        liste = VGroup(*[self.t(fr(v), 44, BLEU_CALCUL) for v in MALO])
        l1 = VGroup(*liste[:4]).arrange(RIGHT, buff=0.45)
        l2 = VGroup(*liste[4:]).arrange(RIGHT, buff=0.45)
        self.col(l1, 0.85)
        self.col(l2, 0.0)
        for i, p in enumerate(self.nombres_apres("en mètres", 7)):
            self.au_i(p)
            anims = [FadeIn(g.ronds[i], scale=0.3), FadeIn(self.etiquette(g, i), scale=1.4), FadeIn(liste[i], scale=1.5)]
            if i:
                anims.append(Create(Line(g.point(i - 1), g.point(i), color=MER, stroke_width=6)))
            self.play(*anims, run_time=0.35)
        self.attendre_voix()

    # ── 03 : la plus grande moins la plus petite ────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        g, vals = self.courbe_prete()
        self.au_mot("L'étendue, c'est")
        regle = self.col(VGroup(self.t("Étendue =", 44, JAUNE_TITRE),
                                self.t("plus grande − plus petite", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.12),
                         2.35)
        self.play(FadeIn(regle, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Le point le plus haut")
        nh = self.niveau(g, 12.5, VERT_OK)
        self.play(g.focus(6, 0.5), Create(nh), run_time=0.5)
        self.au_mot("12,5 mètres")
        mx = self.col(self.ligne([("max :", WHITE), ("12,5 m", VERT_OK)], 42), 1.0)
        self.play(FadeIn(mx, shift=RIGHT * 0.2), Indicate(vals[6], color=VERT_OK, scale_factor=1.5), run_time=0.4)
        self.au_mot("Le point le plus bas")
        nb = self.niveau(g, 1.5, ORANGE_RETENUE)
        self.play(g.focus(3, 0.5), Create(nb), run_time=0.5)
        self.au_mot("1,5 mètre")
        mn = self.col(self.ligne([("min :", WHITE), ("1,5 m", ORANGE_RETENUE)], 42), 0.25)
        self.play(FadeIn(mn, shift=RIGHT * 0.2), Indicate(vals[3], color=ORANGE_RETENUE, scale_factor=1.5),
                  run_time=0.4)
        self.play(g.rallumer(), run_time=0.3)
        c = self.ligne([("12,5", VERT_OK), ("−", WHITE), ("1,5", ORANGE_RETENUE), ("=", WHITE), ("11", AMBRE)], 52)
        self.col(c, -0.75)
        self.au_mot("12,5 moins")
        self.play(FadeIn(c[:2], scale=1.3), run_time=0.3)
        self.au_mot("1,5, égale")
        self.play(FadeIn(c[2:4], scale=1.3), run_time=0.3)
        self.au_mot("égale 11")
        fl = fleche_ecart(g.point(6)[0] + 0.25, g.y_axe(1.5)[1], g.y_axe(12.5)[1], AMBRE)
        self.play(FadeIn(c[4], scale=1.6), GrowFromCenter(fl), run_time=0.5)
        self.au_mot("L'étendue est de 11")
        res = self.col(self.ligne([("Étendue :", WHITE), ("11 m", AMBRE)], 48), -1.85)
        cadre = self.encadrer(res, AMBRE)
        self.play(FadeIn(res, shift=UP * 0.2), Create(cadre), run_time=0.5)
        self.insister(VGroup(res, cadre), 1.12, 0.3)
        self.attendre_voix()

    # ── 04 : le piège, la dernière moins la première ────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-piege")
        g, vals = self.courbe_prete()
        self.au_mot("Le piège")
        tit = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.6)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("la dernière valeur moins la première")
        dp = self.col(self.t("la dernière − la première", 38, ORANGE_RETENUE), 1.75)
        self.play(FadeIn(dp, shift=RIGHT * 0.2), g.estomper([0, 6], 0.35), run_time=0.5)
        self.play(Indicate(vals[6], color=ROUGE_ERREUR, scale_factor=1.6),
                  Indicate(vals[0], color=ROUGE_ERREUR, scale_factor=1.6), run_time=0.6)
        c = self.ligne([("12,5", WHITE), ("−", WHITE), ("11,5", WHITE), ("=", WHITE), ("1", ROUGE_ERREUR)], 50)
        self.col(c, 0.8)
        self.au_mot("12,5 moins")
        self.play(FadeIn(c[:2], scale=1.3), run_time=0.3)
        self.au_mot("11,5, égale")
        self.play(FadeIn(c[2:4], scale=1.3), run_time=0.3)
        self.au_mot("égale 1")
        petite = fleche_ecart(g.point(6)[0] + 0.25, g.y_axe(11.5)[1], g.y_axe(12.5)[1], ROUGE_ERREUR)
        self.play(FadeIn(c[4], scale=1.6), GrowFromCenter(petite), run_time=0.4)
        self.au_mot("faux")
        x = croix(c, sw=7)
        f = self.t("faux !", 44, ROUGE_ERREUR).next_to(c, DOWN, buff=0.2).align_to(c, LEFT)
        self.play(Create(x), FadeIn(f, scale=1.5), run_time=0.4)
        self.au_mot("bien plus d'un mètre")
        grande = fleche_ecart(g.point(6)[0] + 0.25, g.y_axe(1.5)[1], g.y_axe(12.5)[1], VERT_OK)
        self.play(FadeOut(petite), GrowFromCenter(grande), g.rallumer(), run_time=0.5)
        self.au_mot("On cherche le maximum")
        bon = self.col(VGroup(self.t("Max et min", 42, VERT_OK), self.t("dans TOUTE la série", 38))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.1), -1.55)
        self.play(FadeIn(bon, shift=UP * 0.2), Create(self.encadrer(bon)), run_time=0.5)
        self.play(Indicate(g.ronds[6], color=VERT_OK, scale_factor=2), Indicate(g.ronds[3], color=VERT_OK,
                                                                                 scale_factor=2), run_time=0.7)
        self.attendre_voix()

    # ── 05 : La Réunion, comparer deux dispersions ─────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-comparer")
        g = self.courbe(titre="Hauteur de l'eau, même jour")
        self.add(g)
        reu = self.courbe(GALETS, C_REU, titre="Hauteur de l'eau, même jour")
        self.au_mot("à La Réunion")
        tit = self.col(self.t("La Réunion", 46, C_REU), 2.65)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Pointe des Galets")
        pg = self.col(self.t("port de la Pointe des Galets", 32), 2.0)
        self.play(FadeIn(pg), Create(reu.ligne), LaggedStart(*[FadeIn(r, scale=0.3) for r in reu.ronds],
                                                              lag_ratio=0.1), run_time=1.0)
        leg = VGroup(VGroup(Line(ORIGIN, RIGHT * 0.5, color=MER, stroke_width=6), self.t("Saint-Malo", 26, MER))
                     .arrange(RIGHT, buff=0.15),
                     VGroup(Line(ORIGIN, RIGHT * 0.5, color=C_REU, stroke_width=6), self.t("La Réunion", 26, C_REU))
                     .arrange(RIGHT, buff=0.15)).arrange(RIGHT, buff=0.5).next_to(g, DOWN, buff=0.12)
        self.play(FadeIn(leg), run_time=0.3)
        self.au_mot("de 0,2")
        de = self.col(self.ligne([("de", WHITE), ("0,2", C_REU)], 40), 1.2)
        self.play(FadeIn(de, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("à 0,7")
        a = self.ligne([("à", WHITE), ("0,7 m", C_REU)], 40).next_to(de, RIGHT, buff=0.3)
        self.play(FadeIn(a, shift=RIGHT * 0.2), run_time=0.3)
        c = self.ligne([("0,7", C_REU), ("−", WHITE), ("0,2", C_REU), ("=", WHITE), ("0,5 m", C_REU)], 44)
        self.col(c, 0.35)
        self.au_mot("0,7 moins")
        self.play(FadeIn(c[:2], scale=1.3), run_time=0.3)
        self.au_mot("0,2, égale")
        self.play(FadeIn(c[2:4], scale=1.3), run_time=0.3)
        self.au_mot("égale 0,5")
        pf = fleche_ecart(g.point(6)[0] + 0.25, g.y_axe(0.2)[1], g.y_axe(0.7)[1], C_REU)
        self.play(FadeIn(c[4], scale=1.5), FadeIn(pf), run_time=0.4)
        self.au_mot("11 mètres contre 0,5")
        gf = fleche_ecart(g.point(6)[0] + 0.55, g.y_axe(1.5)[1], g.y_axe(12.5)[1], MER)
        cmp_ = self.col(self.ligne([("11 m", MER), ("contre", WHITE), ("0,5 m", C_REU)], 44), -0.6)
        self.play(GrowFromCenter(gf), FadeIn(cmp_, shift=UP * 0.2), run_time=0.5)
        self.au_mot("beaucoup plus dispersée")
        disp = self.col(self.ligne([("Saint-Malo :", MER), ("plus dispersée", WHITE)], 38), -1.45)
        self.play(FadeIn(disp, shift=UP * 0.2), Indicate(gf, color=WHITE), run_time=0.5)
        self.au_mot("L'étendue mesure la dispersion")
        mes = self.col(self.bloc(["L'étendue mesure", "la dispersion."], 34, VERT_OK), -2.45)
        self.play(FadeIn(mes, shift=UP * 0.2), run_time=0.5)
        self.insister(mes, 1.08, 0.3)
        self.attendre_voix()

    # ── 06 : défi, les vagues ───────────────────────────────────────────────

    def tableau_vagues(self, centre=P(-1.0, 0.4)):
        tab = Tableau([str(v) for v in VAGUES], [JOURS_V], libelles=["Jours"], coin="Vagues (m)",
                      largeur_case=1.8, largeur_libelle=3.0, hauteur=1.0, fs=42, centre=centre)
        textes_devant(tab)
        return tab

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer", 52, JAUNE_TITRE).to_edge(UP, buff=0.35)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("une capitaine")
        bat = bateau(0.75).move_to(P(4.3, 3.25))
        cap = self.ligne([("Une capitaine :", WHITE), ("20", BLEU_CALCUL), ("jours de vagues", WHITE)], 36)
        cap.next_to(tit, DOWN, buff=0.3)
        tab = self.tableau_vagues()
        fond = VGroup(tab.carte, tab.coin, tab.libelles, *[t[0] for t in tab.tetes], *[c[0] for c in tab.cases[0]])
        self.au_mot("pendant 20 jours")
        self.play(FadeIn(bat, shift=RIGHT * 0.3), FadeIn(cap, shift=DOWN * 0.2), FadeIn(fond, scale=0.95),
                  run_time=0.6)
        mots = [("1 mètre", "4 jours"), ("2 mètres", "9 jours"), ("3 mètres", "5 jours"), ("6 mètres", "2 jours")]
        for j, (a, b) in enumerate(mots):
            self.au_mot(a)
            self.play(FadeIn(tab.tetes[j][1], scale=1.6), run_time=0.25)
            self.au_mot(b)
            self.play(FadeIn(tab.cases[0][j][1], scale=1.6), run_time=0.25)
        self.au_mot("Quelle est l'étendue")
        q = self.ligne([("L'étendue des hauteurs de vagues", WHITE), ("?", ORANGE_RETENUE)], 42).move_to(P(-0.4, -1.35))
        self.play(FadeIn(q, scale=0.8), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 42, ORANGE_RETENUE).move_to(P(-0.4, -2.45))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        tit = self.t("Correction", 52, JAUNE_TITRE).to_edge(UP, buff=0.35)
        tab = self.tableau_vagues(P(-1.7, 1.55))
        self.play(Write(tit), FadeIn(tab), run_time=0.6)
        self.au_mot("porte sur les valeurs")
        cadre_v = SurroundingRectangle(VGroup(*tab.tetes), color=VERT_OK, buff=0.05, stroke_width=7)
        lv = self.t("les valeurs", 34, VERT_OK).next_to(cadre_v, RIGHT, buff=0.25)
        self.play(Create(cadre_v), FadeIn(lv), run_time=0.5)
        c = self.ligne([("6", VERT_OK), ("−", WHITE), ("1", VERT_OK), ("=", WHITE), ("5 m", VERT_OK)], 54)
        c.move_to(P(-0.6, -0.15))
        self.au_mot("6 moins")
        self.play(FadeIn(c[:2], scale=1.3), Indicate(tab.tetes[3][1], color=VERT_OK, scale_factor=1.6), run_time=0.35)
        self.au_mot("1, égale")
        self.play(FadeIn(c[2:4], scale=1.3), Indicate(tab.tetes[0][1], color=VERT_OK, scale_factor=1.6),
                  run_time=0.35)
        self.au_mot("égale 5")
        self.play(FadeIn(c[4], scale=1.5), run_time=0.35)
        self.play(Create(self.encadrer(c)), run_time=0.4)
        self.au_mot("Attention")
        att = self.t("Attention :", 40, ORANGE_RETENUE).move_to(P(-4.4, -1.45))
        self.play(FadeIn(att, shift=RIGHT * 0.2), run_time=0.3)
        d = self.ligne([("9", ORANGE_RETENUE), ("−", WHITE), ("2", ORANGE_RETENUE), ("=", WHITE), ("7", ORANGE_RETENUE)],
                       48).next_to(att, RIGHT, buff=0.4)
        self.au_mot("9 moins")
        self.play(FadeIn(d[:2], scale=1.3), *allumer(tab, 0, 1), run_time=0.35)
        self.au_mot("2, égale")
        self.play(FadeIn(d[2:4], scale=1.3), *allumer(tab, 0, 3), run_time=0.35)
        self.au_mot("égale 7")
        self.play(FadeIn(d[4], scale=1.5), run_time=0.3)
        self.au_mot("ce sont des jours")
        jr = self.t("des jours !", 40, ORANGE_RETENUE).next_to(d, RIGHT, buff=0.4)
        self.play(FadeIn(jr, scale=1.3), run_time=0.35)
        self.au_mot("Ce n'est pas l'étendue")
        x = croix(d, sw=7)
        pas = self.t("Ce n'est pas l'étendue.", 40, ROUGE_ERREUR).move_to(P(-0.6, -2.5))
        self.play(Create(x), FadeIn(pas, shift=UP * 0.2), *eteindre(tab), run_time=0.5)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        g, vals = self.courbe_prete()
        textes = [("Étendue = plus grande", "− plus petite valeur."), ("Max et min dans", "TOUTE la série."),
                  ("Plus elle est grande,", "plus c'est dispersé.")]
        lignes = self.finale(textes, [1.75, 0.2, -1.35], fs=36)
        self.au_mot("L'étendue, c'est")
        fl = fleche_ecart(g.point(6)[0] + 0.25, g.y_axe(1.5)[1], g.y_axe(12.5)[1], AMBRE)
        self.montrer_ligne(lignes[0], GrowFromCenter(fl))
        self.au_mot("On cherche le maximum")
        self.montrer_ligne(lignes[1], Indicate(g.ronds[6], color=VERT_OK, scale_factor=2),
                           Indicate(g.ronds[3], color=VERT_OK, scale_factor=2))
        self.au_mot("Plus l'étendue est grande")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_serie()
        self.ecran_calcul()
        self.ecran_piege()
        self.ecran_comparer()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class StatsEtendue4e(StatsEtendueBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"


class StatsEtendue3e(StatsEtendueBase):
    """Même vidéo pour la 3e (révision) : identité et ceinture seulement."""

    identite = "Maths 3e — EleveAI"
    ceinture = "jaune"
