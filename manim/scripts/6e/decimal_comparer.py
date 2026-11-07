# decimal_comparer.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 03 : COMPARER DES DÉCIMAUX
# (micro decimal_comparer, notion decimal_nombre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux-comparer.js, les bouteilles de jus).
# Décor et métier : Sofia, BIOLOGISTE MARINE, mesure des tortues (centre : animaux-marins).
# Écrans : garde (00), situation (01), piège (02), méthode (03), le zéro (04), QUESTION 1 (05),
# les unités d'abord (06), ranger (07), QUESTION 2 (08), défi (09) et correction (09b),
# appris (10), fin (11).
# Voix : manim/voix/6e-decimal-comparer.json (Julie, débit −6) ; marques : decimal_comparer_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_comparer.py DecimalComparer6e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_comparer.py DecimalComparer6e -o eleveai-maths-6e-decimal-comparer --media_dir manim/scripts/6e/media-dec-03
# Sortie : manim/sorties/6e/maths/decimaux/03-comparer/eleveai-maths-6e-decimal-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403

VERT_D = "#34d399"
COUL_RANGS = {"Dizaines": VERT_D, "Unités": BLEU_D, "Dixièmes": AMBRE_D, "Centièmes": ROSE_D, "Millièmes": VIOLET_D}
R3 = ("Unités", "Dixièmes", "Centièmes")
R4 = ("Unités", "Dixièmes", "Centièmes", "Millièmes")
MER = "#0e7490"


def tortue(s=1.0, couleur="#16a34a", carapace="#15803d"):
    """Une tortue de mer vue de dessus, la tête à droite."""
    nag = VGroup()
    for (x, y, a) in ((0.42, 0.42, 0.6), (0.42, -0.42, -0.6), (-0.45, 0.32, 2.4), (-0.45, -0.32, -2.4)):
        e = Ellipse(width=0.62 * s if x > 0 else 0.36 * s, height=0.2 * s, fill_color=couleur, fill_opacity=1,
                    stroke_width=0).rotate(a).move_to(P(x * s, y * s))
        nag.add(e)
    tete = Ellipse(width=0.34 * s, height=0.26 * s, fill_color=couleur, fill_opacity=1, stroke_width=0) \
        .move_to(P(0.68 * s, 0))
    oeil = VGroup(Dot(P(0.74 * s, 0.06 * s), radius=0.035 * s, color="#0f172a"),
                  Dot(P(0.74 * s, -0.06 * s), radius=0.035 * s, color="#0f172a"))
    cara = Ellipse(width=1.15 * s, height=0.85 * s, fill_color=carapace, fill_opacity=1, stroke_color="#14532d",
                   stroke_width=4 * s)
    motifs = VGroup(RegularPolygon(6, radius=0.17 * s, fill_color="#4ade80", fill_opacity=0.55, stroke_width=0),
                    *[RegularPolygon(6, radius=0.11 * s, fill_color="#4ade80", fill_opacity=0.45, stroke_width=0)
                      .move_to(P(0.3 * s * np.cos(a), 0.22 * s * np.sin(a))) for a in np.linspace(0, TAU, 6, endpoint=False)])
    return VGroup(nag, tete, oeil, cara, motifs)


def sofia(s=1.0):
    """Sofia, biologiste marine : combinaison, masque relevé sur le front."""
    p = visage(personne(peau="#d4a373", tenue="#0d9488", cheveux="#3f1d0b", longs=True, s=s))
    t = p.tete.get_center()
    masque = RoundedRectangle(width=0.62 * s, height=0.2 * s, corner_radius=0.08 * s, fill_color="#bae6fd",
                              fill_opacity=0.9, stroke_color="#0369a1", stroke_width=4).move_to(t + P(0, 0.36 * s))
    p.add(masque)
    return p


