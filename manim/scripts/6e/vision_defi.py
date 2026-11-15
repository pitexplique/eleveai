# vision_defi.py
# EleveAI — Maths 6e — série « Volume et solides », épisode S4 : DÉFIS DANS L'ESPACE
# (micro vision_defi ; la pyramide 16 + 9 + 4 + 1 sert aussi la micro vision_denombrer), notion vision_espace.
# Paysage 16:9, CEINTURE BLEUE, avec voix (manim/voix/6e-vision-defi.json, validée le 15/11, Julie, débit −6).
# Short jumeau : film Ti Margo (gâteau 3 × 3 × 3 au chocolat : 8 coins, réponse B).
# Métier : Enzo, DESSINATEUR-PROJETEUR qui prépare des énigmes en cubes pour un escape game ;
# centres : jeux-defis, sciences.
# Mapping micro → écrans : vision_defi → 02 (plan coté vu de dessus : 3 + 1 + 2 + 2 = 8), 03 (pyramide
# 9 + 4 + 1 = 14, les étages se soulèvent), 05 (cube peint 3 × 3 × 3 découpé en 27 : 8 coins à 3 faces),
# 06 (12 arêtes à 2 faces, 6 faces à 1 face), 08 (piège : le cube du centre n'est sur aucune vue ; total 27) ;
# questions 04 (pyramide 16 + 9 + 4 + 1 = 30, rép. A) et 07 (aucune face peinte : 1 cube, rép. B) ;
# défi 09 (cube 4 × 4 × 4 → 64 ; le cœur 2 × 2 × 2 = 8).
# Outils ici : CubePeint (Empilement dont chaque face visible est rouge si elle est dehors, qui s'ÉCLATE
# pour montrer les cubes cachés, et isole une catégorie : coins, arêtes, faces, centre) ; par_etages
# (ordre de dessin étage par étage, pour les pyramides aux étages décalés d'un demi-cube).
# Audit : bash <notes>/outils/dry.sh vision_defi VisionDefi6e
# HD : bash <notes>/outils/hd.sh vision_defi VisionDefi6e eleveai-maths-6e-vision-defi manim/sorties/6e/maths/vision-espace/04-defi
# Sortie : manim/sorties/6e/maths/vision-espace/04-defi/eleveai-maths-6e-vision-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_6e_commun import *  # noqa: E402,F403

PEINT = "#dc2626"     # la peinture rouge
BOIS_C = "#e9d5a8"    # le bois, dedans
COIN_C = "#ef4444"    # 3 faces peintes
ARETE_C2 = "#f97316"  # 2 faces peintes
FACE_C2 = "#facc15"   # 1 face peinte
CENTRE_C = "#e2e8f0"  # aucune
PLAN_C = "#38bdf8"
PYR_C = "#a855f7"
CACHE_C = ORANGE_RETENUE

# le plan d'Enzo : (x, z) → hauteur ; z = 1 au fond (en haut du plan), z = 0 devant (en bas)
PLAN = {(0, 1): 3, (1, 1): 1, (0, 0): 2, (1, 0): 2}
ORDRE_PLAN = [(0, 1), (1, 1), (0, 0), (1, 0)]  # 3, 1, 2, 2 : l'ordre de la voix


def par_etages(emp):
    """Redessine étage par étage (de bas en haut, puis du fond vers l'avant) : avec des étages
    décalés d'un demi-cube (pyramide), l'ordre d'Empilement ferait passer le bas devant le haut."""
    emp.submobjects = [emp.cubes[q] for q in sorted(emp.cubes, key=lambda q: (q[1], -q[2], q[0]))]
    return emp


def pyramide_cubes(n):
    """Une pyramide de n étages : n × n en bas, puis (n−1) × (n−1) décalé d'un demi-cube, etc."""
    pos = []
    for k in range(n):
        m = n - k
        pos += [(x + 0.5 * k, k, z + 0.5 * k) for x in range(m) for z in range(m)]
    return pos


def etage(emp, y):
    return VGroup(*[c for q, c in emp.cubes.items() if abs(q[1] - y) < 1e-6])


def colonnes_plan():
    return [(x, y, z) for (x, z), h in PLAN.items() for y in range(h)]


def colonne(emp, xz):
    x, z = xz
    return VGroup(*[emp.cubes[(x, y, z)] for y in range(PLAN[xz])])


