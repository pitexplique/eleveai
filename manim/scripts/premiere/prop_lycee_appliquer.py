# prop_lycee_appliquer.py
# EleveAI — Maths 1re (automatismes) ET STMG — série « Proportionnalité »,
# LYCÉE, épisode COMMUN 03 : APPLIQUER UN POURCENTAGE (micro du coach :
# auto_prop_appliquer, notion auto_proportion, en 1re et en STMG), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE (automatisme) pour les deux classes ; seules
# l'identité (« Maths 1re — EleveAI » / « Maths STMG — EleveAI ») et la garde
# changent. Short jumeau : prop_lycee_appliquer_short.py (blanche).
# ⭐ Méthode travaillée : prendre t % d'une quantité = la multiplier par t %
# écrit en décimal (60 % = 0,6) ; deux autres chemins vers le même résultat :
# ÷ 100 puis × 60 ; 60 % = 3 sur 5 → ÷ 5 puis × 3. Sous 100 %, le résultat
# est plus petit que la quantité de départ. « × » et « ÷ » écrits, virgule.
# ⭐ Le dessin qui porte tout : une SILHOUETTE remplie d'eau jusqu'à 60 % ;
# les trois méthodes côte à côte (trois cartes, chacune arrive à 42 kg) ; au
# piège, 420 kg barré en rouge à côté de la silhouette de 70 kg ; les barres
# de 100 % (BarreCent de l'épisode 4e 34) aux questions et à la correction.
# ⭐ Leurres (les erreurs dites par la voix) : question 1 B = 65 kg (soustraire
# 15 à 80), C = 5,3 kg (diviser 80 par 15) ; piège : 60 % pris pour 6 (420 kg)
# ou 0,06 ; question 2 B = 42 kg (7 % pris pour 0,7), C = 0,42 kg (0,007).
#
# Décor et métier : CORPS-SANTÉ, Clara, INFIRMIÈRE (blouse, croix, stéthoscope) :
# un patient de 70 kg ; une patiente de 60 kg ; le défi : un patient de 80 kg.
# Centre d'intérêt : corps-sante.
# Sources (ordres de grandeur de physiologie, dits « environ », prompt lycée
# du 02/11/2026) : l'eau ≈ 60 % de la masse d'un adulte ; le sang ≈ 7 % de la
# masse du corps.
#
# Écrans : 00 garde · 01 Clara, 60 % d'eau, 70 kg · 02-03-04 les trois méthodes
# côte à côte (÷ 100 × 60 ; × 0,6 ; ÷ 5 × 3 → 42 kg) · 05 QUESTION 1 (15 % de
# 80 kg) · 06 le piège (420 kg barré) · 07 QUESTION 2 (sang, 7 % de 60 kg) ·
# 08 défi (80 kg : eau et sang) · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/lycee-prop-appliquer.json (validée par Frédéric le 02/11,
# débit −10, ne cite aucune classe), WAV dans public/sons/lycee-prop-appliquer/ ;
# marques : manim/scripts/premiere/prop_lycee_appliquer_marques.json
# (scripts/marques_dump.ps1 puis cues2marques_gap.py, seuil 0,5 s).
# Outils (non modifiés) : prop_commun.py, canvas_proportion.py, la base
# PropPourcentageCoefficientBase de l'épisode 4e 35 (BarreCent, lc, jouer,
# montre, barrer, barrer_choix, accolade, cadre, ligne_rep bornée). Ajouté
# ICI : clara(), Silhouette (contour + eau), goutte(), frac_pile(), carte().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_appliquer.py PropLyceeAppliquerPremiere
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/premiere/prop_lycee_appliquer.py PropLyceeAppliquerPremiere -o eleveai-maths-premiere-prop-appliquer --media_dir manim/scripts/premiere/media-prop-lycee-appliquer
# Garde STMG seule : GARDE_SEULE=1 python -m manim render -qh --disable_caching manim/scripts/premiere/prop_lycee_appliquer.py PropLyceeAppliquerStmg -o garde-stmg-prop-appliquer --media_dir manim/scripts/premiere/media-prop-lycee-appliquer
# python manim/scripts/cm1/frac_cm_commun.py coller <1re.mp4> <garde-stmg.mp4> <stmg.mp4>
# Sorties : manim/sorties/premiere/maths/proportionnalite/03-appliquer/eleveai-maths-premiere-prop-appliquer.mp4
#           manim/sorties/stmg/maths/proportionnalite/03-appliquer/eleveai-maths-stmg-prop-appliquer.mp4

