# prop_tableau_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 02 « Compléter un tableau de
# proportionnalité » (micro prop_table). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : on VOIT la notion, aucune multiplication.
# Il AMUSE : « Un tableau rempli en 10 secondes, sans calculatrice ? »
#   · EN HAUT, l'image qui bouge : à la pâtisserie, les piles de cookies
#     s'empilent au-dessus de LEUR colonne ; pour 4 cookies, deux piles de 2
#     volent et s'empilent (2 + 2) ; puis 2 + 4, puis 4 + 6 ;
#   · EN BAS, au même instant, le tableau se remplit : les colonnes ajoutées
#     s'allument et leurs PRIX volent dans la case du bas (3 + 3 = 6 €,
#     3 + 6 = 9 €, 6 + 9 = 15 €) ;
#   · 1 question-pause (3 s) : 12 cookies ? (6 + 6 → 9 + 9 = 18 €) ; leurres :
#     14 € (ajouter au lieu de multiplier : 12 + 2), 36 € (12 × 3 : le prix
#     de 2 cookies pris pour celui d'un seul, mauvais coefficient) ;
#   · fin : « Combien coûtent 20 cookies ? » (30 €) en commentaire.
# Centres d'intérêt : cuisine. Prix inventés (2 cookies pour 3 €, ordre de
# grandeur d'une boulangerie) : pas de donnée réelle à sourcer.
# Ajouté ICI (absent du module) : cookie(), piles qui volent d'une colonne à
# l'autre, prix qui volent d'une case à l'autre ; pendant la question, le
# tableau MONTE dans la bande du haut (il reste visible) et les cartes des
# choix sont plus basses (_carte_choix compacte, Y_Q abaissé).
#
# Voix : manim/voix/6e-prop-tableau-short.json (validée, débit −10) ;
# marques : manim/scripts/6e/prop_tableau_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_tableau_short.py PropTableauShort6e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_tableau_short.py PropTableauShort6e -o eleveai-maths-6e-prop-tableau-short --media_dir manim/scripts/6e/media-prop-tableau-short
# Sortie : manim/sorties/6e/maths/proportionnalite/02-tableau/eleveai-maths-6e-prop-tableau-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

SOL = 0.25           # le comptoir, dans la bande du haut
EP = 0.13            # l'épaisseur d'un cookie de la pile
BRUN = "#b45309"


def cookie(l=0.56):
    """Un cookie vu de profil, pour l'empiler : galette dorée, pépites."""
    g = Ellipse(width=l, height=EP * 1.25, fill_color="#d97706", fill_opacity=1, stroke_color="#78350f",
                stroke_width=2)
    pep = VGroup(*[Dot(radius=0.025, color="#3f1d0b").move_to(P(x * l, y * EP)) for x, y in
                   ((-0.28, 0.1), (-0.08, -0.15), (0.12, 0.12), (0.3, -0.05))])
    return VGroup(g, pep)


def pile(n, x, base=SOL):
    """n cookies empilés au-dessus de l'abscisse x, à partir de y = base."""
    return VGroup(*[cookie().move_to(P(x, base + EP * (k + 0.5))) for k in range(n)])


def store(l=4.0):
    """Le store rayé de la pâtisserie, avec ses festons."""
    n = 8
    w = l / n
    bandes = VGroup(*[Rectangle(width=w, height=0.3, fill_color="#f472b6" if k % 2 == 0 else WHITE,
                                fill_opacity=1, stroke_width=0).move_to(P(-l / 2 + w * (k + 0.5), 0))
                      for k in range(n)])
    festons = VGroup(*[Arc(radius=w / 2, start_angle=PI, angle=PI, fill_color="#f472b6" if k % 2 == 0 else WHITE,
                           fill_opacity=1, stroke_width=0).move_to(P(-l / 2 + w * (k + 0.5), -0.15 - w / 4))
                       for k in range(n)])
    return VGroup(bandes, festons)


def chrono(r=0.42):
    """Un chronomètre : cadran, bouton, aiguille."""
    cadran = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#475569", stroke_width=5)
    bouton = RoundedRectangle(width=0.18, height=0.12, corner_radius=0.03, fill_color="#475569",
                              fill_opacity=1, stroke_width=0).next_to(cadran, UP, buff=0)
    aig = Line(ORIGIN, UP * r * 0.75, color="#dc2626", stroke_width=4)
    return VGroup(cadran, bouton, aig)


