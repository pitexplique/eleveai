# ident_defi.py
# EleveAI — Maths 4e — série IDENTITÉS REMARQUABLES, épisode 05 : les ERREURS des identités (défi).
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : litteral_identite_defi (tous les écrans).
# Métier : Aya, ingénieure en intelligence artificielle (un correcteur automatique qui lit des copies).
# Centres : technologie-ia, sciences.
# Mapping micro → écrans (litteral_identite_defi) :
#   garde, la copie fausse (x + 5)² = x² + 25 (00) ; Aya et l'écran du correcteur (01) ;
#   le test numérique gauche / droite pour x = 1 : 36 ≠ 26 (02) ;
#   erreur 1, le double produit oublié : le carré découpé et ses deux bandes (03) ; QUESTION 1 (03q, réponse C) ;
#   erreur 2, le signe : (x − 3)², − × − = + (04) ; erreur 3, (x − 3)² et (x − 3)(x + 3) (05) ;
#   QUESTION 2, le test x = 5 (05q, réponse B) ; défi (2x + 1)² (06) et correction, le carré de 2x (06b) ;
#   ce que tu as appris (07) ; fin commune (08, fin_commune.ecran_fin).
# Code couleur (celui des séries distributivité / factorisation) : x bleu ; carré découpé : a² bleu,
# bandes a·b ORANGE (le double produit), b² violet ; juste vert ; faux rouge (tampon « FAUX »).
# Voix : manim/voix/4e-identites-defi.json (validée) ; marques : ident_defi_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/ident_defi.py IdentDefi4e --media_dir manim/scripts/4e/media-ident-05-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/ident_defi.py IdentDefi4e -o eleveai-maths-4e-identites-defi --media_dir manim/scripts/4e/media-ident-05
# Sortie : manim/sorties/4e/maths/identites/05-defi/eleveai-maths-4e-identites-defi.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, Feuille, encre  # noqa: E402
from equation_resoudre_distributivite import BLEU_BLOC  # noqa: E402
from frac_lotc_commun import lunettes  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

PAROLE["²"] = "carré"

BANDE = OPERATION  # les bandes a·b : le double produit
CARRE_A = BLEU_BLOC
CARRE_B = "#7c3aed"
COUL = [CARRE_A, BANDE, BANDE, CARRE_B]
GAUCHE_C = CIEL
DROITE_C = "#c4b5fd"
GAUCHE_ENCRE = "#2563eb"  # les mêmes, foncées, sur le papier
DROITE_ENCRE = "#7c3aed"
ECRAN_F = "#0f172a"


def D(s, fs=56, couleur=WHITE, lettres="x", audit=True):
    """Une expression : x en bleu."""
    return E(s, fs, couleur, lettres=lettres, audit=audit)


class Carre(VGroup):
    """Le carré découpé de côté a + b : .cases = [a², bande a·b (droite), bande a·b (bas), b²],
    .haut / .gauche : les côtés (données de figure, hors audit). Les cases naissent vides."""

    def __init__(self, a, b, coin, cotes=("x", "5"), fs_cote=32, lettres="x", **kw):
        super().__init__(**kw)
        x0, y0 = coin

        def r(w, h, cx, cy):
            return Rectangle(width=w, height=h, stroke_color=WHITE, stroke_width=3, fill_opacity=0).move_to(P(cx, cy))

        self.cases = VGroup(r(a, a, x0 + a / 2, y0 - a / 2), r(b, a, x0 + a + b / 2, y0 - a / 2),
                            r(a, b, x0 + a / 2, y0 - a - b / 2), r(b, b, x0 + a + b / 2, y0 - a - b / 2))
        ca, cb = cotes
        self.haut = VGroup(E(ca, fs_cote, lettres=lettres, audit=False).move_to(P(x0 + a / 2, y0 + 0.3)),
                           E(cb, fs_cote, lettres=lettres, audit=False).move_to(P(x0 + a + b / 2, y0 + 0.3)))
        g1 = E(ca, fs_cote, lettres=lettres, audit=False)
        g2 = E(cb, fs_cote, lettres=lettres, audit=False)
        g1.move_to(P(x0 - 0.14 - g1.width / 2, y0 - a / 2))
        g2.move_to(P(x0 - 0.14 - g2.width / 2, y0 - a - b / 2))
        self.gauche = VGroup(g1, g2)
        self.add(self.cases, self.haut, self.gauche)

    def remplir(self, i, op=0.75):
        return self.cases[i].animate.set_fill(COUL[i], op)

    def bandes(self):
        return VGroup(self.cases[1], self.cases[2])

    def dans(self, i, s, fs=34, lettres="x", audit=False):
        e = E(s, fs, lettres=lettres, audit=audit)
        c = self.cases[i]
        k = min(1.0, c.width * 0.8 / e.width, c.height * 0.8 / e.height)
        return e.scale(k).move_to(c)