class CubePeint(Empilement):
    """Un grand cube n × n × n de petits cubes, peint DEHORS : une face visible d'un petit cube est
    rouge si elle est sur le bord du grand cube (devant z = 0, dessus y = n − 1, droite x = n − 1),
    bois sinon. tout_bois : pas encore peint. eclater() écarte les petits cubes ; isoler() garde
    une catégorie (3 = coins, 2 = arêtes, 1 = faces, 0 = centre) et estompe les autres."""

    def __init__(self, n=3, e=0.6, centre=ORIGIN, tout_bois=False, sw=2.5):
        self.n, self.tout_bois = n, tout_bois
        super().__init__(pave_cubes(n, n, n), e=e, centre=centre, sw=sw, trait="#3f1d0b")

    def un_cube(self, q, couleur, sw=2.5, trait="#3f1d0b", opacite=1.0):
        x, y, z = q
        n = self.n
        P3 = lambda a, b, c: self.pp((x + a, y + b, z + c))  # noqa: E731
        dev = Polygon(P3(0, 0, 0), P3(1, 0, 0), P3(1, 1, 0), P3(0, 1, 0))
        des = Polygon(P3(0, 1, 0), P3(1, 1, 0), P3(1, 1, 1), P3(0, 1, 1))
        dro = Polygon(P3(1, 0, 0), P3(1, 0, 1), P3(1, 1, 1), P3(1, 1, 0))
        dehors = (z == 0, y == n - 1, x == n - 1)
        for f, nrm, d in ((dev, np.array([0, 0, -1.0]), dehors[0]), (des, UP, dehors[1]), (dro, RIGHT, dehors[2])):
            c = PEINT if (d and not self.tout_bois) else BOIS_C
            f.set_fill(nuance(c, nrm), opacite).set_stroke(trait, sw)
        return VGroup(dev, des, dro)

    def categorie(self, q):
        return sum(1 for v in q if v in (0, self.n - 1))

    def groupe(self, cats):
        cats = {cats} if isinstance(cats, int) else set(cats)
        return VGroup(*[c for q, c in self.cubes.items() if self.categorie(q) in cats])

    def eclater(self, g=0.45, anim=True):
        m = (self.n - 1) / 2
        dep = {q: cav((np.array(q, dtype=float) - m) * g) * self.e for q in self.cubes}
        if not anim:
            for q, c in self.cubes.items():
                c.shift(dep[q])
            return self
        return [c.animate.shift(dep[q]) for q, c in self.cubes.items()]

    def isoler(self, cats, op=0.12):
        cats = {cats} if isinstance(cats, int) else set(cats)
        anims = []
        for q, c in self.cubes.items():
            if self.categorie(q) in cats:
                anims.append(c.animate.set_fill(opacity=1).set_stroke(opacity=1))
            else:
                anims.append(c.animate.set_fill(opacity=op).set_stroke(opacity=0.25))
        return anims

    def coeur(self):
        """Les cubes du centre (aucune face dehors)."""
        return self.groupe(0)


def cadenas(s=1.0):
    corps = RoundedRectangle(width=0.8 * s, height=0.65 * s, corner_radius=0.08 * s, fill_color="#facc15",
                             fill_opacity=1, stroke_color="#92400e", stroke_width=3)
    anse = Arc(radius=0.27 * s, start_angle=0, angle=PI, stroke_color="#cbd5e1", stroke_width=8) \
        .next_to(corps, UP, buff=-0.02)
    trou = Dot(corps.get_center(), radius=0.07 * s, color="#92400e")
    return VGroup(anse, corps, trou)


