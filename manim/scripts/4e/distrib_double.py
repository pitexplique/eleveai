# distrib_double.py
# EleveAI — Maths 4e — série DISTRIBUTIVITÉ, épisode 02 : la DOUBLE distributivité.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : litteral_distributivite_double.
# Métier : Inès, photographe. Le cadre (passe-partout) de x + 4 sur x + 2, découpé en 4 morceaux.
# Écrans : garde (00) ; Inès et son cadre (01) ; l'aire du rectangle (02) ; les 4 morceaux (03) ;
# réduire (04) ; les 4 flèches (05) ; vérifier x = 10 (06) ; QUESTION 1 (06q, réponse B) ;
# le piège x² + 8 (07) ; un moins : (x − 2)(x + 5) (08) ; QUESTION 2 (08q, réponse C) ;
# défi (09) et correction (09b) ; ce que tu as appris (10) ; fin du 05/11 (11).
# Code couleur : x bleu ; le nombre qui se distribue et ses flèches orange ; juste vert ; piège rouge.
# Voix : manim/voix/4e-distrib-double.json ; marques : distrib_double_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/distrib_double.py DistribDouble4e --media_dir manim/scripts/4e/media-dist-02-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/distrib_double.py DistribDouble4e -o eleveai-maths-4e-distrib-double --media_dir manim/scripts/4e/media-dist-02
# Sortie : manim/sorties/4e/maths/distributivite/02-double/eleveai-maths-4e-distrib-double.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_resoudre_distributivite import BLEU_BLOC  # noqa: E402

PAROLE["²"] = "carré"  # « x au carré » : le ² se pose sur « carré »

BOIS = "#a16207"  # le petit morceau 4 × 2
VIOLET = "#7c3aed"  # le morceau 4x
SARCELLE = "#0f766e"  # le morceau 2x
FACTEUR = OPERATION  # le nombre qui se distribue, et ses flèches
FL_X = CIEL  # les flèches du x


def D(s, fs=56, couleur=WHITE, lettres="x", audit=True):
    """Une expression : la lettre (et son ²) en bleu."""
    e = E(s, fs, couleur, lettres=lettres, audit=audit)
    for i, a in enumerate(e.atomes):
        if a.original_text == "²" and i and e.atomes[i - 1].original_text in (lettres or "#"):
            a.set_color(INCONNUE)
    return e


class Decoupe(VGroup):
    """Le cadre de (x + a) sur (x + b), découpé en 4 morceaux :
    .p[k] (k = "xx", "ax", "xb", "ab"), .bord, .coupes, .dims."""

    COUL = {"xx": BLEU_BLOC, "ax": VIOLET, "xb": SARCELLE, "ab": BOIS}

    def __init__(self, xv=2.6, a=1.4, b=0.7, centre=ORIGIN, **kw):
        super().__init__(**kw)
        W, H = xv + a, xv + b
        tl = P(-W / 2, H / 2)
        self.xv, self.a, self.b = xv, a, b
        self.p = {
            "xx": Rectangle(width=xv, height=xv).move_to(tl + P(xv / 2, -xv / 2)),
            "ax": Rectangle(width=a, height=xv).move_to(tl + P(xv + a / 2, -xv / 2)),
            "xb": Rectangle(width=xv, height=b).move_to(tl + P(xv / 2, -xv - b / 2)),
            "ab": Rectangle(width=a, height=b).move_to(tl + P(xv + a / 2, -xv - b / 2)),
        }
        for r in self.p.values():
            r.set_stroke(WHITE, 2, opacity=0.0).set_fill(WHITE, 0)
        self.bord = Rectangle(width=W, height=H, stroke_color=WHITE, stroke_width=5)
        self.coupes = VGroup(DashedLine(tl + P(xv, 0), tl + P(xv, -H), color=WHITE, stroke_width=3, dash_length=0.12),
                             DashedLine(tl + P(0, -xv), tl + P(W, -xv), color=WHITE, stroke_width=3, dash_length=0.12))
        self.add(*self.p.values(), self.bord)
        c0 = self.get_center()
        self.move_to(centre)
        self.coupes.shift(self.get_center() - c0)  # les coupes ne sont pas dans le groupe

    def remplir(self, k, opacite=0.9):
        return self.p[k].animate.set_fill(self.COUL[k], opacite).set_stroke(WHITE, 2, opacity=1)

    def remplie(self, k, opacite=0.9):
        self.p[k].set_fill(self.COUL[k], opacite).set_stroke(WHITE, 2, opacity=1)
        return self

    def etiquette(self, k, s, fs):
        e = D(s, fs, audit=False).set_color(WHITE)
        r = self.p[k]
        if e.width > r.width - 0.12:
            e.scale_to_fit_width(r.width - 0.12)
        if e.height > r.height - 0.12:
            e.scale_to_fit_height(r.height - 0.12)
        return e.move_to(r)

    def accolade(self, cote, morceaux, s, fs=34, buff=0.14):
        """Une accolade sous (DOWN) ou à gauche (LEFT) des morceaux, et son texte."""
        g = VGroup(*[self.p[k] for k in morceaux])
        br = Brace(g, cote, buff=buff, color=CIEL)
        t = D(s, fs, audit=False)
        t.next_to(br, cote, buff=0.1)
        return VGroup(br, t)


