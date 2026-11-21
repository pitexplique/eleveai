# entier_decomposer.py
# EleveAI — Maths 6e — série « Nombres entiers », épisode B4 : DÉCOMPOSER UN NOMBRE ENTIER
# (micro entier_decomposer, notion entier_nombre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (« 507 : 500 + 70 ou 500 + 7 ? », réponse B) — série `6e-entier`.
# Décor et métier : Ethan, GAME DESIGNER (centres : jeux-video, technologie-ia).
#
# Mapping micro → écrans : 02 (chaque chiffre vaut son chiffre fois son rang), 03 (un rang vide ne
# s'écrit pas : 507), 05 (composer, l'inverse, même en désordre), 07 (des nombres plus longs),
# questions 04 (décomposition de 706, C), 06 (500 + 90 + 3 + 8 000, B), 08 (55 140, A),
# défi 09 (le total de Rayan : 30 000 + 2 000 + 600 + 50 + 9).
# ⛔ Lot B : PAS de `aussi` → 2 lignes `notion_ressources`, en 6e.
#
# ✅ PASSE MATHS sur la voix, faite avant d'écrire (règle du 21/11) : 706 = 700 + 6 ;
#    8 000 + 500 + 90 + 3 = 8 593 (leurres 5 938 et 8 953) ; 10 000 + 100 + 20 + 4 = 10 124 ;
#    55 140 = 50 000 + 5 000 + 100 + 40 (leurres : 505 140 et 50 640) ;
#    30 000 + 2 000 + 600 + 50 + 9 = 32 659 ; 507 = 500 + 7 ; dans 352 le 5 vaut 5 × 10 = 50.
#    Les justifications aussi (« le 0 ne compte pas », « deux 5 : l'un vaut 50 000, l'autre 5 000 »).
#    → 0 écart.
#
# Voix : manim/voix/6e-entier-decomposer.json (validée le 21/11, Julie, débit −6) ;
# marques : manim/scripts/cm1/entier_6e_decomposer_marques.json.
# ⭐ Cette voix n'a AUCUN nombre à espace sans marque : aucun `au_t()` ici.
# Contrôle : python -X utf8 manim/poste2/verifier-avant-rendu.py manim/scripts/6e/entier_decomposer.py EntierDecomposer6e
# Audit : AUDIT=1 BORDS=1 python -X utf8 -m manim render --dry_run manim/scripts/6e/entier_decomposer.py EntierDecomposer6e
# Sortie : manim/sorties/6e/maths/entiers/04-decomposer/eleveai-maths-6e-entier-decomposer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from entier_commun import *  # noqa: E402,F403

DOSSIER_MARQUES = Path(__file__).resolve().parents[1] / "cm1"

# Une couleur par rang, la même que dans B1 (⛔ COPIE assumée : `entier_rang.py` est déjà rendu,
# on ne l'importe pas — c'est la règle de la série, on copie, on ne partage pas).
RANGS = ["unités", "dizaines", "centaines", "unités de mille",
         "dizaines de mille", "centaines de mille"]
COUL_RANG = {"unités": CLASSE_UNITE, "dizaines": AMBRE_D, "centaines": ROSE_D,
             "unités de mille": CLASSE_MILLE, "dizaines de mille": "#34d399",
             "centaines de mille": CLASSE_MILLION}


