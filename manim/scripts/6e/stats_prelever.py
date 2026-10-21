# stats_prelever.py
# EleveAI — Maths 6e — série « Statistiques », épisode 02 : PRÉLEVER UNE
# INFORMATION dans un tableau à double entrée (micro du coach :
# stat_donnee_prelever, canvas `tableau_donnees`), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE : lire UNE case au croisement d'une ligne et
# d'une colonne, garder son unité, puis s'en servir (un calcul d'une étape) ;
# un cran au-dessus du « je vois » (blanche). Short jumeau : stats_prelever_short.py (blanche).
#
# ⭐ Décor et métier : l'ÉCONOMIE, les prix du marché ; une ÉCONOMISTE DE
# L'INSEE suit les prix et les explique à tout le monde.
# Données (vraisemblables, prix d'un kilogramme au marché, janvier) :
#   tomates 3 € → 4 € ; bananes 2 € → 2 € ; mangues 6 € → 5 €.
# ⭐ La figure est CELLE DU COACH (`tableau_donnees`, redessiné par
# manim/canvas_stats.py : en-tête sombre, libellés bleu clair, case allumée
# jaune avec anneau). Le geste de lecture se VOIT : la ligne s'allume, puis la
# colonne, puis il ne reste que la case du croisement.
# ⛔ PAS D'ÉCART : une case se remplit au mot où la voix dit son nombre ; les
# années des en-têtes sont des étiquettes.
#
# Écrans : 00 garde · 01 l'économiste de l'INSEE · 02 le titre et l'unité ·
# 03 le tableau se remplit · 04 prélever (ligne × colonne = 4 €) · 05 s'en
# servir (4 − 3 = 1 € de plus ; mangues : 1 € de moins) · 06 le piège (l'unité :
# un kilogramme, pas une tomate) · 07 défi · 07b correction (3 × 5 = 15 €) ·
# 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/6e-stats-prelever.json (débit −10), WAV dans
# public/sons/6e-stats-prelever/ ; calage mot à mot :
# manim/scripts/6e/stats_prelever_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/6e/stats_prelever.py StatsPrelever6e -o eleveai-maths-6e-stats-prelever --media_dir manim/scripts/6e/media-prelever
# Sortie : manim/sorties/6e/maths/statistiques/02-prelever/eleveai-maths-6e-stats-prelever.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from canvas_stats import AMBRE, NUIT, Tableau, texte  # noqa: E402

PRODUITS = ["Tomates", "Bananes", "Mangues"]
ANNEES = ["2025", "2026"]
PRIX = [[3, 4], [2, 2], [6, 5]]
TITRE_TAB = "Prix d'un kilogramme,\nen euros, au marché"
ROUGE_TOMATE, JAUNE_BANANE, ORANGE_MANGUE, VERT_FEUILLE = "#ef4444", "#facc15", "#fb923c", "#22c55e"


# ── les dessins du marché ───────────────────────────────────────────────────

def tomate(r=0.3):
    corps = Circle(radius=r, fill_color=ROUGE_TOMATE, fill_opacity=1, stroke_color="#7f1d1d", stroke_width=2)
    reflet = Ellipse(width=0.35 * r, height=0.22 * r, fill_color=WHITE, fill_opacity=0.55, stroke_width=0)
    reflet.move_to(corps.get_center() + P(-0.4 * r, 0.4 * r))
    etoile = Star(5, outer_radius=0.42 * r, inner_radius=0.16 * r, fill_color=VERT_FEUILLE, fill_opacity=1,
                  stroke_width=0).move_to(corps.get_top() + DOWN * 0.12 * r)
    return VGroup(corps, reflet, etoile)


def banane(r=0.3):
    arc = Arc(radius=1.1 * r, start_angle=PI * 1.1, angle=PI * 0.8, stroke_color=JAUNE_BANANE,
              stroke_width=28 * r / 0.3)
    bout = Dot(arc.get_end(), radius=0.07 * r / 0.3, color="#78350f")
    return VGroup(arc, bout).move_to(ORIGIN)


