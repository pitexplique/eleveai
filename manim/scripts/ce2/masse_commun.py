# masse_commun.py
# EleveAI — série MASSES du CP au CM2 (session C, 17-18/11/2026) : LE commun que toutes les classes importent
# (CP, CE1, CE2 dans manim/scripts/ce2/ ; CM1, CM2 l'importent par sys.path, comme les séries contenance).
# Base : contenance_ce2_commun (PaysageContenanceCE2, personnages, récipients), importée SANS la modifier.
# Ici : la balance à deux plateaux (Roberval) qui penche, les masses marquées, la balance de cuisine à
# aiguille, la balance électronique (afficheur), le pèse-personne, le tableau t | kg | hg | dag | g,
# des objets à peser (fromages, sacs, paquets, fruits), les personnages-métiers de la série.
# ⛔ Vocabulaire : « masse », « peser », « lourd », « léger » ; jamais « poids » pour la masse.
# Voix : manim/scripts/ce2/masse_voix.py (source unique, validée à deux) → manim/voix/<id>.json.
# 16/11 : pas de 6e (Frédéric : « si la 6e n'a pas de masse tu fais pas »).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_ce2_commun import *  # noqa: E402,F401,F403

METAL = "#94a3b8"
LAITON = "#d4a017"
BOIS = "#a16207"
FROMAGE = "#fcd34d"
CROUTE = "#d97706"
LOURD = "#f97316"   # le côté qui descend (orange)
LEGER = "#38bdf8"   # le côté qui monte (bleu)


# ── La balance à deux plateaux ──────────────────────────────────────────────────────────────────
class Balance(VGroup):
    """Balance de Roberval vue de face : socle, colonne, fléau qui pivote, deux plateaux suspendus.
    penche > 0 : le plateau de GAUCHE descend ; < 0 : la DROITE descend ; 0 : équilibre.
    b.sur("g") / b.sur("d") : le point où poser un objet (le dessus du plateau).
    b.vers(penche) : une copie dans le nouvel état (Transform(b, b.vers(0.2)))."""

    def __init__(self, larg=4.4, penche=0.0, s=1.0, **kw):
        super().__init__(**kw)
        self.larg, self.penche_, self.s = larg, penche, s
        h = 2.0 * s
        socle = RoundedRectangle(width=larg * 0.42, height=0.22 * s, corner_radius=0.08 * s, fill_color=BOIS,
                                 fill_opacity=1, stroke_width=0).move_to(P(0, -h / 2))
        colonne = Rectangle(width=0.16 * s, height=h, fill_color=METAL, fill_opacity=1, stroke_width=0)
        colonne.next_to(socle, UP, buff=0)
        pivot = colonne.get_top()
        ang = penche * 0.32  # rad : 0,32 rad au plus (17/11 : signe corrigé, le côté lourd DESCEND)
        demi = larg / 2
        g_ = pivot + demi * np.array([-np.cos(ang), -np.sin(ang), 0])
        d_ = pivot + demi * np.array([np.cos(ang), np.sin(ang), 0])
        fleau = Line(g_, d_, color=LAITON, stroke_width=9 * s)
        axe = Circle(radius=0.1 * s, fill_color=LAITON, fill_opacity=1, stroke_width=0).move_to(pivot)
        aig = Triangle(fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0).scale(0.12 * s)
        aig.rotate(PI).move_to(pivot + P(0, -0.32 * s)).rotate(ang, about_point=pivot)
        self.plateaux = {}
        pend = []
        for cle, bout in (("g", g_), ("d", d_)):
            fil = 0.95 * s
            bas = bout + P(0, -fil)
            pl = Arc(radius=larg * 0.17, start_angle=PI + 0.35, angle=PI - 0.7, color=LAITON,
                     stroke_width=7 * s)
            pl.move_to(bas, aligned_edge=UP)
            haut_pl = Line(pl.get_corner(UL), pl.get_corner(UR), color=LAITON, stroke_width=5 * s)
            fils = VGroup(Line(bout, pl.get_corner(UL), color=METAL, stroke_width=2),
                          Line(bout, pl.get_corner(UR), color=METAL, stroke_width=2))
            pend += [fils, pl, haut_pl]
            self.plateaux[cle] = haut_pl
        self.add(socle, colonne, *pend, fleau, axe, aig)

    def sous(self, cote, buff=0.28):
        """Le point juste SOUS le plateau (pour l'étiquette de masse, loin des fils et du fléau)."""
        pl = self.plateaux[cote]
        prof = self.larg * 0.17 * (1 - np.sin(0.35))
        return pl.get_center() + P(0, -prof - buff)

    def sur(self, cote):
        return self.plateaux[cote].get_center() + P(0, 0.02)

    def poser(self, obj, cote):
        """Place obj (son BAS) sur le plateau ; renvoie obj."""
        return obj.move_to(self.sur(cote), aligned_edge=DOWN)

    def vers(self, penche):
        b = Balance(self.larg, penche, self.s)
        b.shift(self[1].get_top() - b[1].get_top())  # même pivot
        return b


def basculer(sc, balance, penche, objets_g=(), objets_d=(), run_time=0.8):
    """Anime la balance vers `penche` ; les objets posés suivent leur plateau."""
    nb = balance.vers(penche)
    anims = [Transform(balance, nb)]
    for objs, cote in ((objets_g, "g"), (objets_d, "d")):
        dy = nb.sur(cote)[1] - balance.sur(cote)[1]
        dx = nb.sur(cote)[0] - balance.sur(cote)[0]
        anims += [o.animate.shift(P(dx, dy)) for o in objs]
    sc.play(*anims, run_time=run_time)
    balance.plateaux = nb.plateaux


def masse_marquee(texte, s=1.0, couleur=LAITON):
    """Une masse marquée en laiton : corps arrondi + bouton, avec sa valeur (« 200 g »)."""
    corps = RoundedRectangle(width=0.7 * s, height=0.5 * s, corner_radius=0.1 * s, fill_color=couleur,
                             fill_opacity=1, stroke_color="#92400e", stroke_width=2)
    bouton = VGroup(Rectangle(width=0.12 * s, height=0.12 * s, fill_color=couleur, fill_opacity=1,
                              stroke_width=0).next_to(corps, UP, buff=0),
                    Circle(radius=0.1 * s, fill_color=couleur, fill_opacity=1, stroke_width=0))
    bouton[1].next_to(bouton[0], UP, buff=-0.03)
    t = hors_audit(Text(texte, font_size=int(18 * s), color="#1f2937", weight=BOLD)).move_to(corps)
    if t.width > corps.width * 0.92:
        t.scale_to_fit_width(corps.width * 0.92)
    return VGroup(corps, bouton, t)


