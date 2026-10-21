# stats_frequence.py
# EleveAI — Maths 4e — série « Statistiques », cycle 4, épisode 04 : CALCULER UNE
# FRÉQUENCE (micro du coach : stat_frequence, notion stat_donnee), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 4e (fréquence
# décimale, pourcentage, depuis un tableau et un diagramme, et le piège
# effectif / fréquence). Short jumeau : stats_frequence_short.py (orange).
#
# ⭐ Décor et métier : la MÉDECINE, le don du sang ; un INFIRMIER de
# l'Établissement français du sang (EFS) organise une collecte (problématique :
# comparer, juger). Données :
#   · la collecte (vraisemblable, 200 donneurs) : A 92, O 82, B 18, AB 8 ;
#     fréquence du groupe O : 82 ÷ 200 = 0,41 = 41 % ;
#   · la France (chiffres de l'EFS couramment cités, ARRONDIS : A+ 38 %, A− 7 %,
#     O+ 36 %, O− 6 %, B+ 8 %, B− 1 %, AB+ 3 %, AB− 1 %) : A 45 %, O 42 %,
#     B 9 %, AB 4 % (la voix dit « environ ») ; la collecte (41 %) est proche ;
#   · le piège : lycée 6 B sur 50 (0,12 = 12 %) contre ville 18 sur 200
#     (0,09 = 9 %) : l'effectif le plus grand n'est pas la fréquence la plus grande ;
#   · défi (genFreq « graphique » du coach) : barres 11, 10, 3, 1 → total 25,
#     11 ÷ 25 = 0,44 = 44 %.
# ⭐ Les figures sont CELLES DU COACH (manim/canvas_stats.py) : `tableau_donnees`,
# `stat_graph` barres (axe gradué de 2 en 2, petit trait pour 11) et camembert
# (`pourcentages`). La grille de 100 cases dit « sur 100 » (pour cent).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit. Division : « ÷ ».
#
# Mapping micro → écrans (banque 4e statistiques.bank.ts, stat_frequence) :
#   genFreq « tableau » décimal → 02-03 · genFreq pourcentage / genFreqQCM → 04 ·
#   « une fréquence entre 0 et 1 » (fixes) → 05, 08 · effectif ≠ fréquence → 06 ·
#   genFreq « graphique » → 07 défi / 07b.
# Écrans : 00 garde · 01 l'infirmier, la collecte · 02 le tableau · 03 le calcul ·
# 04 le pourcentage (grille de 100) · 05 la France (camembert) · 06 le piège ·
# 07 défi · 07b correction · 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/4e-stats-frequence.json (débit −10), WAV dans
# public/sons/4e-stats-frequence/ ; calage : manim/scripts/4e/stats_frequence_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_frequence.py StatsFrequence4e -o eleveai-maths-4e-stats-frequence --media_dir manim/scripts/4e/media-frequence
# Sortie : manim/sorties/4e/maths/statistiques/04-frequence/eleveai-maths-4e-stats-frequence.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403

GROUPES = ["A", "O", "B", "AB"]
COUL = ["#93c5fd", "#fca5a5", "#6ee7b7", "#fcd34d"]   # A, O, B, AB : le même code partout
COLLECTE = [92, 82, 18, 8]
FRANCE = [45, 42, 9, 4]
DEFI = [11, 10, 3, 1]
SANG = "#dc2626"


def goutte(r=0.5, couleur=SANG):
    """Une goutte de sang : un disque surmonté d'une pointe."""
    rond = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0)
    pointe = Polygon(P(-0.86 * r, 0.5 * r), P(0.86 * r, 0.5 * r), P(0, 2.0 * r), fill_color=couleur,
                     fill_opacity=1, stroke_width=0)
    reflet = Arc(radius=0.62 * r, start_angle=PI * 0.6, angle=PI * 0.45, color=WHITE, stroke_width=4)
    return VGroup(rond, pointe, reflet)


