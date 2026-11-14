# longueur_mesurer.py
# EleveAI — Maths CM1 — série « Longueurs », épisode 04 : MESURER UNE LONGUEUR
# (micro longueur_mesurer, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Décor et métier : Adam, DESSINATEUR DE BANDES DESSINÉES (centres : art-design, lecture).
# Mapping micro → écrans : 02 (grands traits = cm, petits traits = mm, 1 cm = 10 mm, zoom), 03 (on part
# du 0 : la case de BD de 0 à 8 → 8 cm), 04 (début décalé : crayon de 3 à 10 → 10 − 3 = 7 cm),
# 06 (piège : crayon posé sur le 1, la fin sur le 8 → 7 cm, pas 8), 07 (entre deux nombres : 5 cm 3 mm
# = 53 mm, zoom), questions 05 (gomme de 2 à 6, B : 4 cm) et 08 (4 cm 5 mm en mm, A : 45 mm),
# défi 09 (trait de 2 cm à 8 cm 6 mm, en mm → 66 mm).
# Voix : manim/voix/cm1-longueur-mesurer.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_mesurer_marques.json (python manim/scripts/cm1/aire_marques.py longueur:mesurer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/longueur_mesurer.py LongueurMesurerCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/longueur_mesurer.py LongueurMesurerCM1 -o eleveai-maths-cm1-longueur-mesurer --media_dir manim/scripts/cm1/media-longueur-04
# Sortie : manim/sorties/cm1/maths/longueur/04-mesurer/eleveai-maths-cm1-longueur-mesurer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_cm1_commun import *  # noqa: E402,F403

ENCRE = "#38bdf8"     # le trait d'encre d'Adam (bleu ciel, lisible sur le fond sombre)
PAPIER = "#f8fafc"


# ── Les outils de dessin de l'épisode (ici, pas dans le commun) ─────────────

def trait_sur_regle(r, debut, fin, couleur=ENCRE, ep=0.13, ecart=0.07):
    """Un trait d'encre posé au-dessus de la règle r, de `debut` à `fin` (cm, décimaux permis)."""
    xa, xb = r.x(debut), r.x(fin)
    b = Rectangle(width=max(xb - xa, 0.01), height=ep, fill_color=couleur, fill_opacity=1, stroke_width=0)
    b.move_to(P((xa + xb) / 2, r.haut() + ecart + ep / 2))
    return b


