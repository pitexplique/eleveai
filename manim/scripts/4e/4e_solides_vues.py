# 4e_solides_vues.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode S2 : LES VUES D'UN SOLIDE
# (micro vision_vues, notion vision_espace), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Karim, ARCHITECTE — la maquette d'une maison (centres art-design, histoire-geographie).
# Mapping micro → écrans : 02 (une vue est une ombre : le cylindre donne un rectangle de face, un disque
# de dessus), 03 (les trois vues de la maison), 04 (une seule vue ne suffit presque jamais),
# 06 (piège : une vue ne montre pas la profondeur), questions 05 (A : un cylindre) et 07 (C : un cône),
# défi 08 (un cylindre posé sur un pavé : la vue de face, la vue de dessus, et combien de vues il faut).
# Voix : manim/voix/4e-solides-vues.json ; marques : 4e_solides_vues_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_solides_vues.py SolidesVues4e
# Sortie : manim/sorties/4e/maths/solides/16-solides-vues/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import pave, cylindre, cone, pyramide, karim, Paysage4e, PRI_FACE  # noqa: E402

VUE_C = "#f8fafc"
TOIT_C, MUR_C = "#c084fc", "#e2e8f0"


def maison(L, p, h_mur, h_toit, u, o, sw=4):
    """La maquette : un pavé (les murs) coiffé d'une pyramide (le toit). o = coin avant-bas-gauche."""
    mur = pave(L, p, h_mur, u, o, face=MUR_C, dessus="#cbd5e1", cote="#94a3b8", bord="#475569", sw=sw)
    toit = pyramide(L, h_toit, u, mur.pt(0, 0, h_mur), prof=p, face=TOIT_C, cote_c="#7e22ce", sw=sw)
    g = VGroup(mur, toit)
    g.mur, g.toit = mur, toit
    return g


def cadre_vue(contenu, titre, u=1.0, taille=1.9, couleur=VUE_C):
    """Un cadre carré de « papier », avec son titre dessous, qui contient une vue (contour blanc)."""
    c = Square(side_length=taille, stroke_color="#475569", stroke_width=3,
               fill_color="#0f172a", fill_opacity=0.85)
    contenu.move_to(c.get_center())
    t = hors_audit(Text(titre, font_size=24, color=couleur, weight=BOLD)).next_to(c, DOWN, buff=0.12)
    g = VGroup(c, contenu, t)
    g.cadre, g.contenu, g.titre = c, contenu, t
    return g


