# stats_rep_barres.py
# EleveAI — Maths 1re (tronc commun) — série « Statistiques », lycée, épisode 07 :
# LIRE UN DIAGRAMME EN BARRES QUI CROISE DEUX CARACTÈRES. Micro du coach
# info_rep_barres (notion info_representations_croisees). AVEC VOIX. Paysage 16:9.
# CEINTURE ORANGE : lecture d'une part DANS un groupe, son complément à 100 %,
# un effectif ; un cran sous la paysage verte. Short jumeau :
# stats_rep_barres_short.py (jaune).
#
# ⭐ Décor et métier : le NUMÉRIQUE ; une SOCIOLOGUE DU NUMÉRIQUE étudie l'usage
# quotidien des IA génératives selon l'âge (problématique : lire juste, ne pas
# renverser un pourcentage). Centres d'intérêt : technologie-ia.
# Source : Baromètre du numérique, édition 2026 (Crédoc pour l'Arcep, l'Arcom, le
# CGE et l'ANCT), infographie « Usage quotidien d'IA générative par tranche
# d'âge », enquête du 5 au 21 juin 2025 auprès de 4 145 personnes ; lu le
# 24/10/2026 : https://www.arcep.fr/uploads/tx_gspublication/barometre-du-numerique-edition-2026_INFOGRAPHIE.pdf
# 12-17 ans 26 % · 18-24 ans 51 % · 25-39 ans 46 % · 40-59 ans 27 % · 60 ans et + 17 %.
# Calculs (Python) : 100 − 51 = 49 ; 100 − 26 = 74 ; 800 × 0,26 = 208 (lycée
# IMAGINÉ, dit « imagine ») ; 26 + 51 + 46 + 27 + 17 = 167 ; 100 − 27 = 73 ;
# 300 × 0,46 = 138.
#
# Mapping micro → écrans (banque information-chiffree, info_rep_barres) :
# info_rep_barres_lire → 02, 03 · info_rep_barres_complement → 04, question 1,
# défi 1 · info_rep_barres_effectif (le % s'applique au GROUPE) → 06, défi 2 ·
# lire une part DANS un groupe, pas dans le tout → 07 piège, question 2.
# Écrans : 00 garde · 01 le Baromètre, la sociologue · 02 les repères · 03 lire
# les 18-24 · 04 le complément · 05 question 1 · 06 un effectif · 07 le piège
# (167 %) · 08 question 2 · 09 défi · 09b correction · 10 ce que tu as appris ·
# 11 fin (règle du 19/10).
# ⛔ PAS D'ÉCART : une valeur ne s'écrit qu'au mot où la voix la dit.
#
# Voix : manim/voix/1re-stats-rep-barres.json (débit −7) ; calage :
# manim/scripts/premiere/stats_rep_barres_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/premiere/stats_rep_barres.py StatsRepBarresPremiere -o eleveai-maths-premiere-commun-stats-rep-barres --media_dir manim/scripts/premiere/media-stats-rep-barres
# Sortie : manim/sorties/premiere-commun/maths/statistiques/07-rep-barres/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from stats_lycee_i1_commun import *  # noqa: E402,F403

AGES = ["12-17", "18-24", "25-39", "40-59", "60 +"]
PARTS = [26, 51, 46, 27, 17]
VIOLET_B = "#a5b4fc"


def telephone(h=2.2):
    """Un téléphone, une bulle de question et une bulle de réponse d'IA."""
    corps = RoundedRectangle(width=h * 0.52, height=h, corner_radius=0.12 * h, fill_color="#1e293b", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=4)
    ecran = RoundedRectangle(width=h * 0.44, height=h * 0.84, corner_radius=0.06 * h, fill_color="#0b1220",
                             fill_opacity=1, stroke_width=0).move_to(corps)
    b1 = RoundedRectangle(width=h * 0.3, height=h * 0.12, corner_radius=0.04 * h, fill_color=BLEU_CALCUL,
                          fill_opacity=1, stroke_width=0).move_to(ecran.get_top() + DOWN * h * 0.16 + RIGHT * h * 0.05)
    b2 = RoundedRectangle(width=h * 0.34, height=h * 0.22, corner_radius=0.04 * h, fill_color="#334155",
                          fill_opacity=1, stroke_width=0).move_to(b1.get_center() + DOWN * h * 0.25 + LEFT * h * 0.03)
    etoile = Star(n=4, outer_radius=h * 0.05, inner_radius=h * 0.018, fill_color=AMBRE, fill_opacity=1,
                  stroke_width=0).move_to(b2.get_corner(UL) + RIGHT * h * 0.05 + DOWN * h * 0.05)
    return VGroup(corps, ecran, b1, b2, etoile)


