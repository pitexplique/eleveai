# decimal_calcul_defi.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 12 : DÉFIS DE CALCUL
# (micro decimal_calcul_defi, notion decimal_calcul), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux-calcul-defi.js).
# Décor et métier : Inès, VENDEUSE DE JEUX VIDÉO (centres : jeux-video, argent-budget).
# Écrans : garde (00), situation (01), moitié (02), double (03), QUESTION 1 le quart (04),
# 10 % (05), nouveau prix (06), QUESTION 2 50 % (07), ordre de grandeur (08, le défi ★2
# du coach : 4,9 × 2 plus proche de 10), défi (09) et correction (09b), appris (10), fin (11).
# Voix : manim/voix/6e-decimal-calcul-defi.json (Julie, débit −6) ;
# marques : decimal_calcul_defi_marques.json (python manim/scripts/6e/decimal_marques.py calcul-defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_calcul_defi.py DecimalCalculDefi6e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_calcul_defi.py DecimalCalculDefi6e -o eleveai-maths-6e-decimal-calcul-defi --media_dir manim/scripts/6e/media-dec-12
# Sortie : manim/sorties/6e/maths/decimaux/12-calcul-defi/eleveai-maths-6e-decimal-calcul-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403

VIOLET_J = "#7c3aed"
CYAN_J = "#22d3ee"


# ── Les dessins du magasin (propres à cet épisode) ─────────────────────────
def ines(s=1.0):
    """Inès, vendeuse de jeux vidéo : son casque de joueuse."""
    p = visage(personne(peau="#8d5524", tenue=VIOLET_J, cheveux="#111827", longs=True, s=s))
    p.add(casque_audio(p))
    return p


