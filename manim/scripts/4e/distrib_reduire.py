# distrib_reduire.py
# EleveAI — Maths 4e — série DISTRIBUTIVITÉ, épisode 03 : développer PUIS RÉDUIRE.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : litteral_distributivite_reduire.
# Métier : Sarah, maître-nageuse (sport). Centres : sport.
# Écrans (micro litteral_distributivite_reduire partout) : garde (00) ; l'entraînement de Sarah (01) ;
# l'écrire 3(x + 4) + 5 (02) ; développer (03) ; réduire, 3x + 17 (04) ; ranger par familles (05) ;
# QUESTION 1 (05q, réponse A) ; deux parenthèses (06) ; le moins devant la parenthèse (07) ;
# QUESTION 2 (07q, réponse B) ; défi (08) et correction (08b) ; ce que tu as appris (09) ; fin du 05/11 (10).
# Code couleur : x bleu ; le nombre qui se distribue et ses flèches orange ; les nombres (famille) orange ;
# juste vert ; piège rouge.
# Voix : manim/voix/4e-distrib-reduire.json ; marques : distrib_reduire_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/distrib_reduire.py DistribReduire4e --media_dir manim/scripts/4e/media-dist-03-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/distrib_reduire.py DistribReduire4e -o eleveai-maths-4e-distrib-reduire --media_dir manim/scripts/4e/media-dist-03
# Sortie : manim/sorties/4e/maths/distributivite/03-reduire/eleveai-maths-4e-distrib-reduire.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_resoudre_distributivite import Bloc, BLEU_BLOC  # noqa: E402

FACTEUR = OPERATION  # le nombre qui se distribue, et ses flèches
NOMBRE = OPERATION  # la famille des nombres
ORANGE_BLOC = "#c2410c"  # les longueurs de dos, et les 5 pour finir
EAU = "#0369a1"


def D(s, fs=56, couleur=WHITE, lettres="x", audit=True):
    """Une expression : la lettre en bleu."""
    return E(s, fs, couleur, lettres=lettres, audit=audit)


def serie(u=0.3, h=0.5, x_val=9, n=4, fs=26):
    """Une série de Sarah : x longueurs de crawl (bleu) et 4 longueurs de dos (orange)."""
    a = Bloc(x_val * u, h, BLEU_BLOC, "x crawl", fs)
    b = Bloc(n * u, h, ORANGE_BLOC, f"{n} dos", fs)
    g = VGroup(a, b).arrange(RIGHT, buff=0.06)
    g.a, g.b = a, b
    return g


