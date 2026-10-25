# frac_pourcentage_fraction.py
# EleveAI — Maths 6e — série « Fractions », épisode 12 : POURCENTAGE ET
# FRACTION (micro du coach : pourcentage_fraction, « Relier pourcentage et
# fraction », notion pourcentage_nombre), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE : la paysage complète du niveau (méthode, repères, piège, défi corrigé).
# Short jumeau : frac_pourcentage_fraction_short.py (blanche).
# ⭐ La chaîne de ses erreurs : simplifier (40/100 → 4/10 → 2/5), fraction →
# décimal (1/4 = 0,25), et le leurre 1/4 = 4 % (écran 08).
#
# Décor et métier : JEUX VIDÉO ; Yasmine, DÉVELOPPEUSE DE JEUX VIDÉO : la barre
# de chargement de son jeu compte 100 cases ; 1 quart chargé → 25 %. Défi : 7
# niveaux finis sur 20 → 35 %. Aucune donnée du monde réel citée.
# Centres d'intérêt : jeux-video.
#
# Micro → écrans (banque pourcentages.bank.ts) : p % = p/100 (02, 09 question
# 2, leurre 30/10), fraction → pourcentage par la fraction égale sur 100 (03,
# 04, 06 question 1, 10 défi), parts simples 1/2, 1/4, 3/4, 1/10, 1/5 (05),
# pourcentage → fraction simplifiée (07), leurre « a/b = a % » (08), chaîne
# fraction → décimal → pourcentage (11).
# Écrans : 00 garde · 01 Yasmine et la barre · 02 pour cent = sur 100 · 03 le
# quart de 100 cases · 04 la méthode × 25 · 05 les repères · 06 QUESTION 1
# (1/20) · 07 40 % = 2/5 · 08 le piège 1/4 ≠ 4 % · 09 QUESTION 2 (30 %) · 10
# défi · 10b correction · 11 la chaîne · 12 ce que tu as appris · 13 fin.
#
# Voix : manim/voix/6e-frac-pourcentage-fraction.json (débit −10), WAV dans
# public/sons/6e-frac-pourcentage-fraction/ ; marques mot à mot :
# manim/scripts/6e/frac_pourcentage_fraction_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py, comme le pilote).
# Outils : frac_commun.py (pilote) + frac_lotc_commun.py (lot C).
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_pourcentage_fraction.py FracPourcentageFraction6e -o eleveai-maths-6e-frac-pourcentage-fraction --media_dir manim/scripts/6e/media-frac-pourcentage-fraction
# Sortie : manim/sorties/6e/maths/fractions/12-pourcentage-fraction/eleveai-maths-6e-frac-pourcentage-fraction.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotc_commun import *  # noqa: E402,F403

ECRAN_JEU = "#0b1220"


def developpeuse(s=1.0):
    """Yasmine : cheveux longs, sweat violet, casque audio."""
    p = personne(peau="#a0662f", tenue="#7c3aed", cheveux="#111827", longs=True, s=s)
    p.add(casque_audio(p))
    return p


def ecran_jeu(largeur=6.4, hauteur=2.3):
    """L'écran du jeu : cadre sombre, « Chargement », la barre vide en 100
    cases (.barre : un Pourcentage « chargement » ; .cases : 99 traits fins)."""
    cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.2, fill_color=ECRAN_JEU,
                             fill_opacity=1, stroke_color="#94a3b8", stroke_width=4)
    mot = Text("Chargement…", font_size=34, color="#e2e8f0").move_to(cadre.get_top() + DOWN * 0.5)
    barre = Pourcentage(25, mode="chargement", largeur=largeur - 1.0, hauteur=0.6, etiquette=False,
                        centre=cadre.get_center() + DOWN * 0.3).vide()
    g, d = barre.piste.get_left()[0] + 0.08, barre.piste.get_right()[0] - 0.08
    cases = VGroup(*[Line(P(g + (d - g) * i / 100, -0.2), P(g + (d - g) * i / 100, 0.2), color="#475569",
                          stroke_width=1.5) for i in range(1, 100)]).move_to(barre.piste).set_x((g + d) / 2)
    grp = VGroup(cadre, mot, barre, cases)
    grp.cadre, grp.mot, grp.barre, grp.cases = cadre, mot, barre, cases
    return grp


