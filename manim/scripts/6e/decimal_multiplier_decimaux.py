# decimal_multiplier_decimaux.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 09 : MULTIPLIER DEUX NOMBRES DÉCIMAUX
# (micro decimal_multiplier_decimaux, notion decimal_calcul), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux-multiplier-decimaux.js).
# Décor et métier : Anaïs, CARRELEUSE (centres : construction, cuisine).
# Écrans : garde (00), situation (01), le carré de 1 m (02), la zone (03), la méthode (04),
# QUESTION 1 (05), de plus grands nombres (06), le piège (07), QUESTION 2 (08), défi (09) et
# correction (09b), appris (10), fin (11).
# Voix : manim/voix/6e-decimal-multiplier-decimaux.json (Julie, débit −6) ;
# marques : decimal_multiplier_decimaux_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_multiplier_decimaux.py DecimalMultiplierDecimaux6e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_multiplier_decimaux.py DecimalMultiplierDecimaux6e -o eleveai-maths-6e-decimal-multiplier-decimaux --media_dir manim/scripts/6e/media-dec-09
# Sortie : manim/sorties/6e/maths/decimaux/09-multiplier-decimaux/eleveai-maths-6e-decimal-multiplier-decimaux.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403

VERT_F = "#4ade80"
TUILE = "#38bdf8"


def rangee(s, xd, y, w=0.64, fs=60, couleur=WHITE, c_virg=ROUGE_ERREUR):
    """Une ligne d'opération posée : les chiffres de s en colonnes de largeur w, le
    dernier sur la colonne xd ; la virgule ENTRE deux colonnes, en bas ; « × » à gauche.
    .ch : les chiffres (de gauche à droite), .virgule (ou None), .signe (ou None). Hors audit."""
    g = VGroup()
    chiffres = [c for c in s if c.isdigit()]
    n, k = len(chiffres), 0
    g.ch, g.virgule, g.signe = [], None, None
    for c in s:
        if c.isdigit():
            t = Text(c, font_size=fs, color=couleur, weight=BOLD).move_to(P(xd - (n - 1 - k) * w, y))
            g.ch.append(t)
            g.add(t)
            k += 1
        elif c == ",":
            v = Text(",", font_size=fs, color=c_virg, weight=BOLD)
            v.move_to(P(xd - (n - k) * w + w / 2, y - fs / 60 * 0.3))
            g.virgule = v
            g.add(v)
    if s.strip().startswith("×"):
        g.signe = Text("×", font_size=fs, color=couleur).move_to(P(xd - (n - 0.2) * w - 0.35, y))
        g.add(g.signe)
    return hors_audit(g)


def grille(cote=4.4, n=10, traits=True):
    """Le carré de 1 m de côté coupé en n × n petits carreaux. .cadre, .verticales, .horizontales,
    .case(i, j) (colonne i depuis la gauche, rangée j depuis le bas)."""
    g = VGroup()
    fond = Square(cote, stroke_width=0, fill_color=CASE, fill_opacity=0.55)
    cadre = Square(cote, stroke_color=WHITE, stroke_width=5)
    pas = cote / n
    ver = VGroup(*[Line(P(-cote / 2 + i * pas, -cote / 2), P(-cote / 2 + i * pas, cote / 2), color="#94a3b8",
                        stroke_width=2) for i in range(1, n)])
    hor = VGroup(*[Line(P(-cote / 2, -cote / 2 + i * pas), P(cote / 2, -cote / 2 + i * pas), color="#94a3b8",
                        stroke_width=2) for i in range(1, n)])
    g.add(fond, ver, hor, cadre)
    g.fond, g.cadre, g.verticales, g.horizontales, g.pas = fond, cadre, ver, hor, pas

    def case(i, j, couleur=TUILE, op=0.9):
        c = Square(pas, stroke_width=0, fill_color=couleur, fill_opacity=op)
        return c.move_to(fond.get_corner(DL) + P((i + 0.5) * pas, (j + 0.5) * pas))

    def bloc(nx, ny, couleur=TUILE, op=0.9):
        r = Rectangle(width=nx * pas, height=ny * pas, stroke_color=couleur, stroke_width=4, fill_color=couleur,
                      fill_opacity=op)
        return r.move_to(fond.get_corner(DL) + P(nx * pas / 2, ny * pas / 2))

    g.case, g.bloc = case, bloc
    return g


