# demi_droite_lire.py
# EleveAI — Maths 6e — « Repérer sur une demi-droite graduée », épisode 01 :
# LIRE L'ABSCISSE D'UN POINT (micro du coach : abscisse_lire, notion
# demi_droite_graduee). Paysage 16:9, CEINTURE BLANCHE (lire, brief du 03/11),
# AVEC VOIX. Paysage seulement : le short de la micro existe déjà
# (demi_droite_graduee_short.py, voix 6e-demi-droite-short-lire.json).
#
# ⭐ Le geste gardé de la paysage de notion (demi_droite_graduee.py) : LE SAUT,
# une flèche courbe d'un trait au suivant. On COMPTE LES SAUTS depuis
# l'origine, jamais les traits. Le pas se CALCULE entre deux nombres écrits :
# l'écart ÷ le nombre de sauts (3 ÷ 3 = 1 ; 1 ÷ 2 = 0,5 ; 1 ÷ 10 = 0,1 ;
# défi 1 ÷ 5 = 0,2), puis on lit sur une graduation de 1, de 0,5, de 0,1.
# Figure : celle du coach (lib/canvas/DroiteGradueeCanvas.tsx) : carte
# blanche, axe bleu nuit fléché, 0 rouge, point bleu sur sa tige ; la valeur
# lue s'écrit SOUS le trait (le « below » du coach, commit eeaf5b55).
#
# Décor et métier : COURSE / TRAIL (centre « sport », précision
# « course-trail »), Inès, ORGANISATRICE DE COURSES : les bornes
# kilométriques du sentier, le ravitaillement, le photographe, les
# secouristes, le poste d'eau, le podium, la course des enfants. Aucun
# chiffre du monde réel cité : pas de source. Pas de La Réunion.
# Vérifié (Python) : 3 ÷ 3 = 1 ; 20 ÷ 4 = 5 ; 1 ÷ 2 = 0,5 ; 3 × 0,5 = 1,5 ;
# 4 × 0,5 = 2 ; 1 ÷ 10 = 0,1 ; 6 × 0,1 = 0,6 ; 1 + 3 × 0,1 = 1,3 ;
# 1 ÷ 5 = 0,2 ; 3 × 0,2 = 0,6.
#
# Leurres (brief-agent-demi-droite.md) : QUESTION 1 le pas vaut toujours 1
# (1 km) ou le nombre de sauts (4 km) ; QUESTION 2 compter les traits (4),
# compter le trait de l'origine (2,5) ; QUESTION 3 compter les traits (13),
# croire que le pas vaut 1 (4 = 1 + 3).
#
# Micro → écrans : l'origine et l'abscisse (02) ; le pas calculé (03) ; lire
# sur une graduation de 1, compter les sauts (04) ; QUESTION 1 le pas (05) ;
# pas de 0,5 (06) et lecture (07) ; QUESTION 2 (08) ; pas de 0,1 (09) et
# lecture (10) ; QUESTION 3 (11) ; défi pas de 0,2 (12) et correction (12b).
# Écrans : 00 garde · 01 Inès et le sentier · 01b ce que tu vas apprendre ·
# 02 l'origine · 03 le pas · 04 lire (pas 1) · 05 QUESTION 1 · 06 pas 0,5 ·
# 07 lire (pas 0,5) · 08 QUESTION 2 · 09 pas 0,1 · 10 lire (pas 0,1) ·
# 11 QUESTION 3 · 12 défi · 12b correction · 13 ce que tu as appris · 14 fin.
#
# Voix : manim/voix/6e-demi-droite-lire.json (écrite par l'agent le 03/11,
# débit −10), WAV dans public/sons/6e-demi-droite-lire/ ; marques mot à mot :
# manim/scripts/6e/demi_droite_lire_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py).
# Outils : prop_commun.py (PaysageProp : synchro par jetons, AUDIT, questions-
# pauses, finale, fin) NON modifié ; la demi-droite (Piste) est ICI.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/demi_droite_lire.py DemiDroiteLire6e
# python -m manim render -qh --disable_caching manim/scripts/6e/demi_droite_lire.py DemiDroiteLire6e -o eleveai-maths-6e-demi-droite-lire --media_dir manim/scripts/6e/media-demi-droite-01
# Sortie : manim/sorties/6e/maths/demi-droite-graduee/01-lire/eleveai-maths-6e-demi-droite-lire.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_triangles import FinTriangles  # noqa: E402  (fin du 05/11 : pouce, commentaire, cloche)

VERT_CARTE = "#15803d"    # le résultat juste, lisible sur la carte blanche
ARC = ORANGE_TROU         # le saut (orange foncé, lisible sur la carte)
TERRE = "#a16207"
MONT = "#334155"


