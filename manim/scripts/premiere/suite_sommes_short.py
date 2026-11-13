# suite_sommes_short.py
# EleveAI — Maths 1re spé — short « La somme 1 + 2 + … + n : tu paries que tu
# la calcules plus vite qu'une calculatrice ? » (9:16), ceinture BLANCHE
# (échelle entière à 70 % sous le titre). Série SUITES, épisode 24.
# Micro : suite_sommes (1 + 2 + … + n = n(n + 1) ÷ 2 ; « Une nageuse nage …
# longueurs » est un acteur de genS1n dans suites-renfort.ts).
#   · 00-garde      : le titre, l'échelle, 1 + 2 + … + n, le pari ; la
#                     calculatrice et le chronomètre ;
#   · 01-situation  : Jade, nageuse ; EN HAUT la piscine (1 longueur, puis 2) ;
#                     EN BAS les cases jour 1, jour 2, …, jour 30 (+ 1) ;
#   · 02-formule    : EN HAUT l'escalier de 30 marches et son jumeau (30 × 31) ;
#                     EN BAS 1 + 2 + … + 30 = 30 × 31 ÷ 2 ;
#   · 03/03b        : question-pause (A : 465), boutons côte à côte en grand,
#                     3 s ; puis 30 × 31 = 930 et 930 ÷ 2 = 465 ;
#   · 04-commentaire: en combien de jours 210 longueurs ? (réponse 20 jours :
#                     20 × 21 ÷ 2 = 210, NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur : bleu = les termes (les longueurs du jour), orange = le « + 1 »
# et le jumeau, vert = le juste, violet = le rang (les jours).
# Voix : manim/voix/premiere-spe-suite-sommes-short.json (débit −6), calée par
# suite_sommes_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_sommes_short.py SuiteSommesShort -o eleveai-maths-premiere-spe-suite-sommes-short --media_dir manim/scripts/premiere/media-suite-sommes-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07 : question_libre)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import nageur, piscine  # noqa: E402  (ép. 16 : la piscine)
from suite_geo_interpreter_short import SuiteGeoInterpreterShort as _S16  # noqa: E402  (ép. 16)
from suite_termes_short import SuiteTermesShort as _S18  # noqa: E402  (ép. 18 : boutons en hauteur)
from suite_variation_spe import Bords6  # noqa: E402  (ép. 23 : contrôle des 6 %)
from suite_sommes import OutilsSommes, RANG, chrono, escalier_plein  # noqa: E402  (la paysage)

