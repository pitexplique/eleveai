# stats_interpreter.py
# EleveAI — Maths 4e — série « Statistiques », cycle 4, épisode 09 : INTERPRÉTER
# DES INDICATEURS (micro du coach : stat_interpreter, notion stat_statistique),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 4e
# (le sens de la moyenne, de la médiane et de l'étendue, une valeur à part qui
# tire la moyenne, une moyenne qui cache une progression).
# Short jumeau : stats_interpreter_short.py (orange, un cran plus bas).
#
# ⭐ Décor et métier : le FOOTBALL (demande de Frédéric, 21/10 : des joueurs que
# les élèves adorent) ; une ANALYSTE DE DONNÉES d'un club résume la carrière des
# joueurs (problématique : juger une affirmation, décider).
# ⭐ DONNÉES RÉELLES, vérifiées le 21/10/2026 sur Wikipédia (en), tableaux
# « Career statistics » (saisons TERMINÉES) :
#   · Kylian Mbappé, buts en Ligue 1 avec le PSG : 2018-19 : 33, 2019-20 : 18,
#     2020-21 : 27, 2021-22 : 28, 2022-23 : 29, 2023-24 : 27 ; total 162
#     (= le total PSG 2018–2024 de l'infobox). Moyenne 27, médiane 27,5,
#     étendue 15. Sans 2019-20 : moyenne 144 ÷ 5 = 28,8, médiane 28.
#     https://en.wikipedia.org/wiki/Kylian_Mbapp%C3%A9
#   · 2019-20 : Ligue 1 suspendue le 13 mars 2020 (Covid-19), arrêtée le 28 avril
#     2020 (https://en.wikipedia.org/wiki/2019%E2%80%9320_Ligue_1).
#   · Défi : Lamine Yamal, buts en Liga avec le FC Barcelone : 2023-24 : 5,
#     2024-25 : 9, 2025-26 : 16 → moyenne 10, étendue 11 (il progresse).
#     https://en.wikipedia.org/wiki/Lamine_Yamal
# ⭐ Figures du coach (manim/canvas_stats.py : `stat_graph` barres) et la droite
# graduée `number_line` (AxePoints, stats4e_lote_commun.py) pour ranger, la
# médiane et l'étendue.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit. Division : « ÷ ».
#
# Mapping micro → écrans (banque 4e, stat_interpreter) : genSensIndicateur
# (moyenne ≠ chaque valeur, médiane = moitié, étendue = écart) → 03-05 ·
# « valeur extrême et médiane » (fixes) → 06 · genCompareEtendue /
# genCompareSeries (dispersion) → 07 défi / 07b · genQuelIndicateur → 08.
# Écrans : 00 garde · 01 l'analyste · 02 les saisons de Mbappé · 03 la moyenne ·
# 04 la médiane · 05 l'étendue · 06 la saison du Covid · 07 défi (Lamine Yamal) ·
# 07b correction · 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/4e-stats-interpreter.json (débit −10), WAV dans
# public/sons/4e-stats-interpreter/ ; calage : manim/scripts/4e/stats_interpreter_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_interpreter.py StatsInterpreter4e -o eleveai-maths-4e-stats-interpreter --media_dir manim/scripts/4e/media-interpreter
# Sortie : manim/sorties/4e/maths/statistiques/09-interpreter/eleveai-maths-4e-stats-interpreter.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403

SAISONS = ["18-19", "19-20", "20-21", "21-22", "22-23", "23-24"]
BUTS = [33, 18, 27, 28, 29, 27]
PSG = "#93c5fd"
YAMAL = [5, 9, 16]
BARCA = "#fca5a5"
BAS, HAUT = ORANGE_RETENUE, "#60a5fa"


def ballon(r=0.6):
    """Un ballon de football : disque blanc, pentagone noir et coutures."""
    d = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    pent = RegularPolygon(5, fill_color=NUIT, fill_opacity=1, stroke_width=0).scale(0.36 * r).rotate(PI / 10)
    lignes = VGroup()
    for k in range(5):
        a = PI / 2 + k * TAU / 5
        dirv = np.array([np.cos(a), np.sin(a), 0.0])
        lignes.add(Line(dirv * 0.36 * r, dirv * r, color=NUIT, stroke_width=3))
        lignes.add(Dot(dirv * 0.82 * r, radius=0.12 * r, color=NUIT))
    return VGroup(d, lignes, pent)


