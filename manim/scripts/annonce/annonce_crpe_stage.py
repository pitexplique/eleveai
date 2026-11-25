# annonce_crpe_stage.py
# EleveAI — VIDÉO D'ANNONCE du stage intensif CRPE de janvier 2027 (25/11/2026).
# Pour les futurs professeurs des écoles : vouvoiement partout, pas de ceinture
# (ce n'est pas une leçon), fin propre au CRPE (lien du test + téléphone), car la
# fin commune (`fin_commune.py`) tutoie les élèves.
#
# Script : manim/crpe-stage-script.md ; Frédéric a choisi la voix Paul le 25/11 (débit −6).
# Voix : manim/voix/annonce-crpe-stage.json et annonce-crpe-stage-short.json
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/annonce-crpe-stage.json -Voix Paul -Debit -6 -Hauteur 0
# ⛔ Chiffres : ceux de app/formation-crpe/page.tsx (STAGE, SESSIONS, TARIF, SEMAINES,
#   ECRITS). Si la page change, changer ici ET la voix.
# Question-pause : bonne réponse tirée au hasard, C (paysage) et A (short).
#
# Aperçu : python -m manim render -ql --disable_caching manim/scripts/annonce/annonce_crpe_stage.py AnnonceCrpeStage --media_dir manim/scripts/annonce/media
# Rendu  : python -m manim render -qh --disable_caching manim/scripts/annonce/annonce_crpe_stage.py AnnonceCrpeStage -o eleveai-annonce-crpe-stage --media_dir manim/scripts/annonce/media
# Short  : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/annonce/annonce_crpe_stage.py AnnonceCrpeStageShort -o eleveai-annonce-crpe-stage-short --media_dir manim/scripts/annonce/media
# Sortie : manim/sorties/annonce/crpe-stage/

import random
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e, Short6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402

PHOTO = Path(__file__).resolve().parents[2] / "assets" / "frederic-rond.png"
GRIS = "#64748b"
GRIS_CLAIR = "#94a3b8"
FOND_CARTE = "#0f172a"
CLASSES_ECOLE = ["CP", "CE1", "CE2", "CM1", "CM2"]
CLASSES_COLLEGE = ["6e", "5e", "4e", "3e"]


def P(x, y):
    return np.array([x, y, 0.0])


def T(s, fs=36, c=WHITE, gras=False):
    return Text(s, font_size=fs, color=c, weight=BOLD if gras else NORMAL)


def borne(m, largeur):
    if m.width > largeur:
        m.scale_to_fit_width(largeur)
    return m


def carte(largeur, hauteur, couleur=BLEU_CALCUL, centre=ORIGIN):
    return RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.2, stroke_color=couleur,
                            stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1).move_to(centre)


def pastille(s, couleur, fs=30, larg=0.95, haut=0.7):
    r = RoundedRectangle(width=larg, height=haut, corner_radius=0.15, stroke_color=GRIS, stroke_width=3,
                         fill_color=FOND_CARTE, fill_opacity=1)
    t = T(s, fs, GRIS_CLAIR, gras=True).move_to(r)
    g = VGroup(r, t)
    g.couleur = couleur
    return g


def allumer(p):
    return AnimationGroup(p[0].animate.set_stroke(p.couleur, 4).set_fill(p.couleur, 0.25),
                          p[1].animate.set_color(WHITE))


def confettis(n, largeur, hauteur, graine=2027, trou=None):
    """Des confettis dans le cadre, hors du `trou` (xmin, xmax, ymin, ymax) où sont les textes."""
    r = random.Random(graine)
    couleurs = [JAUNE_TITRE, VERT_OK, BLEU_CALCUL, ORANGE_RETENUE, VIOLET_ACCENT, "#F472B6"]
    g = VGroup()
    while len(g) < n:
        x, y = r.uniform(-largeur / 2, largeur / 2), r.uniform(-hauteur / 2, hauteur / 2)
        if trou and trou[0] < x < trou[1] and trou[2] < y < trou[3]:
            continue
        c = Rectangle(width=0.09, height=0.2, stroke_width=0, fill_color=r.choice(couleurs), fill_opacity=1)
        c.rotate(r.uniform(0, PI)).move_to(P(x, y))
        g.add(c)
    return g


def triangle(u=0.42, centre=ORIGIN):
    """Le triangle rectangle 6 cm / 8 cm, angle droit en bas à gauche (u = unités par cm)."""
    a, b, c = P(0, 0), P(8 * u, 0), P(0, 6 * u)
    tri = Polygon(a, b, c, stroke_color=WHITE, stroke_width=4)
    k = 0.28
    angle = VMobject(stroke_color=WHITE, stroke_width=3).set_points_as_corners([P(k, 0), P(k, k), P(0, k)])
    g = VGroup(tri, angle)
    g.sommets = (a, b, c)
    g.move_to(centre)
    return g


