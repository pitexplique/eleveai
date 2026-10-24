# stats_moyenne_ponderee.py
# EleveAI — Maths 2de — série « Statistiques », lycée, épisode 03 : CALCULER
# UNE MOYENNE PONDÉRÉE (micro du coach : stat_moyenne_ponderee, notion
# statistiques_descriptives), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la
# paysage complète du niveau : piège de la moyenne des moyennes, méthode,
# balance, coefficients, défi corrigé).
#
# ⭐ Décor et métier : le BASKET ; Maya, JOURNALISTE SPORTIVE spécialiste des
# données, présente Victor Wembanyama (problématique : résumer une carrière,
# juger un chiffre). Centres (lib/videos/centres-interet.ts, 15-18 ans) :
# ["sport"] (une idole des élèves, autre sport et autre métier que l'épisode 01).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 (saisons terminées) :
#   en.wikipedia.org/wiki/Victor_Wembanyama, tableau « Career statistics » :
#   saison régulière 2023-24 : 71 matchs, 21,4 points par match ; 2024-25 :
#   46 matchs, 24,3 ; 2025-26 : 64 matchs, 25,0 ; carrière : 181 matchs, 23,4 ;
#   séries éliminatoires 2026 : 22 matchs, 23,8.
# Calculs (Python) : 21,4 × 71 = 1 519,4 ; 24,3 × 46 = 1 117,8 ; 25 × 64 = 1 600 ;
# total 4 237,2 ; 4 237,2 ÷ 181 ≈ 23,41 → 23,4 = le chiffre officiel ✓ ;
# piège (21,4 + 24,3 + 25) ÷ 3 ≈ 23,57 → 23,6 ; deux premières saisons :
# 2 637,2 ÷ 117 ≈ 22,54 (moyenne simple 22,85) ; défi : 23,8 × 22 = 523,6,
# (4 237,2 + 523,6) ÷ 203 = 4 760,8 ÷ 203 ≈ 23,45 → 23,5.
# Questions : (10 × 20 + 30 × 10) ÷ 40 = 12,5 ; (6 × 2 + 4 × 3) ÷ 10 = 2,4.
# ⭐ Figures du coach : `tableau_donnees` (canvas_stats.Tableau) ; la BALANCE
# (droite graduée du coach, `number_line`, avec des poids) est dessinée ici.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit. Division : « ÷ ».
#
# Mapping micro → écrans (banque, stat_moyenne_ponderee) : pond_piege_moyennes →
# 03, 09 (question) · pond_deux_groupes / pond_tableau → 04, 05, 06 (question) ·
# pond_batons → 07 (balance) · pond_coeffs → 08 (question) · pond_note_manquante,
# pond_effectif_manquant → défi 10 (même calcul : somme ÷ effectif total).
# (pond_classes, 4 étoiles : centres de classes, laissé au coach.)
# Écrans : 00 garde · 01 Maya · 02 les saisons · 03 le piège · 04 la méthode ·
# 05 le total · 06 question 1 · 07 la balance · 08 question 2 · 09 question 3 ·
# 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/2de-stats-moyenne-ponderee.json (débit −10), WAV dans
# public/sons/2de-stats-moyenne-ponderee/ ; calage : stats_moyenne_ponderee_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/seconde/stats_moyenne_ponderee.py StatsMoyennePondereeSeconde -o eleveai-maths-seconde-stats-moyenne-ponderee --media_dir manim/scripts/seconde/media-stats-moyenne-ponderee
# Sortie : manim/sorties/seconde/maths/statistiques/03-moyenne-ponderee/eleveai-maths-seconde-stats-moyenne-ponderee.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g1_commun import *  # noqa: E402,F401,F403

SAISONS = ["2023-24", "2024-25", "2025-26"]
MATCHS = [71, 46, 64]
PPM = ["21,4", "24,3", "25"]
ORANGE_BALLE = "#ea580c"
COUL_SAISON = ["#93c5fd", "#fca5a5", "#86efac"]


