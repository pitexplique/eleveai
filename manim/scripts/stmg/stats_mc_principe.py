# stats_mc_principe.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE, épisode 27-mc-principe :
# LA DROITE DES MOINDRES CARRÉS (micro du coach statT_mc_principe : « reconnaître
# la droite des moindres carrés comme celle qui minimise la somme des carrés des
# écarts »), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage complète du
# niveau : écart, piège de la somme nulle, carrés, droite, point moyen, défi).
# Short jumeau : stats_mc_principe_short.py (ORANGE).
#
# ⭐ Décor et métier : le COMMERCE EN LIGNE ; une RESPONSABLE LOGISTIQUE d'un site
# de vente en ligne dimensionne ses entrepôts (problématique : prévoir).
# Centres d'intérêt : argent-budget, technologie-ia.
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : chiffre d'affaires du commerce en
# ligne en France (Fevad, bilans annuels), en milliards d'euros :
# 2015 : 64,9 · 2016 : 72,0 (+14,6 %) · 2017 : 81,7 · 2018 : 92,6 (+13,4 %) ·
# 2019 : 103,4 (journaldunet.com, frenchweb.fr, lsa-conso.fr, blogdumoderateur.com).
# ⭐ Calculs vérifiés en Python : x = 1..5 ; droite des moindres carrés
# y = 9,76 x + 53,64 (a = 9,76 exactement, b = 53,64) ; somme des carrés ≈ 6,01 ;
# G(3 ; 82,92) ; droite horizontale y = 82,92 : somme des écarts = 0, somme des
# carrés ≈ 958,59 ; milieu premier/dernier (64,9 + 103,4) / 2 = 84,15.
# ⭐ Figure du coach : `fonctionGraphique` (Nuage de stats_lycee_h2_commun.py),
# droite bleue `affine`. ⛔ PAS D'ÉCART : chaque nombre au mot.
#
# Mapping micro → écrans : tpl_1 (ce que minimise la droite) → 03-07, question 06 ·
# tpl_2 (pourquoi le carré) → 04, 05, défi · tpl_3 (point moyen G) → 08, question 09.
# Écrans : 00 garde · 01 la responsable logistique · 02 les données · 03 l'écart ·
# 04 le piège (somme nulle) · 05 les carrés · 06 QUESTION · 07 la droite ·
# 08 le point moyen · 09 QUESTION · 10 défi · 10b correction · 11 ce que tu as
# appris · 12 fin (règle du 19/10).
#
# Voix : manim/voix/stmg-stats-mc-principe.json (débit −7) ; marques :
# manim/scripts/stmg/stats_mc_principe_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_mc_principe.py StatsMcPrincipeStmg -o eleveai-maths-stmg-stats-mc-principe --media_dir manim/scripts/stmg/media-stats-mc-principe-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/27-mc-principe/eleveai-maths-stmg-stats-mc-principe.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403

XS = [1, 2, 3, 4, 5]
YS = [64.9, 72.0, 81.7, 92.6, 103.4]
A, B = 9.76, 53.64        # la droite des moindres carrés
MY = 82.92                # la moyenne des y (droite horizontale, point G)
G = P(-3.4, -0.25)


def colis(h=1.4):
    """Un carton de livraison dessiné (face, dessus, scotch)."""
    face = Polygon(P(-0.6, -0.5), P(0.6, -0.5), P(0.6, 0.35), P(-0.6, 0.35), fill_color="#b45309", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=3)
    dessus = Polygon(P(-0.6, 0.35), P(0.6, 0.35), P(0.85, 0.6), P(-0.35, 0.6), fill_color="#d97706", fill_opacity=1,
                     stroke_color=WHITE, stroke_width=3)
    cote = Polygon(P(0.6, -0.5), P(0.85, -0.25), P(0.85, 0.6), P(0.6, 0.35), fill_color="#92400e", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=3)
    scotch = Line(P(-0.05, 0.35), P(0.2, 0.6), color=AMBRE, stroke_width=8)
    scotch2 = Line(P(-0.05, 0.35), P(-0.05, -0.5), color=AMBRE, stroke_width=8)
    return VGroup(face, dessus, cote, scotch, scotch2).scale_to_fit_height(h)


