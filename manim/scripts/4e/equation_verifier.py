# equation_verifier.py
# EleveAI — Maths 4e — série « Équations », épisode 06 : VÉRIFIER UNE SOLUTION.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : equation_verifier.
# Décor et métier : ESPACE (Aïcha, ingénieure du spatial). Centres : espace, sciences.
# Écrans : garde (00) ; le tableau de contrôle (01) ; on remplace x (02) ; le tableau
# d'essais de 3x = 9 (03) ; QUESTION 1 (03q) ; vérifier démasque (04) ; et zéro ? (05) ;
# QUESTION 2 (05q) ; x des deux côtés (06) ; défi (07) et correction (07b) ; ce que tu
# as appris (08) ; fin (09).
# Voix : manim/voix/4e-equation-verifier.json (validée, débit −6) ;
# marques : equation_verifier_marques.json.
#
# Complète equation_commun.py (lecture seule), ICI : Fusee, Voyant, Panneau, DeuxCases,
# Loupe, E() et PAROLE (« 1,6 »), _OutilsVerif (ph_eq, _cartes_larges).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/equation_verifier.py EquationVerifier4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/equation_verifier.py EquationVerifier4e -o eleveai-maths-4e-equation-verifier --media_dir manim/scripts/4e/media-eq-06
# Sortie : manim/sorties/4e/maths/equations/06-verifier/eleveai-maths-4e-equation-verifier.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402

PAROLE.update({"1,6": "1 virgule 6"})
FOND_C = "#0b1220"
GRIS_C = "#64748b"


def E(s, fs=60, **kw):
    """Une Eq dont les décimaux (« 1,6 », dit « 1 virgule 6 ») ne passent pas à l'audit."""
    e = Eq(s, fs, **kw)
    for a in e.atomes:
        if "," in a.original_text and a.original_text[0].isdigit():
            a._pas_audit = True
    return e