def ines(s=0.78):
    """Inès : un appareil photo dans les mains."""
    m = Metier(["Inès", "photographe"], fs=36, peau="#8d5524", tenue="#be185d", cheveux="#1f1308", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    corps = RoundedRectangle(width=0.62 * s, height=0.4 * s, corner_radius=0.06, fill_color="#334155", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=2)
    corps.move_to(p.tete.get_bottom() + DOWN * 0.42 * s)
    objectif = Circle(radius=0.13 * s, fill_color="#0f172a", fill_opacity=1, stroke_color="#cbd5e1", stroke_width=3).move_to(corps)
    viseur = Rectangle(width=0.2 * s, height=0.09 * s, fill_color="#334155", fill_opacity=1, stroke_width=0).next_to(corps, UP, buff=0).shift(LEFT * 0.12 * s)
    flash = Rectangle(width=0.09 * s, height=0.06 * s, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(corps.get_corner(UR) + P(-0.09, -0.07) * s)
    sangle = Line(p.tete.get_left() + DOWN * 0.3 * s, corps.get_left(), color="#1e293b", stroke_width=3)
    sangle2 = Line(p.tete.get_right() + DOWN * 0.3 * s, corps.get_right(), color="#1e293b", stroke_width=3)
    p.add(sangle, sangle2, viseur, corps, objectif, flash)
    return m


def photo_encadree(W, H, marge=0.38):
    """Le passe-partout crème et la photo (un paysage) au milieu."""
    pp = Rectangle(width=W, height=H, fill_color="#f5efe0", fill_opacity=1, stroke_color=WHITE, stroke_width=5)
    w, h = W - 2 * marge, H - 2 * marge
    ciel = Rectangle(width=w, height=h, fill_color="#38bdf8", fill_opacity=1, stroke_width=0)
    sol = Rectangle(width=w, height=h * 0.3, fill_color="#15803d", fill_opacity=1, stroke_width=0).align_to(ciel, DOWN)
    m1 = Polygon(P(-w / 2, -h * 0.2), P(-w * 0.12, h * 0.25), P(w * 0.2, -h * 0.2), fill_color="#475569", fill_opacity=1, stroke_width=0)
    m2 = Polygon(P(-w * 0.05, -h * 0.2), P(w * 0.25, h * 0.12), P(w / 2, -h * 0.2), fill_color="#64748b", fill_opacity=1, stroke_width=0)
    soleil = Circle(radius=min(w, h) * 0.1, fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(P(w * 0.3, h * 0.3))
    photo = VGroup(ciel, soleil, m1, m2, sol)
    return VGroup(pp, photo)


class DistribDouble4e(PaysageRel):
    nom_voix = "4e-distrib-double"
    fichier_marques = "distrib_double_marques.json"
    ceinture = "orange"

    def fleche_arc(self, a, b, couleur=None, angle=-1.2, sw=5):
        return CurvedArrow(a.get_top() + UP * 0.1, b.get_top() + UP * 0.12, angle=angle, color=couleur or FACTEUR,
                           stroke_width=sw, tip_length=0.16)

    def fleche_bas(self, a, b, couleur=None, angle=1.2, sw=5):
        return CurvedArrow(a.get_bottom() + DOWN * 0.1, b.get_bottom() + DOWN * 0.12, angle=angle, color=couleur or FACTEUR,
                           stroke_width=sw, tip_length=0.16)

    def quatre_fleches(self, e, i1, i2, j1, j2, sw=5):
        """Les 4 flèches de (i1 i2)(j1 j2) : celles du 1er terme dessus, celles du 2e dessous."""
        return [self.fleche_arc(e.atomes[i1], e.atomes[j1], FL_X, -1.6, sw),
                self.fleche_arc(e.atomes[i1], e.atomes[j2], FL_X, -1.15, sw),
                self.fleche_bas(e.atomes[i2], e.atomes[j1], FACTEUR, 1.6, sw),
                self.fleche_bas(e.atomes[i2], e.atomes[j2], FACTEUR, 1.15, sw)]

    def clignoter(self, mobs, k=1.12, fois=2, rt=0.18):
        """Agrandir puis rétrécir, chacun autour de son centre, deux fois."""
        for _ in range(fois):
            self.play(*[m.animate.scale(k) for m in mobs], run_time=rt)
            self.play(*[m.animate.scale(1 / k) for m in mobs], run_time=rt)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La double distributivité", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("La double", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        e = D("(x + 4)(x + 2)", 60, audit=False).move_to(P(-3.5, 0.25))
        p1, p2 = VGroup(*e.atomes[:5]), VGroup(*e.atomes[5:])
        l1 = self.lg("Comment développer", 3.0, 0.8, 42, maxw=6.4)
        self.dit(l1, "Comment développer", avec=[FadeIn(e, shift=UP * 0.2)])
        l2 = self.lg("le produit de", 3.0, 0.0, 42, JAUNE_TITRE, maxw=6.4)
        self.dit(l2, "le produit de")
        l2b = self.lg("deux parenthèses ?", 3.0, -0.75, 46, JAUNE_TITRE, maxw=6.4)
        self.dit(l2b, "deux parenthèses ?")
        self.clignoter([p1, p2], 1.12, 1, 0.22)
        self.insister(l2b, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Inès et son cadre ──────────────────────────────────────────────
    def ecran_photographe(self):
        self.ecran("01-photographe")
        m = ines()
        m.perso.move_to(P(-5.0, 1.4))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.0)
        self.au("Inès", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("photographe", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        fig = Decoupe(2.3, 1.25, 0.62, centre=P(-2.4, -1.1))
        W, H = fig.bord.width, fig.bord.height
        ph = photo_encadree(W, H).move_to(fig.bord)
        ph[1].set_z_index(1)
        l1 = self.lg("Elle encadre une photo", 2.9, 2.65, 40, CIEL, maxw=6.4)
        self.dit(l1, "Elle encadre une photo", avec=[FadeIn(ph[1], scale=0.8)])
        l2 = self.lg("dans un passe-partout.", 2.9, 1.95, 40, CIEL, maxw=6.4)
        self.dit(l2, "dans un passe-partout.", avec=[FadeIn(ph[0], scale=1.1)])
        bas = fig.accolade(DOWN, ("xb", "ab"), "x + 4", 34)
        gau = fig.accolade(LEFT, ("xx", "xb"), "x + 2", 34)
        l3a = self.lg("Le cadre mesure", 2.9, 1.15, 38, maxw=6.4)
        self.dit(l3a, "Le cadre mesure")
        l3 = self.lg("x + 4 centimètres de long,", 2.9, 0.5, 38, lettres="x", maxw=6.4)
        self.dit(l3, "x plus 4 centimètres de long,", avec=[GrowFromCenter(bas[0]), FadeIn(bas[1])])
        l4 = self.lg("et x + 2 centimètres de large.", 2.9, -0.15, 38, lettres="x", maxw=6.4)
        self.dit(l4, "et x plus 2 centimètres de large.", avec=[GrowFromCenter(gau[0]), FadeIn(gau[1])])
        q = self.lg("Quelle est son aire ?", 2.9, -1.4, 48, JAUNE_TITRE, maxw=6.2)
        self.dit(q, "Quelle est son aire ?", avec=[ph[0].animate.set_fill("#fde68a", 1)])
        self.insister(q, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 à 04 : le rectangle, les 4 morceaux, réduire ─────────────────────
    def ecran_rectangle(self):
        self.ecran("02-rectangle")
        fig = Decoupe(2.6, 1.4, 0.7, centre=P(-2.85, -0.55))
        bas = fig.accolade(DOWN, ("xb", "ab"), "x + 4", 36)
        gau = fig.accolade(LEFT, ("xx", "xb"), "x + 2", 36)
        l1 = self.lg("L'aire d'un rectangle,", 2.9, 2.6, 40, CIEL, maxw=6.2)
        self.dit(l1, "L'aire d'un rectangle,", avec=[Create(fig.bord), FadeIn(bas), FadeIn(gau)])
        l2 = self.lg("c'est la longueur", 2.9, 1.9, 38, maxw=6.2)
        self.dit(l2, "c'est la longueur", avec=[bas.animate.set_color(JAUNE_TITRE)])
        l3 = self.lg("fois la largeur.", 2.9, 1.25, 38, maxw=6.2)
        self.dit(l3, "fois la largeur.", avec=[bas.animate.set_color(WHITE), gau.animate.set_color(JAUNE_TITRE)])
        self.play(gau.animate.set_color(WHITE), run_time=0.2)
        for g in (bas, gau):
            g[0].set_color(CIEL)
            g[1].atomes[0].set_color(INCONNUE)
        l4 = self.lg("Ça s'écrit :", 2.9, 0.3, 38, maxw=6.2)
        self.dit(l4, "Ça s'écrit :")
        e = D("(x + 4)(x + 2)", 64).move_to(P(2.9, -0.65))
        self.dire_eq(e, "entre parenthèses x plus 4, fois, entre parenthèses x plus 2.", echelle=1.2)
        ce = self.cadre_ok(e, 0.15).set_color(CIEL)
        self.play(Create(ce), run_time=0.2)
        self.insister(e, 1.1, 0.2)
        self.attendre_voix(marge=0.5)
        self.f = dict(fig=fig, bas=bas, gau=gau, e=e, textes=VGroup(l1, l2, l3, l4, ce))

    def ecran_decouper(self):
        f = self.f
        self.dire("03-decouper")
        fig, e = f["fig"], f["e"]
        self.play(FadeOut(f["textes"]), e.animate.scale(0.75).move_to(P(2.9, 3.1)), run_time=0.4)
        b_x = fig.accolade(DOWN, ("xb",), "x", 34)
        b_4 = fig.accolade(DOWN, ("ab",), "4", 34)
        g_x = fig.accolade(LEFT, ("xx",), "x", 34)
        g_2 = fig.accolade(LEFT, ("xb",), "2", 34, buff=0.14)
        b_4[1].set_color(FACTEUR)
        b_4[0].set_color(FACTEUR)
        l0 = self.lg("Inès découpe le cadre", 2.9, 2.35, 38, maxw=6.2)
        self.dit(l0, "Inès découpe le cadre")
        l1 = self.lg("en 4 morceaux.", 2.9, 1.8, 38, maxw=6.2)
        self.dit(l1, "en 4 morceaux.",
                 avec=[Create(fig.coupes), ReplacementTransform(f["bas"], VGroup(b_x, b_4)),
                       ReplacementTransform(f["gau"], VGroup(g_x, g_2))])
        lignes = [("x × x = x²", "x fois x : x au carré.", "xx", "x²", 64),
                  ("x × 2 = 2x", "x fois 2 : 2 x.", "xb", "2x", 40),
                  ("4 × x = 4x", "4 fois x : 4 x.", "ax", "4x", 46),
                  ("4 × 2 = 8", "4 fois 2 : 8.", "ab", "8", 40)]
        faits, etiq = VGroup(), {}
        for (s, phrase, k, lab, fs), y in zip(lignes, (1.0, 0.25, -0.5, -1.25)):
            c = D(s, 46).mis_sur_egal(2.9, y)
            if s.startswith("4"):
                c.atomes[0].set_color(FACTEUR)
            self.dire_eq(c, phrase, avec=[fig.remplir(k)])
            t = fig.etiquette(k, lab, fs)
            self.play(FadeIn(t, scale=1.3), run_time=0.2)
            faits.add(c)
            etiq[k] = t
        self.attendre_voix(marge=0.5)
        f.update(l1=VGroup(l0, l1), faits=faits, etiq=etiq, acc=VGroup(b_x, b_4, g_x, g_2))

    def ecran_reduire(self):
        f = self.f
        self.dire("04-reduire")
        fig, etiq = f["fig"], f["etiq"]
        self.play(FadeOut(VGroup(f["l1"], f["faits"])), run_time=0.3)
        t = self.lg("En tout :", 2.9, 2.2, 38, CIEL, maxw=6.2)
        self.dit(t, "En tout :")
        s1 = D("x² + 2x + 4x + 8", 50).move_to(P(2.9, 1.45))
        self.dire_eq(s1, "x au carré, plus 2 x, plus 4 x, plus 8.")
        r0 = self.lg("On réduit :", 2.9, 0.5, 38, CIEL, maxw=6.2)
        mil = VGroup(*s1.atomes[3:5], *s1.atomes[6:8])
        self.dit(r0, "On réduit :", avec=[mil.animate.set_color(FACTEUR),
                                          Circumscribe(VGroup(fig.p["xb"], fig.p["ax"]), color=JAUNE_TITRE)])
        r1 = D("2x + 4x = 6x", 46).move_to(P(2.9, -0.25))
        self.dire_eq(r1, "2 x plus 4 x, c'est 6 x.")
        r = self.lg("Résultat : x² + 6x + 8.", 2.9, -1.35, 46, VERT_OK, lettres="", maxw=6.2)
        self.dit(r, "Résultat : x au carré plus 6 x plus 8.")
        cr = self.cadre_ok(r, 0.15)
        self.play(Create(cr), run_time=0.2)
        self.insister(r, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05 : les 4 flèches ──────────────────────────────────────────────────
    def ecran_fleches(self):
        self.ecran("05-fleches")
        tit = self.lg("La méthode :", 0, 3.15, 46, JAUNE_TITRE, maxw=6)
        self.dit(tit, "La méthode :")
        e = D("(x + 4)(x + 2)", 84, audit=False).move_to(P(0, -0.05))
        e.atomes[3].set_color(FACTEUR)
        p1, p2 = VGroup(*e.atomes[:5]), VGroup(*e.atomes[5:])
        l1 = self.lg("chaque terme de la première parenthèse", 0, 2.45, 38, maxw=12)
        self.dit(l1, "chaque terme de la première parenthèse", avec=[FadeIn(e, shift=UP * 0.2)])
        self.play(p1.animate.scale(1.15), run_time=0.18)
        self.play(p1.animate.scale(1 / 1.15), run_time=0.18)
        l2 = self.lg("multiplie chaque terme de la deuxième.", 0, 1.8, 38, maxw=12)
        self.dit(l2, "multiplie chaque terme de la deuxième.")
        self.play(p2.animate.scale(1.15), run_time=0.18)
        self.play(p2.animate.scale(1 / 1.15), run_time=0.18)
        fl = self.quatre_fleches(e, 1, 3, 6, 8, sw=6)
        for a in fl:
            self.play(Create(a), run_time=0.24)
        l3 = self.lg("2 termes × 2 termes = 4 produits.", 0, -1.9, 42, maxw=12)
        self.dit(l3, "2 termes fois 2 termes : 4 produits.")
        l4 = self.lg("4 flèches, rien d'oublié.", 0, -2.7, 46, VERT_OK, maxw=10)
        self.dit(l4, "4 flèches, rien d'oublié.")
        self.clignoter(fl, 1.06, 1, 0.2)
        self.insister(l4, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : vérifier ───────────────────────────────────────────────────────
    def ecran_verifier(self):
        self.ecran("06-verifier")
        g = D("(x + 4)(x + 2) = x² + 6x + 8", 52).sans_audit().mis_sur_egal(-0.3, 2.35)
        self.play(FadeIn(g), run_time=0.3)
        l = self.lg("Vérifions avec x = 10.", 0, 1.1, 40, CIEL, lettres="x", maxw=9)
        self.dit(l, "Vérifions avec x égale 10.")
        ks = (1, 6, 11, 15)
        dix = [T("10", 30, JAUNE_TITRE, audit=False).next_to(g.atomes[k], UP, buff=0.36) for k in ks]
        fl = [Arrow(d.get_bottom(), g.atomes[k].get_top(), buff=0.04, color=JAUNE_TITRE, stroke_width=4,
                    max_tip_length_to_length_ratio=0.4) for d, k in zip(dix, ks)]
        self.play(*[FadeIn(d, shift=DOWN * 0.3) for d in dix], *[GrowArrow(a) for a in fl],
                  *[g.atomes[k].animate.set_color(JAUNE_TITRE) for k in ks], run_time=0.35)
        a = D("14 × 12 = 168", 48).mis_sur_egal(0.6, 0.0)
        self.dire_eq(a, "14 fois 12 : 168.")
        a.atomes[-1].set_color(VERT_OK)
        et = self.lg("Et", -5.0, -0.85, 40, maxw=1)
        self.dit(et, "Et")
        b = D("100 + 60 + 8 = 168", 48).mis_sur_egal(0.6, -0.85)
        self.dire_eq(b, "100 plus 60 plus 8 : 168.")
        b.atomes[-1].set_color(VERT_OK)
        ok = self.lg("C'est juste.", 0, -2.1, 50, VERT_OK, maxw=6)
        self.dit(ok, "C'est juste.", avec=[Create(SurroundingRectangle(a.atomes[-1], color=VERT_OK, buff=0.07, stroke_width=4)),
                                       Create(SurroundingRectangle(b.atomes[-1], color=VERT_OK, buff=0.07, stroke_width=4))])
        self.insister(ok, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 1 (réponse B) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e = D("(x + 5)(x + 1)", 58, audit=False).move_to(P(-3.3, 0.5))
        e.atomes[3].set_color(FACTEUR)

        def avant(sc):
            sc.eq_dans_q(0, "Que donne (x + 5)(x + 1) ?",
                         "Que donne, entre parenthèses x plus 5, fois, entre parenthèses x plus 1 ?", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : x² + 6x + 5.", "Réponse B : x au carré plus 6 x plus 5.", lettres="x", premier=True)
            fl = VGroup(*sc.quatre_fleches(e, 1, 3, 6, 8))
            sc.ph_eq(1, "x + 5x, c'est 6x.", "x plus 5 x, c'est 6 x.", lettres="x", avec=[Create(fl)])
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["Que donne (x + 5)(x + 1) ?"],
                            [Eq("x² + 5", 34), Eq("x² + 6x + 5", 34), Eq("x² + 5x + 5", 34)], 1,
                            ["Réponse B : x² + 6x + 5.", "x + 5x, c'est 6x."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        tit = T("Le piège :", 46, PIEGE, gras=True).move_to(P(-4.9, 3.0))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.25)
        fig = Decoupe(2.8, 1.5, 0.75, centre=P(-3.4, -0.6))
        fig.remplie("xx").remplie("ab")
        e_xx = fig.etiquette("xx", "x²", 60)
        e_ab = fig.etiquette("ab", "8", 36)
        trous = VGroup()
        for k in ("xb", "ax"):
            r = fig.p[k]
            t = DashedVMobject(Rectangle(width=r.width - 0.06, height=r.height - 0.06, stroke_color=PIEGE, stroke_width=4),
                               num_dashes=24).move_to(r)
            trous.add(VGroup(t, T("?", 34, PIEGE, audit=False, gras=True).move_to(r)))
        l = self.lg("écrire x² + 8.", -0.4, 3.0, 46, PIEGE, lettres="", maxw=5)
        self.dit(l, "écrire x au carré plus 8.", avec=[FadeIn(VGroup(fig, e_xx, e_ab))])
        ba = self.barrer(VGroup(*l.atomes[1:]))
        self.play(Create(ba), Create(trous), run_time=0.3)
        l2 = self.lg("On a oublié les deux morceaux", 2.9, 1.5, 38, maxw=6.2)
        self.dit(l2, "On a oublié les deux morceaux")
        l3 = self.lg("du milieu, 2x et 4x !", 2.9, 0.8, 44, PIEGE, lettres="", maxw=6.2)
        e_xb = fig.etiquette("xb", "2x", 38).set_color(WHITE)
        e_ax = fig.etiquette("ax", "4x", 44).set_color(WHITE)
        self.poser_avec(l3, "du milieu, 2 x et 4 x !", {
            3: lambda: [fig.remplir("xb"), FadeOut(trous[0][1]), FadeIn(e_xb)],
            6: lambda: [fig.remplir("ax"), FadeOut(trous[1][1]), FadeIn(e_ax)]})
        mil = [VGroup(fig.p["xb"], trous[0][0], e_xb), VGroup(fig.p["ax"], trous[1][0], e_ax)]
        self.bring_to_front(*mil)
        self.clignoter(mil, 1.12, 2, 0.18)
        l4 = self.lg("Il faut toujours 4 produits.", 2.9, -0.8, 44, JAUNE_TITRE, maxw=6.2)
        self.dit(l4, "Il faut toujours 4 produits.")
        self.insister(l4, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 08 : un moins ───────────────────────────────────────────────────────
    def ecran_moins(self):
        self.ecran("08-moins")
        tit = self.lg("Avec un moins.", 0, 3.15, 46, JAUNE_TITRE, maxw=8)
        self.dit(tit, "Avec un moins.")
        l1 = self.lg("Inès réduit la marge :", -3.6, 2.3, 38, CIEL, maxw=6)
        self.dit(l1, "Inès réduit la marge :")
        e = D("(x − 2)(x + 5)", 64).move_to(P(-3.6, 0.65))
        self.dire_eq(e, "entre parenthèses x moins 2, fois, entre parenthèses x plus 5.", echelle=1.15)
        self.play(VGroup(e.atomes[2], e.atomes[3]).animate.set_color(FACTEUR), run_time=0.12)
        fl = self.quatre_fleches(e, 1, 3, 6, 8)
        fl[2] = self.fleche_bas(VGroup(e.atomes[2], e.atomes[3]), e.atomes[6], FACTEUR, 1.6)
        fl[3] = self.fleche_bas(VGroup(e.atomes[2], e.atomes[3]), e.atomes[8], FACTEUR, 1.15)
        prods = [("x × x = x²", "x fois x : x au carré."),
                 ("x × 5 = 5x", "x fois 5 : 5 x."),
                 ("(−2) × x = −2x", "Moins 2 fois x : moins 2 x."),
                 ("(−2) × 5 = −10", "Moins 2 fois 5 : moins 10.")]
        lignes = []
        for (s, phrase), y, a in zip(prods, (2.3, 1.55, 0.8, 0.05), fl):
            c = D(s, 44).mis_sur_egal(3.5, y)
            if s.startswith("("):
                VGroup(*c.atomes[1:3]).set_color(FACTEUR)
            self.dire_eq(c, phrase, avec=[Create(a)])
            lignes.append(c)
        r0 = self.lg("On réduit :", -1.5, -0.85, 38, CIEL, maxw=3)
        self.dit(r0, "On réduit :", avec=[VGroup(*lignes[1].droite).animate.set_color(JAUNE_TITRE),
                                          VGroup(*lignes[2].droite).animate.set_color(JAUNE_TITRE)])
        r1 = D("5x − 2x = 3x", 46).move_to(P(2.4, -0.85))
        self.dire_eq(r1, "5 x moins 2 x, c'est 3 x.")
        r = self.lg("Résultat : x² + 3x − 10.", 0, -2.1, 50, VERT_OK, lettres="", maxw=9)
        self.dit(r, "Résultat : x au carré plus 3 x moins 10.")
        cr = self.cadre_ok(r, 0.15)
        self.play(Create(cr), run_time=0.2)
        self.insister(r, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 08q : QUESTION 2 (réponse C) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e = D("(x − 3)(x + 4)", 58, audit=False).move_to(P(-3.3, 0.5))
        VGroup(e.atomes[2], e.atomes[3]).set_color(FACTEUR)

        def avant(sc):
            sc.eq_dans_q(0, "Que donne (x − 3)(x + 4) ?",
                         "Que donne, entre parenthèses x moins 3, fois, entre parenthèses x plus 4 ?", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : x² + x − 12.", "Réponse C : x au carré plus x moins 12.", lettres="x", premier=True)
            m3 = VGroup(e.atomes[2], e.atomes[3])
            fl = VGroup(sc.fleche_arc(e.atomes[1], e.atomes[6], FL_X, -1.6), sc.fleche_arc(e.atomes[1], e.atomes[8], FL_X, -1.15),
                        sc.fleche_bas(m3, e.atomes[6], FACTEUR, 1.6), sc.fleche_bas(m3, e.atomes[8], FACTEUR, 1.15))
            sc.ph_eq(1, "4x − 3x, c'est x.", "4 x moins 3 x, c'est x.", lettres="x", avec=[Create(fl)])
            sc.rep_fini()

        self.question_pause("08q-question", "08r-reponse", ["Que donne (x − 3)(x + 4) ?"],
                            [Eq("x² − 12", 34), Eq("x² − x − 12", 34), Eq("x² + x − 12", 34)], 2,
                            ["Réponse C : x² + x − 12.", "4x − 3x, c'est x."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        dv = self.lg("Développe", 0, 1.85, 50, CIEL, maxw=4)
        self.dit(dv, "Développe")
        e = D("(2x + 1)(x + 3)", 72).move_to(P(-0.6, 0.6))
        self.dire_eq(e, "entre parenthèses 2 x plus 1, fois, entre parenthèses x plus 3.", echelle=1.15)
        self.play(e.atomes[4].animate.set_color(FACTEUR), run_time=0.12)
        q = T("= ?", 80, JAUNE_TITRE, audit=False).next_to(e, RIGHT, buff=0.3)
        self.play(FadeIn(q, scale=1.3), run_time=0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.4))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, dv=dv, e=e, q=q, pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 09b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("09b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.0))
        e = d["e"]
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["q"]), FadeOut(d["dv"]),
                e.animate.scale(0.8).move_to(P(-3.7, 0.8)), rt=0.4)
        deux_x = VGroup(e.atomes[1], e.atomes[2])
        fl = [self.fleche_arc(deux_x, e.atomes[7], FL_X, -1.6), self.fleche_arc(deux_x, e.atomes[9], FL_X, -1.15),
              self.fleche_bas(e.atomes[4], e.atomes[7], FACTEUR, 1.6), self.fleche_bas(e.atomes[4], e.atomes[9], FACTEUR, 1.15)]
        prods = [("2x × x = 2x²", "2 x fois x : 2 x au carré."),
                 ("2x × 3 = 6x", "2 x fois 3 : 6 x."),
                 ("1 × x = x", "1 fois x : x."),
                 ("1 × 3 = 3", "1 fois 3 : 3.")]
        for (s, phrase), y, a in zip(prods, (1.95, 1.2, 0.45, -0.3), fl):
            c = D(s, 44).mis_sur_egal(3.4, y)
            if s.startswith("1"):
                c.atomes[0].set_color(FACTEUR)
            self.dire_eq(c, phrase, avec=[Create(a)])
        r = self.lg("Résultat : 2x² + 7x + 3.", 0, -1.75, 56, VERT_OK, lettres="", maxw=10)
        self.dit(r, "Résultat : 2 x au carré plus 7 x plus 3.")
        self.play(Create(self.cadre_ok(r, 0.18)), run_time=0.2)
        self.insister(r, 1.1, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.5)
        fig = Decoupe(2.0, 1.1, 0.55)
        for k in fig.p:
            fig.remplie(k)
        labs = VGroup(fig.etiquette("xx", "x²", 50), fig.etiquette("xb", "2x", 30),
                      fig.etiquette("ax", "4x", 36), fig.etiquette("ab", "8", 30))
        e = D("(x + 4)(x + 2)", 38, audit=False)
        e.atomes[3].set_color(FACTEUR)
        fl = VGroup(*self.quatre_fleches(e, 1, 3, 6, 8, sw=4))
        haut = VGroup(e, fl)
        f2 = VGroup(fig, labs)
        f2.next_to(haut, DOWN, buff=0.45)
        figure = VGroup(haut, f2)
        lignes = self.finale_colonne([["Chaque terme de la", "première parenthèse", "multiplie chaque terme", "de la deuxième."],
                                      ["4 produits,", "puis on réduit."]],
                                     fs=38, figure=figure)
        self.play(FadeIn(figure), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_photographe()
        self.ecran_rectangle()
        self.ecran_decouper()
        self.ecran_reduire()
        self.ecran_fleches()
        self.ecran_verifier()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_moins()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")