class FracPourcentageFractionBase(PaysageLotC):
    nom_voix = "6e-frac-pourcentage-fraction"
    fichier_marques = "frac_pourcentage_fraction_marques.json"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self.cartes_q = cartes
        return tete, q, cartes, pause, rebours, ph

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Pourcentages et fractions", self.identite, self.ceinture)
        b = Barre(4, 1, largeur=4.6, hauteur=0.7, centre=P(-1.2, 0.2))
        self.au_mot("Pourcentages")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("1 quart")
        f = EcritureFraction(1, 4, fs=64).next_to(b, LEFT, buff=0.45)
        self.play(b.apparaitre(0.9), FadeIn(f, scale=1.3))
        self.au_mot("combien de pour cent")
        q = self.t("? %", 80, AMBRE).next_to(b, RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Yasmine et la barre de chargement ─────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = developpeuse(1.15).move_to(P(-5.3, -0.4))
        self.au_mot("Voici Yasmine")
        nom = self.t("Yasmine", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("développeuse")
        metier = self.bloc(["développeuse", "de jeux vidéo"], 30, BLEU_CALCUL)
        metier.next_to(pers, DOWN, buff=0.2)
        for m in metier:
            m.set_x(pers.get_x())
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        e = ecran_jeu().move_to(P(0.7, 1.3))
        self.au_mot("la barre de chargement")
        self.play(FadeIn(e.cadre, scale=0.9), FadeIn(e.mot), FadeIn(e.barre.piste), run_time=0.6)
        self.au_mot("100 petites cases")
        n100 = self.t("100 cases", 32, "#e2e8f0").next_to(e.barre.piste, DOWN, buff=0.15)
        self.play(LaggedStart(*[Create(c) for c in e.cases], lag_ratio=0.02), FadeIn(n100, shift=UP * 0.1),
                  run_time=1.0)
        self.add(e.barre.plein)
        self.au_mot("chargé 1 quart")
        l1 = self.t("Chargé :", 40).move_to(P(-0.4, -1.0))
        f = EcritureFraction(1, 4, fs=60).next_to(l1, RIGHT, buff=0.3)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.3)
        self.play(FadeIn(f, scale=1.3), run_time=0.35)
        self.au_mot("Que doit afficher")
        q = self.t("La barre affiche ? %", 40, ORANGE_RETENUE).move_to(P(0.6, -2.4))
        self.play(FadeIn(q, shift=UP * 0.2), Indicate(e.barre.piste, color=AMBRE), run_time=0.6)
        self.attendre_voix()

    # ── 02 : pour cent = sur 100 ────────────────────────────────────────────
    def ecran_pourcent(self):
        self.ecran("02-pourcent")
        g = grille100(0, cote=0.5, centre=P(-3.4, -0.1))
        self.au_mot("que veut dire pour cent")
        tit = self.col(self.t("Pour cent ?", 46, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Voici 100 cases")
        self.play(g.apparaitre(1.0))
        self.au_mot("25 %, c'est")
        p = self.col(self.t("25 %", 72, BLEU_CALCUL), 1.8)
        self.play(FadeIn(p, scale=1.3), run_time=0.4)
        self.au_mot("25 cases")
        self.play(g.colorier(range(25), lag=0.05), run_time=1.2)
        self.au_mot("On l'écrit")
        eg = self.t("=", 64).next_to(p, RIGHT, buff=0.35)
        f = EcritureFraction(25, 100, fs=64).next_to(eg, RIGHT, buff=0.35)
        f.shift(UP * (eg.get_y() - f.trait.get_y()))
        self.play(FadeIn(eg), FadeIn(f.num, scale=1.3), run_time=0.35)
        self.frac(VGroup(f.trait, f.den), "sur 100 :")
        self.au_mot("une fraction")
        fr_ = self.col(self.t("une fraction", 36, BLEU_CALCUL), 0.25)
        fr_.align_to(f, RIGHT)
        self.play(FadeIn(fr_, shift=UP * 0.15), run_time=0.35)
        self.au_mot("Pour cent veut dire")
        r = self.ligne([("pour cent", AMBRE), ("=", WHITE), ("sur 100", AMBRE)], 44)
        self.col(r, -1.2)
        self.play(FadeIn(r[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("dire : sur 100")
        self.play(FadeIn(r[1:], shift=RIGHT * 0.2), run_time=0.3)
        self.play(Create(self.encadrer(r, AMBRE)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : le quart des 100 cases ─────────────────────────────────────────
    def ecran_quart(self):
        self.ecran("03-quart")
        g = grille100(0, cote=0.5, centre=P(-3.4, -0.1))
        self.add(g)
        f = EcritureFraction(1, 4, fs=72)
        self.au_mot("Et 1 quart")
        self.col(f, 2.2)
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("en 4 parts égales")
        c = g.liste[0].get_width()
        x0, y0 = g.cases[0][5].get_left()[0], g.cases[5][0].get_top()[1]
        coupe = VGroup(Line(P(x0, g.liste.get_top()[1] + 0.12), P(x0, g.liste.get_bottom()[1] - 0.12)),
                       Line(P(g.liste.get_left()[0] - 0.12, y0), P(g.liste.get_right()[0] + 0.12, y0))
                       ).set_stroke(ORANGE_RETENUE, 9)
        self.play(Create(coupe), run_time=0.9)
        self.au_mot("Chaque part a 25 cases")
        l1 = self.col(self.ligne([("chaque part", WHITE), ("=", WHITE), ("25 cases", BLEU_CALCUL)], 42), 0.6)
        self.poser_lignes(l1, "fade", 0.3)
        self.au_mot("c'est donc 25 cases")
        self.play(g.colorier(quadrant(0), lag=0.04), run_time=1.0)
        eg = self.t("=", 64).next_to(f, RIGHT, buff=0.35)
        g2 = EcritureFraction(25, 100, fs=72).next_to(eg, RIGHT, buff=0.35)
        g2.shift(UP * (f.trait.get_y() - g2.trait.get_y()))
        eg.set_y(f.trait.get_y())
        self.frac(VGroup(eg, g2), "sur 100")
        self.au_mot("25 %")
        res = self.col(self.t("= 25 %", 66, VERT_OK), -0.9)
        self.play(FadeIn(res, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(res)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : la méthode (× 25 en haut ET en bas) ───────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        f = EcritureFraction(1, 4, fs=96)
        g = EcritureFraction("…", 100, fs=96)
        eg = egalite(f, g, buff=1.1).move_to(P(-3.3, 1.35))
        haut, bas = fleches(f, g, "× 25", fs=42, angle=TAU / 7)
        self.au_mot("Avec les nombres")
        tit = self.col(self.t("Avec les nombres", 44, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.frac(f, "1 quart")
        self.au_mot("combien de centièmes")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g.num, 1.4, 0.2)
        self.au_mot("4 fois 25")
        self.calc([("4 × 25 =", WHITE), ("100", VERT_OK)], 1.6, 46, avec=[Create(bas[0]), FadeIn(bas[1])])
        self.au_mot("Alors 1 fois 25")
        self.calc([("1 × 25 =", WHITE), ("25", VERT_OK)], 0.6, 46, avec=[Create(haut[0]), FadeIn(haut[1])])
        vingt5 = g.chiffre(25)
        self.play(FadeOut(g.num), FadeIn(vingt5, scale=1.5), run_time=0.4)
        self.au_mot("25 %", 1)
        res = self.col(self.t("= 25 %", 60, VERT_OK), -0.5)
        self.play(FadeIn(res, scale=1.3), run_time=0.4)
        e = ecran_jeu(5.6, 1.7).move_to(P(-3.0, -2.55))
        e.mot.become(Text("Chargement…", font_size=28, color="#e2e8f0").move_to(e.mot))
        self.au_mot("Yasmine affiche")
        self.add(e.cadre, e.mot, e.barre.piste, e.cases, e.barre.plein)
        e.barre.plein.set_opacity(1)
        self.play(e.barre.remplir(0.8))
        p = Text("25 %", font_size=44, color="#22c55e").next_to(e.cadre, RIGHT, buff=0.35)
        self.au_mot("25 %", 2)
        self.play(FadeIn(p, scale=1.3), run_time=0.3)
        self.attendre_voix()

    # ── 05 : les repères du quotidien ───────────────────────────────────────
    def ecran_reperes(self):
        self.ecran("05-reperes")
        tit = self.t("Les fractions du quotidien", 44, JAUNE_TITRE).move_to(P(-0.4, 3.05))
        self.au_mot("Retiens")
        self.play(Write(tit), run_time=0.6)
        lignes = [(2, 1, "50 %", "1 demi"), (4, 3, "75 %", "3 quarts"), (10, 1, "10 %", "1 dixième"),
                  (5, 1, "20 %", "1 cinquième")]
        for k, (n, a, pc, mot) in enumerate(lignes):
            y = 1.75 - k * 1.3
            b = Barre(n, a, largeur=4.6, hauteur=0.55, marge=0.18, centre=P(-1.6, y))
            f = EcritureFraction(a, n, fs=46).move_to(P(-5.3, y))
            t = self.t(pc, 50, VERT_OK).move_to(P(2.1, y))
            self.au_mot(mot)
            self.play(FadeIn(f, scale=1.3), b.apparaitre(0.7), run_time=0.7)
            self.au_mot(pc)
            self.play(FadeIn(t, shift=LEFT * 0.2), run_time=0.35)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (1/20 = ? %) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = Barre(20, 1, largeur=5.6, hauteur=0.8, sw=2, centre=P(-3.3, 0.6))
        f = EcritureFraction(1, 20, fs=60).next_to(b, DOWN, buff=0.5).shift(LEFT * 1.3)
        self.add(b)

        def apres(sc):
            b2, anim = b.repartager(5, run_time=1.0)
            sc.au_mot("20 fois 5")
            sc.rep(0, avec=[anim])
            g = EcritureFraction(5, 100, fs=60)
            eg = egalite(f, g).move_to(P(-3.3, -1.0))
            sc.au_mot("Donc 1 vingtième")
            sc.rep(1, avec=[FadeIn(f, scale=1.2)])
            sc.au_mot("5 centièmes")
            sc.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.3)
            sc.rep(2)
            sc.rep_fin()

        self.question_pause("06-question", "06b-reponse", ["1 vingtième, c'est", "combien de pour cent ?"],
                            [self.inline("20 %"), self.inline("5 %"), self.inline("1 %")], 1,
                            ["20 × 5 = 100.", "1 vingtième = 5 centièmes", "= 5 %."], mot_q="1 vingtième",
                            autres_r=apres)

    # ── 07 : dans l'autre sens : 40 % = 2/5 ─────────────────────────────────
    def ecran_inverse(self):
        self.ecran("07-inverse")
        g = grille100(0, cote=0.38, centre=P(-3.4, 1.15))
        fs = 62
        fa, fb, fc = EcritureFraction(40, 100, fs=fs), EcritureFraction(4, 10, fs=fs), EcritureFraction(2, 5, fs=fs)
        ch = VGroup(fa, fb, fc).arrange(RIGHT, buff=1.55)
        self.col(ch, 0.4, xl=1.05)
        s1 = self.t("=", fs).move_to((fa.get_right() + fb.get_left()) / 2).set_y(fa.trait.get_y())
        s2 = self.t("=", fs).move_to((fb.get_right() + fc.get_left()) / 2).set_y(fa.trait.get_y())
        h1, b1 = fleches(fa, fb, "÷ 10", fs=32)
        h2, b2 = fleches(fb, fc, "÷ 2", fs=32)
        br = Barre(10, 0, largeur=4.6, hauteur=0.6, marge=0.2, centre=P(-3.4, -2.35))
        self.au_mot("Le jeu affiche 40 %")
        p = self.col(self.t("40 %", 66, BLEU_CALCUL), 2.6)
        self.play(FadeIn(p, scale=1.3), g.apparaitre(0.6), run_time=0.6)
        self.play(g.colorier(range(40), lag=0.02), run_time=1.0)
        self.frac(fa, "40 sur 100")
        self.au_mot("On simplifie")
        self.play(Indicate(VGroup(fa.num, fa.den), color=AMBRE, scale_factor=1.25), run_time=0.5)
        self.au_mot("on divise par 10")
        self.play(Create(h1[0]), FadeIn(h1[1]), Create(b1[0]), FadeIn(b1[1]), run_time=0.6)
        self.au_mot("4 dixièmes")
        lg = g.entourer_lignes()
        self.play(FadeIn(s1), FadeIn(fb, scale=1.3), LaggedStart(*[Create(r) for r in lg], lag_ratio=0.08),
                  br.apparaitre(0.6), run_time=0.8)
        self.play(br.colorier(range(4)), run_time=0.6)
        self.au_mot("on divise par 2")
        self.play(Create(h2[0]), FadeIn(h2[1]), Create(b2[0]), FadeIn(b2[1]), run_time=0.4)
        b5, anim = br.regrouper(2, run_time=0.9)
        self.au_mot("2 cinquièmes")
        self.play(FadeIn(s2), FadeIn(fc, scale=1.3), anim)
        self.au_mot("40 %, c'est 2 cinquièmes")
        res = self.col(VGroup(self.t("40 % =", 50, VERT_OK), EcritureFraction(2, 5, fs=50, couleur=VERT_OK))
                       .arrange(RIGHT, buff=0.25), -2.35)
        self.play(FadeIn(res, shift=UP * 0.2), run_time=0.4)
        self.play(Create(self.encadrer(res)), Create(self.encadrer(fc)), run_time=0.4)
        self.attendre_voix()

    # ── 08 : le piège : 1/4 n'est pas 4 % ───────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR).move_to(P(0, 3.05))
        ga = grille100(0, cote=0.28, centre=P(-4.75, 0.55))
        gb = grille100(0, cote=0.28, centre=P(-1.05, 0.55))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.5)
        self.au_mot("1 quart, ce n'est pas")
        faux = self.inline("1/4 = 4 %", 52, ROUGE_ERREUR).move_to(P(4.2, 1.6))
        self.play(FadeIn(faux, scale=1.2), run_time=0.3)
        self.au_mot("pas 4 %")
        x = croix(faux, sw=6).set_stroke(opacity=0.9)
        self.play(Create(x), run_time=0.3)
        self.au_mot("4 %, c'est 4 cases")
        la = self.t("4 % = 4 cases", 34, ROUGE_ERREUR).next_to(ga, DOWN, buff=0.25)
        self.play(ga.apparaitre(0.4), FadeIn(la, shift=UP * 0.1), run_time=0.4)
        self.play(ga.colorier(range(4), couleur=ROUGE_COACH, lag=0.2), run_time=0.5)
        self.au_mot("tout petit")
        tp = self.t("tout petit !", 34, ROUGE_ERREUR).next_to(la, DOWN, buff=0.15)
        self.play(FadeIn(tp, scale=0.8), Indicate(VGroup(*ga.liste[:4]), color=ROUGE_ERREUR, scale_factor=1.4),
                  run_time=0.6)
        self.au_mot("1 quart, c'est 25 cases")
        lb = VGroup(EcritureFraction(1, 4, fs=36, couleur=VERT_OK), self.t("= 25 cases", 34, VERT_OK)) \
            .arrange(RIGHT, buff=0.2).next_to(gb, DOWN, buff=0.25)
        self.play(gb.apparaitre(0.5), FadeIn(lb[0], scale=1.3), run_time=0.5)
        self.play(gb.colorier(quadrant(0), lag=0.03), FadeIn(lb[1], shift=UP * 0.1), run_time=0.8)
        r = self.bloc(["Le pourcentage :", "toujours sur 100 !"], 38, VERT_OK).move_to(P(4.15, -0.3))
        self.au_mot("Le pourcentage compte")
        self.play(FadeIn(r[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("toujours sur 100")
        self.play(FadeIn(r[1], shift=UP * 0.15), run_time=0.3)
        self.insister(r, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : QUESTION 2 (30 % = quelle fraction ?) ──────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = grille100(0, cote=0.46, centre=P(-3.4, 0.1))
        self.add(g)

        def apres(sc):
            sc.au_mot("30 % veut dire")
            sc.rep(0, avec=[g.colorier(range(30), lag=0.03, run_time=0.9)])
            sc.au_mot("Et 30 sur 10")
            sc.rep(1)
            sc.au_mot("3 entiers")
            sc.rep(2)
            sc.rep_fin()

        self.question_pause("09-question", "09b-reponse", ["30 %, c'est", "quelle fraction ?"],
                            [self.inline("30/10"), self.inline("3/100"), self.inline("30/100")], 2,
                            ["30 % = 30 sur 100.", "30 sur 10, ce serait", "3 entiers !"], mot_q="30 %",
                            autres_r=apres)

    # ── 10 : défi (7 niveaux sur 20) ────────────────────────────────────────
    def niveaux(self, k=0, cote=0.82, centre=P(-3.4, 0.2)):
        """La carte des 20 niveaux du jeu (4 × 5), les niveaux finis en vert."""
        return Grille(4, 5, k, cote=cote, couleur=VERT_PART, centre=centre)

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        n = self.niveaux()
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("20 niveaux")
        l1 = self.col(self.ligne([("20", BLEU_CALCUL), ("niveaux", WHITE)], 40), 1.9)
        self.play(n.apparaitre(1.0), FadeIn(l1, shift=RIGHT * 0.2))
        self.au_mot("Tu en as fini 7")
        l2 = self.col(self.ligne([("7", VERT_OK), ("finis", WHITE)], 40), 1.1)
        self.play(n.colorier(range(7), lag=0.15), FadeIn(l2, shift=RIGHT * 0.2), run_time=1.0)
        l3 = self.col(self.bloc(["Quel pourcentage", "du jeu as-tu fini ?"], 38, ORANGE_RETENUE), -0.1)
        self.au_mot("Quel pourcentage")
        self.play(FadeIn(l3[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("du jeu as-tu")
        self.play(FadeIn(l3[1], shift=UP * 0.15), run_time=0.3)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        n = self.niveaux(7, cote=0.5, centre=P(-3.4, 2.15))
        self.add(n)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        f, g = EcritureFraction(7, 20, fs=80), EcritureFraction("…", 100, fs=80)
        eg = egalite(f, g, buff=1.0).move_to(P(-3.4, -1.45))
        haut, bas = fleches(f, g, "× 5", fs=38, angle=TAU / 9)
        self.frac(f, "7 vingtièmes")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.2), run_time=0.35)
        self.au_mot("20 fois 5")
        self.calc([("20 × 5 =", WHITE), ("100", VERT_OK)], 1.7, 46, avec=[Create(bas[0]), FadeIn(bas[1])])
        self.au_mot("Alors 7 fois 5")
        self.calc([("7 × 5 =", WHITE), ("35", VERT_OK)], 0.7, 46, avec=[Create(haut[0]), FadeIn(haut[1])])
        t35 = g.chiffre(35)
        self.play(FadeOut(g.num), FadeIn(t35, scale=1.5), run_time=0.4)
        self.au_mot("35 % du jeu")
        res = self.col(self.t("35 % du jeu", 54, VERT_OK), -0.7)
        self.play(FadeIn(res, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(res)), run_time=0.4)
        self.attendre_voix()

    # ── 11 : la chaîne 1/4 = 0,25 = 25 % ────────────────────────────────────
    def ecran_chaine(self):
        self.ecran("11-chaine")
        f = EcritureFraction(1, 4, fs=96).move_to(P(-4.9, 1.2))
        dv = Division(1, 4, fs=64).move_to(P(0.3, 1.2))
        pc = Pourcentage(25, mode="chargement", largeur=6.2, hauteur=0.65, fs=52, etiquette=True,
                         centre=P(-1.0, -1.35)).vide()
        pc.etiquette.set_opacity(0)
        t1 = self.t("fraction", 34, BLEU_CALCUL).next_to(f, UP, buff=0.35)
        t2 = self.t("nombre décimal", 34, BLEU_CALCUL).next_to(dv, UP, buff=0.55)
        t3 = self.t("pourcentage", 34, BLEU_CALCUL).next_to(pc.piste, UP, buff=0.35)
        self.frac(f, "1 quart")
        self.au_mot("1 divisé par 4")
        self.play(FadeIn(dv.etapes[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale 0,25")
        self.play(FadeIn(dv.etapes[1], scale=1.3), run_time=0.4)
        self.insister(dv.res, 1.3, 0.25)
        self.au_mot("Et 0,25")
        self.play(FadeIn(pc.piste), FadeIn(pc.plein), run_time=0.3)
        self.play(pc.remplir(1.4))
        self.au_mot("25 %")
        self.play(pc.etiquette.animate.set_opacity(1), run_time=0.3)
        self.insister(pc.etiquette, 1.3, 0.25)
        self.au_mot("Fraction")
        self.play(FadeIn(t1, shift=DOWN * 0.15), Indicate(f, color=BLEU_CALCUL), run_time=0.5)
        self.au_mot("nombre décimal", 2)
        self.play(FadeIn(t2, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("pourcentage :")
        self.play(FadeIn(t3, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("trois écritures")
        s = self.t("trois écritures du même nombre", 34, AMBRE).move_to(P(-0.4, -2.65))
        self.play(FadeIn(s, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 12 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("12-finale", 0.65)
        g = grille100(colories=quadrant(0), cote=0.4)
        lab = VGroup(EcritureFraction(1, 4, fs=40), self.t("= 25 %", 40, VERT_OK)).arrange(RIGHT, buff=0.2)
        lab[1].sans_synchro = True
        lab.next_to(g, DOWN, buff=0.3)
        fig = VGroup(g, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Pour cent veut dire", "sur 100."),
                                                         ("Fraction → pourcentage :", "la fraction égale sur 100."),
                                                         ("1 demi = 50 %, 1 quart = 25 %,", "3 quarts = 75 %."),
                                                         ("1 quart, jamais 4 % !",)], fs=36)
        self.au_mot("Pour cent veut dire")
        self.montrer_ligne(lignes[0])
        self.au_mot("Pour écrire")
        self.montrer_ligne(lignes[1])
        self.au_mot("1 demi")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et 1 quart")
        self.montrer_ligne(lignes[3], Indicate(lab, color=AMBRE))
        lignes[3][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_pourcent()
        self.ecran_quart()
        self.ecran_methode()
        self.ecran_reperes()
        self.ecran_question1()
        self.ecran_inverse()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_chaine()
        self.ecran_finale()
        self.page_abonnement("13-abonne")


class FracPourcentageFraction6e(FracPourcentageFractionBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
