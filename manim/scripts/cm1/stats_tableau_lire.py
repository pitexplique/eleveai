# stats_tableau_lire.py
# EleveAI — Maths CM1 ET CM2 — série « Statistiques », épisode 01 : LIRE UN
# TABLEAU à double entrée (micro du coach : tableau_lire, banque
# cm1/maths/tableaux.bank.ts, canvas `tableau_donnees`), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE : croiser une ligne et une colonne, un cran
# au-dessus du « je vois » (comme le pilote 05-graphique-lire). Short jumeau :
# stats_tableau_lire_short.py (blanche).
#
# ⭐ Décor et métier : la BIOLOGIE MARINE, La Réunion ; une BIOLOGISTE MARINE
# compte les tortues vertes sur trois plages (Saint-Leu, L'Hermitage,
# l'Étang-Salé), en janvier, février et mars, pour savoir où les protéger.
# ⭐ La figure est CELLE DU COACH (canvas_stats.Tableau = `tableau_donnees` :
# en-tête sombre, colonne des libellés bleu clair, case allumée jaune + anneau).
# Le geste se VOIT : flèche le long de la LIGNE, flèche le long de la COLONNE,
# la case du croisement s'allume ; le piège : le doigt glisse sur la mauvaise
# ligne, puis le doigt suit la bonne jusqu'au bout.
# ⛔ PAS D'ÉCART : les cases sont VIDES jusqu'au mot où la voix dit le nombre.
#
# Écrans : 00 garde · 01 la biologiste, l'île, les trois plages · 02 le
# tableau : lignes = plages, colonnes = mois · 03 on remplit (par mois) ·
# 04 lire Saint-Leu × février = 12 · 05 Étang-Salé × mars = 6 · 06 le piège
# (le 11 est à L'Hermitage, en mars ; le doigt suit la ligne) · 07 défi ·
# 07b correction (7) · 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/cm-stats-tableau-lire.json (débit −10), WAV dans
# public/sons/cm-stats-tableau-lire/ ; calage mot à mot :
# manim/scripts/cm1/statscm_tableau_lire_marques.json.
# ⭐ UNE voix, UN script, DEUX rendus : StatsTableauLireCM2 ne change que
# l'identité (« Maths CM2 — EleveAI »). La voix ne cite aucune classe.
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_tableau_lire.py StatsTableauLireCM1 -o eleveai-maths-cm1-stats-tableau-lire --media_dir manim/scripts/cm1/media-tableau-lire
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_tableau_lire.py StatsTableauLireCM2 -o eleveai-maths-cm2-stats-tableau-lire --media_dir manim/scripts/cm1/media-tableau-lire-cm2
# Sorties : manim/sorties/cm1/maths/statistiques/01-tableau-lire/ et
#           manim/sorties/cm2/maths/statistiques/01-tableau-lire/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_tableau_commun import *  # noqa: E402,F403
from stats_tableau_commun import P, BaseTableauPaysage  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, BORD_TABLEAU, Tableau  # noqa: E402

PLAGES = ["Saint-Leu", "L'Hermitage", "Étang-Salé"]
MOIS = ["Janvier", "Février", "Mars"]
DONNEES = [[8, 12, 9], [5, 7, 11], [3, 4, 6]]  # DONNEES[plage][mois]
VERT_TORTUE, CARAPACE = "#16a34a", "#166534"
SABLE, MER = "#fde68a", "#0ea5e9"


