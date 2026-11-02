# prop_lycee_nature_pourcentage.py
# EleveAI — Maths STMG — série « Proportionnalité », LYCÉE, épisode 05 :
# PROPORTION OU ÉVOLUTION ? (micro du coach : auto_evo_nature_pourcentage,
# notion auto_evo_taux), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Short jumeau : prop_lycee_nature_pourcentage_short.py (blanche).
# ⭐ Méthode travaillée : une PROPORTION compare une partie à un tout, au même
# moment (partie ÷ tout) ; une ÉVOLUTION compare deux valeurs à deux dates
# ((arrivée − départ) ÷ départ) ; entre deux proportions, l'écart se compte en
# POINTS. Les mots qui trahissent l'évolution : « augmenter de », « baisser
# de », « passer de… à ». « × » et « ÷ » écrits, décimaux à la virgule.
# ⭐ Leurres (les erreurs dites par la voix) : question 1 (« progressé de
# 32 % ») A proportion, C les deux ; question 2 (30 % → 25 %) A « 5 % » au
# lieu de 5 points, C 25 % (la valeur d'arrivée) ; le piège 06 : l'or monte
# de 60 % pendant que sa PART baisse (30 % → 25 %) : on ne compare pas une
# proportion et une évolution.
#
# Décor et métier : SPORT, Moussa, JOURNALISTE DE DONNÉES sportives (son
# ordinateur, un graphique). Deux colonnes « Tokyo » / « Paris », la barre de
# 100 % (la part de l'or), la flèche entre deux dates (33 → 64).
# ⛔ Aucun logo olympique (pas d'anneaux) : « Jeux de Paris 2024 » écrit.
# Centre d'intérêt : sport.
# Sources (prompt lycée du 02/11/2026) : tableaux officiels des médailles :
#   · Jeux de Paris 2024 : France 64 médailles (16 or, 26 argent, 22 bronze) ;
#   · Jeux de Tokyo 2020 (disputés en 2021) : France 33 médailles, dont 10 en or.
#   Calculs : 16 ÷ 64 = 0,25 ; (64 − 33) ÷ 33 = 31 ÷ 33 ≈ 0,94 ; 10 ÷ 33 ≈ 0,303 ;
#   (16 − 10) ÷ 10 = 0,6 ; défi : 0,55 × 200 000 = 110 000 €.
#
# Écrans : 00 garde · 01 Moussa, Paris 64 (16 or), Tokyo 33 · 02 proportion
# 16 ÷ 64 = 25 % · 03 évolution 33 → 64, + 94 % · 04 les repérer · 05 QUESTION 1
# (ventes + 32 %) · 06 le piège (or + 60 %, part 30 % → 25 %) · 07 QUESTION 2
# (5 points) · 08 défi (stock importé ; chiffre d'affaires − 45 %) · 08b
# correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/stmg-prop-nature-pourcentage.json (validée par Frédéric le
# 02/11, débit −10), WAV dans public/sons/stmg-prop-nature-pourcentage/ ;
# marques mot à mot : manim/scripts/stmg/prop_lycee_nature_pourcentage_marques.json
# (scripts/marques_dump.ps1 puis le convertisseur à seuil 0,5 s).
# Outils (non modifiés) : prop_commun.py, canvas_proportion.py, la base
# PropPourcentageCoefficientBase de l'épisode 4e 35 (BarreCent, lc, jouer,
# montre, barrer, barrer_choix, accolade, cadre, ligne_rep bornée) ; boite()
# et fleche_coef() de l'épisode 4e 36 (évolution). Ajouté ICI : moussa(),
# ordinateur(), medaille(), colonnes(), part_barre(), source().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/stmg/prop_lycee_nature_pourcentage.py PropLyceeNaturePourcentageStmg
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/stmg/prop_lycee_nature_pourcentage.py PropLyceeNaturePourcentageStmg -o eleveai-maths-stmg-prop-nature-pourcentage --media_dir manim/scripts/stmg/media-prop-lycee-nature
# Sortie : manim/sorties/stmg/maths/proportionnalite/05-nature-pourcentage/eleveai-maths-stmg-prop-nature-pourcentage.mp4

import importlib.util
import os
import sys
from pathlib import Path

_ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_p35 = _charger("prop_pourcentage_coefficient_4e", _ICI.parents[0] / "4e" / "prop_pourcentage_coefficient.py")
_p36 = _charger("prop_pourcentage_evolution_4e", _ICI.parents[0] / "4e" / "prop_pourcentage_evolution.py")
from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, personne, P…)

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

PropPourcentageCoefficientBase = _p35.PropPourcentageCoefficientBase
BarreCent, gras, sans = _p35.BarreCent, _p35.gras, _p35.sans
boite, fleche_coef = _p36.boite, _p36.fleche_coef

OR = "#facc15"         # l'or (et la part de l'or)
ARGENT = "#cbd5e1"
BRONZE = "#d97706"
AUTRES = "#64748b"     # les autres médailles (argent + bronze), dans les colonnes
PROP = "#38bdf8"       # la PROPORTION (bleu)
EVO = "#22c55e"        # l'ÉVOLUTION (vert)
BAISSE = "#ef4444"
TENUE_M = "#0f766e"    # la veste de Moussa (vert canard)


def pas_audit(m):
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def ordinateur(s=1.0):
    """Un ordinateur portable ouvert, un petit graphique en barres à l'écran."""
    ecran = RoundedRectangle(width=1.5, height=0.95, corner_radius=0.06, fill_color="#0b1220", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3).move_to(P(0, 0.5))
    barres = VGroup(*[Rectangle(width=0.18, height=h, fill_color=c, fill_opacity=1, stroke_width=0)
                      .move_to(P(x, 0.17 + h / 2)) for x, h, c in ((-0.4, 0.3, PROP), (-0.13, 0.5, EVO),
                                                                  (0.14, 0.38, OR), (0.41, 0.62, EVO))])
    clavier = Polygon(P(-0.85, 0.0), P(0.85, 0.0), P(1.0, -0.18), P(-1.0, -0.18), fill_color="#94a3b8",
                      fill_opacity=1, stroke_width=0)
    return VGroup(ecran, barres, clavier).scale(s)


