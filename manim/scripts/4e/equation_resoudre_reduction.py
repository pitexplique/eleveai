# equation_resoudre_reduction.py
# EleveAI — Maths 4e — série « Équations », épisode 04 : RÉSOUDRE EN RÉDUISANT.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : equation_resoudre_reduction.
# Décor et métier : COURSE (Awa, entraîneuse). Centres : course-trail, sport.
# Écrans : garde (00) ; la boucle de course (01) ; 2 boucles + 3 boucles qui
# fusionnent (02) ; on résout (03) ; x seul montre son 1 (04) ; QUESTION 1 (04q) ;
# le piège (05) ; t et nombres groupés par couleur (06) ; QUESTION 2 (06q) ; défi (07)
# et correction (07b) ; ce que tu as appris (08) ; fin (09).
# Voix : manim/voix/4e-equation-resoudre-reduction.json (validée, débit −6) ; marques :
# equation_resoudre_reduction_marques.json.
#
# Complète equation_commun.py (lecture seule), ICI : Boucle, rang(), coureuse(),
# jeton(), chrono_main(), PAROLE (km, ², « 1 x »), descendre(), sous_membre(), ph_eq().
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/equation_resoudre_reduction.py EquationResoudreReduction4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/equation_resoudre_reduction.py EquationResoudreReduction4e -o eleveai-maths-4e-equation-resoudre-reduction --media_dir manim/scripts/4e/media-eq-04
# Sortie : manim/sorties/4e/maths/equations/04-resoudre-reduction/eleveai-maths-4e-equation-resoudre-reduction.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402

PAROLE.update({"km": "kilomètres", "²": "carré"})
NOMBRE = "#c4b5fd"  # les nombres groupés (écran 06) : ni l'inconnue, ni l'opération
FOND_B = "#0b1220"


class Boucle(VGroup):
    """La boucle de course : un circuit fermé (.trace), l'inconnue dedans (.txt)."""

    def __init__(self, r=0.45, s="x", couleur=None, fs=None, depart=True, **kw):
        super().__init__(**kw)
        couleur = couleur or INCONNUE
        pts = []
        for k in range(48):
            a = TAU * k / 48
            pts.append(P(r * 1.28 * np.cos(a) * (1 + 0.1 * np.cos(3 * a)), r * np.sin(a) * (1 + 0.14 * np.sin(2 * a))))
        self.trace = VMobject(stroke_color=couleur, stroke_width=max(4, 9 * r))
        self.trace.set_points_smoothly(pts + [pts[0]])
        self.trace.set_fill(FOND_B, 1)
        self.add(self.trace)
        if depart:
            self.drapeau = Dot(pts[36], radius=max(0.045, 0.09 * r), color=WHITE)
            self.add(self.drapeau)
        self.txt = T(s, fs or int(66 * r + 8), couleur, audit=False, gras=True).move_to(self.trace)
        self.add(self.txt)


def rang(n, r=0.45, buff=0.12, **kw):
    return VGroup(*[Boucle(r, **kw) for _ in range(n)]).arrange(RIGHT, buff=buff)


def coureuse(s=1.0, c="#fb923c", peau="#8d5524"):
    """Une silhouette qui court : l'origine est au centre du corps."""
    tete = Circle(radius=0.13, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0.1, 0.36))
    corps = Line(P(0.06, 0.22), P(-0.06, -0.1), color=c, stroke_width=9)
    bras = VGroup(Line(P(0.04, 0.16), P(0.26, 0.02), color=peau, stroke_width=6),
                  Line(P(0.04, 0.16), P(-0.2, 0.08), color=peau, stroke_width=6))
    jambes = VGroup(Line(P(-0.06, -0.1), P(0.16, -0.26), color=peau, stroke_width=7),
                    Line(P(0.16, -0.26), P(0.08, -0.46), color=peau, stroke_width=7),
                    Line(P(-0.06, -0.1), P(-0.2, -0.3), color=peau, stroke_width=7),
                    Line(P(-0.2, -0.3), P(-0.42, -0.26), color=peau, stroke_width=7))
    return VGroup(jambes, corps, bras, tete).scale(s)


def jeton(s="", cote=0.5, c=NOMBRE):
    """Un nombre (une unité), bien distinct d'une boucle : un carré plein."""
    g = VGroup(Square(cote, stroke_color=c, stroke_width=3, fill_color="#312e81", fill_opacity=1))
    if s:
        g.add(T(s, int(cote * 60), WHITE, audit=False, gras=True).move_to(g[0]))
    return g


def chrono_main(s=1.0):
    """Le chronomètre de l'entraîneuse."""
    b = Circle(radius=0.2, fill_color="#e2e8f0", fill_opacity=1, stroke_color="#475569", stroke_width=3)
    a = Line(ORIGIN, P(0.08, 0.12), color=PIEGE, stroke_width=3)
    h = RoundedRectangle(width=0.1, height=0.08, corner_radius=0.02, fill_color="#475569", fill_opacity=1,
                         stroke_width=0).next_to(b, UP, buff=0)
    return VGroup(b, a, h).scale(s)


