# entier_comparer.py
# EleveAI — Maths CM1 (+ CM2 par `aussi`) — série « Nombres entiers », épisode A2 : COMPARER DES
# GRANDS NOMBRES (micro entier_comparer, notion nombre_entier), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (« 987 ou 1 002 ? », réponse B) — série `cm1-entier`.
# Décor et métier : Malik, BIBLIOTHÉCAIRE (centres : jeux-defis, histoire-geographie).
#
# Mapping micro → écrans : 02 (compter les chiffres d'abord), 03 (même longueur : de gauche à droite),
# 05 (le piège : un nombre court qui commence par un gros chiffre), 07 (« Et au CM2 » : les millions),
# questions 04 (12 408 et 12 804, B), 06 (9 876 ou 10 234, A), 08 (ordre croissant, C),
# défi 09 (386 378 / 389 358 / 389 378).
# ⛔ L'écran 07-cm2 reste : décision de Frédéric le 21/11 (« Oui, garde-le »).
#
# Voix : manim/voix/cm1-entier-comparer.json (validée le 21/11, Julie, débit −6) ;
# marques : entier_cm1_comparer_marques.json (python manim/scripts/cm1/entier_marques.py cm1:comparer).
# ⚠️ 10 nombres à espace SANS marque dans cette voix (04-question, 08-question, 09-defi « 389 378 ») :
#    voir manim/INVENTAIRE-entiers-cm1-6e.md § 6bis. Les choix des questions sont posés par
#    `question_gauche` (pas d'`au_mot`) ; seul le défi demande de s'accrocher à un mot voisin.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/entier_comparer.py EntierComparerCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/entier_comparer.py EntierComparerCM1 -o eleveai-maths-cm1-entier-comparer --media_dir manim/scripts/cm1/media-ent-a2
# Sortie : manim/sorties/cm1/maths/entiers/02-comparer/eleveai-maths-cm1-entier-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from entier_commun import *  # noqa: E402,F403

PLUS_GRAND = VERT_OK
PLUS_PETIT = BLEU_D


