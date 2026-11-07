# div_euclidienne.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers », épisode 04 : LA DIVISION EUCLIDIENNE.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : div_euclidienne.
# Décor et métier : Jules, pharmacien. Centres : corps-sante.
# Écrans : garde (00) ; les comprimés de Jules (01) ; il remplit les plaquettes (02) ;
# l'égalité et ses quatre noms (03) ; la condition sur le reste (04) ; QUESTION 1 (04q) ;
# le piège (05) ; QUESTION 2 (05q) ; défi (06) et correction (06b) ; ce que tu as appris (07) ; fin (08).
# Voix : manim/voix/4e-div-euclidienne.json ; marques : div_euclidienne_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/div_euclidienne.py DivEuclidienne4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/div_euclidienne.py DivEuclidienne4e -o eleveai-maths-4e-div-euclidienne --media_dir manim/scripts/4e/media-div-04
# Sortie : manim/sorties/4e/maths/divisibilite/04-euclidienne/eleveai-maths-4e-div-euclidienne.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from div_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402

# « 5 < 6 » se lit « 5 est plus petit que 6 » : le signe se pose sur « petit » (« grand » pour >).
PAROLE.setdefault("<", "petit")
PAROLE.setdefault(">", "grand")

# Le code couleur de l'épisode : dividende bleu ciel, diviseur jaune, quotient vert, reste orange.
C_DIVIDENDE = CIEL
C_DIVISEUR = JAUNE_TITRE
C_QUOTIENT = VERT_OK
C_RESTE = ORANGE_RETENUE
BLANC_C = "#f8fafc"


def jules_pharmacien(s=0.72):
    """Jules : la blouse blanche et la croix verte de la pharmacie."""
    p = personne(peau="#e0ac69", tenue="#0f766e", cheveux="#3f2a1d", s=s)
    b = blouse(p)
    c = p.corps.get_center() + UP * 0.12 * s + RIGHT * 0.22 * s
    croix = VGroup(Rectangle(width=0.3 * s, height=0.1 * s), Rectangle(width=0.1 * s, height=0.3 * s))
    croix.set_fill("#16a34a", 1).set_stroke(width=0).move_to(c)
    return VGroup(p, b, croix)


def comprime(r=0.1, c=BLANC_C):
    """Un comprimé rond, vu de dessus, avec sa barre de sécabilité."""
    rond = Circle(radius=r, fill_color=c, fill_opacity=1, stroke_color="#64748b", stroke_width=1.5)
    barre = Line(P(-r * 0.6, 0), P(r * 0.6, 0), color="#94a3b8", stroke_width=1.5)
    return VGroup(rond, barre)


def gelule(w=0.34, c1="#ef4444", c2=BLANC_C):
    """Une gélule : deux moitiés de couleur."""
    h = w * 0.42
    a = RoundedRectangle(width=w * 0.56, height=h, corner_radius=h / 2, fill_color=c1, fill_opacity=1, stroke_width=0)
    b = RoundedRectangle(width=w * 0.56, height=h, corner_radius=h / 2, fill_color=c2, fill_opacity=1, stroke_width=0)
    a.move_to(P(-w * 0.22, 0))
    b.move_to(P(w * 0.22, 0))
    return VGroup(b, a)


def plaquette(cols=3, lignes=2, pas=0.3, r=0.1, pointilles=False):
    """Une plaquette vide : [0] le cadre, [1] les alvéoles (à remplir avec move_to)."""
    w, h = cols * pas + 0.16, lignes * pas + 0.16
    cadre = RoundedRectangle(width=w, height=h, corner_radius=0.08, fill_color="#334155", fill_opacity=1,
                             stroke_color="#cbd5e1", stroke_width=2)
    if pointilles:
        cadre = DashedVMobject(RoundedRectangle(width=w, height=h, corner_radius=0.08, stroke_color="#cbd5e1",
                                                stroke_width=2), num_dashes=22)
    alv = VGroup()
    for i in range(lignes):
        for j in range(cols):
            alv.add(Circle(radius=r + 0.025, fill_color="#1e293b", fill_opacity=1, stroke_color="#94a3b8",
                           stroke_width=1.5).move_to(P((j - (cols - 1) / 2) * pas, ((lignes - 1) / 2 - i) * pas)))
    return VGroup(cadre, alv)


