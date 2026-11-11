# suite_geo_recurrence_short.py
# EleveAI — Maths 1re (sans spé) — short « Récurrence géométrique : tu paries
# que tu écris la bonne relation ? » (9:16), ceinture BLANCHE (échelle entière
# sous le titre). Série SUITES, épisode 10. Micro : expo_suite_recurrence.
#   · 00-garde      : le titre, l'échelle, le pari en gros, deux pions d'échecs ;
#   · 01-situation  : EN HAUT l'écran du tournoi en ligne et les joueurs (pions) :
#                     16 → 8 → 4, la moitié éliminée (rouge) à chaque tour ; EN
#                     BAS, sous chaque groupe, sa case 1 024, 512, 256 (EN MÊME TEMPS) ;
#   · 02-idee       : les cases montent, u₀ u₁ u₂, les flèches « ÷ 2 » qui sautent ;
#   · 03/03b        : question-pause (A : uₙ₊₁ = 0,5 × uₙ), 3 s ; la moitié du
#                     disque s'en va : ÷ 2 = × 0,5 ;
#   · 04-commentaire: u₀ = 1 024, quatre sauts, u₄ = ? « Réponds en commentaire ! »
#                     (réponse 1 024 ÷ 2⁴ = 64, NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison, vert = juste,
# rouge = éliminés.
# Voix : manim/voix/premiere-suite-geo-recurrence-short.json (débit −6),
# calée par suite_geo_recurrence_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_geo_recurrence_short.py SuiteGeoRecurrenceShort -o eleveai-maths-premiere-suite-geo-recurrence-short --media_dir manim/scripts/premiere/media-suite-geo-recurrence-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_recurrence import AuditMilliers, OutilsEp02, arc_fleche  # noqa: E402
from suite_geo_recurrence import ligne_reguliere  # noqa: E402

assert [1024 // 2 ** k for k in range(3)] == [1024, 512, 256]
assert 1024 * 0.5 ** 4 == 64                             # le commentaire (non affiché)
XS = (-1.25, 0.21, 1.46)                                  # groupes de pions et cases : mêmes abscisses
NOIR_C, BLANC_C = "#334155", "#CBD5E1"


def pion(s=1.0, couleur=WHITE):
    """Un pion d'échecs (pied à l'origine)."""
    socle = RoundedRectangle(width=0.34, height=0.07, corner_radius=0.03, fill_color=couleur, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.035))
    corps = Polygon(P(-0.14, 0.07), P(0.14, 0.07), P(0.06, 0.26), P(-0.06, 0.26), fill_color=couleur,
                    fill_opacity=1, stroke_width=0)
    col = Ellipse(width=0.2, height=0.06, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.27))
    tete = Circle(radius=0.085, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.36))
    return VGroup(socle, corps, col, tete).scale(s, about_point=ORIGIN)


def groupe(n, x, y0, s=0.72, couleur=WHITE, cols=4, dx=0.26, dy=0.27):
    """n pions en rangées de `cols`, posés sur la ligne y0 (rangée du bas d'abord)."""
    g = VGroup()
    for k in range(n):
        r, c = divmod(k, cols)
        g.add(pion(s, couleur).move_to(P(x + (c - (cols - 1) / 2) * dx, y0 + r * dy), aligned_edge=DOWN))
    return g


def ordinateur(s=1.0):
    """L'écran du tournoi en ligne : un portable, un échiquier 4 × 4 et un pion."""
    ecran = RoundedRectangle(width=1.9, height=1.2, corner_radius=0.08, fill_color="#0F172A", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=3).move_to(P(0, 0.75))
    cases = VGroup(*[Square(0.22, fill_color=BLANC_C if (i + j) % 2 == 0 else NOIR_C, fill_opacity=1,
                            stroke_width=0).move_to(P(-0.33 + 0.22 * i, 0.42 + 0.22 * j))
                     for i in range(4) for j in range(4)])
    roi = pion(0.6, RAISON).move_to(P(0.11, 0.53), aligned_edge=DOWN)
    clavier = Polygon(P(-1.1, 0.12), P(1.1, 0.12), P(1.25, -0.02), P(-1.25, -0.02), fill_color=GREY_B,
                      fill_opacity=1, stroke_width=0)
    return VGroup(ecran, cases, roi, clavier).scale(s)


def deux_lignes(a, b, fs=36):
    """Un choix de bouton sur deux lignes (la formule garde la taille de la
    question) ; original_text : les nombres se montrent quand la voix les dit."""
    g = VGroup(Text(a, font_size=fs, color=WHITE), Text(b, font_size=fs, color=WHITE))
    g.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
    g.original_text = a + " " + b
    return g


