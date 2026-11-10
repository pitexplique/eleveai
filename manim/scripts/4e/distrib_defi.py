# distrib_defi.py
# EleveAI — Maths 4e — série DISTRIBUTIVITÉ, épisode 05 : LES DÉFIS.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : litteral_distributivite_defi.
# Métier : Chloé, vendeuse en boulangerie. Centres : cuisine, commerce.
# Écrans (micro litteral_distributivite_defi partout) : garde (00) ; Chloé et les 4 tartes (01) ;
# l'astuce 2,99 = 3 − 0,01 (02) ; QUESTION 1 (02q, réponse A) ; deuxième défi, la copie de Tom (03) ;
# la copie de Léa (04) ; QUESTION 2 (04q, réponse B) ; troisième défi, les cartons (05) ;
# modéliser, développer, réduire (06) ; défi 7 × 1,99 (07) et correction (07b) ;
# ce que tu as appris (08) ; fin du 05/11 (09).
# Code couleur : x bleu ; le nombre qui se distribue et ses flèches orange ; juste vert ; piège rouge.
# Voix : manim/voix/4e-distrib-defi.json ; marques : distrib_defi_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/distrib_defi.py DistribDefi4e --media_dir manim/scripts/4e/media-dist-05-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/distrib_defi.py DistribDefi4e -o eleveai-maths-4e-distrib-defi --media_dir manim/scripts/4e/media-dist-05
# Sortie : manim/sorties/4e/maths/distributivite/05-defi/eleveai-maths-4e-distrib-defi.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import Feuille, encre, ENCRE_OK  # noqa: E402

PAROLE["²"] = "carré"

FACTEUR = OPERATION  # le nombre qui se distribue, et ses flèches
TROIS = CIEL  # le nombre rond
CENTIME = "#c4b5fd"  # le petit 0,01 qu'on retire
CARTON = "#b45309"


def D(s, fs=56, couleur=WHITE, lettres="x", audit=True):
    """Une expression : la lettre en bleu."""
    return E(s, fs, couleur, lettres=lettres, audit=audit)


def tarte(r=0.34):
    """Une tarte vue de dessus : la pâte dorée, les fruits, trois éclats."""
    pate = Circle(radius=r, fill_color="#e0a458", fill_opacity=1, stroke_color="#92400e", stroke_width=2)
    fruit = Circle(radius=r * 0.74, fill_color="#f59e0b", fill_opacity=1, stroke_width=0)
    eclats = VGroup(*[Dot(P(r * 0.35 * np.cos(a), r * 0.35 * np.sin(a)), radius=r * 0.12, color="#b91c1c")
                      for a in (0.4, 2.5, 4.4)])
    return VGroup(pate, fruit, eclats)


def croissant(s=1.0):
    c = Difference(Circle(radius=0.4), Circle(radius=0.36).shift(UP * 0.2), fill_color="#d97706", fill_opacity=1,
                   stroke_color="#78350f", stroke_width=2)
    plis = VGroup(*[Line(P(x, -0.38 + 0.12 * abs(x)), P(x * 0.85, -0.14 + 0.1 * abs(x)), color="#78350f", stroke_width=2)
                    for x in (-0.18, 0.0, 0.18)])
    return VGroup(c, plis).rotate(PI).scale(s)


def carton(s=1.0):
    """Un carton de boîtes de biscuits : la caisse et ses deux rabats."""
    caisse = Rectangle(width=1.05, height=0.8, fill_color=CARTON, fill_opacity=1, stroke_color="#78350f", stroke_width=2)
    r1 = Polygon(P(-0.525, 0.4), P(0, 0.4), P(-0.15, 0.62), P(-0.62, 0.55), fill_color="#d97706", fill_opacity=1,
                 stroke_color="#78350f", stroke_width=2)
    r2 = r1.copy().flip(UP, about_point=P(0, 0))
    scotch = Rectangle(width=0.14, height=0.8, fill_color="#fde68a", fill_opacity=0.8, stroke_width=0)
    g = VGroup(caisse, r1, r2, scotch).scale(s)
    g.caisse = caisse
    return g


