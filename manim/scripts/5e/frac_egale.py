# frac_egale.py
# EleveAI — Maths 5e — série « Fractions », épisode 01 : DES FRACTIONS ÉGALES
# (micro du coach : fraction_egale), AVEC VOIX. Paysage 16:9, CEINTURE VERTE :
# la paysage complète du niveau 5e (même quantité = fractions égales ; ×/÷ le
# même nombre en haut ET en bas ; compléter ?/12 ; deux fractions qui ne sont
# PAS égales ; vérifier en écrivant le même dénominateur (dénominateurs
# multiples l'un de l'autre, pas de produits en croix) ; diviser = simplifier ;
# défi corrigé qui finit par la chaîne fraction → décimal → pourcentage).
# Short jumeau : frac_egale_short.py (blanche, la demi-heure de l'horlogère).
# Leurres tirés des copies de Frédéric : AJOUTER/SOUSTRAIRE le même nombre
# (2/3 → 11/12 ; 4/5 → 5/6 ; 12/16 → 3/7), ne changer qu'UN terme (2/3 → 2/12 ;
# 4/5 → 8/5).
#
# Décor et métier : un PARC ANIMALIER ; Tom, SOIGNEUR : la girafe mange 3/4
# d'une botte de foin coupée en 8 tranches → 6/8. Défi : le zèbre mange 2/5
# d'une botte coupée en 20 tranches → 8/20 ; 2 ÷ 5 = 0,4 = 40 %.
# Chiffres inventés (aucune donnée du monde réel citée). Centres : animaux.
# Vérifié (Python) : 3/4 = 6/8 ; 3/5 = 6/10 ; 2/3 = 8/12 ; 2/3 ≠ 4/5 ;
# 3/4 = 9/12 ; 4/5 = 8/10 ; 12/16 = 3/4 ≠ 3/7 ; 10/15 = 2/3 ; 2/5 = 8/20.
#
# Micro → écrans (banque 5e/maths/fractions.bank.ts) : genEgaleOuiNon
# (05, 06, QUESTION 3 « vrai ou faux »), genEgaleCompleter (QUESTION 1),
# genEgaleQcm (QUESTION 2, leurres de la banque n+k/d+k, n/d×k), fixed_1-3.
# Écrans : 00 garde · 01 Tom · 02 couper chaque quart en 2 · 03 la règle ·
# 04 QUESTION 1 · 05 pas égales · 06 même dénominateur · 07 QUESTION 2 ·
# 08 diviser (et le piège) · 09 QUESTION 3 · 10 défi · 10b correction ·
# 11 ce que tu as appris · 12 fin.
#
# ⭐ Bases : 5e/frac_lotg_commun.py (PaysageG ← 4e/frac_lotd_commun.py) ;
# canvas_fractions.py (non modifié). Ajouté ici : soigneur(), girafe(), zebre().
# Voix : manim/voix/5e-frac-egale.json (débit −10) ; marques : 5e/frac_egale_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/frac_egale.py FracEgale5e
# python -m manim render -qh --disable_caching manim/scripts/5e/frac_egale.py FracEgale5e -o eleveai-maths-5e-frac-egale --media_dir manim/scripts/5e/media-frac-egale
# Sortie : manim/sorties/5e/maths/fractions/01-egale/eleveai-maths-5e-frac-egale.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotg_commun import *  # noqa: E402,F403

FOIN = "#facc15"
KAKI = "#4d7c0f"
PELAGE, TACHE = "#f59e0b", "#92400e"


def soigneur(s=1.0):
    """Tom : tenue kaki, casquette, un seau à la main."""
    p = personne(peau=PEAUX[2], tenue=KAKI, cheveux="#422006")
    casq = VGroup(AnnularSector(inner_radius=0, outer_radius=0.47, angle=PI, start_angle=0, fill_color=KAKI,
                                fill_opacity=1, stroke_width=0),
                  RoundedRectangle(width=0.55, height=0.1, corner_radius=0.04, fill_color="#365314", fill_opacity=1,
                                   stroke_width=0).move_to(P(0.4, 0))).move_to(P(0.1, 0.38))
    seau = Polygon(P(0.55, -1.05), P(1.0, -1.05), P(0.92, -1.5), P(0.63, -1.5), fill_color="#94a3b8",
                   fill_opacity=1, stroke_color="#475569", stroke_width=3)
    p.add(casq, seau)
    return p.scale(s)


