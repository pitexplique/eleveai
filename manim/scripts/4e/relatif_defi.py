# relatif_defi.py
# EleveAI — Maths 4e — série « Relatifs », épisode 07 : DÉFIS.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : relatif_operation_defi.
# Décor et métier : Lou, historienne des sciences. Centre : histoire-geographie.
# Un vieux cahier jauni sur un bureau, une loupe, un tampon FAUX. À l'écran d'histoire, les baguettes
# chinoises : rouges = positifs, noires = négatifs (étiquetées) ; le code de la série reprend ensuite.
# Écrans : garde (00) ; l'histoire (01) ; le cahier (02) ; 2e erreur (03) ; QUESTION 1 (03q) ;
# compter les moins (04) ; pair, impair (05) ; QUESTION 2 (05q) ; le nombre effacé (06) ;
# défi (07) et correction (07b) ; ce que tu as appris (08) ; fin (09).
# Voix : manim/voix/4e-relatif-defi.json ; marques : relatif_defi_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/relatif_defi.py RelatifDefi4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/relatif_defi.py RelatifDefi4e -o eleveai-maths-4e-relatif-defi --media_dir manim/scripts/4e/media-rel-07
# Sortie : manim/sorties/4e/maths/relatifs/07-defi/eleveai-maths-4e-relatif-defi.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403

PAPIER = "#e9dcab"
PAPIER_BORD = "#a8894f"
TACHE = "#c9ad6e"
BOIS = "#5b3a1e"
BOIS_CLAIR = "#74502c"
INK = "#33230f"
INK_NEG = "#c2410c"
INK_OK = "#15803d"
ROUGE_T = "#dc2626"
ROUGE_B = "#dc2626"
NOIR_B = "#111827"
LAITON = "#d6b15e"
SURLIGNE = "#fde047"


def Fr(s, fs=56, c=WHITE, audit=True):
    """Une formule ou une phrase : tout nombre négatif est orange, où qu'il soit dans la ligne."""
    e = E(s, fs, c, lettres="", audit=audit)
    a = e.atomes
    for i, x in enumerate(a):
        if x.original_text == "−" and i + 1 < len(a) and (i == 0 or not (a[i - 1].original_text.isdigit() or a[i - 1].original_text == ")")):
            x.set_color(NEG)
            a[i + 1].set_color(NEG)
    return e


def lr(s, x, y, fs=36, c=WHITE, maxw=None):
    """Une ligne de Fr, posée en (x, y), bornée à maxw."""
    e = Fr(s, fs, c)
    if maxw and e.width > maxw:
        e.scale_to_fit_width(maxw)
    return e.move_to(P(x, y))


def Fi(s, fs=44, audit=True):
    """Une ligne à l'encre, SUR le cahier : brun foncé, les négatifs en orange brûlé (lisible sur le jaune)."""
    e = E(s, fs, INK, lettres="", audit=audit)
    a = e.atomes
    for i, x in enumerate(a):
        if x.original_text == "−" and i + 1 < len(a) and (i == 0 or not (a[i - 1].original_text.isdigit() or a[i - 1].original_text == ")")):
            x.set_color(INK_NEG)
            a[i + 1].set_color(INK_NEG)
    return e


def ix(e, mot, n=1):
    """L'indice du n-ième atome `mot` de la ligne e."""
    k = [i for i, a in enumerate(e.atomes) if a.original_text == mot]
    return k[n - 1]


def moins_de(e):
    """Les atomes « − » d'une formule, dans l'ordre."""
    return [a for a in e.atomes if a.original_text == "−"]


def surligne(atomes, c=SURLIGNE, mx=0.04, my=0.1, fond=0.32):
    """Le surlignage d'un signe : un cadre teinté autour de lui."""
    g = VGroup(*atomes)
    return RoundedRectangle(width=g.width + 2 * mx, height=max(g.height, 0.1) + 2 * my, corner_radius=0.07, stroke_color=c, stroke_width=3,
                            fill_color=c, fill_opacity=fond).move_to(g)


def couple(atomes, c=POS, mx=0.1, my=0.13):
    """Le cadre qui regroupe deux facteurs : leurs deux moins font un plus."""
    g = VGroup(*atomes)
    return RoundedRectangle(width=g.width + 2 * mx, height=g.height + 2 * my, corner_radius=0.14, stroke_color=c, stroke_width=4).move_to(g)


def croix(centre, t=0.16, sw=7):
    o = np.array(centre)
    return VGroup(Line(o + P(-t, t), o + P(t, -t)), Line(o + P(-t, -t), o + P(t, t))).set_stroke(ROUGE_T, sw)


def loupe(s=1.0):
    """La loupe : .lentille est le rond à poser sur le signe."""
    lentille = Circle(radius=0.34, stroke_color=LAITON, stroke_width=7, fill_color="#ffffff", fill_opacity=0.12)
    manche = Line(lentille.point_at_angle(-PI / 4), lentille.point_at_angle(-PI / 4) + P(0.42, -0.42), color=BOIS_CLAIR, stroke_width=13)
    g = VGroup(manche, lentille)
    g.lentille = lentille
    return g.scale(s)


def lou(s=0.72):
    """Lou : les lunettes, le gilet et la loupe de l'historienne des sciences, un vieux livre sous le bras."""
    p = personne(peau="#e0ac69", tenue="#a16207", cheveux="#6b3f1d", longs=True, s=1.0)
    lun = lunettes(p)
    livre = VGroup(Rectangle(width=0.62, height=0.82, fill_color="#7c2d12", fill_opacity=1, stroke_color=PAPIER, stroke_width=2),
                   Rectangle(width=0.36, height=0.05, fill_color=PAPIER, fill_opacity=1, stroke_width=0).shift(UP * 0.2)).move_to(p.corps.get_center() + P(-0.22, -0.05))
    l = loupe(0.85).move_to(p.corps.get_center() + P(0.56, 0.05))
    return VGroup(p, lun, livre, l).scale(s)


