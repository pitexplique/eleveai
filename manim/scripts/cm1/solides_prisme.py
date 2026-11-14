# solides_prisme.py
# EleveAI — Maths CM1 — série « Solides et espace », épisode 01 : LE PRISME DROIT
# (micro solide_prisme, notion solides), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Va plus loin que le CE2 (reconnaître, faces/arêtes/sommets, pyramide : vidéos CE2 par `aussi`).
# Short jumeau : film Ti Margo (la tente n'est pas une pyramide : réponse C).
# Décor et métier : Sacha, GUIDE DE MONTAGNE (la tente = prisme à base triangulaire ; centres : sport,
# nature-ecologie).
# Mapping micro → écrans : 02 (deux bases pareilles), 03 (faces latérales = rectangles), 04 (compter :
# faces n + 2, sommets 2 × n, arêtes 3 × n), 06 (piège prisme / pyramide), 07 (patron de la tente),
# questions 05 (crayon hexagonal : 8 faces, rép. B) et 08 (prisme pentagonal : 15 arêtes, rép. A),
# défi 09 (écrou hexagonal : 12 sommets, 18 arêtes).
# Voix : manim/voix/cm1-solides-prisme.json (validée le 14/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/solides_prisme.py SolidesPrismeCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/solides_prisme.py SolidesPrismeCM1 -o eleveai-maths-cm1-solides-prisme --media_dir manim/scripts/cm1/media-sol-01
# Sortie : manim/sorties/cm1/maths/solides/01-prisme/eleveai-maths-cm1-solides-prisme.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_cm1_commun import *  # noqa: E402,F403

A_T = 1.6  # côté du triangle de la tente


def la_tente(e=1.0, centre=ORIGIN, p=2.2):
    return tente(A_T, p=p, e=e, centre=centre, couleur=TOILE, couleur_trait="#fff7ed")


def montagnes():
    g = VGroup()
    for x, h, w in ((1.2, 1.6, 3.0), (3.4, 2.1, 3.2), (5.2, 1.5, 2.4)):
        g.add(Polygon(P(x - w / 2, -0.4), P(x + w / 2, -0.4), P(x, -0.4 + h), fill_color="#334155", fill_opacity=1,
                      stroke_width=0))
        g.add(Polygon(P(x - w * 0.11, -0.4 + h * 0.78), P(x + w * 0.11, -0.4 + h * 0.78), P(x, -0.4 + h),
                      fill_color="#e2e8f0", fill_opacity=1, stroke_width=0))
    return g


