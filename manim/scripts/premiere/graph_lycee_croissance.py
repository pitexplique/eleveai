# graph_lycee_croissance.py
# EleveAI — Maths 1re (automatismes, épreuve anticipée SANS calculatrice)
# série « Graphiques », épisode 03 : LIRE UNE CROISSANCE (constante, qui
# accélère, qui ralentit ; le temps de doublement). Paysage, CEINTURE ORANGE.
# Short jumeau : graph_lycee_croissance_short.py (blanche). Pas de sous-classe
# STMG (la micro n'existe qu'en 1re).
# ⭐ Données (inventées, plausibles) : abonnés de trois chaînes, mois 0 à 6.
#   Inès  100, 200, 300, 400, 500, 600, 700 (droite : + 100 chaque mois) ;
#   Tom   10, 20, 40, 80, 160, 320, 640 (double chaque mois) ;
#   Sarah 0, 300, 450, 530, 570, 590, 600 (hausses 300, 150, 80, 40, 20, 10).
# ⭐ Code couleur gardé partout : Inès bleu ciel, Tom orange, Sarah violet.
# ⭐ Le dessin : les MARCHES d'un mois sous la courbe (largeur égale, hausse =
#   la contremarche), les flèches « × 2 » du doublement.
# Écrans : 00 garde · 01 trois chaînes, métiers · 02 question du jour · 03 les
# marches d'un mois · 04 Inès (constante) · 05 Tom (accélère) · 06 QUESTION (A)
# · 07 piège (ralentir ≠ diminuer) · 08 temps de doublement · 09 QUESTION (C)
# · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
# Voix : manim/voix/lycee-graph-croissance.json (validée le 24/11, débit −10) ;
# WAV : public/sons/lycee-graph-croissance/ ; marques : graph_lycee_croissance_marques.json.
# Outils (non modifiés) : la base PropLyceeEvoAdditifBase (prop_lycee_evo_additif.py),
# fin_commune.ecran_fin.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/graph_lycee_croissance.py GraphLyceeCroissancePremiere
# Brouillon : python -m manim render -ql --disable_caching manim/scripts/premiere/graph_lycee_croissance.py GraphLyceeCroissancePremiere -o eleveai-maths-premiere-graph-croissance --media_dir manim/scripts/premiere/media-graph-lycee-croissance

import re
import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_evo = _charger("prop_lycee_evo_additif_1re", _ICI / "prop_lycee_evo_additif.py")
from prop_ratio_ecrire import *  # noqa: E402,F403

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

from fin_commune import ecran_fin  # noqa: E402

Base = _evo.PropLyceeEvoAdditifBase
gras, sans = _evo.gras, _evo.sans

C_INES = "#38bdf8"
C_TOM = "#fb923c"
C_SARAH = "#c084fc"
INES = [100, 200, 300, 400, 500, 600, 700]
TOM = [10, 20, 40, 80, 160, 320, 640]
SARAH = [0, 300, 450, 530, 570, 590, 600]


def interp(ys):
    """Interpolation monotone (Fritsch–Carlson) : la courbe passe par les points
    sans jamais faire de bosse."""
    d = [ys[i + 1] - ys[i] for i in range(len(ys) - 1)]
    m = []
    for i in range(len(ys)):
        if i == 0:
            m.append(d[0])
        elif i == len(ys) - 1:
            m.append(d[-1])
        elif d[i - 1] * d[i] <= 0:
            m.append(0.0)
        else:
            m.append(2 / (1 / d[i - 1] + 1 / d[i]))

    def f(x):
        i = min(max(int(x), 0), len(ys) - 2)
        s = x - i
        return ((2 * s**3 - 3 * s**2 + 1) * ys[i] + (s**3 - 2 * s**2 + s) * m[i]
                + (-2 * s**3 + 3 * s**2) * ys[i + 1] + (s**3 - s**2) * m[i + 1])
    return f


