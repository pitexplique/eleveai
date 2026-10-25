# frac_egale.py
# EleveAI — Maths 4e — série « Fractions », épisode 01 : FRACTIONS ÉGALES
# (micro du coach : fraction_egale, « Reconnaître des fractions égales »), AVEC
# VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 4e (même
# multiplicateur en haut et en bas, PRODUITS EN CROIX, nombre manquant, piège
# « ajouter », défi corrigé en simplifiant), repère de REGLES.md.
# Short jumeau : frac_egale_short.py (le mélange de peinture).
#
# Décor et métier : la VIDÉO ; Enzo, MONTEUR VIDÉO : les formats d'écran sont
# des fractions (largeur sur hauteur). 1920 × 1080 = 16/9 (× 120) ; 1280 × 720
# = 16/9 (produits en croix 11 520) ; 4/3 ≠ 16/9 (36 ≠ 48 : bandes noires) ;
# short vertical 9/16 = 1080/1920. Défi : 2560 × 1440 = 256/144 = 16/9.
# Ces définitions d'écran sont des formats standards (Full HD, HD, QHD, 4:3) ;
# aucun autre chiffre du monde réel. Centres : cinema-series, technologie-ia.
# Vérifié (Python) : 16 × 120 = 1920 ; 9 × 120 = 1080 ; 16 × 720 = 9 × 1280 =
# 11 520 ; 4 × 1080 = 3 × 1440 = 4 320 ; 6 × 12 = 8 × 9 = 72 ; 16 × 1440 =
# 9 × 2560 = 23 040 ; 3/5 = 24/40.
#
# Micro → écrans : multiplier haut et bas (02 = genEgaleQcm), produits en croix
# (03, question 1 = genEgalesOuiNon ★3), fractions différentes (05), nombre
# manquant (06, question 2 = genEgaleManquant), piège « ajouter » (08),
# question 3 (leurres du coach : +1, renversée), défi (10).
# Écrans : 00 garde · 01 Enzo · 02 la règle (× 120) · 03 produits en croix ·
# 04 QUESTION 1 · 05 4/3 contre 16/9 · 06 le nombre manquant · 07 QUESTION 2 ·
# 08 le piège · 09 QUESTION 3 · 10 défi · 10b correction · 11 ce que tu as
# appris · 12 fin.
#
# ⭐ Bases : 4e/frac_lotd_commun.py (PaysageLotD, audit) ; canvas_fractions.py
# (non modifié). Ajouté ici : monteur(), ecran_video(), en_croix().
# Voix : manim/voix/4e-frac-egale.json (débit −10) ; marques : 4e/frac_egale_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_egale.py FracEgale4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_egale.py FracEgale4e -o eleveai-maths-4e-frac-egale --media_dir manim/scripts/4e/media-frac-egale
# Sortie : manim/sorties/4e/maths/fractions/01-egale/eleveai-maths-4e-frac-egale.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotd_commun import *  # noqa: E402,F403

ROSE_X = "#f472b6"   # les produits en croix


