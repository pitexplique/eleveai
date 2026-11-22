# entier_lire.py
# EleveAI — Maths CM1 (+ CM2 par `aussi`) — série « Nombres entiers », épisode A1 : LIRE ET ÉCRIRE
# LES GRANDS NOMBRES (micro entier_lire, notion nombre_entier), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (« huit mille neuf », réponse A) — série `cm1-entier`.
# Décor et métier : Diego, CARTOGRAPHE (centre : histoire-geographie).
#
# Mapping micro → écrans : 02 (les classes de trois chiffres), 03 (le zéro garde la place vide),
# 05 (le CHIFFRE des dizaines ≠ le NOMBRE de dizaines), 07 (« Et au CM2 » : la classe des millions),
# questions 04 (« douze mille trente », A), 06 (dizaines en tout dans 29 404, B),
# 08 (« soixante-dix millions neuf cent cinquante-sept », A), défi 09 (« quarante mille huit »).
# ⛔ L'écran 07-cm2 reste : décision de Frédéric le 21/11 (« Oui, garde-le ») — il couvre ce que les
#    gabarits du CM2 demandent en plus de ceux du CM1 (millions et milliards).
#
# Voix : manim/voix/cm1-entier-lire.json (validée le 21/11, Julie, débit −6) ;
# marques : entier_cm1_lire_marques.json (python manim/scripts/cm1/entier_marques.py cm1:lire).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/entier_lire.py EntierLireCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/entier_lire.py EntierLireCM1 -o eleveai-maths-cm1-entier-lire --media_dir manim/scripts/cm1/media-ent-a1
# Sortie : manim/sorties/cm1/maths/entiers/01-lire/eleveai-maths-cm1-entier-lire.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from entier_commun import *  # noqa: E402,F403


def carte_relief(s=1.0):
    """La carte du cartographe : un relief, deux sommets, une courbe de niveau."""
    cadre = RoundedRectangle(width=3.4 * s, height=2.3 * s, corner_radius=0.08 * s, fill_color="#0b3b36",
                             fill_opacity=0.55, stroke_color="#14b8a6", stroke_width=3)
    sol = cadre.get_center() + DOWN * 0.75 * s
    m1 = Polygon(sol + P(-1.35 * s, 0), sol + P(-0.45 * s, 1.25 * s), sol + P(0.35 * s, 0),
                 fill_color="#0f766e", fill_opacity=1, stroke_color="#5eead4", stroke_width=2)
    m2 = Polygon(sol + P(-0.1 * s, 0), sol + P(0.7 * s, 0.85 * s), sol + P(1.45 * s, 0),
                 fill_color="#115e59", fill_opacity=1, stroke_color="#5eead4", stroke_width=2)
    niveau = DashedLine(sol + P(-1.15 * s, 0.42 * s), sol + P(1.25 * s, 0.42 * s), color="#99f6e4",
                        stroke_width=2, dash_length=0.07)
    # ⚠️ -ql du 21/11 : `g.sommet` était un POINT FIGÉ, calculé avant le `move_to()` de l'appelant —
    # le repère du sommet restait à l'ancienne place, loin de la carte. On met un point DANS le groupe :
    # il suit la carte partout. Lire `carte.sommet.get_center()`, jamais une coordonnée mémorisée.
    sommet = VectorizedPoint(sol + P(-0.45 * s, 1.25 * s))
    g = VGroup(cadre, m2, m1, niveau, sommet)
    g.cadre, g.sommet = cadre, sommet
    return hors_audit(g)


