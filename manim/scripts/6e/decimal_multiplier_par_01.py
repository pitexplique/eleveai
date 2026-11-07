# decimal_multiplier_par_01.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 10 : MULTIPLIER PAR 0,1 ; 0,01 ; 0,001
# (micro decimal_multiplier_par_01, notion decimal_calcul), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux-multiplier-par-01.js).
# Décor et métier : Kenzo, MAQUETTISTE DE CINÉMA (centres : cinéma, dinosaures).
# Écrans : garde (00), situation (01), le sens (02), la valeur des chiffres (03), le raccourci (04),
# QUESTION 1 (05), × 0,01 et × 0,001 (06), le piège (07), QUESTION 2 (08), défi (09) et correction (09b),
# appris (10), fin (11).
# Voix : manim/voix/6e-decimal-multiplier-par-01.json (Julie, débit −6) ;
# marques : decimal_multiplier_par_01_marques.json (python manim/scripts/6e/decimal_marques.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_multiplier_par_01.py DecimalMultiplierPar016e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_multiplier_par_01.py DecimalMultiplierPar016e -o eleveai-maths-6e-decimal-multiplier-par-01 --media_dir manim/scripts/6e/media-dec-10
# Sortie : manim/sorties/6e/maths/decimaux/10-multiplier-par-01/eleveai-maths-6e-decimal-multiplier-par-01.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403

VERT_D = "#34d399"
COUL_RANG = {"Dizaines": VERT_D, "Unités": BLEU_D, "Dixièmes": AMBRE_D, "Centièmes": ROSE_D, "Millièmes": VIOLET_D}


def kenzo(s=1.0):
    """Kenzo, maquettiste de cinéma : un clap à la main."""
    p = visage(personne(peau="#8d5524", tenue="#475569", cheveux="#111827", s=s))
    c = p.corps.get_center()
    clap = clap_cinema(0.55 * s).move_to(c + P(0.62 * s, -0.05 * s))
    p.add(clap)
    return p


