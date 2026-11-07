# decimal_additionner.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 07 : ADDITIONNER ET SOUSTRAIRE
# DES DÉCIMAUX (micro decimal_additionner, notion decimal_calcul), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE. Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux-additionner.js).
# Décor et métier : Romain, BOULANGER (centres : cuisine, argent-budget).
# Écrans : garde (00), situation (01), le sens (02), poser (03), retenue (04), QUESTION 1 (05),
# soustraction (06), piège (07), QUESTION 2 (08), défi (09) et correction (09b), appris (10), fin (11).
# Voix : manim/voix/6e-decimal-additionner.json (Julie, débit −6) ;
# marques : decimal_additionner_marques.json (python manim/scripts/6e/decimal_marques.py additionner).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_additionner.py DecimalAdditionner6e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_additionner.py DecimalAdditionner6e -o eleveai-maths-6e-decimal-additionner --media_dir manim/scripts/6e/media-dec-07
# Sortie : manim/sorties/6e/maths/decimaux/07-additionner/eleveai-maths-6e-decimal-additionner.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403

COUL_RANG = {1: "#34d399", 0: BLEU_D, -1: AMBRE_D, -2: ROSE_D}
FARINE = "#f5f5f4"
MOINS = "−"


class Pose(VGroup):
    """Une opération posée en colonnes, virgule sous virgule. lignes : ["2,35", "1,40"].
    Rien n'est ajouté que le signe et la barre : les chiffres se créent à la demande, à la
    bonne place (au mot), tous HORS AUDIT (le nombre entier est écrit à côté, au mot).
    Rang r : 1 dizaines, 0 unités, -1 dixièmes, -2 centièmes."""

    def __init__(self, lignes, signe="+", origine=ORIGIN, pas=0.56, hl=0.82, fs=56, gap=0.2, rmax=None, rmin=None):
        super().__init__()
        self.lignes, self.pas, self.hl, self.fs, self.gap = list(lignes), pas, hl, fs, gap
        self.o = VectorizedPoint(origine)
        self.add(self.o)
        ents = [s.split(",")[0] for s in lignes]
        decs = [(s.split(",") + [""])[1] for s in lignes]
        self.rmax = max(len(e) for e in ents) - 1 if rmax is None else rmax
        self.rmin = -max(len(d) for d in decs) if rmin is None else rmin
        n = len(lignes)
        self.signe = hors_audit(Text(signe, font_size=fs, color=WHITE, weight=BOLD)).move_to(self.pt(self.rmax + 1, n - 1))
        yb = self.pt(0, n - 1)[1] - hl * 0.55
        xg, xd = self.pt(self.rmax + 1, 0)[0] - pas * 0.5, self.pt(self.rmin, 0)[0] + pas * 0.6
        self.barre = Line(P(xg, yb), P(xd, yb), color=WHITE, stroke_width=5)
        self.add(self.signe, self.barre)

    def pt(self, r, i):
        """Le centre de la case du rang r, ligne i (i = len(lignes) : le résultat)."""
        x = -r * self.pas + (self.gap if r < 0 else 0)
        y = -i * self.hl - (0.2 if i >= len(self.lignes) else 0)
        return self.o.get_center() + P(x, y)

    def _t(self, s, r, i, couleur, fs=None):
        return hors_audit(Text(str(s), font_size=fs or self.fs, color=couleur, weight=BOLD).move_to(self.pt(r, i)))

    def chiffre(self, i, r, couleur=None):
        s = self.lignes[i]
        ent, dec = (s.split(",") + [""])[:2]
        v = ent[len(ent) - 1 - r] if r >= 0 else dec[-r - 1]
        return self._t(v, r, i, couleur or WHITE)

    def virgule(self, i):
        x = self.pt(0, i)[0] + (self.pas + self.gap) / 2
        y = self.pt(0, i)[1] - self.fs / 56 * 0.28
        return hors_audit(Text(",", font_size=self.fs, color=ROUGE_ERREUR, weight=BOLD).move_to(P(x, y)))

    def ligne(self, i, couleur=WHITE, sauf=()):
        s = self.lignes[i]
        ent, dec = (s.split(",") + [""])[:2]
        rs = [len(ent) - 1 - k for k in range(len(ent))] + [-(k + 1) for k in range(len(dec))]
        g = VGroup(*[self.chiffre(i, r, couleur) for r in rs if r not in sauf])
        if dec:
            g.add(self.virgule(i))
        return g

    def res(self, r, v, couleur=VERT_OK):
        return self._t(v, r, len(self.lignes), couleur)

    def ret(self, r, v, couleur=ORANGE_RETENUE, i=0):
        """Une retenue (ou un chiffre cassé) écrite petit, en haut à gauche de la case."""
        return self._t(v, r, i, couleur, fs=int(self.fs * 0.5)).shift(P(-self.pas * 0.42, self.hl * 0.42))

    def colonne(self, r, i0=0, i1=None):
        i1 = len(self.lignes) if i1 is None else i1
        a, b = self.pt(r, i0), self.pt(r, i1)
        return Rectangle(width=self.pas * 0.98, height=abs(a[1] - b[1]) + self.hl * 0.9, stroke_color=COUL_RANG.get(r, WHITE),
                         stroke_width=5, fill_opacity=0).move_to((a + b) / 2)