class SuiteGeoRecurrenceShort(AuditMilliers, OutilsEp02, ShortSuites):
    fichier_marques = "suite_geo_recurrence_short_marques.json"
    nom_voix = "premiere-suite-geo-recurrence-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"
    place_coche = 0.78            # la coche du bouton allumé ne touche pas la formule
    hauteur_bouton = 1.15         # formules sur deux lignes : une marge en haut et en bas

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari en gros ──
        self.dire("00-garde")
        self.entete("Récurrence géométrique", extrait="Récurrence", fs=42)
        pari = self.paragraphe(["Tu paries que", "tu écris la bonne", ("relation ?", RAISON)], self.fs_grand,
                               buff=0.2, y=1.45)
        for ligne, ex in zip(pari, ("Tu paries", "tu écris", "relation ?")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.3)
        p1, p2 = pion(3.2, WHITE).move_to(P(-0.8, -1.9), aligned_edge=DOWN), pion(3.2, RAISON).move_to(
            P(0.8, -1.9), aligned_edge=DOWN)
        self.play(FadeIn(p1, shift=RIGHT * 0.4), FadeIn(p2, shift=LEFT * 0.4), run_time=0.4)
        self.play(p2.animate.shift(UP * 0.3), rate_func=there_and_back, run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT le tournoi et ses joueurs ; EN BAS les cases dessous ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        pc = ordinateur(0.8).move_to(P(-0.95, 1.95))
        self.au_mot("tournoi")
        self.play(FadeIn(pc, shift=UP * 0.2), run_time=0.45)
        nb = self.t("1 024", 46, TERME).move_to(P(1.1, 2.15))
        jo = self.t("joueurs", 34, WHITE).next_to(nb, DOWN, buff=0.12)
        Y0 = 0.15
        g0 = groupe(16, XS[0], Y0)
        # mêmes chiffres partout (fs 30) ; la case de 1 024 plus large (1,42), les deux autres 1,0
        lg = LigneTermes(["1 024", "512", "256"], xs=XS, centre=P(0, -0.55), largeur=1.42, hauteur=0.66, fs=30)
        for k in (1, 2):
            etroite = RoundedRectangle(width=1.0, height=0.66, corner_radius=0.12, stroke_color=TERME, stroke_width=3,
                                       fill_color=FOND_CARTE, fill_opacity=1).move_to(lg.cases[k][0])
            lg.cases[k].submobjects[0] = etroite
        self.au_mot("1 024")
        self.play(FadeIn(nb, scale=1.3), LaggedStart(*[FadeIn(p, shift=DOWN * 0.1) for p in g0], lag_ratio=0.03),
                  FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.cases[0][1], scale=1.3), run_time=0.5)
        self.au_mot("joueurs")
        self.play(FadeIn(jo, shift=UP * 0.1), run_time=0.3)
        l1 = self.t("À chaque tour,", 38).move_to(P(0, -1.7))
        l2 = self.t("la moitié est éliminée", 38, PIEGE).move_to(P(0, -2.3))
        self.au_mot("À chaque tour")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("la moitié")
        self.play(FadeIn(l2, shift=UP * 0.1), *[p.animate.set_color(PIEGE) for p in g0[8:]], run_time=0.4)
        self.au_mot("1 024", n=2)
        self.play(Indicate(lg.cases[0][0], color=TERME, scale_factor=1.12), run_time=0.35)
        grs = [g0]
        for k, n in ((1, 8), (2, 4)):
            prec = grs[-1]
            neuf = groupe(n, XS[k], Y0)
            self.suivre(lg.valeurs[k])
            self.play(FadeOut(prec[n:], shift=DOWN * 0.25), TransformFromCopy(prec[:n], neuf),
                      FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.3), run_time=0.45)
            if k == 1:
                self.play(*[p.animate.set_color(PIEGE) for p in neuf[4:]], run_time=0.25)
            grs.append(neuf)
        self.attendre_voix(marge=0.2)

        # ── 02 : l'idée : on divise par 2 ──
        self.dire("02-idee")
        self.play(FadeOut(VGroup(pc, nb, jo, *grs, l1, l2)), run_time=0.25)
        self.play(lg.animate.shift(UP * 2.0), run_time=0.4)
        noms = VGroup(*[self.t(u(k), 32, GREY_A).next_to(lg.cases[k][0], DOWN, buff=0.12) for k in range(3)])
        self.au_mot("u indice n")
        self.play(LaggedStart(*[FadeIn(n_, shift=UP * 0.08) for n_ in noms], lag_ratio=0.2), run_time=0.4)
        df = self.paragraphe([("uₙ : les joueurs", TERME), "après n tours"], 40, buff=0.12, y=0.05)
        self.au_mot("le nombre")
        self.play(FadeIn(df, shift=UP * 0.1), run_time=0.35)
        self.au_mot("on divise par")
        self.suivre("2")
        sauts = [lg.saut(k, "÷ 2", cote=UP, fs=30, creux=0.2) for k in range(2)]
        div = self.t("on divise par 2", 38, RAISON).move_to(P(0, -1.95))
        self.play(LaggedStart(*[AnimationGroup(Create(s_[0]), FadeIn(s_[1], scale=1.3)) for s_ in sauts],
                              lag_ratio=0.3), FadeIn(div, scale=1.2), run_time=0.5)
        self.insister(div, 1.08)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → A ──
        l1 = self.paragraphe(["Quelle relation", "vérifie la suite ?"], 36, buff=0.1)
        choix = [deux_lignes("uₙ₊₁ =", b) for b in ("0,5 × uₙ", "uₙ − 2", "uₙ − 0,5")]
        q = self.poser_question("03-question", [(l1, "Quelle relation")], choix, 0, y_question=2.85, fs=36)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 0)
        a = q.cartes[0]
        disque = VGroup(Sector(radius=1.05, start_angle=PI / 2, angle=PI, fill_color=TERME, fill_opacity=1,
                               stroke_color=WHITE, stroke_width=3),
                        Sector(radius=1.05, start_angle=-PI / 2, angle=PI, fill_color=TERME, fill_opacity=1,
                               stroke_color=WHITE, stroke_width=3)).move_to(P(0, -0.62))
        self.au_mot("Diviser par")
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), VGroup(a, ok).animate.shift(P(0, 1.2) - a.get_center()),
                  GrowFromCenter(disque), run_time=0.35)
        self.suivre("2")
        d2, eg, m5 = ligne_reguliere([("÷ 2", RAISON), ("=", WHITE), ("× 0,5", JUSTE)], 42)
        m5.shift(RIGHT * 0.12)                            # la place de l'encadré, sans coller le « = »
        ligne = VGroup(d2, eg, m5).move_to(P(0, -2.3)).shift(LEFT * 0.07)  # l'encadré de « × 0,5 » compris : centré
        self.play(disque[1].animate.set_fill(PIEGE).shift(RIGHT * 0.45 + DOWN * 0.15), FadeIn(d2, scale=1.3),
                  run_time=0.4)
        self.play(FadeOut(disque[1], shift=RIGHT * 0.4), disque[0].animate.shift(RIGHT * 0.52), run_time=0.4)
        self.au_mot("multiplier par")
        self.suivre("0,5")
        cad = self.encadre(m5, JUSTE, 0.12)
        moitie = self.t("0,5", 30, WHITE, audit=False).move_to(disque[0].get_center() + RIGHT * 0.1)
        self.play(FadeIn(eg), FadeIn(m5, scale=1.3), Create(cad), FadeIn(moitie, scale=1.3), run_time=0.35)
        self.insister(VGroup(m5, cad), 1.08)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        pc2 = ordinateur(0.7).move_to(P(0, 2.05))
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(pc2, shift=UP * 0.2), run_time=0.4)
        c0 = LigneTermes(["1 024"], xs=(-1.25,), centre=P(0, 0.3), largeur=1.6, hauteur=0.7, fs=36, noms=[u(0)],
                         fs_noms=30)
        c4 = LigneTermes(["?"], xs=(1.45,), centre=P(0, 0.3), largeur=1.0, hauteur=0.7, fs=40, noms=[u(4)],
                         fs_noms=30)
        self.au_mot("1 024")
        self.play(FadeIn(c0, scale=0.9), run_time=0.35)
        xa, xb, yh = -1.25, 1.45, c0.cases[0][0].get_top()[1] + 0.06
        pts = [P(xa + (xb - xa) * k / 4, yh) for k in range(5)]
        sauts = [arc_fleche(pts[k], pts[k + 1], UP, creux=0.16, epais=3) for k in range(4)]
        relais = VGroup(*[Dot(pts[k], radius=0.05, color=GREY_B) for k in (1, 2, 3)])
        self.au_mot("Combien")
        q4 = self.paragraphe([("Combien en reste-t-il", RAISON), ("après 4 tours ?", RAISON)], 44, buff=0.1,
                             y=-1.05)
        self.play(FadeIn(c4, scale=1.2), FadeIn(q4[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("4 tours")
        quatre = self.t("4 tours", 32, RAISON, audit=False).move_to(P((xa + xb) / 2, yh + 0.55))
        self.play(LaggedStart(*[Create(s_) for s_ in sauts], lag_ratio=0.5), FadeIn(relais),
                  FadeIn(q4[1], shift=UP * 0.1), FadeIn(quatre), run_time=0.6)
        self.play(Indicate(c4.cases[0], color=RAISON, scale_factor=1.2), run_time=0.4)
        self.appel_commentaire(-2.45)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
