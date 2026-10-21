# stats_organiser.py
# EleveAI — Maths 5e — série « Statistiques » (cycle 4), épisode 01 : RECUEILLIR
# ET ORGANISER DES DONNÉES (micro du coach : stat_donnee_organiser, notion
# stat_statistique ; banque lib/tutor-v4/questionBank/5e/maths/statistiques.bank.ts,
# genOrganiser : une série de nombres → effectif d'une valeur, « au moins »,
# valeur la plus fréquente, effectif total), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE : ranger et compter, un cran au-dessus du « je
# vois » (la verte est réservée aux calculs de la 5e : fréquence, moyenne).
# Short jumeau : stats_organiser_short.py (blanche).
#
# ⭐ Décor et métier : la GÉOLOGIE, le Piton de la Fournaise ; une VOLCANOLOGUE
# de l'observatoire compte les petits séismes sous le volcan (s'ils se
# multiplient, une éruption se prépare). Données VRAISEMBLABLES (pas un relevé
# réel de l'OVPF), calculées en Python : 14 jours,
# 2, 0, 3, 1, 2, 2, 4, 1, 0, 2, 3, 2, 1, 2 → effectifs 0:2, 1:3, 2:6, 3:2, 4:1,
# total 14 ; au moins 3 : 2 + 1 = 3 jours ; valeur la plus fréquente : 2.
# ⭐ La figure est CELLE DU COACH (canvas_stats.Tableau = `tableau_donnees` :
# en-tête sombre, colonne des libellés bleu clair, case allumée), avec une ligne
# « Traits » en plus : le geste « je fais un trait, je barre le nombre » se VOIT.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit (calage par
# index pour la liste des 14 relevés).
#
# Micro → écrans : stat_donnee_organiser = 02 (série statistique), 03 (valeurs),
# 04 (compter en barrant), 05 (effectif), 06 (effectif total), 07 (la plus
# fréquente, « au moins »).
# Écrans : 00 garde · 01 la volcanologue · 02 la liste · 03 le tableau · 04
# compter · 05 les effectifs · 06 le piège (vérifier le total) · 07 défi · 07b
# correction · 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/5e-stats-organiser.json (débit −10), WAV dans
# public/sons/5e-stats-organiser/ ; calage mot à mot :
# manim/scripts/5e/stats5_organiser_marques.json (marques.ps1 + conv.py).
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_organiser.py StatsOrganiser5e -o eleveai-maths-5e-stats-organiser --media_dir manim/scripts/5e/media-organiser
# Sortie : manim/sorties/5e/maths/statistiques/01-organiser/eleveai-maths-5e-stats-organiser.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403

RELEVES = [2, 0, 3, 1, 2, 2, 4, 1, 0, 2, 3, 2, 1, 2]
VALEURS = [0, 1, 2, 3, 4]
EFFECTIFS = [RELEVES.count(v) for v in VALEURS]
assert EFFECTIFS == [2, 3, 6, 2, 1] and sum(EFFECTIFS) == len(RELEVES) == 14
assert sum(1 for x in RELEVES if x >= 3) == 3
LAVE, ROCHE, ROCHE2 = "#f97316", "#57534e", "#78716c"


def volcan(s=1.0):
    """Le Piton de la Fournaise : un cône de roche, le cratère, la lave."""
    cone = Polygon(P(-2.2, 0), P(2.2, 0), P(0.75, 1.55), P(-0.75, 1.55), fill_color=ROCHE, fill_opacity=1,
                   stroke_color=ROCHE2, stroke_width=3)
    flanc = Polygon(P(0.1, 0), P(1.3, 0), P(0.55, 1.4), P(0.25, 1.4), fill_color=ROCHE2, fill_opacity=0.6,
                    stroke_width=0)
    cratere = Ellipse(width=1.5, height=0.3, fill_color="#292524", fill_opacity=1, stroke_width=0).move_to(P(0, 1.55))
    lave = Ellipse(width=1.0, height=0.16, fill_color=LAVE, fill_opacity=1, stroke_width=0).move_to(P(0, 1.56))
    coulee = VMobject(stroke_color=LAVE, stroke_width=6).set_points_smoothly(
        [P(0.3, 1.5), P(0.55, 1.0), P(0.5, 0.55), P(0.8, 0.1)])
    return VGroup(cone, flanc, cratere, lave, coulee).scale(s)


