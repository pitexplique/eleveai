# relatif_nombre_short.py
# EleveAI — Maths 5e — le short des nombres relatifs. Voix validée le 08/10/2026.
# - ShortComparerRelatif5e : « −10 ou −2 ? » (micro relatif_comparer)
#                            manim/voix/5e-relatif-nombre-short-comparer.json
# Il renvoie à la vidéo longue (relatif_nombre.py, https://youtu.be/rhmbSQdLjXw).
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/relatif_nombre_short.py ShortComparerRelatif5e -o eleveai-maths-5e-relatif-nombre-short-comparer --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Short6e


class ShortComparerRelatif5e(Short6e):
    nom_voix = "5e-relatif-nombre-short-comparer"

    def droite_rel(self, y=0.6):
        """−10 → 2, une graduation par unité ; seuls −10, −5, 0 et 2 sont écrits."""
        etiquettes = {-10: "−10", -5: "−5", 0: "0", 2: "2"}
        d, pt = self.droite(-10, 2, 12, etiquettes, longueur=3.2, centre=(0.1, y), font_size=24)
        for v, lbl in zip(etiquettes, d[2]):
            lbl.set_color(ROUGE_ERREUR if v < 0 else (JAUNE_TITRE if v == 0 else VERT_OK))
        return d, pt

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        a = self.grand("−10", font_size=110, color=ROUGE_ERREUR).move_to([0, 2.0, 0])
        ou = self.grand("ou", font_size=44).move_to([0, 0.9, 0])
        b = self.grand("−2", font_size=110, color=ROUGE_ERREUR).move_to([0, -0.2, 0])
        self.play(GrowFromCenter(a))
        self.play(FadeIn(ou), GrowFromCenter(b))
        self.au_mot("lequel est")
        q = self.grand("Le plus grand ?", font_size=46, color=JAUNE_TITRE).move_to([0, -1.6, 0])
        self.play(Write(q))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        a = self.grand("−10 ?", font_size=100, color=ORANGE_RETENUE).move_to([0, 2.0, 0])
        self.play(FadeIn(a, scale=1.3))
        self.au_mot("Parce que 10")
        r = self.grand("« 10 > 2 »", font_size=56).move_to([0, 0.6, 0])
        self.play(Write(r))
        self.au_mot("Et c'est faux")
        f = self.grand("FAUX !", font_size=90, color=ROUGE_ERREUR).rotate(0.15).move_to([0, -1.0, 0])
        self.play(FadeIn(f, scale=2.0))
        self.attendre_voix(marge=0.4)

    def ecran_droite(self):
        self.clear()
        self.margo_bas()
        self.dire("02-droite")
        t = self.grand("Sur la droite", font_size=46, color=JAUNE_TITRE).move_to([0, 2.6, 0])
        self.play(Write(t))
        d, pt = self.droite_rel()
        self.play(Create(d[0]), Create(d[1]), FadeIn(d[2]))

        self.au_mot("Moins 10 est loin")
        a = self.point(pt, -10, "−10", color=ROUGE_ERREUR, font_size=30)
        loin = DoubleArrow(pt(-10) + DOWN * 1.0, pt(0) + DOWN * 1.0, buff=0.02, color=ROUGE_ERREUR,
                           stroke_width=3, tip_length=0.16)
        tl = self.grand("loin du 0", font_size=28, color=ROUGE_ERREUR).next_to(loin, DOWN, buff=0.15)
        self.play(FadeIn(a, scale=0.5))
        self.play(GrowFromCenter(loin), FadeIn(tl))

        self.au_mot("Moins 2 est tout près")
        b = self.point(pt, -2, "−2", color=VERT_OK, font_size=30)
        pres = DoubleArrow(pt(-2) + DOWN * 2.0, pt(0) + DOWN * 2.0, buff=0.02, color=VERT_OK,
                           stroke_width=3, tip_length=0.12)
        tp = self.grand("tout près du 0", font_size=28, color=VERT_OK).next_to(pres, DOWN, buff=0.15).set_x(0)
        self.play(FadeIn(b, scale=0.5))
        self.play(GrowFromCenter(pres), FadeIn(tp))
        self.attendre_voix(marge=0.4)

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("03-regle")
        d, pt = self.droite_rel(y=2.0)
        a = self.point(pt, -10, "−10", color=ROUGE_ERREUR, font_size=30)
        b = self.point(pt, -2, "−2", color=VERT_OK, font_size=30)
        self.add(d, a, b)
        fl = Arrow(pt(-10) + DOWN * 0.95, pt(2) + DOWN * 0.95, buff=0, color=BLEU_CALCUL, stroke_width=4)
        r0 = self.grand("à droite = plus grand", font_size=34, color=BLEU_CALCUL).move_to([0, 0.75, 0])
        self.play(GrowArrow(fl), Write(r0))

        self.au_mot("Donc moins 2")
        r = self.grand("−2 > −10", font_size=84, color=VERT_OK).move_to([0, -0.4, 0])
        self.play(GrowFromCenter(r))
        self.play(Circumscribe(r, color=VERT_OK))

        self.au_mot("Chez les négatifs")
        m = VGroup(self.grand("Chez les négatifs :", font_size=30, color=ORANGE_RETENUE),
                   self.grand("loin du 0 = plus petit", font_size=32, color=ORANGE_RETENUE)
                   ).arrange(DOWN, buff=0.15).move_to([0, -1.75, 0])
        self.play(FadeIn(m, shift=UP * 0.2))
        self.attendre_voix(marge=0.4)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("04-defi")
        a = self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.4, 0])
        self.play(Write(a))
        self.au_mot("Range")
        consigne = VGroup(self.grand("Range du plus petit", font_size=36),
                          self.grand("au plus grand", font_size=36)).arrange(DOWN, buff=0.12)
        consigne.move_to([0, 1.2, 0])
        self.play(FadeIn(consigne))
        self.au_mot("moins 3")
        q = VGroup(self.grand("−3", font_size=64, color=ROUGE_ERREUR),
                   self.grand("2", font_size=64, color=VERT_OK),
                   self.grand("−8", font_size=64, color=ROUGE_ERREUR)).arrange(RIGHT, buff=0.55)
        q.move_to([0, -0.4, 0])
        self.play(LaggedStart(*[FadeIn(n, scale=0.6) for n in q], lag_ratio=0.35))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_droite()
        self.ecran_regle()
        self.ecran_defi()
        self.ecran_renvoi("05-fin")


