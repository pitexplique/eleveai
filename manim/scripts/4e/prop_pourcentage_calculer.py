# prop_pourcentage_calculer.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 33 : CALCULER ET INTERPRÉTER UN POURCENTAGE (micro du coach :
# prop_pourcentage, notion prop_pourcentages), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE. PAYSAGE SEULEMENT (les shorts 4e-prop-pourcentages-short-*
# existent déjà). ⚠️ Ne remplace pas prop_pourcentages.py (paysage de notion).
# ⭐ Méthode travaillée : un pourcentage est une proportion SUR 100. Pour le
# trouver, on ramène le total à 100 (× 4, × 2, × 5 : la linéarité du tableau)
# ou on divise (45 ÷ 75 = 0,6 = 60 sur 100) ; pour prendre un pourcentage d'un
# nombre, on multiplie (40 % = × 0,4). Pas de produit en croix (épisode 24) ;
# « ÷ » écrit, jamais 5/2.
# ⭐ Les dessins : des BALLES de tennis (une balle = un service ou un point,
# les réussies en jaune), la grille de 100 cases (BarrePourcent, mode cases,
# etiquette=False) qui se colorie « sur 100 », le tableau de proportionnalité
# (TableauProp : services / réussis, 25 → 100 par × 4), la barre du match
# (BarrePourcent, mode chargement : 40 % de 150 min).
# ⭐ Fil rouge : erreur 6 « SUR 100 » OUBLIÉ (pourcentage = nombre de cases) :
# piège 07 (25 sur 50 = 25 % barré) ; question 1 A : 12 % (les 12 réussites
# lues comme un pourcentage) ; question 2 B : 30 € (le pourcentage pris pour le
# résultat). Autres leurres : question 1 C 8 % (20 − 12, l'écart) ; question 2
# C 50 € (80 − 30, ajouter / retrancher au lieu de multiplier, erreur 1).
#
# Décor et métier : SPORT (tennis), Lou, JOURNALISTE SPORTIVE (casque, micro).
# Chiffres du match inventés, plausibles (un premier service passe de 55 à
# 75 % chez les pros) ; aucun chiffre du monde réel cité : pas de source.
# Centres d'intérêt : sport (précision : tennis ; « tennis » n'est pas dans la
# liste fermée lib/videos/centres-interet.ts).
#
# Écrans : 00 garde · 01 Lou, 18 sur 25 contre 33 sur 50 · 02 on ramène à 100
# · 03 le calcul (72 % et 66 %) · 04 QUESTION 1 (12 sur 20) · 05 le tableau
# (25 → 100, × 4) · 06 prendre 40 % de 150 min · 07 le piège (25 sur 50) ·
# 08 QUESTION 2 (30 % de 80 €) · 09 défi (45 points sur 75) · 09b correction ·
# 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-pourcentage-calculer.json (validée par Frédéric le
# 01/11, débit −10), WAV dans public/sons/4e-prop-pourcentage-calculer/ ;
# marques mot à mot : manim/scripts/4e/prop_pourcentage_calculer_marques.json
# (scripts/marques_dump.ps1 puis le convertisseur « une marque par
# occurrence » ; le 2e « 0,4 » de 06-de recalé à la main à 16,46 s).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropTableauBase de manim/scripts/4e/prop_tableau.py
# (ligne_rep bornée, lc, jouer, coche loin du texte des choix, choix non
# audités à la réponse) ; sans() de prop_agrandissement_rapport.py. Ajouté
# ICI : balles(), allumer_balles(), lou(), raquette(), balle().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_pourcentage_calculer.py PropPourcentageCalculer4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_pourcentage_calculer.py PropPourcentageCalculer4e -o eleveai-maths-4e-prop-pourcentage-calculer --media_dir manim/media-prop-4e-33
# Sortie : manim/sorties/4e/maths/proportionnalite/33-pourcentage-calculer/eleveai-maths-4e-prop-pourcentage-calculer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

