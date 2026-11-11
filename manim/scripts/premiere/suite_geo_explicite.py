# suite_geo_explicite.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite géométrique :
# la formule explicite » (16:9), ceinture VERTE. Série SUITES, épisode 13.
# Vidéo COMMUNE avec la 1re spé (suite_geometrique), branchée par `aussi`.
# Micro du coach : expo_suite_explicite (notion expo_suite_terme_general) :
# lib/tutor-v4/questionBank/premiere/maths/suites-geometriques.bank.ts
# + suites-geometriques-renfort.ts (gExpl0, gExpl1, gExplContexte, gExplCalcul,
# gExplLire ; indice « Rang 0 : uₙ = u₀ × qⁿ ; rang 1 : uₙ = u₁ × qⁿ⁻¹ »).
#
# Ce que demande le coach → écran :
#   · gExpl0 (uₙ = u₀ × qⁿ ; pièges u × q × n, q × uⁿ, taux en base) → 02, 04 ;
#   · gExpl1 (uₙ = u₁ × qⁿ⁻¹ ; piège qⁿ)          → 05-rang-1, 07 ;
#   · gExplContexte (la situation → la formule)  → 01 Elena, 02, 08 piège (0,2ⁿ) ;
#   · gExplCalcul (la puissance AVANT de multiplier) → 03-calcul, 05 (u₅ = 48) ;
#   · gExplLire (lire u₀ et q ; q⁰ = 1) + prouver (quotient constant) → 06, défi 09.
# Clé de voix → écran :
#   00-garde (rangée de cases, les petits sauts, puis UN grand saut « d'un seul coup »)
#   · 01 Elena, experte automobile : la voiture neuve 20 000 €, les barres de sa
#   valeur qui baissent (− 20 % par an), « dans 3 ans ? »
#   · 02 uₙ, u₀ = 20 000, − 20 % = × 0,8, q = 0,8, n sauts → « × 0,8ⁿ »,
#   uₙ = 20 000 × 0,8ⁿ · 03 u₃ : la puissance d'abord (0,512), 10 240 €
#   · 04/04b question (C : vₙ = 50 × 1,2ⁿ ; devant / base / exposant)
#   · 05 depuis u₁ : n − 1 pas, uₙ = 3 × 2ⁿ⁻¹, u₅ = 48 · 06 lire wₙ = 7 × 3ⁿ,
#   prouver : wₙ₊₁ ÷ wₙ = 3 · 07/07b question (B : tₙ = 400 × 0,9ⁿ⁻¹)
#   · 08 le piège 0,2ⁿ : la part perdue / ce qui reste · 09/09b défi u₁ = 6,
#   u₂ = 9 → q = 1,5, u₀ = 4, uₙ = 4 × 1,5ⁿ · 10 appris · 11 fin.
# Code couleur (module commun) : bleu = termes, orange = raison, sauts et
# exposant, vert = juste, rouge = piège. ⛔ Pas de LaTeX.
# Voix : manim/voix/premiere-suite-geo-explicite.json (débit −6),
# calée mot à mot par suite_geo_explicite_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_geo_explicite.py SuiteGeoExplicite1re -o eleveai-maths-premiere-suite-geo-explicite --media_dir manim/scripts/premiere/media-suite-geo-explicite
# Sortie : manim/sorties/premiere/maths/suites/13-geo-explicite/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_terme_rang import Rangee  # noqa: E402  (l'outil de l'épisode 04)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (« 20 000 » dans la voix)
from suite_geo_terme_rang import GRIS_SAUT, OutilsEp12, RangeeG  # noqa: E402  (l'épisode 12)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
assert abs(0.8 ** 3 - 0.512) < 1e-12 and abs(20000 * 0.512 - 10240) < 1e-9       # u₃ = 10 240 €
assert 3 * 2 ** 4 == 3 * 16 == 48                                                # u₅ = 48
assert 3 ** 0 == 1 and abs(7 * 3 ** 5 / (7 * 3 ** 4) - 3) < 1e-12                # w₀ = 7, quotient 3
assert abs(400 * 0.9 ** 0 - 400) < 1e-12                                         # Q2 → B
assert abs(20000 * 0.2 - 4000) < 1e-9                                            # le piège
assert 9 / 6 == 1.5 and 6 / 1.5 == 4 and 4 * 1.5 ** 2 == 4 * 2.25 == 9           # le défi

PEAU, CHEVEUX, VESTE = "#c68642", "#3b1f0e", "#475569"
CAISSE = "#8B5CF6"          # la voiture : violet (ni bleu, ni orange, ni rouge, ni vert)
ROSE = "#FCA5A5"            # une formule fausse reste LISIBLE sous le trait rouge