def chiffres_en_cases(s, fs=58, couleur=WHITE, larg=0.8, h=0.98, buff=0.1, couleurs=None):
    """Les chiffres d'un nombre, chacun dans SA case. .cases[i] / .chiffres[i], i = 0 à GAUCHE.
    `couleurs` : une couleur par position (liste), pour montrer la valeur de chaque rang.
    ⚠️ Tout est construit DANS le groupe : un `move_to()` de l'appelant emmène bien les chiffres."""
    ch = [c for c in str(s) if c.isdigit()]
    cases, txts = VGroup(), VGroup()
    x = 0.0
    for i, c in enumerate(ch):
        case = RoundedRectangle(width=larg, height=h, corner_radius=0.08, fill_color=CASE, fill_opacity=0.5,
                                stroke_color=GRAY_B, stroke_width=3).move_to(P(x + larg / 2, 0))
        cases.add(case)
        coul = couleurs[i] if couleurs else couleur
        txts.add(Text(c, font_size=fs, color=coul, weight=BOLD).move_to(case))
        x += larg + buff
    g = VGroup(cases, txts)
    g.cases, g.chiffres = cases, txts
    g.move_to(ORIGIN)
    return hors_audit(g)


def cadre_ici(mob, couleur=VERT_OK, buff=0.1):
    """Le cadre construit À LA POSITION DU MOMENT (⛔ jamais à la construction du groupe)."""
    return hors_audit(SurroundingRectangle(mob, color=couleur, buff=buff, corner_radius=0.1, stroke_width=5))


def ecran_jeu(points=None, s=1.0):
    """L'écran de jeu d'Ethan : un cadre, une barre de score, quelques gains en attente."""
    cadre = RoundedRectangle(width=3.4 * s, height=2.4 * s, corner_radius=0.12 * s, fill_color="#140c2b",
                             fill_opacity=0.92, stroke_color="#a78bfa", stroke_width=3)
    titre = Text("SCORE", font_size=int(22 * s), color="#c4b5fd", weight=BOLD)
    titre.move_to(cadre.get_top() + DOWN * 0.3 * s)
    barre = RoundedRectangle(width=2.7 * s, height=0.42 * s, corner_radius=0.1 * s, fill_color="#1e1b4b",
                             fill_opacity=1, stroke_color="#6d28d9", stroke_width=2)
    barre.next_to(titre, DOWN, buff=0.18 * s)
    val = Text(nb(points) if points else "0", font_size=int(30 * s), color="#fbbf24", weight=BOLD).move_to(barre)
    gains = VGroup(*[RoundedRectangle(width=0.62 * s, height=0.34 * s, corner_radius=0.08 * s,
                                      fill_color="#4c1d95", fill_opacity=1, stroke_color="#a78bfa",
                                      stroke_width=2) for _ in range(4)])
    gains.arrange_in_grid(rows=2, cols=2, buff=0.16 * s).next_to(barre, DOWN, buff=0.26 * s)
    g = VGroup(cadre, titre, barre, val, gains)
    g.cadre, g.val = cadre, val
    return hors_audit(g)