def sarah(s=0.78):
    """Sarah : maillot rouge de maître-nageuse et sifflet au cou."""
    m = Metier(["Sarah", "maître-nageuse"], fs=36, peau="#8d5524", tenue="#dc2626", cheveux="#1f2937", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    cou = p.tete.get_bottom()
    cordon = VMobject(stroke_color="#facc15", stroke_width=4)
    cordon.set_points_smoothly([cou + P(-0.2, 0.02) * s, cou + P(0, -0.45) * s, cou + P(0.2, 0.02) * s])
    sifflet = VGroup(RoundedRectangle(width=0.3 * s, height=0.17 * s, corner_radius=0.06 * s, fill_color="#cbd5e1",
                                      fill_opacity=1, stroke_width=0),
                     Circle(radius=0.05 * s, fill_color="#475569", fill_opacity=1, stroke_width=0))
    sifflet.move_to(cou + P(0.02, -0.5) * s)
    p.add(cordon, sifflet)
    return m


def bassin(w=4.3, h=1.8):
    """Le bassin : l'eau et ses lignes d'eau (bouées rouges et blanches)."""
    eau = RoundedRectangle(width=w, height=h, corner_radius=0.08, fill_color=EAU, fill_opacity=0.85,
                           stroke_color="#e2e8f0", stroke_width=5)
    lignes = VGroup()
    for k in (1, 2, 3):
        y = -h / 2 + k * h / 4
        bouees = VGroup(*[Dot(P(-w / 2 + 0.15 + i * (w - 0.3) / 19, y), radius=0.045,
                              color="#ef4444" if i % 2 else WHITE) for i in range(20)])
        lignes.add(bouees)
    g = VGroup(eau, lignes)
    g.eau, g.lignes = eau, lignes
    return g


def nageur(s=1.0):
    """Une tête et un bras qui sort de l'eau."""
    tete = Circle(radius=0.11, fill_color="#fde68a", fill_opacity=1, stroke_width=0)
    bonnet = AnnularSector(inner_radius=0, outer_radius=0.12, angle=PI, start_angle=0, fill_color="#facc15",
                           fill_opacity=1, stroke_width=0).move_to(P(0, 0.05))
    bras = Arc(radius=0.22, start_angle=PI * 0.15, angle=PI * 0.7, color="#fde68a", stroke_width=6).move_to(P(-0.16, 0.12))
    return VGroup(bras, tete, bonnet).scale(s)


class DistribReduire4e(PaysageRel):
    nom_voix = "4e-distrib-reduire"
    fichier_marques = "distrib_reduire_marques.json"
    ceinture = "orange"

    def fleches(self, e, i_k, cibles, couleur=None, angles=(-1.6, -1.15)):
        """Du nombre devant la parenthèse (atome i_k) vers chaque terme visé."""
        return [self.fleche_arc(e.atomes[i_k], e.atomes[j] if isinstance(j, int) else j, couleur or FACTEUR, angle=a)
                for j, a in zip(cibles, angles)]

    def fleche_arc(self, a, b, couleur=None, angle=-1.2, sw=5):
        return CurvedArrow(a.get_top() + UP * 0.1, b.get_top() + UP * 0.12, angle=angle, color=couleur or FACTEUR,
                           stroke_width=sw, tip_length=0.16)

    def souligner(self, m, couleur, sw=6):
        return Line(m.get_corner(DL) + P(-0.04, -0.12), m.get_corner(DR) + P(0.04, -0.12), color=couleur, stroke_width=sw)

    def boite(self, w, h, couleur, centre):
        return RoundedRectangle(width=w, height=h, corner_radius=0.14, stroke_color=couleur, stroke_width=4,
                                fill_color=FOND_CARTE, fill_opacity=1).move_to(centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Développer et réduire", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Développer", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        e = D("3(x + 4) + 5", 70, audit=False).move_to(P(-3.6, 0.95))
        e.atomes[0].set_color(FACTEUR)
        r = D("3x + 17", 70, VERT_OK, lettres="", audit=False).move_to(P(-3.6, -0.6))
        fl = Arrow(e.get_bottom() + DOWN * 0.08, r.get_top() + UP * 0.08, buff=0.05, color=CIEL, stroke_width=5)
        l1 = self.lg("Comment arriver à", 3.0, 0.75, 40, maxw=6.4)
        self.dit(l1, "Comment arriver à", avec=[FadeIn(e, shift=UP * 0.2)])
        l2 = self.lg("l'expression la plus simple ?", 3.0, 0.0, 44, JAUNE_TITRE, maxw=6.6)
        self.dit(l2, "l'expression la plus simple ?", avec=[GrowArrow(fl)])
        self.play(FadeIn(r, scale=1.2), run_time=0.3)
        self.insister(l2, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'entraînement de Sarah ────────────────────────────────────────
    def ecran_piscine(self):
        self.ecran("01-piscine")
        m = sarah()
        m.perso.move_to(P(-4.4, 1.0))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-4.4)
        b = bassin().move_to(P(-4.0, -1.75))
        self.au("Sarah", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("maître", FadeIn(m.nom[1], shift=UP * 0.1), FadeIn(b), rt=0.35)
        l1 = self.lg("Elle prépare l'entraînement du club.", 2.6, 2.65, 36, CIEL, maxw=7.2)
        self.dit(l1, "Elle prépare l'entraînement du club.")
        l2 = self.lg("Une série, c'est x longueurs de crawl", 2.6, 1.9, 34, lettres="x", maxw=7.2)
        n = nageur().move_to(P(-5.8, b.lignes[0][0].get_y() - 0.22))
        n.x0, n.t = -5.8, 0.0

        def nage(mob, dt):  # Sarah fait nager le club : aller-retour dans la ligne d'eau
            mob.t += dt
            u = (mob.t * 0.45) % 2
            mob.set_x(mob.x0 + 3.6 * (u if u < 1 else 2 - u))

        n.add_updater(nage)
        s = serie().move_to(P(2.6, 0.45))
        self.dit(l2, "Une série, c'est x longueurs de crawl", avec=[FadeIn(n), FadeIn(s.a, shift=RIGHT * 0.3)])
        l3 = self.lg("et 4 longueurs de dos.", 2.6, 1.25, 34, maxw=7.2)
        self.dit(l3, "et 4 longueurs de dos.", avec=[FadeIn(s.b, shift=LEFT * 0.3)])
        l4 = self.lg("Elle prévoit 3 séries,", 2.6, -0.4, 36, maxw=7.2)
        cs = DashedVMobject(SurroundingRectangle(s, buff=0.08, color=CIEL, stroke_width=3), num_dashes=36)
        self.dit(l4, "Elle prévoit 3 séries,", avec=[Create(cs)])
        l5 = self.lg("puis 5 longueurs pour finir.", 2.6, -1.05, 36, maxw=7.2)
        self.dit(l5, "puis 5 longueurs pour finir.")
        q = self.lg("Combien de longueurs en tout ?", 2.3, -2.05, 44, JAUNE_TITRE, maxw=6.4)
        self.dit(q, "Combien de longueurs en tout ?")
        self.insister(q, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 à 04 : écrire, développer, réduire (le même écran) ───────────────
    def ecran_ecrire(self):
        n = [m for m in self.mobjects if hasattr(m, "x0")]
        for m in n:
            m.clear_updaters()
        self.clear()
        self.add_mascotte(scale=0.5)
        ys = (2.4, 1.7, 1.0)
        srs = VGroup(*[serie() for _ in ys])
        for sr, y in zip(srs, ys):
            sr.move_to(P(-3.75, y))
        cadres = VGroup(*[DashedVMobject(SurroundingRectangle(sr, buff=0.07, color=CIEL, stroke_width=3), num_dashes=36)
                          for sr in srs])
        cinq = Bloc(5 * 0.3, 0.5, ORANGE_BLOC, "5", 26).move_to(P(-5.0, -0.75))
        self.play(LaggedStart(*[FadeIn(sr, shift=RIGHT * 0.3) for sr in srs], lag_ratio=0.2), Create(cadres),
                  FadeIn(cinq, shift=UP * 0.2), run_time=0.6)
        self.dire("02-ecrire")
        t = self.lg("Ça s'écrit :", 3.3, 3.05, 40, CIEL, maxw=6.0)
        self.dit(t, "Ça s'écrit :")
        e = D("3(x + 4) + 5", 64).move_to(P(3.3, 2.0))
        e.atomes[0].set_color(FACTEUR)
        self.dire_eq(e, "3 fois, entre parenthèses, x plus 4, plus 5.", echelle=1.2,
                     avec=[Circumscribe(VGroup(srs, cadres), color=FACTEUR, run_time=0.5)])
        self.play(Circumscribe(cinq, color=WHITE), run_time=0.4)
        self.attendre_voix(marge=0.4)
        self.f = dict(srs=srs, cadres=cadres, cinq=cinq, e=e, t=t)

    def ecran_developper(self):
        f = self.f
        self.dire("03-developper")
        srs, e = f["srs"], f["e"]
        ys = (2.4, 1.7, 1.0)
        l1 = self.lg("D'abord, on développe :", 3.3, 0.95, 40, CIEL, maxw=6.0)
        self.dit(l1, "D'abord, on développe :", avec=[FadeOut(f["t"]), FadeOut(f["cadres"])])
        fl = self.fleches(e, 0, (2, 4))
        self.play(*[sr.a.animate.move_to(P(-4.75, y)) for sr, y in zip(srs, ys)],
                  *[sr.b.animate.move_to(P(-2.15, y)) for sr, y in zip(srs, ys)], Create(fl[0]), Create(fl[1]), run_time=0.7)
        ba = Brace(VGroup(*[sr.a for sr in srs]), DOWN, buff=0.1, color=BLEU_CALCUL)
        bb = Brace(VGroup(*[sr.b for sr in srs]), RIGHT, buff=0.1, color=NOMBRE)
        e2 = D("3x + 12 + 5", 58).move_to(P(3.3, 0.1))
        tx = D("3x", 44, audit=False).next_to(ba, DOWN, buff=0.08)
        t12 = D("12", 44, NOMBRE, audit=False).next_to(bb, RIGHT, buff=0.1)
        self.poser_avec(e2, "3 x plus 12, plus 5.",
                        {0: lambda: [GrowFromCenter(ba), FadeIn(tx)], 3: lambda: [GrowFromCenter(bb), FadeIn(t12)]})
        self.attendre_voix(marge=0.4)
        f.update(fl=fl, e2=e2, ba=ba, bb=bb, tx=tx, t12=t12, l1=l1)

    def ecran_reduire(self):
        f = self.f
        self.dire("04-reduire")
        srs, cinq, e2 = f["srs"], f["cinq"], f["e2"]
        l1 = self.lg("Puis on réduit :", 3.3, -0.85, 42, JAUNE_TITRE, maxw=6.0)
        self.dit(l1, "Puis on réduit :", avec=[FadeOut(VGroup(*f["fl"]))])
        l2 = self.lg("on regroupe les nombres.", 3.3, -1.5, 36, maxw=6.0)
        boite = SurroundingRectangle(VGroup(*e2.atomes[3:6]), buff=0.12, color=NOMBRE, stroke_width=4, corner_radius=0.08)
        self.dit(l2, "on regroupe les nombres.", avec=[Create(boite)])
        b17 = Brace(VGroup(*[sr.b for sr in srs], cinq.copy().move_to(P(-2.0, 0.3))), RIGHT, buff=0.1, color=NOMBRE)
        self.play(cinq.animate.move_to(P(-2.0, 0.3)), FadeOut(f["bb"]), FadeOut(f["t12"]), run_time=0.6)
        c = D("12 + 5 = 17", 50).move_to(P(3.3, -2.3))
        for k in (0, 2):
            c.atomes[k].set_color(NOMBRE)
        t17 = D("17", 44, NOMBRE, audit=False).next_to(b17, RIGHT, buff=0.1)
        self.poser_avec(c, "12 plus 5 : 17.", {4: lambda: [GrowFromCenter(b17), FadeIn(t17)]})
        self.play(c.atomes[4].animate.set_color(VERT_OK), run_time=0.12)
        r = VGroup(self.lg("Résultat : 3x + 17", -3.4, -1.6, 48, VERT_OK, lettres="", maxw=5.4),
                   self.lg("longueurs.", -3.4, -2.3, 42, VERT_OK, maxw=5.4))
        self.dit(r[0], "Résultat : 3 x plus 17")
        self.dit(r[1], "longueurs.")
        cr = self.cadre_ok(r, 0.15)
        self.play(Create(cr), run_time=0.2)
        self.insister(r, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05 : ranger par familles ────────────────────────────────────────────
    def ecran_familles(self):
        self.ecran("05-familles")
        l1 = self.lg("Réduire, c'est ranger par familles :", 0, 3.05, 44, JAUNE_TITRE, maxw=11)
        self.dit(l1, "Réduire, c'est ranger par familles :")
        e = D("3x + 12 + 5", 60, audit=False).move_to(P(0, 2.05))
        e.atomes[3].set_color(NOMBRE)
        e.atomes[5].set_color(NOMBRE)
        bx = self.boite(5.2, 2.3, BLEU_CALCUL, P(-3.2, -0.35))
        bn = self.boite(5.2, 2.3, NOMBRE, P(3.0, -0.35))
        self.play(FadeIn(e), FadeIn(bx), FadeIn(bn), run_time=0.35)
        tx = self.lg("les x avec les x,", -3.2, 0.3, 40, lettres="x", maxw=4.8)
        mx = D("3x", 56, audit=False)
        mx.move_to(P(-3.2, -0.85))
        self.dit(tx, "les x avec les x,")
        self.play(TransformFromCopy(VGroup(e.atomes[0], e.atomes[1]), mx), run_time=0.6)
        tn = VGroup(self.lg("les nombres avec", 3.0, 0.5, 36, maxw=4.8), self.lg("les nombres.", 3.0, 0.0, 36, maxw=4.8))
        mn = VGroup(D("12", 56, NOMBRE, audit=False), D("5", 56, NOMBRE, audit=False)).arrange(RIGHT, buff=0.7).move_to(P(3.0, -0.85))
        self.dit(tn[0], "les nombres avec")
        self.dit(tn[1], "les nombres.")
        self.play(TransformFromCopy(e.atomes[3], mn[0]), TransformFromCopy(e.atomes[5], mn[1]), run_time=0.6)
        mur = DashedLine(P(-0.1, 0.75), P(-0.1, -1.45), color=PIEGE, stroke_width=5)
        l3 = self.lg("Les x ne se mélangent jamais avec les nombres.", -0.4, -2.3, 38, lettres="x", maxw=11)
        self.dit(l3, "Les x ne se mélangent jamais avec les nombres.", avec=[Create(mur)])
        self.play(Circumscribe(mx, color=BLEU_CALCUL), Circumscribe(mn, color=NOMBRE), run_time=0.5)
        self.insister(VGroup(*l3.atomes[2:6]), 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 1 (réponse A) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e = D("2(x + 5) + 3", 70, audit=False).move_to(P(-3.5, 0.6))
        e.atomes[0].set_color(FACTEUR)

        def avant(sc):
            sc.eq_dans_q(0, "Que donne 2(x + 5) + 3 ?", "Que donne 2 fois, entre parenthèses, x plus 5, plus 3 ?", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : 2x + 13.", "Réponse A : 2 x plus 13.", lettres="x", premier=True)
            f = VGroup(*sc.fleches(e, 0, (2, 4)))
            sc.ph_eq(1, "2x + 10 + 3", "2 x plus 10, plus 3.", lettres="x", avec=[Create(f)])
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Que donne 2(x + 5) + 3 ?"],
                            [Eq("2x + 13", 34), Eq("2x + 8", 34), Eq("15x", 34)], 0,
                            ["Réponse A : 2x + 13.", "2x + 10 + 3"],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : deux parenthèses ───────────────────────────────────────────────
    def ecran_deux(self):
        self.ecran("06-deux")
        tit = self.lg("Avec deux parenthèses.", 0, 3.15, 44, JAUNE_TITRE, maxw=11)
        self.dit(tit, "Avec deux parenthèses.")
        l1 = self.lg("Sarah ajoute un 2e groupe :", 0, 2.4, 36, CIEL, maxw=11)
        # « 2e » se dit d'un mot : posé à part, sur sa marque
        a1 = l1.atomes
        self.dire_eq(l1, "Sarah ajoute un", echelle=1.0, rt=0.12, sauf=a1[3:])
        self.au("2e groupe", FadeIn(a1[3]), FadeIn(a1[4]), rt=0.12)
        self.dire_eq(l1, "groupe :", echelle=1.0, rt=0.12, sauf=a1[:5])
        e = D("2(x + 3) + 4(x − 1)", 62).move_to(P(0, 1.2))
        self.dire_eq(e, "2 fois, entre parenthèses, x plus 3, plus 4 fois, entre parenthèses, x moins 1.", echelle=1.15)
        self.play(e.atomes[0].animate.set_color(FACTEUR), e.atomes[7].animate.set_color(FACTEUR), run_time=0.12)
        l2 = self.lg("On développe chaque morceau :", 0, 0.15, 38, CIEL, maxw=11)
        f1 = self.fleches(e, 0, (2, 4))
        f2 = self.fleches(e, 7, (9, VGroup(e.atomes[10], e.atomes[11])))
        self.dit(l2, "On développe chaque morceau :", avec=[Create(f1[0]), Create(f1[1]), Create(f2[0]), Create(f2[1])])
        e2 = D("2x + 6 + 4x − 4", 56).move_to(P(0, -0.7))
        self.dire_eq(e2, "2 x plus 6, plus 4 x moins 4.", echelle=1.15)
        a = e2.atomes
        sx = VGroup(self.souligner(VGroup(a[0], a[1]), BLEU_CALCUL), self.souligner(VGroup(a[5], a[6]), BLEU_CALCUL))
        sn = VGroup(self.souligner(a[3], NOMBRE), self.souligner(VGroup(a[7], a[8]), NOMBRE))
        lx = self.lg("Les x : 2x + 4x = 6x", -3.2, -1.7, 40, lettres="x", maxw=5.8)
        self.dit(lx, "Les x : 2 x plus 4 x, 6 x.", avec=[Create(sx)])
        ln = self.lg("Les nombres : 6 − 4 = 2", 3.0, -1.7, 40, maxw=5.6)
        for k in (3, 5):
            ln.atomes[k].set_color(NOMBRE)
        self.dit(ln, "Les nombres : 6 moins 4, 2.", avec=[Create(sn)])
        r = self.lg("Résultat : 6x + 2.", -0.4, -2.75, 48, VERT_OK, lettres="", maxw=8)
        self.dit(r, "Résultat : 6 x plus 2.")
        cr = self.cadre_ok(r, 0.15)
        self.play(Create(cr), run_time=0.2)
        self.insister(r, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 07 : le moins devant la parenthèse ──────────────────────────────────
    def ecran_moins(self):
        self.ecran("07-moins")
        tit = self.lg("Attention au moins devant une parenthèse :", 0, 3.15, 42, JAUNE_TITRE, maxw=12)
        self.dit(tit, "Attention au moins devant une parenthèse :")
        e = D("10 − 3(x − 1)", 66).move_to(P(-3.45, 1.4))
        self.dire_eq(e, "10 moins 3 fois, entre parenthèses, x moins 1.", echelle=1.15)
        k = VGroup(e.atomes[1], e.atomes[2])
        self.play(k.animate.set_color(FACTEUR), run_time=0.12)
        l1 = self.lg("Le moins 3 multiplie tout :", 3.6, 1.9, 38, maxw=5.2)
        fl = self.fleches(e, 2, (4, VGroup(e.atomes[5], e.atomes[6])))
        self.dit(l1, "Le moins 3 multiplie tout :", avec=[Create(fl[0]), Create(fl[1])])
        p = D("−3x, +3", 54).move_to(P(3.6, 1.05))
        self.dire_eq(p, "moins 3 x, plus 3.", echelle=1.2)
        self.play(VGroup(p.atomes[4], p.atomes[5]).animate.set_color(VERT_OK), run_time=0.15)
        self.insister(VGroup(p.atomes[4], p.atomes[5]), 1.3, 0.18)
        d = self.lg("Donc 10 − 3x + 3.", 0, -0.35, 50, lettres="x", maxw=10)
        self.dit(d, "Donc 10 moins 3 x plus 3.")
        for j in (1, 5, 6):
            d.atomes[j].set_color(NOMBRE)
        bt = VGroup(self.souligner(d.atomes[1], NOMBRE), self.souligner(VGroup(d.atomes[5], d.atomes[6]), NOMBRE))
        self.play(Create(bt), run_time=0.3)
        r = self.lg("Résultat : 13 − 3x.", -0.4, -1.75, 54, VERT_OK, lettres="", maxw=9)
        self.dit(r, "Résultat : 13 moins 3 x.")
        cr = self.cadre_ok(r, 0.16)
        self.play(Create(cr), run_time=0.2)
        self.insister(r, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 07q : QUESTION 2 (réponse B) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e = D("8 − 2(x − 4)", 72, audit=False).move_to(P(-3.5, 0.6))
        VGroup(e.atomes[1], e.atomes[2]).set_color(FACTEUR)

        def avant(sc):
            sc.eq_dans_q(0, "Que donne 8 − 2(x − 4) ?", "Que donne 8 moins 2 fois, entre parenthèses, x moins 4 ?", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 16 − 2x.", "Réponse B : 16 moins 2 x.", lettres="x", premier=True)
            f = VGroup(*sc.fleches(e, 2, (4, VGroup(e.atomes[5], e.atomes[6]))))
            sc.ph_eq(1, "−2 × (−4) = +8", "Moins 2 fois moins 4 : plus 8.", avec=[Create(f)])
            sc.ph_eq(2, "Et 8 + 8 = 16.", "Et 8 plus 8 : 16.")
            sc.rep_fini()

        self.question_pause("07q-question", "07r-reponse", ["Que donne 8 − 2(x − 4) ?"],
                            [Eq("6x − 24", 34), Eq("16 − 2x", 34), Eq("−2x", 34)], 1,
                            ["Réponse B : 16 − 2x.", "−2 × (−4) = +8", "Et 8 + 8 = 16."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.95))
        self.au("À toi", Write(tit), rt=0.5)
        dv = self.lg("Développe et réduis :", 0, 2.0, 46, CIEL, maxw=9)
        self.dit(dv, "Développe et réduis :")
        e = D("5(x + 2) + 3(x − 4)", 68).move_to(P(-0.7, 0.85))
        self.dire_eq(e, "5 fois, entre parenthèses, x plus 2, plus 3 fois, entre parenthèses, x moins 4.", echelle=1.15)
        self.play(e.atomes[0].animate.set_color(FACTEUR), e.atomes[7].animate.set_color(FACTEUR), run_time=0.12)
        q = T("= ?", 72, JAUNE_TITRE, audit=False).next_to(e, RIGHT, buff=0.3)
        bx = self.boite(4.0, 1.25, BLEU_CALCUL, P(-2.6, -0.75))
        bn = self.boite(4.0, 1.25, NOMBRE, P(2.2, -0.75))
        i_n = T("?", 50, NOMBRE, audit=False).move_to(bn)
        ix2 = T("?", 50, BLEU_CALCUL, audit=False).move_to(bx)
        self.play(FadeIn(q, scale=1.3), FadeIn(bx), FadeIn(bn), FadeIn(ix2), FadeIn(i_n), run_time=0.3)
        pz = T("Mets pause, et cherche !", 48, ORANGE_RETENUE).move_to(P(-0.4, -2.35))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, dv=dv, e=e, q=q, pz=pz, bx=bx, bn=bn, ix=VGroup(ix2, i_n))
        self.attendre_voix(marge=2.0)

    # ── 08b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("08b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        e = d["e"]
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["q"]), FadeOut(d["dv"]),
                FadeOut(d["ix"]), e.animate.scale(0.82).move_to(P(0, 1.75)), rt=0.4)
        f = VGroup(*self.fleches(e, 0, (2, 4)), *self.fleches(e, 7, (9, VGroup(e.atomes[10], e.atomes[11]))))
        e2 = D("5x + 10 + 3x − 12", 52).move_to(P(0, 0.75))
        self.dire_eq(e2, "5 x plus 10, plus 3 x moins 12.", echelle=1.15, avec=[Create(f)])
        a = e2.atomes
        bx, bn = d["bx"], d["bn"]
        bx2 = self.boite(5.4, 1.7, BLEU_CALCUL, P(-3.1, -0.85))
        bn2 = self.boite(5.4, 1.7, NOMBRE, P(3.0, -0.85))
        self.play(ReplacementTransform(bx, bx2), ReplacementTransform(bn, bn2), FadeOut(f), run_time=0.3)
        for j in (3, 8):
            a[j].set_color(NOMBRE)
        a[7].set_color(NOMBRE)
        lx = self.lg("Les x : 8x", -3.1, -0.85, 50, lettres="x", maxw=5.0)
        self.dit(lx, "Les x : 8 x.", avec=[Create(self.souligner(VGroup(a[0], a[1]), BLEU_CALCUL)),
                                           Create(self.souligner(VGroup(a[5], a[6]), BLEU_CALCUL))])
        ln = VGroup(self.lg("Les nombres :", 3.0, -0.5, 42, maxw=5.0), self.lg("10 − 12 = −2", 3.0, -1.2, 44, maxw=5.0))
        for k in (0, 2):
            ln[1].atomes[k].set_color(NOMBRE)
        self.dit(ln[0], "Les nombres :",
                 avec=[Create(self.souligner(a[3], NOMBRE)), Create(self.souligner(VGroup(a[7], a[8]), NOMBRE))])
        self.dit(ln[1], "10 moins 12, moins 2.")
        r = self.lg("Résultat : 8x − 2.", -0.4, -2.55, 54, VERT_OK, lettres="", maxw=9)
        self.dit(r, "Résultat : 8 x moins 2.")
        cr = self.cadre_ok(r, 0.17)
        self.play(Create(cr), run_time=0.2)
        self.insister(r, 1.08, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        e = D("3(x + 4) + 5", 50, audit=False)
        e.atomes[0].set_color(FACTEUR)
        f = VGroup(*self.fleches(e, 0, (2, 4), couleur=VERT_OK))
        r1 = D("= 3x + 12 + 5", 44, audit=False).next_to(e, DOWN, buff=0.3)
        r2 = D("= 3x + 17", 46, VERT_OK, audit=False).next_to(r1, DOWN, buff=0.3).align_to(r1, LEFT)
        for k in (4, 6):
            r1.atomes[k].set_color(NOMBRE)
        fig = VGroup(f, e, r1, r2)
        lignes = self.finale_colonne([["D'abord on développe,", "puis on réduit :"],
                                      ["les x avec les x,", "les nombres avec les nombres."],
                                      ["Un moins devant la parenthèse", "change tous les signes."]],
                                     fs=38, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_piscine()
        self.ecran_ecrire()
        self.ecran_developper()
        self.ecran_reduire()
        self.ecran_familles()
        self.ecran_question1()
        self.ecran_deux()
        self.ecran_moins()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