def anais(s=1.0):
    """Anaïs, carreleuse : bleu de travail, genouillères, une truelle."""
    p = visage(personne(peau="#8d5524", tenue="#1d4ed8", cheveux="#111827", longs=True, s=s))
    c = p.corps.get_center()
    bandeau = Rectangle(width=p.tete.width * 1.02, height=0.12 * s, fill_color="#f97316", fill_opacity=1,
                        stroke_width=0).move_to(p.tete.get_center() + UP * 0.22 * s)
    truelle = VGroup(Polygon(c + P(0.62 * s, -0.1 * s), c + P(0.98 * s, -0.1 * s), c + P(0.8 * s, 0.32 * s),
                             fill_color="#cbd5e1", fill_opacity=1, stroke_width=0),
                     Line(c + P(0.8 * s, -0.1 * s), c + P(0.8 * s, -0.42 * s), color="#92400e", stroke_width=8 * s))
    p.add(bandeau, truelle)
    return p


def mur_carrele(larg=3.6, haut=3.15, n=8, m=7):
    g = VGroup()
    fond = Rectangle(width=larg, height=haut, fill_color="#e7e5e4", fill_opacity=1, stroke_width=0)
    g.add(fond)
    pw, ph = larg / n, haut / m
    for i in range(n):
        for j in range(m):
            if j >= 6 or i >= 3:
                t = Rectangle(width=pw * 0.94, height=ph * 0.94, stroke_width=0, fill_color=TUILE if (i + j) % 2 else "#7dd3fc",
                              fill_opacity=1)
                g.add(t.move_to(fond.get_corner(DL) + P((i + 0.5) * pw, (j + 0.5) * ph)))
    zone = Rectangle(width=3 * pw, height=6 * ph, stroke_color=AMBRE_D, stroke_width=6, fill_opacity=0)
    g.zone, g.zone_dec = zone, P(1.5 * pw, 3 * ph)
    return g


