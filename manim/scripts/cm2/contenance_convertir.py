# contenance_convertir.py
# EleveAI — Maths CM2 — série « Contenance », épisode 02 : CONVERTIR DES CONTENANCES
# (micro contenance_convertir, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : cm2-contenance-convertir-short (limonade 1,5 L = 150 cL, réponse B).
# Décor et métier : Lucie, PHARMACIENNE (centres : santé, sciences).
# Le CM2, un cran au-dessus du CM1 : le tableau L | dL | cL | mL, les décimaux (0,2 L = 200 mL,
# 2,5 L = 250 cL), × 10 d'une colonne à la suivante, on divise pour revenir au litre.
# Mapping micro → écrans : 02 (le tableau, × 10 d'une colonne à l'autre, 1 L = 10 dL = 100 cL = 1000 mL),
# 03 (0,2 L dans le tableau → 200 mL), 04 (200 ÷ 5 = 40 cuillères), 04b (vers le litre : 750 mL = 0,75 L,
# 35 cL = 0,35 L), 06 (piège : 2,5 L ≠ 25 cL), questions 05 (1,5 L en cL : B, 150 cL)
# et 07 (450 cL en L : A, 4,5 L), défi 08 (3 doses de 25 cL dans un bocal de 1 L : 250 mL de place).
# Voix : manim/voix/cm2-contenance-convertir.json (validée le 15/11, Julie, débit −6) ;
# marques : contenance_convertir_marques.json (python manim/scripts/cm2/aire_marques_cm2.py contenance:convertir).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/contenance_convertir.py ContenanceConvertirCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/contenance_convertir.py ContenanceConvertirCM2 -o eleveai-maths-cm2-contenance-convertir --media_dir manim/scripts/cm2/media-contenance-02
# Sortie : manim/sorties/cm2/maths/contenance/02-convertir/eleveai-maths-cm2-contenance-convertir.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_cm2_commun import *  # noqa: E402,F403

MEDIC = "#d97706"   # le sirop du flacon (ambré)
DOSE = "#a7f3d0"    # la préparation versée dans le bocal (vert d'eau)


def flacon(h=1.6, larg=0.8, niveau=0.7):
    """Le flacon de sirop de la pharmacie : une petite bouteille ambrée, une étiquette blanche à croix verte."""
    r = recipient("bouteille", h, larg, niveau, MEDIC)
    c = r.corps
    eti = RoundedRectangle(width=larg * 0.7, height=h * 0.28, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                           stroke_width=0).move_to(c.get_center() + DOWN * h * 0.08)
    k = h * 0.05
    croix = VGroup(Rectangle(width=k * 3, height=k, fill_color="#16a34a", fill_opacity=1, stroke_width=0),
                   Rectangle(width=k, height=k * 3, fill_color="#16a34a", fill_opacity=1, stroke_width=0))
    croix.move_to(eti)
    r.add(eti, croix)
    return r


