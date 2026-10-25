# frac_multiplier.py
# EleveAI — Maths 5e — série « Fractions », épisode 08 : MULTIPLIER DES
# FRACTIONS (micro du coach : fraction_multiplier, notion fraction_calcul),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 5e
# (le produit vu comme une AIRE, la règle, SIMPLIFIER sans soustraire,
# simplifier avant, entier × fraction, chaîne décimal → pourcentage, défi).
# Short jumeau : frac_multiplier_short.py (la tablette de chocolat, blanche).
#
# Décor et métier : l'ARCHITECTURE ; Fatou, ARCHITECTE, dessine la cour d'un
# collège : 3/5 en herbe (moins de chaleur), arbres sur les 2/3 de l'herbe :
# 2/3 × 3/5 = 6/15 = 2/5 = 0,4 = 40 % ; défi : 3/4 des arbres sont fruitiers :
# 3/4 × 2/5 = 6/20 = 3/10 = 0,3 = 30 %. Chiffres inventés (aucune donnée du
# monde réel citée). Centres : nature-ecologie, art-design.
# Vérifié (Python, fractions.Fraction) : 2/3 × 3/5 = 2/5 ; 1/4 × 3/5 = 3/20 ;
# 5/6 × 3/5 = 1/2 ; 4 × 2/7 = 8/7 ; 3 × 2/9 = 2/3 ; 3/4 × 2/5 = 3/10.
#
# Micro → écrans (banque 5e/maths/fractions.bank.ts, genMultiplication) : ★2
# fraction × fraction (02, 03, question 1 = 1/4 × 3/5, leurres « (a+b)/(c+d) »
# et « on garde le dénominateur »), entier × fraction (07, question 2), ★3 de
# quoi simplifier (05, 06 « simplifier avant »), situations « a/b de cette
# partie » = produit (01, défi).
# Écrans : 00 garde · 01 Fatou et la cour · 02 la grille (aire) · 03 la règle ·
# 04 QUESTION 1 · 05 simplifier (sans soustraire) · 06 simplifier avant ·
# 07 entier × fraction · 08 QUESTION 2 · 09 0,4 = 40 % · 10 défi ·
# 10b correction · 11 ce que tu as appris · 12 fin.
#
# ⭐ Bases : 5e/frac_loth_commun.py (PaysageH, Pave, L()) ; frac_prod() RECOPIÉE
# de 4e/frac_multiplier.py ; canvas_fractions.py (non modifié).
# Voix : manim/voix/5e-frac-multiplier.json (débit −10), WAV dans
# public/sons/5e-frac-multiplier/ ; marques : 5e/frac_multiplier_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/frac_multiplier.py FracMultiplier5e
# python -m manim render -qh --disable_caching manim/scripts/5e/frac_multiplier.py FracMultiplier5e -o eleveai-maths-5e-frac-multiplier --media_dir manim/scripts/5e/media-frac-multiplier
# Sortie : manim/sorties/5e/maths/fractions/08-multiplier/eleveai-maths-5e-frac-multiplier.mp4

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_loth_commun import *  # noqa: E402,F403

HERBE = "#86efac"
ARBRE = "#15803d"
FRUIT = "#f97316"
XC = -3.0


def frac_prod(n1, n2, d1, d2, fs=56, couleur=WHITE):
    """« n1 × n2 / d1 × d2 » : .n1 (« n1 × ») .n2 .d1 (« d1 × ») .d2 .trait
    (RECOPIÉE de 4e/frac_multiplier.py) ; chaque morceau se pose AU MOT."""
    g = VGroup()
    num = VGroup(Text(f"{n1} ×", font_size=fs, color=couleur), Text(str(n2), font_size=fs, color=couleur))
    den = VGroup(Text(f"{d1} ×", font_size=fs, color=couleur), Text(str(d2), font_size=fs, color=couleur))
    for v in (num, den):
        v.arrange(RIGHT, buff=0.18)
    larg = max(num.width, den.width) + 0.25
    trait = Line(LEFT * larg / 2, RIGHT * larg / 2, color=couleur, stroke_width=max(3, fs / 14))
    num.next_to(trait, UP, buff=0.12)
    den.next_to(trait, DOWN, buff=0.12)
    g.add(num, trait, den)
    g.n1, g.n2, g.d1, g.d2, g.trait = num[0], num[1], den[0], den[1], trait
    for m in g.get_family():
        m.sans_synchro = True
    return g