import importlib.util
import os
import sys
from pathlib import Path

_ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_p35 = _charger("prop_pourcentage_coefficient_4e", _ICI.parents[0] / "4e" / "prop_pourcentage_coefficient.py")
from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, personne, P…)

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

PropPourcentageCoefficientBase = _p35.PropPourcentageCoefficientBase
BarreCent, gras, sans = _p35.BarreCent, _p35.gras, _p35.sans

EAU = "#38bdf8"        # l'eau (bleu)
SANG = "#dc2626"       # le sang (rouge)
CONTOUR = "#e2e8f0"    # le contour de la silhouette
TENUE_C = "#0d9488"    # la tunique de Clara (vert soin)


def pas_audit(m):
    """Décor ou donnée redite : sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def clara(s=1.0):
    """Clara, infirmière : tunique vert soin, croix sur la poitrine, stéthoscope."""
    p = personne(peau="#e0ac69", tenue=TENUE_C, cheveux="#78350f", longs=True)
    c = p.corps.get_center() + P(-0.22, 0.25)
    croix = VGroup(Rectangle(width=0.3, height=0.1, fill_color=WHITE, fill_opacity=1, stroke_width=0),
                   Rectangle(width=0.1, height=0.3, fill_color=WHITE, fill_opacity=1, stroke_width=0)).move_to(c)
    t = p.tete.get_bottom()
    steto = VGroup(ArcBetweenPoints(t + P(-0.3, -0.05), t + P(0.3, -0.05), angle=PI * 0.9, color="#111827",
                                    stroke_width=6),
                   Line(t + P(0.3, -0.05), t + P(0.35, -0.7), color="#111827", stroke_width=6),
                   Circle(radius=0.1, fill_color="#9ca3af", fill_opacity=1, stroke_color="#111827",
                          stroke_width=4).move_to(t + P(0.35, -0.8)))
    p.add(croix, steto)
    return p.scale(s)


class Silhouette(VGroup):
    """Une silhouette humaine (contour clair) ; .eau(k) → la forme remplie d'eau
    jusqu'à k (0 à 1) de sa hauteur (Intersection) ; .niveau(k) → l'ordonnée.
    Rien n'est ajouté à la scène."""

    def __init__(self, h=3.6, centre=ORIGIN, couleur=CONTOUR, **kw):
        super().__init__(**kw)
        k = h / 3.9
        formes = [Circle(radius=0.36),
                  RoundedRectangle(width=0.22, height=0.3, corner_radius=0.05).move_to(P(0, -0.42)),
                  RoundedRectangle(width=1.1, height=1.55, corner_radius=0.3).move_to(P(0, -1.2)),
                  RoundedRectangle(width=0.26, height=1.45, corner_radius=0.12).rotate(0.12).move_to(P(-0.7, -1.3)),
                  RoundedRectangle(width=0.26, height=1.45, corner_radius=0.12).rotate(-0.12).move_to(P(0.7, -1.3)),
                  RoundedRectangle(width=0.4, height=1.75, corner_radius=0.15).move_to(P(-0.27, -2.6)),
                  RoundedRectangle(width=0.4, height=1.75, corner_radius=0.15).move_to(P(0.27, -2.6))]
        u = formes[0]
        for f in formes[1:]:
            u = Union(u, f)
        u.set_fill("#0f172a", 1).set_stroke(couleur, 5)
        u.scale(k).move_to(centre)
        self.forme = u
        self.add(u)

    def niveau(self, k):
        return self.forme.get_bottom()[1] + k * self.forme.height

    def eau(self, k, couleur=EAU):
        b = self.forme.get_bottom()[1]
        r = Rectangle(width=self.forme.width + 0.4, height=max(1e-3, k * self.forme.height + 0.01))
        r.move_to(P(self.forme.get_x(), b + k * self.forme.height / 2 - 0.005))
        return Intersection(self.forme, r, fill_color=couleur, fill_opacity=1, stroke_width=0)

    def remplir(self, scene, k, couleur=EAU, rt=1.0):
        """Anime la montée de l'eau jusqu'à k ; renvoie la forme d'eau finale (ajoutée)."""
        v = ValueTracker(0.02)
        e = always_redraw(lambda: self.eau(v.get_value(), couleur))
        scene.add(e)
        scene.play(v.animate.set_value(k), run_time=rt, rate_func=smooth)
        e.clear_updaters()
        return e


