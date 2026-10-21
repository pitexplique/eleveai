# stats_moyenne.py
# EleveAI — Maths 4e ET 3e — série « Statistiques », cycle 4 : CALCULER UNE
# MOYENNE (micro du coach : stat_moyenne, notion stat_statistique), AVEC VOIX.
# ÉPISODE COMMUN : 4e 06-moyenne et 3e 04-moyenne (une voix, un script, deux
# rendus ; la voix ne cite aucune classe).
# Paysage 16:9. CEINTURES : 4e VERTE (la paysage complète du niveau : moyenne
# d'une liste, sens du partage égal, moyenne PONDÉRÉE par un tableau
# d'effectifs, le piège de la division, défi arrondi au dixième) ; 3e ORANGE
# (même contenu, révision de la 4e, un cran sous la verte du niveau 3e).
# Short jumeau : stats_moyenne_short.py (jaune).
#
# ⭐ Décor et métier : l'ASTRONOMIE ; un ASTRONOME de l'observatoire des Makes
# (Saint-Louis, La Réunion ; observatoire public réel) compte les étoiles
# filantes (problématique : résumer, comparer). ⚠️ 21/10 : le football et
# l'analyste de données sont déjà pris par la 5e (moyenne, Mbappé) et la 4e
# (interpréter) : ce décor les évite. Données VRAISEMBLABLES (hors pic d'essaim,
# quelques étoiles filantes à une vingtaine par heure), calculées en Python :
#   7 nuits : 12, 8, 15, 20, 10, 6, 13 → 84 ÷ 7 = 12 ;
#   bolides sur 20 nuits : 0 : 2 · 1 : 5 · 2 : 8 · 3 : 3 · 4 : 2 →
#   0×2 + 1×5 + 2×8 + 3×3 + 4×2 = 38 ; 38 ÷ 20 = 1,9 ; piège 38 ÷ 5 = 7,6 (> 4) ;
#   défi : 9, 14, 11, 7, 16, 12, 10 → 79 ÷ 7 ≈ 11,3 (< 12).
# ⭐ Les figures sont CELLES DU COACH (manim/canvas_stats.py) : `stat_graph`
# barres (genMoyenne, le partage égal) et `tableau_donnees` (genMoyennePonderee
# « tableau », moyenne_effectifs de la 3e). ⛔ PAS D'ÉCART : chaque nombre
# s'écrit au mot où la voix le dit (marques mot à mot).
#
# Mapping micro → écrans : 4e genMoyenne / 3e moyenne_liste → 02-03 ;
# sens (open « pourquoi la moyenne… ») → 04 ; 4e genMoyennePonderee « tableau »
# / 3e moyenne_effectifs → 05 ; 3e moyenne_piege_effectifs → 06 ;
# 3e moyenne_decimale_arrondie → 07 défi / 07b.
# Écrans : 00 garde · 01 l'observatoire, l'astronome · 02 la série (barres) ·
# 03 somme ÷ nombre · 04 le partage égal · 05 le tableau d'effectifs (pondérée)
# · 06 le piège (÷ 5) · 07 défi · 07b correction · 08 ce que tu as appris
# · 09 fin (règle du 19/10).
#
# Voix : manim/voix/4e-stats-moyenne.json (débit −10), WAV dans
# public/sons/4e-stats-moyenne/ ; calage mot à mot :
# manim/scripts/4e/stats_moyenne_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_moyenne.py StatsMoyenne4e -o eleveai-maths-4e-stats-moyenne --media_dir manim/scripts/4e/media-moyenne
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_moyenne.py StatsMoyenne3e -o eleveai-maths-3e-stats-moyenne --media_dir manim/scripts/4e/media-moyenne-3e
# Sorties : manim/sorties/4e/maths/statistiques/06-moyenne/eleveai-maths-4e-stats-moyenne.mp4
#           manim/sorties/3e/maths/statistiques/04-moyenne/eleveai-maths-3e-stats-moyenne.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lotf_commun import *  # noqa: E402,F403

