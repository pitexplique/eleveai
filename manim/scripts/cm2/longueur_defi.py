# longueur_defi.py
# EleveAI — Maths CM2 — série « Longueurs », épisode 04 : UN DÉFI DE LONGUEURS (à étapes)
# (micro longueur_defi, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Décor et métier : Nathan, TECHNICIEN FIBRE OPTIQUE (une bobine de 2,5 km, deux rues câblées).
# Mapping micro → écrans : 02 (un défi en étapes : la même unité, puis les calculs un par un),
# 03 (2,5 km = 2 500 m dans le tableau), 04 (schéma en barre : 1 200 + 850 = 2 050 ; 2 500 − 2 050 = 450 m),
# 06 (piège : 2,5 − 1 200 n'a pas de sens), questions 05 (4 maisons × 35 m, C) et 07 (6 m en morceaux de 75 cm, A),
# défi 08 (rue de 1,2 km, un boîtier tous les 150 m, aux deux bouts : 8 espaces, 9 boîtiers).
# Voix : manim/voix/cm2-longueur-defi.json (validée le 15/11, Julie, débit −6) ;
# marques : longueur_defi_marques.json (python manim/scripts/cm2/aire_marques_cm2.py longueur:defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/longueur_defi.py LongueurDefiCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/longueur_defi.py LongueurDefiCM2 -o eleveai-maths-cm2-longueur-defi --media_dir manim/scripts/cm2/media-longueur-04
# Sortie : manim/sorties/cm2/maths/longueurs/04-defi/eleveai-maths-cm2-longueur-defi.mp4

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_cm2_commun import *  # noqa: E402,F403

FIBRE2 = "#0891b2"     # le second câble (cyan foncé)
BOIS_B2 = "#b45309"    # le bois de la bobine
GOUDRON = "#475569"
TROTTOIR = "#94a3b8"
MUR = "#fde68a"
TOIT = "#dc2626"
PEAU = "#e0ac69"
VIRG = ROUGE_ERREUR


# ── Les dessins de l'épisode ───────────────────────────────────────────────

def bobine(r=1.0):
    """La bobine de câble, vue de face : le flasque en bois, les tours de câble cyan, le moyeu."""
    flasque = Circle(radius=r, fill_color=BOIS_B2, fill_opacity=1, stroke_color="#78350f", stroke_width=4)
    cable = Circle(radius=r * 0.8, fill_color=FIBRE, fill_opacity=1, stroke_color=FIBRE2, stroke_width=2)
    tours = VGroup(*[Circle(radius=r * (0.38 + 0.07 * k), stroke_color=FIBRE2, stroke_width=2) for k in range(6)])
    moyeu = Circle(radius=r * 0.3, fill_color="#78350f", fill_opacity=1, stroke_color="#451a03", stroke_width=3)
    trou = Circle(radius=r * 0.1, fill_color="#0f172a", fill_opacity=1, stroke_width=0)
    bout = VMobject(stroke_color=FIBRE, stroke_width=7).set_points_smoothly(
        [P(r * 0.78, -r * 0.1), P(r * 1.15, -r * 0.55), P(r * 1.5, -r * 0.85)])
    return VGroup(flasque, cable, tours, moyeu, trou, bout)


def maison(s=1.0, boitier_mur=True):
    """Une maison : le mur, le toit rouge, la porte, et son petit boîtier fibre sur le mur."""
    mur = Square(0.7 * s, fill_color=MUR, fill_opacity=1, stroke_color="#92400e", stroke_width=2)
    toit = Polygon(mur.get_corner(UL) + LEFT * 0.08 * s, mur.get_corner(UR) + RIGHT * 0.08 * s,
                   mur.get_top() + UP * 0.38 * s, fill_color=TOIT, fill_opacity=1, stroke_width=0)
    porte = Rectangle(width=0.18 * s, height=0.32 * s, fill_color="#92400e", fill_opacity=1, stroke_width=0)
    porte.align_to(mur, DOWN).shift(LEFT * 0.12 * s)
    g = VGroup(mur, toit, porte)
    if boitier_mur:
        g.add(boitier(0.55 * s).move_to(mur.get_center() + P(0.18 * s, 0.05 * s)))
    return g


def boitier(s=1.0):
    """Le boîtier de fibre : une boîte grise, une diode cyan."""
    b = RoundedRectangle(width=0.36 * s, height=0.44 * s, corner_radius=0.06 * s, fill_color="#e5e7eb",
                         fill_opacity=1, stroke_color="#334155", stroke_width=2)
    d = Dot(b.get_center() + UP * 0.1 * s, radius=0.05 * s, color=FIBRE)
    return VGroup(b, d)


