# stats_moyenne.py
# EleveAI — Maths 5e — série « Statistiques » (cycle 4), épisode 07 : CALCULER
# ET INTERPRÉTER UNE MOYENNE SIMPLE (micro du coach stat_moyenne, notion
# stat_statistique ; banque genMoyenne : somme ÷ nombre de valeurs, moyenne non
# entière ; genValeurManquante : la valeur à ajouter pour atteindre une
# moyenne). AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : stats_moyenne_short.py (jaune).
#
# ⭐ Décor et métier : le FOOTBALL (demande de Frédéric, 21/10 : des joueurs
# que les élèves adorent) ; une ANALYSTE DE DONNÉES d'un club étudie les
# buteurs. Données RÉELLES et VÉRIFIÉES (recherche web du 21/10/2026) :
# buts de Kylian Mbappé avec l'équipe de France en phase finale des grands
# tournois — Coupe du monde 2018 : 4 ; Euro 2020 (joué en 2021) : 0 (4 matchs,
# Maxifoot) ; Coupe du monde 2022 : 8 (meilleur buteur ; 1 contre l'Australie,
# 2 contre le Danemark, 2 contre la Pologne, 3 en finale — QNA, Europe 1) ;
# Euro 2024 : 1 (penalty contre la Pologne — Record/Lusa, Soccerway). 12 buts
# en Coupe du monde au total (4 + 8), cohérent.
# Calculs (Python) : 4 + 0 + 8 + 1 = 13 ; 13 ÷ 4 = 3,25 ; défi : 4 × 5 = 20,
# 20 − 13 = 7 (cinquième tournoi IMAGINAIRE, dit « imagine »).
# Le piège du statisticien : oublier la valeur 0 (diviser par 3) ; une moyenne
# n'est pas forcément une des valeurs.
# ⭐ Figure du coach : `stat_graph` barres (canvas_stats.Barres), la moyenne en
# pointillé ; « égaliser les barres » se VOIT (le partage égal).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 l'analyste · 02 les données · 03 la somme · 04 diviser
# · 05 le sens (égaliser) · 06 le piège (le 0 compte) · 07 défi · 07b correction
# · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/5e-stats-moyenne.json (débit −10) ; calage :
# manim/scripts/5e/stats5_moyenne_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_moyenne.py StatsMoyenne5e -o eleveai-maths-5e-stats-moyenne --media_dir manim/scripts/5e/media-moyenne
# Sortie : manim/sorties/5e/maths/statistiques/07-moyenne/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_lire_tableau import personne  # noqa: E402

TOURNOIS = ["2018", "2020", "2022", "2024"]
BUTS = [4, 0, 8, 1]
COUL = ["#93c5fd", "#c4b5fd", "#93c5fd", "#c4b5fd"]
MOY = sum(BUTS) / len(BUTS)
assert sum(BUTS) == 13 and MOY == 3.25 and 4 * 5 - 13 == 7


def ballon(r=0.5):
    """Un ballon de football : disque blanc, pentagone noir et coutures."""
    d = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#0f172a", stroke_width=3)
    pent = RegularPolygon(5, radius=r * 0.36, fill_color="#0f172a", fill_opacity=1, stroke_width=0).rotate(PI / 10)
    coutures = VGroup(*[Line(pent.get_vertices()[k], pent.get_vertices()[k] * 2.6, stroke_color="#0f172a",
                             stroke_width=3) for k in range(5)])
    return VGroup(d, coutures, pent)


def drapeau(h=0.6):
    return VGroup(*[Rectangle(width=h * 0.5, height=h, fill_color=c, fill_opacity=1, stroke_width=0)
                    for c in ("#1d4ed8", WHITE, "#dc2626")]).arrange(RIGHT, buff=0)


