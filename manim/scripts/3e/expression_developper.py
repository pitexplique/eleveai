# expression_developper.py
# EleveAI — Maths 3e — Expression littérale, épisode 4 : développer
# (notionId : litteral_calcul, micro : litteral_developper), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau. Paysage CEINTURE VERTE, sur le modèle de l'épisode 1 de 5e
# (scripts/5e/expression_comprendre.py) ; short jumeau ceinture blanche :
# expression_developper_short.py.
#
# ⭐ LE DESSIN QUI PORTE TOUT : le terrain de x + 2 m sur x + 3 m, découpé en
# QUATRE morceaux : x² (BLEU), 3x et 2x (ORANGE), 6 (VERT). Même modèle d'aire
# que la paysage 4e (scripts/4e/litteral_developper.py). Puis les quatre
# flèches de la double distributivité (2 rouges depuis x, 2 bleues depuis 2).
# Signes : (x − 4)(x + 1) par la méthode de la grille.
#
# Défi : (2x + 1)(x − 3) = 2x² − 5x − 3, grille vide puis remplie.
#
# Voix : manim/voix/3e-expression-developper.json (Julie, débit −7), validée.
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/expression_developper.py ExpressionDevelopper3e -o eleveai-maths-3e-expression-developper --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/04-developper/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

COUL_X2 = BLEU_CALCUL      # le morceau x sur x
COUL_X = ORANGE_RETENUE    # les morceaux 3x et 2x
COUL_K = VERT_OK           # le morceau 2 sur 3
HERBE = "#14532D"
TOUFFE = "#4ADE80"
FL_ROUGE = "#F87171"       # flèches parties du x
FL_BLEUE = "#60A5FA"       # flèches parties du 2


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def tx(texte, font_size=36, color=WHITE, lettre=JAUNE_TITRE):
    """Un Text dont chaque « x » est en JAUNE (la lettre)."""
    m = Text(texte, font_size=font_size, color=color)
    car = texte.replace(" ", "")
    if len(car) == len(m):
        for i, c in enumerate(car):
            if c == "x":
                m[i].set_color(lettre)
    return m


def terrain(coin, X, A, B, police=34, herbe=True):
    """Le terrain de (x + 2) sur (x + 3) : colonnes x | 3, lignes x | 2.

    Renvoie un dict : fond, touffes, bord, coupes, morceaux[i][j] (rectangles
    pleins à faire apparaître), etiquettes (haut x, 3 ; gauche x, 2).
    """
    x0, y0 = coin
    L, H = X + A, X + B
    fond = Rectangle(width=L, height=H, stroke_width=0, fill_color=HERBE, fill_opacity=0.95)
    fond.move_to(P(x0 + L / 2, y0 - H / 2))
    touffes = VGroup()
    if herbe:
        rng = np.random.default_rng(4)
        for _ in range(int(L * H * 2.2)):
            cx = x0 + 0.15 + rng.random() * (L - 0.3)
            cy = y0 - 0.15 - rng.random() * (H - 0.3)
            h = 0.12 * (L / 3.9 + 0.4)
            touffes.add(VGroup(
                Line(P(cx, cy), P(cx - h * 0.5, cy + h), stroke_width=2, color=TOUFFE),
                Line(P(cx, cy), P(cx, cy + h * 1.2), stroke_width=2, color=TOUFFE),
                Line(P(cx, cy), P(cx + h * 0.5, cy + h), stroke_width=2, color=TOUFFE),
            ))
    bord = Rectangle(width=L, height=H, stroke_color=WHITE, stroke_width=4).move_to(fond)
    coupes = VGroup(
        DashedLine(P(x0 + X, y0 + 0.05), P(x0 + X, y0 - H - 0.05), dash_length=0.12),
        DashedLine(P(x0 - 0.05, y0 - X), P(x0 + L + 0.05, y0 - X), dash_length=0.12),
    ).set_stroke(WHITE, 4)
    cols = [(X, x0), (A, x0 + X)]
    rows = [(X, y0), (B, y0 - X)]
    coul = [[COUL_X2, COUL_X], [COUL_X, COUL_K]]
    morceaux = []
    for i, (h, yy) in enumerate(rows):
        ligne = []
        for j, (w, xx) in enumerate(cols):
            r = Rectangle(width=w, height=h, stroke_width=0, fill_color=coul[i][j], fill_opacity=0.6)
            r.move_to(P(xx + w / 2, yy - h / 2))
            ligne.append(r)
        morceaux.append(ligne)
    etiq = VGroup(
        tx("x", police).move_to(P(x0 + X / 2, y0 + 0.3)),
        Text("3", font_size=police).move_to(P(x0 + X + A / 2, y0 + 0.3)),
        tx("x", police).move_to(P(x0 - 0.3, y0 - X / 2)),
        Text("2", font_size=police).move_to(P(x0 - 0.3, y0 - X - B / 2)),
    )
    return dict(fond=fond, touffes=touffes, bord=bord, coupes=coupes, morceaux=morceaux, etiq=etiq)