def gomme_sur_regle(r, debut, fin, ep=0.42):
    """Une gomme (blanche, fourreau bleu) posée au-dessus de la règle, de `debut` à `fin`."""
    xa, xb = r.x(debut), r.x(fin)
    L = xb - xa
    corps = Rectangle(width=L, height=ep, fill_color="#fce7f3", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    fourreau = Rectangle(width=L * 0.55, height=ep * 1.04, fill_color="#2563eb", fill_opacity=1, stroke_width=0)
    fourreau.align_to(corps, RIGHT)
    g = VGroup(corps, fourreau)
    g.move_to(P((xa + xb) / 2, r.haut() + 0.06 + ep / 2))
    return g


def case_bd(larg, haut):
    """Une case de bande dessinée : un cadre blanc, un soleil, une colline, une maison."""
    cadre = Rectangle(width=larg, height=haut, fill_color=PAPIER, fill_opacity=1, stroke_color="#111827",
                      stroke_width=5)
    c = cadre.get_center()
    soleil = Circle(radius=haut * 0.14, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    soleil.move_to(c + P(larg * 0.36, haut * 0.26))
    colline = Ellipse(width=larg * 0.7, height=haut * 0.6, fill_color="#86efac", fill_opacity=1, stroke_width=0)
    colline.move_to(c + P(-larg * 0.12, -haut * 0.5))
    mur = Rectangle(width=haut * 0.34, height=haut * 0.28, fill_color="#fca5a5", fill_opacity=1, stroke_width=0)
    mur.move_to(c + P(larg * 0.18, -haut * 0.27))
    toit = Polygon(mur.get_corner(UL) + LEFT * 0.06, mur.get_corner(UR) + RIGHT * 0.06,
                   mur.get_top() + UP * haut * 0.18, fill_color="#b91c1c", fill_opacity=1, stroke_width=0)
    g = VGroup(cadre, soleil, colline, mur, toit)
    # la colline ne déborde pas du cadre
    colline.stretch_to_fit_height(min(colline.height, haut * 0.45)).align_to(cadre, DOWN).shift(UP * 0.04)
    return g


def planche(larg=2.6, haut=3.0):
    """La planche de BD d'Adam : une page blanche, 4 cases (la case en haut à gauche en jaune)."""
    page = Rectangle(width=larg, height=haut, fill_color=PAPIER, fill_opacity=1, stroke_color=GRAY_B,
                     stroke_width=2)
    m, gx = 0.14, 0.1
    w, h = (larg - 2 * m - gx) / 2, (haut - 2 * m - gx) / 2
    cases = VGroup()
    for j in range(2):
        for i in range(2):
            cs = Rectangle(width=w, height=h, fill_color="#fef3c7" if (i, j) == (0, 0) else PAPIER,
                           fill_opacity=1, stroke_color="#111827", stroke_width=3)
            cs.move_to(page.get_corner(UL) + P(m + w / 2 + i * (w + gx), -(m + h / 2 + j * (h + gx))))
            cases.add(cs)
    bulle = Ellipse(width=w * 0.55, height=h * 0.3, fill_color=WHITE, fill_opacity=1, stroke_color="#111827",
                    stroke_width=2).move_to(cases[1].get_center() + UP * h * 0.18)
    tete = Circle(radius=h * 0.16, fill_color="#e0ac69", fill_opacity=1, stroke_width=0)
    tete.move_to(cases[0].get_center() + DOWN * h * 0.1)
    soleil = Circle(radius=h * 0.13, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    soleil.move_to(cases[2].get_corner(UR) + P(-w * 0.25, -h * 0.25))
    g = VGroup(page, cases, bulle, tete, soleil)
    g.cases = cases
    return g


def sauts(r, debut, fin, y, couleur=JAUNE_TITRE, fs=22):
    """Les sauts de 1 cm au-dessus de la règle (des arcs) et leurs numéros 1, 2, 3… (hors audit)."""
    arcs, nums = VGroup(), VGroup()
    for k in range(int(fin - debut)):
        a = ArcBetweenPoints(P(r.x(debut + k), y), P(r.x(debut + k + 1), y), angle=-TAU / 4, color=couleur,
                             stroke_width=4)
        arcs.add(a)
        n = Text(str(k + 1), font_size=fs, color=couleur, weight=BOLD).next_to(a, UP, buff=0.05)
        nums.add(hors_audit(n))
    return arcs, nums


def cadre_zone(r, debut, fin, couleur=ORANGE_RETENUE, dessus=0.25):
    """Le cadre (pointillé) autour d'un morceau de la règle, de `debut` à `fin`, pour le zoom."""
    xa, xb = r.x(debut), r.x(fin)
    bas, haut = r.corps.get_bottom()[1] - 0.06, r.haut() + dessus
    c = DashedVMobject(Rectangle(width=xb - xa + 0.16, height=haut - bas, stroke_color=couleur, stroke_width=4),
                       num_dashes=24)
    c.move_to(P((xa + xb) / 2, (bas + haut) / 2))
    return c


def liens(cadre, loupe, couleur=ORANGE_RETENUE):
    """Deux lignes pointillées du petit cadre vers le cadre du zoom (les coins les plus proches)."""
    a, b = cadre, loupe
    if b.get_center()[1] < a.get_bottom()[1]:   # le zoom est dessous
        paires = [(a.get_corner(DL), b.get_corner(UL)), (a.get_corner(DR), b.get_corner(UR))]
    else:                                         # le zoom est à droite
        paires = [(a.get_corner(UR), b.get_corner(UL)), (a.get_corner(DR), b.get_corner(DL))]
    return VGroup(*[DashedLine(p, q, color=couleur, stroke_width=3, dash_length=0.12) for p, q in paires])


_SUR_LA_LIGNE = set("acemnorsuvwxzbdfhiklt0123456789ABCDEFGHIKLMNORSTUVWXYZéèêàâîôûç")


def _ligne_de_base(t):
    """L'ordonnée de la ligne d'écriture d'un Text : le bas d'une lettre sans jambage (sinon le bas du texte)."""
    car = [c for c in getattr(t, "original_text", "") if not c.isspace()]
    if len(car) == len(t.submobjects):
        for c, g in zip(car, t.submobjects):
            if c in _SUR_LA_LIGNE:
                return g.get_bottom()[1]
    return t.get_bottom()[1]


def aligner_base(morceaux):
    """Remet les morceaux d'une ligne sur la MÊME ligne d'écriture (centrés, « Le côté » et « part du 0 »
    sautaient : accent d'un côté, jambage de l'autre)."""
    ms = [m for m in morceaux if isinstance(m, Text)]
    if len(ms) < 2:
        return morceaux
    y0 = _ligne_de_base(ms[0])
    for m in ms[1:]:
        m.shift(UP * (y0 - _ligne_de_base(m)))
    return morceaux


def sans_synchro(m):
    """La ligne n'attend pas ses mots (des mots redits plus loin la retardaient) ; ses nombres restent
    audités : on la pose au mot qui COMMENCE par son dernier mot."""
    for f in m.get_family():
        f.sans_synchro = True
    return m


class LongueurMesurerBase(PaysageLongueurCM1):
    nom_voix = "cm1-longueur-mesurer"
    fichier_marques = "longueur_mesurer_marques.json"
    ceinture = "jaune"

    def ligne(self, morceaux, fs=40, buff=0.2):
        """La ligne de morceaux du modèle, posée sur une même ligne d'écriture."""
        lg = super().ligne(morceaux, fs, buff)
        aligner_base(lg.submobjects)
        return lg

    def _disposer_q(self, question, choix, phrase):
        """Les lignes coupées de la phrase de réponse : morceaux sur la même ligne d'écriture."""
        coupees = dict(self._ph_couper)
        r = super()._disposer_q(question, choix, phrase)
        for i in coupees:
            aligner_base(r[5].submobjects[i].submobjects)
        return r

    def pause_gauche(self, y=-2.75, marge=2.0):
        """« Mets pause, et cherche ! » à gauche (la colonne de droite collait à Ti-Margo)."""
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), -6.2, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Mesurer une longueur", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Mesurer une longueur")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.ligne([("Comment lire", WHITE), ("une règle", JAUNE_TITRE)], 38, buff=0.2)
        q1 = self.t("sans se tromper ?", 38, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        r = regle(6, 0.75, h=0.7, fs=20).move_to(P(3.4, 0.05))
        c = crayon_sur_regle(r, 0, 5)
        self.au_mot("Comment lire")
        self.play(FadeIn(q0[0], shift=UP * 0.2), FadeIn(r, shift=LEFT * 0.3), run_time=0.3)
        self.au_mot("une règle")
        self.play(FadeIn(q0[1], shift=UP * 0.2), FadeIn(c, shift=DOWN * 0.2), run_time=0.3)
        self.au_mot("sans se tromper")
        self.play(FadeIn(q1, shift=UP * 0.2), Wiggle(c), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 01 : Adam, dessinateur de BD ────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = adam(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Adam")
        nom = self.t("Adam", 42, ORANGE_RETENUE).next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il dessine des bandes dessinées")
        met = self.t("dessinateur de BD", 26, ORANGE_RETENUE).next_to(pe, DOWN, buff=0.12)
        pl = planche(2.5, 2.9).move_to(P(-1.35, -0.75))
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(pl, shift=UP * 0.3), run_time=0.45)
        l0 = self.bloc(["Chaque case de sa planche", "doit avoir la bonne taille."], 30)
        l0.move_to(P(2.6, 2.45)).align_to(P(-2.9, 0), LEFT)
        self.au_mot("Chaque case de sa planche")
        self.play(FadeIn(l0[0], shift=UP * 0.1), Indicate(pl.cases[0], color=JAUNE_TITRE, scale_factor=1.1),
                  run_time=0.4)
        self.au_mot("doit avoir la bonne taille")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        r = regle(7, 0.5, h=0.6, fs=16).move_to(P(2.35, -0.55))
        l1 = self.t("Il prend sa règle graduée.", 30, JAUNE_TITRE)
        l1.move_to(P(0, 0.55)).align_to(P(0.2, 0), LEFT)
        self.au_mot("sa règle graduée")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(r, shift=LEFT * 0.4), run_time=0.4)
        self.au_mot("pour mesurer")
        self.play(r.animate.shift(DOWN * 0.1), Indicate(r.traits, color=ORANGE_RETENUE), run_time=0.5)
        self.attendre_voix()

    # ── 02 : la règle : cm et mm (zoom sur 1 cm) ────────────────────────────
    def ecran_regle(self):
        self.ecran("02-regle")
        r = regle(10, 1.05, h=0.9, fs=24).move_to(P(0, 2.35))
        self.au_mot("Sur la règle")
        self.play(FadeIn(r, shift=DOWN * 0.2), run_time=0.4)
        grands = VGroup(*[r.traits[k] for k in range(0, len(r.traits), 10)])
        petits = VGroup(*[r.traits[k] for k in range(len(r.traits)) if k % 10])
        self.au_mot("les grands traits")
        self.play(grands.animate.set_color(BLEU_D).set_stroke(width=5), Indicate(r.nums, color=BLEU_D),
                  run_time=0.5)
        l1 = self.ligne([("Les grands traits :", WHITE), ("cm", BLEU_D)], 36, buff=0.2)
        gauche(l1, 0.4, 0.75)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("sont les centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        # le zoom : 1 cm (de 2 à 3) agrandi dessous, à gauche
        z = regle(1, 4.5, depuis=2, h=1.45, fs=30).move_to(P(-3.85, -0.75))
        cz = cadre_zone(r, 2, 3, dessus=0.1)
        cl = SurroundingRectangle(z, color=ORANGE_RETENUE, buff=0.12, stroke_width=4)
        self.au_mot("Entre deux")
        self.play(Create(cz), run_time=0.3)
        self.play(TransformFromCopy(VGroup(*[r.traits[k] for k in range(20, 31)]), z.traits), FadeIn(z.corps),
                  FadeIn(z.nums), Create(cl), Create(liens(cz, cl)), run_time=0.7)
        self.add(z)
        self.au_mot("les petits traits")
        zp = VGroup(*[z.traits[k] for k in range(1, 10)])
        l2 = self.ligne([("Les petits traits :", WHITE), ("mm", ROUGE_ERREUR)], 36, buff=0.2)
        gauche(l2, 0.4, -0.15)
        self.play(petits.animate.set_color(ROUGE_ERREUR), zp.animate.set_color(ROUGE_ERREUR),
                  FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("sont les millimètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        # les 10 petits espaces comptés sous le zoom
        nums = VGroup(*[hors_audit(Text(str(k + 1), font_size=20, color=JAUNE_TITRE, weight=BOLD)
                                   .move_to(P((z.x(2 + k / 10) + z.x(2 + (k + 1) / 10)) / 2,
                                              cl.get_bottom()[1] - 0.3))) for k in range(10)])
        l3 = self.ligne([("10 mm", VERT_OK), ("dans 1 cm", BLEU_D)], 44, buff=0.3)
        gauche(l3, 0.4, -1.25)
        self.au_mot("10 millimètres")
        self.play(LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.12), FadeIn(l3[0], shift=UP * 0.1),
                  run_time=0.6)
        self.au_mot("dans 1 centimètre")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l3, 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : on part du 0 (la case de BD de 0 à 8) ──────────────────────────
    def ecran_zero(self):
        self.ecran("03-zero")
        r = regle(10, 0.9, h=0.85, fs=22).move_to(P(-1.55, -0.7))
        self.add(r)
        l0 = self.ligne([("On pose le début", WHITE), ("sur le 0,", VERT_OK)], 34, buff=0.2)
        gauche(l0, -6.2, 3.05)
        self.au_mot("on pose le début sur le 0")
        z0 = repere(r, 0, VERT_OK)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(z0), Indicate(r.nums[0], color=VERT_OK, scale_factor=1.6),
                  run_time=0.45)
        l1 = self.t("pas au bout de la règle.", 34, ROUGE_ERREUR)
        gauche(l1, -6.2, 2.45)
        bout = Rectangle(width=0.25, height=r.corps.height, fill_color=ROUGE_ERREUR, fill_opacity=0.75,
                         stroke_width=0).align_to(r.corps, LEFT).set_y(r.corps.get_y())
        self.au_mot("pas au bout de la règle")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(bout), run_time=0.35)
        self.play(Flash(bout, color=ROUGE_ERREUR, line_length=0.2), run_time=0.4)
        self.play(FadeOut(bout), run_time=0.2)
        # la case de BD, posée sur la règle de 0 à 8
        case = case_bd(r.x(8) - r.x(0), 1.6)
        case.move_to(P((r.x(0) + r.x(8)) / 2, r.haut() + 0.06 + 0.8))
        cote = Line(P(r.x(0), r.haut() + 0.06), P(r.x(8), r.haut() + 0.06), color=ORANGE_RETENUE, stroke_width=9)
        self.au_mot("Le côté de la case")
        self.play(FadeIn(case, shift=DOWN * 0.3), run_time=0.45)
        l2 = self.ligne([("Le côté", WHITE), ("part du 0", WHITE), ("et arrive sur le 8 :", WHITE)], 34, buff=0.2)
        gauche(l2, -6.2, -1.85)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("part du 0")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(cote), run_time=0.45)
        z8 = repere(r, 8, VERT_OK)
        self.au_mot("arrive sur le 8")
        self.play(FadeIn(l2[2], shift=UP * 0.1), Create(z8), Indicate(r.nums[8], color=VERT_OK, scale_factor=1.6),
                  run_time=0.45)
        l3 = self.ligne([("il mesure", WHITE), ("8 cm.", VERT_OK)], 46, buff=0.25)
        gauche(l3, -6.2, -2.75)
        self.au_mot("il mesure 8")
        self.play(FadeIn(l3, scale=1.15), Indicate(cote, color=VERT_OK), run_time=0.5)
        self.attendre_voix()

    # ── 04 : début décalé : la fin moins le début ───────────────────────────
    def ecran_decale(self):
        self.ecran("04-decale")
        r = regle(12, 0.85, h=0.8, fs=20).move_to(P(-0.9, -0.05))
        self.add(r)
        l0 = sans_synchro(self.t("Si le début n'est pas sur le 0,", 34))
        gauche(l0, -6.2, 3.05)
        self.au_mot("0, on fait")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = sans_synchro(self.ligne([("on fait", WHITE), ("la fin moins le début.", JAUNE_TITRE)], 34, buff=0.18))
        gauche(l1, -6.2, 2.45)
        self.au_mot("début. Le crayon")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        c = crayon_sur_regle(r, 3, 10, 0.32)
        d3, f10 = repere(r, 3, ORANGE_RETENUE), repere(r, 10, VERT_OK)
        bas = r.corps.get_bottom()[1] - 0.3
        e3 = hors_audit(self.t("début", 26, ORANGE_RETENUE).move_to(P(r.x(3), bas)))
        e10 = hors_audit(self.t("fin", 26, VERT_OK).move_to(P(r.x(10), bas)))
        l2 = self.ligne([("Le crayon va de 3", WHITE), ("à 10 :", WHITE)], 34, buff=0.18)
        gauche(l2, -6.2, -1.45)
        self.au_mot("Le crayon d'Adam")
        self.play(FadeIn(c, shift=DOWN * 0.3), FadeIn(l2[0], shift=UP * 0.1), Create(d3), FadeIn(e3), run_time=0.25)
        self.au_mot("à 10")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(f10), FadeIn(e10), run_time=0.35)
        arcs, nums = sauts(r, 3, 10, c.get_top()[1] + 0.06)
        l3 = self.ligne([("10 − 3", BLEU_D), ("= 7", VERT_OK)], 46, buff=0.25)
        gauche(l3, -6.2, -2.3)
        self.au_mot("10 moins")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("7. Il mesure")
        self.play(FadeIn(l3[1], shift=UP * 0.1),
                  LaggedStart(*[AnimationGroup(Create(a), FadeIn(n)) for a, n in zip(arcs, nums)], lag_ratio=0.3),
                  run_time=0.8)
        l4 = self.ligne([("Il mesure", WHITE), ("7 cm.", VERT_OK)], 40, buff=0.22)
        gauche(l4, -6.2, -3.1)
        self.au_mot("Il mesure 7")
        self.play(FadeIn(l4, scale=1.15), Indicate(c, color=VERT_OK, scale_factor=1.05), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        r = regle(8, 0.6, h=0.6, fs=18).move_to(P(-3.9, 1.45))
        return VGroup(r, gomme_sur_regle(r, 2, 6, 0.38))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g[0]), FadeIn(g[1], shift=DOWN * 0.2), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[1], color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Une gomme est posée", "de 2 à 6 sur la règle.", "Combien mesure-t-elle ?"],
                             [self.choix("6 cm"), self.choix("4 cm"), self.choix("8 cm")], 1,
                             ["La fin moins le début :", "6 − 2 = 4.", "La gomme mesure 4 cm."],
                             -0.75, couper={2: ("La gomme mesure", "4 cm.")},
                             mot_q="Une gomme", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (crayon posé sur le 1) ────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        r = regle(10, 0.9, h=0.85, fs=22).move_to(P(-1.55, 0.25))
        self.add(r)
        l0 = self.t("Si Adam pose son crayon sur le 1,", 34)
        gauche(l0, -6.2, 2.3)
        c = crayon_sur_regle(r, 1, 8, 0.32)
        d1 = repere(r, 1, ORANGE_RETENUE)
        self.au_mot("Si Adam pose")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(c, shift=DOWN * 0.3), Create(d1), run_time=0.45)
        f8 = repere(r, 8, ROUGE_ERREUR)
        l1 = self.t("la fin tombe sur le 8.", 34)
        gauche(l1, -6.2, -0.75)
        self.au_mot("la fin tombe sur le 8")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(f8), Indicate(r.nums[8], color=ROUGE_ERREUR, scale_factor=1.6),
                  run_time=0.45)
        l2 = self.ligne([("Il croit lire", WHITE), ("8 cm,", ROUGE_ERREUR)], 34, buff=0.2)
        gauche(l2, -6.2, -1.45)
        self.au_mot("Il croit lire 8")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        barre8 = Line(l2[1].get_corner(DL), l2[1].get_corner(UR), color=ROUGE_ERREUR, stroke_width=6)
        arcs, nums = sauts(r, 1, 8, c.get_top()[1] + 0.06)
        l3 = self.ligne([("mais le crayon en mesure", WHITE), ("7.", VERT_OK)], 34, buff=0.2)
        gauche(l3, -6.2, -2.15)
        self.au_mot("mais le crayon")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(barre8), run_time=0.3)
        self.au_mot("7. On part")
        self.play(FadeIn(l3[1], scale=1.3),
                  LaggedStart(*[AnimationGroup(Create(a), FadeIn(n)) for a, n in zip(arcs, nums)], lag_ratio=0.3),
                  run_time=0.8)
        l4 = self.t("On part toujours du 0.", 38, JAUNE_TITRE)
        gauche(l4, -6.2, -2.95)
        self.au_mot("On part toujours du 0")
        u = r.x(1) - r.x(0)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeOut(arcs), FadeOut(nums), FadeOut(f8), run_time=0.3)
        self.play(c.animate.shift(LEFT * u), d1.animate.shift(LEFT * u).set_color(VERT_OK),
                  run_time=0.6)
        self.attendre_voix()

    # ── 07 : entre deux nombres : les mm (zoom) ─────────────────────────────
    def ecran_mm(self):
        self.ecran("07-mm")
        r = regle(7, 1.1, h=1.0, fs=26).move_to(P(-2.55, 0.9))
        self.add(r)
        l0 = self.t("Et si la fin tombe entre deux nombres ?", 34, JAUNE_TITRE)
        gauche(l0, -6.2, 3.1)
        tr = trait_sur_regle(r, 0, 5.3)
        self.au_mot("entre deux nombres")
        self.play(FadeIn(l0, shift=UP * 0.1), GrowFromEdge(tr, LEFT), run_time=0.6)
        l1 = self.t("On compte les petits traits.", 34)
        gauche(l1, -6.2, 2.45)
        z = regle(1, 3.6, depuis=5, h=1.15, fs=26).move_to(P(4.4, 0.95))
        tz = Rectangle(width=z.x(5.3) - z.corps.get_left()[0], height=0.2, fill_color=ENCRE, fill_opacity=1,
                       stroke_width=0)
        tz.move_to(P((z.corps.get_left()[0] + z.x(5.3)) / 2, z.haut() + 0.07 + 0.1))
        cz = cadre_zone(r, 5, 6, dessus=0.35)
        cl = SurroundingRectangle(VGroup(z, tz), color=ORANGE_RETENUE, buff=0.12, stroke_width=4)
        self.au_mot("On compte les petits traits")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cz), run_time=0.35)
        self.play(FadeIn(z), FadeIn(tz), Create(cl), Create(liens(cz, cl)), run_time=0.6)
        l2 = self.ligne([("Ce trait arrive sur le 5,", WHITE), ("plus 3 petits traits :", WHITE)], 34, buff=0.2)
        gauche(l2, -6.2, -0.75)
        f5 = repere(r, 5, VERT_OK)
        self.au_mot("arrive sur le 5")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(f5), Indicate(r.nums[5], color=VERT_OK, scale_factor=1.5),
                  run_time=0.4)
        nums = VGroup(*[hors_audit(Text(str(k + 1), font_size=24, color=JAUNE_TITRE, weight=BOLD)
                                   .move_to(P(z.x(5 + (k + 1) / 10), cl.get_bottom()[1] - 0.28))) for k in range(3)])
        zt = VGroup(*[z.traits[k] for k in range(1, 4)])
        self.au_mot("plus 3 petits traits")
        self.play(FadeIn(l2[1], shift=UP * 0.1), zt.animate.set_color(ROUGE_ERREUR).set_stroke(width=4),
                  LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.3), run_time=0.6)
        l3 = self.ligne([("5 cm", BLEU_D), ("3 mm", BLEU_D), ("= 53 mm", VERT_OK)], 50, buff=0.3)
        gauche(l3, -6.2, -1.85)
        self.au_mot("5 centimètres 3")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 millimètres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("53 millimètres")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        self.insister(l3, 1.12, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        r = regle(6, 0.75, h=0.65, fs=18).move_to(P(-3.9, 1.45))
        return VGroup(r, trait_sur_regle(r, 0, 4.5, ep=0.12))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g[0]), GrowFromEdge(g[1], LEFT), run_time=0.35)

        self.question_gauche("08-question", "08b-reponse",
                             ["Un trait mesure", "4 cm 5 mm.", "Combien de millimètres ?"],
                             [self.choix("45 mm"), self.choix("9 mm"), self.choix("405 mm")], 0,
                             ["4 cm = 40 mm.", "Plus 5 : 45 mm."],
                             -0.75, mot_q="Un trait mesure", autres_q=autres_q)

    # ── 09 : le défi (trait de 2 cm à 8 cm 6 mm) ────────────────────────────
    def regle_defi(self):
        r = regle(10, 1.0, h=0.85, fs=22).move_to(P(-1.2, 1.15))
        return r, trait_sur_regle(r, 2, 8.6)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        r, tr = self.regle_defi()
        self.play(FadeIn(r), run_time=0.3)
        l0 = self.t("Adam trace un trait qui part de 2 cm", 34)
        gauche(l0, -6.2, 0.0)
        d2 = repere(r, 2, ORANGE_RETENUE)
        self.au_mot("Adam trace")
        self.play(FadeIn(l0, shift=UP * 0.1), Create(d2), run_time=0.35)
        l1 = self.ligne([("et arrive à", WHITE), ("8 cm 6 mm.", WHITE)], 34, buff=0.18)
        gauche(l1, -6.2, -0.65)
        f86 = repere(r, 8.6, VERT_OK)
        self.au_mot("arrive à 8 centimètres 6")
        self.play(FadeIn(l1, shift=UP * 0.1), GrowFromEdge(tr, LEFT), run_time=0.6)
        self.play(Create(f86), run_time=0.25)
        l2 = self.ligne([("Combien mesure le trait,", JAUNE_TITRE), ("en mm ?", JAUNE_TITRE)], 36, buff=0.2)
        gauche(l2, -6.2, -1.6)
        self.au_mot("Combien mesure le trait")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en millimètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Wiggle(tr), run_time=0.5)
        self.pause_gauche(y=-2.55)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        r, tr = self.regle_defi()
        d2, f86 = repere(r, 2, ORANGE_RETENUE), repere(r, 8.6, VERT_OK)
        self.add(r, tr, d2, f86)
        l0 = self.ligne([("La fin", VERT_OK), ("moins le début :", ORANGE_RETENUE)], 34, buff=0.18)
        gauche(l0, -6.2, 0.0)
        self.au_mot("La fin moins le début")
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(f86, color=VERT_OK), Indicate(d2, color=ORANGE_RETENUE),
                  run_time=0.4)
        l1 = self.ligne([("8 cm 6 mm", BLEU_D), ("− 2 cm", ORANGE_RETENUE)], 40, buff=0.25)
        gauche(l1, -6.2, -0.75)
        self.au_mot("8 centimètres 6 millimètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        u = r.x(1) - r.x(0)
        self.au_mot("moins 2 centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        # on enlève les 2 cm du début : le trait glisse jusqu'au 0
        self.play(VGroup(tr, f86).animate.shift(LEFT * 2 * u), d2.animate.shift(LEFT * 2 * u), run_time=0.7)
        l2 = self.ligne([("Il reste", WHITE), ("6 cm 6 mm.", VERT_OK)], 40, buff=0.25)
        gauche(l2, -6.2, -1.6)
        self.au_mot("Il reste 6 centimètres 6")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(tr, color=VERT_OK, scale_factor=1.05), run_time=0.4)
        l3 = self.ligne([("C'est", WHITE), ("66 mm.", VERT_OK)], 50, buff=0.25)
        gauche(l3, -6.2, -2.6)
        self.au_mot("C'est 66")
        self.play(FadeIn(l3, scale=1.2), run_time=0.4)
        self.insister(l3, 1.12, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        r = regle(4, 0.85, h=0.66, fs=20)
        fig = VGroup(r, crayon_sur_regle(r, 0, 3, 0.26))
        lignes = self.finale_gauche(fig, textes=[
            ("Pour mesurer,", "on part du 0."),
            ("Sinon : la fin", "moins le début."),
            ("Les petits traits", "sont les mm :"),
            ("1 cm = 10 mm.",)], fs=36)
        self.add(fig)
        self.au_mot("Pour mesurer")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Sinon")
        self.montrer_ligne(lignes[1])
        self.au_mot("Les petits traits")
        self.montrer_ligne(lignes[2])
        self.au_mot("1 centimètre")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_regle()
        self.ecran_zero()
        self.ecran_decale()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_mm()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class LongueurMesurerCM1(LongueurMesurerBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