def remplie(pl, c=BLANC_C, r=0.1):
    """Les comprimés posés dans les alvéoles de la plaquette pl."""
    return VGroup(*[comprime(r, c).move_to(a) for a in pl[1]])


def en_tas(n, x0, x1, y0, y1, fabrique, ecart=0.3, graine=4):
    """n objets posés au hasard, sans se toucher."""
    rng = np.random.default_rng(graine)
    pts = []
    essais = 0
    while len(pts) < n:
        essais += 1
        assert essais < 200000, "pas assez de place"
        p = (rng.uniform(x0, x1), rng.uniform(y0, y1))
        if all((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 > ecart ** 2 for q in pts):
            pts.append(p)
    return VGroup(*[fabrique().move_to(P(*p)) for p in pts])


def flacon(nombre, s=1.0):
    """Le flacon de gélules, son étiquette porte le nombre (donnée de figure)."""
    corps = RoundedRectangle(width=1.5 * s, height=2.0 * s, corner_radius=0.2 * s, fill_color="#b45309",
                             fill_opacity=0.85, stroke_color="#fbbf24", stroke_width=3)
    col = Rectangle(width=0.9 * s, height=0.22 * s, fill_color="#92400e", fill_opacity=1, stroke_width=0)
    col.next_to(corps, UP, buff=0)
    bouchon = RoundedRectangle(width=1.1 * s, height=0.38 * s, corner_radius=0.08 * s, fill_color=BLANC_C,
                               fill_opacity=1, stroke_width=0).next_to(col, UP, buff=0)
    etiq = RoundedRectangle(width=1.24 * s, height=0.9 * s, corner_radius=0.08 * s, fill_color=BLANC_C,
                            fill_opacity=1, stroke_width=0).move_to(corps).shift(DOWN * 0.1 * s)
    txt = T(str(nombre), int(40 * s), "#1e293b", audit=False, gras=True).move_to(etiq).shift(UP * 0.12 * s)
    g1 = gelule(0.34 * s).move_to(etiq).shift(DOWN * 0.24 * s + LEFT * 0.25 * s)
    g2 = gelule(0.34 * s).move_to(etiq).shift(DOWN * 0.24 * s + RIGHT * 0.25 * s)
    return VGroup(corps, col, bouchon, etiq, txt, g1, g2)


class DivEuclidienne4e(PaysageDiv):
    nom_voix = "4e-div-euclidienne"
    fichier_marques = "div_euclidienne_marques.json"
    ceinture = "orange"

    def remplir(self, pl, pilules):
        """Les pilules filent dans les alvéoles de la plaquette pl."""
        return [p.animate.move_to(a) for p, a in zip(pilules, pl[1])]

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La division euclidienne", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("division", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        pl = VGroup(*[plaquette().move_to(P(-5.4 + 1.3 * (k % 2), 1.0 - 0.95 * (k // 2))) for k in range(4)])
        pleins = VGroup(*[remplie(p) for p in pl])
        reste = VGroup(*[comprime(0.12, C_RESTE).move_to(P(-5.2 + 0.36 * k, -1.0)) for k in range(5)])
        l1 = self.lg("Que faire", 2.0, 0.75, 46, maxw=8)
        self.dit(l1, "Que faire", avec=[FadeIn(pl), FadeIn(pleins)])
        l2 = self.lg("de ce qui reste ?", 2.0, -0.1, 54, JAUNE_TITRE, maxw=8)
        self.dit(l2, "de ce qui reste ?", avec=[LaggedStart(*[FadeIn(c, scale=0.4) for c in reste], lag_ratio=0.15)])
        self.insister(VGroup(l2, reste), 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les comprimés de Jules ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = jules_pharmacien().move_to(P(-5.9, 2.25))
        tas = en_tas(47, -4.9, -1.0, -1.3, 2.4, lambda: comprime(0.11), ecart=0.36, graine=3)
        pl = plaquette(pas=0.36, r=0.12).move_to(P(-3.0, -2.45))
        self.dit(self.lg("Jules est pharmacien.", 3.2, 3.0, 40, CIEL), "Jules est pharmacien.", avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("Il a 47 comprimés", 3.2, 2.3, 40), "Il a 47 comprimés",
                 avec=[LaggedStart(*[FadeIn(c, scale=0.4) for c in tas], lag_ratio=0.03)])
        self.dit(self.lg("à ranger dans des", 3.2, 1.7, 40), "à ranger dans des", avec=[FadeIn(pl, shift=UP * 0.2)])
        self.dit(self.lg("plaquettes de 6.", 3.2, 1.1, 40), "plaquettes de 6.")
        q1 = VGroup(self.lg("Combien de plaquettes", 3.2, 0.1, 42, JAUNE_TITRE), self.lg("pleines ?", 3.2, -0.5, 42, JAUNE_TITRE))
        self.dit(q1[0], "Combien de plaquettes")
        self.dit(q1[1], "pleines ?")
        q2 = VGroup(self.lg("Et combien de", 3.2, -1.25, 42, JAUNE_TITRE), self.lg("comprimés restent ?", 3.0, -1.85, 42, JAUNE_TITRE))
        self.dit(q2[0], "Et combien de")
        self.dit(q2[1], "comprimés restent ?")
        self.insister(VGroup(q1, q2), 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : il remplit les plaquettes ──────────────────────────────────────
    def ecran_remplir(self):
        self.ecran("02-remplir")
        xs = [-5.7, -4.35, -3.0, -1.65]
        pos = [P(xs[k % 4], 2.55 - 1.05 * (k // 4)) for k in range(8)]
        pls = VGroup(*[plaquette().move_to(pos[k]) for k in range(7)])
        fant = plaquette(pointilles=True).move_to(pos[7])
        tas = en_tas(47, -6.1, -1.3, -2.95, 0.6, lambda: comprime(0.1), ecart=0.31, graine=11)
        self.play(FadeIn(pls), FadeIn(tas), run_time=0.4)
        self.dit(self.lg("Il remplit :", 3.2, 3.0, 40, CIEL), "Il remplit :")
        e = F("6, 12, 18, 24, 30, 36, 42", 42).move_to(P(3.2, 2.2))
        if e.width > 6.2:
            e.scale_to_fit_width(6.2)
        gestes = {2 * k: (lambda k=k: self.remplir(pls[k], tas[6 * k:6 * k + 6])) for k in range(7)}
        self.poser_avec(e, "6, 12, 18, 24, 30, 36, 42", gestes, rt=0.4)
        sept = self.lg("7 plaquettes pleines.", 3.2, 1.35, 40, VERT_OK)
        self.dit(sept, "7 plaquettes pleines.", avec=[*[Indicate(p[0], color=VERT_OK, scale_factor=1.06) for p in pls]])
        croix = Cross(fant, stroke_color=PIEGE, stroke_width=5, scale_factor=0.7)
        self.dit(self.lg("48, ce serait trop.", 3.2, 0.55, 40, PIEGE), "48, ce serait trop.",
                 avec=[FadeIn(fant), Create(croix)])
        reste = VGroup(*tas[42:])
        self.dit(self.lg("Il reste 47 − 42 :", 3.2, -0.45, 44), "Il reste 47 moins 42 :")
        cin = self.lg("5 comprimés.", 3.2, -1.2, 50, C_RESTE)
        self.dit(cin, "5 comprimés.", avec=[*[c[0].animate.set_fill(C_RESTE) for c in reste]])
        self.play(Circumscribe(reste, color=C_RESTE, buff=0.12), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 03 : l'égalité et ses quatre noms ───────────────────────────────────
    def ecran_ecrire(self):
        self.ecran("03-ecrire")
        self.dit(self.lg("On l'écrit :", 0, 3.22, 38, CIEL), "On l'écrit :")
        e = F("47 = 6 × 7 + 5", 90).move_to(P(0, 0.98))
        a47, a6, a7, a5 = e.atomes[0], e.atomes[2], e.atomes[4], e.atomes[6]
        pls = VGroup(*[plaquette(pas=0.24, r=0.08) for _ in range(7)]).arrange(RIGHT, buff=0.18)
        pleins = VGroup(*[remplie(p, r=0.08) for p in pls])
        reste = VGroup(*[comprime(0.09, C_RESTE) for _ in range(5)]).arrange(RIGHT, buff=0.1)
        fig = VGroup(VGroup(pls, pleins), reste).arrange(RIGHT, buff=0.45).move_to(P(-0.8, -2.15))
        for p, q in zip(pleins, pls):
            for c, a in zip(p, q[1]):
                c.move_to(a)
        self.poser_avec(e, "47 égale 6 fois 7, plus 5.", {4: lambda: [FadeIn(pls), FadeIn(pleins)],
                                                          6: lambda: [FadeIn(reste, scale=0.5)]})
        noms = [("dividende", a47, C_DIVIDENDE, UP), ("diviseur", a6, C_DIVISEUR, DOWN),
                ("quotient", a7, C_QUOTIENT, UP), ("reste", a5, C_RESTE, DOWN)]
        for mot, a, c, sens in noms:
            y = 2.35 if sens is UP else -0.45
            lab = self.lg(mot, a.get_center()[0], y, 40, c, maxw=3)
            bout = a.get_top() + UP * 0.08 if sens is UP else a.get_bottom() + DOWN * 0.08
            depart = lab.get_bottom() + DOWN * 0.06 if sens is UP else lab.get_top() + UP * 0.06
            fl = Arrow(depart, bout, buff=0, color=c, stroke_width=4, max_tip_length_to_length_ratio=0.3)
            self.dit(lab, mot, avec=[a.animate.set_color(c), GrowArrow(fl)])
        self.attendre_voix(marge=0.8)

    # ── 04 : la condition sur le reste ──────────────────────────────────────
    def ecran_condition(self):
        self.ecran("04-condition")
        rap = colorer_reste(F("47 = 6 × 7 + 5", 50).sans_audit()).move_to(P(0, 3.15))
        self.play(FadeIn(rap), run_time=0.3)
        self.dit(self.lg("Et une condition compte autant que l'égalité :", 0, 2.25, 38, maxw=12.4),
                 "Et une condition compte autant que l'égalité :")
        cond = self.lg("le reste est plus petit que le diviseur.", 0, 1.45, 44, JAUNE_TITRE, maxw=12.4)
        self.dit(cond, "le reste est plus petit que le diviseur.")
        self.insister(cond, 1.08, 0.2)
        e = F("5 < 6", 84).move_to(P(-3.3, 0.15))
        e.atomes[0].set_color(C_RESTE)
        e.atomes[2].set_color(C_DIVISEUR)
        pl1 = plaquette(pas=0.36, r=0.12).move_to(P(-4.4, -1.85))
        cinq = VGroup(*[comprime(0.12, C_RESTE).move_to(pl1[1][k]) for k in range(5)])
        self.dire_eq(e, "5 est plus petit que 6.", avec=[FadeIn(pl1), FadeIn(cinq, scale=0.5)])
        pl2 = plaquette(pas=0.36, r=0.12).move_to(P(-2.2, -1.85))
        six = VGroup(*[comprime(0.12, CIEL).move_to(a) for a in pl2[1]])
        self.dit(self.lg("Avec 6 comprimés de plus,", 3.2, -0.25, 38), "Avec 6 comprimés de plus,",
                 avec=[FadeIn(pl2), LaggedStart(*[FadeIn(c, scale=0.4) for c in six], lag_ratio=0.12)])
        self.dit(self.lg("Jules remplirait", 3.2, -0.95, 38), "Jules remplirait")
        une = self.lg("une plaquette de plus.", 3.2, -1.65, 40, VERT_OK)
        ok = self.coche(VERT_OK, 0.2).next_to(pl2, UP, buff=0.18)
        self.dit(une, "une plaquette de plus.", avec=[Create(ok)])
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        tas = en_tas(50, -6.0, -1.0, -0.6, 2.3, lambda: comprime(0.1), ecart=0.32, graine=21)
        pl = plaquette(cols=4, pas=0.34, r=0.11).move_to(P(-3.5, -1.75))
        cad = Text("50 comprimés", font_size=30, color=CIEL)
        cad.sans_synchro = True
        cad.next_to(tas, UP, buff=0.25)
        lab = Text("plaquette de 8", font_size=26, color=JAUNE_TITRE)
        lab.sans_synchro = True
        lab.next_to(pl, DOWN, buff=0.2)
        cad._pas_audit = True  # données de la figure : la question les dit juste avant
        lab._pas_audit = True

        def avant(sc):
            sc.eq_dans_q(0, "50 ÷ 8 :", "50 divisé par 8 :", lettres="")
            sc.eq_dans_q(0, "quel est le reste ?", "quel est le reste ?", lettres="")
            sc.play(LaggedStart(*[FadeIn(c, scale=0.4) for c in tas], lag_ratio=0.01), FadeIn(cad), FadeIn(pl), FadeIn(lab), run_time=0.4)

        def apres(sc):
            sc.reponse(("Réponse A : 2.", "Réponse A : 2."),
                       ("8 × 6 = 48, et il reste 2.", "8 fois 6 égale 48, et il reste 2."),
                       ("2 < 8.", "2 est bien plus petit que 8."))

        self.question_pause("04q-question", "04r-reponse", ["50 ÷ 8 :", "quel est le reste ?"],
                            [E("2", 40, lettres=""), E("6", 40, lettres=""), E("10", 40, lettres="")], 0,
                            ["Réponse A : 2.", "8 × 6 = 48, et il reste 2.", "2 < 8."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.dit(self.lg("Le piège : une égalité juste, mais une division fausse.", 0, 3.2, 40, PIEGE, maxw=12.6),
                 "Le piège : une égalité juste, mais une division fausse.")
        e = F("47 = 6 × 6 + 11", 56).move_to(P(-3.0, 2.2))
        e.atomes[-1].set_color(C_RESTE)
        xs = [-5.7, -4.35, -3.0, -1.65]
        pos = [P(xs[k % 4], 1.0 - 1.05 * (k // 4)) for k in range(7)]
        pls = VGroup(*[plaquette().move_to(pos[k]) for k in range(6)])
        pleins = VGroup(*[remplie(p) for p in pls])
        onze = en_tas(11, -6.0, -2.4, -2.95, -1.45, lambda: comprime(0.1, C_RESTE), ecart=0.34, graine=6)
        self.poser_avec(e, "47 égale 6 fois 6, plus 11.", {4: lambda: [FadeIn(pls), FadeIn(pleins)],
                                                           6: lambda: [FadeIn(onze, scale=0.5)]})
        juste = self.lg("Le calcul tombe juste !", 3.2, 1.4, 40, VERT_OK)
        self.dit(juste, "Le calcul tombe juste !")
        m = self.lg("Mais 11 > 6 :", 3.2, 0.6, 48)
        m.atomes[1].set_color(C_RESTE)
        m.atomes[3].set_color(C_DIVISEUR)
        self.dit(m, "Mais 11 est plus grand que 6 :")
        self.insister(m, 1.12, 0.2)
        sept = plaquette(pointilles=True).move_to(pos[6])
        self.dit(self.lg("on peut encore", 3.2, -0.2, 40), "on peut encore")
        self.dit(self.lg("remplir une plaquette.", 3.2, -0.75, 40), "remplir une plaquette.",
                 avec=[FadeIn(sept), *self.remplir(sept, onze[:6])])
        self.dit(self.lg("Ce n'est pas la", 2.9, -1.5, 42, PIEGE), "Ce n'est pas la", avec=[Create(self.barrer(e))])
        self.dit(self.lg("division euclidienne.", 2.9, -2.08, 42, PIEGE), "division euclidienne.")
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.3
        p = jules_pharmacien(0.95).move_to(P(-4.0, 0.3))

        def avant(sc):
            sc.eq_dans_q(0, "Laquelle est la division", "Laquelle est la division", lettres="")
            sc.eq_dans_q(0, "euclidienne de 89 par 7 ?", "euclidienne de 89 par 7 ?", lettres="")
            sc.play(FadeIn(p, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            sc.reponse(("Réponse B : 89 = 7 × 12 + 5,", "Réponse B : 89 égale 7 fois 12, plus 5,"),
                       ("et 5 < 7.", "et 5 est plus petit que 7."))
            # les deux leurres, expliqués à gauche, à la place de Jules
            a1 = sc.lg("Dans A, le reste 12", -3.6, 0.9, 40, PIEGE, maxw=6.4)
            sc.dit(a1, "Dans A, le reste 12", avec=[FadeOut(p)])
            sc.dit(sc.lg("est trop grand.", -3.6, 0.3, 40, PIEGE, maxw=6.4), "est trop grand.")
            sc.dit(sc.lg("Dans C, on enlève :", -3.6, -0.8, 40, PIEGE, maxw=6.4), "Dans C, on enlève :")
            sc.dit(sc.lg("ce n'est pas un reste.", -3.6, -1.4, 40, PIEGE, maxw=6.4), "ce n'est pas un reste.")

        self.question_pause("05q-question", "05r-reponse", ["Laquelle est la division", "euclidienne de 89 par 7 ?"],
                            [E("89 = 7 × 11 + 12", 40, lettres=""), E("89 = 7 × 12 + 5", 40, lettres=""),
                             E("89 = 7 × 13 − 2", 40, lettres="")], 1,
                            ["Réponse B : 89 = 7 × 12 + 5,", "et 5 < 7."], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        p = jules_pharmacien().move_to(P(-5.7, 1.0))
        fl = flacon(154).move_to(P(-3.4, 0.75))
        boite = plaquette(cols=4, lignes=3, pas=0.36, r=0.12).move_to(P(-3.4, -1.55))
        lab = Text("boîte de 12", font_size=26, color=JAUNE_TITRE)
        lab.sans_synchro = True
        lab.next_to(boite, DOWN, buff=0.18)
        self.dit(self.lg("Jules reçoit 154 gélules,", 3.2, 1.6, 38), "Jules reçoit 154 gélules,",
                 avec=[FadeIn(p), FadeIn(fl, shift=UP * 0.2)])
        self.poser_avec(self.lg("à ranger par boîtes de 12.", 3.2, 0.95, 38), "à ranger par boîtes de 12.",
                        {3: lambda: [FadeIn(boite)], 5: lambda: [FadeIn(lab)]}, rt=0.14)
        q1 = self.lg("Écris la division", 3.2, -0.1, 44, JAUNE_TITRE)
        self.dit(q1, "Écris la division")
        q2 = self.lg("euclidienne.", 3.2, -0.8, 48, JAUNE_TITRE)
        self.dit(q2, "euclidienne.")
        self.insister(VGroup(q1, q2), 1.1, 0.2)
        pz = T("Mets pause, et cherche !", 48, ORANGE_RETENUE).move_to(P(2.4, -1.95))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.15))), rt=0.25)
        e1 = F("12 × 12 = 144", 50).mis_sur_egal(-1.9, 2.15)
        self.dire_eq(e1, "12 fois 12 égale 144.", echelle=1.2)
        e2 = F("154 − 144 = 10", 50).mis_sur_egal(-1.9, 1.25)
        self.dire_eq(e2, "154 moins 144 égale 10.", echelle=1.2)
        self.dit(self.lg("Donc", -5.0, -0.05, 56), "Donc")
        d = self.lg("154 = 12 × 12 + 10 :", 0.9, -0.05, 60, maxw=10)
        for i, c in zip((0, 2, 4, 6), (C_DIVIDENDE, C_DIVISEUR, C_QUOTIENT, C_RESTE)):
            d.atomes[i].set_color(c)
        self.dit(d, "154 égale 12 fois 12, plus 10 :")
        self.play(Create(self.cadre_ok(VGroup(*d.atomes[:7]), 0.16)), run_time=0.25)
        boites = VGroup(*[plaquette(cols=4, lignes=3, pas=0.13, r=0.045) for _ in range(12)])
        boites.arrange_in_grid(rows=3, cols=4, buff=0.14)
        pleins = VGroup(*[remplie(b, r=0.045, c="#fca5a5") for b in boites])
        dix = VGroup(*[gelule(0.3) for _ in range(10)]).arrange_in_grid(rows=5, cols=2, buff=0.12)
        fig = VGroup(VGroup(boites, pleins), dix).arrange(RIGHT, buff=0.4).move_to(P(3.5, 1.75))
        for p, q in zip(pleins, boites):
            for c, a in zip(p, q[1]):
                c.move_to(a)
        l2 = self.lg("12 boîtes pleines, et il reste 10 gélules.", 0, -1.2, 40, maxw=11)
        self.poser_avec(l2, "12 boîtes pleines, et il reste 10 gélules.",
                        {1: lambda: [FadeIn(boites), FadeIn(pleins)], 8: lambda: [FadeIn(dix, scale=0.5)]}, rt=0.14)
        fin = F("10 < 12.", 60).move_to(P(0, -2.3))
        fin.atomes[0].set_color(C_RESTE)
        fin.atomes[2].set_color(C_DIVISEUR)
        self.dire_eq(fin, "10 est bien plus petit que 12.")
        self.play(Create(self.cadre_ok(fin, 0.16)), run_time=0.2)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        self.XL = -5.6
        e1 = colorer_reste(F("47 = 6 × 7 + 5", 46).sans_audit())
        e2 = F("5 < 6", 46).sans_audit()
        e2.atomes[0].set_color(C_RESTE)
        e2.atomes[2].set_color(C_DIVISEUR)
        fig = VGroup(e1, e2).arrange(RIGHT, buff=1.4).move_to(P(-0.6, -2.45))
        lignes = self.finale_colonne([["dividende = diviseur × quotient + reste"],
                                      ["Et le reste est toujours", "plus petit que le diviseur."],
                                      ["Les deux conditions comptent."]], fs=42)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        # chaque morceau sur SES mots (la pose par lots confondait « le diviseur » des deux phrases)
        reperes = [["dividende"], ["Et le reste", "plus petit"], ["Les deux"]]
        for lg, mots in zip(lignes, reperes):
            for k, (m, mot) in enumerate(zip(lg[1], mots)):
                self.au(mot, *([Create(lg[0])] if k == 0 else []), FadeIn(m, shift=RIGHT * 0.2), rt=0.35)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_remplir()
        self.ecran_ecrire()
        self.ecran_condition()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


def colorer_reste(e):
    """« 47 = 6 × 7 + 5 » : dividende, diviseur, quotient et reste dans leurs couleurs."""
    for i, c in zip((0, 2, 4, 6), (C_DIVIDENDE, C_DIVISEUR, C_QUOTIENT, C_RESTE)):
        e.atomes[i].set_color(c)
    return e