class SolidesPrismeBase(PaysageSolidesCM1):
    nom_voix = "cm1-solides-prisme"
    fichier_marques = "solides_prisme_marques.json"

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le prisme droit", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le prisme droit")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        t = la_tente(1.15, P(3.9, 0.6))
        mots = VGroup(self.t("Faces,", 40, LAT_C), self.t("sommets,", 40, SOMMET_C), self.t("arêtes :", 40, ARETE_C)) \
            .arrange(RIGHT, buff=0.3)
        gauche(mots, -6.2, 1.0)
        self.au_mot("Faces")
        self.play(FadeIn(t), FadeIn(mots[0]), run_time=0.4)
        self.au_mot("sommets")
        self.play(FadeIn(mots[1]), FadeIn(t.sommet(2, r=0.13)), run_time=0.35)
        self.au_mot("arêtes")
        self.play(FadeIn(mots[2]), Create(t.arete_ab(2, 5)), run_time=0.35)
        self.au_mot("comment tout compter")
        q = self.bloc(["comment tout compter", "sans se tromper ?"], 40)
        gauche(q, -6.2, -0.1)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    def ecran_situation(self):
        self.ecran("01-situation")
        mt = montagnes()
        self.add(mt)
        sp = sacha(1.0).move_to(P(-5.3, 0.2))
        self.au_mot("Voici Sacha")
        nom = self.t("Sacha", 42, BLEU_CALCUL).next_to(sp, UP, buff=0.2)
        self.play(FadeIn(sp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("guide de montagne")
        met = self.bloc(["guide", "de montagne"], 28, BLEU_CALCUL).next_to(sp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        t = la_tente(1.25, P(1.6, -1.6))
        self.au_mot("sous la tente")
        self.play(FadeIn(t, shift=UP * 0.3), run_time=0.5)
        c = cube(e=0.8, centre=P(-3.2, 2.5))
        py = pyramide(4, 1.0, 1.1, e=0.9, centre=P(-0.5, 2.5))
        x1 = self.t("ni un cube,", 26).next_to(c, DOWN, buff=0.15)
        x2 = self.t("ni une pyramide", 26).next_to(py, DOWN, buff=0.15)
        self.au_mot("ce n'est ni un cube")
        self.play(FadeIn(c), FadeIn(x1), run_time=0.35)
        self.play(Create(VGroup(Line(c.get_corner(UL), c.get_corner(DR)), Line(c.get_corner(DL), c.get_corner(UR)))
                         .set_stroke(ROUGE_ERREUR, 7)), run_time=0.3)
        self.au_mot("ni une pyramide")
        self.play(FadeIn(py), FadeIn(x2), run_time=0.35)
        self.play(Create(VGroup(Line(py.get_corner(UL), py.get_corner(DR)), Line(py.get_corner(DL), py.get_corner(UR)))
                         .set_stroke(ROUGE_ERREUR, 7)), run_time=0.3)
        self.au_mot("C'est un prisme droit")
        g = self.gros("C'est un prisme droit.", couleur=JAUNE_TITRE, fs=34).move_to(P(3.5, 2.6))
        self.play(FadeIn(g, scale=1.2), Indicate(t, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 02 : les deux bases ─────────────────────────────────────────────────
    def ecran_bases(self):
        self.ecran("02-bases")
        t = la_tente(1.7, P(-3.5, 0.2))
        self.add(t)
        self.au_mot("Un prisme droit a deux bases")
        l0 = self.bloc(["Un prisme droit a deux bases,", "pareilles,", "l'une en face de l'autre."], 30, BASE_C)
        gauche(l0, 0.0, 2.2)
        f0, f1 = t.face(0, BASE_C, 0.75), t.face(1, BASE_C)
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(f0), FadeIn(f1), run_time=0.45)
        self.au_mot("pareilles")
        self.play(FadeIn(l0[1], shift=UP * 0.1), Indicate(f0, color=BASE_C), Indicate(f1, color=BASE_C), run_time=0.5)
        self.au_mot("l'une en face de l'autre")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.35)
        self.au_mot("deux triangles")
        l1 = self.t("Ici, deux triangles :", 32)
        gauche(l1, 0.3, 0.2)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        e1 = self.t("l'entrée", 32, BASE_C)
        gauche(e1, 0.8, -0.6)
        self.au_mot("l'entrée")
        self.play(FadeIn(e1), Indicate(f0, color=WHITE), run_time=0.4)
        e2 = self.t("et le fond.", 32, BASE_C)
        gauche(e2, 0.8, -1.3)
        self.au_mot("et le fond")
        self.play(FadeIn(e2), Indicate(f1, color=WHITE), run_time=0.4)
        self.attendre_voix()

    # ── 03 : les faces latérales ────────────────────────────────────────────
    def ecran_laterales(self):
        self.ecran("03-laterales")
        t = la_tente(1.7, P(-3.5, 0.2))
        self.add(t, t.face(0, BASE_C, 0.4), t.face(1, BASE_C))
        self.au_mot("Autour, les faces")
        l0 = self.bloc(["Autour, les faces sont droites :", "ce sont des rectangles."], 30, LAT_C)
        gauche(l0, 0.3, 2.5)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("ce sont des rectangles")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("Le triangle a", WHITE), ("3 côtés :", WHITE)], 32, buff=0.2)
        gauche(l1, 0.3, 1.2)
        self.au_mot("Le triangle a")
        self.play(FadeIn(l1[0]), run_time=0.25)
        cotes = VGroup(*[t.arete_ab(a, b, BASE_C, 10) for a, b in ((0, 1), (1, 2), (2, 0))])
        self.aux_extraits([l1[1]], ["3 côtés"])
        self.play(Create(cotes), run_time=0.5)
        l2 = self.ligne([("il y a", LAT_C), ("3 rectangles.", LAT_C)], 32, buff=0.2)
        gauche(l2, 0.3, 0.5)
        self.aux_extraits(l2, ["il y a", "3 rectangles"])
        noms = [("le toit à gauche,", 4, "Le toit à gauche"), ("le toit à droite,", 3, "le toit à droite"),
                ("et le sol.", 2, "et le sol")]
        prec = VGroup()
        for k, (txt, f, mot) in enumerate(noms):
            tx = self.t(txt, 30, LAT_C)
            gauche(tx, 0.8, -0.3 - 0.65 * k)
            fa = t.face(f, LAT_C, 0.7)
            self.au_mot(mot)
            self.play(FadeIn(tx, shift=LEFT * 0.1), FadeIn(fa), FadeOut(prec), run_time=0.35)
            prec = fa
        self.play(FadeOut(cotes), run_time=0.3)
        self.attendre_voix()

    # ── 04 : compter ────────────────────────────────────────────────────────
    def ecran_compter(self):
        self.ecran("04-compter")
        t = la_tente(1.3, P(-4.8, 0.3))
        self.add(t)
        x, x2 = -2.3, -1.8
        self.au_mot("Les faces")
        tf = self.t("Les faces :", 30, LAT_C)
        gauche(tf, x, 2.75)
        self.play(FadeIn(tf), run_time=0.25)
        lf = self.ligne([("2 bases", BASE_C), ("+ 3 rectangles", LAT_C), ("= 5 faces", VERT_OK)], 30, buff=0.22)
        gauche(lf, x2, 2.15)
        self.aux_extraits([VGroup(lf[0], t.face(0, BASE_C, 0.5), t.face(1, BASE_C))], ["2 bases"])
        self.aux_extraits([VGroup(lf[1], t.face(2, LAT_C, 0.5), t.face(3, LAT_C, 0.5), t.face(4, LAT_C))],
                          ["3 rectangles"])
        self.aux_extraits([lf[2]], ["5 faces"])
        self.au_mot("Les sommets")
        ts = self.t("Les sommets :", 30, SOMMET_C)
        gauche(ts, x, 1.3)
        self.play(FadeIn(ts), run_time=0.2)
        ls = self.ligne([("3 devant", SOMMET_C), ("+ 3 au fond", SOMMET_C)], 30, buff=0.22)
        gauche(ls, x2, 0.8)
        ls2 = self.ligne([("2 × 3", SOMMET_C), ("= 6 sommets", VERT_OK)], 30, buff=0.22)
        gauche(ls2, x2, 0.2)
        self.aux_extraits([VGroup(ls[0], *[t.sommet(i, r=0.12) for i in (0, 1, 2)])], ["3 en bas devant"])
        self.aux_extraits([VGroup(ls[1], *[t.sommet(i, r=0.12) for i in (3, 4, 5)])], ["3 au fond"])
        self.aux_extraits(ls2, ["2 fois 3", "6 sommets"])
        self.au_mot("Les arêtes")
        ta = self.t("Les arêtes :", 30, ARETE_C)
        gauche(ta, x, -0.6)
        self.play(FadeIn(ta), run_time=0.2)
        la = self.ligne([("3 devant", ARETE_C), ("+ 3 au fond", ARETE_C), ("+ 3 qui relient", ARETE_C)], 30, buff=0.2)
        gauche(la, x2, -1.2)
        groupes = [[(0, 1), (1, 2), (2, 0)], [(3, 4), (4, 5), (5, 3)], [(0, 3), (1, 4), (2, 5)]]
        for k, ex in enumerate([("3 devant", 1), "3 au fond, et", "3 qui relient"]):
            self.aux_extraits([VGroup(la[k], *[t.arete_ab(a, b, sw=8) for a, b in groupes[k]])], [ex], run_time=0.15)
        la2 = self.ligne([("3 × 3", ARETE_C), ("= 9 arêtes", VERT_OK)], 30, buff=0.22)
        gauche(la2, x2, -1.8)
        self.aux_extraits(la2, ["3 fois 3", "9 arêtes"])
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def crayon(self, e=0.75, centre=ORIGIN):
        return prisme(regulier(6, 0.45, rot=0), 4.2, axe="x", e=e, centre=centre, couleur="#facc15",
                      couleur_trait="#422006")

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cr = self.crayon(1.05, P(-3.9, 1.6))

        def autres_q(sc):
            sc.play(FadeIn(cr, shift=RIGHT * 0.3), run_time=0.35)

        def apres(sc):
            lg = VGroup(sc.rep_bas(0, [("6 rectangles autour", LAT_C)], fs=32, y0=-1.8, pas=0.6)[0],
                        sc.rep_bas(1, [("+ les 2 bases", BASE_C)], fs=32, y0=-1.8, pas=0.6)[0])
            sc.aux_extraits([lg[0]], ["6 rectangles autour"])
            sc.aux_extraits([lg[1]], [("les 2 bases", 1, 0.15)])
            lg2 = sc.rep_bas(2, ["6 + 2", "= 8 faces."], fs=32, buff=0.2, y0=-1.8, pas=0.6)
            sc.aux_extraits(lg2, ["6 plus 2", "8 faces"])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Un crayon : un prisme", "à base hexagonale (6 côtés).",
                             "Combien a-t-il de faces ?"],
                            [self.choix("6 faces"), self.choix("8 faces"), self.choix("12 faces")], 1,
                            ["6 rectangles autour + les 2 bases", "6 + 2 = 8 faces."],
                            mot_q="Un crayon", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Le prisme et la pyramide")
        l0 = self.t("Le prisme et la pyramide se ressemblent parfois.", 32)
        gauche(l0, -6.2, 2.25)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        py = pyramide(3, 1.6, 1.6, e=1.2, centre=P(-3.6, 0.2), couleur="#60a5fa")
        t = la_tente(1.15, P(2.6, 0.2))
        self.play(FadeIn(py), FadeIn(t), run_time=0.4)
        self.au_mot("la pyramide a une seule base")
        p1 = self.bloc(["La pyramide :", "une seule base,"], 30, "#60a5fa").move_to(P(-3.6, -1.85))
        self.play(FadeIn(p1, shift=UP * 0.1), FadeIn(py.face(0, BASE_C)), run_time=0.4)
        self.au_mot("et une pointe")
        p1b = self.t("et une pointe.", 30, SOMMET_C).next_to(p1, DOWN, buff=0.1)
        self.play(FadeIn(p1b), FadeIn(py.sommet(3, r=0.16), scale=1.6), run_time=0.4)
        self.au_mot("Le prisme a deux bases pareilles")
        p2 = self.bloc(["Le prisme :", "deux bases pareilles,"], 30, TOILE).move_to(P(2.6, -1.85))
        self.play(FadeIn(p2, shift=UP * 0.1), FadeIn(t.face(0, BASE_C, 0.7)), FadeIn(t.face(1, BASE_C)), run_time=0.4)
        self.au_mot("et pas de pointe")
        p2b = self.t("et pas de pointe.", 30, ROUGE_ERREUR).next_to(p2, DOWN, buff=0.1)
        self.play(FadeIn(p2b), run_time=0.35)
        self.attendre_voix()

    # ── 07 : le patron de la tente ──────────────────────────────────────────
    def ecran_patron(self):
        self.ecran("07-patron")
        pc, par = patron_tente(1.0, 1.5)
        pa = PatronLibre(pc, par, e=1.25, centre=P(-3.6, -0.1), couleur=TOILE,
                         couleurs={"entree": BASE_C, "fond": BASE_C})
        pa.tilt = 0
        pa.angles.update(PLI_TENTE)
        pa.maj()
        self.au_mot("Et son patron")
        tit = self.t("Le patron de la tente", 44, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), FadeIn(pa), run_time=0.5)
        self.au_mot("On déplie la tente")
        self.play(pa.plier({k: 0 for k in PLI_TENTE}, run_time=0.8))
        self.play(pa.plier(tilt=-90, run_time=0.5))
        l1 = self.ligne([("3 rectangles", LAT_C), ("collés en bande,", LAT_C)], 30, buff=0.2)
        gauche(l1, 0.0, 1.5)
        self.aux_extraits(l1, ["3 rectangles", "collés en bande"])
        bande = VGroup(*[pa.contour_carre(k, LAT_C, 8) for k in ("tg", "sol", "td")])
        self.play(Create(bande), run_time=0.5)
        self.au_mot("et les 2 triangles")
        l2 = self.ligne([("et les", BASE_C), ("2 triangles,", BASE_C)], 32, buff=0.2)
        gauche(l2, 0.0, 0.75)
        self.aux_extraits([l2[0], l2[1]], ["et les", "2 triangles"])
        tri = VGroup(*[pa.contour_carre(k, BASE_C, 8) for k in ("entree", "fond")])
        self.play(Create(tri), run_time=0.4)
        l3 = self.t("un de chaque côté.", 32, BASE_C)
        gauche(l3, 0.0, 0.0)
        self.au_mot("un de chaque côté")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Replié")
        l4 = self.t("Replié : la tente !", 34, VERT_OK)
        gauche(l4, 0.0, -1.0)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeOut(bande), FadeOut(tri), run_time=0.3)
        self.play(pa.plier(tilt=0, run_time=0.7))
        self.play(pa.plier(PLI_TENTE, run_time=1.6))
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pr = prisme(regulier(5, 0.8), 1.6, axe="z", e=1.15, centre=P(-4.3, 1.4), couleur="#60a5fa")

        def autres_q(sc):
            sc.play(FadeIn(pr, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, [("5 sur une base", ARETE_C), ("+ 5 sur l'autre", ARETE_C)],
                            fs=28, buff=0.16, y0=-1.7, pas=0.5)
            lg.add(sc.rep_bas(1, [("+ 5 qui relient", ARETE_C)], fs=28, y0=-1.7, pas=0.5)[0])
            gr = [[(i, (i + 1) % 5) for i in range(5)], [(5 + i, 5 + (i + 1) % 5) for i in range(5)],
                  [(i, 5 + i) for i in range(5)]]
            for k, ex in enumerate(["5 arêtes sur une base", "5 sur l'autre", "5 qui relient"]):
                sc.aux_extraits([lg[k]], [ex])
                sc.play(*[Create(pr.arete_ab(a, b, sw=7)) for a, b in gr[k]], run_time=0.3)
            lg2 = sc.rep_bas(2, ["3 × 5", "= 15 arêtes."], fs=30, buff=0.2, y0=-1.7, pas=0.5)
            sc.aux_extraits(lg2, ["3 fois 5", "15 arêtes"])
            lg3 = sc.rep_bas(3, [("10, ce sont les sommets.", SOMMET_C)], fs=30, y0=-1.7, pas=0.5)
            sc.aux_extraits([lg3[0]], ["10, ce sont"])
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Un prisme a pour base", "un pentagone (5 côtés).",
                             "Combien a-t-il d'arêtes ?"],
                            [self.choix("15 arêtes"), self.choix("10 arêtes"), self.choix("7 arêtes")], 0,
                            ["5 sur une base + 5 sur l'autre + 5 qui relient", "3 × 5 = 15 arêtes.",
                             "10, ce sont les sommets."],
                            mot_q="Un prisme a pour base", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecrou(self, e=1.0, centre=ORIGIN):
        return prisme(regulier(6, 0.9, rot=0), 0.7, axe="y", e=e, centre=centre, couleur="#94a3b8",
                      couleur_trait="#f8fafc")

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ec = self.ecrou(1.45, P(-4.3, 0.6))
        trou = Ellipse(width=0.95, height=0.42, fill_color="#0f172a", fill_opacity=1, stroke_color="#f8fafc",
                       stroke_width=3).move_to(ec.centre_face(1))
        self.au_mot("Un écrou")
        l0 = self.bloc(["Un écrou a la forme", "d'un prisme à base hexagonale."], 34)
        gauche(l0, -1.6, 1.6)
        self.play(FadeIn(ec, shift=UP * 0.2), FadeIn(trou), FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Combien a-t-il de sommets")
        q = self.bloc(["Combien a-t-il de sommets,", "et combien d'arêtes ?"], 36, JAUNE_TITRE)
        gauche(q, -1.6, -0.2)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, -1.6, -1.7)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        ec = self.ecrou(1.3, P(-4.6, 0.5))
        self.add(ec)
        x, x2 = -2.6, -2.1
        l0 = self.ligne([("La base a", WHITE), ("6 côtés.", WHITE)], 32, buff=0.2)
        gauche(l0, x, 2.3)
        self.aux_extraits(l0, ["La base a", "6 côtés"])
        self.au_mot("Les sommets")
        ts = self.t("Les sommets :", 30, SOMMET_C)
        gauche(ts, x, 1.5)
        self.play(FadeIn(ts), run_time=0.25)
        ls = self.ligne([("6 sur chaque base", SOMMET_C), ("2 × 6", SOMMET_C), ("= 12 sommets", VERT_OK)], 30, buff=0.25)
        ls[1:].shift(RIGHT * 0.25)
        gauche(ls, x2, 0.9)
        self.aux_extraits([VGroup(ls[0], *[ec.sommet(i, r=0.1) for i in range(12)])], ["6 sur chaque base"])
        self.aux_extraits(ls[1:], ["2 fois 6", "12 sommets"])
        self.au_mot("Les arêtes")
        ta = self.t("Les arêtes :", 30, ARETE_C)
        gauche(ta, x, 0.0)
        self.play(FadeIn(ta), run_time=0.25)
        la = self.ligne([("6 en haut", ARETE_C), ("+ 6 en bas", ARETE_C), ("+ 6 qui relient", ARETE_C)], 30, buff=0.2)
        gauche(la, x2, -0.6)
        gr = [[(6 + i, 6 + (i + 1) % 6) for i in range(6)], [(i, (i + 1) % 6) for i in range(6)],
              [(i, 6 + i) for i in range(6)]]
        for k, ex in enumerate(["6 en haut", "6 en bas", "6 qui relient"]):
            self.aux_extraits([VGroup(la[k], *[ec.arete_ab(a, b, sw=7) for a, b in gr[k]])], [ex])
        la2 = self.ligne([("3 × 6", ARETE_C), ("= 18 arêtes", VERT_OK)], 30, buff=0.22)
        gauche(la2, x2, -1.2)
        self.aux_extraits(la2, ["3 fois 6", "18 arêtes"])
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        t = la_tente(1.05)
        t.add(t.face(0, BASE_C, 0.5), t.face(1, BASE_C), t.face(3, LAT_C, 0.5))
        lignes = self.finale_gauche(t, textes=[
            ("Un prisme droit : deux bases pareilles,", "et des rectangles autour."),
            ("Tout part du nombre de côtés de la base :",),
            ("faces = ce nombre + 2",), ("sommets = 2 × ce nombre",), ("arêtes = 3 × ce nombre",)],
            fs=28, x_fig=-4.9, xl=-2.5)
        self.add(t)
        self.au_mot("Un prisme droit")
        self.montrer_ligne(lignes[0])
        self.au_mot("Tout part du nombre")
        self.montrer_ligne(lignes[1])
        for k, m in enumerate(["les faces, c'est ce nombre", "les sommets, 2 fois", "les arêtes, 3 fois"]):
            self.au_mot(m)
            self.montrer_ligne(lignes[2 + k])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_bases()
        self.ecran_laterales()
        self.ecran_compter()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_patron()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class SolidesPrismeCM1(SolidesPrismeBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
