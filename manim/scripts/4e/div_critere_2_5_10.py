# div_critere_2_5_10.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers », épisode 02 : CRITÈRES DE
# DIVISIBILITÉ PAR 2, 5 ET 10. Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : div_critere_2_5_10.
# Décor et métier : Hugo, pâtissier (macarons et boîtes de 2, 5, 10). Centres : cuisine.
# Écrans : garde (00) ; les macarons (01) ; le chiffre des unités (02) ; les règles (03) ;
# les boîtes de Hugo (04) ; QUESTION 1 (04q) ; divisible par 10 (05) ; le piège (06) ;
# QUESTION 2 (06q) ; défi (07) et correction (07b) ; ce que tu as appris (08) ; fin (09).
# Voix : manim/voix/4e-div-critere-2-5-10.json ; marques : div_critere_2_5_10_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/div_critere_2_5_10.py DivCritere2510_4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/div_critere_2_5_10.py DivCritere2510_4e -o eleveai-maths-4e-div-critere-2-5-10 --media_dir manim/scripts/4e/media-div-02
# Sortie : manim/sorties/4e/maths/divisibilite/02-critere-2-5-10/eleveai-maths-4e-div-critere-2-5-10.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from div_commun import *  # noqa: E402,F403
import equation_commun  # noqa: E402

# La voix écrit « 0 » en chiffre : l'atome « 0 » se cherche tel quel (relatif_commun le lit « zéro »).
equation_commun.PAROLE["0"] = "0"

C2 = "#7dd3fc"          # divisible par 2 : bleu ciel
C5 = ORANGE_RETENUE     # divisible par 5 : orange
C10 = VERT_OK           # divisible par 10 : vert
MACARONS = ["#f9a8d4", "#86efac", "#fde047", "#c4b5fd", "#fdba74"]


def hugo_patissier(s=0.72):
    """Hugo : la veste blanche et la toque de pâtissier."""
    p = personne(peau="#e0ac69", tenue="#f1f5f9", cheveux="#78350f", s=s)
    bouton = VGroup(*[Dot(radius=0.035 * s / 0.72, color="#94a3b8") for _ in range(3)]).arrange(DOWN, buff=0.16 * s)
    bouton.move_to(p.corps.get_center() + UP * 0.1 * s)
    bande = RoundedRectangle(width=0.86 * s, height=0.2 * s, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                             stroke_color="#cbd5e1", stroke_width=1)
    bande.move_to(p.tete.get_top() + DOWN * 0.02 * s)
    bouffant = VGroup(*[Circle(radius=0.22 * s, fill_color=WHITE, fill_opacity=1, stroke_color="#cbd5e1", stroke_width=1)
                        .move_to(bande.get_top() + P(dx * s, 0.16 * s)) for dx in (-0.24, 0, 0.24)])
    return VGroup(p, bouton, bouffant, bande)


def macaron(r=0.15, c=MACARONS[0]):
    """Un macaron de profil : deux coques et la crème."""
    haut = Ellipse(width=2 * r, height=0.9 * r, fill_color=c, fill_opacity=1, stroke_width=0).shift(UP * 0.3 * r)
    bas = haut.copy().shift(DOWN * 0.6 * r)
    creme = Rectangle(width=1.7 * r, height=0.22 * r, fill_color="#fef3c7", fill_opacity=1, stroke_width=0)
    return VGroup(bas, creme, haut)


def macarons_en_vrac(n, x0, x1, y0, y1, r=0.15, graine=4):
    rng = np.random.default_rng(graine)
    pts = []
    while len(pts) < n:
        p = (rng.uniform(x0, x1), rng.uniform(y0, y1))
        if all((p[0] - q[0]) ** 2 + ((p[1] - q[1]) * 1.6) ** 2 > (2.3 * r) ** 2 for q in pts):
            pts.append(p)
    return VGroup(*[macaron(r, MACARONS[k % 5]).move_to(P(*p)) for k, p in enumerate(pts)])


