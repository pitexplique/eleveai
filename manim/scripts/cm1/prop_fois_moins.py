# prop_fois_moins.py
# EleveAI — Maths CM1 — série « Proportionnalité » CM, lot CM-A, épisode 03 :
# FOIS MOINS (micro du coach : prop_fois_moins), CM1 SEUL, AVEC VOIX. Paysage
# 16:9, CEINTURE VERTE (la paysage complète du niveau : situation, schéma de
# billes, ÷ 2 puis ÷ 3, le piège « 3 fois moins ≠ 3 de moins », 2 questions-
# pauses, défi corrigé). Short jumeau : prop_fois_moins_short.py (blanche,
# Ti-Margo et les moustiques).
# ⭐ Méthode travaillée : « n fois moins » = on DIVISE les deux quantités par le
# même nombre ; elle se VOIT sur le schéma de billes : 12 litres = 12 ronds en
# 6 colonnes, UNE PAR MUR ; 2 fois moins = les 6 colonnes en 2 paquets de 3,
# on en garde un ; 3 fois moins = 3 paquets de 2, on en garde un. ⛔ Pas de produit en croix ; « ÷ » écrit, la voix dit « divisé par ».
# ⭐ Leurres : 1. enlever au lieu de diviser (question 2 : 10 = 15 − 5 ;
# piège : 9 = 12 − 3) ; 3. inverser × et ÷ (question 1 : 48 = 24 × 2 ;
# question 2 : 75 = 15 × 5) ; question 1 : 22 = 24 − 2.
#
# Décor et métier : ART-DESIGN, Malik, PEINTRE EN BÂTIMENT : ses murs et ses
# pots de peinture, puis des volets (défi). Centres d'intérêt : art-design.
# Ordre de grandeur (pas de fait réel cité par la voix) : 12 litres pour
# 6 murs = 2 litres par mur ; un litre de peinture couvre environ 10 m² par
# couche, un mur de chambre en deux couches en demande bien 2 litres environ.
#
# Micro → écrans : situation (01), les billes (02), 2 fois moins (03), 3 fois
# moins (04), QUESTION 1 (05), le piège (06), QUESTION 2 (07), défi (08) et
# correction (08b), ce que tu as appris (09), fin (10).
#
# Voix : manim/voix/cm1-prop-fois-moins.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/cm1-prop-fois-moins/ ; marques mot à mot :
# manim/scripts/cm1/prop_fois_moins_marques.json (scripts/marques_dump.ps1 puis
# scripts/cues2marques.py).
# Outils : ../6e/prop_commun.py + manim/canvas_proportion.py (Billes,
# TableauProp), non modifiés. Ajouté ICI : malik() (casquette, rouleau),
# mur(), pot(), volet(), schema() (les murs au-dessus de leur colonne de
# billes) et ligne_rep() bornée (comme prop_tableau.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/prop_fois_moins.py PropFoisMoinsCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/prop_fois_moins.py PropFoisMoinsCM1 -o eleveai-maths-cm1-prop-fois-moins --media_dir manim/scripts/cm1/media-prop-fois-moins
# Sortie : manim/sorties/cm1/maths/proportionnalite/03-fois-moins/eleveai-maths-cm1-prop-fois-moins.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

PEINTURE = "#a78bfa"     # la peinture de Malik (violet, lisible sur le noir)
PEINTURE_F = "#6d28d9"
MUR = "#e2e8f0"          # un mur pas encore peint
MUR_BORD = "#94a3b8"
BOIS = "#16a34a"         # les volets (vert)
BOIS_F = "#14532d"

ECART = 0.75   # écart des colonnes (une par mur) du schéma
XC = -2.9      # le centre du schéma, dans la moitié gauche
Y_MUR = 1.75   # la rangée des murs
Y_B0 = 0.55    # la première rangée de billes


