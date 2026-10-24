# stats_graphique_donnees.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# épisode « DU GRAPHIQUE AUX DONNÉES, ET INVERSEMENT » (1re 03, STMG 04).
# Micro du coach auto_stat_graphique_donnees, la MÊME dans les deux classes.
# AVEC VOIX. Paysage 16:9. CEINTURES : 1re ORANGE, STMG ORANGE (deux conversions
# enchaînées : bâtons → tableau → parts → angles ; valeur → graduations).
# Short jumeau : stats_graphique_donnees_short.py (blanche).
#
# ⭐ Décor et métier : le FOOTBALL (Coupe du monde 2022) ; une ANALYSTE DE
# DONNÉES du football prépare son rapport (problématique : représenter, contrôler).
# Données (résultats officiels FIFA, faits stables) : en 2022, la France marque
# 16 buts en 7 matchs (4-1 AUS, 2-1 DEN, 0-1 TUN, 3-1 POL, 2-1 ENG, 2-0 MAR,
# 3-3 ARG) : Mbappé 8, Giroud 4, autres 4 (Rabiot, Tchouaméni, T. Hernandez,
# Kolo Muani, 1 chacun). En 2018 : 14 buts (2-1, 1-0, 0-0, 4-3, 2-0, 1-0, 4-2),
# dont 4 pour Mbappé. Vérifiés le 24/10/2026 (somme des scores et des buteurs).
# Centres d'intérêt : sport.
# Calculs : 8 + 4 + 4 = 16 · 8 ÷ 16 = 0,5 = 50 % · 4 ÷ 16 = 0,25 = 25 % ·
# 0,5 × 360 = 180° · 0,25 × 360 = 90° · 8 ÷ 2 = 4 graduations · 8 ÷ 4 = 2 ·
# 4 ÷ 14 ≈ 0,286 ≈ 28,6 % · 4 ÷ 14 × 360 ≈ 102,9 ≈ 103°.
#
# Mapping micro → écrans (banques 1re automatismes-proportions-stats, STMG
# automatismes-graphiques) : relever les bâtons et le total (stmg tpl_1) → 02 ·
# effectif → part (stmg tpl_2, 1re donnees_tableau) → 03 · angle = part × 360
# (1re donnees_angle) → 04, défi · le pourcentage n'est pas un effectif (1re
# donnees_effectif, diagnostic) → question 1 · la barre en graduations (stmg
# tpl_3) → 06 piège, question 2.
# Écrans : 00 garde · 01 l'analyste, 16 buts · 02 bâtons → tableau · 03 les parts
# · 04 les angles (le camembert se construit) · 05 question 1 · 06 le piège (la
# barre en graduations) · 07 question 2 · 08 défi (2018) · 08b correction ·
# 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/lycee-stats-graphique-donnees.json (débit −7) ; calage :
# manim/scripts/stmg/stats_graphique_donnees_marques.json. UNE voix, DEUX rendus.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_graphique_donnees.py StatsGraphiqueDonneesPremiere -o eleveai-maths-premiere-commun-stats-graphique-donnees --media_dir manim/scripts/stmg/media-stats-graphique-donnees-premiere
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_graphique_donnees.py StatsGraphiqueDonneesStmg -o eleveai-maths-stmg-stats-graphique-donnees --media_dir manim/scripts/stmg/media-stats-graphique-donnees-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/03-graphique-donnees/
#           manim/sorties/stmg/maths/statistiques/04-graphique-donnees/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403

JOUEURS = ["Mbappé", "Giroud", "Autres"]
BUTS = [8, 4, 4]
COUL = ["#93c5fd", "#fca5a5", "#fcd34d"]
VERT_PELOUSE = "#15803d"


def ballon(r=0.4):
    """Un ballon : disque blanc, pentagone noir au centre, cinq taches au bord."""
    disque = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_D, stroke_width=3)
    penta = RegularPolygon(5, fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.32)
    taches = VGroup(*[RegularPolygon(5, fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.2)
                      .move_to(r * 0.78 * np.array([np.cos(a), np.sin(a), 0])) for a in
                      np.linspace(PI / 2, PI / 2 + TAU, 5, endpoint=False)])
    return VGroup(disque, penta, taches)


