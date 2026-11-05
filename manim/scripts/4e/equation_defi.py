# equation_defi.py
# EleveAI — Maths 4e — série « Équations », épisode 07 : LE DÉFI.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : equation_defi.
# Décor et métier : Lina, correctrice de manuels. Centres : jeux-defis.
# Écrans : garde (00) ; Lina et le calcul de Léo (01) ; bonne réponse, faux
# raisonnement (02) ; le vrai chemin (03) ; QUESTION 1 (03q) ; autre copie (04) ;
# QUESTION 2 (04q) ; x des deux côtés (05) ; défi (06) et correction (06b) ; ce que tu
# as appris (07) ; fin (08).
# Voix : manim/voix/4e-equation-defi.json (validée, débit −6) ;
# marques : equation_defi_marques.json.
#
# Complète equation_commun.py (lecture seule), ICI : E (une Eq sans ligature : « suffit »,
# « vérifie » se posent au mot), Feuille, Stylo, De, _OutilsDefi (entourer, glisser,
# ph_eq, deux_cotes, fleche_etape).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/equation_defi.py EquationDefi4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/equation_defi.py EquationDefi4e -o eleveai-maths-4e-equation-defi --media_dir manim/scripts/4e/media-eq-07
# Sortie : manim/sorties/4e/maths/equations/07-defi/eleveai-maths-4e-equation-defi.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import _ATOMES  # noqa: E402

PAPIER = "#fdf6e3"
ENCRE = "#1e293b"
ENCRE_X = "#1d4ed8"
STYLO = "#dc2626"
ENCRE_OK = "#15803d"


class E(Eq):
    """Une Eq dont la référence n'a pas de ligature : « ff » et « fi » ne plantent plus."""

    def __init__(self, s, fs=60, couleur=WHITE, lettres="xytn", inconnue=None, audit=True, **kw):
        VGroup.__init__(self, **kw)
        self.s, self.fs = s, fs
        inconnue = inconnue or INCONNUE
        ref = Text(s, font_size=fs, disable_ligatures=True)
        # sans ligature, Text garde un sous-objet par caractère, espaces compris
        assert len(ref.submobjects) == len(s), s
        ref = VGroup(*[m for m, c in zip(ref.submobjects, s) if not c.isspace()])
        self.atomes, k = [], 0
        for m in _ATOMES.finditer(s):
            mot = m.group(0)
            boite = VGroup(*ref.submobjects[k:k + len(mot)])
            k += len(mot)
            c = inconnue if mot in lettres else couleur
            a = T(mot, fs, c, audit).move_to(boite)
            self.atomes.append(a)
            self.add(a)
        self.egal = next((a for a in self.atomes if a.original_text == "="), None)
        self.x = VGroup(*[a for a in self.atomes if a.original_text in lettres])
        if self.egal is not None:
            i = self.atomes.index(self.egal)
            self.gauche, self.droite = VGroup(*self.atomes[:i]), VGroup(*self.atomes[i + 1:])


def encre(s, fs=44, lettres="xa", couleur=None):
    """Une ligne écrite SUR la feuille : encre sombre, inconnue en bleu foncé."""
    return E(s, fs, couleur=couleur or ENCRE, lettres=lettres, inconnue=ENCRE_X)


class Feuille(VGroup):
    """La feuille de manuel : papier crème, lignes bleues, marge rouge."""

    def __init__(self, w=6.0, h=4.0, pas=0.62, **kw):
        super().__init__(**kw)
        self.papier = RoundedRectangle(width=w, height=h, corner_radius=0.08, fill_color=PAPIER, fill_opacity=1,
                                       stroke_color="#94a3b8", stroke_width=2)
        self.lignes = VGroup()
        y = h / 2 - pas
        while y > -h / 2 + 0.1:
            self.lignes.add(Line(P(-w / 2 + 0.06, y), P(w / 2 - 0.06, y), color="#bfdbfe", stroke_width=1.5))
            y -= pas
        self.marge = Line(P(-w / 2 + 0.42, h / 2 - 0.04), P(-w / 2 + 0.42, -h / 2 + 0.04), color="#fca5a5", stroke_width=2)
        self.add(self.papier, self.lignes, self.marge)


class Stylo(VGroup):
    """Le stylo rouge de Lina ; .pointe() donne le bout, .sur(p) l'y amène."""

    def __init__(self, s=1.0, **kw):
        super().__init__(**kw)
        corps = Polygon(P(0.12, 0.2), P(0.72, 1.08), P(0.9, 0.95), P(0.3, 0.07), fill_color=STYLO, fill_opacity=1,
                        stroke_color="#7f1d1d", stroke_width=2)
        mine = Polygon(P(0, 0), P(0.12, 0.2), P(0.3, 0.07), fill_color="#fde68a", fill_opacity=1, stroke_color="#7f1d1d", stroke_width=2)
        self.bout = Dot(P(0, 0), radius=0.001, fill_opacity=0)
        self.add(corps, mine, self.bout)
        self.scale(s, about_point=ORIGIN)

    def pointe(self):
        return self.bout.get_center()

    def sur(self, p):
        return self.shift(np.array(p) - self.pointe())