def clap_cinema(s=1.0):
    corps = Rectangle(width=1.0 * s, height=0.62 * s, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2)
    haut = Rectangle(width=1.0 * s, height=0.2 * s, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                     stroke_width=2).next_to(corps, UP, buff=0.02).rotate(0.22, about_point=corps.get_corner(UL) + UP * 0.02)
    bandes = VGroup(*[Polygon(P(-0.5 + 0.2 * k, 0), P(-0.4 + 0.2 * k, 0), P(-0.3 + 0.2 * k, 0.2), P(-0.4 + 0.2 * k, 0.2),
                              fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(s, about_point=ORIGIN)
                      for k in range(5)])
    bandes.move_to(haut).rotate(0.22, about_point=corps.get_corner(UL) + UP * 0.02)
    return VGroup(corps, haut, bandes)


def tour(h=4.0, w=1.3, couleur="#64748b"):
    """Une tour de cinéma : un bloc, des fenêtres, une antenne."""
    bloc = Rectangle(width=w, height=h, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    fen = VGroup()
    nl = max(1, int(h / 0.42))
    for i in range(nl):
        for j in range(3):
            f = Rectangle(width=w * 0.18, height=min(0.2, h / nl * 0.5), fill_color="#fde68a", fill_opacity=0.9,
                          stroke_width=0)
            f.move_to(bloc.get_top() + DOWN * (h / nl) * (i + 0.5) + RIGHT * w * (j - 1) * 0.28)
            fen.add(f)
    ant = Line(bloc.get_top(), bloc.get_top() + UP * h * 0.12, color=WHITE, stroke_width=4)
    g = VGroup(bloc, fen, ant)
    g.bloc = bloc
    return g


def camion(s=1.0):
    cab = RoundedRectangle(width=1.0 * s, height=0.9 * s, corner_radius=0.08 * s, fill_color="#ef4444", fill_opacity=1,
                           stroke_width=0)
    rem = Rectangle(width=2.6 * s, height=1.2 * s, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
    rem.next_to(cab, LEFT, buff=0.05 * s).align_to(cab, DOWN)
    vitre = Rectangle(width=0.4 * s, height=0.35 * s, fill_color="#bae6fd", fill_opacity=1, stroke_width=0)
    vitre.move_to(cab.get_center() + P(0.2 * s, 0.17 * s))
    roues = VGroup(*[Circle(radius=0.22 * s, fill_color="#111827", fill_opacity=1, stroke_color="#94a3b8",
                            stroke_width=3).move_to(P(x * s, 0) + cab.get_bottom() + DOWN * 0.02 * s)
                     for x in (-2.7, -1.6, 0.0)])
    return VGroup(rem, cab, vitre, roues)


class Tableau(TableauNum):
    """TableauNum aux couleurs de la série, Dizaines comprises."""

    def __init__(self, rangs, virgule_apres, **kw):
        super().__init__(rangs, virgule_apres=virgule_apres, couleurs=COUL_RANG, **kw)


def fleches_descente(haut, bas, i_haut, i_bas, couleur=VERT_OK):
    """La flèche du chiffre i_haut (tableau du haut) vers sa nouvelle case i_bas (tableau du bas)."""
    a = haut.cases[i_haut].get_bottom() + DOWN * 0.04
    b = bas.cases[i_bas].get_top() + UP * 0.04
    return Arrow(a, b, color=couleur, buff=0.04, stroke_width=5, max_tip_length_to_length_ratio=0.25)


class DecimalMultiplierPar01Base(PaysageDecimal):
    nom_voix = "6e-decimal-multiplier-par-01"
    fichier_marques = "decimal_multiplier_par_01_marques.json"

    def rep_gauche(self, i, y, avec=(), fs=32):
        """La ligne i de la réponse, écrite en grand SOUS la figure, à gauche (sous les cartes,
        la colonne la rapetissait) ; chaque nombre à son mot. rep_fini() à la fin."""
        t = Text(self.ph_q[i].original_text, font_size=fs, color=VERT_OK)
        t.move_to(P(0, y)).align_to(P(-6.3, 0), LEFT)
        if t.get_right()[0] > 0.6:
            t.scale_to_fit_width(6.9).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(t, shift=UP * 0.1), *avec, run_time=0.35)
        return t

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Multiplier par 0,1 ; 0,01 ; 0,001", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Multiplier")
        self.play(FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.4)
        self.play(Write(titre), run_time=0.6)
        grande = tour(3.0, 1.0).move_to(P(2.4, 0.35))
        petite = tour(0.3, 0.1).next_to(grande, RIGHT, buff=0.9).align_to(grande.bloc, DOWN)
        fl = Arrow(grande.get_right() + LEFT * 0.1 + DOWN * 0.6, petite.get_left() + UP * 0.25, color=AMBRE_D,
                   buff=0.12, stroke_width=6)
        q = self.bloc(["Pourquoi le nombre", "devient-il plus petit ?"], 42).move_to(P(-3.3, 0.35))
        self.au_mot("Pourquoi")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(grande), run_time=0.35)
        self.au_mot("plus petit")
        self.play(GrowArrow(fl), FadeIn(petite, scale=0.3), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Kenzo, maquettiste de cinéma ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ke = kenzo(1.05).move_to(P(-5.2, 0.1))
        self.au_mot("Voici Kenzo")
        nom = self.t("Kenzo", 44, BLEU_CALCUL).next_to(ke, UP, buff=0.2)
        self.play(FadeIn(ke, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il fabrique")
        met = self.bloc(["maquettiste", "de cinéma"], 28, BLEU_CALCUL).next_to(ke, DOWN, buff=0.18)
        hors_audit(met)
        l1 = self.t("Il fabrique des maquettes.", 36)
        self.col(l1, 2.6)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        vraie = tour(3.7, 1.1).move_to(P(-2.4, 0.0))
        l2 = self.ligne([("Une vraie tour :", WHITE), ("37 m", VERT_D)], 38)
        self.col(l2, 1.55)
        self.au_mot("Une vraie tour")
        self.play(FadeIn(vraie, shift=UP * 0.3), FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("37 mètres")
        et = self.t("37 m", 30, VERT_D).next_to(vraie, UP, buff=0.12)
        self.play(FadeIn(l2[1], scale=1.2), FadeIn(et), run_time=0.35)
        self.au_mot("Sa maquette")
        maq = tour(0.37, 0.11).next_to(vraie, RIGHT, buff=0.55).align_to(vraie.bloc, DOWN)
        l3 = self.bloc(["Sa maquette :", "10 fois plus petite."], 38)
        self.col(l3, 0.3)
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(maq, scale=0.3), run_time=0.35)
        self.au_mot("10 fois")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(maq, color=AMBRE_D, scale_factor=2.0), run_time=0.45)
        self.au_mot("Il calcule")
        g = self.gros("37 × 0,1 = ?", couleur=JAUNE_TITRE, fs=58)
        self.col(g, -1.2, xl=1.3)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le sens de × 0,1 ───────────────────────────────────────────────
    def ecran_sens(self):
        self.ecran("02-sens")
        h = 4.6
        t = tour(h, 1.3).move_to(P(-3.6, -0.2))
        tranches = VGroup(*[Line(t.bloc.get_corner(DL) + UP * h / 10 * k, t.bloc.get_corner(DR) + UP * h / 10 * k,
                                 color=AMBRE_D, stroke_width=4) for k in range(1, 10)])
        part = Rectangle(width=1.3, height=h / 10, fill_color=AMBRE_D, fill_opacity=0.9, stroke_width=0)
        part.move_to(t.bloc.get_bottom() + UP * h / 20)
        self.add(t)
        self.au_mot("0,1, c'est")
        l1 = self.ligne([("0,1", AMBRE_D), ("c'est", WHITE), ("un dixième.", AMBRE_D)], 40)
        self.col(l1, 2.5)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Prendre")
        l2 = self.t("Un dixième de 37,", 38)
        self.col(l2, 1.4)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("partager")
        l3 = self.t("c'est partager 37 en 10.", 38)
        self.col(l3, 0.6)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("en 10")
        self.play(LaggedStart(*[Create(x) for x in tranches], lag_ratio=0.12), run_time=0.8)
        self.play(FadeIn(part), Indicate(part, color=AMBRE_D, scale_factor=1.3), run_time=0.5)
        self.au_mot("Multiplier par 0,1")
        g = self.gros("× 0,1   c'est   ÷ 10", fs=52)
        self.col(g, -0.9, xl=1.2)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la valeur des chiffres ─────────────────────────────────────────
    def deux_tableaux(self, larg=1.75, h=1.0, fs_ent=32, x=-3.5, y=1.3, ecart=1.9):
        rangs = ("Dizaines", "Unités", "Dixièmes")
        t1 = Tableau(rangs, 1, larg=larg, h=h, fs_ent=fs_ent).move_to(P(x, y))
        t2 = Tableau(rangs, 1, larg=larg, h=h, fs_ent=fs_ent)
        t2.shift(t1.cases.get_center() + DOWN * ecart - t2.cases.get_center())
        return t1, t2

    def ecran_valeur(self):
        self.ecran("03-valeur")
        t1, t2 = self.deux_tableaux()
        t2.remove(t2.entetes)
        h1 = [t1.chiffre(0, 3, VERT_D), t1.chiffre(1, 7, BLEU_D)]
        self.play(FadeIn(t1), *[FadeIn(c) for c in h1], run_time=0.35)
        self.au_mot("Chaque chiffre")
        l1 = self.bloc(["Chaque chiffre devient", "dix fois plus petit :"], 36)
        self.col(l1, 2.55)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("il descend")
        l2 = self.t("il descend d'un rang.", 36, VERT_OK)
        self.col(l2, 1.6)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(t2.cases), FadeIn(t2.virgule), run_time=0.35)
        self.au_mot("3 dizaines")
        l3 = self.ligne([("3 dizaines", VERT_D), ("→", WHITE), ("3 unités", BLEU_D)], 36)
        self.col(l3, 0.75)
        f1 = fleches_descente(t1, t2, 0, 1)
        b3 = t2.chiffre(1, 3, BLEU_D)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(h1[0], color=VERT_D, scale_factor=1.6), run_time=0.35)
        self.au_mot("3 unités")
        self.play(FadeIn(l3[1]), FadeIn(l3[2], shift=UP * 0.1), GrowArrow(f1), FadeIn(b3, scale=1.5), run_time=0.4)
        self.au_mot("7 unités")
        l4 = self.ligne([("7 unités", BLEU_D), ("→", WHITE), ("7 dixièmes", AMBRE_D)], 36)
        self.col(l4, 0.05)
        f2 = fleches_descente(t1, t2, 1, 2)
        b7 = t2.chiffre(2, 7, AMBRE_D)
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(h1[1], color=BLEU_D, scale_factor=1.6), run_time=0.35)
        self.au_mot("7 dixièmes")
        self.play(FadeIn(l4[1]), FadeIn(l4[2], shift=UP * 0.1), GrowArrow(f2), FadeIn(b7, scale=1.5), run_time=0.4)
        self.au_mot("37 fois 0,1")
        g = self.gros("37 × 0,1 = 3,7", fs=54)
        self.col(g, -1.0, xl=1.2)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.au_mot("La maquette")
        l5 = self.ligne([("La maquette :", WHITE), ("3,7 m", VERT_OK)], 36)
        self.col(l5, -2.2, xl=1.2)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 04 : le raccourci ───────────────────────────────────────────────────
    def ecran_raccourci(self):
        self.ecran("04-raccourci")
        self.au_mot("Le raccourci")
        tit = self.t("Le raccourci :", 46, JAUNE_TITRE)
        self.col(tit, 2.85, xl=-4.2)
        self.play(Write(tit), run_time=0.35)
        # 37 → 3,7 : la virgule saute d'un rang vers la gauche (illustration, nombres déjà dits)
        trois = hors_audit(Text("3", font_size=150, color=VERT_D, weight=BOLD)).move_to(P(-1.2, -0.2))
        sept = hors_audit(Text("7", font_size=150, color=BLEU_D, weight=BOLD)).next_to(trois, RIGHT, buff=0.55)
        def virg(x):
            v = hors_audit(Text(",", font_size=150, color=ROUGE_ERREUR, weight=BOLD))
            return v.move_to(P(x, trois.get_bottom()[1] + 0.05))
        x_av = sept.get_right()[0] + 0.25
        x_ap = (trois.get_right()[0] + sept.get_left()[0]) / 2
        v1 = virg(x_av)
        self.au_mot("la virgule")
        l1 = self.t("la virgule se décale d'un rang vers la gauche.", 36)
        self.col(l1, 2.05, xl=-4.2)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(trois), FadeIn(sept), FadeIn(v1, scale=1.5), run_time=0.4)
        arc = CurvedArrow(P(x_av, trois.get_top()[1] + 0.25), P(x_ap, trois.get_top()[1] + 0.25), angle=1.4,
                          color=ROUGE_ERREUR, stroke_width=6)
        self.au_mot("vers la gauche")
        self.play(Create(arc), v1.animate.move_to(P(x_ap, v1.get_y())), run_time=0.8)
        self.play(Indicate(v1, color=ROUGE_ERREUR, scale_factor=1.6), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t1, t2 = self.deux_tableaux(larg=1.7, h=1.0, x=-3.6, y=2.0, ecart=1.85)
        t2.remove(t2.entetes)
        h1 = [t1.chiffre(0, 5, VERT_D), t1.chiffre(1, 2, BLEU_D)]

        def avant(sc):
            sc.play(FadeIn(t1), *[FadeIn(c) for c in h1], run_time=0.35)

        def apres(sc):
            sc.au_mot("Chaque chiffre")
            sc.rep_gauche(0, -1.05, avec=[FadeIn(t2.cases), FadeIn(t2.virgule)])
            sc.au_mot("5 dizaines")
            sc.rep_gauche(1, -1.7, avec=[GrowArrow(fleches_descente(t1, t2, 0, 1)), GrowArrow(fleches_descente(t1, t2, 1, 2))])
            sc.au_mot("5,2")
            sc.rep_gauche(2, -2.35, avec=[FadeIn(t2.chiffre(1, 5, BLEU_D), scale=1.5), FadeIn(t2.chiffre(2, 2, AMBRE_D), scale=1.5)])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Combien font", "52 × 0,1 ?"],
                            [self.t("520", 36), self.t("5,2", 36), self.t("0,52", 36)], 1,
                            ["Chaque chiffre descend d'un rang :", "5 dizaines deviennent 5 unités.", "5,2."],
                            mot_q="Combien", avant_q=avant, autres_r=apres)

    # ── 06 : × 0,01 et × 0,001 ──────────────────────────────────────────────
    def ecran_001(self):
        self.ecran("06-001")
        rangs = ("Dizaines", "Unités", "Dixièmes", "Centièmes", "Millièmes")
        kw = dict(larg=1.38, h=0.8, fs_ent=32)
        t1 = Tableau(rangs, 1, **kw).move_to(P(-3.1, 2.15))
        t2 = Tableau(rangs, 1, **kw)
        t3 = Tableau(rangs, 1, **kw)
        t2.shift(t1.cases.get_center() + DOWN * 1.45 - t2.cases.get_center())
        t3.shift(t2.cases.get_center() + DOWN * 1.45 - t3.cases.get_center())
        t2.remove(t2.entetes)
        t3.remove(t3.entetes)
        self.play(FadeIn(t1), FadeIn(t1.chiffre(0, 3, VERT_D)), FadeIn(t1.chiffre(1, 7, BLEU_D)), run_time=0.35)
        self.au_mot("Pour un petit décor")
        l1 = self.bloc(["Un petit décor :", "100 fois plus petit."], 36)
        self.col(l1, 2.65)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("100 fois")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 0,01")
        l2 = self.ligne([("× 0,01 :", ROSE_D), ("deux rangs.", WHITE)], 36)
        self.col(l2, 1.45)
        self.play(FadeIn(l2[0], scale=1.2), run_time=0.3)
        self.au_mot("deux rangs")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(t2.cases), FadeIn(t2.virgule), run_time=0.35)
        self.au_mot("37 fois 0,01")
        g1 = self.ligne([("37 × 0,01 =", WHITE), ("0,37 m", ROSE_D)], 38)
        self.col(g1, 0.6)
        self.play(FadeIn(g1[0], shift=UP * 0.1), GrowArrow(fleches_descente(t1, t2, 0, 2, ROSE_D)),
                  GrowArrow(fleches_descente(t1, t2, 1, 3, ROSE_D)), run_time=0.4)
        self.au_mot("0,37")
        self.play(FadeIn(g1[1], scale=1.2), FadeIn(t2.chiffre(1, 0, BLEU_D), scale=1.5),
                  FadeIn(t2.chiffre(2, 3, AMBRE_D), scale=1.5), FadeIn(t2.chiffre(3, 7, ROSE_D), scale=1.5),
                  run_time=0.4)
        self.au_mot("Et fois 0,001")
        l3 = self.ligne([("× 0,001 :", VIOLET_D), ("trois rangs.", WHITE)], 36)
        self.col(l3, -0.35)
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.3)
        self.au_mot("trois rangs")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(t3.cases), FadeIn(t3.virgule), run_time=0.35)
        self.au_mot("37 fois 0,001")
        g2 = self.ligne([("37 × 0,001 =", WHITE), ("0,037 m", VIOLET_D)], 38)
        self.col(g2, -1.3)
        self.play(FadeIn(g2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("0,037")
        self.play(FadeIn(g2[1], scale=1.2), FadeIn(t3.chiffre(1, 0, BLEU_D), scale=1.5),
                  FadeIn(t3.chiffre(2, 0, AMBRE_D), scale=1.5), FadeIn(t3.chiffre(3, 3, ROSE_D), scale=1.5),
                  FadeIn(t3.chiffre(4, 7, VIOLET_D), scale=1.5), run_time=0.4)
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention !", 48, ROUGE_ERREUR)
        self.col(tit, 2.85, xl=0.8)
        self.play(Write(tit), run_time=0.35)
        vraie = tour(2.6, 0.8).move_to(P(-4.6, -0.6))
        geante = tour(5.6, 1.5, couleur="#7f1d1d").move_to(P(-2.0, -0.2))
        geante.scale_to_fit_height(5.6).move_to(P(-2.1, 0.0))
        self.add(vraie)
        self.au_mot("Multiplier par 0,1")
        l1 = self.ligne([("× 0,1", AMBRE_D), ("ne rend jamais", WHITE)], 38)
        self.col(l1, 2.0, xl=0.8)
        l1b = self.t("plus grand.", 38)
        self.col(l1b, 1.35, xl=0.8)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ne rend")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus grand")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Si ton résultat")
        l2 = self.bloc(["Si ton résultat grandit,", "tu t'es trompé de sens."], 36, ROUGE_ERREUR)
        self.col(l2, 0.35, xl=0.8)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(geante, shift=UP * 0.5), run_time=0.45)
        self.au_mot("tu t'es trompé")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(croix(geante, sw=9)), run_time=0.4)
        self.au_mot("370, c'est")
        l3 = self.t("370 = 37 × 10,", 40)
        self.col(l3, -1.05, xl=0.8)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("pas 37")
        l4 = self.t("pas 37 × 0,1.", 40, ROUGE_ERREUR)
        self.col(l4, -1.85, xl=0.8)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        rangs = ("Unités", "Dixièmes", "Centièmes", "Millièmes")
        kw = dict(larg=1.6, h=0.95, fs_ent=32)
        t1 = Tableau(rangs, 0, **kw).move_to(P(-3.4, 2.0))
        t2 = Tableau(rangs, 0, **kw)
        t2.shift(t1.cases.get_center() + DOWN * 1.8 - t2.cases.get_center())
        t2.remove(t2.entetes)
        h1 = [t1.chiffre(0, 5, BLEU_D), t1.chiffre(1, 2, AMBRE_D)]

        def avant(sc):
            sc.play(FadeIn(t1), *[FadeIn(c) for c in h1], run_time=0.35)

        def apres(sc):
            sc.au_mot("Chaque chiffre")
            sc.rep_gauche(0, -1.05, avec=[FadeIn(t2.cases), FadeIn(t2.virgule)])
            sc.au_mot("5 unités")
            sc.rep_gauche(1, -1.7, avec=[GrowArrow(fleches_descente(t1, t2, 0, 2)), GrowArrow(fleches_descente(t1, t2, 1, 3))])
            sc.au_mot("0,052")
            sc.rep_gauche(2, -2.35, avec=[FadeIn(t2.chiffre(0, 0, BLEU_D), scale=1.5), FadeIn(t2.chiffre(1, 0, AMBRE_D), scale=1.5),
                            FadeIn(t2.chiffre(2, 5, ROSE_D), scale=1.5), FadeIn(t2.chiffre(3, 2, VIOLET_D), scale=1.5)])
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Combien font", "5,2 × 0,01 ?"],
                            [self.t("0,52", 36), self.t("0,052", 36), self.t("520", 36)], 1,
                            ["Chaque chiffre descend de deux rangs :", "5 unités deviennent 5 centièmes.", "0,052."],
                            mot_q="Combien", avant_q=avant, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ca = camion(1.05).move_to(P(-3.9, 0.6))
        self.au_mot("Un vrai camion")
        l1 = self.ligne([("Un vrai camion :", WHITE), ("12,5 m", VERT_D)], 38)
        self.col(l1, 2.0, xl=0.6)
        self.play(FadeIn(ca, shift=LEFT * 0.4), FadeIn(l1[0]), run_time=0.35)
        self.au_mot("12,5")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.3)
        self.au_mot("Kenzo multiplie")
        l2 = self.ligne([("Kenzo multiplie par", WHITE), ("0,01.", ROSE_D)], 38)
        self.col(l2, 1.05, xl=0.6)
        ke = kenzo(0.75).move_to(P(-4.6, -1.7))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(ke, shift=UP * 0.2), run_time=0.35)
        self.au_mot("Combien mesure")
        l3 = self.t("Combien mesure sa maquette ?", 38, ORANGE_RETENUE)
        hors_audit(l3)
        self.col(l3, 0.05, xl=0.6)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-1.2)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        rangs = ("Dizaines", "Unités", "Dixièmes", "Centièmes", "Millièmes")
        kw = dict(larg=1.38, h=0.85, fs_ent=32)
        t1 = Tableau(rangs, 1, **kw).move_to(P(-3.1, 1.55))
        t2 = Tableau(rangs, 1, **kw)
        t2.shift(t1.cases.get_center() + DOWN * 2.3 - t2.cases.get_center())
        t2.remove(t2.entetes)
        self.play(FadeIn(t1), FadeIn(t1.chiffre(0, 1, VERT_D)), FadeIn(t1.chiffre(1, 2, BLEU_D)),
                  FadeIn(t1.chiffre(2, 5, AMBRE_D)), run_time=0.35)
        self.au_mot("Chaque chiffre")
        l1 = self.bloc(["Chaque chiffre descend", "de deux rangs."], 34, VERT_OK)
        self.col(l1, 2.2)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(t2.cases), FadeIn(t2.virgule), run_time=0.35)
        ligs = []
        donnees = (("1 dizaine", "1 dixième", 1, 0, 2, AMBRE_D), ("2 unités", "2 centièmes", 2, 1, 3, ROSE_D),
                   ("5 dixièmes", "5 millièmes", 5, 2, 4, VIOLET_D))
        lgs = [self.ligne([(de, WHITE), ("devient" if k == 0 else "deviennent", WHITE), (vers, coul)], 32)
               for k, (de, vers, v, ci, cf, coul) in enumerate(donnees)]
        kmin = min(1.0, (self.BORD_X - 0.1 - self.XL) / max(x.width for x in lgs))
        for k, lg in enumerate(lgs):  # la même taille pour les trois lignes
            lg.scale(kmin)
            self.col(lg, 1.15 - 0.7 * k)
        for k, (de, vers, v, ci, cf, coul) in enumerate(donnees):
            lg = lgs[k]
            self.au_mot(de)
            self.play(FadeIn(lg[0], shift=UP * 0.1), GrowArrow(fleches_descente(t1, t2, ci, cf, coul)), run_time=0.35)
            self.play(FadeIn(lg[1]), run_time=0.25)
            self.au_mot(vers)
            self.play(FadeIn(lg[2], shift=UP * 0.1), FadeIn(t2.chiffre(cf, v, coul), scale=1.5), run_time=0.35)
            ligs.append(lg)
        self.au_mot("La maquette")
        self.play(FadeIn(t2.chiffre(1, 0, BLEU_D), scale=1.5), run_time=0.25)
        self.au_mot("0,125")
        g = self.gros("0,125 m", fs=54)
        self.col(g, -1.25, xl=1.4)
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        t1, t2 = self.deux_tableaux(larg=1.45, h=0.85, fs_ent=28, ecart=1.6)
        t2.remove(t2.entetes)
        fig = VGroup(t1, t2, t1.chiffre(0, 3, VERT_D), t1.chiffre(1, 7, BLEU_D), t2.chiffre(1, 3, BLEU_D),
                     t2.chiffre(2, 7, AMBRE_D), fleches_descente(t1, t2, 0, 1), fleches_descente(t1, t2, 1, 2))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("× 0,1, c'est ÷ 10 :", "chaque chiffre descend d'un rang."),
            ("× 0,01 :", "deux rangs."),
            ("× 0,001 :", "trois rangs."),
            ("Le nombre devient plus petit.",)], fs=36)
        self.au_mot("Fois 0,1")
        self.montrer_ligne(lignes[0], Indicate(fig[6], color=VERT_OK), Indicate(fig[7], color=VERT_OK))
        self.au_mot("Fois 0,01")
        self.montrer_ligne(lignes[1])
        self.au_mot("Fois 0,001")
        self.montrer_ligne(lignes[2])
        self.au_mot("Le nombre")
        self.montrer_ligne(lignes[3], Indicate(VGroup(fig[4], fig[5]), color=VERT_OK, scale_factor=1.3))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_sens()
        self.ecran_valeur()
        self.ecran_raccourci()
        self.ecran_question1()
        self.ecran_001()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class DecimalMultiplierPar016e(DecimalMultiplierPar01Base):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
