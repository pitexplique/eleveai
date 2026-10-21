# stats_representer.py
# EleveAI — Maths 5e — série « Statistiques » (cycle 4), épisode 05 :
# REPRÉSENTER DES DONNÉES (micro du coach stat_representer, notion
# stat_statistique ; banque genRepresenter : hauteur d'une barre avec une
# échelle « 1 cm représente s », et l'inverse ; angle d'un secteur
# circulaire = effectif × 360 ÷ total, et l'inverse). AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE (calculs du niveau 5e : échelle et angles).
# Short jumeau : stats_representer_short.py (jaune).
#
# ⭐ Décor et métier : l'ARCHITECTURE ; un ARCHITECTE montre à ses clients la
# place de chaque pièce d'une maison de 120 m². Données VRAISEMBLABLES (un
# plan inventé), calculées en Python : séjour 40, chambres 45, cuisine 20,
# salle de bain 15 (total 120) ; barres à 1 cm pour 5 m² : 8, 9, 4, 3 cm ;
# 360 ÷ 120 = 3° par m² : 120°, 135°, 60°, 45° (somme 360°) ; défi : 20 ÷ 5 =
# 4 cm ; 90 ÷ 3 = 30 m² (un quart de 120).
# ⭐ Figures du coach : `tableau_donnees`, `stat_graph` barres (axe gradué) et
# camembert (canvas_stats.Camembert : la 1re part part de midi, sens des
# aiguilles d'une montre).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 l'architecte · 02 le tableau · 03 les barres
# (échelle) · 04 les angles · 05 le piège (le disque complet) · 06 défi · 06b
# correction · 07 ce que tu as appris · 08 fin.
#
# Voix : manim/voix/5e-stats-representer.json (débit −10) ; calage :
# manim/scripts/5e/stats5_representer_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_representer.py StatsRepresenter5e -o eleveai-maths-5e-stats-representer --media_dir manim/scripts/5e/media-representer
# Sortie : manim/sorties/5e/maths/statistiques/05-representer/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_lire_tableau import personne  # noqa: E402

