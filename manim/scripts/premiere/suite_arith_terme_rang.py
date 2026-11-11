# suite_arith_terme_rang.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite arithmétique :
# calculer un terme lointain » (16:9), ceinture VERTE. Série SUITES, épisode 04.
# Micro du coach : lin_suite_terme_rang (notion lin_suite_arithmetique) :
# lib/tutor-v4/questionBank/premiere/maths/suites-arithmetiques.bank.ts
# + suites-arithmetiques-renfort.ts (aTerme0, aTerme1, aTermeAutre, aTermeCalcul,
# aTermeContexte, aMotifTerme ; indice « Compte les PAS »).
#
# Ce que demande le coach → écran :
#   · aTerme0 (u₀ + n × r)                     → 04-formules (1re ligne) ;
#   · aTerme1 (u₁ + (n − 1) × r)               → 03-compter-pas, 05-question ;
#   · aTermeAutre (uₚ + (n − p) × r)           → 06-autre-terme, 08-question ;
#   · aTermeCalcul (quel calcul ? piège k / k + 1) → 07-piege (8 + 20 × 4) ;
#   · aMotifTerme (motif, étape k)             → 01/02 le carré bordé, 09 défi ;
#   · aTermeContexte                           → 01 Hugo, 09 les allumettes.
# Clé de voix → écran :
#   00-garde (une rangée de cases, les sauts s'allument jusqu'au « ? » lointain)
#   · 01 Hugo, carreleur : les bacs en carré bordé (8, 12, 16 carreaux), l'étape 20
#   · 02 les sauts « + 4 », un carreau de plus par côté (en orange), u₁ = 8, r = 4
#   · 03 la rangée u₁ … u₂₀ : les 19 sauts comptés un à un (orange), u₂₀ = 84
#   · 04 les trois formules, chacune avec ses sauts (n, n − 1, n − p pas)
#   · 05/05b question (C : 57, 9 pas) · 06 depuis u₆ = 40 : 9 pas jusqu'à u₁₅ = 67
#   · 07 le piège : un saut de trop, barré en rouge (88 au lieu de 84)
#   · 08/08b question (A : 14, 8 pas) · 09/09b défi des allumettes (151)
#   · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = termes, orange = raison et sauts,
# vert = juste, rouge = piège. ⛔ Pas de LaTeX : tout en Text.
# Voix : manim/voix/premiere-suite-arith-terme-rang.json (débit −6),
# calée mot à mot par suite_arith_terme_rang_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_arith_terme_rang.py SuiteArithTermeRang1re -o eleveai-maths-premiere-suite-arith-terme-rang --media_dir manim/scripts/premiere/media-suite-arith-terme-rang
# Sortie : manim/sorties/premiere/maths/suites/04-arith-terme-rang/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
BACS = [4 * (k + 1) for k in (1, 2, 3)]          # carré bordé : côté k + 2
assert BACS == [8, 12, 16] and 4 * 21 == 84
assert 8 + (20 - 1) * 4 == 84 and 8 + 20 * 4 == 88 and 88 - 84 == 4
assert 12 + 9 * 5 == 57 and 12 + 10 * 5 == 62 and 12 + 11 * 5 == 67      # Q1 → C
assert 40 + (15 - 6) * 3 == 67
assert 30 + 8 * (-2) == 14 and 30 + 8 * 2 == 46 and 30 + 12 * (-2) == 6  # Q2 → A
ALLU = [3 * n + 1 for n in (1, 2, 3)]
assert ALLU == [4, 7, 10] and 4 + 49 * 3 == 151 == 3 * 50 + 1

TERRE, FEUILLE = "#78350F", "#15803D"
PEAU, BLEU_TRAVAIL = "#c68642", "#1D4ED8"
GRIS_SAUT = "#334155"


def bac(etape, cote=0.3, x=0.0, y=0.0):
    """Le bac de l'étape k : la bordure d'un carré de k + 2 carreaux de côté,
    une plante au centre. Renvoie (anciens, neufs, plante) : les 4 carreaux
    neufs (un par côté, juste avant chaque coin) sont à part."""
    m = etape + 2
    neufs_pos = {(m - 2, m - 1), (m - 1, 1), (1, 0), (0, m - 2)} if etape > 1 else set()
    anciens, neufs = VGroup(), VGroup()
    for i in range(m):
        for j in range(m):
            if 0 < i < m - 1 and 0 < j < m - 1:
                continue
            neuf = (i, j) in neufs_pos
            c = Square(cote, fill_color=RAISON if neuf else TERME, fill_opacity=1, stroke_color=WHITE,
                       stroke_width=1.5).move_to(P(x + (i - (m - 1) / 2) * cote, y + (j - (m - 1) / 2) * cote))
            (neufs if neuf else anciens).add(c)
    terre = Square(cote * (m - 2), fill_color=TERRE, fill_opacity=1, stroke_width=0).move_to(P(x, y))
    feuilles = VGroup(*[Circle(radius=cote * (0.28 + 0.1 * etape), fill_color=FEUILLE, fill_opacity=1,
                               stroke_width=0).move_to(P(x + dx * cote * 0.3 * etape, y + dy * cote * 0.3 * etape))
                        for dx, dy in ((0, 0.25), (-0.35, -0.15), (0.35, -0.15))])
    return anciens, neufs, VGroup(terre, feuilles)