def romain(s=1.0):
    """Romain, boulanger : tablier blanc, toque."""
    p = visage(personne(peau="#e0ac69", tenue="#0f766e", cheveux="#3f2a14", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    toque = VGroup(RoundedRectangle(width=r * 1.7, height=r * 0.45, corner_radius=r * 0.1, fill_color=WHITE,
                                    fill_opacity=1, stroke_width=0).move_to(c + UP * r * 1.0),
                   *[Circle(radius=r * 0.52, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                     .move_to(c + UP * r * 1.55 + RIGHT * dx * r) for dx in (-0.45, 0.0, 0.45)])
    tab = Polygon(*[p.corps.get_center() + P(x * s, y * s) for x, y in ((-0.38, 0.45), (0.38, 0.45), (0.55, -0.85),
                                                                         (-0.55, -0.85))],
                  fill_color=WHITE, fill_opacity=1, stroke_width=0)
    p.add(tab, toque)
    return p


def sac(couleur=FARINE, mot="FARINE", s=1.0, encre="#92400e"):
    """Un sac (farine, sucre, beurre) : corps, haut replié, son nom."""
    corps = RoundedRectangle(width=1.2 * s, height=1.45 * s, corner_radius=0.18 * s, fill_color=couleur,
                             fill_opacity=1, stroke_color="#a8a29e", stroke_width=3)
    haut = Polygon(corps.get_corner(UL) + DOWN * 0.05 * s, corps.get_corner(UR) + DOWN * 0.05 * s,
                   corps.get_top() + UP * 0.28 * s + RIGHT * 0.25 * s, corps.get_top() + UP * 0.22 * s + LEFT * 0.3 * s,
                   fill_color=couleur, fill_opacity=1, stroke_color="#a8a29e", stroke_width=3)
    nom = hors_audit(Text(mot, font_size=int(22 * s), color=encre, weight=BOLD))
    if nom.width > corps.width * 0.84:
        nom.scale_to_fit_width(corps.width * 0.84)
    nom.move_to(corps.get_center() + UP * 0.15 * s)
    epi = VGroup(*[Ellipse(width=0.1 * s, height=0.2 * s, fill_color="#d97706", fill_opacity=1, stroke_width=0)
                   .move_to(corps.get_center() + P(0, -0.3 * s + 0.15 * k * s)).rotate(0.6 * (-1) ** k)
                   for k in range(3)])
    return VGroup(haut, corps, nom, epi)


def plaquette(s=1.0):
    """Une plaquette de beurre."""
    b = RoundedRectangle(width=1.5 * s, height=0.75 * s, corner_radius=0.08 * s, fill_color="#fde68a", fill_opacity=1,
                         stroke_color="#ca8a04", stroke_width=3)
    t = hors_audit(Text("BEURRE", font_size=int(22 * s), color="#a16207", weight=BOLD)).move_to(b)
    return VGroup(b, t)


def brioche(s=1.0):
    g = VGroup(*[Circle(radius=0.28 * s, fill_color="#d97706", fill_opacity=1, stroke_color="#92400e", stroke_width=3)
                 .move_to(P(dx * s, dy * s)) for dx, dy in ((-0.22, 0), (0.22, 0), (0, 0.3))])
    return g


def tarte(s=1.0):
    fond = Circle(radius=0.48 * s, fill_color="#f59e0b", fill_opacity=1, stroke_color="#92400e", stroke_width=4)
    fruits = VGroup(*[Dot(P(0.28 * s * np.cos(a), 0.28 * s * np.sin(a)), radius=0.08 * s, color="#dc2626")
                      for a in np.linspace(0, 2 * PI, 7)[:-1]])
    return VGroup(fond, fruits, Dot(ORIGIN, radius=0.09 * s, color="#dc2626"))


class DecimalAdditionnerBase(PaysageDecimal):
    nom_voix = "6e-decimal-additionner"
    fichier_marques = "decimal_additionner_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """Le compte à rebours (5, 4, 3…) n'est pas un nombre dit : hors synchro (sinon « TARD 5 »)."""
        r = super()._disposer_q(question, choix, phrase)
        for f in r[4].get_family():
            f.sans_synchro = True
        return r

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Additionner et soustraire des nombres décimaux", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Additionner")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment poser", "le calcul ?"], 46).move_to(P(-3.5, 0.35))
        # une addition posée, cases vides : virgule sous virgule
        cases = VGroup()
        for i in range(2):
            for x in (1.9, 2.55, 3.4, 4.05):
                cases.add(DashedVMobject(Square(0.55, stroke_color=WHITE, stroke_width=3), num_dashes=16)
                          .move_to(P(x, 1.0 - 0.75 * i)))
        virg = VGroup(*[Dot(P(2.98, 0.78 - 0.75 * i), radius=0.09, color=ROUGE_ERREUR) for i in range(2)])
        plus = Text("+", font_size=56, color=WHITE, weight=BOLD).move_to(P(1.2, 0.25))
        barre = Line(P(1.0, -0.25), P(4.45, -0.25), color=WHITE, stroke_width=5)
        fl = Arrow(P(2.98, 1.65), P(2.98, 1.05), color=ROUGE_ERREUR, buff=0, stroke_width=6)
        self.au_mot("Comment")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(cases), FadeIn(plus), Create(barre), run_time=0.45)
        self.play(FadeIn(virg, scale=2), GrowArrow(fl), run_time=0.5)
        self.play(Indicate(virg, color=ROUGE_ERREUR, scale_factor=1.6), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Romain, boulanger ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        rm = romain(1.05).move_to(P(-5.2, 0.0))
        self.au_mot("Voici Romain")
        nom = self.t("Romain", 42, BLEU_CALCUL).next_to(rm, UP, buff=0.2)
        self.play(FadeIn(rm, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("boulanger")
        met = self.t("boulanger", 32, BLEU_CALCUL).next_to(rm, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        s1 = sac(FARINE, "FARINE", 1.0).move_to(P(-2.75, -0.5))
        s2 = sac("#d6b48a", "FARINE", 1.0).move_to(P(-1.3, -0.5))
        l1 = self.ligne([("Il verse", WHITE), ("2,35 kg", BLEU_D)], 38, buff=0.2)
        self.col(l1, 2.3)
        l1b = self.t("de farine blanche,", 38)
        self.col(l1b, 1.65)
        self.au_mot("Pour son pain")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2,35")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.3)
        self.au_mot("farine blanche")
        self.play(FadeIn(l1b, shift=UP * 0.1), FadeIn(s1, shift=DOWN * 0.4), run_time=0.35)
        l2 = self.ligne([("puis", WHITE), ("1,4 kg", AMBRE_D)], 38, buff=0.2)
        self.col(l2, 0.8)
        l2b = self.t("de farine complète.", 38)
        self.col(l2b, 0.15)
        self.au_mot("puis 1,4")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1,4")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.3)
        self.au_mot("farine complète")
        self.play(FadeIn(l2b, shift=UP * 0.1), FadeIn(s2, shift=DOWN * 0.4), run_time=0.35)
        self.au_mot("Combien")
        q = self.t("Combien en tout ?", 46, JAUNE_TITRE)
        self.col(q, -1.1)
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(VGroup(s1, s2)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le sens : rang avec rang ───────────────────────────────────────
    def ecran_sens(self):
        self.ecran("02-sens")
        po = Pose(["2,35", "1,40"], origine=P(-3.2, 1.6), pas=0.8, hl=1.0, fs=60, gap=0.3)
        l0, l1 = po.ligne(0), po.ligne(1)
        self.add(po, l0, l1)
        self.au_mot("On ajoute")
        tit = self.t("On ajoute :", 42, JAUNE_TITRE)
        self.col(tit, 2.7, xl=0.6)
        self.play(Write(tit), run_time=0.35)
        lignes = []
        for k, (txt, r, mot) in enumerate((("les unités aux unités,", 0, "les unités"),
                                           ("les dixièmes aux dixièmes,", -1, "les dixièmes"),
                                           ("les centièmes aux centièmes.", -2, "les centièmes"))):
            lg = self.t(txt, 36, COUL_RANG[r])
            self.col(lg, 1.8 - 0.68 * k, xl=0.6)
            self.au_mot(mot)
            cad = po.colonne(r, 0, 1)
            self.play(FadeIn(lg, shift=UP * 0.1), Create(cad), run_time=0.4)
            lignes.append(lg)
        self.au_mot("C'est pour ça")
        l4 = self.t("C'est pour ça qu'on pose", 36)
        self.col(l4, -0.55, xl=0.6)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("virgule sous virgule")
        g = self.gros("virgule sous virgule !", ROUGE_ERREUR, fs=40)
        self.col(g, -1.45, xl=0.6)
        fl = Arrow(po.virgule(0).get_center() + DOWN * 0.15, po.virgule(1).get_center() + UP * 0.25,
                   color=ROUGE_ERREUR, buff=0.05, stroke_width=6, max_tip_length_to_length_ratio=0.4)
        self.play(FadeIn(g, scale=1.2), GrowArrow(fl), Indicate(VGroup(l0[-1], l1[-1]), color=ROUGE_ERREUR,
                                                                 scale_factor=1.8), run_time=0.5)
        self.attendre_voix()

    # ── 03 : poser 2,35 + 1,4 ───────────────────────────────────────────────
    def ecran_pose(self):
        self.ecran("03-pose")
        po = Pose(["2,35", "1,40"], origine=P(-3.6, 2.2))
        self.au_mot("On pose")
        l0 = self.ligne([("On pose", WHITE), ("2,35", BLEU_D), ("+ 1,4,", AMBRE_D)], 36, buff=0.16)
        self.col(l0, 2.75, xl=-0.6)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("2,35 plus")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(po.ligne(0), shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("1,4, virgule")
        self.play(FadeIn(l0[2], shift=UP * 0.1), FadeIn(po.ligne(1, sauf=(-2,)), shift=DOWN * 0.1), FadeIn(po.signe),
                  Create(po.barre), run_time=0.3)
        self.au_mot("virgule sous virgule")
        l1 = self.t("virgule sous virgule.", 36, ROUGE_ERREUR)
        self.col(l1, 2.15, xl=-0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(VGroup(po.virgule(0), po.virgule(1)), color=ROUGE_ERREUR,
                                                     scale_factor=1.8), run_time=0.4)
        self.au_mot("En bas")
        l2 = self.t("En bas, il manque un chiffre :", 34)
        self.col(l2, 1.5, xl=-0.6)
        trou = DashedVMobject(Square(0.5, stroke_color=ROSE_D, stroke_width=4), num_dashes=16).move_to(po.pt(-2, 1))
        self.play(FadeIn(l2, shift=UP * 0.1), Create(trou), run_time=0.35)
        lg = self.ligne([("1,4", AMBRE_D), ("= 1,40", AMBRE_D)], 36, buff=0.18)
        self.col(lg, 0.9, xl=-0.6)
        self.au_mot("1,4, c'est")
        self.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1,40")
        zero = po.chiffre(1, -2, ROSE_D)
        self.play(FadeIn(lg[1], scale=1.2), FadeOut(trou), FadeIn(zero, scale=1.8), run_time=0.35)
        cadres = {}

        def cadre(r):
            cadres[r] = po.colonne(r)
            return Create(cadres[r])

        def fin(r):
            return FadeOut(cadres[r])

        # (pas à pas écrit à la main : la case du résultat se remplit avec le « = n »)
        for k, (mot, r, a, b, s, c) in enumerate((("Centièmes", -2, "5", "0", "5", ROSE_D),
                                                  ("Dixièmes", -1, "3", "4", "7", AMBRE_D),
                                                  ("Unités", 0, "2", "1", "3", BLEU_D))):
            lg = self.ligne([(mot + " :", c), (f"{a} + {b}", WHITE), (f"= {s}", VERT_OK)], 34, buff=0.16)
            self.col(lg, 0.05 - 0.6 * k, xl=-0.6)
            self.au_mot(mot)
            self.play(FadeIn(lg[0], shift=UP * 0.1), cadre(r), run_time=0.3)
            self.au_mot(f"{a} plus {b}")
            self.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
            self.play(FadeIn(lg[2], shift=UP * 0.1), FadeIn(po.res(r, s), scale=1.6), run_time=0.3)
            self.play(fin(r), run_time=0.2)
        self.au_mot("On descend")
        l5 = self.t("On descend la virgule :", 34, ROUGE_ERREUR)
        self.col(l5, -1.75, xl=-0.6)
        vr = po.virgule(1)
        vb = po.virgule(2)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.play(vr.copy().animate.move_to(vb), run_time=0.45)
        self.au_mot("3,75")
        g = self.gros("3,75 kg", fs=56).move_to(P(-3.3, -2.05))
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 04 : avec une retenue ───────────────────────────────────────────────
    def ecran_retenue(self):
        self.ecran("04-retenue")
        po = Pose(["0,6", "0,9"], origine=P(-3.6, 1.9), pas=0.7, fs=62, hl=0.95)
        self.au_mot("Avec une retenue")
        tit = self.t("Avec une retenue :", 42, ORANGE_RETENUE)
        self.col(tit, 2.85, xl=0.6)
        self.play(Write(tit), run_time=0.35)
        lg0 = self.ligne([("0,6", WHITE), ("+ 0,9", WHITE)], 40, buff=0.2)
        self.col(lg0, 2.1, xl=0.6)
        self.au_mot("0,6")
        self.play(FadeIn(lg0[0], shift=UP * 0.1), FadeIn(po.ligne(0)), run_time=0.3)
        self.au_mot("0,9")
        self.play(FadeIn(lg0[1], shift=UP * 0.1), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre), run_time=0.3)
        lg1 = self.ligne([("Dixièmes :", AMBRE_D), ("6 + 9", WHITE), ("= 15 dixièmes.", VERT_OK)], 34, buff=0.16)
        self.col(lg1, 1.35, xl=0.6)
        cad = po.colonne(-1)
        self.au_mot("Dixièmes")
        self.play(FadeIn(lg1[0], shift=UP * 0.1), Create(cad), run_time=0.3)
        self.au_mot("6 plus 9")
        self.play(FadeIn(lg1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("15 dixièmes")
        self.play(FadeIn(lg1[2], shift=UP * 0.1), run_time=0.3)
        # 15 dixièmes : une barre pleine (une unité) et 5 parts
        b1 = barre_unite(10, larg=3.0, h=0.42, colories=10).move_to(P(-4.4, -1.55))
        b2 = barre_unite(10, larg=3.0, h=0.42, colories=5).move_to(P(-1.2, -1.55))
        self.play(FadeIn(b1), FadeIn(b2), run_time=0.4)
        self.au_mot("10 dixièmes font")
        l2 = self.t("10 dixièmes font une unité.", 34, BLEU_D)
        self.col(l2, 0.7, xl=0.6)
        self.play(FadeIn(l2, shift=UP * 0.1), b1.cadre.animate.set_stroke(BLEU_D, 9), run_time=0.4)
        lg3 = self.ligne([("J'écris 5,", VERT_OK), ("et je retiens 1", ORANGE_RETENUE)], 34, buff=0.16)
        self.col(lg3, 0.05, xl=0.6)
        lg3.add(self.t("aux unités.", 34))
        self.col(lg3[2], -0.55, xl=0.6)
        self.au_mot("J'écris 5")
        self.play(FadeIn(lg3[0], shift=UP * 0.1), FadeIn(po.res(-1, 5), scale=1.6), Indicate(b2, color=VERT_OK),
                  run_time=0.35)
        self.au_mot("je retiens 1")
        r1 = po.ret(0, 1)
        self.play(FadeIn(lg3[1], shift=UP * 0.1), FadeOut(cad), TransformFromCopy(b1, r1), run_time=0.4)
        self.au_mot("aux unités")
        self.play(FadeIn(lg3[2], shift=UP * 0.1), Indicate(r1, color=ORANGE_RETENUE, scale_factor=1.8), run_time=0.35)
        self.au_mot("Résultat")
        l4 = self.t("Résultat :", 36)
        self.col(l4, -1.45, xl=0.6)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(po.res(0, 1), scale=1.6), FadeIn(po.virgule(2)), run_time=0.35)
        self.au_mot("1,5")
        g = self.gros("1,5", fs=60)
        self.col(g, -1.45, xl=3.15)
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        po = Pose(["2,80", "1,35"], origine=P(-3.6, 1.7), pas=0.62, fs=60, hl=0.9)

        def autres_q(sc):
            sc.play(FadeIn(po.ligne(0, sauf=(-2,))), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre),
                    run_time=0.35)

        def apres(sc):
            lg = sc.ligne_rep(0, ["2,8,", "c'est 2,80."])
            sc.au_mot("2,8, c'est")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("2,80")
            sc.play(FadeIn(lg[1], shift=UP * 0.1), FadeIn(po.chiffre(0, -2, ROSE_D), scale=1.8), run_time=0.3)
            lg2 = sc.ligne_rep(1, ["2,80 + 1,35", "= 4,15."])
            sc.au_mot("2,80 plus")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("4,15")
            res = VGroup(po.res(0, 4), po.res(-1, 1), po.res(-2, 5), po.virgule(2))
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), FadeIn(res, scale=1.4), FadeIn(po.ret(0, 1)), run_time=0.35)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Combien font 2,8 + 1,35 ?"],
                            [self.t("1,63", 36), self.t("4,15", 36), self.t("3,43", 36)], 1,
                            ["2,8, c'est 2,80.", "2,80 + 1,35 = 4,15."], mot_q="Combien",
                            autres_q=autres_q, autres_r=apres)

    # ── 06 : la soustraction ────────────────────────────────────────────────
    def ecran_soustraction(self):
        self.ecran("06-soustraction")
        pq = plaquette(1.0).move_to(P(-5.3, 2.75))
        po = Pose(["3,2", "1,5"], signe=MOINS, origine=P(-3.0, 1.55), pas=0.75, fs=62, hl=0.95)
        lg0 = self.ligne([("Romain a", WHITE), ("3,2 kg", BLEU_D), ("de beurre.", WHITE)], 34, buff=0.16)
        self.col(lg0, 2.85, xl=-0.6)
        self.au_mot("Romain avait")
        self.play(FadeIn(lg0[0], shift=UP * 0.1), FadeIn(pq, shift=DOWN * 0.2), run_time=0.3)
        self.au_mot("3,2 kilogrammes")
        self.play(FadeIn(lg0[1], scale=1.2), run_time=0.3)
        self.au_mot("de beurre")
        self.play(FadeIn(lg0[2], shift=UP * 0.1), run_time=0.25)
        lg1 = self.ligne([("Il en utilise", WHITE), ("1,5.", AMBRE_D)], 34, buff=0.16)
        self.col(lg1, 2.25, xl=-0.6)
        self.au_mot("Il en utilise")
        self.play(FadeIn(lg1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1,5. Combien")
        self.play(FadeIn(lg1[1], scale=1.2), run_time=0.3)
        self.au_mot("Combien")
        q = self.t("Combien en reste-t-il ?", 36, JAUNE_TITRE)
        self.col(q, 1.65, xl=-0.6)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.3)
        self.au_mot("On pose")
        self.au_mot("3,2 moins")
        self.play(FadeIn(po.ligne(0)), run_time=0.3)
        self.au_mot("1,5. Dixièmes")
        self.play(FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre), run_time=0.3)
        cad = po.colonne(-1)
        lg2 = self.ligne([("Dixièmes :", AMBRE_D), ("2 − 5,", WHITE), ("impossible !", ROUGE_ERREUR)], 34, buff=0.16)
        self.col(lg2, 0.95, xl=-0.6)
        self.au_mot("Dixièmes")
        self.play(FadeIn(lg2[0], shift=UP * 0.1), Create(cad), run_time=0.3)
        self.au_mot("2 moins 5")
        self.play(FadeIn(lg2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("impossible")
        self.play(FadeIn(lg2[2], scale=1.2), Wiggle(po.chiffre(0, -1)), run_time=0.4)
        lg3 = self.ligne([("On casse une unité :", BLEU_D)], 34, buff=0.16)
        self.col(lg3, 0.35, xl=-0.6)
        lg4 = self.ligne([("10 dixièmes,", AMBRE_D), ("donc", WHITE), ("12 dixièmes.", AMBRE_D)], 32, buff=0.16)
        self.col(lg4, -0.25, xl=-0.6)
        trois = po.chiffre(0, 0)
        barre3 = Line(trois.get_corner(DL) + LEFT * 0.05, trois.get_corner(UR) + RIGHT * 0.05, color=ROUGE_ERREUR,
                      stroke_width=6)
        deux = po.ret(0, 2, BLEU_D).shift(RIGHT * 0.32 + UP * 0.05)
        self.au_mot("On casse")
        self.play(FadeIn(lg3[0], shift=UP * 0.1), Create(barre3), FadeIn(deux, scale=1.5), run_time=0.4)
        self.au_mot("10 dixièmes")
        un = po.ret(-1, 1, AMBRE_D)
        self.play(FadeIn(lg4[0], shift=UP * 0.1), TransformFromCopy(trois, un), run_time=0.35)
        self.au_mot("12 dixièmes")
        self.play(FadeIn(lg4[1]), FadeIn(lg4[2], scale=1.2), Indicate(un, color=AMBRE_D, scale_factor=1.8),
                  run_time=0.3)
        lg5 = self.ligne([("12 − 5", WHITE), ("= 7.", VERT_OK)], 34, buff=0.16)
        self.col(lg5, -0.85, xl=-0.6)
        self.au_mot("12 moins 5")
        self.play(FadeIn(lg5[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(lg5[1], shift=UP * 0.1), FadeIn(po.res(-1, 7), scale=1.6), FadeOut(cad), run_time=0.3)
        cadu = po.colonne(0)
        lg6 = self.ligne([("Il reste 2 unités :", BLEU_D), ("2 − 1", WHITE), ("= 1.", VERT_OK)], 34, buff=0.16)
        self.col(lg6, -1.45, xl=-0.6)
        self.au_mot("Il reste 2")
        self.play(FadeIn(lg6[0], shift=UP * 0.1), Create(cadu), Indicate(deux, color=BLEU_D, scale_factor=1.8),
                  run_time=0.25)
        self.au_mot("unités. 2 moins 1")
        self.play(FadeIn(lg6[1], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(lg6[2], shift=UP * 0.1), FadeIn(po.res(0, 1), scale=1.6), FadeIn(po.virgule(2)), run_time=0.3)
        self.play(FadeOut(cadu), run_time=0.2)
        self.au_mot("1,7")
        g = self.gros("1,7 kg", fs=56).move_to(P(-3.3, -2.3))
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 07 : le piège du nombre entier ──────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention !", 46, ROUGE_ERREUR)
        self.col(tit, 2.85, xl=0.6)
        self.play(Write(tit), run_time=0.35)
        po = Pose(["5,00", "2,75"], signe=MOINS, origine=P(-3.6, 2.3), pas=0.62, fs=58, hl=0.88)
        lg0 = self.ligne([("5", WHITE), ("− 2,75", WHITE)], 42, buff=0.2)
        self.col(lg0, 2.15, xl=0.6)
        self.au_mot("5 moins")
        self.play(FadeIn(lg0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("2,75")
        self.play(FadeIn(lg0[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Où est")
        l1 = self.t("Où est la virgule de 5 ?", 36, JAUNE_TITRE)
        self.col(l1, 1.45, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Elle est cachée")
        l2 = self.t("Elle est cachée :", 36)
        self.col(l2, 0.8, xl=0.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        lg3 = self.ligne([("5", WHITE), ("= 5,00", ROSE_D)], 40, buff=0.2)
        self.col(lg3, 0.15, xl=0.6)
        self.au_mot("5, c'est")
        self.play(FadeIn(lg3[0], shift=UP * 0.1), FadeIn(po.chiffre(0, 0)), run_time=0.25)
        self.au_mot("5,00")
        self.play(FadeIn(lg3[1], scale=1.2), FadeIn(po.virgule(0), scale=2), FadeIn(po.chiffre(0, -1, ROSE_D), scale=1.6),
                  FadeIn(po.chiffre(0, -2, ROSE_D), scale=1.6), run_time=0.35)
        self.au_mot("On pose")
        l4 = self.t("Virgule sous virgule,", 34, ROUGE_ERREUR)
        self.col(l4, -0.5, xl=0.6)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre), run_time=0.35)
        self.au_mot("on calcule")
        l5 = self.t("on calcule :", 34)
        self.col(l5, -1.3, xl=0.6)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.au_mot("2,25. On")
        res = VGroup(po.res(0, 2), po.res(-1, 2), po.res(-2, 5), po.virgule(2))
        g = self.gros("2,25", fs=46)
        self.col(g, -1.3, xl=3.4)
        self.play(FadeIn(res, scale=1.4), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("On vérifie")
        l6 = self.t("On vérifie :", 32, ORANGE_RETENUE).move_to(P(-3.6, -1.35))
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.3)
        lg7 = self.ligne([("2,25", VERT_OK), ("+ 2,75", WHITE), ("= 5", VERT_OK)], 38, buff=0.18).move_to(P(-3.4, -2.1))
        self.au_mot("2,25 plus")
        self.play(FadeIn(lg7[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("2,75, ça")
        self.play(FadeIn(lg7[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("fait 5")
        self.play(FadeIn(lg7[2], scale=1.3), run_time=0.3)
        self.play(Indicate(lg7[2], color=VERT_OK, scale_factor=1.4), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        po = Pose(["7,0", "2,4"], signe=MOINS, origine=P(-3.4, 1.7), pas=0.72, fs=62, hl=0.92)

        def autres_q(sc):
            sc.play(FadeIn(po.chiffre(0, 0)), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre), run_time=0.35)

        def apres(sc):
            lg = sc.ligne_rep(0, ["7,", "c'est 7,0."])
            sc.au_mot("7, c'est")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("7,0. 7")
            sc.play(FadeIn(lg[1], shift=UP * 0.1), FadeIn(po.virgule(0), scale=2),
                    FadeIn(po.chiffre(0, -1, ROSE_D), scale=1.8), run_time=0.3)
            lg2 = sc.ligne_rep(1, ["7,0 − 2,4", "= 4,6."])
            sc.au_mot("7,0 moins")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("4,6")
            res = VGroup(po.res(0, 4), po.res(-1, 6), po.virgule(2))
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), FadeIn(res, scale=1.4), run_time=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Combien font 7 − 2,4 ?"],
                            [self.t("5,4", 36), self.t("4,6", 36), self.t("5,6", 36)], 1,
                            ["7, c'est 7,0.", "7,0 − 2,4 = 4,6."], mot_q="Combien",
                            autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        su = sac(WHITE, "SUCRE", 1.15).move_to(P(-4.9, 1.1))
        br = brioche(1.0).move_to(P(-2.6, 1.3))
        ta = tarte(1.0).move_to(P(-2.6, -0.3))
        lg0 = self.ligne([("Romain a", WHITE), ("8,5 kg", BLEU_D), ("de sucre.", WHITE)], 36, buff=0.16)
        self.col(lg0, 2.2, xl=-1.2)
        self.au_mot("Romain a")
        self.play(FadeIn(lg0[0], shift=UP * 0.1), FadeIn(su, shift=DOWN * 0.3), run_time=0.3)
        self.au_mot("8,5")
        self.play(FadeIn(lg0[1], scale=1.2), run_time=0.3)
        self.au_mot("de sucre")
        self.play(FadeIn(lg0[2], shift=UP * 0.1), run_time=0.25)
        lg1 = self.ligne([("Il en utilise", WHITE), ("2,75", AMBRE_D), ("pour des brioches,", WHITE)], 34, buff=0.16)
        self.col(lg1, 1.45, xl=-1.2)
        self.au_mot("Il en utilise")
        self.play(FadeIn(lg1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("2,75")
        self.play(FadeIn(lg1[1], scale=1.2), run_time=0.3)
        self.au_mot("pour des brioches")
        self.play(FadeIn(lg1[2], shift=UP * 0.1), FadeIn(br, scale=1.3), run_time=0.3)
        lg2 = self.ligne([("puis", WHITE), ("1,6", AMBRE_D), ("pour des tartes.", WHITE)], 34, buff=0.16)
        self.col(lg2, 0.75, xl=-1.2)
        self.au_mot("puis 1,6")
        self.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1,6")
        self.play(FadeIn(lg2[1], scale=1.2), run_time=0.3)
        self.au_mot("pour des tartes")
        self.play(FadeIn(lg2[2], shift=UP * 0.1), FadeIn(ta, scale=1.3), run_time=0.3)
        self.au_mot("Combien")
        q = self.t("Combien lui en reste-t-il ?", 38, JAUNE_TITRE)
        self.col(q, -0.2, xl=-1.2)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(su), run_time=0.45)
        self.pause_defi(y=-1.2)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        p1 = Pose(["2,75", "1,60"], origine=P(-5.0, 1.9), pas=0.5, fs=46, hl=0.72, gap=0.16)
        p2 = Pose(["8,50", "4,35"], signe=MOINS, origine=P(-2.0, 1.9), pas=0.5, fs=46, hl=0.72, gap=0.16)
        self.au_mot("Il utilise")
        l1 = self.t("Il utilise :", 34)
        self.col(l1, 2.25, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.25)
        lg1 = self.ligne([("2,75", AMBRE_D), ("+ 1,6", AMBRE_D), ("= 4,35.", VERT_OK)], 38, buff=0.18)
        self.col(lg1, 1.6, xl=0.6)
        self.au_mot("2,75 plus")
        self.play(FadeIn(lg1[0], shift=UP * 0.1), FadeIn(p1.ligne(0)), run_time=0.3)
        self.au_mot("1,6")
        self.play(FadeIn(lg1[1], shift=UP * 0.1), FadeIn(p1.ligne(1, sauf=(-2,))), FadeIn(p1.signe), Create(p1.barre),
                  FadeIn(p1.chiffre(1, -2, ROSE_D)), run_time=0.3)
        self.au_mot("4,35")
        r1 = VGroup(p1.res(0, 4), p1.res(-1, 3), p1.res(-2, 5), p1.virgule(2), p1.ret(0, 1))
        self.play(FadeIn(lg1[2], scale=1.2), FadeIn(r1, scale=1.3), run_time=0.35)
        self.au_mot("Il reste")
        l2 = self.t("Il reste :", 34)
        self.col(l2, 0.8, xl=0.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        lg2 = self.ligne([("8,50", BLEU_D), ("− 4,35", VERT_OK)], 38, buff=0.18)
        self.col(lg2, 0.15, xl=0.6)
        self.au_mot("8,50")
        self.play(FadeIn(lg2[0], shift=UP * 0.1), FadeIn(p2.ligne(0, sauf=(-2,))), FadeIn(p2.chiffre(0, -2, ROSE_D)),
                  run_time=0.3)
        self.au_mot("4,35 :")
        self.play(FadeIn(lg2[1], shift=UP * 0.1), FadeIn(p2.ligne(1)), FadeIn(p2.signe), Create(p2.barre),
                  run_time=0.3)
        self.au_mot("4,15")
        r2 = VGroup(p2.res(0, 4), p2.res(-1, 1), p2.res(-2, 5), p2.virgule(2))
        g = self.gros("= 4,15 kg", fs=48)
        self.col(g, -0.75, xl=0.6)
        self.play(FadeIn(r2, scale=1.3), FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.15, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        po = Pose(["2,35", "1,40"], origine=P(-3.4, 1.0), pas=0.6, fs=58, hl=0.88)
        fig = VGroup(po, po.ligne(0), po.ligne(1, sauf=(-2,)), po.chiffre(1, -2, ROSE_D), po.res(0, 3), po.res(-1, 7),
                     po.res(-2, 5), po.virgule(2))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On pose virgule", "sous virgule."),
            ("On complète", "avec des zéros."),
            ("On calcule comme avec des entiers,", "et on descend la virgule.")], fs=36)
        self.au_mot("On pose")
        self.montrer_ligne(lignes[0], Indicate(VGroup(fig[1][-1], fig[2][-1]), color=ROUGE_ERREUR, scale_factor=1.3))
        self.au_mot("On complète")
        self.montrer_ligne(lignes[1], Indicate(fig[3], color=ROSE_D, scale_factor=1.8))
        self.au_mot("Puis on calcule")
        self.montrer_ligne(lignes[2], Indicate(fig[-1], color=ROUGE_ERREUR, scale_factor=2.0))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_sens()
        self.ecran_pose()
        self.ecran_retenue()
        self.ecran_question1()
        self.ecran_soustraction()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class DecimalAdditionner6e(DecimalAdditionnerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
