# stats_lire_graphique.py
# EleveAI — Maths 5e ET 4e — série « Statistiques » (cycle 4), épisode COMMUN :
# LIRE ET INTERPRÉTER UN DIAGRAMME (micro du coach stat_lire_graphique ; en 5e
# notion stat_statistique, épisode 03 ; en 4e notion stat_donnee, épisode 02).
# Banques : 5e genLireGraphique (effectif lu, la plus haute / la plus basse,
# total, écart, somme de deux) ; 4e genGrapheLireCat, genGrapheEcart (lire la
# hauteur d'une barre, écart entre deux barres). AVEC VOIX. Paysage 16:9.
# CEINTURES : 5e ORANGE (lire sur un petit trait sans nombre ET calculer total
# et écart) ; 4e JAUNE (la même lecture, révisée un cran plus bas).
# Short jumeau : stats_lire_graphique_short.py (blanche), copié sous les deux noms.
#
# ⭐ Décor et métier : le JEU VIDÉO ; une GAME DESIGNER veut savoir où les
# joueurs abandonnent son jeu de cinq niveaux, pour corriger le niveau trop
# dur. Données VRAISEMBLABLES (un jeu inventé), calculées en Python :
# abandons 35, 20, 75, 15, 5 (niveaux 1 à 5) ; total 150 ; 75 − 35 = 40 ;
# 15 + 5 = 20. Axe gradué de 10 en 10, un PETIT TRAIT = 5 (35, 75, 15 et 5
# tombent sur un petit trait).
# ⭐ La figure est CELLE DU COACH (manim/canvas_stats.py, Barres : carte
# blanche, titre dans la carte, axe gradué, grille légère, barre allumée).
# Le geste de lecture se VOIT : flèche qui monte, pointillé ambre vers l'axe.
# ⛔ PAS D'ÉCART : une valeur ne s'écrit qu'au mot où la voix la dit.
#
# Écrans : 00 garde · 01 la game designer · 02 les axes (petit trait = 5) · 03
# lire (niveau 2 : 20 ; niveau 1 : 35) · 04 la plus haute (75) · 05 le total
# (150) · 06 le piège (un carreau = 10) · 07 défi · 07b correction · 08 ce que
# tu as appris · 09 fin.
#
# Voix : manim/voix/5e-stats-lire-graphique.json (débit −10), sans classe.
# Calage : manim/scripts/5e/stats5_lire_graphique_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_lire_graphique.py StatsLireGraphique5e -o eleveai-maths-5e-stats-lire-graphique --media_dir manim/scripts/5e/media-lire-graphique
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_lire_graphique.py StatsLireGraphique4e -o eleveai-maths-4e-stats-lire-graphique --media_dir manim/scripts/5e/media-lire-graphique-4e
# Sorties : manim/sorties/5e/maths/statistiques/03-lire-graphique/
#           manim/sorties/4e/maths/statistiques/02-lire-graphique/
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_lire_graphique.py StatsLireGraphique3e -o eleveai-maths-3e-stats-lire-graphique --media_dir manim/scripts/5e/media-lire-graphique-3e
#           manim/sorties/3e/maths/statistiques/02-lire-graphique/ (3e : ceinture BLANCHE, révision)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_lire_tableau import personne  # noqa: E402

NIV = ["1", "2", "3", "4", "5"]
ABANDONS = [35, 20, 75, 15, 5]
COUL = ["#93c5fd", "#a7f3d0", "#fca5a5", "#fde68a", "#c4b5fd"]
assert sum(ABANDONS) == 150 and ABANDONS[2] - ABANDONS[0] == 40 and ABANDONS[3] + ABANDONS[4] == 20


