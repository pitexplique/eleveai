# proba_hasard.py
# EleveAI — Maths CM1 — série « Probabilités », épisode 2 : c'est quoi, le
# hasard ? (micro : probabilite_hasard), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Short jumeau : proba_hasard_short.py (le dé qui fait 6 trois fois).
#
# ⭐ Les figures sont CELLES DU COACH (ProbabilitesCanvas.tsx, banque
# cm1/maths/probabilites.bank.ts, micro probabilite_hasard) :
#   · roueSimpleCanvas() : roue à 4 parts égales Rouge / Bleu / Vert / Jaune,
#     départ en haut dans le sens des aiguilles, étiquettes blanches cerclées de
#     noir, moyeu noir, flèche noire en haut ;
#   · deCanvas() : les 6 faces du dé en grille 3 × 2, faces blanches cerclées
#     de noir, points noirs ; une face « surlignée » passe en ambre.
# Les deux sont posées sur la carte blanche du coach. ⛔ PAS D'ÉCART (17/10) :
# toute information NÉCESSAIRE est dite (un malvoyant n'a que la voix) ; un
# écrit non dit n'est toléré que s'il est redondant (étiquettes, décor).
#
# Écrans : 00 garde · 01 la roue de la kermesse · 02 le hasard (dé, chapeau,
# pile ou face) · 03 pas le hasard (5 + 3 = 8, le soleil) · 04 la méthode (oui /
# non) · 05 le piège (6, 6, 6… et le dé n'a pas de mémoire) · 06 défi (carte /
# élèves) · 06b correction · 07 ce que tu as appris · 08 abonnement.
#
# Voix : manim/voix/cm1-proba-hasard.json (débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/cm1/proba_hasard.py ProbaHasardCM1 -o eleveai-maths-cm1-proba-hasard --media_dir manim/scripts/cm1/media
# Puis copier le mp4 dans manim/sorties/cm1/maths/probabilites/02-hasard/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import de, de_qui_roule, piece_qui_tourne  # noqa: E402

# les couleurs du coach (COULEURS de la banque, ProbabilitesCanvas.tsx)
C_ROUGE, C_BLEU, C_VERT, C_JAUNE = "#ef4444", "#3b82f6", "#22c55e", "#eab308"
C_NOIR = "#0f172a"
C_FACE = "#f8fafc"
C_AMBRE_FOND, C_AMBRE_BORD = "#fde68a", "#f59e0b"  # l'ambre du coach, un ton plus franc pour la vidéo
C_CARTE_BORD = "#e2e8f0"
GRIS_ETEINT = "#6B7280"

# les points du dé du coach, sur une face de 100 × 100 (pointsDe)
POINTS_COACH = {
    1: [(50, 50)],
    2: [(30, 30), (70, 70)],
    3: [(30, 30), (50, 50), (70, 70)],
    4: [(30, 30), (70, 30), (30, 70), (70, 70)],
    5: [(30, 30), (70, 30), (50, 50), (30, 70), (70, 70)],
    6: [(30, 28), (70, 28), (30, 50), (70, 50), (30, 72), (70, 72)],
}


class NotionCM1(Notion6e):
    identite = "Maths CM1 — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les figures du coach ────────────────────────────────────────────────────

def carte_coach(w, h):
    """La carte blanche sur laquelle le coach pose ses figures."""
    return RoundedRectangle(width=w, height=h, corner_radius=0.22, fill_color=WHITE, fill_opacity=1,
                            stroke_color=C_CARTE_BORD, stroke_width=2)


def face_coach(face, cote=1.0, active=False):
    """Une face du dé du coach : carré arrondi, contour noir, points noirs ;
    ambre quand elle est « surlignée »."""
    k = cote / 100
    corps = RoundedRectangle(width=84 * k, height=84 * k, corner_radius=16 * k,
                             fill_color=C_AMBRE_FOND if active else C_FACE, fill_opacity=1,
                             stroke_color=C_NOIR, stroke_width=3)
    pts = VGroup(*[Dot(P((x - 50) * k, (50 - y) * k), radius=6 * k, color=C_NOIR)
                   for x, y in POINTS_COACH[face]])
    bord = RoundedRectangle(width=cote, height=cote, corner_radius=0.12 * cote,
                            stroke_color=C_AMBRE_BORD if active else "#cbd5e1", stroke_width=3)
    return VGroup(bord, corps, pts)


