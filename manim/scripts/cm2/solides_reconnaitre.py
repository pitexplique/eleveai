# solides_reconnaitre.py
# EleveAI — Maths CM2 — série « Solides » (cm2-solides), épisode 01 : RECONNAÎTRE LES SOLIDES
# (micro solide_reconnaitre, notion solide), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Va plus loin que le CE2 (ce2 solides_reconnaitre) : deux TRIS (ça roule ? une pointe ?) et le
# vocabulaire précis (base, prisme droit, disque / polygone).
# Décor et métier : Gabriel, INGÉNIEUR SPATIAL (la station faite de solides : module = cylindre,
# nez = cône, réservoir = boule, panneau solaire = pavé très plat).
# Mapping micro → écrans : 02 (premier tri : rouler / faces plates), 03 (deuxième tri : la pointe ;
# deux bases face à face), 04 (la station de Gabriel), 06 (piège cylindre / prisme, cône / pyramide),
# questions 05 (deux bases en triangle + 3 rectangles : prisme droit, rép. C) et 07 (toit d'antenne :
# pyramide, rép. B), défi 08 (6 faces rectangles : le pavé droit, son patron se plie).
# Voix : manim/voix/cm2-solides-reconnaitre.json (validée le 15/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/solides_reconnaitre.py SolidesReconnaitreCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/solides_reconnaitre.py SolidesReconnaitreCM2 -o eleveai-maths-cm2-solides-reconnaitre --media_dir manim/scripts/cm2/media-sol-01
# Sortie : manim/sorties/cm2/maths/solides/01-reconnaitre/eleveai-maths-cm2-solides-reconnaitre.mp4

import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_cm2_commun import *  # noqa: E402,F403

C_MODULE = "#cbd5e1"   # le module (cylindre)
C_NEZ = "#ef4444"      # le nez (cône)
C_RES = "#f59e0b"      # le réservoir (boule)
C_PAN = "#3b82f6"      # le panneau solaire (pavé)
C_CUBE, C_PAVE, C_PRI, C_PYR = FACE_C, "#a78bfa", TOILE, "#fbbf24"
C_BOULE, C_CYL, C_CONE = "#3b82f6", "#ef4444", "#22c55e"


def prisme_tri(a=1.3, p=1.4, axe="z", **k):
    """Prisme droit à base triangulaire (triangle équilatéral de côté a)."""
    return prisme([(0, 0), (a, 0), (a / 2, a * np.sqrt(3) / 2)], p, axe=axe, **k)


def panneau(e=1.0, centre=ORIGIN):
    """Le panneau solaire : un pavé très plat, bleu, quadrillé sur le dessus."""
    b = pave(1.6, 0.08, 0.9, e=e, centre=centre, couleur=C_PAN, couleur_trait="#bfdbfe", sw=3)
    k = 3  # le dessus
    g = VGroup(*[Line(b.sur_face(k, u, 0), b.sur_face(k, u, 1), color="#bfdbfe", stroke_width=2)
                 for u in (0.25, 0.5, 0.75)],
               Line(b.sur_face(k, 0, 0.5), b.sur_face(k, 1, 0.5), color="#bfdbfe", stroke_width=2))
    b.add(g)
    return b


def station(s=1.0, centre=ORIGIN):
    """La station de Gabriel : module (cylindre), nez (cône), réservoir (boule), deux panneaux
    (pavés très plats). Attributs : module, nez, reservoir, panneaux."""
    mod = Cylindre(0.55, 1.5, e=1.0, centre=ORIGIN, couleur=C_MODULE, couleur_trait="#475569")
    hublots = VGroup(*[Circle(radius=0.12, fill_color="#1e3a8a", fill_opacity=1, stroke_color="#475569",
                              stroke_width=3).move_to(P(-0.05, y)) for y in (0.35, -0.2)])
    mod.add(hublots)
    haut = sum(mod._haut) / len(mod._haut)
    bas = sum(mod._bas) / len(mod._bas)
    nez = Cone(0.55, 0.9, e=1.0, couleur=C_NEZ, couleur_trait="#fee2e2", opacite=1.0)
    nez.remove(nez.bas_cache)
    nez.shift(haut - sum(nez._bas) / len(nez._bas))
    res = Boule(0.45, centre=bas + DOWN * 0.95, couleur=C_RES)
    tige = Line(bas + DOWN * 0.2, bas + DOWN * 0.55, color="#94a3b8", stroke_width=8)
    pans = VGroup(panneau(1.0, P(-1.95, 0.05)), panneau(1.0, P(1.95, 0.05)))
    barres = VGroup(Line(P(-1.0, 0.05), P(-0.5, 0.05), color="#94a3b8", stroke_width=8),
                    Line(P(0.5, 0.05), P(1.0, 0.05), color="#94a3b8", stroke_width=8))
    g = VGroup(tige, barres, pans, res, mod, nez)
    g.module, g.nez, g.reservoir, g.panneaux = mod, nez, res, pans
    g.scale(s).move_to(centre)
    return g