def monteur(s=1.0):
    """Enzo : sweat violet, casque audio, une claquette de cinéma."""
    p = personne(peau=PEAUX[1], tenue="#7c3aed", cheveux="#111827")
    c, r = p.tete.get_center(), p.tete.width / 2
    casque = VGroup(Arc(radius=r * 1.12, start_angle=0.1, angle=PI - 0.2, arc_center=c, stroke_color="#111827",
                        stroke_width=8),
                    *[RoundedRectangle(width=r * 0.42, height=r * 0.75, corner_radius=r * 0.15, fill_color="#22d3ee",
                                       fill_opacity=1, stroke_width=0).move_to(c + RIGHT * x * r * 1.05) for x in (-1, 1)])
    clap = VGroup(Rectangle(width=0.7, height=0.45, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                            stroke_width=2),
                  Rectangle(width=0.7, height=0.12, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                  .shift(UP * 0.29)).move_to(P(0.55, -1.25))
    p.add(casque, clap)
    return p.scale(s)


def ecran_video(w, h, centre=ORIGIN, image=True):
    """Un écran (largeur w, hauteur h) avec un paysage : ciel, soleil, montagne."""
    fond = Rectangle(width=w, height=h, fill_color="#0ea5e9", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    g = VGroup(fond)
    if image:
        mont = Polygon(P(-w / 2, -h / 2), P(-w / 6, h / 8), P(w / 10, -h / 6), P(w / 3, h / 5), P(w / 2, -h / 4),
                       P(w / 2, -h / 2), fill_color="#15803d", fill_opacity=1, stroke_width=0)
        sol = Circle(radius=min(w, h) * 0.12, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(
            P(-w / 3.2, h / 4.5))
        g.add(sol, mont)
    return g.move_to(centre)


def en_croix(f, g, couleur=ROSE_X):
    """Les deux traits des produits en croix : num de f → den de g, den de f → num de g."""
    return VGroup(Line(f.num.get_center(), g.den.get_center(), color=couleur, stroke_width=5).scale(0.75),
                  Line(f.den.get_center(), g.num.get_center(), color=couleur, stroke_width=5).scale(0.75))


class FracEgaleBase(PaysageLotD):
    nom_voix = "4e-frac-egale"
    fichier_marques = "frac_egale_marques.json"

    def ligne_calc(self, morceaux, y, fs=40):
        """Une ligne de calcul dans la colonne, rendue sans synchro : la scène la
        pose morceau par morceau, AU NOMBRE (au_nb)."""
        lg = self.col(sans_synchro(self.ligne(morceaux, fs)), y)
        return lg

    def poser_calc(self, lg, mots, avec=None):
        """mots : un extrait par morceau (None = avec le précédent) ; le morceau
        attend le DERNIER nombre de son extrait. avec : {i: [animations]}."""
        for i, (m, x) in enumerate(zip(mots, lg)):
            if m:
                self.au_nb(m) if any(c.isdigit() for c in m) else self.au_mot(m)
            self.play(FadeIn(x, shift=RIGHT * 0.15), *(avec or {}).get(i, []), run_time=0.3)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Fractions égales", self.identite, self.ceinture, y_ech=-2.7)
        e1 = ecran_video(2.4, 1.35, centre=P(-2.6, 0.1))
        e2 = ecran_video(4.0, 2.25, centre=P(1.4, 0.1))
        self.au_mot("Fractions égales")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Comment savoir")
        self.play(FadeIn(e1, scale=0.8), FadeIn(e2, scale=0.8), run_time=0.6)
        q = self.t("=", 90, AMBRE).move_to(P(-0.85, 0.1))
        qm = self.t("?", 70, AMBRE).next_to(q, UP, buff=0.05)
        self.play(FadeIn(q, scale=0.5), FadeIn(qm, scale=0.5), run_time=0.4)
        self.insister(qm, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Enzo, monteur vidéo ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = monteur(1.05).move_to(P(-4.85, -0.4))
        self.au_mot("Voici Enzo")
        nom = self.t("Enzo", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.35)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("monteur")
        metier = self.t("monteur vidéo", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        film = ecran_video(3.2, 1.8, centre=P(-1.8, 0.6))
        self.au_mot("16 neuvièmes")
        f = EcritureFraction(16, 9, fs=64)
        l1 = VGroup(self.t("film :", 40), f).arrange(RIGHT, buff=0.3)
        self.col(l1, 2.2)
        self.play(FadeIn(film, scale=0.8), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("16 de large")
        w = self.t("16", 34, AMBRE).next_to(film, DOWN, buff=0.15)
        self.play(FadeIn(w, shift=UP * 0.1), run_time=0.3)
        self.au_mot("9 de haut")
        h = self.t("9", 34, AMBRE).next_to(film, LEFT, buff=0.15)
        self.play(FadeIn(h, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("1920 sur 1080")
        g = EcritureFraction(1920, 1080, fs=56)
        l2 = VGroup(self.t("caméra :", 40), g).arrange(RIGHT, buff=0.3)
        self.col(l2, 0.4)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("le même format")
        q = self.col(self.t("Même format ?", 44, ORANGE_RETENUE), -1.3)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.au_mot("couper l'image")
        ciseaux = DashedLine(film.get_corner(UR) + LEFT * 0.4 + UP * 0.2, film.get_corner(DR) + LEFT * 0.4 + DOWN * 0.2,
                             color=ROUGE_ERREUR, stroke_width=5)
        self.play(Create(ciseaux), run_time=0.5)
        self.attendre_voix()

    # ── 02 : la règle (× 120) ───────────────────────────────────────────────
    def ecran_regle(self):
        self.ecran("02-regle")
        f, g = EcritureFraction(16, 9, fs=60), EcritureFraction(1920, 1080, fs=60)
        eg = egalite(f, g, buff=1.3).move_to(P(-3.0, 1.55))
        h, b = fleches(f, g, "× 120", fs=34, angle=TAU / 8)
        petit = ecran_video(1.6, 0.9, centre=P(-4.6, -1.7))
        grand = ecran_video(3.2, 1.8, centre=P(-2.0, -1.7))
        self.au_mot("Deux fractions")
        regle = self.bloc(["Même nombre,", "en haut ET en bas :", "× ou ÷"], 38)
        regle[2].set_color(AMBRE)
        self.poser(regle, 2.0)
        self.au_mot("16 fois 120")
        self.play(FadeIn(f, scale=1.2), FadeIn(petit, scale=0.8), run_time=0.4)
        l1 = self.ligne_calc([("16 ×", WHITE), ("120 =", WHITE), ("1920", VERT_OK)], -0.1)
        self.poser_calc(l1, ["16 fois", "16 fois 120", "égale 1920"], {1: [Create(h[0]), FadeIn(h[1])]})
        l2 = self.ligne_calc([("9 ×", WHITE), ("120 =", WHITE), ("1080", VERT_OK)], -0.85)
        self.poser_calc(l2, ["9 fois", "9 fois 120", "égale 1080"], {1: [Create(b[0]), FadeIn(b[1])]})
        self.au_mot("Donc 16")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.2), TransformFromCopy(petit, grand), run_time=0.8)
        self.au_mot("le même format")
        mf = self.col(self.t("même format !", 44, VERT_OK), -2.1)
        self.play(FadeIn(mf, scale=1.3), Create(self.encadrer(eg, buff=0.15)), run_time=0.5)
        self.attendre_voix()

    # ── 03 : les produits en croix ──────────────────────────────────────────
    def ecran_croix(self):
        self.ecran("03-croix")
        f, g = EcritureFraction(16, 9, fs=72), EcritureFraction(1280, 720, fs=72)
        eg = egalite(f, g, signe="et", buff=0.9).move_to(P(-3.1, 0.6))
        eg[1].set_color(WHITE)
        x = en_croix(f, g)
        self.au_mot("produits en croix")
        tit = self.titre("Les produits en croix", fs=44)
        self.au_mot("16 neuvièmes")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_mot("1280 sur 720")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.2), run_time=0.4)
        l1 = self.ligne_calc([("16 × 720 =", WHITE), ("11 520", ROSE_X)], 1.6)
        self.au_nb("16 fois 720")
        self.play(Create(x[0]), FadeOut(eg[1]), FadeIn(l1[0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_nb("égale 11 520", cible="11")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.3)
        l2 = self.ligne_calc([("9 × 1280 =", WHITE), ("11 520", ROSE_X)], 0.7)
        self.au_nb("9 fois 1280")
        self.play(Create(x[1]), FadeIn(l2[0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_nb("égale 11 520", n=2, cible="11")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.3)
        self.au_mot("Les deux produits")
        eg2 = self.col(self.t("égaux !", 44, VERT_OK), -0.3)
        self.play(FadeIn(eg2, scale=1.3), Indicate(VGroup(l1[1], l2[1]), color=VERT_OK), run_time=0.6)
        self.au_mot("les fractions sont égales")
        r = self.ligne([("16/9", WHITE), ("=", VERT_OK), ("1280/720", WHITE)], 46)
        sans_synchro(r)
        self.col(r, -1.4)
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.4)
        self.play(Create(self.encadrer(r)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (4/3 et 1440/1080) ──────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f, g = EcritureFraction(4, 3, fs=68), EcritureFraction(1440, 1080, fs=68)
        eg = egalite(f, g, signe="et", buff=0.8).move_to(P(-3.2, 0.9))
        x = en_croix(f, g)
        p1 = self.t("4 × 1080 = 4 320", 36, ROSE_X).move_to(P(-3.4, -1.0))
        p2 = self.t("3 × 1440 = 4 320", 36, ROSE_X).move_to(P(-3.4, -1.7))
        for m in (p1, p2):
            m.sans_synchro = True

        def avant(sc):
            sc.q_tete(FadeIn(eg, scale=1.1))

        def apres(sc):
            sc.rep(0, "4 fois 1080", Create(x[0]), FadeOut(eg[1]), FadeIn(p1))
            sc.rep(1, "3 fois 1440", Create(x[1]), FadeIn(p2))
            sc.rep(2, "Les produits", Indicate(VGroup(p1, p2), color=VERT_OK))
            sc.fin_rep()

        self.question_pause("04-question", "04b-reponse", ["4/3 et 1440/1080", "sont-elles égales ?"],
                            [self.inline("oui"), self.inline("non"), self.inline("on ne peut pas savoir")], 0,
                            ["4 × 1080 = 4 320", "3 × 1440 = 4 320", "produits égaux : oui !"],
                            mot_q="4 tiers", avant_q=avant, autres_r=apres)

    # ── 05 : 4/3 contre 16/9 (les bandes noires) ────────────────────────────
    def ecran_differents(self):
        self.ecran("05-differents")
        tele = ecran_video(4.8, 2.7, centre=P(-3.4, 1.1), image=False).set_fill("#000000")
        tele[0].set_stroke(WHITE, 4)
        img = ecran_video(3.6, 2.7, centre=P(-3.4, 1.1))
        f, g = EcritureFraction(4, 3, fs=70), EcritureFraction(16, 9, fs=70)
        eg = egalite(f, g, signe="et", buff=0.8).move_to(P(-3.4, -1.9))
        x = en_croix(f, g)
        self.au_mot("le vieux format")
        self.play(FadeIn(img, scale=0.9), run_time=0.4)
        self.au_nb("4 tiers")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_nb("contre 16")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.2), run_time=0.4)
        l1 = self.ligne_calc([("4 × 9 =", WHITE), ("36", ROSE_X)], 1.9)
        self.au_nb("4 fois 9")
        self.play(Create(x[0]), FadeOut(eg[1]), FadeIn(l1[0]), run_time=0.4)
        self.au_nb("égale 36")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.3)
        l2 = self.ligne_calc([("3 × 16 =", WHITE), ("48", ROSE_X)], 1.0)
        self.au_nb("3 fois 16")
        self.play(Create(x[1]), FadeIn(l2[0]), run_time=0.4)
        self.au_nb("égale 48")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.3)
        self.au_mot("ne sont pas égaux")
        ne = self.col(self.ligne([("36 ≠ 48 :", ROUGE_ERREUR), ("différents !", ROUGE_ERREUR)], 42), -0.1)
        self.play(FadeIn(ne, scale=1.2), run_time=0.4)
        self.au_mot("À la même hauteur")
        self.play(FadeIn(tele), img.animate.set_z_index(1), run_time=0.5)
        self.add(img)
        self.au_mot("bandes noires")
        bn = self.col(self.t("bandes noires", 38, AMBRE), -1.2)
        fl = VGroup(Arrow(bn.get_left(), tele.get_right() + LEFT * 0.3, color=AMBRE, buff=0.1))
        self.play(FadeIn(bn, shift=LEFT * 0.2), GrowArrow(fl[0]), Indicate(tele, color=AMBRE, scale_factor=1.03),
                  run_time=0.6)
        self.attendre_voix()

    # ── 06 : le nombre manquant (9/16 = …/1920) ─────────────────────────────
    def ecran_manquant(self):
        self.ecran("06-manquant")
        tel = RoundedRectangle(width=1.35, height=2.4, corner_radius=0.18, fill_color="#0b1220", fill_opacity=1,
                               stroke_color=WHITE, stroke_width=4).move_to(P(-5.6, 0.2))
        img = ecran_video(1.17, 2.08, centre=tel.get_center())
        f, g = EcritureFraction(9, 16, fs=56), EcritureFraction("…", 1920, fs=56)
        eg = egalite(f, g, buff=0.9).move_to(P(-2.0, 0.2))
        h, b = fleches(f, g, "× 120", fs=34, angle=TAU / 7)
        rep = g.chiffre(1080)
        self.au_mot("short vertical")
        self.play(FadeIn(tel, scale=0.8), FadeIn(img, scale=0.8), run_time=0.5)
        self.au_mot("9 seizièmes")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_mot("1920 de haut")
        hh = self.t("1920", 30, AMBRE).next_to(tel, DOWN, buff=0.15)
        self.play(FadeIn(hh), run_time=0.3)
        self.au_mot("quelle largeur")
        lq = self.t("?", 36, ORANGE_TROU).next_to(tel, UP, buff=0.12)
        self.play(FadeIn(lq, scale=1.4), run_time=0.3)
        self.au_mot("combien sur 1920")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.2), run_time=0.4)
        l1 = self.ligne_calc([("1920 ÷", WHITE), ("16 =", WHITE), ("120", AMBRE)], 1.9)
        self.poser_calc(l1, ["1920 divisé", "1920 divisé par 16", "égale 120"], {2: [Create(b[0]), FadeIn(b[1])]})
        self.au_mot("le multiplicateur")
        m = self.col(self.t("le multiplicateur", 34, AMBRE), 1.15)
        self.play(FadeIn(m, shift=RIGHT * 0.15), Indicate(b[1], color=AMBRE, scale_factor=1.4), run_time=0.5)
        l2 = self.ligne_calc([("9 ×", WHITE), ("120 =", WHITE), ("1080", VERT_OK)], 0.2)
        self.poser_calc(l2, ["9 fois", "9 fois 120", "égale 1080"])
        self.play(Create(h[0]), FadeIn(h[1]), FadeOut(g.num), FadeIn(rep, scale=1.4),
                  Transform(lq, self.t("1080", 30, VERT_OK).next_to(tel, UP, buff=0.12)), run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (3/5 = …/40) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f, g = EcritureFraction(3, 5, fs=96), EcritureFraction("…", 40, fs=96)
        eg = egalite(f, g, buff=1.3).move_to(P(-3.3, 0.3))
        h, b = fleches(f, g, "× 8", fs=40)
        rep = g.chiffre(24)

        def avant(sc):
            sc.q_tete(FadeIn(eg, scale=1.1))

        def apres(sc):
            sc.rep(0, "5 fois 8", run_time=0.25)
            sc.au_nb("5 fois 8")
            sc.play(Create(b[0]), FadeIn(b[1]), run_time=0.4)
            sc.rep(1, "3 fois 8", run_time=0.25)
            sc.au_nb("Donc 3 fois 8")
            sc.play(Create(h[0]), FadeIn(h[1]), run_time=0.4)
            sc.au_nb("égale 24")
            sc.play(FadeOut(g.num), FadeIn(rep, scale=1.4), run_time=0.4)
            sc.rep(2, "Avec 38", Indicate(sc.cartes_q[1], color=ROUGE_ERREUR, scale_factor=1.03))
            sc.fin_rep()

        self.question_pause("07-question", "07b-reponse", ["3/5 = combien de", "quarantièmes ?"],
                            [self.inline("24"), self.inline("38"), self.inline("15")], 0,
                            ["5 × 8 = 40", "donc 3 × 8 = 24", "38 : on a ajouté 35, faux !"],
                            mot_q="3 cinquièmes", avant_q=avant, autres_r=apres)

    # ── 08 : le piège « ajouter » ───────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR).move_to(P(-0.6, 3.15))
        self.play(Write(tit), run_time=0.5)
        ba = Barre(2, 1, largeur=4.4, hauteur=0.6, centre=P(-2.9, 1.2))
        bb = Barre(3, 2, largeur=4.4, hauteur=0.6, couleur=ROUGE_COACH, centre=P(-2.9, -0.4))
        la = self.inline("1/2", 32, VERT_OK).next_to(ba, LEFT, buff=0.12)
        lb = self.inline("2/3", 32, ROUGE_ERREUR).next_to(bb, LEFT, buff=0.12)
        f, g = EcritureFraction(1, 2, fs=60), EcritureFraction(2, 3, fs=60, couleur=ROUGE_ERREUR)
        e = egalite(f, g, signe="→", buff=0.8)
        self.col(e, 1.5)
        h, b = fleches(f, g, "+ 1", couleur=ROUGE_ERREUR, fs=30, angle=TAU / 11)
        self.au_mot("1 demi")
        self.play(FadeIn(f, scale=1.2), FadeIn(ba), FadeIn(la), run_time=0.5)
        self.au_nb("plus 1")
        self.play(Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.5)
        self.au_mot("2 tiers")
        self.play(FadeIn(e[1]), FadeIn(g, scale=1.2), run_time=0.4)
        self.au_mot("Faux")
        self.play(Create(croix(g, sw=6).set_stroke(opacity=0.85)), run_time=0.4)
        l1 = self.ligne_calc([("1 × 3 =", WHITE), ("3", ROSE_X)], -0.05)
        self.poser_calc(l1, ["1 fois 3", "égale 3"])
        l2 = self.ligne_calc([("2 × 2 =", WHITE), ("4", ROSE_X)], -0.8)
        self.poser_calc(l2, ["2 fois 2", "égale 4"])
        self.au_mot("Pas égaux")
        pe = self.col(self.t("3 ≠ 4 : pas égales !", 38, ROUGE_ERREUR), -1.6)
        self.play(FadeIn(pe, scale=1.2), run_time=0.4)
        self.au_mot("Sur les barres")
        tir = ba.fin_coloriee(vers=-1.9)
        self.play(FadeIn(bb), FadeIn(lb), run_time=0.4)
        self.play(Create(tir), Indicate(bb.parts[1], color=ROUGE_ERREUR), run_time=0.7)
        dep = self.t("2/3 dépasse la moitié !", 32, ROUGE_ERREUR).next_to(bb, DOWN, buff=0.35)
        dep.sans_synchro = True
        self.au_mot("dépasse")
        self.play(FadeIn(dep, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 09 : QUESTION 3 (laquelle est égale à 6/8 ?) ────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        ba = Barre(8, 6, largeur=5.0, hauteur=0.6, centre=P(-3.4, 1.0))
        bb = Barre(12, 9, largeur=5.0, hauteur=0.6, couleur=VERT_PART, centre=P(-3.4, -0.6))
        tir = ba.fin_coloriee(vers=-1.9)

        def avant(sc):
            sc.q_tete(ba.apparaitre(0.6))

        def apres(sc):
            sc.rep(0, "6 fois 12", FadeIn(bb))
            sc.rep(1, "8 fois 9", Create(tir))
            sc.rep(2, "7 neuvièmes", Indicate(sc.cartes_q[1], color=ROUGE_ERREUR, scale_factor=1.03))
            sc.rep(3, "8 sixièmes", Indicate(sc.cartes_q[2], color=ROUGE_ERREUR, scale_factor=1.03))
            sc.fin_rep()

        self.question_pause("09-question", "09b-reponse", ["Laquelle est égale", "à 6/8 ?"],
                            [self.inline("9/12"), self.inline("7/9"), self.inline("8/6")], 0,
                            ["6 × 12 = 72", "8 × 9 = 72 : égales !", "7/9 : on a ajouté 1.", "8/6 : renversée."],
                            mot_q="Laquelle", avant_q=avant, autres_r=apres)

    # ── 10 : défi (2560 × 1440) ─────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.titre("À toi de jouer !", fs=50)
        e = ecran_video(4.4, 2.475, centre=P(-3.4, 0.3))
        self.au_mot("2560 sur 1440")
        f = EcritureFraction(2560, 1440, fs=60)
        l1 = VGroup(self.t("vidéo :", 40), f).arrange(RIGHT, buff=0.3)
        self.col(l1, 1.6)
        w = self.t("2560", 30, AMBRE).next_to(e, DOWN, buff=0.15)
        hh = self.t("1440", 30, AMBRE).next_to(e, LEFT, buff=0.12).rotate(PI / 2)
        sans_synchro(VGroup(w, hh, l1))
        self.play(FadeIn(e, scale=0.9), FadeIn(l1[0]), FadeIn(f.num), FadeIn(f.trait), FadeIn(w), run_time=0.6)
        self.au_nb("2560 sur 1440")
        self.play(FadeIn(f.den), FadeIn(hh), run_time=0.4)
        self.au_mot("format 16")
        l2 = self.ligne([("format", WHITE), ("16/9", BLEU_CALCUL), ("?", ORANGE_RETENUE)], 44)
        sans_synchro(l2)
        self.col(l2, 0.1)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.pause_defi(y=-1.2)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.titre("Correction", fs=50)
        fs = 52
        fa, fb, fc = EcritureFraction(2560, 1440, fs=fs), EcritureFraction(256, 144, fs=fs), EcritureFraction(16, 9, fs=fs)
        VGroup(fa, fb, fc).arrange(RIGHT, buff=1.35).move_to(P(-2.3, 0.9))
        for x in (fb, fc):
            x.shift(UP * (fa.trait.get_y() - x.trait.get_y()))
        s1 = self.t("=", fs).move_to((fa.get_right() + fb.get_left()) / 2).set_y(fa.trait.get_y())
        s2 = self.t("=", fs).move_to((fb.get_right() + fc.get_left()) / 2).set_y(fa.trait.get_y())
        sans_synchro(VGroup(s1, s2))
        h1, b1 = fleches(fa, fb, "÷ 10", fs=32, angle=TAU / 7)
        h2, b2 = fleches(fb, fc, "÷ 16", fs=32, angle=TAU / 7)
        self.au_mot("On simplifie")
        self.play(FadeIn(fa, scale=1.2), run_time=0.4)
        self.au_nb("Par 10")
        self.play(Create(h1[0]), FadeIn(h1[1]), Create(b1[0]), FadeIn(b1[1]), run_time=0.5)
        self.au_mot("256 sur 144")
        self.play(FadeIn(s1), FadeIn(fb, scale=1.2), run_time=0.4)
        self.au_nb("par 16")
        self.play(Create(h2[0]), FadeIn(h2[1]), Create(b2[0]), FadeIn(b2[1]), run_time=0.5)
        self.au_mot("16 neuvièmes")
        self.play(FadeIn(s2), FadeIn(fc, scale=1.2), run_time=0.4)
        self.au_mot("Oui")
        oui = self.t("Oui, même format !", 42, VERT_OK).move_to(P(-2.6, -1.0))
        self.play(FadeIn(oui, scale=1.2), Create(self.encadrer(fc)), run_time=0.5)
        l1 = sans_synchro(self.ligne([("16 × 1440 = 9 × 2560 =", WHITE), ("23 040", ROSE_X)], 36))
        l1.move_to(P(-1.4, -2.3))
        self.au_mot("Vérifie")
        self.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.4)
        self.au_nb("égalent 23 040", cible="23")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.3)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        ba = Barre(4, 3, largeur=4.2, hauteur=0.55, etiquette="frac", fs=32, centre=P(-3.6, 0.9))
        bb = Barre(12, 9, largeur=4.2, hauteur=0.55, etiquette="frac", fs=32, centre=P(-3.6, -1.3))
        tir = ba.fin_coloriee(vers=-(ba.contour.get_bottom()[1] - bb.contour.get_bottom()[1]) - 0.2)
        fig = VGroup(ba, bb, tir)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("× ou ÷ en haut ET en bas", "par le même nombre."),
                                                         ("Vérifier : les produits", "en croix sont égaux."),
                                                         ("Nombre manquant :", "chercher le multiplicateur."),
                                                         ("Jamais + ou − !",)], fs=34)
        self.montrer2(lignes[0], "Deux fractions", "par le même")
        self.montrer2(lignes[1], "Pour vérifier", "sont égaux")
        self.montrer2(lignes[2], "Pour un nombre", "on cherche")
        self.montrer2(lignes[3], "Et ajouter")
        lignes[3][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_regle()
        self.ecran_croix()
        self.ecran_question1()
        self.ecran_differents()
        self.ecran_manquant()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracEgale4e(FracEgaleBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
