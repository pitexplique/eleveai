# suite_evolution.py
# EleveAI — Maths 1re spé (programme 2026) — paysage « Évolutions en pourcentage »
# (16:9), ceinture VERTE. Série SUITES, épisode 22.
# Micro du coach : suite_evolution (lib/tutor-v4/questionBank/premiere-spe/maths/
# suites.bank.ts + suites-renfort.ts : coefficient multiplicateur 1 ± t/100,
# évolutions successives (on multiplie les coefficients), + 10 % puis − 10 %,
# coefficient réciproque, linéaire / exponentiel, loyer sur plusieurs années).
#
# Ce que demande le coach → écran :
#   · traduire une évolution de t % par un coefficient (hausse, baisse)       → 02, 04 ;
#   · capital placé à t % par an : suite géométrique, uₙ = u₀ × qⁿ           → 03 ;
#   · linéaire (+ nombre fixe, arithmétique) / exponentiel (+ %, géométrique) → 05 ;
#   · évolutions successives : on multiplie (+ 10 % puis − 10 % ≠ 0)         → 06, défi ;
#   · coefficient réciproque (revenir au départ)                              → 07 ;
#   · le défi : loyer + 2 % par an pendant 3 ans, taux global                 → 08, 08b.
# Clé de voix → écran :
#   00-garde (le prix qui monte puis descend, sous le départ) · 01 Emma,
#   conseillère bancaire, le client et ses 1 000 € · 02 + 3 % → × 1,03 ;
#   − 20 % → × 0,8 · 03 uₙ = 1 000 × 1,03ⁿ, u₂ = 1 060,90 · 04/04b question
#   (A : baisse de 15 %) · 05 offre A (+ 40 €) / offre B (+ 3 %), 10 et 20 ans ·
#   06 le piège 1,1 × 0,9 = 0,99 · 07/07b question (C : 20 %) · 08/08b défi du
#   loyer (636,72 € ; + 6,12 %) · 09 « Ce que tu as appris » · 10 fin.
# Code couleur (module commun) : bleu = termes (le capital), orange = la hausse
# et les coefficients, vert = juste, rouge = la baisse et le piège.
# Voix : manim/voix/premiere-spe-suite-evolution.json (débit −6), calée mot à mot
# par suite_evolution_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run … (BORD6 : un
# texte à moins de 6 % du bord gauche ou droit, exigence du 13/11).
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_evolution.py SuiteEvolution1reSpe -o eleveai-maths-premiere-spe-suite-evolution --media_dir manim/scripts/premiere/media-suite-evolution
# Sortie : manim/sorties/premiere-spe/maths/suites/22-evolution/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique, nuage_mini  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16 : calc, boutons_ligne)
from suite_modeliser import SuiteModeliser1reSpe as _P21  # noqa: E402  (ép. 21 : ligne sans ligature)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
proche = lambda a, b, e=1e-9: abs(a - b) < e  # noqa: E731
assert proche(1 + 0.03, 1.03) and proche(1 - 0.2, 0.8)                         # 02
assert proche(1000 * 1.03 ** 2, 1060.90)                                        # 03
assert proche(1 - 0.85, 0.15)                                                   # question 1 : A (15 %)
assert 1000 + 10 * 40 == 1400 and proche(round(1000 * 1.03 ** 10, 2), 1343.92)  # 05 : 10 ans
assert 1000 + 20 * 40 == 1800 and round(1000 * 1.03 ** 20) == 1806              # 05 : 20 ans, B devant
assert proche(1.1 * 0.9, 0.99)                                                  # 06 : − 1 %
assert proche(1 / 1.25, 0.8)                                                    # question 2 : C (20 %)
assert proche(round(600 * 1.02 ** 3, 2), 636.72) and proche(round(1.02 ** 3, 4), 1.0612)  # défi

PEAU, CHEVEUX, VESTE = "#e0ac69", "#1f1300", "#1E3A8A"
ROSE, BOIS = "#F472B6", "#A16207"


# ── les dessins de l'épisode ────────────────────────────────────────────────