def ballon_basket(r=0.5):
    b = Circle(radius=r, fill_color=ORANGE_BALLE, fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    l1 = Line(UP * r, DOWN * r, color=NUIT, stroke_width=3)
    l2 = Line(LEFT * r, RIGHT * r, color=NUIT, stroke_width=3)
    a1 = Arc(radius=r * 0.75, start_angle=-PI / 3, angle=2 * PI / 3, color=NUIT, stroke_width=3).shift(LEFT * r * 0.95)
    a2 = Arc(radius=r * 0.75, start_angle=2 * PI / 3, angle=2 * PI / 3, color=NUIT, stroke_width=3).shift(RIGHT * r * 0.95)
    return VGroup(b, l1, l2, a1, a2)


def panier(l=1.4):
    """Un panneau et son cercle."""
    planche = Rectangle(width=l, height=0.9 * l, stroke_color=WHITE, stroke_width=5)
    carre = Rectangle(width=0.4 * l, height=0.3 * l, stroke_color=WHITE, stroke_width=4).shift(DOWN * 0.18 * l)
    cercle = Ellipse(width=0.55 * l, height=0.14 * l, stroke_color=ORANGE_BALLE, stroke_width=6).shift(DOWN * 0.5 * l)
    filet = VGroup(*[Line(P(-0.26 * l + 0.13 * l * k, -0.5 * l), P(-0.18 * l + 0.09 * l * k, -0.8 * l), color="#e2e8f0",
                          stroke_width=2) for k in range(5)]).shift(UP * 0 * l)
    return VGroup(planche, carre, filet, cercle)


class Balance(VGroup):
    """La droite graduée du coach, avec des POIDS : un bloc par groupe, posé sur
    sa valeur, aussi haut que son effectif ; un triangle sous la moyenne
    pondérée (le point d'équilibre). Rien n'est ajouté à la scène.
    Morceaux : .axe .graduations .blocs[i] .etiq_n[i] (effectif) .etiq_v[i] (valeur)."""

    def __init__(self, groupes, mini=21, maxi=26, x0=-6.2, longueur=7.4, y=-1.4, k=0.028, fs=30,
                 fmt_n=lambda n: str(n) + chr(10) + "matchs", larg_bloc=0.62, **kw):
        super().__init__(**kw)
        self.mini, self.maxi, self.x0, self.L, self.y = mini, maxi, x0, longueur, y
        self.axe = Line(P(x0 - 0.2, y), P(x0 + longueur + 0.2, y), color=WHITE, stroke_width=5)
        self.graduations = VGroup()
        # des traits sans nombre (les valeurs sont écrites sous leurs poids)
        for v in range(mini, maxi + 1):
            self.graduations.add(Line(P(self.x(v), y - 0.1), P(self.x(v), y + 0.1), color="#94a3b8", stroke_width=3))
        self.blocs, self.etiq_n, self.etiq_v = VGroup(), VGroup(), VGroup()
        for v, n, txt_v, coul in groupes:
            b = Rectangle(width=larg_bloc, height=n * k, fill_color=coul, fill_opacity=1, stroke_color=WHITE,
                          stroke_width=2).move_to(P(self.x(v), y), aligned_edge=DOWN)
            self.blocs.add(b)
            self.etiq_n.add(Text(fmt_n(n), font_size=fs - 6, color=coul).next_to(b, UP, buff=0.12))
            self.etiq_v.add(Text(txt_v, font_size=fs - 4, color=coul, weight=BOLD).move_to(P(self.x(v), y - 0.42)))
        self.add(self.axe, self.graduations, self.blocs, self.etiq_n, self.etiq_v)

    def x(self, v):
        return self.x0 + (v - self.mini) / (self.maxi - self.mini) * self.L

    def pivot(self, v, couleur=VERT_OK, txt=None, fs=30, buff_txt=0.12):
        tri = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.22).move_to(
            P(self.x(v), self.y - 0.04), aligned_edge=UP)
        g = VGroup(tri)
        if txt:
            g.add(Text(txt, font_size=fs, color=couleur, weight=BOLD).next_to(tri, DOWN, buff=buff_txt))
        return g

    def repere(self, v, couleur=ROUGE_ERREUR, txt=None, haut=2.4, fs=26):
        tr = DashedLine(P(self.x(v), self.y), P(self.x(v), self.y + haut), color=couleur, stroke_width=4,
                        dash_length=0.1)
        g = VGroup(tr)
        if txt:
            g.add(Text(txt, font_size=fs, color=couleur).next_to(tr, UP, buff=0.08))
        return g


