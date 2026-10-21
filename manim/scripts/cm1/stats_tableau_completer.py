# stats_tableau_completer.py
# EleveAI — Maths CM1 ET CM2 — série « Statistiques », épisode 02 : COMPLÉTER
# UN TABLEAU (micro du coach : tableau_completer, banque
# cm1/maths/tableaux.bank.ts, canvas `tableau_donnees`), AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE : trouver une case vide grâce au total (une
# soustraction, puis la vérification par une addition), deux crans au-dessus
# du « je vois ». Short jumeau : stats_tableau_completer_short.py (jaune).
#
# ⭐ Décor et métier : l'ENVIRONNEMENT, la plage de l'Étang-Salé ; un
# TECHNICIEN DE L'ENVIRONNEMENT ramasse les déchets avec deux classes et les
# compte (bouteilles, bouchons, canettes, sacs plastique).
# ⭐ La figure est CELLE DU COACH (canvas_stats.Tableau = `tableau_donnees`),
# colonne « Total » à droite ; la case vide est un « ? » orange qui devient
# le nombre. À côté, une BARRE coupée en deux (ce que je connais + ce qui
# manque = le total) fait VOIR la soustraction, puis le piège (8 + 20 = 28
# dépasse la barre du total).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 la plage, le technicien, deux classes · 02 les
# bouteilles (14 + 9 = 23) · 03 les bouchons (25 + 31 = 56) · 04 les canettes :
# la case vide (20 − 8 = 12) · 05 je vérifie (8 + 12 = 20) · 06 le piège
# (8 + 20 = 28 > 20) · 07 défi (sacs : 40 en tout, 23) · 07b correction
# (40 − 23 = 17 ; 23 + 17 = 40) · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/cm-stats-tableau-completer.json (débit −10), WAV dans
# public/sons/cm-stats-tableau-completer/ ; calage mot à mot :
# manim/scripts/cm1/statscm_tableau_completer_marques.json.
# ⭐ UNE voix, UN script, DEUX rendus : StatsTableauCompleterCM2 ne change que
# l'identité (« Maths CM2 — EleveAI »). La voix ne cite aucune classe.
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_tableau_completer.py StatsTableauCompleterCM1 -o eleveai-maths-cm1-stats-tableau-completer --media_dir manim/scripts/cm1/media-tableau-completer
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_tableau_completer.py StatsTableauCompleterCM2 -o eleveai-maths-cm2-stats-tableau-completer --media_dir manim/scripts/cm1/media-tableau-completer-cm2
# Sorties : manim/sorties/cm1/maths/statistiques/02-tableau-completer/ et
#           manim/sorties/cm2/maths/statistiques/02-tableau-completer/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_tableau_commun import *  # noqa: E402,F403
from stats_tableau_commun import P, BaseTableauPaysage  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, BORD_TABLEAU, NUIT, ORANGE_Q, Tableau  # noqa: E402

DECHETS = ["Bouteilles", "Bouchons", "Canettes", "Sacs plastique"]
COLONNES = ["Classe 1", "Classe 2", "Total"]
VALEURS = [[14, 9, 23], [25, 31, 56], [8, 12, 20], [23, 17, 40]]
SABLE, MER = "#fde68a", "#0ea5e9"
CONNU, MANQUE = "#60a5fa", ORANGE_RETENUE   # la barre : ce que je connais / ce qui manque


# ── les dessins : déchets, enfants ──────────────────────────────────────────

def bouteille(s=1.0):
    corps = RoundedRectangle(width=0.36 * s, height=0.8 * s, corner_radius=0.1 * s, fill_color="#38bdf8",
                             fill_opacity=0.8, stroke_color=WHITE, stroke_width=2)
    col = Rectangle(width=0.16 * s, height=0.22 * s, fill_color="#38bdf8", fill_opacity=0.8, stroke_color=WHITE,
                    stroke_width=2).next_to(corps, UP, buff=0)
    bouchon = Rectangle(width=0.2 * s, height=0.09 * s, fill_color="#2563eb", fill_opacity=1,
                        stroke_width=0).next_to(col, UP, buff=0)
    return VGroup(corps, col, bouchon)


