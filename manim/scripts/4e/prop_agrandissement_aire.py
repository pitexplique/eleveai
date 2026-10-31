# prop_agrandissement_aire.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 4 (agrandissements),
# épisode 12 PROPRE À LA 4e : AGRANDISSEMENT ET AIRE (micro du coach :
# agrandissement_aire), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : prop_agrandissement_aire_short.py (blanche).
# ⭐ Méthode travaillée : le PAVAGE. Le grand carré se pave par le petit :
# rapport 2 → 2 × 2 = 4 petits, rapport 3 → 3 × 3 = 9 petits ; rapport k →
# aire × k² ; dans l'autre sens, aire × 25 → côté × 5 (5 × 5 = 25). Pas de
# produit en croix ; « × » et « ÷ » écrits, jamais 5/2.
# ⭐ Le geste : la figure ET son image côte à côte, flèche « × k » ; les
# petits gâteaux glissent SUR le grand (k² carreaux).
# ⭐ Leurres (erreur classique : croire l'aire proportionnelle aux longueurs,
# « aire × k ») : question 1 : × 2 (aire × k), × 8 (k³, le volume) ;
# question 2 : 600 cm² (× 2), 2 400 cm² (× 8) ; question 3 : × 9 (même
# rapport que l'aire), × 81 (9 × 9). Écran 06 : « aire × 3 = 1 200 cm² »
# barré (l'apprenti).
#
# Décor et métier : CUISINE, Adam, PÂTISSIER, un gâteau carré de 20 cm et sa
# pâte à sucre, agrandi pour un mariage. Tous les nombres sont inventés (aucun
# fait réel dans la voix) : rien à sourcer, rien de faux (vérifié en Python :
# 20 × 20 = 400 ; 40 × 40 = 1 600 = 400 × 4 ; 60 × 60 = 3 600 = 400 × 9 ;
# 300 × 4 = 1 200 ; 5 × 5 = 25 ; 150 × 16 = 2 400).
# Centres d'intérêt : cuisine.
#
# Écrans : 00 garde · 01 Adam, le gâteau de 20 cm, le mariage (× 2) ·
# 02 400 cm² et 1 600 cm² · 03 le pavage : 4 petits gâteaux, aire × 4 ·
# 04 QUESTION 1 (× 2 → × 4) · 05 rapport 3 : 9 petits, 3 600 cm², k² ·
# 06 le piège de l'apprenti (× 3 barré, × 9) · 07 QUESTION 2 (300 cm² → 1 200
# cm²) · 08 dans l'autre sens : aire × 25 → côté × 5 · 09 QUESTION 3 (aire × 9
# → longueurs × 3) · 10 défi (la tarte de 150 cm², rapport 4) · 10b correction
# 2 400 cm² · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/4e-prop-agrandissement-aire.json (validée par Frédéric le
# 31/10, débit −10), WAV dans public/sons/4e-prop-agrandissement-aire/ ;
# marques mot à mot : manim/scripts/4e/prop_agrandissement_aire_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés). Ajouté ICI : gateau() (vu de dessus, biscuit + pâte à sucre),
# paver() (les k × k petits gâteaux posés sur le grand), cote() (la cote
# « 20 cm » sous ou à gauche d'un carré), fleche_k() (« × 2 » d'une figure à
# son image), tarte(), adam() (toque RECOPIÉE de 6e/prop_unite.py), gras(),
# sans(), ligne_rep() RECOPIÉE de prop_echelle_defi.py.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_agrandissement_aire.py PropAgrandissementAire4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_agrandissement_aire.py PropAgrandissementAire4e -o eleveai-maths-4e-prop-agrandissement-aire --media_dir manim/media-prop-4e-12
# Sortie : manim/sorties/4e/maths/proportionnalite/12-agrandissement-aire/eleveai-maths-4e-prop-agrandissement-aire.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

BISCUIT = "#d6a15e"     # le gâteau sans décor
BISCUIT_B = "#92400e"
SUCRE = "#f9a8d4"       # la pâte à sucre (rose)
SUCRE_B = "#be185d"
CERISE = "#dc2626"
AMBRE_F = "#f59e0b"
ENCRE = "#0f172a"
U = 0.06                # 1 cm du gâteau = 0,06 unité à l'écran


