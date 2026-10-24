# stats_tab_construire.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# épisode « DRESSER UN TABLEAU CROISÉ » à partir de données brutes (1re 06
# tab-construire, STMG 08 tab-dresser). Micros du coach : 1re info_tab_construire
# ⇄ STMG don_tab_dresser. AVEC VOIX. Paysage 16:9.
# CEINTURE VERTE dans les deux classes : la paysage complète du niveau (tableau
# vide, dépouillement, marges, contrôle, nombre de cases).
# Short jumeau : stats_tab_construire_short.py (blanche).
#
# ⭐ Décor et métier : la MUSIQUE ; un CHRONIQUEUR MUSICAL prépare une émission
# sur l'Eurovision (problématique : organiser, vérifier une impression).
# Données : les 8 vainqueurs de l'Eurovision de 2017 à 2025 (pas de concours en
# 2020), vérifiés le 24/10/2026 (eurovisionworld.com, officialcharts.com) :
# 2017 Salvador Sobral (Portugal, portugais, solo) · 2018 Netta (Israël, anglais,
# solo) · 2019 Duncan Laurence (Pays-Bas, anglais, solo) · 2021 Måneskin (Italie,
# italien, groupe) · 2022 Kalush Orchestra (Ukraine, ukrainien, groupe) · 2023
# Loreen (Suède, anglais, solo) · 2024 Nemo (Suisse, anglais, solo) · 2025 JJ
# (Autriche, anglais, solo). Loreen avait déjà gagné en 2012 (« Euphoria »,
# anglais, solo). Tableau : anglais 5 | 0 | 5 ; autre 1 | 2 | 3 ; total 6 | 2 | 8.
# Centres d'intérêt : musique.
#
# Mapping micro → écrans (banques 1re information-chiffree, STMG
# donnees-croisees) : compter une case dans un fichier (info_tab_construire_compter,
# don_tab_dresser_tpl_3) → 03, 05, question 1 · nombre de cases, avec ou sans
# marges (info_tab_construire_cases) → 02, défi · marges et contrôle
# (don_tab_dresser_tpl_1/2) → 06, piège, question 2.
# Écrans : 00 garde · 01 le chroniqueur, la liste · 02 le tableau vide (4 cases,
# 9 avec les totaux) · 03 le dépouillement (une coche par vainqueur) · 04
# question 1 · 05 compter les coches · 06 les marges, le contrôle · 07 le piège
# (la case 0) · 08 question 2 (on ajoute 2012) · 09 défi · 09b correction ·
# 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/lycee-stats-tab-construire.json (débit −7) ; calage :
# manim/scripts/stmg/stats_tab_construire_marques.json. UNE voix, DEUX rendus.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_tab_construire.py StatsTabConstruirePremiere -o eleveai-maths-premiere-commun-stats-tab-construire --media_dir manim/scripts/stmg/media-stats-tab-construire-premiere
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_tab_construire.py StatsTabConstruireStmg -o eleveai-maths-stmg-stats-tab-dresser --media_dir manim/scripts/stmg/media-stats-tab-dresser-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/06-tab-construire/
#           manim/sorties/stmg/maths/statistiques/08-tab-dresser/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403

LISTE = [("2017", "Salvador Sobral", "portugais", "solo"), ("2018", "Netta", "anglais", "solo"),
         ("2019", "Duncan Laurence", "anglais", "solo"), ("2021", "Måneskin", "italien", "groupe"),
         ("2022", "Kalush Orchestra", "ukrainien", "groupe"), ("2023", "Loreen", "anglais", "solo"),
         ("2024", "Nemo", "anglais", "solo"), ("2025", "JJ", "anglais", "solo")]
LANGUES = ["Anglais", "Autre langue", "Total"]
FORMATS = ["Solo", "Groupe", "Total"]
PLEIN = [[5, 0, 5], [1, 2, 3], [6, 2, 8]]


def case_de(langue, fmt):
    """La case (ligne, colonne) du tableau croisé pour un vainqueur."""
    return (0 if langue == "anglais" else 1, 0 if fmt == "solo" else 1)


