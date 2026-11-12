# suite_limite_calculer_short.py
# EleveAI — Maths Terminale (spé) — short « Qui gagne : n² ou 2ⁿ ? » (9:16),
# ceinture BLANCHE (échelle entière sous le titre). Série SUITES du lycée,
# épisode 34. Micro du coach : limite_suite_calculer (genLimExpo : n²/2ⁿ → 0,
# « l'exponentielle l'emporte sur toute puissance de n »).
#   · 00-garde       : le titre, l'échelle (70 %), le pari en gros ; EN BAS la
#                      course n² (bleu) contre 2ⁿ (orange), dès le titre ;
#   · 01-situation   : EN HAUT Lou, game designer, puis le champ de bataille :
#                      l'armée du joueur (n², bleue) et celle de l'ennemi (2ⁿ,
#                      orange) ; EN BAS, EN MÊME TEMPS, le tableau de score :
#                      « Tour 4 : 16 contre 16 » (4 × 4 soldats de chaque côté) ;
#   · 02-tours       : tour 10 : 100 contre 1 024 (les deux armées à la même
#                      échelle) ; tour 20 : 400 contre 1 048 576, l'armée orange
#                      déborde et recouvre tout le champ ;
#   · 03/03b         : question-pause (C : n²/2ⁿ tend vers 0), 3 s ; la course en
#                      attente, puis les trois boutons ; le nuage de n²/2ⁿ qui
#                      s'écrase sur 0 ;
#   · 04-commentaire : au tour 5, combien de soldats de chaque côté ? « Réponds en
#                      commentaire ! » (réponse 25 et 32, NON affichée) ;
#   · 05-abonne      : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = n² (le joueur), orange = 2ⁿ (l'ennemi),
# vert = juste (la limite 0), rouge = piège.
# Voix : manim/voix/terminale-suite-limite-calculer-short.json (débit −6),
# calée par suite_limite_calculer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_limite_calculer_short.py SuiteLimiteCalculerShort -o eleveai-maths-terminale-suite-limite-calculer-short --media_dir manim/scripts/terminale/media-suite-limite-calculer-short

import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_limite_calculer import OutilsCalcul  # noqa: E402

assert [n * n for n in (4, 10, 20)] == [16, 100, 400] and [2 ** n for n in (4, 10, 20)] == [16, 1024, 1048576]
RAP = [n * n / 2 ** n for n in range(13)]
assert max(RAP) == RAP[3] == 1.125 and RAP[12] < 0.04                  # la réponse C : → 0
assert (5 * 5, 2 ** 5) == (25, 32)                                       # le commentaire : 25 et 32
PEAU, PULL, HERBE = "#8d5524", "#7c3aed", "#14532d"


def lou(s=1.0):
    """Lou, game designer : casque audio, pull violet, manette."""
    tete = Circle(radius=0.28, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    cheveux = Sector(radius=0.31, angle=PI, start_angle=0, fill_color="#111827", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.18))
    arceau = Arc(radius=0.33, start_angle=0.1, angle=PI - 0.2, stroke_color="#e5e7eb", stroke_width=6).move_to(P(0, 1.2))
    ecouteurs = VGroup(*[RoundedRectangle(width=0.12, height=0.24, corner_radius=0.05, fill_color="#e5e7eb",
                                          fill_opacity=1, stroke_width=0).move_to(P(x, 1.0)) for x in (-0.32, 0.32)])
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=PULL, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    manette = RoundedRectangle(width=0.62, height=0.26, corner_radius=0.12, fill_color="#1f2937", fill_opacity=1,
                               stroke_width=0).move_to(P(0, -0.05))
    boutons = VGroup(Dot(P(0.15, -0.02), radius=0.04, color=RAISON), Dot(P(0.22, -0.09), radius=0.04, color=TERME),
                     Dot(P(-0.17, -0.05), radius=0.05, color=GREY_B))
    return VGroup(corps, manette, boutons, tete, cheveux, arceau, ecouteurs).scale(s)


def soldat(couleur, s=1.0):
    """Un pion-soldat : tête ronde, corps en trapèze."""
    tete = Circle(radius=0.09, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.12))
    corps = Polygon(P(-0.1, 0.02), P(0.1, 0.02), P(0.14, -0.16), P(-0.14, -0.16), fill_color=couleur,
                    fill_opacity=1, stroke_width=0)
    return VGroup(tete, corps).scale(s)