def personnage(couleur):
    tete = Circle(radius=0.16, stroke_width=0, fill_color=couleur, fill_opacity=1)
    corps = RoundedRectangle(width=0.5, height=0.42, corner_radius=0.2, stroke_width=0, fill_color=couleur,
                             fill_opacity=1).next_to(tete, DOWN, buff=0.05)
    return VGroup(tete, corps)


def photo(hauteur):
    """La photo ronde de Frédéric. ⚠️ manim/**/*.png est ignoré par git : on la refait si elle manque."""
    if not PHOTO.exists():
        from PIL import Image, ImageDraw
        im = Image.open(PHOTO.parents[2] / "public" / "images" / "avatar-frederic-Lacoste.jpg").convert("RGBA")
        c = min(im.size)
        im = im.crop(((im.width - c) // 2, (im.height - c) // 2, (im.width + c) // 2, (im.height + c) // 2))
        im = im.resize((600, 600), Image.LANCZOS)
        masque = Image.new("L", (600, 600), 0)
        ImageDraw.Draw(masque).ellipse((0, 0, 599, 599), fill=255)
        im.putalpha(masque)
        PHOTO.parent.mkdir(parents=True, exist_ok=True)
        im.save(PHOTO)
    return ImageMobject(str(PHOTO)).set_height(hauteur)


class _Commun:
    """Les gestes communs à la paysage et au short."""

    def nouvel_ecran(self, mascotte=True):
        vieux = [m for m in self.mobjects]
        for m in vieux:
            m.clear_updaters()
        if vieux:
            self.play(*[FadeOut(m) for m in vieux], run_time=0.3)
        self.clear()
        if mascotte:
            self.mascotte()

    def insister(self, m, f=1.25, rt=0.3):
        self.play(m.animate.scale(f), run_time=rt)
        self.play(m.animate.scale(1 / f), run_time=rt)

    def chrono(self, n, centre, r=0.45, fs=44):
        rond = Circle(radius=r, stroke_color=ORANGE_RETENUE, stroke_width=6).move_to(centre)
        chiffre = T(str(n), fs, ORANGE_RETENUE, gras=True).move_to(centre)
        self.play(FadeIn(rond), FadeIn(chiffre), run_time=0.2)
        for k in range(n, 0, -1):
            arc = Arc(radius=r, start_angle=PI / 2, angle=TAU, stroke_color=JAUNE_TITRE, stroke_width=6).move_to(centre)
            nouveau = T(str(k), fs, ORANGE_RETENUE, gras=True).move_to(centre)
            self.remove(chiffre)
            chiffre = nouveau
            self.add(chiffre)
            self.play(Uncreate(arc), run_time=1.0, rate_func=linear)
        self.play(FadeOut(rond), FadeOut(chiffre), run_time=0.2)

    def icone_pause(self, h=0.42, c=ORANGE_RETENUE):
        b = Rectangle(width=h * 0.3, height=h, stroke_width=0, fill_color=c, fill_opacity=1)
        return VGroup(b, b.copy()).arrange(RIGHT, buff=h * 0.25)


# ══════════════════════════════════════════════════════════════════════════
#  LA PAYSAGE 16:9
# ══════════════════════════════════════════════════════════════════════════

class AnnonceCrpeStage(_Commun, Notion6e):
    identite = "EleveAI"
    nom_voix = "annonce-crpe-stage"

    def mascotte(self):
        return self.add_mascotte(scale=0.5)

    # 00 ─ Bonne résolution 2027
    def ecran_garde(self):
        self.mascotte()
        self.dire("00-garde")
        conf = confettis(60, 12.8, 6.8, trou=(-6.9, 6.9, -3.2, 2.0))
        titre = T("Bonne résolution 2027", 74, JAUNE_TITRE, gras=True).move_to(P(0, 1.2))
        borne(titre, 12.4)
        sous = T("Réussir l'écrit de maths du CRPE", 44).next_to(titre, DOWN, buff=0.5)
        ph = photo(2.0).move_to(P(0, -1.6))
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.6) for c in conf], lag_ratio=0.01),
                  Write(titre), run_time=1.4)
        self.au_mot("réussir")
        self.play(FadeIn(sous, shift=UP * 0.2), FadeIn(ph), run_time=0.6)
        self.insister(titre, 1.08)
        self.attendre_voix(0.6)

    # 01 ─ jusqu'au CM2… l'épreuve jusqu'en 3e
    def ecran_classes(self):
        self.nouvel_ecran()
        self.dire("01-classes")
        ps = ([pastille(c, VERT_OK, 34, 1.2, 0.95) for c in CLASSES_ECOLE]
              + [pastille(c, ORANGE_RETENUE, 34, 1.2, 0.95) for c in CLASSES_COLLEGE])
        ligne = VGroup(*ps).arrange(RIGHT, buff=0.18).move_to(P(0, 0.2))
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in ps], lag_ratio=0.08), run_time=0.9)
        ecole = VGroup(*ps[:5])
        col = VGroup(*ps[5:])
        self.au_mot("Vous enseignerez")
        acc1 = Brace(ecole, UP, color=VERT_OK)
        l1 = T("Vous enseignerez", 44, VERT_OK, gras=True).next_to(acc1, UP, buff=0.2)
        self.play(*[allumer(p) for p in ps[:5]], GrowFromCenter(acc1), FadeIn(l1), run_time=0.8)
        self.au_mot("Mais l'épreuve")
        acc2 = Brace(VGroup(*ps), DOWN, color=ORANGE_RETENUE)
        l2 = T("L'épreuve va jusqu'en 3e", 48, ORANGE_RETENUE, gras=True).next_to(acc2, DOWN, buff=0.25)
        self.play(*[allumer(p) for p in ps[5:]], GrowFromCenter(acc2), FadeIn(l2), run_time=0.8)
        self.insister(col, 1.12)
        self.attendre_voix(0.6)

    # 02 ─ les thèmes du collège
    def ecran_themes(self):
        self.nouvel_ecran()
        self.dire("02-themes")
        mots = [("Thalès", "Thalès"), ("Pythagore", "Pythagore"), ("PGCD", "P G C D"),
                ("équations", "équations"), ("probabilités", "probabilités")]
        places = [P(-3.6, 1.5), P(2.6, 1.7), P(-1.0, 0.0), P(3.6, -0.4), P(-2.4, -1.9)]
        couleurs = [BLEU_CALCUL, JAUNE_TITRE, VERT_OK, ORANGE_RETENUE, VIOLET_ACCENT]
        for (m, ex), p, c in zip(mots, places, couleurs):
            self.au_mot(ex)
            t = T(m, 64, c, gras=True).move_to(p)
            self.play(FadeIn(t, scale=1.6), run_time=0.35)
        self.attendre_voix(0.7)

    # 03-04 ─ la question-pause et sa réponse
    def ecran_question(self):
        self.nouvel_ecran()
        self.dire("03-question")
        tit = VGroup(self.icone_pause(), T("Question !", 46, ORANGE_RETENUE, gras=True)).arrange(RIGHT, buff=0.25)
        tit.to_edge(UP, buff=0.45)
        self.play(FadeIn(tit, shift=DOWN * 0.2), run_time=0.4)
        tri = triangle(0.42, P(-3.2, -0.1))
        A, B, C = tri[0].get_vertices()
        l6 = T("6 cm", 32, BLEU_CALCUL).next_to(Line(A, C), LEFT, buff=0.2)
        l8 = T("8 cm", 32, BLEU_CALCUL).next_to(Line(A, B), DOWN, buff=0.2)
        hyp = Line(B, C, stroke_color=JAUNE_TITRE, stroke_width=7)
        lq = T("?", 48, JAUNE_TITRE, gras=True).move_to(hyp.get_center() + P(0.45, 0.35))
        self.au_mot("Les côtés")
        self.play(Create(tri), run_time=0.7)
        self.au_mot("6 centimètres")
        self.play(FadeIn(l6), run_time=0.3)
        self.au_mot("8 centimètres")
        self.play(FadeIn(l8), run_time=0.3)
        self.au_mot("Combien")
        q = T("L'hypoténuse mesure ?", 40).move_to(P(2.4, 1.6))
        self.play(Create(hyp), FadeIn(lq), Write(q), run_time=0.7)
        choix = []
        for i, (lettre, val) in enumerate([("A", "14 cm"), ("B", "100 cm"), ("C", "10 cm")]):
            boite = carte(4.2, 0.85, GRIS, P(2.4, 0.5 - 1.05 * i))
            txt = VGroup(T(lettre + ".", 38, JAUNE_TITRE, gras=True), T(val, 38)).arrange(RIGHT, buff=0.3).move_to(boite)
            choix.append(VGroup(boite, txt))
        self.play(LaggedStart(*[FadeIn(ch, shift=LEFT * 0.3) for ch in choix], lag_ratio=0.25), run_time=0.8)
        self.au_mot("Mettez pause")
        self.attendre_voix(0.1)
        self.chrono(5, P(5.9, 2.9))

        # la réponse
        self.dire("04-reponse")
        bon = choix[2]
        self.play(bon[0].animate.set_stroke(VERT_OK, 6).set_fill("#065f46", 1),
                  choix[0].animate.set_opacity(0.35), choix[1].animate.set_opacity(0.35), run_time=0.4)
        self.insister(bon, 1.15)
        self.au_mot("Six au carré")
        calc1 = T("6² + 8² = 36 + 64 = 100", 40).move_to(P(-1.2, -2.45))
        self.play(Write(calc1), run_time=1.2)
        self.au_mot("La racine")
        calc2 = T("√100 = 10 cm", 44, VERT_OK, gras=True).move_to(P(-1.2, -3.3))
        l10 = T("10 cm", 36, VERT_OK, gras=True).move_to(lq.get_center() + P(0.55, 0))
        self.play(Write(calc2), Transform(lq, l10), hyp.animate.set_color(VERT_OK), run_time=0.8)
        self.insister(calc2, 1.12)
        self.attendre_voix(0.8)

    # 05 ─ peur des maths
    def ecran_peur(self):
        self.nouvel_ecran()
        self.dire("05-peur")
        t1 = T("Peur des maths ?", 72, JAUNE_TITRE, gras=True).move_to(P(0, 0.9))
        self.play(FadeIn(t1, scale=0.8), run_time=0.5)
        self.au_mot("C'est normal")
        t2 = T("C'est normal, et ça se prépare.", 50, VERT_OK).move_to(P(0, -0.7))
        self.play(Write(t2), run_time=1.0)
        self.attendre_voix(0.7)

    # 06 ─ la philosophie en 4 temps
    def ecran_philosophie(self):
        self.nouvel_ecran()
        self.dire("06-philosophie")
        tit = T("Ma philosophie, en 4 temps", 50, JAUNE_TITRE, gras=True).to_edge(UP, buff=0.5)
        self.play(Write(tit), run_time=0.8)
        etapes = [("Se présenter", BLEU_CALCUL), ("Se sentir bien", VERT_OK),
                  ("Savoir ce qui bloque", ORANGE_RETENUE), ("Résoudre", VIOLET_ACCENT)]
        xs = [-4.95, -1.65, 1.65, 4.95]
        for i, ((s, c), x) in enumerate(zip(etapes, xs)):
            self.au_mot(s)
            boite = carte(3.0, 2.6, c, P(x, 0.0))
            num = Circle(radius=0.36, stroke_width=0, fill_color=c, fill_opacity=1).move_to(P(x, 0.75))
            n = T(str(i + 1), 36, BLACK, gras=True).move_to(num)
            mots = s.split(" ")
            if len(mots) >= 3:
                lignes = [" ".join(mots[:2]), " ".join(mots[2:])]
            else:
                lignes = [s]
            txt = VGroup(*[T(l, 30, WHITE, gras=True) for l in lignes]).arrange(DOWN, buff=0.12)
            borne(txt, 2.7).move_to(P(x, -0.45))
            self.play(FadeIn(boite, shift=UP * 0.3), FadeIn(num), FadeIn(n), FadeIn(txt), run_time=0.45)
        self.attendre_voix(0.9)

    # 07 ─ la semaine
    def ecran_semaine(self):
        self.nouvel_ecran()
        self.dire("07-semaine")
        tit = T("Une semaine intensive", 50, JAUNE_TITRE, gras=True).to_edge(UP, buff=0.4)
        sous = T("Lundi → vendredi · 14 h – 18 h", 38, BLEU_CALCUL).next_to(tit, DOWN, buff=0.25)
        self.play(Write(tit), run_time=0.7)
        self.au_mot("du lundi")
        self.play(FadeIn(sous, shift=DOWN * 0.15), run_time=0.5)
        jours = [("Lundi", "les nombres", "Lundi, les"),
                 ("Mardi", "l'arithmétique et les mesures", "Mardi"),
                 ("Mercredi", "la géométrie et les probabilités", "Mercredi"),
                 ("Jeudi", "les productions d'élèves et la rédaction", "Jeudi"),
                 ("Vendredi", "une épreuve blanche", "Vendredi")]
        couleurs = [BLEU_CALCUL, VERT_OK, JAUNE_TITRE, VIOLET_ACCENT, ORANGE_RETENUE]
        for i, ((j, s, ex), c) in enumerate(zip(jours, couleurs)):
            y = 0.95 - 0.78 * i
            self.au_mot(ex)
            barre = RoundedRectangle(width=2.3, height=0.62, corner_radius=0.12, stroke_width=0,
                                     fill_color=c, fill_opacity=1).move_to(P(-4.6, y))
            tj = T(j, 30, BLACK, gras=True).move_to(barre)
            ts = T(s, 32).next_to(barre, RIGHT, buff=0.35)
            self.play(FadeIn(barre, shift=RIGHT * 0.3), FadeIn(tj), FadeIn(ts, shift=RIGHT * 0.3), run_time=0.4)
            if i == 4:
                self.insister(VGroup(barre, tj, ts), 1.1)
        self.attendre_voix(0.8)

    # 08 ─ les deux sessions
    def ecran_sessions(self):
        self.nouvel_ecran()
        self.dire("08-sessions")
        tit = T("Deux sessions · janvier 2027", 50, JAUNE_TITRE, gras=True).to_edge(UP, buff=0.5)
        self.play(Write(tit), run_time=0.7)
        for k, (nom, debut, x, ex) in enumerate([("Session 1", 4, -3.4, "du 4"), ("Session 2", 11, 3.4, "du 11")]):
            self.au_mot(ex)
            c = [BLEU_CALCUL, VERT_OK][k]
            boite = carte(6.0, 3.8, c, P(x, -0.4))
            tn = T(nom, 38, c, gras=True).move_to(P(x, 1.0))
            noms = ["lun", "mar", "mer", "jeu", "ven"]
            cases = VGroup()
            for i in range(5):
                case = RoundedRectangle(width=0.95, height=1.0, corner_radius=0.12, stroke_color=c, stroke_width=3,
                                        fill_color=c, fill_opacity=0.2)
                g = VGroup(case, T(noms[i], 20, GRIS_CLAIR).move_to(case.get_top() + DOWN * 0.22),
                           T(str(debut + i), 34, WHITE, gras=True).move_to(case.get_center() + DOWN * 0.12))
                cases.add(g)
            cases.arrange(RIGHT, buff=0.12).move_to(P(x, -0.15))
            dates = T(f"{debut} → {debut + 4} janvier", 38).move_to(P(x, -1.65))
            self.play(FadeIn(boite), FadeIn(tn), LaggedStart(*[FadeIn(g, scale=0.7) for g in cases], lag_ratio=0.12),
                      FadeIn(dates), run_time=0.9)
        self.attendre_voix(0.8)

    # 09 ─ le lieu et les prix
    def ecran_prix(self):
        self.nouvel_ecran()
        self.dire("09-prix")
        for k, (x, c, l1, l2, prix, ex, ex_prix) in enumerate([
                (-3.4, BLEU_CALCUL, "Hôtel Terre-Sainte", "Saint-Pierre", "300 €", "À l'hôtel", "300 euros"),
                (3.4, VERT_OK, "À distance, en direct", "11 h – 15 h à Paris", "250 €", "Ou à distance", "250 euros")]):
            self.au_mot(ex)
            boite = carte(6.0, 4.6, c, P(x, 0.2))
            t1 = borne(T(l1, 40, c, gras=True), 5.5).move_to(P(x, 1.75))
            t2 = T(l2, 32).move_to(P(x, 1.0))
            self.play(FadeIn(boite, shift=UP * 0.2), FadeIn(t1), FadeIn(t2), run_time=0.6)
            self.au_mot(ex_prix)
            tp = T(prix, 96, JAUNE_TITRE, gras=True).move_to(P(x, -0.45))
            ts = T("la semaine", 30, GRIS_CLAIR).move_to(P(x, -1.55))
            self.play(FadeIn(tp, scale=1.5), FadeIn(ts), run_time=0.5)
            self.insister(tp, 1.12, 0.25)
        self.attendre_voix(0.8)

    # 10 ─ 10 places, les tests, les écrits
    def ecran_places(self):
        self.nouvel_ecran()
        self.dire("10-places")
        tit = T("10 places par session", 54, JAUNE_TITRE, gras=True).to_edge(UP, buff=0.45)
        gens = VGroup(*[personnage([BLEU_CALCUL, VERT_OK, ORANGE_RETENUE, VIOLET_ACCENT, "#F472B6"][i % 5])
                        for i in range(10)]).arrange(RIGHT, buff=0.35).move_to(P(0, 1.55))
        self.play(Write(tit), LaggedStart(*[FadeIn(g, shift=UP * 0.3) for g in gens], lag_ratio=0.1), run_time=1.2)
        self.au_mot("après deux tests")
        tests = T("après 2 tests en ligne : maths et orthographe", 36).move_to(P(0, 0.35))
        self.play(Write(tests), run_time=1.0)
        self.au_mot("Les écrits")
        ecr = T("Écrits : 30 et 31 mars 2027", 44, ORANGE_RETENUE, gras=True).move_to(P(-0.6, -0.95))
        cadre = SurroundingRectangle(ecr, color=ORANGE_RETENUE, buff=0.25, corner_radius=0.15)
        self.play(FadeIn(ecr), Create(cadre), run_time=0.6)
        self.au_mot("Janvier")
        fin = T("Janvier, c'est le bon moment.", 46, VERT_OK).move_to(P(-0.6, -2.4))
        self.play(FadeIn(fin, shift=UP * 0.2), run_time=0.5)
        self.insister(fin, 1.1)
        self.attendre_voix(0.8)

    # 11 ─ la question en commentaire
    def ecran_commentaire(self):
        self.nouvel_ecran()
        self.dire("11-commentaire")
        q = VGroup(T("Et vous, quel chapitre du collège", 48), T("vous fait le plus peur ?", 48)).arrange(DOWN, buff=0.2)
        q.move_to(P(0, 1.0))
        self.play(Write(q), run_time=1.4)
        self.au_mot("Dites-le")
        app = T("Dites-le en commentaire !", 56, VERT_OK, gras=True).move_to(P(-0.4, -1.3))
        self.play(FadeIn(app, scale=0.7), run_time=0.4)
        self.insister(app, 1.08, 0.25)
        self.attendre_voix(0.8)

    # 12 ─ la fin propre au CRPE
    def ecran_fin(self):
        self.nouvel_ecran(mascotte=False)
        m = MascotteMargouillat().scale(0.7).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        self.dire("12-fin")
        ph = photo(2.3).move_to(P(-5.3, 1.9))
        self.play(FadeIn(ph), run_time=0.4)
        x = 1.0
        t1 = T("Faites le test sur", 42, JAUNE_TITRE).move_to(P(x, 2.7))
        self.play(Write(t1), run_time=0.5)
        self.au_mot("éleveai")
        site = T("eleveai.fr/formation-crpe", 44, BLEU_CALCUL, gras=True).move_to(P(x, 1.7))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.22, corner_radius=0.12)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("Frédéric")
        tel = T("Frédéric : 06 92 74 29 58", 48, WHITE, gras=True).move_to(P(x, 0.35))
        self.play(FadeIn(tel, shift=UP * 0.2), run_time=0.5)
        self.insister(tel, 1.08)
        self.au_mot("un pouce")
        gestes = VGroup(T("Un pouce", 34), T("·", 34, GRIS_CLAIR), T("La cloche", 34)).arrange(RIGHT, buff=0.25)
        gestes.move_to(P(x - 0.8, -2.3))
        self.play(FadeIn(gestes[0], scale=1.3), run_time=0.25)
        self.au_mot("abonnez-vous")
        ab = VGroup(T("Abonnez-vous !", 44, VERT_OK), T("@eleveai974", 44, VERT_OK, gras=True)).arrange(RIGHT, buff=0.35)
        ab.move_to(P(x - 0.6, -1.1))
        self.play(FadeIn(ab, shift=UP * 0.15), run_time=0.4)
        self.au_mot("cloche")
        self.play(FadeIn(gestes[1]), FadeIn(gestes[2], scale=1.3), run_time=0.25)
        self.play(Indicate(ab[1], color=VERT_OK, scale_factor=1.12), run_time=0.5)
        self.attendre_voix(1.6)

    def construct(self):
        # Les débuts d'écran (pour les chapitres YouTube) : --dry_run les affiche.
        for e in ("garde", "classes", "themes", "question", "peur", "philosophie", "semaine",
                  "sessions", "prix", "places", "commentaire", "fin"):
            print(f"CHAPITRE {e} {self.renderer.time:.1f}", flush=True)
            getattr(self, "ecran_" + e)()



