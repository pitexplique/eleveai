# longueur_convertir.py
# EleveAI — Maths CM2 — série « Longueurs », épisode 02 : CONVERTIR DES LONGUEURS
# (micro longueur_convertir, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Arthur, GÉOMÈTRE (une route de 3,5 km sur son plan, un rapport en mètres).
# Mapping micro → écrans : 02 (le tableau km hm dam m dm cm mm, × 10 d'une colonne à la suivante),
# 03 (3,5 km : le 3 en km, le 5 en hm, des zéros jusqu'aux m : 3 500 m ; 3,5 × 1000),
# 04 (poteau de 2,45 m = 245 cm = 2 450 mm), 04b (dans l'autre sens on divise : 750 m = 0,75 km),
# 06 (piège : 3,5 km n'est ni 35 m ni 3 005 m), questions 05 (1,8 m en cm, B) et 07 (650 m en km, A),
# défi 08 (route de 1,5 km en tronçons de 25 m : 60).
# Voix : manim/voix/cm2-longueur-convertir.json (validée le 15/11, Julie, débit −6) ;
# marques : longueur_convertir_marques.json (python manim/scripts/cm2/aire_marques_cm2.py longueur:convertir).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/longueur_convertir.py LongueurConvertirCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/longueur_convertir.py LongueurConvertirCM2 -o eleveai-maths-cm2-longueur-convertir --media_dir manim/scripts/cm2/media-longueur-02
# Sortie : manim/sorties/cm2/maths/longueurs/02-convertir/eleveai-maths-cm2-longueur-convertir.mp4

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_cm2_commun import *  # noqa: E402,F403

PAPIER = "#fef3c7"     # le plan du géomètre
HERBE = "#86efac"
GOUDRON = "#475569"
TERRE = "#a16207"      # le chemin de terre
BOIS_P = "#92400e"     # le poteau en bois
VIRG = ROUGE_ERREUR    # la virgule dans le tableau


# ── Les dessins de l'épisode ───────────────────────────────────────────────

def trepied(s=1.0):
    """Le théodolite du géomètre : trois pieds et l'appareil jaune posé dessus."""
    haut = P(0, 1.1 * s)
    pieds = VGroup(*[Line(haut, P(dx * s, 0), color="#d6d3d1", stroke_width=5) for dx in (-0.55, 0, 0.55)])
    boite = RoundedRectangle(width=0.55 * s, height=0.42 * s, corner_radius=0.06 * s, fill_color="#facc15",
                             fill_opacity=1, stroke_color="#78350f", stroke_width=2).move_to(haut + UP * 0.22 * s)
    lunette = Rectangle(width=0.5 * s, height=0.14 * s, fill_color="#1f2937", fill_opacity=1,
                        stroke_width=0).next_to(boite, UP, buff=0).shift(RIGHT * 0.12 * s)
    return VGroup(pieds, boite, lunette)


def plan_route(larg=2.7, h=1.5):
    """Le plan d'Arthur : une feuille, de l'herbe, une route grise qui serpente."""
    f = Rectangle(width=larg, height=h, fill_color=PAPIER, fill_opacity=1, stroke_color="#b45309", stroke_width=3)
    pre = Rectangle(width=larg - 0.24, height=h - 0.24, fill_color=HERBE, fill_opacity=0.55,
                    stroke_width=0).move_to(f)
    g, d = f.get_left()[0] + 0.25, f.get_right()[0] - 0.25
    y = f.get_y()
    pts = [P(g, y - 0.25), P(g + (d - g) * 0.3, y + 0.35), P(g + (d - g) * 0.62, y - 0.35), P(d, y + 0.2)]
    rt = VMobject(stroke_color=GOUDRON, stroke_width=12).set_points_smoothly(pts)
    milieu = VMobject(stroke_color=WHITE, stroke_width=2).set_points_smoothly(pts)
    a = Dot(pts[0], radius=0.08, color=ROUGE_ERREUR)
    b = Dot(pts[-1], radius=0.08, color=ROUGE_ERREUR)
    return VGroup(f, pre, rt, milieu, a, b)


