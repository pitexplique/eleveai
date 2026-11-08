# demi_droite_fraction.py
# EleveAI — Maths 6e — « Repérer sur une demi-droite graduée », épisode 03 :
# PLACER UNE FRACTION (micro du coach : abscisse_fraction, notion
# demi_droite_graduee), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE (brief
# demi-droite : placer une fraction = orange). PAYSAGE SEULEMENT : le short
# existe (demi_droite_graduee_short.py, voix 6e-demi-droite-short-fraction).
# ⭐ Le geste gardé de la paysage de notion (demi_droite_graduee.py) : LE SAUT,
# une flèche courbe d'un trait au suivant, compté depuis 0.
# ⭐ La méthode : le DÉNOMINATEUR dit en combien de parts égales on coupe
# l'unité ; le NUMÉRATEUR dit combien de sauts on fait depuis 0.
#
# Décor et métier : la CUISINE ; Chloé, PÂTISSIÈRE : sa recette de crêpes dit
# 3/4 L de lait, son verre doseur est gradué en quarts ; on le couche : il
# devient la demi-droite. Pour la fête de l'école : 7/4 L = 1 L + 3/4 L (deux
# verres). Défi : une autre recette, 5/3 L. Recette inventée : AUCUNE donnée
# du monde réel citée, pas de source à recopier. Centres : cuisine.
# Vérifié (Python) : 3/4 = 0,75 ; 2/5 = 0,4 ; 4/4 = 1 ; 7/4 = 1 + 3/4 = 1,75 ;
# 8/4 = 2 ; 9/4 = 2 + 1/4 (entre 2 et 3) ; 7/10 = 0,7 ; 3/3 = 1 ;
# 5/3 = 1 + 2/3 (entre 1 et 2).
#
# Micro → écrans (banque lib/tutor-v4/questionBank/6e/maths/demi-droite.bank.ts,
# items abscisse_fraction_*) : l'unité partagée en parts égales, chaque
# graduation vaut 1/d (02, 03) ; compter les parts depuis l'origine = le
# numérateur (04, question 1 en cinquièmes, comme genFraction d = 5) ; fraction
# plus grande que 1, 7/4 entre 1 et 2 (06, fixed_3) ; « entre quels entiers ? »
# (07, question 2, 9/4) ; le piège : compter les TRAITS (08) ; le lien avec les
# dixièmes, fraction au-dessus et décimal dessous (09, comme frac_decimal_v2.py,
# sans la refaire) ; 3/4 n'est pas au 3e trait d'une droite en dixièmes
# (10, question 3) ; défi 5/3 (11) et correction (11b).
# Écrans : 00 garde · 01 Chloé et la recette · 02 on couche le verre ·
# 03 le dénominateur · 04 le numérateur · 05 QUESTION 1 · 06 sept quarts ·
# 07 QUESTION 2 · 08 le piège · 09 les dixièmes · 10 QUESTION 3 · 11 défi ·
# 11b correction · 12 ce que tu as appris · 13 fin.
# Leurres : compter les traits (3/5 au lieu de 2/5), le pas vaut 1 (« 2 »,
# « 3 »), le numérateur pris pour des unités (entre 9 et 10), la fraction
# toujours plus petite que 1 (entre 0 et 1), 3/4 au 3e trait d'une droite en
# dixièmes.
#
# Voix : manim/voix/6e-demi-droite-fraction.json (écrite par l'agent, débit −10),
# WAV dans public/sons/6e-demi-droite-fraction/ ; marques mot à mot :
# manim/scripts/6e/demi_droite_fraction_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py ; « 9 » de 07b ajouté à la main).
# Outils : prop_commun.py (PaysageProp : synchro, AUDIT, questions-pauses,
# « Ce que tu as appris », fin) + canvas_fractions.py (Droite, EcritureFraction),
# non modifiés. Ajouté ICI : chloe(), verre_doseur(), niveau() (le lait qui
# monte), droite() (une Droite du coach avec une carte plus haute pour les
# sauts et les fractions), saut(), muet().
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/demi_droite_fraction.py DemiDroiteFraction6e
# python -m manim render -qh --disable_caching manim/scripts/6e/demi_droite_fraction.py DemiDroiteFraction6e -o eleveai-maths-6e-demi-droite-fraction --media_dir manim/scripts/6e/media-demi-droite-03
# Sortie : manim/sorties/6e/maths/demi-droite-graduee/03-fraction/eleveai-maths-6e-demi-droite-fraction.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_triangles import FinTriangles  # noqa: E402  (fin du 05/11 : pouce, commentaire, cloche)
from canvas_fractions import _carte  # noqa: E402

SAUT = "#ea580c"        # la flèche du saut, sur la carte blanche
LAIT = "#e2e8f0"
CREME = "#fef3c7"
VERT_CARTE = "#15803d"  # le décimal, sous la droite (lisible sur la carte)
PART_A, PART_B = "#38bdf8", "#a78bfa"


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
    """Ni attente de la synchro, ni audit (données d'une figure qu'on lit,
    fractions posées AU MOT par le script)."""
    for f in m.get_family():
        f.sans_synchro = True
        f._pas_audit = True
    return m


def frac(n, d, fs=60, couleur=WHITE, **kw):
    return muet(EcritureFraction(n, d, fs=fs, couleur=couleur, **kw))


