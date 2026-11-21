# entier_comparer.py
# EleveAI — Maths 6e — série « Nombres entiers », épisode B2 : COMPARER DES NOMBRES ENTIERS
# (micro entier_comparer, notion entier_nombre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (« 1 408 ou 1 480 ? », réponse A) — série `6e-entier`.
# Décor et métier : Noé, ASTRONOME (centres : espace, sciences).
#
# Mapping micro → écrans : 02 (on compte d'abord les chiffres), 03 (même longueur : on compare de
# gauche à droite), 05 (le piège : s'arrêter au dernier chiffre), 07 (croissant et décroissant),
# questions 04 (2 305 ou 2 350, C), 06 (le plus petit de 12 647 / 13 547 / 13 647, B),
# 08 (quel rangement est croissant, C), défi 09 (ranger 6 022, 6 024, 6 023, 6 032).
# ⛔ Lot B : PAS de `aussi` → 2 lignes `notion_ressources`, en 6e.
#
# ✅ PASSE MATHS sur la voix, refaite avant d'écrire (règle du 21/11), en commençant par les
#    corrections et la finale : 2 350 > 2 305 (5 dizaines contre 0) ; 12 647 < 13 547 < 13 647,
#    le DEUXIÈME chiffre décide (2 contre 3) ; 3 045 < 3 405 < 3 450 ; 6 767 > 795 (4 chiffres
#    contre 3) ; 1 480 > 1 408 ; et le défi : 6 022 < 6 023 < 6 024 < 6 032.
#    ⭐⭐ `09b-correction` dit « **6 032 a 3 dizaines** » — c'est la phrase CORRIGÉE le 21/11
#    (elle disait « 3 centaines », et 6 032 a 0 centaine). Elle est juste : les quatre scores ont
#    tous 6 milliers et 0 centaine, ce sont bien les DIZAINES qui décident (2, 2, 2 et 3).
#    → 0 écart.
#
# Voix : manim/voix/6e-entier-comparer.json (validée le 21/11, Julie, débit −6 ; ⚠️ ses 16 WAV ont
# été régénérés DEUX fois, la dernière à 16:22 pour la correction des maths — les durées utilisées
# ici ont été relues sur les WAV, jamais recopiées d'une note) ;
# marques : manim/scripts/cm1/entier_6e_comparer_marques.json (refaites à 16:22, en phase).
# ⚠️ 11 nombres à espace sans marque (inventaire § 6bis) — mais ⭐ AUCUN `au_t()` ici : six sont
# dans les CHOIX (posés par `question_gauche`, qui ne passe pas par `au_mot`), et les quatre
# scores du défi sont la DONNÉE d'une figure, posés ensemble sur `au_mot("6 022, 6 024")`.
# Contrôle : python -X utf8 manim/poste2/verifier-avant-rendu.py manim/scripts/6e/entier_comparer.py EntierComparer6e
# Puis, ⛔ AVANT LE HD : python -X utf8 manim/poste2/verifier-zone-margo.py <le -ql> (piège n° 33).
# Sortie : manim/sorties/6e/maths/entiers/02-comparer/eleveai-maths-6e-entier-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from entier_commun import *  # noqa: E402,F403

DOSSIER_MARQUES = Path(__file__).resolve().parents[1] / "cm1"

PETIT_C = BLEU_D            # le plus petit
GRAND_C = VERT_OK           # le plus grand
PIEGE_C = ROUGE_ERREUR      # le dernier chiffre, le faux ami
NOE_C = "#60a5fa"


def chiffres_en_cases(s, fs=58, couleur=WHITE, larg=0.8, h=0.98, buff=0.1, couleurs=None):
    """Les chiffres d'un nombre, chacun dans SA case. .cases[i] / .chiffres[i], i = 0 à GAUCHE.
    ⚠️ Tout est construit DANS le groupe : un `move_to()` de l'appelant emmène bien les chiffres
    (le piège n° 14, payé sur A5). ⛔ COPIE de `entier_decomposer.py`, pas un import : ce script
    est déjà rendu, on ne partage pas (REGLES.md, « le SOURCE n'est pas le RÉSULTAT »)."""
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


