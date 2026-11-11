# suite_arith_recurrence.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite arithmétique :
# la relation de récurrence » (16:9), ceinture VERTE. Série SUITES, épisode 02.
# Micro du coach : lin_suite_recurrence (notion lin_suite_arithmetique) :
# lib/tutor-v4/questionBank/premiere/maths/suites-arithmetiques.bank.ts
# + suites-arithmetiques-renfort.ts.
#
# Ce que demande le coach → écran :
#   · aRelationSituation (QCM : quelle relation traduit la situation ?) → 01, 03, 04 ;
#   · aSuivant (le terme suivant uₖ₊₁ depuis uₖ)                        → 03, 05 ;
#   · aDerouler / aRecContexte (dérouler pas à pas, u₀ ou u₁ au départ)  → 05, 09 défi ;
#   · aPrecedent (reculer d'un rang : l'opération inverse)               → 06, 07 ;
#   · piège « uₙ = uₙ₊₁ + r » (le sens du temps inversé), « r × uₙ »     → 04, 08.
# Clé de voix → écran :
#   00-garde (cases, flèches qui avancent puis une qui recule, échelle des ceintures)
#   · 01 Léna, programmatrice : la scène du festival, la foule (une rangée de
#   points = 300 spectateurs : 4 rangées en 2026, une rangée orange de plus par an)
#   · 02 la notation uₙ, les années au-dessus des cases, u₀ = 1 200 · 03 la flèche
#   « + 300 » saute de case en case, uₙ₊₁ = uₙ + 300 · 04/04b question (A :
#   vₙ₊₁ = vₙ − 15) · 05 on déroule : 1 500, 1 800, 2 100, la foule grandit
#   · 06 remonter le temps : la flèche retour « − 300 », u₄ = 2 400 · 07/07b
#   question (B : 54) · 08 le piège : la flèche à l'envers barrée en rouge, la
#   foule qui fondrait · 09/09b défi t₁ = 7,5, r = 2,5 → t₄ = 15 · 10 « Ce que tu
#   as appris » · 11 fin.
# Code couleur (module commun) : bleu = termes (et la foule), orange = la raison,
# vert = juste, rouge = piège. ⛔ Pas de LaTeX : tout en Text.
# Voix : manim/voix/premiere-suite-arith-recurrence.json (débit −6),
# calée mot à mot par suite_arith_recurrence_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_arith_recurrence.py SuiteArithRecurrence1re -o eleveai-maths-premiere-suite-arith-recurrence --media_dir manim/scripts/premiere/media-suite-arith-recurrence
# Sortie : manim/sorties/premiere/maths/suites/02-arith-recurrence/

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from canvas_proportion import _NB, _txts  # noqa: E402

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
U0, R = 1200, 300
LENA = [U0 + R * k for k in range(4)]
assert LENA == [1200, 1500, 1800, 2100] and 2026 + 3 == 2029
assert 2700 - R == 2400                                    # u₄ depuis u₅
assert 50 + 4 == 54                                        # Q2 : w₅ = w₆ + 4 → B
DEFI = [7.5, 10, 12.5, 15]
assert all(abs(b - a - 2.5) < 1e-9 for a, b in zip(DEFI, DEFI[1:])) and 4 - 1 == 3

PEAU, CHEVEUX, VIOLET = "#8d5524", "#1f1300", "#7C3AED"


# ── l'audit : « 1 200 » à l'écran = « 1 200 » dans la voix ─────────────────

class AuditMilliers:
    """Le même audit que le module commun, mais un grand nombre écrit « 1 200 »
    dans la voix est bien trouvé (l'audit commun cherchait « 1200 »)."""

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
                s = t.original_text.replace("−", "").replace(" ", " ")
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


# ── les dessins : Léna, la scène, la foule ─────────────────────────────────

def lena(s=1.0):
    """Léna, programmatrice : chignon, casque-micro, badge du festival, planning."""
    cheveux = Circle(radius=0.31, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(0, 1.04))
    chignon = Circle(radius=0.13, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(0.2, 1.33))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    arceau = Arc(radius=0.33, start_angle=PI * 0.12, angle=PI * 0.76, stroke_color="#E5E7EB",
                 stroke_width=6).move_arc_center_to(P(0, 0.98))
    oreilles = VGroup(*[RoundedRectangle(width=0.12, height=0.2, corner_radius=0.04, fill_color="#E5E7EB",
                                         fill_opacity=1, stroke_width=0).move_to(P(dx, 0.98)) for dx in (-0.3, 0.3)])
    micro = Line(P(-0.3, 0.92), P(-0.08, 0.8), stroke_color="#E5E7EB", stroke_width=4)
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=VIOLET, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    cordon = VGroup(Line(P(-0.15, 0.62), P(0, 0.3)), Line(P(0.15, 0.62), P(0, 0.3))).set_stroke("#FDE68A", 3)
    badge = RoundedRectangle(width=0.24, height=0.3, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.17))
    planning = VGroup(RoundedRectangle(width=0.5, height=0.66, corner_radius=0.05, fill_color="#0F172A",
                                       fill_opacity=1, stroke_color=GREY_B, stroke_width=2).move_to(P(0.78, 0.1)),
                      *[Line(P(0.62, 0.3 - 0.13 * k), P(0.94, 0.3 - 0.13 * k), stroke_color=TERME, stroke_width=3)
                        for k in range(4)])
    return VGroup(cheveux, chignon, tete, arceau, oreilles, micro, corps, cordon, badge, planning).scale(s)