# Le terrain de la paysage : coin haut-gauche, x, 3, 2.
COIN, TX, TA, TB = (-4.6, 2.0), 2.6, 1.3, 0.9
NOMS = [["x²", "3x"], ["2x", "6"]]


class ExpressionDevelopper3e(Notion3e):
    nom_voix = "3e-expression-developper"

    def t(self, texte, font_size=36, color=WHITE):
        return tx(texte, font_size, color)

    def insister(self, mob, run_time=0.5):
        """Agrandir puis rétrécir (règle de Frédéric, pas de zoom caméra)."""
        mobs = mob if isinstance(mob, (list, tuple)) else [mob]
        self.play(*[m.animate.scale(1.5) for m in mobs], run_time=run_time)
        self.play(*[m.animate.scale(1 / 1.5) for m in mobs], run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def fleche(self, a, b, color, dessous=False):
        if dessous:
            return CurvedArrow(a.get_bottom() + DOWN * 0.08, b.get_bottom() + DOWN * 0.08,
                               angle=PI / 2, color=color, stroke_width=5)
        return CurvedArrow(a.get_top() + UP * 0.08, b.get_top() + UP * 0.08,
                           angle=-PI / 2, color=color, stroke_width=5)

    # ── le terrain ──────────────────────────────────────────────────────────

    def le_terrain(self):
        return terrain(COIN, TX, TA, TB)

    def nom_morceau(self, ter, i, j, font_size=40):
        return self.t(NOMS[i][j], font_size).move_to(ter["morceaux"][i][j])

    # ── la grille 2 × 2 ─────────────────────────────────────────────────────

    def grille(self, centre, lignes, colonnes, w=1.8, h=0.85, wt=1.2, ht=0.7, police=36):
        """La méthode de la grille : en-têtes (×, colonnes, lignes) et 4 cases."""
        cx, cy = centre
        L = wt + 2 * w
        Ht = ht + 2 * h
        x0, y0 = cx - L / 2, cy + Ht / 2
        traits = VGroup()
        cases = []
        xs = [x0, x0 + wt, x0 + wt + w, x0 + L]
        ys = [y0, y0 - ht, y0 - ht - h, y0 - Ht]
        for x in xs:
            traits.add(Line(P(x, y0), P(x, y0 - Ht)))
        for y in ys:
            traits.add(Line(P(x0, y), P(x0 + L, y)))
        traits.set_stroke(WHITE, 2.5)
        tetes = VGroup(Text("×", font_size=police, color=BLEU_CALCUL).move_to(P(x0 + wt / 2, y0 - ht / 2)))
        for j, c in enumerate(colonnes):
            tetes.add(self.t(c, police).move_to(P(x0 + wt + w * (j + 0.5), y0 - ht / 2)))
        for i, l in enumerate(lignes):
            tetes.add(self.t(l, police).move_to(P(x0 + wt / 2, y0 - ht - h * (i + 0.5))))
        for i in range(2):
            ligne = []
            for j in range(2):
                ligne.append(Rectangle(width=w, height=h, stroke_width=0).move_to(
                    P(x0 + wt + w * (j + 0.5), y0 - ht - h * (i + 0.5))))
            cases.append(ligne)
        return traits, tetes, cases

    def remplir(self, case, texte, color, font_size=38):
        fond = case.copy().set_fill(color, opacity=0.45).set_stroke(width=0)
        return VGroup(fond, self.t(texte, font_size).move_to(case))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Développer deux parenthèses", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("Comment multiplier")
        e = self.t("(x + 2)(x + 3)", 80).move_to(P(-1.3, 0.4))
        q = self.t("=  ?", 80, BLEU_CALCUL).next_to(e, RIGHT, buff=0.4)
        self.play(FadeIn(e, shift=UP * 0.2), FadeIn(q, shift=UP * 0.2))
        par = [VGroup(e[0], e[4]), VGroup(e[5], e[9])]
        self.play(*[p.animate.set_color(ORANGE_RETENUE) for p in par], run_time=0.5)
        self.insister(par)
        self.attendre_voix(marge=1.5)

    # ── 01 : rappel ─────────────────────────────────────────────────────────

    def ecran_rappel(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-rappel")
        self.titre_ecran("Rappel : un nombre devant la parenthèse")
        self.play(Write(self.chute("Le nombre devant multiplie CHAQUE terme.", color=BLEU_CALCUL, font_size=34)))

        self.au_mot("3 fois, parenthèse")
        e1 = self.t("3(x + 4)", 64).move_to(P(-3.8, 1.75))
        self.play(Write(e1))
        f1 = self.fleche(e1[0], e1[2], VERT_OK)
        f2 = self.fleche(e1[0], e1[4], ORANGE_RETENUE)
        self.au_mot("3 x plus 12")
        r1 = self.t("= 3x + 12", 64, VERT_OK).next_to(e1, RIGHT, buff=0.35)
        self.play(Create(f1), Create(f2), Write(r1))

        self.au_mot("Avec un négatif")
        e2 = self.t("−2(x − 5)", 64).move_to(P(-3.8, -0.15))
        e2[0].set_color(ORANGE_RETENUE)
        self.play(Write(e2))
        self.au_mot("moins 2 x, et")
        g1 = self.fleche(VGroup(e2[0], e2[1]), e2[3], VERT_OK)
        p1 = self.t("−2 × x = −2x", 42, VERT_OK).move_to(P(-4.4, -1.6))
        self.play(Create(g1), FadeIn(p1, shift=DOWN * 0.2))
        self.au_mot("moins 2 fois moins 5")
        g2 = self.fleche(VGroup(e2[0], e2[1]), VGroup(e2[4], e2[5]), ORANGE_RETENUE)
        p2 = self.t("−2 × (−5) = +10", 42, ORANGE_RETENUE).move_to(P(0.9, -1.6))
        self.play(Create(g2), FadeIn(p2, shift=DOWN * 0.2))
        self.insister(p2)
        self.au_mot("Moins 2 x plus 10.")
        r2 = self.t("= −2x + 10", 64, VERT_OK).next_to(e2, RIGHT, buff=0.35)
        self.play(Write(r2))
        self.attendre_voix()

    # ── 02 : le terrain ─────────────────────────────────────────────────────

    def ecran_terrain(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-terrain")
        self.titre_ecran("Un terrain rectangulaire")
        ter = self.le_terrain()
        self.play(FadeIn(ter["fond"]), Create(ter["bord"]))
        self.play(LaggedStart(*[FadeIn(k) for k in ter["touffes"]], lag_ratio=0.01), run_time=0.8)
        self.au_mot("x plus 2 mètres")
        bg = Brace(ter["bord"], LEFT, buff=0.12, color=BLEU_CALCUL)
        lg = self.t("x + 2 m", 34).next_to(bg, LEFT, buff=0.1)
        self.play(GrowFromCenter(bg), FadeIn(lg))
        self.au_mot("sur x plus 3 mètres")
        bh = Brace(ter["bord"], UP, buff=0.12, color=BLEU_CALCUL)
        lh = self.t("x + 3 m", 34).next_to(bh, UP, buff=0.08)
        self.play(GrowFromCenter(bh), FadeIn(lh))
        self.au_mot("Son aire")
        a = self.t("aire = ?", 54, BLEU_CALCUL).move_to(P(3.0, 1.3))
        self.play(Write(a))
        self.au_mot("parenthèse, x plus 2, fois")
        e = self.t("(x + 2)(x + 3)", 50)
        eg = self.t("=", 50)
        VGroup(eg, e).arrange(RIGHT, buff=0.3).move_to(P(3.0, 0.1))
        self.play(Write(VGroup(eg, e[:5])))
        self.au_mot("parenthèse, x plus 3.")
        self.play(Write(e[5:]))
        self.play(Indicate(e, color=BLEU_CALCUL, scale_factor=1.15))
        self.attendre_voix()

    # ── 03 : je découpe ─────────────────────────────────────────────────────

    def ecran_decouper(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-decouper")
        self.titre_ecran("Je découpe le terrain en quatre")
        ter = self.le_terrain()
        self.add(ter["fond"], ter["touffes"], ter["bord"])
        self.au_mot("Je découpe")
        self.play(Create(ter["coupes"]), FadeIn(ter["etiq"]), run_time=1.2)
        produits = [("x fois x", "x × x = x²"), ("x fois 3", "x × 3 = 3x"),
                    ("2 fois x", "2 × x = 2x"), ("2 fois 3", "2 × 3 = 6")]
        coul = [COUL_X2, COUL_X, COUL_X, COUL_K]
        for k, ((mot, calc), c) in enumerate(zip(produits, coul)):
            i, j = divmod(k, 2)
            self.au_mot(mot)
            l = self.t(calc, 40).move_to(P(3.0, 1.6 - 0.8 * k))
            k_eg = calc.replace(" ", "").index("=")
            VGroup(*l[k_eg + 1:]).set_color(c)
            for g, ch in zip(l, calc.replace(" ", "")):
                if ch == "x" and g in l[k_eg + 1:]:
                    g.set_color(JAUNE_TITRE)
            self.play(FadeIn(ter["morceaux"][i][j]), FadeIn(self.nom_morceau(ter, i, j)),
                      FadeIn(l, shift=LEFT * 0.2), run_time=0.7)
        self.au_mot("En tout")
        tot = self.t("aire = x² + 3x + 2x + 6", 48, VERT_OK).move_to(P(-1.0, -2.4))
        self.play(Write(tot))
        self.attendre_voix()

    # ── 04 : réduire, puis la règle ─────────────────────────────────────────

    def ecran_reduire(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-reduire")
        titre = self.titre_ecran("Je réduis")
        ter = self.le_terrain()
        noms = VGroup(*[self.nom_morceau(ter, i, j) for i in range(2) for j in range(2)])
        m = ter["morceaux"]
        self.add(ter["fond"], ter["touffes"], ter["bord"], ter["coupes"], ter["etiq"],
                 *[r for l in m for r in l], noms)
        tot = VGroup(self.t("aire =", 48), self.t("x²", 48), self.t("+ 3x", 48), self.t("+ 2x", 48),
                     self.t("+ 6", 48)).arrange(RIGHT, buff=0.25).move_to(P(-1.0, -2.4))
        self.add(tot)

        self.au_mot("Je réduis")
        b3 = m[0][1].copy()
        b2 = m[1][0].copy()
        self.play(tot[2].animate.set_color(COUL_X), tot[3].animate.set_color(COUL_X),
                  Indicate(m[0][1], color=COUL_X), Indicate(m[1][0], color=COUL_X))
        cx, cy = 3.0, 0.6
        self.play(b3.animate.move_to(P(cx - 1.1 + TA / 2, cy)),
                  Rotate(b2, PI / 2), run_time=0.9)
        self.play(b2.animate.move_to(P(cx + 1.1 - TB / 2, cy)), run_time=0.9)
        n3 = self.t("3x", 36).move_to(b3)
        n2 = self.t("2x", 36).move_to(b2)
        lx = self.t("x", 34).next_to(VGroup(b3, b2), LEFT, buff=0.15)
        l3 = Text("3", font_size=34).next_to(b3, UP, buff=0.1)
        l2 = Text("2", font_size=34).next_to(b2, UP, buff=0.1)
        self.play(FadeIn(n3), FadeIn(n2), FadeIn(lx), FadeIn(l3), FadeIn(l2))
        self.au_mot("5 x. L'aire")
        bande = VGroup(b3, b2)
        n5 = self.t("5x", 44).move_to(bande)
        l5 = Text("5", font_size=34).next_to(bande, UP, buff=0.1)
        reg = self.t("3x + 2x = 5x", 40, VERT_OK).move_to(P(3.0, -1.2))
        self.play(ReplacementTransform(VGroup(n3, n2), n5), ReplacementTransform(VGroup(l3, l2), l5),
                  b2.animate.set_fill(COUL_X, 0.6), FadeIn(reg))
        self.au_mot("x au carré plus 5 x plus 6")
        res = self.t("aire = x² + 5x + 6", 52, VERT_OK).move_to(P(-1.0, -2.4))
        self.play(ReplacementTransform(tot, res))
        self.insister(res)

        self.au_mot("C'est la double")
        tout = VGroup(ter["fond"], ter["touffes"], ter["bord"], ter["coupes"], ter["etiq"],
                      *[r for l in m for r in l], noms, bande, n5, l5, lx, reg, res)
        nouveau = self.t("La double distributivité", 40, JAUNE_TITRE).to_edge(UP)
        self.play(FadeOut(tout), ReplacementTransform(titre, nouveau))
        e = self.t("(x + 2)(x + 3)", 96).move_to(P(-0.6, 0.6))
        r = self.t("= x² + 5x + 6", 64, VERT_OK).move_to(P(-0.6, -1.65))
        self.play(FadeIn(e), FadeIn(r))
        self.au_mot("chaque terme de la première")
        fr = [self.fleche(e[1], e[6], FL_ROUGE), self.fleche(e[1], e[8], FL_ROUGE)]
        self.play(e[1].animate.set_color(FL_ROUGE), *[Create(f) for f in fr], run_time=0.9)
        fb = [self.fleche(e[3], e[6], FL_BLEUE, dessous=True), self.fleche(e[3], e[8], FL_BLEUE, dessous=True)]
        self.play(e[3].animate.set_color(FL_BLEUE), *[Create(f) for f in fb], run_time=0.9)
        self.au_mot("chaque terme de la deuxième")
        self.play(Write(self.chute("4 flèches = 4 produits", color=BLEU_CALCUL, font_size=36)))
        self.attendre_voix()

    # ── 05 : avec des signes moins ──────────────────────────────────────────

    def ecran_signes(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-signes")
        self.titre_ecran("Avec des signes −")
        self.au_mot("en faisant attention")
        att = self.t("Attention aux signes !", 34, ORANGE_RETENUE).move_to(P(3.0, 2.0))
        self.play(FadeIn(att))
        self.au_mot("Parenthèse, x moins 4")
        e = self.t("(x − 4)(x + 1)", 60).move_to(P(-3.2, 2.0))
        self.play(Write(e))
        traits, tetes, cases = self.grille((-3.2, -0.4), ["x", "−4"], ["x", "+1"])
        self.play(Create(traits), FadeIn(tetes))
        self.play(Indicate(tetes[4], color=ORANGE_RETENUE, scale_factor=1.5),
                  tetes[4].animate.set_color(ORANGE_RETENUE))
        somme = VGroup(self.t("=", 46)).move_to(P(1.0, 0.5))
        termes = [("x au carré,", (0, 0), "x²", "x²", COUL_X2),
                  ("plus x,", (0, 1), "+x", "+ x", COUL_X),
                  ("moins 4 x,", (1, 0), "−4x", "− 4x", COUL_X),
                  ("moins 4. Donc", (1, 1), "−4", "− 4", COUL_K)]
        for mot, (i, j), case, terme, c in termes:
            self.au_mot(mot)
            m = self.t(terme, 46).next_to(somme, RIGHT, buff=0.25)
            neuf = VGroup(somme[0], m) if len(somme) == 1 else m
            self.play(FadeIn(self.remplir(cases[i][j], case, c)), FadeIn(neuf, shift=LEFT * 0.2), run_time=0.6)
            somme.add(m)
        self.play(somme[2].animate.set_color(COUL_X), somme[3].animate.set_color(COUL_X), run_time=0.4)
        red = self.t("+ x − 4x = −3x", 38, COUL_X).move_to(P(3.0, -0.5))
        res = self.t("= x² − 3x − 4", 56, VERT_OK).move_to(P(2.9, -1.6))
        self.play(FadeIn(red))
        self.play(Write(res))
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("4 fois, parenthèse")
        faux = self.t("4(x + 3) = 4x + 3", 76).move_to(P(-0.6, 1.4))
        VGroup(*faux[7:]).set_color(ROUGE_ERREUR)
        self.play(Write(faux))
        self.au_mot("Faux")
        self.play(Create(self.barrer(VGroup(*faux[7:]))))
        self.au_mot("le 3 aussi")
        trois = faux[4]
        fl = self.fleche(faux[0], trois, ORANGE_RETENUE)
        self.play(trois.animate.set_color(ORANGE_RETENUE), Create(fl))
        self.insister(trois, run_time=0.6)
        oubli = self.t("le 3 aussi est multiplié !", 38, ORANGE_RETENUE).move_to(P(-0.6, 0.0))
        self.play(FadeIn(oubli))
        self.au_mot("4 x plus 12")
        bon = self.t("4(x + 3) = 4x + 12", 72, VERT_OK).move_to(P(-0.6, -1.5))
        self.play(Write(bon))
        self.insister(VGroup(*bon[-2:]))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Développe et réduis")
        self.play(FadeIn(self.t("Développe et réduis :", 40, BLEU_CALCUL).move_to(P(-0.6, 2.2))))
        self.au_mot("parenthèse, 2 x plus 1")
        e = self.t("(2x + 1)(x − 3) = ?", 72).move_to(P(-0.6, 1.1))
        self.play(GrowFromCenter(e))
        traits, tetes, cases = self.grille((-0.6, -1.2), ["2x", "+1"], ["x", "−3"], h=0.7, ht=0.6)
        q = VGroup(*[Text("?", font_size=40, color=ORANGE_RETENUE).move_to(c) for l in cases for c in l])
        self.play(Create(traits), FadeIn(tetes), FadeIn(q))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        e = self.t("(2x + 1)(x − 3)", 60).move_to(P(-3.4, 2.0))
        self.add(e)
        traits, tetes, cases = self.grille((-3.4, -0.1), ["2x", "+1"], ["x", "−3"])
        self.add(traits, tetes)
        etapes = [("2 x fois x", (0, 0), "2x²", "2x × x = 2x²", COUL_X2),
                  ("2 x fois moins 3", (0, 1), "−6x", "2x × (−3) = −6x", COUL_X),
                  ("1 fois x", (1, 0), "+x", "1 × x = x", COUL_X),
                  ("1 fois moins 3", (1, 1), "−3", "1 × (−3) = −3", COUL_K)]
        lignes = VGroup()
        for k, (mot, (i, j), case, calc, c) in enumerate(etapes):
            self.au_mot(mot)
            l = self.t(calc, 38).move_to(P(2.6, 1.5 - 0.75 * k))
            self.play(FadeIn(self.remplir(cases[i][j], case, c)), FadeIn(l, shift=LEFT * 0.2), run_time=0.7)
            lignes.add(l)
        self.au_mot("Je réduis")
        red = self.t("−6x + x = −5x", 38, COUL_X).move_to(P(2.6, -1.5))
        self.play(FadeIn(red))
        r = self.t("= 2x² − 5x − 3", 64, VERT_OK).move_to(P(-0.8, -2.5))
        self.play(GrowFromCenter(r))
        self.insister(r)
        self.attendre_voix()

    # ── 08 : ce que tu as appris (règle du 13/10 : des affirmations) ─────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ('Le nombre devant', 'Le nombre devant multiplie chaque terme, même négatif.'),
            ('La double distributivité', 'Double distributivité : 4 produits.'),
            ('Puis on réduit', 'Puis on réduit.'),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 32)).arrange(RIGHT, buff=0.3)
                          for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 11.5:
            lignes.scale_to_fit_width(11.5)
        lignes.move_to(P(-0.6, 0.5))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(Create(l[0]), FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("L'épisode 5")
        self.play(Write(self.chute('Épisode 5 : factoriser', color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_rappel()
        self.ecran_terrain()
        self.ecran_decouper()
        self.ecran_reduire()
        self.ecran_signes()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
