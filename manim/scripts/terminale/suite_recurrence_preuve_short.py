# suite_recurrence_preuve_short.py
# EleveAI — Maths Terminale (spé) — short « Récurrence : l'hérédité seule peut-elle
# « prouver » une chose fausse ? » (9:16), ceinture BLANCHE (échelle entière
# sous le titre). Série SUITES, épisode 29. Micro du coach : suite_recurrence_preuve.
#   · 00-garde       : le titre, l'échelle (70 %), le pari en gros ; EN BAS une
#                      rangée de dominos qui vacillent ;
#   · 01-situation   : EN HAUT Nora, cheffe de chantier, et sa tour (2 étages au
#                      mois 0, puis 3 étages orange de plus) ; EN BAS les cases
#                      u₀ = 2, u₁ = ? et la flèche « + 3 », puis uₙ₊₁ = uₙ + 3 ;
#   · 02-heredite    : EN HAUT les dominos (le domino k pousse le k + 1) ; EN BAS
#                      « uₙ multiple de 3 », « si uₖ … , uₖ + 3 aussi », héréditaire ;
#   · 03/03b         : question-pause (C : l'initialisation est fausse), 3 s ;
#                      puis u₀ = 2 n'est pas un multiple de 3 : le 1er domino rouge
#                      ne tombe pas, la chaîne ne démarre jamais ;
#   · 04-commentaire : la tour qui grandit, « Combien d'étages au mois 12 ? »,
#                      « Réponds en commentaire ! » (réponse 2 + 12 × 3 = 38, NON
#                      affichée) ;
#   · 05-abonne      : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = le « + 3 » et l'hérédité,
# vert = juste, rouge = piège.
# Voix : manim/voix/terminale-suite-recurrence-preuve-short.json (débit −6),
# calée par suite_recurrence_preuve_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_recurrence_preuve_short.py SuiteRecurrencePreuveShort -o eleveai-maths-terminale-suite-recurrence-preuve-short --media_dir manim/scripts/terminale/media-suite-recurrence-preuve-short

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
TOUR = [2 + 3 * n for n in range(13)]
assert all(b == a + 3 for a, b in zip(TOUR, TOUR[1:]))
assert all(((x + 3) % 3 == 0) for x in range(0, 99, 3))       # l'hérédité est vraie
assert all(t % 3 != 0 for t in TOUR)                          # mais P(n) est fausse : u₀ = 2
assert TOUR[12] == 38                                         # la question en commentaire
H_ET = 0.22


def etage(x, y, neuf=False, w=1.1, h=H_ET):
    """Un étage : un bloc (bleu, orange s'il est neuf) et deux fenêtres."""
    b = Rectangle(width=w, height=h, fill_color=RAISON if neuf else TERME, fill_opacity=1, stroke_color=WHITE,
                  stroke_width=1.5).move_to(P(x, y + h / 2))
    f = VGroup(*[Square(0.09, fill_color="#FEF9C3", fill_opacity=1, stroke_width=0).move_to(P(x + dx, y + h / 2))
                 for dx in (-0.25, 0.25)])
    return VGroup(b, f)


def tour(n, x, y0, neufs=0, w=1.1):
    return VGroup(*[etage(x, y0 + k * H_ET, k >= n - neufs, w) for k in range(n)])


