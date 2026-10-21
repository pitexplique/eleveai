# stats_defi.py
# EleveAI — Maths 6e — série « Statistiques », épisode 10 : LE DÉFI (micro du
# coach : stat_donnee_defi — compter des données, les ranger dans un tableau
# d'effectifs, trouver la plus fréquente, s'en servir), AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE : un problème en plusieurs étapes (compter,
# tableau, plus fréquent, décalage, décoder) et un jugement de statisticien
# (une conclusion sur peu de données est fragile). Short jumeau :
# stats_defi_short.py (jaune, un cran plus bas).
#
# ⭐ Décor et métier : la LITTÉRATURE et les codes secrets ; une CRYPTOGRAPHE
# protège les messages (banques, téléphones). Données RÉELLES, comptées en
# Python : les quatre premiers vers de « Demain, dès l'aube » (Victor Hugo,
# 1856, domaine public) ont 147 lettres (accents ôtés) ; E 19, A 18, I 13,
# T 10 (R aussi 10). Le message codé = le premier vers décalé de 3 (César) :
# « GHPDLQ, GHV O'DXEH » ; défi PDWKV → MATHS.
# ⭐ Les figures sont CELLES DU COACH (manim/canvas_stats.py) : le tableau
# d'effectifs (`tableau_donnees`) puis le diagramme en bâtons (`stat_graph`
# batons) ; la bande de l'alphabet est dessinée ici.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 la cryptographe · 02 le poème (147 lettres) · 03 le
# tableau d'effectifs (E 19, A 18, I 13, T 10) · 04 la plus fréquente : E ·
# 05 le message codé (H) · 06 le décalage (E → H : 3) · 07 le piège (19 contre
# 18) · 08 défi (P D W K V) · 08b correction (MATHS) · 09 ce que tu as appris ·
# 10 fin (règle du 19/10).
#
# Voix : manim/voix/6e-stats-defi.json (débit −10), WAV dans
# public/sons/6e-stats-defi/ ; calage mot à mot :
# manim/scripts/6e/stats_defi_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/6e/stats_defi.py StatsDefi6e -o eleveai-maths-6e-stats-defi --media_dir manim/scripts/6e/media-defi
# Sortie : manim/sorties/6e/maths/statistiques/10-defi/eleveai-maths-6e-stats-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from canvas_stats import AMBRE, NUIT, Barres, Tableau, texte  # noqa: E402

VERS = ["Demain, dès l'aube, à l'heure où blanchit la campagne,",
        "Je partirai. Vois-tu, je sais que tu m'attends.",
        "J'irai par la forêt, j'irai par la montagne.",
        "Je ne puis demeurer loin de toi plus longtemps."]
LETTRES = ["E", "A", "I", "T"]
EFF = [19, 18, 13, 10]
ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
CODE = "GHPDLQ, GHV O'DXEH"  # « Demain, dès l'aube » décalé de 3
SECRET, CLAIR = "PDWKV", "MATHS"
PARCHEMIN = "#fef3c7"


def cadenas(s=1.0, c="#facc15"):
    anse = Arc(radius=0.35, start_angle=0, angle=PI, stroke_color="#cbd5e1", stroke_width=10).shift(UP * 0.3)
    corps = RoundedRectangle(width=1.0, height=0.8, corner_radius=0.1, fill_color=c, fill_opacity=1,
                             stroke_width=0)
    trou = VGroup(Circle(radius=0.09, fill_color=NUIT, fill_opacity=1, stroke_width=0),
                  Rectangle(width=0.06, height=0.2, fill_color=NUIT, fill_opacity=1, stroke_width=0).shift(DOWN * 0.1))
    return VGroup(anse, corps, trou).scale(s)


def parchemin(lignes, fs=30, larg=None, couleur=NUIT, police="Georgia"):
    """Des lignes de texte sur une feuille crème (le poème, le message)."""
    ts = VGroup(*[Text(l, font_size=fs, color=couleur, font=police) for l in lignes]).arrange(
        DOWN, aligned_edge=LEFT, buff=0.18)
    larg = larg or ts.width + 0.7
    if ts.width > larg - 0.5:
        ts.scale_to_fit_width(larg - 0.5)
    fond = RoundedRectangle(width=larg, height=ts.height + 0.6, corner_radius=0.12, fill_color=PARCHEMIN,
                            fill_opacity=1, stroke_color="#d97706", stroke_width=3)
    return VGroup(fond, ts.move_to(fond))


