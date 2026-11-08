# puissance_simple_notation.py
# EleveAI — Maths 5e — série « Carré et cube », épisode 01 : LA NOTATION (5², 3³).
# Paysage 16:9, AVEC VOIX, ceinture BLANCHE. Micro : puissance_simple_notation
# (notion puissance_simple, programme de cycle 4 en vigueur en 5e depuis 2026 :
# carré et cube seulement, aucun exposant au-delà de 3).
# Décor et métier : Lucas, créateur de jeux vidéo (le héros en pixels, le coffre en
# blocs). Centres : jeux-video, jeux-defis.
# Micro → écrans : garde (00) ; la grille 5 × 5 (01) ; 5² (02) ; le coffre 3³ (03) ;
# QUESTION 1 (03q) ; l'exposant compte les facteurs (04) ; le piège 5² ≠ 5 × 2 (05) ;
# QUESTION 2 (05q) ; défi (06) et correction (06b) ; ce que tu as appris (07) ; fin (08).
# Code couleur de la série : BLEU = le nombre (la base), ORANGE = l'exposant,
# VERT = résultat juste, ROUGE = le piège.
# Exposants : PE("5²") remplace le petit glyphe ² par un vrai chiffre orange relevé ;
# il entre sur le mot « carré » (« cube » pour ³), jamais avant.
# Voix : manim/voix/5e-puissance-notation.json ; marques : puissance_simple_notation_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/puissance_simple_notation.py PuissanceSimpleNotation5e --media_dir manim/scripts/5e/media-ps-01-dry
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/puissance_simple_notation.py PuissanceSimpleNotation5e -o eleveai-maths-5e-puissance-notation --media_dir manim/scripts/5e/media-ps-01
# Sortie : manim/sorties/5e/maths/puissance-simple/01-notation/eleveai-maths-5e-puissance-notation.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))

from relatif_commun import *  # noqa: E402,F403
from relatif_commun import PAROLE  # noqa: E402

# l'exposant se dit « au carré » / « au cube » : c'est sur CE mot qu'il entre
PAROLE["²"] = "carré"
PAROLE["³"] = "cube"

BASE_C = BLEU_CALCUL       # le nombre (la base)
EXPO_C = ORANGE_RETENUE    # l'exposant
PIEGE = ROUGE_ERREUR       # 5 × 2 au lieu de 5 × 5
BOIS = "#c2853d"           # les blocs du coffre
CIEL_P = "#7dd3fc"
EXPOS = {"²": "2", "³": "3"}

# le héros de Lucas, pixel par pixel (5 × 5)
HEROS = ["CHHHC", "CKSKC", "BBBBB", "CBBBC", "CDCDC"]
TEINTES = {"C": CIEL_P, "H": "#92400e", "K": "#1e293b", "S": "#f1c27d", "B": "#2563eb", "D": "#57534e"}


JAMBAGES = set("gjpqyçQ,;()/[]")


def ligne_de_base(e):
    """La ligne de base d'une ligne PE : le bas médian de ses mots SANS jambage (None s'il n'y en a pas)."""
    bas = [a.get_bottom()[1] for a in e.atomes
           if a.original_text not in EXPOS and not (set(a.original_text) & JAMBAGES)
           and any(ch.isalnum() for ch in a.original_text)]
    return float(np.median(bas)) if bas else None


def PE(s, fs=60, c=WHITE, lettres="", audit=True, base_c=BASE_C):
    """Une ligne (Eq) dont les exposants ² ³ deviennent un VRAI chiffre orange relevé,
    à 0,6 de la taille : .expos ; l'atome garde « ² » pour entrer au mot « carré »."""
    e = E(s, fs, c, lettres=lettres, audit=audit)
    h = Text("5", font_size=fs).height
    e.expos = VGroup()
    for i, a in enumerate(list(e.atomes)):
        if a.original_text not in EXPOS:
            continue
        b = e.atomes[i - 1]
        if base_c:
            b.set_color(base_c)
        n = T(EXPOS[a.original_text], fs * 0.6, EXPO_C, audit=False)
        n.original_text = a.original_text
        n.next_to(b, RIGHT, buff=0.015 + fs * 0.0006)
        n.shift(UP * (b.get_bottom()[1] + 0.5 * h - n.get_bottom()[1]))
        dx = n.get_right()[0] - a.get_right()[0] + fs * 0.0008
        for x in e.atomes[i + 1:]:
            x.shift(RIGHT * dx)
        e.remove(a)
        e.add(n)
        e.atomes[i] = n
        e.expos.add(n)
    return e