assert sum(range(1, 31)) == 30 * 31 // 2 == 465 and 30 * 31 == 930              # question : A
assert [n for n in range(1, 50) if n * (n + 1) // 2 == 210] == [20]            # commentaire : 20 jours


def jade(s=1.0):
    """Jade, nageuse : bonnet vert, lunettes de natation, maillot bleu."""
    corps = RoundedRectangle(width=0.9, height=1.05, corner_radius=0.28, fill_color="#1D4ED8", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    bretelles = VGroup(*[Line(P(dx, 0.62), P(dx * 0.6, 0.3), stroke_color="#93C5FD", stroke_width=4)
                         for dx in (-0.22, 0.22)])
    tete = Circle(radius=0.26, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0, 0.95))
    bonnet = Sector(radius=0.28, angle=PI, start_angle=0, fill_color=JUSTE, fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.1))
    lunettes = VGroup(*[RoundedRectangle(width=0.15, height=0.1, corner_radius=0.04, fill_color="#0EA5E9",
                                         fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(P(dx, 0.95))
                        for dx in (-0.1, 0.1)])
    return VGroup(corps, bretelles, tete, bonnet, lunettes).scale(s)


def calculatrice(s=1.0):
    """Une calculatrice : l'écran, les touches."""
    boite = RoundedRectangle(width=0.9, height=1.25, corner_radius=0.1, fill_color="#334155", fill_opacity=1,
                             stroke_color=GREY_A, stroke_width=2)
    ecran = RoundedRectangle(width=0.7, height=0.3, corner_radius=0.04, fill_color="#A7F3D0", fill_opacity=1,
                             stroke_width=0).move_to(boite.get_top() + DOWN * 0.27)
    touches = VGroup(*[RoundedRectangle(width=0.14, height=0.13, corner_radius=0.03, fill_color=GREY_B,
                                        fill_opacity=1, stroke_width=0).move_to(P(-0.24 + 0.16 * i, -0.02 - 0.18 * j))
                       for i in range(4) for j in range(4)])
    return VGroup(boite, ecran, touches).scale(s)


class SuiteSommesShort(Bords6, AuditMilliers, OutilsSommes, OutilsEp12, OutilsGraphique, ShortSuites):
    fichier_marques = "suite_sommes_short_marques.json"
    nom_voix = "premiere-spe-suite-sommes-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15
    largeur_texte = 3.85          # une vraie marge latérale (≈ 6 %) pour les textes pleine largeur
    k_allumer = 1.03
    entete = _S16.entete
    q_reponse = _S18.q_reponse
    bouton_haut = _S18.bouton_haut

    def bouton_rangee(self, lettre, texte, largeur=3.5, hauteur=0.76, fs=46):
        """Un bouton en rangée : rond + lettre à gauche, le nombre centré dans la
        place qui reste, avec une vraie marge intérieure (structure du module commun)."""
        rond = Circle(radius=0.26, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=34, color=WHITE, weight=BOLD).move_to(rond)
        c = Text(texte, font_size=fs, color=WHITE)
        cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.14, stroke_color=TERME,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        VGroup(rond, lt).move_to(cadre.get_left() + RIGHT * 0.42)
        c.move_to(P(cadre.get_x() + 0.2, cadre.get_y()))
        return VGroup(cadre, VGroup(VGroup(rond, lt), c))

    def nager(self, nv, bassin, longueurs, run_time=0.7):
        """Le nageur fait `longueurs` longueurs (aller, retour…) dans le bassin."""
        xg, xd = bassin[1].get_left()[0] + 0.25, bassin[1].get_right()[0] - 0.45
        for k in range(longueurs):
            cible = xd if nv.get_x() < (xg + xd) / 2 else xg
            self.play(nv.animate.set_x(cible), run_time=run_time / longueurs, rate_func=smooth)

    def construct(self):
        # ── 00 : la garde : titre, échelle (70 %), 1 + 2 + … + n, le pari ──
        self.dire("00-garde")
        self.entete("La somme", extrait="La somme", fs=44)
        self.ecrire([[("1 +", WHITE, "1 plus 2"), ("2 +", WHITE, None), ("… +", WHITE, None), ("n", TERME, "plus n")]],
                    2.35, fs=60)
        pa = self.paragraphe(["Tu paries que tu", "la calcules plus vite", ("qu'une calculatrice ?", RAISON)], 38,
                             buff=0.14, y=0.95)
        ca = calculatrice(1.05).move_to(P(-0.8, -1.45))
        ch = chrono(0.5).move_to(P(0.85, -1.5))
        for l, ex in zip(pa, ("Tu paries", "la calcules", "qu'une calculatrice")):
            self.au_mot(ex)
            anims = [FadeIn(l, shift=UP * 0.1)]
            if ex == "qu'une calculatrice":
                anims += [FadeIn(ca, shift=UP * 0.15), FadeIn(ch, shift=UP * 0.15)]
            self.play(*anims, run_time=0.3)
        self.play(Rotate(ch.aiguille, -PI, about_point=ch[0].get_center()), Wiggle(ca, scale_value=1.06), run_time=0.8)
        self.attendre_voix(marge=0.2)

        # ── 01 : Jade, nageuse ; EN HAUT la piscine ; EN BAS jour 1, jour 2, …, jour 30 ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        pers = jade(0.62).move_to(P(-1.3, 2.0))
        nom = self.t("Jade", 42, JAUNE_TITRE).move_to(P(0.55, 2.25))
        met = self.t("nageuse", 34, TERME).move_to(P(0.55, 1.72))
        self.au_mot("Jade")
        self.play(FadeIn(pers, shift=UP * 0.15), FadeIn(nom, shift=UP * 0.1), run_time=0.4)
        self.au_mot("nageuse")
        bassin = piscine(3.4, 1.05).move_to(P(0, 0.55))
        nv = nageur(P(bassin[1].get_left()[0] + 0.25, 0.55 + 0.13), 1.3)
        self.play(FadeIn(met, shift=UP * 0.1), FadeIn(bassin), FadeIn(nv), run_time=0.35)
        lg = LigneTermes(["1", "2", "30"], xs=(-1.5, -0.35, 1.4), centre=P(0, -1.6), largeur=0.85, hauteur=0.78,
                         fs=46)
        for cs, nb in zip(lg.cases, ("1", "2", "30")):  # « jour » sur « 1 » : deux lignes courtes sous la case
            nm = VGroup(self.t("jour", 28, RANG, audit=False), self.t(nb, 30, RANG, audit=False)).arrange(DOWN, buff=0.06)
            lg.noms.add(nm.next_to(cs, DOWN, buff=0.12))
        pts = self.t("…", 44, WHITE).move_to(P(0.52, -1.6))
        self.suivre("1")
        self.montrer_case(lg, 0)
        self.nager(nv, bassin, 1, 0.7)
        self.suivre("2")
        self.montrer_case(lg, 1)
        self.nager(nv, bassin, 2, 1.0)
        self.au_mot("une de plus")
        self.sauter(lg, 0, "+ 1", cote=UP, fs=34, run_time=0.4)
        self.suivre("30")
        self.play(FadeIn(pts), run_time=0.15)
        self.montrer_case(lg, 2)
        self.attendre_voix(marge=0.3)

        # ── 02 : EN HAUT l'escalier de 30 marches et son jumeau ; EN BAS la formule ──
        self.nouvel_ecran("02-formule", garder=(self.badge, self.titre_s))
        c, n = 0.088, 30
        x0, y0 = -n * c / 2, -0.62
        esc = escalier_plein(n, c).shift(P(x0, y0))
        jum = escalier_plein(n, c, RAISON).rotate(PI, about_point=ORIGIN).shift(P(x0 + n * c, y0 + (n + 1) * c))
        self.au_mot("Son total")
        self.play(GrowFromEdge(esc, DOWN), run_time=0.8)
        self.ecrire([[("1 +", WHITE, "1 plus 2"), ("2 +", WHITE, None), ("… +", WHITE, None), ("30", TERME, "30")]],
                    -1.25, fs=50)
        self.ecrire([[("=", WHITE, "égale")], ("frac", [("30 ×", WHITE, "30 fois"), ("31", WHITE, "31")],
                                               [("2", WHITE, "divisé par 2")])], -2.25, fs=50,
                    avec_part={2: [FadeIn(jum, shift=DOWN * 0.15)], 3: [jum.animate.set_opacity(0.25)]}, run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → A (465) ; puis 30 × 31 = 930 et 930 ÷ 2 = 465 ──
        cartes = VGroup(*[self.bouton_rangee(Ln, nb) for Ln, nb in zip("ABC", ("465", "900", "450"))])
        for cc, y in zip(cartes, (0.55, -0.32, -1.19)):
            cc.move_to(P(0, y))

        def e1():
            self.largeur_texte = 3.85     # la pause (déjà placée) était bornée à 3,4 : marge de 6 % avec le rebours
            qq = self.paragraphe(["Combien de", "longueurs", "en tout ?"], 48, buff=0.14, y=2.08)
            for l, ex in zip(qq, ("Combien de", "longueurs", "en tout")):
                self.au_mot(ex)
                self.play(FadeIn(l, shift=UP * 0.1), run_time=0.25)

        self.largeur_texte = 3.4
        q = self.question_libre("03-question", [e1], cartes, P(0, -1.98))
        self.largeur_texte = 3.85
        self.dire("03b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        self.ecrire([[("30 ×", WHITE, "30 fois"), ("31", WHITE, "31"), ("=", WHITE, "égale"), ("930", WHITE, "930")]],
                    -1.98, fs=44, larg=3.5)
        r = self.ecrire([[("930 ÷ 2", RAISON, "divisé par 2"), ("=", WHITE, None), ("465", JUSTE, "465")]], -2.62,
                        centre=-0.15, fs=44, larg=3.2)
        self.boite(r.parts[-1:])
        self.attendre_voix(marge=0.8)

        # ── 04 : la question en commentaire : 210 longueurs ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        pa = self.paragraphe(["En combien de jours", "aurait-elle nagé", ("210 longueurs", RAISON), "en tout ?"], 44,
                             buff=0.12, y=1.75)
        bassin = piscine(3.2, 0.95).move_to(P(0, -0.5))
        nv = nageur(P(bassin[1].get_left()[0] + 0.25, -0.5 + 0.12), 1.2)
        for l, ex in zip(pa, ("en combien de jours", "aurait-elle nagé", "210", "en tout")):
            self.au_mot(ex)
            anims = [FadeIn(l, shift=UP * 0.1)]
            if ex == "aurait-elle nagé":
                anims += [FadeIn(bassin), FadeIn(nv)]
            self.play(*anims, run_time=0.25)
        self.nager(nv, bassin, 3, 0.9)
        self.appel_commentaire(-2.2)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
