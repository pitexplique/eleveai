# frac_inverse.py
# EleveAI — Maths 4e — série « Fractions », épisode 08 : L'INVERSE D'UNE
# FRACTION (micro du coach : fraction_inverse, notion fraction_calcul), AVEC
# VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 4e
# (définition par le produit = 1, « on retourne », entiers et fractions
# unitaires, le piège inverse ≠ opposé, le signe gardé, 0 sans inverse, défi
# 80 % → 4/5 → 5/4 = 1,25 = 125 %).
# Short jumeau : frac_inverse_short.py (le magicien et la carte retournée, blanche).
#
# Décor et métier : la PHOTO ; Clara, PHOTOGRAPHE : une photo de 6 cm agrandie
# × 5/3 fait 10 cm ; pour revenir : × 3/5 (5/3 × 3/5 = 15/15 = 1) ; défi : une
# photo réduite à 80 % = 80/100 = 4/5 → zoom 5/4 = 1,25 = 125 % (SA première
# erreur : simplifier 80/100 ; puis la chaîne fraction → décimal → pourcentage).
# Chiffres inventés (aucune donnée du monde réel citée). Centres : art-design,
# reseaux-sociaux.
# Vérifié (Python, fractions.Fraction) : 6 × 5/3 = 10 ; 10 × 3/5 = 6 ;
# 5/3 × 3/5 = 1 ; 4/7 × 7/4 = 28/28 = 1 ; 5 × 1/5 = 1 ; 1/8 × 8 = 1 ;
# −2/3 × (−3/2) = 1 ; −3/4 × (−4/3) = 1 ; 80/100 = 4/5 ; 5/4 = 1,25.
#
# Micro → écrans (banque 4e/maths/fractions.bank.ts) : enoncesInverse
# « par quel nombre multiplier … pour obtenir 1 » (00-03), genre « frac »
# (question 1 : 4/7, leurres l'opposé et la même), « entier » et « unitaire »
# (05), « -frac » (06, question 2 : −3/4, leurres 3/4 et 4/3), « decimal »
# (10 : 0,8 → 1,25), explInverse « le signe ne change pas » (06, 07).
# Écrans : 00 garde · 01 Clara agrandit · 02 revenir (× 3/5) · 03 définition
# · 04 QUESTION 1 · 05 entiers · 06 le piège (opposé) · 07 QUESTION 2 · 08 zéro
# · 09 défi · 10 correction · 11 ce que tu as appris · 12 fin.
#
# ⭐ Bases : 4e/frac_lote_commun.py (PaysageE) ; canvas_fractions.py (non modifié).
# Voix : manim/voix/4e-frac-inverse.json (débit −10), WAV dans
# public/sons/4e-frac-inverse/ ; marques : 4e/frac_inverse_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_inverse.py FracInverse4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_inverse.py FracInverse4e -o eleveai-maths-4e-frac-inverse --media_dir manim/scripts/4e/media-frac-inverse
# Sortie : manim/sorties/4e/maths/fractions/08-inverse/eleveai-maths-4e-frac-inverse.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lote_commun import *  # noqa: E402,F403

XF = -3.2     # le centre de la figure (zone de gauche)
K = 0.3       # 1 cm de la photo = 0,3 unité


def photographe(s=1.0):
    """Clara : un appareil photo devant elle."""
    p = personne(peau="#e0ac69", tenue="#be185d", cheveux="#78350f", longs=True, s=s)
    c = p.corps.get_center() + UP * 0.35
    boitier = RoundedRectangle(width=0.7, height=0.45, corner_radius=0.06, fill_color="#111827", fill_opacity=1,
                               stroke_color="#9ca3af", stroke_width=2).move_to(c)
    objectif = Circle(radius=0.15, fill_color="#374151", fill_opacity=1, stroke_color="#e5e7eb",
                      stroke_width=3).move_to(c)
    p.add(boitier, objectif)
    return p


