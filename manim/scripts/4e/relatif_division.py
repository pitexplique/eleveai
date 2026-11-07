# relatif_division.py
# EleveAI — Maths 4e — série « Relatifs », épisode 04 : DIVISER.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : relatif_division.
# Décor et métier : Nour, biologiste marine. Centre : animaux.
# Écrans (micro relatif_division partout) : garde (00) ; la plongée (01) ; le partage (02) ; le lien (03) ;
# la méthode (04) ; QUESTION 1 (04q) ; combien de temps (05) ; les minutes (06) ; vérifier (07) ;
# le piège (08) ; QUESTION 2 (08q) ; défi (09) et correction (09b) ; ce que tu as appris (10) ; fin (11).
# Voix : manim/voix/4e-relatif-division.json ; marques : relatif_division_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/relatif_division.py RelatifDivision4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/relatif_division.py RelatifDivision4e -o eleveai-maths-4e-relatif-division --media_dir manim/scripts/4e/media-rel-04
# Sortie : manim/sorties/4e/maths/relatifs/04-division/eleveai-maths-4e-relatif-division.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403


def Fr(s, fs=56, c=WHITE, audit=True):
    """Une formule ou une phrase : tout nombre négatif est orange, où qu'il soit dans la ligne."""
    e = E(s, fs, c, lettres="", audit=audit)
    a = e.atomes
    for i, x in enumerate(a):
        if x.original_text == "−" and i + 1 < len(a) and (i == 0 or not (a[i - 1].original_text.isdigit() or a[i - 1].original_text == ")")):
            x.set_color(NEG)
            a[i + 1].set_color(NEG)
    return e


def lr(s, x, y, fs=36, c=WHITE, maxw=6.2):
    """Une ligne de Fr, posée en (x, y), bornée à maxw."""
    e = Fr(s, fs, c)
    if maxw and e.width > maxw:
        e.scale_to_fit_width(maxw)
    return e.move_to(P(x, y))


def ix(e, mot, n=1):
    """L'indice du n-ième atome `mot` de la ligne e."""
    k = [i for i, a in enumerate(e.atomes) if a.original_text == mot]
    return k[n - 1]


def nour(s=0.5):
    """Nour : la combinaison, le masque, la bouteille et les palmes de la biologiste marine."""
    p = personne(peau="#8d5524", tenue="#db2777", cheveux="#111827", longs=True, s=1.0)
    bouteille = RoundedRectangle(width=0.46, height=1.2, corner_radius=0.16, fill_color="#fde047", fill_opacity=1, stroke_color="#854d0e", stroke_width=2)
    bouteille.move_to(P(0.68, -0.98))
    robinet = Rectangle(width=0.16, height=0.16, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).next_to(bouteille, UP, buff=0)
    masque = RoundedRectangle(width=0.68, height=0.3, corner_radius=0.1, fill_color="#a5f3fc", fill_opacity=1, stroke_color="#0f172a", stroke_width=4)
    masque.move_to(p.tete.get_center() + UP * 0.03)
    ceinture_lest = Rectangle(width=1.22, height=0.14, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(0, -1.25))
    palmes = VGroup(*[Polygon(P(x - 0.3, -1.9), P(x + 0.3, -1.9), P(x + 0.46, -2.14), P(x - 0.46, -2.14), fill_color="#22d3ee", fill_opacity=1, stroke_color="#0f172a", stroke_width=2)
                      for x in (-0.42, 0.42)])
    g = VGroup(bouteille, robinet, palmes, p, ceinture_lest, masque).scale(s)
    g.set_z_index(3)
    return g