def ecran_jeu(largeur=4.4, hauteur=2.8):
    """Un écran de jeu : cadre, ciel violet, cinq plateformes en escalier.
    Renvoie (groupe, plateformes)."""
    cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.15, fill_color="#1e1b4b",
                             fill_opacity=1, stroke_color="#a78bfa", stroke_width=5)
    plats = VGroup()
    for k in range(5):
        p = Rectangle(width=0.62, height=0.16, fill_color=COUL[k], fill_opacity=1, stroke_width=0)
        dx, dy = min(0.82, (largeur - 1.0) / 4), min(0.42, (hauteur - 0.75) / 4)
        p.move_to(cadre.get_corner(DL) + P(0.5 + dx * k, 0.3 + dy * k))
        plats.add(p)
    return VGroup(cadre, plats), plats


def heros(s=0.22):
    """Le petit héros du jeu (pixel)."""
    corps = Square(side_length=s, fill_color="#f97316", fill_opacity=1, stroke_width=0)
    tete = Square(side_length=s * 0.7, fill_color="#fde68a", fill_opacity=1, stroke_width=0).next_to(corps, UP, buff=0)
    return VGroup(corps, tete)


class StatsLireGraphiqueBase(Paysage5):
    nom_voix = "5e-stats-lire-graphique"
    fichier_marques = "stats5_lire_graphique_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "orange"
    G = P(-3.25, -0.4)
    XL = 0.95

    def graphe(self, centre=None, titre=True):
        return Barres(NIV, ABANDONS, pas=10, sous_pas=5, maxi=80, couleurs=COUL, nom_axe="Joueurs",
                      titre="Abandons à chaque niveau" if titre else None, largeur=4.8, hauteur=4.0, fs=30,
                      colonne_lue=True, centre=self.G if centre is None else centre)

    def graphe_pret(self):
        g = self.graphe()
        self.add(g)
        return g

    def lire(self, g, i, y, mots, petit=True):
        """Lire la barre i : allumer, monter, pointillé vers l'axe ; sur un petit
        trait, l'agrandir et dire « entre a et b ». mots = (barre, monter, axe,
        entre, valeur). Renvoie les objets de lecture."""
        v = ABANDONS[i]
        self.au_mot(mots[0])
        fl = g.monter(i)
        self.play(g.focus(i, 0.35), run_time=0.35)
        if mots[1]:
            self.au_mot(mots[1])
        self.play(GrowArrow(fl), run_time=0.45)
        self.au_mot(mots[2])
        tr = g.vers_axe(i, jusqu_au_lu=not petit)
        self.play(Create(tr), run_time=0.5)
        objets = VGroup(fl, tr)
        if petit:
            trait = g.trait(v)
            self.play(trait.animate.scale(2.8).set_color(AMBRE), run_time=0.25)
            self.play(trait.animate.scale(1 / 2.8).set_color(NUIT), run_time=0.25)
            self.au_mot(mots[3])
            bas, haut = v - 5, v + 5
            entre = self.col(self.ligne([("entre", WHITE), (str(bas), WHITE), ("et", WHITE), (str(haut), WHITE)], 40),
                             y)
            self.play(FadeIn(entre, shift=RIGHT * 0.2), Indicate(g.nombre(bas), color=AMBRE, scale_factor=1.5),
                      Indicate(g.nombre(haut), color=AMBRE, scale_factor=1.5), run_time=0.6)
            suite = DashedLine(g.y_axe(v), P(g._x_lu(), g.y_axe(v)[1]), color=AMBRE, stroke_width=6,
                               dash_length=0.14, dashed_ratio=0.6)
            objets.add(suite, entre)
        self.au_mot(mots[4])
        lu = g.lu(v)
        res = self.col(self.ligne([("Niveau " + NIV[i] + " :", WHITE), (str(v), VERT_OK)], 46), y - 0.85)
        anims = [FadeIn(lu, scale=1.6), FadeIn(res, scale=0.8)]
        if petit:
            self.play(Create(objets[2]), run_time=0.25)
        self.play(*anims, run_time=0.4)
        self.insister(res[1], 1.4, 0.25)
        objets.add(lu, res)
        return objets

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire un diagramme", self.identite, self.ceinture)
        g = Barres(NIV, ABANDONS, pas=10, sous_pas=5, maxi=80, couleurs=COUL, largeur=3.6, hauteur=2.2, fs=24,
                   centre=P(-0.6, 0.15))
        self.au_mot("Un diagramme en barres")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9),
                  run_time=0.6)
        self.play(g.pousser(run_time=0.8))
        self.au_mot("des petits traits")
        petits = [g.trait(v) for v in sorted(g.traits) if v not in g.nombres]
        self.play(*[m.animate.scale(2.6).set_color(AMBRE) for m in petits], run_time=0.35)
        self.play(*[m.animate.scale(1 / 2.6).set_color(NUIT) for m in petits], run_time=0.35)
        self.au_mot("sais-tu le lire")
        q = self.t("?", 90, ORANGE_RETENUE).next_to(g, RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la game designer ───────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Une game designer")
        pers = personne(peau="#f1c27d", haut="#7c3aed", cheveux="#7f1d1d", r=0.45).move_to(P(3.9, 0.1))
        met = self.metier("Game designer", fs=44).next_to(pers, UP, buff=0.45)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(met, scale=0.8), run_time=0.6)
        self.au_mot("cinq niveaux")
        jeu, plats = ecran_jeu(6.0, 3.6)
        jeu.move_to(P(-2.6, 0.5))
        h = heros(0.26).next_to(plats[0], UP, buff=0)
        self.play(FadeIn(jeu[0]), LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in plats], lag_ratio=0.2),
                  FadeIn(h), run_time=0.9)
        self.au_mot("où les joueurs abandonnent")
        for k in (1, 2):
            self.play(h.animate.next_to(plats[k], UP, buff=0), path_arc=-1.2, run_time=0.4)
        chute = h.copy()
        self.play(chute.animate.move_to(plats[2].get_bottom() + DOWN * 1.2).rotate(PI / 2).set_opacity(0.3),
                  run_time=0.6)
        oups = self.t("?!", 50, ROUGE_ERREUR).next_to(plats[2], UP, buff=0.5)
        self.play(FadeIn(oups, scale=0.5), run_time=0.3)
        self.au_mot("Le jeu compte les abandons")
        compteur = self.t("abandons", 34, ORANGE_RETENUE).next_to(jeu, DOWN, buff=0.35)
        self.play(FadeIn(compteur, shift=UP * 0.2), Flash(plats[2], color=ROUGE_ERREUR), run_time=0.6)
        self.au_mot("dans un diagramme")
        mini = Barres(NIV, ABANDONS, pas=10, sous_pas=5, maxi=80, couleurs=COUL, largeur=2.4, hauteur=1.4, fs=20,
                      centre=P(1.3, -2.3))
        self.play(FadeIn(mini.fond, scale=0.9), run_time=0.3)
        self.play(mini.pousser(run_time=0.8))
        self.attendre_voix()

    # ── 02 : les axes ───────────────────────────────────────────────────────

    def ecran_axes(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-axes")
        g = self.graphe()
        base = VGroup(g.carte, g.titre, g.nom_axe, g.grille, g.axe_x, g.axe_y)
        self.au_mot("En bas")
        bas = self.col(self.t("En bas : les niveaux", 40), 2.3)
        self.play(FadeIn(base, scale=0.95), FadeIn(bas, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("de 1 à 5")
        self.play(LaggedStart(*[FadeIn(e, shift=UP * 0.2) for e in g.etiquettes], lag_ratio=0.2), run_time=0.7)
        self.au_mot("Sur le côté")
        cote = self.col(self.t("Sur le côté : les joueurs", 40), 1.4)
        self.play(FadeIn(cote, shift=RIGHT * 0.2), Indicate(g.axe_y, color=AMBRE), run_time=0.5)
        majeurs = sorted(g.nombres)
        for v, mot in zip(majeurs[:4], ["0, 10", "10, 20", "20, 30", "30…"]):
            self.au_mot(mot)
            self.play(FadeIn(g.nombre(v), scale=1.5), FadeIn(g.trait(v)), run_time=0.22)
        self.play(LaggedStart(*[AnimationGroup(FadeIn(g.nombre(v)), FadeIn(g.trait(v))) for v in majeurs[4:]],
                              lag_ratio=0.3), run_time=0.8)
        self.au_mot("un petit trait")
        petits = VGroup(*[g.trait(v) for v in sorted(g.traits) if v not in g.nombres])
        self.play(LaggedStart(*[FadeIn(m) for m in petits], lag_ratio=0.1), run_time=0.5)
        self.play(*[m.animate.scale(2.8).set_color(AMBRE) for m in petits], run_time=0.4)
        self.play(*[m.animate.scale(1 / 2.8).set_color(NUIT) for m in petits], run_time=0.4)
        self.au_mot("il vaut 5")
        pt = self.col(self.ligne([("petit trait :", AMBRE), ("5", VERT_OK)], 44), 0.2)
        arc = ArcBetweenPoints(g.y_axe(30) + RIGHT * 0.08, g.y_axe(35) + RIGHT * 0.08, angle=PI * 0.8,
                               color=VERT_OK, stroke_width=5)
        plus = texte("+5", 26, VERT_OK).set_stroke(WHITE, 5, background=True).next_to(arc, RIGHT, buff=0.05)
        self.play(FadeIn(pt, scale=0.8), Create(arc), FadeIn(plus), run_time=0.5)
        self.insister(pt[1], 1.5, 0.25)
        self.play(g.pousser(run_time=0.9))
        self.attendre_voix()

    # ── 03 : lire (niveau 2, niveau 1) ──────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lire")
        g = self.graphe_pret()
        o2 = self.lire(g, 1, 2.2, ("Niveau 2", "je monte", "puis je vais vers les nombres", None, "20 joueurs"),
                       petit=False)
        self.au_mot("Niveau 1")
        self.play(FadeOut(o2[0]), run_time=0.2)
        self.lire(g, 0, 0.35, ("Niveau 1", None, "la barre s'arrête", "entre 30 et 40", "35 joueurs"))
        self.play(g.rallumer(), run_time=0.4)
        self.attendre_voix()

    # ── 04 : la plus haute ──────────────────────────────────────────────────

    def ecran_max(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-max")
        g = self.graphe_pret()
        self.au_mot("Quelle barre est la plus haute")
        q = self.col(self.t("La plus haute ?", 44, JAUNE_TITRE), 2.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.05)
                                                              for b in g.barres], lag_ratio=0.2), run_time=1.0)
        self.lire(g, 2, 1.25, ("Celle du niveau 3", None, "au petit trait", "entre 70 et 80", "75 abandons"))
        self.au_mot("trop difficile")
        dur = self.col(self.bloc(["trop difficile :", "on le corrige !"], 40, ORANGE_RETENUE), -1.3)
        outil = VGroup(Line(P(0, 0), P(0.5, 0.5), stroke_color="#cbd5e1", stroke_width=10),
                       Circle(radius=0.16, stroke_color="#cbd5e1", stroke_width=8).move_to(P(0.55, 0.55)))
        outil.next_to(dur, RIGHT, buff=0.3)
        self.play(FadeIn(dur, shift=UP * 0.2), Wiggle(g.barres[2]), run_time=0.8)
        self.au_mot("le corriger")
        self.play(FadeIn(outil, scale=0.5), Rotate(outil, PI / 4), run_time=0.6)
        self.attendre_voix()

    # ── 05 : le total ───────────────────────────────────────────────────────

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-total")
        g = self.graphe_pret()
        self.au_mot("Combien d'abandons en tout")
        q = self.col(self.t("En tout ?", 46, JAUNE_TITRE), 2.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        idx = self.positions("chaque barre :", 5)
        vals = []
        for i, k in enumerate(idx):
            self.au_pos(k)
            v = g.valeur(i, fs=30)
            self.play(FadeIn(v, scale=1.6), g.focus(i, 0.5), run_time=0.3)
            vals.append(v)
        self.play(g.rallumer(), run_time=0.3)
        self.au_mot("J'additionne")
        somme = VGroup(self.ligne([("35", WHITE), ("+", WHITE), ("20", WHITE), ("+", WHITE), ("75", WHITE)], 46, 0.2),
                       self.ligne([("+", WHITE), ("15", WHITE), ("+", WHITE), ("5", WHITE)], 46, 0.2)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.25)
        self.col(somme, 0.9)
        morceaux = [[somme[0][0]], [somme[0][1], somme[0][2]], [somme[0][3], somme[0][4]], [somme[1][0], somme[1][1]],
                    [somme[1][2], somme[1][3]]]
        idx2 = self.positions("J'additionne :", 6)
        for i in range(5):
            self.au_pos(idx2[i])
            self.play(*[FadeIn(m, scale=1.4) for m in morceaux[i]], Indicate(vals[i], color=AMBRE), run_time=0.3)
        self.au_pos(idx2[5])
        tot = self.ligne([("=", WHITE), ("150", VERT_OK), ("abandons", WHITE)], 44, 0.22)
        self.col(tot, -0.7)
        self.play(FadeIn(tot, shift=UP * 0.2), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(somme, tot))), run_time=0.4)
        self.insister(tot[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 06 : le piège (un carreau = 10) ─────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        g = self.graphe_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.4)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("compter les carreaux")
        x0, x1 = g.axe_x.get_start()[0], g.axe_x.get_end()[0]
        car = Rectangle(width=x1 - x0 - 0.1, height=g.y_axe(40)[1] - g.y_axe(30)[1], stroke_color=ROUGE_ERREUR,
                        stroke_width=5, fill_color=ROUGE_ERREUR, fill_opacity=0.15)
        car.move_to(P((x0 + x1) / 2, (g.y_axe(30)[1] + g.y_axe(40)[1]) / 2))
        e1 = self.col(self.bloc(["compter les carreaux", "comme des joueurs"], 38, ORANGE_RETENUE), 1.45)
        self.play(FadeIn(car), FadeIn(e1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("ce n'est pas 1 joueur")
        faux = self.col(self.ligne([("1 carreau", WHITE), ("=", WHITE), ("1 joueur", ROUGE_ERREUR)], 40), 0.25)
        self.play(FadeIn(faux, shift=RIGHT * 0.2), run_time=0.4)
        x = croix(faux[2], sw=6)
        self.play(Create(x), run_time=0.3)
        self.au_mot("c'est 10")
        vrai = self.col(self.ligne([("1 carreau", WHITE), ("=", WHITE), ("10 joueurs", VERT_OK)], 40), -0.55)
        self.play(FadeIn(vrai, scale=0.8), car.animate.set_stroke(VERT_OK).set_fill(VERT_OK, 0.15),
                  Indicate(g.nombre(30), color=VERT_OK, scale_factor=1.6),
                  Indicate(g.nombre(40), color=VERT_OK, scale_factor=1.6), run_time=0.6)
        self.au_mot("Je lis toujours les nombres")
        lis = self.col(self.bloc(["Je lis toujours", "les nombres de l'axe."], 38, JAUNE_TITRE), -1.65)
        self.play(FadeIn(lis, shift=UP * 0.2), Circumscribe(VGroup(*g.nombres.values()), color=AMBRE), run_time=0.8)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        g = self.graphe_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Combien d'abandons de plus")
        q1 = self.col(self.bloc(["1. Niveau 3 : combien", "de plus qu'au niveau 1 ?"], 38), 1.25)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), g.estomper([0, 2], 0.4), run_time=0.5)
        self.au_mot("Et combien au niveau 4")
        q2 = self.col(self.bloc(["2. Niveau 4 ou 5 :", "combien en tout ?"], 38), -0.25)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), g.estomper([3, 4], 0.4), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(g.rallumer(), run_time=0.3)
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -1.6)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        g = self.graphe_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), g.estomper([0, 2], 0.4), run_time=0.6)
        v0, v2 = g.valeur(0, fs=30), g.valeur(2, fs=30)
        self.play(FadeIn(v0), FadeIn(v2), run_time=0.3)
        c1 = self.ligne([("75", WHITE), ("−", WHITE), ("35", WHITE), ("=", WHITE), ("40", VERT_OK)], 50, 0.22)
        self.col(c1, 1.3)
        self.au_mot("75 moins")
        self.play(FadeIn(c1[:2], scale=1.3), Indicate(v2, color=AMBRE), run_time=0.35)
        self.au_mot("35, égale")
        self.play(FadeIn(c1[2:4], scale=1.3), Indicate(v0, color=AMBRE), run_time=0.35)
        self.au_mot("40 abandons de plus")
        self.play(FadeIn(c1[4], scale=1.6), run_time=0.35)
        self.insister(c1[4], 1.4, 0.25)
        self.au_mot("Niveau 4 ou niveau 5")
        v3, v4 = g.valeur(3, fs=30), g.valeur(4, fs=30)
        self.play(g.estomper([3, 4], 0.4), FadeOut(v0), FadeOut(v2), run_time=0.4)
        c2 = self.ligne([("15", WHITE), ("+", WHITE), ("5", WHITE), ("=", WHITE), ("20", VERT_OK)], 50, 0.22)
        self.col(c2, -0.1)
        self.au_mot("15 plus")
        self.play(FadeIn(c2[:2], scale=1.3), FadeIn(v3, scale=1.5), run_time=0.35)
        self.au_mot("plus 5, égale")
        self.play(FadeIn(c2[2:4], scale=1.3), FadeIn(v4, scale=1.5), run_time=0.35)
        self.au_mot("20 abandons")
        self.play(FadeIn(c2[4], scale=1.6), run_time=0.35)
        self.play(Create(self.encadrer(VGroup(c1, c2))), g.rallumer(), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        g = self.graphe_pret()
        lignes = self.finale([("Je lis le titre,", "les catégories et l'axe."),
                              ("Je monte en haut,", "puis vers les nombres."),
                              ("Je regarde ce que", "vaut un petit trait.")], [1.75, 0.15, -1.45])
        self.au_mot("Je lis le titre")
        self.montrer_ligne(lignes[0], Circumscribe(g.titre, color=AMBRE))
        self.au_mot("Je monte")
        fl = g.monter(0)
        self.montrer_ligne(lignes[1], GrowArrow(fl))
        self.au_mot("puis je vais vers les nombres")
        tr = g.vers_axe(0, jusqu_au_lu=True)
        self.play(Create(tr), run_time=0.5)
        self.play(FadeIn(g.lu(35), scale=1.5), run_time=0.3)
        self.au_mot("Et je regarde")
        petits = [g.trait(v) for v in sorted(g.traits) if v not in g.nombres]
        self.montrer_ligne(lignes[2], *[m.animate.scale(2.5).set_color(AMBRE) for m in petits])
        self.play(*[m.animate.scale(1 / 2.5).set_color(NUIT) for m in petits], run_time=0.4)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_axes()
        self.ecran_lire()
        self.ecran_max()
        self.ecran_total()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsLireGraphique5e(StatsLireGraphiqueBase):
    identite = "Maths 5e — EleveAI"
    ceinture = "orange"


class StatsLireGraphique4e(StatsLireGraphiqueBase):
    """Même vidéo pour la 4e : seules l'identité et la ceinture changent."""

    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"


class StatsLireGraphique3e(StatsLireGraphiqueBase):
    """Même vidéo pour la 3e (révision) : identité et ceinture seulement."""

    identite = "Maths 3e — EleveAI"
    ceinture = "blanche"
