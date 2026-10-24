# stats_filtre_sous_ensemble.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# LYCÉE : FILTRER DES DONNÉES AVEC UN CRITÈRE (micros du coach : 1re
# info_filtre_sous_ensemble, STMG don_filtre_sous_ensemble ; « Déterminer un
# sous-ensemble d'individus répondant à un critère »), AVEC VOIX.
# ÉPISODE COMMUN : 1re 14-filtre-sous-ensemble ⇄ STMG 13-filtre-sous-ensemble
# (une voix, un script, deux rendus ; la voix ne cite aucune classe).
# Paysage 16:9. CEINTURES : 1re ORANGE, STMG ORANGE (un seul critère : le
# premier geste du tableur, étoiles 1-2 ; relevé par le tableau croisé, le
# piège de la case unique et le filtre à retrouver). Short jumeau :
# stats_filtre_sous_ensemble_short.py (JAUNE).
#
# ⭐ Décor et métier : le CINÉMA (centre d'intérêt : cinema-series) ; un
# PROGRAMMATEUR DE CINÉMA prépare une soirée « films longs » (problématique :
# sélectionner, choisir).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 :
#   · les 10 films les plus vus en France en 2024 (bilan annuel du CNC, AFP,
#     5/01/2025, https://www.cbnews.fr/etudes/frequentation-cine-2024-exception-mondiale-avec-181-millions-entrees-france) :
#     Un p'tit truc en plus, Le Comte de Monte-Cristo, Vice-versa 2, Vaiana 2,
#     L'Amour ouf, Moi, moche et méchant 4, Dune : deuxième partie, Deadpool &
#     Wolverine, Gladiator II, La Planète des singes : le nouveau royaume ;
#   · durées (min), infobox des articles de fr.wikipedia.org consultés le
#     24/10/2026 : 99 · 178 · 93 · 90 · 161 (durée CNC) · 95 · 166 · 127 · 148 · 145 ;
#   · animation : Vice-versa 2, Vaiana 2, Moi, moche et méchant 4 ; films
#     français : Un p'tit truc en plus, Monte-Cristo, L'Amour ouf.
#   Filtres : Durée (min) ≥ 140 → 5 · Animation = Oui → 3 · Durée (min) < 100 → 4 ·
#   Français = Non → 7 · Durée (min) ≥ 150 → 3 ; short : ≥ 120 → 6. Aucune durée
#   n'est égale à un seuil. Tableau croisé : Animation/Français 0 · 3 ;
#   Pas d'animation 3 · 4 ; totaux 3, 7 et 10.
# ⭐ Figures du coach : `tableau_donnees` (canvasFichier : le fichier, une
# ligne = un film) et le tableau croisé avec ses marges (canvasCroise / canvasTableau).
# ⛔ PAS D'ÉCART : chaque nombre au mot. Les filtres s'écrivent comme au tableur.
#
# Mapping micro → écrans : info_filtre_sous_ens_fichier → 03, 04, question 05 ·
# info_filtre_sous_ens_croise / STMG tpl_1 (une marge) → 06, 07 ·
# info_filtre_sous_ens_retrouver / STMG tpl_2 → question 08 · défi 09.
# Écrans : 00 garde · 01 le programmateur · 02 le fichier · 03 Durée (min) ≥ 140
# · 04 Animation = Oui · 05 QUESTION · 06 le tableau croisé · 07 le piège (une
# case) · 08 QUESTION (retrouver le filtre) · 09 défi · 09b correction · 10 ce
# que tu as appris · 11 fin (règle du 19/10).
#
# Voix : manim/voix/lycee-stats-filtre-sous-ensemble.json (débit −7) ; marques :
# manim/scripts/stmg/stats_filtre_sous_ensemble_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_filtre_sous_ensemble.py StatsFiltreSousEnsemblePremiere -o eleveai-maths-premiere-commun-stats-filtre-sous-ensemble --media_dir manim/scripts/stmg/media-stats-filtre-sous-ensemble-1re
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_filtre_sous_ensemble.py StatsFiltreSousEnsembleStmg -o eleveai-maths-stmg-stats-filtre-sous-ensemble --media_dir manim/scripts/stmg/media-stats-filtre-sous-ensemble-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/14-filtre-sous-ensemble/eleveai-maths-premiere-commun-stats-filtre-sous-ensemble.mp4
#           manim/sorties/stmg/maths/statistiques/13-filtre-sous-ensemble/eleveai-maths-stmg-stats-filtre-sous-ensemble.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403