def emma(s=1.0):
    """Emma, conseillère bancaire : cheveux longs, veste bleu nuit, badge orange."""
    cheveux = RoundedRectangle(width=0.66, height=0.8, corner_radius=0.26, fill_color=CHEVEUX, fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.86))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=VESTE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = Polygon(P(-0.17, 0.55), P(0.17, 0.55), P(0, 0.18), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    badge = Rectangle(width=0.2, height=0.12, fill_color=RAISON, fill_opacity=1, stroke_width=0).move_to(P(0.24, 0.28))
    tete = Circle(radius=0.26, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    frange = Sector(radius=0.28, angle=PI, start_angle=0, fill_color=CHEVEUX, fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.14))
    return VGroup(cheveux, corps, col, badge, tete, frange).scale(s)


def client(s=1.0):
    """Le jeune client : sweat vert d'eau, cheveux courts."""
    corps = RoundedRectangle(width=0.85, height=1.0, corner_radius=0.3, fill_color="#0D9488", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    tete = Circle(radius=0.24, fill_color="#8d5524", fill_opacity=1, stroke_width=0).move_to(P(0, 0.82))
    cheveux = Sector(radius=0.25, angle=PI, start_angle=0, fill_color=CHEVEUX, fill_opacity=1,
                     stroke_width=0).move_to(P(0, 0.97))
    return VGroup(corps, tete, cheveux).scale(s)


def tirelire(s=1.0):
    """Une tirelire cochon (rose) et une pièce au-dessus de la fente."""
    corps = Ellipse(width=1.25, height=0.88, fill_color=ROSE, fill_opacity=1, stroke_width=0)
    groin = Ellipse(width=0.26, height=0.3, fill_color="#EC4899", fill_opacity=1, stroke_width=0).move_to(P(0.66, -0.02))
    oreille = Triangle(fill_color="#EC4899", fill_opacity=1, stroke_width=0).scale(0.13).move_to(P(0.3, 0.44))
    oeil = Dot(P(0.38, 0.12), radius=0.04, color=BLACK)
    pattes = VGroup(*[Rectangle(width=0.14, height=0.2, fill_color="#EC4899", fill_opacity=1, stroke_width=0)
                      .move_to(P(x, -0.48)) for x in (-0.3, 0.3)])
    fente = Line(P(-0.15, 0.4), P(0.15, 0.4), stroke_width=5, color="#831843")
    piece = VGroup(Circle(radius=0.16, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color="#CA8A04", stroke_width=3)
                   ).move_to(P(0, 0.75))
    g = VGroup(pattes, corps, groin, oreille, oeil, fente, piece).scale(s)
    g.piece = piece
    return g


def etiquette(s=1.0, couleur=TERME):
    """Une étiquette de prix (sans nombre), son trou à droite."""
    forme = Polygon(P(-0.55, 0.28), P(0.35, 0.28), P(0.6, 0), P(0.35, -0.28), P(-0.55, -0.28), fill_color=FOND_CARTE,
                    fill_opacity=1, stroke_color=couleur, stroke_width=4)
    trou = Circle(radius=0.06, stroke_color=couleur, stroke_width=3).move_to(P(0.38, 0))
    return VGroup(forme, trou).scale(s)


def maison(s=1.0):
    """Le logement loué : murs, toit, porte, fenêtre."""
    murs = Square(1.0, fill_color="#334155", fill_opacity=1, stroke_color=GREY_B, stroke_width=2).move_to(P(0, -0.1))
    toit = Polygon(P(-0.65, 0.4), P(0.65, 0.4), P(0, 0.95), fill_color=BOIS, fill_opacity=1, stroke_width=0)
    porte = Rectangle(width=0.28, height=0.45, fill_color="#0F172A", fill_opacity=1, stroke_width=0).move_to(P(-0.2, -0.38))
    fen = Square(0.26, fill_color="#38BDF8", fill_opacity=0.7, stroke_width=0).move_to(P(0.22, 0.05))
    return VGroup(murs, toit, porte, fen).scale(s)


def carte_q(largeur=2.1, hauteur=1.6, couleur=RAISON):
    """Un placement encore inconnu : une carte et un grand « ? »."""
    c = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.16, stroke_color=couleur, stroke_width=3,
                         fill_color=FOND_CARTE, fill_opacity=1)
    q = Text("?", font_size=80, color=couleur).move_to(c)
    return VGroup(c, q)


class Bords6:
    """BORDS=1 : en plus des 3 % du module commun, tout TEXTE reste à 6 % des bords
    gauche et droit (exigence du 13/11). « BORD6 » doit rester à 0 (hors fin commune)."""

    def _bords(self):
        super()._bords()
        cle = getattr(self, "_cle_voix", "?") or "?"
        if "abonne" in cle:
            return
        lx = config.frame_width / 2 - config.frame_width * 0.06
        vus = getattr(self, "_bords6_vus", set())
        for mob in self.mobjects:
            for f in mob.get_family():
                if isinstance(f, Text) and f.submobjects and max(g.get_fill_opacity() for g in f.submobjects) > 0.05:
                    g, d = f.get_left()[0], f.get_right()[0]
                    if g < -lx - 0.01 or d > lx + 0.01:
                        c = (cle, f.original_text[:24], round(g, 2), round(d, 2))
                        if c not in vus:
                            vus.add(c)
                            print(f"BORD6 {c[0]} « {c[1]} » x[{c[2]}, {c[3]}]", flush=True)
        self._bords6_vus = vus


class SuiteEvolution1reSpe(Bords6, AuditMilliers, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_evolution_marques.json"
    nom_voix = "premiere-spe-suite-evolution"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "verte"
    largeur_texte = 12.0          # 6 % de marge à gauche et à droite pour les textes
    calc = _E16.calc
    fleche = _E16.fleche
    boutons_ligne = _E16.boutons_ligne
    ligne = _P21.ligne

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def ecran_garde(self):
        """Comme la garde commune, avec la question en morceaux (chaque « 10 % »
        à sa voix) et le prix qui monte puis redescend SOUS le départ."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Évolutions", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Évolutions")
        self.play(Write(tit), run_time=0.7)
        sub = self.t("en pourcentage", 40, TERME).move_to(P(0, tit.get_bottom()[1] - 0.5))
        self.au_mot("en pourcentage")
        self.play(FadeIn(sub, shift=UP * 0.1), run_time=0.35)
        y0 = -1.15
        A, B, C = P(-3.2, y0), P(-1.0, -0.4), P(1.2, y0 - 0.35)
        depart = DashedLine(P(-3.9, y0), P(2.1, y0), color=GREY_B, dash_length=0.12, stroke_width=3)
        pa, pb, pc = Dot(A, radius=0.12, color=TERME), Dot(B, radius=0.12, color=TERME), Dot(C, radius=0.12, color=PIEGE)
        f1 = Arrow(A, B, buff=0.14, color=RAISON, stroke_width=6, max_tip_length_to_length_ratio=0.15)
        f2 = Arrow(B, C, buff=0.14, color=PIEGE, stroke_width=6, max_tip_length_to_length_ratio=0.15)
        q = Text("?", font_size=64, color=PIEGE).move_to(P(2.0, y0 - 0.3))
        y1 = sub.get_bottom()[1] - 0.5
        self.calc([("Pourquoi", WHITE, "Pourquoi"), ("+ 10 %,", RAISON, "10"), ("puis", WHITE, "puis"),
                   ("− 10 %,", PIEGE, "10")], y1, centre=0, fs=40, larg=12,
                  avec_morceau={0: [Create(depart), GrowFromCenter(pa)], 1: [GrowArrow(f1), GrowFromCenter(pb)],
                                3: [GrowArrow(f2), GrowFromCenter(pc)]})
        self.calc([("ne ramène pas au départ ?", WHITE, "ne ramène")], y1 - 0.68, centre=0, fs=40, larg=12,
                  avec=[FadeIn(q, scale=1.5)])
        self.play(Indicate(pc, color=PIEGE, scale_factor=1.6), run_time=0.5)
        ident = self.t(self.identite, 26, GREY_A).move_to(P(0, y1 - 1.42))
        self.play(FadeIn(ident), run_time=0.3)
        self.attendre_voix(marge=0.9)

    # ── 01 : Emma, conseillère bancaire ────────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.6
        pers = emma(0.95).move_to(P(x, 2.05))
        nom = self.t("Emma", 44, JAUNE_TITRE).move_to(P(x, 0.68))
        m1 = self.t("conseillère", 34, TERME).move_to(P(x, 0.08))
        m2 = self.t("bancaire", 34, TERME).move_to(P(x, -0.44))
        self.au_mot("Emma")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("conseillère bancaire")
        self.play(FadeIn(m1, shift=UP * 0.1), FadeIn(m2, shift=UP * 0.1), run_time=0.3)
        cl = client(1.0).move_to(P(-0.4, 1.95))
        tl = tirelire(1.0).move_to(P(2.6, 1.95))
        self.au_mot("Un jeune client")
        self.play(FadeIn(cl, shift=LEFT * 0.3), run_time=0.4)
        self.calc([("1 000 €", TERME, "1 000"), ("d'économies", WHITE, "d'économies")], 0.68, centre=2.0, fs=40,
                  larg=7, avec_morceau={0: [FadeIn(tl, scale=0.8)]})
        self.play(tl.piece.animate.shift(DOWN * 0.3).set_opacity(0), run_time=0.35)
        self.calc([("il hésite entre", WHITE, "il hésite"), ("deux placements", RAISON, "deux placements")], -0.2,
                  centre=2.0, fs=38, larg=7.4)
        cartes = VGroup(carte_q().move_to(P(0.6, -1.6)), carte_q().move_to(P(3.4, -1.6)))
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in cartes], lag_ratio=0.3), run_time=0.5)
        self.calc([("Emma va l'aider", WHITE, "Emma va")], -1.25, centre=x, fs=36, larg=4)
        self.calc([("à choisir", JUSTE, "à choisir")], -1.82, centre=x, fs=36, larg=4,
                  avec=[Indicate(cartes, color=JUSTE, scale_factor=1.06)])
        self.attendre_voix(marge=0.5)

    # ── 02 : le coefficient multiplicateur ─────────────────────────────────

    def ecran_coefficient(self):
        self.nouvel_ecran("02-coefficient")
        x0, h = -3.0, 0.42
        b1 = Rectangle(width=6.0, height=h, fill_color=TERME, fill_opacity=1, stroke_width=0).move_to(P(x0 + 3.0, 1.85))
        p1 = Rectangle(width=0.18, height=h, fill_color=RAISON, fill_opacity=1, stroke_width=0).next_to(b1, RIGHT, buff=0)
        l1 = self.calc([("Augmenter de", WHITE, "Augmenter"), ("3 %", RAISON, "3 %"), ("→", GREY_A, "c'est multiplier"),
                        ("× (1 +", WHITE, "1 plus"), ("0,03)", WHITE, "0,03"), ("=", WHITE, None),
                        ("× 1,03", RAISON, "1,03")], 2.85, centre=0, fs=42, larg=12,
                       avec_morceau={0: [GrowFromEdge(b1, LEFT)], 1: [GrowFromEdge(p1, LEFT)]})
        self.play(l1[-1].animate.shift(RIGHT * 0.14), Indicate(p1, color=RAISON, scale_factor=1.6), run_time=0.4)
        b2 = Rectangle(width=4.8, height=h, fill_color=TERME, fill_opacity=1, stroke_width=0).move_to(P(x0 + 2.4, -0.2))
        p2 = Rectangle(width=1.2, height=h, fill_color=TERME, fill_opacity=1, stroke_width=0).next_to(b2, RIGHT, buff=0)
        l2 = self.calc([("Baisser de", WHITE, "Baisser"), ("20 %", PIEGE, "20 %"), ("→", GREY_A, "c'est multiplier"),
                        ("× (1 −", WHITE, "1 moins"), ("0,2)", WHITE, "0,2"), ("=", WHITE, None),
                        ("× 0,8", RAISON, "0,8")], 0.8, centre=0, fs=42, larg=12,
                       avec_morceau={0: [GrowFromEdge(VGroup(b2, p2), LEFT)], 1: [p2.animate.set_fill(PIEGE)],
                                     6: [p2.animate.set_fill(opacity=0.15)]})
        self.play(l2[-1].animate.shift(RIGHT * 0.14), run_time=0.15)
        c = self.calc([("Ce nombre :", WHITE, "Ce nombre"), ("le coefficient multiplicateur", JAUNE_TITRE, "coefficient")],
                      -1.6, centre=-0.3, fs=46, larg=11)
        self.play(Create(self.encadre(c, JAUNE_TITRE, 0.2)), Indicate(l1[-1], color=RAISON),
                  Indicate(l2[-1], color=RAISON), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 03 : la suite géométrique du capital ───────────────────────────────

    def ecran_suite(self):
        self.nouvel_ecran("03-suite")
        self.calc([("Placé à", WHITE, "Placé"), ("3 % par an :", RAISON, "3 %"),
                   ("une suite géométrique", TERME, "suite géométrique")], 3.05, centre=0, fs=44, larg=12)
        lg = LigneTermes(["1 000", "", "1 060,90"], xs=(-3.8, 0.0, 3.8), centre=P(0, 0.22), largeur=2.9, hauteur=0.85,
                         fs=38, noms=["u₀", "u₁", "u₂"], fs_noms=32)
        arcs = [lg.saut(k, "× 1,03", cote=UP, fs=32) for k in range(2)]
        cadres = [FadeIn(lg.cases[k][0], scale=0.8) for k in (1, 2)] + [FadeIn(lg.noms[k]) for k in (1, 2)]
        self.calc([("u₀ =", TERME, "u indice 0"), ("1 000", WHITE, "1 000"), (";", GREY_B, None),
                   ("uₙ₊₁ =", TERME, "u indice n plus 1"), ("1,03", RAISON, "1,03"), ("× uₙ", TERME, "fois u indice n")],
                  2.05, centre=0, fs=44, larg=12,
                  avec_morceau={1: [FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.cases[0][1], scale=1.4),
                                    FadeIn(lg.noms[0])], 3: cadres,
                                4: [Create(a[0]) for a in arcs] + [FadeIn(a[1], scale=1.3) for a in arcs]})
        f = self.calc([("uₙ =", TERME, "Donc u indice n"), ("1 000 ×", WHITE, "1 000 fois"),
                       ("1,03ⁿ", RAISON, "1,03 puissance n")], -1.38, centre=0, fs=54, larg=10)
        self.play(Create(self.encadre(f, TERME, 0.2)), run_time=0.35)
        r = self.calc([("Après 2 ans :", JAUNE_TITRE, "Après 2 ans"), ("1 000 ×", WHITE, "1 000 fois"),
                       ("1,03²", RAISON, "1,03 au carré"), ("=", WHITE, "égale"), ("1 060,90 €", JUSTE, "1 060,90")],
                      -2.62, centre=-0.7, fs=42, larg=10.4, avec_morceau={4: [FadeIn(lg.cases[2][1], scale=1.4)]})
        self.play(r[-1].animate.shift(RIGHT * 0.15), run_time=0.15)
        self.play(Create(self.encadre(r[-1], JUSTE, 0.12)), *self.allumer_cases(lg, [2]), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : × 0,85 → A (baisse de 15 %) ─────────────

    def ecran_question1(self):
        fs = 40
        corps = [self.t(c, fs, WHITE, 1e9) for c in ("une baisse de 15 %", "une baisse de 85 %", "une hausse de 15 %")]
        cartes = VGroup(*[self.bouton(Ln, c, 6.6, fs) for Ln, c in zip("ABC", corps)]).arrange(DOWN, buff=0.18)
        cartes.move_to(P(0, -0.5))

        def e1():
            self.calc([("Un prix est multiplié par", WHITE, "Un prix"), ("0,85.", RAISON, "0,85")], 2.4, centre=0,
                      fs=44, larg=11)
            self.calc([("Cela correspond à :", WHITE, "Cela correspond")], 1.62, centre=0, fs=44, larg=11)

        def dessin():
            self.play(FadeIn(etiquette(1.3, RAISON).move_to(P(-5.0, -0.5)), scale=0.8), run_time=0.3)

        q = self.question_libre("04-question", [e1], cartes, P(0, -2.45), dessin=dessin)
        self.dire("04b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        self.calc([("0,85", WHITE, "0,85"), ("< 1 :", WHITE, "que 1"), ("c'est une baisse.", JUSTE, "c'est une baisse")],
                  -2.32, centre=-0.6, fs=42, larg=10)
        c = self.calc([("1 −", WHITE, "Et 1 moins"), ("0,85", WHITE, "0,85"), ("=", WHITE, "égale"), ("0,15,", WHITE, "0,15"),
                       ("soit", WHITE, "soit"), ("15 %", JUSTE, "15 %")], -3.08, centre=-0.6, fs=42, larg=10)
        self.play(c[-1].animate.shift(RIGHT * 0.12), run_time=0.12)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.12)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : linéaire (+ 40 €) ou exponentiel (+ 3 %) ──────────────────────

    def ecran_lineaire(self):
        self.nouvel_ecran("05-lineaire-exponentiel")
        self.calc([("Emma compare", WHITE, "Emma compare"), ("deux offres", JAUNE_TITRE, "deux offres")], 3.3, centre=0,
                  fs=38, larg=12)
        ca = self.carte(5.9, 2.62, P(-3.2, 1.66), TERME)
        cb = self.carte(5.9, 2.62, P(3.2, 1.66), RAISON)
        na = nuage_mini([1, 1.45, 1.9, 2.35, 2.8], 0.9, 0.8, droite=True).move_to(P(-0.8, 2.45))
        nb = nuage_mini([1, 1.2, 1.5, 2.0, 2.8], 1.0, 0.8, couleur=RAISON).move_to(P(5.4, 2.45))
        xa, xb, fs = -5.8, 0.6, 30
        self.au_mot("Offre A")
        self.play(FadeIn(ca), run_time=0.2)
        self.calc([("Offre A", JAUNE_TITRE, None)], 2.6, x=xa, fs=34, larg=4)
        self.calc([("+ 40 €", RAISON, "40"), ("chaque année", WHITE, "chaque année")], 2.04, x=xa, fs=fs, larg=4.4,
                  avec=[FadeIn(na, scale=0.8)])
        self.calc([("évolution linéaire", WHITE, "évolution linéaire")], 1.46, x=xa, fs=fs, larg=4.2)
        self.calc([("suite arithmétique", TERME, "suite arithmétique")], 0.88, x=xa, fs=fs, larg=4.2)
        self.au_mot("Offre B")
        self.play(FadeIn(cb), run_time=0.2)
        self.calc([("Offre B", JAUNE_TITRE, None)], 2.6, x=xb, fs=34, larg=3.6)
        self.calc([("+ 3 %", RAISON, "3 %"), ("par an", WHITE, "par an")], 2.04, x=xb, fs=fs, larg=3.6,
                  avec=[FadeIn(nb, scale=0.8)])
        self.calc([("évolution exponentielle", WHITE, "évolution exponentielle")], 1.46, x=xb, fs=fs, larg=5.3)
        self.calc([("suite géométrique", TERME, "suite géométrique")], 0.88, x=xb, fs=fs, larg=5.3)
        fs = 34
        self.calc([("Après 10 ans", JAUNE_TITRE, "Après 10 ans")], -0.02, centre=0, fs=38)
        self.calc([("1 000", WHITE, "1 000 plus"), ("+ 10 ×", WHITE, "10 fois"), ("40", WHITE, "40"), ("=", WHITE, "égale"),
                   ("1 400 €", TERME, "1 400")], -0.62, centre=-3.2, fs=fs, larg=5.8)
        self.calc([("1 000 ×", WHITE, "1 000 fois"), ("1,03¹⁰", RAISON, "1,03 puissance 10"), ("≈", WHITE, "environ"),
                   ("1 343,92 €", TERME, "1 343,92")], -0.62, centre=3.2, fs=fs, larg=5.8)
        self.calc([("Après 20 ans", JAUNE_TITRE, "après 20 ans")], -1.42, centre=0, fs=38)
        self.calc([("1 800 €", TERME, "1 800")], -2.08, centre=-3.2, fs=40, larg=5)
        b = self.calc([("≈", WHITE, "environ"), ("1 806 €", JUSTE, "1 806")], -2.08, centre=3.2, fs=40, larg=5)
        self.play(b[-1].animate.shift(RIGHT * 0.16), run_time=0.12)
        self.play(Create(self.encadre(b[-1], JUSTE, 0.1)), run_time=0.3)
        self.calc([("l'exponentielle", RAISON, "l'exponentielle"), ("finit par passer devant !", JUSTE, "finit par")],
                  -2.88, centre=-0.6, fs=40, larg=10.4, avec=[Indicate(nb.pts, color=JUSTE, scale_factor=1.4)])
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège : + 10 % puis − 10 % ≠ 0 ─────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        self.calc([("Une hausse de", WHITE, "Une hausse"), ("10 %,", RAISON, "10 %, puis"),
                   ("puis une baisse de", WHITE, "une baisse"), ("10 %", PIEGE, "10 %, ce")], 2.3, centre=0, fs=40,
                  larg=12)
        self.calc([("ce n'est pas", WHITE, "n'est pas"), ("zéro !", PIEGE, "zéro")], 1.65, centre=0, fs=40, larg=12)
        y = 0.42
        e0, e1, e2 = (etiquette(0.95, c).move_to(P(x, y)) for c, x in ((TERME, -4.3), (RAISON, -0.8), (PIEGE, 2.7)))
        a1 = self.fleche(P(-3.6, y), P(-1.5, y), RAISON)
        a2 = self.fleche(P(-0.1, y), P(2.0, y), PIEGE)
        lab1 = self.t("× 1,1", 36, RAISON).next_to(a1, UP, buff=0.12)
        lab2 = self.t("× 0,9", 36, PIEGE).next_to(a2, UP, buff=0.12)
        c = self.calc([("On multiplie :", WHITE, "On multiplie"), ("1,1", RAISON, "1,1"), ("×", WHITE, None),
                       ("0,9", PIEGE, "0,9"), ("=", WHITE, "égale"), ("0,99", JUSTE, "0,99")], -0.8, centre=0, fs=50,
                      larg=11, avec_morceau={0: [FadeIn(e0, scale=0.8)],
                                             1: [GrowArrow(a1), FadeIn(lab1, scale=1.3), FadeIn(e1, scale=0.8)],
                                             3: [GrowArrow(a2), FadeIn(lab2, scale=1.3), FadeIn(e2, scale=0.8)]})
        self.play(c[-1].animate.shift(RIGHT * 0.15), run_time=0.15)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.14)), run_time=0.3)
        self.calc([("C'est une baisse de", WHITE, "C'est une baisse"), ("1 %", PIEGE, "1 %")], -1.75, centre=0, fs=44,
                  larg=11, avec=[Indicate(e2, color=PIEGE, scale_factor=1.2)])
        self.calc([("Les pourcentages ne s'ajoutent pas !", JAUNE_TITRE, "Les pourcentages")], -2.65, centre=-0.6,
                  fs=42, larg=10.4)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 : + 25 % → C (baisse de 20 %) ─────────────

    def ecran_question2(self):
        cartes = self.boutons_ligne(["25 %", "75 %", "20 %"], largeur=3.6, fs=52, y=-0.45, pas=3.95)

        def e1():
            self.calc([("Un prix augmente de", WHITE, "Un prix augmente"), ("25 %.", RAISON, "25")], 2.45, centre=0, fs=42,
                      larg=12)
            self.calc([("De combien doit-il baisser", WHITE, "De combien")], 1.72, centre=0, fs=42, larg=12)
            self.calc([("pour revenir à sa valeur de départ ?", WHITE, "pour revenir")], 0.99, centre=0, fs=42, larg=12)

        q = self.question_libre("07-question", [e1], cartes, P(0, -1.6))
        self.dire("07b-reponse")
        self.au_mot("Réponse C")
        self.q_reponse(q, 2)
        self.calc([("Le coefficient réciproque", WHITE, "coefficient réciproque"), ("est l'inverse :", RAISON, "l'inverse")],
                  -1.62, centre=-0.5, fs=42, larg=11)
        c = self.calc([("1 ÷", WHITE, "1 divisé"), ("1,25", RAISON, "1,25"), ("=", WHITE, "égale"), ("0,8", JUSTE, "0,8"),
                       (":", WHITE, None), ("une baisse de 20 %", JUSTE, "20 %")], -2.5, centre=-0.6, fs=44, larg=10.4)
        self.play(Indicate(c[3], color=JUSTE, scale_factor=1.25), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : le loyer, + 2 % par an pendant 3 ans ────────────────

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        y = 0.35
        m0, m3 = maison(1.0).move_to(P(-4.6, y)), maison(1.0).move_to(P(3.7, y))
        prix = self.t("600 €", 36, TERME).move_to(P(-4.6, -0.68))
        q3 = self.t("?", 50, RAISON).move_to(P(3.7, -0.72))
        fl, labs = [], []
        for x0 in (-3.75, -1.55, 0.65):
            f = self.fleche(P(x0, y), P(x0 + 1.9, y), RAISON)
            fl.append(f)
            labs.append(self.t("+ 2 %", 34, RAISON).next_to(f, UP, buff=0.12))
        l1 = self.calc([("Un loyer de", WHITE, "Un loyer"), ("600 €", TERME, "600"), ("augmente de", WHITE, "augmente"),
                        ("2 % par an,", RAISON, "2 %")], 2.4,
                       centre=0, fs=40, larg=12,
                       avec_morceau={1: [FadeIn(m0, scale=0.8), FadeIn(prix, scale=1.3)],
                                     3: [GrowArrow(fl[0]), FadeIn(labs[0], scale=1.3)]})
        l1b = self.calc([("pendant", WHITE, "pendant"), ("3 ans", RAISON, "3 ans")], 1.7, centre=0, fs=40, larg=12,
                        avec_morceau={1: [GrowArrow(fl[1]), FadeIn(labs[1], scale=1.3), GrowArrow(fl[2]),
                                         FadeIn(labs[2], scale=1.3), FadeIn(m3, scale=0.8), FadeIn(q3, scale=1.5)]})
        l2 = self.calc([("Quel est le loyer final,", WHITE, "Quel est le loyer"), ("au centime près ?", WHITE, "au centime")],
                       -1.6, centre=-0.4, fs=40, larg=12)
        l3 = self.calc([("Et quel est le", WHITE, "Et quel est"), ("taux d'évolution global ?", RAISON, "taux d'évolution")],
                       -2.3, centre=-0.4, fs=40, larg=12)
        self.defi_pause(-3.08, x=-0.8)
        self._defi = (tit, [l1, l1b, l2, l3], labs, q3)

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, efface, labs, q3 = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), *[FadeOut(m) for m in efface], run_time=0.45)
        self.remove(*efface)
        neufs = [self.t("× 1,02", 34, RAISON).move_to(l) for l in labs]
        self.calc([("On multiplie", WHITE, "On multiplie"), ("trois fois", WHITE, "trois fois"), ("par 1,02", RAISON, "1,02")],
                  2.3, centre=0, fs=42, larg=12,
                  avec_morceau={2: [FadeOut(l) for l in labs] + [FadeIn(n, scale=1.3) for n in neufs]})
        final = self.t("636,72 €", 36, JUSTE).move_to(q3)
        c2 = self.calc([("600 ×", WHITE, "600 fois"), ("1,02³", RAISON, "1,02 puissance 3"), ("≈", WHITE, "environ"),
                        ("636,72 €", JUSTE, "636,72")], -1.45, centre=-0.4, fs=46, larg=10,
                       avec_morceau={3: [FadeOut(q3), FadeIn(final, scale=1.3)]})
        self.play(c2[-1].animate.shift(RIGHT * 0.12), run_time=0.12)
        self.play(Create(self.encadre(c2[-1], JUSTE, 0.12)), run_time=0.3)
        self.calc([("Coefficient global :", WHITE, "coefficient global"), ("1,02³", RAISON, "1,02 puissance 3"),
                   ("≈", WHITE, "environ"), ("1,0612", TERME, "1,0612")], -2.2, centre=-0.4, fs=44, larg=10)
        c4 = self.calc([("une hausse d'environ", WHITE, "une hausse"), ("6,12 %,", JUSTE, "6,12"), ("et pas de", WHITE, "et pas"),
                        ("6 %", PIEGE, "6 %")], -2.95, centre=-0.7, fs=42, larg=11)
        self.play(Create(self.barre_lisible(c4[-1])), Indicate(c4[1], color=JUSTE, scale_factor=1.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 42
        tc = lambda s, d: Text(s, font_size=fs, color=WHITE, t2c=d, disable_ligatures=True)  # noqa: E731
        p1 = [tc("Une évolution de t % se traduit", {"t %": RAISON}),
              tc("par un coefficient multiplicateur.", {"coefficient multiplicateur": RAISON})]
        p2 = [tc("Pour des évolutions successives,", {}), tc("on multiplie les coefficients.", {"on multiplie": RAISON})]
        p3 = [tc("Un nombre fixe ajouté :", {"nombre fixe": RAISON}), tc("linéaire et arithmétique ;", {"arithmétique": TERME}),
              tc("un pourcentage fixe :", {"pourcentage fixe": RAISON}),
              tc("exponentiel et géométrique.", {"géométrique": TERME})]
        for l in p1 + p2 + p3:
            l._pas_audit = True
        self.finale([(p1, ["Une évolution de t", "par un coefficient"]), (p2, ["Pour des évolutions", "on multiplie"]),
                     (p3, ["Un nombre fixe", "c'est linéaire", "un pourcentage fixe", "c'est exponentiel"])],
                    cle="09-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_coefficient()
        self.ecran_suite()
        self.ecran_question1()
        self.ecran_lineaire()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("10-abonne")
