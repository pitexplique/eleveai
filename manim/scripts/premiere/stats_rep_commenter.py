# stats_rep_commenter.py
# EleveAI — Maths 1re (tronc commun) — série « Statistiques », lycée, épisode 10 :
# COMMENTER LE CROISEMENT DE DEUX CARACTÈRES. Micro du coach info_rep_commenter
# (notion info_representations_croisees). AVEC VOIX. Paysage 16:9.
# CEINTURE BLEUE : un cran au-dessus de la paysage verte (vérifier une phrase
# par un calcul, et le piège « plus d'individus ≠ plus grande part », qui
# demande de croiser deux graphiques). Short jumeau : stats_rep_commenter_short.py (verte).
#
# ⭐ Décor et métier : le SPORT ; un JOURNALISTE SPORTIF vérifie ses phrases
# avant d'écrire un article sur les licences sportives (problématique : juger
# une affirmation). Centres d'intérêt : sport, corps-sante.
# Source : Insee, « Licences sportives et autres titres de participation par
# fédération agréée », données annuelles 2025 (Injep-MEDES), lu le 24/10/2026 :
# https://www.insee.fr/fr/statistiques/2408252 — licences annuelles (milliers) et
# part des licences féminines (%) : football 2 372,1 (10,5 %) · tennis 1 228,6
# (29,5 %) · basketball 630,8 (35,0 %) · équitation 625,4 (86,0 %) · handball
# 602,2 (39,8 %) · natation 403,2 (55,2 %).
# Arrondis au millier : 2 372, 1 229, 631, 625, 403. Calculs (Python) : total
# 5 260, moitié 2 630 ; 2 × 1 229 = 2 458 ; 631 + 625 = 1 256 ; 2 372 × 0,105 =
# 249,1 (exact 249,1) ; 631 × 0,35 = 220,9 ; 625 × 0,86 = 537,5 (exact 537,8 → 538) ;
# 35 ÷ 10,5 = 3,3 (« plus de trois fois »).
#
# Mapping micro → écrans (banque information-chiffree, info_rep_commenter) :
# info_rep_commenter_barres (moitié, double, somme, comparaison) → 02, 03, 04,
# question 1, défi 1 · info_rep_commenter_croise (plus d'individus n'est pas une
# plus grande PART) → 06, 07 piège, question 2, défi 2.
# Écrans : 00 garde · 01 le journaliste · 02 la méthode · 03 les valeurs · 04 la
# moitié · 05 question 1 (le double) · 06 la part des femmes · 07 le piège · 08
# question 2 · 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/1re-stats-rep-commenter.json (débit −7) ; calage :
# manim/scripts/premiere/stats_rep_commenter_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/premiere/stats_rep_commenter.py StatsRepCommenterPremiere -o eleveai-maths-premiere-commun-stats-rep-commenter --media_dir manim/scripts/premiere/media-stats-rep-commenter
# Sortie : manim/sorties/premiere-commun/maths/statistiques/10-rep-commenter/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from stats_lycee_i1_commun import *  # noqa: E402,F403

SPORTS = ["Foot", "Tennis", "Basket", "Équit.", "Natation"]
LIC = [2372, 1229, 631, 625, 403]
F_SPORTS = ["Foot", "Basket", "Équit."]
F_PC = [10.5, 35, 86]
VERT_B, ROSE_B = "#86efac", "#f9a8d4"


def journal(h=2.2):
    """Une page de journal : titre, photo, lignes de texte."""
    page = Rectangle(width=h * 0.8, height=h, fill_color="#f8fafc", fill_opacity=1, stroke_color=GREY_B,
                     stroke_width=3)
    titre = Rectangle(width=h * 0.64, height=h * 0.1, fill_color=NUIT, fill_opacity=1, stroke_width=0)
    titre.move_to(page.get_top() + DOWN * h * 0.12)
    photo = Rectangle(width=h * 0.3, height=h * 0.24, fill_color="#93c5fd", fill_opacity=1, stroke_width=0)
    photo.move_to(page.get_corner(UL) + RIGHT * h * 0.23 + DOWN * h * 0.38)
    ballon = Circle(radius=h * 0.07, fill_color=WHITE, fill_opacity=1, stroke_color=NUIT, stroke_width=2).move_to(photo)
    lignes = VGroup(*[Line(LEFT * h * 0.3, RIGHT * h * (0.3 if k > 2 else 0.12), color=GREY_B, stroke_width=4)
                      for k in range(7)]).arrange(DOWN, buff=h * 0.06)
    lignes.move_to(page.get_center() + DOWN * h * 0.18)
    for k in range(3):
        lignes[k].align_to(page.get_center() + RIGHT * h * 0.02, LEFT).shift(UP * h * 0.0)
    return VGroup(page, titre, photo, ballon, lignes)