# ── Les autres instruments ──────────────────────────────────────────────────────────────────────
def balance_cuisine(valeur, maxi=2000, s=1.0, unite="g", grad=(0, 500, 1000, 1500)):
    """Balance de cuisine à aiguille : bol, cadran gradué de 0 à maxi, aiguille sur `valeur`."""
    r = 0.9 * s
    corps = RoundedRectangle(width=2.3 * s, height=2.1 * s, corner_radius=0.3 * s, fill_color="#e2e8f0",
                             fill_opacity=1, stroke_width=0)
    cadran = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#475569", stroke_width=3)
    cadran.move_to(corps.get_center() + P(0, -0.1 * s))
    c = cadran.get_center()

    def angle(v):
        return PI / 2 - TAU * v / maxi * 0.9

    traits = VGroup()
    for v in range(0, maxi, maxi // 20):
        a = angle(v)
        L = 0.16 if v in grad else 0.08
        traits.add(Line(c + (r - 0.05) * np.array([np.cos(a), np.sin(a), 0]),
                        c + (r - 0.05 - L * s) * np.array([np.cos(a), np.sin(a), 0]), color="#1f2937",
                        stroke_width=2))
    nums = VGroup(*[hors_audit(Text(str(v), font_size=int(14 * s), color="#1f2937"))
                    .move_to(c + (r - 0.36 * s) * np.array([np.cos(angle(v)), np.sin(angle(v)), 0]))
                    for v in grad])
    a = angle(valeur)
    aiguille = Line(c, c + (r - 0.15 * s) * np.array([np.cos(a), np.sin(a), 0]), color=ROUGE_ERREUR,
                    stroke_width=4)
    u = hors_audit(Text(unite, font_size=int(14 * s), color="#475569")).move_to(c + P(0, 0.3 * s))
    plateau = Ellipse(width=2.0 * s, height=0.35 * s, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    plateau.next_to(corps, UP, buff=-0.08)
    g = VGroup(corps, plateau, cadran, traits, nums, u, aiguille, Dot(c, radius=0.05, color="#1f2937"))
    g.aiguille, g.centre, g.angle, g.plateau = aiguille, c, angle, plateau
    return g


def balance_electronique(texte="0 g", s=1.0, bouton_tare=True):
    """Balance électronique plate : plateau, afficheur vert (texte), bouton TARE."""
    corps = RoundedRectangle(width=2.6 * s, height=0.55 * s, corner_radius=0.12 * s, fill_color="#334155",
                             fill_opacity=1, stroke_width=0)
    plateau = RoundedRectangle(width=2.2 * s, height=0.12 * s, corner_radius=0.05 * s, fill_color="#cbd5e1",
                               fill_opacity=1, stroke_width=0).next_to(corps, UP, buff=0.02)
    ecran = RoundedRectangle(width=1.2 * s, height=0.34 * s, corner_radius=0.05 * s, fill_color="#052e16",
                             fill_opacity=1, stroke_width=0).move_to(corps).shift(LEFT * 0.4 * s)
    aff = hors_audit(Text(texte, font_size=int(20 * s), color="#4ade80", weight=BOLD)).move_to(ecran)
    if aff.width > ecran.width * 0.86:  # (17/11) « 1 000 g » reste dans l'afficheur
        aff.scale_to_fit_width(ecran.width * 0.86)
    g = VGroup(corps, plateau, ecran, aff)
    if bouton_tare:
        bt = VGroup(Circle(radius=0.13 * s, fill_color="#f59e0b", fill_opacity=1, stroke_width=0),
                    hors_audit(Text("TARE", font_size=int(10 * s), color="#e2e8f0")))
        bt[0].move_to(corps).shift(RIGHT * 0.6 * s)  # (17/11) « TARE » reste dans le boîtier
        bt[1].next_to(bt[0], RIGHT, buff=0.06)
        g.add(bt)
        g.tare = bt
    g.ecran, g.affichage, g.plateau = ecran, aff, plateau
    return g


def afficher(bal, texte, s=1.0):
    """Le nouvel affichage d'une balance électronique (pour un Transform)."""
    t = hors_audit(Text(texte, font_size=int(20 * s), color="#4ade80", weight=BOLD)).move_to(bal.ecran)
    if t.width > bal.ecran.width * 0.86:  # (17/11) « 1 000 g » reste dans l'afficheur
        t.scale_to_fit_width(bal.ecran.width * 0.86)
    return t


def pese_personne(texte="0 kg", s=1.0):
    corps = RoundedRectangle(width=2.0 * s, height=2.0 * s, corner_radius=0.25 * s, fill_color="#e5e7eb",
                             fill_opacity=1, stroke_color="#9ca3af", stroke_width=3)
    fenetre = RoundedRectangle(width=1.0 * s, height=0.4 * s, corner_radius=0.06 * s, fill_color="#111827",
                               fill_opacity=1, stroke_width=0).move_to(corps.get_top() + P(0, -0.4 * s))
    aff = hors_audit(Text(texte, font_size=int(20 * s), color="#4ade80", weight=BOLD)).move_to(fenetre)
    pieds = VGroup(*[RoundedRectangle(width=0.5 * s, height=0.8 * s, corner_radius=0.2 * s, fill_color="#cbd5e1",
                                      fill_opacity=1, stroke_width=0).move_to(corps.get_center() + P(dx * s, -0.3 * s))
                     for dx in (-0.4, 0.4)])
    g = VGroup(corps, fenetre, pieds, aff)
    g.ecran, g.affichage = fenetre, aff
    return g


def tableau_masses(colonnes=("t", "kg", "hg", "dag", "g"), larg=1.1, h=0.62, fs=28, chiffres=None):
    """Le tableau des unités de masse. chiffres = {"kg": "1", "hg": "0", …} écrits dans la 2e ligne."""
    g = VGroup()
    entetes = VGroup()
    cases = {}
    for i, c in enumerate(colonnes):
        x = (i - (len(colonnes) - 1) / 2) * larg
        e = Rectangle(width=larg, height=h, fill_color="#1e3a8a", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2).move_to(P(x, h / 2))
        v = Rectangle(width=larg, height=h, fill_opacity=0, stroke_color=WHITE, stroke_width=2).move_to(P(x, -h / 2))
        entetes.add(VGroup(e, hors_audit(Text(c, font_size=fs, color=JAUNE_TITRE, weight=BOLD)).move_to(e)))
        cases[c] = v
        g.add(v)
    g.add(entetes)
    g.cases, g.entetes = cases, entetes
    if chiffres:
        for c, ch in chiffres.items():
            g.add(hors_audit(Text(ch, font_size=fs + 4, color=WHITE, weight=BOLD)).move_to(cases[c]))
    return g


def chiffre_dans(tab, colonne, ch, fs=32, couleur=WHITE):
    return hors_audit(Text(ch, font_size=fs, color=couleur, weight=BOLD)).move_to(tab.cases[colonne])


# ── Objets à peser ──────────────────────────────────────────────────────────────────────────────
def part_fromage(s=1.0, couleur=FROMAGE):
    """Une part de fromage en triangle, avec des trous."""
    tri = Polygon(P(-0.8 * s, -0.35 * s), P(0.8 * s, -0.35 * s), P(-0.8 * s, 0.4 * s), fill_color=couleur,
                  fill_opacity=1, stroke_color=CROUTE, stroke_width=3)
    trous = VGroup(*[Circle(radius=r * s, fill_color="#f59e0b", fill_opacity=0.8, stroke_width=0)
                     .move_to(P(x * s, y * s)) for x, y, r in ((-0.5, 0.05, 0.08), (-0.15, -0.15, 0.06),
                                                              (-0.55, -0.2, 0.05))])
    return VGroup(tri, trous)


def meule(s=1.0, couleur=FROMAGE):
    """Une meule de fromage (cylindre couché) : dessus elliptique, flanc croûte."""
    w, h = 1.6 * s, 0.6 * s
    flanc = Rectangle(width=w, height=h, fill_color=CROUTE, fill_opacity=1, stroke_width=0)
    bas = Ellipse(width=w, height=0.4 * s, fill_color=CROUTE, fill_opacity=1, stroke_width=0).move_to(flanc.get_bottom())
    dessus = Ellipse(width=w, height=0.4 * s, fill_color=couleur, fill_opacity=1, stroke_color=CROUTE,
                     stroke_width=2).move_to(flanc.get_top())
    return VGroup(bas, flanc, dessus)


def sac(texte=None, s=1.0, couleur="#d6b98c"):
    """Un sac en toile fermé, avec une étiquette optionnelle (« 1 kg »)."""
    corps = RoundedRectangle(width=1.1 * s, height=1.2 * s, corner_radius=0.25 * s, fill_color=couleur,
                             fill_opacity=1, stroke_color="#92400e", stroke_width=2)
    col_ = Polygon(P(-0.3 * s, 0.6 * s), P(0.3 * s, 0.6 * s), P(0.15 * s, 0.85 * s), P(-0.15 * s, 0.85 * s),
                   fill_color=couleur, fill_opacity=1, stroke_color="#92400e", stroke_width=2)
    lien = Line(P(-0.22 * s, 0.68 * s), P(0.22 * s, 0.68 * s), color="#7c2d12", stroke_width=4)
    g = VGroup(corps, col_, lien)
    if texte:
        et = hors_audit(Text(texte, font_size=int(22 * s), color="#1f2937", weight=BOLD)).move_to(corps)
        if et.width > corps.width * 0.86:  # (17/11) « 1 000 g » : le texte reste dans le sac
            et.scale_to_fit_width(corps.width * 0.86)
        g.add(et)
    return g


def paquet(texte=None, s=1.0, couleur="#60a5fa"):
    corps = RoundedRectangle(width=1.0 * s, height=0.7 * s, corner_radius=0.06 * s, fill_color=couleur,
                             fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    g = VGroup(corps)
    if not texte:  # le ruban du paquet, seulement s'il n'y a pas d'étiquette à lire
        g.add(Line(corps.get_top(), corps.get_bottom(), color=WHITE, stroke_width=2))
    if texte:
        g.add(hors_audit(Text(texte, font_size=int(20 * s), color=WHITE, weight=BOLD)).move_to(corps))
    return g


def plumes(s=1.0):
    """Un gros sac de plumes (blanc, gonflé, plumes qui dépassent)."""
    corps = Ellipse(width=1.6 * s, height=1.4 * s, fill_color="#f8fafc", fill_opacity=1, stroke_color="#cbd5e1",
                    stroke_width=2)
    pl = VGroup(*[Ellipse(width=0.12 * s, height=0.45 * s, fill_color="#e2e8f0", fill_opacity=1,
                          stroke_width=0).rotate(a).move_to(corps.get_top() + P(dx * s, 0.1 * s))
                  for dx, a in ((-0.25, 0.5), (0.0, 0.0), (0.25, -0.5))])
    return VGroup(pl, corps)


def cailloux(s=1.0):
    """Un petit sac de cailloux (gris, compact)."""
    corps = RoundedRectangle(width=0.8 * s, height=0.6 * s, corner_radius=0.2 * s, fill_color="#78716c",
                             fill_opacity=1, stroke_color="#44403c", stroke_width=2)
    pierres = VGroup(*[Circle(radius=r * s, fill_color="#a8a29e", fill_opacity=1, stroke_width=0)
                       .move_to(corps.get_top() + P(dx * s, 0.02)) for dx, r in ((-0.2, 0.12), (0.05, 0.1), (0.25, 0.09))])
    return VGroup(corps, pierres)


# ── Les personnages-métiers de la série (un par paysage) ────────────────────────────────────────
def tablier(p, couleur):
    c = p.corps.get_center() if hasattr(p, "corps") else p.get_center()
    w = p.width * 0.42
    return Rectangle(width=w, height=w * 1.1, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(c)


def anais(s=1.0):
    """Anaïs, fromagère : tenue blanche, tablier bleu, béret bleu marine."""
    p = visage(personne(peau="#c68642", tenue="#f8fafc", cheveux="#1f2937", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    beret = Ellipse(width=r * 2.3, height=r * 0.7, fill_color="#1e3a8a", fill_opacity=1, stroke_width=0)
    beret.move_to(c + UP * r * 0.85).rotate(0.15)
    p.add(beret)
    return p


class PaysageMasse(PaysageContenanceCE2):
    """La base des paysages masses (CP → CM2). identite, ceinture, nom_voix, fichier_marques par épisode."""
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"

    def etiquette_plateau(self, b, cote, s, fs=26, couleur=JAUNE_TITRE, audit=False):
        """L'étiquette de masse SOUS un plateau de la balance b (« 450 g »)."""
        t = Text(s, font_size=fs, color=couleur, weight=BOLD).move_to(b.sous(cote))
        return t if audit else hors_audit(t)

    def etiquette(self, obj, s, fs=28, couleur=JAUNE_TITRE, buff=0.18, audit=False, cote=DOWN):
        """L'étiquette de masse sous (ou au-dessus d') un objet. Hors audit par défaut."""
        t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(obj, cote, buff=buff)
        return t if audit else hors_audit(t)


# ── CP (17/11) : objets du quotidien, mains qui soupèsent, Awa la déménageuse ───────────────────
CARTON = "#c08a4a"


def carton(texte=None, s=1.0, couleur=CARTON):
    """Un carton de déménagement fermé (rabats + scotch), étiquette optionnelle (« livres »)."""
    corps = Rectangle(width=1.5 * s, height=1.1 * s, fill_color=couleur, fill_opacity=1, stroke_color="#7c4a1e",
                      stroke_width=3)
    scotch = Rectangle(width=0.26 * s, height=1.1 * s, fill_color="#e7c98f", fill_opacity=1, stroke_width=0).move_to(corps)
    rabat = Line(corps.get_corner(UL), corps.get_corner(UR), color="#7c4a1e", stroke_width=5)
    g = VGroup(corps, scotch, rabat)
    if texte:
        et = RoundedRectangle(width=1.0 * s, height=0.32 * s, corner_radius=0.05 * s, fill_color=WHITE,
                              fill_opacity=1, stroke_width=0).move_to(corps.get_center() + P(0, -0.22 * s))
        g.add(et, hors_audit(Text(texte, font_size=int(18 * s), color="#1f2937", weight=BOLD)).move_to(et))
    return g


def livres(s=1.0):
    """Une pile de trois livres de couleur."""
    g = VGroup()
    for i, (c, w) in enumerate((("#dc2626", 1.3), ("#2563eb", 1.15), ("#16a34a", 1.25))):
        g.add(RoundedRectangle(width=w * s, height=0.26 * s, corner_radius=0.04 * s, fill_color=c, fill_opacity=1,
                               stroke_color=WHITE, stroke_width=1.5).move_to(P(0.05 * (i % 2) * s, i * 0.27 * s)))
    return g


def oreiller(s=1.0):
    """Un oreiller blanc, gonflé, avec ses coins."""
    corps = RoundedRectangle(width=1.7 * s, height=0.95 * s, corner_radius=0.4 * s, fill_color="#f1f5f9",
                             fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    plis = VGroup(*[Line(corps.get_corner(c) + P(dx * s, dy * s), corps.get_corner(c) + P(2.2 * dx * s, 2.2 * dy * s),
                         color="#cbd5e1", stroke_width=2)
                    for c, dx, dy in ((UL, 0.12, -0.12), (UR, -0.12, -0.12), (DL, 0.12, 0.12), (DR, -0.12, 0.12))])
    return VGroup(corps, plis)


def plume(s=1.0):
    """Une plume : tige courbe + barbes."""
    tige = Line(P(-0.55 * s, -0.55 * s), P(0.5 * s, 0.55 * s), color="#e2e8f0", stroke_width=3)
    barbe = Ellipse(width=0.42 * s, height=1.35 * s, fill_color="#f8fafc", fill_opacity=0.95, stroke_color="#cbd5e1",
                    stroke_width=1.5).rotate(-PI / 4).move_to(P(0.05 * s, 0.08 * s))
    return VGroup(barbe, tige)


def dictionnaire(s=1.0):
    """Un gros dictionnaire rouge, épais, posé à plat (tranche blanche)."""
    pages = Rectangle(width=1.5 * s, height=0.55 * s, fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
    couv = RoundedRectangle(width=1.6 * s, height=0.65 * s, corner_radius=0.06 * s, fill_color="#b91c1c",
                            fill_opacity=1, stroke_width=0)
    pages.move_to(couv).shift(RIGHT * 0.05 * s)
    dos = Rectangle(width=0.16 * s, height=0.65 * s, fill_color="#7f1d1d", fill_opacity=1, stroke_width=0)
    dos.move_to(couv.get_left(), aligned_edge=LEFT)
    traits = VGroup(*[Line(P(-0.6 * s, y * s), P(0.72 * s, y * s), color="#cbd5e1", stroke_width=1)
                      .shift(pages.get_center()) for y in (-0.15, 0, 0.15)])
    return VGroup(couv, pages, traits, dos)


def ballon_plage(s=1.0):
    """Un gros ballon de plage à quartiers colorés."""
    r = 0.8 * s
    fond = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    g = VGroup(fond)
    for i, c in enumerate(("#ef4444", "#facc15", "#3b82f6")):
        sect = AnnularSector(inner_radius=0, outer_radius=r, angle=PI / 3, start_angle=PI / 2 + i * 2 * PI / 3,
                             fill_color=c, fill_opacity=1, stroke_width=0)
        g.add(sect.move_arc_center_to(fond.get_center()))
    g.add(Circle(radius=0.16 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(fond))
    g.add(Circle(radius=r, stroke_color="#94a3b8", stroke_width=2, fill_opacity=0).move_to(fond))
    return g


def bille_fer(s=1.0):
    """Une petite bille en fer, grise et brillante."""
    b = Circle(radius=0.2 * s, fill_color="#64748b", fill_opacity=1, stroke_color="#334155", stroke_width=2)
    reflet = Circle(radius=0.06 * s, fill_color=WHITE, fill_opacity=0.9, stroke_width=0)
    reflet.move_to(b.get_center() + P(-0.07 * s, 0.07 * s))
    return VGroup(b, reflet)


def chaise(s=1.0):
    """Une chaise en bois vue de côté."""
    c = BOIS
    assise = Rectangle(width=1.0 * s, height=0.14 * s, fill_color=c, fill_opacity=1, stroke_width=0)
    dossier = Rectangle(width=0.14 * s, height=0.95 * s, fill_color=c, fill_opacity=1, stroke_width=0)
    dossier.next_to(assise, UP, buff=0).align_to(assise, RIGHT)
    pieds = VGroup(*[Rectangle(width=0.12 * s, height=0.8 * s, fill_color=c, fill_opacity=1, stroke_width=0)
                     .next_to(assise, DOWN, buff=0).align_to(assise, cote) for cote in (LEFT, RIGHT)])
    return VGroup(assise, dossier, pieds)


def main_ouverte(s=1.0, peau="#c68642", miroir=False):
    """Une main paume vers le haut (le plateau de la main qui soupèse) : paume + pouce + avant-bras."""
    paume = RoundedRectangle(width=1.1 * s, height=0.34 * s, corner_radius=0.16 * s, fill_color=peau,
                             fill_opacity=1, stroke_width=0)
    pouce = Ellipse(width=0.36 * s, height=0.2 * s, fill_color=peau, fill_opacity=1, stroke_width=0)
    pouce.rotate(0.5).move_to(paume.get_corner(UL) + P(0.05 * s, 0.02 * s))
    doigts = VGroup(*[Line(paume.get_right() + P(-0.06 * s, dy * s), paume.get_right() + P(-0.32 * s, dy * s),
                           color="#7c4a1e", stroke_width=1.5, stroke_opacity=0.6) for dy in (-0.06, 0.06)])
    bras = RoundedRectangle(width=0.4 * s, height=1.2 * s, corner_radius=0.18 * s, fill_color=peau, fill_opacity=1,
                            stroke_width=0).next_to(paume, DOWN, buff=-0.15 * s).shift(RIGHT * 0.25 * s)
    manche = RoundedRectangle(width=0.5 * s, height=0.4 * s, corner_radius=0.1 * s, fill_color="#f97316",
                              fill_opacity=1, stroke_width=0).move_to(bras.get_bottom() + P(0, 0.1 * s))
    g = VGroup(bras, manche, paume, pouce, doigts)
    if miroir:
        g.flip(UP)
    g.paume = paume
    return g


def awa(s=1.0):
    """Awa, déménageuse : salopette orange, casquette verte."""
    p = visage(personne(peau="#8d5524", tenue="#ea580c", cheveux="#111827", s=s))
    p.add(casquette(p, "#16a34a"))
    return p


# ── CP 02 (17/11) : les fruits du primeur, les boîtes fermées, Hugo ─────────────────────────────
def melon(s=1.0):
    """Un melon : rond, vert pâle, côtes."""
    c = Circle(radius=0.55 * s, fill_color="#bef264", fill_opacity=1, stroke_color="#4d7c0f", stroke_width=3)
    cotes = VGroup(*[Arc(radius=0.55 * s, start_angle=PI / 2 - a, angle=2 * a, color="#65a30d", stroke_width=2)
                     .stretch(f, 0).move_to(c) for a, f in ((PI / 2, 0.35), (PI / 2, 0.7))])
    queue = Line(c.get_top(), c.get_top() + P(0.08 * s, 0.15 * s), color="#4d7c0f", stroke_width=4)
    return VGroup(c, cotes, queue)


def ananas(s=1.0):
    """Un ananas : corps jaune-orangé quadrillé + couronne de feuilles."""
    corps = Ellipse(width=0.62 * s, height=0.85 * s, fill_color="#f59e0b", fill_opacity=1, stroke_color="#b45309",
                    stroke_width=2)
    grille = VGroup(*[Line(P(-0.3 * s, y * s), P(0.3 * s, (y + 0.3) * s), color="#b45309", stroke_width=1.5)
                      for y in (-0.35, -0.1, 0.15)], *[Line(P(-0.3 * s, (y + 0.3) * s), P(0.3 * s, y * s),
                                                            color="#b45309", stroke_width=1.5) for y in (-0.35, -0.1, 0.15)])
    grille.move_to(corps)
    feuilles = VGroup(*[Polygon(P(0, 0), P(dx * s - 0.07 * s, 0), P(dx * s * 1.6, h * s), fill_color="#16a34a",
                                fill_opacity=1, stroke_width=0).shift(corps.get_top() + P(0.03 * s, -0.04 * s))
                        for dx, h in ((-0.12, 0.42), (0.04, 0.55), (0.16, 0.4))])
    return VGroup(feuilles, corps, grille)


def pomme(s=1.0, couleur="#dc2626"):
    corps = VGroup(Circle(radius=0.3 * s, fill_color=couleur, fill_opacity=1, stroke_width=0).shift(LEFT * 0.12 * s),
                   Circle(radius=0.3 * s, fill_color=couleur, fill_opacity=1, stroke_width=0).shift(RIGHT * 0.12 * s))
    queue = Line(P(0, 0.22 * s), P(0.04 * s, 0.42 * s), color="#78350f", stroke_width=3)
    feuille = Ellipse(width=0.22 * s, height=0.1 * s, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
    feuille.rotate(0.4).move_to(P(0.16 * s, 0.38 * s))
    return VGroup(corps, queue, feuille)


def agrume(s=1.0, couleur="#f97316", citron=False):
    """Une orange (ronde) ou un citron (ovale, jaune, à bouts)."""
    if citron:
        c = Ellipse(width=0.62 * s, height=0.44 * s, fill_color="#facc15", fill_opacity=1, stroke_color="#ca8a04",
                    stroke_width=2)
        bouts = VGroup(*[Dot(c.get_edge_center(d), radius=0.05 * s, color="#ca8a04") for d in (LEFT, RIGHT)])
        return VGroup(c, bouts)
    c = Circle(radius=0.36 * s, fill_color=couleur, fill_opacity=1, stroke_color="#c2410c", stroke_width=2)
    f = Ellipse(width=0.18 * s, height=0.08 * s, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
    return VGroup(c, f.move_to(c.get_top() + P(0.06 * s, 0.02 * s)))


def boite(s=1.0, couleur="#a78bfa"):
    """Une boîte fermée, avec son couvercle et un ruban : on ne voit pas ce qu'il y a dedans."""
    corps = Rectangle(width=0.9 * s, height=0.7 * s, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2)
    couv = Rectangle(width=1.0 * s, height=0.18 * s, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                     stroke_width=2).next_to(corps, UP, buff=0)
    ruban = Line(couv.get_top(), corps.get_bottom(), color="#fde047", stroke_width=5)
    return VGroup(corps, couv, ruban)


def hugo(s=1.0):
    """Hugo, primeur : chemise verte, tablier marron, cheveux courts."""
    p = visage(personne(peau="#e0ac69", tenue="#16a34a", cheveux="#78350f", s=s))
    p.add(tablier(p, "#92400e"))
    p.add(p.yeux, p.bouche)
    return p


# ── CP 03 (17/11) : Zoé la toiletteuse, ses chiens, les animaux à deviner, les fruits à ranger ──────
def zoe(s=1.0):
    """Zoé, toiletteuse : blouse turquoise, tablier rose, cheveux longs roux."""
    p = visage(personne(peau="#f1c27d", tenue="#14b8a6", cheveux="#b45309", longs=True, s=s))
    p.add(tablier(p, "#f472b6"))
    p.add(p.yeux, p.bouche)
    return p


def chien(s=1.0, couleur="#d97706", oreille="#92400e"):
    """Un chien vu de profil, tourné vers la droite ; s règle sa taille (chiot 0,55, moyen 0,9, gros 1,35)."""
    contour = dict(stroke_color="#451a03", stroke_width=2.5)
    corps = Ellipse(width=1.3 * s, height=0.62 * s, fill_color=couleur, fill_opacity=1, **contour)
    pattes = VGroup(*[RoundedRectangle(corner_radius=0.05 * s, width=0.16 * s, height=0.42 * s, fill_color=couleur,
                                       fill_opacity=1, **contour).move_to(P(x * s, -0.36 * s))
                      for x in (-0.42, -0.2, 0.22, 0.42)])
    tete = Circle(radius=0.3 * s, fill_color=couleur, fill_opacity=1, **contour).move_to(P(0.72 * s, 0.34 * s))
    museau = Ellipse(width=0.3 * s, height=0.2 * s, fill_color="#fde68a", fill_opacity=1, stroke_width=0)
    museau.move_to(P(0.96 * s, 0.26 * s))
    truffe = Dot(P(1.09 * s, 0.29 * s), radius=0.045 * s, color="#111827")
    oeil = Dot(P(0.78 * s, 0.42 * s), radius=0.04 * s, color="#111827")
    oreille_ = Ellipse(width=0.17 * s, height=0.36 * s, fill_color=oreille, fill_opacity=1, stroke_width=0)
    oreille_.rotate(-0.35).move_to(P(0.6 * s, 0.38 * s))
    queue = Line(P(-0.62 * s, 0.1 * s), P(-0.86 * s, 0.42 * s), color=couleur, stroke_width=9 * s)
    return VGroup(queue, pattes, corps, tete, museau, truffe, oeil, oreille_)


def souris(s=1.0):
    """Une souris grise, tournée vers la droite."""
    corps = Ellipse(width=0.62 * s, height=0.36 * s, fill_color="#9ca3af", fill_opacity=1, stroke_color="#4b5563",
                    stroke_width=2)
    oreille_ = Circle(radius=0.11 * s, fill_color="#f9a8d4", fill_opacity=1, stroke_color="#9ca3af",
                      stroke_width=3).move_to(P(0.16 * s, 0.2 * s))
    nez = Dot(P(0.32 * s, 0.0), radius=0.035 * s, color="#ec4899")
    oeil = Dot(P(0.2 * s, 0.06 * s), radius=0.03 * s, color="#111827")
    queue = ArcBetweenPoints(P(-0.3 * s, -0.02 * s), P(-0.62 * s, 0.12 * s), angle=-1.2, color="#f9a8d4",
                             stroke_width=3)
    return VGroup(queue, corps, oreille_, nez, oeil)


def chat(s=1.0, couleur="#fb923c"):
    """Un chat assis, de face : corps en poire, tête ronde, oreilles pointues, queue relevée."""
    contour = dict(stroke_color="#7c2d12", stroke_width=2.5)
    corps = Ellipse(width=0.7 * s, height=0.82 * s, fill_color=couleur, fill_opacity=1, **contour).move_to(P(0, -0.2 * s))
    tete = Circle(radius=0.3 * s, fill_color=couleur, fill_opacity=1, **contour).move_to(P(0, 0.42 * s))
    oreilles = VGroup(*[Polygon(P(x * s, 0.6 * s), P((x + 0.2 * u) * s, 0.62 * s), P((x + 0.06 * u) * s, 0.86 * s),
                                fill_color=couleur, fill_opacity=1, **contour) for x, u in ((-0.24, 1), (0.24, -1))])
    yeux = VGroup(*[Dot(P(x * s, 0.46 * s), radius=0.04 * s, color="#166534") for x in (-0.11, 0.11)])
    nez = Triangle(fill_color="#ec4899", fill_opacity=1, stroke_width=0).scale(0.04 * s).rotate(PI).move_to(P(0, 0.36 * s))
    queue = ArcBetweenPoints(P(0.3 * s, -0.5 * s), P(0.55 * s, 0.15 * s), angle=0.9, color=couleur, stroke_width=10 * s)
    return VGroup(queue, corps, oreilles, tete, yeux, nez)


def cheval(s=1.0, couleur="#92400e"):
    """Un cheval de profil, tourné vers la droite : grand corps, cou, tête, crinière, quatre jambes."""
    contour = dict(stroke_color="#3f1d0b", stroke_width=2.5)
    jambes = VGroup(*[Rectangle(width=0.14 * s, height=0.78 * s, fill_color=couleur, fill_opacity=1, **contour)
                      .move_to(P(x * s, -0.62 * s)) for x in (-0.55, -0.35, 0.38, 0.58)])
    sabots = VGroup(*[Rectangle(width=0.16 * s, height=0.1 * s, fill_color="#1f2937", fill_opacity=1, stroke_width=0)
                      .move_to(j.get_bottom() + UP * 0.05 * s) for j in jambes])
    corps = Ellipse(width=1.65 * s, height=0.7 * s, fill_color=couleur, fill_opacity=1, **contour)
    cou = Polygon(P(0.5 * s, 0.15 * s), P(0.8 * s, 0.85 * s), P(1.02 * s, 0.75 * s), P(0.8 * s, -0.05 * s),
                  fill_color=couleur, fill_opacity=1, **contour)
    tete = Ellipse(width=0.62 * s, height=0.28 * s, fill_color=couleur, fill_opacity=1, **contour)
    tete.rotate(-0.85).move_to(P(1.17 * s, 0.6 * s))  # le museau vers le bas, à droite
    criniere = Polygon(P(0.75 * s, 0.9 * s), P(0.45 * s, 0.25 * s), P(0.58 * s, 0.2 * s), P(0.86 * s, 0.82 * s),
                       fill_color="#1f2937", fill_opacity=1, stroke_width=0)
    oeil = Dot(P(1.04 * s, 0.76 * s), radius=0.035 * s, color="#111827")
    queue = ArcBetweenPoints(P(-0.8 * s, 0.15 * s), P(-1.0 * s, -0.5 * s), angle=0.6, color="#1f2937",
                             stroke_width=12 * s)
    return VGroup(queue, jambes, sabots, corps, cou, tete, criniere, oeil)


def fraise(s=1.0):
    """Une fraise : cœur rouge pointé vers le bas, graines, collerette verte."""
    corps = Polygon(P(-0.2 * s, 0.14 * s), P(0.2 * s, 0.14 * s), P(0.14 * s, -0.12 * s), P(0, -0.26 * s),
                    P(-0.14 * s, -0.12 * s), fill_color="#dc2626", fill_opacity=1, stroke_width=0)
    corps = VGroup(corps, Circle(radius=0.12 * s, fill_color="#dc2626", fill_opacity=1, stroke_width=0)
                   .move_to(P(-0.09 * s, 0.07 * s)),
                   Circle(radius=0.12 * s, fill_color="#dc2626", fill_opacity=1, stroke_width=0).move_to(P(0.09 * s, 0.07 * s)))
    graines = VGroup(*[Dot(P(x * s, y * s), radius=0.014 * s, color="#fde68a")
                       for x, y in ((-0.1, 0.05), (0.08, 0.06), (0, -0.05), (-0.06, -0.12), (0.07, -0.1))])
    col = VGroup(*[Ellipse(width=0.16 * s, height=0.07 * s, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
                   .rotate(a).move_to(P(0.06 * s * np.cos(a), 0.2 * s + 0.03 * s * np.sin(a))) for a in (0, PI / 3, 2 * PI / 3, PI)])
    return VGroup(corps, graines, col)


def pasteque(s=1.0):
    """Une pastèque entière : grosse ellipse verte, rayures foncées."""
    c = Ellipse(width=1.5 * s, height=1.0 * s, fill_color="#16a34a", fill_opacity=1, stroke_color="#14532d",
                stroke_width=3)
    rayures = VGroup(*[Ellipse(width=0.16 * s, height=0.92 * s, stroke_color="#14532d", stroke_width=4)
                       .move_to(P(x * s, 0)) for x in (-0.45, -0.15, 0.15, 0.45)])
    return VGroup(c, rayures)


# ── CP 04 (17/11) : Noé le livreur à vélo, ses colis, les sacs de même taille, les fruits du défi ───────
def noe(s=1.0):
    """Noé, livreur à vélo : gilet jaune, casque de vélo bleu, cheveux courts."""
    p = visage(personne(peau="#8d5524", tenue="#facc15", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    casque = AnnularSector(inner_radius=0, outer_radius=r * 1.12, angle=PI, start_angle=0, fill_color="#2563eb",
                           fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55)
    visiere = RoundedRectangle(width=r * 2.4, height=r * 0.22, corner_radius=r * 0.1, fill_color="#1e3a8a",
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.32)
    p.add(casque, visiere)
    return p


def velo_livreur(s=1.0, couleur="#22c55e"):
    """Un vélo de livreur, de profil : deux roues, cadre, selle, guidon, une caisse à l'arrière."""
    r1 = Circle(radius=0.42 * s, color=WHITE, stroke_width=5).move_to(P(-0.75 * s, 0))
    r2 = Circle(radius=0.42 * s, color=WHITE, stroke_width=5).move_to(P(0.75 * s, 0))
    cadre = VMobject(stroke_color=couleur, stroke_width=6).set_points_as_corners(
        [P(-0.75 * s, 0), P(-0.2 * s, 0.55 * s), P(0.45 * s, 0.55 * s), P(0.75 * s, 0), P(0, 0), P(-0.75 * s, 0)])
    tige = Line(P(0, 0), P(-0.2 * s, 0.55 * s), color=couleur, stroke_width=6)
    selle = Line(P(-0.36 * s, 0.68 * s), P(-0.06 * s, 0.68 * s), color="#1f2937", stroke_width=8)
    guidon = VMobject(stroke_color="#cbd5e1", stroke_width=6).set_points_as_corners(
        [P(0.45 * s, 0.55 * s), P(0.55 * s, 0.85 * s), P(0.75 * s, 0.85 * s)])
    caisse = RoundedRectangle(width=0.62 * s, height=0.48 * s, corner_radius=0.06 * s, fill_color="#f97316",
                              fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(P(-0.82 * s, 0.72 * s))
    return VGroup(r1, r2, cadre, tige, selle, guidon, caisse)


def colis(couleur, s=1.0):
    """Un colis fermé, d'une couleur, avec sa bande adhésive en croix ; tous les colis ont la MÊME taille."""
    corps = RoundedRectangle(width=1.0 * s, height=0.8 * s, corner_radius=0.05 * s, fill_color=couleur,
                             fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    bande = VGroup(Line(corps.get_top(), corps.get_bottom(), color="#fef3c7", stroke_width=6 * s),
                   Line(corps.get_left(), corps.get_right(), color="#fef3c7", stroke_width=6 * s))
    return VGroup(corps, bande)


def sac_plein(contenu, s=1.0):
    """Un sac en toile ouvert en haut, qui laisse voir ce qu'il contient : « plumes » ou « billes ».
    Les deux sacs ont la MÊME taille (la taille ne dit pas la masse)."""
    corps = RoundedRectangle(width=1.1 * s, height=1.2 * s, corner_radius=0.25 * s, fill_color="#d6b98c",
                             fill_opacity=1, stroke_color="#92400e", stroke_width=2)
    bord = Ellipse(width=0.9 * s, height=0.22 * s, fill_color="#92400e", fill_opacity=1, stroke_width=0)
    bord.move_to(corps.get_top() + DOWN * 0.08 * s)
    if contenu == "plumes":
        dedans = VGroup(*[Ellipse(width=0.14 * s, height=0.5 * s, fill_color="#f8fafc", fill_opacity=1,
                                  stroke_color="#cbd5e1", stroke_width=1.5).rotate(a)
                          .move_to(bord.get_center() + P(dx * s, 0.2 * s)) for dx, a in ((-0.24, 0.55), (0, 0), (0.24, -0.55))])
    else:
        dedans = VGroup(*[Circle(radius=0.1 * s, fill_color=c_, fill_opacity=1, stroke_color="#1f2937", stroke_width=1.5)
                          .move_to(bord.get_center() + P(dx * s, dy * s))
                          for dx, dy, c_ in ((-0.22, 0.06, "#60a5fa"), (0, 0.1, "#f87171"), (0.22, 0.06, "#4ade80"),
                                             (-0.11, 0.2, "#facc15"), (0.11, 0.2, "#a78bfa"))])
    return VGroup(corps, bord, dedans)


def prune(s=1.0):
    """Une prune violette, ovale, avec sa queue et une feuille."""
    c = Ellipse(width=0.5 * s, height=0.58 * s, fill_color="#7c3aed", fill_opacity=1, stroke_color="#4c1d95",
                stroke_width=2)
    reflet = Ellipse(width=0.1 * s, height=0.18 * s, fill_color="#c4b5fd", fill_opacity=0.8, stroke_width=0)
    reflet.move_to(c.get_center() + P(-0.12 * s, 0.1 * s))
    queue = Line(c.get_top(), c.get_top() + P(0.04 * s, 0.16 * s), color="#78350f", stroke_width=3)
    feuille = Ellipse(width=0.2 * s, height=0.09 * s, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
    feuille.rotate(0.4).move_to(c.get_top() + P(0.14 * s, 0.12 * s))
    return VGroup(c, reflet, queue, feuille)


def cerise(s=1.0):
    """Une cerise : petite boule rouge, longue queue verte."""
    c = Circle(radius=0.16 * s, fill_color="#dc2626", fill_opacity=1, stroke_color="#7f1d1d", stroke_width=2)
    reflet = Dot(c.get_center() + P(-0.06 * s, 0.06 * s), radius=0.035 * s, color="#fecaca")
    queue = ArcBetweenPoints(c.get_top(), c.get_top() + P(0.14 * s, 0.38 * s), angle=-0.6, color="#15803d",
                             stroke_width=3)
    return VGroup(queue, c, reflet)


# ── CE1 01 (17/11) : Jade la postière, la lettre, la carte postale, le vélo, la clé ─────────────────────
def jade(s=1.0):
    """Jade, postière : veste bleue, casquette jaune, cheveux longs."""
    p = visage(personne(peau="#f1c27d", tenue="#1d4ed8", cheveux="#78350f", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    calotte = AnnularSector(inner_radius=0, outer_radius=r * 1.08, angle=PI, start_angle=0, fill_color="#facc15",
                            fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55)
    visiere = RoundedRectangle(width=r * 1.5, height=r * 0.22, corner_radius=r * 0.1, fill_color="#ca8a04",
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.3 + RIGHT * r * 0.45)
    p.add(calotte, visiere)
    return p


def lettre(s=1.0):
    """Une enveloppe blanche fermée, avec son timbre."""
    corps = Rectangle(width=1.2 * s, height=0.78 * s, fill_color="#f8fafc", fill_opacity=1, stroke_color="#94a3b8",
                      stroke_width=2)
    ul, ur = corps.get_corner(UL), corps.get_corner(UR)
    rabat = VMobject(stroke_color="#94a3b8", stroke_width=2).set_points_as_corners(
        [ul, corps.get_center() + DOWN * 0.08 * s, ur])
    timbre = Rectangle(width=0.2 * s, height=0.24 * s, fill_color="#ef4444", fill_opacity=1, stroke_color=WHITE,
                       stroke_width=1).move_to(ur + P(-0.17 * s, -0.18 * s))
    return VGroup(corps, rabat, timbre)


def carte_postale(s=1.0):
    """Une carte postale : un paysage de plage (ciel, mer, soleil)."""
    corps = Rectangle(width=1.1 * s, height=0.72 * s, fill_color="#7dd3fc", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2)
    mer = Rectangle(width=1.1 * s, height=0.26 * s, fill_color="#0369a1", fill_opacity=1, stroke_width=0)
    mer.align_to(corps, DOWN)
    soleil = Circle(radius=0.11 * s, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    soleil.move_to(corps.get_corner(UR) + P(-0.25 * s, -0.2 * s))
    return VGroup(corps, mer, soleil)


def velo(s=1.0, couleur="#ef4444"):
    """Un vélo de profil, sans caisse."""
    return VGroup(*velo_livreur(s, couleur)[:6])


def cle(s=1.0):
    """Une petite clé dorée : un anneau et une tige à dents."""
    anneau = Annulus(inner_radius=0.09 * s, outer_radius=0.2 * s, fill_color=LAITON, fill_opacity=1, stroke_width=0)
    tige = Rectangle(width=0.5 * s, height=0.08 * s, fill_color=LAITON, fill_opacity=1, stroke_width=0)
    tige.next_to(anneau, RIGHT, buff=-0.02)
    dents = VGroup(*[Rectangle(width=0.06 * s, height=0.1 * s, fill_color=LAITON, fill_opacity=1, stroke_width=0)
                     .next_to(tige, DOWN, buff=0).align_to(tige, RIGHT).shift(LEFT * k * 0.12 * s) for k in (0, 1)])
    return VGroup(anneau, tige, dents)


# ── CE1 02 (17/11) : Liam le vendeur en vrac, ses bocaux, une ardoise d'élève ───────────────────────
def liam(s=1.0):
    """Liam, vendeur en vrac : tee-shirt beige, tablier vert, bonnet orange."""
    p = visage(personne(peau="#a0522d", tenue="#e7d5b5", cheveux="#1f2937", s=s))
    p.add(tablier(p, "#15803d"))
    c, r = p.tete.get_center(), p.tete.width / 2
    bonnet = AnnularSector(inner_radius=0, outer_radius=r * 1.06, angle=PI, start_angle=0, fill_color="#f97316",
                           fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55)
    revers = RoundedRectangle(width=r * 2.2, height=r * 0.3, corner_radius=r * 0.12, fill_color="#ea580c",
                              fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.35)
    p.add(bonnet, revers)
    return p


def bocal(couleur, s=1.0):
    """Un grand bocal de vrac en verre, rempli aux trois quarts (riz : blanc, lentilles : orange…)."""
    verre = RoundedRectangle(width=0.9 * s, height=1.2 * s, corner_radius=0.15 * s, fill_color="#e0f2fe",
                             fill_opacity=0.25, stroke_color="#bae6fd", stroke_width=3)
    dedans = RoundedRectangle(width=0.8 * s, height=0.85 * s, corner_radius=0.12 * s, fill_color=couleur,
                              fill_opacity=1, stroke_width=0).align_to(verre, DOWN).shift(UP * 0.05 * s)
    couv = RoundedRectangle(width=0.7 * s, height=0.16 * s, corner_radius=0.05 * s, fill_color=BOIS, fill_opacity=1,
                            stroke_width=0).next_to(verre, UP, buff=0)
    return VGroup(dedans, verre, couv)


def ardoise(texte, s=1.0, couleur=WHITE):
    """Une ardoise d'élève (cadre bois) avec ce qu'il a écrit."""
    t = hors_audit(Text(texte, font_size=int(34 * s), color=couleur))
    fond = RoundedRectangle(width=t.width + 0.7 * s, height=1.0 * s, corner_radius=0.08 * s, fill_color="#1f3b2c",
                            fill_opacity=1, stroke_color=BOIS, stroke_width=8)
    return VGroup(fond, t.move_to(fond))


def base_commune(ligne):
    """(17/11) Les morceaux d'une ligne() sur la MÊME ligne de base : le bas du premier chiffre (ou de la première
    lettre) de chaque morceau va au niveau de celui du premier morceau ; « + », « = » restent centrés."""
    def repere(m):
        txt = m.text.replace(" ", "") if hasattr(m, "text") else ""
        # (17/11, CE1 05) une lettre SANS jambage (« que », « pèse » : le bas du q ou du p n'est pas la ligne de base)
        for k, ch in enumerate(txt):
            if ch.isalnum() and ch not in "gjpqyQ," and k < len(m.submobjects):
                return m.submobjects[k].get_bottom()[1]
        return None
    y0 = repere(ligne[0])
    for m in ligne[1:]:
        y = repere(m)
        if y is not None and y0 is not None:
            m.shift(UP * (y0 - y))
    return ligne


# ── CE1 03 (17/11) : Chloé la bibliothécaire, les repères (trombone, brique de lait), trousse, cartable, piano ───
def chloe(s=1.0):
    """Chloé, bibliothécaire : gilet violet, lunettes rondes, cheveux longs."""
    p = visage(personne(peau="#e0ac69", tenue="#7c3aed", cheveux="#b45309", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    for dx in (-0.38, 0.38):
        p.add(Circle(radius=r * 0.27, color="#1f2937", stroke_width=3).move_to(c + RIGHT * dx * r + UP * 0.08 * r))
    p.add(Line(c + LEFT * 0.11 * r + UP * 0.08 * r, c + RIGHT * 0.11 * r + UP * 0.08 * r, color="#1f2937", stroke_width=3))
    return p


def trombone_m(s=1.0):
    """Un trombone gris, dessiné en trait."""
    pts = [(-0.1, 0.32), (-0.1, -0.26), (0.02, -0.38), (0.14, -0.26), (0.14, 0.38), (-0.01, 0.53), (-0.16, 0.38),
           (-0.16, -0.34), (0.02, -0.52), (0.2, -0.34), (0.2, 0.2)]
    return VMobject(stroke_color="#cbd5e1", stroke_width=6 * s).set_points_smoothly([P(x * s, y * s) for x, y in pts])


def brique_lait(s=1.0):
    """Une brique de lait de 1 litre : un pavé blanc et bleu, un toit en pointe."""
    corps = Rectangle(width=0.7 * s, height=1.2 * s, fill_color="#f8fafc", fill_opacity=1, stroke_color="#94a3b8",
                      stroke_width=2)
    bande = Rectangle(width=0.7 * s, height=0.4 * s, fill_color="#3b82f6", fill_opacity=1, stroke_width=0).move_to(corps)
    toit = Polygon(corps.get_corner(UL), corps.get_corner(UR), corps.get_top() + UP * 0.28 * s, fill_color="#e2e8f0",
                   fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    goutte = hors_audit(Text("LAIT", font_size=int(16 * s), color=WHITE, weight=BOLD)).move_to(bande)
    return VGroup(corps, bande, toit, goutte)


def petit_livre(s=1.0, couleur="#16a34a"):
    """(17/11) Un petit livre vu de face, debout : couverture, dos plus foncé, tranche des pages, titre."""
    couv = RoundedRectangle(width=0.75 * s, height=1.0 * s, corner_radius=0.05 * s, fill_color=couleur, fill_opacity=1,
                            stroke_color="#14532d", stroke_width=2)
    dos = Rectangle(width=0.1 * s, height=1.0 * s, fill_color="#14532d", fill_opacity=1, stroke_width=0)
    dos.align_to(couv, LEFT)
    tranche = Rectangle(width=0.06 * s, height=0.9 * s, fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
    tranche.next_to(couv, RIGHT, buff=0)
    titre = RoundedRectangle(width=0.45 * s, height=0.22 * s, corner_radius=0.03 * s, fill_color="#f8fafc",
                             fill_opacity=1, stroke_width=0).move_to(couv.get_center() + UP * 0.2 * s + RIGHT * 0.05 * s)
    traits = VGroup(*[Line(LEFT * 0.15 * s, RIGHT * 0.15 * s, color="#14532d", stroke_width=2)
                      .move_to(titre.get_center() + UP * dy * s) for dy in (0.04, -0.04)])
    return VGroup(couv, dos, tranche, titre, traits)


def trousse(s=1.0, couleur="#ec4899"):
    """Une trousse d'écolier (fermeture éclair)."""
    corps = RoundedRectangle(width=1.4 * s, height=0.5 * s, corner_radius=0.22 * s, fill_color=couleur, fill_opacity=1,
                             stroke_color="#9d174d", stroke_width=2)
    eclair = Line(corps.get_left() + RIGHT * 0.2 * s + UP * 0.12 * s, corps.get_right() + LEFT * 0.2 * s + UP * 0.12 * s,
                  color="#fde68a", stroke_width=3)
    tirette = RoundedRectangle(width=0.1 * s, height=0.18 * s, corner_radius=0.03, fill_color="#fde68a", fill_opacity=1,
                               stroke_width=0).move_to(eclair.get_end())
    return VGroup(corps, eclair, tirette)


def cartable(s=1.0, couleur="#2563eb"):
    """Un cartable : le corps, le rabat, la poignée, deux fermoirs."""
    corps = RoundedRectangle(width=1.4 * s, height=1.1 * s, corner_radius=0.12 * s, fill_color=couleur, fill_opacity=1,
                             stroke_color="#1e3a8a", stroke_width=2)
    rabat = RoundedRectangle(width=1.4 * s, height=0.55 * s, corner_radius=0.12 * s, fill_color="#1d4ed8", fill_opacity=1,
                             stroke_color="#1e3a8a", stroke_width=2).align_to(corps, UP)
    poignee = Arc(radius=0.22 * s, start_angle=0, angle=PI, color="#1e3a8a", stroke_width=6).next_to(corps, UP, buff=-0.02)
    ferm = VGroup(*[RoundedRectangle(width=0.14 * s, height=0.2 * s, corner_radius=0.03, fill_color=LAITON, fill_opacity=1,
                                     stroke_width=0).move_to(rabat.get_bottom() + RIGHT * dx * s) for dx in (-0.35, 0.35)])
    return VGroup(corps, rabat, poignee, ferm)


def piano(s=1.0):
    """Un piano droit, noir, avec son clavier."""
    corps = Rectangle(width=1.8 * s, height=1.3 * s, fill_color="#1f2937", fill_opacity=1, stroke_color="#475569", stroke_width=2)
    clav = Rectangle(width=1.8 * s, height=0.22 * s, fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
    clav.move_to(corps.get_center() + DOWN * 0.1 * s)
    noires = VGroup(*[Rectangle(width=0.06 * s, height=0.12 * s, fill_color="#111827", fill_opacity=1, stroke_width=0)
                      .move_to(clav.get_top() + DOWN * 0.06 * s + RIGHT * (-0.8 + 0.2 * k) * s) for k in range(9)])
    pieds = VGroup(*[Rectangle(width=0.12 * s, height=0.3 * s, fill_color="#1f2937", fill_opacity=1, stroke_width=0)
                     .next_to(corps, DOWN, buff=0).shift(RIGHT * dx * s) for dx in (-0.75, 0.75)])
    return VGroup(corps, clav, noires, pieds)


# ── CE1 04 (17/11) : Malo le pêcheur de Saint-Pierre, le panier, les poissons, les crevettes ───
def malo(s=1.0):
    """Malo, pêcheur : ciré jaune, bonnet rouge."""
    p = visage(personne(peau="#8d5524", tenue="#facc15", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    bonnet = AnnularSector(inner_radius=0, outer_radius=r * 1.06, angle=PI, start_angle=0, fill_color="#dc2626",
                           fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55)
    revers = RoundedRectangle(width=r * 2.2, height=r * 0.3, corner_radius=r * 0.12, fill_color="#991b1b",
                              fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.35)
    p.add(bonnet, revers)
    return p


def poisson(s=1.0, couleur="#60a5fa", ventre="#dbeafe"):
    """Un poisson de profil (tête à droite) : corps, ventre clair, queue, œil, nageoire."""
    corps = Ellipse(width=1.4 * s, height=0.6 * s, fill_color=couleur, fill_opacity=1, stroke_color="#1e293b",
                    stroke_width=2)
    bas = Ellipse(width=1.0 * s, height=0.22 * s, fill_color=ventre, fill_opacity=1, stroke_width=0)
    bas.move_to(corps.get_center() + DOWN * 0.13 * s + RIGHT * 0.08 * s)
    queue = Polygon(P(-0.6 * s, 0), P(-0.98 * s, 0.3 * s), P(-0.98 * s, -0.3 * s), fill_color=couleur, fill_opacity=1,
                    stroke_color="#1e293b", stroke_width=2).shift(corps.get_center())
    nag = Polygon(P(-0.1 * s, 0.26 * s), P(0.2 * s, 0.26 * s), P(-0.15 * s, 0.48 * s), fill_color=couleur,
                  fill_opacity=1, stroke_color="#1e293b", stroke_width=2).shift(corps.get_center())
    oeil = VGroup(Circle(radius=0.07 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0),
                  Circle(radius=0.035 * s, fill_color="#111827", fill_opacity=1, stroke_width=0))
    oeil.move_to(corps.get_center() + RIGHT * 0.45 * s + UP * 0.07 * s)
    return VGroup(queue, nag, corps, bas, oeil)


def thon(s=1.0):
    """Un gros thon : bleu foncé, ventre argenté."""
    return poisson(1.3 * s, "#1e3a8a", "#cbd5e1")


def dorade(s=1.0):
    """Une dorade (coryphène) : vert et jaune."""
    return poisson(s, "#16a34a", "#fde047")


def panier(s=1.0, plein=True):
    """Un panier de pêcheur en osier (tressé), vide ou plein de poissons."""
    corps = Polygon(P(-0.85 * s, 0.35 * s), P(0.85 * s, 0.35 * s), P(0.65 * s, -0.55 * s), P(-0.65 * s, -0.55 * s),
                    fill_color="#b45309", fill_opacity=1, stroke_color="#78350f", stroke_width=3)
    tresse = VGroup(*[Line(P(-0.8 * s + 0.04 * k * s, y * s), P(0.8 * s - 0.04 * k * s, y * s), color="#78350f",
                           stroke_width=2) for k, y in enumerate((0.15, -0.05, -0.25, -0.45))])
    bord = RoundedRectangle(width=1.85 * s, height=0.16 * s, corner_radius=0.06 * s, fill_color="#92400e",
                            fill_opacity=1, stroke_width=0).move_to(P(0, 0.37 * s))
    g = VGroup()
    if plein:
        for dx, dy, ang, coul in ((-0.3, 0.48, 0.3, "#60a5fa"), (0.3, 0.5, -0.25, "#f97316"), (0, 0.6, 0.05, "#a3e635")):
            g.add(poisson(0.62 * s, coul).rotate(ang).move_to(P(dx * s, dy * s)))
    return VGroup(g, corps, tresse, bord)


def crevette(s=1.0):
    """Une crevette rose, courbée."""
    corps = Arc(radius=0.3 * s, start_angle=-0.3, angle=PI * 1.1, stroke_color="#fb7185", stroke_width=14 * s)
    tete = Circle(radius=0.11 * s, fill_color="#fb7185", fill_opacity=1, stroke_width=0).move_to(corps.get_end())
    ant = Line(tete.get_center(), tete.get_center() + P(0.35 * s, 0.15 * s), color="#fda4af", stroke_width=2)
    d = corps.get_start()
    queue = Polygon(d, d + P(-0.16 * s, -0.12 * s), d + P(0.02 * s, -0.2 * s), fill_color="#f43f5e", fill_opacity=1,
                    stroke_width=0)
    anneaux = VGroup(*[Line(corps.point_from_proportion(u) + P(0, -0.06 * s), corps.point_from_proportion(u) + P(0, 0.06 * s),
                            color="#be123c", stroke_width=2) for u in (0.3, 0.5, 0.7)])
    return VGroup(corps, queue, anneaux, tete, ant)


def bac_crevettes(s=1.0):
    """Un bac en plastique plein de crevettes."""
    bac = RoundedRectangle(width=2.0 * s, height=0.7 * s, corner_radius=0.1 * s, fill_color="#0ea5e9", fill_opacity=1,
                           stroke_color="#0369a1", stroke_width=3)
    cr = VGroup(*[crevette(0.55 * s).rotate(a).move_to(bac.get_top() + P(x * s, 0.12 * s))
                  for x, a in ((-0.65, 0.3), (-0.2, -0.2), (0.25, 0.4), (0.65, -0.1))])
    return VGroup(cr, bac)


# ── CE1 05 (17/11) : Lina la jongleuse de cirque, ses quilles, ses balles, sa valise ─────────────────────────
def balle(s=1.0, couleur="#ef4444"):
    """Une balle de jonglage : une boule, une bande blanche courbe, un reflet."""
    b = Circle(radius=0.26 * s, fill_color=couleur, fill_opacity=1, stroke_color="#1f2937", stroke_width=2)
    bande = Arc(radius=0.3 * s, start_angle=PI * 0.62, angle=PI * 0.76, stroke_color=WHITE, stroke_width=5 * s)
    bande.move_to(b.get_center() + RIGHT * 0.04 * s)
    reflet = Circle(radius=0.05 * s, fill_color=WHITE, fill_opacity=0.8, stroke_width=0)
    reflet.move_to(b.get_center() + P(-0.11 * s, 0.11 * s))
    return VGroup(b, bande, reflet)


def lina(s=1.0):
    """Lina, jongleuse de cirque : tenue rouge à losanges jaunes, bandeau jaune, trois balles en l'air."""
    p = visage(personne(peau="#a0522d", tenue="#dc2626", cheveux="#111827", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    bandeau = RoundedRectangle(width=r * 2.1, height=r * 0.28, corner_radius=r * 0.12, fill_color="#facc15",
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55)
    corps = p.corps if hasattr(p, "corps") else p
    cc, w = corps.get_center(), corps.width
    losanges = VGroup(*[Square(side_length=w * 0.13, fill_color="#facc15", fill_opacity=1, stroke_width=0)
                        .rotate(PI / 4).move_to(cc + P(dx * w, dy * w)) for dx, dy in ((-0.12, 0.1), (0.12, 0.1), (0, -0.12))])
    jeu = VGroup(*[balle(0.95 * s, k).move_to(c + P(x * s, y * s))
                   for x, y, k in ((-0.7, 0.95, "#3b82f6"), (0.0, 1.2, "#facc15"), (0.7, 0.95, "#22c55e"))])
    p.add(bandeau, losanges, jeu)
    return p


def quille(s=1.0, couleur="#3b82f6"):
    """Une quille de jonglage, debout : le corps renflé, deux bandes blanches, le manche, le bouton."""
    corps = Ellipse(width=0.42 * s, height=0.95 * s, fill_color=couleur, fill_opacity=1, stroke_color="#1f2937",
                    stroke_width=2).move_to(P(0, -0.25 * s))
    b1 = Rectangle(width=0.36 * s, height=0.07 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.05 * s))
    b2 = Rectangle(width=0.4 * s, height=0.07 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.25 * s))
    manche = Rectangle(width=0.12 * s, height=0.5 * s, fill_color=WHITE, fill_opacity=1, stroke_color="#1f2937",
                       stroke_width=2).move_to(P(0, 0.43 * s))
    bouton = Circle(radius=0.09 * s, fill_color=couleur, fill_opacity=1, stroke_color="#1f2937",
                    stroke_width=2).move_to(P(0, 0.72 * s))
    return VGroup(manche, corps, b1, b2, bouton)


QUILLES = ("#3b82f6", "#22c55e", "#f97316", "#a855f7", "#ec4899")


def cinq_quilles(s=1.0, buff=0.12):
    return VGroup(*[quille(s, c) for c in QUILLES]).arrange(RIGHT, buff=buff * s, aligned_edge=DOWN)


def valise(s=1.0, couleur="#7c3aed", texte=None):
    """Une valise de cirque : coque arrondie, poignée, deux sangles, une étoile collée ; étiquette optionnelle."""
    corps = RoundedRectangle(width=2.2 * s, height=1.45 * s, corner_radius=0.18 * s, fill_color=couleur,
                             fill_opacity=1, stroke_color="#1f2937", stroke_width=3)
    poignee = Arc(radius=0.3 * s, start_angle=0, angle=PI, stroke_color="#1f2937", stroke_width=7 * s)
    poignee.next_to(corps, UP, buff=-0.02)
    sangles = VGroup(*[Line(corps.get_top() + RIGHT * x * s, corps.get_bottom() + RIGHT * x * s, color="#4c1d95",
                            stroke_width=6 * s) for x in (-0.6, 0.6)])
    g = VGroup(poignee, corps, sangles)
    if texte:
        et = hors_audit(Text(texte, font_size=int(30 * s), color=WHITE, weight=BOLD)).move_to(corps)
        g.add(et)
    else:
        g.add(Star(5, outer_radius=0.22 * s, inner_radius=0.1 * s, fill_color="#facc15", fill_opacity=1,
                   stroke_width=0).move_to(corps.get_center()))
    return g


# ── CE2 01 (17/11) : Rayan le grutier, la grue, le conteneur, la voiture, la vis, la caisse à outils, le cargo ───
def rayan(s=1.0):
    """Rayan, grutier : gilet orange à bandes, casque de chantier jaune."""
    p = visage(personne(peau="#8d5524", tenue="#f97316", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    casque = AnnularSector(inner_radius=0, outer_radius=r * 1.1, angle=PI, start_angle=0, fill_color="#facc15",
                           fill_opacity=1, stroke_color="#a16207", stroke_width=2).move_to(c + UP * r * 0.6)
    visiere = RoundedRectangle(width=r * 2.6, height=r * 0.22, corner_radius=r * 0.1, fill_color="#eab308",
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.32)
    cc, w = p.corps.get_center(), p.corps.width
    bandes = VGroup(*[Rectangle(width=w * 0.8, height=w * 0.07, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
                      .move_to(cc + UP * dy * w) for dy in (0.05, -0.15)])
    p.add(bandes, casque, visiere)
    return p


def conteneur(s=1.0, couleur="#dc2626", texte=None):
    """Un conteneur de port : une grande boîte ondulée (nervures verticales), deux portes."""
    corps = Rectangle(width=2.4 * s, height=1.0 * s, fill_color=couleur, fill_opacity=1, stroke_color="#450a0a",
                      stroke_width=3)
    nerv = VGroup(*[Line(corps.get_bottom() + RIGHT * x * s + UP * 0.08 * s, corps.get_top() + RIGHT * x * s + DOWN * 0.08 * s,
                         color="#7f1d1d", stroke_width=2) for x in np.arange(-1.0, 1.05, 0.2)])
    g = VGroup(corps, nerv)
    if texte:
        et = hors_audit(Text(texte, font_size=int(34 * s), color=WHITE, weight=BOLD))
        fond = RoundedRectangle(width=et.width + 0.3 * s, height=et.height + 0.2 * s, corner_radius=0.06 * s,
                                fill_color="#111827", fill_opacity=0.85, stroke_width=0).move_to(corps)
        g.add(fond, et.move_to(corps))
    return g


def grue(s=1.0):
    """Une grue de port (portique) : le mât en treillis, la flèche, le câble et le crochet ; renvoie aussi .crochet."""
    jaune = "#f59e0b"
    mat = Rectangle(width=0.35 * s, height=3.4 * s, stroke_color=jaune, stroke_width=4).move_to(P(0, 0))
    treillis = VGroup(*[Line(P(-0.175 * s, y * s), P(0.175 * s, (y + 0.34) * s), color=jaune, stroke_width=2)
                        for y in np.arange(-1.7, 1.4, 0.34)])
    fleche = Rectangle(width=3.2 * s, height=0.25 * s, fill_color=jaune, fill_opacity=1, stroke_width=0)
    fleche.move_to(P(1.2 * s, 1.75 * s))
    cabine = Rectangle(width=0.5 * s, height=0.4 * s, fill_color="#1e3a8a", fill_opacity=1, stroke_width=0)
    cabine.move_to(P(0.3 * s, 1.4 * s))
    socle = Rectangle(width=1.0 * s, height=0.25 * s, fill_color="#374151", fill_opacity=1, stroke_width=0)
    socle.move_to(P(0, -1.82 * s))
    cable = Line(P(2.5 * s, 1.62 * s), P(2.5 * s, 0.5 * s), color="#d1d5db", stroke_width=3)
    crochet = Arc(radius=0.12 * s, start_angle=PI, angle=PI * 1.3, color="#d1d5db", stroke_width=4).move_to(P(2.5 * s, 0.42 * s))
    g = VGroup(mat, treillis, fleche, cabine, socle, cable, crochet)
    g.cable, g.crochet = cable, crochet
    return g


def voiture_m(s=1.0, couleur="#3b82f6"):
    """Une petite voiture de profil."""
    caisse = RoundedRectangle(width=2.0 * s, height=0.55 * s, corner_radius=0.18 * s, fill_color=couleur, fill_opacity=1,
                              stroke_width=0)
    toit = Polygon(P(-0.55 * s, 0.27 * s), P(0.5 * s, 0.27 * s), P(0.3 * s, 0.72 * s), P(-0.35 * s, 0.72 * s),
                   fill_color=couleur, fill_opacity=1, stroke_width=0)
    vitre = Polygon(P(-0.4 * s, 0.32 * s), P(0.38 * s, 0.32 * s), P(0.24 * s, 0.64 * s), P(-0.27 * s, 0.64 * s),
                    fill_color="#bfdbfe", fill_opacity=1, stroke_width=0)
    roues = VGroup(*[Circle(radius=0.22 * s, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                            stroke_width=3).move_to(P(x * s, -0.28 * s)) for x in (-0.6, 0.6)])
    return VGroup(toit, vitre, caisse, roues)


def vis(s=1.0):
    """Une petite vis : tête plate fendue, tige filetée."""
    tete = RoundedRectangle(width=0.5 * s, height=0.14 * s, corner_radius=0.05 * s, fill_color="#9ca3af", fill_opacity=1,
                            stroke_width=0).move_to(P(0, 0.45 * s))
    fente = Line(P(-0.12 * s, 0.45 * s), P(0.12 * s, 0.45 * s), color="#374151", stroke_width=3)
    tige = Polygon(P(-0.09 * s, 0.38 * s), P(0.09 * s, 0.38 * s), P(0.09 * s, -0.3 * s), P(0, -0.48 * s), P(-0.09 * s, -0.3 * s),
                   fill_color="#d1d5db", fill_opacity=1, stroke_width=0)
    filets = VGroup(*[Line(P(-0.11 * s, y * s), P(0.11 * s, (y - 0.06) * s), color="#6b7280", stroke_width=2)
                      for y in np.arange(0.3, -0.3, -0.11)])
    return VGroup(tige, filets, tete, fente)


def caisse_outils(s=1.0):
    """Une caisse à outils rouge, poignée, un marteau qui dépasse."""
    corps = RoundedRectangle(width=1.6 * s, height=0.8 * s, corner_radius=0.08 * s, fill_color="#dc2626", fill_opacity=1,
                             stroke_color="#7f1d1d", stroke_width=3)
    couv = Rectangle(width=1.6 * s, height=0.12 * s, fill_color="#991b1b", fill_opacity=1, stroke_width=0)
    couv.move_to(corps.get_top() + DOWN * 0.12 * s)
    poignee = Arc(radius=0.3 * s, start_angle=0, angle=PI, color="#374151", stroke_width=6).next_to(corps, UP, buff=0)
    manche = Rectangle(width=0.12 * s, height=0.7 * s, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    manche.rotate(-0.5).move_to(corps.get_top() + P(0.55 * s, 0.22 * s))
    tete = Rectangle(width=0.4 * s, height=0.14 * s, fill_color="#6b7280", fill_opacity=1, stroke_width=0)
    tete.rotate(-0.5).move_to(manche.get_center() + P(0.17 * s, 0.3 * s))
    return VGroup(manche, tete, poignee, corps, couv)


def cargo(s=1.0):
    """Un bateau-cargo : coque bleue, château blanc, des conteneurs empilés."""
    coque = Polygon(P(-2.0 * s, 0.2 * s), P(2.2 * s, 0.2 * s), P(1.8 * s, -0.5 * s), P(-1.8 * s, -0.5 * s),
                    fill_color="#1e3a8a", fill_opacity=1, stroke_color="#0f172a", stroke_width=3)
    flot = Rectangle(width=3.7 * s, height=0.1 * s, fill_color="#dc2626", fill_opacity=1, stroke_width=0).move_to(P(0, -0.35 * s))
    chateau = Rectangle(width=0.55 * s, height=0.75 * s, fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
    chateau.move_to(P(-1.5 * s, 0.57 * s))
    boites = VGroup(*[Rectangle(width=0.55 * s, height=0.32 * s, fill_color=c, fill_opacity=1, stroke_color="#0f172a",
                                stroke_width=1).move_to(P(x * s, y * s))
                      for x, y, c in ((-0.8, 0.36, "#dc2626"), (-0.25, 0.36, "#16a34a"), (0.3, 0.36, "#f59e0b"),
                                      (0.85, 0.36, "#3b82f6"), (1.4, 0.36, "#dc2626"), (-0.25, 0.68, "#3b82f6"),
                                      (0.3, 0.68, "#dc2626"), (0.85, 0.68, "#16a34a"))])
    return VGroup(chateau, boites, coque, flot)