class StatsMoyennePondereeSeconde(Paysage2de):
    nom_voix = "2de-stats-moyenne-ponderee"
    fichier_marques = "stats_moyenne_ponderee_marques.json"

    def tableau(self, lignes, libelles, entetes=SAISONS, y=None, largeur_case=2.0):
        tab = Tableau(entetes, lignes, libelles=libelles, coin="Saison", largeur_case=largeur_case,
                      largeur_libelle=3.5, hauteur=0.8, fs=32)
        tab.move_to(P(-0.4, 0)).align_to(P(0, 3.5), UP)
        return textes_devant(tab)

    def tab2(self, plein=True):
        return self.tableau([MATCHS if plein else [None] * 3, PPM if plein else [None] * 3],
                            ["Matchs", "Points par match"])

    def tab3(self, points=None):
        return self.tableau([MATCHS, PPM, points or [None] * 3], ["Matchs", "Points par match", "Points marqués"])

    def gauche(self, mob, y, x=-5.9):
        return mob.move_to(P(0, y)).align_to(P(x, 0), LEFT)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une moyenne pondérée", self.identite, "verte")
        pa = panier(1.3).move_to(P(1.2, 0.6))
        b = ballon_basket(0.42).move_to(P(-2.2, -0.4))
        self.au_mot("Calculer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.9)
        self.au_mot("Comment résumer")
        self.play(FadeIn(pa), FadeIn(b, shift=UP * 0.3), run_time=0.5)
        cible = pa[3].get_center() + UP * 0.35
        self.play(MoveAlongPath(b, ArcBetweenPoints(b.get_center(), cible, angle=-PI / 2)), run_time=1.0)
        self.play(b.animate.shift(DOWN * 0.9).set_opacity(0.0), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : Maya, journaliste ──────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        b = ballon_basket(0.7).move_to(P(-3.6, 1.6))
        self.au_mot("Maya")
        nom = self.t("Maya", 50, JAUNE_TITRE).move_to(P(-3.6, 0.25))
        metier = self.bloc(["journaliste sportive,", "spécialiste des données"], 34, BLEU_CALCUL).next_to(nom, DOWN,
                                                                                                    buff=0.2)
        metier.set_x(-3.6)
        self.play(FadeIn(b, shift=DOWN * 0.4), Write(nom), run_time=0.6)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Ce soir")
        l0 = self.col(self.t("Ce soir, à l'antenne :", 34, "#cbd5e1"), 2.5)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Victor Wembanyama")
        l1 = self.col(self.t("Victor Wembanyama", 44, JAUNE_TITRE), 1.75)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Rotate(b, PI, run_time=0.8), run_time=0.8)
        self.au_mot("le géant français")
        l2 = self.col(self.bloc(["le géant français", "du basket américain"], 34, WHITE), 0.85)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("trois saisons")
        l3 = self.col(self.ligne([("3", BLEU_CALCUL), ("saisons", WHITE)], 40), -0.15)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Sa question")
        q = self.col(self.bloc(["Combien de points par match,", "sur toute sa carrière ?"], 36, ORANGE_RETENUE), -1.3)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.insister(q, 1.05, 0.3)
        self.attendre_voix()

    # ── 02 : les trois saisons ──────────────────────────────────────────────

    def ecran_donnees(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-donnees")
        tab = self.tab2(plein=False)
        self.play(FadeIn(tab, shift=DOWN * 0.2), run_time=0.6)
        etapes = [("71 matchs", 0, 0), ("21,4 points", 1, 0), ("écourtée", None, 1), ("46 matchs", 0, 1),
                  ("24,3 points", 1, 1), ("64 matchs", 0, 2), ("25 points", 1, 2)]
        for ext, r, c in etapes:
            self.au_mot(ext)
            if r is None:  # la 2e saison, écourtée par une blessure
                bl = self.gauche(self.ligne([("2024-25 :", COUL_SAISON[1]), ("saison écourtée par une blessure", WHITE)],
                                            34), 0.2)
                self.play(FadeIn(bl, shift=UP * 0.15), Indicate(tab.tetes[1], color=COUL_SAISON[1]), run_time=0.5)
                continue
            self.play(remplir(tab, r, c, (MATCHS if r == 0 else PPM)[c]), run_time=0.35)
        self.attendre_voix()

    # ── 03 : le piège (la moyenne des moyennes) ─────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-piege")
        tab = self.tab2()
        self.add(tab)
        self.au_mot("Le piège")
        tit = self.gauche(self.t("Le piège", 48, ROUGE_ERREUR), 0.15)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("faire la moyenne des trois moyennes")
        self.play(*teinter_ligne(tab, 1), run_time=0.5)
        self.au_mot("21,4 plus")
        f, f2 = self.ligne2([("(21,4 + 24,3 + 25) ÷ 3", WHITE)], [("≈", WHITE), ("23,6", ROUGE_ERREUR)], -0.8, fs=44,
                            xl=-5.9)
        self.play(FadeIn(f, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("environ 23,6")
        self.play(FadeIn(f2, scale=1.3), run_time=0.4)
        self.au_mot("Faux")
        self.play(Create(croix(VGroup(f, f2), sw=6)), run_time=0.4)
        self.au_mot("n'a que 46 matchs")
        l1 = self.gauche(self.ligne([("46 matchs", COUL_SAISON[1]), ("compteraient autant que", WHITE),
                                     ("71", COUL_SAISON[0]), ("ou", WHITE), ("64", COUL_SAISON[2])], 38), -1.75)
        self.play(FadeIn(l1, shift=UP * 0.15), *allumer(tab, 0, 1), run_time=0.5)
        self.au_mot("autant que les autres")
        self.insister(l1[0], 1.2, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode (chaque saison pèse selon ses matchs) ───────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        tab = self.tab3()
        self.add(tab)
        self.au_mot("La bonne méthode")
        tit = self.gauche(self.ligne([("La méthode :", VERT_OK), ("chaque saison pèse selon ses matchs", WHITE)], 36),
                          -0.75)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), *teinter_ligne(tab, 0), run_time=0.6)
        calc = [("21,4 × 71", "1 519,4", "21,4 fois 71", "égale 1 519,4"),
                ("24,3 × 46", "1 117,8", "24,3 fois 46", "égale 1 117,8"),
                ("25 × 64", "1 600", "25 fois 64", "égale 1 600")]
        ligne_prec = None
        for c, (gauche, res, ext1, ext2) in enumerate(calc):
            self.au_mot(ext1)
            a, b = self.ligne2([(gauche, WHITE)], [("=", WHITE), (res, AMBRE)], -1.6, fs=44, xl=-5.9)
            anims = [FadeIn(a, shift=UP * 0.15), Indicate(tab.texte_case(0, c), color=AMBRE),
                     Indicate(tab.texte_case(1, c), color=AMBRE)]
            if ligne_prec is not None:
                anims.append(FadeOut(ligne_prec, shift=UP * 0.2))
            self.play(*anims, run_time=0.45)
            self.au_mot(ext2)
            self.play(FadeIn(b, scale=1.3), remplir(tab, 2, c, res, color="#b45309"), run_time=0.45)
            ligne_prec = VGroup(a, b)
        self.au_mot("En tout")
        t1, t2 = self.ligne2([("En tout :", WHITE)], [("4 237,2 points", AMBRE)], -2.45, fs=44, xl=-5.9)
        self.play(FadeIn(t1, shift=UP * 0.15), *teinter_ligne(tab, 2), run_time=0.4)
        self.play(FadeIn(t2, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 05 : diviser par le nombre total de matchs ──────────────────────────

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-total")
        tab = self.tab3(points=["1 519,4", "1 117,8", "1 600"])
        self.add(tab)
        self.au_mot("Je divise")
        tot = self.gauche(self.ligne([("Total :", WHITE), ("4 237,2 points", AMBRE)], 40), -0.75)
        self.play(FadeIn(tot, shift=RIGHT * 0.2), *teinter_ligne(tab, 2), run_time=0.5)
        self.au_mot("71 plus 46")
        m1, m2 = self.ligne2([("Matchs : 71 + 46 + 64", WHITE)], [("=", WHITE), ("181", BLEU_CALCUL)], -1.55, fs=40,
                             xl=-5.9)
        self.play(FadeIn(m1, shift=RIGHT * 0.2), *teinter_ligne(tab, 0, couleur="#bfdbfe"), run_time=0.5)
        self.au_mot("égale 181")
        self.play(FadeIn(m2, scale=1.3), run_time=0.35)
        self.au_mot("4 237,2 divisé par 181")
        d1, d2 = self.ligne2([("4 237,2 ÷ 181", WHITE)], [("≈", WHITE), ("23,4", VERT_OK)], -2.4, fs=46, xl=-5.9)
        self.play(FadeIn(d1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 23,4")
        self.play(FadeIn(d2, scale=1.4), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(d1, d2), buff=0.12)), run_time=0.4)
        self.au_mot("chiffre officiel")
        off = self.ligne([("Officiel :", "#cbd5e1"), ("23,4", VERT_OK)], 40)
        ok = self.coche()
        grp = VGroup(off, ok).arrange(RIGHT, buff=0.3).move_to(P(3.3, -2.4))
        self.play(FadeIn(off, shift=LEFT * 0.2), run_time=0.4)
        self.play(Create(ok), run_time=0.3)
        self.attendre_voix()

    # ── 06 : question 1 (deux groupes de matchs) ────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        bal = Balance([(20, 10, "20", COUL_SAISON[0]), (10, 30, "10", COUL_SAISON[1])], mini=8, maxi=22,
                      x0=-6.1, longueur=5.9, y=-1.6, k=0.07)
        self.play(FadeIn(bal, shift=UP * 0.2), run_time=0.6)

        def geste():
            return [FadeIn(bal.pivot(12.5, txt="12,5"), shift=UP * 0.2)]

        t0 = self.question("06-question", "06b-reponse", ["10 matchs à 20 points, 30 à 10 :",
                                                          "moyenne sur les 40 matchs ?"],
                           ["15", "12,5", "500"], 1,
                           [("200 + 300 = 500 points", VERT_OK, "200 plus 300"),
                            ("500 ÷ 40 = 12,5", VERT_OK, "divisé par 40"),
                            ("15 : oublie les effectifs", ROUGE_CLAIR, "15 oublie"),
                            ("500 : oublie de diviser", ROUGE_CLAIR, "et 500")], geste=geste)
        print(f"QUESTION 1 t = {mmss(t0)}", flush=True)

    # ── 07 : la balance ─────────────────────────────────────────────────────

    def ecran_balance(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-balance")
        bal = Balance([(21.4, 71, "21,4", COUL_SAISON[0]), (24.3, 46, "24,3", COUL_SAISON[1]),
                       (25.0, 64, "25", COUL_SAISON[2])])
        bal.etiq_n[1].shift(LEFT * 0.14)   # 24,3 et 25 sont proches : on écarte leurs étiquettes
        bal.etiq_n[2].shift(RIGHT * 0.14)
        self.au_mot("une balance")
        tit = self.col(self.t("Une balance", 48, JAUNE_TITRE), 2.5)
        self.play(Write(tit), Create(bal.axe), FadeIn(bal.graduations), run_time=0.7)
        self.au_mot("Chaque saison est un poids")
        self.play(LaggedStart(*[AnimationGroup(GrowFromEdge(b, DOWN), FadeIn(v)) for b, v in
                                zip(bal.blocs, bal.etiq_v)], lag_ratio=0.3), run_time=1.2)
        self.au_mot("aussi lourd")
        l1 = self.col(self.bloc(["poids = nombre", "de matchs"], 36, WHITE), 1.55)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(e, shift=DOWN * 0.15) for e in bal.etiq_n],
                                                              lag_ratio=0.2), run_time=0.8)
        self.au_mot("La moyenne pondérée, 23,4")
        piv = bal.pivot(23.41, txt="23,4")
        l2 = self.col(self.ligne([("équilibre :", WHITE), ("23,4", VERT_OK)], 40), 0.35)
        self.play(FadeIn(piv, shift=UP * 0.3), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.6)
        self.insister(piv[0], 1.5, 0.3)
        self.au_mot("Il penche")
        l3 = self.col(self.bloc(["plus près des saisons", "les plus chargées"], 34, "#cbd5e1"), -0.75)
        self.play(FadeIn(l3, shift=UP * 0.15), Indicate(bal.blocs[0], color=WHITE, scale_factor=1.08),
                  Indicate(bal.blocs[2], color=WHITE, scale_factor=1.08), run_time=0.8)
        self.attendre_voix()

    # ── 08 : question 2 (des paniers à 2 et à 3 points) ─────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        balles = VGroup()
        for k in range(10):
            b = ballon_basket(0.28)
            pts = Text("2" if k < 6 else "3", font_size=26, color=WHITE, weight=BOLD).set_stroke(NUIT, 5,
                                                                                               background=True)
            balles.add(VGroup(b, pts.move_to(b)))
        balles[:6].arrange_in_grid(2, 3, buff=0.25).move_to(P(-4.6, 0.3))
        balles[6:].arrange_in_grid(2, 2, buff=0.25).move_to(P(-2.1, 0.3))
        lab = VGroup(VGroup(Text("6 paniers", font_size=28, color="#cbd5e1"), Text("à 2 points", font_size=28,
                                                                                    color="#cbd5e1")).arrange(DOWN, buff=0.08)
                     .next_to(balles[:6], DOWN, buff=0.35),
                     VGroup(Text("4 paniers", font_size=28, color="#cbd5e1"), Text("à 3 points", font_size=28,
                                                                                    color="#cbd5e1")).arrange(DOWN, buff=0.08)
                     .next_to(balles[6:], DOWN, buff=0.35))
        lab[0].set_x(-4.6)
        lab[1].set_x(-2.0)

        def avant():
            self.au_mot("6 paniers")
            self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in balles[:6]], lag_ratio=0.1), FadeIn(lab[0]),
                      run_time=0.7)
            self.au_mot("4 paniers")
            self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in balles[6:]], lag_ratio=0.1), FadeIn(lab[1]),
                      run_time=0.6)

        def geste():
            return [Indicate(balles[6:], color=AMBRE, scale_factor=1.1)]

        t0 = self.question("08-question", "08b-reponse", ["10 paniers : combien de points", "par panier, en moyenne ?"],
                           ["2,5", "24", "2,4"], 2,
                           [("6 × 2 + 4 × 3 = 24 points", VERT_OK, "6 fois 2"),
                            ("24 ÷ 10 = 2,4", VERT_OK, "divisé par 10"),
                            ("2,5 : ne pèse pas les paniers", ROUGE_CLAIR, "2,5 ne"),
                            ("24 : oublie de diviser", ROUGE_CLAIR, "et 24")], avant_choix=avant, geste=geste)
        print(f"QUESTION 2 t = {mmss(t0)}", flush=True)

    # ── 09 : question 3 (vers quel côté penche la moyenne ?) ────────────────

    def ecran_question3(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        bal = Balance([(21.4, 71, "21,4", COUL_SAISON[0]), (24.3, 46, "24,3", COUL_SAISON[1])], mini=21, maxi=25,
                      x0=-6.1, longueur=5.9)
        self.play(FadeIn(bal, shift=UP * 0.2), run_time=0.6)

        def geste():
            return [FadeIn(bal.pivot(22.54, txt="≈ 22,5"), shift=UP * 0.2),
                    FadeIn(bal.repere(22.85, txt="22,85", haut=2.6))]

        t0 = self.question("09-question", "09b-reponse", ["71 matchs à 21,4 et 46 à 24,3 :", "la moyenne est…"],
                           ["exactement 22,85", "plus proche de 21,4", "plus proche de 24,3"], 1,
                           [("Plus de matchs à 21,4 :", VERT_OK, "la première saison"),
                            ("la moyenne penche vers 21,4", VERT_OK, "tire la moyenne"),
                            ("22,85 : moyenne simple", ROUGE_CLAIR, "22,85, c'est")],
                           rangee=False, largeur=5.2, geste=geste)
        print(f"QUESTION 3 t = {mmss(t0)}", flush=True)

    # ── 10 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-defi")
        tab = self.tableau([MATCHS + [None], PPM + [None]], ["Matchs", "Points par match"],
                           entetes=SAISONS + ["Séries 2026"])
        self.add(tab)
        self.au_mot("À toi de jouer")
        tit = self.gauche(self.t("À toi de jouer", 48, JAUNE_TITRE), 0.2)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("22 matchs")
        self.play(remplir(tab, 0, 3, 22), *allumer(tab, 0, 3), run_time=0.45)
        self.au_mot("23,8 points")
        self.play(remplir(tab, 1, 3, "23,8"), *allumer(tab, 1, 3), run_time=0.45)
        self.au_mot("Quelle est sa moyenne")
        q = self.gauche(self.ligne([("Moyenne sur tous ses matchs :", WHITE), ("?", ORANGE_RETENUE)], 40), -0.7)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.45)
        self.insister(q[1], 1.5, 0.25)
        self.au_mot("Arrondis")
        ar = self.gauche(self.t("Arrondis au dixième.", 34, "#cbd5e1"), -1.45)
        self.play(FadeIn(ar, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.gauche(self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE), -2.3)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        self.dire("10b-correction")
        tab = self.tableau([MATCHS + [22], PPM + ["23,8"]], ["Matchs", "Points par match"],
                           entetes=SAISONS + ["Séries 2026"])
        self.add(tab)
        tit = self.gauche(self.t("Correction", 48, JAUNE_TITRE), 0.2)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("23,8 fois 22")
        a, b = self.ligne2([("Séries : 23,8 × 22", WHITE)], [("=", WHITE), ("523,6", AMBRE)], -0.55, fs=40, xl=-5.9)
        self.play(FadeIn(a, shift=RIGHT * 0.2), *teinter(tab, [(0, 3), (1, 3)]), run_time=0.45)
        self.au_mot("égale 523,6")
        self.play(FadeIn(b, scale=1.3), run_time=0.35)
        self.au_mot("4 237,2 plus 523,6")
        c, d = self.ligne2([("Points : 4 237,2 + 523,6", WHITE)], [("=", WHITE), ("4 760,8", AMBRE)], -1.3, fs=40,
                           xl=-5.9)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 4 760,8")
        self.play(FadeIn(d, scale=1.3), run_time=0.35)
        self.au_mot("181 plus 22")
        e, f = self.ligne2([("Matchs : 181 + 22", WHITE)], [("=", WHITE), ("203", BLEU_CALCUL)], -2.05, fs=40, xl=-5.9)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 203")
        self.play(FadeIn(f, scale=1.3), run_time=0.35)
        self.au_mot("4 760,8 divisé par 203")
        g, h = self.ligne2([("4 760,8 ÷ 203", WHITE)], [("≈", WHITE), ("23,5 points", VERT_OK)], -2.85, fs=44, xl=-5.9,
                           maxi=4.6)
        self.play(FadeIn(g, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 23,5")
        self.play(FadeIn(h, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(g, h), buff=0.12)), run_time=0.4)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        self.dire("11-finale")
        self.add(ballon_basket(0.34).move_to(P(5.6, 3.0)))
        self.XL = -5.3
        lignes = self.finale([("Moyenne pondérée =", "somme des (valeur × effectif) ÷ effectif total."),
                              ("Chaque valeur pèse", "selon son effectif."),
                              ("Jamais la moyenne simple des moyennes", "quand les effectifs diffèrent !")],
                             [1.85, 0.25, -1.35], fs=36)
        for lg, ext in zip(lignes, ["La moyenne pondérée", "Chaque valeur pèse", "Et jamais"]):
            self.au_mot(ext)
            self.montrer_ligne(lg)
        self.insister(lignes[2][1], 1.05, 0.3)
        self.attendre_voix(marge=1.0)
        self.XL = OutilsPaysage.XL

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_piege()
        self.ecran_methode()
        self.ecran_total()
        self.ecran_question1()
        self.ecran_balance()
        self.ecran_question2()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")
