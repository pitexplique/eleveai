# distrib_simple.py
# EleveAI — Maths 4e — série DISTRIBUTIVITÉ, épisode 01 : la distributivité SIMPLE. PILOTE de la série.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : litteral_distributivite_simple.
# Métier : Lucas, menuisier. Centres : art-design (construction).
# Écrans (micro litteral_distributivite_simple partout) : garde (00) ; les 3 étagères (01) ;
# compter par paquets (02) ; ranger par taille (03) ; l'égalité, développer (04) ; vérifier (05) ;
# le piège 3x + 4 (06) ; QUESTION 1 (06q, réponse C) ; un moins dans la parenthèse (07) ;
# un nombre négatif devant (08) ; QUESTION 2 (08q, réponse B) ; défi (09) et correction (09b) ;
# ce que tu as appris (10) ; fin du 05/11 (11).
# Code couleur : x bleu ; le nombre qui se distribue et ses flèches orange ; juste vert ; piège rouge.
# Voix : manim/voix/4e-distrib-simple.json ; marques : distrib_simple_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/distrib_simple.py DistribSimple4e --media_dir manim/scripts/4e/media-dist-01-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/distrib_simple.py DistribSimple4e -o eleveai-maths-4e-distrib-simple --media_dir manim/scripts/4e/media-dist-01
# Sortie : manim/sorties/4e/maths/distributivite/01-simple/eleveai-maths-4e-distrib-simple.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_resoudre_distributivite import Bloc, Barre, BLEU_BLOC  # noqa: E402

BOIS = "#a16207"  # les petites planches de 4 dm
FACTEUR = OPERATION  # le nombre qui se distribue, et ses flèches


def D(s, fs=56, couleur=WHITE, lettres="x", audit=True):
    """Une expression : la lettre en bleu."""
    return E(s, fs, couleur, lettres=lettres, audit=audit)


def paquet(u=0.3, h=0.5, x_val=9, n=4, fs=28):
    """Un paquet de Lucas : la grande planche x (bleue) et la petite planche de 4 (bois)."""
    a = Bloc(x_val * u, h, BLEU_BLOC, "x", fs)
    b = Bloc(n * u, h, BOIS, str(n), fs)
    g = VGroup(a, b).arrange(RIGHT, buff=0.06)
    g.a, g.b = a, b
    return g


def etagere(s=1.0):
    """Une étagère : deux montants et trois planches."""
    c = "#d6a35c"
    m1 = Rectangle(width=0.1, height=1.1, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(-0.45, 0))
    m2 = Rectangle(width=0.1, height=1.1, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0.45, 0))
    pl = VGroup(*[Rectangle(width=1.0, height=0.08, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0, y)) for y in (-0.5, 0.0, 0.5)])
    return VGroup(m1, m2, pl).scale(s)