def lignes_num(rangs, valeurs, larg=1.6, h=0.9, fs_ent=24, buff=0.14, place=None):
    """Plusieurs nombres dans le même tableau : une rangée de cases par nombre, les entêtes
    sur la première seulement. valeurs : une liste de chaînes « 0,65 » (rang des unités en tête).
    Renvoie (groupe, rangées, chiffres) ; chiffres[k][i] = le chiffre (non ajouté) du nombre k au rang i, ou None."""
    rangees = []
    for k in range(len(valeurs)):
        tb = TableauNum(rangs, larg=larg, h=h, fs_ent=fs_ent, couleurs=COUL_RANGS)
        if k:
            tb.remove(tb.entetes)
        rangees.append(tb)
    g = VGroup(*rangees).arrange(DOWN, buff=buff)
    if place is not None:  # placé AVANT d'écrire les chiffres : ils se posent dans leurs cases
        place(g, rangees)
    chiffres = []
    for tb, v in zip(rangees, valeurs):
        u, d = v.split(",")
        cs = [tb.chiffre(0, u, COUL_RANGS[rangs[0]])] + [tb.chiffre(i + 1, c, COUL_RANGS[rangs[i + 1]])
                                                        for i, c in enumerate(d)]
        cs += [None] * (len(rangs) - len(cs))
        chiffres.append(cs)
    return g, rangees, chiffres


def libre(m):
    """Le texte paraît à son mot (au_mot), sans attendre ses derniers mots : un nombre en tête
    de ligne (« 70 centièmes ») serait sinon écrit en retard. Il reste audité."""
    for f in m.get_family():
        f.sans_synchro = True
    return m


def colonne(rangees, i):
    return VGroup(*[r.cases[i] for r in rangees])