class EntierLireBase(PaysageEntierCM1):
    nom_voix = "cm1-entier-lire"
    fichier_marques = "entier_cm1_lire_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire et écrire les grands nombres", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Lire et écrire les grands nombres")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Comment écrit-on", 38)
        q1 = self.ligne([("« douze mille trente »", JAUNE_TITRE), ("en chiffres ?", WHITE)], 36, buff=0.22)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        carte = carte_relief(0.78).move_to(P(4.0, 0.4))
        self.au_mot("Comment écrit-on")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(carte, scale=1.08), run_time=0.35)
        self.au_mot("douze mille trente")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.3)
        self.au_mot("en chiffres")
        self.play(FadeIn(q1[1], shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Diego, cartographe ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = diego(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Diego")
        nom = self.t("Diego", 42, "#14b8a6").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est cartographe")
        met = self.bloc(["cartographe"], 26, "#14b8a6").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XP = 0.2
        self.au_mot("il dessine les cartes")
        l0 = self.t("Il dessine les cartes.", 34)
        self.col(l0, 2.3, XP)
        # ⚠️ -ql du 21/11 : la carte était à y = 0,1, en plein dans la colonne de texte, et l'étiquette
        # « 3 071 m » tombait SUR « il écrit » (« 3 07⟨m⟩écrit son altitude »). La carte descend sous le
        # texte, et l'altitude se pose à DROITE du sommet, jamais au-dessus.
        carte = carte_relief(0.85).move_to(P(3.9, -1.25))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(carte, scale=1.06), run_time=0.45)
        self.au_mot("Sur chaque sommet")
        l1 = self.t("Sur chaque sommet,", 34)
        self.col(l1, 1.55, XP)
        pt = Dot(carte.sommet.get_center(), radius=0.09, color=JAUNE_TITRE)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pt, scale=2.0), run_time=0.4)
        self.au_mot("il écrit son altitude")
        l2 = self.ligne([("il écrit son", WHITE), ("altitude.", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l2, 0.85, XP)
        alt = hors_audit(Text(nb(3071) + " m", font_size=28, color=JAUNE_TITRE, weight=BOLD))
        alt.next_to(pt, RIGHT, buff=0.12)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(alt, shift=RIGHT * 0.1), run_time=0.45)
        self.attendre_voix()

    # ── 02 : les classes de trois chiffres ──────────────────────────────────
    def ecran_classes(self):
        self.ecran("02-classes")
        XP = 0.35
        # ⚠️ « par classes de trois chiffres » suit « Un grand nombre se range » de 0,6 s dans la voix :
        # deux `au_mot` de suite laissaient le tableau arriver 0,58 s en retard (toléré : 0,4 s).
        # Le bloc ET le tableau arrivent donc ensemble, au PREMIER mot ; les classes se détachent après.
        l0 = self.bloc(["Un grand nombre se range", "par classes de trois chiffres."], 34, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        g = tableau_classes(("mille", "unités"), larg=1.15, h=1.0)
        g.move_to(P(-0.1, -0.55))
        self.au_mot("Un grand nombre se range")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g.tab.cases, scale=1.05), FadeIn(g.tab.entetes),
                  run_time=0.45)
        self.au_mot("La classe des mille")
        self.play(FadeIn(g.bandeaux[0], shift=DOWN * 0.15),
                  Indicate(VGroup(*[g.tab.cases[i] for i in range(3)]), color=CLASSE_MILLE, scale_factor=1.05),
                  run_time=0.55)
        self.au_mot("celle des unités")
        self.play(FadeIn(g.bandeaux[1], shift=DOWN * 0.15),
                  Indicate(VGroup(*[g.tab.cases[i] for i in range(3, 6)]), color=CLASSE_UNITE,
                           scale_factor=1.05), run_time=0.55)
        self.attendre_voix()

    # ── 03 : le zéro garde la place vide ────────────────────────────────────
    def ecran_zero(self):
        self.ecran("03-zero")
        g = tableau_classes(("mille", "unités"), larg=1.15, h=1.0)
        g.move_to(P(-0.1, 1.15))
        self.add(g)
        XP = 0.35
        self.au_mot("Douze mille")
        l0 = self.ligne([("« douze mille »", JAUNE_TITRE), ("→", GRAY_B), ("12", BLEU_D)], 34, buff=0.22)
        self.col(l0, -0.85, XP)
        d12 = VGroup(g.tab.chiffre(1, "1", CLASSE_MILLE), g.tab.chiffre(2, "2", CLASSE_MILLE))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(d12, scale=1.2), run_time=0.5)
        self.au_mot("Trente")
        l1 = self.ligne([("« trente »", JAUNE_TITRE), ("→", GRAY_B), ("030", CLASSE_UNITE)], 34, buff=0.22)
        self.col(l1, -1.6, XP)
        d30 = VGroup(g.tab.chiffre(4, "3", CLASSE_UNITE), g.tab.chiffre(5, "0", CLASSE_UNITE))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(d30, scale=1.2), run_time=0.5)
        self.au_mot("le zéro garde la place vide")
        z = g.tab.chiffre(3, "0", ZERO_C)
        l2 = self.bloc(["le zéro garde", "la place vide."], 34, ZERO_C)
        self.col(l2, -2.45, XP)
        self.play(FadeIn(z, scale=1.6), FadeIn(l2, shift=UP * 0.1),
                  Circumscribe(g.tab.cases[3], color=ZERO_C, buff=0.03), run_time=0.8)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def figure_q1(self):
        g = tableau_classes(("mille", "unités"), larg=0.9, h=0.8, fs_ent=18, fs_ban=17)
        return g.scale(0.95).move_to(P(-3.6, 1.45))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g.tab.cases[3], color=ZERO_C, scale_factor=1.08), run_time=0.25)

        self.question_gauche("04-question", "04b-reponse",
                             ["Comment écrit-on", "« douze mille trente »", "en chiffres ?"],
                             [self.choix(nb(12030)), self.choix(nb(12300)), self.choix(nb(1230))], 0,
                             ["« Trente », c'est 030", "dans la classe des unités.", "Le zéro garde la place",
                              "des centaines."],
                             -0.75, mot_q="Comment écrit-on", autres_q=autres_q, autres_r=apres)

    # ── 05 : le CHIFFRE des dizaines ≠ le NOMBRE de dizaines ────────────────
    def ecran_chiffre_nombre(self):
        self.ecran("05-chiffre-nombre")
        self.au_mot("Attention")
        tit = self.t("Attention !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        XP = 0.35
        self.au_mot("le chiffre des dizaines")
        l0 = self.ligne([("le CHIFFRE", BLEU_D), ("des dizaines", WHITE)], 34, buff=0.2)
        self.col(l0, 2.0, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("n'est pas le nombre de dizaines")
        l1 = self.ligne([("n'est pas le", WHITE), ("NOMBRE", VERT_OK), ("de dizaines.", WHITE)], 34, buff=0.2)
        self.col(l1, 1.25, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        # 29 404 : le chiffre des dizaines (0) contre le nombre de dizaines (2 940)
        grand = hors_audit(Text(nb(29404), font_size=72, color=WHITE, weight=BOLD)).move_to(P(-3.3, -0.2))
        self.add(grand)
        self.au_mot("Le nombre, c'est tout ce qui est à gauche")
        l2 = self.bloc(["Le NOMBRE, c'est tout", "ce qui est à gauche."], 34, VERT_OK)
        self.col(l2, 0.15, XP)
        cache = Rectangle(width=0.62, height=1.0, fill_color=ROUGE_ERREUR, fill_opacity=0.35,
                          stroke_color=ROUGE_ERREUR, stroke_width=3)
        cache.move_to(grand.get_right() + LEFT * 0.31)
        reste = hors_audit(Text(nb(2940), font_size=60, color=VERT_OK, weight=BOLD))
        reste.move_to(P(-3.3, -1.95))
        fl = hors_audit(Arrow(grand.get_bottom() + DOWN * 0.12, reste.get_top() + UP * 0.12,
                              color=VERT_OK, stroke_width=6, max_tip_length_to_length_ratio=0.2))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(cache, scale=1.3), run_time=0.5)
        self.play(GrowArrow(fl), FadeIn(reste, scale=1.15), run_time=0.6)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def figure_q2(self):
        g = hors_audit(Text(nb(29404), font_size=64, color=WHITE, weight=BOLD))
        cache = Rectangle(width=0.55, height=0.9, fill_color=ROUGE_ERREUR, fill_opacity=0.3,
                          stroke_color=ROUGE_ERREUR, stroke_width=3)
        cache.move_to(g.get_right() + LEFT * 0.28)
        return VGroup(g, hors_audit(cache)).move_to(P(-3.6, 1.5))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g[0]), run_time=0.3)

        def apres(sc):
            sc.play(FadeIn(g[1], scale=1.3), run_time=0.3)

        self.question_gauche("06-question", "06b-reponse",
                             ["Dans " + nb(29404) + ",", "combien de dizaines", "en tout ?"],
                             [self.choix("4"), self.choix(nb(2940)), self.choix("294")], 1,
                             ["On cache le dernier chiffre", "et on lit " + nb(2940) + ".",
                              "Le chiffre des dizaines,", "lui, est 0."],
                             -0.75, mot_q="Dans 29 404", autres_q=autres_q, autres_r=apres)

    # ── 07 : « Et au CM2 » : la classe des millions ──────────────────────────
    # ⛔ Gardé sur décision de Frédéric le 21/11 (« Oui, garde-le ») : il couvre les gabarits du CM2.
    def ecran_cm2(self):
        self.ecran("07-cm2")
        self.au_mot("Et au CM2")
        tit = self.ligne([("Et au CM2:", CLASSE_MILLION), ("une classe de plus", WHITE)], 40, buff=0.25)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit[0]), run_time=0.3)
        self.au_mot("une classe de plus")
        self.play(FadeIn(tit[1], shift=UP * 0.1), run_time=0.3)
        g = tableau_classes(("millions", "mille", "unités"), larg=0.98, h=0.9, fs_ent=20, fs_ban=19)
        g.move_to(P(-0.1, 0.95))
        self.au_mot("les millions")
        # ⛔ -ql du 21/11 : `FadeIn(g)` ET `Indicate(sous-ensemble de g)` dans le MÊME play laissent les
        # cases indiquées dans leur état d'AVANT le fondu — les trois cases des millions ne se
        # dessinaient pas, et le « 5 » flottait hors du tableau. Les deux animations sont séparées.
        # (L'écran 02, qui les sépare déjà, rendait bien ses six cases : c'est ce qui l'a confirmé.)
        self.play(FadeIn(g, scale=1.04), run_time=0.5)
        self.play(Indicate(VGroup(*[g.tab.cases[i] for i in range(3)]), color=CLASSE_MILLION,
                           scale_factor=1.06), run_time=0.45)
        self.au_mot("5 343 000")
        ch = g.poser("5343000")
        self.play(FadeIn(ch, scale=1.15), run_time=0.5)
        self.au_mot("se lit")
        l = self.bloc(["« cinq millions", "trois cent quarante-trois mille »"], 34, CLASSE_MILLION)
        l.move_to(P(-0.1, -1.95))
        self.play(FadeIn(l, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (réponse A) ─────────────────────────────────────────
    def figure_q3(self):
        g = tableau_classes(("millions", "mille", "unités"), larg=0.72, h=0.62, fs_ent=15, fs_ban=14)
        return g.scale(0.95).move_to(P(-3.6, 1.5))

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q3()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(VGroup(*[g.tab.cases[i] for i in range(3, 6)]), color=ZERO_C,
                             scale_factor=1.08), run_time=0.25)

        self.question_gauche("08-question", "08b-reponse",
                             ["« Soixante-dix millions", "neuf cent cinquante-sept » :", "quelle écriture est juste ?"],
                             [self.choix(nb(70000957)), self.choix(nb(7000957)), self.choix(nb(70957))], 0,
                             ["Après la première classe,", "chaque classe prend", "trois chiffres : 70,",
                              "puis 000, puis 957."],
                             -0.75, mot_q="Soixante-dix millions", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = tableau_classes(("mille", "unités"), larg=1.15, h=1.0)
        g.move_to(P(-0.1, 0.55))
        self.au_mot("Écris en chiffres")
        l0 = self.t("Écris en chiffres", 36)
        l0.move_to(P(-0.1, 2.25))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g, scale=1.04), run_time=0.5)
        self.au_mot("quarante mille huit")
        l1 = self.t("« quarante mille huit ».", 40, JAUNE_TITRE)
        l1.move_to(P(-0.1, 1.65))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Combien de zéros")
        q = self.t("Combien de zéros ?", 40, ORANGE_RETENUE)
        q.move_to(P(-0.1, -0.85))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(g.tab.cases), run_time=0.6)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = tableau_classes(("mille", "unités"), larg=1.15, h=1.0)
        g.move_to(P(-0.1, 0.9))
        self.add(g)
        self.au_mot("40 008")
        ch = g.poser("40008")
        res = hors_audit(Text(nb(40008), font_size=58, color=VERT_OK, weight=BOLD)).move_to(P(-0.1, -1.0))
        self.play(FadeIn(ch, scale=1.15), FadeIn(res, scale=1.1), run_time=0.6)
        self.au_mot("Les centaines et les dizaines sont vides")
        l0 = self.t("Les centaines et les dizaines sont vides :", 32, ORANGE_RETENUE)
        l0.move_to(P(-0.1, -1.95))
        zeros = VGroup(*[g.tab.cases[i] for i in (3, 4)])
        self.play(FadeIn(l0, shift=UP * 0.1), Circumscribe(zeros, color=ZERO_C, buff=0.03), run_time=0.7)
        self.au_mot("trois zéros en tout")
        l1 = self.t("trois zéros en tout.", 40, VERT_OK)
        l1.move_to(P(-0.1, -2.7))
        self.play(FadeIn(l1, scale=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        # ⚠️ `finale_gauche` centre la figure en x = −4,6 : à larg=0,82 le tableau sortait à x = −6,9,
        # au-delà de la marge de 3 % (−6,68) → BORD sur l'écran final. À larg=0,58 il tient (−6,34).
        fig = tableau_classes(("mille", "unités"), larg=0.58, h=0.52, fs_ent=13, fs_ban=12)
        lignes = self.finale_gauche(fig, textes=[
            ("Un grand nombre se range", "par classes de trois chiffres."),
            ("Un zéro garde", "une place vide.")], fs=32)
        self.add(fig)
        self.au_mot("Un grand nombre se range")
        self.montrer_ligne(lignes[0], Indicate(fig.tab.cases, scale_factor=1.04))
        self.au_mot("Un zéro garde")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_classes()
        self.ecran_zero()
        self.ecran_question1()
        self.ecran_chiffre_nombre()
        self.ecran_question2()
        self.ecran_cm2()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierLireCM1(EntierLireBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