def goutte(s=1.0, couleur=SANG):
    """Une goutte (de sang)."""
    d = Circle(radius=0.4, fill_color=couleur, fill_opacity=1, stroke_width=0)
    pointe = Polygon(P(-0.35, 0.2), P(0.35, 0.2), P(0, 0.85), fill_color=couleur, fill_opacity=1, stroke_width=0)
    reflet = Ellipse(width=0.12, height=0.22, fill_color=WHITE, fill_opacity=0.7, stroke_width=0).move_to(P(-0.17, 0.05))
    return VGroup(pointe, d, reflet).scale(s)


def frac_pile(n, d, fs=40, couleur=WHITE):
    """Une fraction en pile : n au-dessus du trait, d dessous (Text)."""
    tn, td = gras(n, fs, couleur), gras(d, fs, couleur)
    tr = Line(LEFT, RIGHT, color=couleur, stroke_width=4).set_width(max(tn.width, td.width) + 0.15)
    return VGroup(tn, tr, td).arrange(DOWN, buff=0.08)


class PropLyceeAppliquerBase(PropPourcentageCoefficientBase):
    nom_voix = "lycee-prop-appliquer"
    fichier_marques = "prop_lycee_appliquer_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
    XB = -2.7
    XC = 1.3
    CX = (-4.55, -0.35, 3.85)              # les centres des trois cartes « méthode »
    RY = (2.1, 1.3, 0.45, -0.4, -1.25)     # les rangées d'une carte (titre, 1 à 4)

    # ── les outils de l'épisode ─────────────────────────────────────────────
    @staticmethod
    def part_barre(b, k, couleur=EAU):
        """La partie de la barre qui vaut k morceaux de 10 % (k décimal : 1,5 ; 0,7)."""
        return Rectangle(width=b.lm * k, height=b.hh, stroke_width=0, fill_color=couleur,
                         fill_opacity=1).align_to(b.morceaux[0], LEFT).set_y(b.morceaux[0].get_y())

    def source(self, lignes):
        """La source, discrète, en bas à gauche (lue, jamais dite)."""
        s = VGroup(*[Text(x, font_size=16, color=GREY_B) for x in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        return pas_audit(s).to_corner(DL, buff=0.45)

    def carte(self, i, titre, couleur):
        """La carte de la méthode i (cadre + titre), non jouée."""
        cadre = RoundedRectangle(width=3.95, height=4.4, corner_radius=0.18, fill_color="#0f172a", fill_opacity=0.85,
                                 stroke_color=couleur, stroke_width=4).move_to(P(self.CX[i], 0.32))
        t = pas_audit(gras(titre, 32, couleur)).move_to(P(self.CX[i], self.RY[0]))  # posé au mot « Première »…
        return cadre, t

    def rang(self, i, r, morceaux, fs=36):
        """Une ligne de morceaux (texte, couleur) ou d'objets, centrée dans la carte i, rangée r."""
        items = [gras(m, fs, c) if isinstance(m, str) else m for m, c in morceaux]
        lg = VGroup(*items).arrange(RIGHT, buff=0.18)
        if lg.width > 3.6:
            lg.scale_to_fit_width(3.6)
        return lg.move_to(P(self.CX[i], self.RY[r]))

    def _disposer_q(self, question, choix, phrase):
        """Une question de deux lignes : écrite plus grande (× 1,2), les cartes suivent."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if len(question) <= 2:
            g, h = q.get_left()[0], q.get_top()[1]
            q.scale(1.2).align_to(P(g, 0), LEFT).align_to(P(0, h), UP)
            d = cartes.get_top()[1] - (q.get_bottom()[1] - 0.25)
            if d > 0:
                for m in (cartes, pause, ph):
                    m.shift(DOWN * d)
        # ⭐ 03/11 (défauts) : la phrase de réponse en 34 à GAUCHE, sous la figure
        # (à droite, sous les cartes et contre Ti-Margo, elle tombait à ~25).
        ph2 = VGroup(*[self.t(x, 34, VERT_OK) for x in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        if ph2.width > 6.6:
            ph2.scale_to_fit_width(6.6)
        ph2.align_to(P(-6.15, 0), LEFT).align_to(P(0, self.Y_PH), UP)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    Y_PH = -0.85   # le haut de la phrase de réponse (à gauche, sous la figure)

    def ligne_rep(self, i, morceaux, fs=34):
        ref = self.ph_q[i]
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=0.14)
        if lg.width > 6.6:
            lg.scale_to_fit_width(6.6)
        return lg.move_to(ref).align_to(ref, LEFT)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Appliquer un pourcentage", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Appliquer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        si = Silhouette(2.9, centre=P(-3.6, -0.05))
        self.play(FadeIn(si, shift=UP * 0.2), run_time=0.5)
        q = self.lc([("Combien font", WHITE), ("60 %", EAU)], 0.45, fs=42, xl=-1.6)
        q2 = self.lc([("d'une quantité ?", WHITE)], -0.35, fs=42, xl=-1.6)
        self.jouer(q, ["Combien font", "60 %"])
        si.remplir(self, 0.6, rt=0.8)
        self.jouer(q2, ["d'une quantité"])
        self.play(Circumscribe(q[1], color=AMBRE, buff=0.1), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Clara, infirmière ; 60 % d'eau ; un patient de 70 kg ──────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = clara(1.0).move_to(P(-5.6, -0.5))
        nom = self.t("Clara", 40, EAU).next_to(pers, UP, buff=0.3)
        self.montre("Voici Clara", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("infirmière", 30, EAU).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.4 - met.get_left()[0]))
        self.montre("infirmière", FadeIn(met, shift=DOWN * 0.1), rt=0.4)
        si = Silhouette(4.6, centre=P(-1.75, -0.1))
        xl = 1.1
        L1 = self.lc([("Le corps d'un adulte :", WHITE)], 2.6, fs=38, xl=xl)
        self.jouer(L1, ["Le corps"], {0: [FadeIn(si, shift=UP * 0.2)]})
        L2 = self.lc([("≈ 60 %", EAU), ("d'eau", EAU)], 1.85, fs=44, xl=xl)
        y6 = si.niveau(0.6)
        niv = DashedLine(P(-2.95, y6), P(-0.6, y6), color=EAU, stroke_width=4)
        t6 = pas_audit(gras("60 %", 28, EAU)).next_to(niv, RIGHT, buff=0.1)
        self.au_mot("environ 60")
        v = ValueTracker(0.02)
        eau = always_redraw(lambda: si.eau(v.get_value()))
        self.add(eau)
        self.play(FadeIn(L2[0], scale=1.3), v.animate.set_value(0.6), run_time=0.9)
        eau.clear_updaters()
        self.add(si.forme.copy().set_fill(opacity=0))
        self.au_mot("d'eau. Son")
        self.play(FadeIn(L2[1], shift=RIGHT * 0.2), Create(niv), FadeIn(t6), run_time=0.4)
        L3 = self.lc([("Patient :", WHITE), ("70 kg", JAUNE_TITRE)], 0.8, fs=44, xl=xl)
        a70 = Brace(si.forme, LEFT, buff=0.12, color=JAUNE_TITRE)
        t70 = gras("70 kg", 30, JAUNE_TITRE).next_to(a70, LEFT, buff=0.08)
        self.jouer(L3, ["Son patient", "70 kilos"], {1: [GrowFromCenter(a70), FadeIn(t70, scale=1.3)]})
        L4 = self.lc([("Eau :", EAU), ("? kg", AMBRE)], -0.25, fs=48, xl=xl)
        self.jouer(L4, ["Combien de kilos", "d'eau dans"], {1: [Indicate(eau, color=AMBRE)]})
        self.insister(L4[1], 1.3, 0.2)
        src = self.source(["Source : ordres de grandeur de physiologie : eau ≈ 60 % de la masse",
                           "d'un adulte ; sang ≈ 7 % de la masse du corps."])
        self.play(FadeIn(src), run_time=0.4)
        self.attendre_voix()

    # ── 02-03-04 : les trois méthodes côte à côte (un seul écran, trois voix) ─
    def ecran_methode1(self):
        self.ecran("02-methode1")
        tit = sans(self.t("60 % de 70 kg : trois chemins", 42, JAUNE_TITRE)).move_to(P(-0.4, 3.1))
        cd, ct = self.carte(0, "Méthode 1", EAU)
        self.montre("Première", FadeIn(tit), FadeIn(cd), FadeIn(ct, shift=DOWN * 0.1), rt=0.45)
        r1 = self.rang(0, 1, [("60 % =", EAU), (frac_pile("60", "100", 34), WHITE)])
        self.jouer(r1, ["60 %, c'est", "60 sur"])
        r2 = self.rang(0, 2, [("÷ 100,", AMBRE), ("puis × 60", AMBRE)], fs=34)
        self.jouer(r2, ["On divise", "multiplie par"])
        r3 = self.rang(0, 3, [("70 ÷ 100", WHITE), ("= 0,7", WHITE)])
        self.jouer(r3, ["70 divisé", "égale 0,7"])
        r4 = self.rang(0, 4, [("0,7 × 60", WHITE), ("= 42 kg", VERT_OK)])
        self.jouer(r4, ["0,7 fois", "égale 42"])
        self.play(Create(self.cadre(r4[1])), run_time=0.3)
        self.res = [r4[1]]
        self.attendre_voix()

    def ecran_methode2(self):
        self.dire("03-methode2")  # même écran : les cartes restent
        cd, ct = self.carte(1, "Méthode 2", AMBRE)
        self.montre("Deuxième", FadeIn(cd), FadeIn(ct, shift=DOWN * 0.1), rt=0.45)
        tag = self.rang(1, 1, [("la plus rapide !", ORANGE_RETENUE)], fs=32)
        self.jouer(tag, ["la plus rapide"])
        r2 = self.rang(1, 2, [("60 % =", EAU), ("0,6", AMBRE)], fs=40)
        self.jouer(r2, ["60 %, c'est", "0,6. On"])
        self.insister(r2[1], 1.3, 0.2)
        r3 = self.rang(1, 3, [("0,6 × 70", WHITE)])
        self.jouer(r3, ["0,6 fois"])
        r4 = self.rang(1, 4, [("= 42 kg", VERT_OK)])
        self.jouer(r4, ["égale 42"])
        self.play(Create(self.cadre(r4[0])), run_time=0.3)
        self.res.append(r4[0])
        ban = VGroup(gras("60 %", 38, EAU), gras("d'une quantité :", 38, WHITE), gras("× 0,6", 44, AMBRE))
        ban.arrange(RIGHT, buff=0.22).move_to(P(-0.9, -2.6))
        self.jouer(ban, ["Prendre 60", "d'une quantité", "par 0,6"])
        cb = self.cadre(ban[2], AMBRE)
        self.play(Create(cb), run_time=0.3)
        self.ban = VGroup(ban, cb)
        self.attendre_voix()

    def ecran_methode3(self):
        self.dire("04-methode3")
        cd, ct = self.carte(2, "Méthode 3", VERT_OK)
        self.montre("Troisième", FadeIn(cd), FadeIn(ct, shift=DOWN * 0.1), FadeOut(self.ban), rt=0.45)
        r1 = self.rang(2, 1, [("60 % =", EAU), (frac_pile("3", "5", 34), WHITE)])
        cases = VGroup(*[Square(0.6, stroke_color=WHITE, stroke_width=3,
                                fill_color=EAU if i < 3 else "#1e293b", fill_opacity=1) for i in range(5)])
        cases.arrange(RIGHT, buff=0).move_to(P(self.CX[2], self.RY[2]))
        self.jouer(r1, ["60 %, c'est", "3 sur"], {1: [FadeIn(cases, shift=UP * 0.15)]})
        r3 = self.rang(2, 3, [("70 ÷ 5", WHITE), ("= 14", AMBRE)])
        q14 = pas_audit(VGroup(*[gras("14", 24, NUIT if i < 3 else WHITE).move_to(c) for i, c in enumerate(cases)]))
        self.jouer(r3, ["70 divisé", "égale 14"], {1: [FadeIn(q14, scale=1.3)]})
        r4 = self.rang(2, 4, [("14 × 3", WHITE), ("= 42 kg", VERT_OK)])
        self.jouer(r4, ["14 fois", "égale 42"], {0: [Indicate(VGroup(*cases[:3], *q14[:3]), color=VERT_OK)]})
        self.play(Create(self.cadre(r4[1])), run_time=0.3)
        self.res.append(r4[1])
        fin = gras("Trois chemins, un seul résultat !", 40, VERT_OK).move_to(P(-0.9, -2.6))
        self.montre("Trois chemins", FadeIn(fin, shift=UP * 0.15), rt=0.4)
        self.montre("un seul", *[Circumscribe(r, color=VERT_OK, buff=0.12) for r in self.res], rt=0.9)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (15 % de 80 kg → 12 kg) ─────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        si = pas_audit(Silhouette(2.6, centre=P(-4.6, 1.55)))

        def avant(sc):
            sc.play(FadeIn(si, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            b = BarreCent("", largeur=5.0, h=0.65, centre=P(-3.6, 0.55))
            p = sc.part_barre(b, 1.5, EAU)
            ap, tp = b.dessous(p, "12 kg", VERT_OK, fs=28)
            tp.align_to(b.bp.piste, LEFT)
            a8, t8 = sc.accolade(b.bp.piste, "80 kg", JAUNE_TITRE, fs=28)
            l0 = sc.ligne_rep(0, ["0,15 ×", "80 =", "12 kg."])
            l1 = sc.ligne_rep(1, ["B : 80 − 15 ;", "C : 80 ÷ 15."])
            sc.montre("0,15 fois", FadeOut(si), FadeIn(l0[0], shift=UP * 0.15), FadeIn(b, shift=UP * 0.2), rt=0.4)
            sc.montre("fois 80", FadeIn(l0[1], shift=UP * 0.15), GrowFromCenter(a8), FadeIn(t8), rt=0.35)
            sc.montre("égale 12", FadeIn(l0[2], scale=1.3), FadeIn(p), GrowFromCenter(ap), FadeIn(tp, scale=1.3),
                      rt=0.45)
            sc.montre("B soustrait", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.4)
            sc.montre("C divise", FadeIn(l1[1], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Combien font", "15 % de 80 kg ?"],
                            [self.t("12 kg", 36), self.t("65 kg", 36), self.t("5,3 kg", 36)], 0,
                            ["0,15 × 80 = 12 kg.", "B : 80 − 15 ; C : 80 ÷ 15."],
                            mot_q="Combien font", avant_q=avant, autres_r=apres)

    # ── 06 : le piège : 60 % = 0,6, pas 6 ni 0,06 ; 420 kg barré ───────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        si = Silhouette(3.6, centre=P(-4.9, -0.45))
        self.add(si, si.eau(0.6), si.forme.copy().set_fill(opacity=0))
        t70 = pas_audit(gras("70 kg", 34, JAUNE_TITRE)).next_to(si, DOWN, buff=0.15)
        self.play(FadeIn(t70), run_time=0.3)
        xl = 1.0
        L1 = self.lc([("60 % =", EAU), ("0,6", VERT_OK)], 2.15, fs=42, xl=xl)
        self.jouer(L1, ["60 %, c'est", "0,6, pas"])
        L2 = self.lc([("pas 6", ROUGE_ERREUR), ("ni 0,06", ROUGE_ERREUR)], 1.4, fs=40, xl=xl)
        self.jouer(L2, ["pas 6", "0,06"])
        L3 = self.lc([("6 × 70", ROUGE_ERREUR), ("= 420 kg", ROUGE_ERREUR)], 0.6, fs=42, xl=xl)
        gros = gras("420 kg", 64, ROUGE_ERREUR).move_to(P(-1.95, -0.2))
        self.jouer(L3, ["6 fois", "420 kilos"], {1: [FadeIn(gros, scale=1.6)]})
        L4 = self.lc([("plus que le patient !", ORANGE_RETENUE)], -0.15, fs=38, xl=xl)
        self.jouer(L4, ["plus que le"], {0: [Indicate(si, color=ROUGE_ERREUR)]})
        self.play(Create(self.barrer(gros)), Create(self.barrer(L3)), run_time=0.4)
        L5 = self.lc([("Sous 100 %, le résultat", VERT_OK)], -0.9, fs=34, xl=xl - 0.3)
        self.jouer(L5, ["sous 100"])
        L6 = self.lc([("est plus petit que", VERT_OK)], -1.42, fs=34, xl=xl - 0.3)
        self.jouer(L6, ["est plus petit"])
        L7 = self.lc([("la quantité de départ.", VERT_OK)], -1.94, fs=34, xl=xl - 0.3)
        self.jouer(L7, ["la quantité"])
        self.play(Create(SurroundingRectangle(VGroup(L5, L6, L7), color=VERT_OK, buff=0.15, corner_radius=0.12,
                                              stroke_width=4)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (le sang, 7 % de 60 kg → 4,2 kg) ───────────────────
    def ecran_question2(self):
        self.Y_PH = -1.1
        self.clear()
        self.add_mascotte()
        gt = pas_audit(goutte(1.3)).move_to(P(-4.4, 1.6))

        def avant(sc):
            sc.play(FadeIn(gt, scale=0.6), run_time=0.4)

        def apres(sc):
            b = BarreCent("", largeur=5.0, h=0.65, centre=P(-3.6, 0.2))
            p = sc.part_barre(b, 0.7, SANG)
            ap, tp = b.dessous(p, "4,2 kg", VERT_OK, fs=28)
            tp.align_to(b.bp.piste, LEFT)
            a6, t6 = sc.accolade(b.bp.piste, "60 kg", JAUNE_TITRE, fs=28)
            l0 = sc.ligne_rep(0, ["0,07 ×", "60", "= 4,2 kg."])
            l1 = sc.ligne_rep(1, ["B : 0,7 ;", "C : 0,007."])
            t7 = VGroup(gras("7 % =", 40, SANG), gras("0,07", 40, AMBRE)).arrange(RIGHT, buff=0.2).move_to(P(-3.6, 2.2))
            sc.montre("7 %, c'est", FadeOut(gt), FadeIn(t7[0], shift=UP * 0.15), FadeIn(b, shift=UP * 0.2), rt=0.4)
            sc.montre("0,07. 0,07", FadeIn(t7[1], scale=1.3), rt=0.35)
            sc.montre(("0,07 fois", 1), FadeIn(l0[0], shift=UP * 0.15), rt=0.3)
            sc.montre("fois 60", FadeIn(l0[1], shift=UP * 0.15), GrowFromCenter(a6), FadeIn(t6), rt=0.35)
            sc.montre("égale 4,2", FadeIn(l0[2], scale=1.3), FadeIn(p), GrowFromCenter(ap), FadeIn(tp, scale=1.3),
                      rt=0.45)
            sc.montre("B prend", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.4)
            sc.montre("C pour", FadeIn(l1[1], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Le sang : environ 7 %", "de la masse du corps.", "Une patiente de 60 kg ?"],
                            [self.t("4,2 kg", 36), self.t("42 kg", 36), self.t("0,42 kg", 36)], 0,
                            ["0,07 × 60 = 4,2 kg.", "B : 0,7 ; C : 0,007."],
                            mot_q="Le sang", avant_q=avant, autres_r=apres)

    # ── 08 : défi : un patient de 80 kg : l'eau (60 %) et le sang (7 %) ────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        si = Silhouette(3.8, centre=P(-4.6, -0.3))
        xl = 0.2
        L0 = self.lc([("Un patient :", WHITE), ("80 kg", JAUNE_TITRE)], 2.0, fs=42, xl=xl)
        self.jouer(L0, ["Un patient", "80 kilos"], {0: [FadeIn(si, shift=UP * 0.2)]})
        gt = goutte(0.42)
        L1 = self.lc([("Eau, à", EAU), ("60 % :", EAU), ("? kg", AMBRE)], 1.05, fs=42, xl=xl + 0.9)
        L2 = self.lc([("Sang, à", SANG), ("7 % :", SANG), ("? kg", AMBRE)], 0.0, fs=42, xl=xl + 0.9)
        gt.next_to(L2, LEFT, buff=0.3)
        ge = Square(0.5, fill_color=EAU, fill_opacity=1, stroke_width=0).next_to(L1, LEFT, buff=0.3)
        self.jouer(L1, ["Combien de kilos", "60 %", None], {0: [FadeIn(ge, scale=0.6)]})
        self.jouer(L2, ["Et combien", "7 %", None], {0: [FadeIn(gt, scale=0.6)]})
        self.pause_defi(y=-1.4)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        xl = 0.6
        be = self.barre(y=1.05, largeur=5.6, x=-3.1, h=0.7)
        pe = self.part_barre(be, 6, EAU)
        ae, te = self.accolade(be.bp.piste, "80 kg", JAUNE_TITRE, fs=28)
        de, se = be.dessous(pe, "48 kg", VERT_OK, fs=28)
        ne = sans(self.t("eau", 28, EAU)).next_to(be, DOWN, buff=0.15).align_to(be, RIGHT)
        L1 = self.lc([("Eau :", EAU), ("0,6 ×", AMBRE), ("80", JAUNE_TITRE)], 1.65, fs=42, xl=xl)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.au_mot("Eau")  # le titre et « Eau : » ensemble, au premier mot
        self.play(Write(tit), FadeIn(L1[0], shift=RIGHT * 0.15), FadeIn(be, shift=UP * 0.2), FadeIn(ne), run_time=0.5)
        self.jouer(VGroup(L1[1], L1[2]), ["0,6 fois", "fois 80"],
                   {0: [FadeIn(pe)], 1: [GrowFromCenter(ae), FadeIn(te)]})
        L2 = self.lc([("=", WHITE), ("48 kg", VERT_OK)], 0.9, fs=46, xl=xl + 1.4)
        self.jouer(L2, ["égale 48", None], {1: [GrowFromCenter(de), FadeIn(se, scale=1.3)]})
        self.play(Create(self.cadre(L2[1])), run_time=0.3)
        bs = self.barre(y=-1.45, largeur=5.6, x=-3.1, h=0.7)
        ps = self.part_barre(bs, 0.7, SANG)
        a2, t2 = self.accolade(bs.bp.piste, "80 kg", JAUNE_TITRE, fs=28)
        ds, ss = bs.dessous(ps, "5,6 kg", VERT_OK, fs=28)
        ss.align_to(bs.bp.piste, LEFT)
        ns = sans(self.t("sang", 28, SANG)).next_to(bs, DOWN, buff=0.15).align_to(bs, RIGHT)
        L3 = self.lc([("Sang :", SANG), ("0,07 ×", AMBRE), ("80", JAUNE_TITRE)], -0.85, fs=42, xl=xl)
        self.jouer(L3, ["Sang", "0,07 fois", ("fois 80", 2)],
                   {0: [FadeIn(bs, shift=UP * 0.2), FadeIn(ns)], 1: [FadeIn(ps)], 2: [GrowFromCenter(a2), FadeIn(t2)]})
        L4 = self.lc([("=", WHITE), ("5,6 kg", VERT_OK)], -1.6, fs=46, xl=xl + 1.4)
        self.jouer(L4, ["égale 5,6", None], {1: [GrowFromCenter(ds), FadeIn(ss, scale=1.3)]})
        self.play(Create(self.cadre(L4[1])), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        si = Silhouette(3.2, centre=P(-4.6, 0.0))
        e = si.eau(0.6)
        t = gras("× 0,6", 34, AMBRE).next_to(si, DOWN, buff=0.2)
        fig = pas_audit(VGroup(si, e, si.forme.copy().set_fill(opacity=0), t))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Prendre un pourcentage d'une quantité :", "on la multiplie par ce pourcentage", "écrit en décimal."),
            ("60 %, c'est × 0,6.",),
            ("Sous 100 %, le résultat", "est plus petit.")], fs=36)
        self.au_mot("Prendre")
        self.montrer_ligne(lignes[0], Indicate(e, color=VERT_OK))
        self.au_mot("60 %, c'est")
        self.montrer_ligne(lignes[1], Circumscribe(t, color=VERT_OK, buff=0.1))
        self.au_mot("Et sous")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_methode1, self.ecran_methode2,
                  self.ecran_methode3, self.ecran_question1, self.ecran_piege, self.ecran_question2,
                  self.ecran_defi, self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde STMG seule (voir l'en-tête)
            ecrans[0]()
            return
        seuls = os.environ.get("ECRANS")  # mise au point : ECRANS=ecran_piege,ecran_correction
        for e in ecrans:
            if not seuls or e.__name__ in seuls.split(","):
                e()
        if not seuls:
            self.page_abonnement("10-abonne")


class PropLyceeAppliquerPremiere(PropLyceeAppliquerBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class PropLyceeAppliquerStmg(PropLyceeAppliquerBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