class StatsMoyenneBase(Paysage5):
    nom_voix = "5e-stats-moyenne"
    fichier_marques = "stats5_moyenne_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
    XL = 0.95
    G = P(-3.3, -0.4)

    def graphe(self, centre=None, n=4, valeurs=None):
        cats = TOURNOIS + (["5e"] if n == 5 else [])
        vals = (valeurs or BUTS + ([7] if n == 5 else []))
        couls = COUL + (["#fcd34d"] if n == 5 else [])
        return Barres(cats, vals, pas=2, sous_pas=1, maxi=8, couleurs=couls, nom_axe="Buts",
                      titre="Buts de Mbappé, grands tournois", largeur=5.0, hauteur=3.8, fs=28,
                      centre=self.G if centre is None else centre)

    def ligne_moy(self, g, v, couleur=AMBRE, label=None):
        """La moyenne en pointillé à travers le graphique (et son étiquette)."""
        y = g.y_axe(v)[1]
        x0, x1 = g.axe_x.get_start()[0], g.axe_x.get_end()[0]
        l = DashedLine(P(x0, y), P(x1, y), color=couleur, stroke_width=6, dash_length=0.15).set_z_index(3)
        if label is None:
            return l
        t = texte(label, 26, couleur).set_stroke(WHITE, 5, background=True).next_to(l, UP, buff=0.05)
        t.align_to(l, RIGHT).set_z_index(4)
        return VGroup(l, t)

    def valeurs(self, g):
        return VGroup(*[g.valeur(i, fs=28) for i in range(g.n)])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La moyenne", self.identite, self.ceinture)
        self.add(titre, ident, ech)
        g = Barres(["", "", "", ""], BUTS, pas=2, maxi=8, couleurs=COUL, largeur=3.4, hauteur=2.2, fs=22,
                   centre=P(-0.6, 0.15))
        self.play(FadeIn(g.fond, scale=0.9), g.pousser(run_time=0.7), run_time=0.7)
        self.au_mot("comment la calculer")
        lm = self.ligne_moy(g, MOY)
        self.play(Create(lm), run_time=0.6)
        self.au_mot("que veut-elle dire")
        q = self.t("?", 90, ORANGE_RETENUE).next_to(g, RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'analyste ─────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Une analyste de données")
        pers = personne(peau="#c68642", haut="#16a34a", cheveux="#111827", r=0.5).move_to(P(-4.4, -0.3))
        met = self.metier("Analyste de données", fs=40).next_to(pers, UP, buff=0.45).set_x(-3.7)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(met, scale=0.8), run_time=0.6)
        self.au_mot("un club de football")
        b = ballon(0.55).move_to(P(-1.6, -1.6))
        self.play(FadeIn(b, shift=LEFT * 1.5), run_time=0.5)
        self.play(Rotate(b, -PI), run_time=0.5)
        self.au_mot("Elle étudie les buteurs")
        ecran = RoundedRectangle(width=3.0, height=2.0, corner_radius=0.12, fill_color="#0b1220", fill_opacity=1,
                                 stroke_color="#38bdf8", stroke_width=4).move_to(P(1.3, 1.9))
        mini = Barres(["", "", "", ""], BUTS, pas=2, maxi=8, couleurs=COUL, largeur=1.8, hauteur=1.0, fs=14,
                      centre=ecran.get_center())
        self.play(FadeIn(ecran), FadeIn(mini.fond), mini.pousser(run_time=0.6), run_time=0.7)
        self.au_mot("Kylian Mbappé")
        nom = self.t("Kylian Mbappé", 54, JAUNE_TITRE).move_to(P(3.7, 0.5))
        self.play(Write(nom), run_time=0.7)
        self.au_mot("avec l'équipe de France")
        eq = VGroup(drapeau(0.55), self.t("Équipe de France", 40)).arrange(RIGHT, buff=0.3).next_to(nom, DOWN, buff=0.45)
        self.play(FadeIn(eq, shift=UP * 0.2), run_time=0.5)
        self.au_mot("dans les grands tournois")
        tr = self.t("grands tournois", 40, BLEU_CALCUL).next_to(eq, DOWN, buff=0.4)
        coupe = VGroup(Polygon(P(-0.3, 0.4), P(0.3, 0.4), P(0.15, -0.05), P(-0.15, -0.05), fill_color="#facc15",
                               fill_opacity=1, stroke_width=0),
                       Rectangle(width=0.1, height=0.25, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(
                           P(0, -0.17)),
                       Rectangle(width=0.36, height=0.1, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(
                           P(0, -0.33))).next_to(tr, RIGHT, buff=0.3)
        self.play(FadeIn(tr, shift=UP * 0.2), GrowFromCenter(coupe), run_time=0.5)
        self.attendre_voix()

    # ── 02 : les données ────────────────────────────────────────────────────

    def ecran_donnees(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-donnees")
        g = self.graphe()
        vals = self.valeurs(g)
        base = VGroup(g.carte, g.titre, g.nom_axe, g.grille, g.axe_x, g.axe_y, *g.traits.values(),
                      *g.nombres.values())
        self.play(FadeIn(base, scale=0.95), run_time=0.4)
        lignes = VGroup()
        for i, (m1, m2, y) in enumerate([("Coupe du monde 2018", "4 buts", 2.2), ("Euro 2020", "0 but", 1.3),
                                         ("Coupe du monde 2022", "8 buts", 0.4), ("Euro 2024", "1 but", -0.5)]):
            self.au_mot(m1)
            lg = self.col(self.ligne([(m1.replace("Coupe du monde", "Coupe du monde") + " :", WHITE),
                                      (m2, VERT_OK)], 36), y)
            self.play(FadeIn(g.etiquettes[i], shift=UP * 0.2), FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.35)
            self.au_mot(m2)
            self.play(g.pousser(i, run_time=0.4), FadeIn(lg[1], scale=1.4), FadeIn(vals[i], scale=1.5), run_time=0.4)
            lignes.add(lg)
        self.play(Indicate(vals[2], color=AMBRE, scale_factor=1.5), run_time=0.5)
        self.attendre_voix()

    def graphe_pret(self, avec_valeurs=True):
        g = self.graphe()
        self.add(g)
        v = self.valeurs(g)
        if avec_valeurs:
            self.add(v)
        return g, v

    # ── 03 : la somme ───────────────────────────────────────────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-somme")
        g, vals = self.graphe_pret()
        self.au_mot("j'additionne toutes les valeurs")
        e = self.col(self.t("1. J'additionne", 44, JAUNE_TITRE), 2.2)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.4)
        somme = self.ligne([("4", WHITE), ("+", WHITE), ("0", WHITE), ("+", WHITE), ("8", WHITE), ("+", WHITE),
                            ("1", WHITE)], 54, 0.2)
        self.col(somme, 1.0)
        idx = self.positions("les valeurs :", 5)
        for i in range(4):
            self.au_pos(idx[i])
            morceaux = [somme[2 * i]] + ([somme[2 * i - 1]] if i else [])
            self.play(*[FadeIn(m, scale=1.4) for m in morceaux], Indicate(vals[i], color=AMBRE, scale_factor=1.6),
                      run_time=0.3)
        self.au_pos(idx[4])
        tot = self.col(self.ligne([("=", WHITE), ("13", VERT_OK), ("buts", WHITE)], 54, 0.25), -0.1)
        self.play(FadeIn(tot, shift=UP * 0.2), run_time=0.4)
        self.insister(tot[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 04 : diviser ────────────────────────────────────────────────────────

    def ecran_diviser(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-diviser")
        g, vals = self.graphe_pret()
        self.au_mot("je divise par le nombre de valeurs")
        e = self.col(self.t("2. Je divise", 44, JAUNE_TITRE), 2.2)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("4 tournois")
        nb = self.col(self.ligne([("4", BLEU_CALCUL), ("tournois", WHITE)], 42), 1.4)
        self.play(FadeIn(nb, shift=RIGHT * 0.2), LaggedStart(*[Indicate(t, color=BLEU_CALCUL) for t in g.etiquettes],
                                                              lag_ratio=0.2), run_time=0.8)
        c = self.ligne([("13", VERT_OK), ("÷", WHITE), ("4", BLEU_CALCUL), ("=", WHITE), ("3,25", AMBRE)], 54, 0.22)
        self.col(c, 0.35)
        self.au_mot("13 divisé par 4")
        self.play(FadeIn(c[:3], scale=1.3), run_time=0.4)
        self.au_mot("égale 3,25")
        lm = self.ligne_moy(g, MOY, label="moyenne")
        self.play(FadeIn(c[3:], scale=1.4), Create(lm), run_time=0.6)
        self.insister(c[4], 1.4, 0.25)
        self.au_mot("En moyenne")
        en = self.col(self.bloc(["En moyenne :", "3,25 buts par tournoi"], 40, AMBRE), -0.85)
        en[0].set_color(WHITE)
        self.play(FadeIn(en, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : le sens (égaliser les barres) ──────────────────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sens")
        g, vals = self.graphe_pret(avec_valeurs=False)
        self.au_mot("Que veut dire 3,25")
        q = self.col(self.ligne([("3,25", AMBRE), ("?", ORANGE_RETENUE)], 54), 2.2)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.au_mot("Si on partageait les 13 buts")
        e = self.col(self.bloc(["Je partage les 13 buts", "de façon égale :"], 38), 1.1)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("entre les 4 tournois")
        egales = VGroup()
        for i, b in enumerate(g.barres):
            h = g.y_axe(MOY)[1] - g.y_axe(0)[1]
            r = RoundedRectangle(width=b.width, height=h, corner_radius=0.07, fill_color=COUL[i], fill_opacity=1,
                                 stroke_color="#334155", stroke_width=3).move_to(g.base(i), aligned_edge=DOWN)
            egales.add(r)
        anciennes = g.barres.copy()
        self.play(*[Transform(g.barres[i], egales[i]) for i in range(4)], run_time=1.6)
        self.au_mot("chacun en aurait 3,25")
        lm = self.ligne_moy(g, MOY, label="3,25")
        ch = self.col(self.t("chacun : 3,25", 42, AMBRE), 0.0)
        self.play(Create(lm), FadeIn(ch, scale=0.8), run_time=0.5)
        self.au_mot("On égalise les barres")
        eg = self.col(self.t("On égalise les barres !", 40, VERT_OK), -1.0)
        self.play(FadeIn(eg, shift=UP * 0.2), run_time=0.4)
        self.play(*[Transform(g.barres[i], anciennes[i]) for i in range(4)], run_time=1.0)
        self.play(*[Transform(g.barres[i], egales[i]) for i in range(4)], run_time=1.0)
        self.attendre_voix()

    # ── 06 : le piège (le 0 compte) ─────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        g, vals = self.graphe_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.4)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("oublier le 0")
        e1 = self.col(self.t("oublier le 0", 42, ORANGE_RETENUE), 1.55)
        cercle = Circle(radius=0.45, stroke_color=ORANGE_RETENUE, stroke_width=6).move_to(vals[1].get_center() + DOWN * 0.1)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), Create(cercle), Indicate(g.etiquettes[1], color=ORANGE_RETENUE),
                  run_time=0.6)
        self.au_mot("L'Euro 2020 compte aussi")
        e2 = self.col(self.ligne([("Euro 2020", WHITE), ("compte aussi !", VERT_OK)], 38), 0.75)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("on diviserait par 3")
        e3 = self.col(self.ligne([("÷ 3", ROUGE_ERREUR), ("faux,", WHITE), ("÷ 4", VERT_OK), ("juste", WHITE)], 42), -0.05)
        self.play(FadeIn(e3[:2], shift=RIGHT * 0.2), run_time=0.4)
        x = croix(e3[0], sw=5)
        self.au_mot("la moyenne serait fausse")
        self.play(Create(x), FadeIn(e3[2:], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("personne n'a marqué 3,25")
        lm = self.ligne_moy(g, MOY, label="3,25")
        e4 = self.col(self.bloc(["3,25 : le score", "d'aucun tournoi"], 38, AMBRE), -1.0)
        self.play(Create(lm), FadeIn(e4, shift=UP * 0.2), run_time=0.6)
        self.au_mot("pas forcément une des valeurs")
        e5 = self.col(self.bloc(["une moyenne n'est pas", "forcément une valeur"], 34, JAUNE_TITRE), -2.1)
        self.play(FadeIn(e5, shift=UP * 0.2), LaggedStart(*[Indicate(v) for v in vals], lag_ratio=0.2), run_time=0.8)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def graphe5(self):
        g = Barres(TOURNOIS + ["5e"], BUTS + [7], pas=2, sous_pas=1, maxi=8, couleurs=COUL + ["#fcd34d"],
                   nom_axe="Buts", titre="Buts de Mbappé, grands tournois", largeur=5.4, hauteur=3.8, fs=26,
                   centre=self.G)
        return g

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        g = self.graphe5()
        self.add(g.fond, *g.barres[:4], *[g.valeur(i, fs=26) for i in range(4)])
        g.etiquettes[4].set_opacity(0)
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Imagine un cinquième tournoi")
        qm = self.t("?", 70, ORANGE_RETENUE).move_to(g.base(4) + UP * 0.6)
        self.play(g.etiquettes[4].animate.set_opacity(1), FadeIn(qm, scale=1.5), run_time=0.5)
        self.au_mot("Combien de buts")
        q = self.col(self.bloc(["Combien de buts au", "5e tournoi pour une", "moyenne de 4 sur 5 ?"], 36), 1.0)
        self.play(FadeIn(q[:2], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("une moyenne de 4")
        lm = self.ligne_moy(g, 4, VERT_OK, "moyenne 4 ?")
        self.play(Create(lm), FadeIn(q[2], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE), -0.7)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        g = self.graphe5()
        self.add(g.fond, *g.barres[:4], *[g.valeur(i, fs=26) for i in range(4)])
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Une moyenne de 4 sur 5")
        c1 = self.ligne([("4", VERT_OK), ("×", WHITE), ("5", BLEU_CALCUL), ("=", WHITE), ("20", WHITE), ("buts", WHITE)],
                        48, 0.2)
        self.col(c1, 1.5)
        lm = self.ligne_moy(g, 4, VERT_OK, "moyenne 4")
        self.play(Create(lm), run_time=0.4)
        self.au_mot("4 fois 5")
        self.play(FadeIn(c1[:3], scale=1.3), run_time=0.35)
        self.au_mot("égale 20 buts")
        self.play(FadeIn(c1[3:], scale=1.3), run_time=0.35)
        self.au_mot("Il en a déjà 13")
        deja = self.col(self.ligne([("déjà :", WHITE), ("13", WHITE)], 42), 0.65)
        self.play(FadeIn(deja, shift=RIGHT * 0.2), LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.05)
                                                                 for b in g.barres[:4]], lag_ratio=0.15), run_time=0.7)
        c2 = self.ligne([("20", WHITE), ("−", WHITE), ("13", WHITE), ("=", WHITE), ("7", VERT_OK), ("buts", WHITE)],
                        48, 0.2)
        self.col(c2, -0.2)
        self.au_mot("20 moins 13")
        self.play(FadeIn(c2[:3], scale=1.3), run_time=0.35)
        self.au_mot("égale 7 buts")
        v4 = g.valeur(4, fs=26)
        self.play(FadeIn(c2[3:], scale=1.3), g.pousser(4, run_time=0.6), run_time=0.6)
        self.play(FadeIn(v4, scale=1.5), run_time=0.3)
        self.play(Create(self.encadrer(VGroup(c1, c2))), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        g, vals = self.graphe_pret()
        lignes = self.finale([("J'additionne toutes", "les valeurs, même les 0."),
                              ("Je divise par le", "nombre de valeurs."),
                              ("La moyenne : le partage", "égal du total.")], [1.75, 0.15, -1.45])
        self.au_mot("J'additionne")
        self.montrer_ligne(lignes[0], Indicate(vals[1], color=AMBRE, scale_factor=1.8))
        self.au_mot("Je divise")
        self.montrer_ligne(lignes[1], LaggedStart(*[Indicate(t, color=BLEU_CALCUL) for t in g.etiquettes],
                                                  lag_ratio=0.15))
        self.au_mot("La moyenne, c'est")
        self.montrer_ligne(lignes[2], Create(self.ligne_moy(g, MOY, label="3,25")))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_somme()
        self.ecran_diviser()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsMoyenne5e(StatsMoyenneBase):
    identite = "Maths 5e — EleveAI"