def lucas(s=0.78):
    """Lucas : tablier de menuisier et crayon sur l'oreille."""
    m = Metier(["Lucas", "menuisier"], fs=36, peau="#e0ac69", tenue="#78350f", cheveux="#3f2a14", s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    tablier = RoundedRectangle(width=0.5 * s, height=0.62 * s, corner_radius=0.05, fill_color="#fbbf24", fill_opacity=0.9, stroke_width=0)
    tablier.move_to(p.get_center() + DOWN * 0.18 * s)
    crayon = Line(P(0, 0), P(0.32 * s, 0.1 * s), color="#facc15", stroke_width=6).move_to(p.tete.get_right() + P(0.08, 0.12) * s)
    p.add(tablier, crayon)
    return m


class DistribSimple4e(PaysageRel):
    nom_voix = "4e-distrib-simple"
    fichier_marques = "distrib_simple_marques.json"
    ceinture = "jaune"

    def fleches(self, e, i_k, cibles, couleur=None, angles=(-1.6, -1.15)):
        """Du nombre devant la parenthèse (atome i_k) vers chaque terme visé."""
        return [self.fleche_arc(e.atomes[i_k], e.atomes[j], couleur or FACTEUR, angle=a) for j, a in zip(cibles, angles)]

    def fleche_arc(self, a, b, couleur=None, angle=-1.2, sw=5):
        return CurvedArrow(a.get_top() + UP * 0.1, b.get_top() + UP * 0.12, angle=angle, color=couleur or FACTEUR,
                           stroke_width=sw, tip_length=0.16)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La distributivité simple", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("La distributivité", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        e = D("3(x + 4)", 84, audit=False).move_to(P(-4.0, 0.25))
        e.atomes[0].set_color(FACTEUR)
        pa = VGroup(e.atomes[1], e.atomes[5])
        l1 = self.lg("Comment enlever une parenthèse", 3.0, 0.6, 40, maxw=6.4)
        self.dit(l1, "Comment enlever une parenthèse", avec=[FadeIn(e, shift=UP * 0.2)])
        self.play(pa.animate.set_color(JAUNE_TITRE).scale(1.12), run_time=0.3)
        l2 = self.lg("sans rien oublier ?", 3.0, -0.15, 48, JAUNE_TITRE, maxw=6.4)
        self.dit(l2, "sans rien oublier ?")
        self.play(pa.animate.scale(1 / 1.12), run_time=0.25)
        self.insister(l2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Lucas et ses 3 étagères ────────────────────────────────────────
    def ecran_menuisier(self):
        self.ecran("01-menuisier")
        m = lucas()
        m.perso.move_to(P(-5.3, 0.9))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.3)
        self.au("Lucas", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("menuisier", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        ets = VGroup(*[etagere(0.95) for _ in range(3)]).arrange(RIGHT, buff=0.45).move_to(P(-3.4, -1.75))
        self.dit(self.lg("Il fabrique 3 étagères identiques.", 2.6, 2.6, 38, CIEL, maxw=7.4), "Il fabrique 3 étagères identiques.",
                 avec=[LaggedStart(*[FadeIn(x, shift=UP * 0.2) for x in ets], lag_ratio=0.25)])
        self.dit(self.lg("Pour chaque étagère, il lui faut", 2.6, 1.75, 36, maxw=7.4), "Pour chaque étagère, il lui faut",
                 avec=[Circumscribe(ets[0], color=WHITE)])
        a = Bloc(9 * 0.3, 0.6, BLEU_BLOC, "x dm", 30).move_to(P(1.75, -0.6))
        l3 = self.lg("une planche de x décimètres,", 2.6, 1.1, 36, lettres="x", maxw=7.4)
        self.dit(l3, "une planche de x décimètres,", avec=[FadeIn(a, shift=RIGHT * 0.3)])
        b = Bloc(4 * 0.3, 0.6, BOIS, "4 dm", 30).next_to(a, RIGHT, buff=0.06)
        l4 = self.lg("et une petite planche de 4 décimètres.", 2.6, 0.45, 36, maxw=7.6)
        self.dit(l4, "et une petite planche de 4 décimètres.", avec=[FadeIn(b, shift=LEFT * 0.3)])
        q = self.lg("Combien de bois en tout ?", 2.6, -1.85, 46, JAUNE_TITRE, maxw=7.4)
        self.dit(q, "Combien de bois en tout ?")
        self.insister(q, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 à 05 : deux façons de compter, sur le même écran ─────────────────
    def ecran_paquets(self):
        self.ecran("02-paquets")
        ys = (2.35, 1.6, 0.85)
        pqs = VGroup(*[paquet() for _ in ys])
        for p, y in zip(pqs, ys):
            p.move_to(P(-3.7, y))
        cadres = VGroup(*[DashedVMobject(SurroundingRectangle(p, buff=0.08, color=CIEL, stroke_width=3), num_dashes=36) for p in pqs])
        t1 = self.lg("Première façon de compter :", 3.3, 3.05, 38, CIEL, maxw=6.2)
        self.dit(t1, "Première façon de compter :")
        t2 = self.lg("3 paquets,", 3.3, 2.35, 38, maxw=6.2)
        self.dit(t2, "3 paquets,", avec=[LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in pqs], lag_ratio=0.2), Create(cadres)])
        t3 = self.lg("et dans chaque paquet, x + 4.", 3.3, 1.7, 36, lettres="x", maxw=6.2)
        self.dit(t3, "et dans chaque paquet, x plus 4.", avec=[Circumscribe(pqs[0], color=WHITE)])
        t4 = self.lg("Ça s'écrit", 1.3, 0.75, 38, maxw=3)
        self.dit(t4, "Ça s'écrit")
        e = D("3(x + 4)", 64).move_to(P(4.6, 0.75))
        self.dire_eq(e, "3 fois, entre parenthèses, x plus 4.", echelle=1.2)
        self.play(e.atomes[0].animate.set_color(FACTEUR), run_time=0.15)
        ce = self.cadre_ok(e, 0.15).set_color(CIEL)
        self.play(Create(ce), run_time=0.2)
        self.insister(e, 1.12, 0.2)
        self.attendre_voix(marge=0.5)
        self.f = dict(pqs=pqs, cadres=cadres, textes=VGroup(t1, t2, t3, t4, ce), e=e)

    def ecran_ranger(self):
        f = self.f
        self.dire("03-ranger")
        pqs, e = f["pqs"], f["e"]
        self.play(FadeOut(f["textes"]), e.animate.scale(0.75).move_to(P(3.3, 3.05)), run_time=0.4)
        t1 = self.lg("Deuxième façon :", 3.0, 2.25, 40, CIEL, maxw=7.0)
        self.dit(t1, "Deuxième façon :")
        t2 = self.lg("Lucas range ses planches par taille.", 3.0, 1.6, 36, maxw=7.0)
        ga = [P(-4.6, y) for y in (-0.55, -1.15, -1.75)]
        gb = [P(-1.6, y) for y in (-0.55, -1.15, -1.75)]
        self.dit(t2, "Lucas range ses planches par taille.", avec=[FadeOut(f["cadres"])])
        self.play(*[p.a.animate.move_to(c) for p, c in zip(pqs, ga)], *[p.b.animate.move_to(c) for p, c in zip(pqs, gb)], run_time=0.9)
        ba = Brace(VGroup(*[p.a for p in pqs]), DOWN, buff=0.12, color=BLEU_CALCUL)
        bb = Brace(VGroup(*[p.b for p in pqs]), DOWN, buff=0.12, color=BOIS)
        t3 = self.lg("3 grandes planches de x :", 3.0, 0.85, 36, lettres="x", maxw=7.0)
        self.dit(t3, "3 grandes planches de x :", avec=[GrowFromCenter(ba)])
        r1 = D("3x", 52).next_to(ba, DOWN, buff=0.1)
        self.dire_eq(r1, "3 x.", echelle=1.4)
        t4 = self.lg("3 petites planches de 4 :", 3.0, 0.2, 36, maxw=7.0)
        self.dit(t4, "3 petites planches de 4 :", avec=[GrowFromCenter(bb)])
        r2 = D("12", 52).next_to(bb, DOWN, buff=0.1)
        self.dire_eq(r2, "12. En", echelle=1.4)
        tot = self.lg("En tout,", 1.6, -0.75, 42, maxw=2.5)
        self.dit(tot, "En tout,")
        s = D("3x + 12", 56).move_to(P(4.6, -0.75))
        self.dire_eq(s, "3 x plus 12.", echelle=1.2)
        cs = self.cadre_ok(s, 0.15).set_color(CIEL)
        self.play(Create(cs), run_time=0.2)
        self.attendre_voix(marge=0.5)
        f.update(textes=VGroup(t1, t2, t3, t4, tot, cs), s=s, ba=ba, bb=bb, r1=r1, r2=r2)

    def ecran_egalite(self):
        f = self.f
        self.dire("04-egalite")
        e, s = f["e"], f["s"]
        self.play(FadeOut(f["textes"]), run_time=0.3)
        l1 = self.lg("C'est le même bois,", 3.0, 1.9, 40, CIEL, maxw=7.0)
        self.dit(l1, "C'est le même bois,", avec=[e.animate.set_opacity(0.35), s.animate.set_opacity(0.35)])
        l2 = self.lg("compté de deux façons.", 3.0, 1.25, 40, CIEL, maxw=7.0)
        self.dit(l2, "compté de deux façons.")
        self.au("Donc", FadeOut(VGroup(e, s, l1, l2)), rt=0.3)
        g = D("3(x + 4) = 3x + 12", 54).move_to(P(2.85, 2.0))
        g.atomes[0].set_color(FACTEUR)
        self.dire_eq(g, "3 fois, entre parenthèses, x plus 4, égale 3 x plus 12.", echelle=1.15)
        self.play(g.egal.animate.set_color(EGAL), run_time=0.1)
        f1, f2 = self.fleches(g, 0, (2, 4))
        l3 = self.lg("Le 3 multiplie x,", 2.85, 0.95, 38, lettres="x", maxw=7.0)
        self.dit(l3, "Le 3 multiplie x,", avec=[Create(f1), g.atomes[2].animate.set_color(FACTEUR)])
        self.play(g.atomes[2].animate.set_color(INCONNUE), Circumscribe(VGroup(*[p.a for p in f["pqs"]]), color=WHITE, run_time=0.35), run_time=0.35)
        l4 = self.lg("et il multiplie aussi le 4.", 2.85, 0.3, 38, maxw=7.0)
        self.dit(l4, "et il multiplie aussi le 4.", avec=[Create(f2), g.atomes[4].animate.set_color(FACTEUR)])
        self.play(g.atomes[4].animate.set_color(WHITE), Circumscribe(VGroup(*[p.b for p in f["pqs"]]), color=WHITE, run_time=0.35), run_time=0.35)
        self.play(FadeOut(VGroup(l3, l4)), run_time=0.25)
        l5 = self.lg("Enlever la parenthèse ainsi,", 2.85, 0.55, 36, maxw=7.0)
        self.dit(l5, "Enlever la parenthèse ainsi,")
        l6 = self.lg("c'est développer :", 2.85, -0.1, 46, JAUNE_TITRE, maxw=7.0)
        self.dit(l6, "c'est développer :")
        self.insister(l6, 1.12, 0.18)
        gauche = VGroup(*g.atomes[:6])
        droite = g.droite
        bp = Brace(gauche, UP, buff=0.18, color=CIEL)
        bs = Brace(droite, UP, buff=0.18, color=VERT_OK)
        tp = T("un produit", 30, CIEL, audit=False).next_to(bp, UP, buff=0.06)
        ts = T("une somme", 30, VERT_OK, audit=False).next_to(bs, UP, buff=0.06)
        l7 = self.lg("un produit devient une somme.", 2.85, -0.8, 40, maxw=7.0)
        self.dit(l7, "un produit", avec=[FadeOut(VGroup(f1, f2)), GrowFromCenter(bp), FadeIn(tp)])
        self.au("une somme", GrowFromCenter(bs), FadeIn(ts), rt=0.3)
        self.insister(VGroup(droite, bs, ts), 1.1, 0.18)
        self.attendre_voix(marge=0.8)

    def ecran_verifier(self):
        self.ecran("05-verifier")
        g = D("3(x + 4) = 3x + 12", 54).sans_audit().mis_sur_egal(0, 2.35)
        g.atomes[0].set_color(FACTEUR)
        self.play(FadeIn(g), run_time=0.3)
        l = self.lg("Vérifions avec x = 10.", 0, 1.3, 40, CIEL, maxw=9)
        self.dit(l, "Vérifions avec x égale 10.")
        dix = [T("10", 36, JAUNE_TITRE, audit=False).next_to(g.atomes[k], UP, buff=0.42) for k in (2, 8)]
        fl = [Arrow(d.get_bottom(), g.atomes[k].get_top(), buff=0.05, color=JAUNE_TITRE, stroke_width=4, max_tip_length_to_length_ratio=0.35) for d, k in zip(dix, (2, 8))]
        self.play(*[FadeIn(d, shift=DOWN * 0.3) for d in dix], *[GrowArrow(a) for a in fl], *[g.atomes[k].animate.set_color(JAUNE_TITRE) for k in (2, 8)], run_time=0.35)
        a = D("3 × 14 = 42", 48).move_to(P(-3.7, 0.1))
        self.dire_eq(a, "3 fois 14 : 42.")
        a.atomes[-1].set_color(VERT_OK)
        b = D("3 × 10 + 12 = 42", 48).move_to(P(3.35, 0.1))
        et = self.lg("Et", -0.05, 0.1, 40, maxw=1)
        self.dit(et, "Et")
        self.dire_eq(b, "3 fois 10 plus 12 : 42.")
        b.atomes[-1].set_color(VERT_OK)
        ok = self.lg("C'est juste.", 0, -1.3, 50, VERT_OK, maxw=6)
        self.dit(ok, "C'est juste.", avec=[Create(self.cadre_ok(a.atomes[-1], 0.1)), Create(self.cadre_ok(b.atomes[-1], 0.1))])
        self.insister(ok, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = T("Le piège :", 46, PIEGE, gras=True).move_to(P(-4.9, 3.0))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.25)
        l = self.lg("écrire 3x + 4.", -0.6, 3.0, 46, PIEGE, lettres="", maxw=5)
        self.dit(l, "écrire 3 x plus 4.")
        ba = self.barrer(VGroup(*l.atomes[1:]))
        self.play(Create(ba), run_time=0.25)
        e0 = D("3(x + 4)", 64, audit=False).move_to(P(3.9, 2.6))
        e0.atomes[0].set_color(FACTEUR)
        f1 = self.fleche_arc(e0.atomes[0], e0.atomes[2], angle=-1.6)
        quatre = e0.atomes[4]
        sl = Line(quatre.get_corner(DL) + P(-0.04, -0.1), quatre.get_corner(DR) + P(0.04, -0.1), color=PIEGE, stroke_width=8)
        l2 = self.lg("Le 3 a oublié le 4 !", 0, 1.85, 42, maxw=9)
        self.dit(l2, "Le 3 a oublié le 4 !", avec=[FadeIn(e0), Create(f1)])
        self.play(Create(sl), run_time=0.2)
        ys = (0.65, -0.1, -0.85)
        rangs = VGroup()
        trous = VGroup()
        for i, y in enumerate(ys):
            p = paquet().move_to(P(-3.0, y))
            rangs.add(p)
            if i:
                t = DashedVMobject(Rectangle(width=p.b.width, height=p.b.height, stroke_color=PIEGE, stroke_width=4), num_dashes=18).move_to(p.b)
                trous.add(VGroup(t, T("?", 34, PIEGE, audit=False, gras=True).move_to(t)))
                p.remove(p.b)
        l3 = self.lg("Lucas n'aurait qu'une seule", 3.0, 0.75, 38, maxw=7.0)
        self.dit(l3, "Lucas n'aurait qu'une seule", avec=[FadeIn(rangs, shift=RIGHT * 0.2)])
        l3b = self.lg("petite planche,", 3.0, 0.15, 38, maxw=7.0)
        self.dit(l3b, "petite planche,")
        l4 = self.lg("au lieu de 3.", 3.0, -0.45, 38, maxw=7.0)
        self.dit(l4, "au lieu de 3.", avec=[Create(trous)])
        self.play(Indicate(trous, color=PIEGE, scale_factor=1.1), run_time=0.4)
        br = Brace(trous, LEFT, buff=0.12, color=PIEGE)
        self.au("Il lui manquerait", GrowFromCenter(br), rt=0.3)
        l5 = self.lg("Il lui manquerait 8 décimètres de bois.", 0, -2.1, 40, PIEGE, maxw=10)
        self.dit(l5, "Il lui manquerait 8 décimètres de bois.")
        self.insister(l5, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 1 (réponse C) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        pqs = VGroup(*[paquet(u=0.26, h=0.38, x_val=9, n=2, fs=24) for _ in range(5)]).arrange(DOWN, buff=0.14).move_to(P(-3.6, -0.2))
        acc = Brace(pqs, LEFT, buff=0.1, color=CIEL)
        cinq = T("5 fois", 30, CIEL, audit=False).next_to(acc, LEFT, buff=0.08)
        e = D("5(x + 2)", 60, audit=False).move_to(P(-3.6, 2.4))
        e.atomes[0].set_color(FACTEUR)

        def avant(sc):
            sc.eq_dans_q(0, "Que donne 5(x + 2) ?", "Que donne 5 fois, entre parenthèses, x plus 2 ?", fs=36)
            sc.play(FadeIn(e), FadeIn(pqs), GrowFromCenter(acc), FadeIn(cinq), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : 5x + 10.", "Réponse C : 5 x plus 10.", lettres="x", premier=True)
            f1 = sc.fleche_arc(e.atomes[0], e.atomes[2], angle=-1.6)
            sc.ph_eq(1, "Le 5 multiplie x,", "Le 5 multiplie x,", lettres="x", avec=[Create(f1)])
            f2 = sc.fleche_arc(e.atomes[0], e.atomes[4], angle=-1.15)
            sc.ph_eq(2, "et il multiplie aussi le 2.", "et il multiplie aussi le 2.", avec=[Create(f2), Circumscribe(VGroup(*[p.b for p in pqs]), color=WHITE)])
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["Que donne 5(x + 2) ?"],
                            [Eq("5x + 2", 34), Eq("x + 10", 34), Eq("5x + 10", 34)], 2,
                            ["Réponse C : 5x + 10.", "Le 5 multiplie x,", "et il multiplie aussi le 2."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : un moins dans la parenthèse ────────────────────────────────────
    def ecran_moins(self):
        self.ecran("07-moins")
        tit = self.lg("Avec un moins dans la parenthèse.", 0, 3.1, 44, JAUNE_TITRE, maxw=11)
        self.dit(tit, "Avec un moins dans la parenthèse.")
        u, h = 0.3, 0.46
        ys = (2.05, 1.45, 0.85, 0.25)
        pleins = VGroup(*[Bloc(10 * u, h, BLEU_BLOC, "x", 28).move_to(P(-3.6, y)) for y in ys])
        l1 = self.lg("Lucas a 4 planches de x décimètres.", 3.0, 2.05, 34, lettres="x", maxw=7.0)
        self.dit(l1, "Lucas a 4 planches de x décimètres.", avec=[LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in pleins], lag_ratio=0.15)])
        coupes = VGroup(*[Barre(u, h, 10, 3, "x − 3", 26).move_to(p) for p in pleins])
        for c in coupes:
            c.align_to(pleins[0], LEFT)
        l2 = self.lg("Il coupe 3 décimètres sur chacune.", 3.0, 1.45, 34, maxw=7.0)
        scie = VGroup(*[DashedLine(P(c.retire.get_left()[0], c.get_top()[1] + 0.06), P(c.retire.get_left()[0], c.get_bottom()[1] - 0.06), color=FACTEUR, stroke_width=4) for c in coupes])
        self.dit(l2, "Il coupe 3 décimètres sur chacune.", avec=[Create(scie)])
        self.play(*[ReplacementTransform(p, c) for p, c in zip(pleins, coupes)], FadeOut(scie), run_time=0.5)
        self.play(*[c.retire.animate.shift(DOWN * 0.12).set_opacity(0.45) for c in coupes], run_time=0.3)
        l3 = self.lg("Il lui reste", 0.9, 0.55, 36, maxw=3)
        self.dit(l3, "Il lui reste")
        e = D("4(x − 3)", 58).move_to(P(4.4, 0.55))
        self.dire_eq(e, "4 fois, entre parenthèses, x moins 3.", echelle=1.2)
        self.play(e.atomes[0].animate.set_color(FACTEUR), run_time=0.12)
        f1 = self.fleche_arc(e.atomes[0], e.atomes[2], angle=-1.6)
        c1 = self.lg("Le 4 multiplie x : 4x.", -3.3, -0.85, 36, lettres="x", maxw=6.2)
        self.dit(c1, "Le 4 multiplie x : 4 x.", avec=[Create(f1)])
        f2 = self.fleche_arc(e.atomes[0], e.atomes[4], angle=-1.15)
        c2 = self.lg("Le 4 multiplie 3 : 12.", -3.3, -1.55, 36, maxw=6.2)
        self.dit(c2, "Le 4 multiplie 3 : 12.", avec=[Create(f2)])
        r = self.lg("Résultat : 4x − 12.", 3.0, -1.2, 46, VERT_OK, lettres="", maxw=6.0)
        self.dit(r, "Résultat : 4 x moins 12.")
        self.play(Create(self.cadre_ok(r, 0.15)), run_time=0.2)
        moins = r.atomes[-2]
        l4 = self.lg("Le moins reste devant le 12.", 0, -2.55, 38, maxw=10)
        self.dit(l4, "Le moins reste devant le 12.", avec=[moins.animate.set_color(FACTEUR)])
        self.insister(VGroup(moins, r.atomes[-1]), 1.3, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 08 : un nombre négatif devant ───────────────────────────────────────
    def ecran_negatif(self):
        self.ecran("08-negatif")
        tit = self.lg("Et avec un nombre négatif devant la parenthèse ?", 0, 3.1, 40, JAUNE_TITRE, maxw=12)
        self.dit(tit, "Et avec un nombre négatif devant la parenthèse ?")
        e = D("−2(x − 5)", 70).move_to(P(-4.3, 1.35))
        self.dire_eq(e, "Moins 2 fois, entre parenthèses, x moins 5.", echelle=1.15)
        k = VGroup(e.atomes[0], e.atomes[1])
        self.play(k.animate.set_color(FACTEUR), run_time=0.12)
        f1 = self.fleche_arc(e.atomes[1], e.atomes[3], angle=-1.6)
        a = D("(−2) × x = −2x", 46).mis_sur_egal(3.1, 1.85)
        self.dire_eq(a, "Moins 2 fois x : moins 2 x.", avec=[Create(f1)])
        f2 = self.fleche_arc(e.atomes[1], VGroup(e.atomes[4], e.atomes[5]), angle=-1.2)
        b = D("(−2) × (−5) = +10", 46).mis_sur_egal(3.1, 0.85)
        self.dire_eq(b, "Moins 2 fois moins 5 : plus 10.", avec=[Create(f2)])
        self.play(*[x.animate.set_color(VERT_OK) for x in b.droite], run_time=0.12)
        r = self.lg("Résultat : −2x + 10.", -1.8, -0.75, 50, VERT_OK, lettres="", maxw=8)
        self.dit(r, "Résultat : moins 2 x plus 10.")
        self.play(Create(self.cadre_ok(r, 0.15)), run_time=0.2)
        l1 = self.lg("Le signe moins se distribue lui aussi,", -0.6, -1.85, 38, maxw=10.5)
        self.dit(l1, "Le signe moins se distribue lui aussi,", avec=[Indicate(e.atomes[0], color=FACTEUR, scale_factor=1.5)])
        l2 = self.lg("à chaque terme.", -0.6, -2.5, 38, JAUNE_TITRE, maxw=10.5)
        self.dit(l2, "à chaque terme.", avec=[Indicate(VGroup(f1, f2), color=WHITE, scale_factor=1.05)])
        self.attendre_voix(marge=0.8)

    # ── 08q : QUESTION 2 (réponse B) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e = D("−3(x + 4)", 76, audit=False).move_to(P(-3.5, 0.6))
        VGroup(e.atomes[0], e.atomes[1]).set_color(FACTEUR)

        def avant(sc):
            sc.eq_dans_q(0, "Que donne −3(x + 4) ?", "Que donne moins 3 fois, entre parenthèses, x plus 4 ?", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : −3x − 12.", "Réponse B : moins 3 x moins 12.", lettres="x", premier=True)
            f = VGroup(sc.fleche_arc(e.atomes[1], e.atomes[3], angle=-1.6), sc.fleche_arc(e.atomes[1], e.atomes[5], angle=-1.15))
            sc.ph_eq(1, "−3 × 4, c'est −12.", "Moins 3 fois 4, c'est moins 12.", avec=[Create(f)])
            sc.rep_fini()

        self.question_pause("08q-question", "08r-reponse", ["Que donne −3(x + 4) ?"],
                            [Eq("−3x + 12", 34), Eq("−3x − 12", 34), Eq("−3x + 4", 34)], 1,
                            ["Réponse B : −3x − 12.", "−3 × 4, c'est −12."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        dv = self.lg("Développe", -4.4, 1.0, 50, CIEL, maxw=4)
        self.dit(dv, "Développe")
        e = D("6(2x − 5)", 76).move_to(P(0.6, 1.0))
        self.dire_eq(e, "6 fois, entre parenthèses, 2 x moins 5.", echelle=1.15)
        self.play(e.atomes[0].animate.set_color(FACTEUR), run_time=0.12)
        q = T("= ?", 84, JAUNE_TITRE, audit=False).next_to(e, RIGHT, buff=0.3)
        self.play(FadeIn(q, scale=1.3), run_time=0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.4))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, dv=dv, e=e, q=q, pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 09b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("09b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.9))
        e = d["e"]
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["q"]), FadeOut(d["dv"]),
                e.animate.scale(0.8).move_to(P(-3.6, 1.35)), rt=0.4)
        f1 = self.fleche_arc(e.atomes[0], VGroup(e.atomes[2], e.atomes[3]), angle=-1.6)
        c1 = self.lg("Le 6 multiplie 2x : 12x.", 2.9, 1.5, 38, lettres="x", maxw=6.6)
        self.dit(c1, "Le 6 multiplie 2 x : 12 x.", avec=[Create(f1)])
        f2 = self.fleche_arc(e.atomes[0], e.atomes[5], angle=-1.15)
        c2 = self.lg("Le 6 multiplie 5 : 30,", 2.9, 0.7, 38, maxw=6.6)
        self.dit(c2, "Le 6 multiplie 5 : 30,", avec=[Create(f2)])
        c3 = self.lg("avec le moins devant.", 2.9, 0.1, 38, maxw=6.6)
        self.dit(c3, "avec le moins devant.", avec=[Indicate(e.atomes[4], color=FACTEUR, scale_factor=1.6)])
        r = self.lg("Résultat : 12x − 30.", 0, -1.3, 58, VERT_OK, lettres="", maxw=10)
        self.dit(r, "Résultat : 12 x moins 30.")
        self.play(Create(self.cadre_ok(r, 0.18)), run_time=0.2)
        self.insister(r, 1.1, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.5)
        e = D("3(x + 4)", 54, audit=False)
        e.atomes[0].set_color(FACTEUR)
        f = VGroup(self.fleche_arc(e.atomes[0], e.atomes[2], VERT_OK, angle=-1.6),
                   self.fleche_arc(e.atomes[0], e.atomes[4], VERT_OK, angle=-1.15))
        r = D("= 3x + 12", 46, VERT_OK, audit=False).next_to(e, DOWN, buff=0.3)
        p = paquet(u=0.25, h=0.42, fs=24).next_to(r, DOWN, buff=0.45)
        fig = VGroup(f, e, r, p)
        lignes = self.finale_colonne([["Le nombre devant la parenthèse", "multiplie chaque terme."],
                                      ["Il garde son signe, et", "les signes se multiplient."],
                                      ["Développer, c'est transformer", "un produit en somme."]],
                                     fs=38, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_menuisier()
        self.ecran_paquets()
        self.ecran_ranger()
        self.ecran_egalite()
        self.ecran_verifier()
        self.ecran_piege()
        self.ecran_question1()
        self.ecran_moins()
        self.ecran_negatif()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")