class Cahier(VGroup):
    """Le vieux cahier jauni : page tachée, lignes passées, marge rouge, reliure à gauche. .pos(dx, dy) : un point de la page."""

    def __init__(self, w=5.5, h=4.2, centre=ORIGIN, griffonne=False, **kw):
        super().__init__(**kw)
        self.page = RoundedRectangle(width=w, height=h, corner_radius=0.06, fill_color=PAPIER, fill_opacity=1, stroke_color=PAPIER_BORD, stroke_width=3)
        self.taches = VGroup(*[Circle(radius=r, fill_color=TACHE, fill_opacity=0.5, stroke_width=0).move_to(P(fx * w / 2, fy * h / 2))
                               for fx, fy, r in ((0.72, 0.72, 0.28), (-0.55, -0.68, 0.36), (0.45, -0.72, 0.16), (-0.3, 0.78, 0.13))])
        n = max(3, int(h / 0.62))
        self.lignes = VGroup(*[Line(P(-w / 2 + 0.3, h / 2 - (i + 0.8) * h / (n + 0.6)), P(w / 2 - 0.08, h / 2 - (i + 0.8) * h / (n + 0.6)), color="#b9a56f", stroke_width=1.5) for i in range(n)])
        self.marge = Line(P(-w / 2 + 0.62, h / 2 - 0.04), P(-w / 2 + 0.62, -h / 2 + 0.04), color="#d98d7a", stroke_width=2)
        self.dos = Rectangle(width=0.26, height=h, fill_color="#7c2d12", fill_opacity=1, stroke_width=0).move_to(P(-w / 2 + 0.13, 0))
        self.coutures = VGroup(*[Line(P(-w / 2 + 0.13, y - 0.07), P(-w / 2 + 0.13, y + 0.07), color=PAPIER, stroke_width=3) for y in np.linspace(-h / 2 + 0.3, h / 2 - 0.3, 5)])
        self.add(self.page, self.taches, self.lignes, self.marge, self.dos, self.coutures)
        if griffonne:  # des lignes d'écriture illisibles : la garde ne montre aucun nombre
            g = VGroup()
            for i, l in enumerate(self.lignes):
                y = l.get_center()[1] + 0.13
                x = -w / 2 + 0.85
                for k in range(3 + (i % 2)):
                    d = 0.42 + 0.22 * ((i + 2 * k) % 3)
                    if x + d > w / 2 - 0.2:
                        break
                    g.add(Line(P(x, y), P(x + d, y + 0.02 * ((-1) ** k)), color=INK, stroke_width=4))
                    x += d + 0.16
            self.griffes = g
            self.add(g)
        self.w, self.h = w, h
        self.move_to(centre)

    def pos(self, dx, dy):
        return self.page.get_center() + P(dx, dy)

    def ecrire(self, e, dy, g=0.78, d=0.22):
        """Pose la ligne e entre la marge et le bord droit de la page, sans jamais en sortir."""
        zone = self.w - g - d
        if e.width > zone:
            e.scale_to_fit_width(zone)
        return e.move_to(self.pos((g - d) / 2, dy))


def bureau(w, h, centre):
    """Le dessus du bureau : du bois et son veinage."""
    plan = RoundedRectangle(width=w, height=h, corner_radius=0.12, fill_color=BOIS, fill_opacity=1, stroke_color=BOIS_CLAIR, stroke_width=3)
    veines = VGroup(*[Line(P(-w / 2 + 0.14, y), P(w / 2 - 0.14, y + 0.02), color=BOIS_CLAIR, stroke_width=2) for y in np.linspace(-h / 2 + 0.16, h / 2 - 0.16, 7)])
    return VGroup(plan, veines).move_to(centre)


def tampon_faux(k=1.0):
    """Le tampon rouge « FAUX », de travers."""
    t = T("FAUX", int(52 * k), ROUGE_T, audit=False, gras=True)
    c = RoundedRectangle(width=t.width + 0.44, height=t.height + 0.32, corner_radius=0.09, stroke_color=ROUGE_T, stroke_width=7)
    c2 = RoundedRectangle(width=t.width + 0.28, height=t.height + 0.16, corner_radius=0.06, stroke_color=ROUGE_T, stroke_width=2)
    return VGroup(c, c2, t).rotate(0.2)


def baguette(c, L=1.5, a=0.0):
    return RoundedRectangle(width=0.13, height=L, corner_radius=0.05, fill_color=c, fill_opacity=1, stroke_width=0).rotate(a)


def fagot(c, centre):
    """Cinq baguettes à calculer, posées à la main."""
    return VGroup(*[baguette(c, 1.5, a).move_to(np.array(centre) + P(dx, 0)) for dx, a in ((-0.56, -0.07), (-0.28, 0.05), (0, -0.03), (0.28, 0.06), (0.56, -0.05))])