def tortue(s=1.0):
    """Une tortue verte vue de dessus : carapace, écailles, tête, quatre nageoires."""
    nag = VGroup(*[Ellipse(width=0.55 * s, height=0.22 * s, fill_color=VERT_TORTUE, fill_opacity=1,
                           stroke_width=0).rotate(a).move_to(P(x * s, y * s))
                   for x, y, a in ((-0.38, 0.3, 0.6), (0.38, 0.3, -0.6), (-0.32, -0.32, -0.5), (0.32, -0.32, 0.5))])
    tete = Circle(radius=0.15 * s, fill_color=VERT_TORTUE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.55 * s))
    cara = Ellipse(width=0.72 * s, height=0.88 * s, fill_color=CARAPACE, fill_opacity=1, stroke_color="#bbf7d0",
                   stroke_width=2 * s)
    ecailles = VGroup(RegularPolygon(6, fill_opacity=0, stroke_color="#86efac", stroke_width=2 * s).scale(0.17 * s),
                      *[RegularPolygon(6, fill_opacity=0, stroke_color="#86efac", stroke_width=2 * s).scale(0.12 * s)
                        .move_to(P(dx * s, dy * s)) for dx, dy in ((0, 0.27), (0, -0.27), (-0.2, 0.1), (0.2, 0.1),
                                                                    (-0.2, -0.13), (0.2, -0.13))])
    return VGroup(nag, tete, cara, ecailles)


def ile(s=1.0):
    """La Réunion, en gros : une île un peu plus large que haute, verte, bordée de sable."""
    pts = [(-1.3, 0.25), (-1.05, 0.75), (-0.5, 1.0), (0.2, 1.05), (0.85, 0.85), (1.3, 0.35), (1.35, -0.25),
           (1.0, -0.8), (0.4, -1.0), (-0.3, -0.95), (-0.85, -0.65), (-1.2, -0.25)]
    contour = Polygon(*[P(x * s, y * s) for x, y in pts], fill_color="#15803d", fill_opacity=1,
                      stroke_color=SABLE, stroke_width=6).round_corners(0.25 * s)
    piton = Triangle(fill_color="#78350f", fill_opacity=1, stroke_width=0).scale(0.28 * s).move_to(P(0.15 * s, 0.05 * s))
    return VGroup(contour, piton)


def vague(largeur=3.0, y=0.0, x=0.0):
    return FunctionGraph(lambda u: 0.07 * np.sin(6 * u), x_range=[-largeur / 2, largeur / 2],
                         color=MER, stroke_width=4).move_to(P(x, y))