class SolidesVues4e(Paysage4e):
    nom_voix = "4e-solides-vues"
    fichier_marques = "4e_solides_vues_marques.json"
    ceinture = "verte"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les vues d'un solide", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les vues d'un solide")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Que voit-on de face,", "de dessus, de côté ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        m = maison(1.6, 1.1, 1.0, 0.9, 0.75, P(2.2, -1.5))
        self.au_mot("Que voit-on de face")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(m, scale=0.85), run_time=0.5)
        self.au_mot("de dessus, de côté")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(m, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = karim(1.0).move_to(P(-5.2, 0.3))
        self.au_mot("Voici Karim")
        nom = self.t("Karim", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est architecte")
        met = self.t("architecte", 28, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = 1.5
        l1 = self.bloc(["Avant de construire", "une maquette,"], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Avant de construire une maquette")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        l2 = self.ligne([("il dessine trois vues :", JAUNE_TITRE)], 30)
        self.col(l2, 1.1, x)
        self.au_mot("il dessine trois vues")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        vs = VGroup(
            cadre_vue(Rectangle(width=1.0, height=0.7, color=VUE_C, stroke_width=4), "de face", taille=1.5),
            cadre_vue(Rectangle(width=1.0, height=0.7, color=VUE_C, stroke_width=4), "de dessus", taille=1.5),
            cadre_vue(Rectangle(width=0.7, height=0.7, color=VUE_C, stroke_width=4), "de côté", taille=1.5))
        vs.arrange(RIGHT, buff=0.35).move_to(P(-1.4, -1.9))
        self.au_mot("de face, de dessus, de côté")
        self.play(LaggedStart(*[FadeIn(v, shift=UP * 0.2) for v in vs], lag_ratio=0.2), run_time=0.9)
        l3 = self.bloc(["Un ouvrier qui n'a jamais vu", "la maison doit pouvoir", "la fabriquer."], 28, WHITE)
        self.col(l3, -0.3, x)
        self.au_mot("Un ouvrier qui n'a jamais vu")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 02 : une vue est une ombre ──────────────────────────────────────────
    def ecran_ombre(self):
        self.ecran("02-l-ombre")
        u = 1.0
        cy = cylindre(0.7, 1.7, u, P(-5.2, -1.3), corps=PRI_FACE, dessus="#7dd3fc", bord="#0c4a6e")
        self.add(cy)
        self.au_mot("Une vue, c'est une ombre")
        tit = self.t("Une vue, c'est une ombre", 42, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        x = -1.3
        l1 = self.bloc(["On aplatit le solide", "sur un plan, et on garde", "seulement le contour."], 30, WHITE)
        self.col(l1, 1.8, x)
        self.au_mot("On aplatit le solide")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.55)
        vf = cadre_vue(Rectangle(width=1.0, height=1.3, color=VUE_C, stroke_width=4), "de face", taille=1.8)
        vd = cadre_vue(Circle(radius=0.55, color=VUE_C, stroke_width=4), "de dessus", taille=1.8)
        vf.move_to(P(1.5, -1.5))
        vd.move_to(P(4.3, -1.5))
        l2 = self.ligne([("Un cylindre debout :", PRI_FACE), ("de face, un rectangle.", VUE_C)], 30, buff=0.18)
        self.col(l2, 0.3, x)
        self.au_mot("Un cylindre debout")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(cy, color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.45)
        self.au_mot("de face, un rectangle")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(vf, shift=UP * 0.2), run_time=0.55)
        l3 = self.t("De dessus, un disque.", 30, VUE_C)
        self.col(l3, -0.6, x)
        self.au_mot("De dessus, un disque")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(vd, shift=UP * 0.2),
                  Indicate(cy.haut, color=JAUNE_TITRE, scale_factor=1.1), run_time=0.6)
        self.attendre_voix()

    # ── 03 : les trois vues de la maison ────────────────────────────────────
    def ecran_trois_vues(self):
        self.ecran("03-trois-vues")
        m = maison(1.6, 1.1, 1.0, 0.9, 0.85, P(-6.0, -1.6))
        self.add(m)
        self.au_mot("La maison de Karim")
        tit = self.t("Les trois vues", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        def face_vue():
            r = Rectangle(width=1.1, height=0.6, color=VUE_C, stroke_width=4)
            t = Polygon(r.get_corner(UL), r.get_corner(UR), r.get_top() + UP * 0.5,
                        color=VUE_C, stroke_width=4)
            return VGroup(r, t)
        def cote_vue():
            r = Rectangle(width=0.75, height=0.6, color=VUE_C, stroke_width=4)
            t = Polygon(r.get_corner(UL), r.get_corner(UR), r.get_top() + UP * 0.5,
                        color=VUE_C, stroke_width=4)
            return VGroup(r, t)
        vf = cadre_vue(face_vue(), "de face", taille=1.9).move_to(P(-1.2, 0.8))
        vd = cadre_vue(Rectangle(width=1.1, height=0.8, color=VUE_C, stroke_width=4), "de dessus",
                       taille=1.9).move_to(P(1.4, 0.8))
        vc = cadre_vue(cote_vue(), "de côté", taille=1.9).move_to(P(4.0, 0.8))
        self.au_mot("un pavé surmonté d'un toit")
        self.play(Indicate(m.mur, color=MUR_C, scale_factor=1.05),
                  Indicate(m.toit, color=TOIT_C, scale_factor=1.05), run_time=0.6)
        self.au_mot("De face, un rectangle et un triangle")
        self.play(FadeIn(vf, shift=UP * 0.2), run_time=0.6)
        self.au_mot("De dessus, un rectangle")
        self.play(FadeIn(vd, shift=UP * 0.2), run_time=0.55)
        self.au_mot("De côté, un rectangle et un triangle plus étroit")
        self.play(FadeIn(vc, shift=UP * 0.2), run_time=0.6)
        self.attendre_voix()

    # ── 04 : une seule vue ne suffit pas ────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        self.au_mot("Une seule vue ne suffit presque jamais")
        tit = self.t("Une seule vue ne suffit pas", 42, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        vf = cadre_vue(Rectangle(width=1.1, height=1.4, color=VUE_C, stroke_width=4), "de face",
                       taille=2.0).move_to(P(-4.3, 0.9))
        pv = pave(1.2, 0.9, 1.5, 0.75, P(0.3, -0.6))
        cy = cylindre(0.6, 1.5, 0.75, P(4.2, -0.6), corps=PRI_FACE, dessus="#7dd3fc", bord="#0c4a6e")
        x = -4.3
        l1 = self.ligne([("De face,", VUE_C), ("un rectangle :", VUE_C)], 30, buff=0.18)
        self.col(l1, -1.3, x + 1.6)
        self.au_mot("De face, un rectangle")
        self.play(FadeIn(vf, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.6)
        l2 = self.bloc(["c'est peut-être un pavé,", "peut-être un cylindre."], 30, WHITE)
        self.col(l2, -2.2, x + 1.6)
        self.au_mot("peut-être un pavé")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(pv, shift=UP * 0.2), run_time=0.6)
        self.au_mot("peut-être un cylindre")
        self.play(FadeIn(cy, shift=UP * 0.2), run_time=0.5)
        l3 = self.bloc(["Il faut la vue de dessus", "pour trancher."], 32, JAUNE_TITRE)
        self.col(l3, 1.5, 0.9)
        self.au_mot("Il faut la vue de dessus")
        self.play(FadeIn(l3, scale=1.1), run_time=0.55)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        vd = cadre_vue(Circle(radius=0.5, color=VUE_C, stroke_width=4), "de dessus", taille=1.6)
        vf = cadre_vue(Rectangle(width=0.9, height=1.1, color=VUE_C, stroke_width=4), "de face", taille=1.6)
        vs = VGroup(vd, vf).arrange(RIGHT, buff=0.5).move_to(P(-4.6, 0.8))

        def avant_q(sc):
            sc.play(FadeIn(vs), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Quel solide ?"],
                             [self.choix("un cylindre"), self.choix("un cône"), self.choix("une boule")], 0,
                             ["Un cylindre debout.", "Le cône donnerait", "un triangle de face."],
                             -0.3, mot_q="Question", avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        vf = cadre_vue(Rectangle(width=1.0, height=1.2, color=VUE_C, stroke_width=4), "de face",
                       taille=1.8).move_to(P(-5.0, 0.6))
        self.add(vf)
        x = -1.6
        l1 = self.bloc(["Une vue ne montre pas", "la profondeur."], 32, ROUGE_ERREUR)
        self.col(l1, 1.8, x)
        self.au_mot("Une vue ne montre pas la profondeur")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.55)
        pv = pave(1.1, 0.8, 1.3, 0.7, P(-5.6, -2.6))
        pv2 = pave(1.1, 2.2, 1.3, 0.7, P(-2.6, -2.6))
        l2 = self.bloc(["Deux solides très différents", "peuvent avoir la même", "vue de face."], 30, WHITE)
        self.col(l2, 0.4, x)
        self.au_mot("Deux solides très différents")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(pv, shift=UP * 0.2), FadeIn(pv2, shift=UP * 0.2),
                  run_time=0.7)
        l3 = self.bloc(["C'est pour ça qu'on en", "dessine toujours plusieurs."], 32, VERT_OK)
        self.col(l3, -1.1, x)
        self.au_mot("C'est pour ça")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tri = Polygon(P(-0.5, -0.5), P(0.5, -0.5), P(0, 0.6), color=VUE_C, stroke_width=4)
        vf = cadre_vue(tri, "de face", taille=1.6)
        vd = cadre_vue(Circle(radius=0.5, color=VUE_C, stroke_width=4), "de dessus", taille=1.6)
        vs = VGroup(vf, vd).arrange(RIGHT, buff=0.5).move_to(P(-4.6, 0.8))

        def avant_q(sc):
            sc.play(FadeIn(vs), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Quel solide ?"],
                             [self.choix("une pyramide"), self.choix("un prisme"), self.choix("un cône")], 2,
                             ["Un cône.", "La pyramide donnerait", "un carré de dessus,",
                              "jamais un disque."],
                             -0.3, mot_q="Question", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def tour(self, u=0.8, o=P(-5.4, -2.2)):
        pv = pave(1.8, 1.2, 0.9, u, o)
        cy = cylindre(0.45, 1.5, u, pv.pt(0.9, 0.6, 0.9), corps=PRI_FACE, dessus="#7dd3fc", bord="#0c4a6e")
        g = VGroup(pv, cy)
        g.pave, g.cyl = pv, cy
        return g

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        t = self.tour()
        x = 0.8
        l0 = self.bloc(["Karim pose un cylindre debout", "sur un pavé."], 32, WHITE)
        self.col(l0, 1.9, x)
        self.au_mot("Karim pose un cylindre")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(t, shift=UP * 0.2), run_time=0.7)
        l1 = self.bloc(["Dessine ce qu'il voit de face,", "puis de dessus."], 32, VUE_C)
        self.col(l1, 0.6, x)
        self.au_mot("Dessine ce qu'il voit de face")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        l2 = self.bloc(["Et combien de vues faut-il", "pour ne pas se tromper ?"], 32, JAUNE_TITRE)
        self.col(l2, -0.7, x)
        self.au_mot("combien de vues il faut")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        self.pause_defi(y=-2.4)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        t = self.tour(u=0.62, o=P(-6.0, -1.3))
        self.add(t)
        def vue_face():
            bas = Rectangle(width=1.2, height=0.5, color=VUE_C, stroke_width=4)
            haut = Rectangle(width=0.45, height=0.75, color=VUE_C, stroke_width=4)
            haut.next_to(bas, UP, buff=0)
            return VGroup(bas, haut)
        def vue_dessus():
            r = Rectangle(width=1.2, height=0.8, color=VUE_C, stroke_width=4)
            d = Circle(radius=0.26, color=VUE_C, stroke_width=4).move_to(r.get_center())
            return VGroup(r, d)
        vf = cadre_vue(vue_face(), "de face", taille=2.0).move_to(P(-2.2, 0.9))
        vd = cadre_vue(vue_dessus(), "de dessus", taille=2.0).move_to(P(0.9, 0.9))
        x = 2.9
        self.au_mot("De face : un rectangle large")
        self.play(FadeIn(vf, shift=UP * 0.2), run_time=0.6)
        l1 = self.bloc(["un rectangle large,", "un rectangle étroit", "au-dessus."], 28, VUE_C)
        self.col(l1, 1.4, x)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("De dessus : le rectangle du pavé")
        self.play(FadeIn(vd, shift=UP * 0.2), run_time=0.6)
        l2 = self.bloc(["le rectangle du pavé,", "avec un disque", "au milieu."], 28, VUE_C)
        self.col(l2, -0.1, x)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Deux vues suffisent ici")
        res = self.bloc(["Deux vues suffisent :", "la vue de dessus", "montre le disque."], 32, VERT_OK)
        self.col(res, -2.1, 0.0)
        self.play(FadeIn(res, scale=1.1), run_time=0.6)
        self.insister(res, 1.05, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        m = maison(1.4, 1.0, 0.9, 0.8, 0.72, ORIGIN)
        lignes = self.finale_gauche(m, textes=[
            ("Une vue est une ombre :", "elle aplatit le solide."),
            ("Une seule vue", "ne suffit presque jamais."),
            ("De face, de dessus, de côté :", "ensemble, elles décrivent le solide.")], fs=28)
        self.add(m)
        self.au_mot("Une vue est une ombre")
        self.montrer_ligne(lignes[0], Indicate(m, color=JAUNE_TITRE, scale_factor=1.05))
        self.au_mot("Une seule vue")
        self.montrer_ligne(lignes[1])
        self.au_mot("De face, de dessus")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ombre()
        self.ecran_trois_vues()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
