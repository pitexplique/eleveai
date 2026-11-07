# div_critere_3_9.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers », épisode 03 : CRITÈRES DE 3 ET DE 9.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : div_critere_3_9.
# Décor et métier : Théo, logisticien (un grand entrepôt, des piles de colis). Centres : transports.
# Écrans : garde (00) ; les colis de Théo (01) ; la somme des chiffres (02) ; la règle (03) ;
# QUESTION 1 (03q) ; le sens : multiples de 9 dans les multiples de 3 (04) ; le piège (05) ;
# QUESTION 2 (05q) ; défi (06) et correction (06b) ; ce que tu as appris (07) ; fin (08).
# Voix : manim/voix/4e-div-critere-3-9.json ; marques : div_critere_3_9_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/div_critere_3_9.py DivCritere39_4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/div_critere_3_9.py DivCritere39_4e -o eleveai-maths-4e-div-critere-3-9 --media_dir manim/scripts/4e/media-div-03
# Sortie : manim/sorties/4e/maths/divisibilite/03-critere-3-9/eleveai-maths-4e-div-critere-3-9.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from div_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402

PAROLE["0"] = "0"  # la voix dit « plus 0 » : le chiffre s'écrit 0 dans le texte de la voix

CARTON = "#c08552"
SCOTCH = "#f5deb3"
# une couleur par chiffre de 4 275 (et des sommes) : on suit chaque chiffre jusqu'à la somme
CH = ["#7dd3fc", "#facc15", "#fb923c", "#f472b6"]


def colis(c=0.3, couleur=CARTON):
    """Un colis : le carton et sa bande de scotch."""
    b = Square(side_length=c, fill_color=couleur, fill_opacity=1, stroke_color="#7c4a1d", stroke_width=2)
    s = Rectangle(width=c * 0.18, height=c, fill_color=SCOTCH, fill_opacity=1, stroke_width=0).move_to(b)
    return VGroup(b, s)


def pile(n, c=0.3, couleur=CARTON):
    """Une pile de n colis, le premier en bas."""
    return VGroup(*[colis(c, couleur) for _ in range(n)]).arrange(UP, buff=0.03)


def colis_en_vrac(n, x0, x1, y0, y1, c=0.3, graine=4):
    rng = np.random.default_rng(graine)
    pts = []
    while len(pts) < n:
        p = (rng.uniform(x0, x1), rng.uniform(y0, y1))
        if all(abs(p[0] - q[0]) > 1.15 * c or abs(p[1] - q[1]) > 1.15 * c for q in pts):
            pts.append(p)
    return VGroup(*[colis(c).move_to(P(*p)).rotate(rng.uniform(-0.25, 0.25)) for p in pts])


def colis_chiffre(s, c=0.75, fs=46):
    """Un colis étiqueté d'un chiffre (rappel d'un nombre déjà dit)."""
    b = colis(c)
    t = T(s, fs, WHITE, audit=False, gras=True).move_to(b)
    fond = RoundedRectangle(width=c * 0.62, height=c * 0.62, corner_radius=0.06, fill_color="#1f2937", fill_opacity=1,
                            stroke_width=0).move_to(b)
    return VGroup(b, fond, t)


def theo_logisticien(s=0.72):
    """Théo : le gilet orange à bandes et la casquette de l'entrepôt."""
    p = personne(peau="#e0ac69", tenue="#f97316", cheveux="#3f2a14", s=s)
    bande = Rectangle(width=0.95 * s, height=0.1 * s, fill_color="#fde047", fill_opacity=1, stroke_width=0)
    bande.move_to(p.corps.get_center() + DOWN * 0.15 * s)
    casq = AnnularSector(inner_radius=0, outer_radius=0.5 * s, angle=PI, start_angle=0, fill_color="#1d4ed8",
                         fill_opacity=1, stroke_width=0).move_to(p.tete.get_top() + DOWN * 0.08 * s)
    visiere = Rectangle(width=0.55 * s, height=0.08 * s, fill_color="#1e3a8a", fill_opacity=1, stroke_width=0)
    visiere.next_to(casq, DOWN, buff=0).shift(RIGHT * 0.3 * s)
    return VGroup(p, bande, casq, visiere)