# ════════════════════════════════════════════════════════════════════════════
# 08/10/2026 — les six autres micros, voix validées le même jour (« go »).
# Un short par micro ; même déroulé que « −10 ou −2 » : question, piège,
# droite, règle, défi, renvoi.
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/relatif_nombre_short.py <Classe> -o eleveai-maths-5e-relatif-nombre-short-<nom> --media_dir manim/scripts/5e/media
# ════════════════════════════════════════════════════════════════════════════


def ecrit(v):
    """−2,5 / 0 / 3 : moins typographique, virgule décimale."""
    t = f"{abs(v):g}".replace(".", ",")
    return f"−{t}" if v < 0 else t


class _ShortRel5e(Short6e):
    """Les briques communes des shorts des relatifs."""

    def droite_rel(self, a, b, ecrits, y=0.6, longueur=3.4, font_size=24):
        """Une graduation par unité de a à b ; seuls les nombres de `ecrits` sont écrits."""
        etiquettes = {v: ecrit(v) for v in ecrits}
        d, pt = self.droite(a, b, b - a, etiquettes, longueur=longueur, centre=(0.05, y),
                            font_size=font_size)
        for v, lbl in zip(etiquettes, d[2]):
            lbl.set_color(ROUGE_ERREUR if v < 0 else (JAUNE_TITRE if v == 0 else VERT_OK))
        return d, pt

    def montrer(self, d):
        self.play(Create(d[0]), Create(d[1]), FadeIn(d[2]))

    def pile(self, lignes, y, buff=0.18):
        """Des lignes (texte, taille, couleur) empilées et centrées en y."""
        g = VGroup(*[self.grand(t, font_size=s, color=c) for t, s, c in lignes]).arrange(DOWN, buff=buff)
        return g.move_to([0, y, 0])

    def faux(self, y=-1.2):
        f = self.grand("FAUX !", font_size=90, color=ROUGE_ERREUR).rotate(0.15).move_to([0, y, 0])
        self.play(FadeIn(f, scale=2.0))

    def fleche_dist(self, pt, a, b, y, texte, color, font_size=28):
        """Une double flèche de a à b à la hauteur y, son nombre dessous."""
        f = DoubleArrow([pt(a)[0], y, 0], [pt(b)[0], y, 0], buff=0.02, color=color,
                        stroke_width=3, tip_length=0.14)
        t = self.grand(texte, font_size=font_size, color=color).next_to(f, DOWN, buff=0.12)
        return VGroup(f, t)

    def ecran_defi_lignes(self, voix, lignes, mot=None, y=0.4):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.4, 0])))
        if mot:
            self.au_mot(mot)
        self.play(FadeIn(self.pile(lignes, y), shift=UP * 0.2))
        self.attendre_voix(marge=2.0)

    def ouvrir(self, voix):
        self.clear()
        self.margo_bas()
        self.dire(voix)


