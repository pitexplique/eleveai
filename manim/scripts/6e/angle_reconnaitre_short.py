# angle_reconnaitre_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 01 « Reconnaître un angle »
# (micro angle_reconnaitre). CEINTURE BLANCHE : on VOIT les angles.
# Il AMUSE : « Il y a des angles cachés dans l'alphabet ! »
#   · EN HAUT, la lettre en bâtons (V, L, Z, I, N, M) : chaque trait se dessine,
#     un point rouge et un arc orange sur chaque sommet ;
#   · EN BAS, au même instant, le compteur par lettre se remplit ;
#   · 1 question-pause (3 s) : combien d'angles dans le N ? ;
#   · fin : le mot NIL en grand, sans donner la réponse, réponse en commentaire.
# Centres d'intérêt : cinema-series, art-design.
# Voix : manim/voix/6e-angle-reconnaitre-short.json (validée, débit −6) ; WAV :
# public/sons/6e-angle-reconnaitre-short/ ; marques : angle_reconnaitre_short_marques.json.
# Ajouté ICI : Lettre (bâtons + sommets), Compteur, cartes étroites de la question
# (le N se dessine à côté d'elles).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/angle_reconnaitre_short.py AngleReconnaitreShort
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/angle_reconnaitre_short.py AngleReconnaitreShort -o eleveai-maths-6e-angle-reconnaitre-short --media_dir manim/scripts/6e/media-angle-01-short
# Sortie : manim/sorties/6e/maths/angles/01-reconnaitre/eleveai-maths-6e-angle-reconnaitre-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403

BATONS = {"V": [(-0.62, 0.8), (0, -0.8), (0.62, 0.8)],
          "L": [(-0.48, 0.8), (-0.48, -0.8), (0.52, -0.8)],
          "Z": [(-0.62, 0.8), (0.62, 0.8), (-0.62, -0.8), (0.62, -0.8)],
          "I": [(0, 0.8), (0, -0.8)],
          "N": [(-0.58, -0.8), (-0.58, 0.8), (0.58, -0.8), (0.58, 0.8)],
          "M": [(-0.74, -0.8), (-0.74, 0.8), (0, -0.15), (0.74, 0.8), (0.74, -0.8)]}
Y_LETTRE = 1.2


class Lettre(VGroup):
    """Une lettre en bâtons. .traits[i] (Line), .sommets[i] (Dot rouge du sommet i),
    .arcs[i] (Arc orange du sommet i) : créés, pas montrés (seuls .traits sont
    dans le groupe au départ ; la scène pose le reste au mot)."""

    def __init__(self, nom, centre=P(0, Y_LETTRE), k=1.0, sw=14, **kw):
        super().__init__(**kw)
        pts = [np.array(centre) + P(x, y) * k for x, y in BATONS[nom]]
        self.traits = VGroup(*[Line(a, b, color=COTE, stroke_width=sw) for a, b in zip(pts, pts[1:])])
        self.sommets, self.arcs = VGroup(), VGroup()
        for i in range(1, len(pts) - 1):
            p, a, b = pts[i], pts[i - 1], pts[i + 1]
            d1 = np.degrees(np.arctan2(*(a - p)[1::-1]))
            d2 = np.degrees(np.arctan2(*(b - p)[1::-1]))
            delta = (d2 - d1 + 180) % 360 - 180
            r_arc = {"M": 0.42, "N": 0.75}.get(nom, 0.5) * max(k, 0.7)
            # derrière les traits : l'arc s'arrête net sur les côtés, sans les couper
            self.arcs.add(Arc(radius=r_arc, start_angle=np.deg2rad(d1), angle=np.deg2rad(delta), arc_center=p,
                              stroke_color=ARC, stroke_width=7).set_z_index(-1))
            self.sommets.add(Dot(p, radius=0.11 * max(k, 0.7), color=SOMMET))
        self.add(self.traits)

    def dessiner(self, duree=0.45):
        """Les traits se dessinent l'un après l'autre (une seule animation)."""
        return Succession(*[Create(t, run_time=duree / len(self.traits)) for t in self.traits], run_time=duree)


class Compteur(VGroup):
    """Une case par lettre : la lettre dessus, le nombre d'angles dessous."""

    def __init__(self, noms="VLZINM", c=0.64, y=-1.25, **kw):
        super().__init__(**kw)
        self.noms = noms
        self.cases, self.lettres, self.nb = VGroup(), {}, {}
        x0 = -(len(noms) - 1) * c / 2
        self.xy = {}
        for i, n in enumerate(noms):
            x = x0 + i * c
            haut = Rectangle(width=c, height=0.66, fill_color="#0f172a", fill_opacity=1, stroke_color=GRILLE_ANGLE, stroke_width=3).move_to(P(x, y + 0.33))
            bas = Rectangle(width=c, height=0.72, fill_color="#0b1220", fill_opacity=1, stroke_color=GRILLE_ANGLE, stroke_width=3).move_to(P(x, y - 0.36))
            self.cases.add(haut, bas)
            t = Text(n, font_size=30, color=COTE, weight=BOLD).move_to(haut)
            self.lettres[n] = t
            self.xy[n] = bas.get_center()
        self.add(self.cases)

    def nombre(self, lettre, v):
        """Le Text du nombre de cette case (créé, placé, PAS ajouté)."""
        t = Text(str(v), font_size=42, color=VERT_OK, weight=BOLD).move_to(self.xy[lettre])
        t.sans_synchro = t._pas_audit = True
        return t


