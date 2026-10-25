# canvas_fractions.py
# LES FIGURES DE FRACTIONS DU COACH, REDESSINÉES POUR MANIM (série « Fractions »,
# 6e et 4e d'abord, puis CM1 → Tle). Créé le 24/10/2026 par l'épisode PILOTE
# 6e 03-egale (fractions égales, simplifier) ; importé par TOUS les épisodes,
# comme `charte` et `canvas_stats`.
#
# ⭐ POURQUOI : l'élève regarde la vidéo, puis s'entraîne dans le coach. Il doit
# reconnaître LA MÊME figure : carte blanche aux coins arrondis, parts bleu ciel
# (#38bdf8) bordées d'encre bleu nuit (#0f172a), parts vides presque blanches
# (#f8fafc). Modèles : lib/canvas/FractionCanvas.tsx (bar, circle, grid,
# compare), DroiteGradueeCanvas.tsx (axe nuit + flèche, graduations, point bleu
# #2563eb sur sa tige), SchemaBarreCanvas.tsx (bande partagée, tons pastel).
#
# ⛔ Les épisodes NE MODIFIENT PAS ce module : s'il leur manque quelque chose,
# ils l'ajoutent dans LEUR script (sous-classe ou fonction locale) et le disent.
# ⛔ Rien n'est ajouté à la scène : chaque méthode RENVOIE un objet ou une
# animation ; la scène décide quand (au mot de la voix).
# ⛔ Pas de LaTeX sur ce poste : les fractions sont des Text + un trait.
#
# ── L'API EN BREF ─────────────────────────────────────────────────────────────
#   from canvas_fractions import *
#   b = Barre(8, 6, largeur=7, centre=P(0, 1))       # 8 parts, les 6 premières bleues
#   self.play(FadeIn(b.carte), b.apparaitre())        # carte, puis parts une à une
#   self.play(b.colorier(range(6)))                   # (ou) colorier au mot
#   b4, anim = b.regrouper(2); self.play(anim); b = b4    # 8/8 → 4 parts : 6/8 → 3/4
#   b12, anim = b4.repartager(3); self.play(anim)          # chaque part coupée en 3 : 9/12
#   self.play(Create(b.fin_coloriee(vers=-1.6)))       # pointillé ambre au bout du bleu
#   d = Disque(12, 8, rayon=1.5)   ·  d.regrouper(4) · d.repartager(2) · d.apparaitre()
#   g = Grille(4, 5, 15)           ·  g.colorier(...) · g.entourer_lignes() · g.cases[r][c]
#   dr = Droite(0, 1, 4, etiquettes={0: "0", 1: "1"}, longueur=8)
#        dr.p(v) · dr.point(v, "3/4") · dr.graduer(8) (anim + nouvelle Droite) · dr.ticks[v]
#   f = EcritureFraction(6, 8, fs=72) ·  f.num · f.trait · f.den   (num="…" ou "?" : un trou orange)
#        f.chiffre(9) : le Text qui remplace le trou, collé au trait (haut=False : en bas)
#   haut, bas = fleches(f, g, "÷ 2")  # flèches courbes num → num (en haut) et den → den (en bas)
#   eg = egalite(f, g)              # « 6/8 = 3/4 » posé, renvoie VGroup(f, signe, g)
#   dv = Division(3, 4, decimales=2, mode="pose")   # ou mode="ligne" : « 3 ÷ 4 = 0,75 »
#        dv.etapes  (liste de VGroup à montrer dans l'ordre, au mot)
#   pc = Pourcentage(75, mode="cases")  # 100 cases, 75 bleues ; mode="chargement" : barre de jeu
#        pc.remplir() (animation) · pc.etiquette (« 75 % »)
#
# ⭐ Les re-partages (`regrouper`, `repartager`) gardent EXACTEMENT la même
# longueur coloriée : c'est LE geste de la simplification (et de l'égalité).
# Ils renvoient (nouvelle_figure, animation) : après self.play(animation), la
# scène contient la NOUVELLE figure (l'ancienne en est retirée).
# ⭐ Une fraction écrite se lit d'un bloc (« 3 quarts ») : EcritureFraction porte
# `sans_synchro = True` ; la synchro par jetons des scripts (frac_commun.py) ne
# l'attend pas, c'est au script de la poser AU MOT.

import numpy as np
from manim import *

from canvas_stats import AMBRE, CARTE, GRILLE, NUIT, P, fr, texte  # noqa: F401
from charte import VERT_OK

# ── les couleurs du coach (FractionCanvas.tsx) ──────────────────────────────
BLEU_PART = "#38bdf8"    # une part prise (BLUE du coach)
VIDE = "#f8fafc"         # une part vide (EMPTY, slate-50)
BORD = "#0f172a"         # le bord des parts (BORDER, slate-900)
ROUGE_COACH = "#ef4444"  # « les parts ne sont pas égales » (RED)
BLEU_POINT = "#2563eb"   # le point de la droite graduée (blue-600)
ROUGE_ZERO = "#dc2626"   # le 0 de la droite graduée
ORANGE_TROU = "#ea580c"  # un nombre à trouver (« … », « ? »), comme les cases « ? »
# des teintes pour colorier autrement (SchemaBarreCanvas.tsx, et un vert franc)
PASTELS = ["#dbeafe", "#dcfce7", "#fef3c7", "#fce7f3", "#ede9fe"]
VERT_PART = "#4ade80"
ORANGE_PART = "#fb923c"
VIOLET_PART = "#a78bfa"