def terrain(larg=5.0, haut=3.0):
    """Un terrain vu du dessus : pelouse, lignes blanches, rond central, buts."""
    pel = Rectangle(width=larg, height=haut, fill_color=VERT_PELOUSE, fill_opacity=1, stroke_color=WHITE,
                    stroke_width=4)
    mil = Line(pel.get_top(), pel.get_bottom(), color=WHITE, stroke_width=3)
    rond = Circle(radius=haut * 0.18, color=WHITE, stroke_width=3)
    surf = VGroup(*[Rectangle(width=larg * 0.14, height=haut * 0.5, color=WHITE, stroke_width=3)
                    .align_to(pel, s).set_y(0) for s in (LEFT, RIGHT)])
    return VGroup(pel, mil, rond, surf)


class StatsGraphiqueDonneesBase(PaysageLycee):
    nom_voix = "lycee-stats-graphique-donnees"
    fichier_marques = "stats_graphique_donnees_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"
    G = P(-3.4, -0.45)

    def batons(self, centre=None, pas=2, maxi=10, valeurs=None, **kw):
        opts = dict(batons=True, couleurs=COUL, nom_axe="Buts", titre="Buts de la France, 2022", largeur=4.4,
                    hauteur=3.6, fs=28, centre=self.G if centre is None else centre)
        opts.update(kw)
        g = Barres(JOUEURS, BUTS if valeurs is None else valeurs, pas=pas, maxi=maxi, **opts)
        return caser(g) if centre is None else g

    def tableau(self, lignes, libelles, centre, largeur_case=1.45, largeur_libelle=1.5, fs=28, hauteur=0.72):
        t = Tableau(JOUEURS + ["Total"], lignes, libelles=libelles, coin="", largeur_case=largeur_case,
                    largeur_libelle=largeur_libelle, hauteur=hauteur, fs=fs, centre=centre)
        return textes_devant(t)

    def camembert(self, centre, rayon=1.35, fs=24, titre="Buts 2022"):
        cam = Camembert(JOUEURS, BUTS, rayon=rayon, couleurs=COUL, titre=titre, fs=fs, centre=centre)
        for t in cam.textes:  # les noms devant les parts, même allumées
            t.set_z_index(5)
        return cam

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Du graphique aux données", self.identite, self.ceinture)
        g = self.batons(centre=P(-2.6, 0.05), largeur=2.6, hauteur=1.6, fs=20, titre=None, nom_axe=None, pas=4)
        t = self.tableau([[None] * 4], ["Buts"], P(2.4, 0.15), largeur_case=0.95, largeur_libelle=1.0, fs=20,
                         hauteur=0.55)
        fl = DoubleArrow(P(-0.9, 0.1), P(0.15, 0.1), buff=0, color=AMBRE, stroke_width=6, tip_length=0.18)
        self.au_mot("Du graphique aux données")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.6)
        self.play(FadeIn(g.fond), g.pousser(run_time=0.7), GrowFromCenter(fl), FadeIn(t), run_time=0.9)
        self.au_mot("sais-tu le retrouver")
        q = self.t("?", 80, ORANGE_RETENUE).next_to(fl, UP, buff=0.6)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'analyste, 16 buts ────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        tr = terrain().move_to(P(-3.4, 0.4))
        self.au_mot("Coupe du monde 2022")
        cdm = self.t("Coupe du monde 2022", 40, JAUNE_TITRE).move_to(P(-3.4, 2.75))
        self.play(FadeIn(tr, scale=0.9), Write(cdm), run_time=0.8)
        self.au_mot("16 buts")
        b = ballon(0.35).move_to(tr[2])
        nb = self.ligne([("16", JAUNE_TITRE), ("buts", WHITE)], 44).move_to(P(-3.4, -1.65))
        self.play(FadeIn(b, scale=0.4), FadeIn(nb[0], scale=1.6), FadeIn(nb[1]), run_time=0.5)
        self.au_mot("en sept matchs")
        nm = self.ligne([("en", WHITE), ("7", JAUNE_TITRE), ("matchs", WHITE)], 40).next_to(nb, DOWN, buff=0.25)
        self.play(FadeIn(nm, shift=LEFT * 0.2), b.animate.shift(RIGHT * 2.1), run_time=0.6)
        self.au_mot("Une analyste")
        metier = self.t("Analyste de données", 44, BLEU_CALCUL).move_to(P(3.3, 2.5))
        sous = self.t("du football", 36).next_to(metier, DOWN, buff=0.15)
        self.play(FadeIn(metier, shift=UP * 0.2), FadeIn(sous), run_time=0.5)
        self.au_mot("du graphique au tableau")
        g = self.batons(centre=P(1.75, -0.9), largeur=1.6, hauteur=1.4, fs=18, titre=None, nom_axe=None, pas=4)
        t = self.tableau([[None] * 4], ["Buts"], P(4.95, -0.9), largeur_case=0.52, largeur_libelle=0.62, fs=16,
                         hauteur=0.45)
        fl = Arrow(P(3.05, -0.55), P(3.55, -0.55), buff=0, color=AMBRE, stroke_width=6)
        self.play(FadeIn(g.fond), g.pousser(run_time=0.6), GrowArrow(fl), run_time=0.8)
        self.play(FadeIn(t, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("et du tableau au graphique")
        fl2 = Arrow(P(3.55, -1.25), P(3.05, -1.25), buff=0, color=VERT_OK, stroke_width=6)
        self.play(GrowArrow(fl2), run_time=0.5)
        self.attendre_voix()

    # ── 02 : des bâtons au tableau ──────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        g = self.batons(colonne_lue=True)
        t = self.tableau([[None] * 4], ["Buts"], P(3.6, 1.9), largeur_case=1.05, largeur_libelle=1.05, fs=26)
        self.au_mot("dans un diagramme en bâtons")
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.4)
        self.play(g.pousser(run_time=0.8))
        self.add(g)
        self.au_mot("de 2 en 2")
        self.play(LaggedStart(*[Indicate(g.nombre(v), color=AMBRE, scale_factor=1.5) for v in (0, 2, 4)],
                              lag_ratio=0.3), run_time=0.8)
        lus = []
        for i, mot in enumerate(["Mbappé : 8", "Giroud : 4", "Les autres joueurs : 4"]):
            self.au_mot(mot)
            tr = g.vers_axe(i, jusqu_au_lu=True)
            lu = g.lu(BUTS[i])
            self.play(g.focus(i, 0.35), Create(tr), run_time=0.4)
            self.play(FadeIn(lu, scale=1.6), run_time=0.25)
            lus.append(VGroup(tr, lu))
            if i < 2:
                self.play(FadeOut(VGroup(tr)), run_time=0.15)
        self.au_mot("Je recopie")
        self.play(g.rallumer(), FadeIn(t, shift=LEFT * 0.2), run_time=0.5)
        anims = [remplir(t, 0, i, BUTS[i]) for i in range(3)]
        self.play(LaggedStart(*anims, lag_ratio=0.3), run_time=1.0)
        self.au_mot("8 plus 4 plus 4")
        calc = self.col(self.ligne([("8", WHITE), ("+", WHITE), ("4", WHITE), ("+", WHITE), ("4", WHITE)], 50), -0.2)
        self.play(FadeIn(calc, shift=UP * 0.2), *allumer(t, 0, 3), run_time=0.5)
        self.au_mot("égale 16")
        eg = self.ligne([("=", WHITE), ("16", VERT_OK)], 50).next_to(calc, RIGHT, buff=0.25)
        self.play(FadeIn(eg, scale=0.7), remplir(t, 0, 3, 16), run_time=0.5)
        self.insister(eg[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 03 : les parts ──────────────────────────────────────────────────────

    def tableau3(self, parts=False, angles=False):
        """Le tableau en haut : Buts, Part, Angle (rempli ou vide)."""
        lignes = [BUTS + [16], ["50 %", "25 %", "25 %", None] if parts else [None] * 4,
                  ["180°", "90°", "90°", None] if angles else [None] * 4]
        return self.tableau(lignes, ["Buts", "Part", "Angle"], P(-0.6, 1.85), largeur_case=1.55,
                            largeur_libelle=1.6, fs=28, hauteur=0.62)

    def ecran_parts(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-parts")
        t = self.tableau3()
        self.add(t)
        self.au_mot("la part de chacun")
        self.play(*teinter_ligne(t, 1), run_time=0.5)
        self.au_mot("l'effectif divisé par le total")
        regle = self.ligne([("part", AMBRE), ("=", WHITE), ("effectif ÷ total", WHITE)], 42).move_to(P(-0.6, -0.15))
        self.play(FadeIn(regle, shift=UP * 0.2), run_time=0.5)
        self.insister(regle, 1.12, 0.3)
        rangs = [("Mbappé : 8 divisé par 16", "8 ÷ 16 = 0,5", "soit 50 %", "50 %"),
                 ("Giroud : 4 divisé par 16", "4 ÷ 16 = 0,25", "soit 25 %", "25 %")]
        ys = [-1.15, -2.05]
        calculs = VGroup()
        for i, ((mot, txt, mot2, pc), y) in enumerate(zip(rangs, ys)):
            self.au_mot(mot)
            c = self.ligne([(JOUEURS[i] + " :", COUL[i]), (txt, WHITE)], 40).move_to(P(-1.6, y))
            self.play(FadeIn(c, shift=RIGHT * 0.2), *allumer(t, 0, i), run_time=0.45)
            self.au_mot(mot2)
            r = self.t(f"→ {pc}", 40, VERT_OK).next_to(c, RIGHT, buff=0.3)
            self.play(FadeIn(r, scale=0.7), remplir(t, 1, i, pc), run_time=0.45)
            calculs.add(VGroup(c, r))
        self.au_mot("25 % aussi")
        self.play(remplir(t, 1, 2, "25 %"), *allumer(t, 1, 2), run_time=0.5)
        self.attendre_voix()

    # ── 04 : les angles, le camembert se construit ──────────────────────────

    def ecran_angles(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-angles")
        t = self.tableau3(parts=True)
        self.add(t)
        cam = self.camembert(P(4.4, -1.55), rayon=1.3, fs=20, titre=None)
        self.au_mot("Puis l'angle")
        self.play(*teinter_ligne(t, 2), run_time=0.4)
        self.au_mot("la part, fois 360 degrés")
        regle = self.ligne([("angle", AMBRE), ("=", WHITE), ("part × 360°", WHITE)], 42).move_to(P(-2.4, -0.15))
        self.play(FadeIn(regle, shift=UP * 0.2), FadeIn(cam.fond), run_time=0.5)
        self.au_mot("0,5 fois 360")
        c1 = self.ligne([("Mbappé :", COUL[0]), ("0,5 × 360", WHITE)], 40).move_to(P(-3.0, -1.15))
        self.play(FadeIn(c1, shift=RIGHT * 0.2), *allumer(t, 1, 0), run_time=0.4)
        self.au_mot("égale 180 degrés")
        r1 = self.t("= 180°", 40, VERT_OK).next_to(c1, RIGHT, buff=0.25)
        self.play(FadeIn(r1, scale=0.7), remplir(t, 2, 0, "180°"),
                  GrowFromPoint(cam.parts[0], cam.centre), FadeIn(cam.textes[0]), run_time=0.6)
        self.au_mot("la moitié du disque")
        moit = cam.moitie()
        self.play(Create(moit), run_time=0.5)
        self.au_mot("Giroud, et les autres joueurs")
        self.play(FadeOut(moit), *allumer(t, 1, 1), *allumer(t, 1, 2), run_time=0.4)
        self.au_mot("0,25 fois 360")
        c2 = self.ligne([("les deux :", WHITE), ("0,25 × 360", WHITE)], 40).move_to(P(-3.0, -2.05))
        c2.align_to(c1, LEFT)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 90 degrés")
        r2 = self.t("= 90°", 40, VERT_OK).next_to(c2, RIGHT, buff=0.25)
        self.play(FadeIn(r2, scale=0.7), remplir(t, 2, 1, "90°"), remplir(t, 2, 2, "90°"),
                  *[AnimationGroup(GrowFromPoint(cam.parts[i], cam.centre), FadeIn(cam.textes[i])) for i in (1, 2)],
                  run_time=0.7)
        self.au_mot("un quart du disque")
        q = cam.quarts()
        self.play(Create(q), run_time=0.5)
        self.insister(VGroup(r1, r2), 1.15, 0.3)
        self.attendre_voix()

    # ── 05 : question 1 (le pourcentage n'est pas l'effectif) ───────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cam = self.camembert(self.G, rayon=1.9, fs=28)
        self.add(cam)
        self.question_pause("05-question", "05b-reponse", ["Dans le camembert, que vaut", "le secteur de Giroud ?"],
                            ["4 %", "25 %", "90 %"], 1,
                            ["4 ÷ 16 = 25 %", "A : l'effectif ; C : 90° ≠ 90 %"],
                            avant=lambda: self.play(cam.focus(1, 0.35), run_time=0.4))

    # ── 06 : le piège, la barre en graduations ──────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        g = self.batons(valeurs=[8, 0.001, 0.001], titre="Je trace les bâtons")
        self.add(g.fond)
        self.au_mot("Dans l'autre sens")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.1)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("je monte de 8 graduations")
        faux = self.col(self.ligne([("Mbappé :", COUL[0]), ("8 graduations ?", ORANGE_RETENUE)], 40), 2.3)
        self.play(FadeIn(faux, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Non")
        x = croix(faux[1], sw=6)
        self.play(Create(x), run_time=0.4)
        self.au_mot("une graduation vaut 2 buts")
        une = self.col(self.ligne([("1 graduation", AMBRE), ("=", WHITE), ("2 buts", WHITE)], 40), 1.35)
        self.play(FadeIn(une, shift=RIGHT * 0.2), Indicate(g.nombre(2), color=AMBRE, scale_factor=1.8),
                  run_time=0.6)
        self.au_mot("8 divisé par 2")
        c = self.ligne([("8", WHITE), ("÷", WHITE), ("2", AMBRE)], 46)
        r = self.ligne([("=", WHITE), ("4", VERT_OK), ("graduations", WHITE)], 46).next_to(c, RIGHT, buff=0.25)
        self.col(VGroup(c, r), 0.3)
        self.play(FadeIn(c, shift=UP * 0.2), run_time=0.4)
        self.au_mot("égale 4 graduations")
        crans = VGroup(*[self.t(str(k), 26, AMBRE).next_to(g.point(0, 2 * k), RIGHT, buff=0.32)
                         for k in range(1, 5)])
        self.play(FadeIn(r, scale=0.7), g.pousser(indices=[0], run_time=1.2),
                  LaggedStart(*[FadeIn(m, scale=1.5) for m in crans], lag_ratio=0.3, run_time=1.2))
        self.insister(r[1], 1.4, 0.25)
        self.au_mot("La hauteur")
        regle = self.col(self.bloc(["hauteur = valeur ÷", "valeur d'une graduation"], 36, AMBRE), -1.0)
        self.play(FadeIn(regle, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 07 : question 2 (une graduation de 4) ───────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.batons(valeurs=[8, 0.001, 0.001], pas=4, maxi=12, titre="1 graduation = 4 buts")
        self.add(g.fond)

        def tracer():
            self.play(g.pousser(indices=[0], run_time=0.8))

        self.question_pause("07-question", "07b-reponse", ["Une graduation = 4 buts :", "combien pour Mbappé ?"],
                            ["8 graduations", "4 graduations", "2 graduations"], 2,
                            ["8 ÷ 4 = 2 graduations", "A : pas divisé ; B : ancienne graduation"], geste=tracer)

    # ── 08 : défi (2018) ────────────────────────────────────────────────────

    def tableau18(self, lignes=None, libelles=("Buts 2018",)):
        lignes = lignes or [[None, None]]
        t = Tableau(["Mbappé", "Total"], lignes, libelles=list(libelles), coin="", largeur_case=1.7,
                    largeur_libelle=2.1, hauteur=0.75, fs=30, centre=P(-3.4, 1.3))
        return textes_devant(t)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("En 2018")
        an = self.t("Coupe du monde 2018", 40, JAUNE_TITRE).move_to(P(-3.4, 2.9))
        t = self.tableau18()
        self.play(FadeIn(an, shift=DOWN * 0.2), FadeIn(t), run_time=0.5)
        self.au_mot("14 buts")
        self.play(remplir(t, 0, 1, 14), run_time=0.4)
        self.au_mot("dont 4 pour Mbappé")
        self.play(remplir(t, 0, 0, 4), run_time=0.4)
        b = ballon(0.45).move_to(P(-3.4, -1.3))
        self.play(FadeIn(b, scale=0.5), run_time=0.3)
        self.play(Rotate(b, -TAU / 3), run_time=0.5)
        self.au_mot("Un : quelle part")
        q1 = self.col(self.ligne([("1.", AMBRE), ("La part de Mbappé, en % ?", WHITE)], 38), 1.4)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : quel angle")
        q2 = self.col(self.ligne([("2.", AMBRE), ("L'angle de son secteur ?", WHITE)], 38), 0.45)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(VGroup(icone_pause(0.36), self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE))
                         .arrange(RIGHT, buff=0.2), -0.8)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08b-correction")
        t = self.tableau18([[4, 14]])
        self.add(t)
        cam = Camembert(["Mbappé", "Autres"], [4, 10], rayon=1.25, couleurs=[COUL[0], "#e2e8f0"], titre=None,
                        montrer_etiquettes=False, centre=P(-3.4, -1.55), fs=22)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), FadeIn(cam.fond), run_time=0.5)
        self.au_mot("4 divisé par 14")
        c1 = self.col(self.ligne([("1.", AMBRE), ("4 ÷ 14", WHITE), ("≈ 0,286", WHITE)], 42), 1.75)
        self.play(FadeIn(c1[:2], shift=RIGHT * 0.2), *allumer(t, 0, 0), run_time=0.4)
        self.au_mot("environ 0,286")
        self.play(FadeIn(c1[2], scale=0.7), run_time=0.4)
        self.au_mot("environ 28,6 %")
        r1 = self.col(self.ligne([("soit ≈", WHITE), ("28,6 %", VERT_OK)], 44), 0.95)
        self.play(FadeIn(r1, scale=0.7), cam.apparaitre(run_time=0.8))
        self.insister(r1[1], 1.3, 0.25)
        self.au_mot("Deux : 4 divisé par 14, fois 360")
        c2 = self.col(self.ligne([("2.", AMBRE), ("4 ÷ 14 × 360", WHITE)], 42), -0.1)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 103 degrés")
        r2 = self.col(self.ligne([("≈", WHITE), ("103°", VERT_OK)], 46), -0.95)
        arc = Arc(radius=0.55, start_angle=PI / 2, angle=-4 / 14 * TAU, arc_center=cam.centre, stroke_color=AMBRE,
                  stroke_width=8).set_z_index(3)
        self.play(FadeIn(r2, scale=0.7), Create(arc), cam.allumer(0), run_time=0.6)
        self.insister(r2[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        g = self.batons(colonne_lue=False)
        self.add(g)
        lignes = self.finale([("Graphique → tableau :", "chaque valeur, le total"),
                              ("Part = effectif ÷ total ;", "angle = part × 360°"),
                              ("Hauteur = valeur ÷", "une graduation")], [1.75, 0.15, -1.45])
        self.au_mot("Du graphique au tableau")
        self.montrer_ligne(lignes[0], g.focus(0, 0.35))
        self.au_mot("Du tableau au graphique")
        self.montrer_ligne(lignes[1], g.rallumer())
        self.au_mot("Et une barre monte")
        self.montrer_ligne(lignes[2], Indicate(g.nombre(2), color=AMBRE, scale_factor=1.6))
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_parts()
        self.ecran_angles()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsGraphiqueDonneesPremiere(StatsGraphiqueDonneesBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"


class StatsGraphiqueDonneesStmg(StatsGraphiqueDonneesBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "orange"
