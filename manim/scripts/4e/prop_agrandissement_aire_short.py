# prop_agrandissement_aire_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 12 « Agrandissement et aire »
# (micro agrandissement_aire). CEINTURE BLANCHE (règle du short blanc,
# REGLES.md) : on VOIT la notion. Il AMUSE : « Une grande pizza ou deux
# petites : laquelle te nourrit le plus ? » → la grande (2 fois plus large)
# en vaut 4 !
#   · EN HAUT, l'image : la petite pizza (15 cm) et la grande (30 cm) ;
#   · EN BAS, au même instant, le PAVAGE : la grande pizza dans sa boîte
#     carrée, et 4 petites boîtes (avec leur petite pizza) qui la recouvrent
#     exactement : 2 × 2 = 4. (Des disques ne pavent pas un disque : on pave
#     les BOÎTES, chaque pizza occupe la même part de sa boîte.)
#   · 1 question-pause (3 s) : 45 cm contre 15 cm → 9 petites (leurres : 3,
#     l'aire × k ; 27, le volume k³) ; le pavage 3 × 3 s'affiche à la réponse ;
#   · fin : une pizza géante de 60 cm vaut combien de pizzas de 15 cm ? (16)
#     en commentaire.
# Centres d'intérêt : cuisine. Aucune donnée réelle citée (tailles inventées,
# vraisemblables).
# Ajouté ICI : pizza(), boite() (pizza dans sa boîte carrée), paver_boites(),
# cote() (comme la paysage), _carte_choix() de prop_pourcentage_comprendre_short.py
# (cartes de 0,56 de haut : la phrase de réponse ET le pavage tiennent au-dessus
# de Ti-Margo).
#
# Voix : manim/voix/4e-prop-agrandissement-aire-short.json (validée le 31/10,
# débit −10) ; WAV : public/sons/4e-prop-agrandissement-aire-short/ ; marques :
# manim/scripts/4e/prop_agrandissement_aire_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/prop_agrandissement_aire_short.py PropAgrandissementAireShort4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_agrandissement_aire_short.py PropAgrandissementAireShort4e -o eleveai-maths-4e-prop-agrandissement-aire-short --media_dir manim/media-prop-4e-12
# Sortie : manim/sorties/4e/maths/proportionnalite/12-agrandissement-aire/eleveai-maths-4e-prop-agrandissement-aire-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

CROUTE = "#d97706"
FROMAGE = "#fcd34d"
PEPPE = "#b91c1c"
CARTON = "#c8955a"
CARTON_B = "#7c4a1e"
K = 0.054  # 1 cm de pizza = 0,054 unité (15 cm → 0,81)


def gras(s, fs, couleur):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def sans(m):
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def pizza(d, centre=ORIGIN):
    """Une pizza vue de dessus, de diamètre d (à l'écran)."""
    r = d / 2
    croute = Circle(radius=r, fill_color=CROUTE, fill_opacity=1, stroke_color="#78350f", stroke_width=2)
    fromage = Circle(radius=r * 0.84, fill_color=FROMAGE, fill_opacity=1, stroke_width=0)
    pts = [(0.45, 0.2), (-0.35, 0.4), (-0.15, -0.45), (0.3, -0.38), (-0.52, -0.05), (0.05, 0.05)]
    peps = VGroup(*[Circle(radius=r * 0.13, fill_color=PEPPE, fill_opacity=1, stroke_width=0).move_to(P(x * r, y * r))
                    for x, y in pts])
    return VGroup(croute, fromage, peps).move_to(centre)


def boite(c, centre=ORIGIN):
    """Une boîte à pizza carrée (vue de dessus, ouverte) de côté c, sa pizza dedans."""
    b = Square(c, fill_color=CARTON, fill_opacity=1, stroke_color=CARTON_B, stroke_width=3)
    g = VGroup(b, pizza(c * 0.9))
    g.base = b
    return g.move_to(centre)


def paver_boites(grande, k):
    c = grande.base.width / k
    hg = grande.base.get_corner(UL)
    return VGroup(*[boite(c, hg + RIGHT * c * (q + 0.5) + DOWN * c * (r + 0.5)) for r in range(k) for q in range(k)])


def cote(carre, s, cote_=DOWN, couleur=AMBRE, fs=26, buff=0.15):
    if np.allclose(cote_, DOWN):
        a, b = carre.get_corner(DL) + DOWN * buff, carre.get_corner(DR) + DOWN * buff
        bout = UP * 0.08
    else:
        a, b = carre.get_corner(DL) + LEFT * buff, carre.get_corner(UL) + LEFT * buff
        bout = RIGHT * 0.08
    tr = VGroup(Line(a, b, color=couleur, stroke_width=4), Line(a - bout, a + bout, color=couleur, stroke_width=4),
                Line(b - bout, b + bout, color=couleur, stroke_width=4))
    t = gras(s, fs, couleur).next_to(tr, cote_, buff=0.08)
    g = VGroup(tr, t)
    g.trait, g.texte = tr, t
    return g


