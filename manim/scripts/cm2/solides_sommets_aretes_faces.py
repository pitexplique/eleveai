# solides_sommets_aretes_faces.py
# EleveAI — Maths CM2 — série « Solides » (cm2-solides), épisode 02 : SOMMETS, ARÊTES ET FACES
# (micro solide_sommet_arete_face, notion solide), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Va plus loin que le CE2 (ce2 solides_decrire, solides_pyramide) : compter ÉTAGE PAR ÉTAGE sans
# oublier ce qui est caché, et la règle de la pyramide (2 × côtés de la base en arêtes, un sommet de
# plus que la base).
# Décor et métier : Lisa, SCULPTRICE (elle taille une pyramide dans un bloc de pierre : polir chaque
# face, adoucir chaque arête, arrondir chaque sommet).
# Mapping micro → écrans : 02 (rappel face / arête / sommet), 03 (arêtes cachées en pointillés,
# étage par étage), 04 (la pyramide à base carrée : 5 faces, 8 arêtes, 5 sommets), 06 (piège : on voit
# 9 arêtes du pavé, il en a 12), questions 05 (pyramide à base hexagonale : 12 arêtes, rép. A) et 07
# (pyramide à base triangulaire : 4 sommets, rép. C), défi 08 (10 arêtes : base à 5 côtés).
# Voix : manim/voix/cm2-solides-sommets-aretes-faces.json (validée le 15/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/solides_sommets_aretes_faces.py SolidesSommetsAretesFacesCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/solides_sommets_aretes_faces.py SolidesSommetsAretesFacesCM2 -o eleveai-maths-cm2-solides-sommets-aretes-faces --media_dir manim/scripts/cm2/media-sol-02
# Sortie : manim/sorties/cm2/maths/solides/02-sommets-aretes-faces/eleveai-maths-cm2-solides-sommets-aretes-faces.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_cm2_commun import *  # noqa: E402,F403

PIERRE = "#a8a29e"
PIERRE_T = "#f5f5f4"
# le pavé : arêtes par étage
BAS = [(0, 1), (1, 5), (4, 5), (0, 4)]
MONTENT = [(0, 3), (1, 2), (5, 6), (4, 7)]
HAUT = [(2, 3), (3, 7), (6, 7), (2, 6)]
C_BAS, C_COTES, C_HAUT = "#f97316", "#ec4899", "#facc15"


def pyr(n=4, cote=1.5, h=1.6, e=1.0, centre=ORIGIN, couleur=PIERRE, trait=PIERRE_T, rot=None):
    return pyramide(n, cote, h, rot=rot, e=e, centre=centre, couleur=couleur, couleur_trait=trait)


def aretes_base(n):
    return [(i, (i + 1) % n) for i in range(n)]


def aretes_montent(n):
    return [(i, n) for i in range(n)]


