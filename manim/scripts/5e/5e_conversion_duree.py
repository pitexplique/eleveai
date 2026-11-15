# 5e_conversion_duree.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode C2 : CONVERTIR UNE DURÉE
# (micro conversion_duree, notion grandeur_conversion), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : 5e-conversion-duree-short (le film trop long, 100 min = 1 h 40 min).
# Décor et métier : Léna, MONTEUSE DE FILMS (les scènes bout à bout ; centres cinema-series, musique).
# Mapping micro → écrans : 02 (1 h = 60 min, pas 100 ; 1 min = 60 s ; paquets de 60), 03 (135 min : 60 + 60 = 120,
# reste 15 → 2 h 15 min), 04 (méthode : paquets de 60 vers les heures ; heures × 60 + minutes vers les minutes ;
# 2 h 45 = 2 × 60 + 45 = 165 min), 06 (piège : 1 h 50 + 20 min ≠ 1 h 70 ; 70 min = 1 h 10 → 2 h 10),
# questions 05 (C : 150 min = 2 h 30 min) et 07 (B : 3 × 60 + 20 = 200 min),
# défi 08 (48 + 35 + 52 = 135 min = 2 h 15 min ; 2 h pile : couper 15 min).
# Fiche : lib/fiches/maths-5e-conversions.tsx.
# Voix : manim/voix/5e-conversion-duree.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_conversion_duree_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py conversion-duree).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_conversion_duree.py ConversionDuree5e
# Sortie finale : manim/sorties/5e/maths/conversion/02-duree/eleveai-maths-5e-conversion-duree.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

HEURE_C, HEURE2_C = "#38bdf8", "#0ea5e9"   # un paquet de 60 minutes (bleu)
RESTE_C = "#fb923c"                         # les minutes qui restent (orange)
CADRAN_C = "#1e293b"                        # le fond d'un cadran
RUBAN_C = "#475569"                         # la pellicule encore entière
SCENES = ["#f472b6", "#a78bfa", "#2dd4bf", "#facc15", "#fb923c"]   # les scènes de Léna


def secteur(a0, a1, r, o, couleur):
    """Les minutes a0 → a1 d'un cadran de 60 minutes (rayon r, centre o), depuis midi, dans le sens des aiguilles."""
    a1 = max(a1, a0 + 0.05)
    return Sector(radius=r, angle=-(a1 - a0) / 60 * TAU, start_angle=PI / 2 - a0 / 60 * TAU, fill_color=couleur,
                  fill_opacity=0.95, stroke_width=0).shift(o)


def disque(n, r, o, couleur=HEURE_C, aiguilles=False):
    """Un cadran de 60 minutes : fond, n minutes coloriées, 12 traits, le contour (et les aiguilles si demandé).
    .fond .sec .traits .bord ; n = 0 : rien de colorié."""
    fond = Circle(radius=r, fill_color=CADRAN_C, fill_opacity=1, stroke_width=0).move_to(o)
    sec = secteur(0, n, r, o, couleur) if n > 0 else VGroup()
    traits = VGroup(*[Line(o + r * 0.8 * np.array([np.cos(a), np.sin(a), 0]),
                           o + r * 0.97 * np.array([np.cos(a), np.sin(a), 0]), color=WHITE, stroke_width=3)
                      for a in [k * TAU / 12 for k in range(12)]])
    bord = Circle(radius=r, stroke_color=WHITE, stroke_width=5, fill_opacity=0).move_to(o)
    g = VGroup(fond, sec, traits, bord)
    if aiguilles:
        g.add(Line(o, o + UP * r * 0.78, color=WHITE, stroke_width=6),
              Line(o, o + RIGHT * r * 0.5, color=WHITE, stroke_width=8), Dot(o, radius=0.06, color=WHITE))
    g.fond, g.sec, g.traits, g.bord, g.r, g.o = fond, sec, traits, bord, r, o
    return g


