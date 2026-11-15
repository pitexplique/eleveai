# 5e_patron_prisme_cylindre.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode V1 : LE PATRON D'UN PRISME ET
# D'UN CYLINDRE (micro patron_prisme_cylindre, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : 5e-patron-prisme-cylindre-short (l'étiquette trop courte : 2 × 3,14 × 2 = 12,56 cm).
# Décor et métier : Gaël, CONCEPTEUR D'EMBALLAGES (boîtes en carton ; centres nature-ecologie, sciences).
# Mapping micro → écrans : 02 (le cylindre déplié : deux disques, le fond et le couvercle, et un rectangle),
# 03 (la longueur du rectangle = le tour du disque : 2 × π × rayon ; rayon 4 cm : 2 × 3,14 × 4 = 25,12 cm ;
# la largeur = la hauteur), 04 (le prisme droit à base triangulaire 3-4-5 déplié : deux triangles + trois
# rectangles de même largeur, la hauteur), 06 (piège : la longueur n'est pas le diamètre ; trop court, la boîte
# ne ferme pas), questions 05 (C : deux disques et un rectangle) et 07 (A : 2 × 3,14 × 5 = 31,4 cm),
# défi 08 (l'étiquette : 2 × 3,14 × 3 = 18,84 cm sur 12 cm ; 18,84 × 12 = 226,08 cm²).
# Fiche : lib/fiches/maths-5e-volumes.tsx ; banque : patron-prisme-cylindre.bank.ts.
# Voix : manim/voix/5e-patron-prisme-cylindre.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_patron_prisme_cylindre_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py patron-prisme-cylindre).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_patron_prisme_cylindre.py PatronPrismeCylindre5e
# Sortie finale : manim/sorties/5e/maths/volume/01-patron-prisme-cylindre/eleveai-maths-5e-patron-prisme-cylindre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

CARTON_C, CARTON_D, CARTON_B = "#d6b98c", "#c4a26f", "#7c5a2b"   # le carton des boîtes de Gaël
CYL_C, DISQUE_C, CYL_B = "#38bdf8", "#7dd3fc", "#0c4a6e"          # le cylindre : le tour, les disques, le bord
TOUR_C = JAUNE_TITRE                                               # le tour du disque (= la longueur)
ETIQ_C, ETIQ_B = "#f472b6", "#831843"                              # l'étiquette de la boîte de conserve
METAL_C = "#cbd5e1"                                                # le couvercle en métal
R3_C, R4_C, R5_C = "#c4b5fd", "#fde68a", "#f9a8d4"                 # les rectangles des côtés 3, 4 et 5 du prisme
PR_B = "#7c2d12"


def rect_c(centre, w, h, couleur, bord, sw=4, op=1.0):
    return Rectangle(width=w, height=h, fill_color=couleur, fill_opacity=op, stroke_color=bord,
                     stroke_width=sw).move_to(centre)


def disque(centre, r, couleur=DISQUE_C, bord=CYL_B, sw=4):
    return Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=bord, stroke_width=sw).move_to(centre)


def patron_cyl(r, h, u, o=ORIGIN, corps=CYL_C, dessus=DISQUE_C, bord=CYL_B, sw=4, x_disque=0.5):
    """Le patron d'un cylindre de rayon r et de hauteur h (unités) : le rectangle (2πr × h) centré en o, un disque
    collé en haut et un en bas, à la fraction x_disque de la longueur. Attributs : .rect .haut .bas .L .H .R"""
    L, H, R = 2 * PI * r * u, h * u, r * u
    rc = rect_c(o, L, H, corps, bord, sw)
    xd = o[0] - L / 2 + x_disque * L
    dh = disque(P(xd, o[1] + H / 2 + R), R, dessus, bord, sw)
    db = disque(P(xd, o[1] - H / 2 - R), R, dessus, bord, sw)
    v = VGroup(rc, dh, db)
    v.rect, v.haut, v.bas, v.L, v.H, v.R = rc, dh, db, L, H, R
    return v


