# prop_lycee_taux_equivalent.py
# EleveAI — Maths Terminale STMG — série « Proportionnalité », LYCÉE, épisode
# 06 : TAUX PROPORTIONNEL, TAUX ÉQUIVALENT (micro du coach :
# suiteT_taux_equivalent_proportionnel, notion suite_comparer), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE (terminale). Identité « Maths STMG — EleveAI »,
# celle de tous les scripts de manim/scripts/stmg/ (les épisodes de terminale
# STMG, binomiale par exemple, l'écrivent ainsi). Short jumeau :
# prop_lycee_taux_equivalent_short.py (blanche).
# ⭐ Méthode travaillée : le taux PROPORTIONNEL se divise (3 % ÷ 12 = 0,25 %) ;
# appliquer un taux n fois = élever le coefficient à la puissance n
# (1,0025^12 ≈ 1,0304 → 3,04 %, pas 3 %) ; le taux ÉQUIVALENT redonne
# exactement le taux annuel : 1 + t = 1,03^(1/12) ≈ 1,002466 (≈ 0,247 %) ;
# il est un peu plus petit que le proportionnel.
# « × » et « ÷ » écrits, décimaux à la virgule ; puissances écrites en exposant
# (pas de LaTeX sur ce poste : un petit Text surélevé, voir puiss()).
# ⭐ Leurres (les erreurs dites par la voix) : multiplier par 12 au lieu de
# diviser (question 1 B : 72 %) ; prendre le proportionnel pour l'équivalent
# (question 2 A : 0,25 % → 3,04 %) ; le piège : 1 % par mois ≠ 12 % par an
# (1,01^12 ≈ 1,1268 → 12,68 %).
#
# Décor et métier : Emma, CONSEILLÈRE BANCAIRE (guichet, livret, pièces).
# Centre d'intérêt : argent-budget.
# Source (en bas de l'écran de situation, vérifiée dans le prompt lycée du
# 02/11/2026) : service-public.fr : taux du Livret A = 3 % du 1er août 2023 au
# 31 janvier 2025. Le vrai Livret A compte les intérêts par quinzaines : la
# voix pose l'hypothèse « imaginons que les intérêts soient ajoutés chaque
# mois », écrite à l'écran.
# Calculs : 1,0025^12 ≈ 1,0304 ; 1,03^(1/12) ≈ 1,002466 ; 1,01^12 ≈ 1,1268 ;
# 1,12^(1/4) ≈ 1,0287.
#
# Écrans : 00 garde · 01 Emma, Livret A 3 % par an, et par mois ? ·
# 02 le taux proportionnel : 3 % ÷ 12 = 0,25 % · 03 le test : la frise des 12
# mois « × 1,0025 », 1,0025^12 ≈ 1,0304 → 3,04 % · 04 pourquoi : intérêts des
# intérêts ; puissance 12, pas × 12 · 05 QUESTION 1 (6 % → 0,5 %) ·
# 06 le taux équivalent : (1 + t)^12 = 1,03 → 0,247 % · 07 le piège : 1 % par
# mois → 12,68 % · 08 QUESTION 2 (0,247 %) · 09 défi (12 % par an, trimestre)
# · 09b correction · 10 ce que tu as appris (le tableau proportionnel /
# équivalent se remplit) · 11 fin.
#
# Voix : manim/voix/stmg-prop-taux-equivalent.json (validée par Frédéric le
# 02/11, débit −10), WAV dans public/sons/stmg-prop-taux-equivalent/ ;
# marques : manim/scripts/stmg/prop_lycee_taux_equivalent_marques.json
# (scripts/marques_dump.ps1 puis cues2marques_gap.py, seuil 0,5 s).
# Outils (non modifiés) : prop_commun.py, canvas_proportion.py, la base
# PropPourcentageCoefficientBase de l'épisode 4e 35 (lc, jouer, montre,
# barrer, barrer_choix, accolade, cadre, ligne_rep bornée). Ajouté ICI :
# puiss() / lcp() (les puissances en exposant), emma(), livret(), piece(),
# Frise (les 12 cases-mois), source().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/stmg/prop_lycee_taux_equivalent.py PropLyceeTauxEquivalentStmg
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/stmg/prop_lycee_taux_equivalent.py PropLyceeTauxEquivalentStmg -o eleveai-maths-stmg-prop-taux-equivalent --media_dir manim/scripts/stmg/media-prop-lycee-taux
# Sortie : manim/sorties/stmg/maths/proportionnalite/06-taux-equivalent/eleveai-maths-stmg-prop-taux-equivalent.mp4