class SolidesSAFBase(PaysageSolidesCM2):
    nom_voix = "cm2-solides-sommets-aretes-faces"
    fichier_marques = "solides_sommets_aretes_faces_marques.json"

    def ligne(self, morceaux, fs=40, buff=0.2):
        """Les morceaux côte à côte, sur la MÊME ligne de base (centrés en hauteur, un morceau
        avec un p ou un q descendait la ligne)."""
        lg = super().ligne(morceaux, fs, buff)
        txt = [m for m, _ in morceaux]
        plein = Text(" ".join(txt), font_size=fs)
        if len(plein.submobjects) == sum(1 for ch in " ".join(txt) if not ch.isspace()):
            k = 0
            for m, s in zip(lg, txt):
                n = sum(1 for ch in s if not ch.isspace())
                if n and len(m.submobjects) == n:
                    m.shift(UP * (plein[k].get_center()[1] - m[0].get_center()[1]))
                k += n
        return lg

    def allumer(self, texte, objets, extrait, n=1, rt=0.55, lag=0.3, anim=None):
        """Le texte paraît à SON extrait, et les objets s'allument UN PAR UN dans la foulée."""
        for f in texte.get_family():
            f.sans_synchro = True
        self.au_mot(extrait, n)
        self.wait(0.07)
        an = anim or (lambda o: FadeIn(o, scale=1.25))
        self.play(FadeIn(texte, shift=UP * 0.08), LaggedStart(*[an(o) for o in objets], lag_ratio=lag),
                  run_time=rt)

    def rep_ligne(self, i, morceaux, extraits, fs=32, y0=-1.75, pas=0.6, buff=0.2, gestes=None):
        lg = self.rep_bas(i, morceaux, fs=fs, y0=y0, pas=pas, buff=buff)
        gestes = gestes or {}
        for k, (m, ex) in enumerate(zip(lg, extraits)):
            if k in gestes:
                self.allumer(m, gestes[k], ex, rt=0.45, lag=0.25)
            else:
                self.aux_extraits([m], [ex], run_time=0.22)
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Sommets, arêtes et faces", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Sommets, arêtes et faces")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        p = pyr(4, 1.6, 1.7, e=1.0, centre=P(4.6, 0.55))
        self.play(FadeIn(p), FadeIn(p.face(1, FACE_C, 0.5)), FadeIn(p.sommet(4, r=0.13)),
                  Create(p.arete_ab(1, 4)), run_time=0.5)
        q = self.bloc(["Comment les compter", "sans en oublier,"], 40)
        gauche(q, -6.2, 0.9)
        self.aux_extraits([q[0]], ["Comment les compter"])
        self.aux_extraits([q[1]], ["sans en oublier"])
        q2 = self.t("même ceux qu'on ne voit pas ?", 36, ARETE_C)
        gauche(q2, -6.2, -0.35)
        cach = VGroup(*[p.arete_ab(a, b, ARETE_C, 9) for a, b in ((2, 3), (3, 0), (3, 4))])
        self.aux_extraits([VGroup(q2, cach)], ["même ceux qu'on ne voit pas"])
        self.attendre_voix(marge=0.6)

    # ── 01 : Lisa, sculptrice ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        lp = lisa(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Lisa")
        nom = self.t("Lisa", 42, BLEU_CALCUL).next_to(lp, UP, buff=0.2)
        self.play(FadeIn(lp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("sculptrice")
        met = self.t("sculptrice", 30, BLEU_CALCUL).next_to(lp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        bloc = pave(2.0, 1.9, 2.0, e=1.0, centre=P(-2.0, 0.1), couleur="#78716c", couleur_trait="#d6d3d1",
                    opacite=0.55)
        p = pyr(4, 2.0, 1.9, e=1.0)
        p.shift(bloc.p2[0] - p.p2[0])
        self.au_mot("Elle taille une pyramide")
        self.play(FadeIn(bloc), run_time=0.35)
        self.play(FadeIn(p), run_time=0.4)
        self.au_mot("un bloc de pierre")
        self.play(Indicate(bloc, color=PIERRE_T, scale_factor=1.04), run_time=0.45)
        self.play(FadeOut(bloc), run_time=0.5)
        x = 0.1
        rangs = [("polir chaque face", FACE_C, VGroup(p.face(1, FACE_C, 0.65)), "polir chaque face", 2.0),
                 ("adoucir chaque arête", ARETE_C, VGroup(p.arete_ab(1, 4, ARETE_C, 11)), "adoucir chaque arête", 1.2),
                 ("arrondir chaque sommet", SOMMET_C, VGroup(p.sommet(4, r=0.15)), "arrondir chaque sommet", 0.4)]
        for txt, c, ob, ex, y in rangs:
            t = self.t(txt, 30, c)
            gauche(t, x, y)
            self.aux_extraits([VGroup(t, ob)], [ex], run_time=0.3)
        self.au_mot("Combien de chaque")
        g = self.gros("Combien de chaque ?", couleur=JAUNE_TITRE, fs=34)
        gauche(g, x, -0.85)
        self.play(FadeIn(g, scale=1.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : rappel ─────────────────────────────────────────────────────────
    def ecran_rappel(self):
        self.ecran("02-rappel")
        c = pave(2.0, 1.6, 1.8, e=1.0, centre=P(-3.8, 0.2), couleur=PIERRE, couleur_trait=PIERRE_T)
        self.add(c)
        x = -1.7
        f = c.face(0, FACE_C, 0.7)
        l1 = self.ligne([("Une face :", FACE_C), ("une surface plate.", WHITE)], 32, buff=0.25)
        gauche(l1, x, 2.4)
        self.aux_extraits([VGroup(l1[0], f)], ["Une face"])
        self.aux_extraits([l1[1]], ["une surface plate"])
        self.play(FadeOut(f), run_time=0.25)
        ar = c.arete_ab(2, 3, ARETE_C, 12)
        deux = VGroup(c.face(0, FACE_C, 0.35), c.face(3, FACE_C, 0.35))
        l2 = self.ligne([("Une arête :", ARETE_C), ("un bord,", WHITE)], 32, buff=0.25)
        gauche(l2, x, 1.2)
        self.aux_extraits([VGroup(l2[0], ar)], ["Une arête"])
        self.aux_extraits([l2[1]], ["un bord"])
        l2b = self.t("là où deux faces se touchent.", 28)
        gauche(l2b, x + 0.4, 0.6)
        self.aux_extraits([VGroup(l2b, deux)], ["là où deux faces"])
        self.play(Indicate(ar, color=ARETE_C, scale_factor=1.05), run_time=0.4)
        self.play(FadeOut(deux), run_time=0.25)
        s = c.sommet(2, r=0.16)
        trois = VGroup(*[c.arete_ab(2, b, ARETE_C, 9) for b in (1, 6)])
        l3 = self.ligne([("Un sommet :", SOMMET_C), ("un coin,", WHITE)], 32, buff=0.25)
        gauche(l3, x, -0.6)
        self.aux_extraits([VGroup(l3[0], s)], ["Un sommet"])
        self.aux_extraits([l3[1]], ["un coin"])
        l3b = self.t("là où les arêtes se rejoignent.", 28)
        gauche(l3b, x + 0.4, -1.2)
        self.allumer(l3b, list(trois), "là où les arêtes")
        self.play(Flash(c.pt(2), color=SOMMET_C), run_time=0.4)
        self.attendre_voix()

    # ── 03 : les arêtes cachées, étage par étage ────────────────────────────
    def ecran_cache(self):
        self.ecran("03-cache")
        c = pave(2.4, 1.5, 1.8, e=1.0, centre=P(-3.7, 0.0), couleur=PIERRE, couleur_trait=PIERRE_T)
        l0 = self.t("Sur un dessin, des arêtes sont cachées.", 32)
        gauche(l0, -6.2, 2.95)
        self.au_mot("Sur un dessin")
        self.play(FadeIn(c.fonds), FadeIn(c.vues), run_time=0.4)
        self.aux_extraits([l0], ["certaines arêtes sont cachées"])
        l1 = self.t("On les trace en pointillés.", 32, ARETE_C)
        gauche(l1, -6.2, 2.3)
        cach = VGroup(*[c.arete_ab(a, b, ARETE_C, 10) for a, b in ((4, 5), (4, 7), (0, 4))])
        self.aux_extraits([l1], ["on les trace en pointillés"])
        self.play(Create(c.cachees), Create(cach), run_time=0.7)
        self.play(FadeOut(cach), run_time=0.25)
        x = -1.5
        l2 = self.t("On compte étage par étage :", 32, JAUNE_TITRE)
        gauche(l2, x, 1.25)
        self.aux_extraits([l2], ["on compte étage par étage"])
        etages = [("d'abord en bas,", C_BAS, BAS, "d'abord en bas", 0.45),
                  ("puis sur les côtés,", C_COTES, MONTENT, "puis sur les côtés", -0.3),
                  ("puis en haut.", C_HAUT, HAUT, "puis en haut", -1.05)]
        for txt, col, ars, ex, y in etages:
            t = self.t(txt, 30, col)
            gauche(t, x + 0.4, y)
            self.allumer(t, [c.arete_ab(a, b, col, 9) for a, b in ars], ex, rt=0.6, lag=0.35,
                         anim=lambda o: Create(o))
        self.attendre_voix()

    # ── 04 : la pyramide de Lisa ────────────────────────────────────────────
    def ecran_pyramide(self):
        self.ecran("04-pyramide")
        p = pyr(4, 1.6, 1.8, e=1.0, centre=P(-4.85, 0.35))
        self.add(p)
        x, x2 = -3.15, -2.8
        l0 = self.ligne([("Base", BASE_C), ("carrée", BASE_C)], 34, buff=0.2)
        gauche(l0, x, 2.85)
        self.aux_extraits([VGroup(l0, p.face(0, BASE_C))], ["une base carrée"])
        tf = self.t("Les faces :", 30, FACE_C)
        gauche(tf, x, 2.05)
        self.aux_extraits([tf], ["Les faces"])
        lf = self.ligne([("la base", BASE_C), ("+ 4 triangles", LAT_C), ("= 5 faces", VERT_OK)], 28, buff=0.2)
        gauche(lf, x2, 1.5)
        self.aux_extraits([lf[0]], ["la base, plus"])
        self.allumer(lf[1], [p.face(k, LAT_C, 0.55) for k in (1, 2, 3, 4)], "4 triangles")
        self.aux_extraits([lf[2]], ["5 faces"])
        ta = self.t("Les arêtes :", 30, ARETE_C)
        gauche(ta, x, 0.6)
        self.aux_extraits([ta], ["Les arêtes"])
        la = self.ligne([("4 autour de la base", ARETE_C), ("+ 4 qui montent", ARETE_C)], 28, buff=0.2)
        gauche(la, x2, 0.05)
        la.add(self.t("= 8 arêtes", 28, VERT_OK))
        gauche(la[2], x2 + 0.3, -0.5)
        self.allumer(la[0], [p.arete_ab(a, b, sw=8) for a, b in aretes_base(4)], "4 autour", anim=Create)
        self.allumer(la[1], [p.arete_ab(a, b, sw=8) for a, b in aretes_montent(4)], "4 qui montent", anim=Create)
        self.aux_extraits([la[2]], ["8 arêtes"])
        ts = self.t("Les sommets :", 30, SOMMET_C)
        gauche(ts, x, -1.3)
        self.aux_extraits([ts], ["Les sommets"])
        ls = self.ligne([("4 en bas", SOMMET_C), ("+ la pointe", SOMMET_C), ("= 5 sommets", VERT_OK)], 28, buff=0.2)
        gauche(ls, x2, -1.85)
        self.allumer(ls[0], [p.sommet(i, r=0.12) for i in range(4)], "4 en bas")
        self.allumer(ls[1], [p.sommet(4, r=0.14)], "plus la pointe")
        self.aux_extraits([ls[2]], ["5 sommets"])
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        p = pyr(6, 0.8, 1.7, e=1.05, centre=P(-4.0, 1.1), couleur="#60a5fa", trait=WHITE)

        def autres_q(sc):
            sc.play(FadeIn(p, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            sc.rep_ligne(0, [("6 autour de la base", ARETE_C)], ["6 arêtes autour"],
                         gestes={0: [p.arete_ab(a, b, sw=8) for a, b in aretes_base(6)]})
            sc.rep_ligne(1, [("+ 6 qui montent", ARETE_C)], ["6 qui montent"],
                         gestes={0: [p.arete_ab(a, b, sw=8) for a, b in aretes_montent(6)]})
            sc.rep_ligne(2, ["6 + 6", "= 12 arêtes."], ["6 plus 6", "12 arêtes"], fs=32)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Une pyramide a une base", "à 6 côtés.", "Combien a-t-elle d'arêtes ?"],
                            [self.choix("12 arêtes"), self.choix("6 arêtes"), self.choix("7 arêtes")], 0,
                            ["6 autour de la base + 6 qui montent", "6 + 6 = 12 arêtes."],
                            mot_q="Une pyramide", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.aux_extraits([tit], ["Attention"])
        l0 = self.t("Ne compte pas seulement ce que tu vois.", 32)
        gauche(l0, -6.2, 2.25)
        self.aux_extraits([l0], ["Ne compte pas"])
        c = pave(2.6, 1.5, 1.8, e=1.0, centre=P(-3.6, -0.35), couleur=PIERRE, couleur_trait=PIERRE_T)
        self.au_mot("Sur ce dessin de pavé")
        self.play(FadeIn(c.fonds), FadeIn(c.vues), run_time=0.4)
        x = 0.6
        vues = [c.arete(j, ARETE_C, 9) for j in range(len(c.aretes_i)) if c.vue_arete[j]]
        l1 = self.t("On voit 9 arêtes…", 34, ARETE_C)
        gauche(l1, x, 1.1)
        self.allumer(l1, vues, "9 arêtes", rt=0.9, lag=0.25, anim=Create)
        l2 = self.gros("mais il en a 12 !", couleur=ROUGE_ERREUR, fs=36)
        gauche(l2, x, 0.15)
        self.aux_extraits([l2], ["12. Les"])
        l3 = self.ligne([("Les 3 autres", VERT_OK), ("sont cachées derrière,", WHITE)], 32, buff=0.22)
        l3.arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        gauche(l3, x, -1.05)
        cach = [c.arete_ab(a, b, VERT_OK, 10) for a, b in ((4, 5), (4, 7), (0, 4))]
        self.aux_extraits([l3[0]], ["3 autres"])
        self.aux_extraits([l3[1]], ["sont cachées derrière"])
        l4 = self.t("en pointillés.", 32, VERT_OK)
        gauche(l4, x, -2.05)
        self.allumer(l4, cach, "en pointillés", rt=0.6, anim=Create)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        p = pyr(3, 1.7, 1.8, e=1.05, centre=P(-4.0, 1.1), couleur="#60a5fa", trait=WHITE,
                rot=-PI / 2 - PI / 3 + 0.6)

        def autres_q(sc):
            sc.play(FadeIn(p, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            sc.rep_ligne(0, [("3 en bas", SOMMET_C), ("+ la pointe", SOMMET_C)],
                         ["3 sommets en bas", "plus la pointe"],
                         gestes={0: [p.sommet(i, r=0.12) for i in range(3)], 1: [p.sommet(3, r=0.14)]})
            sc.rep_ligne(1, ["= 4 sommets."], ["4 sommets"], fs=32)
            sc.rep_ligne(2, [("Et 4 faces,", LAT_C), ("toutes des triangles.", LAT_C)],
                         ["4 faces", "toutes des triangles"],
                         gestes={1: [p.face(k, LAT_C, 0.4) for k in range(4)]})
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Combien de sommets", "a une pyramide", "à base triangulaire ?"],
                            [self.choix("3 sommets"), self.choix("6 sommets"), self.choix("4 sommets")], 2,
                            ["3 en bas + la pointe = 4 sommets.", "Et 4 faces, toutes des triangles."],
                            mot_q="Combien de sommets", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def drap(self, centre=P(-4.0, 0.2)):
        """La sculpture cachée sous un drap : on ne voit pas sa base."""
        d = Polygon(P(-1.5, -1.2), P(-0.9, 0.2), P(0, 1.45), P(0.9, 0.2), P(1.5, -1.2), P(0.8, -1.0),
                    P(0, -1.3), P(-0.8, -1.0), fill_color="#e7e5e4", fill_opacity=0.95, stroke_color=WHITE,
                    stroke_width=4)
        plis = VGroup(*[Line(P(0, 1.2), P(x, -1.0), color="#a8a29e", stroke_width=3) for x in (-0.7, 0.1, 0.8)])
        q = Text("?", font_size=90, color=ROUGE_ERREUR, weight=BOLD).move_to(P(0, -0.2))
        return VGroup(d, plis, q).move_to(centre)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.aux_extraits([tit], ["À toi de jouer"])
        dr = self.drap()
        x = -1.2
        l0 = self.ligne([("Une pyramide a", WHITE), ("10 arêtes.", ARETE_C)], 36, buff=0.2)
        gauche(l0, x, 1.6)
        self.aux_extraits([VGroup(l0[0], dr)], ["Une pyramide a"])
        self.aux_extraits([l0[1]], ["10 arêtes"])
        q = self.bloc(["Combien de côtés", "a sa base ?"], 40, JAUNE_TITRE)
        gauche(q, x, 0.2)
        self.aux_extraits([q], ["Combien de côtés"])
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, x, -1.3)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        p = pyr(5, 1.15, 1.8, e=1.05, centre=P(-4.6, 0.3), couleur="#60a5fa", trait=WHITE)
        self.add(p)
        x = -2.4
        l0 = self.t("Autant d'arêtes autour de la base", 30, ARETE_C)
        gauche(l0, x, 2.2)
        self.allumer(l0, [p.arete_ab(a, b, sw=8) for a, b in aretes_base(5)], "autant d'arêtes autour",
                     anim=Create)
        l1 = self.t("que d'arêtes qui montent.", 30, C_COTES)
        gauche(l1, x, 1.6)
        self.allumer(l1, [p.arete_ab(a, b, C_COTES, 8) for a, b in aretes_montent(5)], "que d'arêtes qui montent",
                     anim=Create)
        l2 = self.ligne([("10", WHITE), ("= 5 + 5", WHITE)], 36, buff=0.25)
        gauche(l2, x, 0.65)
        self.aux_extraits(l2, ["10, c'est", "5 plus 5"])
        l3 = self.ligne([("Sa base a", WHITE), ("5 côtés :", BASE_C)], 34, buff=0.2)
        gauche(l3, x, -0.3)
        self.aux_extraits([l3[0]], ["Sa base a"])
        self.aux_extraits([VGroup(l3[1], p.face(0, BASE_C))], ["5 côtés"])
        gt = self.bloc(["une pyramide", "à base pentagonale"], 34, VERT_OK)
        g = VGroup(SurroundingRectangle(gt, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5), gt)
        gauche(g, x, -1.5)
        self.aux_extraits([g], ["une pyramide à base pentagonale"])
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        p = pyr(4, 1.5, 1.7, e=1.0)
        lignes = self.finale_gauche(p, textes=[
            ("Faces, arêtes, sommets :", "on compte étage par étage,", "sans oublier ce qui est caché."),
            ("Une pyramide a 2 fois plus d'arêtes", "que sa base a de côtés,"),
            ("et un sommet de plus que sa base.",)], fs=30, x_fig=-4.8, xl=-2.6)
        self.add(p)
        self.au_mot("Faces, arêtes, sommets")
        self.montrer_ligne(lignes[0], FadeIn(p.cachees.copy().set_color(ARETE_C)))
        self.au_mot("Une pyramide a 2 fois")
        self.montrer_ligne(lignes[1], *[Create(p.arete_ab(a, b, sw=7)) for a, b in aretes_base(4) + aretes_montent(4)])
        self.au_mot("et un sommet de plus")
        self.montrer_ligne(lignes[2], FadeIn(p.sommet(4, r=0.15), scale=1.5))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rappel()
        self.ecran_cache()
        self.ecran_pyramide()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class SolidesSommetsAretesFacesCM2(SolidesSAFBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