class StatsRepBarresBase(PaysageI1):
    nom_voix = "1re-stats-rep-barres"
    fichier_marques = "stats_rep_barres_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"
    XL = 1.0

    def graphe(self, centre=None, **kw):
        opts = dict(pas=10, sous_pas=5, maxi=60, couleurs=[VIOLET_B] * 5, nom_axe="%",
                    titre="IA chaque jour, selon l'âge (en %)", largeur=4.6, hauteur=3.5, fs=28, colonne_lue=True,
                    centre=ORIGIN if centre is None else centre)
        opts.update(kw)
        g = Barres(AGES, PARTS, **opts)
        return caser(g) if centre is None else g

    def graphe_pret(self):
        g = self.graphe()
        self.add(g)
        return g

    def lire(self, g, i, v, run=0.5):
        """Le geste de lecture complet : je monte, je vais vers l'axe, la valeur lue."""
        fl, tr, lu = g.monter(i), g.vers_axe(i, jusqu_au_lu=True), g.lu(v)
        self.play(GrowArrow(fl), run_time=run)
        self.play(Create(tr), FadeIn(lu, scale=1.6), run_time=run)
        return VGroup(fl, tr, lu)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire un diagramme en barres croisé", self.identite, self.ceinture)
        g = self.graphe(centre=P(-0.6, -0.1), largeur=3.6, hauteur=2.0, fs=22, titre=None, nom_axe=None,
                        colonne_lue=False, pas=20, sous_pas=None)
        self.au_mot("Lire un diagramme")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9), run_time=0.7)
        self.play(g.pousser(run_time=0.8))
        self.add(g)
        self.au_mot("la hauteur d'une barre")
        q = self.t("?", 90, ORANGE_RETENUE).next_to(g, RIGHT, buff=0.5)
        self.play(g.focus(1, 0.35), FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : le Baromètre, la sociologue ────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        tel = telephone(2.6).move_to(P(-4.4, -0.2))
        self.au_mot("4 145 personnes")
        nb = self.ligne([("4 145", JAUNE_TITRE), ("personnes", WHITE)], 42).move_to(P(-3.6, 2.85))
        date = self.t("juin 2025", 32, GREY_A).next_to(nb, DOWN, buff=0.15)
        self.play(FadeIn(nb, scale=0.7), FadeIn(date), run_time=0.5)
        self.au_mot("Une des questions")
        self.play(FadeIn(tel, shift=UP * 0.3), run_time=0.5)
        self.au_mot("chaque jour ?")
        q = self.bloc(["IA générative", "chaque jour ?"], 34, AMBRE).next_to(tel, RIGHT, buff=0.35)
        self.play(FadeIn(q, shift=RIGHT * 0.2), Indicate(tel[3], color=AMBRE), run_time=0.6)
        self.au_mot("Une sociologue du numérique")
        metier = self.col(self.t("Sociologue du numérique", 42, BLEU_CALCUL), 2.7, xl=1.3)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("selon l'âge")
        role = self.col(self.t("étudie les réponses selon l'âge", 32), 2.05, xl=1.3)
        self.play(FadeIn(role), run_time=0.4)
        self.au_mot("Deux caractères se croisent")
        c1 = self.col(self.ligne([("1.", AMBRE), ("l'âge", WHITE)], 38), 0.9, xl=1.6)
        self.play(FadeIn(c1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("et l'usage quotidien")
        c2 = self.col(self.ligne([("2.", AMBRE), ("l'usage : oui / non", WHITE)], 38), 0.1, xl=1.6)
        croix_ = self.t("×", 60, AMBRE).move_to(P(1.25, 0.5))
        self.play(FadeIn(c2, shift=RIGHT * 0.2), FadeIn(croix_, scale=0.5), run_time=0.5)
        self.insister(VGroup(c1, c2, croix_), 1.08, 0.3)
        self.attendre_voix()

    # ── 02 : les repères ────────────────────────────────────────────────────

    def ecran_reperes(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-reperes")
        g = self.graphe()
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.3)
        r1 = self.col(self.ligne([("une barre", AMBRE), ("=", WHITE), ("un groupe d'âge", WHITE)], 38), 2.5)
        self.play(g.pousser(run_time=0.9), FadeIn(r1, shift=RIGHT * 0.2))
        self.add(g)
        self.play(LaggedStart(*[Indicate(e, color=AMBRE, scale_factor=1.4) for e in g.etiquettes], lag_ratio=0.2),
                  run_time=1.0)
        self.au_mot("Sa hauteur")
        r2 = self.col(self.bloc(["sa hauteur = la part", "DANS ce groupe"], 38), 1.35)
        r2[1][:4].set_color(AMBRE)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), g.focus(1, 0.35), run_time=0.6)
        self.au_mot("gradué de 10 en 10")
        self.play(g.rallumer(), run_time=0.3)
        r3 = self.col(self.ligne([("un grand trait :", WHITE), ("+ 10", BLEU_CALCUL)], 36), 0.05)
        self.play(FadeIn(r3, shift=RIGHT * 0.2), Indicate(g.nombre(10), color=AMBRE, scale_factor=1.6),
                  Indicate(g.nombre(20), color=AMBRE, scale_factor=1.6), run_time=0.7)
        self.au_mot("le petit trait")
        petits = VGroup(*[g.trait(v) for v in sorted(g.traits) if v not in g.nombres])
        self.play(*[m.animate.scale(2.6).set_color(AMBRE) for m in petits], run_time=0.4)
        self.au_mot("vaut 5 de plus")
        r4 = self.col(self.ligne([("un petit trait :", AMBRE), ("+ 5", VERT_OK)], 36), -0.75)
        self.play(FadeIn(r4, shift=RIGHT * 0.2), *[m.animate.scale(1 / 2.6).set_color(NUIT) for m in petits],
                  run_time=0.5)
        self.insister(r4[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 03 : lire les 18-24 ans ─────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lire")
        g = self.graphe_pret()
        self.au_mot("Je lis les 18 à 24 ans")
        tit = self.col(self.t("Les 18-24 ans", 48, JAUNE_TITRE), 2.6)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), g.focus(1, 0.35), run_time=0.5)
        self.au_mot("Je monte")
        fl = g.monter(1)
        self.play(GrowArrow(fl), run_time=0.6)
        self.au_mot("puis je vais vers l'axe")
        tr = g.vers_axe(1)
        self.play(Create(tr), run_time=0.6)
        self.au_mot("juste au-dessus de 50")
        n50 = g.nombre(50)
        e = self.col(self.ligne([("juste au-dessus de", WHITE), ("50", WHITE)], 38), 1.55)
        self.play(FadeIn(e, shift=RIGHT * 0.2), n50.animate.scale(1.7).set_color(AMBRE), run_time=0.4)
        self.play(n50.animate.scale(1 / 1.7).set_color(ENCRE), run_time=0.3)
        self.au_mot("L'étude donne 51 %")
        lu = g.lu(51)
        etu = self.col(self.ligne([("l'étude :", WHITE), ("51 %", VERT_OK)], 40), 0.7)
        self.play(FadeIn(lu, scale=1.6), FadeIn(etu, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Donc 51 %")
        res = self.col(self.bloc(["51 % DES 18-24 ans", "utilisent une IA", "chaque jour"], 34), -0.85,
                       xl=self.XL + 0.25)
        res[0][:3].set_color(VERT_OK)
        cadre = self.encadrer(res)
        self.play(FadeIn(res, scale=0.8), run_time=0.5)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 04 : le complément ──────────────────────────────────────────────────

    def ecran_complement(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-complement")
        g = self.graphe_pret()
        self.play(g.focus(1, 0.35), FadeIn(g.lu(51)), run_time=0.4)
        self.au_mot("Et les autres")
        tit = self.col(self.t("Et les autres ?", 48, JAUNE_TITRE), 2.75)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("les deux parts font 100 %")
        L, y = 5.2, 1.35
        x0 = self.XL + 0.1
        cadre = Rectangle(width=L, height=0.62, stroke_color=WHITE, stroke_width=3).move_to(P(x0 + L / 2, y))
        oui = Rectangle(width=L * 0.51, height=0.62, fill_color=VERT_OK, fill_opacity=0.85, stroke_width=0)
        oui.move_to(P(x0 + L * 0.51 / 2, y))
        non = Rectangle(width=L * 0.49, height=0.62, fill_color=ORANGE_RETENUE, fill_opacity=0.85, stroke_width=0)
        non.move_to(P(x0 + L * 0.51 + L * 0.49 / 2, y))
        t_oui = self.t("51 %", 30, WHITE).move_to(oui)
        t100 = self.t("100 %", 30, GREY_A).next_to(cadre, UP, buff=0.1)
        self.play(Create(cadre), FadeIn(t100), run_time=0.4)
        self.play(GrowFromEdge(oui, LEFT), FadeIn(t_oui), run_time=0.5)
        self.au_mot("100 moins 51")
        c = self.col(self.ligne([("100", WHITE), ("−", WHITE), ("51", WHITE)], 50), 0.45)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 49")
        eg = self.ligne([("=", WHITE), ("49 %", ORANGE_RETENUE)], 50).next_to(c, RIGHT, buff=0.25)
        t_non = self.t("49 %", 30, WHITE).move_to(non)
        self.play(FadeIn(eg, scale=0.7), GrowFromEdge(non, RIGHT), FadeIn(t_non), run_time=0.5)
        self.insister(eg[1], 1.35, 0.25)
        self.au_mot("ne l'utilisent pas")
        res = self.col(self.bloc(["49 % des 18-24 ans :", "pas chaque jour"], 36), -0.85)
        res[0][:3].set_color(ORANGE_RETENUE)
        self.play(FadeIn(res, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 05 : question 1 (le complément des 12-17 ans) ───────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.graphe_pret()

        def montrer():
            self.play(FadeIn(g.lu(26), scale=1.5), Create(g.vers_axe(0, jusqu_au_lu=True)), run_time=0.5)

        self.question_pause("05-question", "05b-reponse", ["12-17 ans : 26 %.", "Qui ne s'en sert PAS ?"],
                            ["74 %", "26 %", "49 %"], 0, ["100 − 26 = 74 %", "B : la barre ; C : autre groupe"],
                            x0=self.XL + 0.2, largeur=5.0, ys=(0.95, 0.0, -0.95),
                            avant=lambda: self.play(g.focus(0, 0.35), run_time=0.4), geste=montrer)

    # ── 06 : un effectif ────────────────────────────────────────────────────

    def ecran_effectif(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-effectif")
        g = self.graphe_pret()
        self.au_mot("un effectif")
        tit = self.col(self.t("Un effectif", 48, JAUNE_TITRE), 2.6)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("un lycée de 800 élèves")
        e1 = self.col(self.ligne([("Imagine :", GREY_A), ("800", AMBRE), ("élèves", WHITE)], 40), 1.7)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("de 12 à 17 ans")
        e2 = self.col(self.t("tous âgés de 12 à 17 ans", 34), 1.05)
        self.play(FadeIn(e2), g.focus(0, 0.35), run_time=0.5)
        self.au_mot("s'applique à ce groupe")
        self.play(FadeIn(g.lu(26), scale=1.5), Create(g.vers_axe(0, jusqu_au_lu=True)), run_time=0.5)
        self.au_mot("26 % de 800")
        c1 = self.col(self.ligne([("26 %", VERT_OK), ("de", WHITE), ("800", AMBRE)], 44), 0.05)
        self.play(FadeIn(c1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("800 fois 0,26")
        c2 = self.col(self.ligne([("800", WHITE), ("×", WHITE), ("0,26", WHITE)], 44), -0.85)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 208")
        eg = self.col(self.ligne([("=", WHITE), ("208", VERT_OK), ("élèves", WHITE)], 44), -1.65, xl=self.XL + 0.5)
        self.play(FadeIn(eg, scale=0.7), run_time=0.4)
        self.insister(eg[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 07 : le piège (une part DANS le groupe) ─────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        g = self.graphe_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.1)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("ce n'est pas")
        faux = self.col(self.bloc(["51 % des utilisateurs", "ont 18-24 ans"], 34, ORANGE_RETENUE), 2.0)
        self.play(FadeIn(faux, shift=RIGHT * 0.2), g.focus(1, 0.35), run_time=0.5)
        self.play(Create(croix(faux, sw=6)), run_time=0.4)
        self.au_mot("C'est 51 % des 18 à 24 ans")
        juste = self.col(self.ligne([("51 % DES 18-24 ans", VERT_OK)], 36), 0.95)
        ok = self.coche(VERT_OK, 0.26).next_to(juste, RIGHT, buff=0.2)
        self.play(FadeIn(juste, shift=RIGHT * 0.2), Create(ok), run_time=0.5)
        self.au_mot("additionne les barres")
        self.play(g.rallumer(), run_time=0.3)
        self.au_mot("26 plus 51")
        s1 = self.col(self.t("26 + 51 + 46 + 27 + 17", 40), 0.0)
        self.play(FadeIn(s1, shift=RIGHT * 0.2),
                  LaggedStart(*[Indicate(b, color=AMBRE, scale_factor=1.06) for b in g.barres], lag_ratio=0.3),
                  run_time=1.6)
        self.au_mot("égale 167 %")
        s2 = self.col(self.ligne([("=", WHITE), ("167 %", ROUGE_ERREUR)], 46), -0.8)
        self.play(FadeIn(s2, scale=0.7), run_time=0.4)
        self.insister(s2[1], 1.35, 0.25)
        self.au_mot("Plus de 100 %")
        s3 = self.col(self.bloc(["plus de 100 % :", "pas les parts d'un même tout"], 32, AMBRE), -1.65)
        self.play(FadeIn(s3, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 08 : question 2 (que dit la barre ?) ────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = caser(self.graphe(centre=ORIGIN), -6.6, -1.45, -3.0, 2.6)
        self.add(g)
        self.question_pause("08-question", "08b-reponse", ["Que dit la barre", "des 60 ans et plus ?"],
                            ["17 % des 60 + s'en servent", "17 % des usagers ont 60 +", "17 personnes de 60 +"], 0,
                            ["une part DANS le groupe des 60 +", "B renverse ; C : % ≠ effectif"],
                            x0=-1.1, largeur=7.4, ys=(0.95, 0.0, -0.95), fs_choix=34,
                            avant=lambda: self.play(g.focus(4, 0.35), run_time=0.4),
                            geste=lambda: self.play(FadeIn(g.lu(17), scale=1.5), Create(g.vers_axe(4, jusqu_au_lu=True)), run_time=0.5))

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        g = self.graphe_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Un : quelle part")
        q1 = self.col(VGroup(self.ligne([("1.", AMBRE), ("Part des 40-59 ans", WHITE)], 36),
                             self.t("qui ne s'en servent pas ?", 36)).arrange(DOWN, aligned_edge=LEFT, buff=0.12), 1.6)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), g.focus(3, 0.35), run_time=0.6)
        self.au_mot("Deux : on interroge")
        q2 = self.col(VGroup(self.ligne([("2.", AMBRE), ("300", AMBRE), ("personnes", WHITE)], 36),
                             self.t("de 25 à 39 ans :", 36), self.t("combien chaque jour ?", 36))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.12), 0.05)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), g.focus(2, 0.35), run_time=0.6)
        self.au_mot("Mets pause")
        pause = self.pause_defi(-1.45)
        self.play(Write(pause), g.rallumer(), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        g = self.graphe_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("monte à 27 %")
        self.play(g.focus(3, 0.35), FadeIn(g.lu(27), scale=1.5), Create(g.vers_axe(3, jusqu_au_lu=True)),
                  run_time=0.5)
        self.au_mot("100 moins 27")
        c1 = self.col(self.ligne([("1.", AMBRE), ("100 − 27", WHITE)], 42), 1.75)
        self.play(FadeIn(c1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 73 %")
        r1 = self.ligne([("=", WHITE), ("73 %", VERT_OK)], 42).next_to(c1, RIGHT, buff=0.2)
        self.play(FadeIn(r1, scale=0.7), run_time=0.4)
        self.insister(r1[1], 1.35, 0.25)
        self.au_mot("monte à 46 %")
        self.play(g.focus(2, 0.35), FadeIn(g.lu(46), scale=1.5), Create(g.vers_axe(2, jusqu_au_lu=True)),
                  run_time=0.5)
        self.au_mot("300 fois 0,46")
        c2 = self.col(self.ligne([("2.", AMBRE), ("300 × 0,46", WHITE)], 42), 0.55)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 138")
        r2 = self.col(self.ligne([("=", WHITE), ("138", VERT_OK), ("personnes", WHITE)], 42), -0.3,
                      xl=self.XL + 0.55)
        env = self.col(self.t("environ", 34, GREY_A), -1.05, xl=self.XL + 0.55)
        self.play(FadeIn(r2, scale=0.7), run_time=0.4)
        self.insister(r2[1], 1.35, 0.25)
        self.au_mot("environ")
        self.play(FadeIn(env), run_time=0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        g = self.graphe_pret()
        lignes = self.finale([("Barre = part DANS", "son groupe"), ("Autre part :", "100 − la barre"),
                              ("Effectif :", "% × effectif du groupe")], [1.75, 0.15, -1.45])
        self.au_mot("Chaque barre est un groupe")
        self.montrer_ligne(lignes[0], g.focus(1, 0.35))
        self.au_mot("L'autre part")
        self.montrer_ligne(lignes[1])
        self.au_mot("pour un effectif")
        self.montrer_ligne(lignes[2], g.rallumer())
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reperes()
        self.ecran_lire()
        self.ecran_complement()
        self.ecran_question1()
        self.ecran_effectif()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsRepBarresPremiere(StatsRepBarresBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"