def pas_audit(m):
    """Une donnée de figure redite d'un écran à l'autre : ni synchro ni audit."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


SANS_JAMBAGE = set("abcdehiklmnorstuvwxzABCDEFGHIKLMNOPRSTUVWXYZ0123456789éèêàâîôûç")  # ni J ni Q


def base(t):
    """La ligne de base d'un Text : le bas d'une lettre sans jambage."""
    lettres = [c for c in getattr(t, "text", "") if not c.isspace()]
    if len(lettres) == len(t.submobjects):
        for c, g in zip(lettres, t.submobjects):
            if c in SANS_JAMBAGE:
                return g.get_bottom()[1]
    return t.get_bottom()[1]


def aligner_bases(g):
    """Les morceaux d'une ligne sur la MÊME ligne de base (arrange() centre les
    boîtes : « pas : 1 ÷ » descendait le « 5 », une virgule faisait monter)."""
    y0 = base(g[0])
    for m in g[1:]:
        m.shift(UP * (y0 - base(m)))
    return g


class Piste(VGroup):
    """La demi-droite graduée du coach : de a à b, n sauts. L'axe passe par
    `centre` (son milieu) ; la carte blanche dépasse de `haut` au-dessus et de
    `bas` au-dessous. Un trait « majeur » (multiple de `majeur`) est plus long.
    Rien n'est écrit : ecrit(v) renvoie le nombre SOUS le trait (au mot)."""

    def __init__(self, a, b, n, longueur=10.5, centre=P(-0.25, 0.6), fs=32, majeur=1, haut=1.65, bas=1.0,
                 marge=0.4, **kw):
        super().__init__(**kw)
        self.a, self.b, self.n, self.fs = a, b, n, fs
        L = longueur
        self._g = Dot(P(-L / 2, 0), radius=0.001, fill_opacity=0)
        self._d = Dot(P(L / 2, 0), radius=0.001, fill_opacity=0)
        self.axe = Arrow(P(-L / 2 - 0.15, 0), P(L / 2 + 0.6, 0), buff=0, color=BORD, stroke_width=6,
                         tip_length=0.25, max_tip_length_to_length_ratio=1)
        self.ticks = {}
        for i in range(n + 1):
            v = a + (b - a) * i / n
            maj = majeur is None or abs(v / majeur - round(v / majeur)) < 1e-9
            h = 0.25 if maj else 0.15
            x = -L / 2 + L * i / n
            self.ticks[i] = Line(P(x, -h), P(x, h), color=BORD, stroke_width=5 if maj else 4)
        g, d = -L / 2 - 0.15 - marge, L / 2 + 0.6 + marge
        self.carte = RoundedRectangle(width=d - g, height=haut + bas, corner_radius=0.22, fill_color=CARTE,
                                      fill_opacity=1, stroke_color=GRILLE, stroke_width=3)
        self.carte.move_to(P((g + d) / 2, (haut - bas) / 2))
        self.add(self.carte, self._g, self._d, self.axe, *self.ticks.values())
        self.shift(centre)

    def p(self, v):
        g, d = self._g.get_center(), self._d.get_center()
        return g + (d - g) * (v - self.a) / (self.b - self.a)

    def trait(self, v):
        return self.ticks[int(round((v - self.a) / (self.b - self.a) * self.n))]

    def ecrit(self, v, s=None, couleur=None, fs=None):
        """Le nombre écrit sous le trait v (0 rouge, comme le coach)."""
        s = s if s is not None else fr(round(v, 6))
        c = couleur or (ROUGE_ZERO if v == 0 else NUIT)
        return texte(s, fs or self.fs, color=c).next_to(self.p(v) + DOWN * 0.25, DOWN, buff=0.12)

    def point(self, v, lettre, couleur=BLEU_POINT, haut=0.85, fs=None):
        """Le point du coach : une tige, un rond, la lettre au-dessus."""
        x = self.p(v)
        tige = Line(x, x + UP * haut, color=couleur, stroke_width=5)
        rond = Dot(x + UP * haut, radius=0.12, color=couleur)
        let = texte(lettre, fs or self.fs + 4, color=couleur).next_to(rond, UP, buff=0.1)
        g = VGroup(tige, rond, let)
        g.rond, g.lettre = rond, let
        return g

    def saut(self, v1, v2, couleur=ARC, sw=5):
        """LE SAUT : une flèche courbe d'un trait au suivant, au-dessus de l'axe."""
        arc = ArcBetweenPoints(self.p(v1) + UP * 0.14, self.p(v2) + UP * 0.14, angle=-PI * 0.55, color=couleur,
                               stroke_width=sw)
        arc.add_tip(tip_length=0.15, tip_width=0.15)
        return arc

    def sauts(self, v0, pas, k, couleur=ARC):
        return [self.saut(v0 + pas * i, v0 + pas * (i + 1), couleur) for i in range(k)]

    def segment(self, v1, v2, couleur=AMBRE, sw=11):
        return Line(self.p(v1), self.p(v2), color=couleur, stroke_width=sw, stroke_opacity=0.85)

    def ecart(self, v1, v2, couleur=AMBRE):
        """La même distance : une double flèche sous l'axe, entre deux traits."""
        y = UP * 0.42
        return DoubleArrow(self.p(v1) + y, self.p(v2) + y, buff=0.06, color=couleur, stroke_width=4,
                           tip_length=0.14, max_tip_length_to_length_ratio=0.4)