class Repere(VGroup):
    """Quadrillage mois × abonnés : origine (ox, oy), largeur L, hauteur H.
    Les graduations sont une figure qu'on LIT : sans synchro, sans audit."""

    def __init__(self, ox=-5.55, oy=-2.35, L=5.0, H=4.55, xmax=6, ymax=700, pas_y=100, fs=20, nombres=True,
                 nom_x="mois", nom_y="abonnés", **kw):
        super().__init__(**kw)
        self.ox, self.oy, self.L, self.H, self.xmax, self.ymax = ox, oy, L, H, xmax, ymax
        grille = VGroup(*[Line(self.p(x, 0), self.p(x, ymax), color="#334155", stroke_width=1.5)
                          for x in range(1, xmax + 1)],
                        *[Line(self.p(0, y), self.p(xmax, y), color="#334155", stroke_width=1.5)
                          for y in range(pas_y, ymax + 1, pas_y)])
        ax = VGroup(Arrow(self.p(0, 0), self.p(xmax, 0) + RIGHT * 0.35, buff=0, color=GREY_B, stroke_width=3,
                          max_tip_length_to_length_ratio=0.04),
                    Arrow(self.p(0, 0), self.p(0, ymax) + UP * 0.35, buff=0, color=GREY_B, stroke_width=3,
                          max_tip_length_to_length_ratio=0.05))
        self.add(grille, ax)
        self.grille, self.axes = grille, ax
        self.textes = VGroup()
        if nombres:
            for x in range(0, xmax + 1):
                self.textes.add(Text(str(x), font_size=fs, color=GREY_A).next_to(self.p(x, 0), DOWN, buff=0.1))
            for y in range(pas_y, ymax + 1, pas_y):
                self.textes.add(Text(str(y), font_size=fs, color=GREY_A).next_to(self.p(0, y), LEFT, buff=0.1))
        if nom_x:
            self.textes.add(Text(nom_x, font_size=fs + 2, color=GREY_A).next_to(self.p(xmax, 0) + RIGHT * 0.35,
                                                                                 UP, buff=0.1))
        if nom_y:
            self.textes.add(Text(nom_y, font_size=fs + 2, color=GREY_A).next_to(self.p(0, ymax) + UP * 0.35,
                                                                                 RIGHT, buff=0.12))
        self.add(self.textes)
        sans(self)

    def p(self, x, y):
        return P(self.ox + x * self.L / self.xmax, self.oy + y * self.H / self.ymax)

    def courbe(self, vals, couleur, sw=6, x0=0, x1=None, f=None):
        f = f or interp(vals)
        x1 = len(vals) - 1 if x1 is None else x1
        n = max(2, int((x1 - x0) * 20))
        pts = [self.p(x0 + (x1 - x0) * k / n, f(x0 + (x1 - x0) * k / n)) for k in range(n + 1)]
        return VMobject(stroke_color=couleur, stroke_width=sw).set_points_smoothly(pts)

    def point(self, x, y, couleur, r=0.08):
        return Dot(self.p(x, y), radius=r, color=couleur)

    def marche(self, i, v0, v1, couleur, sw=5):
        """La marche du mois i : le palier (un mois) puis la contremarche (la hausse)."""
        h = Line(self.p(i, v0), self.p(i + 1, v0), color=GREY_B, stroke_width=3)
        v = Line(self.p(i + 1, v0), self.p(i + 1, v1), color=couleur, stroke_width=sw + 2)
        g = VGroup(h, v)
        g.palier, g.hausse = h, v
        return g

    def marches(self, vals, couleur, n=None):
        n = len(vals) - 1 if n is None else n
        return VGroup(*[self.marche(i, vals[i], vals[i + 1], couleur) for i in range(n)])


def chaine(couleur, s=1.0):
    """Une icône de chaîne vidéo : un écran arrondi et le triangle « lecture »."""
    fond = RoundedRectangle(width=1.0, height=0.7, corner_radius=0.16, fill_color=couleur, fill_opacity=1,
                            stroke_width=0)
    tri = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.17).rotate(-PI / 2).move_to(fond)
    return VGroup(fond, tri).scale(s)


def boite_petri(s=1.0):
    """Une boîte de Petri vue de dessus, des bactéries dedans."""
    bord = Circle(radius=1.0, fill_color="#0f2a1f", fill_opacity=1, stroke_color="#94a3b8", stroke_width=5)
    import random
    rnd = random.Random(7)
    bac = VGroup()
    for _ in range(26):
        a, r = rnd.uniform(0, TAU), 0.8 * rnd.random() ** 0.5
        bac.add(Ellipse(width=0.16, height=0.08, fill_color=VERT_OK, fill_opacity=1, stroke_width=0)
                .rotate(rnd.uniform(0, PI)).move_to(P(r * np.cos(a), r * np.sin(a))))
    return VGroup(bord, bac).scale(s)


def telephone(s=1.0):
    corps = RoundedRectangle(width=0.8, height=1.5, corner_radius=0.14, fill_color="#1e293b", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=4)
    ecr = RoundedRectangle(width=0.66, height=1.2, corner_radius=0.06, fill_color="#0b1220", fill_opacity=1,
                           stroke_width=0)
    lec = chaine("#ef4444", 0.42).move_to(ecr)
    return VGroup(corps, ecr, lec).scale(s)

def _voix_sans_milliers(voix):
    """« 1 000 » → « 1000 » dans la voix, et la place de chaque caractère gardé
    dans le texte d'origine (pour lire les marques)."""
    out, carte = [], []
    for i, ch in enumerate(voix):
        if ch == " " and 0 < i and voix[i - 1].isdigit() and re.match(r"\d{3}(?!\d)", voix[i + 1:i + 5]):
            continue
        out.append(ch)
        carte.append(i)
    return "".join(out), carte


