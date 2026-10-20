# proba6_issue.py
# EleveAI — Maths 6e — série « Probabilités », épisode 3 : les issues
# (micro : proba_issue), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Short jumeau : proba6_issue_short.py (ceinture blanche, la roue piège).
#
# Écrans : 00 garde · 01 pièce puis dé, que peut-il arriver ? · 02 une issue
# (pile / face : 2 issues ; les 6 faces du dé : 6 issues) · 03 lister TOUTES
# les issues (l'échelle de 0 à 1 attend ; une face oubliée, une face en double)
# · 04 l'événement « obtenir un nombre pair » (2, 4, 6 surlignées : 3 issues)
# · 05 le piège de la roue 3 couleurs / 5 parts · 06 défi du sac rouge / verte
# / jaune · 06b correction · 07 ce que tu as appris · 08 abonnement.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque 6e/maths/probabilites.bank.ts, micro proba_issue) :
#   · « de » : carte blanche, 6 faces en 3 × 2, points noirs, faces de
#     l'événement SURLIGNÉES en ambre (surligne: [2, 4, 6]) ;
#   · « roue » (canvasRoue) : secteurs ÉGAUX sans étiquette, couleurs mêlées,
#     départ en haut, sens horaire, liseré #0f172a, pointe et moyeu noirs ;
#   · « billes » (canvasUrne) : une bille par objet, sans lettre, liseré foncé.
#
# Voix : manim/voix/6e-proba-issue.json (Julie, débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/proba6_issue.py Proba6Issue -o eleveai-maths-6e-proba-issue --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/03-issues/.

import importlib.util
import math
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
SCRIPTS = ICI.parent
sys.path.insert(0, str(SCRIPTS.parent))
sys.path.insert(0, str(SCRIPTS / "seconde"))
sys.path.insert(0, str(SCRIPTS / "annonce"))


def _charger(nom, chemin):
    """Charge un module PAR SON CHEMIN (des homonymes existent ailleurs)."""
    if nom in sys.modules:
        return sys.modules[nom]
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[nom] = mod
    spec.loader.exec_module(mod)
    return mod


_hasard = _charger("cm2_proba_hasard_pour_6e", SCRIPTS / "cm2" / "proba_hasard.py")
_vocab = _charger("cm2_proba_vocabulaire_pour_6e", SCRIPTS / "cm2" / "proba_vocabulaire.py")

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import piece_qui_tourne  # noqa: E402



def _de_coach_6_points(face, cote):
    """La face du coach (cm2/proba_hasard), mais TOUJOURS 6 points (ceux en trop
    sont invisibles) : une structure fixe, pour que `become` marche pendant un `play`."""
    d = _hasard.de_coach(face, cote)
    while len(d[1]) < 6:
        d[1].add(Dot(d[0].get_center(), radius=cote * 0.07).set_opacity(0))
    return d


def de_coach_qui_roule(centre, cote=1.2, periode=0.16, faces=None):
    """La face du coach qui roule SANS FIN (updater).
    ⛔ 20/10 : copie locale de cm2/proba_hasard redessinée par `become` sur une structure
    FIXE — l'originale remplaçait ses enfants dans l'updater et laissait, pendant un `play`,
    l'ancien dé dessiné sous le nouveau (dé EN DOUBLE)."""
    faces = faces or [3, 5, 2, 6, 1, 4]
    etat = {"t": 0.0}
    holder = _de_coach_6_points(faces[0], cote).move_to(centre)

    def maj(m, dt):
        etat["t"] += dt
        k = int(etat["t"] / periode)
        ang = 0.35 * math.sin(etat["t"] * 9)
        saut = 0.12 * abs(math.sin(etat["t"] * 9))
        m.become(_de_coach_6_points(faces[k % len(faces)], cote).rotate(ang).move_to(centre + UP * saut))

    holder.add_updater(maj)
    return holder


piece = _hasard.piece
carte_de = _vocab.carte_de
surligner = _vocab.surligner
eteindre = _vocab.eteindre
face_coach = _vocab.face_coach

# les couleurs du coach
C_ROUGE = "#ef4444"
C_BLEU = "#3b82f6"
C_VERT = "#22c55e"
C_JAUNE = "#eab308"
ENCRE = "#0f172a"
CARTE_BORD = "#e2e8f0"

