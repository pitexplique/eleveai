# suite_geo_graphique_short.py
# EleveAI — Maths 1re (sans spé) — short « Suite géométrique sur un graphique :
# tu paries que tu la reconnais rien qu'à son dessin ? » (9:16), ceinture
# BLANCHE (échelle entière à 70 % sous le titre). Série SUITES, épisode 15.
# Micro : expo_suite_graphique. Jumeau géométrique du short de l'ép. 07.
#   · 00-garde      : le titre, l'échelle, le pari ; un nuage qui se creuse ;
#   · 01-situation  : EN HAUT les vagues de monstres d'un jeu vidéo (2, 6, 18,
#                     54 : les nouveaux en orange, « × 3 ») ; EN BAS le repère,
#                     chaque vague au-dessus de son abscisse ;
#   · 02-dessin     : le point de chaque vague se pose SOUS sa colonne, EN MÊME
#                     TEMPS que la colonne s'allume ;
#   · 03/03b        : question-pause (A : des points qui montent de plus en plus
#                     vite), 3 s ; le nuage de la question au-dessus des boutons ;
#                     puis « × 3 », les écarts orange, la courbe qui se creuse ;
#   · 04-commentaire: 2 ; 6 ; 18 ; 54 …, « ? » à l'abscisse 6 (réponse 1 458 =
#                     2 × 3⁶, NON affichée) ; « Réponds en commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison et écarts, vert = juste.
# Voix : manim/voix/premiere-suite-geo-graphique-short.json (débit −6), calée
# par suite_geo_graphique_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_geo_graphique_short.py SuiteGeoGraphiqueShort -o eleveai-maths-premiere-suite-geo-graphique-short --media_dir manim/scripts/premiere/media-suite-geo-graphique-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import GRIS_DROITE, OutilsGraphique, Repere  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import liste_aeree  # noqa: E402  (ép. 09)

MONSTRES = [2, 6, 18, 54]
assert all(b == 3 * a for a, b in zip(MONSTRES, MONSTRES[1:]))
assert 2 * 3 ** 6 == 1458                                  # l'abscisse 6 (commentaire)
VIOLET = "#A855F7"
PAS_M, PAR_RANG, BASE = 0.14, 5, -0.25                     # un monstre ; 5 par rang ; le pied des colonnes