class AuditMilliers:
    """L'audit de canvas_proportion (recopié, non modifié là-bas), qui lit aussi
    les milliers DITS « 1 000 » : l'original ne cherchait « 1000 » que dans un
    texte où la voix l'écrit avec une espace (AUDIT-ABSENT partout)."""

    def _auditer(self, avant, t0):
        cle = getattr(self, "_cle_voix", None)
        voix, carte = _voix_sans_milliers(getattr(self, "_texte_voix", "") or "")
        marques = self._marques().get(cle, []) if cle else []
        for m in self.mobjects:
            for f in m.get_family():
                if type(f).__name__ == "CompteARebours":
                    for g in f.get_family():
                        g._pas_audit = True
        for m in self.mobjects:
            for t in [f for f in m.get_family() if isinstance(f, Text) and getattr(f, "original_text", None)]:
                if id(t) in avant or getattr(t, "_pas_audit", False) or getattr(t, "_audite", False):
                    continue
                if t.get_fill_opacity() < 0.05:
                    continue
                t._audite = True
                s = t.original_text.replace("−", "").replace(" ", " ")
                s = re.sub(r"(?<=\d) (?=\d{3}(?!\d))", "", s)
                for nb in re.findall(r"\d+(?:,\d+)?", s):
                    occ = [carte[x.start()] for x in re.finditer(r"(?<![\d,])" + re.escape(nb) + r"(?![\d]|,\d)", voix)]
                    if not occ:
                        print(f"AUDIT-ABSENT {cle} « {nb} » ({t.original_text[:30]})", flush=True)
                        continue
                    tps = [max([mm[1] for mm in marques if mm[0] <= i] or [0.0]) + getattr(self, "_debut_voix", 0)
                           for i in occ]
                    if t0 < tps[0] - 0.06:
                        print(f"AUDIT-AVANCE {cle} « {nb} » ({t.original_text[:30]}) {tps[0] - t0:.2f} s", flush=True)
                    else:
                        dernier = max(x for x in tps if x <= t0 + 0.06)
                        if t0 - dernier > 0.4:
                            print(f"AUDIT-TARD {cle} « {nb} » ({t.original_text[:30]}) {t0 - dernier:.2f} s",
                                  flush=True)