def _carte(largeur, hauteur, rayon=0.22):
    """La carte blanche du coach (rounded-xl, bord slate-200)."""
    return RoundedRectangle(width=largeur, height=hauteur, corner_radius=rayon, fill_color=CARTE,
                            fill_opacity=1, stroke_color=GRILLE, stroke_width=3)


def _echange(ancien, nouveau, *extras, run_time=1 / 30):
    """Remplace `ancien` (et les `extras`) par `nouveau`, sans rien montrer :
    les deux se superposent exactement. FadeOut/FadeIn à fonction de temps
    constante : l'ancien reste plein jusqu'au bout, le nouveau est plein dès le
    début ; l'ancien est retiré de la scène à la fin."""
    return AnimationGroup(FadeOut(ancien, rate_func=lambda t: 0),
                          *[FadeOut(e, rate_func=lambda t: 0) for e in extras],
                          FadeIn(nouveau, rate_func=lambda t: 1), run_time=run_time)


def apparition(tout, phases, run_time=1.0):
    """UNE animation sur `tout` (il entre dans la scène d'un bloc) qui fait
    apparaître ses morceaux par phases : [(morceaux, t0, t1, un_a_un), …], t0 et
    t1 entre 0 et 1. un_a_un=True : les morceaux arrivent l'un après l'autre
    dans [t0, t1]. Les opacités d'origine sont rendues à la fin."""
    items = []
    for ms, t0, t1, lag in phases:
        n = max(1, len(ms))
        for i, m in enumerate(ms):
            a, b = (t0 + (t1 - t0) * i / n, min(t1, t0 + (t1 - t0) * (i + 2) / n)) if lag else (t0, t1)
            for f in m.get_family():
                if isinstance(f, VMobject):
                    items.append((f, f.get_fill_opacity(), f.get_stroke_opacity(), a, max(b, a + 1e-3)))

    def maj(_, alpha):
        for f, fo, so, a, b in items:
            x = min(1.0, max(0.0, (alpha - a) / (b - a)))
            f.set_fill(opacity=fo * x, family=False)
            f.set_stroke(opacity=so * x, family=False)

    return UpdateFromAlphaFunc(tout, maj, run_time=run_time, rate_func=linear)


# ── la fraction ÉCRITE ──────────────────────────────────────────────────────

class EcritureFraction(VGroup):
    """Numérateur, trait, dénominateur (sans LaTeX). num ou den = « … » ou « ? »
    → un trou, écrit en orange. couleurs : num_c / den_c (par défaut `couleur`).

    Morceaux : .num .trait .den. Sur la carte blanche : couleur=NUIT."""

    sans_synchro = True

    def __init__(self, num, den, fs=64, couleur=WHITE, num_c=None, den_c=None, police=None, gras=False, **kw):
        super().__init__(**kw)
        opts = {"font": police} if police else {}
        if gras:
            opts["weight"] = BOLD

        def nb(v, c):
            s = fr(v) if not isinstance(v, str) else v
            c = ORANGE_TROU if s in ("…", "?", "...") and c is None else (c or couleur)
            return Text(s, font_size=fs, color=c, **opts)

        self.num = nb(num, num_c)
        self.den = nb(den, den_c)
        larg = max(self.num.width, self.den.width) + fs / 260
        if any(isinstance(v, str) and v in ("…", "?", "...") for v in (num, den)):  # un trou : la place de 2 chiffres
            larg = max(larg, Text("00", font_size=fs, **opts).width + fs / 260)
        self.trait = Line(LEFT * larg / 2, RIGHT * larg / 2, color=couleur, stroke_width=max(3, fs / 14))
        ecart = fs / 520
        self.num.next_to(self.trait, UP, buff=ecart)
        self.den.next_to(self.trait, DOWN, buff=ecart)
        self.add(self.num, self.trait, self.den)
        for m in (self.num, self.trait, self.den):  # posés un à un, ils restent hors synchro
            m.sans_synchro = True
        self.valeurs = (num, den)
        self._style = (fs, opts, self.trait.width, ecart)

    def chiffre(self, v, haut=True, couleur=None):
        """Le nombre qui REMPLACE un trou (« … ») ou un terme : un Text à la
        place exacte du numérateur (haut=True) ou du dénominateur, collé au
        trait comme les autres (même si la fraction a été agrandie).
        À jouer : FadeOut(f.num), FadeIn(f.chiffre(9))."""
        fs, opts, larg0, ecart = self._style
        k = self.trait.width / larg0
        t = Text(fr(v) if not isinstance(v, str) else v, font_size=fs, color=couleur or VERT_OK, **opts).scale(k)
        t.sans_synchro = True
        return t.next_to(self.trait, UP if haut else DOWN, buff=ecart * k)


def egalite(f, g, signe="=", fs=None, couleur=WHITE, buff=0.35):
    """« f = g » posé sur une ligne (le signe à la hauteur du trait).
    Renvoie VGroup(f, signe, g) ; signe peut être « = » ou « ≠ »."""
    fs = fs or int(f.num.font_size)
    s = Text(signe, font_size=fs, color=couleur)
    s.sans_synchro = True
    grp = VGroup(f, s, g).arrange(RIGHT, buff=buff)
    s.set_y(f.trait.get_y())
    g.shift(UP * (f.trait.get_y() - g.trait.get_y()))
    return grp


