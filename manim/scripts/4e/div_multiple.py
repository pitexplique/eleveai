# div_multiple.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers », épisode 01 : MULTIPLE ET DIVISEUR.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : div_multiple_diviseur (dire la relation dans
# les deux sens, tester par le reste de la division).
# Décor et métier : Awa, chorégraphe. Centres : musique, art-design.
# Écrans : garde (00) ; les 42 danseurs (01) ; les rangs de 6 (02) ; les deux mots (03) ;
# QUESTION 1 (03q) ; ça ne tombe pas juste (04) ; le test du reste (05) ; le piège (06) ;
# QUESTION 2 (06q) ; défi (07) et correction (07b) ; ce que tu as appris (08) ; fin (09).
# Code couleur : le petit nombre (le diviseur) jaune, le grand (le multiple) bleu ciel.
# Voix : manim/voix/4e-div-multiple.json ; marques : div_multiple_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/div_multiple.py DivMultiple4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/div_multiple.py DivMultiple4e -o eleveai-maths-4e-div-multiple --media_dir manim/scripts/4e/media-div-01
# Sortie : manim/sorties/4e/maths/divisibilite/01-multiple/eleveai-maths-4e-div-multiple.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from div_commun import *  # noqa: E402,F403

TENUE = "#c084fc"      # les danseurs
EN_PLUS = ORANGE_RETENUE  # les danseurs qui ne tombent pas juste
PEAUX_DANSE = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#5c3a21"]
SCENE = "#292524"


def awa_choregraphe(s=0.72):
    """Awa : la tenue de danse violette et le bandeau rose."""
    p = personne(peau="#5c3a21", tenue="#9333ea", cheveux="#111827", longs=True, s=s)
    bandeau = Rectangle(width=0.86 * s, height=0.1 * s, fill_color=ROSE, fill_opacity=1, stroke_width=0)
    bandeau.move_to(p.tete.get_center() + UP * 0.16 * s)
    return VGroup(p, bandeau)


def danseur(r=0.13, c=TENUE, k=0):
    """Un danseur vu de face : la tête et le corps."""
    tete = Circle(radius=r * 0.42, fill_color=PEAUX_DANSE[k % 5], fill_opacity=1, stroke_width=0)
    corps = Polygon(P(-0.62 * r, -1.25 * r), P(0.62 * r, -1.25 * r), P(0.3 * r, -0.05 * r), P(-0.3 * r, -0.05 * r),
                    fill_color=c, fill_opacity=1, stroke_width=0)
    tete.move_to(P(0, 0.42 * r))
    return VGroup(corps, tete).move_to(ORIGIN)


def rangs(lignes, colonnes, pas=0.42, r=0.13, centre=ORIGIN, c=TENUE):
    """`lignes` rangs de `colonnes` danseurs ; le rang i = g[i*colonnes:(i+1)*colonnes]."""
    g = VGroup()
    for i in range(lignes):
        for j in range(colonnes):
            g.add(danseur(r, c, i * colonnes + j).move_to(P((j - (colonnes - 1) / 2) * pas, ((lignes - 1) / 2 - i) * pas)))
    return g.move_to(centre)


def places(lignes, colonnes, pas=0.42, centre=ORIGIN):
    """Les centres des places d'un rectangle de rangs (sans dessin)."""
    return [np.array(centre) + P((j - (colonnes - 1) / 2) * pas, ((lignes - 1) / 2 - i) * pas)
            for i in range(lignes) for j in range(colonnes)]


