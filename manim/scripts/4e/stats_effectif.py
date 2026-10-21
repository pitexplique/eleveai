# stats_effectif.py
# EleveAI — Maths 4e — série « Statistiques », cycle 4, épisode 03 : DÉTERMINER
# UN EFFECTIF (micro du coach : stat_effectif, notion stat_donnee), AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE : compter dans des données brutes, ranger dans un
# tableau, additionner les EFFECTIFS (pas les valeurs), « au moins », retrouver
# une case effacée grâce au total (deux crans au-dessus du « je vois » ; la
# verte est gardée pour la fréquence et les indicateurs, le niveau 4e complet).
# Short jumeau : stats_effectif_short.py (jaune, un cran plus bas).
#
# ⭐ Décor et métier : la SANTÉ ANIMALE ; une VÉTÉRINAIRE suit les portées de
# chiots labradors de sa clinique pour préparer visites et vaccins (problématique :
# prévoir). Données vraisemblables (un labrador a le plus souvent 6 à 8 chiots par
# portée) : 12 fiches 7, 6, 8, 7, 5, 6, 9, 7, 6, 8, 5, 7 → effectifs 5 : 2,
# 6 : 3, 7 : 4, 8 : 2, 9 : 1 (total 12) ; piège 5 + 6 + 7 + 8 + 9 = 35 ; au moins
# 8 chiots : 2 + 1 = 3. Défi (genEffectifManquant + genAuMoins du coach) : 20
# portées, 3, ?, 6, 4, 2 → 20 − 15 = 5 ; au moins 8 : 4 + 2 = 6.
# ⭐ Les figures sont CELLES DU COACH (manim/canvas_stats.py) : `tableau_donnees`
# (valeurs en en-tête, ligne « Effectif ») et `stat_graph` bâtons (genTotalGraphique).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit (marques mot à mot).
#
# Mapping micro → écrans (banque 4e statistiques.bank.ts, stat_effectif) :
#   genCompterListe → 02-03 · genTotalTableau / genTotalGraphique → 04-05 ·
#   genTotalDiscret (effectifs, pas valeurs) → 06 · genAuMoins → 07 ·
#   genEffectifManquant → 08 défi / 08b.
# Écrans : 00 garde · 01 la vétérinaire · 02 les 12 fiches · 03 compter les 7 ·
# 04 le tableau · 05 l'effectif total (bâtons) · 06 le piège · 07 au moins 8 ·
# 08 défi · 08b correction · 09 ce que tu as appris · 10 fin (règle du 19/10).
#
# Voix : manim/voix/4e-stats-effectif.json (débit −10), WAV dans
# public/sons/4e-stats-effectif/ ; calage mot à mot :
# manim/scripts/4e/stats_effectif_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_effectif.py StatsEffectif4e -o eleveai-maths-4e-stats-effectif --media_dir manim/scripts/4e/media-effectif
# Sortie : manim/sorties/4e/maths/statistiques/03-effectif/eleveai-maths-4e-stats-effectif.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403

FICHES = [7, 6, 8, 7, 5, 6, 9, 7, 6, 8, 5, 7]
VALEURS = [5, 6, 7, 8, 9]
EFF = [2, 3, 4, 2, 1]
DEFI = [3, "?", 6, 4, 2]
DOR, BRUN, CREME = "#e3b04b", "#a86b2d", "#f5dca6"


def chiot(r=0.5, couleur=DOR):
    """Une tête de chiot labrador : oreilles tombantes, museau clair, truffe."""
    og = Ellipse(width=0.62 * r, height=1.15 * r, fill_color=BRUN, fill_opacity=1, stroke_width=0)
    og.rotate(-0.35).move_to(P(-0.82 * r, 0.05 * r))
    od = og.copy().rotate(0.7).move_to(P(0.82 * r, 0.05 * r))
    tete = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color="#7c4a1e", stroke_width=3)
    museau = Ellipse(width=0.95 * r, height=0.62 * r, fill_color=CREME, fill_opacity=1, stroke_width=0)
    museau.move_to(P(0, -0.42 * r))
    nez = Ellipse(width=0.34 * r, height=0.22 * r, fill_color=NUIT, fill_opacity=1, stroke_width=0)
    nez.move_to(P(0, -0.27 * r))
    yeux = VGroup(*[Dot(P(s * 0.36 * r, 0.18 * r), radius=0.1 * r, color=NUIT) for s in (-1, 1)])
    return VGroup(og, od, tete, museau, nez, yeux)