def livre(h=0.9, couleur="#dc2626", numero=None, s=1.0):
    """Un livre debout sur l'étagère, avec sa cote au dos."""
    dos = RoundedRectangle(width=0.34 * s, height=h * s, corner_radius=0.04 * s, fill_color=couleur,
                           fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    g = VGroup(dos)
    if numero is not None:
        et = hors_audit(Text(str(numero), font_size=int(15 * s), color=WHITE, weight=BOLD))
        et.rotate(PI / 2).move_to(dos)
        g.add(et)
    g.dos = dos
    return g


def etagere(numeros, s=1.0, couleurs=("#dc2626", "#2563eb", "#16a34a", "#f59e0b", "#a78bfa")):
    """Une étagère de livres, cotes visibles, posés sur une planche."""
    ls = VGroup(*[livre(0.9 + 0.05 * (i % 3), couleurs[i % len(couleurs)], n, s)
                  for i, n in enumerate(numeros)])
    ls.arrange(RIGHT, buff=0.06 * s, aligned_edge=DOWN)
    # ⚠️ `BOIS` vient du commun des MASSES, qui n'est pas dans notre chaîne (et qu'on n'importe pas
    #    exprès) : la couleur est écrite ici.
    planche = Rectangle(width=ls.width + 0.3 * s, height=0.1 * s, fill_color="#92400e", fill_opacity=1,
                        stroke_width=0).next_to(ls, DOWN, buff=0)
    g = VGroup(planche, ls)
    g.livres = ls
    return hors_audit(g)


def duel(a, b, fs=58, buff=1.1, couleur_a=WHITE, couleur_b=WHITE):
    """Deux nombres côte à côte, avec la place du signe au milieu. .a .b .milieu"""
    ta = Text(nb(a), font_size=fs, color=couleur_a, weight=BOLD)
    tb = Text(nb(b), font_size=fs, color=couleur_b, weight=BOLD)
    g = VGroup(ta, tb).arrange(RIGHT, buff=buff)
    g.a, g.b = ta, tb
    g.milieu = (ta.get_right() + tb.get_left()) / 2
    return g


class EntierComparerBase(PaysageEntierCM1):
    nom_voix = "cm1-entier-comparer"
    fichier_marques = "entier_cm1_comparer_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des grands nombres", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Comparer des grands nombres")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Lequel est le plus grand :", 38)
        q1 = self.ligne([(nb(8706), JAUNE_TITRE), ("ou", WHITE), (nb(8760) + " ?", JAUNE_TITRE)], 38, buff=0.25)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        et = etagere([12, 18, 21, 34, 47], 0.95).move_to(P(4.1, 0.35))
        self.au_mot("Lequel est le plus grand")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(et, scale=1.06), run_time=0.4)
        self.au_mot("8 706")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.25)
        self.au_mot("ou 8 760")
        self.play(FadeIn(q1[1], shift=UP * 0.2), FadeIn(q1[2], shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Malik, bibliothécaire ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = malik_bib(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Malik")
        nom = self.t("Malik", 42, "#f43f5e").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est bibliothécaire")
        met = self.bloc(["bibliothécaire"], 26, "#f43f5e").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XP = 0.2
        self.au_mot("Il range les livres")
        l0 = self.t("Il range les livres", 34)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("du plus petit numéro")
        l1 = self.ligne([("du", WHITE), ("plus petit", PLUS_PETIT), ("numéro", WHITE)], 34, buff=0.2)
        self.col(l1, 1.6, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("au plus grand")
        l2 = self.ligne([("au", WHITE), ("plus grand.", PLUS_GRAND)], 34, buff=0.2)
        self.col(l2, 0.95, XP)
        et = etagere([8, 15, 23, 36, 52], 1.0).move_to(P(2.6, -1.35))
        fl = hors_audit(Arrow(et.get_left() + DL * 0.25, et.get_right() + DR * 0.25 + LEFT * 0.1,
                              color=JAUNE_TITRE, stroke_width=5, max_tip_length_to_length_ratio=0.06))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(et, shift=UP * 0.2), run_time=0.45)
        self.play(GrowArrow(fl), run_time=0.5)
        self.attendre_voix()

    # ── 02 : d'abord, on compte les chiffres ────────────────────────────────
    def ecran_compter(self):
        self.ecran("02-compter")
        XP = 0.35
        d = duel(987, 1002, fs=64, buff=1.4).move_to(P(-3.5, 0.9))
        self.au_mot("D'abord, on compte les chiffres")
        l0 = self.bloc(["D'abord,", "on compte les chiffres."], 36, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(d, scale=1.06), run_time=0.55)
        # les compteurs sous chaque nombre
        c1 = hors_audit(Text("3 chiffres", font_size=30, color=PLUS_PETIT, weight=BOLD)).next_to(d.a, DOWN, buff=0.3)
        c2 = hors_audit(Text("4 chiffres", font_size=30, color=PLUS_GRAND, weight=BOLD)).next_to(d.b, DOWN, buff=0.3)
        self.play(FadeIn(c1, shift=UP * 0.1), FadeIn(c2, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Plus de chiffres, c'est plus grand")
        l1 = self.bloc(["Plus de chiffres,", "c'est plus grand."], 36, PLUS_GRAND)
        self.col(l1, 1.0, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(d.b, color=PLUS_GRAND, scale_factor=1.12),
                  run_time=0.6)
        self.attendre_voix()

    # ── 03 : même longueur : de gauche à droite ─────────────────────────────
    def ecran_colonne(self):
        self.ecran("03-colonne")
        XP = 0.35
        self.au_mot("Même nombre de chiffres")
        l0 = self.t("Même nombre de chiffres ?", 36, JAUNE_TITRE)
        self.col(l0, 2.35, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        d = duel(8706, 8760, fs=60, buff=1.3).move_to(P(-3.5, 0.9))
        self.add(d)
        self.au_mot("On compare de gauche à droite")
        l1 = self.bloc(["On compare", "de gauche à droite,"], 34)
        self.col(l1, 1.45, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("jusqu'au premier chiffre différent")
        l2 = self.bloc(["jusqu'au premier", "chiffre différent."], 34, ORANGE_RETENUE)
        self.col(l2, 0.3, XP)
        # on surligne les deux premiers chiffres (identiques), puis le troisième (différent)
        pareils = VGroup(*[SurroundingRectangle(VGroup(*t[0:2]), color=GRAY_B, buff=0.05, stroke_width=3)
                           for t in (d.a, d.b)])
        differents = VGroup(*[SurroundingRectangle(t[2], color=ORANGE_RETENUE, buff=0.05, stroke_width=4)
                              for t in (d.a, d.b)])
        self.play(FadeIn(l2, shift=UP * 0.1), Create(hors_audit(pareils)), run_time=0.55)
        self.play(Create(hors_audit(differents)), run_time=0.5)
        res = self.ligne([("0", PLUS_PETIT), ("est plus petit que", WHITE), ("6", PLUS_GRAND)], 36, buff=0.22)
        self.col(res, -1.5, XP)
        self.play(FadeIn(hors_audit(res), shift=UP * 0.1),
                  Indicate(d.b, color=PLUS_GRAND, scale_factor=1.08), run_time=0.6)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        # ⛔ BORD mesuré : à buff=1.5 la figure partait à x = −6,69 (marge de 3 % : −6,68).
        return duel(12408, 12804, fs=46, buff=1.2).move_to(P(-3.6, 1.5))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g.a, color=PLUS_PETIT, scale_factor=1.08), run_time=0.25)

        self.question_gauche("04-question", "04b-reponse",
                             # ⚠️ BORD au dry run : « 12 408 et 12 804 : » sur une seule ligne partait
                             # à x = −6,7, au-delà de la marge de 3 % (−6,68). Trois lignes courtes,
                             # sans changer un mot de ce que dit la voix.
                             [nb(12408), "et " + nb(12804) + " :", "quel signe faut-il ?"],
                             [self.choix("plus grand"), self.choix("plus petit"), self.choix("égal")], 1,
                             ["Les deux commencent par 12.", "Ensuite 4 centaines", "est plus petit",
                              "que 8 centaines."],
                             -0.75, mot_q="quel signe", autres_q=autres_q, autres_r=apres)

    # ── 05 : le piège (9 876 commence par 9) ────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Le piège")
        tit = self.t("Le piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        XP = 0.35
        # ⛔ BORD mesuré : à fs=62 / buff=1.2 la figure partait à x = −6,85 (marge : −6,68).
        d = duel(9876, 10234, fs=56, buff=1.0).move_to(P(-3.4, 1.1))
        self.au_mot("9 876 commence par 9")
        l0 = self.ligne([(nb(9876), WHITE), ("commence par", WHITE), ("9,", ROUGE_ERREUR)], 32, buff=0.18)
        self.col(l0, 2.1, XP)
        self.play(FadeIn(d.a, scale=1.08), FadeIn(l0, shift=UP * 0.1), run_time=0.5)
        self.au_mot("mais 10 234 est plus grand")
        l1 = self.ligne([("mais", WHITE), (nb(10234), PLUS_GRAND), ("est plus grand.", WHITE)], 32, buff=0.18)
        self.col(l1, 1.3, XP)
        self.play(FadeIn(d.b, scale=1.08), FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Il a un chiffre de plus")
        l2 = self.t("Il a un chiffre de plus.", 36, PLUS_GRAND)
        self.col(l2, 0.4, XP)
        c1 = hors_audit(Text("4 chiffres", font_size=28, color=GRAY_B, weight=BOLD)).next_to(d.a, DOWN, buff=0.28)
        c2 = hors_audit(Text("5 chiffres", font_size=28, color=PLUS_GRAND, weight=BOLD)).next_to(d.b, DOWN, buff=0.28)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(c1), FadeIn(c2), run_time=0.5)
        self.play(Indicate(d.b, color=PLUS_GRAND, scale_factor=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        return duel(9876, 10234, fs=46, buff=1.1).move_to(P(-3.6, 1.5))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g.b, color=PLUS_GRAND, scale_factor=1.1), run_time=0.25)

        self.question_gauche("06-question", "06b-reponse",
                             ["Quel nombre est le plus grand :", nb(9876) + " ou " + nb(10234) + " ?"],
                             [self.choix(nb(10234)), self.choix(nb(9876)), self.choix("les deux sont égaux")], 0,
                             [nb(10234) + " a cinq chiffres,", nb(9876) + " n'en a que quatre.",
                              "Plus de chiffres, plus grand."],
                             -0.75, mot_q="Quel nombre est le plus grand", autres_q=autres_q, autres_r=apres)

    # ── 07 : « Et au CM2 » : comparer des millions ──────────────────────────
    # ⛔ Gardé sur décision de Frédéric le 21/11 (« Oui, garde-le »).
    def ecran_cm2(self):
        self.ecran("07-cm2")
        self.au_mot("Et au CM2")
        tit = self.ligne([("Et au CM2:", CLASSE_MILLION), ("on compare des millions", WHITE)], 38, buff=0.25)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit[0]), run_time=0.3)
        self.au_mot("on compare des millions")
        self.play(FadeIn(tit[1], shift=UP * 0.1), run_time=0.3)
        g = tableau_classes(("millions", "mille", "unités"), larg=0.98, h=0.78, fs_ent=18, fs_ban=18)
        g.move_to(P(-0.1, 0.95))
        self.play(FadeIn(g, scale=1.04), run_time=0.5)
        # deux nombres très proches, posés l'un sous l'autre : on compare classe par classe
        h1 = g.poser("6502890")
        h2 = VGroup(*[t.copy().shift(DOWN * 1.05) for t in g.poser("6502590")])
        self.play(FadeIn(h1, scale=1.1), run_time=0.4)
        self.play(FadeIn(h2, scale=1.1), run_time=0.4)
        self.au_mot("Classe par classe, de gauche à droite")
        l0 = self.t("Classe par classe, de gauche à droite :", 32, JAUNE_TITRE)
        l0.move_to(P(-0.1, -1.55))
        self.play(FadeIn(l0, shift=UP * 0.1),
                  Indicate(VGroup(*[g.tab.cases[i] for i in range(3)]), color=CLASSE_MILLION,
                           scale_factor=1.06), run_time=0.6)
        self.au_mot("la règle ne change pas")
        l1 = self.t("la règle ne change pas.", 38, PLUS_GRAND)
        l1.move_to(P(-0.1, -2.35))
        self.play(FadeIn(l1, scale=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (réponse C) ─────────────────────────────────────────
    def figure_q3(self):
        g = VGroup(*[hors_audit(Text(nb(n), font_size=40, color=WHITE, weight=BOLD))
                     for n in (3450, 3045, 3405)])
        g.arrange(DOWN, buff=0.22, aligned_edge=RIGHT)
        return g.move_to(P(-3.9, 1.4))

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q3()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[1], color=PLUS_PETIT, scale_factor=1.1), run_time=0.25)

        self.question_gauche("08-question", "08b-reponse",
                             ["Range dans l'ordre croissant :", nb(3450) + ", " + nb(3045) + ", " + nb(3405) + "."],
                             [self.choix(nb(3405) + ", " + nb(3045) + ", " + nb(3450)),
                              self.choix(nb(3045) + ", " + nb(3450) + ", " + nb(3405)),
                              self.choix(nb(3045) + ", " + nb(3405) + ", " + nb(3450))], 2,
                             ["Croissant, c'est du plus petit", "au plus grand : " + nb(3045) + ",",
                              "puis " + nb(3405) + ", puis " + nb(3450) + "."],
                             -0.75, mot_q="Range dans l'ordre croissant", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi (trois classes, trois totaux) ──────────────────────────
    def trois_totaux(self, fs=40):
        g = VGroup(*[hors_audit(Text(nb(n), font_size=fs, color=WHITE, weight=BOLD))
                     for n in (386378, 389358, 389378)])
        return g.arrange(DOWN, buff=0.3, aligned_edge=RIGHT)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Trois classes ont ramassé")
        l0 = self.t("Trois classes ont ramassé des bouchons :", 32)
        l0.move_to(P(-0.1, 2.25))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        tot = self.trois_totaux().move_to(P(-0.1, 0.45))
        # ⚠️ « 386 378 » n'a pas de marque dans cette voix : les trois totaux arrivent sur « ramassé »,
        #    déjà dit, donc jamais en avance (ils sont la DONNÉE de la question, pas sa réponse).
        self.play(FadeIn(tot, shift=UP * 0.15, lag_ratio=0.25), run_time=0.9)
        self.au_mot("Qui gagne")
        q = self.t("Qui gagne ?", 42, ORANGE_RETENUE)
        q.move_to(P(-0.1, -1.25))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(tot), run_time=0.6)
        self.pause_defi(y=-2.1)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        tot = self.trois_totaux(fs=44).move_to(P(-3.4, 0.5))
        self.add(tot)
        XP = 0.35
        # ⛔ AUDIT-AVANCE au dry run : « 38. » sortait 1,05 s et « 6. » 0,41 s AVANT que la voix les
        #    dise, parce que la ligne entière arrivait sur le PREMIER mot de l'extrait. Chaque nombre
        #    attend maintenant SON mot, et l'extrait commence par le nombre (REPRISE-masses).
        l0 = self.ligne([("Les trois commencent par", WHITE), ("38.", GRAY_B)], 32, buff=0.18)
        self.col(l0, 2.1, XP)
        deb = VGroup(*[SurroundingRectangle(VGroup(*t[0:2]), color=GRAY_B, buff=0.04, stroke_width=3)
                       for t in tot])
        self.au_mot("Les trois commencent")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("38")
        self.play(FadeIn(l0[1], shift=UP * 0.1), Create(hors_audit(deb)), run_time=0.5)
        l1 = self.ligne([("Puis", WHITE), ("9", PLUS_GRAND), ("bat", WHITE), ("6.", ROUGE_ERREUR)], 34, buff=0.2)
        self.col(l1, 1.2, XP)
        tr = VGroup(*[SurroundingRectangle(t[2], color=(ROUGE_ERREUR if i == 0 else PLUS_GRAND),
                                           buff=0.04, stroke_width=4) for i, t in enumerate(tot)])
        self.au_mot("Puis 9")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("bat")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("6")
        self.play(FadeIn(l1[3], shift=UP * 0.1), Create(hors_audit(tr)), run_time=0.5)
        self.au_mot("Enfin 389 378 bat 389 358")
        l2 = self.bloc(["Enfin " + nb(389378), "bat " + nb(389358) + "."], 34, PLUS_GRAND)
        self.col(l2, 0.0, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(tot[2], color=PLUS_GRAND, scale_factor=1.1),
                  run_time=0.7)
        gagne = hors_audit(Text("gagne !", font_size=34, color=PLUS_GRAND, weight=BOLD))
        gagne.next_to(tot[2], RIGHT, buff=0.3)
        self.play(FadeIn(gagne, shift=RIGHT * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        fig = duel(8706, 8760, fs=34, buff=0.55)
        lignes = self.finale_gauche(fig, textes=[
            ("On compte d'abord", "les chiffres."),
            ("Puis on compare", "de gauche à droite.")], fs=32)
        self.add(fig)
        self.au_mot("On compte d'abord les chiffres")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Puis on compare")
        self.montrer_ligne(lignes[1], Indicate(fig.b, color=PLUS_GRAND, scale_factor=1.08))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_compter()
        self.ecran_colonne()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_cm2()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierComparerCM1(EntierComparerBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
