# decimal_rang.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 02 : LE RANG D'UN CHIFFRE
# (micro decimal_rang, notion decimal_nombre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux-rang.js, le coffre-fort).
# Décor et métier : Malik, CHRONOMÉTREUR d'athlétisme (centres : sport, jeux-defis).
# Écrans : garde (00), situation (01), tableau (02), valeur (03), QUESTION 1 (04),
# millièmes (05), piège dizaines / dixièmes (06), QUESTION 2 (07), défi (08) et
# correction (08b), appris (09), fin (10).
# Voix : manim/voix/6e-decimal-rang.json (Julie, débit −6) ; marques : decimal_rang_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_rang.py DecimalRang6e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_rang.py DecimalRang6e -o eleveai-maths-6e-decimal-rang --media_dir manim/scripts/6e/media-dec-02
# Sortie : manim/sorties/6e/maths/decimaux/02-rang/eleveai-maths-6e-decimal-rang.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403

VERT_D = "#34d399"
TURQ_D = "#2dd4bf"
COUL_RANGS = {"Centaines": TURQ_D, "Dizaines": VERT_D, "Unités": BLEU_D, "Dixièmes": AMBRE_D,
              "Centièmes": ROSE_D, "Millièmes": VIOLET_D}
R4 = ("Dizaines", "Unités", "Dixièmes", "Centièmes")
R5 = ("Dizaines", "Unités", "Dixièmes", "Centièmes", "Millièmes")
R6 = ("Centaines", "Dizaines", "Unités", "Dixièmes", "Centièmes", "Millièmes")


def tableau(rangs, virgule_apres, **kw):
    return TableauNum(rangs, virgule_apres=virgule_apres, couleurs=COUL_RANGS, **kw)


def chrono(s=1.0):
    """Le chronomètre de Malik : boîtier rond, bouton, écran (.aff) ; le temps s'écrit dessus à son mot."""
    boitier = Circle(radius=0.95 * s, fill_color="#e5e7eb", fill_opacity=1, stroke_color="#94a3b8", stroke_width=6)
    cadran = Circle(radius=0.78 * s, fill_color="#1e293b", fill_opacity=1, stroke_width=0)
    tige = Rectangle(width=0.22 * s, height=0.26 * s, fill_color="#94a3b8", fill_opacity=1, stroke_width=0) \
        .next_to(boitier, UP, buff=-0.02)
    bouton = RoundedRectangle(width=0.5 * s, height=0.18 * s, corner_radius=0.06 * s, fill_color=ROUGE_ERREUR,
                              fill_opacity=1, stroke_width=0).next_to(tige, UP, buff=0)
    aff = RoundedRectangle(width=1.3 * s, height=0.5 * s, corner_radius=0.08 * s, fill_color="#052e16", fill_opacity=1,
                           stroke_color=VERT_OK, stroke_width=2).move_to(cadran.get_center() + DOWN * 0.08 * s)
    traits = VGroup(*[Line(cadran.get_center() + 0.66 * s * np.array([np.cos(a), np.sin(a), 0]),
                           cadran.get_center() + 0.76 * s * np.array([np.cos(a), np.sin(a), 0]), color=WHITE,
                           stroke_width=3) for a in np.linspace(0, TAU, 12, endpoint=False)])
    g = VGroup(tige, bouton, boitier, cadran, traits, aff)
    g.aff = aff
    return g


def malik(s=1.0):
    """Malik, chronométreur : survêtement, casquette, sifflet."""
    p = visage(personne(peau="#8d5524", tenue="#dc2626", cheveux="#111827", s=s))
    t = p.tete.get_center()
    visiere = RoundedRectangle(width=0.62 * s, height=0.12 * s, corner_radius=0.05 * s, fill_color="#1d4ed8",
                               fill_opacity=1, stroke_width=0).move_to(t + P(0.3 * s, 0.3 * s))
    calotte = AnnularSector(inner_radius=0, outer_radius=0.46 * s, angle=PI, start_angle=0, fill_color="#1d4ed8",
                            fill_opacity=1, stroke_width=0).move_to(t + P(0, 0.42 * s))
    c = p.corps.get_center()
    cordon = Line(t + P(-0.25 * s, -0.4 * s), c + P(0.05 * s, 0.1 * s), color=WHITE, stroke_width=3)
    sifflet = RoundedRectangle(width=0.22 * s, height=0.12 * s, corner_radius=0.04 * s, fill_color="#fbbf24",
                               fill_opacity=1, stroke_width=0).move_to(c + P(0.08 * s, 0.05 * s))
    p.add(calotte, visiere, cordon, sifflet)
    return p


