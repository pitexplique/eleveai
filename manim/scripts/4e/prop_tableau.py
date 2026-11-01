# prop_tableau.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 21 : COMPLÉTER UN TABLEAU DE PROPORTIONNALITÉ (micro du
# coach : prop_table, notion prop_proportionnalite), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE. PAYSAGE SEULEMENT (le short 4e-prop-proportionnalite-short-
# tableau existe déjà).
# ⭐ Méthodes travaillées : MULTIPLIER une colonne (× 2, ÷ 2), ADDITIONNER deux
# colonnes (« + » en haut et en bas), le COEFFICIENT (flèche latérale × 75,
# puis ÷ 75 pour remonter). Pas de produit en croix (réservé à l'épisode 24).
# ⭐ Leurres (fil rouge) : 1. AJOUTER au lieu de multiplier (question 1 : 302 g
# = 300 + 2 ; écran 07 : « + 2 » barré ; question 2 : 1 425 = 1 500 − 75) ;
# 3. inverser le coefficient (question 2 : 112 500 = 1 500 × 75) ; question 1 :
# 600 g (le double, pour 8 tablettes et non 6).
#
# Décor et métier : CUISINE, Inès, CHOCOLATIÈRE (son atelier, ses tablettes, ses
# commandes). Masses inventées, plausibles (75 g de chocolat et 15 g de sucre
# par tablette) : aucun chiffre du monde réel, pas de source à citer.
# Centres d'intérêt : cuisine.
#
# Écrans : 00 garde · 01 Inès et ses trois commandes · 02 le tableau · 03
# multiplier une colonne (× 2, ÷ 2) · 04 additionner deux colonnes · 05
# QUESTION 1 (6 tablettes) · 06 le coefficient × 75 (10 tablettes) · 07 le
# piège « + 2 » · 08 QUESTION 2 (1 500 g ÷ 75) · 09 défi du sucre · 09b
# correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-tableau.json (validée par Frédéric le 01/11, débit
# −10), WAV dans public/sons/4e-prop-tableau/ ; marques mot à mot :
# manim/scripts/4e/prop_tableau_marques.json (scripts/marques_dump.ps1 puis un
# cues2marques qui garde une marque par occurrence).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; repris de manim/scripts/6e/prop_tableau.py (PropTableauBase :
# ligne_rep bornée, muet(), plus_bas()) et de prop_grandeur_coherence.py
# (_disposer_q : texte des choix loin de la coche ; choix non audités à la
# réponse). Ajouté ICI : tablette(), ines(), toque(), bol().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_tableau.py PropTableau4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_tableau.py PropTableau4e -o eleveai-maths-4e-prop-tableau --media_dir manim/media-prop-4e-21
# Sortie : manim/sorties/4e/maths/proportionnalite/21-tableau/eleveai-maths-4e-prop-tableau.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
import prop_tableau as _p6  # noqa: E402  (le 6e : manim/scripts/6e/prop_tableau.py)

if not hasattr(_p6, "PropTableauBase"):  # ce fichier-ci s'appelle aussi prop_tableau : on charge le 6e par son chemin
    import importlib.util
    _spec = importlib.util.spec_from_file_location(
        "prop_tableau_6e", Path(__file__).resolve().parents[1] / "6e" / "prop_tableau.py")
    _p6 = importlib.util.module_from_spec(_spec)
    _spec.loader.exec_module(_p6)

PropTableauBase6e, plus_bas = _p6.PropTableauBase, _p6.plus_bas

CHOCO = "#7c2d12"
CHOCO_C = "#a16207"
CREME = "#fef3c7"


def tablette(s=1.0, n=(4, 2), couleur=CHOCO):
    """Une tablette de chocolat : carrés en relief dans un papier doré."""
    nx, ny = n
    u = 0.24
    carres = VGroup(*[RoundedRectangle(width=u - 0.03, height=u - 0.03, corner_radius=0.03, fill_color=couleur,
                                       fill_opacity=1, stroke_color="#451a03", stroke_width=2)
                      .move_to(P((i - (nx - 1) / 2) * u, (j - (ny - 1) / 2) * u))
                      for i in range(nx) for j in range(ny)])
    papier = RoundedRectangle(width=nx * u + 0.12, height=ny * u + 0.12, corner_radius=0.05,
                              fill_color="#facc15", fill_opacity=1, stroke_width=0)
    return VGroup(papier, carres).scale(s)


