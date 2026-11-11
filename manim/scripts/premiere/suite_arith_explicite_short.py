# suite_arith_explicite_short.py
# EleveAI — Maths 1re (sans spé) — short « La formule explicite : tu la trouves
# en 10 secondes ? » (9:16), ceinture BLANCHE (échelle entière sous le titre).
# Série SUITES, épisode 05. Micro du coach : lin_suite_explicite (vidéo commune
# avec suite_arithmetique, 1re spé).
#   · 00-garde      : le titre, l'échelle, « en 10 secondes ? » et un chrono ;
#   · 01-situation  : EN HAUT la trottinette roule, son compteur affiche 120 km,
#                     + 15 km chaque jour ; EN BAS les cases u₀ (120), u₁, u₂ … uₙ
#                     s'allument SOUS la trottinette, les flèches « + 15 » sautent
#                     EN MÊME TEMPS qu'elle avance ;
#   · 02-idee       : les flèches se regroupent en UN bloc orange « n × 15 » ;
#   · 03/03b        : question-pause (C : uₙ = 120 + 15n), 3 s ;
#   · 04-commentaire: « après 30 jours ? » puis « Réponds en commentaire ! »
#                     (réponse 570 km = 120 + 30 × 15, NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison, vert = juste.
# Voix : manim/voix/premiere-suite-arith-explicite-short.json (débit −6),
# calée par suite_arith_explicite_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_arith_explicite_short.py SuiteArithExpliciteShort -o eleveai-maths-premiere-suite-arith-explicite-short --media_dir manim/scripts/premiere/media-suite-arith-explicite-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403

assert 120 + 30 * 15 == 570                               # la question en commentaire
assert all(120 + 15 * n != 15 + 120 * n for n in (2, 3))  # A fausse (sauf n = 1)
XS = (-1.68, -0.84, 0.0, 0.84, 1.68)                      # u₀, u₁, u₂, …, uₙ
Y_ROUTE, Y_CASES = 0.42, -0.78


def chrono(r=0.9):
    cadran = Circle(radius=r, stroke_color=WHITE, stroke_width=7)
    bouton = RoundedRectangle(width=0.3, height=0.2, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).next_to(cadran, UP, buff=0.03)
    aiguille = Line(ORIGIN, UP * r * 0.8, stroke_color=RAISON, stroke_width=7)
    return VGroup(cadran, bouton), aiguille


def trottinette(s=1.0):
    """Une trottinette électrique de profil (roues posées sur l'origine)."""
    k = dict(stroke_color="#E2E8F0", stroke_width=7)
    roues = VGroup(*[Circle(radius=0.13, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                            stroke_width=4).move_to(P(x, 0.13)) for x in (-0.5, 0.5)])
    plateau = Line(P(-0.5, 0.2), P(0.36, 0.2), **k)
    tige = Line(P(0.36, 0.2), P(0.5, 1.0), **k)
    guidon = Line(P(0.38, 1.02), P(0.62, 1.0), stroke_color="#E2E8F0", stroke_width=8)
    batterie = RoundedRectangle(width=0.4, height=0.1, corner_radius=0.04, fill_color=JUSTE, fill_opacity=1,
                                stroke_width=0).move_to(P(-0.1, 0.27))
    return VGroup(plateau, tige, guidon, batterie, roues).scale(s, about_point=ORIGIN)


