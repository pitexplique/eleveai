# stats_effectif_frequence.py
# EleveAI — Maths 5e — série « Statistiques » (cycle 4), épisode 04 : CALCULER
# UN EFFECTIF OU UNE FRÉQUENCE (micro du coach stat_effectif_frequence, notion
# stat_statistique ; banque genFrequence : fréquence = effectif ÷ effectif total
# en nombre décimal ou en pourcentage, effectif = fréquence × effectif total ;
# « une fréquence vaut toujours entre 0 et 1 »). AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE (le calcul du niveau 5e, méthode + piège + défi).
# Short jumeau : stats_effectif_frequence_short.py (jaune, un cran plus bas).
#
# ⭐ Décor et métier : le DESIGN INDUSTRIEL ; une DESIGNER dessine des ciseaux
# pour gauchers et doit savoir combien en fabriquer. Ordre de grandeur RÉEL :
# environ 1 personne sur 10 est gauchère (méta-analyse de 2 396 études,
# Papadatou-Pastou et al., Psychological Bulletin, 2020 : 10,6 %). Les groupes
# sont VRAISEMBLABLES : classe 3 gauchers sur 25 (0,12 = 12 %), club de judo
# 4 sur 40 (0,1 = 10 %) ; défi : 300 × 0,1 = 30 ; 6 ÷ 50 = 0,12 = 12 %.
# Le piège du statisticien : comparer des EFFECTIFS de groupes de tailles
# différentes (4 > 3, mais 10 % < 12 %).
# ⭐ Figures : les élèves dessinés (un rond = un élève), la grille de 100
# (le pourcentage se VOIT), le tableau du coach (`tableau_donnees`) et une
# droite graduée de 0 à 1 (une fréquence est entre 0 et 1).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 la designer · 02 effectifs (3, 25) · 03 fréquence
# (0,12 = 12 %) · 04 comparer (club : 4 sur 40 = 10 %) · 05 le piège · 06 défi ·
# 06b correction · 07 ce que tu as appris · 08 fin.
#
# Voix : manim/voix/5e-stats-effectif-frequence.json (débit −10) ; calage :
# manim/scripts/5e/stats5_effectif_frequence_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_effectif_frequence.py StatsEffectifFrequence5e -o eleveai-maths-5e-stats-effectif-frequence --media_dir manim/scripts/5e/media-effectif-frequence
# Sortie : manim/sorties/5e/maths/statistiques/04-effectif-frequence/
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_effectif_frequence.py StatsEffectifFrequence3e -o eleveai-maths-3e-stats-effectif-frequence --media_dir manim/scripts/5e/media-effectif-frequence-3e
#           manim/sorties/3e/maths/statistiques/03-effectif-frequence/ (3e : ceinture JAUNE, révision)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_lire_tableau import personne  # noqa: E402

GAUCHE = "#f97316"   # les gauchers (orange)
ELEVE = "#64748b"    # les autres élèves (gris ardoise)
assert 3 / 25 == 0.12 and 4 / 40 == 0.1 and 300 * 0.1 == 30 and 6 / 50 == 0.12


def eleve(c=ELEVE, s=0.3):
    """Un élève : une tête et des épaules."""
    tete = Circle(radius=s * 0.32, fill_color=c, fill_opacity=1, stroke_width=0)
    corps = Sector(radius=s * 0.55, start_angle=0, angle=PI, fill_color=c, fill_opacity=1, stroke_width=0)
    corps.next_to(tete, DOWN, buff=s * 0.06)
    return VGroup(tete, corps)


def groupe(n, cols, gauchers, s=0.3, buff=0.12):
    """n élèves en grille ; les indices `gauchers` sont orange (renvoyés gris :
    on les allume au mot)."""
    g = VGroup(*[eleve(ELEVE, s) for _ in range(n)]).arrange_in_grid(cols=cols, buff=buff)
    g.gauchers = list(gauchers)
    return g


def grille100(k, cote=0.26, couleur=GAUCHE):
    """La grille de 100 carrés, dont les k premiers en couleur."""
    g = VGroup(*[Square(side_length=cote, fill_color=couleur if i < k else "#334155", fill_opacity=1,
                        stroke_color="#0f172a", stroke_width=1.5) for i in range(100)])
    return g.arrange_in_grid(10, 10, buff=0.03)