def toque(p):
    """La toque blanche de la chocolatière, posée sur la tête de p."""
    c = p.tete.get_center()
    r = p.tete.width / 2
    bande = RoundedRectangle(width=r * 1.9, height=r * 0.45, corner_radius=0.05, fill_color=WHITE,
                             fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2).move_to(c + UP * r * 1.0)
    bouffe = VGroup(*[Circle(radius=r * 0.55, fill_color=WHITE, fill_opacity=1, stroke_color="#cbd5e1",
                             stroke_width=2).move_to(c + UP * r * 1.55 + RIGHT * x * r) for x in (-0.5, 0, 0.5)])
    return VGroup(bouffe, bande)


def ines(s=1.0):
    """Inès, chocolatière : tablier crème taché de chocolat, toque blanche."""
    p = personne(peau="#c68642", tenue="#be123c", cheveux="#111827", longs=True)
    tab = p.corps.copy().set_fill(CREME, 1).scale(0.8).shift(DOWN * 0.15)
    tache = Circle(radius=0.09, fill_color=CHOCO, fill_opacity=1, stroke_width=0).move_to(tab.get_center() + P(0.2, -0.3))
    p.add(tab, tache, toque(p))
    return p.scale(s)


def bol(s=1.0):
    """Un bol de chocolat fondu."""
    coupe = AnnularSector(inner_radius=0, outer_radius=0.6, angle=PI, start_angle=PI, fill_color="#e2e8f0",
                          fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
    choco = Ellipse(width=1.15, height=0.22, fill_color=CHOCO_C, fill_opacity=1, stroke_width=0).move_to(
        coupe.get_top() + DOWN * 0.03)
    cuillere = Line(P(0.15, 0.05), P(0.55, 0.6), color="#92400e", stroke_width=8)
    return VGroup(cuillere, coupe, choco).scale(s)


class PropTableauBase(PropTableauBase6e):
    nom_voix = "4e-prop-tableau"
    fichier_marques = "prop_tableau_marques.json"
    LIBS = ["Tablettes", "Chocolat (g)"]
    VALS = [[2, 4, 8, 12], [150, 300, 600, 900]]
    X0 = -0.6

    def _disposer_q(self, question, choix, phrase):
        """Le texte de chaque choix s'arrête à 0,8 du bord droit de sa carte :
        la coche verte de la réponse ne le frôle jamais (épisode 18)."""
        r = super()._disposer_q(question, choix, phrase)
        for c in r[2]:
            corps = c[1][1]
            lim = c[0].get_right()[0] - 0.8
            if corps.get_right()[0] > lim:
                g = corps.get_left()[0]
                corps.scale_to_fit_width(lim - g).align_to(P(g, 0), LEFT)
        return r

    def question_pause(self, *a, **k):
        """Les choix, audités quand ils entrent, ne le sont plus à la réponse."""
        avant = k.pop("autres_q", None)

        def figer(sc):
            for c in sc.cartes_q:
                for f in c.get_family():
                    if isinstance(f, Text):
                        f._pas_audit = True
            if avant:
                avant(sc)
        return super().question_pause(*a, autres_q=figer, **k)

    def table_choco(self, connues, centre=None, vals=None, libs=None, lc=1.5):
        return self.table_potions(connues, centre=centre, vals=vals or self.VALS, libs=libs or self.LIBS)

    def lc(self, morceaux, y, fs=40, x=None):
        return self.ligne_c(morceaux, y, fs=fs, x=x)

    def jouer(self, lg, mots, extra=None, rt=0.3):
        """Chaque morceau de la ligne lg à son mot (extra[i] : animations jointes)."""
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            anims = list((extra or {}).get(i, []))
            self.play(FadeIn(m, shift=RIGHT * 0.2) if i < len(lg) - 1 else FadeIn(m, scale=1.3), *anims,
                      run_time=rt)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Compléter un tableau de proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Compléter")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tb = TableauProp(self.LIBS, [["?"] * 4] * 2, montrer=False, largeur_case=1.2, largeur_libelle=2.6,
                         hauteur=0.75, fs=34, centre=P(0.3, 0.35))
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        trous = [tb.trou(r, c) for r in range(2) for c in range(4)]
        self.play(LaggedStart(*[FadeIn(t, scale=1.4) for t in trous], lag_ratio=0.08), run_time=0.7)
        self.au_mot("L'atelier")
        deco = VGroup(tablette(1.3), bol(0.9)).arrange(DOWN, buff=0.4).move_to(P(-5.0, 0.35))
        self.play(FadeIn(deco, scale=0.7), run_time=0.5)
        self.au_mot("Inès")
        nom = self.t("L'atelier d'Inès", 34, AMBRE).next_to(tb.carte, DOWN, buff=0.3)
        self.play(FadeIn(nom, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Inès, chocolatière, et ses trois commandes ─────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = ines(1.0).move_to(P(-5.55, -1.0))
        self.au_mot("Voici Inès")
        nom = self.t("Inès", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("chocolatière")
        met = self.t("chocolatière", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        met.shift(RIGHT * max(0, -6.5 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("4 tablettes")
        quatre = VGroup(*[tablette(0.9) for _ in range(4)]).arrange(RIGHT, buff=0.18).move_to(P(-1.9, 1.0))
        l1 = self.ligne([("4 tablettes", WHITE), ("→", WHITE), ("300 g", AMBRE)], 38).move_to(P(-1.9, -0.05))
        self.play(LaggedStart(*[FadeIn(t, shift=DOWN * 0.2) for t in quatre], lag_ratio=0.2), FadeIn(l1[0]),
                  run_time=0.6)
        self.au_mot("300 grammes")
        b = bol(0.8).next_to(quatre, UP, buff=0.4)
        self.play(FadeIn(l1[1]), FadeIn(l1[2], scale=1.3), FadeIn(b, scale=0.7), run_time=0.4)
        self.insister(l1[2], 1.12, 0.2)
        self.au_mot("trois commandes")
        bon = self.t("Commandes", 36, JAUNE_TITRE).move_to(P(3.7, 2.2))
        self.play(Write(bon), run_time=0.5)
        lignes = []
        for k, mot in enumerate(["8 tablettes", "2 tablettes", "12 tablettes"]):
            lg = self.ligne([(mot, WHITE), ("→ ? g", ORANGE_RETENUE)], 36).move_to(P(3.7, 1.25 - 0.95 * k))
            lg.align_to(bon, LEFT)
            lg[1].sans_synchro = True
            self.au_mot(mot)
            self.play(FadeIn(lg[0], shift=RIGHT * 0.2), FadeIn(lg[1]), run_time=0.4)
            lignes.append(lg)
        self.au_mot("Combien")
        self.play(LaggedStart(*[Indicate(lg[1], color=AMBRE) for lg in lignes], lag_ratio=0.25), run_time=0.9)
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        tb, _ = self.table_choco(set())
        self.au_mot("tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.6)
        self.au_mot("En haut")
        self.play(Indicate(tb.libelles[0], color=AMBRE, scale_factor=1.2), run_time=0.6)
        self.au_mot("En bas")
        self.play(Indicate(tb.libelles[1], color=AMBRE, scale_factor=1.2), run_time=0.6)
        self.au_mot("4 tablettes")
        self.play(tb.allumer(0, 1), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.4)
        self.au_mot("300 grammes")
        self.play(tb.allumer(1, 1), FadeIn(tb.valeur(1, 1), scale=1.4), run_time=0.4)
        self.play(tb.eteindre(0, 1), tb.eteindre(1, 1), run_time=0.3)
        self.au_mot("Chaque tablette")
        self.play(*[FadeIn(tb.trou(r, c), scale=1.3) for r in (0, 1) for c in (0, 2, 3)], run_time=0.5)
        self.au_mot("proportionnelle")
        phr = self.t("La masse est proportionnelle au nombre de tablettes.", 32, VERT_OK).move_to(P(self.X0, -1.0))
        self.play(FadeIn(phr, shift=UP * 0.15), run_time=0.5)
        rang = VGroup(*[tablette(0.7) for _ in range(4)]).arrange(RIGHT, buff=0.15).move_to(P(self.X0, -2.2))
        self.play(LaggedStart(*[FadeIn(t, shift=DOWN * 0.2) for t in rang], lag_ratio=0.2), run_time=0.7)
        self.attendre_voix()

    def methode(self, s, mot):
        """Le nom de la méthode, sous le tableau, à son mot."""
        self.au_mot(mot)
        phr = self.t(s, 36, FLECHE_COL).move_to(P(self.X0, -3.1))
        self.play(FadeIn(phr, shift=UP * 0.15), run_time=0.4)
        return phr

    # ── 03 : multiplier une colonne (× 2, ÷ 2) ──────────────────────────────
    def ecran_multiplier(self):
        self.ecran("03-multiplier")
        tb, deja = self.table_choco({(0, 1), (1, 1)})
        self.add(deja)
        self.methode("Multiplier une colonne", "multiplier une colonne")
        # 8 = 4 × 2, à droite (la colonne de 8 est à droite)
        h = tb.fleche_col(1, 2, "× 2", ligne=0)
        b = tb.fleche_col(1, 2, "× 2", ligne=1)
        l1 = self.lc([("8 =", WHITE), ("4 ×", WHITE), ("2", FLECHE_COL)], -1.55, fs=38, x=2.0)
        l2 = self.lc([("300 ×", WHITE), ("2 =", WHITE), ("600 g", VERT_OK)], -2.3, fs=38, x=2.0)
        self.au_mot("8 tablettes")
        self.play(tb.remplir(0, 2, 8), FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("4 fois")
        self.play(tb.allumer(0, 1), tb.allumer(0, 2), Create(h.fleche), FadeIn(l1[1], shift=RIGHT * 0.2),
                  run_time=0.4)
        self.au_mot("2. Donc")
        self.play(FadeIn(h.etiquette, scale=1.4), FadeIn(l1[2], scale=1.3), run_time=0.3)
        self.au_mot("300 fois")
        self.play(tb.eteindre(0, 1), tb.eteindre(0, 2), tb.allumer(1, 1), Create(b.fleche),
                  FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("2, égale 600")
        self.play(FadeIn(b.etiquette, scale=1.4), FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("600 grammes")
        self.play(FadeIn(l2[2], scale=1.3), tb.remplir(1, 2, 600), run_time=0.4)
        self.play(tb.eteindre(1, 1), tb.allumer(1, 2), run_time=0.3)
        # 2 = 4 ÷ 2, à gauche
        h2 = tb.fleche_col(1, 0, "÷ 2", ligne=0)
        b2 = tb.fleche_col(1, 0, "÷ 2", ligne=1)
        l3 = self.lc([("2 =", WHITE), ("4 ÷", WHITE), ("2", FLECHE_COL)], -1.55, fs=38, x=-3.2)
        l4 = self.lc([("300 ÷", WHITE), ("2 =", WHITE), ("150 g", VERT_OK)], -2.3, fs=38, x=-3.2)
        self.au_mot("2 tablettes")
        self.play(tb.eteindre(1, 2), tb.remplir(0, 0, 2), FadeIn(l3[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("4 divisé")
        self.play(tb.allumer(0, 1), tb.allumer(0, 0), Create(h2.fleche), FadeIn(l3[1], shift=RIGHT * 0.2),
                  run_time=0.4)
        self.au_mot("2. Donc", 2)
        self.play(FadeIn(h2.etiquette, scale=1.4), FadeIn(l3[2], scale=1.3), run_time=0.3)
        self.au_mot("300 divisé")
        self.play(tb.eteindre(0, 1), tb.eteindre(0, 0), tb.allumer(1, 1), Create(b2.fleche),
                  FadeIn(l4[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("2, égale 150")
        self.play(FadeIn(b2.etiquette, scale=1.4), FadeIn(l4[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("150 grammes")
        self.play(FadeIn(l4[2], scale=1.3), tb.remplir(1, 0, 150), run_time=0.4)
        self.play(tb.eteindre(1, 1), tb.allumer(1, 0), run_time=0.3)
        self.insister(l4[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 04 : additionner deux colonnes (12 = 8 + 4) ─────────────────────────
    def ecran_additionner(self):
        self.ecran("04-additionner")
        tb, deja = self.table_choco({(r, c) for r in range(2) for c in range(3)})
        self.add(deja)
        self.methode("Additionner deux colonnes", "additionner deux colonnes")
        l1 = self.lc([("12 =", WHITE), ("8 +", WHITE), ("4", WHITE)], -1.45, fs=40)
        l2 = self.lc([("600 +", WHITE), ("300 =", WHITE), ("900 g", VERT_OK)], -2.25, fs=40)
        hp, bp = tb.plus(1, 2), plus_bas(tb, 1, 2)
        self.au_mot("12 tablettes")
        self.play(tb.remplir(0, 3, 12), tb.allumer(0, 3), FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("8 plus")
        self.play(tb.allumer(0, 2), FadeIn(hp, scale=1.5), FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("4. Donc")
        self.play(tb.allumer(0, 1), FadeIn(l1[2], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("600 plus")
        self.play(*[tb.eteindre(0, c) for c in (1, 2, 3)], tb.allumer(1, 2), FadeIn(bp, scale=1.5),
                  FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("300, égale")
        self.play(tb.allumer(1, 1), FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("900 grammes")
        self.play(FadeIn(l2[2], scale=1.3), tb.remplir(1, 3, 900), run_time=0.4)
        self.play(tb.eteindre(1, 1), tb.eteindre(1, 2), tb.allumer(1, 3), run_time=0.3)
        self.au_mot("en haut")
        self.play(Indicate(hp, color=AMBRE, scale_factor=1.6), run_time=0.6)
        self.au_mot("en bas")
        self.play(Indicate(bp, color=AMBRE, scale_factor=1.6), run_time=0.6)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (2 → 150 g, 4 → 300 g ; 6 ?) ────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        six = VGroup(*[tablette(0.75) for _ in range(6)]).arrange_in_grid(2, 3, buff=0.2)
        deco = VGroup(ines(0.9).move_to(P(-5.6, -1.0)), six.move_to(P(-2.6, 0.4)))
        self.add(deco)
        tb = TableauProp(self.LIBS, [[2, 4, 6], [150, 300, "?"]], montrer=False, largeur_case=1.3,
                         largeur_libelle=2.5, fs=36, centre=P(-3.05, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(tb.trou(1, 2)), run_time=0.3)
            l0 = sc.ligne_rep(0, ["6 =", "2 +", "4."])
            l1 = sc.ligne_rep(1, ["150 +", "300 =", "450 g."])
            hp, bp = tb.plus(0, 1), plus_bas(tb, 0, 1)
            sc.au_mot("6, c'est")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(0, 2), scale=1.4), tb.allumer(0, 2),
                    run_time=0.3)
            sc.au_mot("2 plus")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4), FadeIn(hp, scale=1.5),
                    run_time=0.3)
            sc.au_mot("4. Donc")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.3)
            sc.au_mot("150 plus")
            sc.play(tb.eteindre(0, 2), FadeIn(l1[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4),
                    FadeIn(bp, scale=1.5), run_time=0.3)
            sc.au_mot("300, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), FadeIn(tb.valeur(1, 1), scale=1.4), run_time=0.3)
            sc.au_mot("450 grammes")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 2, 450), run_time=0.4)
            sc.play(tb.allumer(1, 2), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["2 tablettes : 150 g.", "4 tablettes : 300 g.", "Combien pour 6 tablettes ?"],
                            [self.t("450 g", 34), self.t("302 g", 34), self.t("600 g", 34)], 0,
                            ["6 = 2 + 4.", "150 + 300 = 450 g."], mot_q="2 tablettes", autres_r=apres)

    # ── 06 : le coefficient × 75 ────────────────────────────────────────────
    def ecran_coefficient(self):
        self.ecran("06-coefficient")
        xc = -1.2
        tb, deja = self.table_choco({(r, c) for r in range(2) for c in range(4)}, centre=P(xc, 1.15))
        self.add(deja)
        self.methode("Le coefficient", "le coefficient")
        l1 = self.lc([("300 ÷", WHITE), ("4 =", WHITE), ("75", FLECHE_K)], -0.85, fs=38, x=xc)
        self.au_mot("300 divisé")
        self.play(tb.allumer(1, 1), FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("4, égale")
        self.play(tb.allumer(0, 1), FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("75. Chaque")
        self.play(FadeIn(l1[2], scale=1.3), run_time=0.3)
        self.play(tb.eteindre(0, 1), tb.eteindre(1, 1), run_time=0.3)
        par = self.lc([("75 g", VERT_OK), ("par tablette", WHITE)], -1.6, fs=36, x=xc)
        self.au_mot("75 grammes")
        ico = tablette(0.75).next_to(par, RIGHT, buff=0.35)
        self.play(FadeIn(par[0], scale=1.3), FadeIn(par[1], shift=RIGHT * 0.2), FadeIn(ico, shift=DOWN * 0.15),
                  run_time=0.4)
        fl = tb.fleche_lat("× 75")
        self.au_mot("on multiplie")
        self.play(Create(fl.fleche), run_time=0.4)
        self.au_mot("75. 10")
        self.play(FadeIn(fl.etiquette, scale=1.4), run_time=0.3)
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=FLECHE_K, scale_factor=1.06) for c in range(4)],
                              lag_ratio=0.3), run_time=1.0)
        l2 = self.lc([("10 tablettes :", WHITE), ("10 ×", WHITE), ("75 =", FLECHE_K), ("750 g", VERT_OK)], -2.35,
                     fs=38, x=xc)
        self.jouer(l2, ["10 tablettes", "10 fois", "75, égale", "750 grammes"])
        self.insister(l2[3], 1.15, 0.2)
        self.attendre_voix()

    # ── 07 : le piège « + 2 » ───────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-0.4, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        tb = TableauProp(self.LIBS, [[4, 6], [300, 302]], montrer=False, largeur_case=1.7, largeur_libelle=3.0,
                         hauteur=0.95, fs=42, centre=P(-1.0, 0.45))
        trois = tb.valeur(1, 0)
        trois._pas_audit = trois.sans_synchro = True  # la donnée d'Inès, dite aux écrans 01 et 02
        self.play(FadeIn(tb.fond), FadeIn(trois), FadeIn(tb.trou(0, 0)), FadeIn(tb.trou(0, 1)),
                  FadeIn(tb.trou(1, 1)), run_time=0.4)
        self.au_mot("De 4")
        self.play(tb.remplir(0, 0, 4), run_time=0.3)
        self.au_mot("6 tablettes")
        self.play(tb.remplir(0, 1, 6), run_time=0.3)
        h = tb.fleche_col(0, 1, "+ 2", ligne=0, couleur=ORANGE_RETENUE)
        self.au_mot("on ajoute 2")
        self.play(Create(h.fleche), run_time=0.3)
        self.au_mot("2. Alors")
        self.play(FadeIn(h.etiquette, scale=1.3), run_time=0.3)
        b = tb.fleche_col(0, 1, "+ 2", ligne=1, couleur=ROUGE_P)
        self.au_mot("on ajoute 2 grammes")
        self.play(Create(b.fleche), run_time=0.3)
        self.au_mot("2 grammes")
        self.play(FadeIn(b.etiquette, scale=1.3), run_time=0.3)
        self.au_mot("302 grammes")
        self.play(tb.remplir(1, 1, 302, couleur=ROUGE_P), run_time=0.4)
        self.au_mot("Non")
        self.play(Create(croix(b, sw=7)), Create(tb.barrer(1, 1)), run_time=0.4)
        r1 = self.t("On n'ajoute pas le même nombre en haut et en bas.", 30).move_to(P(-0.7, -2.4))
        self.au_mot("on n'ajoute pas")
        self.play(FadeIn(r1, shift=UP * 0.15), run_time=0.5)
        r2 = self.t("On multiplie, ou on additionne des colonnes entières.", 30, VERT_OK).move_to(P(-0.7, -3.05))
        self.au_mot("On multiplie")
        self.play(FadeIn(r2, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (coefficient 75 ; 1 500 g → ? tablettes) ────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(ines(0.9).move_to(P(-5.6, -1.0)), bol(1.3).move_to(P(-2.6, 0.2)))
        self.add(deco)
        tb = TableauProp(self.LIBS, [["?"], ["1 500"]], montrer=False, largeur_case=1.7, largeur_libelle=2.6,
                         fs=38, centre=P(-4.0, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(tb.trou(0, 0)), run_time=0.3)
            l0 = sc.ligne_rep(0, ["Pour remonter :", "÷ 75."])
            l1 = sc.ligne_rep(1, ["1 500 ÷", "75 =", "20 tablettes."])
            fl = tb.fleche_lat("÷ 75", sens="haut", cote=RIGHT)
            sc.au_mot("Pour remonter")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("l'inverse")
            sc.play(Create(fl.fleche), run_time=0.4)
            sc.au_mot("75. 1 500")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(fl.etiquette, scale=1.3), run_time=0.3)
            sc.au_mot("1 500 divisé")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("75, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("20 tablettes")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(0, 0, 20), run_time=0.4)
            sc.play(tb.allumer(0, 0), run_time=0.3)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Le coefficient est 75.", "Combien de tablettes", "avec 1 500 g de chocolat ?"],
                            [self.t("20 tablettes", 34), self.t("112 500 tablettes", 34),
                             self.t("1 425 tablettes", 34)], 0,
                            ["Pour remonter : ÷ 75.", "1 500 ÷ 75 = 20 tablettes."], mot_q="Le coefficient",
                            autres_r=apres)

    # ── 09 : défi : le sucre ────────────────────────────────────────────────
    LIBS_S = ["Tablettes", "Sucre (g)"]
    VALS_S = [[4, 12, 2, 14], [60, 180, 30, 210]]

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        tb = TableauProp(self.LIBS_S, [[4, 14], [60, "?"]], montrer=False, largeur_case=1.7, largeur_libelle=3.0,
                         fs=40, centre=P(self.X0, 1.2))
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tb.trou(0, 0)), FadeIn(tb.trou(1, 0)), run_time=0.5)
        self.au_mot("4 tablettes")
        quatre = VGroup(*[tablette(0.8) for _ in range(4)]).arrange(RIGHT, buff=0.2).move_to(P(self.X0, -0.55))
        self.play(tb.remplir(0, 0, 4), LaggedStart(*[FadeIn(t, shift=DOWN * 0.2) for t in quatre], lag_ratio=0.2),
                  run_time=0.6)
        self.au_mot("60 grammes")
        self.play(tb.remplir(1, 0, 60), run_time=0.35)
        self.au_mot("14 tablettes")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), run_time=0.35)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tb, deja = self.table_choco({(0, 0), (1, 0), (0, 3)}, centre=P(self.X0, 0.7), vals=self.VALS_S,
                                    libs=self.LIBS_S)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.2))
        self.add(deja)
        self.play(Write(tit), run_time=0.5)
        # 14 = 12 + 2
        l0 = self.lc([("14 =", WHITE), ("12 +", WHITE), ("2", WHITE)], -1.65, fs=36)
        self.au_mot("14, c'est")
        self.play(tb.allumer(0, 3), FadeIn(l0[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("12 plus")
        self.play(tb.remplir(0, 1, 12), FadeIn(l0[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("2. Pour")
        self.play(tb.remplir(0, 2, 2), FadeIn(l0[2], shift=RIGHT * 0.2), run_time=0.3)
        # 12 = 4 × 3
        h = tb.fleche_col(0, 1, "× 3", ligne=0)
        b = tb.fleche_col(0, 1, "× 3", ligne=1)
        l1 = self.lc([("60 ×", WHITE), ("3 =", WHITE), ("180 g", VERT_OK)], -2.4, fs=36, x=-3.4)
        self.au_mot("Pour 12")
        self.play(tb.eteindre(0, 3), tb.allumer(0, 0), tb.allumer(0, 1), Create(h.fleche), run_time=0.4)
        self.au_mot("60 fois")
        self.play(tb.eteindre(0, 0), tb.eteindre(0, 1), tb.allumer(1, 0), Create(b.fleche),
                  FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("3, égale")
        self.play(FadeIn(h.etiquette, scale=1.3), FadeIn(b.etiquette, scale=1.3), FadeIn(l1[1], shift=RIGHT * 0.2),
                  run_time=0.3)
        self.au_mot("180 grammes")
        self.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 1, 180), run_time=0.4)
        # 2 = 4 ÷ 2
        h2 = tb.fleche_col(0, 2, "÷ 2", ligne=0, hauteur=PI / 3.4)
        b2 = tb.fleche_col(0, 2, "÷ 2", ligne=1, hauteur=PI / 3.4)
        l2 = self.lc([("60 ÷", WHITE), ("2 =", WHITE), ("30 g", VERT_OK)], -2.4, fs=36, x=1.6)
        self.au_mot("Pour 2 tablettes")
        self.play(FadeOut(VGroup(h, b)), tb.allumer(0, 0), tb.allumer(0, 2), Create(h2.fleche), run_time=0.4)
        self.au_mot("60 divisé")
        self.play(tb.eteindre(0, 2), Create(b2.fleche), FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("2, égale 30")
        self.play(FadeIn(h2.etiquette, scale=1.3), FadeIn(b2.etiquette, scale=1.3), FadeIn(l2[1], shift=RIGHT * 0.2),
                  run_time=0.3)
        self.au_mot("30 grammes")
        self.play(tb.eteindre(0, 0), FadeIn(l2[2], scale=1.3), tb.remplir(1, 2, 30), run_time=0.4)
        # 180 + 30 = 210
        bp = plus_bas(tb, 1, 2)
        l3 = self.lc([("180 +", WHITE), ("30 =", WHITE), ("210 g de sucre", VERT_OK)], -3.15, fs=36)
        l3[2].sans_synchro = True  # sinon il attend « sucre », dit après « 210 » (AUDIT-TARD)
        self.au_mot("180 plus")
        self.play(FadeOut(VGroup(h2, b2)), tb.allumer(1, 1), FadeIn(bp, scale=1.5), FadeIn(l3[0], shift=RIGHT * 0.2),
                  run_time=0.4)
        self.au_mot("30, égale")
        self.play(tb.allumer(1, 2), FadeIn(l3[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("210 grammes")
        c210 = tb.poser(1, 3, 210)
        c210._pas_audit = True  # dit avec « 210 g de sucre » (audité), joué dans le même play
        self.play(FadeIn(l3[2], scale=1.3), tb.remplir(1, 3), run_time=0.4)
        self.play(tb.eteindre(1, 0), tb.eteindre(1, 1), tb.eteindre(1, 2), tb.allumer(1, 3), run_time=0.3)
        self.insister(l3[2], 1.12, 0.2)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        tb, deja = self.table_choco({(r, c) for r in range(2) for c in range(4)}, centre=ORIGIN)
        fig = VGroup(deja, tb.fleche_col(1, 2, "× 2", ligne=0), plus_bas(tb, 1, 2), tb.fleche_lat("× 75"))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On multiplie une colonne,",),
            ("on additionne deux colonnes,",),
            ("ou on utilise le coefficient.",),
            ("On n'ajoute jamais le même", "nombre en haut et en bas.")], fs=36)
        self.au_mot("on multiplie")
        self.montrer_ligne(lignes[0], Indicate(fig[1], color=FLECHE_COL))
        self.au_mot("on additionne")
        self.montrer_ligne(lignes[1], Indicate(fig[2], color=FLECHE_COL))
        self.au_mot("ou on utilise")
        self.montrer_ligne(lignes[2], Indicate(fig[3], color=FLECHE_K))
        self.au_mot("Mais on")
        self.montrer_ligne(lignes[3])
        for m in lignes[3][1]:
            m.set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_multiplier()
        self.ecran_additionner()
        self.ecran_question1()
        self.ecran_coefficient()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropTableau4e(PropTableauBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
