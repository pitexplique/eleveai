# suite_limite_defi_short.py
# EleveAI — Maths Terminale (spé) — short « Somme infinie » (9:16), ceinture
# BLANCHE (échelle entière sous le titre). Série SUITES du lycée, épisode 38.
# Micro du coach : limite_suite_defi (genDefiSommeGeo : la balle qui rebondit,
# Sₙ = a × (1 − qⁿ⁺¹) / (1 − q) → a / (1 − q)).
#   · 00-garde       : le titre, l'échelle (70 %), le pari ; EN BAS le ballon
#                      qui rebondit, un rebond par ligne, dès le titre ;
#   · 01-situation   : EN HAUT Léo, ingénieur, son ballon ; EN BAS, EN MÊME
#                      TEMPS, les trajets 2 ; 1 ; 0,5 ; 0,25 dans leurs cases,
#                      et la règle où chaque trajet s'ajoute bout à bout ;
#   · 02-somme       : EN HAUT la règle qui se remplit (Sₙ), EN BAS
#                      Sₙ = 2 × (1 − 0,5ⁿ⁺¹) / (1 − 0,5), et 0,5ⁿ⁺¹ → 0 (les
#                      carrés orange qui rétrécissent) ;
#   · 03/03b         : question-pause (B : 4 mètres), 3 s ; la règle d'attente
#                      remplit le bas pendant la question et part AVANT les
#                      boutons ; puis 2 / (1 − 0,5) = 2 / 0,5 = 4 m, la règle
#                      pleine jusqu'à la marque verte 4 m ;
#   · 04-commentaire : × 0,75 et 2 m au départ : quelle distance totale ?
#                      (réponse : 2 / 0,25 = 8 m, NON affichée) ;
#   · 05-abonne      : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = les trajets (termes), orange = la
# raison 0,5 et le ballon, vert = juste (la limite 4 m).
# Voix : manim/voix/terminale-suite-limite-defi-short.json (débit −6),
# calée par suite_limite_defi_short_marques.json.
# ⛔ Ce script n'importe rien du script paysage de l'épisode : il se suffit à lui-même.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_limite_defi_short.py SuiteLimiteDefiShort -o eleveai-maths-terminale-suite-limite-defi-short --media_dir manim/scripts/terminale/media-suite-limite-defi-short

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_limite_calculer import OutilsCalcul  # noqa: E402
from suite_limite_operations import VerifMargo  # noqa: E402

T = [2 * 0.5 ** k for k in range(30)]                                       # les trajets, en mètres
assert T[:4] == [2, 1, 0.5, 0.25]                                           # 01 : 2 ; 1 ; 0,5 ; 0,25
S = [sum(T[:n + 1]) for n in range(30)]
assert all(abs(S[n] - 2 * (1 - 0.5 ** (n + 1)) / (1 - 0.5)) < 1e-12 for n in range(30))   # 02 : la formule
assert abs(S[29] - 4) < 1e-6 and 2 / (1 - 0.5) == 2 / 0.5 == 4               # 03b : 4 m
assert abs(2 / (1 - 0.75) - 8) < 1e-12                                       # 04 : 8 m (non affiché)
PEAU = "#c68642"
K = 0.9                                                                     # la règle : 0,9 par mètre
X0 = -1.8                                                                   # le début de la règle


def leo(s=1.0):
    """Léo, ingénieur : cheveux courts, polo bleu, une blouse ouverte."""
    cheveux = Sector(radius=0.3, angle=PI, start_angle=0, fill_color="#111827", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.18))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#1d4ed8", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    blouse = VGroup(*[Rectangle(width=0.22, height=1.05, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                      .move_to(P(sx * 0.37, 0.1)) for sx in (-1, 1)])
    return VGroup(corps, blouse, cheveux, tete).scale(s)


def ballon(r=0.2):
    """Un ballon de basket : orange, ses coutures noires."""
    b = Circle(radius=r, fill_color=RAISON, fill_opacity=1, stroke_color="#7c2d12", stroke_width=2)
    c = VGroup(Line(P(-r, 0), P(r, 0)), Line(P(0, -r), P(0, r)),
               Arc(radius=r * 0.75, start_angle=-PI / 3, angle=2 * PI / 3).shift(LEFT * r * 0.95),
               Arc(radius=r * 0.75, start_angle=2 * PI / 3, angle=2 * PI / 3).shift(RIGHT * r * 0.95))
    c.set_stroke("#1c1917", 2)
    return VGroup(b, c)


