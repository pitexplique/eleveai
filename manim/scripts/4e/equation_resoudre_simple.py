# equation_resoudre_simple.py
# EleveAI — Maths 4e — série « Équations », épisode 03 : RÉSOUDRE UNE ÉQUATION SIMPLE.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : equation_resoudre_simple.
# Décor et métier : ANIMAUX (Marie, vétérinaire). Centres : animaux, chiens-chats.
# Écrans : garde (00) ; le chien dans sa caisse (01) ; la balance (02) ; défaire,
# l'opération inverse (03) ; la tortue (04) ; QUESTION 1 (04q) ; les 3 chiots (05) ;
# le piège des 5 chatons (06) ; QUESTION 2 (06q) ; un nombre négatif (07) ; défi (08)
# et correction (08b) ; ce que tu as appris (09) ; fin (10).
# Voix : manim/voix/4e-equation-resoudre-simple.json (validée, débit −6) ; marques :
# equation_resoudre_simple_marques.json.
#
# Complète equation_commun.py (lecture seule), ICI : BalanceVeto (plateaux en
# portique : rien ne croise les cordes), Pese (balance à affichage), les animaux,
# E() (les décimaux, dits « 1 virgule 6 »), descendre(), ph_eq().
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/equation_resoudre_simple.py EquationResoudreSimple4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/equation_resoudre_simple.py EquationResoudreSimple4e -o eleveai-maths-4e-equation-resoudre-simple --media_dir manim/scripts/4e/media-eq-03
# Sortie : manim/sorties/4e/maths/equations/03-resoudre-simple/eleveai-maths-4e-equation-resoudre-simple.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402

PAROLE.update({"1,6": "1 virgule 6", "2,5": "2 virgule 5", "1,5": "1 virgule 5"})
GRIS_P = "#94a3b8"


def E(s, fs=60, **kw):
    """Une Eq dont les décimaux (« 1,6 », dit « 1 virgule 6 ») ne passent pas à
    l'audit : dire_eq les pose quand même AU MOT (table PAROLE)."""
    e = Eq(s, fs, **kw)
    for a in e.atomes:
        if "," in a.original_text and a.original_text[0].isdigit():
            a._pas_audit = True
    return e


class BalanceVeto(Balance):
    """Balance du module, mais chaque plateau pend à un PORTIQUE : les charges
    tiennent dedans sans que rien ne les croise."""
    RATIO = 0.22

    def _plateau(self, largeur, couleur):
        w = largeur * 0.36
        h = largeur * self.RATIO
        L, R, H = LEFT * w / 2, RIGHT * w / 2, UP * h
        plat = Line(L, R, color=couleur, stroke_width=7)
        cordes = VGroup(Line(H, H + L, color=couleur, stroke_width=3), Line(H, H + R, color=couleur, stroke_width=3),
                        Line(H + L, L, color=couleur, stroke_width=3), Line(H + R, R, color=couleur, stroke_width=3))
        g = VGroup(cordes, plat)
        g.plat, g.h = plat, h
        return g

    def charger(self, cote, mob, dx=0.0):
        """Met mob sur le plateau (à jouer ensuite) et l'attache au plateau."""
        mob.next_to(self.plat[cote].plat, UP, buff=0.05).shift(RIGHT * dx)
        self.sur[cote].append(mob)
        return mob

    def legender(self, cote, mob):
        """Une étiquette sous le plateau, attachée à lui."""
        mob.next_to(self.plat[cote].plat, DOWN, buff=0.1)
        self.sur[cote].append(mob)
        return mob


class BalanceHaute(BalanceVeto):
    """Le même portique, plus haut : deux charges empilées y tiennent, loin du fléau."""
    RATIO = 0.37


class Pese(VGroup):
    """La balance du cabinet : un plateau, un boîtier, un écran (.afficher)."""

    def __init__(self, largeur=4.6, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.plateau = RoundedRectangle(width=largeur, height=0.16, corner_radius=0.05, fill_color="#cbd5e1",
                                        fill_opacity=1, stroke_width=0)
        self.boitier = RoundedRectangle(width=largeur * 0.8, height=0.86, corner_radius=0.1, fill_color="#334155",
                                        fill_opacity=1, stroke_width=0).next_to(self.plateau, DOWN, buff=0)
        self.lcd = RoundedRectangle(width=1.8, height=0.6, corner_radius=0.06, fill_color="#022c22", fill_opacity=1,
                                    stroke_color=VERT_OK, stroke_width=2).move_to(self.boitier)
        self.val = T("- -", 34, VERT_OK, audit=False).move_to(self.lcd)
        self.add(self.boitier, self.plateau, self.lcd, self.val)
        self.move_to(centre)

    def afficher(self, s, couleur=VERT_OK, fs=36, audit=True):
        t = T(s, fs, couleur, audit, gras=True).move_to(self.lcd)
        a = ReplacementTransform(self.val, t)
        self.val = t
        return a

    def dessus(self, mob, x=None):
        mob.next_to(self.plateau, UP, buff=0.02)
        if x is not None:
            mob.set_x(x)
        return mob


def _r(w, h, c, x, y, r=0.05):
    return RoundedRectangle(width=w, height=h, corner_radius=r, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(x, y))


def chien(s=1.0, c="#b45309", c2="#fcd9a8", c3="#78350f"):
    pattes = VGroup(*[_r(0.11, 0.3, c3, x, 0.15, 0.03) for x in (-0.42, -0.24, 0.24, 0.42)])
    corps = _r(1.14, 0.48, c, 0, 0.47, 0.2)
    queue = Line(P(-0.52, 0.6), P(-0.76, 0.92), color=c3, stroke_width=9)
    tete = Circle(radius=0.27, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0.62, 0.8))
    museau = _r(0.27, 0.18, c2, 0.86, 0.73, 0.07)
    nez = Dot(P(0.97, 0.77), radius=0.045, color="#111827")
    oeil = Dot(P(0.68, 0.87), radius=0.035, color="#111827")
    oreille = Ellipse(width=0.17, height=0.36, fill_color=c3, fill_opacity=1, stroke_width=0).rotate(-0.3).move_to(P(0.46, 0.84))
    g = VGroup(queue, pattes, corps, tete, museau, nez, oeil, oreille)
    g.corps = corps
    return g.scale(s)


