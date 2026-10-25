# stats_ajust_au_juge.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE : 21-ajust-au-juge
# (micro du coach statT_ajust_au_juge : « Tracer une droite d'ajustement affine
# au jugé »), AVEC VOIX. Paysage 16:9. CEINTURE VERTE (la paysage complète :
# poser la règle, la faire glisser, corriger a ou b, le piège du premier et du
# dernier point, défi corrigé). Short jumeau : stats_ajust_au_juge_short.py (JAUNE).
#
# ⭐ Décor et métier : le COMMERCE EN LIGNE (centres d'intérêt : argent-budget,
# technologie-ia) ; un RESPONSABLE E-COMMERCE prépare le budget de sa boutique
# (problématique : prévoir, décider).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 par WebSearch : dépenses des
# Français sur internet (bilans annuels de la Fevad), en milliards d'euros :
#   2014 56,8 · 2015 64,9 · 2016 72,0 · 2017 81,7 · 2018 92,6 · 2019 103,4.
#   (2015 : 64,9, +14,3 % ; 2016 : 72, +14,6 % ; 2018 : 92,6, +13,4 % ; 2019 :
#   103,4, +11,6 %, toute-la-franchise.com et journaldunet.com d'après la Fevad ;
#   2014 = 64,9 / 1,143 et 2017 = 92,6 / 1,134, cohérents avec ces hausses.)
#   Droite au jugé de la vidéo : passe par (2014 ; 55) et (2019 ; 102), soit
#   +9,4 milliards par an (moindres carrés : +9,3). Droite « premier-dernier
#   point » : au-dessus des quatre points du milieu (nuage légèrement courbé).
# ⭐ Figure du coach : `fonctionGraphique`, droite BLEUE. ⛔ PAS D'ÉCART.
#
# Mapping micro → écrans : statT_ajust_au_juge tpl_1 (la droite convient-elle ?)
# → 03, question 04, 06, défi (1) · tpl_2 (corriger : a = direction, b = hauteur)
# → 05, question 07, défi (2).
# Écrans : 00 garde · 01 le responsable e-commerce · 02 les données · 03 la
# règle qui glisse · 04 QUESTION · 05 corriger a ou b · 06 le piège (premier et
# dernier point) · 07 QUESTION · 08 défi · 08b correction · 09 ce que tu as
# appris · 10 fin (règle du 19/10).
#
# Voix : manim/voix/stmg-stats-ajust-au-juge.json (débit −7) ; marques :
# manim/scripts/stmg/stats_ajust_au_juge_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_ajust_au_juge.py StatsAjustAuJugeStmg -o eleveai-maths-stmg-stats-ajust-au-juge --media_dir manim/scripts/stmg/media-stats-ajust-au-juge-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/21-ajust-au-juge/eleveai-maths-stmg-stats-ajust-au-juge.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j1_commun import *  # noqa: E402,F403

ANS = [2014, 2015, 2016, 2017, 2018, 2019]
ECOM = [56.8, 64.9, 72.0, 81.7, 92.6, 103.4]
A_J, B_J = 9.4, 55.0          # la droite au jugé : y = 9,4 (x − 2014) + 55
VIOLET_D = "#7c3aed"
ROUGE_D = "#dc2626"
VERT_D = "#16a34a"
G = P(-3.45, -0.3)


def D(n, A, B, couleur=BLEU_D, sw=6):
    """La droite y = A (x − 2014) + B dans le nuage n."""
    return droite(n, A, B - A * 2014, couleur, sw)