def ciseaux(s=1.0, couleur=GAUCHE):
    """Des ciseaux : deux lames et deux anneaux."""
    l1 = Polygon(P(0, 0), P(1.4, 0.18), P(1.4, 0.05), fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    l2 = l1.copy().flip(RIGHT, about_point=ORIGIN)
    a1 = Circle(radius=0.22, stroke_color=couleur, stroke_width=9).move_to(P(-0.35, 0.28))
    a2 = Circle(radius=0.22, stroke_color=couleur, stroke_width=9).move_to(P(-0.35, -0.28))
    vis = Dot(P(0, 0), radius=0.05, color="#475569")
    return VGroup(l1, l2, a1, a2, vis).scale(s)


class StatsEffectifFrequenceBase(Paysage5):
    nom_voix = "5e-stats-effectif-frequence"
    fichier_marques = "stats5_effectif_frequence_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
    XL = 0.9
    GX = -3.4

    def classe(self):
        return groupe(25, 5, [3, 11, 22], 0.42, 0.16).move_to(P(self.GX, 0.0))

    def club(self):
        return groupe(40, 8, [5, 14, 26, 35], 0.36, 0.12).move_to(P(self.GX, 0.0))

    def allumer_gauchers(self, g):
        return [g[i].animate.set_color(GAUCHE).scale(1.15) for i in g.gauchers]

    def colorer(self, g):
        for i in g.gauchers:
            g[i].set_color(GAUCHE).scale(1.15)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Effectif et fréquence", self.identite, self.ceinture)
        self.add(titre, ident, ech)
        a = groupe(25, 5, [3, 11, 22], 0.24, 0.08).move_to(P(-2.6, 0.1))
        b = groupe(40, 8, [5, 14, 26, 35], 0.24, 0.08).move_to(P(1.3, 0.1))
        self.add(a, b)
        self.au_mot("Effectif ou fréquence")
        self.play(*self.allumer_gauchers(a), *self.allumer_gauchers(b), run_time=0.5)
        self.au_mot("comparer deux groupes")
        q = self.t("?", 80, ORANGE_RETENUE).move_to(P(-0.55, 0.1))
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la designer ────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Une designer industrielle")
        pers = personne(peau="#8d5524", haut="#be185d", cheveux="#111827", r=0.5).move_to(P(-3.6, -0.2))
        met = self.metier("Designer industrielle", fs=42).next_to(pers, UP, buff=0.45)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(met, scale=0.8), run_time=0.6)
        self.au_mot("des ciseaux pour gauchers")
        cs = ciseaux(1.3).move_to(P(1.6, 1.0))
        g = self.t("pour gauchers", 40, GAUCHE).next_to(cs, DOWN, buff=0.4)
        self.play(DrawBorderThenFill(cs), run_time=0.8)
        self.play(cs.animate.flip(UP), FadeIn(g, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Combien faut-il en fabriquer")
        q = self.t("Combien en fabriquer ?", 40).move_to(P(2.6, -1.0))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.au_mot("quelle part des élèves")
        p = self.ligne([("Quelle", WHITE), ("part", JAUNE_TITRE), ("des élèves ?", WHITE)], 40).move_to(P(2.6, -1.9))
        self.play(FadeIn(p, shift=UP * 0.2), run_time=0.4)
        self.insister(p[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 02 : les effectifs ──────────────────────────────────────────────────

    def ecran_effectif(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-effectif")
        cl = self.classe()
        self.play(LaggedStart(*[FadeIn(e, scale=0.5) for e in cl], lag_ratio=0.03), run_time=0.8)
        self.au_mot("25 élèves")
        t25 = self.col(self.ligne([("Classe :", WHITE), ("25", BLEU_CALCUL), ("élèves", WHITE)], 44), 2.2)
        self.play(FadeIn(t25, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("3 sont gauchers")
        t3 = self.col(self.ligne([("3", GAUCHE), ("gauchers", WHITE)], 44), 1.4)
        self.play(*self.allumer_gauchers(cl), FadeIn(t3), run_time=0.5)
        self.au_mot("3, c'est l'effectif")
        e1 = self.col(self.ligne([("3", GAUCHE), ("= l'effectif des gauchers", WHITE)], 40), 0.1)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), *[Indicate(cl[i], color=GAUCHE) for i in cl.gauchers], run_time=0.6)
        self.au_mot("25, c'est l'effectif total")
        e2 = self.col(self.ligne([("25", BLEU_CALCUL), ("= l'effectif total", WHITE)], 40), -0.8)
        cadre = SurroundingRectangle(cl, color=BLEU_CALCUL, buff=0.15, corner_radius=0.15)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), Create(cadre), run_time=0.6)
        self.attendre_voix()

    # ── 03 : la fréquence ───────────────────────────────────────────────────

    def ecran_frequence(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-frequence")
        cl = self.colorer(self.classe())
        self.add(cl)
        self.au_mot("La fréquence")
        f = self.col(self.t("fréquence =", 44, JAUNE_TITRE), 2.45)
        frac = VGroup(self.t("effectif", 38, GAUCHE), Line(LEFT * 1.4, RIGHT * 1.4, stroke_width=4),
                      self.t("effectif total", 38, BLEU_CALCUL)).arrange(DOWN, buff=0.12)
        self.play(FadeIn(f, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("l'effectif divisé")
        div = self.ligne([("effectif", GAUCHE), ("÷", WHITE), ("effectif total", BLEU_CALCUL)], 38)
        self.col(div, 1.7)
        self.play(FadeIn(div, shift=RIGHT * 0.2), run_time=0.5)
        calc = self.ligne([("3", GAUCHE), ("÷", WHITE), ("25", BLEU_CALCUL), ("=", WHITE), ("0,12", VERT_OK)], 52, 0.22)
        self.col(calc, 0.55)
        self.au_mot("3 divisé par")
        self.play(FadeIn(calc[:2], scale=1.3), *[Indicate(cl[i], color=GAUCHE) for i in cl.gauchers], run_time=0.4)
        self.au_mot("25, égale")
        self.play(FadeIn(calc[2:4], scale=1.3), run_time=0.35)
        self.au_mot("0,12. En")
        self.play(FadeIn(calc[4], scale=1.6), run_time=0.4)
        self.insister(calc[4], 1.3, 0.25)
        self.au_mot("En pourcentage")
        g100 = grille100(12, 0.3).move_to(P(self.GX, -0.1))
        self.play(FadeTransform(cl, g100), run_time=1.0)
        self.au_mot("c'est 12 %")
        pc = self.col(self.ligne([("0,12", VERT_OK), ("=", WHITE), ("12 %", VERT_OK)], 52, 0.22), -0.65)
        self.play(FadeIn(pc, scale=0.8), LaggedStart(*[Indicate(c, color=WHITE) for c in g100[:12]], lag_ratio=0.05),
                  run_time=0.8)
        sous = self.col(self.t("12 sur 100", 36, GAUCHE), -1.5)
        self.play(FadeIn(sous, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 04 : comparer avec le club ──────────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-comparer")
        cb = self.club()
        self.au_mot("Dans le club de judo")
        t = self.col(self.t("Club de judo", 44, JAUNE_TITRE), 2.45)
        self.play(FadeIn(t, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(e, scale=0.5) for e in cb], lag_ratio=0.02),
                  run_time=0.9)
        self.au_mot("4 gauchers sur 40")
        t1 = self.col(self.ligne([("4", GAUCHE), ("gauchers sur", WHITE), ("40", BLEU_CALCUL)], 42), 1.65)
        self.play(FadeIn(t1), run_time=0.4)
        self.play(*self.allumer_gauchers(cb), run_time=0.4)
        self.au_mot("4, c'est plus que 3")
        t2 = self.col(self.ligne([("4", GAUCHE), (">", WHITE), ("3", GAUCHE), ("... plus de gauchers ?", WHITE)], 40), 0.85)
        self.play(FadeIn(t2, shift=RIGHT * 0.2), run_time=0.5)
        calc = self.ligne([("4", GAUCHE), ("÷", WHITE), ("40", BLEU_CALCUL), ("=", WHITE), ("0,1", VERT_OK)], 50, 0.22)
        self.col(calc, -0.05)
        self.au_mot("Mais 4 divisé par")
        self.play(FadeIn(calc[:2], scale=1.3), run_time=0.35)
        self.au_mot("40, égale")
        self.play(FadeIn(calc[2:4], scale=1.3), run_time=0.35)
        self.au_mot("0,1, soit")
        self.play(FadeIn(calc[4], scale=1.6), run_time=0.35)
        self.au_mot("soit 10 %")
        g100 = grille100(10, 0.27).move_to(P(self.GX, -0.1))
        pc = self.col(self.ligne([("=", WHITE), ("10 %", VERT_OK)], 50, 0.22), -0.85)
        self.play(FadeTransform(cb, g100), FadeIn(pc, scale=0.8), run_time=0.9)
        self.au_mot("il y en a moins")
        m = self.col(self.bloc(["En proportion :", "moins qu'en classe !"], 40, ORANGE_RETENUE), -2.0)
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.4)
        self.insister(m, 1.08, 0.3)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def tableau_cmp(self, freq=True):
        tab = Tableau(["Classe", "Club"], [[3, 4], [25, 40], ["12 %" if freq else None, "10 %" if freq else None]],
                      libelles=["Gauchers", "Effectif total", "Fréquence"], coin="", largeur_case=1.8,
                      largeur_libelle=3.0, hauteur=0.9, fs=32, centre=P(-3.3, 0.9))
        return textes_devant(tab)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        tab = self.tableau_cmp()
        self.add(tab)
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.45)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("comparer les effectifs")
        e1 = self.col(self.bloc(["comparer les effectifs", "de groupes de tailles", "différentes"], 38,
                                ORANGE_RETENUE), 1.3)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), *teinter_ligne(tab, 0, "#fecaca"), run_time=0.5)
        self.play(Circumscribe(VGroup(*tab.cases[1]), color=ROUGE_ERREUR), run_time=0.7)
        self.au_mot("je compare les fréquences")
        e2 = self.col(self.bloc(["je compare", "les fréquences :"], 40, VERT_OK), -0.3)
        self.play(*eteindre(tab), run_time=0.2)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), *teinter_ligne(tab, 2, "#bbf7d0"), run_time=0.5)
        self.au_mot("12 % contre 10 %")
        e3 = self.col(self.ligne([("12 %", VERT_OK), (">", WHITE), ("10 %", VERT_OK)], 46), -1.3)
        self.play(FadeIn(e3, scale=0.8), *allumer(tab, 2, 0), run_time=0.45)
        self.au_mot("toujours comprise entre 0 et 1")
        y = -2.35
        axe = NumberLine(x_range=[0, 1, 0.1], length=6.0, include_numbers=False, color=WHITE).move_to(P(-3.3, y))
        n0 = self.t("0", 38).next_to(axe.n2p(0), DOWN, buff=0.2)
        n1 = self.t("1", 38).next_to(axe.n2p(1), DOWN, buff=0.2)
        p1 = Dot(axe.n2p(0.1), radius=0.12, color=BLEU_CALCUL)
        p2 = Dot(axe.n2p(0.12), radius=0.12, color=GAUCHE)
        zone = Line(axe.n2p(0), axe.n2p(1), stroke_color=VERT_OK, stroke_width=12, stroke_opacity=0.5)
        self.play(Create(axe), FadeIn(n0), FadeIn(n1), run_time=0.5)
        self.play(Create(zone), FadeIn(p1, scale=2), FadeIn(p2, scale=2), run_time=0.6)
        e4 = self.col(self.bloc(["fréquence :", "entre 0 et 1"], 38, JAUNE_TITRE), -2.2)
        self.play(FadeIn(e4, shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def tableau_defi(self):
        tab = Tableau(["Collège", "Groupe"], [["?", 6], [None, None], [None, "?"]],
                      libelles=["Gauchers", "Effectif total", "Fréquence"], coin="", largeur_case=1.8,
                      largeur_libelle=3.0, hauteur=0.9, fs=32, centre=P(-3.3, 0.5))
        return textes_devant(tab)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        tab = self.tableau_defi()
        for c in tab.cases[0] + tab.cases[2]:
            c[1].set_opacity(0)
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), FadeIn(tab, shift=UP * 0.2), run_time=0.6)
        self.au_mot("300 élèves")
        self.play(remplir(tab, 1, 0, 300), run_time=0.35)
        self.au_mot("est 0,1")
        self.play(remplir(tab, 2, 0, "0,1"), run_time=0.35)
        self.au_mot("Combien de paires")
        q1 = self.col(self.bloc(["1. Combien de paires", "de ciseaux ?"], 40), 1.25)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), tab.texte_case(0, 0).animate.set_opacity(1), run_time=0.5)
        self.au_mot("6 gauchers")
        self.play(tab.texte_case(0, 1).animate.set_opacity(1), run_time=0.3)
        self.au_mot("50 élèves")
        self.play(remplir(tab, 1, 1, 50), tab.texte_case(2, 1).animate.set_opacity(1), run_time=0.35)
        q2 = self.col(self.bloc(["2. Fréquence de", "6 gauchers sur 50 ?"], 40), -0.15)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE), -1.5)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        tab = self.tableau_defi()
        self.add(tab)
        tab.remplir(1, 0, 300), tab.remplir(2, 0, "0,1"), tab.remplir(1, 1, 50)
        textes_devant(tab)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.5)
        c1 = self.ligne([("300", BLEU_CALCUL), ("×", WHITE), ("0,1", WHITE), ("=", WHITE), ("30", VERT_OK)], 48, 0.2)
        self.col(c1, 1.4)
        self.au_mot("300 fois")
        self.play(FadeIn(c1[:2], scale=1.3), Indicate(tab.texte_case(1, 0), color=AMBRE), run_time=0.35)
        self.au_mot("0,1, égale")
        self.play(FadeIn(c1[2:4], scale=1.3), Indicate(tab.texte_case(2, 0), color=AMBRE), run_time=0.35)
        self.au_mot("30 paires")
        sous = self.col(self.t("paires de ciseaux", 36), 0.7)
        self.play(FadeIn(c1[4], scale=1.6), FadeIn(sous), remplir(tab, 0, 0, 30), *allumer(tab, 0, 0), run_time=0.45)
        c2 = self.ligne([("6", GAUCHE), ("÷", WHITE), ("50", BLEU_CALCUL), ("=", WHITE), ("0,12", VERT_OK)], 48, 0.2)
        self.col(c2, -0.35)
        self.au_mot("6 divisé par")
        self.play(FadeIn(c2[:2], scale=1.3), run_time=0.35)
        self.au_mot("50, égale")
        self.play(FadeIn(c2[2:4], scale=1.3), run_time=0.35)
        self.au_mot("0,12, soit")
        self.play(FadeIn(c2[4], scale=1.6), remplir(tab, 2, 1, "0,12"), *allumer(tab, 2, 1), run_time=0.45)
        self.au_mot("soit 12 %")
        pc = self.col(self.ligne([("soit", WHITE), ("12 %", VERT_OK)], 46), -1.15)
        self.play(FadeIn(pc, scale=0.8), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(c1, c2, pc))), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        tab = self.tableau_cmp()
        self.add(tab)
        lignes = self.finale([("Effectif :", "un nombre d'individus."),
                              ("Fréquence =", "effectif ÷ effectif total", "(décimal ou %)."),
                              ("Pour comparer :", "les fréquences.")], [1.85, 0.2, -1.5], fs=36)
        self.au_mot("L'effectif")
        self.montrer_ligne(lignes[0], *teinter_ligne(tab, 0, "#fed7aa"))
        self.au_mot("La fréquence")
        self.montrer_ligne(lignes[1], *teinter_ligne(tab, 2, "#bbf7d0"))
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[2], *allumer(tab, 2, 0))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_effectif()
        self.ecran_frequence()
        self.ecran_comparer()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class StatsEffectifFrequence5e(StatsEffectifFrequenceBase):
    identite = "Maths 5e — EleveAI"


class StatsEffectifFrequence3e(StatsEffectifFrequenceBase):
    """Même vidéo pour la 3e (révision) : identité et ceinture seulement."""

    identite = "Maths 3e — EleveAI"
    ceinture = "jaune"
