# frac_simplifier.py
# EleveAI — Maths 4e — série « Fractions », épisode 02 : SIMPLIFIER UNE FRACTION
# (micro du coach : fraction_simplifier), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE : la paysage complète du niveau 4e (diviseur commun, critères de
# divisibilité, pas à pas ou en une étape par le plus grand diviseur commun,
# fraction irréductible, pièges, défi corrigé), repère de REGLES.md.
# Short jumeau : frac_simplifier_short.py (blanche, les briques de construction).
# ⭐ C'est LA PREMIÈRE erreur des 4e de Frédéric sur les copies : ils ne savent
# pas simplifier. Leurres tirés de ses copies : SOUSTRAIRE (15/20 → 10/15),
# ne diviser qu'UN terme (15/20 → 3/20), S'ARRÊTER trop tôt (45/60 → 9/12).
#
# Décor et métier : le RECYCLAGE ; Léna, TECHNICIENNE dans un centre de tri :
# 48 kg de plastique sur 120 kg de déchets → 48/120 = 4/10 (caisses de 12 kg)
# = 2/5. Défi : 27 kg de verre sur 90 kg → 3/10 (= 0,3 = 30 %, la chaîne).
# Chiffres inventés (aucune donnée du monde réel citée). Centres : nature-ecologie.
# Vérifié (Python) : pgcd(48,120) = 24 ; 36/48 = 3/4 ; 45/60 = 3/4 ; 9/14
# irréductible ; pgcd(15,21) = 3 ; pgcd(22,33) = 11 ; 27/90 = 3/10.
#
# Micro → écrans : diviser haut ET bas par le même nombre (02, 03), fraction
# irréductible (03, question 3 = item genIrreductible), critères de
# divisibilité (04), pas à pas / plus grand diviseur commun en une étape (05,
# question 1 = item genSimplifierPgcd), pièges soustraire / un seul terme (07),
# s'arrêter trop tôt (question 2 = item genSimplifierQcm), défi (10).
# Écrans : 00 garde · 01 Léna · 02 les caisses (÷ 12) · 03 encore (÷ 2) →
# irréductible · 04 critères · 05 pas à pas / en une étape · 06 QUESTION 1 ·
# 07 les pièges · 08 QUESTION 2 · 09 QUESTION 3 · 10 défi · 10b correction ·
# 11 ce que tu as appris · 12 fin.
#
# ⭐ Bases : 4e/frac_lotd_commun.py (PaysageLotD, audit de synchro) ; figures
# canvas_fractions.py (non modifié). Ajouté ici : technicienne(), benne().
# Voix : manim/voix/4e-frac-simplifier.json (débit −10), WAV dans
# public/sons/4e-frac-simplifier/ ; marques : 4e/frac_simplifier_marques.json
# (scripts/marques_dump.ps1 + scripts/cues2marques.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_simplifier.py FracSimplifier4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_simplifier.py FracSimplifier4e -o eleveai-maths-4e-frac-simplifier --media_dir manim/scripts/4e/media-frac-simplifier
# Sortie : manim/sorties/4e/maths/fractions/02-simplifier/eleveai-maths-4e-frac-simplifier.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotd_commun import *  # noqa: E402,F403

PLASTIQUE = BLEU_PART
VERRE = VERT_PART
GILET = "#f97316"


def technicienne(s=1.0):
    """Léna : gilet orange à bandes, casque de chantier jaune, gants."""
    p = personne(peau=PEAUX[0], tenue=GILET, cheveux="#111827", longs=True)
    bandes = VGroup(*[Line(P(-0.62, y), P(0.62, y), color="#e5e7eb", stroke_width=7) for y in (-1.15, -1.45)])
    casque = VGroup(AnnularSector(inner_radius=0, outer_radius=0.5, angle=PI, start_angle=0, fill_color="#facc15",
                                  fill_opacity=1, stroke_width=0),
                    RoundedRectangle(width=1.15, height=0.1, corner_radius=0.04, fill_color="#eab308",
                                     fill_opacity=1, stroke_width=0)).move_to(P(0, 0.42))
    p.add(bandes, casque)
    return p.scale(s)


