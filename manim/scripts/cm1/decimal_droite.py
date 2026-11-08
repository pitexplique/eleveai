# decimal_droite.py
# EleveAI — Maths CM1 ET CM2 — PLACER UN NOMBRE DÉCIMAL SUR UNE DROITE GRADUÉE
# (micro du coach : decimal_droite, notion nombre_decimal, dans les DEUX
# classes), AVEC VOIX. Paysage 16:9. CEINTURES : CM1 VERTE (la notion complète
# de CM1 : dixièmes, sauts depuis 0, pièges, défi corrigé) ; CM2 JAUNE (rappel).
# Short jumeau : decimal_droite_short.py (0,8 ou 0,08 ? blanche).
#
# Décor et métier : TRANSPORTS ; Inès, CONDUCTRICE DE BUS : sa ligne va du
# dépôt (0 km) à la gare (1 km), 10 parts égales ; l'école à 0,7 km ; le marché
# au milieu (0,5 = 0,50) ; plus loin, 3,7 km entre 3 et 4. Aucune donnée du
# monde réel citée (pas de source à relever). Centres : transports.
# Vérifié (Python) : 7 × 0,1 = 0,7 ; 0,08 < 0,1 ; 0,5 = 0,50 ; 10 × 0,1 = 1 ;
# 3 + 0,7 = 3,7 ; 2 + 0,4 = 2,4 ; 4 + 0,6 = 4,6.
#
# Micro → écrans (banques cm1/maths/decimaux.bank.ts, cm2/maths/nombres-decimaux.bank.ts) :
# n-ième trait → 0,n (02, qcm_001/002, tpl_001/002) ; 7/10 = 0,7 (02, qcm_003,
# tpl_004) ; compter les sauts depuis 0 (03 + QUESTION 1, leurre 0,7 = le trait
# du 0 compté ; 0,06) ; 0,08 n'est pas au 8e trait (05, qcm_005) ; 0,5 = 0,50,
# même place, au milieu (06, qcm_006, cm2 fixed_1) ; 10 dixièmes = 1 (07,
# qcm_007) ; entre deux entiers : 3,7 (07, cm2 tpl_2) ; QUESTION 2 : 2,4 sur
# une droite de 2 à 3 (leurres 0,4 = l'origine oubliée, 2,5) ; défi : placer
# 4,6 (à quel trait après 4 ? leurres 4e = 10 − 6, 7e = le trait du 4 compté).
# Écrans : 00 garde · 01 Inès · 02 la méthode · 03 le piège des traits ·
# 04 QUESTION 1 · 05 0,08 · 06 le milieu · 07 après 1 · 08 QUESTION 2 ·
# 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
#
# Bases : frac_cm_commun.py (PaysageCM, GARDE_SEULE, coller) ; canvas_fractions.py
# (Droite, non modifiée) ; le geste du SAUT (6e/demi_droite_graduee.py) : une
# flèche courbe d'un trait au suivant.
# Voix : manim/voix/commun-cm-decimal-droite.json (débit −10) ; marques : decimal_droite_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/decimal_droite.py DecimalDroiteCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/decimal_droite.py DecimalDroiteCM1 -o eleveai-maths-cm1-decimal-droite --media_dir manim/scripts/cm1/media-decimal-droite
# CM2 : GARDE_SEULE=1 python -m manim render -qh --disable_caching manim/scripts/cm1/decimal_droite.py DecimalDroiteCM2 -o garde-cm2 --media_dir manim/scripts/cm1/media-decimal-droite-cm2
#       puis python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <sortie-cm2.mp4>
# Sorties : manim/sorties/{cm1,cm2}/maths/nombres-decimaux/decimal-droite/eleveai-maths-{cm1,cm2}-decimal-droite.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403
from canvas_triangles import FinTriangles  # noqa: E402  (fin du 05/11 : pouce, commentaire, cloche)

ROUTE, LIGNE_BLANCHE = "#475569", "#f8fafc"
JAUNE_BUS = "#facc15"
XD, LD = -2.75, 6.2     # le centre et la longueur des droites
LC, XC = 6.6, -2.6      # droites où l'on écrit chaque dixième (02, 09b) : plus longues, nombres aérés
XL_LC = 1.9             # et la colonne de texte s'écarte d'autant


def dec(v):
    """0.7 → « 0,7 » ; 3.0 → « 3 »."""
    return f"{round(v, 2):g}".replace(".", ",")


_SANS_JAMBE = set("0123456789abcdefhiklmnortuvwxzABCDEFGHIKLMNORTUVWXZ")


