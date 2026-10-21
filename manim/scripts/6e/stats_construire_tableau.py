# stats_construire_tableau.py
# EleveAI — Maths 6e — série « Statistiques », épisode 03 : CONSTRUIRE UN
# TABLEAU D'EFFECTIFS (micro du coach : stat_construire_tableau, banque
# 6e/maths/donnees.bank.ts, canvas `tableau_donnees`), AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE : passer d'une liste en vrac à un tableau
# (un trait par donnée, on compte, on VÉRIFIE que la somme = le total), puis
# un défi où l'effectif manquant se trouve par le total. Short jumeau :
# stats_construire_tableau_short.py (jaune).
#
# ⭐ Décor et métier : la BIODIVERSITÉ, une ravine du Parc national de La
# Réunion ; une ORNITHOLOGUE note 25 oiseaux un par un (tec-tec, oiseau blanc,
# merle péi, papangue, oiseau de la Vierge).
# ⭐ La figure est CELLE DU COACH (canvas_stats.Tableau = `tableau_donnees`) :
# une ligne par espèce, une colonne « Traits » où chaque oiseau de la liste
# devient un trait (le 5e barre les quatre autres), une colonne « Effectif »,
# une ligne « Total ».
# ⛔ PAS D'ÉCART : chaque effectif s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 l'ornithologue, la ravine · 02 la liste en vrac (25)
# · 03 le tableau : un trait par oiseau · 04 on compte (7, 9, 5, 1, 3) ·
# 05 je vérifie (7 + 9 + 5 + 1 + 3 = 25) · 06 le piège (compter deux fois, en
# oublier un) · 07 défi (20 oiseaux) · 07b correction (6 + 8 + 2 = 16 ;
# 20 − 16 = 4) · 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/6e-stats-construire-tableau.json (débit −10), WAV dans
# public/sons/6e-stats-construire-tableau/ ; calage mot à mot :
# manim/scripts/6e/stats6_construire_tableau_marques.json (marques WinRT,
# même moteur et même SSML que scripts/generer-voix.ps1, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/6e/stats_construire_tableau.py StatsConstruireTableau6e -o eleveai-maths-6e-stats-construire-tableau --media_dir manim/scripts/6e/media-stats-construire-tableau
# Sortie : manim/sorties/6e/maths/statistiques/03-construire-tableau/

import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from stats_tableau_commun import *  # noqa: E402,F403
from stats_tableau_commun import P, BaseTableauPaysage  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, NUIT, ORANGE_Q, Tableau  # noqa: E402

ESPECES = ["Tec-tec", "Oiseau blanc", "Merle péi", "Papangue", "Oiseau de la Vierge"]
MOTS_LISTE = ["tec-tec", "oiseau blanc", "merle péi", "papangue", "oiseau de la Vierge"]
EFFECTIFS = [7, 9, 5, 1, 3]
COUL_OISEAU = ["#a8a29e", "#bef264", "#94a3b8", "#b45309", "#fb923c"]


def liste_en_vrac():
    """Les 25 oiseaux dans l'ordre où elle les note : tec-tec, oiseau blanc,
    tec-tec, merle péi (comme la voix), puis le reste mélangé (graine fixe)."""
    debut = [0, 1, 0, 2]
    reste = []
    for i, n in enumerate(EFFECTIFS):
        reste += [i] * (n - debut.count(i))
    random.Random(7).shuffle(reste)
    return debut + reste


ORDRE = liste_en_vrac()


def oiseau(couleur, s=1.0):
    """Un petit oiseau de profil : corps, tête, bec, aile, queue."""
    corps = Ellipse(width=0.6 * s, height=0.36 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.14 * s, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0.28 * s, 0.14 * s))
    oeil = Dot(P(0.32 * s, 0.17 * s), radius=0.025 * s, color=BLACK)
    bec = Triangle(fill_color="#facc15", fill_opacity=1, stroke_width=0).scale(0.06 * s).rotate(-PI / 2)
    bec.move_to(P(0.45 * s, 0.13 * s))
    aile = Ellipse(width=0.32 * s, height=0.16 * s, fill_color=BLACK, fill_opacity=0.25, stroke_width=0)
    aile.move_to(P(-0.02 * s, 0.02 * s)).rotate(0.3)
    queue = Polygon(P(-0.28 * s, 0.02 * s), P(-0.55 * s, 0.12 * s), P(-0.55 * s, -0.08 * s), fill_color=couleur,
                    fill_opacity=1, stroke_width=0)
    return VGroup(queue, corps, aile, tete, oeil, bec)