def chaton(s=1.0, c="#f59e0b", c2="#92400e"):
    queue = Arc(radius=0.2, start_angle=-0.4, angle=2.4, stroke_color=c2, stroke_width=8, arc_center=P(-0.5, 0.42))
    pattes = VGroup(*[_r(0.09, 0.2, c2, x, 0.1, 0.03) for x in (-0.25, 0.22)])
    corps = Ellipse(width=0.84, height=0.46, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0, 0.34))
    tete = Circle(radius=0.22, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0.42, 0.6))
    or1 = Polygon(P(0.24, 0.74), P(0.38, 0.78), P(0.27, 0.95), fill_color=c2, fill_opacity=1, stroke_width=0)
    or2 = Polygon(P(0.46, 0.78), P(0.6, 0.74), P(0.57, 0.95), fill_color=c2, fill_opacity=1, stroke_width=0)
    yeux = VGroup(Dot(P(0.36, 0.63), radius=0.028, color="#111827"), Dot(P(0.5, 0.63), radius=0.028, color="#111827"))
    g = VGroup(queue, pattes, corps, tete, or1, or2, yeux)
    g.corps = corps
    return g.scale(s)


def tortue(s=1.0, c="#15803d", c2="#86efac"):
    pattes = VGroup(*[_r(0.22, 0.22, c2, x, 0.11, 0.08) for x in (-0.42, 0.42)])
    tete = Circle(radius=0.2, fill_color=c2, fill_opacity=1, stroke_width=0).move_to(P(0.84, 0.36))
    oeil = Dot(P(0.9, 0.42), radius=0.03, color="#111827")
    queue = Polygon(P(-0.7, 0.3), P(-0.7, 0.16), P(-0.92, 0.18), fill_color=c2, fill_opacity=1, stroke_width=0)
    carapace = AnnularSector(inner_radius=0, outer_radius=0.74, angle=PI, start_angle=0, fill_color=c, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.54))
    motifs = VGroup(*[RegularPolygon(6, radius=0.15, fill_color=c2, fill_opacity=0.5, stroke_width=0).move_to(P(x, y))
                      for x, y in ((0, 0.62), (-0.36, 0.38), (0.36, 0.38))])
    g = VGroup(pattes, queue, tete, oeil, carapace, motifs)
    g.corps = carapace
    return g.scale(s)


def poids(lignes, cote=0.32):
    """Les poids de 1 kg, en rangées (de bas en haut) : renvoie (groupe, liste à plat)."""
    g = VGroup()
    for n in lignes:
        g.add(VGroup(*[Square(cote, stroke_color=WHITE, stroke_width=2, fill_color=GRIS_P, fill_opacity=1)
                       for _ in range(n)]).arrange(RIGHT, buff=0.015))
    g.arrange(UP, buff=0.015)
    return g, [c for r in g for c in r]


def marquer(animal, s="x", fs=30, c=None):
    """L'inconnue écrite sur l'animal."""
    t = T(s, fs, c or WHITE, audit=False, gras=True).move_to(animal.corps)
    return t


X_EG = 3.7  # le signe = des lignes de calcul, colonne de droite


class _OutilsVeto:
    # ── outils de l'épisode ─────────────────────────────────────────────────
    def descendre(self, a, b, phrase, n=1):
        """La ligne suivante : x et = glissent de la ligne a, le reste vient AU MOT."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(phrase, i + 1)
        self._attendre_pos(i)
        self.play(TransformFromCopy(a.x[0], b.x[0]), TransformFromCopy(a.egal, b.egal), run_time=0.22)
        self.dire_eq(b, phrase, n=n, sauf=[b.x[0], b.egal])

    def sous_membre(self, m, s, y, fs=48, couleur=None, audit=True):
        """L'opération orange, écrite sous un membre (m) à la hauteur y."""
        o = E(s, fs, couleur=couleur or OPERATION, lettres="")
        if not audit:
            o.sans_audit()
        return o.move_to(P(m.get_x(), y))

    def ph_eq(self, i, s, phrase, n=1, lettres="", couleur=None, premier=False):
        """La ligne i de la phrase de réponse, posée mot à mot (avec ses nombres)."""
        ref = self.ph_q[i]
        e = E(s, 30, couleur=couleur or VERT_OK, lettres=lettres)
        e.scale_to_fit_height(ref.height).move_to(ref).align_to(ref, LEFT)
        sauf = []
        if premier:  # « Réponse » : dit pendant que la carte s'allume, il n'attend plus
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        self.dire_eq(e, phrase, n=n, echelle=1.0, rt=0.16, sauf=sauf)
        return e