def marque(ok, fs=46):
    return T("✓" if ok else "✗", fs, VERT_OK if ok else PIEGE, audit=False, gras=True)


class DivCritere39_4e(PaysageDiv):
    nom_voix = "4e-div-critere-3-9"
    fichier_marques = "div_critere_3_9_marques.json"
    ceinture = "orange"

    def colorer_chiffres(self, e, couleurs):
        """Les chiffres de la somme (atomes pairs) prennent la couleur de leur chiffre."""
        for k, c in enumerate(couleurs):
            e.atomes[2 * k].set_color(c)
        return e

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Divisible par 3 et par 9", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Divisible", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        p3 = pile(3, 0.36).move_to(P(-5.2, 0.0), aligned_edge=DOWN).align_to(P(0, -1.3), DOWN)
        p9 = pile(9, 0.36).move_to(P(-4.3, 0.0)).align_to(P(0, -1.3), DOWN)
        l1 = self.lg("Que cache", 1.6, 0.75, 46, maxw=8)
        self.dit(l1, "Que cache", avec=[LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in [*p3, *p9]], lag_ratio=0.04)])
        l2 = self.lg("la somme des chiffres ?", 1.6, -0.1, 54, JAUNE_TITRE, maxw=8.4)
        self.dit(l2, "la somme des chiffres ?")
        self.insister(l2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les colis de Théo ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = theo_logisticien().move_to(P(-5.6, 2.2))
        tas = colis_en_vrac(26, -6.0, -2.4, -2.9, 0.4)
        self.dit(self.lg("Théo est logisticien :", 3.3, 3.0, 40, CIEL), "Théo est logisticien :", avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("il organise les livraisons", 3.3, 2.35, 36), "il organise les livraisons")
        self.dit(self.lg("d'un grand entrepôt.", 3.3, 1.8, 36), "d'un grand entrepôt.")
        nb = self.lg("4 275 colis arrivent.", 3.3, 1.0, 42, JAUNE_TITRE)
        self.dit(nb, "4 275 colis arrivent.", avec=[LaggedStart(*[FadeIn(b, shift=DOWN * 0.4) for b in tas], lag_ratio=0.03)])
        self.dit(self.lg("Il veut les charger", 3.3, 0.2, 36), "Il veut les charger")
        self.dit(self.lg("par piles de 3,", 3.3, -0.4, 40, CIEL), "par piles de 3,")
        p3 = pile(3, 0.3).move_to(P(-1.55, 0)).align_to(P(0, -2.9), DOWN)
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in p3], lag_ratio=0.2), run_time=0.45)
        self.dit(self.lg("ou par piles de 9,", 3.3, -1.0, 40, CIEL), "ou par piles de 9,")
        p9 = pile(9, 0.3).move_to(P(-0.75, 0)).align_to(P(0, -2.9), DOWN)
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in p9], lag_ratio=0.1), run_time=0.6)
        fin = self.lg("sans qu'il en reste.", 3.3, -1.75, 42, JAUNE_TITRE, maxw=5.4)
        self.dit(fin, "sans qu'il en reste.")
        self.insister(fin, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : on additionne les chiffres ─────────────────────────────────────
    def ecran_somme(self):
        self.ecran("02-somme")
        self.dit(self.lg("Pour 3 et 9,", -3.2, 3.15, 42, CIEL), "Pour 3 et 9,")
        self.dit(self.lg("le dernier chiffre ne suffit pas.", 2.6, 3.15, 40, maxw=7.2), "le dernier chiffre ne suffit pas.")
        ch = VGroup(*[T(d, 120, c, audit=False, gras=True) for d, c in zip("4275", CH)])
        ch.arrange(RIGHT, buff=0.18).move_to(P(0, 1.55))
        ch[0].shift(LEFT * 0.25)
        self.play(FadeIn(ch, scale=1.2), run_time=0.35)
        croix = marque(False, 60).next_to(ch[3], RIGHT, buff=0.3)
        self.play(Circumscribe(ch[3], color=PIEGE, shape=Circle, buff=0.12), FadeIn(croix, scale=1.5), run_time=0.6)
        self.dit(self.lg("On additionne tous les chiffres.", 0, 0.05, 42, maxw=11),
                 "On additionne tous les chiffres.",
                 avec=[FadeOut(croix), LaggedStart(*[Indicate(d, color=d.get_color(), scale_factor=1.25) for d in ch], lag_ratio=0.2, run_time=1.2)])
        e = self.colorer_chiffres(F("4 + 2 + 7 + 5 = 18", 76), CH).move_to(P(0, -1.35))
        e.atomes[-1].set_color(JAUNE_TITRE)
        self.dire_eq(e, "4 plus 2 plus 7 plus 5 égale 18.", echelle=1.25)
        self.insister(e.atomes[-1], 1.3, 0.2)
        self.play(Create(SurroundingRectangle(e.atomes[-1], color=JAUNE_TITRE, buff=0.15, stroke_width=4)), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 03 : la règle ───────────────────────────────────────────────────────
    def ecran_regle(self):
        self.ecran("03-regle")
        r1 = self.lg("Si la somme est divisible par 3,", 0, 3.2, 40, maxw=12)
        self.dit(r1, "Si la somme est divisible par 3,")
        r1b = self.lg("le nombre l'est aussi.", 0, 2.6, 40, VERT_OK, maxw=12)
        self.dit(r1b, "le nombre l'est aussi.")
        r2 = self.lg("Si la somme est divisible par 9,", 0, 1.75, 40, maxw=12)
        self.dit(r2, "Si la somme est divisible par 9,")
        r2b = self.lg("le nombre l'est aussi.", 0, 1.15, 40, VERT_OK, maxw=12)
        self.dit(r2b, "le nombre l'est aussi.", n=2)
        for r in (r1, r2):
            r.atomes[-2].set_color(JAUNE_TITRE)
        p1 = pile(9, 0.25).move_to(P(-5.2, 0)).align_to(P(0, -3.0), DOWN)
        p2 = pile(9, 0.25).move_to(P(-4.55, 0)).align_to(P(0, -3.0), DOWN)
        e = F("18 = 9 × 2 :", 60).move_to(P(0.6, -0.3))
        e.atomes[0].set_color(JAUNE_TITRE)
        self.dire_eq(e, "18 égale 9 fois 2 :", echelle=1.2,
                     avec=[LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in [*p1, *p2]], lag_ratio=0.03, run_time=0.9)])
        c = self.lg("4 275 est divisible par 3 et par 9.", 0.6, -1.35, 42, VERT_OK, maxw=9.0)
        self.dit(c, "4 275 est divisible par 3 et par 9.")
        b3 = VGroup(T("÷ 3", 46, CIEL, audit=False), marque(True)).arrange(RIGHT, buff=0.2).move_to(P(-0.6, -2.5))
        b9 = VGroup(T("÷ 9", 46, CIEL, audit=False), marque(True)).arrange(RIGHT, buff=0.2).move_to(P(2.0, -2.5))
        self.play(FadeIn(b3, scale=1.3), FadeIn(b9, scale=1.3), Create(self.cadre_ok(c, 0.14)), run_time=0.35)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        fig = VGroup(*[colis_chiffre(d) for d in "1302"]).arrange(RIGHT, buff=0.12).move_to(P(-3.4, 0.0))

        def avant(sc):
            sc.eq_dans_q(0, "1 302 est-il", "1 302 est-il", lettres="")
            sc.eq_dans_q(0, "divisible par 3 ?", "divisible par 3 ?", lettres="")
            sc.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in fig], lag_ratio=0.15), run_time=0.4)

        def apres(sc):
            sc.reponse(("Réponse A : oui.", "Réponse A : oui."),
                       ("1 + 3 + 0 + 2 = 6,", "1 plus 3 plus 0 plus 2 égale 6,"),
                       ("et 6 est divisible par 3.", "et 6 est divisible par 3."))

        self.question_pause("03q-question", "03r-reponse", ["1 302 est-il", "divisible par 3 ?"],
                            [E("oui, la somme fait 6", 34, lettres=""), E("non, il finit par 2", 34, lettres=""),
                             E("non, la somme fait 5", 34, lettres="")], 0,
                            ["Réponse A : oui.", "1 + 3 + 0 + 2 = 6,", "et 6 est divisible par 3."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : le sens ────────────────────────────────────────────────────────
    def ecran_sens(self):
        self.ecran("04-sens")
        self.dit(self.lg("Attention au sens.", 0, 3.2, 46, ORANGE_RETENUE), "Attention au sens.")
        cx, cy = -3.1, -0.45
        ext = Ellipse(width=6.3, height=5.1, color=CIEL, stroke_width=4).move_to(P(cx, cy))
        lab3 = T("multiples de 3", 28, CIEL, audit=False).move_to(P(cx, cy + 1.95))
        inn = Circle(radius=1.65, color=JAUNE_TITRE, stroke_width=4).move_to(P(cx + 0.55, cy - 0.35))
        lab9 = T("multiples de 9", 22, JAUNE_TITRE, audit=False).move_to(inn.get_top() + DOWN * 0.62)
        bloc = VGroup(*[pile(3, 0.26, couleur=c) for c in ("#c08552", "#a16207", "#d4a373")]).arrange(RIGHT, buff=0.08)
        neuf = T("9", 50, JAUNE_TITRE, audit=False, gras=True)
        g9 = VGroup(bloc, neuf).arrange(RIGHT, buff=0.3).move_to(inn.get_center() + DOWN * 0.25)
        self.dit(self.lg("9 est un multiple de 3.", 3.5, 2.3, 38), "9 est un multiple de 3.",
                 avec=[FadeIn(neuf, scale=1.4), LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in bloc], lag_ratio=0.25)])
        self.dit(self.lg("Donc tout multiple de 9", 3.5, 1.4, 38, JAUNE_TITRE), "Donc tout multiple de 9")
        self.play(Create(inn), FadeIn(lab9), run_time=0.4)
        self.dit(self.lg("est un multiple de 3.", 3.5, 0.8, 38, CIEL), "est un multiple de 3.", n=2)
        self.play(Create(ext), FadeIn(lab3), run_time=0.45)
        self.dit(self.lg("Mais l'inverse est faux :", 3.5, -0.3, 40, PIEGE), "Mais l'inverse est faux :")
        six = VGroup(VGroup(pile(3, 0.24), pile(3, 0.24)).arrange(RIGHT, buff=0.06), T("6", 50, VERT_OK, audit=False, gras=True))
        six.arrange(RIGHT, buff=0.22).move_to(P(cx - 1.95, cy + 0.15))
        self.dit(self.lg("6 est divisible par 3,", 3.5, -1.0, 38), "6 est divisible par 3,",
                 avec=[FadeIn(six, scale=1.3)])
        fl = Arrow(six.get_bottom() + DOWN * 0.05, inn.get_left() + DOWN * 0.35 + LEFT * 0.05, color=PIEGE, buff=0.05,
                   stroke_width=5, max_tip_length_to_length_ratio=0.2)
        cr = marque(False, 44).move_to(fl.get_center() + LEFT * 0.3 + DOWN * 0.2)
        self.dit(self.lg("et pas par 9.", 3.5, -1.6, 40, PIEGE), "et pas par 9.", avec=[GrowArrow(fl)])
        self.play(FadeIn(cr, scale=1.5), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.dit(self.lg("Le piège : croire que divisible par 3, c'est aussi par 9.", 0, 3.2, 38, PIEGE, maxw=12.6),
                 "Le piège : croire que divisible par 3, c'est aussi par 9.")
        self.dit(self.lg("Prends 4 281.", 0, 2.25, 48, CIEL), "Prends 4 281.")
        e = self.colorer_chiffres(F("4 + 2 + 8 + 1 = 15", 70), CH).move_to(P(0, 1.15))
        e.atomes[-1].set_color(JAUNE_TITRE)
        self.dire_eq(e, "4 plus 2 plus 8 plus 1 égale 15.", echelle=1.25)
        q = self.lg("15 est divisible par 3, pas par 9.", 0, 0.0, 40, maxw=11)
        self.dit(q, "15 est divisible par 3, pas par 9.")
        d = self.lg("Donc 4 281 :", -4.5, -1.55, 44, CIEL)
        self.dit(d, "Donc 4 281 :")
        oui = self.lg("par 3, oui ;", -0.5, -1.55, 44, VERT_OK, maxw=3.4)
        p3 = pile(3, 0.28).next_to(oui, DOWN, buff=0.25)
        m3 = marque(True, 44).next_to(p3, RIGHT, buff=0.2)
        self.dit(oui, "par 3, oui ;", n=1)
        self.play(FadeIn(p3, shift=DOWN * 0.2), FadeIn(m3, scale=1.5), run_time=0.3)
        non = self.lg("par 9, non.", 3.3, -1.55, 44, PIEGE, maxw=3.4)
        self.dit(non, "par 9, non.")
        x9 = marque(False, 60).next_to(non, DOWN, buff=0.3)
        self.play(FadeIn(x9, scale=1.5), run_time=0.25)
        self.insister(non, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        fig = VGroup(*[colis_chiffre(d, 0.9, 54) for d in "738"]).arrange(RIGHT, buff=0.14).move_to(P(-3.4, 0.0))

        def avant(sc):
            sc.eq_dans_q(0, "738 est", "738 est", lettres="")
            sc.eq_dans_q(0, "divisible par…", "divisible par…", lettres="")
            sc.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in fig], lag_ratio=0.15), run_time=0.4)

        def apres(sc):
            sc.reponse(("Réponse B : 3 et 9.", "Réponse B : 3 et 9."),
                       ("7 + 3 + 8 = 18.", "7 plus 3 plus 8 égale 18."))
            # la suite à gauche, sous les colis : la carte C est barrée
            c = sc.cartes_q[2]
            sc.dit(sc.lg("Et C était impossible :", -3.4, -1.3, 34, PIEGE), "Et C était impossible :",
                   avec=[Create(Line(c.get_left() + RIGHT * 0.1, c.get_right() + LEFT * 0.1, color=PIEGE, stroke_width=5))])
            sc.dit(sc.lg("divisible par 9, c'est", -3.4, -1.9, 34, VERT_OK), "divisible par 9, c'est")
            sc.dit(sc.lg("toujours divisible par 3.", -3.4, -2.5, 34, VERT_OK), "toujours divisible par 3.")

        self.question_pause("05q-question", "05r-reponse", ["738 est", "divisible par…"],
                            [E("3 seulement", 38, lettres=""), E("3 et 9", 38, lettres=""), E("9 seulement", 38, lettres="")], 1,
                            ["Réponse B : 3 et 9.", "7 + 3 + 8 = 18."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        p = theo_logisticien().move_to(P(-5.6, 0.9))
        tas = colis_en_vrac(16, -4.7, -2.2, -0.9, 1.7, c=0.32, graine=9)
        self.dit(self.lg("Théo reçoit 5 130 colis,", 3.2, 1.5, 40), "Théo reçoit 5 130 colis,",
                 avec=[FadeIn(p), LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in tas], lag_ratio=0.04)])
        self.dit(self.lg("puis 2 024.", 3.2, 0.85, 40), "puis 2 024.")
        q = self.lg("Par 3 ? Par 9 ?", 3.2, -0.15, 52, JAUNE_TITRE, maxw=5.6)
        self.dit(q, "Par 3 ? Par 9 ?")
        self.insister(q, 1.1, 0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.9))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.25))), rt=0.25)
        xg, xd = -3.5, 3.3
        a = F("5 130 :", 58, CIEL).move_to(P(xg, 2.35))
        self.dire_eq(a, "5 130 :", echelle=1.2)
        s1 = self.colorer_chiffres(F("5 + 1 + 3 + 0 = 9 ;", 42), CH).move_to(P(xg, 1.4))
        s1.atomes[-2].set_color(JAUNE_TITRE)
        self.dire_eq(s1, "5 plus 1 plus 3 plus 0 égale 9 ;", echelle=1.2)
        g1 = self.lg("divisible par 3 et par 9.", xg, 0.5, 34, VERT_OK)
        self.dit(g1, "divisible par 3 et par 9.")
        pg = VGroup(VGroup(pile(3, 0.25), marque(True, 40)).arrange(RIGHT, buff=0.15, aligned_edge=DOWN),
                    VGroup(pile(9, 0.25), marque(True, 40)).arrange(RIGHT, buff=0.15, aligned_edge=DOWN))
        pg.arrange(RIGHT, buff=0.9, aligned_edge=DOWN).move_to(P(xg, 0)).align_to(P(0, -2.9), DOWN)
        self.play(FadeIn(pg, shift=DOWN * 0.2), Create(self.cadre_ok(g1, 0.14)), run_time=0.35)
        b = F("2 024 :", 58, CIEL).move_to(P(xd, 2.35))
        self.dire_eq(b, "2 024 :", echelle=1.2)
        s2 = self.colorer_chiffres(F("2 + 0 + 2 + 4 = 8 ;", 42), CH).move_to(P(xd, 1.4))
        s2.atomes[-2].set_color(JAUNE_TITRE)
        self.dire_eq(s2, "2 plus 0 plus 2 plus 4 égale 8 ;", echelle=1.2)
        g2 = self.lg("ni par 3, ni par 9.", xd, 0.5, 40, PIEGE)
        self.dit(g2, "ni par 3, ni par 9.")
        pd = VGroup(VGroup(pile(3, 0.25), marque(False, 40)).arrange(RIGHT, buff=0.15, aligned_edge=DOWN),
                    VGroup(pile(9, 0.25), marque(False, 40)).arrange(RIGHT, buff=0.15, aligned_edge=DOWN))
        pd.arrange(RIGHT, buff=0.9, aligned_edge=DOWN).move_to(P(xd - 0.6, 0)).align_to(P(0, -2.9), DOWN)
        self.play(FadeIn(pd, shift=DOWN * 0.2), run_time=0.35)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        self.XL = -4.6
        n = VGroup(*[T(d, 58, c, audit=False, gras=True) for d, c in zip("4275", CH)]).arrange(RIGHT, buff=0.1)
        n[0].shift(LEFT * 0.12)
        s = self.colorer_chiffres(F("4 + 2 + 7 + 5 = 18", 42).sans_audit(), CH)
        s.atomes[-1].set_color(JAUNE_TITRE)
        fig = VGroup(n, s).arrange(RIGHT, buff=0.7)
        lignes = self.finale_colonne([["Pour 3 et 9,", "on additionne les chiffres."],
                                      ["Si la somme est divisible par 3, ou par 9,", "le nombre aussi."],
                                      ["Divisible par 9, c'est divisible par 3 ;", "l'inverse est faux."]], fs=40)
        fig.move_to(P(-1.0, -2.75))
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_somme()
        self.ecran_regle()
        self.ecran_question1()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
