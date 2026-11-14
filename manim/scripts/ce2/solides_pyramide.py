# solides_pyramide.py
# EleveAI — Maths CE2 — série « Solides et espace », épisode 03 : LES FACES D'UNE PYRAMIDE
# (micro ce2_solide_faces_pyramide, notion solides), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Vidéo COMMUNE : sert aussi au CM1 (`aussi`).
# Short jumeau : film Ti Margo (les pots de peinture : 4 triangles, et le carré du dessous ; réponse A).
# Décor et métier : Amina, ARCHÉOLOGUE (maquette en carton d'une pyramide d'Égypte ;
# centre : histoire-geographie).
# Mapping micro → écrans : 02 (les triangles qui montent), 03 (la base), 04 (4 + 1 = 5 faces),
# 06 (piège : on oublie la base), 07 (autant de triangles que de côtés à la base),
# questions 05 (des triangles, rép. C) et 08 (base à 5 côtés : 5 triangles, rép. A),
# défi 09 (base triangulaire : 3 + 1 = 4 faces, toutes des triangles).
# ⚠️ On ne demande jamais « combien de triangles » pour la base triangulaire (4, pas 3) : on dit
# « combien de faces » ou « combien de triangles MONTENT vers la pointe ».
# Voix : manim/voix/ce2-solides-pyramide.json (validée le 14/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/solides_pyramide.py SolidesPyramideCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/solides_pyramide.py SolidesPyramideCE2 -o eleveai-maths-ce2-solides-pyramide --media_dir manim/scripts/ce2/media-sol-03
# Sortie : manim/sorties/ce2/maths/solides/03-pyramide/eleveai-maths-ce2-solides-pyramide.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_ce2_commun import *  # noqa: E402,F403

TRI = "#facc15"      # les triangles qui montent
BASE = "#38bdf8"     # la base
SABLE = "#e4b363"


def maquette(n=4, e=1.5, centre=ORIGIN, h=1.4, cote=1.3):
    return pyramide(n, cote, h, e=e, centre=centre, couleur=CARTON, couleur_trait="#fef3c7")


def triangle_plat(s=0.9, couleur=TRI):
    return Triangle(fill_color=couleur, fill_opacity=0.85, stroke_color=WHITE, stroke_width=3).scale(s * 0.6)


def carre_plat(s=0.9, couleur=BASE):
    return Square(s, fill_color=couleur, fill_opacity=0.85, stroke_color=WHITE, stroke_width=3)