def gras(s, fs, couleur):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def sans(m):
    """Un décor ou un libellé redit partout : ni attente de synchro, ni audit."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def gateau(c, sucre=True, centre=ORIGIN, deco=True):
    """Un gâteau carré vu de dessus, de côté c (à l'écran) : le biscuit, la
    feuille de pâte à sucre (.sucre), une cerise au milieu (.deco)."""
    base = Square(c, fill_color=BISCUIT, fill_opacity=1, stroke_color=BISCUIT_B, stroke_width=3)
    feuille = Square(c * 0.9, fill_color=SUCRE, fill_opacity=1 if sucre else 0, stroke_color=SUCRE_B,
                     stroke_width=2, stroke_opacity=1 if sucre else 0)
    g = VGroup(base, feuille)
    g.base, g.sucre = base, feuille
    g.deco = VGroup()
    if deco:
        cer = Circle(radius=c * 0.07, fill_color=CERISE, fill_opacity=1, stroke_color="#7f1d1d", stroke_width=2)
        tige = Line(cer.get_top(), cer.get_top() + UR * c * 0.08, color="#166534", stroke_width=3)
        g.deco = VGroup(cer, tige)
        if not sucre:
            g.deco.set_opacity(0)
        g.add(g.deco)
    return g.move_to(centre)


def paver(grand, k, sucre=True, fabrique=None):
    """Les k × k petits gâteaux (ou tartes : fabrique) qui pavent le grand
    (ligne par ligne, du haut à gauche) : renvoyés, non ajoutés."""
    c = grand.base.width / k
    hg = grand.base.get_corner(UL)
    out = VGroup()
    for r in range(k):
        for q in range(k):
            ce = hg + RIGHT * c * (q + 0.5) + DOWN * c * (r + 0.5)
            out.add(fabrique(c, centre=ce) if fabrique else gateau(c, sucre, centre=ce))
    return out


def cote(carre, s, cote_=DOWN, couleur=BLEU_CALCUL, fs=26, buff=0.22):
    """La cote d'un côté du carré : un trait à bouts, le texte dessous (ou à gauche)."""
    if np.allclose(cote_, DOWN):
        a, b = carre.get_corner(DL) + DOWN * buff, carre.get_corner(DR) + DOWN * buff
        bout = UP * 0.1
    else:
        a, b = carre.get_corner(DL) + LEFT * buff, carre.get_corner(UL) + LEFT * buff
        bout = RIGHT * 0.1
    tr = VGroup(Line(a, b, color=couleur, stroke_width=4), Line(a - bout, a + bout, color=couleur, stroke_width=4),
                Line(b - bout, b + bout, color=couleur, stroke_width=4))
    t = gras(s, fs, couleur)
    if not np.allclose(cote_, DOWN) and "cm" in s:
        t.rotate(PI / 2)  # une cote verticale se lit de bas en haut, comme sur un plan
    t.next_to(tr, cote_, buff=0.1)
    g = VGroup(tr, t)
    g.trait, g.texte = tr, t
    return g


def fleche_k(a, b, s, couleur=AMBRE_F, fs=34, angle=-0.8):
    """La flèche courbe « × 2 » du haut de la figure a au haut de son image b."""
    fl = CurvedArrow(a.get_top() + UP * 0.12, b.get_top() + UP * 0.12 + LEFT * b.width * 0.25, angle=angle,
                     color=couleur, stroke_width=6, tip_length=0.22)
    et = gras(s, fs, AMBRE).next_to(fl.point_from_proportion(0.5), UL, buff=0.12)
    g = VGroup(fl, et)
    g.fleche, g.etiquette = fl, et
    return g


def barre(m, couleur=ROUGE_ERREUR, sw=6):
    """Un trait qui BARRE une ligne fausse (elle reste lisible, une croix la cachait)."""
    return Line(m.get_left() + LEFT * 0.08, m.get_right() + RIGHT * 0.08, color=couleur, stroke_width=sw)


def toque(p):
    """RECOPIÉE de 6e/prop_unite.py : une toque blanche sur la tête de p."""
    c = p.tete.get_center()
    r = p.tete.width / 2
    bande = RoundedRectangle(width=r * 1.9, height=r * 0.45, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(c + UP * r * 0.95)
    bouffe = VGroup(*[Circle(radius=r * 0.48, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                      .move_to(c + UP * r * 1.55 + RIGHT * x * r) for x in (-0.5, 0, 0.5)])
    return VGroup(bouffe, bande)


def adam(s=1.0):
    """Adam, pâtissier : veste blanche à boutons, toque, tablier rose."""
    p = personne(peau="#c68642", tenue="#f8fafc", cheveux="#1f2937", s=s)
    cb = p.corps.get_bottom()
    tablier = RoundedRectangle(width=0.9 * s, height=0.85 * s, corner_radius=0.08 * s, fill_color=SUCRE_B,
                               fill_opacity=1, stroke_width=0).move_to(cb + UP * 0.45 * s)
    boutons = VGroup(*[Dot(radius=0.04 * s, color="#94a3b8").move_to(p.corps.get_center() + P(x * s, y * s))
                       for x in (-0.12, 0.12) for y in (0.45, 0.25)])
    p.add(tablier, boutons, toque(p))
    return p


def tarte(c, centre=ORIGIN):
    """Une tarte carrée vue de dessus : pâte dorée, crème, fraises."""
    pate = Square(c, fill_color="#f59e0b", fill_opacity=1, stroke_color="#78350f", stroke_width=3)
    creme = Square(c * 0.82, fill_color="#fef3c7", fill_opacity=1, stroke_width=0)
    fr_ = VGroup(*[Circle(radius=c * 0.09, fill_color="#e11d48", fill_opacity=1, stroke_width=0)
                   .move_to(P(x * c * 0.22, y * c * 0.22)) for x in (-1, 0, 1) for y in (-1, 0, 1)])
    g = VGroup(pate, creme, fr_)
    g.base = pate
    return g.move_to(centre)


class PropAgrandissementAireBase(PaysageProp):
    nom_voix = "4e-prop-agrandissement-aire"
    fichier_marques = "prop_agrandissement_aire_marques.json"

    def ligne_rep(self, i, morceaux, fs=None):
        """RECOPIÉE de prop_echelle_defi.py (← prop_tableau.py) : la ligne de
        réponse garde la taille de la phrase qu'elle remplace."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def lc(self, morceaux, y, fs=40, xl=None):
        """Une ligne de la colonne de droite (non jouée), qui s'arrête à 6,15 :
        agrandie pour insister (× 1,12) ou encadrée, elle garde ses 3 %."""
        return self.borner(self.col(self.ligne(morceaux, fs), y, xl))

    def borner(self, m, droite=6.15):
        g = m.get_left()[0]
        if m.get_right()[0] > droite:
            m.scale_to_fit_width(droite - g).align_to(P(g, 0), LEFT)
        return m

    def montre(self, mot, *anims, n=1, rt=0.4):
        self.au_mot(mot, n)
        self.play(*anims, run_time=rt)

    def deux_gateaux(self, k=2, xs=(-3.7, -1.25), bas=-0.8):
        """Le petit gâteau (20 cm) et son image (k fois plus grand), posés sur
        la même ligne de base (non ajoutés)."""
        p = gateau(20 * U)
        g = gateau(20 * k * U)
        p.move_to(P(xs[0], bas + p.height / 2))
        g.move_to(P(xs[1], bas + g.height / 2))
        return p, g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Agrandissement et aire", self.identite, self.ceinture, y_ech=-2.45)
        p, g = self.deux_gateaux(xs=(-4.6, -2.2), bas=-1.15)
        self.au_mot("Un gâteau")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(p, scale=0.8), run_time=0.8)
        q1 = self.t("Deux fois plus grand…", 38)
        q2 = self.t("deux fois plus de décor ?", 38, AMBRE)
        VGroup(q1, q2).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        self.borner(self.col(q1, 0.75, 0.6))
        self.borner(self.col(q2, 0.05, 0.6))
        self.au_mot("deux fois plus grand")
        self.play(TransformFromCopy(p, g), FadeIn(q1, shift=UP * 0.15), run_time=0.7)
        self.au_mot("Faut-il")
        self.play(FadeIn(q2, shift=UP * 0.15), Indicate(g.sucre, color=SUCRE_B, scale_factor=1.05), run_time=0.5)
        self.insister(q2, 1.1, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Adam, pâtissier ; le gâteau de 20 cm ; le mariage ──────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = adam(0.8).move_to(P(-5.75, -1.25))
        nom = self.t("Adam", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.2)
        self.montre("Voici Adam", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("pâtissier", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        self.montre("pâtissier", FadeIn(met, shift=DOWN * 0.1))
        p, g = self.deux_gateaux()
        p.sucre.set_opacity(0), p.deco.set_opacity(0)
        L0 = self.lc([("Un gâteau carré", WHITE)], 2.6)
        self.montre("un gâteau carré", FadeIn(p.base, scale=0.8), FadeIn(L0, shift=RIGHT * 0.2), rt=0.5)
        c20 = cote(p.base, "20 cm")
        L1 = self.lc([("Côté :", WHITE), ("20 cm", BLEU_CALCUL)], 1.8)
        sans(L1[0])
        self.montre("20 cm", Create(c20.trait), FadeIn(c20.texte, scale=1.3), FadeIn(L1, shift=RIGHT * 0.2))
        self.insister(c20.texte, 1.2, 0.2)
        L2 = self.lc([("Dessus :", WHITE), ("pâte à sucre", SUCRE)], 1.0)
        sans(L2[0])
        self.au_mot("Sur le dessus")
        self.play(Indicate(p.base, color=AMBRE, scale_factor=1.06), run_time=0.5)
        self.montre("feuille", p.sucre.animate.set_opacity(1), p.deco.animate.set_opacity(1), rt=0.6)
        self.montre("pâte à sucre", FadeIn(L2, shift=RIGHT * 0.2))
        L3 = self.lc([("Mariage :", WHITE), ("2 fois plus grand", AMBRE)], 0.0)
        self.montre("Pour un mariage", FadeIn(L3[0], shift=RIGHT * 0.2))
        fl = fleche_k(p, g, "× 2")
        self.montre("le même gâteau", TransformFromCopy(p, g), rt=0.8)
        self.montre("2 fois plus grand", FadeIn(L3[1], scale=1.2), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3))
        L4 = self.lc([("2 fois plus de", ORANGE_RETENUE), ("pâte à sucre ?", ORANGE_RETENUE)], -1.0, fs=40)
        self.montre("Lui faut-il", Indicate(g.sucre, color=SUCRE_B, scale_factor=1.04), rt=0.4)
        self.montre("2 fois plus de", FadeIn(L4[0], shift=UP * 0.15))
        self.montre("pâte à sucre ?", FadeIn(L4[1], shift=UP * 0.15))
        self.insister(L4, 1.08, 0.25)
        self.attendre_voix()

    # ── 02 : 400 cm² et 1 600 cm² ───────────────────────────────────────────
    def ecran_aire(self):
        self.ecran("02-aire")
        p, g = self.deux_gateaux(xs=(-4.5, -1.1))
        self.add(p, g)
        a, b = cote(p.base, "20 cm"), cote(p.base, "20 cm", LEFT)
        L1 = self.lc([("20 cm ×", WHITE), ("20 cm", WHITE)], 2.5, fs=44)
        L1.add(self.lc([("= 400 cm²", VERT_OK)], 1.75, fs=44))
        self.montre("Le dessus du petit", Indicate(p.sucre, color=AMBRE, scale_factor=1.08), rt=0.5)
        self.montre("20 cm", Create(a.trait), FadeIn(a.texte, scale=1.3), FadeIn(L1[0], shift=RIGHT * 0.2))
        self.montre("20 cm", Create(b.trait), FadeIn(b.texte, scale=1.3), FadeIn(L1[1], shift=RIGHT * 0.2), n=2)
        i400 = gras("400 cm²", 26, VERT_OK).next_to(p, UP, buff=0.15)
        self.montre("égale 400", FadeIn(L1[2], scale=1.3), FadeIn(i400, scale=1.3))
        self.insister(L1[2], 1.12, 0.2)
        c, d = cote(g.base, "40 cm"), cote(g.base, "40 cm", LEFT)
        self.montre("Le grand gâteau", Indicate(g.sucre, color=AMBRE, scale_factor=1.04), rt=0.5)
        self.montre("40 cm", Create(c.trait), Create(d.trait), FadeIn(c.texte, scale=1.3), FadeIn(d.texte, scale=1.3))
        L2 = self.lc([("40 cm ×", WHITE), ("40 cm", WHITE)], 0.6, fs=44)
        L2.add(self.lc([("= 1 600 cm²", VERT_OK)], -0.15, fs=44))
        self.montre("40 fois", FadeIn(L2[0], shift=RIGHT * 0.2))
        self.montre("40, égale", FadeIn(L2[1], shift=RIGHT * 0.2), rt=0.3)
        i1600 = gras("1 600 cm²", 30, VERT_OK).next_to(g, UP, buff=0.15)
        self.montre("1 600", FadeIn(L2[2], scale=1.3), FadeIn(i1600, scale=1.3))
        self.insister(L2[2], 1.12, 0.2)
        self.attendre_voix()

    # ── 03 : le pavage : 4 petits gâteaux sur le grand ──────────────────────
    def poser_tuiles(self, source, tuiles, rt=1.4, lag=0.25):
        """Des copies du petit gâteau glissent sur leurs places du grand."""
        self.play(LaggedStart(*[TransformFromCopy(source, t) for t in tuiles], lag_ratio=lag), run_time=rt)

    def ecran_carreaux(self):
        self.ecran("03-carreaux")
        p, g = self.deux_gateaux(xs=(-4.5, -1.1))
        self.add(p, g)
        tu = paver(g, 2)
        self.au_mot("On pose")
        self.poser_tuiles(p, tu, rt=1.6)
        L0 = self.lc([("Il en tient", WHITE), ("4 !", VERT_OK)], 2.6, fs=46)
        self.montre("il en tient 4", FadeIn(L0, scale=1.2), Circumscribe(g.base, color=VERT_OK, buff=0.06))
        self.insister(L0[1], 1.3, 0.2)
        fb = cote(g.base, "× 2", couleur=AMBRE, fs=32)
        fg = cote(g.base, "× 2", LEFT, couleur=AMBRE, fs=32)
        L1 = self.lc([("2 fois plus long,", WHITE)], 1.75, fs=38)
        L1b = self.lc([("2 fois plus large", WHITE)], 1.1, fs=38)
        self.montre("2 fois plus long", Create(fb.trait), FadeIn(fb.texte, scale=1.3), FadeIn(L1, shift=RIGHT * 0.2))
        self.montre("2 fois plus large", Create(fg.trait), FadeIn(fg.texte, scale=1.3),
                    FadeIn(L1b, shift=RIGHT * 0.2))
        L2 = self.lc([("2 × 2", WHITE), ("= 4", VERT_OK)], 0.3, fs=46)
        self.montre("2 fois 2", FadeIn(L2[0], shift=RIGHT * 0.2))
        self.montre("égale 4", FadeIn(L2[1], scale=1.3))
        L3 = self.lc([("L'aire", WHITE), ("× 4", VERT_OK)], -0.55, fs=46)
        self.montre("L'aire est", FadeIn(L3[0], shift=RIGHT * 0.2), rt=0.3)
        self.montre("par 4", FadeIn(L3[1], scale=1.3), rt=0.35)
        car = self.encadrer(VGroup(L3), AMBRE)
        self.play(Create(car), run_time=0.35)
        L4 = self.lc([("4 fois plus", VERT_OK), ("de pâte à sucre", VERT_OK)], -1.45, fs=36)
        self.montre("Il faut 4", FadeIn(L4[0], shift=UP * 0.15),
                    LaggedStart(*[Indicate(t.sucre, color=SUCRE_B, scale_factor=1.06) for t in tu], lag_ratio=0.2),
                    rt=0.9)
        self.montre("de pâte à sucre", FadeIn(L4[1], shift=UP * 0.15), rt=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (on double les longueurs : aire × ?) ────────────────
    def figure_q(self, k, fab=None, xs=(-4.6, -1.9), bas=-1.0, c=1.0):
        """Une figure de question SANS nombre : le petit carré et son image k
        fois plus grande (vide : son pavage n'arrive qu'à la réponse)."""
        fab = fab or (lambda cc, centre=ORIGIN: gateau(cc, centre=centre))
        p = fab(c)
        p.move_to(P(xs[0], bas + c / 2))
        g = fab(c * k)
        g.move_to(P(xs[1], bas + c * k / 2))
        return p, g

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        p, g = self.figure_q(2, c=1.25, xs=(-4.7, -1.9))
        self.add(p, g)
        tu = paver(g, 2)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["2 × 2", "= 4."])
            l1 = sc.ligne_rep(1, ["L'aire est multipliée", "par 4."])
            sc.au_mot("2 fois 2")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), LaggedStart(*[FadeIn(t, scale=0.7) for t in tu], lag_ratio=0.2),
                    run_time=0.5)
            for m, mot in ((l0[1], "égale 4"), (l1[0], "L'aire"), (l1[1], "par 4")):
                sc.au_mot(mot)
                sc.play(FadeIn(m, shift=UP * 0.15), run_time=0.3)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["On double toutes les longueurs", "d'un carré.", "Son aire est multipliée par…"],
                            [self.t("2", 34), self.t("4", 34), self.t("8", 34)], 1,
                            ["2 × 2 = 4.", "L'aire est multipliée par 4."], mot_q="On double", autres_r=apres)

    # ── 05 : rapport 3 : 9 petits gâteaux ; rapport k : aire × k² ───────────
    def ecran_trois(self):
        self.ecran("05-trois")
        p = gateau(20 * U).move_to(P(-5.6, -1.15))
        g = gateau(60 * U).move_to(P(-1.55, 0.05))
        self.add(p)
        fl = fleche_k(p, g, "× 3")
        L0 = self.lc([("3 fois plus grand", AMBRE)], 2.75)
        self.montre("3 fois plus grand", TransformFromCopy(p, g), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3),
                    FadeIn(L0, shift=RIGHT * 0.2), rt=0.8)
        c60 = cote(g.base, "60 cm")
        L1 = self.lc([("Côté :", WHITE), ("60 cm", BLEU_CALCUL)], 2.05)
        sans(L1[0])
        self.montre("60 cm", Create(c60.trait), FadeIn(c60.texte, scale=1.3), FadeIn(L1, shift=RIGHT * 0.2))
        L2 = self.lc([("3 × 3", WHITE), ("= 9", VERT_OK)], 1.35, fs=44)
        self.montre("3 fois 3", FadeIn(L2[0], shift=RIGHT * 0.2))
        self.montre("égale 9", FadeIn(L2[1], scale=1.3))
        tu = paver(g, 3)
        L3 = self.lc([("9 petits gâteaux", VERT_OK)], 0.7, fs=38)
        self.au_mot("il tient 9")
        self.play(FadeIn(L3, shift=RIGHT * 0.2), run_time=0.3)
        self.poser_tuiles(p, tu, rt=1.5, lag=0.12)
        L4 = self.lc([("400 cm² × 9", WHITE), ("= 3 600 cm²", VERT_OK)], 0.0, fs=40)
        self.montre("400 fois 9", FadeIn(L4[0], shift=RIGHT * 0.2))
        self.montre("égale 3 600", FadeIn(L4[1], scale=1.3))
        self.insister(L4[1], 1.1, 0.2)
        L5 = VGroup(self.lc([("Rapport k :", AMBRE)], -0.85, fs=42))
        L5.add(*self.lc([("aire", WHITE), ("× k × k", WHITE), ("= k²", VERT_OK)], -1.55, fs=44))
        cad = self.encadrer(L5, AMBRE)
        self.montre("rapport k", FadeIn(L5[0], shift=RIGHT * 0.2), Create(cad))
        self.montre("l'aire", FadeIn(L5[1], shift=RIGHT * 0.2), rt=0.3)
        self.montre("k fois k", FadeIn(L5[2], shift=RIGHT * 0.2))
        self.montre("k au carré", FadeIn(L5[3], scale=1.4))
        self.insister(VGroup(cad, L5), 1.06, 0.25)
        self.attendre_voix()

    # ── 06 : le piège de l'apprenti : aire × 3 (barré) → aire × 9 ───────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-3.1, 3.05))
        self.montre("Attention", Write(tit), rt=0.5)
        g = gateau(60 * U, sucre=False).move_to(P(-1.55, -0.05))
        app = adam(0.55).move_to(P(-5.3, -1.1))
        app[0].set_fill("#a78bfa")  # une autre veste : ce n'est pas Adam
        nom = self.t("un apprenti", 26, "#a78bfa").next_to(app, DOWN, buff=0.15)
        self.montre("Un apprenti", FadeIn(app, shift=UP * 0.2), FadeIn(nom), FadeIn(g, scale=0.9))
        tu = paver(g, 3)
        L1 = self.lc([("Aire × 3", ROUGE_ERREUR), ("= 1 200 cm²", ROUGE_ERREUR)], 2.3, fs=42)
        self.montre("par 3 seulement", FadeIn(L1[0], shift=RIGHT * 0.2))
        self.montre("1 200", FadeIn(L1[1], scale=1.2), LaggedStart(*[FadeIn(t, shift=DOWN * 0.3) for t in tu[:3]],
                                                                      lag_ratio=0.3), rt=0.8)
        vide = DashedVMobject(Rectangle(width=g.base.width - 0.12, height=g.base.height * 2 / 3 - 0.12,
                                        color=ROUGE_ERREUR, stroke_width=6), num_dashes=40)
        vide.move_to(g.base.get_bottom() + UP * g.base.height / 3)
        L2 = self.lc([("Pas assez de pâte à sucre !", ROUGE_ERREUR)], 1.5, fs=34)
        cr = barre(L1)
        self.montre("Pas assez", Create(vide), Create(cr), FadeIn(L2, shift=UP * 0.15), rt=0.5)
        L3 = self.lc([("Aire = longueur × longueur", WHITE)], 0.6, fs=36)
        self.montre("Une aire", FadeIn(L3, shift=RIGHT * 0.2))
        fb = cote(g.base, "× 3", couleur=AMBRE, fs=32)
        fg = cote(g.base, "× 3", LEFT, couleur=AMBRE, fs=32)
        L4 = self.lc([("Chacune :", WHITE), ("× 3", AMBRE)], -0.25, fs=40)
        self.montre("Chacune", FadeIn(L4[0], shift=RIGHT * 0.2), rt=0.3)
        self.montre("par 3", Create(fb.trait), Create(fg.trait), FadeIn(fb.texte, scale=1.3), FadeIn(fg.texte, scale=1.3),
                    FadeIn(L4[1], scale=1.3), n=2)
        L5 = self.lc([("Donc l'aire", WHITE), ("× 9", VERT_OK)], -1.2, fs=46)
        cad = self.encadrer(L5, VERT_OK)
        self.montre("Donc l'aire", FadeIn(L5[0], shift=RIGHT * 0.2), rt=0.3)
        self.au_mot("par 9")
        self.play(FadeIn(L5[1], scale=1.3), Create(cad), FadeOut(vide), run_time=0.35)
        self.play(LaggedStart(*[FadeIn(t, shift=DOWN * 0.3) for t in tu[3:]], lag_ratio=0.12), run_time=0.9)
        self.insister(VGroup(cad, L5), 1.08, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (300 cm², rapport 2 → 1 200 cm²) ────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        p, g = self.figure_q(2, c=1.25, xs=(-4.7, -1.9))
        self.add(p, g)
        tu = paver(g, 2)

        def apres(sc):
            sc.au_mot("rapport 2")
            sc.rep(0, avec=[LaggedStart(*[FadeIn(t, scale=0.7) for t in tu], lag_ratio=0.2)])
            sc.rep_fin()

        self.question_pause("07-question", "07b-reponse",
                            ["Le dessus d'un gâteau : 300 cm².", "On l'agrandit avec un rapport 2.",
                             "Quelle est la nouvelle aire ?"],
                            [self.t("600 cm²", 34), self.t("1 200 cm²", 34), self.t("2 400 cm²", 34)], 1,
                            ["Rapport 2 : aire × 4.", "300 cm² × 4 = 1 200 cm²."], mot_q="Le dessus", autres_r=apres)

    # ── 08 : dans l'autre sens : décor × 25 → côté × 5 ──────────────────────
    def ecran_retrouver(self):
        self.ecran("08-retrouver")
        tit = self.t("Dans l'autre sens", 44, JAUNE_TITRE).move_to(P(-3.1, 3.05))
        self.montre("Dans l'autre sens", Write(tit), rt=0.5)
        cli = personne(peau="#e0ac69", tenue="#0ea5e9", cheveux="#7c2d12", longs=True, s=0.5).move_to(P(-5.5, 1.5))
        nom = self.t("une cliente", 24, "#38bdf8").next_to(cli, DOWN, buff=0.12)
        p = gateau(0.6).move_to(P(-5.6, -1.4))
        g = gateau(3.0, sucre=False).move_to(P(-2.0, -0.2))
        self.montre("Une cliente", FadeIn(cli, shift=UP * 0.2), FadeIn(nom), FadeIn(p), FadeIn(g, scale=0.9), rt=0.5)
        L1 = self.lc([("Décor", WHITE), ("× 25", AMBRE)], 2.3, fs=44)
        self.montre("veut 25", FadeIn(L1, shift=RIGHT * 0.2), Indicate(g.base, color=AMBRE, scale_factor=1.03))
        L2 = self.lc([("Côté :", WHITE), ("× ?", ORANGE_RETENUE)], 1.45, fs=44)
        self.montre("Par combien", FadeIn(L2, shift=RIGHT * 0.2), rt=0.35)
        self.play(Indicate(L2[1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.5)
        L3 = self.lc([("? × ? =", WHITE), ("25", AMBRE)], 0.6, fs=44)
        sans(L3[0])
        self.montre("Quel nombre", FadeIn(L3[0], shift=RIGHT * 0.2), rt=0.35)
        self.montre("donne 25", FadeIn(L3[1], scale=1.3), rt=0.35)
        tu = paver(g, 5)
        fb = cote(g.base, "× 5", couleur=AMBRE, fs=32)
        fg = cote(g.base, "× 5", LEFT, couleur=AMBRE, fs=32)
        L4 = self.lc([("5 × 5", WHITE), ("= 25", VERT_OK)], -0.25, fs=46)
        self.montre("5 fois 5", FadeIn(L4[0], shift=RIGHT * 0.2), Create(fb.trait), Create(fg.trait),
                    FadeIn(fb.texte, scale=1.3), FadeIn(fg.texte, scale=1.3))
        self.play(LaggedStart(*[FadeIn(t, scale=0.6) for t in tu], lag_ratio=0.04), run_time=1.0)
        self.montre("égale 25", FadeIn(L4[1], scale=1.3), rt=0.35)
        L5 = self.ligne([("Côté", VERT_OK), ("× 5", VERT_OK)], 44)
        L5b = self.t("pas × 25", 44, ROUGE_ERREUR)
        VGroup(L5, L5b).arrange(RIGHT, buff=0.6)
        self.borner(self.col(VGroup(L5, L5b), -1.2))
        cad = self.encadrer(L5, VERT_OK)
        self.montre("Le côté est", FadeIn(L5[0], shift=RIGHT * 0.2), Create(cad), rt=0.35)
        self.montre("par 5", FadeIn(L5[1], scale=1.3), rt=0.35)
        cr = barre(L5b)
        self.montre("pas par 25", FadeIn(L5b, shift=RIGHT * 0.2), rt=0.3)
        self.play(Create(cr), run_time=0.3)
        self.insister(VGroup(cad, L5), 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : QUESTION 3 (aire × 9 → longueurs × 3) ──────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        p, g = self.figure_q(3, c=0.85, xs=(-5.2, -2.1), bas=-1.3)
        self.add(p, g)
        tu = paver(g, 3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["3 × 3", "= 9."])
            l1 = sc.ligne_rep(1, ["Les longueurs :", "× 3."])
            sc.au_mot("3 fois 3")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), LaggedStart(*[FadeIn(t, scale=0.7) for t in tu], lag_ratio=0.1),
                    run_time=0.6)
            for m, mot in ((l0[1], "égale 9"), (l1[0], "Les longueurs"), (l1[1], "par 3")):
                sc.au_mot(mot)
                sc.play(FadeIn(m, shift=UP * 0.15), run_time=0.3)
            sc.rep_fini()

        self.question_pause("09-question", "09b-reponse",
                            ["L'aire d'un gâteau a été", "multipliée par 9.", "Et ses longueurs ?"],
                            [self.t("× 9", 34), self.t("× 3", 34), self.t("× 81", 34)], 1,
                            ["3 × 3 = 9.", "Les longueurs : × 3."], mot_q="L'aire", autres_r=apres)

    # ── 10 : défi : la tarte de 150 cm², rapport 4 ──────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-2.6, 3.05))
        self.montre("À toi de jouer", Write(tit), rt=0.6)
        ta = tarte(1.5).move_to(P(-2.6, 0.5))
        L0 = self.lc([("Tarte :", WHITE), ("150 cm²", BLEU_CALCUL)], 2.2, fs=42, xl=1.3)
        sans(L0[0])
        self.montre("une tarte", FadeIn(ta, scale=0.8), rt=0.45)
        i150 = gras("150 cm²", 30, BLEU_CALCUL).next_to(ta, DOWN, buff=0.2)
        self.montre("150", FadeIn(L0, shift=RIGHT * 0.2), FadeIn(i150, scale=1.3))
        pers = adam(0.8).move_to(P(-5.5, -0.9))
        L1 = self.lc([("Rapport", WHITE), ("4", AMBRE)], 1.3, fs=42, xl=1.3)
        self.montre("Adam l'agrandit", FadeIn(pers, shift=RIGHT * 0.3), rt=0.45)
        self.montre("rapport 4", FadeIn(L1, scale=1.2))
        L2 = self.lc([("Nouvelle aire :", WHITE), ("? cm²", ORANGE_RETENUE)], 0.4, fs=42, xl=1.3)
        L2[1].sans_synchro = True
        self.montre("la nouvelle aire", FadeIn(L2, shift=RIGHT * 0.2))
        self.play(Indicate(L2[1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.5)
        self.pause_defi(y=-0.75)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-2.6, 3.05))
        self.play(Write(tit), run_time=0.5)
        p = tarte(0.75).move_to(P(-5.7, -1.3))
        g = tarte(3.0).move_to(P(-2.0, -0.3))
        place = DashedVMobject(Square(3.0, color="#f59e0b", stroke_width=4), num_dashes=40).move_to(g)
        self.add(p)
        self.play(Create(place), run_time=0.35)
        L1 = self.lc([("Rapport 4 :", AMBRE)], 2.2, fs=42)
        self.montre("rapport 4", FadeIn(L1, shift=RIGHT * 0.2))
        tu = paver(g, 4, fabrique=tarte)
        fb = cote(g.base, "× 4", couleur=AMBRE, fs=32)
        fg = cote(g.base, "× 4", LEFT, couleur=AMBRE, fs=32)
        L2 = self.lc([("4 × 4", WHITE), ("= 16", VERT_OK)], 1.35, fs=46)
        self.montre("4 fois 4", FadeIn(L2[0], shift=RIGHT * 0.2), Create(fb.trait), Create(fg.trait),
                    FadeIn(fb.texte, scale=1.3), FadeIn(fg.texte, scale=1.3))
        self.play(LaggedStart(*[TransformFromCopy(p, t) for t in tu], lag_ratio=0.06), run_time=1.1)
        self.montre("égale 16", FadeIn(L2[1], scale=1.3), rt=0.35)
        L3 = self.lc([("150 cm² × 16", WHITE)], 0.45, fs=44)
        self.montre("150 fois 16", FadeIn(L3, shift=RIGHT * 0.2))
        L4 = self.lc([("= 2 400 cm²", VERT_OK)], -0.5, fs=50)
        cad = self.encadrer(L4, VERT_OK)
        self.montre("égale 2 400", FadeIn(L4, scale=1.3), Create(cad))
        self.insister(VGroup(cad, L4), 1.08, 0.25)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        p = gateau(0.9).move_to(P(-5.0, -0.5))
        g = gateau(1.8).move_to(P(-2.4, -0.05))
        tu = paver(g, 2)
        fl = fleche_k(p, g, "× k")
        fig = sans(VGroup(p, g, tu, fl))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Longueurs × k", "→ aire × k²"),
            ("Rapport 2 : aire × 4",),
            ("Rapport 3 : aire × 9",),
            ("Jamais l'aire × k !",)], fs=36)
        lignes[3][1].set_color(ROUGE_ERREUR)
        self.au_mot("Si les longueurs")
        self.montrer_ligne(lignes[0], Indicate(fl.etiquette, color=AMBRE))
        self.au_mot("Rapport 2")
        self.montrer_ligne(lignes[1], Circumscribe(g.base, color=VERT_OK, buff=0.05))
        self.au_mot("Rapport 3")
        self.montrer_ligne(lignes[2])
        self.au_mot("Jamais")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_aire()
        self.ecran_carreaux()
        self.ecran_question1()
        self.ecran_trois()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_retrouver()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class PropAgrandissementAire4e(PropAgrandissementAireBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