def boite(n, centre=ORIGIN, pas=0.42, r=0.15, couleur=JAUNE_TITRE, etiquette=True):
    """Une boîte de n macarons (2 et 5 : une rangée ; 10 : deux rangées de 5).
    .fond .alv .lab font la boîte vide ; .macs (à part) la remplit."""
    lignes, col = (1, n) if n <= 5 else (2, n // 2)
    fond = RoundedRectangle(width=col * pas + 0.26, height=lignes * pas + 0.26, corner_radius=0.12,
                            stroke_color="#fbcfe8", stroke_width=4, fill_color="#3b1d2e", fill_opacity=1)
    alv, macs = VGroup(), VGroup()
    for i in range(lignes):
        for j in range(col):
            p = P((j - (col - 1) / 2) * pas, ((lignes - 1) / 2 - i) * pas)
            alv.add(Circle(radius=r * 1.05, stroke_color="#9d7a8a", stroke_width=2).move_to(p))
            macs.add(macaron(r, MACARONS[(i * col + j) % 5]).move_to(p))
    g = VGroup(fond, alv)
    g.fond, g.alv = fond, alv
    if etiquette:
        lab = T(str(n), 40, couleur, audit=False).next_to(fond, DOWN, buff=0.14)
        g.add(lab)
        g.lab = lab
    g.shift(centre)
    macs.shift(centre)
    g.macs = macs
    return g


def cartes_chiffres(s, centre=ORIGIN, cote=0.9, fs=60, buff=0.12, ecart=0.3):
    """Les chiffres d'un nombre, chacun dans sa case (« 3 640 » : un espace = un écart)."""
    g = VGroup()
    x = 0.0
    for ch in s:
        if ch == " ":
            x += ecart
            continue
        case = RoundedRectangle(width=cote, height=cote * 1.25, corner_radius=0.1, stroke_color="#64748b",
                                stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        t = T(ch, fs, WHITE, audit=False).move_to(case)
        g.add(VGroup(case, t).move_to(P(x + cote / 2, 0)))
        x += cote + buff
    return g.move_to(centre)


def allumer(case, c=VERT_OK):
    """La case des unités passe en vert."""
    return [case[0].animate.set_stroke(c, width=6).set_fill("#052e16", 1), case[1].animate.set_color(c)]


def loupe(case, c=JAUNE_TITRE):
    """Une loupe posée sur une case."""
    r = max(case.width, case.height) * 0.55
    verre = Circle(radius=r, stroke_color=c, stroke_width=7).move_to(case)
    d = np.array([np.cos(-PI / 4), np.sin(-PI / 4), 0])
    manche = Line(case.get_center() + d * r, case.get_center() + d * r * 1.9, color="#a16207", stroke_width=14)
    return VGroup(manche, verre)


def colorer(e, c, sauf=()):
    """Les nombres d'une ligne dans la couleur de leur règle."""
    for a in e.atomes:
        if a.original_text.isdigit() and a.original_text not in sauf:
            a.set_color(c)
    return e


class DivCritere2510_4e(PaysageDiv):
    nom_voix = "4e-div-critere-2-5-10"
    fichier_marques = "div_critere_2_5_10_marques.json"
    ceinture = "jaune"
    _cartes_larges = False

    def _carte_choix(self, lettre, txt, largeur, fs):
        """Question 2 : des choix en phrases, les cartes prennent toute la colonne (sinon le choix C est minuscule)."""
        if self._cartes_larges:
            largeur = (self.BORD_X - self.XL - 0.1) / 1.08
        return super()._carte_choix(lettre, txt, largeur, fs)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Divisible par 2, 5 et 10", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Divisible", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        cases = cartes_chiffres("? ? ? ?", centre=P(-4.4, 0.3), cote=0.62, fs=44, buff=0.1, ecart=0)
        l1 = self.lg("Comment savoir", 2.0, 0.75, 46, maxw=8)
        self.dit(l1, "Comment savoir", avec=[LaggedStart(*[FadeIn(c, scale=0.5) for c in cases], lag_ratio=0.15)])
        l2 = self.lg("sans poser la division ?", 2.0, -0.1, 50, JAUNE_TITRE, maxw=8)
        self.dit(l2, "sans poser la division ?", avec=[FadeIn(loupe(cases[-1]), scale=1.4)])
        self.insister(l2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les macarons de Hugo ───────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = hugo_patissier().move_to(P(-5.9, 2.35))
        tas = macarons_en_vrac(22, -4.9, -1.2, 0.3, 2.9)
        b2, b5, b10 = boite(2, P(-5.7, -1.95)), boite(5, P(-3.75, -1.95)), boite(10, P(-1.05, -1.75))
        self.dit(self.lg("Hugo est pâtissier.", 3.2, 3.0, 40, CIEL), "Hugo est pâtissier.", avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("Ce matin, il a fait", 3.2, 2.35, 36), "Ce matin, il a fait")
        self.dit(self.lg("3 640 macarons.", 3.2, 1.7, 44, JAUNE_TITRE), "3 640 macarons.",
                 avec=[LaggedStart(*[FadeIn(m, scale=0.4) for m in tas], lag_ratio=0.04)])
        self.dit(self.lg("Il a des boîtes", 3.2, 0.9, 36), "Il a des boîtes")
        e = self.lg("de 2, de 5 et de 10.", 3.2, 0.3, 40)
        self.poser_avec(e, "de 2, de 5 et de 10.",
                        {1: lambda: [FadeIn(b2, shift=UP * 0.2)], 4: lambda: [FadeIn(b5, shift=UP * 0.2)],
                         7: lambda: [FadeIn(b10, shift=UP * 0.2)]})
        q1 = self.lg("Lesquelles seront", 3.6, -0.75, 44, JAUNE_TITRE, maxw=5.0)
        self.dit(q1, "Lesquelles seront")
        q2 = self.lg("toutes pleines ?", 3.6, -1.45, 44, JAUNE_TITRE, maxw=5.0)
        self.dit(q2, "toutes pleines ?")
        self.insister(VGroup(q1, q2), 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : le chiffre des unités ──────────────────────────────────────────
    def ecran_unites(self):
        self.ecran("02-unites")
        self.dit(self.lg("Le secret :", 0, 3.15, 50, JAUNE_TITRE), "Le secret :")
        cases = cartes_chiffres("3 640", centre=P(0, 0.75), cote=1.15, fs=84, buff=0.42, ecart=0.4)
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in cases], lag_ratio=0.1), run_time=0.4)
        lp = loupe(cases[-1])
        self.dit(self.lg("on ne regarde que le dernier chiffre,", 0, 2.4, 40, maxw=12),
                 "on ne regarde que le dernier chiffre,", avec=[FadeIn(lp, scale=1.4)])
        e = self.lg("celui des unités.", 0, -1.05, 44, VERT_OK)
        self.poser_avec(e, "celui des unités.", {2: lambda: allumer(cases[-1])})
        e2 = self.lg("Le reste du nombre ne compte pas.", -0.6, -2.2, 40, maxw=9.5)
        self.poser_avec(e2, "Le reste du nombre ne compte pas.",
                        {1: lambda: [c.animate.set_opacity(0.25) for c in cases[:-1]]})
        self.attendre_voix(marge=0.8)

    # ── 03 : les trois règles ───────────────────────────────────────────────
    def ecran_regles(self):
        self.ecran("03-regles")
        b2, b5, b10 = (boite(2, P(-4.3, 1.6), pas=0.36, r=0.13, etiquette=False),
                       boite(5, P(-4.3, -0.4), pas=0.36, r=0.13, etiquette=False),
                       boite(10, P(-4.3, -2.65), pas=0.36, r=0.13, etiquette=False))
        self.dit(self.lg("Divisible par 2 :", -4.3, 2.55, 42, C2), "Divisible par 2 :",
                 avec=[FadeIn(b2), FadeIn(b2.macs)])
        self.dit(self.lg("le chiffre des unités est", 1.6, 2.55, 38, maxw=6.4), "le chiffre des unités est")
        self.dire_eq(colorer(F("0, 2, 4, 6 ou 8.", 56), C2).move_to(P(1.6, 1.6)), "0, 2, 4, 6 ou 8.", echelle=1.3)
        self.dit(self.lg("Par 5 :", -4.3, 0.45, 42, C5), "Par 5 :", avec=[FadeIn(b5), FadeIn(b5.macs)])
        self.dire_eq(colorer(F("il est 0 ou 5.", 56), C5).move_to(P(1.6, 0.45)), "il est 0 ou 5.", echelle=1.3)
        self.dit(self.lg("Par 10 :", -4.3, -1.55, 42, C10), "Par 10 :", avec=[FadeIn(b10), FadeIn(b10.macs)])
        dix = colorer(F("il est 0.", 56), C10).move_to(P(1.6, -1.55))
        self.dire_eq(dix, "il est 0.", echelle=1.3)
        self.insister(dix, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04 : les boîtes de Hugo ─────────────────────────────────────────────
    def ecran_hugo(self):
        self.ecran("04-hugo")
        t = self.lg("3 640 finit par 0.", 0, 3.1, 50)
        t.atomes[-2].set_color(VERT_OK)
        self.dit(t, "3 640 finit par 0.")
        bs = [boite(2, P(-4.4, -0.45)), boite(5, P(-1.35, -0.45)), boite(10, P(2.4, -0.25))]
        for b, c in zip(bs, (C2, C5, C10)):
            b.lab.set_color(c)
        self.play(*[FadeIn(b) for b in bs], run_time=0.3)
        self.dit(self.lg("Donc il est divisible", 0, 2.25, 40), "Donc il est divisible")
        oks = [self.coche(VERT_OK, 0.24).next_to(b.lab, RIGHT, buff=0.2) for b in bs]

        def remplir(k):
            return lambda: [LaggedStart(*[FadeIn(m, scale=0.4) for m in bs[k].macs], lag_ratio=0.05), Create(oks[k])]
        e = self.lg("par 2, par 5 et par 10.", 0, 1.55, 44)
        colorer(e, C2, sauf=("5", "10"))
        e.atomes[4].set_color(C5)
        e.atomes[7].set_color(C10)
        self.poser_avec(e, "par 2, par 5 et par 10.", {1: remplir(0), 4: remplir(1), 7: remplir(2)}, rt=0.3)
        fin = self.lg("Toutes les boîtes seront pleines !", -0.6, -2.55, 44, VERT_OK, maxw=9.5)
        self.dit(fin, "Toutes les boîtes seront pleines !")
        self.insister(fin, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        cases = cartes_chiffres("2 735", centre=P(-3.4, 0.2), cote=0.95, fs=66, buff=0.12, ecart=0.3)

        def avant(sc):
            q = sc.eq_dans_q(0, "2 735 est divisible par…", "2 735 est divisible par…", lettres="")
            # « … » collé à « par » n'a pas de mot à lui : il arrive avec la fin de la ligne
            sc.play(FadeIn(q.atomes[-1]), run_time=0.1)
            sc.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in cases], lag_ratio=0.1), run_time=0.4)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 5.", "Réponse B : 5.", premier=True)
            sc.ph_eq(1, "Il finit par 5.", "Il finit par 5.", avec=allumer(cases[-1]))
            sc.ph_eq(2, "Pas par 0, donc pas par 10.", "Pas par 0, donc pas par 10.")
            sc.ph_eq(3, "Et 5 est impair, donc pas par 2.", "Et 5 est impair, donc pas par 2.")
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["2 735 est divisible par…"],
                            [E("2", 40, lettres=""), E("5", 40, lettres=""), E("10", 40, lettres="")], 1,
                            ["Réponse B : 5.", "Il finit par 5.", "Pas par 0, donc pas par 10.",
                             "Et 5 est impair, donc pas par 2."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : divisible par 10 ───────────────────────────────────────────────
    def ecran_dix(self):
        self.ecran("05-dix")
        self.dit(self.lg("Remarque :", 0, 3.15, 46, CIEL), "Remarque :")
        xs, ys, w, h = [-3.9, -1.6, 0.7, 3.0], [0.35, -0.75], 2.3, 1.0
        grille = VGroup(*[Rectangle(width=w, height=h, stroke_color="#64748b", stroke_width=3,
                                    fill_color="#1e293b" if j == 0 else FOND_CARTE, fill_opacity=1).move_to(P(x, y))
                          for j, y in enumerate(ys) for x in xs[1:]])
        tetes = [T(f"par {n}", 38, c, audit=False).move_to(P(x, ys[0])) for n, c, x in zip((2, 5, 10), (C2, C5, C10), xs[1:])]
        ligne_0 = VGroup(T("…", 50, WHITE, audit=False), T("0", 56, VERT_OK, audit=False)).arrange(RIGHT, buff=0.08)
        ligne_0.move_to(P(xs[0], ys[1]))
        oks = [self.coche(VERT_OK, 0.26).move_to(P(x, ys[1])) for x in xs[1:]]
        e1 = self.lg("divisible par 10, c'est forcément", 0, 2.4, 40, maxw=12)
        self.poser_avec(e1, "divisible par 10, c'est forcément", {2: lambda: [FadeIn(grille), FadeIn(tetes[2], scale=1.3)]})
        e2 = self.lg("divisible par 2 et par 5.", 0, 1.65, 40)
        self.poser_avec(e2, "divisible par 2 et par 5.", {2: lambda: [FadeIn(tetes[0], scale=1.3)],
                                                           5: lambda: [FadeIn(tetes[1], scale=1.3)]})
        e3 = self.lg("Le 0 coche les trois cases.", -0.6, -2.35, 44, VERT_OK, maxw=9.5)
        self.poser_avec(e3, "Le 0 coche les trois cases.",
                        {1: lambda: [FadeIn(ligne_0, scale=1.3)],
                         2: lambda: [LaggedStart(*[Create(o) for o in oks], lag_ratio=0.3)]}, rt=0.3)
        self.insister(e3, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        cases = cartes_chiffres("3640", centre=P(0, 1.45), cote=0.95, fs=68, buff=0.75)
        plus = VGroup(*[T("+", 54, PIEGE, audit=False).move_to((cases[k].get_right() + cases[k + 1].get_left()) / 2)
                        for k in range(3)])
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in cases], lag_ratio=0.1), run_time=0.4)
        e = self.lg("Le piège : additionner les chiffres.", 0, 3.15, 44, PIEGE, maxw=11.5)
        self.poser_avec(e, "Le piège : additionner les chiffres.",
                        {3: lambda: [LaggedStart(*[FadeIn(p, scale=1.5) for p in plus], lag_ratio=0.2)]}, rt=0.3)
        self.dit(self.lg("Pour 2, 5 et 10,", 0, -0.05, 40), "Pour 2, 5 et 10,")
        croix = VGroup(Line(cases.get_corner(DL) + P(-0.2, -0.15), cases.get_corner(UR) + P(0.2, 0.15)),
                       Line(cases.get_corner(UL) + P(-0.2, 0.15), cases.get_corner(DR) + P(0.2, -0.15))).set_stroke(PIEGE, 8)
        e2 = self.lg("la somme ne sert à rien.", 0, -0.75, 40, PIEGE)
        self.poser_avec(e2, "la somme ne sert à rien.", {5: lambda: [Create(croix)]}, rt=0.3)
        e3 = self.lg("Seul le dernier chiffre décide.", -0.6, -2.3, 46, VERT_OK, maxw=9.5)
        self.poser_avec(e3, "Seul le dernier chiffre décide.",
                        {2: lambda: [FadeOut(croix), FadeOut(plus), *[c.animate.set_opacity(0.25) for c in cases[:-1]],
                                     *allumer(cases[-1])]}, rt=0.3)
        self.play(FadeIn(loupe(cases[-1]), scale=1.4), run_time=0.3)
        self.insister(e3, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        self.XL = -0.6
        self._cartes_larges = True
        cases = cartes_chiffres("4 518", centre=P(-4.1, 0.2), cote=0.82, fs=58, buff=0.12, ecart=0.26)

        def avant(sc):
            sc.eq_dans_q(0, "4 518 est-il", "4 518 est-il", lettres="")
            sc.eq_dans_q(0, "divisible par 2 ?", "divisible par 2 ?", lettres="")
            sc.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in cases], lag_ratio=0.1), run_time=0.4)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : oui.", "Réponse A : oui.", premier=True)
            sc.ph_eq(1, "8 est pair,", "8 est pair,", avec=allumer(cases[-1]))
            sc.ph_eq(2, "donc 4 518 est divisible par 2.", "donc 4 518 est divisible par 2.")
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["4 518 est-il", "divisible par 2 ?"],
                            [E("oui, il finit par 8.", 40, lettres=""), E("non, il est trop grand.", 40, lettres=""),
                             E("on ne peut pas savoir sans poser.", 40, lettres="")], 0,
                            ["Réponse A : oui.", "8 est pair,", "donc 4 518 est divisible par 2."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL
        self._cartes_larges = False

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        p = hugo_patissier().move_to(P(-5.6, 0.75))

        def plateau(s, y):
            n = T(s, 50, JAUNE_TITRE, audit=False)
            m = VGroup(*[macaron(0.16, MACARONS[k]) for k in range(3)]).arrange(RIGHT, buff=0.06)
            g = VGroup(n, m).arrange(DOWN, buff=0.16)
            cadre = RoundedRectangle(width=2.5, height=g.height + 0.36, corner_radius=0.14, stroke_color="#fbcfe8",
                                     stroke_width=4, fill_color="#3b1d2e", fill_opacity=1)
            return VGroup(cadre, g.move_to(cadre)).move_to(P(-2.6, y))
        p1, p2 = plateau("1 255", 1.15), plateau("908", -0.75)
        self.dit(self.lg("Hugo fait ensuite", 3.2, 1.6, 38), "Hugo fait ensuite", avec=[FadeIn(p)])
        e = self.lg("1 255 macarons, puis 908.", 3.2, 0.95, 38)
        self.poser_avec(e, "1 255 macarons, puis 908.", {0: lambda: [FadeIn(p1, scale=0.8)], 5: lambda: [FadeIn(p2, scale=0.8)]})
        self.dit(self.lg("Pour chacun :", 3.2, 0.2, 38), "Pour chacun :")
        q = self.lg("par 2, par 5, par 10 ?", 3.2, -0.5, 46, JAUNE_TITRE, maxw=5.6)
        self.dit(q, "par 2, par 5, par 10 ?")
        self.insister(q, 1.1, 0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -2.3))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("07b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.2))), rt=0.25)
        xs, ys, w, h = [-3.7, -1.45, 0.65, 2.75], [-0.75, -1.6, -2.45], [2.3, 2.0, 2.0, 2.0], 0.85
        grille = VGroup(*[Rectangle(width=w[i], height=h, stroke_color="#64748b", stroke_width=3,
                                    fill_color="#1e293b" if j == 0 or i == 0 else FOND_CARTE, fill_opacity=1).move_to(P(x, y))
                          for j, y in enumerate(ys) for i, x in enumerate(xs) if (i, j) != (0, 0)])
        tetes = VGroup(*[T(f"par {n}", 36, c, audit=False).move_to(P(x, ys[0]))
                         for n, c, x in zip((2, 5, 10), (C2, C5, C10), xs[1:])])
        noms = [T("1 255", 42, JAUNE_TITRE, audit=False).move_to(P(xs[0], ys[1])),
                T("908", 42, JAUNE_TITRE, audit=False).move_to(P(xs[0], ys[2]))]
        self.play(FadeIn(grille), FadeIn(tetes), run_time=0.3)

        def marque(ok, col, lig):
            m = self.coche(VERT_OK, 0.22) if ok else T("✗", 44, PIEGE, audit=False)
            m.move_to(P(xs[col], ys[lig]))
            return lambda: [Create(m) if ok else FadeIn(m, scale=1.5)]
        self.dit(self.lg("1 255 finit par 5 :", 0, 2.4, 40), "1 255 finit par 5 :", avec=[FadeIn(noms[0], scale=1.2)])
        e = self.lg("divisible par 5, mais ni par 2 ni par 10.", 0, 1.75, 38, maxw=12)
        self.poser_avec(e, "divisible par 5, mais ni par 2 ni par 10.",
                        {2: marque(True, 2, 1), 7: marque(False, 1, 1), 10: marque(False, 3, 1)}, rt=0.25)
        self.dit(self.lg("908 finit par 8 :", 0, 0.95, 40), "908 finit par 8 :", avec=[FadeIn(noms[1], scale=1.2)])
        e = self.lg("divisible par 2, mais ni par 5 ni par 10.", 0, 0.3, 38, maxw=12)
        self.poser_avec(e, "divisible par 2, mais ni par 5 ni par 10.",
                        {2: marque(True, 1, 2), 7: marque(False, 2, 2), 10: marque(False, 3, 2)}, rt=0.25)
        self.attendre_voix(marge=1.0)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        self.XL = -1.5
        cases = cartes_chiffres("3 640", cote=0.62, fs=46, buff=0.24, ecart=0.22)
        cases[-1][0].set_stroke(VERT_OK, width=5).set_fill("#052e16", 1)
        cases[-1][1].set_color(VERT_OK)
        fig = VGroup(cases, loupe(cases[-1]))
        lignes = self.finale_colonne([["Pour 2, 5 et 10, on ne regarde", "que le chiffre des unités."],
                                      ["Par 2 : 0, 2, 4, 6 ou 8."],
                                      ["Par 5 : 0 ou 5."],
                                      ["Par 10 : 0."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        self.montrer_ligne(lignes[0])
        # Les règles répètent leurs chiffres (0, 2, 5, 10) : chaque mot posé à SON instant, au mot près
        for lg, s in zip(lignes[1:], ["Par 2 : 0, 2, 4, 6 ou 8.", "Par 5 : 0 ou 5.", "Par 10 : 0."]):
            ref = lg[1][0]
            e = E(s, 40, lettres="")
            e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
            lg[1].remove(ref)
            self.dire_eq(e, s, echelle=1.0, rt=0.16, avec=[Create(lg[0])])
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_unites()
        self.ecran_regles()
        self.ecran_hugo()
        self.ecran_question1()
        self.ecran_dix()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
