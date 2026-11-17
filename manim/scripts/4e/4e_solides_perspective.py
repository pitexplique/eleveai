# 4e_solides_perspective.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode S3 : LA PERSPECTIVE CAVALIÈRE
# (micro vision_representation, notion vision_espace), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Vidéo COMMUNE avec la 3e (micro `volume_representation`) : à brancher par `aussi`.
# Décor et métier : Maya, DESSINATRICE DE BD — une planche de manga (centres art-design, cinema-series).
# Mapping micro → écrans : 02 (la face de devant en vraie grandeur), 03 (les fuyantes : parallèles,
# de même longueur, réduites), 04 (les arêtes cachées en pointillés), 06 (piège : on ne mesure jamais
# une fuyante sur le dessin), questions 05 (C : en vraie grandeur) et 07 (B : en pointillés),
# défi 08 (un pavé 4 × 2 profond de 3, fuyantes réduites de moitié : 1,5 cm, et trois pointillés).
# Voix : manim/voix/4e-solides-perspective.json ; marques : 4e_solides_perspective_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_solides_perspective.py SolidesPerspective4e
# Sortie : manim/sorties/4e/maths/solides/17-solides-perspective/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import point3, maya, Paysage4e  # noqa: E402

ARETE_C = "#f8fafc"      # le trait plein : ce qu'on voit
FACE_C = "#38bdf8"       # la face de devant (en vraie grandeur)
FUY_C = "#facc15"        # les fuyantes (réduites)
CACHE_C = "#f472b6"      # les arêtes cachées (pointillés)


def fil_cavaliere(l, p, h, u, o=ORIGIN, face=FACE_C, arete=ARETE_C, fuy=FUY_C, cache=CACHE_C, sw=5, op=0.22):
    """Un pavé DESSINÉ en perspective cavalière, comme sur le cahier : la face de devant en vraie
    grandeur (trait plein), les trois fuyantes visibles (parallèles entre elles, de même longueur,
    réduites par le coefficient 0,5 de point3), les deux arêtes visibles du fond, et les TROIS
    arêtes cachées en pointillés. o = le coin avant-bas-gauche.
    Attributs : .face .fuy (les 3 fuyantes visibles) .arr (le fond visible) .caches (les 3
    pointillées ; caches[0] est la quatrième fuyante, celle qu'on ne voit pas) .pt(x, y, z) .coins"""
    q = lambda x, y, z: point3(o, u, x, y, z)  # noqa: E731
    A, B, C, D = q(0, 0, 0), q(l, 0, 0), q(l, 0, h), q(0, 0, h)
    Ap, Bp, Cp, Dp = q(0, p, 0), q(l, p, 0), q(l, p, h), q(0, p, h)
    f = Polygon(A, B, C, D, fill_color=face, fill_opacity=op, stroke_color=arete, stroke_width=sw)
    fu = VGroup(Line(B, Bp), Line(C, Cp), Line(D, Dp)).set_stroke(fuy, sw)
    ar = VGroup(Line(Bp, Cp), Line(Cp, Dp)).set_stroke(arete, sw)
    ca = VGroup(DashedLine(A, Ap, dash_length=0.1), DashedLine(Ap, Bp, dash_length=0.1),
                DashedLine(Ap, Dp, dash_length=0.1)).set_stroke(cache, sw * 0.8)
    v = VGroup(f, ca, fu, ar)
    v.face, v.fuy, v.arr, v.caches = f, fu, ar, ca
    v.pt, v.u, v.o = q, u, o
    v.coins = (A, B, C, D, Ap, Bp, Cp, Dp)
    return v


