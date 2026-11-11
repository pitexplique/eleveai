# mental_multiplication.py
# EleveAI — Maths 6e — série « Calcul mental », épisode 03 : MULTIPLIER DE TÊTE
# (micro entier_multiplication_mentale, notion entier_calcul_mental), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE. Short jumeau : film Ti Margo (prototypes/ti-margo/films/mental-multiplication.js).
# Décor et métier : Hugo, DJ (centres : musique, electro-dj).
# Micro → écrans : × 5 = × 10 puis la moitié (02, question 03), × 11 = × 10 puis encore une
# fois (04), le piège de la moitié oubliée et la vérification par un nombre rond (05,
# question 06), défi (07), appris (08).
# Voix : manim/voix/6e-mental-multiplication.json (Julie, débit −6) ; marques : mental_multiplication_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/mental_multiplication.py MentalMultiplication6e
# python -m manim render -qh --disable_caching manim/scripts/6e/mental_multiplication.py MentalMultiplication6e -o eleveai-maths-6e-mental-multiplication --media_dir manim/scripts/6e/media-men-03
# Sortie : manim/sorties/6e/maths/calcul-mental/03-multiplication/eleveai-maths-6e-mental-multiplication.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from mental_commun import *  # noqa: E402,F403

FOIS = "×"
LAMPE = "#fde047"
LAMPE_OFF = "#475569"
CENTAINES = "#a78bfa"


def hugo(s=1.0):
    """Hugo, DJ : casque audio sur les oreilles, tee-shirt avec un éclair."""
    p = visage(personne(peau="#8d5524", tenue="#0f766e", cheveux="#111827", s=s))
    c = p.corps.get_center()
    eclair = Polygon(*[c + P(x * s, y * s) for x, y in ((0.08, 0.42), (-0.2, -0.02), (0.0, -0.02), (-0.1, -0.42),
                                                      (0.2, 0.06), (0.0, 0.06))],
                     fill_color=LAMPE, fill_opacity=1, stroke_width=0)
    p.add(eclair, casque_audio(p))
    return p