class De(VGroup):
    """Un dé (points blancs sur fond sombre) : valeur 1 à 6."""

    POS = {1: [(0, 0)], 2: [(-1, 1), (1, -1)], 3: [(-1, 1), (0, 0), (1, -1)], 4: [(-1, 1), (1, 1), (-1, -1), (1, -1)],
           5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)], 6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]}

    def __init__(self, v=4, cote=0.7, couleur=None, **kw):
        super().__init__(**kw)
        c = couleur or OPERATION
        self.fond = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.16, fill_color="#1e293b", fill_opacity=1,
                                     stroke_color=c, stroke_width=4)
        k = cote * 0.27
        self.pips = VGroup(*[Dot(P(a * k, b * k), radius=cote * 0.085, color=WHITE) for a, b in self.POS[v]])
        self.add(self.fond, self.pips)


def coche_x(m, couleur=None, k=0.22):
    """Une grande croix rouge, centrée sur m."""
    o = m.get_center()
    return VGroup(Line(o + P(-k, k), o + P(k, -k)), Line(o + P(-k, -k), o + P(k, k))).set_stroke(couleur or PIEGE, 8)


class _OutilsDefi:
    """Ce que la paysage et le short de l'épisode partagent."""

    def entourer(self, stylo, m, rt=0.55, mx=0.16, my=0.1, couleur=None):
        """Lina entoure m au stylo rouge : le trait et le stylo vont ensemble."""
        o, a, b = m.get_center(), m.width / 2 + mx, m.height / 2 + my

        def f(t):
            r = 1 + 0.05 * t / TAU
            return o + np.array([a * r * np.cos(t + 2.2), b * r * np.sin(t + 2.2), 0.0])

        el = ParametricFunction(f, t_range=[0, TAU + 0.45, 0.05], color=couleur or STYLO, stroke_width=4)
        suit = UpdateFromAlphaFunc(stylo, lambda s, al: s.sur(el.point_from_proportion(max(al, 0.001))), rate_func=linear, run_time=rt)
        self.play(Create(el, rate_func=linear, run_time=rt), suit)
        return el

    def glisser(self, a, b, phrase, paires, n=1, sauf=(), rt=0.22):
        """La ligne b se pose AU MOT : chaque atome listé (paires {i_b: i_a}) GLISSE
        depuis la ligne a, les autres arrivent en fondu."""
        debut = -1
        for _ in range(n):
            debut = self._texte_voix.find(phrase, debut + 1)
        if debut < 0:
            raise ValueError(f"« {phrase} » absent de la voix {self._cle_voix}")
        src = {id(b.atomes[ib]): a.atomes[ia] for ib, ia in paires.items()}
        lots = self._plan_eq(b, debut, debut + len(phrase), sauf)
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = rt
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(rt, gap - 0.01))
            self.play(*[TransformFromCopy(src[id(x)], x) if id(x) in src else FadeIn(x, scale=1.2) for x in atomes],
                      run_time=d)

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

    def rouler(self, de, faces):
        """Le dé roule et tombe sur la dernière face."""
        for v in faces:
            n = De(v, de.fond.width).move_to(de)
            self.play(Rotate(de, PI / 2), run_time=0.09)
            self.remove(de)
            de = n
            self.add(de)
        return de

    def tag(self, s, x, y, fs=32):
        """L'opération orange, donnée de figure : la voix vient de la dire."""
        return E(s, fs, couleur=OPERATION, lettres="").sans_audit().move_to(P(x, y))

    def fleche_etape(self, y1, y2, x=1.2):
        """La flèche orange d'une ligne de calcul à la suivante, à droite."""
        return CurvedArrow(P(x, y1), P(x, y2), angle=-1.0, color=OPERATION, stroke_width=4, tip_length=0.16)