class DecimalComparerBase(PaysageDecimal):
    nom_voix = "6e-decimal-comparer"
    fichier_marques = "decimal_comparer_marques.json"

    def montrer(self, chiffres, k, **kw):
        return [FadeIn(c, scale=1.5) for c in chiffres[k] if c is not None]

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des nombres décimaux", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        t1 = tortue(1.5).move_to(P(1.6, 0.4))
        t2 = tortue(1.25, couleur="#65a30d", carapace="#4d7c0f").move_to(P(4.4, 0.4))
        q = self.bloc(["Lequel est", "le plus grand ?"], 44).move_to(P(-3.8, 0.35))
        self.au_mot("Comment savoir")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(t1, shift=RIGHT * 0.3), FadeIn(t2, shift=RIGHT * 0.3), run_time=0.4)
        self.play(t1.animate.shift(RIGHT * 0.15), t2.animate.shift(RIGHT * 0.15), run_time=0.9, rate_func=there_and_back)
        self.attendre_voix(marge=0.6)

    # ── 01 : Sofia, biologiste marine ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        so = sofia(1.05).move_to(P(-5.3, 0.3))
        self.au_mot("Voici Sofia")
        nom = self.t("Sofia", 44, BLEU_CALCUL).next_to(so, UP, buff=0.2)
        self.play(FadeIn(so, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("biologiste marine")
        met = self.bloc(["biologiste", "marine"], 30, BLEU_CALCUL).next_to(so, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Elle mesure")
        l0 = self.t("Elle mesure des tortues de mer.", 34)
        self.col(l0, 2.75, xl=-3.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        tp = tortue(1.7).move_to(P(-1.9, 1.15))
        tc = tortue(1.58, couleur="#ea580c", carapace="#c2410c").move_to(P(-1.95, -1.35))
        self.au_mot("La tortue Perle")
        lp = self.ligne([("Perle :", VERT_D), ("0,7 m", WHITE)], 42, buff=0.25)
        self.col(lp, 1.15, xl=0.6)
        self.play(FadeIn(tp, shift=RIGHT * 0.4), FadeIn(lp[0]), run_time=0.4)
        self.au_mot("0,7 mètre")
        self.play(FadeIn(lp[1], scale=1.3), run_time=0.3)
        self.au_mot("La tortue Corail")
        lc = self.ligne([("Corail :", "#fb923c"), ("0,65 m", WHITE)], 42, buff=0.25)
        self.col(lc, -0.15, xl=0.6)
        self.play(FadeIn(tc, shift=RIGHT * 0.4), FadeIn(lc[0]), run_time=0.4)
        self.au_mot("0,65 mètre")
        self.play(FadeIn(lc[1], scale=1.3), run_time=0.3)
        self.au_mot("Laquelle")
        q = self.bloc(["Laquelle est", "la plus grande ?"], 40, JAUNE_TITRE)
        self.col(q, -1.4, xl=0.6)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 02 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("02-piege")
        a = hors_audit(self.ligne([("0,", WHITE), ("7", AMBRE_D)], 80, buff=0.04))
        b = hors_audit(self.ligne([("0,", WHITE), ("65", ROSE_D)], 80, buff=0.04))
        VGroup(a, b).arrange(DOWN, buff=0.6, aligned_edge=LEFT).move_to(P(-3.9, 0.6))
        self.add(a, b)
        self.au_mot("Beaucoup pensent")
        l0 = self.t("Beaucoup pensent :", 36, BLEU_CALCUL)
        self.col(l0, 2.7, xl=0.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        lg = self.ligne([("65", ROSE_D), ("est plus grand que", WHITE), ("7,", AMBRE_D)], 36, buff=0.16)
        self.col(lg, 1.9, xl=0.2)
        self.au_mot("65 est")
        self.play(FadeIn(lg[0], scale=1.2), Indicate(b[1], color=ROSE_D, scale_factor=1.3), run_time=0.35)
        self.play(FadeIn(lg[1]), run_time=0.25)
        self.au_mot("que 7")
        self.play(FadeIn(lg[2], scale=1.2), Indicate(a[1], color=AMBRE_D, scale_factor=1.3), run_time=0.35)
        self.au_mot("donc Corail")
        l2 = self.t("donc Corail est plus grande.", 36)
        self.col(l2, 1.15, xl=0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("C'est faux")
        fx = self.t("C'est faux !", 54, ROUGE_ERREUR)
        self.col(fx, 0.05, xl=0.9)
        self.play(FadeIn(fx, scale=1.3), Create(croix(VGroup(lg, l2), sw=6)), run_time=0.4)
        self.insister(fx, 1.2, 0.2)
        self.au_mot("Après la virgule")
        l3 = self.bloc(["Après la virgule,", "on ne compare pas", "comme des entiers."], 36, JAUNE_TITRE)
        self.col(l3, -1.55, xl=0.2)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("on ne compare pas")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("comme des entiers")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 03 : la méthode, rang par rang ──────────────────────────────────────
    def ecran_methode(self):
        self.ecran("03-methode")
        noms = VGroup()

        def place(g, rg):
            g.move_to(P(-3.6, 0.9))
            noms.add(self.t("Perle", 28, VERT_D).next_to(rg[0], LEFT, buff=0.15),
                     self.t("Corail", 28, "#fb923c").next_to(rg[1], LEFT, buff=0.15))
            g.add(noms)
            self.cadrer(g, droite=-0.4, haut=2.6, bas=-0.9)

        g, rg, ch = lignes_num(R3, ["0,7", "0,65"], larg=1.75, h=0.95, place=place)
        self.au_mot("On compare")
        l0 = self.bloc(["Rang par rang,", "en partant de la gauche."], 34)
        self.col(l0, 2.6, xl=0.4)
        self.play(FadeIn(g[0]), FadeIn(g[1]), FadeIn(noms), *self.montrer(ch, 0), *self.montrer(ch, 1),
                  FadeIn(l0[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("en partant")
        fl = Arrow(P(-6.0, -1.3), P(-1.2, -1.3), color=JAUNE_TITRE, buff=0, stroke_width=6)
        self.play(FadeIn(l0[1], shift=UP * 0.1), GrowArrow(fl), run_time=0.45)
        self.au_mot("Les unités")
        lu = self.ligne([("Unités :", BLEU_D), ("0 et 0,", WHITE), ("égalité.", WHITE)], 34, buff=0.16)
        self.col(lu, 1.45, xl=0.4)
        cad_u = SurroundingRectangle(colonne(rg, 0), color=BLEU_D, buff=0.06, stroke_width=6)
        self.play(FadeIn(lu[0], shift=UP * 0.1), Create(cad_u), run_time=0.35)
        self.au_mot("0 et 0")
        self.play(FadeIn(lu[1]), run_time=0.3)
        self.au_mot("égalité")
        self.play(FadeIn(lu[2]), run_time=0.3)
        self.au_mot("Les dixièmes")
        ld = self.ligne([("Dixièmes :", AMBRE_D), ("7 et 6.", WHITE)], 34, buff=0.16)
        self.col(ld, 0.75, xl=0.4)
        cad_d = SurroundingRectangle(colonne(rg, 1), color=AMBRE_D, buff=0.06, stroke_width=6)
        self.play(FadeIn(ld[0], shift=UP * 0.1), ReplacementTransform(cad_u, cad_d), run_time=0.35)
        self.au_mot("7 et 6")
        self.play(FadeIn(ld[1]), run_time=0.3)
        self.au_mot("7 est plus grand")
        l7 = libre(self.t("7 est plus grand.", 34, VERT_OK))
        self.col(l7, 0.05, xl=0.4)
        self.play(FadeIn(l7, shift=UP * 0.1), Indicate(ch[0][1], color=VERT_OK, scale_factor=1.8), run_time=0.4)
        self.au_mot("Donc 0,7")
        r = self.ligne([("Donc", WHITE), ("0,7", VERT_D), (">", WHITE), ("0,65", "#fb923c")], 44, buff=0.22)
        self.col(r, -0.85, xl=0.4)
        self.play(FadeIn(r[0]), FadeIn(r[1], scale=1.3), run_time=0.3)
        self.au_mot("plus grand que 0,65")
        self.play(FadeIn(r[2], scale=1.3), run_time=0.25)
        self.au_mot("0,65.")
        self.play(FadeIn(r[3], scale=1.3), run_time=0.3)
        self.au_mot("Perle est")
        lp = self.t("Perle est la plus grande !", 36, VERT_D)
        self.col(lp, -1.65, xl=0.4)
        self.play(FadeIn(lp, scale=1.15), Indicate(noms[0], color=VERT_D, scale_factor=1.4), run_time=0.4)
        self.attendre_voix()

    # ── 04 : le zéro à la fin ───────────────────────────────────────────────
    def ecran_zero(self):
        self.ecran("04-zero")
        g, rg, ch = lignes_num(R3, ["0,7", "0,65"], larg=1.75, h=0.95, place=lambda g, r: g.move_to(P(-3.6, 0.6)))
        self.add(g, *[c for c in ch[0] + ch[1] if c is not None])
        zero = rg[0].chiffre(2, 0, ROSE_D)
        self.au_mot("Une astuce")
        tit = self.t("Une astuce :", 42, JAUNE_TITRE)
        self.col(tit, 2.75, xl=0.4)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.3)
        self.au_mot("un zéro à la fin")
        l1 = self.bloc(["un zéro à la fin", "ne change pas le nombre."], 34)
        self.col(l1, 1.75, xl=0.4)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ne change pas")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("0,7, c'est")
        eg = self.ligne([("0,7", VERT_D), ("=", WHITE), ("0,70", VERT_D)], 48, buff=0.25)
        self.col(eg, 0.6, xl=0.9)
        self.play(FadeIn(eg[0], scale=1.3), run_time=0.3)
        self.au_mot("0,70")
        self.play(FadeIn(eg[1]), FadeIn(eg[2], scale=1.3), FadeIn(zero, scale=2.2), run_time=0.4)
        lg = libre(VGroup(self.t("70 centièmes", 38, VERT_D), self.t("contre", 38),
                          self.t("65 centièmes :", 38, "#fb923c")))
        VGroup(lg[0], lg[1]).arrange(RIGHT, buff=0.2)
        lg[2].next_to(lg[0], DOWN, buff=0.15, aligned_edge=LEFT)
        self.col(lg, -0.55, xl=0.4)
        self.au_mot("70 centièmes")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.1), Indicate(VGroup(rg[0].cases[1], rg[0].cases[2]), color=VERT_D,
                                                                scale_factor=1.08), run_time=0.35)
        self.au_mot("65 centièmes")
        self.play(FadeIn(lg[1]), FadeIn(lg[2], shift=RIGHT * 0.1),
                  Indicate(VGroup(rg[1].cases[1], rg[1].cases[2]), color="#fb923c", scale_factor=1.08), run_time=0.35)
        self.au_mot("70 gagne")
        gg = libre(self.gros("70 gagne !", fs=54))
        self.col(gg, -1.75, xl=0.9)
        self.play(FadeIn(gg, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g, rg, ch = lignes_num(R4, ["0,45", "0,5", "0,405"], larg=1.45, h=0.85, fs_ent=24,
                               place=lambda g, r: g.move_to(P(-3.5, 0.75)))

        def avant(sc):
            sc.play(FadeIn(g), run_time=0.3)

        def apres(sc):
            sc.play(*[FadeIn(c, scale=1.4) for k in range(3) for c in ch[k] if c is not None], run_time=0.3)
            # l'explication sous le tableau, à gauche : sous les cartes, elle était trop petite
            lg = sc.ligne([("Au rang des dixièmes :", AMBRE_D), ("5", VERT_OK), ("contre 4.", WHITE)], 36, buff=0.18)
            lg.move_to(P(0, -1.75)).align_to(P(-6.3, 0), LEFT)
            l2 = libre(sc.t("0,5 gagne !", 40, VERT_OK))
            l2.move_to(P(0, -2.55)).align_to(P(-6.3, 0), LEFT)
            sc.au_mot("Au rang")
            cad = SurroundingRectangle(colonne(rg, 1), color=AMBRE_D, buff=0.06, stroke_width=6)
            sc.play(FadeIn(lg[0], shift=UP * 0.1), Create(cad), run_time=0.3)
            sc.au_mot("5 contre")
            sc.play(FadeIn(lg[1], scale=1.3), Indicate(ch[1][1], color=VERT_OK, scale_factor=1.8), run_time=0.3)
            sc.au_mot("contre 4")
            sc.play(FadeIn(lg[2]), run_time=0.3)
            sc.au_mot("0,5 gagne")
            sc.play(FadeIn(l2, scale=1.2), Indicate(rg[1], color=VERT_OK, scale_factor=1.05), run_time=0.35)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Quel nombre est", "le plus grand ?"],
                            [self.t("0,45", 36), self.t("0,5", 36), self.t("0,405", 36)], 1,
                            ["Au rang des dixièmes : 5 contre 4.", "0,5 gagne."], mot_q="Quel nombre",
                            avant_q=avant, autres_r=apres)

    # ── 06 : d'abord les unités ─────────────────────────────────────────────
    def ecran_unites(self):
        self.ecran("06-unites")
        g, rg, ch = lignes_num(R3, ["3,06", "2,9"], larg=1.75, h=0.95, place=lambda g, r: g.move_to(P(-3.6, 0.6)))
        self.au_mot("D'abord les unités")
        tit = self.t("D'abord les unités !", 44, BLEU_D)
        self.col(tit, 2.75, xl=0.2)
        self.play(FadeIn(tit, shift=UP * 0.1), FadeIn(g), run_time=0.35)
        lg = self.ligne([("3,06", WHITE), ("et", WHITE), ("2,9 :", WHITE)], 42, buff=0.22)
        self.col(lg, 1.8, xl=0.4)
        self.au_mot("3,06 et")
        self.play(FadeIn(lg[0], scale=1.2), *self.montrer(ch, 0), run_time=0.3)
        self.au_mot("2,9")
        self.play(FadeIn(lg[1]), FadeIn(lg[2], scale=1.2), *self.montrer(ch, 1), run_time=0.3)
        lu = self.ligne([("3 unités", BLEU_D), ("contre", WHITE), ("2.", BLEU_D)], 38, buff=0.18)
        self.col(lu, 0.9, xl=0.4)
        cad = SurroundingRectangle(colonne(rg, 0), color=BLEU_D, buff=0.06, stroke_width=6)
        self.au_mot("3 unités")
        self.play(FadeIn(lu[0], shift=RIGHT * 0.1), Create(cad), run_time=0.35)
        self.au_mot("contre 2")
        self.play(FadeIn(lu[1]), run_time=0.25)
        self.au_mot("2. 3,06")
        self.play(FadeIn(lu[2], scale=1.3), run_time=0.3)
        self.au_mot("3,06 est le plus grand")
        r = libre(self.t("3,06 est le plus grand,", 38, VERT_OK))
        self.col(r, -0.05, xl=0.4)
        self.play(FadeIn(r, scale=1.15), Indicate(ch[0][0], color=VERT_OK, scale_factor=1.8), run_time=0.4)
        self.au_mot("même avec")
        r2 = self.t("même avec son petit 0.", 36, AMBRE_D)
        self.col(r2, -0.8, xl=0.4)
        self.play(FadeIn(r2, shift=UP * 0.1), Indicate(ch[0][1], color=AMBRE_D, scale_factor=1.8), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ranger les tortues ─────────────────────────────────────────────
    def ecran_ranger(self):
        self.ecran("07-ranger")
        so = sofia(0.8).move_to(P(-5.6, 1.6))
        self.add(so)
        self.au_mot("Sofia range")
        l0 = self.bloc(["Sofia range trois tortues,", "de la plus petite à la plus grande :"], 34)
        self.col(l0, 2.55, xl=-4.4)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de la plus petite")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        tt = [tortue(1.3, couleur="#ea580c", carapace="#c2410c"), tortue(1.4), tortue(1.44, couleur="#0891b2",
                                                                                            carapace="#0e7490")]
        xs = (-4.2, -0.6, 3.0)
        for t, x in zip(tt, xs):
            t.move_to(P(x, 0.55))
        labs = [self.t(s, 40) for s in ("0,65 m", "0,7 m", "0,72 m")]
        for lb, x in zip(labs, xs):
            lb.move_to(P(x, -0.45))
        for k, (mot, n) in enumerate((("0,65, puis", 1), ("0,7, puis", 1), ("0,72.", 1))):
            self.au_mot(mot, n)
            self.play(FadeIn(tt[k], shift=UP * 0.3), FadeIn(labs[k], scale=1.2), run_time=0.35)
        r = self.ligne([("0,65", "#fb923c"), ("<", WHITE), ("0,7", VERT_D), ("<", WHITE), ("0,72", "#22d3ee")], 54,
                       buff=0.3)
        r.move_to(P(-0.6, -1.6))
        self.au_mot("0,65 est plus petit")
        self.play(FadeIn(r[0], scale=1.3), run_time=0.3)
        self.au_mot("plus petit que 0,7")
        self.play(FadeIn(r[1]), run_time=0.2)
        self.au_mot("0,7, qui")
        self.play(FadeIn(r[2], scale=1.3), run_time=0.3)
        self.au_mot("qui est plus petit")
        self.play(FadeIn(r[3]), run_time=0.2)
        self.au_mot("0,72.", 2)
        self.play(FadeIn(r[4], scale=1.3), run_time=0.3)
        lt = hors_audit(self.t("« < » : est plus petit que", 30, BLEU_CALCUL).next_to(r, DOWN, buff=0.35))
        self.play(FadeIn(lt, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        rangs = ("Dizaines", "Unités", "Dixièmes", "Centièmes")
        rg = []
        for k in range(2):
            tb = TableauNum(rangs, larg=1.4, h=0.9, fs_ent=22, virgule_apres=1, couleurs=COUL_RANGS)
            if k:
                tb.remove(tb.entetes)
            rg.append(tb)
        g = VGroup(*rg).arrange(DOWN, buff=0.14).move_to(P(-3.6, 0.75))
        ch = [[rg[0].chiffre(i, v, COUL_RANGS[rangs[i]]) for i, v in enumerate((1, 2, 1, 3))],
              [rg[1].chiffre(i, v, COUL_RANGS[rangs[i]]) for i, v in enumerate((1, 2, 2))]]

        def avant(sc):
            sc.play(FadeIn(g), run_time=0.3)

        def apres(sc):
            sc.play(*[FadeIn(c, scale=1.4) for k in range(2) for c in ch[k]], run_time=0.3)
            sc.au_mot("Les unités")
            cu = SurroundingRectangle(VGroup(rg[0].cases[0], rg[0].cases[1], rg[1].cases[0], rg[1].cases[1]),
                                      color=BLEU_D, buff=0.06, stroke_width=6)
            # l'explication sous le tableau, à gauche : sous les cartes, elle était trop petite
            X0 = -6.3
            l0 = sc.t("Les unités sont égales.", 34, BLEU_D).move_to(P(0, -1.05)).align_to(P(X0, 0), LEFT)
            lg = sc.ligne([("Aux dixièmes :", AMBRE_D), ("1", WHITE), ("contre 2.", WHITE)], 34, buff=0.18)
            lg.move_to(P(0, -1.7)).align_to(P(X0, 0), LEFT)
            l3 = libre(sc.ligne([("12,13 est plus petit que", VERT_OK), ("12,2.", VERT_OK)], 34, buff=0.16))
            l3.move_to(P(0, -2.35)).align_to(P(X0, 0), LEFT)
            sc.play(FadeIn(l0, shift=UP * 0.1), Create(cu), run_time=0.35)
            sc.au_mot("Aux dixièmes")
            cd = SurroundingRectangle(VGroup(rg[0].cases[2], rg[1].cases[2]), color=AMBRE_D, buff=0.06, stroke_width=6)
            sc.play(FadeIn(lg[0], shift=UP * 0.1), ReplacementTransform(cu, cd), run_time=0.3)
            sc.au_mot("1 contre")
            sc.play(FadeIn(lg[1], scale=1.3), run_time=0.25)
            sc.au_mot("contre 2")
            sc.play(FadeIn(lg[2], shift=UP * 0.1), Indicate(ch[1][2], color=VERT_OK, scale_factor=1.8), run_time=0.3)
            sc.au_mot("12,13 est plus petit")
            sc.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("12,2.")
            sc.play(FadeIn(l3[1], scale=1.3), run_time=0.3)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Compare 12,13 et 12,2."],
                            [self.choix("12,13 est plus petit", 25), self.choix("12,13 est plus grand", 25),
                             self.choix("ils sont égaux", 25)], 0,
                            ["Les unités sont égales.", "Aux dixièmes : 1 contre 2.", "12,13 est plus petit que 12,2."],
                            mot_q="Compare", avant_q=avant, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Range ces tailles")
        l1 = self.bloc(["Range ces tailles,", "de la plus petite à la plus grande :"], 36)
        self.col(l1, 2.0, xl=-4.6)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de la plus petite")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        cartes = VGroup()
        for s in ("1,5 m", "1,05 m", "1,45 m"):
            t = Text(s, font_size=56, color=WHITE, weight=BOLD)
            cartes.add(VGroup(RoundedRectangle(width=t.width + 0.7, height=1.15, corner_radius=0.2, stroke_color=MER,
                                               stroke_width=5, fill_color="#083344", fill_opacity=0.9).move_to(t), t))
        cartes.arrange(RIGHT, buff=0.6).move_to(P(-0.6, 0.25))
        for c, mot in zip(cartes, ("1,5 ;", "1,05 ;", "1,45.")):
            self.au_mot(mot)
            self.play(FadeIn(c, scale=1.2), run_time=0.3)
        tt = VGroup(*[tortue(0.95, couleur=c1, carapace=c2) for c1, c2 in
                      (("#16a34a", "#15803d"), ("#ea580c", "#c2410c"), ("#0891b2", "#0e7490"))])
        tt.arrange(RIGHT, buff=0.9).move_to(P(-0.6, -1.05))
        self.play(LaggedStart(*[FadeIn(t, shift=RIGHT * 0.2) for t in tt], lag_ratio=0.2), run_time=0.5)
        self.pause_defi(y=-2.25)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g, rg, ch = lignes_num(R3, ["1,5", "1,05", "1,45"], larg=1.6, h=0.85, fs_ent=24,
                               place=lambda g, r: g.move_to(P(-3.9, 0.55)))
        self.play(FadeIn(g), *[FadeIn(c) for k in range(3) for c in ch[k] if c is not None], run_time=0.35)
        X = 0.0
        self.au_mot("Les unités")
        l1 = self.t("Les unités sont toutes égales à 1.", 32, BLEU_D)
        self.col(l1, 2.25, xl=X)
        cu = SurroundingRectangle(colonne(rg, 0), color=BLEU_D, buff=0.06, stroke_width=6)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cu), run_time=0.4)
        self.au_mot("Aux dixièmes")
        ld = self.ligne([("Aux dixièmes :", AMBRE_D), ("5,", WHITE), ("0", WHITE), ("et 4.", WHITE)], 34, buff=0.16)
        self.col(ld, 1.45, xl=X)
        cd = SurroundingRectangle(colonne(rg, 1), color=AMBRE_D, buff=0.06, stroke_width=6)
        self.play(FadeIn(ld[0], shift=UP * 0.1), ReplacementTransform(cu, cd), run_time=0.3)
        for k, mot in enumerate(("5, 0", "0 et", "et 4")):
            self.au_mot(mot)
            self.play(FadeIn(ld[k + 1], scale=1.2), Indicate(ch[k][1], color=AMBRE_D, scale_factor=1.6), run_time=0.3)
        self.au_mot("Le plus petit")
        l2 = self.t("Le plus petit :", 34)
        self.col(l2, 0.6, xl=X)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        r = self.ligne([("1,05", ROSE_D), ("<", WHITE), ("1,45", AMBRE_D), ("<", WHITE), ("1,5", VERT_D)], 46, buff=0.24)
        self.col(r, -0.3, xl=X)
        self.au_mot("1,05, puis")
        self.play(FadeIn(r[0], scale=1.3), Indicate(rg[1], color=ROSE_D, scale_factor=1.04), run_time=0.35)
        self.au_mot("1,45, puis")
        self.play(FadeIn(r[1]), FadeIn(r[2], scale=1.3), Indicate(rg[2], color=AMBRE_D, scale_factor=1.04), run_time=0.35)
        self.au_mot("1,5.")
        self.play(FadeIn(r[3]), FadeIn(r[4], scale=1.3), Indicate(rg[0], color=VERT_D, scale_factor=1.04), run_time=0.35)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        g, rg, ch = lignes_num(R3, ["0,70", "0,65"], larg=1.4, h=0.8, fs_ent=22)
        fig = VGroup(g, *[c for k in range(2) for c in ch[k] if c is not None])
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On compare rang par rang,", "en partant de la gauche."),
            ("Un zéro à la fin ne change rien :", "0,7"),
            ("Plus de chiffres ne veut pas", "dire plus grand.")], fs=34)
        # la ligne « 0,7 égale 0,70 » : 0,70 vient à son mot, à droite de 0,7
        b = lignes[1][1]
        suite = self.t("= 0,70.", 34).next_to(b[1], RIGHT, buff=0.2)
        self.au_mot("On compare")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.04))
        self.au_mot("Un zéro")
        self.montrer_ligne(lignes[1], Indicate(ch[0][2], color=VERT_OK, scale_factor=1.8))
        self.au_mot("égale 0,70")
        self.play(FadeIn(suite, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("Plus de chiffres")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_piege()
        self.ecran_methode()
        self.ecran_zero()
        self.ecran_question1()
        self.ecran_unites()
        self.ecran_ranger()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class DecimalComparer6e(DecimalComparerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
