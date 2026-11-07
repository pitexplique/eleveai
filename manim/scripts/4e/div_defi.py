# div_defi.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers », épisode 07 : DÉFIS DE DIVISIBILITÉ.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : div_defi.
# Décor et métier : Chloé, créatrice d'escape games (des cadenas à code). Centres : jeux-defis.
# Écrans : garde (00) ; le cadenas de Chloé (01) ; la somme des chiffres (02) ; QUESTION 1 (02q) ;
# deux indices (03) ; vrai ou faux (04) ; QUESTION 2 (04q) ; le piège (05) ; défi (06) et
# correction (06b) ; ce que tu as appris (07) ; fin (08).
# Code couleur : le chiffre caché orange ; le cadenas s'ouvre (anse verte) quand le code est trouvé.
# Voix : manim/voix/4e-div-defi.json ; marques : div_defi_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/div_defi.py DivDefi4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/div_defi.py DivDefi4e -o eleveai-maths-4e-div-defi --media_dir manim/scripts/4e/media-div-07
# Sortie : manim/sorties/4e/maths/divisibilite/07-defi/eleveai-maths-4e-div-defi.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from div_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402

PAROLE["0"] = "0"        # la voix écrit « 0 » en chiffre (« 5 plus 0 »)
PAROLE["?"] = "chiffre"  # « 4 ? 5 » se lit « 4, chiffre caché, 5 » : le « ? » sur « chiffre »

CACHE = ORANGE_RETENUE   # le chiffre caché
METAL = "#94a3b8"
LAITON = "#d4a017"
ROUE = "#111827"


def chloe_escape(s=0.72):
    """Chloé : le sweat violet et la grosse clé dorée des escape games."""
    p = personne(peau="#f1c27d", tenue="#7c3aed", cheveux="#92400e", longs=True, s=s)
    anneau = Annulus(inner_radius=0.09 * s, outer_radius=0.17 * s, fill_color=LAITON, fill_opacity=1, stroke_width=0)
    tige = Rectangle(width=0.5 * s, height=0.07 * s, fill_color=LAITON, fill_opacity=1, stroke_width=0)
    dents = VGroup(*[Rectangle(width=0.06 * s, height=0.11 * s, fill_color=LAITON, fill_opacity=1, stroke_width=0)
                     for _ in range(2)])
    tige.next_to(anneau, RIGHT, buff=-0.02)
    dents[0].next_to(tige, DOWN, buff=0).align_to(tige, RIGHT)
    dents[1].next_to(tige, DOWN, buff=0).align_to(tige, RIGHT).shift(LEFT * 0.12 * s)
    cle = VGroup(anneau, tige, dents).rotate(0.5).next_to(p.corps, RIGHT, buff=0.02).shift(UP * 0.12 * s)
    return VGroup(p, cle)


class Cadenas(VGroup):
    """Un cadenas à code : le corps, l'anse, n roues (vides : les chiffres se posent au mot)."""

    def __init__(self, n=3, w=3.0, centre=ORIGIN, **kw):
        super().__init__(**kw)
        h = 0.62 * w
        self.corps = RoundedRectangle(width=w, height=h, corner_radius=0.18 * w / 3, fill_color="#334155",
                                      fill_opacity=1, stroke_color=METAL, stroke_width=5)
        self.anse = Arc(radius=0.3 * w, start_angle=0, angle=PI, color=METAL, stroke_width=16)
        self.anse.next_to(self.corps, UP, buff=-0.02)
        self.pieds = VGroup(*[Line(self.anse.get_start(), self.anse.get_start() + DOWN * 0.15 * w, color=METAL, stroke_width=16),
                              Line(self.anse.get_end(), self.anse.get_end() + DOWN * 0.15 * w, color=METAL, stroke_width=16)])
        self.pieds.shift(DOWN * 0.02)
        lr, hr = 0.24 * w, 0.36 * w
        self.roues = VGroup(*[RoundedRectangle(width=lr, height=hr, corner_radius=0.05, fill_color=ROUE, fill_opacity=1,
                                               stroke_color=LAITON, stroke_width=3) for _ in range(n)])
        self.roues.arrange(RIGHT, buff=0.06 * w).move_to(self.corps.get_center())
        self.fs = int(round(hr * 120))
        self.add(self.anse, self.pieds, self.corps, self.roues)
        self.move_to(centre)
        self.chiffres = [None] * n

    def chiffre(self, i, s, c=WHITE, audit=True):
        """Le Text du chiffre de la roue i (créé, placé, PAS ajouté)."""
        t = T(s, 100, c, audit=audit, gras=True)
        t.scale(0.5 * self.roues[i].height / Text("8", font_size=100, weight=BOLD).height)
        return t.move_to(self.roues[i])

    def ouvrir(self):
        """L'anse se lève et passe au vert."""
        a = VGroup(self.anse, self.pieds)
        return [a.animate.shift(UP * 0.35 * self.corps.width / 3).set_color(VERT_OK),
                self.corps.animate.set_stroke(VERT_OK, width=6)]