# la roue du piège : 5 secteurs égaux, 3 couleurs mêlées (2 R, 2 B, 1 J)
ROUE_5 = [C_ROUGE, C_BLEU, C_JAUNE, C_ROUGE, C_BLEU]


def P(x, y):
    return np.array([x, y, 0.0])


def roue5(centre, couleurs=ROUE_5, r=1.5, carte=True):
    """Le canvas « roue » du coach : secteurs égaux sans étiquette, départ en
    haut, sens horaire. Renvoie (tout, disque, moyeu, pointe) ; disque[i] = part i."""
    n = len(couleurs)
    disque = VGroup()
    a = PI / 2
    for coul in couleurs:
        disque.add(AnnularSector(inner_radius=0, outer_radius=r, angle=-TAU / n, start_angle=a,
                                 fill_color=coul, fill_opacity=1, stroke_color=ENCRE, stroke_width=3))
        a -= TAU / n
    # 5 parts : le disque n'est PAS symétrique → on décale (pas de move_to)
    disque.shift(centre)
    moyeu = Dot(centre, radius=r * 0.06, color=ENCRE)
    pointe = Polygon(P(0, 0), P(-0.16, 0.34), P(0.16, 0.34), fill_color=ENCRE, fill_opacity=1,
                     stroke_width=0).scale(r / 1.4).move_to(centre + UP * (r + 0.06), aligned_edge=DOWN)
    pointe.shift(DOWN * 0.22 * r / 1.4)
    g = VGroup()
    if carte:
        g.add(RoundedRectangle(width=2 * r + 0.8, height=2 * r + 1.0, corner_radius=0.2, fill_color=WHITE,
                               fill_opacity=1, stroke_color=CARTE_BORD, stroke_width=2).move_to(centre + UP * 0.1))
    g.add(disque, moyeu, pointe)
    return g, disque, moyeu, pointe


def bille6(couleur, r=0.4):
    """Une bille du canvas « billes » (6e : sans lettre)."""
    return Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)


def sac(centre, larg=3.2, haut=2.6):
    """Un sac transparent noué d'un lien orange. Renvoie (sac)."""
    corps = RoundedRectangle(width=larg, height=haut, corner_radius=0.6, stroke_color=WHITE, stroke_width=4,
                             fill_color="#E0F2FE", fill_opacity=0.08).move_to(centre)
    col = Polygon(P(-0.75, 0), P(0.75, 0), P(0.45, 0.42), P(-0.45, 0.42), stroke_color=WHITE, stroke_width=4,
                  fill_color="#E0F2FE", fill_opacity=0.08).move_to(corps.get_top() + UP * 0.2)
    lien = Line(P(-0.55, 0), P(0.55, 0), color=ORANGE_RETENUE, stroke_width=7).move_to(corps.get_top() + UP * 0.22)
    return VGroup(corps, col, lien)


class Toupie:
    """Fait tourner un disque (sens horaire) et l'arrête PILE dans sa position
    de départ (les parts retombent à leur place)."""

    def __init__(self, scene, d, centre, vitesse=6.0):
        self.scene, self.d, self.c, self.v, self.angle = scene, d, centre, vitesse, 0.0

        def maj(m, dt):
            m.rotate(-self.v * dt, about_point=self.c)
            self.angle += self.v * dt

        self.maj = maj
        d.add_updater(maj)

    def arreter(self, run_time=1.2):
        self.d.remove_updater(self.maj)
        reste = TAU - (self.angle % TAU)
        self.scene.play(Rotate(self.d, -(reste + TAU), about_point=self.c), run_time=run_time,
                        rate_func=rate_functions.ease_out_cubic)
        self.angle = 0.0


class Notion6eProba(Notion6e):
    identite = "Maths 6e — EleveAI"