def fleches(f, g, etiquette, couleur=AMBRE, fs=None, angle=TAU / 5, bas=None):
    """Les deux flèches courbes du geste « même nombre en haut ET en bas » :
    f.num → g.num par-dessus (étiquette au-dessus), f.den → g.den par-dessous
    (étiquette en dessous). etiquette : « ÷ 2 », « × 3 »… ; bas : une autre
    étiquette pour le bas (le PIÈGE : « ÷ 2 » en haut, rien ou « − 2 » en bas).
    Renvoie (haut, bas) : deux VGroup(flèche, étiquette) ; bas = None si
    etiquette du bas vaut "" (le terme qu'on a oublié)."""
    fs = fs or max(30, int(f.num.font_size * 0.55))

    def une(a, b, dessus, txt):
        d, e = (a.get_top(), b.get_top()) if dessus else (a.get_bottom(), b.get_bottom())
        d, e = d + (UP if dessus else DOWN) * 0.12, e + (UP if dessus else DOWN) * 0.12
        fl = CurvedArrow(d, e, angle=-angle if dessus else angle, color=couleur, stroke_width=5,
                         tip_length=0.2)
        t = Text(txt, font_size=fs, color=couleur)
        t.sans_synchro = True
        t.next_to(fl, UP if dessus else DOWN, buff=0.08)
        return VGroup(fl, t)

    h = une(f.num, g.num, True, etiquette)
    txt_bas = etiquette if bas is None else bas
    b = une(f.den, g.den, False, txt_bas) if txt_bas else None
    return h, b


# ── la BARRE (model « bar », et la bande de SchemaBarreCanvas) ──────────────