def girafe(s=1.0):
    """Une girafe stylisée : corps, long cou, tête, taches."""
    corps = Ellipse(width=1.6, height=0.8, fill_color=PELAGE, fill_opacity=1, stroke_width=0)
    pattes = VGroup(*[Rectangle(width=0.14, height=0.9, fill_color=PELAGE, fill_opacity=1, stroke_width=0)
                      .move_to(P(x, -0.7)) for x in (-0.55, -0.3, 0.35, 0.6)])
    cou = Polygon(P(0.45, 0.2), P(0.75, 0.25), P(1.0, 1.7), P(0.78, 1.75), fill_color=PELAGE, fill_opacity=1,
                  stroke_width=0)
    tete = Ellipse(width=0.62, height=0.3, fill_color=PELAGE, fill_opacity=1, stroke_width=0).move_to(P(1.05, 1.8))
    cornes = VGroup(*[Line(P(x, 1.9), P(x, 2.15), color=TACHE, stroke_width=5) for x in (0.85, 0.98)])
    oeil = Dot(P(1.15, 1.85), radius=0.04, color="#111827")
    taches = VGroup(*[Circle(radius=r, fill_color=TACHE, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                      for x, y, r in ((-0.4, 0.1, 0.12), (0.0, -0.1, 0.1), (0.35, 0.15, 0.09), (-0.15, 0.25, 0.07),
                                      (0.7, 0.8, 0.07), (0.82, 1.3, 0.06))])
    return VGroup(pattes, corps, cou, tete, cornes, oeil, taches).scale(s)


def zebre(s=1.0):
    """Un zèbre stylisé : corps blanc à rayures noires."""
    corps = Ellipse(width=1.5, height=0.75, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    pattes = VGroup(*[Rectangle(width=0.13, height=0.7, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                      .move_to(P(x, -0.6)) for x in (-0.5, -0.28, 0.3, 0.52)])
    cou = Polygon(P(0.45, 0.1), P(0.75, 0.2), P(1.05, 0.75), P(0.8, 0.85), fill_color=WHITE, fill_opacity=1,
                  stroke_width=0)
    tete = Ellipse(width=0.6, height=0.3, fill_color=WHITE, fill_opacity=1, stroke_width=0).rotate(-0.6)
    tete.move_to(P(1.1, 0.65))
    rayures = VGroup(*[Line(P(x, 0.35), P(x - 0.1, -0.35), color="#111827", stroke_width=6)
                       for x in (-0.5, -0.25, 0.0, 0.25, 0.5)])
    criniere = Line(P(0.5, 0.25), P(0.85, 0.85), color="#111827", stroke_width=6)
    return VGroup(pattes, corps, cou, tete, rayures, criniere).scale(s)


class FracEgaleBase(PaysageG):
    nom_voix = "5e-frac-egale"
    fichier_marques = "frac_egale_marques.json"

    def botte(self, n, k, centre=P(-3.2, 2.0), largeur=5.6, couleur=FOIN):
        return Barre(n, k, largeur=largeur, hauteur=0.8, couleur=couleur, centre=centre)

    def eq(self, a, b, c, d, y=-1.1, x=-3.2, fs=84, signe="=", c2=WHITE):
        f, g = EcritureFraction(a, b, fs=fs), EcritureFraction(c, d, fs=fs, couleur=c2)
        e = egalite(f, g, signe=signe, buff=1.2).move_to(P(x, y))
        return f, g, e

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Des fractions égales", self.identite, self.ceinture, y_ech=-2.7)
        b1 = Barre(4, 3, largeur=4.4, hauteur=0.55, couleur=FOIN, centre=P(-0.8, 0.75))
        b2 = Barre(8, 6, largeur=4.4, hauteur=0.55, couleur=FOIN, centre=P(-0.8, -0.65))
        self.au_mot("Des fractions")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("deux fractions")
        self.play(b1.apparaitre(0.9), b2.apparaitre(0.9))
        self.au_mot("la même quantité")
        q = self.t("?", 90, AMBRE).next_to(VGroup(b1, b2), RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), Create(b1.fin_coloriee(vers=-1.95)), run_time=0.6)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Tom, soigneur ──────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers, nom, met = self.personnage(soigneur(1.0), "Tom", ["soigneur", "animalier"], x=-5.4, y=-0.5)
        self.au_mot("Voici Tom")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("soigneur")
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        gi = girafe(1.0).move_to(P(-2.4, -0.2))
        self.au_mot("la girafe")
        self.play(FadeIn(gi, shift=UP * 0.3), run_time=0.6)
        b = Barre(4, 3, largeur=4.8, hauteur=0.7, couleur=FOIN, centre=P(3.6, 1.25))
        self.L([(EcritureFraction(3, 4, fs=52), WHITE, "mange 3"), ("d'une botte", WHITE, "d'une botte")], 2.55,
               avec={1: [b.apparaitre()]})
        self.L([("coupée en", WHITE, "coupée en"), ("8 tranches", AMBRE, "en 8")], 0.15)
        self.au_mot("Combien de tranches")
        q = self.col(self.t("Combien de tranches ?", 38, ORANGE_RETENUE), -0.7)
        q.sans_synchro = True
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.L([(EcritureFraction(3, 4, fs=60), WHITE, ("3 quarts, est-ce", 1)), ("=", WHITE, None),
                (EcritureFraction(6, 8, fs=60), WHITE, "est-ce 6"), ("?", ORANGE_RETENUE, None)], -2.0)
        self.attendre_voix()

    # ── 02 : couper chaque quart en 2 ───────────────────────────────────────
    def ecran_couper(self):
        self.ecran("02-couper")
        b = self.botte(4, 3)
        self.add(b)
        self.au_mot("On coupe")
        b8, anim = b.repartager(2, run_time=1.2)
        self.L([("chaque quart", WHITE, "chaque quart"), ("coupé en 2", AMBRE, "en 2")], 2.5, avec={1: [anim]})
        self.L([("4 quarts", WHITE, "Les 4"), ("→ 8 huitièmes", BLEU_CALCUL, "deviennent 8")], 1.6)
        self.L([("3 quarts", FOIN, "Les 3"), ("→ 6 huitièmes", FOIN, "deviennent 6")], 0.7,
               avec={1: [Indicate(VGroup(*b8.parts[:6]), color=WHITE)]})
        self.au_mot("ne change pas")
        self.play(Create(b8.fin_coloriee(vers=-0.4)), run_time=0.6)
        f, g, e = self.eq(3, 4, 6, 8)
        haut, bas = fleches(f, g, "× 2", fs=38, angle=TAU / 7)
        self.au_nb("pas : 3")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_nb("égale 6")
        self.play(FadeIn(e[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_nb("bas par 2")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.6)
        self.play(Create(self.encadrer(VGroup(e, haut, bas), buff=0.12)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la règle ───────────────────────────────────────────────────────
    def ecran_regle(self):
        self.ecran("03-regle")
        self.au_mot("la règle")
        self.titre("La règle des fractions égales", fs=44, centre=True)
        r1 = self.morceaux([("On multiplie", WHITE, "On multiplie"), ("(ou on divise)", WHITE, "ou on divise")], fs=36)
        r2 = self.morceaux([("le numérateur", AMBRE, "le numérateur"), ("ET le dénominateur", AMBRE, "et le dén")],
                           fs=36)
        r3 = self.morceaux([("par le même nombre.", VERT_OK, "le même nombre")], fs=36)
        VGroup(r1, r2, r3).arrange(DOWN, buff=0.22).move_to(P(0, 1.35))
        for r in (r1, r2, r3):
            self.jouer(r)
        self.play(Create(self.encadrer(VGroup(r1, r2, r3), buff=0.25)), run_time=0.5)
        b = Barre(5, 3, largeur=5.0, hauteur=0.7, couleur=VERT_PART, centre=P(-3.4, -1.65))
        f, g, e = self.eq(3, 5, 6, 10, y=-1.65, x=3.0, fs=62)
        haut, bas = fleches(f, g, "× 2", fs=34, angle=TAU / 10)
        self.au_nb("exemple, 3")
        self.play(FadeIn(f, scale=1.2), b.apparaitre(0.6), run_time=0.6)
        self.au_nb("fois 2")
        b10, anim = b.repartager(2, run_time=0.9)
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), anim, run_time=0.9)
        self.au_nb("égale 6")
        self.play(FadeIn(e[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (2/3 = ?/12) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f, g, e = self.eq(2, 3, "?", 12, y=-0.35, x=-3.2, fs=90)
        haut, bas = fleches(f, g, "× 4", fs=42)
        b3 = Barre(3, 2, largeur=5.0, hauteur=0.55, couleur=VERT_PART, centre=P(-3.2, 2.75))

        def avant(sc):
            sc.au_nb("Question ! 2")
            sc.q_tete(FadeIn(f, scale=1.2), FadeIn(e[1]), b3.apparaitre(0.5))
            sc.au_nb("combien de douzièmes", cible="douzièmes")
            sc.play(FadeIn(g, scale=1.2), run_time=0.35)

        def apres(sc):
            huit = g.chiffre(8)
            sc.rep_mots(0, [("3 ×", None, "Réponse A. 3"), ("4 =", None, "3 fois 4"), ("12", None, "égale 12")],
                        avec={1: [Create(bas[0]), FadeIn(bas[1])]})
            b12, anim = b3.repartager(4, run_time=0.8)
            sc.rep_mots(1, [("donc 2 ×", None, "donc 2"), ("4 =", None, "2 fois 4"), ("8", None, "égale 8")],
                        avec={1: [Create(haut[0]), FadeIn(haut[1])], 2: [FadeOut(g.num), FadeIn(huit, scale=1.3), anim]})
            sc.rep_mots(2, [("11 :", None, "Avec 11"), ("on a ajouté 9.", None, "ajouté 9")])
            sc.fin_rep()

        self.question_pause("04-question", "04b-reponse", ["2/3 = combien de douzièmes ?"],
                            [self.inline("8"), self.inline("11"), self.inline("2")], 0,
                            ["3 × 4 = 12", "donc 2 × 4 = 8", "11 : on a ajouté 9."], avant_q=avant, autres_r=apres)

    # ── 05 : deux fractions qui ne sont PAS égales ──────────────────────────
    def ecran_pas_egales(self):
        self.ecran("05-pas-egales")
        b3 = Barre(3, 2, largeur=5.4, hauteur=0.7, couleur=VERT_PART, centre=P(-3.2, 1.7))
        b5 = Barre(5, 4, largeur=5.4, hauteur=0.7, couleur=ORANGE_PART, centre=P(-3.2, 0.3))
        f, g, e = self.eq(2, 3, 4, 5, y=-1.7, signe="≠", fs=80)
        e[1].set_opacity(0)
        self.au_nb("Et 2")
        self.play(FadeIn(f, scale=1.2), b3.apparaitre(0.6), run_time=0.6)
        self.au_nb("et 4")
        self.play(FadeIn(g, scale=1.2), b5.apparaitre(0.6), run_time=0.6)
        haut, _ = fleches(f, g, "× 2", fs=36, bas="", angle=TAU / 7)
        self.L([("2 → 4 :", WHITE, "De 2 à 4"), ("× 2", AMBRE, "multiplie par 2")], 2.4,
               avec={1: [Create(haut[0]), FadeIn(haut[1])]})
        self.L([("mais 3 ×", WHITE, "Mais 3"), ("2 =", WHITE, "3 fois 2"), ("6", AMBRE, "égale 6"),
                ("pas 5 !", ROUGE_ERREUR, "pas 5")], 1.5)
        self.au_mot("les longueurs")
        self.play(Create(b3.fin_coloriee(vers=-1.0)), Create(b5.fin_coloriee(vers=-0.3)), run_time=0.7)
        self.au_mot("pas égales")
        e[1].set_opacity(1).set_color(ROUGE_ERREUR)
        self.play(FadeIn(e[1], scale=1.5), run_time=0.4)
        r = self.col(self.t("pas égales !", 44, ROUGE_ERREUR), 0.3)
        r.sans_synchro = True
        self.play(FadeIn(r, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 06 : vérifier avec le même dénominateur ─────────────────────────────
    def ecran_meme_den(self):
        self.ecran("06-meme-den")
        self.au_mot("même dénominateur")
        self.titre("Vérifier : même dénominateur", fs=42, centre=True)
        b4 = Barre(4, 3, largeur=5.4, hauteur=0.6, couleur=FOIN, centre=P(-3.2, 2.0))
        b12 = Barre(12, 9, largeur=5.4, hauteur=0.6, couleur=FOIN, centre=P(-3.2, 0.9))
        f, g, e = self.eq(3, 4, 9, 12, y=-1.6, fs=62)
        haut, bas = fleches(f, g, "× 3", fs=36, angle=TAU / 7)
        self.au_nb("dénominateur. 3")
        self.play(FadeIn(f, scale=1.2), b4.apparaitre(0.6), run_time=0.6)
        self.au_nb("et 9")
        self.play(FadeIn(g, scale=1.2), b12.apparaitre(0.6), run_time=0.6)
        self.L([("4 ×", WHITE, "douzièmes : 4"), ("3 =", WHITE, "4 fois 3"), ("12", WHITE, "égale 12")], 1.9,
               avec={1: [Create(bas[0]), FadeIn(bas[1])]})
        self.L([("3 ×", WHITE, "et 3"), ("3 =", WHITE, ("3 fois 3", 1)), ("9", WHITE, "égale 9")], 1.0,
               avec={1: [Create(haut[0]), FadeIn(haut[1])]})
        self.au_mot("Donc 3")
        self.play(FadeIn(e[1], scale=1.4), Create(b4.fin_coloriee(vers=-1.0)), run_time=0.6)
        self.au_mot("elles sont égales")
        r = self.col(self.t("égales !", 48, VERT_OK), -0.1)
        r.sans_synchro = True
        self.play(FadeIn(r, scale=1.3), Create(self.encadrer(e)), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (laquelle est égale à 4/5 ?) ────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b5 = Barre(5, 4, largeur=5.0, hauteur=0.7, couleur=ORANGE_PART, centre=P(-3.3, 1.2))
        f = EcritureFraction(4, 5, fs=96).move_to(P(-3.3, -0.9))

        def avant(sc):
            sc.au_nb("égale à 4")
            sc.q_tete(FadeIn(f, scale=1.2), b5.apparaitre(0.6))

        def apres(sc):
            b10, anim = b5.repartager(2, run_time=0.8)
            sc.rep_mots(0, [("4 ×", None, "Réponse C. 4"), ("2 =", None, "4 fois 2"), ("8", None, ("égale 8", 1)),
                            ("et 5 ×", None, "et 5"), ("2 =", None, "5 fois 2"), ("10", None, "égale 10")],
                        avec={5: [anim]})
            sc.rep_mots(1, [("5/6 :", None, "Avec 5"), ("on a ajouté 1.", None, "ajouté 1")])
            sc.rep_mots(2, [("8/5 :", None, "Avec 8"), ("seul le haut a changé.", None, "seul le haut")])
            sc.fin_rep()

        self.question_pause("07-question", "07b-reponse", ["Laquelle est égale à 4/5 ?"],
                            [self.inline("5/6"), self.inline("8/5"), self.inline("8/10")], 2,
                            ["4 × 2 = 8 et 5 × 2 = 10", "5/6 : on a ajouté 1.", "8/5 : seul le haut a changé."],
                            avant_q=avant, autres_r=apres)

    # ── 08 : diviser, c'est simplifier (et le piège) ────────────────────────
    def ecran_diviser(self):
        self.ecran("08-diviser")
        b16 = Barre(16, 12, largeur=5.4, hauteur=0.6, couleur=FOIN, centre=P(-3.2, 2.45))
        f, g, e = self.eq(12, 16, 3, 4, y=0.2, fs=64)
        haut, bas = fleches(f, g, "÷ 4", fs=30, angle=TAU / 10)
        self.au_mot("en divisant")
        self.titre("En divisant", fs=44)
        self.au_nb("divisant. 12")
        self.play(FadeIn(f, scale=1.2), b16.apparaitre(0.6), run_time=0.6)
        self.au_nb("divisé par 4")
        gr = b16.groupes(4)
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), Create(gr), run_time=0.6)
        b4, anim = b16.regrouper(4, run_time=0.9)
        self.au_nb("égale 3")
        self.play(FadeIn(e[1]), FadeIn(g, scale=1.3), anim, FadeOut(gr), run_time=0.9)
        self.au_mot("C'est simplifier")
        r = self.col(self.t("C'est simplifier !", 40, VERT_OK), 2.2)
        r.sans_synchro = True
        self.play(FadeIn(r, scale=1.2), run_time=0.4)
        f2 = EcritureFraction(12, 16, fs=50)
        g2 = EcritureFraction(3, 7, fs=50, couleur=ROUGE_ERREUR)
        e2 = egalite(f2, g2, signe="→", buff=0.8).move_to(P(3.0, -0.4))
        h2, bb2 = fleches(f2, g2, "− 9", couleur=ROUGE_ERREUR, fs=28, angle=TAU / 14)
        b7 = Barre(7, 3, largeur=5.4, hauteur=0.55, couleur=ROUGE_COACH, centre=P(-3.2, -2.45))
        self.L([("on ne soustrait jamais", ROUGE_ERREUR, "on ne soustrait")], 1.3, fs=36)
        self.au_nb("jamais : 12")
        self.play(FadeIn(f2, scale=1.1), run_time=0.35)
        self.au_nb("moins 9")
        self.play(Create(h2[0]), FadeIn(h2[1]), run_time=0.4)
        self.au_nb("moins 9", n=2)
        self.play(Create(bb2[0]), FadeIn(bb2[1]), run_time=0.4)
        self.au_nb("donnent 3")
        self.play(FadeIn(e2[1]), FadeIn(g2, scale=1.3), b7.apparaitre(0.6), run_time=0.6)
        self.au_mot("Faux")
        x = b4.x_trait(3)
        self.play(Create(croix(g2, sw=5)), Create(DashedLine(P(x, -1.95), P(x, -2.95), color=AMBRE, stroke_width=5,
                                                             dash_length=0.12)), run_time=0.5)
        self.attendre_voix()

    # ── 09 : QUESTION 3 (vrai ou faux : 10/15 = 2/3) ────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        f, g, e = self.eq(10, 15, 2, 3, y=0.3, x=-3.2, fs=90)
        e[1].set_color(AMBRE)
        q = self.t("?", 60, AMBRE).next_to(e[1], UP, buff=0.1)
        haut, bas = fleches(f, g, "÷ 5", fs=40)

        def avant(sc):
            sc.au_mot("Vrai ou faux")
            sc.q_tete()
            sc.au_nb("faux : 10")
            sc.play(FadeIn(f, scale=1.2), FadeIn(e[1]), FadeIn(q), run_time=0.4)
            sc.au_nb("égale 2")
            sc.play(FadeIn(g, scale=1.2), run_time=0.35)

        def apres(sc):
            sc.rep_mots(0, [("10 ÷", None, "Réponse A. 10"), ("5 =", None, ("divisé par 5", 1)), ("2", None, "égale 2"),
                            ("et 15 ÷", None, "et 15"), ("5 =", None, ("divisé par 5", 2)), ("3", None, "égale 3")],
                        avec={1: [Create(haut[0]), FadeIn(haut[1])], 4: [Create(bas[0]), FadeIn(bas[1])]})
            sc.rep_mots(1, [("10/15", None, "Donc 10"), ("= 2/3 : vrai !", None, "bien 2")],
                        avec=[FadeOut(q), e[1].animate.set_color(VERT_OK)])
            sc.fin_rep()

        self.question_pause("09-question", "09b-reponse", ["Vrai ou faux ?"],
                            [self.inline("vrai"), self.inline("faux"), self.inline("on ne peut pas savoir")], 0,
                            ["10 ÷ 5 = 2 et 15 ÷ 5 = 3", "10/15 = 2/3 : vrai !"], avant_q=avant, autres_r=apres)

    # ── 10 : défi (le zèbre) ────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        z = zebre(1.3).move_to(P(-3.6, 0.6))
        b = Barre(5, 2, largeur=5.0, hauteur=0.65, couleur=FOIN, centre=P(-3.4, -1.6))
        self.au_mot("Le zèbre")
        self.play(FadeIn(z, shift=UP * 0.3), run_time=0.5)
        self.L([("il mange", WHITE, "mange 2"), (EcritureFraction(2, 5, fs=52), WHITE, "mange 2"),
                ("d'une botte", WHITE, "d'une botte")], 2.0, avec={1: [b.apparaitre()]})
        self.L([("botte coupée en", WHITE, "coupée en"), ("20 tranches", AMBRE, "en 20")], 1.0)
        self.au_mot("Combien de tranches")
        l3 = self.col(self.t("Combien de tranches ?", 38, ORANGE_RETENUE), 0.1)
        l3.sans_synchro = True
        self.play(FadeIn(l3, scale=0.8), run_time=0.4)
        self.pause_defi(y=-0.9)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        self.titre("Correction", fs=50)
        b = Barre(5, 2, largeur=5.4, hauteur=0.7, couleur=FOIN, centre=P(-3.3, 2.3))
        self.add(b)
        f, g, e = self.eq(2, 5, 8, 20, y=-0.65, x=-3.3, fs=76, c2=VERT_OK)
        haut, bas = fleches(f, g, "× 4", fs=36, angle=TAU / 7)
        self.add(f)
        self.L([("5 ×", WHITE, "Correction. 5"), ("4 =", WHITE, ("5 fois 4", 1)), ("20", WHITE, "égale 20")], 2.0,
               avec={1: [Create(bas[0]), FadeIn(bas[1])]})
        b20, anim = b.repartager(4, run_time=0.9)
        self.L([("× 4 en haut et en bas", AMBRE, "multiplie par 4")], 1.2, fs=36, avec=[anim])
        self.L([("2 ×", WHITE, "bas. 2"), ("4 =", WHITE, "2 fois 4"), ("8", WHITE, "égale 8")], 0.4,
               avec={1: [Create(haut[0]), FadeIn(haut[1])]})
        self.au_nb("égale 8 vingt")
        self.play(FadeIn(e[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.L([("8 tranches", VERT_OK, "il faut 8")], -0.45, fs=44, avec=[Create(self.encadrer(g))])
        self.L([("2 ÷", BLEU_CALCUL, "c'est 2"), ("5 =", BLEU_CALCUL, "divisé par 5"), ("0,4", BLEU_CALCUL, "égale 0,4")],
               -1.5, fs=44)
        self.L([("= 40 %", VERT_OK, "soit 40")], -2.4, fs=44)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        ba = Barre(4, 3, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, couleur=FOIN, centre=P(-3.6, 0.8))
        bb = Barre(8, 6, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, couleur=FOIN, centre=P(-3.6, -1.4))
        tir = ba.fin_coloriee(vers=-(ba.contour.get_bottom()[1] - bb.contour.get_bottom()[1]) - 0.2)
        fig = VGroup(ba, bb, tir)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Fractions égales :", "la même quantité."),
                                                         ("× ou ÷ le numérateur ET", "le dénominateur"),
                                                         ("par le même nombre.",),
                                                         ("Jamais + ni − !",)], fs=36)
        self.montrer2(lignes[0], "Deux fractions", "la même quantité")
        self.montrer2(lignes[1], "On multiplie", "le dénominateur")
        self.montrer2(lignes[2], "par le même nombre")
        self.montrer2(lignes[3], "On n'ajoute pas")
        lignes[3][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_couper()
        self.ecran_regle()
        self.ecran_question1()
        self.ecran_pas_egales()
        self.ecran_meme_den()
        self.ecran_question2()
        self.ecran_diviser()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracEgale5e(FracEgaleBase):
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