class Proba6Issue(Notion6eProba):
    nom_voix = "6e-proba-issue"

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        """Une ligne en morceaux colorés, d'UN SEUL Text ; ligne[i] = i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):
            return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        g, k = VGroup(), 0
        for (m, c), n in zip(morceaux, tailles):
            g.add(VGroup(*T[k:k + n]).set_color(c))
            k += n
        return g

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def pulser(self, mobs, k=1.18, run_time=0.25):
        self.play(*[m.animate.scale(k) for m in mobs], run_time=run_time)
        self.play(*[m.animate.scale(1 / k) for m in mobs], run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=8):
        return Line(mob.get_corner(DL) + LEFT * 0.1, mob.get_corner(UR) + RIGHT * 0.1,
                    stroke_width=sw, color=color)

    def etiquette(self, texte, color, font_size=36):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.45, height=lbl.height + 0.32, corner_radius=0.14,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def nb_issues(self, n, font_size=56, couleur=JAUNE_TITRE):
        return self.ligne([(str(n), couleur), ("issues", VERT_OK)], font_size, 0.25)

    # ── l'échelle de 0 à 1 (le fil rouge de la série) ───────────────────────

    def echelle(self, x0, x1, y):
        barre = Line(P(x0, y), P(x1, y), stroke_width=12)
        # ⛔ Manim inverse le dégradé : liste VERT → ROUGE pour avoir ROUGE à gauche (0), VERT à droite (1)
        barre.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])
        bouts = VGroup(*[Line(P(x, y - 0.22), P(x, y + 0.22), stroke_width=5) for x in (x0, x1)])
        return VGroup(barre, bouts)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les issues", 64, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("blanche").move_to(P(-0.6, -2.75))
        self.add(ech)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), run_time=0.8)
        pc = piece_qui_tourne(P(-4.4, 0.45), 0.85)
        self.add(pc)
        dr = de_coach_qui_roule(P(-0.9, 0.45), 1.5)
        self.add(dr)
        r, d, moyeu, pointe = roue5(P(2.6, 0.45), r=1.0)
        self.play(FadeIn(r, scale=0.8), run_time=0.4)
        toupie = Toupie(self, d, P(2.6, 0.45), 7.0)
        self.au_mot("tout ce qui peut arriver")
        sous = self.t("tout ce qui peut arriver", 40, BLEU_CALCUL).move_to(P(-0.9, -1.6))
        self.play(FadeIn(sous, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix(marge=0.8)
        pc.clear_updaters()
        dr.clear_updaters()
        toupie.arreter(0.5)

    # ── 01 : pièce, puis dé ─────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("une pièce")
        pc = piece_qui_tourne(P(-3.6, 0.6), 1.15)
        self.add(pc)
        self.au_mot("un dé")
        dr = de_coach_qui_roule(P(0.9, 0.6), 2.0)
        self.add(dr)
        self.au_mot("Que peut-il arriver")
        q = self.t("Que peut-il arriver ?", 52, ORANGE_RETENUE).move_to(P(-1.3, -2.1))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        point = q[-1]
        self.insister(point, 0.3)
        self.attendre_voix(marge=0.5)
        pc.clear_updaters()
        dr.clear_updaters()

    # ── 02 : une issue ──────────────────────────────────────────────────────

    C_DE = P(1.8, 0.55)

    def le_de(self, cote=1.1, gap=0.22):
        carte, faces = carte_de(cote, gap)
        carte.move_to(self.C_DE)
        return carte, faces

    def ecran_issue(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-issue")
        self.au_mot("Une issue")
        d1 = self.ligne([("une issue", VERT_OK), ("=", WHITE), ("un résultat possible", WHITE)], 46, 0.3)
        d1.move_to(P(-0.6, 2.75))
        self.play(FadeIn(d1, shift=UP * 0.15), run_time=0.6)
        self.insister(d1[0], 0.3)

        self.au_mot("La pièce")
        pc = piece_qui_tourne(P(-3.8, 0.55), 0.95)
        self.add(pc)
        pile = piece("PILE", 0.75).move_to(P(-4.75, 0.55))
        face = piece("FACE", 0.75).move_to(P(-2.85, 0.55))
        self.au_mot("pile ou")
        pc.clear_updaters()
        self.play(ReplacementTransform(pc, pile), run_time=0.35)
        self.au_mot("face, 2")
        self.play(FadeIn(face, shift=LEFT * 0.3), run_time=0.35)
        self.au_mot("2 issues")
        deux = self.nb_issues(2).move_to(P(-3.8, -1.35))
        acc = Brace(VGroup(pile, face), DOWN, color=VERT_OK)
        self.play(GrowFromCenter(acc), FadeIn(deux, scale=0.6), run_time=0.45)
        self.insister(deux[0], 0.3)

        self.au_mot("Le dé")
        carte, faces = self.le_de()
        for f in faces:
            f.set_opacity(0.12)
        self.play(FadeIn(carte[0]), FadeIn(faces), run_time=0.4)
        for ex, f in zip(["1, 2, 3", "2, 3", "3, 4", "4, 5", "5 ou", "6, 6"], faces):
            self.au_mot(ex)
            self.play(f.animate.set_opacity(1).scale(1.2), run_time=0.22)
            self.play(f.animate.scale(1 / 1.2), run_time=0.15)
        self.au_mot("6 issues")
        six = self.nb_issues(6).move_to(P(1.8, -1.6))
        self.play(FadeIn(six, scale=0.6), Indicate(carte[0], color=VERT_OK, scale_factor=1.03), run_time=0.45)
        self.insister(six[0], 0.3)
        self.attendre_voix()

    # ── 03 : lister TOUTES les issues ───────────────────────────────────────

    def rangee(self, y, cote=1.0, pas=1.3, x_c=-0.6):
        return VGroup(*[face_coach(f, cote).move_to(P(x_c + (f - 3.5) * pas, y)) for f in range(1, 7)])

    def ecran_lister(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lister")
        x0, x1, ye = -4.6, 3.4, 2.55
        ech = self.echelle(x0, x1, ye)
        self.au_mot("calculer une probabilité")
        self.play(Create(ech), run_time=0.6)
        curseur = Triangle(fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0).scale(0.18).rotate(PI)
        q = self.t("?", 44, ORANGE_RETENUE)
        p = ValueTracker(0.2)
        curseur.add_updater(lambda m: m.move_to(P(x0 + (x1 - x0) * p.get_value(), ye + 0.36)))
        q.add_updater(lambda m: m.next_to(curseur, UP, buff=0.08))
        self.add(curseur, q)
        self.play(p.animate.set_value(0.8), run_time=0.9, rate_func=there_and_back_with_pause)
        curseur.clear_updaters()
        q.clear_updaters()

        self.au_mot("on liste")
        r = self.rangee(0.55)
        self.play(VGroup(ech, curseur, q).animate.set_opacity(0.55),
                  LaggedStart(*[FadeIn(f, shift=DOWN * 0.3) for f in r], lag_ratio=0.12), run_time=0.8)
        self.au_mot("TOUTES")
        acc = Brace(r, DOWN, color=VERT_OK)
        toutes = self.t("TOUTES les issues", 44, VERT_OK).next_to(acc, DOWN, buff=0.15)
        self.play(GrowFromCenter(acc), FadeIn(toutes, scale=0.7), run_time=0.45)
        self.insister(toutes[:6], 0.25)

        self.au_mot("Sans en oublier")
        trou = DashedVMobject(Square(1.0, stroke_color=ROUGE_ERREUR, stroke_width=4), num_dashes=16)
        trou.move_to(r[4])
        cinq = r[4]
        l1 = self.t("sans en oublier", 36, ROUGE_ERREUR).move_to(P(-0.6, -2.0))
        self.play(cinq.animate.shift(DOWN * 0.6).set_opacity(0), FadeIn(trou), FadeIn(l1, shift=UP * 0.1),
                  run_time=0.4)
        self.play(cinq.animate.shift(UP * 0.6).set_opacity(1), FadeOut(trou), run_time=0.4)

        self.au_mot("sans en compter deux fois")
        double = face_coach(3, 1.0).move_to(P(3.95, 0.55))
        l2 = self.t("sans en compter deux fois", 36, ROUGE_ERREUR).move_to(P(-0.6, -2.7))
        self.play(FadeIn(double, shift=LEFT * 0.4), FadeIn(l2, shift=UP * 0.1), Indicate(r[2], color=JAUNE_TITRE),
                  run_time=0.45)
        self.play(Create(self.barrer(double)), run_time=0.35)
        self.attendre_voix()

    # ── 04 : un événement ───────────────────────────────────────────────────

    def ecran_evenement(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-evenement")
        self.au_mot("Un événement")
        d1 = self.ligne([("un événement", BLEU_CALCUL), ("=", WHITE), ("une phrase", WHITE)], 46, 0.3)
        d1.move_to(P(-0.6, 2.75))
        self.play(FadeIn(d1, shift=UP * 0.15), run_time=0.5)
        carte, faces = carte_de(1.15, 0.22)
        carte.move_to(P(-3.5, -0.15))
        self.play(FadeIn(carte, scale=0.9), run_time=0.5)
        self.au_mot("obtenir un nombre pair")
        ev = self.etiquette("obtenir un nombre pair", BLEU_CALCUL, 38).move_to(P(2.2, 1.25))
        self.play(GrowFromCenter(ev), run_time=0.5)
        self.au_mot("On entoure")
        self.play(Indicate(ev, color=WHITE, scale_factor=1.06), run_time=0.5)
        cercles = VGroup()
        for ex, f in [("2, 4", 2), ("4 et", 4), ("et 6", 6)]:
            self.au_mot(ex)
            c = RoundedRectangle(width=1.5, height=1.5, corner_radius=0.3, stroke_color=VERT_OK,
                                 stroke_width=6).move_to(faces[f - 1])
            self.play(*surligner(faces[f - 1]), Create(c), run_time=0.3)
            self.play(faces[f - 1].animate.scale(1.25), run_time=0.15)
            self.play(faces[f - 1].animate.scale(1 / 1.25), run_time=0.15)
            cercles.add(c)
        self.play(*[faces[f - 1].animate.set_opacity(0.3) for f in (1, 3, 5)], run_time=0.3)
        self.au_mot("3 issues")
        trois = self.nb_issues(3, 60).move_to(P(2.3, -0.3))
        fl = Arrow(trois.get_left() + LEFT * 0.1, carte.get_right() + RIGHT * 0.05, buff=0.1, color=VERT_OK,
                   stroke_width=5, max_tip_length_to_length_ratio=0.25)
        self.play(FadeIn(trois, scale=0.6), GrowArrow(fl), run_time=0.45)
        self.insister(trois[0], 0.3)
        self.attendre_voix()

    # ── 05 : le piège de la roue ────────────────────────────────────────────

    def pastilles(self, couleurs, cote=0.42, buff=0.18):
        return VGroup(*[RoundedRectangle(width=cote, height=cote, corner_radius=0.08, fill_color=c, fill_opacity=1,
                                         stroke_color=ENCRE, stroke_width=2) for c in couleurs]).arrange(RIGHT, buff=buff)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège", 46)
        c = P(-3.3, -0.35)
        r, d, moyeu, pointe = roue5(c, r=1.7)
        self.play(FadeIn(r, scale=0.85), run_time=0.5)
        toupie = Toupie(self, d, c, 6.0)
        self.au_mot("3 couleurs")
        toupie.arreter(0.7)
        pas = self.pastilles([C_ROUGE, C_BLEU, C_JAUNE])
        l3 = VGroup(pas, self.ligne([("3", JAUNE_TITRE), ("couleurs", WHITE)], 50, 0.2)).arrange(RIGHT, buff=0.35)
        l3.move_to(P(2.3, 1.45))
        self.play(FadeIn(l3, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("5 parts")
        l5 = self.ligne([("5", JAUNE_TITRE), ("parts", WHITE)], 64, 0.25).move_to(P(2.3, 0.1))
        contours = VGroup(*[s.copy().set_fill(opacity=0).set_stroke(JAUNE_TITRE, 8) for s in d])
        self.play(FadeIn(l5, scale=0.6), LaggedStart(*[Create(k) for k in contours], lag_ratio=0.25), run_time=1.0)
        self.bring_to_front(moyeu, pointe)
        self.insister(l5[0], 0.3)
        self.au_mot("Les issues")
        iss = self.ligne([("les issues", VERT_OK), ("=", WHITE), ("les 5 parts", VERT_OK)], 40, 0.22)
        iss.move_to(P(2.4, -1.3))
        self.play(FadeIn(iss, shift=UP * 0.15), contours.animate.set_stroke(VERT_OK), run_time=0.5)
        ok = self.coche(taille=0.3).next_to(l5, RIGHT, buff=0.4)
        self.play(Create(ok), run_time=0.3)
        self.au_mot("pas les 3 couleurs")
        self.play(Create(self.barrer(l3)), l3.animate.set_opacity(0.5), run_time=0.45)
        self.attendre_voix()

    # ── 06 : défi, le sac de 3 billes ───────────────────────────────────────

    C_SAC = P(-3.2, -0.45)
    BILLES = [C_ROUGE, C_VERT, C_JAUNE]

    def le_sac(self):
        s = sac(self.C_SAC, 3.4, 2.4)
        billes = VGroup(*[bille6(c, 0.45).move_to(self.C_SAC + P(-1.0 + i, -0.15)) for i, c in enumerate(self.BILLES)])
        return s, billes

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 48, JAUNE_TITRE).to_edge(UP)), run_time=0.7)
        s, billes = self.le_sac()
        self.au_mot("Un sac")
        self.play(Create(s), run_time=0.5)
        for ex, b in zip(["une bille rouge", "une verte", "une jaune"], billes):
            self.au_mot(ex)
            self.play(FadeIn(b, shift=DOWN * 0.5, scale=0.4), run_time=0.35)
        self.au_mot("On en tire une")
        mystere = VGroup(bille6(GREY_D, 0.45), Text("?", font_size=40, color=WHITE, weight=BOLD))
        mystere[1].move_to(mystere[0])
        mystere.move_to(self.C_SAC)
        self.play(FadeIn(mystere, scale=0.5), run_time=0.2)
        self.play(mystere.animate.move_to(self.C_SAC + P(0, 2.25)), run_time=0.6, rate_func=rate_functions.ease_out_back)
        x = 2.0
        self.au_mot("Liste les issues")
        q1 = self.t("Liste les issues.", 44, WHITE).move_to(P(x, 1.0))
        self.play(FadeIn(q1, shift=LEFT * 0.2), run_time=0.45)
        self.au_mot("Combien")
        q2 = self.t("Combien y en a-t-il ?", 42, ORANGE_RETENUE).move_to(P(x, -0.2))
        self.play(FadeIn(q2, scale=0.7), run_time=0.45)
        self.pulser([mystere], 1.25, 0.25)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=42)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction", 46)
        s, billes = self.le_sac()
        self.add(s, billes)
        noms = [("Rouge", C_ROUGE), ("verte", C_VERT), ("jaune", C_JAUNE)]
        cibles = [P(0.6 + 1.6 * i, 1.0) for i in range(3)]
        lbls = VGroup()
        for (mot, coul), b, cb in zip(noms, billes, cibles):
            self.au_mot(mot)
            lbl = self.t(mot.lower(), 36, coul).move_to(cb + DOWN * 0.8)
            self.play(b.animate.move_to(cb).scale(1.15), FadeIn(lbl, shift=UP * 0.1), run_time=0.35)
            lbls.add(lbl)
        self.au_mot("3 issues")
        groupe = VGroup(*billes, lbls)
        acc = Brace(groupe, DOWN, color=VERT_OK)
        trois = self.nb_issues(3, 62).next_to(acc, DOWN, buff=0.2)
        self.play(GrowFromCenter(acc), FadeIn(trois, scale=0.6), run_time=0.45)
        self.insister(trois[0], 0.3)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP)), run_time=0.7)
        textes = [
            [("Une issue", VERT_OK), ("est un résultat possible.", WHITE)],
            [("Je les liste", WHITE), ("toutes", JAUNE_TITRE), ("avant de calculer.", WHITE)],
            [("Un événement", BLEU_CALCUL), ("est réalisé par certaines issues.", WHITE)],
        ]
        lignes = VGroup(*[VGroup(self.coche(taille=0.25), self.ligne(m, 42, 0.22)).arrange(RIGHT, buff=0.3)
                          for m in textes]).arrange(DOWN, aligned_edge=LEFT, buff=0.8)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.6, 0.6))
        for ex, l in zip(["Une issue est", "Je les liste", "Un événement est"], lignes):
            self.au_mot(ex)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("L'épisode 4")
        self.play(Write(self.chute("L'épisode 4 t'attend : estimer une probabilité.", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── 08 : abonnement (rien qui ne soit dit) ──────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        self.au_mot("va sur le coach")
        entraine = self.t("Va sur le coach", 50, JAUNE_TITRE).move_to(P(0, 2.05))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("sur éleveai")
        site = self.t("eleveai.fr", 60, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        abonne = self.t("Abonne-toi à la chaîne !", 46, VERT_OK).move_to(P(0, -0.7))
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.5)
        self.play(Flash(abonne, color=VERT_OK, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_issue()
        self.ecran_lister()
        self.ecran_evenement()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
