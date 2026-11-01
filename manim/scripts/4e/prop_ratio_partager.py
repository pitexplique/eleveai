# prop_ratio_partager.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 31 : PARTAGER SELON UN RATIO (micro du coach :
# prop_ratio_partager, notion prop_ratio), AVEC VOIX. PAYSAGE SEULEMENT (le
# short 4e-prop-ratio-short-partager existe déjà), CEINTURE VERTE.
# ⭐ Méthode travaillée : les trois étapes du partage — compter les parts en
# tout (3 + 2 = 5), la valeur d'UNE part (total ÷ parts), chacun reçoit ses
# parts (3 × 240) — puis la vérification (la somme redonne le total). Ratio
# écrit « 3 : 2 », dit « 3 pour 2 ». Pas de produit en croix (réservé à
# l'épisode 24) ; « ÷ » écrit, jamais 5/2.
# ⭐ Le dessin qui porte tout : la BARRE DE PARTS (RangeeParts de l'épisode 28 :
# une part = un bloc coloré, la valeur d'une part écrite DEDANS : « ? » puis
# « 240 € »), en bande (deux personnes) ou en rangées (trois personnes).
# ⭐ Fil rouge (erreur 3, la mauvaise division) : diviser le total par CHAQUE
# nombre du ratio (1 200 ÷ 3, puis ÷ 2) au lieu du nombre de parts en tout
# (écran 07, lignes barrées). Question 1 (90 €, 1 : 2) : A = 45 € et 45 €
# (partage en deux moitiés, le ratio oublié), barré à « 3 parts » ; C = 90 € et
# 180 € (le total multiplié au lieu d'être divisé), barré à « pour l'autre ».
# Question 2 (600 €, 3 : 1) : A = 200 € (600 ÷ 3, le piège), barré à
# « 4 parts » ; C = 300 € (la moitié), barré à « Le premier ».
#
# Décor et métier : MUSIQUE, Awa, PRODUCTRICE de musique ; le cachet d'un
# concert partagé entre deux rappeurs, Djibril et Marius (1 200 €, 3 : 2) ;
# puis à trois avec Inaya, DJ (2 000 €, 4 : 3 : 3) ; défi : 1 500 € de ventes
# de tee-shirts entre trois artistes (2 : 3 : 5).
# Chiffres : tous inventés (cachets, ventes), plausibles. Aucun chiffre du
# monde réel : pas de source à citer.
# Centres d'intérêt : musique, argent-budget.
#
# Écrans : 00 garde · 01 Awa, le concert, 1 200 € pour Djibril et Marius,
# ratio 3 : 2 · 02 compter les parts (3 + 2 = 5) · 03 la valeur d'une part
# (1 200 ÷ 5 = 240 €) · 04 chacun ses parts (720 €, 480 €) et la vérification ·
# 05 QUESTION 1 (90 €, 1 : 2) · 06 à trois (Inaya, 2 000 €, 4 : 3 : 3) ·
# 07 piège (÷ 3 puis ÷ 2, barré) · 08 QUESTION 2 (600 €, 3 : 1) · 09 défi
# tee-shirts · 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-ratio-partager.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/4e-prop-ratio-partager/ ; marques mot à
# mot : manim/scripts/4e/prop_ratio_partager_marques.json (scripts/
# marques_dump.ps1 puis le convertisseur « une marque par occurrence »).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropRatioEcrireBase de l'épisode 28 (RangeeParts,
# barre_ratio, barrer_choix, deux_rangees, total ; lc, jouer, montre, ligne_rep
# bornée, coche loin du texte des choix). Ajouté ICI : awa(), rappeur(), dj(),
# billets(), scene_concert(), tee_shirt(), bande().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_ratio_partager.py PropRatioPartager4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_ratio_partager.py PropRatioPartager4e -o eleveai-maths-4e-prop-ratio-partager --media_dir manim/media-prop-4e-31
# Sortie : manim/sorties/4e/maths/proportionnalite/31-ratio-partager/eleveai-maths-4e-prop-ratio-partager.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, RangeeParts, barre_ratio, couleurs)
from prop_ratio_ecrire import PropRatioEcrireBase, RangeeParts, barre_ratio, sans  # noqa: E402

ROSE_P = "#f472b6"     # Inaya, la DJ
VIOLET_P = "#a78bfa"   # défi : artiste 1
VERT_P = "#4ade80"     # défi : artiste 2
ORANGE_P = "#fb923c"   # défi : artiste 3
BILLET = "#86efac"