def cuillere(s=1.0, couleur=MEDIC, pleine=True):
    """Une cuillère doseuse vue de dessus : le cuilleron (ovale) et le manche."""
    cu = Ellipse(width=0.55 * s, height=0.36 * s, fill_color="#e2e8f0", fill_opacity=1, stroke_color=VERRE,
                 stroke_width=max(1.5, 3 * s))
    ma = RoundedRectangle(width=0.8 * s, height=0.1 * s, corner_radius=0.05 * s, fill_color="#e2e8f0",
                          fill_opacity=1, stroke_width=0).next_to(cu, RIGHT, buff=-0.04 * s)
    g = VGroup(ma, cu)
    if pleine:
        g.add(Ellipse(width=0.38 * s, height=0.24 * s, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(cu))
    return g


def virgule(t, i=0, couleur=ORANGE_RETENUE, fs=40):
    """La virgule posée en bas, sur le trait à droite de la case i du tableau (après les litres)."""
    c = t.cases[i]
    return hors_audit(Text(",", font_size=fs, color=couleur, weight=BOLD)).move_to(
        P(c.get_right()[0] - 0.1, c.get_bottom()[1] + 0.2))


def fleches_x10(t, s="× 10", couleur=ORANGE_RETENUE, fs=24, vers_gauche=False):
    """Des arcs au-dessus des en-têtes, d'une colonne à la suivante, avec « × 10 » (ou « ÷ 10 »)."""
    g = VGroup()
    for i in range(len(t.tetes) - 1):
        a, b = t.tetes[i].get_top() + UP * 0.08, t.tetes[i + 1].get_top() + UP * 0.08
        if vers_gauche:
            a, b = b, a
        arc = CurvedArrow(a, b, angle=-PI / 2.4 if not vers_gauche else PI / 2.4, color=couleur, stroke_width=4,
                          tip_length=0.16)
        lab = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(arc, UP, buff=0.06)
        g.add(VGroup(arc, lab))
    return g


def resultat(morceaux, fs=50, couleur=VERT_OK):
    """Le résultat encadré (« 0,2 L = 200 mL »), en morceaux hors audit (ses nombres viennent d'être dits)."""
    t = VGroup(*[hors_audit(Text(m, font_size=fs, color=couleur, weight=BOLD)) for m in morceaux])
    t.arrange(RIGHT, buff=0.3)
    aligner_base(t)
    return VGroup(SurroundingRectangle(t, color=couleur, buff=0.2, corner_radius=0.12, stroke_width=5), t)


class ContenanceConvertirCM2(PaysageContenanceCM2):
    nom_voix = "cm2-contenance-convertir"
    fichier_marques = "contenance_convertir_marques.json"
    ceinture = "verte"

    def pause_defi(self, y=-1.4, marge=2.0, xl=0.4):
        """« Mets pause, et cherche ! » en 34, entier, dans la colonne du défi, au-dessus de Ti-Margo
        (celui de la base était réduit par la règle Ti-Margo)."""
        self.au_mot("Mets pause")
        p = self.col(self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE), y, xl)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Convertir des contenances", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Convertir des contenances")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Litres, décilitres,", "centilitres, millilitres :", "le tableau des unités."], 36)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        tab = tableau_unites(larg=0.95, fs=28).move_to(P(3.6, 0.35))
        self.au_mot("Litres")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(tab, shift=UP * 0.2), run_time=0.4)
        self.play(Indicate(tab.tetes[0], color=JAUNE_TITRE), run_time=0.3)
        self.au_mot("décilitres")
        self.play(Indicate(tab.tetes[1], color=JAUNE_TITRE), run_time=0.3)
        self.au_mot("centilitres")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(tab.tetes[2], color=JAUNE_TITRE), run_time=0.3)
        self.au_mot("millilitres")
        self.play(Indicate(tab.tetes[3], color=JAUNE_TITRE), run_time=0.3)
        self.au_mot("le tableau des unités")
        self.play(FadeIn(q[2], shift=UP * 0.2), Indicate(tab, color=VERT_OK, scale_factor=1.05), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lucie, pharmacienne ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        XL = 0.9
        pe = lucie(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Lucie")
        nom = self.t("Lucie", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("est pharmacienne")
        met = self.t("pharmacienne", 26, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        fl = flacon(1.7, 0.85).move_to(P(-2.6, 0.3)).align_to(P(0, -0.9), DOWN)
        cu = cuillere(1.0).move_to(P(-1.2, -0.65))
        l1 = self.ligne([("Un flacon de sirop :", WHITE), ("0,2 L", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l1, 2.2, XL)
        self.au_mot("Un flacon de sirop")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(fl, shift=UP * 0.2), run_time=0.35)
        self.au_mot("contient 0,2")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(contenance(fl, "0,2 L", 28)), run_time=0.3)
        l2 = self.ligne([("Des cuillères de", WHITE), ("5 mL", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l2, 1.4, XL)
        self.au_mot("des cuillères")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(cu, shift=UP * 0.2), run_time=0.2)
        self.au_mot("cuillères de 5")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(contenance(cu, "5 mL", 26)), run_time=0.3)
        self.au_mot("Combien de cuillères")
        q = self.bloc(["Combien de cuillères", "dans le flacon ?"], 38, JAUNE_TITRE)
        self.col(q, 0.1, XL)
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(VGroup(fl, cu)), run_time=0.5)
        self.au_mot("Il faut d'abord convertir")
        l3 = self.t("Il faut d'abord convertir !", 34, ORANGE_RETENUE)
        self.col(l3, -1.2, XL)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 02 : le tableau des contenances (× 10 d'une colonne à la suivante) ──
    def ecran_tableau(self):
        self.ecran("02-tableau")
        XL = -0.5
        tab = tableau_unites(larg=1.35, fs=32).move_to(P(-3.75, 0.5))
        self.au_mot("Voici le tableau")
        l0 = self.t("Le tableau des contenances", 36, JAUNE_TITRE)
        self.col(l0, 2.6, XL)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(tab, shift=UP * 0.2), run_time=0.4)
        for k, mot in enumerate(("contenances : litre", "décilitre", "centilitre", "millilitre")):
            self.au_mot(mot)
            self.play(Indicate(tab.tetes[k], color=JAUNE_TITRE), run_time=0.25)
        l1 = self.t("D'une colonne à la suivante,", 34)
        self.col(l1, 1.75, XL)
        self.au_mot("D'une colonne")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l1b = self.ligne([("on multiplie", WHITE), ("par 10", ORANGE_RETENUE)], 38, buff=0.2)
        self.col(l1b, 1.0, XL)
        fl = fleches_x10(tab)
        self.au_mot("on multiplie")
        self.play(FadeIn(l1b[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("par 10")
        self.play(FadeIn(l1b[1], scale=1.2), LaggedStart(*[FadeIn(f, shift=RIGHT * 0.1) for f in fl], lag_ratio=0.3),
                  run_time=0.25)
        bt = recipient("bouteille", 1.2, 0.6, 0.85, EAU).move_to(P(-3.75, -1.75))
        l2 = self.ligne([("1 L", BLEU_D), ("= 10 dL", VERT_OK)], 42, buff=0.25)
        self.col(l2, 0.05, XL)
        self.au_mot("10. 1 litre")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(chiffre(tab, 0, "1")), FadeIn(bt, shift=UP * 0.2),
                  run_time=0.3)
        self.add(contenance(bt, "1 L", 26))
        self.au_mot("c'est 10")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(chiffre(tab, 1, "0", couleur=ORANGE_RETENUE)), run_time=0.3)
        l3 = self.t("= 100 cL", 42, VERT_OK)
        l3.next_to(l2, DOWN, buff=0.3).align_to(l2[1], LEFT)
        self.au_mot("décilitres, 100")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(chiffre(tab, 2, "0", couleur=ORANGE_RETENUE)), run_time=0.3)
        l4 = self.t("= 1000 mL", 42, VERT_OK)
        l4.next_to(l3, DOWN, buff=0.3).align_to(l2[1], LEFT)
        self.au_mot("centilitres, 1000")
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(chiffre(tab, 3, "0", couleur=ORANGE_RETENUE)), run_time=0.3)
        cadre = SurroundingRectangle(VGroup(l2, l3, l4), color=JAUNE_TITRE, buff=0.2, corner_radius=0.15)
        self.play(Create(cadre), Indicate(bt, color=VERT_OK, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 03 : 0,2 L dans le tableau → 200 mL ─────────────────────────────────
    def ecran_virgule(self):
        self.ecran("03-virgule")
        XL = 0.3
        tab = tableau_unites(larg=1.1, fs=32).move_to(P(-3.6, 1.2))
        fl = flacon(1.5, 0.75).move_to(P(-3.6, -1.3))
        self.add(tab, fl)
        self.au_mot("Pour 0,2")
        l0 = self.ligne([("Pour", WHITE), ("0,2 L :", JAUNE_TITRE)], 40, buff=0.2)
        self.col(l0, 2.55, XL)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(contenance(fl, "0,2 L", 28)), run_time=0.3)
        l1 = self.ligne([("0", BLEU_D), ("dans la colonne des L,", WHITE)], 34, buff=0.2)
        self.col(l1, 1.75, XL)
        c0, vg = chiffre(tab, 0, "0", fs=38, couleur=BLEU_D), virgule(tab, 0)
        self.au_mot("on écrit 0")
        self.play(FadeIn(l1[0], scale=1.2), FadeIn(c0, scale=1.3), FadeIn(vg), run_time=0.25)
        self.au_mot("colonne des litres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        l2 = self.ligne([("2", BLEU_D), ("dans celle des dL.", WHITE)], 34, buff=0.2)
        self.col(l2, 1.05, XL)
        c2 = chiffre(tab, 1, "2", fs=38, couleur=BLEU_D)
        self.au_mot("et 2")
        self.play(FadeIn(l2[0], scale=1.2), FadeIn(c2, scale=1.3), run_time=0.25)
        self.au_mot("celle des décilitres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        l3 = self.bloc(["On complète avec des zéros", "jusqu'aux mL :"], 34, ORANGE_RETENUE)
        self.col(l3, 0.0, XL)
        z = VGroup(chiffre(tab, 2, "0", fs=38, couleur=ORANGE_RETENUE), chiffre(tab, 3, "0", fs=38, couleur=ORANGE_RETENUE))
        self.au_mot("On complète avec des zéros")
        self.play(FadeIn(l3[0], shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.4) for x in z], lag_ratio=0.4),
                  run_time=0.5)
        self.au_mot("jusqu'aux millilitres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(tab.tetes[3], color=JAUNE_TITRE), run_time=0.35)
        res = resultat(["0,2 L", "=", "200 mL"], 48)
        self.col(res, -1.35, XL)
        self.au_mot("c'est 200")
        self.play(FadeIn(res, scale=1.15), *[c.animate.set_fill(VERT_OK, 0.3) for c in tab.cases[1:]], run_time=0.4)
        self.attendre_voix()

    # ── 04 : 200 ÷ 5 = 40 cuillères ─────────────────────────────────────────
    def ecran_calcul(self):
        self.ecran("04-calcul")
        XL = 0.6
        fl = flacon(1.5, 0.75).move_to(P(-4.0, 1.5))
        efl = contenance(fl, "200 mL", 28)
        self.add(fl, efl)
        self.au_mot("Une cuillère")
        cu = cuillere(1.0).move_to(P(-1.8, 1.4))
        l0 = self.ligne([("Une cuillère :", WHITE), ("5 mL", JAUNE_TITRE)], 38, buff=0.2)
        self.col(l0, 2.3, XL)
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(cu, shift=UP * 0.2), run_time=0.3)
        self.au_mot("cuillère, 5")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(contenance(cu, "5 mL", 26)), run_time=0.25)
        l1 = self.ligne([("200 ÷ 5", BLEU_D), ("= 40", VERT_OK)], 50, buff=0.3)
        self.col(l1, 1.1, XL)
        self.au_mot("millilitres. 200")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(efl, color=JAUNE_TITRE), run_time=0.3)
        cuis = VGroup(*[cuillere(0.42) for _ in range(40)]).arrange_in_grid(5, 8, buff=(0.12, 0.16))
        cuis.move_to(P(-3.3, -1.45))
        self.au_mot("par 5 : 40")
        self.play(FadeIn(l1[1], shift=UP * 0.1), LaggedStart(*[FadeIn(c, scale=1.5) for c in cuis], lag_ratio=0.04),
                  run_time=1.0)
        self.au_mot("Le flacon")
        l2 = self.t("Le flacon donne", 36)
        self.col(l2, -0.1, XL)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.2)
        res = self.gros("40 cuillères.", fs=50)
        hors_audit(res[1])  # posé au mot juste dessous
        self.col(res, -1.05, XL)
        self.au_mot("40 cuillères")
        self.play(FadeIn(res, scale=1.2), run_time=0.25)
        self.play(Indicate(cuis, color=VERT_OK, scale_factor=1.04), run_time=0.5)
        self.attendre_voix()

    # ── 04b : vers le litre, on divise ──────────────────────────────────────
    def ecran_vers_litres(self):
        self.ecran("04b-vers-litres")
        XL = 0.2
        t1 = tableau_unites(larg=1.0, fs=30).move_to(P(-3.7, 1.45))
        t2 = tableau_unites(larg=1.0, fs=30).move_to(P(-3.7, -1.55))
        self.au_mot("Dans l'autre sens")
        l0 = self.ligne([("Dans l'autre sens :", WHITE), ("on divise !", ORANGE_RETENUE)], 38, buff=0.25)
        self.col(l0, 2.6, XL)
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(t1), FadeIn(t2), run_time=0.3)
        self.au_mot("on divise")
        self.play(FadeIn(l0[1], scale=1.2), run_time=0.15)
        # 750 mL → 0,75 L
        l1 = self.ligne([("750 mL", BLEU_D), ("÷ 1000", ORANGE_RETENUE)], 42, buff=0.25)
        self.col(l1, 1.5, XL)
        d1 = VGroup(*[chiffre(t1, i, s, 36) for i, s in ((1, "7"), (2, "5"), (3, "0"))])
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(d1, lag_ratio=0.3), run_time=0.3)
        self.au_mot("divisé par 1000")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        r1 = resultat(["= 0,75 L"], 42)
        r1.next_to(l1, DOWN, buff=0.3).align_to(l1, LEFT)
        z1 = VGroup(chiffre(t1, 0, "0", 36, ORANGE_RETENUE), virgule(t1, 0))
        self.au_mot("1000, 0,75")
        self.play(FadeIn(r1, scale=1.15), FadeIn(z1, scale=1.3), run_time=0.35)
        # 35 cL → 0,35 L
        l2 = self.ligne([("35 cL", BLEU_D), ("÷ 100", ORANGE_RETENUE)], 42, buff=0.25)
        self.col(l2, -1.15, XL)
        d2 = VGroup(*[chiffre(t2, i, s, 36) for i, s in ((1, "3"), (2, "5"))])
        self.au_mot("litre. 35")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(d2, lag_ratio=0.3), run_time=0.3)
        self.au_mot("35 divisé par 100")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        r2 = resultat(["= 0,35 L"], 42)
        r2.next_to(l2, DOWN, buff=0.3).align_to(l2, LEFT)
        z2 = VGroup(chiffre(t2, 0, "0", 36, ORANGE_RETENUE), virgule(t2, 0))
        self.au_mot("100, 0,35")
        self.play(FadeIn(r2, scale=1.15), FadeIn(z2, scale=1.3), run_time=0.35)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b1 = recipient("bouteille", 1.5, 0.7, 0.85, ANANAS)
        b2 = recipient("bouteille", 1.5, 0.7, 0.425, ANANAS)
        g = rangee_recipients([b1, b2], 0.5).move_to(P(-3.8, 1.6))
        e1, e2 = contenance(b1, "1 L", 26), contenance(b2, "0,5 L", 26)

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(e1), FadeIn(e2), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["Combien de centilitres", "font 1,5 litre ?"],
                             [self.choix("15 cL"), self.choix("150 cL"), self.choix("1500 cL")], 1,
                             ["1 L = 100 cL.", "0,5 L = 50 cL.", "1,5 L = 150 cL."],
                             -0.75, couper={0: ("1 L", "= 100 cL."), 1: ("0,5 L", "= 50 cL."),
                                            2: ("1,5 L", "= 150 cL.")},
                             mot_q="Combien de centilitres", autres_q=autres_q)

    # ── 06 : le piège (2,5 L n'est pas 25 cL) ───────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        XL = 0.1
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        tab = tableau_unites(("L", "dL", "cL"), larg=1.25, fs=32).move_to(P(-4.0, 1.0))
        bs = rangee_recipients([recipient("bouteille", 1.2, 0.55, 0.85, EAU), recipient("bouteille", 1.2, 0.55, 0.85, EAU),
                                recipient("bouteille", 1.2, 0.55, 0.425, EAU)], 0.35).move_to(P(-4.0, -1.55))
        eb = contenance(bs, "2,5 L", 28)
        self.add(tab, bs, eb)
        l0 = self.ligne([("2,5 L", BLEU_D), ("≠ 25 cL", ROUGE_ERREUR)], 46, buff=0.3)
        self.col(l0, 2.15, XL)
        self.au_mot("piège ! 2,5")
        self.play(FadeIn(l0[0], shift=UP * 0.1), Indicate(bs, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.3)
        self.au_mot("pas 25")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l0[1], 1.2, 0.2)
        l1 = self.bloc(["On n'efface pas la virgule", "pour coller les chiffres !"], 32, ROUGE_ERREUR)
        self.col(l1, 1.2, XL)
        self.au_mot("On n'efface pas la virgule")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("coller les chiffres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("2,5 × 100", WHITE), ("= 250 cL", VERT_OK)], 42, buff=0.25)
        self.col(l2, 0.2, XL)
        self.au_mot("chiffres. 2,5")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("100 : 250")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.3)
        l3 = self.t("Dans le tableau :", 32, GRAY_B)
        self.col(l3, -0.6, XL)
        self.au_mot("Dans le tableau")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(tab, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.35)
        l4 = self.ligne([("le 2", BLEU_D), ("dans les L,", WHITE)], 32, buff=0.18)
        self.col(l4, -1.15, XL + 0.3)
        c2, vg = chiffre(tab, 0, "2", 38, BLEU_D), virgule(tab, 0)
        self.au_mot("le 2")
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(c2, scale=1.3), FadeIn(vg), run_time=0.25)
        self.au_mot("dans les litres")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.2)
        l5 = self.ligne([("le 5", BLEU_D), ("dans les dL,", WHITE)], 32, buff=0.18)
        self.col(l5, -1.65, XL + 0.3)
        self.au_mot("le 5")
        self.play(FadeIn(l5[0], shift=UP * 0.1), FadeIn(chiffre(tab, 1, "5", 38, BLEU_D), scale=1.3), run_time=0.25)
        self.au_mot("dans les décilitres")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.2)
        l6 = self.t("puis un zéro.", 32, ORANGE_RETENUE)
        self.col(l6, -2.15, XL + 0.3)
        self.au_mot("puis un zéro")
        z = chiffre(tab, 2, "0", 38, ORANGE_RETENUE)
        lu = hors_audit(Text("250 cL", font_size=32, color=VERT_OK, weight=BOLD))
        lu.next_to(tab, DOWN, buff=0.15).align_to(tab, RIGHT)
        self.play(FadeIn(l6, shift=UP * 0.1), FadeIn(z, scale=1.4), FadeIn(lu, shift=UP * 0.1), run_time=0.35)
        self.insister(lu, 1.2, 0.2)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bd = recipient("bidon", 1.9, 1.5, 0.8, EAU).move_to(P(-3.8, 1.45))
        eb = contenance(bd, "450 cL", 28)

        def autres_q(sc):
            sc.play(FadeIn(bd), FadeIn(eb), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Combien de litres", "font 450 centilitres ?"],
                             [self.choix("4,5 L"), self.choix("45 L"), self.choix("0,45 L")], 0,
                             ["450 ÷ 100 = 4,5.", "450 cL = 4,5 L."],
                             -0.75, couper={0: ("450 ÷ 100", "= 4,5."), 1: ("450 cL", "= 4,5 L.")},
                             mot_q="Combien de litres", autres_q=autres_q)

    # ── 08 : le défi (3 doses de 25 cL dans un bocal de 1 L) ────────────────
    def figure_defi(self):
        bo = recipient("pot", 2.4, 1.5, 0.75, DOSE).move_to(P(-4.3, 0.55))
        c = bo.corps
        traits = VGroup(*[Line(P(c.get_left()[0] + 0.06, c.get_bottom()[1] + c.height * k / 4),
                               P(c.get_left()[0] + 0.36, c.get_bottom()[1] + c.height * k / 4),
                               color=WHITE, stroke_width=3) for k in range(1, 4)])
        bo.add(traits)
        vs = VGroup(*[recipient("verre", 0.75, 0.55, 0.8, DOSE) for _ in range(3)]).arrange(RIGHT, buff=0.3)
        vs.move_to(P(-1.75, 0.0))
        return bo, vs

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        bo, vs = self.figure_defi()
        vider(bo)
        XL = 0.4
        l0 = self.ligne([("Lucie verse", WHITE), ("3 doses", JAUNE_TITRE)], 36, buff=0.2)
        self.col(l0, 2.25, XL)
        self.au_mot("Lucie verse 3")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(vs, lag_ratio=0.3), run_time=0.2)
        l0b = self.t("de 25 cL", 36, JAUNE_TITRE)
        self.col(l0b, 1.6, XL)
        ev = hors_audit(Text("25 cL chacune", font_size=24, color=JAUNE_TITRE, weight=BOLD)).next_to(vs, DOWN, buff=0.18)
        self.au_mot("doses de 25")
        self.play(FadeIn(l0b, shift=UP * 0.1), FadeIn(ev), run_time=0.3)
        l1 = self.ligne([("dans un bocal de", WHITE), ("1 L.", JAUNE_TITRE)], 36, buff=0.2)
        self.col(l1, 0.95, XL)
        self.au_mot("dans un bocal")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(bo, shift=UP * 0.2), run_time=0.35)
        self.au_mot("bocal de 1")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(contenance(bo, "1 L", 30)), run_time=0.25)
        self.au_mot("Combien de millilitres")
        q = self.bloc(["Combien de mL reste-t-il", "de place dans le bocal ?"], 36, JAUNE_TITRE)
        self.col(q, -0.15, XL)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(bo), run_time=0.5)
        self.pause_defi()

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        bo, vs = self.figure_defi()
        vider(bo)
        eb = contenance(bo, "1 L", 30)
        self.add(bo, vs, eb)
        XL = 0.4
        l1 = self.ligne([("3 × 25", BLEU_D), ("= 75 cL", VERT_OK)], 42, buff=0.3)
        self.col(l1, 2.2, XL)
        self.au_mot("Correction. 3")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("fois 25 : 75")
        self.play(FadeIn(l1[1], shift=UP * 0.1), remplir(bo, 0.6), *[v.liquide.animate.stretch(0.02, 1, about_edge=DOWN)
                                                                     for v in vs], run_time=0.6)
        l2 = self.ligne([("1 L", BLEU_D), ("= 100 cL", VERT_OK)], 42, buff=0.3)
        self.col(l2, 1.35, XL)
        self.au_mot("centilitres. 1 litre")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 100")
        e100 = hors_audit(Text("100 cL", font_size=30, color=VERT_OK, weight=BOLD)).move_to(eb)
        self.play(FadeIn(l2[1], shift=UP * 0.1), Transform(eb, e100), run_time=0.35)
        l3 = self.ligne([("100 − 75", WHITE), ("= 25 cL", VERT_OK)], 42, buff=0.3)
        self.col(l3, 0.5, XL)
        c = bo.corps
        vide = Rectangle(width=c.width - 0.14, height=c.height * 0.25 - 0.07, stroke_color=JAUNE_TITRE,
                         stroke_width=4, fill_color=JAUNE_TITRE, fill_opacity=0.15)
        vide.align_to(c, UP).shift(DOWN * 0.07).set_x(c.get_x())
        self.au_mot("centilitres. 100")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("moins 75 : 25")
        ev = hors_audit(Text("25 cL", font_size=24, color=JAUNE_TITRE, weight=BOLD)).move_to(vide)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(vide), FadeIn(ev), run_time=0.4)
        l4 = self.ligne([("25 cL", BLEU_D), ("= 250 mL", VERT_OK)], 42, buff=0.3)
        self.col(l4, -0.35, XL)
        self.au_mot("Et 25")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 250")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("250 mL de place", fs=42)
        hors_audit(res[1])  # 250 vient d'être dit (ligne du dessus)
        res.move_to(P(-3.3, -2.15))
        self.au_mot("de place")
        self.play(FadeIn(res, scale=1.2), Indicate(vide, color=VERT_OK, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        tab = tableau_unites(larg=0.75, haut=0.6, fs=24)
        for i, s in enumerate(("0", "2", "0", "0")):
            tab.add(chiffre(tab, i, s, 28, ORANGE_RETENUE if i > 1 else BLEU_D))
        tab.add(virgule(tab, 0, fs=32))
        fl = flacon(1.3, 0.65)
        fig = VGroup(tab, fl).arrange(DOWN, buff=0.5)
        lignes = self.finale_gauche(fig, textes=[
            ("L, dL, cL, mL :", "× 10 d'une unité à la suivante."),
            ("Vers une unité plus petite :", "on multiplie."),
            ("Vers une plus grande :", "on divise."),
            ("Avec une virgule, le tableau", "place chaque chiffre.")], fs=32)
        self.add(fig)
        self.au_mot("Litre, décilitre")
        self.montrer_ligne(lignes[0], Indicate(tab, scale_factor=1.05))
        self.au_mot("Vers une unité")
        self.montrer_ligne(lignes[1])
        self.au_mot("vers une plus grande")
        self.montrer_ligne(lignes[2])
        self.au_mot("Avec une virgule")
        self.montrer_ligne(lignes[3], Indicate(fl, scale_factor=1.05))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_virgule()
        self.ecran_calcul()
        self.ecran_vers_litres()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