def case_manga(w=3.4, h=2.6):
    """Une case de planche : le cadre, et dedans une chambre dessinée en volume
    (le mur du fond, ses fuyantes, et un lit en pavé). Attributs : .cadre .chambre"""
    cadre = RoundedRectangle(width=w, height=h, corner_radius=0.08, stroke_color=ARETE_C,
                             stroke_width=4, fill_color="#0b1220", fill_opacity=0.95)
    c = cadre.get_center()
    fond = Rectangle(width=w * 0.46, height=h * 0.42, stroke_color=ARETE_C,
                     stroke_width=3).move_to(c + UP * h * 0.06)
    coins_f = [fond.get_corner(d) for d in (UL, UR, DR, DL)]
    coins_c = [c + np.array([sx * w * 0.44, sy * h * 0.40, 0.0])
               for sx, sy in ((-1, 1), (1, 1), (1, -1), (-1, -1))]
    fuyantes = VGroup(*[Line(a, b) for a, b in zip(coins_f, coins_c)]).set_stroke(FUY_C, 2.5)
    lit = fil_cavaliere(1.0, 0.6, 0.34, 0.50, c + np.array([-w * 0.32, -h * 0.34, 0.0]), sw=3, op=0.45)
    g = VGroup(cadre, fond, fuyantes, lit)
    g.cadre, g.chambre = cadre, VGroup(fond, fuyantes, lit)
    return g


