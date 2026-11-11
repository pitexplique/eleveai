# suite_geo_reconnaitre_short.py
# EleveAI — Maths 1re (sans spé) — short « Suite géométrique : tu la repères
# en 3 secondes ? » (9:16), ceinture BLANCHE (échelle entière sous le titre).
# Série SUITES, épisode 09. Micro du coach : expo_suite_reconnaitre.
#   · 00-garde      : le titre, l'échelle, « en 3 secondes ? » et un chrono ;
#   · 01-situation  : EN HAUT le photographe agrandit sa photo (8, 12, 18, 27 cm :
#                     la photo grandit à partir de son coin, les anciennes restent
#                     en contour, la largeur en orange dessous) ; EN BAS les cases se
#                     remplissent EN MÊME TEMPS (un pointillé relie le bord droit de
#                     la photo à sa case) ;
#   · 02-quotient   : 12 ÷ 8 = 1,5, les flèches « × 1,5 » sautent de case en case,
#                     suite géométrique, q = 1,5 ;
#   · 03/03b        : question-pause (C : 5 ; 15 ; 45 ; 135, q = 3), 3 s ;
#   · 04-commentaire: 8, 12, 18, 27 … ? puis la question dans l'ordre de la voix,
#                     puis « Réponds en commentaire ! » (réponse 40,5 cm = 27 × 1,5,
#                     NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison, vert = juste.
# Voix : manim/voix/premiere-suite-geo-reconnaitre-short.json (débit −6),
# calée par suite_geo_reconnaitre_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_geo_reconnaitre_short.py SuiteGeoReconnaitreShort -o eleveai-maths-premiere-suite-geo-reconnaitre-short --media_dir manim/scripts/premiere/media-suite-geo-reconnaitre-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403

CM = [8, 12, 18, 27]
assert all(b / a == 1.5 for a, b in zip(CM, CM[1:])) and 12 / 8 == 1.5
assert 27 * 1.5 == 40.5                                   # la largeur suivante (commentaire)
QS = [[10, 20, 30, 40], [1, 2, 4, 7], [5, 15, 45, 135]]
assert [len({b / a for a, b in zip(l, l[1:])}) == 1 for l in QS] == [False, False, True]  # C, q = 3
XA, YA, ECH, RAP = -1.7, -0.2, 0.125, 0.62    # le coin bas-gauche des photos ; cm → écran ; h / l
Y_CASES = -1.12


def liste_deux_lignes(valeurs, fs=40, color=WHITE):
    """La liste aérée coupée après le 2e « ; » : « 10 ; 20 ; » au-dessus de « 30 ; 40 »,
    pour garder de gros chiffres dans les boutons étroits du short."""
    g = liste_aeree(valeurs, fs, color, apres=0.16)
    bas = VGroup(*g.submobjects[4:])
    bas.shift(DOWN * (g.nombres[0].height + 0.12)).align_to(g.nombres[0], LEFT)
    return g


def liste_aeree(valeurs, fs=32, color=WHITE, avant=0.05, apres=None):
    """« 3 ; 7 ; 11 ; 15 » comme liste_nombres (g.nombres, g.seps), mais le « ; »
    collé au nombre d'avant et une vraie espace APRÈS lui (relecture du 11/11)."""
    apres = 0.3 * fs / 34 if apres is None else apres
    g = VGroup()
    g.nombres, g.seps = [], []
    prec = None
    for k, v in enumerate(valeurs):
        n = Text(v, font_size=fs, color=color)
        if prec is not None:
            n.next_to(prec, RIGHT, buff=apres).align_to(g.nombres[0], DOWN)
        g.add(n)
        g.nombres.append(n)
        prec = n
        if k < len(valeurs) - 1:
            s = Text(";", font_size=fs, color=GREY_B).next_to(n, RIGHT, buff=avant)
            s.align_to(n, DOWN)
            g.add(s)
            g.seps.append(s)
            prec = s
    return g