class StatsMcPrincipeBase(PaysageJ2):
    nom_voix = "stmg-stats-mc-principe"
    fichier_marques = "stats_mc_principe_marques.json"

    def nuage(self, centre=G):
        return self.cadrer(Nuage(XS, YS, 0, 6, 50, 110, pas_x=1, pas_y=10, fin_x=1, fin_y=5, largeur=5.6, hauteur=4.2,
                                 nom_x="Rang de l'année", nom_y="Chiffre d'affaires (Md€)", fs=24, centre=centre))

    def nuage_pret(self):
        n = self.nuage()
        self.add(n.fond, n.ronds)
        return n

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La droite des moindres carrés", self.identite, self.ceinture)
        n = self.nuage(centre=P(-0.6, 0.0))
        n.scale(0.62).move_to(P(-0.6, 0.05))
        self.au_mot("La droite des moindres carrés")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Parmi toutes les droites")
        self.play(FadeIn(n.fond), FadeIn(n.ronds, scale=2), run_time=0.6)
        d = droite(n, 0, MY, GRIS_D)
        self.play(Create(d), run_time=0.5)
        for a, c in [(4.0, GRIS_D), (14.0, GRIS_D), (A, BLEU_D)]:
            self.play(d.animate.become(droite(n, a, MY - 3 * a, c)), run_time=0.7)
        self.au_mot("la meilleure")
        self.play(Indicate(d, color=BLEU_CLAIR, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : la responsable logistique ──────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        c = colis(1.6).move_to(P(-4.2, 1.3))
        metier = self.t("Responsable logistique", 34, BLEU_CALCUL).move_to(P(-3.75, -0.4))
        self.au_mot("Une responsable logistique")
        self.play(GrowFromCenter(c), FadeIn(metier, shift=UP * 0.2), run_time=0.7)
        self.au_mot("un grand site de vente en ligne")
        self.poser(self.bloc(["Un grand site", "de vente en ligne"], 40, JAUNE_TITRE), 2.2)
        self.au_mot("la taille de ses entrepôts")
        ent = VGroup(*[Rectangle(width=0.55, height=0.4 + 0.25 * k, fill_color=GREY_B, fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=2) for k in range(3)]).arrange(RIGHT, buff=0.1,
                                                                                               aligned_edge=DOWN)
        self.poser(VGroup(self.t("Prévoir ses entrepôts", 38), ent).arrange(RIGHT, buff=0.35), 0.75)
        self.au_mot("le chiffre d'affaires du commerce en ligne")
        self.poser(self.bloc(["Le chiffre d'affaires du", "commerce en ligne en France"], 36), -0.55)
        self.au_mot("la Fevad")
        self.poser(self.t("Source : Fevad", 32, GREY_B), -1.55, "up")
        self.attendre_voix()

    # ── 02 : les données ────────────────────────────────────────────────────

    def ecran_donnees(self):
        self.ecran("02-donnees")
        n = self.nuage()
        self.play(FadeIn(n.fond), run_time=0.3)
        self.au_mot("De 2015")
        l15 = self.ligne([("2015 :", WHITE), ("64,9 Md€", VIOLET_CLAIR)], 38)
        l19 = self.ligne([("2019 :", WHITE), ("103,4 Md€", VIOLET_CLAIR)], 38)
        self.col(l15, 2.6)
        self.col(l19, 1.95)
        self.play(FadeIn(n.ronds[0], scale=3), FadeIn(l15[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("2019")
        self.play(FadeIn(n.ronds[4], scale=3), FadeIn(l19[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("64,9")
        self.play(FadeIn(l15[1]), FadeIn(n.lu_y(64.9)), Create(n.vers_y(0)), run_time=0.35)
        self.au_mot("103,4")
        self.play(FadeIn(l19[1]), FadeIn(n.lu_y(103.4)), Create(n.vers_y(4)), run_time=0.35)
        self.au_mot("En abscisse")
        self.poser(self.bloc(["Abscisse : le rang", "de l'année"], 34, ORANGE_V), 1.0)
        self.play(Indicate(n.nom_x, color=ORANGE_V, scale_factor=1.3), run_time=0.4)
        self.au_mot("de 1 à 5")
        self.play(*[Indicate(n.nx[v], color=ORANGE_V, scale_factor=1.6) for v in (1, 2, 3, 4, 5)], run_time=0.6)
        self.au_mot("En ordonnée")
        self.poser(self.bloc(["Ordonnée : le chiffre", "d'affaires (milliards d'€)"], 34, VIOLET_CLAIR), -0.15)
        self.play(Indicate(n.nom_y, color=VIOLET_H, scale_factor=1.2), run_time=0.4)
        self.au_mot("presque alignés")
        self.apparaitre_points(n, [1, 2, 3], run_time=0.6)
        self.poser(self.t("Presque alignés", 40, VERT_OK), -1.2, "pop")
        self.attendre_voix()

    # ── 03 : l'écart ────────────────────────────────────────────────────────

    def ecran_ecart(self):
        self.ecran("03-ecart")
        n = self.nuage_pret()
        self.au_mot("Je trace une droite")
        d = droite(n, A, B)
        self.play(Create(d), run_time=0.8)
        self.au_mot("l'écart")
        tit = self.titre_col("L'écart d'un point", y=2.7)
        r = residus(n, A, B)
        self.au_mot("la distance verticale")
        self.play(Create(r[0]), Indicate(n.ronds[0], color=AMBRE, scale_factor=1.8), run_time=0.6)
        self.poser(self.bloc(["la distance VERTICALE", "entre le point et la droite"], 34, AMBRE), 1.65)
        self.au_mot("la valeur observée")
        f = self.ligne([("écart =", WHITE), ("observé", ROUGE_PT), ("−", WHITE), ("prévu", BLEU_CLAIR)], 40)
        self.poser(f, 0.55, "pop")
        self.insister(f, 1.12, 0.3)
        self.au_mot("Au-dessus de la droite")
        self.play(Create(r[1]), Create(r[2]), Create(r[3]), Create(r[4]), run_time=0.6)
        haut = self.ligne([("au-dessus :", WHITE), ("écart positif", VERT_OK)], 34)
        self.poser(haut, -0.45)
        self.play(Indicate(r[0], color=VERT_OK), Indicate(r[4], color=VERT_OK), run_time=0.5)
        self.au_mot("en dessous")
        bas = self.ligne([("en dessous :", WHITE), ("écart négatif", ROUGE_ERREUR)], 34)
        self.poser(bas, -1.2)
        self.play(Indicate(r[1], color=ROUGE_ERREUR), Indicate(r[2], color=ROUGE_ERREUR), run_time=0.5)
        self.attendre_voix()

    # ── 04 : le piège (somme nulle) ─────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("04-piege")
        n = self.nuage_pret()
        self.au_mot("Le piège")
        tit = self.col(VGroup(self.t("Le piège :", 46, ROUGE_ERREUR), self.t("additionner les écarts", 40, ROUGE_ERREUR))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 2.65)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("Cette droite horizontale")
        d = droite(n, 0, MY, GRIS_D)
        self.play(Create(d), run_time=0.7)
        self.au_mot("82,92")
        self.poser(self.ligne([("y =", WHITE), ("82,92", VIOLET_CLAIR)], 40), 1.35)
        self.play(FadeIn(n.lu_y(MY)), run_time=0.4)
        self.au_mot("se compensent")
        r = residus(n, 0, MY)
        signes = VGroup(*[n.etiquette(i, "+" if YS[i] > MY else "−", RIGHT, VERT_OK if YS[i] > MY else ROUGE_ERREUR,
                                      fs=34) for i in range(5)])
        self.play(LaggedStart(*[Create(s) for s in r], lag_ratio=0.2), run_time=0.9)
        self.play(FadeIn(signes), run_time=0.4)
        self.au_mot("leur somme vaut 0")
        s = self.ligne([("somme des écarts =", WHITE), ("0", AMBRE)], 40)
        self.poser(s, 0.35, "pop")
        self.insister(s[1], 1.6)
        self.au_mot("très mauvaise")
        m = self.poser(self.t("Pourtant, très mauvaise !", 40, ROUGE_ERREUR), -0.65, "pop")
        self.play(Flash(n.ronds[0], color=ROUGE_ERREUR), Flash(n.ronds[4], color=ROUGE_ERREUR), run_time=0.6)
        self.attendre_voix()

    # ── 05 : les carrés ─────────────────────────────────────────────────────

    def ecran_carres(self):
        self.ecran("05-carres")
        n = self.nuage_pret()
        self.add(droite(n, 0, MY, GRIS_D))
        r = residus(n, 0, MY)
        self.add(r)
        self.au_mot("élever chaque écart au carré")
        tit = self.titre_col("Chaque écart au carré", ROSE_CLAIR, y=2.75)
        cs = carres(n, 0, MY)
        self.play(LaggedStart(*[GrowFromEdge(c, LEFT) for c in cs], lag_ratio=0.2), run_time=1.2)
        self.au_mot("jamais négatif")
        self.poser(self.bloc(["Un carré n'est jamais négatif :", "rien ne se compense."], 34), 1.7)
        self.au_mot("les grands écarts pèsent plus")
        self.poser(self.t("Les grands écarts pèsent plus :", 34), 0.65)
        self.au_mot("un écart de 2 compte 4")
        p2 = VGroup(Square(0.3, color=ROSE_C, fill_opacity=0.4), self.ligne([("2", AMBRE), ("→", WHITE), ("4", ROSE_CLAIR)], 36))
        p2.arrange(RIGHT, buff=0.25)
        self.poser(p2, -0.1, "pop")
        self.au_mot("un écart de 4 compte 16")
        p4 = VGroup(Square(0.6, color=ROSE_C, fill_opacity=0.4), self.ligne([("4", AMBRE), ("→", WHITE), ("16", ROSE_CLAIR)], 36))
        p4.arrange(RIGHT, buff=0.25)
        self.poser(p4, -0.1, "pop", xl=3.6)
        self.au_mot("la somme des carrés vaut environ 958,6")
        s = self.ligne([("somme des carrés ≈", WHITE), ("958,6", ROUGE_ERREUR)], 38)
        self.poser(s, -1.1, "pop")
        self.insister(s[1], 1.4)
        self.attendre_voix()

    # ── 06 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        n = self.nuage()
        fig = VGroup(n.fond, n.ronds, droite(n, A, B))

        def reponse(s):
            s.play(LaggedStart(*[GrowFromEdge(c, LEFT) for c in carres(n, A, B)], lag_ratio=0.15), run_time=0.7)

        self.ecran_question("06-question", "06b-reponse", ["Que rend la plus petite possible", "la droite des moindres carrés ?"],
                            ["somme des écarts", "somme des carrés des écarts", "nombre de points au-dessus"], 1,
                            ["La somme des écarts peut valoir 0", "pour une très mauvaise droite ;", "la somme des carrés, non."],
                            figure=fig, autres_r=reponse, mot_q="Que rend")

    # ── 07 : la droite des moindres carrés ──────────────────────────────────

    def ecran_droite(self):
        self.ecran("07-droite")
        n = self.nuage_pret()
        self.au_mot("La droite des moindres carrés")
        self.poser(self.bloc(["La droite des moindres carrés :", "la plus PETITE somme", "des carrés des écarts"], 36,
                             JAUNE_TITRE), 2.35)
        d = droite(n, A, B)
        self.play(Create(d), run_time=0.8)
        self.au_mot("La calculatrice la donne")
        calc = RoundedRectangle(width=0.55, height=0.8, corner_radius=0.08, fill_color="#334155", fill_opacity=1,
                                stroke_color=WHITE, stroke_width=2)
        ecr = Rectangle(width=0.4, height=0.2, fill_color="#a7f3d0", fill_opacity=1, stroke_width=0).move_to(calc).shift(UP * 0.2)
        self.au_mot("9,76 x")
        eq = self.ligne([("y =", WHITE), ("9,76x + 53,64", BLEU_CLAIR)], 40)
        g = VGroup(VGroup(calc, ecr), eq).arrange(RIGHT, buff=0.3)
        self.poser(g, 0.85, "pop")
        self.insister(eq, 1.1, 0.3)
        self.au_mot("Sa somme des carrés vaut environ 6")
        cs = carres(n, A, B)
        self.play(LaggedStart(*[GrowFromEdge(c, LEFT) for c in cs], lag_ratio=0.15), run_time=0.8)
        s = self.ligne([("somme des carrés ≈", WHITE), ("6", VERT_OK)], 38)
        self.poser(s, -0.2, "pop")
        self.au_mot("aucune autre droite ne fait mieux")
        self.poser(self.t("Aucune autre droite ne fait mieux.", 34, VERT_OK), -1.15)
        self.attendre_voix()

    # ── 08 : le point moyen ─────────────────────────────────────────────────

    def ecran_point_moyen(self):
        self.ecran("08-point-moyen")
        n = self.nuage_pret()
        self.add(droite(n, A, B))
        self.au_mot("le point moyen G")
        self.titre_col("Le point moyen G", VIOLET_CLAIR, y=2.75)
        self.au_mot("la moyenne des rangs")
        l1 = self.poser(self.t("Moyenne des rangs :", 32, ORANGE_V), 2.0)
        self.poser(self.ligne([("(1 + 2 + … + 5) ÷ 5 =", WHITE), ("3", ORANGE_V)], 32), 1.45)
        self.play(Create(n.verticale(3)), FadeIn(n.lu_x(3), scale=1.5), run_time=0.6)
        self.au_mot("la moyenne des chiffres d'affaires")
        self.poser(self.t("Moyenne des chiffres d'affaires :", 32, VIOLET_CLAIR), 0.75)
        self.poser(self.ligne([("(64,9 + … + 103,4) ÷ 5 =", WHITE), ("82,92", VIOLET_CLAIR)], 32), 0.2)
        self.play(Create(n.horizontale(MY)), FadeIn(n.lu_y(MY), scale=1.3), run_time=0.6)
        self.au_mot("G a pour coordonnées")
        gp = point_moyen(n, 3, MY)
        self.play(GrowFromCenter(gp), run_time=0.5)
        self.play(Flash(gp[0], color=VIOLET_CLAIR), run_time=0.5)
        res = self.ligne([("G", VIOLET_CLAIR), ("(3 ; 82,92)", WHITE)], 44)
        self.poser(res, -0.6, "pop")
        self.poser(self.t("La droite passe toujours par G.", 32, VERT_OK), -1.45)
        self.attendre_voix()

    # ── 09 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage()
        fig = VGroup(n.fond, n.ronds)

        def reponse(s):
            s.play(Create(n.verticale(3)), Create(n.horizontale(MY)), GrowFromCenter(point_moyen(n, 3, MY)), run_time=0.7)

        self.ecran_question("09-question", "09b-reponse", ["Coordonnées du point moyen G ?"],
                            ["(3 ; 82,92)", "(82,92 ; 3)", "(3 ; 84,15)"], 0,
                            ["B inverse abscisse et ordonnée ; 84,15 :", "milieu du premier et du dernier relevé,", "pas la moyenne des cinq."],
                            figure=fig, autres_r=reponse, mot_q="Quelles sont")

    # ── 10 : défi + correction ──────────────────────────────────────────────

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        n = self.nuage_pret()
        self.add(droite(n, 0, MY, GRIS_D))
        self.au_mot("À toi de jouer")
        self.titre_col("À toi de jouer !", y=2.7, fs=50)
        self.au_mot("Vrai ou faux")
        self.poser(self.t("Vrai ou faux ?", 38, AMBRE), 1.85)
        self.au_mot("Un : une droite")
        self.poser(self.bloc(["1. Somme des écarts = 0", "→ c'est forcément la meilleure."], 34), 0.95)
        self.au_mot("Deux : un écart de 3")
        q2 = VGroup(Square(0.15, color=ROSE_C, fill_opacity=0.4), Square(0.45, color=ROSE_C, fill_opacity=0.4)).arrange(RIGHT, buff=0.2, aligned_edge=DOWN)
        self.poser(VGroup(self.bloc(["2. Un écart de 3 pèse 9 fois", "plus qu'un écart de 1."], 34), q2).arrange(RIGHT, buff=0.3), -0.35)
        self.pause_defi(y=-1.5)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        n = self.nuage_pret()
        self.add(droite(n, 0, MY, GRIS_D), residus(n, 0, MY))
        self.titre_col("Correction", y=2.7, fs=50)
        self.au_mot("Un : faux")
        self.poser(self.ligne([("1.", AMBRE), ("Faux !", ROUGE_ERREUR)], 42), 1.8, "pop")
        self.au_mot("une somme des écarts nulle")
        self.poser(self.ligne([("somme des écarts :", WHITE), ("0", AMBRE)], 34), 1.05)
        self.au_mot("et pourtant une somme des carrés")
        sc = self.col(self.ligne([("somme des carrés :", WHITE), ("958,6", ROUGE_ERREUR)], 34), 0.4)
        self.play(FadeIn(sc[0]), LaggedStart(*[GrowFromEdge(c, LEFT) for c in carres(n, 0, MY)], lag_ratio=0.15),
                  run_time=0.6)
        self.au_mot("958,6")
        self.play(FadeIn(sc[1]), run_time=0.3)
        self.au_mot("Deux : vrai")
        self.poser(self.ligne([("2.", AMBRE), ("Vrai !", VERT_OK)], 42), -0.45, "pop")
        self.au_mot("3 au carré fait 9")
        self.poser(self.ligne([("3² = 9", ROSE_CLAIR), ("et", WHITE), ("1² = 1", ROSE_CLAIR)], 38), -1.25)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        n = self.nuage_pret()
        d = droite(n, A, B)
        self.add(d)
        lignes = self.finale_colonne(figure=VGroup(n, d), textes=[("Écart = observé − prévu", "par la droite."),
                                                                  ("La droite des moindres carrés :", "la plus petite somme", "des carrés des écarts."),
                                                                  ("Elle passe par le", "point moyen G.")])
        self.au_mot("L'écart d'un point")
        self.montrer_ligne(lignes[0], Create(residus(n, A, B)))
        self.au_mot("La droite des moindres carrés")
        self.montrer_ligne(lignes[1], LaggedStart(*[GrowFromEdge(c, LEFT) for c in carres(n, A, B)], lag_ratio=0.1))
        self.au_mot("Elle passe par le point moyen")
        self.montrer_ligne(lignes[2], GrowFromCenter(point_moyen(n, 3, MY)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_ecart()
        self.ecran_piege()
        self.ecran_carres()
        self.ecran_question1()
        self.ecran_droite()
        self.ecran_point_moyen()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class StatsMcPrincipeStmg(StatsMcPrincipeBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
