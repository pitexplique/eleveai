# suite_geo_reconnaitre.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite géométrique :
# la reconnaître » (16:9), ceinture VERTE. Série SUITES, épisode 09 (première
# vidéo des suites GÉOMÉTRIQUES ; jumelle du pilote 01 suite_arith_reconnaitre).
# Micro du coach : expo_suite_reconnaitre (notion expo_suite_geometrique) :
# lib/tutor-v4/questionBank/premiere/maths/suites-geometriques.bank.ts
# + suites-geometriques-renfort.ts (gRaisonListe, gNatureListe, gNatureSituation,
# gQuotient).
#
# Ce que demande le coach → écran :
#   · ★1-2 raison d'une liste (un terme ÷ le précédent) → 02-quotients, 03, 08 (1) ;
#   · ★1-2 nature d'une liste en QCM (A, G ou ni l'un…)  → 04-question, 06-piege, 08 (1) ;
#   · ★1-3 nature d'une situation (taux fixe → géo,
#     quantité fixe → arith)                            → 01-situation, 05-pourcentage ;
#   · ★2-3 raison par deux termes (consécutifs : q ;
#     à deux rangs : q², termes positifs)               → 07-question, 08 (2), 08b.
# Clé de voix → écran :
#   00-garde (des barres qui doublent, × 2 orange, échelle des ceintures) ·
#   01 Mathis, technicien de laboratoire : la culture de bactéries dans ses boîtes
#   (500, 1 000, 2 000, 4 000 : chaque heure, les points doublent, les nouveaux en
#   orange ; une horloge sous chaque boîte) · 02 les écarts « + 500, + 1 000,
#   + 2 000 » qui grandissent (pas arithmétique, barré), puis les quotients ÷ entre
#   deux cases qui s'allument : toujours 2 · 03 la définition, la raison q = 2 ·
#   04/04b question (B : 80 ; 40 ; 20 ; 10, q = 0,5) · 05 le médicament dans le
#   sang (− 20 % → × 0,8 : 200, 160, 128) · 06 le piège 5, 10, 15, 20 (× 2 ?
#   puis × 1,5 : barré ; + 5 : arithmétique, r = 5) · 07/07b question (C : 1,25)
#   · 08/08b défi (6, 18, 54, 162 : q = 3 ; v₂ = 5, v₄ = 45 : q² = 9, q = 3) ·
#   09 « Ce que tu as appris » · 10 fin.
# Code couleur (module commun) : bleu = termes, orange = raison et écarts,
# vert = juste, rouge = piège. ⛔ Pas de LaTeX : tout en Text ; « ÷ » pour diviser.
# Voix : manim/voix/premiere-suite-geo-reconnaitre.json (débit −6),
# calée mot à mot par suite_geo_reconnaitre_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_geo_reconnaitre.py SuiteGeoReconnaitre1re -o eleveai-maths-premiere-suite-geo-reconnaitre --media_dir manim/scripts/premiere/media-suite-geo-reconnaitre
# Sortie : manim/sorties/premiere/maths/suites/09-geo-reconnaitre/

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from canvas_proportion import _NB, _txts  # noqa: E402

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
BACT = [500, 1000, 2000, 4000]
assert all(b / a == 2 for a, b in zip(BACT, BACT[1:]))
assert [b - a for a, b in zip(BACT, BACT[1:])] == [500, 1000, 2000]        # les écarts changent
Q1 = [[3, 7, 11, 15], [80, 40, 20, 10], [1, 4, 9, 16]]
_geo = [len({b / a for a, b in zip(l, l[1:])}) == 1 for l in Q1]
assert _geo == [False, True, False] and 40 / 80 == 0.5                      # réponse B, q = 0,5
MEDIC = [200, 160, 128]
assert all(abs(b - a * 0.8) < 1e-9 for a, b in zip(MEDIC, MEDIC[1:]))       # − 20 % = × 0,8
PIEGE_L = [5, 10, 15, 20]
assert 10 == 5 * 2 and 15 / 10 == 1.5 and all(b - a == 5 for a, b in zip(PIEGE_L, PIEGE_L[1:]))
assert 25 / 20 == 1.25                                                      # Q2 : réponse C
DEFI = [6, 18, 54, 162]
assert all(b / a == 3 for a, b in zip(DEFI, DEFI[1:]))                      # q = 3
assert 45 / 5 == 9 and 3 ** 2 == 9                                          # q² = 9, q = 3

PEAU, CHEVEUX, BLOUSE = "#a0673d", "#1f1300", "#F1F5F9"
GELOSE, MEDOC = "#1e293b", "#60A5FA"


# ── l'audit : « 1 000 » à l'écran = « 1 000 » dans la voix (copie de l'ép. 02) ──