FILMS = ["Un p'tit truc en plus", "Monte-Cristo", "Vice-versa 2", "Vaiana 2", "L'Amour ouf", "Moi, moche… 4",
         "Dune 2", "Deadpool & Wolverine", "Gladiator II", "Planète des singes"]
DUREE = [99, 178, 93, 90, 161, 95, 166, 127, 148, 145]
ANIM = ["Non", "Non", "Oui", "Oui", "Non", "Oui", "Non", "Non", "Non", "Non"]
FRA = ["Oui", "Oui", "Non", "Non", "Oui", "Non", "Non", "Non", "Non", "Non"]
N = len(FILMS)
LONGS = [i for i in range(N) if DUREE[i] >= 140]       # 1, 4, 6, 8, 9
ANIMES = [i for i in range(N) if ANIM[i] == "Oui"]     # 2, 3, 5
COURTS = [i for i in range(N) if DUREE[i] < 100]       # 0, 2, 3, 5


def clap(l=1.5):
    """Un clap de cinéma : la planche et sa barre rayée."""
    corps = Rectangle(width=l, height=l * 0.62, fill_color="#1e293b", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=3)
    barre = Rectangle(width=l, height=l * 0.18, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    barre.next_to(corps, UP, buff=0.04).rotate(0.25, about_point=corps.get_corner(UL) + UP * 0.04)
    raies = VGroup(*[Polygon(P(0, 0), P(l * 0.1, 0), P(l * 0.18, l * 0.18), P(l * 0.08, l * 0.18),
                             fill_color=NUIT, fill_opacity=1, stroke_width=0) for _ in range(4)])
    raies.arrange(RIGHT, buff=l * 0.12).move_to(barre).rotate(0.25, about_point=corps.get_corner(UL) + UP * 0.04)
    return VGroup(corps, barre, raies)


class StatsFiltreSousEnsembleBase(PaysageH2):
    nom_voix = "lycee-stats-filtre-sous-ensemble"
    fichier_marques = "stats_filtre_sous_ensemble_marques.json"
    XL = 1.55

    def tableur(self):
        tb = fichier("Film", FILMS, ["Durée (min)", "Animation", "Français"],
                     [[DUREE[i], ANIM[i], FRA[i]] for i in range(N)], fs=24, largeur_id=3.3,
                     largeurs=[1.65, 1.45, 1.35])
        return self.cadrer(tb, droite=1.3)

    def croise(self, fs=30, centre=None):
        cr = croise(["Animation", "Pas d'animation"], ["Français", "Étranger"], [[0, 3], [3, 4]], fs=fs,
                    largeur_case=1.75, largeur_libelle=3.1)
        return self.cadrer(cr, droite=1.3) if centre is None else cr.move_to(centre)

    def filtre(self, morceaux, y=2.95, fs=34):
        return self.col(barre_filtre(morceaux, fs), y)

    def garder(self, tb, rs, col=None):
        """Les lignes gardées : la case de la colonne testée s'allume (jaune)."""
        if col is None:
            return [a for r in rs for a in tb.allumer_ligne(r)]
        return [a for r in rs for a in tb.allumer_case(r, col)]

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Filtrer des données : un critère", self.identite, self.ceinture)
        tb = fichier("Film", FILMS[:5], ["Durée (min)"], [[d] for d in DUREE[:5]], fs=20, largeur_id=3.0)
        tb.scale_to_fit_height(2.6).move_to(P(-1.4, 0.05))
        ent = entonnoir(0.9).next_to(tb, RIGHT, buff=0.6)
        self.au_mot("Filtrer des données")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tb, shift=UP * 0.2),
                  run_time=0.7)
        self.au_mot("que garde un filtre")
        self.play(FadeIn(ent, shift=DOWN * 0.3), run_time=0.4)
        self.play(*masquer(tb, [0, 2, 3]), *self.garder(tb, [1, 4], 0), run_time=0.7)
        q = self.t("?", 80, ORANGE_RETENUE).next_to(ent, RIGHT, buff=0.3)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 01 : le programmateur ───────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        c = clap(1.8).move_to(P(-4.3, 1.4))
        ecran = RoundedRectangle(width=3.0, height=1.7, corner_radius=0.1, fill_color="#0b1220", fill_opacity=1,
                                 stroke_color=GREY_B, stroke_width=4).move_to(P(-1.6, 1.5))
        self.au_mot("Un programmateur de cinéma")
        metier = self.bloc(["Programmateur", "de cinéma"], 42, BLEU_CALCUL).move_to(P(-3.0, -0.6))
        self.play(FadeIn(c, shift=DOWN * 0.3), FadeIn(ecran), FadeIn(metier, shift=UP * 0.2), run_time=0.7)
        self.au_mot("films longs")
        sl = self.t("Soirée films longs", 30, JAUNE_TITRE)
        sl.scale_to_fit_width(min(sl.width, ecran.width - 0.4)).move_to(ecran)
        self.play(Write(sl), run_time=0.6)
        self.au_mot("les 10 films")
        l1 = self.col(self.ligne([("Les", WHITE), ("10", AMBRE), ("films", WHITE)], 42), 2.3)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("les plus vus en France en 2024")
        l2 = self.col(self.ligne([("les plus vus en France", WHITE)], 36), 1.55)
        l3 = self.col(self.ligne([("en", WHITE), ("2024", AMBRE)], 40), 0.85)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), FadeIn(l3, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("d'après le CNC")
        l4 = self.col(self.bloc(["Source : le CNC,", "Centre national du cinéma"], 30, GREY_A), -0.3)
        self.play(FadeIn(l4, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le fichier ─────────────────────────────────────────────────────

    def ecran_fichier(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-fichier")
        tb = self.tableur()
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.6)
        self.au_mot("une ligne, c'est un film")
        l1 = self.col(self.ligne([("1 ligne", AMBRE), ("=", WHITE), ("1 film", WHITE)], 42), 2.5)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), *tb.allumer_ligne(1), run_time=0.5)
        self.play(*tb.eteindre(), run_time=0.3)
        for j, (mot, txt) in enumerate([("sa durée en minutes", "la durée (min)"), ("film d'animation", "animation ?"),
                                        ("s'il est français", "français ?")]):
            self.au_mot(mot)
            l = self.col(self.ligne([("•", AMBRE), (txt, WHITE)], 38), 1.4 - 0.85 * j)
            self.play(FadeIn(l, shift=RIGHT * 0.2), *tb.allumer_colonne(j), run_time=0.45)
            self.play(*tb.eteindre(), run_time=0.25)
        self.attendre_voix()

    # ── 03 : Durée (min) ≥ 140 ──────────────────────────────────────────────

    def ecran_duree(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-filtre-duree")
        tb = self.tableur()
        self.add(tb)
        self.au_mot("Il applique le filtre")
        f = self.filtre("Durée (min) ≥ 140")
        self.play(FadeIn(f, shift=DOWN * 0.2), run_time=0.5)
        self.play(Indicate(f.texte, color=AMBRE, scale_factor=1.12), run_time=0.5)
        self.au_mot("parcourt la colonne")
        fl = Arrow(tb.tetes[0].get_top() + UP * 0.25, tb.tetes[0].get_top(), buff=0, color=AMBRE, stroke_width=6)
        self.play(GrowArrow(fl), run_time=0.3)
        autres = [i for i in range(N) if i not in LONGS]
        self.play(LaggedStart(*[rang(tb, r).animate.set_opacity(0.16) for r in autres], lag_ratio=0.25),
                  fl.animate.shift(DOWN * (tb.tetes[0].get_y() - tb.cases[N - 1][0].get_y())), run_time=1.1)
        for r, mot in zip(LONGS, ["Le Comte de Monte-Cristo", "L'Amour ouf", "Dune", "Gladiator", "La Planète"]):
            self.au_mot(mot)
            self.play(*tb.allumer_case(r, 0), run_time=0.25)
            if r == 1:
                self.au_mot("178 minutes")
                self.play(Indicate(tb.texte_case(1, 0), color=AMBRE, scale_factor=1.6), run_time=0.4)
        self.au_mot("5 films")
        res = self.col(self.ligne([("→", WHITE), ("5", VERT_OK), ("films gardés", WHITE)], 44), 1.6)
        self.play(FadeIn(res, scale=0.7), FadeOut(fl), run_time=0.4)
        self.insister(res[1], 1.5, 0.25)
        self.au_mot("Les autres lignes sont masquées")
        m = self.col(self.bloc(["Les autres : masquées,", "pas effacées."], 38, ORANGE_RETENUE), 0.2)
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.5)
        self.play(*[rang(tb, r).animate.set_opacity(0.45) for r in autres], run_time=0.4)
        self.play(*[rang(tb, r).animate.set_opacity(0.16) for r in autres], run_time=0.4)
        self.attendre_voix()

    # ── 04 : Animation = Oui ────────────────────────────────────────────────

    def ecran_animation(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-filtre-animation")
        tb = self.tableur()
        self.add(tb)
        self.au_mot("une colonne de texte")
        l0 = self.col(self.t("Sur une colonne de texte :", 36), 2.45)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), *tb.allumer_colonne(1), run_time=0.5)
        self.play(*tb.eteindre(), run_time=0.3)
        self.au_mot("Animation égale Oui")
        f = self.filtre("Animation = Oui", y=1.6)
        autres = [i for i in range(N) if i not in ANIMES]
        self.play(FadeIn(f, shift=DOWN * 0.2), run_time=0.45)
        self.play(*masquer(tb, autres), run_time=0.8)
        for r, mot in zip(ANIMES, ["Vice-versa 2", "Vaiana 2", "Moi, moche"]):
            self.au_mot(mot)
            self.play(*tb.allumer_case(r, 1), run_time=0.25)
        self.au_mot("3 films")
        res = self.col(self.ligne([("→", WHITE), ("3", VERT_OK), ("films gardés", WHITE)], 44), 0.4)
        self.play(FadeIn(res, scale=0.7), run_time=0.4)
        self.insister(res[1], 1.5, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (Durée (min) < 100) ─────────────────────────────────

    def ecran_question1(self):
        tb = self.tableur()

        def reponse(s):
            s.play(*masquer(tb, [i for i in range(N) if i not in COURTS]), *self.garder(tb, COURTS, 0), run_time=0.6)

        self.ecran_question("05-question", "05b-reponse", ["Filtre « Durée (min) < 100 » :", "combien de lignes ?"],
                            ["4", "3", "6"], 0, ["99, 93, 90 et 95 : 4 films.", "3 oublie celui de 99 min,",
                                                 "6 compte les lignes masquées."],
                            figure=tb, autres_r=reponse, mot_q="Avec le filtre")

    # ── 06 : le tableau croisé ──────────────────────────────────────────────

    def ecran_croise(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-croise")
        cr = self.croise()
        self.au_mot("Le tableau croisé")
        self.play(FadeIn(cr, shift=UP * 0.2), run_time=0.6)
        self.au_mot("animation ou non")
        self.play(Indicate(cr.libelles[:2], color=AMBRE), run_time=0.5)
        self.au_mot("français ou non")
        self.play(Indicate(cr.tetes[:2], color=AMBRE), run_time=0.5)
        self.au_mot("garde une ligne entière")
        l1 = self.col(self.bloc(["Un seul critère :", "une ligne entière,"], 38), 2.4)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), *[a for c in range(3) for a in cr.allumer_case(1, c)], run_time=0.5)
        self.au_mot("ou une colonne entière")
        l2 = self.col(self.t("ou une colonne entière.", 38), 1.3)
        self.play(*cr.eteindre(), run_time=0.2)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), *[a for r in range(3) for a in cr.allumer_case(r, 0)], run_time=0.5)
        self.play(*cr.eteindre(), run_time=0.2)
        self.au_mot("Français égale Oui")
        f = self.filtre("Français = Oui", y=0.15)
        self.play(FadeIn(f, shift=DOWN * 0.2), *[a for r in range(2) for a in cr.allumer_case(r, 0)], run_time=0.5)
        self.au_mot("0 plus 3")
        s = self.col(self.ligne([("0", WHITE), ("+", WHITE), ("3", WHITE)], 46), -1.0)
        self.play(FadeIn(s, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 3")
        r = self.ligne([("=", WHITE), ("3", VERT_OK)], 46).next_to(s, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=1.4), *cr.allumer_case(2, 0, couleur="#bbf7d0", anneau=VERT_OK), run_time=0.4)
        self.insister(r[1], 1.5, 0.25)
        self.attendre_voix()

    # ── 07 : le piège (une seule case) ──────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        cr = self.croise()
        self.add(cr)
        self.au_mot("Le piège")
        tit = self.col(VGroup(self.t("Le piège :", 46, ROUGE_ERREUR), self.t("une seule case", 40, ROUGE_ERREUR)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.08), 2.85)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Animation égale Non")
        f = self.filtre("Animation = Non", y=1.6)
        self.play(FadeIn(f, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("seulement les 4 films")
        self.play(*cr.allumer_case(1, 1, couleur="#fecaca", anneau=ROUGE_ERREUR), run_time=0.4)
        faux = self.col(self.ligne([("4", ROUGE_ERREUR), ("seulement ?", WHITE)], 40), 0.6)
        self.play(FadeIn(faux, shift=RIGHT * 0.2), run_time=0.35)
        self.play(Create(croix(faux, sw=6)), run_time=0.3)
        self.au_mot("c'est toute la ligne")
        self.play(*cr.eteindre(), run_time=0.2)
        self.play(*[a for c in range(2) for a in cr.allumer_case(1, c)], run_time=0.4)
        self.au_mot("3 plus 4")
        s = self.col(self.ligne([("3", WHITE), ("+", WHITE), ("4", WHITE)], 46), -0.3)
        self.play(FadeIn(s, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 7 films")
        r = self.ligne([("=", WHITE), ("7", VERT_OK), ("films", WHITE)], 46).next_to(s, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=1.3), *cr.allumer_case(1, 2, couleur="#bbf7d0", anneau=VERT_OK), run_time=0.4)
        self.au_mot("donne un total")
        regle = self.col(self.bloc(["Un critère seul", "donne un total."], 40, VERT_OK), -1.5)
        self.play(FadeIn(regle, shift=UP * 0.2), run_time=0.45)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (retrouver le filtre) ───────────────────────────────

    def ecran_question2(self):
        tb = self.tableur()

        def reponse(s):
            s.play(*masquer(tb, [i for i in range(N) if i not in LONGS]), *self.garder(tb, LONGS, 0), run_time=0.6)

        cons = lambda txt: Text(txt, font="Consolas", font_size=32, color=WHITE)  # noqa: E731
        self.ecran_question("08-question", "08b-reponse", ["Un seul critère :", "il reste 5 lignes. Lequel ?"],
                            [cons("Animation = Oui"), cons("Durée (min) ≥ 140"), cons("Français = Oui")], 1,
                            ["A et C ne gardent", "que 3 films chacun."], figure=tb, autres_r=reponse,
                            mot_q="Un collègue")

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        self.add(self.tableur())
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 48, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Un : combien")
        q1 = self.col(VGroup(self.t("1. Combien de films ?", 36), barre_filtre("Français = Non", 30)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.15), 1.6)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : et le filtre")
        q2 = self.col(VGroup(self.t("2. Et avec ce filtre ?", 36), barre_filtre("Durée (min) ≥ 150", 30)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.15), -0.1)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -1.5)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        tb = self.tableur()
        self.add(tb)
        titre = self.col(self.t("Correction", 48, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.5)
        cr = croise(["Animation", "Pas d'anim."], ["Français", "Étranger"], [[0, 3], [3, 4]], fs=24,
                    largeur_case=1.2, largeur_libelle=2.0, hauteur=0.55)
        cr.scale_to_fit_height(1.5)
        self.col(cr, 1.65)
        self.au_mot("toute la colonne Non")
        self.play(FadeIn(cr, shift=RIGHT * 0.2), run_time=0.4)
        self.play(*[a for r in range(2) for a in cr.allumer_case(r, 1)], run_time=0.4)
        self.au_mot("3 plus 4")
        s = self.col(self.ligne([("1.", AMBRE), ("3", WHITE), ("+", WHITE), ("4", WHITE)], 40), 0.4)
        self.play(FadeIn(s, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("égale 7 films")
        r = self.ligne([("=", WHITE), ("7", VERT_OK), ("films", WHITE)], 40).next_to(s, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=1.3), *cr.allumer_case(2, 1, couleur="#bbf7d0", anneau=VERT_OK), run_time=0.4)
        self.au_mot("Deux : je parcours")
        self.play(*tb.allumer_colonne(0), run_time=0.4)
        self.play(*tb.eteindre(), run_time=0.2)
        l2 = self.col(self.ligne([("2.", AMBRE)], 40), -0.45)
        self.play(FadeIn(l2), run_time=0.2)
        vals = VGroup()
        for i, mot in zip([1, 4, 6], ["178", "161", "166"]):
            self.au_mot(mot)
            v = self.t(str(DUREE[i]), 40, AMBRE)
            v.next_to(vals if len(vals) else l2, RIGHT, buff=0.25)
            vals.add(v)
            self.play(FadeIn(v, scale=1.4), *tb.allumer_case(i, 0), run_time=0.3)
        self.au_mot("3 films seulement")
        r2 = self.col(self.ligne([("→", WHITE), ("3", VERT_OK), ("films seulement", WHITE)], 40), -1.3)
        self.play(FadeIn(r2, scale=0.7), *masquer(tb, [i for i in range(N) if i not in (1, 4, 6)]), run_time=0.5)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        tb = self.tableur()
        self.add(tb)
        lignes = self.finale_colonne(figure=tb, textes=[("Un filtre garde les lignes qui", "vérifient le critère ; les autres", "sont masquées, pas effacées."),
                                      ("Nombre : je compare au seuil ;", "texte : je teste l'égalité."),
                                      ("Tableau croisé : un critère", "seul = un total de ligne", "ou de colonne.")],
                                     fs=32)
        self.au_mot("Un filtre garde")
        self.montrer_ligne(lignes[0], *self.garder(tb, LONGS, 0))
        self.au_mot("Sur un nombre")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et dans un tableau croisé")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_fichier()
        self.ecran_duree()
        self.ecran_animation()
        self.ecran_question1()
        self.ecran_croise()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsFiltreSousEnsemblePremiere(StatsFiltreSousEnsembleBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"


class StatsFiltreSousEnsembleStmg(StatsFiltreSousEnsembleBase):
    """Même vidéo pour la STMG : identité et ceinture seulement."""

    identite = "Maths STMG — EleveAI"
    ceinture = "orange"