PIECES = ["Séjour", "Chambres", "Cuisine", "Salle de bain"]
SURF = [40, 45, 20, 15]
ANGLES = [s * 3 for s in SURF]
CM = [s // 5 for s in SURF]
COUL = ["#93c5fd", "#fcd34d", "#6ee7b7", "#fca5a5"]
assert sum(SURF) == 120 and ANGLES == [120, 135, 60, 45] and sum(ANGLES) == 360 and CM == [8, 9, 4, 3]


def plan_maison(s=1.0):
    """Le plan de la maison : quatre pièces, murs épais, une porte."""
    murs = Rectangle(width=5.0, height=3.2, stroke_color=WHITE, stroke_width=7)
    pieces = VGroup(
        Rectangle(width=2.6, height=1.9, fill_color=COUL[0], fill_opacity=0.35, stroke_width=0).move_to(P(-1.2, 0.65)),
        Rectangle(width=2.4, height=1.9, fill_color=COUL[1], fill_opacity=0.35, stroke_width=0).move_to(P(1.3, 0.65)),
        Rectangle(width=2.6, height=1.3, fill_color=COUL[2], fill_opacity=0.35, stroke_width=0).move_to(P(-1.2, -0.95)),
        Rectangle(width=2.4, height=1.3, fill_color=COUL[3], fill_opacity=0.35, stroke_width=0).move_to(P(1.3, -0.95)))
    cloisons = VGroup(Line(P(0.1, 1.6), P(0.1, -1.6)), Line(P(-2.5, -0.3), P(2.5, -0.3))).set_stroke(WHITE, 4)
    noms = VGroup(*[Text(n, font_size=24, color=WHITE).move_to(p) for n, p in zip(PIECES, pieces)])
    porte = Arc(radius=0.45, start_angle=0, angle=PI / 2, stroke_color=JAUNE_TITRE, stroke_width=4).move_to(
        P(-2.2, -1.4))
    return VGroup(pieces, murs, cloisons, noms, porte).scale(s)


class StatsRepresenterBase(Paysage5):
    nom_voix = "5e-stats-representer"
    fichier_marques = "stats5_representer_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
    XL = 0.9
    G = P(-3.4, -0.35)

    def tableau(self, valeurs=True):
        tab = Tableau(["Séjour", "Chambres", "Cuisine", "Bain"], [SURF if valeurs else [None] * 4],
                      libelles=["Surface (m²)"], coin="Pièce", largeur_case=1.45, largeur_libelle=2.5, hauteur=0.85,
                      fs=28, centre=P(-3.15, 2.3))
        return textes_devant(tab)

    def barres(self):
        return Barres(["Séjour", "Chambres", "Cuisine", "Bain"], SURF, pas=10, sous_pas=5, maxi=50, couleurs=COUL,
                      nom_axe="m²", titre="Surfaces", largeur=5.2, hauteur=3.6, fs=25, centre=self.G)

    def disque(self, centre=None, rayon=1.75):
        return Camembert(["Séjour", "Chambres", "Cuisine", "Bain"], SURF, rayon=rayon, couleurs=COUL, fs=26,
                         titre="Surfaces", centre=self.G if centre is None else centre)

    def angle_txt(self, cam, i, s, fs=30):
        """« 120° » posé dans la part i, près du centre (fond blanc pour lire)."""
        t = texte(s, fs, NUIT).set_stroke(WHITE, 6, background=True)
        return t.move_to(cam.centre + cam._dir(i) * cam._rayon() * 0.36)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Représenter des données", self.identite, self.ceinture)
        self.add(titre, ident, ech)
        mini = Tableau(["", "", "", ""], [[None] * 4], libelles=[""], coin="", largeur_case=0.55, largeur_libelle=0.8,
                       hauteur=0.45, fs=20, centre=P(-4.0, 0.2))
        self.play(FadeIn(mini, scale=0.9), run_time=0.4)
        self.au_mot("comment le transformer")
        b = Barres(["", "", "", ""], SURF, pas=10, maxi=50, couleurs=COUL, largeur=2.0, hauteur=1.6, fs=18,
                   centre=P(-0.6, 0.3))
        c = Camembert(["", "", "", ""], SURF, rayon=0.9, couleurs=COUL, montrer_etiquettes=False, centre=P(2.6, 0.3))
        f1 = Arrow(mini.get_right(), b.get_left(), buff=0.15, color=AMBRE)
        f2 = Arrow(b.get_right(), c.get_left(), buff=0.15, color=AMBRE)
        self.play(GrowArrow(f1), FadeIn(b.fond), run_time=0.4)
        self.play(b.pousser(run_time=0.6))
        self.play(GrowArrow(f2), FadeIn(c.fond), run_time=0.3)
        self.play(c.apparaitre(run_time=0.8))
        self.attendre_voix(marge=0.8)

    # ── 01 : l'architecte ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Un architecte")
        pers = personne(peau="#f1c27d", haut="#334155", cheveux="#78350f", r=0.5).move_to(P(4.0, 0.0))
        met = self.metier("Architecte", fs=44).next_to(pers, UP, buff=0.45)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(met, scale=0.8), run_time=0.6)
        self.au_mot("une maison de 120")
        pl = plan_maison(1.05).move_to(P(-2.4, 0.1))
        m2 = self.ligne([("Maison :", WHITE), ("120 m²", JAUNE_TITRE)], 44).next_to(pl, UP, buff=0.4)
        self.play(Create(pl[1]), FadeIn(m2, shift=DOWN * 0.2), run_time=0.8)
        self.play(Create(pl[2]), FadeIn(pl[4]), run_time=0.5)
        self.au_mot("la place de chaque pièce")
        self.play(LaggedStart(*[FadeIn(VGroup(p, n)) for p, n in zip(pl[0], pl[3])], lag_ratio=0.25), run_time=1.0)
        self.au_mot("il trace des diagrammes")
        b = Barres(["", "", "", ""], SURF, pas=10, maxi=50, couleurs=COUL, largeur=1.6, hauteur=1.2, fs=16,
                   centre=P(3.1, -2.3))
        c = Camembert(["", "", "", ""], SURF, rayon=0.6, couleurs=COUL, montrer_etiquettes=False, centre=P(5.0, -2.3))
        self.play(FadeIn(b.fond), FadeIn(c.fond), run_time=0.3)
        self.play(b.pousser(run_time=0.6), c.apparaitre(run_time=0.8))
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        tab = Tableau(PIECES, [[None] * 4], libelles=["Surface (m²)"], coin="Pièce", largeur_case=2.3,
                      largeur_libelle=2.7, hauteur=1.0, fs=30, centre=P(-0.3, 0.9))
        textes_devant(tab)
        self.au_mot("Voici les surfaces")
        self.play(FadeIn(tab, shift=UP * 0.2), run_time=0.5)
        for c, (mot, v) in enumerate(zip(["40 mètres", "45.", "20.", "15."], SURF)):
            self.au_mot(mot)
            self.play(remplir(tab, 0, c, v), *allumer(tab, 0, c), run_time=0.3)
            self.play(*eteindre(tab), run_time=0.15)
        self.au_mot("120.")
        e = self.ligne([("Au total :", WHITE), ("120 m²", JAUNE_TITRE)], 48)
        e.next_to(tab, DOWN, buff=0.7)
        self.play(FadeIn(e, shift=UP * 0.2), Circumscribe(VGroup(*tab.cases[0]), color=AMBRE), run_time=0.6)
        self.attendre_voix()

    # ── 03 : les barres et l'échelle ────────────────────────────────────────

    def accolade_cm(self, g, i, n):
        """« n cm » écrit au-dessus de la barre i (la hauteur à tracer)."""
        b = g.barres[i]
        t = texte(f"{n} cm", 26, "#b45309").set_stroke(WHITE, 5, background=True).next_to(b, UP, buff=0.1)
        return t

    def ecran_barres(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-barres")
        g = self.barres()
        self.au_mot("un diagramme en barres")
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.5)
        self.au_mot("Il choisit l'échelle")
        ech = self.col(self.ligne([("Échelle :", JAUNE_TITRE), ("1 cm", AMBRE), ("pour", WHITE), ("5 m²", BLEU_CALCUL)],
                                  40), 2.3)
        self.play(FadeIn(ech[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("1 centimètre")
        self.play(FadeIn(ech[1:], shift=RIGHT * 0.2), run_time=0.4)
        for i, (y, m1, m2, m3) in enumerate([(1.2, "Séjour : 40", "par 5, égale 8", "8 centimètres"),
                                             (-0.2, "Chambres : 45", "par 5, égale 9", "9 centimètres")]):
            self.au_mot(m1)
            c = self.ligne([(str(SURF[i]), BLEU_CALCUL), ("÷", WHITE), ("5", WHITE), ("=", WHITE),
                            (f"{CM[i]} cm", VERT_OK)], 46, 0.2)
            nom = self.t(PIECES[i] + " :", 38, COUL[i])
            bloc = self.col(VGroup(nom, c).arrange(DOWN, aligned_edge=LEFT, buff=0.15), y)
            self.play(FadeIn(nom, shift=RIGHT * 0.2), FadeIn(c[0], scale=1.3), run_time=0.35)
            self.au_mot(m2)
            self.play(FadeIn(c[1:4], scale=1.3), run_time=0.35)
            self.au_mot(m3)
            acc = self.accolade_cm(g, i, CM[i])
            self.play(g.pousser(i, run_time=0.7), FadeIn(c[4], scale=1.5), run_time=0.7)
            self.play(GrowFromCenter(acc), run_time=0.35)
        self.attendre_voix()

    # ── 04 : les angles ─────────────────────────────────────────────────────

    def ecran_angle(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-angle")
        cam = self.disque()
        self.add(cam.fond)
        self.au_mot("un diagramme circulaire")
        cercle = DashedVMobject(Circle(radius=1.75, stroke_color=NUIT, stroke_width=4), num_dashes=40).move_to(cam.centre)
        self.play(Create(cercle), run_time=0.6)
        self.au_mot("Le disque entier, 360")
        l1 = self.col(self.ligne([("360°", AMBRE), ("pour", WHITE), ("120 m²", BLEU_CALCUL)], 46), 2.3)
        tour = Arc(radius=2.0, start_angle=PI / 2, angle=-TAU * 0.999, stroke_color=AMBRE, stroke_width=6).move_to(
            cam.centre)
        self.play(FadeIn(l1[0], scale=1.3), Create(tour), run_time=0.7)
        self.au_mot("représente les 120")
        self.play(FadeIn(l1[1:], shift=RIGHT * 0.2), run_time=0.4)
        l2 = self.col(self.ligne([("360", AMBRE), ("÷", WHITE), ("120", BLEU_CALCUL), ("=", WHITE), ("3", VERT_OK)], 46,
                                 0.2), 1.45)
        self.au_mot("360 divisé par 120")
        self.play(FadeIn(l2[:3], scale=1.3), FadeOut(tour), run_time=0.4)
        self.au_mot("égale 3 :")
        self.play(FadeIn(l2[3:], scale=1.4), run_time=0.35)
        self.au_mot("chaque mètre carré vaut 3 degrés")
        l3 = self.col(self.ligne([("1 m²", BLEU_CALCUL), ("donne", WHITE), ("3°", VERT_OK)], 46), 0.6)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(l3[2], 1.4, 0.25)
        self.au_mot("Séjour : 40 fois 3")
        l4 = self.col(self.ligne([("Séjour :", COUL[0]), ("40", BLEU_CALCUL), ("×", WHITE), ("3", WHITE), ("=", WHITE),
                                  ("120°", VERT_OK)], 44, 0.18), -0.3)
        self.play(FadeIn(l4[:4], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 120 degrés")
        a0 = self.angle_txt(cam, 0, "120°")
        self.play(FadeIn(l4[4:], scale=1.3), GrowFromPoint(cam.parts[0], cam.centre), FadeIn(cam.textes[0]),
                  run_time=0.6)
        self.play(FadeIn(a0, scale=1.4), run_time=0.3)
        angles = [a0]
        self.au_mot("De même")
        for i, mot in [(1, "chambres 135"), (2, "cuisine 60"), (3, "salle de bain 45")]:
            self.au_mot(mot)
            a = self.angle_txt(cam, i, f"{ANGLES[i]}°", 26 if ANGLES[i] < 90 else 30)
            self.play(GrowFromPoint(cam.parts[i], cam.centre), FadeIn(cam.textes[i]), FadeIn(a, scale=1.4),
                      run_time=0.45)
            angles.append(a)
        self.remove(cercle)
        self.attendre_voix()
        return angles

    # ── 05 : le piège (le disque complet) ───────────────────────────────────

    def disque_plein(self, centre=None, rayon=1.75):
        cam = self.disque(centre, rayon)
        angles = VGroup(*[self.angle_txt(cam, i, f"{ANGLES[i]}°", 26 if ANGLES[i] < 90 else 30) for i in range(4)])
        return cam, angles

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.4)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("un disque qui ne fait pas le tour")
        trou = VGroup(*[Sector(radius=1.2, start_angle=PI / 2 - a0, angle=-a, fill_color=c, fill_opacity=1,
                               stroke_color=WHITE, stroke_width=3)
                        for a0, a, c in [(0, 2.0, COUL[0]), (2.0, 2.0, COUL[1]), (4.0, 1.2, COUL[2])]]).move_to(P(-5.0, 0.6))
        trop = VGroup(*[Sector(radius=1.2, start_angle=PI / 2 - a0, angle=-a, fill_color=c, fill_opacity=0.85,
                               stroke_color=WHITE, stroke_width=3)
                        for a0, a, c in [(0, 2.4, COUL[0]), (2.4, 2.6, COUL[1]), (5.0, 2.0, COUL[3])]]).move_to(P(-2.0, 0.6))
        self.play(FadeIn(trou, scale=0.8), run_time=0.5)
        x1 = croix(trou, sw=6)
        self.play(Create(x1), run_time=0.3)
        self.au_mot("ou qui déborde")
        self.play(FadeIn(trop, scale=0.8), run_time=0.5)
        x2 = croix(trop, sw=6)
        self.play(Create(x2), run_time=0.3)
        self.au_mot("Je vérifie")
        self.play(FadeOut(VGroup(trou, trop, x1, x2)), run_time=0.3)
        cam, angles = self.disque_plein(P(-3.4, -0.3))
        self.play(FadeIn(cam), FadeIn(angles), run_time=0.5)
        somme = VGroup(self.ligne([("120", WHITE), ("+", WHITE), ("135", WHITE), ("+", WHITE)], 46, 0.2),
                       self.ligne([("60", WHITE), ("+", WHITE), ("45", WHITE), ("=", WHITE), ("360", VERT_OK)], 46, 0.2)
                       ).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        self.col(somme, 1.0)
        morceaux = [[somme[0][0]], [somme[0][1], somme[0][2]], [somme[0][3], somme[1][0]], [somme[1][1], somme[1][2]]]
        idx = self.positions("Je vérifie :", 5)
        for i in range(4):
            self.au_pos(idx[i])
            self.play(*[FadeIn(m, scale=1.4) for m in morceaux[i]], Indicate(angles[i], color=AMBRE, scale_factor=1.4),
                      run_time=0.3)
        self.au_pos(idx[4])
        self.play(FadeIn(somme[1][3:], scale=1.4), run_time=0.35)
        self.au_mot("Le disque est complet")
        ok = self.col(VGroup(self.coche(VERT_OK, 0.3), self.t("le disque est complet", 40, VERT_OK)).arrange(
            RIGHT, buff=0.3), -0.6)
        tour = Arc(radius=2.0, start_angle=PI / 2, angle=-TAU * 0.999, stroke_color=VERT_OK, stroke_width=6).move_to(
            cam.centre)
        self.play(Create(tour), FadeIn(ok, shift=UP * 0.2), run_time=0.8)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def figures_defi(self):
        g = self.barres().scale(0.74).move_to(P(-4.55, -0.2))
        quart = VGroup(Circle(radius=1.0, stroke_color=WHITE, stroke_width=4, fill_color="#334155", fill_opacity=1),
                       Sector(radius=1.0, start_angle=PI / 2, angle=-PI / 2, fill_color=AMBRE, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=4)).move_to(P(-0.9, -0.2))
        return g, quart

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        g, quart = self.figures_defi()
        self.add(g.fond)
        for i in (0, 1, 3):
            self.add(g.barres[i])
        self.XL = 1.0
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 48, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Avec 1 centimètre")
        ech = self.col(self.ligne([("1 cm", AMBRE), ("pour", WHITE), ("5 m²", BLEU_CALCUL)], 38), 1.6)
        self.play(FadeIn(ech, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("la barre de la cuisine")
        q1 = self.col(self.bloc(["1. Hauteur de la barre", "de la cuisine ?"], 36), 0.75)
        qm = self.t("?", 60, ORANGE_RETENUE).move_to(g.base(2) + UP * 0.5)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), FadeIn(qm, scale=1.5), run_time=0.5)
        self.au_mot("un secteur de 90 degrés")
        a90 = texte("90°", 30, NUIT).set_stroke(WHITE, 6, background=True).move_to(quart.get_center() + P(0.4, 0.4))
        self.play(FadeIn(quart, scale=0.8), FadeIn(a90), run_time=0.5)
        self.au_mot("combien de mètres carrés")
        q2 = self.col(self.bloc(["2. 90° : combien", "de mètres carrés ?"], 36), -0.5)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE), -1.7)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        g, quart = self.figures_defi()
        self.add(g.fond, quart)
        for i in (0, 1, 3):
            self.add(g.barres[i])
        a90 = texte("90°", 30, NUIT).set_stroke(WHITE, 6, background=True).move_to(quart.get_center() + P(0.4, 0.4))
        self.add(a90)
        self.XL = 1.0
        titre = self.col(self.t("Correction", 48, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.5)
        c1 = self.ligne([("20", BLEU_CALCUL), ("÷", WHITE), ("5", WHITE), ("=", WHITE), ("4 cm", VERT_OK)], 46, 0.2)
        self.col(c1, 1.45)
        self.au_mot("Cuisine : 20")
        self.play(FadeIn(c1[0], scale=1.3), run_time=0.3)
        self.au_mot("divisé par 5")
        self.play(FadeIn(c1[1:4], scale=1.3), run_time=0.3)
        self.au_mot("4 centimètres")
        self.play(FadeIn(c1[4], scale=1.5), g.pousser(2, run_time=0.6), run_time=0.6)
        c2 = self.ligne([("90", AMBRE), ("÷", WHITE), ("3", WHITE), ("=", WHITE), ("30 m²", VERT_OK)], 46, 0.2)
        self.col(c2, 0.35)
        self.au_mot("90 divisé par 3")
        self.play(FadeIn(c2[:3], scale=1.3), Indicate(a90, color=AMBRE, scale_factor=1.4), run_time=0.4)
        self.au_mot("30 mètres carrés")
        self.play(FadeIn(c2[3:], scale=1.4), run_time=0.4)
        self.au_mot("un quart de la maison")
        q = self.col(self.ligne([("un quart de", WHITE), ("120 m²", BLEU_CALCUL)], 40), -0.5)
        self.play(FadeIn(q, shift=UP * 0.2), Indicate(quart[1], color=WHITE, scale_factor=1.1), run_time=0.6)
        self.play(Create(self.encadrer(VGroup(c1, c2))), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        cam, angles = self.disque_plein(P(-3.6, -0.3), 1.6)
        self.add(cam, angles)
        lignes = self.finale([("Barre :", "valeur ÷ échelle."),
                              ("Secteur : le disque", "entier (360°) = le total."),
                              ("Je vérifie :", "les angles font 360°.")], [1.85, 0.25, -1.4], fs=36)
        self.au_mot("Pour une barre")
        self.montrer_ligne(lignes[0])
        self.au_mot("Pour un secteur")
        tour = Arc(radius=1.85, start_angle=PI / 2, angle=-TAU * 0.999, stroke_color=AMBRE, stroke_width=6).move_to(
            cam.centre)
        self.montrer_ligne(lignes[1], Create(tour))
        self.au_mot("Et je vérifie")
        self.montrer_ligne(lignes[2], LaggedStart(*[Indicate(a, color=AMBRE) for a in angles], lag_ratio=0.2))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_barres()
        self.ecran_angle()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class StatsRepresenter5e(StatsRepresenterBase):
    identite = "Maths 5e — EleveAI"
