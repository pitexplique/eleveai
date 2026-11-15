# solides_faces.py
# EleveAI — Maths CM2 — série « Solides », épisode 03 : LES FACES D'UN SOLIDE
# (micro solide_face, notion solide), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Un cran au-dessus du CE2 (décrire, faces de la pyramide : vidéos CE2 par `aussi`) : la FORME et les
# MESURES de chaque face (pavé 10 × 6 × 4 : faces par paires), prisme, cylindre et boule (faces plates).
# Short jumeau : film (la boîte à chaussures, 6 couleurs : réponse A).
# Décor et métier : Victor, CHOCOLATIER (boîtes en chocolat décorées face par face ; centres : cuisine,
# metiers-artisanat).
# Mapping micro → écrans : 02 (pavé : 6 rectangles, 3 paires face à face), 03 (mesures de chaque paire,
# rectangles dessinés à l'échelle), 04 (prisme à base triangulaire : 2 triangles + 3 rectangles),
# 06 (piège : cylindre = 2 disques, surface courbe ; boule = aucune face plate),
# questions 05 (cube de 3 cm : 6 carrés, rép. C) et 07 (dessus du pavé 8 × 5 × 2 : 8 sur 5, rép. B),
# défi 08 (pyramide à base pentagonale : 1 pentagone + 5 triangles = 6 étiquettes).
# Voix : manim/voix/cm2-solides-faces.json (validée le 15/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/solides_faces.py SolidesFacesCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/solides_faces.py SolidesFacesCM2 -o eleveai-maths-cm2-solides-faces --media_dir manim/scripts/cm2/media-sol-03
# Sortie : manim/sorties/cm2/maths/solides/03-faces/eleveai-maths-cm2-solides-faces.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_cm2_commun import *  # noqa: E402,F403

CHOCO = "#8b4513"      # chocolat au lait
CHOCO_T = "#fde68a"    # les arêtes (sucre glace)
PAIRE = ["#facc15", FACE_C, "#a78bfa"]   # dessus/dessous, devant/derrière, côtés
PAIRES = [(3, 2), (0, 1), (4, 5)]        # indices des faces de pave() : dessus/dessous, devant/derrière, g/d

_face_onglet = Solide.face


def _face_ronde(self, *a, **k):
    """La face surlignée, jointures ARRONDIES : à l'angle aigu (prisme, pyramide), la jointure
    en onglet du trait de 6 faisait une pointe qui dépassait du solide (aperçu du 15/11)."""
    m = _face_onglet(self, *a, **k)
    for f in m.get_family():
        f.joint_type = LineJointType.ROUND
    return m


Solide.face = _face_ronde  # (dans ce rendu seulement : le commun CE2 ne change pas)


def boite(L=10, h=4, p=6, e=0.3, centre=ORIGIN, couleur=CHOCO):
    return pave(L * e, h * e, p * e, centre=centre, couleur=couleur, couleur_trait=CHOCO_T)


def barre(e=1.0, centre=ORIGIN):
    """La barre de chocolat : prisme à base triangulaire couché (bases à gauche et à droite)."""
    a = 1.3
    return prisme([(0, 0), (a, 0), (a / 2, a * 0.87)], 2.6, axe="z", e=e, centre=centre, couleur="#a0522d",
                  couleur_trait=CHOCO_T)


def rect_plat(w, h, couleur, s=0.1):
    return Rectangle(width=w * s, height=h * s, fill_color=couleur, fill_opacity=0.85, stroke_color=WHITE,
                     stroke_width=3)


def etoile(c, r=0.16):
    return Star(5, outer_radius=r, inner_radius=r * 0.45, fill_color="#fde047", fill_opacity=1,
                stroke_width=0).move_to(c)