def jauge(n, pleins, w=4.2, h=0.42, par_ligne=9, centre=ORIGIN):
    """n cases (rangées de par_ligne), les `pleins` premières bleu ciel, les autres vides."""
    lc = w / par_ligne
    g = VGroup()
    for k in range(n):
        i, j = divmod(k, par_ligne)
        c = Square(side_length=lc * 0.86, stroke_color=CIEL, stroke_width=3,
                   fill_color=CIEL if k < pleins else "#0b1220", fill_opacity=0.85 if k < pleins else 1)
        c.move_to(P((j - (par_ligne - 1) / 2) * lc, -i * (h + 0.08)))
        g.add(c)
    return g.move_to(centre)


def marque(ok, fs=46):
    return T("✓" if ok else "✗", fs, VERT_OK if ok else PIEGE, audit=False, gras=True)


class DivDefi4e(PaysageDiv):
    nom_voix = "4e-div-defi"
    fichier_marques = "div_defi_marques.json"
    ceinture = "verte"

    def poser_code(self, cad, chiffres, mots):
        """Les chiffres des roues, chacun à son mot : mots = [(extrait, n)] ; « ? » en orange."""
        ts = []
        for i, (s, (m, n)) in enumerate(zip(chiffres, mots)):
            t = cad.chiffre(i, s, CACHE if s == "?" else WHITE)
            if s == "?":
                t._pas_audit = True
            self.au(m, FadeIn(t, scale=1.4), n=n, rt=0.25)
            ts.append(t)
        return ts

    def trouver(self, cad, ancien, s):
        """Les animations : le « ? » devient le chiffre trouvé (orange) et le cadenas s'ouvre."""
        t = cad.chiffre(1, s, CACHE, audit=False)  # le chiffre est déjà écrit dans la ligne qui le dit
        return [FadeOut(ancien, scale=0.5), FadeIn(t, scale=1.5), *cad.ouvrir()]

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis de divisibilité", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Défis", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        cad = Cadenas(3, 2.6, centre=P(-4.3, 0.05))
        qs = VGroup(*[cad.chiffre(i, "?", CACHE, audit=False) for i in range(3)])
        l1 = self.lg("Peux-tu ouvrir", 1.6, 0.75, 46, maxw=8)
        self.dit(l1, "Peux-tu ouvrir", avec=[FadeIn(cad, shift=DOWN * 0.3), FadeIn(qs, scale=1.3)])
        l2 = self.lg("le cadenas ?", 1.6, -0.1, 54, JAUNE_TITRE, maxw=8)
        self.dit(l2, "le cadenas ?")
        self.insister(l2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : le cadenas de Chloé ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = chloe_escape(1.05).move_to(P(-5.15, 2.2))
        cad = Cadenas(3, 3.0, centre=P(-3.7, -1.0))
        self.dit(self.lg("Chloé crée des escape games.", 3.0, 3.0, 40, CIEL, maxw=6.6), "Chloé crée des escape games.",
                 avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("Dans sa salle, un cadenas", 3.0, 2.2, 36), "Dans sa salle, un cadenas",
                 avec=[FadeIn(cad, shift=DOWN * 0.3)])
        self.dit(self.lg("attend un code :", 3.0, 1.6, 36), "attend un code :")
        self.poser_code(cad, ["2", "?", "6"], [("2", 1), ("chiffre", 1), ("6", 1)])
        self.dit(self.lg("L'indice : le code est", 3.0, 0.5, 36), "L'indice : le code est")
        ind = self.lg("divisible par 9.", 3.0, -0.25, 50, JAUNE_TITRE)
        self.dit(ind, "divisible par 9.")
        self.insister(ind, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : la somme des chiffres ──────────────────────────────────────────
    def ecran_somme(self):
        self.ecran("02-somme")
        cad = Cadenas(3, 3.0, centre=P(-4.1, -0.4))
        a = cad.chiffre(0, "2", audit=False)
        q = cad.chiffre(1, "?", CACHE, audit=False)
        b = cad.chiffre(2, "6", audit=False)
        self.play(FadeIn(cad), FadeIn(a), FadeIn(q), FadeIn(b), run_time=0.3)
        self.dit(self.lg("Divisible par 9 :", -4.1, 3.15, 42, JAUNE_TITRE, maxw=4.6), "Divisible par 9 :")
        self.dit(self.lg("la somme des chiffres doit l'être.", 2.4, 3.15, 38, maxw=7.4), "la somme des chiffres doit l'être.")
        xc = 2.4
        e = F("2 + 6 = 8", 66).move_to(P(xc, 1.85))
        e.atomes[-1].set_color(CIEL)
        self.dire_eq(e, "2 plus 6 égale 8.", echelle=1.2)
        j = jauge(9, 8, w=4.6, centre=P(xc, 0.75))
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in j], lag_ratio=0.06), run_time=0.5)
        self.dit(self.lg("Il manque 1 pour arriver à 9.", xc, -0.3, 38, maxw=6.6), "Il manque 1 pour arriver à 9.",
                 avec=[j[-1].animate.set_fill(CACHE, 0.9).set_stroke(CACHE)])
        self.dit(self.lg("Le chiffre caché est 1 :", xc, -1.35, 40, CACHE, maxw=6.4), "Le chiffre caché est 1 :",
                 avec=self.trouver(cad, q, "1"))
        fin = self.lg("le code est 216.", xc, -2.15, 46, VERT_OK, maxw=6.4)
        self.dit(fin, "le code est 216.")
        self.play(Create(self.cadre_ok(fin, 0.14)), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 02q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        cad = Cadenas(3, 3.0, centre=P(-3.4, 0.0))
        etat = {}

        def avant(sc):
            sc.eq_dans_q(0, "Le code 4 ? 5", "Le code 4, chiffre caché, 5", lettres="")
            sc.eq_dans_q(0, "est divisible par 3.", "est divisible par 3.", lettres="")
            a, q, b = cad.chiffre(0, "4", audit=False), cad.chiffre(1, "?", CACHE, audit=False), cad.chiffre(2, "5", audit=False)
            etat["q"] = q
            sc.play(FadeIn(cad, shift=DOWN * 0.2), FadeIn(a), FadeIn(q), FadeIn(b), run_time=0.4)

        def apres(sc):
            t = cad.chiffre(1, "3", CACHE, audit=False)
            sc.play(FadeOut(etat["q"], scale=0.5), FadeIn(t, scale=1.5), *cad.ouvrir(), run_time=0.35)
            sc.reponse(("Réponse A : 3.", "Réponse A : 3."),
                       ("4 + 3 + 5 = 12, divisible par 3.", "4 plus 3 plus 5 égale 12, divisible par 3."),
                       ("Avec 2, la somme fait 11 ;", "Avec 2, la somme fait 11 ;"),
                       ("avec 4, 13.", "avec 4, 13."))

        self.question_pause("02q-question", "02r-reponse", ["Le code 4 ? 5", "est divisible par 3.", "Lequel de ces chiffres convient ?"],
                            [E("3", 40, lettres=""), E("2", 40, lettres=""), E("4", 40, lettres="")], 0,
                            ["Réponse A : 3.", "4 + 3 + 5 = 12, divisible par 3.", "Avec 2, la somme fait 11 ;", "avec 4, 13."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 03 : deux indices ───────────────────────────────────────────────────
    def ecran_deux(self):
        self.ecran("03-deux")
        self.dit(self.lg("Deuxième cadenas, deux indices :", 0, 3.25, 40, CIEL, maxw=11), "Deuxième cadenas, deux indices :")
        ind = self.lg("divisible par 5 et par 9.", 0, 2.6, 42, JAUNE_TITRE, maxw=11)
        self.dit(ind, "divisible par 5 et par 9.")
        cad = Cadenas(3, 3.0, centre=P(-4.1, -0.85))
        self.dit(self.lg("Le code :", -4.1, 1.6, 40), "Le code :", avec=[FadeIn(cad, shift=DOWN * 0.3)])
        a, q, b = self.poser_code(cad, ["8", "?", "5"], [("8", 1), ("chiffre", 1), ("5", 2)])
        xc = 2.5
        l1 = self.lg("Il finit par 5 :", xc, 1.5, 38, maxw=6.4)
        self.dit(l1, "Il finit par 5 :", avec=[Circumscribe(b, color=VERT_OK, buff=0.1)])
        l2 = self.lg("divisible par 5, c'est fait.", xc, 0.9, 38, VERT_OK, maxw=6.2)
        self.dit(l2, "divisible par 5, c'est fait.")
        self.play(FadeIn(marque(True, 44).next_to(l2, RIGHT, buff=0.2), scale=1.4), run_time=0.2)
        e = F("Par 9 : 8 + 5 = 13.", 52).move_to(P(xc, 0.0))
        e.atomes[-2].set_color(CIEL)
        self.dire_eq(e, "Par 9 : 8 plus 5 égale 13.", echelle=1.15)
        j = jauge(18, 13, w=4.4, h=0.4, centre=P(xc, -1.15))
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in j], lag_ratio=0.03), run_time=0.5)
        self.dit(self.lg("Pour arriver à 18, il manque 5.", xc, -2.15, 38, maxw=6.6), "Pour arriver à 18, il manque 5.",
                 avec=[LaggedStart(*[c.animate.set_fill(CACHE, 0.9).set_stroke(CACHE) for c in j[13:]], lag_ratio=0.1)])
        fin = self.lg("Le code est 855.", xc, -3.0, 44, VERT_OK, maxw=6.4)
        self.dit(fin, "Le code est 855.", avec=self.trouver(cad, q, "5"))
        self.play(Create(self.cadre_ok(fin, 0.12)), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 04 : vrai ou faux ───────────────────────────────────────────────────
    def ecran_vrai_faux(self):
        self.ecran("04-vrai-faux")
        self.dit(self.lg("Dernière salle : une affirmation.", 0, 3.25, 42, CIEL, maxw=11), "Dernière salle : une affirmation.")
        carte = RoundedRectangle(width=9.6, height=1.7, corner_radius=0.2, fill_color="#3b2f1e", fill_opacity=1,
                                 stroke_color=LAITON, stroke_width=4).move_to(P(0, 1.85))
        g1 = T("«", 60, LAITON, audit=False).move_to(carte.get_left() + RIGHT * 0.45)
        g2 = T("»", 60, LAITON, audit=False).move_to(carte.get_right() + LEFT * 0.45)
        a1 = self.lg("Un nombre qui finit par 9", 0, 2.2, 40, maxw=8.2)
        self.dit(a1, "Un nombre qui finit par 9", avec=[FadeIn(carte), FadeIn(g1), FadeIn(g2)])
        a2 = self.lg("est divisible par 3.", 0, 1.5, 40, maxw=8.2)
        self.dit(a2, "est divisible par 3.")
        vf = self.lg("Vrai ou faux ?", 0, 0.45, 48, JAUNE_TITRE)
        self.dit(vf, "Vrai ou faux ?")
        self.dit(self.lg("Un seul exemple qui ne marche pas suffit :", 0, -0.45, 38, maxw=11.5),
                 "Un seul exemple qui ne marche pas suffit :")
        n19 = F("19.", 88, CIEL).move_to(P(-4.0, -1.75))
        self.dire_eq(n19, "19.", echelle=1.2)
        e = F("1 + 9 = 10,", 52).move_to(P(1.4, -1.45))
        self.dire_eq(e, "1 plus 9 égale 10,", echelle=1.15)
        pas = self.lg("pas divisible par 3.", 1.4, -2.2, 40, PIEGE, maxw=7)
        self.dit(pas, "pas divisible par 3.")
        faux = T("Faux !", 64, PIEGE, gras=True).move_to(P(-4.0, -2.85))
        barre = self.barrer(VGroup(a1, a2))
        self.au("Faux", FadeIn(faux, scale=1.4), Create(barre), carte.animate.set_stroke(PIEGE, width=5), rt=0.35)
        self.insister(faux, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        cad = Cadenas(3, 3.0, centre=P(-3.4, 0.0))
        qs = VGroup(*[cad.chiffre(i, "?", CACHE, audit=False) for i in range(3)])

        def avant(sc):
            sc.eq_dans_q(0, "Tout multiple de 9", "Tout multiple de 9", lettres="")
            sc.eq_dans_q(0, "est un multiple de 3.", "est un multiple de 3.", lettres="")
            sc.play(FadeIn(cad, shift=DOWN * 0.2), FadeIn(qs), run_time=0.4)

        def apres(sc):
            sc.play(*cad.ouvrir(), run_time=0.3)
            sc.reponse(("Réponse A : vrai. 9 = 3 × 3.", "Réponse A : vrai. 9 égale 3 fois 3."),
                       ("Donc un multiple de 9", "Donc un multiple de 9"),
                       ("est aussi un multiple de 3.", "est aussi un multiple de 3."))

        self.question_pause("04q-question", "04r-reponse", ["Tout multiple de 9", "est un multiple de 3."],
                            [E("vrai", 40, lettres=""), E("faux", 40, lettres=""), E("seulement s'il est pair", 36, lettres="")], 0,
                            ["Réponse A : vrai. 9 = 3 × 3.", "Donc un multiple de 9", "est aussi un multiple de 3."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.dit(self.lg("Le piège : prouver avec des exemples.", 0, 3.2, 42, PIEGE, maxw=11.5),
                 "Le piège : prouver avec des exemples.")
        xs = [-4.6, -2.3, 0.0]
        cartes = []
        for (s, n), x in zip([("9", 1), ("39", 1), ("69", 1)], xs):
            c = RoundedRectangle(width=1.8, height=1.3, corner_radius=0.14, stroke_color=VERT_OK, stroke_width=4,
                                 fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x, 1.75))
            t = T(s, 60, WHITE, gras=True).move_to(c)
            self.au(s, FadeIn(c), FadeIn(t, scale=1.4), n=n, rt=0.25)
            cartes.append(VGroup(c, t))
        self.dit(self.lg("finissent par 9", 4.2, 2.1, 38), "finissent par 9")
        l2 = self.lg("et sont divisibles par 3.", 1.5, 0.0, 38, VERT_OK, maxw=10)
        oks = [marque(True, 40).next_to(c, DOWN, buff=0.12) for c in cartes]
        self.dit(l2, "et sont divisibles par 3.", avec=[LaggedStart(*[FadeIn(o, scale=1.4) for o in oks], lag_ratio=0.2)])
        rien = self.lg("Ça ne prouve rien :", -2.6, -0.85, 44, PIEGE)
        self.dit(rien, "Ça ne prouve rien :")
        self.insister(rien, 1.12, 0.2)
        self.dit(self.lg("un seul contre-exemple, comme 19,", 1.4, -1.7, 38, maxw=8.4), "un seul contre-exemple, comme 19,")
        c19 = RoundedRectangle(width=1.8, height=1.3, corner_radius=0.14, stroke_color=PIEGE, stroke_width=5,
                               fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-4.6, -2.4))
        t19 = T("19", 60, PIEGE, gras=True, audit=False).move_to(c19)
        x19 = marque(False, 50).next_to(c19, RIGHT, buff=0.15)
        self.play(FadeIn(c19), FadeIn(t19, scale=1.4), FadeIn(x19, scale=1.5), run_time=0.3)
        fin = self.lg("suffit à dire faux.", 1.4, -2.55, 44, JAUNE_TITRE, maxw=7)
        self.dit(fin, "suffit à dire faux.")
        self.insister(fin, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au("À toi", Write(tit), rt=0.5)
        p = chloe_escape(1.05).move_to(P(-5.3, 1.0))
        cad = Cadenas(3, 2.6, centre=P(-2.55, 0.6))
        self.dit(self.lg("Dernier cadenas :", 3.0, 2.0, 40), "Dernier cadenas :", avec=[FadeIn(p), FadeIn(cad, shift=DOWN * 0.3)])
        self.poser_code(cad, ["5", "?", "0"], [("5", 1), ("chiffre", 1), ("0", 1)])
        self.dit(self.lg("Le code est divisible", 3.0, 1.3, 38), "Le code est divisible")
        self.dit(self.lg("par 9 et par 10.", 3.0, 0.7, 44, CIEL), "par 9 et par 10.")
        q = self.lg("Quel est le chiffre caché ?", 3.0, -0.3, 42, JAUNE_TITRE, maxw=6.4)
        self.dit(q, "Quel est le chiffre caché ?")
        self.insister(q, 1.1, 0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -2.0))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.25))), rt=0.25)
        cad = Cadenas(3, 3.0, centre=P(-4.1, -0.3))
        a = cad.chiffre(0, "5", audit=False)
        q = cad.chiffre(1, "?", CACHE, audit=False)
        b = cad.chiffre(2, "0", audit=False)
        self.play(FadeIn(cad), FadeIn(a), FadeIn(q), FadeIn(b), run_time=0.3)
        xc = 2.5
        self.dit(self.lg("Il finit par 0 :", xc, 2.35, 38, maxw=6.4), "Il finit par 0 :", avec=[Circumscribe(b, color=VERT_OK, buff=0.1)])
        l2 = self.lg("divisible par 10, c'est fait.", xc, 1.75, 38, VERT_OK, maxw=6.2)
        self.dit(l2, "divisible par 10, c'est fait.")
        self.play(FadeIn(marque(True, 44).next_to(l2, RIGHT, buff=0.2), scale=1.4), run_time=0.2)
        e = F("Par 9 : 5 + 0 = 5.", 52).move_to(P(xc, 0.85))
        e.atomes[-2].set_color(CIEL)
        self.dire_eq(e, "Par 9 : 5 plus 0 égale 5.", echelle=1.15)
        j = jauge(9, 5, w=4.6, centre=P(xc, -0.2))
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in j], lag_ratio=0.06), run_time=0.5)
        self.dit(self.lg("Pour arriver à 9, il manque 4.", xc, -1.2, 38, maxw=6.8), "Pour arriver à 9, il manque 4.",
                 avec=[LaggedStart(*[c.animate.set_fill(CACHE, 0.9).set_stroke(CACHE) for c in j[5:]], lag_ratio=0.1)])
        fin = self.lg("Le code est 540.", xc, -2.2, 48, VERT_OK, maxw=6.4)
        self.dit(fin, "Le code est 540.", avec=self.trouver(cad, q, "4"))
        self.play(Create(self.cadre_ok(fin, 0.14)), run_time=0.25)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        self.XL = -1.5
        cad = Cadenas(3, 2.4)
        ch = VGroup(cad.chiffre(0, "2", audit=False), cad.chiffre(1, "1", CACHE, audit=False), cad.chiffre(2, "6", audit=False))
        VGroup(cad.anse, cad.pieds).shift(UP * 0.28).set_color(VERT_OK)
        cad.corps.set_stroke(VERT_OK, width=6)
        fig = VGroup(cad, ch)
        lignes = self.finale_colonne([["Un chiffre caché se trouve", "avec la somme des chiffres."],
                                      ["Divisible par 9,", "c'est divisible par 3."],
                                      ["Un seul contre-exemple", "suffit pour dire faux."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_somme()
        self.ecran_question1()
        self.ecran_deux()
        self.ecran_vrai_faux()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