class Planche(VGroup):
    """La planche à calculer chinoise : .rouges, .noires (les fagots), .et_r, .et_n (les étiquettes)."""

    def __init__(self, w=5.9, h=3.6, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.fond = RoundedRectangle(width=w, height=h, corner_radius=0.1, fill_color=PAPIER, fill_opacity=1, stroke_color=PAPIER_BORD, stroke_width=4)
        self.sep = Line(P(0, h / 2 - 0.68), P(0, -h / 2 + 0.1), color=PAPIER_BORD, stroke_width=3)
        self.haut = Line(P(-w / 2 + 0.05, h / 2 - 0.68), P(w / 2 - 0.05, h / 2 - 0.68), color=PAPIER_BORD, stroke_width=3)
        self.titre = T("Le code de l'époque", 30, INK, audit=False, gras=True).move_to(P(0, h / 2 - 0.34))
        self.rouges = fagot(ROUGE_B, P(-w / 4, 0.0))
        self.noires = fagot(NOIR_B, P(w / 4, 0.0))
        self.et_r = T("rouges : positifs", 23, "#b91c1c", audit=False, gras=True).move_to(P(-w / 4, -h / 2 + 0.4))
        self.et_n = T("noires : négatifs", 23, NOIR_B, audit=False, gras=True).move_to(P(w / 4, -h / 2 + 0.4))
        self.add(self.fond, self.sep, self.haut, self.titre)
        self.move_to(centre)
        d = np.array(centre)
        for m in (self.rouges, self.noires, self.et_r, self.et_n):
            m.shift(d)


def livre_ancien(w=3.6, h=1.9, centre=ORIGIN):
    """Le vieux livre d'Europe ouvert : un signe moins, et le point d'interrogation à côté."""
    g = Polygon(P(-w / 2, -h / 2), P(-w / 2 + 0.1, h / 2), P(0, h / 2 - 0.1), P(0, -h / 2 + 0.1), fill_color=PAPIER, fill_opacity=1, stroke_color=PAPIER_BORD, stroke_width=3)
    d = Polygon(P(w / 2, -h / 2), P(w / 2 - 0.1, h / 2), P(0, h / 2 - 0.1), P(0, -h / 2 + 0.1), fill_color=PAPIER, fill_opacity=1, stroke_color=PAPIER_BORD, stroke_width=3)
    c = Rectangle(width=w + 0.2, height=0.14, fill_color="#7c2d12", fill_opacity=1, stroke_width=0).move_to(P(0, -h / 2 - 0.03))
    m = T("−", 96, INK_NEG, audit=False, gras=True).move_to(P(-w / 4, 0.02))
    q = T("?", 96, ROUGE_T, audit=False, gras=True).move_to(P(w / 4, 0.02))
    return VGroup(c, g, d, m, q).move_to(centre)


def jeton_q(r=0.34, fs=48):
    """Le jeton du nombre effacé : on ne connaît pas encore son signe."""
    rond = Circle(radius=r, stroke_color=JAUNE_TITRE, stroke_width=5, fill_color=FOND_CARTE, fill_opacity=1)
    return VGroup(rond, T("?", fs, JAUNE_TITRE, audit=False, gras=True).move_to(rond))


def paires(n, r=0.17, fs=26):
    """n jetons « − », rangés deux par deux dans un cadre ; le dernier reste seul si n est impair."""
    gr = VGroup()
    for _ in range(n // 2):
        d = VGroup(signe("−", r, fs), signe("−", r, fs)).arrange(RIGHT, buff=0.06)
        gr.add(VGroup(couple([d], POS, 0.07, 0.07), d))
    if n % 2:
        gr.add(signe("−", r, fs))
    return gr.arrange(RIGHT, buff=0.14)


class RelatifDefi4e(PaysageRel):
    nom_voix = "4e-relatif-defi"
    fichier_marques = "relatif_defi_marques.json"
    ceinture = "verte"

    # ── outils de l'épisode ─────────────────────────────────────────────────
    def _carte_choix(self, lettre, txt, largeur, fs):
        """Des cartes plus larges que d'habitude : le choix A tient sur deux lignes lisibles."""
        return super()._carte_choix(lettre, txt, 6.0, fs)

    def _disposer_q(self, question, choix, phrase):
        """Quatre lignes de réponse : les cartes se resserrent pour leur laisser la place."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.93, about_point=cartes.get_corner(UL))
        pause.next_to(cartes, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        ph.scale_to_fit_width(5.6)
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        ph.next_to(cartes, DOWN, buff=0.16).align_to(P(self.XL, 0), LEFT)
        return tete, q, cartes, pause, rebours, ph

    def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="", couleur=WHITE):
        """La ligne i de la question, au mot : alignée à gauche, les négatifs en orange."""
        ref = self.q_q[i]
        e = Fr(s, fs or 34, couleur)
        e.scale_to_fit_height(ref.height)
        if e.width > ref.width:  # jamais plus large que la ligne prévue : le bord droit est tout près
            e.scale_to_fit_width(ref.width)
        e.move_to(ref).align_to(ref, LEFT)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        return e

    def frappe(self, tf, *autres):
        """Le tampon s'abat au mot « Faux ! »."""
        self.au("Faux !", FadeIn(tf, scale=2.6, rate_func=rush_into), *autres, rt=0.16)
        self.play(Flash(tf, color=ROUGE_T, line_length=0.24, num_lines=10, flash_radius=tf.width / 2 + 0.05), run_time=0.22)

    def loupe_sur(self, l, m, rt=0.25):
        """La loupe glisse jusqu'au mobject m."""
        cible = np.array(m if isinstance(m, np.ndarray) else m.get_center())
        return l.animate.shift(cible - l.lentille.get_center())

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les relatifs", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Défis", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        b = bureau(4.5, 3.2, P(-2.95, 0.45))
        c = Cahier(3.9, 2.7, P(-2.95, 0.45), griffonne=True)
        l = loupe(1.0)
        l.shift(c.pos(-0.9, 0.55) - l.lentille.get_center())
        p = lou(0.72).move_to(P(-5.98, -0.1)).set_z_index(2)
        self.play(FadeIn(b), FadeIn(c), FadeIn(p, shift=UP * 0.2), FadeIn(l), run_time=0.4)
        l1 = self.lg("Sauras-tu démasquer", 2.75, 0.85, 44, maxw=7.2)
        self.dit(l1, "Sauras-tu démasquer", avec=[self.loupe_sur(l, c.pos(0.5, -0.1))])
        l2 = self.lg("les erreurs ?", 2.75, 0.05, 56, JAUNE_TITRE, maxw=7.2)
        tf = tampon_faux(0.92).move_to(c.pos(0.5, -0.62))
        self.poser_avec(l2, "les erreurs ?", {ix(l2, "erreurs"): lambda: [FadeIn(tf, scale=2.6)]}, rt=0.18)
        self.insister(l2, 1.1, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'histoire ─────────────────────────────────────────────────────
    def ecran_histoire(self):
        self.ecran("01-histoire")
        p = lou(0.72).move_to(P(-5.75, 2.3))
        pl = Planche(w=6.1, h=3.75, centre=P(-3.3, -1.25))
        l1 = self.lg("Lou est historienne", 3.45, 3.05, 40, CIEL, maxw=6.0)
        self.dit(l1, "Lou est historienne", avec=[FadeIn(p, shift=UP * 0.3)])
        l2 = self.lg("des sciences.", 3.45, 2.45, 40, CIEL, maxw=6.0)
        self.dit(l2, "des sciences.")
        l3 = self.lg("Il y a 2 000 ans, en Chine,", 3.45, 1.65, 36, maxw=6.0)
        self.dit(l3, "Il y a 2 000 ans, en Chine,", avec=[FadeIn(pl)])
        l4 = self.lg("on calculait déjà", 3.45, 1.05, 36, maxw=6.0)
        self.dit(l4, "on calculait déjà")
        l5 = self.lg("avec des baguettes :", 3.45, 0.45, 36, JAUNE_TITRE, maxw=6.0)
        self.dit(l5, "avec des baguettes :")
        # ⚠️ le code d'époque : rouge = positif, noir = négatif, le contraire de la série. Étiqueté à l'image.
        l6 = self.lg("rouges pour les positifs,", 3.45, -0.35, 36, maxw=6.0)
        l6.atomes[0].set_color("#f87171")
        self.dit(l6, "rouges pour les positifs,", avec=[LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in pl.rouges], lag_ratio=0.15), FadeIn(pl.et_r)], rt=0.3)
        l7 = self.lg("noires pour les négatifs.", 3.45, -0.95, 36, maxw=6.0)
        self.dit(l7, "noires pour les négatifs.", avec=[LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in pl.noires], lag_ratio=0.15), FadeIn(pl.et_n)], rt=0.3)
        vieux = VGroup(l1, l2, l3, l4, l5, l6, l7)
        self.au("Mais en Europe", FadeOut(vieux), rt=0.12)
        li = self.lg("Mais en Europe,", 3.45, 3.05, 40, CIEL, maxw=6.0)
        bk = livre_ancien(3.5, 1.85, P(3.1, -1.55))
        self.dit(li, "Mais en Europe,", avec=[FadeIn(bk, shift=UP * 0.2)])
        self.dit(self.lg("il y a quelques siècles,", 3.45, 2.4, 36, maxw=6.0), "il y a quelques siècles,")
        self.dit(self.lg("on les appelait encore", 3.45, 1.8, 36, maxw=6.0), "on les appelait encore")
        a = self.lg("les nombres absurdes.", 3.45, 0.75, 48, JAUNE_TITRE, maxw=5.9)
        self.dit(a, "les nombres absurdes.")
        self.insister(a, 1.06, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 02 : le cahier ──────────────────────────────────────────────────────
    def ecran_cahier(self):
        self.ecran("02-cahier")
        b = bureau(6.4, 5.05, P(-3.3, -0.8))
        c = Cahier(5.8, 4.5, P(-3.3, -0.8))
        p = lou(0.66).move_to(P(-5.85, 2.55))
        l = loupe(1.05)
        l.shift(c.pos(-1.7, -1.3) - l.lentille.get_center())
        t1 = self.lg("Imagine un vieux cahier", 1.1, 3.1, 40, JAUNE_TITRE, maxw=10)
        self.dit(t1, "Imagine un vieux cahier", avec=[FadeIn(b), FadeIn(c)])
        t2 = self.lg("rempli d'erreurs.", 1.1, 2.5, 40, JAUNE_TITRE, maxw=10)
        self.dit(t2, "rempli d'erreurs.")
        t3 = self.lg("Mène l'enquête avec Lou.", 3.3, 1.75, 34, CIEL, maxw=6.0)
        self.poser_avec(t3, "Mène l'enquête avec Lou.", {ix(t3, "Lou"): lambda: [FadeIn(p, shift=UP * 0.2), FadeIn(l)]}, rt=0.2)
        self.dit(self.lg("Première erreur :", 3.3, 1.1, 36, maxw=6.0), "Première erreur :")
        e = c.ecrire(Fi("(−4) × (−3) = −12", 42), 1.25)
        self.dire_eq(e, "moins 4 fois moins 3 égale moins 12.", echelle=1.15, avec=[self.loupe_sur(l, c.pos(-1.2, 0.55))])
        res = VGroup(*e.atomes[-2:])
        self.play(self.loupe_sur(l, res.get_center() + DOWN * 0.03), run_time=0.3)
        tf = tampon_faux(1.2).move_to(c.pos(-0.7, -0.75))
        self.frappe(tf, self.loupe_sur(l, c.pos(1.9, -1.4)))
        rature = self.barrer(res, ROUGE_T, 6)
        s1, s2 = signe("−", 0.3, 42).move_to(P(5.15, 0.25)), signe("−", 0.3, 42).move_to(P(5.92, 0.25))
        ls = self.lg("Signes identiques :", 2.55, 0.25, 36, maxw=4.2)
        self.dit(ls, "Signes identiques :", avec=[Create(rature), FadeIn(s1, scale=1.3), FadeIn(s2, scale=1.3)])
        self.dit(self.lg("le résultat est positif.", 3.3, -0.5, 36, POS, maxw=6.0), "le résultat est positif.")
        r = E("+12", 76, VERT_OK, lettres="").move_to(P(3.0, -1.6))
        juste = Fi("+12", 36, audit=False).set_color(INK_OK).move_to(res.get_center() + DOWN * 0.68)
        self.dire_eq(r, "Plus 12.", echelle=1.3, avec=[FadeIn(juste, scale=1.3)])
        self.play(Create(self.cadre_ok(r, 0.15)), run_time=0.2)
        self.insister(r, 1.1, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 03 : la deuxième erreur ─────────────────────────────────────────────
    def ecran_erreur2(self):
        self.ecran("03-erreur2")
        b = bureau(6.8, 3.75, P(-3.05, 1.4))
        c = Cahier(6.2, 3.25, P(-3.05, 1.4))
        l = loupe(1.0)
        l.shift(c.pos(-2.0, -0.9) - l.lentille.get_center())
        d = Droite(0, 9, -5.0, 5.0, -1.75, fs=34)
        self.play(FadeIn(b), FadeIn(c), FadeIn(l), FadeIn(d), run_time=0.2)
        self.dit(self.lg("Deuxième erreur :", 3.55, 2.85, 42, JAUNE_TITRE, maxw=5.9), "Deuxième erreur :")
        e = c.ecrire(Fi("5 − (−3) = 2", 54), 0.75)
        depart = Dot(P(d.x(5), d.yy), radius=0.11, color=JAUNE_TITRE).set_z_index(3)
        self.dire_eq(e, "5 moins, entre parenthèses, moins 3, égale 2.", echelle=1.15, avec=[FadeIn(depart, scale=1.5)])
        res = e.atomes[-1]
        tf = tampon_faux(1.05).move_to(c.pos(1.1, -0.72))
        faux = d.saut(5, 2, ROUGE_T)
        x = croix(P(d.x(3.5), d.yy + 0.82))
        self.frappe(tf, self.loupe_sur(l, c.pos(-1.9, -0.65)), Create(faux), FadeIn(x, scale=1.4), Create(self.barrer(res, ROUGE_T, 6)))
        t = self.lg("On ajoute l'opposé :", 3.55, 1.85, 38, CIEL, maxw=5.9)
        par = VGroup(*e.atomes[2:6])
        self.poser_avec(t, "On ajoute l'opposé :", {ix(t, "opposé"): lambda: [Circumscribe(par, color=INK_OK, run_time=0.4)]}, rt=0.25)
        r = F("5 + 3 = 8", 62).move_to(P(3.45, 0.75))
        bon = d.saut(5, 8, POS)
        arrivee = Dot(P(d.x(8), d.yy), radius=0.11, color=VERT_OK).set_z_index(3)
        self.poser_avec(r, "5 plus 3, 8.", {ix(r, "3"): lambda: [Create(bon)], ix(r, "8"): lambda: [FadeIn(arrivee, scale=1.6)]}, rt=0.22)
        r.atomes[-1].set_color(VERT_OK)
        self.play(Create(self.cadre_ok(r, 0.15)), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -0.4
        b = bureau(5.6, 4.3, P(-3.75, -0.1))
        c = Cahier(5.15, 3.8, P(-3.75, -0.1))
        e = c.ecrire(Fi("(−6) + (−2) = 8", 44, audit=False), 0.85)
        l = loupe(1.0)
        l.shift(c.pos(-1.6, -1.05) - l.lentille.get_center())

        def avant(sc):
            sc.play(FadeIn(b), FadeIn(c), FadeIn(l), run_time=0.2)
            sc.eq_dans_q(0, "Dans le cahier : (−6) + (−2) = 8.", "Dans le cahier : moins 6 plus moins 2 égale 8.")
            sc.play(FadeIn(e), sc.loupe_sur(l, e.atomes[-1].get_center()), run_time=0.2)
            sc.eq_dans_q(0, "D'où vient l'erreur ?", "D'où vient l'erreur ?")

        def apres(sc):
            res = e.atomes[-1]
            sc.ph_eq(0, "Réponse A.", "Réponse A.", premier=True)
            juste = Fi("−8", 36, audit=False).set_color(INK_OK).move_to(res.get_center() + DOWN * 0.7 + LEFT * 0.1)
            tf = tampon_faux(1.0).move_to(c.pos(-0.45, -0.85))
            sc.ph_eq(1, "Le résultat est −8.", "Le résultat est moins 8.",
                     avec=[Create(sc.barrer(res, ROUGE_T, 6)), FadeIn(juste, scale=1.3), FadeIn(tf, scale=2.2), sc.loupe_sur(l, c.pos(1.75, -1.25))])
            sc.ph_eq(2, "Moins et moins ne donnent plus", "Moins et moins ne donnent plus")
            sc.ph_eq(3, "que pour multiplier.", "que pour multiplier.")
            sc.rep_fini()

        a = E("la règle de la multiplication,", 30, lettres="")
        a2 = E("utilisée pour une addition", 30, lettres="")
        a2.next_to(a, DOWN, buff=0.1, aligned_edge=LEFT)
        a.add(a2)
        a.atomes = a.atomes + a2.atomes
        self.question_pause("03q-question", "03r-reponse", ["Dans le cahier : (−6) + (−2) = 8.", "D'où vient l'erreur ?"],
                            [a, E("une erreur de priorité", 32, lettres=""), E("un oubli de parenthèses", 32, lettres="")], 0,
                            ["Réponse A.", "Le résultat est −8.", "Moins et moins ne donnent plus", "que pour multiplier."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : compter les moins ──────────────────────────────────────────────
    def ecran_compter(self):
        self.ecran("04-compter")
        self.dit(self.lg("Troisième énigme, sans calculer :", 0, 3.15, 42, JAUNE_TITRE, maxw=12), "Troisième énigme, sans calculer :")
        self.dit(self.lg("quel est le signe de", 0, 2.52, 34, CIEL, maxw=8), "quel est le signe de")
        f = F("(−2) × (−3) × (−1) ?", 60).move_to(P(0, 1.72))
        f.atomes[-1].set_color(JAUNE_TITRE)
        self.dire_eq(f, "moins 2 fois moins 3 fois moins 1 ?", echelle=1.15)
        m = moins_de(f)
        h = [surligne([a]) for a in m]
        l = loupe(0.72)
        l.shift(m[0].get_center() + LEFT * 0.9 + DOWN * 0.1 - l.lentille.get_center())

        def voir(i):
            return [FadeIn(h[i], scale=1.5), Indicate(m[i], color=JAUNE_TITRE, scale_factor=1.5), self.loupe_sur(l, m[i])]

        t = lr("L'astuce : on compte", -3.4, 0.05, 32, maxw=5.9)
        for a in t.atomes[:3]:
            a.set_color(CIEL)
        self.poser_avec(t, "L'astuce : on compte", {ix(t, "astuce"): lambda: [FadeIn(l)], ix(t, "compte"): lambda: voir(0)}, rt=0.28)
        t2 = lr("les moins.", -3.4, -0.45, 32, maxw=5.9)
        self.poser_avec(t2, "les moins.", {ix(t2, "moins"): lambda: voir(1)}, rt=0.28)
        self.play(*voir(2), run_time=0.4)
        n = lr("Il y en a 3.", -3.4, -0.95, 32, maxw=5.9)
        self.dire_eq(n, "Il y en a 3.", echelle=1.0, rt=0.12)
        self.insister(n.atomes[-2], 1.5, 0.14)
        groupe = couple(f.atomes[0:9], POS)
        gx = groupe.get_center()[0]
        tx = m[2].get_center()[0] + 0.1
        y = 0.68
        fl1 = Arrow(P(gx, groupe.get_bottom()[1]), P(gx, y + 0.34), color=POS, buff=0, stroke_width=4, tip_length=0.13, max_tip_length_to_length_ratio=0.5)
        fl2 = Arrow(P(tx, f.get_bottom()[1] - 0.02), P(tx, y + 0.34), color=NEG, buff=0, stroke_width=4, tip_length=0.13, max_tip_length_to_length_ratio=0.5)
        jp = signe("+").move_to(P(gx, y))
        jm = signe("−").move_to(P(tx, y))
        d1 = lr("Deux moins font un plus,", -3.4, -1.45, 32, maxw=5.9)
        self.poser_avec(d1, "Deux moins font un plus,", {0: lambda: [FadeOut(l), Create(groupe)], ix(d1, "plus"): lambda: [GrowArrow(fl1), FadeIn(jp, scale=1.5)]}, rt=0.25)
        d2 = lr("et il en reste un.", -3.4, -1.95, 32, maxw=5.9)
        self.poser_avec(d2, "et il en reste un.", {ix(d2, "reste"): lambda: [GrowArrow(fl2), FadeIn(jm, scale=1.5), Indicate(m[2], color=JAUNE_TITRE, scale_factor=1.5)]}, rt=0.25)
        mult = T("×", 44, JAUNE_TITRE, audit=False, gras=True).move_to(P((gx + tx) / 2, y))
        eg = T("=", 48, JAUNE_TITRE, audit=False, gras=True).move_to(P(tx + 1.0, y))
        final = signe("−", 0.46, 66).move_to(P(tx + 2.0, y))
        d3 = lr("Le résultat est négatif.", -3.4, -2.5, 32, NEG, maxw=5.9)
        self.poser_avec(d3, "Le résultat est négatif.", {ix(d3, "négatif"): lambda: [FadeIn(mult), FadeIn(eg), FadeIn(final, scale=1.6)]}, rt=0.25)
        self.dit(self.lg("Vérifions :", 3.0, -0.05, 36, CIEL, maxw=5), "Vérifions :")
        c1 = F("(−2) × (−3) = 6", 46).move_to(P(3.0, -0.8))
        self.dire_eq(c1, "moins 2 fois moins 3, 6.", echelle=1.1)
        c2 = F("6 × (−1) = −6", 46).mis_sur_egal(c1.egal.get_center()[0], -1.6)
        self.dire_eq(c2, "6 fois moins 1, moins 6.", echelle=1.1)
        for a in c2.atomes[-2:]:
            a.set_color(VERT_OK)
        self.play(Create(self.cadre_ok(VGroup(*c2.atomes[-2:]), 0.1)), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 05 : pair, impair ───────────────────────────────────────────────────
    def carte_regle(self, x, c, n, jeton, lignes, couleur):
        """Une carte de la règle : n jetons deux par deux → le signe du résultat."""
        cad = RoundedRectangle(width=6.2, height=2.75, corner_radius=0.14, stroke_color=c, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x, 1.25))
        rangee = paires(n, 0.19, 28)
        fl = Arrow(LEFT * 0.3, RIGHT * 0.3, color=WHITE, buff=0, stroke_width=4, tip_length=0.14)
        s = signe(jeton, 0.27, 38)
        tout = VGroup(rangee, fl, s).arrange(RIGHT, buff=0.16).move_to(P(x, 2.05))
        self.play(FadeIn(cad), run_time=0.12)
        ph1, ph2 = lignes
        l1 = lr("Un nombre " + ph1[0] + " de moins,", x, 1.05, 34, maxw=5.7)
        self.poser_avec(l1, ph1[1], {ix(l1, ph1[0]): lambda: [LaggedStart(*[FadeIn(g, scale=1.3) for g in rangee], lag_ratio=0.3)]}, rt=0.28)
        l2 = lr("résultat " + ph2 + ".", x, 0.42, 38, couleur, maxw=5.7)
        self.poser_avec(l2, "résultat " + ph2 + ".", {ix(l2, ph2): lambda: [GrowArrow(fl), FadeIn(s, scale=1.5)]}, rt=0.25)

    def ecran_pair(self):
        self.ecran("05-pair")
        self.dit(self.lg("La règle :", 0, 3.12, 46, JAUNE_TITRE, maxw=6), "La règle :")
        self.carte_regle(-3.32, POS, 4, "+", (("pair", "un nombre pair de moins,"), "positif"), POS)
        self.carte_regle(3.32, NEG, 5, "−", (("impair", "Un nombre impair de moins,"), "négatif"), NEG)
        l = lr("Moins 1, quatre fois de suite :", -0.5, -0.5, 38, maxw=9)
        l.atomes[0].set_color(NEG)
        l.atomes[1].set_color(NEG)
        pr = F("(−1) × (−1) × (−1) × (−1)", 46, audit=False).move_to(P(-0.5, -1.32))
        a = pr.atomes
        fac = [VGroup(*a[0:4]), VGroup(*a[4:9]), VGroup(*a[9:14]), VGroup(*a[14:19])]
        self.poser_avec(l, "Moins 1, quatre fois de suite :", {ix(l, "1"): lambda: [FadeIn(fac[0], scale=1.2)], ix(l, "quatre"): lambda: [FadeIn(fac[1], scale=1.2)],
                                                                      ix(l, "fois"): lambda: [FadeIn(fac[2], scale=1.2)], ix(l, "suite"): lambda: [FadeIn(fac[3], scale=1.2)]}, rt=0.2)
        m = moins_de(pr)
        h = [surligne([x]) for x in m]

        def voir(i):
            return [FadeIn(h[i], scale=1.5), Indicate(m[i], color=JAUNE_TITRE, scale_factor=1.4)]

        n = lr("4 moins, c'est pair.", -3.6, -2.3, 34, maxw=5.0)
        self.poser_avec(n, "4 moins, c'est pair.", {ix(n, "4"): lambda: voir(0), ix(n, "moins"): lambda: voir(1), ix(n, "c"): lambda: voir(2), ix(n, "pair"): lambda: voir(3)}, rt=0.2)
        g1, g2 = couple(a[0:9], POS), couple(a[10:19], POS)
        self.play(Create(g1), Create(g2), run_time=0.35)
        r = lr("Le résultat est 1.", 2.0, -2.3, 34, VERT_OK, maxw=5.0)
        self.dire_eq(r, "Le résultat est 1.", echelle=1.0, rt=0.14)
        self.play(Create(self.cadre_ok(r, 0.12)), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -0.4
        b = bureau(5.6, 3.9, P(-3.75, 0.0))
        c = Cahier(5.15, 3.4, P(-3.75, 0.0))
        e1 = c.ecrire(Fi("(−1) × 2 × (−3)", 40, audit=False), 1.0)
        e2 = c.ecrire(Fi("× (−4) × 5", 40, audit=False), 0.3)
        e = VGroup(e1, e2)
        e.atomes = e1.atomes + e2.atomes
        l = loupe(0.85)
        l.shift(c.pos(-1.6, -1.15) - l.lentille.get_center())

        def avant(sc):
            sc.play(FadeIn(b), FadeIn(c), FadeIn(l), run_time=0.2)
            sc.eq_dans_q(0, "Quel est le signe de", "Quel est le signe de")
            sc.eq_dans_q(0, "(−1) × 2 × (−3) × (−4) × 5 ?", "moins 1 fois 2 fois moins 3 fois moins 4 fois 5 ?")
            sc.play(FadeIn(e), run_time=0.2)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : négatif.", "Réponse B : négatif.", premier=True)
            m = moins_de(e)
            h = [surligne([x], "#ea580c", fond=0.3) for x in m]
            for i in range(3):
                sc.play(FadeIn(h[i], scale=1.5), sc.loupe_sur(l, m[i].get_center() + DOWN * 0.1), run_time=0.3)
            sc.play(FadeOut(l), run_time=0.1)
            sc.ph_eq(1, "Il y a 3 moins : c'est impair.", "Il y a 3 moins : c'est impair.")
            restes = [x for x in e.atomes if x.original_text in ("2", "5")]
            sc.ph_eq(2, "Le 2 et le 5 ne comptent pas,", "Le 2 et le 5 ne comptent pas,", avec=[x.animate.set_opacity(0.35) for x in restes])
            sc.ph_eq(3, "ils sont positifs.", "ils sont positifs.")
            rangee = paires(3, 0.24, 34).move_to(c.pos(0.28, -0.75))
            sc.play(FadeIn(rangee, scale=1.2), run_time=0.2)
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Quel est le signe de", "(−1) × 2 × (−3) × (−4) × 5 ?"],
                            [E("positif", 40, lettres=""), E("négatif", 40, lettres=""), E("on ne peut pas savoir", 36, lettres="")], 1,
                            ["Réponse B : négatif.", "Il y a 3 moins : c'est impair.", "Le 2 et le 5 ne comptent pas,", "ils sont positifs."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le nombre effacé ───────────────────────────────────────────────
    def ecran_efface(self):
        self.ecran("06-efface")
        self.dit(self.lg("Dernière énigme : un nombre effacé.", 0, 3.15, 44, JAUNE_TITRE, maxw=12), "Dernière énigme : un nombre effacé.")
        b = bureau(6.4, 3.55, P(-3.3, 0.8))
        c = Cahier(5.85, 3.05, P(-3.3, 0.8))
        tache = VGroup(*[Ellipse(width=w, height=h, fill_color="#8d7a4c", fill_opacity=0.55, stroke_width=0).move_to(c.pos(-1.47 + dx, 0.3 + dy))
                         for w, h, dx, dy in ((1.45, 0.72, 0, 0), (1.05, 0.5, 0.2, 0.12), (0.8, 0.44, -0.3, -0.13))])
        nom = T("quelque chose", 24, INK, audit=False).next_to(tache, DOWN, buff=0.14)
        e = Fi("× (−4) = 20", 50)
        e.scale_to_fit_width(3.25).move_to(c.pos(1.05, 0.3))
        self.play(FadeIn(b), FadeIn(c), run_time=0.15)
        self.au("Quelque chose", FadeIn(tache, scale=1.2), FadeIn(nom), rt=0.3)
        self.dire_eq(e, "fois moins 4, égale 20.", echelle=1.15)
        y = -1.72
        jq = jeton_q(0.44, 58).move_to(P(-5.3, y))
        fois = T("×", 52, JAUNE_TITRE, audit=False, gras=True).move_to(P(-4.3, y))
        jm = signe("−", 0.44, 62).move_to(P(-3.3, y))
        ega = T("=", 52, JAUNE_TITRE, audit=False, gras=True).move_to(P(-2.3, y))
        jp = signe("+", 0.44, 62).move_to(P(-1.3, y))
        self.dit(self.lg("Le résultat est positif", 3.4, 2.15, 36, POS, maxw=6.0), "Le résultat est positif",
                 avec=[FadeIn(jq, scale=1.2), FadeIn(fois), FadeIn(ega), FadeIn(jp, scale=1.5)])
        self.dit(lr("et −4 est négatif :", 3.4, 1.55, 36, maxw=6.0), "et moins 4 est négatif :", avec=[FadeIn(jm, scale=1.5)])
        self.dit(self.lg("le nombre cherché", 3.4, 0.75, 36, maxw=6.0), "le nombre cherché", avec=[Indicate(jq, color=JAUNE_TITRE, scale_factor=1.25)])
        l = self.lg("est donc négatif.", 3.4, 0.15, 36, NEG, maxw=6.0)
        nouveau = signe("−", 0.44, 62).move_to(jq)
        self.poser_avec(l, "est donc négatif.", {ix(l, "négatif"): lambda: [ReplacementTransform(jq, nouveau)]}, rt=0.28)
        r = lr("C'est −5.", 3.1, -1.05, 66, maxw=5.0)
        rep = Fi("(−5)", 44, audit=False).set_color(INK_OK).move_to(tache)
        self.dire_eq(r, "C'est moins 5.", echelle=1.15, avec=[FadeOut(nom), tache.animate.set_opacity(0.2)])
        self.play(FadeIn(rep, scale=1.4), run_time=0.15)
        for a in r.atomes[-3:-1]:
            a.set_color(VERT_OK)
        self.play(Create(self.cadre_ok(r, 0.14)), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def carte_affaire(self, y, h=1.05):
        return RoundedRectangle(width=12.7, height=h, corner_radius=0.12, stroke_color=PAPIER_BORD, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(0, y))

    def etiquette(self, s, x, y):
        """Le numéro du dossier : une étiquette de papier jauni."""
        t = T(s, 30, INK, gras=True)
        f = RoundedRectangle(width=1.8, height=0.62, corner_radius=0.06, fill_color=PAPIER, fill_opacity=1, stroke_color=PAPIER_BORD, stroke_width=2)
        return VGroup(f, t.move_to(f)).move_to(P(x, y))

    def ecran_defi(self):
        self.ecran("07-defi")
        tit = T("À toi de jouer.", 52, JAUNE_TITRE).move_to(P(0, 3.05))
        self.au("À toi", Write(tit), rt=0.5)
        self.dit(self.lg("Trois affaires.", 0, 2.36, 38, CIEL, maxw=8), "Trois affaires.")
        lignes = [(1.4, "Un :", "(−3) × (−5) est-il plus grand que (−3) + (−5) ?", "moins 3 fois moins 5 est-il plus grand que moins 3 plus moins 5 ?"),
                  (0.2, "Deux :", "quel est le signe de −1, sept fois de suite ?", "quel est le signe de moins 1, sept fois de suite ?"),
                  (-1.0, "Trois :", "quel nombre, multiplié par −6, donne −30 ?", "quel nombre, multiplié par moins 6, donne moins 30 ?")]
        for y, tag, s, ph in lignes:
            c = self.carte_affaire(y)
            et = self.etiquette(tag, -5.3, y)
            self.au(tag, FadeIn(c), FadeIn(et, shift=RIGHT * 0.15), rt=0.2)
            e = lr(s, 0.92, y, 34, maxw=10.1)
            self.dire_eq(e, ph, echelle=1.05, rt=0.14)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -2.3))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("07b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.15))), rt=0.25)
        c1 = self.carte_affaire(1.45, 2.1)
        et1 = self.etiquette("Un :", -5.3, 1.45)
        self.au("Un :", FadeIn(c1), FadeIn(et1, shift=RIGHT * 0.15), rt=0.2)
        e1 = F("(−3) × (−5) = 15", 38).move_to(P(-1.95, 2.0))
        self.dire_eq(e1, "moins 3 fois moins 5, 15.", echelle=1.1)
        e2 = F("(−3) + (−5) = −8", 38).move_to(P(3.4, 2.0))
        self.dire_eq(e2, "Moins 3 plus moins 5, moins 8.", echelle=1.1)
        d = self.lg("Donc oui, plus grand.", 0.65, 0.95, 44, VERT_OK, maxw=9)
        self.dit(d, "Donc oui, plus grand.")
        c2 = self.carte_affaire(-0.2, 1.0)
        et2 = self.etiquette("Deux :", -5.3, -0.2)
        self.au("Deux :", FadeIn(c2), FadeIn(et2, shift=RIGHT * 0.15), rt=0.2)
        l2 = lr("7 moins, c'est impair : négatif.", -0.95, -0.2, 34, maxw=6.4)
        for a in l2.atomes[-2:]:
            a.set_color(NEG)
        rangee = paires(7, 0.17, 26).move_to(P(4.3, -0.2))
        self.poser_avec(l2, "7 moins, c'est impair : négatif.", {ix(l2, "moins"): lambda: [FadeIn(rangee, scale=1.15)]}, rt=0.2)
        c3 = self.carte_affaire(-1.4, 1.0)
        c3.stretch_to_fit_width(11.25).align_to(c2, LEFT)
        et3 = self.etiquette("Trois :", -5.3, -1.4)
        self.au("Trois :", FadeIn(c3), FadeIn(et3, shift=RIGHT * 0.15), rt=0.2)
        l3 = lr("C'est 5, car 5 × (−6) = −30.", 0.35, -1.4, 38, maxw=7.9)
        self.dire_eq(l3, "c'est 5, car 5 fois moins 6, moins 30.", echelle=1.05, rt=0.16)
        vrai = l3.atomes[2]
        vrai.set_color(VERT_OK)
        self.play(Create(self.cadre_ok(vrai, 0.06)), run_time=0.15)
        self.attendre_voix(marge=1.0)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        self.XL = -1.5
        b = bureau(4.5, 3.3, ORIGIN)
        c = Cahier(3.95, 2.8, griffonne=True)
        l = loupe(0.95)
        l.shift(c.pos(-1.05, 0.55) - l.lentille.get_center())
        tf = tampon_faux(0.92).move_to(c.pos(0.45, -0.58))
        p = lou(0.82).next_to(b, DOWN, buff=0.1)
        fig = VGroup(b, c, l, tf, p)
        lignes = self.finale_colonne([["Avant de calculer,", "on regarde l'opération."],
                                      ["Dans un produit, on compte", "les moins : pair, positif ;", "impair, négatif."],
                                      ["Et on vérifie", "par une multiplication."]], fs=38, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_histoire()
        self.ecran_cahier()
        self.ecran_erreur2()
        self.ecran_question1()
        self.ecran_compter()
        self.ecran_pair()
        self.ecran_question2()
        self.ecran_efface()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
