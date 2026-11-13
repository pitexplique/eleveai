# aire_unite.py
# EleveAI — Maths CM1 — série « Aire », épisode 02 : COMPARER DES AIRES AVEC UNE UNITÉ
# (micro aire_unite, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (les tablettes de chocolat : un gros carré = 2 petits).
# Décor et métier : Awa, CRÉATRICE DE JEUX VIDÉO (îles en cases sur la carte de son jeu ; centre : jeux-video).
# Exemples du coach (aires.bank.ts) : on compare des aires en comptant des unités ; même unité pour comparer.
# Mapping micro → écrans : aire_unite = 02 (compter avec une unité), 03 (même aire, formes différentes),
# 05 (piège : unités différentes), 06 (même unité), questions 04 et 07, défi 08.
# Voix : manim/voix/cm1-aire-unite.json (validée le 13/11, Julie, débit −6) ;
# marques : aire_unite_marques.json (python manim/scripts/cm1/aire_marques.py unite).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/aire_unite.py AireUniteCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/aire_unite.py AireUniteCM1 -o eleveai-maths-cm1-aire-unite --media_dir manim/scripts/cm1/media-aire-02
# Sortie : manim/sorties/cm1/maths/aire/02-unite/eleveai-maths-cm1-aire-unite.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm1_commun import *  # noqa: E402,F403

VOLCAN = "#d97706"
VOLCAN_B = "#78350f"
LAC = "#60a5fa"
SABLE = "#fcd34d"
GRIS_C = "#94a3b8"

# les îles du jeu d'Awa : (colonne, rangée), rangée 0 en haut
ILE_VOLCAN = [(1, 0), (2, 0)] + [(i, 1) for i in range(4)] + [(i, 2) for i in range(4)] + [(1, 3), (2, 3)]  # 12
ILE_PALMIERS = [(0, 0), (1, 0), (2, 0)] + [(i, 1) for i in range(4)] + [(1, 2), (2, 2), (3, 2)]  # 10
MAISON_CARREE = [(0, 0), (1, 0), (2, 0), (0, 1), (1, 1), (2, 1), (0, 2), (2, 2)]  # 8 : la porte au milieu en bas
RIVIERE = [(0, 0), (1, 0), (1, 1), (2, 1), (3, 1), (3, 2), (4, 2)]  # 7


def etiquette(s, mob, fs=24, couleur=GRAY_B, sens=DOWN):
    """Le nom d'une figure (pas un nombre) sous elle."""
    return Text(s, font_size=fs, color=couleur).next_to(mob, sens, buff=0.15)


