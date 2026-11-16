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
        ang = -penche * 0.32  # rad : 0,32 rad au plus
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
    g = VGroup(corps, plateau, ecran, aff)
    if bouton_tare:
        bt = VGroup(Circle(radius=0.13 * s, fill_color="#f59e0b", fill_opacity=1, stroke_width=0),
                    hors_audit(Text("TARE", font_size=int(10 * s), color="#e2e8f0")))
        bt[0].move_to(corps).shift(RIGHT * 0.75 * s)
        bt[1].next_to(bt[0], RIGHT, buff=0.06)
        g.add(bt)
        g.tare = bt
    g.ecran, g.affichage, g.plateau = ecran, aff, plateau
    return g


def afficher(bal, texte, s=1.0):
    """Le nouvel affichage d'une balance électronique (pour un Transform)."""
    return hors_audit(Text(texte, font_size=int(20 * s), color="#4ade80", weight=BOLD)).move_to(bal.ecran)


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