class SolidesFacesBase(PaysageSolidesCM2):
    nom_voix = "cm2-solides-faces"
    fichier_marques = "solides_faces_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """Choix longs (« 6 carrés de 3 cm de côté ») : la colonne part 0,75 plus à gauche et les
        cartes s'élargissent d'autant (comme SolidesPatronBase au CM1) : la coche ne touche pas."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = 0.75
        for m in (tete, q, pause):
            m.shift(LEFT * d)
        for c in cartes:
            cadre, ligne = c[0], c[1]
            neuf = RoundedRectangle(width=cadre.width + d, height=cadre.height, corner_radius=0.14,
                                    stroke_color=cadre.get_stroke_color(), stroke_width=cadre.get_stroke_width(),
                                    fill_color=cadre.get_fill_color(), fill_opacity=cadre.get_fill_opacity())
            neuf.align_to(cadre, RIGHT).align_to(cadre, UP)
            cadre.become(neuf)
            ligne.shift(LEFT * d)
        return tete, q, cartes, pause, rebours, ph

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les faces d'un solide", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les faces d'un solide")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        b = boite(e=0.32, centre=P(3.9, 0.6))
        q = self.bloc(["Combien de faces,", "et de quelles formes ?"], 40)
        gauche(q, -6.2, 0.6)
        self.au_mot("Combien de faces")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(b, shift=UP * 0.3),
                  *[FadeIn(b.face(k, PAIRE[i], 0.55)) for i, (k, _) in enumerate(PAIRES[:2])],
                  FadeIn(b.face(5, PAIRE[2], 0.55)), run_time=0.6)
        self.au_mot("de quelles formes")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    def ecran_situation(self):
        self.ecran("01-situation")
        vp = victor(1.0).move_to(P(-5.3, 0.2))
        self.au_mot("Voici Victor")
        nom = self.t("Victor", 42, BLEU_CALCUL).next_to(vp, UP, buff=0.2)
        self.play(FadeIn(vp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("chocolatier")
        met = self.t("chocolatier", 30, BLEU_CALCUL).next_to(vp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        b = boite(e=0.3, centre=P(-1.0, 0.9))
        b2 = barre(0.75, P(3.4, 1.0))
        self.au_mot("des boîtes en chocolat")
        self.play(FadeIn(b, shift=DOWN * 0.2), FadeIn(b2, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("il décore chaque face")
        deco = VGroup(*[etoile(b.centre_face(k)) for k in range(6) if b.vue_face[k]],
                      *[etoile(b2.centre_face(k), 0.13) for k in range(5) if b2.vue_face[k]])
        self.play(LaggedStart(*[FadeIn(d, scale=0.3) for d in deco], lag_ratio=0.2), run_time=0.7)
        self.au_mot("combien de faces, et de quelles formes")
        q = self.t("Combien de faces, et de quelles formes ?", 36, JAUNE_TITRE).move_to(P(-0.5, -2.3))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le pavé, 6 rectangles par paires ───────────────────────────────
    def ecran_pave(self):
        self.ecran("02-pave")
        b = boite(e=0.33, centre=P(-3.7, 0.4))
        self.add(b)
        x = 0.2
        self.au_mot("un pavé droit")
        l0 = self.t("Un pavé droit :", 36, JAUNE_TITRE)
        gauche(l0, x, 2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = VGroup(self.t("6 faces,", 32), self.t("toutes des rectangles.", 32))
        gauche(l1[0], x, 1.85)
        gauche(l1[1], x + 0.4, 1.25)
        tout = VGroup(*[b.face(k, "#fb923c", 0.45) for k in range(6)])
        self.aux_extraits([VGroup(l1[0], tout)], ["6 faces"])
        self.aux_extraits([l1[1]], ["toutes des rectangles"])
        self.play(FadeOut(tout), run_time=0.25)
        l2 = self.bloc(["Elles vont par paires :", "chaque face a une jumelle", "juste en face."], 30)
        gauche(l2, x, 0.0)
        self.au_mot("Elles vont par paires")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("chaque face a une jumelle")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("juste en face")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("exactement pareille")
        surl = VGroup()
        for i, (a, c) in enumerate(PAIRES):
            fa, fc = b.face(a, PAIRE[i], 0.6), b.face(c, PAIRE[i], 0.6)
            surl.add(fa, fc)
            self.play(FadeIn(fa), FadeIn(fc), run_time=0.3)
        g = self.gros("3 paires de faces", couleur=VERT_OK, fs=36)
        gauche(g, x + 0.2, -1.6)
        self.aux_extraits([g], ["3 paires de faces"])
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : les mesures de chaque paire ────────────────────────────────────
    def ecran_mesures(self):
        self.ecran("03-mesures")
        e = 0.3
        b = boite(e=e, centre=P(-3.4, 0.5))
        self.add(b)
        p = b.p2
        cl = self.t("10 cm", 30, JAUNE_TITRE).next_to(Line(p[0], p[1]), DOWN, buff=0.2)
        cp = self.t("6 cm", 30, JAUNE_TITRE).move_to((p[1] + p[5]) / 2 + P(0.55, -0.15))
        ch = self.t("4 cm", 30, JAUNE_TITRE).next_to(Line(p[0], p[3]), LEFT, buff=0.2)
        self.aux_extraits([VGroup(cl, b.arete_ab(0, 1))], ["10 centimètres de long"])
        self.aux_extraits([VGroup(cp, b.arete_ab(1, 5))], ["6 de large"])
        self.aux_extraits([VGroup(ch, b.arete_ab(0, 3))], ["4 de haut"])
        x = 0.2
        rangs = [("Dessus, dessous :", "10 sur 6", (10, 6), "Le dessus et le dessous", "dessous : 10 sur 6"),
                 ("Devant, derrière :", "10 sur 4", (10, 4), "Le devant et le derrière", "derrière : 10 sur 4"),
                 ("Les deux côtés :", "6 sur 4", (6, 4), "Les deux côtés", "côtés : 6 sur 4")]
        prec = VGroup()
        for i, (txt, mes, (w, h), mot, ex) in enumerate(rangs):
            y = 2.5 - 1.35 * i
            lg = self.ligne([(txt, PAIRE[i]), (mes, WHITE)], 32, buff=0.25)
            gauche(lg, x, y)
            fa, fc = b.face(PAIRES[i][0], PAIRE[i], 0.65), b.face(PAIRES[i][1], PAIRE[i], 0.65)
            r1, r2 = rect_plat(w, h, PAIRE[i], 0.09), rect_plat(w, h, PAIRE[i], 0.09)
            VGroup(r1, r2).arrange(RIGHT, buff=0.3)
            gauche(VGroup(r1, r2), x + 0.3, y - 0.65)
            self.au_mot(mot)
            self.play(FadeIn(lg[0], shift=UP * 0.1), FadeIn(fa), FadeIn(fc), FadeOut(prec), run_time=0.3)
            self.aux_extraits([VGroup(lg[1], r1, r2)], [ex])
            prec = VGroup(fa, fc)
        self.attendre_voix()

    # ── 04 : le prisme à base triangulaire ──────────────────────────────────
    def ecran_prisme(self):
        self.ecran("04-prisme")
        br = barre(1.45, P(-3.6, 0.4))
        x = 0.2
        self.au_mot("un prisme à base triangulaire")
        l0 = self.bloc(["Un prisme", "à base triangulaire"], 34, JAUNE_TITRE)
        gauche(l0, x, 2.45)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(br, shift=UP * 0.2), run_time=0.4)
        self.au_mot("comme certaines barres de chocolat")
        l1 = self.t("(une barre de chocolat)", 28, CHOCO_T)
        gauche(l1, x, 1.45)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        tri = VGroup(*[Triangle(fill_color=BASE_C, fill_opacity=0.85, stroke_color=WHITE, stroke_width=3)
                       .scale(0.32) for _ in range(2)]).arrange(RIGHT, buff=0.2)
        rec = VGroup(*[Rectangle(width=0.9, height=0.45, fill_color=LAT_C, fill_opacity=0.85, stroke_color=WHITE,
                                 stroke_width=3) for _ in range(3)]).arrange(RIGHT, buff=0.2)
        l2 = VGroup(self.t("2 faces en triangle :", 32, BASE_C), self.t("les bases,", 32, BASE_C))
        gauche(l2[0], x, 0.75)
        gauche(l2[1], x + 0.4, 0.15)
        tri.next_to(l2[1], RIGHT, buff=0.4)
        bases = VGroup(br.face(0, BASE_C, 0.75), br.face(1, BASE_C, 0.75))
        self.aux_extraits([VGroup(l2[0], tri, bases)], ["2 faces en triangle"])
        self.aux_extraits([l2[1]], ["les bases"])
        l3 = self.t("+ 3 faces rectangles", 32, LAT_C)
        gauche(l3, x, -0.55)
        gauche(rec, x + 0.4, -1.15)
        lat = VGroup(*[br.face(k, LAT_C, 0.6) for k in (2, 3, 4)])
        self.aux_extraits([VGroup(l3, rec, lat)], ["3 faces rectangles"])
        g = self.gros("= 5 faces en tout", couleur=VERT_OK, fs=32)
        gauche(g, x, -2.0)
        self.aux_extraits([g], ["5 faces en tout"])
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cu = cube(1.5, e=1.0, centre=P(-4.4, 1.3), couleur=CHOCO, couleur_trait=CHOCO_T)
        ca = self.t("3 cm", 28, JAUNE_TITRE).next_to(Line(cu.pt(0), cu.pt(1)), DOWN, buff=0.12)
        hors_audit(ca)

        def autres_q(sc):
            sc.play(FadeIn(cu, shift=UP * 0.2), FadeIn(ca), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, ["Un cube : 6 faces,"], fs=32, y0=-1.4, pas=0.6)
            sc.aux_extraits([VGroup(lg, *[cu.face(k, "#fb923c", 0.45) for k in range(6)])], [("Un cube a 6 faces", 1, 0.5)])
            lg1 = sc.rep_bas(1, ["toutes des carrés pareils."], fs=32, y0=-1.4, pas=0.6)
            sc.au_mot("toutes des carrés pareils")
            sc.play(FadeIn(lg1), run_time=0.3)
            lg2 = sc.rep_bas(2, ["6 carrés de 3 cm de côté."], fs=32, y0=-1.4, pas=0.6)
            sc.aux_extraits([lg2], ["6 carrés de 3 centimètres de côté"])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Un cube a des arêtes de 3 cm.", "Quelles sont ses faces ?"],
                            [self.choix("6 rectangles de 3 sur 6", 26), self.choix("4 carrés et 2 rectangles", 26),
                             self.choix("6 carrés de 3 cm de côté", 26)], 2,
                            ["Un cube : 6 faces,", "toutes des carrés pareils.", "6 carrés de 3 cm de côté."],
                            mot_q="Un cube a des arêtes", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        cy = Cylindre(0.75, 1.5, centre=P(-4.9, 0.85), couleur=CHOCO, couleur_trait=CHOCO_T)
        bo = Boule(0.7, centre=P(-4.9, -1.85), couleur="#a0522d", couleur_trait=CHOCO_T)
        x = -3.3
        self.au_mot("Le cylindre n'a que 2 faces plates")
        l0 = self.t("Le cylindre n'a que 2 faces plates :", 32)
        gauche(l0, x, 1.95)
        self.play(FadeIn(cy), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        l1 = self.t("2 disques.", 32, FACE_C)
        gauche(l1, x + 0.4, 1.3)
        self.aux_extraits([VGroup(l1, cy.disque_haut(), cy.disque_bas())], ["2 disques"])
        l2 = self.t("La surface qui l'entoure est courbe :", 32, ORANGE_RETENUE)
        gauche(l2, x, 0.45)
        courbe = cy.corps.copy().set_fill(ORANGE_RETENUE, 0.75)
        self.au_mot("La surface")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(courbe), run_time=0.3)
        self.au_mot("ce n'est pas une face plate")
        l3 = self.t("ce n'est pas une face plate.", 32, ORANGE_RETENUE)
        gauche(l3, x + 0.4, -0.2)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("la boule n'a aucune face plate")
        l4 = self.t("La boule : aucune face plate.", 32, ROUGE_ERREUR)
        gauche(l4, x, -1.85)
        self.play(FadeIn(bo, shift=UP * 0.2), FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = boite(8, 2, 5, e=0.27, centre=P(-4.0, 1.5))
        p = b.p2
        cl = self.t("8 cm", 26, JAUNE_TITRE).next_to(Line(p[0], p[1]), DOWN, buff=0.12)
        cp = self.t("5 cm", 26, JAUNE_TITRE).next_to((p[1] + p[5]) / 2, DR, buff=0.1)  # 15/11 : touchait l arête oblique
        ch = self.t("2 cm", 26, JAUNE_TITRE).next_to(Line(p[0], p[3]), LEFT, buff=0.12)
        cot = VGroup(cl, cp, ch)
        for m in cot:
            hors_audit(m)

        def autres_q(sc):
            sc.play(FadeIn(b, shift=UP * 0.2), FadeIn(cot), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, ["Dessus : longueur et largeur,"], fs=30, y0=-1.4, pas=0.6)
            sc.aux_extraits([VGroup(lg, b.face(3, PAIRE[0], 0.7))], ["Le dessus"])
            lg1 = sc.rep_bas(1, ["8 cm", "sur 5 cm."], fs=30, buff=0.18, y0=-1.4, pas=0.6)
            sc.aux_extraits(lg1, ["8 centimètres", ("centimètres sur 5", 1, 0.95)])
            lg2 = sc.rep_bas(2, [("8 sur 2 :", PAIRE[1]), ("devant et derrière ;", PAIRE[1])], fs=30, buff=0.18,
                             y0=-1.4, pas=0.6)
            sc.aux_extraits([lg2[0], VGroup(lg2[1], b.face(0, PAIRE[1], 0.7))], ["de 8 sur 2", "devant et derrière"])
            lg3 = sc.rep_bas(3, [("5 sur 2 :", PAIRE[2]), ("sur les côtés.", PAIRE[2])], fs=30, buff=0.18,
                             y0=-1.4, pas=0.6)
            sc.aux_extraits([lg3[0], VGroup(lg3[1], b.face(5, PAIRE[2], 0.7))], ["de 5 sur 2", "sur les côtés"])
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Une boîte en pavé : 8 cm de long,", "5 cm de large, 2 cm de haut.",
                             "Mesures de la face du dessus ?"],
                            [self.choix("8 sur 2"), self.choix("8 sur 5"), self.choix("5 sur 2")], 1,
                            ["Le dessus : longueur et largeur,", "8 cm sur 5 cm.", "8 sur 2 : devant et derrière ;",
                             "5 sur 2 : sur les côtés."],
                            mot_q="Une boîte en pavé", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def pyr(self, e=1.0, centre=ORIGIN):
        return pyramide(5, 1.1, 1.7, e=e, centre=centre, couleur=CHOCO, couleur_trait=CHOCO_T)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        py = self.pyr(1.3, P(-4.4, 0.4))
        l0 = self.bloc(["Victor colle une étiquette sur", "chaque face d'une boîte en pyramide."], 32)
        gauche(l0, -2.2, 1.9)
        self.au_mot("Victor colle une")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("chaque face")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(py, shift=UP * 0.2), run_time=0.4)
        l1 = self.ligne([("Sa base a", WHITE), ("5 côtés.", WHITE)], 32, buff=0.2)
        gauche(l1, -2.2, 0.85)
        self.au_mot("Sa base a")
        self.play(FadeIn(l1[0]), FadeIn(py.face(0, BASE_C, 0.6)), run_time=0.3)
        self.aux_extraits([l1[1]], ["5 côtés"])
        self.au_mot("Combien d'étiquettes, et de quelles formes")
        q = self.bloc(["Combien d'étiquettes,", "et de quelles formes ?"], 36, JAUNE_TITRE)
        gauche(q, -2.2, -0.4)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, -2.2, -1.75)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        py = self.pyr(1.25, P(-4.6, 0.3))
        self.add(py)
        x = -2.2
        l0 = self.ligne([("La base :", BASE_C), ("1 pentagone.", BASE_C)], 32, buff=0.2)
        gauche(l0, x, 2.2)
        pent = RegularPolygon(5, fill_color=BASE_C, fill_opacity=0.85, stroke_color=WHITE, stroke_width=3) \
            .scale(0.42).rotate(PI / 2 - PI / 2)
        pent.next_to(l0, RIGHT, buff=0.4)
        self.au_mot("La base")
        self.play(FadeIn(l0[0]), FadeIn(py.face(0, BASE_C, 0.6)), run_time=0.3)
        self.aux_extraits([VGroup(l0[1], pent)], ["1 pentagone"])
        l1 = self.bloc(["Puis un triangle", "sur chaque côté de la base :"], 30, SOMMET_C)
        gauche(l1, x, 1.15)
        self.au_mot("Puis un triangle")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("sur chaque côté de la base")
        self.play(FadeIn(l1[1], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(py.face(k, SOMMET_C, 0.55)) for k in range(1, 6)], lag_ratio=0.2),
                  run_time=0.8)
        l2 = self.t("5 triangles.", 32, SOMMET_C)
        gauche(l2, x + 0.4, 0.2)
        tris = VGroup(*[Triangle(fill_color=SOMMET_C, fill_opacity=0.85, stroke_color=WHITE, stroke_width=3)
                        .scale(0.28) for _ in range(5)]).arrange(RIGHT, buff=0.15)
        tris.next_to(l2, RIGHT, buff=0.4)
        self.aux_extraits([VGroup(l2, tris)], ["5 triangles. 6"])
        g = self.gros("6 étiquettes", couleur=VERT_OK, fs=38)
        gauche(g, x, -0.85)
        self.aux_extraits([g], ["6 étiquettes"])
        l3 = self.ligne([("1 pentagone", BASE_C), ("et 5 triangles.", SOMMET_C)], 32, buff=0.2)
        gauche(l3, x + 0.3, -1.75)
        self.aux_extraits(l3, ["1 pentagone et", ("5 triangles.", 2)])
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        b = boite(e=0.24)
        for i, (a, c) in enumerate(PAIRES):
            b.add(b.face(a, PAIRE[i], 0.55))
        lignes = self.finale_gauche(b, textes=[
            ("Décrire les faces : combien,", "et de quelle forme."),
            ("Le pavé : 6 rectangles,", "par paires face à face."),
            ("Le prisme : 2 bases", "et des rectangles."),
            ("La pyramide : 1 base", "et des triangles.")], fs=30, x_fig=-4.9, xl=-2.5)
        self.add(b)
        self.au_mot("Pour décrire les faces")
        self.montrer_ligne(lignes[0])
        self.au_mot("Le pavé")
        self.montrer_ligne(lignes[1])
        self.au_mot("Le prisme")
        self.montrer_ligne(lignes[2])
        self.au_mot("La pyramide")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_pave()
        self.ecran_mesures()
        self.ecran_prisme()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class SolidesFacesCM2(SolidesFacesBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