def scene_festival(largeur=4.6, centre=ORIGIN):
    """La scène : plancher, fond, toit, deux enceintes, trois projecteurs."""
    c = np.array(centre, dtype=float)
    plancher = Rectangle(width=largeur, height=0.22, fill_color="#475569", fill_opacity=1, stroke_width=0)
    plancher.move_to(c)
    fond = Rectangle(width=largeur - 0.5, height=1.25, fill_color="#1E293B", fill_opacity=1, stroke_width=0)
    fond.next_to(plancher, UP, buff=0)
    toit = Polygon(fond.get_corner(UL), fond.get_corner(UR), fond.get_corner(UR) + P(0.3, 0.3),
                   fond.get_corner(UL) + P(-0.3, 0.3), fill_color="#64748B", fill_opacity=1, stroke_width=0)
    enceintes = VGroup()
    for cote in (-1, 1):
        boite = Rectangle(width=0.36, height=0.72, fill_color="#0F172A", fill_opacity=1, stroke_color=GREY_B,
                          stroke_width=2)
        boite.move_to(c + P(cote * (largeur / 2 - 0.45), 0.47))
        hp = VGroup(Circle(radius=0.1, stroke_color=GREY_B, stroke_width=2).move_to(boite.get_center() + UP * 0.15),
                    Circle(radius=0.07, stroke_color=GREY_B, stroke_width=2).move_to(boite.get_center() + DOWN * 0.18))
        enceintes.add(VGroup(boite, hp))
    lumieres = VGroup()
    for dx in (-0.9, 0, 0.9):
        haut = toit.get_bottom() + P(dx, 0)
        cone = Polygon(haut, haut + P(-0.3, -1.1), haut + P(0.3, -1.1), fill_color="#FDE68A", fill_opacity=0.18,
                       stroke_width=0)
        lumieres.add(VGroup(cone, Dot(haut, radius=0.06, color="#FDE68A")))
    return VGroup(plancher, fond, toit, enceintes, lumieres)


def artiste(s=1.0):
    """Une chanteuse au micro, sur la scène (pieds sur l'origine)."""
    tete = Circle(radius=0.12, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0, 0.62))
    corps = RoundedRectangle(width=0.3, height=0.42, corner_radius=0.1, fill_color=RAISON, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.3))
    jambes = VGroup(Line(P(-0.07, 0.1), P(-0.1, 0)), Line(P(0.07, 0.1), P(0.1, 0))).set_stroke(WHITE, 4)
    pied = Line(P(0.3, 0), P(0.3, 0.55), stroke_color=GREY_B, stroke_width=3)
    micro = Dot(P(0.27, 0.58), radius=0.05, color=GREY_A)
    bras = Line(P(0.1, 0.42), P(0.25, 0.55), stroke_color="#c68642", stroke_width=4)
    return VGroup(jambes, corps, tete, pied, micro, bras).scale(s, about_point=ORIGIN)


def note(s=1.0, couleur="#FDE68A"):
    """Une croche : la tête, la hampe, le crochet."""
    tete = Ellipse(width=0.16, height=0.12, fill_color=couleur, fill_opacity=1, stroke_width=0).rotate(0.4)
    hampe = Line(P(0.07, 0.02), P(0.07, 0.3), stroke_color=couleur, stroke_width=3)
    crochet = Line(P(0.07, 0.3), P(0.17, 0.2), stroke_color=couleur, stroke_width=3)
    return VGroup(tete, hampe, crochet).scale(s)


def rangee(x0, x1, y, n=16, couleur=TERME, r=0.075, decale=False, creuse=False):
    """Une rangée de spectateurs (une tête = un point) : 300 spectateurs."""
    pas = (x1 - x0) / (n - 1)
    d = pas / 2 if decale else 0
    if creuse:
        return VGroup(*[Circle(radius=r, stroke_color=GREY_B, stroke_width=2).move_to(P(x0 + d + k * pas, y))
                        for k in range(n - (1 if decale else 0))])
    return VGroup(*[Dot(P(x0 + d + k * pas, y), radius=r, color=couleur) for k in range(n - (1 if decale else 0))])


def arc_fleche(a, b, cote=DOWN, couleur=RAISON, creux=0.33, epais=4):
    """La flèche courbe du point a au point b, bombée du côté `cote`, que l'on
    aille vers la droite (avancer) ou vers la gauche (reculer)."""
    a, b = np.array(a, dtype=float), np.array(b, dtype=float)
    vers_droite = 1 if b[0] >= a[0] else -1
    bas = 1 if np.allclose(cote, DOWN) else -1
    angle = 4 * np.arctan(2 * creux / max(np.linalg.norm(b - a), 0.1)) * vers_droite * bas
    return CurvedArrow(a, b, angle=angle, color=couleur, stroke_width=epais, tip_length=0.16)