import os
import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_p35 = _charger("prop_pourcentage_coefficient_4e", _ICI.parents[0] / "4e" / "prop_pourcentage_coefficient.py")
from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, personne, P…)

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

PropPourcentageCoefficientBase = _p35.PropPourcentageCoefficientBase
BarreCent, gras, sans = _p35.BarreCent, _p35.gras, _p35.sans

PROP = "#38bdf8"       # le taux proportionnel (bleu)
EQUI = "#22c55e"       # le taux équivalent (vert)
OR_C = "#fbbf24"       # les pièces, les intérêts (or)
INT2 = "#f97316"       # les intérêts des intérêts (orange)
TENUE_E = "#0f766e"    # la veste d'Emma (bleu-vert)
CASE_C = "#1e293b"


def pas_audit(m):
    """Une donnée redite (déjà dite plus tôt) ou un décor : ni synchro, ni audit."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def puiss(base, expo, fs=40, couleur=WHITE, ce=None):
    """Une puissance écrite proprement : la base et l'exposant (plus petit,
    surélevé), deux Text séparés (chacun attend son mot) ; renvoie (b, e)."""
    b = Text(base, font_size=fs, color=couleur)
    e = Text(expo, font_size=int(fs * 0.6), color=ce or couleur)
    ref = Text("1", font_size=fs).move_to(b)
    e.next_to(b, RIGHT, buff=0.04)
    e.set_y(ref.get_top()[1] - e.height * 0.25)
    return b, e


def ligne_p(items, fs=40, buff=0.2):
    """Une ligne de morceaux : (texte, couleur) ou (base, exposant, couleur) ;
    une puissance donne DEUX éléments (la base, puis l'exposant)."""
    out, x = [], 0.0
    for it in items:
        if len(it) == 3:
            b, e = puiss(it[0], it[1], fs, it[2])
            dx = x - b.get_left()[0]
            b.shift(RIGHT * dx + UP * (0 - b.get_y()))
            e.shift(RIGHT * dx + UP * (0 - Text(it[0], font_size=fs).get_y()))
            out += [b, e]
            x = e.get_right()[0] + buff
        else:
            t = Text(it[0], font_size=fs, color=it[1])
            t.shift(RIGHT * (x - t.get_left()[0]) + UP * (0 - t.get_y()))
            out.append(t)
            x = t.get_right()[0] + buff
    return VGroup(*out)


def emma(s=1.0):
    """Emma, conseillère bancaire : veste bleu-vert, foulard doré, badge."""
    p = personne(peau="#8d5524", tenue=TENUE_E, cheveux="#1f2937", longs=True)
    c = p.corps.get_center()
    foulard = Triangle(fill_color=OR_C, fill_opacity=1, stroke_width=0).scale(0.22).rotate(PI).move_to(
        c + P(0, 0.55))
    badge = RoundedRectangle(width=0.36, height=0.22, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(c + P(0.28, 0.2))
    p.add(foulard, badge)
    return p.scale(s)


def livret(s=1.0, titre="Livret A"):
    """Un livret d'épargne : couverture, bande dorée, le nom (décor, sans synchro)."""
    couv = RoundedRectangle(width=1.5, height=2.0, corner_radius=0.1, fill_color="#1d4ed8", fill_opacity=1,
                            stroke_color="#93c5fd", stroke_width=3)
    bande = Rectangle(width=1.5, height=0.22, fill_color=OR_C, fill_opacity=1, stroke_width=0).move_to(
        couv.get_center() + UP * 0.45)
    nom = Text(titre, font_size=24, color=WHITE, weight=BOLD)
    if nom.width > 1.3:
        nom.scale_to_fit_width(1.3)
    nom.move_to(couv.get_center() + DOWN * 0.15)
    return pas_audit(VGroup(couv, bande, nom).scale(s))


def piece(r=0.22):
    """Une pièce : disque doré, liseré, un « € » gravé (décor)."""
    d = Circle(radius=r, fill_color=OR_C, fill_opacity=1, stroke_color="#b45309", stroke_width=3)
    e = Text("€", font_size=int(r * 90), color="#92400e", weight=BOLD).move_to(d)
    return pas_audit(VGroup(d, e))


class Frise(VGroup):
    """Les n cases d'une année (mois ou trimestres), en frise : .cases[i],
    .noms[i] (« 1 »… « 12 », décor) ; etiquettes(s) → les « × 1,0025 » sous
    chaque case ; fleche(s) → la flèche totale arrondie au-dessus et son texte.
    Rien n'est ajouté à la scène."""

    def __init__(self, n=12, largeur=11.0, h=0.7, centre=ORIGIN, couleur=CASE_C, noms=None, fs_nom=22, **kw):
        super().__init__(**kw)
        w = largeur / n
        self.cases = VGroup(*[RoundedRectangle(width=w - 0.08, height=h, corner_radius=0.08, fill_color=couleur,
                                               fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
                              .move_to(P((i + 0.5) * w - largeur / 2, 0)) for i in range(n)])
        noms = noms or [str(i + 1) for i in range(n)]
        self.noms = pas_audit(VGroup(*[Text(s, font_size=fs_nom, color=GREY_B).move_to(c)
                                       for s, c in zip(noms, self.cases)]))
        self.add(self.cases, self.noms)
        self.move_to(centre)

    def dessous(self, s, fs=32, couleur=AMBRE):
        """L'accolade sous toute la frise et son texte (« × 1,0025 chaque mois »)."""
        br = Brace(self.cases, DOWN, buff=0.08, color=couleur)
        t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(br, DOWN, buff=0.06)
        return br, t

    def etiquettes(self, s, fs=20, couleur=AMBRE):
        out = VGroup()
        for c in self.cases:
            t = Text(s, font_size=fs, color=couleur, weight=BOLD)
            if t.width > c.width - 0.04:
                t.scale_to_fit_width(c.width - 0.04)
            out.add(t.next_to(c, DOWN, buff=0.12))
        return out

    def fleche(self, s, fs=34, couleur=EQUI, hauteur=0.9):
        a, b = self.cases[0].get_top() + UP * 0.1, self.cases[-1].get_top() + UP * 0.1
        arc = ArcBetweenPoints(a, b, angle=-0.35, color=couleur, stroke_width=6)
        arc.add_tip(tip_length=0.25)
        t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(arc, UP, buff=0.08)
        return arc, t


class PropLyceeTauxEquivalentBase(PropPourcentageCoefficientBase):
    nom_voix = "stmg-prop-taux-equivalent"
    fichier_marques = "prop_lycee_taux_equivalent_marques.json"
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"

    # ── les outils de l'épisode ─────────────────────────────────────────────
    def lcp(self, items, y, fs=40, xl=1.3, droite=6.2):
        """Comme lc(), avec des puissances (voir ligne_p)."""
        lg = self.col(ligne_p(items, fs), y, xl)
        if lg.get_right()[0] > droite:
            lg.scale_to_fit_width(droite - xl).align_to(P(xl, 0), LEFT)
        return lg

    def source(self, lignes):
        """La source, discrète, en bas à gauche (lue, jamais dite)."""
        s = VGroup(*[Text(x, font_size=16, color=GREY_B) for x in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        for x in s:
            x._bloc = True
        s._bloc = True
        return pas_audit(s).to_corner(DL, buff=0.45)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Taux proportionnel, taux équivalent", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Taux proportionnel")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        fr = Frise(12, largeur=9.0, h=0.6, centre=P(-0.6, 0.25))
        a, t = self.accolade(fr.cases, "3 % par an", AMBRE, fs=36)
        self.au_mot("3 %")
        self.play(FadeIn(fr, shift=UP * 0.2), GrowFromCenter(a), FadeIn(t, scale=1.3), run_time=0.6)
        q = self.t("? % par mois", 40, ORANGE_RETENUE).next_to(fr, DOWN, buff=0.35)
        self.au_mot("par mois")
        self.play(FadeIn(q, shift=UP * 0.15), LaggedStart(*[Indicate(c, color=ORANGE_RETENUE) for c in fr.cases],
                                                          lag_ratio=0.06), run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 01 : Emma, conseillère bancaire ; le Livret A à 3 % ; et par mois ? ─
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = emma(1.0).move_to(P(-5.4, -0.4))
        nom = self.t("Emma", 40, PROP).next_to(pers, UP, buff=0.3)
        self.montre("Voici Emma", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("conseillère bancaire", 28, PROP).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.4 - met.get_left()[0]))
        self.montre("conseillère", FadeIn(met, shift=DOWN * 0.1), rt=0.4)
        lv = livret(1.0).move_to(P(-2.75, 0.75))
        pieces = VGroup(*[piece(0.2).move_to(P(-3.2 + 0.45 * i, -0.65)) for i in range(3)])
        xl = -0.9
        L1 = self.lc([("En 2024, le", WHITE), ("Livret A", PROP)], 2.75, fs=38, xl=xl)
        self.jouer(L1, ["En 2024", "Livret A"], {1: [FadeIn(lv, shift=DOWN * 0.3)]})
        L2 = self.lc([("3 %", AMBRE), ("par an", WHITE)], 1.95, fs=48, xl=xl)
        self.jouer(L2, ["3 %", "par an"], {1: [LaggedStart(*[FadeIn(p, scale=0.5) for p in pieces], lag_ratio=0.2)]})
        self.insister(L2[0], 1.25, 0.2)
        L3 = self.lc([("Un client :", WHITE), ("et par mois ?", ORANGE_RETENUE)], 1.05, fs=40, xl=xl)
        self.jouer(L3, ["Un client", "et par mois"])
        hyp = self.lc([("Imaginons : les intérêts", WHITE)], -0.05, fs=34, xl=xl + 0.3)
        hyp2 = self.lc([("ajoutés", EQUI), ("chaque mois.", EQUI)], -0.7, fs=34, xl=xl + 0.3)
        self.jouer(hyp, ["Imaginons"])
        self.jouer(hyp2, ["ajoutés", "chaque mois"])
        cad = SurroundingRectangle(VGroup(hyp, hyp2), color=GREY_B, buff=0.2, corner_radius=0.12, stroke_width=3)
        src = self.source(["Source : service-public.fr (taux du Livret A : 3 % par an du 1er août 2023 au 31 janvier 2025).",
                           "Le vrai Livret A compte les intérêts par quinzaines : ici, une hypothèse pour le calcul."])
        self.play(Create(cad), FadeIn(src), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le taux proportionnel : 3 % ÷ 12 = 0,25 % par mois ─────────────
    def ecran_proportionnel(self):
        self.ecran("02-proportionnel")
        self.titre_haut("Première idée", "Première", couleur=PROP)
        fr = Frise(12, largeur=10.0, h=0.7, centre=P(-0.6, 1.25))
        a, t = self.accolade(fr.cases, "3 % par an", AMBRE, fs=34)
        L1 = self.lc([("3 %", AMBRE), ("÷ 12", WHITE), ("= 0,25 %", PROP), ("par mois", WHITE)], -0.6, fs=46,
                     xl=-5.4)
        self.au_mot("3 divisé")
        self.play(FadeIn(fr, shift=UP * 0.2), GrowFromCenter(a), FadeIn(t, scale=1.2), FadeIn(L1[0], shift=RIGHT * 0.15),
                  run_time=0.5)
        self.jouer(VGroup(L1[1]), ["par 12"], {0: [LaggedStart(*[Indicate(c, color=WHITE) for c in fr.cases],
                                                               lag_ratio=0.05)]})
        a1, t1 = self.accolade(fr.cases[0], "0,25 %", PROP, DOWN, fs=28)
        self.jouer(VGroup(L1[2], L1[3]), ["égale 0,25", "par mois"],
                   {0: [*[c.animate.set_fill("#0c4a6e", 1) for c in fr.cases], GrowFromCenter(a1), FadeIn(t1)]})
        self.insister(L1[2], 1.15, 0.2)
        f = self.tampon("Taux proportionnel", PROP, 44).move_to(P(-1.6, -1.65))
        self.montre("taux proportionnel", FadeIn(f, scale=1.2), rt=0.5)
        L3 = self.lc([("on partage le taux annuel", WHITE), ("en 12", AMBRE)], -2.7, fs=36, xl=-5.4)
        self.jouer(L3, ["on partage", "en 12"])
        self.attendre_voix()

    # ── 03 : le test : 12 mois « × 1,0025 » ; 1,0025^12 ≈ 1,0304 → 3,04 % ──
    def ecran_test(self):
        self.ecran("03-test")
        self.titre_haut("Testons-le", "Testons", couleur=JAUNE_TITRE)
        fr = Frise(12, largeur=11.0, h=0.7, centre=P(-0.3, 1.1))
        self.montre("Chaque mois", FadeIn(fr, shift=UP * 0.2), rt=0.5)
        br, et = fr.dessous("× 1,0025 chaque mois", fs=34)
        self.au_mot("1,0025")
        self.play(GrowFromCenter(br), FadeIn(et, shift=DOWN * 0.1),
                  LaggedStart(*[Indicate(c, color=AMBRE) for c in fr.cases], lag_ratio=0.08), run_time=1.2)
        arc, ta = fr.fleche("× 1,0304", fs=34, couleur=EQUI)
        L1 = self.lcp([("Sur 12 mois :", WHITE), ("1,0025", "12", AMBRE), ("≈", WHITE), ("1,0304", EQUI)], -0.75,
                      fs=46, xl=-5.6)
        self.jouer(L1, ["Sur 12", ("1,0025", 2), "puissance", "égale environ", "1,0304"],
                   {4: [Create(arc), FadeIn(ta, scale=1.2)]})
        self.play(Create(self.cadre(L1[4])), run_time=0.3)
        L2 = self.lc([("Cela fait", WHITE), ("3,04 %", EQUI), ("sur l'année,", WHITE)], -1.7, fs=44, xl=-5.6)
        self.jouer(L2, ["Cela fait", "3,04", "sur l'année"])
        L3 = self.lc([("un peu plus que", ORANGE_RETENUE), ("3 % !", ORANGE_RETENUE)], -2.65, fs=44, xl=-5.6)
        self.jouer(L3, ["un peu plus", "que 3"])
        self.insister(L3, 1.08, 0.2)
        self.attendre_voix()

    # ── 04 : pourquoi : les intérêts des intérêts ; puissance 12, pas × 12 ──
    def barres_interets(self):
        """Trois mois de capital (bleu) + intérêts (or) ; à partir du 2e mois,
        les intérêts des intérêts (orange), exagérés pour être vus."""
        out = VGroup()
        for i in range(3):
            x = -5.3 + 1.25 * i
            cap = Rectangle(width=0.8, height=2.2, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0)
            cap.move_to(P(x, -1.4)).align_to(P(0, -2.5), DOWN)
            it = Rectangle(width=0.8, height=0.3 * (i + 1), fill_color=OR_C, fill_opacity=1, stroke_width=0)
            it.next_to(cap, UP, buff=0)
            ii = Rectangle(width=0.8, height=0.12 * i * (i + 1) / 2 + 1e-3, fill_color=INT2, fill_opacity=1,
                           stroke_width=0).next_to(it, UP, buff=0)
            nm = pas_audit(Text(f"mois {i + 1}", font_size=22, color=GREY_B)).next_to(cap, DOWN, buff=0.1)
            out.add(VGroup(cap, it, ii, nm))
        return out

    def ecran_pourquoi(self):
        self.ecran("04-pourquoi")
        self.titre_haut("Pourquoi ?", "Pourquoi", couleur=JAUNE_TITRE)
        bs = self.barres_interets()
        leg = pas_audit(VGroup(
            VGroup(Square(0.25, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0),
                   Text("capital", font_size=22)).arrange(RIGHT, buff=0.12),
            VGroup(Square(0.25, fill_color=OR_C, fill_opacity=1, stroke_width=0),
                   Text("intérêts", font_size=22)).arrange(RIGHT, buff=0.12),
            VGroup(Square(0.25, fill_color=INT2, fill_opacity=1, stroke_width=0),
                   Text("intérêts des intérêts", font_size=22)).arrange(RIGHT, buff=0.12))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.12)).move_to(P(-4.3, 2.0))
        xl = 0.1
        L1 = self.lc([("Les intérêts", OR_C), ("rapportent", WHITE)], 2.0, fs=40, xl=xl)
        L2 = self.lc([("eux-mêmes des", WHITE), ("intérêts !", INT2)], 1.3, fs=40, xl=xl)
        self.jouer(L1, ["Les intérêts", "rapportent"],
                   {0: [LaggedStart(*[FadeIn(VGroup(b[0], b[1], b[3]), shift=UP * 0.2) for b in bs], lag_ratio=0.25),
                        FadeIn(VGroup(leg[0], leg[1]))]})
        self.jouer(L2, ["eux-mêmes", "des intérêts"],
                   {1: [LaggedStart(*[GrowFromEdge(b[2], DOWN) for b in bs[1:]], lag_ratio=0.3), FadeIn(leg[2])]})
        L3 = self.lc([("Appliquer un taux", WHITE), ("12 fois :", AMBRE)], 0.3, fs=40, xl=xl)
        self.jouer(L3, ["Appliquer", "12 fois"])
        L4 = self.lcp([("coefficient", "12", EQUI)], -0.6, fs=48, xl=xl + 0.4)
        self.jouer(L4, ["élever son", "puissance 12"])
        c4 = SurroundingRectangle(L4, color=EQUI, buff=0.16, corner_radius=0.12, stroke_width=5)
        self.play(Create(c4), run_time=0.3)
        L5 = self.lc([("pas", ROUGE_ERREUR), ("coefficient × 12", ROUGE_ERREUR)], -1.55, fs=40, xl=xl + 0.4)
        self.jouer(L5, ["pas le multiplier", "par 12"])
        self.play(Create(self.barrer(L5[1])), run_time=0.35)
        self.insister(VGroup(L4, c4), 1.1, 0.2)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (6 % par an → 0,5 % par mois) ───────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        lv = livret(0.75, "Épargne").move_to(P(-4.6, 1.75))

        def avant(sc):
            sc.play(FadeIn(lv, shift=DOWN * 0.2), run_time=0.4)

        def apres(sc):
            fr = Frise(12, largeur=5.8, h=0.55, centre=P(-3.4, -1.0), fs_nom=16)
            a, t = sc.accolade(fr.cases, "6 %", AMBRE, fs=28)
            pas_audit(t)
            a1, t1 = sc.accolade(fr.cases[0], "0,5 %", VERT_OK, DOWN, fs=26)
            t1.align_to(fr.cases[0], LEFT)
            l0 = sc.ligne_rep(0, ["6 % ÷ 12", "= 0,5 %", "par mois."])
            l1 = sc.ligne_rep(1, ["B multiplie par 12"])
            l1b = sc.ligne_rep(2, ["au lieu de diviser."])
            sc.montre("6 divisé", FadeIn(l0[0], shift=UP * 0.15), FadeIn(fr, shift=UP * 0.2), GrowFromCenter(a),
                      FadeIn(t), rt=0.4)
            sc.montre("égale 0,5", FadeIn(l0[1], scale=1.3),
                      *[c.animate.set_fill("#14532d", 1) for c in fr.cases], GrowFromCenter(a1), FadeIn(t1), rt=0.45)
            sc.montre("par mois", FadeIn(l0[2], shift=UP * 0.15), rt=0.3)
            sc.montre("B multiplie", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.4)
            sc.montre("au lieu", FadeIn(l1b, shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Un taux annuel de 6 %.", "Quel est le taux mensuel", "proportionnel ?"],
                            [self.t("0,5 %", 36), self.t("72 %", 36), self.t("6 %", 36)], 0,
                            ["6 % ÷ 12 = 0,5 % par mois.", "B multiplie par 12", "au lieu de diviser."],
                            mot_q="Un taux", avant_q=avant, autres_r=apres)

    # ── 06 : le taux équivalent : (1 + t)^12 = 1,03 → t ≈ 0,247 % ───────────
    def ecran_equivalent(self):
        self.ecran("06-equivalent")
        self.titre_haut("Le taux équivalent", "Le taux", couleur=EQUI)
        fr = Frise(12, largeur=11.0, h=0.7, centre=P(-0.3, 1.1))
        arc, ta = fr.fleche("3 %", fs=38, couleur=EQUI)
        self.montre("exactement 3", FadeIn(fr, shift=UP * 0.2), Create(arc), FadeIn(ta, scale=1.2), rt=0.6)
        br, et = fr.dessous("× (1 + t) chaque mois", fs=34)
        L1 = self.lcp([("(1 + t)", "12", AMBRE), ("= 1,03", EQUI)], -0.75, fs=46, xl=-5.6)
        self.au_mot("1 plus")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.15), GrowFromCenter(br), FadeIn(et, shift=DOWN * 0.1), run_time=0.6)
        self.jouer(VGroup(L1[1], L1[2]), ["puissance 12", "égale 1,03"])
        L2 = self.lcp([("1 + t =", AMBRE), ("1,03", "1/12", EQUI), ("≈", WHITE), ("1,002466", EQUI)], -1.7, fs=46,
                      xl=-5.6)
        self.jouer(L2, ["Donc 1", ("1,03", 2), "puissance 1 sur", "environ 1,002466", None])
        L3 = self.lc([("t ≈", WHITE), ("0,247 %", EQUI), ("par mois", WHITE)], -2.65, fs=46, xl=-5.6)
        self.jouer(L3, ["Le taux mensuel", "0,247", None])
        self.play(Create(self.cadre(L3[1])), run_time=0.3)
        self.insister(L3[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 07 : le piège : 1 % par mois ≠ 12 % par an ; 1,01^12 ≈ 1,1268 ───────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Le piège", couleur=ROUGE_ERREUR, fs=44)
        L1 = self.lc([("1 %", AMBRE), ("par mois", AMBRE), ("= 12 % par an ?", ROUGE_ERREUR)], 2.15, fs=40, xl=-5.6)
        self.jouer(L1, ["que 1", "par mois", "fait 12"])
        fr = Frise(12, largeur=11.0, h=0.6, centre=P(-0.3, 1.05))
        br, et = fr.dessous("× 1,01 chaque mois", fs=34)
        L2 = self.lcp([("1,01", "12", AMBRE), ("≈", WHITE), ("1,1268", EQUI)], -0.6, fs=46, xl=-5.6)
        self.jouer(L2, ["1,01", "puissance", "égale environ", "1,1268"],
                   {0: [FadeIn(fr, shift=UP * 0.2), GrowFromCenter(br), FadeIn(et)]})
        L3 = self.lc([("c'est", WHITE), ("12,68 % !", EQUI)], -1.55, fs=46, xl=-5.6)
        self.jouer(L3, ["c'est", "12,68"])
        self.play(Create(self.cadre(L3[1])), Create(self.barrer(L1[2])), run_time=0.4)
        L4 = self.lc([("Équivalent", EQUI), ("<", WHITE), ("proportionnel", PROP)], -2.6, fs=44, xl=-5.6)
        self.jouer(L4, ["Le taux équivalent", None, "taux proportionnel"])
        self.insister(L4, 1.08, 0.2)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (le taux équivalent de 3 % par an) ──────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        lv = livret(0.75, "Livret A").move_to(P(-4.6, 1.75))

        def avant(sc):
            sc.play(FadeIn(lv, shift=DOWN * 0.2), run_time=0.4)

        def apres(sc):
            fr = Frise(12, largeur=5.8, h=0.55, centre=P(-3.4, -1.3), fs_nom=16)
            arc, ta = fr.fleche("× 1,03", fs=28, couleur=VERT_OK)
            ref = sc.ph_q[0]
            l0 = ligne_p([("1,002466", "12", VERT_OK), ("= 1,03.", VERT_OK)], fs=32)
            l0.move_to(ref).align_to(ref, LEFT)
            l1 = sc.ligne_rep(1, ["A : le taux proportionnel,"])
            l1b = sc.ligne_rep(2, ["il donne 3,04 %."])
            sc.montre("1,002466", FadeIn(l0[0], shift=UP * 0.15), FadeIn(fr, shift=UP * 0.2), rt=0.4)
            sc.montre("puissance 12", FadeIn(l0[1], scale=1.3), rt=0.3)
            sc.montre("égale 1,03", FadeIn(l0[2], scale=1.2), Create(arc), FadeIn(ta), rt=0.45)
            sc.montre("A est", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.4)
            sc.montre("3,04", FadeIn(l1b, shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Quel taux mensuel redonne", "exactement 3 % sur l'année ?"],
                            [self.t("0,25 %", 36), self.t("≈ 0,247 %", 36), self.t("3 %", 36)], 1,
                            ["1,002466^12 = 1,03.", "A : le taux proportionnel,", "il donne 3,04 %."],
                            mot_q="Quel taux", avant_q=avant, autres_r=apres)

    # ── 09 : défi : 12 % par an ; par trimestre, proportionnel et équivalent ─
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        fr = Frise(4, largeur=5.6, h=0.8, centre=P(-3.5, 0.2), noms=["T1", "T2", "T3", "T4"], fs_nom=28)
        a, t = self.accolade(fr.cases, "12 % par an", AMBRE, fs=32)
        xl = 0.1
        L0 = self.lc([("Taux annuel :", WHITE), ("12 %", AMBRE)], 2.0, fs=42, xl=xl)
        self.jouer(L0, ["Un taux annuel", "12 %"], {1: [FadeIn(fr, shift=UP * 0.2), GrowFromCenter(a), FadeIn(t)]})
        L1 = self.lc([("Trimestriel", WHITE), ("proportionnel ?", PROP)], 1.0, fs=40, xl=xl)
        self.jouer(L1, ["taux trimestriel", "proportionnel"])
        L2 = self.lc([("Trimestriel", WHITE), ("équivalent ?", EQUI)], 0.1, fs=40, xl=xl)
        self.jouer(L2, [("taux trimestriel", 2), "équivalent"])
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        fr = Frise(4, largeur=8.0, h=0.7, centre=P(-1.0, 1.75), noms=["T1", "T2", "T3", "T4"], fs_nom=26)
        L1 = self.lc([("Proportionnel :", PROP), ("12 % ÷ 4", WHITE), ("= 3 %", PROP), ("par trimestre", WHITE)], 0.3,
                     fs=42, xl=-5.6)
        self.au_mot("Proportionnel")
        self.play(Write(tit), FadeIn(fr, shift=UP * 0.2), FadeIn(L1[0], shift=RIGHT * 0.15), run_time=0.5)
        e3 = fr.etiquettes("3 %", fs=28, couleur=PROP)
        self.jouer(VGroup(L1[1], L1[2], L1[3]), ["12 divisé", "égale 3", "par trimestre"],
                   {1: [LaggedStart(*[FadeIn(e, shift=DOWN * 0.1) for e in e3], lag_ratio=0.15)]})
        L2 = self.lcp([("Équivalent :", EQUI), ("1,12", "1/4", AMBRE), ("≈", WHITE), ("1,0287", EQUI)], -0.75, fs=44,
                      xl=-5.6)
        self.jouer(L2, ["Équivalent", "1,12", "puissance 1", "environ 1,0287", None])
        L3 = self.lc([("soit ≈", WHITE), ("2,87 %", EQUI), ("par trimestre", WHITE)], -1.8, fs=44, xl=-5.6)
        e2 = VGroup(*[pas_audit(Text("2,87 %", font_size=24, color=EQUI, weight=BOLD)).next_to(e, DOWN, buff=0.1)
                      for e in e3])
        self.jouer(L3, ["soit environ", "2,87", ("par trimestre", 2)],
                   {1: [LaggedStart(*[FadeIn(e, shift=DOWN * 0.1) for e in e2], lag_ratio=0.15)]})
        self.play(Create(self.cadre(L3[1])), run_time=0.3)
        self.insister(L3[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 10 : ce que tu as appris (le tableau proportionnel / équivalent) ────
    def tableau_final(self):
        """Le tableau à deux colonnes : en-têtes, la règle, l'exemple du Livret A ;
        renvoie (grille, cases) ; le contenu des cases (redit) se pose au mot."""
        w, h = 2.9, 0.95
        grille, cases = VGroup(), {}
        for r in range(3):
            for c in range(2):
                fond = "#0c4a6e" if (r == 0 and c == 0) else "#14532d" if r == 0 else "#0b1220"
                cases[(r, c)] = RoundedRectangle(width=w - 0.08, height=h - 0.08, corner_radius=0.1,
                                                 fill_color=fond, fill_opacity=1, stroke_color="#94a3b8",
                                                 stroke_width=3).move_to(P((c - 0.5) * w, (1 - r) * h))
                grille.add(cases[(r, c)])
        tete = VGroup(gras("Proportionnel", 30, PROP).move_to(cases[(0, 0)]),
                      gras("Équivalent", 30, EQUI).move_to(cases[(0, 1)]))
        grille.add(pas_audit(tete))
        g0 = Text("taux ÷ n", font_size=32, color=WHITE).move_to(cases[(1, 0)])
        g1 = ligne_p([("(1 + taux)", "1/n", WHITE), ("− 1", WHITE)], fs=30).move_to(cases[(1, 1)])
        d0 = VGroup(Text("0,25 %", font_size=32, color=PROP, weight=BOLD),
                    Text("par mois", font_size=22, color=GREY_B)).arrange(DOWN, buff=0.06).move_to(cases[(2, 0)])
        d1 = VGroup(Text("≈ 0,247 %", font_size=32, color=EQUI, weight=BOLD),
                    Text("par mois", font_size=22, color=GREY_B)).arrange(DOWN, buff=0.06).move_to(cases[(2, 1)])
        for m, c in ((g0, (1, 0)), (g1, (1, 1)), (d0, (2, 0)), (d1, (2, 1)), (tete[0], (0, 0)), (tete[1], (0, 1))):
            if m.width > w - 0.35:
                m.scale_to_fit_width(w - 0.35)
            m.move_to(cases[c])
        sup = gras(">", 40, AMBRE).move_to(P(0, -h))
        contenu = pas_audit(VGroup(g0, g1, d0, d1, sup))
        return grille, contenu

    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        grille, contenu = self.tableau_final()
        fig = VGroup(grille, contenu)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Proportionnel : on divise", "le taux annuel par n."),
            ("Équivalent : il redonne", "exactement le taux annuel,", "avec la puissance 1 sur n."),
            ("Il est un peu plus petit.",)], fs=36)
        g0, g1, d0, d1, sup = contenu
        self.play(FadeIn(grille, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Le taux proportionnel")
        self.montrer_ligne(lignes[0], FadeIn(g0, shift=RIGHT * 0.15))
        self.au_mot("Le taux équivalent")
        l2 = lignes[1]
        self._par_lots(list(l2[1].submobjects[:2]), lambda m: FadeIn(m, shift=RIGHT * 0.2), 0.35,
                       avec=[Create(l2[0])])
        self.au_mot("avec la puissance")
        self.play(FadeIn(l2[1][2], shift=RIGHT * 0.2), FadeIn(g1, shift=RIGHT * 0.15),
                  Indicate(grille[1], color=EQUI), run_time=0.4)
        self.au_mot("Il est")
        self.montrer_ligne(lignes[2], FadeIn(d0), FadeIn(d1), FadeIn(sup, scale=1.4))
        self.attendre_voix(marge=1.0)

    def construct(self):
        if os.environ.get("GARDE_SEULE") == "1":
            self.page_de_garde()
            return
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_proportionnel()
        self.ecran_test()
        self.ecran_pourquoi()
        self.ecran_question1()
        self.ecran_equivalent()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropLyceeTauxEquivalentStmg(PropLyceeTauxEquivalentBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