def rapport(s=1.0):
    """Le rapport : une planchette, une feuille et quelques lignes écrites."""
    pl = RoundedRectangle(width=1.3 * s, height=1.7 * s, corner_radius=0.08 * s, fill_color="#b45309",
                          fill_opacity=1, stroke_width=0)
    f = Rectangle(width=1.05 * s, height=1.35 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    f.move_to(pl).shift(DOWN * 0.08 * s)
    pince = RoundedRectangle(width=0.5 * s, height=0.18 * s, corner_radius=0.04 * s, fill_color="#9ca3af",
                             fill_opacity=1, stroke_width=0).move_to(pl.get_top() + DOWN * 0.08 * s)
    lignes = VGroup(*[Line(P(-0.38 * s, 0), P((0.38 - 0.15 * (k % 2)) * s, 0), color="#94a3b8", stroke_width=3)
                      .move_to(f.get_top() + DOWN * (0.3 + 0.22 * k) * s).align_to(f, LEFT).shift(RIGHT * 0.13 * s)
                      for k in range(5)])
    return VGroup(pl, f, pince, lignes)


def borne(s=1.0):
    """Une borne kilométrique : blanche, le haut rouge."""
    corps = RoundedRectangle(width=0.26 * s, height=0.36 * s, corner_radius=0.06 * s, fill_color=WHITE,
                             fill_opacity=1, stroke_width=0)
    tete = RoundedRectangle(width=0.26 * s, height=0.13 * s, corner_radius=0.05 * s, fill_color=ROUGE_ERREUR,
                            fill_opacity=1, stroke_width=0).align_to(corps, UP)
    return VGroup(corps, tete)


def route_km(n_km, u, h=0.34, bornes=True):
    """Une route de n_km kilomètres (u unités Manim par km), une borne à chaque kilomètre."""
    L = n_km * u
    r = Rectangle(width=L, height=h, fill_color=GOUDRON, fill_opacity=1, stroke_width=0)
    tirets = DashedLine(r.get_left() + RIGHT * 0.1, r.get_right() + LEFT * 0.1, dash_length=0.18,
                        color=WHITE, stroke_width=2)
    g = VGroup(r, tirets)
    g.bornes = VGroup()
    if bornes:
        for k in range(int(n_km) + 1):
            b = borne(0.9).next_to(P(r.get_left()[0] + k * u, r.get_top()[1]), UP, buff=0.02)
            g.bornes.add(b)
        g.add(g.bornes)
    g.route = r
    return g


def poteau_bois(h, l=0.24):
    """Le poteau en bois, de hauteur h, planté dans le sol."""
    p = Rectangle(width=l, height=h, fill_color=BOIS_P, fill_opacity=1, stroke_color="#451a03", stroke_width=2)
    cap = Rectangle(width=l * 1.5, height=0.1, fill_color="#57534e", fill_opacity=1, stroke_width=0)
    cap.next_to(p, UP, buff=0)
    return VGroup(p, cap)


def mire(n_dm, u, ep=0.26):
    """La mire du géomètre (couchée) : n_dm tranches de 1 dm, rouges et blanches, u unités par dm."""
    g = VGroup(*[Rectangle(width=u, height=ep, fill_color=ROUGE_ERREUR if k % 2 == 0 else WHITE, fill_opacity=1,
                           stroke_color="#1f2937", stroke_width=1) for k in range(n_dm)])
    return g.arrange(RIGHT, buff=0)


def piquet(h=0.45, couleur=ORANGE_RETENUE):
    """Un piquet de chantier (le géomètre marque les tronçons)."""
    m = Line(P(0, 0), P(0, h), color=WHITE, stroke_width=4)
    f = Polygon(P(0, h), P(0, h - 0.16), P(0.2, h - 0.08), fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(m, f)


def virgule(t, u, fs=44):
    """La virgule du tableau : rouge, en bas à droite de la case u (juste après le chiffre des unités)."""
    c = t.cases[u]
    v = Text(",", font_size=fs, color=VIRG, weight=BOLD)
    v.move_to(P(c.get_right()[0], c.get_bottom()[1] + 0.2))
    return hors_audit(v)


def place_virgule(t, u):
    c = t.cases[u]
    return P(c.get_right()[0], c.get_bottom()[1] + 0.2)


class LongueurConvertirBase(PaysageLongueurCM2):
    nom_voix = "cm2-longueur-convertir"
    fichier_marques = "longueur_convertir_marques.json"
    ceinture = "verte"

    # Lignes de réponse dont un nombre est REDIT plus de 1,5 s après sa 1re fois : la synchro par jetons
    # le croit « déjà dit » et l'afficherait trop tôt → instant forcé (sur les marques de la voix).
    _forces = {("05b-reponse", "1,8 m = 180 cm."): 5.11, ("07b-reponse", "650 m = 0,65 km,"): 7.66}

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

    def t(self, s, fs=40, color=WHITE):
        """Un nombre écrit « 3 500 » : l'audit le lit 3500 (absent de la voix « 3 500 ») → hors audit,
        la synchro le pose toujours à son mot."""
        m = super().t(s, fs, color)
        if re.search(r"\d \d{3}", s):
            for f in m.get_family():
                f._pas_audit = True
        return m

    def a_l_instant(self, t):
        """Attendre l'instant t (s) de la voix de l'écran : pour un nombre SANS marque, estimé sur la voix."""
        reste = self._debut_voix + t - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def poser(self, m, extrait=None, n=1, run_time=0.25, anim=None):
        """Un morceau hors synchro (un nombre redit), posé à SON extrait de la voix."""
        hors_audit(m)
        if extrait:
            self.au_mot(extrait, n)
        self.play(anim if anim is not None else FadeIn(m, shift=UP * 0.08), run_time=run_time)
        return m

    def colonne(self, t, u):
        """Les trois morceaux de la colonne u du tableau (en-tête, case, nom)."""
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
        titre, ident, ech = self.garde("Convertir des longueurs", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Convertir des longueurs")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Du km au mm :", 38)
        q1 = self.t("le tableau des unités.", 38, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        t = tableau_conv(cw=0.68, ch=0.5, fs=20).move_to(P(3.2, 0.45))
        tr = trepied(0.8).next_to(t, UP, buff=0.15).align_to(t, RIGHT)
        self.au_mot("au millimètre")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(tr, shift=UP * 0.2), run_time=0.35)
        self.au_mot("des unités")
        self.play(FadeIn(q1, shift=UP * 0.2), LaggedStart(*[FadeIn(self.colonne(t, u), shift=DOWN * 0.1)
                                                             for u in COLS], lag_ratio=0.12), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Arthur, géomètre ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = arthur(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Arthur")
        nom = self.t("Arthur", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.4)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est géomètre")
        met = self.t("géomètre", 26, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XL = -2.9
        l0 = self.bloc(["Il mesure les terrains", "et les routes."], 32)
        gauche(l0, XL, 2.65)
        tr = trepied(1.0).move_to(P(4.6, 2.4))
        self.au_mot("mesure les terrains")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(tr, shift=UP * 0.2), run_time=0.35)
        self.au_mot("et les routes")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("Sur son plan,", WHITE), ("une route fait", WHITE), ("3,5 km.", JAUNE_TITRE)], 32,
                        buff=0.18)
        gauche(l1, XL, 1.45)
        pl = plan_route(2.8, 1.5)
        gauche(pl, XL, 0.0)
        self.au_mot("Sur son plan")
        self.play(FadeIn(pl, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("une route fait")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(pl[2], color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.3)
        e35 = etiq(pl[0], "3,5 km", 28, cote=DOWN, buff=0.12)
        self.au_mot("3,5")
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(e35), run_time=0.3)
        rp = rapport(0.95)
        gauche(rp, 1.0, 0.05)
        l2 = self.bloc(["Son rapport :", "en mètres."], 32)
        l2[1].set_color(JAUNE_TITRE)
        gauche(l2, 2.45, 0.05)
        self.au_mot("son rapport")
        self.play(FadeIn(rp, shift=UP * 0.2), FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("écrit en mètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(rp, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        self.au_mot("Combien de mètres")
        q = self.t("Combien de mètres ?", 42, JAUNE_TITRE).move_to(P(-0.4, -2.35))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(pl[2]), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le tableau des longueurs ───────────────────────────────────────
    def fleches(self, t, cols=COLS, dessous=True, couleur=ORANGE_RETENUE, sens=1):
        fl = VGroup()
        for a, b in zip(cols[:-1], cols[1:]):
            if dessous:
                pa, pb = t.cases[a].get_bottom() + DOWN * 0.08, t.cases[b].get_bottom() + DOWN * 0.08
                ang = 0.9
            else:
                pa, pb = t.tete[a].get_top() + UP * 0.2, t.tete[b].get_top() + UP * 0.2
                ang = -0.9
            if sens < 0:
                pa, pb, ang = pb, pa, -ang
            fl.add(CurvedArrow(pa + RIGHT * 0.15 * sens, pb + LEFT * 0.15 * sens, angle=ang, color=couleur,
                               stroke_width=4, tip_length=0.16))
        return fl

    def ecran_tableau(self):
        self.ecran("02-tableau")
        tit = self.t("Le tableau des longueurs", 44, JAUNE_TITRE).move_to(P(0, 2.95))
        t = tableau_conv(cw=1.55, ch=0.72, fs=32).move_to(P(0, 1.15))
        self.au_mot("le tableau des longueurs")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.25)
        mots = [("kilomètre", "km"), ("hectomètre", "hm"), ("décamètre", "dam"),
                ("décamètre, mètre", "m"), ("décimètre", "dm"), ("centimètre", "cm"), ("millimètre", "mm")]
        for mot, u in mots:
            self.au_mot(mot)
            self.play(FadeIn(self.colonne(t, u), shift=DOWN * 0.15), run_time=0.22)
        fl = self.fleches(t)
        l0 = self.t("D'une colonne à la suivante,", 36)
        self.col(l0, -1.25, -4.6)
        self.au_mot("D'une colonne à la suivante")
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[Create(f) for f in fl], lag_ratio=0.2), run_time=0.9)
        l1 = self.ligne([("on multiplie", VERT_OK), ("par 10.", VERT_OK)], 48, buff=0.25)
        self.col(l1, -2.2, -4.6)
        self.au_mot("on multiplie")
        self.play(FadeIn(l1[0], scale=1.15), run_time=0.3)
        self.au_mot("par 10")
        x10 = VGroup(*[hors_audit(Text("× 10", font_size=20, color=ORANGE_RETENUE, weight=BOLD))
                       .next_to(f, DOWN, buff=0.04) for f in fl])
        self.play(FadeIn(l1[1], scale=1.15), FadeIn(x10), Indicate(fl, color=JAUNE_TITRE), run_time=0.45)
        self.attendre_voix()

    # ── 03 : 3,5 km en mètres ───────────────────────────────────────────────
    def ecran_km_m(self):
        self.ecran("03-km-m")
        t = tableau_conv(cw=1.35, ch=0.62, fs=28, surligne=("km", "m")).move_to(P(-0.6, 2.45))
        self.add(t)
        u = 1.9  # 1 km de route = 1,9 unité
        rt = route_km(3.5, u)
        gauche(rt, -5.9, -2.45)
        ets = VGroup(*[hors_audit(Text(f"{k} km", font_size=20, color="#cbd5e1", weight=BOLD))
                       .next_to(rt.bornes[k], UP, buff=0.06) for k in range(1, 4)])
        acc_r = etiq(rt.route, "3,5 km", 26, cote=RIGHT, buff=0.2)
        l1 = self.ligne([("3,5 km", BLEU_D), ("= 3 500 m", VERT_OK)], 48, buff=0.3)
        gauche(l1, -6.0, 0.3)
        self.au_mot("3,5 kilomètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(rt), FadeIn(ets), FadeIn(acc_r), run_time=0.4)
        self.au_mot("le 3")
        c3 = chiffre(t, "km", "3", fs=38, audit=True)
        v = virgule(t, "km")
        self.play(FadeIn(c3, scale=1.5), FadeIn(v, scale=1.5), run_time=0.3)
        self.au_mot("colonne des kilomètres")
        self.play(Indicate(t.tete["km"], color=JAUNE_TITRE, scale_factor=1.3), run_time=0.35)
        self.au_mot("le 5")
        c5 = chiffre(t, "hm", "5", fs=38, audit=True)
        self.play(FadeIn(c5, scale=1.5), run_time=0.3)
        self.au_mot("celle des hectomètres")
        self.play(Indicate(t.tete["hm"], color=JAUNE_TITRE, scale_factor=1.3), run_time=0.35)
        self.au_mot("avec des zéros")
        z = VGroup(*[chiffre(t, x, "0", ORANGE_RETENUE, fs=38) for x in ("dam", "m")])
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in z], lag_ratio=0.4), run_time=0.5)
        self.au_mot("jusqu'aux mètres")
        self.play(v.animate.move_to(place_virgule(t, "m")), Indicate(t.tete["m"], color=JAUNE_TITRE,
                                                                      scale_factor=1.3), run_time=0.45)
        cs = VGroup(*[t.cases[x] for x in ("km", "hm", "dam", "m")])
        acc = accolade(cs, "3 500 m", 30, VERT_OK, dessus=False)
        self.au_mot("mètres : 3 500")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(acc, shift=UP * 0.1), FadeOut(v), run_time=0.4)
        l2 = self.ligne([("Ou bien :", WHITE), ("3,5", BLEU_D), ("× 1000", BLEU_D), ("= 3 500", VERT_OK)], 42,
                        buff=0.22)
        gauche(l2, -6.0, -0.75)
        self.au_mot("Ou bien")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.poser(l2[1], "3,5", n=2)
        self.au_mot("fois 1000")
        self.play(FadeIn(l2[2], shift=UP * 0.08), run_time=0.25)
        self.poser(l2[3], "3 500.", run_time=0.3)
        self.insister(l1, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : le poteau, 2,45 m en cm et en mm ───────────────────────────────
    def ecran_m_cm(self):
        self.ecran("04-m-cm")
        sol = Line(P(-6.3, -2.75), P(-3.3, -2.75), color="#a8a29e", stroke_width=4)
        pe = arthur(0.88)
        pe.move_to(P(-5.55, 0)).align_to(P(0, -2.75), DOWN)
        um = pe.height / 1.75  # 1 m à l'échelle d'Arthur (1,75 m)
        po = poteau_bois(2.45 * um)
        po.move_to(P(-4.35, 0)).align_to(P(0, -2.75), DOWN)
        br = Brace(po, RIGHT, color=JAUNE_TITRE)
        eb = hors_audit(Text("2,45 m", font_size=28, color=JAUNE_TITRE, weight=BOLD)).next_to(br, RIGHT, buff=0.1)
        cols = ["m", "dm", "cm", "mm"]
        t = tableau_conv(cols, cw=1.25, ch=0.62, fs=28, surligne=("m", "cm")).move_to(P(1.6, 2.45))
        XL = -2.35
        l0 = self.ligne([("Le poteau :", WHITE), ("2,45 m", BLEU_D)], 40, buff=0.22)
        gauche(l0, XL, 1.0)
        self.au_mot("Arthur mesure")
        self.play(FadeIn(sol), FadeIn(pe, shift=UP * 0.2), GrowFromEdge(po, DOWN), FadeIn(t), run_time=0.4)
        self.au_mot("poteau : 2,45")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.2)
        ch = VGroup(chiffre(t, "m", "2", fs=38), chiffre(t, "dm", "4", fs=38), chiffre(t, "cm", "5", fs=38))
        v = virgule(t, "m")
        self.play(FadeIn(l0[1], shift=UP * 0.1), GrowFromCenter(br), FadeIn(eb), FadeIn(ch), FadeIn(v),
                  run_time=0.35)
        l1 = self.ligne([("En cm :", WHITE), ("2,45", BLEU_D), ("× 100", BLEU_D), ("= 245 cm", VERT_OK)], 40,
                        buff=0.22)
        gauche(l1, XL, 0.0)
        self.au_mot("En centimètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(t.tete["cm"], color=JAUNE_TITRE, scale_factor=1.3),
                  run_time=0.35)
        self.poser(l1[1], "2,45", n=2)
        self.au_mot("fois 100")
        self.play(FadeIn(l1[2], shift=UP * 0.08), run_time=0.25)
        self.au_mot("100, 245")
        self.play(FadeIn(l1[3], shift=UP * 0.1), v.animate.move_to(place_virgule(t, "cm")), run_time=0.4)
        self.play(FadeOut(v), run_time=0.2)
        l2 = self.ligne([("En mm :", WHITE), ("2 450 mm", VERT_OK)], 40, buff=0.25)
        gauche(l2, XL, -1.0)
        self.au_mot("en millimètres")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(t.tete["mm"], color=JAUNE_TITRE, scale_factor=1.3),
                  run_time=0.35)
        self.au_mot("millimètres : 2 450")
        z = chiffre(t, "mm", "0", ORANGE_RETENUE, fs=38)
        self.play(FadeIn(l2[1], scale=1.2), FadeIn(z, scale=1.5), run_time=0.35)
        self.insister(VGroup(l1[3], l2[1]), 1.08, 0.25)
        self.attendre_voix()

    # ── 04b : dans l'autre sens, on divise ──────────────────────────────────
    def ecran_vers_km(self):
        self.ecran("04b-vers-km")
        tit = self.ligne([("Dans l'autre sens,", WHITE), ("on divise.", ORANGE_RETENUE)], 44, buff=0.25)
        gauche(tit, -6.0, 3.0)
        self.au_mot("Dans l'autre sens")
        self.play(FadeIn(tit[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("on divise")
        self.play(FadeIn(tit[1], scale=1.15), run_time=0.3)
        cols = ["km", "hm", "dam", "m"]
        t = tableau_conv(cols, cw=1.3, ch=0.62, fs=28, surligne=("km", "m")).move_to(P(-3.4, 1.45))
        u = 7.2  # 1 km = 7,2 unités : le chemin à l'échelle
        x0 = -6.0
        km = Rectangle(width=u, height=0.4, fill_color="#334155", fill_opacity=1, stroke_color=WHITE,
                       stroke_width=2).move_to(P(0, -1.2)).align_to(P(x0, 0), LEFT)
        ch750 = Rectangle(width=0.75 * u, height=0.4, fill_color=TERRE, fill_opacity=1, stroke_color=WHITE,
                          stroke_width=2).align_to(km, LEFT).align_to(km, DOWN)
        b1 = Brace(km, UP, color="#cbd5e1")
        e1 = hors_audit(Text("1 km", font_size=26, color="#cbd5e1", weight=BOLD)).next_to(b1, UP, buff=0.08)
        b750 = Brace(ch750, DOWN, color=JAUNE_TITRE)
        e750 = hors_audit(Text("750 m", font_size=28, color=JAUNE_TITRE, weight=BOLD)).next_to(b750, DOWN,
                                                                                             buff=0.08)
        self.au_mot("divise. 750")
        ch = VGroup(chiffre(t, "hm", "7", fs=38), chiffre(t, "dam", "5", fs=38), chiffre(t, "m", "0", fs=38))
        v = virgule(t, "m")
        self.play(FadeIn(t), FadeIn(ch), FadeIn(v), FadeIn(km), FadeIn(b1), FadeIn(e1),
                  GrowFromEdge(ch750, LEFT), GrowFromCenter(b750), FadeIn(e750), run_time=0.45)
        l1 = self.ligne([("750", BLEU_D), ("÷ 1000", BLEU_D), ("= 0,75 km", VERT_OK)], 40, buff=0.22)
        self.col(l1, 1.45, 0.5)
        self.a_l_instant(4.6)  # le 2e « 750 » n'a pas de marque (« 750 mètres : 750 divisé »)
        self.poser(l1[0])
        self.au_mot("divisé par 1000")
        self.play(FadeIn(l1[1], shift=UP * 0.1), v.animate.move_to(place_virgule(t, "km")), run_time=0.45)
        self.au_mot("1000, 0,75")
        z = chiffre(t, "km", "0", ORANGE_RETENUE, fs=38)
        e075 = hors_audit(Text("0,75 km", font_size=28, color=VERT_OK, weight=BOLD)).next_to(e750, DOWN,
                                                                                           buff=0.12)
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(z, scale=1.5), ch[2].animate.set_opacity(0.35),
                  FadeIn(e075, shift=UP * 0.1), run_time=0.4)
        self.insister(l1[2], 1.12, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = mire(18, 0.27).move_to(P(-3.8, 1.5))
        acc = accolade(g, "1,8 m", 30)

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(acc), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["Combien de centimètres", "font 1,8 m ?"],
                             [self.choix("18 cm"), self.choix("180 cm"), self.choix("108 cm")], 1,
                             ["1,8 × 100 = 180.", "1,8 m = 180 cm."],
                             -0.25, sans_audit=(1,), autres_q=autres_q)

    # ── 06 : le piège (3,5 km n'est ni 35 m ni 3 005 m) ─────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        cols = ["km", "hm", "dam", "m"]
        tf = tableau_conv(cols, cw=0.95, ch=0.55, fs=24).move_to(P(-4.3, 1.15))
        tv = tableau_conv(cols, cw=0.95, ch=0.55, fs=24).move_to(P(-4.3, -1.35))
        XP = -1.55
        l0 = self.ligne([("3,5 km", BLEU_D), ("≠ 35 m,", ROUGE_ERREUR)], 42, buff=0.3)
        self.col(l0, 2.05, XP)
        self.au_mot("piège ! 3,5")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("ni 35")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        l1 = self.t("≠ 3 005 m.", 42, ROUGE_ERREUR)
        gauche(l1, l0[1].get_left()[0], 1.25)
        self.au_mot("ni 3 005")
        faux = VGroup(*[chiffre(tf, x, s, ROUGE_ERREUR, fs=32) for x, s in zip(cols, "3005")])
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(tf), FadeIn(faux), run_time=0.35)
        croix = VGroup(Line(tf.get_corner(UL), tf.get_corner(DR)), Line(tf.get_corner(DL), tf.get_corner(UR)))
        croix.set_stroke(ROUGE_ERREUR, 6)
        self.play(Create(croix), run_time=0.3)
        l2 = self.ligne([("Le 5 est", WHITE), ("dans les hm :", WHITE)], 38, buff=0.18)
        self.col(l2, 0.1, XP)
        self.au_mot("Le 5 est")
        c3 = chiffre(tv, "km", "3", BLEU_D, fs=32)
        c5 = chiffre(tv, "hm", "5", VERT_OK, fs=32)
        self.play(FadeIn(tv), FadeIn(c3), FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("dans les hectomètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(c5, scale=1.5),
                  Indicate(tv.tete["hm"], color=JAUNE_TITRE, scale_factor=1.3), run_time=0.4)
        l3 = self.ligne([("il vaut", WHITE), ("500 m.", VERT_OK)], 40, buff=0.22)
        self.col(l3, -0.75, XP)
        self.au_mot("il vaut")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("vaut 500")
        z = VGroup(*[chiffre(tv, x, "0", ORANGE_RETENUE, fs=32) for x in ("dam", "m")])
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(z, scale=1.4), run_time=0.35)
        l4 = self.ligne([("3,5 km", BLEU_D), ("= 3 500 m", VERT_OK)], 46, buff=0.3)
        self.col(l4, -1.85, XP)
        self.poser(l4[0], "3,5", n=2)
        self.poser(l4[1], "3 500", run_time=0.3)
        self.insister(l4, 1.1, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 4.6  # 1 km = 4,6 unités
        km = Rectangle(width=u, height=0.32, fill_color="#334155", fill_opacity=1, stroke_color="#94a3b8",
                       stroke_width=2)
        chm = Rectangle(width=0.65 * u, height=0.32, fill_color=TERRE, fill_opacity=1, stroke_color=WHITE,
                        stroke_width=2).align_to(km, LEFT)
        p1 = piquet().next_to(chm, UP, buff=0).align_to(chm, LEFT)
        p2 = piquet().next_to(chm, UP, buff=0).align_to(chm, RIGHT)
        e1 = hors_audit(Text("1 km", font_size=24, color="#94a3b8", weight=BOLD)).next_to(km, DOWN, buff=0.1)
        e1.align_to(km, RIGHT)
        g = VGroup(km, chm, p1, p2, e1).move_to(P(-3.8, 1.55))
        acc = accolade(VGroup(chm, p1), "650 m", 30)

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(acc), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Arthur trace un chemin", "de 650 m.", "Combien de km ?"],
                             [self.choix("0,65 km"), self.choix("6,5 km"), self.choix("65 km")], 0,
                             ["650 ÷ 1000 = 0,65.", "650 m = 0,65 km,", "un peu plus d'un demi-km."],
                             -0.25, sans_audit=(1,), mot_q="Arthur trace", autres_q=autres_q)

    # ── 08 : le défi (1,5 km en tronçons de 25 m) ───────────────────────────
    U = 3.6  # 1 km de route = 3,6 unités (1 500 m = 5,4)

    def route_defi(self, y=2.05, x0=-6.1):
        rt = route_km(1.5, self.U, bornes=False)
        gauche(rt, x0, y)
        return rt

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        rt = self.route_defi()
        acc = accolade(rt.route, "1,5 km", 28, dessus=False)
        XP = 0.5
        l0 = self.ligne([("Une route :", WHITE), ("1,5 km.", JAUNE_TITRE)], 38, buff=0.2)
        self.col(l0, 2.15, XP)
        self.au_mot("Une route")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(rt), run_time=0.3)
        self.au_mot("mesure 1,5")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(acc), run_time=0.3)
        # les tronçons : un piquet tous les 25 m sur le début de la route, puis le zoom sur UN tronçon
        pas = 0.025 * self.U
        x0 = rt.route.get_left()[0]
        pqs = VGroup(*[piquet(0.32).next_to(P(x0 + k * pas, rt.route.get_top()[1]), UP, buff=0)
                       for k in range(9)])
        zoom = Rectangle(width=3.4, height=1.15, stroke_color=JAUNE_TITRE, stroke_width=3)
        zoom.move_to(P(-4.3, -0.2))
        lz = VGroup(DashedLine(P(x0, rt.route.get_bottom()[1]), zoom.get_corner(UL), color=JAUNE_TITRE,
                               stroke_width=2),
                    DashedLine(P(x0 + pas, rt.route.get_bottom()[1]), zoom.get_corner(UR), color=JAUNE_TITRE,
                               stroke_width=2))
        tz = Rectangle(width=2.8, height=0.34, fill_color=GOUDRON, fill_opacity=1, stroke_width=0)
        tz.move_to(zoom).shift(DOWN * 0.2)
        pz = VGroup(piquet(0.5).next_to(tz, UP, buff=0).align_to(tz, LEFT),
                    piquet(0.5).next_to(tz, UP, buff=0).align_to(tz, RIGHT).shift(RIGHT * 0.02))
        l1 = self.ligne([("Arthur la découpe", WHITE), ("en tronçons", WHITE)], 38, buff=0.2)
        self.col(l1, 1.3, XP)
        self.au_mot("Arthur la découpe")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("en tronçons")
        self.play(FadeIn(l1[1], shift=UP * 0.1), LaggedStart(*[FadeIn(p, shift=DOWN * 0.1) for p in pqs],
                                                             lag_ratio=0.1), run_time=0.5)
        l2 = self.ligne([("de", WHITE), ("25 m.", JAUNE_TITRE)], 38, buff=0.2)
        self.col(l2, 0.55, XP)
        e25 = etiq(tz, "25 m", 28, cote=DOWN, buff=0.12)
        self.au_mot("de 25")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(zoom), Create(lz), FadeIn(tz), FadeIn(pz), FadeIn(e25),
                  run_time=0.4)
        q = self.ligne([("Combien de", JAUNE_TITRE), ("tronçons ?", JAUNE_TITRE)], 42, buff=0.2)
        self.col(q, -0.55, XP)
        self.au_mot("Combien de tronçons")
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(rt.route), run_time=0.5)
        self.pause_defi(y=-2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        # la route de 1 500 m en 15 blocs de 100 m
        w = 0.1 * self.U
        blocs = VGroup(*[Rectangle(width=w, height=0.34, fill_color=GOUDRON if k % 2 == 0 else "#64748b",
                                   fill_opacity=1, stroke_color=WHITE, stroke_width=1.5) for k in range(15)])
        blocs.arrange(RIGHT, buff=0)
        gauche(blocs, -6.1, 2.05)
        e15 = etiq(blocs, "1,5 km", 26, cote=UP, buff=0.12)
        self.add(blocs, e15)
        XP = 0.15
        l0 = self.t("D'abord la même unité :", 34, ORANGE_RETENUE)
        self.col(l0, 2.35, XP)
        self.au_mot("la même unité")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("1,5 km", BLEU_D), ("= 1 500 m.", VERT_OK)], 40, buff=0.25)
        self.col(l1, 1.6, XP)
        self.au_mot("unité : 1,5")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("kilomètre, 1 500")
        e1500 = etiq(blocs, "1 500 m", 26, VERT_OK, cote=UP, buff=0.12)
        self.play(FadeIn(l1[1], shift=UP * 0.1), Transform(e15, e1500), run_time=0.35)
        l2 = self.ligne([("Puis", WHITE), ("1 500", BLEU_D), ("÷ 25 :", BLEU_D)], 40, buff=0.2)
        self.col(l2, 0.85, XP)
        self.au_mot("Puis")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.2)
        self.poser(l2[1], "1 500 divisé")
        self.au_mot("divisé par 25")
        self.play(FadeIn(l2[2], shift=UP * 0.08), run_time=0.25)
        # le zoom sur un bloc de 100 m : 4 tronçons de 25 m
        z = VGroup(*[Rectangle(width=0.95, height=0.4, fill_color=GOUDRON if k % 2 == 0 else "#64748b",
                               fill_opacity=1, stroke_color=WHITE, stroke_width=2) for k in range(4)])
        z.arrange(RIGHT, buff=0)
        gauche(z, -5.6, 0.2)
        pz = VGroup(*[piquet(0.42).next_to(P(z.get_left()[0] + k * 0.95, z.get_top()[1]), UP, buff=0)
                      for k in range(5)])
        lz = VGroup(DashedLine(blocs[0].get_corner(DL), z.get_corner(UL) + UP * 0.45, color=JAUNE_TITRE,
                               stroke_width=2),
                    DashedLine(blocs[0].get_corner(DR), z.get_corner(UR) + UP * 0.45, color=JAUNE_TITRE,
                               stroke_width=2))
        e100 = accolade(z, "100 m", 26, JAUNE_TITRE, dessus=False)
        e25s = VGroup(*[hors_audit(Text("25", font_size=22, color=WHITE, weight=BOLD)).move_to(b) for b in z])
        l3 = self.ligne([("Dans 100 :", WHITE), ("4 ×", JAUNE_TITRE), ("25.", JAUNE_TITRE)], 40, buff=0.2)
        self.col(l3, 0.1, XP)
        self.au_mot("dans 100")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(blocs[0], color=JAUNE_TITRE, scale_factor=1.3),
                  Create(lz), FadeIn(z), FadeIn(pz), FadeIn(e100), run_time=0.4)
        self.au_mot("4 fois")
        self.play(FadeIn(l3[1], shift=UP * 0.08), run_time=0.2)
        self.poser(l3[2], "25. Dans", anim=AnimationGroup(FadeIn(l3[2], shift=UP * 0.08), FadeIn(e25s)))
        l4 = self.ligne([("Dans", WHITE), ("1 500 :", WHITE), ("15 ×", JAUNE_TITRE), ("4", JAUNE_TITRE),
                         ("= 60.", VERT_OK)], 40, buff=0.2)
        self.col(l4, -0.65, XP)
        n15 = VGroup(*[hors_audit(Text(str(k + 1), font_size=16, color=JAUNE_TITRE, weight=BOLD))
                       .next_to(b, DOWN, buff=0.06) for k, b in enumerate(blocs)])
        self.au_mot("Dans 1 500")
        self.play(FadeIn(l4[0], shift=UP * 0.08), run_time=0.2)
        self.poser(l4[1], "1 500, 15", anim=AnimationGroup(FadeIn(l4[1], shift=UP * 0.08),
                                                            LaggedStart(*[FadeIn(n) for n in n15], lag_ratio=0.05)),
                   run_time=0.5)
        self.au_mot("15 fois")
        self.play(FadeIn(l4[2], shift=UP * 0.08), run_time=0.2)
        self.poser(l4[3], "4, 60")
        self.play(FadeIn(l4[4], scale=1.2), run_time=0.3)
        res = self.ligne([("Il y a", WHITE), ("60", VERT_OK), ("tronçons.", VERT_OK)], 46, buff=0.2)
        self.col(res, -1.55, XP)
        self.au_mot("Il y a")
        self.play(FadeIn(res[0], shift=UP * 0.1), run_time=0.2)
        self.poser(res[1], "60 tronçons", anim=FadeIn(res[1], scale=1.2), run_time=0.25)
        self.play(FadeIn(res[2], shift=UP * 0.08), run_time=0.2)
        self.insister(VGroup(res[1], res[2]), 1.12, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        t = tableau_conv(cw=1.15, ch=0.5, fs=24)
        fh = self.fleches(t, dessous=False, couleur=VERT_OK)
        fb = self.fleches(t, dessous=True, couleur=ORANGE_RETENUE, sens=-1)
        fig = VGroup(t, fh, fb)
        lignes = self.finale_haut(fig, textes=[
            ("D'une unité à la suivante :", "× 10."),
            ("Vers plus petit,", "on multiplie ;"),
            ("vers plus grand,", "on divise."),
            ("Le tableau place chaque chiffre,", "même après la virgule.")], fs=32, buff_fig=0.3)
        mots = [("Kilomètre", "km"), ("hectomètre", "hm"), ("décamètre", "dam"),
                ("décamètre, mètre", "m"), ("décimètre", "dm"), ("centimètre", "cm"), ("millimètre", "mm")]
        for mot, u in mots:
            self.au_mot(mot)
            self.play(FadeIn(self.colonne(t, u), shift=DOWN * 0.1), run_time=0.2)
        self.au_mot("d'une unité")
        self.montrer_ligne(lignes[0], LaggedStart(*[Create(f) for f in fh], lag_ratio=0.15))
        self.au_mot("Vers plus petit")
        self.montrer_ligne(lignes[1], Indicate(fh, color=JAUNE_TITRE))
        self.au_mot("vers plus grand")
        self.montrer_ligne(lignes[2], LaggedStart(*[Create(f) for f in fb], lag_ratio=0.15))
        self.au_mot("Le tableau place")
        self.montrer_ligne(lignes[3], Indicate(t, scale_factor=1.04))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_km_m()
        self.ecran_m_cm()
        self.ecran_vers_km()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class LongueurConvertirCM2(LongueurConvertirBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