class AuditMilliers:
    """Le même audit que le module commun, mais un grand nombre écrit « 1 000 »
    dans la voix est bien trouvé (l'audit commun cherchait « 1000 »)."""

    def _auditer(self, avant, t0):
        cle = getattr(self, "_cle_voix", None)
        voix = getattr(self, "_texte_voix", "") or ""
        marques = self._marques().get(cle, []) if cle else []
        for m in self.mobjects:
            for f in m.get_family():
                if type(f).__name__ == "CompteARebours":
                    for g in f.get_family():
                        g._pas_audit = True
        for m in self.mobjects:
            for t in _txts(m):
                if id(t) in avant or getattr(t, "_pas_audit", False) or getattr(t, "_audite", False):
                    continue
                if t.get_fill_opacity() < 0.05:
                    continue
                t._audite = True
                s = t.original_text.replace("−", "").replace(" ", " ")
                s = re.sub(r"(?<=\d) (?=\d{3}\b)", "", s)
                for nb in _NB.findall(s):
                    corps = re.escape(nb) if len(nb) < 4 or "," in nb else re.escape(nb[:-3]) + " ?" + nb[-3:]
                    occ = [x.start() for x in re.finditer(r"(?<![\d,])" + corps + r"(?![\d]|,\d)", voix)]
                    if not occ:
                        print(f"AUDIT-ABSENT {cle} « {nb} » ({t.original_text[:30]})", flush=True)
                        continue
                    tps = [max([mm[1] for mm in marques if mm[0] <= i] or [0.0]) + getattr(self, "_debut_voix", 0)
                           for i in occ]
                    if t0 < tps[0] - 0.06:
                        print(f"AUDIT-AVANCE {cle} « {nb} » ({t.original_text[:30]}) {tps[0] - t0:.2f} s", flush=True)
                    else:
                        dernier = max(x for x in tps if x <= t0 + 0.06)
                        if t0 - dernier > 0.4:
                            print(f"AUDIT-TARD {cle} « {nb} » ({t.original_text[:30]}) {t0 - dernier:.2f} s",
                                  flush=True)


# ── les dessins : Mathis, les boîtes de culture, l'horloge, le tube ─────────

def mathis(s=1.0):
    """Mathis, technicien de laboratoire : blouse blanche, lunettes, une boîte de culture."""
    cheveux = Circle(radius=0.3, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(0, 1.06))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    lunettes = VGroup(*[Circle(radius=0.08, stroke_color=WHITE, stroke_width=3).move_to(P(dx, 1.0))
                        for dx in (-0.1, 0.1)])
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=BLOUSE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = VGroup(Line(P(-0.18, 0.66), P(0, 0.4)), Line(P(0.18, 0.66), P(0, 0.4))).set_stroke("#94A3B8", 4)
    poche = Rectangle(width=0.22, height=0.18, stroke_color="#94A3B8", stroke_width=2).move_to(P(-0.22, 0.2))
    stylo = Line(P(-0.25, 0.22), P(-0.25, 0.36), stroke_color=TERME, stroke_width=4)
    boite = VGroup(Ellipse(width=0.6, height=0.2, fill_color=GELOSE, fill_opacity=1, stroke_color=GREY_B,
                           stroke_width=3),
                   *[Dot(P(dx, 0), radius=0.03, color=TERME) for dx in (-0.12, 0.0, 0.13)]).move_to(P(0.72, 0.15))
    return VGroup(corps, col, poche, stylo, cheveux, tete, lunettes, boite).scale(s)


def points_disque(n, r):
    """n points bien répartis dans un disque (spirale de tournesol) : les
    premiers au centre, les suivants vers le bord, comme une colonie qui grandit."""
    return [(r * np.sqrt((k + 0.5) / n) * np.cos(k * 2.39996), r * np.sqrt((k + 0.5) / n) * np.sin(k * 2.39996))
            for k in range(n)]


PTS_BACT = points_disque(40, 0.66)


def boite_culture(centre, n, avant=0, r=0.82):
    """La boîte de culture (vue de dessus) et ses n bactéries : les `avant`
    premières en bleu, les nouvelles (n − avant) en orange."""
    c = np.array(centre, dtype=float)
    bord = Circle(radius=r, fill_color=GELOSE, fill_opacity=1, stroke_color=GREY_B, stroke_width=4).move_to(c)
    rebord = Circle(radius=r - 0.07, stroke_color=GREY_D, stroke_width=2).move_to(c)
    anc = VGroup(*[Dot(c + P(x, y), radius=0.055, color=TERME) for x, y in PTS_BACT[:avant]])
    neu = VGroup(*[Dot(c + P(x, y), radius=0.055, color=RAISON) for x, y in PTS_BACT[avant:n]])
    return VGroup(VGroup(bord, rebord), anc, neu)


def horloge(centre, h, r=0.27):
    """Une petite horloge : la grande aiguille en haut, la petite (orange) sur h heures."""
    c = np.array(centre, dtype=float)
    cadran = Circle(radius=r, stroke_color=WHITE, stroke_width=3).move_to(c)
    marques = VGroup(*[Line(c + r * 0.72 * np.array([np.cos(a), np.sin(a), 0]),
                            c + r * 0.95 * np.array([np.cos(a), np.sin(a), 0]),
                            stroke_width=2, color=GREY_B) for a in np.arange(0, TAU, TAU / 4)])
    grande = Line(c, c + UP * r * 0.8, stroke_color=WHITE, stroke_width=3)
    petite = Line(c, c + UP * r * 0.55, stroke_color=RAISON, stroke_width=5).rotate(-TAU * h / 12, about_point=c)
    return VGroup(cadran, marques, petite), grande