def monstre(p, couleur):
    """Un petit monstre : un corps rond, deux yeux blancs."""
    corps = Circle(radius=0.064, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(p)
    yeux = VGroup(*[Dot(p + P(dx, 0.014), radius=0.018, color=WHITE) for dx in (-0.025, 0.025)])
    return VGroup(corps, yeux)


def colonne(x, n, avant):
    """La vague : n monstres en rangs de 5 au-dessus de x (les `avant` premiers
    en bleu, les nouveaux en orange)."""
    g = VGroup()
    for k in range(n):
        r, c = divmod(k, PAR_RANG)
        dans_rang = min(PAR_RANG, n - r * PAR_RANG)
        px = x + (c - (dans_rang - 1) / 2) * PAS_M
        g.add(monstre(P(px, BASE + PAS_M / 2 + r * PAS_M), TERME if k < avant else RAISON))
    return g


def manette(s=1.0):
    """La manette du jeu vidéo : la croix, deux boutons."""
    corps = RoundedRectangle(width=0.9, height=0.46, corner_radius=0.2, fill_color=GREY_B, fill_opacity=1,
                             stroke_width=0)
    croix = VGroup(Rectangle(width=0.2, height=0.06), Rectangle(width=0.06, height=0.2)).set_fill("#1f2937", 1)
    croix.set_stroke(width=0).move_to(P(-0.22, 0))
    boutons = VGroup(Dot(P(0.2, 0.05), radius=0.045, color=JUSTE), Dot(P(0.3, -0.05), radius=0.045, color=PIEGE))
    return VGroup(corps, croix, boutons).scale(s)


def bouton_texte(lignes, fs=34):
    """Le corps d'un bouton : une ou deux lignes à la taille de la question."""
    g = VGroup(*[Text(l, font_size=fs, color=WHITE) for l in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
    g.original_text = " ".join(lignes)
    return g


class SuiteGeoGraphiqueShort(OutilsGraphique, ShortSuites):
    fichier_marques = "suite_geo_graphique_short_marques.json"
    nom_voix = "premiere-suite-geo-graphique-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15            # la coche prend la place de la lettre (q_reponse)

    def entete(self, titre, extrait=None, fs=40):
        """Comme l'ép. 12 : le titre un peu plus haut, l'échelle (70 %) 0,15 sous lui."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.titre_s = self.t(titre, fs, JAUNE_TITRE).move_to(P(0, 3.6))
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.next_to(self.titre_s, DOWN, buff=0.15)
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def q_reponse(self, q, bonne):
        """La bonne réponse s'allume ; la coche remplace la lettre (les textes des
        boutons gardent toute la largeur)."""
        cartes = q.cartes
        b = cartes[bonne]
        rond, lettre = b[1][0]
        anims = [b[0].animate.set_stroke(JUSTE, width=7).set_fill("#052e16", 1), rond.animate.set_fill(JUSTE)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(q.rebours), FadeOut(q.pause), run_time=0.25)
        ok = self.coche(WHITE, 0.17).set_stroke(width=7).move_to(rond)
        self.play(FadeOut(lettre), Create(ok), run_time=0.25)
        b[1][0].remove(lettre)  # sinon la lettre revient quand le bouton bouge
        b.add(ok)
        self.insister(b, self.k_allumer)
        return ok

    def repere_jeu(self, bg_y=-2.45, hd_y=-0.75, grads=True):
        r = Repere((0, 3.4), (0, 60), P(-1.5, bg_y), P(1.65, hd_y), 20, etiq_u=(20, 40) if grads else (),
                   etiq_n=(0, 1, 2, 3) if grads else (), fs=28, fs_grad=26, buff_grad=0.08)
        r.lab_u.next_to(r.ax_u.get_end(), RIGHT, buff=0.1)
        r.lab_n.next_to(r.ax_n.get_end(), DOWN, buff=0.08).shift(LEFT * 0.12)
        return r

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari, un nuage qui se creuse ──
        self.dire("00-garde")
        self.entete("Suite géométrique", extrait="Suite")
        sg = self.t("sur un graphique", 38, TERME).next_to(self.badge, DOWN, buff=0.3)
        self.au_mot("sur un graphique")
        self.play(FadeIn(sg, shift=UP * 0.1), run_time=0.3)
        pari = self.paragraphe(["Tu paries que", "tu la reconnais", ("rien qu'à", RAISON), ("son dessin ?", RAISON)],
                               self.fs_grand, buff=0.2, y=0.55)
        for ligne, ex in zip(pari, ("Tu paries", "tu la", "rien qu'à", "son dessin")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.25)
        vals = [1, 2, 4, 8, 16]
        pts = [P(-1.5 + 0.75 * k, -2.7 + 0.1 * v) for k, v in enumerate(vals)]
        dots = VGroup(*[Dot(p, radius=0.09, color=TERME) for p in pts])
        ecarts = VGroup(*[Line(P(pts[k + 1][0], pts[k][1]), pts[k + 1]).set_stroke(RAISON, 5) for k in range(4)])
        cb = DashedVMobject(VMobject().set_points_smoothly(pts), num_dashes=20).set_stroke(GRIS_DROITE, 3)
        for k in range(5):
            self.play(GrowFromCenter(dots[k]), *([Create(ecarts[k - 1])] if k else []), run_time=0.14)
        self.play(Create(cb), run_time=0.3)
        self.bring_to_front(dots)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT les vagues de monstres ; EN BAS le repère ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        tete = VGroup(manette(0.8), self.t("un jeu vidéo", 38, TERME)).arrange(RIGHT, buff=0.25)
        tete.next_to(self.badge, DOWN, buff=0.28)
        self.au_mot("jeu vidéo")
        rep = self.repere_jeu()
        self.play(FadeIn(tete, shift=UP * 0.1), *rep.anims(), run_time=0.45)
        xs = [rep.G(n, 0)[0] for n in range(4)]
        cols = [colonne(xs[n], MONSTRES[n], MONSTRES[n - 1] if n else MONSTRES[0]) for n in range(4)]
        nbs = [self.t(str(v), 34, TERME).next_to(cols[n], UP, buff=0.12) for n, v in enumerate(MONSTRES)]
        fois = self.t("× 3", 48, RAISON, audit=False).move_to(P(-1.25, 1.5))
        vague = VGroup(self.t("à chaque", 26, GREY_A), self.t("vague", 26, GREY_A)).arrange(DOWN, buff=0.04)
        vague.move_to(P(-1.25, 0.86))
        self.au_mot("triplent")
        self.play(FadeIn(fois, scale=1.4), run_time=0.3)
        self.au_mot("à chaque vague")
        self.play(FadeIn(vague, shift=UP * 0.08), run_time=0.3)
        for n in range(4):
            self.suivre(str(MONSTRES[n]))
            self.play(LaggedStart(*[FadeIn(m, scale=1.6) for m in cols[n]], lag_ratio=0.6 / max(len(cols[n]), 1)),
                      FadeIn(nbs[n], scale=1.3), run_time=0.35 if n < 3 else 0.6)
        self.attendre_voix(marge=0.3)

        # ── 02 : le point de chaque vague se pose sous sa colonne ──
        self.dire("02-dessin")
        self.au_mot("On place")
        self.play(Indicate(rep.ax_n, color=WHITE, scale_factor=1.02), Indicate(rep.ax_u, color=WHITE), run_time=0.4)
        pts = VGroup()
        for n in range(4):
            self.suivre(f"{n} et")
            self.play(Indicate(rep.grads[n], color=RAISON, scale_factor=1.4), run_time=0.2)
            self.suivre(str(MONSTRES[n]))
            d = rep.point(n, MONSTRES[n], r=0.1)
            self.play(GrowFromCenter(d), Flash(d, color=TERME, line_length=0.12),
                      Indicate(VGroup(cols[n], nbs[n]), color=TERME, scale_factor=1.08), run_time=0.35)
            pts.add(d)
        self.attendre_voix(marge=0.5)

        # ── 03 : question-pause → A ; le nuage de la question au-dessus des boutons ──
        lignes = self.paragraphe(["À quoi ressemble", "ce nuage ?"], 32, buff=0.1, y=2.6)
        mini = self.repere_jeu(1.15, 1.6, grads=False)
        mini.lab_n.next_to(mini.ax_n.get_end(), UP, buff=0.05).shift(LEFT * 0.12)
        mpts = VGroup(*[mini.point(n, v, r=0.08) for n, v in enumerate(MONSTRES)])
        corps = [bouton_texte(["de plus en", "plus vite"], 30), bouton_texte(["alignés"], 30),
                 bouton_texte(["qui descendent"], 30)]
        f = min(1.0, (4.0 - self.place_coche - 0.5 * 30 / 32 - 0.45) / max(c.width for c in corps))
        for c in corps:
            c.scale(f)  # même taille de texte dans les 3 boutons
        cartes = VGroup(*[self.bouton(L, c, 4.0, 30) for L, c in zip("ABC", corps)])
        cartes.arrange(DOWN, buff=0.12)
        cartes.move_to(P(0, 0)).align_to(P(0, 0.95), UP)

        def e1():
            self.au_mot("À quoi")
            self.play(FadeIn(lignes[0], shift=UP * 0.08), run_time=0.25)
            self.au_mot("ce nuage")
            self.play(FadeIn(lignes[1], shift=UP * 0.08), *mini.anims(), FadeIn(mpts), run_time=0.35)

        q = self.question_libre("03-question", [e1], cartes, P(0, cartes.get_bottom()[1] - 0.42))
        self.dire("03b-reponse")
        self.au_mot("Réponse A")
        ok = self.q_reponse(q, 0)
        a = cartes[0]
        self.play(FadeOut(cartes[1]), FadeOut(cartes[2]), FadeOut(q.tete), FadeOut(lignes), FadeOut(mini),
                  FadeOut(mpts), run_time=0.25)
        self.play(a.animate.move_to(P(0, 3.05)), run_time=0.3)
        rep2 = self.repere_jeu(-2.45, 0.15)
        pts2 = VGroup(*[rep2.point(n, v, r=0.1) for n, v in enumerate(MONSTRES)])
        self.play(*rep2.anims(), LaggedStart(*[GrowFromCenter(d) for d in pts2], lag_ratio=0.2), run_time=0.45)
        self.au_mot("multiplie par")
        self.suivre("3")
        f3 = self.t("× 3", 56, RAISON).move_to(P(0, 2.1))
        self.play(FadeIn(f3, scale=1.4), run_time=0.3)
        self.au_mot("les écarts")
        ec = VGroup(self.t("les écarts", 36, RAISON), self.t("grandissent", 36, RAISON)).arrange(DOWN, buff=0.22)
        ec.move_to(P(0, 1.2))
        marches = [rep2.marche(n, MONSTRES[n], MONSTRES[n + 1], largeur=6) for n in range(3)]
        self.play(FadeIn(ec, shift=UP * 0.08), LaggedStart(*[Create(m) for m in marches], lag_ratio=0.5),
                  run_time=0.6)
        self.bring_to_front(pts2)
        self.au_mot("la courbe")
        cb = DashedVMobject(VMobject().set_points_smoothly([d.get_center() for d in pts2]), num_dashes=24)
        cb.set_stroke(GRIS_DROITE, 3)
        cr = VGroup(self.t("la courbe", 36, TERME), self.t("se creuse", 36, TERME)).arrange(DOWN, buff=0.22)
        cr.move_to(ec)
        self.play(FadeOut(ec, shift=UP * 0.1), FadeIn(cr, shift=UP * 0.1), Create(cb), run_time=0.5)
        self.bring_to_front(pts2)
        self.attendre_voix(marge=1.0)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 50, JAUNE_TITRE).move_to(P(0, 3.5))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        lst = liste_aeree([str(v) for v in MONSTRES], 40, TERME)
        trois = self.t("…", 40, GREY_A).next_to(lst, RIGHT, buff=0.12).align_to(lst, DOWN)
        tout = VGroup(lst, trois)
        if tout.width > self.largeur_texte:
            tout.scale_to_fit_width(self.largeur_texte)
        tout.move_to(P(0, 2.72))
        X0, Y0, KU = -1.45, 0.9, 0.021
        XN = {0: -1.45, 1: -0.95, 2: -0.45, 3: 0.05, 6: 1.35}
        k = dict(buff=0, stroke_width=2.5, color=GREY_B, tip_length=0.15)
        ax_n = Arrow(P(X0, Y0), P(1.75, Y0), **k)
        ax_u = Arrow(P(X0, Y0), P(X0, 2.15), **k)
        coupe = VGroup(*[Line(P(0.55 + dx, Y0 - 0.1), P(0.65 + dx, Y0 + 0.1), stroke_width=4, color=GREY_B)
                         for dx in (0, 0.1)])
        ln = self.t("n", 28, GREY_A).next_to(ax_n, RIGHT, buff=0.06)
        lu = self.t("uₙ", 28, GREY_A).next_to(ax_u.get_end(), RIGHT, buff=0.1)
        grad = VGroup(*[self.t(str(n), 24, GREY_A, audit=False).move_to(P(XN[n], Y0 - 0.22)) for n in range(4)])
        self.play(Create(ax_n), Create(ax_u), FadeIn(coupe), FadeIn(ln), FadeIn(lu), FadeIn(grad), run_time=0.35)
        pts = VGroup()
        for n, (nb, v) in enumerate(zip(lst.nombres, MONSTRES)):
            self.suivre(str(v))
            d = Dot(P(XN[n], Y0 + KU * v), radius=0.09, color=TERME)
            anims = [FadeIn(nb, scale=1.3), GrowFromCenter(d)]
            if n:
                anims.append(FadeIn(lst.seps[n - 1]))
            self.play(*anims, run_time=0.25)
            pts.add(d)
        cb = DashedVMobject(VMobject().set_points_smoothly([d.get_center() for d in pts]), num_dashes=14)
        cb.set_stroke(GRIS_DROITE, 3)
        self.play(FadeIn(trois), Create(cb), run_time=0.3)
        self.bring_to_front(pts)
        question = self.paragraphe(["Quelle est", "l'ordonnée", "du point", ("d'abscisse 6 ?", RAISON)], 36,
                                   buff=0.1, y=-0.7)
        for ligne, ex in zip(question, ("Quelle", "l'ordonnée", "du point", "abscisse 6")):
            if ex == "abscisse 6":
                self.au_mot("abscisse")
                self.suivre("6")
            else:
                self.au_mot(ex)
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if ex == "abscisse 6":
                g6 = self.t("6", 24, RAISON).move_to(P(XN[6], Y0 - 0.22))
                vl = DashedLine(P(XN[6], Y0), P(XN[6], 1.85), color=RAISON, stroke_width=3)
                qm = self.t("?", 44, RAISON).move_to(P(XN[6], 2.12))
                anims += [FadeIn(g6), Create(vl), FadeIn(qm, scale=1.4)]
            self.play(*anims, run_time=0.3)
        self.appel_commentaire(-2.4)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