class StatsInterpreter4e(Paysage4e):
    nom_voix = "4e-stats-interpreter"
    fichier_marques = "stats_interpreter_marques.json"

    def graphe(self, centre=P(-3.2, -0.3), largeur=5.9, hauteur=3.6, fs=26, titre="Mbappé, PSG, Ligue 1",
               valeurs=None, couleurs=None):
        g = Barres(SAISONS, valeurs or BUTS, pas=10, sous_pas=5, maxi=40, couleurs=couleurs or [PSG] * 6,
                   nom_axe="Buts", titre=titre, largeur=largeur, hauteur=hauteur, fs=fs, centre=centre)
        # les saisons « 18-19 » : toutes de même longueur, on leur rend presque toute leur case
        slot = (g.ref_x.get_end()[0] - g.ref_x.get_start()[0]) / 6
        for e, c in zip(g.etiquettes, SAISONS):
            neuf = texte(c, fs - 2)
            neuf.scale_to_fit_width(min(neuf.width, slot * 0.96)).move_to(e).align_to(e, UP)
            e.become(neuf)
        return g

    def graphe_plein(self, **kw):
        g = self.graphe(**kw)
        vals = VGroup(*[g.valeur(i, fs=28) for i in range(6)])
        self.add(g, vals)
        return g, vals

    def axe(self, centre=P(-0.6, -0.5)):
        return AxePoints(BUTS, 15, 35, 5, sous_pas=1, longueur=9.5, couleur=PSG, fs=30, rayon=0.17,
                         centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Interpréter des indicateurs", self.identite, "verte")
        g = Barres(SAISONS, BUTS, pas=10, couleurs=[PSG] * 6, largeur=4.0, hauteur=2.0, fs=20, centre=P(-0.6, 0.15))
        self.au_mot("Interpréter")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9), run_time=0.7)
        self.play(g.pousser(run_time=0.9))
        self.au_mot("la moyenne")
        mots = VGroup(*[self.t(m, 32, c) for m, c in (("moyenne", VERT_OK), ("médiane", AMBRE),
                                                         ("étendue", BLEU_CALCUL))]).arrange(DOWN, buff=0.3)
        mots.next_to(g, RIGHT, buff=0.5)
        self.play(FadeIn(mots[0], shift=LEFT * 0.2), run_time=0.3)
        self.au_mot("la médiane")
        self.play(FadeIn(mots[1], shift=LEFT * 0.2), run_time=0.3)
        self.au_mot("l'étendue")
        self.play(FadeIn(mots[2], shift=LEFT * 0.2), run_time=0.3)
        q = self.t("?", 80, ORANGE_RETENUE).next_to(mots, RIGHT, buff=0.3)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'analyste de données ──────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        b = ballon(0.95).move_to(P(-3.7, 1.2))
        self.au_mot("Une analyste de données")
        metier = self.bloc(["Analyste", "de données"], 44, BLEU_CALCUL).move_to(P(-3.7, -0.65))
        for m in metier:
            m.set_x(-3.7)
        self.play(FadeIn(b, shift=DOWN * 0.5), FadeIn(metier, shift=UP * 0.2), run_time=0.6)
        self.play(Rotate(b, -PI / 2), run_time=0.5)
        self.au_mot("quelques nombres")
        nb = self.col(self.t("des nombres pour décider", 36, VERT_OK), 2.4)
        self.play(FadeIn(nb, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Kylian Mbappé")
        km = self.col(self.t("Kylian Mbappé", 50, JAUNE_TITRE), 1.2)
        self.play(Write(km), run_time=0.7)
        self.au_mot("ses buts en championnat")
        l2 = self.col(self.bloc(["buts en championnat", "avec le PSG"], 38), 0.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("saison par saison")
        l3 = self.col(self.t("saison par saison", 38, AMBRE), -1.3)
        self.play(FadeIn(l3, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les saisons de Mbappé ──────────────────────────────────────────

    def ecran_donnees(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-donnees")
        g = self.graphe()
        self.au_mot("De 2018 à 2024")
        self.play(FadeIn(g.fond), run_time=0.5)
        vals = VGroup()
        for i, (mot, n) in enumerate([("33 buts", 1), ("puis 18", 1), ("18, 27", 1), ("27, 28", 1), ("28, 29", 1),
                                      ("et 27", 1)]):
            self.au_mot(mot, n)
            v = g.valeur(i, fs=28)
            vals.add(v)
            self.play(g.pousser(i, run_time=0.3), FadeIn(v, scale=1.6, run_time=0.3), run_time=0.3)
        self.au_mot("En tout, 162")
        tot = self.col(self.ligne([("En tout :", WHITE), ("162", AMBRE), ("buts", WHITE)], 46), 1.2)
        self.play(FadeIn(tot, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("6 saisons")
        s6 = self.col(self.ligne([("en", WHITE), ("6", AMBRE), ("saisons", WHITE)], 46), 0.2)
        self.play(FadeIn(s6, shift=RIGHT * 0.2), LaggedStart(*[Indicate(b, color=AMBRE) for b in g.barres],
                                                             lag_ratio=0.15), run_time=1.0)
        self.attendre_voix()

    # ── 03 : la moyenne ─────────────────────────────────────────────────────

    def ecran_moyenne(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-moyenne")
        g, vals = self.graphe_plein()
        self.au_mot("La moyenne")
        tit = self.col(self.t("La moyenne", 48, VERT_OK), 2.4)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("162 divisé par 6")
        c = self.col(self.ligne([("162", AMBRE), ("÷", WHITE), ("6", AMBRE)], 52), 1.3)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 27")
        r = self.ligne([("=", WHITE), ("27", VERT_OK)], 52).next_to(c, RIGHT, buff=0.2)
        y27 = g.y_axe(27)
        ligne = DashedLine(y27, P(g.barres[-1].get_right()[0] + 0.15, y27[1]), color=VERT_OK, stroke_width=6,
                           dash_length=0.15)
        self.play(FadeIn(r, scale=1.4), Create(ligne), run_time=0.6)
        self.insister(r[1], 1.4, 0.3)
        self.au_mot("Attention")
        att = self.col(self.bloc(["pas 27 buts", "chaque saison !"], 40, ORANGE_RETENUE), 0.0)
        autres = [i for i in range(6) if BUTS[i] != 27]
        self.play(FadeIn(att, shift=UP * 0.2), *[Indicate(vals[i], color=ORANGE_RETENUE, scale_factor=1.5)
                                                 for i in autres], run_time=0.8)
        self.au_mot("si on partageait")
        eg_b = self.graphe(valeurs=[27] * 6, couleurs=[VERT_OK] * 6)
        copies = VGroup(*[b.copy() for b in g.barres])
        self.add(copies)
        part = self.col(self.bloc(["le total partagé", "également"], 38, VERT_OK), -1.6)
        self.play(*[Transform(copies[i], eg_b.barres[i].copy().set_opacity(0.85)) for i in range(6)],
                  FadeOut(vals), FadeIn(part, shift=UP * 0.2), run_time=1.2)
        self.wait(0.8)
        self.play(FadeOut(copies), FadeIn(vals), run_time=0.8)
        self.attendre_voix()

    # ── 04 : la médiane ─────────────────────────────────────────────────────

    def rangee(self):
        """La série rangée, écrite en grand : 18 27 27 28 29 33."""
        r = VGroup(*[self.t(str(v), 54, WHITE) for v in sorted(BUTS)]).arrange(RIGHT, buff=0.6)
        return r.move_to(P(-0.6, 2.35))

    def ecran_mediane(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-mediane")
        ax = self.axe()
        self.au_mot("La médiane")
        tit = self.t("La médiane", 46, AMBRE).move_to(P(-0.6, 3.4))
        self.play(Write(tit), FadeIn(ax.fond), run_time=0.6)
        self.au_mot("je range")
        r = self.rangee()
        voix = self._texte_voix
        j = voix.find("saisons. ") + len("saisons. ")
        ordre = sorted(range(6), key=lambda k: (BUTS[k], k))  # le rond de chaque valeur rangée
        for k, v in enumerate(sorted(BUTS)):
            j = voix.find(str(v), j)
            n = voix[:j].count(str(v)) + 1
            self.au_mot(str(v), n)
            j += 1
            self.play(FadeIn(r[k], scale=1.5), FadeIn(ax.ronds[ordre[k]], shift=DOWN * 0.3), run_time=0.25)
        self.au_mot("Il y en a 6")
        nums = VGroup(*[texte(k + 1, 24, GRIS_TXT := "#94a3b8").next_to(r[k], UP, buff=0.12) for k in range(6)])
        nums.set_color("#94a3b8")
        self.play(LaggedStart(*[FadeIn(n) for n in nums], lag_ratio=0.15), run_time=0.7)
        self.au_mot("au milieu")
        barre = DashedLine(P((r[2].get_right()[0] + r[3].get_left()[0]) / 2, 3.0),
                           P((r[2].get_right()[0] + r[3].get_left()[0]) / 2, 1.8), color=AMBRE, stroke_width=6)
        self.play(Create(barre), run_time=0.4)
        self.au_mot("entre 27 et 28")
        self.play(Indicate(r[2], color=AMBRE, scale_factor=1.3), Indicate(r[3], color=AMBRE, scale_factor=1.3),
                  run_time=0.6)
        self.au_mot("C'est 27,5")
        rep = ax.repere(27.5, "27,5", AMBRE)
        res = self.t("médiane : 27,5", 44, AMBRE).move_to(P(-0.6, -2.35))
        self.play(Create(rep[0]), FadeIn(rep[1], scale=1.4), FadeIn(res, scale=0.8), run_time=0.6)
        self.au_mot("3 saisons en dessous")
        bas = [ordre[k] for k in range(3)]
        haut = [ordre[k] for k in range(3, 6)]
        self.play(*[ax.ronds[i].animate.set_fill(BAS) for i in bas], *[r[k].animate.set_color(BAS) for k in range(3)],
                  run_time=0.5)
        self.au_mot("3 saisons au-dessus")
        self.play(*[ax.ronds[i].animate.set_fill(HAUT) for i in haut],
                  *[r[k].animate.set_color(HAUT) for k in range(3, 6)], run_time=0.5)
        moit = self.ligne([("3", BAS), ("en dessous,", WHITE), ("3", HAUT), ("au-dessus", WHITE)], 38)
        moit.move_to(P(-0.6, -3.2))
        self.play(FadeIn(moit, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 05 : l'étendue ──────────────────────────────────────────────────────

    def ecran_etendue(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-etendue")
        ax = self.axe()
        r = self.rangee()
        self.add(ax, r)
        self.au_mot("L'étendue")
        tit = self.t("L'étendue", 46, BLEU_CALCUL).move_to(P(-0.6, 3.4))
        self.play(Write(tit), run_time=0.5)
        self.au_mot("33 moins 18")
        self.play(r[5].animate.set_color(BLEU_CALCUL).scale(1.3), r[0].animate.set_color(BLEU_CALCUL).scale(1.3),
                  run_time=0.4)
        c = self.ligne([("33", BLEU_CALCUL), ("−", WHITE), ("18", BLEU_CALCUL)], 50).move_to(P(-1.5, -2.35))
        self.play(FadeIn(c, shift=UP * 0.2), run_time=0.4)
        self.au_mot("égale 15")
        acc = ax.accolade(18, 33, "15", BLEU_CALCUL, fs=34)
        res = self.ligne([("=", WHITE), ("15", BLEU_CALCUL), ("buts", WHITE)], 50).next_to(c, RIGHT, buff=0.2)
        self.play(GrowFromCenter(acc[0]), FadeIn(acc[1]), FadeIn(res, scale=1.3), run_time=0.6)
        self.au_mot("l'écart entre")
        ec = self.t("l'écart entre la meilleure et la moins bonne saison", 34).move_to(P(-0.6, -3.2))
        self.play(FadeIn(ec, shift=UP * 0.2), Indicate(ax.ronds[0], scale_factor=1.6),
                  Indicate(ax.ronds[1], scale_factor=1.6), run_time=0.7)
        self.attendre_voix()

    # ── 06 : la saison du Covid ─────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        g, vals = self.graphe_plein()
        self.au_mot("pourquoi seulement 18")
        q = self.col(self.ligne([("Pourquoi", WHITE), ("18", ORANGE_RETENUE), ("?", WHITE)], 46), 2.6)
        self.play(FadeIn(q, shift=RIGHT * 0.2), g.focus(1, 0.35), run_time=0.5)
        self.au_mot("En mars 2020")
        m = self.col(self.bloc(["mars 2020 :", "championnat arrêté"], 38, ORANGE_RETENUE), 1.7)
        self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("moins de matchs")
        mm = self.col(self.t("moins de matchs", 36), 0.85)
        self.play(FadeIn(mm, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Sans cette saison")
        x = croix(VGroup(g.barres[1], vals[1]), sw=6)
        self.play(Create(x), g.rallumer(), run_time=0.5)
        self.play(g.estomper([0, 2, 3, 4, 5], 0.2), vals[1].animate.set_opacity(0.25), run_time=0.4)
        l1 = self.col(self.ligne([("moyenne :", WHITE), ("27", WHITE), ("→", WHITE), ("28,8", VERT_OK)], 42), 0.05)
        self.au_mot("la moyenne monte à 28,8")
        self.play(FadeIn(l1[:3], shift=RIGHT * 0.2), run_time=0.35)
        self.play(FadeIn(l1[3], scale=1.5), run_time=0.35)
        self.au_mot("La médiane, elle")
        l2 = self.col(self.ligne([("médiane :", WHITE), ("27,5", WHITE), ("→", WHITE), ("28", AMBRE)], 42), -0.8)
        self.play(FadeIn(l2[:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("à peine : 28")
        self.play(FadeIn(l2[3], scale=1.5), run_time=0.35)
        self.au_mot("Une valeur à part")
        conc = self.col(self.bloc(["Une valeur à part", "tire la moyenne,", "à peine la médiane."], 32,
                                   VERT_OK), -1.95)
        self.play(FadeIn(conc, shift=UP * 0.2), run_time=0.5)
        self.insister(l1[3], 1.3, 0.3)
        self.attendre_voix()

    # ── 07 : défi (Lamine Yamal) ────────────────────────────────────────────

    def graphe_yamal(self):
        return Barres(["1re", "2e", "3e"], YAMAL, pas=5, sous_pas=1, couleurs=[BARCA] * 3, nom_axe="Buts",
                      titre="Lamine Yamal, Barça, Liga", largeur=4.4, hauteur=3.4, fs=28, centre=P(-3.4, -0.35))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        g = self.graphe_yamal()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), FadeIn(g.fond), run_time=0.6)
        vals = VGroup()
        for i, mot in enumerate(["5 buts", "puis 9", "puis 16"]):
            self.au_mot(mot)
            v = g.valeur(i, fs=30)
            vals.add(v)
            self.play(g.pousser(i, run_time=0.35), FadeIn(v, scale=1.6, run_time=0.35), run_time=0.35)
        self.au_mot("Calcule la moyenne")
        q1 = self.col(self.ligne([("1.", AMBRE), ("La moyenne ?", WHITE)], 40), 1.6)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("et l'étendue")
        q2 = self.col(self.ligne([("2.", AMBRE), ("L'étendue ?", WHITE)], 40), 0.85)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("vrai ou faux")
        q3 = self.col(VGroup(self.ligne([("3.", AMBRE), ("Vrai ou faux ?", WHITE)], 40),
                             self.t("« environ 10 buts", 36, BLEU_CALCUL),
                             self.t("chaque saison »", 36, BLEU_CALCUL)).arrange(DOWN, aligned_edge=LEFT, buff=0.12),
                      -0.35)
        self.play(FadeIn(q3[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("il marque environ 10")
        self.play(FadeIn(q3[1:], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -1.85)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        g = self.graphe_yamal()
        vals = VGroup(*[g.valeur(i, fs=30) for i in range(3)])
        self.add(g, vals)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.5)
        s = self.col(self.ligne([("5", WHITE), ("+", WHITE), ("9", WHITE), ("+", WHITE), ("16", WHITE)], 46, 0.14), 1.7)
        for k, mot in enumerate(["5 plus", "9 plus", "16, égale"]):
            self.au_mot(mot)
            morceaux = [s[2 * k]] + ([s[2 * k - 1]] if k else [])
            self.play(*[FadeIn(m_, scale=1.4) for m_ in morceaux], Indicate(vals[k], color=AMBRE), run_time=0.25)
        self.au_mot("30. 30")
        r30 = self.ligne([("=", WHITE), ("30", AMBRE)], 46).next_to(s, RIGHT, buff=0.2)
        self.play(FadeIn(r30, scale=1.4), run_time=0.3)
        self.au_mot("30 divisé par 3")
        d = self.col(self.ligne([("Moyenne :", VERT_OK), ("30", AMBRE), ("÷", WHITE), ("3", WHITE), ("=", WHITE),
                                 ("10", VERT_OK)], 46), 0.9)
        self.play(FadeIn(d[:4], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 10")
        self.play(FadeIn(d[4:], scale=1.3), run_time=0.35)
        self.au_mot("16 moins 5")
        e = self.col(self.ligne([("Étendue :", BLEU_CALCUL), ("16", WHITE), ("−", WHITE), ("5", WHITE), ("=", WHITE),
                                 ("11", BLEU_CALCUL)], 46), 0.1)
        self.play(FadeIn(e[:4], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 11")
        self.play(FadeIn(e[4:], scale=1.3), run_time=0.35)
        self.au_mot("Faux")
        faux = self.col(self.t("Faux !", 52, ROUGE_ERREUR), -0.7)
        self.play(FadeIn(faux, scale=1.5), run_time=0.35)
        self.au_mot("il progresse")
        fl = Arrow(g.barres[0].get_top() + UP * 0.55, g.barres[2].get_top() + UP * 0.55, buff=0.1, color=VERT_OK,
                   stroke_width=8)
        prog = self.col(self.ligne([("il progresse :", WHITE), ("5 → 16", VERT_OK)], 40), -1.45)
        self.play(GrowArrow(fl), FadeIn(prog, shift=UP * 0.2), run_time=0.6)
        self.au_mot("La moyenne seule")
        cache = self.col(self.bloc(["La moyenne seule", "le cache."], 34, ORANGE_RETENUE), -2.35)
        self.play(FadeIn(cache, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.3)), run_time=0.7)
        textes = [("Moyenne :", "le total partagé également.", VERT_OK),
                  ("Médiane :", "coupe la série rangée en deux.", AMBRE),
                  ("Étendue :", "l'écart entre les extrêmes.", BLEU_CALCUL),
                  ("Avant de conclure :", "je regarde les valeurs.", WHITE)]
        lignes = VGroup()
        for (a, b, c), y in zip(textes, [2.0, 0.8, -0.4, -1.6]):
            lg = VGroup(self.coche(), self.t(a, 40, c), self.t(b, 40)).arrange(RIGHT, buff=0.25)
            lg.move_to(P(0, y)).align_to(P(-6.2, 0), LEFT)
            lignes.add(lg)
        for lg, mot in zip(lignes, ["La moyenne", "La médiane", "L'étendue", "Et je regarde"]):
            self.au_mot(mot)
            self.play(Create(lg[0]), FadeIn(lg[1:], shift=RIGHT * 0.2), run_time=0.6)
        self.insister(lignes[3], 1.06, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_moyenne()
        self.ecran_mediane()
        self.ecran_etendue()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