GRILLE_ANGLE = "#64748b"


class AngleReconnaitreShort(ShortProp):
    nom_voix = "6e-angle-reconnaitre-short"
    fichier_marques = "angle_reconnaitre_short_marques.json"
    ceinture = "blanche"
    _crochet_a = None

    def au_mot(self, extrait, n=1):
        if extrait == "A :" and self._crochet_a:  # le N se dessine avant le choix A
            f, self._crochet_a = self._crochet_a, None
            f()
        super().au_mot(extrait, n)

    def _disposer_q(self, question, choix, phrase):
        """Trois cartes étroites à gauche : le N se dessine à côté d'elles."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        neuves = VGroup(*[self._carte_choix(l, c, 2.1, 28) for l, c in zip("ABC", choix)])
        neuves.arrange(DOWN, buff=0.1).next_to(q, DOWN, buff=0.22).set_x(-0.95)
        self.cartes_q = neuves
        pause.next_to(neuves, DOWN, buff=0.15).set_x(0)
        ph.next_to(neuves, DOWN, buff=0.15).set_x(0)
        return tete, q, neuves, pause, rebours, ph

    def legende(self, s, couleur=WHITE, fs=34):
        return self.ligne([(s, couleur)], fs).move_to(P(0, 0.0))

    def compter(self, cpt, lettre, ancien, v):
        """Animations : le nombre de la case passe à v (et insiste à la fin)."""
        neuf = cpt.nombre(lettre, v)
        anims = [FadeIn(neuf, scale=1.6)]
        if ancien is not None:
            anims.append(FadeOut(ancien))
        return neuf, anims

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("L'alphabet caché", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        cpt = Compteur()
        sous = self.t("nombre d'angles", 26, VERT_OK).move_to(P(0, -2.25))
        sous.sans_synchro = True

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Il y a")
        self.play(Write(titre), run_time=0.5)
        self.au_mot("angles")
        self.play(FadeIn(cpt.cases, shift=UP * 0.15), FadeIn(sous), run_time=0.35)
        self.au_mot("l'alphabet")
        abc = VGroup(*[Text(c, font_size=60, color=JAUNE_TITRE, weight=BOLD) for c in "ABCDE"]).arrange(RIGHT, buff=0.25)
        abc.move_to(P(0, Y_LETTRE))
        self.play(LaggedStart(*[FadeIn(x, scale=1.8) for x in abc], lag_ratio=0.2), run_time=0.6)
        self.attendre_voix(marge=0.15)

        # ── 01 : V et L ──
        self.dire("01-lettres")
        v = Lettre("V")
        self.au_mot("lettre V")
        self.play(FadeOut(abc), FadeIn(cpt.lettres["V"], scale=1.5), run_time=0.3)
        self.au_mot("deux traits")
        leg = self.legende("deux traits")
        self.play(Create(v.traits[0]), FadeIn(leg), run_time=0.35)
        self.au_mot("partent")
        self.play(Create(v.traits[1]), run_time=0.35)
        self.au_mot("même point")
        self.play(FadeIn(v.sommets[0], scale=2.5), Flash(v.sommets[0], color=SOMMET, line_length=0.2), run_time=0.4)
        self.au_mot("Un angle")
        leg2 = self.legende("Un angle !", ARC, 38)
        n, anims = self.compter(cpt, "V", None, 1)
        self.play(FadeOut(leg), FadeIn(leg2, scale=1.2), Create(v.arcs[0]), *anims, run_time=0.4)
        self.insister(n, 1.3)
        self.au_mot("La lettre L")
        l_ = Lettre("L")
        self.play(FadeOut(VGroup(v, v.sommets, v.arcs)), FadeOut(leg2), FadeIn(cpt.lettres["L"], scale=1.5), run_time=0.25)
        self.play(l_.dessiner(0.4))
        self.au_mot("un angle aussi")
        leg3 = self.legende("Un angle aussi", ARC, 34)
        n, anims = self.compter(cpt, "L", None, 1)
        self.play(FadeIn(l_.sommets[0], scale=2.5), Create(l_.arcs[0]), FadeIn(leg3, scale=1.2), *anims, run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : Z et I ──
        self.dire("02-z")
        z = Lettre("Z")
        self.au_mot("lettre Z")
        self.play(FadeOut(VGroup(l_, l_.sommets, l_.arcs)), FadeOut(leg3), FadeIn(cpt.lettres["Z"], scale=1.5), run_time=0.2)
        self.play(z.dessiner(0.4))
        self.au_mot("deux points")
        leg = self.legende("deux points")
        n1, anims = self.compter(cpt, "Z", None, 1)
        self.play(FadeIn(z.sommets[0], scale=2.5), Create(z.arcs[0]), FadeIn(leg), *anims, run_time=0.35)
        self.au_mot("tourne")
        n2, anims = self.compter(cpt, "Z", n1, 2)
        self.play(FadeIn(z.sommets[1], scale=2.5), Create(z.arcs[1]), *anims, run_time=0.35)
        self.au_mot("Donc 2")
        leg2 = self.ligne([("2 angles", ARC)], 38).move_to(P(0, 0.0))
        self.play(FadeOut(leg), FadeIn(leg2, scale=1.2), run_time=0.3)
        self.insister(n2, 1.3)
        self.au_mot("lettre I")
        i_ = Lettre("I")
        self.play(FadeOut(VGroup(z, z.sommets, z.arcs)), FadeOut(leg2), FadeIn(cpt.lettres["I"], scale=1.5), Create(i_.traits[0]),
                  run_time=0.4)
        self.au_mot("Aucun")
        leg3 = self.legende("Aucun !", ROUGE_ERREUR, 40)
        n, anims = self.compter(cpt, "I", None, 0)
        n.set_color(ROUGE_ERREUR)
        self.play(FadeIn(leg3, scale=1.3), *anims, run_time=0.35)
        self.attendre_voix(marge=0.2)
        compteur_fige = VGroup(cpt.cases, *[cpt.lettres[c] for c in "VLZIN"])
        chiffres = VGroup(cpt.nombre("V", 1), cpt.nombre("L", 1), cpt.nombre("Z", 2), n)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        nn = Lettre("N", P(1.2, -0.45), k=0.92)

        def dessiner_n():
            self.au_mot("lettre N")
            self.play(nn.dessiner(0.5))

        def apres(sc):
            sc.rep(0, avec=[])
            sc.au_mot("en haut")
            sc.play(FadeIn(nn.sommets[0], scale=2.5), Create(nn.arcs[0]), run_time=0.3)
            sc.au_mot("en bas")
            sc.play(FadeIn(nn.sommets[1], scale=2.5), Create(nn.arcs[1]), run_time=0.3)
            sc.rep(1)
            sc.rep_fin()

        self._crochet_a = dessiner_n
        self.question_pause("03-question", "03b-reponse", ["Combien d'angles", "dans la lettre N ?"],
                            [self.t("1", 30), self.t("2", 30), self.t("3", 30)], 1,
                            ["Le N tourne en haut et en bas :", "2 sommets, donc 2 angles."], mot_q="Combien",
                            autres_r=apres)
        self.vider(garder)

        # ── 04 : M ──
        self.dire("04-m")
        chiffres.add(cpt.nombre("N", 2))
        self.add(compteur_fige, chiffres, sous)
        m = Lettre("M")
        self.au_mot("lettre M")
        self.play(FadeIn(cpt.lettres["M"], scale=1.5), m.dessiner(0.45))
        ancien = None
        for i, duree in enumerate((0.25, 0.25, 0.25)):
            ancien, anims = self.compter(cpt, "M", ancien, i + 1)
            if i == 2:
                self.au_mot("3 angles")
                leg = self.ligne([("3 angles !", ARC)], 40).move_to(P(0, 0.0))
                anims.append(FadeIn(leg, scale=1.3))
            self.play(FadeIn(m.sommets[i], scale=2.5), Create(m.arcs[i]), *anims, run_time=duree)
        self.insister(ancien, 1.3)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 05 : la question en commentaire ──
        self.dire("05-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 44, JAUNE_TITRE).move_to(P(0, 1.5))
        self.play(FadeIn(et, scale=1.3), run_time=0.3)
        self.au_mot("Combien")
        q = self.borne(self.t("Combien d'angles", 34), 0.7).move_to(P(0, 0.1))
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.3)
        self.au_mot("le mot NIL")
        q2 = self.borne(self.t("dans le mot NIL,", 34), 0.7).move_to(P(0, -0.42))
        k = 0.85
        mots = VGroup(Lettre("N", P(-1.32, 1.2), k=k, sw=13), Lettre("I", P(-0.2, 1.2), k=k, sw=13),
                      Lettre("L", P(0.92, 1.2), k=k, sw=13))
        self.play(FadeOut(et), FadeIn(q2, shift=UP * 0.12), run_time=0.2)
        self.play(*[x.dessiner(0.45) for x in mots])
        self.au_mot("écrit en majuscules")
        q3 = self.borne(self.t("écrit en majuscules ?", 32, ORANGE_RETENUE), 0.7).move_to(P(0, -0.92))
        self.play(FadeIn(q3, shift=UP * 0.12), run_time=0.3)
        self.appel_commentaire(y=-1.85)