def barre_parts(w, h, n, centre=ORIGIN):
    """Une bande de longueur totale, posée en centre, avec ses n parts (.parts : les centres, .coupes)."""
    ca = RoundedRectangle(width=w, height=h, corner_radius=0.06, stroke_color=WHITE, stroke_width=3,
                          fill_color="#1e293b", fill_opacity=1).move_to(centre)
    ca.parts = [ca.get_left() + RIGHT * w * (k + 0.5) / n for k in range(n)]
    ca.coupes = VGroup(*[DashedLine(ca.get_left() + RIGHT * w * k / n + UP * h / 2, ca.get_left() + RIGHT * w * k / n + DOWN * h / 2,
                                    color=OPERATION, stroke_width=4) for k in range(1, n)])
    return ca


class _OutilsReduc:
    # ── outils de l'épisode (recopiés de l'épisode 03) ──────────────────────
    def descendre(self, a, b, phrase, n=1):
        """La ligne suivante : l'inconnue et le = glissent de la ligne a, le reste vient AU MOT."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(phrase, i + 1)
        self._attendre_pos(i)
        self.play(TransformFromCopy(a.x[-1], b.x[0]), TransformFromCopy(a.egal, b.egal), run_time=0.2)
        self.dire_eq(b, phrase, n=n, sauf=[b.x[0], b.egal])

    def sous_membre(self, m, s, y, fs=40, couleur=None, audit=True):
        """L'opération orange, écrite sous un membre (m) à la hauteur y."""
        o = Eq(s, fs, couleur=couleur or OPERATION, lettres="")
        if not audit:
            o.sans_audit()
        return o.move_to(P(m.get_x(), y))

    def ph_eq(self, i, s, phrase, n=1, lettres="", couleur=None, premier=False):
        """La ligne i de la phrase de réponse, posée mot à mot (avec ses nombres)."""
        ref = self.ph_q[i]
        e = Eq(s, 30, couleur=couleur or VERT_OK, lettres=lettres)
        e.scale_to_fit_height(ref.height).move_to(ref).align_to(ref, LEFT)
        sauf = []
        if premier:  # « Réponse » : dit pendant que la carte s'allume, il n'attend plus
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        self.dire_eq(e, phrase, n=n, echelle=1.0, rt=0.16, sauf=sauf)
        return e

    def par_morceaux(self, e, *morceaux, rt=0.14):
        """Une même ligne dite en plusieurs temps : (nb d'atomes, phrase, [anims])."""
        k = 0
        for nb, phrase, avec in morceaux:
            ici = e.atomes[k:k + nb]
            autres = [a for a in e.atomes if not any(a is b for b in ici)]
            self.dire_eq(e, phrase, echelle=1.0, rt=rt, sauf=autres, avec=avec)
            k += nb