def base(g):
    """Les morceaux d'une ligne posés sur la MÊME ligne d'écriture (arrange les centre :
    « 4,6 = » et « 4 unités » ne tombaient pas à la même hauteur). Repère : la première lettre
    sans jambage ni accent de chaque morceau."""
    def pied(t):
        cars = [c for c in getattr(t, "text", "") if not c.isspace()]
        for i, c in enumerate(cars):
            if c in _SANS_JAMBE and i < len(t.submobjects):
                return t.submobjects[i].get_bottom()[1]
        return None
    y0 = pied(g[0])
    if y0 is None:
        return g
    for t in g[1:]:
        y = pied(t)
        if y is not None:
            t.shift(UP * (y0 - y))
    return g


def bus(larg=0.8):
    """Un bus de ville vu de côté (jaune, vitres, deux roues), tourné à droite."""
    caisse = RoundedRectangle(width=1.6, height=0.62, corner_radius=0.12, fill_color=JAUNE_BUS, fill_opacity=1,
                              stroke_color=NUIT, stroke_width=2)
    vitres = VGroup(*[RoundedRectangle(width=0.26, height=0.2, corner_radius=0.04, fill_color="#bae6fd",
                                       fill_opacity=1, stroke_width=0).move_to(P(-0.55 + 0.33 * i, 0.1))
                      for i in range(4)])
    pare = RoundedRectangle(width=0.18, height=0.34, corner_radius=0.04, fill_color="#bae6fd", fill_opacity=1,
                            stroke_width=0).move_to(P(0.68, 0.04))
    roues = VGroup(*[VGroup(Circle(radius=0.14, fill_color=NUIT, fill_opacity=1, stroke_width=0),
                            Circle(radius=0.06, fill_color="#94a3b8", fill_opacity=1, stroke_width=0))
                     .move_to(P(x, -0.31)) for x in (-0.45, 0.45)])
    g = VGroup(caisse, vitres, pare, roues)
    return g.scale_to_fit_width(larg)


def conductrice(s=0.85):
    """Inès : la tenue bleue et la casquette à visière de la conductrice."""
    p = personne(peau="#8d5524", tenue="#1d4ed8", cheveux="#111827", longs=True, s=s)
    h = p.tete.get_top()
    cas = RoundedRectangle(width=0.95 * s, height=0.26 * s, corner_radius=0.06, fill_color="#1e3a8a", fill_opacity=1,
                           stroke_width=0).move_to(h + DOWN * 0.06 * s)
    visiere = RoundedRectangle(width=0.5 * s, height=0.08 * s, corner_radius=0.03, fill_color=NUIT, fill_opacity=1,
                               stroke_width=0).next_to(cas, DOWN, buff=0).align_to(cas, RIGHT).shift(RIGHT * 0.2 * s)
    p.add(cas, visiere)
    return p


def panneau(txt, couleur="#15803d", fs=26):
    """Un panneau d'arrêt (rectangle coloré, texte blanc) : non audité."""
    t = Text(txt, font_size=fs, color=WHITE, weight=BOLD)
    fond = RoundedRectangle(width=t.width + 0.3, height=t.height + 0.22, corner_radius=0.08, fill_color=couleur,
                            fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    return VGroup(fond, t.move_to(fond))


def droite(n=10, a=0, b=1, centre=P(XD, 0.0), longueur=LD, ets=None):
    e = ets if ets is not None else {a: dec(a), b: dec(b)}
    d = Droite(a, b, n, etiquettes=e, longueur=longueur, centre=centre)
    pas_audit(d)
    return d


def bonds(dr, i0, i1, couleur=AMBRE):
    """Les SAUTS (flèches courbes) du trait i0 au trait i1."""
    out = VGroup()
    for i in range(i0, i1):
        a = dr.ticks[i].get_top() + UP * 0.05
        b = dr.ticks[i + 1].get_top() + UP * 0.05
        out.add(CurvedArrow(a, b, angle=-PI / 2.2, color=couleur, stroke_width=5, tip_length=0.14))
    return out


def numeros(dr, i0, i1, couleur=VERT_OK, fs=26, dy=0.5):
    """Un numéro au-dessus de chaque saut (intervalle) de i0 à i1 : non audité."""
    out = VGroup()
    for k, i in enumerate(range(i0, i1)):
        m = (dr.ticks[i].get_center() + dr.ticks[i + 1].get_center()) / 2
        out.add(Text(str(k + 1), font_size=fs, color=couleur, weight=BOLD).move_to(m + UP * dy))
    return pas_audit(out)


def sous_trait(dr, i, txt, couleur=AMBRE, fs=22, bas=0.0):
    """Le nombre écrit SOUS le trait i (comme `below` du coach) : audité, posé au mot.
    `bas` : un cran plus bas (les dixièmes un sur deux, pour qu'ils ne se touchent pas)."""
    t = Text(txt, font_size=fs, color=couleur, weight=BOLD)
    t.sans_synchro = True
    return t.move_to(P(dr.ticks[i].get_center()[0], dr.ticks[i].get_bottom()[1] - 0.3 - bas))


def marqueur(dr, v, txt, couleur=BLEU_POINT, fs=24):
    """Un repère SOUS l'axe (triangle qui pointe la valeur + un mot) : non audité."""
    x = dr.p(v)
    tri = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.12).move_to(x + DOWN * 0.42)
    t = Text(txt, font_size=fs, color=couleur, weight=BOLD).next_to(tri, DOWN, buff=0.08)
    return pas_audit(VGroup(tri, t))