def photo(cm, contour=False):
    """La photo (un paysage : ciel, montagne, soleil), de largeur cm, posée sur
    son coin bas-gauche (XA, YA). contour=True : seulement le cadre, en gris."""
    w = cm * ECH
    h = w * RAP
    cadre = Rectangle(width=w, height=h, stroke_color=WHITE if not contour else GREY_C,
                      stroke_width=3 if not contour else 2)
    cadre.move_to(P(XA + w / 2, YA + h / 2))
    if contour:
        return cadre.set_stroke(opacity=0.7)
    ciel = Rectangle(width=w, height=h, fill_color="#1e3a5f", fill_opacity=1, stroke_width=0).move_to(cadre)
    mont = Polygon(P(XA, YA), P(XA + 0.4 * w, YA + 0.72 * h), P(XA + 0.62 * w, YA + 0.42 * h),
                   P(XA + 0.78 * w, YA + 0.6 * h), P(XA + w, YA + 0.25 * h), P(XA + w, YA),
                   fill_color="#15803d", fill_opacity=1, stroke_width=0)
    soleil = Circle(radius=0.11 * w, fill_color="#FACC15", fill_opacity=1, stroke_width=0).move_to(
        P(XA + 0.8 * w, YA + 0.78 * h))
    return VGroup(ciel, soleil, mont, cadre)


