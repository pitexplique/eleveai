# suite_reconnaitre_short.py
# EleveAI — Maths Terminale (spé) — short « Suites : tu reconnais leur nature
# en 5 secondes ? » (9:16), ceinture BLANCHE (échelle entière sous le titre).
# Série SUITES du lycée, épisode 28. Micro du coach : suite_reconnaitre.
#   · 00-garde      : le titre, l'échelle, le pari en gros et un chrono ;
#   · 01-situation  : EN HAUT Zoé, productrice de musique, et les écoutes de son
#                     morceau en barres de blocs (1, 2, 4 blocs : les blocs neufs
#                     en orange) ; EN BAS les cases 1 000, 2 000, 4 000 se
#                     remplissent EN MÊME TEMPS, juste sous leur barre ;
#   · 02-nature     : les flèches « × 2 » sautent de case en case, géométrique,
#                     q = 2 ; « si on ajoutait 1 000 » : des barres fantômes
#                     (1, 2, 3 blocs) à côté, arithmétique ;
#   · 03/03b        : question-pause (B : géométrique de raison 1,1), 3 s ;
#   · 04-commentaire: 1 000 (jour 0) … ? (jour 5), « double chaque jour »,
#                     « Combien d'écoutes le jour 5 ? », « Réponds en
#                     commentaire ! » (réponse 32 000 = 1 000 × 2⁵, NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison, vert = juste.
# Voix : manim/voix/terminale-suite-reconnaitre-short.json (débit −6), calée
# par suite_reconnaitre_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_reconnaitre_short.py SuiteReconnaitreShort -o eleveai-maths-terminale-suite-reconnaitre-short --media_dir manim/scripts/terminale/media-suite-reconnaitre-short

import sys
from pathlib import Path

_ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(_ICI))
sys.path.insert(1, str(_ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403

ECOUTES = [1000, 2000, 4000]
assert all(b == 2 * a for a, b in zip(ECOUTES, ECOUTES[1:]))       # q = 2
assert abs(1 + 10 / 100 - 1.1) < 1e-12                             # question : B
assert 1000 * 2 ** 5 == 32000                                      # le jour 5 (commentaire)
XS = (-1.45, -0.1, 1.25)          # les trois barres et leurs cases (l'œil descend tout droit)
Y_SOL, H_BLOC, L_BLOC = -0.06, 0.27, 0.56
Y_CASES = -0.8


def chrono(r=0.9):
    cadran = Circle(radius=r, stroke_color=WHITE, stroke_width=7)
    bouton = RoundedRectangle(width=0.3, height=0.2, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).next_to(cadran, UP, buff=0.03)
    aiguille = Line(ORIGIN, UP * r * 0.8, stroke_color=RAISON, stroke_width=7)
    return VGroup(cadran, bouton), aiguille


def casque(s=1.0, couleur="#EC4899"):
    """Le casque de Zoé (son pictogramme de productrice de musique)."""
    arc = Arc(radius=0.3, start_angle=0, angle=PI, stroke_color=couleur, stroke_width=8)
    g = RoundedRectangle(width=0.16, height=0.3, corner_radius=0.06, fill_color=couleur, fill_opacity=1,
                         stroke_width=0).move_to(P(-0.3, -0.05))
    d = g.copy().move_to(P(0.3, -0.05))
    return VGroup(arc, g, d).scale(s)


def note(s=1.0, couleur=WHITE):
    """Une croche : la tête, la hampe, le crochet."""
    tete = Ellipse(width=0.16, height=0.11, fill_color=couleur, fill_opacity=1, stroke_width=0).rotate(0.4)
    hampe = Line(P(0.07, 0.02), P(0.07, 0.24), stroke_color=couleur, stroke_width=2.5)
    crochet = Line(P(0.07, 0.24), P(0.15, 0.15), stroke_color=couleur, stroke_width=2.5)
    return VGroup(tete, hampe, crochet).scale(s)


def bloc(x, k, couleur=TERME):
    """Le k-ième bloc (1 000 écoutes) de la barre d'abscisse x, une croche dedans."""
    b = RoundedRectangle(width=L_BLOC, height=H_BLOC - 0.04, corner_radius=0.05, fill_color=couleur,
                         fill_opacity=1, stroke_width=0).move_to(P(x, Y_SOL + H_BLOC * (k + 0.5)))
    return VGroup(b, note(0.85).move_to(b))


def barre(x, n, neufs=0):
    """n blocs ; les `neufs` du haut en orange (les écoutes gagnées ce jour-là)."""
    return VGroup(*[bloc(x, k, RAISON if k >= n - neufs else TERME) for k in range(n)])


def fantome(x, n):
    """La barre « si on ajoutait 1 000 » : n blocs en pointillés gris."""
    return VGroup(*[DashedVMobject(RoundedRectangle(width=0.36, height=H_BLOC - 0.06, corner_radius=0.04,
                                                    stroke_color=GREY_B, stroke_width=2.5), num_dashes=14)
                    .move_to(P(x, Y_SOL + H_BLOC * (k + 0.5))) for k in range(n)])


class SuiteReconnaitreShort(ShortSuites):
    fichier_marques = "suite_reconnaitre_short_marques.json"
    nom_voix = "terminale-suite-reconnaitre-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"

    def morceaux(self, pieces, fs=40, larg=None):
        """Une ligne en morceaux, chacun à sa place exacte dans la ligne entière."""
        pieces = [(p, WHITE) if isinstance(p, str) else p for p in pieces]
        entier = Text("".join(p for p, _ in pieces), font_size=fs)
        g, k = VGroup(), 0
        for p, c in pieces:
            n = len(p.replace(" ", ""))
            if n:
                g.add(Text(p.strip(), font_size=fs, color=c).move_to(VGroup(*entier[k:k + n])))
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

    def corps(self, l1, l2, fs=34):
        """Un choix sur deux lignes (« géométrique » / « de raison 1,1 »)."""
        return Text(f"{l1}\n{l2}", font_size=fs, line_spacing=0.8)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari en gros ──
        self.dire("00-garde")
        self.entete("Suites", extrait="Suites")
        pari = self.paragraphe(["Tu paries que", "tu reconnais", "la nature", "d'une suite", ("en 5 secondes ?", RAISON)],
                               self.fs_grand, buff=0.16, y=1.15)
        for ligne, ex in zip(pari, ("Tu paries", "tu reconnais", "la nature", "d'une suite", "5 secondes")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.25)
        cad, aig = chrono(0.8)
        VGroup(cad, aig).move_to(P(0, -1.85))
        aig.shift(cad[0].get_center() - aig.get_start())
        self.play(FadeIn(cad, scale=0.7), FadeIn(aig), run_time=0.3)
        self.play(Rotate(aig, -TAU, about_point=cad[0].get_center()), run_time=1.0, rate_func=linear)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT les écoutes de Zoé en barres ; EN BAS les cases dessous ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        nom = self.t("Zoé", 48, JAUNE_TITRE)
        cq = casque(0.9)
        ident = VGroup(cq, nom).arrange(RIGHT, buff=0.25).move_to(P(0, 2.22))
        m1 = self.t("productrice", 34, TERME).move_to(P(0, 1.68))
        m2 = self.t("de musique", 34, TERME).move_to(P(0, 1.3))
        self.au_mot("Zoé")
        self.play(FadeIn(ident, shift=UP * 0.1), run_time=0.35)
        self.au_mot("productrice")
        self.play(FadeIn(m1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("musique")
        n1 = note(1.8, RAISON).move_to(cq.get_right() + P(0.25, -0.05))
        self.play(FadeIn(m2, shift=UP * 0.1), FadeIn(n1), n1.animate.shift(UP * 0.3 + RIGHT * 0.2).set_opacity(0),
                  run_time=0.6)
        sol = Line(P(-2.0, Y_SOL - 0.02), P(2.0, Y_SOL - 0.02), stroke_color=GREY_B, stroke_width=3)
        jours = VGroup(*[self.t(f"jour {k}", 26, GREY_A, audit=False).move_to(P(x, Y_SOL - 0.22))
                         for k, x in enumerate(XS)])
        lg = LigneTermes(["1 000", "2 000", "4 000"], xs=XS, centre=P(0, Y_CASES), largeur=1.12, hauteur=0.66, fs=36)
        for c in lg.cases:
            c[1]._pas_audit = True                       # « 1 000 » : dit, mais écrit en deux
        barres = [barre(XS[0], 1), barre(XS[1], 2, 1), barre(XS[2], 4, 2)]
        self.au_mot("nouveau morceau")
        self.play(Create(sol), run_time=0.3)
        self.au_mot("1 000 écoutes")
        self.play(FadeIn(barres[0][0], shift=UP * 0.2), FadeIn(jours[0]), FadeIn(lg.cases[0][0], scale=0.8),
                  FadeIn(lg.cases[0][1], scale=1.4), run_time=0.4)
        self.au_mot("doublent")
        d1 = self.t("elles doublent", 42).move_to(P(0, -1.9))
        d2 = self.t("chaque jour", 40, RAISON).move_to(P(0, -2.5))
        self.play(FadeIn(d1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("chaque jour")
        self.play(FadeIn(d2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 000", n=2)
        self.play(Indicate(lg.cases[0], color=TERME, scale_factor=1.15), Indicate(barres[0], color=TERME), run_time=0.3)
        for k in (1, 2):
            self.au_mot(f"{ECOUTES[k] // 1000} 000")
            n = len(barres[k - 1])
            anc = barres[k][:n]
            self.play(TransformFromCopy(barres[k - 1], anc), FadeIn(barres[k][n:], scale=1.4), FadeIn(jours[k]),
                      FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), run_time=0.35)
            for b in anc:
                b[0].set_fill(TERME)
        self.attendre_voix(marge=0.2)

        # ── 02 : on multiplie toujours par 2 : géométrique ; + 1 000 : arithmétique ──
        self.dire("02-nature")
        self.play(FadeOut(d1), FadeOut(d2), run_time=0.25)               # effacés AVANT les arcs
        self.au_mot("par 2")
        sauts = [lg.saut(k, "× 2", fs=32, creux=0.13) for k in range(2)]
        self.play(*[Create(s[0]) for s in sauts], Indicate(barres[1][1:], color=RAISON),
                  Indicate(barres[2][2:], color=RAISON), run_time=0.35)
        self.play(*[FadeIn(s[1], scale=1.4) for s in sauts], run_time=0.2)
        self.au_mot("géométrique")
        sg = self.t("suite géométrique", 44, JAUNE_TITRE).move_to(P(0, -2.22))
        self.play(FadeIn(sg, scale=1.2), run_time=0.35)
        self.au_mot("raison")
        rr = VGroup(self.t("raison :", 34), self.t("q =", 38, RAISON), self.t("2", 38, RAISON)).arrange(RIGHT, buff=0.22)
        rr[1:].shift(RIGHT * 0.12)
        if rr.width > 3.6:  # il grandit de 8 % (insister) : reste dans la marge
            rr.scale_to_fit_width(3.6)
        rr.move_to(P(0, -2.76))
        self.play(FadeIn(rr[:2], shift=UP * 0.1), run_time=0.25)
        self.suivre("2")
        cadr = self.encadre(rr[1:], RAISON, 0.1)
        self.play(FadeIn(rr[2], scale=1.4), Create(cadr), run_time=0.3)
        self.insister(VGroup(rr, cadr), 1.08)
        self.au_mot("Si on ajoutait")
        s1 = self.t("si on ajoutait", 38, GREY_A).move_to(P(0, 2.38))
        s2 = self.morceaux([("+ 1 000", GREY_A), (" : arithmétique", GREY_A)], 38).move_to(P(0, 1.75))
        s2[0]._pas_audit = True
        fan = [fantome(x + 0.47, k + 1) for k, x in enumerate(XS)]
        self.play(FadeOut(VGroup(ident, m1, m2)), run_time=0.25)
        self.play(FadeIn(s1, shift=UP * 0.08), run_time=0.25)
        self.au_mot("1 000")
        self.play(FadeIn(s2[0], scale=1.3), LaggedStart(*[Create(f) for f in fan], lag_ratio=0.3), run_time=0.6)
        self.au_mot("arithmétique")
        self.play(FadeIn(s2[1], shift=UP * 0.08), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → B ──
        g1 = self.morceaux(["Augmenter de ", ("10 %", RAISON)], 44, 1e9)
        g2 = self.morceaux(["chaque jour, c'est"], 44, 1e9)
        g3 = self.morceaux(["une suite :"], 44, 1e9)
        lignes = [(g1, ["Augmenter", "10 %"]), (g2, ["chaque jour"]), (g3, ["une suite"])]
        liste = [(g, None) for g, _ in lignes]

        def dessin():
            for g, ex in lignes:
                self.devoiler(g, ex)
            liste.clear()                     # poser_question ne les remontre pas
        q = self.poser_question("03-question", liste,
                                [self.corps("arithmétique", "de raison 10"), self.corps("géométrique", "de raison 1,1"),
                                 self.corps("géométrique", "de raison 10")], 1, y_question=2.95, dessin=dessin)
        self.dire("03b-reponse")
        self.q_reponse(q, 1)
        yb = q.cartes[1].get_center()[1]
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), run_time=0.25)
        e = VGroup(self.t("+ 10 %", 64, RAISON).move_to(P(0, yb - 1.1)),
                   *self.morceaux(["c'est  ", ("× 1,1", JUSTE)], 56, 3.4).move_to(P(0, yb - 1.95)))
        self.devoiler(e, ["10 %", "c'est", "1,1"])
        cad = self.encadre(e[2], JUSTE, 0.12)
        self.play(Create(cad), run_time=0.25)
        self.insister(VGroup(e, cad), 1.06)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        lc = LigneTermes(["1 000", "?"], xs=(-1.15, 1.15), centre=P(0, 1.3), largeur=1.3, hauteur=0.76, fs=40,
                         noms=["jour 0", "jour 5"], fs_noms=30)
        lc.cases[0][1]._pas_audit = True
        self.au_mot("1 000")
        self.montrer_case(lc, 0)
        self.au_mot("double")
        dbl = lc.saut(0, "double chaque jour", cote=UP, fs=32, creux=0.3)
        if dbl[1].width > 3.7:
            dbl[1].scale_to_fit_width(3.7)
        self.play(Create(dbl[0]), FadeIn(dbl[1], shift=DOWN * 0.08), run_time=0.4)
        question = self.paragraphe([("Combien", RAISON), "d'écoutes", ("le jour 5 ?", RAISON)], 48, buff=0.12, y=-0.72)
        for ligne, ex in zip(question, ("Combien", "d'écoutes", "jour 5")):
            self.au_mot(ex)
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if ex == "jour 5":
                self.montrer_case(lc, 1)
                anims.append(Indicate(lc.cases[1], color=RAISON))
            self.play(*anims, run_time=0.3)
        self.appel_commentaire(-2.42)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