def patron_prisme(h, u, o=ORIGIN, sw=4):
    """Le patron du prisme droit à base triangulaire 3-4-5 (l'angle droit entre les côtés 3 et 4) et de hauteur h :
    les rectangles 3 | 4 | 5 côte à côte (largeur = h), un triangle au-dessus et un au-dessous du rectangle 4.
    o = le centre de la bande des rectangles. Attributs : .r3 .r4 .r5 .th .tb .q(x, y)"""
    x0, y0 = o[0] - 12 * u / 2, o[1] - h * u / 2
    q = lambda x, y: P(x0 + x * u, y0 + y * u)  # noqa: E731
    rg = lambda a, b, c: Polygon(q(a, 0), q(b, 0), q(b, h), q(a, h), fill_color=c, fill_opacity=1,  # noqa: E731
                                 stroke_color=PR_B, stroke_width=sw)
    r3, r4, r5 = rg(0, 3, R3_C), rg(3, 7, R4_C), rg(7, 12, R5_C)
    th = tri(q(3, h), q(7, h), q(3, h + 3), TRI_C, PR_B, sw)
    tb = tri(q(3, 0), q(7, 0), q(3, -3), TRI_C, PR_B, sw)
    v = VGroup(r3, r4, r5, th, tb)
    v.r3, v.r4, v.r5, v.th, v.tb, v.q, v.h, v.u = r3, r4, r5, th, tb, q, h, u
    return v


def boite_conserve(r, h, u, o):
    """La boîte de conserve : un cylindre couvert de son étiquette rose, le couvercle en métal."""
    return cylindre(r, h, u, o, corps=ETIQ_C, dessus=METAL_C, bord=ETIQ_B)