def architecte(s=1.0):
    """Fatou : veste ocre, un plan roulé sous le bras."""
    p = personne(peau="#5c3a21", tenue="#b45309", cheveux="#111827", longs=True, s=s)
    plan = RoundedRectangle(width=0.22 * s, height=1.0 * s, corner_radius=0.1 * s, fill_color="#bfdbfe",
                            fill_opacity=1, stroke_color="#1d4ed8", stroke_width=3).rotate(0.5)
    plan.move_to(p.corps.get_center() + RIGHT * 0.55 * s)
    p.add(plan, lunettes(p))
    return p


def arbre(s=0.3):
    tronc = Rectangle(width=0.12, height=0.3, fill_color="#78350f", fill_opacity=1, stroke_width=0)
    feuil = Circle(radius=0.22, fill_color="#166534", fill_opacity=1, stroke_width=0).next_to(tronc, UP, buff=-0.06)
    return VGroup(tronc, feuil).scale(s / 0.3)


class FracMultiplierBase(PaysageH):
    nom_voix = "5e-frac-multiplier"
    fichier_marques = "frac_multiplier_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """25/10 : la phrase de RÉPONSE était réduite (≈ 26) pour tenir dans la
        colonne : refaite en corps 34 (lisible projetée en classe), lignes
        courtes, sous les cartes, à gauche de Ti-Margo, dans les marges."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        g, haut = cartes.get_left()[0], cartes.get_bottom()[1] - 0.25
        neuf = VGroup(*[self.t(s, 34, VERT_OK) for s in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        if neuf.width > 5.3 - g:  # Ti-Margo commence à x ≈ 5,7 : de l'air
            neuf.scale_to_fit_width(5.3 - g)
        if neuf.height > haut + 3.45:  # bas ≥ −3,45 (marge des 3 %)
            neuf.scale_to_fit_height(haut + 3.45)
        neuf.align_to(P(g, 0), LEFT).align_to(P(0, haut), UP)
        self.ph_q = neuf
        return tete, q, cartes, pause, rebours, neuf

    def rep_mots(self, i, morceaux, avec=()):
        """25/10 : la ligne i de la réponse posée MORCEAU PAR MORCEAU, chacun à
        son mot (0 s d'avance) : morceaux = [(texte écrit, extrait de la voix)] ;
        `avec` : jouées avec le premier morceau."""
        lg, k = self.ph_q[i], 0
        for j, (txt, mot) in enumerate(morceaux):
            n = len(txt.replace(" ", ""))
            part, k = VGroup(*lg[k:k + n]), k + n
            self.au_nb(mot) if re.search(r"\d", mot) else self.au_mot(mot)
            self.play(FadeIn(part, shift=UP * 0.15), *(list(avec) if j == 0 else []), run_time=0.3)
        assert k == len(lg), f"morceaux de « {lg.original_text} » mal comptés"
        self._deja = getattr(self, "_deja", set()) | {i}

    def cour(self, L=4.2, H=3.0, centre=P(XC, -0.1), lignes=False):
        """La cour : 5 bandes × 3 rangées ; .herbe (3 bandes) et .arbres (2 rangées)."""
        pv = Pave(5, 3, 0, 0, L=L, H=H, centre=centre)
        pv.herbe = pv.bande(0, 3, 0, 3, HERBE).set_z_index(1)
        pv.arbres = pv.bande(0, 3, 0, 2, ARBRE).set_z_index(1)
        pv.icones = VGroup(*[arbre(0.22).move_to(pv.cases[r][c]) for r in range(2) for c in range(3)]).set_z_index(3)
        for m in (pv.vert, pv.hori):
            m.set_z_index(2)
            if not lignes:
                m.set_opacity(0)
        pv.contour.set_z_index(2)
        return pv

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Multiplier des fractions", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Multiplier")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        ex = expression((2, 3), "×", (3, 5), "=", "?", fs=80).move_to(P(-0.6, 0.2))
        ex[4].set_color(AMBRE)
        self.montre(["2 tiers", "fois 3"], [ex[0], ex[1:3]])
        self.au_mot("combien")
        self.play(FadeIn(ex[3:], scale=0.5), run_time=0.4)
        self.insister(ex[4], 1.4, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Fatou et la cour ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        self.personnage(architecte(1.0), "Fatou", ["architecte"], x=-5.6, y=-0.4)
        pv = self.cour(L=3.4, H=2.5, centre=P(-2.4, -0.2))
        nom = pas_audit(self.inline("la cour", 30, GREY_B).next_to(pv, UP, buff=0.1))
        self.au_mot("la cour d'un collège")
        self.play(FadeIn(pv), FadeIn(nom), run_time=0.5)
        self.L([(EcritureFraction(3, 5, fs=50, couleur=HERBE), None, "Les 3 cinquièmes"), ("de la cour", WHITE, None),
                (": herbe", HERBE, "en herbe")], 2.3, 38, avec={1: [FadeIn(pv.herbe)]})
        self.L([(EcritureFraction(2, 3, fs=50, couleur=ARBRE), None, "les 2 tiers"), ("de l'herbe", WHITE, "cette herbe"),
                (": arbres", "#4ade80", "des arbres")], 0.85, 38, avec={2: [FadeIn(pv.arbres), FadeIn(pv.icones)]})
        self.au_mot("Quelle part")
        q = self.col(self.t("Arbres : ? de la cour", 40, ORANGE_RETENUE), -0.6)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la grille : 6 rectangles sur 15 ────────────────────────────────
    def ecran_grille(self):
        self.ecran("02-grille")
        pv = self.cour()
        self.add(pv)
        self.au_mot("Les 2 tiers des")
        self.play(Indicate(pv.fond, color=AMBRE, scale_factor=1.02), run_time=0.5)
        self.au_nb("en 5 bandes")
        self.play(pv.vert.animate.set_opacity(1), run_time=0.5)
        self.au_nb("on en prend 3")
        self.play(FadeIn(pv.herbe), run_time=0.4)
        self.au_nb("en 3 rangées")
        self.play(pv.hori.animate.set_opacity(1), run_time=0.5)
        self.au_nb("on en prend 2")
        self.play(FadeIn(pv.arbres), FadeIn(pv.icones), run_time=0.4)
        self.L([("5", WHITE, "rangées : on en prend 2, les arbres. 5"), ("× 3", WHITE, "5 fois 3"),
                ("= 15", AMBRE, "égale 15")], 2.2, 46, avec={2: [Indicate(VGroup(pv.vert, pv.hori), color=AMBRE)]})
        nums = pv.numeros([(r, c) for r in range(2) for c in range(3)], fs=28)
        for n in nums:
            n.set_z_index(4).set_color(WHITE)
            n.shift(DOWN * 0.22 + RIGHT * 0.22)
        self.L([("3", WHITE, "rectangles. 3"), ("× 2", WHITE, "3 fois 2"), ("= 6", ARBRE, "égale 6")], 1.0, 46,
               avec={2: [LaggedStart(*[FadeIn(n, scale=1.5) for n in nums], lag_ratio=0.12, run_time=0.7)]})
        self.au_mot("6 quinzièmes")
        l = VGroup(EcritureFraction(6, 15, fs=68, couleur="#4ade80"), self.t("de la cour", 38, "#4ade80"))
        l.arrange(RIGHT, buff=0.2)
        l[1].sans_synchro = True
        self.col(l, -0.6)
        self.play(FadeIn(l, scale=1.2), run_time=0.4)
        self.play(Create(self.encadrer(l, buff=0.15)), run_time=0.3)
        self.attendre_voix()
        return pv

    # ── 03 : la règle ───────────────────────────────────────────────────────
    def ecran_regle(self, pv):
        self.ecran("03-regle")
        self.add(pv, pv.herbe, pv.arbres, pv.icones)
        self.au_mot("C'est la règle")
        self.titre("La règle")
        e = expression((2, 3), "×", (3, 5), "=", fs=60)
        fp = frac_prod(2, 3, 3, 5, fs=54)
        res = VGroup(Text("=", font_size=60), EcritureFraction(6, 15, fs=60, couleur="#4ade80")).arrange(RIGHT, buff=0.3)
        res[0].sans_synchro = True
        ligne = VGroup(e, fp, res).arrange(RIGHT, buff=0.3)
        fp.shift(UP * (e[0].trait.get_y() - fp.trait.get_y()))
        res.shift(UP * (e[0].trait.get_y() - res[1].trait.get_y()))
        self.col(ligne, 1.3)
        self.montre(["la règle : 2 tiers", "fois 3 cinquièmes"], [e[0], e[1:]])
        self.au_nb("En haut, 2")
        self.play(FadeIn(fp.n1, shift=DOWN * 0.1), Indicate(VGroup(e[0].num, e[2].num), color=AMBRE), run_time=0.35)
        self.au_nb("2 fois 3")
        self.play(FadeIn(fp.n2, shift=DOWN * 0.1), run_time=0.3)
        self.au_nb("égale 6")
        self.play(FadeIn(res[0]), FadeIn(res[1].num, scale=1.3), FadeIn(res[1].trait), run_time=0.3)
        self.au_nb("En bas, 3")
        self.play(FadeIn(fp.trait), FadeIn(fp.d1, shift=UP * 0.1), Indicate(VGroup(e[0].den, e[2].den), color=AMBRE),
                  run_time=0.35)
        self.au_nb("3 fois 5")
        self.play(FadeIn(fp.d2, shift=UP * 0.1), run_time=0.3)
        self.au_nb("égale 15")
        self.play(FadeIn(res[1].den, scale=1.3), run_time=0.3)
        self.au_mot("On multiplie les numérateurs")
        r = self.col(self.bloc(["numérateur × numérateur", "dénominateur × dénominateur"], 34, AMBRE), -0.9)
        bloc_fixe(r)
        self.play(FadeIn(r[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("et les dénominateurs")
        self.play(FadeIn(r[1], shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1/4 × 3/5) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pv = Pave(5, 4, 3, 1, L=4.0, H=3.2, couleur=BLEU_PART, centre=P(XC, 0.0))
        pv.pris.set_opacity(0)
        self.add(pv)

        def apres(sc):
            sc.rep_mots(0, [("En haut :", "En haut"), ("1 ×", "haut, 1"), ("3", "fois 3"), ("= 3", "égale 3")],
                        avec=[pv.pris.animate.set_opacity(1)])
            sc.rep_mots(1, [("En bas :", "En bas"), ("4 ×", "bas, 4"), ("5", "fois 5"), ("= 20", "égale 20")],
                        avec=[Indicate(VGroup(pv.vert, pv.hori), color=AMBRE)])
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["1 quart", "× 3 cinquièmes ?"],
                            [self.inline("4/9"), self.inline("3/20"), self.inline("3/5")], 1,
                            ["En haut : 1 × 3 = 3", "En bas : 4 × 5 = 20"], mot_q="1 quart", autres_r=apres)

    # ── 05 : simplifier, sans soustraire (6/15 = 2/5) ──────────────────────
    def ecran_simplifier(self, pv):
        self.ecran("05-simplifier")
        self.add(pv, pv.herbe, pv.arbres, pv.icones)
        f2, g = EcritureFraction(6, 15, fs=60), EcritureFraction(2, 5, fs=60, couleur=VERT_OK)
        eg = egalite(f2, g, buff=1.0)
        self.col(eg, -0.95)
        self.au_mot("6 quinzièmes")
        self.play(FadeIn(f2, scale=1.2), run_time=0.35)
        self.au_mot("On ne soustrait pas")
        nb = self.col(self.t("On ne soustrait pas !", 36, ROUGE_ERREUR), 2.4)
        nb.sans_synchro = True
        self.play(FadeIn(nb, shift=UP * 0.15), run_time=0.35)
        faux = self.L([("6", ROUGE_ERREUR, "6 moins"), ("− 3", ROUGE_ERREUR, "6 moins 3"), ("sur", ROUGE_ERREUR, None),
                       ("15", ROUGE_ERREUR, "15 moins"), ("− 3", ROUGE_ERREUR, "15 moins 3"),
                       ("= 3/12", ROUGE_ERREUR, "3 douzièmes")], 1.5, 36, buff=0.15)
        self.au_mot("c'est faux")
        self.play(Create(croix(faux, sw=6).set_stroke(opacity=0.9)), run_time=0.3)
        haut, bas = fleches(f2, g, "÷ 3", fs=30, angle=TAU / 10)
        self.au_nb("On divise par 3")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.5)
        self.au_nb("bas : 2")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("Les arbres couvrent")
        self.play(Create(self.encadrer(g, buff=0.15)), Indicate(pv.arbres, color=AMBRE, scale_factor=1.03), run_time=0.5)
        self.attendre_voix()

    # ── 06 : simplifier AVANT de multiplier (5/6 × 3/5) ─────────────────────
    def ecran_avant(self):
        self.ecran("06-avant")
        self.au_mot("Astuce")
        self.titre("Astuce : simplifier avant !", VERT_OK)
        e = expression((5, 6), "×", (3, 5), "=", fs=64)
        fp = frac_prod(5, 3, 6, 5, fs=62)
        ligne = VGroup(e, fp).arrange(RIGHT, buff=0.3).move_to(P(-2.4, 0.4))
        fp.shift(UP * (e[0].trait.get_y() - fp.trait.get_y()))
        pas_audit(fp)  # la même écriture, réécrite (« 5 sixièmes » ne dit pas le chiffre 6)
        self.montre(["5 sixièmes", "fois 3"], [e[0], e[1:]])
        self.play(FadeIn(fp, shift=RIGHT * 0.2), run_time=0.4)
        q5h, q5b = fp.n1[0], fp.d2
        self.au_nb("Le 5 en haut")
        self.play(Indicate(q5h, color=AMBRE, scale_factor=1.5), run_time=0.4)
        self.au_nb("le 5 en bas")
        self.play(Indicate(q5b, color=AMBRE, scale_factor=1.5), run_time=0.4)
        self.au_mot("s'en vont")
        self.play(Create(barrer(q5h)), Create(barrer(q5b)), run_time=0.4)
        q3, q6 = fp.n2, fp.d1[0]
        self.au_nb("Le 3 et le 6")
        self.play(Indicate(VGroup(q3, q6), color=AMBRE, scale_factor=1.4), run_time=0.5)
        self.au_nb("par 3 : 1")
        u1 = petit(1, q3, True)
        self.play(Create(barrer(q3)), FadeIn(u1, scale=1.4), run_time=0.35)
        u1._pas_audit = False
        self.au_nb("1 et 2")
        u2 = petit(2, q6, False)
        u2._pas_audit = False
        self.play(Create(barrer(q6)), FadeIn(u2, scale=1.4), run_time=0.35)
        self.au_mot("1 demi")
        res = self.col(VGroup(Text("=", font_size=64), EcritureFraction(1, 2, fs=64, couleur=VERT_OK))
                       .arrange(RIGHT, buff=0.3), -1.6)
        res[0].sans_synchro = True
        self.play(FadeIn(res, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(res[1], buff=0.15)), run_time=0.3)
        self.attendre_voix()

    # ── 07 : un entier fois une fraction (4 × 2/7 = 8/7) ────────────────────
    def ecran_entier(self):
        self.ecran("07-entier")
        self.au_mot("Et un nombre entier")
        self.titre("Entier × fraction")
        bs = VGroup(*[Barre(7, 2, largeur=3.8, hauteur=0.45, couleur=BLEU_PART, marge=0.12, centre=P(-3.3, 1.7 - 0.85 * i))
                      for i in range(4)])
        e = expression("4", "×", (2, 7), fs=60)
        self.col(e, 1.6)
        self.au_nb("4 fois")
        self.play(FadeIn(e[:2], scale=1.2), LaggedStart(*[FadeIn(b, shift=RIGHT * 0.2) for b in bs], lag_ratio=0.15),
                  run_time=0.6)
        self.au_nb("fois 2")
        self.play(FadeIn(e[2:], scale=1.2), run_time=0.3)
        self.L([("4", WHITE, "4, c'est"), ("=", WHITE, None), (EcritureFraction(4, 1, fs=50), None, "c'est 4")], 0.35, 46)
        self.L([("En haut :", WHITE, "En haut"), ("4", WHITE, "haut, 4"), ("× 2", WHITE, ("4 fois 2", 2)),
                ("= 8", VERT_OK, "égale 8")], -0.75, 40)
        self.L([("En bas :", WHITE, "En bas"), ("1", WHITE, "bas, 1"), ("× 7", WHITE, "1 fois 7"),
                ("= 7", VERT_OK, "égale 7")], -1.55, 40)
        self.au_mot("8 septièmes")
        r = VGroup(Text("=", font_size=60), EcritureFraction(8, 7, fs=60, couleur=VERT_OK)).arrange(RIGHT, buff=0.3)
        r[0].sans_synchro = True
        r.next_to(e, RIGHT, buff=0.3)
        r.shift(UP * (e[2].trait.get_y() - r[1].trait.get_y()))
        self.play(FadeIn(r, scale=1.3), *[Indicate(VGroup(b.parts[0], b.parts[1]), color=VERT_OK) for b in bs],
                  run_time=0.6)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (3 × 2/9) ───────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bs = VGroup(*[Barre(9, 2, largeur=4.2, hauteur=0.5, couleur=BLEU_PART, marge=0.12, centre=P(XC, 1.0 - 0.95 * i))
                      for i in range(3)])
        self.add(bs)

        def apres(sc):
            sc.rep_mots(0, [("3 ×", "B. 3"), ("2", "fois 2"), ("= 6 :", "égale 6"), ("6/9", "6 neuvièmes")],
                        avec=[*[Indicate(VGroup(b.parts[0], b.parts[1]), color=AMBRE) for b in bs]])
            sc.rep_mots(1, [("÷ 3", "par 3"), ("en haut", "en haut")])
            sc.rep_mots(2, [("et en bas :", "et en bas"), ("2/3", "2 tiers")])
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse", ["3 × 2 neuvièmes,", "simplifié ?"],
                            [self.inline("6/27"), self.inline("2/3"), self.inline("5/9")], 1,
                            ["3 × 2 = 6 : 6/9", "÷ 3 en haut", "et en bas : 2/3"], mot_q="3 fois 2", autres_r=apres)

    # ── 09 : 2/5 = 0,4 = 40 % ───────────────────────────────────────────────
    def ecran_chaine(self):
        self.ecran("09-chaine")
        pv = self.cour(lignes=True)
        self.au_mot("Revenons à la cour")
        self.play(FadeIn(pv), FadeIn(pv.herbe), FadeIn(pv.arbres), FadeIn(pv.icones), run_time=0.5)
        f = EcritureFraction(2, 5, fs=70, couleur=VERT_OK)
        self.col(f, 2.0)
        self.au_nb("2 cinquièmes")
        self.play(FadeIn(f, scale=1.2), run_time=0.35)
        self.L([("2", WHITE, "c'est 2 divisé"), ("÷ 5", WHITE, "par 5"), ("= 0,4", BLEU_CALCUL, "0,4")], 0.5, 52)
        pc = Pourcentage(40, mode="chargement", largeur=4.6, hauteur=0.55, couleur=ARBRE, etiquette=False)
        pc.vide()
        self.col(pc, -0.8)
        p40 = self.t("40 %", 50, "#4ade80").next_to(pc, DOWN, buff=0.25).align_to(pc, RIGHT)
        pc.plein.set_opacity(1)
        self.au_mot("Les arbres couvrent")
        self.play(FadeIn(pc.piste), run_time=0.2)
        self.add(pc.plein)
        self.play(pc.remplir(0.4), Indicate(pv.arbres, color=AMBRE, scale_factor=1.03), run_time=0.4)
        self.au_nb("couvrent 40")
        self.play(FadeIn(p40, scale=1.3), run_time=0.35)
        self.insister(p40, 1.3, 0.25)
        self.attendre_voix()

    # ── 10 : défi (3/4 des arbres sont fruitiers) ───────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi")
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50, centre=True)
        pv = self.cour(lignes=True, centre=P(XC, -0.4))
        self.play(FadeIn(pv), FadeIn(pv.herbe), FadeIn(pv.arbres), FadeIn(pv.icones), run_time=0.4)
        self.L([("arbres :", "#4ade80", "Parmi ces arbres"),
                (pas_audit(EcritureFraction(2, 5, fs=48, couleur="#4ade80")), None, None),
                ("de la cour", WHITE, None)], 1.95, 38)
        self.L([("fruitiers :", FRUIT, "les 3 quarts"), (EcritureFraction(3, 4, fs=48, couleur=FRUIT), None, None),
                ("des arbres", WHITE, None)], 0.75, 38)
        self.au_mot("Quelle part")
        q = self.col(self.t("Fruitiers : ? de la cour", 38, ORANGE_RETENUE), -0.45)
        q.sans_synchro = True
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.au_mot("En fraction simplifiée")
        q2 = self.col(self.t("fraction simplifiée, puis %", 32, AMBRE), -1.1)
        q2.sans_synchro = True
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-1.8)

    def ecran_correction(self):
        self.ecran("10b-correction")
        self.titre("Correction", fs=50, centre=True)
        self.au_mot("Les 3 quarts de 2")
        e = expression((3, 4, FRUIT), "×", (2, 5, "#4ade80"), "=", fs=56)
        fp = frac_prod(3, 2, 4, 5, fs=52)
        ligne = VGroup(e, fp).arrange(RIGHT, buff=0.3)
        fp.shift(UP * (e[0].trait.get_y() - fp.trait.get_y()))
        ligne.move_to(P(-2.6, 1.3))
        self.au_nb("c'est 3")
        self.play(FadeIn(e[0], scale=1.2), run_time=0.3)
        self.au_nb("fois 2")
        self.play(FadeIn(e[1:], scale=1.2), run_time=0.3)
        f, g = EcritureFraction(6, 20, fs=60), EcritureFraction(3, 10, fs=60, couleur=VERT_OK)
        eg = egalite(f, g, buff=1.0)
        eg.move_to(P(-2.6, -1.3))
        self.au_nb("En haut, 3")
        self.play(FadeIn(fp.n1), FadeIn(fp.trait), run_time=0.3)
        self.au_nb("3 fois 2")
        self.play(FadeIn(fp.n2), run_time=0.3)
        self.au_nb("égale 6")
        self.play(FadeIn(f.num, scale=1.2), FadeIn(f.trait), run_time=0.3)
        self.au_nb("En bas, 4")
        self.play(FadeIn(fp.d1), run_time=0.3)
        self.au_nb("4 fois 5")
        self.play(FadeIn(fp.d2), run_time=0.3)
        self.au_nb("égale 20")
        self.play(FadeIn(f.den, scale=1.2), run_time=0.3)
        haut, bas = fleches(f, g, "÷ 2", fs=30, angle=TAU / 10)
        self.au_nb("On simplifie par 2")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.35)
        self.au_mot("3 dixièmes. 3")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        lg = self.L([(EcritureFraction(3, 10, fs=56, couleur=VERT_OK), None, ("3 dixièmes", 2)),
                     ("= 0,3", BLEU_CALCUL, "c'est 0,3"), ("= 30 %", VERT_OK, "0,3 : 30")], 0.3, 44)
        self.au_mot("de la cour")
        self.play(Create(self.encadrer(lg[2], buff=0.08)), run_time=0.35)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale")
        pv = self.cour(L=3.0, H=2.2, centre=ORIGIN, lignes=True)
        pv.add(pv.herbe, pv.arbres, pv.icones)
        lab = expression((2, 3), "×", (3, 5), "=", (6, 15), fs=38).next_to(pv, DOWN, buff=0.3)
        fig = VGroup(pv, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("On multiplie les numérateurs,", "et les dénominateurs."),
                                                         ("On simplifie le résultat,", "ou même avant de multiplier."),
                                                         ("Prendre une fraction de,", "c'est multiplier.")], fs=34)
        self.au_mot("On multiplie les numérateurs")
        self.montrer_ligne(lignes[0])
        self.au_mot("On simplifie")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et prendre")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        pv = self.ecran_grille()
        self.ecran_regle(pv)
        self.ecran_question1()
        self.ecran_simplifier(pv)
        self.ecran_avant()
        self.ecran_entier()
        self.ecran_question2()
        self.ecran_chaine()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracMultiplier5e(FracMultiplierBase):
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