def moussa(s=1.0):
    """Moussa, journaliste de données sportives : veste vert canard, badge presse."""
    p = personne(peau="#8d5524", tenue=TENUE_M, cheveux="#111827")
    badge = RoundedRectangle(width=0.42, height=0.26, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(p.corps.get_center() + P(0.24, 0.3))
    trait = Rectangle(width=0.3, height=0.05, fill_color=PROP, fill_opacity=1, stroke_width=0).move_to(badge)
    p.add(badge, trait)
    return p.scale(s)


def medaille(couleur=OR, r=0.35):
    """Une médaille (disque, liseré, ruban en V), sans aucun logo."""
    ruban = VGroup(Polygon(P(-0.32, 1.0), P(-0.12, 1.0), P(0.06, 0.25), P(-0.12, 0.25), fill_color="#2563eb",
                           fill_opacity=1, stroke_width=0),
                   Polygon(P(0.32, 1.0), P(0.12, 1.0), P(-0.06, 0.25), P(0.12, 0.25), fill_color="#dc2626",
                           fill_opacity=1, stroke_width=0)).scale(r / 0.35, about_point=ORIGIN)
    disque = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    etoile = Star(5, outer_radius=r * 0.45, inner_radius=r * 0.2, fill_color=WHITE, fill_opacity=0.85,
                  stroke_width=0)
    return VGroup(ruban, disque, etoile)


def colonne(n, n_or, x, base=-2.3, k=0.066, l=1.9):
    """La colonne des médailles d'une édition : n médailles (hauteur k par
    médaille), l'or en bas. .tout · .or_ ; rien n'est ajouté à la scène."""
    tout = Rectangle(width=l, height=n * k, fill_color=AUTRES, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    tout.move_to(P(x, base + n * k / 2))
    or_ = Rectangle(width=l, height=n_or * k, fill_color=OR, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    or_.move_to(P(x, base + n_or * k / 2))
    g = VGroup(tout, or_)
    g.tout, g.or_ = tout, or_
    return g


class PropLyceeNaturePourcentageBase(PropPourcentageCoefficientBase):
    nom_voix = "stmg-prop-nature-pourcentage"
    fichier_marques = "prop_lycee_nature_pourcentage_marques.json"
    identite = "Maths STMG — EleveAI"
    ceinture = "orange"

    # ── les outils de l'épisode ─────────────────────────────────────────────
    @staticmethod
    def part_barre(b, k, couleur=OR, depuis=0.0):
        """La partie de la barre de 100 % qui vaut k morceaux de 10 % (k décimal : 2,5)."""
        r = Rectangle(width=b.lm * k, height=b.hh, stroke_width=0, fill_color=couleur, fill_opacity=1)
        r.align_to(b.morceaux[0], LEFT).shift(RIGHT * b.lm * depuis)
        return r.set_y(b.morceaux[0].get_y())

    def source(self, lignes):
        """La source, discrète, en bas à gauche (lue, jamais dite)."""
        s = VGroup(*[Text(x, font_size=16, color=GREY_B) for x in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        for x in s:
            x._bloc = True
        s._bloc = True
        return pas_audit(s).to_corner(DL, buff=0.45)

    Y_PH = -1.0   # le haut de la phrase de réponse, à GAUCHE sous la figure

    def _disposer_q(self, question, choix, phrase):
        """La phrase de réponse en grand (34) à GAUCHE, sous la figure : à droite,
        sous les cartes et au-dessus de Ti-Margo, elle était réduite à ~20."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = self.bloc(phrase, 34, VERT_OK)
        if ph2.width > 5.4:
            ph2.scale_to_fit_width(5.4)
        ph2.align_to(P(-6.15, 0), LEFT).align_to(P(0, self.Y_PH), UP)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def boite_or(self, nb, x, y, couleur=OR, l=1.7, fs=40):
        return boite(nb, couleur, fs=fs, l=l).move_to(P(x, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Proportion ou évolution ?", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Proportion")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        meds = VGroup(medaille(OR, 0.42), medaille(ARGENT, 0.42), medaille(BRONZE, 0.42))
        meds.arrange(RIGHT, buff=0.35).move_to(P(-4.3, 0.2))
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.3) for m in meds], lag_ratio=0.25), run_time=0.8)
        p1 = VGroup(Circle(radius=0.6, fill_color=PROP, fill_opacity=0.2, stroke_color=PROP, stroke_width=5),
                    gras("%", 56, PROP)).move_to(P(-0.6, 0.2))
        p2 = VGroup(Circle(radius=0.6, fill_color=EVO, fill_opacity=0.2, stroke_color=EVO, stroke_width=5),
                    gras("%", 56, EVO)).move_to(P(2.6, 0.2))
        ne = gras("≠", 60, ROUGE_ERREUR).move_to(P(1.0, 0.2))
        self.au_mot("Deux pourcentages")
        self.play(GrowFromCenter(p1), GrowFromCenter(p2), run_time=0.6)
        self.au_mot("pas la même")
        self.play(FadeIn(ne, scale=1.5), run_time=0.4)
        self.insister(ne, 1.3, 0.2)
        self.attendre_voix(marge=0.6)

    # ── 01 : Moussa ; Paris 2024 : 64 médailles dont 16 en or ; Tokyo : 33 ───
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = moussa(1.0).move_to(P(-5.4, -0.4))
        nom = self.t("Moussa", 40, PROP).next_to(pers, UP, buff=0.3)
        self.montre("Voici Moussa", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = VGroup(self.t("journaliste", 28, PROP), self.t("de données sportives", 26, PROP))
        met.arrange(DOWN, buff=0.08).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        sans(met[1])
        ordi = ordinateur(0.85).move_to(P(-3.2, -1.0))
        self.montre("journaliste", FadeIn(met, shift=DOWN * 0.1), FadeIn(ordi, shift=UP * 0.2), rt=0.5)
        xt, xp = -0.85, 3.4
        cp = colonne(64, 16, xp)
        ct = colonne(33, 10, xt)
        sol = Line(P(-2.15, -2.3), P(4.9, -2.3), color=GREY_B, stroke_width=4)
        lp = self.t("Jeux de Paris 2024", 30, WHITE).next_to(cp.tout, DOWN, buff=0.15).shift(DOWN * 0.05)
        lt = sans(self.t("Jeux de Tokyo", 30, WHITE)).next_to(ct.tout, DOWN, buff=0.15)
        lt.align_to(lp, DOWN)
        self.montre("Paris 2024", Create(sol), FadeIn(lp, shift=UP * 0.1), rt=0.45)
        n64 = gras("64 médailles", 32, WHITE).next_to(cp.tout, UP, buff=0.12)
        self.montre("64 médailles", GrowFromEdge(cp.tout, DOWN), FadeIn(n64, scale=1.2), rt=0.6)
        n16 = gras("16 en or", 24, NUIT).move_to(cp.or_)
        self.montre("16 en or", GrowFromEdge(cp.or_, DOWN), FadeIn(n16, scale=1.3), rt=0.5)
        self.insister(n16, 1.2, 0.2)
        n33 = gras("33 médailles", 32, WHITE).next_to(ct.tout, UP, buff=0.12)
        self.montre("Tokyo", FadeIn(lt, shift=UP * 0.1), GrowFromEdge(ct.tout, DOWN), rt=0.5)
        self.montre("33", FadeIn(n33, scale=1.2), rt=0.4)
        src = self.source(["Sources : tableaux officiels des médailles, Jeux de Tokyo (disputés en 2021) et Jeux",
                           "de Paris 2024 : France 33 médailles (10 en or), puis 64 (16 or, 26 argent, 22 bronze)."])
        self.play(FadeIn(src), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la proportion : 16 ÷ 64 = 0,25 = 25 % ─────────────────────────
    def ecran_proportion(self):
        self.ecran("02-proportion")
        self.titre_haut("Premier pourcentage", "Premier", couleur=PROP)
        b = self.barre(y=1.35, largeur=6.0, x=-3.0)
        a, t = self.accolade(b.bp.piste, "le tout : 64 médailles", WHITE, fs=30)
        p = self.part_barre(b, 2.5, OR)
        ao, to = self.accolade(p, "16 en or", OR, DOWN, fs=28)
        to.align_to(b.bp.piste, LEFT)
        xl = 0.9
        L1 = self.lc([("16 ÷", OR), ("64", WHITE), ("= 0,25", WHITE)], 1.75, fs=46, xl=xl)
        self.jouer(L1, ["16 divisé", "par 64", "égale 0,25"],
                   {0: [FadeIn(b, shift=UP * 0.2), FadeIn(p), GrowFromCenter(ao), FadeIn(to)],
                    1: [GrowFromCenter(a), FadeIn(t)]})
        v = gras("25 %", 26, NUIT).move_to(p)
        L2 = self.lc([("25 %", PROP), ("des médailles", WHITE)], 0.9, fs=42, xl=xl)
        L2b = self.lc([("sont en or", WHITE)], 0.2, fs=42, xl=xl)
        self.jouer(L2, ["25 % des", "des médailles"], {0: [FadeIn(v, scale=1.4)]})
        self.jouer(L2b, ["sont en or"])
        self.play(Create(self.cadre(L2[0], PROP)), run_time=0.3)
        f = self.tampon("Proportion : une partie d'un tout", PROP, 40).move_to(P(-0.4, -1.25))
        self.montre("C'est une proportion", FadeIn(f, scale=1.2), Circumscribe(b.bp.piste, color=PROP, buff=0.06),
                    rt=0.6)
        m = self.t("au même moment", 36, GREY_B).move_to(P(-0.4, -2.3))
        self.montre("au même moment", FadeIn(m, shift=UP * 0.15), rt=0.4)
        self.insister(f, 1.06, 0.2)
        self.attendre_voix()

    # ── 03 : l'évolution : 33 → 64 ; 31 ÷ 33 ≈ 0,94 ; + 94 % ────────────────
    def ecran_evolution(self):
        self.ecran("03-evolution")
        self.titre_haut("Deuxième pourcentage", "Deuxième", couleur=EVO)
        y = 1.75
        b33 = self.boite_or("33", -4.3, y, PROP)
        b64 = self.boite_or("64", 1.5, y, EVO)
        lt = sans(self.t("Tokyo", 28, GREY_B)).next_to(b33, UP, buff=0.12)
        lp = sans(self.t("Paris", 28, GREY_B)).next_to(b64, UP, buff=0.12)
        fl = fleche_coef(b33, b64, bas="≈ + 94 %", c_haut=EVO, c_bas=EVO, fs=34)
        self.montre("33 à", FadeIn(b33, scale=0.8), FadeIn(lt), rt=0.4)
        self.montre("64 médailles", GrowArrow(fl.fleche), FadeIn(b64, scale=0.8), FadeIn(lp), rt=0.5)
        x = -1.4
        L1 = self.lc([("64 −", EVO), ("33", PROP), ("= 31", WHITE)], 0.45, fs=44, xl=x)
        self.jouer(L1, ["64 moins", "33, égale", "égale 31"])
        L2 = self.lc([("31 ÷", WHITE), ("33", PROP), ("≈ 0,94", WHITE)], -0.35, fs=44, xl=x)
        self.jouer(L2, ["31 divisé", "par 33", "environ 0,94"])
        self.au_mot("94 %")
        self.play(FadeIn(fl.bas, scale=1.4), Indicate(fl.fleche, color=EVO), run_time=0.45)
        self.insister(fl.bas, 1.2, 0.2)
        f = self.tampon("Évolution : on compare deux dates", EVO, 40).move_to(P(-0.4, -1.55))
        self.montre("C'est une évolution", FadeIn(f, scale=1.2), rt=0.5)
        d1 = pas_audit(self.t("2021", 28, PROP)).next_to(b33, DOWN, buff=0.12)
        d2 = pas_audit(self.t("2024", 28, EVO)).next_to(b64, DOWN, buff=0.12)
        self.montre("deux dates", FadeIn(d1, shift=UP * 0.1), FadeIn(d2, shift=UP * 0.1), rt=0.4)
        self.play(Indicate(VGroup(d1, d2), color=WHITE), run_time=0.6)
        self.attendre_voix()

    # ── 04 : les repérer : « 25 % des… » / « augmenter de », « passer de… à »
    def ecran_reperer(self):
        self.ecran("04-reperer")
        self.titre_haut("Pour les reconnaître", "Pour les", fs=44)
        c1 = RoundedRectangle(width=5.6, height=4.1, corner_radius=0.2, stroke_color=PROP, stroke_width=4,
                              fill_color=PROP, fill_opacity=0.08).move_to(P(-3.2, -0.15))
        c2 = RoundedRectangle(width=5.6, height=4.1, corner_radius=0.2, stroke_color=EVO, stroke_width=4,
                              fill_color=EVO, fill_opacity=0.08).move_to(P(2.75, -0.15))
        self.play(Create(c1), Create(c2), run_time=0.5)
        q1 = self.ligne([("« 25 %", WHITE), ("des médailles »", WHITE)], 36).move_to(c1.get_center() + UP * 0.95)
        self.jouer(q1, ["25 % des", "médailles"])
        b = BarreCent("", largeur=4.2, h=0.6, centre=c1.get_center() + DOWN * 0.1)
        p = self.part_barre(b, 2.5, OR)
        h1 = gras("une proportion", 38, PROP).move_to(c1.get_center() + DOWN * 1.2)
        self.montre("c'est une proportion", FadeIn(b), FadeIn(p), FadeIn(h1, scale=1.2), rt=0.5)
        mots = [("« augmenter de »", "Augmenter de"), ("« baisser de »", "baisser de"),
                ("« passer de… à »", "passer de")]
        y0 = c2.get_top()[1] - 0.6
        for i, (s, mot) in enumerate(mots):
            q = self.t(s, 34, WHITE).move_to(P(c2.get_x(), y0 - 0.62 * i))
            self.montre(mot, FadeIn(q, shift=RIGHT * 0.15), rt=0.35)
        ba = boite("", PROP, l=1.0, h=0.55).move_to(c2.get_center() + P(-1.4, -0.75))
        bb = boite("", EVO, l=1.0, h=0.55).move_to(c2.get_center() + P(1.4, -0.75))
        fl = Arrow(ba.get_right(), bb.get_left(), buff=0.12, color=EVO, stroke_width=6)
        h2 = gras("une évolution", 38, EVO).move_to(c2.get_center() + DOWN * 1.5)
        self.montre("c'est une évolution", FadeIn(ba), GrowArrow(fl), FadeIn(bb), FadeIn(h2, scale=1.2), rt=0.5)
        self.insister(VGroup(h1, h2), 1.08, 0.2)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (« Les ventes ont progressé de 32 % en un an ») ─────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        base = -0.2
        ba = Rectangle(width=1.0, height=1.6, fill_color=PROP, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        bb = Rectangle(width=1.0, height=2.1, fill_color=EVO, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        ba.move_to(P(-5.0, base + 0.8))
        bb.move_to(P(-3.2, base + 1.05))
        sol = Line(P(-5.9, base), P(-2.3, base), color=GREY_B, stroke_width=4)
        fl = Arrow(ba.get_top() + UP * 0.2, bb.get_top() + UP * 0.2, buff=0.05, color=EVO, stroke_width=6)

        def avant(sc):
            sc.play(Create(sol), GrowFromEdge(ba, DOWN), GrowFromEdge(bb, DOWN), run_time=0.5)

        def apres(sc):
            ta = sans(sc.t("avant", 28, PROP)).next_to(ba, DOWN, buff=0.15)
            tb = sans(sc.t("après", 28, EVO)).next_to(bb, DOWN, buff=0.15)
            sc.montre("On compare", FadeIn(sc.ph_q[0], shift=UP * 0.12), rt=0.35)
            sc.montre("deux dates", FadeIn(sc.ph_q[1], shift=UP * 0.12), FadeIn(ta, shift=UP * 0.1),
                      FadeIn(tb, shift=UP * 0.1), GrowArrow(fl), rt=0.5)
            sc.montre("c'est une", FadeIn(sc.ph_q[2], shift=UP * 0.12), rt=0.35)
            sc.rep_fini()

        self.Y_PH = -1.0
        self.question_pause("05-question", "05b-reponse",
                            ["« Les ventes ont progressé", "de 32 % en un an. »", "Ce pourcentage est :"],
                            [self.t("une proportion", 34), self.t("une évolution", 34), self.t("les deux", 34)], 1,
                            ["On compare les ventes", "à deux dates :", "c'est une évolution."],
                            mot_q="Les ventes", avant_q=avant, autres_r=apres)

    # ── 06 : le piège : l'or + 60 %, sa part 30 % → 25 % ───────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        xb, lb = -3.2, 5.4
        bt = self.barre(y=1.9, largeur=lb, x=xb, h=0.65)
        pt = self.part_barre(bt, 3.03, OR)
        bp = self.barre(y=0.55, largeur=lb, x=xb, h=0.65)
        pp = self.part_barre(bp, 2.5, OR)
        nt = sans(self.t("Tokyo", 26, GREY_B)).next_to(bt, UP, buff=0.08).align_to(bt, LEFT)
        npa = sans(self.t("Paris", 26, GREY_B)).next_to(bp, UP, buff=0.08).align_to(bp, LEFT)
        xl = 0.75
        L1 = self.lc([("10 en or sur 33", WHITE), ("≈ 30 %", OR)], 1.9, fs=38, xl=xl)
        self.jouer(L1, ["10 médailles", "environ 30"],
                   {0: [FadeIn(bt), FadeIn(nt)], 1: [GrowFromEdge(pt, LEFT)]})
        L2 = self.lc([("16 en or sur 64", WHITE), ("= 25 %", OR)], 0.55, fs=38, xl=xl)
        self.jouer(L2, ["16 sur", "25 %"], {0: [FadeIn(bp), FadeIn(npa)], 1: [GrowFromEdge(pp, LEFT)]})
        y = -0.95
        g10 = self.boite_or("10", -5.3, y, OR, l=1.3, fs=36)
        g16 = self.boite_or("16", -1.6, y, OR, l=1.3, fs=36)
        fo = fleche_coef(g10, g16, haut="+ 60 %", c_haut=EVO, fs=32)
        lo = sans(self.t("l'or", 26, OR)).next_to(g10, DOWN, buff=0.1)
        self.montre("60 %", GrowArrow(fo.fleche), FadeIn(fo.haut, scale=1.3), rt=0.45)
        self.montre("de 10 à", FadeIn(g10, scale=0.8), FadeIn(lo), rt=0.3)
        self.montre("16 médailles", FadeIn(g16, scale=0.8), rt=0.3)
        L3 = self.lc([("et pourtant sa part", WHITE), ("a baissé !", ROUGE_ERREUR)], y, fs=38, xl=xl)
        bas = Arrow(P(0.2, 2.0), P(0.2, 0.45), buff=0, color=ROUGE_ERREUR, stroke_width=8,
                    max_tip_length_to_length_ratio=0.25)
        self.jouer(L3, ["pourtant", "a baissé"], {1: [GrowArrow(bas), Indicate(VGroup(pt, pp), color=ROUGE_ERREUR)]})
        f = self.tampon("Elles ne s'additionnent pas, ne se comparent pas !", ROUGE_ERREUR, 28).move_to(P(-0.4, -2.3))
        self.montre("Une proportion et", FadeIn(f, scale=1.15), rt=0.5)
        self.insister(f, 1.06, 0.2)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (30 % → 25 % : 5 points) ────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        md = medaille(OR, 0.4).move_to(P(-4.3, 2.55))

        def avant(sc):
            sc.play(FadeIn(md, shift=DOWN * 0.3), run_time=0.4)

        def apres(sc):
            xb, lb = -3.4, 5.0
            b1 = BarreCent("", largeur=lb, h=0.55, centre=P(xb, 0.55))
            b2 = BarreCent("", largeur=lb, h=0.55, centre=P(xb, -0.3))
            p1, p2 = sc.part_barre(b1, 3.0, OR), sc.part_barre(b2, 2.5, OR)
            gap = sc.part_barre(b1, 0.5, ROUGE_ERREUR, depuis=2.5)
            t1 = pas_audit(gras("30 %", 22, NUIT).move_to(p1))
            t2 = pas_audit(gras("25 %", 22, NUIT).move_to(p2))
            ag, tg = sc.accolade(gap, "5 points", ROUGE_ERREUR, UP, fs=28)
            sc.montre("Entre deux", FadeIn(sc.ph_q[0], shift=UP * 0.12), rt=0.35)
            sc.montre("la différence", FadeIn(sc.ph_q[1], shift=UP * 0.12), FadeIn(b1), FadeIn(p1), FadeIn(t1),
                      FadeIn(b2), FadeIn(p2), FadeIn(t2), rt=0.4)
            l0 = sc.ligne_rep(2, ["en points :", "30 −", "25", "= 5 points."])
            sc.montre("en points", FadeIn(l0[0], shift=UP * 0.12), rt=0.3)
            sc.montre("30 moins", FadeIn(l0[1], shift=UP * 0.12), rt=0.3)
            sc.montre("moins 25", FadeIn(l0[2], shift=UP * 0.12), rt=0.3)
            sc.montre("égale 5", FadeIn(l0[3], scale=1.3), FadeIn(gap), GrowFromCenter(ag), FadeIn(tg, scale=1.3),
                      rt=0.45)
            sc.rep_fini()

        self.Y_PH = -0.9
        self.question_pause("07-question", "07b-reponse",
                            ["La part de l'or passe", "de 30 % à 25 %.", "Elle a baissé de :"],
                            [self.t("5 %", 34), self.t("5 points", 34), self.t("25 %", 34)], 1,
                            ["Entre deux proportions,", "la différence se compte", "en points : 30 − 25 = 5 points."],
                            mot_q="La part", avant_q=avant, autres_r=apres)

    # ── 08 : défi : « 45 % du stock est importé » / « le CA a chuté de 45 % »
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        xl = -5.9
        L0 = self.lc([("Deux phrases :", AMBRE)], 2.25, fs=38, xl=xl)
        self.jouer(L0, ["Deux phrases"])
        L1 = self.lc([("Un :", AMBRE), ("« 45 %", WHITE), ("du stock est importé »", WHITE)], 1.45, fs=38, xl=xl)
        self.jouer(L1, ["Un :", "45 % du", "stock"])
        L2 = self.lc([("Deux :", AMBRE), ("« le chiffre d'affaires", WHITE), ("a chuté de 45 % »", WHITE)], 0.65,
                     fs=38, xl=xl)
        self.jouer(L2, [("Deux :", 1), "le chiffre", "chuté de"])
        L3 = self.lc([("Laquelle est une proportion ?", PROP)], -0.2, fs=38, xl=xl)
        self.jouer(L3, ["Laquelle"])
        self.insister(L3, 1.06, 0.2)
        y = -1.25
        ca = boite("", PROP, l=3.0, h=0.85).move_to(P(-4.3, y))
        v = gras("200 000 €", 34, WHITE).move_to(ca)
        pas_audit(v)  # « 200 000 » : l'audit le lit mal (200000), calé à la main sur « 200 000 euros »
        arr = boite("? €", BAISSE, fs=34, l=2.0, h=0.85).move_to(P(0.4, y))
        fl = Arrow(ca.get_right(), arr.get_left(), buff=0.12, color=BAISSE, stroke_width=6)
        lab = gras("− 45 %", 30, BAISSE).next_to(fl, UP, buff=0.08)
        sans(lab)
        self.montre("200 000 euros", FadeIn(ca, scale=0.8), FadeIn(v, scale=1.2), rt=0.4)
        self.montre("après la chute", GrowArrow(fl), FadeIn(lab), FadeIn(arr, scale=0.8), rt=0.5)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        xl = -5.9
        L1 = self.lc([("Un :", AMBRE), ("une proportion,", PROP), ("une part du stock", WHITE)], 2.15, fs=38, xl=xl)
        self.jouer(L1, ["La phrase un", "une proportion", "une part du"], {0: [FadeIn(tit)]})
        L2 = self.lc([("Deux :", AMBRE), ("une évolution", EVO)], 1.4, fs=38, xl=xl)
        self.jouer(L2, ["La phrase deux", "une évolution"])
        b = self.barre(y=-0.1, largeur=7.0, x=-2.4, h=0.7)
        for m in b.morceaux:
            m.set_fill(PROP, 1)
        a, t = self.accolade(b.bp.piste, "200 000 €", JAUNE_TITRE, UP, fs=28)
        pas_audit(t)
        rouge = self.part_barre(b, 4.5, BAISSE, depuis=5.5)
        ab, tb = self.accolade(rouge, "− 45 %", BAISSE, DOWN, fs=28)
        reste = self.part_barre(b, 5.5, PROP)
        ar, tr = self.accolade(reste, "il reste 55 %", PROP, DOWN, fs=28)
        self.montre("Après une baisse", FadeIn(b, shift=UP * 0.2), GrowFromCenter(a), FadeIn(t), rt=0.4)
        self.montre("45 %, il", FadeIn(rouge), GrowFromCenter(ab), FadeIn(tb, scale=1.3), rt=0.45)
        self.montre("il reste", GrowFromCenter(ar), FadeIn(tr, scale=1.2), Indicate(reste, color=WHITE), rt=0.5)
        L3 = self.lc([("0,55 ×", PROP), ("200 000", JAUNE_TITRE)], -1.75, fs=44, xl=-4.4)
        pas_audit(L3[1])
        L4 = self.lc([("=", WHITE), ("110 000 €", VERT_OK)], -1.75, fs=48, xl=L3.get_right()[0] + 0.4)
        pas_audit(L4[1])
        self.montre("0,55 fois", FadeIn(L3[0], shift=RIGHT * 0.15), rt=0.3)
        self.montre("fois 200 000", FadeIn(L3[1], shift=RIGHT * 0.15), rt=0.3)
        self.montre("égale 110 000", FadeIn(L4, scale=1.3), rt=0.4)
        self.play(Create(self.cadre(L4[1])), run_time=0.3)
        self.insister(L4[1], 1.12, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        b = BarreCent("", largeur=4.0, h=0.55, centre=P(-4.2, 0.9))
        p = self.part_barre(b, 2.5, OR)
        lp = sans(self.t("proportion", 26, PROP)).next_to(b, DOWN, buff=0.12)
        ba = boite("", PROP, l=1.1, h=0.6).move_to(P(-5.5, -0.8))
        bb = boite("", EVO, l=1.1, h=0.6).move_to(P(-2.9, -0.8))
        fl = Arrow(ba.get_right(), bb.get_left(), buff=0.1, color=EVO, stroke_width=6)
        le = sans(self.t("évolution", 26, EVO)).next_to(VGroup(ba, bb), DOWN, buff=0.12)
        fig = VGroup(b, p, lp, ba, bb, fl, le)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Une proportion compare une partie", "à un tout, au même moment."),
            ("Une évolution compare deux valeurs", "à deux dates."),
            ("Avant de calculer, demande-toi", "lequel des deux tu lis.")], fs=36)
        self.au_mot("Une proportion")
        self.montrer_ligne(lignes[0], Indicate(VGroup(b, p), color=PROP))
        self.au_mot("Une évolution")
        self.montrer_ligne(lignes[1], Indicate(fl, color=EVO))
        self.au_mot("Avant de calculer")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_proportion, self.ecran_evolution,
                  self.ecran_reperer, self.ecran_question1, self.ecran_piege, self.ecran_question2,
                  self.ecran_defi, self.ecran_correction, self.ecran_finale]
        seuls = os.environ.get("ECRANS")  # mise au point : ECRANS=ecran_piege,ecran_correction
        for e in ecrans:
            if not seuls or e.__name__ in seuls.split(","):
                e()
        if not seuls:
            self.page_abonnement("10-abonne")


class PropLyceeNaturePourcentageStmg(PropLyceeNaturePourcentageBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "orange"
