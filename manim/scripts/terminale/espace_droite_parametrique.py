# espace_droite_parametrique.py
# EleveAI — Maths Tle spé — paysage « Représentation paramétrique d'une droite » (16:9),
# ceinture VERTE. Micro du coach : espace_droite_parametrique (notion geometrie_espace).
# Épisode 3 sur 12. Centre : transports (liste fermée lib/videos/centres-interet.ts,
# tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, les trois promesses (un point, une direction, un curseur) ;
#   · 01-situation  : Soraya, contrôleuse aérienne ; l'avion qui monte d'un pas égal ;
#   · 02-idee       : A(1 ; 2 ; 0), u(2 ; −1 ; 3), les trois lignes, t = 0 et t = 1 ;
#   · 03-theoreme   : ce qu'on LIT dans les trois lignes (le point, la direction, le t) ;
#   · 04/04b        : question-pause n° 1 (vecteur directeur de d → réponse C) ;
#   · 05-appliquer  : B(5 ; 0 ; 6) est-il sur d ? la première ligne donne t, les deux
#                     autres vérifient ;
#   · 06-piege      : une même droite a une infinité de systèmes ;
#   · 07/07b        : question-pause n° 2 (C(7 ; −1 ; 10) sur d ? → réponse A) ;
#   · 08-rediger    : les deux rédactions du bac (donner la droite / tester un point) ;
#   · 09/09b        : le défi — une paramétrique de (A B) avec A(2 ; 0 ; 1), B(2 ; 3 ; −1) ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ Le socle d'écran est dans manim/poste2/espace_ecrans.py (dont `systeme`, écrit pour
#   cet épisode et que les épisodes « plan » et « position relative » réutiliseront), les
#   figures dans manim/poste2/espace3d.py. ⛔ Une correction d'outil se fait LÀ-BAS.
# ⛔ Les pièges de la série : manim/REPRISE-espace-terminale.md (et les 43 de
#   manim/REPRISE-entiers-cm1-6e.md, qui valent ici).
# ⚠️ Bonne réponse : 04 → C, 07 → A (tirage graine 2211, table dans VOIX-espace-terminale.md).
#
# Voix : manim/voix/terminale-espace-droite-parametrique.json (débit −6, Julie).
# Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql \
#   --disable_caching manim/scripts/terminale/espace_droite_parametrique.py \
#   EspaceDroiteParametriqueTerminale --media_dir manim/scripts/terminale/media-espace-droite \
#   --dry_run

import sys
from pathlib import Path

