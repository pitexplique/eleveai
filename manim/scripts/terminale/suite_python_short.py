# suite_python_short.py
# EleveAI — Maths Terminale (spé) — short « Programmer les termes d'une suite »
# (9:16), ceinture BLANCHE (échelle entière sous le titre). Série SUITES du
# lycée, épisode 42. Micro du coach : python_suite
# (lib/tutor-v4/questionBank/terminale-spe/maths/algorithmique-python.bank.ts,
#  terminale_spe_py_suite_fixed_1 : u = 2, uₙ₊₁ = 2uₙ + 1, range(3) → 23).
#   · 00-garde       : le titre, l'échelle (70 %), le pari « u à la fin ? » ;
#                      EN BAS deux personnes et la bulle de l'information ;
#   · 01-situation   : EN HAUT l'information qui circule (2 bleus, puis 2 que
#                      l'on prévient, puis 1 qui se renseigne seule) ; EN BAS,
#                      EN MÊME TEMPS, uₙ₊₁ = 2 uₙ + 1 ;
#   · 02-code        : les trois lignes de Python ; EN HAUT la boucle qui tourne
#                      (3 tours), EN BAS la case u où l'on écrit 2 ;
#   · 03/03b         : question-pause (C : 23), 3 s ; la foule grossit 2 → 5 →
#                      11 → 23 EN MÊME TEMPS que les cases u₀ … u₃ ;
#   · 04-commentaire : après un quatrième tour, combien de personnes ?
#                      (réponse : 47, NON affichée) ;
#   · 05-abonne      : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = les termes u (les personnes informées),
# orange = ce qui s'ajoute à chaque tour, vert = juste.
# ⛔ Tout l'écran est à la virgule française SAUF le bloc de code Python.
# Voix : manim/voix/terminale-suite-python-short.json (débit −6), calée par
# suite_python_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_python_short.py SuitePythonShort -o eleveai-maths-terminale-suite-python-short --media_dir manim/scripts/terminale/media-suite-python-short

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_algorithme import RANG, OutilsAlgo, Programme, fleche_boucle  # noqa: E402
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402
from suite_limite_calculer import OutilsCalcul  # noqa: E402
from suite_limite_operations import VerifMargo  # noqa: E402
from suite_python import case_memoire  # noqa: E402

# ── l'affirmation de la voix, vérifiée ─────────────────────────────────────
INFO = [2]
for _ in range(4):
    INFO.append(2 * INFO[-1] + 1)
assert INFO == [2, 5, 11, 23, 47]          # 03 : C (23) ; le commentaire : 47
CODE = ["u = 2", "for i in range(3):", "    u = 2 * u + 1"]
PEAU = "#e0ac69"


def personne(s=1.0, couleur=TERME):
    """Une petite silhouette : une tête et un buste."""
    tete = Circle(radius=0.12, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.26))
    corps = RoundedRectangle(width=0.26, height=0.3, corner_radius=0.1, fill_color=couleur, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0))
    return VGroup(corps, tete).scale(s)


def bulle(s=1.0, couleur=JAUNE_TITRE):
    """La bulle de l'information : un phylactère et ses trois points."""
    corps = RoundedRectangle(width=0.62, height=0.38, corner_radius=0.14, fill_color=couleur, fill_opacity=1,
                             stroke_width=0)
    queue = Polygon(P(-0.1, -0.17), P(0.08, -0.17), P(-0.02, -0.33), fill_color=couleur, fill_opacity=1,
                    stroke_width=0)
    pts = VGroup(*[Dot(P(-0.17 + 0.17 * k, 0), radius=0.035, color="#0b1220") for k in range(3)])
    return VGroup(corps, queue, pts).scale(s)