def micro(p):
    """Un micro à main tenu devant le personnage p."""
    c = p.corps.get_center()
    r = p.tete.width / 2
    manche = Line(c + P(0.25, -0.15) * r / 0.42, c + P(0.42, 0.45) * r / 0.42, color="#9ca3af", stroke_width=7)
    tete = Circle(radius=0.13 * r / 0.42, fill_color="#4b5563", fill_opacity=1, stroke_color=WHITE,
                  stroke_width=2).move_to(manche.get_end())
    return VGroup(manche, tete)


def awa(s=1.0):
    """Awa, productrice : casque audio, tenue violette, cheveux longs."""
    p = personne(peau="#8d5524", tenue="#7c3aed", cheveux="#111827", longs=True)
    p.add(casque_audio(p))
    return p.scale(s)


def rappeur(tenue, peau="#c68642", s=1.0):
    """Un rappeur : casquette et micro à la main."""
    p = personne(peau=peau, tenue=tenue, cheveux="#111827")
    t = p.tete
    visiere = RoundedRectangle(width=t.width * 0.75, height=t.width * 0.14, corner_radius=0.04,
                               fill_color=tenue, fill_opacity=1, stroke_width=0)
    visiere.move_to(t.get_center() + UP * t.width * 0.25 + RIGHT * t.width * 0.35)
    p.add(visiere, micro(p))
    return p.scale(s)


def dj(s=1.0):
    """Inaya, DJ : casque audio et platine (deux disques) devant elle."""
    p = personne(peau="#e0ac69", tenue=ROSE_P, cheveux="#7c2d12", longs=True)
    p.add(casque_audio(p))
    c = p.corps.get_center()
    table = RoundedRectangle(width=1.7, height=0.55, corner_radius=0.06, fill_color="#334155", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2).move_to(c + DOWN * 0.45)
    disques = VGroup(*[Circle(radius=0.2, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                              stroke_width=2).move_to(table.get_center() + RIGHT * x) for x in (-0.45, 0.45)])
    p.add(table, disques)
    return p.scale(s)


def billets(n=3, s=1.0):
    """Une liasse de billets (dessin seul, sans nombre)."""
    g = VGroup()
    for i in range(n):
        b = RoundedRectangle(width=1.0, height=0.52, corner_radius=0.06, fill_color=BILLET, fill_opacity=1,
                             stroke_color="#166534", stroke_width=3)
        rond = Circle(radius=0.15, stroke_color="#166534", stroke_width=3).move_to(b)
        g.add(VGroup(b, rond).shift(P(0.12 * i, 0.1 * i)).rotate(0.08 * (i - 1)))
    return g.scale(s)


def note(s=1.0, couleur=AMBRE):
    """Une croche de musique."""
    tete = Ellipse(width=0.3, height=0.22, fill_color=couleur, fill_opacity=1, stroke_width=0).rotate(0.4)
    hampe = Line(tete.get_right() + LEFT * 0.03, tete.get_right() + LEFT * 0.03 + UP * 0.6, color=couleur,
                 stroke_width=5)
    drapeau = Line(hampe.get_end(), hampe.get_end() + P(0.22, -0.2), color=couleur, stroke_width=5)
    return VGroup(tete, hampe, drapeau).scale(s)


def scene_concert(l=3.6, h=1.6):
    """Une scène de concert : le plancher, deux projecteurs et leurs faisceaux,
    des notes qui flottent."""
    plancher = Rectangle(width=l, height=0.25, fill_color="#78350f", fill_opacity=1, stroke_width=0)
    plancher.move_to(DOWN * h / 2)
    faisceaux = VGroup()
    projos = VGroup()
    for x in (-l * 0.35, l * 0.35):
        haut = P(x, h / 2)
        projos.add(Circle(radius=0.12, fill_color=GREY_B, fill_opacity=1, stroke_width=0).move_to(haut))
        faisceaux.add(Polygon(haut, P(-x * 0.2 - 0.45, -h / 2 + 0.12), P(-x * 0.2 + 0.45, -h / 2 + 0.12),
                              fill_color=JAUNE_P, fill_opacity=0.25, stroke_width=0))
    notes = VGroup(note(0.8), note(0.6, ROSE_P), note(0.7, BLEU_P)).arrange(RIGHT, buff=0.5).move_to(UP * 0.1)
    notes[1].shift(UP * 0.25)
    return VGroup(faisceaux, plancher, projos, notes)


def tee_shirt(couleur, s=1.0):
    """Un tee-shirt (silhouette à manches courtes)."""
    pts = [P(-0.2, 0.45), P(-0.55, 0.3), P(-0.75, 0.05), P(-0.5, -0.1), P(-0.4, 0.05), P(-0.4, -0.55),
           P(0.4, -0.55), P(0.4, 0.05), P(0.5, -0.1), P(0.75, 0.05), P(0.55, 0.3), P(0.2, 0.45), P(0, 0.33)]
    return Polygon(*pts, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2.5).scale(s)