def grille100(n=0, couleur=COUL[1], taille=0.36, gap=0.05):
    """La grille de 100 cases (10 × 10) : une case = 1 sur 100. Les n premières
    (ligne par ligne, depuis le haut) sont colorées. Renvoie le VGroup des cases."""
    cases = VGroup()
    for k in range(100):
        c = Square(side_length=taille, fill_color=couleur if k < n else WHITE, fill_opacity=1,
                   stroke_color="#94a3b8", stroke_width=1.5)
        c.move_to(P((k % 10) * (taille + gap), -(k // 10) * (taille + gap)))
        cases.add(c)
    return cases


def colorier(cases, debut, fin, couleur, run_time=1.0):
    """Les cases debut..fin-1 prennent la couleur, une à une (LaggedStart)."""
    return LaggedStart(*[cases[k].animate.set_fill(couleur) for k in range(debut, fin)],
                       lag_ratio=0.15, run_time=run_time)


class StatsFrequence4e(Paysage4e):
    nom_voix = "4e-stats-frequence"
    fichier_marques = "stats_frequence_marques.json"

    def tableau(self, plein=False, centre=P(-0.6, 2.35)):
        lignes = [COLLECTE + [200]] if plein else [[None] * 5]
        tab = Tableau(GROUPES + ["Total"], lignes, libelles=["Donneurs"], coin="Groupe", largeur_case=1.45,
                      largeur_libelle=2.5, hauteur=0.85, fs=34, centre=centre)
        for j in range(4):  # l'en-tête de chaque groupe garde sa couleur (code partagé)
            tab.tetes[j][0].set_fill(COUL[j])
            tab.tetes[j][1].set_color(NUIT)
        return textes_devant(tab)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une fréquence", self.identite, "verte")
        petit = VGroup(*[goutte(0.22, COUL[2] if k < 1 else "#64748b") for k in range(5)]).arrange_in_grid(1, 5,
                                                                                                         buff=0.2)
        grand = VGroup(*[goutte(0.2, COUL[2] if k < 3 else "#64748b") for k in range(20)]).arrange_in_grid(
            2, 10, buff=0.16)
        petit.move_to(P(-3.9, 0.3))
        grand.move_to(P(2.0, 0.3))
        self.au_mot("Calculer une fréquence")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Comment comparer")
        self.play(FadeIn(petit, scale=0.8), FadeIn(grand, scale=0.8), run_time=0.6)
        self.au_mot("tailles différentes")
        q = self.t("?", 90, ORANGE_RETENUE).move_to(P(-1.35, 0.3))
        self.play(Indicate(petit), Indicate(grand), FadeIn(q, scale=0.4), run_time=0.6)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'infirmier, la collecte ───────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        g = goutte(0.95).move_to(P(-3.7, 1.0))
        self.au_mot("Un infirmier")
        metier = self.t("Infirmier", 46, BLEU_CALCUL).move_to(P(-3.7, -0.9))
        self.play(FadeIn(g, shift=DOWN * 0.4), FadeIn(metier, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Établissement français du sang")
        efs = self.bloc(["Établissement", "français du sang"], 32, WHITE).next_to(metier, DOWN, buff=0.25)
        efs.set_x(-3.7)
        self.play(FadeIn(efs, shift=UP * 0.2), run_time=0.5)
        self.au_mot("200 donneurs")
        d = self.col(self.ligne([("200", AMBRE), ("donneurs", WHITE)], 50), 2.2)
        self.play(FadeIn(d[0], scale=1.7), FadeIn(d[1]), run_time=0.45)
        poches = VGroup(*[goutte(0.17, SANG) for _ in range(20)]).arrange_in_grid(2, 10, buff=0.13)
        self.col(poches, 1.05)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.15) for p in poches], lag_ratio=0.05), run_time=0.8)
        self.au_mot("quelle part")
        q = self.col(self.bloc(["Quelle part", "a le groupe O ?"], 42, ORANGE_RETENUE), -0.45)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.au_mot("très demandé")
        hop = self.col(self.t("très demandé à l'hôpital", 34, WHITE), -1.7)
        self.play(FadeIn(hop, shift=UP * 0.2), run_time=0.4)
        self.insister(q, 1.08, 0.3)
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        tab = self.tableau(centre=P(-0.6, 1.4)).scale(1.15)
        self.au_mot("Il note")
        self.play(FadeIn(tab, shift=DOWN * 0.2), run_time=0.6)
        gouttes = VGroup()
        for j, mot in enumerate(["Groupe A : 92", "Groupe O : 82", "Groupe B : 18", "Groupe AB : 8"]):
            self.au_mot(mot)
            gt = goutte(0.32, COUL[j]).next_to(tab.cases[0][j][0], DOWN, buff=0.45)
            gouttes.add(gt)
            self.play(remplir(tab, 0, j, COLLECTE[j]), *tab.allumer_case(0, j), FadeIn(gt, shift=DOWN * 0.2),
                      run_time=0.4)
            self.play(*tab.eteindre(), run_time=0.2)
        self.au_mot("L'effectif total")
        self.play(remplir(tab, 0, 4, 200), *tab.allumer_case(0, 4), run_time=0.45)
        et = self.ligne([("Effectif total :", WHITE), ("200", AMBRE)], 44).move_to(P(-0.6, -1.9))
        self.play(FadeIn(et, shift=UP * 0.2), run_time=0.4)
        self.insister(et[1], 1.4, 0.3)
        self.attendre_voix()

    # ── 03 : le calcul ──────────────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        tab = self.tableau(plein=True)
        self.add(tab)
        self.au_mot("La fréquence du groupe O")
        f = self.ligne([("fréquence", AMBRE), ("=", WHITE), ("effectif", WHITE), ("÷", WHITE),
                        ("effectif total", WHITE)], 44).move_to(P(-0.6, 0.65))
        self.play(FadeIn(f[0], shift=UP * 0.2), *tab.allumer_colonne(1), run_time=0.5)
        self.au_mot("son effectif divisé")
        self.play(FadeIn(f[1]), FadeIn(f[2], shift=UP * 0.2), run_time=0.4)
        self.au_mot("par l'effectif total")
        self.play(FadeIn(f[3]), FadeIn(f[4], shift=UP * 0.2), *tab.allumer_colonne(4), run_time=0.5)
        cadre = self.encadrer(f, AMBRE)
        self.play(Create(cadre), run_time=0.4)
        calc = self.ligne([("82", COUL[1]), ("÷", WHITE), ("200", AMBRE), ("=", WHITE), ("0,41", VERT_OK)], 60)
        calc.move_to(P(-0.6, -1.0))
        self.au_mot("82 divisé")
        c82 = tab.texte_case(0, 1).copy()
        self.play(Transform(c82, calc[0]), run_time=0.6)
        self.add(calc[0])
        self.remove(c82)
        self.au_mot("par 200")
        c200 = tab.texte_case(0, 4).copy()
        self.play(FadeIn(calc[1]), Transform(c200, calc[2]), run_time=0.6)
        self.add(calc[2])
        self.remove(c200)
        self.au_mot("égale 0,41")
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=1.5), run_time=0.4)
        self.play(Create(self.encadrer(calc[4])), run_time=0.4)
        self.insister(calc[4], 1.4, 0.3)
        self.attendre_voix()

    # ── 04 : le pourcentage (grille de 100) ─────────────────────────────────

    def ecran_pourcent(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-pourcent")
        gr = grille100().move_to(P(-3.5, -0.1))
        self.add(gr)
        cadre_g = SurroundingRectangle(gr, color=GRILLE, buff=0.12, stroke_width=3)
        self.add(cadre_g)
        self.au_mot("0,41, c'est")
        a = self.col(self.t("0,41", 60, VERT_OK), 2.3)
        self.play(FadeIn(a, scale=1.4), run_time=0.4)
        self.au_mot("41 centièmes")
        b = self.col(self.ligne([("=", WHITE), ("41", COUL[1]), ("centièmes", WHITE)], 46), 1.25)
        self.play(FadeIn(b, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Sur 100 donneurs")
        c = self.col(self.ligne([("sur", WHITE), ("100", WHITE), ("donneurs", WHITE)], 42), 0.15)
        self.play(FadeIn(c, shift=RIGHT * 0.2), Circumscribe(cadre_g, color=AMBRE), run_time=0.7)
        self.au_mot("41 sont du groupe O")
        c2 = self.col(self.ligne([("41", COUL[1]), ("sont du groupe O", WHITE)], 42), -0.75)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), colorier(gr, 0, 41, COUL[1], run_time=1.6))
        self.au_mot("On écrit aussi")
        d = self.col(self.ligne([("0,41", VERT_OK), ("=", WHITE), ("41 %", VERT_OK)], 60), -2.1)
        self.au_mot("41 %")
        self.play(FadeIn(d, scale=0.7), run_time=0.5)
        self.play(Create(self.encadrer(d)), run_time=0.4)
        self.insister(d[2], 1.3, 0.3)
        self.attendre_voix()

    # ── 05 : la France entière ──────────────────────────────────────────────

    def ecran_france(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-france")
        cam = Camembert(GROUPES, FRANCE, rayon=1.75, couleurs=COUL, valeurs_parts=True, pourcentages=True,
                        titre="France", fs=30, centre=P(-3.5, -0.2))
        self.au_mot("dans toute la France")
        fr_t = self.col(self.t("Dans toute la France ?", 42, JAUNE_TITRE), 2.6)
        self.play(FadeIn(fr_t, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("environ 42 %")
        l1 = self.col(self.ligne([("France :", WHITE), ("42 %", COUL[1]), ("de groupe O", WHITE)], 38), 1.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Notre collecte donne 41 %")
        l2 = self.col(self.ligne([("Collecte :", WHITE), ("41 %", COUL[1]), ("de groupe O", WHITE)], 38), 0.75)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("très proche")
        proche = self.col(self.t("très proche !", 40, VERT_OK), -0.1)
        self.play(FadeIn(proche, scale=0.7), run_time=0.4)
        for i, mot in enumerate(["45 % pour A", "42 % pour O", "9 % pour B", "4 % pour AB"]):
            self.au_mot(mot)
            fond = [FadeIn(cam.fond)] if i == 0 else []
            self.play(*fond, GrowFromPoint(cam.parts[i], cam.centre), FadeIn(cam.textes[i]), run_time=0.45)
        self.au_mot("Ensemble")
        som = self.col(self.ligne([("45", COUL[0]), ("+", WHITE), ("42", COUL[1]), ("+", WHITE), ("9", COUL[2]),
                                   ("+", WHITE), ("4", COUL[3])], 44, 0.14), -1.1)
        self.play(FadeIn(som, shift=UP * 0.2), run_time=0.4)
        self.au_mot("100 %")
        cent = self.col(self.ligne([("=", WHITE), ("100 %", VERT_OK)], 50), -2.05)
        self.play(FadeIn(cent, scale=0.7), Circumscribe(cam.parts, color=VERT_OK), run_time=0.6)
        self.insister(cent[1], 1.3, 0.3)
        self.attendre_voix()

    # ── 06 : le piège (effectif contre fréquence) ───────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        XG, XD = -3.6, 2.4
        self.au_mot("Le piège")
        titre = self.t("Le piège : comparer des effectifs", 44, ROUGE_ERREUR).move_to(P(-0.6, 3.45))
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Au lycée")
        ly = self.t("Lycée", 40, JAUNE_TITRE).move_to(P(XG, 2.65))
        self.play(FadeIn(ly, shift=DOWN * 0.2), run_time=0.3)
        self.au_mot("sur 50 donneurs")
        e1 = self.ligne([("6", COUL[2]), ("B sur", WHITE), ("50", WHITE)], 42).move_to(P(XG, 1.95))
        self.play(FadeIn(e1[1:], shift=UP * 0.2), run_time=0.35)
        self.au_mot("6 sont du groupe B")
        self.play(FadeIn(e1[0], scale=1.6), run_time=0.3)
        self.au_mot("En ville")
        vi = self.t("Ville", 40, JAUNE_TITRE).move_to(P(XD, 2.65))
        self.play(FadeIn(vi, shift=DOWN * 0.2), run_time=0.3)
        self.au_mot("18 sur 200")
        e2 = self.ligne([("18", COUL[2]), ("B sur", WHITE), ("200", WHITE)], 42).move_to(P(XD, 1.95))
        self.play(FadeIn(e2, shift=UP * 0.2), run_time=0.35)
        self.au_mot("18, c'est plus que 6")
        comp = self.t("6 < 18", 44, ROUGE_ERREUR).move_to(P(-0.6, 0.6))
        self.play(FadeIn(comp, scale=1.4), Indicate(e1[0], color=ROUGE_ERREUR), Indicate(e2[0], color=ROUGE_ERREUR),
                  run_time=0.5)
        self.au_mot("pas la même taille")
        self.play(Indicate(e1[2], color=AMBRE, scale_factor=1.5), Indicate(e2[2], color=AMBRE, scale_factor=1.5),
                  run_time=0.8)
        self.au_mot("Je calcule les fréquences")
        g1 = grille100(0, COUL[2], 0.23, 0.03).move_to(P(XG, -0.05))
        g2 = grille100(0, COUL[2], 0.23, 0.03).move_to(P(XD, -0.05))
        self.play(FadeOut(comp), FadeIn(g1), FadeIn(g2), run_time=0.5)
        c1 = self.ligne([("6 ÷ 50", WHITE), ("=", WHITE), ("0,12", WHITE)], 38).move_to(P(XG, -1.75))
        c2 = self.ligne([("18 ÷ 200", WHITE), ("=", WHITE), ("0,09", WHITE)], 38).move_to(P(XD, -1.75))
        p1 = self.t("12 %", 46, VERT_OK).move_to(P(XG, -2.5))
        p2 = self.t("9 %", 46, ORANGE_RETENUE).move_to(P(XD, -2.5))
        self.au_mot("6 divisé par 50")
        self.play(FadeIn(c1[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("égale 0,12")
        self.play(FadeIn(c1[1:]), run_time=0.3)
        self.au_mot("soit 12 %")
        self.play(FadeIn(p1, scale=1.4), colorier(g1, 0, 12, COUL[2], 0.6))
        self.au_mot("18 divisé par 200")
        self.play(FadeIn(c2[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("égale 0,09")
        self.play(FadeIn(c2[1:]), run_time=0.3)
        self.au_mot("soit 9 %")
        self.play(FadeIn(p2, scale=1.4), colorier(g2, 0, 9, COUL[2], 0.5))
        self.au_mot("plus fréquent au lycée")
        v = self.ligne([("12 %", VERT_OK), (">", WHITE), ("9 %", ORANGE_RETENUE)], 44).move_to(P(-0.6, -3.3))
        self.play(FadeIn(v, scale=0.7), Circumscribe(VGroup(ly, g1, p1), color=VERT_OK), run_time=0.8)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def barres_defi(self):
        return Barres(GROUPES, DEFI, pas=2, sous_pas=1, couleurs=COUL, nom_axe="Donneurs", titre="Petite collecte",
                      largeur=4.4, hauteur=3.4, fs=30, centre=P(-3.4, -0.35))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        g = self.barres_defi()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), FadeIn(g.fond), run_time=0.6)
        self.au_mot("Groupe A : 11")
        vals = VGroup()
        for i, mot in enumerate(["Groupe A : 11", "Groupe O : 10", "Groupe B : 3", "Groupe AB : 1"]):
            self.au_mot(mot)
            v = g.valeur(i, fs=32)
            vals.add(v)
            self.play(g.pousser(i, run_time=0.35), FadeIn(v, scale=1.6, run_time=0.35), run_time=0.35)
        self.au_mot("Quelle est la fréquence")
        q = self.col(self.bloc(["Fréquence de A :", "en décimal ?", "en pourcentage ?"], 42), 1.0)
        self.play(FadeIn(q[0], shift=RIGHT * 0.2), g.focus(0, 0.35), run_time=0.5)
        self.au_mot("en nombre décimal")
        self.play(FadeIn(q[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("en pourcentage")
        self.play(FadeIn(q[2], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE), -1.2)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        g = self.barres_defi()
        vals = VGroup(*[g.valeur(i, fs=32) for i in range(4)])
        self.add(g, vals)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("l'effectif total")
        et = self.col(self.t("1. L'effectif total", 38, AMBRE), 1.7)
        self.play(FadeIn(et, shift=RIGHT * 0.2), run_time=0.4)
        somme = self.col(self.ligne([("11", WHITE), ("+", WHITE), ("10", WHITE), ("+", WHITE), ("3", WHITE),
                                     ("+", WHITE), ("1", WHITE)], 46, 0.14), 0.9)
        for k, mot in enumerate(["11 plus", "10 plus", "3 plus", "1, égale"]):
            self.au_mot(mot)
            morceaux = [somme[2 * k]] + ([somme[2 * k - 1]] if k else [])
            self.play(*[FadeIn(m, scale=1.5) for m in morceaux], Indicate(vals[k], color=AMBRE), run_time=0.25)
        self.au_mot("25. Puis")
        t25 = self.ligne([("=", WHITE), ("25", AMBRE)], 46).next_to(somme, RIGHT, buff=0.2)
        self.play(FadeIn(t25, scale=1.4), run_time=0.35)
        self.au_mot("11 divisé par 25")
        d = self.col(self.ligne([("2.", AMBRE), ("11", COUL[0]), ("÷", WHITE), ("25", AMBRE)], 50), -0.3)
        self.play(FadeIn(d, shift=RIGHT * 0.2), g.focus(0, 0.35), run_time=0.45)
        self.au_mot("égale 0,44")
        r = self.ligne([("=", WHITE), ("0,44", VERT_OK)], 50).next_to(d, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=1.4), run_time=0.35)
        self.au_mot("soit 44 %")
        pc = self.col(self.ligne([("soit", WHITE), ("44 %", VERT_OK)], 54), -1.3)
        self.play(FadeIn(pc, scale=0.7), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(d, r, pc))), run_time=0.4)
        self.au_mot("Sans le total")
        regle = self.col(self.bloc(["Sans le total,", "pas de fréquence !"], 38, VERT_OK), -2.35)
        self.play(FadeIn(regle, shift=UP * 0.2), run_time=0.45)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        gr = grille100(41, COUL[1], 0.22, 0.03).move_to(P(-5.0, -0.2))
        self.add(gr)
        self.XL = -2.4
        lignes = self.finale([("Fréquence =", "effectif ÷ effectif total."),
                              ("Entre 0 et 1,", "ou entre 0 et 100 %."),
                              ("Groupes de tailles différentes :", "je compare les fréquences.")], [1.7, 0.1, -1.5],
                             fs=38)
        self.au_mot("La fréquence, c'est")
        self.montrer_ligne(lignes[0])
        self.au_mot("Elle est entre 0 et 1")
        self.montrer_ligne(lignes[1], Circumscribe(gr, color=AMBRE))
        self.au_mot("Et pour comparer")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_calcul()
        self.ecran_pourcent()
        self.ecran_france()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