def appareil(s=1.0):
    """Un appareil photo (pictogramme du métier)."""
    boitier = RoundedRectangle(width=0.62, height=0.42, corner_radius=0.07, fill_color=GREY_D, fill_opacity=1,
                               stroke_color=WHITE, stroke_width=2)
    viseur = Rectangle(width=0.2, height=0.08, fill_color=GREY_D, fill_opacity=1, stroke_color=WHITE,
                       stroke_width=2).next_to(boitier, UP, buff=0).shift(LEFT * 0.12)
    objectif = Circle(radius=0.13, fill_color="#0b1220", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    return VGroup(boitier, viseur, objectif.move_to(boitier)).scale(s)


def chrono(r=0.9):
    cadran = Circle(radius=r, stroke_color=WHITE, stroke_width=7)
    bouton = RoundedRectangle(width=0.3, height=0.2, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).next_to(cadran, UP, buff=0.03)
    aiguille = Line(ORIGIN, UP * r * 0.8, stroke_color=RAISON, stroke_width=7)
    return VGroup(cadran, bouton), aiguille


class SuiteGeoReconnaitreShort(ShortSuites):
    fichier_marques = "suite_geo_reconnaitre_short_marques.json"
    nom_voix = "premiere-suite-geo-reconnaitre-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def egalite(self, gauche, droite, fs, couleur):
        """« q = 1,5 » : une espace nette des deux côtés du « = »."""
        return VGroup(self.t(gauche, fs, couleur), self.t("=", fs, couleur), self.t(droite, fs, couleur)).arrange(
            RIGHT, buff=0.3)

    def ecarts_sous(self, liste, texte, couleur=RAISON, fs=30, bas=None):
        g = VGroup()
        for a, b in zip(liste.nombres, liste.nombres[1:]):
            y = (bas if bas is not None else a.get_bottom()[1]) - 0.05
            fl = CurvedArrow(P(a.get_center()[0], y), P(b.get_center()[0], y), angle=TAU / 4,
                             color=couleur, stroke_width=4, tip_length=0.13)
            g.add(VGroup(fl, self.t(texte, fs, couleur).next_to(fl, DOWN, buff=0.04)))
        return g

    def cote(self, cm):
        """La largeur de la photo : une double flèche orange sous elle."""
        y = YA - 0.2
        return DoubleArrow(P(XA, y), P(XA + cm * ECH, y), buff=0, color=RAISON, stroke_width=4, tip_length=0.12,
                           max_tip_length_to_length_ratio=0.2)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari en gros ──
        self.dire("00-garde")
        self.entete("Suite géométrique", extrait="Suite")
        pari = self.paragraphe(["Tu paries que", "tu la repères", ("en 3 secondes ?", RAISON)], self.fs_grand,
                               buff=0.2, y=1.35)
        for ligne, ex in zip(pari, ("Tu paries", "tu la", "3 secondes")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.3)
        cad, aig = chrono(0.85)
        VGroup(cad, aig).move_to(P(0, -1.6))
        aig.shift(cad[0].get_center() - aig.get_start())
        self.play(FadeIn(cad, scale=0.7), FadeIn(aig), run_time=0.3)
        self.play(Rotate(aig, -TAU, about_point=cad[0].get_center()), run_time=1.0, rate_func=linear)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT la photo grandit ; EN BAS les cases se remplissent ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        ico = appareil(0.75)
        lab = self.t("Un photographe", 38, JAUNE_TITRE)
        tete = VGroup(ico, lab).arrange(RIGHT, buff=0.2)
        if tete.width > 3.9:
            tete.scale_to_fit_width(3.9)
        tete.move_to(P(0, 2.32))
        self.au_mot("photographe")
        self.play(FadeIn(ico, scale=0.7), FadeIn(lab, shift=UP * 0.1), run_time=0.4)
        self.au_mot("agrandit une photo")
        ph = photo(CM[0])
        self.play(FadeIn(ph, scale=0.8), run_time=0.4)
        self.au_mot("largeur")
        co = self.cote(CM[0])
        self.play(GrowFromCenter(co), run_time=0.3)
        self.suivre("1,5")
        fois = VGroup(self.t("largeur", 42, WHITE), self.t("× 1,5", 46, RAISON)).arrange(RIGHT, buff=0.2)
        fois.move_to(P(0, -2.1))
        self.play(FadeIn(fois, scale=1.2), run_time=0.3)
        lg = LigneTermes([str(v) for v in CM], centre=P(0, Y_CASES), pas=1.08, largeur=0.8, hauteur=0.75, fs=38)
        anciens = VGroup()
        lien = None
        for k, v in enumerate(CM):
            self.suivre(str(v))
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4)]
            nv_lien = DashedLine(P(XA + v * ECH, YA - 0.2), lg.cases[k][0].get_top() + UP * 0.04, color=GREY_B,
                                 stroke_width=2, dash_length=0.07)
            if k:
                fant = photo(CM[k - 1], contour=True)
                anciens.add(fant)
                anims += [Transform(ph, photo(v)), Transform(co, self.cote(v))]
                if lien:
                    anims.append(FadeOut(lien))
                self.add(fant)
            anims.append(Create(nv_lien))
            self.play(*anims, run_time=0.25)
            self.bring_to_front(anciens)
            lien = nv_lien
        self.au_mot("centimètres")
        cm = self.t("(en centimètres)", 32, GREY_A).move_to(P(0, -2.68))
        self.play(FadeIn(cm, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(ico, lab, ph, co, anciens, lien, fois, cm)), run_time=0.3)  # avant la voix 02
        self.play(lg.animate.move_to(P(0, 1.95)), run_time=0.35)

        # ── 02 : le quotient est toujours le même ──
        self.dire("02-quotient")
        self.au_mot("12")
        self.play(*self.allumer_cases(lg, (0, 1), RAISON), run_time=0.2)
        c = [self.t(x, 48, col) for x, col in (("12", WHITE), ("÷", WHITE), ("8", WHITE), ("=", WHITE),
                                                  ("1,5", RAISON))]
        calc = VGroup(*c).arrange(RIGHT, buff=0.3).move_to(P(0, 0.2))
        self.play(FadeIn(c[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("divisé")
        self.play(FadeIn(c[1]), run_time=0.15)
        self.suivre("8")
        self.play(FadeIn(c[2], shift=UP * 0.1), run_time=0.2)
        self.suivre("1,5")
        self.play(FadeIn(VGroup(*c[3:]), scale=1.3), run_time=0.25)
        self.au_mot("de même")
        sauts = [lg.saut(k, "× 1,5", fs=25, creux=0.2) for k in range(3)]
        for x in sauts:
            x[1]._pas_audit = True  # « et de même ensuite » : 1,5 déjà dit
        self.play(*self.allumer_cases(lg, (0, 1), TERME, largeur=3), *[Create(s[0]) for s in sauts], run_time=0.3)
        self.play(*[FadeIn(s[1], scale=1.4) for s in sauts], run_time=0.2)
        self.au_mot("géométrique")
        sg = self.t("suite géométrique", 44, JAUNE_TITRE).move_to(P(0, -0.85))
        self.play(FadeIn(sg, scale=1.2), run_time=0.35)
        self.au_mot("raison")
        rr = self.egalite("q", "1,5", 54, RAISON).move_to(P(0, -1.95))
        self.play(FadeIn(rr[:2], shift=UP * 0.1), run_time=0.25)
        self.suivre("1,5")
        cadr = self.encadre(rr, RAISON, 0.14)
        self.play(FadeIn(rr[2], scale=1.4), Create(cadr), run_time=0.3)
        self.insister(VGroup(rr, cadr), 1.1)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → C ──
        # 2 lignes par bouton : les chiffres au moins aussi gros que « le même nombre ? » (relecture 11/11) ;
        # la question en 3 lignes égales et les boutons un peu moins espacés, pour garder la place au-dessus de Ti-Margo
        listes = [liste_deux_lignes([str(v) for v in l], 32) for l in QS]
        self.buff_boutons = 0.12
        q = self.poser_question("03-question",
                                [(self.t("Laquelle multiplie", 32), "Laquelle"), (self.t("toujours par", 32), "toujours"),
                                 (self.t("le même nombre ?", 32), "le même")],
                                listes, 2, y_question=2.95)
        del self.buff_boutons
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), run_time=0.25)
        self.play(VGroup(q.cartes[2], ok).animate.move_to(q.cartes[0].get_center()), run_time=0.35)
        lr = LigneTermes([str(v) for v in QS[2]], centre=P(0, q.cartes[2].get_bottom()[1] - 0.6), pas=1.04,
                         largeur=0.94, hauteur=0.7, fs=28)  # « 135 » a la même marge que « 15 »
        for c in lr.cases:
            c[1]._pas_audit = True  # les termes de C, déjà lus dans la question
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in lr.cases], lag_ratio=0.15), run_time=0.4)
        self.au_mot("3")
        ec = [lr.saut(k, "× 3", fs=30, creux=0.2) for k in range(3)]
        self.play(*[Create(e[0]) for e in ec], *[FadeIn(e[1], scale=1.3) for e in ec], run_time=0.3)
        self.au_mot("3", n=2)
        r3 = self.egalite("q", "3", 48, JUSTE).move_to(P(0, -2.45))
        c3 = self.encadre(r3, JUSTE, 0.16)
        self.play(FadeIn(r3, scale=1.3), Create(c3), run_time=0.3)
        self.insister(VGroup(r3, c3), 1.1)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        lc = LigneTermes(["8", "12", "18", "27", "?"], pas=0.86, largeur=0.64, hauteur=0.66, fs=30, centre=P(0, 2.0))
        for k in range(4):
            self.suivre(str(CM[k]))
            self.montrer_case(lc, k, run_time=0.25)
        self.play(FadeIn(lc.cases[4], scale=1.3), run_time=0.25)
        question = self.paragraphe([("Quelle sera", RAISON), "la largeur suivante,", ("en centimètres ?", RAISON)],
                                   44, buff=0.16, y=0.25)
        for ligne, ex in zip(question, ("Quelle", "largeur", "centimètres")):
            self.au_mot(ex)
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if ex == "largeur":
                anims.append(Indicate(lc.cases[4], color=RAISON))
            self.play(*anims, run_time=0.3)
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