class EntierDecomposerBase(PaysageEntier6e):
    nom_voix = "6e-entier-decomposer"
    fichier_marques = str(DOSSIER_MARQUES / "entier_6e_decomposer_marques.json")
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Décomposer un nombre entier", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Décomposer un nombre entier")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Quelle est la bonne", 38)
        q1 = self.ligne([("décomposition", WHITE), ("de 507 ?", JAUNE_TITRE)], 38, buff=0.22)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        ej = ecran_jeu(1250, 0.78).move_to(P(4.1, 0.35))
        self.au_mot("Quelle est la bonne")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(ej, scale=1.08), run_time=0.4)
        self.au_mot("décomposition")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.3)
        self.au_mot("de 507")
        self.play(FadeIn(q1[1], shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Ethan, game designer ───────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = ethan(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Ethan")
        nom = self.t("Ethan", 42, "#a78bfa").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est game designer")
        met = self.bloc(["game designer"], 26, "#a78bfa").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XP = 0.2
        self.au_mot("Il donne les points")
        l0 = self.bloc(["Il donne les points", "de son jeu"], 34)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("par paquets")
        l1 = self.t("par paquets :", 34, JAUNE_TITRE)
        self.col(l1, 1.3, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        # Les trois paquets, du plus gros au plus petit, chacun à SON mot et de SA couleur.
        paquet = {}
        for extrait, nom_r, y in (("milliers", "unités de mille", 0.5),
                                  ("centaines", "centaines", -0.25),
                                  ("dizaines.", "dizaines", -1.0)):
            self.au_mot(extrait)
            lab = self.t(extrait.rstrip("."), 34, COUL_RANG[nom_r])
            self.col(lab, y, XP + 0.3)
            jeton = hors_audit(RoundedRectangle(width=0.5, height=0.34, corner_radius=0.08,
                                                fill_color=COUL_RANG[nom_r], fill_opacity=0.35,
                                                stroke_color=COUL_RANG[nom_r], stroke_width=3))
            jeton.next_to(lab, LEFT, buff=0.22)
            paquet[nom_r] = jeton
            self.play(FadeIn(lab, shift=UP * 0.1), FadeIn(jeton, scale=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 02 : chaque chiffre vaut son chiffre fois son rang ──────────────────
    def ecran_valeur(self):
        self.ecran("02-valeur")
        self.au_mot("Chaque chiffre vaut")
        tit = self.bloc(["Chaque chiffre vaut", "son chiffre fois son rang."], 36, JAUNE_TITRE)
        gauche(tit, -6.2, 2.85)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.5)
        g = chiffres_en_cases("352", fs=72, larg=1.05, h=1.25,
                              couleurs=[COUL_RANG["centaines"], COUL_RANG["dizaines"], COUL_RANG["unités"]])
        g.move_to(P(-3.6, 0.5))
        self.au_mot("Dans 352")
        l0 = self.ligne([("Dans", WHITE), (nb(352) + " :", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l0, 0.95, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g, scale=1.06), run_time=0.55)
        self.au_mot("le 5 vaut")
        l1 = self.t("le 5 vaut", 36, COUL_RANG["dizaines"])
        self.col(l1, 0.05, 0.35)
        cad = cadre_ici(g.cases[1], COUL_RANG["dizaines"], buff=0.06)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cad), run_time=0.5)
        # ⛔ Pas d'`au_mot("5 fois 10")` ici : la ligne « le 5 vaut » est retenue par la synchro
        #    automatique jusqu'à SON dernier mot, donc un `au_mot` posé ensuite arrive toujours en
        #    retard (le piège n° 6, RETARD de 0,32 s au dry run). La ligne de calcul se cale seule.
        calc = self.ligne([("5 × 10", WHITE), ("= 50", VERT_OK)], 44, buff=0.26)
        calc.move_to(P(-3.6, -1.5))
        self.play(FadeIn(calc[0], scale=1.1), run_time=0.45)
        self.au_mot("soit 50")
        l2 = self.t("soit 50.", 40, VERT_OK)
        self.col(l2, -0.85, 0.35)
        self.play(FadeIn(calc[1], scale=1.15), FadeIn(l2, shift=UP * 0.1),
                  Indicate(g.chiffres[1], color=VERT_OK, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 03 : un rang vide ne s'écrit pas ────────────────────────────────────
    def ecran_zero(self):
        self.ecran("03-zero")
        self.au_mot("Un rang vide")
        tit = self.ligne([("Un rang vide", ZERO_C), ("ne s'écrit pas.", WHITE)], 40, buff=0.22)
        gauche(tit, -6.2, 3.15)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.4)
        g = chiffres_en_cases("507", fs=72, larg=1.05, h=1.25,
                              couleurs=[COUL_RANG["centaines"], ZERO_C, COUL_RANG["unités"]])
        g.move_to(P(-3.6, 0.9))
        self.au_mot("507 égale")
        l0 = self.ligne([(nb(507), JAUNE_TITRE), ("égale", WHITE)], 36, buff=0.22)
        self.col(l0, 1.4, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g, scale=1.06), run_time=0.55)
        self.au_mot("500 plus 7")
        somme = self.ligne([("500", COUL_RANG["centaines"]), ("+", GRAY_B), ("7", COUL_RANG["unités"])],
                           52, buff=0.26)
        somme.move_to(P(-3.6, -1.3))
        self.play(FadeIn(somme, scale=1.1), run_time=0.55)
        self.au_mot("et rien pour les dizaines")
        l1 = self.bloc(["et rien", "pour les dizaines."], 34, ZERO_C)
        self.col(l1, 0.3, 0.35)
        cad = cadre_ici(g.cases[1], ZERO_C, buff=0.06)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cad),
                  Indicate(g.chiffres[1], color=ZERO_C, scale_factor=1.35), run_time=0.65)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def figure_q1(self):
        return chiffres_en_cases("706", fs=58, larg=0.86, h=1.05,
                                 couleurs=[COUL_RANG["centaines"], ZERO_C, COUL_RANG["unités"]]
                                 ).move_to(P(-3.6, 1.5))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(cadre_ici(g.cases[1], ZERO_C, buff=0.05)), run_time=0.35)

        self.question_gauche("04-question", "04b-reponse",
                             ["Quelle est", "la décomposition", "de 706 ?"],
                             [self.choix("700 + 60"), self.choix("70 + 6"), self.choix("700 + 6")], 2,
                             ["Le 7 vaut 700,", "le 0 ne compte pas,", "le 6 vaut 6 unités."],
                             -0.75, mot_q="Quelle est la décomposition", autres_q=autres_q, autres_r=apres)

    # ── 05 : composer, l'inverse, même en désordre ──────────────────────────
    def ecran_composer(self):
        self.ecran("05-composer")
        self.au_mot("L'inverse s'appelle composer")
        tit = self.ligne([("L'inverse s'appelle", WHITE), ("composer.", VERT_OK)], 40, buff=0.22)
        gauche(tit, -6.2, 3.15)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.45)
        # les termes EN DÉSORDRE, puis rangés : 90 + 8 000 + 3 + 500
        desordre = self.ligne([("90", COUL_RANG["dizaines"]), ("+", GRAY_B),
                               (nb(8000), COUL_RANG["unités de mille"]), ("+", GRAY_B),
                               ("3", COUL_RANG["unités"]), ("+", GRAY_B),
                               ("500", COUL_RANG["centaines"])], 40, buff=0.22)
        desordre.move_to(P(-0.1, 2.0))
        self.au_mot("On range chaque terme")
        l0 = self.t("On range chaque terme", 36).move_to(P(-0.1, 1.0))
        # ⚠️ « dans son rang » suit « On range chaque terme » de 1,15 s et « même en désordre »
        #    arrive 0,83 s plus tard : les trois `play` restent courts, sinon RETARD (0,37 s mesuré).
        self.play(FadeIn(hors_audit(desordre), shift=DOWN * 0.1), FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        self.au_mot("dans son rang")
        tab = chiffres_en_cases("8593", fs=64, larg=1.15, h=1.3,
                                couleurs=[COUL_RANG["unités de mille"], COUL_RANG["centaines"],
                                          COUL_RANG["dizaines"], COUL_RANG["unités"]])
        tab.move_to(P(-0.1, -0.7))
        l1 = self.t("dans son rang,", 36, VERT_OK).move_to(P(-0.1, 0.35))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(tab.cases, scale=1.05), run_time=0.35)
        self.play(FadeIn(tab.chiffres, scale=1.15, lag_ratio=0.2), run_time=0.4)
        self.au_mot("même en désordre")
        l2 = self.t("même en désordre.", 40, JAUNE_TITRE).move_to(P(-0.1, -2.2))
        self.play(FadeIn(l2, shift=UP * 0.1), Wiggle(hors_audit(desordre)), run_time=0.7)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def figure_q2(self):
        g = self.ligne([("500", COUL_RANG["centaines"]), ("+", GRAY_B), ("90", COUL_RANG["dizaines"]),
                        ("+", GRAY_B), ("3", COUL_RANG["unités"]), ("+", GRAY_B),
                        (nb(8000), COUL_RANG["unités de mille"])], 34, buff=0.18)
        return hors_audit(g).move_to(P(-3.6, 1.5))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[6], color=COUL_RANG["unités de mille"], scale_factor=1.2), run_time=0.3)

        self.question_gauche("06-question", "06b-reponse",
                             ["Quel nombre vaut", "500 + 90 + 3", "+ " + nb(8000) + " ?"],
                             [self.choix(nb(5938)), self.choix(nb(8593)), self.choix(nb(8953))], 1,
                             ["L'ordre ne compte pas :", nb(8000) + ", puis 500,", "puis 90, puis 3.",
                              "Donc " + nb(8593) + "."],
                             -0.75, mot_q="Quel nombre vaut", autres_q=autres_q, autres_r=apres)

    # ── 07 : des nombres plus longs ─────────────────────────────────────────
    def ecran_grands(self):
        self.ecran("07-grands")
        self.au_mot("Même méthode")
        tit = self.ligne([("Même méthode", WHITE), ("avec des nombres plus longs.", CLASSE_MILLE)],
                         36, buff=0.22)
        gauche(tit, -6.2, 3.15)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.5)
        somme = self.ligne([(nb(10000), "#34d399"), ("+", GRAY_B), ("100", COUL_RANG["centaines"]),
                            ("+", GRAY_B), ("20", COUL_RANG["dizaines"]), ("+", GRAY_B),
                            ("4", COUL_RANG["unités"])], 46, buff=0.24)
        somme.move_to(P(-0.1, 1.3))
        self.au_mot("10 000 plus")
        self.play(FadeIn(somme[0], scale=1.1), run_time=0.4)
        self.au_mot("100 plus 20")
        self.play(FadeIn(somme[1]), FadeIn(somme[2], scale=1.1), run_time=0.4)
        # ⛔ « 4 donne » suit « 20 plus 4 » de 0,53 s : un `au_mot` de plus serait en RETARD
        #    (le piège n° 5). Les deux derniers termes arrivent ensemble, à leur mot commun.
        self.au_mot("20 plus 4")
        self.play(FadeIn(somme[3]), FadeIn(somme[4], scale=1.1),
                  FadeIn(somme[5]), FadeIn(somme[6], scale=1.1), run_time=0.5)
        self.au_mot("10 124")
        g = chiffres_en_cases("10124", fs=58, larg=0.95, h=1.15,
                              couleurs=["#34d399", COUL_RANG["unités de mille"], COUL_RANG["centaines"],
                                        COUL_RANG["dizaines"], COUL_RANG["unités"]])
        g.move_to(P(-0.1, -0.9))
        res = self.t("donne " + nb(10124) + ".", 44, VERT_OK).move_to(P(-0.1, -2.3))
        self.play(FadeIn(g, scale=1.06), FadeIn(res, scale=1.1), run_time=0.7)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (réponse A) ─────────────────────────────────────────
    def figure_q3(self):
        return chiffres_en_cases("55140", fs=48, larg=0.76, h=0.92,
                                 couleurs=["#34d399", COUL_RANG["unités de mille"],
                                           COUL_RANG["centaines"], COUL_RANG["dizaines"],
                                           ZERO_C]).move_to(P(-3.6, 1.5))

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q3()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(VGroup(g.chiffres[0], g.chiffres[1]), color=VERT_OK, scale_factor=1.25),
                    run_time=0.35)

        self.question_gauche("08-question", "08b-reponse",
                             ["Quelle écriture", "est égale à " + nb(55140) + " ?"],
                             [self.choix(nb(50000) + " + " + nb(5000) + " + 100 + 40"),
                              self.choix(nb(500000) + " + " + nb(5000) + " + 100 + 40"),
                              self.choix(nb(50000) + " + 500 + 100 + 40")], 0,
                             ["Deux 5 : l'un vaut " + nb(50000) + ",", "l'autre " + nb(5000) + ".",
                              "Puis 100 et 40."],
                             -0.75, mot_q="Quelle écriture", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    GAINS = ((30000, "#34d399"), (2000, CLASSE_MILLE), (600, ROSE_D), (50, AMBRE_D), (9, BLEU_D))

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Au jeu, Rayan gagne")
        l0 = self.t("Au jeu, Rayan gagne", 36).move_to(P(-0.1, 2.3))
        ej = ecran_jeu(None, 0.72).move_to(P(-4.9, 0.3))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(ej, scale=1.05), run_time=0.5)
        # les cinq gains, chacun à SON mot ; les deux derniers sont dits ensemble (« 50 et 9 »)
        jetons = VGroup()
        for v, c in self.GAINS:
            j = VGroup(RoundedRectangle(width=1.5, height=0.78, corner_radius=0.12, fill_color=CASE,
                                        fill_opacity=0.55, stroke_color=c, stroke_width=4))
            j.add(Text(nb(v), font_size=34, color=c, weight=BOLD).move_to(j[0]))
            jetons.add(j)
        jetons.arrange(RIGHT, buff=0.22).move_to(P(1.0, 0.75))
        hors_audit(jetons)
        for extrait, i in (("30 000", 0), ("2 000", 1), ("600", 2), ("50 et 9", 3)):
            self.au_mot(extrait)
            quoi = [jetons[i]] if i < 3 else [jetons[3], jetons[4]]
            self.play(*[FadeIn(m, scale=1.12) for m in quoi], run_time=0.45)
        self.au_mot("Quel est son total")
        q = self.t("Quel est son total ?", 42, ORANGE_RETENUE).move_to(P(-0.1, -1.1))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(jetons), run_time=0.7)
        self.pause_defi(y=-2.25)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = chiffres_en_cases("32659", fs=60, larg=1.0, h=1.2,
                              couleurs=[c for _, c in self.GAINS])
        g.move_to(P(-0.1, 1.2))
        self.add(g.cases)
        self.au_mot("Chaque terme dans son rang")
        l0 = self.t("Chaque terme dans son rang :", 36, JAUNE_TITRE).move_to(P(-0.1, -0.35))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        # ⚠️ Les cinq chiffres ont CHACUN leur marque, à 0,45 s d'intervalle environ : les `play`
        #    restent courts (0,28 s) pour qu'aucun ne déborde sur le mot suivant.
        for extrait, i in (("3, 2", 0), ("2, 6", 1), ("6, 5", 2), ("5, 9", 3), ("9. Le", 4)):
            self.au_mot(extrait)
            self.play(FadeIn(g.chiffres[i], scale=1.2), run_time=0.28)
        self.au_mot("32 659")
        res = self.t("Le total est " + nb(32659) + ".", 44, VERT_OK).move_to(P(-0.1, -1.6))
        self.play(FadeIn(res, scale=1.1), Circumscribe(g, color=VERT_OK, buff=0.08), run_time=0.8)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        # ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de ~3,6 unités de large, BORD.
        fig = chiffres_en_cases("507", fs=34, larg=0.66, h=0.78, buff=0.08,
                                couleurs=[COUL_RANG["centaines"], ZERO_C, COUL_RANG["unités"]])
        lignes = self.finale_gauche(fig, textes=[
            ("Décomposer donne la valeur", "de chaque chiffre."),
            ("Un rang vide", "ne s'écrit pas.")], fs=32)
        self.add(fig)
        self.au_mot("Décomposer donne")
        self.montrer_ligne(lignes[0], Indicate(fig.cases, scale_factor=1.05))
        self.au_mot("Un rang vide")
        self.montrer_ligne(lignes[1], Indicate(fig.chiffres[1], color=ZERO_C, scale_factor=1.3))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_valeur()
        self.ecran_zero()
        self.ecran_question1()
        self.ecran_composer()
        self.ecran_question2()
        self.ecran_grands()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierDecomposer6e(EntierDecomposerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