def pellicule(w, h, couleur, trous="#0f172a"):
    """Un morceau de pellicule : une bande de couleur percée en haut et en bas."""
    corps = Rectangle(width=w, height=h, fill_color=couleur, fill_opacity=1, stroke_color="#0f172a", stroke_width=3)
    c = h * 0.13
    n = max(1, int(w / 0.22))
    pas = w / n
    tr = VGroup()
    for k in range(n):
        x = -w / 2 + pas * (k + 0.5)
        for y in (h / 2 - c * 0.95, -h / 2 + c * 0.95):
            tr.add(Square(side_length=c, fill_color=trous, fill_opacity=1, stroke_width=0).move_to(P(x, y)))
    g = VGroup(corps, tr)
    g.corps = corps
    return g


def libre(m):
    """N'attend aucun mot (la synchro par jetons attendait le mot porteur suivant) ; l'audit reste actif."""
    for f in m.get_family():
        f.sans_synchro = True
    return m


class ConversionDuree5e(Paysage5e):
    nom_voix = "5e-conversion-duree"
    fichier_marques = "5e_conversion_duree_marques.json"
    ceinture = "verte"

    def col(self, mob, y, xl=None):
        """col() du commun, qui signale une ligne RÉTRÉCIE (au-delà de 6,7 : elle était réduite en silence)."""
        w = mob.width
        r = super().col(mob, y, xl)
        if r.width < w - 1e-3:
            print(f"RETRECI {getattr(self, '_cle_voix', '?')} {w:.2f} -> {r.width:.2f}", flush=True)
        return r

    def couper_finale(self, lg, morceaux, fs):
        """Une ligne de la finale en morceaux côte à côte, chacun à son mot (deux nombres dits à 0,7 s d'écart)."""
        bloc = lg[1]
        old = bloc.submobjects[0]
        k = old.height / self.t(old.original_text, fs).height
        new = aligner_base(VGroup(*[self.t(m, fs) for m in morceaux]).arrange(RIGHT, buff=0.2))
        new.scale(k).align_to(old, LEFT).align_to(old, DOWN)
        bloc.submobjects = list(new.submobjects)

    def pause_defi(self, y=-2.35, marge=2.0, x=-0.6):
        """« Mets pause, et cherche ! » calé sur la colonne du défi (x = −0,6) : par col() il était rétréci de 21 %."""
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), x, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def etiquette(self, s, fs=26, couleur=WHITE):
        """Une étiquette de figure, hors audit (nombre déjà dit, ou lu sur la figure)."""
        return hors_audit(self.t(s, fs, couleur))

    def balayer(self, d, a0, a1, couleur=HEURE_C, run_time=0.8):
        """Colorie les minutes a0 → a1 du cadran d, l'aiguille qui tourne (les traits et le contour restent devant)."""
        tr = ValueTracker(a0 + 0.05)
        s = always_redraw(lambda: secteur(a0, tr.get_value(), d.r, d.o, couleur))
        haut = VGroup(d.traits.copy(), d.bord.copy())
        self.add(s, haut)
        self.play(tr.animate.set_value(a1), run_time=run_time, rate_func=linear)
        s.clear_updaters()
        self.remove(s, haut, tr)
        fin = secteur(a0, a1, d.r, d.o, couleur)
        d.submobjects.insert(2, fin)  # dans le cadran : un Indicate du cadran ne le recouvre plus
        return fin

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Convertir une durée", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Convertir une durée")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Pourquoi une heure", "ne fait pas 100 minutes ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        d = disque(0, 1.25, P(3.9, 0.3), aiguilles=True)
        qm = self.t("?", 48, JAUNE_TITRE)
        hors_audit(qm)
        qm.next_to(d, RIGHT, buff=0.3)
        self.au_mot("Pourquoi une heure")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(d, scale=0.8), run_time=0.5)
        self.au_mot("100 minutes")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(qm, scale=1.3), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léna, monteuse de films ────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        le = lena(1.0).move_to(P(-5.25, 0.1))
        self.au_mot("Voici Léna")
        nom = self.t("Léna", 40, BLEU_CALCUL).next_to(le, UP, buff=0.25)
        self.play(FadeIn(le, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("monteuse de films")
        met = self.bloc(["monteuse", "de films"], 28, BLEU_CALCUL).next_to(le, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        largeurs = [1.5, 1.0, 1.9, 1.2, 1.4]
        frise = VGroup(*[pellicule(w, 0.9, c) for w, c in zip(largeurs, SCENES)]).arrange(RIGHT, buff=0)
        frise.move_to(P(0, 1.75)).align_to(P(-3.3, 0), LEFT)
        lf = self.t("Les scènes bout à bout", 32, WHITE).next_to(frise, UP, buff=0.3).align_to(frise, LEFT)
        self.au_mot("les scènes bout à bout")
        self.play(FadeIn(lf, shift=DOWN * 0.1),
                  LaggedStart(*[FadeIn(s, shift=RIGHT * 0.4) for s in frise], lag_ratio=0.25), run_time=1.0)
        l1 = self.ligne([("Son logiciel :", WHITE), ("en minutes", BLEU_CALCUL)], 36, buff=0.25)
        gauche(l1, -3.3, 0.25)
        self.au_mot("Son logiciel compte en minutes")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        l2 = self.ligne([("Le cinéma :", WHITE), ("en heures et minutes", JAUNE_TITRE)], 36, buff=0.25)
        gauche(l2, -3.3, -0.65)
        self.au_mot("le cinéma veut la durée")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("en heures et minutes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : 1 h = 60 min ; 1 min = 60 s ; paquets de 60 ───────────────────
    def ecran_soixante(self):
        self.ecran("02-soixante")
        dh = disque(0, 1.35, P(-3.9, 0.8))
        ds = disque(0, 0.72, P(-3.9, -2.1))
        eh = self.etiquette("1 heure", 28, BLEU_CALCUL).next_to(dh, UP, buff=0.2)
        es = self.etiquette("1 minute", 26, RESTE_C).next_to(ds, LEFT, buff=0.25)
        self.au_mot("Une heure")
        self.play(FadeIn(dh, scale=0.9), FadeIn(eh), run_time=0.4)
        l1 = self.ligne([("1 h", BLEU_CALCUL), ("= 60 min", BLEU_CALCUL)], 46, buff=0.25)
        hors_audit(l1[0])
        self.col(l1, 2.2)
        self.au_mot("60 minutes")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.balayer(dh, 0, 60, HEURE_C, 1.2)
        l2 = self.ligne([("Pas 100 :", ROUGE_ERREUR), ("60 !", VERT_OK)], 42, buff=0.25)
        self.col(l2, 1.2)
        self.au_mot("Pas 100")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("60.")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.3)
        l3 = self.ligne([("1 min", RESTE_C), ("= 60 s", RESTE_C)], 46, buff=0.25)
        hors_audit(l3[0])
        self.col(l3, -0.05)
        self.au_mot("une minute")
        self.play(FadeIn(ds, scale=0.9), FadeIn(es), run_time=0.4)
        self.au_mot("60 secondes")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.balayer(ds, 0, 60, RESTE_C, 1.0)
        res = self.gros("Par paquets de 60", fs=36)
        self.col(res, -1.3, 0.3)
        self.au_mot("60.", 2)
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 03 : 135 min = 60 + 60 + 15 = 2 h 15 min ───────────────────────────
    def ruban(self, total, u, x0, y, h=0.7):
        """La pellicule du film (total minutes, u unités par minute), bord gauche en x0."""
        r = pellicule(total * u, h, RUBAN_C)
        r.move_to(P(0, y)).align_to(P(x0, 0), LEFT)
        return r

    def morceau(self, a0, a1, u, x0, y, couleur, h=0.7):
        """Les minutes a0 → a1 de la pellicule, en couleur."""
        m = pellicule((a1 - a0) * u, h, couleur)
        m.move_to(P(x0 + (a0 + a1) / 2 * u, y))
        return m

    def ecran_paquets(self):
        self.ecran("03-paquets")
        u, x0, y = 4.7 / 135, -6.2, 2.3
        rub = self.ruban(135, u, x0, y)
        e135 = self.etiquette("135 min", 28, WHITE)
        sur_fond(e135).move_to(rub)
        l0 = self.ligne([("Le film :", WHITE), ("135 min", BLEU_CALCUL)], 38, buff=0.25)
        self.col(l0, 2.5)
        self.au_mot("135 minutes")
        self.play(FadeIn(rub, shift=RIGHT * 0.3), FadeIn(e135), FadeIn(l0, shift=UP * 0.1), run_time=0.5)
        l1 = self.t("Paquets de 60 :", 38, JAUNE_TITRE)
        self.col(l1, 1.6)
        self.au_mot("60 : 60")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        m1 = self.morceau(0, 60, u, x0, y, HEURE_C)
        m2 = self.morceau(60, 120, u, x0, y, HEURE2_C)
        m3 = self.morceau(120, 135, u, x0, y, RESTE_C)
        yd = 0.35
        d1 = disque(60, 0.72, P(-5.35, yd))
        d2 = disque(60, 0.72, P(-3.6, yd), HEURE2_C)
        d3 = disque(15, 0.72, P(-1.85, yd), RESTE_C)
        e1 = self.etiquette("60 min", 26, HEURE_C).next_to(d1, DOWN, buff=0.2)
        e2 = self.etiquette("60 min", 26, HEURE2_C).next_to(d2, DOWN, buff=0.2)
        e3 = self.etiquette("15 min", 26, RESTE_C).next_to(d3, DOWN, buff=0.2)
        l2 = self.ligne([("60", HEURE_C), ("+ 60", HEURE2_C), ("= 120", VERT_OK)], 42, buff=0.25)
        self.col(l2, 0.7)
        self.au_mot("60, et encore")
        self.play(FadeOut(e135), FadeIn(m1), FadeIn(d1, scale=0.8), FadeIn(e1), FadeIn(l2[0], shift=UP * 0.1),
                  run_time=0.45)
        self.au_mot("60, ça")
        self.play(FadeIn(m2), FadeIn(d2, scale=0.8), FadeIn(e2), FadeIn(l2[1], shift=UP * 0.1), run_time=0.45)
        self.au_mot("120.")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("Il reste", WHITE), ("15.", RESTE_C)], 42, buff=0.25)
        self.col(l3, -0.15)
        self.au_mot("15.")
        self.play(FadeIn(m3), FadeIn(d3, scale=0.8), FadeIn(e3), FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        l4 = self.ligne([("135 min", BLEU_CALCUL), ("= 2 h", VERT_OK), ("15 min", VERT_OK)], 38, buff=0.22)
        self.col(l4, -1.2, 0.2)
        self.au_mot("135 minutes,")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 heures et")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Indicate(VGroup(d1, d2), color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.4)
        self.au_mot("15 minutes.")
        cadre = SurroundingRectangle(l4, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.play(FadeIn(l4[2], shift=UP * 0.1), Create(cadre), Indicate(d3, color=JAUNE_TITRE, scale_factor=1.08),
                  run_time=0.45)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 40, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("En heures :", BLEU_CALCUL), ("des paquets de 60 minutes.", WHITE)], 34, buff=0.25)
        gauche(l1, -6.0, 2.15)
        self.au_mot("pour passer en heures")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("60 minutes.")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("En minutes :", RESTE_C), ("heures × 60,", WHITE), ("+ les minutes.", WHITE)], 34, buff=0.25)
        libre(l2[1])  # « heures » : la synchro attendait « 2 heures 45 »
        gauche(l2, -6.0, 1.35)
        self.au_mot("Pour passer en minutes")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("60, puis")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("ajoute les minutes")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.35)
        yd = -1.15
        d1 = disque(60, 0.66, P(-5.4, yd))
        d2 = disque(60, 0.66, P(-3.85, yd), HEURE2_C)
        d3 = disque(45, 0.66, P(-2.3, yd), RESTE_C)
        e1 = self.etiquette("1 h", 26, HEURE_C).next_to(d1, DOWN, buff=0.18)
        e2 = self.etiquette("1 h", 26, HEURE2_C).next_to(d2, DOWN, buff=0.18)
        e3 = self.etiquette("45 min", 26, RESTE_C).next_to(d3, DOWN, buff=0.18)
        xl = -0.9
        e_1 = self.t("2 h 45", 42, JAUNE_TITRE)
        self.col(e_1, -0.3, xl)
        self.au_mot("45, c'est")
        self.play(FadeIn(e_1, shift=UP * 0.1), FadeIn(VGroup(d1, d2, d3), scale=0.85), FadeIn(VGroup(e1, e2, e3)),
                  run_time=0.5)
        e_2 = self.ligne([("2 ×", BLEU_D), ("60", BLEU_D), ("= 120", VERT_OK)], 40, buff=0.2)
        self.col(e_2, -1.1, xl)
        self.au_mot("2 fois")
        self.play(FadeIn(e_2[0], shift=UP * 0.1), Indicate(VGroup(d1, d2), color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.35)
        self.au_mot("60, 120")
        self.play(FadeIn(e_2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("120, plus")
        self.play(FadeIn(e_2[2], shift=UP * 0.1), run_time=0.3)
        e_3 = self.ligne([("120", BLEU_D), ("+ 45", BLEU_D), ("= 165 min", VERT_OK)], 40, buff=0.2)
        hors_audit(e_3[0])
        self.col(e_3, -1.9, xl)
        self.au_mot("45 : 165")
        self.play(FadeIn(e_3[0], shift=UP * 0.1), FadeIn(e_3[1], shift=UP * 0.1),
                  Indicate(d3, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.35)
        self.au_mot("165 minutes")
        cadre = SurroundingRectangle(e_3, color=VERT_OK, buff=0.16, corner_radius=0.1, stroke_width=5)
        self.play(FadeIn(e_3[2], shift=UP * 0.1), Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u, x0, y = 4.7 / 150, -6.2, 2.25
        rub = self.ruban(150, u, x0, y, 0.8)
        e150 = self.etiquette("150 min", 30, WHITE)
        sur_fond(e150).move_to(rub)
        qm = self.etiquette("? h ? min", 38, JAUNE_TITRE).next_to(rub, DOWN, buff=0.3)

        def autres_q(sc):
            sc.play(FadeIn(rub, shift=RIGHT * 0.3), FadeIn(e150), FadeIn(qm), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["150 minutes, c'est", "combien d'heures", "et de minutes ?"],
                             [self.choix("1 h 50 min"), self.choix("2 h 50 min"), self.choix("2 h 30 min")], 2,
                             ["60 + 60 = 120.", "Il reste 30.", "2 h 30 min.", "1 h 50 :",
                              "compter 100 min", "dans une heure : faux."],
                             0.7, couper={0: ("60 + 60", "= 120."), 3: ("1 h", "50 :")},
                             mot_q="150", avant_q=autres_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        l1 = libre(self.t("Une heure ne contient que 60 minutes.", 34, WHITE))
        gauche(l1, -6.0, 2.2)
        self.au_mot("60 minutes. 1")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        yd, r = 0.55, 0.72
        d1 = disque(60, r, P(-5.3, yd))
        d2 = disque(50, r, P(-3.6, yd), HEURE2_C)
        d3 = disque(0, r, P(-1.9, yd))
        xl = 0.4
        c1 = self.ligne([("1 h", BLEU_CALCUL), ("50", HEURE2_C), ("+ 20 min", RESTE_C)], 42, buff=0.22)
        self.col(c1, 1.05, xl)
        self.au_mot("1 heure")
        self.play(FadeIn(c1[0], shift=UP * 0.1), FadeIn(d1, scale=0.85), run_time=0.3)
        self.au_mot("50 plus")
        self.play(FadeIn(c1[1], shift=UP * 0.1), FadeIn(d2, scale=0.85), FadeIn(d3, scale=0.85), run_time=0.3)
        self.au_mot("20 minutes")
        self.play(FadeIn(c1[2], shift=UP * 0.1), run_time=0.25)
        s2 = self.balayer(d2, 50, 60, RESTE_C, 0.45)
        s3 = self.balayer(d3, 0, 10, RESTE_C, 0.45)
        c2 = self.ligne([("pas 1 h", ROUGE_ERREUR), ("70 !", ROUGE_ERREUR)], 42, buff=0.22)
        self.col(c2, 0.2, xl)
        self.au_mot("1 heure 70")
        self.play(FadeIn(c2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("70 :")
        barre = Line(c2.get_left() + LEFT * 0.1, c2.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=6)
        self.play(FadeIn(c2[1], scale=1.2), run_time=0.3)
        self.play(Create(barre), run_time=0.3)
        c3 = self.ligne([("70 min", RESTE_C), ("= 1 h", VERT_OK), ("10", VERT_OK)], 42, buff=0.22)
        self.col(c3, -0.65, xl)
        self.au_mot("70 minutes")
        self.play(FadeIn(c3[0], shift=UP * 0.1), Indicate(VGroup(s2, s3), color=JAUNE_TITRE, scale_factor=1.06),
                  run_time=0.35)
        self.au_mot("1 heure 10")
        self.play(FadeIn(c3[1], shift=UP * 0.1), Indicate(d2, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.3)
        self.au_mot("10. Donc")
        self.play(FadeIn(c3[2], shift=UP * 0.1), Indicate(d3, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.3)
        res = self.ligne([("Donc 2 h", VERT_OK), ("10", VERT_OK)], 46, buff=0.22)
        self.col(res, -1.65, xl)
        e1 = self.etiquette("1 h", 28, HEURE_C).next_to(d1, DOWN, buff=0.2)
        e2 = self.etiquette("1 h", 28, HEURE2_C).next_to(d2, DOWN, buff=0.2)
        e3 = self.etiquette("10 min", 28, RESTE_C).next_to(d3, DOWN, buff=0.2)
        self.au_mot("2 heures 10")
        self.play(FadeIn(res[0], shift=UP * 0.1), FadeIn(e1), FadeIn(e2), run_time=0.3)
        self.au_mot("10.", 2)
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.play(FadeIn(res[1], shift=UP * 0.1), FadeIn(e3), Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        yd, r = 2.0, 0.6
        ds = VGroup(disque(60, r, P(-5.5, yd)), disque(60, r, P(-4.05, yd), HEURE2_C), disque(60, r, P(-2.6, yd)),
                    disque(20, r, P(-1.15, yd), RESTE_C))
        lab = self.etiquette("3 h 20 min", 34, JAUNE_TITRE).next_to(ds, DOWN, buff=0.3)

        def autres_q(sc):
            sc.play(FadeIn(ds, scale=0.9), FadeIn(lab), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["3 heures 20 minutes,", "c'est combien", "de minutes ?"],
                             [self.choix("320 min"), self.choix("200 min"), self.choix("180 min")], 1,
                             ["3 × 60 = 180.", "Plus 20 : 200 min."],
                             0.3, couper={0: ("3 × 60", "= 180."), 1: ("Plus 20 :", "200 min.")},
                             mot_q="3 heures", avant_q=autres_q, q_sans_audit=(0,))

    # ── 08 : le défi (le documentaire en trois parties) ─────────────────────
    def documentaire(self):
        """Les trois parties bout à bout (48, 35, 52 min), la pellicule de 5 unités pour 135 minutes."""
        u, x0, y = 5.0 / 135, -6.2, 0.6
        p1 = self.morceau(0, 48, u, x0, y, SCENES[0])
        p2 = self.morceau(48, 83, u, x0, y, SCENES[1])
        p3 = self.morceau(83, 135, u, x0, y, SCENES[2])
        return p1, p2, p3, u, x0, y

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        p1, p2, p3, u, x0, y = self.documentaire()
        x = -0.6
        l0 = self.bloc(["Léna monte un documentaire", "en trois parties :"], 32)
        self.col(l0, 1.95, x)
        self.au_mot("Léna monte un documentaire")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("en trois parties")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("48 min,", SCENES[0]), ("35 min", SCENES[1]), ("et 52 min.", SCENES[2])], 34, buff=0.22)
        self.col(l1, 0.95, x)
        k1 = self.etiquette("48 min", 24, SCENES[0]).next_to(p1, UP, buff=0.15)
        k2 = self.etiquette("35 min", 24, SCENES[1]).next_to(p2, UP, buff=0.15)
        k3 = self.etiquette("52 min", 24, SCENES[2]).next_to(p3, UP, buff=0.15)
        self.au_mot("48 minutes")
        self.play(FadeIn(p1, shift=RIGHT * 0.3), FadeIn(k1), FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("35 minutes")
        self.play(FadeIn(p2, shift=RIGHT * 0.3), FadeIn(k2), FadeIn(l1[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("52 minutes")
        self.play(FadeIn(p3, shift=RIGHT * 0.3), FadeIn(k3), FadeIn(l1[2], shift=UP * 0.1), run_time=0.4)
        l2 = self.t("Durée en heures et minutes ?", 34, JAUNE_TITRE)
        self.col(l2, 0.25, x)
        self.au_mot("Combien dure-t-il en heures et minutes")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("La chaîne de télé veut", WHITE), ("2 h pile.", VERT_OK)], 32, buff=0.2)
        libre(l3[1])
        self.col(l3, -0.45, x)
        xm = x0 + 120 * u
        marque = DashedLine(P(xm, y + 0.42), P(xm, y - 0.75), color=VERT_OK, stroke_width=5, dash_length=0.1)
        e2h = self.etiquette("2 h", 30, VERT_OK).next_to(marque, DOWN, buff=0.12)
        self.au_mot("La chaîne de télé veut")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("2 heures pile")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(marque), FadeIn(e2h), run_time=0.45)
        l4 = self.t("Combien de minutes couper ?", 34, JAUNE_TITRE)
        self.col(l4, -1.15, x)
        self.au_mot("Combien de minutes faut-il couper")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        p1, p2, p3, u, x0, y = self.documentaire()
        xm = x0 + 120 * u
        marque = DashedLine(P(xm, y + 0.42), P(xm, y - 0.75), color=VERT_OK, stroke_width=5, dash_length=0.1)
        e2h = self.etiquette("2 h", 30, VERT_OK).next_to(marque, DOWN, buff=0.12)
        self.add(p1, p2, p3, marque, e2h)
        x = -0.6
        l1 = self.ligne([("48", SCENES[0]), ("+ 35", SCENES[1]), ("+ 52", SCENES[2]), ("= 135 min", VERT_OK)], 38,
                        buff=0.2)
        self.col(l1, 2.2, x)
        self.au_mot("48 plus")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(p1, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.3)
        self.au_mot("35 plus")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(p2, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.3)
        self.au_mot("52")
        self.play(FadeIn(l1[2], shift=UP * 0.1), Indicate(p3, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.3)
        self.au_mot("135 minutes")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("C'est 2 h", VERT_OK), ("15 min.", VERT_OK)], 38, buff=0.2)
        self.col(l2, 1.35, x)
        self.au_mot("2 heures et")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("15 minutes.")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("Pour arriver à", WHITE), ("2 h pile :", VERT_OK)], 36, buff=0.2)
        libre(l3[1])
        self.col(l3, 0.45, x)
        self.au_mot("Pour arriver à")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 heures pile")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(marque, color=JAUNE_TITRE), run_time=0.35)
        trop = Rectangle(width=15 * u, height=0.7, fill_color=ROUGE_ERREUR, fill_opacity=0.75, stroke_color=WHITE,
                         stroke_width=3).move_to(P(x0 + 127.5 * u, y))
        e15 = self.etiquette("15 min", 26, ROUGE_ERREUR).next_to(trop, UP, buff=0.2)
        res = self.gros("Léna coupe 15 min.", fs=42)
        self.col(res, -0.65, x)
        self.au_mot("15 minutes.", 2)
        self.play(FadeIn(res, scale=1.2), FadeIn(trop), FadeIn(e15), run_time=0.5)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = disque(60, 1.3, ORIGIN, aiguilles=True)
        lignes = self.finale_gauche(fig, textes=[
            ("1 h = 60 min,",),
            ("1 min = 60 s.",),
            ("Pour convertir une durée :", "des paquets de 60."),
            ("Une durée ne s'écrit pas", "comme un nombre à virgule.")], fs=34)
        lignes.shift(UP * 0.2)  # la dernière ligne touchait Ti Margo
        self.couper_finale(lignes[0], ("1 h =", "60 min,"), 34)
        self.couper_finale(lignes[1], ("1 min =", "60 s."), 34)
        self.add(fig)
        self.au_mot("1 heure égale")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("1 minute égale")
        self.montrer_ligne(lignes[1])
        self.au_mot("Pour convertir")
        self.montrer_ligne(lignes[2])
        self.au_mot("Une durée ne s'écrit pas")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_soixante()
        self.ecran_paquets()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