def chariot(l=1.4, couleur="#f59e0b"):
    """Un chariot de course dessiné (le commerce en ligne)."""
    panier = Polygon(P(-0.5, 0.25), P(0.55, 0.25), P(0.42, -0.2), P(-0.38, -0.2), fill_color=couleur,
                     fill_opacity=1, stroke_color=WHITE, stroke_width=3).scale(l)
    poignee = Line(P(-0.5, 0.25) * l, P(-0.72, 0.5) * l, color=WHITE, stroke_width=6)
    roues = VGroup(*[Circle(radius=0.08 * l, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(
        P(dx, -0.33) * l) for dx in (-0.28, 0.3)])
    return VGroup(panier, poignee, roues)


class StatsAjustAuJugeBase(PaysageJ1):
    nom_voix = "stmg-stats-ajust-au-juge"
    fichier_marques = "stats_ajust_au_juge_marques.json"

    def nuage(self, centre=G):
        n = Nuage(ANS, ECOM, 2012, 2020, 40, 120, pas_x=2, pas_y=20, fin_x=1, fin_y=10, largeur=5.6, hauteur=4.2,
                  nom_x="Année", nom_y="Dépenses en ligne (milliards d'€)", fs=24, centre=centre)
        return self.cadrer(annees(n))

    def pret(self):
        n = self.nuage()
        self.add(n.fond, *n.ronds)
        return n

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Tracer une droite au jugé", self.identite, self.ceinture)
        n = self.nuage().scale(0.62).move_to(P(-0.6, 0.15))
        self.au_mot("Tracer une droite")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(n), run_time=0.7)
        self.au_mot("Où poser la règle")
        d = D(n, A_J, B_J + 22)
        self.play(Create(d), run_time=0.5)
        self.play(Transform(d, D(n, A_J, B_J)), run_time=1.0)
        self.attendre_voix(marge=0.8)

    # ── 01 : le responsable e-commerce ──────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        self.au_mot("Un responsable e-commerce")
        ch = chariot(1.6).move_to(P(-3.6, 1.0))
        m = self.t("Responsable e-commerce", 38, BLEU_CALCUL).move_to(P(-3.2, -0.8))
        self.play(FadeIn(ch, shift=RIGHT * 0.4), FadeIn(m, shift=UP * 0.2), run_time=0.6)
        self.au_mot("prépare le budget")
        self.poser(self.bloc(["Il prépare le budget", "de sa boutique en ligne."], 38), 2.4)
        self.au_mot("ce que les Français dépensent")
        self.poser(self.bloc(["Ce que les Français", "dépensent sur internet,", "chaque année"], 38, JAUNE_TITRE), 0.75)
        self.au_mot("d'après la Fevad")
        self.poser(self.bloc(["Source : la Fevad, fédération", "du e-commerce"], 30, GREY_A), -0.85)
        self.attendre_voix()

    # ── 02 : les données ────────────────────────────────────────────────────

    def ecran_donnees(self):
        self.ecran("02-donnees")
        n = self.nuage()
        self.play(FadeIn(n.fond), run_time=0.3)
        self.au_mot("2014 à")
        self.play(FadeIn(lu_annee(n, 2014), scale=1.4), run_time=0.3)
        self.au_mot("2019 :")
        self.play(FadeIn(lu_annee(n, 2019), scale=1.4), run_time=0.3)
        mots = ["56,8 milliards", "64,9", "72,", "81,7", "92,6", "103,4"]
        vals = ["56,8", "64,9", "72", "81,7", "92,6", "103,4"]
        lig = VGroup()
        for i, (mot, v) in enumerate(zip(mots, vals)):
            self.au_mot(mot)
            t = self.t(v, 34, VIOLET_CLAIR)
            lig.add(t)
            lig.arrange(RIGHT, buff=0.3)
            self.col(lig, 2.55 if i < 3 else 2.55)
            self.play(FadeIn(n.ronds[i], scale=3), FadeIn(t, shift=UP * 0.15), run_time=0.3)
        self.poser(self.t("milliards d'euros", 32), 1.85)
        self.au_mot("Les points montent")
        self.poser(self.bloc(["Les points montent,", "presque alignés"], 38, VERT_OK), 0.75)
        self.au_mot("un ajustement affine est pertinent")
        self.poser(self.t("→ ajustement affine pertinent", 32), -0.25, "pop")
        self.attendre_voix()

    # ── 03 : la règle qui glisse ────────────────────────────────────────────

    def ecran_methode(self):
        self.ecran("03-methode")
        n = self.pret()
        self.au_mot("Je pose ma règle")
        d = D(n, A_J, B_J + 24)
        self.poser(self.bloc(["1. La règle dans la", "direction du nuage"], 36), 2.6)
        self.play(Create(d), run_time=0.7)
        self.au_mot("Trop haut")
        self.poser(self.ligne([("Trop haut :", ROUGE_ERREUR), ("tous dessous", WHITE)], 34), 1.6)
        self.play(*[Indicate(r, color=AMBRE, scale_factor=1.5) for r in n.ronds], run_time=0.5)
        self.au_mot("Trop bas")
        self.play(Transform(d, D(n, A_J, B_J - 22)), run_time=0.8)
        self.poser(self.ligne([("Trop bas :", ROUGE_ERREUR), ("tous dessus", WHITE)], 34), 0.95)
        self.au_mot("Je la fais glisser")
        self.play(Transform(d, D(n, A_J, B_J)), run_time=1.0)
        self.poser(self.bloc(["2. Je la fais glisser", "jusqu'au milieu"], 36), 0.0)
        self.au_mot("des points des deux côtés")
        r = residus(n, A_J, B_J - A_J * 2014)
        self.play(Create(r), run_time=0.6)
        self.poser(self.bloc(["des points des deux côtés,", "tous au plus près"], 34, VERT_OK), -1.25)
        self.au_mot("Voilà une droite")
        self.play(FadeOut(r), d.animate.set_stroke(width=9), run_time=0.4)
        self.play(d.animate.set_stroke(width=6), run_time=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        n = self.nuage()
        d = D(n, A_J, B_J + 18)
        fig = VGroup(n.fond, *n.ronds, d)

        def reponse(s):
            s.play(Transform(d, D(n, A_J, B_J)), run_time=0.8)

        self.ecran_question("04-question", "04b-reponse", ["Cette droite est-elle", "un bon ajustement ?"],
                            ["oui : bonne direction", "non : au-dessus de tous", "oui : près d'un point"], 1,
                            ["La bonne direction ne suffit pas :", "elle doit passer au milieu."],
                            figure=fig, autres_r=reponse, mots_q=["Cette droite", "un bon ajustement"],
                            mots_choix=["oui, elle a", "non, elle", "oui, elle touche"],
                            mots_ph=["La bonne direction", "une droite d'ajustement passe"])

    # ── 05 : corriger a ou b ────────────────────────────────────────────────

    def ecran_corriger(self):
        self.ecran("05-corriger")
        n = self.pret()
        self.au_mot("deux réglages")
        self.titre_col("Deux réglages", JAUNE_TITRE, 2.95, 44)
        d = D(n, A_J, B_J)
        self.add(d)
        self.au_mot("Sa direction")
        self.poser(self.ligne([("a", AMBRE), (": la direction", WHITE)], 38), 2.0)
        self.au_mot("il la fait tourner")
        pivot = n.p(2016.5, A_J * 2.5 + B_J)
        self.play(Rotate(d, 0.22, about_point=pivot), run_time=0.6)
        self.play(Rotate(d, -0.44, about_point=pivot), run_time=0.8)
        self.play(Rotate(d, 0.22, about_point=pivot), run_time=0.6)
        self.au_mot("Sa hauteur")
        self.poser(self.ligne([("b", VIOLET_CLAIR), (": la hauteur", WHITE)], 38), 1.1)
        self.au_mot("monter ou descendre")
        self.play(Transform(d, D(n, A_J, B_J + 14)), run_time=0.45)
        self.play(Transform(d, D(n, A_J, B_J - 14)), run_time=0.6)
        self.play(Transform(d, D(n, A_J, B_J)), run_time=0.45)
        self.au_mot("sans la tourner")
        self.poser(self.t("(sans la tourner)", 30, GREY_A), 0.45)
        self.au_mot("Une droite trop haute")
        self.play(Transform(d, D(n, A_J, B_J + 18)), run_time=0.6)
        self.poser(self.bloc(["Trop haute, bien orientée :", "je baisse seulement b"], 34, VERT_OK), -0.6)
        self.au_mot("Je baisse seulement b")
        fl = Arrow(n.p(2019.5, 118), n.p(2019.5, 106), buff=0, color=VIOLET_CLAIR, stroke_width=6)
        self.play(Transform(d, D(n, A_J, B_J)), GrowArrow(fl), run_time=0.9)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("06-piege")
        n = self.pret()
        self.au_mot("Le piège")
        self.titre_col("Le piège :", ROUGE_ERREUR, 2.95, 46)
        self.poser(self.bloc(["relier le premier", "et le dernier point"], 38, ROUGE_ERREUR), 2.0)
        a_pd = (103.4 - 56.8) / 5
        d = D(n, a_pd, 56.8, ROUGE_D)
        self.play(n.allumer(0), n.allumer(5), run_time=0.4)
        self.play(Create(d), run_time=0.8)
        self.au_mot("au-dessus de tous les points du milieu")
        r = VGroup(*[Line(n.ronds[i].get_center(), n.p(ANS[i], a_pd * (ANS[i] - 2014) + 56.8), color=AMBRE,
                          stroke_width=5) for i in (1, 2, 3, 4)])
        self.play(Create(r), *[Indicate(n.ronds[i], color=AMBRE, scale_factor=1.6) for i in (1, 2, 3, 4)],
                  run_time=0.7)
        self.poser(self.bloc(["Elle passe au-dessus", "des points du milieu"], 34), 0.75)
        self.au_mot("n'a pas besoin de toucher")
        self.play(FadeOut(r), Transform(d, D(n, A_J, B_J)), n.eteindre(0), n.eteindre(5), run_time=0.8)
        f = self.poser(self.bloc(["Une droite d'ajustement n'a", "pas besoin de toucher", "un seul point."], 34,
                                 JAUNE_TITRE), -0.65, "pop")
        self.insister(f, 1.06, 0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage()
        d = D(n, A_J, B_J - 16)
        fig = VGroup(n.fond, *n.ronds, d)

        def reponse(s):
            s.play(Transform(d, D(n, A_J, B_J)), run_time=0.8)

        self.ecran_question("07-question", "07b-reponse", ["Bonne direction, mais", "entièrement en dessous.",
                                                           "Que modifier ?"],
                            ["augmenter b", "changer a", "rien : elle est parallèle"], 0,
                            ["a ne bouge pas :", "on remonte la droite avec b."],
                            figure=fig, autres_r=reponse, mots_q=["Une droite a", "passe entièrement", "Que faut-il"],
                            mots_choix=["augmenter b", "changer a", "rien, elle"], mots_ph=["donc a ne bouge", "on remonte"])

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def trois(self, n):
        rouge = D(n, 16.0, 40.0, ROUGE_D)          # trop penchée
        verte = D(n, A_J, B_J, VERT_D)             # au milieu
        violette = D(n, A_J, B_J - 15, VIOLET_D)   # trop basse
        return rouge, verte, violette

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        n = self.pret()
        r, v, w = self.trois(n)
        self.au_mot("À toi de jouer")
        self.titre_col("À toi de jouer", JAUNE_TITRE, 2.85, 50)
        self.au_mot("la rouge")
        self.play(Create(r), run_time=0.4)
        self.au_mot("la verte")
        self.play(Create(v), run_time=0.4)
        self.au_mot("et la violette")
        self.play(Create(w), run_time=0.4)
        self.poser(self.ligne([("rouge", "#f87171"), ("·", WHITE), ("verte", "#4ade80"), ("·", WHITE),
                               ("violette", VIOLET_CLAIR)], 36), 2.0)
        self.au_mot("Un : laquelle")
        self.poser(self.bloc(["1. Laquelle est un bon", "ajustement ?"], 34), 1.05)
        self.au_mot("Deux : pour chacune")
        self.poser(self.bloc(["2. Pour les deux autres :", "changer a ou b ?"], 34), -0.15)
        self.pause_defi(-1.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        n = self.pret()
        r, v, w = self.trois(n)
        self.add(r, v, w)
        self.titre_col("Correction", JAUNE_TITRE, 2.85, 50)
        self.au_mot("la verte")
        self.play(v.animate.set_stroke(width=10), r.animate.set_opacity(0.3), w.animate.set_opacity(0.3), run_time=0.4)
        self.poser(self.ligne([("1.", AMBRE), ("la verte", "#4ade80"), (": au milieu", WHITE)], 36), 1.95)
        self.au_mot("la rouge monte trop vite")
        self.play(r.animate.set_opacity(1).set_stroke(width=8), v.animate.set_stroke(width=6), run_time=0.4)
        self.poser(self.ligne([("2.", AMBRE), ("rouge :", "#f87171"), ("trop penchée →", WHITE), ("a", AMBRE)], 34),
                   1.0)
        self.au_mot("changer sa direction")
        pivot = n.p(2016.5, A_J * 2.5 + B_J)
        self.play(Rotate(r, -np.arctan(0.04), about_point=pivot), run_time=0.3)
        self.play(Transform(r, D(n, A_J, B_J, ROUGE_D)), run_time=0.8)
        self.au_mot("La violette")
        self.play(w.animate.set_opacity(1).set_stroke(width=8), run_time=0.4)
        self.poser(self.ligne([("violette :", VIOLET_CLAIR), ("trop basse →", WHITE), ("b ↗", VIOLET_CLAIR)], 34), 0.15)
        self.au_mot("il faut augmenter b")
        self.play(Transform(w, D(n, A_J, B_J, VIOLET_D)), run_time=0.8)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        n = self.pret()
        lignes = self.finale_colonne(figure=n, textes=[
            ("Au jugé : la direction du nuage,", "au milieu, des points des deux", "côtés, au plus près."),
            ("Corriger : a règle la direction,", "b règle la hauteur."),
            ("Elle n'a pas besoin de passer", "par les points.")])
        d = D(n, A_J, B_J)
        self.au_mot("suit la direction du nuage")
        self.montrer_ligne(lignes[0], Create(d))
        self.au_mot("Pour la corriger")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et elle n'a pas besoin")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_corriger()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsAjustAuJugeStmg(StatsAjustAuJugeBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