def etoiles(n=28, graine=7):
    rnd = random.Random(graine)
    g = VGroup()
    while len(g) < n:
        x, y = rnd.uniform(-2.8, 6.2), rnd.uniform(-3.3, 2.4)
        if x > 4.0 and y < -1.6:
            continue  # Ti-Margo
        g.add(Dot(P(x, y), radius=rnd.choice((0.02, 0.03, 0.04)), color=WHITE).set_opacity(rnd.uniform(0.35, 0.8)))
    return g


def antenne(e=1.0, centre=ORIGIN):
    """Le toit d'une antenne : un mât, et une pyramide à base carrée en haut."""
    mat = pave(0.3, 1.5, 0.3, e=e, couleur="#94a3b8", couleur_trait="#e2e8f0")
    toit = pyramide(4, 1.1, 1.0, e=e, couleur=C_PYR, couleur_trait="#fef3c7")
    toit.shift(mat.get_top() - toit.get_bottom() + DOWN * 0.08 * e)
    g = VGroup(mat, toit)
    d = np.array(centre) - g.get_center()
    mat.shift(d)
    toit.shift(d)  # Solide.shift : les surlignages suivent
    g.toit = toit
    return g


class SolidesReconnaitreBase(PaysageSolidesCM2):
    nom_voix = "cm2-solides-reconnaitre"
    fichier_marques = "solides_reconnaitre_marques.json"

    def sept(self, e=0.6):
        """Les sept solides du CM2 : cube, pavé, prisme, pyramide, cylindre, cône, boule."""
        return VGroup(cube(e=e, couleur=C_CUBE), pave(e=e, couleur=C_PAVE),
                      prisme_tri(1.3, 1.4, e=e, couleur=C_PRI, couleur_trait="#fff7ed"),
                      pyramide(4, e=e, couleur=C_PYR), Cylindre(e=e, couleur=C_CYL),
                      Cone(e=e, couleur=C_CONE), Boule(0.5 * e / 0.6, couleur=C_BOULE))

    def ligne(self, morceaux, fs=40, buff=0.2):
        """Les morceaux côte à côte, sur la MÊME ligne de base (« Premier tri : » et « peut-il
        rouler ? » : centrés en hauteur, le p descendait la ligne)."""
        lg = super().ligne(morceaux, fs, buff)
        txt = [m for m, _ in morceaux]
        plein = Text(" ".join(txt), font_size=fs)
        if len(plein.submobjects) == sum(1 for ch in " ".join(txt) if not ch.isspace()):
            k = 0
            for m, s in zip(lg, txt):
                n = sum(1 for ch in s if not ch.isspace())
                if n and len(m.submobjects) == n:
                    m.shift(UP * (plein[k].get_center()[1] - m[0].get_center()[1]))
                k += n
        return lg

    def poser_ligne(self, morceaux, extraits, x, y, fs=30, buff=0.2):
        lg = self.ligne(morceaux, fs, buff=buff)
        gauche(lg, x, y)
        self.aux_extraits(lg, extraits)
        return lg

    def rep_ex(self, lignes, extraits, fs=30, y0=-1.75, pas=0.6, gestes=None):
        """La réponse d'une question-pause : chaque ligne verte à SON extrait (hors synchro),
        avec son geste sur la figure."""
        gestes = gestes or {}
        for i, (l, ex) in enumerate(zip(lignes, extraits)):
            lg = self.rep_bas(i, [l] if isinstance(l, (str, tuple)) else l, fs=fs, y0=y0, pas=pas)
            self.aux_extraits([lg], [ex], run_time=0.25)
            if i in gestes:
                self.play(*gestes[i], run_time=0.35)
        self.rep_fini()

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître les solides", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Reconnaître les solides")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        sept = self.sept(0.58).arrange(RIGHT, buff=0.42, aligned_edge=DOWN).move_to(P(0, 0.2))
        if sept.width > 12.2:
            sept.scale_to_fit_width(12.2)
        noms = ["cube", "pavé", "prisme", "pyramide", "cylindre", "cône", "boule"]
        extraits = ["Cube", "pavé", "prisme", "pyramide", "cylindre", "cône", "boule"]
        for i, (s, nom, ex) in enumerate(zip(sept, noms, extraits)):
            lab = self.t(nom, 26, BLEU_CALCUL).move_to(P(s.get_center()[0], -0.7 - 0.42 * (i % 2)))
            self.aux_extraits([VGroup(s, lab)], [ex], run_time=0.2)
        self.au_mot("comment les distinguer")
        q = self.t("Comment les distinguer ?", 40, JAUNE_TITRE).move_to(P(0, 1.45))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Gabriel, ingénieur spatial ─────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        gp = gabriel(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Gabriel")
        nom = self.t("Gabriel", 42, BLEU_CALCUL).next_to(gp, UP, buff=0.2)
        self.play(FadeIn(gp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("ingénieur spatial")
        met = self.bloc(["ingénieur", "spatial"], 28, BLEU_CALCUL).next_to(gp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        ciel = etoiles()
        st = station(0.88, P(1.1, -0.55))
        self.au_mot("dans l'espace")
        self.play(FadeIn(ciel, lag_ratio=0.05), run_time=0.6)
        self.au_mot("Sa station est faite de morceaux")
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in st], lag_ratio=0.15), run_time=1.0)
        self.au_mot("chaque morceau a la forme d'un solide")
        l1 = self.t("Chaque morceau a la forme d'un solide.", 30, JAUNE_TITRE).move_to(P(1.2, 2.9))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.play(*[Indicate(m, color=JAUNE_TITRE, scale_factor=1.08)
                    for m in (st.module, st.nez, st.reservoir, st.panneaux)], run_time=0.8)
        self.au_mot("Lesquels")
        q = self.t("Lesquels ?", 44, JAUNE_TITRE).move_to(P(5.0, 1.3))
        self.play(FadeIn(q, scale=1.2), run_time=0.35)
        self.attendre_voix()

    # ── 02 : premier tri, ça roule ? ────────────────────────────────────────
    def ecran_rouler(self):
        self.ecran("02-rouler")
        tit = self.ligne([("Premier tri :", JAUNE_TITRE), ("peut-il rouler ?", JAUNE_TITRE)], 42, buff=0.25) \
            .move_to(P(0, 3.1))
        self.aux_extraits(tit, ["Premier tri", "peut rouler"])
        sep = DashedLine(P(-0.35, 2.4), P(-0.35, -2.9), color="#475569", stroke_width=3)
        self.play(Create(sep), run_time=0.3)
        sol = Line(P(-6.3, -0.55), P(-0.8, -0.55), color="#64748b", stroke_width=4)
        bo = Boule(0.5, centre=P(-5.2, -0.05), couleur=C_BOULE)
        cy = Cylindre(0.45, 1.0, e=1.0, couleur=C_CYL)
        cy.shift(P(-3.4, -0.55) - cy.get_bottom() + UP * 0.0)
        co = Cone(0.5, 1.15, e=1.0, couleur=C_CONE)
        co.shift(P(-1.65, -0.55) - co.get_bottom())
        self.aux_extraits([VGroup(sol, bo)], ["La boule"], run_time=0.25)
        self.aux_extraits([cy], ["le cylindre"], run_time=0.25)
        self.aux_extraits([co], ["le cône"], run_time=0.25)
        l1 = self.t("une surface courbe :", 30, VERT_OK).move_to(P(-3.5, -1.35))
        self.aux_extraits([l1], ["une surface courbe"])
        self.play(Indicate(bo, color=VERT_OK, scale_factor=1.1), Indicate(cy.corps, color=VERT_OK),
                  Indicate(co.corps, color=VERT_OK), run_time=0.6)
        l2 = self.gros("ils roulent !", couleur=VERT_OK, fs=34).move_to(P(-3.5, -2.2))
        self.aux_extraits([l2], ["ils roulent"])
        self.play(rouler(bo, 0.6, 0.5, run_time=0.5))
        self.play(rouler(bo, -0.6, 0.5, run_time=0.5))
        sol2 = Line(P(0.15, -0.55), P(6.3, -0.55), color="#64748b", stroke_width=4)
        cu = cube(0.85, e=1.0, couleur=C_CUBE)
        pv = pave(1.3, 0.7, 0.8, e=1.0, couleur=C_PAVE)
        pr = prisme_tri(1.1, 0.9, e=1.0, couleur=C_PRI, couleur_trait="#fff7ed")
        py = pyramide(4, 1.0, 1.2, e=1.0, couleur=C_PYR)
        for s, x in zip((cu, pv, pr, py), (0.75, 2.45, 4.05, 5.5)):
            s.shift(P(x, -0.55) - s.get_bottom())
        self.aux_extraits([VGroup(sol2, cu)], ["Le cube"], run_time=0.25)
        self.aux_extraits([pv], ["le pavé"], run_time=0.25)
        self.aux_extraits([pr], ["le prisme"], run_time=0.25)
        self.aux_extraits([py], ["la pyramide"], run_time=0.25)
        l3 = self.bloc(["n'ont que", "des faces plates"], 30, ROUGE_ERREUR).move_to(P(2.6, -1.75))
        self.aux_extraits([l3], ["n'ont que des faces plates"])
        self.play(*[FadeIn(s.face(k, "#fde68a", 0.55)) for s in (cu, pv, py) for k in range(len(s.faces_i))
                    if s.vue_face[k]], *[FadeIn(pr.face(k, "#fde68a", 0.55)) for k in range(5) if pr.vue_face[k]],
                  run_time=0.5)
        self.attendre_voix()

    # ── 03 : deuxième tri, une pointe ? ─────────────────────────────────────
    def ecran_pointe(self):
        self.ecran("03-pointe")
        tit = self.ligne([("Deuxième tri :", JAUNE_TITRE), ("y a-t-il une pointe ?", JAUNE_TITRE)], 42, buff=0.25) \
            .move_to(P(0, 3.1))
        self.aux_extraits(tit, ["Deuxième tri", "y a-t-il une pointe"])
        co = Cone(0.65, 1.5, e=1.0, couleur=C_CONE, centre=P(-5.1, 1.0))
        py = pyramide(4, 1.3, 1.5, e=1.0, couleur=C_PYR, centre=P(-2.1, 1.0))
        self.aux_extraits([co], ["Le cône a"], run_time=0.25)
        lc1 = self.t("un disque", 26, FACE_C).move_to(P(-5.1, -0.6))
        lc2 = self.t("et une pointe", 26, SOMMET_C).move_to(P(-5.1, -1.12))
        self.aux_extraits([VGroup(lc1, co.disque_bas("#38bdf8"))], ["un disque"])
        self.aux_extraits([VGroup(lc2, co.pointe(r=0.14))], ["et une pointe"])
        self.play(Flash(co._s, color=SOMMET_C), run_time=0.4)
        self.aux_extraits([py], ["La pyramide a"], run_time=0.25)
        lp1 = self.t("une base", 26, BASE_C).move_to(P(-2.1, -0.6))
        self.aux_extraits([VGroup(lp1, py.face(0, BASE_C))], ["une base"])
        lp2 = self.t("des triangles", 26, LAT_C).move_to(P(-2.1, -1.12))
        tri = VGroup(*[py.face(k, LAT_C, 0.6) for k in range(1, 5) if py.vue_face[k]])
        self.aux_extraits([VGroup(lp2, tri)], ["des triangles"])
        lp3 = self.t("jusqu'à la pointe", 26, SOMMET_C).move_to(P(-2.1, -1.64))
        self.aux_extraits([VGroup(lp3, py.sommet(4, r=0.14))], ["jusqu'à la pointe"])
        self.play(Flash(py.pt(4), color=SOMMET_C), run_time=0.4)
        sep = DashedLine(P(-0.2, 2.4), P(-0.2, -2.9), color="#475569", stroke_width=3)
        cy = Cylindre(0.6, 1.4, e=1.0, couleur=C_CYL, centre=P(1.3, 1.0))
        pr = prisme_tri(1.4, 1.5, e=1.0, couleur=C_PRI, couleur_trait="#fff7ed", centre=P(4.2, 1.0))
        self.aux_extraits([VGroup(sep, cy, pr)], ["Le cylindre et le prisme"], run_time=0.3)
        l1 = self.t("deux bases pareilles,", 30, BASE_C).move_to(P(2.7, -0.75))
        self.aux_extraits([VGroup(l1, cy.disque_haut(BASE_C), cy.disque_bas(BASE_C), pr.face(0, BASE_C),
                                  pr.face(1, BASE_C))], ["deux bases pareilles"])
        l2 = self.gros("face à face", couleur=BASE_C, fs=32).move_to(P(2.7, -1.55))
        self.aux_extraits([l2], ["face à face"])
        self.play(Indicate(cy, color=BASE_C, scale_factor=1.06), Indicate(pr, color=BASE_C, scale_factor=1.06),
                  run_time=0.6)
        self.attendre_voix()

    # ── 04 : la station de Gabriel ──────────────────────────────────────────
    def ecran_station(self):
        self.ecran("04-station")
        tit = self.t("Dans la station de Gabriel", 42, JAUNE_TITRE).move_to(P(0, 3.1))
        self.aux_extraits([tit], ["Dans la station de Gabriel"])
        st = station(1.0, P(-3.25, -0.45))
        self.play(FadeIn(etoiles(18, 3).shift(LEFT * 3.5 + DOWN * 0.1)), FadeIn(st), run_time=0.4)
        x = 0.7
        rangs = [("Le module :", "un cylindre", C_MODULE, st.module, 2.1, "le module", "est un cylindre"),
                 ("Le nez :", "un cône", C_NEZ, st.nez, 1.15, "Le nez", "est un cône"),
                 ("Le réservoir :", "une boule", C_RES, st.reservoir, 0.2, "Le réservoir", "est une boule")]
        for a, b, c, part, y, ex1, ex2 in rangs:
            lg = self.ligne([(a, WHITE), (b, c)], 34, buff=0.25)
            gauche(lg, x, y)
            self.aux_extraits([lg[0]], [ex1])
            self.play(Indicate(part, color=c, scale_factor=1.12), run_time=0.4)
            self.aux_extraits([lg[1]], [ex2])
        lg = self.t("Et le panneau solaire ?", 34)
        gauche(lg, x, -0.75)
        self.aux_extraits([lg], ["Et le panneau solaire"])
        self.play(*[Indicate(p, color=C_PAN, scale_factor=1.12) for p in st.panneaux], run_time=0.5)
        g = self.gros("Un pavé très plat !", couleur=C_PAN, fs=34)
        gauche(g, x + 0.3, -1.6)
        self.aux_extraits([g], ["Un pavé très plat"])
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pr = prisme_tri(1.5, 1.7, e=1.05, couleur="#60a5fa", centre=P(-3.9, 1.0))

        def autres_q(sc):
            sc.play(FadeIn(pr, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            sc.rep_ex(["Deux bases + des rectangles :", "c'est un prisme droit,", "à base triangulaire."],
                      ["Deux bases pareilles", "c'est un prisme droit", "à base triangulaire"],
                      gestes={0: [FadeIn(pr.face(0, BASE_C, 0.7)), FadeIn(pr.face(1, BASE_C)),
                                  *[FadeIn(pr.face(k, LAT_C, 0.5)) for k in (2, 3, 4) if pr.vue_face[k]]]})

        self.question_pause("05-question", "05b-reponse",
                            ["Deux bases en triangle,", "face à face, et 3 rectangles", "sur les côtés : quel solide ?"],
                            [self.choix("une pyramide"), self.choix("un cône"), self.choix("un prisme droit")], 2,
                            ["Deux bases + des rectangles :", "c'est un prisme droit,", "à base triangulaire."],
                            mot_q="Un solide a deux", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.aux_extraits([tit], ["Attention"])
        l0 = self.ligne([("Le cylindre et le prisme :", WHITE), ("deux bases face à face.", BASE_C)], 30, buff=0.25)
        gauche(l0, -6.2, 2.25)
        cy = Cylindre(0.55, 1.1, e=1.0, couleur=C_CYL, centre=P(-5.3, 0.75))
        pr = prisme(regulier(6, 0.62, rot=0), 1.0, axe="y", e=1.0, couleur=C_PRI, couleur_trait="#fff7ed",
                    centre=P(0.9, 0.75))
        self.aux_extraits([VGroup(l0[0], cy, pr)], ["Le cylindre et le prisme"])
        self.aux_extraits([l0[1]], ["deux bases face à face"])
        self.play(FadeIn(cy.disque_haut(BASE_C)), FadeIn(cy.disque_bas(BASE_C)), FadeIn(pr.face(0, BASE_C)),
                  FadeIn(pr.face(1, BASE_C)), run_time=0.4)
        c1 = self.t("des disques,", 30, FACE_C)
        gauche(c1, -4.35, 1.05)
        self.aux_extraits([c1], ["a des disques"])
        c2 = self.t("et il roule.", 30, VERT_OK)
        gauche(c2, -4.35, 0.45)
        self.aux_extraits([c2], ["et il roule"])
        self.play(Indicate(cy.corps, color=VERT_OK), run_time=0.4)
        p1 = self.t("des polygones,", 30, FACE_C)
        gauche(p1, 2.1, 1.05)
        self.aux_extraits([p1], ["a des polygones"])
        p2 = self.bloc(["seulement des", "faces plates."], 30, ROUGE_ERREUR)
        gauche(p2, 2.1, 0.2)
        self.aux_extraits([p2], ["seulement des faces plates"])
        self.play(*[FadeIn(pr.face(k, "#fde68a", 0.55)) for k in range(2, 8) if pr.vue_face[k]], run_time=0.4)
        l3 = self.t("Pareil pour le cône et la pyramide :", 30)
        gauche(l3, -6.2, -0.75)
        co = Cone(0.55, 1.15, e=1.0, couleur=C_CONE, centre=P(-5.3, -2.15))
        py = pyramide(5, 0.85, 1.15, e=1.0, couleur=C_PYR, centre=P(0.9, -2.15))
        self.aux_extraits([VGroup(l3, co, py)], ["Pareil pour le cône"])
        d1 = self.t("un disque,", 30, FACE_C)
        gauche(d1, -4.35, -2.2)
        self.aux_extraits([VGroup(d1, co.disque_bas(BASE_C))], ["un disque"])
        d2 = self.t("ou un polygone.", 30, FACE_C)
        gauche(d2, 2.1, -2.2)
        self.aux_extraits([VGroup(d2, py.face(0, BASE_C))], ["ou un polygone"])
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        an = antenne(1.15, P(-3.9, 0.9))
        to = an.toit

        def autres_q(sc):
            sc.play(FadeIn(an, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            tri = [to.face(k, LAT_C, 0.6) for k in range(1, 5) if to.vue_face[k]]
            sc.rep_ex(["Une base, des triangles,", "une pointe : une pyramide,", "à base carrée."],
                      ["Une base, et des triangles", "jusqu'à une pointe", "une pyramide à base carrée"],
                      gestes={0: [FadeIn(to.face(0, BASE_C)), *[FadeIn(x) for x in tri]],
                              1: [FadeIn(to.sommet(4, r=0.14)), Flash(to.pt(4), color=SOMMET_C)]})

        self.question_pause("07-question", "07b-reponse",
                            ["Le toit d'une antenne :", "une base carrée, 4 triangles", "qui montent vers une pointe."],
                            [self.choix("un cône"), self.choix("une pyramide"), self.choix("un prisme")], 1,
                            ["Une base, des triangles,", "une pointe : une pyramide,", "à base carrée."],
                            mot_q="Le toit", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def patron_mystere(self, centre=P(-3.9, 0.1), e=1.05):
        pc, par, pli = patron_pave(1.3, 0.8, 0.55)
        return PatronLibre(pc, par, e=e, centre=centre, couleur="#c084fc"), pli

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.aux_extraits([tit], ["À toi de jouer"])
        x = -1.7
        l0 = self.t("Je suis un solide.", 34)
        gauche(l0, x, 2.2)
        self.aux_extraits([l0], ["Je suis un solide"])
        pa, _ = self.patron_mystere()
        l1 = self.t("J'ai 6 faces,", 34)
        gauche(l1, x, 1.6)
        self.aux_extraits([l1], ["6 faces"])
        l1b = self.t("toutes des rectangles,", 34, "#c084fc")
        gauche(l1b, x, 1.0)
        self.aux_extraits([VGroup(l1b, pa)], ["toutes des rectangles"], run_time=0.35)
        l2 = self.t("mais pas toutes des carrés.", 34, ROUGE_ERREUR)
        gauche(l2, x, 0.4)
        self.aux_extraits([l2], ["mais pas toutes des carrés"])
        q = self.t("Qui suis-je ?", 44, JAUNE_TITRE)
        gauche(q, x, -0.55)
        self.aux_extraits([q], ["Qui suis-je"])
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, x, -1.5)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        pa, pli = self.patron_mystere()
        self.add(pa)
        x = -1.7
        l0 = self.t("6 faces plates,", 34)
        gauche(l0, x, 2.2)
        l0b = self.t("des rectangles :", 34, "#c084fc")
        gauche(l0b, x, 1.6)
        self.aux_extraits([l0, l0b], ["6 faces plates", "des rectangles"])
        g = self.gros("c'est un pavé droit.", couleur=VERT_OK, fs=36)
        gauche(g, x, 0.75)
        self.aux_extraits([g], ["c'est un pavé droit"])
        self.play(pa.plier(tilt=0, run_time=0.45))
        self.play(pa.plier(pli, run_time=1.0))
        l1 = self.ligne([("Si les 6 faces", WHITE), ("étaient des carrés pareils,", WHITE)], 30, buff=0.2)
        l1.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        gauche(l1, x, -0.45)
        self.aux_extraits(l1, ["6 faces étaient", "des carrés pareils"])
        cu = cube(e=0.8, couleur=C_CUBE, centre=P(x + 0.55, -2.05))
        l2 = self.t("ce serait un cube.", 30, C_CUBE)
        gauche(l2, x + 1.4, -2.05)
        self.aux_extraits([VGroup(cu, l2)], ["ce serait un cube"])
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        e = 0.42
        ronds = VGroup(Boule(0.36, couleur=C_BOULE), Cylindre(e=e, couleur=C_CYL), Cone(e=e, couleur=C_CONE)) \
            .arrange(RIGHT, buff=0.3, aligned_edge=DOWN)
        plats = VGroup(cube(e=e, couleur=C_CUBE), pave(e=e, couleur=C_PAVE),
                       prisme_tri(1.3, 1.4, e=e, couleur=C_PRI, couleur_trait="#fff7ed"),
                       pyramide(4, e=e, couleur=C_PYR)).arrange(RIGHT, buff=0.25, aligned_edge=DOWN)
        fig = VGroup(ronds, plats).arrange(DOWN, buff=0.6)
        fig.scale_to_fit_width(3.3)
        lignes = self.finale_gauche(fig, textes=[
            ("Ça roule : la boule,", "le cylindre, le cône."),
            ("Que des faces plates : le cube,", "le pavé, le prisme, la pyramide."),
            ("Deux bases face à face :", "prisme ou cylindre."),
            ("Une pointe : pyramide ou cône.",)], fs=28, x_fig=-4.65, xl=-2.45)
        self.au_mot("Ça roule")
        self.montrer_ligne(lignes[0], FadeIn(ronds))
        self.au_mot("Que des faces plates")
        self.montrer_ligne(lignes[1], FadeIn(plats))
        self.au_mot("Deux bases face à face")
        self.montrer_ligne(lignes[2], Indicate(plats[2], color=BASE_C), Indicate(ronds[1], color=BASE_C))
        self.au_mot("Une pointe")
        self.montrer_ligne(lignes[3], Indicate(plats[3], color=SOMMET_C), Indicate(ronds[2], color=SOMMET_C))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rouler()
        self.ecran_pointe()
        self.ecran_station()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class SolidesReconnaitreCM2(SolidesReconnaitreBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