def malik(s=1.0):
    """Malik, peintre en bâtiment : combinaison blanche, casquette, rouleau."""
    p = personne(peau="#5c3a21", tenue="#f8fafc", cheveux="#111827", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    casq = VGroup(AnnularSector(inner_radius=0, outer_radius=r * 1.05, angle=PI, start_angle=0, fill_color=PEINTURE_F,
                                fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55),
                  RoundedRectangle(width=r * 1.3, height=r * 0.2, corner_radius=r * 0.08, fill_color=PEINTURE_F,
                                   fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.32 + RIGHT * r * 0.8))
    taches = VGroup(*[Dot(p.corps.get_center() + P(x, y) * s, radius=0.05 * s, color=PEINTURE)
                      for x, y in ((-0.25, 0.3), (0.2, -0.2), (-0.1, -0.6))])
    manche = Line(P(0, 0), P(0, 0.9 * s), color="#a16207", stroke_width=6 * s)
    rouleau = RoundedRectangle(width=0.62 * s, height=0.24 * s, corner_radius=0.1 * s, fill_color=PEINTURE,
                               fill_opacity=1, stroke_color=PEINTURE_F, stroke_width=3).move_to(P(0, 1.0 * s))
    outil = VGroup(manche, rouleau).move_to(p.corps.get_right() + P(0.25 * s, 0.55 * s))
    p.add(casq, taches, outil)
    return p


def mur(w=0.6, h=0.62, peint=False):
    """Un mur : un rectangle de briques (gris clair), violet s'il est peint."""
    fond = Rectangle(width=w, height=h, fill_color=PEINTURE if peint else MUR, fill_opacity=1,
                     stroke_color=MUR_BORD, stroke_width=2)
    joints = VGroup(*[Line(P(-w / 2, y), P(w / 2, y)) for y in (-h / 6, h / 6)],
                    *[Line(P(x, y0), P(x, y0 + h / 3)) for x, y0 in ((0, h / 6), (-w / 4, -h / 6), (w / 4, -h / 6),
                                                                      (0, -h / 2))])
    joints.set_stroke(MUR_BORD, 1.5)
    g = VGroup(fond, joints)
    g.fond = fond
    return g


def pot(s=1.0, etiquette=None):
    """Un pot de peinture : seau, anse, coulure violette ; étiquette optionnelle."""
    corps = Polygon(P(-0.38, 0.35), P(0.38, 0.35), P(0.32, -0.35), P(-0.32, -0.35), fill_color="#cbd5e1",
                    fill_opacity=1, stroke_color="#64748b", stroke_width=3)
    dessus = Ellipse(width=0.76, height=0.16, fill_color=PEINTURE, fill_opacity=1, stroke_color="#64748b",
                     stroke_width=3).move_to(P(0, 0.35))
    coul = RoundedRectangle(width=0.12, height=0.3, corner_radius=0.05, fill_color=PEINTURE, fill_opacity=1,
                            stroke_width=0).move_to(P(-0.18, 0.2))
    anse = Arc(radius=0.36, start_angle=0.15, angle=PI - 0.3, arc_center=P(0, 0.38), stroke_color="#475569",
               stroke_width=4)
    g = VGroup(anse, corps, coul, dessus)
    if etiquette:
        g.add(Text(etiquette, font_size=22, color=NUIT, weight=BOLD).move_to(P(0, -0.05)))
    return g.scale(s)


def volet(w=0.42, h=0.7):
    """Un volet en bois (vert) à lames horizontales."""
    cadre = RoundedRectangle(width=w, height=h, corner_radius=0.04, fill_color=BOIS, fill_opacity=1,
                             stroke_color=BOIS_F, stroke_width=3)
    lames = VGroup(*[Line(P(-w / 2 + 0.05, y), P(w / 2 - 0.05, y)) for y in np.linspace(-h / 2 + 0.1, h / 2 - 0.1, 5)])
    lames.set_stroke(BOIS_F, 2)
    return VGroup(cadre, lames)


def schema(n_col=6, n_rang=2, xc=XC, y_mur=Y_MUR, y0=Y_B0, ecart=ECART, r=0.2, murs=True):
    """Les murs (un par colonne) au-dessus du schéma de billes (Billes du
    module) : .murs[c], .bi (Billes), .colonnes[c] = VGroup(mur, billes)."""
    bi = Billes(n_col, n_rang, r=r, ecart=ecart, couleur=PEINTURE)
    bi.shift(P(xc - (n_col - 1) * ecart / 2, y0) - bi.billes[0][0].get_center())
    g = VGroup()
    g.bi = bi
    g.murs = VGroup(*[mur().move_to(P(bi.billes[c][0].get_x(), y_mur)) for c in range(n_col)]) if murs else VGroup()
    g.add(g.murs, bi)
    return g


def cadre_cols(bi, c0, c1, couleur=AMBRE, buff=0.12):
    """Un cadre autour des colonnes c0 à c1 (comprises) du schéma de billes."""
    return SurroundingRectangle(VGroup(*bi.colonnes[c0:c1 + 1]), color=couleur, buff=buff, corner_radius=0.12,
                                stroke_width=4)


class PropFoisMoinsBase(PaysageProp):
    nom_voix = "cm1-prop-fois-moins"
    fichier_marques = "prop_fois_moins_marques.json"
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_commun, à la taille de la ligne remplacée et bornée à
        droite (BORD_X), comme prop_tableau.py."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def _disposer_q(self, question, choix, phrase):
        """La phrase de réponse passe À GAUCHE, sous la figure (dans la colonne
        de droite, sous les cartes, elle était rapetissée par Ti-Margo)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        neuf = self.bloc(phrase, 34, VERT_OK)
        if neuf.width > 6.6:
            neuf.scale_to_fit_width(6.6)
        neuf.align_to(P(-6.35, 0), LEFT).align_to(P(0, -0.3), UP)
        self.ph_q = neuf
        return tete, q, cartes, pause, rebours, neuf

    def ligne_col(self, morceaux, y, fs=46):
        return self.col(self.ligne(morceaux, fs), y)

    def peindre(self, sc, cs):
        """Animation : les murs cs se peignent (violet)."""
        return [sc.murs[c].fond.animate.set_fill(PEINTURE, 1) for c in cs]

    def choix(self, textes, fs=34):
        """Les 3 choix d'une question : posés AU NOMBRE (mots_choix), sans
        attendre le « litres » suivant (qui revient plus loin dans la voix)."""
        out = []
        for s in textes:
            t = self.t(s, fs)
            t.sans_synchro = True
            out.append(t)
        return out

    def palir(self, mobs, op=0.2):
        return [m.animate.set_opacity(op) for m in mobs]

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Fois moins", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Fois moins")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        sc = schema(xc=-3.2, y_mur=0.75, murs=True)
        q = self.ligne([("2 fois moins", WHITE), ("de murs :", WHITE)], 40)
        self.col(q, 0.75, xl=0.2)
        self.au_mot("2 fois moins")
        self.play(LaggedStart(*[FadeIn(m, scale=0.6) for m in sc.murs], lag_ratio=0.08), FadeIn(q[0], shift=RIGHT * 0.2),
                  run_time=0.8)
        self.au_mot("de murs")
        self.play(FadeIn(q[1], shift=RIGHT * 0.2), *self.palir(sc.murs[3:]), run_time=0.5)
        self.au_mot("combien")
        q2 = self.t("combien de peinture ?", 36, ORANGE_RETENUE)
        self.col(q2, -0.1, xl=0.4)
        pt = pot(1.0).move_to(P(-3.2, -0.65))
        self.play(FadeIn(q2, shift=UP * 0.2), FadeIn(pt, shift=UP * 0.2), run_time=0.4)
        self.play(Indicate(q2, color=AMBRE, scale_factor=1.04), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Malik, peintre en bâtiment ─────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = malik(1.0).move_to(P(-5.0, -0.3))
        self.au_mot("Voici Malik")
        nom = self.t("Malik", 42, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("peintre")
        met = VGroup(self.t("peintre", 32, BLEU_CALCUL), self.t("en bâtiment", 32, BLEU_CALCUL)).arrange(DOWN, buff=0.08)
        met.next_to(pers, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.5)
        sc = schema(xc=-1.95, y_mur=0.55, murs=True)
        l1 = self.ligne([("6 murs", WHITE), ("→", WHITE), ("12 litres", PEINTURE)], 44)
        self.col(l1, 1.3)
        self.au_mot("6 murs")
        self.play(LaggedStart(*[FadeIn(m, scale=0.6) for m in sc.murs], lag_ratio=0.1), FadeIn(l1[0], shift=RIGHT * 0.2),
                  run_time=0.8)
        pt = pot(1.5, "12 L").move_to(P(-1.95, -1.25))
        self.au_mot("12 litres")
        self.play(FadeIn(l1[1]), FadeIn(l1[2], scale=1.3), FadeIn(pt, shift=UP * 0.2), run_time=0.5)
        self.insister(l1[2], 1.08, 0.25, about=l1[2].get_left())
        self.play(*self.peindre(sc, range(6)), run_time=1.2)
        self.attendre_voix()

    # ── 02 : on dessine les 12 litres : 12 ronds, une colonne par mur ───────
    def ecran_billes(self):
        self.ecran("02-billes")
        sc = schema()
        self.add(sc.murs)
        self.au_mot("12 litres")
        l1 = self.ligne([("12 litres", PEINTURE), ("= 12 ronds", WHITE)], 48)
        self.col(l1, 2.0)
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("12 ronds")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2),
                  LaggedStart(*[GrowFromCenter(b) for col in sc.bi.billes for b in col], lag_ratio=0.06), run_time=1.0)
        self.au_mot("6 colonnes")
        l2 = self.ligne([("6 colonnes", AMBRE)], 48)
        self.col(l2, 0.8)
        cad = sc.bi.encadrer("colonnes")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Create(cad), run_time=0.6)
        self.au_mot("une par mur")
        l3 = self.ligne([("une par mur", WHITE)], 48)
        self.col(l3, -0.4)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.play(LaggedStart(*[Indicate(VGroup(sc.murs[c], sc.bi.colonnes[c], cad[c]), color=AMBRE, scale_factor=1.08)
                                for c in range(6)], lag_ratio=0.2), run_time=1.4)
        self.attendre_voix()

    # ── 03 : 3 murs, c'est 2 fois moins : 12 ÷ 2 = 6 litres ─────────────────
    def ecran_moitie(self):
        self.ecran("03-moitie")
        sc = schema()
        self.add(sc)
        l1 = self.ligne([("Demain :", WHITE), ("3 murs", PEINTURE)], 46)
        self.col(l1, 2.45)
        self.au_mot("Demain")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("3 murs")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), *self.peindre(sc, range(3)), run_time=0.5)
        l2 = self.ligne([("3, c'est", WHITE), ("2 fois moins", AMBRE), ("que 6", WHITE)], 42)
        self.col(l2, 1.55)
        self.au_mot("3, c'est")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("2 fois moins")
        paq = VGroup(*[SurroundingRectangle(sc.murs[k:k + 3], color=AMBRE, buff=0.05, corner_radius=0.08, stroke_width=4)
                       for k in (0, 3)])
        self.play(FadeIn(l2[1], scale=1.2), Create(paq), run_time=0.5)
        self.au_mot("que 6")
        self.play(FadeIn(l2[2], shift=RIGHT * 0.2), *self.palir(VGroup(sc.murs[3:], paq[1])), run_time=0.5)
        self.au_mot("2 fois moins de peinture")
        l3 = self.ligne([("2 fois moins de peinture", WHITE)], 38)
        self.col(l3, 0.65)
        l3[0].sans_synchro = True  # posé au mot « moins de peinture » (le « 2 » est déjà dit)
        pb = VGroup(cadre_cols(sc.bi, 0, 2), cadre_cols(sc.bi, 3, 5))
        self.play(FadeIn(l3, shift=RIGHT * 0.2), Create(pb), run_time=0.5)
        self.play(*self.palir(VGroup(*sc.bi.colonnes[3:], pb[1])), run_time=0.5)
        l4 = self.ligne([("12 ÷", WHITE), ("2", AMBRE), ("= 6 litres", VERT_OK)], 46)
        self.col(l4, -0.5)
        self.au_mot("12 divisé")
        self.play(FadeIn(l4[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("par 2")
        self.play(FadeIn(l4[1], scale=1.3), run_time=0.3)
        self.au_mot("6 litres")
        self.play(FadeIn(l4[2], scale=1.3), pb[0].animate.set_stroke(VERT_OK, 6), run_time=0.4)
        self.insister(l4[2], 1.08, 0.25, about=l4[2].get_left())
        self.attendre_voix()

    # ── 04 : 2 murs, c'est 3 fois moins : 12 ÷ 3 = 4 litres ─────────────────
    def ecran_tiers(self):
        self.ecran("04-tiers")
        sc = schema()
        self.add(sc)
        self.au_mot("2 murs")
        l1 = self.ligne([("Et pour", WHITE), ("2 murs ?", PEINTURE)], 46)
        self.col(l1, 2.45)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), *self.peindre(sc, range(2)), run_time=0.6)
        l2 = self.ligne([("2, c'est", WHITE), ("3 fois moins", AMBRE), ("que 6", WHITE)], 42)
        self.col(l2, 1.55)
        self.au_mot("2, c'est")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("3 fois moins")
        paq = VGroup(*[SurroundingRectangle(sc.murs[k:k + 2], color=AMBRE, buff=0.05, corner_radius=0.08, stroke_width=4)
                       for k in (0, 2, 4)])
        self.play(FadeIn(l2[1], scale=1.2), Create(paq), run_time=0.5)
        self.au_mot("que 6")
        self.play(FadeIn(l2[2], shift=RIGHT * 0.2), *self.palir(VGroup(sc.murs[2:], paq[1:])), run_time=0.5)
        self.au_mot("3 fois moins de peinture")
        l3 = self.ligne([("3 fois moins de peinture", WHITE)], 38)
        self.col(l3, 0.65)
        l3[0].sans_synchro = True  # posé au mot « moins de peinture » (le « 3 » est déjà dit)
        pb = VGroup(*[cadre_cols(sc.bi, k, k + 1, buff=0.09) for k in (0, 2, 4)])
        self.play(FadeIn(l3, shift=RIGHT * 0.2), Create(pb), run_time=0.5)
        self.play(*self.palir(VGroup(*sc.bi.colonnes[2:], pb[1:])), run_time=0.5)
        l4 = self.ligne([("12 ÷", WHITE), ("3", AMBRE), ("= 4 litres", VERT_OK)], 46)
        self.col(l4, -0.5)
        self.au_mot("12 divisé")
        self.play(FadeIn(l4[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("par 3")
        self.play(FadeIn(l4[1], scale=1.3), run_time=0.3)
        self.au_mot("4 litres")
        self.play(FadeIn(l4[2], scale=1.3), pb[0].animate.set_stroke(VERT_OK, 6), run_time=0.4)
        self.insister(l4[2], 1.08, 0.25, about=l4[2].get_left())
        self.attendre_voix()

    # ── 05 : QUESTION 1 (8 murs : 24 litres ; 4 murs ?) ─────────────────────
    def deco_q(self):
        return VGroup(malik(1.1).move_to(P(-5.0, -0.6)), pot(1.4, "").move_to(P(-2.6, -1.6)))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        deco = self.deco_q()
        self.add(deco)
        sc = schema(8, 3, xc=-2.9, y0=1.6, ecart=0.6, r=0.18, murs=False)

        def apres(s):
            l0 = s.ligne_rep(0, ["4 murs :", "2 fois moins", "que 8 murs."])
            l1 = s.ligne_rep(1, ["24 ÷", "2 =", "12 litres."])
            l2 = s.ligne_rep(2, ["48 :", "2 fois plus,", "mauvaise direction !"])
            l2.set_color(ROUGE_ERREUR)
            pb = VGroup(cadre_cols(sc.bi, 0, 3, buff=0.1), cadre_cols(sc.bi, 4, 7, buff=0.1))
            s.au_mot("4 murs")
            s.play(FadeOut(deco), FadeIn(sc.bi), FadeIn(l0[0], shift=UP * 0.15), run_time=0.4)
            s.au_mot("2 fois moins")
            s.play(FadeIn(l0[1], shift=UP * 0.15), Create(pb), run_time=0.4)
            s.au_mot("que 8 murs")
            s.play(FadeIn(l0[2], shift=UP * 0.15), run_time=0.3)
            s.au_mot("24 divisé")
            s.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            s.au_mot("par 2")
            s.play(FadeIn(l1[1], shift=UP * 0.15), *s.palir(VGroup(*sc.bi.colonnes[4:], pb[1])), run_time=0.4)
            s.au_mot("12 litres")
            s.play(FadeIn(l1[2], scale=1.3), pb[0].animate.set_stroke(VERT_OK, 6), run_time=0.4)
            s.au_mot("48, c'est")
            s.play(FadeIn(l2[0], shift=UP * 0.15), run_time=0.3)
            s.au_mot("2 fois plus")
            s.play(FadeIn(l2[1], shift=UP * 0.15), run_time=0.3)
            s.au_mot("mauvaise direction")
            s.play(FadeIn(l2[2], shift=UP * 0.15), run_time=0.3)
            s.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["8 murs : 24 litres.", "Combien pour 4 murs ?"],
                            self.choix(["12 litres", "22 litres", "48 litres"]), 0,
                            ["4 murs : 2 fois moins que 8 murs.", "24 ÷ 2 = 12 litres.",
                             "48 : 2 fois plus, mauvaise direction !"], mot_q="8 murs", autres_r=apres,
                            mots_choix=("12 litres", "22 litres", "48 litres"))

    # ── 06 : le piège : 3 fois moins, ce n'est pas 3 de moins ───────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(0, 3.1))
        self.play(Write(tit), run_time=0.5)
        sc = schema(y_mur=1.85, y0=0.75)
        self.play(FadeIn(sc), run_time=0.3)
        l1 = self.ligne([("3 fois moins", AMBRE), ("≠", WHITE), ("3 de moins", ROUGE_ERREUR)], 44)
        self.col(l1, 2.0)
        self.au_mot("3 fois moins")
        self.play(FadeIn(l1[0], scale=1.2), run_time=0.35)
        l1[1].sans_synchro = l1[2].sans_synchro = True  # posés au mot « 3 de moins »
        self.au_mot("3 de moins")
        self.play(FadeIn(l1[1]), FadeIn(l1[2], scale=1.2), run_time=0.3)
        self.au_mot("Pour 2 murs")
        self.play(*self.peindre(sc, range(2)), run_time=0.5)
        pb = VGroup(*[cadre_cols(sc.bi, k, k + 1, buff=0.09) for k in (0, 2, 4)])
        l2 = self.ligne([("12 ÷", WHITE), ("3", AMBRE), ("= 4 litres", VERT_OK)], 48)
        self.col(l2, 0.8)
        self.au_mot("divise 12")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), Create(pb), run_time=0.3)
        self.au_mot("par 3")
        self.play(FadeIn(l2[1], scale=1.3), *self.palir(VGroup(*sc.bi.colonnes[2:], pb[1:])), run_time=0.4)
        self.au_mot("4 litres")
        self.play(FadeIn(l2[2], scale=1.3), pb[0].animate.set_stroke(VERT_OK, 6), run_time=0.4)
        self.insister(l2[2], 1.12, 0.25, about=l2[2].get_left())
        self.au_mot("On n'enlève")
        self.play(FadeOut(pb), VGroup(*sc.bi.colonnes[2:]).animate.set_opacity(1), run_time=0.4)
        enl = [sc.bi.billes[5][1], sc.bi.billes[5][0], sc.bi.billes[4][1]]
        xs = VGroup(*[croix(b, ROUGE_ERREUR, 6).scale(1.25) for b in enl])
        l3 = self.ligne([("12 −", ROUGE_ERREUR), ("3", ROUGE_ERREUR), ("= 9 litres", ROUGE_ERREUR)], 48)
        l3[0]._pas_audit = l3[0].sans_synchro = True  # rappel des 12 litres
        self.col(l3, -0.3)
        self.au_mot("enlève pas 3")
        self.play(FadeIn(l3[0], shift=RIGHT * 0.2), FadeIn(l3[1], scale=1.3),
                  LaggedStart(*[Create(x) for x in xs], lag_ratio=0.3), run_time=0.7)
        self.au_mot("9 litres")
        self.play(FadeIn(l3[2], scale=1.3), run_time=0.35)
        self.play(Create(croix(l3, ROUGE_ERREUR, 6)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (5 murs : 15 litres ; 1 seul mur ?) ─────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = self.deco_q()
        self.add(deco)
        sc = schema(5, 3, xc=-3.0, y_mur=2.4, y0=1.5, ecart=0.68, r=0.18)

        def apres(s):
            l0 = s.ligne_rep(0, ["1 mur :", "5 fois moins", "que 5 murs."])
            l1 = s.ligne_rep(1, ["15 ÷", "5 =", "3 litres", "pour un mur."])
            pb = VGroup(*[cadre_cols(sc.bi, k, k, buff=0.1) for k in range(5)])
            s.au_mot("1 mur")
            s.play(FadeOut(deco), FadeIn(sc), FadeIn(l0[0], shift=UP * 0.15), run_time=0.4)
            s.play(*s.peindre(sc, [0]), run_time=0.3)
            s.au_mot("5 fois moins")
            s.play(FadeIn(l0[1], shift=UP * 0.15), Create(pb), run_time=0.4)
            s.au_mot("que 5 murs")
            s.play(FadeIn(l0[2], shift=UP * 0.15), run_time=0.3)
            s.au_mot("15 divisé")
            s.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            s.au_mot("par 5")
            s.play(FadeIn(l1[1], shift=UP * 0.15), *s.palir(VGroup(*sc.bi.colonnes[1:], pb[1:], sc.murs[1:])),
                   run_time=0.4)
            s.au_mot("3 litres")
            s.play(FadeIn(l1[2], scale=1.3), pb[0].animate.set_stroke(VERT_OK, 6), run_time=0.4)
            s.au_mot("pour un mur")
            s.play(FadeIn(l1[3], shift=UP * 0.15), run_time=0.3)
            s.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["5 murs : 15 litres.", "Combien pour 1 seul mur ?"],
                            self.choix(["10 litres", "3 litres", "75 litres"]), 1,
                            ["1 mur : 5 fois moins que 5 murs.", "15 ÷ 5 = 3 litres pour un mur."], mot_q="5 murs",
                            autres_r=apres, mots_choix=("10 litres", "3 litres", "75 litres"))

    # ── 08 : défi : les 10 volets ───────────────────────────────────────────
    def volets(self):
        """10 volets en 2 rangées de 5 : une rangée = la moitié, une colonne = 2 volets."""
        vs = VGroup(*[volet().move_to(P(-4.25 + 0.62 * (k % 5), 1.55 - 1.0 * (k // 5))) for k in range(10)])
        vs.rangees = [vs[:5], vs[5:]]
        vs.colonnes = [VGroup(vs[k], vs[k + 5]) for k in range(5)]
        return vs

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        vs = self.volets()
        pt = pot(1.4, "20 L").move_to(P(-3.0, -1.2))
        l1 = self.ligne([("10 volets", BOIS), ("→ 20 litres", PEINTURE)], 46)
        self.col(l1, 1.9)
        self.au_mot("10 volets")
        self.play(LaggedStart(*[FadeIn(v, scale=0.6) for v in vs], lag_ratio=0.06), FadeIn(l1[0], shift=RIGHT * 0.2),
                  run_time=0.8)
        self.au_mot("20 litres")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), FadeIn(pt, shift=UP * 0.2), run_time=0.4)
        l2 = self.ligne([("5 volets", BOIS), ("→ ? litres", ORANGE_RETENUE)], 46)
        self.col(l2, 0.85)
        l2[1].sans_synchro = True  # « ? litres » : pas de nombre
        self.au_mot("5 volets")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        l3 = self.ligne([("2 volets", BOIS), ("→ ? litres", ORANGE_RETENUE)], 46)
        self.col(l3, -0.2)
        l3[1].sans_synchro = True  # « ? litres » : pas de nombre
        self.au_mot("2 volets")
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.pause_defi(y=-1.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        vs = self.volets()
        pt = pot(1.4, "20 L").move_to(P(-3.0, -1.2))
        l1 = self.ligne([("10 volets", BOIS), ("→ 20 litres", PEINTURE)], 46)
        self.col(l1, 2.1)
        self.add(vs, pt, l1)
        self.play(Write(tit), run_time=0.5)
        c1 = self.ligne([("5 volets :", BOIS), ("2 fois moins", AMBRE), ("que 10", WHITE)], 40)
        self.col(c1, 1.15)
        r1 = SurroundingRectangle(vs.rangees[0], color=AMBRE, buff=0.08, corner_radius=0.1, stroke_width=4)
        self.au_mot("5 volets")
        self.play(FadeIn(c1[0], shift=RIGHT * 0.2), Create(r1), run_time=0.4)
        self.au_mot("2 fois moins")
        self.play(FadeIn(c1[1], scale=1.2), *self.palir(vs.rangees[1], 0.25), run_time=0.4)
        self.au_mot("que 10")
        self.play(FadeIn(c1[2], shift=RIGHT * 0.2), run_time=0.3)
        c2 = self.ligne([("20 ÷", WHITE), ("2", AMBRE), ("= 10 litres", VERT_OK)], 44)
        self.col(c2, 0.35)
        self.au_mot("20 divisé")
        self.play(FadeIn(c2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("par 2")
        self.play(FadeIn(c2[1], scale=1.3), run_time=0.3)
        self.au_mot("10 litres")
        self.play(FadeIn(c2[2], scale=1.3), r1.animate.set_stroke(VERT_OK, 6), run_time=0.4)
        c3 = self.ligne([("2 volets :", BOIS), ("5 fois moins", AMBRE)], 40)
        self.col(c3, -0.6)
        r2 = VGroup(*[SurroundingRectangle(c, color=AMBRE, buff=0.06, corner_radius=0.08, stroke_width=4)
                      for c in vs.colonnes])
        self.au_mot("2 volets")
        self.play(FadeIn(c3[0], shift=RIGHT * 0.2), FadeOut(r1), vs.rangees[1].animate.set_opacity(1), run_time=0.4)
        self.au_mot("5 fois moins")
        self.play(FadeIn(c3[1], scale=1.2), Create(r2), run_time=0.4)
        c4 = self.ligne([("20 ÷", WHITE), ("5", AMBRE), ("= 4 litres", VERT_OK)], 44)
        self.col(c4, -1.4)
        self.au_mot("20 divisé", 2)
        self.play(FadeIn(c4[0], shift=RIGHT * 0.2), *self.palir(VGroup(*vs.colonnes[1:], r2[1:]), 0.25), run_time=0.3)
        self.au_mot("par 5")
        self.play(FadeIn(c4[1], scale=1.3), run_time=0.3)
        self.au_mot("4 litres")
        self.play(FadeIn(c4[2], scale=1.3), r2[0].animate.set_stroke(VERT_OK, 6), run_time=0.4)
        self.insister(c4[2], 1.15, 0.25, about=c4[2].get_left())
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        tb = TableauProp(["Murs", "Peinture (L)"], [[6, 3], [12, 6]], largeur_case=1.2, largeur_libelle=2.6,
                         centre=ORIGIN)
        fh = tb.fleche_col(0, 1, "÷ 2", ligne=0, couleur=AMBRE)
        fb = tb.fleche_col(0, 1, "÷ 2", ligne=1, couleur=AMBRE)
        fig = VGroup(tb, fh, fb)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Une quantité 2 fois moins grande :", "l'autre aussi."),
            ("On divise les deux", "par le même nombre."),
            ("3 fois moins,", "ce n'est pas 3 de moins !")], fs=36)
        self.au_mot("Quand une")
        self.montrer_ligne(lignes[0], Indicate(fh, color=AMBRE))
        self.au_mot("on divise")
        self.montrer_ligne(lignes[1], Indicate(fb, color=AMBRE))
        self.au_mot("Et 3 fois")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_billes()
        self.ecran_moitie()
        self.ecran_tiers()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropFoisMoinsCM1(PropFoisMoinsBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