def tampon(s, couleur, fs=40, angle=0.18):
    """Le tampon du correcteur : « FAUX » rouge, « JUSTE » vert."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD)
    t.sans_synchro = True
    c = RoundedRectangle(width=t.width + 0.45, height=t.height + 0.32, corner_radius=0.1, stroke_color=couleur,
                         stroke_width=6).move_to(t)
    return VGroup(c, t).rotate(angle)


def ecran_ia(w=6.4, h=2.8, titre="Correcteur IA", fs=24):
    """L'écran du correcteur automatique : cadre, bandeau (trois points, titre, puce), pied."""
    cadre = RoundedRectangle(width=w, height=h, corner_radius=0.14, fill_color=ECRAN_F, fill_opacity=1,
                             stroke_color="#64748b", stroke_width=5)
    bande = RoundedRectangle(width=w - 0.14, height=0.42, corner_radius=0.08, fill_color="#1e293b", fill_opacity=1,
                             stroke_width=0).align_to(cadre, UP).shift(DOWN * 0.07)
    pts = VGroup(*[Dot(radius=0.055, color=c) for c in ("#ef4444", "#fbbf24", "#22c55e")]).arrange(RIGHT, buff=0.09)
    pts.move_to(bande).align_to(bande, LEFT).shift(RIGHT * 0.18)
    lab = T(titre, fs, CIEL).move_to(bande)
    puce = Square(0.24, fill_color="#334155", fill_opacity=1, stroke_color=CIEL, stroke_width=2)
    pattes = VGroup(*[Line(P(-0.17, d), P(0.17, d), color=CIEL, stroke_width=2) for d in (-0.06, 0.06)])
    pattes.add(*[Line(P(d, -0.17), P(d, 0.17), color=CIEL, stroke_width=2) for d in (-0.06, 0.06)])
    chip = VGroup(pattes, puce).move_to(bande).align_to(bande, RIGHT).shift(LEFT * 0.22)
    pied = Polygon(P(-0.3, 0), P(0.3, 0), P(0.5, -0.34), P(-0.5, -0.34), fill_color="#475569", fill_opacity=1,
                   stroke_width=0).next_to(cadre, DOWN, buff=0)
    g = VGroup(pied, cadre, bande, pts, lab, chip)
    g.cadre, g.bande = cadre, bande
    return g


def pilule(s, couleur, fs=34):
    """Une parenthèse dessinée en pilule (donnée de figure)."""
    e = D(s, fs, audit=False)
    r = RoundedRectangle(width=e.width + 0.45, height=0.66, corner_radius=0.3, stroke_color=couleur, stroke_width=4,
                         fill_color="#0b1220", fill_opacity=1).move_to(e)
    g = VGroup(r, e)
    g.e = e
    return g


