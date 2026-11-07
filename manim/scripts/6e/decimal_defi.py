# decimal_defi.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 06 : DÉFIS SUR LES DÉCIMAUX
# (micro decimal_defi, notion decimal_nombre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux-defi.js, épisode defi).
# Décor et métier : Tom, CRÉATEUR D'ESCAPE GAMES (centre : jeux-defis).
# Écrans : garde (00), situation (01), porte 1 (02), QUESTION 1 (03), porte 2 (04),
# porte 3 (05), QUESTION 2 (06), défi (07) et correction (07b), appris (08), fin (09).
# Voix : manim/voix/6e-decimal-defi.json (Julie, débit −6) ;
# marques : decimal_defi_marques.json (python manim/scripts/6e/decimal_marques.py defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_defi.py DecimalDefi6e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_defi.py DecimalDefi6e -o eleveai-maths-6e-decimal-defi --media_dir manim/scripts/6e/media-dec-06
# Sortie : manim/sorties/6e/maths/decimaux/06-defi/eleveai-maths-6e-decimal-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403

BOIS = "#92400e"
BOIS_C = "#b45309"
OR = "#facc15"


def porte(h=2.2, couleur=BOIS, num=None, cadenas=True):
    """Une porte d'escape game : cadre, battant, poignée, cadenas ; .battant, .cadenas."""
    lg = h * 0.55
    cadre = Rectangle(width=lg + 0.18, height=h + 0.12, stroke_width=0, fill_color="#3f2a14", fill_opacity=1)
    battant = Rectangle(width=lg, height=h, stroke_color="#451a03", stroke_width=3, fill_color=couleur, fill_opacity=1)
    battant.move_to(cadre.get_center() + DOWN * 0.03)
    pann = VGroup(*[RoundedRectangle(width=lg * 0.7, height=h * 0.34, corner_radius=0.05, stroke_color="#451a03",
                                     stroke_width=2, fill_opacity=0).move_to(battant.get_center() + UP * dy * h)
                    for dy in (0.22, -0.2)])
    poignee = Dot(battant.get_center() + RIGHT * lg * 0.36, radius=0.06 * h / 2.2, color=OR)
    g = VGroup(cadre, battant, pann, poignee)
    g.battant = VGroup(battant, pann, poignee)
    g.cadenas = VGroup()
    if cadenas:
        corps = RoundedRectangle(width=0.36 * h / 2.2, height=0.3 * h / 2.2, corner_radius=0.04, stroke_width=0,
                                 fill_color="#9ca3af", fill_opacity=1)
        corps.move_to(poignee.get_center() + DOWN * 0.3 * h / 2.2)
        anse = Arc(radius=0.12 * h / 2.2, start_angle=0, angle=PI, arc_center=corps.get_top(), color="#9ca3af",
                   stroke_width=5)
        g.cadenas = VGroup(anse, corps)
        g.add(g.cadenas)
    if num is not None:
        n = hors_audit(Text(str(num), font_size=int(30 * h / 2.2), color=OR, weight=BOLD))
        n.move_to(battant.get_top() + DOWN * 0.2 * h)
        g.add(n)
    return g


def cle(s=1.0):
    """Une clé dorée."""
    anneau = Annulus(inner_radius=0.12 * s, outer_radius=0.22 * s, fill_color=OR, fill_opacity=1, stroke_width=0)
    tige = Rectangle(width=0.6 * s, height=0.08 * s, fill_color=OR, fill_opacity=1, stroke_width=0)
    tige.next_to(anneau, RIGHT, buff=-0.02)
    dents = VGroup(*[Rectangle(width=0.07 * s, height=0.14 * s, fill_color=OR, fill_opacity=1, stroke_width=0)
                     .move_to(tige.get_right() + LEFT * dx * s + DOWN * 0.09 * s) for dx in (0.06, 0.2)])
    return VGroup(anneau, tige, dents)