def photo(largeur_cm, centre=ORIGIN):
    """Une photo (paysage : ciel, soleil, montagne) de largeur_cm (ratio 3:2)."""
    w = largeur_cm * K
    h = w * 2 / 3
    ciel = Rectangle(width=w, height=h, fill_color="#7dd3fc", fill_opacity=1, stroke_color=WHITE, stroke_width=4)
    mont = Polygon(P(-w / 2, -h / 2), P(-w / 8, h / 6), P(w / 8, -h / 12), P(w / 3, h / 4), P(w / 2, -h / 6),
                   P(w / 2, -h / 2), fill_color="#15803d", fill_opacity=1, stroke_width=0)
    soleil = Circle(radius=h / 8, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(P(-w / 4, h / 4))
    return VGroup(ciel, soleil, mont).move_to(centre)


def cote(ph, txt, fs=32, couleur=WHITE):
    """La largeur sous la photo : une flèche double et le texte (« 6 cm »)."""
    a, b = ph.get_corner(DL) + DOWN * 0.2, ph.get_corner(DR) + DOWN * 0.2
    fl = DoubleArrow(a, b, buff=0, color=couleur, stroke_width=4, tip_length=0.18)
    t = Text(txt, font_size=fs, color=couleur).next_to(fl, DOWN, buff=0.1)
    return VGroup(fl, t)


def retourner(f, couleur=None, run_time=0.9):
    """Le geste de l'inverse : le numérateur descend, le dénominateur monte (en
    tournant). Renvoie (nouvelle EcritureFraction, animation)."""
    n, d = f.valeurs
    fs = f._style[0]
    k = f.trait.width / f._style[2]
    g = EcritureFraction(d, n, fs=fs, couleur=couleur or f.num.get_color()).scale(k)
    g.shift(f.trait.get_center() - g.trait.get_center())
    for t in g.get_family():  # les chiffres déjà dits qui changent de place (pas de nouveaux nombres)
        t._pas_audit = True
    anim = AnimationGroup(ReplacementTransform(f.num, g.den, path_arc=-PI * 0.9),
                          ReplacementTransform(f.den, g.num, path_arc=-PI * 0.9),
                          ReplacementTransform(f.trait, g.trait), run_time=run_time)
    return g, anim


def moins(f, fs=None, couleur=WHITE):
    """Le signe « − » devant une fraction écrite, à la hauteur du trait."""
    t = Text("−", font_size=fs or int(f._style[0]), color=couleur)
    t.sans_synchro = True
    return t.next_to(f, LEFT, buff=0.15).set_y(f.trait.get_y())


class FracInverseBase(PaysageE):
    nom_voix = "4e-frac-inverse"
    fichier_marques = "frac_inverse_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'inverse d'une fraction", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("L'inverse")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        ex = expression((5, 3), "×", "?", "=", "1", fs=80).move_to(P(-0.6, 0.2))
        ex[2].set_color(AMBRE)
        self.au_mot("5 tiers")
        self.play(FadeIn(ex[0], scale=1.3), FadeIn(ex[1:3]), run_time=0.4)
        self.au_nb("obtenir 1")
        self.play(FadeIn(ex[3:], scale=1.2), run_time=0.4)
        self.insister(ex[2], 1.4, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Clara agrandit une photo ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = photographe(1.0).move_to(P(-5.3, -0.6))
        self.au_mot("Voici Clara")
        nom = self.t("Clara", 38, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        self.au_mot("photographe")
        metier = self.t("photographe", 28, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        p6 = photo(6, P(-2.4, 1.3))
        c6 = cote(p6, "6 cm")
        self.au_mot("Elle agrandit")
        self.play(FadeIn(p6, scale=0.8), run_time=0.4)
        self.au_nb("6 centimètres")
        self.play(FadeIn(c6), run_time=0.35)
        zoom = VGroup(self.t("×", 54, AMBRE), EcritureFraction(5, 3, fs=56, couleur=AMBRE)).arrange(RIGHT, buff=0.2)
        self.col(zoom, 1.4)
        self.au_nb("fois 5 tiers")
        p10 = photo(10, P(-2.4, -1.25))
        self.play(FadeIn(zoom, scale=1.2), TransformFromCopy(p6, p10), run_time=0.8)
        c10 = cote(p10, "10 cm", couleur=AMBRE)
        self.au_nb("maintenant 10")
        self.play(FadeIn(c10), run_time=0.35)
        self.au_mot("Comment revenir")
        q = self.col(self.t("10 cm → 6 cm : × ?", 42, ORANGE_RETENUE), -0.4)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : revenir : × 3/5 ────────────────────────────────────────────────
    def ecran_retour(self):
        self.ecran("02-retour")
        p10 = photo(10, P(-3.0, 1.3))
        p6 = photo(6, P(-3.0, -1.4))
        self.add(p10, cote(p10, "10 cm", couleur=AMBRE))
        z = VGroup(self.t("×", 48, VERT_OK), EcritureFraction(3, 5, fs=50, couleur=VERT_OK)).arrange(RIGHT, buff=0.15)
        z.move_to(P(-0.6, 0.0))
        self.au_nb("On multiplie par 3")
        self.play(FadeIn(z, scale=1.2), run_time=0.4)
        e1 = expression("10", "×", (3, 5, VERT_OK), "=", "6", fs=56)
        self.col(e1, 2.2)
        self.montre(["10 fois", "fois 3 cinquièmes", "égale 6"], [e1[0], e1[1:3], e1[3:]])
        self.play(TransformFromCopy(p10, p6), FadeIn(cote(p6, "6 cm")), run_time=0.7)
        self.au_mot("Pourquoi")
        e2 = expression((5, 3, AMBRE), "×", (3, 5, VERT_OK), "=", (15, 15), "=", "1", fs=48)
        self.col(e2, 0.3)
        self.montre(["5 tiers fois", "tiers fois 3", "15 quinzièmes", "quinzièmes : 1"],
                    [e2[0], e2[1:3], e2[3:5], e2[5:]])
        r = self.col(self.bloc(["Multiplier par 1 :", "ça ne change rien !"], 38, AMBRE), -1.6)
        for m in r:
            m.sans_synchro = True
        self.au_nb("multiplier par 1")
        self.play(FadeIn(r[0], shift=UP * 0.2), Create(self.encadrer(e2[6], buff=0.08)), run_time=0.4)
        self.au_mot("ça ne change")
        self.play(FadeIn(r[1], shift=UP * 0.2), run_time=0.35)
        self.attendre_voix()

    # ── 03 : la définition : on retourne ────────────────────────────────────
    def ecran_definition(self):
        self.ecran("03-definition")
        f = EcritureFraction(5, 3, fs=130, couleur=AMBRE).move_to(P(XF, 0.2))
        self.au_nb("l'inverse de 5")
        self.play(FadeIn(f, scale=1.2), run_time=0.35)
        l1 = self.col(self.bloc(["L'inverse :", "le produit vaut 1."], 40, VERT_OK), 2.3)
        self.poser_lignes(l1, "up", 0.3)
        self.au_mot("on la retourne")
        l2 = self.col(self.t("On retourne la fraction !", 40, AMBRE), 0.6)
        self.play(FadeIn(l2, shift=UP * 0.2), run_time=0.4)
        g, anim = retourner(f, couleur=VERT_OK, run_time=1.2)
        self.au_mot("le numérateur passe en bas")
        fl1 = CurvedArrow(f.num.get_left() + LEFT * 0.2, f.den.get_left() + LEFT * 0.2, angle=PI / 2, color=AMBRE)
        fl2 = CurvedArrow(f.den.get_right() + RIGHT * 0.2, f.num.get_right() + RIGHT * 0.2, angle=PI / 2, color=VERT_OK)
        l3 = self.col(self.bloc(["haut → bas", "bas → haut"], 40), -1.2)
        for m in l3:
            m.sans_synchro = True
        self.play(Create(fl1), FadeIn(l3[0], shift=RIGHT * 0.2), anim)
        self.au_mot("le dénominateur passe en haut")
        self.play(Create(fl2), FadeIn(l3[1], shift=RIGHT * 0.2), run_time=0.5)
        self.add(g)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (inverse de 4/7) ────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = EcritureFraction(4, 7, fs=130, couleur=AMBRE).move_to(P(XF, 0.3))

        def avant(sc):
            sc.play(FadeIn(f, scale=1.2), run_time=0.3)

        def apres(sc):
            g, anim = retourner(f, couleur=VERT_OK)
            sc.au_mot("On retourne")
            sc.play(anim)
            sc.add(g)
            sc.au_mot("7 quarts")
            sc.rep(0)
            sc.au_mot("Et 4 septièmes fois")
            sc.rep(1)
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["L'inverse", "de 4 septièmes ?"],
                            [self.inline("7/4"), self.inline("−4/7"), self.inline("4/7")], 0,
                            ["7/4 : on retourne !", "4/7 × 7/4 = 28/28 = 1"], mot_q="4 septièmes", avant_q=avant,
                            autres_r=apres)

    # ── 05 : les entiers et les « 1 sur » ───────────────────────────────────
    def ecran_entiers(self):
        self.ecran("05-entiers")
        self.au_mot("Et un nombre entier")
        tit = self.titre("Un nombre entier ?")
        cinq = Text("5", font_size=110, color=AMBRE).move_to(P(-4.6, 0.9))
        cinq.sans_synchro = True
        self.au_mot("5, c'est")
        self.play(FadeIn(cinq, scale=1.3), run_time=0.35)
        f = EcritureFraction(5, 1, fs=90, couleur=AMBRE).move_to(P(-2.3, 0.9))
        eg = Text("=", font_size=90).move_to(P(-3.45, 0.9))
        eg.sans_synchro = True
        self.au_mot("5 sur 1")
        self.play(FadeIn(eg), FadeIn(f.num, scale=1.2), run_time=0.3)
        self.au_nb("5 sur 1")
        self.play(FadeIn(f.trait), FadeIn(f.den, scale=1.2), run_time=0.3)
        g, anim = retourner(f, couleur=VERT_OK)
        l1 = self.col(self.ligne([("son inverse :", WHITE), ("1/5", VERT_OK)], 42), 1.8)
        for m in l1:
            m.sans_synchro = True
        self.au_mot("Son inverse")
        self.play(anim, FadeIn(l1[0], shift=RIGHT * 0.15), FadeOut(cinq), FadeOut(eg), run_time=0.8)
        self.add(g)
        self.au_mot("1 cinquième")
        self.play(FadeIn(l1[1], scale=1.3), run_time=0.3)
        h = EcritureFraction(1, 8, fs=90, couleur=AMBRE).move_to(P(-4.6, -1.5))
        self.au_mot("d'1 huitième")
        self.play(FadeIn(h, scale=1.2), run_time=0.35)
        h2, anim2 = retourner(h, couleur=VERT_OK)
        self.au_nb("c'est 8")
        self.play(anim2, run_time=0.8)
        self.add(h2)
        r8 = VGroup(Text("=", font_size=90), Text("8", font_size=110, color=VERT_OK)).arrange(RIGHT, buff=0.35)
        r8.next_to(h2, RIGHT, buff=0.35).set_y(h2.trait.get_y())
        for m in r8:
            m.sans_synchro = True
        l2 = self.col(self.ligne([("inverse de 1/8 :", WHITE), ("8", VERT_OK)], 42), -0.6)
        for m in l2:
            m.sans_synchro = True
        self.au_nb("sur 1 : 8")
        self.play(FadeIn(r8, scale=1.3), FadeIn(l2, shift=RIGHT * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le piège : l'inverse n'est pas l'opposé ────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention au piège")
        tit = self.titre("Inverse ≠ opposé !", ROUGE_ERREUR)
        dr = pas_audit(Droite(-1, 1, 6, etiquettes={-1: "−1", 0: "0", 1: "1"}, longueur=5.0, fs=30,
                              centre=P(XF, 1.2)))
        self.au_nb("L'opposé de 2")
        self.play(FadeIn(dr), FadeIn(dr.point(2 / 3, (2, 3))), run_time=0.5)
        self.au_nb("moins 2 tiers")
        pm = dr.point(-2 / 3, None, couleur=ROUGE_ERREUR)
        etm = VGroup(Text("−", font_size=34, color=ROUGE_ERREUR, weight=BOLD),
                     EcritureFraction(2, 3, fs=34, couleur=ROUGE_ERREUR, police="Arial", gras=True))
        etm.arrange(RIGHT, buff=0.08).next_to(pm, UP, buff=0.12)
        etm[0].sans_synchro = True
        self.play(FadeIn(pm), FadeIn(etm), run_time=0.4)
        l1 = self.col(self.ligne([("Opposé :", ROUGE_ERREUR), ("on change le signe.", WHITE)], 36), 1.9)
        self.au_mot("on change le signe")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.4)
        f = EcritureFraction(2, 3, fs=70, couleur=AMBRE).move_to(P(XF - 1.3, -1.6))
        self.au_nb("L'inverse de 2")
        self.play(FadeIn(f, scale=1.2), run_time=0.35)
        g, anim = retourner(f, couleur=VERT_OK)
        l2 = self.col(self.ligne([("Inverse :", VERT_OK), ("on retourne.", WHITE)], 36), 0.7)
        self.au_mot("3 demis")
        self.play(anim, FadeIn(l2, shift=RIGHT * 0.15), run_time=0.8)
        self.add(g)
        l3 = self.col(self.ligne([("Le signe", WHITE), ("reste !", VERT_OK)], 38), -0.6)
        self.au_mot("garde le signe")
        self.play(FadeIn(l3, shift=RIGHT * 0.15), run_time=0.35)
        f2 = EcritureFraction(2, 3, fs=70, couleur=AMBRE).move_to(P(XF + 1.6, -1.6))
        m2 = moins(f2, 70, AMBRE)
        self.au_nb("l'inverse de moins 2")
        self.play(FadeIn(VGroup(m2, f2), scale=1.2), run_time=0.35)
        g2, anim2 = retourner(f2, couleur=VERT_OK)
        self.au_mot("moins 3 demis")
        self.play(anim2, m2.animate.set_color(VERT_OK), run_time=0.8)
        self.add(g2)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (inverse de −3/4) ───────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = EcritureFraction(3, 4, fs=120, couleur=AMBRE).move_to(P(XF + 0.4, 0.3))
        m = moins(f, 120, AMBRE)

        def avant(sc):
            sc.au_nb("de moins 3")
            sc.play(FadeIn(VGroup(m, f), scale=1.2), run_time=0.3)

        def apres(sc):
            g, anim = retourner(f, couleur=VERT_OK)
            sc.au_mot("On retourne")
            sc.play(anim, m.animate.set_color(VERT_OK))
            sc.add(g)
            sc.au_nb("moins 4")
            sc.rep(0, 1)
            sc.au_mot("Moins fois moins")
            sc.rep(2, 3)
            sc.rep_fin()

        self.question_pause("07-question", "07b-reponse", ["L'inverse", "de −3 quarts ?"],
                            [self.inline("3/4"), self.inline("−4/3"), self.inline("4/3")], 1,
                            ["−4/3 :", "le signe reste.", "− × − → + :", "le produit vaut 1."],
                            mot_q="l'inverse", avant_q=avant, autres_r=apres)

    # ── 08 : 0 n'a pas d'inverse ────────────────────────────────────────────
    def ecran_zero(self):
        self.ecran("08-zero")
        z = Text("0", font_size=150, color=AMBRE).move_to(P(XF, 0.6))
        z.sans_synchro = True
        self.au_mot("Et 0")
        self.play(FadeIn(z, scale=1.4), run_time=0.4)
        l1 = self.col(self.ligne([("0 × 5 = 0", WHITE)], 46), 2.0)
        l2 = self.col(self.bloc(["0 × n'importe quel nombre", "= 0"], 40), 0.75)
        bloc_fixe(l2)
        self.au_mot("0 fois 5")
        self.poser_lignes(l1, "fade", 0.3)
        self.au_mot("n'importe quel nombre")
        self.play(FadeIn(l2, shift=RIGHT * 0.15), run_time=0.35)
        self.au_nb("jamais 1")
        l3 = self.col(self.ligne([("0 × ? = 1", WHITE)], 46), -0.55)
        pas_audit(l3)
        self.play(FadeIn(l3, shift=RIGHT * 0.15), Create(croix(l3, sw=6)), run_time=0.35)
        self.au_mot("0 n'a pas d'inverse")
        r = self.col(self.t("0 n'a pas d'inverse !", 44, ROUGE_ERREUR), -1.8)
        r.sans_synchro = True
        self.play(FadeIn(r, scale=1.2), Indicate(z, color=ROUGE_ERREUR), run_time=0.5)
        self.attendre_voix()

    # ── 09 : défi (réduite à 80 %, quel zoom pour revenir ?) ────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        t = self.titre("À toi de jouer !", fs=50)
        p0 = photo(10, P(-3.4, 1.2))
        self.play(FadeIn(p0), run_time=0.4)
        z = Pourcentage(80, mode="chargement", largeur=4.0, hauteur=0.45, couleur=BLEU_CALCUL, etiquette=False)
        z.move_to(P(-3.4, -0.8))
        z.vide()
        z.plein.set_opacity(1)
        l1 = self.col(self.t("Réduite à 80 %", 42, BLEU_CALCUL), 1.6)
        self.au_nb("photo à 80")
        p8 = photo(8, P(-3.4, 1.2))
        self.play(FadeIn(l1, shift=RIGHT * 0.15), FadeIn(z.piste), Transform(p0, p8), run_time=0.5)
        self.add(z.plein)
        self.play(z.remplir(0.4), run_time=0.4)
        self.au_mot("Quel zoom")
        q = self.col(self.t("Pour revenir : zoom ? %", 40, ORANGE_RETENUE), 0.3)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-1.0)

    def ecran_correction(self):
        self.ecran("10-correction", 0.65)
        t = self.titre("Correction", fs=50)
        e = expression("80 %", "=", (80, 100), "=", (4, 5, AMBRE), fs=50)
        self.col(e, 1.75)
        self.montre(["80 %", "80 centièmes", "par 20 : 4"], [e[0], e[1:3], e[3:]])
        f = EcritureFraction(4, 5, fs=110, couleur=AMBRE).move_to(P(-3.3, 0.0))
        self.au_nb("L'inverse de 4")
        self.play(FadeIn(f, scale=1.2), run_time=0.35)
        g, anim = retourner(f, couleur=VERT_OK, run_time=0.8)
        self.au_nb("c'est 5")
        self.play(anim, run_time=0.8)
        self.add(g)
        lg = self.col(self.ligne([("5 ÷ 4", WHITE), ("= 1,25", BLEU_CALCUL)], 50), 0.0)
        self.au_mot("5 divisé par 4")
        self.poser_lignes(lg, "fade", 0.3)
        r = self.col(self.t("Zoom : 125 %", 54, VERT_OK), -1.6)
        self.au_nb("c'est 125")
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(r, buff=0.15)), run_time=0.3)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        fig = expression((5, 3, AMBRE), "×", (3, 5, VERT_OK), "=", "1", fs=56)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("L'inverse : multiplié", "par lui, ça donne 1."),
                                                         ("Pour une fraction,", "on la retourne."),
                                                         ("Le signe reste :", "ce n'est pas l'opposé."),
                                                         ("0 n'a pas d'inverse.",)], fs=34)
        self.au_mot("L'inverse d'un nombre")
        self.montrer_ligne(lignes[0])
        self.au_mot("Pour une fraction")
        self.montrer_ligne(lignes[1])
        self.au_mot("L'inverse garde")
        self.montrer_ligne(lignes[2])
        for t in lignes[3].get_family():
            t.sans_synchro = True
        self.au_mot("Et 0")
        self.play(Create(lignes[3][0]), FadeIn(lignes[3][1], shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_retour()
        self.ecran_definition()
        self.ecran_question1()
        self.ecran_entiers()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_zero()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracInverse4e(FracInverseBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