def diametre(p, s, fs=24, couleur=BLEU_CALCUL):
    """Le diamètre tracé sur la pizza, sa mesure dessous."""
    l = Line(p.get_left(), p.get_right(), color=WHITE, stroke_width=4)
    t = gras(s, fs, couleur).next_to(p, DOWN, buff=0.1)
    return VGroup(l, t)


class PropAgrandissementAireShort4e(ShortProp):
    nom_voix = "4e-prop-agrandissement-aire-short"
    fichier_marques = "prop_agrandissement_aire_short_marques.json"
    ceinture = "blanche"

    def _carte_choix(self, lettre, txt, largeur, fs):
        """Celle de prop_pourcentage_comprendre_short.py (0,56 de haut)."""
        rond = Circle(radius=0.26 * fs / 34, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        corps = txt if isinstance(txt, Mobject) else Text(txt, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), corps).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 0.4:
            ligne.scale_to_fit_width(largeur - 0.4)
        cadre = RoundedRectangle(width=largeur, height=max(0.56, ligne.height + 0.18), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color="#0b1220", fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for f in rebours.get_family():
            if isinstance(f, Text):
                f.sans_synchro = True
        self.q_q = q
        return tete, q, cartes, pause, rebours, ph

    def montre(self, mot, *anims, rt=0.4, n=1):
        self.au_mot(mot, n)
        self.play(*anims, run_time=rt)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La grande pizza", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche : une grande ou deux petites ? ──
        self.dire("00-accroche")
        gr = pizza(30 * K * 0.95).move_to(P(-1.05, 1.45))
        ou = self.t("ou", 36).move_to(P(0.2, 1.45))
        pe = VGroup(pizza(15 * K * 0.95), pizza(15 * K * 0.95)).arrange(DOWN, buff=0.15).move_to(P(1.3, 1.45))
        self.montre("Une grande pizza", Write(titre), FadeIn(gr, scale=0.7), rt=0.6)
        self.montre("deux petites", FadeIn(ou), LaggedStart(*[FadeIn(x, scale=0.6) for x in pe], lag_ratio=0.3), rt=0.6)
        q = Text("?", font_size=150, color=AMBRE, weight=BOLD).move_to(P(0, -0.9))
        self.montre("laquelle", FadeIn(q, scale=0.4))
        self.insister(q, 1.2)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 01 : 15 cm et 30 cm : 2 fois plus large ──
        self.dire("01-pizzas")
        p = pizza(15 * K).move_to(P(-1.2, 1.0))
        g = pizza(30 * K).move_to(P(0.9, 1.4))
        dp, dg = diametre(p, "15 cm"), diametre(g, "30 cm")
        self.montre("La petite pizza", FadeIn(p, scale=0.6))
        self.montre("15 cm", Create(dp[0]), FadeIn(dp[1], scale=1.3))
        self.montre("La grande", FadeIn(g, scale=0.6))
        self.montre("30 cm", Create(dg[0]), FadeIn(dg[1], scale=1.3))
        L1 = self.borne(self.ligne([("2 fois plus large", AMBRE)], 40), 0.9).move_to(P(0, -0.35))
        self.montre("2 fois plus large", FadeIn(L1, scale=1.2), Indicate(dg[0], color=AMBRE, scale_factor=1.05))
        self.insister(L1, 1.1)
        self.attendre_voix(marge=0.2)

        # ── 02 : par la surface, la grande vaut 4 petites (pavage des boîtes) ──
        self.dire("02-surface")
        bg = boite(1.8).move_to(P(0, -1.05))
        tu = paver_boites(bg, 2)
        self.au_mot("Par la surface")
        self.play(FadeOut(L1), FadeOut(dp[1]), FadeOut(dg[1]), TransformFromCopy(g, bg), run_time=0.6)
        L2 = self.borne(self.ligne([("La grande vaut", WHITE), ("4 petites !", VERT_OK)], 32), 0.5).move_to(P(0, 0.25))
        sans(L2[0])
        self.au_mot("vaut 4 petites")
        self.play(FadeIn(L2, shift=UP * 0.1), LaggedStart(*[TransformFromCopy(p, t) for t in tu], lag_ratio=0.2),
                  run_time=1.0)
        fb = cote(bg.base, "× 2")
        fg = cote(bg.base, "× 2", LEFT)
        self.montre("2 fois plus large", Create(fb.trait), FadeIn(fb.texte, scale=1.3), rt=0.3)
        self.montre("dans tous les sens", Create(fg.trait), FadeIn(fg.texte, scale=1.3), rt=0.25)
        L3 = self.borne(self.ligne([("2 × 2", WHITE), ("= 4", VERT_OK)], 40), 0.9).move_to(P(0, 0.25))
        self.montre("2 fois 2", FadeOut(L2), FadeIn(L3[0], shift=UP * 0.1), rt=0.35)
        self.montre("égale 4", FadeIn(L3[1], scale=1.3), Circumscribe(bg.base, color=VERT_OK, buff=0.04), rt=0.6)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 03 : la surprise : plus que deux petites, elle en vaut 4 ! ──
        self.dire("03-surprise")
        G = pizza(1.5).move_to(P(-1.15, 1.35))
        eg = self.t("=", 50).move_to(P(0.0, 1.35))
        ps = VGroup(*[pizza(0.66) for _ in range(4)]).arrange_in_grid(2, 2, buff=0.06).move_to(P(1.1, 1.35))
        self.montre("Une grande pizza", FadeIn(G, scale=0.7))
        L1 = self.borne(self.t("plus que deux petites…", 34), 0.5).move_to(P(0, -0.2))
        self.montre("plus que deux", FadeIn(eg), FadeIn(ps[0], scale=0.6), FadeIn(ps[1], scale=0.6),
                    FadeIn(L1, shift=UP * 0.1), rt=0.5)
        L2 = self.borne(self.ligne([("Elle en vaut", VERT_OK), ("4 !", VERT_OK)], 46), 1.2).move_to(P(0, -1.2))
        cad = SurroundingRectangle(L2, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=5)
        self.montre("Elle en vaut", FadeIn(L2[0], shift=UP * 0.1), rt=0.3)
        self.montre("4 !", FadeIn(L2[1], scale=1.4), FadeIn(ps[2], scale=0.6), FadeIn(ps[3], scale=0.6), Create(cad))
        self.play(Circumscribe(ps, color=VERT_OK, buff=0.05), run_time=0.6)
        self.insister(VGroup(cad, L2), 1.08)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) : 45 cm contre 15 cm ──
        b3 = boite(1.0)
        t9 = paver_boites(b3, 3)

        def rep(sc):
            lr0 = sc.ligne_rep(0, ["3 fois", "plus large :"])
            lr1 = sc.ligne_rep(1, ["3 × 3", "= 9 petites pizzas."])
            sc.au_mot("3 fois plus")
            b3.move_to(sc.q_q)
            for t, c in zip(t9, paver_boites(b3, 3)):
                t.move_to(c)
            sc.play(FadeIn(lr0[0], shift=UP * 0.12), FadeOut(sc.q_q), FadeIn(b3, scale=0.8), run_time=0.3)
            sc.au_mot("plus large")
            sc.play(FadeIn(lr0[1], shift=UP * 0.12), run_time=0.3)
            sc.au_mot("3 fois 3")
            sc.play(FadeIn(lr1[0], shift=UP * 0.12), LaggedStart(*[FadeIn(t, scale=0.6) for t in t9], lag_ratio=0.08),
                    run_time=0.6)
            sc.au_mot("égale 9")
            sc.play(FadeIn(lr1[1], shift=UP * 0.12), run_time=0.3)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Une pizza de 45 cm", "et une pizza de 15 cm.", "La grande vaut combien de petites ?"],
                            [self.t("3", 30), self.t("9", 30), self.t("27", 30)], 1,
                            ["3 fois plus large :", "3 × 3 = 9 petites pizzas."], mot_q="Une pizza", autres_r=rep)
        self.vider(garder)

        # ── 05 : la question en commentaire : la pizza géante de 60 cm ──
        self.dire("05-commentaire")
        geante = pizza(1.75).move_to(P(-0.75, 1.3))
        petite = pizza(0.44).move_to(P(1.45, 0.95))
        dge, dpe = diametre(geante, "60 cm", fs=26), diametre(petite, "15 cm", fs=22)
        self.au_mot("Et toi")
        self.play(FadeIn(geante, scale=0.7), run_time=0.4)
        self.montre("60 cm", Create(dge[0]), FadeIn(dge[1], scale=1.3))
        qq = self.borne(self.t("Combien de petites ?", 36, AMBRE), 1.0).move_to(P(0, -0.35))
        place = DashedVMobject(Square(1.4, color=AMBRE, stroke_width=4), num_dashes=36).move_to(P(0, -1.6))
        coin = boite(0.35).move_to(place.get_corner(UL) + P(0.175, -0.175))
        self.montre("combien", FadeIn(qq, shift=UP * 0.1), Create(place), rt=0.4)
        self.montre("15 cm", FadeIn(petite, scale=0.6), Create(dpe[0]), FadeIn(dpe[1], scale=1.3), FadeIn(coin, scale=0.6))
        self.insister(qq, 1.1)
        self.appel_commentaire(y=-2.75)