def tampon(txt, couleur):
    t = Text(txt, font_size=40, color=couleur, weight=BOLD)
    c = RoundedRectangle(width=t.width + 0.4, height=t.height + 0.3, corner_radius=0.1, stroke_color=couleur,
                         stroke_width=6)
    return VGroup(c, t.move_to(c)).rotate(0.12)


class StatsRepCommenterBase(PaysageI1):
    nom_voix = "1re-stats-rep-commenter"
    fichier_marques = "stats_rep_commenter_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "bleue"
    XL = 1.0

    def graphe(self, centre=None, boite=(-6.6, 0.45, -3.3, 3.1), **kw):
        opts = dict(pas=500, maxi=3000, couleurs=[VERT_B] * 5, nom_axe="milliers",
                    titre="Licences sportives 2025", largeur=5.6, hauteur=3.4, fs=26,
                    centre=ORIGIN if centre is None else centre)
        opts.update(kw)
        g = Barres(SPORTS, LIC, **opts)
        return caser(g, *boite) if centre is None else g

    def valeurs(self, g, fs=22):
        return VGroup(*[texte(f"{fr(v)}", fs, NUIT).next_to(g.barres[k], UP, buff=0.05) for k, v in enumerate(LIC)])

    def graphe_pret(self, avec_valeurs=True, **kw):
        g = self.graphe(**kw)
        self.add(g)
        if avec_valeurs:
            self.add(self.valeurs(g))
        return g

    def graphe_f(self, boite=(-6.6, 0.45, -3.3, 3.1)):
        g = Barres(F_SPORTS, F_PC, pas=20, sous_pas=10, maxi=100, couleurs=[ROSE_B] * 3, nom_axe="% de femmes",
                   titre="Part des femmes (en %)", largeur=3.8, hauteur=3.4, fs=26, colonne_lue=True)
        return caser(g, *boite)

    def seuil(self, g, v, couleur=ROUGE_ERREUR, txt=None):
        """Une ligne horizontale pointillée à la hauteur v, sur tout le graphique."""
        y = g.y_axe(v)[1]
        x0, x1 = g.y_axe(v)[0], g.barres[-1].get_right()[0] + 0.2
        ln = DashedLine(P(x0, y), P(x1, y), color=couleur, stroke_width=6, dash_length=0.12).set_z_index(5)
        if not txt:
            return ln
        t = texte(txt, 22, couleur).set_stroke(WHITE, 5, background=True).next_to(ln, UP, buff=0.04)
        t.align_to(ln, RIGHT).set_z_index(5)
        return VGroup(ln, t)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Commenter un graphique", self.identite, self.ceinture)
        g = self.graphe(centre=P(-1.4, 0.0), largeur=3.6, hauteur=2.0, fs=20, titre=None, nom_axe=None, pas=1000)
        self.au_mot("Commenter un graphique")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond), run_time=0.7)
        self.play(g.pousser(run_time=0.8))
        self.add(g)
        self.au_mot("vraie")
        v = tampon("VRAI ?", VERT_OK).move_to(P(2.6, 0.55))
        self.play(FadeIn(v, scale=1.4), run_time=0.3)
        self.au_mot("fausse")
        f = tampon("FAUX ?", ROUGE_ERREUR).move_to(P(2.9, -0.55))
        self.play(FadeIn(f, scale=1.4), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 01 : le journaliste ─────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        j = journal(3.0).move_to(P(-4.2, -0.1))
        self.play(FadeIn(j, shift=UP * 0.3), run_time=0.5)
        self.au_mot("Un journaliste sportif")
        metier = self.col(self.t("Journaliste sportif", 46, BLEU_CALCUL), 2.6, xl=-1.6)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("les licences sportives")
        suj = self.col(self.ligne([("licences sportives", AMBRE), ("en France, 2025", WHITE)], 34), 1.7, xl=-1.6)
        self.play(FadeIn(suj), run_time=0.4)
        self.au_mot("Avant d'écrire une phrase")
        ph = self.col(self.t("« Le foot écrase tout... »", 34, GREY_A), 0.6, xl=-1.6)
        self.play(FadeIn(ph, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("il la vérifie")
        ver = self.col(VGroup(self.t("je vérifie sur les nombres", 36, VERT_OK), self.coche(VERT_OK, 0.28))
                       .arrange(RIGHT, buff=0.25), -0.4, xl=-1.6)
        self.play(FadeIn(ver, shift=UP * 0.15), run_time=0.5)
        self.au_mot("commenter un graphique")
        c = self.col(self.ligne([("commenter", AMBRE), ("=", WHITE), ("vérifier", WHITE)], 44), -1.5, xl=-1.6)
        self.play(FadeIn(c, scale=0.8), run_time=0.5)
        self.insister(c, 1.08, 0.3)
        self.attendre_voix()

    # ── 02 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-methode")
        g = self.graphe()
        t0 = self.col(self.t("La méthode", 48, JAUNE_TITRE), 2.7)
        self.play(FadeIn(g.fond), g.pousser(run_time=0.8), FadeIn(t0, shift=RIGHT * 0.2), run_time=0.8)
        self.add(g)
        self.au_mot("je lis les valeurs")
        e1 = self.col(self.ligne([("1.", AMBRE), ("je lis les valeurs", WHITE)], 38), 1.6)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), Indicate(g.axe_y, color=AMBRE), run_time=0.6)
        self.au_mot("je teste chaque affirmation")
        e2 = self.col(self.bloc(["2. je teste chaque", "phrase par un calcul"], 38), 0.45)
        e2[0][:2].set_color(AMBRE)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("une comparaison")
        outils = VGroup(self.t("comparer", 34, BLEU_CALCUL), self.t("additionner", 34, BLEU_CALCUL),
                        self.t("moitié, double", 34, BLEU_CALCUL)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(outils, -1.0, xl=self.XL + 0.5)
        self.play(FadeIn(outils[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("une somme")
        self.play(FadeIn(outils[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("une moitié")
        self.play(FadeIn(outils[2], shift=RIGHT * 0.2), run_time=0.3)
        self.attendre_voix()

    # ── 03 : les valeurs ────────────────────────────────────────────────────

    def ecran_lecture(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lecture")
        g = self.graphe()
        self.add(g.fond)
        vals = self.valeurs(g, 24)
        lignes = VGroup()
        noms = ["Football", "Tennis", "Basket", "Équitation", "Natation"]
        for k, (mot, v) in enumerate(zip(["2 372", "1 229", "631", "625", "403"], LIC)):
            self.au_mot(mot)
            ln = self.col(self.ligne([(noms[k] + " :", WHITE), (fr(v), VERT_OK)], 38), 2.5 - k * 0.72)
            self.play(g.pousser(indices=[k], run_time=0.45), FadeIn(ln, shift=RIGHT * 0.2), run_time=0.45)
            self.add(g.barres[k])
            self.play(FadeIn(vals[k], scale=1.3), run_time=0.2)
            lignes.add(ln)
        un = self.col(self.t("en milliers de licences", 30, GREY_A), 2.5 - 5 * 0.72 + 0.1)
        self.play(FadeIn(un), run_time=0.3)
        self.attendre_voix()

    # ── 04 : la moitié ──────────────────────────────────────────────────────

    def ecran_moitie(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-moitie")
        g = self.graphe_pret()
        self.au_mot("Première phrase")
        ph = self.col(self.bloc(["« Le foot a plus de la", "moitié des licences »"], 36, AMBRE), 2.55)
        self.play(FadeIn(ph, shift=RIGHT * 0.2), g.focus(0, 0.4), run_time=0.5)
        self.au_mot("Le total")
        k1 = self.col(self.ligne([("total :", WHITE), ("5 260", WHITE)], 40), 1.3)
        self.play(FadeIn(k1, shift=RIGHT * 0.2), g.rallumer(), run_time=0.4)
        self.au_mot("La moitié")
        k2 = self.col(self.ligne([("moitié :", WHITE), ("2 630", BLEU_CALCUL)], 40), 0.5)
        s = self.seuil(g, 2630, BLEU_CALCUL, "2 630")
        self.play(FadeIn(k2, shift=RIGHT * 0.2), Create(s[0]), FadeIn(s[1]), run_time=0.6)
        self.au_mot("Or 2 372")
        k3 = self.col(self.ligne([("2 372", VERT_OK), ("<", WHITE), ("2 630", BLEU_CALCUL)], 44), -0.35)
        self.play(FadeIn(k3, shift=RIGHT * 0.2), g.focus(0, 0.4), run_time=0.5)
        self.au_mot("c'est faux")
        f = tampon("FAUX", ROUGE_ERREUR)
        self.col(f, -1.35, xl=self.XL + 0.6)
        self.play(FadeIn(f, scale=1.5), run_time=0.35)
        self.attendre_voix()

    # ── 05 : question 1 (le double) ─────────────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.graphe_pret()

        def montrer():
            s = self.seuil(g, 2458, BLEU_CALCUL, "2 × 1 229 = 2 458")
            self.play(Create(s[0]), FadeIn(s[1]), run_time=0.6)

        self.question_pause("05-question", "05b-reponse", ["Foot : au moins 2 fois", "plus que le tennis ?"],
                            ["oui", "non", "on ne peut pas savoir"], 1,
                            ["2 × 1 229 = 2 458 > 2 372", "A : à l'œil ; C : on peut calculer"],
                            x0=self.XL + 0.2, largeur=5.2, ys=(0.95, 0.0, -0.95),
                            avant=lambda: self.play(g.estomper([0, 1], 0.35), run_time=0.4), geste=montrer)

    # ── 06 : la part des femmes ─────────────────────────────────────────────

    def ecran_croise(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-croise")
        g = self.graphe_f()
        self.au_mot("Deuxième graphique")
        t0 = self.col(self.t("Deuxième graphique", 46, JAUNE_TITRE), 2.7)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), FadeIn(g.fond), run_time=0.5)
        self.au_mot("la part des femmes")
        e = self.col(self.t("la part des femmes", 36, ROSE_B), 1.9)
        self.play(FadeIn(e), run_time=0.4)
        for k, (mot, v, nom) in enumerate(zip(["10,5 %", "35 %", "86 %"], F_PC, ["Football", "Basket", "Équitation"])):
            self.au_mot(mot)
            ln = self.col(self.ligne([(nom + " :", WHITE), (f"{fr(v)} %", ROSE_B)], 38), 1.05 - k * 0.68)
            self.play(g.pousser(indices=[k], run_time=0.45), FadeIn(ln, shift=RIGHT * 0.2), run_time=0.45)
            self.add(g.barres[k])
            self.play(FadeIn(g.lu(v), scale=1.4), Create(g.vers_axe(k, jusqu_au_lu=True)), run_time=0.35)
        self.au_mot("Chaque part se lit dans son sport")
        r = self.col(self.bloc(["une part DANS", "chaque sport"], 36, AMBRE), -1.35)
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    def graphe_f_pret(self, lus=True, **kw):
        g = self.graphe_f(**kw)
        self.add(g)
        if lus:
            self.add(*[g.lu(v) for v in F_PC])
        return g

    # ── 07 : le piège (plus d'individus ≠ plus grande part) ─────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        g = self.graphe_f_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.0)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("plus de filles ne veut pas dire")
        ph = self.col(VGroup(self.t("plus de filles", 36), self.ligne([("≠", ROUGE_ERREUR), ("plus grande part", WHITE)], 36))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.1)
        self.play(FadeIn(ph, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Au football")
        self.play(g.focus(0, 0.35), run_time=0.3)
        k1 = self.col(self.ligne([("Foot :", WHITE), ("10,5 %", ROSE_B), ("de", WHITE), ("2 372", VERT_OK)], 38), 1.2)
        self.play(FadeIn(k1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 249")
        r1 = self.col(self.ligne([("≈", WHITE), ("249 milliers", AMBRE)], 38), 0.6, xl=self.XL + 0.8)
        self.play(FadeIn(r1, scale=0.8), run_time=0.4)
        self.au_mot("Au basket")
        self.play(g.focus(1, 0.35), run_time=0.3)
        k2 = self.col(self.ligne([("Basket :", WHITE), ("35 %", ROSE_B), ("de", WHITE), ("631", VERT_OK)], 38), -0.1)
        self.play(FadeIn(k2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 221")
        r2 = self.col(self.ligne([("≈", WHITE), ("221 milliers", AMBRE)], 38), -0.7, xl=self.XL + 0.8)
        self.play(FadeIn(r2, scale=0.8), run_time=0.4)
        self.au_mot("Il y a plus de filles au football")
        self.play(Indicate(r1[1], color=VERT_OK, scale_factor=1.3), run_time=0.6)
        self.au_mot("plus de trois fois plus faible")
        fin = self.col(self.bloc(["mais une part", "plus de 3 fois plus faible !"], 32, ORANGE_RETENUE), -1.6)
        self.play(FadeIn(fin, shift=UP * 0.15), g.estomper([0, 1], 0.35), run_time=0.5)
        self.attendre_voix()

    # ── 08 : question 2 (quelle phrase est vraie ?) ─────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.graphe_f_pret(boite=(-6.6, -1.5, -3.0, 2.7))
        self.question_pause("08-question", "08b-reponse", ["Quelle phrase est vraie ?"],
                            ["part des filles : foot > basket", "plus de licenciées au basket",
                             "plus de licenciées au foot"], 2,
                            ["≈ 249 milliers contre 221", "A : nombre ≠ part ; B : part ≠ effectif"],
                            x0=-1.1, largeur=7.4, ys=(1.25, 0.3, -0.65), fs_choix=34)

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        g = self.graphe_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Vrai ou faux")
        vf = self.col(self.t("Vrai ou faux ?", 38, AMBRE), 1.95)
        self.play(FadeIn(vf), run_time=0.3)
        self.au_mot("Un : le basket")
        q1 = self.col(VGroup(self.ligne([("1.", AMBRE), ("Basket + équitation", WHITE)], 36),
                             self.t("dépassent le tennis", 36)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), 1.0)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), g.estomper([1, 2, 3], 0.35), run_time=0.6)
        self.au_mot("Deux : il y a plus")
        q2 = self.col(VGroup(self.ligne([("2.", AMBRE), ("Plus de licenciées", WHITE)], 36),
                             self.t("en équitation qu'au foot", 36)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), -0.35)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), g.estomper([0, 3], 0.35), run_time=0.6)
        self.au_mot("Mets pause")
        pause = self.pause_defi(-1.5)
        self.play(Write(pause), g.rallumer(), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        g = self.graphe_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), g.estomper([1, 2, 3], 0.35), run_time=0.5)
        self.au_mot("631 plus 625")
        k1 = self.col(self.ligne([("1.", AMBRE), ("631 + 625", WHITE)], 40), 1.9)
        self.play(FadeIn(k1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 1 256")
        r1 = self.col(self.ligne([("=", WHITE), ("1 256", WHITE), (">", WHITE), ("1 229", WHITE)], 40), 1.25,
                      xl=self.XL + 0.5)
        self.play(FadeIn(r1, scale=0.8), run_time=0.4)
        self.au_mot("vrai.")
        v1 = tampon("VRAI", VERT_OK).scale(0.75)
        self.col(v1, 0.55, xl=self.XL + 0.6)
        self.play(FadeIn(v1, scale=1.5), run_time=0.3)
        self.au_mot("86 % de 625")
        self.play(g.estomper([0, 3], 0.35), run_time=0.3)
        k2 = self.col(self.ligne([("2.", AMBRE), ("86 % de 625", WHITE)], 40), -0.2)
        self.play(FadeIn(k2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 538")
        r2 = self.col(self.ligne([("≈", WHITE), ("538", AMBRE), ("> 249 (foot)", WHITE)], 40), -0.85, xl=self.XL + 0.5)
        self.play(FadeIn(r2, scale=0.8), run_time=0.4)
        self.au_mot("vrai aussi")
        v2 = tampon("VRAI", VERT_OK).scale(0.75)
        self.col(v2, -1.55, xl=self.XL + 0.6)
        self.play(FadeIn(v2, scale=1.5), run_time=0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        g = self.graphe_pret()
        lignes = self.finale([("Une phrase se vérifie", "par un calcul"), ("Moitié, double, somme :", "je calcule"),
                              ("Plus d'individus ≠", "plus grande part")], [1.75, 0.15, -1.45])
        self.au_mot("se vérifie par un calcul")
        self.montrer_ligne(lignes[0])
        self.au_mot("Moitié, double, somme")
        self.montrer_ligne(lignes[1], Create(self.seuil(g, 2630, BLEU_CALCUL)))
        self.au_mot("Et plus d'individus")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_methode()
        self.ecran_lecture()
        self.ecran_moitie()
        self.ecran_question1()
        self.ecran_croise()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsRepCommenterPremiere(StatsRepCommenterBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "bleue"