class EquationResoudreSimple4e(_OutilsVeto, PaysageEq):
    nom_voix = "4e-equation-resoudre-simple"
    fichier_marques = "equation_resoudre_simple_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre une équation simple", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Résoudre", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        b = BalanceVeto(largeur=3.5, hauteur=2.3, centre=P(-4.2, -0.2))
        cx = b.charger("g", Charge("x", INCONNUE, 36, audit=False))
        cq = b.charger("d", Charge("?", OPERATION, 36, audit=False))
        l1 = Eq("Comment retrouver x", 44).move_to(P(1.7, 0.45))
        l2 = Eq("sans deviner ?", 44, lettres="").move_to(P(1.7, -0.3))
        self.dire_eq(l1, "Comment retrouver x", echelle=1.0, avec=[FadeIn(b), FadeIn(cx), FadeIn(cq)])
        self.dire_eq(l2, "sans deviner ?", echelle=1.0)
        self.insister(cx, 1.3, 0.2)
        self.attendre_voix(marge=0.6)

    # ── 01 : Marie, le chien dans sa caisse ─────────────────────────────────
    def ecran_veto(self):
        self.ecran("01-veto")
        m = Metier(["Marie", "vétérinaire"], fs=34, peau="#e0ac69", tenue="#0d9488", cheveux="#78350f", longs=True, s=0.9)
        m.perso.add(blouse(m.perso))
        m.perso.move_to(P(-5.55, -1.3))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.3)
        self.au("Marie", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("vétérinaire", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        pese = Pese(4.2, centre=P(-1.95, -2.35))
        self.au("pèse", FadeIn(pese, shift=UP * 0.2), rt=0.3)
        ch = pese.dessus(chien(0.92), -2.0)
        self.au("petit chien", FadeIn(ch, shift=DOWN * 0.4), rt=0.3)
        # la caisse : une cage ouverte devant le chien
        cage = Rectangle(width=2.5, height=1.5, stroke_color="#fbbf24", stroke_width=5)
        barres = VGroup(*[Line(P(x, -0.75), P(x, 0.75), color="#fbbf24", stroke_width=2) for x in (-0.75, -0.25, 0.25, 0.75)])
        caisse = VGroup(cage, barres)
        pese.dessus(caisse, -1.95)
        self.au("caisse", Create(cage), Create(barres), rt=0.3)
        tag4 = T("4 kg", 34, "#fbbf24", gras=True).next_to(caisse, UP, buff=0.1)
        self.au("4 kilos", FadeIn(tag4, scale=1.3), rt=0.25)
        self.au("affiche", self.insister_lcd(pese), rt=0.2)
        self.au("9 kilos", pese.afficher("9 kg"), rt=0.3)
        self.insister(pese.val, 1.3, 0.18)
        x_tag = T("x kg", 38, INCONNUE, gras=True).next_to(tag4, UP, buff=0.14)
        self.au("x kilos", FadeIn(x_tag, scale=1.3), rt=0.3)
        fl = Arrow(x_tag.get_left() + LEFT * 0.08, ch.corps.get_left() + UP * 0.1, color=INCONNUE, stroke_width=5, buff=0.05,
                   path_arc=0.9, max_tip_length_to_length_ratio=0.15)
        self.play(GrowArrow(fl), run_time=0.25)
        e = Eq("x + 4 = 9", 84).move_to(P(3.75, 0.4))
        self.dire_eq(e, "x plus 4 égale 9")
        self.play(e.egal.animate.set_color(EGAL), run_time=0.15)
        self.insister(VGroup(e.x[0]), 1.5, 0.22, about=e.x[0].get_center())
        self.attendre_voix(marge=0.5)

    def insister_lcd(self, pese):
        return pese.lcd.animate.set_stroke(JAUNE_TITRE, 5)

    # ── 02 : la balance ─────────────────────────────────────────────────────
    def ecran_balance(self):
        self.ecran("02-balance")
        e1 = Eq("x + 4 = 9", 66).sans_audit().mis_sur_egal(X_EG, 2.3)
        b = BalanceVeto(largeur=5.8, hauteur=3.2, centre=P(-3.0, -0.35))
        tit = T("en équilibre", 36, JAUNE_TITRE).move_to(P(-3.0, 2.75))
        self.au("Imagine", FadeIn(e1), FadeIn(b), rt=0.35)
        self.au("équilibre", FadeIn(tit, shift=DOWN * 0.15), rt=0.3)
        # à gauche : le chien et 4 poids
        ch = chien(0.62)
        ch.add(marquer(ch))
        self.au("chien", FadeIn(b.charger("g", ch, -0.42), shift=DOWN * 0.3), rt=0.25)
        self.play(b.incliner(0.08, run_time=0.25))
        pg, lg = poids([2, 2])
        pg.next_to(b.plat["g"].plat, UP, buff=0.05).shift(RIGHT * 0.62)
        b.sur["g"] += lg
        tg = b.legender("g", T("4 kg", 32, WHITE))
        self.au("4 kilos", FadeIn(pg, shift=DOWN * 0.3), FadeIn(tg), rt=0.25)
        self.play(b.incliner(0.16, run_time=0.25))
        # à droite : 9 poids, la balance se remet droite
        pd, ld = poids([3, 3, 3])
        pd.next_to(b.plat["d"].plat, UP, buff=0.05)
        b.sur["d"] += ld
        td = b.legender("d", T("9 kg", 32, WHITE))
        self.au("9 kilos", FadeIn(pd, shift=DOWN * 0.3), FadeIn(td), rt=0.25)
        self.play(b.incliner(0.0, run_time=0.4))
        # on retire 4 à gauche : elle penche
        ops_g = self.sous_membre(e1.gauche, "− 4", 1.4)
        self.dire_eq(ops_g, "retire 4 kilos", echelle=1.0)
        self.play(*b.retirer(lg + [tg], []), b.incliner(-0.14, run_time=0.5), tit.animate.set_opacity(0), run_time=0.5)
        # à droite aussi : elle revient
        ops_d = self.sous_membre(e1.droite, "− 4", 1.4)
        self.dire_eq(ops_d, "retire 4 kilos", n=2, echelle=1.0)
        self.play(*b.retirer([], ld[-4:] + [td]), b.incliner(0.0, run_time=0.5), tit.animate.set_opacity(1), run_time=0.5)
        # il reste
        e2 = Eq("x = 5", 66).mis_sur_egal(X_EG, 0.45)
        self.descendre(e1, e2, "x égale 5")
        fin = Eq("Le chien pèse 5 kilos.", 34, VERT_OK, lettres="").move_to(P(3.45, -0.85))
        self.dire_eq(fin, "Le chien pèse 5 kilos.", echelle=1.0, rt=0.15)
        t5 = b.legender("d", T("5 kg", 32, VERT_OK, audit=False, gras=True))
        self.play(FadeIn(t5, scale=1.4), e2.droite.animate.set_color(VERT_OK), run_time=0.2)
        cad = self.encadrer(fin, buff=0.16)
        self.play(Create(cad), run_time=0.2)
        self.attendre_voix(marge=0.5)

    # ── 03 : résoudre, c'est défaire ────────────────────────────────────────
    def ecran_inverse(self):
        self.ecran("03-inverse")
        tit = Eq("Résoudre, c'est défaire.", 54, JAUNE_TITRE, lettres="").move_to(P(-0.3, 2.95))
        self.dire_eq(tit, "Résoudre, c'est défaire.", echelle=1.0, rt=0.18)
        XG, XD, Y = -3.6, 2.9, 0.65
        n1 = Eq("x", 76).sans_audit().move_to(P(XG, Y))
        n2 = Eq("x + 4", 76).sans_audit().move_to(P(XD, Y))
        haut = CurvedArrow(n1.get_top() + P(0.25, 0.1), n2.get_top() + P(-0.4, 0.1), angle=-0.55, color=WHITE, stroke_width=6)
        bas = CurvedArrow(n2.get_bottom() + P(-0.4, -0.1), n1.get_bottom() + P(0.25, -0.1), angle=-0.55, color=OPERATION, stroke_width=7)
        l1 = Eq("On ajoutait 4", 40, lettres="").move_to(P((XG + XD) / 2 - 0.1, Y + 1.25))
        l2 = Eq("on soustrait 4", 40, OPERATION, lettres="").move_to(P((XG + XD) / 2 - 0.1, Y - 1.25))
        self.dire_eq(l1, "On ajoutait 4", echelle=1.0, avec=[FadeIn(n1, scale=1.2), Create(haut)])
        self.play(FadeIn(n2, shift=RIGHT * 0.2), run_time=0.2)
        self.dire_eq(l2, "on soustrait 4", echelle=1.0, avec=[Create(bas)])
        ligne = Eq("x + 4 − 4 = 9 − 4", 60).sans_audit().move_to(P(-0.3, -1.65))
        for k in (3, 4, 7, 8):  # − 4, des deux côtés
            ligne.atomes[k].set_color(OPERATION)
        ligne.egal.set_color(EGAL)
        d2 = VGroup(ligne.atomes[3], ligne.atomes[4])
        d3 = VGroup(ligne.atomes[7], ligne.atomes[8])
        self.au("deux côtés", FadeIn(VGroup(*ligne.atomes[:3], ligne.egal, ligne.atomes[6])), rt=0.2)
        self.play(FadeIn(d2, scale=1.4), FadeIn(d3, scale=1.4), run_time=0.25)
        self.insister(VGroup(d2, d3), 1.25, 0.2)
        fin = Eq("C'est l'opération inverse.", 44, OPERATION, lettres="").move_to(P(-0.5, -2.7))
        self.dire_eq(fin, "C'est l'opération inverse.", echelle=1.0, rt=0.15)
        self.attendre_voix(marge=0.5)

    # ── 04 : la tortue ──────────────────────────────────────────────────────
    def ecran_moins(self):
        self.ecran("04-moins")
        pese = Pese(4.4, centre=P(-3.4, -2.3))
        to = pese.dessus(tortue(1.7), -3.4)
        qui = T("Une tortue", 42, CIEL).move_to(P(-3.4, 2.1))
        self.au("Une tortue", FadeIn(qui, shift=DOWN * 0.15), FadeIn(pese), FadeIn(to, shift=DOWN * 0.3), rt=0.35)
        perte = T("− 3 kg", 42, OPERATION, gras=True).move_to(P(-3.4, 1.25))
        self.au("perdu", to.animate.scale(0.82, about_point=to.get_bottom()), rt=0.3)
        self.au("3 kilos", FadeIn(perte, scale=1.3), rt=0.25)
        self.au("8 kilos", pese.afficher("8 kg"), rt=0.3)
        self.insister(pese.val, 1.3, 0.18)
        e1 = Eq("x − 3 = 8", 66).mis_sur_egal(X_EG, 2.3)
        self.dire_eq(e1, "x moins 3 égale 8")
        self.play(e1.egal.animate.set_color(EGAL), run_time=0.12)
        rt_ = Eq("On retirait 3 :", 36, lettres="").move_to(P(3.7, 1.45))
        self.dire_eq(rt_, "On retirait 3 :", echelle=1.0, rt=0.15)
        aj = Eq("on ajoute 3", 36, OPERATION, lettres="").move_to(P(3.7, 0.9))
        self.dire_eq(aj, "on ajoute 3", echelle=1.0, rt=0.15)
        o1 = self.sous_membre(e1.gauche, "+ 3", 0.15, audit=False)
        o2 = self.sous_membre(e1.droite, "+ 3", 0.15, audit=False)
        self.au("deux côtés", FadeIn(o1, scale=1.3), FadeIn(o2, scale=1.3), rt=0.25)
        self.insister(VGroup(o1, o2), 1.2, 0.18)
        e2 = Eq("x = 11", 66).mis_sur_egal(X_EG, -0.8)
        self.descendre(e1, e2, "x égale 11")
        f1 = Eq("La tortue pesait", 36, VERT_OK, lettres="").move_to(P(0, -1.55)).align_to(P(1.3, 0), LEFT)
        f2 = Eq("11 kilos.", 36, VERT_OK, lettres="").next_to(f1, DOWN, buff=0.14).align_to(f1, LEFT)
        self.dire_eq(f1, "La tortue pesait", echelle=1.0, rt=0.15)
        self.dire_eq(f2, "11 kilos.", echelle=1.0, rt=0.15)
        self.play(to.animate.scale(1 / 0.82, about_point=to.get_bottom()), pese.afficher("11 kg", audit=False),
                  e2.droite.animate.set_color(VERT_OK), FadeOut(perte), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        e = Eq("x − 5 = 12", 62).sans_audit().mis_sur_egal(-3.2, 2.5)
        e.egal.set_color(EGAL)
        b = BalanceHaute(largeur=4.9, hauteur=2.3, centre=P(-3.2, -1.65))
        cg = b.charger("g", Charge("x − 5", INCONNUE, 34, audit=False))
        cd = b.charger("d", Charge("12", WHITE, 34, audit=False))

        def avant(sc):
            g = sc.q_q[0].get_left()[0]  # la ligne reste alignée à gauche sur la suivante
            e0 = E("Pour résoudre x − 5 = 12,", 34, lettres="x")
            e0.scale_to_fit_height(sc.q_q[0].height).move_to(sc.q_q[0]).align_to(P(g, 0), LEFT)
            sc.q_q.remove(sc.q_q[0])
            sc.dire_eq(e0, "Pour résoudre x moins 5 égale 12,")
            sc.play(FadeIn(e), FadeIn(b), FadeIn(cg), FadeIn(cd), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : ajouter 5.", "Réponse B : ajouter 5.", premier=True)
            o1 = sc.sous_membre(e.gauche, "+ 5", 1.72, 44, audit=False)
            o2 = sc.sous_membre(e.droite, "+ 5", 1.72, 44, audit=False)
            p1, p2 = Charge("+ 5", OPERATION, 30, audit=False), Charge("+ 5", OPERATION, 30, audit=False)
            p1.next_to(cg, UP, buff=0.07)
            p2.next_to(cd, UP, buff=0.07)
            b.sur["g"].append(p1)
            b.sur["d"].append(p2)
            sc.play(FadeIn(o1, scale=1.3), FadeIn(o2, scale=1.3), FadeIn(p1, shift=DOWN * 0.3), FadeIn(p2, shift=DOWN * 0.3), run_time=0.25)
            e2 = Eq("x = 17", 62).mis_sur_egal(-3.2, 0.92)
            sc.descendre(e, e2, "x égale 17")
            sc.play(e2.droite.animate.set_color(VERT_OK), run_time=0.12)
            sc.ph_eq(1, "On retirait 5,", "On retirait 5,")
            sc.ph_eq(2, "l'inverse est d'ajouter 5.", "l'inverse est d'ajouter 5.")
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Pour résoudre x − 5 = 12,", "que fait-on des deux côtés ?"],
                            [E("soustraire 5", 34, lettres=""), E("ajouter 5", 34, lettres=""), E("diviser par 5", 34, lettres="")], 1,
                            ["Réponse B : ajouter 5.", "On retirait 5,", "l'inverse est d'ajouter 5."],
                            avant_q=avant, autres_r=apres)

    # ── 05 : les 3 chiots ───────────────────────────────────────────────────
    def ecran_fois(self):
        self.ecran("05-fois")
        pese = Pese(5.6, centre=P(-3.2, -2.3))
        xs = (-5.0, -3.2, -1.4)
        ch = [pese.dessus(chien(0.95, "#d97706", "#fde68a", "#92400e"), x) for x in xs]
        n3 = T("3 chiots", 42, CIEL).move_to(P(-3.2, 1.9))
        self.au("3 chiots", FadeIn(n3, shift=DOWN * 0.15), FadeIn(pese), *[FadeIn(c, shift=DOWN * 0.3) for c in ch], rt=0.3)
        self.au("15 kilos", pese.afficher("15 kg"), rt=0.3)
        self.insister(pese.val, 1.3, 0.18)
        e1 = Eq("3x = 15", 72).mis_sur_egal(X_EG, 2.3)
        self.dire_eq(e1, "3 x égale 15")
        self.play(e1.egal.animate.set_color(EGAL), *[FadeIn(marquer(c)) for c in ch], run_time=0.2)
        self.au("Le 3", rt=0.1)
        co = e1.atomes[0]
        self.play(co.animate.set_color(OPERATION), run_time=0.15)
        self.insister(co, 1.6, 0.2, about=co.get_center())
        o1 = self.sous_membre(e1.gauche, "÷ 3", 1.35)
        self.dire_eq(o1, "divise par 3", echelle=1.0)
        # le plateau se coupe en 3 parts égales
        coupes = VGroup(*[DashedLine(P(x, -1.95), P(x, 0.2), color=OPERATION, stroke_width=4) for x in (-4.1, -2.3)])
        o2 = self.sous_membre(e1.droite, "÷ 3", 1.35, audit=False)
        self.au("deux côtés", FadeIn(o2, scale=1.3), Create(coupes), rt=0.3)
        self.insister(VGroup(o1, o2), 1.2, 0.18)
        e2 = Eq("x = 5", 72).mis_sur_egal(X_EG, 0.35)
        self.descendre(e1, e2, "x égale 5")
        f1 = Eq("Chaque chiot", 38, VERT_OK, lettres="").move_to(P(0, -0.8)).align_to(P(1.3, 0), LEFT)
        f2 = Eq("pèse 5 kilos.", 38, VERT_OK, lettres="").next_to(f1, DOWN, buff=0.14).align_to(f1, LEFT)
        self.dire_eq(f1, "Chaque chiot", echelle=1.0, rt=0.15)
        self.dire_eq(f2, "pèse 5 kilos.", echelle=1.0, rt=0.15)
        tags = [T("5 kg", 32, VERT_OK, audit=False, gras=True).next_to(c, UP, buff=0.14) for c in ch]
        self.play(*[FadeIn(t, scale=1.3) for t in tags], e2.droite.animate.set_color(VERT_OK), run_time=0.25)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège des 5 chatons ─────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = T("Le piège :", 46, PIEGE, gras=True).move_to(P(-3.6, 3.0))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.25)
        pese = Pese(5.4, centre=P(-3.45, -2.3))
        xs = [-5.5 + 1.02 * k for k in range(5)]
        ct = [pese.dessus(chaton(0.74), x) for x in xs]
        n5 = T("5 chatons", 36, CIEL).move_to(P(-3.45, 1.9))
        self.au("5 chatons", FadeIn(n5), FadeIn(pese), *[FadeIn(c, shift=DOWN * 0.3) for c in ct], rt=0.3)
        self.au("8 kilos", pese.afficher("8 kg"), rt=0.3)
        XE = 1.95
        e1 = Eq("5x = 8", 60).mis_sur_egal(XE, 2.85)
        self.dire_eq(e1, "5 x égale 8")
        self.play(e1.egal.animate.set_color(EGAL), run_time=0.12)
        # l'erreur : x = 3
        e3 = Eq("x = 3", 54, PIEGE, inconnue=PIEGE).mis_sur_egal(XE, 2.05)
        self.dire_eq(e3, "x égale 3")
        s1 = Eq("ils ont soustrait 5.", 38, PIEGE, lettres="").move_to(P(0, 1.33)).align_to(P(0.95, 0), LEFT)
        self.dire_eq(s1, "ils ont soustrait 5.", echelle=1.0, rt=0.12)
        ba = self.barrer(e3)
        self.play(Create(ba), run_time=0.2)
        # 5x, c'est 5 fois x
        s2 = Eq("5x, c'est 5 × x,", 36, lettres="x").move_to(P(0, 0.63)).align_to(P(0.95, 0), LEFT)
        self.dire_eq(s2, "5 x, c'est 5 fois x,", echelle=1.0, rt=0.12)
        ok = VGroup(*s2.atomes[-4:-1])
        self.play(ok.animate.set_color(VERT_OK), run_time=0.12)
        s3 = Eq("pas 5 + x.", 36, lettres="").move_to(P(0, 0.05)).align_to(P(0.95, 0), LEFT)
        self.dire_eq(s3, "pas 5 plus x.", echelle=1.0, rt=0.12)
        ko = VGroup(*s3.atomes[1:4])
        self.play(ko.animate.set_color(PIEGE), Create(self.barrer(ko)), run_time=0.2)
        # on divise
        d1 = Eq("On divise :", 30, OPERATION, lettres="").move_to(P(0, -0.6)).align_to(P(0.95, 0), LEFT)
        self.dire_eq(d1, "On divise :", echelle=1.0, rt=0.12)
        calc = E("8 ÷ 5 = 1,6", 38, lettres="").move_to(P(0, -0.6)).align_to(P(3.5, 0), LEFT)
        calc.atomes[-1].set_color(VERT_OK)
        calc.atomes[1].set_color(OPERATION)
        self.dire_eq(calc, "8 divisé par 5, 1 virgule 6")
        coupes = VGroup(*[DashedLine(P(xs[k] + 0.51, -1.95), P(xs[k] + 0.51, 0.05), color=OPERATION, stroke_width=3) for k in range(4)])
        self.play(Create(coupes), run_time=0.2)
        f1 = Eq("Chaque chaton", 38, VERT_OK, lettres="").move_to(P(0, -1.35)).align_to(P(0.95, 0), LEFT)
        f2 = E("pèse 1,6 kilo.", 38, couleur=VERT_OK, lettres="").next_to(f1, DOWN, buff=0.14).align_to(f1, LEFT)
        self.dire_eq(f1, "Chaque chaton", echelle=1.0, rt=0.13)
        self.dire_eq(f2, "pèse 1 virgule 6 kilo.", echelle=1.0, rt=0.13)
        tags = [T("1,6", 28, VERT_OK, audit=False, gras=True).next_to(c, UP, buff=0.12) for c in ct]
        self.play(*[FadeIn(t, scale=1.3) for t in tags], run_time=0.2)
        self.attendre_voix(marge=0.5)

    # ── 06q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        W = 5.8
        bx = VGroup(*[RoundedRectangle(width=W / 4 - 0.06, height=0.95, corner_radius=0.08, stroke_color=INCONNUE, stroke_width=4,
                                       fill_color="#0b1220", fill_opacity=1) for _ in range(4)]).arrange(RIGHT, buff=0.08)
        bx.move_to(P(-3.3, 1.0))
        xs = VGroup(*[T("x", 44, INCONNUE, audit=False, gras=True).move_to(c) for c in bx])
        barre = RoundedRectangle(width=bx.width, height=0.95, corner_radius=0.08, fill_color="#334155", fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=3).next_to(bx, DOWN, buff=0.14)
        dix = T("10", 44, WHITE, audit=False, gras=True).move_to(barre)

        def avant(sc):
            sc.eq_dans_q(0, "4x = 10.", "4 x égale 10.", fs=36)
            sc.play(FadeIn(bx), FadeIn(xs), FadeIn(barre), FadeIn(dix), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 2,5.", "Réponse B : 2 virgule 5.", premier=True)
            sc.ph_eq(1, "Le 4 multiplie x,", "Le 4 multiplie x,", lettres="x")
            sc.ph_eq(2, "donc 10 ÷ 4.", "donc 10 divisé par 4.")
            coupes = VGroup(*[DashedLine(P(c.get_right()[0] + 0.04, barre.get_top()[1]), P(c.get_right()[0] + 0.04, barre.get_bottom()[1]),
                                         color=OPERATION, stroke_width=4) for c in bx[:3]])
            part = VGroup(*[T("2,5", 40, VERT_OK, audit=False, gras=True).move_to(P(c.get_x(), barre.get_y())) for c in bx])
            sc.play(Create(coupes), FadeOut(dix), FadeIn(part, scale=1.2), run_time=0.25)
            # le piège : à gauche, sous la figure
            sc.au("Le 6", sc.cartes_q[0][0].animate.set_stroke(PIEGE, width=6, opacity=1),
                  sc.cartes_q[0][1].animate.set_opacity(1), rt=0.2)
            l1 = Eq("Le 6, c'est le piège", 36, PIEGE, lettres="").move_to(P(-3.3, -1.25))
            l2 = Eq("de la soustraction.", 36, PIEGE, lettres="").move_to(P(-3.3, -1.85))
            sc.dire_eq(l1, "Le 6, c'est le piège", echelle=1.0, rt=0.12)
            sc.dire_eq(l2, "de la soustraction.", echelle=1.0, rt=0.12)
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["4x = 10.", "Que vaut x ?"],
                            [Eq("6", 34), E("2,5", 34), Eq("40", 34)], 1,
                            ["Réponse B : 2,5.", "Le 4 multiplie x,", "donc 10 ÷ 4."],
                            avant_q=avant, autres_r=apres)

    # ── 07 : un nombre négatif ──────────────────────────────────────────────
    def ecran_negatif(self):
        self.ecran("07-negatif")
        tit = Eq("Ça marche aussi avec un nombre négatif.", 40, JAUNE_TITRE, lettres="").move_to(P(-0.3, 3.05))
        self.dire_eq(tit, "Ça marche aussi avec un nombre négatif.", echelle=1.0, rt=0.12)
        X = -0.4
        e1 = Eq("−3a = 30", 76, lettres="a").mis_sur_egal(X, 1.95)
        self.dire_eq(e1, "Moins 3 a égale 30")
        self.play(e1.egal.animate.set_color(EGAL), run_time=0.12)
        o1 = self.sous_membre(e1.gauche, "÷ (−3)", 0.95, 50)
        o2 = self.sous_membre(e1.droite, "÷ (−3)", 0.95, 50, audit=False)
        o2.shift(RIGHT * 0.35)
        self.dire_eq(o1, "divise par moins 3", echelle=1.0)
        self.au("deux côtés", FadeIn(o2, scale=1.3), rt=0.25)
        self.insister(VGroup(o1, o2), 1.15, 0.15)
        # la droite graduée, où tombe la solution
        ax = NumberLine(x_range=[-12, 12, 2], length=10.0, color=GRIS_P, stroke_width=4, include_tip=False,
                        include_numbers=False).move_to(P(-0.9, -1.9))
        lab = VGroup(*[T(s, 28, GRIS_P, audit=False).next_to(ax.n2p(v), DOWN, buff=0.42) for s, v in (("−10", -10), ("0", 0), ("10", 10))])
        e2 = Eq("a = −10", 76, lettres="a").mis_sur_egal(X, -0.1)
        self.play(FadeIn(ax), FadeIn(lab), run_time=0.2)
        self.descendre(e1, e2, "a égale moins 10")
        pt = Dot(ax.n2p(-10), radius=0.16, color=VERT_OK)
        self.play(e2.droite.animate.set_color(VERT_OK), FadeIn(pt, scale=2), lab[0].animate.set_color(VERT_OK), run_time=0.25)
        self.insister(pt, 1.6, 0.2)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    XC = (-3.75, 2.2)

    def ecran_defi(self):
        self.ecran("08-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.8, 3.1))
        self.au("À toi", Write(tit), rt=0.5)
        s = Eq("Résous deux équations.", 36, CIEL, lettres="").move_to(P(-0.8, 2.4))
        self.dire_eq(s, "Résous deux équations.", echelle=1.0, rt=0.15)
        self.cartes_d, self.eq_d, self.bal_d = [], [], []
        donnees = (("x + 5 = 12", "x plus 5 égale 12", "x + 5", "12"), ("6x = 9", "6 x égale 9", "6x", "9"))
        for k, (st, ph, cg, cd) in enumerate(donnees):
            ca = RoundedRectangle(width=5.6, height=4.15, corner_radius=0.16, stroke_color="#64748b", stroke_width=3,
                                  fill_color="#0b1220", fill_opacity=1).move_to(P(self.XC[k], -0.4))
            self.play(FadeIn(ca, shift=UP * 0.15), run_time=0.15)
            e = Eq(st, 56).move_to(P(self.XC[k], 1.15))
            self.dire_eq(e, ph)
            b = BalanceVeto(largeur=4.2, hauteur=2.0, centre=P(self.XC[k], -0.75))
            c1 = b.charger("g", Charge(cg, INCONNUE, 28, audit=False))
            c2 = b.charger("d", Charge(cd, WHITE, 28, audit=False))
            self.play(FadeIn(b), FadeIn(c1), FadeIn(c2), run_time=0.15)
            self.cartes_d.append(ca)
            self.eq_d.append(e)
            self.bal_d.append(VGroup(b, c1, c2))
        pz = T("Mets pause, et cherche !", 36, ORANGE_RETENUE).move_to(P(-0.8, -3.0))
        self.au("Mets pause", Write(pz), rt=0.6)
        self.tit_d, self.s_d, self.pz_d = tit, s, pz
        self.attendre_voix(marge=2.0)

    # ── 08b : la correction, dans les mêmes cartes ──────────────────────────
    def ecran_correction(self):
        self.dire("08b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.8, 3.1))
        self.au("Correction", FadeOut(self.s_d), FadeOut(self.pz_d), FadeOut(VGroup(*self.bal_d)),
                ReplacementTransform(self.tit_d, tit), rt=0.35)
        # carte 1
        e = self.eq_d[0]
        self.au("x plus 5", e.animate.scale(1.12), rt=0.15)
        self.play(e.animate.scale(1 / 1.12), run_time=0.15)
        o = Eq("on soustrait 5", 40, OPERATION, lettres="").move_to(P(self.XC[0], 0.1))
        self.dire_eq(o, "on soustrait 5", echelle=1.0, rt=0.15)
        r = Eq("x = 7", 62).move_to(P(self.XC[0], -1.05))
        self.descendre(e, r, "x égale 7")
        self.play(r.droite.animate.set_color(VERT_OK), self.cartes_d[0].animate.set_stroke(VERT_OK, 5), run_time=0.2)
        # carte 2
        e = self.eq_d[1]
        self.au("6 x", e.animate.scale(1.12), rt=0.15)
        self.play(e.animate.scale(1 / 1.12), run_time=0.15)
        o = Eq("on divise par 6", 40, OPERATION, lettres="").move_to(P(self.XC[1], 0.1))
        self.dire_eq(o, "on divise par 6", echelle=1.0, rt=0.15)
        r = E("x = 1,5", 62).move_to(P(self.XC[1], -1.05))
        self.descendre(e, r, "x égale 1 virgule 5")
        self.play(r.droite.animate.set_color(VERT_OK), self.cartes_d[1].animate.set_stroke(VERT_OK, 5), run_time=0.2)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        b = BalanceVeto(largeur=4.2, hauteur=2.4)
        ch = chien(0.5)
        ch.add(marquer(ch, fs=24))
        b.charger("g", ch)
        c5 = b.charger("d", Charge("5 kg", VERT_OK, 28, audit=False))
        fig = VGroup(b, ch, c5)
        lignes = self.finale_colonne([["On fait la même opération", "des deux côtés."],
                                      ["Un nombre ajouté se soustrait,", "un nombre retiré s'ajoute."],
                                      ["Devant un produit, on divise."]], fs=36, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_veto()
        self.ecran_balance()
        self.ecran_inverse()
        self.ecran_moins()
        self.ecran_question1()
        self.ecran_fois()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_negatif()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