class SolidesPyramideBase(PaysageSolidesCE2):
    nom_voix = "ce2-solides-pyramide"
    fichier_marques = "solides_pyramide_marques.json"

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les faces d'une pyramide", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les faces d'une pyramide")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        py = maquette(4, 1.6, P(3.8, 0.5))
        q = self.bloc(["Une pyramide, est-ce", "seulement des triangles ?"], 40)
        q.move_to(P(0, 0.5)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Une pyramide")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(py, shift=UP * 0.3), run_time=0.6)
        self.au_mot("seulement des triangles")
        self.play(FadeIn(q[1], shift=UP * 0.2), *[FadeIn(py.face(k, TRI, 0.45)) for k in range(1, 5) if py.vue_face[k]], run_time=0.5)
        self.attendre_voix(marge=0.6)

    def egypte(self, centre):
        c = np.array(centre)
        ciel = Rectangle(width=3.6, height=2.4, fill_color="#7dd3fc", fill_opacity=1, stroke_width=0).move_to(c)
        sable = Rectangle(width=3.6, height=0.7, fill_color=SABLE, fill_opacity=1, stroke_width=0) \
            .move_to(c + DOWN * 0.85)
        py = Polygon(c + P(-1.2, -0.5), c + P(0.9, -0.5), c + P(-0.2, 0.9), fill_color="#d6a15c", fill_opacity=1,
                     stroke_width=0)
        py2 = Polygon(c + P(-0.2, 0.9), c + P(0.9, -0.5), c + P(1.25, -0.3), fill_color="#a16207", fill_opacity=1,
                      stroke_width=0)
        soleil = Circle(radius=0.3, fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(c + P(1.2, 0.75))
        return VGroup(ciel, sable, soleil, py2, py)

    def ecran_situation(self):
        self.ecran("01-situation")
        ap = amina(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Amina")
        nom = self.t("Amina", 42, BLEU_CALCUL).next_to(ap, UP, buff=0.2)
        self.play(FadeIn(ap, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("archéologue")
        met = self.t("archéologue", 30, BLEU_CALCUL).next_to(ap, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        eg = self.egypte(P(-1.2, 1.2))
        self.au_mot("les monuments très anciens")
        self.play(FadeIn(eg, shift=UP * 0.2), run_time=0.5)
        py = maquette(4, 1.4, P(3.4, 1.0))
        self.au_mot("une maquette en carton")
        l1 = self.t("une maquette en carton", 28, CARTON).next_to(py, DOWN, buff=0.3)
        self.play(TransformFromCopy(eg[4], py), FadeIn(l1), run_time=0.8)
        self.au_mot("Quelles formes")
        q = self.t("Quelles formes doit-elle découper ?", 36, JAUNE_TITRE).move_to(P(0.6, -2.4))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les triangles qui montent ──────────────────────────────────────
    def ecran_triangles(self):
        self.ecran("02-triangles")
        py = maquette(4, 2.0, P(-3.6, 0.4))
        self.add(py)
        self.au_mot("Les faces qui montent")
        l0 = self.bloc(["Les faces qui montent vers la", "pointe sont des triangles."], 28, TRI)
        gauche(l0, 0.4, 2.55)
        self.play(FadeIn(l0, shift=UP * 0.1), Flash(py.pt(4), color=SOMMET_C), run_time=0.5)
        ordre = [1, 2, 3, 4]  # devant, droite, derrière, gauche
        surl = [py.face(k, TRI, 0.5) for k in ordre]
        plats = VGroup(*[triangle_plat(1.0) for _ in range(4)]).arrange(RIGHT, buff=0.3)
        gauche(plats, 0.8, 0.6)
        objs = [VGroup(s, p) for s, p in zip(surl, plats)]
        nums = [p.get_bottom() + DOWN * 0.35 for p in plats]
        self.compter(objs, ["1, 2", "2, 3", "3, 4", "4. 4"], numeros=nums)
        self.au_mot("4 triangles.")
        g = self.gros("4 triangles", couleur=TRI, fs=44)
        gauche(g, 0.8, -1.4)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la base ────────────────────────────────────────────────────────
    def ecran_base(self):
        self.ecran("03-base")
        py = maquette(4, 2.0, P(-3.6, 0.4))
        self.add(py)
        self.au_mot("la pyramide est posée sur une base")
        l0 = self.bloc(["Mais la pyramide est posée", "sur une base."], 30)
        gauche(l0, 0.4, 2.55)
        sol = Line(P(-6.3, py.get_bottom()[1]), P(-0.9, py.get_bottom()[1]), color="#64748b", stroke_width=4)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(sol), run_time=0.4)
        self.au_mot("la base est un carré")
        l1 = self.t("Ici, la base est un carré.", 30, BASE)
        gauche(l1, 0.4, 1.3)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(py.face(0, BASE, 0.6)), run_time=0.5)
        self.au_mot("Amina découpe aussi un carré")
        c = carre_plat(1.3)
        gauche(c, 1.0, -0.4)
        self.play(FadeIn(c, scale=0.6), run_time=0.4)
        self.au_mot("pour le dessous")
        l2 = self.t("pour le dessous", 30, BASE).next_to(c, RIGHT, buff=0.3)
        self.play(FadeIn(l2, shift=LEFT * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 04 : 4 + 1 = 5 faces ────────────────────────────────────────────────
    def ecran_total(self):
        self.ecran("04-total")
        py = maquette(4, 1.8, P(-4.0, 1.2))
        self.add(py)
        tris = VGroup(*[triangle_plat(0.9) for _ in range(4)]).arrange(RIGHT, buff=0.2)
        car = carre_plat(0.95)
        gauche(tris, 0.0, 2.3)
        car.next_to(tris, RIGHT, buff=0.5)
        lg = self.ligne([("4 triangles", TRI), ("+ 1 carré", BASE), ("= 5 faces", VERT_OK)], 36, buff=0.3)
        gauche(lg, -2.2, -0.45)
        self.aux_extraits([lg[0]], ["4 triangles"])
        self.play(FadeIn(tris, shift=UP * 0.1), run_time=0.35)
        self.aux_extraits([lg[1]], ["1 carré"])
        self.play(FadeIn(car, shift=UP * 0.1), run_time=0.35)
        self.aux_extraits([lg[2]], ["5 faces. La"])
        self.au_mot("La pyramide à base carrée a 5 faces")
        g = self.bloc(["La pyramide à base carrée", "a 5 faces."], 40, VERT_OK)
        gauche(g, -3.0, -2.0)
        self.play(FadeIn(g, scale=1.1), run_time=0.4)
        self.insister(g, 1.08, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        py = maquette(4, 1.4, P(-4.3, 1.2))

        def autres_q(sc):
            sc.play(FadeIn(py, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            sc.play(*[FadeIn(py.face(k, TRI, 0.5)) for k in range(1, 5)], run_time=0.4)
            sc.rep_lignes(["Les faces qui montent", "vers la pointe sont", "toujours des triangles."],
                          ["Les faces qui montent", "vers la pointe", "toujours des triangles"])

        self.question_pause("05-question", "05b-reponse",
                            ["De quelle forme sont les faces", "qui montent vers la pointe", "d'une pyramide ?"],
                            [self.choix("des carrés"), self.choix("des disques"), self.choix("des triangles")], 2,
                            ["Les faces qui montent vers la pointe", "sont toujours des triangles."],
                            mot_q="De quelle forme", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        py = maquette(4, 1.8, P(-3.6, 0.3))
        self.au_mot("On dit souvent")
        l0 = self.bloc(["On dit souvent : « une pyramide,", "ce sont des triangles. »"], 28)
        gauche(l0, -0.6, 2.1)
        self.play(FadeIn(py), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("on oublie la base")
        l1 = self.t("Mais on oublie la base !", 34, ROUGE_ERREUR)
        gauche(l1, -0.2, 0.9)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Retourne la pyramide")
        inv = pyramide(4, 1.3, -1.4, e=1.8, centre=P(-3.6, 0.3), couleur=CARTON, couleur_trait="#fef3c7")
        self.play(Rotate(py, PI, axis=RIGHT), run_time=0.8)
        self.remove(py)
        self.add(inv)
        self.au_mot("dessous, il y a")
        l2 = self.t("Dessous, il y a un carré.", 34, BASE)
        gauche(l2, -0.2, -0.3)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(inv.face(0, BASE, 0.7)), run_time=0.5)
        self.attendre_voix()

    # ── 07 : la base donne son nom ──────────────────────────────────────────
    def ecran_bases(self):
        self.ecran("07-bases")
        self.au_mot("C'est la base qui donne son nom")
        tit = self.t("C'est la base qui donne son nom", 42, JAUNE_TITRE).move_to(P(0, 3.1))
        self.play(Write(tit), run_time=0.5)
        p4 = maquette(4, 1.5, P(-4.2, 1.0))
        p3 = maquette(3, 1.5, P(1.0, 1.0), cote=1.5)
        self.add(p4, p3)
        for py, n, mots, x in ((p4, 4, ("Base carrée", "4 côtés", "4 triangles qui montent"), -4.2),
                               (p3, 3, ("Base triangulaire", "3 côtés", "3 triangles qui montent"), 1.0)):
            t0 = self.t(mots[0], 32, BASE).move_to(P(x, -0.6))
            self.au_mot(mots[0])
            self.play(FadeIn(t0, shift=UP * 0.1), FadeIn(py.face(0, BASE, 0.55)), run_time=0.35)
            t1 = self.t(mots[1] + ", donc", 30, BASE).move_to(P(x, -1.2))
            self.aux_extraits([t1], [mots[1]])
            self.play(*[Create(py.arete_ab(i, (i + 1) % n, BASE, 9)) for i in range(n)], run_time=0.4)
            t2 = self.t(mots[2], 30, TRI).move_to(P(x, -1.75))
            self.aux_extraits([t2], [mots[2]])
            self.play(*[FadeIn(py.face(k, TRI, 0.45)) for k in range(1, n + 1)], run_time=0.4)
        self.au_mot("autant de triangles")
        g = self.t("Autant de triangles qui montent que de côtés à la base.", 28, VERT_OK).move_to(P(-0.6, -2.6))
        self.play(FadeIn(g, scale=1.1), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        py = maquette(5, 1.3, P(-4.3, 1.1), cote=1.0)

        def autres_q(sc):
            sc.play(FadeIn(py, shift=UP * 0.2), run_time=0.35)
            sc.play(*[Create(py.arete_ab(i, (i + 1) % 5, BASE, 8)) for i in range(5)], run_time=0.4)

        def apres(sc):
            lg = sc.rep_bas(0, ["Autant de triangles"], fs=30, y0=-1.4, pas=0.6)
            sc.au_mot("Autant de triangles")
            sc.play(FadeIn(lg), run_time=0.25)
            lgb = sc.rep_bas(1, ["que la base a de côtés :"], fs=30, y0=-1.4, pas=0.6)
            sc.au_mot("que la base a")
            sc.play(FadeIn(lgb), run_time=0.25)
            lg2 = sc.rep_bas(2, ["5 côtés,", "5 triangles."], fs=30, buff=0.3, y0=-1.4, pas=0.6)
            sc.aux_extraits(lg2, ["5 côtés", "5 triangles"])
            sc.play(*[FadeIn(py.face(k, TRI, 0.45)) for k in range(1, 6)], run_time=0.4)
            lg3 = sc.rep_bas(3, ["Avec la base, cela fait", "6 faces."], fs=30, buff=0.2, y0=-1.4, pas=0.6)
            sc.au_mot("Avec la base")
            sc.play(FadeIn(lg3[0]), FadeIn(py.face(0, BASE, 0.5)), run_time=0.3)
            sc.aux_extraits([lg3[1]], ["6 faces"])
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["La base d'une pyramide a 5 côtés.", "Combien de triangles montent", "vers la pointe ?"],
                            [self.choix("5 triangles"), self.choix("4 triangles"), self.choix("6 triangles")], 0,
                            ["Autant de triangles que la base a de côtés :", "5 côtés, 5 triangles.",
                             "Avec la base, cela fait 6 faces."],
                            mot_q="La base d'une pyramide", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        py = maquette(3, 1.7, P(-4.2, 0.6), cote=1.5)
        self.au_mot("Amina fabrique maintenant")
        l0 = self.bloc(["Amina fabrique maintenant", "une pyramide à base triangulaire."], 30)
        gauche(l0, -1.6, 1.6)
        self.play(FadeIn(py, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Combien de faces")
        q = self.t("Combien de faces a-t-elle en tout ?", 32, JAUNE_TITRE)
        gauche(q, -1.6, 0.0)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, -1.6, -1.0)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        py = maquette(3, 1.8, P(-4.3, 0.6), cote=1.5)
        self.add(py)
        x = -1.6
        l0 = self.ligne([("La base a", WHITE), ("3 côtés :", BASE)], 34, buff=0.2)
        gauche(l0, x, 2.1)
        self.au_mot("La base a")
        self.play(FadeIn(l0[0]), run_time=0.25)
        ar = VGroup(*[py.arete_ab(i, (i + 1) % 3, BASE, 9) for i in range(3)])
        self.aux_extraits([VGroup(l0[1], ar)], ["3 côtés"])
        l1 = self.t("3 triangles montent vers la pointe.", 30, TRI)
        gauche(l1, x, 1.35)
        self.aux_extraits([l1], ["3 triangles montent"])
        self.play(*[FadeIn(py.face(k, TRI, 0.45)) for k in range(1, 4)], run_time=0.3)
        l2 = self.ligne([("Plus la base :", BASE), ("3", BLEU_D), ("+ 1", BLEU_D), ("= 4 faces.", VERT_OK)], 36,
                        buff=0.26)
        gauche(l2, x, 0.5)
        self.au_mot("Plus la base")
        self.play(FadeIn(l2[0]), FadeIn(py.face(0, BASE, 0.55)), run_time=0.3)
        self.aux_extraits(l2[1:], ["3 plus 1", "1, 4", "4 faces"])
        self.au_mot("la base est aussi un triangle")
        l3 = self.bloc(["Ici, la base est aussi un triangle :", "toutes les faces sont des triangles !"], 30, VERT_OK)
        gauche(l3, x, -1.0)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(py, color=TRI, scale_factor=1.05), run_time=0.45)
        self.au_mot("toutes les faces")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        py = maquette(4, 1.6)
        lignes = self.finale_gauche(py, textes=[
            ("Les faces qui montent vers la pointe", "sont des triangles."),
            ("Il y en a autant que la base", "a de côtés."),
            ("N'oublie pas de compter la base !",)], fs=30, x_fig=-4.7, xl=-2.4)
        self.add(py)
        self.au_mot("Les faces qui montent")
        self.montrer_ligne(lignes[0], *[FadeIn(py.face(k, TRI, 0.45)) for k in range(1, 5) if py.vue_face[k]])
        self.au_mot("autant que la base")
        self.montrer_ligne(lignes[1], *[Create(py.arete_ab(i, (i + 1) % 4, BASE, 8)) for i in range(4)])
        self.au_mot("n'oublie pas de la compter")
        self.montrer_ligne(lignes[2], FadeIn(py.face(0, BASE, 0.5)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_triangles()
        self.ecran_base()
        self.ecran_total()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_bases()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class SolidesPyramideCE2(SolidesPyramideBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