def tom(s=1.0):
    """Tom, créateur d'escape games : sweat violet, casquette, une clé à la main."""
    p = visage(personne(peau="#8d5524", tenue="#7c3aed", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    casq = VGroup(AnnularSector(inner_radius=0, outer_radius=r * 1.05, angle=PI, start_angle=0, fill_color="#f97316",
                                fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55),
                  RoundedRectangle(width=r * 1.3, height=r * 0.22, corner_radius=r * 0.1, fill_color="#ea580c",
                                   fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.32 + RIGHT * r * 0.75))
    k = cle(0.8 * s).rotate(PI / 5).move_to(p.corps.get_center() + RIGHT * 0.75 * s + UP * 0.1 * s)
    p.add(casq, k)
    return p


def liam(s=1.0):
    return visage(personne(peau="#f1c27d", tenue="#16a34a", cheveux="#b45309", s=s))


def etiquette(v, s=1.0, audit=True):
    """Une étiquette (carton) qui porte un chiffre."""
    fond = RoundedRectangle(width=0.95 * s, height=1.1 * s, corner_radius=0.12 * s, stroke_color=BOIS_C, stroke_width=4,
                            fill_color="#fef3c7", fill_opacity=1)
    t = Text(str(v), font_size=int(64 * s), color="#1f2937", weight=BOLD).move_to(fond)
    if not audit:
        hors_audit(t)
    g = VGroup(fond, t)
    g.chiffre = t
    return g


def emplacements(xs, y, xv, s=1.0):
    """Les cases vides (pointillés) où viendront les étiquettes, et la virgule après x = xv."""
    cases = VGroup(*[DashedVMobject(RoundedRectangle(width=1.05 * s, height=1.2 * s, corner_radius=0.12 * s,
                                                     stroke_color=WHITE, stroke_width=3), num_dashes=28)
                     .move_to(P(x, y)) for x in xs])
    v = VGroup(Dot(P(xv, y - 0.42 * s), radius=0.11 * s, color=ROUGE_ERREUR),
               Line(P(xv, y - 0.42 * s), P(xv - 0.08, y - 0.64 * s), color=ROUGE_ERREUR, stroke_width=7))
    return cases, v


class DecimalDefiBase(PaysageDecimal):
    nom_voix = "6e-decimal-defi"
    fichier_marques = "decimal_defi_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """Le compte à rebours (5, 4, 3…) n'est pas un nombre dit : hors synchro (sinon « TARD 5 »)."""
        r = super()._disposer_q(question, choix, phrase)
        for f in r[4].get_family():
            f.sans_synchro = True
        return r

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les nombres décimaux", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        portes = VGroup(*[porte(1.9, c, cadenas=True) for c in (BOIS, "#1e3a8a", "#065f46")]).arrange(RIGHT, buff=0.45)
        portes.move_to(P(2.9, 0.3))
        q = self.bloc(["Sauras-tu ouvrir", "toutes les portes ?"], 44).move_to(P(-3.5, 0.3))
        self.au_mot("Sauras-tu")
        self.play(FadeIn(q, shift=UP * 0.2), LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in portes], lag_ratio=0.2),
                  run_time=0.6)
        self.play(LaggedStart(*[Wiggle(p.cadenas, scale_value=1.3) for p in portes], lag_ratio=0.25), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Tom, créateur d'escape games ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        tm = tom(1.05).move_to(P(-5.1, 0.3))
        self.au_mot("Voici Tom")
        nom = self.t("Tom", 44, BLEU_CALCUL).next_to(tm, UP, buff=0.2)
        self.play(FadeIn(tm, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il crée")
        l1 = self.bloc(["Il crée des", "escape games."], 38)
        self.col(l1, 2.3)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Ses énigmes")
        l2 = self.bloc(["Ses énigmes cachent", "des nombres décimaux."], 38)
        self.col(l2, 0.75)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("des nombres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("Trois portes")
        portes = VGroup(*[porte(1.7, c, num=i + 1) for i, c in enumerate((BOIS, "#1e3a8a", "#065f46"))])
        portes.arrange(RIGHT, buff=0.3).move_to(P(-2.2, -0.9))
        l3 = self.t("Trois portes t'attendent.", 40, JAUNE_TITRE)
        self.col(l3, -0.8)
        self.play(FadeIn(l3, shift=UP * 0.1), LaggedStart(*[FadeIn(p, shift=UP * 0.3) for p in portes], lag_ratio=0.25),
                  run_time=0.7)
        self.play(LaggedStart(*[Wiggle(p.cadenas, scale_value=1.3) for p in portes], lag_ratio=0.2), run_time=0.9)
        self.attendre_voix()

    # ── 02 : porte 1, trouve le nombre ──────────────────────────────────────
    def ecran_porte1(self):
        self.ecran("02-porte1")
        pt = porte(1.5, BOIS, num=1).move_to(P(-5.6, 2.35))
        self.au_mot("Porte 1")
        tit = self.t("Porte 1 : trouve le nombre.", 40, JAUNE_TITRE)
        self.col(tit, 2.9, xl=0.6)
        self.play(FadeIn(pt, shift=UP * 0.2), Write(tit), run_time=0.5)
        self.au_mot("Indices")
        ind = self.t("Indices :", 36, ORANGE_RETENUE)
        self.col(ind, 2.05, xl=0.6)
        self.play(FadeIn(ind, shift=UP * 0.1), run_time=0.3)
        tb = TableauNum(larg=1.75, h=1.0).move_to(P(-3.3, 0.35))
        lignes = []
        for k, (mot, c) in enumerate((("2 unités,", BLEU_D), ("8 centièmes,", ROSE_D), ("5 dixièmes.", AMBRE_D))):
            lg = self.t(mot, 38, c)
            self.col(lg, 1.4 - 0.62 * k, xl=1.0)
            self.au_mot(mot.rstrip(",."))
            self.play(FadeIn(lg, scale=1.15), *([FadeIn(tb)] if k == 0 else []), run_time=0.3)
            lignes.append(lg)
        self.au_mot("On range")
        l4 = self.bloc(["On range chaque chiffre", "à sa place."], 34)
        self.col(l4, -0.95, xl=0.6)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        for mot, rg, v, lg in (("unités, dixièmes", 0, 2, lignes[0]), ("dixièmes, centièmes", 1, 5, lignes[2]),
                               ("centièmes. Le", 2, 8, lignes[1])):
            self.au_mot(mot)
            c = (BLEU_D, AMBRE_D, ROSE_D)[rg]
            ch = tb.chiffre(rg, v, c)
            self.play(FadeIn(ch, scale=1.6), Indicate(lg, color=c, scale_factor=1.12),
                      Indicate(tb.entetes[rg], color=c), run_time=0.35)
        self.au_mot("2,58")
        g = self.gros("2,58", fs=64).move_to(P(-3.3, -1.75))
        self.play(FadeIn(g, scale=1.3), Indicate(tb.virgule, color=ROUGE_ERREUR, scale_factor=1.8),
                  pt.cadenas.animate.set_opacity(0), run_time=0.45)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 03 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tb = TableauNum(larg=1.85, h=1.05).move_to(P(-3.4, 0.6))
        ch = [tb.chiffre(0, 0, BLEU_D), tb.chiffre(1, 0, AMBRE_D), tb.chiffre(2, 5, ROSE_D)]

        def avant(sc):
            sc.play(FadeIn(tb), run_time=0.3)

        def autres_q(sc):
            sc.play(*[FadeIn(c, scale=1.5) for c in ch], run_time=0.35)

        def apres(sc):
            g = sc.gros("0,05", fs=60).move_to(P(-3.4, -0.85))
            lg = sc.ligne_rep(0, ["Le 0", "des dixièmes"])
            lg.scale_to_fit_height(0.42)
            if lg.width > 6.0:
                lg.scale_to_fit_width(6.0)
            lg.move_to(P(-3.4, -1.95))
            sc.au_mot("Le 0")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), Indicate(ch[1], color=VERT_OK, scale_factor=1.9), run_time=0.3)
            sc.au_mot("des dixièmes")
            sc.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
            lg2 = sc.ligne_rep(1, ["garde sa place :", "0,05."])
            lg2.scale_to_fit_height(0.42)
            if lg2.width > 6.0:
                lg2.scale_to_fit_width(6.0)
            lg2.move_to(P(-3.4, -2.6))
            sc.au_mot("garde sa place")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("0,05")
            sc.play(FadeIn(lg2[1], scale=1.2), FadeIn(g, scale=1.3), run_time=0.35)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse", ["Unités : 0. Dixièmes : 0.", "Centièmes : 5.",
                                                           "Quel est le nombre ?"],
                            [self.t("0,5", 36), self.t("5", 36), self.t("0,05", 36)], 2,
                            ["Le 0 des dixièmes", "garde sa place : 0,05."], mot_q="Unités",
                            avant_q=avant, autres_q=autres_q, autres_r=apres)

    # ── 04 : porte 2, le plus grand nombre ──────────────────────────────────
    def ecran_porte2(self):
        self.ecran("04-porte2")
        pt = porte(1.5, "#1e3a8a", num=2).move_to(P(-5.6, 2.35))
        self.au_mot("Porte 2")
        tit = self.t("Porte 2", 44, JAUNE_TITRE)
        self.col(tit, 2.9, xl=0.6)
        self.play(FadeIn(pt, shift=UP * 0.2), Write(tit), run_time=0.45)
        et = [etiquette(v) for v in (5, 3, 1)]
        for e, x in zip(et, (-3.7, -2.5, -1.3)):
            e.move_to(P(x, 2.3))
        for e, mot in zip(et, ("5, 3 et", "3 et 1", "1, écris")):
            self.au_mot(mot)
            self.play(FadeIn(e, shift=DOWN * 0.3), run_time=0.3)
        self.au_mot("écris le plus grand")
        l1 = self.bloc(["Écris le plus grand", "nombre possible,"], 36)
        self.col(l1, 1.75, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("avec un chiffre")
        l2 = self.bloc(["avec un chiffre", "après la virgule."], 36, ORANGE_RETENUE)
        self.col(l2, 0.55, xl=0.6)
        cs, v = emplacements((-5.1, -3.9, -2.4), -0.75, -3.15)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(cs), run_time=0.4)
        self.au_mot("Le plus gros")
        l3 = self.bloc(["Le plus gros chiffre", "va au rang le plus fort."], 36, VERT_OK)
        self.col(l3, -0.75, xl=0.6)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(et[0], color=VERT_OK), run_time=0.4)
        self.au_mot("va au rang")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(cs[0], color=VERT_OK), run_time=0.4)
        self.au_mot("5, puis")
        self.play(et[0].animate.move_to(cs[0]), run_time=0.4)
        self.au_mot("puis 3")
        self.play(et[1].animate.move_to(cs[1]), run_time=0.4)
        self.au_mot("la virgule, puis")
        self.play(FadeIn(v, scale=2), run_time=0.3)
        self.au_mot("puis 1")
        self.play(et[2].animate.move_to(cs[2]), run_time=0.4)
        self.au_mot("53,1")
        g = self.gros("53,1", fs=64).move_to(P(-3.6, -2.45))
        self.play(FadeIn(g, scale=1.3), pt.cadenas.animate.set_opacity(0), run_time=0.45)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 05 : porte 3, vrai ou faux ──────────────────────────────────────────
    def ecran_porte3(self):
        self.ecran("05-porte3")
        pt = porte(1.5, "#065f46", num=3).move_to(P(-5.6, 2.35))
        self.au_mot("Porte 3")
        tit = self.t("Porte 3 : vrai ou faux ?", 42, JAUNE_TITRE)
        self.col(tit, 2.9, xl=0.6)
        self.play(FadeIn(pt, shift=UP * 0.2), Write(tit), run_time=0.45)
        li = liam(0.62).move_to(P(-5.6, -0.6))
        self.au_mot("Liam écrit")
        nom = self.t("Liam écrit :", 36)
        self.col(nom, 2.2, xl=0.6)
        self.play(FadeIn(li, shift=UP * 0.2), FadeIn(nom), run_time=0.35)
        t1 = TableauNum(larg=1.6, h=0.85, fs_ent=28).move_to(P(-2.45, 1.0))
        t2 = TableauNum(larg=1.6, h=0.85, fs_ent=28).move_to(P(-2.45, -0.6))
        hors_audit(t2.entetes)
        t2.entetes.set_opacity(0)
        c1 = [t1.chiffre(0, 7, BLEU_D), t1.chiffre(1, 1, AMBRE_D), t1.chiffre(2, 1, ROSE_D)]
        c2 = [t2.chiffre(0, 7, BLEU_D), t2.chiffre(1, 5, AMBRE_D)]
        lg = self.ligne([("7,11", WHITE), ("est plus grand que", WHITE), ("7,5,", WHITE)], 36, buff=0.16)
        self.col(lg, 1.6, xl=0.6)
        self.au_mot("7,11")
        self.play(FadeIn(lg[0], shift=UP * 0.1), FadeIn(t1), *[FadeIn(c, scale=1.4) for c in c1], run_time=0.35)
        self.au_mot("est plus grand")
        self.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("7,5, car")
        self.play(FadeIn(lg[2], shift=UP * 0.1), FadeIn(t2.cases), FadeIn(t2.virgule),
                  *[FadeIn(c, scale=1.4) for c in c2], run_time=0.35)
        self.au_mot("car il a")
        l2 = self.t("car il a plus de chiffres.", 36)
        self.col(l2, 1.0, xl=0.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Faux")
        tp = self.tampon("Faux !", ROUGE_ERREUR, 46).rotate(0.12)
        self.col(tp, 0.12, xl=1.4)
        self.play(FadeIn(tp, scale=1.6), run_time=0.35)
        self.au_mot("Aux dixièmes")
        lg2 = self.ligne([("Aux dixièmes :", AMBRE_D), ("1", AMBRE_D), ("contre", WHITE), ("5.", AMBRE_D)], 38, buff=0.18)
        self.col(lg2, -0.9, xl=0.6)
        cad = SurroundingRectangle(VGroup(t1.cases[1], t2.cases[1]), color=AMBRE_D, buff=0.08, stroke_width=6)
        self.play(FadeIn(lg2[0], shift=UP * 0.1), Create(cad), run_time=0.35)
        self.au_mot("1 contre")
        self.play(FadeIn(lg2[1], scale=1.3), Indicate(c1[1], color=ROUGE_ERREUR, scale_factor=1.6), run_time=0.3)
        self.au_mot("contre 5")
        self.play(FadeIn(lg2[2]), run_time=0.2)
        self.au_mot("5. 7,5")
        self.play(FadeIn(lg2[3], scale=1.3), Indicate(c2[1], color=VERT_OK, scale_factor=1.6), run_time=0.3)
        g = self.ligne([("7,5", VERT_OK), ("est le plus grand.", VERT_OK)], 40, buff=0.2)
        self.col(g, -1.95, xl=0.8)
        cadre = SurroundingRectangle(g, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.au_mot("7,5 est")
        self.play(FadeIn(g[0], scale=1.3), Create(cadre), pt.cadenas.animate.set_opacity(0), run_time=0.3)
        self.au_mot("est le plus grand")
        self.play(FadeIn(g[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        rangs = ("Dizaines", "Unités", "Dixièmes", "Centièmes")
        t1 = TableauNum(rangs, larg=1.45, h=0.85, fs_ent=26, virgule_apres=1).move_to(P(-3.55, 1.5))
        t2 = TableauNum(rangs, larg=1.45, h=0.85, virgule_apres=1).move_to(P(-3.55, 0.1))
        hors_audit(t2.entetes)
        cols = ("#34d399", BLEU_D, AMBRE_D, ROSE_D)
        c1 = [t1.chiffre(i, v, cols[i]) for i, v in enumerate((1, 0, 2, 0))]
        c2 = [t2.chiffre(i, v, cols[i]) for i, v in enumerate((1, 0, 2))]

        def avant(sc):
            sc.play(FadeIn(t1), FadeIn(t2.cases), FadeIn(t2.virgule), run_time=0.3)

        def autres_q(sc):
            sc.play(*[FadeIn(c, scale=1.5) for c in c1 + c2], run_time=0.35)

        def apres(sc):
            # l'explication sous les tableaux, à gauche : sous les cartes, elle était minuscule
            # sur quatre lignes courtes : sur deux, bornées à 6 de large, elles restaient petites
            l1 = VGroup(sc.t("Un zéro à la fin", 36, VERT_OK).move_to(P(-3.6, -0.95)),
                        sc.t("ne change rien :", 36, VERT_OK).move_to(P(-3.6, -1.5)))
            l2 = sc.ligne([("20 centièmes,", ROSE_D), ("ce sont", VERT_OK)], 36, buff=0.16).move_to(P(-3.6, -2.1))
            l2.add(sc.t("2 dixièmes.", 36, AMBRE_D).move_to(P(-3.6, -2.7)))
            sc.au_mot("Un zéro")
            sc.play(FadeIn(l1, shift=UP * 0.1), Indicate(c1[3], color=VERT_OK, scale_factor=2.0), run_time=0.35)
            cad = SurroundingRectangle(VGroup(t1.cases[2], t2.cases[2]), color=AMBRE_D, buff=0.06, stroke_width=6)
            sc.au_mot("20 centièmes")
            sc.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(c1[2], color=ROSE_D), run_time=0.3)
            sc.au_mot("ce sont")
            sc.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("2 dixièmes")
            sc.play(FadeIn(l2[2], shift=UP * 0.1), Create(cad), run_time=0.3)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["10,20 est-il égal à 10,2 ?"],
                            [self.t("oui", 34), self.choix("non, il est plus grand"),
                             self.choix("non, il est plus petit")], 0,
                            ["Un zéro à la fin ne change rien :", "20 centièmes, ce sont 2 dixièmes."],
                            avant_q=avant, autres_q=autres_q, autres_r=apres)

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pt = porte(2.0, "#7f1d1d").move_to(P(-5.5, 1.0))
        self.au_mot("Dernière porte")
        l0 = self.t("Dernière porte.", 38, ORANGE_RETENUE)
        self.col(l0, 2.2, xl=0.6)
        self.play(FadeIn(pt, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        et = [etiquette(v) for v in (9, 8, 6)]
        for e, x in zip(et, (-3.7, -2.5, -1.3)):
            e.move_to(P(x, 1.55))
        for e, mot in zip(et, ("9, 8 et", "8 et 6", "et 6")):
            self.au_mot(mot)
            self.play(FadeIn(e, shift=DOWN * 0.3), run_time=0.3)
        self.au_mot("écris le plus petit")
        l1 = self.bloc(["Écris le plus petit", "nombre possible,"], 36)
        self.col(l1, 1.15, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("avec deux chiffres")
        l2 = self.bloc(["avec deux chiffres", "après la virgule."], 36, ORANGE_RETENUE)
        self.col(l2, -0.1, xl=0.6)
        cs, v = emplacements((-3.9, -2.4, -1.25), -0.65, -3.15)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(cs), FadeIn(v), run_time=0.4)
        self.pause_defi(y=-1.55)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        pt = porte(2.0, "#7f1d1d").move_to(P(-5.5, 1.0))
        et = [etiquette(v, audit=False) for v in (9, 8, 6)]
        for e, x in zip(et, (-3.7, -2.5, -1.3)):
            e.move_to(P(x, 1.55))
        cs, v = emplacements((-3.9, -2.4, -1.25), -0.65, -3.15)
        self.play(FadeIn(pt), *[FadeIn(e) for e in et], FadeIn(cs), FadeIn(v), run_time=0.35)
        self.au_mot("Pour le plus petit")
        l1 = self.t("Pour le plus petit,", 36, ORANGE_RETENUE)
        self.col(l1, 2.2, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("le plus petit chiffre")
        l2 = self.bloc(["le plus petit chiffre va", "au rang le plus fort."], 36, VERT_OK)
        self.col(l2, 1.3, xl=0.6)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(et[2], color=VERT_OK), run_time=0.3)
        self.au_mot("au rang")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        lg = self.ligne([("6", BLEU_D), ("aux unités,", BLEU_D), ("puis 8,", AMBRE_D), ("puis 9.", ROSE_D)], 36,
                        buff=0.16)
        self.col(lg, 0.25, xl=0.6)
        self.au_mot("6 aux unités")
        self.play(FadeIn(lg[0], scale=1.2), et[2].animate.move_to(cs[0]), run_time=0.3)
        self.au_mot("aux unités")
        self.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.25)
        for k, (mot, e, c) in enumerate((("puis 8", et[1], cs[1]), ("puis 9", et[0], cs[2]))):
            self.au_mot(mot)
            self.play(FadeIn(lg[k + 2], shift=UP * 0.1), e.animate.move_to(c), run_time=0.3)
        self.au_mot("6,89")
        g = self.gros("6,89", fs=64).move_to(P(-2.55, -2.2))
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("La porte s'ouvre")
        l3 = self.t("La porte s'ouvre !", 40, VERT_OK)
        self.col(l3, -0.75, xl=0.6)
        bt = pt.battant
        self.play(FadeIn(l3, scale=1.2), FadeOut(pt.cadenas),
                  bt.animate.stretch(0.25, 0, about_edge=LEFT).set_color("#451a03"), run_time=0.6)
        self.play(Flash(pt.get_center(), color=OR, line_length=0.4, num_lines=12), run_time=0.6)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tb = TableauNum(larg=1.5, h=0.9, fs_ent=22)
        ch = VGroup(tb.chiffre(0, 6, BLEU_D), tb.chiffre(1, 8, AMBRE_D), tb.chiffre(2, 9, ROSE_D))
        fig = VGroup(tb, ch)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Chaque chiffre a sa place :", "unités, dixièmes, centièmes."),
            ("Le plus gros chiffre au rang le plus", "fort donne le plus grand nombre."),
            ("Plus de chiffres ne veut pas", "dire plus grand.")], fs=36)
        self.au_mot("Chaque chiffre")
        self.montrer_ligne(lignes[0], Indicate(tb.entetes, color=JAUNE_TITRE, scale_factor=1.1))
        self.au_mot("Le plus gros")
        self.montrer_ligne(lignes[1], Indicate(ch[0], color=VERT_OK, scale_factor=1.6))
        self.au_mot("Plus de chiffres")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_porte1()
        self.ecran_question1()
        self.ecran_porte2()
        self.ecran_porte3()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class DecimalDefi6e(DecimalDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