def boite_jeu(s=1.0, couleur="#2563eb"):
    """La boîte d'un jeu vidéo : la jaquette, une manette dessinée, pas de texte."""
    boite = RoundedRectangle(width=1.25 * s, height=1.65 * s, corner_radius=0.08 * s, fill_color=couleur,
                             fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    bande = Rectangle(width=1.25 * s, height=0.26 * s, fill_color="#0f172a", fill_opacity=1, stroke_width=0)
    bande.align_to(boite, UP)
    jaq = RoundedRectangle(width=0.95 * s, height=0.95 * s, corner_radius=0.08 * s, fill_color=WHITE, fill_opacity=0.9,
                           stroke_width=0).move_to(boite.get_center() + DOWN * 0.12 * s)
    eto = Star(5, outer_radius=0.33 * s, inner_radius=0.14 * s, fill_color=AMBRE_D, fill_opacity=1,
               stroke_width=0).move_to(jaq)
    return VGroup(boite, bande, jaq, eto)


def manette(s=1.0, couleur="#334155"):
    corps = RoundedRectangle(width=1.9 * s, height=0.8 * s, corner_radius=0.35 * s, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=3)
    poignees = VGroup(*[Circle(radius=0.36 * s, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
                        .move_to(P(x * s, -0.32 * s)) for x in (-0.62, 0.62)])
    croix_d = VGroup(Rectangle(width=0.36 * s, height=0.11 * s), Rectangle(width=0.11 * s, height=0.36 * s))
    croix_d.set_fill("#0f172a", 1).set_stroke(width=0).move_to(P(-0.52 * s, 0.05 * s))
    btn = VGroup(*[Dot(P((0.52 + dx) * s, (0.05 + dy) * s), radius=0.07 * s, color=c)
                   for dx, dy, c in ((0, 0.13, "#22c55e"), (0.13, 0, "#ef4444"), (0, -0.13, "#3b82f6"),
                                     (-0.13, 0, AMBRE_D))])
    return VGroup(poignees, corps, croix_d, btn)


def console_jeu(s=1.0):
    """Une console portable : l'écran au milieu, une manette de chaque côté."""
    ecr = RoundedRectangle(width=2.0 * s, height=1.2 * s, corner_radius=0.06 * s, fill_color="#0f172a", fill_opacity=1,
                           stroke_color="#475569", stroke_width=4)
    img = Rectangle(width=1.7 * s, height=0.95 * s, fill_color="#0ea5e9", fill_opacity=1, stroke_width=0).move_to(ecr)
    tri = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.22 * s).rotate(-PI / 2).move_to(img)
    cotes = VGroup(*[RoundedRectangle(width=0.5 * s, height=1.2 * s, corner_radius=0.22 * s, fill_color=c, fill_opacity=1,
                                      stroke_width=0).next_to(ecr, d, buff=0) for c, d in (("#ef4444", LEFT), ("#3b82f6", RIGHT))])
    boutons = VGroup(Dot(cotes[0].get_center() + UP * 0.2 * s, radius=0.09 * s, color="#0f172a"),
                     Dot(cotes[1].get_center() + DOWN * 0.2 * s, radius=0.09 * s, color="#0f172a"))
    return VGroup(cotes, ecr, img, tri, boutons)


def etagere(s=1.0):
    """Une étagère du magasin, garnie de boîtes de jeux."""
    planche = Rectangle(width=3.4 * s, height=0.12 * s, fill_color="#92400e", fill_opacity=1, stroke_width=0)
    boites = VGroup(*[boite_jeu(0.55 * s, c) for c in ("#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ea580c")])
    boites.arrange(RIGHT, buff=0.08 * s).next_to(planche, UP, buff=0)
    return VGroup(planche, boites)


class DecimalCalculDefiBase(PaysageDecimal):
    nom_voix = "6e-decimal-calcul-defi"
    fichier_marques = "decimal_calcul_defi_marques.json"

    def etiquette(self, s, couleur=AMBRE_D, fs=34):
        """L'étiquette de prix (texte dit à son mot) : renvoyée, non ajoutée."""
        t = Text(s, font_size=fs, color="#0f172a", weight=BOLD)
        cadre = RoundedRectangle(width=t.width + 0.5, height=t.height + 0.32, corner_radius=0.1, fill_color=couleur,
                                 fill_opacity=1, stroke_color=WHITE, stroke_width=3)
        t.move_to(cadre).shift(RIGHT * 0.08)
        trou = Dot(cadre.get_left() + RIGHT * 0.14, radius=0.05, color="#0f172a")
        g = VGroup(cadre, trou, t)
        g.texte = t
        return g

    def barre_prix(self, larg, n, h=0.7, couleur=AMBRE_D):
        """Une bande (un prix entier) coupée en n parts égales, rien de colorié."""
        return barre_unite(n, larg=larg, h=h, couleur=couleur)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis de calcul avec les décimaux", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        ma = manette(1.05).move_to(P(3.3, 0.55))
        bo = boite_jeu(0.95, "#dc2626").move_to(P(1.3, 0.55))
        self.play(FadeIn(bo, shift=UP * 0.2), FadeIn(ma, shift=UP * 0.2), run_time=0.35)
        mots = self.bloc(["Moitié,", "double,", "pourcentage :"], 42)
        mots.move_to(P(-3.8, 0.75))
        for m, mot, c in zip(mots, ("Moitié", "double", "pourcentage"), (BLEU_D, AMBRE_D, ROSE_D)):
            m.set_color(c)
            self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.15), run_time=0.3)
        self.au_mot("sauras-tu")
        q = self.t("Sauras-tu tout calculer ?", 40, JAUNE_TITRE).move_to(P(-1.0, -1.05))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(ma), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Inès, vendeuse de jeux vidéo ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ie = ines(1.05).move_to(P(-5.1, -0.1))
        self.au_mot("Voici Inès")
        nom = self.t("Inès", 44, VIOLET_D).next_to(ie, UP, buff=0.2)
        self.play(FadeIn(ie, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle tient")
        et = etagere(1.0).move_to(P(-1.75, 1.55))
        comp = RoundedRectangle(width=3.4, height=1.0, corner_radius=0.08, fill_color="#78350f", fill_opacity=1,
                                stroke_width=0).move_to(P(-1.75, -1.75))
        ma = manette(0.7).next_to(comp, UP, buff=0.05).shift(LEFT * 0.7)
        co = console_jeu(0.45).next_to(comp, UP, buff=0.05).shift(RIGHT * 0.75)
        self.play(FadeIn(et, shift=DOWN * 0.2), FadeIn(comp), FadeIn(ma), FadeIn(co), run_time=0.5)
        self.au_mot("un magasin")
        l1 = self.bloc(["Un magasin", "de jeux vidéo."], 40)
        self.col(l1, 2.3)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Chaque jour")
        l2 = self.t("Chaque jour, elle calcule :", 36)
        self.col(l2, 0.95)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        for k, (mot, txt, c) in enumerate((("moitiés", "des moitiés,", BLEU_D), ("doubles", "des doubles,", AMBRE_D),
                                          ("réductions", "des réductions.", ROSE_D))):
            m = self.t(txt, 38, c)
            self.col(m, 0.15 - 0.68 * k, xl=1.5)
            self.au_mot(mot)
            self.play(FadeIn(m, shift=RIGHT * 0.15), Indicate(et[1][k + 1], scale_factor=1.25), run_time=0.35)
        self.attendre_voix()

    # ── 02 : la moitié ──────────────────────────────────────────────────────
    def ecran_moitie(self):
        self.ecran("02-moitie")
        self.au_mot("Défi 1")
        tit = self.t("Défi 1 : la moitié", 46, JAUNE_TITRE)
        hors_audit(tit)  # « moitié » est dit plus loin : le titre suit « Défi 1 »
        self.col(tit, 2.85)
        self.play(Write(tit), run_time=0.4)
        bo = boite_jeu(1.0, "#16a34a").move_to(P(-4.9, 1.75))
        et = self.etiquette("7 €").next_to(bo, RIGHT, buff=0.35).shift(UP * 0.3)
        l1 = self.ligne([("Un jeu d'occasion :", WHITE), ("7 €", AMBRE_D)], 36)
        self.col(l1, 2.0)
        self.au_mot("un jeu")
        self.play(FadeIn(bo, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("7 euros")
        self.play(FadeIn(l1[1], scale=1.2), FadeIn(et, scale=1.2), run_time=0.35)
        tp = self.t("moitié prix !", 34, ROSE_D).next_to(et, DOWN, buff=0.3).align_to(et, LEFT)
        l2 = self.ligne([("Inès le vend", WHITE), ("à moitié prix.", ROSE_D)], 34, buff=0.16)
        self.col(l2, 1.3)
        self.au_mot("Inès le vend")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("moitié prix")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(tp, scale=1.2), run_time=0.35)
        self.au_mot("La moitié")
        b = self.barre_prix(5.6, 2, h=0.8).move_to(P(-3.4, -0.35))
        b.parts.set_fill(CASE, 0.5)
        l3 = self.ligne([("La moitié :", BLEU_D), ("÷ 2", BLEU_D)], 38)
        self.col(l3, 0.45)
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(b.cadre), FadeIn(b.parts), run_time=0.35)
        self.au_mot("diviser par 2")
        self.play(FadeIn(l3[1], scale=1.3), b.traits.animate.set_opacity(1), run_time=0.35)
        sept = self.t("7 €", 34, AMBRE_D).next_to(b, UP, buff=0.15)
        self.au_mot("7 divisé")
        self.play(FadeIn(sept), run_time=0.25)
        self.calc([("7", WHITE), ("÷ 2", BLEU_D), ("= 3,5", VERT_OK)], -0.55, fs=46)
        moities = VGroup(*[self.t("3,5", 36, VERT_OK).move_to(b.parts[i]) for i in range(2)])
        self.play(LaggedStart(*[b.parts[i].animate.set_fill(BLEU_D, 0.55) for i in range(2)], lag_ratio=0.3),
                  FadeIn(moities, scale=1.3), run_time=0.45)
        self.au_mot("Le jeu coûte")
        l4 = self.t("Le jeu coûte :", 34)
        self.col(l4, -1.45)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("3,50")
        g = self.gros("3,50 €", fs=56)
        self.col(g, -2.35, xl=1.4)
        self.play(FadeIn(g, scale=1.3), Create(croix(et.texte, sw=6)), run_time=0.45)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 03 : le double ──────────────────────────────────────────────────────
    def ecran_double(self):
        self.ecran("03-double")
        self.au_mot("Défi 2")
        tit = self.t("Défi 2 : le double", 46, JAUNE_TITRE)
        hors_audit(tit)
        self.col(tit, 2.85)
        self.play(Write(tit), run_time=0.4)
        m1 = manette(1.2).move_to(P(-4.6, 1.6))
        et = self.etiquette("24,5 €").next_to(m1, RIGHT, buff=0.35)
        l1 = self.ligne([("Une manette :", WHITE), ("24,5 €", AMBRE_D)], 36)
        self.col(l1, 2.0)
        self.au_mot("une manette")
        self.play(FadeIn(m1, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("24,5 euros")
        self.play(FadeIn(l1[1], scale=1.2), FadeIn(et, scale=1.2), run_time=0.35)
        self.au_mot("Un client")
        m2 = manette(1.2).move_to(P(-4.6, -0.2))
        l2 = self.t("Un client en prend deux.", 34)
        self.col(l2, 1.3)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(m2, shift=UP * 0.3), run_time=0.4)
        self.au_mot("Le double")
        l3 = self.ligne([("Le double :", AMBRE_D), ("× 2", AMBRE_D)], 38)
        self.col(l3, 0.45)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 2")
        x2 = self.t("× 2", 50, AMBRE_D).move_to(P(-2.0, 0.7))
        self.play(FadeIn(l3[1], scale=1.3), FadeIn(x2, scale=1.3), run_time=0.35)
        self.au_mot("24,5 fois")
        self.calc([("24,5", WHITE), ("× 2", AMBRE_D), ("= 49", VERT_OK)], -0.55, fs=46)
        self.au_mot("49 euros")
        g = self.gros("49 €", fs=60)
        self.col(g, -1.75, xl=1.4)
        acc = Brace(VGroup(m1, m2), LEFT, color=VERT_OK)
        self.play(FadeIn(g, scale=1.3), GrowFromCenter(acc), run_time=0.45)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1, le quart ───────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = self.barre_prix(5.6, 4, h=0.85).move_to(P(-3.5, 0.6))
        b.parts.set_fill(CASE, 0.5)
        b.traits.set_opacity(0)

        def avant(sc):
            sc.play(FadeIn(b.cadre), FadeIn(b.parts), run_time=0.35)

        def apres(sc):
            sc.au_mot("Le quart")
            sc.rep(0)
            # les deux moitiés sous la bande, à gauche : dans la colonne, la phrase passait sous Ti Margo
            lg = [sc.t(x, 36, VERT_OK).move_to(P(0, y)).align_to(P(-6.3, 0), LEFT)
                  for x, y in (("Moitié de 10 : 5.", -1.3), ("Moitié de 5 : 2,5.", -2.0))]
            dix = sc.t("10", 40, WHITE).next_to(b, UP, buff=0.2)
            sc.au_mot("La moitié de 10")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), FadeIn(dix, scale=1.3),
                    b.traits[1].animate.set_opacity(1), run_time=0.35)
            cinq = VGroup(*[sc.t("5", 38, BLEU_D).move_to(VGroup(b.parts[2 * i], b.parts[2 * i + 1])) for i in range(2)])
            sc.play(FadeIn(cinq, scale=1.3), b.parts.animate.set_fill(BLEU_D, 0.45), run_time=0.35)
            sc.au_mot("La moitié de 5")
            sc.play(FadeIn(lg[1], shift=UP * 0.1), FadeOut(cinq[0]), b.traits[0].animate.set_opacity(1),
                    run_time=0.35)
            q = VGroup(*[sc.t("2,5", 30, VERT_OK).move_to(b.parts[i]) for i in range(2)])
            acc = Brace(VGroup(b.parts[0]), DOWN, color=VERT_OK)
            lq = sc.t("le quart", 30, VERT_OK).next_to(acc, DOWN, buff=0.1)
            hors_audit(lq)
            sc.play(FadeIn(q, scale=1.3), b.parts[0].animate.set_fill(VERT_OK, 0.6), GrowFromCenter(acc),
                    FadeIn(lq), run_time=0.4)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Quel est le quart de 10 ?"],
                            [self.t("2,5", 36), self.t("2,4", 36), self.t("40", 36)], 0,
                            ["Le quart : la moitié de la moitié."],
                            mot_q="Quel", avant_q=avant, autres_r=apres)

    # ── 05 : 10 % ───────────────────────────────────────────────────────────
    def ecran_pourcent(self):
        self.ecran("05-pourcent")
        self.au_mot("Défi 3")
        tit = self.t("Défi 3 : les soldes !", 46, JAUNE_TITRE)
        self.col(tit, 2.85)
        self.play(Write(tit), run_time=0.4)
        bo = boite_jeu(1.0, "#9333ea").move_to(P(-5.0, 1.85))
        ban = self.t("SOLDES", 40, ROUGE_ERREUR).move_to(P(-2.3, 2.85))
        hors_audit(ban)
        self.play(FadeIn(bo, shift=UP * 0.2), FadeIn(ban, scale=1.3), run_time=0.35)
        self.au_mot("36 euros")
        et = self.etiquette("36 €").next_to(bo, RIGHT, buff=0.35).shift(UP * 0.25)
        l1 = self.ligne([("Un jeu à", WHITE), ("36 €,", AMBRE_D)], 36)
        self.col(l1, 2.05)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(et, scale=1.2), run_time=0.35)
        self.au_mot("10 % de")
        red = self.etiquette("− 10 %", ROSE_D, 30).next_to(et, DOWN, buff=0.2).align_to(et, LEFT)
        l2 = self.ligne([("10 %", ROSE_D), ("de réduction.", WHITE)], 36)
        self.col(l2, 1.4)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(red, scale=1.2), run_time=0.35)
        self.au_mot("10 %, c'est")
        b = barre_unite(10, larg=5.8, h=0.75).move_to(P(-3.3, -0.4))
        trente = self.t("36 €", 32, AMBRE_D).next_to(b, UP, buff=0.15)
        hors_audit(trente)  # le prix déjà dit, rappelé au-dessus de la bande
        l3 = self.ligne([("10 % :", ROSE_D), ("un dixième.", ROSE_D)], 36)
        self.col(l3, 0.6)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(b), FadeIn(trente), run_time=0.45)
        self.au_mot("on divise par 10")
        l4 = self.t("On divise par 10.", 36)
        self.col(l4, -0.05)
        self.play(FadeIn(l4, shift=UP * 0.1), b.parts[0].animate.set_fill(ROSE_D, 0.95), run_time=0.35)
        self.au_mot("36 divisé")
        self.calc([("36", WHITE), ("÷ 10", ROSE_D), ("= 3,6", VERT_OK)], -0.8, fs=46)
        fl = Arrow(b.parts[0].get_bottom() + DOWN * 0.85, b.parts[0].get_bottom(), color=ROSE_D, buff=0.05,
                   stroke_width=6)
        tr = self.t("3,6", 32, ROSE_D).next_to(fl, DOWN, buff=0.08)
        self.play(GrowArrow(fl), FadeIn(tr, scale=1.3), run_time=0.35)
        self.au_mot("La réduction")
        l5 = self.t("La réduction :", 34, ROSE_D)
        self.col(l5, -1.6)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.au_mot("3,60")
        g = self.gros("3,60 €", couleur=ROSE_D, fs=54)
        self.col(g, -2.45, xl=1.4)
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le nouveau prix ────────────────────────────────────────────────
    def ecran_nouveau_prix(self):
        self.ecran("06-nouveau-prix")
        bo = boite_jeu(1.25, "#9333ea").move_to(P(-4.3, 0.9))
        self.add(bo)
        self.au_mot("Le nouveau prix")
        tit = self.t("Le nouveau prix :", 44, JAUNE_TITRE)
        self.col(tit, 2.5)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("36 moins")
        et = self.etiquette("36 €", fs=40).next_to(bo, RIGHT, buff=0.4).shift(UP * 0.45)
        lg = self.calc([("36", WHITE), ("− 3,6", ROSE_D), ("= 32,4", VERT_OK)], 1.2, fs=50, avec=[FadeIn(et, scale=1.2)])
        self.au_mot("Le jeu coûte")
        l2 = self.t("Le jeu coûte :", 36)
        self.col(l2, 0.05)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("32,40")
        g = self.gros("32,40 €", fs=60)
        self.col(g, -1.0, xl=1.4)
        nv = self.etiquette("32,40 €", VERT_OK, 40).next_to(et, DOWN, buff=0.35).align_to(et, LEFT)
        self.play(FadeIn(g, scale=1.3), Create(croix(et.texte, sw=6)), FadeIn(nv, scale=1.2), run_time=0.45)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2, 50 % ───────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bo = boite_jeu(1.1, "#ea580c").move_to(P(-5.0, 1.9))
        b = self.barre_prix(5.6, 2, h=0.85).move_to(P(-3.5, -0.4))
        b.parts.set_fill(CASE, 0.5)

        def avant(sc):
            sc.play(FadeIn(bo, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["50 %,", "c'est la moitié."])
            sc.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(b), run_time=0.3)
            sc.au_mot("c'est la moitié")
            sc.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
            lg = sc.ligne_rep(1, ["18 ÷ 2", "= 9."])
            dix8 = sc.t("18 €", 34, AMBRE_D).next_to(b, UP, buff=0.15)
            sc.au_mot("18 divisé")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), FadeIn(dix8, scale=1.2), run_time=0.35)
            neufs = VGroup(*[sc.t("9", 40, VERT_OK).move_to(b.parts[i]) for i in range(2)])
            sc.au_mot("ça fait 9")
            sc.play(FadeIn(lg[1], scale=1.2), FadeIn(neufs, scale=1.4), b.parts[0].animate.set_fill(VERT_OK, 0.55),
                    run_time=0.35)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Combien font 50 % de 18 € ?"],
                            [self.t("9 €", 36), self.t("1,8 €", 36), self.t("36 €", 36)], 0,
                            ["50 %, c'est la moitié.", "18 ÷ 2 = 9."], mot_q="Combien", avant_q=avant, autres_r=apres)

    # ── 08 : l'ordre de grandeur (défi ★2 du coach) ─────────────────────────
    def ecran_ordre(self):
        self.ecran("08-ordre")
        self.au_mot("Défi 4")
        tit = self.t("Défi 4, sans poser :", 46, JAUNE_TITRE)
        self.col(tit, 2.85)
        self.play(Write(tit), run_time=0.4)
        x0, x1, y = -6.0, -0.3, 0.2
        px = lambda v: P(x0 + (v - 8) / 2 * (x1 - x0), y)  # noqa: E731
        axe = Line(px(7.85), px(10.15), color=WHITE, stroke_width=5)
        tics = VGroup(*[Line(px(8 + k / 10) + DOWN * (0.25 if k % 10 == 0 else 0.12),
                             px(8 + k / 10) + UP * (0.25 if k % 10 == 0 else 0.12), color=WHITE,
                             stroke_width=5 if k % 10 == 0 else 3) for k in range(21)])
        self.au_mot("4,9 fois 2")
        l1 = self.ligne([("4,9", WHITE), ("× 2", AMBRE_D)], 46)
        self.col(l1, 2.0)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("plus proche")
        l2 = self.ligne([("plus proche de", WHITE), ("8", BLEU_D), ("ou de", WHITE), ("10 ?", ROSE_D)], 36, buff=0.16)
        self.col(l2, 1.25)
        huit = self.t("8", 40, BLEU_D).next_to(px(8), DOWN, buff=0.4)
        dix = self.t("10", 40, ROSE_D).next_to(px(10), DOWN, buff=0.4)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(axe), FadeIn(tics), run_time=0.4)
        self.au_mot("de 8")
        self.play(FadeIn(l2[1], scale=1.3), FadeIn(huit, scale=1.3), run_time=0.3)
        self.au_mot("de 10")
        self.play(FadeIn(l2[2]), FadeIn(l2[3], scale=1.3), FadeIn(dix, scale=1.3), run_time=0.3)
        self.ligne_au_mot([("4,9 :", WHITE), ("presque", WHITE), ("5.", AMBRE_D)], ["4,9, c'est", "presque", "5. 5 fois"],
                          0.4, fs=38)
        self.au_mot("5 fois 2")
        self.calc([("5", AMBRE_D), ("× 2", AMBRE_D), ("= 10", ROSE_D)], -0.45, fs=44)
        self.play(Indicate(dix, color=ROSE_D, scale_factor=1.6), run_time=0.45)
        self.au_mot("Le calcul exact")
        l4 = self.t("Calcul exact :", 34)
        self.col(l4, -1.35)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("9,8")
        g = self.gros("9,8", fs=44)
        g.next_to(l4, RIGHT, buff=0.25)
        pt = Dot(px(9.8), radius=0.13, color=VERT_OK)
        ept = self.t("9,8", 34, VERT_OK).next_to(pt, UP, buff=0.35)
        self.play(FadeIn(g, scale=1.3), FadeIn(pt, scale=2), FadeIn(ept), run_time=0.4)
        self.au_mot("tout près de 10")
        l5 = self.t("tout près de 10 !", 40, VERT_OK)
        self.col(l5, -2.3, xl=1.4)
        ecart = Line(px(9.8) + UP * 0.22, px(10) + UP * 0.22, color=VERT_OK, stroke_width=10)
        self.play(FadeIn(l5, scale=1.2), Create(ecart), Indicate(dix, color=VERT_OK, scale_factor=1.5), run_time=0.45)
        self.attendre_voix()

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        co = console_jeu(1.0).move_to(P(-3.9, 0.9))
        et = self.etiquette("250 €", fs=40).next_to(co, DOWN, buff=0.4).shift(LEFT * 0.9)
        l1 = self.ligne([("Une console :", WHITE), ("250 €.", AMBRE_D)], 38)
        self.col(l1, 2.0, xl=0.6)
        self.au_mot("Une console")
        self.play(FadeIn(co, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("250 euros")
        self.play(FadeIn(l1[1], scale=1.2), FadeIn(et, scale=1.2), run_time=0.35)
        red = self.etiquette("− 10 %", ROSE_D, 34).next_to(et, RIGHT, buff=0.35)
        l2 = self.ligne([("Inès fait", WHITE), ("10 %", ROSE_D), ("de réduction.", WHITE)], 38, buff=0.16)
        self.col(l2, 1.2, xl=0.6)
        self.au_mot("Inès fait")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 % de")
        self.play(FadeIn(l2[1], scale=1.2), FadeIn(red, scale=1.2), run_time=0.3)
        self.au_mot("réduction")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Quel est")
        l3 = self.t("Quel est le nouveau prix ?", 40, ORANGE_RETENUE)
        self.col(l3, 0.2, xl=0.6)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-1.4)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        co = console_jeu(0.85).move_to(P(-4.0, 1.2))
        et = self.etiquette("250 €", fs=36).next_to(co, DOWN, buff=0.4)
        self.add(co)
        l1 = self.ligne([("10 %", ROSE_D), ("de 250 :", WHITE)], 38)
        self.col(l1, 2.05)
        self.au_mot("10 % de 250")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de 250")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(et, scale=1.2), run_time=0.35)
        self.au_mot("c'est 250")
        self.calc([("250", WHITE), ("÷ 10", ROSE_D), ("= 25 €", ROSE_D)], 1.2, fs=44)
        self.au_mot("Le nouveau prix")
        l2 = self.t("Le nouveau prix :", 38)
        self.col(l2, 0.25)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("250 moins")
        self.calc([("250", WHITE), ("− 25", ROSE_D), ("= 225", VERT_OK)], -0.6, fs=44)
        self.au_mot("225 euros")
        g = self.gros("225 €", fs=60)
        self.col(g, -1.75, xl=1.4)
        nv = self.etiquette("225 €", VERT_OK, 36).next_to(et, DOWN, buff=0.3)
        self.play(FadeIn(g, scale=1.3), Create(croix(et.texte, sw=6)), FadeIn(nv, scale=1.2), run_time=0.4)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        fig = VGroup(ines(1.0), manette(0.8)).arrange(DOWN, buff=0.3)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("La moitié : ÷ 2.",),
            ("Le double : × 2.",),
            ("Le quart : la moitié de la moitié.",),
            ("10 % : ÷ 10.",),
            ("Un ordre de grandeur", "vérifie le résultat.")], fs=36)
        for lg, mot in zip(lignes, ("La moitié", "Le double", "Le quart", "10 %", "Un ordre")):
            self.au_mot(mot)
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_moitie()
        self.ecran_double()
        self.ecran_question1()
        self.ecran_pourcent()
        self.ecran_nouveau_prix()
        self.ecran_question2()
        self.ecran_ordre()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class DecimalCalculDefi6e(DecimalCalculDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