def patte(s=0.18, couleur=BRUN):
    """Une empreinte de patte (décor des fiches)."""
    c = Ellipse(width=1.0 * s, height=0.8 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    doigts = VGroup(*[Circle(radius=0.2 * s, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(
        P(dx * s, 0.62 * s + dy * s)) for dx, dy in ((-0.45, -0.05), (-0.16, 0.12), (0.16, 0.12), (0.45, -0.05))])
    return VGroup(c, doigts)


def fiche(v, w=0.95, h=1.15, fs=46):
    """Une fiche de la clinique : carte blanche, le nombre de chiots, une patte."""
    carte = RoundedRectangle(width=w, height=h, corner_radius=0.1, fill_color=WHITE, fill_opacity=1,
                             stroke_color=GRILLE, stroke_width=3)
    n = texte(v, fs).move_to(carte).shift(UP * 0.08 * h)
    p = patte(0.16 * h / 1.15).next_to(n, DOWN, buff=0.06)
    return VGroup(carte, n, p)


class StatsEffectif4e(Paysage4e):
    nom_voix = "4e-stats-effectif"
    fichier_marques = "stats_effectif_marques.json"

    # ── les figures ─────────────────────────────────────────────────────────

    def fiches_grille(self, centre=P(-3.6, -0.35)):
        g = VGroup(*[fiche(v) for v in FICHES]).arrange_in_grid(rows=3, cols=4, buff=(0.32, 0.28))
        return g.move_to(centre)

    def fiches_rang(self, y=-1.05, w=0.78):
        g = VGroup(*[fiche(v, w, w * 1.2, 38) for v in FICHES]).arrange(RIGHT, buff=0.14)
        return g.move_to(P(-0.6, y))

    def tableau(self, lignes=None, total=False, centre=P(-1.4, 2.3), lc=1.3):
        entetes = [str(v) for v in VALEURS] + (["Total"] if total else [])
        lignes = lignes or [[None] * len(entetes)]
        tab = Tableau(entetes, lignes, libelles=["Effectif"], coin="Chiots", largeur_case=lc, largeur_libelle=2.4,
                      hauteur=0.85, fs=34, centre=centre)
        return textes_devant(tab)

    def batons(self, centre=P(-3.4, -1.3), largeur=4.4, hauteur=2.3):
        return Barres([str(v) for v in VALEURS], EFF, pas=1, batons=True, nom_axe="Portées", largeur=largeur,
                      hauteur=hauteur, fs=28, couleurs=[DOR] * 5, centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Déterminer un effectif", self.identite, "orange")
        cartes = VGroup(*[fiche(v, 0.8, 0.96, 38) for v in (7, 6, 7, 5, 7)]).arrange(RIGHT, buff=0.2)
        cartes.move_to(P(-0.6, 0.25))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in cartes], lag_ratio=0.15), run_time=0.8)
        self.au_mot("Combien de fois")
        sept = [cartes[i] for i in (0, 2, 4)]
        self.play(*[c[0].animate.set_stroke(AMBRE, width=8) for c in sept], run_time=0.4)
        q = self.t("?", 90, ORANGE_RETENUE).next_to(cartes, RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la vétérinaire ─────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        gros = chiot(1.15).move_to(P(-3.7, 1.0))
        croix_v = VGroup(Rectangle(width=0.32, height=1.0), Rectangle(width=1.0, height=0.32)).set_fill(
            VERT_OK, 1).set_stroke(width=0).move_to(P(-5.6, 2.6))
        metier = self.t("Vétérinaire", 46, BLEU_CALCUL).move_to(P(-3.7, -0.75))
        self.au_mot("Une vétérinaire")
        self.play(FadeIn(gros, scale=0.7), GrowFromCenter(croix_v), run_time=0.6)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        self.au_mot("avec des chiffres")
        soin = self.t("soigner et compter", 34, VERT_OK).next_to(metier, DOWN, buff=0.3)
        self.play(FadeIn(soin, shift=UP * 0.2), run_time=0.4)
        self.au_mot("12 portées")
        tit = self.col(self.ligne([("12", AMBRE), ("portées de labradors", WHITE)], 40), 2.5)
        petits = VGroup(*[chiot(0.32) for _ in range(12)]).arrange_in_grid(rows=3, cols=4, buff=(0.32, 0.22))
        self.col(petits, 0.75, xl=1.6)
        self.play(FadeIn(tit[0], scale=1.6), FadeIn(tit[1]), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in petits], lag_ratio=0.06), run_time=1.0)
        self.au_mot("les visites et les vaccins")
        vacc = self.col(self.t("visites, vaccins : prévoir", 34), -1.0)
        self.play(FadeIn(vacc, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("le plus souvent")
        q = self.col(self.bloc(["Combien de chiots,", "le plus souvent ?"], 40, ORANGE_RETENUE), -2.1)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.insister(q, 1.08, 0.3)
        self.attendre_voix()

    # ── 02 : les 12 fiches (données brutes) ─────────────────────────────────

    def ecran_brut(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-brut")
        g = self.fiches_grille()
        self.au_mot("Sur chaque fiche")
        tit = self.col(self.t("Les fiches", 46, JAUNE_TITRE), 2.4)
        self.play(Write(tit), run_time=0.5)
        # « 7, 6, 8, 7, 5, 6, 9, 7, 6, 8, 5, 7 » : une fiche par nombre dit
        voix = self._texte_voix
        debut = voix.find("chiots : ") + len("chiots : ")
        positions, j = [], debut
        for v in FICHES:
            j = voix.find(str(v), j)
            positions.append(j)
            j += 1
        for k, (c, pos) in enumerate(zip(g, positions)):
            n = voix[:pos].count(str(FICHES[k])) + 1
            self.au_mot(str(FICHES[k]), n)
            self.play(FadeIn(c, shift=DOWN * 0.25, scale=1.15), run_time=0.22)
        self.au_mot("données brutes")
        db = self.col(self.t("données brutes", 44, AMBRE), 1.2)
        self.play(FadeIn(db, scale=0.7), run_time=0.4)
        self.au_mot("12 fiches")
        nb = self.col(self.ligne([("12", AMBRE), ("fiches, en vrac", WHITE)], 40), 0.1)
        self.play(FadeIn(nb, shift=RIGHT * 0.2), run_time=0.4)
        self.play(*[c.animate.rotate((-1) ** k * 0.08) for k, c in enumerate(g)], run_time=0.4)
        self.play(*[c.animate.rotate(-(-1) ** k * 0.08) for k, c in enumerate(g)], run_time=0.4)
        self.attendre_voix()

    # ── 03 : compter les 7 ──────────────────────────────────────────────────

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-compter")
        g = self.fiches_grille()
        self.add(g)
        self.au_mot("Combien de portées")
        q = self.col(self.bloc(["Combien de portées", "de 7 chiots ?"], 40), 2.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Je cherche les 7")
        sept = [k for k, v in enumerate(FICHES) if v == 7]
        autres = [k for k in range(12) if k not in sept]
        self.play(*[g[k][0].animate.set_stroke(AMBRE, width=9) for k in sept],
                  *[g[k].animate.set_opacity(0.3) for k in autres], run_time=0.5)
        badges = VGroup()
        for n, (k, mot) in enumerate(zip(sept, ["1, 2", "2, 3", "3, 4", "4. La"])):
            self.au_mot(mot)
            b = Circle(radius=0.24, fill_color=AMBRE, fill_opacity=1, stroke_width=0)
            b.add(texte(n + 1, 30, NUIT).move_to(b)).move_to(g[k].get_corner(UR))
            badges.add(b)
            self.play(FadeIn(b, scale=1.8), Indicate(g[k], color=AMBRE, scale_factor=1.12), run_time=0.3)
        self.au_mot("un effectif de 4")
        res = self.col(self.ligne([("valeur", WHITE), ("7", AMBRE), ("→", WHITE), ("effectif", WHITE),
                                   ("4", VERT_OK)], 46), 0.75)
        self.play(FadeIn(res, scale=0.7), run_time=0.5)
        self.insister(res[4], 1.6, 0.3)
        self.au_mot("L'effectif, c'est")
        df = self.col(self.bloc(["Effectif = le nombre de fois", "où la valeur apparaît"], 36, VERT_OK), -0.85)
        cadre = self.encadrer(df)
        self.play(FadeIn(df, shift=UP * 0.2), Create(cadre), run_time=0.7)
        self.attendre_voix()

    # ── 04 : le tableau ─────────────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-tableau")
        g = self.fiches_grille()
        self.add(g)
        rang = self.fiches_rang()
        tab = self.tableau()
        self.au_mot("Je fais pareil")
        self.play(Transform(g, rang), FadeIn(tab, shift=DOWN * 0.2), run_time=0.9)
        self.play(remplir(tab, 0, 2, 4), *tab.allumer_case(0, 2), run_time=0.4)
        self.play(*tab.eteindre(), run_time=0.3)
        for i, (v, mot) in enumerate(zip(VALEURS, ["5 chiots", "6 chiots", None, "8 chiots", "9 chiots"])):
            if mot is None:
                continue
            self.au_mot(mot)
            ks = [k for k, x in enumerate(FICHES) if x == v]
            self.play(*[g[k][0].animate.set_stroke(AMBRE, width=9) for k in ks], *tab.allumer_colonne(i),
                      run_time=0.35)
            self.au_mot(f"{EFF[i]} portée", 2 if i == 3 else 1)
            self.play(remplir(tab, 0, i, EFF[i]), *[Indicate(g[k], color=AMBRE, scale_factor=1.1) for k in ks],
                      run_time=0.4)
            self.play(*[g[k][0].animate.set_stroke(GRILLE, width=3) for k in ks], *tab.eteindre(), run_time=0.25)
        self.au_mot("En haut")
        hv = self.t("← les valeurs", 36, AMBRE).next_to(tab, RIGHT, buff=0.3).align_to(tab.tetes, DOWN)
        hv.shift(UP * 0.12)
        self.play(FadeIn(hv, shift=LEFT * 0.2), Circumscribe(VGroup(tab.tetes), color=AMBRE), run_time=0.7)
        self.au_mot("En dessous")
        he = self.t("← les effectifs", 36, VERT_OK).next_to(tab, RIGHT, buff=0.3)
        he.match_y(tab.cases[0][0])
        self.play(FadeIn(he, shift=LEFT * 0.2), Circumscribe(VGroup(*tab.cases[0]), color=VERT_OK), run_time=0.7)
        self.attendre_voix()

    def tableau_plein(self, **kw):
        tab = self.tableau([EFF], **kw)
        return tab

    # ── 05 : l'effectif total ───────────────────────────────────────────────

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-total")
        tab = self.tableau_plein()
        b = self.batons()
        self.add(tab)
        self.au_mot("Combien de portées en tout")
        q = self.col(self.t("Combien en tout ?", 42), 0.6)
        self.play(FadeIn(b.fond), FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.play(b.pousser(run_time=0.8))
        somme = self.ligne([("2", WHITE), ("+", WHITE), ("3", WHITE), ("+", WHITE), ("4", WHITE), ("+", WHITE),
                            ("2", WHITE), ("+", WHITE), ("1", WHITE)], 48, 0.16)
        self.col(somme, -0.35)
        for i, mot in enumerate(["2 plus 3", "3 plus 4", "4 plus 2", "2 plus 1", "1, égale"]):
            self.au_mot(mot)
            morceaux = [somme[2 * i]] + ([somme[2 * i - 1]] if i else [])
            self.play(*[FadeIn(m, scale=1.5) for m in morceaux], *tab.allumer_case(0, i),
                      Indicate(b.barres[i], color=AMBRE, scale_factor=1.15), run_time=0.3)
        self.au_mot("12. L'effectif")
        tot = self.ligne([("=", WHITE), ("12", VERT_OK)], 56).next_to(somme, DOWN, buff=0.3).align_to(somme, LEFT)
        self.play(FadeIn(tot, shift=UP * 0.2), *tab.eteindre(), run_time=0.4)
        self.insister(tot[1], 1.5, 0.3)
        self.au_mot("L'effectif total est 12")
        et = self.col(self.ligne([("Effectif total :", WHITE), ("12", VERT_OK)], 38), -1.95)
        cadre = self.encadrer(et)
        self.play(FadeIn(et, shift=UP * 0.2), Create(cadre), run_time=0.5)
        self.au_mot("on retrouve bien")
        ok = self.ligne([("=", WHITE), ("12", VERT_OK), ("fiches", WHITE)], 38)
        ok.add(self.coche(VERT_OK, 0.26))
        ok.arrange(RIGHT, buff=0.18)
        self.col(ok, -2.95)
        self.play(FadeIn(ok, shift=UP * 0.2), run_time=0.5)
        self.au_mot("la somme des hauteurs")
        self.play(LaggedStart(*[Indicate(m, color=AMBRE, scale_factor=1.2) for m in b.barres], lag_ratio=0.25),
                  run_time=1.2)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        tab = self.tableau_plein(centre=P(-0.6, 2.3))
        self.add(tab)
        self.au_mot("Le piège")
        titre = self.t("Le piège", 50, ROUGE_ERREUR).move_to(P(-0.6, 0.62))
        self.play(Write(titre), run_time=0.4)
        self.au_mot("additionner les valeurs")
        self.play(*[t[0].animate.set_fill("#7f1d1d") for t in tab.tetes], run_time=0.4)
        faux = self.ligne([("5", ROUGE_ERREUR), ("+", WHITE), ("6", ROUGE_ERREUR), ("+", WHITE),
                           ("7", ROUGE_ERREUR), ("+", WHITE), ("8", ROUGE_ERREUR), ("+", WHITE),
                           ("9", ROUGE_ERREUR)], 50, 0.18)
        faux.move_to(P(-1.4, -0.3))
        for i, mot in enumerate(["5 plus 6", "6 plus 7", "7 plus 8", "8 plus 9", "9, égale"]):
            self.au_mot(mot)
            morceaux = [faux[2 * i]] + ([faux[2 * i - 1]] if i else [])
            self.play(*[FadeIn(m, scale=1.5) for m in morceaux], Indicate(tab.tetes[i], color=ROUGE_ERREUR),
                      run_time=0.28)
        self.au_mot("35. 35")
        r35 = self.ligne([("=", WHITE), ("35", ROUGE_ERREUR)], 50).next_to(faux, RIGHT, buff=0.25)
        self.play(FadeIn(r35, scale=1.4), run_time=0.35)
        self.au_mot("35 portées ?")
        p35 = self.t("35 portées ?", 44, ROUGE_ERREUR).move_to(P(-0.6, -1.2))
        self.play(FadeIn(p35, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Impossible")
        x = croix(p35, sw=8)
        self.play(Create(x), run_time=0.4)
        self.au_mot("12 fiches")
        mini = VGroup(*[fiche(v, 0.55, 0.66, 28) for v in FICHES]).arrange(RIGHT, buff=0.1).move_to(P(-0.6, -2.2))
        self.play(LaggedStart(*[FadeIn(m, scale=0.5) for m in mini], lag_ratio=0.05), run_time=0.6)
        self.au_mot("On additionne les effectifs")
        regle = self.ligne([("Effectifs", VERT_OK), ("oui,", WHITE), ("valeurs", ROUGE_ERREUR), ("non", WHITE)], 40)
        regle.move_to(P(-0.6, -3.25))
        self.play(FadeIn(regle, shift=UP * 0.2), Circumscribe(VGroup(*tab.cases[0]), color=VERT_OK), run_time=0.7)
        self.insister(regle, 1.1, 0.3)
        self.attendre_voix()

    # ── 07 : au moins 8 chiots ──────────────────────────────────────────────

    def ecran_aumoins(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-aumoins")
        tab = self.tableau_plein()
        b = self.batons()
        self.add(tab, b)
        self.au_mot("Combien de portées")
        q = self.col(self.bloc(["Au moins", "8 chiots ?"], 44), 0.55)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("8 ou plus")
        ou = self.col(self.ligne([("8", AMBRE), ("ou", WHITE), ("plus", AMBRE)], 42), -0.7)
        self.play(FadeIn(ou, shift=UP * 0.2), run_time=0.4)
        self.au_mot("8 et 9")
        self.play(*tab.allumer_colonne(3), *tab.allumer_colonne(4), b.estomper([3, 4], 0.25), run_time=0.5)
        self.insister(VGroup(b.barres[3], b.barres[4]), 1.15, 0.25)
        self.au_mot("2 plus 1")
        calc = self.col(self.ligne([("2", WHITE), ("+", WHITE), ("1", WHITE)], 48), -1.6)
        self.play(FadeIn(calc, scale=1.3), run_time=0.4)
        self.au_mot("3 portées")
        res = self.ligne([("=", WHITE), ("3", VERT_OK), ("portées", WHITE)], 48).next_to(calc, RIGHT, buff=0.25)
        if res.get_right()[0] > 6.6:
            VGroup(calc, res).scale_to_fit_width(5.6).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(res, shift=LEFT * 0.2), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(calc, res))), run_time=0.4)
        self.insister(res[1], 1.5, 0.3)
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def tableau_defi(self, plein=False):
        lignes = [DEFI + [20]] if plein else [[None] * 6]
        return self.tableau(lignes, total=True, centre=P(-0.6, 2.3), lc=1.25)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.au_mot("À toi de jouer")
        titre = self.t("À toi de jouer", 50, JAUNE_TITRE).move_to(P(-0.6, 3.45))
        tab = self.tableau_defi().move_to(P(-0.6, 1.75))
        self.play(Write(titre), FadeIn(tab, shift=DOWN * 0.2), run_time=0.6)
        self.au_mot("20 portées")
        self.play(remplir(tab, 0, 5, 20), *tab.allumer_case(0, 5), run_time=0.4)
        self.play(*tab.eteindre(), run_time=0.25)
        for i, mot in [(0, "5 chiots : 3"), (2, "7 chiots : 6"), (3, "8 chiots : 4"), (4, "9 chiots : 2")]:
            self.au_mot(mot)
            self.play(remplir(tab, 0, i, DEFI[i]), run_time=0.3)
            if i == 0:
                self.au_mot("on ne sait pas")
                self.play(remplir(tab, 0, 1, "?"), run_time=0.35)
                self.insister(tab.texte_case(0, 1), 1.5, 0.25)
        self.au_mot("Combien de portées de 6")
        q1 = self.ligne([("1.", AMBRE), ("Combien de portées de 6 chiots ?", WHITE)], 40)
        q1.move_to(P(-0.6, -0.1)).align_to(P(-5.6, 0), LEFT)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Et combien ont au moins 8")
        q2 = self.ligne([("2.", AMBRE), ("Combien ont au moins 8 chiots ?", WHITE)], 40)
        q2.move_to(P(-0.6, -1.15)).align_to(P(-5.6, 0), LEFT)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 42, ORANGE_RETENUE).move_to(P(-0.6, -2.5))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08b-correction")
        titre = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.6, 3.45))
        tab = self.tableau_defi(plein=True).move_to(P(-0.6, 1.75))
        self.add(tab)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("les effectifs connus")
        connus = [0, 2, 3, 4]
        self.play(*[a for i in connus for a in tab.allumer_case(0, i)], run_time=0.4)
        somme = self.ligne([("3", WHITE), ("+", WHITE), ("6", WHITE), ("+", WHITE), ("4", WHITE), ("+", WHITE),
                            ("2", WHITE)], 50, 0.16).move_to(P(-2.6, 0.0)).align_to(P(-5.8, 0), LEFT)
        for k, mot in enumerate(["3 plus 6", "6 plus 4", "4 plus 2", "2, égale"]):
            self.au_mot(mot)
            morceaux = [somme[2 * k]] + ([somme[2 * k - 1]] if k else [])
            self.play(*[FadeIn(m, scale=1.5) for m in morceaux], run_time=0.25)
        self.au_mot("15. Il")
        s15 = self.ligne([("=", WHITE), ("15", BLEU_CALCUL)], 50).next_to(somme, RIGHT, buff=0.25)
        self.play(FadeIn(s15, scale=1.4), *tab.eteindre(), run_time=0.35)
        self.au_mot("20 moins 15")
        diff = self.ligne([("20", WHITE), ("−", WHITE), ("15", BLEU_CALCUL)], 50).move_to(P(-2.6, -1.1))
        diff.align_to(somme, LEFT)
        self.play(FadeIn(diff, shift=RIGHT * 0.2), Indicate(tab.texte_case(0, 5), color=AMBRE), run_time=0.4)
        self.au_mot("5 portées de 6")
        r5 = self.ligne([("=", WHITE), ("5", VERT_OK)], 50).next_to(diff, RIGHT, buff=0.25)
        self.play(FadeIn(r5, scale=1.4), remplir(tab, 0, 1, 5, color="#15803d"), *tab.allumer_case(0, 1),
                  run_time=0.45)
        self.insister(r5[1], 1.5, 0.3)
        self.au_mot("Au moins 8 chiots")
        self.play(*tab.eteindre(), run_time=0.2)
        self.play(*tab.allumer_case(0, 3), *tab.allumer_case(0, 4), run_time=0.35)
        am = self.ligne([("Au moins 8 :", WHITE), ("4", WHITE), ("+", WHITE), ("2", WHITE)], 46)
        am.move_to(P(-2.6, -2.3)).align_to(somme, LEFT)
        self.play(FadeIn(am, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("6 portées")
        r6 = self.ligne([("=", WHITE), ("6", VERT_OK), ("portées", WHITE)], 46).next_to(am, RIGHT, buff=0.25)
        self.play(FadeIn(r6, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(am, r6))), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        b = self.batons(centre=P(-5.0, -0.3), largeur=2.5, hauteur=2.6)
        self.add(b)
        self.XL = -2.4
        lignes = self.finale([("L'effectif d'une valeur :", "le nombre de fois où elle apparaît."),
                              ("L'effectif total :", "la somme des effectifs."),
                              ("Avec le total, je retrouve", "une case effacée.")], [1.7, 0.1, -1.5], fs=38)
        self.au_mot("L'effectif d'une valeur")
        self.montrer_ligne(lignes[0], Indicate(b.barres[2], color=AMBRE, scale_factor=1.15))
        self.au_mot("L'effectif total")
        self.montrer_ligne(lignes[1], LaggedStart(*[Indicate(m, color=AMBRE) for m in b.barres], lag_ratio=0.2))
        self.au_mot("Et avec le total")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_brut()
        self.ecran_compter()
        self.ecran_tableau()
        self.ecran_total()
        self.ecran_piege()
        self.ecran_aumoins()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