def hugo(s=1.0):
    """Hugo, carreleur : casquette, tenue bleue, genouillère, une truelle et un carreau."""
    tete = Circle(radius=0.28, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    casq = Arc(radius=0.29, start_angle=0, angle=PI, fill_color=RAISON, fill_opacity=1, stroke_width=0)
    casq.move_to(P(0, 1.16))
    visiere = RoundedRectangle(width=0.36, height=0.07, corner_radius=0.03, fill_color=RAISON, fill_opacity=1,
                               stroke_width=0).move_to(P(0.24, 1.1))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=BLEU_TRAVAIL, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    poche = Rectangle(width=0.3, height=0.22, stroke_color=WHITE, stroke_width=2).move_to(P(-0.18, 0.3))
    manche = Line(P(0.4, 0.45), P(0.85, 0.15), stroke_color=BLEU_TRAVAIL, stroke_width=14)
    lame = Polygon(P(0.88, 0.1), P(1.25, -0.08), P(0.95, -0.25), fill_color=GREY_B, fill_opacity=1,
                   stroke_color=WHITE, stroke_width=1.5)
    carreau = Square(0.36, fill_color=TERME, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    carreau.rotate(0.25).move_to(P(-0.75, 0.0))
    return VGroup(corps, poche, manche, lame, carreau, tete, casq, visiere).scale(s)


def allumette(a, b, couleur="#FDE68A"):
    """Une allumette de a à b : le bâton, la tête rouge au bout b."""
    baton = Line(a, b, stroke_color=couleur, stroke_width=7)
    d = (np.array(b) - np.array(a)) / max(np.linalg.norm(np.array(b) - np.array(a)), 1e-6)
    tete = Dot(np.array(b) - d * 0.05, radius=0.06, color=PIEGE)
    return VGroup(baton, tete)


def rangee_carres(n, x0, y0, c=0.62, neuves=False):
    """n carrés collés en allumettes, coin bas-gauche (x0, y0). Les 3 allumettes
    du dernier carré (quand n > 1) sont à part, en orange si neuves=True."""
    anciennes, nouvelles = VGroup(), VGroup()
    g = 0.04
    anciennes.add(allumette(P(x0, y0 + g), P(x0, y0 + c - g)))
    for k in range(n):
        xa, xb = x0 + k * c, x0 + (k + 1) * c
        lot = nouvelles if (k == n - 1 and n > 1) else anciennes
        coul = RAISON if (lot is nouvelles and neuves) else "#FDE68A"
        lot.add(allumette(P(xa + g, y0 + c), P(xb - g, y0 + c), coul),
                allumette(P(xa + g, y0), P(xb - g, y0), coul),
                allumette(P(xb, y0 + g), P(xb, y0 + c - g), coul))
    return anciennes, nouvelles


class Rangee(VGroup):
    """Une rangée de cases (les termes) et les sauts d'une case à la suivante,
    d'abord éteints (gris foncé) ; les sauts s'allument un à un (compter).
    self.cases[i], self.sauts[i] (de i à i + 1), self.noms {i: Text}."""

    def __init__(self, n, x0, x1, y, larg=0.5, haut=0.55, cote=UP, creux=0.2, sw=4, sauts=True):
        super().__init__()
        self.pas = (x1 - x0) / max(n - 1, 1)
        self.cases = VGroup(*[RoundedRectangle(width=larg, height=haut, corner_radius=0.08, stroke_color=TERME,
                                               stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
                              .move_to(P(x0 + k * self.pas, y)) for k in range(n)])
        self.sauts = VGroup()
        self.cote = cote
        if sauts:
            for k in range(n - 1):
                self.sauts.add(self.fleche(k, k + 1, creux, sw))
        self.noms, self.textes = {}, {}
        self.add(self.cases, self.sauts)

    def fleche(self, i, j, creux=0.2, sw=4, couleur=GRIS_SAUT):
        a, b = self.cases[i], self.cases[j]
        bord = (lambda m: m.get_top()) if np.allclose(self.cote, UP) else (lambda m: m.get_bottom())
        d, f = bord(a) + 0.05 * self.cote, bord(b) + 0.05 * self.cote
        angle = 4 * np.arctan(2 * creux / max(np.linalg.norm(f - d), 0.1)) * (-1 if np.allclose(self.cote, UP) else 1)
        return CurvedArrow(d, f, angle=angle, color=couleur, stroke_width=sw, tip_length=0.12)


class SuiteArithTermeRang1re(PaysageSuites):
    fichier_marques = "suite_arith_terme_rang_marques.json"
    nom_voix = "premiere-suite-arith-terme-rang"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    # ── petits outils de l'épisode ─────────────────────────────────────────

    def calcul(self, morceaux, y, x=-6.25, fs=40, avec=(), centre=None, avec_morceau=None):
        """Un calcul écrit morceau par morceau : [(texte, couleur, extrait), …] ;
        chaque morceau quand la voix dit son extrait (None : avec le précédent).
        avec_morceau = {i: [anims]} : jouées avec le morceau i (s'il porte un extrait)."""
        avec_morceau = avec_morceau or {}
        ts = [self.t(m, fs, c) for m, c, _ in morceaux]
        g = VGroup(*ts).arrange(RIGHT, buff=0.18).move_to(P(0, y))
        if centre is not None:
            g.move_to(P(centre, y))
        else:
            g.align_to(P(x, 0), LEFT)
        paquet, extra = [], []
        for i, (tx, (_, _, ex)) in enumerate(zip(ts, morceaux)):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *extra, run_time=0.2)
                paquet, extra = [], []
            if ex is not None:
                self.suivre(ex)
            paquet.append(tx)
            extra += avec_morceau.get(i, [])
        self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *avec, run_time=0.3)
        return g

    def ecrire_case(self, rg, i, texte, couleur=WHITE, fs=28, anims=(), run_time=0.25):
        """Le nombre d'une case de la rangée (rétréci s'il le faut)."""
        c = rg.cases[i]
        tx = Text(texte, font_size=fs, color=couleur)
        if tx.width > c.width - 0.1:
            tx.scale_to_fit_width(c.width - 0.1)
        tx.move_to(c)
        rg.textes[i] = tx
        self.play(FadeIn(tx, scale=1.4), *anims, run_time=run_time)
        return tx

    def nom_case(self, rg, i, texte, fs=26, couleur=GREY_A, haut=False):
        nm = Text(texte, font_size=fs, color=couleur)
        nm.next_to(rg.cases[i], UP if haut else DOWN, buff=0.12)
        rg.noms[i] = nm
        return nm

    def allumer(self, sauts, couleur=RAISON, run_time=1.5, avec=()):
        """Les sauts s'allument UN À UN (on les compte), dans l'ordre."""
        self.play(LaggedStart(*[s.animate.set_color(couleur) for s in sauts], lag_ratio=1.0),
                  *avec, run_time=run_time)

    def montrer_rangee(self, rg, run_time=0.4, avec=()):
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.05),
                  *[Create(s) for s in rg.sauts], *avec, run_time=run_time)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        rg = Rangee(9, -4.6, 3.4, -1.25, larg=0.62, haut=0.6, creux=0.22)
        self.nom_case(rg, 0, "u₁", 28)
        self.montrer_rangee(rg, run_time=0.3, avec=[FadeIn(rg.noms[0])])
        self.au_mot("tous")
        self.allumer(rg.sauts, run_time=0.8)
        q = Text("?", font_size=40, color=RAISON).move_to(rg.cases[8])
        self.play(FadeIn(q, scale=1.6), rg.cases[8].animate.set_stroke(RAISON, width=6), run_time=0.3)

    def ecran_garde(self):
        self.garde("Suite arithmétique",
                   [("calculer un terme lointain", "calculer", TERME),
                    ("Comment trouver le 20e terme", "20e"),
                    ("sans calculer tous ceux d'avant ?", "sans")],
                   dessin=self.dessin_garde)

    # ── 01 : Hugo et les bacs en carré bordé ───────────────────────────────

    XS_BAC = (-2.85, -0.4, 2.2)
    X20 = 5.25
    Y_BAC, Y_ETAPE, Y_CASES = 0.55, 1.95, -1.35

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = hugo(0.95).move_to(P(-5.3, 1.0))
        nom = self.t("Hugo", 40, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        metier = self.t("carreleur", 34, TERME).next_to(nom, DOWN, buff=0.12)
        self.au_mot("Hugo")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("carreleur")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)
        bacs = [bac(k, 0.3, x, self.Y_BAC) for k, x in zip((1, 2, 3), self.XS_BAC)]
        self.au_mot("bordures")
        self.play(LaggedStart(*[GrowFromCenter(c) for c in bacs[0][0]], lag_ratio=0.12), run_time=0.7)
        self.au_mot("plantes")
        self.play(FadeIn(bacs[0][2], scale=0.6), run_time=0.4)
        self.au_mot("motif")
        motif = self.t("un motif en carré bordé", 38, GREY_A).move_to(P(0, 3.15))
        self.play(FadeIn(motif, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("bordé")
        self.play(Indicate(bacs[0][0], color=TERME, scale_factor=1.1), run_time=0.5)
        lg = LigneTermes([str(v) for v in BACS] + ["?"], xs=self.XS_BAC + (self.X20,),
                         centre=P(0, self.Y_CASES), largeur=1.25, hauteur=0.75, fs=38,
                         noms=["u₁", "u₂", "u₃", "u₂₀"], fs_noms=30)
        etapes = [self.t(f"étape {k}", 34, GREY_A).move_to(P(x, self.Y_ETAPE))
                  for k, x in zip((1, 2, 3, 20), self.XS_BAC + (self.X20,))]
        for k in range(3):
            self.suivre("Étape")
            self.suivre(str(k + 1))
            anims = [FadeIn(etapes[k], shift=UP * 0.1)]
            if k:
                prec = VGroup(*bacs[k - 1][0], *bacs[k - 1][1])
                anims += [TransformFromCopy(prec, bacs[k][0]), FadeIn(bacs[k][1], scale=1.6),
                          TransformFromCopy(bacs[k - 1][2], bacs[k][2])]
            self.play(*anims, run_time=0.35)
            self.suivre(str(BACS[k]))
            self.montrer_case(lg, k, run_time=0.3, nom=False)
        self.suivre("20")
        grand = DashedVMobject(Square(1.75, stroke_color=RAISON, stroke_width=4), num_dashes=28)
        grand.move_to(P(self.X20, self.Y_BAC))
        pt = Text("…", font_size=48, color=GREY_A).move_to(P((self.XS_BAC[2] + self.X20) / 2 + 0.1, self.Y_CASES))
        lg.cases[3][0].set_stroke(RAISON)
        self.play(FadeIn(etapes[3], shift=UP * 0.1), Create(grand), FadeIn(pt), run_time=0.4)
        self.montrer_case(lg, 3, run_time=0.3, nom=False)
        self.au_mot("combien")
        qq = self.t("Combien de carreaux commander ?", 40, RAISON).move_to(P(0, 3.15))
        self.play(FadeOut(motif), FadeIn(qq, shift=DOWN * 0.1), Indicate(lg.cases[3], color=RAISON), run_time=0.45)
        self.attendre_voix(marge=0.4)
        self._s1 = (perso, nom, metier, bacs, lg, etapes, qq)

    # ── 02 : la raison : un carreau de plus par côté ───────────────────────

    def ecran_raison(self):
        self.dire("02-raison")
        perso, nom, metier, bacs, lg, etapes, qq = self._s1
        self.suivre("4")
        for k in (0, 1):
            lg.sauts[k] = lg.saut(k, "+ 4", cote=UP, fs=32, creux=0.22)
        self.play(*[Create(s[0]) for s in lg.sauts.values()], run_time=0.3)
        self.play(*[FadeIn(s[1], scale=1.4) for s in lg.sauts.values()], run_time=0.2)
        self.au_mot("un de plus")
        for k in (1, 2):
            self.play(*[Flash(c, color=RAISON, line_length=0.15, num_lines=8) for c in bacs[k][1]],
                      Indicate(bacs[k][1], color=RAISON, scale_factor=1.2), run_time=0.45)
        self.au_mot("On note")
        note = VGroup(self.t("uₙ", 40, TERME), self.t("= le nombre de carreaux de l'étape n", 38))
        note.arrange(RIGHT, buff=0.18).move_to(P(0, 3.15))
        self.play(FadeOut(qq), FadeIn(note, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("nombre")
        self.play(*[FadeIn(n, shift=UP * 0.08) for n in lg.noms], run_time=0.35)
        self.au_mot("commence")
        self.suivre("1")
        u1 = VGroup(self.t("u₁ =", 46, TERME), self.t("8", 46, WHITE)).arrange(RIGHT, buff=0.18)
        u1.move_to(P(-5.3, -1.85))
        self.play(FadeIn(u1[0], shift=UP * 0.1), run_time=0.25)
        self.suivre("8")
        self.play(FadeIn(u1[1], scale=1.4), Indicate(lg.cases[0], color=TERME, scale_factor=1.15), run_time=0.3)
        self.au_mot("raison")
        rr = VGroup(self.t("r =", 46, RAISON), self.t("4", 46, RAISON)).arrange(RIGHT, buff=0.18)
        rr.move_to(P(-5.3, -2.85))
        self.play(FadeIn(rr[0], shift=UP * 0.1), run_time=0.25)
        self.suivre("4")
        cad = self.encadre(rr, RAISON, 0.16)
        self.play(FadeIn(rr[1], scale=1.4), Create(cad), run_time=0.3)
        self.insister(VGroup(rr, cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 03 : compter les pas : 19 sauts de l'étape 1 à l'étape 20 ──────────

    def ecran_compter(self):
        self.nouvel_ecran("03-compter-pas")
        rg = Rangee(20, -6.0, 6.0, 1.15, larg=0.5, haut=0.58, creux=0.2)
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.05), run_time=0.4)
        e1 = self.t("étape 1", 30, GREY_A).move_to(P(rg.cases[0].get_center()[0] + 0.2, 2.15))
        e20 = self.t("étape 20", 30, GREY_A).move_to(P(rg.cases[19].get_center()[0] - 0.3, 2.15))
        n1, n20 = self.nom_case(rg, 0, "u₁", 28), self.nom_case(rg, 19, "u₂₀", 28)
        self.suivre("1")
        self.play(FadeIn(e1, shift=DOWN * 0.1), FadeIn(n1), Indicate(rg.cases[0], color=TERME), run_time=0.3)
        self.suivre("20")
        self.play(FadeIn(e20, shift=DOWN * 0.1), FadeIn(n20), Indicate(rg.cases[19], color=TERME), run_time=0.3)
        self.au_mot("combien")
        tit = self.t("Combien de pas ?", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(FadeIn(tit, shift=DOWN * 0.1), *[Create(s) for s in rg.sauts], run_time=0.3)
        self.allumer(rg.sauts, run_time=1.35)
        self.calcul([("20", WHITE, "20"), ("−", WHITE, None), ("1", WHITE, "1"), ("=", WHITE, "19"),
                     ("19 pas", RAISON, None)], -0.15, centre=0, fs=44,
                    avec=[Indicate(rg.sauts, color=RAISON, scale_factor=1.1)])
        t8 = Text("8", font_size=30, color=WHITE).move_to(rg.cases[0])
        t84 = Text("84", font_size=28, color=JUSTE).move_to(rg.cases[19])
        l2 = self.calcul([("u₂₀ =", TERME, "Donc"), ("8", WHITE, "8"), ("+", WHITE, None), ("19", RAISON, "19"),
                          ("×", WHITE, None), ("4", RAISON, "4"), ("=", WHITE, "égale"), ("84", JUSTE, "84")],
                         -1.3, centre=0, fs=50, avec_morceau={1: [FadeIn(t8, scale=1.4)]},
                         avec=[FadeIn(t84, scale=1.4), rg.cases[19].animate.set_stroke(JUSTE, width=6)])
        self.insister(l2[-1], 1.3)
        self.au_mot("Hugo")
        h = hugo(0.42).move_to(P(-4.7, -2.55))
        self.play(FadeIn(h, shift=UP * 0.1), run_time=0.3)
        self.au_mot("commande")
        fin = self.t("Hugo commande", 40, WHITE).next_to(h, RIGHT, buff=0.35)
        self.play(FadeIn(fin, shift=UP * 0.1), run_time=0.3)
        self.suivre("84")
        nb = self.t("84 carreaux", 40, JUSTE).next_to(fin, RIGHT, buff=0.4)
        cad = self.encadre(nb, JUSTE, 0.12)
        self.play(FadeIn(nb, scale=1.3), Create(cad), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 04 : les trois formules, chacune avec ses sauts ────────────────────

    def ecran_formules(self):
        self.nouvel_ecran("04-formules")
        self.titre("On compte toujours les PAS", JAUNE_TITRE, 46, extrait="compte")
        lignes = [(1.75, "u₀", "n pas", "Si la suite commence à u₀ :", "uₙ = u₀ + n × r", "Si la suite", 1),
                  (0.0, "u₁", "n − 1 pas", "Si elle commence à u₁ :", "uₙ = u₁ + (n − 1) × r", "Si elle", 2),
                  (-1.75, "uₚ", "n − p pas", "Depuis n'importe quel terme uₚ :", "uₙ = uₚ + (n − p) × r",
                   "depuis", 3)]
        for y, a, lab, cond, formule, ex, n in lignes:
            rg = Rangee(5, -6.0, -3.2, y - 0.2, larg=0.5, haut=0.5, creux=0.16)
            na, nn = self.nom_case(rg, 0, a, 28), self.nom_case(rg, 4, "uₙ", 28, TERME)
            pts = Text("…", font_size=30, color=GREY_A).move_to(rg.cases[2])
            lab_t = self.t(lab, 30, RAISON).move_to(P(-4.6, y + 0.6))
            c = self.t(cond, 32, GREY_A)
            f = self.t(formule, 46, WHITE)
            bloc = VGroup(c, f).arrange(DOWN, aligned_edge=LEFT, buff=0.14).move_to(P(0, y))
            bloc.align_to(P(-2.3, 0), LEFT)
            self.au_mot(ex)
            self.play(FadeIn(c, shift=RIGHT * 0.15), LaggedStart(*[FadeIn(k, scale=0.8) for k in rg.cases],
                                                                  lag_ratio=0.1),
                      *[Create(s) for s in rg.sauts], FadeIn(na), FadeIn(nn), FadeIn(pts), run_time=0.45)
            self.au_mot("u indice n égale", n=n)
            self.allumer(rg.sauts, run_time=0.6, avec=[FadeIn(f, shift=RIGHT * 0.15)])
            self.au_mot(("n fois", "1, fois", "p, fois")[n - 1])
            self.play(FadeIn(lab_t, scale=1.3), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : question-pause n° 1 : u₁ = 12, r = 5, u₁₀ ? → C ───────────────

    def sous_question(self, q, n, noms, lab, morceaux, avec_fin=()):
        """Sous les boutons : la petite rangée (n cases, sauts allumés au « N pas »)
        puis le calcul, chacun quand la voix le dit."""
        y = q.cartes.get_bottom()[1] - 0.62
        rg = Rangee(n, -6.0, -2.1, y, larg=0.34, haut=0.4, creux=0.12, sw=3)
        n0, n1 = self.nom_case(rg, 0, noms[0], 24), self.nom_case(rg, n - 1, noms[1], 24)
        self.au_mot("De ")
        self.play(LaggedStart(*[FadeIn(k, scale=0.8) for k in rg.cases], lag_ratio=0.08),
                  *[Create(s) for s in rg.sauts], FadeIn(n0), FadeIn(n1), run_time=0.35)
        self.suivre(lab.split()[0])
        lt = self.t(lab, 34, RAISON).next_to(rg, RIGHT, buff=0.3)
        self.allumer(rg.sauts, run_time=0.4, avec=[FadeIn(lt, scale=1.2)])
        c = self.calcul(morceaux, rg.get_center()[1], x=lt.get_right()[0] + 0.55, fs=40, avec=avec_fin)
        self.insister(c[-1], 1.3)
        self.attendre_voix(marge=0.6)

    def ecran_question1(self):
        q = self.poser_question("05-question",
                                [(self.t("Une suite arithmétique de raison 5", 38), "5"),
                                 (self.t("commence à u₁ = 12.", 38), "12"),
                                 (self.t("Combien vaut u₁₀ ?", 38), "Combien")],
                                ["62", "67", "57"], 2)
        self.dire("05b-reponse")
        self.q_reponse(q, 2)
        self.sous_question(q, 10, ("u₁", "u₁₀"), "9 pas",
                           [("12", WHITE, "12"), ("+", WHITE, None), ("9", RAISON, "9"), ("×", WHITE, None),
                            ("5", RAISON, "5"), ("=", WHITE, "égale"), ("57", JUSTE, "57")])

    # ── 06 : depuis un autre terme : u₆ = 40 → u₁₅ ─────────────────────────

    def ecran_autre(self):
        self.nouvel_ecran("06-autre-terme")
        self.titre("On ne connaît pas toujours le premier terme", JAUNE_TITRE, 42, extrait="connaît")
        rg = Rangee(16, -6.0, 6.0, 1.35, larg=0.56, haut=0.6, sauts=False)
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.05), run_time=0.4)
        self.au_mot("premier terme")
        q0 = Text("?", font_size=32, color=GREY_A).move_to(rg.cases[0])
        n0 = self.nom_case(rg, 0, "u₀", 26)
        self.play(FadeIn(q0, scale=1.4), FadeIn(n0), *[rg.cases[k].animate.set_stroke(GREY_C) for k in range(6)],
                  run_time=0.35)
        self.suivre("6")
        n6 = self.nom_case(rg, 6, "u₆", 28, TERME)
        self.play(FadeIn(n6), Indicate(rg.cases[6], color=TERME), run_time=0.3)
        self.suivre("40")
        self.ecrire_case(rg, 6, "40", WHITE, 28, anims=[rg.cases[6].animate.set_stroke(TERME, width=6)])
        self.au_mot("raison")
        self.suivre("3")
        rr = VGroup(self.t("r =", 44, RAISON), self.t("3", 44, RAISON)).arrange(RIGHT, buff=0.15)
        rr.move_to(P(-5.0, -0.2))
        cad = self.encadre(rr, RAISON, 0.14)
        self.play(FadeIn(rr, scale=1.3), Create(cad), run_time=0.3)
        sauts = VGroup(*[rg.fleche(k, k + 1, 0.2, 4) for k in range(6, 15)])
        self.suivre("15")
        n15 = self.nom_case(rg, 15, "u₁₅", 28, TERME)
        de = self.t("de u₆ à u₁₅ :", 40, WHITE)
        neuf = self.t("9 pas", 40, RAISON)
        ligne = VGroup(de, neuf).arrange(RIGHT, buff=0.25).move_to(P(1.3, -0.2))
        self.play(FadeIn(n15), FadeIn(de, shift=UP * 0.1), *[Create(s) for s in sauts], run_time=0.35)
        self.suivre("9")
        self.allumer(sauts, run_time=0.55, avec=[FadeIn(neuf, scale=1.3)])
        t67 = Text("67", font_size=28, color=JUSTE).move_to(rg.cases[15])
        c = self.calcul([("u₁₅ =", TERME, "u indice"), ("40", WHITE, "40"), ("+", WHITE, None), ("9", RAISON, "9"),
                         ("×", WHITE, None), ("3", RAISON, "3"), ("=", WHITE, "égale"), ("67", JUSTE, "67")],
                        -1.55, centre=0, fs=50,
                        avec=[FadeIn(t67, scale=1.4), rg.cases[15].animate.set_stroke(JUSTE, width=6)])
        self.insister(c[-1], 1.3)
        self.attendre_voix(marge=0.6)

    # ── 07 : le piège : un saut de trop ────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("07-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(-4.75, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        rg = Rangee(21, -6.2, 5.0, 1.0, larg=0.42, haut=0.52, creux=0.17)
        fantome = DashedVMobject(rg.cases[20].copy().set_stroke(PIEGE, 3), num_dashes=14)
        n1, n20 = self.nom_case(rg, 0, "u₁", 26), self.nom_case(rg, 19, "u₂₀", 26)
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases[:20]], lag_ratio=0.05),
                  FadeIn(n1), FadeIn(n20), run_time=0.45)
        self.au_mot("Compter")
        st = self.t("Compter le rang au lieu des pas", 36, WHITE).move_to(P(0, 3.15)).align_to(P(-2.9, 0), LEFT)
        self.play(FadeIn(st, shift=DOWN * 0.1), *[Create(s) for s in rg.sauts], Create(fantome), run_time=0.35)
        self.play(LaggedStart(*[s.animate.set_color(RAISON if k < 19 else PIEGE) for k, s in enumerate(rg.sauts)],
                              lag_ratio=1.0), run_time=1.3)
        t88 = Text("88", font_size=38, color=PIEGE).next_to(fantome, RIGHT, buff=0.15)
        mal = self.calcul([("8", PIEGE, "8"), ("+", PIEGE, None), ("20", PIEGE, "20"), ("×", PIEGE, None),
                           ("4", PIEGE, "4"), ("=", PIEGE, "88"), ("88", PIEGE, None)], -0.35, centre=0, fs=48,
                          avec=[FadeIn(t88, scale=1.4)])
        self.suivre("4")
        p4 = self.t("+ 4", 30, PIEGE).next_to(rg.sauts[19], UP, buff=0.05)
        trop = self.t("4 de trop !", 40, PIEGE).move_to(P(0, -1.35))
        x1 = self.barrer(VGroup(fantome, t88), buff=0.05)
        x2 = self.barrer(mal, buff=0.1)
        self.play(FadeIn(p4, scale=1.3), FadeIn(trop, shift=UP * 0.1), run_time=0.3)
        self.play(Create(x1), Create(x2), run_time=0.35)
        self.suivre("19")
        ok = VGroup(self.coche(JUSTE, 0.22), self.t("de u₁ à u₂₀ : 19 pas", 42, JUSTE)).arrange(RIGHT, buff=0.25)
        ok.move_to(P(0, -2.45))
        self.play(Create(ok[0]), FadeIn(ok[1], shift=UP * 0.1), rg.cases[19].animate.set_stroke(JUSTE, width=6),
                  Indicate(rg.sauts[:19], color=RAISON, scale_factor=1.1), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 : v₄ = 30, r = −2, v₁₂ ? → A ──────────────

    def ecran_question2(self):
        q = self.poser_question("08-question",
                                [(self.t("Une suite arithmétique vérifie v₄ = 30,", 38), "30"),
                                 (self.t("et sa raison est −2.", 38), "2"),
                                 (self.t("Combien vaut v₁₂ ?", 38), "Combien")],
                                ["14", "46", "6"], 0)
        self.dire("08b-reponse")
        self.q_reponse(q, 0)
        self.sous_question(q, 9, ("v₄", "v₁₂"), "8 pas",
                           [("30", WHITE, "30"), ("+", WHITE, None), ("8", RAISON, "8"), ("×", WHITE, None),
                            ("(−2)", RAISON, "2"), ("=", WHITE, "égale"), ("14", JUSTE, "14")])

    # ── 09 : le défi des allumettes ────────────────────────────────────────

    X_ALLU, C_ALLU, Y_ALLU = (-6.2, -4.3, -1.45), 0.85, 0.95

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        dess = [rangee_carres(n, x, self.Y_ALLU, self.C_ALLU) for n, x in zip((1, 2, 3), self.X_ALLU)]
        xs = [x + n * self.C_ALLU / 2 for n, x in zip((1, 2, 3), self.X_ALLU)] + [4.0]
        lg = LigneTermes([str(v) for v in ALLU] + ["?"], xs=xs, centre=P(0, -0.45), largeur=1.15, hauteur=0.75,
                         fs=40)
        labs = [self.t(s, 32, GREY_A).move_to(P(x, 0.45))
                for s, x in zip(("1 carré", "2 carrés", "3 carrés", "50 carrés"), xs)]
        for k in range(3):
            self.suivre(str(k + 1))
            anc, nouv = dess[k]
            if k == 0:
                self.play(LaggedStart(*[Create(a) for a in anc], lag_ratio=0.2), FadeIn(labs[0]), run_time=0.45)
            else:
                prec = VGroup(*dess[k - 1][0], *dess[k - 1][1])
                self.play(TransformFromCopy(prec, anc), FadeIn(labs[k]), run_time=0.3)
                self.play(LaggedStart(*[FadeIn(a, scale=1.3) for a in nouv], lag_ratio=0.25), run_time=0.3)
            self.suivre(str(ALLU[k]))
            self.montrer_case(lg, k, run_time=0.3, nom=False)
        self.au_mot("Combien")
        q1 = self.t("Combien d'allumettes", 40, WHITE)
        q2 = self.t("pour 50 carrés ?", 40, RAISON)
        VGroup(q1, q2).arrange(RIGHT, buff=0.25).move_to(P(-0.4, -1.55))
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.3)
        self.suivre("50")
        pt = Text("…", font_size=48, color=GREY_A).move_to(P((xs[2] + xs[3]) / 2, -0.45))
        lg.cases[3][0].set_stroke(RAISON)
        self.play(FadeIn(q2, shift=UP * 0.1), FadeIn(labs[3]), FadeIn(pt), FadeIn(lg.cases[3], scale=0.8),
                  run_time=0.35)
        self.defi_pause(-2.6, x=-0.6)
        self._defi = (tit, dess, lg, labs, VGroup(q1, q2))

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, dess, lg, labs, qs = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 48, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), FadeOut(qs), run_time=0.4)
        self.suivre("3")
        for k in (0, 1):
            lg.sauts[k] = lg.saut(k, "+ 3", cote=DOWN, fs=32, creux=0.2)
        self.play(*[a[0].animate.set_color(RAISON) for d in dess[1:] for a in d[1]],
                  *[Create(s[0]) for s in lg.sauts.values()], *[FadeIn(s[1], scale=1.4) for s in lg.sauts.values()],
                  run_time=0.3)
        self.play(*[Indicate(d[1], color=RAISON, scale_factor=1.15) for d in dess[1:]], run_time=0.35)
        y = -2.2
        self.au_mot("raison")
        self.suivre("3")
        rr = VGroup(self.t("r =", 40, RAISON), self.t("3", 40, RAISON)).arrange(RIGHT, buff=0.15)
        rr.move_to(P(-5.2, y))
        self.play(FadeIn(rr, scale=1.3), run_time=0.3)
        self.suivre("1")
        u1 = VGroup(self.t("u₁ =", 40, TERME), self.t("4", 40, WHITE)).arrange(RIGHT, buff=0.15)
        u1.move_to(P(-2.75, y))
        self.play(FadeIn(u1[0], shift=UP * 0.1), run_time=0.25)
        self.suivre("4")
        self.play(FadeIn(u1[1], scale=1.4), Indicate(lg.cases[0], color=TERME), run_time=0.3)
        self.suivre("50")
        de = self.t("de u₁ à u₅₀ :", 40, WHITE)
        p49 = self.t("49 pas", 40, RAISON)
        VGroup(de, p49).arrange(RIGHT, buff=0.22).move_to(P(1.9, y))
        self.play(FadeIn(de, shift=UP * 0.1), run_time=0.3)
        self.suivre("49")
        self.play(FadeIn(p49, scale=1.3), run_time=0.3)
        t151 = Text("151", font_size=36, color=JUSTE).move_to(lg.cases[3])
        c = self.calcul([("u₅₀ =", TERME, "u indice"), ("4", WHITE, "4"), ("+", WHITE, None),
                         ("49", RAISON, "49"), ("×", WHITE, None), ("3", RAISON, "3"), ("=", WHITE, "égale"),
                         ("151", JUSTE, "151"), ("allumettes", JUSTE, None)], -3.08, centre=-0.6, fs=44,
                        avec=[FadeOut(lg.cases[3][1]), FadeIn(t151, scale=1.4),
                              lg.cases[3][0].animate.set_stroke(JUSTE, width=6)])
        self.insister(VGroup(c[-2], c[-1]), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        p1 = [self.t("Pour calculer un terme lointain :", fs, JAUNE_TITRE),
              VGroup(self.t("on part d'un terme connu et on compte les", fs), self.t("pas.", fs, RAISON)).arrange(
                  RIGHT, buff=0.18)]
        p2 = [self.t("uₙ = uₚ + (n − p) × r", 46, JUSTE)]
        p3 = [self.t("Si la suite commence à u₁ :", fs),
              VGroup(self.t("n − 1", fs, RAISON), self.t("pas jusqu'à uₙ.", fs)).arrange(RIGHT, buff=0.18)]
        self.finale([(p1, ["Pour calculer", "on part"]), (p2, ["u indice n égale"]),
                     (p3, ["Si la suite", "1 pas"])])

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_raison()
        self.ecran_compter()
        self.ecran_formules()
        self.ecran_question1()
        self.ecran_autre()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin()
