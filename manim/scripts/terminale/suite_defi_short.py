# suite_defi_short.py
# EleveAI — Maths Terminale (spé) — short « Où se stabilise un parc de vélos ? »
# (9:16), ceinture BLANCHE (échelle entière sous le titre). Série SUITES du
# lycée, épisode 32. Micro du coach : suite_defi (le point fixe ℓ = a ℓ + b :
# fixed_3, fixed_4, h1, genDefiPointFixe).
#   · 00-garde      : le titre, l'échelle (70 %), le pari en gros, le vélo qui roule ;
#   · 01-situation  : EN HAUT Hugo (il gère les vélos en libre-service), la
#                     station : la moitié des vélos part en réparation (orange),
#                     400 neufs arrivent (verts) ; EN BAS, dès Hugo, la formule à
#                     trous « uₙ₊₁ = [ ] uₙ + [ ] » qui se remplit EN MÊME TEMPS ;
#   · 02-point-fixe : le parc ne bouge plus (autant de départs que d'arrivées),
#                     « ℓ = 0,5 ℓ + 400 » ;
#   · 03/03b        : question-pause (B : 800), 3 s ; la barre de 800 vélos dont
#                     la moitié (400) part et 400 reviennent ;
#   · 04-commentaire: − 20 % et + 300 chaque mois : où se stabilise le parc ?
#                     « Réponds en commentaire ! » (réponse 1 500, NON affichée) ;
#   · 05-abonne     : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = ce qui part (la raison),
# vert = juste (et ce qui arrive), jaune = le point fixe ℓ.
# Voix : manim/voix/terminale-suite-defi-short.json (débit −6), calée par
# suite_defi_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_defi_short.py SuiteDefiShort -o eleveai-maths-terminale-suite-defi-short --media_dir manim/scripts/terminale/media-suite-defi-short

import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_defi import avance_morceaux, glyphes, grossir_indices  # noqa: E402

assert 0.5 * 800 + 400 == 800 and 800 - 0.5 * 800 == 400          # la réponse B : ℓ = 800
assert abs(0.8 * 1500 + 300 - 1500) < 1e-9                        # le commentaire : 1 500 (non affiché)
VELO, PEAU, GILET = "#38BDF8", "#c68642", "#F97316"


def velo(s=1.0, couleur=VELO):
    """Un vélo : deux roues (g[0], g[1], avec leurs rayons), le cadre, la selle, le guidon."""
    roues = [VGroup(Circle(radius=0.22, stroke_color=GREY_A, stroke_width=3),
                    Line(P(-0.2, 0), P(0.2, 0), stroke_color=GREY_B, stroke_width=1.5),
                    Line(P(0, -0.2), P(0, 0.2), stroke_color=GREY_B, stroke_width=1.5)).move_to(P(x, 0))
             for x in (-0.33, 0.33)]
    cadre = VMobject(stroke_color=couleur, stroke_width=4).set_points_as_corners(
        [P(-0.33, 0), P(-0.05, 0.32), P(0.25, 0.32), P(0.33, 0), P(0.0, 0), P(-0.05, 0.32)])
    selle = Line(P(-0.15, 0.42), P(0.02, 0.42), stroke_color=WHITE, stroke_width=5)
    tige = Line(P(-0.05, 0.32), P(-0.06, 0.42), stroke_color=couleur, stroke_width=4)
    guidon = Line(P(0.25, 0.32), P(0.3, 0.46), stroke_color=couleur, stroke_width=4)
    return VGroup(roues[0], roues[1], cadre, tige, selle, guidon).scale(s)


def hugo(s=1.0):
    """Hugo : casquette, gilet orange de l'équipe des vélos, une clé à molette."""
    tete = Circle(radius=0.28, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.95))
    casq = Sector(radius=0.3, angle=PI, start_angle=0, fill_color=VELO, fill_opacity=1, stroke_width=0)
    casq.move_to(P(0, 1.15))
    visiere = RoundedRectangle(width=0.34, height=0.07, corner_radius=0.03, fill_color=VELO, fill_opacity=1,
                               stroke_width=0).move_to(P(0.2, 1.12))
    corps = RoundedRectangle(width=0.95, height=1.1, corner_radius=0.26, fill_color=GILET, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.1))
    bande = Rectangle(width=0.95, height=0.08, fill_color="#FEF08A", fill_opacity=1, stroke_width=0).move_to(P(0, 0.05))
    return VGroup(corps, bande, tete, casq, visiere).scale(s)