def systeme(n=4, s=1.0):
    """Le ciel de Noé : une étoile et n planètes, de la plus proche à la plus lointaine.
    .astre[i] — i = 0 est la plus proche. ⚠️ Les rayons décroissent, les distances croissent."""
    etoile = VGroup(Circle(radius=0.34 * s, fill_color="#fbbf24", fill_opacity=1, stroke_width=0),
                    Circle(radius=0.5 * s, fill_color="#fbbf24", fill_opacity=0.18, stroke_width=0))
    etoile.move_to(P(-2.1 * s, 0))
    coul = ("#f97316", "#38bdf8", "#a78bfa", "#94a3b8")
    astres = VGroup()
    x = -1.1 * s
    for i in range(n):
        r = (0.26 - 0.03 * i) * s
        astres.add(Circle(radius=r, fill_color=coul[i % 4], fill_opacity=1,
                          stroke_color=WHITE, stroke_width=2).move_to(P(x, 0)))
        x += (0.78 + 0.1 * i) * s
    g = VGroup(etoile, astres)
    g.etoile, g.astre = etoile, astres
    return hors_audit(g)


def noe_ciel(s=1.0):
    """Un télescope de poche, posé à côté de Noé."""
    tube = Rectangle(width=1.15 * s, height=0.34 * s, fill_color="#1e293b", fill_opacity=1,
                     stroke_color=NOE_C, stroke_width=3).rotate(28 * DEGREES)
    pied = Line(tube.get_bottom() + DOWN * 0.05 * s, tube.get_bottom() + DOWN * 0.55 * s,
                stroke_color="#64748b", stroke_width=6)
    socle = Line(pied.get_end() + LEFT * 0.3 * s, pied.get_end() + RIGHT * 0.3 * s,
                 stroke_color="#64748b", stroke_width=6)
    return hors_audit(VGroup(tube, pied, socle))