# ══════════════════════════════════════════════════════════════════════════
#  LE SHORT 9:16 (cadre 4,5 × 8 ; rien de vital au-dessus de 3,0 ni sous −2,2)
# ══════════════════════════════════════════════════════════════════════════

L_SHORT = 4.1


def TS(s, fs=36, c=WHITE, gras=False):
    """Un texte du short, jamais plus large que la zone utile."""
    return borne(T(s, fs, c, gras), L_SHORT)


class AnnonceCrpeStageShort(_Commun, Short6e):
    nom_voix = "annonce-crpe-stage-short"

    def mascotte(self):
        return self.margo_bas()

    def ecran_garde(self):
        self.mascotte()
        self.dire("00-garde")
        conf = confettis(30, 3.9, 6.4, trou=(-2.3, 2.3, -2.5, 2.8))
        t1 = TS("Bonne résolution", 46, JAUNE_TITRE, gras=True).move_to(P(0, 2.3))
        t2 = TS("2027", 120, JAUNE_TITRE, gras=True).move_to(P(0, 1.05))
        borne(t1, L_SHORT)
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.5) for c in conf], lag_ratio=0.01), Write(t1), FadeIn(t2, scale=0.6),
                  run_time=1.2)
        self.au_mot("réussir")
        t3 = VGroup(TS("Réussir les maths", 40), TS("du CRPE", 52, WHITE, gras=True)).arrange(DOWN, buff=0.15).move_to(P(0, -0.6))
        ph = photo(1.1).move_to(P(0, -1.85))
        self.play(FadeIn(t3, shift=UP * 0.2), FadeIn(ph), run_time=0.5)
        self.attendre_voix(0.4)

    def ecran_classes(self):
        self.nouvel_ecran()
        self.dire("01-classes")
        e = [pastille(c, VERT_OK, 24, 0.72, 0.58) for c in CLASSES_ECOLE]
        c = [pastille(x, ORANGE_RETENUE, 24, 0.72, 0.58) for x in CLASSES_COLLEGE]
        le = VGroup(*e).arrange(RIGHT, buff=0.06).move_to(P(0, 1.6))
        lc = VGroup(*c).arrange(RIGHT, buff=0.08).move_to(P(0, -0.3))
        self.play(FadeIn(le), FadeIn(lc), run_time=0.5)
        self.au_mot("Vous enseignerez")
        l1 = TS("Vous enseignerez", 34, VERT_OK).move_to(P(0, 2.5))
        self.play(*[allumer(p) for p in e], FadeIn(l1), run_time=0.6)
        self.au_mot("L'épreuve")
        l2 = VGroup(TS("L'épreuve va", 38, ORANGE_RETENUE, gras=True), TS("jusqu'en 3e", 38, ORANGE_RETENUE, gras=True))
        l2.arrange(DOWN, buff=0.1).move_to(P(0, -1.45))
        self.play(*[allumer(p) for p in c], FadeIn(l2), run_time=0.6)
        self.insister(lc, 1.12)
        self.attendre_voix(0.4)

    def ecran_question(self):
        self.nouvel_ecran()
        self.dire("02-question")
        tit = VGroup(self.icone_pause(0.34), TS("Question !", 40, ORANGE_RETENUE, gras=True)).arrange(RIGHT, buff=0.2)
        tit.move_to(P(0, 2.7))
        tri = triangle(0.24, P(0.15, 1.5))
        A, B, C = tri[0].get_vertices()
        l6 = TS("6 cm", 26, BLEU_CALCUL).next_to(Line(A, C), LEFT, buff=0.12)
        l8 = TS("8 cm", 26, BLEU_CALCUL).next_to(Line(A, B), DOWN, buff=0.1)
        hyp = Line(B, C, stroke_color=JAUNE_TITRE, stroke_width=6)
        lq = TS("?", 40, JAUNE_TITRE, gras=True).move_to(hyp.get_center() + P(0.32, 0.25))
        self.play(FadeIn(tit), Create(tri), FadeIn(l6), FadeIn(l8), run_time=0.7)
        self.au_mot("L'hypoténuse")
        q = TS("L'hypoténuse ?", 36).move_to(P(0, -0.05))
        self.play(Create(hyp), FadeIn(lq), Write(q), run_time=0.5)
        choix = []
        for i, (lettre, val) in enumerate([("A", "10 cm"), ("B", "14 cm"), ("C", "100 cm")]):
            boite = carte(3.2, 0.55, GRIS, P(0, -0.72 - 0.62 * i))
            txt = VGroup(TS(lettre + ".", 32, JAUNE_TITRE, gras=True), TS(val, 32)).arrange(RIGHT, buff=0.25).move_to(boite)
            choix.append(VGroup(boite, txt))
        self.play(LaggedStart(*[FadeIn(ch) for ch in choix], lag_ratio=0.2), run_time=0.6)
        self.attendre_voix(0.1)
        self.chrono(3, P(1.72, 2.0), r=0.32, fs=32)

        self.dire("03-reponse")
        bon = choix[0]
        self.play(bon[0].animate.set_stroke(VERT_OK, 6).set_fill("#065f46", 1),
                  choix[1].animate.set_opacity(0.3), choix[2].animate.set_opacity(0.3), run_time=0.4)
        self.insister(bon, 1.12)
        self.au_mot("trente-six")
        self.play(FadeOut(choix[1]), FadeOut(choix[2]), run_time=0.2)
        c1 = TS("36 + 64 = 100", 36).move_to(P(0, -1.4))
        self.play(Write(c1), run_time=0.7)
        self.au_mot("Racine")
        c2 = TS("√100 = 10 cm", 40, VERT_OK, gras=True).move_to(P(0, -2.0))
        l10 = TS("10 cm", 28, VERT_OK, gras=True).move_to(lq.get_center() + P(0.3, 0))
        self.play(Write(c2), Transform(lq, l10), hyp.animate.set_color(VERT_OK), run_time=0.6)
        self.attendre_voix(0.5)

    def ecran_semaine(self):
        self.nouvel_ecran()
        self.dire("04-semaine")
        t1 = TS("Peur des maths ?", 46, JAUNE_TITRE, gras=True).move_to(P(0, 2.4))
        borne(t1, L_SHORT)
        self.play(FadeIn(t1, scale=0.8), run_time=0.4)
        self.au_mot("Ça se prépare")
        t2 = TS("Ça se prépare.", 44, VERT_OK).move_to(P(0, 1.5))
        self.play(Write(t2), run_time=0.6)
        self.au_mot("Une semaine")
        t3 = VGroup(TS("1 semaine", 54, WHITE, gras=True), TS("en janvier", 40)).arrange(DOWN, buff=0.1).move_to(P(0, 0.05))
        self.play(FadeIn(t3, shift=UP * 0.2), run_time=0.5)
        self.au_mot("de 14 heures")
        t4 = TS("14 h – 18 h", 48, BLEU_CALCUL, gras=True).move_to(P(0, -1.35))
        self.play(FadeIn(t4, scale=1.3), run_time=0.4)
        self.attendre_voix(0.4)

    def ecran_infos(self):
        self.nouvel_ecran()
        self.dire("05-infos")
        d1 = TS("4 → 8 janvier", 44, BLEU_CALCUL, gras=True).move_to(P(0, 2.55))
        ou = TS("ou", 30, GRIS_CLAIR).move_to(P(0, 1.95))
        d2 = TS("11 → 15 janvier", 44, VERT_OK, gras=True).move_to(P(0, 1.35))
        self.play(FadeIn(d1, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("ou du 11")
        self.play(FadeIn(ou), FadeIn(d2, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("À Saint-Pierre")
        p1 = borne(VGroup(TS("Saint-Pierre", 34), TS("300 €", 44, JAUNE_TITRE, gras=True)).arrange(RIGHT, buff=0.3), L_SHORT).move_to(P(0, 0.3))
        self.play(FadeIn(p1, shift=UP * 0.2), run_time=0.4)
        self.au_mot("à distance")
        p2 = borne(VGroup(TS("À distance", 34), TS("250 €", 44, JAUNE_TITRE, gras=True)).arrange(RIGHT, buff=0.3), L_SHORT).move_to(P(0, -0.5))
        self.play(FadeIn(p2, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Dix places")
        pl = TS("10 places", 58, ORANGE_RETENUE, gras=True).move_to(P(0, -1.6))
        self.play(FadeIn(pl, scale=1.4), run_time=0.4)
        self.insister(pl, 1.1, 0.25)
        self.attendre_voix(0.4)

    def ecran_commentaire(self):
        self.nouvel_ecran(mascotte=False)  # pas de Ti-Margo sur cet écran (REGLES.md, 17/11)
        self.dire("06-commentaire")
        q = VGroup(*[TS(s, 40) for s in ["Quel chapitre", "du collège", "vous fait le", "plus peur ?"]]).arrange(DOWN, buff=0.15)
        q.move_to(P(0, 1.5))
        self.play(Write(q), run_time=1.2)
        self.au_mot("Répondez")
        app = VGroup(TS("Répondez en", 46, VERT_OK, gras=True), TS("commentaire !", 46, VERT_OK, gras=True)).arrange(DOWN, buff=0.08)
        borne(app, L_SHORT / 1.08).move_to(P(0, -1.0))
        self.play(FadeIn(app, scale=0.7), run_time=0.4)
        self.insister(app, 1.08, 0.25)
        self.attendre_voix(0.5)

    def ecran_fin(self):
        self.nouvel_ecran()
        self.dire("07-fin")
        t1 = TS("Le test est sur", 38, JAUNE_TITRE).move_to(P(0, 2.65))
        self.play(Write(t1), run_time=0.4)
        self.au_mot("éleveai")
        site = VGroup(TS("eleveai.fr", 52, BLEU_CALCUL, gras=True), TS("/formation-crpe", 34, BLEU_CALCUL)).arrange(DOWN, buff=0.1)
        site.move_to(P(0, 1.65))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.18, corner_radius=0.12)
        tel = VGroup(TS("Frédéric :", 32), TS("06 92 74 29 58", 42, WHITE, gras=True)).arrange(DOWN, buff=0.1).move_to(P(0, 0.35))
        self.play(GrowFromCenter(site), Create(cadre), FadeIn(tel), run_time=0.5)
        self.au_mot("pouce")
        gestes = VGroup(TS("Un pouce", 28), TS("·", 28, GRIS_CLAIR), TS("La cloche", 28)).arrange(RIGHT, buff=0.18).move_to(P(0, -1.95))
        self.play(FadeIn(gestes[0], scale=1.3), run_time=0.2)
        self.au_mot("abonnez-vous")
        ab = VGroup(TS("Abonnez-vous !", 40, VERT_OK), TS("@eleveai974", 42, VERT_OK, gras=True)).arrange(DOWN, buff=0.1).move_to(P(0, -0.95))
        self.play(FadeIn(ab, shift=UP * 0.15), run_time=0.3)
        self.au_mot("cloche")
        self.play(FadeIn(gestes[1]), FadeIn(gestes[2], scale=1.3), run_time=0.2)
        self.play(Indicate(ab[1], color=VERT_OK, scale_factor=1.1), run_time=0.45)
        self.attendre_voix(1.0)

    def construct(self):
        self.ecran_garde()
        self.ecran_classes()
        self.ecran_question()
        self.ecran_semaine()
        self.ecran_infos()
        self.ecran_commentaire()
        self.ecran_fin()