def tortue(s=1.0, sens=1):
    """Une tortue de mer, vue de côté, qui nage vers la droite (sens=1) ou vers la gauche (sens=-1)."""
    nageoire_av = Polygon(P(0.28, -0.12), P(0.62, -0.62), P(0.02, -0.28), fill_color="#4d7c0f", fill_opacity=1, stroke_color=WHITE, stroke_width=1)
    nageoire_ar = Polygon(P(-0.34, -0.12), P(-0.66, -0.36), P(-0.2, -0.26), fill_color="#4d7c0f", fill_opacity=1, stroke_color=WHITE, stroke_width=1)
    tete = Circle(radius=0.17, fill_color="#a3e635", fill_opacity=1, stroke_color=WHITE, stroke_width=1).move_to(P(0.62, 0.02))
    oeil = Dot(P(0.67, 0.07), radius=0.03, color="#111827")
    carapace = Ellipse(width=1.08, height=0.62, fill_color="#65a30d", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    motif = VGroup(*[RegularPolygon(6, radius=0.11, fill_color="#3f6212", fill_opacity=1, stroke_width=0).move_to(P(x, y)) for x, y in ((-0.26, 0.06), (0.0, 0.1), (0.26, 0.06))])
    g = VGroup(nageoire_ar, nageoire_av, tete, oeil, carapace, motif)
    if sens < 0:
        g.flip(UP)
    g.scale(s)
    g.set_z_index(2)
    return g


class CoupeMer(VGroup):
    """La coupe de mer : le ciel, la surface à 0, l'eau de plus en plus sombre, le sable, et à gauche
    l'échelle des profondeurs. .y(v) le niveau v à l'écran ; .point(v) la place de Nour à ce niveau ;
    .lab[v] l'étiquette de v (hors du groupe, posée au mot) ; .niveau(v) le trait du palier."""

    def __init__(self, fond=-12, pas=4, x0=-6.5, x1=-1.0, y_haut=3.35, y_bas=-3.4, y_surf=2.55, y_niv=-2.05, fs=26, sable=0.6, **kw):
        super().__init__(**kw)
        self.y_surf, self.k = y_surf, (y_surf - y_niv) / (-fond)
        self.ax = x0 + 1.0
        xe = self.ax + 0.1
        self.xe, self.x1 = xe, x1
        L = x1 - xe
        self.xn, self.xf = xe + L * 0.24, xe + L * 0.47
        bande = Rectangle(width=xe - x0, height=y_haut - y_bas, fill_color=FOND_CARTE, fill_opacity=1, stroke_width=0).move_to(P((x0 + xe) / 2, (y_haut + y_bas) / 2))
        ciel = Rectangle(width=L, height=y_haut - y_surf, fill_color="#7dd3fc", fill_opacity=1, stroke_width=0).move_to(P((xe + x1) / 2, (y_haut + y_surf) / 2))
        n = 7
        eau = VGroup()
        for i in range(n):
            h = (y_surf - y_bas) / n
            eau.add(Rectangle(width=L, height=h + 0.01, fill_color=interpolate_color(ManimColor("#0b6a8a"), ManimColor("#0a1f3d"), i / (n - 1)), fill_opacity=1, stroke_width=0)
                    .move_to(P((xe + x1) / 2, y_surf - h * (i + 0.5))))
        soleil = Circle(radius=min(0.22, (y_haut - y_surf) * 0.3), fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(P(x1 - 0.4, y_haut - (y_haut - y_surf) * 0.42))
        vague = ParametricFunction(lambda t: P(t, y_surf + 0.035 * np.sin(t * 9)), t_range=[xe, x1, 0.02], color=WHITE, stroke_width=3)
        # le sable : une ligne un peu bosselée
        ys = y_bas + sable
        haut = [P(xe + L * f, ys + d) for f, d in ((0, 0.04), (0.2, 0.12), (0.45, -0.02), (0.7, 0.1), (1, 0.0))]
        fond_sable = Polygon(P(xe, y_bas), *haut, P(x1, y_bas), fill_color="#b08d57", fill_opacity=1, stroke_width=0)
        algues = VGroup(*[ParametricFunction(lambda t, f=f: P(xe + L * f + 0.07 * np.sin(t * 8), ys + t), t_range=[0, h, 0.02], color="#22c55e", stroke_width=5)
                          for f, h in ((0.07, 0.72), (0.12, 0.5), (0.9, 0.8), (0.95, 0.5))])
        # le bateau de plongée, posé sur la surface
        e = min(1.0, (y_haut - y_surf) / 0.8)
        cx = x1 - 1.35 * e
        coque = Polygon(P(cx - 0.55 * e, y_surf + 0.17 * e), P(cx + 0.55 * e, y_surf + 0.17 * e), P(cx + 0.36 * e, y_surf - 0.1 * e), P(cx - 0.36 * e, y_surf - 0.1 * e), fill_color="#f8fafc", fill_opacity=1, stroke_color="#1e293b", stroke_width=2)
        cabine = Rectangle(width=0.36 * e, height=0.22 * e, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(P(cx - 0.06 * e, y_surf + 0.28 * e))
        # l'échelle : un petit trait par mètre, un grand par palier
        axe = Line(P(self.ax, y_surf), P(self.ax, self.y(fond)), color=WHITE, stroke_width=3)
        traits = VGroup()
        for v in range(0, fond - 1, -1):
            g = v % pas == 0
            traits.add(Line(P(self.ax - (0.2 if g else 0.09), self.y(v)), P(self.ax, self.y(v)), color=WHITE, stroke_width=3 if g else 1.5))
        unite = T("mètres", 20, "#94a3b8", audit=False).move_to(P((x0 + xe) / 2, y_haut - 0.2))
        cadre = Rectangle(width=x1 - x0, height=y_haut - y_bas, stroke_color="#64748b", stroke_width=3).move_to(P((x0 + x1) / 2, (y_haut + y_bas) / 2))
        self.add(bande, ciel, soleil, eau, fond_sable, algues, vague, coque, cabine, axe, traits, unite, cadre)
        self.lab = {}
        for v in range(0, fond - 1, -pas):
            t = T(str(v).replace("-", "−"), fs, NEG if v < 0 else WHITE, audit=False, gras=True)
            t.move_to(P(self.ax - 0.28 - t.width / 2, self.y(v)))
            self.lab[v] = t

    def y(self, v):
        return self.y_surf + self.k * v

    def point(self, v):
        return P(self.xn, self.y(v))

    def niveau(self, v, c="#e2e8f0"):
        return DashedLine(P(self.ax, self.y(v)), P(self.x1 - 0.06, self.y(v)), color=c, stroke_width=2, dash_length=0.12, stroke_opacity=0.7)


def table_div(cote=1.15, centre=ORIGIN):
    """La table des signes, remplie, pour la division : seule la case du coin change."""
    t = TableSignes(cote=cote, centre=centre).remplie()
    coin = t.tetes[0]
    d = T("÷", int(cote * 50), JAUNE_TITRE, audit=False, gras=True).move_to(coin)
    t.tetes.remove(coin)
    t.tetes.add(d)
    return t


class BandeSix(VGroup):
    """Une droite graduée de 6 en 6, de −18 à 0 : .x(v) l'abscisse, .sauts() les trois bonds de −6."""

    def __init__(self, x0=-5.2, x1=4.2, y=-1.95, fs=34, **kw):
        super().__init__(**kw)
        self.x0, self.x1, self.yy = x0, x1, y
        self.add(Line(P(x0 - 0.3, y), P(x1 + 0.3, y), color=WHITE, stroke_width=3))
        self.lab = {}
        for v in (-18, -12, -6, 0):
            self.add(Line(P(self.x(v), y - 0.1), P(self.x(v), y + 0.1), color=WHITE, stroke_width=3))
            t = T(str(v).replace("-", "−"), fs, NEG if v < 0 else WHITE, audit=False).move_to(P(self.x(v), y - 0.42))
            self.lab[v] = t
            self.add(t)

    def x(self, v):
        return self.x1 + v * (self.x1 - self.x0) / 18


class RelatifDivision4e(PaysageRel):
    nom_voix = "4e-relatif-division"
    fichier_marques = "relatif_division_marques.json"
    ceinture = "orange"

    # ── outils de l'épisode ─────────────────────────────────────────────────
    def palier(self, c, n, u, v, tag, label=True):
        """Nour descend de u à v : les animations, avec la flèche et son « −4 » qui restent."""
        fl = Arrow(P(c.xf, c.y(u)), P(c.xf, c.y(v)), color=NEG, buff=0, stroke_width=7, max_tip_length_to_length_ratio=0.3)
        tg = F(tag, 34).sans_audit().next_to(fl, RIGHT, buff=0.1)
        tete = n.get_top()
        bulles = VGroup(*[Circle(radius=r, stroke_color=WHITE, stroke_width=2).move_to(tete + P(dx, dy)) for r, dx, dy in ((0.05, -0.12, 0.02), (0.07, 0.04, 0.1), (0.04, 0.16, 0.0))])
        anims = [n.animate.move_to(c.point(v)), GrowArrow(fl), FadeIn(tg), Create(c.niveau(v))]
        if u < 0:  # sous l'eau seulement : à la surface, les bulles sortiraient du ciel
            anims.append(bulles.animate.shift(UP * 0.5).set_opacity(0))
        if label:
            anims.append(FadeIn(c.lab[v], scale=1.5))
        return anims, fl

    def glisser(self, m, cible, duree):
        """m glisse vers cible pendant que les mots continuent de se poser (à retirer : clear_updaters)."""
        etat = {"t": 0.0}
        dep = m.get_center().copy()

        def maj(mob, dt):
            etat["t"] = min(duree, etat["t"] + dt)
            mob.move_to(dep + (cible - dep) * smooth(etat["t"] / max(duree, 1e-3)))

        m.add_updater(maj)

    def _disposer_q(self, question, choix, phrase):
        """Les cartes se resserrent : la réponse écrite se lit de loin."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.78, about_point=cartes.get_corner(UL))
        pause.next_to(cartes, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        ph.scale_to_fit_width(5.9)
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        ph.next_to(cartes, DOWN, buff=0.18).align_to(P(self.XL, 0), LEFT)
        return tete, q, cartes, pause, rebours, ph

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Diviser des nombres relatifs", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Diviser", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        c = CoupeMer(x0=-6.5, x1=-2.3, y_haut=1.6, y_bas=-1.65, y_surf=1.08, y_niv=-0.9, sable=0.35)
        n = nour(0.42).move_to(c.point(-6))
        t1, t2 = tortue(0.58).move_to(P(c.x1 - 0.85, -0.85)), tortue(0.4, -1).move_to(P(c.x1 - 1.0, 0.1))
        l1 = self.lg("Faut-il apprendre", 2.1, 0.75, 42, maxw=7.4)
        self.dit(l1, "Faut-il apprendre", avec=[FadeIn(c), FadeIn(n), FadeIn(t1), FadeIn(t2)])
        l2 = self.lg("une nouvelle règle ?", 2.1, -0.1, 50, JAUNE_TITRE, maxw=7.4)
        self.dit(l2, "une nouvelle règle ?")
        self.insister(l2, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : la plongée ─────────────────────────────────────────────────────
    def ecran_plongee(self):
        self.ecran("01-plongee")
        c = CoupeMer()
        n = nour().move_to(c.point(0))
        t1, t2 = tortue(0.72).move_to(P(-1.85, -2.0)), tortue(0.5, -1).move_to(P(-1.62, -0.5))
        self.dit(self.lg("Nour est biologiste marine.", 3.1, 3.05, 40, CIEL), "Nour est biologiste marine.", avec=[FadeIn(c), FadeIn(n, shift=UP * 0.2)])
        self.dit(self.lg("Elle plonge pour", 3.1, 2.47, 34), "Elle plonge pour")
        l = self.lg("observer des tortues.", 3.1, 2.0, 34)
        self.poser_avec(l, "observer des tortues.", {ix(l, "tortues"): lambda: [FadeIn(t1, scale=0.5), FadeIn(t2, scale=0.5)]}, rt=0.2)
        self.dit(self.lg("À la surface,", 3.1, 1.42, 34), "À la surface,")
        l = lr("sa position est 0.", 3.1, 0.95, 34)
        self.poser_avec(l, "sa position est zéro.", {ix(l, "0"): lambda: [FadeIn(c.lab[0], scale=1.6), Create(c.niveau(0))]}, rt=0.22)
        self.au_mot("Trois minutes")
        self.glisser(n, c.point(-12), max(0.5, self.t_mot("moins 12") - 0.05))
        self.dit(self.lg("Trois minutes plus tard,", 3.1, 0.37, 34), "Trois minutes plus tard,")
        l = lr("elle est à −12 mètres.", 3.1, -0.1, 34)
        self.poser_avec(l, "elle est à moins 12 mètres.", {ix(l, "12"): lambda: [FadeIn(c.lab[-12], scale=1.6), Create(c.niveau(-12))]}, rt=0.22)
        n.clear_updaters()
        n.move_to(c.point(-12))
        self.dit(self.lg("De combien change", 3.1, -0.68, 34, JAUNE_TITRE), "De combien change")
        self.dit(self.lg("sa position", 3.1, -1.13, 34, JAUNE_TITRE), "sa position", n=2)
        self.dit(self.lg("à chaque minute ?", 3.1, -1.58, 34, JAUNE_TITRE), "à chaque minute ?")
        e = F("(−12) ÷ 3", 60).move_to(P(2.4, -2.62))
        self.dire_eq(e, "Moins 12 divisé par 3.")
        self.insister(e, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : le partage ─────────────────────────────────────────────────────
    def ecran_partage(self):
        self.ecran("02-partage")
        c = CoupeMer()
        n = nour().move_to(c.point(0))
        t1, t2 = tortue(0.72).move_to(P(-1.85, -2.0)), tortue(0.5, -1).move_to(P(-1.62, -0.5))
        self.add(c, n, t1, t2, c.lab[0], c.lab[-12], c.niveau(0), c.niveau(-12))
        xa = c.xf + 0.62
        ac = DoubleArrow(P(xa, c.y(0)), P(xa, c.y(-12)), color="#cbd5e1", buff=0, stroke_width=4, tip_length=0.16)
        tot = T("12 m", 28, "#e2e8f0", audit=False, gras=True).next_to(ac, RIGHT, buff=0.08).shift(UP * 1.2)
        l = self.lg("Les 12 mètres se partagent", 3.1, 3.05, 38, CIEL)
        self.poser_avec(l, "Les 12 mètres se partagent", {ix(l, "12"): lambda: [GrowFromCenter(ac), FadeIn(tot)]}, rt=0.22)
        self.dit(self.lg("en 3 minutes :", 3.1, 2.42, 38, CIEL), "en 3 minutes :")
        xs = (1.0, 3.1, 5.2)
        for k in (1, 2, 3):
            self.au_mot("moins 4", k)
            anims, _ = self.palier(c, n, -4 * (k - 1), -4 * k, "−4", label=k < 3)
            if k == 1:
                anims += [FadeOut(ac), FadeOut(tot)]
            ligne = F("−4", 54).sans_audit().move_to(P(xs[k - 1], 1.5))
            self.play(*anims, FadeIn(ligne, scale=1.3), run_time=0.45)
        e = F("(−12) ÷ 3 = −4", 52).move_to(P(3.1, 0.3))
        self.dire_eq(e, "Moins 12 divisé par 3 égale moins 4")
        self.play(Create(self.cadre_ok(e, 0.18)), run_time=0.2)
        self.dit(self.lg("elle descend de 4 mètres", 3.1, -0.95, 36), "elle descend de 4 mètres")
        self.dit(self.lg("par minute.", 3.1, -1.52, 36), "par minute.")
        self.attendre_voix(marge=0.8)

    # ── 03 : le lien avec la multiplication ─────────────────────────────────
    def ecran_lien(self):
        self.ecran("03-lien")
        self.dit(self.lg("Vérifions avec", -3.3, 3.1, 36, CIEL, maxw=6.2), "Vérifions avec")
        self.dit(self.lg("une multiplication :", -3.3, 2.58, 36, CIEL, maxw=6.2), "une multiplication :")
        e = F("(−4) × 3 = −12", 46).move_to(P(-3.3, 1.97))
        self.dire_eq(e, "moins 4 fois 3 égale moins 12.", echelle=1.1)
        j1, j2 = F("−4", 58).sans_audit().move_to(P(-5.0, 0.3)), F("−12", 58).sans_audit().move_to(P(-1.6, 0.3))
        haut = CurvedArrow(j1.get_top() + UP * 0.08, j2.get_top() + UP * 0.08, angle=-0.7, color=POS, stroke_width=5, tip_length=0.18)
        bas = CurvedArrow(j2.get_bottom() + DOWN * 0.08, j1.get_bottom() + DOWN * 0.08, angle=-0.7, color=VERT_OK, stroke_width=5, tip_length=0.18)
        lh = T("× 3", 32, POS, audit=False, gras=True).move_to(P(-3.3, 1.24))
        lb = T("÷ 3", 32, VERT_OK, audit=False, gras=True).move_to(P(-3.3, -0.7))
        l = self.lg("Diviser, c'est défaire", -3.3, -1.22, 36, maxw=6.0)
        self.poser_avec(l, "Diviser, c'est défaire", {ix(l, "Diviser"): lambda: [FadeIn(j1), FadeIn(j2), Create(haut), FadeIn(lh)],
                                                          ix(l, "défaire"): lambda: [Create(bas), FadeIn(lb)]}, rt=0.28)
        self.dit(self.lg("une multiplication.", -3.3, -1.78, 36, maxw=6.0), "une multiplication.")
        t = TableSignes(cote=1.2, centre=P(3.3, 0.1)).remplie()
        self.dit(self.lg("Donc la division suit", 3.3, 3.1, 36), "Donc la division suit")
        self.dit(self.lg("la même table des signes.", 3.3, 2.58, 36), "la même table des signes.", avec=[FadeIn(t)])
        d = T("÷", 60, JAUNE_TITRE, audit=False, gras=True).move_to(t.tetes[0])
        self.play(Transform(t.tetes[0], d), Flash(t.fond[0], color=JAUNE_TITRE, line_length=0.2), run_time=0.35)
        r = self.lg("Rien de nouveau à apprendre !", -0.4, -2.72, 46, JAUNE_TITRE, maxw=9.6)
        self.dit(r, "Rien de nouveau à apprendre !")
        self.insister(r, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        c = F("(−12) ÷ 3", 66).sans_audit().move_to(P(0, 3.0))
        self.play(FadeIn(c), run_time=0.2)
        self.dit(self.lg("Le signe d'abord :", -3.4, 1.95, 38, JAUNE_TITRE, maxw=6.0), "Le signe d'abord :")
        s1, s2 = signe("−").move_to(P(-5.05, -0.4)), signe("+").move_to(P(-3.85, -0.4))
        l = lr("−12 et 3 ont", -3.4, 1.3, 34)
        self.poser_avec(l, "moins 12 et 3 ont", {ix(l, "12"): lambda: [FadeIn(s1, scale=1.3)], ix(l, "3"): lambda: [FadeIn(s2, scale=1.3)]}, rt=0.2)
        self.dit(self.lg("des signes différents,", -3.4, 0.72, 34, maxw=6.0), "des signes différents,", avec=[Indicate(VGroup(s1, s2), color=WHITE, scale_factor=1.1)])
        fl = Arrow(P(-3.3, -0.4), P(-2.3, -0.4), color=WHITE, buff=0, stroke_width=5)
        s3 = signe("−", 0.42, 60).move_to(P(-1.7, -0.4))
        self.dit(self.lg("le résultat est négatif.", -3.4, -1.3, 34, maxw=6.0), "le résultat est négatif.", avec=[GrowArrow(fl), FadeIn(s3, scale=1.4)])
        self.dit(self.lg("Puis les distances à zéro :", 3.2, 1.95, 36, CIEL), "Puis les distances à zéro :")
        e = F("12 ÷ 3 = 4", 62).move_to(P(3.2, 0.9))
        self.dire_eq(e, "12 divisé par 3, 4.")
        r = F("Résultat : −4.", 58, VERT_OK).move_to(P(3.2, -0.5))
        self.dit(r, "Résultat : moins 4.")
        self.play(Create(self.cadre_ok(r, 0.2)), run_time=0.2)
        self.insister(r, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.2
        fig = VGroup(signe("+", 0.5, 64), T("÷", 66, JAUNE_TITRE, audit=False, gras=True), signe("−", 0.5, 64),
                     T("=", 66, JAUNE_TITRE, audit=False, gras=True), T("?", 84, JAUNE_TITRE, audit=False, gras=True)).arrange(RIGHT, buff=0.3).move_to(P(-3.4, 0.5))
        to = tortue(1.0).move_to(P(-3.4, -1.25))

        def avant(sc):
            sc.eq_dans_q(0, "Que vaut 15 ÷ (−3) ?", "Que vaut 15 divisé par moins 3 ?")
            sc.play(FadeIn(fig), FadeIn(to), run_time=0.35)

        def apres(sc):
            sc.reponse(("Réponse B : −5.", "Réponse B : moins 5."),
                       ("Signes différents, donc négatif.", "Signes différents, donc négatif."),
                       ("Et 15 ÷ 3 = 5.", "Et 15 divisé par 3, 5."))

        self.question_pause("04q-question", "04r-reponse", ["Que vaut 15 ÷ (−3) ?"],
                            [E("5", 40, lettres=""), E("−5", 40, lettres=""), E("12", 40, lettres="")], 1,
                            ["Réponse B : −5.", "Signes différents, donc négatif.", "Et 15 ÷ 3 = 5."], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : combien de temps ? ─────────────────────────────────────────────
    def coupe20(self):
        c = CoupeMer(fond=-20, pas=5)
        n = nour().move_to(c.point(0))
        t1, t2 = tortue(0.8, -1).move_to(P(-1.9, c.y(-20))), tortue(0.5).move_to(P(-1.62, c.y(-10)))
        return c, n, t1, t2

    def ecran_temps(self):
        self.ecran("05-temps")
        c, n, t1, t2 = self.coupe20()
        self.add(c, n, t1, t2, c.lab[0], c.niveau(0))
        self.dit(self.lg("Nour veut maintenant atteindre", 3.1, 3.05, 36, CIEL), "Nour veut maintenant atteindre")
        l = lr("−20 mètres.", 3.1, 2.42, 44)
        self.poser_avec(l, "moins 20 mètres.", {ix(l, "20"): lambda: [FadeIn(c.lab[-20], scale=1.6), Create(c.niveau(-20)), Flash(t1, color=WHITE, line_length=0.18)]}, rt=0.25)
        self.dit(self.lg("Sa position change de", 3.1, 1.6, 34), "Sa position change de")
        fl = Arrow(P(c.xf, c.y(0)), P(c.xf, c.y(-5)), color=NEG, buff=0, stroke_width=7, max_tip_length_to_length_ratio=0.3)
        tg = F("−5", 34).sans_audit().next_to(fl, RIGHT, buff=0.1)
        l = lr("−5 mètres par minute.", 3.1, 1.02, 34)
        self.poser_avec(l, "moins 5 mètres par minute.", {ix(l, "5"): lambda: [GrowArrow(fl), FadeIn(tg), FadeIn(c.lab[-5], scale=1.5)]}, rt=0.22)
        q = T("?", 110, JAUNE_TITRE, audit=False, gras=True).move_to(P(c.xf + 0.15, c.y(-13)))
        self.dit(self.lg("Combien de minutes", 3.1, 0.1, 40, JAUNE_TITRE), "Combien de minutes", avec=[FadeIn(q, scale=0.4)])
        self.dit(self.lg("lui faut-il ?", 3.1, -0.52, 40, JAUNE_TITRE), "lui faut-il ?")
        e = F("(−20) ÷ (−5)", 62).move_to(P(2.3, -2.2))
        self.dire_eq(e, "Moins 20 divisé par moins 5.")
        self.insister(e, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : les minutes ────────────────────────────────────────────────────
    def ecran_minutes(self):
        self.ecran("06-minutes")
        c, n, t1, t2 = self.coupe20()
        self.add(c, n, t1, t2, c.lab[0], c.lab[-20], c.niveau(0), c.niveau(-20))
        self.dit(self.lg("Sur le dessin.", 3.1, 3.05, 40, CIEL), "Sur le dessin.")
        xg = 1.0
        for k, (txt, ph, val) in enumerate((("Une minute : −5.", "Une minute : moins 5.", "5"), ("Deux minutes : −10.", "Deux minutes : moins 10.", "10"),
                                            ("Trois minutes : −15.", "Trois minutes : moins 15.", "15"), ("Quatre minutes : −20.", "Quatre minutes : moins 20.", "20"))):
            l = Fr(txt, 36)
            l.align_to(P(xg, 0), LEFT).set_y(2.32 - 0.56 * k)
            u, v = -5 * k, -5 * (k + 1)
            anims, _ = self.palier(c, n, u, v, "−5", label=v != -20)
            self.poser_avec(l, ph, {ix(l, val): lambda a=anims: a}, rt=0.34)
        self.dit(lr("Il lui faut 4 minutes.", 3.1, -0.02, 40, VERT_OK), "Il lui faut 4 minutes.", avec=[Flash(t1, color=VERT_OK, line_length=0.18)])
        e = F("(−20) ÷ (−5) = 4", 44).move_to(P(3.1, -0.92))
        self.dire_eq(e, "Moins 20 divisé par moins 5 égale 4.", echelle=1.1)
        e.atomes[-1].set_color(VERT_OK)
        self.play(Create(self.cadre_ok(e, 0.16)), run_time=0.2)
        s1, s2 = signe("−", 0.27, 38).move_to(P(-0.55, -1.92)), signe("−", 0.27, 38).move_to(P(-0.55, -2.5))
        l1 = self.lg("Signes identiques :", 2.3, -1.92, 34, maxw=5.0).align_to(P(0.05, 0), LEFT)
        self.dit(l1, "Signes identiques :", avec=[FadeIn(s1), FadeIn(s2)])
        l2 = self.lg("le résultat est positif.", 2.3, -2.5, 34, POS, maxw=5.0).align_to(P(0.05, 0), LEFT)
        self.dit(l2, "le résultat est positif.")
        self.attendre_voix(marge=0.8)

    # ── 07 : on vérifie ─────────────────────────────────────────────────────
    def ecran_verifier(self):
        self.ecran("07-verifier")
        c, n, t1, t2 = self.coupe20()
        n.move_to(c.point(-20))
        self.add(c, t1, t2, *c.lab.values(), *[c.niveau(v) for v in c.lab])
        fl = []
        for k in range(4):
            a = Arrow(P(c.xf, c.y(-5 * k)), P(c.xf, c.y(-5 * (k + 1))), color=NEG, buff=0, stroke_width=7, max_tip_length_to_length_ratio=0.3)
            fl.append(a)
            self.add(a, F("−5", 34).sans_audit().next_to(a, RIGHT, buff=0.1))
        self.add(n)
        self.dit(self.lg("On vérifie :", 3.1, 2.4, 44, CIEL), "On vérifie :")
        e = F("4 × (−5) = −20", 56).move_to(P(3.0, 1.0))
        self.dire_eq(e, "4 fois moins 5, moins 20.", avec=[LaggedStart(*[Indicate(a, color=WHITE, scale_factor=1.08) for a in fl], lag_ratio=0.3, run_time=1.0)])
        r = self.lg("C'est juste.", 3.0, -0.5, 56, VERT_OK)
        self.dit(r, "C'est juste.")
        self.play(Create(self.cadre_ok(r, 0.2)), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 08 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.dit(self.lg("Le piège : croire que deux négatifs", 0, 3.15, 40, PIEGE, maxw=11.5), "Le piège : croire que deux négatifs")
        self.dit(self.lg("donnent un résultat négatif.", 0, 2.55, 40, PIEGE, maxw=11.5), "donnent un résultat négatif.")
        c1 = RoundedRectangle(width=6.0, height=1.3, corner_radius=0.14, stroke_color=PIEGE, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.3, 1.2))
        e1 = F("(−18) ÷ (−6) = −3", 40).move_to(c1)
        self.dire_eq(e1, "Moins 18 divisé par moins 6, ce n'est pas moins 3.", avec=[FadeIn(c1)], echelle=1.1)
        # La rature ne traverse que le chiffre ; le moins passe en rouge avec lui.
        barre = self.barrer(e1.atomes[-1], sw=7)
        self.play(Create(barre), e1.atomes[-2].animate.set_color(PIEGE), e1.atomes[-1].animate.set_color(PIEGE), run_time=0.15)
        c2 = RoundedRectangle(width=6.0, height=1.3, corner_radius=0.14, stroke_color=VERT_OK, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(3.3, 1.2))
        e2 = F("(−18) ÷ (−6) = 3", 40).move_to(c2)
        tete = e2.atomes[:-1]
        for a in tete:
            a._pas_audit = True
        e2.atomes[-1].set_color(VERT_OK)
        self.dire_eq(e2, "C'est 3.", sauf=tete, avec=[FadeIn(c2), *[FadeIn(a) for a in tete]], echelle=1.4)
        d = BandeSix()
        l = Fr("Car 3 × (−6) = −18", 48).move_to(P(-0.4, -0.15))
        arcs = []

        def bonds():
            for k in range(3):
                a = CurvedArrow(P(d.x(-6 * k), d.yy + 0.12), P(d.x(-6 * (k + 1)), d.yy + 0.12), angle=1.1, color=NEG, stroke_width=5, tip_length=0.17)
                t = F("−6", 30).sans_audit().move_to(P((d.x(-6 * k) + d.x(-6 * (k + 1))) / 2, d.yy + 1.0))
                arcs.append(a)
                arcs.append(t)
            return [Create(a) if isinstance(a, CurvedArrow) else FadeIn(a) for a in arcs]

        self.poser_avec(l, "Car 3 fois moins 6, moins 18.", {ix(l, "Car"): lambda: [FadeIn(d)], ix(l, "6"): bonds,
                                                                ix(l, "18"): lambda: [Flash(d.lab[-18], color=NEG, line_length=0.2)]}, rt=0.3)
        self.attendre_voix(marge=0.8)

    # ── 08q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.2
        t = table_div(cote=1.15, centre=P(-3.5, 0.0))

        def avant(sc):
            sc.eq_dans_q(0, "Que vaut (−36) ÷ (−9) ?", "Que vaut moins 36 divisé par moins 9 ?")
            sc.play(FadeIn(t), run_time=0.3)

        def apres(sc):
            sc.reponse(("Réponse B : 4.", "Réponse B : 4."),
                       ("Signes identiques, donc positif.", "Signes identiques, donc positif."),
                       ("Et 4 × (−9) donne bien −36.", "Et 4 fois moins 9 donne bien moins 36."))

        self.question_pause("08q-question", "08r-reponse", ["Que vaut (−36) ÷ (−9) ?"],
                            [E("−4", 40, lettres=""), E("4", 40, lettres=""), E("−45", 40, lettres="")], 1,
                            ["Réponse B : 4.", "Signes identiques, donc positif.", "Et 4 × (−9) donne bien −36."], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        c1 = RoundedRectangle(width=6.0, height=1.8, corner_radius=0.14, stroke_color=NEG, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.3, 0.7))
        c2 = RoundedRectangle(width=6.0, height=1.8, corner_radius=0.14, stroke_color=NEG, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(3.3, 0.7))
        e1, e2 = F("(−24) ÷ 6", 44), F("(−35) ÷ (−7)", 44)
        q1, q2 = T("= ?", 44, JAUNE_TITRE, audit=False), T("= ?", 44, JAUNE_TITRE, audit=False)
        VGroup(e1, q1).arrange(RIGHT, buff=0.25).move_to(c1)
        VGroup(e2, q2).arrange(RIGHT, buff=0.25).move_to(c2)
        self.dire_eq(e1, "Moins 24 divisé par 6.", echelle=1.1, avec=[FadeIn(c1)])
        self.play(FadeIn(q1), run_time=0.12)
        self.dire_eq(e2, "moins 35 divisé par moins 7.", echelle=1.1, avec=[FadeIn(c2)])
        self.play(FadeIn(q2), run_time=0.12)
        to = tortue(1.25).move_to(P(-5.2, -1.75))
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(0.2, -1.75))
        self.au("Mets pause", Write(pz), FadeIn(to, shift=RIGHT * 0.3), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 09b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("09b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.1))), rt=0.25)
        e1 = F("(−24) ÷ 6", 54).move_to(P(-3.3, 2.15))
        e2 = F("(−35) ÷ (−7)", 54).move_to(P(3.3, 2.15))
        self.dire_eq(e1, "Moins 24 divisé par 6 :", echelle=1.1)
        self.dit(self.lg("signes différents,", -3.3, 1.2, 34), "signes différents,", avec=[FadeIn(signe("−").move_to(P(-4.0, 0.45))), FadeIn(signe("+").move_to(P(-2.6, 0.45)))])
        self.dit(self.lg("négatif :", -3.3, -0.35, 34, NEG), "négatif :")
        r1 = F("−4", 80).move_to(P(-3.3, -1.3))
        r1.set_color(VERT_OK)
        self.dire_eq(r1, "moins 4.", echelle=1.4)
        self.play(Create(self.cadre_ok(r1, 0.16)), run_time=0.15)
        self.dire_eq(e2, "Moins 35 divisé par moins 7 :", echelle=1.1)
        self.dit(self.lg("signes identiques,", 3.3, 1.2, 34), "signes identiques,", avec=[FadeIn(signe("−").move_to(P(2.6, 0.45))), FadeIn(signe("−").move_to(P(4.0, 0.45)))])
        self.dit(self.lg("positif :", 3.3, -0.35, 34, POS), "positif :")
        r2 = F("5", 80, VERT_OK).move_to(P(3.3, -1.3))
        self.dire_eq(r2, "5.", n=1, echelle=1.4)
        self.play(Create(self.cadre_ok(r2, 0.16)), run_time=0.15)
        self.attendre_voix(marge=1.0)

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.5)
        self.XL = -1.5
        t = table_div(cote=1.15)
        lignes = self.finale_colonne([["Diviser suit la même règle", "que multiplier."],
                                      ["Deux signes identiques donnent plus."],
                                      ["Deux signes différents donnent moins."],
                                      ["Et pour vérifier, on multiplie."]], fs=38, figure=t)
        self.XL = type(self).XL
        xg = lignes.get_left()[0]  # arrange recentre le groupe : on le remet à droite de la table
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55).align_to(P(xg, 0), LEFT).set_y(t.get_center()[1])
        self.play(FadeIn(t), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_plongee()
        self.ecran_partage()
        self.ecran_lien()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_temps()
        self.ecran_minutes()
        self.ecran_verifier()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")