def grille_de_coach(cote=0.95, gap=0.22):
    """deCanvas() : les 6 faces en grille 3 × 2 sur la carte blanche.
    Renvoie (carte, faces)."""
    faces = VGroup(*[face_coach(f, cote) for f in range(1, 7)])
    faces.arrange_in_grid(rows=2, cols=3, buff=gap)
    fond = carte_coach(faces.width + 0.5, faces.height + 0.5).move_to(faces)
    return fond, faces


def allumer(face, oui=True):
    """Passe une face de la grille en ambre (surlignée) ou la rend blanche."""
    face[0].set_stroke(C_AMBRE_BORD if oui else "#cbd5e1")
    face[1].set_fill(C_AMBRE_FOND if oui else C_FACE)
    return face


SEGMENTS = [("Rouge", C_ROUGE), ("Bleu", C_BLEU), ("Vert", C_VERT), ("Jaune", C_JAUNE)]


def roue_coach(r=1.4, police=24):
    """roueSimpleCanvas() : 4 parts égales, la première part en haut à droite
    (départ à midi, sens des aiguilles). Renvoie (roue qui tourne, moyeu + flèche)."""
    parts = VGroup()
    for i, (nom, coul) in enumerate(SEGMENTS):
        a0 = PI / 2 - i * PI / 2  # midi, puis 3 h, 6 h, 9 h
        sect = Sector(radius=r, angle=-PI / 2, start_angle=a0,
                      fill_color=coul, fill_opacity=1, stroke_color=C_NOIR, stroke_width=3)
        am = a0 - PI / 4
        if not police:  # roue trop petite : les couleurs suffisent
            parts.add(VGroup(sect))
            continue
        lbl = Text(nom, font_size=police, color=WHITE, weight=BOLD)
        lbl.set_stroke(C_NOIR, width=3, background=True)
        lbl.move_to(P(0.62 * r * math.cos(am), 0.62 * r * math.sin(am)))
        parts.add(VGroup(sect, lbl))
    k = 1.6 * r / 86.4  # le coach : rayon 86,4 ; flèche de 8 au-dessus à 12 en dedans
    moyeu = Dot(ORIGIN, radius=7 * k / 1.3, color=C_NOIR)
    fleche = Polygon(P(0, r + 8 * k), P(-8 * k, r - 12 * k), P(8 * k, r - 12 * k),
                     fill_color=C_NOIR, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    return parts, VGroup(moyeu, fleche)


def tourner_de(roue, centre, d):
    """Tourne la roue de d (sens des aiguilles) ; les étiquettes restent DROITES,
    comme sur le coach."""
    roue.rotate(-d, about_point=centre)
    for part in roue:
        if len(part) > 1:
            part[1].rotate(d)


def roue_sur_carte(centre, r=1.4, police=24):
    """La roue du coach posée sur sa carte. Renvoie (carte, roue, fixe)."""
    roue, fixe = roue_coach(r, police)
    fond = carte_coach(2 * r + 0.7, 2 * r + 0.9)
    groupe = VGroup(fond, roue, fixe)
    fond.move_to(P(0, 0.12))
    groupe.shift(centre)
    return fond, roue, fixe


# ── les autres dessins ──────────────────────────────────────────────────────

def chapeau(s=1.0):
    """Un chapeau haut-de-forme, vu de face, ouverture en haut, et ses papiers pliés."""
    corps = Polygon(P(-0.55, -0.55), P(0.55, -0.55), P(0.48, 0.45), P(-0.48, 0.45),
                    fill_color="#1F2937", fill_opacity=1, stroke_color=WHITE, stroke_width=2.5)
    ruban = Rectangle(width=1.08, height=0.2, fill_color=ROUGE_ERREUR, fill_opacity=1,
                      stroke_width=0).move_to(P(0, -0.3))
    bord = Ellipse(width=1.6, height=0.32, fill_color="#111827", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=2.5).move_to(P(0, 0.48))
    trou = Ellipse(width=0.9, height=0.16, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to(P(0, 0.5))
    return VGroup(corps, ruban, bord, trou).scale(s)


def papier(s=1.0, angle=0.0):
    f = Rectangle(width=0.42, height=0.28, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=1.5)
    pli = Line(P(-0.21, 0), P(0.21, 0), stroke_color=GREY_B, stroke_width=1.5)
    return VGroup(f, pli).scale(s).rotate(angle)


def dos_de_carte(w=1.0, h=1.45):
    fond = RoundedRectangle(width=w, height=h, corner_radius=0.08, fill_color="#1E3A8A", fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2.5)
    motif = RoundedRectangle(width=w - 0.2, height=h - 0.2, corner_radius=0.06, stroke_color=BLEU_CALCUL,
                             stroke_width=2.5).move_to(fond)
    losange = Square(0.32, stroke_color=BLEU_CALCUL, stroke_width=2.5).rotate(PI / 4).move_to(fond)
    return VGroup(fond, motif, losange)


def eleve(couleur, s=1.0):
    """Un élève tout simple : une tête, un buste."""
    tete = Circle(radius=0.17, fill_color="#F5D0A9", fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    buste = RoundedRectangle(width=0.5, height=0.42, corner_radius=0.16, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=1.5).move_to(P(0, -0.36))
    return VGroup(buste, tete).scale(s)


def classe(s=1.0):
    """Une petite classe : 3 rangées de 4 élèves (le nombre n'est jamais dit)."""
    couls = [C_ROUGE, C_BLEU, C_VERT, C_JAUNE, ORANGE_RETENUE, VIOLET_ACCENT]
    g = VGroup()
    for i in range(3):
        for j in range(4):
            g.add(eleve(couls[(i * 4 + j) % len(couls)], s).move_to(P((j - 1.5) * 0.62 * s, -i * 0.78 * s)))
    return g


def soleil(r=0.5):
    disque = Circle(radius=r, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(0, r + 0.1), P(0, r + 0.35), stroke_width=5, color=JAUNE_TITRE)
                      .rotate(k * TAU / 12, about_point=ORIGIN) for k in range(12)])
    return VGroup(rayons, disque)


def de_coach_qui_roule(centre, cote=1.2, periode=0.2, faces=None):
    """Le dé du coach qui roule SANS FIN (updater) : la face change, il tangue."""
    faces = faces or [3, 5, 2, 6, 1, 4]
    etat = {"t": 0.0}
    holder = VGroup(face_coach(faces[0], cote).move_to(centre))

    def maj(m, dt):
        etat["t"] += dt
        k = int(etat["t"] / periode)
        ang = 0.35 * math.sin(etat["t"] * 9)
        saut = 0.12 * abs(math.sin(etat["t"] * 9))
        m.remove(*m.submobjects)
        m.add(face_coach(faces[k % len(faces)], cote).rotate(ang).move_to(centre + UP * saut))

    holder.add_updater(maj)
    return holder


class ProbaHasardCM1(NotionCM1):
    nom_voix = "cm1-proba-hasard"
    XC = -0.6  # le centre de la zone utile (Ti-Margo occupe le coin bas-droit)

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

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def etiquette(self, texte, color, font_size=34, fg=BLACK):
        lbl = self.t(texte, font_size, fg)
        fond = RoundedRectangle(width=lbl.width + 0.45, height=lbl.height + 0.32, corner_radius=0.14,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def cadre(self, x, y, w=3.0, h=2.6):
        return RoundedRectangle(width=w, height=h, corner_radius=0.18, stroke_color=BLEU_CALCUL,
                                stroke_width=3, fill_color="#0F172A", fill_opacity=0.6).move_to(P(x, y))

    def arreter_roue(self, roue, etat, centre, run_time=2.2):
        """La roue ralentit et s'arrête au MILIEU d'une part, sous la flèche."""
        roue.clear_updaters()
        tour = etat.get("angle", 0.0)
        cible = tour + 2 * PI
        cible = cible + ((PI / 4 - cible) % (PI / 2))  # milieu d'une part sous la flèche
        fait = {"a": 0.0}

        def pas(m, alpha):
            a = (cible - tour) * alpha
            tourner_de(m, centre, a - fait["a"])
            fait["a"] = a

        self.play(UpdateFromAlphaFunc(roue, pas), run_time=run_time, rate_func=rate_functions.ease_out_cubic)
        etat["angle"] = cible

    def tourner(self, roue, centre, vitesse=7.0):
        etat = {"v": vitesse, "angle": 0.0}

        def maj(m, dt):
            d = etat["v"] * dt
            etat["angle"] += d
            tourner_de(m, centre, d)

        roue.add_updater(maj)
        return etat

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("C'est quoi, le hasard ?", 60, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("blanche").move_to(P(self.XC, -2.75))
        centre = P(self.XC, 0.0)
        fond, roue, fixe = roue_sur_carte(centre, 1.05, None)
        etat = self.tourner(roue, centre, 7.0)
        self.add(fond, roue, fixe)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.attendre_voix(marge=0.8)
        roue.clear_updaters()

    # ── 01 : la roue de la kermesse ─────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("À la kermesse", 48)
        centre = P(-3.3, -0.35)
        fond, roue, fixe = roue_sur_carte(centre, 1.75, 26)  # noms redondants (couleurs) : tolérés
        self.play(FadeIn(VGroup(fond, roue, fixe), scale=0.9), run_time=0.6)
        self.au_mot("la roue tourne")
        etat = self.tourner(roue, centre, 7.5)
        self.au_mot("Personne ne sait")
        q = self.t("?", 150, ORANGE_RETENUE).move_to(P(1.2, 0.5))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.insister(q, 0.35)
        self.au_mot("Pas même celui")
        lanceur = eleve(C_BLEU, 2.2).move_to(P(3.4, -0.7))
        q2 = self.t("?", 80, ORANGE_RETENUE).next_to(lanceur, UP, buff=0.2)
        self.play(FadeIn(lanceur, shift=LEFT * 0.3), run_time=0.4)
        self.play(FadeIn(q2, scale=0.5), Wiggle(lanceur), run_time=0.6)
        self.arreter_roue(roue, etat, centre, 2.4)
        self.play(Indicate(fixe[1], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le hasard ──────────────────────────────────────────────────────

    def ecran_hasard(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-hasard")
        self.titre_ecran("Le hasard", 48)
        l1 = self.ligne([("On ne peut pas savoir à l'avance", WHITE), ("→ le hasard", VERT_OK)], 36, 0.3)
        l1.move_to(P(self.XC, 2.35))
        self.au_mot("on ne peut pas savoir")
        self.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.6)
        self.au_mot("c'est le hasard")
        self.play(FadeIn(l1[1], shift=LEFT * 0.2), run_time=0.4)
        self.insister(l1[1], 0.3)

        xs, y = [-4.4, -0.75, 2.9], -0.25
        cadres = [self.cadre(x, y, 3.1, 2.7) for x in xs]
        noms = ["un dé", "un chapeau", "pile ou face"]
        lbls = [self.t(n, 32, JAUNE_TITRE).next_to(c, DOWN, buff=0.18) for n, c in zip(noms, cadres)]

        self.au_mot("Lancer un dé")
        dv = de_coach_qui_roule(P(xs[0], y), 1.3)
        self.play(FadeIn(cadres[0]), FadeIn(lbls[0]), run_time=0.4)
        self.add(dv)

        self.au_mot("tirer un papier")
        ch = chapeau(1.15).move_to(P(xs[1], y - 0.45))
        pap = papier(1.6, 0.0).move_to(P(xs[1], y - 0.2))
        self.play(FadeIn(cadres[1]), FadeIn(lbls[1]), FadeIn(ch), run_time=0.4)
        self.add_foreground_mobject(ch)
        self.add(pap)
        self.play(pap.animate.move_to(P(xs[1], y + 0.75)).rotate(0.4), run_time=0.6,
                  rate_func=rate_functions.ease_out_back)
        rond = self.t("?", 40, BLACK).move_to(pap)
        self.play(FadeIn(rond), run_time=0.2)

        self.au_mot("pile ou face")
        pc = piece_qui_tourne(P(xs[2], y), 0.85)
        self.play(FadeIn(cadres[2]), FadeIn(lbls[2]), run_time=0.4)
        self.add(pc)

        self.au_mot("face : c'est le hasard")
        self.play(*[c.animate.set_stroke(VERT_OK, 6) for c in cadres], run_time=0.5)
        ch_ = self.chute("C'est le hasard !", color=VERT_OK, font_size=44)
        self.play(Write(ch_), run_time=0.7)
        self.attendre_voix()
        dv.clear_updaters()
        pc.clear_updaters()
        self.remove_foreground_mobject(ch)

    # ── 03 : pas le hasard ──────────────────────────────────────────────────

    def ecran_pas_hasard(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-pas-hasard")
        self.titre_ecran("Pas le hasard", 48)
        cg = self.cadre(-3.4, 0.2, 5.0, 4.2)
        cd = self.cadre(2.3, 0.2, 5.0, 4.2)
        self.add(cg, cd)
        self.au_mot("5 plus 3")
        calc = self.ligne([("5 + 3", WHITE), ("= 8", JAUNE_TITRE)], 66, 0.3).move_to(P(-3.4, 0.9))
        self.play(FadeIn(calc[0], scale=0.7), run_time=0.5)
        self.au_mot("ça fait 8")
        self.play(FadeIn(calc[1], shift=LEFT * 0.2), run_time=0.4)
        self.insister(calc[1], 0.3)
        self.au_mot("Ce n'est pas le hasard")
        e1 = self.etiquette("pas le hasard", ROUGE_ERREUR, 34, WHITE).move_to(P(-3.4, -0.9))
        self.play(GrowFromCenter(e1), run_time=0.4)

        self.au_mot("Le soleil se lève")
        horizon = Line(P(0.0, 0.0), P(4.6, 0.0), stroke_width=4, color=VERT_OK)
        sol = Rectangle(width=4.6, height=1.3, fill_color="#14532D", fill_opacity=1, stroke_width=0)
        sol.next_to(horizon, DOWN, buff=0)
        so = soleil(0.5).move_to(P(2.3, -0.4))
        self.add(so, sol, horizon)
        self.play(so.animate.move_to(P(2.3, 1.15)), run_time=1.3, rate_func=rate_functions.ease_out_sine)
        self.au_mot("pas le hasard non plus")
        e2 = self.etiquette("pas le hasard", ROUGE_ERREUR, 34, WHITE).move_to(P(2.3, -0.9))
        self.play(GrowFromCenter(e2), run_time=0.4)
        self.play(e1.animate.scale(1.2), e2.animate.scale(1.2), run_time=0.3)
        self.play(e1.animate.scale(1 / 1.2), e2.animate.scale(1 / 1.2), run_time=0.3)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("Pour savoir", 48)
        self.au_mot("est-ce que je peux")
        q = self.etiquette("Je peux connaître le résultat avant ?", BLEU_CALCUL, 38, WHITE).move_to(P(self.XC, 2.0))
        self.play(GrowFromCenter(q), run_time=0.6)
        self.insister(q, 0.3)
        xg, xd = -3.6, 2.4
        self.au_mot("Si oui")
        oui = self.t("oui", 56, WHITE).move_to(P(xg, 0.35))
        fg = Arrow(q.get_bottom() + LEFT * 1.2, oui.get_top(), buff=0.1, color=WHITE, stroke_width=5)
        self.play(GrowArrow(fg), FadeIn(oui, scale=0.6), run_time=0.5)
        self.au_mot("ce n'est pas le hasard")
        v1 = self.etiquette("pas le hasard", ROUGE_ERREUR, 36, WHITE).next_to(oui, DOWN, buff=0.35)
        self.play(GrowFromCenter(v1), run_time=0.5)
        self.au_mot("Si non")
        non = self.t("non", 56, WHITE).move_to(P(xd, 0.35))
        fd = Arrow(q.get_bottom() + RIGHT * 1.2, non.get_top(), buff=0.1, color=WHITE, stroke_width=5)
        self.play(GrowArrow(fd), FadeIn(non, scale=0.6), run_time=0.5)
        self.au_mot("c'est le hasard")
        v2 = self.etiquette("le hasard", VERT_OK, 36).next_to(non, DOWN, buff=0.35)
        dv = de_coach_qui_roule(v2.get_bottom() + DOWN * 0.95, 1.0)
        self.play(GrowFromCenter(v2), run_time=0.4)
        self.add(dv)
        self.insister(v2, 0.3)
        self.attendre_voix()
        dv.clear_updaters()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège", 48)
        six = VGroup(*[face_coach(6, 1.25).move_to(P(-4.7 + 1.55 * i, 1.5)) for i in range(3)])
        self.au_mot("j'ai fait 6")
        for d in six:
            self.play(FadeIn(d, shift=DOWN * 0.4, scale=0.6), run_time=0.3)
        self.au_mot("trois fois de suite")
        trois = self.ligne([("3 fois", JAUNE_TITRE), ("de suite", WHITE)], 40, 0.2).next_to(six, DOWN, buff=0.35)
        self.play(FadeIn(trois, shift=UP * 0.15), run_time=0.4)
        self.insister(trois[0], 0.3)
        self.au_mot("Est-ce que le dé")
        dv = de_coach_qui_roule(P(1.3, 1.5), 1.25, periode=0.15)
        fl = Arrow(P(-0.8, 1.5), P(0.45, 1.5), buff=0, color=WHITE, stroke_width=5)
        self.play(GrowArrow(fl), run_time=0.3)
        self.add(dv)
        self.au_mot("encore faire 6")
        s6 = self.t("6 ?", 80, ORANGE_RETENUE).move_to(P(3.1, 1.5))
        self.play(FadeIn(s6, scale=0.5), run_time=0.4)
        self.au_mot("On ne sait pas")
        ns = self.t("On ne sait pas !", 44, ORANGE_RETENUE).move_to(P(1.9, 0.15))
        self.play(FadeIn(ns, shift=UP * 0.15), run_time=0.4)
        self.insister(s6, 0.3)
        self.au_mot("Le dé n'a pas de mémoire")
        fond, faces = grille_de_coach(0.72, 0.18)
        grille = VGroup(fond, faces).move_to(P(-3.4, -1.55))
        self.play(FadeIn(grille, shift=UP * 0.2), run_time=0.4)
        for f in faces:  # les 6 faces s'allument : chacune peut sortir
            self.play(f[0].animate.set_stroke(C_AMBRE_BORD), f[1].animate.set_fill(C_AMBRE_FOND),
                      run_time=0.15)
        ch = self.t("Le dé n'a pas de mémoire.", 38, BLEU_CALCUL).move_to(P(1.9, -1.55))
        self.play(Write(ch), run_time=0.8)
        self.attendre_voix()
        dv.clear_updaters()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    XG, XD, YD = -3.5, 2.2, 0.55

    def scene_defi(self):
        """Les deux situations : les cartes face cachée, la classe."""
        cg = self.cadre(self.XG, self.YD, 4.8, 3.6)
        cd = self.cadre(self.XD, self.YD, 4.8, 3.6)
        cartes = VGroup(*[dos_de_carte(0.95, 1.38).rotate(a).move_to(P(self.XG + dx, self.YD + 0.3 + dy))
                          for a, dx, dy in [(0.3, -0.75, -0.08), (0.0, 0.0, 0.05), (-0.3, 0.75, -0.08)]])
        lg = self.t("une carte, sans regarder", 26, JAUNE_TITRE).move_to(P(self.XG, self.YD - 1.35))
        cl = classe(0.9).move_to(P(self.XD, self.YD + 0.3))
        ld = self.t("compter les élèves", 26, JAUNE_TITRE).move_to(P(self.XD, self.YD - 1.35))
        return cg, cd, cartes, lg, cl, ld

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 48, JAUNE_TITRE).to_edge(UP)))
        cg, cd, cartes, lg, cl, ld = self.scene_defi()
        self.au_mot("Tirer une carte")
        self.play(FadeIn(cg), LaggedStart(*[FadeIn(c, shift=UP * 0.3) for c in cartes], lag_ratio=0.2),
                  FadeIn(lg), run_time=0.8)
        self.au_mot("Compter les élèves")
        self.play(FadeIn(cd), LaggedStart(*[FadeIn(e, scale=0.5) for e in cl], lag_ratio=0.06),
                  FadeIn(ld), run_time=1.0)
        self.au_mot("Lequel est le hasard")
        q = self.t("Lequel est le hasard ?", 46, WHITE).move_to(P(self.XC, -1.85))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.play(q[-7:-1].animate.set_color(VERT_OK), run_time=0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        self.titre_ecran("Correction", 48)
        cg, cd, cartes, lg, cl, ld = self.scene_defi()
        self.add(cg, cd, cartes, cl)
        self.au_mot("Tirer une carte")
        self.play(FadeIn(lg), run_time=0.4)
        self.au_mot("c'est le hasard")
        self.play(cg.animate.set_stroke(VERT_OK, 6), cartes[1].animate.shift(UP * 0.35), run_time=0.5)
        e1 = self.etiquette("le hasard", VERT_OK, 38).move_to(P(self.XG, -1.85))
        self.play(GrowFromCenter(e1), run_time=0.4)
        self.insister(e1, 0.3)
        self.au_mot("Compter les élèves, non")
        self.play(cd.animate.set_stroke(ROUGE_ERREUR, 6), FadeIn(ld), run_time=0.4)
        e2 = self.etiquette("non", ROUGE_ERREUR, 38, WHITE).move_to(P(self.XD, -1.85))
        self.play(GrowFromCenter(e2), run_time=0.4)
        self.au_mot("le nombre ne change pas")
        nb = self.t("le nombre ne change pas", 30, WHITE).next_to(e2, DOWN, buff=0.3)
        self.play(FadeIn(nb, shift=UP * 0.1),
                  LaggedStart(*[Indicate(e, color=JAUNE_TITRE, scale_factor=1.25) for e in cl], lag_ratio=0.08),
                  run_time=1.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP)))
        acquis = [("Le hasard, c'est", "Le hasard : on ne peut pas connaître le résultat à l'avance."),
                  ("Un dé n'a pas", "Un dé n'a pas de mémoire.")]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 40)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(self.XC, 1.75))
        centre = P(-3.0, -1.1)
        fond, roue, fixe = roue_sur_carte(centre, 0.85, None)
        fd, faces = grille_de_coach(0.6, 0.14)
        grille = VGroup(fd, faces).move_to(P(1.2, -1.0))
        self.au_mot(acquis[0][0])
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), FadeIn(VGroup(fond, roue, fixe)), run_time=0.6)
        self.tourner(roue, centre, 6.0)
        self.play(Create(lignes[0][0]), run_time=0.4)
        self.au_mot(acquis[1][0])
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), FadeIn(grille), run_time=0.6)
        self.play(Create(lignes[1][0]), run_time=0.4)
        for f in faces:
            self.play(f[0].animate.set_stroke(C_AMBRE_BORD), f[1].animate.set_fill(C_AMBRE_FOND), run_time=0.12)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("Épisode 3 : qui a le plus de chances ?", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)
        roue.clear_updaters()

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_hasard()
        self.ecran_pas_hasard()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