class EquationDefi4e(_OutilsDefi, PaysageEq):
    nom_voix = "4e-equation-defi"
    fichier_marques = "equation_defi_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi sur les équations", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Défi", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        f = Feuille(2.5, 2.7).move_to(P(-5.0, 0.2))
        st = Stylo(0.9).sur(P(-4.25, -0.45))
        l1 = E("Peut-on trouver la bonne réponse,", 38, lettres="").move_to(P(1.45, 0.65))
        self.dire_eq(l1, "Peut-on trouver la bonne réponse,", echelle=1.0, rt=0.12, avec=[FadeIn(f), FadeIn(st, shift=UP * 0.2)])
        ok = self.coche(VERT_OK, 0.42).move_to(f.get_center() + P(-0.1, 0.5))
        self.play(Create(ok), run_time=0.2)
        l2 = E("et avoir tort ?", 52, PIEGE, lettres="").move_to(P(1.45, -0.25))
        no = coche_x(f.papier, k=0.38).shift(P(-0.1, -0.5))
        self.dire_eq(l2, "et avoir tort ?", echelle=1.0, rt=0.14)
        self.play(Create(no), st.animate.sur(no.get_corner(DR)), run_time=0.25)
        self.insister(l2.atomes[2], 1.3, 0.16)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lina et le calcul de Léo ───────────────────────────────────────
    def ecran_correctrice(self):
        self.ecran("01-correctrice")
        m = Metier(["Lina"], fs=32, peau="#c68642", tenue="#0f766e", cheveux="#3f2a14", longs=True, s=0.72)
        m.nom.move_to(P(-5.0, 3.15))
        m.perso.next_to(m.nom, DOWN, buff=0.12).set_x(-5.0)
        self.au("Lina", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom, shift=UP * 0.1), rt=0.3)
        h1 = E("corrige des manuels de maths", 38, lettres="").move_to(P(1.0, 3.15))
        h2 = E("avant leur impression.", 38, lettres="").move_to(P(1.0, 2.55))
        pile = VGroup(*[RoundedRectangle(width=2.0 - 0.12 * (i % 2), height=0.3, corner_radius=0.05, fill_color=c, fill_opacity=1,
                                         stroke_color="#0f172a", stroke_width=2)
                        for i, c in enumerate(("#2563eb", "#059669", "#f59e0b", "#db2777"))]).arrange(UP, buff=0.0).move_to(P(-5.0, -2.2))
        self.dire_eq(h1, "corrige des manuels de maths", echelle=1.0, rt=0.12, avec=[LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in pile], lag_ratio=0.25)])
        self.dire_eq(h2, "avant leur impression.", echelle=1.0, rt=0.12)
        n1 = E("Son métier : trouver l'erreur", 38, JAUNE_TITRE, lettres="").move_to(P(1.0, 3.15))
        n2 = E("que personne n'a vue.", 38, JAUNE_TITRE, lettres="").move_to(P(1.0, 2.55))
        self.au("Son métier", FadeOut(h1), FadeOut(h2), rt=0.12)
        self.dire_eq(n1, "Son métier : trouver l'erreur", echelle=1.0, rt=0.12)
        self.dire_eq(n2, "que personne n'a vue.", echelle=1.0, rt=0.12)
        f = Feuille(7.4, 4.75).move_to(P(1.15, -0.45))
        st = Stylo(1.1).sur(P(4.35, 1.0))
        b = E("Sur son bureau,", 30, CIEL, lettres="").move_to(P(-5.0, -0.6))
        self.dire_eq(b, "Sur son bureau,", echelle=1.0, rt=0.12, avec=[FadeIn(f, shift=UP * 0.2), FadeIn(st)])
        h = encre("le calcul de Léo", 32, lettres="").move_to(P(1.15, 1.45))
        self.dire_eq(h, "le calcul de Léo", echelle=1.0, rt=0.12)
        e = encre("2x + 3 = 11", 56).mis_sur_egal(1.5, 0.55)
        self.dire_eq(e, "2 x plus 3 égale 11")
        s = encre("x = 4", 56).mis_sur_egal(1.5, -0.4)
        self.dire_eq(s, "x égale 4")
        c = encre("car 2 + 3 + 4 = 9", 50, lettres="").move_to(P(1.15, -1.55))
        self.dire_eq(c, "car 2 plus 3 plus 4 égale 9")
        self.attendre_voix(marge=0.4)

    # ── 02 : bonne réponse, faux raisonnement ───────────────────────────────
    def ecran_leo(self):
        self.ecran("02-leo")
        f = Feuille(5.4, 4.3).move_to(P(-3.7, -0.3))
        h = encre("le calcul de Léo", 28, lettres="").sans_audit().move_to(P(-3.5, 1.5))
        e = encre("2x + 3 = 11", 46).sans_audit().mis_sur_egal(-3.2, 0.75)
        s = encre("x = 4", 46).sans_audit().mis_sur_egal(-3.2, -0.05)
        c = encre("car 2 + 3 + 4 = 9", 32, lettres="").sans_audit().move_to(P(-3.6, -1.15))
        st = Stylo(0.9).sur(P(-1.75, -2.1))
        t = E("La réponse est bonne :", 44, VERT_OK, lettres="").move_to(P(0.0, 3.1))
        self.dire_eq(t, "La réponse est bonne :", echelle=1.0, rt=0.12, avec=[FadeIn(f), FadeIn(h), FadeIn(e), FadeIn(s), FadeIn(c), FadeIn(st)])
        ok = self.coche(VERT_OK, 0.26).next_to(s, RIGHT, buff=0.3)
        v = E("2 × 4 + 3 = 11", 52, VERT_OK).move_to(P(2.85, 1.95))
        self.dire_eq(v, "2 fois 4 plus 3, 11", avec=[Create(ok)])
        r = E("Mais le raisonnement est faux.", 36, PIEGE, lettres="").scale_to_fit_width(6.9).move_to(P(2.85, 1.05))
        self.dire_eq(r, "Mais le raisonnement est faux.", echelle=1.0, rt=0.12)
        self.entourer(st, c, rt=0.5, mx=0.16, my=0.14)
        self.play(st.animate.sur(P(-1.75, -2.1)), run_time=0.12)
        a1 = E("Léo a additionné les nombres", 30, lettres="").scale_to_fit_width(6.9).move_to(P(2.85, 0.2))
        a2 = E("qu'il voyait,", 32, lettres="").move_to(P(2.85, -0.35))
        self.dire_eq(a1, "Léo a additionné les nombres", echelle=1.0, rt=0.12)
        vus = [e.atomes[0], e.atomes[3], s.atomes[2]]
        self.dire_eq(a2, "qu'il voyait,", echelle=1.0, rt=0.12, avec=[m.animate.set_color(OPERATION).scale(1.25) for m in vus])
        self.play(*[m.animate.scale(1 / 1.25) for m in vus], run_time=0.15)
        g = E("et il trouve 9, pas 11.", 40, lettres="").scale_to_fit_width(6.9).move_to(P(2.85, -1.15))
        g.atomes[3].set_color(PIEGE)
        g.atomes[6].set_color(VERT_OK)
        self.dire_eq(g, "et il trouve 9, pas 11.", echelle=1.1, rt=0.12)
        self.insister(g.atomes[3], 1.4, 0.15)
        z = E("Il est tombé juste", 38, JAUNE_TITRE, lettres="").move_to(P(2.6, -2.2))
        z2 = E("par hasard.", 38, JAUNE_TITRE, lettres="").move_to(P(2.0, -2.85))
        self.dire_eq(z, "Il est tombé juste", echelle=1.0, rt=0.12)
        de = De(1, 0.72).move_to(P(4.2, -2.85))
        self.dire_eq(z2, "par hasard.", echelle=1.0, rt=0.13, avec=[FadeIn(de, scale=0.5)])
        self.rouler(de, (6, 2, 5, 4))
        self.attendre_voix(marge=0.5)

    # ── 03 : le vrai chemin ─────────────────────────────────────────────────
    def ecran_chemin(self):
        self.ecran("03-vrai-chemin")
        f = Feuille(3.4, 2.9).move_to(P(-4.7, 1.2))
        h = encre("le calcul de Léo", 24, lettres="").sans_audit().move_to(P(-4.5, 2.25))
        c = encre("2 + 3 + 4 = 9", 26, lettres="").sans_audit().move_to(P(-4.5, 1.2))
        ba = self.barrer(c, STYLO)
        t = E("Le vrai chemin.", 46, VERT_OK, lettres="").move_to(P(1.6, 3.15))
        self.dire_eq(t, "Le vrai chemin.", echelle=1.0, rt=0.12, avec=[FadeIn(f), FadeIn(h), FadeIn(c), Create(ba)])
        XE = 0.9
        e0 = E("2x + 3 = 11", 58).mis_sur_egal(XE, 2.2)
        self.dire_eq(e0, "2 x plus 3 égale 11")
        o1 = E("On soustrait 3 :", 28, OPERATION, lettres="").move_to(P(0, 1.58)).align_to(P(3.3, 0), LEFT)
        self.dire_eq(o1, "On soustrait 3 :", echelle=1.0, rt=0.12, avec=[Create(self.fleche_etape(2.0, 1.15, 2.85))])
        e1 = E("2x = 8", 58).mis_sur_egal(XE, 0.95)
        self.glisser(e0, e1, "2 x égale 8", {0: 0, 1: 1, 2: 4})
        o2 = E("On divise par 2 :", 28, OPERATION, lettres="").move_to(P(0, 0.33)).align_to(P(3.3, 0), LEFT)
        self.dire_eq(o2, "On divise par 2 :", echelle=1.0, rt=0.12, avec=[Create(self.fleche_etape(0.75, -0.1, 2.85))])
        e2 = E("x = 4", 58, VERT_OK, inconnue=VERT_OK).mis_sur_egal(XE, -0.3)
        self.glisser(e1, e2, "x égale 4", {0: 1, 1: 2})
        cadre = SurroundingRectangle(e2, color=VERT_OK, buff=0.17, stroke_width=4, corner_radius=0.08)
        self.play(Create(cadre), run_time=0.2)
        l1 = E("Trouver le bon nombre ne suffit pas :", 40, lettres="").move_to(P(-0.6, -1.65))
        self.dire_eq(l1, "Trouver le bon nombre ne suffit pas :", echelle=1.0, rt=0.12)
        l2 = E("le chemin compte aussi.", 50, JAUNE_TITRE, lettres="").move_to(P(-0.6, -2.55))
        self.dire_eq(l2, "le chemin compte aussi.", echelle=1.0, rt=0.13)
        self.insister(l2.atomes[1], 1.25, 0.16)
        self.attendre_voix(marge=0.4)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -1.2
        f = Feuille(4.7, 3.4).move_to(P(-3.95, 0.7))
        rappel = encre("2x + 1 = 7", 46).sans_audit().mis_sur_egal(-2.85, 1.55)

        def avant(sc):
            sc.eq_dans_q(0, "Quel calcul prouve que 3", "Quel calcul prouve que 3", lettres="", fs=36)
            sc.eq_dans_q(0, "est solution de 2x + 1 = 7 ?", "est solution de 2 x plus 1 égale 7 ?", fs=36)
            sc.play(FadeIn(f), FadeIn(rappel), run_time=0.25)

        def apres(sc):
            sc.ph_eq(0, "Réponse B. On remplace x par 3", "Réponse B. On remplace x par 3", lettres="x", premier=True)
            sc.ph_eq(1, "dans l'équation de départ,", "dans l'équation de départ,")
            v = T("3", 46, ENCRE_X, audit=False, gras=True).move_to(rappel.x[0].get_center() + P(0, 0.66))
            sc.play(FadeIn(v, scale=1.3), run_time=0.1)
            sc.play(v.animate.move_to(rappel.x[0]).set_opacity(0.0), rappel.x[0].animate.set_color(OPERATION), run_time=0.14)
            l = encre("2 × 3 + 1 = 7", 36, lettres="").sans_audit().mis_sur_egal(-2.95, 0.2)
            l.atomes[2].set_color(ENCRE_X)
            sc.play(FadeIn(VGroup(*l.atomes[:5])), run_time=0.1)
            sc.ph_eq(2, "et on trouve bien 7.", "et on trouve bien 7.")
            sc.play(FadeIn(VGroup(*l.atomes[5:]), scale=1.3), Create(SurroundingRectangle(l, color=ENCRE_OK, buff=0.15, stroke_width=4, corner_radius=0.06)), run_time=0.2)
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Quel calcul prouve que 3", "est solution de 2x + 1 = 7 ?"],
                            [Eq("2 + 3 + 1 = 6", 34, lettres=""), Eq("2 × 3 + 1 = 7", 34, lettres=""), Eq("7 − 1 = 6", 34, lettres="")], 1,
                            ["Réponse B. On remplace x par 3", "dans l'équation de départ,", "et on trouve bien 7."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : autre copie : Lina vérifie, et entoure l'erreur ────────────────
    def ecran_erreur(self):
        self.ecran("04-erreur")
        f = Feuille(6.3, 2.95).move_to(P(-3.3, 1.2))
        st = Stylo(0.9).sur(P(-0.4, -0.15))
        t = E("Autre copie.", 40, JAUNE_TITRE, lettres="").move_to(P(-3.3, 3.15))
        self.dire_eq(t, "Autre copie.", echelle=1.0, rt=0.12, avec=[FadeIn(f), FadeIn(st)])
        XE = -4.1
        e = encre("a + 2 = 11", 40).mis_sur_egal(XE, 1.85)
        self.dire_eq(e, "a plus 2 égale 11")
        e2 = encre("donc a = 11 + 2 = 13", 34).mis_sur_egal(XE, 0.75)
        self.dire_eq(e2, "donc a égale 11 plus 2, 13")
        lina = personne(peau="#c68642", tenue="#0f766e", cheveux="#3f2a14", longs=True, s=0.62).move_to(P(0.75, 2.3))
        v = E("Lina vérifie :", 36, CIEL, lettres="").move_to(P(3.9, 2.85))
        self.dire_eq(v, "Lina vérifie :", echelle=1.0, rt=0.12, avec=[FadeIn(lina, shift=UP * 0.2)])
        c = E("13 + 2 = 15", 46).move_to(P(3.45, 2.0))
        self.dire_eq(c, "13 plus 2, 15")
        n = E("Ce n'est pas 11.", 40, PIEGE, lettres="").move_to(P(3.9, 1.15))
        x = coche_x(c.atomes[-1], k=0.3).shift(RIGHT * 0.95)
        self.dire_eq(n, "Ce n'est pas 11.", echelle=1.0, rt=0.12, avec=[Create(x)])
        self.insister(n.atomes[-2], 1.3, 0.14)
        l1 = E("L'erreur : on a ajouté 2", 42, PIEGE, lettres="").move_to(P(-0.6, -0.95))
        self.dire_eq(l1, "L'erreur : on a ajouté 2", echelle=1.0, rt=0.12)
        self.entourer(st, VGroup(e2.atomes[4], e2.atomes[5]), rt=0.2, mx=0.08, my=0.1)
        l2 = E("au lieu de soustraire 2.", 42, VERT_OK, lettres="").move_to(P(-0.6, -1.75))
        self.dire_eq(l2, "au lieu de soustraire 2.", echelle=1.0, rt=0.12)
        self.play(st.animate.sur(P(-0.4, -0.15)), run_time=0.12)
        l3 = E("La solution est 9.", 52, VERT_OK, lettres="").move_to(P(-0.6, -2.7))
        self.dire_eq(l3, "La solution est 9.", echelle=1.0, rt=0.13)
        self.insister(l3.atomes[-2], 1.35, 0.16)
        self.attendre_voix(marge=0.4)

    # ── 04q : QUESTION 2 (cartes larges : les choix sont des phrases) ───────
    def _disposer_q(self, question, choix, phrase):
        larges = getattr(self, "_cartes_larges", None)
        if not larges:
            return super()._disposer_q(question, choix, phrase)
        tete, q, _, pause, rebours, ph = super()._disposer_q(question, [c.copy() for c in choix], phrase)
        if q.width > 9.0:
            q.scale_to_fit_width(9.0).align_to(P(self.XL, 0), LEFT)
        cartes = VGroup(*[self._carte_choix(l, c, larges, 34) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.14)
        cartes.next_to(q, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        pause.next_to(cartes, DOWN, buff=0.16).align_to(P(self.XL, 0), LEFT)
        ph.next_to(cartes, DOWN, buff=0.14).align_to(P(self.XL, 0), LEFT)
        self.cartes_q = cartes
        return tete, q, cartes, pause, rebours, ph

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL, self._cartes_larges = -6.2, 7.6
        f = Feuille(3.3, 1.9).move_to(P(4.85, 1.55))
        r1 = encre("3x = 12", 40).sans_audit().mis_sur_egal(4.5, 2.0)
        r2 = encre("x = 9", 40).sans_audit().mis_sur_egal(4.5, 1.1)
        st = Stylo(0.7).sur(P(5.7, 0.85))

        def avant(sc):
            sc.eq_dans_q(0, "Une copie dit : 3x = 12, donc x = 9.", "Une copie dit : 3 x égale 12, donc x égale 9.", fs=36)
            sc.play(FadeIn(f), FadeIn(r1), FadeIn(r2), FadeIn(st), run_time=0.2)
            sc.eq_dans_q(0, "Quelle est l'erreur ?", "Quelle est l'erreur ?", lettres="", fs=36)

        def apres(sc):
            rangs = VGroup(*[VGroup(*[Dot(radius=0.13, color=ORANGE_RETENUE) for _ in range(4)]).arrange(RIGHT, buff=0.16) for _ in range(3)])
            rangs.arrange(DOWN, buff=0.14).move_to(P(4.6, -0.12))
            xs = VGroup(*[T("x", 32, INCONNUE, audit=False).next_to(r, LEFT, buff=0.22) for r in rangs])
            sc.ph_eq(0, "Réponse B. Le 3 multiplie x :", "Réponse B. Le 3 multiplie x :", lettres="x", premier=True)
            sc.play(LaggedStart(*[FadeIn(r, shift=RIGHT * 0.2) for r in rangs], lag_ratio=0.3), FadeIn(xs), run_time=0.3)
            sc.ph_eq(1, "on divise par 3, et x = 4.", "on divise par 3, et x égale 4.", lettres="x")
            vert = E("12 ÷ 3 = 4", 42, VERT_OK).sans_audit().move_to(P(4.6, -1.15))
            sc.play(*[r.animate.set_color(VERT_OK) for r in rangs], FadeIn(vert, scale=1.2), run_time=0.2)
            sc.ph_eq(2, "La copie a soustrait 3.", "La copie a soustrait 3.")
            faux = E("12 − 3 = 9", 42, PIEGE).sans_audit().move_to(P(4.1, -1.85))
            sc.play(FadeIn(faux), run_time=0.15)
            sc.play(Create(sc.barrer(faux)), sc.entourer_court(st, r2), run_time=0.25)
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Une copie dit : 3x = 12, donc x = 9.", "Quelle est l'erreur ?"],
                            [E("il fallait ajouter 3", 34, lettres=""), E("il fallait diviser par 3", 34, lettres=""), E("il n'y a pas d'erreur", 34, lettres="")], 1,
                            ["Réponse B. Le 3 multiplie x :", "on divise par 3, et x = 4.", "La copie a soustrait 3."], avant_q=avant, autres_r=apres)
        self.XL, self._cartes_larges = type(self).XL, None

    def entourer_court(self, st, m):
        """L'ellipse rouge sans suivre le stylo, jouée avec une autre animation."""
        el = Ellipse(width=m.width + 0.4, height=m.height + 0.26, color=STYLO, stroke_width=4).move_to(m)
        return Create(el)

    # ── 05 : x des deux côtés ───────────────────────────────────────────────
    def ecran_deux_cotes(self):
        self.ecran("05-deux-cotes")
        t = E("Le dernier niveau : x des deux côtés.", 42, JAUNE_TITRE, lettres="x").move_to(P(-0.1, 3.15))
        self.dire_eq(t, "Le dernier niveau : x des deux côtés.", echelle=1.0, rt=0.12)
        XE, Y = -2.0, (2.3, 1.05, -0.2, -1.6)
        XG, XD = XE - 1.25, XE + 1.25
        e0 = E("4x − 3 = 2x + 7", 52).mis_sur_egal(XE, Y[0])
        self.dire_eq(e0, "4 x moins 3 égale 2 x plus 7")
        self.play(e0.egal.animate.set_color(EGAL), run_time=0.08)
        # On retire 2x : le terme en x de droite passe de l'autre côté
        ph1 = E("On retire 2x", 32, OPERATION, lettres="", ).move_to(P(0, 1.9)).align_to(P(1.85, 0), LEFT)
        ph2 = E("des deux côtés :", 32, OPERATION, lettres="").move_to(P(0, 1.42)).align_to(P(1.85, 0), LEFT)
        self.dire_eq(ph1, "On retire 2 x", echelle=1.0, rt=0.12, avec=[Create(self.fleche_etape(Y[0] - 0.2, Y[1] + 0.2, 1.4))])
        vx = VGroup(e0.atomes[5], e0.atomes[6])
        tg, td = self.tag("− 2x", XG, 1.68), self.tag("− 2x", XD, 1.68)
        vol = vx.copy().set_color(OPERATION)
        self.play(FadeIn(td), vx.animate.set_color(OPERATION), run_time=0.1)
        self.dire_eq(ph2, "des deux côtés :", echelle=1.0, rt=0.12, avec=[vol.animate(path_arc=PI * 0.6).move_to(tg.get_center())])
        self.play(ReplacementTransform(vol, tg), run_time=0.1)
        e1 = E("2x − 3 = 7", 52).mis_sur_egal(XE, Y[1])
        self.glisser(e0, e1, "2 x moins 3 égale 7", {2: 2, 3: 3, 4: 4, 5: 8})
        ph = E("On ajoute 3 :", 32, OPERATION, lettres="").move_to(P(0, 0.42)).align_to(P(1.85, 0), LEFT)
        self.dire_eq(ph, "On ajoute 3 :", echelle=1.0, rt=0.12, avec=[Create(self.fleche_etape(Y[1] - 0.2, Y[2] + 0.2, 1.4)), FadeIn(self.tag("+ 3", XG, 0.42)), FadeIn(self.tag("+ 3", XD, 0.42))])
        e2 = E("2x = 10", 52).mis_sur_egal(XE, Y[2])
        self.glisser(e1, e2, "2 x égale 10", {0: 0, 1: 1, 2: 4})
        ph = E("On divise par 2 :", 32, OPERATION, lettres="").move_to(P(0, -0.82)).align_to(P(1.85, 0), LEFT)
        self.dire_eq(ph, "On divise par 2 :", echelle=1.0, rt=0.12, avec=[Create(self.fleche_etape(Y[2] - 0.2, Y[3] + 0.2, 1.4)), FadeIn(self.tag("÷ 2", XG, -0.82)), FadeIn(self.tag("÷ 2", XD, -0.82))])
        e3 = E("x = 5", 52, VERT_OK, inconnue=VERT_OK).mis_sur_egal(XE, Y[3])
        self.glisser(e2, e3, "x égale 5", {0: 1, 1: 2})
        self.play(Create(SurroundingRectangle(e3, color=VERT_OK, buff=0.16, stroke_width=4, corner_radius=0.08)), run_time=0.15)
        v = E("On vérifie :", 36, CIEL, lettres="").move_to(P(-5.1, -2.7))
        self.dire_eq(v, "On vérifie :", echelle=1.0, rt=0.12)
        g = E("17 à gauche,", 40, VERT_OK, lettres="").move_to(P(-1.45, -2.7))
        d = E("17 à droite.", 40, VERT_OK, lettres="").move_to(P(2.95, -2.7))
        self.dire_eq(g, "17 à gauche,", echelle=1.0, rt=0.12)
        self.dire_eq(d, "17 à droite.", echelle=1.0, rt=0.12)
        self.play(FadeIn(T("=", 56, VERT_OK, audit=False, gras=True).move_to(P(0.8, -2.7)), scale=1.4), run_time=0.15)
        self.attendre_voix(marge=0.4)

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.05))
        self.au("À toi", Write(tit), rt=0.5)
        r = E("Résous", 44, lettres="").move_to(P(-4.9, 1.75))
        self.dire_eq(r, "Résous", echelle=1.0, rt=0.12)
        e = E("3(x − 1) = 2x + 4", 72).move_to(P(1.1, 1.75))
        self.dire_eq(e, "3 fois, entre parenthèses, x moins 1, égale 2 x plus 4")
        self.play(e.egal.animate.set_color(EGAL), run_time=0.08)
        f = Feuille(3.0, 3.0).move_to(P(-4.8, -1.0))
        st = Stylo(1.0).sur(P(-4.7, -1.5))
        pv = E("Puis vérifie.", 44, VERT_OK, lettres="").move_to(P(1.6, 0.45))
        self.dire_eq(pv, "Puis vérifie.", echelle=1.0, rt=0.12, avec=[FadeIn(f), FadeIn(st, shift=UP * 0.2)])
        pz = T("Mets pause, et cherche !", 44, ORANGE_RETENUE).move_to(P(1.6, -0.85))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, r=r, e=e, f=f, st=st, pv=pv, pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d0 = self.defi
        self.dire("06b-correction")
        tit = T("Correction", 36, JAUNE_TITRE).move_to(P(-5.15, 3.1))
        XE, Y = -0.3, (3.1, 2.05, 1.0, -0.05)
        e0 = d0["e"]
        cible = e0.copy().scale(46 / 72)
        cible.shift(P(XE, Y[0]) - cible.egal.get_center())
        self.au("Correction", ReplacementTransform(d0["tit"], tit), FadeOut(d0["r"]), FadeOut(d0["pv"]), FadeOut(d0["pz"]), FadeOut(d0["f"]), FadeOut(d0["st"]),
                Transform(e0, cible), rt=0.35)
        ph = E("On développe :", 28, OPERATION, lettres="").move_to(P(0, 2.58)).align_to(P(3.25, 0), LEFT)
        self.dire_eq(ph, "On développe :", echelle=1.0, rt=0.12, avec=[Create(self.fleche_etape(Y[0] - 0.18, Y[1] + 0.18, 2.85))])
        e1 = E("3x − 3 = 2x + 4", 46).mis_sur_egal(XE, Y[1])
        self.dire_eq(e1, "3 x moins 3 égale 2 x plus 4")
        ph = E("On retire 2x :", 28, OPERATION, lettres="").move_to(P(0, 1.53)).align_to(P(3.25, 0), LEFT)
        self.dire_eq(ph, "On retire 2 x :", echelle=1.0, rt=0.12, avec=[Create(self.fleche_etape(Y[1] - 0.18, Y[2] + 0.18, 2.85))])
        e2 = E("x − 3 = 4", 46).mis_sur_egal(XE, Y[2])
        self.glisser(e1, e2, "x moins 3 égale 4", {0: 1, 1: 2, 2: 3, 3: 4, 4: 8})
        ph = E("On ajoute 3 :", 28, OPERATION, lettres="").move_to(P(0, 0.48)).align_to(P(3.25, 0), LEFT)
        self.dire_eq(ph, "On ajoute 3 :", echelle=1.0, rt=0.12, avec=[Create(self.fleche_etape(Y[2] - 0.18, Y[3] + 0.18, 2.85))])
        e3 = E("x = 7", 46, VERT_OK, inconnue=VERT_OK).mis_sur_egal(XE, Y[3])
        self.glisser(e2, e3, "x égale 7", {0: 0, 1: 3})
        self.play(Create(SurroundingRectangle(e3, color=VERT_OK, buff=0.17, stroke_width=4, corner_radius=0.08)), run_time=0.14)
        vf = E("Vérification :", 30, CIEL, lettres="").move_to(P(-5.15, -1.9))
        self.dire_eq(vf, "Vérification :", echelle=1.0, rt=0.12)
        cg = RoundedRectangle(width=2.9, height=1.75, corner_radius=0.12, fill_color="#0b1220", fill_opacity=1, stroke_color="#64748b", stroke_width=3).move_to(P(-2.0, -1.95))
        cd = cg.copy().move_to(P(2.0, -1.95))
        tg = T("à gauche", 26, CIEL).next_to(cg, UP, buff=0.05)
        td = T("À droite", 26, CIEL).next_to(cd, UP, buff=0.12)
        self.au("à gauche", FadeIn(cg), FadeIn(tg), rt=0.15)
        a = E("3 × 6", 44).move_to(P(-2.0, -1.55))
        self.dire_eq(a, "3 fois 6")
        b = E("18", 54).move_to(P(-2.0, -2.35))
        self.dire_eq(b, "6, 18")
        self.au("À droite", FadeIn(cd), FadeIn(td), rt=0.15)
        a2 = E("14 + 4", 44).move_to(P(2.0, -1.55))
        self.dire_eq(a2, "14 plus 4")
        b2 = E("18", 54).move_to(P(2.0, -2.35))
        self.dire_eq(b2, "4, 18")
        eg = T("=", 50, VERT_OK, audit=False, gras=True).move_to(P(0, -2.35))
        v = E("C'est juste.", 34, VERT_OK, lettres="").move_to(P(5.2, -1.55))
        self.dire_eq(v, "C'est juste.", echelle=1.0, rt=0.12, avec=[FadeIn(eg, scale=1.5), cg.animate.set_stroke(VERT_OK, 5), cd.animate.set_stroke(VERT_OK, 5)])
        self.insister(eg, 1.3, 0.14)
        self.attendre_voix(marge=0.6)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        self.XL = -2.5
        f = Feuille(3.3, 3.8)
        ok = self.coche(VERT_OK, 0.5).move_to(f.get_center())
        st = Stylo(1.1).sur(f.get_center() + P(0.8, -1.0))
        fig = VGroup(f, ok, st)
        lignes = self.finale_colonne([["Une bonne réponse ne prouve pas", "un bon raisonnement."],
                                      ["Pour trouver une erreur,", "on vérifie en remplaçant."],
                                      ["Quand x est des deux côtés,", "on le regroupe d'un seul côté."]], fs=36, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_correctrice()
        self.ecran_leo()
        self.ecran_chemin()
        self.ecran_question1()
        self.ecran_erreur()
        self.ecran_question2()
        self.ecran_deux_cotes()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
