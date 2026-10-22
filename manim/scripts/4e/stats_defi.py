# stats_defi.py  (⚠️ même nom que manim/scripts/6e/stats_defi.py : un short qui
# l'importe doit le charger par son CHEMIN, voir stats_defi_short.py)
# EleveAI — Maths 4e — série « Statistiques », cycle 4, épisode 11 : DÉFIS SUR LES
# INDICATEURS (micro du coach : stat_defi, notion stat_statistique), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE : au-dessus du niveau (retrouver une valeur
# cachée par les sommes : somme = moyenne × nombre de valeurs ; une valeur
# ajoutée qui change la moyenne ; la valeur qu'il faut pour atteindre une moyenne).
# Short jumeau : stats_defi_short.py (verte, un cran plus bas).
#
# ⭐ Décor et métier : le FOOTBALL (accord de Frédéric, 22/10) ; un RECRUTEUR
# juge les joueurs avec des chiffres (problématique : juger, retrouver une donnée).
# ⭐ DONNÉES RÉELLES, vérifiées le 22/10/2026 (saisons TERMINÉES) :
#   · Michael Olise, buts en championnat : Crystal Palace (Premier League)
#     2021-22 : 2, 2022-23 : 2, 2023-24 : 10 ; Bayern Munich (Bundesliga)
#     2024-25 : 12 (et 15 passes décisives, meilleur passeur de Bundesliga),
#     2025-26 : 15.
#     Sources : https://en.wikipedia.org/wiki/Michael_Olise (tableau « Career
#     statistics », consulté le 21/10/2026) ; 2024-25 : bundesliga.com (bilan des
#     meilleurs passeurs 2024-25 : 12 buts, 15 passes) ; 2025-26 : The Analyst
#     (https://theanalyst.com/football/player/sc-443661/michael-olise : 15 buts en 31 matchs).
#   · Calculs : 2 + 2 + 10 + 12 = 26, moyenne 6,5 ; après 2025-26, moyenne 8,2 :
#     8,2 × 5 = 41, 41 − 26 = 15 (son vrai total) ; piège (6,5 + 15) ÷ 2 = 10,75.
#     Défi (genValeurManquante « objectif » du coach), HYPOTHÉTIQUE : pour une
#     moyenne de 10 sur 6 saisons, 10 × 6 − 41 = 19.
# ⭐ Figure du coach : `stat_graph` barres (manim/canvas_stats.py), une barre
# cachée « ? » qui pousse quand on l'a trouvée.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit. Division : « ÷ ».
#
# Mapping micro → écrans (banque 4e, stat_defi) : somme = moyenne × n → 03-04 ·
# genAjoutValeur → 05 · « ajouter une valeur change la moyenne » (fixe) → 06 ·
# genValeurManquante (objectif) → 07 défi / 07b.
# Écrans : 00 garde · 01 le recruteur · 02 les saisons d'Olise · 03 la moyenne ·
# 04 la clé · 05 la saison cachée · 06 le piège · 07 défi · 07b correction ·
# 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/4e-stats-defi.json (débit −10), WAV dans
# public/sons/4e-stats-defi/ ; calage : manim/scripts/4e/stats_defi_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_defi.py StatsDefi4e -o eleveai-maths-4e-stats-defi --media_dir manim/scripts/4e/media-defi
# Sortie : manim/sorties/4e/maths/statistiques/11-defi/eleveai-maths-4e-stats-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403

SAISONS = ["21-22", "22-23", "23-24", "24-25", "25-26", "26-27"]
BUTS = [2, 2, 10, 12, 15, 19]
PALACE, BAYERN, HYPO = "#93c5fd", "#fca5a5", "#fdba74"
COUL = [PALACE, PALACE, PALACE, BAYERN, BAYERN, HYPO]