def mangue(r=0.3):
    corps = Ellipse(width=2.1 * r, height=1.55 * r, fill_color=ORANGE_MANGUE, fill_opacity=1,
                    stroke_color="#9a3412", stroke_width=2).rotate(0.35)
    rouge = Ellipse(width=1.0 * r, height=0.8 * r, fill_color="#f43f5e", fill_opacity=0.6,
                    stroke_width=0).move_to(corps.get_center() + P(0.35 * r, 0.25 * r))
    feuille = Ellipse(width=0.9 * r, height=0.35 * r, fill_color=VERT_FEUILLE, fill_opacity=1,
                      stroke_width=0).rotate(-0.5).move_to(corps.get_center() + P(-0.55 * r, 0.75 * r))
    return VGroup(corps, rouge, feuille)


FRUITS = [tomate, banane, mangue]


def sac(etiquette="1 kg", fruit=tomate, larg=1.3):
    """Un sac en papier kraft plein de fruits, son poids écrit dessus."""
    h = larg * 1.05
    corps = Polygon(P(-larg / 2, -h / 2), P(larg / 2, -h / 2), P(larg * 0.42, h / 2), P(-larg * 0.42, h / 2),
                    fill_color="#c08a52", fill_opacity=1, stroke_color="#78350f", stroke_width=3)
    dessus = VGroup(*[fruit(larg * 0.17).move_to(P(dx * larg, h / 2 + 0.06)) for dx in (-0.25, 0, 0.25)])
    lab = texte(etiquette, int(34 * larg / 1.3), NUIT).move_to(corps.get_center() + DOWN * 0.08 * h)
    return VGroup(dessus, corps, lab)