def sismo(largeur=4.2, amp=0.25, n=34, seed=3, couleur="#38bdf8"):
    """Un sismogramme : une ligne qui tremble (amp = la force des secousses)."""
    rng = np.random.default_rng(seed)
    xs = np.linspace(-largeur / 2, largeur / 2, n)
    ys = [amp * rng.uniform(-1, 1) * (0.3 + 0.7 * abs(np.sin(k * 0.9))) for k in range(n)]
    return VMobject(stroke_color=couleur, stroke_width=4).set_points_as_corners([P(x, y) for x, y in zip(xs, ys)])


def volcanologue(r=0.3):
    """Une volcanologue : casque orange, combinaison argentée, tablette."""
    tete = Circle(radius=r, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    chev = Circle(radius=r * 1.2, fill_color="#1c1917", fill_opacity=1, stroke_width=0).move_to(
        tete.get_center() + DOWN * r * 0.15 + LEFT * r * 0.1)
    casque = Sector(radius=r * 1.15, start_angle=0, angle=PI, fill_color="#f97316", fill_opacity=1,
                    stroke_width=0).move_to(tete.get_center() + UP * r * 0.55)
    visiere = Line(P(-1.3 * r, 0), P(1.3 * r, 0), stroke_color="#f97316", stroke_width=6).move_to(
        tete.get_center() + UP * r * 0.3)
    corps = Polygon(P(-1.8 * r, -4 * r), P(1.8 * r, -4 * r), P(1.2 * r, -1.15 * r), P(-1.2 * r, -1.15 * r),
                    fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    bande = Rectangle(width=3.0 * r, height=0.35 * r, fill_color="#f97316", fill_opacity=1,
                      stroke_width=0).move_to(P(0, -2.6 * r))
    tab = RoundedRectangle(width=1.5 * r, height=1.1 * r, corner_radius=0.05, fill_color="#0f172a", fill_opacity=1,
                           stroke_color="#38bdf8", stroke_width=3).move_to(P(1.15 * r, -2.0 * r))
    return VGroup(chev, tete, casque, visiere, corps, bande, tab)


def bandelette(valeurs, fs=40, pas=0.5, titre="Séismes par jour"):
    """Le carnet des relevés : une carte blanche, le titre, la liste des nombres.
    Renvoie (carte, titre, nombres, virgules) ; nombres[i] = i-ème relevé."""
    nbs = VGroup(*[texte(v, fs, NUIT) for v in valeurs])
    for i, m in enumerate(nbs):
        m.move_to(P(i * pas, 0))
    virg = VGroup(*[texte(",", fs, "#94a3b8").next_to(nbs[i], RIGHT, buff=0.03).align_to(nbs[i], DOWN)
                    for i in range(len(valeurs) - 1)])
    tit = texte(titre, 28, "#475569").next_to(nbs, UP, buff=0.25).align_to(nbs, LEFT)
    carte = RoundedRectangle(width=VGroup(nbs, tit).width + 0.6, height=VGroup(nbs, tit).height + 0.45,
                             corner_radius=0.2, fill_color=WHITE, fill_opacity=1, stroke_color="#e2e8f0",
                             stroke_width=3).move_to(VGroup(nbs, tit))
    return VGroup(carte, tit, nbs, virg)


def barre_nombre(m, color=ROUGE_ERREUR):
    """Le trait qui BARRE un nombre déjà compté."""
    return Line(m.get_corner(DL) + LEFT * 0.06, m.get_corner(UR) + RIGHT * 0.06, stroke_color=color,
                stroke_width=5)


class StatsOrganiserBase(Paysage5):
    nom_voix = "5e-stats-organiser"
    fichier_marques = "stats5_organiser_marques.json"
    identite = "Maths 5e — EleveAI"
    XL = 1.25
    GX = -3.05  # le milieu de la zone de gauche (liste et tableau)

    # ── les figures ─────────────────────────────────────────────────────────

    def liste(self):
        return bandelette(RELEVES).move_to(P(self.GX, 2.15))

    def tableau(self):
        tab = Tableau([str(v) for v in VALEURS], [[None] * 5, [None] * 5], libelles=["Traits", "Effectif"],
                      coin="Séismes", largeur_case=1.0, largeur_libelle=2.0, hauteur=0.9, fs=34,
                      centre=P(self.GX, -0.95))
        return textes_devant(tab)

    def trait(self, tab, c, k):
        """Le k-ième trait (bâton de comptage) dans la case Traits de la colonne c."""
        case = tab.case(0, c)
        x = case.get_left()[0] + 0.2 + 0.12 * k
        y = case.get_center()[1]
        return Line(P(x, y - 0.25), P(x, y + 0.25), stroke_color=NUIT, stroke_width=5).set_z_index(5)

    def tableau_plein(self, effectifs=True):
        """Le tableau, traits et effectifs compris (ajouté)."""
        tab = self.tableau()
        traits = VGroup(*[self.trait(tab, c, k) for c in range(5) for k in range(EFFECTIFS[c])])
        self.add(tab, traits)
        if effectifs:
            for c in range(5):
                tab.remplir(1, c, EFFECTIFS[c])
                tab.cases[1][c][1].set_z_index(4)
        return tab, traits

    def liste_barree(self):
        lst = self.liste()
        barres = VGroup(*[barre_nombre(m) for m in lst[2]])
        self.add(lst, barres)
        return lst, barres

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Organiser des données", self.identite, "jaune")
        self.au_mot("Une liste")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.6)
        rng = np.random.default_rng(7)
        fiches, angles = VGroup(), []
        for k in range(10):
            f = VGroup(RoundedRectangle(width=1.0, height=0.6, corner_radius=0.08, fill_color=WHITE, fill_opacity=1,
                                        stroke_width=0), sismo(0.8, 0.12 + 0.05 * (k % 3), 9, k, "#0f172a"))
            a = rng.uniform(-0.6, 0.6)
            f.move_to(P(-3.0 + rng.uniform(-1.8, 1.8), 0.25 + rng.uniform(-0.9, 0.9))).rotate(a)
            fiches.add(f)
            angles.append(a)
        self.au_mot("en désordre")
        self.play(LaggedStart(*[FadeIn(f, scale=0.5) for f in fiches], lag_ratio=0.08), run_time=0.8)
        self.au_mot("comment l'organiser")
        cible = VGroup(*[Rectangle(width=1.0, height=0.6) for _ in range(10)]).arrange_in_grid(2, 5, buff=0.12)
        cible.move_to(P(2.6, 0.25))
        self.play(*[Rotate(f, -a, about_point=f.get_center()) for f, a in zip(fiches, angles)], run_time=0.5)
        self.play(*[f.animate.move_to(c) for f, c in zip(fiches, cible)], run_time=0.8)
        q = self.t("?", 90, ORANGE_RETENUE).next_to(cible, RIGHT, buff=0.4)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la volcanologue ────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Au Piton de la Fournaise")
        v = volcan(1.25).move_to(P(-3.3, 0.3))
        nom = self.t("Piton de la Fournaise", 44, JAUNE_TITRE).move_to(P(-3.3, 3.2))
        self.play(FadeIn(v, shift=UP * 0.3), Write(nom), run_time=0.8)
        self.au_mot("une volcanologue")
        pers = volcanologue(0.5).move_to(P(3.0, 0.2))
        met = self.metier("Volcanologue", fs=44).next_to(pers, UP, buff=0.45)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(met, scale=0.8), run_time=0.6)
        self.au_mot("des capteurs comptent")
        carte = RoundedRectangle(width=5.2, height=1.3, corner_radius=0.15, fill_color="#0b1220", fill_opacity=1,
                                 stroke_color="#38bdf8", stroke_width=3).move_to(P(-3.3, -2.0))
        s1 = sismo(4.6, 0.18).move_to(carte)
        self.play(FadeIn(carte), Create(s1, rate_func=linear), run_time=1.2)
        self.au_mot("les petits séismes")
        self.play(Wiggle(v, scale_value=1.04, rotation_angle=0.02 * TAU), run_time=0.8)
        self.au_mot("S'ils se multiplient")
        s2 = sismo(4.6, 0.5, seed=11, couleur=ORANGE_RETENUE).move_to(carte)
        self.play(Transform(s1, s2), run_time=0.7)
        self.au_mot("une éruption")
        c0 = v[3].get_center()
        jet = VGroup(*[Line(c0, c0 + P(0.5 * np.cos(a), 0.9 * np.sin(a)), stroke_color=LAVE,
                            stroke_width=8) for a in np.linspace(0.35 * PI, 0.65 * PI, 5)])
        self.play(LaggedStart(*[Create(j) for j in jet], lag_ratio=0.1), run_time=0.6)
        self.au_mot("peut-être")
        q = self.t("?", 70, ORANGE_RETENUE).next_to(jet, RIGHT, buff=0.3)
        self.play(FadeIn(q, scale=0.5), run_time=0.3)
        self.attendre_voix()

    # ── 02 : la liste ───────────────────────────────────────────────────────

    def ecran_liste(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-liste")
        lst = self.liste()
        carte, tit, nbs, virg = lst
        self.au_mot("Voici ses relevés")
        self.play(FadeIn(carte, scale=0.95), FadeIn(tit), run_time=0.5)
        for k, i in enumerate(self.positions("semaines :", 14)):
            self.au_pos(i)
            anims = [FadeIn(nbs[k], scale=1.6)]
            if k > 0:
                anims.append(FadeIn(virg[k - 1]))
            self.play(*anims, run_time=0.2)
        self.au_mot("C'est une série statistique")
        serie = self.col(self.bloc(["une série", "statistique"], 46, JAUNE_TITRE), 0.8)
        acc = Brace(carte, DOWN, color=JAUNE_TITRE)
        self.play(FadeIn(serie, shift=RIGHT * 0.2), GrowFromCenter(acc), run_time=0.6)
        self.au_mot("En désordre")
        self.play(LaggedStart(*[Wiggle(m, scale_value=1.3) for m in nbs], lag_ratio=0.05), run_time=1.2)
        self.au_mot("on n'y voit rien")
        rien = self.col(self.t("On n'y voit rien !", 42, ORANGE_RETENUE), -0.6)
        self.play(FadeIn(rien, scale=1.3), run_time=0.4)
        self.insister(rien, 1.12, 0.3)
        self.attendre_voix()

    # ── 03 : le tableau ─────────────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-tableau")
        lst = self.liste()
        self.add(lst)
        tab = self.tableau()
        self.au_mot("Je prépare un tableau")
        squelette = VGroup(tab.carte, tab.coin, *[c[0] for c in tab.tetes], tab.libelles,
                           *[c for rang in tab.cases for c in rang])
        self.play(FadeIn(squelette, shift=UP * 0.2), run_time=0.6)
        self.au_mot("En haut, les valeurs")
        e1 = self.col(self.bloc(["En haut :", "les valeurs"], 40), 1.95)
        e1[1].set_color(JAUNE_TITRE)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), run_time=0.4)
        idx = self.positions("les valeurs :", 5)
        for c, i in enumerate(idx):
            self.au_pos(i)
            self.play(FadeIn(tab.tetes[c][1], scale=1.7), run_time=0.22)
        self.au_mot("En dessous")
        e2 = self.col(self.bloc(["En dessous :", "combien de jours", "pour chaque valeur"], 40), 0.0)
        e2[1].set_color(VERT_OK)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), *teinter_ligne(tab, 1, "#bbf7d0"), run_time=0.6)
        self.play(Indicate(tab.libelles[1], color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 04 : compter en barrant ─────────────────────────────────────────────

    def un_releve(self, lst, tab, k, compte, rt=0.6):
        """Le relevé k : il s'allume, une copie vole vers sa colonne, un trait
        s'ajoute dans la case Traits. Renvoie le trait (le nombre n'est pas barré)."""
        v = RELEVES[k]
        m = lst[2][k]
        vol = m.copy().set_color(AMBRE)
        tr = self.trait(tab, v, compte[v])
        compte[v] += 1
        self.play(vol.animate.move_to(tab.case(0, v)).scale(0.8), Indicate(tab.tetes[v], color=AMBRE),
                  run_time=rt)
        self.play(FadeOut(vol, scale=0.5), Create(tr), run_time=rt * 0.5)
        return tr

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-compter")
        lst = self.liste()
        tab = self.tableau()
        self.add(lst, tab)
        compte = [0] * 5
        self.au_mot("un par un")
        etapes = [self.ligne([("1.", AMBRE), ("je lis un nombre", WHITE)], 36),
                  self.ligne([("2.", AMBRE), ("un trait dans sa colonne", WHITE)], 36),
                  self.ligne([("3.", AMBRE), ("je le barre", WHITE)], 36)]
        for e, y in zip(etapes, [2.15, 1.35, 0.55]):
            self.col(e, y)
        k = min(1.0, min((6.7 - self.XL) / e.width for e in etapes))
        for e in etapes:
            e.scale(k).align_to(P(self.XL, 0), LEFT)
        doigt = Dot(radius=0.11, color=ORANGE_RETENUE).set_stroke(WHITE, 3).next_to(lst[2][0], DOWN, buff=0.12)
        self.play(FadeIn(doigt, scale=0.5), FadeIn(etapes[0], shift=RIGHT * 0.2), run_time=0.4)
        barres = VGroup()
        for k, (mot, mot_barre) in enumerate([("2 : je fais", "et je barre"), ("0 : un trait", None),
                                               ("3 : un trait", None)]):
            self.au_mot(mot)
            self.play(doigt.animate.next_to(lst[2][k], DOWN, buff=0.12), Indicate(lst[2][k], color=AMBRE,
                                                                                  scale_factor=1.5), run_time=0.3)
            if k == 0:
                self.play(FadeIn(etapes[1], shift=RIGHT * 0.2), run_time=0.3)
            self.un_releve(lst, tab, k, compte, 0.5)
            if mot_barre:
                self.au_mot(mot_barre)
                self.play(FadeIn(etapes[2], shift=RIGHT * 0.2), run_time=0.3)
            b = barre_nombre(lst[2][k])
            self.play(Create(b), run_time=0.25)
            barres.add(b)
        self.au_mot("Et ainsi de suite")
        suite = []
        for k in range(3, len(RELEVES)):
            v = RELEVES[k]
            vol = lst[2][k].copy().set_color(AMBRE)
            tr = self.trait(tab, v, compte[v])
            compte[v] += 1
            b = barre_nombre(lst[2][k])
            barres.add(b)
            suite.append(Succession(vol.animate(run_time=0.35).move_to(tab.case(0, v)).scale(0.8),
                                    AnimationGroup(FadeOut(vol, run_time=0.15), Create(tr, run_time=0.15),
                                                   Create(b, run_time=0.15))))
        self.play(FadeOut(doigt), LaggedStart(*suite, lag_ratio=0.18), run_time=1.4)
        self.au_mot("jusqu'au dernier")
        self.play(Circumscribe(lst, color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 05 : les effectifs ──────────────────────────────────────────────────

    def ecran_effectifs(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-effectifs")
        self.liste_barree()
        tab, traits = self.tableau_plein(effectifs=False)
        self.au_mot("Je compte les traits")
        tete = self.col(self.t("Je compte les traits", 40, JAUNE_TITRE), 2.15)
        self.play(FadeIn(tete, shift=RIGHT * 0.2), run_time=0.4)
        foc = ["0 séisme", "1 séisme", "2 séismes", "3 séismes", "4 séismes"]
        nbm = ["2 jours. 1", "3 jours. 2", "6 jours", "2 jours. 4", "1 jour."]
        phrase = None
        for c in range(5):
            self.au_mot(foc[c])
            mes = VGroup(*[t for t in traits if abs(t.get_center()[0] - tab.case(0, c).get_center()[0]) < 0.5])
            neuve = self.ligne([(foc[c].split()[0], JAUNE_TITRE), (foc[c][2:] + " :", WHITE),
                                (str(EFFECTIFS[c]), VERT_OK), ("jour" + ("s" if EFFECTIFS[c] > 1 else ""), WHITE)],
                               40)
            self.col(neuve, 1.1)
            neuve[2:].set_opacity(0)
            anims = [*allumer(tab, 0, c), Indicate(mes, color=AMBRE, scale_factor=1.2)]
            anims.append(FadeOut(phrase) if phrase is not None else Wait(0.01))
            self.play(*anims, FadeIn(neuve[:2]), run_time=0.4)
            self.au_mot(nbm[c])
            self.play(remplir(tab, 1, c, EFFECTIFS[c]), neuve[2:].animate.set_opacity(1), *eteindre(tab),
                      run_time=0.4)
            if c == 2:
                self.insister(tab.cases[1][2][1], 1.6, 0.25)
            phrase = neuve
        self.au_mot("c'est l'effectif")
        defi = self.col(self.bloc(["l'effectif", "de la valeur"], 46, VERT_OK), -0.3)
        eg = self.col(self.t("= le nombre de jours", 36), -1.4)
        self.play(FadeOut(phrase), FadeIn(defi, scale=0.8), Indicate(tab.libelles[1], color=VERT_OK), run_time=0.5)
        self.play(FadeIn(eg, shift=UP * 0.2), *teinter_ligne(tab, 1, "#bbf7d0"), run_time=0.5)
        self.insister(defi, 1.1, 0.3)
        self.attendre_voix()

    # ── 06 : le piège, vérifier l'effectif total ────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        lst, barres = self.liste_barree()
        tab, traits = self.tableau_plein()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 48, ROUGE_ERREUR), 2.2)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("oublier un nombre")
        e1 = self.col(self.t("oublier un nombre", 36, ORANGE_RETENUE), 1.45)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), FadeOut(barres[5]), lst[2][5].animate.set_color(ORANGE_RETENUE),
                  run_time=0.4)
        self.play(Indicate(lst[2][5], color=ORANGE_RETENUE, scale_factor=1.6), run_time=0.5)
        self.au_mot("le compter deux fois")
        e2 = self.col(self.t("ou le compter deux fois", 36, ORANGE_RETENUE), 0.85)
        faux = self.trait(tab, 2, 6).set_stroke(ROUGE_ERREUR)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), Create(faux), run_time=0.4)
        self.play(Indicate(faux, color=ROUGE_ERREUR, scale_factor=1.5), run_time=0.4)
        self.play(FadeOut(faux), FadeIn(barres[5]), lst[2][5].animate.set_color(NUIT), run_time=0.4)
        self.au_mot("Alors je vérifie")
        somme = self.ligne([("2", WHITE), ("+", WHITE), ("3", WHITE), ("+", WHITE), ("6", WHITE), ("+", WHITE),
                            ("2", WHITE), ("+", WHITE), ("1", WHITE)], 44, 0.16)
        self.col(somme, -0.15)
        idx = self.positions("je vérifie :", 6)
        for c in range(5):
            self.au_pos(idx[c])
            morceaux = [somme[2 * c]] + ([somme[2 * c - 1]] if c > 0 else [])
            self.play(*[FadeIn(m, scale=1.4) for m in morceaux],
                      Indicate(tab.cases[1][c][1], color=AMBRE, scale_factor=1.5), run_time=0.3)
        self.au_pos(idx[5])
        tot = self.ligne([("=", WHITE), ("14", VERT_OK)], 50, 0.2).next_to(somme, DOWN, buff=0.3)
        tot.align_to(somme, LEFT)
        self.play(FadeIn(tot, shift=UP * 0.2), run_time=0.35)
        self.au_mot("L'effectif total")
        lbl = self.t("effectif total", 34, VERT_OK).next_to(tot, RIGHT, buff=0.35)
        self.play(FadeIn(lbl, shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("le nombre de relevés")
        rel = self.col(self.ligne([("14", VERT_OK), ("relevés", WHITE)], 40), -2.0)
        coche = self.coche(VERT_OK, 0.28).next_to(rel, RIGHT, buff=0.3)
        self.play(Circumscribe(lst, color=VERT_OK), FadeIn(rel, scale=0.8), run_time=0.6)
        self.play(Create(coche), run_time=0.3)
        self.insister(tot[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.liste_barree()
        tab, traits = self.tableau_plein()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 48, JAUNE_TITRE), 2.2)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Quelle valeur")
        q1 = self.col(self.bloc(["1. Quelle valeur apparaît", "le plus souvent ?"], 36), 1.2)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("au moins 3 séismes")
        q2 = self.col(self.bloc(["2. Combien de jours", "avec au moins 3 séismes ?"], 36), -0.2)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE), -1.5)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        self.liste_barree()
        tab, traits = self.tableau_plein()
        titre = self.col(self.t("Correction", 48, JAUNE_TITRE), 2.2)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("La valeur la plus fréquente est 2")
        r1 = self.col(self.ligne([("La plus fréquente :", WHITE), ("2", JAUNE_TITRE)], 38), 1.3)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), *teinter_colonne(tab, 2), Indicate(tab.tetes[2], color=AMBRE),
                  run_time=0.5)
        self.au_mot("6 fois")
        r1b = self.col(self.ligne([("elle apparaît", WHITE), ("6", VERT_OK), ("fois", WHITE)], 36), 0.6)
        self.play(FadeIn(r1b, shift=RIGHT * 0.2), *allumer(tab, 1, 2), run_time=0.4)
        self.insister(tab.cases[1][2][1], 1.6, 0.25)
        self.au_mot("Au moins 3 séismes")
        self.play(*eteindre(tab), run_time=0.3)
        r2 = self.col(self.ligne([("Au moins 3 :", WHITE), ("3", JAUNE_TITRE), ("ou", WHITE), ("4", JAUNE_TITRE)], 38),
                      -0.35)
        self.play(FadeIn(r2[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("c'est 3 ou 4")
        self.play(FadeIn(r2[1:]), *teinter_colonne(tab, 3), *teinter_colonne(tab, 4), run_time=0.45)
        calc = self.ligne([("2", WHITE), ("+", WHITE), ("1", WHITE), ("=", WHITE), ("3", VERT_OK), ("jours", WHITE)],
                          44, 0.2)
        self.col(calc, -1.25)
        self.au_mot("2 plus 1")
        self.play(FadeIn(calc[:3], scale=1.3), Indicate(tab.cases[1][3][1], color=AMBRE, scale_factor=1.5),
                  Indicate(tab.cases[1][4][1], color=AMBRE, scale_factor=1.5), run_time=0.45)
        self.au_mot("égale 3 jours")
        self.play(FadeIn(calc[3:], scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(calc)), run_time=0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        lst, barres = self.liste_barree()
        tab, traits = self.tableau_plein()
        lignes = self.finale([("Je range les valeurs", "dans un tableau."),
                              ("Je compte chaque", "donnée une fois,", "en la barrant."),
                              ("Effectif total", "= nombre de données.")], [1.75, 0.15, -1.55], fs=36)
        self.au_mot("Je range les valeurs")
        self.montrer_ligne(lignes[0], Circumscribe(tab, color=AMBRE))
        self.au_mot("Je compte chaque donnée")
        self.montrer_ligne(lignes[1], LaggedStart(*[Indicate(b, color=AMBRE) for b in barres], lag_ratio=0.05))
        self.au_mot("Et je vérifie")
        self.montrer_ligne(lignes[2], Circumscribe(tab.cases[1][2], color=VERT_OK))
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_liste()
        self.ecran_tableau()
        self.ecran_compter()
        self.ecran_effectifs()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsOrganiser5e(StatsOrganiserBase):
    identite = "Maths 5e — EleveAI"