def foule(n, x0, x1, y0, y1, r=0.13, graine=4, c=TENUE):
    """n danseurs posés au hasard, sans se toucher."""
    rng = np.random.default_rng(graine)
    pts = []
    while len(pts) < n:
        p = (rng.uniform(x0, x1), rng.uniform(y0, y1))
        if all((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 > (2.7 * r) ** 2 for q in pts):
            pts.append(p)
    return VGroup(*[danseur(r, c, k).move_to(P(*p)) for k, p in enumerate(pts)])


def plancher(x0, x1, y0, y1):
    """Le plancher de la scène, son bord avant doré."""
    sol = Rectangle(width=x1 - x0, height=y1 - y0, fill_color=SCENE, fill_opacity=1, stroke_width=0)
    sol.move_to(P((x0 + x1) / 2, (y0 + y1) / 2))
    bord = Line(P(x0, y0), P(x1, y0), color="#d97706", stroke_width=6)
    return VGroup(sol, bord)


def teinter(e, couleurs):
    """Colore les atomes d'une ligne selon leur texte (« 42 » bleu ciel, « 6 » jaune…)."""
    for a in e.atomes:
        if a.original_text in couleurs:
            a.set_color(couleurs[a.original_text])
    return e


def vide(pos, r=0.13):
    """Une place restée vide : un rond en pointillés."""
    return DashedVMobject(Circle(radius=r * 1.05, color=PIEGE, stroke_width=3), num_dashes=10).move_to(pos)


class DivMultiple4e(PaysageDiv):
    nom_voix = "4e-div-multiple"
    fichier_marques = "div_multiple_marques.json"
    ceinture = "jaune"

    def _disposer_q(self, question, choix, phrase):
        """Les choix sont des phrases : des cartes de 6,6 de large (au lieu de 5,4 au plus),
        la phrase gardant sa taille d'origine (font 34), à la place des cartes d'origine."""
        hauteurs = [c.height for c in choix]
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for c, h in zip(choix, hauteurs):
            c.scale_to_fit_height(h * 34 / 40)
        neuves = VGroup(*[self._carte_choix(l, c, 6.6, 34) for l, c in zip("ABC", choix)])
        neuves.arrange(DOWN, buff=0.14).align_to(cartes, UP).align_to(P(self.XL, 0), LEFT)
        pause.next_to(neuves, DOWN, buff=0.16).align_to(P(self.XL, 0), LEFT)
        ph.next_to(neuves, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        self.cartes_q = neuves
        return tete, q, neuves, pause, rebours, ph

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Multiples et diviseurs", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Multiples", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        g = rangs(7, 6, pas=0.33, r=0.11, centre=P(-4.4, 0.35))
        l1 = self.lg("Deux mots pour", 2.0, 0.75, 46, maxw=8)
        self.dit(l1, "Deux mots pour", avec=[LaggedStart(*[FadeIn(d, scale=0.4) for d in g], lag_ratio=0.02)])
        l2 = self.lg("une seule relation ?", 2.0, -0.1, 54, JAUNE_TITRE, maxw=8)
        self.dit(l2, "une seule relation ?")
        self.insister(l2, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les 42 danseurs d'Awa ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = awa_choregraphe().move_to(P(-5.9, 2.35))
        sol = plancher(-5.5, -0.7, -3.0, 1.25)
        tas = foule(42, -5.2, -1.0, -2.65, 0.95)
        self.dit(self.lg("Awa est chorégraphe :", 3.2, 3.0, 40, CIEL), "Awa est chorégraphe :", avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("elle invente les danses", 3.2, 2.35, 36), "elle invente les danses")
        self.dit(self.lg("d'un spectacle.", 3.2, 1.75, 36), "d'un spectacle.", avec=[FadeIn(sol)])
        self.dit(self.lg("Elle a 42 danseurs,", 3.2, 0.9, 36), "Elle a 42 danseurs,")
        self.play(LaggedStart(*[FadeIn(d, scale=0.4) for d in tas], lag_ratio=0.03), run_time=0.8)
        self.dit(self.lg("et elle veut des rangs de 6,", 3.2, 0.3, 36), "et elle veut des rangs de 6,")
        self.dit(self.lg("tous complets.", 3.2, -0.3, 36), "tous complets.")
        q = self.lg("Est-ce possible ?", 3.2, -1.45, 50, JAUNE_TITRE)
        self.dit(q, "Est-ce possible ?")
        self.insister(q, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : les rangs de 6 ─────────────────────────────────────────────────
    def ecran_rangs(self):
        self.ecran("02-rangs")
        sol = plancher(-5.5, -0.7, -3.0, 1.25)
        tas = foule(42, -5.2, -1.0, -2.65, 0.95)
        self.add(sol, tas)
        cible = places(7, 6, pas=0.44, centre=P(-2.85, -0.85))
        aller = lambda i: [tas[k].animate.move_to(cible[k]) for k in range(6 * i, 6 * i + 6)]  # noqa: E731
        num = lambda s, i: T(s, 30, PETIT, audit=False).move_to(P(-4.75, cible[6 * i][1]))  # noqa: E731
        self.dit(self.lg("Elle les place :", 3.2, 2.9, 40, CIEL), "Elle les place :")
        self.dit(self.lg("1 rang,", 3.2, 2.15, 38), "1 rang,", avec=[FadeIn(num("1", 0))])
        self.play(*aller(0), run_time=0.45)
        self.dit(self.lg("2 rangs…", 3.2, 1.5, 38), "2 rangs…", avec=[FadeIn(num("2", 1))])
        self.play(*aller(1), run_time=0.45)
        self.dit(self.lg("7 rangs de 6.", 3.2, 0.85, 42, PETIT), "7 rangs de 6.", avec=[FadeIn(num("7", 6))])
        self.play(*[a for i in range(2, 7) for a in aller(i)], run_time=0.8)
        ok = self.lg("Personne ne reste de côté.", 3.2, -0.15, 38, VERT_OK)
        self.dit(ok, "Personne ne reste de côté.")
        self.play(Create(SurroundingRectangle(VGroup(*tas), color=VERT_OK, buff=0.14, stroke_width=3)), run_time=0.4)
        e = teinter(F("6 × 7 = 42", 54), {"6": PETIT, "42": GRAND}).move_to(P(3.2, -1.45))
        self.dire_eq(e, "6 fois 7 égale 42.", echelle=1.25)
        self.play(Create(self.cadre_ok(e, 0.18)), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 03 : les deux mots ──────────────────────────────────────────────────
    def ecran_mots(self):
        self.ecran("03-mots")
        g = rangs(7, 6, pas=0.33, r=0.11, centre=P(-4.75, 0.75))
        rappel = teinter(F("6 × 7 = 42", 40).sans_audit(), {"6": PETIT, "42": GRAND})
        rappel.next_to(g, DOWN, buff=0.35)
        self.play(FadeIn(g), FadeIn(rappel), run_time=0.3)
        cl = {"42": GRAND, "6": PETIT, "multiple": GRAND, "diviseur": PETIT}
        self.dit(self.lg("On le dit de deux façons.", 1.6, 2.95, 40, CIEL, maxw=8.4), "On le dit de deux façons.")
        self.dit(teinter(self.lg("42 est un multiple de 6.", 1.6, 2.05, 44, maxw=8.4), cl), "42 est un multiple de 6.")
        self.dit(teinter(self.lg("Et 6 est un diviseur de 42.", 1.6, 1.2, 44, maxw=8.4), cl), "Et 6 est un diviseur de 42.")
        # le schéma des deux sens
        c6 = VGroup(Circle(radius=0.45, color=PETIT, stroke_width=5), T("6", 46, PETIT, audit=False)).move_to(P(-0.2, -0.75))
        c42 = VGroup(Circle(radius=0.45, color=GRAND, stroke_width=5), T("42", 42, GRAND, audit=False)).move_to(P(3.4, -0.75))
        haut = CurvedArrow(c42.get_top() + LEFT * 0.1, c6.get_top() + RIGHT * 0.1, angle=0.9, color=GRAND, stroke_width=5, tip_length=0.2)
        bas = CurvedArrow(c6.get_bottom() + RIGHT * 0.1, c42.get_bottom() + LEFT * 0.1, angle=0.9, color=PETIT, stroke_width=5, tip_length=0.2)
        lh = T("multiple de", 28, GRAND, audit=False).next_to(haut, UP, buff=0.08)
        lb = T("diviseur de", 28, PETIT, audit=False).next_to(bas, DOWN, buff=0.08)
        self.dit(self.lg("C'est la même relation,", 1.6, -2.55, 38, maxw=8.4), "C'est la même relation,",
                 avec=[FadeIn(c6), FadeIn(c42)])
        s = self.lg("dite dans les deux sens.", 1.6, -3.2, 40, JAUNE_TITRE, maxw=8.4)
        self.dit(s, "dite dans les deux sens.")
        self.play(Create(haut), FadeIn(lh), Create(bas), FadeIn(lb), run_time=0.6)
        self.insister(s, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        fig = rangs(5, 8, pas=0.3, r=0.1, centre=P(-4.55, -0.2))
        cad = Text("40 danseurs", font_size=30, color=CIEL)
        cad.sans_synchro = True
        cad.next_to(fig, UP, buff=0.3)

        def avant(sc):
            sc.eq_dans_q(0, "On sait que 8 × 5 = 40.", "On sait que 8 fois 5 égale 40.", lettres="")
            sc.play(LaggedStart(*[FadeIn(d, scale=0.4) for d in fig], lag_ratio=0.01), FadeIn(cad), run_time=0.4)
            sc.eq_dans_q(0, "Quelle phrase est vraie ?", "Quelle phrase est vraie ?", lettres="")

        def apres(sc):
            sc.reponse(("Réponse B : 8 est un diviseur de 40.", "Réponse B : 8 est un diviseur de 40."),
                       ("Le diviseur est le petit,", "Le diviseur est le petit,"),
                       ("le multiple est le grand.", "le multiple est le grand."))

        self.question_pause("03q-question", "03r-reponse", ["On sait que 8 × 5 = 40.", "Quelle phrase est vraie ?"],
                            [E("8 est un multiple de 40", 40, lettres=""), E("8 est un diviseur de 40", 40, lettres=""),
                             E("40 est un diviseur de 8", 40, lettres="")], 1,
                            ["Réponse B : 8 est un diviseur de 40.", "Le diviseur est le petit,", "le multiple est le grand."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : et si ça ne tombe pas juste ? ──────────────────────────────────
    def ecran_test(self):
        self.ecran("04-test")
        cible = places(8, 6, pas=0.42, centre=P(-3.6, 0.0))
        g = VGroup(*[danseur(0.13, TENUE, k).move_to(cible[k]) for k in range(42)])
        plus = VGroup(*[danseur(0.13, EN_PLUS, k).move_to(P(-1.05, 1.0 - 0.5 * k)) for k in range(3)])
        self.dit(self.lg("Et si ça ne tombe pas juste ?", 0, 3.2, 44, CIEL, maxw=11), "Et si ça ne tombe pas juste ?",
                 avec=[FadeIn(g)])
        self.dit(self.lg("Awa reçoit 3 danseurs de plus :", 3.0, 2.2, 38, maxw=6.4), "Awa reçoit 3 danseurs de plus :")
        self.play(LaggedStart(*[FadeIn(d, shift=LEFT * 0.4) for d in plus], lag_ratio=0.25), run_time=0.5)
        q = self.lg("45.", 3.3, 1.4, 56, GRAND)
        self.dit(q, "45.")
        self.dit(self.lg("Des rangs de 6 ?", 3.3, 0.6, 40), "Des rangs de 6 ?")
        e = teinter(F("45 ÷ 6 : 7 rangs,", 44), {"45": GRAND, "6": PETIT}).move_to(P(3.3, -0.35))
        self.dire_eq(e, "45 divisé par 6 : 7 rangs,", echelle=1.2)
        reste = self.lg("et il en reste 3.", 3.3, -1.2, 44, PIEGE)
        trous = VGroup(*[vide(cible[45 + k]) for k in range(3)])
        cadre = SurroundingRectangle(VGroup(*[Dot(cible[42 + k]) for k in range(6)]), color=PIEGE, buff=0.2, stroke_width=4)
        self.dit(reste, "et il en reste 3.")
        self.play(*[plus[k].animate.move_to(cible[42 + k]) for k in range(3)], run_time=0.5)
        self.play(FadeIn(trous), Create(cadre), run_time=0.35)
        self.attendre_voix(marge=0.8)

    # ── 05 : le test, c'est le reste ────────────────────────────────────────
    def ecran_reste(self):
        self.ecran("05-reste")
        cible = places(8, 6, pas=0.42, centre=P(-3.9, 0.55))
        g = VGroup(*[danseur(0.13, TENUE, k).move_to(cible[k]) for k in range(42)],
                   *[danseur(0.13, EN_PLUS, k).move_to(cible[42 + k]) for k in range(3)],
                   *[vide(cible[45 + k]) for k in range(3)])
        cadre = SurroundingRectangle(VGroup(*[Dot(cible[42 + k]) for k in range(6)]), color=PIEGE, buff=0.2, stroke_width=4)
        self.play(FadeIn(g), FadeIn(cadre), run_time=0.3)
        cl = {"45": GRAND, "6": PETIT, "multiple": GRAND, "diviseur": PETIT}
        self.dit(self.lg("Le reste n'est pas zéro.", 2.9, 2.95, 42, PIEGE, maxw=6.6), "Le reste n'est pas zéro.")
        self.dit(teinter(self.lg("Donc 45 n'est pas", 2.9, 1.95, 40, maxw=6.6), cl), "Donc 45 n'est pas")
        self.dit(teinter(self.lg("un multiple de 6,", 2.9, 1.3, 40, maxw=6.6), cl), "un multiple de 6,")
        self.dit(teinter(self.lg("et 6 n'est pas", 2.9, 0.45, 40, maxw=6.6), cl), "et 6 n'est pas")
        self.dit(teinter(self.lg("un diviseur de 45.", 2.9, -0.2, 40, maxw=6.6), cl), "un diviseur de 45.")
        r = self.lg("Le test, c'est toujours le reste.", -0.3, -2.45, 46, JAUNE_TITRE, maxw=10)
        self.dit(r, "Le test, c'est toujours le reste.")
        self.play(Create(SurroundingRectangle(r, color=JAUNE_TITRE, buff=0.2, corner_radius=0.1, stroke_width=4)), run_time=0.25)
        self.insister(r, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.dit(self.lg("Le piège : échanger les deux mots.", 0, 3.15, 42, PIEGE, maxw=11.5), "Le piège : échanger les deux mots.")
        # les deux nombres en blocs : 42, c'est 7 blocs de 6
        bloc = lambda: VGroup(Rectangle(width=1.0, height=0.36, fill_color="#1e3a5f", fill_opacity=1, stroke_color=GRAND, stroke_width=2),  # noqa: E731
                              T("6", 24, WHITE, audit=False))
        un = bloc().move_to(P(2.2, -2.62))
        un[1].move_to(un[0])
        un[0].set_stroke(PETIT).set_fill("#3f3a12")
        tour = VGroup()
        for k in range(7):
            b = bloc().move_to(P(4.4, -2.62 + 0.38 * k))
            b[1].move_to(b[0])
            tour.add(b)
        l6 = T("6", 50, PETIT, audit=False).next_to(un, UP, buff=0.18)
        l42 = T("42", 50, GRAND, audit=False).next_to(tour, UP, buff=0.18)
        sol = Line(P(1.3, -2.82), P(5.3, -2.82), color="#94a3b8", stroke_width=3)
        fausse = teinter(self.lg("6 est un multiple de 42 ?", -2.6, 1.95, 42, maxw=7.2), {"6": PETIT, "42": GRAND, "multiple": GRAND})
        self.poser_avec(fausse, "6 est un multiple de 42 ?",
                        {0: lambda: [FadeIn(sol), FadeIn(un), FadeIn(l6, scale=1.3)], 5: lambda: [FadeIn(l42, scale=1.3)]})
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.2) for b in tour], lag_ratio=0.12), run_time=0.6)
        faux = self.verdict("Faux !", PIEGE, 48).move_to(P(-2.6, 0.85))
        self.au("Faux", Create(self.barrer(fausse)), FadeIn(faux, scale=1.4), rt=0.3)
        m1 = self.lg("Le multiple est toujours", -2.6, -0.65, 40, maxw=7.2)
        teinter(m1, {"multiple": GRAND})
        self.dit(m1, "Le multiple est toujours")
        m2 = self.lg("le plus grand des deux.", -2.6, -1.35, 44, JAUNE_TITRE, maxw=7.2)
        lab = T("le multiple", 30, GRAND, audit=False).next_to(l42, UP, buff=0.12)
        if lab.get_right()[0] > 6.3:
            lab.shift(LEFT * (lab.get_right()[0] - 6.3))
        self.dit(m2, "le plus grand des deux.", avec=[FadeIn(lab, shift=DOWN * 0.15)])
        self.play(Circumscribe(tour, color=GRAND), run_time=0.6)
        self.insister(m2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        fig = rangs(7, 8, pas=0.28, r=0.095, centre=P(-4.55, -0.2))
        cad = Text("56 danseurs", font_size=30, color=CIEL)
        cad.sans_synchro = True
        cad.next_to(fig, UP, buff=0.3)

        def avant(sc):
            # la figure arrive avec « 56 », le premier mot de la ligne (eq_dans_q, avec la figure en plus)
            ref = sc.q_q[0]
            e = Eq("56 ÷ 7 = 8, sans reste.", 34, lettres="")
            e.scale_to_fit_height(ref.height).move_to(ref)
            sc.q_q.remove(ref)
            sc.dire_eq(e, "56 divisé par 7 égale 8, sans reste.", avec=[FadeIn(fig), FadeIn(cad)])
            sc.eq_dans_q(0, "Que peut-on dire ?", "Que peut-on dire ?", lettres="")

        def apres(sc):
            sc.reponse(("Réponse A : 56 est un multiple de 7.", "Réponse A : 56 est un multiple de 7."),
                       ("Le reste vaut zéro,", "Le reste vaut zéro,"),
                       ("et 56 est le plus grand.", "et 56 est le plus grand."))

        self.question_pause("06q-question", "06r-reponse", ["56 ÷ 7 = 8, sans reste.", "Que peut-on dire ?"],
                            [E("56 est un multiple de 7", 40, lettres=""), E("7 est un multiple de 56", 40, lettres=""),
                             E("56 et 7 n'ont aucun lien", 40, lettres="")], 0,
                            ["Réponse A : 56 est un multiple de 7.", "Le reste vaut zéro,", "et 56 est le plus grand."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au("À toi", Write(tit), rt=0.5)
        p = awa_choregraphe().move_to(P(-5.75, 0.3))
        f72 = foule(72, -4.7, -0.9, 0.25, 2.2, r=0.075, graine=11)
        f32 = foule(32, -4.7, -1.3, -2.7, -1.0, r=0.075, graine=12, c=EN_PLUS)
        q1 = teinter(self.lg("72 est-il un multiple", 3.2, 1.75, 40, maxw=5.6), {"72": GRAND, "multiple": GRAND})
        self.dit(q1, "72 est-il un multiple", avec=[FadeIn(p)])
        self.play(LaggedStart(*[FadeIn(d, scale=0.4) for d in f72], lag_ratio=0.01), run_time=0.5)
        q1b = teinter(self.lg("de 9 ?", 3.2, 1.1, 44), {"9": PETIT})
        self.dit(q1b, "de 9 ?")
        q2 = teinter(self.lg("Et 5 est-il un diviseur", 3.2, -0.15, 40, maxw=5.6), {"5": PETIT, "diviseur": PETIT})
        self.dit(q2, "Et 5 est-il un diviseur")
        self.play(LaggedStart(*[FadeIn(d, scale=0.4) for d in f32], lag_ratio=0.02), run_time=0.5)
        q2b = teinter(self.lg("de 32 ?", 3.2, -0.8, 44), {"32": GRAND})
        self.dit(q2b, "de 32 ?")
        pz = T("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(3.05, -2.0))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("07b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.2))), rt=0.25)
        g72 = rangs(8, 9, pas=0.26, r=0.09, centre=P(-4.9, 1.45))
        e1 = teinter(F("9 × 8 = 72 :", 46), {"9": PETIT, "72": GRAND}).move_to(P(1.0, 2.25))
        self.dire_eq(e1, "9 fois 8 égale 72 :", echelle=1.2)
        self.play(LaggedStart(*[FadeIn(d, scale=0.4) for d in g72], lag_ratio=0.005), run_time=0.5)
        oui = self.lg("oui, 72 est un multiple de 9.", 1.0, 1.45, 40, VERT_OK, maxw=9)
        self.dit(oui, "oui, 72 est un multiple de 9.")
        self.play(Create(self.cadre_ok(oui, 0.14)), run_time=0.2)
        c32 = places(7, 5, pas=0.26, centre=P(-4.9, -1.55))
        g32 = VGroup(*[danseur(0.09, TENUE, k).move_to(c32[k]) for k in range(30)])
        r32 = VGroup(*[danseur(0.09, EN_PLUS, k).move_to(c32[30 + k]) for k in range(2)])
        e2 = teinter(F("32 ÷ 5 : 6, et il reste 2.", 44), {"32": GRAND, "5": PETIT}).move_to(P(1.0, -0.35))
        e2.atomes[-2].set_color(PIEGE)
        self.poser_avec(e2, "32 divisé par 5 : 6, et il reste 2.", {9: lambda: [FadeIn(r32, scale=1.4)]})
        self.play(LaggedStart(*[FadeIn(d, scale=0.4) for d in g32], lag_ratio=0.01),
                  Create(SurroundingRectangle(r32, color=PIEGE, buff=0.08, stroke_width=3)), run_time=0.5)
        self.dit(self.lg("Le reste n'est pas zéro :", 1.0, -1.2, 40, PIEGE, maxw=9), "Le reste n'est pas zéro :")
        non = self.lg("non, 5 n'est pas un diviseur de 32.", 1.0, -2.0, 40, PIEGE, maxw=9)
        self.dit(non, "non, 5 n'est pas un diviseur de 32.")
        self.attendre_voix(marge=1.0)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        self.XL = -1.5
        fig = VGroup(rangs(7, 6, pas=0.3, r=0.1), teinter(F("6 × 7 = 42", 40).sans_audit(), {"6": PETIT, "42": GRAND}))
        fig[1].next_to(fig[0], DOWN, buff=0.3)
        lignes = self.finale_colonne([["Multiple et diviseur disent", "la même relation."],
                                      ["Le multiple est le plus grand."],
                                      ["Pour tester, on divise,", "et le reste doit valoir zéro."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rangs()
        self.ecran_mots()
        self.ecran_question1()
        self.ecran_test()
        self.ecran_reste()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