def ravine(s=1.0):
    gauche = Polygon(P(-3.0 * s, -1.2 * s), P(-3.0 * s, 1.0 * s), P(-1.6 * s, 0.6 * s), P(-0.35 * s, -1.2 * s),
                     fill_color="#166534", fill_opacity=1, stroke_width=0)
    droite = Polygon(P(3.0 * s, -1.2 * s), P(3.0 * s, 1.2 * s), P(1.4 * s, 0.7 * s), P(0.35 * s, -1.2 * s),
                     fill_color="#15803d", fill_opacity=1, stroke_width=0)
    eau = Polygon(P(-0.35 * s, -1.2 * s), P(0.35 * s, -1.2 * s), P(0.1 * s, -0.4 * s), P(-0.1 * s, -0.4 * s),
                  fill_color="#38bdf8", fill_opacity=1, stroke_width=0)
    return VGroup(gauche, droite, eau)


def carnet(s=1.0):
    page = RoundedRectangle(width=1.6 * s, height=2.0 * s, corner_radius=0.1 * s, fill_color="#fef9c3",
                            fill_opacity=1, stroke_color="#a16207", stroke_width=3)
    lignes = VGroup(*[Line(P(-0.6 * s, (0.6 - 0.3 * k) * s), P(0.6 * s, (0.6 - 0.3 * k) * s), color="#cbd5e1",
                           stroke_width=2) for k in range(5)])
    return VGroup(page, lignes)


def baton(n_avant, cellule, couleur=NUIT):
    """Le trait n° n_avant+1 dans la case `cellule` (rectangle) : par paquets de 5,
    le 5e en travers des quatre premiers du paquet."""
    paquet, k = divmod(n_avant, 5)
    h = cellule.height * 0.56
    x0 = cellule.get_left()[0] + 0.22 + paquet * 0.95
    y = cellule.get_center()[1]
    if k < 4:
        x = x0 + k * 0.17
        t = Line(P(x, y - h / 2), P(x, y + h / 2), color=couleur, stroke_width=5)
    else:
        t = Line(P(x0 - 0.1, y - h / 2 + 0.05), P(x0 + 0.62, y + h / 2 - 0.05), color=couleur, stroke_width=5)
    return t.set_z_index(5)