class GraphLyceeCroissanceBase(AuditMilliers, Base):
    nom_voix = "lycee-graph-croissance"
    fichier_marques = "graph_lycee_croissance_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"
    XR = 0.5   # le bord gauche de la colonne de droite

    # ── outils ──────────────────────────────────────────────────────────────
    def nieme(self, extrait, ancre):
        """(extrait, n) : la première fois où la voix dit `extrait` APRÈS `ancre`."""
        v = self._texte_voix
        j = v.find(extrait, v.find(ancre))
        n, i = 0, -1
        while True:
            i = v.find(extrait, i + 1)
            if i < 0 or i > j:
                break
            n += 1
        return (extrait, n)

    def _disposer_q(self, question, choix, phrase):
        """Une question longue (5 lignes) : elle rétrécit, les cartes remontent
        (au brouillon, la carte C et « Mets pause » tombaient sur Ti-Margo)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if cartes.get_bottom()[1] < -1.6:
            haut = q.get_top()
            q.scale(0.82).move_to(haut, aligned_edge=UP).align_to(cartes, LEFT)
            dy = q.get_bottom()[1] - 0.2 - cartes.get_top()[1]
            cartes.shift(UP * dy)
            pause.shift(UP * dy)
            if cartes.get_bottom()[1] < -2.0:
                cartes.scale(0.88, about_edge=UP + LEFT)
                pause.next_to(cartes, DOWN, buff=0.15).align_to(cartes, LEFT)
        return tete, q, cartes, pause, rebours, ph

    def legende(self, nom, couleur, y, x=None):
        x = self.XR if x is None else x
        ic = chaine(couleur, 0.6)
        t = self.t(nom, 38, couleur)
        g = VGroup(ic, t).arrange(RIGHT, buff=0.25)
        return g.move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def grand_repere(self):
        return Repere()

    def petit_repere(self, nombres=True):
        """Le repère des écrans « Question ! » : en haut à gauche."""
        return Repere(ox=-5.6, oy=-0.35, L=4.2, H=3.2, fs=17, nombres=nombres)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire une croissance", self.identite, self.ceinture, y_ech=-2.45)
        sans(ident)
        sans(ech)
        self.au_mot("Lire une croissance")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        r = Repere(ox=-2.6, oy=-1.45, L=3.4, H=2.5, nombres=False, nom_x=None, nom_y=None)
        cs = [r.courbe(v, c, 6) for v, c in ((INES, C_INES), (TOM, C_TOM), (SARAH, C_SARAH))]
        self.play(FadeIn(r), run_time=0.3)
        self.au_mot("Ça monte")
        self.play(*[Create(c) for c in cs], run_time=1.0)
        self.au_mot("mais comment")
        q = self.t("?", 110, ORANGE_RETENUE).move_to(P(2.2, 0.0))
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : trois chaînes, six mois, les métiers ───────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        r = self.grand_repere()
        ics = VGroup(*[chaine(c, 0.9) for c in (C_INES, C_TOM, C_SARAH)]).arrange(RIGHT, buff=0.55)
        ics.move_to(P(3.2, 2.75))
        self.montre("Trois créateurs", LaggedStart(*[FadeIn(i, scale=0.6) for i in ics], lag_ratio=0.3), rt=0.8)
        self.montre("chaîne vidéo", *[Indicate(i, scale_factor=1.2) for i in ics], rt=0.6)
        self.montre("Six mois", FadeIn(r), rt=0.5)
        cs = [r.courbe(v, c, 6) for v, c in ((INES, C_INES), (TOM, C_TOM), (SARAH, C_SARAH))]
        self.montre("montent", *[Create(c) for c in cs], rt=1.4)
        h = self.t("pas la même histoire", 36, ORANGE_RETENUE).move_to(P(3.2, 1.6))
        self.montre("pas la même", FadeIn(h, shift=UP * 0.15), rt=0.45)
        ys = (0.6, -0.25, -1.1)
        for y, nom, mot in zip(ys, ("community manager", "data analyst", "épidémiologiste"),
                               ("community", "data analyst", "l'épidémiologiste")):
            t = self.t(nom, 32, WHITE).move_to(P(0, y)).align_to(P(1.15, 0), LEFT)
            puce = Dot(P(0.85, y), radius=0.08, color=AMBRE)
            self.montre(mot, FadeIn(puce, scale=0.5), FadeIn(t, shift=RIGHT * 0.15), rt=0.4)
        s = self.t("annoncent la suite", 32, VERT_OK).move_to(P(0, -2.0)).align_to(P(0.85, 0), LEFT)
        fl = VGroup(*[DashedLine(r.p(6, v[6]), r.p(6.35, v[6] + (v[6] - v[5]) * 0.35 if v is not TOM else 700),
                                 color=c, stroke_width=4) for v, c in ((INES, C_INES), (TOM, C_TOM), (SARAH, C_SARAH))])
        self.montre("annoncent la suite", FadeIn(s, shift=RIGHT * 0.15), Create(fl), rt=0.5)
        self.attendre_voix()

    # ── 02 : la question du jour ────────────────────────────────────────────
    def ecran_question_du_jour(self):
        self.ecran("02-question-du-jour")
        r = self.grand_repere()
        cs = VGroup(*[r.courbe(v, c, 6) for v, c in ((INES, C_INES), (TOM, C_TOM), (SARAH, C_SARAH))])
        self.add(r, cs)
        l1 = self.t("De quelle façon", 46, ORANGE_RETENUE).move_to(P(3.35, 1.0))
        l2 = self.t("une courbe monte ?", 46, ORANGE_RETENUE).move_to(P(3.35, 0.15))
        self.montre("de quelle façon", FadeIn(l1, shift=UP * 0.15), rt=0.4)
        self.montre("une courbe monte", FadeIn(l2, shift=UP * 0.15), rt=0.4)
        self.play(Circumscribe(VGroup(l1, l2), color=AMBRE, buff=0.15), run_time=0.8)
        self.attendre_voix()

    # ── 03 : les marches d'un mois ──────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("03-methode")
        r = self.grand_repere()
        c = r.courbe(SARAH, C_SARAH, 5)
        self.add(r, c)
        ms = r.marches(SARAH, C_SARAH)
        x = 0.85
        L1 = self.lc([("On compare", WHITE), ("les hausses", C_SARAH)], 2.2, fs=36, xl=x)
        self.jouer(L1, ["On compare", "les hausses"],
                   {1: [LaggedStart(*[Create(m) for m in ms], lag_ratio=0.2)]})
        L2 = self.lc([("pas à pas", WHITE)], 1.35, fs=36, xl=x)
        self.jouer(L2, ["pas à pas"], {0: [LaggedStart(*[Indicate(m.palier, color=AMBRE) for m in ms],
                                                       lag_ratio=0.15)]})
        brs = VGroup(*[Brace(Line(r.p(i, 0), r.p(i + 1, 0)), DOWN, buff=0.38, color=AMBRE) for i in range(6)])
        L3 = self.lc([("même largeur", AMBRE)], 0.5, fs=36, xl=x)
        self.jouer(L3, ["même largeur"], {0: [LaggedStart(*[GrowFromCenter(b) for b in brs], lag_ratio=0.1)]})
        L4 = self.lc([("ici :", WHITE), ("1 mois", AMBRE)], -0.35, fs=44, xl=x)
        sans(L4[1])
        un = sans(self.t("1 mois", 22, AMBRE)).next_to(brs[0], DOWN, buff=0.05)
        self.jouer(L4, ["ici", "un mois"], {1: [FadeIn(un, scale=1.3)]})
        self.play(Create(self.cadre(L4[1], AMBRE)), run_time=0.3)
        self.attendre_voix()

    # ── 04 : Inès, + 100 chaque mois : constante ────────────────────────────
    def ecran_constant(self):
        self.ecran("04-constant")
        r = self.grand_repere()
        self.add(r)
        lg = self.legende("Inès", C_INES, 2.75)
        self.montre("Inès", FadeIn(lg, shift=RIGHT * 0.2), rt=0.4)
        L1 = self.lc([("+ 100", C_INES), ("abonnés", WHITE), ("chaque mois", WHITE)], 1.9, fs=36, xl=self.XR)
        self.jouer(L1, ["100 abonnés", "abonnés", "chaque mois"])
        pts = VGroup()
        for i, v in enumerate(INES[:4]):
            d = r.point(i, v, C_INES)
            e = self.t(str(v), 26, C_INES).next_to(d, UL, buff=0.06)
            if i == 0:
                e.next_to(d, DR, buff=0.06)
            pts.add(d)
            self.montre(self.nieme(str(v), "chaque mois"), FadeIn(d, scale=2), FadeIn(e, scale=1.3), rt=0.3)
        ms = r.marches(INES, C_INES, 3)
        labs = VGroup(*[sans(self.t("+ 100", 22, C_INES)).next_to(m.hausse, RIGHT, buff=0.08) for m in ms])
        L2 = self.lc([("Même hausse", WHITE), ("à chaque pas", WHITE)], 0.85, fs=36, xl=self.XR)
        self.jouer(L2, ["Même hausse", "à chaque pas"],
                   {0: [LaggedStart(*[Create(m) for m in ms], lag_ratio=0.25), FadeIn(labs)]})
        dr = r.courbe(INES, C_INES, 6)
        L3 = self.lc([("la courbe :", WHITE), ("une droite", C_INES)], -0.05, fs=36, xl=self.XR)
        self.jouer(L3, ["la courbe", "une droite"], {1: [Create(dr)]})
        L4 = self.lc([("croissance", VERT_OK), ("constante", VERT_OK)], -1.1, fs=46, xl=self.XR)
        self.jouer(L4, ["La croissance", "constante"])
        self.play(Create(self.cadre(L4)), run_time=0.3)
        self.attendre_voix()

    # ── 05 : Tom, il double : ça accélère ───────────────────────────────────
    def ecran_accelere(self):
        self.ecran("05-accelere")
        r = self.grand_repere()
        self.add(r)
        lg = self.legende("Tom", C_TOM, 2.85)
        self.montre("Tom", FadeIn(lg, shift=RIGHT * 0.2), rt=0.4)
        xs = [0.8 + 1.06 * k for k in range(6)]
        yv = 1.0
        nbs = VGroup(*[self.t(str(v), 34, C_TOM).move_to(P(x, yv)) for v, x in zip(TOM, xs)])
        for i, (n, v) in enumerate(zip(nbs, TOM[:6])):
            d = r.point(i, v, C_TOM)
            self.montre(self.nieme(str(v), "Tom :") if i else (str(v), 1), FadeIn(n, scale=1.3),
                        FadeIn(d, scale=2), rt=0.3)
        fois = VGroup(*[sans(self.t("× 2", 22, AMBRE)).move_to(P((xs[k] + xs[k + 1]) / 2, yv + 0.55))
                        for k in range(5)])
        arcs = VGroup(*[ArcBetweenPoints(P(xs[k] + 0.2, yv + 0.28), P(xs[k + 1] - 0.2, yv + 0.28), angle=-PI / 2.5,
                                         color=AMBRE, stroke_width=3) for k in range(5)])
        L1 = self.lc([("Il double", AMBRE), ("chaque mois", WHITE)], 2.15, fs=36, xl=self.XR)
        self.jouer(L1, ["double", "chaque mois"], {0: [LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.15),
                                                          FadeIn(fois)]})
        tit = self.t("Les hausses :", 32, WHITE).move_to(P(0, 0.2)).align_to(P(self.XR, 0), LEFT)
        self.montre("Les hausses", FadeIn(tit, shift=RIGHT * 0.15), rt=0.35)
        ms = r.marches(TOM, C_TOM, 5)
        yh = -0.45
        for k in range(5):
            h = self.t(f"+{TOM[k + 1] - TOM[k]}", 28, C_TOM).move_to(P((xs[k] + xs[k + 1]) / 2, yh))
            self.montre(self.nieme(str(TOM[k + 1] - TOM[k]), "grandissent"), FadeIn(h, scale=1.3), Create(ms[k]),
                        rt=0.3)
        c = r.courbe(TOM, C_TOM, 6, f=lambda x: 10 * 2 ** x)
        L3 = self.lc([("se redresse :", WHITE), ("ça accélère", VERT_OK)], -1.35, fs=38, xl=self.XR)
        self.jouer(L3, ["se redresse", "accélère"], {0: [Create(c)]})
        self.play(Create(self.cadre(L3[1])), run_time=0.3)
        self.attendre_voix()

    # ── 06 : QUESTION (A) : Sarah ralentit ──────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        r = self.petit_repere()
        c = r.courbe(SARAH, C_SARAH, 5)
        ms = r.marches(SARAH, C_SARAH, 4)

        def avant(sc):
            sc.play(FadeIn(r), Create(c), LaggedStart(*[Create(m) for m in ms], lag_ratio=0.2), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["Sarah gagne", "chaque mois,"])
            l1 = sc.ligne_rep(1, ["mais de moins", "en moins :"])
            l2 = sc.ligne_rep(2, ["la croissance", "ralentit."])
            pal = DashedLine(r.p(3.6, 600), r.p(6, 600), color=GREY_B, stroke_width=3)
            sc.montre("Sarah gagne", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("chaque mois", FadeIn(l0[1], shift=UP * 0.15),
                      LaggedStart(*[Indicate(m.hausse, color=WHITE) for m in ms], lag_ratio=0.2), rt=0.6)
            sc.montre("mais de moins", FadeIn(l1[0], shift=UP * 0.15), rt=0.35)
            sc.montre("en moins", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("s'aplatit", Create(pal), c.animate.set_stroke(width=9), rt=0.5)
            sc.montre("la croissance", FadeIn(l2[0], shift=UP * 0.15), rt=0.35)
            sc.montre("ralentit", FadeIn(l2[1], scale=1.3), rt=0.35)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Chez Sarah, les hausses :", "300, 150, 80, 40.",
                                                           "Sa croissance :"],
                            [self.t("ralentit", 36), self.t("accélère", 36), self.t("est constante", 36)], 0,
                            ["Sarah gagne chaque mois,", "mais de moins en moins :", "la croissance ralentit."],
                            mot_q="Chez Sarah", avant_q=avant, autres_r=apres)

    # ── 07 : le piège : ralentir ≠ diminuer ─────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        ra = Repere(ox=-5.9, oy=0.15, L=3.6, H=2.2, nombres=False, nom_x=None, nom_y=None)
        rb = Repere(ox=-5.9, oy=-2.95, L=3.6, H=2.2, nombres=False, nom_x=None, nom_y=None)
        ca = ra.courbe(SARAH, C_SARAH, 6)
        cb = rb.courbe([600, 590, 560, 480, 350, 220, 150], ROUGE_ERREUR, 6)
        fa = Arrow(ra.p(4.6, 380), ra.p(4.6, 600), buff=0, color=VERT_OK, stroke_width=6,
                   max_tip_length_to_length_ratio=0.3)
        x = 0.1
        L1 = self.lc([("s'aplatit", C_SARAH), ("mais", WHITE), ("monte encore", VERT_OK)], 1.9, fs=36, xl=x)
        self.jouer(L1, ["s'aplatit", None, "monte encore"], {0: [FadeIn(ra), Create(ca)], 2: [GrowArrow(fa)]})
        L2 = self.lc([("ralentir", VERT_OK), ("≠", WHITE), ("diminuer", ROUGE_ERREUR)], 0.75, fs=52, xl=x)
        X = Cross(VGroup(rb.axes, cb), stroke_color=ROUGE_ERREUR, stroke_width=8).scale(0.8)
        self.jouer(L2, ["Ralentir", "ce n'est pas", "diminuer"], {2: [FadeIn(rb), Create(cb)]})
        self.play(Create(X), run_time=0.4)
        L3 = self.lc([("Sarah ne perd", WHITE), ("aucun abonné", WHITE)], -0.45, fs=36, xl=x)
        self.jouer(L3, ["Sarah ne perd", "aucun abonné"])
        L4 = self.lc([("elle en gagne", WHITE), ("moins vite", AMBRE)], -1.3, fs=36, xl=x)
        self.jouer(L4, ["elle en gagne", "moins vite"])
        self.play(Create(self.cadre(L4[1], AMBRE)), run_time=0.3)
        self.attendre_voix()

    # ── 08 : le temps de doublement ─────────────────────────────────────────
    def ecran_doublement(self):
        self.ecran("08-doublement")
        r = self.grand_repere()
        c = r.courbe(TOM, C_TOM, 5, f=lambda x: 10 * 2 ** x)
        self.add(r)
        self.montre("la courbe de Tom", Create(c), rt=0.8)
        L0 = self.lc([("Le temps", AMBRE), ("pour doubler", AMBRE)], 2.6, fs=42, xl=self.XR)
        self.jouer(L0, ["le temps", "pour doubler"])
        for k, (a, b, y, ancre) in enumerate(((40, 80, 1.5, "De 40"), (160, 320, 0.45, "De 160"))):
            i = TOM.index(a)
            da, db = r.point(i, a, C_TOM, 0.1), r.point(i + 1, b, C_TOM, 0.1)
            fl = CurvedArrow(da.get_center() + UP * 0.12, db.get_center() + LEFT * 0.15, angle=-PI / 3,
                             color=AMBRE, stroke_width=4)
            x2 = sans(self.t("× 2", 24, AMBRE)).next_to(fl, UL, buff=0.02)
            br = Brace(Line(r.p(i, 0), r.p(i + 1, 0)), DOWN, buff=0.38, color=AMBRE)
            um = sans(self.t("1 mois", 22, AMBRE)).next_to(br, DOWN, buff=0.05)
            L = self.lc([(str(a), C_TOM), ("→", WHITE), (str(b), C_TOM), (":", WHITE), ("1 mois", AMBRE)], y,
                        fs=40, xl=self.XR)
            sans(L[4])
            self.jouer(L, [ancre[3:] if k == 0 else ancre[3:], None, str(b), None,
                           self.nieme("un mois", str(b))],
                       {0: [FadeIn(da, scale=2)], 2: [FadeIn(db, scale=2), Create(fl), FadeIn(x2)],
                        4: [GrowFromCenter(br), FadeIn(um)]})
        L3 = self.lc([("le même temps", VERT_OK)], -0.65, fs=40, xl=self.XR)
        self.jouer(L3, ["reste le même"])
        self.play(Create(self.cadre(L3)), run_time=0.3)
        ms = r.marches(TOM, C_TOM, 6)
        L4 = self.lc([("les hausses", C_TOM), ("s'envolent", C_TOM)], -1.6, fs=36, xl=self.XR)
        self.jouer(L4, ["les hausses", "s'envolent"], {0: [LaggedStart(*[Create(m) for m in ms], lag_ratio=0.15)]})
        self.attendre_voix()

    # ── 09 : QUESTION (C) : les bactéries ───────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bp = boite_petri(1.15).move_to(P(-3.9, 1.85))

        def avant(sc):
            sc.play(FadeIn(bp, scale=0.8), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["En 9 h :", "3 doublements."], fs=30)
            l1 = sc.ligne_rep(1, ["1 000", "→ 2 000", "→ 4 000", "→ 8 000"], fs=30)
            l2 = sc.ligne_rep(2, ["A : + 1 000 ;", "B : 2 000 × 3."], fs=30)
            sc.montre("En 9 heures", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("3 doublements", FadeIn(l0[1], scale=1.3), rt=0.35)
            for k, (m, mot) in enumerate(zip(l1, ["1 000", "2 000", "4 000", "8 000"])):
                sc.montre(mot, FadeIn(m, scale=1.3), *([Indicate(bp, scale_factor=1.06)] if k else []), rt=0.3)
            sc.montre("A ajoute", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.35)
            sc.montre("B multiplie", FadeIn(l2[1], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.rep_fini()

        self.question_pause("09-question", "09b-reponse",
                            ["Des bactéries :", "1 000 → 2 000 en 3 h,", "elles doublent à ce rythme.",
                             "Combien sont-elles", "après 9 h ?"],
                            [self.t("4 000", 36), self.t("6 000", 36), self.t("8 000", 36)], 2,
                            ["En 9 h : 3 doublements.", "1 000 → 2 000 → 4 000 → 8 000",
                             "A : + 1 000 ; B : 2 000 × 3."],
                            mot_q="Des bactéries", avant_q=avant, autres_r=apres)

    # ── 10 : défi : les vues d'une vidéo ────────────────────────────────────
    def tableau_vues(self):
        """Le tableau heures / vues : 6 colonnes (le libellé, puis 1 à 5 h)."""
        x0, w0, w, h, y0 = -6.25, 1.35, 1.32, 0.72, 0.25
        cases = VGroup()
        for lig in range(2):
            for col in range(6):
                lw = w0 if col == 0 else w
                x = x0 + (w0 / 2 if col == 0 else w0 + (col - 0.5) * w)
                cases.add(Rectangle(width=lw, height=h, stroke_color=GREY_B, stroke_width=2,
                                    fill_color="#111827" if lig == 0 else "#0b1220", fill_opacity=1)
                          .move_to(P(x, y0 - lig * h)))
        cx = [x0 + w0 + (k - 0.5) * w for k in range(1, 6)]
        libs = VGroup(self.t("heures", 26, GREY_A).move_to(P(x0 + w0 / 2, y0)),
                      self.t("vues", 26, GREY_A).move_to(P(x0 + w0 / 2, y0 - h)))
        sans(libs)
        tb = VGroup(cases, libs)
        tb.cx, tb.y_h, tb.y_v, tb.h = cx, y0, y0 - h, h
        return tb

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        tel = telephone(1.1).move_to(P(-5.3, 1.95))
        tb = self.tableau_vues()
        self.montre("Une vidéo", FadeIn(tel, shift=UP * 0.2), FadeIn(tb), rt=0.5)
        for k, (hh, v) in enumerate(((1, "500"), (2, "1 000"), (3, "2 000"))):
            th = self.t(str(hh), 30).move_to(P(tb.cx[hh - 1], tb.y_h))
            tv = self.t(v, 30, C_TOM).move_to(P(tb.cx[hh - 1], tb.y_v))
            self.montre(v, FadeIn(tv, scale=1.3), rt=0.3)
            self.montre(f"{hh} heure", FadeIn(th, scale=1.3), rt=0.3)
        t5 = self.t("5", 30).move_to(P(tb.cx[4], tb.y_h))
        q5 = self.t("?", 36, ORANGE_RETENUE).move_to(P(tb.cx[4], tb.y_v))
        x = 1.95
        L1 = self.lc([("Au même rythme :", WHITE)], 2.05, fs=36, xl=x)
        self.jouer(L1, ["Au même rythme"])
        L2 = self.lc([("après 5 h ?", ORANGE_RETENUE)], 1.35, fs=40, xl=x)
        self.jouer(L2, ["combien après 5"], {0: [FadeIn(t5, scale=1.3), FadeIn(q5, scale=1.5)]})
        L3 = self.lc([("Ça accélère ?", ORANGE_RETENUE)], 0.55, fs=40, xl=x)
        self.jouer(L3, ["accélère-t-elle"])
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = sans(self.t("Correction", 50, JAUNE_TITRE)).move_to(P(-0.4, 3.1))
        tel = telephone(1.1).move_to(P(-5.3, 1.95))
        tb = self.tableau_vues()
        vals = ["500", "1 000", "2 000", "4 000", "8 000"]
        fixes = VGroup(*[sans(self.t(str(h), 30)).move_to(P(tb.cx[h - 1], tb.y_h)) for h in (1, 2, 3, 5)],
                       *[sans(self.t(v, 30, C_TOM)).move_to(P(tb.cx[k], tb.y_v)) for k, v in enumerate(vals[:3])])
        self.add(tit, tel, tb, fixes)
        arcs = VGroup(*[ArcBetweenPoints(P(tb.cx[k] + 0.15, tb.y_h + tb.h / 2 + 0.05),
                                         P(tb.cx[k + 1] - 0.15, tb.y_h + tb.h / 2 + 0.05), angle=-PI / 2.2,
                                         color=AMBRE, stroke_width=3) for k in range(4)])
        fois = VGroup(*[sans(self.t("× 2", 22, AMBRE)).next_to(a, UP, buff=0.02) for a in arcs])
        L0 = self.lc([("Elle double", AMBRE), ("chaque heure", WHITE)], 1.95, fs=38, xl=-4.3)
        self.jouer(L0, ["double", "chaque heure"], {0: [LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.15),
                                                          FadeIn(fois)]})
        t4 = self.t("4", 30).move_to(P(tb.cx[3], tb.y_h))
        v4 = self.t("4 000", 30, VERT_OK).move_to(P(tb.cx[3], tb.y_v))
        v5 = self.t("8 000", 30, VERT_OK).move_to(P(tb.cx[4], tb.y_v))
        self.montre("4 000", FadeIn(v4, scale=1.3), rt=0.3)
        self.montre("4 heures", FadeIn(t4, scale=1.3), rt=0.3)
        self.montre("8 000", FadeIn(v5, scale=1.3), rt=0.3)
        self.play(Create(self.cadre(v5)), run_time=0.3)
        lh = self.t("hausses", 24, GREY_A).move_to(P(-6.25 + 1.35 / 2, tb.y_v - 0.85))
        self.montre("Les hausses", FadeIn(lh, shift=UP * 0.1), rt=0.3)
        for k, v in enumerate(["500", "1 000", "2 000", "4 000"]):
            h = self.t("+" + v, 24, C_TOM).move_to(P((tb.cx[k] + tb.cx[k + 1]) / 2, tb.y_v - 0.85))
            self.montre(self.nieme(v, "grandissent"), FadeIn(h, scale=1.3), rt=0.3)
        L2 = self.lc([("La croissance", WHITE), ("accélère", VERT_OK)], -2.2, fs=42, xl=-5.9)
        self.jouer(L2, ["La croissance", "accélère"])
        self.play(Create(self.cadre(L2[1])), run_time=0.3)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        r = Repere(ox=-5.9, oy=-2.3, L=3.6, H=3.6, nombres=False, nom_x=None, nom_y=None)
        ci, ct, cs = (r.courbe(INES, C_INES, 5), r.courbe(TOM, C_TOM, 5, f=lambda x: 10 * 2 ** x),
                      r.courbe(SARAH, C_SARAH, 5))
        fig = VGroup(r, ci, ct, cs)
        self.add(fig)
        self.XL = -0.9  # figure plus petite : le texte gagne de la place (24/11)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On compare les hausses", "sur des intervalles de même largeur."),
            ("Hausses égales : constante,", "une droite."),
            ("Hausses qui grandissent :", "ça accélère."),
            ("Hausses qui rétrécissent :", "ça ralentit, mais ça monte encore.")], fs=40)
        self.au_mot("On compare")
        self.montrer_ligne(lignes[0])
        self.au_mot("Hausses égales")
        self.montrer_ligne(lignes[1], ci.animate.set_stroke(width=9))
        self.au_mot("Hausses qui grandissent")
        self.montrer_ligne(lignes[2], ct.animate.set_stroke(width=9))
        self.au_mot("Hausses qui rétrécissent")
        self.montrer_ligne(lignes[3], cs.animate.set_stroke(width=9))
        self.attendre_voix(marge=1.0)

    def construct(self):
        for e in (self.page_de_garde, self.ecran_situation, self.ecran_question_du_jour, self.ecran_methode,
                  self.ecran_constant, self.ecran_accelere, self.ecran_question1, self.ecran_piege,
                  self.ecran_doublement, self.ecran_question2, self.ecran_defi, self.ecran_correction,
                  self.ecran_finale):
            e()
        ecran_fin(self, "paysage", voix="12-abonne")


class GraphLyceeCroissancePremiere(GraphLyceeCroissanceBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"