class OutilsEp02:
    """Les petits outils de l'épisode (paysage et short) : phrase en morceaux,
    calcul écrit morceau par morceau, flèche lancée avec sa bille."""

    def montrer_liste(self, g, extraits=None, run_time=0.18):
        """Comme le module commun, mais une « phrase » (self.phrase) porte ses
        propres extraits : chaque morceau quand la voix le dit."""
        ex = extraits or getattr(g, "extraits", None)
        for k, n in enumerate(g.nombres):
            self.suivre(ex[k] if ex else n.original_text)
            anims = [FadeIn(n, scale=1.3)]
            if 0 < k <= len(g.seps):
                anims.append(FadeIn(g.seps[k - 1]))
            self.play(*anims, run_time=run_time)

    def phrase(self, morceaux, fs=38, buff=0.16):
        """Une ligne en morceaux [(texte, extrait[, couleur]), …] : chacun
        apparaît quand la voix dit son extrait (dans poser_question aussi)."""
        ts = [self.t(m[0], fs, m[2] if len(m) > 2 else WHITE, 1e9) for m in morceaux]
        g = VGroup(*ts).arrange(RIGHT, buff=buff)
        g.nombres, g.seps, g.extraits = ts, [], [m[1] for m in morceaux]
        return g

    def calcul(self, morceaux, y, x=None, fs=40, avec=(), buff=0.18):
        """Un calcul écrit morceau par morceau : [(texte, couleur, extrait), …] ;
        chaque morceau quand la voix dit son extrait (None : avec le précédent).
        x : bord gauche (None : centré)."""
        ts = [self.t(m, fs, c, 1e9) for m, c, _ in morceaux]
        g = VGroup(*ts).arrange(RIGHT, buff=buff).move_to(P(0, y))
        if x is not None:
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

    def lancer(self, fl, couleur=RAISON, run_time=0.5, extra=()):
        """La flèche se trace, une bille court le long de l'arc."""
        bille = Dot(fl.get_start(), radius=0.07, color=couleur)
        self.play(Create(fl), MoveAlongPath(bille, fl.copy()), *extra, run_time=run_time)
        self.remove(bille)



