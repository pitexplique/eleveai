# stats_tableau_defi.py
# EleveAI — Maths CM1 ET CM2 — série « Statistiques », épisode 04 : DÉFI AVEC
# UN TABLEAU (micro du coach : tableau_defi, banque cm1/maths/tableaux.bank.ts,
# canvas `tableau_donnees`), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE : le défi complet du niveau, en DEUX ÉTAPES
# (la case qui manque grâce au total, puis ce nombre sert pour la suite).
# Short jumeau : stats_tableau_defi_short.py (orange).
#
# ⭐ Décor et métier : la MUSIQUE, un festival de maloya et de séga ; un
# RÉGISSEUR compte les spectateurs (adultes, enfants ; vendredi, samedi,
# dimanche) pour PRÉVOIR la scène, l'eau et la sécurité.
# ⭐ La figure est CELLE DU COACH (canvas_stats.Tableau = `tableau_donnees`),
# en haut sur toute la largeur, avec une 3e ligne « Tout le monde » remplie à
# l'étape 2 et à la correction. Dessous, une BARRE du total des adultes
# (1 200) coupée en vendredi | samedi | « ? » fait VOIR l'étape 1 et le piège.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 le régisseur, le festival · 02 les adultes (case vide,
# total 1 200) · 03 les enfants · 04 étape 1 (350 + 480 = 830 ; 1 200 − 830
# = 370) · 05 étape 2 (370 + 130 = 500) · 06 le piège (1 200 − 350 seulement)
# · 07 défi · 07b correction (700, 500, 500 : le samedi) · 08 ce que tu as
# appris · 09 fin.
#
# Voix : manim/voix/cm-stats-tableau-defi.json (débit −10), WAV dans
# public/sons/cm-stats-tableau-defi/ ; calage mot à mot :
# manim/scripts/cm1/statscm_tableau_defi_marques.json.
# ⭐ UNE voix, UN script, DEUX rendus : StatsTableauDefiCM2 ne change que
# l'identité (« Maths CM2 — EleveAI »). La voix ne cite aucune classe.
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_tableau_defi.py StatsTableauDefiCM1 -o eleveai-maths-cm1-stats-tableau-defi --media_dir manim/scripts/cm1/media-tableau-defi
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_tableau_defi.py StatsTableauDefiCM2 -o eleveai-maths-cm2-stats-tableau-defi --media_dir manim/scripts/cm1/media-tableau-defi-cm2
# Sorties : manim/sorties/cm1/maths/statistiques/04-tableau-defi/ et
#           manim/sorties/cm2/maths/statistiques/04-tableau-defi/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_tableau_commun import *  # noqa: E402,F403
from stats_tableau_commun import P, BaseTableauPaysage  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, NUIT, ORANGE_Q, Tableau  # noqa: E402

PUBLIC = ["Adultes", "Enfants", "Tout le monde"]
JOURS = ["Vendredi", "Samedi", "Dimanche", "Total"]
PLEIN = [[350, 480, 370, 1200], [150, 220, 130, 500], [500, 700, 500, None]]
C_VEN, C_SAM, C_MANQUE = "#60a5fa", "#a78bfa", ORANGE_RETENUE


def nb(n):
    """1200 → « 1 200 » (espace des milliers)."""
    return f"{n:,}".replace(",", " ")


# ── les dessins : la scène, la note, l'eau, la sécurité ─────────────────────

def scene_festival(s=1.0):
    plancher = Polygon(P(-1.6 * s, -0.5 * s), P(1.6 * s, -0.5 * s), P(1.3 * s, 0), P(-1.3 * s, 0),
                       fill_color="#7c2d12", fill_opacity=1, stroke_width=0)
    fond = Rectangle(width=2.6 * s, height=1.4 * s, fill_color="#1e1b4b", fill_opacity=1, stroke_color="#6366f1",
                     stroke_width=3).next_to(plancher, UP, buff=0)
    toit = Rectangle(width=3.0 * s, height=0.2 * s, fill_color="#334155", fill_opacity=1,
                     stroke_width=0).next_to(fond, UP, buff=0)
    spots = VGroup(*[Polygon(toit.get_bottom() + P(x * s, 0), toit.get_bottom() + P((x - 0.35) * s, -1.4 * s),
                             toit.get_bottom() + P((x + 0.35) * s, -1.4 * s), fill_color="#fde047", fill_opacity=0.25,
                             stroke_width=0) for x in (-0.8, 0.8)])
    return VGroup(plancher, fond, toit, spots)