class AireUniteBase(PaysageAireCM1):
    nom_voix = "cm1-aire-unite"
    fichier_marques = "aire_unite_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des aires", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Qui a la plus", "grande surface ?"], 40)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        a = rect_cases(6, 1, 0.45, AMBRE_D, "#78350f").move_to(P(3.0, 1.05))
        b = rect_cases(3, 2, 0.45, VERT_F, "#14532d").move_to(P(3.0, -0.15))
        self.au_mot("Qui a")
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.au_mot("surface")
        self.play(LaggedStart(*[FadeIn(x, scale=1.6) for x in [*a, *b]], lag_ratio=0.06), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Awa, créatrice de jeux vidéo ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        aw = awa(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Awa")
        nom = self.t("Awa", 42, BLEU_CALCUL).next_to(aw, UP, buff=0.2)
        self.play(FadeIn(aw, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("créatrice")
        met = self.bloc(["créatrice de", "jeux vidéo"], 28, BLEU_CALCUL).next_to(aw, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        mer = RoundedRectangle(width=5.8, height=3.7, corner_radius=0.25, stroke_color="#7dd3fc", stroke_width=4,
                               fill_color="#0c4a6e", fill_opacity=1).move_to(P(0.9, 0.45))
        tc = self.t("la carte du jeu", 26, GRAY_B).next_to(mer, DOWN, buff=0.15)
        self.au_mot("Sur la carte")
        self.play(FadeIn(mer, scale=0.95), FadeIn(tc), run_time=0.5)
        v = figure_cases(ILE_VOLCAN, 0.5, VOLCAN, VOLCAN_B).move_to(P(-0.5, 0.45))
        p = figure_cases(ILE_PALMIERS, 0.5, VERT_F, "#14532d").move_to(P(2.35, 0.45))
        self.au_mot("deux îles")
        self.play(LaggedStart(*[FadeIn(x, scale=1.4) for x in [*v, *p]], lag_ratio=0.03), run_time=0.55)
        self.au_mot("avec des cases")
        self.play(Indicate(v, scale_factor=1.05), Indicate(p, scale_factor=1.05), run_time=0.5)
        self.au_mot("Laquelle")
        q = self.t("Laquelle est-ce ?", 44, JAUNE_TITRE).move_to(P(0.9, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : compter avec une unité ─────────────────────────────────────────
    def ecran_compter(self):
        self.ecran("02-compter")
        v = figure_cases(ILE_VOLCAN, 0.55, VOLCAN, VOLCAN_B).move_to(P(-4.75, 0.9))
        p = figure_cases(ILE_PALMIERS, 0.55, VERT_F, "#14532d").move_to(P(-1.95, 0.9))
        ev, ep = hors_audit(etiquette("volcan", v)), hors_audit(etiquette("palmiers", p))
        self.add(v, p, ev, ep)
        self.au_mot("une unité")
        l0 = self.ligne([("Unité :", WHITE), ("la case", CARREAU)], 38)
        self.col(l0, 2.6)
        u = carreau(0.55).next_to(l0, RIGHT, buff=0.3)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(u, scale=1.6), run_time=0.45)
        self.au_mot("On compte")
        nv, np_ = numeros(v, 22, "#0f172a"), numeros(p, 22, "#0f172a")
        self.play(LaggedStart(*[FadeIn(n) for n in [*nv, *np_]], lag_ratio=0.04), run_time=1.0)
        self.au_mot("L'île du volcan")
        l1 = self.t("Volcan : 12 cases", 36, VOLCAN)
        self.col(l1, 1.6)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(v, color=VOLCAN, scale_factor=1.05), run_time=0.5)
        self.au_mot("L'île des palmiers")
        l2 = self.t("Palmiers : 10 cases", 36, VERT_F)
        self.col(l2, 0.9)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(p, color=VERT_F, scale_factor=1.05), run_time=0.5)
        self.au_mot("12, c'est")
        l3 = self.ligne([("12,", WHITE), ("c'est plus que 10.", WHITE)], 36)
        self.col(l3, 0.0)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.au_mot("L'île du volcan a")
        l4 = self.bloc(["L'île du volcan a", "la plus grande aire."], 36, VERT_OK)
        self.col(l4, -1.2)
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(v, color=VERT_OK, scale_factor=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 03 : même aire, formes différentes ──────────────────────────────────
    def ecran_meme_aire(self):
        self.ecran("03-meme-aire")
        lg = rect_cases(8, 1, 0.5, ROSE_D, "#831843").move_to(P(-3.6, 1.9))
        ca = figure_cases(MAISON_CARREE, 0.6, "#a78bfa", "#4c1d95").move_to(P(-3.6, -0.55))
        toit = Polygon(ca.get_corner(UL) + P(-0.15, 0), ca.get_corner(UR) + P(0.15, 0), ca.get_top() + P(0, 0.75),
                       fill_color="#ef4444", fill_opacity=1, stroke_color="#7f1d1d", stroke_width=3)
        self.au_mot("une longue maison")
        self.play(LaggedStart(*[FadeIn(x, shift=RIGHT * 0.2) for x in lg], lag_ratio=0.08), run_time=0.7)
        self.au_mot("une maison carrée")
        self.play(LaggedStart(*[FadeIn(x, scale=1.4) for x in ca], lag_ratio=0.08), FadeIn(toit, shift=DOWN * 0.2),
                  run_time=0.7)
        self.au_mot("pas la même forme")
        l1 = self.t("Pas la même forme…", 36)
        self.col(l1, 2.5)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("On compte")
        n1, n2 = numeros(lg, 22, "#0f172a"), numeros(ca, 24, "#0f172a")
        self.play(LaggedStart(*[FadeIn(n) for n in [*n1, *n2]], lag_ratio=0.05), run_time=0.9)
        l2 = self.ligne([("8 cases,", ROSE_D), ("et 8 cases.", "#a78bfa")], 38, buff=0.25)
        self.col(l2, 1.5)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Elles ont la même aire")
        l3 = self.bloc(["Elles ont", "la même aire !"], 40, VERT_OK)
        self.col(l3, 0.35)
        self.play(FadeIn(l3, scale=1.15), Indicate(lg, color=VERT_OK, scale_factor=1.05),
                  Indicate(ca, color=VERT_OK, scale_factor=1.05), run_time=0.6)
        self.au_mot("Deux formes")
        l4 = self.bloc(["Deux formes différentes", "peuvent avoir", "la même aire."], 32, ORANGE_RETENUE)
        self.col(l4, -1.25)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        lac = rect_cases(3, 3, 0.48, LAC, "#1e3a8a").move_to(P(-5.0, 1.45))
        foret = figure_cases([(i, 0) for i in range(4)] + [(i, 1) for i in range(4)] + [(0, 2), (1, 2), (2, 2)],
                             0.48, VERT_F, "#14532d").move_to(P(-2.35, 1.45))
        plage = figure_cases([(i, 0) for i in range(4)] + [(0, 1), (1, 1), (2, 1)], 0.48, SABLE, "#92400e") \
            .move_to(P(-3.7, -0.9))
        noms = hors_audit(VGroup(etiquette("lac", lac), etiquette("forêt", foret), etiquette("plage", plage)))

        def autres_q(sc):
            sc.play(FadeIn(lac), FadeIn(foret), FadeIn(plage), FadeIn(noms), run_time=0.35)

        def apres(sc):
            sc.play(FadeIn(VGroup(numeros(lac, 20, "#0f172a"), numeros(foret, 20, "#0f172a"),
                                  numeros(plage, 20, "#0f172a"))),
                    Indicate(foret, color=VERT_OK, scale_factor=1.08), run_time=0.4)

        self.question_pause("04-question", "04b-reponse",
                            ["Le lac : 9 cases,", "la forêt : 11 cases,", "la plage : 7 cases.",
                             "Qui a la plus grande aire ?"],
                            [self.choix("le lac"), self.choix("la plage"), self.choix("la forêt")], 2,
                            ["11 cases, le plus grand nombre :", "la forêt a la plus grande aire."],
                            mot_q="Le lac", autres_q=autres_q, autres_r=apres)

    # ── 05 : le piège (des cases différentes) ───────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        gc = VGroup(*[grande_case(1.0, GRIS_C, "#334155") for _ in range(4)]).arrange_in_grid(2, 2, buff=0) \
            .move_to(P(-4.75, 0.7))
        ja = rect_cases(3, 3, 0.5, VERT_F, "#14532d").move_to(P(-1.95, 0.7))
        ec, ej = etiquette("château", gc), etiquette("jardin", ja)
        hors_audit(VGroup(ec, ej))
        l1 = self.ligne([("Château :", GRIS_C), ("4 grandes cases", GRIS_C)], 32)
        self.col(l1, 2.25)
        self.au_mot("Le château")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in gc], lag_ratio=0.1), FadeIn(ec), FadeIn(l1[0]),
                  run_time=0.5)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Jardin :", VERT_F), ("9 petites cases", VERT_F)], 32)
        self.col(l2, 1.6)
        self.au_mot("Le jardin")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in ja], lag_ratio=0.06), FadeIn(ej), FadeIn(l2[0]),
                  run_time=0.5)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("9, c'est")
        l3 = self.ligne([("9,", WHITE), ("c'est plus que 4…", WHITE)], 34)
        self.col(l3, 0.9)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.au_mot("mais les cases")
        l4 = self.bloc(["mais les cases ne sont", "pas pareilles !"], 34, ROUGE_ERREUR)
        self.col(l4, 0.0)
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(gc, color=ROUGE_F, scale_factor=1.06), run_time=0.5)
        self.au_mot("Une grande case")
        l5 = self.t("Une grande case = 4 petites", 32, CARREAU)
        self.col(l5, 0.9)
        self.play(FadeOut(l3), FadeOut(l4), run_time=0.25)
        self.play(FadeIn(l5, shift=UP * 0.1), *[Create(traits_de(g)) for g in gc], run_time=0.6)
        self.au_mot("4 fois 4")
        l6 = self.ligne([("4 × 4 =", WHITE), ("16 petites cases", VERT_OK)], 34)
        self.col(l6, 0.15)
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.4)
        nums = numeros(petites_de(*gc), 20, "#0f172a")
        self.play(LaggedStart(*[FadeIn(n) for n in nums], lag_ratio=0.04), run_time=0.7)
        self.au_mot("Le château est plus grand")
        l7 = self.bloc(["Le château est plus", "grand que le jardin."], 34, VERT_OK)
        self.col(l7, -1.0)
        self.play(FadeIn(l7, shift=UP * 0.1), Indicate(gc, color=VERT_OK, scale_factor=1.06), run_time=0.5)
        self.attendre_voix()

    # ── 06 : la même unité ──────────────────────────────────────────────────
    def ecran_meme_unite(self):
        self.ecran("06-meme-unite")
        p1, p2 = carreau(0.7), carreau(0.7)
        egal = Text("=", font_size=60, color=VERT_OK)
        haut = VGroup(p1, egal, p2).arrange(RIGHT, buff=0.35).move_to(P(-3.6, 1.3))
        ok = Text("✓", font_size=56, color=VERT_OK).next_to(haut, RIGHT, buff=0.35)
        petit, grand = carreau(0.7), grande_case(1.4, GRIS_C, "#334155")
        diff = Text("≠", font_size=60, color=ROUGE_ERREUR)
        bas = VGroup(petit, diff, grand).arrange(RIGHT, buff=0.35).move_to(P(-3.6, -1.2))
        non = Text("✗", font_size=56, color=ROUGE_ERREUR).next_to(bas, RIGHT, buff=0.35)
        hors_audit(VGroup(egal, ok, diff, non))
        self.au_mot("Pour comparer")
        l1 = self.bloc(["Pour comparer des aires,", "on mesure avec", "la même unité."], 38)
        l1[2].set_color(VERT_OK)
        self.col(l1, 1.35)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.play(FadeIn(haut, scale=1.2), FadeIn(ok), run_time=0.4)
        self.au_mot("Sinon")
        l2 = self.bloc(["Sinon, on ne peut pas", "comparer les nombres."], 36, ROUGE_ERREUR)
        self.col(l2, -1.15)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(bas, scale=1.2), FadeIn(non), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        a = rect_cases(6, 1, 0.5, AMBRE_D, "#78350f").move_to(P(-3.7, 1.6))
        b = rect_cases(3, 2, 0.5, BLEU_D, "#1e3a8a").move_to(P(-3.7, -0.4))

        def autres_q(sc):
            sc.play(FadeIn(a), FadeIn(b), run_time=0.35)

        def apres(sc):
            sc.play(FadeIn(VGroup(numeros(a, 22, "#0f172a"), numeros(b, 22, "#0f172a"))), run_time=0.3)

        self.question_pause("07-question", "07b-reponse",
                            ["Deux figures de 6 cases,", "de formes différentes.", "Que peut-on dire ?"],
                            [self.choix("la plus longue, plus grande", 26), self.choix("la même aire", 26),
                             self.choix("on ne sait pas", 26)], 1,
                            ["Même nombre de cases,", "même unité :", "elles ont la même aire."],
                            mot_q="Deux figures", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def figures_defi(self):
        gr = VGroup(grande_case(1.0, GRIS_C, "#334155"), grande_case(1.0, GRIS_C, "#334155")).arrange(RIGHT, buff=0) \
            .move_to(P(-4.0, 1.2))
        ri = figure_cases(RIVIERE, 0.5, LAC, "#1e3a8a").move_to(P(-3.6, -0.9))
        return gr, ri, hors_audit(etiquette("grotte", gr)), hors_audit(etiquette("rivière", ri))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        gr, ri, eg, er = self.figures_defi()
        self.au_mot("la grotte couvre")
        l1 = self.t("Grotte : 2 grandes cases", 32, GRIS_C)
        self.col(l1, 2.2)
        self.play(FadeIn(gr, scale=1.2), FadeIn(eg), FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("La rivière")
        l2 = self.t("Rivière : 7 petites cases", 32, LAC)
        self.col(l2, 1.5)
        self.play(LaggedStart(*[FadeIn(q, shift=RIGHT * 0.2) for q in ri], lag_ratio=0.1), FadeIn(er),
                  FadeIn(l2, shift=UP * 0.1), run_time=0.7)
        self.au_mot("Une grande case")
        l3 = self.t("Une grande case = 4 petites", 32, CARREAU)
        self.col(l3, 0.8)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(gr, color=CARREAU, scale_factor=1.06), run_time=0.5)
        self.au_mot("Laquelle")
        q = self.bloc(["Laquelle a la", "plus grande aire ?"], 38, JAUNE_TITRE)
        self.col(q, -0.4)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(VGroup(gr, ri)), run_time=0.5)
        self.pause_defi(y=-1.6)  # au-dessus de Ti-Margo

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        gr, ri, eg, er = self.figures_defi()
        self.add(gr, ri, eg, er)
        self.au_mot("On met tout")
        l0 = self.t("On met tout en petites cases.", 32)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), *[Create(traits_de(g)) for g in gr], run_time=0.6)
        self.au_mot("La grotte : 2")
        l1 = self.t("Grotte : 2 grandes cases", 32, GRIS_C)
        self.col(l1, 1.5)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est 4 plus 4")
        l1b = self.ligne([("4 + 4 =", BLEU_D), ("8 petites cases", VERT_OK)], 34)
        self.col(l1b, 0.9)
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.4)
        ng = numeros(petites_de(*gr), 22, "#0f172a")
        self.play(LaggedStart(*[FadeIn(n) for n in ng], lag_ratio=0.06), run_time=0.5)
        self.au_mot("La rivière : 7")
        l2 = self.t("Rivière : 7 petites cases", 32, LAC)
        self.col(l2, 0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("8, c'est")
        l3 = self.ligne([("8,", WHITE), ("c'est plus que 7.", WHITE)], 34)
        self.col(l3, -0.5)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.au_mot("La grotte a la plus")
        l4 = self.bloc(["La grotte a la", "plus grande aire."], 38, VERT_OK)
        self.col(l4, -1.45)
        self.play(FadeIn(l4, scale=1.15), Indicate(gr, color=VERT_OK, scale_factor=1.08), run_time=0.5)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        a = rect_cases(6, 1, 0.42, AMBRE_D, "#78350f")
        b = rect_cases(3, 2, 0.42, BLEU_D, "#1e3a8a")
        fig = VGroup(a, b).arrange(DOWN, buff=0.5)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour comparer des aires, on", "compte avec la même unité."),
            ("Deux formes différentes", "peuvent avoir la même aire."),
            ("Si les unités sont différentes,", "on les change d'abord.")], fs=32)
        self.add(fig)
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[0], Indicate(a, scale_factor=1.05))
        self.au_mot("Deux formes")
        self.montrer_ligne(lignes[1], Indicate(b, scale_factor=1.05))
        self.au_mot("Si les unités")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_compter()
        self.ecran_meme_aire()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_meme_unite()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class AireUniteCM1(AireUniteBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