def aya(s=0.78):
    """Aya, ingénieure en IA : lunettes, un badge « IA » sur la veste."""
    m = Metier(["Aya", "ingénieure en IA"], fs=28, peau="#8d5524", tenue="#6d28d9", cheveux="#111827", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    badge = RoundedRectangle(width=0.36 * s, height=0.26 * s, corner_radius=0.04, fill_color="#e2e8f0", fill_opacity=1,
                             stroke_width=0).move_to(p.corps.get_center() + P(0.22, 0.35) * s)
    ia = T("IA", int(18 * s), "#1e293b", gras=True).move_to(badge)
    p.add(lunettes(p), badge, ia)
    return m


class IdentDefi4e(PaysageRel):
    nom_voix = "4e-identites-defi"
    fichier_marques = "ident_defi_marques.json"
    ceinture = "verte"

    def cadre(self, m, couleur=CIEL, buff=0.12):
        return SurroundingRectangle(m, color=couleur, buff=buff, stroke_width=3, corner_radius=0.08)

    def dit_avec(self, e, phrase, gestes, n=1, rt=0.12):
        """Comme dit (sans zoom), mais l'atome i joue en plus ses animations gestes[i]()."""
        debut = -1
        for _ in range(n):
            debut = self._texte_voix.find(phrase, debut + 1)
        if debut < 0:
            raise ValueError(f"« {phrase} » absent de la voix {self._cle_voix}")
        lots = self._plan_eq(e, debut, debut + len(phrase))
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = rt
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(rt, gap - 0.01))
            ex = []
            for a in atomes:
                f = gestes.get(e.atomes.index(a))
                if f:
                    ex += f()
            self.play(*[FadeIn(a) for a in atomes], *ex, run_time=max(d, 0.18) if ex else d)

    def _carte_choix(self, lettre, txt, largeur, fs):
        """Des cartes plus larges quand les choix sont de longues égalités (self._w_cartes)."""
        w = getattr(self, "_w_cartes", None)
        return super()._carte_choix(lettre, txt, w or largeur, fs)

    def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="xytn", couleur=WHITE):
        """Comme le module commun, mais en E (sans ligature)."""
        ref = self.q_q[i]
        e = E(s, fs or 34, couleur=couleur, lettres=lettres)
        e.scale_to_fit_height(ref.height).move_to(ref).align_to(ref, LEFT)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        return e

    def finale_colonne(self, textes, fs=38, figure=None):
        """Celle de facto_defi : un interligne RÉGULIER, la coche centrée sur la première ligne."""
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        if figure is not None:
            self.cadrer(figure, droite=self.XL - 0.3, haut=tit.get_bottom()[1] - 0.25)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in textes:
            ts = [self.t(x, fs) for x in morceaux]
            pas = max(t.height for t in ts) + 0.1
            for k, t in enumerate(ts):
                t.align_to(P(0, -k * pas), UP).align_to(P(0, 0), LEFT)
            bloc = VGroup(*ts)
            c = self.coche()
            c.next_to(ts[0], LEFT, buff=0.25).set_y(ts[0].get_center()[1])
            lignes.add(VGroup(c, bloc))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        xl = self.XL if figure is None else min(self.XL, figure.get_right()[0] + 0.45)
        largeur = self.BORD_X - 0.05 - xl
        if lignes.width > largeur:
            lignes.scale_to_fit_width(largeur)
        if lignes.height > 4.3:
            lignes.scale_to_fit_height(4.3)
        lignes.align_to(P(xl, 0), LEFT).align_to(P(0, 2.45), UP)
        return lignes

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("(a + b)² = a² + b² ? Faux !", self.identite, self.ceinture, y_ech=-2.65)
        t1 = self.t("(a + b)² = a² + b² ?", 54, JAUNE_TITRE)
        t2 = self.t("Faux !", 54, PIEGE)
        tt = VGroup(t1, t2).arrange(RIGHT, buff=0.35).move_to(titre)
        if tt.width > 12.5:
            tt.scale_to_fit_width(12.5)
        for m in (t1, t2, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Les erreurs", Write(tt), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        copie = Feuille(5.4, 1.5).move_to(P(-3.5, 0.3))
        e = encre("(x + 5)² = x² + 25", 44, lettres="x").move_to(copie.get_center() + RIGHT * 0.2)
        self.dire_eq(e, "x plus 5, au carré, égale x au carré plus 25 ?", echelle=1.15, avec=[FadeIn(copie)])
        tp = tampon("FAUX", PIEGE, 44).move_to(P(0.75, 0.35))
        self.au("Faux !", FadeIn(tp, scale=1.6), rt=0.3)
        l = self.lg("Voici pourquoi.", 4.0, 0.3, 46, JAUNE_TITRE, maxw=4.6)
        self.dit(l, "Voici pourquoi.")
        self.insister(l, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Aya et le correcteur automatique ───────────────────────────────
    def ecran_ingenieure(self):
        self.ecran("01-ingenieure")
        m = aya()
        m.perso.move_to(P(-5.0, 0.55))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.0)
        self.au("Aya", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("ingénieure", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        ec = ecran_ia(6.6, 2.85).move_to(P(1.3, -0.2))
        l1 = self.lg("Elle apprend à un correcteur automatique", 1.3, 2.95, 36, maxw=9.0)
        self.dit(l1, "Elle apprend à un correcteur automatique", avec=[FadeIn(ec, shift=UP * 0.2)])
        l2 = self.lg("à repérer les erreurs des élèves.", 1.3, 2.35, 36, CIEL, maxw=9.0)
        self.dit(l2, "à repérer les erreurs des élèves.")
        zone_y = ec.bande.get_bottom()[1]
        s = self.lg("Sur une copie :", 1.3, zone_y - 0.35, 30, maxw=5)
        copie = Feuille(5.0, 1.15).move_to(P(1.1, zone_y - 1.3))
        self.dit(s, "Sur une copie :", avec=[FadeIn(copie, shift=UP * 0.15)])
        e = encre("(x + 5)² = x² + 25", 40, lettres="x").move_to(copie.get_center() + RIGHT * 0.15)
        self.dire_eq(e, "x plus 5, au carré, égale x au carré plus 25.", echelle=1.15)
        q = self.lg("Comment le correcteur sait-il que c'est faux ?", 0.2, -2.72, 40, JAUNE_TITRE, maxw=9.4)
        pt = T("?", 64, JAUNE_TITRE, gras=True, audit=False).move_to(P(4.2, copie.get_y()))
        self.dit(q, "Comment le correcteur sait-il que c'est faux ?")
        self.play(FadeIn(pt, scale=1.4), run_time=0.25)
        self.insister(pt, 1.25, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 02 : le test numérique, gauche / droite ─────────────────────────────
    def ecran_test(self):
        self.ecran("02-test")
        copie = Feuille(6.4, 1.05).move_to(P(-0.4, 1.95))
        r = encre("(x + 5)² = x² + 25", 44, lettres="x").sans_audit().move_to(copie.get_center() + RIGHT * 0.15)
        l0 = self.lg("Il teste avec un nombre.", -3.0, 3.05, 40, CIEL, maxw=7.0)
        self.dit(l0, "Il teste avec un nombre.", avec=[FadeIn(copie), FadeIn(r)])
        px = self.lg("Pour x = 1.", 3.6, 3.05, 42, lettres="x", maxw=4.6)
        self.dit(px, "Pour x égale 1.")
        pg = RoundedRectangle(width=5.7, height=2.2, corner_radius=0.14, stroke_color=GAUCHE_C, stroke_width=4)
        pd = pg.copy().set_stroke(DROITE_C)
        pg.move_to(P(-3.35, -0.05))
        pd.move_to(P(3.35, -0.05))
        gauche = VGroup(*r.atomes[:6])
        droite = VGroup(*r.atomes[7:])
        hg = self.lg("À gauche :", -3.35, 0.68, 36, GAUCHE_C, maxw=5)
        self.dit(hg, "À gauche :", avec=[Create(pg), gauche.animate.set_color(GAUCHE_ENCRE)])
        g1 = self.lg("1 + 5 = 6,", -3.35, 0.0, 46, maxw=5)
        self.dire_eq(g1, "1 plus 5, 6,", echelle=1.15)
        g2 = self.lg("6² = 36", -3.35, -0.7, 50, maxw=5)
        self.dire_eq(g2, "6 au carré, 36.", echelle=1.15)
        hd = self.lg("À droite :", 3.35, 0.68, 36, DROITE_C, maxw=5)
        self.dit(hd, "À droite :", avec=[Create(pd), droite.animate.set_color(DROITE_ENCRE)])
        d1 = self.lg("1 + 25 = 26", 3.35, 0.0, 46, maxw=5)
        self.dire_eq(d1, "1 plus 25, 26.", echelle=1.15)
        v = self.lg("36 ≠ 26 : c'est faux.", -0.6, -1.65, 46, maxw=9)
        for a in v.atomes[4:]:
            a.set_color(PIEGE)
        v.atomes[1].set_color(PIEGE)
        self.dit(v, "36 n'est pas 26 : c'est faux.")
        tp = tampon("FAUX", PIEGE, 38).move_to(P(4.45, 1.95))
        self.play(FadeIn(tp, scale=1.6), Indicate(g2.atomes[-1], color=PIEGE), Indicate(d1.atomes[-1], color=PIEGE),
                  run_time=0.4)
        m = self.lg("Il manque 10 : le double produit, 10x.", -0.6, -2.6, 40, lettres="x", maxw=9.4)
        dix = VGroup(m.atomes[8], m.atomes[9])
        dix.set_color(BANDE)
        self.dit(m, "Il manque 10 : le double produit, 10 x.")
        self.insister(dix, 1.3, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 03 : erreur 1, le double produit oublié ─────────────────────────────
    def ecran_erreur1(self):
        self.ecran("03-erreur1")
        t1 = T("Erreur n° 1 :", 44, PIEGE, audit=False, gras=True)
        t2 = self.lg("oublier le double produit.", 0, 0, 44, JAUNE_TITRE, maxw=8)
        VGroup(t1, t2).arrange(RIGHT, buff=0.3).move_to(P(0, 3.08))
        self.au("Erreur numéro un", FadeIn(t1, scale=1.2), rt=0.3)
        self.dit(t2, "oublier le double produit.")
        c = Carre(2.2, 1.0, (-5.85, 2.05), cotes=("x", "5"))
        e = D("(x + 5)² = x² + 10x + 25", 52)
        if e.width > 7.4:
            e.scale_to_fit_width(7.4)
        e.move_to(P(2.45, 0.9))
        VGroup(e.atomes[10], e.atomes[11]).set_color(BANDE)
        in_a = c.dans(0, "x²", 46)
        in1 = c.dans(1, "5x", 34)
        in2 = c.dans(2, "5x", 34)
        in_b = c.dans(3, "25", 34, audit=True)
        self.poser_avec(e, "x plus 5, au carré, égale x au carré plus 10 x plus 25.", {
            5: lambda: [Create(c.cases), FadeIn(c.haut), FadeIn(c.gauche)],
            8: lambda: [c.remplir(0), FadeIn(in_a)],
            10: lambda: [c.remplir(1), c.remplir(2), FadeIn(in1), FadeIn(in2)],
            13: lambda: [c.remplir(3), FadeIn(in_b)],
        })
        self.play(Circumscribe(VGroup(e.atomes[10], e.atomes[11]), color=BANDE, buff=0.08),
                  Circumscribe(c.bandes(), color=BANDE, buff=0.06), run_time=0.6)
        self.play(Wiggle(VGroup(in1, in2)), run_time=0.5)
        l = self.lg("Le carré d'une somme n'est jamais la somme des carrés.", -0.3, -2.35, 40, JAUNE_TITRE, maxw=10.4)
        self.dit(l, "Le carré d'une somme n'est jamais la somme des carrés.")
        self.insister(l, 1.05, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse C) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -1.9
        self._w_cartes = (self.BORD_X - self.XL - 0.1) / 1.08
        c = Carre(1.9, 1.0, (-6.0, 1.45), cotes=("x", "9"))
        in_a = c.dans(0, "x²", 40)
        in1 = c.dans(1, "9x", 30)
        in2 = c.dans(2, "9x", 30)
        in_b = c.dans(3, "81", 30)

        def avant(sc):
            sc.eq_dans_q(0, "Quelle égalité est juste ?", "Quelle égalité est juste ?", lettres="", fs=36)

        def montrer_carre(sc):
            sc.play(Create(c.cases), FadeIn(c.haut), FadeIn(c.gauche), run_time=0.5)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : le double produit,", "Réponse C : le double produit,", premier=True,
                     avec=[c.remplir(0), FadeIn(in_a), c.remplir(3), FadeIn(in_b)])
            sc.ph_eq(1, "2 × x × 9 = 18x.", "2 fois x fois 9, 18 x.", lettres="x", avec=[c.remplir(1), c.remplir(2)])
            sc.play(FadeIn(in1), FadeIn(in2), run_time=0.25)
            sc.ph_eq(2, "Pas 9x : il y a deux bandes.", "Pas 9 x : il y a deux bandes.", lettres="x")
            sc.play(Circumscribe(c.cases[1], color=BANDE, buff=0.05), Circumscribe(c.cases[2], color=BANDE, buff=0.05),
                    run_time=0.6)
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Quelle égalité est juste ?"],
                            [Eq("(x + 9)² = x² + 81", 34), Eq("(x + 9)² = x² + 9x + 81", 34),
                             Eq("(x + 9)² = x² + 18x + 81", 34)], 2,
                            ["Réponse C : le double produit,", "2 × x × 9 = 18x.", "Pas 9x : il y a deux bandes."],
                            avant_q=avant, autres_q=montrer_carre, autres_r=apres)
        self.XL = type(self).XL
        self._w_cartes = None

    # ── 04 : erreur 2, le signe ─────────────────────────────────────────────
    def ecran_erreur2(self):
        self.ecran("04-erreur2")
        t1 = T("Erreur n° 2 :", 44, PIEGE, audit=False, gras=True)
        t2 = self.lg("le signe.", 0, 0, 44, JAUNE_TITRE, maxw=5)
        VGroup(t1, t2).arrange(RIGHT, buff=0.3).move_to(P(0, 3.08))
        self.au("Erreur numéro deux", FadeIn(t1, scale=1.2), rt=0.3)
        self.dit(t2, "le signe.")
        e1 = D("(x − 3)²", 72).move_to(P(-4.0, 1.75))
        self.dire_eq(e1, "x moins 3, au carré.", echelle=1.15)
        l1 = self.lg("Le double produit est négatif :", 0, 0, 38, maxw=7.4)
        e2 = D("− 6x", 58, BANDE)
        VGroup(l1, e2).arrange(RIGHT, buff=0.4).move_to(P(-0.8, 0.5))
        self.dit(l1, "Le double produit est négatif :")
        self.dire_eq(e2, "moins 6 x.", echelle=1.2)
        l2 = self.lg("Mais le dernier terme est positif :", 0, 0, 38, maxw=7.8)
        e3 = D("+ 9", 58, VERT_OK)
        VGroup(l2, e3).arrange(RIGHT, buff=0.4).move_to(P(-0.8, -0.5))
        sg = VGroup(signe("−"), T("×", 44, WHITE, audit=False), signe("−"), T("=", 44, WHITE, audit=False), signe("+"))
        sg.arrange(RIGHT, buff=0.25).move_to(P(3.4, 1.75))
        self.dit(l2, "Mais le dernier terme est positif :")
        self.play(LaggedStart(*[FadeIn(s, scale=0.6) for s in sg], lag_ratio=0.2), run_time=0.5)
        self.dire_eq(e3, "plus 9.", echelle=1.2)
        self.play(Indicate(sg[-1], color=VERT_OK), run_time=0.4)
        copie = Feuille(5.6, 0.95).move_to(P(-3.3, -1.55))
        w = encre("(x − 3)² = x² − 6x − 9", 38, lettres="x").sans_audit()
        if w.width > 5.0:
            w.scale_to_fit_width(5.0)
        w.move_to(copie.get_center() + RIGHT * 0.15)
        l3 = self.lg("Écrire − 9, c'est faux.", 2.8, -1.55, 42, maxw=4.6)
        for a in l3.atomes[1:]:
            a.set_color(PIEGE)
        self.dit(l3, "Écrire moins 9, c'est faux.", avec=[FadeIn(copie), FadeIn(w)])
        faux = VGroup(w.atomes[12], w.atomes[13])
        ba = self.barrer(faux)
        self.play(faux.animate.set_color(PIEGE), Create(ba), run_time=0.3)
        self.insister(e3, 1.25, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 05 : erreur 3, confondre deux formes ────────────────────────────────
    def ecran_erreur3(self):
        self.ecran("05-erreur3")
        t1 = T("Erreur n° 3 :", 44, PIEGE, audit=False, gras=True)
        t2 = self.lg("confondre deux formes.", 0, 0, 44, JAUNE_TITRE, maxw=8)
        VGroup(t1, t2).arrange(RIGHT, buff=0.3).move_to(P(0, 3.08))
        self.au("Erreur numéro trois", FadeIn(t1, scale=1.2), rt=0.3)
        self.dit(t2, "confondre deux formes.")
        cg = RoundedRectangle(width=6.1, height=2.6, corner_radius=0.14, stroke_color=GAUCHE_C, stroke_width=4,
                              fill_color="#0b1220", fill_opacity=1).move_to(P(-3.3, 1.0))
        cd = cg.copy().set_stroke(DROITE_C).move_to(P(3.3, 1.0))
        eg = D("(x − 3)² = x² − 6x + 9", 44)
        ed = D("(x − 3)(x + 3) = x² − 9", 44)
        for e, x in ((eg, -3.3), (ed, 3.3)):
            if e.width > 5.5:
                e.scale_to_fit_width(5.5)
            e.move_to(P(x, 1.7))
        self.dire_eq(eg, "x moins 3, au carré, donne x au carré moins 6 x plus 9.", avec=[FadeIn(cg)])
        self.dire_eq(ed, "x moins 3, fois x plus 3, donne x au carré moins 9.", avec=[FadeIn(cd)])
        pg = VGroup(pilule("x − 3", GAUCHE_C), T("×", 36, WHITE, audit=False), pilule("x − 3", GAUCHE_C))
        pg.arrange(RIGHT, buff=0.22).move_to(P(-3.3, 0.45))
        p1, p2 = pilule("x − 3", NEG), pilule("x + 3", POS)
        p1.e.atomes[1].set_color(NEG)
        p2.e.atomes[1].set_color(POS)
        pd = VGroup(p1, T("×", 36, WHITE, audit=False), p2).arrange(RIGHT, buff=0.22).move_to(P(3.3, 0.45))
        l1 = self.lg("Deux parenthèses identiques,", -3.3, -0.85, 36, GAUCHE_C, maxw=6.0)
        self.dit(l1, "Deux parenthèses identiques,", avec=[FadeIn(pg, shift=UP * 0.15)])
        l2 = self.lg("ou des signes contraires :", 3.3, -0.85, 36, DROITE_C, maxw=6.0)
        self.dit(l2, "ou des signes contraires :", avec=[FadeIn(pd, shift=UP * 0.15)])
        self.play(Indicate(p1.e.atomes[1], color=NEG, scale_factor=1.6),
                  Indicate(p2.e.atomes[1], color=POS, scale_factor=1.6), run_time=0.5)
        l3 = self.lg("ce n'est pas la même chose.", -0.3, -2.15, 46, JAUNE_TITRE, maxw=10)
        self.dit(l3, "ce n'est pas la même chose.")
        self.insister(l3, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse B) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        self._w_cartes = (self.BORD_X - self.XL - 0.1) / 1.08
        ec = ecran_ia(3.9, 2.55, "Correcteur IA", 22).move_to(P(-4.45, 1.3))
        zy = ec.bande.get_bottom()[1]
        copie = Feuille(3.5, 0.72).move_to(P(-4.45, zy - 0.5))
        w = encre("(x − 2)² = x² − 4", 34, lettres="x").sans_audit()
        if w.width > 3.1:
            w.scale_to_fit_width(3.1)
        w.move_to(copie.get_center() + RIGHT * 0.12)
        xt = D("x = 5", 32, audit=False).move_to(P(-4.45, zy - 1.15))
        hg = T("à gauche", 22, GAUCHE_C, audit=False).move_to(P(-5.4, zy - 1.6))
        hd = T("à droite", 22, DROITE_C, audit=False).move_to(P(-3.5, zy - 1.6))
        rg = T("9", 34, VERT_OK, gras=True).next_to(hg, RIGHT, buff=0.15)
        rd = T("21", 34, PIEGE, gras=True).next_to(hd, RIGHT, buff=0.15)
        tp = tampon("FAUX", PIEGE, 26).move_to(P(-3.2, zy - 1.12))

        def avant(sc):
            sc.eq_dans_q(0, "Une copie dit : (x − 2)² = x² − 4.",
                         "Une copie dit : x moins 2, au carré, égale x au carré moins 4.", lettres="x", fs=36)
            sc.play(FadeIn(ec), FadeIn(copie), FadeIn(w), run_time=0.3)
            sc.eq_dans_q(0, "Le correcteur teste x = 5. Que trouve-t-il ?",
                         "Le correcteur teste x égale 5. Que trouve-t-il ?", lettres="x", fs=36)
            sc.play(FadeIn(xt), FadeIn(hg), FadeIn(hd), run_time=0.25)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 5 − 2 = 3, 3² = 9,", "Réponse B : 5 moins 2, 3, et 3 au carré, 9.", premier=True)
            sc.play(FadeIn(rg, scale=1.4), run_time=0.2)
            sc.ph_eq(1, "mais 25 − 4 = 21 :", "Mais 25 moins 4, 21.")
            sc.play(FadeIn(rd, scale=1.4), run_time=0.2)
            sc.ph_eq(2, "c'est faux.", "C'est faux", couleur=PIEGE)
            sc.play(FadeIn(tp, scale=1.6), run_time=0.25)
            lb1 = sc.lg("La bonne réponse :", -4.45, -1.0, 34, VERT_OK, maxw=3.9)
            sc.dit(lb1, "la bonne réponse")
            lb2 = D("x² − 4x + 4", 46, VERT_OK)
            if lb2.width > 3.2:
                lb2.scale_to_fit_width(3.2)
            lb2.move_to(P(-4.4, -1.8))
            sc.dire_eq(lb2, "x au carré moins 4 x plus 4.", echelle=1.15)
            sc.play(Create(sc.cadre_ok(lb2, 0.14)), run_time=0.2)
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse",
                            ["Une copie dit : (x − 2)² = x² − 4.", "Le correcteur teste x = 5. Que trouve-t-il ?"],
                            [Eq("9 à gauche, 9 à droite, c'est juste", 34, lettres=""),
                             Eq("9 à gauche, 21 à droite, c'est faux", 34, lettres=""),
                             Eq("21 à gauche, 9 à droite, c'est faux", 34, lettres="")], 1,
                            ["Réponse B : 5 − 2 = 3, 3² = 9,", "mais 25 − 4 = 21 :", "c'est faux."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL
        self._w_cartes = None

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = self.lg("Défi : trouve l'erreur.", 0, 2.95, 54, JAUNE_TITRE, maxw=10)
        self.dit(tit, "Défi : trouve l'erreur.")
        copie = Feuille(8.0, 1.6).move_to(P(-0.4, 1.0))
        l = self.lg("Sur une copie :", -3.5, 2.1, 36, CIEL, maxw=5)
        self.dit(l, "Sur une copie :", avec=[FadeIn(copie, shift=UP * 0.15)])
        w = encre("(2x + 1)² = 2x² + 4x + 1", 54, lettres="x").move_to(copie.get_center() + RIGHT * 0.2)
        self.dire_eq(w, "2 x plus 1, au carré, égale 2 x au carré plus 4 x plus 1.", echelle=1.15)
        loupe = VGroup(Circle(radius=0.55, color=JAUNE_TITRE, stroke_width=6),
                       Line(P(0.39, -0.39), P(0.75, -0.75), color=JAUNE_TITRE, stroke_width=10))
        loupe.shift(P(4.6, 0.0) - loupe[0].get_center())
        q = self.lg("Où est l'erreur ?", -0.4, -0.75, 48, maxw=8)
        self.dit(q, "Où est l'erreur ?", avec=[Create(loupe)])
        self.play(loupe.animate.shift(LEFT * 1.6), run_time=0.4)
        self.play(loupe.animate.shift(RIGHT * 1.6), run_time=0.4)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -2.0))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, l=l, q=q, pz=pz, loupe=loupe, copie=copie, w=w)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("06b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.95))
        w = d["w"]
        papier = VGroup(d["copie"], w)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["q"]), FadeOut(d["l"]),
                FadeOut(d["loupe"]), papier.animate.scale(0.68).move_to(P(-2.75, 1.85)), rt=0.4)
        l1 = self.lg("Le double produit est juste : 2 × 2x × 1 = 4x.", -1.7, 0.6, 36, lettres="x", maxw=8.6)
        self.dit(l1, "Le double produit est juste : 2 fois 2 x fois 1, 4 x.")
        quatre = VGroup(w.atomes[12], w.atomes[13])
        ok = tampon("JUSTE", VERT_OK, 30, angle=-0.15).move_to(P(1.2, 1.85))
        self.play(Circumscribe(quatre, color=VERT_OK, buff=0.06), FadeIn(ok, scale=1.6), run_time=0.45)
        # le carré de 2x : quatre carrés x²
        cote, o = 2.3, P(4.75, 0.35)
        sq = VGroup(*[Square(cote / 2, stroke_color=WHITE, stroke_width=3, fill_opacity=0)
                      .move_to(o + P((i - 0.5) * cote / 2, (0.5 - j) * cote / 2)) for j in range(2) for i in range(2)])
        th = D("2x", 34, audit=False).next_to(sq, UP, buff=0.12)
        tg = D("2x", 34, audit=False)
        tg.move_to(P(sq.get_left()[0] - 0.14 - tg.width / 2, o[1]))
        xs = VGroup(*[D("x²", 34, audit=False).move_to(s) for s in sq])
        faux = VGroup(*w.atomes[8:11])
        ba = self.barrer(faux)
        l2 = self.lg("Mais le carré de 2x, c'est 2x × 2x : 4x².", -1.7, -0.45, 36, lettres="x", maxw=8.6)
        self.dit_avec(l2, "Mais le carré de 2 x, c'est 2 x fois 2 x : 4 x au carré.", {
            4: lambda: [Create(sq), FadeIn(th), FadeIn(tg)],
            16: lambda: [*[s.animate.set_fill(CARRE_A, 0.75) for s in sq], FadeIn(xs), faux.animate.set_color(PIEGE),
                         Create(ba)],
        })
        self.play(Circumscribe(sq, color=CIEL, buff=0.06), run_time=0.45)
        lb = self.lg("La bonne réponse :", 0, 0, 40, maxw=5)
        r = D("4x² + 4x + 1", 58, VERT_OK)
        VGroup(lb, r).arrange(RIGHT, buff=0.5).move_to(P(-1.2, -1.65))
        self.dit(lb, "La bonne réponse :")
        self.dire_eq(r, "4 x au carré plus 4 x plus 1.", echelle=1.15)
        self.play(Create(self.cadre_ok(r, 0.15)), run_time=0.25)
        self.insister(r, 1.08, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        c = Carre(1.5, 0.75, (0, 0), cotes=("a", "b"), fs_cote=30, lettres="")
        for i in range(4):
            c.cases[i].set_fill(COUL[i], 0.75)
        ins = VGroup(c.dans(0, "a²", 36, lettres=""), c.dans(1, "ab", 26, lettres=""), c.dans(2, "ab", 26, lettres=""),
                     c.dans(3, "b²", 26, lettres=""))
        c.add(ins)
        self.XL = -2.6
        self.BORD_X = 6.35
        lignes = self.finale_colonne([["Le carré d'une somme a trois termes :", "n'oublie pas le double produit."],
                                      ["Dans (a − b)², le dernier", "terme reste positif."],
                                      ["Pour vérifier, teste", "avec un nombre."]],
                                     fs=38, figure=c)
        self.play(FadeIn(c), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)
        self.XL = type(self).XL
        self.BORD_X = type(self).BORD_X

    def construct(self):
        self.page_de_garde()
        self.ecran_ingenieure()
        self.ecran_test()
        self.ecran_erreur1()
        self.ecran_question1()
        self.ecran_erreur2()
        self.ecran_erreur3()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