def note(h=0.8):
    """Une double croche (la musique)."""
    tetes = VGroup(*[Ellipse(width=0.3 * h, height=0.22 * h, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                     .rotate(0.4).move_to(P(dx * h, 0)) for dx in (0, 0.55)])
    hampes = VGroup(*[Line(P((dx + 0.13) * h, 0.03 * h), P((dx + 0.13) * h, 0.8 * h), color=WHITE, stroke_width=5)
                      for dx in (0, 0.55)])
    barre = Polygon(P(0.13 * h, 0.8 * h), P(0.68 * h, 0.9 * h), P(0.68 * h, 0.75 * h), P(0.13 * h, 0.65 * h),
                    fill_color=WHITE, fill_opacity=1, stroke_width=0)
    return VGroup(tetes, hampes, barre)


class StatsTabConstruireBase(PaysageLycee):
    nom_voix = "lycee-stats-tab-construire"
    fichier_marques = "stats_tab_construire_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
    XL = 0.7

    def liste(self, zone=(-6.6, -0.2, -3.35, 3.1)):
        court = {"Salvador Sobral": "S. Sobral", "Duncan Laurence": "D. Laurence", "Kalush Orchestra": "Kalush"}
        rangs = [[court.get(n, n), l, f] for _, n, l, f in LISTE]
        t = Tableau(["Vainqueur", "Langue", "Format"], rangs, libelles=[a for a, *_ in LISTE], coin="Année",
                    largeur_case=1.85, largeur_libelle=1.0, hauteur=0.62, fs=28, titre="Eurovision : les vainqueurs")
        return caser(textes_devant(t), *zone)

    def croise(self, lignes=None, zone=(0.55, 6.55, -0.9, 2.95), titre="Langue × format"):
        lignes = lignes or [[None] * 3 for _ in range(3)]
        t = Tableau(FORMATS, lignes, libelles=LANGUES, coin="", largeur_case=1.45, largeur_libelle=2.3,
                    hauteur=0.8, fs=28, titre=titre)
        return caser(textes_devant(t), *zone)

    def trait_coche(self, t, r, c, k):
        """La k-ième coche (trait vertical) de la case (r, c)."""
        case = t.case(r, c)
        h = case.height * 0.5
        x = case.get_left()[0] + case.width * (0.2 + 0.13 * k)
        return Line(P(x, case.get_center()[1] - h / 2), P(x, case.get_center()[1] + h / 2), color=NUIT,
                    stroke_width=5).set_z_index(6)

    def coches(self, t):
        """Toutes les coches du dépouillement, dans l'ordre de la liste."""
        compte, out = {}, []
        for _, _, l, f in LISTE:
            rc = case_de(l, f)
            k = compte.get(rc, 0)
            compte[rc] = k + 1
            out.append(self.trait_coche(t, *rc, k))
        return out

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Dresser un tableau croisé", self.identite, self.ceinture)
        li = self.liste(zone=(-5.6, -1.6, -1.9, 1.7))
        cr = self.croise(zone=(0.4, 4.2, -1.3, 1.1), titre=None)
        fl = Arrow(P(-1.4, -0.1), P(0.2, -0.1), buff=0, color=AMBRE, stroke_width=7)
        self.au_mot("Dresser un tableau croisé")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.6)
        self.au_mot("Une liste en vrac")
        self.play(FadeIn(li, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("comment la ranger")
        self.play(GrowArrow(fl), FadeIn(cr, shift=LEFT * 0.2), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : le chroniqueur, la liste ───────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Un chroniqueur musical")
        n = note(1.0).move_to(P(3.2, 2.3))
        metier = self.col(self.t("Chroniqueur musical", 44, BLEU_CALCUL), 1.1)
        self.play(FadeIn(n, shift=UP * 0.3), FadeIn(metier, shift=UP * 0.2), run_time=0.6)
        self.au_mot("l'Eurovision")
        ev = self.col(self.t("une émission sur l'Eurovision", 36), 0.35)
        self.play(FadeIn(ev), run_time=0.4)
        self.au_mot("les 8 vainqueurs")
        li = self.liste()
        self.play(FadeIn(li, shift=RIGHT * 0.2), run_time=0.7)
        huit = self.col(self.ligne([("8", JAUNE_TITRE), ("vainqueurs", WHITE)], 40), -0.55)
        self.play(FadeIn(huit, scale=0.7), run_time=0.4)
        self.au_mot("pas eu lieu en 2020")
        pas = self.col(self.t("2020 : pas de concours", 32, GREY_A), -1.25)
        self.play(FadeIn(pas), Indicate(VGroup(li.libelles[2], li.libelles[3]), color=AMBRE), run_time=0.6)
        self.au_mot("la langue de la chanson")
        self.play(*teinter_colonne(li, 1), run_time=0.5)
        self.au_mot("et le format")
        self.play(*teinter_colonne(li, 2, BLEU_PALE), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le tableau vide ────────────────────────────────────────────────

    def ecran_structure(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-structure")
        li = self.liste()
        cr = self.croise()
        self.add(li)
        self.au_mot("le tableau vide")
        self.play(FadeIn(cr, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("En ligne, la langue")
        self.play(Indicate(VGroup(*cr.libelles[:2]), color=AMBRE), *teinter_colonne(li, 1), run_time=0.6)
        self.au_mot("En colonne, le format")
        self.play(Indicate(VGroup(*cr.tetes[:2]), color=BLEU_CALCUL), *teinter_colonne(li, 2, BLEU_PALE),
                  run_time=0.6)
        self.au_mot("2 lignes fois 2 colonnes")
        c1 = self.col(self.ligne([("2 × 2 =", WHITE), ("4", VERT_OK), ("cases", WHITE)], 40), -1.55)
        self.play(FadeIn(c1, shift=RIGHT * 0.2), *teinter(cr, [(0, 0), (0, 1), (1, 0), (1, 1)], PALE), run_time=0.6)
        self.au_mot("Avec la ligne et la colonne des totaux")
        bords = [(r, 2) for r in range(3)] + [(2, c) for c in range(2)]
        self.play(*teinter(cr, bords, "#bbf7d0"), run_time=0.5)
        self.au_mot("3 fois 3")
        c2 = self.col(self.ligne([("3 × 3 =", WHITE), ("9", VERT_OK), ("cases", WHITE)], 40), -2.35)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(c2[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 03 : le dépouillement ───────────────────────────────────────────────

    def ecran_depouiller(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-depouiller")
        li = self.liste()
        cr = self.croise()
        self.add(li, cr)
        traits = self.coches(cr)
        mots = ["2017, Salvador Sobral", "2018, Netta", "2019, Duncan Laurence", "2021, Måneskin",
                "2022, Kalush Orchestra", "Puis Loreen"]
        self.au_mot("une ligne à la fois")
        info = self.col(self.t("une coche par ligne", 36, AMBRE), -1.6)
        self.play(FadeIn(info), run_time=0.4)
        for k, mot in enumerate(mots):
            self.au_mot(mot)
            rangs = [k] if k < 5 else [5, 6, 7]
            anims = []
            for r in rangs:
                anims += teinter_ligne(li, r)
            self.play(*eteindre(li), run_time=0.15)
            self.play(*anims, run_time=0.3)
            if k == 0:
                self.au_mot("Une coche dans la case")
                self.play(*allumer(cr, 1, 0), run_time=0.3)
            self.play(LaggedStart(*[Create(traits[r]) for r in rangs], lag_ratio=0.4), run_time=0.4 * len(rangs))
            if k == 0:
                self.play(*eteindre(cr), run_time=0.2)
        self.play(*eteindre(li), run_time=0.3)
        self.attendre_voix()

    # ── 04 : question 1 (compter une case) ──────────────────────────────────

    def croise_gauche(self, lignes=None):
        return self.croise(lignes, zone=(-6.6, 0.3, -2.6, 2.6))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cr = self.croise_gauche()
        traits = self.coches(cr)
        self.add(cr, *traits)
        self.question_pause("04-question", "04b-reponse", ["Combien de coches dans", "la case anglais, solo ?"],
                            ["5", "6", "8"], 0, ["Netta, Duncan, Loreen, Nemo, JJ", "6 : tous les solos ; 8 : tous"],
                            x0=self.XL + 0.25, largeur=5.0, ys=(0.95, 0.0, -0.95),
                            avant=lambda: self.play(*allumer(cr, 0, 0), run_time=0.4))

    # ── 05 : compter les coches ─────────────────────────────────────────────

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-compter")
        li = self.liste()
        cr = self.croise()
        traits = self.coches(cr)
        self.add(li, cr, *traits)
        par_case = {}
        for (_, _, l, f), tr in zip(LISTE, traits):
            par_case.setdefault(case_de(l, f), []).append(tr)
        self.au_mot("Je compte les coches")
        t0 = self.col(self.t("Je compte", 40, JAUNE_TITRE), -1.5)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), run_time=0.4)
        for (r, c), mot in [((0, 0), "Anglais et solo : 5"), ((0, 1), "j'écris 0"), ((1, 0), "Autre langue et solo : 1"),
                            ((1, 1), "Autre langue et groupe : 2")]:
            self.au_mot(mot)
            vieux = VGroup(*par_case.get((r, c), []))
            anims = [remplir(cr, r, c, PLEIN[r][c]), *allumer(cr, r, c)]
            if len(vieux):
                anims.append(FadeOut(vieux, scale=0.6))
            self.play(*anims, run_time=0.5)
            if (r, c) == (0, 1):
                self.insister(cr.cases[0][1], 1.4, 0.25)
        self.attendre_voix()

    # ── 06 : les marges, le contrôle ────────────────────────────────────────

    def ecran_marges(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-marges")
        li = self.liste()
        base = [[5, 0, None], [1, 2, None], [None, None, None]]
        cr = self.croise(base)
        self.add(li, cr)
        self.au_mot("Enfin, les marges")
        t0 = self.col(self.t("Les marges", 40, JAUNE_TITRE), -1.35)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), run_time=0.4)
        etapes = [("Anglais : 5 plus 0", (0, 2), "5 + 0 = 5"), ("Autre langue : 1 plus 2", (1, 2), "1 + 2 = 3"),
                  ("Solo : 5 plus 1", (2, 0), "5 + 1 = 6"), ("Groupe : 0 plus 2", (2, 1), "0 + 2 = 2")]
        calc = None
        for mot, (r, c), txt in etapes:
            self.au_mot(mot)
            neuf = self.col(self.t(txt, 40), -2.1)
            anims = [remplir(cr, r, c, PLEIN[r][c]), *allumer(cr, r, c)]
            anims.append(FadeIn(neuf, shift=UP * 0.15) if calc is None else ReplacementTransform(calc, neuf))
            self.play(*eteindre(cr), run_time=0.15)
            self.play(*anims, run_time=0.45)
            calc = neuf
        self.au_mot("Et le total : 8")
        self.play(*eteindre(cr), run_time=0.15)
        self.play(remplir(cr, 2, 2, 8), *allumer(cr, 2, 2), FadeOut(calc), run_time=0.45)
        self.au_mot("comme les 8 vainqueurs")
        ctrl = VGroup(self.ligne([("8", VERT_OK), ("= les 8 lignes de la liste", WHITE)], 34),
                      self.coche(VERT_OK, 0.28)).arrange(RIGHT, buff=0.2)
        self.col(ctrl, -2.1)
        self.play(FadeIn(ctrl[0]), Indicate(VGroup(*li.libelles), color=VERT_OK, scale_factor=1.1), run_time=0.7)
        self.au_mot("Personne n'est oublié")
        self.play(Create(ctrl[1]), run_time=0.4)
        self.attendre_voix()

    # ── 07 : le piège (la case 0) ───────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        cr = self.croise_gauche(PLEIN)
        self.add(cr)
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.1)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("la case vide")
        vide = self.col(self.ligne([("une case", WHITE), ("vide", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 42), 2.2)
        self.play(FadeIn(vide, shift=RIGHT * 0.2), *allumer(cr, 0, 1), run_time=0.5)
        self.au_mot("personne")
        self.insister(cr.cases[0][1], 1.4, 0.3)
        self.au_mot("On écrit 0")
        zero = self.col(self.ligne([("on écrit", WHITE), ("0", VERT_OK)], 46), 1.3)
        self.play(FadeIn(zero, scale=0.7), Create(croix(vide[1], sw=6)), run_time=0.5)
        self.au_mot("croit à un oubli")
        oubli = self.col(self.t("sinon : un oubli ?", 34, GREY_A), 0.55)
        self.play(FadeIn(oubli), run_time=0.4)
        self.au_mot("on contrôle toujours")
        self.play(*eteindre(cr), run_time=0.2)
        self.play(*allumer(cr, 2, 2), run_time=0.4)
        regle = self.col(self.bloc(["total général =", "nombre de lignes"], 40, AMBRE), -0.6)
        self.play(FadeIn(regle, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(regle, 1.1, 0.3)
        self.attendre_voix()

    # ── 08 : question 2 (on ajoute 2012) ────────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        cr = self.croise_gauche(PLEIN)
        self.add(cr)

        def ajouter():
            self.play(remplir(cr, 0, 0, 6), *allumer(cr, 0, 0), run_time=0.5)

        self.question_pause("08-question", "08b-reponse", ["Loreen, 2012 : anglais, solo.", "La case anglais, solo ?"],
                            ["6", "5", "9"], 0, ["5 + 1 = 6", "B : coche oubliée ; 9 : nouveau total"],
                            x0=self.XL + 0.25, largeur=5.0, ys=(0.95, 0.0, -0.95), geste=ajouter)

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("trois formats")
        mods = VGroup(self.ligne([("Langue :", AMBRE), ("anglais, autre", WHITE)], 40),
                      self.ligne([("Format :", BLEU_CALCUL), ("solo, duo, groupe", WHITE)], 40))
        mods.arrange(DOWN, aligned_edge=LEFT, buff=0.4)
        caser(mods, -6.4, -0.3, -1.0, 1.5)
        self.play(FadeIn(mods, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Un : combien de cases")
        q1 = self.col(self.bloc(["1. Combien de cases", "sans les totaux ?"], 38), 1.7)
        q1[0][:2].set_color(AMBRE)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : et avec")
        q2 = self.col(self.bloc(["2. Et avec les", "totaux ?"], 38), 0.35)
        q2[0][:2].set_color(AMBRE)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(VGroup(icone_pause(0.36), self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE))
                         .arrange(RIGHT, buff=0.2), -1.0)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        t = Tableau(["Solo", "Duo", "Groupe", "Total"], [[None] * 4 for _ in range(3)], libelles=LANGUES, coin="",
                    largeur_case=1.25, largeur_libelle=2.2, hauteur=0.8, fs=26, titre="Langue × 3 formats")
        caser(textes_devant(t), -6.6, 0.2, -2.2, 2.2)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), FadeIn(t), run_time=0.6)
        self.au_mot("2 lignes fois 3 colonnes")
        c1 = self.col(self.ligne([("1.", AMBRE), ("2 × 3 =", WHITE)], 42), 1.7)
        dedans = [(r, c) for r in range(2) for c in range(3)]
        self.play(FadeIn(c1, shift=RIGHT * 0.2), *teinter(t, dedans, PALE), run_time=0.6)
        self.au_mot("égale 6 cases")
        r1 = self.ligne([("6", VERT_OK), ("cases", WHITE)], 42).next_to(c1, RIGHT, buff=0.25)
        nums = VGroup(*[texte(k + 1, 26, GREY_D).move_to(t.case(r, c)) for k, (r, c) in enumerate(dedans)])
        self.play(FadeIn(r1, scale=0.7), LaggedStart(*[FadeIn(n, scale=1.5) for n in nums], lag_ratio=0.15),
                  run_time=0.9)
        self.au_mot("3 lignes fois 4 colonnes")
        c2 = self.col(self.ligne([("2.", AMBRE), ("3 × 4 =", WHITE)], 42), 0.6)
        bords = [(r, 3) for r in range(3)] + [(2, c) for c in range(3)]
        self.play(FadeIn(c2, shift=RIGHT * 0.2), *teinter(t, bords, "#bbf7d0"), run_time=0.6)
        self.au_mot("égale 12 cases")
        r2 = self.ligne([("12", VERT_OK), ("cases", WHITE)], 42).next_to(c2, RIGHT, buff=0.25)
        nums2 = VGroup(*[texte(k + 7, 26, GREY_D).move_to(t.case(r, c)) for k, (r, c) in enumerate(bords)])
        self.play(FadeIn(r2, scale=0.7), LaggedStart(*[FadeIn(n, scale=1.5) for n in nums2], lag_ratio=0.15),
                  run_time=0.9)
        self.insister(r2[0], 1.4, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        cr = self.croise_gauche(PLEIN)
        self.add(cr)
        lignes = self.finale([("Le tableau vide :", "une ligne, une colonne"), ("Une coche par individu,", "dans sa case"),
                              ("Les marges, et le contrôle :", "total = nombre d'individus")], [1.75, 0.15, -1.45])
        self.au_mot("D'abord le tableau vide")
        self.montrer_ligne(lignes[0], Indicate(VGroup(*cr.libelles[:2], *cr.tetes[:2]), color=AMBRE))
        self.au_mot("Puis une coche")
        self.montrer_ligne(lignes[1], *teinter(cr, [(0, 0), (0, 1), (1, 0), (1, 1)], PALE))
        self.au_mot("Enfin les marges")
        self.montrer_ligne(lignes[2], *allumer(cr, 2, 2))
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_structure()
        self.ecran_depouiller()
        self.ecran_question1()
        self.ecran_compter()
        self.ecran_marges()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsTabConstruirePremiere(StatsTabConstruireBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"


class StatsTabConstruireStmg(StatsTabConstruireBase):
    """Même vidéo pour la STMG (micro don_tab_dresser)."""

    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