def rue(longueur, h=0.32):
    """Une rue vue de haut : la chaussée grise, une ligne blanche, le câble cyan le long du trottoir."""
    r = Rectangle(width=longueur, height=h, fill_color=GOUDRON, fill_opacity=1, stroke_width=0)
    tr = Rectangle(width=longueur, height=0.08, fill_color=TROTTOIR, fill_opacity=1, stroke_width=0)
    tr.next_to(r, UP, buff=0)
    tirets = DashedLine(r.get_left() + RIGHT * 0.1, r.get_right() + LEFT * 0.1, dash_length=0.16,
                        color=WHITE, stroke_width=2)
    g = VGroup(r, tr, tirets)
    g.chaussee, g.trottoir = r, tr
    return g


def cable_le_long(rue_, couleur=FIBRE):
    """Le câble posé le long du trottoir de la rue."""
    tr = rue_.trottoir
    return Line(tr.get_left(), tr.get_right(), color=couleur, stroke_width=6)


def main_ouverte(s=1.0):
    """Une main ouverte, doigts écartés (5 doigts, 4 espaces) : [0] la paume, [1] les doigts."""
    paume = RoundedRectangle(width=1.5 * s, height=1.3 * s, corner_radius=0.4 * s, fill_color=PEAU,
                             fill_opacity=1, stroke_color="#92400e", stroke_width=2)
    doigts = VGroup()
    hs = [0.9, 1.15, 1.25, 1.12, 0.9]
    xs = [-0.6, -0.3, 0.0, 0.3, 0.6]
    for k, (x, h) in enumerate(zip(xs, hs)):
        d = RoundedRectangle(width=0.24 * s, height=h * s, corner_radius=0.11 * s, fill_color=PEAU,
                             fill_opacity=1, stroke_color="#92400e", stroke_width=2)
        d.move_to(paume.get_top() + P(x * s, h * s / 2 - 0.12 * s))
        if k == 0:
            d.rotate(0.55, about_point=d.get_bottom()).shift(LEFT * 0.12 * s + DOWN * 0.35 * s)
        doigts.add(d)
    return VGroup(paume, doigts)


def ciseaux(s=1.0):
    l1 = Line(P(0, 0), P(0.55, 0.18), color="#e5e7eb", stroke_width=6)
    l2 = Line(P(0, 0), P(0.55, -0.18), color="#e5e7eb", stroke_width=6)
    a1 = Circle(radius=0.11, color=ROUGE_ERREUR, stroke_width=5).move_to(P(-0.15, 0.12))
    a2 = Circle(radius=0.11, color=ROUGE_ERREUR, stroke_width=5).move_to(P(-0.15, -0.12))
    return VGroup(l1, l2, a1, a2).scale(s)


def virgule(t, u, fs=44):
    c = t.cases[u]
    v = Text(",", font_size=fs, color=VIRG, weight=BOLD)
    v.move_to(P(c.get_right()[0], c.get_bottom()[1] + 0.2))
    return hors_audit(v)


def place_virgule(t, u):
    c = t.cases[u]
    return P(c.get_right()[0], c.get_bottom()[1] + 0.2)


def pastille(s, couleur=ORANGE_RETENUE, r=0.26, fs=28):
    """Un numéro d'étape dans un rond (hors audit : la voix ne dit pas « 1 », « 2 »)."""
    c = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0)
    t = Text(s, font_size=fs, color="#0f172a", weight=BOLD).move_to(c)
    return hors_audit(VGroup(c, t))