class SuiteArithRecurrence1re(AuditMilliers, OutilsEp02, PaysageSuites):
    fichier_marques = "suite_arith_recurrence_marques.json"
    nom_voix = "premiere-suite-arith-recurrence"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        """Quatre cases ; les flèches avancent d'une case à l'autre, puis une
        flèche revient en arrière (dessous)."""
        lg = LigneTermes(["", "", "", ""], centre=P(-0.6, -1.25), pas=1.55, largeur=1.05, hauteur=0.6, fs=30)
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in lg.cases], lag_ratio=0.15), run_time=0.5)
        for k in range(3):
            fl = arc_fleche(lg.cases[k][0].get_top() + UP * 0.08, lg.cases[k + 1][0].get_top() + UP * 0.08, UP,
                            creux=0.25)
            self.lancer(fl, run_time=0.3)
        fl = arc_fleche(lg.cases[3][0].get_bottom() + DOWN * 0.08, lg.cases[2][0].get_bottom() + DOWN * 0.08, DOWN,
                        creux=0.25)
        self.lancer(fl, run_time=0.45)

    def ecran_garde(self):
        self.garde("Suite arithmétique",
                   [("la relation de récurrence", "la relation", TERME),
                    ("Comment passer d'un terme au suivant,", "Comment"),
                    ("et même revenir en arrière ?", "revenir")],
                   dessin=self.dessin_garde)

    # ── 01 : Léna et son festival ──────────────────────────────────────────

    X0_F, X1_F = -0.95, 3.55                           # la largeur de la foule
    Y_RANGS = [1.12, 0.8, 0.48, 0.16, -0.16, -0.48, -0.8]

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = lena(1.0).move_to(P(-4.75, 0.8))
        nom = self.t("Léna", 40, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        metier = self.t("programmatrice", 30, TERME).next_to(nom, DOWN, buff=0.12)
        self.au_mot("Léna")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("programmatrice")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)
        sc = scene_festival(5.2, P(1.3, 1.55))
        lab = self.t("festival de musique", 28, "#FDE68A").move_to(P(1.3, 3.36))
        self.au_mot("festival")
        self.play(FadeIn(sc[:3], shift=UP * 0.15), FadeIn(sc[3]), run_time=0.5)
        self.play(FadeIn(lab, scale=1.2), FadeIn(sc[4]), run_time=0.35)
        self.au_mot("artistes")
        art = artiste(1.0).move_to(P(0.2, 1.66), aligned_edge=DOWN)
        notes = VGroup(*[note(1.0).move_to(P(0.75 + 0.45 * k, 1.95 + 0.12 * k)) for k in range(3)])
        self.play(FadeIn(art, shift=DOWN * 0.15), run_time=0.35)
        self.play(LaggedStart(*[FadeIn(n, shift=UP * 0.25) for n in notes], lag_ratio=0.3), run_time=0.6)
        self.au_mot("terrain")
        terrain = DashedVMobject(Rectangle(width=5.1, height=2.37, stroke_color="#4ADE80", stroke_width=3),
                                 num_dashes=60).move_to(P(1.3, 0.135))
        herbe = Rectangle(width=5.1, height=2.37, fill_color="#14532D", fill_opacity=0.35, stroke_width=0)
        herbe.move_to(terrain)
        self.play(FadeIn(herbe), Create(terrain), run_time=0.6)
        rangs = [rangee(self.X0_F, self.X1_F, y, decale=k % 2 == 1) for k, y in enumerate(self.Y_RANGS[:4])]
        self.au_mot("2026")
        an = self.t("2026 :", 36, GREY_A)
        spect = self.t("1 200 spectateurs", 36, TERME)
        bas = VGroup(an, spect).arrange(RIGHT, buff=0.2).move_to(P(1.3, -1.55))
        self.play(FadeIn(an, shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 200")
        self.play(LaggedStart(*[LaggedStart(*[GrowFromCenter(d) for d in r], lag_ratio=0.05) for r in rangs],
                              lag_ratio=0.25), FadeIn(spect, shift=UP * 0.1), run_time=0.9)
        self.au_mot("300 spectateurs")
        neuve = rangee(self.X0_F, self.X1_F, self.Y_RANGS[4], couleur=RAISON)
        plus = self.t("+ 300", 36, RAISON).move_to(P(5.3, 0.08))
        self.play(LaggedStart(*[FadeIn(d, scale=1.6) for d in neuve], lag_ratio=0.04), FadeIn(plus, scale=1.3),
                  run_time=0.6)
        self.au_mot("chaque année")
        ca = self.t("chaque année", 24, RAISON).next_to(plus, DOWN, buff=0.12)
        self.play(FadeIn(ca, shift=UP * 0.1), run_time=0.3)
        self.au_mot("combien de place")
        qp = self.t("Combien de place réserver ?", 38, WHITE).move_to(P(0.2, -2.45))
        self.play(FadeIn(qp, shift=UP * 0.1), run_time=0.35)
        self.au_mot("éditions suivantes")
        futurs = VGroup(*[rangee(self.X0_F, self.X1_F, y, decale=k % 2 == 0, creuse=True)
                          for k, y in enumerate(self.Y_RANGS[5:])])
        self.play(LaggedStart(*[FadeIn(f, shift=DOWN * 0.1) for f in futurs], lag_ratio=0.4), run_time=0.6)
        self.play(Indicate(futurs, color=GREY_A, scale_factor=1.04), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 02 : la notation ───────────────────────────────────────────────────

    XS = (-4.2, -1.4, 1.4, 4.2)

    def ecran_notation(self):
        self.nouvel_ecran("02-notation")
        ligne = self.phrase([("uₙ", "u indice n", TERME), ("= le nombre de spectateurs", "le nombre"),
                             ("en 2026 + n", "2026")], 40)
        ligne.nombres[0].scale(1.3)
        ligne.arrange(RIGHT, buff=0.22).move_to(P(0, 2.75))
        self.montrer_liste(ligne)
        lg = LigneTermes(["1 200", "", "", ""], xs=self.XS, centre=P(0, 0.15), largeur=1.75, hauteur=0.85, fs=40,
                         noms=[u(k) for k in range(4)], fs_noms=34)
        ans = VGroup(*[self.t("2026" if k == 0 else f"2026 + {k}", 30, GREY_A, audit=False).move_to(P(x, 1.0))
                       for k, x in enumerate(self.XS)])
        self.au_mot("plus n")
        self.play(LaggedStart(*[AnimationGroup(FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.noms[k]),
                                               FadeIn(ans[k], shift=DOWN * 0.1)) for k in range(4)],
                              lag_ratio=0.25), run_time=0.9)
        dep = self.phrase([("La suite commence à", "La suite commence"), ("n = 0", "0", TERME)], 36)
        dep.move_to(P(-0.6, -1.25))
        self.montrer_liste(dep)
        self.play(Indicate(lg.noms[0], color=TERME, scale_factor=1.4), run_time=0.45)
        self.au_mot("correspond")
        lien = DashedLine(ans[0].get_bottom() + DOWN * 0.04, lg.cases[0][0].get_top() + UP * 0.04, color=GREY_A,
                          stroke_width=2, dash_length=0.06)
        self.play(Create(lien), Indicate(ans[0], color=WHITE, scale_factor=1.3), run_time=0.45)
        self.au_mot("1 200", n=1)
        egal = VGroup(self.t("u₀ =", 44, TERME), self.t("1 200", 44, WHITE)).arrange(RIGHT, buff=0.2)
        egal.move_to(P(-0.6, -2.35))
        cad = self.encadre(egal, TERME, 0.16)
        self.play(FadeIn(lg.cases[0][1], scale=1.4), FadeIn(egal, scale=1.2), Create(cad), run_time=0.4)
        self.insister(VGroup(egal, cad), 1.15)
        self.attendre_voix(marge=0.5)
        self._notation = (ligne, lg, ans, dep, lien, egal, cad)

    # ── 03 : la relation de récurrence ─────────────────────────────────────

    def ecran_relation(self):
        self.dire("03-relation")
        ligne, lg, ans, dep, lien, egal, cad = self._notation
        self.play(FadeOut(VGroup(ligne, ans, dep, lien, egal, cad)), run_time=0.3)
        self.play(lg.animate.shift(UP * 1.75), run_time=0.45)
        self.au_mot("300")
        sauts = [lg.saut(k, "+ 300", cote=UP, fs=30) for k in range(3)]
        for k, s_ in enumerate(sauts):
            lg.sauts[k] = s_
        self.play(LaggedStart(*[AnimationGroup(Create(s_[0]), FadeIn(s_[1], scale=1.3)) for s_ in sauts],
                              lag_ratio=0.3), run_time=0.6)
        f = self.calcul([("uₙ₊₁", TERME, "u indice n plus 1"), ("=", WHITE, "égale"), ("uₙ", TERME, "u indice n"),
                         ("+ 300", RAISON, "300")], 0.15, fs=64, buff=0.55)
        noms = [("terme suivant", WHITE, "Le terme suivant", f[0]), ("terme actuel", WHITE, "terme actuel", f[2]),
                ("la raison", RAISON, "la raison", f[3])]
        etiq = []
        for texte, c, ex, cible in noms:
            self.au_mot(ex)
            e = self.t(texte, 28, c).move_to(P(cible.get_center()[0], f.get_bottom()[1] - 0.5))
            fl = Arrow(e.get_top(), cible.get_bottom(), buff=0.05, color=c, stroke_width=3, tip_length=0.12,
                       max_tip_length_to_length_ratio=0.5)
            anims = [FadeIn(e, shift=UP * 0.1), GrowArrow(fl)]
            if ex == "Le terme suivant":
                anims.append(Indicate(lg.cases[1], color=TERME, scale_factor=1.15))
            elif ex == "terme actuel":
                anims.append(Indicate(lg.cases[0], color=TERME, scale_factor=1.15))
            else:
                anims += [Indicate(s[1], color=RAISON, scale_factor=1.3) for s in lg.sauts.values()]
            self.play(*anims, run_time=0.4)
            etiq.append(VGroup(e, fl))
        self.au_mot("relation de récurrence")
        cadre = self.encadre(f, JAUNE_TITRE, 0.22)
        rel = self.t("la relation de récurrence", 40, JAUNE_TITRE).move_to(P(0, -1.75))
        self.play(Create(cadre), FadeIn(rel, shift=UP * 0.1), run_time=0.5)
        self.au_mot("arithmétique")
        sa = self.t("d'une suite arithmétique de raison", 34, WHITE)
        rr = VGroup(self.t("r =", 40, RAISON), self.t("300", 40, RAISON)).arrange(RIGHT, buff=0.15)
        bloc = VGroup(sa, rr).arrange(RIGHT, buff=0.5).move_to(P(-0.4, -2.6))
        self.play(FadeIn(sa, shift=UP * 0.1), run_time=0.35)
        self.au_mot("raison", n=2)
        self.suivre("300")
        cr = self.encadre(rr, RAISON, 0.12)
        self.play(FadeIn(rr, scale=1.3), Create(cr), run_time=0.35)
        self.insister(VGroup(rr, cr), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 : la chorale → A ──────────────────────────

    def ecran_question1(self):
        l1 = self.phrase([("Une chorale perd", "Une chorale"), ("15 choristes", "15 choristes", RAISON),
                          ("chaque année.", "chaque année")], 36)
        l2 = self.phrase([("vₙ :", "v indice n", TERME), ("le nombre de choristes après n années.", "le nombre")], 36)
        l3 = self.t("Quelle relation traduit cette situation ?", 36)
        choix = ["vₙ₊₁ = vₙ − 15", "vₙ₊₁ = 15 × vₙ", "vₙ = vₙ₊₁ − 15"]
        q = self.poser_question("04-question", [(l1, None), (l2, None), (l3, "Quelle relation")], choix, 0, fs=34)
        self.dire("04b-reponse")
        self.q_reponse(q, 0)
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), run_time=0.25)
        y = q.cartes[1].get_center()[1] - 0.3
        lg = LigneTermes(["", ""], xs=(-2.4, 0.2), centre=P(0, y), largeur=1.5, hauteur=0.7, fs=34)
        for k, nom in enumerate(("vₙ", "vₙ₊₁")):
            lg.cases[k][1].become(self.t(nom, 34, TERME).move_to(lg.cases[k][0]))
        self.play(FadeIn(lg.cases[0]), FadeIn(lg.cases[1]), run_time=0.3)
        fl = arc_fleche(lg.cases[0][0].get_bottom() + DOWN * 0.08, lg.cases[1][0].get_bottom() + DOWN * 0.08, DOWN,
                        couleur=JUSTE, creux=0.25)
        lab = self.t("− 15", 34, JUSTE).next_to(fl, DOWN, buff=0.05)
        self.au_mot("15", n=2)
        self.lancer(fl, JUSTE, 0.35, extra=[FadeIn(lab, scale=1.3)])
        self.au_mot("terme actuel")
        e1 = self.t("terme actuel", 28, GREY_A).next_to(lg.cases[0], LEFT, buff=0.25)
        self.play(FadeIn(e1, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("terme suivant")
        e2 = self.t("terme suivant", 28, GREY_A).next_to(lg.cases[1], RIGHT, buff=0.25)
        self.play(FadeIn(e2, shift=LEFT * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : on déroule, pas à pas ─────────────────────────────────────────

    def petite_foule(self, n_rangs, x0=2.75, x1=5.85, y0=0.95, pas=0.3):
        return [rangee(x0, x1, y0 - pas * k, n=12, r=0.065, decale=k % 2 == 1) for k in range(n_rangs)]

    def ecran_derouler(self):
        self.nouvel_ecran("05-derouler")
        tit = self.t("On déroule, pas à pas", 44, JAUNE_TITRE).move_to(P(-3.0, 3.15))
        self.au_mot("Déroulons")
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.4)
        sc = scene_festival(3.8, P(4.3, 1.3))
        rangs = self.petite_foule(7)
        self.au_mot("Léna")
        self.play(FadeIn(sc), *[FadeIn(r) for r in rangs[:4]], run_time=0.5)
        vals = [fr(v) for v in LENA]
        lg = LigneTermes(vals, xs=(-5.55, -3.6, -1.65, 0.3), centre=P(0, 1.65), largeur=1.75, hauteur=0.8, fs=36,
                         noms=[u(k) for k in range(4)], fs_noms=32)
        for k in range(4):
            lg.noms[k].next_to(lg.cases[k][0], UP, buff=0.12)
        self.au_mot("pas à pas")
        self.play(LaggedStart(*[AnimationGroup(FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.noms[k]))
                                for k in range(4)], lag_ratio=0.2), run_time=0.6)
        orange = None
        for k in range(1, 4):
            y = -0.2 - 0.72 * (k - 1)
            ts = [self.t(u(k), 38, TERME), self.t("=", 38), self.t(vals[k - 1], 38), self.t("+ 300", 38, RAISON),
                  self.t("=", 38), self.t(vals[k], 38, JUSTE)]
            g = VGroup(*ts).arrange(RIGHT, buff=0.18).move_to(P(0, y)).align_to(P(-6.3, 0), LEFT)
            self.suivre(f"u indice {k}")
            self.play(FadeIn(ts[0], shift=UP * 0.1), FadeIn(ts[1]), run_time=0.25)
            self.suivre(vals[k - 1])
            anims = [FadeIn(ts[2], shift=UP * 0.1)]
            if k == 1:
                anims.append(FadeIn(lg.cases[0][1], scale=1.4))
            self.play(*anims, Indicate(lg.cases[k - 1][0], color=TERME, scale_factor=1.1), run_time=0.3)
            self.suivre("300")
            s_ = lg.saut(k - 1, "+ 300", fs=28)
            lg.sauts[k - 1] = s_
            self.play(FadeIn(ts[3], shift=UP * 0.1), Create(s_[0]), FadeIn(s_[1], scale=1.3), run_time=0.35)
            self.suivre(vals[k])
            neuve = rangee(2.75, 5.85, 0.95 - 0.3 * (3 + k), n=12, r=0.065, decale=(3 + k) % 2 == 1,
                           couleur=RAISON)
            anims = [FadeIn(ts[4]), FadeIn(ts[5], scale=1.3), FadeIn(lg.cases[k][1], scale=1.4),
                     LaggedStart(*[FadeIn(d, scale=1.6) for d in neuve], lag_ratio=0.05)]
            if orange is not None:
                anims.append(orange.animate.set_color(TERME))
            self.play(*anims, run_time=0.45)
            orange = neuve
        fin = self.phrase([("En 2029 :", "2029"), ("2 100 spectateurs", "2 100 spectateurs", JUSTE)], 40, buff=0.3)
        fin.move_to(P(-2.0, -2.45))
        self.montrer_liste(fin)
        cad = self.encadre(fin[1], JUSTE, 0.12)
        self.play(Create(cad), *self.allumer_cases(lg, (3,)), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 06 : remonter le temps : l'opération inverse ───────────────────────

    def ecran_precedent(self):
        self.nouvel_ecran("06-precedent")
        tit = self.t("Remonter le temps", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.au_mot("remonter")
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.4)
        lg = LigneTermes(["?", ""], xs=(-2.2, 2.2), centre=P(0, 0.35), largeur=2.3, hauteur=1.0, fs=50,
                         noms=[u(4), u(5)], fs_noms=38)
        avant = arc_fleche(lg.cases[0][0].get_top() + UP * 0.1, lg.cases[1][0].get_top() + UP * 0.1, UP,
                           couleur=GREY_B, creux=0.4)
        self.play(FadeIn(lg.cases[0]), FadeIn(lg.cases[1][0]), FadeIn(lg.noms), run_time=0.4)
        self.lancer(avant, GREY_B, 0.45)
        self.au_mot("opération inverse")
        inv = self.t("On fait l'opération inverse", 36, WHITE).move_to(P(0, 2.4))
        self.play(FadeIn(inv, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("retire la raison")
        y_b = lg.noms.get_bottom()[1] - 0.12
        retour = arc_fleche(P(2.2, y_b), P(-2.2, y_b), DOWN, creux=0.45)
        lab = self.t("− la raison", 36, RAISON).next_to(retour, DOWN, buff=0.08)
        self.lancer(retour, RAISON, 0.6)
        self.play(FadeIn(lab, scale=1.3), run_time=0.25)
        self.au_mot("2 700")
        self.play(FadeIn(lg.cases[1][1].become(self.t("2 700", 50).move_to(lg.cases[1][0])), scale=1.4),
                  run_time=0.3)
        self.au_mot("alors")
        self.play(Indicate(lg.cases[0], color=RAISON, scale_factor=1.15), run_time=0.4)
        ts = [self.t(u(4), 42, TERME), self.t("=", 42), self.t("2 700", 42), self.t("− 300", 42, RAISON),
              self.t("=", 42), self.t("2 400", 42, JUSTE)]
        g = VGroup(*ts).arrange(RIGHT, buff=0.25).move_to(P(-0.4, -2.45))
        self.au_mot("2 700", n=2)
        self.play(FadeIn(ts[0]), FadeIn(ts[1]), FadeIn(ts[2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("moins")
        self.suivre("300")
        lab2 = self.t("− 300", 36, RAISON).move_to(lab)
        lab_av = self.t("+ 300", 32, GREY_A).next_to(avant, UP, buff=0.06)
        self.play(FadeIn(ts[3], shift=UP * 0.1), ReplacementTransform(lab, lab2), FadeIn(lab_av), run_time=0.35)
        self.au_mot("2 400")
        rep = self.t("2 400", 50, WHITE).move_to(lg.cases[0][0])
        vieux = lg.cases[0][1]
        self.play(FadeIn(ts[4]), FadeIn(ts[5], scale=1.3), FadeOut(vieux), FadeIn(rep, scale=1.3), run_time=0.35)
        self.remove(vieux)
        lg.cases[0].submobjects[1] = rep
        self.play(*self.allumer_cases(lg, (0,)), run_time=0.3)
        self.insister(ts[5], 1.25)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 : reculer d'un rang → B ───────────────────

    def ecran_question2(self):
        l1 = self.phrase([("Une suite vérifie", "Une suite vérifie"), ("wₙ₊₁ = wₙ − 4", "4", TERME)], 38)
        l2 = self.phrase([("et", "et w"), ("w₆ = 50.", "50", TERME)], 38)
        l3 = self.t("Combien vaut w₅ ?", 38)
        q = self.poser_question("07-question", [(l1, None), (l2, None), (l3, "Combien")], ["46", "54", "42"], 1,
                                en_ligne=True, largeur=2.6, fs=36)
        self.dire("07b-reponse")
        self.q_reponse(q, 1)
        y = q.cartes.get_bottom()[1] - 0.8
        self.au_mot("reculer")
        lg = LigneTermes(["", ""], xs=(-3.6, -0.4), centre=P(0, y), largeur=1.5, hauteur=0.75, fs=36)
        for k, nom in enumerate(("w₅", "w₆")):
            lg.cases[k][1].become(self.t(nom, 36, TERME).move_to(lg.cases[k][0]))
        self.play(FadeIn(lg.cases[0]), FadeIn(lg.cases[1]), run_time=0.3)
        retour = arc_fleche(lg.cases[1][0].get_bottom() + DOWN * 0.08, lg.cases[0][0].get_bottom() + DOWN * 0.08,
                            DOWN, couleur=JUSTE, creux=0.3)
        self.lancer(retour, JUSTE, 0.5)
        self.au_mot("opération inverse")
        inv = self.t("l'opération inverse", 32, GREY_A).next_to(lg, RIGHT, buff=0.5)
        self.play(FadeIn(inv, shift=LEFT * 0.1), run_time=0.3)
        self.au_mot("50 plus")
        lab = self.t("+ 4", 36, JUSTE).next_to(retour, DOWN, buff=0.05)
        calc = VGroup(self.t("w₅ =", 42, TERME), self.t("50", 42), self.t("+ 4", 42, JUSTE), self.t("=", 42),
                      self.t("54", 42, JUSTE)).arrange(RIGHT, buff=0.2).move_to(P(-1.0, -2.95))
        self.play(FadeIn(calc[:2], shift=UP * 0.1), run_time=0.25)
        self.suivre("4")
        self.play(FadeIn(lab, scale=1.3), FadeIn(calc[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("54")
        cad = self.encadre(calc[4], JUSTE, 0.1)
        self.play(FadeIn(calc[3:], scale=1.3), Create(cad), run_time=0.35)
        self.insister(VGroup(calc[4], cad), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 08 : le piège : la relation à l'envers ─────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("08-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(-3.0, 3.15))
        sc = scene_festival(3.6, P(3.9, 1.75))
        rangs = [rangee(2.45, 5.35, 1.4 - 0.3 * k, n=11, r=0.065, decale=k % 2 == 1) for k in range(5)]
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), FadeIn(sc), *[FadeIn(r) for r in rangs], run_time=0.45)
        f = VGroup(self.t("uₙ =", 50, WHITE), self.t("uₙ₊₁", 50, WHITE), self.t("+ 300", 50, PIEGE))
        f.arrange(RIGHT, buff=0.22).move_to(P(-3.0, 2.1))
        for m, ex in zip(f, ("u indice n égale", "u indice n plus 1", "300")):
            self.suivre(ex)
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.25)
        lg = LigneTermes(["", ""], xs=(-4.6, -1.4), centre=P(0, 0.15), largeur=1.6, hauteur=0.8, fs=40)
        for k, nom in enumerate(("uₙ", "uₙ₊₁")):
            lg.cases[k][1].become(self.t(nom, 40, TERME).move_to(lg.cases[k][0]))
        self.play(FadeIn(lg.cases[0]), FadeIn(lg.cases[1]), run_time=0.3)
        self.au_mot("à l'envers")
        fl = arc_fleche(lg.cases[1][0].get_top() + UP * 0.08, lg.cases[0][0].get_top() + UP * 0.08, UP,
                        couleur=PIEGE, creux=0.32)
        lab = self.t("+ 300", 32, PIEGE, audit=False).next_to(fl, UP, buff=0.3)
        self.lancer(fl, PIEGE, 0.45, extra=[FadeIn(lab)])
        # la formule : un seul trait (elle reste lisible) ; la flèche : une petite croix sur l'arc seul
        x1 = Line(f.get_left() + LEFT * 0.12, f.get_right() + RIGHT * 0.12, stroke_color=PIEGE, stroke_width=5)
        x2 = self.barrer(Square(0.32).move_to(fl.point_from_proportion(0.5)), buff=0)
        env = self.t("à l'envers !", 38, PIEGE).move_to(P(-3.0, -0.72))
        self.play(Create(x1), Create(x2), FadeIn(env, scale=1.2), run_time=0.45)
        self.au_mot("plus grand")
        pg = self.t("le terme d'avant > le suivant", 32, PIEGE).move_to(P(-3.0, -1.38))
        self.play(FadeIn(pg, shift=UP * 0.1), Indicate(lg.cases[0], color=PIEGE, scale_factor=1.15), run_time=0.45)
        self.au_mot("perdrait")
        perte = rangs[-1]
        moins = self.t("− 300", 32, PIEGE, audit=False).move_to(P(3.9, -0.1))
        self.play(perte.animate.set_color(PIEGE), run_time=0.3)
        self.play(FadeOut(perte, shift=DOWN * 0.4), FadeIn(moins, shift=DOWN * 0.1), run_time=0.6)
        self.au_mot("La relation donne")
        juste = VGroup(self.t("uₙ₊₁", 46, TERME), self.t("=", 46), self.t("uₙ", 46, TERME),
                       self.t("+ 300", 46, RAISON, audit=False)).arrange(RIGHT, buff=0.2)
        ok = self.coche(JUSTE, 0.26)
        bloc = VGroup(ok, juste).arrange(RIGHT, buff=0.3).move_to(P(-1.6, -2.3))
        cad = self.encadre(juste, JUSTE, 0.15)
        self.play(FadeIn(juste, shift=UP * 0.1), Create(cad), Create(ok), run_time=0.45)
        self.au_mot("SUIVANT")
        sv = VGroup(self.t("le SUIVANT", 30, TERME), self.t("à partir de l'actuel", 30, GREY_A))
        sv.arrange(RIGHT, buff=0.2).next_to(cad, DOWN, buff=0.14)
        self.play(FadeIn(sv[0], shift=UP * 0.1), Indicate(juste[0], color=TERME), run_time=0.4)
        self.au_mot("à partir")
        self.play(FadeIn(sv[1], shift=UP * 0.1), Indicate(juste[2], color=TERME), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi ───────────────────────────────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi", y=3.1)
        lg = LigneTermes([fr(DEFI[0]), "?", "?", "?"], xs=(-4.5, -1.5, 1.5, 4.5), centre=P(0, -0.15), largeur=1.6,
                         hauteur=0.85, fs=40, noms=[u(k, "t") for k in range(1, 5)], fs_noms=32)
        donnees = self.phrase([("t₁ = 7,5 ;", "7,5"), ("tₙ₊₁ = tₙ + 2,5", "2,5"),
                               ("pour n ≥ 1", "1", GREY_A)], 38, buff=0.35)
        donnees.move_to(P(0, 2.4))
        self.suivre("7,5")
        self.play(FadeIn(donnees[0], scale=1.2), FadeIn(lg.cases[0]), FadeIn(lg.noms[0]), run_time=0.35)
        self.suivre("2,5")
        self.play(FadeIn(donnees[1], scale=1.2), run_time=0.3)
        self.au_mot("égal à")
        self.suivre("1")
        self.play(FadeIn(donnees[2], shift=UP * 0.1), Indicate(lg.noms[0], color=TERME, scale_factor=1.4),
                  run_time=0.4)
        self.au_mot("Calcule")
        cal = self.t("Calcule t₄, pas à pas.", 40, RAISON).move_to(P(0, 1.7))
        self.play(FadeIn(cal, shift=UP * 0.1), *[FadeIn(lg.cases[k], scale=0.8) for k in (1, 2, 3)],
                  *[FadeIn(lg.noms[k]) for k in (1, 2, 3)], run_time=0.4)
        self.au_mot("pas à pas")
        sauts = [lg.saut(k, "+ 2,5", cote=UP, fs=28) for k in range(3)]
        for k, s_ in enumerate(sauts):
            s_[1]._pas_audit = True                       # la raison déjà écrite plus haut
            lg.sauts[k] = s_
        self.play(LaggedStart(*[AnimationGroup(Create(s_[0]), FadeIn(s_[1], scale=1.3)) for s_ in sauts],
                              lag_ratio=0.3), run_time=0.6)
        self.defi_pause(-1.75)
        self._defi = (tit, lg, cal)

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, lg, cal = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 48, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), FadeOut(cal), run_time=0.4)
        self.au_mot("commence à t indice 1")
        self.play(Indicate(lg.cases[0], color=TERME, scale_factor=1.15), run_time=0.4)
        lignes = []
        for k, y in zip((1, 2, 3), (-1.4, -2.1, -2.8)):
            a, b = fr(DEFI[k - 1]), fr(DEFI[k])
            neuf = self.t(b, 40, WHITE).move_to(lg.cases[k][0])
            lignes.append(self.calcul([(f"{u(k + 1, 't')} =", TERME, f"t indice {k + 1}"), (a, WHITE, a),
                                       ("+ 2,5", RAISON, "2,5"), ("=", WHITE, None), (b, JUSTE, b)], y, x=-6.3,
                                      fs=38, avec=[ReplacementTransform(lg.cases[k][1], neuf)]))
            lg.cases[k].submobjects[1] = neuf
        self.au_mot("3 pas")
        trois = self.t("3 pas", 44, RAISON).move_to(P(3.2, -1.45))
        self.play(FadeIn(trois, scale=1.3), *[Indicate(s, color=RAISON, scale_factor=1.15) for s in lg.sauts.values()],
                  run_time=0.6)
        rr = VGroup(self.t("t₄ =", 46, JUSTE), self.t("15", 46, JUSTE, audit=False)).arrange(RIGHT, buff=0.18)
        rr.move_to(P(3.2, -2.4))
        cad = self.encadre(rr, JUSTE, 0.16)
        self.play(FadeIn(rr, scale=1.3), Create(cad), *self.allumer_cases(lg, (3,)), run_time=0.4)
        self.insister(VGroup(rr, cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        p1 = [self.t("La relation de récurrence :", fs, JAUNE_TITRE),
              VGroup(self.t("uₙ₊₁", fs + 4, TERME), self.t("=", fs + 4), self.t("uₙ", fs + 4, TERME),
                     self.t("+ r", fs + 4, RAISON)).arrange(RIGHT, buff=0.18)]
        p2 = [VGroup(self.t("Avancer d'un rang :", fs), self.t("on ajoute r", fs, RAISON)).arrange(RIGHT, buff=0.2),
              VGroup(self.t("Reculer d'un rang :", fs), self.t("on retire r", fs, RAISON)).arrange(RIGHT, buff=0.2)]
        p3 = [self.t("On déroule pas à pas,", fs), self.t("depuis le premier terme.", fs)]
        self.finale([(p1, ["La relation", "u indice n plus 1"]), (p2, ["avancer", "reculer"]),
                     (p3, ["déroule", "premier terme"])])

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_notation()
        self.ecran_relation()
        self.ecran_question1()
        self.ecran_derouler()
        self.ecran_precedent()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin()