def bande(parts, bw=1.1, valeur="?", centre=P(-3.3, 0.0), fs=26, synchro=False):
    """La barre de parts EN BANDE : les rangées (n, couleur) collées bout à
    bout, la valeur d'une part écrite dans chaque bloc. Renvoie la VGroup des
    RangeeParts (bande[i] : la rangée de la personne i)."""
    g = VGroup(*[RangeeParts(n, c, valeur, bw, fs=fs, synchro=synchro) for n, c in parts])
    g.arrange(RIGHT, buff=0).move_to(centre)
    return g


class PropRatioPartagerBase(PropRatioEcrireBase):
    nom_voix = "4e-prop-ratio-partager"
    fichier_marques = "prop_ratio_partager_marques.json"

    def duo(self, valeur="?", centre=P(-3.3, 0.2), synchro=False):
        """Djibril et Marius au-dessus de LEURS parts (bande 3 bleus + 2 jaunes).
        Renvoie (personnes avec noms, bande)."""
        b = bande([(3, BLEU_P), (2, JAUNE_P)], 1.2, valeur, centre, fs=22, synchro=synchro)
        dj_ = rappeur(BLEU_P, "#8d5524", 0.5).next_to(b[0], UP, buff=0.35)
        ma = rappeur(JAUNE_P, "#f1c27d", 0.5).next_to(b[1], UP, buff=0.35)
        n1 = sans(self.t("Djibril", 26, BLEU_P)).next_to(dj_, UP, buff=0.12)
        n2 = sans(self.t("Marius", 26, JAUNE_P)).next_to(ma, UP, buff=0.12)
        return VGroup(VGroup(dj_, n1), VGroup(ma, n2)), b

    def accolade(self, mob, s, couleur=WHITE, cote=DOWN, fs=28, synchro=True):
        """Une accolade sous (ou sur) mob et son texte : (accolade, texte)."""
        br = Brace(mob, cote, color=couleur, buff=0.08)
        t = self.t(s, fs, couleur).next_to(br, cote, buff=0.08)
        if not synchro:
            sans(t)
        return br, t

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Partager selon un ratio", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Partager")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        aw = awa(0.75).move_to(P(-5.2, 0.35))
        sc = scene_concert(3.0, 1.5).move_to(P(-1.9, 0.45))
        nom = self.t("Le concert d'Awa", 36, AMBRE).move_to(P(3.45, 0.5))
        self.play(FadeIn(aw, shift=UP * 0.3), FadeIn(sc), run_time=0.5)
        self.au_mot("Le concert")
        self.play(FadeIn(nom, shift=LEFT * 0.2), Indicate(sc[3], color=AMBRE), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Awa, productrice ; 1 200 € pour Djibril et Marius, ratio 3 : 2 ─
    def ecran_situation(self):
        self.ecran("01-situation")
        aw = awa(0.8).move_to(P(-5.6, 1.6))
        nom = sans(self.t("Awa", 36, VIOLET_P)).next_to(aw, DOWN, buff=0.15)
        self.montre("Voici Awa", FadeIn(aw, shift=UP * 0.3), FadeIn(nom), rt=0.5)
        sc = scene_concert(3.2, 1.6).move_to(P(-2.4, 2.0))
        L0 = self.lc([("Productrice", JAUNE_TITRE), ("de musique", WHITE)], 2.95, fs=40)
        self.jouer(L0, ["productrice", "de musique"])
        self.montre("un concert", FadeIn(sc, shift=DOWN * 0.2), rt=0.5)
        bi = billets(3, 0.8).move_to(P(-5.5, -0.65))
        L1 = self.lc([("1 200 €", VERT_OK), ("à partager", WHITE)], 2.1, fs=42)
        self.jouer(L1, ["1 200", "à partager"], {0: [FadeIn(bi, shift=DOWN * 0.3)]})
        d1 = rappeur(BLEU_P, "#8d5524", 0.65).move_to(P(-3.3, -1.1))
        d2 = rappeur(JAUNE_P, "#f1c27d", 0.65).move_to(P(-1.2, -1.1))
        n1 = sans(self.t("Djibril", 30, BLEU_P)).next_to(d1, DOWN, buff=0.12)
        n2 = sans(self.t("Marius", 30, JAUNE_P)).next_to(d2, DOWN, buff=0.12)
        L2 = self.lc([("entre Djibril", BLEU_P), ("et Marius.", JAUNE_P)], 1.3, fs=40)
        self.jouer(L2, ["entre deux", "et Marius"], {0: [FadeIn(d1, shift=UP * 0.3), FadeIn(n1)],
                                                 1: [FadeIn(d2, shift=UP * 0.3), FadeIn(n2)]})
        L3 = self.lc([("Djibril a écrit", BLEU_P), ("plus de textes.", WHITE)], 0.5, fs=38)
        self.jouer(L3, ["Djibril a", "plus de textes"], {0: [Indicate(d1, color=BLEU_P, scale_factor=1.1)]})
        L4 = self.lc([("Ratio", WHITE), ("3 : 2", AMBRE)], -0.55, fs=64)
        cadre = SurroundingRectangle(L4, color=AMBRE, buff=0.2, corner_radius=0.12, stroke_width=5)
        L5 = self.lc([("«", AMBRE), ("3 pour 2", AMBRE), ("»", AMBRE)], -1.75, fs=40)
        sans(L5[0]), sans(L5[2])
        self.jouer(L4, ["le ratio", "3 pour"], {1: [FadeIn(L5, shift=UP * 0.15)]})
        self.play(Create(cadre), Indicate(d1, color=BLEU_P), Indicate(d2, color=JAUNE_P), run_time=0.5)
        self.attendre_voix()

    # ── 02 : première étape : compter les parts (3 + 2 = 5) ─────────────────
    def ecran_parts(self):
        self.ecran("02-parts")
        gens, b = self.duo()
        self.add(gens)
        L0 = self.lc([("Première étape :", JAUNE_TITRE)], 2.95, fs=42)
        L1 = self.lc([("compter les parts.", JAUNE_TITRE)], 2.25, fs=42)
        self.jouer(L0, ["Première"])
        self.jouer(L1, ["compter les"])
        b3, t3 = self.accolade(b[0], "3 parts", BLEU_P, synchro=False)
        b2, t2 = self.accolade(b[1], "2 parts", JAUNE_P, synchro=False)
        L2 = self.lc([("3 parts", BLEU_P), ("pour Djibril,", BLEU_P)], 1.35, fs=38)
        self.jouer(L2, ["3 parts", "pour Djibril"],
                   {0: [LaggedStart(*[FadeIn(x, shift=DOWN * 0.3) for x in b[0].blocs], lag_ratio=0.15),
                        GrowFromCenter(b3), FadeIn(t3)]})
        L3 = self.lc([("2 parts", JAUNE_P), ("pour Marius :", JAUNE_P)], 0.65, fs=38)
        self.jouer(L3, ["2 parts", "pour Marius"],
                   {0: [LaggedStart(*[FadeIn(x, shift=DOWN * 0.3) for x in b[1].blocs], lag_ratio=0.15),
                        GrowFromCenter(b2), FadeIn(t2)]})
        L4 = self.lc([("3", BLEU_P), ("+", WHITE), ("2", JAUNE_P), ("=", WHITE), ("5 parts", VERT_OK)], -0.4, fs=56)
        self.jouer(L4, ["3 plus", None, "2, égale", None, "5 parts"])
        bt = Brace(b, DOWN, color=WHITE, buff=0.08).shift(DOWN * 0.75)
        t5 = sans(self.t("5 parts en tout", 30, VERT_OK)).next_to(bt, DOWN, buff=0.08)
        L5 = self.lc([("en tout.", WHITE)], -1.35, fs=40)
        self.jouer(L5, ["en tout"], {0: [GrowFromCenter(bt), FadeIn(t5)]})
        self.insister(VGroup(L4[4], L5), 1.15, 0.25)
        self.play(Indicate(b, color=AMBRE, scale_factor=1.04), run_time=0.5)
        self.attendre_voix()

    # ── 03 : deuxième étape : la valeur d'une part (1 200 ÷ 5 = 240 €) ──────
    def ecran_part(self):
        self.ecran("03-part")
        gens, b = self.duo()
        self.add(gens, b)
        L0 = self.lc([("Deuxième étape :", JAUNE_TITRE)], 2.95, fs=42)
        L1 = self.lc([("la valeur d'une part.", JAUNE_TITRE)], 2.25, fs=42)
        self.jouer(L0, ["Deuxième"])
        self.jouer(L1, ["la valeur"], {0: [Circumscribe(b[0].blocs[0], color=AMBRE, buff=0.05)]})
        bt, tt = self.accolade(b, "1 200 €", VERT_OK, fs=34)
        L2 = self.lc([("1 200 €", WHITE), ("÷ 5", AMBRE)], 1.2, fs=52)
        self.jouer(L2, ["1 200", "par 5"], {0: [GrowFromCenter(bt), FadeIn(tt, scale=1.2)],
                                           1: [Indicate(b, color=AMBRE, scale_factor=1.04)]})
        L3 = self.lc([("= 240 €", VERT_OK), ("par part", WHITE)], 0.2, fs=52)
        v = VGroup(*[r.valeurs("240 €") for r in b])
        self.jouer(L3, ["240 euros", "par part"],
                   {0: [*[FadeOut(r.textes) for r in b], LaggedStart(*[FadeIn(x, scale=1.4) for x in v], lag_ratio=0.2)]})
        cadre = SurroundingRectangle(L3, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=5)
        self.play(Create(cadre), Indicate(v, color=AMBRE, scale_factor=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 04 : troisième étape : chacun ses parts ; on vérifie ────────────────
    def ecran_calcul(self):
        self.ecran("04-calcul")
        gens, b = self.duo(valeur="240 €")
        self.add(gens, b)
        L0 = self.lc([("Troisième étape :", JAUNE_TITRE)], 2.95, fs=42)
        L1 = self.lc([("chacun reçoit ses parts.", JAUNE_TITRE)], 2.25, fs=40)
        self.jouer(L0, ["Troisième"])
        self.jouer(L1, ["chacun reçoit"])
        b1, t1 = self.accolade(b[0], "720 €", BLEU_P, fs=32)
        b2, t2 = self.accolade(b[1], "480 €", JAUNE_P, fs=32)
        L2 = self.lc([("Djibril :", BLEU_P), ("3 × 240 =", WHITE), ("720 €", VERT_OK)], 1.35, fs=44)
        self.jouer(L2, ["Djibril", "3 fois", "720"], {1: [Circumscribe(b[0], color=BLEU_P, buff=0.06)],
                                                     2: [GrowFromCenter(b1), FadeIn(t1, scale=1.3)]})
        L3 = self.lc([("Marius :", JAUNE_P), ("2 × 240 =", WHITE), ("480 €", VERT_OK)], 0.55, fs=44)
        self.jouer(L3, ["Marius", "2 fois", "480"], {1: [Circumscribe(b[1], color=JAUNE_P, buff=0.06)],
                                                    2: [GrowFromCenter(b2), FadeIn(t2, scale=1.3)]})
        L4 = self.lc([("On vérifie :", ORANGE_RETENUE)], -0.35, fs=40)
        self.jouer(L4, ["On vérifie"])
        bt = Brace(b, DOWN, color=WHITE, buff=0.08).shift(DOWN * 0.75)
        tt = self.t("1 200 €", 34, VERT_OK).next_to(bt, DOWN, buff=0.08)
        L5 = self.lc([("720 + 480 =", WHITE), ("1 200 €", VERT_OK)], -1.15, fs=48)
        self.jouer(L5, ["720 plus", "égale 1 200"], {1: [GrowFromCenter(bt), FadeIn(tt, scale=1.2)]})
        L6 = self.lc([("Le compte est bon !", VERT_OK)], -1.95, fs=40)
        cadre = SurroundingRectangle(VGroup(L5, L6), color=VERT_OK, buff=0.15, corner_radius=0.1)
        self.jouer(L6, ["Le compte"], {0: [Create(cadre)]})
        self.attendre_voix()

    # ── 05 : QUESTION 1 (90 €, ratio 1 : 2 → 30 € et 60 €) ──────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        bi = billets(3, 1.3).move_to(P(-3.4, 0.4))

        def avant(sc):
            sc.add(bi)

        def apres(sc):
            b = bande([(1, BLEU_P), (2, JAUNE_P)], 1.3, "?", P(-3.6, 0.6), fs=24)
            bb, tb = sc.accolade(b[0], "30 €", BLEU_P, fs=30)
            bj, tj = sc.accolade(b[1], "60 €", JAUNE_P, fs=30)
            l0 = sc.ligne_rep(0, ["1 + 2 =", "3 parts."])
            l1 = sc.ligne_rep(1, ["90 ÷ 3 =", "30 €", "par part."])
            l2 = sc.ligne_rep(2, ["30 €", "pour l'un,"])
            l3 = sc.ligne_rep(3, ["2 × 30 =", "60 €", "pour l'autre."])
            l2.add(*l3)
            v = VGroup(*[r.valeurs("30 €") for r in b])
            sc.montre("1 plus", FadeOut(bi), FadeIn(b, shift=RIGHT * 0.2), FadeIn(l0[0], shift=UP * 0.15), rt=0.4)
            sc.montre("3 parts", FadeIn(l0[1], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.4)
            sc.montre("90 divisé", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("30 euros par", FadeIn(l1[1], shift=UP * 0.15), *[FadeOut(r.textes) for r in b],
                      FadeIn(v, scale=1.4), rt=0.4)
            sc.montre("par part", FadeIn(l1[2], shift=UP * 0.15), rt=0.3)
            sc.montre("30 euros pour", FadeIn(l2[0], shift=UP * 0.15), GrowFromCenter(bb), FadeIn(tb), rt=0.4)
            sc.montre("pour l'un", FadeIn(l2[1], shift=UP * 0.15), rt=0.3)
            sc.montre("2 fois", FadeIn(l2[2], shift=UP * 0.15), rt=0.3)
            sc.montre("60 euros", FadeIn(l2[3], scale=1.3), GrowFromCenter(bj), FadeIn(tj), rt=0.4)
            sc.montre("pour l'autre", FadeIn(l2[4], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["90 €", "partagés selon le ratio 1 : 2.", "Combien pour chacun ?"],
                            [self.t("45 € et 45 €", 34), self.t("30 € et 60 €", 34), self.t("90 € et 180 €", 34)], 1,
                            ["1 + 2 = 3 parts.", "90 ÷ 3 = 30 € par part.", "30 € pour l'un,", "2 × 30 = 60 € pour l'autre."],
                            mot_q="90 euros", avant_q=avant, autres_r=apres)

    # ── 06 : à trois : Inaya, 2 000 € selon 4 : 3 : 3 ──────────────────────
    def ecran_trois(self):
        self.ecran("06-trois")
        rs = [RangeeParts(4, BLEU_P, "?", 1.0, fs=22), RangeeParts(3, JAUNE_P, "?", 1.0, fs=22),
              RangeeParts(3, ROSE_P, "?", 1.0, fs=22)]
        rs, noms = barre_ratio(rs, [("Djibril", BLEU_P), ("Marius", JAUNE_P), ("Inaya", ROSE_P)], -4.6, 1.5, 0.9, 30)
        rows = VGroup(*rs)
        L0 = self.lc([("Et à trois ?", JAUNE_TITRE)], 2.95, fs=44)
        self.jouer(L0, ["Et à trois"])
        inaya = dj(0.6).move_to(P(-4.4, -2.0))
        L1 = self.lc([("Inaya, DJ,", ROSE_P), ("les rejoint.", WHITE)], 2.3, fs=38)
        self.jouer(L1, ["une DJ", "les rejoint"], {0: [FadeIn(inaya, shift=UP * 0.3)]})
        L2 = self.lc([("2 000 €", VERT_OK), ("selon", WHITE), ("4 : 3 : 3", AMBRE)], 1.65, fs=40)
        self.jouer(L2, ["2 000 euros", "selon le", "4 pour"],
                   {2: [FadeIn(noms), *[FadeIn(r, shift=RIGHT * 0.3) for r in rows]]})
        L3 = self.lc([("4 + 3 + 3 =", WHITE), ("10 parts", VERT_OK)], 1.0, fs=40)
        self.jouer(L3, ["4 plus", "10 parts"], {1: [Indicate(rows, color=AMBRE, scale_factor=1.04)]})
        L4 = self.lc([("2 000 ÷ 10 =", WHITE), ("200 €", VERT_OK)], 0.35, fs=40)
        v = VGroup(*[r.valeurs("200 €") for r in rows])
        self.jouer(L4, ["2 000 divisé", "200 euros"],
                   {1: [*[FadeOut(r.textes) for r in rows], LaggedStart(*[FadeIn(x, scale=1.4) for x in v],
                                                                          lag_ratio=0.15)]})
        t8 = self.t("800 €", 30, VERT_OK).next_to(rows[0], RIGHT, buff=0.25)
        L5 = self.lc([("Djibril :", BLEU_P), ("4 × 200 =", WHITE), ("800 €", VERT_OK)], -0.3, fs=40)
        self.jouer(L5, ["Djibril", "4 fois", "800"], {1: [Circumscribe(rows[0], color=BLEU_P, buff=0.06)],
                                                     2: [FadeIn(t8, scale=1.3)]})
        L6 = self.lc([("Marius et Inaya :", WHITE)], -0.95, fs=36)
        self.jouer(L6, ["Marius et"])
        t6 = VGroup(*[self.t("600 €", 30, VERT_OK).next_to(rows[i], RIGHT, buff=0.25) for i in (1, 2)])
        L7 = self.lc([("3 × 200 =", WHITE), ("600 €", VERT_OK), ("chacun.", WHITE)], -1.6, fs=40)
        self.jouer(L7, ["3 fois", "600", "chacun"], {0: [Circumscribe(VGroup(rows[1], rows[2]), color=AMBRE,
                                                                       buff=0.06)],
                                                    1: [FadeIn(t6, scale=1.3)]})
        self.attendre_voix()

    # ── 07 : piège : ÷ 3 puis ÷ 2 (barré) ; on divise par les parts en tout ─
    def ecran_piege(self):
        self.ecran("07-piege")
        T = self.lc([("Attention au piège !", ROUGE_ERREUR)], 2.95, fs=44)
        self.jouer(T, ["Attention"])
        gens, b = self.duo(centre=P(-3.3, 0.4))
        bt, tt = self.accolade(b, "1 200 €", VERT_OK, fs=32)
        L1 = self.lc([("Ratio", WHITE), ("3 : 2", AMBRE)], 2.2, fs=44)
        self.jouer(L1, ["Le ratio", "3 pour"], {1: [FadeIn(gens), FadeIn(b, shift=RIGHT * 0.2)]})
        L2 = self.lc([("1 200 ÷ 3", ROUGE_ERREUR)], 1.4, fs=46)
        self.montre("1 200", GrowFromCenter(bt), FadeIn(tt), rt=0.3)
        self.jouer(L2, ["par 3"], {0: [Indicate(b[0], color=ROUGE_ERREUR, scale_factor=1.05)]})
        L3 = self.lc([("puis", ROUGE_ERREUR), ("÷ 2", ROUGE_ERREUR)], 0.65, fs=46)
        self.jouer(L3, ["puis par", None], {0: [Indicate(b[1], color=ROUGE_ERREUR, scale_factor=1.05)]})
        barres = VGroup(*[Line(L.get_left() + LEFT * 0.1, L.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR,
                               stroke_width=6) for L in (L2, L3)])
        self.play(Create(barres), run_time=0.4)
        L4 = self.lc([("On divise toujours", VERT_OK)], -0.35, fs=40)
        self.jouer(L4, ["On divise"])
        bp = Brace(b, DOWN, color=AMBRE, buff=0.08).shift(DOWN * 0.8)
        tp = sans(self.t("parts en tout", 30, AMBRE)).next_to(bp, DOWN, buff=0.08)
        L5 = self.lc([("le total", VERT_OK), ("÷ le nombre", VERT_OK)], -1.05, fs=40)
        self.jouer(L5, ["le total", "par le nombre"], {0: [Circumscribe(VGroup(bt, tt), color=VERT_OK, buff=0.08)]})
        L6 = self.lc([("de parts en tout.", VERT_OK)], -1.75, fs=40)
        self.jouer(L6, ["de parts en"], {0: [GrowFromCenter(bp), FadeIn(tp)]})
        cadre = SurroundingRectangle(VGroup(L4, L5, L6), color=VERT_OK, buff=0.15, corner_radius=0.1)
        self.play(Create(cadre), Indicate(b, color=AMBRE, scale_factor=1.04), run_time=0.5)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (600 €, ratio 3 : 1 → 450 € pour le premier) ───────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bi = billets(4, 1.3).move_to(P(-3.4, 0.4))

        def avant(sc):
            sc.add(bi)

        def apres(sc):
            b = bande([(3, BLEU_P), (1, JAUNE_P)], 1.25, "?", P(-3.6, 0.6), fs=22)
            bb, tb = sc.accolade(b[0], "450 €", VERT_OK, fs=30)
            l0 = sc.ligne_rep(0, ["3 + 1 =", "4 parts."])
            l1 = sc.ligne_rep(1, ["600 ÷ 4 =", "150 €."])
            l2 = sc.ligne_rep(2, ["Le premier :", "3 × 150 =", "450 €."])
            v = VGroup(*[r.valeurs("150 €") for r in b])
            sc.montre("3 plus", FadeOut(bi), FadeIn(b, shift=RIGHT * 0.2), FadeIn(l0[0], shift=UP * 0.15), rt=0.4)
            sc.montre("4 parts", FadeIn(l0[1], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.4)
            sc.montre("600 divisé", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("150 euros", FadeIn(l1[1], shift=UP * 0.15), *[FadeOut(r.textes) for r in b],
                      FadeIn(v, scale=1.4), rt=0.4)
            sc.montre("Le premier", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.montre("3 fois", FadeIn(l2[1], shift=UP * 0.15), Circumscribe(b[0], color=BLEU_P, buff=0.06), rt=0.4)
            sc.montre("450", FadeIn(l2[2], scale=1.3), GrowFromCenter(bb), FadeIn(tb), rt=0.4)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["600 €", "partagés selon le ratio 3 : 1.", "Combien pour le premier ?"],
                            [self.t("200 €", 34), self.t("450 €", 34), self.t("300 €", 34)], 1,
                            ["3 + 1 = 4 parts.", "600 ÷ 4 = 150 €.", "Le premier : 3 × 150 = 450 €."],
                            mot_q="600 euros", avant_q=avant, autres_r=apres)

    # ── 09 : défi : 1 500 € de tee-shirts, ratio 2 : 3 : 5 ──────────────────
    def rangees_defi(self, valeur="?"):
        """Les trois artistes du défi : un tee-shirt de couleur, puis ses parts."""
        rs, ic = VGroup(), VGroup()
        for i, (n, c) in enumerate(((2, VIOLET_P), (3, VERT_P), (5, ORANGE_P))):
            r = RangeeParts(n, c, valeur, 0.95, fs=22).move_to(P(0, 1.2 - i * 0.95)).align_to(P(-5.4, 0), LEFT)
            rs.add(r)
            ic.add(tee_shirt(c, 0.55).next_to(r, LEFT, buff=0.3))
        return rs, ic

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.montre("À toi de jouer", Write(tit), rt=0.6)
        rs, ic = self.rangees_defi()
        aw = awa(0.55).move_to(P(-4.6, -2.15))
        L0 = self.lc([("Awa partage", VIOLET_P), ("1 500 €", VERT_OK)], 2.1, fs=40)
        self.jouer(L0, ["Awa partage", "1 500"], {0: [FadeIn(aw, shift=UP * 0.3)]})
        L1 = self.lc([("de ventes de tee-shirts", WHITE)], 1.4, fs=36)
        self.jouer(L1, ["de ventes"], {0: [LaggedStart(*[GrowFromCenter(x) for x in ic], lag_ratio=0.2)]})
        L2 = self.lc([("entre trois artistes,", WHITE)], 0.7, fs=36)
        self.jouer(L2, ["entre trois"])
        L3 = self.lc([("ratio", WHITE), ("2 : 3 : 5", AMBRE)], -0.05, fs=44)
        self.jouer(L3, ["selon le ratio", "2 pour"], {1: [*[FadeIn(r, shift=RIGHT * 0.3) for r in rs]]})
        L4 = self.lc([("Combien pour chacun ?", ORANGE_RETENUE)], -0.85, fs=38)
        self.jouer(L4, ["Combien"])
        self.pause_defi(y=-1.7)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.5)
        rs, ic = self.rangees_defi()
        self.add(sans(rs), ic)
        L1 = self.lc([("2 + 3 + 5 =", WHITE), ("10 parts", VERT_OK)], 2.15, fs=42)
        self.jouer(L1, ["2 plus", "10 parts"], {1: [Indicate(rs, color=AMBRE, scale_factor=1.04)]})
        L2 = self.lc([("1 500 ÷ 10 =", WHITE), ("150 €", VERT_OK)], 1.45, fs=42)
        v = VGroup(*[r.valeurs("150 €") for r in rs])
        self.jouer(L2, ["1 500 divisé", "150 euros"],
                   {1: [*[FadeOut(r.textes) for r in rs], LaggedStart(*[FadeIn(x, scale=1.4) for x in v],
                                                                        lag_ratio=0.15)]})
        tots = []
        for i, (k, res, y) in enumerate((("2", "300", 0.75), ("3", "450", 0.05), ("5", "750", -0.65))):
            tr = self.t(f"{res} €", 30, VERT_OK).next_to(rs[i], RIGHT, buff=0.25)
            L = self.lc([(f"{k} × 150 =", WHITE), (f"{res} €", VERT_OK)], y, fs=38)
            self.jouer(L, [f"{k} fois", res], {0: [Circumscribe(rs[i], color=AMBRE, buff=0.06)],
                                               1: [FadeIn(tr, scale=1.3)]})
            tots.append(L)
        L6 = self.lc([("300 + 450 + 750", WHITE)], -1.45, fs=38, droite=4.9)
        L7 = self.lc([("= 1 500 €", VERT_OK)], -2.1, fs=40)
        self.jouer(L6, ["Et 300"])
        self.jouer(L7, ["égale 1 500"])
        cadre = SurroundingRectangle(VGroup(L6, L7), color=VERT_OK, buff=0.15, corner_radius=0.1, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        b = bande([(3, BLEU_P), (2, JAUNE_P)], 0.85, "240 €", P(-3.6, 0.4), fs=22)
        br = Brace(b, DOWN, color=WHITE, buff=0.08)
        tt = sans(self.t("1 200 €", 32, VERT_OK)).next_to(br, DOWN, buff=0.08)
        lab = sans(self.t("3 : 2", 44, AMBRE)).next_to(b, UP, buff=0.3)
        fig = VGroup(lab, b, br, tt)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On compte les parts", "en tout."),
            ("On divise le total :", "la valeur d'une part."),
            ("Chacun reçoit ses parts.",),
            ("On vérifie : la somme", "redonne le total.")], fs=36)
        self.au_mot("on compte")
        self.montrer_ligne(lignes[0], Indicate(b, color=AMBRE, scale_factor=1.04))
        self.au_mot("on divise")
        self.montrer_ligne(lignes[1], Indicate(b[0].blocs[0], color=AMBRE))
        self.au_mot("puis chacun")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et on vérifie")
        self.montrer_ligne(lignes[3], Indicate(tt, color=VERT_OK))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_parts()
        self.ecran_part()
        self.ecran_calcul()
        self.ecran_question1()
        self.ecran_trois()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropRatioPartager4e(PropRatioPartagerBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