def ines(s=1.0):
    """Inès, organisatrice de courses : casquette, tee-shirt orange, chronomètre."""
    p = personne(peau="#c68642", tenue="#f97316", cheveux="#3f1d0b", longs=True)
    c = p.tete.get_center()
    r = p.tete.width / 2
    visiere = RoundedRectangle(width=r * 1.5, height=r * 0.22, corner_radius=0.04, fill_color="#1d4ed8",
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.62 + RIGHT * r * 0.55)
    calot = AnnularSector(inner_radius=0, outer_radius=r * 1.06, angle=PI, start_angle=0, fill_color="#2563eb",
                          fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55)
    chrono = VGroup(Circle(radius=0.2, fill_color="#e5e7eb", fill_opacity=1, stroke_color="#111827", stroke_width=4),
                    Line(P(0, 0), P(0, 0.13), color="#111827", stroke_width=4),
                    Rectangle(width=0.08, height=0.09, fill_color="#111827", fill_opacity=1, stroke_width=0)
                    .move_to(P(0, 0.25))).move_to(p.corps.get_center() + RIGHT * 0.75 + UP * 0.1)
    dossard = Rectangle(width=0.55, height=0.4, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(
        p.corps.get_center() + UP * 0.05)
    p.add(calot, visiere, dossard, chrono)
    return p.scale(s)


def borne(txt, h=0.9, fs=24):
    """Une borne kilométrique : un poteau, une plaque blanche, le nombre."""
    poteau = Rectangle(width=0.12, height=h, fill_color="#78350f", fill_opacity=1, stroke_width=0)
    t = Text(txt, font_size=fs, color=NUIT, weight=BOLD)
    plaque = RoundedRectangle(width=max(0.62, t.width + 0.25), height=0.46, corner_radius=0.08, fill_color=WHITE,
                              fill_opacity=1, stroke_color="#dc2626", stroke_width=3)
    plaque.move_to(poteau.get_top() + DOWN * 0.12)
    t.move_to(plaque)
    g = VGroup(poteau, plaque, t)
    g.t = t
    return g


def montagnes():
    """Le décor du trail : trois sommets, un peu de neige."""
    g = VGroup()
    for x, h, w in ((-4.2, 2.6, 4.2), (-0.6, 3.3, 5.0), (3.4, 2.4, 4.4)):
        base = -1.2
        g.add(Polygon(P(x - w / 2, base), P(x + w / 2, base), P(x, base + h), fill_color=MONT, fill_opacity=1,
                      stroke_width=0))
        g.add(Polygon(P(x - w * 0.12, base + h * 0.76), P(x + w * 0.12, base + h * 0.76), P(x, base + h),
                      fill_color="#e2e8f0", fill_opacity=1, stroke_width=0))
    return g


def sentier():
    """Le sentier qui serpente : une courbe en pointillé couleur terre."""
    pts = [P(-3.7, -2.3), P(-2.0, -1.6), P(-0.4, -2.35), P(1.3, -1.55), P(3.1, -2.3), P(5.2, -1.7)]
    c = VMobject(stroke_color=TERRE, stroke_width=9).set_points_smoothly(pts)
    return c


class DemiDroiteLireBase(FinTriangles, PaysageProp):
    nom_voix = "6e-demi-droite-lire"
    fichier_marques = "demi_droite_lire_marques.json"
    Y_L = [-1.1, -1.95, -2.95]   # les lignes de texte sous la carte (l'encadré du bas ne colle pas au calcul)

    # ── petits outils ───────────────────────────────────────────────────────
    def garde(self, *a, **k):
        titre, ident, ech = super().garde(*a, **k)
        pas_audit(ident)  # « Maths 6e » : le 6 n'est pas dit
        return titre, ident, ech

    def ligne(self, morceaux, fs=40, buff=0.2):
        return aligner_bases(super().ligne(morceaux, fs, buff))

    def pause_defi(self, y=-2.05, marge=2.0):
        """Centrée sous la figure, loin de Ti-Margo (la colonne de droite la collait à lui)."""
        self.au_mot("Mets pause")
        p = self.lg("Mets pause, et cherche !", y, 34, ORANGE_RETENUE)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def pose(self, mob, mot, *autres, n=1, anim="pop", run_time=0.4, sync=True):
        """Pose mob AU MOT (avec d'autres animations). sync=False : la ligne
        n'attend pas le RETOUR d'un de ses mots (« abscisse » redit plus loin)."""
        if not sync:
            for f in mob.get_family():
                f.sans_synchro = True
        self.au_mot(mot, n)
        a = {"pop": FadeIn(mob, scale=1.3), "up": FadeIn(mob, shift=UP * 0.15),
             "fade": FadeIn(mob, shift=RIGHT * 0.2), "write": Write(mob)}[anim]
        self.play(a, *autres, run_time=run_time)
        return mob

    def lg(self, s, y, fs=38, couleur=WHITE, x=-0.8):
        t = self.t(s, fs, couleur).move_to(P(x, y))
        if t.get_right()[0] > 5.0:
            t.shift(LEFT * (t.get_right()[0] - 5.0))
        return t

    def titre_fixe(self, s, couleur=JAUNE_TITRE, fs=44):
        """Un titre d'écran : il n'attend pas que la voix redise ses mots."""
        t = self.t(s, fs, couleur).move_to(P(-0.25, 3.05))
        t.sans_synchro = True
        return t

    def titre_haut(self, s, couleur=JAUNE_TITRE, fs=44):
        t = self.t(s, fs, couleur).move_to(P(-0.25, 3.05))
        self.play(Write(t), run_time=0.5)
        return t

    def compter(self, pi, v0, pas, k, mots, valeurs=None, couleur=ARC, fs=None, deja=()):
        """Les k sauts depuis v0, chacun AU MOT ; la valeur atteinte s'écrit
        sous le trait (sauf celles de `deja`, déjà écrites : on les allume)."""
        out = VGroup()
        for i in range(k):
            v = round(v0 + pas * (i + 1), 6)
            s = pi.saut(v0 + pas * i, v, couleur)
            self.au_mot(mots[i])
            if v in deja:
                self.play(Create(s), Indicate(deja[v], color=couleur, scale_factor=1.5), run_time=0.35)
                out.add(s)
            else:
                e = pi.ecrit(v, None if valeurs is None else valeurs[i], couleur=couleur, fs=fs)
                self.play(Create(s), FadeIn(e, scale=1.3), run_time=0.35)
                out.add(s, e)
        return out

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire l'abscisse d'un point", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Lire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        bornes = VGroup(*[borne("?", h=1.0, fs=26) for _ in range(3)]).arrange(RIGHT, buff=1.6).move_to(P(-0.6, 0.35))
        q = self.t("Comment savoir où l'on est, sur un parcours ?", 36, BLEU_CALCUL).move_to(P(-0.6, -1.0))
        self.au_mot("Comment")
        self.play(FadeIn(q, shift=UP * 0.15), LaggedStart(*[FadeIn(b, shift=UP * 0.3) for b in bornes],
                                                           lag_ratio=0.25), run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 01 : Inès, organisatrice de courses de trail ────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = ines(0.95).move_to(P(-5.2, -0.5))
        nom = self.t("Inès", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.pose(VGroup(pers, nom), "Voici Inès", anim="up", run_time=0.6)
        met = self.bloc(["organisatrice", "de courses"], 24, BLEU_CALCUL, buff=0.06).next_to(pers, DOWN, buff=0.18)
        met.set_x(pers.get_x())
        mt = montagnes()
        mt.scale_to_fit_width(9.6).move_to(P(1.3, 0.1))
        ch = sentier()
        self.au_mot("organise")
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("trail")
        self.play(FadeIn(mt, shift=UP * 0.2), Create(ch), run_time=0.9)
        bs = VGroup()
        for prop, txt, mot in ((0.02, "0", "0 au départ"), (0.42, "1 km", "1 kilomètre"),
                               (0.8, "2 km", "2 kilomètres")):
            b = borne(txt)
            b.move_to(ch.point_from_proportion(prop)).align_to(ch.point_from_proportion(prop), DOWN)
            b.shift(UP * 0.05)
            self.au_mot(mot)
            self.play(FadeIn(b, shift=DOWN * 0.3), run_time=0.4)
            bs.add(b)
        q1 = self.t("Le ravitaillement ?", 34, ORANGE_RETENUE).move_to(P(-2.6, 3.1))
        q2 = self.t("Et le photographe ?", 34, ORANGE_RETENUE).move_to(P(2.6, 3.1))
        self.pose(q1, "Où mettre", anim="up")
        self.pose(q2, "Et le photographe", anim="up")
        self.au_mot("Sur son plan")
        pi = Piste(0, 6, 6, longueur=8.4, centre=P(0.75, -0.2))
        labs = VGroup(*[pas_audit(pi.ecrit(v)) for v in (0, 1, 2)])
        self.play(FadeOut(mt), FadeOut(q1), FadeOut(q2), ReplacementTransform(ch, pi.axe), run_time=0.8)
        self.play(FadeIn(pi.carte), *[FadeIn(t) for t in pi.ticks.values()],
                  *[ReplacementTransform(b.t, l) for b, l in zip(bs, labs)],
                  *[FadeOut(VGroup(b[0], b[1])) for b in bs], run_time=0.7)
        self.bring_to_front(pi.axe, *pi.ticks.values(), labs)
        nm = self.t("une demi-droite graduée", 38, BLEU_CALCUL).move_to(P(0.75, -2.3))
        self.pose(nm, "une demi-droite", anim="up")
        self.attendre_voix()

    # ── 01b : ce que tu vas apprendre (une phrase) ──────────────────────────
    def ecran_apprendre(self):
        self.ecran("01b-apprendre")
        tit = self.t("Ce que tu vas apprendre", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.pose(tit, "Ce que tu vas", anim="write", run_time=0.6)
        l1 = self.t("Lire l'abscisse d'un point,", 40).move_to(P(-0.4, 1.55))
        l2 = self.t("en comptant les sauts depuis l'origine.", 40).move_to(P(-0.4, 0.8))
        pi = Piste(0, 4, 4, longueur=7.5, centre=P(-0.6, -1.75), haut=1.3, bas=0.75)
        self.pose(l1, "lire l'abscisse", FadeIn(pi), anim="up")
        self.pose(l2, "en comptant", anim="up")
        self.au_mot("sauts")
        self.play(LaggedStart(*[Create(s) for s in pi.sauts(0, 1, 3)], lag_ratio=0.35), run_time=0.7)
        self.au_mot("l'origine")
        self.play(Indicate(pi.ticks[0], color=ROUGE_ZERO, scale_factor=2.0), run_time=0.6)
        self.attendre_voix()

    # ── 02 : l'origine, la même distance, l'abscisse ────────────────────────
    def piste_km(self):
        return Piste(0, 6, 6)

    def ecran_origine(self):
        self.ecran("02-origine")
        pi = self.piste_km()
        self.play(FadeIn(pi), run_time=0.5)
        self.au_mot("l'origine")
        tit = self.t("L'origine", 44, JAUNE_TITRE).move_to(P(-0.25, 3.05))
        drap = texte("origine", 28, color=ROUGE_ZERO).next_to(pi.p(0) + UP * 0.3, UP, buff=0.1)
        drap.align_to(pi.p(0) + LEFT * 0.12, LEFT)  # dans la carte, pas sur son bord
        self.play(Write(tit), FadeIn(drap, shift=DOWN * 0.15),
                  Indicate(pi.ticks[0], color=ROUGE_ZERO, scale_factor=2.0), run_time=0.6)
        self.pose(pi.ecrit(0), "est 0")
        self.au_mot("même distance")
        ec = VGroup(*[pi.ecart(k, k + 1) for k in range(6)])
        self.play(LaggedStart(*[GrowFromCenter(e) for e in ec], lag_ratio=0.2), run_time=1.2)
        a = pi.point(4, "A")
        l1 = self.lg("Chaque point a un nombre :", self.Y_L[0])
        self.pose(l1, "Chaque point", FadeOut(ec), FadeIn(a, shift=DOWN * 0.2), anim="up")
        l2 = self.lg("son abscisse.", self.Y_L[1], 48, BLEU_CALCUL)
        self.pose(l2, "son abscisse")
        self.insister(l2, 1.25, 0.25)
        self.attendre_voix()

    # ── 03 : le pas = l'écart ÷ le nombre de sauts ──────────────────────────
    def ecran_pas(self):
        self.ecran("03-pas")
        pi = self.piste_km()
        z = pi.ecrit(0)
        self.add(pi, z)
        tit = self.titre_haut("Le pas")
        self.au_mot("un saut")
        s1 = pi.saut(0, 1)
        self.play(Create(s1), run_time=0.5)
        self.play(Indicate(s1, color=ARC, scale_factor=1.3), run_time=0.5)
        self.au_mot("deux nombres")
        trois = pi.ecrit(3)
        self.play(FadeOut(s1), Circumscribe(z, color=BLEU_CALCUL, buff=0.08), run_time=0.5)
        self.pose(trois, "0 et 3", Circumscribe(trois, color=BLEU_CALCUL, buff=0.08))
        self.au_mot("il y a 3")
        ss = pi.sauts(0, 1, 3)
        l1 = self.lg("3 sauts", self.Y_L[0], 40, ORANGE_RETENUE, x=-4.0)
        self.play(LaggedStart(*[Create(s) for s in ss], lag_ratio=0.35), FadeIn(l1, shift=UP * 0.15), run_time=1.0)
        c = [self.t(s, 44, BLEU_CALCUL) for s in ("3 ÷", "3", "= 1")]
        aligner_bases(VGroup(*c).arrange(RIGHT, buff=0.3).move_to(P(-0.8, self.Y_L[1])))
        self.pose(c[0], "3 divisé", anim="fade", run_time=0.3)
        self.pose(c[1], "par 3", anim="fade", run_time=0.3)
        self.pose(c[2], "égale 1", anim="fade", run_time=0.3)
        r = self.lg("le pas = 1 km", self.Y_L[2], 44, VERT_OK)
        self.pose(r, "Le pas vaut 1")
        self.play(Create(self.encadrer(r)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : lire sur une graduation de 1 : compter les sauts ──────────────
    def ecran_lire_un(self):
        self.ecran("04-lire-un")
        pi = self.piste_km()
        z, trois = pi.ecrit(0), pi.ecrit(3)
        self.add(pi, z, trois)
        tit = self.titre_fixe("Je lis une abscisse")
        r = pi.point(5, "R")
        self.pose(VGroup(tit, r), "point R", anim="up")
        self.compter(pi, 0, 1, 5, ["1, 2", "2, 3", "3, 4", "4, 5", "5. L"], deja={3: trois})
        res = self.lg("abscisse de R = 5", self.Y_L[0], 44, VERT_OK)
        self.pose(res, "5 : le", r.animate.set_color(VERT_CARTE), sync=False)
        self.au_mot("kilomètre 5")
        self.play(Indicate(res, color=VERT_OK, scale_factor=1.15), run_time=0.6)
        self.au_mot("Attention")
        l2 = self.lg("Le trait du départ ne compte pas.", self.Y_L[1], 36, ROUGE_ERREUR)
        self.play(FadeIn(l2, shift=UP * 0.15), Circumscribe(pi.ticks[0], color=ROUGE_ERREUR, buff=0.12),
                  run_time=0.6)
        l3 = self.lg("On compte les sauts, et non les traits.", self.Y_L[2], 36, ORANGE_RETENUE)
        self.pose(l3, "On compte", anim="up")
        self.attendre_voix()

    # ── les questions-pauses : la figure à gauche, ses nombres AU MOT ───────
    PHRASE_A_GAUCHE = ("05-question", "08-question")

    def _disposer_q(self, question, choix, phrase):
        """Les nombres de la figure (et ses sauts) entrent avec les lignes de la
        question, chacun à son mot : `self._fig_q` = [(indice, mobject)]."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for f in rebours.get_family():
            f.sans_synchro = True  # le « 5 » du compte à rebours n'est pas un mot de la voix
        for i, m in sorted(getattr(self, "_fig_q", []), key=lambda x: -x[0]):
            q.submobjects.insert(i, m)
        self._fig_q = []
        if getattr(self, "_cle_voix", None) in self.PHRASE_A_GAUCHE:
            # phrase longue : sous la figure, à gauche (à droite, Ti-Margo la faisait rapetisser)
            nv = self.bloc(phrase, 30, VERT_OK)
            if nv.width > 6.9:
                nv.scale_to_fit_width(6.9)
            nv.align_to(P(-6.45, 0), LEFT).align_to(P(0, -1.0), UP)
            ph.submobjects = list(nv.submobjects)
        return tete, q, cartes, pause, rebours, ph

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_tableau.py : bornée à droite (BORD_X)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def piste_q(self, a, b, n, majeur=1, longueur=4.6):
        return Piste(a, b, n, longueur=longueur, centre=P(-3.75, 0.25), fs=28, majeur=majeur, haut=1.35, bas=0.9,
                     marge=0.3)

    # ── 05 : QUESTION 1 (0 et 20, 4 sauts : le pas ?) ───────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pi = self.piste_q(0, 20, 4, majeur=20)
        self.add(pi)
        ss = VGroup(*pi.sauts(0, 5, 4))
        self._fig_q = [(2, pi.ecrit(0)), (2, pi.ecrit(20)), (3, ss)]

        def apres(sc):
            cinq = texte("5 km", 26, color=VERT_CARTE).next_to(ss[0], UP, buff=0.08)
            cinq._pas_audit = True
            sc.au_mot("20 divisé")
            sc.rep(0, avec=[Indicate(ss, color=ARC, scale_factor=1.15)])
            sc.au_mot("5 kilomètres")
            sc.play(FadeIn(cinq, scale=1.3), ss[0].animate.set_color(VERT_CARTE), run_time=0.4)
            sc.rep_fin()

        self.question_pause("05-question", "05b-reponse",
                            ["Plan d'un grand trail :", "on lit 0 et 20,", "avec 4 sauts entre les deux.",
                             "Que vaut le pas ?"],
                            [self.t("1 km", 34), self.t("4 km", 34), self.t("5 km", 34)], 2,
                            ["20 ÷ 4 = 5 : un saut vaut 5 km.", "Un saut ne vaut pas toujours 1 :",
                             "on le calcule."], mot_q="Sur le plan", autres_r=apres)

    # ── 06 : un pas de 0,5 ──────────────────────────────────────────────────
    def piste_demi(self):
        return Piste(0, 3, 6, majeur=1)

    def ecran_demi_pas(self):
        self.ecran("06-demi-pas")
        pi = self.piste_demi()
        tit = self.titre_fixe("Le petit parcours")
        self.pose(VGroup(tit, pi), "Voici le plan", anim="up", run_time=0.6)
        z, un = pi.ecrit(0), pi.ecrit(1)
        self.pose(z, "0 et 1", Circumscribe(pi.ticks[0], color=BLEU_CALCUL, buff=0.1))
        self.play(FadeIn(un, scale=1.3), run_time=0.3)
        ss = pi.sauts(0, 0.5, 2)
        l1 = self.lg("2 sauts", self.Y_L[0], 40, ORANGE_RETENUE, x=-4.0)
        self.au_mot("2 sauts")
        self.play(LaggedStart(*[Create(s) for s in ss], lag_ratio=0.4), FadeIn(l1, shift=UP * 0.15), run_time=0.8)
        c = [self.t(s, 44, BLEU_CALCUL) for s in ("1 ÷", "2", "= 0,5")]
        aligner_bases(VGroup(*c).arrange(RIGHT, buff=0.3).move_to(P(-0.8, self.Y_L[1])))
        self.pose(c[0], "1 divisé", anim="fade", run_time=0.3)
        self.pose(c[1], "par 2", anim="fade", run_time=0.3)
        self.pose(c[2], "égale 0,5", anim="fade", run_time=0.3)
        r = self.lg("le pas = 0,5 km", self.Y_L[2], 44, VERT_OK, x=-2.2)
        self.pose(r, "le pas vaut 0,5")
        self.play(Create(self.encadrer(r)), run_time=0.4)
        d = self.t("(un demi-kilomètre)", 32, VERT_OK).next_to(r, RIGHT, buff=0.5)
        self.pose(d, "un demi", anim="fade")
        self.attendre_voix()

    # ── 07 : lire sur une graduation de 0,5 ─────────────────────────────────
    def ecran_demi_lire(self):
        self.ecran("07-demi-lire")
        pi = self.piste_demi()
        z, un = pi.ecrit(0), pi.ecrit(1)
        self.add(pi, z, un)
        tit = self.titre_fixe("Je lis une abscisse")
        p = pi.point(1.5, "P")
        self.pose(VGroup(tit, p), "point P", anim="up")
        self.compter(pi, 0, 0.5, 3, ["0,5 ; 1", "1 ; 1,5", "1,5. L"], deja={1: un})
        res = self.lg("abscisse de P = 1,5", self.Y_L[0], 44, VERT_OK)
        self.pose(res, "1,5. Attention", p.animate.set_color(VERT_CARTE), sync=False)
        self.au_mot("Attention")
        l2 = self.lg("3 sauts, mais l'abscisse est 1,5,", self.Y_L[1], 36, ORANGE_RETENUE)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        l3 = self.ligne([("et non", WHITE), ("3 !", ROUGE_ERREUR)], 40).move_to(P(-0.8, self.Y_L[2]))
        self.pose(l3, "et non 3", anim="up")
        self.play(Create(croix(l3[1], sw=6)), run_time=0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (pas 0,5, S sur le 4e trait) ────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pi = self.piste_q(0, 2.5, 5)
        self.add(pi)
        z, l05 = pas_audit(pi.ecrit(0)), pi.ecrit(0.5)
        s = pi.point(2, "S")
        self._fig_q = [(1, z), (1, l05), (2, s)]

        def apres(sc):
            sc.compter(pi, 0, 0.5, 4, ["0,5 ; 1", "1 ; 1,5", "1,5 ; 2", "2. L"], fs=28, deja={0.5: l05})
            # la phrase de réponse, ligne à ligne AU MOT (posée d'un bloc, elle arrivait 1 s après « abscisse »)
            sc.au_mot("L'abscisse")
            sc.rep(0, avec=[s.animate.set_color(VERT_CARTE)])
            sc.au_mot("A compte")
            sc.rep(1)
            sc.au_mot("C compte")
            sc.rep(2)
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse",
                            ["Le pas vaut 0,5.", "Les secouristes sont au point S.", "Quelle est son abscisse ?"],
                            [self.t("4", 36), self.t("2", 36), self.t("2,5", 36)], 1,
                            ["L'abscisse de S est 2.", "A compte les traits.",
                             "C compte aussi le trait de l'origine."], mot_q="Le pas", autres_r=apres)

    # ── 09 : un pas de 0,1 ──────────────────────────────────────────────────
    def piste_dix(self):
        return Piste(0, 1.2, 12, majeur=1)

    def ecran_dixiemes_pas(self):
        self.ecran("09-dixiemes-pas")
        pi = self.piste_dix()
        tit = self.titre_fixe("Un plan plus précis")
        self.pose(VGroup(tit, pi), "Pour le premier", anim="up", run_time=0.6)
        z, un = pi.ecrit(0), pi.ecrit(1)
        self.pose(z, "0 et 1", Circumscribe(pi.ticks[0], color=BLEU_CALCUL, buff=0.1))
        self.play(FadeIn(un, scale=1.3), run_time=0.3)
        ss = pi.sauts(0, 0.1, 10)
        l1 = self.lg("10 sauts", self.Y_L[0], 40, ORANGE_RETENUE, x=-4.0)
        self.au_mot("10 sauts")
        self.play(LaggedStart(*[Create(s) for s in ss], lag_ratio=0.2), FadeIn(l1, shift=UP * 0.15), run_time=1.3)
        c = [self.t(s, 44, BLEU_CALCUL) for s in ("1 ÷", "10", "= 0,1")]
        aligner_bases(VGroup(*c).arrange(RIGHT, buff=0.3).move_to(P(-0.8, self.Y_L[1])))
        self.pose(c[0], "1 divisé", anim="fade", run_time=0.3)
        self.pose(c[1], "par 10", anim="fade", run_time=0.3)
        self.pose(c[2], "égale 0,1", anim="fade", run_time=0.3)
        r = self.lg("le pas = 0,1 km", self.Y_L[2], 44, VERT_OK)
        self.pose(r, "le pas vaut 0,1")
        self.play(Create(self.encadrer(r)), run_time=0.4)
        self.attendre_voix()

    # ── 10 : lire sur une graduation de 0,1 ─────────────────────────────────
    def ecran_dixiemes_lire(self):
        self.ecran("10-dixiemes-lire")
        pi = self.piste_dix()
        z, un = pi.ecrit(0), pi.ecrit(1)
        self.add(pi, z, un)
        tit = self.titre_fixe("Je lis une abscisse")
        e = pi.point(0.6, "E")
        self.pose(VGroup(tit, e), "point E", anim="up")
        self.compter(pi, 0, 0.1, 6, ["0,1 ; 0,2", "0,2 ; 0,3", "0,3 ; 0,4", "0,4 ; 0,5", "0,5 ; 0,6", "0,6. Il"],
                     fs=28)
        l1 = self.lg("6 sauts de 0,1 : 6 dixièmes", self.Y_L[0], 38, ORANGE_RETENUE)
        self.pose(l1, "6 sauts", anim="up")
        res = self.lg("abscisse de E = 0,6", self.Y_L[1], 44, VERT_OK)
        self.pose(res, "0,6.", e.animate.set_color(VERT_CARTE), n=2, sync=False)
        self.insister(res, 1.15, 0.25)
        self.attendre_voix()

    # ── 11 : QUESTION 3 (pas 0,1, M à 1,3) ──────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        pi = Piste(0, 1.4, 14, longueur=4.9, centre=P(-3.65, 0.25), fs=26, majeur=1, haut=1.35, bas=0.9, marge=0.3)
        self.add(pi)
        z, un = pas_audit(pi.ecrit(0)), pas_audit(pi.ecrit(1))
        m = pi.point(1.3, "M")
        self._fig_q = [(1, z), (1, un), (2, m)]

        def apres(sc):
            seg = pi.segment(0, 1, AMBRE, sw=10)
            dix = texte("10 sauts", 22, color=ARC).move_to(pi.p(0.5) + UP * 0.45)
            la = self.ligne([("10 sauts de", WHITE), ("0,1", WHITE), ("→ 1", WHITE)], 30).move_to(P(-3.65, -1.3))
            sc.au_mot("10 sauts")
            sc.play(Create(seg), FadeIn(dix), FadeIn(la[0], shift=UP * 0.15), run_time=0.5)
            sc.pose(la[1], "de 0,1", anim="fade", run_time=0.3)
            sc.pose(la[2], "à 1", Indicate(un, color=AMBRE, scale_factor=1.5), anim="fade", run_time=0.4)
            lb = self.ligne([("+ 3 sauts :", ORANGE_RETENUE), ("1,1 ;", ORANGE_RETENUE), ("1,2 ;", ORANGE_RETENUE),
                             ("1,3", VERT_OK)], 30).move_to(P(-3.65, -2.0))
            sc.pose(lb[0], "3 sauts", anim="fade", run_time=0.3)
            for k, (v, mot) in enumerate(((1.1, "1,1 ;"), (1.2, "1,2 ;"), (1.3, "1,3. A"))):
                sc.au_mot(mot)
                sc.play(Create(pi.saut(round(v - 0.1, 6), v)), FadeIn(lb[k + 1], shift=RIGHT * 0.15), run_time=0.35)
            sc.play(m.animate.set_color(VERT_CARTE), run_time=0.3)

        self.question_pause("11-question", "11b-reponse",
                            ["Le pas vaut 0,1.", "Le podium est au point M.", "Quelle est son abscisse ?"],
                            [self.t("13", 36), self.t("1,3", 36), self.t("4", 36)], 1,
                            ["A compte les traits.", "C croit que le pas vaut 1."], mot_q="Le pas", autres_r=apres)

    # ── 12 : défi (0 et 1, 5 sauts, F au 3e trait) ──────────────────────────
    def piste_defi(self):
        return Piste(0, 1.4, 7, majeur=1)

    def ecran_defi(self):
        self.ecran("12-defi", 0.65)
        pi = self.piste_defi()
        tit = self.t("À toi de jouer !", 48, JAUNE_TITRE).move_to(P(-0.25, 3.05))
        self.pose(tit, "À toi de jouer", anim="write", run_time=0.6)
        l0 = self.lg("La course des enfants", self.Y_L[0], 36, BLEU_CALCUL)
        self.pose(VGroup(pi, l0), "la course des enfants", anim="up", run_time=0.5)
        z, un = pi.ecrit(0), pi.ecrit(1)
        self.pose(z, "0 et 1")
        self.play(FadeIn(un, scale=1.3), run_time=0.3)
        ss = VGroup(*pi.sauts(0, 0.2, 5))
        cinq = self.lg("5 sauts", self.Y_L[0], 36, ORANGE_RETENUE)
        self.au_mot("5 sauts")
        self.play(LaggedStart(*[Create(s) for s in ss], lag_ratio=0.25), FadeOut(l0), FadeIn(cinq), run_time=1.0)
        f = pi.point(0.6, "F")
        self.pose(f, "point F", anim="up")
        q = self.lg("Quelle est l'abscisse de F ?", self.Y_L[1], 42, JAUNE_TITRE)
        self.pose(q, "Quelle est", anim="up")
        self.pause_defi(y=self.Y_L[2])

    def ecran_correction(self):
        self.ecran("12b-correction", 0.65)
        pi = self.piste_defi()
        z, un, f = pi.ecrit(0), pi.ecrit(1), pi.point(0.6, "F")
        self.add(pi, z, un, f)
        self.titre_haut("Correction")
        self.au_mot("le pas")
        c = [self.t(s, 42, BLEU_CALCUL) for s in ("pas : 1 ÷", "5", "= 0,2")]
        aligner_bases(VGroup(*c).arrange(RIGHT, buff=0.3).move_to(P(-0.8, self.Y_L[0])))
        self.pose(c[0], "1 divisé", anim="fade", run_time=0.3)
        self.pose(c[1], "par 5", anim="fade", run_time=0.3)
        self.pose(c[2], "égale 0,2", anim="fade", run_time=0.3)
        self.compter(pi, 0, 0.2, 3, ["0,2 ; 0,4", "0,4 ; 0,6", "0,6. L"])
        res = self.lg("abscisse de F = 0,6", self.Y_L[1], 44, VERT_OK)
        self.pose(res, "0,6 : les", f.animate.set_color(VERT_CARTE), sync=False)
        l3 = self.lg("Les enfants courent 0,6 km.", self.Y_L[2], 36)
        self.pose(l3, "les enfants", anim="up")
        self.insister(res, 1.15, 0.25)
        self.attendre_voix()

    # ── 13 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("13-finale", 0.65)
        pi = self.piste_demi()
        z, un, p = pi.ecrit(0), pi.ecrit(1), pi.point(1.5, "P", couleur=VERT_CARTE)
        sa = VGroup(*pi.sauts(0, 0.5, 3), pi.ecrit(0.5, couleur=ARC), pi.ecrit(1.5, couleur=ARC))
        fig = VGroup(pi, z, un, p, sa)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("L'origine vaut 0.",),
            ("Avant de lire, je trouve le pas :", "ce que vaut un saut."),
            ("Puis je compte les sauts depuis", "l'origine, et non les traits.")], fs=34)
        self.au_mot("L'origine vaut")
        self.montrer_ligne(lignes[0], Indicate(z, color=ROUGE_ZERO, scale_factor=1.6))
        self.au_mot("Avant de lire")
        self.montrer_ligne(lignes[1], Indicate(sa[0], color=ARC, scale_factor=1.3))
        self.au_mot("Puis je compte")
        self.montrer_ligne(lignes[2], LaggedStart(*[Indicate(s, color=ARC, scale_factor=1.3) for s in sa[:3]],
                                                  lag_ratio=0.3))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_apprendre()
        self.ecran_origine()
        self.ecran_pas()
        self.ecran_lire_un()
        self.ecran_question1()
        self.ecran_demi_pas()
        self.ecran_demi_lire()
        self.ecran_question2()
        self.ecran_dixiemes_pas()
        self.ecran_dixiemes_lire()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("14-abonne")


class DemiDroiteLire6e(DemiDroiteLireBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "blanche"