def vinyle(r=0.3, etiquette="#ef4444"):
    """Un disque vinyle : noir, deux sillons, l'étiquette de couleur au centre."""
    d = Circle(radius=r, fill_color="#111827", fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    sillons = VGroup(*[Circle(radius=r * k, stroke_color="#334155", stroke_width=1.5) for k in (0.78, 0.6)])
    et = Circle(radius=r * 0.36, fill_color=etiquette, fill_opacity=1, stroke_width=0)
    return VGroup(d, sillons, et)


def platines(s=1.0):
    """La table du DJ : deux platines et la table de mixage au milieu."""
    caisse = RoundedRectangle(width=3.4 * s, height=1.2 * s, corner_radius=0.12 * s, fill_color="#1e293b",
                              fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
    d1 = vinyle(0.42 * s, "#22d3ee").move_to(caisse.get_center() + LEFT * 1.05 * s)
    d2 = vinyle(0.42 * s, "#f472b6").move_to(caisse.get_center() + RIGHT * 1.05 * s)
    curseurs = VGroup(*[RoundedRectangle(width=0.1 * s, height=0.6 * s, corner_radius=0.04 * s, fill_color="#64748b",
                                         fill_opacity=1, stroke_width=0).move_to(caisse.get_center() + RIGHT * x * s)
                        for x in (-0.18, 0, 0.18)])
    boutons = VGroup(*[Dot(caisse.get_center() + P(x * s, 0.36 * s), radius=0.06 * s, color=c)
                       for x, c in ((-0.18, "#ef4444"), (0, LAMPE), (0.18, VERT_OK))])
    return VGroup(caisse, d1, d2, curseurs, boutons)


def lampes(nl, nc, dx=0.4, dy=0.3, r=0.1, couleur=LAMPE_OFF):
    """nl rangées de nc lampes ; .rangs[i] : la rangée i (de haut en bas)."""
    g = VGroup()
    for i in range(nl):
        g.add(VGroup(*[Dot(P(j * dx, -i * dy), radius=r, color=couleur) for j in range(nc)]))
    g.rangs = g
    return g


def accolade(rangs, txt, couleur, fs=30):
    """L'accolade à droite d'un paquet de rangées et son étiquette (« 10 × 9 ») ; pour une
    seule rangée, une petite flèche qui la montre (une accolade y serait écrasée)."""
    if rangs.height < 0.4:
        b = Arrow(rangs.get_right() + RIGHT * 0.75, rangs.get_right() + RIGHT * 0.1, buff=0, color=couleur,
                  stroke_width=5, max_tip_length_to_length_ratio=0.35)
    else:
        b = Brace(rangs, RIGHT, buff=0.12, color=couleur)
    t = Text(txt, font_size=fs, color=couleur, weight=BOLD).next_to(b, RIGHT, buff=0.12)
    g = VGroup(b, t)
    g.accolade, g.etiquette = b, t
    return g


_SUR_LA_LIGNE = set("abcdefhiklmnorstuvwxzABCDEFGHIKLMNOPRSTUVWXYZ0123456789éèêëàâîïôûù")


def _ligne_ecriture(t):
    """La hauteur de la ligne d'écriture d'un Text : le bas de ses lettres sans jambage."""
    if not isinstance(t, Text) or not getattr(t, "original_text", None):
        return None
    car = [c for c in t.original_text if not c.isspace()]
    if len(car) != len(t.submobjects):
        return None
    bas = sorted(m.get_bottom()[1] for c, m in zip(car, t.submobjects) if c in _SUR_LA_LIGNE)
    return bas[len(bas) // 2] if bas else None


class Barre(VGroup):
    """La barre d'une durée (une playlist) de x0 à x1 : vide au départ. .nombre(txt) : le
    nombre au milieu ; .coupe() et .moities(txt) : la moitié, dessinée."""

    def __init__(self, x0, x1, y, h=0.75, fs=40):
        super().__init__()
        self.x0, self.x1, self.y0, self.h, self.fs = x0, x1, y, h, fs
        self.cadre = Rectangle(width=x1 - x0, height=h, stroke_color=WHITE, stroke_width=4, fill_color=CASE,
                               fill_opacity=0.6).move_to(P((x0 + x1) / 2, y))
        self.add(self.cadre)

    def nombre(self, txt, couleur=WHITE):
        return Text(txt, font_size=self.fs, color=couleur, weight=BOLD).move_to(self.cadre)

    def coupe(self):
        xm = (self.x0 + self.x1) / 2
        return DashedLine(P(xm, self.y0 + self.h / 2 + 0.18), P(xm, self.y0 - self.h / 2 - 0.18), color=JAUNE_TITRE,
                          stroke_width=6, dash_length=0.12)

    def moitie(self, k, couleur):
        xm = (self.x0 + self.x1) / 2
        a, b = (self.x0, xm) if k == 0 else (xm, self.x1)
        return Rectangle(width=b - a - 0.06, height=self.h - 0.06, stroke_width=0, fill_color=couleur,
                         fill_opacity=0.85).move_to(P((a + b) / 2, self.y0))

    def etiquette_moitie(self, k, txt, couleur="#0b1220"):
        return Text(txt, font_size=self.fs, color=couleur, weight=BOLD).move_to(self.moitie(k, WHITE))


class MentalMultiplicationBase(PaysageMental):
    nom_voix = "6e-mental-multiplication"
    fichier_marques = "mental_multiplication_marques.json"

    def ligne(self, morceaux, fs=40, buff=0.2):
        """Les morceaux côte à côte, assez écartés (« 18 × » et « 10 » ne se collent pas) et
        posés sur la MÊME ligne d'écriture (une virgule ne fait plus remonter son morceau)."""
        lg = super().ligne(morceaux, fs, buff=max(buff, fs * 0.0075))
        ref = None
        for m in lg:
            b = _ligne_ecriture(m)
            if b is None:
                continue
            if ref is None:
                ref = b
            else:
                m.shift(UP * (ref - b))
        return lg

    def encadre(self, morceaux, fs=40, couleur=VERT_OK):
        """Le résultat encadré, en morceaux posés chacun à son mot : (cadre, ligne)."""
        lg = self.ligne(morceaux, fs, buff=0.2)
        return VGroup(SurroundingRectangle(lg, color=couleur, buff=0.2, corner_radius=0.12, stroke_width=5), lg)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Multiplier de tête", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Multiplier")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Comment")
        q = self.bloc(["Comment calculer", "en 3 secondes ?"], 40).move_to(P(-3.0, 0.45))
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("18 fois")
        calc = self.ligne([("18 " + FOIS, JAUNE_TITRE), ("5 = ?", JAUNE_TITRE)], 72, buff=0.25).move_to(P(3.3, 0.45))
        self.play(FadeIn(calc[0], scale=1.3), run_time=0.3)
        self.au_mot("5 en")
        self.play(FadeIn(calc[1], scale=1.3), run_time=0.3)
        self.au_mot("3 secondes")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.35)
        self.play(Indicate(calc, color=JAUNE_TITRE, scale_factor=1.2), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Hugo, DJ ───────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        hg = hugo(1.05).move_to(P(-4.7, 0.3))
        self.au_mot("Voici Hugo")
        nom = self.t("Hugo", 42, BLEU_CALCUL).next_to(hg, UP, buff=0.2)
        self.play(FadeIn(hg, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est DJ")
        met = self.t("DJ", 36, BLEU_CALCUL).next_to(hg, DOWN, buff=0.18)
        pl = platines(0.8).next_to(met, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(pl, shift=UP * 0.3), run_time=0.4)
        self.ligne_mots([("Pour une fête,", WHITE), ("il prépare", WHITE)], ["Pour une fête", "il prépare"], 2.85,
                        fs=38, xl=-2.6)
        disques = VGroup(*[vinyle(0.27, [ROSE_D, ROND, AMBRE_D][k % 3]) for k in range(18)])
        disques.arrange_in_grid(rows=2, cols=9, buff=(0.36, 0.42)).move_to(P(1.85, 0.75))
        etiq = VGroup(*[Text("5 min", font_size=18, color=AMBRE_D, weight=BOLD).next_to(d, DOWN, buff=0.06)
                        for d in disques])
        hors_audit(etiq)
        self.etapes(None, [("18 morceaux", "18 morceaux"), ("de 5 minutes.", "5 minutes")], 2.1, fs=38, xl=-2.6,
                    couleurs=[AMBRE_D, AMBRE_D],
                    gestes={0: [LaggedStart(*[FadeIn(d, scale=0.6) for d in disques], lag_ratio=0.05)],
                            1: [LaggedStart(*[FadeIn(e) for e in etiq], lag_ratio=0.05)]})
        self.au_mot("Combien")
        q = self.t("Combien de minutes de musique ?", 42, JAUNE_TITRE)
        self.col(q, -1.3, xl=-2.6)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(LaggedStart(*[Indicate(d, color=LAMPE, scale_factor=1.15) for d in disques], lag_ratio=0.04),
                  run_time=1.0)
        self.attendre_voix()

    # ── 02 : × 5, c'est × 10 puis la moitié ─────────────────────────────────
    def ecran_fois5(self):
        self.ecran("02-fois5")
        self.ligne_mots([("L'astuce :", JAUNE_TITRE), ("5, c'est", JAUNE_TITRE), ("la moitié", JAUNE_TITRE),
                         ("de 10.", JAUNE_TITRE)], ["L'astuce", "5, c'est", "la moitié", "de 10"], 3.0, fs=42, xl=-5.6)
        tb = TableauNum(("Centaines", "Dizaines", "Unités"), larg=1.55, h=0.9, fs_ent=26, virgule_apres=None,
                        couleurs={"Centaines": CENTAINES, "Dizaines": "#34d399", "Unités": BLEU_D})
        tb.move_to(P(-3.35, 1.05))
        self.play(FadeIn(tb), run_time=0.3)
        l1 = self.ligne([("18 " + FOIS, WHITE), ("10", WHITE), ("= 180.", VERT_OK)], 42, buff=0.18)
        self.col(l1, 1.15, xl=0.7)
        c1, c8 = tb.chiffre(1, 1), tb.chiffre(2, 8)
        self.au_mot("18 fois")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(c1, scale=1.3), FadeIn(c8, scale=1.3), run_time=0.3)
        self.au_mot("10. Chaque")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Chaque chiffre")
        leg = self.t("Chaque chiffre monte d'une colonne.", 30, ORANGE_RETENUE)
        self.col(leg, 0.35, xl=0.7)
        fl = VGroup(*[CurvedArrow(tb.cases[i].get_bottom() + DOWN * 0.04, tb.cases[i - 1].get_bottom() + DOWN * 0.04,
                                  angle=-PI / 3, color=ORANGE_RETENUE, stroke_width=5, tip_length=0.18) for i in (1, 2)])
        self.play(FadeIn(leg, shift=UP * 0.1), run_time=0.3)
        self.au_mot("monte")
        self.play(Create(fl), c1.animate.move_to(tb.cases[0]), c8.animate.move_to(tb.cases[1]), run_time=0.6)
        self.au_mot("180. Puis")
        c0 = tb.chiffre(2, 0, VERT_OK)
        self.play(FadeIn(l1[2], scale=1.2), FadeIn(c0, scale=1.4), run_time=0.3)
        bar = Barre(-5.6, 2.0, -0.85, fs=40)
        self.play(FadeIn(bar.cadre), run_time=0.25)
        l2 = self.ligne([("La moitié de 180 :", WHITE), ("90.", VERT_OK)], 38, buff=0.18)
        self.col(l2, -2.0, xl=-5.6)
        self.au_mot("la moitié de 180")
        n180 = bar.nombre("180")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(n180, scale=1.2), run_time=0.3)
        self.play(Create(bar.coupe()), FadeOut(n180), FadeIn(bar.moitie(0, AMBRE_D)), FadeIn(bar.moitie(1, ROSE_D)),
                  run_time=0.4)
        self.au_mot("90. 18")
        self.play(FadeIn(l2[1], scale=1.2), FadeIn(bar.etiquette_moitie(0, "90")),
                  FadeIn(bar.etiquette_moitie(1, "90")), run_time=0.3)
        g = self.encadre([("18 " + FOIS, VERT_OK), ("5 =", VERT_OK), ("90 minutes", VERT_OK)], 40)
        g.move_to(P(0, -2.85)).align_to(P(-5.6, 0), LEFT)
        self.au_mot("18 fois 5, ça")
        self.play(FadeIn(g[0]), FadeIn(g[1][0]), run_time=0.3)
        self.au_mot("5, ça fait 90")
        self.play(FadeIn(g[1][1]), run_time=0.25)
        self.au_mot("90 minutes")
        self.play(FadeIn(g[1][2], scale=1.2), run_time=0.3)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        bar = Barre(-6.0, -1.0, 0.4, h=0.7, fs=34)

        def autres_q(sc):
            sc.play(FadeIn(bar.cadre), run_time=0.3)

        def apres(sc):
            lg0 = sc.ligne_rep(0, ["24 " + FOIS + " 10", "= 240."], fs=27)
            sc.au_mot("24 fois 10")
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("240. La")
            n240 = bar.nombre("240")
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), FadeIn(n240, scale=1.2), run_time=0.25)
            lg1 = sc.ligne_rep(1, ["La moitié de 240 :", "120."], fs=27)
            sc.au_mot("La moitié")
            sc.play(FadeIn(lg1[0], shift=UP * 0.1), Create(bar.coupe()), FadeOut(n240),
                    FadeIn(bar.moitie(0, AMBRE_D)), FadeIn(bar.moitie(1, ROSE_D)), run_time=0.3)
            sc.au_mot("120")
            sc.play(FadeIn(lg1[1], shift=UP * 0.1), FadeIn(bar.etiquette_moitie(0, "120")),
                    FadeIn(bar.etiquette_moitie(1, "120")), run_time=0.25)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse", ["Combien font 24 " + FOIS + " 5 ?"],
                            [self.t("240", 36), self.t("100", 36), self.t("120", 36)], 2,
                            ["24 " + FOIS + " 10 = 240.", "La moitié de 240 : 120."], mot_q="Combien",
                            autres_q=autres_q, autres_r=apres)

    # ── 04 : × 11, c'est × 10 puis encore une fois ──────────────────────────
    def ecran_fois11(self):
        self.ecran("04-fois11")
        lp = lampes(11, 9, dx=0.36, dy=0.36, r=0.11).move_to(P(-4.15, 0.15))
        self.etapes(None, [("Pour les lumières,", "Pour les lumières"), ("Hugo pose", "Hugo pose"),
                           ("11 rangées", "11 rangées"), ("de 9 lampes.", "9 lampes")], 3.0, fs=38, xl=-5.6,
                    couleurs=[WHITE, WHITE, AMBRE_D, LAMPE],
                    gestes={2: [LaggedStart(*[FadeIn(r, shift=RIGHT * 0.1) for r in lp.rangs], lag_ratio=0.08)],
                            3: [*[d.animate.set_color(LAMPE) for r in lp.rangs for d in r]]})
        a10 = accolade(VGroup(*lp.rangs[:10]), "10 " + FOIS + " 9", AMBRE_D)
        a1 = accolade(lp.rangs[10], "+ 9", ROSE_D)
        a1.etiquette.next_to(a1.accolade, RIGHT, buff=0.12)
        l1 = self.ligne([("11 " + FOIS, WHITE), ("9,", WHITE), ("c'est 10 " + FOIS, AMBRE_D), ("9,", AMBRE_D)], 36,
                        buff=0.16)
        self.col(l1, 1.55, xl=0.0)
        l2 = self.ligne([("plus encore", ROSE_D), ("une fois 9.", ROSE_D)], 36, buff=0.16)
        self.col(l2, 0.85, xl=0.0)
        self.au_mot("11 fois")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("9, c'est")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 10")
        self.play(FadeIn(l1[2], shift=UP * 0.1), GrowFromCenter(a10.accolade), FadeIn(a10.etiquette[:2]),
                  *[d.animate.set_color(AMBRE_D) for r in lp.rangs[:10] for d in r], run_time=0.3)
        self.au_mot("9, plus")
        self.play(FadeIn(l1[3], shift=UP * 0.1), FadeIn(a10.etiquette[2:]), run_time=0.25)
        self.au_mot("plus encore")
        self.play(FadeIn(l2[0], shift=UP * 0.1), GrowFromCenter(a1.accolade), FadeIn(a1.etiquette[:1]),
                  *[d.animate.set_color(ROSE_D) for d in lp.rangs[10]], run_time=0.3)
        self.au_mot("une fois 9")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(a1.etiquette[1:]), run_time=0.3)
        self.etapes(None, [("10 " + FOIS, "10 fois 9, ça"), ("9", "9, ça fait 90"), ("= 90.", "90. 90")], -0.25, fs=40,
                    xl=0.0)
        self.etapes(None, [("90 +", "90 plus"), ("9", "plus 9, ça"), ("= 99 lampes.", "99 lampes")], -1.05, fs=40,
                    xl=0.0)
        self.attendre_voix()

    # ── 05 : le piège de la moitié oubliée ──────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.ligne_mots([("Le piège :", ROUGE_ERREUR), ("avec " + FOIS + " 5,", ROUGE_ERREUR),
                         ("on oublie la moitié.", ROUGE_ERREUR)], ["Le piège", "avec fois 5", "on oublie"], 3.0, fs=42,
                        xl=-5.6)
        f = self.ligne([("18 " + FOIS + " 5,", WHITE), ("ce n'est pas", WHITE), ("180 !", ROUGE_ERREUR)], 44, buff=0.2)
        self.col(f, 1.95, xl=-5.6)
        bd = Bonds(0, 200, x0=-5.0, x1=4.2, y=0.35, fs=36)
        t0 = hors_audit(bd.tic(0, "#94a3b8"))
        self.au_mot("18 fois 5, ce")
        self.play(FadeIn(f[0], shift=UP * 0.1), Create(bd.trait), Create(t0[0]), FadeIn(t0[1]), run_time=0.3)
        self.au_mot("ce n'est pas")
        self.play(FadeIn(f[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("pas 180")
        t180 = bd.tic(180, ROUGE_ERREUR)
        self.play(FadeIn(f[2], scale=1.2), Create(t180[0]), FadeIn(t180[1]), run_time=0.3)
        self.play(Create(self.barrer(f[2])), Create(self.barrer(t180.nombre)), run_time=0.35)
        t100 = bd.tic(100, ROND)
        self.etapes(bd, [("Vérifie :", "Vérifie"), ("20 " + FOIS + " 5", "20 fois 5"), ("= 100.", "100. Donc")], -0.95,
                    fs=40, couleurs=[ROND, WHITE, ROND],
                    gestes={2: [Create(t100[0]), FadeIn(t100[1], scale=1.3)]})
        zone = Line(bd.pt(0), bd.pt(100), color=VERT_OK, stroke_width=14)
        self.etapes(bd, [("Donc 18 " + FOIS + " 5", "Donc 18"), ("fait moins", "5 fait moins"), ("de 100.", "de 100")],
                    -1.8, fs=40, couleurs=[WHITE, VERT_OK, VERT_OK], gestes={2: [Create(zone), Create(bd.rond(t100))]})
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        lp = lampes(12, 9, dx=0.36, dy=0.27, r=0.1).move_to(P(-4.6, 0.05))

        def autres_q(sc):
            sc.play(LaggedStart(*[FadeIn(r) for r in lp.rangs], lag_ratio=0.06), run_time=0.6)

        def apres(sc):
            a10 = accolade(VGroup(*lp.rangs[:10]), "10 " + FOIS + " 9", AMBRE_D, fs=28)
            a2 = accolade(VGroup(*lp.rangs[10:]), "2 " + FOIS + " 9", ROSE_D, fs=28)
            lg0 = sc.ligne_rep(0, ["10 " + FOIS + " 9", "= 90."])
            sc.au_mot("10 fois 9")
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), GrowFromCenter(a10.accolade), FadeIn(a10.etiquette),
                    *[d.animate.set_color(AMBRE_D) for r in lp.rangs[:10] for d in r], run_time=0.3)
            sc.au_mot("90. 2")
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), run_time=0.25)
            lg1 = sc.ligne_rep(1, ["2 " + FOIS + " 9", "= 18."])
            sc.au_mot("2 fois 9")
            sc.play(FadeIn(lg1[0], shift=UP * 0.1), GrowFromCenter(a2.accolade), FadeIn(a2.etiquette),
                    *[d.animate.set_color(ROSE_D) for r in lp.rangs[10:] for d in r], run_time=0.3)
            sc.au_mot("18. 90")
            sc.play(FadeIn(lg1[1], shift=UP * 0.1), run_time=0.25)
            lg2 = sc.ligne_rep(2, ["90 + 18 :", "108."])
            sc.au_mot("90 plus 18")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("108")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), run_time=0.25)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Combien font 12 " + FOIS + " 9 ?"],
                            [self.t("108", 36), self.t("118", 36), self.t("98", 36)], 0,
                            ["10 " + FOIS + " 9 = 90.", "2 " + FOIS + " 9 = 18.", "90 + 18 : 108."], mot_q="Combien",
                            autres_q=autres_q, autres_r=apres)

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.ligne_mots([("La fête dure", WHITE), ("2 heures,", AMBRE_D), ("soit 120 minutes.", AMBRE_D)],
                        ["La fête", "2 heures", "120 minutes"], 2.05, fs=40, xl=-5.6)
        disques = VGroup(*[vinyle(0.24, [ROSE_D, ROND, AMBRE_D][k % 3]) for k in range(22)])
        disques.arrange_in_grid(rows=2, cols=11, buff=(0.16, 0.2)).move_to(P(-2.4, -0.05))
        l2 = self.ligne([("Hugo a", WHITE), ("22 morceaux", ROSE_D), ("de 5 minutes.", ROSE_D)], 40, buff=0.18)
        self.col(l2, 1.1, xl=-5.6)
        self.au_mot("Hugo a")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("22 morceaux")
        self.play(FadeIn(l2[1], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(d, scale=0.6) for d in disques], lag_ratio=0.04), run_time=0.7)
        self.au_mot("5 minutes")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.25)
        hg = hugo(0.75).move_to(P(3.3, -0.35))
        self.play(FadeIn(hg, shift=LEFT * 0.3), run_time=0.3)
        self.au_mot("A-t-il")
        q = self.t("A-t-il assez de musique ?", 44, JAUNE_TITRE)
        self.col(q, -1.15, xl=-5.6)
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(hg), run_time=0.5)
        self.pause_defi(y=-2.1)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        self.etapes(None, [("22 " + FOIS + " 10", "22 fois 10"), ("= 220.", "220. La")], 2.2, fs=40, xl=-5.6,
                    couleurs=[WHITE, WHITE])
        # la fête : 120 minutes, toute la barre ; la musique d'Hugo : 110 minutes
        x0, x1, y = -5.4, 4.2, 0.6
        xm = x0 + (x1 - x0) * 110 / 120
        cadre = Rectangle(width=x1 - x0, height=0.8, stroke_color=WHITE, stroke_width=4, fill_color=CASE,
                          fill_opacity=0.6).move_to(P((x0 + x1) / 2, y))
        self.play(FadeIn(cadre), run_time=0.25)
        plein = Rectangle(width=xm - x0 - 0.06, height=0.74, stroke_width=0, fill_color=VERT_D,
                          fill_opacity=0.85).move_to(P((x0 + xm) / 2, y))
        n110 = Text("110 minutes", font_size=34, color="#052e16", weight=BOLD).move_to(plein)
        self.etapes(None, [("La moitié :", "La moitié"), ("110 minutes.", "110 minutes")], 2.2, fs=40, xl=0.6,
                    gestes={1: [GrowFromEdge(plein, LEFT), FadeIn(n110)]}, couleurs=[WHITE, VERT_OK])
        fin = Line(P(x1, y + 0.6), P(x1, y - 0.6), color=ROND, stroke_width=6)
        n120 = Text("120", font_size=34, color=ROND, weight=BOLD).next_to(fin, UP, buff=0.1)
        self.etapes(None, [("110, c'est", "110, c'est"), ("moins que 120.", "moins que 120")], -0.65, fs=40,
                    gestes={1: [Create(fin), FadeIn(n120, scale=1.2)]}, couleurs=[VERT_OK, ROND])
        trou = Rectangle(width=x1 - xm - 0.06, height=0.74, stroke_color=ROUGE_ERREUR, stroke_width=4,
                         fill_color=ROUGE_ERREUR, fill_opacity=0.35).move_to(P((xm + x1) / 2, y))
        n10 = Text("10", font_size=34, color=ROUGE_ERREUR, weight=BOLD).next_to(trou, DOWN, buff=0.15)
        self.etapes(None, [("Il manque", "Il manque"), ("10 minutes :", "manque 10")], -1.45, fs=40,
                    gestes={1: [FadeIn(trou), FadeIn(n10, scale=1.2)]}, couleurs=[WHITE, ROUGE_ERREUR])
        self.au_mot("Hugo doit")
        g = self.encadre([("Hugo doit ajouter", VERT_OK), ("2 morceaux !", VERT_OK)], 36)
        g.move_to(P(0, -2.45)).align_to(P(-5.6, 0), LEFT)
        self.play(FadeIn(g[0]), FadeIn(g[1][0]), run_time=0.3)
        self.au_mot("2 morceaux")
        d2 = VGroup(vinyle(0.3, ROSE_D), vinyle(0.3, ROND)).arrange(RIGHT, buff=0.15).next_to(g, RIGHT, buff=0.35)
        self.play(FadeIn(g[1][1], scale=1.2), FadeIn(d2, shift=UP * 0.2), run_time=0.3)
        self.insister(g, 1.08, 0.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        lp = lampes(11, 9, dx=0.36, dy=0.36, r=0.11)
        for k, r in enumerate(lp.rangs):
            r.set_color(AMBRE_D if k < 10 else ROSE_D)
        a10 = accolade(VGroup(*lp.rangs[:10]), "10 " + FOIS + " 9", AMBRE_D)
        a1 = accolade(lp.rangs[10], "+ 9", ROSE_D)
        fig = VGroup(lp, a10, a1)
        hors_audit(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            (FOIS + " 5, c'est", FOIS + " 10,", "puis la moitié."),
            ("11 " + FOIS + " 9, c'est", "10 " + FOIS + " 9,", "plus encore", "une fois 9."),
            ("On vérifie avec", "un nombre rond.")], fs=34)
        # sur une même ligne : « × 10, puis la moitié. » et « plus encore une fois 9. »
        for i, rangs in ((0, [[0], [1, 2]]), (1, [[0, 1], [2, 3]]), (2, [[0], [1]])):
            bl = lignes[i][1]
            g0, y = bl.get_left()[0], bl.get_top()[1]
            for rang in rangs:
                tete = bl[rang[0]]
                tete.align_to(P(g0, 0), LEFT).align_to(P(0, y), UP)
                for k, j in enumerate(rang[1:]):
                    bl[j].next_to(bl[rang[k]], RIGHT, buff=0.2)
                    bl[j].shift(UP * (_ligne_ecriture(tete) - _ligne_ecriture(bl[j])))
                y = min(bl[j].get_bottom()[1] for j in rang) - 0.1
            lignes[i][1].next_to(lignes[i][0], RIGHT, buff=0.25)
            lignes[i][0].set_y(bl[0].get_y())
        haut, gauche = lignes.get_top()[1], lignes.get_left()[0]
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42).align_to(P(gauche, 0), LEFT).align_to(P(0, haut), UP)
        for i, mots in ((0, ("Fois 5", "fois 10", "puis la")), (1, ("11 fois 9", "10 fois 9", "plus encore", "une fois 9"))):
            for k, (t, mot) in enumerate(zip(lignes[i][1], mots)):
                self.au_mot(mot)
                avec = [Create(lignes[i][0])] if k == 0 else []
                if i == 1 and k == 1:
                    avec.append(Indicate(a10, color=AMBRE_D, scale_factor=1.15))
                self.play(FadeIn(t, shift=RIGHT * 0.2), *avec, run_time=0.3)
        self.au_mot("On vérifie")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_fois5()
        self.ecran_question1()
        self.ecran_fois11()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MentalMultiplication6e(MentalMultiplicationBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