class StatsConstruireTableau6e(BaseTableauPaysage):
    nom_voix = "6e-stats-construire-tableau"
    fichier_marques = "stats6_construire_tableau_marques.json"
    identite = "Maths 6e — EleveAI"
    XL = 1.95
    G = P(-2.7, -0.4)

    # ── le tableau d'effectifs, les traits, la liste ────────────────────────

    def tableau(self, effectifs=None, total=None):
        """Espèces en lignes (+ Total), colonnes Traits | Effectif (non ajouté)."""
        eff = effectifs or [None] * 5
        lignes = [[None, e] for e in eff] + [[None, total]]
        tab = Tableau(["Traits", "Effectif"], lignes, libelles=ESPECES + ["Total"], coin="Espèce", largeur_case=2.2,
                      largeur_libelle=3.4, hauteur=0.72, fs=28, titre="Oiseaux de la ravine", centre=self.G)
        return textes_devant(tab)

    def traits(self, tab):
        """Les 25 traits, dans l'ordre de la liste (non ajoutés)."""
        vus = [0] * 5
        res = []
        for i in ORDRE:
            res.append(baton(vus[i], tab.case(i, 0)))
            vus[i] += 1
        return VGroup(*res)

    def tableau_plein(self, avec_total=True):
        tab = self.tableau(EFFECTIFS, 25 if avec_total else None)
        tr = self.traits(tab)
        self.add(tab, tr)
        return tab, tr

    def nuage(self, s=1.0):
        """Les 25 mots de la liste en vrac : grille 5 × 5 secouée, mots penchés."""
        rnd = random.Random(3)
        mots = VGroup()
        for k, i in enumerate(ORDRE):
            t = Text(MOTS_LISTE[i], font_size=30, color=COUL_OISEAU[i])
            t.rotate(rnd.uniform(-0.35, 0.35))
            gx, gy = k % 5, k // 5
            t.move_to(P(-5.2 + gx * 2.6 + rnd.uniform(-0.5, 0.5), 2.2 - gy * 1.15 + rnd.uniform(-0.25, 0.25)))
            mots.add(t)
        return mots.scale(s)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        ti, ident, ech = self.garde("Construire un tableau", "orange")
        rnd = random.Random(5)
        vols = VGroup(*[oiseau(COUL_OISEAU[i], 0.45).move_to(P(rnd.uniform(-5.8, 4.6), rnd.uniform(-0.55, 1.75)))
                        for i in ORDRE])
        self.play(Write(ti), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.5)
        cap = self.t("25 oiseaux en vrac", 44).move_to(P(-0.6, -1.35))
        self.play(LaggedStart(*[FadeIn(o, scale=0.3) for o in vols], lag_ratio=0.04), FadeIn(cap, shift=UP * 0.2),
                  run_time=1.0)
        self.au_mot("Comment y voir clair")
        q = self.t("?", 90, ORANGE_RETENUE).move_to(P(5.3, 0.3))
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'ornithologue, la ravine ──────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        rv = ravine(1.2).move_to(P(-3.6, -0.6))
        metier = self.col(self.t("Ornithologue", 48, BLEU_CALCUL), 2.6, xl=1.2)
        self.play(FadeIn(rv, shift=UP * 0.3), FadeIn(metier, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("du Parc national")
        parc = self.col(self.t("Parc national de La Réunion", 34, VERT_OK), 1.85, xl=1.2)
        self.play(FadeIn(parc, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("les oiseaux")
        vols = VGroup(*[oiseau(COUL_OISEAU[i], 0.7).move_to(P(x, y)) for i, x, y in
                        ((0, -5.4, 1.5), (1, -3.9, 2.0), (2, -2.6, 1.3), (3, -4.6, 2.7), (4, -1.9, 2.4))])
        self.play(LaggedStart(*[FadeIn(o, shift=RIGHT * 0.5) for o in vols], lag_ratio=0.15), run_time=0.8)
        self.au_mot("Elle note")
        cn = carnet(1.3).move_to(P(2.6, -0.8))
        self.play(FadeIn(cn, shift=UP * 0.2), run_time=0.4)
        self.au_mot("un par un")
        notes = VGroup(*[Text(MOTS_LISTE[i], font_size=24, color=NUIT) for i in ORDRE[:4]])
        for k, n in enumerate(notes):
            n.move_to(cn[1][k].get_center() + UP * 0.12)
        self.play(LaggedStart(*[FadeIn(n, shift=RIGHT * 0.2) for n in notes], lag_ratio=0.5),
                  LaggedStart(*[Indicate(vols[i], scale_factor=1.3) for i in ORDRE[:4]], lag_ratio=0.5), run_time=1.6)
        self.attendre_voix()

    # ── 02 : la liste en vrac ───────────────────────────────────────────────

    def ecran_liste(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-liste")
        mots = self.nuage()
        self.au_mot("part dans tous les sens")
        self.play(FadeIn(mots[0], scale=1.5), run_time=0.3)
        for k, extrait in ((1, "oiseau blanc"), (2, "tec-tec, merle"), (3, "merle péi")):
            self.au_mot(extrait)
            self.play(FadeIn(mots[k], scale=1.5), run_time=0.25)
        self.play(LaggedStart(*[FadeIn(m, scale=0.5) for m in mots[4:]], lag_ratio=0.06), run_time=1.3)
        self.au_mot("25 oiseaux")
        cap = self.t("25 oiseaux en tout", 46, WHITE).set_stroke(BLACK, 8, background=True).move_to(P(-0.4, -3.2))
        self.play(FadeIn(cap, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Illisible")
        tampon = self.t("Illisible !", 80, ROUGE_ERREUR).set_stroke(BLACK, 8, background=True).rotate(0.15)
        self.play(FadeIn(tampon, scale=2.0), run_time=0.35)
        self.play(Wiggle(mots, scale_value=1.05), run_time=0.8)
        self.attendre_voix()

    # ── 03 : le tableau, un trait par oiseau ────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-tableau")
        mots = self.nuage()
        self.add(mots)
        tab = self.tableau()
        petit = mots.copy().scale_to_fit_width(4.6).move_to(P(4.3, 0.2))
        self.au_mot("un tableau d'effectifs")
        fond = VGroup(tab.carte, tab.titre, tab.coin, tab.tetes,
                      *[tab.case(r, c) for r in range(6) for c in range(2)])
        self.play(Transform(mots, petit), FadeIn(fond, scale=0.95), run_time=0.8)
        self.au_mot("une case par espèce")
        self.play(LaggedStart(*[FadeIn(lb, shift=RIGHT * 0.3) for lb in tab.libelles[:5]], lag_ratio=0.2),
                  run_time=1.0)
        self.play(FadeIn(tab.libelles[5]), run_time=0.3)
        self.au_mot("Pour chaque oiseau")
        tr = self.traits(tab)
        self.play(LaggedStart(*[AnimationGroup(mots[k].animate.set_opacity(0.15), Create(tr[k]))
                                for k in range(25)], lag_ratio=0.55), run_time=5.5)
        self.attendre_voix()

    # ── 04 : on compte les traits ───────────────────────────────────────────

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-compter")
        tab = self.tableau()
        tr = self.traits(tab)
        self.add(tab, tr)
        self.au_mot("Elle compte")
        self.play(Indicate(tab.tetes[1][1], color=AMBRE, scale_factor=1.3), run_time=0.4)
        noms = ["Tec-tec :", "Oiseau blanc", "Merle péi", "Papangue", "Oiseau de la Vierge"]
        nombres = ["7.", "9.", "5.", "1.", "3."]
        debut, carte = 0, None
        for i in range(5):
            self.au_mot(noms[i])
            mes_traits = VGroup(*[tr[k] for k in range(25) if ORDRE[k] == i])
            neuf = VGroup(oiseau(COUL_OISEAU[i], 1.3), self.t(ESPECES[i], 40, COUL_OISEAU[i]))
            neuf.arrange(DOWN, buff=0.3)
            self.col(neuf, 1.0)
            anims = teinter_ligne(tab, i) + ([FadeOut(carte)] if carte else [])
            if i > 0:
                anims += [tab.case(i - 1, c).animate.set_fill(tab._fonds[i - 1]) for c in range(2)]
            self.play(FadeIn(neuf, shift=UP * 0.2), *anims, run_time=0.3)
            carte = neuf
            self.play(LaggedStart(*[Indicate(t, color=AMBRE, scale_factor=1.4) for t in mes_traits], lag_ratio=0.15),
                      run_time=0.5)
            self.au_mot(nombres[i])
            nb = self.t(str(EFFECTIFS[i]), 72, VERT_OK).next_to(neuf, DOWN, buff=0.3)
            self.play(remplir(tab, i, 1, EFFECTIFS[i]), FadeIn(nb, scale=1.6), run_time=0.3)
            carte = VGroup(neuf, nb)
            debut += EFFECTIFS[i]
        self.play(*[tab.case(4, c).animate.set_fill(tab._fonds[4]) for c in range(2)], run_time=0.3)
        self.attendre_voix()

    # ── 05 : je vérifie ─────────────────────────────────────────────────────

    def ecran_verifie(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-verifie")
        tab, tr = self.tableau_plein(avec_total=False)
        titre = self.col(self.t("Elle vérifie", 46, JAUNE_TITRE), 2.6)
        self.play(Write(titre), *teinter_colonne(tab, 1), run_time=0.5)
        morceaux = VGroup(*[self.t(s, 50, c) for s, c in (("7", WHITE), ("+", WHITE), ("9", WHITE), ("+", WHITE),
                                                           ("5", WHITE), ("+", WHITE), ("1", WHITE), ("+", WHITE),
                                                           ("3", WHITE))]).arrange(RIGHT, buff=0.15)
        self.col(morceaux, 1.4)
        for k, extrait in enumerate(("7 plus", "9 plus", "5 plus", "1 plus", "3, égale")):
            self.au_mot(extrait)
            anims = [FadeIn(morceaux[2 * k], scale=1.5), Indicate(tab.texte_case(k, 1), color=AMBRE, scale_factor=1.4)]
            if k < 4:
                anims.append(FadeIn(morceaux[2 * k + 1]))
            self.play(*anims, run_time=0.3)
        self.au_mot("25.")
        egal = self.col(self.ligne([("=", WHITE), ("25", VERT_OK)], 56), 0.5)
        self.play(FadeIn(egal, shift=UP * 0.2), remplir(tab, 5, 1, 25), *allumer(tab, 5, 1), run_time=0.45)
        self.insister(egal[1], 1.4, 0.25)
        self.au_mot("Le total est juste")
        ok = self.col(VGroup(self.coche(VERT_OK, 0.3), self.t("Le total est juste", 40, VERT_OK))
                      .arrange(RIGHT, buff=0.3), -0.5)
        self.play(FadeIn(ok, scale=0.8), run_time=0.4)
        self.au_mot("aucun oiseau")
        aucun = self.col(self.bloc(["aucun oiseau", "oublié !"], 38), -1.5)
        self.play(FadeIn(aucun, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le piège, compter deux fois ou oublier ─────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        tab, tr = self.tableau_plein()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.6)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("compter deux fois")
        l1 = self.col(self.bloc(["compter deux fois", "le même oiseau"], 38, ORANGE_RETENUE), 1.55)
        de_trop = baton(EFFECTIFS[0], tab.case(0, 0), ROUGE_ERREUR)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Create(de_trop), *allumer(tab, 0, 0, couleur="#fecaca",
                                                                            anneau=ROUGE_ERREUR), run_time=0.5)
        self.play(Flash(de_trop, color=ROUGE_ERREUR), run_time=0.5)
        self.au_mot("ou en oublier un")
        l2 = self.col(self.bloc(["ou en oublier un"], 38, ORANGE_RETENUE), 0.5)
        k_merle = max(k for k in range(25) if ORDRE[k] == 2)
        oubli = DashedVMobject(tr[k_merle].copy().set_color(ROUGE_ERREUR), num_dashes=4)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), FadeOut(de_trop), *eteindre(tab), run_time=0.4)
        self.play(FadeOut(tr[k_merle]), FadeIn(oubli), *allumer(tab, 2, 0, couleur="#fecaca", anneau=ROUGE_ERREUR),
                  run_time=0.5)
        self.au_mot("La somme des effectifs")
        regle = self.col(self.bloc(["La somme des effectifs", "retombe sur le total"], 38, VERT_OK), -0.85)
        self.play(FadeOut(oubli), FadeIn(tr[k_merle]), *eteindre(tab), run_time=0.3)
        self.play(FadeIn(regle, shift=RIGHT * 0.2), *teinter(tab, [(r, 1) for r in range(5)], BLEU_PALE),
                  *allumer(tab, 5, 1), run_time=0.6)
        self.insister(tab.texte_case(5, 1), 1.5, 0.25)
        self.attendre_voix()

    # ── 07 : défi, 07b : correction ─────────────────────────────────────────

    def tableau_defi(self, valeurs=None):
        """Le lendemain : 4 espèces (pas d'oiseau de la Vierge), effectifs seuls."""
        tab = Tableau(["Effectif"], [[v] for v in (valeurs or [None] * 5)], libelles=ESPECES[:4] + ["Total"], coin="Espèce", largeur_case=2.2,
                      largeur_libelle=3.0, hauteur=0.8, fs=30, titre="Le lendemain", centre=P(-3.2, -0.2))
        return textes_devant(tab)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        tab = self.tableau_defi()
        self.add(tab)
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.55)
        self.play(Write(titre), run_time=0.5)
        for r, extrait, v in ((4, "20 oiseaux", 20), (0, "6 tec-tec", 6), (1, "8 oiseaux", 8), (3, "2 papangues", 2)):
            self.au_mot(extrait)
            self.play(remplir(tab, r, 0, v), *allumer(tab, r, 0), run_time=0.35)
        self.au_mot("et des merles")
        self.play(remplir(tab, 2, 0, "?"), *allumer(tab, 2, 0, anneau=ORANGE_Q), run_time=0.35)
        self.au_mot("Combien de merles")
        q = self.col(self.bloc(["Combien de", "merles péi ?"], 42), 1.2)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(tab.texte_case(2, 0), 1.5, 0.25)
        self.au_mot("Mets pause")
        pause = self.col(self.bloc(["Mets pause,", "et cherche !"], 40, ORANGE_RETENUE), -0.3)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        tab = self.tableau_defi([6, 8, "?", 2, 20])
        self.add(tab)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.55)
        self.play(Write(titre), run_time=0.5)
        c1 = self.col(self.ligne([("6", WHITE), ("+", WHITE), ("8", WHITE), ("+", WHITE), ("2", WHITE), ("=", WHITE),
                                  ("16", AMBRE)], 48, 0.18), 1.4)
        for extrait, idx, r in (("6 plus", [0, 1], 0), ("8 plus", [2, 3], 1), ("2, égale", [4, 5], 3)):
            self.au_mot(extrait)
            self.play(*[FadeIn(c1[j], scale=1.4) for j in idx], *allumer(tab, r, 0), run_time=0.3)
        self.au_mot("16.")
        self.play(FadeIn(c1[6], scale=1.5), run_time=0.3)
        c2 = self.col(self.ligne([("20", WHITE), ("−", WHITE), ("16", AMBRE), ("=", WHITE), ("4", VERT_OK)], 48, 0.18),
                      0.4)
        self.au_mot("20 moins")
        self.play(FadeIn(c2[:2], scale=1.4), *allumer(tab, 4, 0), run_time=0.3)
        self.au_mot("16, égale")
        self.play(FadeIn(c2[2:4], scale=1.4), run_time=0.3)
        self.au_mot("4 merles")
        res = self.col(self.t("4 merles péi", 44, VERT_OK), -0.6)
        self.play(FadeIn(c2[4], scale=1.6), remplir(tab, 2, 0, 4), *allumer(tab, 2, 0), FadeIn(res, shift=UP * 0.2),
                  run_time=0.45)
        self.play(Create(self.encadre(res)), run_time=0.35)
        self.insister(tab.texte_case(2, 0), 1.6, 0.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        tab, tr = self.tableau_plein()
        # le tableau rétrécit à gauche : les phrases gardent une taille lisible
        VGroup(tab, tr).scale(0.82).to_edge(LEFT, buff=0.2)
        self.XL = tab.get_right()[0] + 0.35
        lignes = self.finale([["Une case", "par catégorie."], ["Un trait par donnée,", "puis on compte."],
                              ["Somme des effectifs", "= total."]])
        self.au_mot("une case par catégorie")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), LaggedStart(*[Indicate(lb, color=AMBRE, scale_factor=1.08)
                                                                         for lb in tab.libelles[:5]], lag_ratio=0.15),
                  run_time=0.8)
        self.play(Create(lignes[0][0]), run_time=0.3)
        self.au_mot("un trait par donnée")
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), *teinter_colonne(tab, 0), run_time=0.5)
        self.au_mot("puis on compte")
        self.play(*teinter_colonne(tab, 1, BLEU_PALE), Create(lignes[1][0]), run_time=0.5)
        self.au_mot("Et on vérifie")
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), *allumer(tab, 5, 1), run_time=0.5)
        self.play(Create(lignes[2][0]), run_time=0.3)
        self.insister(tab.texte_case(5, 1), 1.5, 0.25)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_liste()
        self.ecran_tableau()
        self.ecran_compter()
        self.ecran_verifie()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