def rebonds(x0, y_sol, largeurs, hauteurs):
    """Les arcs des rebonds (paraboles), bout à bout à partir de x0."""
    arcs, x = [], x0
    for w, h in zip(largeurs, hauteurs):
        a = ParametricFunction(lambda t, a=x, w=w, h=h: P(a + w * t, y_sol + 4 * h * t * (1 - t)), t_range=(0, 1),
                               stroke_color=GREY_B, stroke_width=3)
        arcs.append(DashedVMobject(a, num_dashes=max(6, int(12 * w)), dashed_ratio=0.55))
        arcs[-1].chemin = a
        x += w
    return arcs


class Regle(VGroup):
    """La règle des trajets : chaque trajet est un segment bleu, posé bout à bout ;
    les séparations blanches montrent où un trajet finit."""

    def __init__(self, y, n=12, ep=0.22, **kw):
        super().__init__(**kw)
        self.y = y
        self.fond = Rectangle(width=4 * K, height=ep, fill_color=FOND_CARTE, fill_opacity=1, stroke_color=GREY_C,
                              stroke_width=2).move_to(P(X0 + 2 * K, y))
        self.segs, x = VGroup(), X0
        for k in range(n):
            L = T[k] * K
            seg = Rectangle(width=max(L - 0.02, 0.004), height=ep, fill_color=TERME if k % 2 == 0 else "#60a5fa",
                            fill_opacity=1, stroke_width=0).move_to(P(x + L / 2, y))
            self.segs.add(seg)
            x += L
        self.add(self.fond)

    def fin(self, n):
        return X0 + S[n - 1] * K