# ⚠️ DEUX chemins : manim/poste2/ pour le socle et les figures, manim/ pour la
# charte. Sans le second, « from charte import * » plante — et verifier-avant-
# rendu.py ne le voit pas, il lit le source sans l'importer.
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "poste2"))
sys.path.insert(1, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402,F403

from espace3d import (C_DROITE, C_FANTOME, C_PIEGE, C_REGARD,  # noqa: E402
                      C_PLAN, C_VECTEUR, C_VECTEUR2)
from charte import *  # noqa: E402,F401,F403
from espace_ecrans import P, EcransEspace, ligne_param, pastille_pause  # noqa: E402

PEAU, CHEVEUX = "#8d5524", "#1a1008"
CASQUE = "#e2e8f0"      # ⛔ CLAIR : piège n° 17 des entiers — un casque de la couleur
#                         des cheveux fond dans les cheveux, et seule l'image le dit.

# ── les valeurs dites par la voix, revérifiées ICI, à l'exécution ───────────
A_D = (1, 2, 0)          # le point de départ de d
U_D = (2, -1, 3)         # son vecteur directeur


def pt_de(t):
    """Le point de d au paramètre t : A + t·u, coordonnée par coordonnée."""
    return tuple(A_D[i] + t * U_D[i] for i in range(3))


assert pt_de(0) == A_D                                   # 02 : t = 0 retombe sur A
assert pt_de(1) == (3, 1, 3)                             # 02 et 04 : le leurre « point »
assert pt_de(2) == (5, 0, 6)                             # 05 : B est bien sur d
assert pt_de(3) == (7, -1, 9) != (7, -1, 10)             # 07 : la 3ᵉ ligne ne suit pas
# 06 : l'autre système part de (3 ; 1 ; 3) et son directeur est le DOUBLE de u.
A2_D, U2_D = pt_de(1), tuple(2 * c for c in U_D)
assert U2_D == (4, -2, 6)
# ⭐ Le second système décrit la MÊME droite : son paramètre s vaut (t − 1) / 2.
assert all(tuple(A2_D[i] + s * U2_D[i] for i in range(3)) == pt_de(1 + 2 * s)
           for s in (0, 0.5, 1, -1))
# 09b : le défi — (A B) avec A(2 ; 0 ; 1) et B(2 ; 3 ; −1).
A_DEFI, B_DEFI = (2, 0, 1), (2, 3, -1)
AB_DEFI = tuple(B_DEFI[i] - A_DEFI[i] for i in range(3))
assert AB_DEFI == (0, 3, -2)
# ⭐ la conclusion du défi : x est CONSTANT, donc toute la droite est dans le plan x = 2.
assert AB_DEFI[0] == 0 and A_DEFI[0] == 2


def soraya(s=1.0):
    """La contrôleuse aérienne : casque CLAIR, oreillettes rejetées HORS des mèches,
    micro à CÔTÉ du visage, et son écran radar.
    ⛔ Piège n° 17 de la série des entiers, vu seulement à l'image : un casque
    anthracite sur des cheveux noirs fondait en une seule masse, et le micro passait
    en travers du visage. D'où : casque clair, oreillettes à 1,3 r, micro qui s'arrête
    avant le milieu du visage."""
    tete = Circle(radius=0.32, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    cheveux = Arc(radius=0.36, start_angle=0.08, angle=PI - 0.16, stroke_color=CHEVEUX, stroke_width=14)
    cheveux.move_to(tete.get_top() + DOWN * 0.05)
    arceau = Arc(radius=0.47, start_angle=0.30, angle=PI - 0.60, stroke_color=CASQUE, stroke_width=6)
    arceau.move_to(tete.get_top() + DOWN * 0.02)
    oreilles = VGroup(*[Circle(radius=0.095, fill_color=CASQUE, fill_opacity=1, stroke_width=0)
                        .move_to(P(x, 1.03)) for x in (-0.42, 0.42)])
    micro = VGroup(Line(P(-0.40, 0.97), P(-0.19, 0.84), stroke_width=4, color=CASQUE),
                   Dot(P(-0.19, 0.84), radius=0.05, color=CASQUE))
    corps = RoundedRectangle(width=1.02, height=1.22, corner_radius=0.3, fill_color="#1e3a8a",
                             fill_opacity=1, stroke_width=0).move_to(P(0, 0.10))
    galon = VGroup(*[Line(P(-0.46, y), P(-0.22, y), stroke_width=5, color="#fcd34d")
                     for y in (0.46, 0.34)])
    ecran = VGroup(
        RoundedRectangle(width=0.52, height=0.40, corner_radius=0.06, fill_color="#0b1220",
                         fill_opacity=1, stroke_color=C_PLAN, stroke_width=3),
        Arc(radius=0.15, start_angle=0.5, angle=1.6, stroke_color=C_PLAN, stroke_width=2),
        Dot(P(0.10, 0.06), radius=0.035, color=VERT_OK))
    ecran.move_to(P(0.68, 0.18))
    return VGroup(corps, galon, tete, cheveux, arceau, oreilles, micro, ecran).scale(s)


def avion(s=1.0, couleur=C_REGARD):
    """Un petit avion vu de côté : fuselage, aile, dérive. ⚠️ Dessiné, jamais un
    emoji : le glyphe ✈ ne se rend pas (carré « tofu », piège n° 2 de l'épisode 1)."""
    fuselage = Polygon(P(-0.22, -0.045), P(0.20, -0.045), P(0.30, 0.0), P(0.20, 0.045),
                       P(-0.22, 0.045), fill_color=couleur, fill_opacity=1, stroke_width=0)
    aile = Polygon(P(0.02, 0.0), P(-0.14, 0.0), P(-0.06, 0.18), P(0.06, 0.18),
                   fill_color=couleur, fill_opacity=1, stroke_width=0)
    derive = Polygon(P(-0.22, 0.0), P(-0.22, 0.17), P(-0.10, 0.02),
                     fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(fuselage, aile, derive).scale(s)


class EspaceDroiteParametriqueBase(EcransEspace):
    fichier_marques = "espace_droite_parametrique_marques.json"
    nom_voix = "terminale-espace-droite-parametrique"

    # ── les trois lignes de d, écrites partout pareil ──────────────────────

    def systeme_d(self, fs=34, c_acc=C_DROITE):
        """Le système de d : x = 1 + 2t, y = 2 − t, z = 3t — écrit depuis A_D et U_D."""
        return self.systeme([ligne_param(n, A_D[i], U_D[i]) for i, n in enumerate("xyz")],
                            fs, c_acc=c_acc)

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = self.echelle().align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Représentation paramétrique", 50, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Représentation paramétrique")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        fs = 40
        promesses = (("un point de départ", C_REGARD, "Un point de départ"),
                     ("une direction", C_VECTEUR2, "une direction"),
                     ("un curseur qui glisse", VERT_OK, "un curseur qui glisse"))
        lignes = VGroup()
        for txt, coul, _ in promesses:
            lignes.add(VGroup(Dot(radius=0.08, color=coul), self.t(txt, fs, coul))
                       .arrange(RIGHT, buff=0.26))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        # ⚠️ au-dessus de l'échelle des ceintures, qui occupe y ∈ [−3,45 ; −2,6], et
        # au-dessus de la bande libre y ≈ −2,0 où va la dernière phrase.
        lignes.move_to(P(0, 0.85))
        for b, (_, _, extrait) in zip(lignes, promesses):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.5)
        # ⚠️ fs 34 et centré : à 9,2 de large le bloc s'arrête à x = 4,6, donc à l'écart
        # de Ti-Margo, dont la boîte commence à x = 4,87 quand il est à scale 0,8.
        fin = self.t("toute la droite tient en trois lignes", 34, WHITE).move_to(P(0, -1.6))
        self.au_mot("toute la droite tient en trois lignes")
        self.play(FadeIn(fin, shift=UP * 0.12), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : Soraya et l'avion qui monte ───────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        s = soraya(0.95).move_to(P(-5.6, 0.75))
        self.au_mot("Voici Soraya")
        nom = self.t("Soraya", 36, JAUNE_TITRE).next_to(s, DOWN, buff=0.22)
        self.play(FadeIn(s, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("contrôleuse aérienne")
        metier = VGroup(self.t("contrôleuse", 24, GREY_A), self.t("aérienne", 24, GREY_A))
        metier.arrange(DOWN, buff=0.08).next_to(nom, DOWN, buff=0.12)
        for g in (nom, metier):
            if g.get_left()[0] < -6.5:
                g.shift(RIGHT * (-6.5 - g.get_left()[0]))
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)

        r, ax = self.repere(o=(-3.6, -2.5), u=0.46, portee=5)
        self.au_mot("un avion en montée")
        self.play(Create(ax), run_time=0.5)
        # ⛔ VU AU GROS PLAN : avec la direction (1,4 ; 0,8 ; 0,9), la trajectoire avait
        # EN PROJECTION la même pente que l'axe des y (0,63 contre 0,70) et passait sur
        # son étiquette. Une montée plus plate (pente 0,32) s'en écarte nettement — et
        # c'est aussi ce que fait un avion qui monte.
        dir_vol = (2.0, 0.6, 0.55)
        route = r.droite((0, 0, 0), dir_vol, 0, 2.3, couleur=C_REGARD, sw=5)
        self.sans_audit(route)
        pas = VGroup(*[Dot(r.pt(*[k * c for c in dir_vol]), radius=0.075, color=C_VECTEUR)
                       for k in (0, 1, 2)])
        av = avion(1.0).move_to(r.pt(*[2.3 * c for c in dir_vol]))
        self.play(Create(route), FadeIn(av, scale=1.4), run_time=0.8)
        self.au_mot("chaque minute il avance")
        egal = self.col(VGroup(self.t("chaque minute,", 30, GREY_A),
                              self.t("la même avancée", 30, GREY_A))
                        .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 2.55)
        self.play(*[FadeIn(d, scale=1.8) for d in pas], FadeIn(egal, shift=RIGHT * 0.12),
                  run_time=0.7)
        for y, txt, coul, extrait in ((1.55, "tant vers l'est", C_REGARD, "tant vers l'est"),
                                      (1.00, "tant vers le nord", C_VECTEUR, "tant vers le nord"),
                                      (0.45, "tant en altitude", VERT_OK, "tant en altitude")):
            self.au_mot(extrait)
            m = self.col(self.t(txt, 32, coul), y)
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("Si elle connaît sa position")
        don = self.col(VGroup(self.t("sa position maintenant", 28, WHITE),
                              self.t("et son avancée par minute", 28, WHITE))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.1), -0.5)
        self.play(FadeIn(don[0], shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("son avancée par minute")
        self.play(FadeIn(don[1], shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("dans sept minutes")
        # ⚠️ « sept » en LETTRES : la voix le dit en lettres, et un « 7 » à l'écran
        # serait un AUDIT-ABSENT légitime (le défaut n° 5 de l'épisode 1).
        sept = self.col(VGroup(self.t("elle sait où il sera", 28, VERT_OK),
                               self.t("dans sept minutes", 28, VERT_OK))
                        .arrange(DOWN, aligned_edge=LEFT, buff=0.1), -1.45)
        self.play(FadeIn(sept, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Une représentation paramétrique")
        # ⭐ La phrase entière dans LA MÊME colonne (piège n° 28 des entiers : une phrase
        # coupée entre les deux colonnes se lit en morceaux). Sous l'axe des x, qui est
        # à y = −2,5 : la bande y ∈ [−3,45 ; −2,75] est libre à gauche.
        chute = VGroup(self.t("une représentation paramétrique,", 28, C_REGARD),
                       self.t("c'est exactement cela", 28, C_REGARD))
        chute.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.gauche(chute, -3.05, xmax=0.4)
        self.play(FadeIn(chute, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 02 : un point, une direction, trois lignes ─────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.au_mot("Une droite, c'est un point et une direction")
        titre = self.t("Un point, une direction", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)

        r, ax = self.repere(o=(-4.6, -2.3), u=0.5, portee=5)
        self.play(Create(ax), run_time=0.4)
        pa = self.sans_audit(r.point(*A_D, "A", couleur=C_REGARD, decal=DL))
        self.au_mot("Prenons le point A de coordonnées")
        self.play(FadeIn(pa, scale=1.3), run_time=0.5)
        self.au_fin("1, 2, 0")
        lA = self.ligne(self.t("A", 34, C_REGARD), self.trip(A_D, 34), y=2.55)
        self.play(FadeIn(lA, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("le vecteur directeur u")
        vu = r.vecteur(A_D, pt_de(1), "u", couleur=C_VECTEUR2, sw=7, decal=DR)
        self.sans_audit(vu)
        self.play(GrowArrow(vu[0]), FadeIn(vu.nom), run_time=0.6)
        self.au_fin("2, moins 1, 3")
        lu = self.ligne(self.t("u", 34, C_VECTEUR2), self.trip(U_D, 34), y=1.90)
        self.play(FadeIn(lu, shift=RIGHT * 0.12), run_time=0.45)

        self.au_mot("Un point de la droite s'écrit alors")
        dr = r.droite(A_D, U_D, -0.3, 1.6, nom="d", couleur=C_DROITE, sw=5, decal=UR)
        self.sans_audit(dr)
        syst = self.systeme_d(34)
        self.col(syst, 0.35)
        self.play(Create(dr), run_time=0.7)
        for i, extrait in enumerate(("x égale 1 plus 2 t", "y égale 2 moins t", "z égale 3 t")):
            self.au_fin(extrait)
            self.play(FadeIn(syst.eq[i], shift=RIGHT * 0.12), *([Create(syst.acc)] if i == 0 else []),
                      run_time=0.4)
        self.au_mot("où t est un nombre réel")
        reel = self.col(self.t("t est un réel quelconque", 28, GREY_A), -1.25)
        self.play(FadeIn(reel, shift=UP * 0.1), run_time=0.4)

        # ⚠️ sans_audit ASSUMÉ et documenté, comme l'épisode 2 pour « 4 ; 2 ; 3 » : la
        # voix dit « Pour t égal à ZÉRO » en lettres, et l'écran écrit « t = 0 », qui
        # est la seule écriture juste d'une valeur de paramètre.
        fs = 28
        t0 = self.gauche(VGroup(self.t("t = 0", fs, VERT_OK), self.t("→", fs, GREY_A),
                                self.t("A", fs, C_REGARD)).arrange(RIGHT, buff=0.22),
                         -2.85, xmax=0.4)
        self.sans_audit(t0[0])
        self.au_mot("Pour t égal à zéro")
        self.play(FadeIn(t0, shift=RIGHT * 0.12), Flash(pa[0], color=VERT_OK, line_length=0.2),
                  run_time=0.6)
        self.au_fin("Pour t égal à 1")
        t1 = self.gauche(VGroup(self.t("t = 1", fs, VERT_OK), self.t("→", fs, GREY_A),
                                self.trip(pt_de(1), fs, C_VECTEUR)).arrange(RIGHT, buff=0.22),
                         -3.25, xmax=0.4)
        p1 = Dot(r.pt(*pt_de(1)), radius=0.1, color=C_VECTEUR)
        self.play(FadeIn(t1[0], shift=RIGHT * 0.12), FadeIn(t1[1]), FadeIn(p1, scale=2), run_time=0.5)
        self.au_fin("3, 1, 3")
        self.play(FadeIn(t1[2], scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 03 : tout se lit dans les trois lignes ─────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("Dans ces trois lignes")
        titre = self.t("Tout se lit dans les trois lignes", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        # ⚠️⚠️ sans_audit ASSUMÉ ET DOCUMENTÉ, et c'est le cas qui reviendra dans les
        # douze épisodes : CET ÉCRAN RELIT LE SYSTÈME ÉCRIT À L'ÉCRAN PRÉCÉDENT. La voix
        # de ce clip dit « dans ces trois lignes » et « les coordonnées d'un point de la
        # droite » — elle ne redit AUCUN nombre. L'audit, qui travaille clip par clip,
        # signale donc douze AUDIT-ABSENT légitimes de son point de vue, et faux du
        # nôtre : ces nombres ont été dits et écrits 20 s plus tôt, et les montrer EST la
        # leçon de l'écran (on annote un système, on ne l'invente pas).
        # ⛔ Ce n'est PAS l'excuse des cinq vrais ABSENT de l'épisode 1, où les nombres
        # (les coordonnées d'un drone) n'étaient dits NULLE PART dans l'épisode.
        syst = self.sans_audit(self.systeme_d(38))
        self.gauche(syst, 1.55, xmax=0.0)
        self.play(Create(syst.acc), *[FadeIn(e) for e in syst.eq], run_time=0.8)

        fs = 30
        self.au_mot("Les nombres sans t")
        b1 = self.col(VGroup(self.t("les nombres sans t", fs, C_REGARD),
                             VGroup(self.sans_audit(self.trip(A_D, fs + 4, C_REGARD)),
                                    self.t(": un point de d", fs, WHITE)).arrange(RIGHT, buff=0.22))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.16), 2.15)
        self.play(FadeIn(b1[0], shift=RIGHT * 0.12), run_time=0.4)
        self.play(FadeIn(b1[1], shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("Les coefficients de t")
        b2 = self.col(VGroup(self.t("les coefficients de t", fs, C_VECTEUR2),
                             VGroup(self.sans_audit(self.trip(U_D, fs + 4, C_VECTEUR2)),
                                    self.t(": la direction", fs, WHITE)).arrange(RIGHT, buff=0.22))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.16), 0.75)
        self.play(FadeIn(b2[0], shift=RIGHT * 0.12), run_time=0.4)
        self.play(FadeIn(b2[1], shift=RIGHT * 0.12), run_time=0.4)

        # ⭐ Une seule phrase, donc une seule colonne : « Et un point appartient à la
        # droite s'il existe un t qui donne ses trois coordonnées : le même t pour les
        # trois. » Les quatre morceaux restent à GAUCHE, sous le système.
        self.au_mot("Et un point appartient à la droite")
        app = VGroup(self.t("un point appartient à d", fs, WHITE),
                     self.t("s'il existe un t qui donne", fs, WHITE),
                     self.t("ses trois coordonnées :", fs, WHITE))
        app.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.gauche(app, -1.05, xmax=0.0)
        self.play(FadeIn(app, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("le même t pour les trois")
        meme = self.gauche(self.t("le même t pour les trois", 36, VERT_OK), -2.45, xmax=0.0)
        cad = SurroundingRectangle(meme, color=VERT_OK, buff=0.14, stroke_width=3)
        self.play(FadeIn(meme, shift=UP * 0.1), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 (bonne réponse : C) ───────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        self.au_mot("Question !")
        # ⭐ La donnée (le système), à GAUCHE, avec la phrase qui l'annonce : une phrase
        # et son objet dans la MÊME colonne. La question, elle, est dans la colonne de
        # droite avec ses cartes.
        intro = self.gauche(self.t("La droite d est donnée par", 32, WHITE), 2.25, xmax=0.4)
        syst = self.systeme_d(38)
        self.gauche(syst, 0.55, xmax=0.4)
        # ⛔ Deux lignes de question SEULEMENT, et trois triplets courts : mesuré, le bas
        # des cartes tombe à y = −1,19, loin au-dessus de la boîte de Ti-Margo (−2,15).
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Quel est un vecteur", "directeur de d ?"],
            [self.trip(A_D, 32), self.trip(pt_de(1), 32), self.trip(U_D, 32)])
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("La droite d est donnée par")
        self.play(FadeIn(intro, shift=RIGHT * 0.1), Create(syst.acc), run_time=0.5)
        for i, extrait in enumerate(("x égale 1 plus 2 t", "y égale 2 moins t", "z égale 3 t")):
            self.au_fin(extrait)
            self.play(FadeIn(syst.eq[i], shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("Quel est un vecteur directeur")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "C")
        self.mem_q1 = (syst, cartes, pause, rebours)

    def ecran_reponse1(self):
        syst, cartes, pause, rebours = self.mem_q1
        self.dire("04b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        fs = 30
        self.au_mot("Le vecteur directeur")
        # ⛔ xmax = 1,6 : rien ne doit entrer dans la colonne des cartes, qui commence à
        # x = 2,2 (c'est le défaut n° 6 de l'épisode 1, invisible à la planche).
        l1 = self.gauche(self.t("le vecteur directeur :", fs, VERT_OK), -0.75, xmax=1.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.4)
        self.au_fin("2, moins 1 et 3")
        l2 = self.gauche(VGroup(self.t("les coefficients de t :", fs, WHITE),
                                self.trip(U_D, fs + 4, VERT_OK)).arrange(RIGHT, buff=0.25),
                         -1.35, xmax=1.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("Le triplet 1, 2, 0")
        l3 = self.gauche(VGroup(self.trip(A_D, fs, C_PIEGE),
                                self.t(": un point de d", fs, C_PIEGE)).arrange(RIGHT, buff=0.25),
                         -2.05, xmax=1.6)
        self.play(FadeIn(l3, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("Et 3, 1, 3")
        l4 = self.gauche(VGroup(self.trip(pt_de(1), fs, C_PIEGE),
                                self.t(": le point pour t = 1", fs, C_PIEGE)).arrange(RIGHT, buff=0.25),
                         -2.65, xmax=1.6)
        self.play(FadeIn(l4, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("Un point n'est jamais une direction")
        chute = self.gauche(self.t("un point n'est jamais une direction", 32, C_REGARD),
                            -3.25, xmax=1.6)
        self.play(FadeIn(chute, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 05 : tester un point ───────────────────────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        self.au_mot("Appliquons")
        titre = self.t("Tester un point", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        r, ax = self.repere(o=(-5.0, -2.3), u=0.42, portee=6)
        dr = r.droite(A_D, U_D, -0.3, 2.3, nom="d", couleur=C_DROITE, sw=5, decal=UR)
        self.sans_audit(dr)
        self.play(Create(ax), Create(dr), run_time=0.8)
        b = pt_de(2)
        pb = self.sans_audit(r.point(*b, "B", couleur=C_REGARD, decal=UL))
        self.au_mot("Le point B de coordonnées")
        self.play(FadeIn(pb, scale=1.3), run_time=0.45)
        self.au_fin("5, 0, 6")
        lB = self.ligne(self.t("B", 34, C_REGARD), self.trip(b, 34), y=2.5)
        self.play(FadeIn(lB, shift=RIGHT * 0.12), run_time=0.45)

        fs = 32
        self.au_mot("On commence par la première ligne")
        prem = self.col(self.t("la première ligne :", 28, GREY_A), 1.65)
        self.play(FadeIn(prem, shift=RIGHT * 0.12), run_time=0.4)
        self.au_fin("1 plus 2 t égale 5")
        eq1 = self.col(self.t("1 + 2t = 5", fs + 2, WHITE), 1.05)
        self.play(FadeIn(eq1, scale=1.1), run_time=0.45)
        self.au_fin("donc t vaut 2")
        tv = self.col(self.t("donc t = 2", fs + 2, VERT_OK), 0.40)
        self.play(FadeIn(tv, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("et seulement avec celui-là")
        seul = self.col(VGroup(self.t("avec ce t,", 26, C_REGARD),
                              self.t("et seulement celui-là", 26, C_REGARD))
                        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -0.35)
        self.play(FadeIn(seul, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("2 moins 2 fait 0")
        ly = self.ligne(self.t("y :  2 − 2 = 0", fs, WHITE), self.coche(VERT_OK, 0.14), y=-1.10)
        self.play(FadeIn(ly[0], shift=RIGHT * 0.12), run_time=0.4)
        self.play(Create(ly[1]), run_time=0.25)
        self.au_fin("3 fois 2 fait 6")
        lz = self.ligne(self.t("z :  3 × 2 = 6", fs, WHITE), self.coche(VERT_OK, 0.14), y=-1.70)
        self.play(FadeIn(lz[0], shift=RIGHT * 0.12), run_time=0.4)
        self.play(Create(lz[1]), run_time=0.25)
        # ⚠️ Bas de la colonne de droite : tout ce qui descend sous y = −1,95 doit rester
        # à moins de 3,1 de large, sinon col() le rétrécit pour protéger Ti-Margo (dont
        # la boîte est x ∈ [5,54 ; 6,66], y ∈ [−3,55 ; −2,15]).
        # ⛔ VU À LA PLANCHE : dans la colonne de droite, ces deux lignes descendaient
        # sous y = −1,95 à côté de Ti-Margo, et col() les rétrécissait pour le protéger —
        # la CONCLUSION de l'écran devenait son plus petit texte. Elle passe à gauche,
        # sous le repère (dont le point le plus bas est à y = −2,70), où elle tient en
        # grand : c'est elle qu'on doit lire en premier.
        self.au_mot("Les trois lignes sont d'accord")
        acc = self.gauche(self.t("les trois lignes sont d'accord", 28, GREY_A),
                          -2.65, xmax=1.6)
        self.play(FadeIn(acc, shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("B est bien sur la droite d")
        fin = self.gauche(self.t("B est bien sur la droite d", 36, VERT_OK), -3.20, xmax=1.6)
        self.play(FadeIn(fin, scale=1.12), Flash(pb[0], color=VERT_OK, line_length=0.25),
                  run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège — une infinité de systèmes ───────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà le piège")
        # ⛔ Le glyphe ⚠ ne se rend pas (carré « tofu ») : on DESSINE le triangle.
        bang = VGroup(Triangle(fill_color=C_PIEGE, fill_opacity=0.18, stroke_color=C_PIEGE,
                               stroke_width=4).scale(0.33),
                      Text("!", font_size=30, color=C_PIEGE, weight=BOLD).shift(DOWN * 0.05))
        titre = VGroup(bang, self.t("Une infinité de systèmes", 46, C_PIEGE))
        titre.arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
        self.play(Write(titre[1]), FadeIn(titre[0], scale=1.4), run_time=0.8)

        self.au_mot("Une même droite a une infinité")
        avant = self.gauche(self.t("tout à l'heure :", 26, GREY_A), 2.15, xmax=0.4)
        # ⚠️ sans_audit : RAPPEL du système de l'écran 02, que la voix de ce clip désigne
        # par « le système de tout à l'heure » sans en redire un nombre. Même raison
        # qu'à l'écran 03, et sans ça l'audit signale un AUDIT-AVANCE de 15,3 s.
        s1 = self.sans_audit(self.systeme_d(32, c_acc=GREY_B))
        self.gauche(s1, 1.05, xmax=0.4)
        self.play(FadeIn(avant), Create(s1.acc), *[FadeIn(e) for e in s1.eq], run_time=0.8)

        fs = 28
        self.au_mot("On peut partir d'un autre point")
        r1 = self.col(self.t("partir d'un autre point", fs, C_REGARD), 2.50)
        self.play(FadeIn(r1, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("multiplier le vecteur directeur")
        r2 = self.col(VGroup(self.t("multiplier le vecteur", fs, C_VECTEUR2),
                             self.t("directeur par un nombre", fs, C_VECTEUR2))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 1.75)
        self.play(FadeIn(r2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Regarde")
        reg = self.col(self.t("Regarde :", 30, JAUNE_TITRE), 0.85)
        self.play(FadeIn(reg, shift=RIGHT * 0.1), run_time=0.35)
        s2 = self.systeme([ligne_param(n, A2_D[i], U2_D[i], var="s") for i, n in enumerate("xyz")],
                          32, c_acc=C_DROITE)
        self.col(s2, -0.30)
        self.play(Create(s2.acc), run_time=0.3)
        for i, extrait in enumerate(("x égale 3 plus 4 s", "y égale 1 moins 2 s", "z égale 3 plus 6 s")):
            self.au_fin(extrait)
            self.play(FadeIn(s2.eq[i], shift=RIGHT * 0.12), run_time=0.35)

        # ⭐ L'ORDRE DE LA VOIX, ET PAS CELUI QUI VENAIT NATURELLEMENT. Le contrôle
        # d'avant-rendu a vu le défaut : la phrase « c'est pourtant la même droite d »
        # arrive à 23,3 s, donc AVANT la preuve (« le point 3, 1, 3 est sur d », 25,8 s).
        # Posée après, elle donnait un RETARD de 7,3 s, et aucun autre instrument ne le
        # dit — le dry run aurait été propre.
        # ⭐ La phrase « Cela ne ressemble pas… et c'est pourtant la même droite d »
        # tient entre les deux systèmes, d'un seul morceau (piège n° 28 des entiers).
        # ⚠️ La bande du milieu est étroite : le système de gauche s'arrête à x = −3,81
        # et celui de droite commence à x = 2,2 (mesuré hors rendu). D'où fs 24 pour la
        # première phrase et DEUX lignes pour la seconde.
        self.au_mot("Cela ne ressemble pas")
        cmp_fl = DoubleArrow(P(-3.45, 0.35), P(1.95, 0.35), buff=0, stroke_width=4,
                             color=C_PIEGE, max_tip_length_to_length_ratio=0.05)
        rien = self.t("cela ne ressemble pas du tout", 24, C_PIEGE).move_to(P(-0.75, 0.90))
        self.play(GrowFromCenter(cmp_fl), FadeIn(rien, shift=UP * 0.1), run_time=0.7)
        self.au_mot("c'est pourtant la même droite d")
        meme = VGroup(self.t("et pourtant,", 32, VERT_OK), self.t("la même droite d", 32, VERT_OK))
        meme.arrange(DOWN, buff=0.1).move_to(P(-0.75, -0.45))
        self.play(FadeIn(meme, scale=1.15), cmp_fl.animate.set_color(VERT_OK), run_time=0.7)

        # ⭐ La preuve, en UNE phrase et donc dans UN seul endroit : le point (3 ; 1 ; 3)
        # est sur d, et (4 ; −2 ; 6) est le double de (2 ; −1 ; 3).
        self.au_mot("Le point 3, 1, 3 est sur d")
        p1 = self.gauche(VGroup(self.trip(A2_D, 30, C_VECTEUR),
                                self.t("est sur d", 30, WHITE)).arrange(RIGHT, buff=0.25),
                         -1.50, xmax=0.4)
        self.play(FadeIn(p1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("le vecteur 4, moins 2, 6")
        # ⛔ VU À LA PLANCHE : sans parenthèses, « 4 ; −2 ; 6 = 2 × 2 ; −1 ; 3 » se lit
        # « 2 × 2 » et la ligne devient fausse. Les parenthèses viennent du socle.
        p2 = self.gauche(VGroup(self.trip(U2_D, 30, C_VECTEUR2, par=True),
                                self.t("=", 30, GREY_A), self.t("2 ×", 30, WHITE),
                                self.trip(U_D, 30, C_VECTEUR2, par=True))
                         .arrange(RIGHT, buff=0.22), -2.25, xmax=0.4)
        self.play(FadeIn(p2[0], shift=RIGHT * 0.12), run_time=0.4)
        self.au_fin("le double de 2, moins 1, 3")
        self.play(FadeIn(p2[1:], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Deux systèmes différents")
        bil = self.col(VGroup(self.t("deux systèmes,", 26, C_REGARD),
                              self.t("une seule droite", 26, C_REGARD))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -2.55)
        self.play(FadeIn(bil, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 (bonne réponse : A) ───────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        self.au_mot("Question !")
        rap = self.gauche(self.t("la droite d :", 26, GREY_A), 2.55, xmax=0.4)
        # ⚠️ sans_audit : RAPPEL du système de d (écrans 02, 03 et 04). La voix de cette
        # question ne parle que du point C ; même raison qu'à l'écran 03.
        syst = self.sans_audit(self.systeme_d(38))
        self.gauche(syst, 1.20, xmax=0.4)
        # ⛔⛔ MESURÉ avant d'écrire (manim/poste2, mesure hors rendu) : à TROIS lignes de
        # question, trois cartes de choix longues descendent à y = −2,27 et la carte du
        # bas coupe la tête de Ti-Margo, dont la boîte commence à −2,15 (piège n° 33 des
        # entiers). À DEUX lignes, le bas des cartes remonte à −2,07 (remesuré APRÈS le
        # changement de notation ci-dessous : une question moins large est moins réduite
        # par col(), donc plus HAUTE, et les cartes descendent d'autant).
        # ⭐ Et les choix sont sur TROIS lignes, pas deux : « coordonnée ne suit pas »
        # seule fait 4,54 d'large, et une carte n'en tient que 2,95 — sur deux lignes le
        # texte tombait à 15 px, le défaut n° 4 de l'épisode 1. ⛔ Ne pas raccourcir le
        # texte : la voix le dit mot pour mot.
        # ⭐⭐ VU À LA PLANCHE : « Le point C de coordonnées » + le triplet sur une ligne
        # fait 7,25 d'large, et col() ramène TOUT le bloc à 4,4 — la question tombait à
        # 19 px, le plus petit texte de l'épisode. Écrit « C 7 ; −1 ; 10 », c'est 5,0 de
        # large, donc 28 px, et c'est la notation que cet épisode emploie déjà sur huit
        # autres écrans (« A 1 ; 2 ; 0 », « B 5 ; 0 ; 6 »). La voix lit cette notation à
        # voix haute : « le point C de coordonnées 7, moins 1, 10 ».
        ligne1 = VGroup(self.t("Le point C", 32), self.trip((7, -1, 10), 32))
        ligne1.arrange(RIGHT, buff=0.25)
        tete, q, cartes, pause, rebours = self.q_tete(
            [ligne1, "est-il sur la droite d ?"],
            [self.choix3("non, la troisième", "coordonnée", "ne suit pas"),
             self.choix2("oui, t égal à 3", "convient"),
             self.choix3("on ne peut pas", "le savoir avec", "un seul point")])
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.play(FadeIn(rap), Create(syst.acc), *[FadeIn(e) for e in syst.eq], run_time=0.7)
        self.au_mot("Le point C de coordonnées")
        self.play(FadeIn(q[0][0], shift=RIGHT * 0.1), run_time=0.4)
        self.au_fin("7, moins 1, 10")
        # ⭐ 0,20 s seulement séparent la fin du triplet (4,65 s) de « est-il sur la
        # droite » (4,85 s) : au lieu de forcer un au_mot que rien ne peut tenir, on
        # enchaîne — c'est le remède du piège n° 6 des entiers, « ne pas appeler au_mot
        # pour la ligne suivante, sa propre synchro la cale ».
        self.play(FadeIn(q[0][1], scale=1.15), run_time=0.2)
        self.play(FadeIn(q[1], shift=RIGHT * 0.1), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "A")
        self.mem_q2 = (syst, cartes, pause, rebours)

    def ecran_reponse2(self):
        syst, cartes, pause, rebours = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 0, pause, rebours)
        fs = 30
        self.au_fin("1 plus 2 t égale 7")
        l1 = self.gauche(VGroup(self.t("1 + 2t = 7,", fs, WHITE),
                                self.t("donc t = 3", fs, VERT_OK)).arrange(RIGHT, buff=0.3),
                         -0.40, xmax=1.6)
        self.play(FadeIn(l1[0], shift=RIGHT * 0.12), run_time=0.4)
        self.au_fin("donc t vaut 3")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.12), run_time=0.4)
        self.au_fin("2 moins 3 fait bien moins 1")
        ly = self.gauche(VGroup(self.t("y :  2 − 3 = −1", fs, WHITE), self.coche(VERT_OK, 0.14))
                         .arrange(RIGHT, buff=0.22), -1.05, xmax=1.6)
        self.play(FadeIn(ly[0], shift=RIGHT * 0.12), run_time=0.4)
        self.play(Create(ly[1]), run_time=0.25)
        # ⭐ Découpée en TROIS morceaux, parce que la voix met 4 s à les dire : « la
        # troisième donne 3 fois 3 » (11,8 s), « c'est-à-dire 9 » (13,6 s), « et on nous
        # propose 10 » (15,1 s). D'un bloc, le « 9 » paraissait 1,8 s avant d'être dit.
        self.au_fin("3 fois 3")
        lz = self.gauche(VGroup(self.t("z :  3 × 3", fs, C_PIEGE),
                                self.t("= 9,", fs, C_PIEGE),
                                self.t("et on nous propose 10", fs, C_PIEGE),
                                self.croix(r=0.13)).arrange(RIGHT, buff=0.26),
                         -1.70, xmax=1.6)
        self.play(FadeIn(lz[0], shift=RIGHT * 0.12), run_time=0.4)
        self.au_fin("c'est-à-dire 9")
        self.play(FadeIn(lz[1], shift=RIGHT * 0.12), run_time=0.35)
        self.au_fin("et on nous propose 10")
        self.play(FadeIn(lz[2], shift=RIGHT * 0.12), Create(lz[3]), run_time=0.45)
        self.au_mot("Deux lignes sur trois")
        deux = self.gauche(VGroup(self.t("deux lignes sur trois,", fs, WHITE),
                                  self.t("cela ne compte pas", fs, WHITE))
                           .arrange(DOWN, aligned_edge=LEFT, buff=0.12), -2.50, xmax=1.6)
        self.play(FadeIn(deux, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("C n'est pas sur d")
        pas = self.gauche(self.t("C n'est pas sur d", 34, C_PIEGE), -3.25, xmax=1.6)
        self.play(FadeIn(pas, scale=1.12), run_time=0.5)
        self.au_mot("Et c'est exactement le piège")
        # ⛔ VU À LA PLANCHE : posé à −2,25 ce bloc s'écrivait SUR la carte C. Les cartes
        # de cet écran descendent à y = −2,07 (remesuré : la question a changé de
        # largeur, donc de hauteur — le bas des cartes avec). À −2,55 il passe dessous,
        # et il reste à moins de 3,1 de large, à l'écart de Ti-Margo (x ≥ 5,54).
        pge = self.col(VGroup(self.t("le piège de", 26, C_PIEGE),
                              self.t("la réponse B", 26, C_PIEGE))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -2.55)
        self.play(FadeIn(pge, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 08 : les deux rédactions du bac ────────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.au_mot("Au bac, deux rédactions")
        titre = self.t("Au bac : deux rédactions", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        fs = 28

        self.au_mot("Pour donner la droite")
        h1 = self.gauche(VGroup(self.pastille(1), self.t("Pour donner la droite", 32, C_REGARD))
                         .arrange(RIGHT, buff=0.25), 2.20, xmax=0.4)
        self.play(FadeIn(h1, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("d passe par le point A")
        g1 = self.gauche(self.t("d passe par le point A", fs, WHITE), 1.60, xmax=0.4)
        self.play(FadeIn(g1, shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("et a pour vecteur directeur u")
        g2 = self.gauche(self.t("et a pour vecteur directeur u,", fs, WHITE), 1.10, xmax=0.4)
        self.play(FadeIn(g2, shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("une représentation paramétrique de d est")
        g3 = self.gauche(VGroup(self.t("donc une représentation", fs, WHITE),
                                self.t("paramétrique de d est :", fs, WHITE))
                         .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 0.35, xmax=0.4)
        self.play(FadeIn(g3, shift=RIGHT * 0.12), run_time=0.5)
        # ⭐⭐ LE GABARIT, PAS LE SYSTÈME DE d. La voix de cet écran dit « on écrit les
        # trois lignes » et ne prononce AUCUN nombre : y écrire « 1 + 2t » donnerait trois
        # AUDIT-ABSENT légitimes, et montrerait à l'élève des nombres qu'il n'entend pas.
        # Trois lignes vides avec leur accolade disent exactement ce que la voix dit.
        self.au_mot("on écrit les trois lignes")
        gab = VGroup()
        for nom in ("x =", "y =", "z ="):
            gab.add(VGroup(self.t(nom, 30, WHITE),
                           Line(P(0, 0), P(1.7, 0), stroke_width=3, color=C_FANTOME))
                    .arrange(RIGHT, buff=0.22))
        gab.arrange(DOWN, aligned_edge=LEFT, buff=0.26)
        acc = Brace(gab, LEFT, buff=0.12, color=C_DROITE)
        gabarit = VGroup(acc, gab)
        self.gauche(gabarit, -1.25, xmax=0.4)
        self.play(Create(acc), run_time=0.3)
        self.play(*[FadeIn(l, shift=RIGHT * 0.1) for l in gab], run_time=0.6)
        self.au_mot("en précisant que t est réel")
        treel = self.gauche(self.t("avec t réel", 26, GREY_A), -2.45, xmax=0.4)
        self.play(FadeIn(treel, shift=UP * 0.1), run_time=0.4)

        self.au_mot("Pour tester un point")
        h2 = self.col(VGroup(self.pastille(2),
                             VGroup(self.t("Pour tester", 32, C_REGARD),
                                    self.t("un point", 32, C_REGARD))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.25, aligned_edge=UP), 1.95)
        self.play(FadeIn(h2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("la première équation donne t égale tant")
        d1 = self.col(VGroup(self.t("la première équation", fs, WHITE),
                             self.t("donne t égale tant,", fs, WHITE))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 0.85)
        self.play(FadeIn(d1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("et pour cette valeur")
        d2 = self.col(self.t("et pour cette valeur", fs, WHITE), -0.05)
        self.play(FadeIn(d2, shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("les deux autres équations sont vérifiées")
        d3 = self.col(VGroup(self.t("les deux autres équations", fs, VERT_OK),
                             self.t("sont vérifiées", fs, VERT_OK))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.1), -0.85)
        self.play(FadeIn(d3, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("ou ne le sont pas")
        d4 = self.col(self.t("ou ne le sont pas", fs, C_PIEGE), -1.70)
        self.play(FadeIn(d4, shift=RIGHT * 0.12), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi ───────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        self.au_mot("À toi de jouer")
        tete = VGroup(pastille_pause(0.38), self.t("À toi de jouer !", 42, ORANGE_RETENUE))
        tete.arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.5)
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.5)
        # ⛔ VU AU GROS PLAN : à u = 0,52 et portée 4, la figure était minuscule et
        # l'étiquette de l'axe des y tombait SUR le point A — en cavalière, A(2 ; 0 ; 1)
        # se projette à 0,39 unité du bout de cet axe, et l'écart grandit avec la portée.
        # Mesuré à u = 0,8 et portée 5 : 0,57 entre le point et l'étiquette, 0,74 entre
        # les deux textes. Et le repère laisse libre la bande y ≤ −2,5 à gauche, où la
        # correction écrira ses deux conclusions.
        r, ax = self.repere(o=(-5.4, -1.1), u=0.8, portee=5)
        self.play(Create(ax), run_time=0.4)
        # ⛔ On place A et B, PAS le vecteur A B ni la droite : ils donneraient la réponse.
        # ⚠️ decal DR pour A : en cavalière, un point du plan x O z se projette tout près
        # du bout de l'axe des y — à relire sur la planche.
        # ⚠️ B(2 ; 3 ; −1) se projette à 0,11 de l'axe des x (−1 + 3 × 0,287 ≈ −0,14) :
        # c'est la géométrie, pas un défaut de pose. Son point est grossi et il garde sa
        # couleur rose, qui le sépare du gris des axes.
        pa = self.sans_audit(r.point(*A_DEFI, "A", couleur=C_REGARD, decal=DR, r=0.095))
        pb = self.sans_audit(r.point(*B_DEFI, "B", couleur=C_VECTEUR2, decal=DR, r=0.095))
        self.au_mot("A a pour coordonnées")
        self.play(FadeIn(pa, scale=1.3), run_time=0.4)
        self.au_fin("2, 0, 1")
        lA = self.ligne(self.t("A", 34, C_REGARD), self.trip(A_DEFI, 34), y=2.40)
        # ⭐ 0,35 s jusqu'à « et B a pour coordonnées » : on enchaîne sans au_mot, même
        # remède qu'à l'écran 07.
        self.play(FadeIn(lA, shift=RIGHT * 0.12), run_time=0.3)
        self.play(FadeIn(pb, scale=1.3), run_time=0.35)
        self.au_fin("2, 3, moins 1")
        lB = self.ligne(self.t("B", 34, C_VECTEUR2), self.trip(B_DEFI, 34), y=1.70)
        self.play(FadeIn(lB, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("Écris une représentation paramétrique")
        cons = self.col(VGroup(self.t("écris une représentation", 30, WHITE),
                               self.t("paramétrique de la droite", 30, WHITE),
                               self.t("A B", 30, ORANGE_RETENUE))
                        .arrange(DOWN, aligned_edge=LEFT, buff=0.12), 0.55)
        self.play(FadeIn(cons, shift=RIGHT * 0.1), run_time=0.6)
        self.au_mot("Mets pause, et cherche")
        pause = self.col(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), -0.95)
        rebours = self.rebours_sous(pause)
        self.play(FadeIn(pause, scale=0.85), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.mem_defi = (r, cons, pause, rebours, pa, pb)

    def ecran_correction(self):
        r, cons, pause, rebours, pa, pb = self.mem_defi
        # ⛔⛔ VU SEULEMENT À LA PLANCHE, et c'est le défaut grave de ce rendu : seuls la
        # consigne et la pause s'effaçaient. Les deux lignes de DONNÉES du défi (A 2;0;1
        # et B 2;3;−1) restaient en haut de la colonne — et toute la correction s'est
        # écrite PAR-DESSUS, trois textes empilés au même endroit. Aucun outil ne le dit :
        # rien ne sort du cadre, chaque nombre est dit par la voix à son instant.
        # ⭐ Elles ne s'effacent pas pour autant : ce sont les données de l'exercice, et
        # l'élève en a besoin pendant la correction. C'est la correction qui descend.
        self.play(FadeOut(cons), FadeOut(pause), FadeOut(rebours), run_time=0.3)
        self.dire("09b-correction")
        fs = 30
        self.au_mot("D'abord le vecteur directeur")
        self.play(Flash(pa[0], color=C_REGARD, line_length=0.22),
                  Flash(pb[0], color=C_VECTEUR2, line_length=0.22), run_time=0.6)
        self.au_mot("le vecteur A B, c'est arrivée moins départ")
        vab = r.vecteur(A_DEFI, B_DEFI, None, couleur=VERT_OK, sw=7)
        self.play(GrowArrow(vab[0]), run_time=0.6)
        self.au_fin("donc 0, 3, moins 2")
        lab = self.ligne(self.t("A B", 34, VERT_OK), self.trip(AB_DEFI, 34, VERT_OK), y=0.95)
        self.play(FadeIn(lab, scale=1.12), run_time=0.5)
        self.au_mot("Ensuite on part du point A")
        part = self.col(self.t("on part de A", fs, C_REGARD), 0.25)
        self.play(FadeIn(part, shift=RIGHT * 0.12), Flash(pa[0], color=C_REGARD, line_length=0.2),
                  run_time=0.5)
        syst = self.systeme([ligne_param(n, A_DEFI[i], AB_DEFI[i]) for i, n in enumerate("xyz")],
                            34, c_acc=C_DROITE)
        self.col(syst, -0.90)
        self.au_mot("On obtient")
        self.play(Create(syst.acc), run_time=0.3)
        for i, extrait in enumerate(("x égale 2", "y égale 3 t", "z égale 1 moins 2 t")):
            self.au_fin(extrait)
            self.play(FadeIn(syst.eq[i], shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("avec t réel")
        treel = self.col(self.t("avec t réel", 26, GREY_A), -2.05)
        self.play(FadeIn(treel), run_time=0.35)

        self.au_mot("Et regarde la première ligne")
        # ⛔ Pas de nom sur la droite : son étiquette tombait soit sur le « B », soit sur
        # l'axe des x. Le système, juste à côté, la nomme déjà.
        dab = r.droite(A_DEFI, AB_DEFI, -0.4, 1.2, couleur=C_DROITE, sw=4)
        self.sans_audit(dab)
        self.play(Create(dab), run_time=0.6)
        # ⭐ Les deux conclusions vont à GAUCHE, sous le repère : la colonne de droite
        # est prise du haut (les données) jusqu'à « avec t réel ».
        self.au_mot("2 quel que soit t")
        cst = self.gauche(self.t("x vaut 2 quel que soit t", 28, C_REGARD), -2.75, xmax=0.4)
        self.play(FadeIn(cst, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("Toute la droite reste donc")
        # ⭐ Le plan x = 2, TEINTÉ : un plan qui n'est qu'un quadrilatère tracé se lit
        # comme un cadre posé dans le vide (espace3d.plan).
        plan = r.plan((1, 0, 0), d=-A_DEFI[0], centre=(2, 1.5, 0), demi=1.6,
                      couleur=C_PLAN, op=0.22)
        self.play(FadeIn(plan[0]), run_time=0.7)
        # ⛔ VU À LA PLANCHE : `plan(nom=…)` pose l'étiquette au coin le plus à DROITE,
        # et ici ce coin est en BAS — « x = 2 » se lisait collé au « B » et à l'étiquette
        # de l'axe des x. On la pose nous-mêmes au coin le plus HAUT, qui est libre.
        haut = max(plan.coins, key=lambda k: float(r.pt(*k)[1]))
        nom_plan = self.t(f"x = {A_DEFI[0]}", 28, C_PLAN).move_to(r.pt(*haut) + UR * 0.34)
        self.au_fin("dans le plan d'équation x égale 2")
        self.play(FadeIn(nom_plan, scale=1.2), run_time=0.4)
        reste = self.gauche(self.t("toute la droite reste dans ce plan", 28, VERT_OK),
                            -3.22, xmax=0.4)
        self.play(FadeIn(reste, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(tit), run_time=0.7)
        fs = 36
        faits = (
            (("une droite,", WHITE), ("un point plus une direction", C_REGARD),
             "Une droite, c'est un point plus une direction"),
            (("les coefficients de t,", C_VECTEUR2), ("le vecteur directeur", WHITE),
             "Les coefficients de t donnent"),
            (("les nombres seuls,", WHITE), ("un point", C_VECTEUR),
             "les nombres seuls donnent un point"),
            (("un seul et même t", VERT_OK), ("pour les trois coordonnées", WHITE),
             "il faut un seul et même t"),
        )
        blocs = []
        for (g, cg), (d, cd), _ in faits:
            blocs.append(VGroup(self.t(g, fs, cg), self.t(d, fs, cd)).arrange(RIGHT, buff=0.22))
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                          for b in blocs])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        # ⚠️ 10,6 de large et centré en x = −0,75 : le bloc s'arrête à x = 4,55, donc à
        # l'écart de Ti-Margo à scale 0,65 (sa boîte commence à x = 5,30).
        if lignes.width > 10.6:
            lignes.scale_to_fit_width(10.6)
        lignes.move_to(P(-0.75, 0.15))
        for i, (_, _, extrait) in enumerate(faits):
            self.au_mot(extrait)
            self.play(Create(lignes[i][0]), FadeIn(blocs[i][0], shift=RIGHT * 0.2), run_time=0.45)
            self.play(FadeIn(blocs[i][1], shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.8)

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question1()
        self.ecran_reponse1()
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_reponse2()
        self.ecran_rediger()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.page_abonnement()


class EspaceDroiteParametriqueTerminale(EspaceDroiteParametriqueBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