class SolidesPerspective4e(Paysage4e):
    nom_voix = "4e-solides-perspective"
    fichier_marques = "4e_solides_perspective_marques.json"
    ceinture = "verte"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La perspective cavalière", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("La perspective cavalière")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment dessiner un solide", "à plat sans mentir ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        cu = fil_cavaliere(1.5, 1.2, 1.5, 0.8, P(2.6, -1.6))
        self.au_mot("Comment dessiner un solide")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(cu, scale=0.85), run_time=0.5)
        self.au_mot("à plat sans mentir")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(cu.face, color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = maya(1.0).move_to(P(-5.1, 0.3))
        self.au_mot("Voici Maya")
        nom = self.t("Maya", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle dessine des mangas")
        # ⛔ RIEN NE DOIT ÊTRE ROGNÉ : « dessinatrice de BD » en 26 sortait du cadre à gauche (BORD).
        met = self.t("dessinatrice de BD", 20, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        x = -2.4
        cm = case_manga(3.2, 2.4).move_to(P(4.6, -1.7))
        l1 = self.bloc(["Dans sa case, il y a", "une chambre vue en volume."], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Dans sa case")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(cm.cadre), run_time=0.25)
        self.au_mot("une chambre vue en volume")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(cm.chambre, shift=UP * 0.15), run_time=0.55)
        l2 = self.bloc(["Elle utilise la même méthode", "qu'en mathématiques :"], 30, WHITE)
        self.col(l2, 0.9, x)
        self.au_mot("Elle utilise la même méthode")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        l3 = self.t("la perspective cavalière.", 34, JAUNE_TITRE)
        self.col(l3, -0.2, x)
        self.au_mot("la perspective cavalière")
        self.play(FadeIn(l3, scale=1.1), run_time=0.5)
        self.insister(l3, 1.06, 0.25)
        self.attendre_voix()

    # ── 02 : la face de devant, en vraie grandeur ───────────────────────────
    def ecran_face(self):
        self.ecran("02-la-face")
        u = 1.0
        cu = fil_cavaliere(1.6, 1.3, 1.6, u, P(-5.6, -1.6))
        self.au_mot("La face de devant")
        tit = self.t("La face de devant", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), FadeIn(cu.face), run_time=0.55)
        x = -1.9
        l1 = self.t("se dessine en vraie grandeur.", 32, VERT_OK)
        self.col(l1, 1.9, x)
        self.au_mot("se dessine en vraie grandeur")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(cu.face, color=FACE_C, scale_factor=1.06),
                  run_time=0.55)
        self.au_mot("Un cube de 3 centimètres")
        self.play(FadeIn(cu.fuy), FadeIn(cu.arr), FadeIn(cu.caches), run_time=0.5)
        a3 = hors_audit(sur_fond(self.t("3 cm", 26, FUY_C))).next_to(cu.face, DOWN, buff=0.12)
        self.play(FadeIn(a3), run_time=0.35)
        carre = Square(side_length=1.6 * u, stroke_color=FACE_C, stroke_width=6,
                       fill_color=FACE_C, fill_opacity=0.22).move_to(P(2.0, 0.1))
        c1 = sur_fond(self.t("3 cm", 26, FACE_C)).next_to(carre, DOWN, buff=0.14)
        c2 = sur_fond(self.t("3 cm", 26, FACE_C)).next_to(carre, LEFT, buff=0.14)
        self.au_mot("un carré de 3 centimètres")
        self.play(TransformFromCopy(cu.face, carre), run_time=0.7)
        self.play(FadeIn(c1), FadeIn(c2), run_time=0.35)
        l2 = self.t("sans déformation.", 34, VERT_OK)
        self.col(l2, -2.2, x)
        self.au_mot("sans déformation")
        self.play(FadeIn(l2, scale=1.15), run_time=0.45)
        self.insister(l2, 1.08, 0.25)
        self.attendre_voix()

    # ── 03 : les fuyantes ───────────────────────────────────────────────────
    def ecran_fuyantes(self):
        self.ecran("03-les-fuyantes")
        u = 1.0
        cu = fil_cavaliere(1.6, 1.4, 1.6, u, P(-5.8, -1.5))
        self.add(cu.face)
        self.au_mot("les fuyantes")
        tit = self.t("Les fuyantes", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), Create(cu.fuy), run_time=0.7)
        x = -2.0
        pts = VGroup(*[Dot(c, radius=0.075, color=FUY_C) for c in cu.coins[:4]])
        l1 = self.t("Elles partent de chaque sommet,", 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Elles partent de chaque sommet")
        self.play(FadeIn(l1, shift=UP * 0.1),
                  LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.2), run_time=0.8)
        l2 = self.t("toutes parallèles entre elles,", 30, FUY_C)
        self.col(l2, 1.0, x)
        self.au_mot("toutes parallèles entre elles")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(cu.fuy, color=WHITE, scale_factor=1.0), run_time=0.6)
        l3 = self.t("toutes de la même longueur.", 30, FUY_C)
        self.col(l3, 0.1, x)
        self.au_mot("toutes de la même longueur")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        # ⭐ Deux morceaux : « Et cette longueur » se dit 0,8 s avant « RÉDUITE ». Posés ensemble,
        #    le gabarit les attendait au mot le plus tardif et comptait « cette » en TARD.
        l4 = self.ligne([("Et cette longueur", ORANGE_Q), ("est réduite :", ORANGE_Q)], 32, buff=0.18)
        self.col(l4, -1.0, x)
        self.au_mot("Et cette longueur")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("RÉDUITE")
        self.play(FadeIn(l4[1], scale=1.15), run_time=0.4)
        self.insister(l4[1], 1.08, 0.25)
        l5 = self.bloc(["ce qui fuit n'est pas dessiné", "en vraie grandeur."], 30, WHITE)
        self.col(l5, -2.2, x)
        self.au_mot("ce qui fuit")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 04 : les arêtes cachées ─────────────────────────────────────────────
    def ecran_cachees(self):
        self.ecran("04-les-cachees")
        u = 1.0
        cu = fil_cavaliere(1.7, 1.4, 1.7, u, P(-5.8, -1.6))
        self.add(cu.face, cu.fuy, cu.arr)
        x = -1.6
        # ⭐ Une ligne par play : « arêtes » est dit AVANT « se dessinent en pointillés », donc en
        #    posant les deux lignes ensemble le gabarit attend le mot le plus tardif → TARD.
        #    Et le TITRE, qui redit « arêtes », part dans le MÊME play que la première ligne.
        tit = self.t("Les arêtes cachées", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        l1 = self.bloc(["Les arêtes qu'on ne voit pas", "se dessinent en pointillés."], 32, CACHE_C)
        self.col(l1, 1.7, x)
        self.au_mot("les arêtes qu'on ne voit pas")
        self.play(Write(tit), FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("se dessinent en pointillés")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(cu.caches), run_time=0.7)
        l2 = self.t("Elles existent,", 32, WHITE)
        self.col(l2, 0.4, x)
        self.au_mot("Elles existent")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(cu.caches, color=WHITE, scale_factor=1.0), run_time=0.6)
        l3 = self.bloc(["mais le solide les cache :", "le dessin le dit quand même."], 32, VERT_OK)
        self.col(l3, -1.0, x)
        self.au_mot("mais le solide les cache")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.55)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cu = fil_cavaliere(1.3, 1.1, 1.3, 0.85, P(-6.0, 0.75))

        def avant_q(sc):
            sc.play(FadeIn(cu), run_time=0.45)

        self.question_gauche("05-question", "05b-reponse",
                             ["La face de devant", "est dessinée…"],
                             [self.choix("plus petite"), self.choix("en losange"),
                              self.choix("en vraie grandeur")], 2,
                             ["La face de devant", "garde ses vraies mesures.", "Ce sont les fuyantes",
                              "qui sont réduites."],
                             # ⛔ pas de mot_q : le gabarit fait DÉJÀ au_mot("Question") avant la
                             # tête, puis mot_q 0,4 s plus tard → RETARD de 0,40 s à chaque question.
                             -0.3, avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 0.95
        cu = fil_cavaliere(1.7, 1.6, 1.3, u, P(-6.0, -2.5))
        self.add(cu)
        x = -1.9
        l1 = self.bloc(["Sur le dessin, deux arêtes", "de même longueur réelle"], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Sur le dessin")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        l2 = self.bloc(["peuvent être dessinées", "de longueurs différentes."], 32, ROUGE_ERREUR)
        self.col(l2, 0.8, x)
        self.au_mot("peuvent être dessinées")
        self.play(FadeIn(l2, shift=UP * 0.1),
                  Indicate(cu.face, color=FACE_C, scale_factor=1.04),
                  Indicate(cu.fuy, color=FUY_C, scale_factor=1.0), run_time=0.7)
        l3 = self.bloc(["On ne mesure jamais une", "fuyante sur le dessin pour",
                        "en déduire une vraie longueur."], 30, VERT_OK)
        self.col(l3, -0.9, x)
        self.au_mot("On ne mesure jamais")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        cu = fil_cavaliere(1.3, 1.1, 1.3, 0.85, P(-6.0, 0.75))
        cu.caches.set_stroke(opacity=0.35)

        def avant_q(sc):
            sc.play(FadeIn(cu), run_time=0.45)

        self.question_gauche("07-question", "07b-reponse",
                             ["Les arêtes cachées", "se dessinent…"],
                             [self.choix("en gras"), self.choix("en pointillés"),
                              self.choix("pas du tout")], 1,
                             ["En pointillés.", "Si on ne les dessinait pas,", "on ne saurait plus que le",
                              "solide est fermé derrière."],
                             -0.3, avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 1.0
        pv = fil_cavaliere(2.0, 1.5, 1.0, u, P(-6.0, -2.3))
        x = -2.8
        l0 = self.t("Maya dessine un pavé :", 32, WHITE)
        self.col(l0, 2.0, x)
        self.au_mot("Maya dessine un pavé")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pv, shift=UP * 0.2), run_time=0.7)
        l1 = self.ligne([("4 cm", BASE_C), ("sur 2 cm,", BASE_C), ("profond de 3 cm.", HAUTEUR_C)],
                        32, buff=0.18)
        self.col(l1, 1.0, x)
        self.au_mot("4 centimètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("sur 2")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("profond de 3 centimètres")
        self.play(FadeIn(l1[2], shift=UP * 0.1), Indicate(pv.fuy, color=FUY_C, scale_factor=1.0),
                  run_time=0.5)
        l2 = self.t("Les fuyantes sont réduites de moitié.", 30, FUY_C)
        self.col(l2, 0.0, x)
        self.au_mot("réduit les fuyantes de moitié")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        l3 = self.bloc(["Quelle longueur fait la fuyante", "sur le papier, et combien",
                        "d'arêtes sont en pointillés ?"], 32, JAUNE_TITRE)
        self.col(l3, -1.3, x)
        self.au_mot("Quelle longueur fait la fuyante")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.6)
        self.pause_defi(y=-3.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 1.0
        pv = fil_cavaliere(2.0, 1.5, 1.0, u, P(-6.0, -2.3))
        self.add(pv)
        x = -2.8
        l1 = self.ligne([("La fuyante :", FUY_C), ("3", BLEU_D), ("÷ 2", BLEU_D), ("= 1,5 cm", VERT_OK)],
                        32, buff=0.18)
        self.col(l1, 2.0, x)
        self.au_mot("La fuyante")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 divisé")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("par 2")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,5 centimètre")
        self.play(FadeIn(l1[3], scale=1.15), Indicate(pv.fuy, color=FUY_C, scale_factor=1.0), run_time=0.5)
        # ⛔ Le gabarit attend DÉJÀ, à chaque play, que tous les mots du texte neuf soient dits
        #    (SynchroJ2._attente) : une ligne qui parle du « sommet du fond » décale tout le groupe.
        #    Donc une ligne par play, et AUCUN au_mot derrière (il serait compté en retard).
        l2 = self.bloc(["Les arêtes cachées : celles", "du sommet du fond."], 30, CACHE_C)
        self.col(l2, 0.6, x)
        self.au_mot("Les arêtes cachées")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(pv.caches), run_time=0.45)
        pt = Dot(pv.coins[4], radius=0.09, color=CACHE_C)
        self.play(FadeIn(l2[1], shift=UP * 0.1), GrowFromCenter(pt), run_time=0.4)
        res = self.gros("trois arêtes en pointillés", fs=42)
        res.move_to(P(1.1, -1.9))
        self.au_mot("il y en a trois")
        self.play(FadeIn(res, scale=1.12), run_time=0.55)
        self.insister(res, 1.06, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        cu = fil_cavaliere(1.4, 1.2, 1.4, 0.8, ORIGIN)
        lignes = self.finale_gauche(cu, textes=[
            ("La face de devant", "est en vraie grandeur."),
            ("Les fuyantes sont parallèles,", "de même longueur, et réduites."),
            ("Les arêtes cachées", "sont en pointillés.")], fs=28)
        self.add(cu)
        self.au_mot("La face de devant")
        self.montrer_ligne(lignes[0], Indicate(cu.face, color=FACE_C, scale_factor=1.06))
        self.au_mot("Les fuyantes sont parallèles")
        self.montrer_ligne(lignes[1], Indicate(cu.fuy, color=FUY_C, scale_factor=1.0))
        self.au_mot("Les arêtes cachées")
        self.montrer_ligne(lignes[2], Indicate(cu.caches, color=CACHE_C, scale_factor=1.0))
        self.attendre_voix(marge=1.0)

    def _carte_choix(self, lettre, txt, largeur, fs):
        """⛔ La carte d'un choix, avec la PLACE DU ✓ au bout. Le socle étire le libellé
        jusqu'à 0,4 du bord et pose le ✓ à 0,4 du bord DROIT : sur « en vraie grandeur »
        il touchait le « r » (mesuré à l'image : écart 0 px, le seul des 20 paysages de
        4e — les 39 autres cartes vont de 18 à 500 px). `BORDS=1` ne voit rien.
        ⚠️ En paysage la carte vient de `_carte_choix`, PAS de `_carte` : surcharger
        `_carte` ici ne ferait rien du tout, et ça ne se verrait qu'à l'image.
        Surcharge locale et non dans `pythagore_pauses.py`, que les autres séries du
        site utilisent."""
        c = super()._carte_choix(lettre, txt, largeur, fs)
        cadre, ligne = c
        if ligne.width > largeur - 1.0:
            ligne.scale_to_fit_width(largeur - 1.0).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return c

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_face()
        self.ecran_fuyantes()
        self.ecran_cachees()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
