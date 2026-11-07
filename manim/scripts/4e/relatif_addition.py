# relatif_addition.py
# EleveAI — Maths 4e — série « Relatifs », épisode 01 : ADDITIONNER.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : relatif_addition.
# Décor et métier : Inès, conceptrice de jeux vidéo. Centre : jeux-video.
# Écrans (micro relatif_addition partout) : garde (00) ; le jeu (01) ; la droite (02) ; signes
# contraires (03) ; QUESTION 1 (03q) ; deux pièges (04) ; même signe (05) ; le piège (06) ;
# QUESTION 2 (06q) ; opposés (07) ; défi (08) et correction (08b) ; ce que tu as appris (09) ; fin (10).
# Voix : manim/voix/4e-relatif-addition.json ; marques : relatif_addition_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/relatif_addition.py RelatifAddition4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/relatif_addition.py RelatifAddition4e -o eleveai-maths-4e-relatif-addition --media_dir manim/scripts/4e/media-rel-01
# Sortie : manim/sorties/4e/maths/relatifs/01-addition/eleveai-maths-4e-relatif-addition.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403

VIOLET = "#a78bfa"
GRIS_JEU = "#334155"


def Fr(s, fs=56, c=WHITE, audit=True):
    """Une formule ou une phrase : tout nombre négatif est orange, où qu'il soit dans la ligne."""
    e = E(s, fs, c, lettres="", audit=audit)
    a = e.atomes
    for i, x in enumerate(a):
        if x.original_text == "−" and i + 1 < len(a) and (i == 0 or not (a[i - 1].original_text.isdigit() or a[i - 1].original_text == ")")):
            x.set_color(NEG)
            a[i + 1].set_color(NEG)
    return e


def lr(s, x, y, fs=36, c=WHITE, maxw=None):
    """Une ligne de Fr, posée en (x, y), bornée à maxw."""
    e = Fr(s, fs, c)
    if maxw and e.width > maxw:
        e.scale_to_fit_width(maxw)
    return e.move_to(P(x, y))


def ix(e, mot, n=1):
    """L'indice du n-ième atome `mot` de la ligne e."""
    k = [i for i, a in enumerate(e.atomes) if a.original_text == mot]
    return k[n - 1]


def ines(s=0.72):
    """Inès : le casque audio et la manette de la conceptrice de jeux vidéo."""
    p = personne(peau="#8d5524", tenue="#7c3aed", cheveux="#111827", longs=True, s=1.0)
    casque = casque_audio(p)
    boitier = RoundedRectangle(width=0.95, height=0.42, corner_radius=0.16, fill_color="#e2e8f0", fill_opacity=1, stroke_color="#475569", stroke_width=2)
    boitier.move_to(p.corps.get_center() + UP * 0.05)
    croix = VGroup(Rectangle(width=0.2, height=0.06, fill_color="#111827", fill_opacity=1, stroke_width=0),
                   Rectangle(width=0.06, height=0.2, fill_color="#111827", fill_opacity=1, stroke_width=0)).move_to(boitier.get_center() + LEFT * 0.24)
    boutons = VGroup(Dot(boitier.get_center() + RIGHT * 0.17, radius=0.05, color=NEG), Dot(boitier.get_center() + RIGHT * 0.31, radius=0.05, color=POS))
    return VGroup(p, casque, boitier, croix, boutons).scale(s)


