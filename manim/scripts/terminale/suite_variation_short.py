# suite_variation_short.py
# EleveAI — Maths Terminale (spé) — short « Sens de variation : multiplier par
# 1,1 peut faire descendre ? » (9:16), ceinture BLANCHE (échelle entière sous
# le titre). Série SUITES du lycée, épisode 30. Micro du coach : suite_variation.
#   · 00-garde      : le titre, l'échelle, le pari en gros, la flèche qui plonge ;
#   · 01-situation  : EN HAUT Malik, conseiller bancaire, le solde en barre qui
#                     pend sous le 0 (mois 0 : − 1 000 €) ; EN BAS la case
#                     − 1 000 se remplit EN MÊME TEMPS, juste sous sa barre ;
#   · 02-termes     : − 1 100, − 1 210 : la barre s'allonge (la part neuve en
#                     orange), la case dessous, la flèche « × 1,1 » saute ;
#                     « 1,1 > 1 » … et le solde descend (signe − rouge) ;
#   · 03/03b        : question-pause (A : le signe du premier terme), 3 s ;
#   · 04-commentaire: − 1 000 (mois 0) … ? (mois 3), « × 1,1 chaque mois »,
#                     « Quel est le solde au mois 3 ? », « Réponds en
#                     commentaire ! » (réponse − 1 331 € = − 1 000 × 1,1³, NON affichée) ;
#   · 05-abonne     : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison, vert = juste,
# rouge = le signe −.
# Voix : manim/voix/terminale-suite-variation-short.json (débit −6), calée
# par suite_variation_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_variation_short.py SuiteVariationShort -o eleveai-maths-terminale-suite-variation-short --media_dir manim/scripts/terminale/media-suite-variation-short

import sys
from pathlib import Path

_ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(_ICI))
sys.path.insert(1, str(_ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403

SOLDE = [-1000, -1100, -1210]
assert all(abs(b - 1.1 * a) < 1e-9 for a, b in zip(SOLDE, SOLDE[1:])) and SOLDE[2] < SOLDE[1] < SOLDE[0]
assert abs(-1000 * 1.1 ** 3 - (-1331)) < 1e-9                       # le mois 3 (commentaire)
XS = (-1.44, 0.0, 1.44)           # les trois barres et leurs cases (l'œil descend tout droit)
Y_ZERO, K = 0.62, 0.001           # la ligne du 0 € ; 1 000 € = 1 unité de hauteur
Y_CASES = -1.12
COSTUME = "#1E3A8A"


def malik(s=1.0):
    """Malik, conseiller bancaire : costume bleu nuit, cravate, tête."""
    tete = Circle(radius=0.28, fill_color="#8d5524", fill_opacity=1, stroke_width=0).move_to(P(0, 0.95))
    cheveux = Arc(radius=0.29, start_angle=0.2, angle=PI - 0.4, stroke_color="#111827", stroke_width=9)
    cheveux.move_to(P(0, 1.14))
    corps = RoundedRectangle(width=0.95, height=1.05, corner_radius=0.28, fill_color=COSTUME, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = Polygon(P(-0.16, 0.62), P(0.16, 0.62), P(0, 0.38), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    cravate = Polygon(P(0, 0.52), P(0.07, 0.4), P(0.04, 0.0), P(0, -0.07), P(-0.04, 0.0), P(-0.07, 0.4),
                      fill_color=PIEGE, fill_opacity=1, stroke_width=0)
    return VGroup(corps, col, cravate, tete, cheveux).scale(s)


def barre(x, v, v_avant=None, larg=0.8):
    """Le solde (négatif) en barre qui PEND sous la ligne du 0 ; la part
    neuve (au-delà de v_avant) en orange."""
    h = abs(v) * K
    g = VGroup()
    h0 = abs(v_avant) * K if v_avant is not None else h
    b = Rectangle(width=larg, height=h0, fill_color=TERME, fill_opacity=1, stroke_width=0)
    b.move_to(P(x, Y_ZERO - h0 / 2))
    g.add(b)
    if v_avant is not None:
        n = Rectangle(width=larg, height=h - h0, fill_color=RAISON, fill_opacity=1, stroke_width=0)
        n.move_to(P(x, Y_ZERO - h0 - (h - h0) / 2))
        g.add(n)
    return g


def signe(texte, couleur, r=0.3, fs=40):
    rond = Circle(radius=r, stroke_color=couleur, stroke_width=5, fill_color=FOND_CARTE, fill_opacity=1)
    return VGroup(rond, Text(texte, font_size=fs, color=couleur, weight=BOLD).move_to(rond))


class SuiteVariationShort(ShortSuites):
    fichier_marques = "suite_variation_short_marques.json"
    nom_voix = "terminale-suite-variation-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"

    def morceaux(self, pieces, fs=40, larg=None):
        """Une ligne en morceaux, chacun à sa place exacte dans la ligne entière."""
        pieces = [(p, WHITE) if isinstance(p, str) else p for p in pieces]
        entier = Text("".join(p for p, _ in pieces), font_size=fs)
        g, k = VGroup(), 0
        for p, c in pieces:
            if p.strip():
                m = Text(p.strip(), font_size=fs, color=c)
                n = len(m)    # glyphes réels : une ligature (« ffi », « fi ») en compte un seul
                g.add(m.move_to(VGroup(*entier[k:k + n])))
                k += n
        larg = larg or self.largeur_texte
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g

    def devoiler(self, g, extraits, rt=0.3, avec=()):
        paquet = []
        for m, ex in zip(g, extraits):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.08) for p in paquet], run_time=rt)
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(m)
        self.play(*[FadeIn(p, shift=UP * 0.08) for p in paquet], *avec, run_time=rt)

    Y_TITRE, Y_ECHELLE = 3.56, 2.86      # écartés : de l'air entre le titre et l'échelle des ceintures

    def entete(self, titre, extrait=None, fs=44):
        """Comme l'entête commun, mais le titre plus haut et l'échelle (70 %) plus bas."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, self.Y_ECHELLE))
        self.titre_s = self.t(titre, fs, JAUNE_TITRE).move_to(P(0, self.Y_TITRE))
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def corps(self, l1, l2=None, fs=34):
        """Un choix sur une ou deux lignes."""
        return Text(f"{l1}\n{l2}" if l2 else l1, font_size=fs, line_spacing=0.8)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari en gros ──
        self.dire("00-garde")
        self.entete("Sens de variation", extrait="Sens de variation")
        pari = self.paragraphe(["Tu paries que", "multiplier", ("par 1,1", RAISON), "peut faire", ("descendre ?", PIEGE)],
                               self.fs_grand, buff=0.16, y=0.6)
        for ligne, ex in zip(pari, ("Tu paries", "multiplier", "1,1", "peut faire", "descendre")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.25)
        plonge = Arrow(P(-1.3, -1.6), P(1.3, -2.75), buff=0, color=PIEGE, stroke_width=10, tip_length=0.35,
                       max_tip_length_to_length_ratio=0.25)
        self.play(GrowArrow(plonge), run_time=0.5)
        self.play(Indicate(pari[4], color=PIEGE, scale_factor=1.08), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT Malik et le solde en barre ; EN BAS la case dessous ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        perso = malik(0.62)
        nom = self.t("Malik", 44, JAUNE_TITRE)
        metier = self.t("conseiller bancaire", 30, TERME)
        textes = VGroup(nom, metier).arrange(DOWN, buff=0.1, aligned_edge=LEFT)
        ident = VGroup(perso, textes).arrange(RIGHT, buff=0.22)
        ident.scale_to_fit_width(min(ident.width, 3.95)).move_to(P(0, 1.68))
        ident = VGroup(perso, nom)
        self.au_mot("Malik")
        self.play(FadeIn(ident, shift=UP * 0.1), run_time=0.35)
        self.au_mot("conseiller")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.3)
        zero = Line(P(-2.05, Y_ZERO), P(2.05, Y_ZERO), stroke_color=GREY_B, stroke_width=3)
        mois = VGroup(*[self.t(f"mois {k}", 26, GREY_A, audit=False).move_to(P(x, Y_ZERO + 0.24))
                        for k, x in enumerate(XS)])
        lg = LigneTermes(["−1 000", "−1 100", "−1 210"], xs=XS, centre=P(0, Y_CASES), largeur=1.28, hauteur=0.7,
                         fs=22)
        for c in lg.cases:
            c[1]._pas_audit = True                       # « 1 000 » : dit, mais écrit en deux
        barres = [barre(XS[0], SOLDE[0]), barre(XS[1], SOLDE[1], SOLDE[0]), barre(XS[2], SOLDE[2], SOLDE[1])]
        self.au_mot("découvert")
        self.play(Create(zero), run_time=0.3)
        self.au_mot("1 000")
        self.play(GrowFromEdge(barres[0], UP), FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.cases[0][1], scale=1.4),
                  run_time=0.4)
        self.au_mot("mois 0")
        self.play(FadeIn(mois[0]), run_time=0.25)
        frais = self.morceaux([("× 1,1", RAISON), " chaque mois"], 40).move_to(P(0, -2.25))
        self.au_mot("multiplient")
        self.suivre("1,1")
        self.play(FadeIn(frais[0], scale=1.3), run_time=0.3)
        self.suivre("chaque mois")
        self.play(FadeIn(frais[1], shift=UP * 0.08), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : − 1 100, − 1 210 : la barre s'allonge ; q = 1,1 > 1… et ça descend ──
        self.dire("02-termes")
        self.play(FadeOut(frais), run_time=0.25)               # effacé AVANT les flèches
        self.au_mot("1 000")
        self.play(Indicate(lg.cases[0], color=TERME, scale_factor=1.12), Indicate(barres[0], color=TERME), run_time=0.3)
        for k in (1, 2):
            self.suivre(("1 100", "1 210")[k - 1])
            self.play(TransformFromCopy(barres[k - 1], barres[k][0]), FadeIn(barres[k][1], shift=DOWN * 0.1),
                      FadeIn(mois[k]), FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4),
                      run_time=0.35)
        self.au_mot("La raison")
        sauts = [lg.saut(k, "× 1,1", fs=30, creux=0.18) for k in range(2)]
        self.play(*[Create(s[0]) for s in sauts], run_time=0.3)
        comp = self.morceaux([("1,1", RAISON), " > ", "1"], 50).move_to(P(0, -2.6))
        self.suivre("1,1")
        self.play(*[FadeIn(s[1], scale=1.4) for s in sauts], FadeIn(comp[0], scale=1.3), run_time=0.25)
        self.au_mot("plus grande")
        self.play(FadeIn(comp[1]), run_time=0.2)
        self.suivre("1")
        self.play(FadeIn(comp[2], scale=1.3), run_time=0.25)
        self.au_mot("et le solde")
        self.play(FadeOut(VGroup(ident, metier)), run_time=0.25)
        sm = signe("−", PIEGE)
        desc = VGroup(sm, self.t("le solde descend !", 38, PIEGE)).arrange(RIGHT, buff=0.2)
        desc.scale_to_fit_width(3.9).move_to(P(0, 1.68))
        self.play(GrowFromCenter(sm), FadeIn(desc[1], shift=DOWN * 0.1),
                  *[Indicate(b[-1], color=PIEGE, scale_factor=1.1) for b in barres[1:]], run_time=0.45)
        self.play(Flash(sm, color=PIEGE, line_length=0.15, num_lines=10), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → A ──
        g1 = self.morceaux(["Une suite géométrique de"], 42, 1e9)
        g2 = self.morceaux(["raison ", ("1,1", RAISON), " est croissante"], 42, 1e9)
        g3 = self.morceaux(["ou décroissante selon :"], 42, 1e9)
        lignes = [(g1, ["Une suite"]), (g2, ["de raison", "1,1", "est croissante"]), (g3, ["ou décroissante"])]
        liste = [(g, None) for g, _ in lignes]

        def dessin():
            for g, ex in lignes:
                self.devoiler(g, ex)
            liste.clear()                     # poser_question ne les remontre pas
        q = self.poser_question("03-question", liste,
                                [self.corps("le signe du", "premier terme"), self.corps("le rang n"),
                                 self.corps("rien : toujours", "croissante")], 0, y_question=2.95, dessin=dessin)
        self.dire("03b-reponse")
        self.q_reponse(q, 0)
        ya = q.cartes[0].get_center()[1]
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), run_time=0.25)
        blocs = []
        for k, (mot, verbe, coul, d) in enumerate((("positif", "elle monte", JUSTE, UP),
                                                   ("négatif", "elle descend", PIEGE, DOWN))):
            y = ya - 1.1 - 1.25 * k
            a = self.morceaux(["Premier terme ", (mot, coul), " :"], 38).move_to(P(0, y))
            fl = Arrow(P(-0.35, -0.3 * d[1]), P(0.35, 0.3 * d[1]), buff=0, color=coul, stroke_width=8, tip_length=0.22,
                       max_tip_length_to_length_ratio=0.4)
            b = VGroup(fl, self.t(verbe, 40, coul)).arrange(RIGHT, buff=0.25)
            if b.width > 3.9:
                b.scale_to_fit_width(3.9)
            b.move_to(P(0, y - 0.6))
            blocs.append((a, b))
        for (a, b), mot, verbe in zip(blocs, ("positif", "négatif"), ("monte", "descend")):
            self.devoiler(a, ["Premier terme", mot, None])
            self.au_mot(verbe)
            self.play(GrowArrow(b[0]), FadeIn(b[1], shift=UP * 0.08), run_time=0.35)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire")                # l'échelle part : place à la question
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE - 0.02))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        lc = LigneTermes(["−1 000 €", "?"], xs=(-1.12, 1.12), centre=P(0, 1.22), largeur=1.75, hauteur=0.76, fs=34,
                         noms=["mois 0", "mois 3"], fs_noms=30)
        lc.cases[0][1]._pas_audit = True
        self.au_mot("1 000")
        self.montrer_case(lc, 0)
        fl = lc.saut(0, "× 1,1", cote=UP, fs=34, creux=0.28)
        cm = self.t("chaque mois", 30).next_to(fl[1], UP, buff=0.06)
        self.au_mot("multipliés")
        self.play(Create(fl[0]), run_time=0.3)
        self.suivre("1,1")
        self.play(FadeIn(fl[1], scale=1.3), run_time=0.25)
        self.suivre("chaque mois")
        self.play(FadeIn(cm, shift=DOWN * 0.08), run_time=0.25)
        question = self.paragraphe([("Quel est", RAISON), "le solde", ("au mois 3 ?", RAISON)], 42, buff=0.1, y=-0.78)
        for ligne, ex in zip(question, ("Quel est", "le solde", "mois 3")):
            self.au_mot(ex)
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if ex == "mois 3":
                self.montrer_case(lc, 1)
                anims.append(Indicate(lc.cases[1], color=RAISON))
            self.play(*anims, run_time=0.3)
        self.appel_commentaire(-2.42)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin commune (« @eleveai974 » grossit un instant) ──
        self.fin_short("05-abonne")