def bouchon(s=1.0):
    return VGroup(Circle(radius=0.16 * s, fill_color="#ef4444", fill_opacity=1, stroke_color=WHITE, stroke_width=2),
                  Circle(radius=0.09 * s, stroke_color=WHITE, stroke_width=1.5))


def canette(s=1.0):
    corps = RoundedRectangle(width=0.36 * s, height=0.62 * s, corner_radius=0.06 * s, fill_color="#dc2626",
                             fill_opacity=1, stroke_color="#e5e7eb", stroke_width=3)
    bande = Rectangle(width=0.36 * s, height=0.12 * s, fill_color="#e5e7eb", fill_opacity=1,
                      stroke_width=0).move_to(corps)
    return VGroup(corps, bande)


def sac(s=1.0):
    pts = [(-0.3, -0.35), (0.3, -0.35), (0.25, 0.25), (0.12, 0.25), (0.1, 0.42), (-0.1, 0.42), (-0.12, 0.25),
           (-0.25, 0.25)]
    return Polygon(*[P(x * s, y * s) for x, y in pts], fill_color="#f8fafc", fill_opacity=0.85,
                   stroke_color="#94a3b8", stroke_width=2).round_corners(0.04 * s)


def enfant(couleur, s=1.0):
    tete = Circle(radius=0.16 * s, fill_color="#d6a77a", fill_opacity=1, stroke_width=0)
    corps = RoundedRectangle(width=0.42 * s, height=0.5 * s, corner_radius=0.15 * s, fill_color=couleur,
                             fill_opacity=1, stroke_width=0).next_to(tete, DOWN, buff=0.04 * s)
    return VGroup(tete, corps)


def groupe(couleur, n=4, s=0.8):
    return VGroup(*[enfant(couleur, s) for _ in range(n)]).arrange(RIGHT, buff=0.08)