# ── 1. Lire et écrire (relatif_lire) ────────────────────────────────────────

class ShortLireRelatif5e(_ShortRel5e):
    nom_voix = "5e-relatif-nombre-short-lire"

    def construct(self):
        self.ouvrir("00-accroche")
        self.play(FadeIn(self.pile([("3 degrés", 80, BLEU_CALCUL), ("en dessous de 0", 40, BLEU_CALCUL)], 1.6)))
        self.au_mot("Comment ça s'écrit")
        self.play(Write(self.grand("Comment l'écrire ?", font_size=44, color=JAUNE_TITRE).move_to([0, -0.6, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("01-piege")
        self.play(FadeIn(self.grand("3 ?", font_size=110, color=ORANGE_RETENUE).move_to([0, 2.0, 0]), scale=1.3))
        self.au_mot("Mais 3, c'est")
        self.play(Write(self.pile([("3, c'est", 40, WHITE), ("AU-DESSUS de 0", 40, WHITE)], 0.5)))
        self.au_mot("Ce n'est pas")
        self.faux(-1.3)
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-signe")
        d, pt = self.droite_rel(-4, 4, [-3, 0, 3], y=2.2)
        self.montrer(d)
        self.play(Write(self.grand("sous 0  →  signe −", font_size=36, color=ROUGE_ERREUR).move_to([0, 1.0, 0])))
        self.au_mot("ça s'écrit moins 3")
        self.play(FadeIn(Dot(pt(-3), color=ROUGE_ERREUR, radius=0.11), scale=0.5),
                  GrowFromCenter(self.grand("−3", font_size=100, color=ROUGE_ERREUR).move_to([0, -0.3, 0])))
        self.au_mot("Et 3 degrés au-dessus")
        self.play(FadeIn(Dot(pt(3), color=VERT_OK, radius=0.11), scale=0.5),
                  Write(self.grand("au-dessus : +3, ou 3", font_size=34, color=VERT_OK).move_to([0, -1.6, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-autres")
        self.play(Write(self.grand("Ça marche partout", font_size=42, color=JAUNE_TITRE).move_to([0, 2.5, 0])))
        for mot, txt, nb, y in [("20 mètres", "20 m sous la mer", "−20", 1.5),
                                ("Le 2e sous-sol", "2e sous-sol", "−2", 0.1),
                                ("Une dette", "dette de 15 €", "−15", -1.5)]:
            self.au_mot(mot)
            g = VGroup(self.grand(txt, font_size=32), self.grand(nb, font_size=54, color=ROUGE_ERREUR)
                       ).arrange(DOWN, buff=0.1).move_to([0, y, 0])
            self.play(FadeIn(g, shift=UP * 0.15))
        self.attendre_voix(marge=0.4)

        self.ecran_defi_lignes("04-defi", [("Un plongeur est", 40, WHITE), ("à 12 m sous", 40, WHITE), ("la surface.", 40, WHITE),
                                           ("Sa position ?", 50, BLEU_CALCUL)], mot="Un plongeur")
        self.ecran_renvoi("05-fin")


# ── 2. Le signe (relatif_signe) ─────────────────────────────────────────────

class ShortSigneRelatif5e(_ShortRel5e):
    nom_voix = "5e-relatif-nombre-short-signe"

    def construct(self):
        self.ouvrir("00-accroche")
        self.play(GrowFromCenter(self.grand("0", font_size=180, color=JAUNE_TITRE).move_to([0, 1.6, 0])))
        self.au_mot("il est positif")
        self.play(Write(self.pile([("positif", 50, VERT_OK), ("ou", 36, WHITE), ("négatif ?", 50, ROUGE_ERREUR)], -0.6)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("01-piege")
        self.au_mot("Certains disent positif")
        self.play(FadeIn(self.grand("« positif » ?", font_size=64, color=ORANGE_RETENUE).move_to([0, 2.0, 0]), scale=1.3))
        self.au_mot("parce qu'il n'a pas")
        self.play(Write(self.pile([("pas de signe −", 38, WHITE), ("donc positif ?", 38, WHITE)], 0.6)))
        self.au_mot("Et c'est faux")
        self.faux(-1.2)
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-droite")
        self.play(Write(self.grand("Sur la droite", font_size=46, color=JAUNE_TITRE).move_to([0, 2.6, 0])))
        d, pt = self.droite_rel(-4, 4, [-4, -2, 0, 2, 4], y=0.9)
        self.montrer(d)
        self.au_mot("À droite du zéro")
        fd = Arrow(pt(0.3) + DOWN * 1.0, pt(4) + DOWN * 1.0, buff=0, color=VERT_OK)
        td = self.grand("positifs", font_size=30, color=VERT_OK).next_to(fd, DOWN, buff=0.1)
        self.play(GrowArrow(fd), FadeIn(td))
        self.au_mot("À gauche")
        fg = Arrow(pt(-0.3) + DOWN * 1.0, pt(-4) + DOWN * 1.0, buff=0, color=ROUGE_ERREUR)
        tg = self.grand("négatifs", font_size=30, color=ROUGE_ERREUR).next_to(fg, DOWN, buff=0.1)
        self.play(GrowArrow(fg), FadeIn(tg))
        self.au_mot("Et le zéro")
        self.play(Create(SurroundingRectangle(d[2][2], color=JAUNE_TITRE, buff=0.1)),
                  Write(self.grand("pile au milieu", font_size=36, color=JAUNE_TITRE).move_to([0, -1.6, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-regle")
        self.play(GrowFromCenter(self.grand("0", font_size=150, color=JAUNE_TITRE).move_to([0, 2.0, 0])))
        self.au_mot("Zéro n'est ni")
        self.play(Write(self.pile([("ni positif,", 44, VERT_OK), ("ni négatif", 44, ROUGE_ERREUR)], 0.3)))
        self.au_mot("Il sépare")
        self.play(FadeIn(self.pile([("il sépare", 34, WHITE), ("les deux côtés", 34, WHITE)], -1.4)))
        self.attendre_voix(marge=0.4)

        self.ecran_defi_lignes("04-defi", [("−4    0    7    −1", 56, BLEU_CALCUL),
                                           ("Combien de", 38, WHITE), ("nombres négatifs ?", 38, WHITE)],
                               mot="Parmi")
        self.ecran_renvoi("05-fin")


# ── 3. Placer (relatif_placer) ──────────────────────────────────────────────

class ShortPlacerRelatif5e(_ShortRel5e):
    nom_voix = "5e-relatif-nombre-short-placer"
    ECRITS = [-4, -3, -2, -1, 0, 1]

    def construct(self):
        self.ouvrir("00-accroche")
        self.play(GrowFromCenter(self.grand("−2,5", font_size=120, color=ROUGE_ERREUR).move_to([0, 2.0, 0])))
        d, pt = self.droite_rel(-4, 1, self.ECRITS, y=0.2)
        self.montrer(d)
        self.au_mot("sur la droite")
        self.play(Write(self.grand("Où le placer ?", font_size=46, color=JAUNE_TITRE).move_to([0, -1.3, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("01-piege")
        d, pt = self.droite_rel(-4, 1, self.ECRITS, y=1.8)
        self.add(d)
        self.au_mot("entre moins 2 et moins 1")
        self.play(FadeIn(self.point(pt, -1.5, "?", color=ORANGE_RETENUE, font_size=40), scale=0.5))
        self.au_mot("Parce que 2 virgule 5")
        self.play(Write(self.pile([("2,5 est entre 2 et 3…", 32, WHITE), ("mais du mauvais côté", 32, ORANGE_RETENUE)], 0.4)))
        self.au_mot("C'est faux")
        self.faux(-1.2)
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-methode")
        d, pt = self.droite_rel(-4, 1, self.ECRITS, y=1.6)
        self.montrer(d)
        self.au_mot("On part de zéro")
        cur = Dot(pt(0), color=JAUNE_TITRE, radius=0.11)
        self.play(FadeIn(cur, scale=0.4), Flash(cur, color=JAUNE_TITRE))
        self.au_mot("Le signe moins")
        self.play(Write(self.grand("signe −  →  à gauche", font_size=34, color=ROUGE_ERREUR).move_to([0, 0.2, 0])))
        self.au_mot("On avance de 2")
        for k in (1, 2):
            arc = ArcBetweenPoints(pt(-(k - 1)) + UP * 0.2, pt(-k) + UP * 0.2, angle=-PI / 2,
                                   color=ORANGE_RETENUE, stroke_width=3)
            self.play(Create(arc), cur.animate.move_to(pt(-k)), run_time=0.5)
        self.play(Write(self.grand("2 graduations : −2", font_size=32, color=ORANGE_RETENUE).move_to([0, -0.6, 0])))
        self.au_mot("Puis encore")
        arc = ArcBetweenPoints(pt(-2) + UP * 0.2, pt(-2.5) + UP * 0.2, angle=-PI / 2,
                               color=BLEU_CALCUL, stroke_width=3)
        self.play(Create(arc), cur.animate.move_to(pt(-2.5)).set_color(BLEU_CALCUL), run_time=0.6)
        self.play(Write(self.grand("+ une demi : −2,5", font_size=32, color=BLEU_CALCUL).move_to([0, -1.4, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-regle")
        d, pt = self.droite_rel(-4, 1, self.ECRITS, y=1.8)
        self.add(d)
        self.play(FadeIn(self.point(pt, -2.5, "−2,5", color=BLEU_CALCUL, font_size=32), scale=0.5))
        self.au_mot("entre moins 3 et moins 2")
        self.play(Write(self.pile([("entre −3 et −2,", 38, VERT_OK), ("pile au milieu", 38, VERT_OK)], 0.3)))
        self.au_mot("Côté négatif")
        self.play(FadeIn(self.pile([("côté négatif :", 32, ORANGE_RETENUE), ("on s'éloigne de 0", 32, ORANGE_RETENUE),
                                    ("vers la gauche", 32, ORANGE_RETENUE)], -1.3), shift=UP * 0.15))
        self.attendre_voix(marge=0.4)

        self.ecran_defi_lignes("04-defi", [("−4,5", 100, ROUGE_ERREUR), ("entre quels", 38, WHITE),
                                           ("nombres entiers ?", 38, WHITE)], mot="Moins 4 virgule 5")
        self.ecran_renvoi("05-fin")


# ── 4. L'opposé (relatif_oppose) ────────────────────────────────────────────

class ShortOpposeRelatif5e(_ShortRel5e):
    nom_voix = "5e-relatif-nombre-short-oppose"

    def construct(self):
        self.ouvrir("00-accroche")
        self.play(FadeIn(self.pile([("L'opposé", 64, JAUNE_TITRE), ("de −6 ?", 90, ROUGE_ERREUR)], 1.2)))
        self.attendre_voix(marge=0.6)

        self.ouvrir("01-piege")
        self.play(FadeIn(self.pile([("−6 ?", 80, ORANGE_RETENUE), ("0 ?", 80, ORANGE_RETENUE)], 1.6), scale=1.3))
        self.au_mot("Et c'est faux")
        self.faux(-1.0)
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-miroir")
        self.play(Write(self.pile([("le même nombre,", 34, BLEU_CALCUL), ("de l'autre côté du 0", 34, BLEU_CALCUL)], 2.4)))
        d, pt = self.droite_rel(-7, 7, [-6, 0, 6], y=0.9, longueur=3.6)
        self.montrer(d)
        self.au_mot("Moins 6 est à 6")
        self.play(FadeIn(self.point(pt, -6, "−6", color=ROUGE_ERREUR), scale=0.5))
        g = self.fleche_dist(pt, -6, 0, 0.0, "6", ROUGE_ERREUR)
        self.play(GrowFromCenter(g[0]), FadeIn(g[1]))
        self.au_mot("Son opposé est à 6")
        dd = self.fleche_dist(pt, 0, 6, 0.0, "6", VERT_OK)
        self.play(GrowFromCenter(dd[0]), FadeIn(dd[1]))
        self.au_mot("plus 6")
        self.play(FadeIn(self.point(pt, 6, "+6", color=VERT_OK), scale=0.5))
        self.play(Write(self.grand("opposé de −6 : +6", font_size=36, color=VERT_OK).move_to([0, -1.5, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-regle")
        self.play(FadeIn(self.pile([("même distance à 0", 36, BLEU_CALCUL), ("signe contraire", 36, BLEU_CALCUL)], 2.2)))
        self.au_mot("L'opposé de moins 6")
        self.play(Write(self.grand("−6  et  +6", font_size=70, color=VERT_OK).move_to([0, 0.5, 0])))
        self.au_mot("Et l'opposé de zéro")
        self.play(Write(self.grand("opposé de 0 : 0", font_size=40, color=JAUNE_TITRE).move_to([0, -1.0, 0])))
        self.attendre_voix(marge=0.4)

        self.ecran_defi_lignes("04-defi", [("Je suis négatif.", 40, WHITE), ("Mon opposé est 9.", 40, WHITE),
                                           ("Qui suis-je ?", 54, BLEU_CALCUL)], mot="Je suis")
        self.ecran_renvoi("05-fin")


# ── 5. La distance à zéro (relatif_valeur_absolue) ──────────────────────────

class ShortDistanceRelatif5e(_ShortRel5e):
    nom_voix = "5e-relatif-nombre-short-distance"

    def construct(self):
        self.ouvrir("00-accroche")
        self.play(FadeIn(self.pile([("distance à 0", 50, BLEU_CALCUL), ("de −8 :", 50, BLEU_CALCUL)], 2.0)))
        self.au_mot("c'est moins 8")
        self.play(GrowFromCenter(self.grand("−8 ?", font_size=110, color=ORANGE_RETENUE).move_to([0, -0.2, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("01-piege")
        self.au_mot("une distance négative")
        self.play(Write(self.pile([("une distance", 44, WHITE), ("négative ?", 44, WHITE)], 2.0)))
        self.au_mot("ça n'existe pas")
        self.play(FadeIn(self.grand("ça n'existe pas", font_size=40, color=ORANGE_RETENUE).move_to([0, 0.6, 0])))
        self.au_mot("C'est faux")
        self.faux(-1.0)
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-compter")
        d, pt = self.droite_rel(-8, 8, [-8, 0, 8], y=2.0, longueur=3.6)
        self.montrer(d)
        self.au_mot("on compte")
        self.play(FadeIn(self.point(pt, -8, "−8", color=ROUGE_ERREUR), scale=0.5))
        g = self.fleche_dist(pt, -8, 0, 1.1, "8 graduations", BLEU_CALCUL, font_size=26)
        self.play(GrowFromCenter(g[0]), FadeIn(g[1]))
        self.au_mot("La distance à zéro de moins 8")
        self.play(Write(self.pile([("distance à 0", 36, VERT_OK), ("de −8 : 8", 56, VERT_OK)], -0.8)))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-regle")
        d, pt = self.droite_rel(-8, 8, [-8, 0, 8], y=2.0, longueur=3.6)
        self.add(d, self.point(pt, -8, "−8", color=ROUGE_ERREUR), self.fleche_dist(pt, -8, 0, 1.1, "8", BLEU_CALCUL))
        self.au_mot("Et celle de plus 8")
        self.play(FadeIn(self.point(pt, 8, "+8", color=VERT_OK), scale=0.5))
        dd = self.fleche_dist(pt, 0, 8, 1.1, "8", BLEU_CALCUL)
        self.play(GrowFromCenter(dd[0]), FadeIn(dd[1]))
        self.au_mot("à la même distance")
        self.play(Write(self.grand("même distance : 8", font_size=38, color=VERT_OK).move_to([0, -0.1, 0])))
        self.au_mot("Une distance n'a jamais")
        self.play(FadeIn(self.pile([("une distance :", 34, ORANGE_RETENUE), ("toujours positive", 34, ORANGE_RETENUE)], -1.4)))
        self.attendre_voix(marge=0.4)

        self.ecran_defi_lignes("04-defi", [("distance à 0 = 5", 46, BLEU_CALCUL), ("Quels sont", 38, WHITE),
                                           ("les 2 nombres ?", 38, WHITE)], mot="Quels sont")
        self.ecran_renvoi("05-fin")


# ── 6. Défi (relatif_defi) ──────────────────────────────────────────────────

class ShortDefiRelatif5e(_ShortRel5e):
    nom_voix = "5e-relatif-nombre-short-defi"
    ECRITS = [-4, -2, 0, 1]

    def ab(self, y):
        d, pt = self.droite_rel(-5, 2, self.ECRITS, y=y)
        a = self.point(pt, -4, "A", color=ROUGE_ERREUR, font_size=34)
        b = self.point(pt, 1, "B", color=VERT_OK, font_size=34)
        return d, pt, a, b

    def construct(self):
        self.ouvrir("00-accroche")
        d, pt, a, b = self.ab(1.6)
        self.montrer(d)
        self.au_mot("Le point A")
        self.play(FadeIn(a, scale=0.5))
        self.au_mot("le point B")
        self.play(FadeIn(b, scale=0.5))
        self.au_mot("Quelle est la distance")
        self.play(Write(self.grand("Distance AB ?", font_size=52, color=JAUNE_TITRE).move_to([0, -0.6, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("01-piege")
        self.play(FadeIn(self.grand("3 ?", font_size=110, color=ORANGE_RETENUE).move_to([0, 2.0, 0]), scale=1.3))
        self.au_mot("parce que 4 moins 1")
        self.play(Write(self.grand("« 4 − 1 = 3 »", font_size=50).move_to([0, 0.6, 0])))
        self.au_mot("Et c'est faux")
        self.faux(-1.0)
        self.attendre_voix(marge=0.4)

        self.ouvrir("02-compter")
        d, pt, a, b = self.ab(2.0)
        self.add(d, a, b)
        self.au_mot("De moins 4 jusqu'à zéro")
        g = self.fleche_dist(pt, -4, 0, 1.15, "4", ROUGE_ERREUR, font_size=34)
        self.play(GrowFromCenter(g[0]), FadeIn(g[1]))
        self.au_mot("De zéro jusqu'à plus 1")
        dd = self.fleche_dist(pt, 0, 1, 1.15, "1", VERT_OK, font_size=34)
        self.play(GrowFromCenter(dd[0]), FadeIn(dd[1]))
        self.au_mot("En tout")
        self.play(GrowFromCenter(self.grand("4 + 1 = 5", font_size=80, color=BLEU_CALCUL).move_to([0, -0.4, 0])))
        self.attendre_voix(marge=0.4)

        self.ouvrir("03-regle")
        self.play(FadeIn(self.pile([("de chaque côté du 0 :", 34, WHITE), ("on AJOUTE", 40, ORANGE_RETENUE),
                                    ("les distances à 0", 34, WHITE)], 1.8)))
        self.au_mot("La distance entre A et B est 5")
        r = self.grand("AB = 5", font_size=96, color=VERT_OK).move_to([0, -0.6, 0])
        self.play(GrowFromCenter(r))
        self.play(Circumscribe(r, color=VERT_OK))
        self.attendre_voix(marge=0.4)

        self.ecran_defi_lignes("04-defi", [("C est à −6", 46, ROUGE_ERREUR), ("D est à +3", 46, VERT_OK),
                                           ("Distance CD ?", 50, BLEU_CALCUL)], mot="C est à")
        self.ecran_renvoi("05-fin")