def glyphes(txt, chaine, ensemble):
    """Les glyphes du Text `txt` (écrit avec `chaine`) dont le caractère est dans
    `ensemble` (les espaces ne font pas de glyphe dans un Text de Manim)."""
    car = [c for c in chaine if not c.isspace()]
    if len(car) != len(txt.submobjects):
        return VGroup()
    return VGroup(*[g for g, c in zip(txt.submobjects, car) if c.upper() in ensemble])


ACCENTS = {"E": "EÉÈÊË", "A": "AÀÂ", "I": "IÎÏ", "T": "T"}


class Alphabet(VGroup):
    """La bande de l'alphabet : 26 cases ; case(l) renvoie la case de la lettre l."""

    def __init__(self, larg_case=0.5, fs=28, lettres=ALPHA, **kw):
        super().__init__(**kw)
        self.lettres = lettres
        self.cases = VGroup()
        for l in lettres:
            r = Square(larg_case, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
            t = Text(l, font_size=fs, color=NUIT, font="Arial", weight=BOLD).move_to(r)
            self.cases.add(VGroup(r, t))
        self.cases.arrange(RIGHT, buff=0)
        self.add(self.cases)

    def case(self, l):
        return self.cases[self.lettres.index(l)]

    def allumer(self, l, couleur=AMBRE):
        return self.case(l)[0].animate.set_fill(couleur)

    def saut(self, a, b, couleur=AMBRE, haut=True):
        """Un arc de la case a à la case b (au-dessus ou en dessous)."""
        ca, cb = self.case(a), self.case(b)
        d = UP if haut else DOWN
        p0 = (ca.get_top() if haut else ca.get_bottom()) + d * 0.04
        p1 = (cb.get_top() if haut else cb.get_bottom()) + d * 0.04
        ang = -PI / 2 if (haut == (ALPHA.index(b) > ALPHA.index(a))) else PI / 2
        arc = ArcBetweenPoints(p0, p1, angle=ang, color=couleur, stroke_width=5)
        arc.add_tip(tip_length=0.14)
        return arc


class StatsDefiBase(MotsCales6, OutilsPaysage, Notion6e):
    nom_voix = "6e-stats-defi"
    fichier_marques = "stats_defi_marques.json"
    identite = "Maths 6e — EleveAI"

    def tableau(self, plein=True, centre=P(-3.5, 0.3)):
        tab = Tableau(LETTRES, [[e if plein else None for e in EFF]], libelles=["Effectif"], coin="Lettre",
                      largeur_case=1.1, largeur_libelle=2.1, hauteur=1.05, fs=40,
                      titre="Les 4 premiers vers")
        return tab.move_to(centre)

    def batons(self, centre=P(-3.3, -0.3)):
        return Barres(LETTRES, EFF, pas=5, sous_pas=1, maxi=20, batons=True,
                      couleurs=["#f59e0b", "#60a5fa", "#60a5fa", "#60a5fa"], nom_axe="Effectif",
                      titre="Les lettres du poème", largeur=4.2, hauteur=3.8, fs=30, centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le défi : casser un code", self.identite, "orange")
        msg = parchemin([CODE], fs=40, police="Consolas").move_to(P(-1.6, 0.2))
        cad = cadenas(0.9).next_to(msg, RIGHT, buff=0.5)
        self.au_mot("Un message secret")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(msg, scale=0.9),
                  FadeIn(cad, scale=0.5), run_time=0.7)
        self.au_mot("Pour le casser")
        self.play(cad[0].animate.shift(UP * 0.25).rotate(0.4, about_point=cad[0].get_right()), run_time=0.5)
        self.au_mot("des statistiques")
        st = self.t("des statistiques !", 44, AMBRE).next_to(msg, DOWN, buff=0.35)
        self.play(FadeIn(st, scale=0.7), run_time=0.4)
        self.insister(st, 1.15, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la cryptographe ────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Une cryptographe")
        metier = self.t("Cryptographe", 52, BLEU_CALCUL).move_to(P(0, 2.7))
        cad = cadenas(1.6).move_to(P(0, 0.5))
        self.play(Write(metier), FadeIn(cad, scale=0.6), run_time=0.8)
        self.au_mot("ceux des banques")
        banque = VGroup(Polygon(P(-0.9, 0.5), P(0.9, 0.5), P(0, 1.0), fill_color="#cbd5e1", fill_opacity=1,
                                stroke_width=0),
                        *[Rectangle(width=0.18, height=0.8, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
                          .move_to(P(x, 0.0)) for x in (-0.6, -0.2, 0.2, 0.6)],
                        Rectangle(width=1.9, height=0.18, fill_color="#cbd5e1", fill_opacity=1,
                                  stroke_width=0).move_to(P(0, -0.5)))
        banque.move_to(P(-4.0, 0.5))
        lb = self.t("les banques", 36).next_to(banque, DOWN, buff=0.3)
        self.play(FadeIn(banque, shift=RIGHT * 0.3), FadeIn(lb), run_time=0.5)
        self.au_mot("ceux des téléphones")
        tel = VGroup(RoundedRectangle(width=0.9, height=1.7, corner_radius=0.15, fill_color="#1e293b",
                                      fill_opacity=1, stroke_color="#94a3b8", stroke_width=4),
                     RoundedRectangle(width=0.72, height=1.3, corner_radius=0.06, fill_color="#bae6fd",
                                      fill_opacity=1, stroke_width=0)).move_to(P(4.0, 0.5))
        lt = self.t("les téléphones", 36).next_to(tel, DOWN, buff=0.3)
        self.play(FadeIn(tel, shift=LEFT * 0.3), FadeIn(lt), run_time=0.5)
        self.au_mot("compter les lettres")
        arme = VGroup(*[VGroup(self.t(l, 44, AMBRE), self.t(":", 40), self.t("?", 40, ORANGE_RETENUE)).arrange(
            RIGHT, buff=0.12) for l in ("E", "A", "S")]).arrange(RIGHT, buff=0.7).move_to(P(0, -2.45))
        ct = self.t("compter les lettres", 40, AMBRE).next_to(arme, UP, buff=0.3)
        self.play(FadeIn(ct, shift=UP * 0.2), LaggedStart(*[FadeIn(a, scale=0.6) for a in arme], lag_ratio=0.25),
                  run_time=0.8)
        self.attendre_voix()

    # ── 02 : le poème ───────────────────────────────────────────────────────

    def ecran_poeme(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-poeme")
        self.au_mot("un poème de Victor Hugo")
        auteur = self.t("Victor Hugo, 1856", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(auteur), run_time=0.6)
        self.au_mot("Demain, dès l'aube")
        p = parchemin(VERS, fs=34, larg=12.2).move_to(P(-0.4, 0.4))
        self.play(FadeIn(p[0]), Write(p[1][0]), run_time=1.2)
        self.au_mot("Ses quatre premiers vers")
        self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.2) for l in p[1][1:]], lag_ratio=0.3), run_time=1.0)
        self.au_mot("147 lettres")
        n = self.ligne([("147", AMBRE), ("lettres", WHITE)], 50).move_to(P(-0.4, -2.3))
        self.play(FadeIn(n, scale=0.6), run_time=0.4)
        self.insister(n[0], 1.4, 0.3)
        self.attendre_voix()

    # ── 03 : le tableau d'effectifs ─────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-tableau")
        p = parchemin(VERS, fs=32, larg=12.4).move_to(P(-0.3, -1.45))
        tab = self.tableau(plein=False, centre=P(-0.3, 1.9))
        self.au_mot("Je compte les lettres")
        self.play(FadeIn(p), run_time=0.5)
        self.au_mot("tableau d'effectifs")
        self.play(FadeIn(tab, shift=UP * 0.3), run_time=0.6)
        mots = [("Le E", "19 fois"), ("Le A", "18 fois"), ("Le I", "13 fois"), ("Le T", "10 fois")]
        for j, ((m1, m2), l) in enumerate(zip(mots, LETTRES)):
            self.au_mot(m1)
            # les lettres l du poème s'allument (accents compris : é, è, à… comptent avec leur lettre)
            cibles = VGroup(*[g for ligne, v in zip(p[1], VERS) for g in glyphes(ligne, v, ACCENTS[l])])
            self.play(*tab.allumer_colonne(j), cibles.animate.set_color(ORANGE_RETENUE), run_time=0.45)
            self.au_mot(m2)
            self.play(tab.remplir(0, j, EFF[j]), cibles.animate.set_color(NUIT), run_time=0.4)
            self.play(*tab.eteindre(), run_time=0.2)
        self.attendre_voix()

    # ── 04 : la plus fréquente ──────────────────────────────────────────────

    def ecran_conclure(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-conclure")
        g = self.batons()
        self.add(g.fond)
        self.au_mot("La lettre la plus fréquente")
        self.play(g.pousser(run_time=0.7))
        self.add(g)
        fl = g.monter(0)
        tr = g.vers_axe(0)
        self.play(g.focus(0, 0.35), GrowArrow(fl), run_time=0.4)
        self.play(Create(tr), run_time=0.35)
        self.au_mot("c'est le E")
        e = self.col(self.ligne([("la plus fréquente :", WHITE), ("E", AMBRE)], 44), 1.6)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(e[1], 1.6, 0.3)
        self.au_mot("En français")
        fr_ = self.col(self.bloc(["En français,", "presque toujours le E !"], 42, AMBRE), 0.0)
        self.play(FadeIn(fr_, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : le message codé ────────────────────────────────────────────────

    def message(self, centre=P(0, 1.4), fs=56):
        m = parchemin([CODE], fs=fs, police="Consolas").move_to(centre)
        return m

    def ecran_code(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-code")
        self.au_mot("Voici un message codé")
        m = self.message()
        cad = cadenas(0.6).next_to(m, LEFT, buff=0.3)
        self.play(FadeIn(m, scale=0.9), FadeIn(cad), run_time=0.6)
        self.au_mot("décalée dans l'alphabet")
        alpha = Alphabet().move_to(P(0, -2.3))
        self.play(FadeIn(alpha, shift=UP * 0.2), run_time=0.6)
        self.au_mot("la lettre la plus fréquente est le H")
        hs = glyphes(m[1][0], CODE, "H")
        nh = self.ligne([("le plus fréquent :", WHITE), ("H", ROUGE_ERREUR)], 44).move_to(P(0, 0.1))
        self.play(*[h.animate.set_color(ROUGE_ERREUR).scale(1.3) for h in hs], FadeIn(nh, shift=UP * 0.2),
                  alpha.allumer("H", "#fca5a5"), run_time=0.6)
        self.au_mot("Le H remplace sûrement le E")
        rem = self.ligne([("H", ROUGE_ERREUR), ("remplace sûrement", WHITE), ("E", AMBRE)], 44).move_to(P(0, -0.9))
        self.play(FadeIn(rem, shift=UP * 0.2), alpha.allumer("E", AMBRE), run_time=0.5)
        self.insister(rem, 1.1, 0.3)
        self.attendre_voix()

    # ── 06 : le décalage ────────────────────────────────────────────────────

    def ecran_decalage(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-decalage")
        alpha = Alphabet(larg_case=0.95, fs=48, lettres="ABCDEFGHIJK").move_to(P(-0.3, 0.2))
        self.add(alpha)
        self.au_mot("De E à H")
        t = self.ligne([("De", WHITE), ("E", AMBRE), ("à", WHITE), ("H", ROUGE_ERREUR)], 48).move_to(P(0, 2.75))
        self.play(FadeIn(t, shift=DOWN * 0.2), alpha.allumer("E", AMBRE), run_time=0.5)
        sauts = []
        for a, b, mot in [("E", "F", "F, G, H."), ("F", "G", "G, H."), ("G", "H", "H. On")]:
            self.au_mot(mot)
            arc = alpha.saut(a, b)
            un = self.t("+1", 34, AMBRE).next_to(arc, UP, buff=0.04)
            self.play(Create(arc), FadeIn(un), alpha.allumer(b, "#fde68a"), run_time=0.35)
            sauts.append(VGroup(arc, un))
        self.au_mot("On a avancé de 3 lettres")
        trois = self.ligne([("On avance de", WHITE), ("3", AMBRE)], 46).move_to(P(0, 1.95))
        self.play(FadeIn(trois, scale=0.7), alpha.allumer("H", "#fca5a5"), run_time=0.45)
        self.insister(trois[1], 1.5, 0.25)
        self.au_mot("Pour décoder, je recule de 3")
        retour = VGroup(alpha.saut("H", "G", VERT_OK, haut=False), alpha.saut("G", "F", VERT_OK, haut=False),
                        alpha.saut("F", "E", VERT_OK, haut=False))
        rec = self.ligne([("Pour décoder :", WHITE), ("je recule de", VERT_OK), ("3", VERT_OK)], 44).move_to(P(0, -1.4))
        self.play(LaggedStart(*[Create(r) for r in retour], lag_ratio=0.4), FadeIn(rec, shift=UP * 0.2), run_time=1.0)
        self.insister(rec, 1.08, 0.3)
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        tab = self.tableau(centre=P(-3.5, 0.9))
        self.add(tab)
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.7)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("trop peu de lettres")
        e1 = self.col(self.bloc(["conclure avec", "trop peu de lettres"], 38, ORANGE_RETENUE), 1.6)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("ne bat le A que de 1")
        self.play(*tab.allumer_colonne(0), *tab.allumer_colonne(1), run_time=0.4)
        un = self.col(self.ligne([("E bat A de", WHITE), ("1", ROUGE_ERREUR), ("seulement", WHITE)], 38), 0.5)
        self.play(FadeIn(un, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("19 contre 18")
        vs = self.col(self.ligne([("19", AMBRE), ("contre", WHITE), ("18", "#93c5fd")], 50), -0.35)
        self.play(FadeIn(vs, scale=0.7), run_time=0.4)
        self.au_mot("le hasard peut tromper")
        de = VGroup(RoundedRectangle(width=0.8, height=0.8, corner_radius=0.12, fill_color=WHITE, fill_opacity=1,
                                     stroke_width=0),
                    *[Dot(P(x, y), radius=0.07, color=NUIT) for x, y in ((-0.2, 0.2), (0, 0), (0.2, -0.2))])
        de.move_to(P(-4.6, -1.8))
        court = self.t("texte court : le hasard trompe", 34, ORANGE_RETENUE).next_to(de, RIGHT, buff=0.3)
        self.play(FadeIn(de, scale=0.5), FadeIn(court, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("Plus le texte est long")
        long = self.t("texte long : comptage sûr", 34, VERT_OK).next_to(court, DOWN, buff=0.3).align_to(court, LEFT)
        rouleau = VGroup(*[Line(P(0, 0), P(0.7, 0), color=PARCHEMIN, stroke_width=4) for _ in range(6)]).arrange(
            DOWN, buff=0.07).next_to(long, LEFT, buff=0.35)
        self.play(FadeIn(long, shift=RIGHT * 0.2), LaggedStart(*[Create(r) for r in rouleau], lag_ratio=0.15),
                  run_time=0.8)
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def cases_mot(self, mot, couleur=WHITE, centre=P(0, 1.2), cote=1.15, fs=62):
        g = VGroup()
        for l in mot:
            r = RoundedRectangle(width=cote, height=cote, corner_radius=0.1, fill_color="#1e293b", fill_opacity=1,
                                 stroke_color=couleur, stroke_width=4)
            g.add(VGroup(r, Text(l, font_size=fs, color=couleur, font="Consolas").move_to(r)))
        return g.arrange(RIGHT, buff=0.25).move_to(centre)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.au_mot("À toi de jouer")
        titre = self.t("À toi de jouer", 50, JAUNE_TITRE).to_edge(UP, buff=0.35)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Avec un décalage de 3")
        d = self.ligne([("décalage :", WHITE), ("3", AMBRE)], 44).move_to(P(0, 2.3))
        alpha = Alphabet().move_to(P(0, -0.6))
        trous = self.cases_mot("?????", ORANGE_RETENUE, centre=P(0, -1.75), cote=0.9, fs=48)
        self.play(FadeIn(d, shift=DOWN * 0.2), FadeIn(alpha), run_time=0.4)
        mot = self.cases_mot(SECRET, ROUGE_ERREUR)
        for k, l in enumerate(SECRET):
            self.au_mot(l + ("," if k < 4 else "."))
            self.play(FadeIn(mot[k], scale=1.4), FadeIn(trous[k]), run_time=0.2)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(-0.6, -2.85))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08b-correction")
        titre = self.t("Correction", 50, JAUNE_TITRE).to_edge(UP, buff=0.35)
        mot = self.cases_mot(SECRET, ROUGE_ERREUR)
        alpha = Alphabet().move_to(P(0, -0.6))
        clair = self.cases_mot(CLAIR, VERT_OK, centre=P(0, -1.75), cote=0.9, fs=48)
        self.add(mot, alpha)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Je recule de 3 lettres")
        rec = self.ligne([("je recule de", VERT_OK), ("3", VERT_OK)], 40).move_to(P(0, 2.3))
        self.play(FadeIn(rec, shift=DOWN * 0.2), run_time=0.4)
        mots = ["P donne M", "D donne A", "W donne T", "K donne H", "V donne S"]
        prec = None
        for k, (s, c, m) in enumerate(zip(SECRET, CLAIR, mots)):
            self.au_mot(m)
            arcs = VGroup(*[alpha.saut(ALPHA[ALPHA.index(s) - j], ALPHA[ALPHA.index(s) - j - 1], VERT_OK, haut=False)
                            for j in range(3)])
            anims = [Create(arcs), alpha.allumer(s, "#fca5a5"), alpha.allumer(c, "#86efac"),
                     Indicate(mot[k][1], color=AMBRE, scale_factor=1.4)]
            if prec is not None:
                anims += [FadeOut(prec[0]), alpha.case(prec[1])[0].animate.set_fill(WHITE),
                          alpha.case(prec[2])[0].animate.set_fill(WHITE)]
            self.play(*anims, run_time=0.4)
            self.play(FadeIn(clair[k], scale=1.5), run_time=0.25)
            prec = (arcs, s, c)
        self.au_mot("Le mot secret")
        self.play(FadeOut(prec[0]), run_time=0.2)
        self.au_mot("MATHS")
        self.play(clair.animate.scale(1.3).move_to(P(0, -1.75)), run_time=0.4)
        self.play(Flash(clair, color=VERT_OK, line_length=0.4, flash_radius=2.2), run_time=0.6)
        self.attendre_voix(marge=1.2)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        tab = self.tableau(centre=P(-3.5, -0.2))
        self.add(tab)
        lignes = self.finale([("Je compte les données.",), ("Je les range dans", "un tableau d'effectifs."),
                              ("Je cherche", "la plus fréquente."), ("Beaucoup de données :", "conclusion plus sûre.")],
                             [2.15, 1.05, -0.25, -1.55], fs=34)
        self.au_mot("Je compte les données")
        self.montrer_ligne(lignes[0])
        self.au_mot("je les range dans un tableau")
        self.montrer_ligne(lignes[1], Circumscribe(tab, color=AMBRE))
        self.au_mot("je cherche la plus fréquente")
        self.montrer_ligne(lignes[2], *tab.allumer_case(0, 0))
        self.au_mot("Et une conclusion est plus sûre")
        self.montrer_ligne(lignes[3])
        self.insister(lignes[3][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_poeme()
        self.ecran_tableau()
        self.ecran_conclure()
        self.ecran_code()
        self.ecran_decalage()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsDefi6e(StatsDefiBase):
    identite = "Maths 6e — EleveAI"