class PatronPrismeCylindre5e(Paysage5e):
    nom_voix = "5e-patron-prisme-cylindre"
    fichier_marques = "5e_patron_prisme_cylindre_marques.json"
    ceinture = "verte"

    # le cylindre des écrans 02-03 (rayon 4 cm, 1 cm = 0,16) et son patron, centré en PC
    U, PC = 0.16, P(-3.85, 0.0)

    def etiq(self, s, fs=26, couleur=WHITE):
        """Une étiquette sur cartouche (posée SUR une figure), hors audit."""
        t = self.t(s, fs, couleur)
        hors_audit(t)
        return sur_fond(t)

    def cyl02(self):
        u, o = self.U, self.PC
        return cylindre(4, 12, u, o + P(0, -6 * u), corps=CYL_C, dessus=DISQUE_C, bord=CYL_B)

    def pat02(self):
        return patron_cyl(4, 12, self.U, self.PC)

    def deplier(self, cyl, pat, run_time=1.4):
        """Le cylindre se déplie : le tour s'ouvre en rectangle, le couvercle monte, le fond descend."""
        self.play(FadeOut(cyl.corps[1]), FadeOut(cyl.bas[1]), FadeOut(cyl.bas[2]),
                  ReplacementTransform(cyl.corps[0], pat.rect),
                  ReplacementTransform(cyl.haut, pat.haut),
                  ReplacementTransform(cyl.bas[0], pat.bas), run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le patron d'un prisme et d'un cylindre", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Le patron d'un prisme et d'un cylindre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Que voit-on quand", "on déplie une boîte ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        cyl = cylindre(3, 6, 0.17, P(2.6, -0.35), corps=CYL_C, dessus=DISQUE_C, bord=CYL_B)
        pr = prisme_tri(4, 3, 0, 4, 0.3, P(3.75, -0.35))
        qm = self.t("?", 56, JAUNE_TITRE)
        hors_audit(qm)
        qm.move_to(P(5.6, 1.15))
        self.au_mot("Que voit-on")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(cyl, scale=0.8), FadeIn(pr, scale=0.8), run_time=0.5)
        self.au_mot("on déplie une boîte")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(qm, scale=1.3), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Gaël, concepteur d'emballages ──────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ga = gael(1.0).move_to(P(-5.25, 0.1))
        self.au_mot("Voici Gaël")
        nom = self.t("Gaël", 40, BLEU_CALCUL).next_to(ga, UP, buff=0.25)
        self.play(FadeIn(ga, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("concepteur d'emballages")
        met = self.bloc(["concepteur", "d'emballages"], 28, BLEU_CALCUL).next_to(ga, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        boite = pave(3, 3, 3, 0.42, P(-2.6, 0.75), face=CARTON_C, dessus="#e7cfa6", cote=CARTON_D, bord=CARTON_B)
        lb = self.t("des boîtes en carton", 32, CARTON_C)
        self.col(lb, 2.7)
        self.au_mot("des boîtes en carton")
        self.play(FadeIn(boite, shift=UP * 0.2), FadeIn(lb, shift=DOWN * 0.1), run_time=0.5)
        # le patron du cube : une croix de 6 carrés (4 en ligne, 1 au-dessus, 1 au-dessous du 2e)
        s, o = 0.55, P(-1.9, -1.75)
        cases = [(0, 0), (1, 0), (2, 0), (3, 0), (1, 1), (1, -1)]
        croix = VGroup(*[rect_c(o + P((i - 1.5) * s, j * s), s, s, CARTON_C, CARTON_B, 3) for i, j in cases])
        lp = self.bloc(["Avant de fabriquer,", "il dessine son patron :"], 34)
        self.col(lp, 1.3)
        self.au_mot("Avant de fabriquer")
        self.play(FadeIn(lp[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("il dessine son patron")
        self.play(FadeIn(lp[1], shift=UP * 0.1), run_time=0.35)
        ld = self.bloc(["la boîte dépliée", "à plat."], 40, JAUNE_TITRE)
        self.col(ld, -0.1)
        self.au_mot("la boîte dépliée")
        self.play(FadeIn(ld[0], shift=UP * 0.1), TransformFromCopy(boite.face, croix), run_time=0.8)
        self.au_mot("à plat")
        self.play(FadeIn(ld[1], shift=UP * 0.1), Indicate(croix, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le cylindre déplié ─────────────────────────────────────────────
    def ecran_cylindre(self):
        self.ecran("02-cylindre")
        cyl, pat = self.cyl02(), self.pat02()
        l1 = self.bloc(["Une boîte ronde,", "c'est un cylindre."], 38)
        self.col(l1, 2.45)
        self.au_mot("Une boîte ronde")
        self.play(FadeIn(cyl, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("c'est un cylindre")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(cyl, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.5)
        l2 = self.t("Gaël la déplie.", 38, JAUNE_TITRE)
        self.col(l2, 1.15)
        self.au_mot("Gaël la déplie")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.deplier(cyl, pat)
        l3 = self.ligne([("Deux disques :", DISQUE_C)], 36)
        self.col(l3, 0.2)
        self.au_mot("Il obtient deux disques")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(VGroup(pat.haut, pat.bas), color=JAUNE_TITRE,
                                                         scale_factor=1.1), run_time=0.5)
        l4 = self.ligne([("le fond", WHITE), ("et le couvercle,", WHITE)], 34)
        self.col(l4, -0.4)
        ec = self.etiq("le couvercle", 26, DISQUE_C).next_to(pat.haut, RIGHT, buff=0.2)
        ef = self.etiq("le fond", 26, DISQUE_C).next_to(pat.bas, RIGHT, buff=0.2)
        self.au_mot("le fond")
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(ef), run_time=0.3)
        self.au_mot("et le couvercle")
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(ec), run_time=0.3)
        l5 = self.bloc(["et un rectangle :", "le tour de la boîte."], 36, CYL_C)
        self.col(l5, -1.35)
        self.au_mot("et un rectangle")
        self.play(FadeIn(l5[0], shift=UP * 0.1), Indicate(pat.rect, color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.5)
        self.au_mot("le tour de la boîte")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 03 : la longueur du rectangle = le tour du disque ───────────────────
    def ecran_longueur(self):
        self.ecran("03-longueur")
        pat = self.pat02()
        self.add(pat)
        r = pat.rect
        haut_r = Line(r.get_corner(UL), r.get_corner(UR), color=TOUR_C, stroke_width=10)
        tour_d = Circle(radius=pat.R, color=TOUR_C, stroke_width=10).move_to(pat.haut)
        l1 = self.bloc(["Le rectangle s'enroule", "autour du disque."], 34)
        self.col(l1, 2.97)
        self.au_mot("Le rectangle s'enroule")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("autour du disque")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(tour_d), run_time=0.6)
        l2 = VGroup(self.t("Sa longueur :", 34, TOUR_C), self.t("le tour du disque", 34, WHITE))
        l2.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(l2, 1.62)
        el = self.etiq("longueur", 28, TOUR_C).move_to(r.get_center() + UP * 0.42)
        self.au_mot("Sa longueur")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(haut_r), FadeIn(el), run_time=0.5)
        self.au_mot("le tour du disque")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(tour_d, scale_factor=1.15), run_time=0.45)
        l3 = self.ligne([("2 × π", BLEU_D), ("× rayon", BLEU_D)], 40, buff=0.2)
        self.col(l3, 0.6)
        ray = Line(pat.haut.get_center(), pat.haut.get_right(), color=BASE_C, stroke_width=6)
        self.au_mot("2 fois pi")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois le rayon")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(ray), run_time=0.35)
        l4 = self.t("Pour un rayon de 4 cm :", 34, WHITE)
        self.col(l4, -0.15)
        e4 = self.t("4 cm", 26, BASE_C).next_to(pat.haut, RIGHT, buff=0.15)
        hors_audit(e4)
        self.au_mot("Pour un rayon de 4 centimètres")
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(e4), run_time=0.35)
        l5 = self.ligne([("2 ×", BLEU_D), ("3,14 ×", BLEU_D), ("4", BLEU_D), ("= 25,12 cm", VERT_OK)], 38,
                        buff=0.26)
        self.col(l5, -0.8)
        self.au_mot("2 fois", 2)
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("3,14")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("fois 4")
        self.play(FadeIn(l5[2], shift=UP * 0.1), run_time=0.25)
        e25 = self.etiq("25,12 cm", 28, TOUR_C).move_to(el)
        self.au_mot("25,12 centimètres")
        self.play(FadeIn(l5[3], scale=1.2), ReplacementTransform(el, e25), run_time=0.45)
        l6 = self.ligne([("Sa largeur :", HAUTEUR_C), ("la hauteur", HAUTEUR_C)], 34)
        self.col(l6, -1.6)
        cote_h = Line(r.get_corner(DR), r.get_corner(UR), color=HAUTEUR_C, stroke_width=10)
        eh = self.etiq("hauteur", 26, HAUTEUR_C)
        eh.move_to(r.get_right() + LEFT * (eh.width / 2 + 0.2) + DOWN * 0.42)
        self.au_mot("Sa largeur")
        self.play(FadeIn(l6[0], shift=UP * 0.1), Create(cote_h), run_time=0.35)
        self.au_mot("c'est la hauteur")
        self.play(FadeIn(l6[1], shift=UP * 0.1), FadeIn(eh), run_time=0.35)
        l7 = self.t("de la boîte.", 34, HAUTEUR_C)
        self.col(l7, -2.15)
        self.au_mot("de la boîte")
        self.play(FadeIn(l7, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 04 : le prisme droit déplié ─────────────────────────────────────────
    def ecran_prisme(self):
        self.ecran("04-prisme")
        u = 0.36
        pr = prisme_tri(4, 3, 0, 5, 0.42, P(-5.3, -0.9))
        pat = patron_prisme(4, u, P(-3.85, 0.0))
        X = 0.35
        l1 = self.bloc(["Une boîte en forme", "de prisme droit."], 36)
        self.col(l1, 2.75, X)
        self.au_mot("Une boîte en forme")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(pr, shift=UP * 0.2), run_time=0.5)
        self.au_mot("de prisme droit")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        # la base (le triangle de face) : côtés 3 (à gauche), 4 (en bas), 5 (le penché)
        A, B, C = pr.pt(0, 0, 0), pr.pt(4, 0, 0), pr.pt(0, 0, 3)
        c3 = cote(Line(A, C), "3 cm", LEFT, fs=24, couleur=R3_C, audit=False, buff=0.1)
        c4 = cote(Line(A, B), "4 cm", DOWN, fs=24, couleur=R4_C, audit=False, buff=0.1)
        c5 = self.etiq("5 cm", 24, R5_C).move_to(centre_de(B, C) + P(-0.42, -0.25))
        l2 = self.t("Sa base : un triangle", 34, TRI_C)
        self.col(l2, 1.6, X)
        self.au_mot("Sa base est un triangle")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(pr.avant, color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.5)
        l3 = self.ligne([("de côtés 3,", WHITE), ("4", WHITE), ("et 5 cm.", WHITE)], 34, buff=0.16)
        self.col(l3, 1.05, X)
        self.au_mot("de côtés 3")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(c3), run_time=0.3)
        self.au_mot("3, 4")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(c4), run_time=0.25)
        self.au_mot("et 5")
        self.play(FadeIn(l3[2], shift=UP * 0.1), FadeIn(c5), run_time=0.25)
        l4 = self.ligne([("Dépliée :", JAUNE_TITRE), ("deux triangles,", TRI_C)], 34)
        self.col(l4, 0.15, X)
        self.au_mot("Dépliée")
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeOut(VGroup(c3, c4, c5)), FadeOut(pr.pans),
                  ReplacementTransform(pr.avant, pat.th), run_time=0.8)
        self.au_mot("deux triangles")
        self.play(FadeIn(l4[1], shift=UP * 0.1), TransformFromCopy(pat.th, pat.tb), run_time=0.5)
        l5 = self.t("et un rectangle par côté.", 34, WHITE)
        self.col(l5, -0.4, X)
        e3 = self.etiq("3 cm", 24, R3_C).move_to(pat.r3.get_bottom() + UP * 0.32)
        e4 = self.etiq("4 cm", 24, R4_C).move_to(pat.r4.get_bottom() + UP * 0.32)
        e5 = self.etiq("5 cm", 24, R5_C).move_to(pat.r5.get_bottom() + UP * 0.32)
        self.au_mot("et un rectangle par côté du triangle")
        self.play(FadeIn(l5, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(VGroup(rr, e), shift=DOWN * 0.15) for rr, e in
                                ((pat.r3, e3), (pat.r4, e4), (pat.r5, e5))], lag_ratio=0.3), run_time=0.9)
        self.bring_to_front(pat.th, pat.tb)
        l6 = self.bloc(["Les trois rectangles ont", "pour largeur la hauteur."], 34, HAUTEUR_C)
        self.col(l6, -1.35, X)
        q = pat.q
        bords = VGroup(*[Line(q(x, 0), q(x, pat.h), color=HAUTEUR_C, stroke_width=9) for x in (0, 3, 7, 12)])
        eh = self.etiq("hauteur", 24, HAUTEUR_C).move_to(pat.r5.get_center() + UP * 0.35)
        self.au_mot("Les trois rectangles ont")
        self.play(FadeIn(l6[0], shift=UP * 0.1), Indicate(VGroup(pat.r3, e3, pat.r4, e4, pat.r5, e5),
                                                            color=JAUNE_TITRE, scale_factor=1.03), run_time=0.5)
        self.au_mot("pour largeur la hauteur du prisme")
        self.play(FadeIn(l6[1], shift=UP * 0.1), Create(bords), FadeIn(eh), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cyl = cylindre(3, 7, 0.22, P(-4.0, 0.55), corps=CYL_C, dessus=DISQUE_C, bord=CYL_B)
        qm = self.t("?", 48, JAUNE_TITRE)
        hors_audit(qm)
        qm.next_to(cyl, RIGHT, buff=0.35)

        def avant(sc):
            sc.play(FadeIn(cyl), FadeIn(qm), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Le patron d'un cylindre,", "c'est…"],
                             [self.choix("deux disques\net un carré", 30), self.choix("un disque\net un rectangle", 30),
                              self.choix("deux disques\net un rectangle", 30)], 2,
                             ["Deux disques, le fond", "et le couvercle.", "Et un rectangle,", "qui fait le tour."],
                             -0.35, mot_q="Le patron", avant_q=avant)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        R, H = 0.7, 1.0
        d = disque(P(-5.4, 1.55), R)
        diam = Line(d.get_left(), d.get_right(), color=ROUGE_ERREUR, stroke_width=7)
        court = rect_c(P(-3.6, 1.55), 2 * R, H, CYL_C, CYL_B, 4)
        barre = VGroup(Line(court.get_corner(UL), court.get_corner(DR)), Line(court.get_corner(DL),
                                                                               court.get_corner(UR)))
        barre.set_stroke(ROUGE_ERREUR, 7)
        l1 = self.bloc(["La longueur du rectangle", "n'est pas le diamètre."], 36, ROUGE_ERREUR)
        self.col(l1, 2.0)
        self.au_mot("La longueur du rectangle")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(d), FadeIn(court), run_time=0.4)
        self.au_mot("n'est pas le diamètre")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(diam), Create(barre), run_time=0.45)
        long_ = rect_c(P(-6.1 + PI * R, -0.2), 2 * PI * R, H, CYL_C, CYL_B, 4)
        tour = Line(long_.get_corner(UL), long_.get_corner(UR), color=VERT_OK, stroke_width=10)
        et = self.etiq("tout le tour", 30, VERT_OK).move_to(long_)
        l2 = self.ligne([("C'est tout le tour :", VERT_OK)], 36)
        self.col(l2, 0.55)
        self.au_mot("C'est tout le tour")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(long_), Create(tour), FadeIn(et), run_time=0.5)
        l3 = self.ligne([("2 × π", VERT_OK), ("× rayon.", VERT_OK)], 40, buff=0.2)
        self.col(l3, -0.15)
        self.au_mot("2 fois pi")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois le rayon")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        # la boîte trop courte : l'étiquette n'en fait pas le tour (le métal se voit)
        cyl = cylindre(3, 4, 0.3, P(-3.9, -2.95), corps=METAL_C, dessus=METAL_C, bord="#334155")
        o, w, hh = cyl.o, cyl.r * cyl.u, cyl.h * cyl.u
        bande = Polygon(o + P(-w, 0), o + P(0.15 * w, 0), o + P(0.15 * w, hh), o + P(-w, hh),
                        fill_color=CYL_C, fill_opacity=1, stroke_color=CYL_B, stroke_width=4)
        trou = self.etiq("?", 36, ROUGE_ERREUR).move_to(o + P(0.58 * w, hh / 2))
        l4 = self.bloc(["Trop court :", "la boîte ne ferme pas."], 36, ROUGE_ERREUR)
        self.col(l4, -1.35)
        self.au_mot("trop court")
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(cyl), FadeIn(bande), run_time=0.4)
        self.au_mot("la boîte ne ferme pas")
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(trou, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pat = patron_cyl(5, 8, 0.13, P(-4.0, 1.4))
        e5 = self.t("5 cm", 28, BASE_C)
        hors_audit(e5)
        e5.next_to(pat.haut, RIGHT, buff=0.15)
        ray = Line(pat.haut.get_center(), pat.haut.get_right(), color=BASE_C, stroke_width=5)
        qm = self.etiq("? cm", 30, TOUR_C).move_to(pat.rect)
        haut_r = Line(pat.rect.get_corner(UL), pat.rect.get_corner(UR), color=TOUR_C, stroke_width=8)

        def avant(sc):
            sc.play(FadeIn(pat), Create(ray), FadeIn(e5), Create(haut_r), FadeIn(qm), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un cylindre, rayon 5 cm.", "Longueur du rectangle ?", "On prend π = 3,14."],
                             [self.choix("31,4 cm"), self.choix("15,7 cm"), self.choix("10 cm")], 0,
                             ["2 × 3,14 × 5", "= 31,4 cm.", "15,7 : un demi-tour.", "10 : le diamètre."],
                             -0.75, couper={0: ("2 ×", "3,14 ×", "5"), 2: ("15,7 :", "un demi-tour."),
                                           3: ("10 :", "le diamètre.")},
                             mot_q="Un cylindre", avant_q=avant)

    # ── 08 : le défi (l'étiquette de la boîte ronde) ────────────────────────
    U8, O8 = 0.17, P(-3.6, -1.5)   # la boîte : rayon 3 cm, hauteur 12 cm ; o = le centre du fond

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u, o = self.U8, self.O8
        bt = boite_conserve(3, 12, u, o)
        x = -0.6
        l0 = self.bloc(["Gaël habille une boîte ronde", "d'une étiquette."], 34)
        self.col(l0, 1.95, x)
        self.au_mot("Gaël habille une boîte ronde")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(bt.bas), FadeIn(bt.corps), FadeIn(bt.haut), run_time=0.45)
        self.au_mot("d'une étiquette")
        self.play(FadeIn(l0[1], shift=UP * 0.1), Indicate(bt.corps, color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.45)
        l1 = self.ligne([("Rayon 3 cm,", BASE_C), ("hauteur 12 cm.", HAUTEUR_C)], 34)
        self.col(l1, 0.85, x)
        ray = Line(bt.haut.get_center(), bt.haut.get_right(), color=BASE_C, stroke_width=6)
        c3 = cote(ray, "3 cm", UP, fs=26, couleur=BASE_C, audit=False, buff=0.3)
        c3.shift(RIGHT * 0.35)
        cote_h = Line(o + P(-3 * u, 0), o + P(-3 * u, 12 * u))
        c12 = cote(cote_h, "12 cm", LEFT, fs=26, couleur=HAUTEUR_C, audit=False, buff=0.2)
        self.au_mot("un rayon de 3 centimètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(ray), FadeIn(c3), run_time=0.4)
        self.au_mot("une hauteur de 12 centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c12), run_time=0.4)
        l2 = self.t("Les dimensions de l'étiquette ?", 34, JAUNE_TITRE)
        self.col(l2, -0.05, x)
        self.au_mot("les dimensions de l'étiquette")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = self.t("Et son aire ?", 36, JAUNE_TITRE)
        self.col(l3, -0.8, x)
        self.au_mot("son aire")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = self.U8
        bt = boite_conserve(3, 12, u, P(-3.6, -1.0))
        self.add(bt)
        # l'étiquette déroulée : 2π × 3 de long, 12 de large
        L, H = 2 * PI * 3 * u, 12 * u
        et = rect_c(P(-3.55, 0.05), L, H, ETIQ_C, ETIQ_B, 4)
        x = -0.6
        l1 = self.ligne([("La longueur :", WHITE), ("2 ×", BLEU_D), ("3,14 ×", BLEU_D), ("3", BLEU_D)], 34,
                        buff=0.26)
        self.col(l1, 2.2, x)
        self.au_mot("La longueur")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeOut(bt.haut), FadeOut(bt.bas[1:]), FadeOut(bt.corps[1]),
                  FadeOut(bt.bas[0]), ReplacementTransform(bt.corps[0], et), run_time=0.8)
        self.au_mot("2 fois")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("3,14")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("3,14 fois 3")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.25)
        l2 = self.ligne([("= 18,84 cm", VERT_OK)], 36)
        self.col(l2, 1.5, x + 0.4)
        c18 = cote(Line(et.get_corner(DL), et.get_corner(DR)), "18,84 cm", DOWN, fs=26, couleur=TOUR_C,
                   audit=False)
        self.au_mot("18,84 centimètres")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(c18), run_time=0.35)
        l3 = self.ligne([("La largeur :", WHITE), ("la hauteur,", HAUTEUR_C), ("12 cm", VERT_OK)], 34, buff=0.26)
        self.col(l3, 0.8, x)
        c12 = cote(Line(et.get_corner(DL), et.get_corner(UL)), "12 cm", LEFT, fs=26, couleur=HAUTEUR_C,
                   audit=False, buff=0.15)
        self.au_mot("La largeur")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la hauteur")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("12 centimètres")
        self.play(FadeIn(l3[2], shift=UP * 0.1), FadeIn(c12), run_time=0.3)
        l4 = self.ligne([("L'aire :", WHITE), ("18,84 ×", BLEU_D), ("12", BLEU_D)], 34, buff=0.26)
        self.col(l4, 0.1, x)
        self.au_mot("L'aire")
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(et, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.35)
        self.au_mot("18,84 fois")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("fois 12")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.25)
        res = self.gros("226,08 cm²", fs=46)
        self.col(res, -0.85, x)
        ea = sur_fond(m2("226,08 cm²", 28, WHITE)).move_to(et)
        self.au_mot("226,08 centimètres carrés")
        self.play(FadeIn(res, scale=1.2), FadeIn(ea), run_time=0.45)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        pc = patron_cyl(4, 6, 0.085, ORIGIN)
        pp = patron_prisme(4, 0.17, ORIGIN)
        fig = VGroup(pc, pp).arrange(DOWN, buff=0.45)
        lignes = self.finale_gauche(fig, textes=[
            ("Le patron d'un cylindre :", "deux disques et un rectangle,", "long comme le tour du disque."),
            ("Le patron d'un prisme droit :", "deux bases, et un rectangle", "par côté."),
            ("La largeur des rectangles,", "c'est la hauteur du solide.")], fs=30)
        self.add(fig)
        self.au_mot("Le patron d'un cylindre")
        self.montrer_ligne(lignes[0], Indicate(pc, color=JAUNE_TITRE, scale_factor=1.05))
        self.au_mot("Le patron d'un prisme droit")
        self.montrer_ligne(lignes[1], Indicate(pp, color=JAUNE_TITRE, scale_factor=1.05))
        self.au_mot("La largeur des rectangles")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_cylindre()
        self.ecran_longueur()
        self.ecran_prisme()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