def cle(s=1.0, couleur=RAISON):
    return VGroup(Line(P(-0.25, -0.25), P(0.15, 0.15), stroke_color=couleur, stroke_width=7),
                  Arc(radius=0.12, start_angle=-PI / 4, angle=3 * PI / 2, stroke_color=couleur,
                      stroke_width=6).move_to(P(0.22, 0.22))).scale(s)


def trou(l=1.3, h=0.8, couleur=GREY_B):
    """Une case à remplir, en pointillé."""
    return DashedVMobject(RoundedRectangle(width=l, height=h, corner_radius=0.12, stroke_color=couleur,
                                           stroke_width=3), num_dashes=24)


class SuiteDefiShort(ShortSuites):
    fichier_marques = "suite_defi_short_marques.json"
    nom_voix = "terminale-suite-defi-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"
    Y_TITRE, Y_ECHELLE = 3.56, 2.86      # de l'air entre le titre et l'échelle des ceintures

    def t(self, texte, fs=36, color=WHITE, larg=None, audit=True):
        """Comme le module commun, avec les indices agrandis (× 1,3)."""
        t = grossir_indices(Text(texte, font_size=fs, color=color), texte)
        larg = larg or self.largeur_texte
        if t.width > larg:
            t.scale_to_fit_width(larg)
        if not audit:
            t._pas_audit = True
        return t

    def construire(self, morceaux, fs=40, larg=None):
        tout = self.t(" ".join(m for m, _, _ in morceaux), fs, WHITE, larg)
        g, i = VGroup(), 0
        for m, c, _ in morceaux:
            n = len(glyphes(m))
            g.add(VGroup(*tout.submobjects[i:i + n]).set_color(c))
            i += n
        g.extraits = [ex for _, _, ex in morceaux]
        g.textes = [m for m, _, _ in morceaux]
        return g

    def montrer(self, g, avec=(), rt=0.25, avec_k=None):
        avec_k = avec_k or {}
        paquet = []

        def jouer(fin=()):
            avance_morceaux(self, [g.textes[k] for k in paquet if hasattr(g, "textes")])
            anims = [FadeIn(g[k], shift=UP * 0.1) for k in paquet]
            for k in paquet:
                anims += list(avec_k.get(k, ()))
            self.play(*anims, *fin, run_time=rt if fin else 0.22)
        for k, ex in enumerate(g.extraits):
            if ex is not None and paquet:
                jouer()
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(k)
        jouer(list(avec) or [Wait(0.01)])
        return g

    def ligne(self, morceaux, y, fs=40, avec=(), larg=None, avec_k=None, rt=0.25):
        return self.montrer(self.construire(morceaux, fs, larg).move_to(P(0, y)), avec, rt=rt, avec_k=avec_k)

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

    def rouler(self, v, dx, rt=0.6):
        """Le vélo avance de dx, ses deux roues tournent (sans glisser)."""
        r = v[0][0].width / 2
        etat = {"a": 0.0}

        def maj(m, a):
            d = a - etat["a"]
            etat["a"] = a
            m.shift(RIGHT * dx * d)
            for k in (0, 1):
                m[k].rotate(-dx * d / r, about_point=m[k][0].get_center())
        return UpdateFromAlphaFunc(v, maj, run_time=rt)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari, le vélo qui roule ──
        self.dire("00-garde")
        self.entete("Suites", extrait="Suites")
        pari = self.paragraph_pari()
        v0 = velo(1.3).move_to(P(-1.2, -2.15))       # dès le départ : le bas de l'écran n'est jamais vide
        sol = Line(P(-2.0, -2.5), P(2.0, -2.5), stroke_color=GREY_D, stroke_width=3)
        for l, ex in zip(pari, ("Tu paries", "tu trouves", "se stabilise", "un parc", "sans calculer", "un seul")):
            self.au_mot(ex)
            anims = [FadeIn(l, shift=UP * 0.1)]
            if ex == "Tu paries":
                anims += [FadeIn(v0, shift=RIGHT * 0.3), Create(sol)]
            self.play(*anims, run_time=0.25)
            if ex == "un parc":
                self.play(self.rouler(v0, 1.1, 0.8), run_time=0.8)
        self.play(self.rouler(v0, 1.3, 0.9), Indicate(pari[5], color=JUSTE, scale_factor=1.08), run_time=0.9)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT Hugo et la station ; EN BAS la formule à trous, EN MÊME TEMPS ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        perso = hugo(0.62)
        nom = self.t("Hugo", 44, JAUNE_TITRE)
        metier = VGroup(self.t("gère les vélos", 28, TERME), self.t("en libre-service", 28, TERME))
        metier.arrange(DOWN, buff=0.06, aligned_edge=LEFT)
        textes = VGroup(nom, metier).arrange(DOWN, buff=0.1, aligned_edge=LEFT)
        VGroup(perso, textes).arrange(RIGHT, buff=0.3).move_to(P(0, 1.72))
        lA = self.t("uₙ₊₁ =", 46, TERME, audit=False).move_to(P(0, -1.3))
        t1, t2 = trou(1.62, 0.8), trou(0.98, 0.8)
        mil = self.t("uₙ +", 37, TERME, audit=False)
        lB = VGroup(t1, mil, t2).arrange(RIGHT, buff=0.1).move_to(P(0, -2.25))
        self.au_mot("Hugo")
        self.play(FadeIn(perso, shift=UP * 0.1), FadeIn(nom, shift=UP * 0.1), FadeIn(lA), FadeIn(mil), Create(t1),
                  Create(t2), run_time=0.3)
        velos = VGroup(*[velo(0.5) for _ in range(6)]).arrange(RIGHT, buff=0.12).move_to(P(0, 0.3))
        self.au_mot("gère les vélos")
        self.play(FadeIn(metier[0], shift=UP * 0.08), LaggedStart(*[FadeIn(v, shift=RIGHT * 0.2) for v in velos],
                                                                  lag_ratio=0.12), run_time=0.5)
        self.au_mot("en libre-service")
        self.play(FadeIn(metier[1], shift=UP * 0.08), run_time=0.3)
        partent, restent = velos[:3], velos[3:]
        moitie = self.t("la moitié", 22, RAISON).move_to(t1)
        self.au_mot("la moitié")
        self.play(*[v[2].animate.set_stroke(RAISON) for v in partent], *[v[3].animate.set_stroke(RAISON) for v in partent],
                  *[v[5].animate.set_stroke(RAISON) for v in partent], t1.animate.set_stroke(RAISON),
                  FadeIn(moitie, scale=1.3), run_time=0.35)
        rep = VGroup(cle(0.7), self.t("réparation", 24, RAISON)).arrange(RIGHT, buff=0.12).move_to(P(0, -0.5)).align_to(P(-1.98, 0), LEFT)
        self.au_mot("réparation")
        self.play(FadeIn(rep, shift=UP * 0.08), partent.animate.shift(DOWN * 0.15).set_opacity(0.3),
                  run_time=0.45)
        neufs = VGroup(*[velo(0.5, JUSTE) for _ in range(3)])
        for v, w in zip(neufs, partent):
            v.move_to(w.get_center() + UP * 0.15)
        cible = [v.get_center() for v in neufs]
        for v in neufs:
            v.shift(RIGHT * 0.6)
            v.set_opacity(0)
        plus = VGroup(self.t("+ 400", 26, JUSTE), self.t("neufs", 24, JUSTE)).arrange(DOWN, buff=0.04)
        plus.move_to(P(0, -0.5)).align_to(P(1.98, 0), RIGHT)
        q400 = self.t("400", 34, JUSTE).move_to(t2)
        self.suivre("400")
        self.play(FadeOut(partent), FadeIn(plus, shift=UP * 0.08),
                  FadeIn(q400, scale=1.3), t2.animate.set_stroke(JUSTE), run_time=0.3)
        self.play(*[v.animate.move_to(c).set_opacity(1) for v, c in zip(neufs, cible)], run_time=0.6)
        self.au_mot("u indice n plus 1")
        self.play(Indicate(lA, color=TERME, scale_factor=1.12), run_time=0.35)
        q05 = self.t("0,5", 36, RAISON).move_to(t1)
        self.suivre("0,5")
        self.play(ReplacementTransform(moitie, q05), run_time=0.3)
        self.suivre("400")
        self.play(Indicate(q400, color=JUSTE, scale_factor=1.25), run_time=0.35)
        self.attendre_voix(marge=0.2)
        self._s01 = (perso, nom, metier, velos, rep, plus, neufs, lA, lB, q05, q400)

        # ── 02 : le point fixe : le parc ne bouge plus ──
        perso, nom, metier, velos, rep, plus, neufs, lA, lB, q05, q400 = self._s01
        avant = [lA, *lB, q05, q400]                       # la formule du bas reste : elle devient ℓ = 0,5 ℓ + 400
        self.nouvel_ecran("02-point-fixe", garder=(self.badge, self.titre_s, *avant))
        Y = 1.5
        row = VGroup(*[velo(0.5) for _ in range(5)]).arrange(RIGHT, buff=0.16).move_to(P(0, Y))
        pas = row[1].get_center()[0] - row[0].get_center()[0]
        sort = Arrow(P(-1.4, Y - 0.62), P(-2.05, Y - 0.62), buff=0, color=RAISON, stroke_width=6, tip_length=0.18)
        entre = Arrow(P(2.05, Y - 0.62), P(1.4, Y - 0.62), buff=0, color=JUSTE, stroke_width=6, tip_length=0.18)
        self.play(FadeIn(row), GrowArrow(sort), GrowArrow(entre), run_time=0.35)
        st = self.construire([("Parc stable :", WHITE, "se stabilise"), ("ℓ", JAUNE_TITRE, "valeur l")], 46)
        st.move_to(P(0, 0.2))
        f = self.construire([("ℓ =", JAUNE_TITRE, "alors l"), ("0,5 ℓ", RAISON, "0,5"), ("+ 400", JUSTE, "400")], 54, 3.7)
        f.move_to(P(0, -1.5))

        def cycle():
            """Un vélo part à gauche, un neuf arrive à droite : le parc garde le même nombre."""
            neuf = velo(0.5, JUSTE).move_to(row[-1].get_center())
            self.play(row[0].animate.shift(DOWN * 0.4).set_opacity(0), *[v.animate.shift(LEFT * pas) for v in row[1:]],
                      FadeIn(neuf, shift=LEFT * 0.3), run_time=0.7)
            self.remove(row[0])
            row.remove(row[0])
            row.add(neuf)
        self.montrer(st)
        cycle()
        self.au_mot("alors l")
        self.play(ReplacementTransform(VGroup(*avant), f), run_time=0.5)
        self.suivre("0,5")
        self.play(Indicate(f[1], color=RAISON, scale_factor=1.15), run_time=0.3)
        self.suivre("400")
        self.play(Indicate(f[2], color=JUSTE, scale_factor=1.15), run_time=0.3)
        cad = self.encadre(f, JAUNE_TITRE, 0.2)
        self.play(Create(cad), run_time=0.3)
        cycle()
        self.attendre_voix(marge=0.2)

        # ── 03 : question-pause → B (800) ──
        rappel = self.t("ℓ = 0,5 ℓ + 400", 34, JAUNE_TITRE, audit=False)       # l'équation de l'écran d'avant
        que = self.t("Que vaut ℓ ?", 40)

        def attente():
            """Le bas ne reste pas vide : un parc « ? » jusqu'aux cadres des boutons."""
            parc = VGroup(*[velo(0.7, GREY_B) for _ in range(3)]).arrange(RIGHT, buff=0.2)
            qm = self.t("?", 90, JAUNE_TITRE, audit=False)
            self._attente_q = VGroup(parc, qm).arrange(DOWN, buff=0.3).move_to(P(0, -1.1))
            self.play(FadeIn(self._attente_q, shift=UP * 0.15), run_time=0.3)
        q = self.poser_question("03-question", [(rappel, None), (que, "Que vaut")], ["400", "800", "200"], 1,
                                dessin=attente)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 1)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), VGroup(q.cartes[1], ok).animate.move_to(q.cartes[0]),
                  run_time=0.3)
        y = q.cartes[0].get_center()[1]
        e1 = self.construire([("0,5 ℓ", RAISON, "0,5"), ("= 400", WHITE, "400")], 39).move_to(P(0, y - 1.1))
        e2 = self.construire([("donc", GREY_A, "donc"), ("ℓ = 800", JUSTE, "800")], 39)
        e2[1].shift(RIGHT * 0.14)                     # de l'air entre « donc » et le cadre
        e2.move_to(P(0, y - 2.0))
        # la barre des 800 vélos : une moitié (400) part, 400 neufs la remplacent
        yb = y - 3.05
        moitie_g = Rectangle(width=1.9, height=0.55, fill_color=TERME, fill_opacity=1, stroke_width=0)
        moitie_d = moitie_g.copy()
        VGroup(moitie_g, moitie_d).arrange(RIGHT, buff=0).move_to(P(0, yb))
        b400 = self.t("400", 30, WHITE, audit=False).move_to(moitie_d)
        self.montrer(e1, avec_k={1: [FadeIn(moitie_g), FadeIn(moitie_d), FadeIn(b400)]})
        self.play(moitie_d.animate.set_fill(RAISON), run_time=0.3)
        self.play(moitie_d.animate.set_fill(JUSTE), Indicate(b400, scale_factor=1.2), run_time=0.4)
        self.montrer(e2)
        cad = self.encadre(e2[1], JUSTE, 0.1)
        b800 = self.t("800 vélos", 30, WHITE, audit=False).move_to(VGroup(moitie_g, moitie_d))
        self.suivre("vélos")
        self.play(Create(cad), moitie_d.animate.set_fill(TERME), FadeOut(b400), FadeIn(b800), run_time=0.35)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE - 0.02))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        row = VGroup(*[velo(0.5) for _ in range(5)]).arrange(RIGHT, buff=0.16).move_to(P(0, 2.35))
        self.play(LaggedStart(*[FadeIn(v, shift=RIGHT * 0.2) for v in row], lag_ratio=0.12), run_time=0.45)
        l1 = self.construire([("− 20 %", RAISON, "20 %"), ("partent", RAISON, "partent")], 40).move_to(P(0, 1.45))
        l1b = self.construire([("chaque mois,", WHITE, "chaque mois")], 38).move_to(P(0, 0.85))
        l2 = self.construire([("+ 300", JUSTE, "300"), ("neufs", JUSTE, "neufs"), ("arrivent", JUSTE, "arrivent")], 40).move_to(P(0, 0.25))
        self.montrer(l1, avec_k={1: [row[0].animate.shift(DOWN * 0.3).set_opacity(0.25)]})
        self.montrer(l1b)
        self.montrer(l2)
        question = self.paragraphe([("Où se stabilise", RAISON), ("le parc ?", RAISON)], 46, buff=0.1, y=-0.85)
        for l, ex in zip(question, ("où se stabilise", "le parc")):
            self.au_mot(ex)
            self.play(FadeIn(l, shift=UP * 0.1), run_time=0.3)
        self.appel_commentaire(-2.42)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin commune (« @eleveai974 » grossit un instant) ──
        self.fin_short("05-abonne")

    def q_montrer_choix(self, cartes):
        """Les trois cadres prennent la place du dessin d'attente ; chaque lettre
        à « A : », son nombre quand la voix le dit."""
        att = getattr(self, "_attente_q", None)
        if att is None:
            return super().q_montrer_choix(cartes)
        self._attente_q = None
        self.play(FadeOut(att, shift=DOWN * 0.15), *[FadeIn(c[0]) for c in cartes], run_time=0.3)
        for c, L in zip(cartes, "ABC"):
            self.suivre(f"{L} : ")
            self.play(FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            corps = c[1][1]
            for nb in re.findall(r"\d+(?:,\d+)?", getattr(corps, "original_text", "") or ""):
                self.suivre(nb)
            self.play(FadeIn(corps, shift=RIGHT * 0.15), run_time=0.2)

    def paragraph_pari(self):
        return self.paragraphe(["Tu paries que", "tu trouves où", ("se stabilise", RAISON), "un parc de vélos,",
                                "sans calculer", ("un seul terme ?", JUSTE)], 42, buff=0.12, y=0.55)