class EquationResoudreReduction4e(_OutilsReduc, PaysageEq):
    nom_voix = "4e-equation-resoudre-reduction"
    fichier_marques = "equation_resoudre_reduction_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre une équation en réduisant", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Résoudre", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        g = rang(2, 0.72, 0.3).move_to(P(-4.0, 0.0))
        cr = coureuse(0.9).move_to(g[0].trace.point_from_proportion(0.5))
        l1 = Eq("Que faire quand x", 44, lettres="x").move_to(P(1.9, 0.4))
        l2 = Eq("apparaît deux fois ?", 44, lettres="").move_to(P(1.9, -0.35))
        self.dire_eq(l1, "Que faire quand x", echelle=1.0, avec=[FadeIn(g), FadeIn(cr)])
        self.dire_eq(l2, "apparaît deux fois ?", echelle=1.0)
        self.play(g[0].txt.animate.scale(1.5), g[1].txt.animate.scale(1.5), run_time=0.2)
        self.play(g[0].txt.animate.scale(1 / 1.5), g[1].txt.animate.scale(1 / 1.5), run_time=0.2)
        self.attendre_voix(marge=0.6)

    # ── 01 : Awa et la boucle ───────────────────────────────────────────────
    def ecran_coach(self):
        self.ecran("01-coach")
        perso = personne(peau="#8d5524", tenue="#dc2626", cheveux="#111827", longs=True, s=0.95).move_to(P(-5.1, -2.1))
        ch = chrono_main(1.1).next_to(perso, RIGHT, buff=0.02).shift(UP * 0.35)
        n1 = T("Awa", 40, CIEL, gras=True).move_to(P(-5.1, 0.95))
        self.au("Awa", FadeIn(perso, shift=UP * 0.3), FadeIn(ch), FadeIn(n1, shift=UP * 0.1), rt=0.3)
        n2 = Eq("entraîne", 30, CIEL, lettres="").move_to(P(-5.1, 0.45))
        n3 = Eq("des coureuses", 30, CIEL, lettres="").move_to(P(-5.1, 0.05))
        self.dire_eq(n2, "entraîne", echelle=1.0, rt=0.12)
        self.dire_eq(n3, "des coureuses", echelle=1.0, rt=0.12)
        # la boucle : on la trace, une coureuse la parcourt
        b = Boucle(1.12, "", depart=True).move_to(P(-1.55, 1.15))
        b.trace.set_fill(opacity=0)
        l = Eq("Sa boucle de course fait x km", 38, lettres="x").move_to(P(-0.35, 3.15))
        cr = coureuse(1.0).move_to(b.trace.get_start())
        self.dire_eq(l, "Sa boucle de course fait x kilomètres", echelle=1.0, rt=0.14, sauf=l.atomes[5:],
                     avec=[Create(b.trace), FadeIn(b.drapeau), FadeIn(cr)])
        tag = Eq("x km", 44, lettres="x", couleur=INCONNUE).move_to(b.trace)
        self.dire_eq(l, "x kilomètres", echelle=1.0, rt=0.12, sauf=l.atomes[:5])
        self.play(FadeIn(tag.sans_audit(), scale=1.3), MoveAlongPath(cr, b.trace), run_time=0.9, rate_func=linear)
        # lundi, mardi
        XR = 3.55
        lun = Eq("Lundi : 2 boucles", 34, lettres="").move_to(P(XR, 2.35))
        r2 = rang(2, 0.4, 0.12).move_to(P(XR, 1.6))
        self.par_morceaux(lun, (2, "Lundi,", []), (2, "2 boucles", [FadeIn(r2, shift=DOWN * 0.15)]))
        mar = Eq("Mardi : 3 boucles", 34, lettres="").move_to(P(XR, 0.7))
        r3 = rang(3, 0.4, 0.12).move_to(P(XR, -0.05))
        self.par_morceaux(mar, (2, "Mardi,", []), (2, "3 boucles", [FadeIn(r3, shift=DOWN * 0.15)]))
        tot = Eq("En tout : 15 km", 38, JAUNE_TITRE, lettres="").move_to(P(XR, -0.98))
        self.dire_eq(tot, "En tout, 15 kilomètres", echelle=1.0, rt=0.14)
        e = Eq("2x + 3x = 15", 76).mis_sur_egal(1.2, -2.45)
        self.dire_eq(e, "2 x plus 3 x égale 15")
        self.play(e.egal.animate.set_color(EGAL), run_time=0.12)
        self.attendre_voix(marge=0.5)

    # ── 02 : on réduit, les boucles fusionnent ──────────────────────────────
    def ecran_reduire(self):
        self.ecran("02-reduire")
        e0 = Eq("2x + 3x = 15", 62).sans_audit().mis_sur_egal(0.75, 3.0)
        e0.egal.set_color(EGAL)
        self.play(FadeIn(e0), run_time=0.15)
        l1 = Eq("Il y a deux termes en x : on ne peut pas encore isoler x.", 32, lettres="x").move_to(P(0, 2.15))
        c1 = SurroundingRectangle(VGroup(*e0.atomes[:2]), color=INCONNUE, buff=0.1, corner_radius=0.08, stroke_width=4)
        c2 = SurroundingRectangle(VGroup(*e0.atomes[3:5]), color=INCONNUE, buff=0.1, corner_radius=0.08, stroke_width=4)
        self.dire_eq(l1, "Il y a deux termes en x :", echelle=1.0, rt=0.12, sauf=l1.atomes[8:])
        self.play(Create(c1), Create(c2), run_time=0.2)
        self.dire_eq(l1, "on ne peut pas encore isoler x.", echelle=1.0, rt=0.12, sauf=l1.atomes[:8])
        g2 = rang(2, 0.5, 0.12).move_to(P(-4.35, 0.85))
        g3 = rang(3, 0.5, 0.12).move_to(P(0.05, 0.85))
        pl = T("+", 54, OPERATION, audit=False, gras=True).move_to(P(-2.42, 0.85))
        l2 = Eq("2 boucles + 3 boucles, ça fait 5 boucles.", 36, lettres="").move_to(P(-1.6, -0.15))
        self.par_morceaux(l2, (2, "2 boucles", [FadeIn(g2, shift=DOWN * 0.15)]),
                          (1, "plus", [FadeIn(pl, scale=1.3)]),
                          (3, "3 boucles,", [FadeIn(g3, shift=DOWN * 0.15)]))
        cible = VGroup(g2.copy(), g3.copy()).arrange(RIGHT, buff=0.12).move_to(P(-2.2, 0.85))
        self.au("ça", FadeOut(pl), g2.animate.move_to(cible[0]), g3.animate.move_to(cible[1]), FadeIn(l2.atomes[6]), rt=0.3)
        self.dire_eq(l2, "fait 5 boucles.", echelle=1.0, rt=0.14, sauf=l2.atomes[:7])
        cadre = SurroundingRectangle(VGroup(g2, g3), color=VERT_OK, buff=0.12, corner_radius=0.12, stroke_width=5)
        n5 = T("5x", 72, VERT_OK, audit=False, gras=True).move_to(P(3.6, 0.85))
        self.play(Create(cadre), run_time=0.25)
        e1 = Eq("2x + 3x = 5x", 62).mis_sur_egal(0.75, -1.35)
        self.dire_eq(e1, "2 x plus 3 x égale 5 x")
        self.play(e1.egal.animate.set_color(EGAL), FadeIn(n5, scale=1.3), run_time=0.2)
        e2 = Eq("5x = 15", 72).mis_sur_egal(0.75, -2.55)
        d = Eq("L'équation devient", 34, CIEL, lettres="").move_to(P(-4.0, -2.55))
        self.dire_eq(d, "L'équation devient", echelle=1.0, rt=0.12)
        self.dire_eq(e2, "5 x égale 15")
        cad = SurroundingRectangle(e2, color=JAUNE_TITRE, buff=0.14, corner_radius=0.1, stroke_width=4)
        self.play(e2.egal.animate.set_color(EGAL), Create(cad), run_time=0.2)
        self.attendre_voix(marge=0.5)

    # ── 03 : maintenant, c'est simple ───────────────────────────────────────
    def ecran_resoudre(self):
        self.ecran("03-resoudre")
        X = -3.1
        t0 = Eq("Maintenant, c'est une équation simple.", 38, JAUNE_TITRE, lettres="").move_to(P(0, 3.15))
        e1 = Eq("5x = 15", 72).sans_audit().mis_sur_egal(X, 2.2)
        e1.egal.set_color(EGAL)
        self.dire_eq(t0, "Maintenant, c'est une équation simple.", echelle=1.0, rt=0.13, avec=[FadeIn(e1)])
        l1 = Eq("On divise par 5", 36, OPERATION, lettres="").move_to(P(3.1, 2.45))
        l2 = Eq("des deux côtés.", 36, OPERATION, lettres="").move_to(P(3.1, 1.9))
        o1 = self.sous_membre(e1.gauche, "÷ 5", 1.25, 46)
        o2 = self.sous_membre(e1.droite, "÷ 5", 1.25, 46, audit=False)
        ba = barre_parts(5.6, 0.72, 5, P(3.3, 0.72))
        tg = T("15 km", 32, WHITE, audit=False, gras=True).move_to(ba)
        self.play(FadeIn(ba), FadeIn(tg), run_time=0.2)
        self.dire_eq(l1, "On divise par 5", echelle=1.0, rt=0.12)
        self.play(FadeIn(o1, scale=1.3), run_time=0.15)
        self.dire_eq(l2, "des deux côtés.", echelle=1.0, rt=0.12, avec=[FadeIn(o2, scale=1.3)])
        self.play(Create(ba.coupes), FadeOut(tg), run_time=0.2)
        e2 = Eq("x = 3", 72).mis_sur_egal(X, 0.3)
        self.descendre(e1, e2, "x égale 3")
        trois = VGroup(*[T("3", 32, VERT_OK, audit=False, gras=True).move_to(p) for p in ba.parts])
        self.play(e2.droite.animate.set_color(VERT_OK), FadeIn(trois, scale=1.3), run_time=0.2)
        b = Boucle(0.72, "", couleur=VERT_OK).move_to(P(5.05, -0.75))
        km = T("3 km", 30, VERT_OK, audit=False, gras=True).move_to(b.trace)
        l3 = Eq("La boucle fait 3 km.", 40, VERT_OK, lettres="").move_to(P(0.9, -0.75))
        self.dire_eq(l3, "La boucle fait 3 kilomètres.", echelle=1.0, rt=0.13, avec=[FadeIn(b.trace), FadeIn(b.drapeau)])
        self.play(FadeIn(km, scale=1.3), run_time=0.15)
        s1 = Eq("D'abord réduire,", 42, JAUNE_TITRE, lettres="").move_to(P(-3.4, -2.3))
        s2 = Eq("ensuite résoudre.", 42, VERT_OK, lettres="").move_to(P(1.9, -2.3))
        self.dire_eq(s1, "D'abord réduire,", echelle=1.0, rt=0.13)
        self.dire_eq(s2, "ensuite résoudre.", echelle=1.0, rt=0.13)
        self.insister(VGroup(s1, s2), 1.12, 0.2)
        self.attendre_voix(marge=0.5)

    # ── 04 : x seul montre son 1 ────────────────────────────────────────────
    def ecran_seul(self):
        self.ecran("04-seul")
        X = -1.6
        e0 = Eq("Et 4x − x = 12 ?", 62).mis_sur_egal(X, 2.85)
        self.dire_eq(e0, "Et 4 x moins x égale 12 ?")
        self.play(e0.egal.animate.set_color(EGAL), run_time=0.1)
        # x tout seul : le 1 caché sort
        gx = T("x", 120, INCONNUE, audit=False, gras=True).move_to(P(3.9, 2.05))
        l1 = Eq("x tout seul, c'est 1x.", 40, lettres="x").move_to(P(3.2, 0.72))
        un = T("1", 120, OPERATION, audit=False, gras=True).next_to(gx, LEFT, buff=0.12).align_to(gx, DOWN)
        g4 = rang(4, 0.45, 0.1).move_to(P(-3.05, 1.45))
        self.dire_eq(l1, "x tout seul, c'est 1 x.", echelle=1.0, rt=0.13, sauf=l1.atomes[-3:], avec=[FadeIn(gx, scale=1.2), FadeIn(g4)])
        self.dire_eq(l1, "1 x.", echelle=1.0, rt=0.13, sauf=l1.atomes[:-3], avec=[FadeIn(un, shift=RIGHT * 0.5)])
        self.insister(un, 1.3, 0.2)
        e1 = Eq("4x − 1x = 3x", 60).mis_sur_egal(X, 0.1)
        self.dire_eq(e1, "4 x moins 1 x, 3 x", sauf=e1.atomes[-3:])
        ba = self.barrer(g4[3])
        self.play(Create(ba), g4[3].animate.set_opacity(0.3), run_time=0.15)
        self.dire_eq(e1, "4 x moins 1 x, 3 x", sauf=e1.atomes[:-3])
        cad3 = SurroundingRectangle(VGroup(*g4[:3]), color=VERT_OK, buff=0.08, corner_radius=0.1, stroke_width=4)
        self.play(Create(cad3), e1.egal.animate.set_color(EGAL), run_time=0.15)
        e2 = Eq("Donc 3x = 12,", 60).mis_sur_egal(X, -1.1)
        self.dire_eq(e2, "Donc 3 x égale 12,")
        e3 = Eq("et x = 4.", 60).mis_sur_egal(X, -2.3)
        self.dire_eq(e3, "et x égale 4.")
        cad = SurroundingRectangle(VGroup(*e3.atomes[1:-1]), color=VERT_OK, buff=0.12, corner_radius=0.1, stroke_width=4)
        self.play(e3.atomes[-2].animate.set_color(VERT_OK), Create(cad), run_time=0.15)
        self.attendre_voix(marge=0.5)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = VGroup(rang(2, 0.72, 0.2), rang(2, 0.72, 0.2)).arrange(DOWN, buff=0.28).move_to(P(-3.5, 0.0))
        h = T("4x − x", 62, WHITE, audit=False, gras=True).move_to(P(-3.5, 2.55))

        def avant(sc):
            sc.eq_dans_q(0, "Combien vaut 4x − x ?", "Combien vaut 4 x moins x ?")
            sc.play(FadeIn(g), FadeIn(h), run_time=0.25)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 3x.", "Réponse B : 3 x.", lettres="x", premier=True)
            d = g[1][1]
            sc.play(Create(sc.barrer(d)), d.animate.set_opacity(0.3), run_time=0.2)
            sc.ph_eq(1, "x tout seul, c'est 1x.", "x tout seul, c'est 1 x.", lettres="x")
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Combien vaut 4x − x ?"],
                            [Eq("4", 34), Eq("3x", 34), Eq("4x²", 34)], 1,
                            ["Réponse B : 3x.", "x tout seul, c'est 1x."], avant_q=avant, autres_r=apres)

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = Eq("Le piège : mélanger les x et les nombres.", 42, PIEGE, lettres="x").move_to(P(0, 3.1))
        self.dire_eq(tit, "Le piège : mélanger les x et les nombres.", echelle=1.0, rt=0.13)
        e = Eq("2x + 3", 66).move_to(P(-4.5, 1.95))
        g = rang(2, 0.45, 0.1).move_to(P(-4.75, 0.4))
        pl = T("+", 50, WHITE, audit=False).move_to(P(-3.0, 0.4))
        js = VGroup(*[jeton() for _ in range(3)]).arrange(RIGHT, buff=0.08).move_to(P(-1.4, 0.4))
        self.dire_eq(e, "2 x plus 3", avec=[FadeIn(g, shift=DOWN * 0.15)])
        self.play(FadeIn(pl), FadeIn(js, shift=DOWN * 0.15), run_time=0.15)
        s = Eq("ce n'est pas", 38, PIEGE, lettres="").move_to(P(-1.0, 1.95))
        self.dire_eq(s, "ce n'est pas", echelle=1.0, rt=0.12)
        f = Eq("5x", 66).move_to(P(1.5, 1.95))
        fl = Arrow(js.get_top() + UP * 0.05, g.get_top() + UP * 0.05 + RIGHT * 0.3, color=PIEGE, stroke_width=5, buff=0.05,
                   path_arc=0.6, max_tip_length_to_length_ratio=0.1)
        self.dire_eq(f, "5 x", n=1, avec=[GrowArrow(fl)])
        non = VGroup(self.barrer(f, sw=7), self.barrer(fl, sw=6))
        self.play(Create(non), f.atomes[0].animate.set_color(PIEGE), f.atomes[1].animate.set_color(PIEGE), run_time=0.2)
        # deux bacs : les x avec les x, les nombres avec les nombres
        bx = RoundedRectangle(width=5.4, height=2.35, corner_radius=0.14, stroke_color=INCONNUE, stroke_width=4).move_to(P(-3.7, -1.75))
        bn = RoundedRectangle(width=5.6, height=2.35, corner_radius=0.14, stroke_color=NOMBRE, stroke_width=4).move_to(P(1.95, -1.75))
        l1 = Eq("On ajoute les x", 32, INCONNUE, lettres="").move_to(P(-3.7, -0.95))
        l1b = Eq("avec les x,", 32, INCONNUE, lettres="").move_to(P(-3.7, -1.38))
        l2 = Eq("les nombres", 32, NOMBRE, lettres="").move_to(P(1.95, -0.95))
        l2b = Eq("avec les nombres.", 32, NOMBRE, lettres="").move_to(P(1.95, -1.38))
        self.au("On ajoute", FadeIn(bx), FadeOut(fl), FadeOut(non[1]), FadeOut(pl), rt=0.15)
        self.dire_eq(l1, "On ajoute les x", echelle=1.0, rt=0.12)
        self.dire_eq(l1b, "avec les x,", echelle=1.0, rt=0.12)
        self.play(g.animate.move_to(P(-3.7, -2.25)), run_time=0.25)
        self.dire_eq(l2, "les nombres", n=2, echelle=1.0, rt=0.12, avec=[FadeIn(bn)])
        self.dire_eq(l2b, "avec les nombres.", echelle=1.0, rt=0.12)
        self.play(js.animate.scale(1.3).move_to(P(1.95, -2.25)), run_time=0.25)
        self.attendre_voix(marge=0.5)

    # ── 06 : les t et les nombres groupés ───────────────────────────────────
    def ecran_mele(self):
        self.ecran("06-mele")
        X, XL_ = 1.45, -5.9
        ex = Eq("Exemple.", 36, JAUNE_TITRE, lettres="").move_to(P(0, 3.25)).align_to(P(XL_, 0), LEFT)
        self.dire_eq(ex, "Exemple.", echelle=1.0, rt=0.15)
        e0 = Eq("2t + 12 + t − 3 = 27", 62).mis_sur_egal(X, 2.45)
        self.dire_eq(e0, "2 t plus 12 plus t moins 3 égale 27")
        self.play(e0.egal.animate.set_color(EGAL), run_time=0.1)
        a = e0.atomes
        ct = VGroup(*[SurroundingRectangle(VGroup(*m), color=INCONNUE, buff=0.07, corner_radius=0.07, stroke_width=4)
                      for m in (a[0:2], a[5:6])])
        cn = VGroup(*[SurroundingRectangle(VGroup(*m), color=NOMBRE, buff=0.07, corner_radius=0.07, stroke_width=4)
                      for m in (a[3:4], a[6:8])])
        l1 = Eq("Les t ensemble : 2t + t, 3t.", 38, lettres="t").move_to(P(0, 1.68)).align_to(P(XL_, 0), LEFT)
        for at in l1.atomes[:3]:
            at.set_color(INCONNUE)
        self.dire_eq(l1, "Les t ensemble : 2 t plus t, 3 t.", echelle=1.0, rt=0.12, avec=[Create(ct)])
        l2 = Eq("Les nombres ensemble : 12 − 3, 9.", 38, NOMBRE, lettres="").move_to(P(0, 1.06)).align_to(P(XL_, 0), LEFT)
        self.dire_eq(l2, "Les nombres ensemble : 12 moins 3, 9.", echelle=1.0, rt=0.12, avec=[Create(cn)])
        ob = Eq("On obtient", 34, CIEL, lettres="").move_to(P(0, 0.2)).align_to(P(XL_, 0), LEFT)
        self.dire_eq(ob, "On obtient", echelle=1.0, rt=0.12)
        e1 = Eq("3t + 9 = 27", 62).mis_sur_egal(X, 0.2)
        self.dire_eq(e1, "3 t plus 9 égale 27")
        c1 = SurroundingRectangle(VGroup(*e1.atomes[:2]), color=INCONNUE, buff=0.07, corner_radius=0.07, stroke_width=4)
        c2 = SurroundingRectangle(e1.atomes[3], color=NOMBRE, buff=0.07, corner_radius=0.07, stroke_width=4)
        self.play(Create(c1), Create(c2), e1.egal.animate.set_color(EGAL), run_time=0.15)
        s1 = Eq("On soustrait 9 :", 34, OPERATION, lettres="").move_to(P(0, -0.9)).align_to(P(XL_, 0), LEFT)
        self.dire_eq(s1, "On soustrait 9 :", echelle=1.0, rt=0.12)
        e2 = Eq("3t = 18", 62).mis_sur_egal(X, -0.9)
        self.dire_eq(e2, "3 t égale 18")
        s2 = Eq("On divise par 3 :", 34, OPERATION, lettres="").move_to(P(0, -2.0)).align_to(P(XL_, 0), LEFT)
        self.dire_eq(s2, "On divise par 3 :", echelle=1.0, rt=0.12)
        e3 = Eq("t = 6", 62).mis_sur_egal(X, -2.0)
        self.dire_eq(e3, "t égale 6")
        cad = SurroundingRectangle(e3, color=VERT_OK, buff=0.14, corner_radius=0.1, stroke_width=4)
        self.play(e3.droite.animate.set_color(VERT_OK), Create(cad), run_time=0.2)
        self.attendre_voix(marge=0.5)

    # ── 06q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = rang(5, 0.46, 0.08).move_to(P(-3.4, 1.35))
        ba = barre_parts(g[:3].width, 0.85, 3, P(g[:3].get_x(), -0.25))

        def avant(sc):
            sc.eq_dans_q(0, "5x − 2x = 9.", "5 x moins 2 x égale 9.", fs=36)
            sc.eq_dans_q(0, "Que vaut x ?", "Que vaut x ?", fs=36, lettres="x")
            sc.play(FadeIn(g), run_time=0.2)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : 3.", "Réponse A : 3.", premier=True)
            e = sc.ph_eq(1, "5x − 2x, 3x.", "5 x moins 2 x, 3 x.", lettres="x")
            non = VGroup(*[sc.barrer(m) for m in g[3:]])
            sc.play(Create(non), g[3].animate.set_opacity(0.3), g[4].animate.set_opacity(0.3), run_time=0.2)
            neuf = T("9", 44, WHITE, audit=False, gras=True).move_to(ba)
            sc.ph_eq(2, "Donc 3x = 9, et x = 3.", "Donc 3 x égale 9, et x égale 3.", lettres="x")
            sc.play(FadeIn(ba), FadeIn(neuf), run_time=0.15)
            trois = VGroup(*[T("3", 40, VERT_OK, audit=False, gras=True).move_to(P(m.get_x(), ba.get_y())) for m in g[:3]])
            coupes = VGroup(*[DashedLine(P((g[k].get_right()[0] + g[k + 1].get_left()[0]) / 2, ba.get_top()[1]),
                                         P((g[k].get_right()[0] + g[k + 1].get_left()[0]) / 2, ba.get_bottom()[1]),
                                         color=OPERATION, stroke_width=4) for k in range(2)])
            sc.play(Create(coupes), FadeOut(neuf), FadeIn(trois, scale=1.2), run_time=0.2)
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["5x − 2x = 9.", "Que vaut x ?"],
                            [Eq("3", 34), Eq("6", 34), Eq("9", 34)], 0,
                            ["Réponse A : 3.", "5x − 2x, 3x.", "Donc 3x = 9, et x = 3."],
                            avant_q=avant, autres_r=apres)

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.au("À toi", Write(tit), rt=0.5)
        XG, XD = -6.2, 4.4
        cr = coureuse(0.9).move_to(P(2.25, 2.1))
        l1 = Eq("Une coureuse fait 3 boucles de x km,", 30, lettres="x").move_to(P(0, 2.2)).align_to(P(XG, 0), LEFT)
        r3 = rang(3, 0.38, 0.1).move_to(P(XD, 2.0))
        self.par_morceaux(l1, (3, "Une coureuse fait", [FadeIn(cr)]), (5, "3 boucles de x kilomètres,", [FadeIn(r3, shift=LEFT * 0.2)]))
        l2 = Eq("puis 2 boucles de x km,", 30, lettres="x").move_to(P(0, 1.1)).align_to(P(XG, 0), LEFT)
        r2 = rang(2, 0.38, 0.1).move_to(P(0, 1.0)).align_to(r3, LEFT)
        self.dire_eq(l2, "puis 2 boucles de x kilomètres,", echelle=1.0, rt=0.12, avec=[FadeIn(r2, shift=LEFT * 0.2)])
        l3 = Eq("puis encore 4 km.", 30, lettres="").move_to(P(0, 0.05)).align_to(P(XG, 0), LEFT)
        seg = Line(P(r3.get_left()[0], -0.1), P(r3.get_right()[0], -0.1), color=NOMBRE, stroke_width=9)
        q4 = T("4 km", 30, NOMBRE, audit=False, gras=True).next_to(seg, UP, buff=0.1)
        self.dire_eq(l3, "puis encore 4 kilomètres.", echelle=1.0, rt=0.12)
        self.play(Create(seg), FadeIn(q4), run_time=0.2)
        l4 = Eq("En tout, 19 km.", 38, JAUNE_TITRE, lettres="").move_to(P(0, -0.85)).align_to(P(XG, 0), LEFT)
        self.dire_eq(l4, "En tout, 19 kilomètres.", echelle=1.0, rt=0.12)
        l5 = Eq("Écris l'équation et trouve x.", 38, CIEL, lettres="x").move_to(P(-0.7, -1.75))
        self.dire_eq(l5, "Écris l'équation et trouve x.", echelle=1.0, rt=0.12)
        pz = T("Mets pause, et cherche !", 38, ORANGE_RETENUE).move_to(P(-0.7, -2.7))
        self.au("Mets pause", Write(pz), rt=0.6)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("07b-correction", 0.5)
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.au("Correction", Write(tit), rt=0.4)
        X, XG = -0.4, -6.2
        r3 = rang(3, 0.36, 0.08)
        r2 = rang(2, 0.36, 0.08)
        pl = T("+", 40, OPERATION, audit=False, gras=True)
        hg = VGroup(r3, pl, r2).arrange(RIGHT, buff=0.08).move_to(P(4.0, 1.95))
        if hg.get_right()[0] > 6.5:
            hg.shift(LEFT * (hg.get_right()[0] - 6.5))
        e0 = Eq("3x + 2x + 4 = 19", 52).mis_sur_egal(X, 1.95)
        self.dire_eq(e0, "3 x plus 2 x plus 4 égale 19", avec=[FadeIn(hg)])
        self.play(e0.egal.animate.set_color(EGAL), run_time=0.1)
        la = Eq("On réduit :", 32, OPERATION, lettres="").move_to(P(0, 0.8)).align_to(P(XG, 0), LEFT)
        cible = VGroup(r3.copy(), r2.copy()).arrange(RIGHT, buff=0.08).move_to(hg)
        self.dire_eq(la, "On réduit :", echelle=1.0, rt=0.12)
        self.play(FadeOut(pl), r3.animate.move_to(cible[0]), r2.animate.move_to(cible[1]), run_time=0.22)
        e1 = Eq("5x + 4 = 19", 52).mis_sur_egal(X, 0.8)
        self.dire_eq(e1, "5 x plus 4 égale 19")
        cad = SurroundingRectangle(VGroup(r3, r2), color=VERT_OK, buff=0.08, corner_radius=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.1)
        lb = Eq("On soustrait 4 :", 32, OPERATION, lettres="").move_to(P(0, -0.3)).align_to(P(XG, 0), LEFT)
        self.dire_eq(lb, "On soustrait 4 :", echelle=1.0, rt=0.12)
        e2 = Eq("5x = 15", 52).mis_sur_egal(X, -0.3)
        self.dire_eq(e2, "5 x égale 15")
        lc = Eq("On divise par 5 :", 32, OPERATION, lettres="").move_to(P(0, -1.4)).align_to(P(XG, 0), LEFT)
        self.dire_eq(lc, "On divise par 5 :", echelle=1.0, rt=0.12)
        e3 = Eq("x = 3", 52).mis_sur_egal(X, -1.4)
        self.dire_eq(e3, "x égale 3")
        self.play(e3.droite.animate.set_color(VERT_OK), run_time=0.1)
        b = Boucle(0.8, "", couleur=VERT_OK).move_to(P(3.95, 0.05))
        km = T("3 km", 34, VERT_OK, audit=False, gras=True).move_to(b.trace)
        fin = Eq("La boucle fait 3 km.", 42, VERT_OK, lettres="").move_to(P(-1.0, -2.6))
        self.dire_eq(fin, "La boucle fait 3 kilomètres.", echelle=1.0, rt=0.13, avec=[FadeIn(b.trace), FadeIn(b.drapeau)])
        self.play(FadeIn(km, scale=1.3), Create(self.encadrer(fin, buff=0.16)), run_time=0.2)
        self.attendre_voix(marge=0.6)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        r = VGroup(rang(2, 0.5, 0.1), rang(3, 0.5, 0.1)).arrange(DOWN, buff=0.2)
        e = Eq("2x + 3x = 5x", 50).sans_audit().next_to(r, DOWN, buff=0.3)
        e.egal.set_color(EGAL)
        s = Eq("x = 1x", 50).sans_audit().next_to(e, DOWN, buff=0.25)
        s.egal.set_color(EGAL)
        fig = VGroup(r, e, s)
        lignes = self.finale_colonne([["Quand x apparaît plusieurs fois,", "on réduit d'abord."],
                                      ["On regroupe les x avec les x,", "les nombres avec les nombres."],
                                      ["x tout seul, c'est 1x."]], fs=36, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_coach()
        self.ecran_reduire()
        self.ecran_resoudre()
        self.ecran_seul()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_mele()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