class StatsTableauCompleterBase(BaseTableauPaysage):
    nom_voix = "cm-stats-tableau-completer"
    fichier_marques = "statscm_tableau_completer_marques.json"
    identite = "Maths CM1 — EleveAI"
    XL = 1.45
    G = P(-2.83, -0.3)  # le centre du tableau

    # ── le tableau et la barre ──────────────────────────────────────────────

    def tableau(self, pleines=0, cases=None):
        """Le tableau des déchets : les `pleines` premières lignes remplies, plus
        les cases {(r, c): valeur} données (non ajouté)."""
        lignes = [list(VALEURS[r]) if r < pleines else [None] * 3 for r in range(4)]
        for (r, c), v in (cases or {}).items():
            lignes[r][c] = v
        tab = Tableau(COLONNES, lignes, libelles=DECHETS, coin="Déchets", largeur_case=1.75, largeur_libelle=2.45,
                      hauteur=0.85, fs=28, titre="Déchets ramassés", centre=self.G)
        # un trait plus épais avant la colonne du total
        x = tab.case(0, 2).get_left()[0]
        sep = Line(P(x, tab.tetes[2].get_top()[1]), P(x, tab.case(3, 2).get_bottom()[1]), color=NUIT, stroke_width=5)
        tab.add(sep.set_z_index(5))
        return textes_devant(tab)

    def tableau_pret(self, pleines=0, cases=None):
        tab = self.tableau(pleines, cases)
        self.add(tab)
        return tab

    def barre(self, total, connu, y, longueur=4.6):
        """Deux barres calées à gauche dans la colonne de droite : en haut le
        TOTAL, en bas ce que je CONNAIS + ce qui MANQUE. Rien n'est ajouté.
        Renvoie (haut, bas_connu, bas_manque) ; chaque morceau = VGroup(rect, place du texte)."""
        u = longueur / total
        x0 = self.XL + 0.15
        h = 0.55

        def morceau(v, x, yy, fond, contour=WHITE):
            r = Rectangle(width=v * u, height=h, fill_color=fond, fill_opacity=0.9, stroke_color=contour,
                          stroke_width=3).move_to(P(x + v * u / 2, yy))
            return r

        haut = morceau(total, x0, y + 0.36, "#166534", VERT_OK)
        bas_c = morceau(connu, x0, y - 0.36, "#1e3a8a", CONNU)
        bas_m = morceau(total - connu, x0 + connu * u, y - 0.36, "#7c2d12", MANQUE)
        return haut, bas_c, bas_m

    def dans(self, rect, s, color=WHITE, fs=34):
        t = self.t(s, fs, color).move_to(rect)
        if t.width > rect.width - 0.1:
            t.scale_to_fit_width(rect.width - 0.1)
        return t

    def calcul(self, morceaux, y, fs=48):
        """Une ligne de calcul « 14 + 9 = 23 » posée dans la colonne de droite."""
        return self.col(self.ligne(morceaux, fs, 0.25), y)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        ti, ident, ech = self.garde("Compléter un tableau", "orange")
        tab = Tableau(["Classe 1", "Classe 2", "Total"], [[None] * 3, [None] * 3], libelles=["Bouteilles", "Canettes"],
                      coin="", largeur_case=1.25, largeur_libelle=2.0, hauteur=0.6, fs=24, centre=P(-0.6, 0.15))
        self.play(Write(ti), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tab, scale=0.9), run_time=0.6)
        self.play(*allumer(tab, 1, 1), run_time=0.35)  # « Une case vide » : les premiers mots
        self.insister(tab.case(1, 1), 1.3, 0.25)
        self.au_mot("On peut la trouver")
        self.play(remplir(tab, 1, 1, "?"), run_time=0.4)
        self.insister(tab.texte_case(1, 1), 1.6, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la plage, le technicien, deux classes ──────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        sable = Rectangle(width=8.2, height=2.2, fill_color=SABLE, fill_opacity=0.9, stroke_width=0)
        sable.move_to(P(-2.9, -1.9))
        mer = VGroup(*[FunctionGraph(lambda u: 0.08 * np.sin(5 * u), x_range=[-3.9, 3.9], color=MER, stroke_width=5)
                       .move_to(P(-2.9, -0.55 + 0.32 * k)) for k in range(3)])
        lieu = self.t("Plage de l'Étang-Salé", 40, JAUNE_TITRE).move_to(P(-2.9, 2.9))
        self.au_mot("Sur la plage")
        self.play(FadeIn(sable), Create(mer), Write(lieu), run_time=0.8)
        dechets = VGroup(bouteille(0.9).rotate(1.2).move_to(P(-5.6, -1.6)), bouchon(1.2).move_to(P(-4.3, -2.4)),
                         canette(1.0).rotate(-0.5).move_to(P(-1.6, -1.5)), sac(1.1).move_to(P(-0.3, -2.3)),
                         bouchon(1.0).move_to(P(-3.0, -1.4)), bouteille(0.8).rotate(-1.4).move_to(P(-2.4, -2.55)))
        self.play(LaggedStart(*[FadeIn(d, scale=0.5) for d in dechets], lag_ratio=0.12), run_time=0.8)
        self.au_mot("deux classes")
        g1 = groupe("#3b82f6").move_to(P(-4.7, 1.25))
        g2 = groupe("#a855f7").move_to(P(-1.1, 1.25))
        e1 = self.t("Classe 1", 30, "#93c5fd").next_to(g1, UP, buff=0.15)
        e2 = self.t("Classe 2", 30, "#d8b4fe").next_to(g2, UP, buff=0.15)
        self.play(FadeIn(g1, shift=UP * 0.3), FadeIn(g2, shift=UP * 0.3), FadeIn(e1), FadeIn(e2), run_time=0.6)
        self.au_mot("un technicien")
        metier = self.col(self.bloc(["Technicien", "de l'environnement"], 40, BLEU_CALCUL), 2.2, xl=1.9)
        self.play(FadeIn(metier, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Son métier")
        m1 = self.col(self.bloc(["Son métier :", "protéger la nature"], 38), 0.55, xl=1.9)
        m1[1].set_color(VERT_OK)
        self.play(FadeIn(m1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("et compter")
        m2 = self.col(self.bloc(["et compter", "ce qui la salit"], 38, ORANGE_RETENUE), -1.0, xl=1.9)
        self.play(FadeIn(m2, shift=RIGHT * 0.2),
                  LaggedStart(*[Indicate(d, color=ORANGE_RETENUE, scale_factor=1.3) for d in dechets], lag_ratio=0.1),
                  run_time=1.0)
        self.attendre_voix()

    # ── 02 et 03 : une ligne, puis son total ────────────────────────────────

    def ligne_total(self, r, icone, mots):
        """mots = (nom, case 0, case 1, « le total », a « plus », b, égale/total)."""
        a, b, tot = VALEURS[r]
        tab = self.tableau_pret(pleines=r)
        self.au_mot(mots[0])
        tete = self.col(VGroup(icone, self.t(DECHETS[r], 46, JAUNE_TITRE)).arrange(RIGHT, buff=0.35), 2.3)
        self.play(FadeIn(tete, shift=RIGHT * 0.2), *teinter_ligne(tab, r), run_time=0.35)
        for c, mot in ((0, mots[1]), (1, mots[2])):
            self.au_mot(mot)
            self.play(remplir(tab, r, c, VALEURS[r][c]), run_time=0.25)
        self.au_mot(mots[3])
        self.play(Indicate(tab.tetes[2][1], color=AMBRE, scale_factor=1.3), *allumer(tab, r, 2), run_time=0.5)
        calc = self.calcul([(str(a), CONNU), ("+", WHITE), (str(b), CONNU), ("=", WHITE), (str(tot), VERT_OK)], 0.7)
        self.au_mot(mots[4])
        self.play(FadeIn(calc[0], scale=1.5), FadeIn(calc[1]), Indicate(tab.texte_case(r, 0), color=BLEU_CALCUL),
                  run_time=0.4)
        self.au_mot(mots[5])
        self.play(FadeIn(calc[2], scale=1.5), Indicate(tab.texte_case(r, 1), color=BLEU_CALCUL), run_time=0.4)
        self.au_mot(mots[6])
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=1.5), remplir(tab, r, 2, tot), run_time=0.45)
        self.play(Create(self.encadre(calc)), run_time=0.35)
        self.insister(calc[4], 1.4, 0.25)
        self.attendre_voix()

    def ecran_ligne1(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-ligne1")
        self.ligne_total(0, bouteille(0.8), ("Les bouteilles", "14 pour", "9 pour", "Le total", "14 plus", "9 :", "23"))

    def ecran_ligne2(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ligne2")
        self.ligne_total(1, bouchon(1.6), ("Les bouchons", "25 et", "31.", "Le total", "25 plus", "31,", "56"))

    # ── 04 : la case vide ───────────────────────────────────────────────────

    def ecran_case_vide(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-case-vide")
        tab = self.tableau_pret(pleines=2)
        self.au_mot("Les canettes")
        tete = self.col(VGroup(canette(1.0), self.t("Canettes", 46, JAUNE_TITRE)).arrange(RIGHT, buff=0.35), 2.3)
        self.play(FadeIn(tete, shift=RIGHT * 0.2), *teinter_ligne(tab, 2), run_time=0.5)
        self.au_mot("8 pour")
        self.play(remplir(tab, 2, 0, 8), run_time=0.35)
        self.au_mot("20. Combien")
        self.play(remplir(tab, 2, 2, 20), *allumer(tab, 2, 2), run_time=0.4)
        haut, bas_c, bas_m = self.barre(20, 8, 0.95)
        t_haut = self.dans(haut, "20 en tout")
        self.play(GrowFromEdge(haut, LEFT), FadeIn(t_haut), run_time=0.5)
        self.au_mot("Combien pour la deuxième")
        self.play(remplir(tab, 2, 1, "?"), *allumer(tab, 2, 1, anneau=ORANGE_Q), run_time=0.4)
        self.insister(tab.texte_case(2, 1), 1.5, 0.25)
        self.au_mot("Je cherche ce qui manque")
        t_c = self.dans(bas_c, "8")
        t_m = self.dans(bas_m, "?", WHITE, 40)
        self.play(GrowFromEdge(bas_c, LEFT), FadeIn(t_c), run_time=0.45)
        self.play(GrowFromEdge(bas_m, LEFT), FadeIn(t_m, scale=1.5), run_time=0.45)
        calc = self.calcul([("20", VERT_OK), ("−", WHITE), ("8", CONNU), ("=", WHITE), ("12", ORANGE_RETENUE)], -0.75)
        self.au_mot("20 moins")
        self.play(FadeIn(calc[0], scale=1.5), FadeIn(calc[1]), Indicate(VGroup(haut, t_haut), color=VERT_OK,
                                                                       scale_factor=1.05), run_time=0.4)
        self.au_mot("8, égale")
        self.play(FadeIn(calc[2], scale=1.5), FadeIn(calc[3]), Indicate(VGroup(bas_c, t_c), scale_factor=1.1),
                  run_time=0.4)
        self.au_mot("12.")
        t_12 = self.dans(bas_m, "12")
        self.play(FadeIn(calc[4], scale=1.5), Transform(t_m, t_12), remplir(tab, 2, 1, 12), run_time=0.45)
        self.play(Create(self.encadre(calc, ORANGE_RETENUE)), run_time=0.35)
        self.insister(tab.texte_case(2, 1), 1.6, 0.25)
        self.attendre_voix()

    # ── 05 : je vérifie ─────────────────────────────────────────────────────

    def ecran_verifie(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-verifie")
        tab = self.tableau_pret(pleines=3)
        haut, bas_c, bas_m = self.barre(20, 8, 1.2)
        barres = VGroup(haut, self.dans(haut, "20"), bas_c, self.dans(bas_c, "8"), bas_m, self.dans(bas_m, "12"))
        self.au_mot("Je vérifie")
        titre = self.col(self.t("Je vérifie", 46, JAUNE_TITRE), 2.55)
        self.play(Write(titre), FadeIn(barres), *teinter_ligne(tab, 2), run_time=0.5)
        calc = self.calcul([("8", CONNU), ("+", WHITE), ("12", ORANGE_RETENUE), ("=", WHITE), ("20", VERT_OK)], -0.4)
        self.au_mot("8 plus")
        self.play(FadeIn(calc[0], scale=1.5), FadeIn(calc[1]), Indicate(tab.texte_case(2, 0)), run_time=0.4)
        self.au_mot("12, égale")
        self.play(FadeIn(calc[2], scale=1.5), FadeIn(calc[3]), Indicate(tab.texte_case(2, 1)), run_time=0.4)
        self.au_mot("20.")
        self.play(FadeIn(calc[4], scale=1.5), *allumer(tab, 2, 2), run_time=0.4)
        self.au_mot("C'est juste")
        ok = self.col(VGroup(self.coche(VERT_OK, 0.3), self.t("C'est juste !", 44, VERT_OK)).arrange(RIGHT, buff=0.3),
                      -1.5)
        # les deux morceaux du bas mis bout à bout font exactement la barre du haut
        trait = DashedLine(haut.get_corner(UR) + UP * 0.1, bas_m.get_corner(DR) + DOWN * 0.1, color=VERT_OK,
                           stroke_width=5)
        self.play(FadeIn(ok, scale=0.7), Create(trait), run_time=0.5)
        self.insister(ok, 1.15, 0.3)
        self.attendre_voix()

    # ── 06 : le piège, 8 + 20 ───────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        tab = self.tableau_pret(pleines=2, cases={(2, 0): 8, (2, 1): "?", (2, 2): 20})
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.6)
        self.play(Write(titre), *teinter_ligne(tab, 2), run_time=0.5)
        L = 3.4
        haut, bas_c, _ = self.barre(20, 8, 1.15, longueur=L)
        t_haut = self.dans(haut, "20")
        self.play(FadeIn(VGroup(haut, t_haut)), run_time=0.3)
        self.au_mot("8 et 20")
        calc = self.calcul([("8", CONNU), ("+", WHITE), ("20", VERT_OK), ("=", WHITE), ("28", ROUGE_ERREUR)], -0.45)
        trop = Rectangle(width=20 * L / 20, height=bas_c.height, fill_color="#7f1d1d", fill_opacity=0.9,
                         stroke_color=ROUGE_ERREUR, stroke_width=3).next_to(bas_c, RIGHT, buff=0)
        self.play(FadeIn(calc[:2], shift=RIGHT * 0.2), GrowFromEdge(bas_c, LEFT), FadeIn(self.dans(bas_c, "8")),
                  Indicate(tab.texte_case(2, 0)), run_time=0.4)
        self.au_mot("20. Ça")
        self.play(FadeIn(calc[2], shift=RIGHT * 0.2), GrowFromEdge(trop, LEFT), FadeIn(self.dans(trop, "20")),
                  Indicate(tab.texte_case(2, 2)), run_time=0.5)
        self.au_mot("28,")
        self.play(FadeIn(calc[3:], scale=1.4), run_time=0.4)
        self.au_mot("plus que le total")
        bord = DashedLine(haut.get_corner(UR) + UP * 0.15, haut.get_corner(DR) + DOWN * 0.95, color=AMBRE,
                          stroke_width=5)
        depasse = Rectangle(width=trop.get_right()[0] - haut.get_right()[0], height=trop.height, fill_opacity=0,
                            stroke_color=ROUGE_ERREUR, stroke_width=7).align_to(trop, RIGHT).align_to(trop, DOWN)
        x = croix(calc[4].copy().scale(1.1), sw=6)
        self.play(Create(bord), Create(depasse), Create(x), run_time=0.5)
        self.insister(depasse, 1.12, 0.25)
        self.au_mot("Une case de la ligne")
        regle = self.col(self.bloc(["Une case ne peut pas", "dépasser le total"], 38, ORANGE_RETENUE), -1.65)
        self.play(FadeIn(regle, shift=RIGHT * 0.2), *allumer(tab, 2, 2), run_time=0.5)
        self.attendre_voix()

    # ── 07 : défi, 07b : correction ─────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        tab = self.tableau_pret(pleines=3)
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.45)
        tete = self.col(VGroup(sac(1.0), self.t("Sacs plastique", 40)).arrange(RIGHT, buff=0.3), 1.4)
        self.play(Write(titre), FadeIn(tete, shift=RIGHT * 0.2), *teinter_ligne(tab, 3), run_time=0.6)
        self.au_mot("40 en tout")
        self.play(remplir(tab, 3, 2, 40), *allumer(tab, 3, 2), run_time=0.4)
        self.au_mot("23.")
        self.play(remplir(tab, 3, 0, 23), run_time=0.4)
        self.au_mot("Combien pour la deuxième")
        q = self.col(self.bloc(["Combien pour", "la classe 2 ?"], 40), 0.15)
        self.play(remplir(tab, 3, 1, "?"), FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(tab.texte_case(3, 1), 1.5, 0.25)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -1.2)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        tab = self.tableau_pret(pleines=3, cases={(3, 0): 23, (3, 1): "?", (3, 2): 40})
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.6)
        haut, bas_c, bas_m = self.barre(40, 23, 1.3)
        t_h, t_c, t_m = self.dans(haut, "40 en tout"), self.dans(bas_c, "23"), self.dans(bas_m, "?", WHITE, 40)
        self.play(Write(titre), *teinter_ligne(tab, 3), FadeIn(VGroup(haut, t_h, bas_c, t_c, bas_m, t_m)), run_time=0.6)
        c1 = self.calcul([("40", VERT_OK), ("−", WHITE), ("23", CONNU), ("=", WHITE), ("17", ORANGE_RETENUE)], 0.0)
        self.au_mot("40 moins")
        self.play(FadeIn(c1[:2], scale=1.3), Indicate(VGroup(haut, t_h), color=VERT_OK, scale_factor=1.05), run_time=0.4)
        self.au_mot("23, égale")
        self.play(FadeIn(c1[2:4], scale=1.3), Indicate(VGroup(bas_c, t_c), scale_factor=1.1), run_time=0.4)
        self.au_mot("17.")
        self.play(FadeIn(c1[4], scale=1.5), Transform(t_m, self.dans(bas_m, "17")), remplir(tab, 3, 1, 17),
                  *allumer(tab, 3, 1), run_time=0.45)
        self.insister(c1[4], 1.4, 0.25)
        self.au_mot("je vérifie")
        c2 = self.calcul([("23", CONNU), ("+", WHITE), ("17", ORANGE_RETENUE), ("=", WHITE), ("40", VERT_OK)], -1.15,
                         fs=42)
        self.au_mot("23 plus")
        self.play(FadeIn(c2[:2], scale=1.3), run_time=0.35)
        self.au_mot("17, égale")
        self.play(FadeIn(c2[2:4], scale=1.3), run_time=0.35)
        self.au_mot("40.")
        coche = self.coche(VERT_OK, 0.3).next_to(c2, RIGHT, buff=0.3)
        self.play(FadeIn(c2[4], scale=1.5), Create(coche), *allumer(tab, 3, 2), run_time=0.45)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        tab = self.tableau_pret(pleines=4)
        # le tableau rétrécit à gauche : les phrases gardent une taille lisible
        tab.scale(0.8).to_edge(LEFT, buff=0.25).shift(DOWN * 0.3)
        self.XL = tab.get_right()[0] + 0.35
        lignes = self.finale([["Le total = la somme", "de la ligne."],
                              ["Case vide : le total", "moins ce que je connais."],
                              ["Je vérifie avec", "une addition."]])
        self.au_mot("Le total, c'est")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), *teinter_colonne(tab, 2), run_time=0.5)
        self.au_mot("la somme")
        self.play(*teinter(tab, [(0, 0), (0, 1)], BLEU_PALE), *allumer(tab, 0, 2), Create(lignes[0][0]), run_time=0.5)
        self.au_mot("Pour une case vide")
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), *allumer(tab, 3, 1, anneau=ORANGE_Q), run_time=0.5)
        self.au_mot("moins ce que je connais")
        self.play(Indicate(tab.texte_case(3, 2), color=VERT_OK, scale_factor=1.5),
                  Indicate(tab.texte_case(3, 0), color=BLEU_CALCUL, scale_factor=1.5), Create(lignes[1][0]),
                  run_time=0.8)
        self.au_mot("Puis je vérifie")
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), run_time=0.5)
        self.play(Create(lignes[2][0]), run_time=0.4)
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ligne1()
        self.ecran_ligne2()
        self.ecran_case_vide()
        self.ecran_verifie()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class StatsTableauCompleterCM1(StatsTableauCompleterBase):
    identite = "Maths CM1 — EleveAI"


class StatsTableauCompleterCM2(StatsTableauCompleterBase):
    """Même vidéo pour le CM2 : seule l'identité change."""

    identite = "Maths CM2 — EleveAI"