def chloe(s=0.78):
    """Chloé : tablier blanc et bandeau de boulangère."""
    m = Metier(["Chloé"], fs=34, peau="#8d5524", tenue="#be185d", cheveux="#1f2937", longs=True, s=s)
    p = m.perso
    tablier = RoundedRectangle(width=0.55 * s, height=0.75 * s, corner_radius=0.05, fill_color="#f8fafc", fill_opacity=0.95, stroke_width=0)
    tablier.move_to(p.get_center() + DOWN * 0.3 * s)
    bandeau = Rectangle(width=0.86 * s, height=0.12 * s, fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
    bandeau.move_to(p.tete.get_top() + DOWN * 0.12 * s)
    p.add(tablier, bandeau)
    return m


def etiquette(s, fs=38):
    """L'étiquette de prix : carton blanc, prix en encre sombre (posé au mot)."""
    e = D(s, fs, couleur="#0f172a", lettres="")
    fond = RoundedRectangle(width=e.width + 0.5, height=e.height + 0.36, corner_radius=0.08, fill_color="#fef9c3",
                            fill_opacity=1, stroke_color="#a16207", stroke_width=3).move_to(e)
    return fond, e


def horloge(rayon=0.36):
    cadran = Circle(radius=rayon, color=JAUNE_TITRE, stroke_width=4)
    bouton = Rectangle(width=0.14, height=0.1, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    bouton.next_to(cadran, UP, buff=0.02)
    aiguille = Line(ORIGIN, UP * rayon * 0.78, color=WHITE, stroke_width=5)
    return VGroup(cadran, bouton), aiguille


class DistribDefi4e(PaysageRel):
    nom_voix = "4e-distrib-defi"
    fichier_marques = "distrib_defi_marques.json"
    ceinture = "verte"

    def fleche_arc(self, a, b, couleur=None, angle=-1.2, sw=5):
        return CurvedArrow(a.get_top() + UP * 0.1, b.get_top() + UP * 0.12, angle=angle, color=couleur or FACTEUR,
                           stroke_width=sw, tip_length=0.16)

    def ellipse(self, m, couleur=None, mx=0.2, my=0.14):
        return Ellipse(width=m.width + 2 * mx, height=m.height + 2 * my, color=couleur or PIEGE, stroke_width=5).move_to(m)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis de distributivité", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Défis", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        ys = (0.95, 0.15, -0.65)
        icones = [tarte(0.3), Feuille(0.62, 0.62, pas=0.2), carton(0.62)]
        x_txt = -1.6
        for ic, y in zip(icones, ys):
            ic.move_to(P(x_txt - 0.75, y))
        cercle = self.ellipse(icones[1], mx=0.02, my=0.02).scale(0.55).set_stroke(width=4)
        textes = [("Calculer de tête,", "Calculer de tête,"), ("trouver l'erreur,", "trouver l'erreur,"),
                  ("écrire un problème.", "écrire un problème.")]
        for k, ((s, ph), y) in enumerate(zip(textes, ys)):
            l = self.lg(s, 0, y, 42, maxw=7)
            l.align_to(P(x_txt, 0), LEFT)
            anims = [FadeIn(icones[k], scale=0.6)]
            if k == 1:
                anims.append(Create(cercle))
            self.dit(l, ph, avec=anims)
        self.attendre_voix(marge=0.8)

    # ── 01 : Chloé et les 4 tartes ──────────────────────────────────────────
    def ecran_vendeuse(self):
        self.ecran("01-vendeuse")
        m = chloe(1.0)
        m.perso.move_to(P(-5.15, 0.05))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.15)
        comptoir = VGroup(
            Rectangle(width=6.0, height=1.7, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(P(-3.4, -1.75)),
            Rectangle(width=6.2, height=0.16, fill_color="#d6a35c", fill_opacity=1, stroke_width=0).move_to(P(-3.4, -0.9)))
        l1 = self.lg("Chloé est vendeuse", 3.3, 2.6, 42, CIEL, maxw=5.8)
        self.dit(l1, "Chloé est vendeuse", avec=[FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom, shift=UP * 0.1), FadeIn(comptoir)])
        l2 = self.lg("dans une boulangerie.", 3.3, 1.95, 42, CIEL, maxw=5.8)
        self.dit(l2, "dans une boulangerie.")
        tartes = VGroup(*[tarte(0.4) for _ in range(4)]).arrange(RIGHT, buff=0.16).move_to(P(-2.45, -0.43))
        l3 = self.lg("Un client achète 4 tartes", 3.3, 0.95, 38, maxw=5.8)
        self.poser_avec(l3, "Un client achète 4 tartes",
                        {3: lambda: [LaggedStart(*[FadeIn(t, shift=DOWN * 0.25) for t in tartes], lag_ratio=0.2)]})
        fond, prix = etiquette("2,99 euros", 46)
        VGroup(fond, prix).move_to(P(-2.45, 0.85))
        self.dire_eq(prix, "2,99 euros.", avec=[FadeIn(fond, scale=0.7)])
        self.insister(VGroup(fond, prix), 1.12, 0.18)
        l4 = self.lg("Elle calcule de tête,", 3.3, -0.05, 40, JAUNE_TITRE, maxw=5.8)
        self.dit(l4, "Elle calcule de tête,")
        l5 = self.lg("en 2 secondes.", 2.8, -0.75, 40, JAUNE_TITRE, maxw=4.5)
        cadran, aig = horloge()
        VGroup(cadran, aig).move_to(P(5.75, -0.75))
        aig.shift(cadran[0].get_center() - aig.get_start())
        self.dit(l5, "en 2 secondes.")
        self.play(FadeIn(cadran, scale=0.6), FadeIn(aig), run_time=0.2)
        self.play(Rotate(aig, -TAU, about_point=cadran[0].get_center()), run_time=0.9, rate_func=linear)
        self.attendre_voix(marge=0.6)

    # ── 02 : l'astuce ───────────────────────────────────────────────────────
    def ecran_astuce(self):
        self.ecran("02-astuce")
        tartes = VGroup(*[tarte(0.3) for _ in range(4)]).arrange_in_grid(2, 2, buff=0.2).move_to(P(-4.75, 1.85))
        fond, prix = etiquette("2,99 euros", 30)
        prix.sans_audit()
        VGroup(fond, prix).next_to(tartes, DOWN, buff=0.22)
        t = self.lg("Son astuce :", -4.75, 3.1, 44, CIEL, maxw=4)
        self.dit(t, "Son astuce :", avec=[FadeIn(tartes), FadeIn(fond), FadeIn(prix)])
        XE = 1.25
        a = D("2,99 = 3 − 0,01", 56).mis_sur_egal(XE, 2.75)
        a.atomes[2].set_color(TROIS)
        a.atomes[4].set_color(CENTIME)
        self.dire_eq(a, "2,99, c'est 3 moins 0,01.")
        b = D("4 × 3 = 12", 50).mis_sur_egal(XE, 1.7)
        b.atomes[0].set_color(FACTEUR)
        b.atomes[2].set_color(TROIS)
        self.dire_eq(b, "4 fois 3 : 12.", avec=[Circumscribe(tartes, color=WHITE)])
        c = D("4 × 0,01 = 0,04", 50).mis_sur_egal(XE, 0.85)
        c.atomes[0].set_color(FACTEUR)
        c.atomes[2].set_color(CENTIME)
        self.dire_eq(c, "4 fois 0,01 : 0,04.")
        d = D("12 − 0,04 = 11,96 euros", 50, VERT_OK, lettres="").mis_sur_egal(XE, 0.0)
        self.dire_eq(d, "12 moins 0,04 : 11,96 euros.")
        cd = self.cadre_ok(d, 0.12)
        self.play(Create(cd), run_time=0.2)
        self.insister(VGroup(*d.droite), 1.12, 0.18)
        g = D("4(3 − 0,01) = 4 × 3 − 4 × 0,01", 60)
        if g.width > 10.4:
            g.scale_to_fit_width(10.4)
        g.move_to(P(-0.4, -1.85))
        for k in (0, 7, 11):
            g.atomes[k].set_color(FACTEUR)
        for k in (2, 9):
            g.atomes[k].set_color(TROIS)
        for k in (4, 13):
            g.atomes[k].set_color(CENTIME)
        f1 = self.fleche_arc(g.atomes[0], g.atomes[2], angle=-1.6)
        f2 = self.fleche_arc(g.atomes[0], g.atomes[4], angle=-1.0)
        self.poser_avec(g, "4 fois, entre parenthèses, 3 moins 0,01, égale 4 fois 3, moins 4 fois 0,01.",
                        {9: lambda: [Create(f1)], 13: lambda: [Create(f2)]})
        self.play(g.egal.animate.set_color(EGAL), run_time=0.1)
        self.play(Create(SurroundingRectangle(VGroup(g, f1, f2), color=CIEL, buff=0.16, stroke_width=3, corner_radius=0.08)), run_time=0.25)
        self.attendre_voix(marge=0.6)

    # ── 02q : QUESTION 1 (réponse A) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        cr = VGroup(*[croissant(1.15) for _ in range(6)]).arrange_in_grid(2, 3, buff=(0.35, 0.45)).move_to(P(-3.6, 0.5))

        def avant(sc):
            sc.eq_dans_q(0, "Combien coûtent 6 croissants", "Combien coûtent 6 croissants", lettres="", fs=36)
            sc.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in cr], lag_ratio=0.12), run_time=0.35)
            sc.eq_dans_q(0, "à 0,99 euro ?", "à 0,99 euro ?", lettres="", fs=36)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : 5,94 euros.", "Réponse A : 5,94 euros.", premier=True)
            sc.ph_eq(1, "6 × 1 = 6", "6 fois 1 : 6.", avec=[Circumscribe(cr, color=WHITE)])
            sc.ph_eq(2, "− 6 × 0,01 = − 0,06", "Moins 6 fois 0,01 : moins 0,06.")
            sc.rep_fini()

        self.question_pause("02q-question", "02r-reponse", ["Combien coûtent 6 croissants", "à 0,99 euro ?"],
                            [Eq("5,94 euros", 34, lettres=""), Eq("6,06 euros", 34, lettres=""), Eq("5,99 euros", 34, lettres="")], 0,
                            ["Réponse A : 5,94 euros.", "6 × 1 = 6", "− 6 × 0,01 = − 0,06"],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 03 et 04 : trouver l'erreur sur une copie ───────────────────────────
    def copie(self, nom, peau, tenue, cheveux, longs):
        f = Feuille(7.2, 3.2).move_to(P(-2.3, 0.75))
        p = personne(peau=peau, tenue=tenue, cheveux=cheveux, longs=longs, s=0.8).move_to(P(4.4, 0.9))
        n = T(nom, 34, CIEL).next_to(p, UP, buff=0.14)
        return f, p, n

    def ecran_erreur(self):
        self.ecran("03-erreur")
        tit = self.lg("Deuxième défi : trouver l'erreur.", 0, 3.1, 44, JAUNE_TITRE, maxw=11)
        self.dit(tit, "Deuxième défi : trouver l'erreur.")
        f, p, n = self.copie("Tom", "#e0ac69", "#2563eb", "#78350f", False)
        h = encre("Tom a écrit :", 32, lettres="").move_to(P(0, 1.8)).align_to(P(-5.3, 0), LEFT)
        self.dit(h, "Tom a écrit :", avec=[FadeIn(f, shift=UP * 0.2), FadeIn(p, shift=UP * 0.2), FadeIn(n)])
        e = encre("5(x − 3) = 5x − 3", 48, lettres="x").move_to(P(-2.15, 0.5))
        self.dire_eq(e, "5 fois, entre parenthèses, x moins 3, égale 5 x moins 3.")
        f1 = self.fleche_arc(e.atomes[0], e.atomes[2], angle=-1.6)
        f2 = self.fleche_arc(e.atomes[0], e.atomes[4], angle=-1.05)
        el = self.ellipse(e.atomes[-1], mx=0.18, my=0.12)
        l1 = self.lg("Il a oublié de multiplier le 3 !", -0.6, -1.55, 40, PIEGE, maxw=10)
        self.poser_avec(l1, "Il a oublié de multiplier le 3 !",
                        {2: lambda: [Create(el)], 4: lambda: [Create(f1)], 6: lambda: [Create(f2), e.atomes[4].animate.set_color(FACTEUR)]})
        self.insister(e.atomes[4], 1.5, 0.16)
        bon = encre("5x − 15", 46, lettres="", couleur=ENCRE_OK).sans_audit().move_to(P(0, -0.45)).align_to(e.droite, LEFT)
        egal = encre("=", 46, lettres="", couleur=ENCRE_OK).sans_audit()
        egal.move_to(P(e.egal.get_x(), bon.get_y()))
        r = self.lg("Le bon résultat : 5x − 15.", -0.6, -2.45, 46, VERT_OK, maxw=10)
        self.poser_avec(r, "Le bon résultat : 5 x moins 15.", {7: lambda: [FadeIn(egal), FadeIn(bon, scale=1.2)]})
        self.play(Create(self.cadre_ok(r, 0.14)), run_time=0.2)
        self.attendre_voix(marge=0.6)

    def ecran_signe(self):
        self.ecran("04-signe")
        f, p, n = self.copie("Léa", "#c68642", "#0f766e", "#3f2a14", True)
        h = encre("Léa a écrit :", 32, lettres="").move_to(P(0, 1.8)).align_to(P(-5.3, 0), LEFT)
        self.dit(h, "Léa a écrit :", avec=[FadeIn(f, shift=UP * 0.2), FadeIn(p, shift=UP * 0.2), FadeIn(n)])
        e = encre("−2(x − 4) = −2x − 8", 46, lettres="x").move_to(P(-2.15, 0.5))
        self.dire_eq(e, "moins 2 fois, entre parenthèses, x moins 4, égale moins 2 x moins 8.")
        VGroup(e.atomes[0], e.atomes[1]).set_color(FACTEUR)
        f1 = self.fleche_arc(e.atomes[1], e.atomes[3], angle=-1.6)
        f2 = self.fleche_arc(e.atomes[1], VGroup(e.atomes[4], e.atomes[5]), angle=-1.05)
        el = self.ellipse(VGroup(e.atomes[-2], e.atomes[-1]), mx=0.16, my=0.14)
        l1 = self.lg("Le signe est faux :", -3.55, -1.5, 40, PIEGE, maxw=4.8)
        self.poser_avec(l1, "Le signe est faux :", {3: lambda: [Create(el)]})
        c = D("(−2) × (−4) = +8", 48, lettres="").move_to(P(2.1, -1.5))
        VGroup(c.atomes[1], c.atomes[2]).set_color(FACTEUR)
        VGroup(c.atomes[10], c.atomes[11]).set_color(VERT_OK)
        self.poser_avec(c, "moins 2 fois moins 4, c'est plus 8.", {2: lambda: [Create(f1)], 7: lambda: [Create(f2)]})
        self.insister(VGroup(c.atomes[10], c.atomes[11]), 1.4, 0.16)
        bon = encre("−2x + 8", 46, lettres="", couleur=ENCRE_OK).sans_audit().move_to(P(0, -0.45)).align_to(e.droite, LEFT)
        egal = encre("=", 46, lettres="", couleur=ENCRE_OK).sans_audit()
        egal.move_to(P(e.egal.get_x(), bon.get_y()))
        r = self.lg("Le bon résultat : −2x + 8.", -0.6, -2.5, 46, VERT_OK, maxw=10)
        self.poser_avec(r, "Le bon résultat : moins 2 x plus 8.", {8: lambda: [FadeIn(egal), FadeIn(bon, scale=1.2)]})
        self.play(Create(self.cadre_ok(r, 0.14)), run_time=0.2)
        self.attendre_voix(marge=0.6)

    # ── 04q : QUESTION 2 (réponse B) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        f = Feuille(5.6, 2.4).move_to(P(-3.5, 0.55))
        cop = encre("3(2x + 5) = 6x + 8", 36, lettres="x").sans_audit().move_to(P(-3.7, 0.85))

        def avant(sc):
            sc.eq_dans_q(0, "Où est l'erreur ?", "Où est l'erreur ?", lettres="", fs=36)
            sc.eq_dans_q(0, "3(2x + 5) = 6x + 8", "3 fois, entre parenthèses, 2 x plus 5, égale 6 x plus 8", fs=36)
            sc.play(FadeIn(f, shift=UP * 0.2), FadeIn(cop), run_time=0.25)

        def apres(sc):
            sc.ph_eq(0, "Réponse B.", "Réponse B.", premier=True)
            el = sc.ellipse(cop.atomes[-1], mx=0.16, my=0.12)
            fl = sc.fleche_arc(cop.atomes[0], cop.atomes[5], angle=-1.1)
            sc.ph_eq(1, "3 × 5 = 15, pas 8.", "3 fois 5, c'est 15, pas 8.", avec=[Create(fl)])
            sc.play(Create(el), run_time=0.2)
            bon = encre("6x + 15", 34, lettres="x", couleur=ENCRE_OK).sans_audit().move_to(P(0, -0.1)).align_to(cop.droite, LEFT)
            egal = encre("=", 34, lettres="", couleur=ENCRE_OK).sans_audit().move_to(P(cop.egal.get_x(), -0.1))
            sc.ph_eq(2, "Le bon résultat : 6x + 15.", "Le bon résultat : 6 x plus 15.")
            sc.play(FadeIn(egal), FadeIn(bon, scale=1.2), run_time=0.2)
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Où est l'erreur ?", "3(2x + 5) = 6x + 8"],
                            [E("6x est faux", 34, lettres="x"), E("8 est faux, il faut 15", 34, lettres=""),
                             E("il n'y a pas d'erreur", 34, lettres="")], 1,
                            ["Réponse B.", "3 × 5 = 15, pas 8.", "Le bon résultat : 6x + 15."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : troisième défi, les cartons de biscuits ────────────────────────
    def ecran_probleme(self):
        self.ecran("05-probleme")
        tit = self.lg("Troisième défi : écrire un problème.", 0, 3.1, 44, JAUNE_TITRE, maxw=11)
        self.dit(tit, "Troisième défi : écrire un problème.")
        m = chloe(0.85)
        m.perso.move_to(P(-5.45, 0.45))
        m.nom.next_to(m.perso, UP, buff=0.12).set_x(-5.45)
        l1 = self.lg("Chloé range des boîtes de biscuits.", 0.9, 2.3, 40, maxw=9.0)
        self.dit(l1, "Chloé range des boîtes de biscuits.", avec=[FadeIn(m.perso, shift=UP * 0.2), FadeIn(m.nom)])
        XC = 1.2
        ga = VGroup(*[carton(1.3) for _ in range(3)]).arrange(RIGHT, buff=0.3).move_to(P(XC, 0.55))
        la_ = [D("x + 2", 34).move_to(c.caisse) for c in ga]
        gb = VGroup(*[carton(1.3) for _ in range(2)]).arrange(RIGHT, buff=0.3).move_to(P(XC, -1.45))
        lb_ = [D("x + 5", 34).move_to(c.caisse) for c in gb]
        a = self.lg("3 cartons de x + 2 boîtes,", XC, 1.5, 40, lettres="x", maxw=8.0)
        self.poser_avec(a, "3 cartons de x plus 2 boîtes,",
                        {0: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in ga], lag_ratio=0.2)],
                         3: lambda: [FadeIn(VGroup(*[x.atomes[0] for x in la_]))],
                         4: lambda: [FadeIn(VGroup(*[x.atomes[1] for x in la_]))],
                         5: lambda: [FadeIn(VGroup(*[x.atomes[2] for x in la_]))]})
        b = self.lg("et 2 cartons de x + 5 boîtes.", XC, -0.5, 40, lettres="x", maxw=8.0)
        self.poser_avec(b, "et 2 cartons de x plus 5 boîtes.",
                        {1: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in gb], lag_ratio=0.2)],
                         4: lambda: [FadeIn(VGroup(*[x.atomes[0] for x in lb_]))],
                         5: lambda: [FadeIn(VGroup(*[x.atomes[1] for x in lb_]))],
                         6: lambda: [FadeIn(VGroup(*[x.atomes[2] for x in lb_]))]})
        q = self.lg("Combien de boîtes en tout ?", -0.4, -2.85, 44, JAUNE_TITRE, maxw=9)
        self.dit(q, "Combien de boîtes en tout ?", avec=[Circumscribe(VGroup(ga, gb), color=WHITE)])
        self.insister(q, 1.1, 0.18)
        self.attendre_voix(marge=0.6)
        self.p = dict(ga=VGroup(ga, *la_), gb=VGroup(gb, *lb_))

    # ── 06 : modéliser, développer, réduire ─────────────────────────────────
    def ecran_modeliser(self):
        self.ecran("06-modeliser")
        ga, gb = self.p["ga"], self.p["gb"]
        VGroup(ga, gb).scale(0.6)
        ga.move_to(P(-2.4, 2.7))
        gb.move_to(P(2.4, 2.7))
        self.add(ga, gb)
        XL, XG = -1.95, -6.1

        def aligne(m, x):
            return m.align_to(P(x, 0), LEFT)
        la = aligne(self.lg("On écrit :", 0, 1.05, 36, CIEL, maxw=3.7), XG)
        self.dit(la, "On écrit :")
        e1 = aligne(D("3(x + 2) + 2(x + 5)", 56).move_to(P(0, 1.05)), XL)
        e1.atomes[0].set_color(FACTEUR)
        e1.atomes[7].set_color(FACTEUR)
        self.poser_avec(e1, "3 fois, entre parenthèses, x plus 2, plus 2 fois, entre parenthèses, x plus 5.",
                        {0: lambda: [Circumscribe(ga, color=WHITE)], 7: lambda: [Circumscribe(gb, color=WHITE)]})
        fl = [self.fleche_arc(e1.atomes[0], e1.atomes[2], angle=-1.6), self.fleche_arc(e1.atomes[0], e1.atomes[4], angle=-1.05),
              self.fleche_arc(e1.atomes[7], e1.atomes[9], angle=-1.6), self.fleche_arc(e1.atomes[7], e1.atomes[11], angle=-1.05)]
        lb = aligne(self.lg("On développe :", 0, -0.25, 36, CIEL, maxw=3.7), XG)
        self.dit(lb, "On développe :", avec=[Create(VGroup(*fl))])
        e2 = aligne(D("3x + 6 + 2x + 10", 56).move_to(P(0, -0.25)), XL)
        self.dire_eq(e2, "3 x plus 6, plus 2 x plus 10.")
        lc = aligne(self.lg("On réduit :", 0, -1.55, 36, CIEL, maxw=3.7), XG)
        x_termes = VGroup(e2.atomes[0], e2.atomes[1], e2.atomes[5], e2.atomes[6])
        nb = VGroup(e2.atomes[3], e2.atomes[8])
        self.dit(lc, "On réduit :", avec=[Circumscribe(x_termes, color=INCONNUE)])
        e3 = aligne(D("5x + 16 boîtes", 56, VERT_OK, lettres="").move_to(P(0, -1.55)), XL)
        self.dire_eq(e3, "5 x plus 16 boîtes.", avec=[Circumscribe(nb, color=WHITE)])
        self.play(Create(self.cadre_ok(e3, 0.14)), run_time=0.2)
        self.insister(e3, 1.1, 0.18)
        self.attendre_voix(marge=0.6)

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        dv = self.lg("Calcule de tête", -3.9, 1.3, 50, CIEL, maxw=5)
        self.dit(dv, "Calcule de tête")
        e = D("7 × 1,99", 76, lettres="").move_to(P(1.6, 1.3))
        tartes = VGroup(*[tarte(0.3) for _ in range(7)]).arrange(RIGHT, buff=0.22).move_to(P(-0.4, -0.25))
        self.poser_avec(e, "7 fois 1,99.", {0: lambda: [LaggedStart(*[FadeIn(t, scale=0.6) for t in tartes], lag_ratio=0.1)]})
        self.play(e.atomes[0].animate.set_color(FACTEUR), run_time=0.12)
        q = T("= ?", 76, JAUNE_TITRE, audit=False).next_to(e, RIGHT, buff=0.3)
        self.play(FadeIn(q, scale=1.3), run_time=0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.75))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, dv=dv, e=e, q=q, pz=pz, tartes=tartes)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("07b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.0))
        e, q = d["e"], d["q"]
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["dv"]),
                VGroup(e, q).animate.scale(0.66).move_to(P(-4.2, 2.0)),
                d["tartes"].animate.scale(0.62).move_to(P(-4.0, 1.0)), rt=0.4)
        XE = 2.95
        a = D("1,99 = 2 − 0,01", 50).mis_sur_egal(XE, 2.1)
        a.atomes[2].set_color(TROIS)
        a.atomes[4].set_color(CENTIME)
        self.dire_eq(a, "1,99, c'est 2 moins 0,01.")
        b = D("7 × 2 = 14", 48).mis_sur_egal(XE, 1.2)
        b.atomes[0].set_color(FACTEUR)
        b.atomes[2].set_color(TROIS)
        self.dire_eq(b, "7 fois 2 : 14.")
        c = D("7 × 0,01 = 0,07", 48).mis_sur_egal(XE, 0.3)
        c.atomes[0].set_color(FACTEUR)
        c.atomes[2].set_color(CENTIME)
        self.dire_eq(c, "7 fois 0,01 : 0,07.")
        r = D("14 − 0,07 = 13,93", 62, VERT_OK, lettres="").move_to(P(0, -1.2))
        self.dire_eq(r, "14 moins 0,07 : 13,93.")
        self.play(Create(self.cadre_ok(r, 0.18)), run_time=0.2)
        res = D("= 13,93", 76, VERT_OK, lettres="", audit=False).scale(0.66).next_to(e, RIGHT, buff=0.22)
        self.play(FadeOut(q), FadeIn(res, scale=1.3), run_time=0.2)
        self.insister(r, 1.1, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        e = D("4(3 − 0,01)", 50, audit=False)
        e.atomes[0].set_color(FACTEUR)
        f = VGroup(self.fleche_arc(e.atomes[0], e.atomes[2], VERT_OK, angle=-1.6),
                   self.fleche_arc(e.atomes[0], e.atomes[4], VERT_OK, angle=-1.0))
        r = D("= 4 × 3 − 4 × 0,01", 40, VERT_OK, lettres="", audit=False).next_to(e, DOWN, buff=0.3)
        cop = VGroup(Feuille(1.5, 1.1, pas=0.3), tarte(0.32), carton(0.8)).arrange(RIGHT, buff=0.3).next_to(r, DOWN, buff=0.5)
        fig = VGroup(f, e, r, cop)
        lignes = self.finale_colonne([["La distributivité sert à", "calculer de tête,"],
                                      ["à repérer les erreurs,", "et à écrire un problème."],
                                      ["Toujours : chaque terme,", "avec son signe."]],
                                     fs=38, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_vendeuse()
        self.ecran_astuce()
        self.ecran_question1()
        self.ecran_erreur()
        self.ecran_signe()
        self.ecran_question2()
        self.ecran_probleme()
        self.ecran_modeliser()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