import importlib.util  # noqa: E402

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import sans  # noqa: E402


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_ICI = Path(__file__).resolve().parent
_t4 = _charger("prop_tableau_4e", _ICI / "prop_tableau.py")    # épisode 21 (4e)
PropTableauBase4e = _t4.PropTableauBase

JAUNE_B = "#d9f99d"    # la balle de tennis (jaune fluo)
VIDE_B = "#334155"     # une balle ratée (gris ardoise)
TERRE = "#c2410c"      # la terre battue
CASE_A = "#38bdf8"     # joueuse A (bleu)
CASE_B = "#f472b6"     # joueuse B (rose)
MATCH = "#22c55e"      # la barre du match


def balles(n, par=10, r=0.12, pas=0.31):
    """n balles en rangées de `par`, toutes « ratées » (grises) : on allume
    les réussies au mot avec allumer_balles()."""
    g = VGroup(*[Circle(radius=r, fill_color=VIDE_B, fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
                 .move_to(P((i % par) * pas, -(i // par) * pas)) for i in range(n)])
    return g.move_to(ORIGIN)


def allumer_balles(g, k, run_time=0.9):
    return LaggedStart(*[b.animate.set_fill(JAUNE_B, 1).set_stroke(JAUNE_B, 2) for b in g[:k]],
                       lag_ratio=0.6 / max(1, k), run_time=run_time)


def balles_pleines(n, k, **kw):
    """Les mêmes balles, déjà allumées (figure reprise)."""
    g = balles(n, **kw)
    for b in g[:k]:
        b.set_fill(JAUNE_B, 1).set_stroke(JAUNE_B, 2)
    return g


def balle(s=1.0):
    """Une balle de tennis et sa couture blanche."""
    b = Circle(radius=0.3, fill_color=JAUNE_B, fill_opacity=1, stroke_width=0)
    c1 = Arc(radius=0.3, start_angle=-PI / 3, angle=2 * PI / 3, stroke_color=WHITE, stroke_width=4).shift(LEFT * 0.42)
    c2 = Arc(radius=0.3, start_angle=2 * PI / 3, angle=2 * PI / 3, stroke_color=WHITE, stroke_width=4).shift(RIGHT * 0.42)
    return VGroup(b, c1, c2).scale(s)


def raquette(s=1.0):
    """Une raquette : le tamis cordé et le manche."""
    tamis = Ellipse(width=1.0, height=1.3, stroke_color="#f97316", stroke_width=7)
    grille_ = VGroup(*[Line(P(x, -0.55 * (1 - (x / 0.48) ** 2) ** 0.5), P(x, 0.55 * (1 - (x / 0.48) ** 2) ** 0.5),
                            stroke_color=WHITE, stroke_width=1.5) for x in (-0.3, -0.1, 0.1, 0.3)],
                     *[Line(P(-0.42 * (1 - (y / 0.62) ** 2) ** 0.5, y), P(0.42 * (1 - (y / 0.62) ** 2) ** 0.5, y),
                            stroke_color=WHITE, stroke_width=1.5) for y in (-0.4, -0.15, 0.1, 0.35)])
    manche = RoundedRectangle(width=0.16, height=0.75, corner_radius=0.06, fill_color="#1f2937", fill_opacity=1,
                              stroke_width=0).next_to(tamis, DOWN, buff=0)
    return VGroup(grille_, tamis, manche).rotate(-0.5).scale(s)


def lou(s=1.0):
    """Lou, journaliste sportive : veste rouge, casque audio, micro."""
    p = personne(peau="#e0ac69", tenue="#b91c1c", cheveux="#422006", longs=True)
    c = p.tete.get_center()
    micro = VGroup(Line(c + P(0.45, -0.1), c + P(0.15, -0.4), stroke_color="#111827", stroke_width=4),
                   Circle(radius=0.07, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(c + P(0.12, -0.42)))
    badge = RoundedRectangle(width=0.42, height=0.26, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(p.corps.get_center() + P(0.22, 0.25))
    p.add(casque_audio(p), micro, badge)
    return p.scale(s)


class PropPourcentageCalculerBase(PropTableauBase4e):
    nom_voix = "4e-prop-pourcentage-calculer"
    fichier_marques = "prop_pourcentage_calculer_marques.json"

    def montre(self, mot, *anims, rt=0.4):
        """Au mot de la voix (str ou (str, n)), joue les animations."""
        if mot:
            self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
        self.play(*anims, run_time=rt)

    def titre_haut(self, s, mot, couleur=JAUNE_TITRE, fs=42, x=-0.4):
        self.au_mot(mot)
        tit = self.t(s, fs, couleur).move_to(P(x, 3.1))
        self.play(Write(tit), run_time=0.5)
        return tit

    def grille(self, v, cote=0.25, couleur=CASE_A, centre=ORIGIN):
        """Les 100 cases du coach (BarrePourcent, etiquette=False), vides."""
        return BarrePourcent(v, mode="cases", cote=cote, etiquette=False, couleur=couleur, centre=centre).vide()

    def grille_pleine(self, v, cote=0.25, couleur=CASE_A, centre=ORIGIN):
        bp = BarrePourcent(v, mode="cases", cote=cote, etiquette=False, couleur=couleur, centre=centre)
        for c in bp.grille.liste[:v]:  # le module pose les 100 cases vides : on colorie les v premières
            c.set_fill(couleur, 1)
        bp.grille.colories = list(range(v))
        return bp

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer et interpréter un pourcentage", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Calculer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        g = self.grille_pleine(72, cote=0.2, centre=P(0.0, 0.35))
        self.play(FadeIn(g, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Le match")
        deco = VGroup(raquette(1.0), balle(0.9)).arrange(RIGHT, buff=0.3).move_to(P(-4.6, 0.35))
        nom = self.t("Le match commenté par Lou", 34, AMBRE).next_to(g, DOWN, buff=0.3)
        self.play(FadeIn(deco, scale=0.7), FadeIn(nom, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lou, journaliste sportive : 18 sur 25 contre 33 sur 50 ─────────
    def match_ab(self):
        """Les deux joueuses : libellé (au mot) + balles des premiers services."""
        ga = balles(25).move_to(P(-1.6, 0.85)).align_to(P(0, 1.3), UP)
        gb = balles(50).move_to(P(3.9, 0.85)).align_to(P(0, 1.3), UP)
        la = self.ligne([("Joueuse A :", CASE_A), ("18", JAUNE_B), ("sur 25", WHITE)], 32).move_to(P(-1.6, 1.85))
        lb = self.ligne([("Joueuse B :", CASE_B), ("33", JAUNE_B), ("sur 50", WHITE)], 32).move_to(P(3.9, 1.85))
        return ga, gb, la, lb

    def ecran_situation(self):
        self.ecran("01-situation")
        pers = lou(1.0).move_to(P(-5.4, -1.0))
        self.au_mot("Voici Lou")
        nom = self.t("Lou", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("journaliste")
        met = self.ligne([("journaliste", BLEU_CALCUL), ("sportive", BLEU_CALCUL)], 28, buff=0.12)
        met.next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.5 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        deco = VGroup(raquette(0.7), balle(0.6)).arrange(RIGHT, buff=0.2).move_to(P(-5.0, 2.6))
        self.montre("match de tennis", FadeIn(deco, scale=0.7), rt=0.4)
        ga, gb, la, lb = self.match_ab()
        sous = sans(self.t("1ers services réussis", 24, GREY_B)).next_to(VGroup(la, lb), UP, buff=0.25)
        self.montre("La joueuse A", FadeIn(la[0], shift=RIGHT * 0.2), FadeIn(ga, shift=UP * 0.15), FadeIn(sous), rt=0.45)
        self.montre("18 premiers", FadeIn(la[1], scale=1.3), allumer_balles(ga, 18), rt=0.9)
        self.montre("sur 25", FadeIn(la[2], shift=LEFT * 0.15), Indicate(ga, color=WHITE, scale_factor=1.04), rt=0.45)
        self.montre("La joueuse B", FadeIn(lb[0], shift=RIGHT * 0.2), FadeIn(gb, shift=UP * 0.15), rt=0.45)
        self.montre("33 sur", FadeIn(lb[1], scale=1.3), allumer_balles(gb, 33), rt=0.9)
        self.montre("sur 50", FadeIn(lb[2], shift=LEFT * 0.15), Indicate(gb, color=WHITE, scale_factor=1.04), rt=0.45)
        q = self.t("Laquelle sert le mieux ?", 40, ORANGE_RETENUE).move_to(P(1.2, -1.6))
        self.montre("Laquelle", FadeIn(q, scale=1.2), rt=0.45)
        self.play(Circumscribe(q, color=AMBRE, buff=0.12), run_time=0.8)
        self.attendre_voix()

    # ── 02 : on ne peut pas comparer : on ramène tout à 100 ─────────────────
    def ecran_sur100(self):
        self.ecran("02-sur100")
        ca = self.ligne([("18", JAUNE_B), ("sur 25", CASE_A)], 44).move_to(P(-3.6, 2.6))
        cb = self.ligne([("33", JAUNE_B), ("sur 50", CASE_B)], 44).move_to(P(1.6, 2.6))
        self.montre("18 sur 25", FadeIn(ca, shift=RIGHT * 0.2), rt=0.4)
        self.montre("33 sur 50", FadeIn(cb, shift=LEFT * 0.2), rt=0.4)
        q = self.t("?", 60, ORANGE_RETENUE).move_to(P(-1.0, 2.6))
        non = self.t("Pas le même total : on ne peut pas comparer.", 32, ROUGE_P).move_to(P(-1.0, 1.65))
        self.montre("on ne peut", FadeIn(q, scale=1.4), FadeIn(non, shift=UP * 0.15), rt=0.45)
        self.play(Indicate(ca[1], color=ROUGE_P), Indicate(cb[1], color=ROUGE_P), run_time=0.7)
        g = self.grille(100, cote=0.24, couleur=GREY_B, centre=P(-4.8, -0.95))
        l100 = self.ligne([("On ramène", AMBRE), ("à 100.", AMBRE)], 38).move_to(P(1.6, 0.6))
        self.montre("On ramène", FadeIn(g, shift=UP * 0.2), FadeIn(l100[0], shift=RIGHT * 0.15), rt=0.45)
        self.montre("à 100", FadeIn(l100[1], scale=1.2), Circumscribe(g, color=AMBRE, buff=0.08), rt=0.8)
        tp = self.tampon("Un pourcentage, c'est une proportion", VERT_OK, 28).move_to(P(1.9, -0.55))
        pc = self.ligne([("%", JAUNE_TITRE), ("=", WHITE), ("« sur 100 »", JAUNE_TITRE)], 44).move_to(P(1.9, -1.8))
        self.montre("Un pourcentage", FadeIn(tp, scale=1.2), rt=0.45)
        self.montre("sur 100.", FadeIn(pc, scale=1.2), rt=0.45)
        self.insister(pc, 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : le calcul : 18 sur 25 = 72 % ; 33 sur 50 = 66 % ──────────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        xl = -3.6
        ga = self.grille(72, cote=0.24, couleur=CASE_A, centre=P(1.55, 0.55))
        gb = self.grille(66, cote=0.24, couleur=CASE_B, centre=P(4.75, 0.55))
        ta = sans(self.t("Joueuse A", 32, CASE_A)).next_to(ga, UP, buff=0.2)
        tb_ = sans(self.t("Joueuse B", 32, CASE_B)).next_to(gb, UP, buff=0.2)
        l1 = self.lc([("Joueuse A :", CASE_A), ("18 sur", WHITE), ("25", WHITE)], 2.5, fs=38, x=xl)
        self.jouer(l1, ["Joueuse A", "18 sur", "sur 25"], extra={0: [FadeIn(ga, shift=UP * 0.15), FadeIn(ta)]})
        l2 = self.lc([("25 ×", WHITE), ("4 =", AMBRE), ("100", AMBRE)], 1.6, fs=40, x=xl)
        self.jouer(l2, ["25 fois", "4, égale", "égale 100"])
        l3 = self.lc([("18 ×", WHITE), ("4 =", AMBRE), ("72", VERT_OK)], 0.7, fs=40, x=xl)
        self.jouer(l3, ["18 fois", ("4, égale", 2), "égale 72"])
        l4 = self.lc([("18 sur 25 =", WHITE), ("72 sur 100", VERT_OK)], -0.2, fs=38, x=xl)
        self.jouer(l4, ["18 sur 25, c'est", "72 sur 100"], extra={1: [ga.remplir(run_time=1.0)]})
        pa = self.t("72 %", 40, CASE_A).next_to(ga, DOWN, buff=0.2)
        l5 = self.lc([("= 72 %", VERT_OK)], -1.1, fs=44, x=xl)
        self.jouer(l5, ["100 : 72"], extra={0: [FadeIn(pa, scale=1.3)]})
        self.insister(pa, 1.15, 0.2)
        self.play(FadeOut(VGroup(l1, l2, l3, l4, l5)), run_time=0.4)
        m1 = self.lc([("Joueuse B :", CASE_B), ("33 sur", WHITE), ("50", WHITE)], 2.5, fs=38, x=xl)
        self.jouer(m1, ["Joueuse B", "33 sur", "sur 50"], extra={0: [FadeIn(gb, shift=UP * 0.15), FadeIn(tb_)]})
        m2 = self.lc([("50 ×", WHITE), ("2 =", AMBRE), ("100", AMBRE)], 1.6, fs=40, x=xl)
        self.jouer(m2, ["50 fois", "2, égale", ("égale 100", 2)])
        m3 = self.lc([("33 ×", WHITE), ("2 =", AMBRE), ("66", VERT_OK)], 0.7, fs=40, x=xl)
        self.jouer(m3, ["33 fois", ("2, égale", 2), "égale 66"], extra={2: [gb.remplir(run_time=1.0)]})
        pb = self.t("66 %", 40, CASE_B).next_to(gb, DOWN, buff=0.2)
        m4 = self.lc([("= 66 %", VERT_OK)], -0.2, fs=44, x=xl)
        self.jouer(m4, ["66 : 66"], extra={0: [FadeIn(pb, scale=1.3)]})
        ok = self.tampon("La joueuse A sert le mieux !", VERT_OK, 30).move_to(P(-2.95, -1.4))
        self.montre("La joueuse A sert", FadeIn(ok, scale=1.2), Circumscribe(VGroup(ga, pa), color=VERT_OK, buff=0.1),
                    rt=0.8)
        moins = self.t("même avec moins de services réussis", 28, GREY_B).next_to(ok, DOWN, buff=0.3)
        self.montre("même avec", FadeIn(moins, shift=UP * 0.1), rt=0.4)
        self.insister(ok, 1.06, 0.2)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (12 réussites sur 20 essais) ───────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = balles(20).move_to(P(-4.6, 1.7))
        rac = raquette(0.7).move_to(P(-4.6, 0.1))
        gr = self.grille(60, cote=0.19, couleur=CASE_A, centre=P(-4.6, -1.15))

        def avant(sc):
            sc.play(FadeIn(g, shift=UP * 0.15), FadeIn(rac, scale=0.7), run_time=0.45)

        def apres(sc):
            sc.play(FadeOut(rac), FadeIn(gr, shift=UP * 0.15), run_time=0.35)
            l0 = sc.ligne_rep(0, ["20 ×", "5 =", "100."])
            l1 = sc.ligne_rep(1, ["12 ×", "5 =", "60."])
            l2 = sc.ligne_rep(2, ["12 sur 20 =", "60 %."])
            sc.montre("20 fois", FadeIn(l0[0], shift=UP * 0.15), rt=0.3)
            sc.montre("5, égale", FadeIn(l0[1], shift=UP * 0.15), rt=0.3)
            sc.montre("100. 12", FadeIn(l0[2], scale=1.3), Circumscribe(gr, color=AMBRE, buff=0.06), rt=0.5)
            sc.montre("12 fois", FadeIn(l1[0], shift=UP * 0.15), allumer_balles(g, 12, 0.5), rt=0.5)
            sc.montre(("5, égale", 2), FadeIn(l1[1], shift=UP * 0.15), rt=0.3)
            sc.montre("60. 12", FadeIn(l1[2], scale=1.3), gr.remplir(run_time=0.8), rt=0.8)
            sc.montre("12 sur 20", FadeIn(l2[0], shift=UP * 0.15), rt=0.3)
            sc.montre("60 %", FadeIn(l2[1], scale=1.3), rt=0.35)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["12 réussites sur 20 essais.", "Quel pourcentage de réussite ?"],
                            [self.t("12 %", 34), self.t("60 %", 34), self.t("8 %", 34)], 1,
                            ["20 × 5 = 100.", "12 × 5 = 60.", "12 sur 20 = 60 %."], mot_q="12 réussites",
                            avant_q=avant, autres_r=apres)

    # ── 05 : pourquoi ça marche : le tableau (25 → 100, × 4) ───────────────
    def ecran_tableau(self):
        self.ecran("05-tableau")
        self.titre_haut("Pourquoi ça marche ?", "Pourquoi")
        tp = self.tampon("Proportionnalité !", VERT_OK, 34).move_to(P(-0.4, 2.15))
        self.montre("de proportionnalité", FadeIn(tp, scale=1.2), rt=0.45)
        tb = TableauProp(["Services", "Réussis"], [[25, 100], [18, 72]], montrer=False, largeur_case=1.7,
                         largeur_libelle=2.6, hauteur=0.85, fs=38, centre=P(-2.3, -0.35))
        self.montre("Dans un tableau", FadeIn(tb.fond, shift=UP * 0.2), rt=0.45)
        self.montre("25 services", FadeIn(tb.valeur(0, 0), scale=1.4), rt=0.35)
        self.montre("18 réussis", FadeIn(tb.valeur(1, 0), scale=1.4), rt=0.35)
        sur = sans(self.t("sur 100", 28, AMBRE))
        self.montre("100 services", FadeIn(tb.valeur(0, 1), scale=1.4), tb.allumer(0, 1), rt=0.4)
        g = self.grille(72, cote=0.22, couleur=CASE_A, centre=P(3.9, -0.35))
        sur.next_to(g, UP, buff=0.2)
        self.montre("72 réussis", FadeIn(tb.valeur(1, 1), scale=1.4), FadeIn(g), FadeIn(sur), rt=0.4)
        self.play(g.remplir(run_time=0.9))
        fh = tb.fleche_col(0, 1, "× 4", ligne=0)
        fb = tb.fleche_col(0, 1, "× 4", ligne=1)
        self.montre("multiplié les", Create(fh[0]), Create(fb[0]), tb.eteindre(0, 1), rt=0.5)
        self.montre("par 4", FadeIn(fh[1], scale=1.4), FadeIn(fb[1], scale=1.4), rt=0.4)
        self.insister(VGroup(fh[1], fb[1]), 1.2, 0.25)
        self.attendre_voix()

    # ── 06 : prendre un pourcentage d'un nombre : 40 % de 150 min ──────────
    def ecran_de(self):
        self.ecran("06-de")
        self.titre_haut("Prendre un pourcentage d'un nombre", "prendre un")
        bar = BarrePourcent(40, mode="chargement", largeur=9.0, hauteur=0.7, couleur=MATCH, etiquette=False,
                            centre=P(-0.6, 1.75)).vide()
        z = sans(self.t("0", 28, GREY_B)).next_to(bar.piste, DOWN, buff=0.15).align_to(bar.piste, LEFT)
        f150 = self.t("150 min", 32, WHITE).next_to(bar.piste, DOWN, buff=0.15).align_to(bar.piste, RIGHT)
        lm = self.ligne([("Le match :", WHITE), ("150 min", WHITE)], 30).next_to(bar.piste, UP, buff=0.2)
        lm.align_to(bar.piste, LEFT)
        sans(lm[0])
        self.montre("Le match", FadeIn(bar.piste), FadeIn(z), FadeIn(lm[0]), rt=0.4)
        self.montre("150 minutes", FadeIn(lm[1], scale=1.2), FadeIn(f150, scale=1.2), rt=0.4)
        xl = -1.6
        l1 = self.lc([("A sert", CASE_A), ("40 %", MATCH), ("du temps.", WHITE)], 0.35, fs=40, x=xl)
        self.jouer(l1, ["La joueuse A", "40 % du", "du temps"],
                   extra={1: [bar.remplir(run_time=0.9)]})
        p40 = self.t("40 %", 30, NUIT).move_to(bar.plein)
        self.play(FadeIn(p40, scale=1.2), run_time=0.3)
        l2 = self.lc([("40 % =", WHITE), ("40 sur 100", AMBRE), ("= 0,4", VERT_OK)], -0.65, fs=40, x=xl)
        self.jouer(l2, ["40 %, c'est", "40 sur 100", "soit 0,4"])
        self.insister(l2[2], 1.15, 0.2)
        l3 = self.lc([("0,4 ×", WHITE), ("150 =", WHITE), ("60 min", VERT_OK)], -1.65, fs=44, x=xl)
        f60 = self.t("60 min", 32, MATCH).next_to(bar.piste, DOWN, buff=0.15)
        f60.set_x(bar.piste.get_left()[0] + 0.08 + (bar.piste.width - 0.16) * 0.4)
        self.jouer(l3, ["0,4 fois", "fois 150", "60 minutes"], extra={2: [FadeIn(f60, scale=1.3)]})
        self.play(Create(SurroundingRectangle(l3[2], color=VERT_OK, buff=0.15, corner_radius=0.1)), run_time=0.4)
        self.insister(l3[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 07 : le piège : 25 sur 50, ce n'est pas 25 % ───────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        g = balles(50).move_to(P(-4.4, 1.5))
        gr = self.grille(50, cote=0.2, couleur=CASE_A, centre=P(-4.4, -1.15))
        xl = 1.6
        l1 = self.lc([("25 sur 50", JAUNE_B), ("= 25 %", ROUGE_P)], 1.9, fs=42, x=xl)
        self.jouer(l1, ["25 sur 50", "pas 25"], extra={0: [FadeIn(g), allumer_balles(g, 25, 0.8)]})
        self.play(Create(croix(l1, sw=7)), run_time=0.4)
        l2 = self.lc([("25 sur 50", JAUNE_B), ("= 50 %", VERT_OK), (": la moitié", VERT_OK)], 0.85, fs=42, x=xl)
        sans(l2[0])
        self.jouer(l2, [None, "C'est 50", "la moitié"], extra={1: [FadeIn(gr), gr.remplir(run_time=0.9)]})
        self.insister(l2[2], 1.12, 0.2)
        tp = self.tampon("Un pourcentage se lit sur 100", VERT_OK, 32).move_to(P(xl, -0.4))
        self.montre("Un pourcentage", FadeIn(tp, scale=1.2), rt=0.45)
        l3 = sans(self.lc([("25 sur 50", JAUNE_B), ("=", WHITE), ("50 sur 100", VERT_OK)], -1.6, fs=40, x=xl))
        self.montre("on ramène", FadeIn(l3, shift=UP * 0.15), Circumscribe(gr, color=AMBRE, buff=0.06), rt=0.8)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (30 % de 80 €) ─────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(raquette(0.9), balle(0.7)).arrange(RIGHT, buff=0.3).move_to(P(-4.5, 1.4))
        bar = BarrePourcent(30, mode="chargement", largeur=3.8, hauteur=0.55, couleur=MATCH, etiquette=False,
                            centre=P(-4.4, -0.6)).vide()

        def avant(sc):
            sc.play(FadeIn(deco, scale=0.7), run_time=0.45)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["0,3 ×", "80 =", "24 €."])
            f80 = sc.t("80 €", 28, WHITE).next_to(bar.piste, DOWN, buff=0.15).align_to(bar.piste, RIGHT)
            f24 = sc.t("24 €", 28, MATCH).next_to(bar.piste, DOWN, buff=0.15)
            f24.set_x(bar.piste.get_left()[0] + 0.08 + (bar.piste.width - 0.16) * 0.3)
            sc.montre("0,3 fois", FadeIn(l0[0], shift=UP * 0.15), FadeIn(bar.piste), rt=0.35)
            sc.montre("fois 80", FadeIn(l0[1], shift=UP * 0.15), FadeIn(f80),
                      bar.remplir(run_time=0.6), rt=0.6)
            sc.montre("24 euros", FadeIn(l0[2], scale=1.3), FadeIn(f24, scale=1.3), rt=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["30 % de 80 €,", "c'est combien ?"],
                            [self.t("24 €", 34), self.t("30 €", 34), self.t("50 €", 34)], 0,
                            ["0,3 × 80 = 24 €."], mot_q="30 % de",
                            avant_q=avant, autres_r=apres)

    # ── 09 : défi : 45 points gagnés sur 75 ────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        g = balles(75, par=15).move_to(P(-1.0, 1.25))
        self.montre("Dans un match", FadeIn(g, shift=UP * 0.15), rt=0.45)
        l1 = self.lc([("Elle gagne 45 points", JAUNE_B), ("sur 75", WHITE), ("joués", WHITE)], -0.6, fs=40, x=-1.0)
        self.jouer(l1, ["gagne 45", "sur 75", "joués"], extra={0: [allumer_balles(g, 45, 0.9)]})
        q = self.t("Quel pourcentage ?", 40, ORANGE_RETENUE).move_to(P(-1.0, -1.5))
        self.montre("Quel pourcentage", FadeIn(q, scale=1.2), rt=0.4)
        self.play(Circumscribe(q, color=AMBRE, buff=0.12), run_time=0.8)
        self.pause_defi(y=-2.4)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.2))
        self.play(Write(tit), run_time=0.5)
        g = balles_pleines(75, 45, par=15).move_to(P(-2.6, 1.6))
        gr = self.grille(60, cote=0.22, couleur=CASE_A, centre=P(3.6, 0.9))
        self.add(g)
        xl = -2.6
        l1 = self.lc([("45 ÷", JAUNE_B), ("75 =", WHITE), ("0,6", VERT_OK)], 0.05, fs=44, x=xl)
        self.jouer(l1, ["45 divisé", "par 75", "égale 0,6"])
        l2 = self.lc([("0,6 =", WHITE), ("60 sur 100", AMBRE), ("= 60 %", VERT_OK)], -1.1, fs=44, x=xl)
        l2[2].shift(RIGHT * 0.25)  # cadre vert loin du « 100 » (vérif. du 01/11)
        p60 = self.t("60 %", 40, CASE_A).next_to(gr, DOWN, buff=0.2)
        self.jouer(l2, ["0,6, c'est", "60 sur", "100 : 60"],
                   extra={1: [FadeIn(gr), gr.remplir(run_time=0.9)], 2: [FadeIn(p60, scale=1.3)]})
        self.play(Create(SurroundingRectangle(l2[2], color=VERT_OK, buff=0.15, corner_radius=0.1)), run_time=0.4)
        self.insister(l2[2], 1.12, 0.2)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        gr = self.grille_pleine(72, cote=0.2, couleur=CASE_A, centre=P(-5.0, 0.2))
        pa = sans(self.t("72 sur 100", 30, CASE_A)).next_to(gr, DOWN, buff=0.2)
        fig = VGroup(gr, pa)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Un pourcentage est", "une proportion sur 100."),
            ("Pour le trouver, on ramène à 100,", "ou on divise,", "puis on lit sur 100."),
            ("Pour prendre un pourcentage", "d'un nombre, on multiplie :", "40 % = × 0,4.")], fs=34)
        self.au_mot("Un pourcentage")
        self.montrer_ligne(lignes[0], Circumscribe(gr, color=VERT_OK, buff=0.06))
        self.au_mot("Pour le trouver")
        self.montrer_ligne(lignes[1])
        self.au_mot("Pour prendre")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_sur100()
        self.ecran_calcul()
        self.ecran_question1()
        self.ecran_tableau()
        self.ecran_de()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropPourcentageCalculer4e(PropPourcentageCalculerBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