class DecimalMultiplierDecimauxBase(PaysageDecimal):
    nom_voix = "6e-decimal-multiplier-decimaux"
    fichier_marques = "decimal_multiplier_decimaux_marques.json"

    def ligne_n(self, morceaux, mots, y, fs=34, xl=None, buff=0.18):
        """Une ligne de morceaux, chacun posé à son mot : mots[i] = « mot » ou (« mot », n)."""
        lg = self.ligne(morceaux, fs, buff=buff)
        self.col(lg, y, xl=xl)
        for m, mot in zip(lg, mots):
            if mot:
                self.au_mot(*(mot if isinstance(mot, tuple) else (mot,)))
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.28)
        return lg

    def scinder(self, lignes, k, i, morceaux):
        """Dans la finale : la ligne i du bloc k, recoupée en morceaux (texte, couleur) posés à la
        même place (un nombre et le premier mot dits à des instants éloignés)."""
        old = lignes[k][1][i]
        lg = self.ligne(morceaux, 36, buff=0.16)
        lg.scale(old.width / lg.width).align_to(old, LEFT).align_to(old, DOWN)
        lignes[k][1].submobjects[i] = lg
        return lg

    def barre_op(self, xg, xd, y):
        return Line(P(xg, y), P(xd, y), color=WHITE, stroke_width=5)

    def sous(self, chiffres, couleur=AMBRE_D):
        return VGroup(*[Line(c.get_corner(DL) + DOWN * 0.08, c.get_corner(DR) + DOWN * 0.08, color=couleur,
                             stroke_width=7) for c in chiffres])

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Multiplier deux nombres décimaux", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Multiplier")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de chiffres", "après la virgule ?"], 42).move_to(P(-3.3, 0.3))
        gr = grille(2.6).move_to(P(3.0, 0.4))
        z = gr.bloc(3, 6)
        self.au_mot("Combien de chiffres")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(gr), run_time=0.4)
        self.play(GrowFromEdge(z, DOWN), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Anaïs, carreleuse ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        an = anais(1.05).move_to(P(-5.6, 0.0))
        self.au_mot("Voici Anaïs")
        nom = self.t("Anaïs", 44, BLEU_CALCUL).next_to(an, UP, buff=0.2)
        self.play(FadeIn(an, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("carreleuse")
        met = self.t("carreleuse", 28, BLEU_CALCUL).next_to(an, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        mur = mur_carrele().move_to(P(-1.15, 0.5))
        self.au_mot("Elle pose")
        l1 = self.bloc(["Elle pose des carreaux", "sur un mur."], 36)
        self.col(l1, 2.3)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(mur, shift=UP * 0.2), run_time=0.5)
        z = mur.zone.move_to(mur[0].get_corner(DL) + mur.zone_dec)
        lg = self.ligne([("Une zone :", WHITE), ("0,3 m", AMBRE_D), ("sur 0,6 m.", ROSE_D)], 38)
        self.col(lg, 1.0)
        acc1 = BraceBetweenPoints(z.get_corner(DL), z.get_corner(DR), DOWN, color=AMBRE_D)
        e1 = self.t("0,3 m", 28, AMBRE_D).next_to(acc1, DOWN, buff=0.08)
        acc2 = BraceBetweenPoints(z.get_corner(UL), z.get_corner(DL), LEFT, color=ROSE_D)
        e2 = self.t("0,6 m", 28, ROSE_D).next_to(acc2, LEFT, buff=0.08)
        self.au_mot("Une zone")
        self.play(Create(z), FadeIn(lg[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("0,3 mètre")
        self.play(FadeIn(lg[1], shift=UP * 0.1), GrowFromCenter(acc1), FadeIn(e1), run_time=0.3)
        self.au_mot("0,6 mètre")
        self.play(FadeIn(lg[2], shift=UP * 0.1), GrowFromCenter(acc2), FadeIn(e2), run_time=0.3)
        self.au_mot("Quelle est son aire")
        q = self.t("Quelle est son aire ?", 42, JAUNE_TITRE)
        self.col(q, -0.1)
        self.play(FadeIn(q, shift=UP * 0.15), z.animate.set_fill(AMBRE_D, 0.45), run_time=0.45)
        self.attendre_voix()

    # ── 02 : le carré de 1 mètre ────────────────────────────────────────────
    def ecran_carre(self):
        self.ecran("02-carre")
        gr = grille(4.6).move_to(P(-3.3, 0.0))
        gr.verticales.set_opacity(0)
        gr.horizontales.set_opacity(0)
        l1 = self.ligne([("Un carré de", WHITE), ("1 m", WHITE), ("de côté.", WHITE)], 36)
        self.col(l1, 2.6)
        self.au_mot("un carré")
        self.play(FadeIn(gr.fond), Create(gr.cadre), FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("1 mètre")
        c1 = self.t("1 m", 30).next_to(gr, DOWN, buff=0.15)
        c2 = self.t("1 m", 30).next_to(gr, LEFT, buff=0.15)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c1), FadeIn(c2), run_time=0.3)
        self.au_mot("de côté")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("On le coupe")
        l2 = self.ligne([("Coupé en 10", WHITE), ("sur la largeur,", WHITE)], 34)
        self.col(l2, 1.5)
        self.au_mot("en 10 sur la largeur")
        self.play(FadeIn(l2, shift=UP * 0.1), LaggedStart(*[l.animate.set_opacity(1) for l in gr.verticales], lag_ratio=0.1),
                  run_time=0.45)
        self.au_mot("et en 10 sur la hauteur")
        l3 = self.ligne([("et en 10", WHITE), ("sur la hauteur :", WHITE)], 34)
        self.col(l3, 0.85)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("sur la hauteur")
        self.play(FadeIn(l3[1], shift=UP * 0.1),
                  LaggedStart(*[l.animate.set_opacity(1) for l in gr.horizontales], lag_ratio=0.1), run_time=0.45)
        self.au_mot("100 petits")
        l4 = self.t("100 petits carreaux.", 38, TUILE)
        self.col(l4, 0.1)
        self.play(FadeIn(l4, scale=1.2), gr.fond.animate.set_fill(TUILE, 0.25), run_time=0.45)
        self.au_mot("Chacun vaut")
        un = gr.case(0, 9, AMBRE_D, 1)
        self.ligne_n([("Chacun vaut", WHITE)], [None], -0.75, fs=36)
        self.play(FadeIn(un, scale=1.5), run_time=0.3)
        self.au_mot("0,01")
        g = self.gros("0,01 m²", fs=58, couleur=AMBRE_D)
        self.col(g, -1.75, xl=1.3)
        loupe = Circle(radius=0.42, color=AMBRE_D, stroke_width=6).move_to(un)
        self.play(FadeIn(g, scale=1.3), Create(loupe), run_time=0.45)
        self.attendre_voix()

    # ── 03 : la zone ────────────────────────────────────────────────────────
    def ecran_zone(self):
        self.ecran("03-zone")
        gr = grille(4.6).move_to(P(-3.3, 0.0))
        c1 = self.t("1 m", 30).next_to(gr, DOWN, buff=0.15)
        c2 = self.t("1 m", 30).next_to(gr, LEFT, buff=0.15)
        hors_audit(c1), hors_audit(c2)
        self.add(gr, c1, c2)
        z = gr.bloc(3, 6, AMBRE_D, 0.75)
        self.au_mot("La zone")
        self.ligne_n([("La zone :", WHITE), ("3 carreaux", AMBRE_D), ("sur 6.", ROSE_D)], [None, "3 carreaux", "sur 6"], 2.6,
                     fs=38)
        self.play(GrowFromEdge(z, DOWN), run_time=0.6)
        self.au_mot("3 fois 6")
        self.ligne_n([("3 × 6", WHITE), ("= 18", VERT_OK), ("petits carreaux.", WHITE)], ["3 fois 6", "18", "petits"], 1.6,
                     fs=38)
        cases = VGroup(*[gr.case(i, j, AMBRE_D, 1) for j in range(6) for i in range(3)])
        self.play(LaggedStart(*[Indicate(c, color=WHITE, scale_factor=1.3) for c in cases], lag_ratio=0.05), run_time=0.45)
        self.au_mot("18 centièmes")
        l3 = self.ligne([("18", ROSE_D), ("centièmes :", ROSE_D)], 38)
        self.col(l3, 0.6)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("centièmes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("0,18")
        g = self.gros("0,18 m²", fs=62)
        self.col(g, -0.5, xl=1.3)
        self.play(FadeIn(g, scale=1.3), run_time=0.45)
        self.insister(g, 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        xd = -2.6
        h = rangee("0,3", xd, 1.75)
        b = rangee("× 0,6", xd, 0.75)
        trait = self.barre_op(xd - 2.1, xd + 0.4, 0.2)
        r = rangee("0,18", xd, -0.45, couleur=VERT_OK)
        self.au_mot("La méthode")
        tit = self.t("La méthode :", 42, JAUNE_TITRE)
        self.col(tit, 2.8)
        self.play(Write(tit), FadeIn(h), FadeIn(b), Create(trait), run_time=0.45)
        self.au_mot("on oublie les virgules")
        l1 = self.t("on oublie les virgules.", 36)
        self.col(l1, 2.05)
        self.play(FadeIn(l1, shift=UP * 0.1), h.virgule.animate.set_opacity(0.15), b.virgule.animate.set_opacity(0.15),
                  h.ch[0].animate.set_opacity(0.15), b.ch[0].animate.set_opacity(0.15), run_time=0.4)
        self.ligne_n([("3 × 6", WHITE), ("= 18", VERT_OK)], ["3 fois 6", "18"], 1.25, fs=42)
        self.play(FadeIn(r.ch[1], scale=1.5), FadeIn(r.ch[2], scale=1.5), run_time=0.3)
        self.au_mot("On compte")
        l3 = self.t("On compte les chiffres", 34)
        l3b = self.t("après la virgule :", 34)
        self.col(l3, 0.45)
        self.col(l3b, -0.05)
        self.play(FadeIn(l3, shift=UP * 0.1), h.virgule.animate.set_opacity(1), b.virgule.animate.set_opacity(1),
                  h.ch[0].animate.set_opacity(1), b.ch[0].animate.set_opacity(1), run_time=0.35)
        self.play(FadeIn(l3b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("un dans 0,3")
        l4 = self.ligne([("un dans 0,3,", AMBRE_D), ("un dans 0,6.", ROSE_D)], 34)
        self.col(l4, -0.75)
        s1, s2 = self.sous([h.ch[1]], AMBRE_D), self.sous([b.ch[1]], ROSE_D)
        self.play(FadeIn(l4[0], shift=UP * 0.1), Create(s1), run_time=0.3)
        self.au_mot("un dans 0,6")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Create(s2), run_time=0.3)
        self.au_mot("Deux en tout")
        l5 = self.t("Deux en tout.", 36, VERT_F)
        self.col(l5, -1.45)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Le résultat a deux")
        s3 = self.sous(r.ch[1:], VERT_F)
        self.play(Create(s3), FadeIn(r.ch[0], scale=1.4), FadeIn(r.virgule, scale=2.5), run_time=0.4)
        self.au_mot("0,18")
        g = self.gros("0,18", fs=56)
        self.col(g, -2.35, xl=1.4)
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        gr = grille(4.2).move_to(P(-3.5, 0.1))
        z = gr.bloc(4, 2, AMBRE_D, 0.85)

        def avant(sc):
            sc.play(FadeIn(gr), run_time=0.25)

        def apres(sc):
            lg = sc.ligne_rep(0, ["4 × 2", "= 8."])
            sc.au_mot("4 fois 2")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), GrowFromEdge(z, DOWN), run_time=0.35)
            sc.au_mot("8")
            sc.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
            cases = VGroup(*[gr.case(i, j, AMBRE_D, 1) for j in range(2) for i in range(4)])
            sc.au_mot("Deux chiffres")
            sc.rep(1, avec=[LaggedStart(*[Indicate(c, color=WHITE, scale_factor=1.4) for c in cases], lag_ratio=0.1)])
            lg2 = sc.ligne_rep(2, ["la virgule :", "0,08."])
            sc.au_mot("la virgule")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("0,08")
            sc.play(FadeIn(lg2[1], scale=1.3), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Combien font", "0,4 × 0,2 ?"],
                            [self.t("0,8", 36), self.t("0,08", 36), self.t("8", 36)], 1,
                            ["4 × 2 = 8.", "Deux chiffres après", "la virgule : 0,08."], mot_q="Combien",
                            avant_q=avant, autres_r=apres)

    # ── 06 : de plus grands nombres ─────────────────────────────────────────
    def ecran_grand(self):
        self.ecran("06-grand")
        xd, w, fs = -2.2, 0.6, 52
        h = rangee("2,6", xd, 2.55, w, fs)
        b = rangee("× 7,4", xd, 1.75, w, fs)
        t1 = self.barre_op(xd - 2.7, xd + 0.35, 1.3)
        p1 = rangee("104", xd, 0.85, w, fs)
        p2 = rangee("1820", xd, 0.05, w, fs)
        t2 = self.barre_op(xd - 2.7, xd + 0.35, -0.4)
        r = rangee("19,24", xd, -0.85, w, fs, couleur=VERT_OK)
        self.au_mot("Avec de plus grands")
        l0 = self.t("De plus grands nombres :", 36, JAUNE_TITRE)
        self.col(l0, 2.85)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.ligne_n([("2,6", AMBRE_D), ("× 7,4", ROSE_D)], ["2,6", "7,4"], 2.2, fs=40)
        self.play(FadeIn(h), FadeIn(b), Create(t1), run_time=0.35)
        self.au_mot("On calcule")
        l2 = self.ligne([("On calcule", WHITE), ("26 × 74", WHITE), ("=", WHITE)], 32)
        self.col(l2, 1.5)
        self.play(FadeIn(l2[0], shift=UP * 0.1), h.virgule.animate.set_opacity(0.15),
                  b.virgule.animate.set_opacity(0.15), run_time=0.3)
        self.au_mot("26 fois 74")
        self.play(FadeIn(l2[1]), FadeIn(l2[2]), FadeIn(p1), run_time=0.35)
        self.play(FadeIn(p2), Create(t2), run_time=0.35)
        self.au_mot("1 924")
        res = hors_audit(self.t("1 924", 32, VERT_OK)).next_to(l2, RIGHT, buff=0.16)
        if res.get_right()[0] > self.BORD_X - 0.1:
            VGroup(l2, res).scale_to_fit_width(self.BORD_X - 0.1 - self.XL).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(res, scale=1.3), *[FadeIn(c, scale=1.3) for c in r.ch], run_time=0.35)
        self.au_mot("Un chiffre")
        l3 = self.t("Un chiffre, plus un : deux.", 34)
        self.col(l3, 0.7)
        s1, s2 = self.sous([h.ch[1]], AMBRE_D), self.sous([b.ch[1]], ROSE_D)
        self.play(FadeIn(l3, shift=UP * 0.1), h.virgule.animate.set_opacity(1), b.virgule.animate.set_opacity(1),
                  Create(s1), run_time=0.35)
        self.au_mot("plus un")
        self.play(Create(s2), run_time=0.3)
        self.au_mot("Résultat")
        s3 = self.sous(r.ch[2:], VERT_F)
        self.play(Create(s3), FadeIn(r.virgule, scale=2.5), run_time=0.35)
        self.au_mot("19,24")
        g = self.gros("19,24", fs=54)
        self.col(g, -0.2, xl=1.3)
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("Ordre de grandeur")
        l4 = self.t("Ordre de grandeur :", 34, JAUNE_TITRE)
        self.col(l4, -1.15)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.ligne_n([("3 × 7", WHITE), ("= 21.", VERT_F)], ["3 fois 7", "21"], -1.8, fs=36)
        self.au_mot("C'est proche")
        pr = self.t("C'est proche.", 36, VERT_OK)
        self.col(pr, -2.45)
        self.play(FadeIn(pr, shift=UP * 0.1), Indicate(g, color=VERT_OK), run_time=0.4)
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Surprise")
        tit = self.t("Surprise !", 48, ROUGE_ERREUR)
        self.col(tit, 2.85)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Multiplier ne rend pas")
        l1 = self.bloc(["Multiplier ne rend pas", "toujours plus grand."], 36)
        self.col(l1, 1.95)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        # trois barres, à la même échelle : 0,6 ; 0,3 ; 0,18 (1 unité = 5,6)
        k, xg = 5.6, -6.1
        cadre = Rectangle(width=k, height=0.55, stroke_color=WHITE, stroke_width=3).move_to(P(xg + k / 2, 2.4))
        un = hors_audit(self.t("1", 28)).next_to(cadre, UP, buff=0.1).align_to(cadre, RIGHT)

        def barre(v, y, c):
            return Rectangle(width=k * v, height=0.55, stroke_width=0, fill_color=c, fill_opacity=0.9).move_to(
                P(xg + k * v / 2, y))
        b6, b3, b18 = barre(0.6, 1.25, ROSE_D), barre(0.3, 0.25, AMBRE_D), barre(0.18, -0.75, VERT_OK)
        e6 = hors_audit(self.t("0,6", 30, ROSE_D)).next_to(b6, RIGHT, buff=0.15)
        e3 = hors_audit(self.t("0,3", 30, AMBRE_D)).next_to(b3, RIGHT, buff=0.15)
        e18 = hors_audit(self.t("0,18", 30, VERT_OK)).next_to(b18, RIGHT, buff=0.15)
        self.play(Create(cadre), FadeIn(un), run_time=0.3)
        self.au_mot("0,3 fois")
        self.ligne_n([("0,3 × 0,6", WHITE), ("= 0,18", VERT_OK)], ["0,3 fois", "0,18"], 0.95, fs=40)
        self.play(GrowFromEdge(b3, LEFT), FadeIn(e3), GrowFromEdge(b6, LEFT), FadeIn(e6), run_time=0.4)
        self.play(GrowFromEdge(b18, LEFT), FadeIn(e18), run_time=0.4)
        self.au_mot("C'est plus petit")
        l3 = self.bloc(["C'est plus petit que", "les deux nombres !"], 36, VERT_OK)
        self.col(l3, 0.0)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(b18, color=VERT_OK), run_time=0.4)
        self.au_mot("Multiplier par un nombre")
        l4, l4b = self.bloc(["× un nombre", "plus petit que 1 :"], 34, JAUNE_TITRE)
        self.col(VGroup(l4, l4b), -1.35)
        l5 = self.bloc(["on en prend", "une partie."], 34, JAUNE_TITRE)
        self.col(l5, -2.4)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus petit que 1")
        self.play(FadeIn(l4b, shift=UP * 0.1), Indicate(cadre, color=WHITE), run_time=0.35)
        self.au_mot("c'est en prendre")
        self.play(FadeIn(l5, shift=UP * 0.1), Indicate(b18, color=VERT_OK, scale_factor=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        k, xg = 2.2, -6.2
        b25 = Rectangle(width=k * 2.5, height=0.7, stroke_width=0, fill_color=BLEU_D, fill_opacity=0.9).move_to(
            P(xg + k * 1.25, 1.0))
        b2 = Rectangle(width=k * 2.0, height=0.7, stroke_width=0, fill_color=VERT_OK, fill_opacity=0.9).move_to(
            P(xg + k * 1.0, -0.6))
        ticks = VGroup(*[Line(P(xg + k * i, 0.55), P(xg + k * i, 1.45), color=WHITE, stroke_width=3) for i in range(3)])

        def avant(sc):
            sc.play(FadeIn(b25), FadeIn(ticks), run_time=0.25)

        def apres(sc):
            # les cartes fausses s'effacent : l'explication prend leur place, en grand
            ca = sc.cartes_q
            haut, g = ca[1].get_top()[1], ca[0].get_left()[0]
            sc.play(FadeOut(ca[1]), FadeOut(ca[2]), run_time=0.25)
            mc = (["0,8", "est plus petit", "que 1."], ["Le résultat", "est plus petit"], ["que 2,5 :", "c'est 2."])
            l0, l1, l3 = [sc.ligne([(x, VERT_OK) for x in m], 32, buff=0.14) for m in mc]
            VGroup(l0, l1, l3).arrange(DOWN, aligned_edge=LEFT, buff=0.2).align_to(P(g, haut), UL)
            fl = DashedLine(b2.get_corner(UR), P(b2.get_right()[0], b25.get_bottom()[1]), color=VERT_OK)
            for lg, mot, avec in ((l0[0], "0,8 est", []), (l0[1], "est plus petit", []), (l0[2], "que 1", []),
                                  (l1[0], "Le résultat", [GrowFromEdge(b2, LEFT)]), (l1[1], "est plus petit que 2,5", []),
                                  (l3[0], "que 2,5", [Create(fl)]), (l3[1], "c'est 2", [Indicate(b2, color=VERT_OK)])):
                sc.au_mot(mot)
                sc.play(FadeIn(lg, shift=UP * 0.1), *avec, run_time=0.3)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["2,5 × 0,8 est-il plus petit", "ou plus grand que 2,5 ?"],
                            [self.t("plus petit", 34), self.t("plus grand", 34), self.t("égal", 34)], 0,
                            ["0,8 est plus petit que 1.", "Le résultat est plus petit", "que 2,5 : c'est 2."],
                            mot_q="2,5 fois", avant_q=avant, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        k = 3.6
        pl = Rectangle(width=1.2 * k, height=0.5 * k, stroke_color=WHITE, stroke_width=4, fill_color=TUILE,
                       fill_opacity=0.8).move_to(P(-2.45, 0.6))
        joints = VGroup(*[Line(pl.get_corner(DL) + RIGHT * i * k / 10, pl.get_corner(UL) + RIGHT * i * k / 10, color="#e0f2fe",
                               stroke_width=2) for i in range(1, 12)])
        joints.add(*[Line(pl.get_corner(DL) + UP * j * k / 10, pl.get_corner(DR) + UP * j * k / 10, color="#e0f2fe",
                          stroke_width=2) for j in range(1, 5)])
        self.au_mot("Une plaque")
        l1 = self.t("Une plaque de carrelage :", 36)
        self.col(l1, 2.0, xl=1.6)
        self.play(FadeIn(l1), FadeIn(pl), FadeIn(joints), run_time=0.4)
        a1 = BraceBetweenPoints(pl.get_corner(DL), pl.get_corner(DR), DOWN, color=AMBRE_D)
        a2 = BraceBetweenPoints(pl.get_corner(UL), pl.get_corner(DL), LEFT, color=ROSE_D)
        e1 = self.t("1,2 m", 32, AMBRE_D).next_to(a1, DOWN, buff=0.1)
        e2 = self.t("0,5 m", 32, ROSE_D).next_to(a2, LEFT, buff=0.1)
        self.au_mot("1,2 mètre")
        lg = self.ligne([("1,2 m", AMBRE_D), ("sur 0,5 m.", ROSE_D)], 40)
        self.col(lg, 1.2, xl=1.6)
        self.play(FadeIn(lg[0], scale=1.1), GrowFromCenter(a1), FadeIn(e1), run_time=0.35)
        self.au_mot("0,5 mètre")
        self.play(FadeIn(lg[1], scale=1.1), GrowFromCenter(a2), FadeIn(e2), run_time=0.35)
        self.au_mot("Quelle est son aire")
        l3 = self.t("Quelle est son aire ?", 38, ORANGE_RETENUE)
        self.col(l3, 0.3, xl=1.6)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.pause_defi(y=-0.7)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        xd = -2.6
        h = rangee("1,2", xd, 1.75)
        b = rangee("× 0,5", xd, 0.75)
        trait = self.barre_op(xd - 2.1, xd + 0.4, 0.2)
        r = rangee("0,60", xd, -0.45, couleur=VERT_OK)
        self.play(FadeIn(h), FadeIn(b), Create(trait), run_time=0.35)
        self.ligne_n([("12 × 5", WHITE), ("= 60", VERT_OK)], ["12 fois 5", "60"], 2.2, fs=42)
        self.play(FadeIn(r.ch[1], scale=1.4), FadeIn(r.ch[2], scale=1.4), run_time=0.3)
        self.au_mot("Deux chiffres")
        l2 = self.bloc(["Deux chiffres", "après la virgule :"], 36)
        self.col(l2, 1.15)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(self.sous([h.ch[1]], AMBRE_D)),
                  Create(self.sous([b.ch[1]], ROSE_D)), run_time=0.35)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(r.ch[0], scale=1.4), FadeIn(r.virgule, scale=2.5), run_time=0.3)
        self.au_mot("0,60")
        l3 = self.ligne([("0,60,", WHITE), ("c'est-à-dire", WHITE)], 38)
        self.col(l3, 0.05)
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.3)
        self.au_mot("c'est-à-dire")
        self.play(FadeIn(l3[1]), run_time=0.25)
        self.au_mot("0,6 mètre carré")
        g = self.gros("0,6 m²", fs=60)
        self.col(g, -1.15, xl=1.4)
        zero = r.ch[2]
        self.play(FadeIn(g, scale=1.3), zero.animate.set_opacity(0.25), run_time=0.4)
        self.insister(g, 1.15, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        xd = 0
        h = rangee("0,3", xd, 1.0, fs=56)
        b = rangee("× 0,6", xd, 0.0, fs=56)
        trait = self.barre_op(xd - 2.0, xd + 0.4, -0.5)
        r = rangee("0,18", xd, -1.05, fs=56, couleur=VERT_OK)
        fig = VGroup(h, b, trait, r)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On multiplie sans les virgules.",),
            ("On compte les chiffres après", "la virgule des deux nombres."),
            ("Le résultat en a autant.",),
            ("Multiplier par moins de 1", "rend plus petit.")], fs=36)
        self.scinder(lignes, 3, 0, [("Multiplier par", WHITE), ("moins de 1", WHITE)])
        self.au_mot("On multiplie")
        self.montrer_ligne(lignes[0])
        self.au_mot("On compte")
        self.montrer_ligne(lignes[1], Create(self.sous([h.ch[1], b.ch[1]], AMBRE_D)))
        self.au_mot("Le résultat")
        self.montrer_ligne(lignes[2], Create(self.sous(r.ch[1:], VERT_F)))
        self.au_mot("Multiplier par moins")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_carre()
        self.ecran_zone()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_grand()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class DecimalMultiplierDecimaux6e(DecimalMultiplierDecimauxBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