def tube(hauteur=3.4, largeur=0.9):
    """Le tube de prélèvement (le sang du patient) : corps arrondi en bas, bouchon."""
    corps = RoundedRectangle(width=largeur, height=hauteur, corner_radius=largeur / 2, stroke_color=GREY_B,
                             stroke_width=4)
    bouchon = RoundedRectangle(width=largeur + 0.16, height=0.3, corner_radius=0.06, fill_color="#B91C1C",
                               fill_opacity=1, stroke_width=0).next_to(corps, UP, buff=-0.08)
    return VGroup(corps, bouchon)


class OutilsEp09:
    """Les petits outils de l'épisode (pas dans le module commun)."""

    def calcul(self, morceaux, y, x=-6.2, fs=38, avec=(), centre=None, buff=0.18):
        """Un calcul écrit morceau par morceau : [(texte, couleur, extrait), …] ;
        chaque morceau quand la voix dit son extrait (None : avec le précédent).
        centre : x du centre (sinon aligné à gauche sur x)."""
        ts = [self.t(m, fs, c) for m, c, _ in morceaux]
        g = VGroup(*ts).arrange(RIGHT, buff=buff).move_to(P(0 if centre is None else centre, y))
        if centre is None:
            g.align_to(P(x, 0), LEFT)
        paquet = []
        for tx, (_, _, ex) in zip(ts, morceaux):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], run_time=0.2)
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(tx)
        self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *avec, run_time=0.3)
        return g

    def egalite(self, gauche, droite, fs, couleur):
        """« q = 0,5 » : une espace nette des deux côtés du « = » (relecture du 11/11)."""
        g = VGroup(self.t(gauche, fs, couleur), self.t("=", fs, couleur), self.t(droite, fs, couleur))
        return g.arrange(RIGHT, buff=0.28)

    def ecarts_sous(self, liste, texte, couleur=RAISON, fs=28, bas=None, audit=True):
        """De petites flèches sous une liste_nombres, d'un nombre au suivant."""
        g = VGroup()
        for a, b in zip(liste.nombres, liste.nombres[1:]):
            y = (bas if bas is not None else a.get_bottom()[1]) - 0.06
            fl = CurvedArrow(P(a.get_center()[0], y), P(b.get_center()[0], y), angle=TAU / 4,
                             color=couleur, stroke_width=3, tip_length=0.12)
            lab = self.t(texte, fs, couleur, audit=audit).next_to(fl, DOWN, buff=0.04)
            g.add(VGroup(fl, lab))
        return g