class EntierComparerBase(PaysageEntier6e):
    nom_voix = "6e-entier-comparer"
    fichier_marques = str(DOSSIER_MARQUES / "entier_6e_comparer_marques.json")
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des nombres entiers", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Comparer des nombres entiers")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Lequel est le plus grand :", 38)
        q1 = self.ligne([(nb(2305), PETIT_C), ("ou", WHITE), (nb(2350) + " ?", GRAND_C)], 38, buff=0.24)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        ciel = systeme(4, 0.95).move_to(P(3.9, 0.35))
        self.au_mot("Lequel est le plus grand")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(ciel, scale=1.08), run_time=0.45)
        self.au_mot("2 305 ou")
        self.play(FadeIn(q1[0], shift=UP * 0.2), FadeIn(q1[1]), run_time=0.35)
        self.au_mot("2 350 ?")
        self.play(FadeIn(q1[2], shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Noé, astronome ────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        XP = 0.3
        pe = noe(0.95).move_to(P(-5.2, 0.5))
        self.au_mot("Voici Noé")
        nom = self.t("Noé", 42, NOE_C).next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est astronome")
        met = self.bloc(["astronome"], 26, NOE_C).next_to(pe, DOWN, buff=0.12)
        tel = noe_ciel(0.9).next_to(pe, RIGHT, buff=0.35).shift(DOWN * 0.25)
        l0 = self.t("Il est astronome.", 34)
        self.col(l0, 2.5, XP)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(tel, scale=1.08),
                  FadeIn(l0, shift=UP * 0.1), run_time=0.55)
        ciel = systeme(4, 0.92).move_to(P(-2.6, -1.6))
        self.au_mot("Il range les planètes")
        l1 = self.bloc(["Il range", "les planètes"], 34)
        self.col(l1, 1.3, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(ciel.etoile, scale=1.1), run_time=0.5)
        self.au_mot("de la plus proche")
        l2 = self.t("de la plus proche", 34, PETIT_C)
        self.col(l2, 0.2, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(ciel.astre[0], scale=1.3),
                  FadeIn(ciel.astre[1], scale=1.2), run_time=0.5)
        self.au_mot("à la plus lointaine")
        l3 = self.t("à la plus lointaine.", 34, GRAND_C)
        self.col(l3, -0.9, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(ciel.astre[2], scale=1.2),
                  FadeIn(ciel.astre[3], scale=1.2), run_time=0.6)
        self.attendre_voix()

    # ── 02 : on compte d'abord les chiffres ────────────────────────────────
    def ecran_chiffres(self):
        self.ecran("02-chiffres")
        XP = 0.35
        self.au_mot("Première règle")
        tit = self.ligne([("Première règle :", JAUNE_TITRE)], 36, buff=0.2)
        gauche(tit, -6.2, 3.15)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.4)
        self.au_mot("on compte les chiffres")
        l0 = self.bloc(["on compte", "les chiffres."], 36)
        self.col(l0, 2.1, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.5)
        a = chiffres_en_cases("6767", fs=54, larg=0.84, h=1.0, couleur=GRAND_C).move_to(P(-3.4, 1.0))
        b = chiffres_en_cases("795", fs=54, larg=0.84, h=1.0, couleur=PETIT_C).move_to(P(-3.4, -0.9))
        la = hors_audit(Text("4 chiffres", font_size=26, color=GRAND_C)).next_to(a, DOWN, buff=0.16)
        lb = hors_audit(Text("3 chiffres", font_size=26, color=PETIT_C)).next_to(b, DOWN, buff=0.16)
        self.au_mot("6 767 est")
        l1 = self.ligne([(nb(6767), GRAND_C), ("est", WHITE)], 36, buff=0.2)
        self.col(l1, 0.6, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(a, scale=1.06), FadeIn(la), run_time=0.6)
        self.au_mot("plus grand que")
        l2 = self.t("plus grand que", 36)
        self.col(l2, -0.4, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("795.")
        l3 = self.t(nb(795) + ".", 42, PETIT_C)
        self.col(l3, -1.4, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(b, scale=1.06), FadeIn(lb),
                  Indicate(la, color=GRAND_C, scale_factor=1.2), run_time=0.7)
        self.attendre_voix()

    # ── 03 : même longueur ? on compare de gauche à droite ─────────────────
    def ecran_gauche_droite(self):
        self.ecran("03-gauche-droite")
        XP = 0.35
        self.au_mot("Même longueur ?")
        tit = self.ligne([("Même longueur ?", JAUNE_TITRE)], 38, buff=0.2)
        gauche(tit, -6.2, 3.15)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.4)
        # ⛔ AUCUN nombre ici : la paire 2 305 / 2 350 est la QUESTION de l'écran suivant, et la
        #    montrer résolue la donnerait. Quatre cases vides suffisent à dire le geste.
        cases = chiffres_en_cases("0000", fs=54, larg=0.92, h=1.1).move_to(P(-3.4, 0.6))
        for t in cases.chiffres:
            t.set_opacity(0)
        self.au_mot("On compare")
        l0 = self.t("On compare", 36)
        self.col(l0, 1.8, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(cases.cases, scale=1.05, lag_ratio=0.1),
                  run_time=0.6)
        self.au_mot("de gauche à droite,")
        l1 = self.t("de gauche à droite,", 36, GRAND_C)
        self.col(l1, 0.8, XP)
        fl = hors_audit(Arrow(cases.cases[0].get_left() + LEFT * 0.25 + DOWN * 1.05,
                              cases.cases[3].get_right() + RIGHT * 0.25 + DOWN * 1.05,
                              buff=0, color=GRAND_C, stroke_width=7, max_tip_length_to_length_ratio=0.1))
        self.play(FadeIn(l1, shift=UP * 0.1), GrowArrow(fl), run_time=0.7)
        self.au_mot("jusqu'au premier")
        l2 = self.bloc(["jusqu'au premier"], 36)
        self.col(l2, -0.2, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("chiffre différent.")
        l3 = self.t("chiffre différent.", 36, ORANGE_RETENUE)
        self.col(l3, -1.2, XP)
        cad = cadre_ici(cases.cases[1], ORANGE_RETENUE, buff=0.07)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(cad), run_time=0.7)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        a = chiffres_en_cases(str(2305), fs=46, larg=0.72, h=0.88,
                              couleur=PETIT_C).move_to(P(-3.6, 1.9))
        b = chiffres_en_cases(str(2350), fs=46, larg=0.72, h=0.88,
                              couleur=GRAND_C).move_to(P(-3.6, 0.85))

        def autres_q(sc):
            sc.play(FadeIn(a), FadeIn(b), run_time=0.4)

        def apres(sc):
            sc.play(Create(cadre_ici(VGroup(a.cases[2], b.cases[2]), ORANGE_RETENUE, buff=0.06)),
                    run_time=0.4)

        self.question_gauche("04-question", "04b-reponse",
                             ["Quel nombre est le plus grand :", nb(2305) + " ou " + nb(2350) + " ?"],
                             [self.choix("les deux sont égaux"), self.choix(nb(2305)),
                              self.choix(nb(2350))], 2,
                             ["Même début : 2 et 3.", "Puis 5 dizaines bat 0 dizaine.",
                              "Donc " + nb(2350) + "."],
                             -0.75, mot_q="Quel nombre est le plus grand", autres_q=autres_q,
                             autres_r=apres)

    # ── 05 : le piège, s'arrêter au dernier chiffre ────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        XP = 0.35
        self.au_mot("Le piège")
        tit = self.ligne([("Le piège :", PIEGE_C), ("s'arrêter au dernier", WHITE)], 36, buff=0.22)
        gauche(tit, -6.2, 3.15)
        self.play(FadeIn(tit[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("s'arrêter au dernier")
        self.play(FadeIn(tit[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("chiffre.")
        l0 = self.t("chiffre.", 36, PIEGE_C)
        self.col(l0, 2.2, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        a = chiffres_en_cases("1408", fs=50, larg=0.8, h=0.96,
                              couleurs=[WHITE, WHITE, WHITE, PIEGE_C]).move_to(P(-3.4, 0.9))
        b = chiffres_en_cases("1480", fs=50, larg=0.8, h=0.96,
                              couleurs=[WHITE, WHITE, GRAND_C, WHITE]).move_to(P(-3.4, -0.7))
        self.au_mot("1 408 finit par 8,")
        l1 = self.ligne([(nb(1408), WHITE), ("finit par", WHITE), ("8,", PIEGE_C)], 34, buff=0.2)
        self.col(l1, 1.1, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(a, scale=1.06), run_time=0.6)
        self.play(Indicate(a.chiffres[3], color=PIEGE_C, scale_factor=1.35), run_time=0.45)
        self.au_mot("pourtant 1 480")
        l2 = self.ligne([("et pourtant", WHITE), (nb(1480), GRAND_C)], 34, buff=0.2)
        self.col(l2, 0.0, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(b, scale=1.06), run_time=0.6)
        self.au_mot("plus grand.")
        l3 = self.t("est plus grand.", 38, GRAND_C)
        self.col(l3, -1.1, XP)
        self.play(FadeIn(l3, shift=UP * 0.1),
                  Indicate(VGroup(a.chiffres[2], b.chiffres[2]), color=GRAND_C, scale_factor=1.3),
                  run_time=0.7)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = VGroup(*[chiffres_en_cases(str(v), fs=42, larg=0.66, h=0.8,
                                       couleur=c)
                     for v, c in ((12647, PETIT_C), (13547, WHITE), (13647, WHITE))])
        g.arrange(DOWN, buff=0.16).move_to(P(-3.6, 1.3))

        def autres_q(sc):
            sc.play(FadeIn(g, lag_ratio=0.12), run_time=0.5)

        def apres(sc):
            colonne = VGroup(*[x.cases[1] for x in g])
            sc.play(Create(cadre_ici(colonne, ORANGE_RETENUE, buff=0.06)), run_time=0.45)

        self.question_gauche("06-question", "06b-reponse",
                             ["Quel est le plus petit nombre :",
                              nb(12647) + ", " + nb(13547) + " ou " + nb(13647) + " ?"],
                             [self.choix(nb(13547)), self.choix(nb(12647)), self.choix(nb(13647))], 1,
                             ["Le deuxième chiffre décide :", "2 contre 3.",
                              "Donc " + nb(12647) + " est le plus petit."],
                             -0.75, mot_q="Quel est le plus petit nombre", autres_q=autres_q,
                             autres_r=apres)

    # ── 07 : croissant et décroissant ──────────────────────────────────────
    def ecran_ordre(self):
        self.ecran("07-ordre")
        XP = 0.35

        def marches(montant=True, s=1.0):
            hs = [0.5, 0.95, 1.4] if montant else [1.4, 0.95, 0.5]
            coul = GRAND_C if montant else PETIT_C
            g = VGroup(*[Rectangle(width=0.56 * s, height=h * s, fill_color=coul, fill_opacity=0.35,
                                   stroke_color=coul, stroke_width=3) for h in hs])
            g.arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
            fl = Arrow(g.get_corner(DL) + DOWN * 0.22, g.get_corner(DR) + DOWN * 0.22,
                       buff=0, color=coul, stroke_width=5, max_tip_length_to_length_ratio=0.12)
            return hors_audit(VGroup(g, fl))

        self.au_mot("Ordre croissant")
        tit = self.ligne([("Ordre croissant :", GRAND_C)], 38, buff=0.2)
        gauche(tit, -6.2, 3.15)
        m1 = marches(True, 1.1).move_to(P(-3.6, 1.2))
        self.play(FadeIn(tit, shift=UP * 0.1), FadeIn(m1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("du plus petit au plus grand.")
        l0 = self.bloc(["du plus petit", "au plus grand."], 36, GRAND_C)
        self.col(l0, 1.5, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.55)
        self.au_mot("Décroissant")
        l1 = self.t("Décroissant :", 38, PETIT_C)
        self.col(l1, -0.3, XP)
        m2 = marches(False, 1.1).move_to(P(-3.6, -1.3))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(m2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("l'inverse.")
        l2 = self.t("l'inverse.", 42, PETIT_C)
        self.col(l2, -1.3, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (réponse C) ─────────────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        trio = VGroup(*[hors_audit(Text(nb(v), font_size=40, color=c, weight=BOLD))
                        for v, c in ((3405, WHITE), (3045, WHITE), (3450, WHITE))])
        # ⛔ VU SEULEMENT À L'IMAGE (aperçu du 22/11) : à y = −0,6, la rangée corrigée et sa flèche
        #    tombaient SUR la phrase d'explication, dont le haut est fixé à −0,75 par le 7ᵉ
        #    argument de `question_gauche` — on lisait « 3 045 3 405 3 450 » par-dessus
        #    « Croissant va du plus petit ». ⭐ Toute la figure doit finir AU-DESSUS de ce haut.
        trio.arrange(DOWN, buff=0.3).move_to(P(-3.6, 1.95))
        bon = VGroup(*[hors_audit(Text(nb(v), font_size=40, color=GRAND_C, weight=BOLD))
                       for v in (3045, 3405, 3450)])
        bon.arrange(RIGHT, buff=0.42).move_to(P(-3.6, 0.3))
        fl = hors_audit(Arrow(bon.get_left() + LEFT * 0.2 + DOWN * 0.6,
                              bon.get_right() + RIGHT * 0.2 + DOWN * 0.6, buff=0,
                              color=GRAND_C, stroke_width=5, max_tip_length_to_length_ratio=0.08))

        def autres_q(sc):
            sc.play(FadeIn(trio, lag_ratio=0.12), run_time=0.5)

        def apres(sc):
            sc.play(FadeIn(bon, shift=UP * 0.15, lag_ratio=0.15), GrowArrow(fl), run_time=0.7)

        self.question_gauche("08-question", "08b-reponse",
                             ["Quel rangement est croissant ?"],
                             [self.choix(nb(3405) + " ; " + nb(3045) + " ; " + nb(3450)),
                              self.choix(nb(3450) + " ; " + nb(3405) + " ; " + nb(3045)),
                              self.choix(nb(3045) + " ; " + nb(3405) + " ; " + nb(3450))], 2,
                             ["Croissant va du plus petit", "au plus grand : " + nb(3045) + ",",
                              "puis " + nb(3405) + ", puis " + nb(3450) + "."],
                             -0.75, mot_q="Quel rangement est croissant", autres_q=autres_q,
                             autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    SCORES = (6022, 6024, 6023, 6032)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Quatre scores")
        l0 = self.t("Quatre scores :", 38).move_to(P(-0.1, 2.2))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        cartes = VGroup()
        for v in self.SCORES:
            c = VGroup(RoundedRectangle(width=2.0, height=0.92, corner_radius=0.12, fill_color=CASE,
                                        fill_opacity=0.55, stroke_color=JAUNE_TITRE, stroke_width=4))
            c.add(Text(nb(v), font_size=40, color=JAUNE_TITRE, weight=BOLD).move_to(c[0]))
            cartes.add(c)
        cartes.arrange(RIGHT, buff=0.3).move_to(P(-0.1, 0.9))
        hors_audit(cartes)
        # ⭐ Les quatre scores sont la DONNÉE du défi : WinRT n'a marqué que le premier, et les
        #    trois autres n'ont pas de marque (inventaire § 6bis). Ils arrivent donc ENSEMBLE à
        #    leur marque commune, comme les trois totaux de A2 — c'est l'exception « données
        #    d'une figure qu'on LIT » de REGLES.md, pas une réponse montrée en avance.
        self.au_mot("6 022, 6 024")
        self.play(FadeIn(cartes, scale=1.06, lag_ratio=0.22), run_time=1.1)
        # ⚠️ « Range-les » (8,54 s) et « du plus petit » (9,08 s) ne sont séparés que de 0,54 s :
        #    `verifier-avant-rendu.py` annonce un RETARD probable (son seuil est 0,6 s, il ne
        #    connaît pas le `run_time`). Avec 0,3 s de fondu, le premier est posé à 8,84 s, avant
        #    le mot suivant. ⭐ MESURÉ au dry run : 0 RETARD (piège n° 32 du REPRISE).
        self.au_mot("Range-les")
        l1 = self.t("Range-les", 38, ORANGE_RETENUE).move_to(P(-0.1, -0.6))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("du plus petit au plus grand.")
        q = self.t("du plus petit au plus grand.", 40, ORANGE_RETENUE).move_to(P(-0.1, -1.5))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(cartes), run_time=0.8)
        self.pause_defi(y=-2.6)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        # ⭐⭐ La phrase CORRIGÉE du 21/11 : « 6 032 a 3 DIZAINES » (elle disait « 3 centaines »,
        #    et 6 032 a 0 centaine). Les quatre scores ont tous 6 milliers et 0 centaine : c'est
        #    bien le rang des dizaines qui décide (2, 2, 2 et 3). ⛔ Ne pas « corriger » en sens
        #    inverse : l'écran dit ce que la voix dit, et la voix est juste.
        g = chiffres_en_cases("6032", fs=58, larg=0.95, h=1.15,
                              couleurs=[WHITE, WHITE, GRAND_C, WHITE]).move_to(P(-3.5, 1.2))
        self.au_mot("6 032 a")
        l0 = self.ligne([(nb(6032), JAUNE_TITRE), ("a", WHITE)], 38, buff=0.2)
        self.col(l0, 1.9, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g, scale=1.06), run_time=0.6)
        self.au_mot("3 dizaines")
        l1 = self.t("3 dizaines :", 40, GRAND_C)
        self.col(l1, 0.9, 0.35)
        cad = cadre_ici(g.cases[2], GRAND_C, buff=0.06)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cad),
                  Indicate(g.chiffres[2], color=GRAND_C, scale_factor=1.35), run_time=0.7)
        self.au_mot("c'est le plus grand.")
        l2 = self.t("c'est le plus grand.", 38)
        self.col(l2, -0.1, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Dans l'ordre")
        l3 = self.t("Dans l'ordre :", 36, JAUNE_TITRE)
        self.col(l3, -1.0, 0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        ordre = VGroup(*[hors_audit(Text(nb(v), font_size=36, color=GRAND_C, weight=BOLD))
                         for v in (6022, 6023, 6024, 6032)])
        ordre.arrange(RIGHT, buff=0.46).move_to(P(-0.1, -2.5))
        self.au_mot("6 022, 6 023, 6 024,")
        self.play(FadeIn(ordre[0], scale=1.1), FadeIn(ordre[1], scale=1.1),
                  FadeIn(ordre[2], scale=1.1), lag_ratio=0.2, run_time=0.8)
        self.au_mot("puis 6 032.")
        self.play(FadeIn(ordre[3], scale=1.2),
                  Circumscribe(ordre, color=GRAND_C, buff=0.12), run_time=0.9)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        # ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de ~3,6 unités de large, BORD.
        fig = chiffres_en_cases("2350", fs=34, larg=0.66, h=0.78, buff=0.08,
                                couleurs=[WHITE, WHITE, GRAND_C, WHITE])
        lignes = self.finale_gauche(fig, textes=[
            ("On compte les chiffres,", "puis on compare de gauche à droite."),
            ("Jamais", "par la fin.")], fs=30)
        self.add(fig)
        self.au_mot("On compte les chiffres,")
        self.montrer_ligne(lignes[0], Indicate(fig.cases, scale_factor=1.05))
        self.au_mot("Jamais")
        self.montrer_ligne(lignes[1], Indicate(fig.chiffres[3], color=PIEGE_C, scale_factor=1.3))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_chiffres()
        self.ecran_gauche_droite()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_ordre()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierComparer6e(EntierComparerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