def chloe(s=1.0):
    """Chloé, pâtissière : toque blanche, cheveux longs, tablier, fouet."""
    p = personne(peau="#e0ac69", tenue="#f472b6", cheveux="#78350f", longs=True, s=1.0)
    toque = VGroup(Rectangle(width=0.7, height=0.3, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                   .move_to(P(0, 0.5)),
                   *[Circle(radius=0.25, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(x, 0.76))
                     for x in (-0.24, 0, 0.24)])
    tablier = Polygon(P(-0.45, -1.85), P(0.45, -1.85), P(0.32, -0.75), P(-0.32, -0.75), fill_color=WHITE,
                      fill_opacity=1, stroke_width=0)
    manche = Line(P(0.55, -1.25), P(0.95, -0.75), color="#94a3b8", stroke_width=7)
    fouet = VGroup(*[Ellipse(width=0.26, height=0.55, stroke_color="#cbd5e1", stroke_width=3)
                     .rotate(-0.67).move_to(P(1.05, -0.55)) for _ in range(1)],
                   Ellipse(width=0.14, height=0.5, stroke_color="#cbd5e1", stroke_width=3).rotate(-0.67)
                   .move_to(P(1.05, -0.55)))
    g = VGroup(p, tablier, toque, manche, fouet)
    return g.scale(s)


def verre_doseur(h=3.0, w=1.3, etiquettes=True, fs=30):
    """Le verre doseur gradué en quarts de litre (étiquettes À DROITE).
    .lait (hauteur nulle au départ) · .marques[i] (trait de (i+1)/4) ·
    .etiq[i] · .fond (le bas du verre)."""
    parois = VGroup(Line(P(-w / 2, h / 2), P(-w / 2, -h / 2)), Line(P(-w / 2, -h / 2), P(w / 2, -h / 2)),
                    Line(P(w / 2, -h / 2), P(w / 2, h / 2)),
                    Line(P(-w / 2, h / 2), P(-w / 2 - 0.22, h / 2 + 0.16))).set_stroke("#cbd5e1", 6)
    lait = Rectangle(width=w - 0.12, height=0.001, fill_color=LAIT, fill_opacity=1, stroke_width=0)
    lait.move_to(P(0, -h / 2 + 0.05), DOWN)
    marques, etiq = VGroup(), VGroup()
    for i in range(1, 5):
        y = -h / 2 + 0.05 + (h - 0.3) * i / 4
        marques.add(Line(P(w / 2 - 0.38, y), P(w / 2, y), color=WHITE, stroke_width=4))
        e = muet(Text(f"{i}/4 L" if i < 4 else "1 L", font_size=fs))
        etiq.add(e.next_to(P(w / 2, y), RIGHT, buff=0.15))
    g = VGroup(lait, parois, marques)
    if etiquettes:
        g.add(etiq)
    g.lait, g.parois, g.marques, g.etiq, g.h, g.w = lait, parois, marques, etiq, h, w
    g.bas = lait.get_bottom()
    return g


def niveau(v, k, run_time=0.6):
    """Le lait du verre v monte (ou descend) jusqu'à k quarts de litre."""
    bas = v.lait.get_bottom().copy()
    h0 = v.lait.height
    h1 = max(0.001, (v.h - 0.3) * k / 4)

    def maj(m, a):
        m.stretch_to_fit_height(max(0.001, h0 + (h1 - h0) * a))
        m.move_to(bas, DOWN)

    return UpdateFromAlphaFunc(v.lait, maj, run_time=run_time, rate_func=smooth)


def droite(a, b, n, etiq, longueur=8.0, centre=ORIGIN, fs=34, haut=2.2, bas=1.05, carte=True):
    """Une demi-droite du coach (canvas_fractions.Droite), l'AXE à la hauteur de
    `centre`, des traits plus longs aux entiers, et une carte blanche assez haute
    pour les sauts et la fraction posée au-dessus du point.
    .fond (la carte) · .dr (la Droite : .p(v), .ticks, .etiquettes) · .entiers."""
    dr = Droite(a, b, n, etiquettes=etiq, longueur=longueur, carte=False, fs=fs)
    dr.shift(P(centre[0] - longueur / 2, centre[1]) - dr.p(a))
    muet(VGroup(*dr.etiquettes.values()))
    entiers = VGroup(*[Line(dr.p(k) + DOWN * 0.27, dr.p(k) + UP * 0.27, color=BORD, stroke_width=5)
                       for k in range(int(np.ceil(a)), int(b) + 1)])
    for t in list(dr.ticks.values()) + list(entiers):
        t.set_z_index(2)
    x0 = dr.p(a)[0] - 0.55
    x1 = dr.p(b)[0] + dr.opts["depasse"] + 0.45
    fond = _carte(x1 - x0, haut + bas).move_to(P((x0 + x1) / 2, centre[1] + (haut - bas) / 2)) if carte \
        else VMobject()
    g = VGroup(fond, dr, entiers)
    g.fond, g.dr, g.entiers = fond, dr, entiers
    g.p = dr.p
    return g


def saut(d, v1, v2, num=None, couleur=SAUT, fs=26, haut=0.2):
    """LE SAUT (geste de demi_droite_graduee.py) : une flèche courbe d'un trait
    au suivant ; `num` : le numéro du saut, écrit au-dessus (muet : le script le
    pose au mot)."""
    arc = ArcBetweenPoints(d.p(v1) + UP * haut, d.p(v2) + UP * haut, angle=-PI / 2, color=couleur,
                           stroke_width=4)
    arc.add_tip(tip_length=0.15, tip_width=0.15)
    g = VGroup(arc)
    g.arc = arc
    if num is not None:
        t = muet(texte(str(num), fs, color=couleur)).next_to(arc, UP, buff=0.04)
        g.add(t)
        g.num = t
    return g


def sauts(d, a, k, pas, depuis=1, fs=26):
    """Les sauts depuis a, de `pas` en `pas`, numérotés depuis `depuis`."""
    return [saut(d, a + i * pas, a + (i + 1) * pas, depuis + i, fs=fs) for i in range(k)]


def part(d, v1, v2, couleur=PART_A, sw=12):
    """Un morceau de l'axe qui s'allume, de v1 à v2."""
    return Line(d.p(v1), d.p(v2), color=couleur, stroke_width=sw)


def point(d, v, n=None, den=None, haut=0.95, fs=34, couleur=BLEU_POINT):
    """Le point du coach (tige + rond), la fraction au-dessus (muette)."""
    g = d.dr.point(v, (n, den) if n is not None else None, couleur=couleur, fs=fs, haut=haut)
    return muet(g)


def decimal_sous(d, v, s, fs=34, couleur=VERT_CARTE):
    t = muet(texte(s, fs, color=couleur))
    return t.next_to(d.p(v) + DOWN * 0.25, DOWN, buff=0.12)


def lien(d, v, haut=0.9, bas=0.2, couleur=AMBRE):
    x = d.p(v)
    return DashedLine(x + UP * haut, x + DOWN * bas, color=couleur, stroke_width=4, dash_length=0.08)


class DemiDroiteFractionBase(FinTriangles, PaysageProp):
    nom_voix = "6e-demi-droite-fraction"
    fichier_marques = "demi_droite_fraction_marques.json"

    def ligne(self, morceaux, fs=40, buff=0.2):
        """Celle du lot C, morceaux posés sur une même ligne de base."""
        return aligner_bases(super().ligne(morceaux, fs, buff))

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self.q_q = q
        # une ligne qui porte une fraction (« se place 9/4 ? ») : la synchro
        # l'attend à son NUMÉRATEUR dit (« 9 quarts ») ; l'audit ne cherche pas
        # le dénominateur, qui se dit en lettres (« quarts »)
        for t in list(q) + list(ph):
            if "/" in getattr(t, "original_text", ""):
                t._pas_audit = True
        return tete, q, cartes, pause, rebours, ph

    def choix(self, s, fs=36):
        """Un choix de question : affiché d'un bloc (pas découpé), à ses mots.
        Un choix fraction (« 3/5 ») attend son numérateur dit (« 3 cinquièmes ») ;
        l'audit ne cherche pas son dénominateur, dit en lettres."""
        t = self.t(s, fs)
        t._bloc = True
        if "/" in s:
            t._pas_audit = True
        return t

    # ── « la suite au mot » : un texte dont la fin se dit plus tard ─────────
    # (« entre 0 et 1 » : 0,46 s entre le 0 et le 1 ; « 8 quarts font 2. » :
    # 0,74 s entre le 8 et le 2). La tête paraît à son mot, la suite reste
    # invisible et s'allume au mot `ext` de la voix (jamais avant, jamais plus
    # de 0,4 s après) : elle est jouée par au_mot() dès que ce mot est passé.
    def par_morceaux(self, t, morceaux):
        """t : UN Text (lignes de base intactes). morceaux : [(indice du 1er
        caractère, extrait de la voix), …] (indices SANS les espaces) : les
        caractères de chaque morceau restent invisibles et s'allument au mot
        `extrait`. Le texte lui-même n'attend rien (sans_synchro) : on le pose
        au mot de sa tête."""
        t.sans_synchro = t._pas_audit = True
        bornes = [k for k, _ in morceaux] + [len(t.submobjects)]
        for (k, ext), fin in zip(morceaux, bornes[1:]):
            g = VGroup(*t.submobjects[k:fin])
            g.set_opacity(0)
            self._a_reveler = getattr(self, "_a_reveler", []) + [(ext, g)]
        return t

    def _reveler(self, avant_s=None):
        """Allume les suites dont le mot est dit d'ici `avant_s` secondes (toutes si None)."""
        reste = []
        for ext, b in getattr(self, "_a_reveler", []):
            try:
                dt = self.t_mot(ext)
            except ValueError:  # pas dans cette voix-ci
                reste.append((ext, b))
                continue
            if avant_s is None or dt <= avant_s:
                if dt > 0.02:
                    self.wait(dt)
                self.play(b.animate.set_opacity(1), run_time=0.2)
            else:
                reste.append((ext, b))
        self._a_reveler = reste

    def au_mot(self, extrait, n=1):
        if getattr(self, "_a_reveler", None):
            try:
                cible = self.t_mot(extrait, n)
            except ValueError:
                cible = None
            if cible is not None:
                self._reveler(cible)
        super().au_mot(extrait, n)

    def ligne_f(self, items, fs=44, buff=0.25):
        """Une ligne avec fractions (expression() du lot C, tout muet)."""
        return muet(expression(*items, fs=fs, buff=buff))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Placer une fraction", self.identite, self.ceinture, y_ech=-2.45)
        muet(ident)  # « Maths 6e — EleveAI » : le 6 n'est pas dit
        self.au_mot("Placer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        d = droite(0, 1, 4, {0: "0", 1: "1"}, longueur=6.0, centre=P(-1.2, -0.2), haut=1.9, bas=1.0)
        self.au_mot("demi-droite")
        self.play(FadeIn(d.fond), Create(d.dr.axe), *[Create(t) for t in d.dr.ticks.values()], Create(d.entiers),
                  FadeIn(VGroup(*d.dr.etiquettes.values())), run_time=0.9)
        f = frac(3, 4, fs=72, couleur=JAUNE_TITRE)
        q = muet(self.t("?", 90, AMBRE))
        VGroup(f, q).arrange(RIGHT, buff=0.35).move_to(P(4.75, -0.4))
        ou = self.t("Où se trouve", 36, BLEU_CALCUL).next_to(VGroup(f, q), UP, buff=0.3).set_x(4.75)
        self.au_mot("où se trouve")
        self.play(FadeIn(ou, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("3 quarts")
        self.play(FadeIn(f, scale=1.3), FadeIn(q, scale=0.5), run_time=0.5)
        self.insister(VGroup(f, q), 1.25, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Chloé, pâtissière, et sa recette ───────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = chloe(1.05).move_to(P(-5.4, -0.6))
        self.au_mot("Voici Chloé")
        nom = self.t("Chloé", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("pâtissière")
        met = self.t("pâtissière", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=UP * 0.15), run_time=0.4)
        # la fiche de la recette (fond crème, encre nuit)
        t1 = Text("Crêpes", font_size=36, color=NUIT, weight=BOLD, font="Arial")
        l1 = muet(Text("Lait :", font_size=36, color=NUIT, font="Arial"))
        f = frac(3, 4, fs=44, couleur=NUIT, police="Arial", gras=True)
        lt = muet(Text("L", font_size=36, color=NUIT, font="Arial"))
        lg = VGroup(l1, f, lt).arrange(RIGHT, buff=0.2)
        corps = VGroup(t1, lg).arrange(DOWN, buff=0.3)
        fiche = RoundedRectangle(width=corps.width + 0.9, height=corps.height + 0.6, corner_radius=0.2,
                                 fill_color=CREME, fill_opacity=1, stroke_color="#d97706", stroke_width=3)
        VGroup(fiche, corps).move_to(P(-1.5, 1.35))
        corps.move_to(fiche)
        pile = VGroup(*[Ellipse(width=1.5, height=0.32, fill_color="#f6c56b", fill_opacity=1,
                                stroke_color="#b45309", stroke_width=3).move_to(P(-1.5, -0.55 + 0.13 * k))
                        for k in range(4)])
        assiette = Ellipse(width=2.1, height=0.42, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8",
                           stroke_width=3).move_to(P(-1.5, -0.68))
        self.au_mot("crêpes")
        self.play(FadeIn(fiche, shift=DOWN * 0.2), FadeIn(t1), FadeIn(assiette), LaggedStart(
            *[FadeIn(c, shift=DOWN * 0.3) for c in pile], lag_ratio=0.2), run_time=0.8)
        self.au_mot("Sa recette")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("3 quarts")
        self.play(FadeIn(f, scale=1.3), FadeIn(lt), run_time=0.4)
        self.insister(f, 1.3, 0.25)
        v = verre_doseur(h=3.2, w=1.35).move_to(P(3.0, 0.1))
        self.au_mot("verre doseur")
        self.play(FadeIn(v, shift=UP * 0.2), run_time=0.6)
        self.au_mot("gradué en quarts")
        self.play(LaggedStart(*[Indicate(e, color=AMBRE, scale_factor=1.3) for e in v.etiq], lag_ratio=0.2),
                  run_time=1.0)
        self.au_mot("Jusqu'où")
        q = self.t("Jusqu'où verser ?", 44, ORANGE_RETENUE).move_to(P(-0.6, -2.3))
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.attendre_voix()

    # ── 02 : on couche le verre : il devient une demi-droite ────────────────
    def droite_quarts(self, centre=P(-1.3, 0.9), longueur=8.0):
        return droite(0, 1, 4, {0: "0", 1: "1"}, longueur=longueur, centre=centre)

    def ecran_coucher(self):
        self.ecran("02-coucher")
        v = verre_doseur(h=3.2, w=1.35).move_to(P(-4.1, 0.2))  # couché, il reste à 3 % du bord
        self.add(v)
        d = self.droite_quarts()
        self.au_mot("Couchons")
        self.play(FadeOut(v.etiq), run_time=0.3)
        self.play(Rotate(VGroup(v.parois, v.marques, v.lait), -PI / 2), run_time=1.0)
        self.au_mot("deviennent")
        corps = VGroup(*d.dr.ticks.values())
        self.play(FadeIn(d.fond), ReplacementTransform(VGroup(v.parois, v.marques), corps), Create(d.dr.axe),
                  FadeOut(v.lait),
                  Create(d.entiers), run_time=1.0)
        self.au_mot("Le fond")
        self.play(FadeIn(d.dr.etiquettes[0], scale=1.5), Indicate(d.dr.ticks[0], color=AMBRE, scale_factor=1.6),
                  run_time=0.5)
        self.au_mot("Le haut")
        self.play(FadeIn(d.dr.etiquettes[1], scale=1.5), Indicate(d.dr.ticks[4], color=AMBRE, scale_factor=1.6),
                  run_time=0.5)
        self.au_mot("1 litre")
        l1 = self.t("1 = 1 litre", 40).move_to(P(-1.3, -1.25))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("4 parts")
        parts = VGroup(*[part(d, k / 4, (k + 1) / 4, PART_A if k % 2 == 0 else PART_B) for k in range(4)])
        l2 = self.t("4 parts égales", 44, PART_A).move_to(P(-1.3, -2.25))
        self.play(LaggedStart(*[Create(p) for p in parts], lag_ratio=0.3), FadeIn(l2, shift=UP * 0.15),
                  run_time=1.0)
        self.attendre_voix()

    # ── 03 : le dénominateur ────────────────────────────────────────────────
    def grande_34(self):
        return frac(3, 4, fs=120).move_to(P(4.85, 1.15))

    def ecran_denominateur(self):
        self.ecran("03-denominateur")
        d = self.droite_quarts()
        self.add(d)
        f = self.grande_34()
        self.au_mot("Dans 3 quarts")
        self.play(FadeIn(f, scale=1.3), run_time=0.45)
        self.au_mot("le 4")
        self.play(f.den.animate.set_color(AMBRE), run_time=0.3)
        self.insister(f.den, 1.4, 0.25)
        self.au_mot("dénominateur")
        l1 = self.ligne([("4, en bas :", AMBRE), ("le dénominateur", WHITE)], 40).move_to(P(-1.3, -1.2))
        l1[0]._pas_audit = l1[0].sans_synchro = True  # le 4 vient d'être dit (« regarde le 4 »)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("en combien")
        l2 = self.t("en combien de parts égales on coupe l'unité", 32).move_to(P(-1.3, -2.0))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.45)
        self.au_mot("Ici, 4 parts")
        parts = VGroup(*[part(d, k / 4, (k + 1) / 4, PART_A if k % 2 == 0 else PART_B) for k in range(4)])
        self.play(LaggedStart(*[Create(p) for p in parts], lag_ratio=0.25), Indicate(f.den, color=AMBRE),
                  run_time=0.9)
        self.au_mot("Chaque saut")
        ss = [saut(d, k / 4, (k + 1) / 4) for k in range(4)]
        self.play(FadeOut(parts), LaggedStart(*[Create(s) for s in ss], lag_ratio=0.25), run_time=1.0)
        self.au_mot("1 quart")
        quarts = VGroup(*[frac(1, 4, fs=26, couleur=SAUT, police="Arial", gras=True).next_to(s, UP, buff=0.06)
                          for s in ss])
        l3 = VGroup(self.t("1 saut =", 44, SAUT), frac(1, 4, fs=48, couleur=SAUT)).arrange(RIGHT, buff=0.25)
        l3.move_to(P(-1.3, -2.95))
        self.play(LaggedStart(*[FadeIn(q, shift=DOWN * 0.1) for q in quarts], lag_ratio=0.15),
                  FadeIn(l3, shift=UP * 0.15), run_time=0.7)
        self.attendre_voix()

    # ── 04 : le numérateur (et le lait qui monte) ───────────────────────────
    def ecran_numerateur(self):
        self.ecran("04-numerateur")
        d = self.droite_quarts()
        f = self.grande_34()
        f.den.set_color(AMBRE)
        f.scale(0.8).move_to(P(4.85, 1.75))
        v = verre_doseur(h=2.4, w=1.0, fs=24).move_to(P(4.4, -1.6))
        self.add(d, f, v)
        self.au_mot("Le 3")
        self.play(f.num.animate.set_color(SAUT), run_time=0.3)
        self.insister(f.num, 1.4, 0.25)
        self.au_mot("numérateur")
        l1 = self.ligne([("3, en haut :", SAUT), ("le numérateur", WHITE)], 40).move_to(P(-1.3, -1.2))
        l1[0]._pas_audit = l1[0].sans_synchro = True
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        l2 = self.par_morceaux(self.t("combien de sauts depuis 0", 38), [(14, "depuis 0")]).move_to(P(-1.3, -2.0))
        self.au_mot("combien de sauts")
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("depuis 0")  # la suite « depuis 0 » s'allume ici
        self.play(Indicate(d.dr.etiquettes[0], color=SAUT, scale_factor=1.6), run_time=0.5)
        ss = sauts(d, 0, 3, 0.25)
        for k, mot in enumerate(["1 saut", "2 sauts", "3 sauts"]):
            self.au_mot(mot)
            self.play(Create(ss[k].arc), FadeIn(ss[k].num, scale=1.4), niveau(v, k + 1, 0.5), run_time=0.5)
        self.au_mot("on est sur")
        pt = point(d, 0.75, 3, 4, haut=1.0)
        self.play(FadeIn(pt, shift=DOWN * 0.2), run_time=0.45)
        self.insister(pt[2], 1.3, 0.25)
        self.au_mot("Chloé verse")
        self.play(Circumscribe(VGroup(v.lait, v.etiq[2]), color=VERT_OK, buff=0.12), run_time=0.9)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (cinquièmes : le point sur le 2e trait) ─────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        d = droite(0, 1, 5, {0: "0", 1: "1"}, longueur=5.0, centre=P(-3.4, 0.0))
        pt = point(d, 0.4, haut=0.95)
        self.add(d, pt)

        def apres(sc):
            ss = sauts(d, 0, 2, 0.2)
            sc.au_mot("On compte")
            sc.play(Create(ss[0].arc), FadeIn(ss[0].num, scale=1.4), run_time=0.4)
            sc.play(Create(ss[1].arc), FadeIn(ss[1].num, scale=1.4), run_time=0.4)
            sc.au_mot("2 sauts")
            e = frac(2, 5, fs=34, couleur=BLEU_POINT, police="Arial", gras=True).next_to(pt[1], UP, buff=0.12)
            sc.rep(0, avec=[FadeIn(e, scale=1.3)])
            sc.au_mot("Le trait de 0")
            sc.rep(1, avec=[Circumscribe(d.dr.ticks[0], color=ROUGE_ERREUR, buff=0.12)])
            sc.rep_fin()

        self.question_pause("05-question", "05b-reponse",
                            ["L'unité est coupée en 5.", "Le point est sur le 2e trait",
                             "après 0 : son abscisse ?"],
                            [self.choix("3/5"), self.choix("2/5"), self.choix("2")], 1,
                            ["On compte 2 sauts depuis 0.", "Le trait de 0 ne compte pas."], mot_q="Ici",
                            autres_r=apres)

    # ── 06 : sept quarts (plus grand que 1) ─────────────────────────────────
    def droite_02(self, centre=P(-0.5, 1.15), longueur=10.0):
        return droite(0, 2, 8, {0: "0", 1: "1", 2: "2"}, longueur=longueur, centre=centre, haut=2.1)

    def ecran_sept_quarts(self):
        self.ecran("06-sept-quarts")
        d = self.droite_02()
        v1 = verre_doseur(h=1.9, w=0.9, etiquettes=False).move_to(P(-5.6, -1.95))
        v2 = verre_doseur(h=1.9, w=0.9, etiquettes=False).move_to(P(-4.2, -1.95))
        self.au_mot("Pour la fête")
        self.play(FadeIn(d), FadeIn(v1), FadeIn(v2), run_time=0.6)
        self.au_mot("Il lui faut")
        l0 = VGroup(muet(self.t("Lait :", 42)), frac(7, 4, fs=42), muet(self.t("L", 42))).arrange(RIGHT, buff=0.2)
        l0.move_to(P(-0.4, -0.62))
        self.play(FadeIn(l0[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("7 quarts")
        self.play(FadeIn(l0[1], scale=1.3), FadeIn(l0[2]), run_time=0.4)
        ss = sauts(d, 0, 7, 0.25)
        self.au_mot("4 sauts")
        self.play(LaggedStart(*[AnimationGroup(Create(s.arc), FadeIn(s.num, scale=1.4)) for s in ss[:4]],
                              lag_ratio=0.3), niveau(v1, 4, 1.2), run_time=1.3)
        self.au_mot("pile sur 1")
        self.play(Indicate(d.dr.etiquettes[1], color=SAUT, scale_factor=1.7), run_time=0.6)
        self.au_mot("4 quarts égale")
        l1 = self.ligne_f([(4, 4), "=", "1"], fs=40).move_to(P(-0.4, -1.65))
        self.play(FadeIn(l1[0], scale=1.3), run_time=0.3)
        self.au_mot("1. Encore")
        self.play(FadeIn(l1[1:], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("Encore 3 sauts")
        self.play(LaggedStart(*[AnimationGroup(Create(s.arc), FadeIn(s.num, scale=1.4)) for s in ss[4:]],
                              lag_ratio=0.3), niveau(v2, 3, 1.0), run_time=1.0)
        self.au_mot("7 quarts", n=2)
        pt = point(d, 1.75, 7, 4, haut=1.0)
        self.play(FadeIn(pt, shift=DOWN * 0.2), run_time=0.4)
        self.insister(pt[2], 1.3, 0.25)
        l2 = self.ligne_f([(7, 4), "=", "1", "+", (3, 4, VERT_OK)], fs=40).move_to(P(-0.4, -2.82))
        self.au_mot("7 quarts", n=3)
        self.play(FadeIn(l2[0], scale=1.3), run_time=0.35)
        self.au_mot("1 plus")
        self.play(FadeIn(l2[1:4], shift=RIGHT * 0.2), Indicate(v1, color=VERT_OK, scale_factor=1.08), run_time=0.4)
        self.au_mot("3 quarts")
        self.play(FadeIn(l2[4], scale=1.3), Indicate(v2.lait, color=VERT_OK), run_time=0.4)
        self.play(Create(self.encadrer(l2, buff=0.12)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (9/4 : entre quels entiers ?) ───────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        d = droite(0, 3, 12, {0: "0", 1: "1", 2: "2", 3: "3"}, longueur=5.2, centre=P(-3.5, 0.0), fs=30,
                   haut=1.5)
        self.add(d)
        f = frac(9, 4, fs=60, couleur=JAUNE_TITRE).move_to(P(-3.5, 2.55))

        def avant(sc):
            l0, l1 = sc.q_q[0], sc.q_q[1]
            sc.play(FadeIn(l0, shift=UP * 0.15), run_time=0.35)
            sc.au_mot("9 quarts")
            sc.play(FadeIn(l1, shift=UP * 0.15), FadeIn(f, scale=1.3), run_time=0.4)
            sc.q_q.remove(l0, l1)

        def apres(sc):
            # « 8 quarts font 2. » : le 2 se dit 0,74 s après le 8 -> la suite au mot
            sc.par_morceaux(sc.ph_q[1], [(11, "2. Et")])
            sc.au_mot("4 quarts font 1")
            sc.rep(0, avec=[Create(part(d, 0, 1, PART_A, 10)), Indicate(d.dr.etiquettes[1], color=SAUT,
                                                                           scale_factor=1.6)])
            sc.au_mot("8 quarts")
            sc.rep(1, avec=[Create(part(d, 1, 2, PART_B, 10)), Indicate(d.dr.etiquettes[2], color=SAUT,
                                                                           scale_factor=1.6)])
            sc.au_mot("Et 9 quarts")
            pt = point(d, 2.25, haut=0.6)
            s = saut(d, 2, 2.25)
            sc.rep(2, avec=[Create(s), FadeIn(pt, scale=0.6)])
            sc.rep_fin()

        self.question_pause("07-question", "07b-reponse",
                            ["Entre quels nombres entiers", "se place 9/4 ?"],
                            [self.par_morceaux(self.t("entre 0 et 1", 34), [(0, "entre 0 et 1"), (5, "0 et 1"), (6, "1. B")]), self.choix("entre 9 et 10", 34), self.choix("entre 2 et 3", 34)], 2,
                            ["4 quarts font 1,", "8 quarts font 2.", "9 quarts = 2 + 1 quart."], mot_q="Entre",
                            avant_q=avant, autres_r=apres)

    # ── 08 : le piège : compter les traits ──────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR).move_to(P(-0.6, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        d = self.droite_quarts(centre=P(-0.6, 0.2))
        self.add(d)
        self.au_mot("On compte les sauts")
        l1 = self.t("On compte les sauts, pas les traits.", 40, JAUNE_TITRE).move_to(P(-0.6, -1.2))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Si je compte")
        rouges = VGroup(*[muet(texte(str(k + 1), 30, color=ROUGE_COACH)).move_to(d.p(k / 4) + UP * 0.55)
                          for k in range(4)])
        self.play(LaggedStart(*[FadeIn(r, scale=1.5) for r in rouges], lag_ratio=0.35),
                  Indicate(d.dr.ticks[0], color=ROUGE_COACH, scale_factor=1.6), run_time=1.4)
        self.au_mot("j'en trouve 4")
        l2 = self.t("4 traits jusqu'à", 38, ROUGE_ERREUR)
        l2b = frac(3, 4, fs=40, couleur=ROUGE_ERREUR)
        lg2 = VGroup(l2, l2b).arrange(RIGHT, buff=0.2).move_to(P(-0.6, -2.2))
        self.play(FadeIn(l2, shift=UP * 0.15), Indicate(rouges[3], color=ROUGE_COACH, scale_factor=1.6),
                  run_time=0.4)
        self.au_mot("3 quarts")
        self.play(FadeIn(l2b, scale=1.3), run_time=0.3)
        self.au_mot("Faux")
        cx = croix(rouges, sw=6)
        self.play(Create(cx), Create(croix(lg2, sw=6)), run_time=0.4)
        self.au_mot("Depuis 0")
        ss = sauts(d, 0, 3, 0.25)
        for s in ss:
            s.arc.set_color(VERT_CARTE)
            s.num.set_color(VERT_CARTE)
        self.play(FadeOut(rouges), FadeOut(cx), LaggedStart(*[AnimationGroup(Create(s.arc), FadeIn(s.num, scale=1.4))
                                                 for s in ss], lag_ratio=0.3), run_time=1.0)
        self.au_mot("3 sauts")
        l3 = self.t("Il y a 3 sauts.", 42, VERT_OK).move_to(P(-0.6, -3.15))
        self.play(FadeIn(l3, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 09 : les dixièmes (fraction au-dessus, décimal dessous) ─────────────
    def ecran_dixiemes(self):
        self.ecran("09-dixiemes")
        d = droite(0, 1, 10, {0: "0", 1: "1"}, longueur=10.0, centre=P(-0.5, 1.0), haut=2.0, bas=1.25)
        self.au_mot("Et si")
        self.play(FadeIn(d.fond), Create(d.dr.axe), Create(d.entiers), FadeIn(VGroup(*d.dr.etiquettes.values())),
                  run_time=0.6)
        self.au_mot("coupée en 10")
        l1 = self.t("10 parts égales", 40, PART_A).move_to(P(-0.5, -0.8))
        self.play(LaggedStart(*[Create(d.dr.ticks[i]) for i in range(1, 10)], lag_ratio=0.1),
                  FadeIn(l1, shift=UP * 0.15), run_time=0.9)
        self.au_mot("Même geste")
        s1 = saut(d, 0, 0.1)
        self.play(Create(s1), run_time=0.5)
        self.au_mot("1 dixième")
        l2 = VGroup(self.t("1 saut =", 40, SAUT), frac(1, 10, fs=44, couleur=SAUT)).arrange(RIGHT, buff=0.25)
        l2.move_to(P(-0.5, -1.8))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("7 sauts")
        ss = [saut(d, k / 10, (k + 1) / 10) for k in range(1, 7)]
        self.play(LaggedStart(*[Create(x) for x in ss], lag_ratio=0.25), run_time=1.0)
        self.au_mot("7 dixièmes")
        pt = point(d, 0.7, 7, 10, haut=0.8)
        self.play(FadeIn(pt, shift=DOWN * 0.2), run_time=0.4)
        self.insister(pt[2], 1.3, 0.25)
        self.au_mot("0,7")
        dec = decimal_sous(d, 0.7, "0,7", fs=38)
        self.play(FadeIn(dec, scale=1.4), run_time=0.4)
        self.au_mot("La fraction au-dessus")
        self.play(Indicate(pt[2], color=AMBRE, scale_factor=1.3), run_time=0.5)
        self.au_mot("le décimal en dessous")
        self.play(Indicate(dec, color=AMBRE, scale_factor=1.4), run_time=0.5)
        self.au_mot("le même point")
        lg = self.ligne_f([(7, 10), "=", "0,7"], fs=44).move_to(P(-0.5, -2.45))
        self.play(Create(lien(d, 0.7, haut=0.75)), FadeIn(lg, scale=1.2), FadeOut(l2), run_time=0.5)
        self.play(Create(self.encadrer(lg)), run_time=0.4)
        self.attendre_voix()

    # ── 10 : QUESTION 3 (droite en dixièmes : 3 quarts au 3e trait ?) ───────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        d = droite(0, 1, 10, {0: "0", 1: "1"}, longueur=5.2, centre=P(-3.2, 0.0), fs=30, haut=1.9)
        pt = point(d, 0.3, haut=0.75)
        self.add(d, pt)

        def apres(sc):
            ss = sauts(d, 0, 3, 0.1, fs=26)
            e = frac(3, 10, fs=30, couleur=BLEU_POINT, police="Arial", gras=True).next_to(pt[1], UP, buff=0.1)
            sc.play(FadeIn(e, scale=1.3), run_time=0.35)
            sc.au_mot("Ici")
            sc.rep(0, avec=[LaggedStart(*[AnimationGroup(Create(x.arc), FadeIn(x.num)) for x in ss],
                                        lag_ratio=0.3)])
            sc.au_mot("3 quarts n'est")
            sc.rep(1, avec=[Indicate(sc.cartes_q[0], color=ROUGE_ERREUR, scale_factor=1.04)])
            sc.rep_fin()

        self.question_pause("10-question", "10b-reponse",
                            ["Sur cette droite graduée", "en dixièmes, quel nombre",
                             "est au 3e trait après 0 ?"],
                            [self.choix("3/4"), self.choix("3/10"), self.choix("3")], 1,
                            ["Ici, chaque saut vaut 1 dixième.", "3 quarts n'est pas là !"], mot_q="Sur cette",
                            autres_r=apres)

    # ── 11 : défi (5/3 L de lait) ───────────────────────────────────────────
    def droite_defi(self):
        return droite(0, 2, 6, {0: "0", 1: "1", 2: "2"}, longueur=8.0, centre=P(-1.0, 0.45), haut=2.1)

    def ecran_defi(self):
        self.ecran("11-defi", 0.65)
        self.au_mot("Ton défi")
        tit = self.t("Ton défi !", 50, JAUNE_TITRE).move_to(P(-1.0, 3.1))
        self.play(Write(tit), run_time=0.6)
        self.au_mot("Une autre recette")
        l1 = VGroup(muet(self.t("Une autre recette :", 38)), frac(5, 3, fs=44), muet(self.t("L de lait", 38)))
        l1.arrange(RIGHT, buff=0.2).move_to(P(-1.0, -1.4))
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("5 tiers")
        self.play(FadeIn(l1[1], scale=1.3), FadeIn(l1[2]), run_time=0.4)
        d = self.droite_defi()
        self.au_mot("Sur cette droite")
        self.play(FadeIn(d, shift=UP * 0.2), run_time=0.6)
        self.au_mot("coupée en 3")
        self.play(LaggedStart(*[Create(part(d, k / 3, (k + 1) / 3, PART_A if k % 2 == 0 else PART_B, 10))
                                for k in range(3)], lag_ratio=0.3), run_time=0.8)
        self.au_mot("Place 5 tiers")
        l2 = VGroup(muet(self.t("Place", 40, ORANGE_RETENUE)), frac(5, 3, fs=44, couleur=ORANGE_RETENUE),
                    muet(self.t("!", 40, ORANGE_RETENUE))).arrange(RIGHT, buff=0.2).move_to(P(-1.0, -2.45))
        self.play(FadeIn(l2, scale=1.1), run_time=0.4)
        self.pause_defi(y=-3.25)

    def ecran_correction(self):
        self.ecran("11b-correction", 0.65)
        d = self.droite_defi()
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-1.0, 3.1))
        self.add(d)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Le dénominateur 3")
        l1 = self.ligne([("dénominateur 3 :", AMBRE), ("l'unité coupée en 3", WHITE)], 36).move_to(P(-1.0, -1.1))
        self.par_morceaux(l1[1], [(7, "coupée en 3")])
        self.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("l'unité est")
        self.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
        self.au_mot("coupée en 3")  # « coupée en 3 » s'allume ici
        self.play(*[Indicate(d.dr.ticks[i], color=SAUT, scale_factor=1.6)
                                                    for i in (1, 2)], run_time=0.5)
        self.au_mot("Le numérateur 5")
        l2 = self.ligne([("numérateur 5 :", SAUT), ("5 sauts depuis 0", WHITE)], 36).move_to(P(-1.0, -1.85))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        ss = sauts(d, 0, 5, 1 / 3)
        self.au_mot("3 sauts, on")
        self.play(LaggedStart(*[AnimationGroup(Create(s.arc), FadeIn(s.num, scale=1.4)) for s in ss[:3]],
                              lag_ratio=0.3), run_time=0.9)
        self.au_mot("sur 1")
        self.play(Indicate(d.dr.etiquettes[1], color=SAUT, scale_factor=1.7), run_time=0.5)
        self.au_mot("Encore 2 sauts")
        self.play(LaggedStart(*[AnimationGroup(Create(s.arc), FadeIn(s.num, scale=1.4)) for s in ss[3:]],
                              lag_ratio=0.3), run_time=0.7)
        l3 = self.ligne_f([(5, 3), "=", "1", "+", (2, 3, VERT_OK)], fs=44).move_to(P(-2.6, -2.85))
        self.au_mot("5 tiers égale")
        pt = point(d, 5 / 3, 5, 3, haut=1.0)
        self.play(FadeIn(pt, shift=DOWN * 0.2), FadeIn(l3[0], scale=1.3), run_time=0.4)
        self.au_mot("1 plus")
        self.play(FadeIn(l3[1:4], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("2 tiers")
        self.play(FadeIn(l3[4], scale=1.3), run_time=0.35)
        self.au_mot("entre 1 et 2")
        l4 = self.t("entre 1 et 2", 40, VERT_OK).next_to(l3, RIGHT, buff=0.6)
        self.play(FadeIn(l4, shift=RIGHT * 0.2), Create(part(d, 1, 2, VERT_OK, 10)), run_time=0.45)
        self.insister(pt[2], 1.3, 0.25)
        self.attendre_voix()

    # ── 12 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("12-finale", 0.65)
        d = droite(0, 2, 8, {0: "0", 1: "1", 2: "2"}, longueur=6.0, centre=ORIGIN, fs=30, haut=1.9)
        fig = VGroup(d, *[s for s in sauts(d, 0, 7, 0.25, fs=22)], point(d, 1.75, 7, 4, haut=1.0, fs=30))
        self.add(fig)
        self.XL = -1.0  # la figure plus étroite : les lignes gardent une taille lisible
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Le dénominateur : en combien", "de parts égales on coupe l'unité."),
            ("Le numérateur : combien", "de sauts depuis 0."),
            ("On compte les sauts,", "pas les traits."),
            ("7/4 = 1 + 3/4 :", "entre 1 et 2.")], fs=34)
        self.au_mot("Le dénominateur")
        self.montrer_ligne(lignes[0])
        self.au_mot("Le numérateur")
        self.montrer_ligne(lignes[1])
        self.au_mot("On compte")
        self.montrer_ligne(lignes[2])
        self.au_mot("7 quarts")
        self.montrer_ligne(lignes[3], Indicate(fig[-1], color=VERT_OK))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_coucher()
        self.ecran_denominateur()
        self.ecran_numerateur()
        self.ecran_question1()
        self.ecran_sept_quarts()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_dixiemes()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("13-abonne")


class DemiDroiteFraction6e(DemiDroiteFractionBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "orange"