NUITS = ["N1", "N2", "N3", "N4", "N5", "N6", "N7"]
FIL = [12, 8, 15, 20, 10, 6, 13]
FIL2 = [9, 14, 11, 7, 16, 12, 10]
# le partage égal : (de, vers, combien) jusqu'à 12 partout
TRANSFERTS = [(3, 5, 6), (3, 1, 2), (2, 1, 2), (2, 4, 1), (6, 4, 1)]
CIEL = "#1e1b4b"
C_BAR = ["#a5b4fc"] * 7
C_BAR2 = ["#c4b5fd"] * 7


def etoile(r=0.12, couleur="#fde047"):
    return Star(5, outer_radius=r, inner_radius=r * 0.45, fill_color=couleur, fill_opacity=1, stroke_width=0)


def filante(longueur=1.0, couleur="#fde047"):
    """Une étoile filante : la tête et sa traînée qui s'efface."""
    tete = etoile(0.11, couleur)
    trainee = Line(ORIGIN, LEFT * longueur + UP * longueur * 0.45, stroke_width=5)
    trainee.set_stroke(color=[couleur, CIEL], width=5)
    return VGroup(trainee, tete)


def coupole(s=1.0):
    """L'observatoire : bâtiment blanc et sa coupole, la fente ouverte."""
    mur = Rectangle(width=1.8 * s, height=1.0 * s, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
    dome = Arc(radius=0.9 * s, start_angle=0, angle=PI, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    dome.next_to(mur, UP, buff=0)
    fente = Rectangle(width=0.22 * s, height=0.8 * s, fill_color=CIEL, fill_opacity=1, stroke_width=0)
    fente.move_to(dome.get_center() + UP * 0.05 * s)
    porte = Rectangle(width=0.35 * s, height=0.55 * s, fill_color="#475569", fill_opacity=1, stroke_width=0)
    porte.align_to(mur, DOWN)
    return VGroup(mur, dome, fente, porte)


def hauteur_vers(g, i, v):
    """La barre i de g redessinée à la valeur v (même pied) : cible d'un Transform."""
    a = g.barres[i]
    h = max(0.001, (v - g.mini) * np.linalg.norm(g._uy()))
    b = RoundedRectangle(width=a.width, height=h, corner_radius=min(0.07, h / 2), fill_color=a.get_fill_color(),
                         fill_opacity=a.get_fill_opacity(), stroke_color=a.get_stroke_color(),
                         stroke_width=a.get_stroke_width())
    return b.move_to(g.base(i), aligned_edge=DOWN)


class StatsMoyenneBase(PaysageF):
    nom_voix = "4e-stats-moyenne"
    fichier_marques = "stats_moyenne_marques.json"
    G = P(-3.4, -0.35)

    def graphe(self, valeurs=FIL, titre="Étoiles filantes en une heure", couleurs=C_BAR, centre=None, **kw):
        opts = dict(pas=5, sous_pas=1, maxi=25, nom_axe="Étoiles filantes", titre=titre, largeur=5.4, hauteur=3.6,
                    fs=26, couleurs=couleurs, centre=self.G if centre is None else centre)
        opts.update(kw)
        return Barres(NUITS, valeurs, **opts)

    def ligne_moyenne(self, g, v, couleur=VERT_OK, txt=None):
        """La ligne pointillée horizontale de la moyenne, à travers le graphique."""
        y = g.y_axe(v)[1]
        x0, x1 = g.base(0)[0] - 0.45 * np.linalg.norm(g._ux()), g.base(g.n - 1)[0] + 0.45 * np.linalg.norm(g._ux())
        tr = DashedLine(P(x0, y), P(x1, y), color=couleur, stroke_width=6, dash_length=0.14)
        if txt:
            return VGroup(tr, texte(txt, 28, couleur).set_stroke(WHITE, 5, background=True)
                          .next_to(P(x1, y), RIGHT, buff=0.08))
        return tr

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une moyenne", self.identite, self.ceinture)
        g = self.graphe(titre=None, largeur=3.6, hauteur=2.0, fs=22, nom_axe=None, centre=P(-0.6, 0.1))
        self.au_mot("Calculer une moyenne")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9),
                  run_time=0.7)
        self.au_mot("combien d'étoiles filantes")
        self.play(g.pousser(run_time=0.8))
        q = self.t("?", 90, ORANGE_RETENUE).next_to(g, RIGHT, buff=0.5)
        f = filante(0.9).next_to(g, LEFT, buff=0.4).shift(UP * 0.6)
        self.play(FadeIn(q, scale=0.4), FadeIn(f, shift=DOWN * 0.4 + RIGHT * 0.6), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'observatoire des Makes, l'astronome ──────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        ciel = Rectangle(width=6.6, height=6.2, fill_color=CIEL, fill_opacity=1, stroke_width=0).move_to(P(-3.8, 0.35))
        rng = np.random.default_rng(7)
        fond_et = VGroup(*[etoile(0.025 + 0.03 * rng.random(), WHITE).move_to(P(-6.9 + 6.2 * rng.random(),
                                                                               -1.0 + 4.2 * rng.random()))
                           for _ in range(40)])
        obs = coupole(1.1).move_to(P(-3.6, -1.9))
        self.au_mot("l'observatoire des Makes")
        tit = self.col(self.t("Observatoire des Makes", 40, JAUNE_TITRE), 2.75, xl=0.0)
        lieu = self.col(self.t("Saint-Louis, La Réunion", 32), 2.15, xl=0.0)
        self.play(FadeIn(ciel), FadeIn(fond_et), FadeIn(obs, shift=UP * 0.3), Write(tit), FadeIn(lieu), run_time=0.9)
        self.au_mot("Un astronome")
        astro = personne("#4f46e5", "#c68642", 0.34, "#111827").move_to(P(0.6, 1.0))
        met = self.metier("Astronome", fs=46).next_to(astro, RIGHT, buff=0.35)
        self.play(FadeIn(astro, shift=UP * 0.2), FadeIn(met, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("compte les étoiles filantes")
        fils = [filante(0.9).move_to(P(-5.5 + 1.6 * k, 2.4 - 0.5 * (k % 2))) for k in range(4)]
        self.play(LaggedStart(*[AnimationGroup(FadeIn(f), f.animate.shift(RIGHT * 0.8 + DOWN * 0.36))
                                for f in fils], lag_ratio=0.3), run_time=1.4)
        self.au_mot("des poussières qui brûlent")
        pous = self.col(self.bloc(["des poussières qui brûlent", "dans l'atmosphère"], 32, "#fde047"), 0.0, xl=0.0)
        self.play(FadeIn(pous, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("en une heure")
        h = self.col(self.ligne([("Chaque nuit :", WHITE), ("combien en une heure ?", BLEU_CALCUL)], 32), -1.0,
                     xl=0.0)
        self.play(FadeIn(h, shift=RIGHT * 0.2), *[FadeOut(f) for f in fils], run_time=0.5)
        self.au_mot("Sa question")
        q = self.col(self.bloc(["Combien par heure,", "en moyenne ?"], 42, ORANGE_RETENUE), -2.2, xl=0.0)
        self.play(Write(q), run_time=0.8)
        self.insister(q, 1.08, 0.3)
        self.attendre_voix()

    # ── 02 : la série, nuit après nuit ──────────────────────────────────────

    def ecran_serie(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-serie")
        g = self.graphe()
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.5)
        entete = self.col(self.t("Étoiles filantes par heure", 38, JAUNE_TITRE), 2.6)
        self.play(FadeIn(entete, shift=RIGHT * 0.2), run_time=0.4)
        liste = VGroup(*[self.t(str(v), 46, BLEU_CALCUL) for v in FIL]).arrange(RIGHT, buff=0.32)
        self.col(liste, 1.65)
        for i, p in enumerate(self.nombres_apres("nuit après nuit", 7)):
            self.au_i(p)
            val = g.valeur(i, fs=26)
            self.play(FadeIn(liste[i], scale=1.6), GrowFromEdge(g.barres[i], DOWN), FadeIn(val, shift=DOWN * 0.15),
                      Indicate(g.etiquettes[i], color=AMBRE, scale_factor=1.3), run_time=0.4)
        self.au_mot("Le nombre change")
        ch = self.col(self.bloc(["Le nombre change", "d'une nuit à l'autre."], 36), 0.4)
        self.play(FadeIn(ch, shift=RIGHT * 0.2), LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.08)
                                                                for b in g.barres], lag_ratio=0.12), run_time=1.0)
        self.au_mot("Un seul nombre")
        un = self.col(self.ligne([("Un seul nombre", WHITE), ("?", ORANGE_RETENUE)], 44), -1.1)
        self.play(FadeIn(un, scale=0.7), run_time=0.4)
        self.insister(un[1], 1.6, 0.25)
        self.attendre_voix()

    def graphe_pret(self, valeurs=True):
        g = self.graphe()
        self.add(g)
        vals = VGroup(*[g.valeur(i, fs=26) for i in range(7)]) if valeurs else VGroup()
        self.add(vals)
        return g, vals

    # ── 03 : somme ÷ nombre ─────────────────────────────────────────────────

    def somme_jouee(self, serie, debut, vals, y, fs=42, couleur=BLEU_CALCUL):
        """12 + 8 + 15 + …, écrit nombre par nombre AU MOT."""
        morceaux = []
        for k, v in enumerate(serie):
            if k:
                morceaux.append(("+", WHITE))
            morceaux.append((str(v), couleur))
        s = self.col(self.ligne(morceaux, fs, 0.14), y)
        for k, p in enumerate(self.nombres_apres(debut, len(serie))):
            self.au_i(p)
            idx = [0] if k == 0 else [2 * k - 1, 2 * k]
            self.play(*[FadeIn(s[j], scale=1.5) for j in idx], Indicate(vals[k], color=AMBRE, scale_factor=1.5),
                      run_time=0.28)
        return s

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        g, vals = self.graphe_pret()
        self.au_mot("la moyenne")
        tit = self.col(self.t("La moyenne", 50, JAUNE_TITRE), 2.6)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("J'additionne")
        e1 = self.col(self.ligne([("1.", AMBRE), ("J'additionne toutes les valeurs", WHITE)], 34), 1.75)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), run_time=0.4)
        s = self.somme_jouee(FIL, "toutes les valeurs", vals, 1.0)
        self.au_mot("84. Puis")
        tot = self.ligne([("=", WHITE), ("84", VERT_OK)], 48).next_to(s, DOWN, buff=0.22).align_to(s, RIGHT)
        self.play(FadeIn(tot, shift=UP * 0.2), run_time=0.35)
        self.insister(tot[1], 1.4, 0.25)
        self.au_mot("je divise")
        e2 = self.col(VGroup(self.ligne([("2.", AMBRE), ("Je divise par", WHITE)], 34),
                             self.t("le nombre de nuits", 34)).arrange(DOWN, aligned_edge=LEFT, buff=0.08), -0.55)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), run_time=0.4)
        self.play(LaggedStart(*[Indicate(e, color=AMBRE, scale_factor=1.3) for e in g.etiquettes], lag_ratio=0.1),
                  run_time=0.8)
        d = self.ligne([("84", VERT_OK), ("÷", WHITE), ("7", BLEU_CALCUL)], 52)
        self.col(d, -1.65)
        self.au_mot("84 divisé")
        self.play(FadeIn(d[0], scale=1.4), FadeIn(d[1]), run_time=0.3)
        self.au_mot("par 7")
        self.play(FadeIn(d[2], scale=1.6), run_time=0.3)
        self.au_mot("12. En")
        res = self.ligne([("=", WHITE), ("12", VERT_OK)], 52).next_to(d, RIGHT, buff=0.25)
        self.play(FadeIn(res, scale=1.5), run_time=0.35)
        self.au_mot("En moyenne")
        lm = self.ligne_moyenne(g, 12, txt="12")
        moy = self.t("12 par heure, en moyenne", 30, VERT_OK).next_to(VGroup(d, res), DOWN, buff=0.3).align_to(d, LEFT)
        self.play(Create(lm[0]), FadeIn(lm[1]), FadeIn(moy, shift=UP * 0.2), run_time=0.7)
        cadre = self.encadrer(VGroup(d, res))
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(d, res, cadre), 1.1, 0.3)
        self.attendre_voix()

    # ── 04 : le partage égal ────────────────────────────────────────────────

    def transfert(self, g, etat, de, vers, n=1, run_time=0.8):
        """n étoiles passent de la barre `de` à la barre `vers` : une étoile file, les barres changent."""
        etat[de] -= n
        etat[vers] += n
        b = etoile(0.16).move_to(g.barres[de].get_top() + UP * 0.2)
        arr = hauteur_vers(g, vers, etat[vers]).get_top() + UP * 0.2
        self.add(b)
        self.play(MoveAlongPath(b, ArcBetweenPoints(b.get_center(), arr, angle=-PI / 2.2)),
                  Transform(g.barres[de], hauteur_vers(g, de, etat[de])),
                  Transform(g.barres[vers], hauteur_vers(g, vers, etat[vers])), run_time=run_time)
        self.play(FadeOut(b, scale=0.4), run_time=0.1)

    def ecran_partage(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-partage")
        g, vals = self.graphe_pret()
        self.au_mot("Que veut dire ce 12")
        q = self.col(self.ligne([("Que veut dire", WHITE), ("12", VERT_OK), ("?", ORANGE_RETENUE)], 44), 2.5)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("les 84 étoiles filantes")
        p1 = self.col(self.ligne([("84", BLEU_CALCUL), ("étoiles partagées", WHITE)], 40), 1.45)
        self.play(FadeIn(p1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("entre les 7 nuits")
        p2 = self.col(self.ligne([("entre", WHITE), ("7", BLEU_CALCUL), ("nuits", WHITE)], 40), 0.75)
        self.play(FadeIn(p2, shift=RIGHT * 0.2), LaggedStart(*[Indicate(e, color=AMBRE) for e in g.etiquettes],
                                                             lag_ratio=0.08), run_time=0.7)
        self.au_mot("Les grandes barres")
        self.play(FadeOut(vals), run_time=0.2)
        etat = list(FIL)
        for (de, vers, n), rt in zip(TRANSFERTS, (0.5, 0.4, 0.4, 0.35, 0.35)):
            self.transfert(g, etat, de, vers, n, rt)
        self.au_mot("arrivent à 12")
        lm = self.ligne_moyenne(g, 12, txt="12")
        douze = VGroup(*[texte(12, 26, NUIT).set_stroke(WHITE, 6, background=True).next_to(g.barres[i], UP, buff=0.14)
                         for i in range(7)])
        self.play(Create(lm[0]), FadeIn(lm[1]), LaggedStart(*[FadeIn(d, scale=1.5) for d in douze], lag_ratio=0.1),
                  run_time=0.9)
        self.au_mot("La moyenne, c'est la part")
        bl = self.col(self.bloc(["La moyenne :", "la part de chacun,", "si on partage tout", "de façon égale."], 36),
                      -1.2)
        bl[0].set_color(VERT_OK)
        self.play(FadeIn(bl, shift=RIGHT * 0.2), run_time=0.6)
        self.insister(bl[0], 1.25, 0.3)
        self.attendre_voix()

    # ── 05 : le tableau d'effectifs, la moyenne pondérée ────────────────────

    VALS_T, EFFS_T = [0, 1, 2, 3, 4], [2, 5, 8, 3, 2]

    def tableau(self, centre=P(-0.6, 1.95)):
        tab = Tableau([str(v) for v in self.VALS_T], [self.EFFS_T], libelles=["Nuits"], coin="Bolides",
                      largeur_case=1.7, largeur_libelle=2.6, hauteur=0.95, fs=40, centre=centre)
        textes_devant(tab)
        return tab

    def fond_tableau(self, tab):
        return VGroup(tab.carte, tab.coin, tab.libelles, *[t[0] for t in tab.tetes], *[c[0] for c in tab.cases[0]])

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-tableau")
        tab = self.tableau()
        n20 = self.ligne([("20", BLEU_CALCUL), ("nuits : les bolides", WHITE)], 34).move_to(P(0, 3.55))
        n20.align_to(tab, LEFT)
        self.play(FadeIn(self.fond_tableau(tab), scale=0.95), FadeIn(n20), run_time=0.5)
        self.au_mot("tableau d'effectifs")
        pos = self.nombres_apres("tableau d'effectifs", 10)
        for j in range(5):
            self.au_i(pos[2 * j])
            self.play(FadeIn(tab.tetes[j][1], scale=1.6), run_time=0.22)
            self.au_i(pos[2 * j + 1])
            self.play(FadeIn(tab.cases[0][j][1], scale=1.6), *allumer(tab, 0, j), run_time=0.25)
            self.play(*eteindre(tab), run_time=0.15)
        self.au_mot("Chaque valeur compte")
        regle = self.t("Chaque valeur compte autant de fois que son effectif.", 36, AMBRE).move_to(P(-0.4, 0.6))
        self.play(FadeIn(regle, shift=UP * 0.2), run_time=0.5)
        morceaux = []
        for j, (v, e) in enumerate(zip(self.VALS_T, self.EFFS_T)):
            if j:
                morceaux.append(("+", WHITE))
            morceaux.append((f"{v}×{e}", BLEU_CALCUL))
        prod = self.ligne(morceaux + [("=", WHITE), ("38", VERT_OK)], 42, 0.22).move_to(P(-0.4, -0.4))
        for j, m in enumerate(["0 fois 2", "1 fois 5", "2 fois 8", "3 fois 3", "4 fois 2"]):
            self.au_mot(m)
            idx = [0] if j == 0 else [2 * j - 1, 2 * j]
            self.play(*[FadeIn(prod[k], scale=1.4) for k in idx], *tab.allumer_colonne(j), run_time=0.28)
            self.play(*eteindre(tab), run_time=0.12)
        self.au_mot("égale 38")
        self.play(FadeIn(prod[-2:], shift=LEFT * 0.2), run_time=0.35)
        self.insister(prod[-1], 1.4, 0.25)
        self.au_mot("L'effectif total")
        morc = [("Effectif total :", WHITE)]
        for j, e in enumerate(self.EFFS_T):
            if j:
                morc.append(("+", WHITE))
            morc.append((str(e), BLEU_CALCUL))
        tot = self.ligne(morc + [("=", WHITE), ("20", VERT_OK)], 42, 0.22).move_to(P(-0.4, -1.45))
        self.play(FadeIn(tot[0], shift=RIGHT * 0.2), *tab.allumer_ligne(0), run_time=0.4)
        for j, p in enumerate(self.nombres_apres("L'effectif total", 5)):
            self.au_i(p)
            idx = [1] if j == 0 else [2 * j, 2 * j + 1]
            self.play(*[FadeIn(tot[k], scale=1.4) for k in idx], run_time=0.22)
        self.au_mot("égale 20")
        self.play(FadeIn(tot[-2:], shift=LEFT * 0.2), *eteindre(tab), run_time=0.35)
        self.au_mot("38 divisé")
        d = self.ligne([("38", VERT_OK), ("÷", WHITE), ("20", VERT_OK)], 52).move_to(P(-4.0, -2.6))
        self.play(FadeIn(d[:2], scale=1.3), run_time=0.3)
        self.au_mot("par 20")
        self.play(FadeIn(d[2], scale=1.5), run_time=0.25)
        self.au_mot("1,9. C'est")
        r = self.ligne([("=", WHITE), ("1,9", VERT_OK)], 52).next_to(d, RIGHT, buff=0.25)
        self.play(FadeIn(r, scale=1.5), run_time=0.3)
        self.au_mot("moyenne pondérée")
        mp = self.t("moyenne pondérée", 44, JAUNE_TITRE).next_to(r, RIGHT, buff=0.6)
        cadre = self.encadrer(VGroup(d, r))
        self.play(Write(mp), Create(cadre), run_time=0.7)
        self.insister(mp, 1.15, 0.3)
        self.attendre_voix()

    # ── 06 : le piège, diviser par 5 ────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        tab = self.tableau()
        self.add(tab)
        self.au_mot("Le piège")
        tit = self.t("Le piège", 50, ROUGE_ERREUR).move_to(P(-4.6, 0.45))
        self.play(Write(tit), run_time=0.5)
        self.au_mot("diviser par 5")
        mauvais = self.ligne([("÷", WHITE), ("5", ROUGE_ERREUR), ("?", ROUGE_ERREUR)], 50).next_to(tit, RIGHT, buff=0.8)
        self.play(FadeIn(mauvais, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("5 colonnes")
        cols = VGroup(*[SurroundingRectangle(VGroup(tab.tetes[j], tab.cases[0][j]), color=ROUGE_ERREUR, buff=0.04,
                                             stroke_width=6) for j in range(5)])
        cinq = self.t("5 colonnes", 38, ROUGE_ERREUR).next_to(tab, DOWN, buff=0.2).align_to(tab, RIGHT)
        self.play(LaggedStart(*[Create(c) for c in cols], lag_ratio=0.15), FadeIn(cinq), run_time=0.8)
        self.au_mot("38 divisé par 5")
        faux = self.ligne([("38", WHITE), ("÷", WHITE), ("5", ROUGE_ERREUR), ("=", WHITE), ("7,6", ROUGE_ERREUR)], 50)
        faux.move_to(P(-2.0, -0.6))
        self.play(FadeOut(mauvais), FadeIn(faux[:3]), run_time=0.35)
        self.au_mot("égale 7,6")
        self.play(FadeIn(faux[3:], scale=1.4), run_time=0.3)
        self.au_mot("faux")
        x = croix(faux, sw=8)
        mot_faux = self.t("faux !", 46, ROUGE_ERREUR).next_to(faux, RIGHT, buff=0.5)
        self.play(Create(x), FadeIn(mot_faux, scale=1.5), run_time=0.4)
        self.au_mot("jamais plus de 4")
        self.play(FadeOut(cols), FadeOut(cinq), Indicate(tab.tetes[4][1], color=ROUGE_ERREUR, scale_factor=1.8),
                  run_time=0.5)
        j4 = self.ligne([("7,6", ROUGE_ERREUR), (">", WHITE), ("4", BLEU_CALCUL), (": impossible !", ROUGE_ERREUR)], 42)
        j4.move_to(P(-1.2, -1.65))
        self.au_mot("Impossible")
        self.play(FadeIn(j4, shift=UP * 0.2), run_time=0.4)
        self.au_mot("On divise toujours")
        bon = self.ligne([("On divise par", WHITE), ("l'effectif total", VERT_OK)], 44).move_to(P(-1.0, -2.7))
        cadre = self.encadrer(bon)
        self.play(FadeIn(bon, shift=UP * 0.2), Create(cadre), *tab.allumer_ligne(0), run_time=0.6)
        self.insister(VGroup(bon, cadre), 1.08, 0.3)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def graphe2(self, **kw):
        return self.graphe(FIL2, titre="La semaine suivante", couleurs=C_BAR2, **kw)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        g = self.graphe2()
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.75)
        self.play(Write(tit), FadeIn(g.fond, scale=0.95), run_time=0.4)
        for i, p in enumerate(self.nombres_apres("ses relevés sont", 7)):
            self.au_i(p)
            v = g.valeur(i, fs=26)
            self.play(GrowFromEdge(g.barres[i], DOWN), FadeIn(v, shift=DOWN * 0.15), run_time=0.24)
        self.au_mot("Quelle est la moyenne")
        q1 = self.col(VGroup(self.ligne([("1.", AMBRE), ("La moyenne,", WHITE)], 36),
                             self.t("arrondie au dixième ?", 36)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), 1.3)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("plus que 12")
        q2 = self.col(self.ligne([("2.", AMBRE), ("Plus que", WHITE), ("12", BLEU_CALCUL), ("?", WHITE)], 36), 0.1)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE), -1.1)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        g = self.graphe2()
        vals = VGroup(*[g.valeur(i, fs=26) for i in range(7)])
        self.add(g, vals)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.75)
        self.play(Write(tit), run_time=0.5)
        s = self.somme_jouee(FIL2, "Correction", vals, 1.85)
        self.au_mot("égale 79")
        tot = self.ligne([("=", WHITE), ("79", VERT_OK)], 46).next_to(s, DOWN, buff=0.22).align_to(s, RIGHT)
        self.play(FadeIn(tot, shift=UP * 0.2), run_time=0.35)
        self.au_mot("79 divisé")
        d = self.col(self.ligne([("79", VERT_OK), ("÷", WHITE), ("7", BLEU_CALCUL)], 50), 0.1)
        self.play(FadeIn(d[:2], scale=1.3), run_time=0.3)
        self.au_mot("par 7")
        self.play(FadeIn(d[2], scale=1.5), run_time=0.25)
        self.au_mot("environ 11,3")
        r = self.ligne([("≈", WHITE), ("11,3", VERT_OK)], 50).next_to(d, RIGHT, buff=0.25)
        lm = self.ligne_moyenne(g, 79 / 7, txt="11,3")
        self.play(FadeIn(r, scale=1.5), Create(lm[0]), FadeIn(lm[1]), run_time=0.5)
        self.insister(r[1], 1.4, 0.25)
        self.au_mot("C'est moins que 12")
        cmp_ = self.col(self.ligne([("11,3", VERT_OK), ("<", WHITE), ("12", BLEU_CALCUL)], 46), -1.0)
        l2 = self.ligne_moyenne(g, 12, couleur=BLEU_CALCUL)
        self.play(FadeIn(cmp_, shift=UP * 0.2), Create(l2), run_time=0.5)
        self.au_mot("le ciel")
        concl = self.col(self.bloc(["Un ciel un peu", "moins généreux."], 32, VERT_OK), -2.0)
        self.play(FadeIn(concl, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        g, vals = self.graphe_pret()
        textes = [("Moyenne = somme", "÷ nombre de valeurs."),
                  ("Tableau : chaque valeur", "× son effectif."),
                  ("On divise par", "l'effectif total.")]
        lignes = self.finale(textes, [1.75, 0.2, -1.35], fs=36)
        self.au_mot("La moyenne, c'est")
        self.montrer_ligne(lignes[0], Create(self.ligne_moyenne(g, 12)))
        self.au_mot("Dans un tableau")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et on divise")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_serie()
        self.ecran_calcul()
        self.ecran_partage()
        self.ecran_tableau()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsMoyenne4e(StatsMoyenneBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"


class StatsMoyenne3e(StatsMoyenneBase):
    """Même vidéo pour la 3e (révision) : identité et ceinture seulement."""

    identite = "Maths 3e — EleveAI"
    ceinture = "orange"