def ballon(r=0.6):
    d = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    pent = RegularPolygon(5, fill_color=NUIT, fill_opacity=1, stroke_width=0).scale(0.36 * r).rotate(PI / 10)
    lignes = VGroup()
    for k in range(5):
        a = PI / 2 + k * TAU / 5
        dv = np.array([np.cos(a), np.sin(a), 0.0])
        lignes.add(Line(dv * 0.36 * r, dv * r, color=NUIT, stroke_width=3), Dot(dv * 0.82 * r, radius=0.12 * r,
                                                                                  color=NUIT))
    return VGroup(d, lignes, pent)


def loupe(r=0.55):
    verre = Circle(radius=r, stroke_color="#e2e8f0", stroke_width=8, fill_color="#93c5fd", fill_opacity=0.25)
    manche = Line(P(r * 0.7, -r * 0.7), P(r * 1.6, -r * 1.6), color="#a16207", stroke_width=14)
    return VGroup(manche, verre)


class StatsDefi4e(Paysage4e):
    nom_voix = "4e-stats-defi"
    fichier_marques = "stats_defi_marques.json"

    def graphe(self, n=4, centre=P(-3.2, -0.3), largeur=None, fs=26):
        largeur = largeur or min(max(1.05 * n + 0.6, 4.6), 5.9)
        g = Barres(SAISONS[:n], BUTS[:n], pas=5, sous_pas=1, maxi=20, couleurs=COUL[:n], nom_axe="Buts",
                   titre="Olise, buts en championnat", largeur=largeur, hauteur=3.5, fs=fs, centre=centre)
        slot = (g.ref_x.get_end()[0] - g.ref_x.get_start()[0]) / n
        for e, c in zip(g.etiquettes, SAISONS[:n]):  # « 21-22 » : presque toute la case
            neuf = texte(c, fs - 2)
            neuf.scale_to_fit_width(min(neuf.width, slot * 0.86)).move_to(e).align_to(e, UP)
            e.become(neuf)
        return g

    def montrer(self, g, k):
        """Ajoute les k premières barres et leurs valeurs ; renvoie les valeurs."""
        vals = VGroup(*[g.valeur(i, fs=28) for i in range(g.n)])
        self.add(g.fond, *g.barres[:k], *vals[:k])
        return vals

    def trou(self, g, i):
        b = g.barres[i]
        r = Rectangle(width=b.width, height=0.9).move_to(b.get_bottom(), aligned_edge=DOWN)
        return VGroup(DashedVMobject(r, num_dashes=22).set_stroke(ORANGE_Q, 4), texte("?", 40, ORANGE_Q).move_to(r))

    def ligne_moy(self, g, v, couleur=VERT_OK):
        y = g.y_axe(v)
        return DashedLine(y, P(g.barres[-1].get_right()[0] + 0.15, y[1]), color=couleur, stroke_width=6,
                          dash_length=0.15)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les indicateurs", self.identite, "bleue")
        g = Barres(SAISONS[:5], BUTS[:5], pas=5, maxi=20, couleurs=COUL[:5], largeur=3.6, hauteur=2.0, fs=18,
                   centre=P(-0.6, 0.15))
        tr = self.trou(g, 4)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9), run_time=0.7)
        self.play(g.pousser([0, 1, 2, 3], run_time=0.8))
        self.au_mot("un nombre caché")
        self.play(Create(tr[0]), FadeIn(tr[1], scale=1.5), run_time=0.5)
        self.insister(tr[1], 1.6, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : le recruteur ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        b = ballon(0.8).move_to(P(-4.3, 1.3))
        lp = loupe(0.6).move_to(P(-2.8, 1.0))
        self.au_mot("Un recruteur")
        metier = self.t("Recruteur", 46, BLEU_CALCUL).move_to(P(-3.6, -0.6))
        self.play(FadeIn(b, shift=DOWN * 0.4), FadeIn(metier, shift=UP * 0.2), run_time=0.6)
        self.au_mot("repérer les talents")
        self.play(FadeIn(lp, shift=LEFT * 0.4), run_time=0.5)
        self.play(lp.animate.move_to(b.get_center() + P(0.45, -0.2)), run_time=0.6)
        self.au_mot("avec des chiffres")
        ch = self.bloc(["des chiffres,", "pas seulement les yeux"], 32, VERT_OK).next_to(metier, DOWN, buff=0.3)
        ch.set_x(-3.6)
        self.play(FadeIn(ch, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Michael Olise")
        mo = self.col(self.t("Michael Olise", 52, JAUNE_TITRE), 1.9)
        self.play(Write(mo), run_time=0.7)
        self.au_mot("le joueur français")
        l2 = self.col(self.bloc(["joueur français", "du Bayern Munich"], 40), 0.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 02 : les saisons d'Olise ────────────────────────────────────────────

    def ecran_donnees(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-donnees")
        g = self.graphe(4)
        self.au_mot("Ses buts en championnat")
        self.play(FadeIn(g.fond), run_time=0.5)
        for i, (mot, n) in enumerate([("2, puis", 1), ("puis 2", 1), ("puis 10", 1), ("puis 12", 1)]):
            self.au_mot(mot, n)
            self.play(g.pousser(i, run_time=0.3), FadeIn(g.valeur(i, fs=28), scale=1.6, run_time=0.3), run_time=0.3)
        clubs = self.col(VGroup(self.ligne([("■", PALACE), ("Crystal Palace", WHITE)], 32),
                                self.ligne([("■", BAYERN), ("Bayern Munich", WHITE)], 32)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.15), 2.3)
        self.play(FadeIn(clubs, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("meilleur passeur")
        mp = self.col(self.bloc(["meilleur passeur", "d'Allemagne"], 40, JAUNE_TITRE), 0.6)
        self.play(FadeIn(mp, shift=RIGHT * 0.2), Indicate(g.barres[3], color=AMBRE), run_time=0.6)
        self.au_mot("15 passes")
        p15 = self.col(self.ligne([("15", AMBRE), ("passes décisives", WHITE)], 40), -0.7)
        self.play(FadeIn(p15[0], scale=1.6), FadeIn(p15[1]), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la moyenne ─────────────────────────────────────────────────────

    def ecran_moyenne(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-moyenne")
        g = self.graphe(4)
        self.montrer(g, 4)
        self.au_mot("La moyenne")
        tit = self.col(self.t("La moyenne", 48, VERT_OK), 2.5)
        self.play(Write(tit), run_time=0.5)
        s = self.col(self.ligne([("2", WHITE), ("+", WHITE), ("2", WHITE), ("+", WHITE), ("10", WHITE), ("+", WHITE),
                                 ("12", WHITE)], 46, 0.14), 1.4)
        for k, mot in enumerate(["2 plus 2", "2 plus 10", "10 plus 12", "12, égale"]):
            self.au_mot(mot)
            morceaux = [s[2 * k]] + ([s[2 * k - 1]] if k else [])
            self.play(*[FadeIn(m, scale=1.4) for m in morceaux], Indicate(g.barres[k], color=AMBRE), run_time=0.25)
        self.au_mot("26. Puis")
        r = self.ligne([("=", WHITE), ("26", AMBRE)], 46).next_to(s, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=1.4), run_time=0.3)
        self.au_mot("26 divisé par 4")
        d = self.col(self.ligne([("26", AMBRE), ("÷", WHITE), ("4", WHITE), ("=", WHITE), ("6,5", VERT_OK)], 52),
                     0.3)
        self.play(FadeIn(d[:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 6,5")
        lm = self.ligne_moy(g, 6.5)
        self.play(FadeIn(d[3:], scale=1.4), Create(lm), run_time=0.5)
        self.insister(d[4], 1.4, 0.3)
        self.attendre_voix()

    # ── 04 : la clé ─────────────────────────────────────────────────────────

    def ecran_cle(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-cle")
        g = self.graphe(4)
        self.montrer(g, 4)
        self.add(self.ligne_moy(g, 6.5))
        self.au_mot("La clé des défis")
        cle = self.col(self.t("La clé des défis", 46, JAUNE_TITRE), 2.5)
        self.play(Write(cle), run_time=0.5)
        self.au_mot("la somme, c'est")
        f = self.col(VGroup(self.t("somme =", 46, AMBRE), self.t("moyenne × nombre", 46)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.15), 1.25)
        cadre = self.encadrer(f, AMBRE)
        self.play(FadeIn(f[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("la moyenne fois")
        self.play(FadeIn(f[1], shift=RIGHT * 0.2), Create(cadre), run_time=0.6)
        self.au_mot("6,5 fois 4")
        e = self.col(self.ligne([("6,5", VERT_OK), ("×", WHITE), ("4", WHITE), ("=", WHITE), ("26", AMBRE)], 52), -0.3)
        self.play(FadeIn(e[:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 26")
        self.play(FadeIn(e[3:], scale=1.4), run_time=0.35)
        self.au_mot("On retrouve bien le total")
        ok = self.coche(VERT_OK, 0.3).next_to(e, RIGHT, buff=0.3)
        self.play(Create(ok), Circumscribe(VGroup(*g.barres[:4]), color=VERT_OK), run_time=0.8)
        self.attendre_voix()

    # ── 05 : la saison cachée ───────────────────────────────────────────────

    def ecran_ajout(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-ajout")
        g = self.graphe(5)
        vals = self.montrer(g, 4)
        tr = self.trou(g, 4)
        self.au_mot("après une cinquième saison")
        self.play(Create(tr[0]), FadeIn(tr[1], scale=1.5), run_time=0.5)
        self.au_mot("passe à 8,2")
        l0 = self.col(self.ligne([("5 saisons :", WHITE), ("moyenne", WHITE), ("8,2", VERT_OK)], 40), 2.55)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Nouvelle somme")
        l1 = self.col(self.ligne([("8,2", VERT_OK), ("×", WHITE), ("5", WHITE), ("=", WHITE), ("41", AMBRE)], 46), 1.55)
        self.play(FadeIn(l1[:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 41")
        self.play(FadeIn(l1[3:], scale=1.4), run_time=0.35)
        self.au_mot("Ancienne somme")
        l2 = self.col(self.ligne([("4 saisons :", WHITE), ("26", AMBRE)], 42), 0.7)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(VGroup(*vals[:4]), color=AMBRE), run_time=0.5)
        self.au_mot("41 moins 26")
        l3 = self.col(self.ligne([("41", AMBRE), ("−", WHITE), ("26", AMBRE), ("=", WHITE), ("15", VERT_OK)], 50),
                      -0.25)
        self.play(FadeIn(l3[:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 15")
        self.play(FadeIn(l3[3:], scale=1.4), FadeOut(tr), g.pousser(4, run_time=0.8), run_time=0.8)
        self.play(FadeIn(vals[4], scale=1.8), Flash(vals[4], color=VERT_OK), run_time=0.5)
        self.au_mot("exactement")
        vrai = self.col(self.bloc(["Exactement son", "vrai score !"], 36, VERT_OK), -1.35)
        self.play(FadeIn(vrai, shift=UP * 0.2), Create(self.encadrer(l3)), run_time=0.6)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        g = self.graphe(5)
        self.montrer(g, 5)
        self.au_mot("Le piège")
        tit = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.5)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("faire la moyenne de 6,5")
        f = self.col(self.ligne([("(6,5 + 15) ÷ 2", WHITE)], 44), 1.5)
        self.play(FadeIn(f, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("10,75")
        r = self.col(self.ligne([("=", WHITE), ("10,75", ROUGE_ERREUR)], 44), 0.75)
        self.play(FadeIn(r, scale=1.4), run_time=0.35)
        self.au_mot("faux")
        x = croix(VGroup(f, r), sw=6)
        self.play(Create(x), run_time=0.4)
        self.au_mot("une valeur parmi 5")
        une = self.col(self.ligne([("15 :", VERT_OK), ("1 valeur sur 5", WHITE)], 40), -0.3)
        self.play(FadeIn(une, shift=RIGHT * 0.2), LaggedStart(*[Indicate(b, color=AMBRE) for b in g.barres],
                                                              lag_ratio=0.15), run_time=1.0)
        self.au_mot("toujours par les sommes")
        regle = self.col(self.t("Toujours par les sommes !", 40, VERT_OK), -1.25)
        self.play(FadeIn(regle, shift=UP * 0.2), run_time=0.45)
        self.insister(regle, 1.08, 0.3)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        g = self.graphe(6)
        self.montrer(g, 5)
        tr = self.trou(g, 5)
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("41 buts")
        l1 = self.col(self.ligne([("5 saisons :", WHITE), ("41", AMBRE), ("buts", WHITE)], 42), 1.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("sur 6 saisons atteigne 10")
        l2 = self.col(self.ligne([("6 saisons :", WHITE), ("moyenne", WHITE), ("10", VERT_OK)], 42), 0.8)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Create(tr[0]), FadeIn(tr[1], scale=1.5), run_time=0.5)
        self.au_mot("combien devrait-il marquer")
        l3 = self.col(self.ligne([("6e saison :", WHITE), ("?", ORANGE_RETENUE)], 46), -0.05)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(l3[1], 1.5, 0.25)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE), -1.0)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        g = self.graphe(6)
        vals = self.montrer(g, 5)
        tr = self.trou(g, 5)
        self.add(tr)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("La somme qu'il faut")
        l1 = self.col(self.ligne([("10", VERT_OK), ("×", WHITE), ("6", WHITE), ("=", WHITE), ("60", AMBRE)], 48), 1.6)
        self.au_mot("10 fois 6")
        self.play(FadeIn(l1[:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 60")
        self.play(FadeIn(l1[3:], scale=1.4), run_time=0.35)
        self.au_mot("déjà 41")
        l2 = self.col(self.ligne([("déjà :", WHITE), ("41", AMBRE)], 44), 0.75)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(VGroup(*vals[:5]), color=AMBRE), run_time=0.5)
        self.au_mot("60 moins 41")
        l3 = self.col(self.ligne([("60", AMBRE), ("−", WHITE), ("41", AMBRE), ("=", WHITE), ("19", VERT_OK)], 50),
                      -0.15)
        self.play(FadeIn(l3[:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 19")
        self.play(FadeIn(l3[3:], scale=1.4), FadeOut(tr), g.pousser(5, run_time=0.8), run_time=0.8)
        self.play(FadeIn(vals[5], scale=1.8), Create(self.encadrer(l3)), run_time=0.5)
        self.au_mot("Un vrai défi")
        d = self.col(self.bloc(["Un vrai défi,", "même pour lui !"], 38, ORANGE_RETENUE), -1.3)
        self.play(FadeIn(d, shift=UP * 0.2), run_time=0.45)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        g = self.graphe(5, centre=P(-4.85, -0.3), largeur=2.6, fs=20)
        self.montrer(g, 5)
        self.XL = -2.3
        lignes = self.finale([("Somme =", "moyenne × nombre de valeurs."),
                              ("Valeur cachée :", "je compare deux sommes."),
                              ("Jamais la moyenne", "de deux moyennes !")], [1.7, 0.1, -1.5], fs=38)
        self.au_mot("La somme, c'est")
        self.montrer_ligne(lignes[0])
        self.au_mot("Pour retrouver")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et je ne fais jamais")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.06, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_moyenne()
        self.ecran_cle()
        self.ecran_ajout()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
