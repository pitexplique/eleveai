# longueur_defi.py
# EleveAI — Maths CM1 — série « Longueurs », épisode 05 : RÉSOUDRE UN DÉFI DE LONGUEURS
# (micro longueur_defi, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Décor et métier : Zoé, FACTRICE à vélo.
# Mapping micro → écrans : 01 (tournée 3 km, déjà 1 km 200 m), 02 (tout dans la même unité : 3000 m, 1200 m),
# 03 (schéma en barre : 3000 − 1200 = 1800 m), 05 (piège : 3 m − 40 cm n'est pas 3 − 40 ; 300 − 40 = 260 cm),
# questions 04 (4 tours de 250 m, C) et 06 (ficelle de 2 m en morceaux de 50 cm, B),
# défi 07 (3 m de ruban, 6 colis de 45 cm : assez ?).
# Voix : manim/voix/cm1-longueur-defi.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_defi_marques.json (python manim/scripts/cm1/aire_marques.py longueur:defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/longueur_defi.py LongueurDefiCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/longueur_defi.py LongueurDefiCM1 -o eleveai-maths-cm1-longueur-defi --media_dir manim/scripts/cm1/media-longueur-05
# Sortie : manim/sorties/cm1/maths/longueur/05-defi/eleveai-maths-cm1-longueur-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_cm1_commun import *  # noqa: E402,F403

GOUDRON = "#475569"
FICELLE = "#d6b98c"
CARTON = "#b45309"


def zoe_a_velo(s=1.0):
    """Zoé assise sur son vélo (de profil, vers la droite)."""
    v = velo(s)
    p = zoe(0.42 * s)
    selle = P(-0.1 * s, 0.55 * s)
    p.shift(selle - p.corps.get_bottom() + DOWN * 0.04 * s)
    return VGroup(p, v)


def route(longueur, h=0.5):
    """Une route vue de côté : du goudron et une ligne blanche en pointillés au milieu."""
    r = Rectangle(width=longueur, height=h, fill_color=GOUDRON, fill_opacity=1, stroke_width=0)
    ligne = DashedLine(r.get_left() + RIGHT * 0.15, r.get_right() + LEFT * 0.15, dash_length=0.22,
                       color=WHITE, stroke_width=3)
    return VGroup(r, ligne)