class DecimalDroiteBase(FinTriangles, PaysageCM):
    nom_voix = "commun-cm-decimal-droite"
    fichier_marques = "decimal_droite_marques.json"
    cle_abonne = "11-abonne"
    XL = 1.7

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_methode, self.ecran_piege,
                self.ecran_question1, self.ecran_centiemes, self.ecran_milieu, self.ecran_apres,
                self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale]

    def titre(self, txt, couleur=JAUNE_TITRE, fs=46, y=3.0, avec_indic=None):
        t = self.col(self.t(txt, fs, couleur), y)
        an = [Indicate(avec_indic, color=AMBRE, scale_factor=1.7)] if avec_indic is not None else []
        self.play(Write(t), *an, run_time=0.5)
        return t

    def compter(self, dr, mots, i0=0, couleur=AMBRE, b=None, dy_bus=1.05, fs=22):
        """Le geste du SAUT, au mot : un saut par mot de `mots` (« 0,1 », « 0,2 »…),
        le nombre écrit sous son trait, le bus (b) qui avance avec."""
        bs, tx = VGroup(), VGroup()
        for k, mot in enumerate(mots):
            i = i0 + k
            arc = bonds(dr, i, i + 1, couleur)[0]
            t = sous_trait(dr, i + 1, mot[1], couleur, fs, bas=0.36 if (i + 1) % 2 == 0 else 0.0)
            self.au_nb(mot[0], *(mot[2:] or ()))
            an = [Create(arc), FadeIn(t, shift=UP * 0.1)]
            if b is not None:
                an.append(b.animate.move_to(P(dr.ticks[i + 1].get_center()[0], dr.ticks[0].get_center()[1] + dy_bus)))
            self.play(*an, run_time=0.35)
            bs.add(arc)
            tx.add(t)
        return bs, tx

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Placer un nombre décimal sur une droite", self.identite, self.ceinture,
                                       y_ech=-2.7)
        self.au_mot("Placer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        dr = droite(10, centre=P(1.3, 0.0), longueur=6.0)
        self.au_mot("droite graduée")
        self.play(FadeIn(dr), run_time=0.5)
        f = self.inline("0,7", 100, BLEU_POINT).move_to(P(-4.5, 0.3))
        self.au_nb("Où se trouve 0,7")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        q = Text("?", font_size=80, color=ORANGE_TROU).move_to(dr.p(0.5) + UP * 0.95)
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.play(q.animate.move_to(dr.p(0.2) + UP * 0.95), run_time=0.4)
        self.play(q.animate.move_to(dr.p(0.7) + UP * 0.95), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : Inès, conductrice de bus ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = conductrice(0.85).move_to(P(-5.3, -1.75))
        self.au_mot("Voici Inès")
        nom = self.t("Inès", 34, BLEU_CALCUL).next_to(pers, RIGHT, buff=0.3).shift(UP * 0.4)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        metier = self.t("conductrice de bus", 30, BLEU_CALCUL).next_to(nom, DOWN, buff=0.15).align_to(nom, LEFT)
        self.au_mot("conductrice")
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        x0, x1, yr = -5.6, 0.6, 1.0
        route = RoundedRectangle(width=x1 - x0 + 0.7, height=0.7, corner_radius=0.12, fill_color=ROUTE,
                                 fill_opacity=1, stroke_width=0).move_to(P((x0 + x1) / 2, yr))
        tirets = DashedLine(P(x0 - 0.2, yr), P(x1 + 0.2, yr), color=LIGNE_BLANCHE, stroke_width=3, dash_length=0.15)
        b = bus(0.8).move_to(P(x0, yr + 0.62))
        depot = pas_audit(panneau("Dépôt", "#334155", 24)).move_to(P(x0, yr + 1.45))
        self.au_mot("dépôt")
        self.play(FadeIn(route), Create(tirets), FadeIn(b, shift=RIGHT * 0.3), FadeIn(depot), run_time=0.5)
        z = self.inline("0 km", 34).move_to(P(x0, yr - 0.7))
        self.au_nb("kilomètre 0")
        self.play(FadeIn(z, scale=1.3), run_time=0.35)
        gare = pas_audit(panneau("Gare", "#7c3aed", 24)).move_to(P(x1, yr + 1.45))
        u = self.inline("1 km", 34).move_to(P(x1, yr - 0.7))
        self.au_mot("La gare")
        self.play(FadeIn(gare, shift=DOWN * 0.2), run_time=0.35)
        self.au_nb("kilomètre 1")
        self.play(FadeIn(u, scale=1.3), run_time=0.35)
        bornes = VGroup(*[Line(P(x0 + (x1 - x0) * i / 10, yr - 0.33), P(x0 + (x1 - x0) * i / 10, yr + 0.33),
                               color=WHITE, stroke_width=4) for i in range(11)])
        l1 = self.col(self.inline("10 parts égales", 40, AMBRE), 1.6)
        self.au_nb("en 10")
        self.play(LaggedStart(*[Create(x) for x in bornes], lag_ratio=0.08), FadeIn(l1, shift=RIGHT * 0.2),
                  run_time=0.7)
        ec = pas_audit(panneau("École", "#ea580c", 24)).move_to(P(x0 + (x1 - x0) * 0.7, yr + 1.45))
        l2 = self.col(self.inline("École : 0,7 km", 40, JAUNE_TITRE), 0.6)
        self.au_mot("L'arrêt de l'école")
        self.play(FadeIn(ec, shift=DOWN * 0.2), run_time=0.35)
        self.au_nb("à 0,7")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.35)
        q = self.col(self.t("Où est-il ?", 42, ORANGE_RETENUE), -0.4)
        self.au_mot("Où est-il")
        self.play(FadeIn(q, shift=UP * 0.15), Indicate(ec, color=AMBRE), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la méthode (0,7 = 7 sauts de 0,1) ─────────────────────────────
    def ecran_methode(self):
        self.ecran("02-methode")
        self.XL = XL_LC
        y0 = 0.3
        dr1 = droite(1, centre=P(XC, y0), longueur=LC)
        b = bus(0.75).move_to(P(dr1.p(0)[0], y0 + 1.05))
        self.add(dr1, b)
        self.au_mot("De 0")
        self.play(Indicate(dr1.etiquettes[0], color=AMBRE, scale_factor=1.6), run_time=0.4)
        self.play(Indicate(dr1.etiquettes[1], color=AMBRE, scale_factor=1.6), run_time=0.4)
        dr, anim = dr1.graduer(10, run_time=0.8)
        l1 = self.col(self.inline("10 parts égales", 36, AMBRE), 1.9)
        self.au_nb("en 10")
        self.play(anim, FadeIn(l1, shift=RIGHT * 0.15))
        u1 = self.inline("1 part = 1 dixième", 36)
        u2 = self.inline("= 0,1", 36, AMBRE)
        self.col(base(VGroup(u1, u2).arrange(RIGHT, buff=0.2)), 1.1)
        self.au_nb("c'est 1")
        un = bonds(dr, 0, 1, WHITE)
        self.play(FadeIn(u1, shift=RIGHT * 0.15), Create(un), run_time=0.4)
        self.au_nb("dixième : 0,1")
        self.play(FadeIn(u2, scale=1.3), run_time=0.3)
        self.play(FadeOut(un), run_time=0.2)
        v1 = self.inline("0,7", 40, JAUNE_TITRE)
        v2 = self.inline("= 7 dixièmes = 7/10", 36, JAUNE_TITRE)
        self.col(base(VGroup(v1, v2).arrange(RIGHT, buff=0.2)), 0.3)
        self.au_nb("Et 0,7")
        self.play(FadeIn(v1, scale=1.3), run_time=0.3)
        self.au_nb("c'est 7")
        self.play(FadeIn(v2, shift=RIGHT * 0.15), run_time=0.35)
        l4a = self.inline("Depuis 0 :", 36, AMBRE)
        l4b = self.inline("7 sauts", 36, AMBRE)
        self.col(base(VGroup(l4a, l4b).arrange(RIGHT, buff=0.2)), -0.5)
        self.au_nb("part de 0")
        self.play(FadeIn(l4a, shift=RIGHT * 0.15), run_time=0.3)
        self.au_nb("fait 7")
        self.play(FadeIn(l4b, shift=RIGHT * 0.15), run_time=0.3)
        mots = [("sauts : 0,1", "0,1")] + [(f"{dec(k / 10 - 0.1)}, {dec(k / 10)}", dec(k / 10)) for k in range(2, 8)]
        self.compter(dr, mots, b=b, fs=24)
        pt = dr.point(0.7)
        self.play(GrowFromEdge(pt, DOWN), run_time=0.3)
        ec = pas_audit(panneau("École", "#ea580c", 22)).next_to(b, UP, buff=0.12)
        self.au_mot("L'école")
        self.play(FadeIn(ec, shift=DOWN * 0.15), run_time=0.3)
        self.insister(VGroup(pt, b, ec), 1.15, 0.25)
        self.attendre_voix()
        self.XL = DecimalDroiteBase.XL

    # ── 03 : le piège : les sauts, pas le trait du 0 ────────────────────────
    def ecran_piege(self):
        self.ecran("03-piege")
        self.au_mot("Attention au piège")
        self.titre("Attention au piège !", ROUGE_ERREUR)
        dr = droite(10, centre=P(XD, 0.3))
        ec = marqueur(dr, 0.7, "école")
        self.add(dr, ec)
        dep = pas_audit(self.t("départ", 22, ROUGE_ERREUR)).next_to(dr.etiquettes[0], RIGHT, buff=0.1)
        self.au_mot("départ")
        self.play(Indicate(dr.ticks[0], color=ROUGE_ERREUR, scale_factor=1.8), FadeIn(dep), run_time=0.5)
        traits = pas_audit(VGroup(*[Text(str(i + 1), font_size=26, color=ROUGE_ERREUR, weight=BOLD)
                                    .next_to(dr.ticks[i], UP, buff=0.2) for i in range(8)]))
        l1 = self.col(self.inline("8 traits", 42, ROUGE_ERREUR), 1.6)
        self.au_mot("Si tu comptes")
        self.play(LaggedStart(*[FadeIn(t, scale=1.4) for t in traits], lag_ratio=0.12), run_time=0.9)
        self.au_nb("en trouves 8")
        self.play(FadeIn(l1), run_time=0.3)
        self.au_mot("faux")
        self.play(Create(croix(l1, sw=5)), run_time=0.3)
        r = self.col(self.inline("On compte les sauts !", 38, AMBRE), 0.6)
        self.au_mot("On compte les sauts")
        self.play(FadeOut(traits), FadeIn(r, shift=RIGHT * 0.15), run_time=0.35)
        nums = numeros(dr, 0, 7, VERT_OK, dy=0.66)
        sauts = bonds(dr, 0, 7, VERT_OK)
        l2a = self.inline("7 sauts", 42, VERT_OK)
        l2b = self.inline(": 0,7", 42, VERT_OK)
        self.col(base(VGroup(l2a, l2b).arrange(RIGHT, buff=0.2)), -0.4)
        self.au_nb("a 7")
        self.play(LaggedStart(*[Create(s) for s in sauts], lag_ratio=0.12), FadeIn(l2a), run_time=0.7)
        self.play(LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.1), run_time=0.5)
        self.au_nb("sauts : 0,7")
        self.play(FadeIn(l2b, scale=1.3), run_time=0.3)
        self.insister(VGroup(l2a, l2b), 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (lire 0,6) ──────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        dr = droite(10, centre=P(XD, 0.0))
        pt = dr.point(0.6, "?")

        def avant(sc):
            sc.play(FadeIn(dr), GrowFromEdge(pt, DOWN), run_time=0.5)

        def apres(sc):
            sc.au_nb("Depuis 0")
            sc.play(FadeOut(pt[2]), run_time=0.2)
            sc.au_nb("a 6")
            sc.rep(0, avec=[LaggedStart(*[Create(s) for s in bonds(dr, 0, 6, VERT_OK)], lag_ratio=0.12),
                            LaggedStart(*[FadeIn(n, scale=1.4) for n in numeros(dr, 0, 6, VERT_OK, dy=0.66)],
                                        lag_ratio=0.1)])
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["Le bus est au point bleu.", "Quel nombre ?"],
                            [self.inline("0,7"), self.inline("0,06"), self.inline("0,6")], 2,
                            ["6 sauts de 1 dixième : 0,6"], mot_q="Le bus", avant_q=avant, autres_r=apres)

    # ── 05 : 0,08 n'est pas 0,8 ─────────────────────────────────────────────
    def ecran_centiemes(self):
        self.ecran("05-centiemes")
        self.au_mot("Autre piège")
        self.titre("Autre piège !", ROUGE_ERREUR)
        d10 = droite(10, centre=P(XD, 1.3))
        self.play(FadeIn(d10), run_time=0.4)
        l1a = self.inline("0,8", 38, JAUNE_TITRE)
        l1b = self.inline("= 8 dixièmes", 38, JAUNE_TITRE)
        self.col(base(VGroup(l1a, l1b).arrange(RIGHT, buff=0.2)), 1.6)
        self.au_nb("! 0,8")
        self.play(FadeIn(l1a, scale=1.3), run_time=0.3)
        self.au_nb("0,8, c'est 8")
        self.play(FadeIn(l1b, shift=RIGHT * 0.15), run_time=0.3)
        p08 = d10.point(0.8)
        self.au_nb("dixièmes : 8")
        self.play(LaggedStart(*[Create(s) for s in bonds(d10, 0, 8)], lag_ratio=0.1), run_time=0.7)
        self.play(GrowFromEdge(p08, DOWN), run_time=0.3)
        l2a = self.inline("0,08", 38, VERT_OK)
        l2b = self.inline("= 8 centièmes", 38, VERT_OK)
        self.col(base(VGroup(l2a, l2b).arrange(RIGHT, buff=0.2)), 0.6)
        self.au_nb("Mais 0,08")
        self.play(FadeIn(l2a, scale=1.3), run_time=0.3)
        self.au_nb("0,08, c'est 8")
        self.play(FadeIn(l2b, shift=RIGHT * 0.15), run_time=0.3)
        l3 = self.col(self.inline("bien plus petit !", 36, VERT_OK), -0.15)
        self.au_mot("bien plus petit")
        self.play(FadeIn(l3, shift=RIGHT * 0.15), run_time=0.3)
        seg = Line(d10.p(0), d10.p(0.1), color=VERT_OK, stroke_width=12)
        self.au_mot("premier saut")
        self.play(Create(seg), run_time=0.4)
        zoom = Droite(0, 0.1, 10, etiquettes={0: "0", 0.1: "0,1"}, longueur=LD, centre=P(XD, -1.7))
        pas_audit(zoom)
        yz = zoom.carte.get_top()[1]
        guides = VGroup(DashedLine(d10.p(0), P(zoom.p(0)[0], yz), color=VERT_OK, stroke_width=3),
                        DashedLine(d10.p(0.1), P(zoom.p(0.1)[0], yz), color=VERT_OK, stroke_width=3))
        self.au_mot("10 petits pas")
        self.play(FadeIn(zoom.carte), Create(guides), run_time=0.4)
        self.play(FadeIn(VGroup(*[m for m in zoom.submobjects if m is not zoom.carte])), run_time=0.4)
        p008 = zoom.point(0.08, "0,08", couleur=VERT_OK)
        self.au_nb("0,08 est")
        self.play(GrowFromEdge(p008, DOWN), run_time=0.35)
        self.au_mot("avant 0,1")
        self.play(Indicate(zoom.etiquettes[0.1], color=AMBRE, scale_factor=1.6), run_time=0.45)
        self.insister(p008, 1.2, 0.25)
        self.attendre_voix()

    # ── 06 : le milieu : 0,5 = 0,50 ─────────────────────────────────────────
    def ecran_milieu(self):
        self.ecran("06-milieu")
        dr = droite(10, centre=P(XD, 0.6))
        self.au_mot("L'arrêt du marché")
        self.play(FadeIn(dr), run_time=0.4)
        self.au_mot("au milieu")
        self.titre("Le milieu")
        p05 = dr.point(0.5, "0,5", couleur=VERT_OK)
        l1 = self.col(self.inline("Marché : 0,5 km", 40, VERT_OK), 1.7)
        self.au_nb("route : 0,5")
        self.play(GrowFromEdge(p05, DOWN), FadeIn(l1, shift=RIGHT * 0.15), run_time=0.4)
        g = Line(dr.p(0), dr.p(0.5), color=AMBRE, stroke_width=10)
        d = Line(dr.p(0.5), dr.p(1), color=BLEU_CALCUL, stroke_width=10)
        l2 = self.col(self.inline("5 dixièmes", 38), 0.85)
        self.au_nb("kilomètre. 5")
        self.play(Create(g), FadeIn(l2, shift=RIGHT * 0.15), run_time=0.4)
        l3 = self.col(self.inline("= la moitié de 1", 38), 0.15)
        self.au_nb("moitié de 1")
        self.play(Create(d), FadeIn(l3, shift=RIGHT * 0.15), run_time=0.4)
        pan = pas_audit(panneau("Marché", "#15803d", 22))
        km = self.inline("0,50 km", 30, WHITE)
        pan2 = VGroup(pan, km.next_to(pan, DOWN, buff=0.08))
        fond = RoundedRectangle(width=pan2.width + 0.3, height=pan2.height + 0.25, corner_radius=0.1,
                                fill_color="#14532d", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        pan.set_z_index(1)
        km.set_z_index(1)
        pied = Line(P(0, 0), P(0, 0.5), color="#94a3b8", stroke_width=6)
        enseigne = VGroup(fond.move_to(pan2), pan, km)
        enseigne.move_to(P(dr.p(0.5)[0], -1.75))
        pied.next_to(enseigne, UP, buff=0)
        self.au_mot("Sur le panneau")
        self.play(FadeIn(fond), FadeIn(pan), Create(pied), run_time=0.4)
        self.au_nb("lit 0,50")
        self.play(FadeIn(km, scale=1.3), run_time=0.3)
        l4 = self.col(self.inline("le même nombre !", 40, JAUNE_TITRE), -0.75)
        self.au_mot("même nombre")
        self.play(FadeIn(l4, scale=1.2), run_time=0.35)
        l5 = self.col(self.bloc(["Le zéro à la fin", "ne change rien."], 34, AMBRE), -1.9)
        self.au_mot("Le zéro")
        self.poser_lignes(l5, "up", 0.3)
        self.au_mot("même place")
        self.insister(p05, 1.2, 0.25)
        self.attendre_voix()

    # ── 07 : 10 dixièmes = 1, puis 3,7 entre 3 et 4 ─────────────────────────
    def ecran_apres(self):
        self.ecran("07-apres")
        d01 = droite(10, centre=P(XD, 1.3))
        self.add(d01)
        self.au_nb("bout de 10")
        self.play(LaggedStart(*[Create(s) for s in bonds(d01, 0, 10)], lag_ratio=0.08), run_time=0.9)
        self.au_nb("arrive à 1")
        self.titre("Après 1", avec_indic=d01.etiquettes[1])
        l1a = self.inline("10 dixièmes", 38, JAUNE_TITRE)
        l1b = self.inline("= 1 km", 38, JAUNE_TITRE)
        self.col(base(VGroup(l1a, l1b).arrange(RIGHT, buff=0.2)), 1.6)
        self.au_nb(": 10")
        self.play(FadeIn(l1a, shift=RIGHT * 0.15), run_time=0.3)
        self.au_nb("c'est 1")
        self.play(FadeIn(l1b, scale=1.3), run_time=0.3)
        d34 = droite(10, 3, 4, centre=P(XD, -1.7))
        b = bus(0.7).move_to(P(d34.p(3)[0], -1.7 + 1.05))
        self.au_nb("kilomètre 3")
        self.play(FadeIn(d34), FadeIn(b, shift=RIGHT * 0.3), run_time=0.45)
        l2a = self.inline("Depuis 3 :", 36, AMBRE)
        l2b = self.inline("7 sauts", 36, AMBRE)
        self.col(base(VGroup(l2a, l2b).arrange(RIGHT, buff=0.2)), 0.5)
        self.au_nb("On part de 3")
        self.play(Indicate(d34.etiquettes[3], color=AMBRE, scale_factor=1.7), FadeIn(l2a, shift=RIGHT * 0.15),
                  run_time=0.45)
        self.au_nb("fait 7")
        self.play(LaggedStart(*[Create(s) for s in bonds(d34, 0, 7)], lag_ratio=0.12),
                  b.animate.move_to(P(d34.p(3.7)[0], -1.7 + 1.05)), FadeIn(l2b, shift=RIGHT * 0.15), run_time=0.9)
        p37 = d34.point(3.7)
        t37 = sous_trait(d34, 7, "3,7", VERT_OK, 26)
        l3 = self.col(self.inline("3,7 km", 42, VERT_OK), -0.3)
        self.au_nb("sauts : 3,7")
        self.play(GrowFromEdge(p37, DOWN), FadeIn(t37, scale=1.3), FadeIn(l3, scale=1.2), run_time=0.4)
        l4a = self.inline("3 unités", 34)
        l4b = self.inline("et 7 dixièmes", 34)
        self.col(base(VGroup(l4a, l4b).arrange(RIGHT, buff=0.2)), -1.1)
        self.au_nb("C'est 3")
        self.play(FadeIn(l4a, shift=RIGHT * 0.15), run_time=0.3)
        self.au_nb("et 7")
        self.play(FadeIn(l4b, shift=RIGHT * 0.15), run_time=0.3)
        self.insister(VGroup(p37, t37), 1.2, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (2,4 sur une droite de 2 à 3) ──────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        dr = droite(10, 2, 3, centre=P(XD, 0.0))
        pt = dr.point(2.4, "?")

        def avant(sc):
            sc.play(FadeIn(dr), GrowFromEdge(pt, DOWN), run_time=0.3)

        def apres(sc):
            sc.au_nb("part de 2")
            sc.rep(0, avec=[FadeOut(pt[2]), Indicate(dr.etiquettes[2], color=AMBRE, scale_factor=1.7)])
            sc.au_nb("pas de 0")
            sc.rep(1)
            sc.au_nb("Puis 4")
            sc.rep(2, avec=[LaggedStart(*[Create(s) for s in bonds(dr, 0, 4, VERT_OK)], lag_ratio=0.12)])
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse", ["Cette droite va de 2 à 3.", "Où est le point bleu ?"],
                            [self.inline("0,4"), self.inline("2,4"), self.inline("2,5")], 1,
                            ["On part de 2,", "pas de 0.", "4 sauts : 2,4"], mot_q="Cette droite", avant_q=avant,
                            autres_r=apres)

    # ── 09 : défi (placer 4,6) ──────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.5)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        l1 = self.col(self.inline("Arrêt à 4,6 km", 40, JAUNE_TITRE), 1.9)
        self.au_nb("arrêt à 4,6")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.35)
        dr = droite(10, 4, 5, centre=P(XD, 0.3))
        self.au_nb("de 4 à 5")
        self.play(FadeIn(dr), run_time=0.45)
        q = self.col(self.inline("À quel trait après 4 ?", 36, ORANGE_RETENUE), 1.05)
        self.au_nb("trait après 4")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        choix = VGroup()
        for k, (mot, txt) in enumerate((("A : le 4", "A : le 4e trait"), ("B : le 6", "B : le 6e trait"),
                                        ("C : le 7", "C : le 7e trait"))):
            c = self.col(self.inline(txt, 36), 0.2 - 0.7 * k)
            self.au_nb(mot)
            self.play(FadeIn(c, shift=RIGHT * 0.15), run_time=0.3)
            choix.add(c)
        self.choix_defi = choix
        self.pause_defi(y=-2.1)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.5)
        self.XL = XL_LC
        self.titre("Correction", fs=50)
        dr = droite(10, 4, 5, centre=P(XC, 0.3), longueur=LC)
        self.add(dr)
        c1 = self.inline("4,6 =", 38, JAUNE_TITRE)
        c2 = self.inline("4 unités", 38, JAUNE_TITRE)
        c3 = self.inline("et 6 dixièmes", 38, JAUNE_TITRE)
        self.col(base(VGroup(c1, c2).arrange(RIGHT, buff=0.26)), 1.9)
        self.col(c3, 1.3)
        self.au_nb("Correction. 4,6")
        self.play(FadeIn(c1, shift=RIGHT * 0.15), run_time=0.3)
        self.au_nb("c'est 4")
        self.play(FadeIn(c2, shift=RIGHT * 0.15), run_time=0.3)
        self.au_nb("et 6")
        self.play(FadeIn(c3, shift=RIGHT * 0.15), run_time=0.3)
        l2a = self.inline("Depuis 4 :", 36, AMBRE)
        l2b = self.inline("6 sauts", 36, AMBRE)
        self.col(base(VGroup(l2a, l2b).arrange(RIGHT, buff=0.2)), 0.6)
        self.au_nb("part de 4")
        self.play(Indicate(dr.etiquettes[4], color=AMBRE, scale_factor=1.7), FadeIn(l2a, shift=RIGHT * 0.15),
                  run_time=0.45)
        self.au_nb("fait 6")
        self.play(FadeIn(l2b, shift=RIGHT * 0.15), run_time=0.3)
        mots = [("sauts : 4,1", "4,1")] + [(f"{dec(4 + (k - 1) / 10)}, {dec(4 + k / 10)}", dec(4 + k / 10))
                                          for k in range(2, 7)]
        self.compter(dr, mots, couleur=VERT_OK, fs=24)
        pt = dr.point(4.6, couleur=VERT_OK)
        self.play(GrowFromEdge(pt, DOWN), run_time=0.3)
        r1 = self.inline("B : le 6e trait", 36, VERT_OK)
        r2 = self.inline("après 4", 36, VERT_OK)
        r = self.col(VGroup(r1, r2).arrange(DOWN, buff=0.12), -0.45)
        self.au_nb("6e trait")
        self.play(FadeIn(r1, scale=1.15), run_time=0.3)
        self.au_nb("après 4")
        self.play(FadeIn(r2, scale=1.15), run_time=0.3)
        self.play(Create(self.encadrer(r, buff=0.12)), run_time=0.3)
        self.attendre_voix(marge=1.2)
        self.XL = DecimalDroiteBase.XL

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.5)
        self.XL = -1.0   # la colonne de texte s'élargit : la figure est petite, à gauche
        dr = droite(10, centre=ORIGIN, longueur=3.0)
        fig = VGroup(dr, dr.point(0.7), bonds(dr, 0, 7))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Entre deux entiers, 10 parts égales :",
                                                          "chaque saut vaut 1 dixième, 0,1."),
                                                         ("Pour placer 0,7 : on part de 0", "et on fait 7 sauts."),
                                                         ("On compte les sauts,", "pas le trait du départ."),
                                                         ("0,5 et 0,50 :", "la même place.")], fs=36)
        self.au_mot("Entre deux entiers")
        self.montrer_ligne(lignes[0])
        self.au_mot("Pour placer")
        self.montrer_ligne(lignes[1])
        self.au_mot("On compte les sauts")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et 0,5")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)


class DecimalDroiteCM1(DecimalDroiteBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class DecimalDroiteCM2(DecimalDroiteBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
