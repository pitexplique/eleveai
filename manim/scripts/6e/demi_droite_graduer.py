# demi_droite_graduer.py
# EleveAI — Maths 6e — série « Repérer sur une demi-droite graduée », épisode 04 :
# GRADUER UNE DEMI-DROITE / UN SEGMENT (micro du coach : abscisse_graduer, notion
# demi_droite_graduee). Paysage 16:9, CEINTURE ORANGE (brief : « Graduer :
# orange »), AVEC VOIX. PAYSAGE SEULEMENT : le short existe déjà
# (demi_droite_graduee_short.py, voix 6e-demi-droite-short-graduer).
#
# ⭐ Le geste du SAUT (flèche courbe d'un trait au suivant) est repris de la
# paysage de notion demi_droite_graduee.py : ici, on le FABRIQUE avec la règle.
# ⭐ Micro → écrans (banque demi-droite.bank.ts, genGraduer) :
#   choisir l'unité (03 : 12 cm pour 1) · le pas = longueur ÷ nombre de parts
#   (04 : 12 ÷ 4 = 3 cm) · reporter le pas à la règle, sauts TOUS ÉGAUX (05) ·
#   écrire les nombres sous les traits (06 : 1/4, 2/4, 3/4, 1) · QUESTION 1
#   (07 : traits à l'intérieur = parts − 1 ; leurres 4 et 5) · le piège des
#   sauts INÉGAUX (08 : 2, 5, 2, 3 cm) · une demi-droite continue (09 : 2 cm
#   pour 1, de 0 à 5, la flèche) · QUESTION 2 (10 : 3/5 sur 10 cm → 6 cm ;
#   leurres 3 cm = « le pas vaut 1 », 5 cm) · défi (11 : 8 cm en quarts → 2 cm,
#   3/4 à 6 cm) et correction · ce que tu as appris (12) · fin (13).
# Vérifié (Python) : 12 ÷ 4 = 3 ; 2 + 5 + 2 + 3 = 12 ; 10 ÷ 5 = 2 ; 3 × 2 = 6 ;
# 8 ÷ 4 = 2 ; 3 × 2 = 6 ; 5 × 2 = 10.
#
# Décor et métier : JEU VIDÉO, Inès, GAME DESIGNER (une fille) : la barre de vie
# du héros, la barre des niveaux, la barre du bouclier. Centre : jeux-video.
# Aucun chiffre du monde réel cité : pas de source à donner.
#
# Voix : manim/voix/6e-demi-droite-graduer.json (écrite le 03/11, débit −10),
# WAV dans public/sons/6e-demi-droite-graduer/ ; marques mot à mot :
# manim/scripts/6e/demi_droite_graduer_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py).
# Outils : prop_commun.py (PaysageProp : synchro, AUDIT, question_pause,
# finale_colonne, page_abonnement) et canvas_fractions.Droite, NON modifiés.
# Ajouté ICI : barre de jeu, règle posée AU-DESSUS de la barre, saut, cœur,
# bouclier, Inès ; dit() (une ligne qui porte une fraction attend son MOT, pas
# les chiffres « 3 » ou « 5 » des choix) ; fraction() sans audit.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/demi_droite_graduer.py DemiDroiteGraduer6e
# python -m manim render -qh --disable_caching manim/scripts/6e/demi_droite_graduer.py DemiDroiteGraduer6e -o eleveai-maths-6e-demi-droite-graduer --media_dir manim/scripts/6e/media-demi-droite-04
# Sortie : manim/sorties/6e/maths/demi-droite-graduee/04-graduer/eleveai-maths-6e-demi-droite-graduer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_triangles import FinTriangles  # noqa: E402  (fin du 05/11 : pouce, commentaire, cloche)

VERT_VIE = "#22c55e"
BLEU_XP = "#38bdf8"
BLEU_BOUCLIER = "#3b82f6"
BOIS = "#E9C46A"
CM = 0.8          # 1 cm de la vidéo = 0,8 unité Manim (la barre de 12 cm fait 9,6)