def joueur(s=1.0):
    """Le personnage du jeu : un petit robot carré. .pieds : le bas du personnage."""
    corps = RoundedRectangle(width=0.36, height=0.3, corner_radius=0.05, fill_color="#c084fc", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    tete = RoundedRectangle(width=0.3, height=0.24, corner_radius=0.05, fill_color="#e9d5ff", fill_opacity=1, stroke_color=WHITE, stroke_width=2).next_to(corps, UP, buff=0.0)
    yeux = VGroup(*[Dot(tete.get_center() + RIGHT * dx, radius=0.03, color="#111827") for dx in (-0.07, 0.07)])
    g = VGroup(corps, tete, yeux).scale(s)
    g.set_z_index(3)
    return g


def bonus(r=0.3):
    """Le bonus : une étoile, bleu ciel comme tout ce qui est positif."""
    return Star(n=5, outer_radius=r, inner_radius=r * 0.45, fill_color=POS, fill_opacity=1, stroke_color=WHITE, stroke_width=2)


def piege(n=3, c=0.3):
    """Le piège : une rangée de pics, orange comme tout ce qui est négatif."""
    pics = VGroup(*[Triangle(fill_color=NEG, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5).scale(c * 0.68) for _ in range(n)])
    return pics.arrange(RIGHT, buff=0.0)


class Jauge(VGroup):
    """La jauge de score : « SCORE », une barre centrée sur 0, sa valeur écrite à droite.
    .aller(v) : les animations qui l'amènent à v et écrivent v ; .barre_a(v) : la barre seule."""

    def __init__(self, w=7.0, h=0.32, borne=10, centre=ORIGIN, fs=30, reserve=1.25, **kw):
        super().__init__(**kw)
        self.borne, self.fs = borne, fs
        self.lab = T("SCORE", fs, JAUNE_TITRE, audit=False, gras=True)
        L = w - self.lab.width - reserve
        self.fond = Rectangle(width=L, height=h, fill_color="#1e293b", fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
        self.lab.next_to(self.fond, LEFT, buff=0.18)
        self.barre = Rectangle(width=0.001, height=h * 0.8, fill_color=POS, fill_opacity=1, stroke_width=0).move_to(self.fond)
        self.centre_j = Line(self.fond.get_center() + UP * (h / 2 + 0.07), self.fond.get_center() + DOWN * (h / 2 + 0.07), color=WHITE, stroke_width=3)
        self.add(self.lab, self.fond, self.barre, self.centre_j)
        self.move_to(centre).shift(LEFT * reserve * 0.336)
        self.val = None

    def x(self, v):
        f = self.fond
        return f.get_left()[0] + (v + self.borne) / (2 * self.borne) * f.width

    def jauge_a(self, v):
        y = self.fond.get_center()[1]
        return Rectangle(width=max(abs(self.x(v) - self.x(0)), 0.001), height=self.fond.height * 0.8, fill_color=NEG if v < 0 else POS,
                         fill_opacity=1, stroke_width=0).move_to(P((self.x(v) + self.x(0)) / 2, y))

    def barre_a(self, v):
        return Transform(self.barre, self.jauge_a(v))

    def ecrit(self, s, c):
        """La valeur à droite de la barre (déjà dite : pas d'audit)."""
        anims = [FadeOut(self.val)] if self.val is not None else []
        self.val = T(s, int(self.fs * 1.3), c, audit=False, gras=True).next_to(self.fond, RIGHT, buff=0.2)
        return anims + [FadeIn(self.val, scale=1.4)]

    def aller(self, v):
        c = NEG if v < 0 else (POS if v > 0 else WHITE)
        return [self.barre_a(v), *self.ecrit(str(v).replace("-", "−"), c)]


class EcranJeu(VGroup):
    """L'écran du jeu d'Inès : le cadre, la jauge de score en haut, le sol en bas.
    .sur_sol(m, f) pose m sur le sol à la fraction f de la largeur (−1 à 1)."""

    def __init__(self, w=4.9, h=4.4, borne=10, centre=ORIGIN, reserve=1.25, **kw):
        super().__init__(**kw)
        self.w = w
        self.cadre = RoundedRectangle(width=w, height=h, corner_radius=0.18, stroke_color=VIOLET, stroke_width=6, fill_color=FOND_CARTE, fill_opacity=1)
        self.jauge = Jauge(w=w - 0.55, borne=borne, fs=24, reserve=reserve, centre=P(0, h / 2 - 0.5))
        self.jauge.shift(LEFT * 0.12)
        self.sol = Rectangle(width=w - 0.14, height=0.32, fill_color=GRIS_JEU, fill_opacity=1, stroke_width=0).move_to(P(0, -h / 2 + 0.23))
        self.herbe = Line(self.sol.get_corner(UL), self.sol.get_corner(UR), color="#64748b", stroke_width=4)
        self.nuages = VGroup(*[RoundedRectangle(width=0.8, height=0.16, corner_radius=0.08, fill_color="#1e293b", fill_opacity=1, stroke_width=0).move_to(P(dx, dy))
                               for dx, dy in ((-w * 0.28, h * 0.1), (w * 0.26, h * 0.18))])
        self.add(self.cadre, self.nuages, self.sol, self.herbe, self.jauge)
        self.move_to(centre)

    def sur_sol(self, m, f, haut=0.0):
        h = self.herbe.get_center()
        return m.move_to(np.array([h[0] + f * (self.herbe.width / 2), h[1] + m.height / 2 + haut, 0.0]))


class RelatifAddition4e(PaysageRel):
    nom_voix = "4e-relatif-addition"
    fichier_marques = "relatif_addition_marques.json"
    ceinture = "jaune"

    # ── outils de l'épisode ─────────────────────────────────────────────────
    def _disposer_q(self, question, choix, phrase):
        """Quatre ou cinq lignes de réponse : les cartes se resserrent pour leur laisser la place."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.82, about_point=cartes.get_corner(UL))
        pause.next_to(cartes, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        ph.scale_to_fit_width(5.2)
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        ph.next_to(cartes, DOWN, buff=0.14).align_to(P(self.XL, 0), LEFT)
        return tete, q, cartes, pause, rebours, ph

    def _y_j(self, d, j):
        return d.yy + 0.1 + j.height / 2

    def poser_j(self, d, j, v):
        return j.move_to(P(d.x(v), self._y_j(d, j)))

    def bond(self, d, j, u, v, c=POS, angle=None):
        """Le joueur saute de u à v sur la droite : son arc, et la flèche qui reste."""
        a = angle if angle is not None else (-1.0 if v > u else 1.0)
        y = self._y_j(d, j)
        arc = ArcBetweenPoints(P(d.x(u), y), P(d.x(v), y), angle=a)
        fl = CurvedArrow(P(d.x(u), d.yy + 0.08), P(d.x(v), d.yy + 0.08), angle=a, color=c, stroke_width=5, tip_length=0.17)
        return [MoveAlongPath(j, arc), Create(fl)]

    def segment(self, d, u, v, y, c, sw=12):
        return Line(P(d.x(u), y), P(d.x(v), y), color=c, stroke_width=sw)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Additionner des nombres relatifs", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Additionner", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        e = EcranJeu(w=3.7, h=2.9, reserve=0.3, centre=P(-3.55, 0.15))
        e.jauge.barre.become(e.jauge.jauge_a(5))
        pers = ines(0.62).move_to(P(-6.1, -0.4))
        j = e.sur_sol(joueur(0.9), -0.62)
        et = e.sur_sol(bonus(0.22), 0.55, haut=0.55)
        pi = e.sur_sol(piege(3, 0.3), 0.0)
        l1 = self.lg("Comment ajouter", 2.4, 1.05, 40, maxw=6.9)
        self.dit(l1, "Comment ajouter", avec=[FadeIn(e), FadeIn(j), FadeIn(et), FadeIn(pi), FadeIn(pers, shift=UP * 0.2)])
        l2 = self.lg("des nombres négatifs", 2.4, 0.4, 40, NEG, maxw=6.9)
        self.dit(l2, "des nombres négatifs", avec=[e.jauge.barre_a(-5)])
        l3 = self.lg("sans se tromper de signe ?", 2.4, -0.45, 46, JAUNE_TITRE, maxw=6.9)
        self.dit(l3, "sans se tromper de signe ?")
        self.insister(l3, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : le jeu d'Inès ──────────────────────────────────────────────────
    def ecran_jeu(self):
        self.ecran("01-jeu")
        e = EcranJeu(w=4.9, h=4.7, centre=P(-2.65, 0.75))
        pers = ines(0.72).move_to(P(-5.85, -1.35))
        j = e.sur_sol(joueur(1.15), -0.72)
        et = e.sur_sol(bonus(0.32), 0.62, haut=1.2)
        pi = e.sur_sol(piege(3, 0.42), -0.02)
        self.dit(lr("Inès est conceptrice", 3.35, 3.05, 40, CIEL, maxw=5.9), "Inès est conceptrice", avec=[FadeIn(pers, shift=UP * 0.3)])
        self.dit(lr("de jeux vidéo.", 3.35, 2.45, 38, CIEL, maxw=5.9), "de jeux vidéo.", avec=[FadeIn(e)])
        self.dit(lr("Dans son jeu, on gagne", 3.35, 1.72, 31, maxw=6.0), "Dans son jeu, on gagne")
        l = lr("des points avec les bonus,", 3.35, 1.22, 31, maxw=6.0)
        self.poser_avec(l, "des points avec les bonus,", {ix(l, "bonus"): lambda: [GrowFromCenter(et)]}, rt=0.16)
        l = lr("et on en perd dans les pièges.", 3.35, 0.72, 31, maxw=6.0)
        self.poser_avec(l, "et on en perd dans les pièges.", {ix(l, "pièges"): lambda: [FadeIn(pi, shift=UP * 0.15)]}, rt=0.16)
        l = lr("Un joueur a −3 points.", 3.35, -0.02, 31, maxw=6.0)
        self.poser_avec(l, "Un joueur a moins 3 points.", {ix(l, "joueur"): lambda: [FadeIn(j, scale=0.5)], ix(l, "3"): lambda: e.jauge.aller(-3)}, rt=0.2)
        l = lr("Il attrape un bonus de 7 points.", 3.35, -0.52, 31, maxw=6.0)
        tag = Fr("+7", 36, POS, audit=False).next_to(et, UP, buff=0.08)
        tag[0].set_color(POS)
        cible = et.get_center()

        def saute():
            a = ArcBetweenPoints(j.get_center(), cible + DOWN * 0.1, angle=-1.1)
            return [MoveAlongPath(j, a)]

        self.poser_avec(l, "Il attrape un bonus de 7 points.", {ix(l, "attrape"): saute, ix(l, "7"): lambda: [FadeIn(tag, scale=1.4)]}, rt=0.26)
        q = T("?", 36, JAUNE_TITRE, audit=False, gras=True).next_to(e.jauge.fond, RIGHT, buff=0.2)
        l = self.lg("Son score ?", 3.35, -1.28, 42, JAUNE_TITRE, maxw=5.9)
        self.poser_avec(l, "Son score ?", {ix(l, "score"): lambda: [Flash(et, color=POS, line_length=0.18), FadeOut(et), FadeOut(tag), FadeIn(q, scale=1.5), FadeOut(e.jauge.val),
                                                              j.animate.move_to(e.sur_sol(j.copy(), 0.62).get_center())]}, rt=0.3)
        c = F("(−3) + 7", 66).move_to(P(2.6, -2.45))
        self.dire_eq(c, "Moins 3 plus 7.")
        self.insister(c, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : sur la droite graduée ──────────────────────────────────────────
    def ecran_droite(self):
        self.ecran("02-droite")
        d = Droite(-5, 6, -5.0, 5.0, -0.3, fs=34)
        h = Jauge(w=8.0, centre=P(0, 1.45))
        j = self.poser_j(d, joueur(1.15), -3)
        self.play(FadeIn(d), FadeIn(h), run_time=0.25)
        l = lr("Sur la droite graduée, on part de −3.", 0, 3.08, 40, CIEL, maxw=12)
        self.poser_avec(l, "Sur la droite graduée, on part de moins 3.", {ix(l, "3"): lambda: [FadeIn(j, scale=0.5), *h.aller(-3)]}, rt=0.2)
        et = bonus(0.2).move_to(P(d.x(-3) - 0.25, 0.68))
        tag = Fr("+7", 32, POS, audit=False).next_to(et, RIGHT, buff=0.1)
        tag[0].set_color(POS)
        l = lr("Ajouter 7, c'est avancer de 7 vers la droite.", 0, 2.42, 38, maxw=12)
        self.poser_avec(l, "Ajouter 7, c'est avancer de 7 vers la droite.", {ix(l, "7"): lambda: [GrowFromCenter(et), FadeIn(tag, scale=1.3)]}, rt=0.2)
        marche = {"u": -3}

        def pas():
            u = marche["u"]
            marche["u"] = u + 1
            return [*self.bond(d, j, u, u + 1), h.barre_a(u + 1)]

        def pas_1():
            return [FadeOut(et), FadeOut(tag), *pas()]

        l = lr("3 pas pour arriver à 0.", -0.3, -1.25, 36)
        self.poser_avec(l, "3 pas pour arriver à zéro.", {0: pas_1, ix(l, "pour"): pas, ix(l, "arriver"): pas, ix(l, "0"): lambda: h.ecrit("0", WHITE)}, rt=0.3)
        l = lr("Encore 4 pas : on arrive à 4.", -0.3, -1.82, 36)
        self.poser_avec(l, "Encore 4 pas : on arrive à 4.", {ix(l, "Encore"): pas, ix(l, "4"): pas, ix(l, "pas"): pas, ix(l, "arrive"): pas, ix(l, "4", 2): lambda: h.ecrit("4", POS)}, rt=0.3)
        e = F("(−3) + 7 = 4", 56).move_to(P(-0.3, -2.8))
        self.dire_eq(e, "Moins 3 plus 7 égale 4.")
        self.play(Create(self.cadre_ok(e, 0.14)), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : signes contraires ──────────────────────────────────────────────
    def ecran_contraires(self):
        self.ecran("03-contraires")
        c = F("(−3) + 7", 60).sans_audit().move_to(P(0, 3.15))
        d = Droite(-4, 8, -5.0, 4.9, -2.05, fs=34)
        y = -1.55
        self.play(FadeIn(c), FadeIn(d), run_time=0.2)
        self.dit(lr("Regarde les deux nombres.", -3.35, 2.25, 36, CIEL, maxw=5.9), "Regarde les deux nombres.")
        s1, s2 = signe("−").move_to(P(-4.2, -0.3)), signe("+").move_to(P(-2.5, -0.3))
        double = DoubleArrow(P(-3.8, -0.3), P(-2.9, -0.3), color=WHITE, buff=0, stroke_width=4, tip_length=0.14)
        self.dit(lr("−3 et 7 ont des signes", -3.35, 1.7, 36, maxw=5.9), "Moins 3 et 7 ont des signes")
        l = lr("contraires :", -3.35, 1.2, 36, maxw=5.9)
        self.poser_avec(l, "contraires :", {ix(l, "contraires"): lambda: [FadeIn(s1, scale=1.3), FadeIn(s2, scale=1.3), GrowFromCenter(double)]}, rt=0.2)
        neg = self.segment(d, 0, -3, y, NEG).set_z_index(1)
        pos = self.segment(d, 0, 7, y, POS)
        l = lr("ils se compensent.", -3.35, 0.55, 36, JAUNE_TITRE, maxw=5.9)
        self.poser_avec(l, "ils se compensent.", {ix(l, "compensent"): lambda: [Create(neg), Create(pos)]}, rt=0.3)
        self.dit(lr("On soustrait les distances", 3.35, 2.3, 34, CIEL, maxw=5.9), "On soustrait les distances")
        self.dit(lr("à zéro :", 3.35, 1.8, 34, CIEL, maxw=5.9), "à zéro :")
        lab7 = F("7", 34, POS, audit=False).move_to(P(d.x(3.5), y + 0.36))
        lab3 = F("3", 34, NEG, audit=False).move_to(P(d.x(1.5), y + 0.36))
        lab4 = F("4", 40, VERT_OK, audit=False).move_to(P(d.x(5), y + 0.42))
        reste = self.segment(d, 3, 7, y, VERT_OK, 14).set_z_index(1)
        e = F("7 − 3 = 4", 56).move_to(P(3.35, 1.08))

        def compense():
            return [FadeIn(lab3), neg.animate.move_to(P(d.x(1.5), y)), lab7.animate.set_opacity(0.0)]

        self.poser_avec(e, "7 moins 3, 4.", {ix(e, "7"): lambda: [FadeIn(lab7, scale=1.3)], ix(e, "3"): compense,
                                               ix(e, "4"): lambda: [Create(reste), FadeIn(lab4, scale=1.4)]}, rt=0.45)
        e.atomes[-1].set_color(VERT_OK)
        self.dit(lr("Et on garde le signe", 3.35, 0.38, 34, maxw=5.9), "Et on garde le signe")
        self.dit(lr("du plus éloigné de zéro :", 3.35, -0.12, 34, maxw=5.9), "du plus éloigné de zéro :")
        l7 = F("7", 34, POS, audit=False).move_to(P(d.x(7) + 0.02, y + 0.36))
        jeton = signe("+", 0.28, 40).move_to(P(5.75, -0.65))
        l = lr("ici 7, qui est positif.", 2.95, -0.65, 34, VERT_OK, maxw=4.3)
        self.poser_avec(l, "ici 7, qui est positif.", {ix(l, "7"): lambda: [FadeIn(l7, scale=1.3), Indicate(pos, color=POS, scale_factor=1.0)],
                                                         ix(l, "positif"): lambda: [FadeIn(jeton, scale=1.4)]}, rt=0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.2
        e = EcranJeu(w=5.6, h=3.9, centre=P(-3.45, 0.05))
        j = e.sur_sol(joueur(1.15), -0.7)
        et = e.sur_sol(bonus(0.32), 0.35, haut=0.9)
        tag = Fr("+5", 34, POS, audit=False).next_to(et, RIGHT, buff=0.1)
        tag[0].set_color(POS)

        def avant(sc):
            sc.eq_dans_q(0, "Que vaut (−8) + 5 ?", "Que vaut moins 8 plus 5 ?")
            e.jauge.barre.become(e.jauge.jauge_a(-8))
            e.jauge.ecrit("−8", NEG)
            sc.play(FadeIn(e), FadeIn(e.jauge.val), FadeIn(j), FadeIn(et), FadeIn(tag), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : −3.", "Réponse B : moins 3.", premier=True)
            sc.play(FadeOut(et), FadeOut(tag), j.animate.move_to(e.sur_sol(j.copy(), 0.35).get_center()), *e.jauge.aller(-3), run_time=0.25)
            sc.ph_eq(1, "Signes contraires : 8 − 5 = 3.", "Signes contraires : 8 moins 5, 3.")
            sc.ph_eq(2, "Et −8 est le plus éloigné", "Et moins 8 est le plus éloigné")
            sc.ph_eq(3, "de zéro, donc le résultat", "de zéro, donc le résultat")
            sc.ph_eq(4, "est négatif.", "est négatif.")
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Que vaut (−8) + 5 ?"],
                            [E("−13", 40, lettres=""), E("−3", 40, lettres=""), E("3", 40, lettres="")], 1,
                            ["Réponse B : −3.", "Signes contraires : 8 − 5 = 3.", "Et −8 est le plus éloigné", "de zéro, donc le résultat", "est négatif."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : deux pièges de suite ───────────────────────────────────────────
    def ecran_pieges(self):
        self.ecran("04-pieges")
        d = Droite(-10, 0, -5.2, 5.0, -0.55, fs=34)
        h = Jauge(w=8.0, centre=P(0, 1.08))
        j = self.poser_j(d, joueur(1.15), 0)
        self.play(FadeIn(d), FadeIn(h), run_time=0.25)
        l = self.lg("Nouvelle partie, on repart de zéro.", 0, 3.1, 40, JAUNE_TITRE, maxw=12)
        self.poser_avec(l, "Nouvelle partie, on repart de zéro.", {ix(l, "zéro"): lambda: [FadeIn(j, scale=0.5), *h.aller(0)]}, rt=0.2)
        p5 = piege(3, 0.34).next_to(P(d.x(-5), d.yy + 0.03), UP, buff=0.0)
        p4 = piege(3, 0.34).next_to(P(d.x(-9), d.yy + 0.03), UP, buff=0.0)
        l = self.lg("Le joueur tombe dans deux pièges de suite :", 0, 2.46, 36, maxw=12)
        self.poser_avec(l, "Le joueur tombe dans deux pièges de suite :", {ix(l, "pièges"): lambda: [FadeIn(p5, shift=UP * 0.15), FadeIn(p4, shift=UP * 0.15)]}, rt=0.2)
        t5 = Fr("−5", 32, audit=False).next_to(p5, UP, buff=0.5)
        t4 = Fr("−4", 32, audit=False).next_to(p4, UP, buff=0.5)
        l = lr("−5 points, puis −4 points.", 0, 1.82, 38, maxw=12)
        self.poser_avec(l, "moins 5 points, puis moins 4 points.", {ix(l, "5"): lambda: [FadeIn(t5, scale=1.3)], ix(l, "4"): lambda: [FadeIn(t4, scale=1.3)]}, rt=0.2)
        e = Fr("(−5) + (−4) = −9", 52).move_to(P(-0.5, -2.62))
        gauche = e.atomes[:e.atomes.index(e.egal)]
        droite = e.atomes[e.atomes.index(e.egal):]
        self.dire_eq(e, "Moins 5 plus moins 4.", sauf=droite)
        l = lr("On recule de 5, puis encore de 4 :", -0.5, -1.7, 38, CIEL, maxw=10)

        def bond1():
            return [*self.bond(d, j, 0, -5, NEG, 0.8), *h.aller(-5)]

        def bond2():
            return [*self.bond(d, j, -5, -9, NEG, 0.8), h.barre_a(-9)]

        self.poser_avec(l, "On recule de 5, puis encore de 4 :", {ix(l, "recule"): bond1, ix(l, "encore"): bond2}, rt=0.46)
        self.dire_eq(e, "moins 9.", sauf=gauche)
        for a in droite[1:]:
            a.set_color(VERT_OK)
        self.play(Create(self.cadre_ok(e, 0.14)), *h.ecrit("−9", NEG), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 05 : même signe, bout à bout ────────────────────────────────────────
    def ecran_meme_signe(self):
        self.ecran("05-meme-signe")
        d = Droite(-10, 0, -5.2, 5.0, 0.0, fs=34)
        y = 0.55
        s5 = self.segment(d, 0, -5, y, NEG, 14)
        s4 = self.segment(d, 0, -4, y, "#fdba74", 14).shift(LEFT * 0.0)
        s4.move_to(P(d.x(-7) - 0.55, y + 0.75))
        self.play(FadeIn(d), run_time=0.2)
        self.dit(self.lg("Deux nombres de même signe", 0, 3.2, 42, JAUNE_TITRE, maxw=12), "Deux nombres de même signe", avec=[Create(s5), Create(s4)])
        l = self.lg("se mettent bout à bout.", 0, 2.6, 42, JAUNE_TITRE, maxw=12)
        self.poser_avec(l, "se mettent bout à bout.", {ix(l, "bout"): lambda: [s4.animate.move_to(P(d.x(-7), y))]}, rt=0.3)
        self.dit(lr("On additionne les distances", -3.3, -1.0, 34, CIEL, maxw=6.1), "On additionne les distances")
        self.dit(lr("à zéro :", -3.3, -1.48, 34, CIEL, maxw=6.1), "à zéro :")
        lab5 = F("5", 34, NEG, audit=False).move_to(P(d.x(-2.5), y + 0.36))
        lab4 = F("4", 34, "#fdba74", audit=False).move_to(P(d.x(-7), y + 0.36))
        ac = BraceBetweenPoints(P(d.x(-9), y + 0.68), P(d.x(0), y + 0.68), direction=UP, color=VERT_OK)
        lab9 = F("9", 36, VERT_OK, audit=False).next_to(ac, UP, buff=0.06)
        e = F("5 + 4 = 9", 58).move_to(P(-3.3, -2.3))
        self.poser_avec(e, "5 plus 4, 9.", {ix(e, "5"): lambda: [FadeIn(lab5, scale=1.3)], ix(e, "4"): lambda: [FadeIn(lab4, scale=1.3)],
                                                 ix(e, "9"): lambda: [GrowFromCenter(ac), FadeIn(lab9, scale=1.3)]}, rt=0.22)
        j1, j2 = signe("−").move_to(P(1.7, -2.05)), signe("−").move_to(P(2.55, -2.05))
        l = lr("Et on garde leur signe :", 3.1, -1.0, 34, CIEL, maxw=6.0)
        self.poser_avec(l, "Et on garde leur signe :", {ix(l, "signe"): lambda: [FadeIn(j1, scale=1.3), FadeIn(j2, scale=1.3)]}, rt=0.2)
        r = Fr("−9", 72).move_to(P(4.1, -2.05))
        self.dire_eq(r, "moins 9.")
        for a in r.atomes:
            a.set_color(VERT_OK)
        self.play(Create(self.cadre_ok(r, 0.14)), run_time=0.2)
        self.insister(r, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        c1 = RoundedRectangle(width=6.0, height=2.5, corner_radius=0.14, stroke_color=PIEGE, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.3, 0.78))
        fx = Fr("(−5) + (−4) = +9", 42, audit=False).move_to(P(-3.3, 1.2))
        l = lr("Le piège : dire +9,", 0, 3.12, 46, PIEGE, maxw=11.5)
        self.poser_avec(l, "Le piège : dire plus 9,", {ix(l, "9"): lambda: [FadeIn(c1), FadeIn(fx)]}, rt=0.2)
        self.dit(self.lg("parce que moins et moins, ça ferait plus.", 0, 2.5, 36, maxw=11.5), "parce que moins et moins, ça ferait plus.")
        barre = self.barrer(VGroup(*fx.atomes[-2:]), sw=7)
        non = T("Non !", 54, PIEGE, gras=True).move_to(P(-3.3, 0.22))
        self.au("Non !", Create(barre), FadeIn(non, scale=1.5), rt=0.3)
        c2 = RoundedRectangle(width=6.0, height=2.5, corner_radius=0.14, stroke_color=NEG, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(3.3, 0.78))
        t = TableSignes(cote=0.72, centre=P(1.55, 0.78)).remplie()
        l = self.lg("Cette règle-là,", 4.5, 1.25, 32, maxw=3.1)
        self.dit(l, "Cette règle-là,", avec=[FadeIn(c2), FadeIn(t)])
        self.dit(self.lg("c'est pour", 4.5, 0.75, 32, maxw=3.1), "c'est pour")
        self.dit(self.lg("multiplier.", 4.5, 0.25, 38, JAUNE_TITRE, maxw=3.1), "multiplier.")
        u = 0.6
        a = Line(P(-5.0, -2.25), P(-5.0 + 5 * u, -2.25), color=NEG, stroke_width=16)
        b = Line(P(-1.4, -2.25), P(-1.4 + 4 * u, -2.25), color="#fdba74", stroke_width=16)
        l = self.lg("Ici, deux pertes font une plus grosse perte.", -0.4, -1.28, 40, CIEL, maxw=11)
        self.poser_avec(l, "Ici, deux pertes font une plus grosse perte.", {ix(l, "pertes"): lambda: [Create(a), Create(b)],
                                                                             ix(l, "grosse"): lambda: [b.animate.move_to(P(-5.0 + 5 * u + 2 * u, -2.25))]}, rt=0.26)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.2
        e = EcranJeu(w=5.6, h=3.9, borne=15, centre=P(-3.45, 0.05))
        j = e.sur_sol(joueur(1.15), -0.75)
        p1, p2 = e.sur_sol(piege(3, 0.42), -0.15), e.sur_sol(piege(3, 0.42), 0.5)
        t1 = Fr("−6", 34, audit=False).next_to(p1, UP, buff=0.12)
        t2 = Fr("−7", 34, audit=False).next_to(p2, UP, buff=0.12)

        def avant(sc):
            sc.eq_dans_q(0, "Que vaut (−6) + (−7) ?", "Que vaut moins 6 plus moins 7 ?")
            sc.play(FadeIn(e), FadeIn(j), FadeIn(p1), FadeIn(p2), FadeIn(t1), FadeIn(t2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : −13.", "Réponse C : moins 13.", premier=True)
            sc.play(j.animate.move_to(e.sur_sol(j.copy(), 0.85).get_center()), *e.jauge.aller(-13), run_time=0.25)
            sc.ph_eq(1, "Même signe : 6 + 7 = 13,", "Même signe : 6 plus 7, 13,")
            sc.ph_eq(2, "et on garde le signe moins.", "et on garde le signe moins.")
            sc.ph_eq(3, "Le 13 positif, c'est le piège.", "Le 13 positif, c'est le piège.", couleur=PIEGE)
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["Que vaut (−6) + (−7) ?"],
                            [E("13", 40, lettres=""), E("−1", 40, lettres=""), E("−13", 40, lettres="")], 2,
                            ["Réponse C : −13.", "Même signe : 6 + 7 = 13,", "et on garde le signe moins.", "Le 13 positif, c'est le piège."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : deux opposés ───────────────────────────────────────────────────
    def ecran_opposes(self):
        self.ecran("07-opposes")
        d = Droite(-7, 7, -5.9, 5.9, -0.25, fs=30)
        h = Jauge(w=8.0, centre=P(0, 1.3))
        j = self.poser_j(d, joueur(1.15), -6)
        self.play(FadeIn(d), FadeIn(h), run_time=0.2)
        e = Fr("Un cas à part : (−6) + 6.", 46, JAUNE_TITRE).move_to(P(0, 3.12))
        e.atomes[-2].set_color(WHITE)
        self.dire_eq(e, "Un cas à part : moins 6 plus 6.", echelle=1.0, rt=0.14)
        ng = self.segment(d, 0, -6, d.yy + 0.0, NEG, 8)
        ps = self.segment(d, 0, 6, d.yy + 0.0, POS, 8)
        l = self.lg("Ce sont deux nombres opposés.", 0, 2.42, 40, maxw=11)
        self.poser_avec(l, "Ce sont deux nombres opposés.", {ix(l, "opposés"): lambda: [Create(ng), Create(ps)]}, rt=0.3)
        pi = piege(3, 0.3).next_to(P(d.x(-6) - 0.72, d.yy + 0.03), UP, buff=0.0)
        l = lr("On part de −6, on avance de 6,", 0, -1.3, 40, maxw=11)

        def avance():
            return [*self.bond(d, j, -6, 0, POS, -0.9), h.barre_a(0)]

        self.poser_avec(l, "On part de moins 6, on avance de 6,", {ix(l, "6"): lambda: [FadeIn(j, scale=0.5), FadeIn(pi), *h.aller(-6)],
                                                                            ix(l, "avance"): avance}, rt=0.4)
        l = self.lg("et on revient à zéro.", 0, -1.95, 40, VERT_OK, maxw=11)
        self.poser_avec(l, "et on revient à zéro.", {ix(l, "zéro"): lambda: [*h.ecrit("0", WHITE), Flash(j, color=VERT_OK, line_length=0.2)]}, rt=0.25)
        l = self.lg("Le bonus annule exactement le piège.", -0.4, -2.75, 40, JAUNE_TITRE, maxw=10.5)
        et = bonus(0.24).move_to(P(d.x(-3), 0.72))
        self.poser_avec(l, "Le bonus annule exactement le piège.", {ix(l, "bonus"): lambda: [GrowFromCenter(et)],
                                                                     ix(l, "piège"): lambda: [Indicate(pi, color=NEG), FadeOut(et)]}, rt=0.25)
        self.attendre_voix(marge=0.8)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au("À toi", Write(tit), rt=0.5)
        self.dit(self.lg("Deux calculs.", 0, 2.15, 38, CIEL, maxw=8), "Deux calculs.")
        c1 = RoundedRectangle(width=6.0, height=1.8, corner_radius=0.14, stroke_color=NEG, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.3, 0.5))
        c2 = RoundedRectangle(width=6.0, height=1.8, corner_radius=0.14, stroke_color=NEG, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(3.3, 0.5))
        e1, e2 = F("(−8) + (−2)", 46), F("9 + (−4)", 46)
        q1, q2 = T("= ?", 46, JAUNE_TITRE, audit=False), T("= ?", 46, JAUNE_TITRE, audit=False)
        VGroup(e1, q1).arrange(RIGHT, buff=0.25).move_to(c1)
        VGroup(e2, q2).arrange(RIGHT, buff=0.25).move_to(c2)
        self.dire_eq(e1, "Moins 8 plus moins 2.", echelle=1.1, avec=[FadeIn(c1)])
        self.play(FadeIn(q1), run_time=0.12)
        self.dire_eq(e2, "9 plus moins 4.", echelle=1.1, avec=[FadeIn(c2)])
        self.play(FadeIn(q2), run_time=0.12)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.75))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 08b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("08b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.12))), rt=0.25)
        e1 = F("(−8) + (−2)", 50).sans_audit().move_to(P(-3.3, 2.28))
        e2 = F("9 + (−4)", 50).sans_audit().move_to(P(3.3, 2.28))
        self.au("Moins 8", FadeIn(e1), rt=0.2)
        j = (signe("−", 0.28, 40).move_to(P(-2.45, 1.42)), signe("−", 0.28, 40).move_to(P(-1.8, 1.42)))
        self.dit(lr("même signe,", -4.4, 1.42, 34), "même signe,", avec=[FadeIn(j[0]), FadeIn(j[1])])
        self.dire_eq(F("8 + 2 = 10", 50).move_to(P(-3.3, 0.55)), "8 plus 2, 10,", echelle=1.15)
        self.dit(self.lg("et on garde le signe", -3.3, -0.25, 34, maxw=6.1), "et on garde le signe")
        self.dit(self.lg("moins :", -3.3, -0.75, 34, maxw=6.1), "moins :")
        r1 = Fr("−10", 78).move_to(P(-3.3, -1.85))
        self.dire_eq(r1, "moins 10.", echelle=1.3)
        for a in r1.atomes:
            a.set_color(VERT_OK)
        self.play(Create(self.cadre_ok(r1, 0.16)), run_time=0.15)
        self.au("9 plus moins 4 :", FadeIn(e2), rt=0.2)
        j = (signe("+", 0.28, 40).move_to(P(4.85, 1.42)), signe("−", 0.28, 40).move_to(P(5.5, 1.42)))
        self.dit(lr("signes contraires,", 2.2, 1.42, 34), "signes contraires,", avec=[FadeIn(j[0]), FadeIn(j[1])])
        self.dire_eq(F("9 − 4 = 5", 50).move_to(P(3.3, 0.55)), "9 moins 4, 5,", echelle=1.15)
        self.dit(lr("et 9 est le plus éloigné", 3.0, -0.25, 34, maxw=6.1), "et 9 est le plus éloigné")
        self.dit(lr("de zéro :", 3.0, -0.75, 34, maxw=6.1), "de zéro :")
        r2 = Fr("le résultat est 5.", 42, VERT_OK).move_to(P(2.6, -1.85))
        self.dire_eq(r2, "le résultat est 5.", echelle=1.1)
        self.play(Create(self.cadre_ok(r2, 0.16)), run_time=0.15)
        self.attendre_voix(marge=1.0)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        self.XL = -1.5
        e = EcranJeu(w=4.4, h=3.5, reserve=0.3)
        fig = VGroup(e, e.sur_sol(joueur(1.1), -0.7), e.sur_sol(bonus(0.3), 0.55, haut=0.8), e.sur_sol(piege(3, 0.4), -0.05))
        lignes = self.finale_colonne([["Même signe : on additionne", "les distances à zéro", "et on garde le signe."],
                                      ["Signes contraires : on les", "soustrait et on garde le signe", "du plus éloigné de zéro."],
                                      ["Deux opposés font zéro."]], fs=38, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_jeu()
        self.ecran_droite()
        self.ecran_contraires()
        self.ecran_question1()
        self.ecran_pieges()
        self.ecran_meme_signe()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_opposes()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