def benne(largeur=2.8, h=1.6, centre=ORIGIN):
    """Une benne de tri verte, des bouteilles bleues dedans."""
    caisse = Polygon(P(-largeur / 2, h / 2), P(largeur / 2, h / 2), P(largeur / 2 - 0.3, -h / 2),
                     P(-largeur / 2 + 0.3, -h / 2), fill_color="#15803d", fill_opacity=1, stroke_color="#14532d",
                     stroke_width=4)
    btl = VGroup(*[RoundedRectangle(width=0.22, height=0.55, corner_radius=0.08, fill_color=PLASTIQUE,
                                    fill_opacity=1, stroke_width=0).rotate(a).move_to(P(x, h / 2 + 0.12))
                   for x, a in ((-0.9, 0.4), (-0.45, -0.2), (0.1, 0.6), (0.55, -0.5), (0.95, 0.2))])
    fleche = Text("TRI", font_size=40, color=WHITE, weight=BOLD)
    fleche.sans_synchro = True
    g = VGroup(btl, caisse, fleche).move_to(centre)
    fleche.move_to(caisse)
    g.btl, g.caisse = btl, caisse
    return g


class FracSimplifierBase(PaysageLotD):
    nom_voix = "4e-frac-simplifier"
    fichier_marques = "frac_simplifier_marques.json"

    def barre10(self, k=0, centre=P(-3.2, 2.1), couleur=PLASTIQUE):
        return Barre(10, k, largeur=5.8, hauteur=0.8, couleur=couleur, centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Simplifier une fraction", self.identite, self.ceinture, y_ech=-2.7)
        b1 = Barre(10, 4, largeur=4.4, hauteur=0.55, centre=P(-0.8, 0.75))
        b2 = Barre(5, 2, largeur=4.4, hauteur=0.55, centre=P(-0.8, -0.65))
        self.au_mot("Simplifier une")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("la même fraction")
        self.play(b1.apparaitre(0.9), b2.apparaitre(0.9))
        self.au_mot("les plus petits")
        q = self.t("?", 90, AMBRE).next_to(VGroup(b1, b2), RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), Create(b1.fin_coloriee(vers=-1.95)), run_time=0.6)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Léna, technicienne du tri ──────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = technicienne(1.05).move_to(P(-4.9, -0.3))
        self.au_mot("Voici Léna")
        nom = self.t("Léna", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("technicienne")
        metier = VGroup(self.t("technicienne", 28, BLEU_CALCUL), self.t("du centre de tri", 28, BLEU_CALCUL)).arrange(
            DOWN, buff=0.06).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        bn = benne(largeur=2.4, h=1.4, centre=P(-1.6, -0.6))
        self.au_mot("un camion")
        self.play(FadeIn(bn.caisse, shift=UP * 0.2), FadeIn(bn[2]), run_time=0.5)
        self.au_mot("120 kilos")
        l1 = self.col(self.ligne([("120 kg", BLEU_CALCUL), ("de déchets", WHITE)], 40), 2.3)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("48 kilos")
        l2 = self.col(self.ligne([("dont", WHITE), ("48 kg", PLASTIQUE), ("de plastique", WHITE)], 40), 1.4)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(b, shift=DOWN * 0.4) for b in bn.btl],
                                                           lag_ratio=0.15), run_time=0.8)
        self.au_mot("Quelle fraction")
        q = self.col(self.t("Quelle fraction ?", 40, ORANGE_RETENUE), 0.5)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.au_mot("48 sur 120")
        f = EcritureFraction(48, 120, fs=84)
        self.col(f, -1.0)
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("trop grands")
        tg = self.t("trop grands !", 36, AMBRE).next_to(f, DOWN, buff=0.3).align_to(f, LEFT)
        self.play(FadeIn(tg, shift=RIGHT * 0.2), Indicate(f, color=AMBRE), run_time=0.6)
        self.attendre_voix()

    # ── 02 : les caisses de 12 kg (÷ 12) ────────────────────────────────────
    def ecran_caisses(self):
        self.ecran("02-caisses")
        b = self.barre10()
        self.au_mot("caisses de 12 kilos")
        l0 = self.col(self.ligne([("1 caisse =", WHITE), ("12 kg", AMBRE)], 40), 2.5)
        self.play(b.apparaitre(1.0), FadeIn(l0, shift=RIGHT * 0.2), run_time=1.0)
        self.au_mot("120 divisé par 12")
        l1 = self.col(self.ligne([("120 ÷ 12 =", WHITE), ("10 caisses", BLEU_CALCUL)], 40), 1.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.play(LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.12) for p in b.parts], lag_ratio=0.08),
                  run_time=0.9)
        self.au_mot("48 divisé par 12")
        l2 = self.col(self.ligne([("48 ÷ 12 =", WHITE), ("4 caisses", PLASTIQUE)], 40), 0.7)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.play(b.colorier(range(4)), run_time=0.9)
        f, g = EcritureFraction(48, 120, fs=70), EcritureFraction(4, 10, fs=70)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.2, -1.05))
        haut, bas = fleches(f, g, "÷ 12", fs=36, angle=TAU / 7)
        self.au_mot("48 cent")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_mot("4 dixièmes")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_nb("bas par 12")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.6)
        self.play(Create(self.encadrer(VGroup(eg, haut, bas), buff=0.12)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : encore ÷ 2 → 2/5, irréductible ─────────────────────────────────
    def ecran_encore(self):
        self.ecran("03-encore")
        b = self.barre10(4)
        self.add(b)
        f, g = EcritureFraction(4, 10, fs=84), EcritureFraction(2, 5, fs=84)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.2, -1.1))
        haut, bas = fleches(f, g, "÷ 2", fs=38, angle=TAU / 7)
        self.au_mot("Encore plus simple")
        tit = self.titre("Encore plus simple ?", AMBRE, 42)
        self.au_mot("4 et 10 sont pairs")
        l1 = self.col(self.ligne([("4 et 10 :", WHITE), ("pairs", AMBRE)], 40), 1.9)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(f, scale=1.2), run_time=0.5)
        self.play(Indicate(VGroup(f.num, f.den), color=AMBRE), run_time=0.5)
        self.au_nb("on divise par 2")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.6)
        self.au_mot("2 cinquièmes")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("on regroupe")
        gr = b.groupes(2)
        self.play(LaggedStart(*[Create(r) for r in gr], lag_ratio=0.15), run_time=0.8)
        b5, anim = b.regrouper(2, run_time=1.0)
        self.play(anim, FadeOut(gr), run_time=1.0)
        self.au_mot("ne bouge pas")
        self.play(Create(b5.fin_coloriee(vers=-0.3)), Indicate(VGroup(*b5.parts[:2]), color=WHITE), run_time=0.7)
        self.au_mot("2 et 5")
        bl = self.bloc(["2 et 5 : plus de diviseur", "commun, à part 1."], 36)
        self.poser(bl, 0.6)
        self.au_mot("irréductible")
        irr = self.col(self.t("irréductible", 52, VERT_OK), -0.9)
        self.play(FadeIn(irr, scale=1.4), Circumscribe(g, color=VERT_OK), run_time=0.6)
        self.play(Create(self.encadrer(irr)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : les critères de divisibilité ───────────────────────────────────
    def ecran_criteres(self):
        self.ecran("04-criteres")
        self.au_mot("utilise les critères")
        tit = self.t("Les critères de divisibilité", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.6)
        rangs = [("Par 2 :", "le nombre est pair.", "Par 2"), ("Par 5 :", "il finit par 0 ou 5.", "Par 5"),
                 ("Par 3 ou 9 :", "somme des chiffres dans la table.", "Par 3")]
        for k, (a, b_, mot) in enumerate(rangs):
            lg = self.ligne([(a, AMBRE), (b_, WHITE)], 38).move_to(P(0, 1.85 - k * 0.9)).align_to(P(-5.6, 0), LEFT)
            self.au_mot(mot)
            self.play(FadeIn(lg[0], scale=1.2), run_time=0.3)
            self.play(FadeIn(lg[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Pour 48 et 120")
        n1, n2 = self.t("48", 70, BLEU_CALCUL), self.t("120", 70, BLEU_CALCUL)
        VGroup(n1, n2).arrange(RIGHT, buff=3.6).move_to(P(-1.4, -1.0))
        self.play(FadeIn(n1, scale=1.3), FadeIn(n2, scale=1.3), run_time=0.4)
        s1 = self.ligne([("4 + 8 =", WHITE), ("12", VERT_OK)], 38).next_to(n1, DOWN, buff=0.3)
        s2 = self.ligne([("1 + 2 + 0 =", WHITE), ("3", VERT_OK)], 38).next_to(n2, DOWN, buff=0.3)
        for m in (*s1, *s2):
            m.sans_synchro = True
        self.au_mot("4 plus 8")
        self.play(FadeIn(s1[0], shift=UP * 0.15), run_time=0.3)
        self.au_nb("égale 12")
        self.play(FadeIn(s1[1], scale=1.3), run_time=0.3)
        self.au_mot("1 plus 2")
        self.play(FadeIn(s2[0], shift=UP * 0.15), run_time=0.3)
        self.au_nb("égale 3")
        self.play(FadeIn(s2[1], scale=1.3), run_time=0.3)
        self.au_mot("Les deux")
        t3 = self.t("table de 3 !", 44, VERT_OK).move_to(P(-1.4, -2.85))
        self.play(FadeIn(t3, scale=1.3), Indicate(VGroup(n1, n2), color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 05 : pas à pas, ou en une seule étape (÷ 24) ────────────────────────
    def ecran_etapes(self):
        self.ecran("05-etapes")
        fs = 56
        fr_ = [EcritureFraction(a, b, fs=fs) for a, b in ((48, 120), (24, 60), (12, 30), (6, 15), (2, 5))]
        VGroup(*fr_).arrange(RIGHT, buff=1.3).move_to(P(-0.4, 1.3))
        egs = [self.t("=", fs).move_to((fr_[i].get_right() + fr_[i + 1].get_left()) / 2).set_y(fr_[0].trait.get_y())
               for i in range(4)]
        for e in egs:
            e.sans_synchro = True
        fl = [fleches(fr_[i], fr_[i + 1], et, fs=32, angle=TAU / 6) for i, et in enumerate(["÷ 2", "÷ 2", "÷ 2", "÷ 3"])]
        mots = [("divisé par 2", 1, "24 soixantièmes"), ("Encore par 2", 1, "12 trentièmes"),
                ("Encore par 2", 2, "6 quinzièmes"), ("Puis par 3", 1, "2 cinquièmes")]
        self.au_mot("pas à pas")
        tit = self.t("Pas à pas…", 38, JAUNE_TITRE).move_to(P(-5.2, 3.3))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("48 cent")
        self.play(FadeIn(fr_[0], scale=1.2), run_time=0.4)
        for i, (m1, n, m2) in enumerate(mots):
            self.au_nb(m1, n=n)
            h, b = fl[i]
            self.play(Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.45)
            self.au_mot(m2)
            self.play(FadeIn(egs[i]), FadeIn(fr_[i + 1], scale=1.3), run_time=0.35)
        self.play(Circumscribe(fr_[4], color=VERT_OK), run_time=0.6)
        self.au_mot("En une seule étape")
        f, g = EcritureFraction(48, 120, fs=54), EcritureFraction(2, 5, fs=54)
        f.move_to(P(-4.7, -1.95))
        g.move_to(P(-1.7, -1.95)).shift(UP * (f.trait.get_y() - g.trait.get_y()))
        sg = self.t("=", 60).move_to(P(-3.2, f.trait.get_y()))
        sg.sans_synchro = True
        h, b = fleches(f, g, "÷ 24", fs=34, angle=TAU / 10)
        pg = self.bloc(["En une seule étape :", "÷ le plus grand", "diviseur commun"], 34, VERT_OK)
        pg[0].set_color(JAUNE_TITRE)
        pg.move_to(P(0, -1.95)).align_to(P(0.2, 0), LEFT)
        self.play(FadeIn(pg[0], shift=UP * 0.15), FadeIn(f, scale=1.2), run_time=0.5)
        self.au_nb("par 24")
        self.play(Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.6)
        self.play(FadeIn(sg), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("le plus grand")
        self.play(FadeIn(pg[1:], shift=LEFT * 0.2), Indicate(h[1], color=VERT_OK, scale_factor=1.4), run_time=0.6)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (36/48 en une étape : ÷ 12) ─────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f, g = EcritureFraction(36, 48, fs=90), EcritureFraction(3, 4, fs=90)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.1, 0.3))
        h, b = fleches(f, g, "÷ 12", fs=44)

        def avant(sc):
            sc.q_tete(FadeIn(f, scale=1.2))

        def apres(sc):
            sc.rep(0, "36 égale")
            sc.au_nb("48 égale 12")
            sc.play(Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.5)
            sc.rep(1, "Donc 36")
            sc.au_mot("3 quarts")
            sc.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
            sc.rep(2, "Avec 6", Indicate(sc.cartes_q[1], color=ORANGE_RETENUE, scale_factor=1.03))
            sc.fin_rep()

        self.question_pause("06-question", "06b-reponse", ["Pour simplifier 36/48 en une", "seule étape, on divise par :"],
                            [self.inline("2"), self.inline("6"), self.inline("12")], 2,
                            ["36 = 12 × 3 et 48 = 12 × 4", "36/48 = 3/4", "÷ 6 → 6/8 : pas fini !"],
                            mot_q="Pour simplifier", avant_q=avant, autres_r=apres)

    # ── 07 : les pièges (soustraire ; un seul terme) ────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        kw = dict(largeur=4.6, hauteur=0.55, marge=0.2)
        ba = Barre(20, 15, centre=P(-2.75, 1.75), **kw)
        bb = Barre(15, 10, centre=P(-2.75, 0.55), couleur=ROUGE_COACH, **kw)
        bc = Barre(20, 3, centre=P(-2.75, -1.15), couleur=ROUGE_COACH, **kw)
        la, lb, lc = (self.inline(s, 30, c).next_to(x, LEFT, buff=0.12)
                      for s, c, x in (("15/20", VERT_OK, ba), ("10/15", ROUGE_ERREUR, bb), ("3/20", ROUGE_ERREUR, bc)))
        self.au_mot("Attention aux pièges")
        tit = self.t("Attention aux pièges !", 46, ROUGE_ERREUR).move_to(P(-0.6, 3.15))
        self.play(Write(tit), run_time=0.5)
        self.au_mot("soustraire")
        f1, g1 = EcritureFraction(15, 20, fs=46), EcritureFraction(10, 15, fs=46, couleur=ROUGE_ERREUR)
        e1 = egalite(f1, g1, signe="→", buff=0.6)
        self.col(e1, 1.4)
        p1 = self.bloc(["on", "soustrait ?"], 26, AMBRE).next_to(e1, RIGHT, buff=0.25)
        self.play(FadeIn(p1, shift=RIGHT * 0.2), run_time=0.35)
        h1, b1 = fleches(f1, g1, "− 5", couleur=ROUGE_ERREUR, fs=32, angle=TAU / 9)
        self.au_mot("15 vingtièmes")
        self.play(FadeIn(f1), FadeIn(ba), FadeIn(la), run_time=0.5)
        self.au_nb("moins 5")
        self.play(Create(h1[0]), FadeIn(h1[1]), Create(b1[0]), FadeIn(b1[1]), run_time=0.5)
        self.au_mot("10 quinzièmes")
        self.play(FadeIn(e1[1]), FadeIn(g1, scale=1.3), FadeIn(bb), FadeIn(lb), run_time=0.5)
        self.au_mot("Faux !")
        x1 = croix(g1, sw=5).set_stroke(opacity=0.85)
        self.play(Create(x1), run_time=0.4)
        self.au_mot("pas la même longueur")
        tir = ba.fin_coloriee(vers=-1.3)
        self.play(Create(tir), Indicate(bb.parts[9], color=ROUGE_ERREUR), run_time=0.7)
        self.au_mot("un seul des deux")
        f2, g2 = EcritureFraction(15, 20, fs=46), EcritureFraction(3, 20, fs=46, couleur=ROUGE_ERREUR)
        e2 = egalite(f2, g2, signe="→", buff=0.6)
        self.col(e2, -1.4)
        p2 = self.bloc(["un seul", "nombre ?"], 28, AMBRE).next_to(e2, RIGHT, buff=0.4)
        self.play(FadeIn(p2, shift=RIGHT * 0.2), run_time=0.35)
        h2, _ = fleches(f2, g2, "÷ 5", bas="", couleur=ROUGE_ERREUR, fs=32, angle=TAU / 9)
        self.au_mot("15 divisé par 5")
        self.play(FadeIn(f2), run_time=0.3)
        self.au_nb("15 divisé par 5")
        self.play(Create(h2[0]), FadeIn(h2[1]), run_time=0.4)
        self.au_mot("20 reste")
        self.play(Indicate(f2.den, color=ROUGE_ERREUR, scale_factor=1.5), run_time=0.5)
        self.au_mot("3 vingtièmes")
        self.play(FadeIn(e2[1]), FadeIn(g2, scale=1.3), FadeIn(bc), FadeIn(lc), run_time=0.5)
        self.au_mot("Faux aussi")
        x2 = croix(g2, sw=5).set_stroke(opacity=0.85)
        self.play(Create(x2), run_time=0.4)
        self.au_mot("On divise en haut")
        r = self.t("En haut ET en bas : ÷ le même nombre !", 34, VERT_OK).move_to(P(-0.4, -2.75))
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.5)
        self.insister(r, 1.08, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (45/60 au maximum) ──────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fs = 66
        fa, fc = EcritureFraction(45, 60, fs=fs), EcritureFraction(3, 4, fs=fs)
        e1 = egalite(fa, fc, buff=1.3).move_to(P(-3.6, 1.7))
        h1, b1 = fleches(fa, fc, "÷ 15", fs=34, angle=TAU / 9)
        fb, fd = EcritureFraction(9, 12, fs=56, couleur=ORANGE_RETENUE), EcritureFraction(3, 4, fs=56)
        e2 = egalite(fb, fd, buff=1.1).move_to(P(-4.2, -1.9))
        h2, b2 = fleches(fb, fd, "÷ 3", fs=32, angle=TAU / 9)
        stop = self.t("encore !", 32, ORANGE_RETENUE).next_to(e2, RIGHT, buff=0.35)

        def avant(sc):
            sc.q_tete(FadeIn(fa, scale=1.2))

        def apres(sc):
            sc.rep(0, "45 égale")
            sc.au_nb("60 égale 15")
            sc.play(Create(h1[0]), FadeIn(h1[1]), Create(b1[0]), FadeIn(b1[1]), run_time=0.5)
            sc.au_mot("3 quarts")
            sc.play(FadeIn(e1[1]), FadeIn(fc, scale=1.3), run_time=0.4)
            sc.rep(1, "9 douzièmes", FadeIn(fb, scale=1.2))
            sc.au_nb("encore par 3")
            sc.play(FadeIn(VGroup(h2, b2, stop)), FadeIn(e2[1]), FadeIn(fd), run_time=0.5)
            sc.rep(2, "Et 40", Indicate(sc.cartes_q[2], color=ROUGE_ERREUR, scale_factor=1.03))
            sc.fin_rep()

        self.question_pause("08-question", "08b-reponse", ["Simplifie 45/60", "au maximum."],
                            [self.inline("9/12"), self.inline("3/4"), self.inline("40/55")], 1,
                            ["45 = 15 × 3 et 60 = 15 × 4", "9/12 : encore ÷ 3 !", "40/55 : on a soustrait 5."],
                            mot_q="Simplifie", avant_q=avant, autres_r=apres)

    # ── 09 : QUESTION 3 (laquelle est irréductible ?) ───────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        lp = VGroup(Circle(radius=1.2, stroke_color=AMBRE, stroke_width=10),
                    Line(P(0.86, -0.86), P(1.9, -1.9), stroke_color=AMBRE, stroke_width=16)).move_to(P(-3.3, 0.4))
        qm = self.t("?", 110, AMBRE).move_to(lp[0])
        self.add(lp, qm)
        f = EcritureFraction(9, 14, fs=110, couleur=VERT_OK).move_to(P(-1.9, 0.4))
        d1 = self.t("9 = 3 × 3", 36, VERT_OK).next_to(f, LEFT, buff=0.5).set_y(f.num.get_y())
        d2 = self.t("14 = 2 × 7", 36, VERT_OK).next_to(f, LEFT, buff=0.5).set_y(f.den.get_y())

        def apres(sc):
            sc.rep(0, "9 égale 3", FadeOut(qm), FadeOut(lp), FadeIn(f, scale=1.2), FadeIn(d1), run_time=0.6)
            sc.au_mot("14 égale")
            sc.play(FadeIn(d2), run_time=0.35)
            sc.rep(1, "15 et 21", Indicate(sc.cartes_q[0], color=ORANGE_RETENUE, scale_factor=1.03))
            sc.rep(2, "22 et 33", Indicate(sc.cartes_q[2], color=ORANGE_RETENUE, scale_factor=1.03))
            sc.fin_rep()

        self.question_pause("09-question", "09b-reponse", ["Laquelle de ces fractions", "est irréductible ?"],
                            [self.inline("15/21"), self.inline("9/14"), self.inline("22/33")], 1,
                            ["9 et 14 : rien en commun.", "15 et 21 : table de 3.",
                             "22 et 33 : table de 11."], mot_q="Laquelle", autres_r=apres)

    # ── 10 : défi (le verre) ────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.titre("À toi de jouer !", fs=50)
        bn = benne(centre=P(-3.3, 0.2))
        for b in bn.btl:
            b.set_fill(VERRE, 1)
        self.au_mot("90 kilos")
        l1 = self.col(self.ligne([("90 kg", BLEU_CALCUL), ("de déchets", WHITE)], 40), 2.0)
        self.play(FadeIn(bn.caisse, shift=UP * 0.2), FadeIn(bn[2]), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("27 kilos")
        l2 = self.col(self.ligne([("dont", WHITE), ("27 kg", VERRE), ("de verre", WHITE)], 40), 1.15)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(b, shift=DOWN * 0.4) for b in bn.btl],
                                                           lag_ratio=0.15), run_time=0.8)
        self.au_mot("Quelle fraction")
        l3 = self.col(self.t("Quelle fraction en verre ?", 38, ORANGE_RETENUE), 0.3)
        self.play(FadeIn(l3, scale=0.8), run_time=0.4)
        self.au_mot("Simplifie-la")
        l4 = self.col(self.t("Simplifie au maximum !", 38, AMBRE), -0.5)
        self.play(FadeIn(l4, shift=UP * 0.2), run_time=0.4)
        self.pause_defi(y=-1.4)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.titre("Correction", fs=50)
        f, g = EcritureFraction(27, 90, fs=84), EcritureFraction(3, 10, fs=84)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.3, 1.0))
        h, b = fleches(f, g, "÷ 9", fs=40, angle=TAU / 6)
        self.au_mot("27 quatre")
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("2 plus 7")
        l1 = self.col(self.t("2 + 7 = 9 et 9 + 0 = 9", 38), 2.1)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("table de 9")
        l2 = self.col(self.t("table de 9 !", 38, AMBRE), 1.3)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(VGroup(f.num, f.den), color=AMBRE), run_time=0.6)
        self.au_mot("27 divisé par 9")
        l3 = self.col(self.t("27 ÷ 9 = 3", 38), 0.45)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_nb("27 divisé par 9")
        self.play(Create(h[0]), FadeIn(h[1]), run_time=0.4)
        self.au_mot("90 divisé par 9")
        l4 = self.col(self.t("90 ÷ 9 = 10", 38), -0.4)
        self.play(FadeIn(l4, shift=RIGHT * 0.2), run_time=0.4)
        self.au_nb("90 divisé par 9")
        self.play(Create(b[0]), FadeIn(b[1]), run_time=0.4)
        self.au_mot("3 dixièmes : irr")
        br = self.barre10(3, centre=P(-3.3, -2.35), couleur=VERRE)
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), br.apparaitre(0.9), run_time=0.9)
        irr = self.col(self.t("irréductible", 40, VERT_OK), -1.3)
        self.play(FadeIn(irr, scale=1.2), Create(self.encadrer(g)), run_time=0.4)
        self.au_mot("c'est 0,3")
        l6 = self.col(self.ligne([("= 0,3", BLEU_CALCUL), ("= 30 %", VERT_OK)], 44), -2.3)
        self.play(FadeIn(l6, shift=UP * 0.2), run_time=0.4)
        self.au_mot("la prochaine")
        self.play(Indicate(l6, color=AMBRE, scale_factor=1.1), run_time=0.6)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        ba = Barre(10, 4, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, centre=P(-3.6, 0.8))
        bb = Barre(5, 2, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, centre=P(-3.6, -1.4))
        tir = ba.fin_coloriee(vers=-(ba.contour.get_bottom()[1] - bb.contour.get_bottom()[1]) - 0.2)
        fig = VGroup(ba, bb, tir)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Diviser en haut ET en bas", "par le même nombre."),
                                                         ("Continuer jusqu'à la", "fraction irréductible."),
                                                         ("En une étape : par le plus", "grand diviseur commun."),
                                                         ("Jamais de soustraction !",)], fs=36)
        self.montrer2(lignes[0], "Simplifier, c'est", "par le même")
        self.montrer2(lignes[1], "On continue", "la fraction irr")
        self.montrer2(lignes[2], "En une seule", "plus grand diviseur")
        self.montrer2(lignes[3], "Et on ne soustrait")
        lignes[3][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_caisses()
        self.ecran_encore()
        self.ecran_criteres()
        self.ecran_etapes()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracSimplifier4e(FracSimplifierBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