def drapeau(h=0.8, couleur=VERT_OK):
    mat = Line(P(0, 0), P(0, h), color=WHITE, stroke_width=4)
    fanion = Polygon(P(0, h), P(0, h - 0.3), P(0.42, h - 0.15), fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(mat, fanion)


def stade(lg=3.4, ht=1.7):
    """Un stade vu de haut : la pelouse et la piste orange."""
    piste = Ellipse(width=lg, height=ht, fill_color="#ea580c", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    herbe = Ellipse(width=lg - 0.6, height=ht - 0.55, fill_color="#16a34a", fill_opacity=1, stroke_color=WHITE,
                    stroke_width=3)
    return VGroup(piste, herbe)


def colis(c=0.62):
    """Un colis cadeau : une boîte en carton, un ruban rose en croix, un nœud."""
    boite = Square(side_length=c, fill_color=CARTON, fill_opacity=1, stroke_color="#78350f", stroke_width=2)
    v = Rectangle(width=c * 0.16, height=c, fill_color=RUBAN, fill_opacity=1, stroke_width=0)
    h = Rectangle(width=c, height=c * 0.16, fill_color=RUBAN, fill_opacity=1, stroke_width=0)
    noeud = VGroup(*[Ellipse(width=c * 0.36, height=c * 0.22, fill_color=RUBAN, fill_opacity=1, stroke_width=0)
                     .move_to(boite.get_top() + P(dx * c * 0.17, c * 0.08)) for dx in (-1, 1)])
    return VGroup(boite, v, h, noeud)


def ciseaux(s=1.0):
    """Des ciseaux ouverts (deux lames, deux anneaux)."""
    l1 = Line(P(0, 0), P(0.55, 0.18), color="#e5e7eb", stroke_width=6)
    l2 = Line(P(0, 0), P(0.55, -0.18), color="#e5e7eb", stroke_width=6)
    a1 = Circle(radius=0.11, color=ROUGE_ERREUR, stroke_width=5).move_to(P(-0.15, 0.12))
    a2 = Circle(radius=0.11, color=ROUGE_ERREUR, stroke_width=5).move_to(P(-0.15, -0.12))
    return VGroup(l1, l2, a1, a2).scale(s)


class LongueurDefiBase(PaysageLongueurCM1):
    nom_voix = "cm1-longueur-defi"
    fichier_marques = "longueur_defi_marques.json"
    ceinture = "bleue"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un défi de longueurs", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un défi de longueurs")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Combien de mètres", 38, JAUNE_TITRE)
        q1 = self.t("reste-t-il à pédaler ?", 38, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        rt = route(4.2).move_to(P(3.5, -0.35))
        zv = zoe_a_velo(0.8)
        zv.next_to(rt, UP, buff=0.0).align_to(rt, LEFT).shift(RIGHT * 0.3)
        fl = drapeau(0.9).next_to(rt, UP, buff=0).align_to(rt, RIGHT).shift(LEFT * 0.35)
        self.au_mot("Combien de mètres")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(rt), FadeIn(fl), FadeIn(zv, shift=RIGHT * 0.3), run_time=0.35)
        self.au_mot("reste-t-il")
        self.play(FadeIn(q1, shift=UP * 0.2), zv.animate.shift(RIGHT * 1.2), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Zoé, factrice à vélo ───────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = zoe(0.85).move_to(P(-5.0, 1.0))
        self.au_mot("Voici Zoé")
        nom = self.t("Zoé", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.25)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est factrice")
        met = self.t("factrice", 26, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        # la route de la tournée, en bas : départ à gauche, fin au drapeau
        x0, x1 = -5.6, 4.0
        rt = route(x1 - x0).move_to(P((x0 + x1) / 2, -2.0))
        fl = drapeau(0.8).next_to(rt, UP, buff=0).align_to(rt, RIGHT).shift(LEFT * 0.1)
        zv = zoe_a_velo(0.6)
        zv.next_to(rt, UP, buff=0.0).set_x(x0 + 0.65)
        self.au_mot("courrier à vélo")
        self.play(FadeIn(rt), FadeIn(fl), FadeIn(zv, shift=RIGHT * 0.3), run_time=0.45)
        XP = -2.4
        l1 = self.ligne([("Sa tournée :", WHITE), ("3 km.", JAUNE_TITRE)], 36, buff=0.2)
        self.col(l1, 2.3, XP)
        self.au_mot("Sa tournée")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("fait 3 kilomètres")
        tour = accolade(rt[0], "3 km", 26, dessus=False)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(tour), run_time=0.35)
        l2 = self.ligne([("Déjà roulé :", WHITE), ("1 km 200 m.", RUBAN2)], 36, buff=0.2)
        self.col(l2, 1.5, XP)
        self.au_mot("déjà roulé")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1 kilomètre 200 mètres")
        xf = x0 + (x1 - x0) * 0.4
        fait = Rectangle(width=xf - x0, height=0.14, fill_color=RUBAN2, fill_opacity=1, stroke_width=0)
        fait.move_to(P((x0 + xf) / 2, rt.get_top()[1] - 0.07))
        self.play(FadeIn(l2[1], shift=UP * 0.1), zv.animate.set_x(xf), GrowFromEdge(fait, LEFT), run_time=0.9)
        q = self.bloc(["Combien de mètres", "lui reste-t-il ?"], 38, JAUNE_TITRE)
        self.col(q, 0.25, XP)
        self.au_mot("Combien de mètres")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("lui reste-t-il")
        self.play(FadeIn(q[1], shift=UP * 0.15), Indicate(fl, color=JAUNE_TITRE), run_time=0.45)
        self.attendre_voix()

    # ── 02 : tout dans la même unité ────────────────────────────────────────
    def ecran_meme_unite(self):
        self.ecran("02-meme-unite")
        self.au_mot("la même unité")
        tit = self.t("Tout dans la même unité.", 40, ORANGE_RETENUE).move_to(P(0, 2.85))
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.35)
        cols = ["km", "hm", "dam", "m"]
        t1 = tableau_conv(cols, cw=0.9, ch=0.55, fs=24, surligne=("km", "m")).move_to(P(-4.15, 1.0))
        t2 = tableau_conv(cols, cw=0.9, ch=0.55, fs=24, surligne=("km", "m")).move_to(P(-4.15, -1.3))
        XP = -1.3
        l1 = self.ligne([("3 km", BLEU_D), ("= 3000 m", VERT_OK)], 44, buff=0.3)
        self.col(l1, 0.75, XP)
        self.au_mot("3 kilomètres")
        self.play(FadeIn(t1), FadeIn(l1[0], shift=UP * 0.1), FadeIn(chiffre(t1, "km", "3")), run_time=0.35)
        self.au_mot("c'est 3000")
        z1 = VGroup(*[chiffre(t1, u, "0", VERT_OK) for u in ("hm", "dam", "m")])
        self.play(FadeIn(l1[1], shift=UP * 0.1), LaggedStart(*[FadeIn(z, scale=1.3) for z in z1], lag_ratio=0.2),
                  run_time=0.45)
        l2 = self.ligne([("1 km 200 m", BLEU_D), ("= 1200 m", VERT_OK)], 44, buff=0.3)
        self.col(l2, -1.55, XP)
        self.au_mot("1 kilomètre 200 mètres")
        self.play(FadeIn(t2), FadeIn(l2[0], shift=UP * 0.1), FadeIn(chiffre(t2, "km", "1")),
                  FadeIn(chiffre(t2, "hm", "2")), run_time=0.35)
        self.au_mot("c'est 1200")
        z2 = VGroup(*[chiffre(t2, u, "0", VERT_OK) for u in ("dam", "m")])
        self.play(FadeIn(l2[1], shift=UP * 0.1), LaggedStart(*[FadeIn(z, scale=1.3) for z in z2], lag_ratio=0.2),
                  run_time=0.4)
        self.insister(l2[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : le schéma en barre, puis la soustraction ───────────────────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        b = barre([1200, 1800], 0.0026, couleurs=(RUBAN2, "#475569"), h=0.7, inconnue=1).move_to(P(-0.4, 1.35))
        self.au_mot("Le schéma en barre")
        self.play(GrowFromEdge(b, LEFT), run_time=0.5)
        self.au_mot("c'est la tournée")
        haut = Brace(b, UP, color=JAUNE_TITRE)
        th = VGroup(self.t("la tournée :", 28, JAUNE_TITRE),
                    hors_audit(Text("3000 m", font_size=28, color=JAUNE_TITRE, weight=BOLD)))
        th.arrange(RIGHT, buff=0.15).next_to(haut, UP, buff=0.1)
        self.play(GrowFromCenter(haut), FadeIn(th), run_time=0.4)
        self.au_mot("ce qui est fait")
        bf = Brace(b[0], DOWN, color=RUBAN2)
        tf = VGroup(self.t("fait :", 28, RUBAN2),
                    hors_audit(Text("1200 m", font_size=28, color=RUBAN2, weight=BOLD)))
        tf.arrange(RIGHT, buff=0.15).next_to(bf, DOWN, buff=0.1)
        self.play(GrowFromCenter(bf), FadeIn(tf), Indicate(b[0], color=RUBAN2, scale_factor=1.04), run_time=0.4)
        self.au_mot("ce qui reste")
        br = Brace(b[1], DOWN, color=ORANGE_RETENUE)
        tr = self.t("reste :", 28, ORANGE_RETENUE)
        qm = hors_audit(Text("?", font_size=30, color=ORANGE_RETENUE, weight=BOLD))
        VGroup(tr, qm).arrange(RIGHT, buff=0.15).next_to(br, DOWN, buff=0.1)
        self.play(GrowFromCenter(br), FadeIn(tr), FadeIn(qm, scale=1.4), run_time=0.4)
        l1 = self.ligne([("3000 − 1200", WHITE), ("= 1800", VERT_OK)], 46, buff=0.3)
        gauche(l1, -4.6, -1.0)
        self.au_mot("3000 moins 1200")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1200, 1800")
        m1800 = hors_audit(Text("1800 m", font_size=28, color=VERT_OK, weight=BOLD)).move_to(qm).align_to(qm, LEFT)
        self.play(FadeIn(l1[1], shift=UP * 0.1), Transform(qm, m1800),
                  b[1].animate.set_fill(VERT_OK, 0.55), run_time=0.45)
        res = self.ligne([("Il reste", WHITE), ("1800 m", VERT_OK), ("à Zoé.", WHITE)], 44, buff=0.22)
        gauche(res, -4.6, -2.0)
        self.au_mot("Il reste 1800 mètres")
        self.play(FadeIn(res[0], shift=UP * 0.1), FadeIn(res[1], scale=1.2), run_time=0.35)
        self.au_mot("à Zoé")
        self.play(FadeIn(res[2], shift=UP * 0.1), run_time=0.25)
        self.insister(res[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def figure_q1(self):
        st = stade(3.6, 1.8)
        zv = zoe_a_velo(0.38).move_to(st[0].get_top() + DOWN * 0.05)
        return VGroup(st, zv).move_to(P(-3.8, 1.5))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[0][0], color=VERT_OK, scale_factor=1.04), run_time=0.2)

        self.question_gauche("04-question", "04b-reponse",
                             ["Zoé fait 4 fois le tour", "du stade à vélo.", "Un tour : 250 m.",
                              "Combien de mètres en tout ?"],
                             [self.choix("254 m"), self.choix("2500 m"), self.choix("1000 m")], 2,
                             ["Un tour, 4 fois :", "250 × 4 = 1000 m.", "C'est 1 km !"],
                             -0.75, couper={1: ("250 × 4", "= 1000 m.")},
                             mot_q="Zoé fait 4", autres_q=autres_q, autres_r=apres)

    # ── 05 : le piège (3 m − 40 cm n'est pas 3 − 40) ────────────────────────

    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention")
        XP = 0.0
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        x0 = -6.0
        k = 0.016  # ici, 3 m = 4,8 unités
        reste = ruban(260 * k, RUBAN, ep=0.42).move_to(P(0, 0.1)).align_to(P(x0, 0), LEFT)
        bout = ruban(40 * k, ROUGE_ERREUR, ep=0.42).next_to(reste, RIGHT, buff=0)
        l0 = self.bloc(["On ne calcule jamais avec", "deux unités différentes."], 32)
        self.col(l0, 2.0, XP)
        self.au_mot("On ne calcule jamais")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("deux unités différentes")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.25)
        l1 = self.ligne([("3 m − 40 cm", BLEU_D), ("≠ 3 − 40 !", ROUGE_ERREUR)], 40, buff=0.3)
        self.col(l1, 0.95, XP)
        self.au_mot("3 mètres moins 40 centimètres")
        e3 = etiq(VGroup(reste, bout), "3 m", 32, cote=UP)
        cis = ciseaux(1.3).rotate(PI / 2).next_to(bout, DOWN, buff=0.1).set_x(bout.get_left()[0])
        e40 = etiq(bout, "40 cm", 28, ROUGE_ERREUR, cote=UP)
        self.play(FadeIn(l1[0], shift=UP * 0.1), GrowFromEdge(VGroup(reste, bout), LEFT), FadeIn(e3),
                  FadeIn(cis), FadeIn(e40), run_time=0.45)
        self.au_mot("pas 3 moins 40")
        self.play(FadeIn(l1[1], scale=1.3), run_time=0.3)
        l2 = self.ligne([("3 m", BLEU_D), ("= 300 cm", VERT_OK)], 44, buff=0.3)
        self.col(l2, -0.05, XP)
        self.au_mot("3 mètres, c'est")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 300")
        e300 = hors_audit(Text("300 cm", font_size=32, color=VERT_OK, weight=BOLD).move_to(e3))
        self.play(FadeIn(l2[1], shift=UP * 0.1), Transform(e3, e300), run_time=0.25)
        l3 = self.ligne([("300 − 40", BLEU_D), ("= 260 cm", VERT_OK)], 44, buff=0.3)
        self.col(l3, -1.05, XP)
        self.au_mot("300 moins 40")
        self.play(FadeIn(l3[0], shift=UP * 0.1), VGroup(bout, e40).animate.shift(DOWN * 0.95), FadeOut(cis),
                  run_time=0.4)
        self.au_mot("40, 260")
        e260 = hors_audit(Text("260 cm", font_size=32, color=VERT_OK, weight=BOLD)).next_to(reste, UP, buff=0.18)
        self.play(FadeIn(l3[1], shift=UP * 0.1), Transform(e3, e260), Indicate(reste, color=VERT_OK, scale_factor=1.04),
                  run_time=0.45)
        self.insister(l3[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def figure_q2(self):
        f = ruban(200 * 0.021, FICELLE, ep=0.2)
        cs = ciseaux(1.4).rotate(-PI / 2).next_to(f, UP, buff=0.08).set_x(f.get_left()[0] + 1.05)
        return VGroup(f, cs).move_to(P(-3.8, 1.6))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        self.question_gauche("06-question", "06b-reponse",
                             ["Zoé a une ficelle de 2 m.", "Elle coupe des morceaux", "de 50 cm.",
                              "Combien de morceaux ?"],
                             [self.choix("25 morceaux"), self.choix("4 morceaux"), self.choix("100 morceaux")], 1,
                             ["2 m = 200 cm.", "200 ÷ 50 :", "4 morceaux."],
                             -0.75, couper={0: ("2 m", "= 200 cm.")},
                             mot_q="Zoé a une ficelle", autres_q=autres_q)

    # ── 07 : le défi (3 m de ruban, 6 colis de 45 cm) ───────────────────────
    def six_colis(self, c=0.62):
        g = VGroup(*[colis(c) for _ in range(6)])
        g.arrange_in_grid(rows=2, cols=3, buff=0.45)
        return g

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        XP = 0.4
        rb = ruban(300 * 0.016, RUBAN, ep=0.34).move_to(P(-3.7, 1.75))
        six = self.six_colis(0.9).move_to(P(-3.7, -0.35))
        l0 = self.ligne([("Zoé a", WHITE), ("3 m", RUBAN), ("de ruban.", WHITE)], 36, buff=0.2)
        self.col(l0, 2.1, XP)
        self.au_mot("Zoé a 3")
        self.play(FadeIn(l0[0]), FadeIn(l0[1], shift=UP * 0.1), GrowFromEdge(rb, LEFT), run_time=0.2)
        self.add(etiq(rb, "3 m", 30, cote=UP, buff=0.12))
        self.au_mot("mètres de ruban")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.2)
        l1 = self.ligne([("Chaque colis :", WHITE), ("45 cm.", RUBAN)], 36, buff=0.2)
        self.col(l1, 1.4, XP)
        self.au_mot("Chaque colis cadeau")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(six[0], scale=1.2), run_time=0.3)
        self.au_mot("demande 45 centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(six[0][1:], color=JAUNE_TITRE), run_time=0.35)
        l2 = self.ligne([("Elle a", WHITE), ("6 colis.", JAUNE_TITRE)], 36, buff=0.2)
        self.col(l2, 0.7, XP)
        self.au_mot("Elle a 6 colis")
        self.play(FadeIn(l2, shift=UP * 0.1), LaggedStart(*[FadeIn(c, shift=UP * 0.15) for c in six[1:]],
                                                          lag_ratio=0.15), run_time=0.6)
        q = self.bloc(["A-t-elle assez", "de ruban ?"], 40, JAUNE_TITRE)
        self.col(q, -0.45, XP)
        self.au_mot("A-t-elle assez de ruban")
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(rb), run_time=0.5)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        ech = 0.028  # 300 cm = 8,4 unités
        x0 = -4.6
        fond = Rectangle(width=300 * ech, height=0.34, fill_color="#334155", fill_opacity=1, stroke_color=WHITE,
                         stroke_width=2).move_to(P(0, 1.7)).align_to(P(x0, 0), LEFT)
        parts = VGroup(*[Rectangle(width=45 * ech, height=0.34, fill_color=RUBAN if k % 2 == 0 else RUBAN2,
                                   fill_opacity=1, stroke_color=WHITE, stroke_width=2) for k in range(6)])
        parts.arrange(RIGHT, buff=0).align_to(fond, LEFT).align_to(fond, DOWN)
        self.add(fond)
        XL = -5.6
        l1 = self.ligne([("Il faut :", WHITE), ("45", WHITE), ("× 6", WHITE), ("= 270 cm.", VERT_OK)], 40,
                        buff=0.22)
        gauche(l1, XL, 0.35)
        self.au_mot("Ce qu'il faut")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("faut : 45")
        self.play(FadeIn(l1[1], shift=UP * 0.1), GrowFromEdge(parts[0], LEFT), run_time=0.2)
        self.au_mot("6 fois")
        self.play(FadeIn(l1[2], shift=UP * 0.1), LaggedStart(*[GrowFromEdge(p, LEFT) for p in parts[1:]],
                                                             lag_ratio=0.3), run_time=0.2)
        self.au_mot("fois : 270")
        b270 = Brace(parts, DOWN, color=VERT_OK, buff=0.05)
        t270 = hors_audit(Text("270 cm", font_size=26, color=VERT_OK, weight=BOLD)).next_to(b270, DOWN, buff=0.06)
        self.play(FadeIn(l1[3], shift=UP * 0.1), GrowFromCenter(b270), FadeIn(t270), run_time=0.3)
        l2 = self.ligne([("Elle a :", WHITE), ("3 m", BLEU_D), ("= 300 cm.", VERT_OK)], 40, buff=0.22)
        gauche(l2, XL, -0.4)
        self.au_mot("Ce qu'elle a")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("a : 3 mètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(fond, color=JAUNE_TITRE, scale_factor=1.02), run_time=0.3)
        self.au_mot("c'est 300")
        b300 = Brace(fond, UP, color=BLEU_D, buff=0.05)
        t300 = hors_audit(Text("300 cm", font_size=26, color=BLEU_D, weight=BOLD)).next_to(b300, UP, buff=0.06)
        self.play(FadeIn(l2[2], shift=UP * 0.1), GrowFromCenter(b300), FadeIn(t300), run_time=0.25)
        l3 = self.ligne([("300", BLEU_D), ("> 270 :", BLEU_D)], 40, buff=0.2)
        gauche(l3, XL, -1.15)
        self.au_mot("centimètres. 300")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("plus grand que 270")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        l4 = self.gros("elle a assez,", fs=46)
        gauche(l4, XL, -1.95)
        self.au_mot("elle a assez")
        self.play(FadeIn(l4, scale=1.15), run_time=0.35)
        l5 = self.ligne([("et il reste", WHITE), ("30 cm.", ORANGE_RETENUE)], 40, buff=0.2)
        gauche(l5, XL, -2.78)
        self.au_mot("il reste 30")
        reste = Rectangle(width=30 * ech, height=0.34, stroke_color=ORANGE_RETENUE, stroke_width=5,
                          fill_opacity=0).align_to(fond, RIGHT).align_to(fond, DOWN)
        self.play(FadeIn(l5[0], shift=UP * 0.1), FadeIn(l5[1], scale=1.2), Create(reste), run_time=0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        fig = zoe_a_velo(1.1)
        lignes = self.finale_gauche(fig, textes=[
            ("Un problème de longueurs :", "tout dans la même unité."),
            ("Puis on calcule.",),
            ("On n'oublie pas l'unité", "dans la réponse.")], fs=32)
        self.add(fig)
        self.au_mot("Pour résoudre")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Puis on calcule")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et on n'oublie pas")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_meme_unite()
        self.ecran_calcul()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class LongueurDefiCM1(LongueurDefiBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "bleue"