def teinter(e, couleurs):
    """Colore les atomes d'une ligne selon leur texte."""
    for a in e.atomes:
        if a.original_text in couleurs:
            a.set_color(couleurs[a.original_text])
    return e


def facteurs_de(e, v):
    """Les atomes « v » d'une ligne (les facteurs à compter)."""
    return [a for a in e.atomes if a.original_text == v]


def compteurs(atomes, couleur=EXPO_C, fs=28, buff=0.12):
    """1, 2, 3 au-dessus des facteurs (on compte les facteurs)."""
    return VGroup(*[T(str(k + 1), fs, couleur, audit=False).next_to(a, UP, buff=buff) for k, a in enumerate(atomes)])


# ── les dessins ────────────────────────────────────────────────────────────

def manette(s=1.0):
    """Une manette de jeu : le corps, la croix, deux boutons."""
    corps = RoundedRectangle(width=1.0, height=0.5, corner_radius=0.22, fill_color="#334155", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=2)
    croix = VGroup(Rectangle(width=0.22, height=0.07, fill_color=WHITE, fill_opacity=1, stroke_width=0),
                   Rectangle(width=0.07, height=0.22, fill_color=WHITE, fill_opacity=1, stroke_width=0)).move_to(P(-0.24, 0))
    b1 = Circle(radius=0.055, fill_color="#22c55e", fill_opacity=1, stroke_width=0).move_to(P(0.2, 0.07))
    b2 = Circle(radius=0.055, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(P(0.31, -0.06))
    return VGroup(corps, croix, b1, b2).scale(s)


def lucas(s=0.62):
    """Lucas, créateur de jeux vidéo : sweat violet, casque audio, la manette en main."""
    p = personne(peau="#e0ac69", tenue="#7c3aed", cheveux="#1f2937", longs=False, s=s)
    p.add(casque_audio(p))
    m = manette(0.95 * s).move_to(p.corps.get_center() + UP * 0.05 * s)
    return VGroup(p, m)


def grille(n, cote=0.5, centre=ORIGIN, contour="#94a3b8"):
    """Une grille de n × n pixels vides : .cases[r][c], .cadre."""
    cases = VGroup()
    for _ in range(n):
        cases.add(VGroup(*[Square(cote, stroke_color=contour, stroke_width=2, fill_color="#1e293b", fill_opacity=1)
                           for _ in range(n)]).arrange(RIGHT, buff=0))
    cases.arrange(DOWN, buff=0).move_to(centre)
    cadre = RoundedRectangle(width=cases.width + 0.24, height=cases.height + 0.24, corner_radius=0.16,
                             stroke_color=WHITE, stroke_width=4).move_to(centre)
    g = VGroup(cadre, cases)
    g.cases, g.cadre = cases, cadre
    return g


def peindre_heros(g):
    """Les animations qui colorient la grille 5 × 5 en héros, rangée par rangée."""
    return [[c.animate.set_fill(TEINTES[HEROS[r][k]], 1) for k, c in enumerate(g.cases[r])] for r in range(5)]


def petit_cube(s=0.5, couleur=BOIS, dx=0.42, dy=0.3):
    """Un petit bloc en perspective cavalière (face, dessus, côté)."""
    face = Square(s, fill_color=couleur, fill_opacity=1, stroke_color="#1c1917", stroke_width=2)
    a, b = face.get_corner(UL), face.get_corner(UR)
    c = face.get_corner(DR)
    d = P(dx * s, dy * s)
    dessus = Polygon(a, b, b + d, a + d, fill_color=interpolate_color(ManimColor(couleur), WHITE, 0.35),
                     fill_opacity=1, stroke_color="#1c1917", stroke_width=2)
    cote_ = Polygon(b, c, c + d, b + d, fill_color=interpolate_color(ManimColor(couleur), BLACK, 0.3),
                    fill_opacity=1, stroke_color="#1c1917", stroke_width=2)
    return VGroup(face, dessus, cote_)


def cube_empile(n=3, s=0.62, origine=ORIGIN, couleur=BOIS, dx=0.42, dy=0.3):
    """Les n³ blocs, rangés [(i, couche j, profondeur k)], dans l'ordre de peinture."""
    cubes = {}
    for j in range(n):
        for k in range(n):
            for i in range(n):
                c = petit_cube(s, couleur, dx, dy)
                c.move_to(origine + P(i * s + k * dx * s, j * s + k * dy * s))
                c.set_z_index(j * 100 - k * 10 + i)
                cubes[(i, j, k)] = c
    return cubes


def fantome(cubes):
    return VGroup(*[c.copy().set_opacity(0.13).set_z_index(c.z_index - 10000) for c in cubes.values()])


class PuissanceSimpleNotation5e(PaysageRel):
    nom_voix = "5e-puissance-notation"
    fichier_marques = "puissance_simple_notation_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "blanche"

    # ── outils ──────────────────────────────────────────────────────────────
    def L(self, s, xl, y, fs=36, c=WHITE, lettres="", maxw=None, base_c=None):
        """Une ligne de la colonne, alignée à gauche en xl, jamais au bord ni sur Ti Margo."""
        e = PE(s, fs, c, lettres=lettres, base_c=base_c)
        h0 = e.height
        if maxw is None:
            maxw = (6.45 if y > -1.7 else 5.15) - xl
        if e.width > maxw:
            e.scale_to_fit_width(maxw)
        e.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        # Interlignes réguliers : la ligne est posée sur sa LIGNE DE BASE, pas sur le centre de sa
        # boîte (une ligne sans jambage, p g j…, tombait plus bas qu'une ligne qui en a).
        b = ligne_de_base(e)
        if b is not None:
            ref = Text("Hp", font_size=fs)
            k = (ref.get_center()[1] - ref[0].get_bottom()[1]) * e.height / h0
            e.shift(UP * ((y - k) - b))
        return e

    def ph_eq(self, i, s, phrase, n=1, lettres="", couleur=None, premier=False, avec=()):
        """La réponse d'une question-pause, exposants compris (PE)."""
        ref = self.ph_q[i]
        e = PE(s, 30, couleur or VERT_OK, lettres=lettres, base_c=None)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        self.dire_eq(e, phrase, n=n, echelle=1.0, rt=0.16, sauf=sauf, avec=avec)
        return e

    def q_ligne(self, i, s, phrase, n=1):
        """Dans avant_q : la ligne i de la question, exposants compris, au mot."""
        ref = self.q_q[i]
        e = PE(s, 34, lettres="")
        e.scale_to_fit_height(ref.height).move_to(ref)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n, echelle=1.0)
        return e

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le carré et le cube", self.identite, self.ceinture, y_ech=-2.7)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Le carré", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.2)
        g = grille(3, 0.42, P(-4.7, 0.3))
        for r in range(3):
            for c in g.cases[r]:
                c.set_fill(BASE_C, 0.85)
        cubes = cube_empile(2, 0.5, P(-2.75, -0.15))
        bloc = VGroup(*cubes.values())
        self.au("carré et", FadeIn(g, scale=0.6), rt=0.3)
        self.au("cube.", LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in cubes.values()], lag_ratio=0.12), rt=0.6)
        l1 = self.L("Comment écrire vite", -0.3, 1.25, 46, CIEL)
        self.dit(l1, "Comment écrire vite")
        l1b = self.L("un nombre multiplié", -0.3, 0.45, 44, CIEL)
        self.dit(l1b, "un nombre multiplié")
        l2 = self.L("par lui-même ?", -0.3, -0.35, 50, JAUNE_TITRE, maxw=5.6)
        self.dit(l2, "par lui-même ?")
        self.play(Indicate(g, color=EXPO_C, scale_factor=1.08), Indicate(bloc, color=EXPO_C, scale_factor=1.08),
                  run_time=0.6)
        self.insister(l2, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Lucas et la grille 5 × 5 ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = lucas(0.62).move_to(P(-5.55, -1.35))
        g = grille(5, 0.52, P(-2.55, -0.3))
        haut = T("5 pixels", 32, BASE_C).next_to(g.cadre, UP, buff=0.15)
        gauche = T("5 pixels", 32, BASE_C).rotate(PI / 2).next_to(g.cadre, LEFT, buff=0.15)
        xl = -0.4
        self.dit(self.L("Lucas est créateur", xl, 2.95, 42, CIEL), "Lucas est créateur", avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.L("de jeux vidéo.", xl, 2.35, 42, CIEL), "de jeux vidéo.")
        self.dit(self.L("Il dessine un héros", xl, 1.4, 38), "Il dessine un héros")
        l3 = self.L("en pixels, sur une grille", xl, 0.8, 38)
        i_grille = next(i for i, a in enumerate(l3.atomes) if a.original_text == "grille")
        self.poser_avec(l3, "en pixels, sur une grille", {i_grille: lambda: [FadeIn(g, scale=0.85)]}, rt=0.14)
        l3b = teinter(self.L("de 5 pixels de large", xl, 0.2, 38), {"5": BASE_C})
        self.poser_avec(l3b, "de 5 pixels de large", {1: lambda: [FadeIn(haut, shift=DOWN * 0.15)]}, rt=0.14)
        l4 = teinter(self.L("et 5 pixels de haut.", xl, -0.4, 38), {"5": BASE_C})
        self.poser_avec(l4, "et 5 pixels de haut.", {1: lambda: [FadeIn(gauche, shift=RIGHT * 0.15)]}, rt=0.14)
        q = self.L("Combien de pixels", xl, -1.35, 46, JAUNE_TITRE, maxw=5.3)
        qb = self.L("en tout ?", xl, -2.1, 46, JAUNE_TITRE, maxw=5.0)
        point = T("?", 110, EXPO_C).move_to(g.cases)
        self.dit(q, "Combien de pixels", avec=[FadeIn(point, scale=1.5)])
        self.dit(qb, "en tout ?")
        self.insister(VGroup(q, qb), 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : 5 × 5 = 25, on écrit 5² ────────────────────────────────────────
    def ecran_carre(self):
        self.ecran("02-carre")
        g = grille(5, 0.52, P(-2.55, -0.3))
        haut = T("5 pixels", 32, BASE_C, audit=False).next_to(g.cadre, UP, buff=0.15)
        gauche = T("5 pixels", 32, BASE_C, audit=False).rotate(PI / 2).next_to(g.cadre, LEFT, buff=0.15)
        p = lucas(0.62).move_to(P(-5.55, -1.35))
        self.add(g, haut, gauche, p)
        nums = VGroup(*[T(str(r + 1), 26, BASE_C, audit=False).next_to(g.cases[r], RIGHT, buff=0.22) for r in range(5)])
        peint = peindre_heros(g)
        xl = -0.3
        r1 = self.L("5 rangées de 5 pixels :", xl, 2.95, 40, base_c=None)
        teinter(r1, {"5": BASE_C})
        rangee = lambda r: (lambda: [LaggedStart(*peint[r], lag_ratio=0.12), FadeIn(nums[r])])  # noqa: E731
        self.poser_avec(r1, "5 rangées de 5 pixels :", {k: rangee(k) for k in range(5)}, rt=0.3)
        e = teinter(self.L("5 × 5 = 25", xl, 2.1, 60), {"5": BASE_C, "25": VERT_OK})
        self.dire_eq(e, "5 fois 5, 25", echelle=1.25)
        self.play(Indicate(g.cases, color=VERT_OK, scale_factor=1.04), run_time=0.45)
        m1 = self.L("Un nombre multiplié", xl, 1.05, 38, CIEL)
        self.dit(m1, "Un nombre multiplié")
        m2 = self.L("par lui-même : on écrit", xl, 0.45, 38, CIEL)
        self.dit(m2, "par lui-même : on écrit")
        p5 = PE("5²", 140).move_to(P(2.0, -1.05))
        self.au("5, avec", FadeIn(p5.atomes[0], scale=1.3), rt=0.3)
        self.au("2 en haut", FadeIn(p5.expos, scale=1.7), rt=0.3)
        self.insister(p5.expos, 1.45, 0.2, about=p5.expos.get_center())
        lit = self.L("On lit 5 au carré.", xl, -2.65, 40)
        teinter(lit, {"5": BASE_C, "carré": EXPO_C})
        lit.move_to(P(2.0, -2.65))
        cad = SurroundingRectangle(g.cases, color=EXPO_C, buff=0.04, stroke_width=6)
        self.poser_avec(lit, "On lit 5 au carré.", {4: lambda: [Create(cad)]}, rt=0.14)
        self.play(Indicate(cad, color=EXPO_C, scale_factor=1.03), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 03 : le coffre en blocs, 3³ ─────────────────────────────────────────
    def ecran_cube(self):
        self.ecran("03-cube")
        s, dx, dy = 0.78, 0.42, 0.3
        o = P(-5.2, -2.25)
        cubes = cube_empile(3, s, o, BOIS, dx, dy)
        fant = fantome(cubes)
        p = lucas(0.42).move_to(P(-5.75, 2.35))
        xl = 0.55
        self.dit(self.L("Dans son jeu, Lucas construit", -1.6, 3.0, 40, CIEL), "Dans son jeu, Lucas construit",
                 avec=[FadeIn(p, shift=UP * 0.2)])
        self.dit(self.L("aussi un coffre en blocs :", -1.6, 2.35, 40, CIEL), "aussi un coffre en blocs :", avec=[FadeIn(fant)])
        # les trois arêtes : long, large, haut
        l_long = T("3", 40, BASE_C).move_to(o + P(s, -s / 2 - 0.36))
        l_larg = T("3", 40, BASE_C).move_to(o + P(2.5 * s, -s / 2) + 1.5 * P(dx * s, dy * s) + P(0.36, -0.1))
        l_haut = T("3", 40, BASE_C).move_to(o + P(-s / 2 - 0.36, s))
        self.au("3 blocs de long", FadeIn(l_long, scale=1.4), Indicate(VGroup(*[fant[i] for i in range(3)]), color=BASE_C), rt=0.4)
        self.au("3 de large", FadeIn(l_larg, scale=1.4), rt=0.35)
        self.au("3 de haut", FadeIn(l_haut, scale=1.4), rt=0.35)
        rang = [cubes[(i, 0, 0)] for i in range(3)]
        couche = [cubes[(i, 0, k)] for k in (1, 2) for i in range(3)]
        dessus = [cubes[(i, j, k)] for j in (1, 2) for k in range(3) for i in range(3)]
        e = teinter(self.L("3 × 3 × 3 = 27", xl, 1.35, 60), {"3": BASE_C, "27": VERT_OK})
        self.poser_avec(e, "3 fois 3 fois 3 : 27", {
            0: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in rang], lag_ratio=0.25)],
            2: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in couche], lag_ratio=0.1)],
            4: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in dessus], lag_ratio=0.04)]}, rt=0.3)
        n27 = T("27 blocs", 36, VERT_OK).move_to(P(-3.5, 1.1))
        self.au("27 blocs", FadeIn(n27, scale=1.2), Indicate(VGroup(*cubes.values()), color=VERT_OK, scale_factor=1.03), rt=0.5)
        p3 = PE("3³", 140).move_to(P(2.35, -0.95))
        self.au("3, avec", FadeIn(p3.atomes[0], scale=1.3), rt=0.3)
        self.au("3 en haut", FadeIn(p3.expos, scale=1.7), rt=0.3)
        self.insister(p3.expos, 1.45, 0.2, about=p3.expos.get_center())
        lit = teinter(self.L("On lit 3 au cube.", xl, -2.65, 40), {"3": BASE_C, "cube": EXPO_C})
        lit.move_to(P(2.35, -2.65))
        self.dit(lit, "On lit 3 au cube.")
        self.play(Indicate(VGroup(*cubes.values()), color=EXPO_C, scale_factor=1.04), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -1.9
        g = grille(7, 0.34, P(-4.45, -0.55))
        for r in range(7):
            for c in g.cases[r]:
                c.set_fill(CIEL_P, 0.55)
        t7 = T("7", 34, BASE_C).next_to(g.cadre, UP, buff=0.14)
        g7 = T("7", 34, BASE_C).next_to(g.cadre, LEFT, buff=0.14)

        def avant(sc):
            ref = sc.q_q[0]
            e = E("Comment écrire 7 × 7 ?", 34, lettres="")
            e.scale_to_fit_height(ref.height).move_to(ref)
            sc.q_q.remove(ref)
            sc.poser_avec(e, "Comment écrire 7 fois 7 ?", {2: lambda: [FadeIn(g), FadeIn(t7)], 4: lambda: [FadeIn(g7)]})

        def apres(sc):
            sc.ph_eq(0, "Réponse A : 7².", "Réponse A : 7 au carré.", premier=True)
            sc.ph_eq(1, "Le 7 est multiplié par lui-même.", "Le 7 est multiplié par lui-même.",
                     avec=[Indicate(g.cases, color=VERT_OK, scale_factor=1.04)])
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Comment écrire 7 × 7 ?"],
                            [PE("7²", 40), PE("7 × 2", 40), PE("2²", 40)], 0,
                            ["Réponse A : 7².", "Le 7 est multiplié par lui-même."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : l'exposant compte les facteurs ─────────────────────────────────
    def ecran_exposant(self):
        self.ecran("04-exposant")
        cx = -3.45
        a = PE("5² = 5 × 5", 64, audit=False).move_to(P(cx, 2.15))
        teinter(a, {"5": BASE_C})
        self.play(FadeIn(a), run_time=0.3)
        xl = 0.2
        self.dit(self.L("Le petit nombre en haut", xl, 2.95, 38), "Le petit nombre en haut",
                 avec=[Indicate(a.expos, color=EXPO_C, scale_factor=1.6)])
        l2 = teinter(self.L("s'appelle l'exposant.", xl, 2.35, 38), {"exposant": EXPO_C})
        self.dit(l2, "s'appelle l'exposant.")
        nom = T("l'exposant", 30, EXPO_C, audit=False).next_to(a.expos, UP, buff=0.3)
        fl = Arrow(nom.get_bottom(), a.expos.get_top(), buff=0.04, color=EXPO_C, stroke_width=4,
                   max_tip_length_to_length_ratio=0.3)
        self.play(FadeIn(nom, shift=DOWN * 0.1), GrowArrow(fl), run_time=0.4)
        self.insister(a.expos, 1.5, 0.2, about=a.expos.get_center())
        self.dit(self.L("Il compte combien de fois", xl, 1.3, 38), "Il compte combien de fois")
        f5 = facteurs_de(a, "5")[1:]
        c5 = compteurs(f5)
        self.dit(self.L("le nombre est écrit", xl, 0.7, 38), "le nombre est écrit",
                 avec=[LaggedStart(*[FadeIn(c, scale=1.6) for c in c5], lag_ratio=0.4)])
        self.dit(self.L("dans le produit.", xl, 0.1, 38), "dans le produit.")
        r2 = teinter(self.L("Exposant 2 : au carré,", -6.1, 1.2, 38, maxw=6.2), {"2": EXPO_C, "carré": EXPO_C})
        self.dit(r2, "Exposant 2 : au carré,", avec=[Indicate(a.expos, color=EXPO_C, scale_factor=1.6)])
        r2b = teinter(self.L("deux fois.", -6.1, 0.6, 38, maxw=6.2), {"deux": EXPO_C})
        self.dit(r2b, "deux fois.")
        self.play(Indicate(c5, color=EXPO_C, scale_factor=1.5), run_time=0.5)
        b = PE("3³ = 3 × 3 × 3", 56, audit=False).move_to(P(cx, -0.75))
        teinter(b, {"3": BASE_C})
        b.expos.set_color(EXPO_C)
        r3 = teinter(self.L("Exposant 3 : au cube,", -6.1, -1.65, 38, maxw=6.2), {"3": EXPO_C, "cube": EXPO_C})
        self.poser_avec(r3, "Exposant 3 : au cube,", {1: lambda: [FadeIn(b, shift=UP * 0.2)]}, rt=0.14)
        r3b = teinter(self.L("trois fois.", -6.1, -2.25, 38, maxw=6.2), {"trois": EXPO_C})
        self.dit(r3b, "trois fois.")
        c3 = compteurs(facteurs_de(b, "3")[1:])
        self.play(LaggedStart(*[FadeIn(c, scale=1.6) for c in c3], lag_ratio=0.35), run_time=0.7)
        self.attendre_voix(marge=0.8)

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        xl = -1.5
        t = self.L("Le piège : 5² ≠ 5 × 2", xl, 2.95, 50, base_c=BASE_C)
        t.atomes[0].set_color(PIEGE)
        t.atomes[1].set_color(PIEGE)
        t.atomes[2].set_color(PIEGE)
        for a in t.atomes[5:]:
            a.set_color(PIEGE)
        rouge = VGroup(*[Square(0.42, fill_color=PIEGE, fill_opacity=0.85, stroke_color=WHITE, stroke_width=1.5)
                         for _ in range(10)]).arrange_in_grid(rows=2, cols=5, buff=0.06).move_to(P(-3.6, 1.85))
        vert = grille(5, 0.42, P(-3.6, -1.15))
        self.dire_eq(t, "Le piège : 5 au carré, ce n'est pas 5 fois 2", echelle=1.2)
        e1 = teinter(self.L("5 × 2 = 10", xl, 1.85, 52), {"5": PIEGE, "×": PIEGE, "2": PIEGE, "=": PIEGE, "10": PIEGE})
        self.poser_avec(e1, "5 fois 2, c'est 10", {0: lambda: [LaggedStart(*[FadeIn(c, scale=0.5) for c in rouge], lag_ratio=0.06)]})
        e2 = teinter(self.L("5² = 5 × 5 = 25", xl, 0.75, 52, base_c=BASE_C), {"5": BASE_C, "25": VERT_OK})
        peint = [c.animate.set_fill(VERT_OK, 0.8) for row in vert.cases for c in row]
        self.poser_avec(e2, "5 au carré, c'est 5 fois 5 : 25",
                        {0: lambda: [FadeIn(vert)], 5: lambda: [LaggedStart(*peint, lag_ratio=0.02)]})
        cad = self.cadre_ok(e2, 0.16)
        self.play(Create(cad), run_time=0.3)
        self.dit(self.L("Avec une lettre, pareil :", xl, -0.45, 38, CIEL), "Avec une lettre, pareil :")
        e3 = self.L("x² = x × x", xl, -1.3, 52, lettres="x", base_c=BASE_C)
        self.dire_eq(e3, "x au carré, c'est x fois x", echelle=1.2)
        e4 = self.L("pas x + x", xl, -2.25, 52, lettres="x")
        for a in e4.atomes:
            a.set_color(PIEGE)
        self.dire_eq(e4, "pas x plus x", echelle=1.2)
        self.insister(e3, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -1.9
        s = 0.48
        cubes = cube_empile(4, s, P(-5.6, -2.0), CIEL_P)
        fant = fantome(cubes)
        for c in fant:
            c.set_opacity(0.3)

        def avant(sc):
            ref = sc.q_q[0]
            e = PE("Quel produit est égal à 4³ ?", 34, lettres="")
            e.scale_to_fit_height(ref.height).move_to(ref)
            sc.q_q.remove(ref)
            sc.poser_avec(e, "Quel produit est égal à 4 au cube ?", {5: lambda: [FadeIn(fant)]})

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 4 × 4 × 4.", "Réponse B : 4 fois 4 fois 4.", premier=True)
            corps = sc.cartes_q[1][1][1]
            c3 = compteurs(facteurs_de(corps, "4"), fs=20, buff=0.03)
            sc.ph_eq(1, "Avec l'exposant 3,", "Avec l'exposant 3,")
            sc.ph_eq(2, "le 4 est écrit trois fois.", "le 4 est écrit trois fois.")
            sc.play(LaggedStart(*[FadeIn(c, scale=1.6) for c in c3], lag_ratio=0.35), run_time=0.7)
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Quel produit est égal à 4³ ?"],
                            [E("4 × 3", 40, lettres=""), E("4 × 4 × 4", 40, lettres=""),
                             E("3 × 3 × 3 × 3", 40, lettres="")], 1,
                            ["Réponse B : 4 × 4 × 4.", "Avec l'exposant 3,", "le 4 est écrit trois fois."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    def _disposer_q(self, question, choix, phrase):
        r = super()._disposer_q(question, choix, phrase)
        self.cartes_q = r[2]
        return r

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au("À toi", Write(tit), rt=0.5)
        p = lucas(0.5).move_to(P(-5.75, 0.9))
        g = grille(6, 0.34, P(-3.3, 1.0))
        cubes = cube_empile(2, 0.62, P(-3.75, -2.3))
        fant = fantome(cubes)
        for c in fant:
            c.set_opacity(0.3)
        xl = -1.6
        q1 = teinter(self.L("Écris 6 × 6 avec un exposant.", xl, 1.75, 40), {"6": BASE_C, "exposant": EXPO_C})
        self.poser_avec(q1, "Écris 6 fois 6 avec un exposant.", {1: lambda: [FadeIn(p), FadeIn(g, scale=0.8)]})
        q2 = self.L("Puis écris 2³", xl, 0.8, 40, base_c=BASE_C)
        self.poser_avec(q2, "Puis écris 2 au cube", {3: lambda: [FadeIn(fant)]})
        self.dit(self.L("sous forme de produit,", xl, 0.15, 40), "sous forme de produit,")
        self.dit(self.L("et calcule-le.", xl, -0.5, 40), "et calcule-le.")
        pz = T("Mets pause, et cherche !", 40, ORANGE_RETENUE)
        if pz.width > 5.6:
            pz.scale_to_fit_width(5.6)
        pz.move_to(P(0, -1.6)).align_to(P(xl, 0), LEFT)
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.2))), rt=0.25)
        g = grille(6, 0.34, P(-4.4, 1.05))
        peint = [c.animate.set_fill(VERT_OK, 0.8) for row in g.cases for c in row]
        xl = -1.2
        e1 = teinter(self.L("6 × 6 = 6² = 36", xl, 1.6, 58, base_c=BASE_C), {"6": BASE_C, "36": VERT_OK})
        self.poser_avec(e1, "6 fois 6, c'est 6 au carré : 36",
                        {0: lambda: [FadeIn(g)], 7: lambda: [LaggedStart(*peint, lag_ratio=0.02)]})
        self.play(Create(self.cadre_ok(e1, 0.16)), run_time=0.3)
        cubes = cube_empile(2, 0.62, P(-5.0, -2.35))
        fant = fantome(cubes)
        bas = [cubes[(i, 0, 0)] for i in range(2)]
        fond = [cubes[(i, 0, 1)] for i in range(2)]
        haut = [cubes[(i, 1, k)] for k in range(2) for i in range(2)]
        e2 = teinter(self.L("2³ = 2 × 2 × 2 = 8", xl, -0.3, 58, base_c=BASE_C), {"2": BASE_C, "8": VERT_OK})
        for a in e2.expos:
            a.set_color(EXPO_C)
        self.poser_avec(e2, "2 au cube, c'est 2 fois 2 fois 2 : 8", {
            0: lambda: [FadeIn(fant)],
            3: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in bas], lag_ratio=0.3)],
            5: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in fond], lag_ratio=0.3)],
            7: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in haut], lag_ratio=0.15)]})
        self.play(Create(self.cadre_ok(e2, 0.16)), run_time=0.3)
        pas = T("Pas 6 !", 56, PIEGE).move_to(P(0, -1.75)).align_to(P(xl, 0), LEFT)
        self.au("6 !", FadeIn(pas, scale=1.4), rt=0.3)
        self.insister(pas, 1.2, 0.2)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        self.XL = -0.9
        a = teinter(PE("5² = 5 × 5", 46, audit=False), {"5": BASE_C})
        b = teinter(PE("3³ = 3 × 3 × 3", 46, audit=False), {"3": BASE_C})
        b.expos.set_color(EXPO_C)
        g = grille(5, 0.3)
        for r in range(5):
            for k, c in enumerate(g.cases[r]):
                c.set_fill(TEINTES[HEROS[r][k]], 1)
        fig = VGroup(g, a, b).arrange(DOWN, buff=0.4)
        lignes = self.finale_colonne([["Un nombre au carré, c'est", "ce nombre fois lui-même."],
                                      ["Au cube, le même nombre", "est écrit trois fois", "dans le produit."],
                                      ["L'exposant compte les facteurs :", "il ne multiplie pas."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_carre()
        self.ecran_cube()
        self.ecran_question1()
        self.ecran_exposant()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