def note(s=1.0, couleur="#f472b6"):
    tete = Ellipse(width=0.3 * s, height=0.22 * s, fill_color=couleur, fill_opacity=1, stroke_width=0).rotate(0.4)
    hampe = Line(tete.get_right() + LEFT * 0.02, tete.get_right() + UP * 0.6 * s, color=couleur, stroke_width=4)
    return VGroup(tete, hampe)


def goutte(s=1.0):
    return VGroup(Circle(radius=0.22 * s, fill_color="#38bdf8", fill_opacity=1, stroke_width=0),
                  Triangle(fill_color="#38bdf8", fill_opacity=1, stroke_width=0).scale(0.2 * s).shift(UP * 0.2 * s))


def bouclier(s=1.0):
    pts = [(-0.3, 0.3), (0.3, 0.3), (0.3, 0.0), (0, -0.38), (-0.3, 0.0)]
    return Polygon(*[P(x * s, y * s) for x, y in pts], fill_color="#22c55e", fill_opacity=1, stroke_color=WHITE,
                   stroke_width=2)


class StatsTableauDefiBase(BaseTableauPaysage):
    nom_voix = "cm-stats-tableau-defi"
    fichier_marques = "statscm_tableau_defi_marques.json"
    identite = "Maths CM1 — EleveAI"
    G = P(-0.3, 1.3)    # le centre du tableau, en haut
    Y_BAS = -1.45       # la première ligne sous le tableau
    XB, LB = -6.3, 5.6  # la barre des adultes : bord gauche, longueur

    def tableau(self, cases=()):
        """Le tableau, avec seulement les cases données remplies : {(r, c): v} (non ajouté)."""
        lignes = [[None] * 4 for _ in range(3)]
        for (r, c), v in dict(cases).items():
            lignes[r][c] = v
        tab = Tableau(JOURS, lignes, libelles=PUBLIC, coin="Public", largeur_case=2.2, largeur_libelle=3.0,
                      hauteur=0.8, fs=30, titre="Personnes au festival", centre=self.G)
        x = tab.case(0, 3).get_left()[0]
        sep = Line(P(x, tab.tetes[3].get_top()[1]), P(x, tab.case(2, 3).get_bottom()[1]), color=NUIT, stroke_width=5)
        tab.add(sep.set_z_index(5))
        return textes_devant(tab)

    def tableau_pret(self, cases=()):
        tab = self.tableau(cases)
        self.add(tab)
        return tab

    @staticmethod
    def cases_jusqua(etape):
        """Les cases connues à chaque moment de l'histoire."""
        c = {(0, 0): 350, (0, 1): 480, (0, 3): 1200}
        if etape >= 1:
            c.update({(1, 0): 150, (1, 1): 220, (1, 2): 130, (1, 3): 500})
        if etape >= 2:
            c[(0, 2)] = 370
        if etape >= 3:
            c[(2, 2)] = 500
        return c

    def bas(self, mob, y, x=-6.3):
        mob.move_to(P(0, y)).align_to(P(x, 0), LEFT)
        if mob.get_right()[0] > 6.7:
            mob.scale_to_fit_width(6.7 - x).align_to(P(x, 0), LEFT)
        return mob

    def barre_adultes(self, y):
        """Le total 1 200 en haut ; en bas vendredi | samedi | ce qui manque (non joués)."""
        u = self.LB / 1200
        h = 0.5

        def r(v, x, yy, fond, bord):
            return Rectangle(width=v * u, height=h, fill_color=fond, fill_opacity=0.9, stroke_color=bord,
                             stroke_width=3).move_to(P(x + v * u / 2, yy))

        haut = r(1200, self.XB, y + 0.33, "#166534", VERT_OK)
        ven = r(350, self.XB, y - 0.33, "#1e3a8a", C_VEN)
        sam = r(480, self.XB + 350 * u, y - 0.33, "#4c1d95", C_SAM)
        manque = r(370, self.XB + 830 * u, y - 0.33, "#7c2d12", C_MANQUE)
        return haut, ven, sam, manque

    def dans(self, rect, s, color=WHITE, fs=32):
        t = self.t(s, fs, color).move_to(rect)
        if t.width > rect.width - 0.1:
            t.scale_to_fit_width(rect.width - 0.1)
        return t

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        ti, ident, ech = self.garde("Défi : un tableau", "verte")
        tab = Tableau(["Ven.", "Sam.", "Dim.", "Total"], [[None, None, "?", None], [None] * 4],
                      libelles=["Adultes", "Enfants"], coin="", largeur_case=0.95, largeur_libelle=1.8, hauteur=0.55,
                      fs=22, centre=P(-2.0, 0.2))
        self.play(Write(ti), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tab, scale=0.9), run_time=0.6)
        self.au_mot("deux étapes")
        etapes = VGroup(*[VGroup(Circle(radius=0.38, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=3),
                                 self.t(str(k + 1), 40, WHITE)) for k, c in enumerate((C_VEN, VERT_OK))])
        etapes.arrange(RIGHT, buff=0.8).next_to(tab, RIGHT, buff=0.9)
        fl = Arrow(etapes[0].get_right(), etapes[1].get_left(), buff=0.1, color=WHITE, stroke_width=5)
        self.play(FadeIn(etapes[0], scale=0.5), run_time=0.3)
        self.play(GrowArrow(fl), FadeIn(etapes[1], scale=0.5), run_time=0.4)
        self.au_mot("on trouve tout")
        self.play(Indicate(tab.texte_case(0, 2), color=ORANGE_Q, scale_factor=1.8), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : le régisseur, le festival ──────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        sc = scene_festival(1.25).move_to(P(-3.9, 0.9))
        metier = self.t("Régisseur", 50, BLEU_CALCUL).move_to(P(2.6, 2.6))
        self.play(FadeIn(sc, shift=UP * 0.3), FadeIn(metier, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("un festival")
        notes = VGroup(*[note(1.0, c).move_to(P(x, y)) for c, x, y in (("#f472b6", -5.8, 2.7), ("#facc15", -2.0, 2.9),
                                                                    ("#34d399", -1.6, 1.7))])
        self.play(LaggedStart(*[FadeIn(n, shift=UP * 0.3) for n in notes], lag_ratio=0.25), run_time=0.6)
        self.au_mot("du maloya")
        styles = self.ligne([("maloya", "#f472b6"), ("et", WHITE), ("séga", "#facc15")], 40).move_to(P(-3.9, -1.4))
        self.play(FadeIn(styles[0], shift=UP * 0.2), run_time=0.3)
        self.au_mot("séga")
        self.play(FadeIn(styles[1:], shift=UP * 0.2), run_time=0.3)
        self.au_mot("combien de personnes")
        q = self.col(self.bloc(["Combien de personnes", "chaque jour ?"], 38, JAUNE_TITRE), 1.2, xl=0.6)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("pour prévoir")
        icones = [(scene_festival(0.3), "la scène", "la scène"), (goutte(1.0), "l'eau", "l'eau"),
                  (bouclier(1.0), "la sécurité", "la sécurité")]
        for k, (ic, txt, mot) in enumerate(icones):
            self.au_mot(mot)
            lg = VGroup(ic, self.t(txt, 38)).arrange(RIGHT, buff=0.3)
            self.col(lg, -0.2 - 0.85 * k, xl=1.0)
            self.play(FadeIn(lg, shift=RIGHT * 0.2), run_time=0.35)
        self.attendre_voix()

    # ── 02 : les adultes, 03 : les enfants ──────────────────────────────────

    def ecran_adultes(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-adultes")
        tab = self.tableau_pret()
        self.play(*teinter_ligne(tab, 0), Indicate(tab.libelles[0], color=AMBRE, scale_factor=1.1), run_time=0.4)
        for c, mot in ((0, "350 le"), (1, "480 le")):
            self.au_mot(mot)
            self.play(remplir(tab, 0, c, PLEIN[0][c]), run_time=0.3)
        self.au_mot("la case est vide")
        self.play(remplir(tab, 0, 2, "?"), *allumer(tab, 0, 2, anneau=ORANGE_Q), run_time=0.4)
        self.insister(tab.texte_case(0, 2), 1.6, 0.25)
        vide = self.bas(self.t("Dimanche : la case est vide", 40, ORANGE_RETENUE), self.Y_BAS)
        self.play(FadeIn(vide, shift=UP * 0.2), run_time=0.4)
        self.au_mot("le total des adultes")
        self.play(Circumscribe(tab.tetes[3], color=AMBRE), run_time=0.6)
        self.au_mot("1 200.")
        tot = self.bas(self.ligne([("Mais le total est", WHITE), ("1 200", VERT_OK)], 44), self.Y_BAS - 0.95)
        self.play(remplir(tab, 0, 3, 1200), *allumer(tab, 0, 3), FadeIn(tot, shift=UP * 0.2), run_time=0.45)
        self.insister(tot[1], 1.3, 0.25)
        self.attendre_voix()

    def ecran_enfants(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-enfants")
        tab = self.tableau_pret({(0, 0): 350, (0, 1): 480, (0, 2): "?", (0, 3): 1200})
        self.play(*teinter_ligne(tab, 1), Indicate(tab.libelles[1], color=AMBRE, scale_factor=1.1), run_time=0.4)
        for c, mot in ((0, "150 le"), (1, "220 le"), (2, "130 le")):
            self.au_mot(mot)
            self.play(remplir(tab, 1, c, PLEIN[1][c]), run_time=0.3)
        self.au_mot("500 enfants")
        tot = self.bas(self.ligne([("En tout :", WHITE), ("500", VERT_OK), ("enfants", WHITE)], 44), self.Y_BAS)
        self.play(remplir(tab, 1, 3, 500), *allumer(tab, 1, 3), FadeIn(tot, shift=UP * 0.2), run_time=0.45)
        self.insister(tot[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 04 : étape 1, les adultes du dimanche ───────────────────────────────

    def ecran_etape1(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-etape1")
        c = self.cases_jusqua(1)
        c[(0, 2)] = "?"
        tab = self.tableau_pret(c)
        self.au_mot("Étape 1")
        et = self.bas(self.ligne([("Étape 1 :", C_VEN), ("les adultes du dimanche", WHITE)], 40), self.Y_BAS + 0.05)
        self.play(FadeIn(et, shift=RIGHT * 0.2), *teinter_ligne(tab, 0), *allumer(tab, 0, 2, anneau=ORANGE_Q),
                  run_time=0.5)
        haut, ven, sam, manque = self.barre_adultes(-2.55)
        t_h = self.dans(haut, "1 200 adultes")
        self.play(GrowFromEdge(haut, LEFT), FadeIn(t_h), run_time=0.4)
        calc1 = self.ligne([("350", C_VEN), ("+", WHITE), ("480", C_SAM), ("=", WHITE), ("830", WHITE)], 40, 0.2)
        calc1.move_to(P(0, -2.2)).align_to(P(-0.2, 0), LEFT)
        self.au_mot("350 plus")
        self.play(GrowFromEdge(ven, LEFT), FadeIn(self.dans(ven, "350")), FadeIn(calc1[:2], scale=1.3), run_time=0.4)
        self.au_mot("480, égale")
        self.play(GrowFromEdge(sam, LEFT), FadeIn(self.dans(sam, "480")), FadeIn(calc1[2:4], scale=1.3), run_time=0.4)
        self.au_mot("830. Il")
        accol = BraceBetweenPoints(ven.get_corner(DL), sam.get_corner(DR), DOWN, buff=0.05, color=WHITE)
        self.play(FadeIn(calc1[4], scale=1.5), GrowFromCenter(accol), run_time=0.4)
        self.au_mot("Il manque")
        t_m = self.dans(manque, "?", WHITE, 40)
        self.play(GrowFromEdge(manque, LEFT), FadeIn(t_m, scale=1.5), run_time=0.4)
        calc2 = self.ligne([("1 200", VERT_OK), ("−", WHITE), ("830", WHITE), ("=", WHITE), ("370", C_MANQUE)], 40, 0.2)
        calc2.next_to(calc1, DOWN, buff=0.35).align_to(calc1, LEFT)
        self.au_mot("1 200 moins")
        self.play(FadeIn(calc2[:2], scale=1.3), Indicate(VGroup(haut, t_h), color=VERT_OK, scale_factor=1.03),
                  run_time=0.4)
        self.au_mot("830 :")
        self.play(FadeIn(calc2[2:4], scale=1.3), run_time=0.35)
        self.au_mot("370 adultes")
        self.play(FadeIn(calc2[4], scale=1.5), Transform(t_m, self.dans(manque, "370")), remplir(tab, 0, 2, 370),
                  *allumer(tab, 0, 2), run_time=0.45)
        self.insister(tab.texte_case(0, 2), 1.6, 0.25)
        self.attendre_voix()

    # ── 05 : étape 2, tout le monde le dimanche ─────────────────────────────

    def ecran_etape2(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-etape2")
        tab = self.tableau_pret(self.cases_jusqua(2))
        self.au_mot("Étape 2")
        et = self.bas(self.ligne([("Étape 2 :", VERT_OK), ("tout le monde le dimanche", WHITE)], 40), self.Y_BAS + 0.05)
        self.play(FadeIn(et, shift=RIGHT * 0.2), *teinter_colonne(tab, 2, BLEU_PALE), run_time=0.5)
        calc = self.ligne([("370", C_MANQUE), ("adultes", WHITE), ("+", WHITE), ("130", WHITE), ("enfants", WHITE)], 44)
        self.bas(calc, self.Y_BAS - 0.8)
        res = self.ligne([("=", WHITE), ("500", VERT_OK), ("personnes", WHITE)], 46).next_to(calc, DOWN, buff=0.4)
        res.align_to(calc, LEFT)
        self.au_mot("370 adultes")
        self.play(FadeIn(calc[:2], scale=1.2), *allumer(tab, 0, 2), run_time=0.4)
        self.au_mot("130 enfants")
        self.play(FadeIn(calc[2:], scale=1.2), *allumer(tab, 1, 2), run_time=0.4)
        self.au_mot("500 personnes")
        self.play(FadeIn(res, shift=UP * 0.2), remplir(tab, 2, 2, 500), *allumer(tab, 2, 2), run_time=0.45)
        self.play(Create(self.encadre(res)), run_time=0.35)
        self.insister(tab.texte_case(2, 2), 1.6, 0.25)
        self.attendre_voix()

    # ── 06 : le piège, 1 200 − 350 seulement ────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        c = self.cases_jusqua(1)
        c[(0, 2)] = "?"
        tab = self.tableau_pret(c)
        self.au_mot("Le piège")
        titre = self.bas(self.t("Le piège", 48, ROUGE_ERREUR), self.Y_BAS + 0.05)
        self.play(Write(titre), *teinter_ligne(tab, 0), run_time=0.5)
        haut, ven, sam, manque = self.barre_adultes(-3.2)
        barres = VGroup(haut, self.dans(haut, "1 200 adultes"), ven, sam, manque)
        self.play(FadeIn(barres), run_time=0.3)
        faux = self.ligne([("1 200", VERT_OK), ("−", WHITE), ("350", C_VEN)], 44)
        faux.next_to(titre, RIGHT, buff=0.6)
        self.au_mot("1 200 moins")
        self.play(FadeIn(faux[:2], scale=1.3), run_time=0.35)
        self.au_mot("350.")
        reste = Rectangle(width=sam.width + manque.width, height=0.62, fill_opacity=0, stroke_color=ROUGE_ERREUR,
                          stroke_width=6).move_to(VGroup(sam, manque))
        self.play(FadeIn(faux[2], scale=1.3), Indicate(tab.texte_case(0, 0), color=ROUGE_ERREUR), run_time=0.4)
        self.play(Create(reste), Create(croix(faux.copy().scale(1.05), sw=6)), run_time=0.5)
        self.au_mot("Il faut enlever")
        regle = self.bas(self.t("Enlever les deux jours connus :", 38, ORANGE_RETENUE), self.Y_BAS - 0.75)
        self.play(FadeIn(regle, shift=UP * 0.2), FadeOut(reste), run_time=0.4)
        self.au_mot("le vendredi")
        jv = self.t("vendredi", 38, C_VEN).next_to(regle, RIGHT, buff=0.25)
        js = self.ligne([("et", WHITE), ("samedi", C_SAM)], 38).next_to(jv, RIGHT, buff=0.2)
        tout = VGroup(regle, jv, js)
        if tout.get_right()[0] > 6.7:
            tout.scale_to_fit_width(13.0).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(jv), Indicate(ven, color=C_VEN, scale_factor=1.1), *allumer(tab, 0, 0), run_time=0.4)
        self.au_mot("le samedi")
        self.play(FadeIn(js), Indicate(sam, color=C_SAM, scale_factor=1.1), *allumer(tab, 0, 1), run_time=0.4)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        tab = self.tableau_pret(self.cases_jusqua(3))
        self.au_mot("À toi de jouer")
        titre = self.bas(self.t("À toi de jouer", 48, JAUNE_TITRE), self.Y_BAS + 0.05)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Combien de personnes")
        q1 = self.bas(self.ligne([("1.", AMBRE), ("Combien de personnes le samedi ?", WHITE)], 38), self.Y_BAS - 0.75)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), Circumscribe(tab.tetes[1], color=AMBRE),
                  run_time=0.6)
        self.au_mot("Et quel jour")
        q2 = self.bas(self.ligne([("2.", AMBRE), ("Quel jour a le plus de monde ?", WHITE)], 38), self.Y_BAS - 1.45)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), Indicate(tab.libelles[2], color=AMBRE, scale_factor=1.1),
                  run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.bas(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), self.Y_BAS - 2.15)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        tab = self.tableau_pret(self.cases_jusqua(3))
        titre = self.bas(self.t("Correction", 46, JAUNE_TITRE), self.Y_BAS + 0.05)
        self.play(Write(titre), *teinter_ligne(tab, 2, BLEU_PALE), run_time=0.5)
        jours = ((1, "Samedi :", 480, 220, ("Le samedi :", "480 plus", "220, égale", "700. Le")),
                 (0, "Vendredi :", 350, 150, ("Le vendredi", "350 plus", "150, égale", "500. Le")))
        for k, (c, nom, a, b, mots) in enumerate(jours):
            lg = self.ligne([(nom, WHITE), (str(a), WHITE), ("+", WHITE), (str(b), WHITE), ("=", WHITE),
                             (str(a + b), VERT_OK)], 38, 0.18)
            self.bas(lg, self.Y_BAS - 0.75 - 0.7 * k)
            self.au_mot(mots[0])
            self.play(FadeIn(lg[0], shift=RIGHT * 0.2), Circumscribe(tab.tetes[c], color=AMBRE), run_time=0.3)
            self.au_mot(mots[1])
            self.play(FadeIn(lg[1:3], scale=1.2), *allumer(tab, 0, c), run_time=0.3)
            self.au_mot(mots[2])
            self.play(FadeIn(lg[3:5], scale=1.2), *allumer(tab, 1, c), run_time=0.3)
            self.au_mot(mots[3])
            self.play(FadeIn(lg[5], scale=1.5), remplir(tab, 2, c, a + b), *allumer(tab, 2, c), run_time=0.4)
            self.play(*eteindre(tab), run_time=0.2)
            self.play(*teinter_ligne(tab, 2, BLEU_PALE), run_time=0.2)
        self.au_mot("Le dimanche :")
        ld = self.bas(self.ligne([("Dimanche :", WHITE), ("500", VERT_OK)], 38), self.Y_BAS - 2.15)
        self.play(FadeIn(ld, shift=RIGHT * 0.2), *allumer(tab, 2, 2), run_time=0.4)
        self.au_mot("Le samedi gagne")
        self.play(*eteindre(tab), run_time=0.2)
        self.play(*allumer(tab, 2, 1), run_time=0.3)
        self.au_mot("700 personnes")
        gagne = self.t("Le samedi gagne !", 42, VERT_OK).move_to(P(0, self.Y_BAS + 0.05)).align_to(P(-2.4, 0), LEFT)
        self.play(FadeIn(gagne, scale=0.7), run_time=0.4)
        self.insister(tab.texte_case(2, 1), 1.6, 0.25)
        self.au_mot("la plus grande scène")
        scene = self.t("La plus grande scène : le samedi", 30, JAUNE_TITRE).move_to(P(0, self.Y_BAS - 2.15))
        scene.align_to(P(-1.8, 0), LEFT)
        self.play(FadeIn(scene, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        tab = self.tableau_pret({**self.cases_jusqua(3), (2, 0): 500, (2, 1): 700})
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP, buff=0.12)),
                  tab.animate.scale(0.82).shift(DOWN * 0.3), run_time=0.7)
        textes = ["D'abord, la case qui manque, grâce au total.", "Puis ce nombre sert pour la suite.",
                  "Une étape après l'autre."]
        lignes = [self.bas(VGroup(self.coche(), self.t(s, 36)).arrange(RIGHT, buff=0.3), -1.45 - 0.75 * k)
                  for k, s in enumerate(textes)]
        self.au_mot("je cherche d'abord")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), *allumer(tab, 0, 2, anneau=ORANGE_Q), run_time=0.5)
        self.au_mot("grâce au total")
        self.play(*allumer(tab, 0, 3), Create(lignes[0][0]), run_time=0.5)
        self.au_mot("Puis je me sers")
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), *allumer(tab, 2, 2), run_time=0.5)
        self.play(Create(lignes[1][0]), run_time=0.3)
        self.au_mot("Une étape après")
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), Create(lignes[2][0]), run_time=0.5)
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_adultes()
        self.ecran_enfants()
        self.ecran_etape1()
        self.ecran_etape2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class StatsTableauDefiCM1(StatsTableauDefiBase):
    identite = "Maths CM1 — EleveAI"


class StatsTableauDefiCM2(StatsTableauDefiBase):
    """Même vidéo pour le CM2 : seule l'identité change."""

    identite = "Maths CM2 — EleveAI"