class SuiteArithExpliciteShort(ShortSuites):
    fichier_marques = "suite_arith_explicite_short_marques.json"
    nom_voix = "premiere-suite-arith-explicite-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def compteur(self, y=2.2):
        """Le compteur de la trottinette : un écran sombre, son nombre à part."""
        ecran = RoundedRectangle(width=3.7, height=0.72, corner_radius=0.12, fill_color="#111827", fill_opacity=1,
                                 stroke_color=GREY_B, stroke_width=3).move_to(P(0, y))
        return ecran

    def bloc_dessous(self, lg, i, j, texte, sauts, creux=0.3, fs=40):
        """Les flèches « + 15 » se regroupent SOUS les noms en un bloc orange."""
        y = min(n.get_bottom()[1] for n in lg.noms if n.original_text.strip()) - 0.08
        d, f = P(lg.cases[i][0].get_center()[0], y), P(lg.cases[j][0].get_center()[0], y)
        angle = 4 * np.arctan(2 * creux / np.linalg.norm(f - d))
        arc = CurvedArrow(d, f, angle=angle, color=RAISON, stroke_width=6, tip_length=0.18)
        lab = self.t(texte, fs, RAISON)
        boite = SurroundingRectangle(lab, color=RAISON, buff=0.1, stroke_width=3, corner_radius=0.08)
        bloc = VGroup(boite, lab).next_to(arc, DOWN, buff=0.06)
        copies = [s[1].copy() for s in sauts]
        self.add(*copies)
        self.play(*[c.animate.move_to(lab).set_opacity(0.6) for c in copies],
                  *[s.animate.set_opacity(0.3) for s in sauts], Create(arc), run_time=0.45)
        self.remove(*copies)
        self.play(FadeIn(lab, scale=1.5), Create(boite), run_time=0.25)
        return VGroup(arc, bloc)

    def ecrire_compteur(self, ecran, texte, ancien=None, fs=40, audit=True, jouer=True):
        tx = self.t(texte, fs, WHITE, larg=ecran.width - 0.3, audit=audit).move_to(ecran)
        if not jouer:  # les animations, à jouer avec d'autres
            return tx, [FadeOut(ancien, shift=UP * 0.15), FadeIn(tx, shift=UP * 0.15)]
        if ancien is None:
            self.play(FadeIn(tx, scale=1.3), run_time=0.25)
        else:
            self.play(FadeOut(ancien, shift=UP * 0.15), FadeIn(tx, shift=UP * 0.15), run_time=0.25)
        return tx

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari en gros ──
        self.dire("00-garde")
        self.entete("La formule explicite", extrait="formule")
        pari = self.paragraphe(["Tu paries que", "tu la trouves", ("en 10 secondes ?", RAISON)], self.fs_grand,
                               buff=0.2, y=1.35)
        for ligne, ex in zip(pari, ("Tu paries", "tu la", "10 secondes")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.3)
        cad, aig = chrono(0.85)
        VGroup(cad, aig).move_to(P(0, -1.6))
        aig.shift(cad[0].get_center() - aig.get_start())
        self.play(FadeIn(cad, scale=0.7), FadeIn(aig), run_time=0.3)
        self.play(Rotate(aig, -TAU, about_point=cad[0].get_center()), run_time=1.0, rate_func=linear)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT la trottinette roule ; EN BAS les cases sous elle ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        ecran = self.compteur(2.2)
        self.au_mot("compteur")
        self.play(FadeIn(ecran, scale=0.8), run_time=0.3)
        route = Line(P(-2.05, Y_ROUTE), P(2.05, Y_ROUTE), stroke_color=GREY_B, stroke_width=4)
        tr = trottinette(0.78).move_to(P(-1.55, Y_ROUTE), aligned_edge=DOWN)  # dans la marge
        self.au_mot("trottinette")
        self.play(Create(route), FadeIn(tr, shift=RIGHT * 0.3), run_time=0.4)
        lg = LigneTermes(["120", "", "", "", ""], xs=XS, centre=P(0, Y_CASES), largeur=0.72, hauteur=0.62, fs=36,
                         noms=[u(0), u(1), u(2), "", u("n")], fs_noms=30)
        c3 = lg.cases[3]
        c3[0].set_stroke(opacity=0).set_fill(opacity=0)
        pts = Text("…", font_size=40, color=GREY_A).move_to(c3[0])
        c3.remove(c3[1])
        c3.add(pts)
        self.suivre("120")
        km = self.ecrire_compteur(ecran, "120 km")
        self.play(FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.cases[0][1], scale=1.4), run_time=0.25)
        self.au_mot("Chaque jour")
        cj = self.t("chaque jour :", 40, GREY_A, larg=1e9)
        p15 = self.t("+ 15 km", 44, RAISON, larg=1e9)
        lj = VGroup(cj, p15).arrange(RIGHT, buff=0.2)
        lj.scale_to_fit_width(min(lj.width, 4.0)).move_to(P(0, 1.5))
        self.play(FadeIn(cj, shift=UP * 0.1), run_time=0.25)
        self.suivre("15")
        self.play(FadeIn(p15, scale=1.3), run_time=0.25)
        sauts = []
        textes = ["120 + 15", "120 + 15 + 15", "120 + 15 + 15 + …", "120 + 15 + 15 + …"]
        for k in range(4):
            s = lg.saut(k, "+15", cote=UP, fs=22, creux=0.2)
            s[1]._pas_audit = True  # « + 15 » : dit juste avant, la flèche suit la trottinette
            sauts.append(s)
            cible = lg.cases[k + 1]
            x = min(XS[k + 1], 1.55)  # la trottinette reste dans la marge
            anims = [Create(s[0]), FadeIn(s[1], scale=1.3), tr.animate.move_to(P(x, Y_ROUTE), aligned_edge=DOWN)]
            anims.append(FadeIn(cible) if k == 2 else FadeIn(cible[0], scale=0.8))
            if k < 3:  # 120 et 15 déjà dits : le compteur suit la trottinette
                km, a = self.ecrire_compteur(ecran, textes[k], km, fs=38, audit=False, jouer=False)
                anims += a
            self.play(*anims, run_time=0.3, rate_func=smooth)
        self.au_mot("On note")
        l1 = self.t("uₙ : le kilométrage", 40, WHITE).move_to(P(0, -2.05))
        l2 = self.t("après n jours", 40, RAISON).move_to(P(0, -2.6))
        self.play(*[FadeIn(lg.noms[k]) for k in (0, 1, 2, 4)], run_time=0.3)
        self.au_mot("kilométrage")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("après n jours")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("u indice 0")
        self.play(Indicate(VGroup(lg.cases[0], lg.noms[0]), color=TERME, scale_factor=1.3), run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 02 : n flèches « + 15 » = un bloc « n × 15 » ──
        self.dire("02-idee")
        self.play(FadeOut(l1), FadeOut(l2), run_time=0.25)
        self.au_mot("n fois")
        self.suivre("15")
        self.bloc_dessous(lg, 0, 4, "n × 15", sauts)
        km = self.ecrire_compteur(ecran, "120 + n × 15", km, fs=38, audit=False)  # 120 : dit à l'écran d'avant
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → C ──
        choix = ["15 + 120n", "120 × 15ⁿ", "120 + 15n"]   # « uₙ = » écrit une fois, dans la question
        # boutons resserrés pour cette question : « Mets pause » reste au-dessus de Ti-Margo
        self.buff_boutons = 0.12
        q = self.poser_question("03-question", [(self.t("Quelle est la", 40), "Quelle"),
                                                (self.t("formule explicite ?", 40), "formule"),
                                                (self.t("uₙ = …", 44, TERME), None)],
                                choix, 2, y_question=2.9, fs=42)
        self.buff_boutons = ShortSuites.buff_boutons
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 2)
        c = q.cartes[2]
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), FadeOut(q.question), run_time=0.25)
        self.play(VGroup(c, ok).animate.shift(P(0, 2.0) - c.get_center()), run_time=0.3)
        corps = c[1][1]                       # « 120+15n » : 1 2 0 + 1 5 n
        self.au_mot("premier terme")
        pt = self.t("le premier terme", 38, TERME).move_to(P(0, 0.75))
        self.play(FadeIn(pt, shift=UP * 0.1), run_time=0.3)
        self.suivre("120")
        u0 = self.t("u₀ = 120", 56, TERME).move_to(P(0, 0.05))
        self.play(FadeIn(u0, scale=1.3), corps[0:3].animate.set_color(TERME), run_time=0.3)
        self.au_mot("raison")
        ra = self.t("la raison", 38, RAISON).move_to(P(0, -0.95))
        self.play(FadeIn(ra, shift=UP * 0.1), run_time=0.3)
        self.suivre("15")
        r15 = self.t("r = 15", 56, RAISON).move_to(P(0, -1.65))
        self.play(FadeIn(r15, scale=1.3), corps[4:].animate.set_color(RAISON), run_time=0.3)
        self.insister(VGroup(u0, r15), 1.08)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        ec2 = self.compteur(2.3)
        inc = self.t("? km", 44, RAISON).move_to(ec2)
        route2 = Line(P(-1.6, 1.15), P(1.6, 1.15), stroke_color=GREY_B, stroke_width=4)
        tr2 = trottinette(0.6).move_to(P(-0.9, 1.15), aligned_edge=DOWN)
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(ec2), FadeIn(inc), Create(route2), FadeIn(tr2), run_time=0.4)
        question = self.paragraphe([("Combien de", RAISON), ("kilomètres", RAISON), "affiche le compteur",
                                    ("après 30 jours ?", RAISON)], 46, buff=0.22, y=-0.4)
        for ligne, ex in zip(question, ("combien", "kilomètres", "affiche", "30 jours")):
            self.au_mot(ex)
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if ex == "30 jours":
                anims += [tr2.animate.move_to(P(0.9, 1.15), aligned_edge=DOWN), Indicate(inc, color=RAISON)]
            self.play(*anims, run_time=0.35)
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