def armee(k, cote, couleur, coin, pions=False):
    """k × k soldats (des pions si pions, sinon de petits carrés) en grille de pas
    `cote`, posée par son coin haut-gauche `coin`."""
    g = VGroup()
    for i in range(k):
        for j in range(k):
            c = P(coin[0] + (j + 0.5) * cote, coin[1] - (i + 0.5) * cote)
            if pions:
                g.add(soldat(couleur, cote / 0.36).move_to(c))
            else:
                g.add(Square(cote * 0.78, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(c))
    return g


class SuiteLimiteCalculerShort(OutilsCalcul, ShortSuites):
    fichier_marques = "suite_limite_calculer_short_marques.json"
    nom_voix = "terminale-suite-limite-calculer-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"
    hauteur_bouton = 0.8
    buff_boutons = 0.18
    y_tete_question = 3.45
    Y_TITRE, Y_ECHELLE = 3.56, 2.86      # de l'air entre le titre et l'échelle des ceintures
    CHAMP = (0.32, 2.5)                  # le champ de bataille (bas, haut)

    def construire(self, morceaux, fs=40, larg=None):
        return super().construire(morceaux, fs, larg or self.largeur_texte / 1.05)

    def ligne(self, morceaux, y, fs=40, avec=(), larg=None, avec_k=None, rt=0.25, rt_mid=0.22):
        return self.montrer(self.construire(morceaux, fs, larg).move_to(P(0, y)), avec, rt=rt, avec_k=avec_k,
                            rt_mid=rt_mid)

    def entete(self, titre, extrait=None, fs=48):
        """Comme l'entête commun, mais le titre plus haut et l'échelle (70 %) plus bas."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, self.Y_ECHELLE))
        self.titre_s = self.t(titre, fs, JAUNE_TITRE, 3.9).move_to(P(0, self.Y_TITRE))
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def bouton(self, lettre, corps, largeur, fs):
        """Un bouton : rond A/B/C, le corps (44 pt, une ligne), marge ≥ 20 px, la coche à droite sans toucher le texte."""
        rond = Circle(radius=0.22, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=32, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else self.t(corps, 40, WHITE, 1e9)
        ligne = VGroup(VGroup(rond, lt), c).arrange(RIGHT, buff=0.32)
        cadre = RoundedRectangle(width=largeur, height=max(self.hauteur_bouton, ligne.height + 0.36),
                                 corner_radius=0.14, stroke_color=TERME, stroke_width=3, fill_color=FOND_CARTE,
                                 fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def course(self, bas, haut, x0=-1.55, x1=1.4, r=0.075):
        """La course n² (bleu) contre 2ⁿ (orange), n de 0 à 10."""
        nu = NuageTermes((0, 10.5), (0, 1100), P(x0, bas), P(x1, haut), fs=36)
        bleus = [nu.point(n, n * n, r=r) for n in range(11)]
        oranges = [nu.point(n, 2 ** n, RAISON, r=r) for n in range(11)]
        return nu, bleus, oranges

    def case(self, couleur, y, largeur=3.7):
        return RoundedRectangle(width=largeur, height=0.72, corner_radius=0.12, stroke_color=couleur, stroke_width=3,
                                fill_color=FOND_CARTE, fill_opacity=1).move_to(P(0, y))

    def nombre(self, texte, couleur, cadre, extrait):
        """Le nombre d'une case (en morceaux : audité comme la voix l'écrit, « 1 024 »)."""
        g = self.construire([(texte, couleur, extrait)], 44, 1e9).move_to(cadre)
        return g

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; EN BAS la course ──
        self.dire("00-garde")
        self.entete("Limites", extrait="Limites")
        nu0, b0, o0 = self.course(-2.75, -1.15)
        self.play(*[Create(nu0.ax_n), Create(nu0.ax_u), FadeIn(nu0.lab_n), FadeIn(nu0.lab_u)], run_time=0.4)
        pari = [self.t("Tu paries que", 40), self.t("tu sais qui", 40), self.t("gagne, entre", 40)]
        for k, l in enumerate(pari):
            l.move_to(P(0, 2.15 - 0.62 * k))
        duel = self.construire([("n²", TERME, "n au carré"), ("et", WHITE, None), ("2ⁿ", RAISON, "2 puissance"),
                                ("?", JAUNE_TITRE, None)], 52).move_to(P(0, 0.12))
        for l, ex in zip(pari, ("Tu paries", "tu sais", "gagne")):
            self.au_mot(ex)
            self.play(FadeIn(l, shift=UP * 0.1), run_time=0.3)
        self.montrer(duel, avec_k={0: [LaggedStart(*[GrowFromCenter(d) for d in b0], lag_ratio=0.08)],
                                   2: [LaggedStart(*[GrowFromCenter(d) for d in o0], lag_ratio=0.08)]})
        self.play(Flash(o0[-1], color=RAISON, line_length=0.15), run_time=0.4)
        self.attendre_voix(marge=0.4)

        # ── 01 : EN HAUT Lou puis le champ de bataille ; EN BAS le tableau de score ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        perso = lou(0.66).move_to(P(-1.25, 1.45))
        nom = self.t("Lou", 46, JAUNE_TITRE).move_to(P(0.85, 2.05))
        metier = VGroup(self.t("game", 38, TERME), self.t("designer", 38, TERME)).arrange(DOWN, buff=0.08)
        metier.move_to(P(0.85, 1.05))
        yh, yb1, yc, yb2 = -0.3, -1.0, -1.66, -2.32
        trous = VGroup(*[DashedVMobject(self.case(GREY_B, y), num_dashes=40) for y in (yb1, yb2)])
        self.au_mot("Lou")
        self.play(FadeIn(perso, shift=UP * 0.1), FadeIn(nom, shift=UP * 0.1), Create(trous), run_time=0.35)
        self.au_mot("game designer")
        self.play(FadeIn(metier, shift=UP * 0.08), run_time=0.3)
        bas, haut = self.CHAMP
        champ = RoundedRectangle(width=4.2, height=haut - bas, corner_radius=0.14, fill_color=HERBE, fill_opacity=1,
                                 stroke_color=GREY_B, stroke_width=2).move_to(P(0, (bas + haut) / 2))
        milieu = DashedLine(P(0, bas + 0.08), P(0, haut - 0.08), color=GREY_B, stroke_width=2)
        self.au_mot("Dans son jeu")
        self.play(FadeOut(VGroup(perso, nom, metier)), run_time=0.25)
        self.play(FadeIn(champ, scale=0.95), Create(milieu), run_time=0.35)
        hd = self.construire([("Tour n :", JAUNE_TITRE, "au tour")], 44).move_to(P(0, yh))
        self.montrer(hd)
        # chaque mot au milieu de sa moitié, avec plus de 20 px d'air contre le bord et contre les pointillés
        lj, le = self.t("joueur", 36, TERME), self.t("ennemi", 36, RAISON)
        for m, x in ((lj, -1.05), (le, 1.05)):
            if m.width > 1.5:
                m.scale_to_fit_width(1.5)
            m.move_to(P(x, 2.16))
        fj = self.construire([("n²", TERME, "n au carré")], 46).move_to(P(-1.02, 1.66))
        fe = self.construire([("2ⁿ", RAISON, "2 puissance")], 46).move_to(P(1.02, 1.66))
        self.au_mot("joueur")
        self.play(FadeIn(lj, shift=DOWN * 0.08), run_time=0.25)
        self.montrer(fj)
        self.au_mot("l'ennemi")
        self.play(FadeIn(le, shift=DOWN * 0.08), run_time=0.25)
        self.montrer(fe)
        self._jeu = dict(champ=champ, lj=lj, le=le, fj=fj, fe=fe, hd=hd)
        cj, ce = self.case(TERME, yb1), self.case(RAISON, yb2)
        contre = self.t("contre", 36, GREY_A).move_to(P(0, yc))
        h4 = self.construire([("Tour", JAUNE_TITRE, None), ("4 :", JAUNE_TITRE, "4")], 44).move_to(P(0, yh))
        self.au_mot("Au tour")
        self.suivre("4")
        self.play(FadeOut(hd), FadeIn(h4), run_time=0.25)
        aj = armee(4, 0.25, TERME, (-1.52, 1.4), pions=True)
        ae = armee(4, 0.25, RAISON, (0.52, 1.4), pions=True)
        nj, ne = self.nombre("16", WHITE, cj, "16 contre"), self.nombre("16", WHITE, ce, "16.")
        self.suivre("16 contre")
        self.play(FadeOut(trous), FadeIn(cj), FadeIn(nj, scale=1.3), FadeIn(contre),
                  LaggedStart(*[FadeIn(p, scale=0.5) for p in aj], lag_ratio=0.03), run_time=0.4)
        self.suivre("16.")
        self.play(FadeIn(ce), FadeIn(ne, scale=1.3), LaggedStart(*[FadeIn(p, scale=0.5) for p in ae], lag_ratio=0.03),
                  run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 02 : tour 10, tour 20 : l'armée orange explose ──
        self.nouvel_ecran("02-tours", garder=(self.badge, self.titre_s, champ, milieu, lj, le, *fj, *fe, cj, ce, contre,
                                              h4, nj, ne, aj, ae))
        s = 1.0 / 32
        for tour, vj, exj, ve, exe in ((10, "100", "100 contre", "1 024", "1 024"),
                                       (20, "400", "400 contre", "1 048 576", "1 048 576")):
            h = self.construire([("Tour", JAUNE_TITRE, None), (f"{tour} :", JAUNE_TITRE, str(tour))], 44).move_to(P(0, yh))
            # Changement de tour : les nombres ET les armées de l'ancien tour partent ensemble,
            # des « ? » attendent la voix (aucune image ne mélange deux tours).
            qj, qe = self.t("?", 44, TERME).move_to(cj), self.t("?", 44, RAISON).move_to(ce)
            self.suivre(str(tour))
            self.play(FadeOut(h4), FadeIn(h), FadeOut(nj), FadeOut(ne), FadeOut(aj), FadeOut(ae),
                      FadeIn(qj), FadeIn(qe), run_time=0.25)
            h4 = h
            nj2 = self.nombre(vj, WHITE, cj, exj)
            aj2 = armee(tour, s, TERME, (-1.52, 1.4))
            self.suivre(exj)
            self.play(FadeOut(qj), FadeIn(nj2, scale=1.3), FadeIn(aj2, scale=0.8), run_time=0.35)
            nj, aj = nj2, aj2
            ne2 = self.nombre(ve, WHITE, ce, exe)
            self.suivre(exe)
            if tour == 10:
                ae2 = armee(32, s, RAISON, (0.52, 1.4))
                self.play(FadeOut(qe), FadeIn(ne2, scale=1.3), FadeIn(ae2, scale=0.8), run_time=0.35)
            else:
                ae2 = RoundedRectangle(width=4.2, height=haut - bas, corner_radius=0.14, fill_color=RAISON,
                                       fill_opacity=1, stroke_width=0).move_to(champ)
                for m in (aj, lj, fj, le, fe):
                    m.set_z_index(3)
                self.play(FadeOut(qe), FadeIn(ne2, scale=1.3), GrowFromPoint(ae2, P(1.02, 0.9)),
                          le.animate.set_color(WHITE), fe.animate.set_color(WHITE), lj.animate.set_color("#1e3a8a"),
                          fj.animate.set_color("#1e3a8a"), ce.animate.set_stroke(PIEGE, width=6), run_time=0.45)
                self.play(Flash(ce, color=RAISON, line_length=0.25), Indicate(ne2, color=RAISON, scale_factor=1.12),
                          run_time=0.5)
            ne, ae = ne2, ae2
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → C (n²/2ⁿ → 0) ──
        g1 = self.ligne_maths([("t", [("Que fait", WHITE, "Que fait")]),
                               ("f", [("n²", TERME, "n au carré")], [("2ⁿ", RAISON, "2 puissance")])], 46)
        g2 = self.construire([("quand", WHITE, "quand"), ("n → +∞ ?", WHITE, "n tend")], 42)

        def attente():
            """Le bas ne reste pas vide : la course attend jusqu'aux cadres des boutons."""
            nu_a, b_a, o_a = self.course(-2.5, -0.2)
            self._attente_q = VGroup(nu_a, *b_a, *o_a)
            self.play(FadeIn(self._attente_q, shift=UP * 0.15), run_time=0.3)
            for g in (g1, g2):
                self.montrer(g, rt=0.22)
            liste.clear()
        liste = [(g1, None), (g2, None)]
        q = self.poser_question("03-question", liste,
                                [self.choix([("→", "il tend"), ("1", "1")], 46),
                                 self.choix([("→", "il tend"), ("+∞", "plus")], 46),
                                 self.choix([("→", "il tend"), ("0", "0")], 46)], 2, dessin=attente)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 2)
        nu = NuageTermes((0, 12.5), (0, 1.25), P(-1.55, -2.75), P(1.4, -1.0), fs=36)
        pts = [nu.point(n, RAP[n], r=0.075) for n in range(13)]
        zero = Line(nu.G(0, 0), nu.G(12.5, 0), color=JUSTE, stroke_width=7)
        self.ligne([("L'exponentielle", RAISON, "L'exponentielle")], 2.3, fs=38,
                   avec_k={0: [FadeOut(q.tete), FadeOut(q.question), FadeOut(q.cartes[0]), FadeOut(q.cartes[1]),
                               VGroup(q.cartes[2], ok).animate.move_to(P(0, 3.05)),
                               Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u)]})
        self.ligne([("l'emporte", WHITE, "l'emporte")], 1.72, fs=42,
                   avec_k={0: [LaggedStart(*[GrowFromCenter(d) for d in pts[:5]], lag_ratio=0.15)]})
        fr_ = self.ligne_maths([("f", [("n²", TERME, "rapport")], [("2ⁿ", RAISON, None)]),
                                ("t", [("→ 0", JUSTE, "0")])], 46).move_to(P(0, 0.66))
        self.montrer(fr_, avec_k={0: [LaggedStart(*[GrowFromCenter(d) for d in pts[5:]], lag_ratio=0.1)],
                                  2: [Create(zero), *[d.animate.set_color(JUSTE) for d in pts[6:]]]})
        self.play(Create(self.encadre(fr_, JUSTE, 0.1)), run_time=0.3)
        self.attendre_voix(marge=0.4)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE - 0.02))
        pj, pe = soldat(TERME, 2.4).move_to(P(-1.2, 2.3)), soldat(RAISON, 2.4).move_to(P(1.2, 2.3))
        qd = self.t("?", 72, JAUNE_TITRE, audit=False).move_to(P(0, 2.3))
        qm = self.t("?", 150, RAISON, audit=False).move_to(P(0, -1.2)).set_opacity(0.55)
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(pj, shift=RIGHT * 0.2), FadeIn(pe, shift=LEFT * 0.2),
                  FadeIn(qd, scale=0.6), FadeIn(qm, scale=0.8), run_time=0.35)
        self.ligne([("au tour", WHITE, "au tour"), ("5,", JAUNE_TITRE, "5")], 1.18, fs=44)
        self.ligne([("combien de", WHITE, "combien de")], 0.52, fs=42)
        self.ligne([("soldats", WHITE, "soldats")], -0.06, fs=42, avec_k={0: [FadeOut(qm, scale=0.8)]})
        self.ligne([("le joueur :", TERME, "le joueur"), ("?", TERME, None)], -0.8, fs=42,
                   avec_k={0: [Indicate(pj, color=TERME)]})
        self.ligne([("l'ennemi :", RAISON, "l'ennemi"), ("?", RAISON, None)], -1.4, fs=42,
                   avec_k={0: [Indicate(pe, color=RAISON)]})
        self.appel_commentaire(-2.34)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin commune ──
        self.fin_short("05-abonne")

    def q_montrer_choix(self, cartes):
        """Les trois cadres prennent la place du dessin d'attente ; chaque lettre
        à « A : », chaque morceau de son contenu quand la voix le dit."""
        att = getattr(self, "_attente_q", None)
        if att is None:
            return super().q_montrer_choix(cartes)
        self._attente_q = None
        self.play(FadeOut(att, shift=DOWN * 0.15), *[FadeIn(c[0]) for c in cartes], run_time=0.3)
        for c, L in zip(cartes, "ABC"):
            self.suivre(f"{L} : ")
            self.play(FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            self.montrer_liste(c[1][1])