class LongueurDefiBase(PaysageLongueurCM2):
    nom_voix = "cm2-longueur-defi"
    fichier_marques = "longueur_defi_marques.json"
    ceinture = "bleue"

    # Lignes de réponse dont un nombre est REDIT plus de 1,5 s après sa 1re fois : instant forcé.
    _forces = {("07b-reponse", "8 × 75 = 600 :"): 5.2, ("07b-reponse", "8 morceaux."): 6.73}

    def _force(self, f):
        cle = getattr(self, "_cle_voix", None)
        t = self._forces.get((cle, getattr(f, "original_text", None)))
        if t is None:
            for x in f.get_family():
                c = getattr(x, "_force_t", None)
                if c is not None and c[0] == cle:
                    return c[1]
        return t

    def _disposer_q(self, question, choix, phrase):
        r = super()._disposer_q(question, choix, phrase)
        for (cle, txt), t in self._forces.items():
            for f in r[5].get_family():
                if isinstance(f, Text) and f.original_text == txt:
                    for x in f.get_family():
                        x._force_t = (cle, t)
        return r

    def _attente(self, textes):
        for f in textes:
            t = self._force(f)
            if t is not None:
                return max(0.0, self._debut_voix + t - self.renderer.time)
        return super()._attente(textes)

    def a_l_instant(self, t):
        """Attendre l'instant t (s) de la voix de l'écran : pour un mot SANS marque, estimé sur la voix."""
        reste = self._debut_voix + t - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def t(self, s, fs=40, color=WHITE):
        """Un nombre écrit « 2 500 » : l'audit le lit 2500 (absent de la voix « 2 500 ») → hors audit,
        la synchro le pose toujours à son mot."""
        m = super().t(s, fs, color)
        if re.search(r"\d \d{3}", s):
            for f in m.get_family():
                f._pas_audit = True
        return m

    def poser(self, m, extrait=None, n=1, run_time=0.25, anim=None):
        """Un morceau hors synchro (un nombre redit), posé à SON extrait de la voix
        (au_mot attend le DÉBUT de l'extrait : il commence par le nombre)."""
        hors_audit(m)
        if extrait:
            self.au_mot(extrait, n)
        self.play(anim if anim is not None else FadeIn(m, shift=UP * 0.08), run_time=run_time)
        return m

    def colonne(self, t, u):
        i = list(t.tete.keys()).index(u)
        return VGroup(*t[3 * i:3 * i + 3])

    def pause_defi(self, y=-2.6, marge=2.0, x=-6.2):
        """« Mets pause, et cherche ! » à GAUCHE (à droite, il collait à Ti-Margo)."""
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), x, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi de longueurs", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défi de longueurs")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Combien de câble", 38, JAUNE_TITRE)
        q1 = self.t("reste-t-il sur la bobine ?", 38, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        bo = bobine(1.05).move_to(P(3.7, 0.35))
        self.au_mot("Combien de câble")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(bo, scale=0.8), run_time=0.35)
        self.au_mot("reste-t-il")
        self.play(FadeIn(q1, shift=UP * 0.2), Rotate(VGroup(*bo[:5]), angle=-PI / 2), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nathan, technicien fibre optique ───────────────────────────────
    E = 0.004  # 1 m de rue = 0,004 unité (1 200 m = 4,8)

    def ecran_situation(self):
        self.ecran("01-situation")
        pe = nathan(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Nathan")
        nom = self.t("Nathan", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.4)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.bloc(["technicien", "fibre optique"], 24, JAUNE_TITRE, buff=0.06)
        for m in met:
            m.set_x(pe.get_x())
        met.next_to(pe, DOWN, buff=0.12)
        XL = -2.9
        l0 = VGroup(self.ligne([("Il installe", WHITE), ("la fibre optique :", WHITE)], 30, buff=0.15),
                    self.t("internet dans les maisons.", 30)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        gauche(l0, XL, 2.75)
        self.au_mot("Il installe")
        self.play(FadeIn(met[0], shift=DOWN * 0.1), FadeIn(l0[0][0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("la fibre optique")
        self.play(FadeIn(l0[0][1], shift=UP * 0.1), FadeIn(met[1], shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("internet dans les maisons")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        bo = bobine(0.75).move_to(P(4.85, 2.35))
        l1 = self.ligne([("Sa bobine :", WHITE), ("2,5 km", FIBRE), ("de câble.", WHITE)], 34, buff=0.18)
        gauche(l1, XL, 1.55)
        self.au_mot("une bobine")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(bo, scale=0.8), run_time=0.35)
        eb = etiq(bo[0], "2,5 km", 28, FIBRE, cote=DOWN, buff=0.12)
        self.au_mot("2,5 kilomètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(eb), run_time=0.3)
        self.au_mot("de câble")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        # les deux rues, à l'échelle
        r1 = rue(1200 * self.E)
        gauche(r1, XL, -1.5)
        r2 = rue(850 * self.E)
        gauche(r2, XL, -2.6)
        ms = VGroup(*[maison(0.62).next_to(r1, UP, buff=0.02).set_x(r1.get_left()[0] + x)
                      for x in (0.6, 2.0, 3.4, 4.5)])
        ms2 = VGroup(*[maison(0.62).next_to(r2, UP, buff=0.02).set_x(r2.get_left()[0] + x)
                       for x in (0.6, 2.0, 3.0)])
        c1, c2 = cable_le_long(r1), cable_le_long(r2)
        e1 = etiq(r1, "1 200 m", 28, FIBRE)
        e2 = etiq(r2, "850 m", 28, FIBRE)
        l2 = self.ligne([("Il en pose", WHITE), ("1 200 m", JAUNE_TITRE), ("dans une rue,", WHITE)], 34, buff=0.18)
        gauche(l2, XL, 0.9)
        self.au_mot("Il en pose")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(r1), FadeIn(ms), run_time=0.3)
        self.au_mot("1 200 mètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(c1), FadeIn(e1), run_time=0.45)
        self.au_mot("dans une rue")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.25)
        l3 = self.ligne([("et", WHITE), ("850 m", JAUNE_TITRE), ("dans une autre.", WHITE)], 34, buff=0.18)
        gauche(l3, XL, 0.25)
        self.au_mot("et 850")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(r2), FadeIn(ms2), run_time=0.25)
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(c2), FadeIn(e2), run_time=0.45)
        self.au_mot("dans une autre")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.25)
        q = self.t("Combien en reste-t-il ?", 40, JAUNE_TITRE)
        gauche(q, XL, -0.45)
        self.au_mot("Combien en reste-t-il")
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(bo), run_time=0.5)
        self.attendre_voix()

    # ── 02 : un défi se fait en étapes ──────────────────────────────────────
    def ecran_etapes(self):
        self.ecran("02-etapes")
        tit = self.t("Un défi se fait en étapes.", 44, JAUNE_TITRE).move_to(P(0, 2.95))
        self.au_mot("Un défi se fait")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.35)
        sol = -2.6
        m1 = Rectangle(width=2.1, height=1.1, fill_color="#334155", fill_opacity=1, stroke_color=WHITE,
                       stroke_width=2).move_to(P(-5.0, sol + 0.55))
        m2 = Rectangle(width=2.1, height=2.2, fill_color="#1e3a8a", fill_opacity=1, stroke_color=WHITE,
                       stroke_width=2).move_to(P(-2.9, sol + 1.1))
        p1 = pastille("1").move_to(m1)
        p2 = pastille("2", VERT_OK).move_to(m2)
        pe = nathan(0.48)
        pe.move_to(P(-5.0, 0)).align_to(m1, UP).shift(UP * pe.height)
        self.play(FadeIn(m1), FadeIn(m2), FadeIn(p1), FadeIn(p2), FadeIn(pe, shift=UP * 0.2), run_time=0.4)
        XP = -1.5
        q1 = pastille("1").move_to(P(XP + 0.26, 0.9))
        l1 = self.ligne([("D'abord,", WHITE), ("la même unité.", ORANGE_RETENUE)], 38, buff=0.22)
        gauche(l1, XP + 0.75, 0.9)
        self.au_mot("D'abord")
        self.play(FadeIn(q1, scale=1.3), FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la même unité")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(m1, color=ORANGE_RETENUE, scale_factor=1.05), run_time=0.4)
        q2 = pastille("2", VERT_OK).move_to(P(XP + 0.26, -0.4))
        l2 = self.ligne([("Puis les calculs,", WHITE), ("un par un.", VERT_OK)], 36, buff=0.2)
        gauche(l2, XP + 0.75, -0.4)
        self.au_mot("Puis les calculs")
        self.play(FadeIn(q2, scale=1.3), FadeIn(l2[0], shift=UP * 0.1),
                  pe.animate.shift(P(m2.get_x() - m1.get_x(), m2.get_top()[1] - m1.get_top()[1])), run_time=0.5)
        self.au_mot("un par un")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(m2, color=VERT_OK, scale_factor=1.05), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la même unité ──────────────────────────────────────────────────
    def ecran_meme_unite(self):
        self.ecran("03-meme-unite")
        tit = self.t("D'abord la même unité", 42, ORANGE_RETENUE).move_to(P(0, 3.0))
        bo = bobine(1.0).move_to(P(-4.6, 0.75))
        eb = etiq(bo[0], "2,5 km", 30, FIBRE, cote=DOWN, buff=0.15)
        cols = ["km", "hm", "dam", "m"]
        t = tableau_conv(cols, cw=1.3, ch=0.62, fs=28, surligne=("km", "m")).move_to(P(1.4, 1.35))
        self.add(tit)
        l1 = self.ligne([("2,5 km", BLEU_D), ("= 2 500 m", VERT_OK)], 54, buff=0.3)
        gauche(l1, -1.2, -1.0)
        ch = VGroup(chiffre(t, "km", "2", fs=38), chiffre(t, "hm", "5", fs=38))
        v = virgule(t, "km")
        self.au_mot("2,5")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(bo, scale=0.9), FadeIn(eb), FadeIn(t), FadeIn(ch), FadeIn(v),
                  run_time=0.35)
        self.au_mot("c'est")
        z = VGroup(*[chiffre(t, x, "0", ORANGE_RETENUE, fs=38) for x in ("dam", "m")])
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in z], lag_ratio=0.4),
                  v.animate.move_to(place_virgule(t, "m")), run_time=0.3)
        e2 = etiq(bo[0], "2 500 m", 30, VERT_OK, cote=DOWN, buff=0.15)
        self.play(FadeIn(l1[1], scale=1.15), FadeOut(v), Transform(eb, e2), run_time=0.35)
        self.insister(l1, 1.08, 0.25)
        self.attendre_voix()

    # ── 04 : le calcul, avec le schéma en barre ─────────────────────────────
    def ecran_calcul(self):
        self.ecran("04-calcul")
        ech = 0.0024  # 2 500 m = 6 unités
        b = barre([1200, 850, 450], ech, couleurs=(FIBRE, FIBRE2, "#475569"), h=0.7, inconnue=2)
        b.move_to(P(-0.6, 1.55))
        haut = Brace(b, UP, color=JAUNE_TITRE)
        th = hors_audit(VGroup(Text("la bobine :", font_size=28, color=JAUNE_TITRE),
                               Text("2 500 m", font_size=28, color=JAUNE_TITRE, weight=BOLD)))
        th.arrange(RIGHT, buff=0.15).next_to(haut, UP, buff=0.1)
        fond = Rectangle(width=b.width, height=b.height, fill_color="#1e293b", fill_opacity=1, stroke_color=WHITE,
                         stroke_width=3).move_to(b)
        XL = -5.6
        l1 = self.ligne([("Déjà posés :", WHITE), ("1 200 + 850", BLEU_D), ("= 2 050 m", VERT_OK)], 40, buff=0.25)
        gauche(l1, XL, -0.55)
        self.play(FadeIn(fond), FadeIn(haut), FadeIn(th), FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        b1 = Brace(b[0], DOWN, color=FIBRE)
        t1 = hors_audit(Text("1 200 m", font_size=26, color=FIBRE, weight=BOLD)).next_to(b1, DOWN, buff=0.06)
        b2 = Brace(b[1], DOWN, color=FIBRE)
        t2 = hors_audit(Text("850 m", font_size=26, color=FIBRE, weight=BOLD)).next_to(b2, DOWN, buff=0.06)
        self.au_mot("1 200 plus")
        self.play(GrowFromEdge(b[0], LEFT), GrowFromCenter(b1), FadeIn(t1), run_time=0.35)
        self.au_mot("850, 2 050")
        self.play(FadeIn(l1[1], shift=UP * 0.1), GrowFromEdge(b[1], LEFT), GrowFromCenter(b2), FadeIn(t2),
                  run_time=0.35)
        self.au_mot("2 050 mètres")
        self.play(FadeIn(l1[2], shift=UP * 0.1), Indicate(VGroup(b[0], b[1]), color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.4)
        l2 = self.ligne([("Il reste :", WHITE), ("2 500 −", BLEU_D), ("2 050", BLEU_D), ("= 450 m", VERT_OK)], 40,
                        buff=0.22)
        gauche(l2, XL, -1.55)
        self.au_mot("Il reste")
        b3 = Brace(b[2], DOWN, color=ORANGE_RETENUE)
        qm = hors_audit(Text("?", font_size=30, color=ORANGE_RETENUE, weight=BOLD)).next_to(b3, DOWN, buff=0.06)
        self.play(FadeIn(l2[0], shift=UP * 0.1), GrowFromEdge(b[2], LEFT), GrowFromCenter(b3), FadeIn(qm, scale=1.3),
                  run_time=0.35)
        self.au_mot("2 500 moins")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(th, color=JAUNE_TITRE), run_time=0.3)
        self.a_l_instant(7.9)  # « 2 050 » n'a pas de marque à lui (dans « 2 500 moins 2 050 »)
        self.poser(l2[2])
        self.au_mot("450 mètres")
        t450 = hors_audit(Text("450 m", font_size=28, color=VERT_OK, weight=BOLD)).move_to(qm)
        self.play(FadeIn(l2[3], scale=1.2), Transform(qm, t450), b[2].animate.set_fill(VERT_OK, 0.55), run_time=0.4)
        self.insister(l2[3], 1.15, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def figure_q1(self):
        ms = VGroup(*[maison(0.95) for _ in range(4)]).arrange(RIGHT, buff=0.45)
        cs = VGroup(*[Line(m[0].get_corner(DL) + DOWN * 0.15, m[0].get_corner(DR) + DOWN * 0.15 + RIGHT * 0.3,
                           color=FIBRE, stroke_width=6) for m in ms])
        e = hors_audit(Text("35 m", font_size=24, color=FIBRE, weight=BOLD)).next_to(cs[0], DOWN, buff=0.1)
        return VGroup(ms, cs, e).move_to(P(-3.8, 1.6))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["Nathan relie 4 maisons.", "Il faut 35 m par maison.", "Combien en tout ?"],
                             [self.choix("39 m"), self.choix("1 400 m"), self.choix("140 m")], 2,
                             ["4 × 35 = 140 m", "de câble."],
                             -0.25, mot_q="Nathan relie", autres_q=autres_q)

    # ── 06 : le piège (2,5 − 1 200 n'a pas de sens) ─────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        bo = bobine(0.8).move_to(P(-5.0, 1.15))
        eb = etiq(bo[0], "2,5 km", 28, FIBRE, cote=DOWN, buff=0.12)
        r1 = rue(2.6)
        gauche(r1, -6.1, -1.15)
        c1 = cable_le_long(r1)
        er = etiq(r1, "1 200 m", 26, FIBRE, cote=DOWN, buff=0.12)
        XP = -2.4
        l0 = self.bloc(["On ne calcule jamais avec", "deux unités différentes."], 34)
        self.col(l0, 2.05, XP)
        self.au_mot("On ne calcule jamais")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("deux unités différentes")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(bo), FadeIn(eb), FadeIn(r1), FadeIn(c1), FadeIn(er),
                  run_time=0.35)
        l1 = self.ligne([("2,5", ROUGE_ERREUR), ("− 1 200", ROUGE_ERREUR)], 46, buff=0.22)
        self.col(l1, 0.6, XP)
        self.au_mot("2,5 moins")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(eb, color=ROUGE_ERREUR), run_time=0.3)
        self.au_mot("1 200, ça")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(er, color=ROUGE_ERREUR), run_time=0.3)
        l1b = self.t("ça n'a pas de sens !", 38, ROUGE_ERREUR)
        gauche(l1b, l1.get_right()[0] + 0.35, 0.6)
        if l1b.get_right()[0] > 6.4:
            self.col(l1b, -0.15, XP)
        barre_ = Line(l1.get_left() + LEFT * 0.1, l1.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=6)
        self.au_mot("ça n'a pas de sens")
        self.play(FadeIn(l1b, shift=UP * 0.1), Create(barre_), run_time=0.4)
        l2 = self.ligne([("2,5 km", BLEU_D), ("= 2 500 m", VERT_OK)], 46, buff=0.3)
        self.col(l2, -1.0, XP)
        l15 = self.t("D'abord :", 34, ORANGE_RETENUE)
        gauche(l15, XP, -1.0)
        l2.next_to(l15, RIGHT, buff=0.3)
        self.au_mot("il faut d'abord")
        self.play(FadeIn(l15, shift=UP * 0.1), run_time=0.25)
        self.poser(l2[0], "2,5", n=2)
        self.au_mot("2 500")
        e2 = etiq(bo[0], "2 500 m", 28, VERT_OK, cote=DOWN, buff=0.12)
        self.play(FadeIn(l2[1], scale=1.15), Transform(eb, e2), run_time=0.35)
        self.insister(l2, 1.08, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        u = 0.75  # 1 m de câble = 0,75 unité
        c = Rectangle(width=6 * u, height=0.22, fill_color=FIBRE, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        cut = DashedLine(c.get_corner(UL) + P(0.75 * u, 0.25), c.get_corner(DL) + P(0.75 * u, -0.25),
                         color=JAUNE_TITRE, stroke_width=3, dash_length=0.08)
        cs = ciseaux(1.1).rotate(-PI / 2).next_to(cut, UP, buff=0.02)
        b = Brace(Line(c.get_corner(DL), c.get_corner(DL) + RIGHT * 0.75 * u), DOWN, color=JAUNE_TITRE, buff=0.08)
        e = hors_audit(Text("75 cm", font_size=24, color=JAUNE_TITRE, weight=BOLD)).next_to(b, DOWN, buff=0.06)
        e.align_to(c, LEFT)
        g = VGroup(c, cut, cs, b, e).move_to(P(-3.8, 1.45))
        acc = accolade(c, "6 m", 30, FIBRE)
        return VGroup(g, acc)

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Nathan coupe 6 m de câble", "en morceaux de 75 cm.", "Combien de morceaux ?"],
                             [self.choix("8 morceaux"), self.choix("80 morceaux"), self.choix("12 morceaux")], 0,
                             ["6 m = 600 cm.", "8 × 75 = 600 :", "8 morceaux."],
                             -0.25, sans_audit=(1, 2), mot_q="Nathan coupe", autres_q=autres_q)

    # ── 08 : le défi (rue de 1,2 km, un boîtier tous les 150 m) ─────────────
    U = 4.6   # 1 km de rue = 4,6 unités (1 200 m = 5,52 ; 150 m = 0,69)
    X0 = -6.1

    def rue_defi(self, y=1.55):
        r = rue(1.2 * self.U)
        gauche(r, self.X0, y)
        return r

    def boitier_sur(self, r, x, s=0.8):
        return boitier(s).next_to(P(x, r.trottoir.get_top()[1]), UP, buff=0.02)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        r = self.rue_defi()
        acc = accolade(r.chaussee, "1,2 km", 28, dessus=False)
        XP = 0.55
        l0 = self.ligne([("Une rue :", WHITE), ("1,2 km.", JAUNE_TITRE)], 38, buff=0.2)
        self.col(l0, 2.2, XP)
        self.au_mot("Une rue")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(r), run_time=0.3)
        self.au_mot("mesure 1,2")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(acc), run_time=0.3)
        pas = 0.15 * self.U
        x0 = r.get_left()[0]
        bx0 = self.boitier_sur(r, x0)
        bx1 = self.boitier_sur(r, x0 + pas)
        bfin = self.boitier_sur(r, x0 + 8 * pas)
        b150 = Brace(Line(P(x0, 0), P(x0 + pas, 0)), UP, color=JAUNE_TITRE, buff=0)
        b150.next_to(bx0, UP, buff=0.05).set_x(x0 + pas / 2)
        e150 = hors_audit(Text("150 m", font_size=22, color=JAUNE_TITRE, weight=BOLD)).next_to(b150, UP, buff=0.04)
        pe = nathan(0.55).move_to(P(-5.3, -0.55))
        zb = boitier(2.2).move_to(P(-3.6, -0.55))
        l1 = self.ligne([("Un boîtier", WHITE), ("tous les 150 m,", JAUNE_TITRE)], 36, buff=0.2)
        self.col(l1, 1.4, XP)
        self.au_mot("Nathan pose")
        self.play(FadeIn(pe, shift=UP * 0.2), run_time=0.3)
        self.au_mot("un boîtier")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(zb, scale=0.8), FadeIn(bx0, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("tous les 150")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(bx1, shift=DOWN * 0.1), GrowFromCenter(b150), FadeIn(e150),
                  run_time=0.35)
        l2 = self.bloc(["au début de la rue", "et au bout."], 36)
        self.col(l2, 0.35, XP)
        self.au_mot("au début de la rue")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(bx0, color=JAUNE_TITRE, scale_factor=1.4), run_time=0.35)
        self.au_mot("au bout")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(bfin, shift=DOWN * 0.1), run_time=0.3)
        qm = hors_audit(Text("?", font_size=40, color=ORANGE_RETENUE, weight=BOLD))
        qm.move_to(P((x0 + pas + x0 + 8 * pas) / 2, bx0.get_y() + 0.05))
        q = self.ligne([("Combien de", JAUNE_TITRE), ("boîtiers ?", JAUNE_TITRE)], 42, buff=0.2)
        self.col(q, -0.75, XP)
        self.au_mot("Combien de boîtiers")
        self.play(FadeIn(q, shift=UP * 0.1), FadeIn(qm, scale=1.4), run_time=0.45)
        self.pause_defi(y=-2.1)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        r = self.rue_defi(1.75)
        pas = 0.15 * self.U
        x0 = r.get_left()[0]
        er = etiq(r.chaussee, "1,2 km", 26, cote=DOWN, buff=0.1)
        bxs = VGroup(*[self.boitier_sur(r, x0 + k * pas, 0.7) for k in range(9)])
        self.add(r, er, bxs[0], bxs[8])
        XP = 0.1
        l1 = self.ligne([("1,2 km", BLEU_D), ("= 1 200 m.", VERT_OK)], 40, buff=0.25)
        self.col(l1, 2.35, XP)
        self.au_mot("1,2 kilomètre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 1 200")
        e1200 = etiq(r.chaussee, "1 200 m", 26, VERT_OK, cote=DOWN, buff=0.1)
        self.play(FadeIn(l1[1], shift=UP * 0.1), Transform(er, e1200), run_time=0.35)
        l2 = self.ligne([("1 200", BLEU_D), ("÷ 150", BLEU_D), ("= 8 espaces.", VERT_OK)], 40, buff=0.2)
        self.col(l2, 1.55, XP)
        self.a_l_instant(5.6)  # le 2e « 1 200 » n'a pas de marque (« 1 200 mètres. 1 200 divisé »)
        self.poser(l2[0])
        self.au_mot("divisé par 150")
        self.play(FadeIn(l2[1], shift=UP * 0.08), run_time=0.25)
        nums = VGroup(*[hors_audit(Text(str(k + 1), font_size=20, color=JAUNE_TITRE, weight=BOLD))
                        .next_to(P(x0 + (k + 0.5) * pas, r.chaussee.get_bottom()[1]), DOWN, buff=0.42)
                        for k in range(8)])
        arcs = VGroup(*[ArcBetweenPoints(P(x0 + k * pas + 0.05, r.chaussee.get_bottom()[1] - 0.08),
                                         P(x0 + (k + 1) * pas - 0.05, r.chaussee.get_bottom()[1] - 0.08),
                                         angle=0.9, color=JAUNE_TITRE, stroke_width=3) for k in range(8)])
        self.au_mot("8 espaces.")
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeOut(er), LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.1),
                  LaggedStart(*[FadeIn(n) for n in nums], lag_ratio=0.1), run_time=0.7)
        l3 = self.bloc(["Un boîtier au début,", "et un au bout :"], 34)
        self.col(l3, 0.55, XP)
        self.au_mot("un boîtier au début")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(bxs[0], color=JAUNE_TITRE, scale_factor=1.5), run_time=0.35)
        self.au_mot("et un au bout")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(bxs[8], color=JAUNE_TITRE, scale_factor=1.5), run_time=0.35)
        l4 = self.ligne([("8", WHITE), ("espaces,", WHITE), ("9 boîtiers.", VERT_OK)], 40, buff=0.18)
        self.col(l4, -0.45, XP)
        self.poser(l4[0], "8 espaces,", anim=AnimationGroup(FadeIn(l4[0], shift=UP * 0.08),
                                                             FadeIn(l4[1], shift=UP * 0.08)))
        self.au_mot("9 boîtiers")
        nb = VGroup(*[hors_audit(Text(str(k + 1), font_size=18, color=VERT_OK, weight=BOLD)).next_to(b, UP, buff=0.04)
                      for k, b in enumerate(bxs)])
        self.play(FadeIn(l4[2], scale=1.2), LaggedStart(*[FadeIn(b, shift=DOWN * 0.1) for b in bxs[1:8]],
                                                       lag_ratio=0.08),
                  LaggedStart(*[FadeIn(n) for n in nb], lag_ratio=0.08), run_time=0.7)
        mn = main_ouverte(0.85).move_to(P(-3.6, -1.35))
        l5 = self.t("Comme les doigts d'une main :", 32)
        self.col(l5, -1.35, XP)
        self.au_mot("Comme les doigts")
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(mn, shift=UP * 0.2), run_time=0.35)
        l6 = self.ligne([("4 espaces,", WHITE), ("5 doigts.", JAUNE_TITRE)], 40, buff=0.25)
        self.col(l6, -2.05, XP)
        d = mn[1]
        gaps = VGroup(*[hors_audit(Text(str(k + 1), font_size=20, color=JAUNE_TITRE, weight=BOLD))
                        .move_to((d[k].get_top() + d[k + 1].get_top()) / 2 + DOWN * 0.15) for k in range(4)])
        self.au_mot("4 espaces")
        self.play(FadeIn(l6[0], shift=UP * 0.1), LaggedStart(*[FadeIn(g) for g in gaps], lag_ratio=0.15),
                  run_time=0.4)
        self.au_mot("5 doigts")
        self.play(FadeIn(l6[1], scale=1.2), Indicate(d, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        self.insister(l4[2], 1.12, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        r = rue(3.4)
        pas = 3.4 / 4
        bxs = VGroup(*[boitier(0.65).next_to(P(r.get_left()[0] + k * pas, r.trottoir.get_top()[1]), UP,
                                             buff=0.02) for k in range(5)])
        arcs = VGroup(*[ArcBetweenPoints(P(r.get_left()[0] + k * pas + 0.05, r.get_bottom()[1] - 0.08),
                                         P(r.get_left()[0] + (k + 1) * pas - 0.05, r.get_bottom()[1] - 0.08),
                                         angle=0.9, color=JAUNE_TITRE, stroke_width=3) for k in range(4)])
        fig = VGroup(r, bxs, arcs)
        lignes = self.finale_gauche(fig, textes=[
            ("Dans un défi de longueurs :", "d'abord la même unité,"),
            ("puis les calculs,", "étape par étape."),
            ("Quand on compte les deux bouts :", "un objet de plus que d'espaces.")], fs=32)
        self.add(fig)
        self.au_mot("Dans un défi")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("puis les calculs")
        self.montrer_ligne(lignes[1])
        self.au_mot("quand on compte")
        self.montrer_ligne(lignes[2], Indicate(bxs, color=VERT_OK, scale_factor=1.15))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_etapes()
        self.ecran_meme_unite()
        self.ecran_calcul()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class LongueurDefiCM2(LongueurDefiBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "bleue"