class SuiteGeoReconnaitre1re(AuditMilliers, OutilsEp09, PaysageSuites):
    fichier_marques = "suite_geo_reconnaitre_marques.json"
    nom_voix = "premiere-suite-geo-reconnaitre"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def barres(self):
        """Des barres qui doublent : chaque fois, la flèche « × q » saute à la suivante."""
        xs, y0, h0 = (-2.4, -1.0, 0.4, 1.8), -1.65, 0.1
        bars = VGroup(*[Rectangle(width=0.75, height=h0 * 2 ** k, fill_color=TERME, fill_opacity=0.85,
                                  stroke_color=WHITE, stroke_width=2).move_to(P(x, y0 + h0 * 2 ** k / 2))
                        for k, x in enumerate(xs)])
        self.play(GrowFromEdge(bars[0], DOWN), run_time=0.3)
        self.au_mot("toujours")
        for k in range(3):
            a, b = bars[k].get_top() + UP * 0.1, bars[k + 1].get_top() + UP * 0.1
            fl = CurvedArrow(a, b, angle=-TAU / 8, color=RAISON, stroke_width=4, tip_length=0.14)
            lab = self.t("× q", 26, RAISON).next_to(fl.point_from_proportion(0.5), UP, buff=0.08)
            self.play(Create(fl), GrowFromEdge(bars[k + 1], DOWN), FadeIn(lab, scale=1.3), run_time=0.3)

    def ecran_garde(self):
        self.garde("Suite géométrique",
                   [("la reconnaître", "la reconnaître", TERME),
                    ("Comment savoir qu'une liste de nombres", "Comment"),
                    ("est multipliée, toujours par le même nombre ?", "est multipliée")],
                   dessin=self.barres)

    # ── 01 : Mathis et sa culture de bactéries ─────────────────────────────

    XS_BOITES = (-2.4, -0.3, 1.8, 3.9)
    Y_BOITE, Y_HORLOGE, Y_CASES = 0.95, -0.4, -1.6

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = mathis(1.0).move_to(P(-5.0, 1.15))
        nom = self.t("Mathis", 40, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        m1 = self.t("technicien", 30, TERME).next_to(nom, DOWN, buff=0.12)
        m2 = self.t("de laboratoire", 30, TERME).next_to(m1, DOWN, buff=0.08)
        self.au_mot("Mathis")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("technicien")
        self.play(FadeIn(m1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("laboratoire")
        self.play(FadeIn(m2, shift=UP * 0.1), run_time=0.3)
        boites = [boite_culture(P(x, self.Y_BOITE), 5 * 2 ** k, 5 * 2 ** (k - 1) if k else 5)
                  for k, x in enumerate(self.XS_BOITES)]
        horl = [horloge(P(x, self.Y_HORLOGE), k) for k, x in enumerate(self.XS_BOITES)]
        lg = LigneTermes([fr(v) for v in BACT], xs=self.XS_BOITES, centre=P(0, self.Y_CASES), largeur=1.55,
                         hauteur=0.72, fs=34)
        self.au_mot("culture de bactéries")
        self.play(FadeIn(boites[0][0], scale=0.8), FadeIn(horl[0][0]), FadeIn(horl[0][1]), run_time=0.4)
        self.play(LaggedStart(*[GrowFromCenter(d) for d in boites[0][1]], lag_ratio=0.2), run_time=0.5)
        self.suivre("500")
        self.montrer_case(lg, 0, run_time=0.3)
        for k in (1, 2, 3):
            self.suivre(fr(BACT[k]))
            c = horl[k][0][0].get_center()
            self.play(FadeIn(boites[k][0], scale=0.8),
                      TransformFromCopy(VGroup(*boites[k - 1][1], *boites[k - 1][2]), boites[k][1]),
                      FadeIn(horl[k][0]), FadeIn(horl[k][1]),
                      FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), run_time=0.35)
            self.play(LaggedStart(*[GrowFromCenter(d) for d in boites[k][2]], lag_ratio=0.04),
                      Rotate(horl[k][1], -TAU, about_point=c), run_time=0.45)
            self.bring_to_front(boites[k][1], boites[k][2])  # les anciennes bactéries (bleues) au-dessus du fond
        self.au_mot("vitesse")
        vit = self.t("à quelle vitesse ?", 40, RAISON).move_to(P(0.75, 2.85))
        self.play(FadeIn(vit, scale=1.2), run_time=0.35)
        self.attendre_voix(marge=0.5)
        self._culture = (perso, nom, m1, m2, boites, horl, lg, vit)

    # ── 02 : les écarts changent, le quotient reste le même ────────────────

    def ecran_quotients(self):
        self.dire("02-quotients")
        perso, nom, m1, m2, boites, horl, lg, vit = self._culture
        self.play(FadeOut(VGroup(perso, nom, m1, m2, vit, *boites, *[VGroup(*h) for h in horl])), run_time=0.4)
        self.play(lg.animate.shift(P(-0.75, 3.75)), run_time=0.5)          # les cases en haut : y = 2,15
        self.au_mot("écarts")
        ecarts = []
        for k in range(3):
            self.suivre(fr(BACT[k + 1] - BACT[k]))
            ecarts.append(self.sauter(lg, k, "+ " + fr(BACT[k + 1] - BACT[k]), cote=UP, couleur=RAISON, run_time=0.35))
        self.au_mot("changent")
        e1 = self.t("les écarts changent", 36, PIEGE)
        cx = self.barrer(Square(0.36))
        e2 = self.t("pas arithmétique", 36, PIEGE)
        ligne = VGroup(e1, cx, e2).arrange(RIGHT, buff=0.35).move_to(P(-0.75, 0.15))
        self.play(FadeIn(e1, shift=UP * 0.1), *[Indicate(e[1], color=PIEGE, scale_factor=1.25) for e in ecarts],
                  *[e[0].animate.set_stroke(PIEGE) for e in ecarts], *[e[1].animate.set_fill(PIEGE) for e in ecarts],
                  run_time=0.5)
        self.au_mot("pas arithmétique")
        self.play(Create(cx), FadeIn(e2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Divise")
        self.play(*[e[0].animate.set_stroke(opacity=0.6) for e in ecarts],
                  *[e[1].animate.set_fill(opacity=0.6) for e in ecarts], run_time=0.3)
        lignes, fois = [], []
        for k, y in zip(range(3), (-0.75, -1.5, -2.25)):
            a, b = fr(BACT[k + 1]), fr(BACT[k])
            self.suivre(a)
            self.play(*self.allumer_cases(lg, (k, k + 1), RAISON), run_time=0.25)
            s = lg.saut(k, "× 2", fs=30)
            lignes.append(self.calcul([(a, WHITE, None), ("÷", WHITE, "divisé"), (b, WHITE, b), ("=", WHITE, "2"),
                                       ("2", RAISON, None)], y, avec=[Create(s[0]), FadeIn(s[1], scale=1.4)]))
            fois.append(s)
            self.play(*self.allumer_cases(lg, (k, k + 1), TERME, largeur=3), run_time=0.2)
        lg.sauts = {k: s for k, s in enumerate(fois)}
        self.au_mot("Le quotient")
        r1 = self.t("Le quotient est", 36, WHITE)
        r2 = self.t("toujours le même", 36, RAISON)
        reg = VGroup(r1, r2).arrange(DOWN, buff=0.12).move_to(P(2.9, -1.5))
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("toujours")
        self.play(FadeIn(r2, shift=UP * 0.1), *[Indicate(l[-1], color=RAISON, scale_factor=1.35) for l in lignes],
                  *[Indicate(s[1], color=RAISON, scale_factor=1.3) for s in fois], run_time=0.6)
        self.attendre_voix(marge=0.5)
        self._quot = (VGroup(*ecarts), ligne, VGroup(*lignes), reg)

    # ── 03 : la définition, la raison q ────────────────────────────────────

    def ecran_definition(self):
        self.dire("03-definition")
        lg = self._culture[6]
        ecarts, ligne, lignes, reg = self._quot
        self.play(FadeOut(VGroup(ecarts, ligne, lignes, reg)), run_time=0.4)
        self.au_mot("d'un terme")
        self.play(Indicate(lg.cases[0], color=TERME, scale_factor=1.2), run_time=0.35)
        self.au_mot("au suivant")
        self.play(Indicate(lg.cases[1], color=TERME, scale_factor=1.2), run_time=0.35)
        self.au_mot("multipliant")
        for s in lg.sauts.values():
            self.play(Indicate(s, color=RAISON, scale_factor=1.15), run_time=0.3)
        self.au_mot("géométrique")
        d = self.t("suite géométrique", 52, JAUNE_TITRE).move_to(P(0, -0.1))
        cad = self.encadre(d, JAUNE_TITRE, 0.2)
        self.play(FadeIn(d, scale=1.3), Create(cad), run_time=0.5)
        self.au_mot("raison")
        r1 = self.t("la raison :", 44, WHITE)
        r2 = self.t("q", 50, RAISON)
        rr = VGroup(r1, r2).arrange(RIGHT, buff=0.25).move_to(P(0, -1.25))
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("q.")
        nouveaux = [self.t("× q", 30, RAISON).move_to(s[1]) for s in lg.sauts.values()]
        self.play(FadeIn(r2, scale=1.5), *[ReplacementTransform(s[1], n) for s, n in zip(lg.sauts.values(), nouveaux)],
                  run_time=0.5)
        self.au_mot("égale")
        ee = self.egalite("q", "2", 46, RAISON).move_to(P(-2.6, -2.45))
        self.play(FadeIn(ee[:2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("2")
        cad2 = self.encadre(ee, RAISON, 0.18)
        self.play(FadeIn(ee[2], scale=1.4), Create(cad2), run_time=0.35)
        self.insister(VGroup(ee, cad2), 1.2)
        self.au_mot("double")
        dbl = self.t("la culture double", 38, WHITE).move_to(P(1.9, -2.2))
        self.play(FadeIn(dbl, shift=UP * 0.1), *[Indicate(c, color=RAISON) for c in lg.cases], run_time=0.4)
        self.au_mot("chaque heure")
        ch = self.t("chaque heure", 38, RAISON).next_to(dbl, DOWN, buff=0.12)
        self.play(FadeIn(ch, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 : laquelle est géométrique ? → B ──────────

    def ecran_question1(self):
        listes = [liste_nombres([str(v) for v in l], 34) for l in Q1]
        q = self.poser_question("04-question",
                                [(self.t("Laquelle de ces listes est géométrique ?", 38), "Laquelle")],
                                listes, 1)
        self.dire("04b-reponse")
        self.q_reponse(q, 1)
        lr = LigneTermes([str(v) for v in Q1[1]], centre=P(0, q.cartes[1].get_bottom()[1] - 0.75), pas=1.9,
                         largeur=1.2, hauteur=0.7, fs=36)
        for c in lr.cases:
            c[1]._pas_audit = True  # les termes de B, déjà lus dans la question
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]),
                  LaggedStart(*[FadeIn(c, scale=0.8) for c in lr.cases], lag_ratio=0.1), run_time=0.3)
        y = lr.get_bottom()[1] - 1.55
        c1 = self.calcul([("40", JUSTE, "40"), ("÷", JUSTE, "divisé"), ("80", JUSTE, "80"), ("=", JUSTE, "0,5"),
                          ("0,5", JUSTE, None)], y, centre=-2.4, fs=40)
        self.au_mot("de même")
        ec = [lr.saut(k, "× 0,5", fs=30) for k in range(3)]
        for e in ec:
            e[1]._pas_audit = True  # « et de même ensuite » : 0,5 déjà dit
        self.play(*[Create(e[0]) for e in ec], *[FadeIn(e[1], scale=1.3) for e in ec], run_time=0.35)
        self.au_mot("0,5", n=2)
        rr = self.egalite("q", "0,5", 44, JUSTE).move_to(P(2.6, y))
        cad = self.encadre(rr, JUSTE)
        self.play(FadeIn(rr, scale=1.3), Create(cad), run_time=0.35)
        self.insister(VGroup(rr, cad), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 05 : un pourcentage fixe : le médicament dans le sang ──────────────

    def ecran_pourcentage(self):
        self.nouvel_ecran("05-pourcentage")
        t1 = self.t("Un pourcentage fixe", 42, RAISON)
        t2 = self.t("→ suite géométrique", 42, JAUNE_TITRE)
        tit = VGroup(t1, t2).arrange(RIGHT, buff=0.3).move_to(P(0, 3.15))
        self.au_mot("Un pourcentage")
        self.play(FadeIn(t1, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("géométrique")
        self.play(FadeIn(t2, shift=DOWN * 0.1), run_time=0.35)
        tb = tube().move_to(P(-4.7, -0.45))
        corps = tb[0]
        bas, H = corps.get_bottom()[1] + 0.12, corps.height - 0.5

        def dose(v):
            r = RoundedRectangle(width=corps.width - 0.2, height=H * v / 200, corner_radius=0.2, fill_color=MEDOC,
                                 fill_opacity=0.9, stroke_width=0)
            return r.move_to(P(corps.get_center()[0], bas + H * v / 400))

        self.au_mot("sang")
        lsang = self.t("le sang du patient", 30, GREY_A).next_to(tb, UP, buff=0.15)
        self.play(Create(tb), FadeIn(lsang), run_time=0.5)
        self.au_mot("médicament")
        g = dose(200)
        lmed = self.t("médicament", 30, MEDOC).next_to(corps, RIGHT, buff=0.2).align_to(g, UP)
        self.play(GrowFromEdge(g, DOWN), FadeIn(lmed), run_time=0.5)
        self.bring_to_front(tb)
        self.au_mot("20")
        moins = self.t("− 20 %", 42, RAISON)
        ch = self.t("chaque heure", 42, RAISON)
        l1 = VGroup(moins, ch).arrange(RIGHT, buff=0.3).move_to(P(1.9, 1.95))
        self.play(FadeIn(moins, scale=1.3), run_time=0.3)
        self.au_mot("chaque heure")
        self.play(FadeIn(ch, shift=UP * 0.1), run_time=0.3)
        self.au_mot("multiplie")
        m1 = self.t("on multiplie par", 40, WHITE)
        m2 = self.t("0,8", 42, RAISON)
        l2 = VGroup(m1, m2).arrange(RIGHT, buff=0.25).move_to(P(1.9, 1.15))
        self.play(FadeIn(m1, shift=UP * 0.1), run_time=0.3)
        self.suivre("0,8")
        self.play(FadeIn(m2, scale=1.4), run_time=0.3)
        lg = LigneTermes([str(v) for v in MEDIC], xs=(0.0, 1.9, 3.8), centre=P(0, -0.15), largeur=1.4,
                         hauteur=0.75, fs=36)
        for k, v in enumerate(MEDIC):
            self.suivre(str(v))
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4)]
            if k:
                anims += [Transform(g, dose(v)), lmed.animate.align_to(dose(v), UP)]
            self.play(*anims, run_time=0.35)
        self.au_mot("raison")
        for k in (0, 1):
            lg.sauts[k] = lg.saut(k, "× 0,8", fs=30)
            lg.sauts[k][1]._pas_audit = True  # 0,8 déjà dit : la flèche le rappelle
        self.play(*[Create(x[0]) for x in lg.sauts.values()], *[FadeIn(x[1], scale=1.4) for x in lg.sauts.values()],
                  run_time=0.35)
        rr = self.egalite("q", "0,8", 46, RAISON).move_to(P(1.9, -2.25))
        self.play(FadeIn(rr[:2], shift=UP * 0.1), run_time=0.25)
        self.suivre("0,8")
        cad = self.encadre(rr, RAISON, 0.18)
        self.play(FadeIn(rr[2], scale=1.4), Create(cad), run_time=0.35)
        self.insister(VGroup(rr, cad), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : 5, 10, 15, 20 ──────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        lg = LigneTermes([str(v) for v in PIEGE_L], xs=(-5.1, -3.5, -1.9, -0.3), centre=P(0, 1.3), largeur=1.15,
                         hauteur=0.72, fs=36)
        self.remplir_ligne(lg)
        self.au_mot("multiplie")
        s0 = lg.saut(0, "× 2 ?", cote=UP, fs=30)
        c1 = self.calcul([("10", WHITE, "10"), ("=", WHITE, None), ("5", WHITE, "5"), ("×", WHITE, "fois"),
                          ("2", RAISON, "2")], 2.05, centre=3.7, fs=40, avec=[Create(s0[0]), FadeIn(s0[1], scale=1.4)])
        s1 = lg.saut(1, "× 1,5", cote=UP, couleur=PIEGE, fs=30)
        c2 = self.calcul([("15", WHITE, "15"), ("÷", WHITE, "divisé"), ("10", WHITE, "10"), ("=", WHITE, "1,5"),
                          ("1,5", PIEGE, None)], 1.15, centre=3.7, fs=40, avec=[Create(s1[0]), FadeIn(s1[1], scale=1.4)])
        self.au_mot("quotients changent")
        cx = self.barrer(Square(0.34))
        e1 = VGroup(cx, self.t("les quotients changent", 32, PIEGE)).arrange(RIGHT, buff=0.25).move_to(P(3.45, 0.3))
        self.play(Create(cx), FadeIn(e1[1], shift=UP * 0.1), Create(self.barrer(s0[1], buff=0.04)),
                  s0[0].animate.set_stroke(PIEGE), s0[1].animate.set_fill(PIEGE), run_time=0.45)
        self.au_mot("ajoute")
        self.suivre("5")
        plus = [lg.saut(k, "+ 5", fs=32) for k in range(3)]
        a1 = self.t("on ajoute toujours 5", 38, RAISON).move_to(P(-2.7, -0.9))
        self.play(*[Create(x[0]) for x in plus], FadeIn(a1, shift=UP * 0.1), run_time=0.35)
        self.play(*[FadeIn(x[1], scale=1.4) for x in plus], run_time=0.2)
        self.au_mot("arithmétique")
        a2 = self.t("suite arithmétique", 40, JAUNE_TITRE).move_to(P(-2.7, -1.8))
        self.play(FadeIn(a2, scale=1.2), run_time=0.35)
        self.suivre("5")
        rr = self.egalite("r", "5", 44, RAISON).move_to(P(1.4, -1.8))
        cad = self.encadre(rr, RAISON, 0.16)
        self.play(FadeIn(rr, scale=1.3), Create(cad), run_time=0.35)
        self.insister(VGroup(rr, cad), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 : u₃ = 20, u₄ = 25 → C (1,25) ─────────────

    def ecran_question2(self):
        lg = LigneTermes(["20", "25"], pas=1.9, largeur=1.3, hauteur=0.72, fs=36, noms=["u₃", "u₄"], fs_noms=30)
        q = self.poser_question("07-question",
                                [(self.t("Une suite géométrique à termes positifs vérifie :", 38), "Une suite"),
                                 (lg, None), (self.t("Sa raison est :", 38), "Sa raison")],
                                ["5", "0,8", "1,25"], 2, en_ligne=True, largeur=3.3, fs=42)
        self.dire("07b-reponse")
        self.q_reponse(q, 2)
        self.au_mot("suivant")
        self.play(*self.allumer_cases(lg, (1,), JUSTE), run_time=0.3)
        self.au_mot("précédent")
        self.play(*self.allumer_cases(lg, (0,), JUSTE), run_time=0.3)
        y = q.cartes.get_bottom()[1] - 0.6
        self.calcul([("25", JUSTE, "25"), ("÷", JUSTE, "divisé"), ("20", JUSTE, "20"), ("=", JUSTE, "1,25"),
                     ("1,25", JUSTE, None)], y, centre=0, fs=42)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi ───────────────────────────────────────────────────────

    def entete_ligne(self, num, lignes, haut, fs=34, couleur=WHITE):
        """« 1. Les termes d'une suite : » (le numéro n'est pas audité : la voix dit « Un »)."""
        n = self.t(num, fs, JAUNE_TITRE, audit=False)
        b = VGroup(*[self.t(l, fs, couleur) for l in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        g = VGroup(n, b).arrange(RIGHT, buff=0.2, aligned_edge=UP)
        g.move_to(P(0, 0)).align_to(P(-6.2, 0), LEFT).align_to(P(0, haut), UP)
        return g

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        h1 = self.entete_ligne("1.", ["Les termes d'une suite :"], 2.45)
        self.au_mot("Un :")
        self.play(FadeIn(h1, shift=UP * 0.1), run_time=0.3)
        lg1 = LigneTermes([str(v) for v in DEFI], xs=(-5.2, -3.6, -2.0, -0.4), centre=P(0, 1.35), largeur=1.3,
                          hauteur=0.75, fs=36)
        self.remplir_ligne(lg1)
        qs = [self.t(x, 34, c) for x, c in (("arithmétique ?", WHITE), ("géométrique ?", WHITE),
                                             ("ou ni l'un ni l'autre ?", WHITE), ("Donne sa raison.", RAISON))]
        for k, (m, ex) in enumerate(zip(qs, ("arithmétique", "géométrique", "ni l'un", "Donne"))):
            m.move_to(P(3.6, 2.05 - 0.6 * k))
            self.au_mot(ex)
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.3)
        h2 = self.entete_ligne("2.", ["Suite géométrique", "à termes positifs :"], -0.7, fs=32)
        self.au_mot("Deux")
        self.play(FadeIn(h2, shift=UP * 0.1), run_time=0.3)
        lg2 = LigneTermes(["5", "?", "45"], xs=(-0.6, 0.95, 2.5), centre=P(0, -1.2), largeur=1.2, hauteur=0.72,
                          fs=36, noms=["v₂", "v₃", "v₄"], fs_noms=30)
        self.au_mot("indice 2")
        self.suivre("5")
        self.montrer_case(lg2, 0)
        self.au_mot("45")
        self.montrer_case(lg2, 1, run_time=0.2)
        self.montrer_case(lg2, 2)
        q2 = VGroup(self.t("Quelle est", 34, RAISON), self.t("sa raison ?", 34, RAISON)).arrange(DOWN, buff=0.1)
        q2.move_to(P(4.85, -1.2))
        self.au_mot("Quelle est")
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.35)
        self.defi_pause(-2.6, x=-0.6)
        self._defi = (tit, lg1, VGroup(*qs), lg2, q2)

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, lg1, qs, lg2, q2 = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 48, JUSTE).move_to(tit)
        self.play(FadeOut(qs), FadeOut(q2), FadeOut(tit), FadeIn(cor, shift=DOWN * 0.1), run_time=0.4)
        divs = []
        for k, y in zip(range(3), (2.15, 1.6, 1.05)):
            a, b = str(DEFI[k + 1]), str(DEFI[k])
            divs.append(self.calcul([(a, WHITE, a), ("÷", WHITE, "divisé"), (b, WHITE, b)], y, centre=3.0, fs=32,
                                    avec=self.allumer_cases(lg1, (k, k + 1), RAISON)))
            self.play(*self.allumer_cases(lg1, (k, k + 1), TERME, largeur=3), run_time=0.15)
        self.au_mot("toujours")
        self.suivre("3")
        egs = [self.t("= 3", 32, RAISON).next_to(d, RIGHT, buff=0.2) for d in divs]
        x3 = [lg1.saut(k, "× 3", fs=30) for k in range(3)]
        self.play(*[FadeIn(e, scale=1.3) for e in egs], *[Create(s[0]) for s in x3], run_time=0.35)
        self.play(*[FadeIn(s[1], scale=1.4) for s in x3], run_time=0.2)
        self.au_mot("géométrique")
        v1 = VGroup(self.coche(JUSTE, 0.18), self.t("géométrique", 32, JUSTE)).arrange(RIGHT, buff=0.16)
        v2 = self.egalite("q", "3", 32, JUSTE)
        verd = VGroup(v1, v2).arrange(RIGHT, buff=0.35).move_to(P(3.7, 0.4))
        self.play(Create(v1[0]), FadeIn(v1[1], shift=UP * 0.1), run_time=0.35)
        self.suivre("3")
        self.play(FadeIn(v2, scale=1.3), run_time=0.3)
        self.au_mot("deux fois")
        xq = [lg2.saut(k, "× q", cote=UP, fs=30, creux=0.25) for k in range(2)]
        for s in xq:
            self.play(Create(s[0]), FadeIn(s[1], scale=1.4), run_time=0.3)
        self.au_mot("45")
        c1 = self.calcul([("45", WHITE, None), ("÷", WHITE, "divisé"), ("5", WHITE, "5"), ("=", WHITE, "9"),
                          ("9", RAISON, None)], -2.3, centre=-4.2, fs=38, avec=self.allumer_cases(lg2, (0, 2), RAISON))
        self.au_mot("q au carré")
        c2 = VGroup(self.t("q²", 40, RAISON), self.t("=", 40, WHITE), self.t("9", 40, RAISON)).arrange(RIGHT, buff=0.28)
        c2.move_to(P(-1.2, -2.3))
        self.play(FadeIn(c2[:2], shift=UP * 0.1), run_time=0.3)
        self.suivre("9")
        self.play(FadeIn(c2[2], scale=1.3), run_time=0.25)
        self.au_mot("positifs")
        pos = self.t("termes positifs", 28, GREY_A).next_to(c2, RIGHT, buff=0.5)
        self.play(FadeIn(pos, shift=UP * 0.1), run_time=0.3)
        self.au_mot("q égale")
        rr = self.egalite("q", "3", 46, JUSTE).move_to(P(4.4, -2.3))
        self.play(FadeIn(rr[:2], shift=UP * 0.1), run_time=0.25)
        self.suivre("3")
        cad = self.encadre(rr, JUSTE, 0.18)
        self.play(FadeIn(rr[2], scale=1.4), Create(cad), run_time=0.35)
        self.insister(VGroup(rr, cad), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        p1 = [VGroup(self.t("Suite géométrique :", fs, JAUNE_TITRE), self.t("on multiplie toujours", fs)).arrange(
                  RIGHT, buff=0.2),
              self.t("par le même nombre d'un terme au suivant.", fs)]
        p2 = [VGroup(self.t("Ce nombre, c'est la", fs), self.t("raison q.", fs, RAISON)).arrange(RIGHT, buff=0.2)]
        p3 = [self.t("Pour la trouver :", fs),
              VGroup(self.t("un terme ÷ celui d'avant", fs, JUSTE), self.t("(q = uₙ₊₁ ÷ uₙ)", 32, GREY_A)).arrange(
                  RIGHT, buff=0.35)]
        self.finale([(p1, ["géométrique", "le même nombre"]), (p2, ["Ce nombre, c'est"]),
                     (p3, ["Pour la trouver", "un terme divisé"])], cle="09-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_quotients()
        self.ecran_definition()
        self.ecran_question1()
        self.ecran_pourcentage()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("10-abonne")