def foule(n, cols=8, pas=0.3, r=0.072, couleur=TERME):
    """n pastilles bleues en grille (les personnes informées), centrées."""
    g = VGroup(*[Dot(P((k % cols) * pas, -(k // cols) * pas), radius=r, color=couleur) for k in range(n)])
    return g.move_to(ORIGIN)


class SuitePythonShort(VerifMargo, AuditMilliers, OutilsAlgo, OutilsCalcul, ShortSuites):
    fichier_marques = "suite_python_short_marques.json"
    nom_voix = "terminale-suite-python-short"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "blanche"
    hauteur_bouton = 0.86
    buff_boutons = 0.16
    y_tete_question = 3.52
    place_coche = -0.08
    Y_TITRE, Y_ECHELLE = 3.56, 2.86      # de l'air entre le titre et l'échelle

    def construire(self, morceaux, fs=40, larg=None):
        return super().construire(morceaux, fs, larg or self.largeur_texte / 1.05)

    def ligne(self, morceaux, y, fs=40, avec=(), larg=None, avec_k=None, rt=0.25, rt_mid=0.22, x=None):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k, rt_mid=rt_mid)

    def entete(self, titre, extrait=None, fs=40):
        """Comme l'entête commun, mais le titre plus haut et l'échelle plus bas."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, self.Y_ECHELLE))
        self.titre_s = self.t(titre, fs, JAUNE_TITRE, 3.9).move_to(P(0, self.Y_TITRE))
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def bouton(self, lettre, corps, largeur, fs):
        """Un bouton : rond A/B/C, le corps (≈ 40 pt), marge ≥ 20 px, la coche à
        droite sans toucher le texte."""
        rond = Circle(radius=0.21, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=30, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else self.t(corps, 40, WHITE, 1e9)
        place = largeur - 0.15 - rond.width - 0.32 - 0.75
        if c.width > place:
            c.scale_to_fit_width(place)
        ligne = VGroup(VGroup(rond, lt), c).arrange(RIGHT, buff=0.32)
        cadre = RoundedRectangle(width=largeur, height=max(self.hauteur_bouton, ligne.height + 0.36),
                                 corner_radius=0.14, stroke_color=TERME, stroke_width=3, fill_color=FOND_CARTE,
                                 fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.18, LEFT)
        return VGroup(cadre, ligne)

    def tourner(self, mob, vitesse=1.1):
        mob.add_updater(lambda m, dt: m.rotate(vitesse * dt))
        return mob

    def anims_case(self, lg, i, arc=False):
        """Les animations qui posent la case i (cadre, nombre, nom) et l'arc du
        tour qui vient de la case précédente."""
        a = [FadeIn(lg.cases[i][0], scale=0.8), FadeIn(lg.cases[i][1], scale=1.4)]
        if len(lg.noms) > i:
            a.append(FadeIn(lg.noms[i], shift=UP * 0.08))
        if arc and i:
            a.append(Create(self.arc_tour(lg, i - 1, cote=UP, creux=0.22)))
        return a

    def programme(self, lignes, fs, centre, violet=None):
        """Le bloc de code. ⛔ Il garde le POINT décimal : c'est du Python."""
        prog = Programme(lignes, fs=fs).move_to(centre)
        for k, a, b in (violet or []):
            prog.glyphes(k, a, b).set_color(RANG)
        return prog

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle, le pari ; EN BAS l'information ──
        self.dire("00-garde")
        duo = VGroup(personne(1.0).move_to(P(-0.5, -2.15)), personne(1.0).move_to(P(0.5, -2.15)),
                     bulle(1.0).move_to(P(0, -1.42)))
        self.entete("Programmer les termes", extrait="Programmer")
        self.play(FadeIn(duo, shift=UP * 0.2), run_time=0.4)        # le bas n'est jamais vide
        self.ligne([("Tu paries", WHITE, "Tu paries")], 1.6, fs=50)
        self.ligne([("sur la valeur de", WHITE, "sur la valeur")], 0.85, fs=40)
        self.ligne([("u à la fin ?", JAUNE_TITRE, "u à la fin")], 0.0, fs=56,
                   avec_k={0: [Indicate(duo[2], color=JAUNE_TITRE, scale_factor=1.2)]})
        self.attendre_voix(marge=0.3)

        # ── 01 : EN HAUT l'information qui circule ; EN BAS la relation ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        y0 = 2.05
        savent = VGroup(*[personne(1.0, TERME).move_to(P(x, y0)) for x in (-0.5, 0.5)])
        nouveaux = VGroup(*[personne(1.0, RAISON).move_to(P(x, y0)) for x in (-1.55, 1.55)])
        fls = VGroup(*[Arrow(P(-0.68 * s, y0 + 0.08), P(-1.3 * s, y0 + 0.08), buff=0, color=RAISON,
                             stroke_width=4, tip_length=0.14) for s in (1, -1)])
        seule = personne(1.0, RAISON).move_to(P(0, 1.3))
        pt = self.t("?", 30, RAISON, audit=False).next_to(seule, LEFT, buff=0.06)
        self.ligne([("Lundi :", JAUNE_TITRE, "Lundi"), ("2 savent", TERME, "2")], 0.55, fs=38,
                   avec_k={1: [FadeIn(savent, scale=0.7)]}, rt=0.4)
        self.ligne([("chaque jour, chacune", WHITE, "Chaque jour")], 0.0, fs=32)
        self.ligne([("en informe une autre", RAISON, "une personne de plus")], -0.55, fs=32,
                   avec_k={0: [GrowArrow(fls[0]), GrowArrow(fls[1]), FadeIn(nouveaux, scale=0.7)]}, rt=0.6)
        self.ligne([("et une l'apprend seule", RAISON, "la découvre")], -1.1, fs=32,
                   avec_k={0: [FadeIn(seule, scale=0.7), FadeIn(pt, scale=1.3)]}, rt=0.5)
        f = self.ligne([("uₙ₊₁ =", TERME, "u indice n plus 1"), ("2", RAISON, "2 fois"), ("uₙ", TERME, None),
                        ("+ 1", RAISON, "plus 1")], -2.1, fs=44)
        self.play(Create(self.encadre(f, TERME, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 02 : les trois lignes ; EN HAUT la boucle, EN BAS la case u ──
        self.nouvel_ecran("02-code", garder=(self.badge, self.titre_s))
        prog = self.programme(CODE, 24, P(0, 0.45), violet=[(1, 4, 5)])
        case = case_memoire(1.5, 0.8).move_to(P(0, -1.9))
        lab_u = self.t("u", 30, TERME, audit=False).next_to(case, UP, buff=0.1)
        val = self.t("2", 38, WHITE).move_to(case)
        fl = self.tourner(fleche_boucle(0.46).move_to(P(-0.85, 1.98)))
        tours = self.t("3 tours", 32, RAISON).move_to(P(0.85, 1.98))
        # ⚠️ le cadre AVANT les glyphes : ajouté après, son fond opaque les recouvre
        self.au_mot("Trois lignes")
        self.play(FadeIn(prog.cadre), run_time=0.3)
        # chaque nombre attend LE NOMBRE dit, jamais le mot qui le précède : 0 s d'avance
        self.taper(prog, 0, [("u =", "u égale", (case, lab_u)), ("2", "2", (val,))])
        self.taper(prog, 1, [("for i in", "Pour i dans"), ("range", "range de"), ("(3):", "3", (fl, tours))])
        self.taper(prog, 2, [("u =", "décalée"), ("2 * u", "2 fois"), ("+ 1", "plus 1")])
        self.attendre_voix(marge=0.3)
        fl.clear_updaters()

        # ── 03 : question-pause → C (23) ──
        g1 = self.construire([("À la fin de ces", WHITE, "À la fin"), ("trois lignes,", WHITE, "trois lignes")], 40)
        g2 = self.construire([("u vaut :", TERME, "u vaut")], 44)

        def dessin():
            """Le bas ne reste pas vide : le code attend, puis s'en va AVANT les cadres."""
            mini = self.programme(CODE, 20, P(0, -1.0), violet=[(1, 4, 5)])
            self._attente_q = mini
            self.play(FadeIn(mini, shift=UP * 0.12), run_time=0.3)
            for g in (g1, g2):
                self.montrer(g, rt=0.22)
            liste.clear()
        liste = [(g1, None), (g2, None)]
        q = self.poser_question("03-question", liste,
                                [self.choix([("11", "11")], 42), self.choix([("47", "47")], 42),
                                 self.choix([("23", "23")], 42)], 2, dessin=dessin)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(q.tete), FadeOut(g1), FadeOut(g2), FadeOut(q.cartes[0]), FadeOut(q.cartes[1]),
                  VGroup(q.cartes[2], ok).animate.move_to(P(0, 2.95)), run_time=0.35)
        lg = LigneTermes(["2", "5", "11", "23"], centre=P(0, 0.5), pas=1.0, largeur=0.92, hauteur=0.68, fs=26,
                         noms=["u₀", "u₁", "u₂", "u₃"], fs_noms=20)
        cl = foule(23).move_to(P(0, 1.78))
        seuils = [2, 5, 11, 23]      # « Réponse C » est déjà passé : on repart au premier nombre dit
        for i, v in enumerate(lg.valeurs):
            self.suivre(v)
            debut = 0 if i == 0 else seuils[i - 1]
            self.play(*self.anims_case(lg, i, arc=True),
                      LaggedStart(*[GrowFromCenter(cl[j]) for j in range(debut, seuils[i])], lag_ratio=0.04),
                      run_time=0.5)
        self.ligne([("Trois tours depuis", WHITE, "Trois tours"), ("u₀", TERME, "u indice 0")], -0.85, fs=34)
        fin = self.ligne([("u vaut", WHITE, "u vaut"), ("23", JUSTE, "23")], -1.6, fs=44,
                         avec_k={1: self.allumer_cases(lg, [3], JUSTE)}, rt=0.4)
        self.play(Create(self.encadre(fin, JUSTE, 0.14)), run_time=0.3)
        self.ligne([("c'est jeudi !", JAUNE_TITRE, "c'est jeudi")], -2.42, fs=38)
        self.attendre_voix(marge=0.4)

        # ── 04 : la question en commentaire ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE - 0.02))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.ligne([("après un", WHITE, "après un"), ("quatrième tour,", JAUNE_TITRE, "quatrième")], 2.6, fs=40)
        foule23 = foule(23).move_to(P(0, 0.35))
        qm = self.t("?", 120, RAISON, audit=False).move_to(P(0, -1.0)).set_opacity(0.55)
        self.ligne([("combien de personnes", WHITE, "combien")], 1.9, fs=36,
                   avec=[FadeIn(foule23, lag_ratio=0.03)], rt=0.5)
        self.ligne([("connaissent l'information ?", WHITE, "connaissent")], 1.3, fs=36,
                   avec=[FadeIn(qm, scale=0.8)], rt=0.4)
        self.au_mot("Réponds en commentaire")
        appel = self.paragraphe([("Réponds en", JUSTE), ("commentaire !", JUSTE)], 44, buff=0.08, y=-2.15,
                                larg=self.largeur_texte / 1.1)
        self.play(FadeOut(qm, scale=0.8), FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin commune ──
        self.fin_short("05-abonne")

    def fin_short(self, cle, a_effacer=None):
        """La fin commune du 05/11, à un détail près : « @eleveai974 » est borné
        à 3,55 au lieu de largeur_texte (4,1). ⚠️ DÉFAUT DU MODULE COMMUN : son
        fin_short termine par Indicate(poignee, scale_factor=1,12) ; une poignée
        large de 4,1 passe alors à 4,59 et TOUCHE les deux bords (verifier-bords
        le voit, le dry run non : il ne mesure qu'APRÈS chaque animation)."""
        a_effacer = a_effacer if a_effacer is not None else [m for m in self.mobjects if m is not self._margo]
        for m in a_effacer:
            m.clear_updaters()
        self.dire(cle)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.5))
        site = self.t("eleveai.fr", 54, TERME).move_to(P(0, 1.55))
        cadre = SurroundingRectangle(site, color=TERME, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, JUSTE).move_to(P(0, 0.1))
        poignee = self.t("@eleveai974", 44, JUSTE, 3.55, audit=False).move_to(P(0, -0.72))
        g1, p, g2 = self.t("Un pouce", 26), self.t("·", 26, "#94a3b8"), self.t("La cloche", 26)
        VGroup(g1, p, g2).arrange(RIGHT, buff=0.16).move_to(P(0, -1.95))
        g2.align_to(g1, UP)
        self.play(FadeOut(Group(*a_effacer)), run_time=0.25)
        self.au_mot("Entraîne-toi")
        self.play(Write(entraine), run_time=0.35)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.4)
        self.au_mot("pouce")
        self.play(FadeIn(g1, scale=1.3), run_time=0.22)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.3)
        self.au_mot("cloche")
        self.play(FadeIn(p), FadeIn(g2, scale=1.3), run_time=0.22)
        self.play(Indicate(poignee, color=JUSTE, scale_factor=1.12), run_time=0.45)
        self.attendre_voix(marge=1.0)

    def q_montrer_choix(self, cartes):
        """Les trois cadres prennent la place du dessin d'attente ; chaque lettre
        à « A : », son contenu quand la voix le dit."""
        att = getattr(self, "_attente_q", None)
        if att is None:
            return super().q_montrer_choix(cartes)
        self._attente_q = None
        self.play(FadeOut(att, shift=DOWN * 0.15), run_time=0.25)   # le dessin part AVANT les cadres
        for c, L in zip(cartes, "ABC"):
            self.suivre(f"{L} : ")
            corps = c[1][1]
            for k, (m, ex) in enumerate(zip(corps.nombres, corps.extraits)):
                self.suivre(ex)
                debut = [FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15)] if k == 0 else []
                self.play(*debut, FadeIn(m, scale=1.2), run_time=0.25)