def calculatrice(s=1.0):
    corps = RoundedRectangle(width=0.7, height=0.95, corner_radius=0.08, fill_color="#334155", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    ecran = Rectangle(width=0.54, height=0.2, fill_color="#bbf7d0", fill_opacity=1, stroke_width=0).move_to(
        corps.get_top() + DOWN * 0.2)
    touches = VGroup(*[Square(0.11, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0).move_to(
        corps.get_center() + P(-0.17 + 0.17 * i, 0.05 - 0.17 * j)) for i in range(3) for j in range(3)])
    return VGroup(corps, ecran, touches).scale(s)


class PropTableauShort6e(ShortProp):
    nom_voix = "6e-prop-tableau-short"
    fichier_marques = "prop_tableau_short_marques.json"
    ceinture = "blanche"
    Y_Q = 0.35  # la question sous le tableau remonté dans la bande du haut

    def _carte_choix(self, lettre, txt, largeur, fs):
        """Comme celle du module H2, en moins haut (0,6) : trois cartes
        tiennent entre le tableau remonté et Ti-Margo."""
        rond = Circle(radius=0.26 * fs / 34, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        corps = txt if isinstance(txt, Mobject) else Text(txt, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), corps).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 0.4:
            ligne.scale_to_fit_width(largeur - 0.4)
        cadre = RoundedRectangle(width=largeur, height=max(0.56, ligne.height + 0.18), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color="#0b1220", fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def _disposer_q(self, question, choix, phrase):
        """La question « Et 12 cookies ? » s'écrit avec son nombre (« Et 12 »),
        sans attendre le mot « cookies » dit 0,7 s plus tard."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for f in q.get_family():
            if isinstance(f, Text):
                f.sans_synchro = True
        return tete, q, cartes, pause, rebours, ph

    def table_haut(self):
        """Le tableau des cookies, rempli, en petit en haut (question, fin)."""
        tb = TableauProp(["Cookies", "Prix (€)"], [[2, 4, 6, 10], [3, 6, 9, 15]], montrer=True,
                         largeur_case=0.7, largeur_libelle=1.05, hauteur=0.6, fs=26, marge=0.12)
        for f in tb.get_family():
            if isinstance(f, Text):
                f.sans_synchro = f._pas_audit = True
        return tb.scale(0.8).move_to(P(0, 1.85))

    def textes_table(self):
        return [t for row in self.tb.textes for t in row if t is not None]

    def voler_pile(self, c0, c, arc=-PI / 2.5):
        """Une COPIE de la pile de la colonne c0 vole et s'empile sur la
        colonne c (animation renvoyée ; la pile de c grandit)."""
        cp = self.piles[c0].copy()
        base = self.piles[c].get_top()[1] if len(self.piles[c]) else SOL
        cp.generate_target()
        cp.target.move_to(P(self.tb.x(c), base + cp.height / 2))
        self.piles[c].add(*cp)
        return MoveToTarget(cp, path_arc=arc)

    def voler_prix(self, c0, c, dx):
        """Une copie du prix de la colonne c0 vole dans la case du bas de c."""
        cp = self.tb.textes[1][c0].copy()
        cp.generate_target()
        cp.target.move_to(self.tb.case(1, c).get_center() + RIGHT * dx).scale(0.8)
        self.volants.append(cp)
        return MoveToTarget(cp, path_arc=-PI / 3)

    def additionner(self, c, c1, c2, mots, lignes_y=(-2.1, -2.62)):
        """Une colonne c = c1 + c2 : la case du haut, les piles qui volent, les
        prix qui volent puis se fondent dans la case du bas. mots = (cookies,
        « c'est », 1er nombre, 2e nombre, 1er prix, 2e prix, prix final)."""
        tb = self.tb
        m_q, m_c, m_a, m_b, m_pa, m_pb, m_p = mots
        qa, qb, q = tb.valeurs[0][c1], tb.valeurs[0][c2], tb.valeurs[0][c]
        pa, pb, p = tb.valeurs[1][c1], tb.valeurs[1][c2], tb.valeurs[1][c]
        la = self.ligne([(f"{q} =", WHITE), (f"{qa} +", AMBRE), (f"{qb}", AMBRE)], 32).move_to(P(0, lignes_y[0]))
        lb = self.ligne([(f"{pa} +", AMBRE), (f"{pb} =", AMBRE), (f"{p} €", VERT_OK)], 32).move_to(P(0, lignes_y[1]))
        self.au_mot(m_q)
        self.play(FadeIn(tb.valeur(0, c), scale=1.4), FadeIn(tb.trou(1, c), scale=1.3), tb.allumer(0, c),
                  run_time=0.4)
        self.au_mot(m_c)
        self.play(FadeIn(la[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot(m_a)
        self.play(tb.allumer(0, c1), FadeIn(la[1], shift=RIGHT * 0.15), self.voler_pile(c1, c), run_time=0.7)
        self.au_mot(m_b)
        anims = [] if c2 == c1 else [tb.allumer(0, c2)]
        self.play(*anims, FadeIn(la[2], shift=RIGHT * 0.15), self.voler_pile(c2, c), run_time=0.7)
        self.volants = []
        self.au_mot(m_pa)
        self.play(*[tb.eteindre(0, k) for k in {c, c1, c2}], tb.allumer(1, c1), FadeIn(lb[0], shift=RIGHT * 0.15),
                  self.voler_prix(c1, c, -0.17), run_time=0.6)
        self.au_mot(m_pb)
        anims = [] if c2 == c1 else [tb.allumer(1, c2)]
        self.play(*anims, FadeIn(lb[1], shift=RIGHT * 0.15), self.voler_prix(c2, c, 0.17), run_time=0.6)
        self.au_mot(m_p)
        self.play(FadeOut(VGroup(*self.volants)), tb.remplir(1, c), FadeIn(lb[2], scale=1.3),
                  *[tb.eteindre(1, k) for k in {c1, c2}], run_time=0.45)
        self.play(tb.allumer(1, c), run_time=0.25)
        self.play(tb.eteindre(1, c), *[Indicate(k, color=AMBRE, scale_factor=1.06) for k in self.piles[c]],
                  run_time=0.45)
        return VGroup(la, lb)

    def _rep_q(self, sc):
        """La réponse de la question-pause, au mot, avec la colonne 6 → 9."""
        tb = self.tb
        l0 = sc.ligne_rep(0, ["12 =", "6 +", "6."])
        l1 = sc.ligne_rep(1, ["9 +", "9 =", "18 €."])
        sc.au_mot("12")
        sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.25)
        sc.au_mot("6 plus")
        sc.play(FadeIn(l0[1], shift=UP * 0.12), tb.allumer(0, 2), run_time=0.25)
        sc.au_mot("6. Donc")
        sc.play(FadeIn(l0[2], shift=UP * 0.12), Indicate(tb.textes[0][2], color=AMBRE, scale_factor=1.4),
                run_time=0.35)
        sc.au_mot("9 plus")
        sc.play(FadeIn(l1[0], shift=UP * 0.12), tb.eteindre(0, 2), tb.allumer(1, 2), run_time=0.25)
        sc.au_mot("9 : 18")
        sc.play(FadeIn(l1[1], shift=UP * 0.12), Indicate(tb.textes[1][2], color=AMBRE, scale_factor=1.4),
                run_time=0.35)
        sc.au_mot("18 €")
        sc.play(FadeIn(l1[2], scale=1.3), tb.eteindre(1, 2), run_time=0.3)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Sans calculatrice !", self.ceinture)
        titre.sans_synchro = True  # « Sans… » : le mot est dit à la fin de l'accroche, le titre est là d'entrée
        self.add(badge)
        self.tb = tb = TableauProp(["Cookies", "Prix (€)"], [[2, 4, 6, 10], [3, 6, 9, 15]], montrer=False,
                                   largeur_case=0.7, largeur_libelle=1.05, hauteur=0.6, fs=26, marge=0.12,
                                   centre=P(0, -0.85))
        comptoir = Line(P(-2.0, SOL), P(2.0, SOL), color=GREY_C, stroke_width=4)
        self.piles = [VGroup() for _ in range(4)]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("tableau")
        self.play(Write(titre), FadeIn(tb.fond, shift=UP * 0.2), run_time=0.6)
        self.play(*[FadeIn(tb.trou(r, c), scale=1.3) for r in range(2) for c in range(4)], run_time=0.4)
        ch = chrono().move_to(P(-0.95, 1.3))
        self.au_mot("10 secondes")
        dix = self.t("10 s", 30, AMBRE).next_to(ch, DOWN, buff=0.12)
        self.play(FadeIn(ch, scale=0.6), FadeIn(dix, scale=1.3), Rotate(ch[2], -PI, about_point=ch[0].get_center()),
                  run_time=0.6)
        calc = calculatrice(1.0).move_to(P(0.95, 1.35))
        self.au_mot("calculatrice")
        self.play(FadeIn(calc, scale=0.6), run_time=0.35)
        x_calc = croix(calc, sw=6)
        self.play(Create(x_calc), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 01 : 2 cookies, 3 € ──
        self.dire("01-cookies")
        st = store(3.9).move_to(P(0, 2.05))
        self.au_mot("pâtisserie")
        self.play(FadeOut(VGroup(ch, dix, calc, x_calc)), FadeIn(st, shift=DOWN * 0.2), Create(comptoir),
                  run_time=0.5)
        self.au_mot("2 cookies")
        p2 = pile(2, tb.x(0), base=SOL + 1.2)
        self.piles[0].add(*p2)
        self.play(tb.remplir(0, 0), tb.allumer(0, 0), run_time=0.35)
        self.play(p2.animate.shift(DOWN * 1.2), run_time=0.45, rate_func=rate_functions.ease_in_quad)
        self.au_mot("3 €")
        self.play(tb.eteindre(0, 0), tb.remplir(1, 0), tb.allumer(1, 0), run_time=0.4)
        self.play(tb.eteindre(1, 0), run_time=0.25)
        self.attendre_voix(marge=0.2)

        # ── 02, 03, 04 : les colonnes s'additionnent ──
        lignes = None
        for cle, c, c1, c2, mots in [
                ("02-quatre", 1, 0, 0, ("4 cookies", "4, c'est", "2 plus", "2. Donc", "3 plus", "3 : 6", "6 €")),
                ("03-six", 2, 0, 1, ("6 cookies", "6, c'est", "2 plus", "4. Donc", "3 plus", "6 : 9", "9 €")),
                ("04-dix", 3, 1, 2, ("10 cookies", "10, c'est", "4 plus", "6. Donc", "6 plus", "9 : 15", "15 €"))]:
            self.dire(cle)
            if lignes is not None:
                self.play(FadeOut(lignes), run_time=0.3)
            lignes = self.additionner(c, c1, c2, mots)
            if cle == "04-dix":
                self.au_mot("Pas une")
                pas = self.borne(self.t("Pas une seule multiplication !", 30, VERT_OK), 0.9)
                pas.move_to(P(0, -2.4))
                self.play(FadeOut(lignes), FadeIn(pas, scale=1.2), run_time=0.4)
                self.insister(pas, 1.1)
                lignes = pas
            self.attendre_voix(marge=0.2)

        # ── 05 : la question-pause (3 s) : le tableau monte, les choix dessous ──
        # Tout s'efface (un FadeOut par objet : un groupe parent doublait ses
        # enfants et brouillait le fondu) ; le MÊME tableau, rempli, revient en
        # petit dans la bande du haut (ses nombres : données de la figure).
        garder = [margo, titre, badge]
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)
        self.tb = tb = self.table_haut()
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.4)
        self.question_pause("05-question", "05b-reponse", ["Et 12 cookies ?"],
                            [self.t("18 €", 30), self.t("14 €", 30), self.t("36 €", 30)], 0,
                            ["12 = 6 + 6.", "9 + 9 = 18 €."], mot_q="Et 12", autres_r=self._rep_q)
        # les cases allumées sont devenues des objets de la scène : on repart d'un tableau neuf
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)
        self.play(FadeIn(self.table_haut()), run_time=0.3)

        # ── 06 : la question en commentaire ──
        self.dire("06-commentaire")
        self.au_mot("20 cookies")
        q = self.borne(self.ligne([("20 cookies", AMBRE), ("→ ? €", VERT_OK)], 40), 0.9).move_to(P(0, 0.25))
        self.play(FadeIn(q, scale=1.3), run_time=0.4)
        self.insister(q, 1.1)
        self.appel_commentaire(y=-1.15)