class VisionDefiBase(PaysageVolume6e):
    nom_voix = "6e-vision-defi"
    fichier_marques = "vision_defi_marques.json"

    def au_extrait(self, m, ex, n=1, delai=0.0, avec=(), run_time=0.2):
        """m paraît à SON extrait de la voix (hors synchro par jetons), avec des gestes `avec`."""
        for f in m.get_family():
            f.sans_synchro = True
        self.au_mot(ex, n)
        self.wait(0.07 + delai)
        self.play(FadeIn(m, shift=UP * 0.08), *avec, run_time=run_time)

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis dans l'espace", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis dans l'espace")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        q = self.bloc(["Cubes cachés, cube peint", "puis découpé :", "sauras-tu voir", "ce qu'on ne voit pas ?"],
                      36, JAUNE_TITRE)
        gauche(q, -6.2, 0.55)
        cp = CubePeint(3, e=0.55, centre=P(3.9, 0.6))
        self.au_mot("Cubes cachés")
        self.play(FadeIn(q[0], shift=UP * 0.1), FadeIn(cp, scale=0.7), run_time=0.5)
        self.au_mot("puis découpé")
        self.play(FadeIn(q[1], shift=UP * 0.1), *cp.eclater(0.5), run_time=0.6)
        self.au_mot("sauras-tu voir")
        self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ce qu'on ne voit pas")
        cadre = SurroundingRectangle(cp.cubes[(1, 1, 1)], color=JAUNE_TITRE, buff=0.04, stroke_width=5)
        self.play(FadeIn(q[3], shift=UP * 0.1), *cp.isoler(0), Create(cadre), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ep = enzo(1.0).move_to(P(-5.2, 0.6))
        self.au_mot("Voici Enzo")
        nom = self.t("Enzo", 40, BLEU_CALCUL).next_to(ep, UP, buff=0.2)
        self.play(FadeIn(ep, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est dessinateur-projeteur")
        met = self.bloc(["dessinateur-", "projeteur"], 28, BLEU_CALCUL).next_to(ep, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        grille = vue_grille(list(PLAN), c=0.8, centre=P(-1.7, 0.9), couleur=PLAN_C)
        lg = self.t("plan vu de dessus", 26, PLAN_C).next_to(grille, DOWN, buff=0.2)
        self.au_mot("plan vu de dessus")
        self.play(FadeIn(grille, scale=0.8), FadeIn(lg), run_time=0.4)
        emp = Empilement(colonnes_plan(), e=0.6, centre=P(2.6, 1.0), couleur=VOL_C)
        fl = Arrow(grille.get_right() + RIGHT * 0.15, emp.get_left() + LEFT * 0.15, buff=0, color=WHITE,
                   stroke_width=5)
        lv = self.t("la pièce en volume", 26, VOL_C).next_to(emp, DOWN, buff=0.2)
        self.au_mot("la pièce en volume")
        self.play(GrowArrow(fl), FadeIn(lv), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(emp.cubes[q], shift=DOWN * 0.25) for q in emp.cubes], lag_ratio=0.08),
                  run_time=0.8)
        self.add(emp)
        self.au_mot("des énigmes en cubes")
        b = self.bloc(["Des énigmes en cubes", "pour un escape game"], 32, JAUNE_TITRE)
        gauche(b, -2.9, -2.2)
        cd = cadenas(1.0).move_to(P(2.6, -2.2))
        self.play(FadeIn(b[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("escape game")
        self.play(FadeIn(b[1], shift=UP * 0.1), FadeIn(cd, scale=0.6), run_time=0.35)
        self.play(Indicate(cd, color=WHITE), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le plan coté ───────────────────────────────────────────────────
    def ecran_plan(self):
        self.ecran("02-plan")
        self.au_mot("Premier défi")
        tit = self.t("Premier défi : un plan vu de dessus", 38, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.45)
        grille = vue_grille(list(PLAN), c=1.2, centre=P(-4.4, 0.6), couleur=PLAN_C)
        self.au_mot("un plan vu de dessus")
        self.play(FadeIn(grille, scale=0.8), run_time=0.4)
        nums = {xz: hors_audit(Text(str(h), font_size=54, color="#0f172a", weight=BOLD)
                               .move_to(grille.carreaux[xz])) for xz, h in PLAN.items()}
        self.au_mot("un nombre dans chaque carreau")
        self.play(LaggedStart(*[FadeIn(nums[xz], scale=1.4) for xz in ORDRE_PLAN], lag_ratio=0.2), run_time=0.7)
        emp = Empilement(colonnes_plan(), e=0.75, centre=P(-0.5, 0.7), couleur=VOL_C)
        x = 1.3
        l1 = self.bloc(["Le nombre dit combien", "de cubes sont empilés."], 30)
        gauche(l1, x, 1.7)
        self.au_mot("Le nombre dit combien")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de cubes sont empilés")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        anims = []
        for xz in ORDRE_PLAN:
            anims.append(AnimationGroup(Indicate(VGroup(grille.carreaux[xz], nums[xz]), color=WHITE, scale_factor=1.08),  # le nombre reste DEVANT
                                        LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in colonne(emp, xz)],
                                                    lag_ratio=0.3)))
        self.play(LaggedStart(*anims, lag_ratio=0.5), run_time=1.4)
        self.add(emp, *nums.values())
        self.au_mot("Pour compter tous les cubes")
        # 4 lignes : sur 2, « Pour compter tous les cubes, » sortait de l'écran à droite (BORD)
        l2 = self.bloc(["Pour compter", "tous les cubes,", "on additionne", "les nombres :"], 30)
        gauche(l2, x, 0.2)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("on additionne les nombres")
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeIn(l2[3], shift=UP * 0.1), run_time=0.3)
        s = self.ligne([("3", BLEU_D), ("+ 1", BLEU_D), ("+ 2", BLEU_D), ("+ 2", BLEU_D), ("= 8 cubes", VERT_OK)], 44,
                       buff=0.22)
        gauche(s, -6.2, -2.55)
        hors_audit(s[3])  # le 2e « 2 » (l'audit compare au 1er)
        extraits = [("3 plus", 1, 0.0), ("1 plus", 1, 0.0), ("2 plus 2", 1, 0.0), None]
        for k, (xz, ext) in enumerate(zip(ORDRE_PLAN, extraits)):
            avec = [Indicate(colonne(emp, xz), color=WHITE, scale_factor=1.05),
                    Indicate(nums[xz], color=JAUNE_TITRE, scale_factor=1.3)]
            if ext:
                self.au_extrait(s[k], ext[0], ext[1], ext[2], avec=avec, run_time=0.25)
            else:  # le 2e « 2 » n'a pas de marque à lui (« 2 plus 2, 8 ») : il suit le 1er de 0,2 s (RETARD sinon)
                for f in s[k].get_family():
                    f.sans_synchro = True
                self.wait(0.2)
                self.play(FadeIn(s[k], shift=UP * 0.08), *avec, run_time=0.25)
        self.au_extrait(s[4], "8 cubes", avec=[Indicate(emp, color=VERT_OK, scale_factor=1.03)], run_time=0.3)
        self.insister(s[4], 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : la pyramide ────────────────────────────────────────────────────
    def ecran_pyramide(self):
        self.ecran("03-pyramide")
        self.au_mot("Deuxième défi")
        tit = self.t("Deuxième défi : une pyramide de cubes", 38, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.45)
        emp = par_etages(Empilement(pyramide_cubes(3), e=0.72, centre=P(-4.0, -0.75), couleur=PYR_C))
        etages = [etage(emp, y) for y in range(3)]
        x = -1.5
        rangs = [(["En bas :", "3 sur", "3 :", "9 cubes"], ["En bas", "3 sur", "3 : 9", "9 cubes"], (2,), 1.95),
                 (["Au milieu :", "2 sur", "2 :", "4 cubes"], ["Au milieu", "2 sur", "2 : 4", "4 cubes"], (2,), 1.2),
                 (["En haut :", "1 cube"], ["En haut", "1 cube"], (), 0.45)]
        for k, (txt, ex, deja, y) in enumerate(rangs):
            lg = self.ligne([(txt[0], PYR_C)] + [(t, WHITE) for t in txt[1:]], 34, buff=0.18)
            gauche(lg, x, y)
            for i in deja:
                hors_audit(lg[i])
            self.au_extrait(lg[0], ex[0], avec=[LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in etages[k]],
                                                            lag_ratio=0.05)], run_time=0.45 if k < 2 else 0.3)
            for m, e in zip(lg[1:], ex[1:]):
                self.au_extrait(m, e, run_time=0.18)
        self.add(emp)
        s = self.ligne([("9", BLEU_D), ("+ 4", BLEU_D), ("+ 1", BLEU_D), ("= 14 cubes", VERT_OK)], 40, buff=0.22)
        gauche(s, x, -0.55)
        for i in (0, 1, 2):
            hors_audit(s[i])  # 9, 4 et 1 déjà dits : l'audit compare au 1er
        for k, ex in enumerate(["9 plus", "4 plus", "1, 14"]):
            self.au_extrait(s[k], ex, avec=[Indicate(etages[k], color=WHITE, scale_factor=1.04)], run_time=0.18)
        self.au_extrait(s[3], "14 cubes", run_time=0.25)
        self.insister(s[3], 1.12, 0.25)
        self.au_mot("Beaucoup sont cachés dessous")
        l4 = self.t("Beaucoup sont cachés dessous !", 30, CACHE_C)
        gauche(l4, x, -1.45)
        self.play(FadeIn(l4, shift=UP * 0.1), etages[1].animate.shift(UP * 0.75), etages[2].animate.shift(UP * 1.5),
                  run_time=0.6)
        self.play(Indicate(VGroup(etages[0], etages[1]), color=CACHE_C, scale_factor=1.03), run_time=0.6)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        emp = par_etages(Empilement(pyramide_cubes(4), e=0.4, centre=P(-4.0, 1.45), couleur=PYR_C))
        etages = [etage(emp, y) for y in range(4)]
        labs = VGroup(*[hors_audit(Text(str((4 - k) ** 2), font_size=26, color=JAUNE_TITRE, weight=BOLD)
                                   .next_to(emp.pp((0.5 * k, k + 0.5, 0.5 * k)), LEFT, buff=0.14)) for k in range(4)])  # ne touchent plus l'étage

        def avant_q(sc):  # la pyramide entre avec la question (« Une pyramide »), pas après les choix
            sc.play(FadeIn(emp, shift=UP * 0.2), run_time=0.4)

        def autres_q(sc):  # les étages déjà dits (16, 9, 4, 1) s'écrivent ensuite
            sc.play(FadeIn(labs), run_time=0.4)

        def apres(sc):
            pas, y0 = 0.58, -1.3
            sc.au_mot("On additionne les étages")
            sc.play(Indicate(emp, color=WHITE, scale_factor=1.04), run_time=0.4)
            l1 = sc.rep_bas(0, ["16", "+ 9", "= 25"], fs=32, y0=y0, pas=pas, buff=0.2)
            sc.au_extrait(l1[0], "16 plus", avec=[Indicate(etages[0], color=JAUNE_TITRE, scale_factor=1.03)])
            sc.au_extrait(l1[1], "9, 25", avec=[Indicate(etages[1], color=JAUNE_TITRE, scale_factor=1.04)])
            sc.au_extrait(l1[2], "25.")
            l2 = sc.rep_bas(1, ["25", "+ 4", "= 29"], fs=32, y0=y0, pas=pas, buff=0.2)
            hors_audit(l2[0])
            sc.au_extrait(VGroup(l2[0], l2[1]), "4, 29", avec=[Indicate(etages[2], color=JAUNE_TITRE,
                                                                         scale_factor=1.05)])
            sc.au_extrait(l2[2], "29.")
            l3 = sc.rep_bas(2, ["29", "+ 1", "= 30 cubes."], fs=32, y0=y0, pas=pas, buff=0.2)
            hors_audit(l3[0])
            sc.au_extrait(VGroup(l3[0], l3[1]), "1, 30", avec=[Indicate(etages[3], color=JAUNE_TITRE,
                                                                         scale_factor=1.1)])
            sc.au_extrait(l3[2], "30 cubes")
            l4 = hors_audit(sc.rep_bas(3, [("16, c'est seulement l'étage du bas.", ORANGE_RETENUE)], fs=30, y0=y0,
                                       pas=pas))
            sc.au_extrait(l4, "16, c'est", avec=[Indicate(etages[0], color=ORANGE_RETENUE, scale_factor=1.03)],
                          run_time=0.3)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Une pyramide a 4 étages :", "16, puis 9, puis 4,", "puis 1 cube.",
                             "Combien de cubes en tout ?"],
                            [self.choix("30 cubes"), self.choix("16 cubes"), self.choix("20 cubes")], 0,
                            ["16 + 9 = 25", "25 + 4 = 29", "29 + 1 = 30 cubes.", "16, c'est seulement l'étage du bas."],
                            mot_q="Une pyramide", avant_q=avant_q, autres_q=autres_q, autres_r=apres)

    # ── 05 : le cube peint, les coins ───────────────────────────────────────
    def ecran_peint(self):
        self.ecran("05-peint")
        self.au_mot("Troisième défi")
        tit = self.t("Troisième défi : le cube peint", 38, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.45)
        c0 = P(-3.9, -0.3)
        bois = CubePeint(3, e=0.75, centre=c0, tout_bois=True)
        cp = CubePeint(3, e=0.75, centre=c0)
        x = -1.0
        l1 = self.ligne([("Un grand cube de", WHITE), ("3 sur", WHITE), ("3 sur", WHITE), ("3", WHITE)], 32,
                        buff=0.16)
        gauche(l1, x, 2.15)
        hors_audit(l1[2])
        hors_audit(l1[3])
        self.au_extrait(l1[0], "Un grand cube", avec=[FadeIn(bois, scale=0.7)], run_time=0.4)
        for m, ex in zip(l1[1:], [("3 sur", 1), ("3 sur", 2), ("3 est", 1)]):
            self.au_extrait(m, ex[0], ex[1], run_time=0.18)
        self.au_mot("est peint en rouge")
        l2 = self.t("peint en rouge, dehors.", 32, PEINT)
        gauche(l2, x, 1.5)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(cp), run_time=0.5)
        self.remove(bois)
        self.au_mot("On le découpe")
        self.play(*cp.eclater(0.45), run_time=0.6)
        l3 = self.t("Découpé en 27 petits cubes.", 32)
        gauche(l3, x, 0.7)
        self.au_extrait(l3, "27 petits", run_time=0.3)
        l4 = self.ligne([("Les coins :", COIN_C), ("3 faces peintes", COIN_C)], 32, buff=0.2)
        gauche(l4, x, -0.3)
        hors_audit(l4[1])  # le « 3 » est déjà dit (3 sur 3 sur 3)
        self.au_extrait(l4[0], "des coins", avec=cp.isoler(3), run_time=0.35)
        self.au_extrait(l4[1], "3 faces", run_time=0.2)
        g = self.gros("8 coins", couleur=COIN_C, fs=40)
        gauche(g, x + 0.2, -1.2)
        coins = cp.groupe(3)
        self.au_extrait(g, "8 coins", avec=[LaggedStart(*[Indicate(c, color=WHITE, scale_factor=1.15) for c in coins],
                                                         lag_ratio=0.1)], run_time=0.8)
        self.attendre_voix()

    # ── 06 : les arêtes, les faces ──────────────────────────────────────────
    def ecran_aretes(self):
        self.ecran("06-aretes")
        cp = CubePeint(3, e=0.75, centre=P(-3.9, -0.3)).eclater(0.45, anim=False)
        self.add(cp)
        x = -1.0
        l1 = self.ligne([("Sur chaque arête :", ARETE_C2), ("2 faces peintes", ARETE_C2)], 30, buff=0.2)
        gauche(l1, x, 2.3)
        self.au_extrait(l1[0], "Sur chaque arête", avec=cp.isoler(2), run_time=0.45)
        self.au_extrait(l1[1], "2 faces", run_time=0.2)
        l2 = self.ligne([("12 arêtes :", ARETE_C2), ("12 petits cubes", WHITE)], 30, buff=0.2)
        gauche(l2, x, 1.6)
        hors_audit(l2[1])  # le 2e « 12 » : la marque « 12 arêtes : 12 petits » est d'un seul tenant (6,0 s)
        aretes = cp.groupe(2)
        self.au_extrait(l2[0], "12 arêtes", run_time=0.25)
        for f in l2[1].get_family():  # même marque que « 12 arêtes » : il suit de 0,3 s (au_mot donnait un RETARD)
            f.sans_synchro = True
        self.wait(0.3)
        self.play(FadeIn(l2[1], shift=UP * 0.08),
                  LaggedStart(*[Indicate(c, color=WHITE, scale_factor=1.15) for c in aretes], lag_ratio=0.06),
                  run_time=0.8)
        l3 = self.ligne([("Au milieu d'une face :", FACE_C2), ("1 face peinte", FACE_C2)], 30, buff=0.2)
        gauche(l3, x, 0.45)
        self.au_extrait(l3[0], "Au milieu de chaque face", avec=cp.isoler(1), run_time=0.45)
        self.au_extrait(l3[1], "1 face", run_time=0.2)
        l4 = self.ligne([("6 faces :", FACE_C2), ("6 petits cubes", WHITE)], 30, buff=0.2)
        gauche(l4, x, -0.25)
        hors_audit(l4[1])  # le 2e « 6 »
        faces = cp.groupe(1)
        self.au_extrait(l4[0], "6 faces", avec=[LaggedStart(*[Indicate(c, color=WHITE, scale_factor=1.15)
                                                                for c in faces], lag_ratio=0.12)], run_time=0.8)
        self.au_extrait(l4[1], "6 petits", run_time=0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        cp = CubePeint(3, e=0.55, centre=P(-4.4, 1.35))

        def avant_q(sc):  # le cube peint entre avec la question
            sc.play(FadeIn(cp, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            y0, pas = -1.4, 0.6
            l0 = sc.rep_bas(0, [("Un seul ne touche aucun bord :", VERT_OK)], fs=30, y0=y0, pas=pas)
            sc.au_mot("Un seul petit cube")
            sc.play(FadeIn(l0), *cp.eclater(0.5), run_time=0.5)
            l1 = sc.rep_bas(1, [("celui du centre, caché au milieu.", VERT_OK)], fs=30, y0=y0, pas=pas)
            cadre = SurroundingRectangle(cp.cubes[(1, 1, 1)], color=JAUNE_TITRE, buff=0.04, stroke_width=5)
            sc.au_mot("celui du centre")
            sc.play(FadeIn(l1), *cp.isoler(0), Create(cadre), run_time=0.5)
            l2 = sc.rep_bas(2, ["Vérifions :", "8", "+ 12", "+ 6", "+ 1", "= 27"], fs=30, y0=y0, pas=pas, buff=0.16)
            sc.au_mot("Vérifions")
            sc.play(FadeIn(l2[0]), *cp.isoler((0, 1, 2, 3)), FadeOut(cadre), run_time=0.35)
            for m, ex, cat in zip(l2[1:5], ["8 plus", "12 plus", "6 plus", "1, 27"], (3, 2, 1, 0)):
                sc.au_extrait(m, ex, avec=[Indicate(cp.groupe(cat), color=WHITE, scale_factor=1.06)], run_time=0.25)
            sc.au_extrait(l2[5], "27.", run_time=0.25)
            l3 = sc.rep_bas(3, [("Le compte est bon !", VERT_OK)], fs=30, y0=y0, pas=pas)
            sc.au_mot("Le compte est bon")
            sc.play(FadeIn(l3, scale=1.1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Combien de petits cubes", "n'ont aucune face peinte ?"],
                            [self.choix("aucun"), self.choix("1 cube"), self.choix("6 cubes")], 1,
                            ["Un seul ne touche aucun bord :", "celui du centre, caché au milieu.",
                             "Vérifions : 8 + 12 + 6 + 1 = 27", "Le compte est bon !"],
                            mot_q="Combien de petits cubes", avant_q=avant_q, autres_r=apres)

    # ── 08 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        cp = CubePeint(3, e=0.7, centre=P(-4.5, 0.35))
        self.play(Write(tit), FadeIn(cp), run_time=0.4)
        x = -1.7
        l0 = self.bloc(["On ne compte pas seulement", "ce qu'on voit."], 30)
        gauche(l0, x, 2.05)
        self.au_mot("On ne compte pas")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ce qu'on voit")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        l1 = self.bloc(["Le cube du centre", "n'apparaît sur aucune vue,"], 30, CACHE_C)
        gauche(l1, x, 0.95)
        vues = VGroup()
        for nom in ("de face", "de dessus", "de droite"):
            g = vue_grille([(i, j) for i in range(3) for j in range(3)], c=0.3, couleur=PEINT)
            vues.add(VGroup(g, Text(nom, font_size=22, color="#cbd5e1").next_to(g, DOWN, buff=0.1)))
        vues.arrange(RIGHT, buff=0.45).move_to(P(x + 2.2, -0.4)).align_to(P(x, 0), LEFT)
        self.au_mot("Le cube du centre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("n'apparaît sur aucune vue")
        self.play(FadeIn(l1[1], shift=UP * 0.1), LaggedStart(*[FadeIn(v, scale=0.8) for v in vues], lag_ratio=0.25),
                  run_time=0.6)
        self.au_mot("et il existe quand même")
        l2 = self.t("et il existe quand même !", 30, VERT_OK)
        gauche(l2, x, -1.55)
        self.play(FadeIn(l2, shift=UP * 0.1), *cp.eclater(0.5), run_time=0.5)
        cadre = SurroundingRectangle(cp.cubes[(1, 1, 1)], color=JAUNE_TITRE, buff=0.04, stroke_width=5)
        self.play(*cp.isoler(0), Create(cadre), run_time=0.45)
        l3 = self.ligne([("Pour vérifier :", WHITE), ("8 + 12 + 6 + 1", BLEU_D), ("= 27", VERT_OK)], 34, buff=0.2)
        gauche(l3, -6.2, -2.75)
        hors_audit(l3[1])  # rappel du compte de l'écran 07
        self.au_mot("Pour vérifier")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le total doit retomber")
        self.play(FadeIn(l3[1], shift=UP * 0.1), *cp.isoler((0, 1, 2, 3)), FadeOut(cadre), run_time=0.4)
        self.au_extrait(l3[2], "27.", run_time=0.25)
        self.insister(l3[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        cp = CubePeint(4, e=0.6, centre=P(-3.9, 0.0), tout_bois=True)
        cp_rouge = CubePeint(4, e=0.6, centre=P(-3.9, 0.0))
        x = -0.6
        l0 = self.t("Enzo peint un grand cube", 32)
        gauche(l0, x, 2.25)
        self.au_mot("Enzo peint")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(cp, scale=0.7), run_time=0.45)
        self.play(FadeIn(cp_rouge), run_time=0.4)
        self.remove(cp)
        l1 = self.ligne([("de", WHITE), ("4 sur", WHITE), ("4 sur", WHITE), ("4,", WHITE)], 32, buff=0.16)
        gauche(l1, x, 1.65)
        hors_audit(l1[2])
        hors_audit(l1[3])
        self.add(l1[0])
        for m, (ex, n) in zip(l1[1:], [("4 sur", 1), ("4 sur", 2), ("4, puis", 1)]):
            self.au_extrait(m, ex, n, run_time=0.18)
        l2 = self.t("découpé en 64 petits cubes.", 32)
        gauche(l2, x, 1.05)
        self.au_mot("le découpe")
        self.play(*cp_rouge.eclater(0.4), run_time=0.6)
        self.au_extrait(l2, "64 petits", run_time=0.3)
        q = self.bloc(["Combien de petits cubes", "n'ont aucune face peinte ?"], 34, JAUNE_TITRE)
        gauche(q, x, -0.25)
        self.au_mot("Combien de petits cubes")
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("n'ont aucune face peinte")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE).move_to(P(1.6, -2.35))
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        cp = CubePeint(4, e=0.6, centre=P(-3.9, 0.0)).eclater(0.4, anim=False)
        self.add(cp)
        x = -0.6
        l0 = self.bloc(["Les cubes sans peinture forment", "un cube caché au centre :"], 30)
        gauche(l0, x, 1.95)  # 2,25 collait au titre
        self.au_mot("Les petits cubes sans peinture")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("un cube caché au centre")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        l1 = self.bloc(["On retire une couche", "de chaque côté."], 30, CACHE_C)
        gauche(l1, x, 0.85)
        self.au_mot("on retire une couche")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de chaque côté")
        coeur = cp.coeur()
        cadres = VGroup(*[SurroundingRectangle(c, color=JAUNE_TITRE, buff=0.03, stroke_width=4) for c in coeur])
        self.play(FadeIn(l1[1], shift=UP * 0.1), *cp.isoler(0, op=0.08), run_time=0.6)
        self.play(Create(cadres), run_time=0.4)
        l2 = self.ligne([("Il reste", WHITE), ("2 sur", WHITE), ("2 sur", WHITE), ("2 :", WHITE)], 34, buff=0.16)
        gauche(l2, x, -0.15)
        hors_audit(l2[2])
        hors_audit(l2[3])
        self.au_extrait(l2[0], "Il reste", run_time=0.2)
        for m, (ex, n) in zip(l2[1:], [("2 sur", 1), ("2 sur", 2), ("2 : 2", 1)]):
            self.au_extrait(m, ex, n, run_time=0.18)
        l3 = self.ligne([("2 × 2", BLEU_D), ("= 4", BLEU_D)], 36, buff=0.2)
        gauche(l3, x, -0.9)
        hors_audit(l3[0])  # les 2 sont déjà dits
        self.au_extrait(l3[0], "2 fois 2", run_time=0.2)
        self.au_extrait(l3[1], "4 ;", run_time=0.2)
        l4 = self.ligne([("4", BLEU_D), ("× 2", BLEU_D), ("= 8 petits cubes", VERT_OK)], 36, buff=0.2)
        gauche(l4, x, -1.65)
        hors_audit(l4[0])
        hors_audit(l4[1])
        self.au_extrait(VGroup(l4[0], l4[1]), "2, 8", run_time=0.2)
        self.au_extrait(l4[2], "8 petits", avec=[Indicate(coeur, color=JAUNE_TITRE, scale_factor=1.08)], run_time=0.4)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        cp = CubePeint(3, e=0.5)
        lignes = self.finale_gauche(cp, textes=[
            ("Pour compter des cubes, on pense", "aux cachés : étage par étage, ou", "colonne par colonne avec le plan."),
            ("Dans le cube peint : coins, arêtes,", "faces et centre se comptent à part."),
            ("Et on vérifie le total.",)], fs=30, x_fig=-4.9, xl=-2.6)
        for f in lignes.get_family():
            f.sans_synchro = True
        hors_audit(lignes)
        self.add(cp)
        self.au_mot("Pour compter des cubes")
        self.montrer_ligne(lignes[0])
        self.au_mot("Dans le cube peint")
        self.montrer_ligne(lignes[1])
        self.play(*cp.eclater(0.45), run_time=0.6)
        self.au_mot("Et on vérifie le total")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_plan()
        self.ecran_pyramide()
        self.ecran_question1()
        self.ecran_peint()
        self.ecran_aretes()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class VisionDefi6e(VisionDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "bleue"