def etiquette_prix(s, color=NUIT):
    """La petite étiquette de prix du marché (carton blanc, trou, ficelle)."""
    t = texte(s, 32, color)
    carton = RoundedRectangle(width=t.width + 0.4, height=t.height + 0.3, corner_radius=0.08, fill_color=WHITE,
                              fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    trou = Circle(radius=0.05, fill_color="#94a3b8", fill_opacity=1, stroke_width=0)
    trou.move_to(carton.get_left() + RIGHT * 0.12)
    return VGroup(carton, t.move_to(carton).shift(RIGHT * 0.06), trou)


def etal(largeur=5.0):
    """L'étal du marché : un auvent rayé, une table, trois cagettes de fruits."""
    rayures = VGroup(*[Rectangle(width=largeur / 8, height=0.55, fill_color=c, fill_opacity=1, stroke_width=0)
                       for c in ["#ef4444", WHITE] * 4]).arrange(RIGHT, buff=0)
    festons = VGroup(*[Arc(radius=largeur / 16, start_angle=PI, angle=PI, fill_color=c, fill_opacity=1,
                           stroke_width=0) for c in ["#ef4444", WHITE] * 4]).arrange(RIGHT, buff=0)
    festons.next_to(rayures, DOWN, buff=0)
    auvent = VGroup(rayures, festons)
    poteaux = VGroup(*[Rectangle(width=0.1, height=2.2, fill_color="#92400e", fill_opacity=1, stroke_width=0)
                       .next_to(auvent, DOWN, buff=0).align_to(auvent, s) for s in (LEFT, RIGHT)])
    table = Rectangle(width=largeur, height=0.25, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    table.next_to(auvent, DOWN, buff=1.5)
    cagettes = VGroup()
    for k, f in enumerate(FRUITS):
        caisse = Rectangle(width=1.25, height=0.45, fill_color="#d6a35c", fill_opacity=1, stroke_color="#78350f",
                           stroke_width=2)
        tas = VGroup(*[f(0.17).move_to(P(dx, 0.28)) for dx in (-0.36, 0, 0.36)])
        cagettes.add(VGroup(tas, caisse))
    cagettes.arrange(RIGHT, buff=0.3).next_to(table, UP, buff=0)
    return VGroup(poteaux, auvent, table, cagettes)


def economiste():
    """Une économiste, dessinée simplement : tête, cheveux, veste, tablette."""
    tete = Circle(radius=0.32, fill_color="#d6a77a", fill_opacity=1, stroke_width=0)
    cheveux = AnnularSector(inner_radius=0.0, outer_radius=0.36, angle=PI, start_angle=0, fill_color="#3f2a1d",
                            fill_opacity=1, stroke_width=0).move_to(tete.get_top() + DOWN * 0.1)
    queue = Ellipse(width=0.22, height=0.5, fill_color="#3f2a1d", fill_opacity=1, stroke_width=0)
    queue.move_to(tete.get_right() + P(0.05, -0.15))
    corps = Polygon(P(-0.55, -1.25), P(0.55, -1.25), P(0.38, -0.38), P(-0.38, -0.38), fill_color="#2563eb",
                    fill_opacity=1, stroke_width=0)
    tablette = RoundedRectangle(width=0.62, height=0.48, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                                stroke_color="#94a3b8", stroke_width=2).move_to(P(0.45, -0.8)).rotate(-0.15)
    courbe = VMobject(stroke_color="#16a34a", stroke_width=3).set_points_as_corners(
        [P(0.25, -0.95), P(0.38, -0.85), P(0.5, -0.88), P(0.65, -0.68)])
    return VGroup(queue, corps, tete, cheveux, tablette, courbe)


def foule(n=5):
    """Des silhouettes : « tout le monde »."""
    gens = VGroup()
    for k in range(n):
        c = ["#93c5fd", "#fcd34d", "#6ee7b7", "#fca5a5", "#c4b5fd"][k % 5]
        tete = Circle(radius=0.17, fill_color=c, fill_opacity=1, stroke_width=0)
        corps = RoundedRectangle(width=0.42, height=0.5, corner_radius=0.15, fill_color=c, fill_opacity=1,
                                 stroke_width=0).next_to(tete, DOWN, buff=0.05)
        gens.add(VGroup(tete, corps))
    return gens.arrange(RIGHT, buff=0.2)


class StatsPreleverBase(MotsCales6, OutilsPaysage, Notion6e):
    nom_voix = "6e-stats-prelever"
    fichier_marques = "stats_prelever_marques.json"
    identite = "Maths 6e — EleveAI"
    G = P(-3.35, -0.35)  # le centre du tableau, à gauche

    def tableau(self, plein=True, centre=None, echelle=1.0):
        """Le tableau du coach (non ajouté), une icône de fruit devant chaque produit.
        plein=False : les cases de prix sont vides (elles se remplissent au mot)."""
        lignes = PRIX if plein else [[None, None] for _ in PRIX]
        tab = Tableau(ANNEES, lignes, libelles=PRODUITS, coin="En janvier", largeur_case=1.75, largeur_libelle=2.95,
                      hauteur=0.95, fs=34, titre=TITRE_TAB)
        tab.icones = VGroup()
        for r, f in enumerate(FRUITS):
            cel = tab.libelles[r]
            ic = f(0.22).move_to(cel[0].get_left() + RIGHT * 0.4)
            cel[1].next_to(ic, RIGHT, buff=0.18)
            tab.icones.add(ic)
        tab.add(tab.icones)
        tab.scale(echelle).move_to(self.G if centre is None else centre)
        return tab

    def tableau_pret(self):
        tab = self.tableau()
        self.add(tab)
        return tab

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Prélever une information", self.identite, "jaune")
        tab = Tableau(ANNEES, [["?", "?"] for _ in PRIX], libelles=PRODUITS, coin="En janvier", largeur_case=1.9,
                      largeur_libelle=2.3, hauteur=0.7, fs=26).scale(0.85).move_to(P(-0.6, 0.0))
        self.au_mot("Prélever")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.6)
        self.au_mot("le bon nombre")
        self.play(FadeIn(tab, scale=0.9), run_time=0.5)
        self.au_mot("au bon endroit")
        self.play(*tab.allumer_case(0, 1), run_time=0.4)
        self.insister(tab.cases[0][1], 1.5, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'économiste de l'INSEE ────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        e = etal(4.6).move_to(P(-3.6, 0.6))
        pers = economiste().scale(1.6).move_to(P(1.4, 0.7))
        metier = self.t("Économiste à l'INSEE", 40, BLEU_CALCUL).move_to(P(1.6, 2.9))
        self.au_mot("Une économiste")
        self.play(FadeIn(e, shift=UP * 0.3), run_time=0.6)
        self.play(FadeIn(pers, shift=LEFT * 0.3), Write(metier), run_time=0.7)
        self.au_mot("suit les prix")
        loupe = VGroup(Circle(radius=0.42, stroke_color=WHITE, stroke_width=6),
                       Line(P(0.3, -0.3), P(0.7, -0.7), stroke_color=WHITE, stroke_width=10))
        loupe.move_to(e[3][0].get_center() + UP * 0.1)
        self.play(FadeIn(loupe, scale=0.5), run_time=0.3)
        self.play(loupe.animate.move_to(e[3][2].get_center() + UP * 0.1), run_time=1.0)
        self.play(FadeOut(loupe), run_time=0.3)
        self.au_mot("Si les prix montent")
        fl = Arrow(P(4.9, 0.1), P(4.9, 2.0), buff=0, color=VERT_OK, stroke_width=10)
        monte = self.t("les prix montent", 36, VERT_OK).next_to(fl, DOWN, buff=0.2)
        self.play(GrowArrow(fl), FadeIn(monte, shift=UP * 0.2), run_time=0.6)
        self.au_mot("elle le voit")
        self.insister(pers, 1.2, 0.3)
        self.au_mot("l'expliquer à tout le monde")
        gens = foule(6).move_to(P(1.9, -2.2))
        dit = self.t("elle l'explique à tous", 36).next_to(gens, UP, buff=0.3)
        self.play(LaggedStart(*[FadeIn(g, shift=UP * 0.3) for g in gens], lag_ratio=0.15), FadeIn(dit), run_time=0.9)
        self.attendre_voix()

    # ── 02 : le titre et l'unité ────────────────────────────────────────────

    def ecran_titre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-titre")
        tab = self.tableau(plein=False)
        self.au_mot("Je lis d'abord le titre")
        e1 = self.col(self.ligne([("1.", AMBRE), ("Je lis le titre", WHITE)], 40), 2.3)
        self.play(FadeIn(tab, scale=0.95), FadeIn(e1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Prix d'un kilogramme")
        cadre = SurroundingRectangle(tab.titre, color=AMBRE, buff=0.12, corner_radius=0.08, stroke_width=6)
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(tab.titre, cadre), 1.25, 0.3)
        self.au_mot("L'unité compte")
        e2 = self.col(self.ligne([("2.", AMBRE), ("L'unité compte", WHITE)], 40), 1.1)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("c'est le prix d'un kilogramme")
        un = self.col(VGroup(self.t("le prix", 40), self.t("d'un kilogramme", 44, AMBRE)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.15), -0.3)
        s = sac("1 kg", tomate, 1.25).next_to(un, DOWN, buff=0.35).align_to(un, LEFT).shift(RIGHT * 0.6)
        self.play(FadeIn(un, shift=RIGHT * 0.2), FadeIn(s, shift=UP * 0.3), run_time=0.5)
        self.insister(un[1], 1.25, 0.3)
        self.attendre_voix()

    # ── 03 : le tableau se remplit ──────────────────────────────────────────

    def ecran_remplir(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-remplir")
        tab = self.tableau(plein=False)
        self.add(tab)
        mots = [("3 euros", "4 euros"), ("2 euros, puis", "puis 2 euros"), ("6 euros", "puis 5 euros")]
        noms = [("Les tomates", 0), ("Les bananes", 1), ("Les mangues", 2)]
        gros = None
        for (nom, r), (m1, m2) in zip(noms, mots):
            self.au_mot(nom)
            f = FRUITS[r](0.75).move_to(P(3.8, 0.9))
            lab = self.t(PRODUITS[r], 44, WHITE).move_to(P(3.8, -0.5))
            anims = [FadeIn(f, scale=0.5), FadeIn(lab, shift=UP * 0.2), Circumscribe(tab.libelles[r], color=AMBRE)]
            if gros is not None:
                anims += [FadeOut(gros, shift=LEFT * 0.4)]
            self.play(*anims, run_time=0.4)
            gros = VGroup(f, lab)
            for c, m in enumerate((m1, m2)):
                self.au_mot(m)
                self.play(tab.remplir(r, c, PRIX[r][c]), run_time=0.35)
        self.play(Circumscribe(VGroup(*[cs for rang in tab.cases for cs in rang]), color=AMBRE), run_time=0.9)
        self.attendre_voix()

    # ── 04 : prélever, ligne × colonne ──────────────────────────────────────

    def ecran_prelever(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-prelever")
        tab = self.tableau_pret()
        self.au_mot("Le prix des tomates")
        q = self.col(VGroup(tomate(0.28), self.t("Tomates, en 2026 ?", 40)).arrange(RIGHT, buff=0.25), 2.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("La ligne des tomates")
        e1 = self.col(self.ligne([("1.", AMBRE), ("la ligne des tomates", WHITE)], 38), 1.1)
        self.play(*tab.allumer_ligne(0), FadeIn(e1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("la colonne 2026")
        e2 = self.col(self.ligne([("2.", AMBRE), ("la colonne 2026", WHITE)], 38), 0.1)
        self.play(*tab.allumer_colonne(1), FadeIn(e2, shift=RIGHT * 0.2), run_time=0.5)
        self.play(*tab.eteindre(), run_time=0.3)
        self.play(*tab.allumer_case(0, 1), run_time=0.3)
        self.au_mot("4 euros le kilogramme")
        res = self.col(self.ligne([("4 €", VERT_OK), ("le kilogramme", WHITE)], 46), -1.25)
        cadre = self.encadrer(res)
        self.play(FadeIn(res, scale=0.6), run_time=0.4)
        self.play(tab.cases[0][1].animate.scale(1.5), Create(cadre), run_time=0.35)
        self.play(tab.cases[0][1].animate.scale(1 / 1.5), run_time=0.35)
        self.attendre_voix()

    # ── 05 : s'en servir ────────────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-calcul")
        tab = self.tableau_pret()
        self.au_mot("Les tomates ont augmenté")
        fl = Arrow(P(0, -0.5), P(0, 0.5), buff=0, color=VERT_OK, stroke_width=9)
        t1 = VGroup(fl, tomate(0.3), self.t("ça monte", 40, VERT_OK)).arrange(RIGHT, buff=0.3)
        self.col(t1, 2.3)
        self.play(*tab.allumer_ligne(0), FadeIn(t1, shift=UP * 0.2), run_time=0.5)
        calc = self.ligne([("4", WHITE), ("−", WHITE), ("3", WHITE), ("=", WHITE), ("1 €", VERT_OK),
                           ("de plus", VERT_OK)], 46, 0.25)
        self.col(calc, 1.1)
        self.au_mot("4 moins")
        self.play(FadeIn(calc[0], scale=1.5), FadeIn(calc[1]), Indicate(tab.cases[0][1], color=AMBRE), run_time=0.35)
        self.au_mot("3, égale")
        self.play(FadeIn(calc[2], scale=1.5), FadeIn(calc[3]), Indicate(tab.cases[0][0], color=AMBRE), run_time=0.35)
        self.au_mot("1 euro de plus")
        self.play(FadeIn(calc[4], scale=1.5), FadeIn(calc[5]), run_time=0.35)
        self.insister(calc[4], 1.4, 0.25)
        self.au_mot("Les mangues")
        fl2 = Arrow(P(0, 0.5), P(0, -0.5), buff=0, color=ROUGE_ERREUR, stroke_width=9)
        t2 = VGroup(fl2, mangue(0.3), self.t("ça baisse", 40, ROUGE_ERREUR)).arrange(RIGHT, buff=0.3)
        self.col(t2, -0.4)
        self.play(*tab.eteindre(), run_time=0.25)
        self.play(*tab.allumer_ligne(2), FadeIn(t2, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("de 1 euro")
        moins = self.col(self.ligne([("1 €", ROUGE_ERREUR), ("de moins", ROUGE_ERREUR)], 46), -1.55)
        self.play(FadeIn(moins, scale=0.6), run_time=0.35)
        self.insister(moins[0], 1.4, 0.25)
        self.attendre_voix()

    # ── 06 : le piège (l'unité) ─────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        tab = self.tableau_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège :", 48, ROUGE_ERREUR), 3.2)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("oublier l'unité")
        oubli = self.col(self.t("oublier l'unité", 40, ORANGE_RETENUE), 2.45)
        self.play(FadeIn(oubli, shift=RIGHT * 0.2), Indicate(tab.titre, color=ROUGE_ERREUR), run_time=0.5)
        self.au_mot("4 euros")
        self.play(*tab.allumer_case(0, 1), run_time=0.35)
        prix = etiquette_prix("4 €").scale(1.8).move_to(P(3.8, 1.35))
        self.play(FadeIn(prix, scale=1.6), run_time=0.35)
        self.au_mot("le prix d'un kilogramme")
        s = sac("1 kg", tomate, 1.9).move_to(P(2.4, -0.9))
        ok = self.coche(VERT_OK, 0.3).next_to(s, DOWN, buff=0.3)
        self.play(FadeIn(s, shift=UP * 0.3), prix.animate.scale(0.85).next_to(s, UP, buff=0.4), run_time=0.6)
        self.play(Create(ok), run_time=0.3)
        self.au_mot("pas d'une seule tomate")
        une = tomate(0.6).move_to(P(5.3, -1.05))
        faux = etiquette_prix("4 €").scale(1.5).next_to(une, UP, buff=0.4)
        x = croix(VGroup(une, faux).copy().scale(1.1), sw=7)
        self.play(FadeIn(une, scale=0.5), FadeIn(faux), run_time=0.4)
        self.play(Create(x), run_time=0.4)
        self.insister(VGroup(s, prix, ok), 1.12, 0.3)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        tab = self.tableau_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 3.0)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Combien coûtent")
        q = self.col(self.bloc(["Combien coûtent"]), 2.05)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("3 kilogrammes de mangues")
        q2 = self.col(self.ligne([("3 kg", AMBRE), ("de mangues", WHITE)], 40), 1.3)
        sacs = VGroup(*[sac("1 kg", mangue, 1.1) for _ in range(3)]).arrange(RIGHT, buff=0.3)
        self.col(sacs, -0.5, xl=1.3)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), Circumscribe(tab.libelles[2], color=AMBRE), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(s, shift=DOWN * 0.3) for s in sacs], lag_ratio=0.3), run_time=0.8)
        self.au_mot("en janvier 2026")
        q3 = self.col(self.t("en janvier 2026 ?", 40), 0.6)
        self.play(FadeIn(q3, shift=RIGHT * 0.2), Circumscribe(tab.tetes[1], color=AMBRE), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE), -1.85)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        tab = self.tableau_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Je prélève le prix")
        e1 = self.col(self.t("Je prélève le prix :", 40), 2.05)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), *tab.allumer_case(2, 1), run_time=0.5)
        self.au_mot("5 euros le kilogramme")
        p = self.col(self.ligne([("5 €", VERT_OK), ("le kilogramme", WHITE)], 42), 1.25)
        self.play(FadeIn(p, scale=0.6), run_time=0.35)
        self.insister(tab.cases[2][1], 1.5, 0.25)
        calc = self.ligne([("3", AMBRE), ("×", WHITE), ("5", VERT_OK), ("=", WHITE), ("15 €", VERT_OK)], 42, 0.25)
        self.col(calc, -1.95, xl=0.7)
        sacs = VGroup(*[VGroup(sac("1 kg", mangue, 1.1), etiquette_prix("5 €").scale(1.15)).arrange(DOWN, buff=0.12)
                        for _ in range(3)]).arrange(RIGHT, buff=0.3)
        self.col(sacs, -0.25, xl=1.4)
        self.au_mot("3 fois 5")
        self.play(LaggedStart(*[FadeIn(s, shift=DOWN * 0.2) for s in sacs], lag_ratio=0.25),
                  FadeIn(calc[0], scale=1.5), FadeIn(calc[1]), FadeIn(calc[2], scale=1.5), run_time=0.7)
        self.au_mot("égale 15 euros")
        cadre = self.encadrer(calc)
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=1.6), Create(cadre), run_time=0.45)
        self.insister(calc[4], 1.4, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        tab = self.tableau_pret()
        lignes = self.finale([("Je lis le titre", "et l'unité."), ("Je trouve", "la bonne ligne", "et la bonne colonne."),
                              ("J'utilise le nombre,", "avec son unité.")], [1.9, 0.25, -1.55])
        self.au_mot("Je lis le titre")
        self.montrer_ligne(lignes[0], Indicate(tab.titre, color=AMBRE))
        self.au_mot("Je trouve la bonne ligne")
        self.montrer_ligne(lignes[1])
        self.play(*tab.allumer_ligne(0), run_time=0.4)
        self.au_mot("la bonne colonne")
        self.play(*tab.allumer_colonne(1), run_time=0.4)
        self.play(*tab.eteindre(), run_time=0.3)
        self.play(*tab.allumer_case(0, 1), run_time=0.3)
        self.au_mot("Puis j'utilise le nombre")
        self.montrer_ligne(lignes[2])
        self.au_mot("avec son unité")
        self.insister(tab.cases[0][1], 1.5, 0.3)
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_titre()
        self.ecran_remplir()
        self.ecran_prelever()
        self.ecran_calcul()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsPrelever6e(StatsPreleverBase):
    identite = "Maths 6e — EleveAI"