def elena(s=1.0):
    """Elena, experte automobile : cheveux longs, veste grise, une tablette."""
    dos = RoundedRectangle(width=0.74, height=0.95, corner_radius=0.3, fill_color=CHEVEUX, fill_opacity=1,
                           stroke_width=0).move_to(P(0, 0.85))
    tete = Circle(radius=0.3, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    frange = Arc(radius=0.31, start_angle=0.2, angle=PI - 0.4, fill_color=CHEVEUX, fill_opacity=1,
                 stroke_width=0).move_to(P(0, 1.25))
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.3, fill_color=VESTE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = Polygon(P(-0.16, 0.7), P(0.16, 0.7), P(0, 0.35), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    tab = RoundedRectangle(width=0.5, height=0.62, corner_radius=0.05, fill_color="#111827", fill_opacity=1,
                           stroke_color=GREY_A, stroke_width=2).move_to(P(0.5, 0.1)).rotate(-0.15)
    ecran = Rectangle(width=0.36, height=0.44, fill_color="#38BDF8", fill_opacity=0.5, stroke_width=0
                      ).move_to(tab).rotate(-0.15)
    bras = Line(P(0.3, 0.45), P(0.42, 0.05), stroke_color=VESTE, stroke_width=16)
    return VGroup(dos, corps, col, tete, frange, bras, tab, ecran).scale(s)


def voiture(s=1.0, couleur=CAISSE):
    """Une voiture vue de côté : la caisse, le toit, les vitres, deux roues."""
    caisse = RoundedRectangle(width=2.0, height=0.5, corner_radius=0.18, fill_color=couleur, fill_opacity=1,
                              stroke_width=0)
    toit = Polygon(P(-0.6, 0.22), P(0.55, 0.22), P(0.3, 0.68), P(-0.35, 0.68), fill_color=couleur,
                   fill_opacity=1, stroke_width=0)
    vitres = VGroup(Polygon(P(-0.48, 0.27), P(-0.06, 0.27), P(-0.06, 0.6), P(-0.3, 0.6)),
                    Polygon(P(0.02, 0.27), P(0.44, 0.27), P(0.25, 0.6), P(0.02, 0.6))
                    ).set_fill("#BFDBFE", 1).set_stroke(width=0)
    phare = Circle(radius=0.07, fill_color="#FEF08A", fill_opacity=1, stroke_width=0).move_to(P(0.9, 0.05))
    roues = VGroup(*[VGroup(Circle(radius=0.23, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                                   stroke_width=3),
                            Circle(radius=0.08, fill_color=GREY_B, fill_opacity=1, stroke_width=0)).move_to(P(x, -0.27))
                     for x in (-0.58, 0.58)])
    return VGroup(caisse, toit, vitres, phare, roues).scale(s)


def etiquette(texte, fs=36, couleur=TERME):
    """L'étiquette de prix : une carte à coin coupé, un trou, le prix."""
    tx = Text(texte, font_size=fs, color=WHITE)
    w, h = tx.width + 0.6, tx.height + 0.34
    carte = Polygon(P(-w / 2, -h / 2), P(w / 2, -h / 2), P(w / 2, h / 2), P(-w / 2 + 0.25, h / 2),
                    P(-w / 2, h / 2 - 0.25), fill_color=FOND_CARTE, fill_opacity=1, stroke_color=couleur,
                    stroke_width=3)
    trou = Circle(radius=0.05, stroke_color=couleur, stroke_width=2).move_to(P(-w / 2 + 0.17, h / 2 - 0.17))
    tx.move_to(carte).shift(RIGHT * 0.1)
    return VGroup(carte, trou, tx)


class SuiteGeoExplicite1re(AuditMilliers, OutilsEp12, PaysageSuites):
    fichier_marques = "suite_geo_explicite_marques.json"
    nom_voix = "premiere-suite-geo-explicite"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def ecran_garde(self):
        """La garde du module commun (géométrie de l'ép. 12) ; une ligne en deux
        morceaux à leur voix ; dessous, les petits sauts puis UN grand saut."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Suite géométrique", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Suite géométrique")
        self.play(Write(tit), run_time=0.7)
        y = tit.get_bottom()[1] - 0.5
        sous = self.t("la formule explicite", 40, TERME).move_to(P(0, y))
        self.au_mot("la formule")
        self.play(FadeIn(sous, shift=UP * 0.1), run_time=0.35)
        y -= 0.72
        l2 = self.t("Comment calculer n'importe quel terme", 40).move_to(P(0, y))
        y -= 0.6
        l3, (a, b) = self.ligne([("d'un seul coup,", RAISON), ("et lire une formule ?", WHITE)], 40)
        l3.move_to(P(0, y))
        ident = self.t(self.identite, 26, GREY_A, audit=False).move_to(P(0, y - 0.62))
        rg = RangeeG(13, -5.0, 3.8, -1.02, larges={0: 0.62, 12: 0.62}, larg=0.44, haut=0.46, creux=0.15, sw=3)
        n0 = self.nom_case(rg, 0, "u₀", 32)
        nn = self.nom_case(rg, 12, "uₙ", 32, TERME)
        self.au_mot("Comment")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(ident),
                  LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.05),
                  *[Create(s) for s in rg.sauts], FadeIn(n0), FadeIn(nn), run_time=0.4)
        self.au_mot("terme")
        self.allumer(rg.sauts, run_time=0.45)
        self.au_mot("seul coup")
        grand = self.grand_saut(rg, 0, 12, creux=0.3)
        self.play(FadeIn(a, shift=UP * 0.1), Create(grand), rg.cases[12].animate.set_stroke(RAISON, width=6),
                  rg.sauts.animate.set_color(GRIS_SAUT), run_time=0.5)
        self.au_mot("lire")
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.9)

    # ── 01 : Elena, experte automobile, et la voiture qui perd de sa valeur ─

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = elena(1.0).move_to(P(-5.2, 1.0))
        nom = self.t("Elena", 42, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        metier = VGroup(self.t("experte", 34, TERME), self.t("automobile", 34, TERME)).arrange(DOWN, buff=0.1)
        metier.next_to(nom, DOWN, buff=0.14)
        assur = VGroup(self.t("pour les", 30, GREY_A), self.t("assurances", 30, GREY_A)).arrange(DOWN, buff=0.08)
        assur.next_to(metier, DOWN, buff=0.3)
        self.au_mot("Elena")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("experte")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)
        self.au_mot("assurances")
        self.play(FadeIn(assur, shift=UP * 0.1), run_time=0.35)
        car = voiture(1.3).move_to(P(-1.3, 1.25))
        sol = Line(P(-2.9, 0.68), P(0.3, 0.68), stroke_color="#64748B", stroke_width=4)
        self.au_mot("voiture neuve")
        l1 = self.t("une voiture neuve", 38).move_to(P(3.9, 1.9))
        self.play(FadeIn(car, shift=RIGHT * 0.6), FadeIn(sol), FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.suivre("20 000")
        tag = etiquette("20 000 €", 36).move_to(P(-1.3, -0.2))
        l2 = self.t("20 000 €", 48, TERME).move_to(P(3.9, 1.2))
        # les barres de la valeur, année après année : chacune 0,8 fois la précédente
        hs = [2.0 * 0.8 ** k for k in range(4)]
        barres = VGroup(*[Rectangle(width=0.75, height=h, fill_color=TERME, fill_opacity=0.85, stroke_width=0)
                          for h in hs]).arrange(RIGHT, buff=0.55, aligned_edge=DOWN)
        barres.move_to(P(2.4, 0)).align_to(P(0, -2.85), DOWN)
        lab0 = self.t("neuve", 30, GREY_A).next_to(barres[0], DOWN, buff=0.12)
        self.play(FadeIn(tag, scale=1.2), FadeIn(l2, scale=1.3), GrowFromEdge(barres[0], DOWN), FadeIn(lab0),
                  run_time=0.45)
        self.au_mot("chaque année")
        l3 = VGroup(self.t("chaque année :", 38), self.t("− 20 %", 46, RAISON)).arrange(DOWN, buff=0.14)
        l3.move_to(P(4.6, 0.0))
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.suivre("20")
        self.play(FadeIn(l3[1], shift=UP * 0.1),
                  LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres[1:]], lag_ratio=0.5), run_time=1.0)
        self.au_mot("ce qu'elle vaudra")
        self.suivre("3")
        qq = self.t("Combien vaudra-t-elle dans 3 ans ?", 44, RAISON).move_to(P(0, 3.25))
        lab3 = self.t("dans 3 ans", 30, RAISON).next_to(barres[3], DOWN, buff=0.12)
        pq = Text("?", font_size=48, color=RAISON).next_to(barres[3], UP, buff=0.12)
        self.play(FadeIn(qq, shift=DOWN * 0.1), FadeIn(lab3), FadeIn(pq, scale=1.6),
                  barres[3].animate.set_fill(RAISON, 0.85), run_time=0.4)
        self.play(Indicate(pq, color=RAISON, scale_factor=1.4), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 02 : uₙ, u₀ = 20 000, − 20 % = × 0,8, n sauts → uₙ = 20 000 × 0,8ⁿ ─

    def rangee_voiture(self, y=0.1):
        """u₀ (large : « 20 000 » y tient), u₁, u₂, u₃, …, uₙ ; les sauts éteints."""
        rg = RangeeG(5, -4.6, 2.9, y, larges={0: 2.1}, larg=0.95, haut=0.85, creux=0.22, sw=4, sauts=False)
        sauts = [rg.fleche(k, k + 1, 0.24, 4, GRIS_SAUT) for k in range(3)]
        tard = DashedVMobject(rg.fleche(3, 4, 0.24, 4, GRIS_SAUT), num_dashes=9)
        pts = Text("…", font_size=40, color=GREY_A).move_to(P(1.96, y))
        noms = [self.nom_case(rg, k, nm, 34, TERME if k == 4 else GREY_A)
                for k, nm in enumerate(("u₀", "u₁", "u₂", "u₃", "uₙ"))]
        return rg, sauts, tard, pts, noms

    def ecran_formule(self):
        self.nouvel_ecran("02-formule")
        note, (n1, n2) = self.ligne([("uₙ", TERME), ("= la valeur de la voiture n années après l'achat", WHITE)], 38)
        note.move_to(P(0, 3.15))
        self.au_mot("u indice n")
        self.play(FadeIn(n1, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("la valeur")
        self.play(FadeIn(n2, shift=DOWN * 0.1), run_time=0.35)
        rg, sauts, tard, pts, noms = self.rangee_voiture()
        self.au_mot("la suite commence")
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.08), FadeIn(pts),
                  *[FadeIn(n) for n in noms], run_time=0.45)
        l0, (a0, b0) = self.ligne([("u₀ =", TERME), ("20 000", WHITE)], 48)
        l0.move_to(P(-4.75, 2.1))
        self.au_mot("u indice 0")
        self.play(FadeIn(a0, shift=UP * 0.1), Indicate(noms[0], color=TERME), run_time=0.3)
        self.suivre("20 000")
        self.play(FadeIn(b0, scale=1.4), run_time=0.25)
        self.ecrire_case(rg, 0, "20 000", WHITE, 42)
        lr, (r1, r2, r3) = self.ligne([("− 20 %", PIEGE), ("=", WHITE), ("× 0,8", RAISON)], 48)
        lr.move_to(P(0.85, 2.1))
        self.au_mot("Baisser")
        self.suivre("20")
        self.play(FadeIn(r1, scale=1.3), run_time=0.3)
        self.au_mot("multiplier")
        self.suivre("0,8")
        labs = [self.t("× 0,8", 32, RAISON).next_to(s, UP, buff=0.05) for s in sauts]
        self.play(FadeIn(r2), FadeIn(r3, scale=1.3), *[Create(s) for s in sauts], Create(tard),
                  *[FadeIn(l, scale=1.3) for l in labs], run_time=0.45)
        lq, (aq, bq) = self.ligne([("q =", RAISON), ("0,8", RAISON)], 50)
        lq.move_to(P(5.05, 2.1))
        self.au_mot("q égale")
        self.play(FadeIn(aq, shift=UP * 0.1), run_time=0.25)
        self.suivre("0,8")
        cad = self.encadre(lq, RAISON, 0.16)
        self.play(FadeIn(bq, scale=1.4), Create(cad), run_time=0.3)
        self.insister(VGroup(lq, cad), 1.12)
        self.au_mot("Après n")
        self.play(Indicate(noms[4], color=TERME, scale_factor=1.4), rg.cases[4].animate.set_stroke(TERME, width=6),
                  run_time=0.45)
        self.au_mot("n fois")
        yb = noms[0].get_bottom()[1] - 0.12
        grand = CurvedArrow(P(-4.6, yb), P(2.9, yb), angle=4 * np.arctan(2 * 0.45 / 7.5), color=RAISON,
                            stroke_width=6, tip_length=0.22)
        lab_n, _ = self.ligne([("n fois", RAISON), ("× 0,8", RAISON)], 44)
        lab_n.next_to(grand, DOWN, buff=0.08)
        lab_p = Text("× 0,8ⁿ", font_size=50, color=RAISON).move_to(lab_n)
        lab_p._pas_audit = True  # le regroupement des sauts déjà dits (0,8), pas un nombre nouveau
        self.allumer(sauts + [tard], run_time=0.8,
                     avec=[*[l.animate.set_color(RAISON) for l in labs]])
        self.play(Create(grand), FadeIn(lab_n, shift=UP * 0.1), run_time=0.45)
        f = self.calcul([("uₙ =", TERME, "u indice n égale"), ("20 000", WHITE, "20 000"), ("×", WHITE, None),
                         ("0,8", WHITE, "0,8"), ("ⁿ", RAISON, "puissance")], -2.85, centre=-0.8, fs=58,
                        avec_morceau={4: [ReplacementTransform(lab_n, lab_p)]})
        cadre = self.encadre(f, JUSTE, 0.2)
        self.play(Create(cadre), Indicate(f[-1], color=RAISON, scale_factor=1.6), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 03 : u₃ : la puissance d'abord, puis la multiplication ─────────────

    def ecran_calcul(self):
        self.nouvel_ecran("03-calcul")
        rappel, _ = self.ligne([("uₙ =", GREY_A), ("20 000", GREY_A), ("×", GREY_A), ("0,8", GREY_A),
                                ("ⁿ", GREY_A)], 36)
        rappel.move_to(P(0, 3.2))
        l1 = self.calcul([("u₃ =", TERME, "u indice 3"), ("20 000", WHITE, "20 000"), ("×", WHITE, None),
                          ("0,8", WHITE, "0,8"), ("³", RAISON, "puissance 3")], 1.9, centre=-0.4, fs=58,
                         avec_morceau={0: [FadeIn(rappel)]})
        pw = VGroup(l1[3], l1[4])
        self.au_mot("d'abord")
        y_s = l1.get_bottom()[1] - 0.15
        s1 = Line(P(pw.get_left()[0] - 0.05, y_s), P(pw.get_right()[0] + 0.05, y_s), stroke_color=RAISON,
                  stroke_width=5)
        e1 = self.t("d'abord", 36, RAISON).next_to(s1, DOWN, buff=0.12)
        self.play(Create(s1), FadeIn(e1, shift=UP * 0.1), Indicate(pw, color=RAISON, scale_factor=1.2), run_time=0.5)
        l2 = self.calcul([("0,8", WHITE, "0,8"), ("³", RAISON, None), ("=", WHITE, "égale"), ("0,512", RAISON, "0,512")],
                         0.1, centre=-0.4, fs=58)
        self.insister(l2[-1], 1.2)
        l3 = self.calcul([("u₃ =", TERME, "Puis"), ("20 000", WHITE, "20 000"), ("×", WHITE, None),
                          ("0,512", RAISON, "0,512"), ("=", WHITE, "égale"), ("10 240 €", JUSTE, "10 240")],
                         -1.35, centre=0, fs=52)
        car = voiture(1.0).move_to(P(-3.6, -2.75))
        tag = etiquette("10 240 €", 36, JUSTE).next_to(car, RIGHT, buff=0.4)
        dans = self.t("dans 3 ans", 34, GREY_A).next_to(tag, RIGHT, buff=0.35)
        cadre = self.encadre(l3[-1], JUSTE, 0.14)
        self.play(Create(cadre), FadeIn(car, shift=RIGHT * 0.5), FadeIn(tag, scale=1.2), FadeIn(dans), run_time=0.45)
        self.insister(VGroup(l3[-1], cadre), 1.15)
        self.attendre_voix(marge=0.5)

    # ── la correction d'une question-pause : la bonne monte, la place se libère ──

    def degager(self, q, bonne, ok, y=2.12, avec=()):
        autres = [q.cartes[j] for j in range(3) if j != bonne]
        bon = VGroup(q.cartes[bonne], ok)
        self.play(*[FadeOut(m) for m in autres], FadeOut(q.question), bon.animate.move_to(P(0, y)), *avec,
                  run_time=0.4)

    def fleche_vers(self, a, b, couleur, sw=4):
        return Arrow(a, b, buff=0.08, color=couleur, stroke_width=sw, tip_length=0.18,
                     max_tip_length_to_length_ratio=0.3)

    # ── 04 : question-pause n° 1 : v₀ = 50, q = 1,2 → C (vₙ = 50 × 1,2ⁿ) ──

    def ecran_question1(self):
        q = self.poser_question("04-question",
                                [(self.t("Une suite géométrique a pour premier terme v₀ = 50", 38), "50"),
                                 (self.t("et pour raison 1,2.", 38), "1,2"),
                                 (self.t("Pour tout entier naturel n :", 38), "Pour tout")],
                                [self.t(c, 44) for c in ("vₙ = 50 × 1,2 × n", "vₙ = 1,2 × 50ⁿ", "vₙ = 50 × 1,2ⁿ")],
                                2, largeur=7.6, fs=44)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 2)
        self.degager(q, 2, ok)
        f, (f0, f1, f2, f3, f4) = self.ligne([("vₙ =", TERME), ("50", TERME), ("×", WHITE), ("1,2", RAISON),
                                              ("ⁿ", RAISON)], 84)
        f.move_to(P(-0.4, 0.05))
        self.au_mot("premier terme")
        self.play(FadeIn(f, scale=1.1), run_time=0.35)
        l1 = self.t("le premier terme", 36, TERME).move_to(P(f1.get_center()[0] - 1.6, -1.55))
        self.play(GrowArrow(self.fleche_vers(f1.get_bottom(), l1.get_top(), TERME)), FadeIn(l1, shift=UP * 0.1),
                  Indicate(f1, color=TERME, scale_factor=1.25), run_time=0.45)
        self.au_mot("la raison")
        l2 = VGroup(self.t("la raison", 36, RAISON), self.t("= la base", 36, RAISON)).arrange(DOWN, buff=0.08)
        l2.move_to(P(f3.get_center()[0] + 1.6, -1.75))
        self.play(GrowArrow(self.fleche_vers(f3.get_bottom(), l2.get_top(), RAISON)), FadeIn(l2, shift=UP * 0.1),
                  Indicate(f3, color=RAISON, scale_factor=1.25), run_time=0.45)
        self.au_mot("exposant")
        l3 = self.t("n en exposant", 36, RAISON)
        l3.move_to(P(min(f4.get_center()[0] + 1.3, 6.3 - l3.width / 2), 1.3))
        self.play(GrowArrow(self.fleche_vers(l3.get_bottom(), f4.get_top(), RAISON)),
                  FadeIn(l3, shift=LEFT * 0.1), Indicate(f4, color=RAISON, scale_factor=1.6), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 05 : le rang de départ : depuis u₁, l'exposant perd 1 ──────────────

    def ecran_rang1(self):
        self.nouvel_ecran("05-rang-1")
        self.titre("Si la suite commence à u₁", JAUNE_TITRE, 46, extrait="Si la suite")
        rg = Rangee(5, -4.9, 0.7, 0.25, larg=0.95, haut=0.82, creux=0.22, sw=4)
        rg.sauts.set_color(GRIS_SAUT)
        noms = [self.nom_case(rg, k, u(k + 1), 34) for k in range(5)]
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.08),
                  *[Create(s) for s in rg.sauts], *[FadeIn(n) for n in noms], run_time=0.45)
        lab = self.t("l'exposant perd 1", 40, RAISON).move_to(P(4.0, 2.15))
        self.au_mot("l'exposant")
        self.suivre("1")
        self.play(FadeIn(lab, scale=1.2), run_time=0.35)
        f, (g0, g1, g2, g3, g4) = self.ligne([("uₙ =", TERME), ("u₁", TERME), ("×", WHITE), ("q", RAISON),
                                              ("ⁿ⁻¹", RAISON)], 62)
        f.move_to(P(-2.9, 2.15))
        self.au_mot("u indice n égale")
        self.play(FadeIn(VGroup(g0, g1, g2), shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("q puissance")
        self.play(FadeIn(g3, scale=1.3), run_time=0.25)
        self.au_mot("n moins 1")
        fl = self.fleche_vers(lab.get_left(), g4.get_right(), RAISON)
        self.play(FadeIn(g4, scale=1.5), GrowArrow(fl), run_time=0.35)
        self.insister(g4, 1.35)
        t3 = Text("3", font_size=40, color=WHITE).move_to(rg.cases[0])
        labs = [self.t("× 2", 30, RAISON).next_to(s, UP, buff=0.04) for s in rg.sauts]
        self.calcul([("u₁ =", TERME, "u indice 1 égale"), ("3", WHITE, "3"), ("et", WHITE, "et"),
                     ("q =", RAISON, "q égale"), ("2", RAISON, "2"), (":", WHITE, None),
                     ("uₙ =", TERME, "u indice n égale"), ("3", WHITE, "3"), ("×", WHITE, None),
                     ("2", WHITE, "2"), ("ⁿ⁻¹", RAISON, "puissance")], -1.35, centre=-0.6, fs=50,
                    avec_morceau={1: [FadeIn(t3, scale=1.4)], 4: [FadeIn(l, scale=1.3) for l in labs]})
        q5 = Text("?", font_size=40, color=RAISON).move_to(rg.cases[4])
        pas = self.t("4 pas", 40, RAISON).next_to(rg, RIGHT, buff=0.5)
        l2 = self.calcul([("u₅ =", TERME, "u indice 5"), ("3", WHITE, "3"), ("×", WHITE, None), ("2", WHITE, "2"),
                          ("⁴", RAISON, "4"), ("=", WHITE, "égale"), ("3", WHITE, "3"), ("×", WHITE, None),
                          ("16", WHITE, "16"), ("=", WHITE, "égale"), ("48", JUSTE, "48")], -2.6, centre=-0.6, fs=54,
                         avec_morceau={0: [FadeIn(q5, scale=1.5), rg.cases[4].animate.set_stroke(RAISON, width=6)],
                                       4: [LaggedStart(*[s.animate.set_color(RAISON) for s in rg.sauts],
                                                       lag_ratio=0.6), FadeIn(pas, scale=1.3)]})
        t48 = Text("48", font_size=40, color=JUSTE).move_to(rg.cases[4])
        self.play(FadeOut(q5), FadeIn(t48, scale=1.4), rg.cases[4].animate.set_stroke(JUSTE, width=6), run_time=0.3)
        self.insister(l2[-1], 1.3)
        self.attendre_voix(marge=0.6)

    # ── 06 : lire wₙ = 7 × 3ⁿ ; prouver : wₙ₊₁ ÷ wₙ = 3 ─────────────────────

    def ecran_lire(self):
        self.nouvel_ecran("06-lire-prouver")
        self.titre("Dans l'autre sens : lire la formule", JAUNE_TITRE, 46, extrait="Dans l'autre sens")
        f = self.calcul([("wₙ =", TERME, "w indice n égale"), ("7", TERME, "7"), ("×", WHITE, None),
                         ("3", RAISON, "3"), ("ⁿ", RAISON, "puissance n")], 1.75, centre=0, fs=84)
        sept, trois = f[1], f[3]
        self.au_mot("le nombre devant")
        a1 = VGroup(self.t("le nombre devant :", 36, TERME), self.t("le premier terme", 36, TERME))
        a1.arrange(DOWN, buff=0.08).move_to(P(-3.9, 0.3))
        self.play(GrowArrow(self.fleche_vers(sept.get_bottom() + LEFT * 0.1, a1.get_corner(UR) + P(-0.5, 0.1), TERME)),
                  FadeIn(a1[0], shift=UP * 0.1), Indicate(sept, color=TERME, scale_factor=1.3), run_time=0.45)
        self.au_mot("premier terme")
        self.play(FadeIn(a1[1], shift=UP * 0.1), run_time=0.3)
        w0 = self.calcul([("w₀ =", TERME, "w indice 0"), ("7", TERME, "7")], -0.75, centre=-3.9, fs=48)
        l3 = self.calcul([("car", WHITE, "car"), ("3", WHITE, "3"), ("⁰", RAISON, "puissance 0"), ("=", WHITE, "égale"),
                          ("1", WHITE, "1")], -1.45, centre=-3.9, fs=40)
        self.au_mot("La base")
        a2 = self.t("la base :", 36, RAISON).move_to(P(3.6, 0.45))
        self.play(GrowArrow(self.fleche_vers(trois.get_bottom() + RIGHT * 0.1, a2.get_top() + LEFT * 0.4, RAISON)),
                  FadeIn(a2, shift=UP * 0.1), Indicate(trois, color=RAISON, scale_factor=1.3), run_time=0.45)
        self.au_mot("la raison")
        a3 = VGroup(self.t("la raison", 40, RAISON), self.t("q = 3", 48, RAISON)).arrange(DOWN, buff=0.3)
        a3.next_to(a2, DOWN, buff=0.18)
        cad = self.encadre(a3[1], RAISON, 0.12)
        self.play(FadeIn(a3, shift=UP * 0.1), Create(cad), run_time=0.4)
        self.au_mot("Pour prouver")
        pr = self.t("Prouver qu'elle est géométrique :", 38, JAUNE_TITRE).move_to(P(-1.0, -2.2))
        self.play(FadeIn(pr, shift=UP * 0.1), run_time=0.35)
        quo = self.calcul([("wₙ₊₁ ÷ wₙ", TERME, "w indice n plus 1"), ("=", WHITE, "on trouve"), ("3", RAISON, "3")],
                          -3.0, centre=-3.9, fs=50)
        self.au_mot("ne dépend pas")
        nd = VGroup(self.t("ne dépend pas de n", 38, JUSTE), self.coche(JUSTE, 0.22)).arrange(RIGHT, buff=0.2)
        nd.next_to(quo, RIGHT, buff=0.5)
        self.play(FadeIn(nd, shift=LEFT * 0.1), Indicate(quo[-1], color=RAISON, scale_factor=1.4), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 : t₁ = 400, q = 0,9 → B (400 × 0,9ⁿ⁻¹) ───

    def ecran_question2(self):
        q = self.poser_question("07-question",
                                [(self.t("Une suite géométrique commence à t₁ = 400,", 38), "400"),
                                 (self.t("et sa raison est 0,9.", 38), "0,9"),
                                 (self.t("Pour tout entier n ≥ 1 :", 38), "égal à 1")],
                                [self.t(c, 44) for c in ("tₙ = 400 × 0,9ⁿ", "tₙ = 400 × 0,9ⁿ⁻¹", "tₙ = 400 − 10n")],
                                1, largeur=7.6, fs=44)
        self.dire("07b-reponse")
        ok = self.q_reponse(q, 1)
        self.degager(q, 1, ok)
        rg = Rangee(4, -3.4, 1.6, 0.35, larg=1.2, haut=0.8, creux=0.22, sw=4, sauts=False)
        noms = [self.nom_case(rg, k, nm, 34) for k, nm in enumerate(("t₁", "t₂", "t₃", "t₄"))]
        self.au_mot("On vérifie")
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.08),
                  *[FadeIn(n) for n in noms], run_time=0.35)
        zero = self.t("0 pas", 40, RAISON).next_to(rg.cases[0], LEFT, buff=0.5)
        c = self.calcul([("t₁ =", TERME, "t indice 1"), ("400", WHITE, "400"), ("×", WHITE, None), ("0,9", WHITE, "0,9"),
                         ("⁰", RAISON, "0"), ("=", WHITE, "égale"), ("400", JUSTE, "400")], -1.4,
                        centre=-0.5, fs=58, avec_morceau={4: [FadeIn(zero, scale=1.3)]})
        t400 = Text("400", font_size=30, color=JUSTE).move_to(rg.cases[0])
        self.play(FadeIn(t400, scale=1.4), rg.cases[0].animate.set_stroke(JUSTE, width=6), run_time=0.3)
        self.insister(c[-1], 1.25)
        self.attendre_voix(marge=0.6)

    # ── 08 : le piège : 20 000 × 0,2ⁿ (la part perdue n'est pas la raison) ─

    def ecran_piege(self):
        self.nouvel_ecran("08-piege")
        self.au_mot("piège")
        tit = self.t("Le piège !", 50, PIEGE).move_to(P(0, 3.15))
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        mal = self.calcul([("20 000", ROSE, "20 000"), ("×", ROSE, None), ("0,2", ROSE, "0,2"), ("ⁿ", ROSE, "puissance")],
                          2.05, centre=-0.4, fs=62)
        x0, x1, xm, yb = -4.4, 3.8, 2.16, 0.3
        reste = Rectangle(width=xm - x0, height=0.62, fill_color=RAISON, fill_opacity=0.8, stroke_color=WHITE,
                          stroke_width=2).move_to(P((x0 + xm) / 2, yb))
        perdue = Rectangle(width=x1 - xm, height=0.62, fill_color=PIEGE, fill_opacity=0.85, stroke_color=WHITE,
                           stroke_width=2).move_to(P((xm + x1) / 2, yb))
        car = voiture(0.7).next_to(reste, LEFT, buff=0.25)
        self.au_mot("part perdue")
        lp = self.t("la part perdue : 0,2", 36, PIEGE).move_to(P((xm + x1) / 2 + 0.3, yb + 0.75))
        trait = self.barre_lisible(mal, sw=4)
        x = self.croix(P(mal.get_right()[0] + 0.75, 2.05))
        self.play(Create(trait), Create(x), FadeIn(reste), FadeIn(perdue, shift=DOWN * 0.15), FadeIn(car),
                  FadeIn(lp, shift=DOWN * 0.1), run_time=0.5)
        lr, (r1, r2) = self.ligne([("la raison = ce qui reste :", RAISON), ("0,8", RAISON)], 40)
        lr.move_to(P((x0 + xm) / 2, yb - 0.8))
        self.au_mot("la raison")
        self.play(FadeIn(r1, shift=UP * 0.1), Indicate(reste, color=RAISON, scale_factor=1.04), run_time=0.4)
        self.suivre("0,8")
        cad = self.encadre(r2, RAISON, 0.1)
        self.play(FadeIn(r2, scale=1.4), Create(cad), run_time=0.3)
        car2 = voiture(0.8).move_to(P(-5.6, -1.9))
        fin = self.calcul([("avec 0,2 :", PIEGE, "Avec"), ("4 000 €", PIEGE, "4 000"), ("au bout d'un an !", PIEGE, "au bout")],
                          -1.9, centre=0.6, fs=40, avec_morceau={0: [FadeIn(car2, shift=RIGHT * 0.4)]})
        self.play(Indicate(fin[1], color=PIEGE, scale_factor=1.25), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi : u₁ = 6, u₂ = 9 → q, u₀, uₙ ─────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        enonce = self.t("Une suite géométrique à termes positifs", 40).move_to(P(0, 2.3))
        self.au_mot("Une suite")
        self.play(FadeIn(enonce, shift=UP * 0.1), run_time=0.3)
        rg = Rangee(3, -3.1, 1.9, 0.95, larg=1.25, haut=0.85, creux=0.3, sauts=False)
        noms = [self.nom_case(rg, k, u(k), 38) for k in range(3)]
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.1), run_time=0.35)
        self.au_mot("u indice 1")
        self.play(FadeIn(noms[1]), rg.cases[1].animate.set_stroke(TERME, width=6), run_time=0.25)
        self.suivre("6")
        self.ecrire_case(rg, 1, "6", WHITE, 44)
        self.au_mot("u indice 2")
        self.play(FadeIn(noms[2]), rg.cases[2].animate.set_stroke(TERME, width=6), run_time=0.25)
        self.suivre("9")
        self.ecrire_case(rg, 2, "9", WHITE, 44)
        taches, (t1, s1, t2, s2, t3) = self.ligne([("la raison q ?", RAISON), ("·", GREY_B), ("u₀ ?", RAISON),
                                                   ("·", GREY_B), ("uₙ en fonction de n ?", RAISON)], 40)
        taches.move_to(P(-0.4, -0.75))
        self.au_mot("raison")
        self.play(FadeIn(t1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("puis u indice 0")
        q0 = Text("?", font_size=44, color=RAISON).move_to(rg.cases[0])
        self.play(FadeIn(s1), FadeIn(t2, shift=UP * 0.1), FadeIn(noms[0]), FadeIn(q0, scale=1.5),
                  rg.cases[0].animate.set_stroke(RAISON, width=5), run_time=0.3)
        self.au_mot("écris")
        self.play(FadeIn(s2), FadeIn(t3, shift=UP * 0.1), run_time=0.3)
        self.defi_pause(-2.3, x=-0.6)
        self._defi = (tit, enonce, taches, rg, q0)

    def recul(self, rg, i, j, creux=0.3):
        """La flèche « ÷ q » de la case i à la case j (à GAUCHE), par-dessus les cases."""
        d = rg.cases[i].get_top() + 0.05 * UP + LEFT * 0.22
        f = rg.cases[j].get_top() + 0.05 * UP + RIGHT * 0.12
        angle = 4 * np.arctan(2 * creux / max(np.linalg.norm(f - d), 0.1))
        return CurvedArrow(d, f, angle=angle, color=TERME, stroke_width=4, tip_length=0.14)

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, enonce, taches, rg, q0 = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 48, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), FadeOut(enonce), FadeOut(taches), run_time=0.4)
        av = rg.fleche(1, 2, 0.3, 4, RAISON)
        lav = self.t("× 1,5", 34, RAISON).next_to(av, UP, buff=0.05)
        self.calcul([("q =", RAISON, "raison"), ("9", WHITE, "9"), ("÷", WHITE, None), ("6", WHITE, "6"),
                     ("=", WHITE, "égale"), ("1,5", RAISON, "1,5")], -0.45, centre=-0.8, fs=48,
                    avec_morceau={5: [Create(av), FadeIn(lav, scale=1.3)]})
        ar = self.recul(rg, 1, 0)
        lar = self.t("÷ 1,5", 34, TERME).next_to(ar, UP, buff=0.05)
        self.au_mot("reculer")
        self.play(Create(ar), run_time=0.3)
        self.au_mot("on divise")
        self.play(FadeIn(lar, scale=1.3), run_time=0.25)
        t4 = Text("4", font_size=44, color=JUSTE).move_to(rg.cases[0])
        self.calcul([("u₀ =", TERME, "u indice 0"), ("6", WHITE, "6"), ("÷", WHITE, None), ("1,5", WHITE, "1,5"),
                     ("=", WHITE, "égale"), ("4", JUSTE, "4")], -1.35, centre=-0.8, fs=48,
                    avec_morceau={5: [FadeOut(q0), FadeIn(t4, scale=1.4), rg.cases[0].animate.set_stroke(JUSTE, width=6)]})
        f = self.calcul([("uₙ =", TERME, "Donc"), ("4", WHITE, "4"), ("×", WHITE, None), ("1,5", WHITE, "1,5"),
                         ("ⁿ", RAISON, "puissance n")], -2.3, centre=-0.8, fs=52)
        cad = self.encadre(f, JUSTE, 0.14)
        self.play(Create(cad), run_time=0.3)
        v = self.calcul([("u₂ =", TERME, "u indice 2"), ("4", WHITE, "4"), ("×", WHITE, None), ("2,25", WHITE, "2,25"),
                         ("=", WHITE, "égale"), ("9", JUSTE, "9")], -3.25, centre=-0.8, fs=46)
        ok = self.coche(JUSTE, 0.22).next_to(v, RIGHT, buff=0.35)
        self.play(Create(ok), rg.cases[2].animate.set_stroke(JUSTE, width=6), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 42
        p1 = [self.t("La formule explicite :", fs, JAUNE_TITRE),
              Text("uₙ = u₀ × qⁿ", font_size=54, color=JUSTE, t2c={"ⁿ": RAISON}),
              Text("ou  uₙ = u₁ × qⁿ⁻¹", font_size=54, color=JUSTE, t2c={"ⁿ⁻¹": RAISON})]
        p2 = [VGroup(self.t("On calcule", fs), self.t("la puissance", fs, RAISON)).arrange(RIGHT, buff=0.18),
              self.t("avant de multiplier.", fs)]
        p3 = [self.t("Suite géométrique :", fs, JAUNE_TITRE),
              VGroup(Text("uₙ₊₁ ÷ uₙ", font_size=fs + 4, color=TERME), self.t("ne dépend pas de n.", fs)
                     ).arrange(RIGHT, buff=0.22)]
        self.finale([(p1, ["La formule", "u indice n égale", "ou u indice 1"]), (p2, ["On calcule", "avant"]),
                     (p3, ["pour montrer", "le quotient"])], cle="10-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_formule()
        self.ecran_calcul()
        self.ecran_question1()
        self.ecran_rang1()
        self.ecran_lire()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin(cle="11-abonne")