def _ligne_de_base(t):
    """La ligne de base d'un Text : le bas médian de ses lettres et chiffres
    sans jambage (g, j, p, q, y descendent sous la ligne) ; None s'il n'en a
    pas (« = », « → » restent centrés)."""
    cars = [c for c in getattr(t, "original_text", "") if not c.isspace()]
    if not isinstance(t, Text) or len(cars) != len(t.submobjects):
        return None
    ys = sorted(m.get_bottom()[1] for c, m in zip(cars, t.submobjects) if c.isalnum() and c not in "gjpqyçQJ")
    return ys[len(ys) // 2] if ys else None


def aligner_bases(lg):
    """Les morceaux d'une ligne posés sur la MÊME ligne de base (arrange(RIGHT)
    centre les hauteurs : « L'unité » descendait sous « = la longueur »)."""
    bases = [_ligne_de_base(m) for m in lg]
    ref = next((b for b in bases if b is not None), None)
    if ref is None:
        return lg
    for m, b in zip(lg, bases):
        if b is not None:
            m.shift(UP * (ref - b))
    return lg


def muet(m):
    """Ni attente de la synchro, ni audit (décor, ou nombre déjà dit et redit)."""
    for f in m.get_family():
        f.sans_synchro = True
        f._pas_audit = True
    return m


def dit(t, mots):
    """Une ligne qui porte une fraction (« 3/5 ») attend le MOT `mots` de la
    voix (« trait »), pas les chiffres 3 et 5 que la voix dit ailleurs ; l'audit
    ne cherche plus ses chiffres (la fraction se dit en lettres)."""
    t.original_text = mots
    return t


def fraction(n, d, fs=36, couleur=WHITE):
    return muet(EcritureFraction(n, d, fs=fs, couleur=couleur))


def coeur(s=1.0, couleur="#ef4444"):
    """Le cœur de la barre de vie."""
    g = VGroup(Circle(radius=0.15).move_to(P(-0.13, 0.06)), Circle(radius=0.15).move_to(P(0.13, 0.06)),
               Polygon(P(-0.27, 0.0), P(0.27, 0.0), P(0, -0.3)))
    return g.set_fill(couleur, 1).set_stroke(width=0).scale(s)


def bouclier(s=1.0, couleur=BLEU_BOUCLIER):
    ecu = Polygon(P(-0.3, 0.32), P(0.3, 0.32), P(0.3, 0.04), P(0, -0.38), P(-0.3, 0.04), fill_color=couleur,
                  fill_opacity=1, stroke_color="#facc15", stroke_width=4)
    return VGroup(ecu, Star(5, outer_radius=0.12, fill_color="#facc15", fill_opacity=1,
                            stroke_width=0).move_to(P(0, 0.04))).scale(s)


def etoile_xp(s=1.0):
    return Star(5, outer_radius=0.27, fill_color="#facc15", fill_opacity=1, stroke_width=0).scale(s)


def ines(s=1.0):
    """Inès, game designer : cheveux longs, sweat turquoise, une tablette et son stylet."""
    p = personne(peau="#c68642", tenue="#0d9488", cheveux="#3b1d0e", longs=True, s=s)
    tab = RoundedRectangle(width=0.7 * s, height=0.5 * s, corner_radius=0.06 * s, fill_color="#1e293b",
                           fill_opacity=1, stroke_color="#e2e8f0", stroke_width=3)
    tab.move_to(p.corps.get_center() + P(0.35 * s, 0.05 * s))
    ecr = Rectangle(width=0.55 * s, height=0.36 * s, fill_color="#38bdf8", fill_opacity=0.8,
                    stroke_width=0).move_to(tab)
    stylet = Line(tab.get_corner(UR) + P(-0.05, -0.05), tab.get_corner(UR) + P(0.25 * s, 0.3 * s),
                  color="#facc15", stroke_width=5)
    p.add(tab, ecr, stylet)
    return p


def heros(s=1.0):
    """Le héros du jeu : un petit chevalier (casque, épée)."""
    corps = RoundedRectangle(width=0.5, height=0.6, corner_radius=0.1, fill_color="#6366f1", fill_opacity=1,
                             stroke_width=0)
    tete = Circle(radius=0.2, fill_color="#f1c27d", fill_opacity=1, stroke_width=0).next_to(corps, UP, buff=0.02)
    casque = Sector(radius=0.23, angle=PI, start_angle=0, fill_color="#94a3b8", fill_opacity=1,
                    stroke_width=0).move_to(tete.get_center() + UP * 0.1)
    lame = Line(corps.get_right() + P(0.05, -0.05), corps.get_right() + P(0.45, 0.45), color="#e2e8f0",
                stroke_width=6)
    return VGroup(corps, tete, casque, lame).scale(s)


def gluant(s=1.0):
    """Le monstre : une goutte verte avec deux yeux."""
    corps = Ellipse(width=0.8, height=0.55, fill_color="#84cc16", fill_opacity=1, stroke_width=0)
    yeux = VGroup(*[Dot(P(x, 0.06), radius=0.06, color=BLACK) for x in (-0.14, 0.14)])
    return VGroup(corps, yeux).scale(s)


# ── la barre du jeu, sa règle, ses sauts ────────────────────────────────────

class Barre(VGroup):
    """Une barre de jeu de `n_cm` centimètres (1 cm = `cm` unités), son bord
    gauche en x0, son centre à la hauteur y. .x(c) : l'abscisse du trait à c cm.
    Gestes renvoyés (NON ajoutés) : trait(c), saut(c1, c2, txt), sous(c, mob),
    regle(), mesure(txt)."""

    def __init__(self, n_cm, cm=CM, x0=-5.0, y=0.55, h=0.5, couleur=VERT_VIE, **kw):
        super().__init__(**kw)
        self.n_cm, self.cm, self.x0, self.yc, self.h = n_cm, cm, x0, y, h
        L = n_cm * cm
        self.cadre = RoundedRectangle(width=L, height=h, corner_radius=h * 0.3, stroke_color=WHITE, stroke_width=4,
                                      fill_color="#111827", fill_opacity=1).move_to(P(x0 + L / 2, y))
        self.jauge = RoundedRectangle(width=L - 0.12, height=max(h - 0.12, h * 0.6), corner_radius=h * 0.25, fill_color=couleur,
                                      fill_opacity=0.85, stroke_width=0).move_to(self.cadre)
        self.add(self.cadre, self.jauge)

    def x(self, c):
        return self.x0 + c * self.cm

    @property
    def haut(self):
        return self.yc + self.h / 2

    @property
    def bas(self):
        return self.yc - self.h / 2

    def trait(self, c, couleur=WHITE, sw=6, d=0.18):
        return Line(P(self.x(c), self.bas - d), P(self.x(c), self.haut + d), color=couleur, stroke_width=sw)

    def saut(self, c1, c2, txt=None, base=None, couleur=ORANGE_RETENUE, fs=26, angle=-PI / 2):
        """LE geste : une flèche courbe d'un trait au suivant (au-dessus de la barre)."""
        y = (self.haut + 0.25) if base is None else base
        arc = ArcBetweenPoints(P(self.x(c1), y), P(self.x(c2), y), angle=angle, color=couleur, stroke_width=4)
        arc.add_tip(tip_length=0.16, tip_width=0.16)
        g = VGroup(arc)
        if txt:
            g.add(Text(txt, font_size=fs, color=couleur).next_to(arc, UP, buff=0.06))
        return g

    def sous(self, c, mob, buff=0.14):
        return mob.next_to(P(self.x(c), self.bas - 0.18), DOWN, buff=buff)

    def regle(self, fs=20, hauteur=0.72):
        """La règle en bois posée AU-DESSUS de la barre : ses traits partent de
        son bord du bas (contre la barre), ses nombres au-dessus (décor muet)."""
        L = self.n_cm * self.cm
        y_bas = self.haut + 0.04
        corps = Rectangle(width=L + 0.6, height=hauteur, stroke_color=BOIS, stroke_width=2, fill_color=BOIS,
                          fill_opacity=0.22).move_to(P(self.x0 + L / 2, y_bas + hauteur / 2))
        traits, nums = VGroup(), VGroup()
        for k in range(2 * self.n_cm + 1):
            x = self.x0 + k * self.cm / 2
            traits.add(Line(P(x, y_bas), P(x, y_bas + (0.28 if k % 2 == 0 else 0.15)), color=BOIS, stroke_width=2))
            if k % 2 == 0:
                nums.add(Text(str(k // 2), font_size=fs, color=BOIS).move_to(P(x, y_bas + 0.47)))
        g = muet(VGroup(corps, traits, nums))
        g.nums = nums
        return g

    def mesure(self, txt, y=None, fs=32, couleur=WHITE):
        """La double flèche de toute la longueur, au-dessus, et sa longueur écrite."""
        y = self.haut + 0.35 if y is None else y
        fl = DoubleArrow(P(self.x(0), y), P(self.x(self.n_cm), y), buff=0, color=couleur, stroke_width=3,
                         tip_length=0.18, max_tip_length_to_length_ratio=0.2)
        return VGroup(fl, Text(txt, font_size=fs, color=couleur).next_to(fl, UP, buff=0.1))


def bout(b, c, s, fs=34, couleur=WHITE):
    """Le nombre d'un bout (« 0 », « 1 ») sous la barre ; le 0 en rouge comme le coach."""
    return b.sous(c, Text(s, font_size=fs, color=ROUGE_ZERO if s == "0" else couleur))


class DemiDroiteGraduerBase(FinTriangles, PaysageProp):
    nom_voix = "6e-demi-droite-graduer"
    fichier_marques = "demi_droite_graduer_marques.json"

    def ligne(self, morceaux, fs=40, buff=0.2):
        """Celle du lot C, morceaux posés sur une même ligne de base."""
        return aligner_bases(super().ligne(morceaux, fs, buff))

    def barre12(self):
        return Barre(12)

    # ── 00 : page de garde (titre, question, échelle des ceintures) ─────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Graduer une demi-droite", self.identite, self.ceinture, y_ech=-2.45)
        muet(ident)  # « Maths 6e — EleveAI » : le 6 n'est pas dit
        self.au_mot("Graduer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        b = Barre(12, cm=0.6, x0=-4.2, y=0.95, h=0.45)
        traits = VGroup(b.trait(0), b.trait(12))
        q = muet(VGroup(*[Text("?", font_size=40, color=ORANGE_RETENUE).move_to(P(b.x(k), b.haut + 0.4))
                          for k in (3, 6, 9)]))
        self.au_mot("demi-droite")
        self.play(FadeIn(b, shift=RIGHT * 0.2), Create(traits), run_time=0.6)
        self.au_mot("Comment")
        l = self.bloc(["Comment tracer des traits", "tous à la même distance ?"], 40, BLEU_CALCUL, buff=0.12)
        l.arrange(DOWN, buff=0.12).move_to(P(-0.6, -0.5))
        self.play(FadeIn(l[0], shift=UP * 0.15), LaggedStart(*[FadeIn(x, scale=1.5) for x in q], lag_ratio=0.25),
                  run_time=0.9)
        self.au_mot("tous")
        self.play(FadeIn(l[1], shift=UP * 0.15), run_time=0.4)
        self.play(LaggedStart(*[Indicate(x, color=AMBRE, scale_factor=1.5) for x in q], lag_ratio=0.25),
                  run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 01 : Inès, game designer ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation", 0.65)
        pers = ines(0.95).move_to(P(-4.85, 0.3))
        nom = self.t("Inès", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.au_mot("Inès")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.7)
        self.au_mot("game designer")
        met = self.t("game designer", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        self.au_mot("jeux vidéo")
        ecr = RoundedRectangle(width=7.0, height=3.9, corner_radius=0.2, fill_color="#1e1b4b", fill_opacity=1,
                               stroke_color="#a78bfa", stroke_width=5).move_to(P(1.75, 0.4))
        sol = Line(P(ecr.get_left()[0] + 0.3, -1.2), P(ecr.get_right()[0] - 0.3, -1.2), color="#a78bfa",
                   stroke_width=4)
        hero = heros(1.0).move_to(P(0.0, -0.75))
        monstre = gluant(1.0).move_to(P(3.6, -0.95))
        self.play(FadeIn(ecr, scale=0.9), Create(sol), FadeIn(hero, shift=RIGHT * 0.3),
                  FadeIn(monstre, shift=LEFT * 0.3), run_time=0.7)
        self.au_mot("barre de vie")
        b = Barre(12, cm=0.42, x0=-0.85, y=1.35, h=0.42)
        c = coeur(1.0).move_to(P(-1.3, 1.35))
        self.play(FadeIn(c, scale=1.5), FadeIn(b, shift=RIGHT * 0.2), run_time=0.6)
        self.insister(c, 1.4, 0.2)
        self.au_mot("en quarts")
        q = VGroup(*[Text("?", font_size=34, color=ORANGE_RETENUE).move_to(P(b.x(k), b.haut + 0.32))
                     for k in (3, 6, 9)])
        fr = fraction(1, 4, 40, ORANGE_RETENUE)
        lq = VGroup(self.t("en quarts :", 34, ORANGE_RETENUE), fr).arrange(RIGHT, buff=0.2)
        lq.move_to(P(1.75, 0.55))
        self.play(FadeIn(lq, shift=UP * 0.15), LaggedStart(*[FadeIn(x, scale=1.5) for x in q], lag_ratio=0.25),
                  run_time=0.7)
        self.au_mot("Où tracer")
        ou = self.t("Où tracer les traits ?", 36, ORANGE_RETENUE).move_to(P(1.75, 0.55))
        self.play(FadeOut(lq), FadeIn(ou, scale=0.8), run_time=0.45)
        self.play(LaggedStart(*[Indicate(x, color=AMBRE, scale_factor=1.6) for x in q], lag_ratio=0.25),
                  run_time=0.9)
        self.attendre_voix()

    # ── 02 : ce que tu vas apprendre (une phrase) ───────────────────────────
    def ecran_apprendre(self):
        self.ecran("02-apprendre")
        tit = self.t("Ce que tu vas apprendre", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Dans cette")
        self.play(Write(tit), run_time=0.6)
        b = Barre(12, cm=0.6, x0=-3.6, y=-1.9, h=0.45)
        items = [("choisir l'unité", "Choisir l'unité"), ("trouver le pas", "Trouver le pas"),
                 ("faire des sauts", "Faire des sauts tous égaux")]
        lignes = VGroup()
        for i, (_, s) in enumerate(items):
            lignes.add(self.ligne([(f"{i + 1}.", BLEU_CALCUL), (s, WHITE)], 38, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to(P(-0.6, 0.75))
        for k in (1, 2):  # même écart entre les lignes de base (jambages et accents ne comptent pas)
            lignes[k].shift(UP * (_ligne_de_base(lignes[0][1]) - 0.95 * k - _ligne_de_base(lignes[k][1])))
        lignes.move_to(P(-0.6, 0.75))
        for k in range(3):
            lignes[k][0].sans_synchro = lignes[k][0]._pas_audit = True  # la numérotation « 1. »
        for (mot, _), lg in zip(items, lignes):
            self.au_mot(mot)
            anims = [FadeIn(lg, shift=RIGHT * 0.25)]
            if mot == "choisir l'unité":
                anims += [FadeIn(b, shift=UP * 0.2), FadeIn(muet(bout(b, 0, "0", 30))), FadeIn(muet(bout(b, 12, "1", 30)))]
            if mot == "faire des sauts":
                anims.append(LaggedStart(*[Create(b.saut(3 * k, 3 * k + 3)) for k in range(4)], lag_ratio=0.25))
            self.play(*anims, run_time=0.8 if len(anims) > 1 else 0.45)
        self.attendre_voix()

    # ── outils de l'épisode ─────────────────────────────────────────────────
    def au_mot(self, extrait, n=1):
        """Celui de la base, plus 0,08 s : jamais une image d'avance sur le mot."""
        super().au_mot(extrait, n)
        self.wait(0.08)

    def titre_haut(self, s, couleur=JAUNE_TITRE, fs=44, x=-0.2):
        t = muet(self.t(s, fs, couleur).move_to(P(x, 3.15)))  # un titre n'attend pas ses mots
        self.play(Write(t), run_time=0.5)
        return t

    def fig_base(self, b, internes=(), couleur_int=ORANGE_RETENUE):
        """La barre déjà posée : cœur, traits des bouts (et ceux de `internes`),
        0 et 1 dessous. Tout est MUET : déjà dit à l'écran d'avant."""
        g = VGroup(coeur(1.3).move_to(P(b.x0 - 0.55, b.yc)), b, b.trait(0), b.trait(b.n_cm),
                   *[b.trait(c, couleur_int) for c in internes], bout(b, 0, "0"), bout(b, b.n_cm, "1"))
        return muet(g)

    def calc_ici(self, morceaux, pos, fs=44, avec=()):
        """Une ligne de calcul posée en `pos`, chaque morceau à son mot."""
        lg = self.ligne(morceaux, fs).move_to(pos)
        self._par_lots(list(lg.submobjects), lambda m: FadeIn(m, shift=RIGHT * 0.2), 0.3, avec=avec)
        return lg

    # ── 03 : l'unité (12 cm pour 1) ─────────────────────────────────────────
    def ecran_unite(self):
        self.ecran("03-unite")
        b = self.barre12()
        c = coeur(1.3).move_to(P(b.x0 - 0.55, b.yc))
        l1 = self.ligne([("L'unité", BLEU_CALCUL), ("= la longueur qui vaut 1", WHITE)], 40).move_to(P(-0.6, -1.55))
        self.au_mot("l'unité")
        tit = muet(self.t("L'unité", 44, JAUNE_TITRE).move_to(P(-0.2, 3.15)))
        self.play(Write(tit), FadeIn(c, scale=1.4), FadeIn(b, shift=RIGHT * 0.2), FadeIn(l1[0], shift=UP * 0.15),
                  run_time=0.5)
        self.au_mot("la longueur qui vaut 1")
        self.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.5)
        self.au_mot("12 centimètres")
        m = b.mesure("12 cm", fs=36)
        self.play(GrowFromCenter(m[0]), FadeIn(m[1], scale=1.3), run_time=0.6)
        self.insister(m[1], 1.3, 0.2)
        self.au_mot("elle écrit 0")
        t0, z = b.trait(0), bout(b, 0, "0")
        self.play(Create(t0), FadeIn(z, shift=UP * 0.2), run_time=0.45)
        self.au_mot("elle écrit 1")
        t1, u = b.trait(12), bout(b, 12, "1")
        self.play(Create(t1), FadeIn(u, shift=UP * 0.2), run_time=0.45)
        self.play(Indicate(u, color=VERT_OK, scale_factor=1.6), Indicate(m[0], color=VERT_OK), run_time=0.7)
        self.attendre_voix()

    # ── 04 : le pas (12 ÷ 4 = 3 cm) ─────────────────────────────────────────
    def ecran_pas(self):
        self.ecran("04-pas")
        b = self.barre12()
        m = muet(b.mesure("12 cm", fs=36))
        self.add(self.fig_base(b), m)
        self.au_mot("En quarts")
        self.titre_haut("Le pas")
        l1 = self.ligne([("En quarts", VIOLET_ACCENT), ("→", WHITE), ("4 parts égales", WHITE)], 40)
        l1.move_to(P(-0.6, -1.5))
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("4 parts")
        self.play(FadeIn(l1[1]), FadeIn(l1[2], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("12 divisé")
        lg = self.calc_ici([("12 ÷", WHITE), ("4", WHITE), ("=", WHITE), ("3", VERT_OK)], P(-0.6, -2.45), fs=48)
        self.insister(lg[3], 1.4, 0.2)
        self.au_mot("Un saut mesure")
        s = b.saut(0, 3, "3 cm", fs=30)
        self.play(FadeOut(m), Create(s[0]), run_time=0.6)
        self.au_mot("3 centimètres")
        self.play(FadeIn(s[1], scale=1.3), run_time=0.35)
        self.au_mot("c'est le pas")
        pas = self.t("= le pas", 34, ORANGE_RETENUE).next_to(s[1], RIGHT, buff=0.2)
        self.play(FadeIn(pas, shift=LEFT * 0.2), run_time=0.4)
        self.insister(VGroup(s[1], pas), 1.25, 0.2)
        self.attendre_voix()

    # ── 05 : reporter le pas à la règle ─────────────────────────────────────
    def base_regle(self, b):
        return b.haut + 0.04 + 0.72 + 0.1

    def ecran_reporter(self):
        self.ecran("05-reporter")
        b = self.barre12()
        self.add(self.fig_base(b))
        self.titre_haut("Je reporte le pas")
        rg = b.regle()
        self.au_mot("la règle")
        self.play(FadeIn(rg, shift=DOWN * 0.3), run_time=0.6)
        self.au_mot("Je pars de 0")
        self.play(Indicate(rg.nums[0], color=AMBRE, scale_factor=2.0), run_time=0.6)
        y = self.base_regle(b)
        sauts = VGroup()
        for c, mot in ((3, "à 3 centimètres"), (6, "à 6"), (9, "à 9"), (12, "à 12")):
            s = b.saut(c - 3, c, "3 cm", base=y, fs=26)
            if c > 3:
                muet(s)  # « 3 cm » redit par le dessin : la longueur du pas, dite au premier saut
            self.au_mot(mot)
            anims = [Create(s[0]), FadeIn(s[1]), Indicate(rg.nums[c], color=AMBRE, scale_factor=2.0)]
            if c < 12:
                anims.append(Create(b.trait(c, ORANGE_RETENUE)))
            self.play(*anims, run_time=0.55)
            sauts.add(s)
        self.au_mot("Chaque saut")
        self.play(LaggedStart(*[Indicate(s, color=VERT_OK, scale_factor=1.15) for s in sauts], lag_ratio=0.25),
                  run_time=1.1)
        self.au_mot("tous les sauts sont égaux")
        ok = self.t("Tous les sauts sont égaux !", 40, VERT_OK).move_to(P(-0.6, -1.7))
        self.play(FadeIn(ok, scale=0.8), run_time=0.45)
        self.play(Create(self.encadrer(ok)), run_time=0.4)
        self.attendre_voix()

    # ── 06 : écrire les nombres sous les traits ─────────────────────────────
    def sauts_bas(self, b, couleur=ORANGE_RETENUE):
        return muet(VGroup(*[b.saut(3 * k, 3 * k + 3, "3 cm", fs=24, couleur=couleur) for k in range(4)]))

    def quarts(self, b, fs=36, couleur=VIOLET_ACCENT):
        return VGroup(*[b.sous(3 * k, fraction(k, 4, fs, couleur)) for k in (1, 2, 3)])

    def ecran_ecrire(self):
        self.ecran("06-ecrire")
        b = self.barre12()
        fig = self.fig_base(b, internes=(3, 6, 9))
        rg = b.regle()
        y = self.base_regle(b)
        hauts = muet(VGroup(*[b.saut(3 * k, 3 * k + 3, "3 cm", base=y, fs=26) for k in range(4)]))
        tit = self.t("J'écris les nombres", 44, JAUNE_TITRE).move_to(P(-0.2, 3.15))
        self.add(fig, rg, hauts)
        self.au_mot("J'enlève")
        bas = self.sauts_bas(b)
        self.play(FadeOut(rg, shift=UP * 0.3), Transform(hauts, bas), run_time=0.8)
        self.au_mot("j'écris les nombres")
        self.play(Write(tit), run_time=0.5)
        fr = self.quarts(b)
        moitie = self.t("la moitié", 26, AMBRE).next_to(fr[1], DOWN, buff=0.15)
        for k, (m1, m2) in enumerate((("Un saut", "un quart"), ("Deux sauts", "deux quarts"),
                                      ("Trois sauts", "trois quarts"))):
            self.au_mot(m1)
            self.play(LaggedStart(*[Indicate(hauts[j], color=AMBRE, scale_factor=1.2) for j in range(k + 1)],
                                  lag_ratio=0.2), run_time=0.5)
            self.au_mot(m2)
            self.play(FadeIn(fr[k], scale=1.4), run_time=0.4)
            if k == 1:
                self.au_mot("la moitié")
                self.play(FadeIn(moitie, shift=UP * 0.15), run_time=0.35)
        self.au_mot("Quatre sauts")
        self.play(LaggedStart(*[Indicate(h, color=AMBRE, scale_factor=1.2) for h in hauts], lag_ratio=0.15),
                  run_time=0.7)
        self.au_mot("on arrive à 1")
        un = fig[-1]
        self.play(un.animate.set_color(VERT_OK), run_time=0.3)
        self.insister(un, 1.6, 0.25)
        self.attendre_voix()

    # ── les questions : une ligne qui porte une fraction attend son MOT ─────
    DITS = {"est le trait 3/5 ?": "est le trait", "Où écrire 3/4 ?": "écrit-elle"}

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for t in list(q) + list(ph):
            if t.original_text in self.DITS:
                dit(t, self.DITS[t.original_text])
        return tete, q, cartes, pause, rebours, ph

    def montrer(self, sc, i, *autres):
        """Dans autres_r : la ligne i de la réponse, chaque nombre à son mot
        (play la recoupe), avec un geste sur la figure."""
        sc.play(FadeIn(sc.ph_q[i], shift=UP * 0.15), *autres, run_time=0.35)

    # ── 07 : QUESTION 1 (combien de traits à l'intérieur ?) ─────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = Barre(12, cm=0.45, x0=-5.6, y=0.5, h=0.45)
        fig = muet(VGroup(coeur(0.9).move_to(P(b.x0 - 0.42, b.yc)), b, b.trait(0), b.trait(12),
                          bout(b, 0, "0", 30), bout(b, 12, "1", 30)))
        self.add(fig)
        traits = VGroup(*[b.trait(c, ORANGE_RETENUE) for c in (3, 6, 9)])
        couleurs = [BLEU_CALCUL, VIOLET_ACCENT, BLEU_CALCUL, VIOLET_ACCENT]
        parts = VGroup(*[Line(P(b.x(3 * k) + 0.05, b.bas - 0.85), P(b.x(3 * k + 3) - 0.05, b.bas - 0.85),
                              color=couleurs[k], stroke_width=10) for k in range(4)])
        nums = muet(VGroup(*[Text(str(k + 1), font_size=28, color=couleurs[k]).move_to(
            P((b.x(3 * k) + b.x(3 * k + 3)) / 2, b.bas - 1.15)) for k in range(4)]))

        def apres(sc):
            sc.play(LaggedStart(*[Create(t) for t in traits], lag_ratio=0.3), run_time=0.5)
            sc.au_mot("Les deux bouts")
            self.montrer(sc, 0, Indicate(fig[2], color=AMBRE, scale_factor=1.5),
                         Indicate(fig[3], color=AMBRE, scale_factor=1.5))
            sc.au_mot("4 parts")
            self.montrer(sc, 1, LaggedStart(*[Create(p) for p in parts], lag_ratio=0.2),
                         LaggedStart(*[FadeIn(n) for n in nums], lag_ratio=0.2))
            sc.au_mot("à l'intérieur.")
            self.montrer(sc, 2, LaggedStart(*[Indicate(t, color=ORANGE_RETENUE, scale_factor=1.4) for t in traits],
                                            lag_ratio=0.25))
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Barre en 4 parts égales :", "combien de traits à l'intérieur ?"],
                            [self.t("4 traits", 34), self.t("3 traits", 34), self.t("5 traits", 34)], 1,
                            ["Les deux bouts sont déjà là :",
                             "4 parts, mais 3 traits", "à l'intérieur."], mot_q="la barre", autres_r=apres)

    # ── 08 : le piège : des sauts INÉGAUX ───────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.au_mot("Attention")
        self.titre_haut("Attention au piège !", ROUGE_ERREUR)
        b = self.barre12()
        faux = [2, 7, 9]
        fig = muet(VGroup(coeur(1.3).move_to(P(b.x0 - 0.55, b.yc)), b, b.trait(0), b.trait(12),
                          *[b.trait(c) for c in faux], bout(b, 0, "0"), bout(b, 12, "1"),
                          *[b.sous(c, fraction(k + 1, 4, 36, VIOLET_ACCENT)) for k, c in enumerate(faux)]))
        self.au_mot("Un stagiaire")
        self.play(FadeIn(fig, shift=UP * 0.2), run_time=0.7)
        bornes = [0, 2, 7, 9, 12]
        for k, mot in enumerate(("2 centimètres", "puis 5", "puis 2", "puis 3")):
            c1, c2 = bornes[k], bornes[k + 1]
            s = b.saut(c1, c2, f"{c2 - c1} cm", couleur=ROUGE_ERREUR if k % 2 else ORANGE_RETENUE, fs=26)
            self.au_mot(mot)
            self.play(Create(s[0]), FadeIn(s[1], scale=1.3), run_time=0.5)
        self.au_mot("Les sauts ne")
        l1 = self.t("Les sauts ne sont pas égaux :", 38).move_to(P(-1.6, -1.65))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("c'est faux")
        tp = self.tampon("FAUX !", ROUGE_ERREUR, 40).next_to(l1, RIGHT, buff=0.4)
        self.play(FadeIn(tp, scale=1.3), run_time=0.4)
        self.au_mot("Son trait un quart")
        q_faux = fig[-3]
        l2 = self.ligne([("Un quart :", VERT_OK), ("à 3 cm.", VERT_OK)], 38).move_to(P(-1.6, -2.65))
        self.play(q_faux.animate.set_opacity(0.4), Create(croix(q_faux, sw=5)), FadeIn(l2[0], shift=UP * 0.15),
                  run_time=0.4)
        self.au_mot("à 3 centimètres")
        bon = DashedLine(P(b.x(3), b.bas - 0.18), P(b.x(3), b.haut + 0.18), color=VERT_OK, stroke_width=6)
        q_bon = b.sous(3, fraction(1, 4, 36, VERT_OK))
        self.play(Create(bon), FadeIn(q_bon, scale=1.3), FadeIn(l2[1], shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 09 : une demi-droite continue (2 cm pour 1, de 0 à 5) ───────────────
    def ecran_demi_droite(self):
        self.ecran("09-demi-droite")
        self.au_mot("Une demi-droite")
        self.titre_haut("La demi-droite continue")
        dr = Droite(0, 5, 5, etiquettes={k: str(k) for k in range(6)}, longueur=8.0, centre=P(-0.55, 0.45), fs=34)
        self.au_mot("continue après 1")
        self.play(FadeIn(dr.carte), GrowArrow(dr.axe), run_time=0.7)
        self.au_mot("la barre des niveaux")
        et = etoile_xp(1.0).move_to(P(dr.carte.get_left()[0] - 0.45, dr.p(0)[1]))
        self.play(FadeIn(et, scale=1.6), run_time=0.4)
        self.au_mot("2 centimètres pour 1")
        u = self.ligne([("Unité :", BLEU_CALCUL), ("2 cm pour 1", WHITE)], 40).move_to(P(-0.6, -1.75))
        self.play(FadeIn(u, shift=UP * 0.15), run_time=0.45)
        self.au_mot("0. Je")
        o = Dot(dr.p(0), radius=0.12, color=ROUGE_ZERO)
        lo = texte("origine", 26, color=ROUGE_ZERO).next_to(dr.p(0) + UP * 0.25, UP, buff=0.1)
        lo.align_to(P(dr.p(0)[0] - 0.15, 0), LEFT)  # dans la carte, pas sur son bord
        lo.sans_synchro = True
        self.play(Create(dr.ticks[0]), FadeIn(o, scale=1.5), FadeIn(lo), FadeIn(dr.etiquettes[0], scale=1.3),
                  run_time=0.5)

        def saut(k):
            a = ArcBetweenPoints(dr.p(k) + UP * 0.3, dr.p(k + 1) + UP * 0.3, angle=-PI / 2,
                                 color=ORANGE_RETENUE, stroke_width=4)
            a.add_tip(tip_length=0.15, tip_width=0.15)
            return VGroup(a, Text("2 cm", font_size=24, color=ORANGE_RETENUE).next_to(a, UP, buff=0.04))

        self.au_mot("saut de 2 centimètres")
        s0 = saut(0)
        s0[1]._pas_audit = True  # dit au 2e « 2 centimètres » (l'audit prend le 1er)
        self.play(FadeOut(lo), Create(s0[0]), FadeIn(s0[1], scale=1.3), Create(dr.ticks[1]), run_time=0.6)
        self.au_mot("encore et encore")
        autres = [muet(saut(k)) for k in range(1, 5)]
        self.play(LaggedStart(*[AnimationGroup(Create(s), Create(dr.ticks[k + 2])) for k, s in enumerate(autres)],
                              lag_ratio=0.35), run_time=1.6)
        self.au_mot("j'écris")
        for v, mot in ((1, "1, 2"), (2, "2, 3"), (3, "3, 4"), (4, "4, 5"), (5, "5. Et")):
            self.au_mot(mot)
            self.play(FadeIn(dr.etiquettes[v], scale=1.4), run_time=0.3)
        self.au_mot("la flèche")
        fin = self.t("La flèche : ça continue !", 36, AMBRE).move_to(P(-0.6, -2.65))
        self.play(Indicate(dr.axe, color=AMBRE, scale_factor=1.05), FadeIn(fin, shift=UP * 0.15), run_time=0.8)
        self.attendre_voix()

    # ── 10 : QUESTION 2 (3/5 sur un segment de 10 cm) ───────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = Barre(10, cm=0.5, x0=-5.8, y=0.3, h=0.16, couleur=WHITE)
        fig = muet(VGroup(b, b.trait(0), b.trait(10), bout(b, 0, "0", 30), bout(b, 10, "1", 30)))
        m = b.mesure("10 cm", fs=30, y=b.haut + 0.75)
        traits = VGroup(*[b.trait(c, ORANGE_RETENUE) for c in (2, 4, 6, 8)])
        sauts = [b.saut(c, c + 2, "2 cm" if c == 0 else None, fs=24) for c in (0, 2, 4)]
        muet(sauts[0][1])
        pt = Dot(P(b.x(6), b.yc), radius=0.14, color=VERT_OK)
        f35 = b.sous(6, fraction(3, 5, 32, VERT_OK))

        def avant(sc):
            sc.au_mot("Un segment")
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.4)
            sc.play(GrowFromCenter(m[0]), FadeIn(m[1]), run_time=0.4)  # « 10 cm » attend son mot

        def apres(sc):
            sc.au_mot("Un saut mesure")
            sc.play(FadeOut(m), run_time=0.25)
            self.montrer(sc, 0, LaggedStart(*[Create(t) for t in traits], lag_ratio=0.2))
            sc.play(Create(sauts[0]), run_time=0.4)
            sc.au_mot("Trois sauts")
            self.montrer(sc, 1, LaggedStart(*[Create(s) for s in sauts[1:]], lag_ratio=0.4))
            sc.play(FadeIn(pt, scale=1.6), FadeIn(f35, scale=1.3), run_time=0.4)
            sc.rep_fini()

        self.question_pause("10-question", "10b-reponse",
                            ["10 cm valent 1, en cinquièmes.", "À combien de cm du 0",
                             "est le trait 3/5 ?"],
                            [self.t("3 cm", 34), self.t("6 cm", 34), self.t("5 cm", 34)], 1,
                            ["Un saut : 10 ÷ 5 = 2 cm.", "Trois sauts : 3 × 2 = 6 cm."],
                            mot_q="Un segment", avant_q=avant, autres_r=apres)

    # ── 11 : défi (la barre du bouclier : 8 cm en quarts) ───────────────────
    def barre8(self):
        b = Barre(8, cm=0.6, x0=-5.2, y=0.55, h=0.5, couleur=BLEU_BOUCLIER)
        fig = VGroup(bouclier(1.1).move_to(P(b.x0 - 0.55, b.yc)), b, b.trait(0), b.trait(8),
                     bout(b, 0, "0"), bout(b, 8, "1"))
        return b, fig

    def ecran_defi(self):
        self.ecran("11-defi", 0.65)
        self.au_mot("À toi de jouer")
        self.titre_haut("À toi de jouer !", fs=48)
        b, fig = self.barre8()
        muet(VGroup(*fig[4:]))
        self.au_mot("la barre du bouclier")
        self.play(FadeIn(fig, shift=UP * 0.2), run_time=0.6)
        self.au_mot("8 centimètres")
        m = b.mesure("8 cm", fs=34)
        l1 = self.col(self.ligne([("8 cm", WHITE), ("pour 1,", WHITE)], 38), 1.75)
        # « 8 cm » au mot « 8 », « pour 1, » au mot « pour » (jamais l'un avant l'autre)
        self._par_lots(list(l1.submobjects), lambda x: FadeIn(x, shift=RIGHT * 0.2), 0.4,
                       avec=[GrowFromCenter(m[0]), FadeIn(m[1], scale=1.3)])
        self.au_mot("graduée en quarts")
        l2 = self.col(self.t("graduée en quarts.", 38, VIOLET_ACCENT), 1.05)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Tous les combien")
        q1 = self.col(self.bloc(["1. Tous les combien de cm", "    trace-t-elle un trait ?"], 32, ORANGE_RETENUE,
                                buff=0.08), 0.15)
        q1[0]._pas_audit = True  # la numérotation « 1. » n'est pas dite
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Et où")
        q2 = self.col(dit(self.t("2. Où écrire 3/4 ?", 32, ORANGE_RETENUE), "écrit-elle"), -0.75)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.4)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("11b-correction", 0.65)
        b, fig = self.barre8()
        self.add(muet(fig))
        self.titre_haut("Correction", fs=48)
        self.au_mot("8 divisé")
        l1 = self.ligne([("8", WHITE), ("÷", WHITE), ("4", WHITE), ("=", WHITE), ("2 cm", VERT_OK)], 42)
        self.col(l1, 1.75)
        self._par_lots(list(l1.submobjects), lambda m: FadeIn(m, shift=RIGHT * 0.2), 0.3)
        self.au_mot("un trait tous")
        l2 = self.col(self.t("un trait tous les 2 cm", 36), 1.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        sauts = VGroup()
        for c, mot in ((2, "À 2"), (4, "à 4"), (6, "à 6 centimètres")):
            s = b.saut(c - 2, c, fs=24)
            pos = Text(f"{c} cm", font_size=26, color=ORANGE_RETENUE).move_to(P(b.x(c), b.haut + 0.85))
            self.au_mot(mot)
            self.play(Create(b.trait(c, ORANGE_RETENUE)), Create(s), FadeIn(pos, scale=1.3), run_time=0.5)
            sauts.add(s)
        self.au_mot("c'est trois sauts")
        self.play(LaggedStart(*[Indicate(s, color=AMBRE, scale_factor=1.25) for s in sauts], lag_ratio=0.3),
                  run_time=0.9)
        self.au_mot("3 fois")
        l3 = self.ligne([("3", WHITE), ("×", WHITE), ("2", WHITE), ("=", WHITE), ("6", VERT_OK)], 42)
        l3[2]._pas_audit = True  # dit au « 3 fois 2 » (l'audit prend le 1er « 2 »)
        self.col(l3, 0.15)
        self._par_lots(list(l3.submobjects), lambda m: FadeIn(m, shift=RIGHT * 0.2), 0.3)
        self.au_mot("Trois quarts est")
        f34 = b.sous(6, fraction(3, 4, 36, VERT_OK))
        l4 = self.col(dit(self.t("3/4 est à 6 cm du 0.", 38, VERT_OK), "Trois quarts est"), -0.7)
        self.play(FadeIn(f34, scale=1.4), FadeIn(l4, shift=RIGHT * 0.2), run_time=0.45)
        self.insister(f34, 1.5, 0.25)
        self.attendre_voix()

    # ── 12 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("12-finale", 0.65)
        b = self.barre12()
        fig = VGroup(self.fig_base(b, internes=(3, 6, 9)), self.sauts_bas(b), muet(self.quarts(b)))
        self.add(fig)
        # « Ce que tu as appris » EN HAUT ET CENTRÉ ; la barre dessous, en large ;
        # puis les 4 points, une ligne chacun, assez grands pour la classe
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.cadrer(fig, gauche=-5.4, droite=4.2, haut=tit.get_bottom()[1] - 0.2, bas=0.75)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for a, b2 in (("Je choisis l'unité :", "la longueur qui vaut 1."),
                      ("Je divise pour trouver le pas :", "12 ÷ 4 = 3 cm."),
                      ("Je reporte le pas à la règle :", "tous les sauts sont égaux."),
                      ("Puis j'écris les nombres", "sous les traits.")):
            lignes.add(VGroup(self.coche(), self.ligne([(a, WHITE), (b2, WHITE)], 32, buff=0.25)).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.36)
        if lignes.width > 10.6:  # de x = −6,2 à 4,4 : loin du bord et de Ti-Margo
            lignes.scale_to_fit_width(10.6)
        lignes.next_to(fig, DOWN, buff=0.4).align_to(P(-6.2, 0), LEFT)
        for lg, mot, geste in zip(lignes, ("Je choisis", "Je divise", "Je reporte", "Puis j'écris"),
                                  (None, None, fig[1], fig[2])):
            self.au_mot(mot)
            self.play(Create(lg[0]), FadeIn(lg[1][0], shift=RIGHT * 0.2), run_time=0.4)
            anims = [Indicate(geste, color=AMBRE, scale_factor=1.1)] if geste is not None else []
            self.play(FadeIn(lg[1][1], shift=RIGHT * 0.2), *anims, run_time=0.45)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_apprendre()
        self.ecran_unite()
        self.ecran_pas()
        self.ecran_reporter()
        self.ecran_ecrire()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_demi_droite()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("13-abonne")


class DemiDroiteGraduer6e(DemiDroiteGraduerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "orange"