class Barre(VGroup):
    """Une bande partagée en n parts égales ; les parts `colories` sont bleues.

    n, k      : n parts, les k premières coloriées (ou colories=[indices]).
    largeur, hauteur : la bande, en unités Manim (≥ 5 de large en paysage).
    couleur   : la couleur des parts prises (BLEU_PART) ; vide : les autres.
    carte     : True = la carte blanche du coach autour (marge `marge`).
    etiquette : None, "frac" (la fraction écrite sous la bande, encre nuit)
                ou une chaîne (écrite telle quelle sous la bande).
    Morceaux : .carte .parts[i] .traits[j] (trait entre la part j et j+1)
               .contour .etiquette (ou None). n et k : .n .k ; .colories."""

    def __init__(self, n, k=0, largeur=6.0, hauteur=0.9, couleur=BLEU_PART, vide=VIDE,
                 colories=None, carte=True, marge=0.3, etiquette=None, fs=40, sw=3, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.n, self.k = n, k
        self.colories = list(range(k)) if colories is None else list(colories)
        self.k = len(self.colories)
        self.opts = dict(largeur=largeur, hauteur=hauteur, couleur=couleur, vide=vide, carte=carte, marge=marge,
                         etiquette=etiquette, fs=fs, sw=sw)
        w = largeur / n
        x0 = -largeur / 2
        self.parts = VGroup(*[Rectangle(width=w, height=hauteur, stroke_width=0, fill_opacity=1,
                                        fill_color=couleur if i in self.colories else vide)
                              .move_to(P(x0 + w * (i + 0.5), 0)) for i in range(n)])
        self.traits = VGroup(*[Line(P(x0 + w * j, -hauteur / 2), P(x0 + w * j, hauteur / 2), color=BORD,
                                    stroke_width=sw) for j in range(1, n)])
        self.contour = Rectangle(width=largeur, height=hauteur, stroke_color=BORD, stroke_width=sw + 1,
                                 fill_opacity=0)
        self.etiquette = None
        if etiquette == "frac":
            self.etiquette = EcritureFraction(self.k, n, fs=fs, couleur=NUIT, police="Arial", gras=True)
        elif etiquette:
            self.etiquette = texte(etiquette, fs)
            self.etiquette.sans_synchro = True
        if self.etiquette is not None:
            self.etiquette.next_to(self.contour, DOWN, buff=0.22)
        corps = VGroup(self.parts, self.contour, *([self.etiquette] if self.etiquette is not None else []))
        self.carte = _carte(corps.width + 2 * marge, corps.height + 2 * marge).move_to(corps) if carte else VMobject()
        self.add(self.carte, self.parts, self.traits, self.contour)
        if self.etiquette is not None:
            self.add(self.etiquette)
        self.move_to(centre)

    # ── où sont les choses (recalculé : la barre peut avoir bougé) ──
    def x_trait(self, j):
        """L'abscisse du trait j (0 = bord gauche, n = bord droit)."""
        g, d = self.contour.get_left()[0], self.contour.get_right()[0]
        return g + (d - g) * j / self.n

    def fin_coloriee(self, vers=-1.5, couleur=AMBRE):
        """Le pointillé vertical au BOUT de la partie coloriée (k premières parts),
        prolongé de `vers` (négatif = vers le bas) : pour comparer deux barres."""
        x = self.x_trait(max(self.colories) + 1 if self.colories else 0)
        y0 = self.contour.get_top()[1] + 0.15
        return DashedLine(P(x, y0), P(x, self.contour.get_bottom()[1] + vers), color=couleur, stroke_width=5,
                          dash_length=0.12)

    def accolade(self, txt=None, couleur=AMBRE, fs=34, dessus=True):
        """Une accolade sur la partie coloriée (la longueur prise), avec un texte."""
        parts = VGroup(*[self.parts[i] for i in self.colories])
        br = Brace(parts, UP if dessus else DOWN, color=couleur)
        if txt is None:
            return br
        t = Text(txt, font_size=fs, color=couleur)
        t.next_to(br, UP if dessus else DOWN, buff=0.1)
        return VGroup(br, t)

    # ── animations ──
    def apparaitre(self, run_time=1.2):
        """La carte, puis le contour et les parts vides, les traits de gauche à
        droite, enfin les parts coloriées une à une. UNE animation sur la barre
        entière (elle entre dans la scène d'un bloc)."""
        vides = [p for i, p in enumerate(self.parts) if i not in self.colories]
        pleines = [self.parts[i] for i in sorted(self.colories)]
        ph = [([self.carte], 0, 0.2, False), ([self.contour, *vides], 0.15, 0.4, False),
              (list(self.traits), 0.35, 0.7, True), (pleines, 0.65, 1.0, True)]
        if self.etiquette is not None:
            ph.append(([self.etiquette], 0.8, 1.0, False))
        return apparition(self, ph, run_time)

    def colorier(self, indices=None, couleur=None, lag=0.18, run_time=None):
        """Colorie les parts `indices` (par défaut celles de .colories), une à une."""
        indices = self.colories if indices is None else list(indices)
        c = couleur or self.opts["couleur"]
        for i in indices:
            if i not in self.colories:
                self.colories.append(i)
        self.k = len(self.colories)
        return LaggedStart(*[self.parts[i].animate.set_fill(c, 1) for i in indices], lag_ratio=lag,
                           run_time=run_time or max(0.4, 0.22 * len(indices)))

    def vider(self, indices=None):
        indices = list(range(self.n)) if indices is None else list(indices)
        self.colories = [i for i in self.colories if i not in indices]
        self.k = len(self.colories)
        return AnimationGroup(*[self.parts[i].animate.set_fill(self.opts["vide"], 1) for i in indices])

    def _semblable(self, n, colories):
        o = dict(self.opts)
        o["largeur"] = self.contour.width
        o["hauteur"] = self.contour.height
        nb = Barre(n, colories=colories, **o)
        nb.shift(self.contour.get_center() - nb.contour.get_center())
        for i in nb.colories:  # la couleur ACTUELLE des parts prises (si colorier() l'a changée)
            src = self.parts[min(self.n - 1, i * self.n // nb.n)]
            nb.parts[i].set_fill(src.get_fill_color(), 1)
        return nb

    def repartager(self, m, run_time=1.2):
        """Coupe CHAQUE part en m (le geste « × m en haut et en bas ») :
        k/n devient (k×m)/(n×m), la longueur coloriée ne bouge pas.
        Renvoie (nouvelle Barre, animation) ; les nouveaux traits se tracent
        de haut en bas, part après part."""
        nb = self._semblable(self.n * m, [i * m + r for i in self.colories for r in range(m)])
        neufs = VGroup(*[nb.traits[j - 1].copy() for j in range(1, self.n * m) if j % m])
        anim = Succession(LaggedStart(*[Create(t) for t in neufs], lag_ratio=0.25, run_time=run_time),
                          _echange(self, nb, neufs))
        return nb, anim

    def regrouper(self, g, run_time=1.0):
        """Regroupe les parts g par g (le geste « ÷ g en haut et en bas ») : les
        traits intérieurs de chaque groupe pâlissent puis s'effacent. Il faut que
        g divise n, et que les parts coloriées forment des groupes entiers.
        Renvoie (nouvelle Barre, animation)."""
        if self.n % g:
            raise ValueError(f"{g} ne divise pas {self.n}")
        groupes = sorted({i // g for i in self.colories})
        if len(groupes) * g != len(self.colories):
            raise ValueError("les parts coloriées ne font pas des groupes entiers")
        nb = self._semblable(self.n // g, groupes)
        partants = VGroup(*[self.traits[j - 1] for j in range(1, self.n) if j % g])
        anim = Succession(AnimationGroup(*[t.animate.set_stroke(AMBRE, width=7) for t in partants],
                                         run_time=run_time * 0.35),
                          AnimationGroup(*[t.animate.set_stroke(opacity=0) for t in partants],
                                         run_time=run_time * 0.65),
                          _echange(self, nb))
        return nb, anim

    def groupes(self, g, couleur=AMBRE, sw=6):
        """Des cadres autour de chaque groupe de g parts (montrer « 2 par 2 »)."""
        return VGroup(*[SurroundingRectangle(VGroup(*self.parts[i:i + g]), color=couleur, buff=0.06,
                                             stroke_width=sw, corner_radius=0.06) for i in range(0, self.n, g)])


# ── le DISQUE (model « circle » : le gâteau, la pizza, la tarte) ────────────

class Disque(VGroup):
    """Un disque partagé en n parts égales (la 1re part part du HAUT, puis on
    tourne dans le sens des aiguilles d'une montre, comme le coach).
    Mêmes paramètres que Barre (rayon au lieu de largeur/hauteur).
    Morceaux : .carte .parts[i] .traits[j] (rayon au début de la part j)
               .cercle .etiquette ; .n .k .colories."""

    def __init__(self, n, k=0, rayon=1.5, couleur=BLEU_PART, vide=VIDE, colories=None, carte=True, marge=0.3,
                 etiquette=None, fs=40, sw=3, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.n = n
        self.colories = list(range(k)) if colories is None else list(colories)
        self.k = len(self.colories)
        self.opts = dict(rayon=rayon, couleur=couleur, vide=vide, carte=carte, marge=marge, etiquette=etiquette,
                         fs=fs, sw=sw)
        a = TAU / n
        self.parts = VGroup(*[AnnularSector(inner_radius=0, outer_radius=rayon, angle=-a, start_angle=PI / 2 - i * a,
                                            fill_opacity=1, stroke_width=0,
                                            fill_color=couleur if i in self.colories else vide) for i in range(n)])
        self.traits = VGroup(*[Line(ORIGIN, rayon * np.array([np.cos(PI / 2 - j * a), np.sin(PI / 2 - j * a), 0]),
                                    color=BORD, stroke_width=sw) for j in range(n)]) if n > 1 else VGroup()
        self.cercle = Circle(radius=rayon, stroke_color=BORD, stroke_width=sw + 1)
        self.etiquette = None
        if etiquette == "frac":
            self.etiquette = EcritureFraction(self.k, n, fs=fs, couleur=NUIT, police="Arial", gras=True)
        elif etiquette:
            self.etiquette = texte(etiquette, fs)
            self.etiquette.sans_synchro = True
        if self.etiquette is not None:
            self.etiquette.next_to(self.cercle, DOWN, buff=0.22)
        corps = VGroup(self.cercle, *([self.etiquette] if self.etiquette is not None else []))
        self.carte = _carte(corps.width + 2 * marge, corps.height + 2 * marge).move_to(corps) if carte else VMobject()
        self.add(self.carte, self.parts, self.traits, self.cercle)
        if self.etiquette is not None:
            self.add(self.etiquette)
        self.move_to(centre)

    def centre_disque(self):
        return self.cercle.get_center()

    def apparaitre(self, run_time=1.2):
        """Comme Barre.apparaitre : carte, cercle et parts vides, rayons, puis le bleu."""
        vides = [p for i, p in enumerate(self.parts) if i not in self.colories]
        pleines = [self.parts[i] for i in sorted(self.colories)]
        ph = [([self.carte], 0, 0.2, False), ([self.cercle, *vides], 0.15, 0.4, False),
              (list(self.traits), 0.35, 0.7, True), (pleines, 0.65, 1.0, True)]
        if self.etiquette is not None:
            ph.append(([self.etiquette], 0.8, 1.0, False))
        return apparition(self, ph, run_time)

    colorier = Barre.colorier
    vider = Barre.vider

    def _semblable(self, n, colories):
        o = dict(self.opts)
        o["rayon"] = self.cercle.width / 2
        nd = Disque(n, colories=colories, **o)
        nd.shift(self.cercle.get_center() - nd.cercle.get_center())
        for i in nd.colories:
            nd.parts[i].set_fill(self.parts[min(self.n - 1, i * self.n // nd.n)].get_fill_color(), 1)
        return nd

    def repartager(self, m, run_time=1.2):
        """Coupe chaque part en m : (k×m)/(n×m). Renvoie (nouveau Disque, animation)."""
        nd = self._semblable(self.n * m, [i * m + r for i in self.colories for r in range(m)])
        neufs = VGroup(*[nd.traits[j].copy() for j in range(self.n * m) if j % m])
        anim = Succession(LaggedStart(*[Create(t) for t in neufs], lag_ratio=0.25, run_time=run_time),
                          _echange(self, nd, neufs))
        return nd, anim

    def regrouper(self, g, run_time=1.0):
        """Regroupe les parts g par g : (k÷g)/(n÷g). Renvoie (nouveau Disque, animation)."""
        if self.n % g:
            raise ValueError(f"{g} ne divise pas {self.n}")
        groupes = sorted({i // g for i in self.colories})
        if len(groupes) * g != len(self.colories):
            raise ValueError("les parts coloriées ne font pas des groupes entiers")
        nd = self._semblable(self.n // g, groupes)
        partants = VGroup(*[self.traits[j] for j in range(self.n) if j % g])
        anim = Succession(AnimationGroup(*[t.animate.set_stroke(AMBRE, width=7) for t in partants],
                                         run_time=run_time * 0.35),
                          AnimationGroup(*[t.animate.set_stroke(opacity=0) for t in partants],
                                         run_time=run_time * 0.65),
                          _echange(self, nd))
        return nd, anim

    def sortir(self, i, d=0.25):
        """Une part qui sort du disque (vers l'extérieur), pour la montrer."""
        a = PI / 2 - (i + 0.5) * TAU / self.n
        return self.parts[i].animate.shift(d * np.array([np.cos(a), np.sin(a), 0]))


# ── la GRILLE (model « grid ») ──────────────────────────────────────────────

class Grille(VGroup):
    """Une grille de lignes × colonnes cases ; les k premières (dans l'ordre de
    lecture : ligne après ligne) sont bleues, ou colories=[indices].
    Morceaux : .carte .cases[r][c] .liste (les cases à plat) .etiquette ; .k."""

    def __init__(self, lignes, colonnes, k=0, cote=0.6, couleur=BLEU_PART, vide=VIDE, colories=None, carte=True,
                 marge=0.3, etiquette=None, fs=40, sw=3, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.lignes, self.colonnes, self.n = lignes, colonnes, lignes * colonnes
        self.colories = list(range(k)) if colories is None else list(colories)
        self.k = len(self.colories)
        self.opts = dict(couleur=couleur, vide=vide)
        self.liste = VGroup(*[Square(cote, fill_opacity=1, stroke_color=BORD, stroke_width=sw,
                                     fill_color=couleur if i in self.colories else vide)
                              .move_to(P((i % colonnes - (colonnes - 1) / 2) * cote,
                                         ((lignes - 1) / 2 - i // colonnes) * cote)) for i in range(self.n)])
        self.parts = self.liste  # pour colorier() / vider(), comme Barre
        self.cases = [[self.liste[r * colonnes + c] for c in range(colonnes)] for r in range(lignes)]
        self.etiquette = None
        if etiquette == "frac":
            self.etiquette = EcritureFraction(self.k, self.n, fs=fs, couleur=NUIT, police="Arial", gras=True)
        elif etiquette:
            self.etiquette = texte(etiquette, fs)
            self.etiquette.sans_synchro = True
        if self.etiquette is not None:
            self.etiquette.next_to(self.liste, DOWN, buff=0.22)
        corps = VGroup(self.liste, *([self.etiquette] if self.etiquette is not None else []))
        self.carte = _carte(corps.width + 2 * marge, corps.height + 2 * marge).move_to(corps) if carte else VMobject()
        self.add(self.carte, self.liste)
        if self.etiquette is not None:
            self.add(self.etiquette)
        self.move_to(centre)

    colorier = Barre.colorier
    vider = Barre.vider

    def apparaitre(self, run_time=1.2):
        vides = [p for i, p in enumerate(self.liste) if i not in self.colories]
        pleines = [self.liste[i] for i in sorted(self.colories)]
        ph = [([self.carte], 0, 0.2, False), (vides, 0.15, 0.45, False), (pleines, 0.4, 1.0, True)]
        if self.etiquette is not None:
            ph.append(([self.etiquette], 0.8, 1.0, False))
        return apparition(self, ph, run_time)

    def entourer_lignes(self, rs=None, couleur=AMBRE, sw=6):
        """Un cadre autour de chaque ligne `rs` (par défaut toutes)."""
        rs = range(self.lignes) if rs is None else rs
        return VGroup(*[SurroundingRectangle(VGroup(*self.cases[r]), color=couleur, buff=0.05, stroke_width=sw,
                                             corner_radius=0.05) for r in rs])

    def entourer_colonnes(self, cs=None, couleur=AMBRE, sw=6):
        cs = range(self.colonnes) if cs is None else cs
        return VGroup(*[SurroundingRectangle(VGroup(*[self.cases[r][c] for r in range(self.lignes)]), color=couleur,
                                             buff=0.05, stroke_width=sw, corner_radius=0.05) for c in cs])


# ── la DROITE graduée (DroiteGradueeCanvas.tsx) ─────────────────────────────

class Droite(VGroup):
    """Une demi-droite graduée de a à b, coupée en n intervalles (un trait par
    1/n d'unité si a=0, b=1). Axe bleu nuit + flèche à droite, graduations,
    étiquettes sous l'axe : {valeur: "texte"} ou {valeur: (num, den)} → une
    fraction écrite. Le 0 est rouge, comme le coach.
    Morceaux : .carte .axe .ticks {i: trait} .etiquettes {valeur: Mobject}.
    Positions : .p(v) (recalculé si la droite a bougé)."""

    def __init__(self, a=0, b=1, n=4, etiquettes=None, longueur=8.0, carte=True, marge=0.35, fs=34, sw=4,
                 depasse=0.6, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.a, self.b, self.n = a, b, n
        self.opts = dict(etiquettes=etiquettes, longueur=longueur, carte=carte, marge=marge, fs=fs, sw=sw,
                         depasse=depasse)
        self._g = Dot(P(-longueur / 2, 0), radius=0.001, fill_opacity=0)   # repères invisibles : a et b
        self._d = Dot(P(longueur / 2, 0), radius=0.001, fill_opacity=0)
        self.axe = Arrow(P(-longueur / 2 - 0.15, 0), P(longueur / 2 + depasse, 0), buff=0, color=BORD,
                         stroke_width=sw + 2, tip_length=0.25, max_tip_length_to_length_ratio=1)
        self.ticks = {}
        for i in range(n + 1):
            h = 0.22 if i in (0, n) else 0.16
            x = -longueur / 2 + longueur * i / n
            self.ticks[i] = Line(P(x, -h), P(x, h), color=BORD, stroke_width=sw)
        self.etiquettes = {}
        for v, e in (etiquettes or {}).items():
            if isinstance(e, tuple):
                m = EcritureFraction(e[0], e[1], fs=fs, couleur=NUIT, police="Arial", gras=True)
            else:
                m = texte(e, fs, color=ROUGE_ZERO if v == 0 else NUIT)
                m.sans_synchro = True
            self.etiquettes[v] = m.next_to(P(-longueur / 2 + longueur * (v - a) / (b - a), -0.25), DOWN, buff=0.12)
        corps = VGroup(self.axe, *self.ticks.values(), *self.etiquettes.values())
        self.carte = _carte(corps.width + 2 * marge, corps.height + 2 * marge + 1.0).move_to(corps).shift(UP * 0.5) \
            if carte else VMobject()
        self.add(self.carte, self._g, self._d, self.axe, *self.ticks.values(), *self.etiquettes.values())
        self.move_to(centre)

    def p(self, v):
        g, d = self._g.get_center(), self._d.get_center()
        return g + (d - g) * (v - self.a) / (self.b - self.a)

    def point(self, v, etiquette=None, couleur=BLEU_POINT, fs=None, haut=0.55):
        """Le point du coach : une tige, un rond, l'étiquette au-dessus (texte ou
        (num, den))."""
        fs = fs or self.opts["fs"]
        x = self.p(v)
        tige = Line(x, x + UP * haut, color=couleur, stroke_width=5)
        rond = Dot(x + UP * haut, radius=0.11, color=couleur)
        grp = VGroup(tige, rond)
        if etiquette is not None:
            if isinstance(etiquette, tuple):
                e = EcritureFraction(etiquette[0], etiquette[1], fs=fs, couleur=couleur, police="Arial", gras=True)
            else:
                e = texte(etiquette, fs, color=couleur)
                e.sans_synchro = True
            grp.add(e.next_to(rond, UP, buff=0.12))
        return grp

    def graduer(self, n2, run_time=1.0):
        """Une graduation plus fine (n2 multiple de n) : les nouveaux traits se
        tracent. Renvoie (nouvelle Droite, animation)."""
        o = dict(self.opts)
        o["longueur"] = self._d.get_center()[0] - self._g.get_center()[0]
        nd = Droite(self.a, self.b, n2, **o)
        nd.shift(self._g.get_center() - nd._g.get_center())
        m = n2 // self.n
        neufs = VGroup(*[nd.ticks[i].copy() for i in range(n2 + 1) if i % m])
        return nd, Succession(LaggedStart(*[Create(t) for t in neufs], lag_ratio=0.2, run_time=run_time),
                              _echange(self, nd, neufs))


# ── la DIVISION : 3 ÷ 4 = 0,75 (en ligne, ou posée « à la française ») ─────

def _chiffres_division(a, b, decimales):
    """Les étapes de la division posée de l'entier a par l'entier b :
    [(colonne, partiel, produit, reste, chiffre du quotient)], colonne = indice
    du chiffre abaissé dans « a suivi de `decimales` zéros »."""
    D = [int(c) for c in str(a)] + [0] * decimales
    r, out = 0, []
    for i, d in enumerate(D):
        cur = r * 10 + d
        q = cur // b
        r = cur - q * b
        out.append((i, cur, q * b, r, q))
    return out, len(str(a))


class Division(VGroup):
    """mode="ligne" : « 3 ÷ 4 = 0,75 » ; .a .signe .b .egal .res ;
    .etapes = [VGroup(a, ÷, b), VGroup(=, résultat)].
    mode="pose" : la potence française (dividende « 3,00 » à gauche, diviseur à
    droite, quotient dessous) ; .etapes = [le cadre, puis UN VGroup par chiffre
    du quotient (le chiffre, le produit « − 28 », le reste et le chiffre abaissé)].
    Le résultat se calcule (jamais écrit à la main) ; decimales = nombre de
    zéros ajoutés après la virgule. Écrit en blanc sur le fond noir (couleur=…)."""

    def __init__(self, a, b, decimales=2, mode="ligne", fs=60, couleur=WHITE, c_res=None, centre=ORIGIN, **kw):
        super().__init__(**kw)
        etapes, nint = _chiffres_division(a, b, decimales)
        qs = "".join(str(e[4]) for e in etapes)
        qi, qd = qs[:nint].lstrip("0") or "0", qs[nint:].rstrip("0")
        self.resultat = qi + ("," + qd if qd else "")
        c_res = c_res or VERT_OK
        T = lambda s, c=couleur: Text(s, font_size=fs, color=c)  # noqa: E731
        if mode == "ligne":
            self.a, self.signe, self.b = T(fr(a)), T("÷"), T(fr(b))
            self.egal, self.res = T("="), T(self.resultat, c_res)
            self.add(self.a, self.signe, self.b, self.egal, self.res)
            self.arrange(RIGHT, buff=0.3)
            self.etapes = [VGroup(self.a, self.signe, self.b), VGroup(self.egal, self.res)]
        else:
            self._poser(a, b, etapes, nint, decimales, fs, T, c_res)
        self.move_to(centre)

    def _poser(self, a, b, etapes, nint, decimales, fs, T, c_res):
        cw = fs / 100 * 0.84          # largeur d'une colonne de chiffre
        lh = fs / 100 * 1.22          # hauteur d'une ligne
        cv = cw * 0.22                # la place de la virgule
        X = lambda col: col * cw + (cv if decimales and col >= nint else 0)  # noqa: E731
        bas = -T("0").height / 2      # la ligne de base des chiffres (pour poser les virgules)

        def virgule(x, y, c=WHITE):
            return T(",", c).move_to(P(x, y + bas)).shift(DOWN * 0.04 * fs / 60)

        chiffres = list(str(a)) + ["0"] * decimales
        divid = VGroup(*[T(c).move_to(P(X(i), 0)) for i, c in enumerate(chiffres)])
        virg = virgule(X(nint - 1) + cw / 2 + cv / 2, 0) if decimales else VGroup()
        xb = X(len(chiffres) - 1) + cw * 0.9
        diviseur = T(fr(b)).next_to(P(xb, 0), RIGHT, buff=0.3)
        nq = len([e for e in etapes]) + 1
        pot_v = Line(P(xb, diviseur.get_top()[1] + 0.15), P(xb, -lh * 1.75), color=WHITE, stroke_width=4)
        pot_h = Line(P(xb, -lh * 0.5), P(xb + max(diviseur.width + 0.6, cw * nq + 0.5), -lh * 0.5),
                     color=WHITE, stroke_width=4)
        self.cadre = VGroup(divid, virg, diviseur, pot_v, pot_h)
        self.add(self.cadre)
        self.etapes = [self.cadre]
        xq = xb + 0.3 + cw / 2
        y, premier = 0.0, True
        for (i, cur, prod, r, q) in etapes:
            grp = VGroup()
            # le chiffre du quotient (les zéros de tête de la partie entière sont tus)
            if not (q == 0 and premier and i < nint - 1):
                if i == nint and decimales:
                    grp.add(virgule(xq - cw / 2 + cv / 2, -lh * 1.1, c_res))
                    xq += cv
                grp.add(T(str(q), c_res).move_to(P(xq, -lh * 1.1)))
                xq += cw
            if q > 0 or not premier:
                premier = False
                sp, sc = str(prod), str(cur)
                yp = y - lh
                lp = VGroup(*[T(c).move_to(P(X(i - len(sp) + 1 + j), yp)) for j, c in enumerate(sp)])
                # le « − » à un vrai écart du premier chiffre (il touchait le « 28 », 25/10)
                moins = T("−").move_to(P(X(i - max(len(sp), len(sc))) - cw * 0.12, yp))
                trait = Line(P(X(i - max(len(sp), len(sc)) + 1) - cw / 2, yp - lh * 0.52),
                             P(X(i) + cw / 2, yp - lh * 0.52), color=WHITE, stroke_width=3)
                sr = str(r) + (chiffres[i + 1] if i + 1 < len(chiffres) else "")
                y = yp - lh * 1.05
                lr = VGroup(*[T(c).move_to(P(X(i - len(str(r)) + 1 + j), y)) for j, c in enumerate(sr)])
                grp.add(moins, lp, trait, lr)
            if len(grp):
                self.add(grp)
                self.etapes.append(grp)


# ── le POURCENTAGE : 100 cases, ou la barre de chargement d'un jeu ──────────

class Pourcentage(VGroup):
    """mode="cases" : une grille 10 × 10 (la carte du coach), `valeur` cases
    bleues : 75 % = 75 cases sur 100. .grille (une Grille) .etiquette.
    mode="chargement" : la barre de chargement d'un jeu vidéo : piste sombre,
    remplissage vert qui avance de gauche à droite, « 75 % » à droite.
    .piste .plein .etiquette. remplir() : l'animation (les cases ligne par
    ligne, ou la barre qui avance) ; etiquette=False : pas de « 75 % »
    (le script l'écrit AU MOT)."""

    def __init__(self, valeur, mode="cases", cote=0.32, largeur=7.0, hauteur=0.7, couleur=None, etiquette=True,
                 fs=40, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.valeur, self.mode = valeur, mode
        self.etiquette = None
        if mode == "cases":
            self.grille = Grille(10, 10, colories=[], cote=cote, couleur=couleur or BLEU_PART, sw=2)
            self.add(self.grille)
            if etiquette:
                self.etiquette = Text(f"{fr(valeur)} %", font_size=fs, color=WHITE)
                self.etiquette.next_to(self.grille, DOWN, buff=0.2)
        else:
            c = couleur or "#22c55e"
            self.piste = RoundedRectangle(width=largeur, height=hauteur, corner_radius=hauteur / 2,
                                          fill_color="#1e293b", fill_opacity=1, stroke_color="#94a3b8",
                                          stroke_width=4)
            w = max(0.02, (largeur - 0.16) * valeur / 100)
            self.plein = RoundedRectangle(width=w, height=hauteur - 0.16, corner_radius=min(w, hauteur - 0.16) / 2,
                                          fill_color=c, fill_opacity=1, stroke_width=0)
            self.plein.align_to(self.piste, LEFT).shift(RIGHT * 0.08)
            self.add(self.piste, self.plein)
            if etiquette:
                self.etiquette = Text(f"{fr(valeur)} %", font_size=fs, color=c)
                self.etiquette.next_to(self.piste, RIGHT, buff=0.25)
        if self.etiquette is not None:
            self.etiquette.sans_synchro = True
            self.add(self.etiquette)
        self.move_to(centre)

    def remplir(self, run_time=1.6):
        """Les cases se colorient ligne par ligne (dans l'ordre de lecture), ou la
        barre de chargement avance de 0 jusqu'à `valeur`."""
        if self.mode == "cases":
            g = self.grille
            return g.colorier(range(int(round(self.valeur))), lag=0.03, run_time=run_time)
        cible = self.plein.copy()
        gauche = self.piste.get_left()[0] + 0.08

        def maj(m, a):
            w = max(0.02, cible.width * a)
            m.become(RoundedRectangle(width=w, height=cible.height, corner_radius=min(w, cible.height) / 2,
                                      fill_color=cible.get_fill_color(), fill_opacity=1, stroke_width=0))
            m.move_to(P(gauche + w / 2, cible.get_y()))

        return UpdateFromAlphaFunc(self.plein, maj, run_time=run_time, rate_func=smooth)

    def vide(self):
        """La même figure, vide (cases blanches, barre à 0), pour la poser avant remplir()."""
        if self.mode == "cases":
            for i in range(100):
                self.grille.liste[i].set_fill(VIDE, 1)
            self.grille.colories = []
        else:
            self.plein.set_opacity(0)
        return self