class DecimalRangBase(PaysageDecimal):
    nom_voix = "6e-decimal-rang"
    fichier_marques = "decimal_rang_marques.json"

    def temps(self, ch, s, fs=34):
        """Le temps écrit sur l'écran du chronomètre (renvoyé, non ajouté)."""
        t = Text(s, font_size=fs, color=VERT_OK, weight=BOLD).move_to(ch.aff)
        if t.width > ch.aff.width * 0.9:
            t.scale_to_fit_width(ch.aff.width * 0.9)
        return t

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le rang d'un chiffre", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le rang")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        tb = tableau(R5, 1, larg=1.3, h=0.85, fs_ent=22).move_to(P(2.9, 0.35))
        q = self.bloc(["Que vaut", "chaque chiffre ?"], 44).move_to(P(-3.9, 0.35))
        self.au_mot("Que vaut")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(tb), run_time=0.3)
        self.play(LaggedStart(*[Indicate(e, scale_factor=1.25) for e in tb.entetes], lag_ratio=0.25), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Malik, chronométreur ───────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ma = malik(1.05).move_to(P(-4.9, 0.0))
        self.au_mot("Voici Malik")
        nom = self.t("Malik", 44, BLEU_CALCUL).next_to(ma, UP, buff=0.2)
        self.play(FadeIn(ma, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("chronométreur")
        met = self.t("chronométreur", 28, BLEU_CALCUL).next_to(ma, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        ch = chrono(1.25).move_to(P(-1.9, 0.2))
        self.play(FadeIn(ch, scale=0.8), run_time=0.35)
        self.au_mot("Une coureuse")
        l1 = self.bloc(["Une coureuse franchit", "la ligne en :"], 36)
        self.col(l1, 2.1, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("12,47 secondes")
        tm = self.temps(ch, "12,47 s")
        g = self.gros("12,47 s", fs=64)
        self.col(g, 0.55, xl=1.2)
        self.play(FadeIn(tm, scale=1.3), FadeIn(g, scale=1.3), Wiggle(ch[1]), run_time=0.45)
        self.au_mot("Que veut dire")
        q = self.bloc(["Que veut dire", "chaque chiffre ?"], 42, JAUNE_TITRE)
        self.col(q, -1.0, xl=0.6)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        ch = chrono(0.8).move_to(P(-3.5, 2.35))
        tm = hors_audit(self.temps(ch, "12,47 s", 26))  # le rappel de l'écran 01
        self.add(ch, tm)
        tb = tableau(R4, 1, larg=1.55, h=1.05, fs_ent=24).move_to(P(-3.5, -0.4))
        self.au_mot("On range")
        l0 = self.t("On range dans un tableau.", 34)
        self.col(l0, 2.6, xl=0.8)
        self.play(FadeIn(tb), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Avant la virgule")
        l1 = self.t("Avant la virgule :", 36, VERT_D)
        self.col(l1, 1.5, xl=0.8)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(VGroup(tb.colonne(0), tb.colonne(1)), scale_factor=1.06),
                  run_time=0.4)
        lg1 = self.ligne([("1 dizaine", VERT_D), ("et", WHITE), ("2 unités.", BLEU_D)], 36, buff=0.18)
        self.col(lg1, 0.85, xl=0.8)
        self.au_mot("1 dizaine")
        self.play(FadeIn(lg1[0], shift=RIGHT * 0.1), FadeIn(tb.chiffre(0, 1, VERT_D), scale=1.6), run_time=0.3)
        self.au_mot("2 unités")
        self.play(FadeIn(lg1[1]), FadeIn(lg1[2], shift=RIGHT * 0.1), FadeIn(tb.chiffre(1, 2, BLEU_D), scale=1.6),
                  run_time=0.3)
        self.au_mot("Après la virgule")
        l2 = self.t("Après la virgule :", 36, AMBRE_D)
        self.col(l2, -0.25, xl=0.8)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(tb.virgule, color=ROUGE_ERREUR, scale_factor=1.8), run_time=0.4)
        lg2 = self.ligne([("4 dixièmes", AMBRE_D), ("et", WHITE), ("7 centièmes.", ROSE_D)], 36, buff=0.18)
        self.col(lg2, -0.9, xl=0.8)
        self.au_mot("4 dixièmes")
        self.play(FadeIn(lg2[0], shift=RIGHT * 0.1), FadeIn(tb.chiffre(2, 4, AMBRE_D), scale=1.6), run_time=0.3)
        self.au_mot("7 centièmes")
        self.play(FadeIn(lg2[1]), FadeIn(lg2[2], shift=RIGHT * 0.1), FadeIn(tb.chiffre(3, 7, ROSE_D), scale=1.6),
                  run_time=0.3)
        self.attendre_voix()

    # ── 03 : la valeur de chaque rang ───────────────────────────────────────
    def ecran_valeur(self):
        self.ecran("03-valeur")
        tb = tableau(R4, 1, larg=1.42, h=0.8, fs_ent=26).move_to(P(-3.65, 2.25))
        self.add(tb)
        for i, v in enumerate((1, 2, 4, 7)):
            self.add(tb.chiffre(i, v, (VERT_D, BLEU_D, AMBRE_D, ROSE_D)[i]))
        self.au_mot("Chaque rang")
        l1 = self.bloc(["Chaque rang vaut", "10 fois moins", "que celui de gauche."], 36)
        l1[1].set_color(JAUNE_TITRE)
        self.col(l1, 2.2, xl=0.8)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 fois moins")
        fl = VGroup()
        for i in range(3):
            a, b = tb.cases[i].get_bottom(), tb.cases[i + 1].get_bottom()
            arc = CurvedArrow(a + DOWN * 0.05 + RIGHT * 0.15, b + DOWN * 0.05 + LEFT * 0.15, angle=PI / 2.4,
                              color=JAUNE_TITRE, stroke_width=4, tip_length=0.18)
            lab = hors_audit(self.t("÷ 10", 24, JAUNE_TITRE).next_to(arc, DOWN, buff=0.04))
            fl.add(VGroup(arc, lab))
        self.play(FadeIn(l1[1], scale=1.2), LaggedStart(*[Create(f[0]) for f in fl], lag_ratio=0.25),
                  LaggedStart(*[FadeIn(f[1]) for f in fl], lag_ratio=0.25), run_time=0.7)
        self.au_mot("que celui de gauche")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        # une unité coupée en 10, puis un dixième coupé en 10
        b = barre_unite(10, larg=5.4, h=0.6, colories=0, couleur=AMBRE_D, traits=False).move_to(P(-3.65, 0.05))
        b.cadre.set_stroke(BLEU_D, 6)
        self.au_mot("Un dixième")
        l2 = self.bloc(["Un dixième : une unité", "coupée en 10."], 32, AMBRE_D)
        self.col(l2, 0.25, xl=0.8)
        self.play(FadeIn(b.cadre), FadeIn(b.parts), FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("coupée en 10")
        self.play(FadeIn(l2[1], shift=UP * 0.1), b.traits.animate.set_opacity(1), b.parts[0].animate.set_fill(AMBRE_D, 0.95),
                  run_time=0.45)
        zoom = barre_unite(10, larg=5.4, h=0.6, couleur=ROSE_D, traits=False).move_to(P(-3.65, -1.35))
        zoom.parts.set_fill(AMBRE_D, 0.95)
        lz = VGroup(DashedLine(b.parts[0].get_corner(DL), zoom.get_corner(UL), color=AMBRE_D),
                    DashedLine(b.parts[0].get_corner(DR), zoom.get_corner(UR), color=AMBRE_D))
        self.au_mot("Un centième")
        l3 = self.bloc(["Un centième : un dixième", "coupé en 10."], 32, ROSE_D)
        self.col(l3, -0.95, xl=0.8)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(lz), FadeIn(zoom.cadre), FadeIn(zoom.parts), run_time=0.45)
        self.au_mot("coupé en 10")
        self.play(FadeIn(l3[1], shift=UP * 0.1), zoom.traits.animate.set_opacity(1),
                  zoom.parts[0].animate.set_fill(ROSE_D, 1), run_time=0.45)
        self.au_mot("Le 7 vaut")
        l4 = self.ligne([("Le 7 vaut", WHITE), ("7 centièmes de seconde :", ROSE_D)], 32, buff=0.16)
        l4.move_to(P(0, -2.25)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(tb.cases[3], color=ROSE_D, scale_factor=1.15), run_time=0.35)
        self.au_mot("7 centièmes")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est tout petit")
        l5 = self.t("c'est tout petit !", 36, JAUNE_TITRE)
        l5.move_to(P(0, -2.95)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(l5, scale=1.2), Indicate(zoom.parts[0], color=ROSE_D, scale_factor=1.6), run_time=0.45)
        self.attendre_voix()

    # ── 04 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tb = tableau(R4, 1, larg=1.45, h=1.0, fs_ent=24).move_to(P(-3.6, 0.6))
        ch = [tb.chiffre(i, v, (VERT_D, BLEU_D, AMBRE_D, ROSE_D)[i]) for i, v in enumerate((1, 2, 4, 7))]

        def avant(sc):
            sc.play(FadeIn(tb), run_time=0.3)

        def apres(sc):
            # l'explication sous le tableau, à gauche : sous les cartes, elle était trop petite
            l0 = sc.t("Le premier chiffre après la virgule", 32, VERT_OK)
            l1 = sc.ligne([("est celui des dixièmes :", VERT_OK), ("4.", AMBRE_D)], 32, buff=0.16)
            for k, m in enumerate((l0, l1)):
                m.move_to(P(0, -0.75 - 0.65 * k)).align_to(P(-6.3, 0), LEFT)
                if m.get_right()[0] > 0.6:
                    m.scale_to_fit_width(6.9).align_to(P(-6.3, 0), LEFT)
            sc.au_mot("Le premier chiffre")
            sc.play(FadeIn(l0, shift=UP * 0.1), *[FadeIn(c, scale=1.5) for c in ch], run_time=0.35)
            sc.au_mot("est celui")
            sc.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(tb.entetes[2], color=AMBRE_D), run_time=0.3)
            sc.au_mot("4.")
            sc.play(FadeIn(l1[1], scale=1.3), Indicate(ch[2], color=AMBRE_D, scale_factor=1.8), run_time=0.35)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Dans 12,47, quel chiffre", "est au rang des dixièmes ?"],
                            [self.t("2", 36), self.t("4", 36), self.t("7", 36)], 1,
                            ["Le premier chiffre après la virgule", "est celui des dixièmes : 4."], mot_q="Dans",
                            avant_q=avant, autres_r=apres)

    # ── 05 : les millièmes ──────────────────────────────────────────────────
    def ecran_milliemes(self):
        self.ecran("05-milliemes")
        ch = chrono(1.0).move_to(P(-3.6, 2.0))
        self.au_mot("Le chronomètre")
        l1 = self.bloc(["Le chronomètre de Malik", "est très précis :"], 34)
        self.col(l1, 2.5, xl=0.8)
        self.play(FadeIn(ch, scale=0.8), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("12,476")
        tm = self.temps(ch, "12,476 s", 30)
        g = self.gros("12,476 s", fs=52)
        self.col(g, 1.2, xl=1.1)
        self.play(FadeIn(tm, scale=1.3), FadeIn(g, scale=1.3), run_time=0.4)
        tb = tableau(R5, 1, larg=1.3, h=0.95, fs_ent=24).move_to(P(-3.35, -0.7))
        ch5 = [tb.chiffre(i, v, (VERT_D, BLEU_D, AMBRE_D, ROSE_D, VIOLET_D)[i]) for i, v in enumerate((1, 2, 4, 7, 6))]
        self.play(FadeIn(tb), *[FadeIn(c) for c in ch5[:4]], run_time=0.35)
        self.au_mot("Le troisième chiffre")
        l2 = self.bloc(["Le troisième chiffre", "après la virgule, 6,"], 34)
        self.col(l2, -0.1, xl=0.8)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("après la virgule")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(ch5[4], scale=1.8), run_time=0.35)
        self.au_mot("est au rang")
        l3 = self.t("est au rang des millièmes.", 34, VIOLET_D)
        self.col(l3, -1.3, xl=0.8)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(tb.colonne(4), color=VIOLET_D, scale_factor=1.12), run_time=0.45)
        self.attendre_voix()

    # ── 06 : le piège des noms ──────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention aux noms !", 46, ROUGE_ERREUR).move_to(P(-0.3, 3.0))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Dizaines et dixièmes")
        n1 = self.ligne([("DIZ", VERT_D), ("aines", WHITE)], 52, buff=0.02)
        n2 = self.ligne([("DIX", AMBRE_D), ("ièmes", WHITE)], 52, buff=0.02)
        noms = VGroup(n1, n2).arrange(RIGHT, buff=1.2).move_to(P(-0.3, 2.1))
        self.play(FadeIn(n1, shift=UP * 0.1), FadeIn(n2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("se ressemblent")
        self.play(Indicate(n1[0], color=VERT_D, scale_factor=1.3), Indicate(n2[0], color=AMBRE_D, scale_factor=1.3),
                  run_time=0.6)
        tb = tableau(R4, 1, larg=1.55, h=1.0, fs_ent=24).move_to(P(-3.4, 0.25))
        self.play(FadeIn(tb), run_time=0.3)
        self.au_mot("Les dizaines sont")
        fg = Arrow(tb.virgule.get_center() + DOWN * 0.75, tb.cases[0].get_bottom() + DOWN * 0.3, color=VERT_D,
                   buff=0.0, stroke_width=6)
        lg = self.t("Dizaines : à gauche", 30, VERT_D).next_to(fg, DOWN, buff=0.1).align_to(tb, LEFT)
        self.play(GrowArrow(fg), FadeIn(lg), Indicate(tb.colonne(0), color=VERT_D, scale_factor=1.1), run_time=0.45)
        self.au_mot("Les dixièmes sont")
        fd = Arrow(tb.virgule.get_center() + DOWN * 0.75, tb.cases[2].get_bottom() + DOWN * 0.3 + RIGHT * 0.6,
                   color=AMBRE_D, buff=0.0, stroke_width=6)
        ld = self.t("Dixièmes : à droite", 30, AMBRE_D).next_to(lg, DOWN, buff=0.15).align_to(tb, RIGHT)
        self.play(GrowArrow(fd), FadeIn(ld), Indicate(tb.colonne(2), color=AMBRE_D, scale_factor=1.1), run_time=0.45)
        self.au_mot("Dans 35,81")
        l1 = self.t("Dans", 36)
        g = self.gros("35,81", fs=60)
        ligne = VGroup(l1, g).arrange(RIGHT, buff=0.3)
        self.col(ligne, 0.7, xl=1.2)
        chs = [tb.chiffre(i, v, (VERT_D, BLEU_D, AMBRE_D, ROSE_D)[i]) for i, v in enumerate((3, 5, 8, 1))]
        self.play(FadeIn(l1), FadeIn(g, scale=1.3), *[FadeIn(c, scale=1.4) for c in chs], run_time=0.4)
        self.au_mot("le chiffre des dizaines")
        l2 = self.ligne([("dizaines :", VERT_D), ("3", VERT_D)], 40, buff=0.2)
        self.col(l2, -0.45, xl=1.2)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3. Le")
        self.play(FadeIn(l2[1], scale=1.5), Indicate(chs[0], color=VERT_D, scale_factor=1.8), run_time=0.35)
        self.au_mot("Le chiffre des dixièmes")
        l3 = self.ligne([("dixièmes :", AMBRE_D), ("8", AMBRE_D)], 40, buff=0.2)
        self.col(l3, -1.3, xl=1.2)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("8.")
        self.play(FadeIn(l3[1], scale=1.5), Indicate(chs[2], color=AMBRE_D, scale_factor=1.8), run_time=0.35)
        self.attendre_voix()

    # ── 07 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tb = tableau(R5, 1, larg=1.3, h=0.95, fs_ent=24).move_to(P(-3.35, 0.75))
        ch = [tb.chiffre(i, v, (VERT_D, BLEU_D, AMBRE_D, ROSE_D, VIOLET_D)[i]) for i, v in enumerate((6, 9, 0, 7, 3))]

        def avant(sc):
            sc.play(FadeIn(tb), run_time=0.3)

        def apres(sc):
            sc.play(FadeIn(ch[0]), FadeIn(ch[1]), run_time=0.25)
            # l'explication sous le tableau, à gauche, en grand
            for i, (mot, k, v, mot_v) in enumerate((("Dixièmes", 2, 0, "0. Centièmes"), ("Centièmes", 3, 7, "7. Millièmes"),
                                                    ("Millièmes", 4, 3, "3."))):
                c = COUL_RANGS[R5[k]]
                lg = sc.ligne([(f"{mot} :", c), (f"{v}.", c)], 38, buff=0.2)
                lg.move_to(P(0, -0.7 - 0.72 * i)).align_to(P(-6.0, 0), LEFT)
                sc.au_mot(mot)
                sc.play(FadeIn(lg[0], shift=UP * 0.1), Indicate(tb.entetes[k], color=c), run_time=0.3)
                sc.au_mot(mot_v)
                sc.play(FadeIn(lg[1], scale=1.4), FadeIn(ch[k], scale=1.6), run_time=0.3)
            sc.play(Indicate(ch[3], color=ROSE_D, scale_factor=1.8), run_time=0.4)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Dans 69,073, quel chiffre", "est au rang des centièmes ?"],
                            [self.t("0", 36), self.t("7", 36), self.t("3", 36)], 1,
                            ["Dixièmes : 0.", "Centièmes : 7.", "Millièmes : 3."], mot_q="Dans",
                            avant_q=avant, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ma = malik(1.0).move_to(P(-5.0, -0.2))
        ch = chrono(0.85).move_to(P(-2.6, 0.9))
        self.play(FadeIn(ma, shift=UP * 0.2), FadeIn(ch, scale=0.8), run_time=0.35)
        self.au_mot("Dans 805,316")
        l0 = self.t("Dans", 36)
        g = self.gros("805,316", fs=62)
        ligne = VGroup(l0, g).arrange(RIGHT, buff=0.3)
        self.col(ligne, 1.9, xl=0.2)
        tm = self.temps(ch, "805,316", 26)
        self.play(FadeIn(l0), FadeIn(g, scale=1.3), FadeIn(tm, scale=1.3), run_time=0.4)
        self.au_mot("quel chiffre est au rang des dizaines")
        l1 = hors_audit(self.ligne([("1.", ORANGE_RETENUE), ("le chiffre des", WHITE), ("dizaines ?", VERT_D)], 36,
                                   buff=0.18))
        self.col(l1, 0.6, xl=0.2)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Et quel chiffre")
        l2 = hors_audit(self.ligne([("2.", ORANGE_RETENUE), ("le chiffre des", WHITE), ("millièmes ?", VIOLET_D)], 36,
                                   buff=0.18))
        self.col(l2, -0.35, xl=0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-1.5)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        tb = tableau(R6, 2, larg=1.42, h=0.92, fs_ent=26).move_to(P(-1.9, 1.75))
        chs = [tb.chiffre(i, v, COUL_RANGS[R6[i]]) for i, v in enumerate((8, 0, 5, 3, 1, 6))]
        self.play(FadeIn(tb), run_time=0.3)
        X0 = -6.3
        self.au_mot("À gauche de la virgule")
        lg = self.ligne([("À gauche :", WHITE), ("5 unités,", BLEU_D), ("0 dizaine,", VERT_D), ("8 centaines.", TURQ_D)],
                        32, buff=0.18)
        lg.move_to(P(0, 0.55)).align_to(P(X0, 0), LEFT)
        self.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
        for k, (mot, i) in enumerate((("5 unités", 2), ("0 dizaine", 1), ("8 centaines", 0))):
            self.au_mot(mot)
            self.play(FadeIn(lg[k + 1], shift=RIGHT * 0.1), FadeIn(chs[i], scale=1.6), run_time=0.3)
        self.au_mot("Le chiffre des dizaines")
        r1 = self.ligne([("Le chiffre des dizaines est", WHITE), ("0.", VERT_D)], 34, buff=0.18)
        r1.move_to(P(0, -0.15)).align_to(P(X0, 0), LEFT)
        self.play(FadeIn(r1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("0. À droite")
        self.play(FadeIn(r1[1], scale=1.5), Indicate(chs[1], color=VERT_D, scale_factor=1.8), run_time=0.35)
        self.au_mot("À droite")
        ld = self.ligne([("À droite :", WHITE), ("3 dixièmes,", AMBRE_D), ("1 centième,", ROSE_D),
                         ("6 millièmes.", VIOLET_D)], 32, buff=0.18)
        ld.move_to(P(0, -1.0)).align_to(P(X0, 0), LEFT)
        self.play(FadeIn(ld[0], shift=UP * 0.1), run_time=0.3)
        for k, (mot, i) in enumerate((("3 dixièmes", 3), ("1 centième", 4), ("6 millièmes", 5))):
            self.au_mot(mot)
            self.play(FadeIn(ld[k + 1], shift=RIGHT * 0.1), FadeIn(chs[i], scale=1.6), run_time=0.3)
        self.au_mot("Le chiffre des millièmes")
        r2 = self.ligne([("Le chiffre des millièmes est", WHITE), ("6.", VIOLET_D)], 34, buff=0.18)
        r2.move_to(P(0, -1.7)).align_to(P(X0, 0), LEFT)
        self.play(FadeIn(r2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6.")
        self.play(FadeIn(r2[1], scale=1.5), Indicate(chs[5], color=VIOLET_D, scale_factor=1.8), run_time=0.35)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        tb = tableau(R6, 2, larg=2.0, h=0.85, fs_ent=30)
        fl = VGroup(Arrow(tb.virgule.get_center() + DOWN * 0.55, tb.cases[0].get_bottom() + DOWN * 0.35, color=VERT_D,
                          buff=0, stroke_width=5),
                    Arrow(tb.virgule.get_center() + DOWN * 0.55, tb.cases[5].get_bottom() + DOWN * 0.35, color=AMBRE_D,
                          buff=0, stroke_width=5))
        fig = VGroup(tb, fl)
        self.add(fig)
        lignes = self.finale_haut(fig, [
            ("On part de la virgule.",),
            ("À gauche : unités, dizaines, centaines.",),
            ("À droite : dixièmes, centièmes, millièmes.",),
            ("Chaque rang vaut 10 fois moins que celui de gauche.",)], fs=34)
        self.au_mot("On part")
        self.montrer_ligne(lignes[0], Indicate(tb.virgule, color=ROUGE_ERREUR, scale_factor=1.8))
        self.au_mot("À gauche")
        self.montrer_ligne(lignes[1], Indicate(fl[0], color=VERT_D))
        self.au_mot("À droite")
        self.montrer_ligne(lignes[2], Indicate(fl[1], color=AMBRE_D))
        self.au_mot("Chaque rang")
        self.montrer_ligne(lignes[3], Indicate(tb.cases, scale_factor=1.05))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_valeur()
        self.ecran_question1()
        self.ecran_milliemes()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class DecimalRang6e(DecimalRangBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