def nora(s=1.0):
    """Nora, cheffe de chantier : casque jaune, gilet orange, un plan à la main."""
    tete = Circle(radius=0.26, fill_color="#8d5524", fill_opacity=1, stroke_width=0).move_to(P(0, 0.95))
    casque = Sector(radius=0.3, angle=PI, start_angle=0, fill_color="#FACC15", fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.16))
    bord = RoundedRectangle(width=0.7, height=0.07, corner_radius=0.03, fill_color="#FACC15", fill_opacity=1,
                            stroke_width=0).move_to(P(0, 1.1))
    corps = RoundedRectangle(width=0.9, height=1.05, corner_radius=0.22, fill_color="#334155", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    gilet = VGroup(Polygon(P(-0.42, 0.6), P(-0.12, 0.6), P(-0.12, -0.35), P(-0.42, -0.35)),
                   Polygon(P(0.42, 0.6), P(0.12, 0.6), P(0.12, -0.35), P(0.42, -0.35))).set_fill(RAISON, 1)
    gilet.set_stroke(width=0)
    plan = Rectangle(width=0.45, height=0.32, fill_color="#DBEAFE", fill_opacity=1, stroke_color=TERME,
                     stroke_width=2).move_to(P(0.55, 0.1)).rotate(-0.2)
    return VGroup(corps, gilet, plan, tete, casque, bord).scale(s)


def domino(x, y0, h=0.75, w=0.2, couleur=TERME):
    return Rectangle(width=w, height=h, fill_color=couleur, fill_opacity=0.9, stroke_color=WHITE,
                     stroke_width=2).move_to(P(x, y0 + h / 2))


XS_DOM = [-1.55 + 0.62 * k for k in range(6)]
INDICES = set("₀₁₂₃₄₅₆₇₈₉₊₋ₖₙₚ")


def grossir_indices(t, texte, k=1.3):
    """Les indices Unicode (police de secours) sortent trop petits : chacun × k,
    et la suite de SA ligne glisse d'autant (les espaces restent égales)."""
    car, lig, n = [], [], 0
    for c in texte:
        if c == "\n":
            n += 1
        elif not c.isspace():
            car.append(c)
            lig.append(n)
    gl = t.submobjects
    if len(gl) != len(car):
        return t
    for i, c in enumerate(car):
        if c in INDICES:
            w = gl[i].width
            gl[i].scale(k, about_edge=LEFT)
            d = gl[i].width - w
            for j in range(i + 1, len(gl)):
                if lig[j] == lig[i]:
                    gl[j].shift(RIGHT * d)
    return t


class SuiteRecurrencePreuveShort(ShortSuites):
    fichier_marques = "suite_recurrence_preuve_short_marques.json"
    nom_voix = "terminale-suite-recurrence-preuve-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"

    # les boutons : corps à ≈ 34 pt sur deux lignes ; le rond A/B/C plus petit,
    # la coche en bas à droite (à côté de la 2e ligne, plus courte)
    place_coche = -0.2            # poser_question : place du corps = 4,0 − 0,82 (voir bouton)
    hauteur_bouton = 1.05

    def t(self, texte, fs=36, color=WHITE, larg=None, audit=True):
        """Comme le module commun, avec les indices agrandis."""
        t = grossir_indices(Text(texte, font_size=fs, color=color), texte)
        larg = larg or self.largeur_texte
        if t.width > larg:
            t.scale_to_fit_width(larg)
        if not audit:
            t._pas_audit = True
        return t

    def bouton(self, lettre, corps, largeur, fs):
        rond = Circle(radius=0.21, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=30, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else self.t(corps, 36, WHITE, 1e9)
        place = largeur - 0.15 - rond.width - 0.15 - 0.1
        if c.width > place:
            c.scale_to_fit_width(place)
        ligne = VGroup(VGroup(rond, lt), c).arrange(RIGHT, buff=0.15)
        cadre = RoundedRectangle(width=largeur, height=max(self.hauteur_bouton, ligne.height + 0.28),
                                 corner_radius=0.14, stroke_color=TERME, stroke_width=3, fill_color=FOND_CARTE,
                                 fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.15, LEFT)
        return VGroup(cadre, ligne)

    def q_reponse(self, q, bonne):
        cartes = q.cartes
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(JUSTE, width=7).set_fill("#052e16", 1), b[1][0][0].animate.set_fill(JUSTE)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(q.rebours), FadeOut(q.pause), run_time=0.25)
        ok = self.coche(JUSTE, 0.2 * self.k_question)
        ok.move_to(b[0].get_corner(DR), aligned_edge=DR).shift(P(-0.14, 0.12))
        k = self.k_allumer
        self.play(b.animate.scale(k), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / k), ok.animate.scale(1 / k, about_point=b.get_center()), run_time=0.25)
        return ok

    def ligne(self, morceaux, y, fs=40, avec=()):
        """Une ligne centrée, écrite morceau par morceau : [(texte, couleur, extrait), …].
        UN seul texte coupé en morceaux : espaces régulières, même ligne de base."""
        tout = self.t(" ".join(m for m, _, _ in morceaux), fs, WHITE, self.largeur_texte / 1.1)  # insister × 1,08
        ts, i = [], 0
        for m, c, _ in morceaux:
            n = sum(1 for ch in m if not ch.isspace())
            ts.append(VGroup(*tout.submobjects[i:i + n]).set_color(c))
            i += n
        g = VGroup(*ts).move_to(P(0, y))
        paquet = []
        for tx, (_, _, ex) in zip(ts, morceaux):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], run_time=0.2)
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(tx)
        self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *avec, run_time=0.25)
        return g

    def dominos(self, y0, h=0.75):
        doms = VGroup(*[domino(x, y0, h) for x in XS_DOM])
        sol = Line(P(-2.0, y0), P(2.0, y0), stroke_color=GREY_B, stroke_width=3)
        return sol, doms

    def fleches_dominos(self, doms, y):
        return [CurvedArrow(P(a.get_center()[0] + 0.08, y), P(b.get_center()[0] - 0.08, y), angle=-PI / 2,
                            color=RAISON, stroke_width=4, tip_length=0.11) for a, b in zip(doms, doms[1:])]

    def entete(self, titre, extrait=None, fs=40):
        """Comme le module commun, mais le titre un peu plus haut (y = 3,52) : un
        mot court en grand touchait le haut de l'échelle des ceintures (y = 3,22)."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, 2.95))
        self.titre_s = self.t(titre, fs, JAUNE_TITRE).move_to(P(0, 3.52))
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def montrer_case_anim(self, lg, i):
        c = lg.cases[i]
        anims = [FadeIn(c[0], scale=0.8), FadeIn(c[1], scale=1.4)]
        if len(lg.noms) > i:
            anims.append(FadeIn(lg.noms[i], shift=UP * 0.08))
        return AnimationGroup(*anims)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; les dominos en bas ──
        self.dire("00-garde")
        self.entete("Récurrence", extrait="Récurrence")
        pari = self.paragraphe(["Tu paries que", "l'hérédité seule", "peut « prouver »", ("une chose fausse ?", PIEGE)],
                               self.fs_grand, buff=0.18, y=1.05)
        sol, doms = self.dominos(-2.4, 1.25)
        for k, (ligne, ex) in enumerate(zip(pari, ("Tu paries", "l'hérédité seule", "peut", "une chose fausse"))):
            self.au_mot(ex)
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if k == 1:
                anims += [Create(sol), LaggedStart(*[FadeIn(d, shift=UP * 0.2) for d in doms], lag_ratio=0.12)]
            self.play(*anims, run_time=0.35)
        self.play(*[Wiggle(d, scale_value=1.04, rotation_angle=0.05 * TAU) for d in doms], run_time=0.8)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT Nora et sa tour ; EN BAS les cases u₀, u₁ ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        nom = self.t("Nora", 48, JAUNE_TITRE).move_to(P(0, 2.36))
        met = self.t("cheffe de chantier", 38, TERME).move_to(P(0, 1.85))
        self.au_mot("Nora")
        pn = nora(0.75).move_to(P(-1.45, 0.55))
        self.play(FadeIn(nom, shift=UP * 0.1), FadeIn(pn, shift=UP * 0.15), run_time=0.4)
        self.au_mot("cheffe")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        X0, X1, YT = 0.0, 1.45, -0.35
        sol1 = Line(P(-0.75, YT), P(2.1, YT), stroke_color=GREY_B, stroke_width=3)
        t0, t1 = tour(2, X0, YT, w=1.0), tour(5, X1, YT, neufs=3, w=1.0)
        lg = LigneTermes(["2", "?"], xs=(X0, X1), centre=P(0, -1.1), largeur=0.95, hauteur=0.72, fs=42)
        self.au_mot("2 étages")
        self.play(Create(sol1), LaggedStart(*[FadeIn(e, shift=DOWN * 0.15) for e in t0], lag_ratio=0.3),
                  self.montrer_case_anim(lg, 0), run_time=0.4)
        self.au_mot("mois")
        self.suivre("0")
        m0 = self.t("mois 0", 28, GREY_A).next_to(t0, UP, buff=0.12)
        self.play(FadeIn(m0, shift=DOWN * 0.1), run_time=0.25)
        self.au_mot("3 de plus")
        s = lg.saut(0, "+ 3", fs=36, cote=DOWN, creux=0.25)
        self.play(TransformFromCopy(t0, t1[:2]), Create(s[0]), FadeIn(s[1], scale=1.4),
                  self.montrer_case_anim(lg, 1), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(e, scale=1.4) for e in t1[2:]], lag_ratio=0.25), run_time=0.45)
        rel = self.ligne([("uₙ₊₁ =", WHITE, "u indice n plus 1"), ("uₙ", WHITE, "égale u indice n"),
                          ("+ 3", RAISON, "3")], -2.65, fs=42)
        self.insister(VGroup(rel, s[1]), 1.08)
        self.attendre_voix(marge=0.3)

        # ── 02 : l'hérédité : EN HAUT les dominos, EN BAS la propriété ──
        self.nouvel_ecran("02-heredite", garder=(self.badge, self.titre_s))
        self.au_mot("Propriété")
        pr = self.t("Propriété :", 40, JAUNE_TITRE).move_to(P(0, 2.35))
        self.play(FadeIn(pr, shift=DOWN * 0.1), run_time=0.3)
        p1 = self.ligne([("uₙ", TERME, "u indice n"), ("multiple de 3", TERME, "3")], 1.72, fs=44)
        sol2, doms2 = self.dominos(0.0, 0.85)
        self.play(Create(sol2), LaggedStart(*[FadeIn(d, shift=UP * 0.2) for d in doms2], lag_ratio=0.1),
                  run_time=0.4)
        fls = self.fleches_dominos(doms2, 0.98)
        # deux lignes à la MÊME taille que « uₖ + 3 aussi » (sur une ligne, il fallait rétrécir)
        self.ligne([("Si uₖ est", WHITE, "Si u indice k")], -0.5, fs=38)
        l1 = self.ligne([("multiple de 3,", WHITE, "3")], -1.02, fs=38,
                        avec=[doms2[2].animate.set_fill(JUSTE, 0.9)])
        l2 = self.ligne([("uₖ", WHITE, "u indice k"), ("+ 3", WHITE, "3"), ("aussi", WHITE, "aussi")], -1.62, fs=38,
                        avec=[Create(fls[2]), doms2[3].animate.set_fill(JUSTE, 0.9)])
        self.au_mot("héréditaire")
        her = VGroup(self.coche(RAISON, 0.22), self.t("c'est héréditaire !", 44, RAISON)).arrange(RIGHT, buff=0.2)
        if her.width > self.largeur_texte / 1.08:
            her.scale_to_fit_width(self.largeur_texte / 1.08)
        her.move_to(P(0, -2.35))
        self.play(Create(her[0]), FadeIn(her[1], shift=UP * 0.1),
                  LaggedStart(*[Create(x) for i, x in enumerate(fls) if i != 2], lag_ratio=0.15), run_time=0.6)
        self.insister(her, 1.08)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → C ──
        choix = [self.t(c, 36, WHITE, 1e9) for c in
                 ("l'hérédité\nest fausse", "il manque\nla conclusion", "l'initialisation\nest fausse")]
        q = self.poser_question("03-question",
                                [(self.t("Pourtant, la propriété", 40), "Pourtant"),
                                 (self.t("est fausse. Pourquoi ?", 40), "est fausse")],
                                choix, 2, y_question=2.85)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 2)
        c = VGroup(q.cartes[2], ok)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), FadeOut(q.question), run_time=0.25)
        self.play(c.animate.move_to(P(0, 2.2)), run_time=0.35)
        self.au_mot("égale")
        self.suivre("2")
        u0 = self.t("u₀ = 2", 50, TERME).move_to(P(0, 1.15))
        self.play(FadeIn(u0, scale=1.3), run_time=0.3)
        self.au_mot("n'est pas")
        np1 = self.t("2 n'est pas un", 40, PIEGE).move_to(P(0, 0.45))
        np2 = self.t("multiple de 3", 40, PIEGE).move_to(P(0, -0.07))
        self.play(FadeIn(np1, shift=UP * 0.1), run_time=0.3)
        self.suivre("3")
        self.play(FadeIn(np2, shift=UP * 0.1), run_time=0.3)
        sol, doms = self.dominos(-1.6, 0.8)
        fls = self.fleches_dominos(doms, -0.68)
        self.play(Create(sol), FadeIn(doms), *[Create(x) for x in fls], doms[0].animate.set_fill(PIEGE, 0.9),
                  run_time=0.4)
        self.au_mot("la chaîne")
        ch = self.paragraphe([("la chaîne ne", PIEGE), ("démarre jamais", PIEGE)], 42, buff=0.08, y=-2.35)
        self.play(FadeIn(ch, shift=UP * 0.1), Wiggle(doms[0], scale_value=1.05, rotation_angle=0.05 * TAU),
                  run_time=0.6)
        self.play(*[Wiggle(d, scale_value=1.03, rotation_angle=0.04 * TAU) for d in doms[1:]], run_time=0.6)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        XT, YB = -1.05, -0.1
        sol4 = Line(P(-1.9, YB), P(-0.2, YB), stroke_color=GREY_B, stroke_width=3)
        base = tour(2, XT, YB, w=1.1)
        self.au_mot("2 étages")
        l2e = self.t("2 étages", 32, TERME).move_to(P(0.95, YB + 0.3))
        self.play(Create(sol4), LaggedStart(*[FadeIn(e, shift=DOWN * 0.15) for e in base], lag_ratio=0.3),
                  FadeIn(l2e, shift=LEFT * 0.1), run_time=0.45)
        self.au_mot("mois")
        self.suivre("0")
        lm0 = self.t("au mois 0", 30, GREY_A).next_to(l2e, DOWN, buff=0.1)
        self.play(FadeIn(lm0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 de plus")
        p3 = VGroup(self.t("+ 3", 44, RAISON), self.t("chaque mois", 26, RAISON)).arrange(DOWN, buff=0.06)
        p3.move_to(P(0.85, YB + 1.15))
        etages = VGroup()
        for m in range(3):       # trois mois de plus : la tour grandit de 3 en 3
            neufs = VGroup(*[etage(XT, YB + (2 + 3 * m + k) * H_ET, True, 1.1) for k in range(3)])
            anims = [LaggedStart(*[FadeIn(e, scale=1.4) for e in neufs], lag_ratio=0.25)]
            if m == 0:
                anims.append(FadeIn(p3, scale=1.2))
            self.play(*anims, run_time=0.4)
            for e in neufs:
                e[0].set_fill(TERME)
            etages.add(neufs)
        haut = VGroup(base, etages)
        qm = self.t("?", 60, RAISON).next_to(haut, RIGHT, buff=0.2).align_to(haut, UP)
        question = self.paragraphe([("Combien d'étages", RAISON), ("au mois 12 ?", RAISON)], 46, buff=0.12,
                                   y=-1.1)
        self.au_mot("Combien")
        self.play(FadeIn(question[0], shift=UP * 0.1), FadeIn(qm, scale=1.5), run_time=0.3)
        self.au_mot("12")
        self.play(FadeIn(question[1], shift=UP * 0.1), Indicate(qm, color=RAISON), run_time=0.3)
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