class StatsTableauLireBase(BaseTableauPaysage):
    nom_voix = "cm-stats-tableau-lire"
    fichier_marques = "statscm_tableau_lire_marques.json"
    identite = "Maths CM1 — EleveAI"
    XL = 1.6
    G = P(-2.85, -0.35)  # le centre du tableau

    def tableau(self, plein=True):
        """Le tableau des tortues, comme dans le coach (non ajouté)."""
        lignes = [list(r) for r in DONNEES] if plein else [[None] * 3 for _ in range(3)]
        tab = Tableau(MOIS, lignes, libelles=PLAGES, coin="Plage", largeur_case=1.7, largeur_libelle=2.5,
                      hauteur=0.9, fs=32, titre="Tortues vertes comptées", centre=self.G)
        return textes_devant(tab)

    def tableau_pret(self):
        tab = self.tableau()
        self.add(tab)
        return tab

    def vider_fond(self, tab):
        """La structure seule : carte, titre, coin, rectangles des cases (pas les en-têtes)."""
        rects = VGroup(*[tab.case(r, c) for r in range(3) for c in range(3)])
        return VGroup(tab.carte, tab.titre, tab.coin, rects)

    def revenir(self, tab, coords):
        """Les cases `coords` reprennent leur fond d'origine (sans anneau)."""
        return [tab.case(r, c).animate.set_fill(tab._fonds[r]).set_stroke(BORD_TABLEAU, width=2.5)
                for r, c in coords]

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        ti, ident, ech = self.garde("Lire un tableau", "jaune")
        self.au_mot("Combien de tortues")
        tt = tortue(1.6).move_to(P(-3.3, 0.25))
        self.play(Write(ti), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tt, shift=RIGHT * 0.6),
                  run_time=0.7)
        q = self.t("?", 90, ORANGE_RETENUE).next_to(tt, RIGHT, buff=0.35)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.au_mot("Un tableau")
        tab = Tableau(["Janv.", "Févr.", "Mars"], [[None] * 3 for _ in range(3)], libelles=PLAGES, coin="",
                      largeur_case=1.05, largeur_libelle=2.0, hauteur=0.55, fs=22, centre=P(2.1, 0.25))
        self.play(FadeIn(tab, scale=0.9), run_time=0.6)
        self.au_mot("un coup d'œil")
        self.play(*allumer(tab, 0, 1), run_time=0.4)
        self.insister(tab.case(0, 1), 1.25, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la biologiste marine, les trois plages ─────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Une biologiste marine")
        metier = self.col(self.t("Biologiste marine", 44, BLEU_CALCUL), 2.6)
        self.play(FadeIn(metier, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("les tortues vertes")
        tt = tortue(1.0).rotate(-0.9).move_to(P(-5.6, 2.3))
        vagues = VGroup(vague(2.0, 2.9, -5.0), vague(1.6, 1.6, -6.0))
        self.play(FadeIn(vagues), FadeIn(tt, shift=RIGHT * 0.5), run_time=0.6)
        self.au_mot("trois plages")
        il = ile(1.55).move_to(P(-1.9, -0.55))
        reu = self.t("La Réunion", 30, VERT_OK).next_to(il, DOWN, buff=0.2)
        self.play(FadeIn(il, scale=0.9), FadeIn(reu, shift=UP * 0.2), run_time=0.5)
        locales = [(-1.22, 0.45), (-1.28, 0.0), (-1.05, -0.48)]
        c0 = il[0].get_center()
        points = VGroup(*[Dot(c0 + P(x * 1.55, y * 1.55), radius=0.11, color=SABLE).set_stroke(NUIT, 2)
                          for x, y in locales])
        noms = VGroup(*[self.t(n, 30).next_to(d, LEFT, buff=0.25) for n, d in zip(PLAGES, points)])
        self.play(LaggedStart(*[AnimationGroup(FadeIn(d, scale=2), FadeIn(n, shift=LEFT * 0.2))
                                for d, n in zip(points, noms)], lag_ratio=0.3), run_time=0.8)
        self.au_mot("Son métier")
        m = self.col(self.bloc(["Son métier :", "protéger ces tortues"], 38), 1.0)
        m[1].set_color(VERT_OK)
        self.play(FadeIn(m, shift=RIGHT * 0.2), tt.animate.shift(RIGHT * 0.6 + DOWN * 0.3), run_time=0.6)
        self.au_mot("Elle veut savoir")
        q = self.col(self.bloc(["Où viennent-elles", "le plus ?"], 38, ORANGE_RETENUE), -0.75)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.play(LaggedStart(*[Indicate(d, color=ORANGE_RETENUE, scale_factor=1.8) for d in points],
                              lag_ratio=0.25), run_time=1.0)
        self.attendre_voix()

    # ── 02 : le tableau, lignes et colonnes ─────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        tab = self.tableau(plein=False)
        self.play(FadeIn(self.vider_fond(tab), scale=0.95), run_time=0.6)
        self.au_mot("dans un tableau")
        self.play(Indicate(tab.carte, color=AMBRE, scale_factor=1.03), run_time=0.5)
        self.au_mot("Les lignes")
        lg = self.col(self.ligne([("Les lignes :", AMBRE), ("les plages", WHITE)], 40), 2.0)
        self.play(FadeIn(lg, shift=RIGHT * 0.2), run_time=0.4)
        avant = None
        for r, mot in enumerate(["Saint-Leu", "L'Hermitage", "l'Étang-Salé"]):
            self.au_mot(mot)
            anims = teinter_ligne(tab, r) + (self.revenir(tab, [(avant, c) for c in range(3)]) if avant is not None
                                             else [])
            self.play(FadeIn(tab.libelles[r], shift=RIGHT * 0.3), *anims, run_time=0.35)
            self.insister(tab.libelles[r], 1.2, 0.15)
            avant = r
        fl = Arrow(P(self.XL, 1.2), P(self.XL + 2.2, 1.2), buff=0, color=AMBRE, stroke_width=7)
        self.play(GrowArrow(fl), *self.revenir(tab, [(2, c) for c in range(3)]), run_time=0.4)
        self.au_mot("Les colonnes")
        co = self.col(self.ligne([("Les colonnes :", BLEU_CALCUL), ("les mois", WHITE)], 40), 0.15)
        self.play(FadeIn(co, shift=RIGHT * 0.2), run_time=0.4)
        avant = None
        for c, mot in enumerate(["janvier", "février", "mars"]):
            self.au_mot(mot)
            anims = teinter_colonne(tab, c, BLEU_PALE) + (self.revenir(tab, [(r, avant) for r in range(3)])
                                                          if avant is not None else [])
            self.play(FadeIn(tab.tetes[c], shift=DOWN * 0.3), *anims, run_time=0.35)
            self.insister(tab.tetes[c], 1.2, 0.15)
            avant = c
        fl2 = Arrow(P(self.XL + 0.6, -0.55), P(self.XL + 0.6, -2.2), buff=0, color=BLEU_CALCUL, stroke_width=7)
        self.play(GrowArrow(fl2), *self.revenir(tab, [(r, 2) for r in range(3)]), run_time=0.4)
        self.attendre_voix()

    # ── 03 : on remplit, mois par mois ──────────────────────────────────────

    def ecran_remplir(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-remplir")
        tab = self.tableau(plein=False)
        self.add(tab)
        mots = [("Janvier", ["8 tortues", "5 à", "3 à"]), ("Février", ["12,", "7 et", "4."]),
                ("Mars", ["9,", "11 et", "6."])]
        tt = tortue(0.9).move_to(P(self.XL + 0.5, 1.4))
        self.play(FadeIn(tt, scale=0.6), run_time=0.3)
        etiq = None
        for c, (mois, nombres) in enumerate(mots):
            self.au_mot(mois)
            neuf = self.t(mois, 52, BLEU_CALCUL).next_to(tt, RIGHT, buff=0.4)
            anims = teinter_colonne(tab, c, BLEU_PALE)
            if c > 0:
                anims += self.revenir(tab, [(r, c - 1) for r in range(3)])
            self.play(FadeOut(etiq) if etiq else Wait(0.01), FadeIn(neuf, shift=UP * 0.2),
                      Indicate(tab.tetes[c], color=AMBRE), *anims, run_time=0.4)
            etiq = neuf
            for r, mot in enumerate(nombres):
                self.au_mot(mot)
                self.play(remplir(tab, r, c, DONNEES[r][c]), run_time=0.35)
        self.play(*self.revenir(tab, [(r, 2) for r in range(3)]), run_time=0.4)
        plein = self.col(self.bloc(["Le tableau", "est rempli !"], 40, VERT_OK), -0.6)
        self.play(FadeIn(plein, shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── le geste de lecture : la ligne, la colonne, le croisement ───────────

    def lire(self, tab, r, c, mots, y0, avec_etapes=True):
        """mots = {"ligne", "colonne", "croise" (ou None), "valeur"} : les extraits
        de la voix. Les étapes s'écrivent dans la colonne de droite depuis y0.
        Renvoie les objets posés (pour les effacer)."""
        v = DONNEES[r][c]
        poses = VGroup()
        self.au_mot(mots["ligne"])
        fl = fleche_ligne(tab, r, c)
        anims = [GrowArrow(fl), *teinter(tab, [(r, k) for k in range(3) if k != c])]
        e1 = self.col(self.ligne([("1.", AMBRE), ("la ligne " + PLAGES[r], WHITE)], 36), y0)
        if avec_etapes:
            anims.append(FadeIn(e1, shift=RIGHT * 0.2))
            poses.add(e1)
        self.play(Indicate(tab.libelles[r], color=AMBRE, scale_factor=1.15), *anims, run_time=0.6)
        self.au_mot(mots["colonne"])
        fc = fleche_colonne(tab, c, r, BLEU_CALCUL)
        e2 = self.col(self.ligne([("2.", BLEU_CALCUL), ("la colonne " + MOIS[c].lower(), WHITE)], 36), y0 - 0.75)
        anims = [GrowArrow(fc), *teinter(tab, [(k, c) for k in range(3) if k != r], BLEU_PALE)]
        if avec_etapes:
            anims.append(FadeIn(e2, shift=RIGHT * 0.2))
            poses.add(e2)
        self.play(Indicate(tab.tetes[c], color=AMBRE, scale_factor=1.15), *anims, run_time=0.6)
        if mots.get("croise"):
            self.au_mot(mots["croise"])
            self.play(*allumer(tab, r, c), run_time=0.4)
        self.au_mot(mots["valeur"])
        if not mots.get("croise"):
            self.play(*allumer(tab, r, c), run_time=0.3)
        res = self.col(self.ligne([(str(v), VERT_OK), ("tortues", WHITE)], 50), y0 - 1.75)
        cadre = self.encadre(res)
        nb = tab.texte_case(r, c)
        self.play(nb.animate.scale(1.8).set_color(ORANGE_Q), FadeIn(res, scale=0.6), run_time=0.4)
        self.play(nb.animate.scale(1 / 1.8).set_color(NUIT), Create(cadre), run_time=0.4)
        self.insister(VGroup(res, cadre), 1.12, 0.25)
        poses.add(res, cadre)
        return VGroup(fl, fc), poses

    # ── 04 et 05 : lire une case ────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-lire")
        tab = self.tableau_pret()
        self.au_mot("Combien")
        q = self.col(self.bloc(["Saint-Leu,", "en février ?"], 42, ORANGE_RETENUE), 2.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.lire(tab, 0, 1, {"ligne": "la ligne Saint-Leu", "colonne": "la colonne février",
                              "croise": "Là où elles se croisent", "valeur": "12 tortues"}, 1.0)
        self.attendre_voix()

    def ecran_autre(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-autre")
        tab = self.tableau_pret()
        self.au_mot("À l'Étang-Salé")
        q = self.col(self.bloc(["Étang-Salé,", "en mars ?"], 42, ORANGE_RETENUE), 2.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.lire(tab, 2, 2, {"ligne": "La ligne", "colonne": "la colonne", "valeur": "6 tortues"}, 1.0)
        self.attendre_voix()

    # ── 06 : le piège, glisser sur la mauvaise ligne ────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        tab = self.tableau_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.65)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("glisser sur la mauvaise ligne")
        sous = self.col(self.bloc(["glisser sur", "la mauvaise ligne"], 36, ORANGE_RETENUE), 1.55)
        d = doigt(ROUGE_ERREUR).move_to(tab.libelles[0].get_left() + RIGHT * 0.25 + DOWN * 0.26)
        p1 = tab.case(0, 1).get_center() + DOWN * 0.26
        p2 = tab.case(1, 2).get_center() + LEFT * 0.45
        chemin = VMobject().set_points_as_corners([d.get_center(), p1, p2])
        trace = TracedPath(d.get_center, stroke_color=ROUGE_ERREUR, stroke_width=6)
        self.add(trace)
        self.play(FadeIn(sous, shift=RIGHT * 0.2), FadeIn(d, scale=2), run_time=0.4)
        self.play(MoveAlongPath(d, chemin), run_time=1.3, rate_func=linear)
        self.au_mot("Le 11")
        self.play(*allumer(tab, 1, 2, couleur="#fecaca", anneau=ROUGE_ERREUR), run_time=0.3)
        self.insister(tab.texte_case(1, 2), 1.7, 0.25)
        self.au_mot("ce n'est pas Saint-Leu")
        faux = self.col(self.ligne([("11 :", WHITE), ("pas Saint-Leu", ROUGE_ERREUR)], 38), 0.45)
        x = croix(tab.libelles[0][1].copy(), sw=6).set_z_index(8)
        self.play(FadeIn(faux, shift=RIGHT * 0.2), Create(x), run_time=0.5)
        self.au_mot("c'est L'Hermitage")
        self.play(FadeOut(d), FadeOut(trace), *eteindre(tab), run_time=0.3)
        self.play(*teinter_ligne(tab, 1), Indicate(tab.libelles[1], color=VERT_OK, scale_factor=1.15), run_time=0.4)
        self.au_mot("en mars")
        vrai = self.col(self.ligne([("11 :", WHITE), ("L'Hermitage, mars", VERT_OK)], 38), -0.4)
        self.play(FadeIn(vrai, shift=RIGHT * 0.2), Indicate(tab.tetes[2], color=AMBRE, scale_factor=1.15),
                  *allumer(tab, 1, 2), run_time=0.5)
        self.au_mot("Je suis la ligne")
        regle = self.col(self.bloc(["Je suis la ligne", "jusqu'au bout"], 38, BLEU_CALCUL), -1.4)
        d2 = doigt(VERT_OK).move_to(tab.libelles[1].get_left() + RIGHT * 0.25 + DOWN * 0.3)
        fin = tab.case(1, 2).get_right() + LEFT * 0.2 + DOWN * 0.3
        trace2 = TracedPath(d2.get_center, stroke_color=VERT_OK, stroke_width=6)
        self.add(trace2)
        self.play(FadeIn(regle, shift=RIGHT * 0.2), FadeIn(d2, scale=2), run_time=0.4)
        self.au_mot("jusqu'au bout")
        self.play(d2.animate.move_to(fin), run_time=1.2, rate_func=linear)
        self.play(Indicate(regle[1], color=VERT_OK), run_time=0.5)
        self.attendre_voix()

    # ── 07 : défi, 07b : correction ─────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        tab = self.tableau_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Combien de tortues")
        q = self.col(self.bloc(["Combien de tortues", "à L'Hermitage", "en février ?"], 40), 1.0)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.play(Indicate(tab.libelles[1], color=AMBRE, scale_factor=1.15),
                  Indicate(tab.tetes[1], color=AMBRE, scale_factor=1.15), run_time=0.8)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -0.75)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        tab = self.tableau_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.6)
        self.lire(tab, 1, 1, {"ligne": "La ligne", "colonne": "la colonne", "valeur": "7 tortues"}, 1.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        tab = self.tableau_pret()
        lignes = self.finale([["Des lignes,", "des colonnes."],
                              ["La bonne ligne,", "la bonne colonne."],
                              ["Je lis là où", "elles se croisent."]])
        self.au_mot("des lignes")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), *teinter_ligne(tab, 2), run_time=0.5)
        self.au_mot("et des colonnes")
        self.play(*self.revenir(tab, [(2, k) for k in range(3)]), run_time=0.3)
        self.play(*teinter_colonne(tab, 0, BLEU_PALE), Create(lignes[0][0]), run_time=0.4)
        self.play(*self.revenir(tab, [(k, 0) for k in range(3)]), run_time=0.3)
        self.au_mot("la bonne ligne")
        fl = fleche_ligne(tab, 0, 2)
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), GrowArrow(fl), run_time=0.6)
        self.au_mot("la bonne colonne")
        fc = fleche_colonne(tab, 2, 0, BLEU_CALCUL)
        self.play(GrowArrow(fc), Create(lignes[1][0]), run_time=0.6)
        self.au_mot("je lis")
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("se croisent")
        self.play(*allumer(tab, 0, 2), Create(lignes[2][0]), run_time=0.5)
        self.insister(tab.texte_case(0, 2), 1.6, 0.25)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_remplir()
        self.ecran_lire()
        self.ecran_autre()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class StatsTableauLireCM1(StatsTableauLireBase):
    identite = "Maths CM1 — EleveAI"


class StatsTableauLireCM2(StatsTableauLireBase):
    """Même vidéo pour le CM2 : seule l'identité change."""

    identite = "Maths CM2 — EleveAI"