class SuiteLimiteDefiShort(VerifMargo, OutilsCalcul, ShortSuites):
    fichier_marques = "suite_limite_defi_short_marques.json"
    nom_voix = "terminale-suite-limite-defi-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"
    hauteur_bouton = 1.0
    buff_boutons = 0.22
    y_tete_question = 3.52
    place_coche = 0.2                   # la coche ✓ garde un vrai écart avec le texte
    Y_TITRE, Y_ECHELLE = 3.56, 2.86      # de l'air entre le titre et l'échelle des ceintures

    def construire(self, morceaux, fs=40, larg=None):
        return super().construire(morceaux, fs, larg or self.largeur_texte / 1.05)

    def ligne(self, morceaux, y, fs=40, avec=(), larg=None, avec_k=None, rt=0.25, rt_mid=0.22, x=None):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k, rt_mid=rt_mid)

    def entete(self, titre, extrait=None, fs=42):
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
        """Un bouton : rond A/B/C, le corps, marge ≥ 20 px, la coche à droite sans toucher le texte."""
        rond = Circle(radius=0.23, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=32, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else self.t(corps, 44, WHITE, 1e9)
        place = largeur - 0.15 - rond.width - 0.25 - 1.2
        if c.width > place:
            c.scale_to_fit_width(place)
        ligne = VGroup(VGroup(rond, lt), c).arrange(RIGHT, buff=0.3)
        cadre = RoundedRectangle(width=largeur, height=max(self.hauteur_bouton, ligne.height + 0.4),
                                 corner_radius=0.14, stroke_color=TERME, stroke_width=3, fill_color=FOND_CARTE,
                                 fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.22, LEFT)
        return VGroup(cadre, ligne)

    def q_montrer_choix(self, cartes):
        """Le dessin d'attente part à « A : », AVANT le premier cadre ; puis chaque
        bouton arrive ENTIER (cadre, lettre, texte) au début de sa lecture."""
        att, self._attente_q = getattr(self, "_attente_q", None), None
        for c, L in zip(cartes, "ABC"):
            self.suivre(f"{L} : ")
            if att is not None:
                self.play(FadeOut(att, shift=DOWN * 0.15), run_time=0.2)
                att = None
            ex = [e for e in getattr(c[1][1], "extraits", []) if e]
            if ex:
                self.suivre(ex[0])
            self.play(FadeIn(c, shift=RIGHT * 0.12), run_time=0.25)
            for e in ex[1:]:
                self.suivre(e)

    def cases(self, vals, y, fs=38, gap=0.14):
        """Des cases à la MÊME marge intérieure (0,18 de chaque côté du nombre)."""
        larg = [Text(v, font_size=fs).width + 0.36 for v in vals]
        tot = sum(larg) + gap * (len(vals) - 1)
        g, x = VGroup(), -tot / 2
        for v, w in zip(vals, larg):
            cad = RoundedRectangle(width=w, height=0.78, corner_radius=0.12, stroke_color=TERME, stroke_width=3,
                                   fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x + w / 2, y))
            g.add(VGroup(cad, Text(v, font_size=fs, color=WHITE).move_to(cad)))
            x += w + gap
        return g

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; EN BAS le ballon qui rebondit ──
        self.dire("00-garde")
        sol_y = -2.72
        sol = Line(P(-2.0, sol_y), P(2.0, sol_y), stroke_color=GREY_B, stroke_width=4)
        b = ballon(0.16)
        y_b = sol_y + 0.16
        arcs = rebonds(-1.9, y_b, [1.7, 0.85, 0.43, 0.22, 0.11, 0.06], [1.0, 0.55, 0.3, 0.16, 0.08, 0.05])
        b.move_to(arcs[0].chemin.get_start())

        def rebond(k, rt=None):
            return [Create(arcs[k]), MoveAlongPath(b, arcs[k].chemin)]
        self.entete("Somme infinie", extrait="Somme infinie")
        self.play(FadeIn(sol), FadeIn(b, shift=DOWN * 0.2), run_time=0.3)          # le bas n'est jamais vide
        self.ligne([("Tu paries", WHITE, "Tu paries")], 2.2, fs=40, avec=rebond(0), rt=0.6)
        self.ligne([("qu'un ballon", RAISON, "qu'un ballon")], 1.62, fs=38, avec=rebond(1), rt=0.45)
        self.ligne([("qui rebondit", WHITE, "qui rebondit")], 1.05, fs=38, avec=rebond(2), rt=0.35)
        self.ligne([("sans fin", WHITE, "sans fin")], 0.48, fs=38, avec=rebond(3), rt=0.3)
        self.ligne([("parcourt une", WHITE, "parcourt")], -0.09, fs=38, avec=rebond(4), rt=0.25)
        self.ligne([("distance…", WHITE, "distance")], -0.66, fs=38, avec=rebond(5), rt=0.2)
        self.ligne([("finie ?", JAUNE_TITRE, "finie")], -1.25, fs=52)
        self.attendre_voix(marge=0.3)

        # ── 01 : EN HAUT Léo et son ballon ; EN BAS les trajets, EN MÊME TEMPS ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        perso = leo(0.58).move_to(P(-1.5, 1.75))
        nom = self.t("Léo", 44, JAUNE_TITRE).move_to(P(0.45, 2.25))
        met = self.t("ingénieur", 32, TERME).move_to(P(0.45, 1.75))
        bb = ballon(0.24).move_to(P(1.6, 1.25))
        regle = Regle(-1.9)
        leg = self.t("les trajets, bout à bout", 28, GREY_A, audit=False).next_to(regle.fond, DOWN, buff=0.16)
        self.au_mot("Léo")
        self.play(FadeIn(perso, shift=UP * 0.1), FadeIn(nom, shift=UP * 0.1), FadeIn(regle), FadeIn(leg),
                  run_time=0.35)          # EN BAS, la règle vide dès le début : le bas n'est jamais vide
        self.au_mot("ingénieur")
        self.play(FadeIn(met, shift=UP * 0.08), run_time=0.3)
        self.au_mot("ballons de basket")
        self.play(FadeIn(bb, shift=DOWN * 0.3), run_time=0.35)
        l1 = self.ligne([("premier trajet :", GREY_A, "le premier trajet"), ("2 m", WHITE, "2 mètres")], 0.6, fs=40,
                        avec_k={1: [GrowFromEdge(regle.segs[0], LEFT)]})
        l2 = self.ligne([("chaque trajet :", GREY_A, "et chaque"), ("× 0,5", RAISON, "0,5 fois")], 0.0, fs=40)
        cs = self.cases(["2", "1", "0,5", "0,25"], -0.8)
        self.au_mot("précédent")
        for k, ex in enumerate(["2", "1", "0,5", "0,25"]):      # chaque case et son segment, ENSEMBLE, à la voix
            self.suivre(ex)
            extra = [GrowFromEdge(regle.segs[k], LEFT)] if k else [Indicate(regle.segs[0], color=TERME)]
            self.play(*extra, FadeIn(cs[k][0], scale=0.8), FadeIn(cs[k][1], scale=1.4), run_time=0.25)
        self.add(*regle.segs[:4])
        self.attendre_voix(marge=0.3)

        # ── 02 : EN HAUT la règle qui se remplit (Sₙ), EN BAS la formule et 0,5ⁿ⁺¹ → 0 ──
        self.dire("02-somme")
        self.play(FadeOut(VGroup(perso, nom, met, bb, l1, l2, cs, leg)), run_time=0.25)
        lab = self.t("Sₙ : la distance totale", 30, TERME, audit=False).next_to(regle.fond, DOWN, buff=0.16)
        qm = self.t("?", 44, JAUNE_TITRE, audit=False).next_to(regle.fond, UP, buff=0.12).align_to(regle.fond, RIGHT)
        self.au_mot("La distance totale")
        self.play(FadeIn(lab, shift=UP * 0.08), LaggedStart(*[GrowFromEdge(s_, LEFT) for s_ in regle.segs[4:]],
                                                           lag_ratio=0.25), FadeIn(qm, scale=1.3), run_time=0.8)
        f = self.ligne_maths([("t", [("Sₙ =", TERME, "S indice n"), ("2 ×", WHITE, "2 fois")]),
                              ("f", [("1 −", WHITE, "1 moins"), ("0,5ⁿ⁺¹", RAISON, "0,5 puissance")],
                               [("1 −", WHITE, "sur 1"), ("0,5", WHITE, "moins 0,5")])], fs=40)
        if f.width > 4.0:
            f.scale_to_fit_width(4.0)
        f.move_to(P(0, 1.55))
        # 0,5¹, 0,5², 0,5³, 0,5⁴ : des carrés qui rétrécissent, CHACUN avec son étiquette,
        # arrivés avec « 0,5ⁿ⁺¹ → 0 » (jamais un carré seul, sans légende)
        expo = ("¹", "²", "³", "⁴")
        carres = VGroup()
        for k, e in enumerate(expo):
            sq = Square(0.8 * 0.5 ** k, fill_color=RAISON, fill_opacity=1, stroke_width=0)
            et_ = self.t("0,5" + e, 26, RAISON, audit=False)
            carres.add(VGroup(sq, et_))
        for c in carres:
            c[1].next_to(c[0], DOWN, buff=0.14)
        carres.arrange(RIGHT, buff=0.2, aligned_edge=DOWN)
        for c in carres:
            c[1].align_to(carres[0][1], DOWN)
            c[0].next_to(c[1], UP, buff=0.14)
        carres.move_to(P(-0.1, 0)).align_to(P(0, -1.28), DOWN)
        self.montrer(f)
        self.ligne([("0,5ⁿ⁺¹", RAISON, "Et 0,5"), ("→ 0", JUSTE, "tend vers 0")], 0.3, fs=52,
                   avec_k={0: [FadeIn(carres[0], scale=0.7)],
                           1: [LaggedStart(*[FadeIn(c, scale=0.6) for c in carres[1:]], lag_ratio=0.3)]}, rt=0.8)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → B (4 mètres) ──
        g1 = self.construire([("La distance totale", WHITE, "La distance")], 42)
        g2 = self.construire([("Sₙ", TERME, "S indice n"), ("tend vers :", WHITE, "tend vers")], 42)

        def dessin():
            """La question arrive AVEC le titre ; la règle et son « ? » remplissent la place
            des boutons, et partent à « A : », AVANT le premier cadre : le bas n'est jamais vide."""
            q_ = self.t("?", 72, JAUNE_TITRE, audit=False).move_to(P(0.75, 0.45))
            b_ = ballon(0.42).move_to(P(-0.6, 0.45))
            a_ = rebonds(-1.9, -2.28, [1.5, 0.8, 0.45, 0.25, 0.14, 0.08], [1.5, 0.85, 0.5, 0.28, 0.15, 0.08])
            self._attente_q = VGroup(q_, b_, *a_)       # le bas rempli : les rebonds posés sur la règle
            self.play(FadeIn(self._attente_q, shift=UP * 0.15), FadeIn(g1, shift=UP * 0.1), FadeIn(rb), run_time=0.3)
            self.montrer(g2, rt=0.22)
            liste.clear()
        rb = Regle(-2.55, n=10, ep=0.16)            # tout en bas, sous « Mets pause » : le bas n'est jamais vide
        rb = VGroup(rb.fond, *rb.segs)
        liste = [(g1, None), (g2, None)]
        q = self.poser_question("03-question", liste,
                                [self.choix([("+∞", "plus l'infini")], 50),
                                 self.choix([("4 mètres", "4")], 46),
                                 self.choix([("2 mètres", "2")], 46)],
                                1, dessin=dessin)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 1)
        self.play(FadeOut(q.tete), FadeOut(q.question), FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), FadeOut(rb),
                  run_time=0.15)
        self.play(VGroup(q.cartes[1], ok).animate.move_to(P(0, 2.95)), run_time=0.2)   # d'abord monter…
        regle = Regle(-2.15, n=14)
        f = self.ligne_maths([("f", [("2", WHITE, "2 sur")], [("1 −", WHITE, "1 moins"), ("0,5", WHITE, "0,5")]),
                              ("t", [("=", WHITE, "égale 2")]), ("f", [("2", WHITE, None)], [("0,5", WHITE, "sur 0,5")]),
                              ("t", [("= 4 m", JUSTE, "égale 4")])], fs=50)
        if f.width > 4.0:
            f.scale_to_fit_width(4.0)
        f.move_to(P(0, 1.2))
        b3 = ballon(0.15)
        a3 = rebonds(-1.9, -1.88, [1.5, 0.8, 0.45, 0.25, 0.14, 0.08], [1.1, 0.55, 0.3, 0.16, 0.08, 0.04])
        b3.move_to(a3[0].chemin.get_start())
        rb_ = lambda k: [Create(a3[k]), MoveAlongPath(b3, a3[k].chemin)]  # noqa: E731
        self.montrer(f, avec_k={0: [FadeIn(regle), *[FadeIn(s_) for s_ in regle.segs[:3]], FadeIn(b3), *rb_(0)],
                                1: rb_(1), 2: rb_(2), 3: rb_(3), 5: rb_(4), 6: rb_(5)})   # …puis la règle et le ballon
        self.play(FadeOut(VGroup(b3, *a3)), run_time=0.2)            # le ballon part AVANT les lignes
        self.insister(f[-1], 1.15)
        marque = Line(P(X0 + 4 * K, -2.15 - 0.3), P(X0 + 4 * K, -2.15 + 0.22), stroke_color=JUSTE, stroke_width=6)
        l4 = self.t("4 m", 32, JUSTE, audit=False).next_to(marque, DOWN, buff=0.14).align_to(marque, RIGHT)
        # une phrase = une seule taille (36), aucune ligne rétrécie ; « une infinité de rebonds, » (5,8)
        # ne tient pas en 36 : quatre lignes centrées, « distance finie. » arrive ENTIÈRE (centrée)
        self.ligne([("une infinité", WHITE, "une infinité")], 0.3, fs=36, larg=1e9)
        self.ligne([("de rebonds,", WHITE, "de rebonds")], -0.34, fs=36, larg=1e9,
                   avec_k={0: [LaggedStart(*[GrowFromEdge(s_, LEFT) for s_ in regle.segs[3:]], lag_ratio=0.2)]},
                   rt=0.9)
        self.ligne([("mais une", WHITE, "mais une")], -0.9, fs=36, larg=1e9)
        self.ligne([("distance", WHITE, "distance finie"), ("finie.", JUSTE, None)], -1.5, fs=36, larg=1e9,
                   avec_k={1: [Create(marque), FadeIn(l4, shift=UP * 0.08)]}, rt=0.4)
        self.play(Indicate(VGroup(marque, l4), color=JUSTE, scale_factor=1.1), run_time=0.4)
        self.attendre_voix(marge=0.4)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE - 0.02))
        sol_y = -1.35
        sol = Line(P(-2.0, sol_y), P(2.0, sol_y), stroke_color=GREY_B, stroke_width=4)
        b = ballon(0.15)
        arcs = rebonds(-1.9, sol_y + 0.15, [1.2, 0.9, 0.68, 0.51], [0.95, 0.71, 0.53, 0.4])
        b.move_to(arcs[0].chemin.get_start())
        qm = self.t("?", 48, JAUNE_TITRE, audit=False).move_to(P(1.75, -0.75))
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(sol), FadeIn(b), run_time=0.35)
        self.ligne([("chaque trajet :", WHITE, "si chaque")], 2.65, fs=40)
        self.ligne([("× 0,75", RAISON, "0,75")], 2.05, fs=52,
                   avec_k={0: [Create(arcs[0]), MoveAlongPath(b, arcs[0].chemin)]}, rt=0.6)
        self.ligne([("au départ :", WHITE, "avec toujours"), ("2 m", WHITE, "2 mètres")], 1.4, fs=40,
                   avec_k={1: [Create(arcs[1]), MoveAlongPath(b, arcs[1].chemin)]}, rt=0.5)
        self.ligne([("distance totale ?", JAUNE_TITRE, "quelle distance")], 0.75, fs=42,
                   avec_k={0: [Create(arcs[2]), MoveAlongPath(b, arcs[2].chemin)]}, rt=0.5)
        self.play(Create(arcs[3]), MoveAlongPath(b, arcs[3].chemin), FadeIn(qm, scale=1.4), run_time=0.45)
        self.appel_commentaire(-2.2)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin commune ──
        self.fin_short("05-abonne")