class Fusee(VGroup):
    """La fusée sur son pas de tir : .flamme (à montrer au décollage), .hublot."""

    def __init__(self, s=1.0, **kw):
        super().__init__(**kw)
        corps = RoundedRectangle(width=0.9, height=2.1, corner_radius=0.16, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
        nez = Polygon(P(-0.45, 0.9), P(0.45, 0.9), P(0, 1.75), fill_color=PIEGE, fill_opacity=1, stroke_width=0)
        self.hublot = Circle(radius=0.2, fill_color=INCONNUE, fill_opacity=1, stroke_color="#475569", stroke_width=4).move_to(P(0, 0.4))
        ailes = VGroup(Polygon(P(-0.45, -0.3), P(-0.45, -1.05), P(-0.95, -1.3), fill_color=PIEGE, fill_opacity=1, stroke_width=0),
                       Polygon(P(0.45, -0.3), P(0.45, -1.05), P(0.95, -1.3), fill_color=PIEGE, fill_opacity=1, stroke_width=0))
        self.flamme = VGroup(Polygon(P(-0.3, -1.05), P(0.3, -1.05), P(0, -1.95), fill_color=OPERATION, fill_opacity=1, stroke_width=0),
                             Polygon(P(-0.15, -1.05), P(0.15, -1.05), P(0, -1.55), fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0))
        self.flamme.set_opacity(0)
        self.add(self.flamme, ailes, corps, nez, self.hublot)
        self.scale(s)

    def allumer(self):
        return self.flamme.animate.set_opacity(1)


class Voyant(VGroup):
    """Un voyant rond, éteint (gris) ; .vert() .rouge() .orange() : les animations."""

    def __init__(self, r=0.26, s=None, fs=30, **kw):
        super().__init__(**kw)
        self.rond = Circle(radius=r, fill_color="#1e293b", fill_opacity=1, stroke_color=GRIS_C, stroke_width=3)
        self.add(self.rond)
        if s:
            self.txt = T(s, fs, WHITE, audit=False, gras=True).move_to(self.rond)
            self.add(self.txt)

    def vert(self):
        return self.rond.animate.set_fill(VERT_OK, 1).set_stroke("#bbf7d0", 4)

    def rouge(self):
        return self.rond.animate.set_fill(PIEGE, 1).set_stroke("#fecaca", 4)

    def orange(self):
        return self.rond.animate.set_fill(OPERATION, 1).set_stroke("#fed7aa", 4)


class Panneau(VGroup):
    """Le tableau de contrôle : un cadre et ses voyants (.voyants), éteints."""

    def __init__(self, lignes=2, colonnes=3, r=0.26, pas=0.85, **kw):
        super().__init__(**kw)
        w, h = colonnes * pas + 0.15, lignes * pas + 0.15
        self.cadre = RoundedRectangle(width=w, height=h, corner_radius=0.14, fill_color="#111827", fill_opacity=1,
                                      stroke_color=GRIS_C, stroke_width=3)
        self.voyants = VGroup()
        for i in range(lignes):
            for j in range(colonnes):
                self.voyants.add(Voyant(r).move_to(P((j - (colonnes - 1) / 2) * pas, ((lignes - 1) / 2 - i) * pas)))
        self.add(self.cadre, self.voyants)


class DeuxCases(VGroup):
    """Gauche et droite calculées chacune dans SA case ; le signe (= ou ≠) entre les deux.
    .cg .cd : les cases ; .yh .yb : la rangée du haut et celle du résultat (3 rangs :
    rangs=3 donne .ym au milieu)."""

    def __init__(self, xg, xd, y, wg, wd, h, rangs=2, **kw):
        super().__init__(**kw)
        self.cg = RoundedRectangle(width=wg, height=h, corner_radius=0.12, fill_color=FOND_C, fill_opacity=1, stroke_color=GRIS_C, stroke_width=3).move_to(P(xg, y))
        self.cd = RoundedRectangle(width=wd, height=h, corner_radius=0.12, fill_color=FOND_C, fill_opacity=1, stroke_color=GRIS_C, stroke_width=3).move_to(P(xd, y))
        self.add(self.cg, self.cd)
        self.xg, self.xd = xg, xd
        self.x_signe = (xg + wg / 2 + xd - wd / 2) / 2
        k = h / (rangs * 2)
        self.yh = y + h / 2 - k
        self.yb = y - h / 2 + k
        self.ym = y

    def etiquettes(self, fs=24, g="à gauche", d="à droite"):
        tg = T(g, fs, CIEL, audit=False).next_to(self.cg, UP, buff=0.1)
        td = T(d, fs, CIEL, audit=False).next_to(self.cd, UP, buff=0.1)
        td.align_to(tg, UP)  # même ligne d'écriture (le g de « gauche » descend)
        return tg, td

    def signe(self, s, couleur, fs=72):
        return T(s, fs, couleur, audit=False, gras=True).move_to(P(self.x_signe, self.yb))

    def colorer(self, couleur):
        return [self.cg.animate.set_stroke(couleur, 5), self.cd.animate.set_stroke(couleur, 5)]


class Loupe(VGroup):
    """La loupe de celui qui contrôle."""

    def __init__(self, s=1.0, couleur=None, **kw):
        super().__init__(**kw)
        c = couleur or CIEL
        self.add(Line(P(0.3, -0.3), P(0.75, -0.75), color=c, stroke_width=10),
                 Circle(radius=0.42, stroke_color=c, stroke_width=7, fill_color="#0f172a", fill_opacity=0.6))
        self.scale(s)


class _OutilsVerif:
    """Ce que la paysage et le short de l'épisode partagent."""

    def ph_eq(self, i, s, phrase, n=1, lettres="", couleur=None, premier=False):
        """La ligne i de la phrase de réponse, posée mot à mot (avec ses nombres)."""
        ref = self.ph_q[i]
        e = E(s, 30, couleur=couleur or VERT_OK, lettres=lettres)
        e.scale_to_fit_width(ref.width).move_to(ref)
        if config.frame_width > 8:
            e.align_to(ref, LEFT)
        sauf = []
        if premier:  # « Réponse » : dit pendant que la carte s'allume, il n'attend plus
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        self.dire_eq(e, phrase, n=n, echelle=1.0, rt=0.16, sauf=sauf)
        return e

    def mention(self, s, x, y, fs=44, couleur=WHITE, audit=True, lettres="xytn"):
        e = E(s, fs, couleur=couleur, lettres=lettres).move_to(P(x, y))
        return e.sans_audit() if not audit else e


class EquationVerifier4e(_OutilsVerif, PaysageEq):
    nom_voix = "4e-equation-verifier"
    fichier_marques = "equation_verifier_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Vérifier une solution", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Vérifier", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        f = Fusee(0.8).move_to(P(-5.3, 0.1))
        l = Eq("Comment être sûr de sa réponse ?", 42, lettres="").move_to(P(1.2, 0.2))
        self.dire_eq(l, "Comment être sûr de sa réponse ?", echelle=1.0, rt=0.14, avec=[FadeIn(f, shift=UP * 0.3)])
        self.insister(l.atomes[-1], 1.5, 0.2)
        self.attendre_voix(marge=0.6)

    # ── 01 : Aïcha et son tableau de contrôle ───────────────────────────────
    def ecran_ingenieure(self):
        self.ecran("01-ingenieure")
        m = Metier(["Aïcha", "ingénieure", "dans le spatial"], fs=28, peau="#8d5524", tenue="#6366f1", longs=True, s=0.72)
        m.nom.arrange(DOWN, buff=0.08)
        m.nom.move_to(P(-4.95, 2.75))
        m.perso.next_to(m.nom, DOWN, buff=0.12).set_x(-4.95)
        self.au("Aïcha", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.3)
        self.au("ingénieure", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.2)
        self.au("dans le spatial", FadeIn(m.nom[2], shift=UP * 0.1), rt=0.2)
        fu = Fusee(0.92).move_to(P(-1.75, 1.85))
        pn = Panneau(2, 3).move_to(P(2.75, 2.2))
        self.au("lancement", FadeIn(fu, shift=UP * 0.3), FadeIn(pn), rt=0.3)
        vs = pn.voyants
        self.au("chaque calcul", vs[0].vert(), rt=0.2)
        self.play(vs[1].vert(), run_time=0.16)
        self.play(vs[2].vert(), run_time=0.16)
        self.au("est vérifié", vs[3].vert(), rt=0.16)
        self.play(vs[4].vert(), run_time=0.16)
        l1 = Eq("Pour une équation,", 30, lettres="").move_to(P(3.05, 0.85))
        self.dire_eq(l1, "Pour une équation,", echelle=1.0, rt=0.12)
        l2 = Eq("le contrôle prend dix secondes.", 30, lettres="").move_to(P(3.05, 0.35))
        self.dire_eq(l2, "le contrôle prend dix secondes.", echelle=1.0, rt=0.12)
        self.insister(VGroup(*l2.atomes[3:5]), 1.2, 0.14)
        c = Eq("Son collègue a résolu", 32, CIEL, lettres="").move_to(P(-4.0, -0.6))
        self.dire_eq(c, "Son collègue a résolu", echelle=1.0, rt=0.12)
        e = Eq("2x + 1 = 9", 62).move_to(P(-4.0, -1.45))
        self.dire_eq(e, "2 x plus 1 égale 9")
        t = Eq("et trouve", 34, CIEL, lettres="").move_to(P(0.05, -1.45))
        self.dire_eq(t, "et trouve", echelle=1.0, rt=0.12)
        s = Eq("x = 4", 62).move_to(P(2.75, -1.45))
        self.dire_eq(s, "x égale 4")
        q = Eq("Est-ce juste ?", 50, JAUNE_TITRE, lettres="").move_to(P(-0.6, -2.55))
        self.dire_eq(q, "Est-ce juste ?", echelle=1.0, rt=0.14, avec=[vs[5].orange()])
        self.insister(vs[5], 1.35, 0.16)
        self.attendre_voix(marge=0.4)

    # ── 02 : on remplace x ──────────────────────────────────────────────────
    def ecran_remplacer(self):
        self.ecran("02-remplacer")
        e0 = Eq("2x + 1 = 9", 62).sans_audit().move_to(P(-0.6, 1.72))
        l = Eq("Elle remplace x par 4 dans l'équation de départ.", 32).move_to(P(-0.4, 3.28))
        self.dire_eq(l, "Elle remplace x par 4 dans l'équation de départ.", echelle=1.0, rt=0.12, avec=[FadeIn(e0)])
        # la valeur glisse au-dessus du x (écrite collée, « 24 » se lirait vingt-quatre)
        v = T("4", 42, INCONNUE, audit=False, gras=True).move_to(l.atomes[4])
        x0 = e0.x[0]
        fl = Arrow(x0.get_top() + UP * 0.44, x0.get_top() + UP * 0.15, color=INCONNUE, buff=0, stroke_width=4, tip_length=0.13)
        self.play(v.animate.move_to(x0.get_top() + UP * 0.74), Create(fl), run_time=0.45)
        d = DeuxCases(-2.5, 2.3, -0.62, 3.9, 3.0, 2.6, rangs=3)
        tg, td = d.etiquettes()
        xd = d.xg
        y1, y2, y3 = d.yh, d.ym, d.yb
        a = Eq("2 × 4 + 1", 40).move_to(P(xd, y1))
        a.atomes[2].set_color(INCONNUE)
        self.play(FadeIn(d.cg), FadeIn(tg), run_time=0.15)
        self.dire_eq(a, "2 fois 4 plus 1", sauf=[a.atomes[2], a.atomes[3], a.atomes[4]])
        self.au("4 plus", TransformFromCopy(v, a.atomes[2]), rt=0.2)
        self.dire_eq(a, "4 plus 1", sauf=[a.atomes[0], a.atomes[1], a.atomes[2]])
        b = Eq("8 + 1", 40).move_to(P(xd, y2))
        self.dire_eq(b, "8 plus 1")
        c = Eq("9", 48).move_to(P(xd, y3))
        self.dire_eq(c, "1, 9")
        c2 = Eq("9", 48).move_to(P(d.xd, y3))
        self.au("À droite", FadeIn(d.cd), FadeIn(td), rt=0.2)
        self.dire_eq(c2, "droite, 9")
        eg = d.signe("=", VERT_OK)
        pn = Voyant(0.34).move_to(P(5.05, 0.9))
        f2 = Fusee(0.5).move_to(P(5.05, -0.55))
        self.play(FadeIn(pn), FadeIn(f2), run_time=0.15)
        l2 = Eq("Les deux membres sont égaux :", 36, lettres="").move_to(P(-1.2, -2.45))
        self.dire_eq(l2, "Les deux membres sont égaux :", echelle=1.0, rt=0.12, avec=[FadeIn(eg, scale=1.5), *d.colorer(VERT_OK)])
        self.insister(eg, 1.3, 0.14)
        l3 = Eq("4 est solution.", 50, VERT_OK, lettres="").move_to(P(-1.2, -3.1))
        l3.atomes[0].set_color(INCONNUE)
        self.dire_eq(l3, "4 est solution.", echelle=1.0, rt=0.14, avec=[pn.vert()])
        self.attendre_voix(marge=0.4)

    # ── 03 : le tableau d'essais ────────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("03-tableau")
        d1 = Eq("Une solution, c'est une valeur", 38, lettres="").move_to(P(-0.4, 3.15))
        d2 = Eq("qui rend l'égalité vraie.", 38, VERT_OK, lettres="").move_to(P(-0.4, 2.55))
        self.dire_eq(d1, "Une solution, c'est une valeur", echelle=1.0, rt=0.12)
        self.dire_eq(d2, "qui rend l'égalité vraie.", echelle=1.0, rt=0.12)
        e = Eq("3x = 9", 66).move_to(P(-4.45, 0.6))
        self.dire_eq(e, "3 x égale 9")
        self.play(e.egal.animate.set_color(EGAL), run_time=0.1)
        t = TableauEssais(["On essaie", "3x donne", "Vrai ?"], [2.6, 2.4, 2.2], n=3, h=0.82, fs=30, centre=P(1.55, 0.2), audit=False)
        oe = Eq("on essaie", 36, OPERATION, lettres="").move_to(P(-4.45, -0.25))
        self.dire_eq(oe, "on essaie", echelle=1.0, rt=0.12, avec=[FadeIn(t)])
        for r, (p, s, c, mot) in enumerate((("2", "6", PIEGE, "non"), ("3", "9", VERT_OK, "oui"), ("4", "12", PIEGE, "non"))):
            a = t.placer(Eq(p, 46), r, 0)
            b = t.placer(Eq(s, 46), r, 1)
            v = t.placer(Eq(mot, 36, c, lettres=""), r, 2)
            self.dire_eq(a, f"{p} donne {s}")
            self.dire_eq(b, f"{p} donne {s}")
            self.dire_eq(v, f"{s} : {mot}", echelle=1.0, avec=[Create(t.oui(r)) if c == VERT_OK else Create(t.non(r))])
        rang = SurroundingRectangle(VGroup(Dot(t.case(1, 0)).shift(LEFT * 1.2), Dot(t.case(1, 2)).shift(RIGHT * 1.0)), color=VERT_OK, buff=0.24, stroke_width=5, corner_radius=0.06)
        f = Eq("Seul 3 convient.", 46, VERT_OK, lettres="").move_to(P(-0.6, -2.55))
        self.dire_eq(f, "Seul 3 convient.", echelle=1.0, rt=0.14, avec=[Create(rang)])
        self.insister(f.atomes[1], 1.4, 0.15)
        self.attendre_voix(marge=0.4)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        d = DeuxCases(-4.85, -1.0, 0.35, 2.9, 2.1, 2.1)  # ≠ au large entre les cartes
        tg, td = d.etiquettes()
        rappel = Eq("3x = 9", 60).sans_audit().move_to(P(-3.1, 2.5))

        def avant(sc):
            sc.eq_dans_q(0, "Le nombre 2 est-il solution", "Le nombre 2 est-il solution", lettres="", fs=36)
            sc.eq_dans_q(0, "de 3x = 9 ?", "de 3 x égale 9 ?", fs=36)
            sc.play(FadeIn(rappel), FadeIn(d), FadeIn(tg), FadeIn(td), run_time=0.25)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : non.", "Réponse B : non.", premier=True)
            a = Eq("3 × 2", 44).move_to(P(d.xg, d.yh))
            sc.dire_eq(a, "3 fois 2")
            b = Eq("6", 52).move_to(P(d.xg, d.yb))
            sc.dire_eq(b, "2, 6")
            ne = d.signe("≠", PIEGE)
            sc.au("Ce n'est", FadeIn(ne, scale=1.5), *d.colorer(PIEGE), rt=0.2)
            c = Eq("9", 52).move_to(P(d.xd, d.yb))
            sc.ph_eq(1, "Ce n'est pas 9.", "Ce n'est pas 9.")
            sc.play(FadeIn(c, scale=1.3), run_time=0.12)
            sc.insister(ne, 1.3, 0.14)
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Le nombre 2 est-il solution", "de 3x = 9 ?"],
                            [Eq("oui", 34, lettres=""), Eq("non", 34, lettres=""), Eq("on ne peut pas savoir", 34, lettres="")], 1,
                            ["Réponse B : non.", "Ce n'est pas 9."], avant_q=avant, autres_r=apres)

    # ── 04 : vérifier démasque les erreurs ──────────────────────────────────
    def ecran_faux(self):
        self.ecran("04-faux")
        lo = Loupe(0.85).move_to(P(5.85, 3.0))
        t1 = T("Vérifier", 38, JAUNE_TITRE)
        t2 = Eq("démasque les erreurs.", 38, JAUNE_TITRE, lettres="")
        VGroup(t1, t2).arrange(RIGHT, buff=0.2).move_to(P(-0.3, 3.1))
        t2.shift(UP * (t1.get_bottom()[1] - t2.atomes[1].get_bottom()[1]))
        self.au("Vérifier", FadeIn(t1, shift=DOWN * 0.1), FadeIn(lo, scale=0.6), rt=0.2)
        self.dire_eq(t2, "démasque les erreurs.", echelle=1.0, rt=0.12)
        q = Eq("Quelqu'un écrit :", 32, CIEL, lettres="").move_to(P(-4.45, 2.3))
        self.dire_eq(q, "Quelqu'un écrit :", echelle=1.0, rt=0.12)
        e = Eq("5x = 8, donc x = 3", 54).move_to(P(1.35, 2.3))
        self.dire_eq(e, "5 x égale 8, donc x égale 3")
        sol = VGroup(*e.atomes[-3:])
        d = DeuxCases(-4.2, -0.4, 0.72, 2.9, 2.2, 1.62)
        self.au("On remplace", FadeIn(d), sol.animate.set_color(OPERATION), rt=0.2)
        a = Eq("5 × 3", 40).move_to(P(d.xg, d.yh))
        self.dire_eq(a, "5 fois 3")
        b = Eq("15", 46).move_to(P(d.xg, d.yb))
        self.dire_eq(b, "3, 15")
        ne = d.signe("≠", PIEGE, 62)
        self.au("Ce n'est", FadeIn(ne, scale=1.5), *d.colorer(PIEGE), rt=0.2)
        c = Eq("8", 46).move_to(P(d.xd, d.yb))
        self.dire_eq(c, "pas 8")
        ba = self.barrer(sol)
        v = self.verdict("C'est faux !", PIEGE, 40).move_to(P(3.0, 0.72))
        self.au("C'est faux", FadeIn(v, scale=1.4), Create(ba), rt=0.25)
        self.insister(v, 1.12, 0.14)
        lb = E("La bonne solution est 1,6 :", 38, couleur=VERT_OK, lettres="").move_to(P(-2.0, -0.58))
        self.dire_eq(lb, "La bonne solution est 1 virgule 6 :", echelle=1.0, rt=0.14)
        d2 = DeuxCases(-4.2, -0.4, -1.88, 2.9, 2.2, 1.62)
        a2 = E("5 × 1,6", 40).move_to(P(d2.xg, d2.yh))
        self.dire_eq(a2, "5 fois 1 virgule 6", avec=[FadeIn(d2)])
        b2 = Eq("8", 46).move_to(P(d2.xg, d2.yb))
        c2 = Eq("8", 46).sans_audit().move_to(P(d2.xd, d2.yb))
        eg = d2.signe("=", VERT_OK, 62)
        self.dire_eq(b2, "6, 8", avec=[FadeIn(c2), FadeIn(eg, scale=1.5), *d2.colorer(VERT_OK)])
        v2 = self.verdict("x = 1,6", VERT_OK, 40).move_to(P(3.0, -1.88))
        v2.texte._pas_audit = True
        self.play(FadeIn(v2, scale=1.3), run_time=0.2)
        self.attendre_voix(marge=0.4)

    # ── 05 : et zéro ? ──────────────────────────────────────────────────────
    def ecran_zero(self):
        self.ecran("05-zero")
        t = Eq("Et zéro ?", 52, JAUNE_TITRE, lettres="").move_to(P(-0.5, 3.05))
        self.dire_eq(t, "Et zéro ?", echelle=1.0, rt=0.14)
        l = Eq("0 est-il solution de 3x = 0 ?", 44).move_to(P(-0.5, 2.2))
        self.dire_eq(l, "0 est-il solution de 3 x égale 0 ?", echelle=1.1)
        d = DeuxCases(-4.2, -0.3, 0.28, 3.0, 2.2, 1.9)
        tg, td = d.etiquettes()
        self.play(FadeIn(d), FadeIn(tg), FadeIn(td), run_time=0.15)
        a = Eq("3 × 0", 42).move_to(P(d.xg, d.yh))
        bacs = VGroup(*[VGroup(RoundedRectangle(width=1.0, height=1.0, corner_radius=0.08, stroke_color=CIEL, stroke_width=3),
                               T("0", 40, CIEL, audit=False)) for _ in range(3)]).arrange(RIGHT, buff=0.16).move_to(P(3.6, 0.28))
        self.dire_eq(a, "3 fois 0", avec=[FadeIn(bacs, shift=LEFT * 0.2)])
        b = Eq("0", 48).move_to(P(d.xg, d.yb))
        c = Eq("0", 48).sans_audit().move_to(P(d.xd, d.yb))
        self._attendre_pos(self._texte_voix.find("0, 0") + 3)
        self.play(FadeIn(b, scale=1.3), FadeIn(c, scale=1.3), run_time=0.2)
        eg = d.signe("=", VERT_OK, 62)
        l = Eq("L'égalité est vraie.", 40, VERT_OK, lettres="").move_to(P(-2.4, -1.3))
        self.dire_eq(l, "L'égalité est vraie.", echelle=1.0, rt=0.13, avec=[FadeIn(eg, scale=1.5), *d.colorer(VERT_OK)])
        l2 = Eq("Oui, zéro peut être une solution.", 44, lettres="").move_to(P(-1.0, -2.2))
        self.dire_eq(l2, "Oui, zéro peut être une solution.", echelle=1.0, rt=0.13)
        self.insister(VGroup(l2.atomes[2]), 1.35, 0.16)
        self.attendre_voix(marge=0.4)

    # ── 05q : QUESTION 2 (cartes larges : les choix sont des phrases) ───────
    def _disposer_q(self, question, choix, phrase):
        larges = getattr(self, "_cartes_larges", None)
        if not larges:
            return super()._disposer_q(question, choix, phrase)
        tete, q, _, pause, rebours, ph = super()._disposer_q(question, [c.copy() for c in choix], phrase)
        cartes = VGroup(*[self._carte_choix(l, c, larges, 34) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.16)
        cartes.next_to(q, DOWN, buff=0.22).align_to(P(self.XL, 0), LEFT)
        pause.next_to(cartes, DOWN, buff=0.16).align_to(P(self.XL, 0), LEFT)
        ph.next_to(cartes, DOWN, buff=0.16).align_to(P(self.XL, 0), LEFT)
        self.cartes_q = cartes
        return tete, q, cartes, pause, rebours, ph

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL, self._cartes_larges = -6.2, 8.5
        d = DeuxCases(3.475, 5.9, 0.9, 1.75, 1.3, 1.9)  # = au large entre les cartes
        tg, td = d.etiquettes(22)

        def avant(sc):
            sc.eq_dans_q(0, "0 est-il solution", "0 est-il solution", lettres="", fs=36)
            sc.eq_dans_q(0, "de x + 5 = 5 ?", "de x plus 5 égale 5 ?", fs=36)
            sc.play(FadeIn(d), FadeIn(tg), FadeIn(td), run_time=0.2)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : oui.", "Réponse B : oui.", premier=True)
            a = Eq("0 + 5", 38).move_to(P(d.xg, d.yh))
            a.atomes[0].set_color(INCONNUE)
            sc.dire_eq(a, "0 plus 5")
            b = Eq("5", 46).move_to(P(d.xg, d.yb))
            c = Eq("5", 46).sans_audit().move_to(P(d.xd, d.yb))
            sc._attendre_pos(sc._texte_voix.find("5, 5") + 3)
            sc.play(FadeIn(b, scale=1.3), FadeIn(c, scale=1.3), run_time=0.16)
            eg = d.signe("=", VERT_OK, 42)
            sc.au("L'égalité", FadeIn(eg, scale=1.5), *d.colorer(VERT_OK), rt=0.2)
            sc.ph_eq(1, "L'égalité est vraie.", "L'égalité est vraie.")
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["0 est-il solution", "de x + 5 = 5 ?"],
                            [Eq("non, 0 n'est jamais solution", 34, lettres=""), Eq("oui", 34, lettres=""),
                             Eq("non, car il faut un nombre positif", 34, lettres="")], 1,
                            ["Réponse B : oui.", "L'égalité est vraie."], avant_q=avant, autres_r=apres)
        self.XL, self._cartes_larges = type(self).XL, None

    # ── 06 : x des deux côtés, chaque membre séparément ─────────────────────
    def ecran_deux_membres(self):
        self.ecran("06-deux-membres")
        l1 = Eq("Quand x est des deux côtés,", 36).move_to(P(-0.2, 3.2))
        l2 = Eq("on calcule chaque membre séparément.", 36, OPERATION, lettres="").move_to(P(-0.2, 2.66))
        self.dire_eq(l1, "Quand x est des deux côtés,", echelle=1.0, rt=0.12)
        self.dire_eq(l2, "on calcule chaque membre séparément.", echelle=1.0, rt=0.12)
        e = Eq("3(t − 1) = t + 11", 58).mis_sur_egal(-2.3, 1.75)
        self.dire_eq(e, "3 fois, entre parenthèses, t moins 1, égale t plus 11")
        self.play(e.egal.animate.set_color(EGAL), run_time=0.1)
        av = Eq("avec t = 7", 46).move_to(P(3.9, 1.75))
        self.dire_eq(av, "avec t égale 7")
        d = DeuxCases(-3.7, 1.0, -0.75, 3.5, 3.0, 2.58, rangs=3)
        tg = T("À gauche", 28, CIEL).next_to(d.cg, UP, buff=0.08)
        td = T("À droite", 28, CIEL).next_to(d.cd, UP, buff=0.08).align_to(tg, UP)
        z = Eq("3(7 − 1)", 40).sans_audit().move_to(P(d.xg, d.yh))
        z.atomes[2].set_color(INCONNUE)
        self.au("À gauche", FadeIn(d.cg), FadeIn(tg), FadeIn(z), rt=0.2)
        a = Eq("3 × 6", 40).move_to(P(d.xg, d.ym))
        self.dire_eq(a, "3 fois 6")
        b = Eq("18", 46).move_to(P(d.xg, d.yb))
        self.dire_eq(b, "6, 18")
        self.au("À droite", FadeIn(d.cd), FadeIn(td), rt=0.2)
        a2 = Eq("7 + 11", 40).move_to(P(d.xd, d.ym))
        a2.atomes[0].set_color(INCONNUE)
        self.dire_eq(a2, "7 plus 11")
        b2 = Eq("18", 46).move_to(P(d.xd, d.yb))
        self.dire_eq(b2, "11, 18")
        eg = d.signe("=", VERT_OK, 62)
        f = Eq("C'est égal : 7 est solution.", 44, VERT_OK, lettres="").move_to(P(-1.2, -2.78))
        f.atomes[5].set_color(INCONNUE)
        lp = Voyant(0.34).move_to(P(4.3, 0.8))
        fu = Fusee(0.55).move_to(P(4.3, -0.75))
        self.play(FadeIn(lp), FadeIn(fu), run_time=0.12)
        self.dire_eq(f, "C'est égal : 7 est solution.", echelle=1.0, rt=0.13, avec=[FadeIn(eg, scale=1.5), *d.colorer(VERT_OK), lp.vert()])
        self.insister(eg, 1.3, 0.14)
        self.attendre_voix(marge=0.4)

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0.3, 3.05))
        self.au("À toi", Write(tit), rt=0.5)
        fu = Fusee(1.0).move_to(P(-5.2, 0.6))
        v5 = Voyant(0.42, "5", 36).move_to(P(-5.2, -2.0)).shift(LEFT * 0.0)
        v5.move_to(P(-1.5, -2.45))
        v4 = Voyant(0.42, "4", 36).move_to(P(1.5, -2.45))
        l1 = Eq("5 est-il solution de", 44, lettres="").move_to(P(0.3, 2.05))
        self.dire_eq(l1, "5 est-il solution de", echelle=1.1, rt=0.13, avec=[FadeIn(fu, shift=UP * 0.2), FadeIn(v5, scale=0.6), v5.orange()])
        e = Eq("4x − 3 = 2x + 7", 70).move_to(P(0.6, 1.05))
        self.dire_eq(e, "4 x moins 3 égale 2 x plus 7")
        self.play(e.egal.animate.set_color(EGAL), run_time=0.1)
        q = Eq("Et 4 ?", 52, JAUNE_TITRE, lettres="").move_to(P(0.3, 0.0))
        self.dire_eq(q, "Et 4 ?", echelle=1.1, rt=0.13, avec=[FadeIn(v4, scale=0.6), v4.orange()])
        pz = T("Mets pause, et cherche !", 42, ORANGE_RETENUE).move_to(P(0.3, -1.05))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, fu=fu, v5=v5, v4=v4, l1=l1, e=e, q=q, pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d0 = self.defi
        self.dire("07b-correction")
        tit = T("Correction", 46, JAUNE_TITRE).move_to(P(-4.6, 3.1))
        e = d0["e"]
        r5, r4 = d0["v5"], d0["v4"]
        self.au("Correction", ReplacementTransform(d0["tit"], tit), FadeOut(d0["l1"]), FadeOut(d0["q"]), FadeOut(d0["pz"]), FadeOut(d0["fu"]),
                e.animate.scale(44 / 70).move_to(P(1.3, 3.1)), r5.animate.scale(0.75).move_to(P(6.25, 1.15)),
                r4.animate.scale(0.75).move_to(P(6.25, -1.05)), rt=0.35)
        d = DeuxCases(-2.85, 0.95, 1.2, 2.5, 2.5, 1.72)
        tg, td = d.etiquettes(24)
        p5 = Eq("Pour 5 :", 38, CIEL, lettres="").move_to(P(-5.35, 1.2))
        self.dire_eq(p5, "Pour 5 :", echelle=1.0, rt=0.13, avec=[FadeIn(d.cg), FadeIn(d.cd)])
        self.au("à gauche", FadeIn(tg), rt=0.15)
        a = Eq("20 − 3", 40).move_to(P(d.xg, d.yh))
        self.dire_eq(a, "20 moins 3")
        b = Eq("17", 46).move_to(P(d.xg, d.yb))
        self.dire_eq(b, "3, 17")
        self.au("À droite", FadeIn(td), rt=0.15)
        a2 = Eq("10 + 7", 40).move_to(P(d.xd, d.yh))
        self.dire_eq(a2, "10 plus 7")
        b2 = Eq("17", 46).move_to(P(d.xd, d.yb))
        self.dire_eq(b2, "7, 17")
        eg = d.signe("=", VERT_OK, 60)
        v1 = Eq("Oui, 5 est", 32, VERT_OK, lettres="").move_to(P(4.03, 1.42))
        v2 = Eq("solution.", 32, VERT_OK, lettres="").move_to(P(4.03, 0.95))
        self.dire_eq(v1, "Oui, 5 est", echelle=1.0, rt=0.13, avec=[FadeIn(eg, scale=1.5), *d.colorer(VERT_OK), r5.vert()])
        self.dire_eq(v2, "solution.", echelle=1.0, rt=0.13)
        d4 = DeuxCases(-2.85, 0.95, -1.05, 2.5, 2.5, 1.0, rangs=1)
        d4.yb = d4.ym = -1.05
        p4 = Eq("Pour 4 :", 38, CIEL, lettres="").move_to(P(-5.35, -1.05))
        self.dire_eq(p4, "Pour 4 :", echelle=1.0, rt=0.13, avec=[FadeIn(d4.cg), FadeIn(d4.cd)])
        g4 = Eq("13", 52).move_to(P(d4.xg, -1.05))
        self.dire_eq(g4, "gauche, 13")
        d4_ = Eq("15", 52).move_to(P(d4.xd, -1.05))
        self.dire_eq(d4_, "droite, 15")
        ne = d4.signe("≠", PIEGE, 60)
        w1 = Eq("Non, 4 n'est", 32, PIEGE, lettres="").move_to(P(4.03, -0.83))
        w2 = Eq("pas solution.", 32, PIEGE, lettres="").move_to(P(4.03, -1.3))
        self.dire_eq(w1, "Non, 4 n'est", echelle=1.0, rt=0.13, avec=[FadeIn(ne, scale=1.5), *d4.colorer(PIEGE), r4.rouge()])
        self.dire_eq(w2, "pas solution.", echelle=1.0, rt=0.13)
        self.attendre_voix(marge=0.6)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        self.XL = -2.5
        fu = Fusee(1.25)
        pn = Panneau(2, 3, r=0.2, pas=0.62).next_to(fu, DOWN, buff=0.3)
        for v in pn.voyants:
            v.rond.set_fill(VERT_OK, 1).set_stroke("#bbf7d0", 3)
        fig = VGroup(fu, pn)
        lignes = self.finale_colonne([["Pour vérifier, on remplace la lettre", "dans l'équation de départ."],
                                      ["On calcule les deux membres", "séparément."],
                                      ["S'ils sont égaux,", "le nombre est solution."],
                                      ["Zéro peut être solution."]], fs=36, figure=fig)
        xl = lignes.get_left()[0]
        lignes.scale_to_fit_width(6.55 - xl).align_to(P(xl, 0), LEFT).align_to(P(0, 2.45), UP)  # plus grand
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.play(fu.allumer(), run_time=0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_ingenieure()
        self.ecran_remplacer()
        self.ecran_tableau()
        self.ecran_question1()
        self.ecran_faux()
        self.ecran_zero()
        self.ecran_question2()
        self.ecran_deux_membres()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
