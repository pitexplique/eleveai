# 5e_volume_unite.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode V7 : LES UNITÉS DE VOLUME
# (micro volume_unite, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : 5e-volume-unite-short (le cube magique : 10 × 10 × 10 = 1 000 cm³ = 1 L).
# Décor et métier : Fanta, POMPIÈRE (la citerne en m³, la lance en litres ; centres sport, sciences).
# Mapping micro → écrans : 02 (le cube de 1 dm = 10 cm : 10 × 10 × 10 = 1 000 cubes de 1 cm³ ; rempli d'eau,
# 1 L ; 1 L = 1 dm³ = 1 000 cm³), 03 (le cube de 1 m = 10 dm : 1 000 dm³ ; 1 m³ = 1 000 L), 04 (méthode :
# × 1 000 ou ÷ 1 000 d'une unité à la suivante, pas × 10 : trois dimensions), 06 (piège : longueurs par 10,
# volumes par 1 000 ; 3 dm³ = 3 000 cm³, pas 30), questions 05 (C : 1 000 cm³) et 07 (A : 1 000 L),
# défi 08 (3,5 m³ = 3 500 L ; 3 500 ÷ 500 = 7 minutes).
# Fiche : lib/fiches/maths-5e-volumes.tsx.
# Voix : manim/voix/5e-volume-unite.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_volume_unite_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py volume-unite).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_volume_unite.py VolumeUnite5e
# Sortie finale : manim/sorties/5e/maths/volume/07-volume-unite/eleveai-maths-5e-volume-unite.mp4

import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

# Une couleur par unité, la même sur tout l'épisode
CM_T = "#facc15"                                               # cm³ : le petit cube (jaune)
DM_F, DM_D, DM_C, DM_B = "#fdba74", "#fed7aa", "#fb923c", "#9a3412"   # le cube de 1 dm (orange) ; dm³
DM_T = "#fdba74"
M_F, M_D, M_C, M_B = "#86efac", "#bbf7d0", "#4ade80", "#14532d"       # le cube de 1 m (vert) ; m³
M_T = "#86efac"
EAU_F, EAU_D, EAU_C, EAU_B = "#38bdf8", "#7dd3fc", "#0ea5e9", "#0c4a6e"  # l'eau ; L
EAU_T = "#7dd3fc"
SURL = "#facc15"                                               # le surlignage (rangée, couche)
CAMION_C, CAMION_B = "#dc2626", "#7f1d1d"
CITERNE_C, CITERNE_B = "#cbd5e1", "#475569"


def cube_unite(u, o, f=DM_F, d=DM_D, c=DM_C, b=DM_B, grille=True, sw=4):
    """Le cube de 10 × 10 × 10 petits cubes (cavalière), o = le coin avant-bas-gauche."""
    return pave(10, 10, 10, u, o, face=f, dessus=d, cote=c, bord=b, grille=grille, sw=sw)


def morceau(cube, x0, x1, y0, y1, z0, z1, couleur=SURL, op=0.88):
    """Les faces VISIBLES du bloc [x0, x1] × [y0, y1] × [z0, z1] d'un cube de 10 (la rangée, la couche, le petit
    cube), avec leurs carreaux : la face avant si y0 = 0, le dessus si z1 = 10, le côté droit si x1 = 10."""
    q, bord = cube.pt, PAVE_BORD
    g = VGroup()
    faces = []
    if y0 == 0:
        faces.append(([q(x0, 0, z0), q(x1, 0, z0), q(x1, 0, z1), q(x0, 0, z1)],
                      [(q(i, 0, z0), q(i, 0, z1)) for i in range(x0 + 1, x1)] +
                      [(q(x0, 0, k), q(x1, 0, k)) for k in range(z0 + 1, z1)]))
    if z1 == 10:
        faces.append(([q(x0, y0, 10), q(x1, y0, 10), q(x1, y1, 10), q(x0, y1, 10)],
                      [(q(i, y0, 10), q(i, y1, 10)) for i in range(x0 + 1, x1)] +
                      [(q(x0, j, 10), q(x1, j, 10)) for j in range(y0 + 1, y1)]))
    if x1 == 10:
        faces.append(([q(10, y0, z0), q(10, y1, z0), q(10, y1, z1), q(10, y0, z1)],
                      [(q(10, j, z0), q(10, j, z1)) for j in range(y0 + 1, y1)] +
                      [(q(10, y0, k), q(10, y1, k)) for k in range(z0 + 1, z1)]))
    for pts, traits in faces:
        g.add(Polygon(*pts, fill_color=couleur, fill_opacity=op, stroke_color="#713f12", stroke_width=3))
        for a, b in traits:
            g.add(Line(a, b, stroke_color="#713f12", stroke_width=1.5))
    return g


def eau(u, o, h=10, op=0.78):
    """L'eau dans le cube (un pavé bleu de hauteur h) ; h petit = le fond, avant de remplir."""
    return pave(10, 10, h, u, o, face=EAU_F, dessus=EAU_D, cote=EAU_C, bord=EAU_B, sw=3, op=op)


def camion(s=1.0):
    """Le camion de pompiers vu de profil (la cabine à droite) ; .citerne .corps."""
    corps = Rectangle(width=3.2, height=0.75, fill_color=CAMION_C, fill_opacity=1, stroke_color=CAMION_B,
                      stroke_width=4).move_to(P(1.6, 0.575))
    bande = Rectangle(width=3.2, height=0.12, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(
        P(1.6, 0.5))
    cabine = RoundedRectangle(width=1.0, height=1.55, corner_radius=0.16, fill_color=CAMION_C, fill_opacity=1,
                              stroke_color=CAMION_B, stroke_width=4).move_to(P(3.7, 0.975))
    vitre = RoundedRectangle(width=0.62, height=0.5, corner_radius=0.08, fill_color="#bae6fd", fill_opacity=1,
                             stroke_color=CAMION_B, stroke_width=3).move_to(P(3.78, 1.32))
    citerne = RoundedRectangle(width=2.85, height=0.9, corner_radius=0.4, fill_color=CITERNE_C, fill_opacity=1,
                               stroke_color=CITERNE_B, stroke_width=4).move_to(P(1.55, 1.4))
    roues = VGroup()
    for x in (0.75, 3.55):
        roues.add(Circle(radius=0.3, fill_color="#1f2937", fill_opacity=1, stroke_color="#0f172a",
                         stroke_width=3).move_to(P(x, 0.2)),
                  Circle(radius=0.11, fill_color="#9ca3af", fill_opacity=1, stroke_width=0).move_to(P(x, 0.2)))
    gyro = RoundedRectangle(width=0.32, height=0.16, corner_radius=0.06, fill_color="#3b82f6", fill_opacity=1,
                            stroke_width=0).move_to(P(3.7, 1.83))
    g = VGroup(citerne, corps, bande, cabine, vitre, gyro, roues).scale(s, about_point=ORIGIN)
    g.citerne, g.corps = citerne, corps
    return g


def arriere(cam):
    """L'arrière du camion, où part le tuyau (lu sur le camion déjà posé)."""
    return cam.corps.get_left() + UP * 0.05


def fanta_visible(s=1.0):
    """Fanta (le personnage du commun), avec un liseré gris et deux bandes réfléchissantes jaunes sur sa veste
    bleu nuit : sans elles, la veste se perd dans le fond noir."""
    p = fanta(s)
    c = p.corps
    c.set_stroke("#64748b", 3)
    h, b = c.get_top()[1], c.get_bottom()[1]
    x0 = c.get_center()[0]
    for f in (0.42, 0.72):
        y1, y2 = h - (h - b) * f, h - (h - b) * (f + 0.08)
        w1, w2 = (0.5 + 0.25 * f) * s, (0.5 + 0.25 * (f + 0.08)) * s
        p.add(Polygon(P(x0 - w1, y1), P(x0 + w1, y1), P(x0 + w2, y2), P(x0 - w2, y2), fill_color="#facc15",
                      fill_opacity=1, stroke_width=0))
    return p


def lance(a, b):
    """Le tuyau (jaune) de a jusqu'à la lance posée en b, pointée vers le haut-gauche."""
    tuyau = CubicBezier(a, a + P(-0.3, -0.9), b + P(0.9, -0.4), b, stroke_color="#facc15", stroke_width=8)
    bec = Polygon(b + P(0.05, -0.12), b + P(0.05, 0.12), b + P(-0.42, 0.26), b + P(-0.42, 0.06),
                  fill_color="#94a3b8", fill_opacity=1, stroke_color="#334155", stroke_width=3)
    return VGroup(tuyau, bec)


_SEP = re.compile(r"(?<=\d)[   ](\d{3})\b")


class VolumeUnite5e(Paysage5e):
    nom_voix = "5e-volume-unite"
    fichier_marques = "5e_volume_unite_marques.json"
    ceinture = "verte"

    U = 0.26
    O = P(-5.95, -2.15)  # le coin avant-bas-gauche du grand cube (écrans 02 et 03)
    XG = -1.2            # le bord gauche de la colonne, à côté du grand cube

    # ── outils propres à l'épisode ──────────────────────────────────────────
    def col(self, mob, y, xl=None):
        """col() de la base, mais qui DIT quand elle rétrécit une ligne (elle le fait en silence)."""
        w = mob.width
        r = super().col(mob, y, xl)
        if os.environ.get("BORDS") == "1" and r.width < w - 0.01:
            tx = [f.original_text for f in r.get_family() if getattr(f, "original_text", None)]
            print(f"BORD SERRE {getattr(self, '_cle_voix', '?')} {w:.2f} → {r.width:.2f} ({' | '.join(tx)[:50]})",
                  flush=True)
        return r

    def _auditer(self, avant, t0):
        """L'audit de la base cherche « 1000 » dans une voix qui dit « 1 000 » (avec une espace) : il ne le trouve
        pas. Ici, il relit la voix avec ses milliers collés, « 1 000 » → « 1000 » + une espace APRÈS : le texte
        garde sa longueur, donc ses marques."""
        v = getattr(self, "_texte_voix", "") or ""
        self._texte_voix = _SEP.sub(lambda m: m.group(1) + " ", v)
        try:
            super()._auditer(avant, t0)
        finally:
            self._texte_voix = v

    def lab(self, s, fs=30, couleur=WHITE):
        """Une étiquette posée sur une figure (cartouche sombre), hors audit."""
        t = self.t(s, fs, couleur)
        hors_audit(t)
        return sur_fond(t)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les unités de volume", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les unités de volume")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de litres", "dans un mètre cube ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        c = pave(4, 4, 4, 0.36, P(2.7, -0.7), face=M_F, dessus=M_D, cote=M_C, bord=M_B, grille=True)
        qm = self.lab("? L", 40, EAU_T).move_to(c.face)
        self.au_mot("Combien de litres")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(c, scale=0.8), run_time=0.5)
        self.au_mot("dans un mètre cube")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(qm, scale=1.3), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Fanta, pompière ────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        fa = fanta_visible(1.0).move_to(P(-5.3, 0.25))
        self.au_mot("Voici Fanta")
        nom = self.t("Fanta", 40, BLEU_CALCUL).next_to(fa, UP, buff=0.25)
        self.play(FadeIn(fa, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("pompière")
        met = self.t("pompière", 30, "#f87171").next_to(fa, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        cam = camion(1.0)
        cam.move_to(P(-1.75, 0.35))
        x = 0.85
        l1 = self.t("Une citerne d'eau.", 34, WHITE)
        self.col(l1, 2.3, x)
        self.au_mot("Son camion")
        self.play(FadeIn(cam, shift=LEFT * 0.4), run_time=0.5)
        self.au_mot("une citerne d'eau")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(cam.citerne, color=EAU_T, scale_factor=1.05), run_time=0.45)
        l2 = self.ligne([("Sur la citerne :", WHITE), ("m³", M_T)], 36, buff=0.25)
        self.col(l2, 1.35, x)
        em3 = self.lab("m³", 34, M_T).move_to(cam.citerne)
        self.au_mot("Sur la citerne")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("en mètres cubes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(em3, scale=1.3), run_time=0.4)
        la = lance(arriere(cam), P(-3.25, -1.4))
        l3 = self.ligne([("Sur la lance :", WHITE), ("L", EAU_T)], 36, buff=0.25)
        self.col(l3, 0.45, x)
        el = self.lab("L", 34, EAU_T).next_to(la[1], DOWN, buff=0.15)
        self.au_mot("Sur la lance")
        self.play(Create(la[0]), FadeIn(la[1]), FadeIn(l3[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("en litres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(el, scale=1.3), run_time=0.4)
        l4 = self.bloc(["Fanta doit passer", "de l'un à l'autre."], 36, JAUNE_TITRE)
        self.col(l4, -0.85, x)
        bulles = VGroup(em3, el)
        self.au_mot("Fanta doit passer")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("de l'un à l'autre")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Indicate(bulles, color=JAUNE_TITRE, scale_factor=1.25),
                  run_time=0.6)
        self.attendre_voix()

    # ── 02 : le litre (1 dm = 10 cm ; 10 × 10 × 10 = 1 000 cm³ ; 1 L) ──────
    def compter_cube(self, cube, l, mots):
        """10 × 10 × 10, morceau par morceau : une rangée, puis une couche, puis tout le cube."""
        rang = morceau(cube, 0, 10, 0, 1, 0, 1)
        couche = morceau(cube, 0, 10, 0, 10, 0, 1)
        self.au_mot(mots[0])
        self.play(FadeIn(l[0], shift=UP * 0.1), FadeIn(rang), run_time=0.35)
        self.au_mot(mots[1])
        self.play(FadeIn(l[1], shift=UP * 0.1), FadeIn(couche), FadeOut(rang), run_time=0.35)
        self.au_mot(mots[2])
        tout = morceau(cube, 0, 10, 0, 10, 0, 10)
        self.play(FadeIn(l[2], shift=UP * 0.1), FadeIn(tout), FadeOut(couche), run_time=0.4)
        return tout

    def ecran_litre(self):
        self.ecran("02-litre")
        u, o, x = self.U, self.O, self.XG
        cube = cube_unite(u, o)
        l1 = self.ligne([("Un cube de 1 dm", WHITE), ("de côté,", WHITE)], 36, buff=0.2)
        self.col(l1, 2.75, x)
        c1 = cote(Line(cube.pt(0, 0, 0), cube.pt(10, 0, 0)), "1 dm", DOWN, fs=30, couleur=DM_T, audit=False)
        self.au_mot("Un cube")
        self.play(FadeIn(cube, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Un cube de 1 décimètre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(c1), run_time=0.35)
        self.au_mot("de côté")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.t("soit 10 cm.", 36, VERT_OK)
        self.col(l2, 2.1, x)
        c10 = self.t("= 10 cm", 30, VERT_OK)
        hors_audit(c10)
        c10.next_to(c1, RIGHT, buff=0.2)
        self.au_mot("soit 10 centimètres")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(c10), run_time=0.35)
        l3 = self.ligne([("10", BLEU_D), ("× 10", BLEU_D), ("× 10", BLEU_D), ("= 1 000", VERT_OK)], 42, buff=0.25)
        self.col(l3, 1.15, x)
        tout = self.compter_cube(cube, l3, ["Il contient 10", "10 fois 10", "fois 10 fois 10"])
        self.au_mot("10, 1 000")
        self.play(FadeIn(l3[3], shift=UP * 0.1), FadeOut(tout), run_time=0.35)
        l4 = self.ligne([("petits cubes de", WHITE), ("1 cm³.", CM_T)], 36, buff=0.2)
        self.col(l4, 0.4, x)
        pc = morceau(cube, 0, 1, 0, 1, 9, 10, couleur=CM_T, op=1.0)
        self.au_mot("petits cubes")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de 1 centimètre cube")
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(pc, scale=1.6), run_time=0.4)
        self.play(Indicate(pc, color=WHITE, scale_factor=1.6), run_time=0.5)
        l5 = self.ligne([("On le remplit d'eau :", WHITE), ("1 L.", EAU_T)], 36, buff=0.2)
        self.col(l5, -0.4, x)
        fond = eau(u, o, 0.25)
        plein = eau(u, o, 10)
        self.au_mot("remplit d'eau")
        self.add(fond)
        self.play(FadeIn(l5[0], shift=UP * 0.1), FadeOut(pc), run_time=0.3)
        self.play(ReplacementTransform(fond, plein), run_time=1.0)
        e1 = self.lab("1 L", 40, EAU_T).move_to(plein.face)
        self.au_mot("exactement 1")
        self.play(FadeIn(l5[1], shift=UP * 0.1), FadeIn(e1, scale=1.3), run_time=0.35)
        l6 = self.ligne([("1 L", EAU_T), ("= 1 dm³", DM_T)], 42, buff=0.22)
        self.col(l6, -1.2, x + 0.2)
        l7 = self.t("= 1 000 cm³", 42, CM_T)
        l7.next_to(l6, DOWN, buff=0.22).align_to(l6[1], LEFT)
        cadre = SurroundingRectangle(VGroup(l6, l7), color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=5)
        self.au_mot("Donc 1 litre")
        self.play(FadeIn(l6[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("égale 1 décimètre cube")
        self.play(FadeIn(l6[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("égale 1 000 centimètres")
        self.play(FadeIn(l7, shift=UP * 0.1), Create(cadre), run_time=0.45)
        l6 = VGroup(l6, l7)
        self.insister(VGroup(l6, cadre), 1.06, 0.25)
        self.attendre_voix()

    # ── 03 : le mètre cube (1 m = 10 dm ; 1 000 dm³ ; 1 m³ = 1 000 L) ──────
    def ecran_metre(self):
        self.ecran("03-metre")
        u, o, x = self.U, self.O, self.XG
        cube = cube_unite(u, o, M_F, M_D, M_C, M_B)
        l1 = self.ligne([("Un cube de 1 m", WHITE), ("de côté,", WHITE)], 36, buff=0.2)
        self.col(l1, 2.75, x)
        c1 = cote(Line(cube.pt(0, 0, 0), cube.pt(10, 0, 0)), "1 m", DOWN, fs=30, couleur=M_T, audit=False)
        self.au_mot("Un cube")
        self.play(FadeIn(cube, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Un cube de 1 mètre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(c1), run_time=0.35)
        self.au_mot("de côté")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.t("soit 10 dm.", 36, VERT_OK)
        self.col(l2, 2.1, x)
        c10 = self.t("= 10 dm", 30, VERT_OK)
        hors_audit(c10)
        c10.next_to(c1, RIGHT, buff=0.2)
        self.au_mot("soit 10 décimètres")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(c10), run_time=0.35)
        l3 = self.ligne([("10", BLEU_D), ("× 10", BLEU_D), ("× 10", BLEU_D), ("= 1 000 dm³", DM_T)], 40, buff=0.22)
        self.col(l3, 1.15, x)
        tout = self.compter_cube(cube, l3, ["Il contient 10", "10 fois 10", "fois 10 fois 10"])
        pd = morceau(cube, 0, 1, 0, 1, 9, 10, couleur=DM_F, op=1.0)
        self.au_mot("10, 1 000")
        self.play(FadeIn(l3[3], shift=UP * 0.1), FadeOut(tout), FadeIn(pd, scale=1.6), run_time=0.35)
        self.play(Indicate(pd, color=WHITE, scale_factor=1.6), run_time=0.5)
        l4 = self.ligne([("1 m³", M_T), ("= 1 000 L", EAU_T)], 48, buff=0.25)
        self.col(l4, -0.1, x)
        cadre = SurroundingRectangle(l4, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        fond = eau(u, o, 0.25)
        plein = eau(u, o, 10)
        self.au_mot("Donc 1 mètre cube")
        self.add(fond)
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeOut(pd), run_time=0.3)
        self.au_mot("égale 1 000 litres")
        e1 = self.lab("1 000 L", 40, EAU_T).move_to(plein.face)
        self.play(FadeIn(l4[1], shift=UP * 0.1), Create(cadre), ReplacementTransform(fond, plein), run_time=0.8)
        self.play(FadeIn(e1, scale=1.3), run_time=0.3)
        self.insister(VGroup(l4, cadre), 1.06, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode (× 1 000, ÷ 1 000 ; pas × 10) ──────────────────────
    def echelle(self, x=-3.4, ys=(1.55, 0.05, -1.45)):
        """L'échelle des unités : m³, dm³, cm³ dans trois cases ; flèches × 1 000 (à droite, vers le bas) et
        ÷ 1 000 (à gauche, vers le haut). Renvoie (cases, descentes, montées, étiquettes ×, étiquettes ÷)."""
        cases = VGroup()
        for s, c, y in zip(("m³", "dm³", "cm³"), (M_T, DM_T, CM_T), ys):
            t = self.t(s, 44, c)
            hors_audit(t)
            r = RoundedRectangle(width=1.6, height=0.85, corner_radius=0.15, fill_color="#1e293b",
                                 fill_opacity=1, stroke_color=c, stroke_width=5).move_to(P(x, y))
            cases.add(VGroup(r, t.move_to(r)))
        des, mon, ef, ed = VGroup(), VGroup(), VGroup(), VGroup()
        for a, b in zip(cases[:-1], cases[1:]):
            d = CurvedArrow(a.get_right() + P(0.05, -0.05), b.get_right() + P(0.05, 0.05), angle=-1.6,
                            color=VERT_OK, stroke_width=5, tip_length=0.2)
            m = CurvedArrow(b.get_left() + P(-0.05, 0.05), a.get_left() + P(-0.05, -0.05), angle=-1.6,
                            color=ORANGE_RETENUE, stroke_width=5, tip_length=0.2)
            tf = self.t("× 1 000", 30, VERT_OK).next_to(d, RIGHT, buff=0.12)
            td = self.t("÷ 1 000", 30, ORANGE_RETENUE).next_to(m, LEFT, buff=0.12)
            des.add(d)
            mon.add(m)
            ef.add(tf)
            ed.add(td)
        return cases, des, mon, ef, ed

    def ecran_methode(self):
        self.ecran("04-methode")
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 40, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        cases, des, mon, ef, ed = self.echelle()
        x = 0.35
        l1 = self.bloc(["D'une unité de volume", "à la suivante,"], 36)
        self.col(l1, 2.25, x)
        self.au_mot("d'une unité de volume")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(cases, shift=UP * 0.1), run_time=0.45)
        self.au_mot("à la suivante")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("on multiplie", VERT_OK), ("ou on divise", ORANGE_RETENUE)], 36, buff=0.2)
        self.col(l2, 1.25, x)
        self.au_mot("on multiplie")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(des), run_time=0.45)
        self.au_mot("ou on divise")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(mon), run_time=0.45)
        l3 = self.t("par 1 000.", 40, WHITE)
        self.col(l3, 0.55, x)
        self.au_mot("par 1 000")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(ef), FadeIn(ed), run_time=0.4)
        l4 = self.ligne([("Pas par 10 :", ROUGE_ERREUR), ("par 1 000,", VERT_OK)], 38, buff=0.25)
        self.col(l4, -0.35, x)
        barre = Line(l4[0].get_corner(DL) + P(0.0, 0.05), l4[0].get_corner(UR) + P(0.0, -0.05),
                     color=ROUGE_ERREUR, stroke_width=6)
        self.au_mot("Pas par 10")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("par 1 000,")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Indicate(ef, color=VERT_OK, scale_factor=1.15), run_time=0.4)
        l5 = self.bloc(["car un cube a", "trois dimensions."], 34, JAUNE_TITRE)
        self.col(l5, -1.35, x + 1.4)
        c = pave(3, 3, 3, 0.22, P(x + 0.15, l5.get_center()[1] - 0.45), face=DM_F, dessus=DM_D, cote=DM_C,
                 bord=DM_B)
        q = c.pt
        fl = VGroup(Arrow(q(0, 0, 0) + P(0, -0.12), q(3, 0, 0) + P(0, -0.12), buff=0, color=BASE_C,
                          stroke_width=5, tip_length=0.16),
                    Arrow(q(3, 0, 0) + P(0.12, -0.05), q(3, 3, 0) + P(0.12, -0.05), buff=0, color=VERT_OK,
                          stroke_width=5, tip_length=0.16),
                    Arrow(q(0, 0, 0) + P(-0.12, 0), q(0, 0, 3) + P(-0.12, 0), buff=0, color=ROUGE_ERREUR,
                          stroke_width=5, tip_length=0.16))
        self.au_mot("car un cube")
        self.play(FadeIn(l5[0], shift=UP * 0.1), FadeIn(c, scale=0.8), run_time=0.35)
        self.au_mot("trois dimensions")
        self.play(FadeIn(l5[1], shift=UP * 0.1), LaggedStart(*[GrowArrow(a) for a in fl], lag_ratio=0.3),
                  run_time=0.7)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.19
        c = cube_unite(u, P(-4.75, 0.2), grille=False)
        c1 = cote(Line(c.pt(0, 0, 0), c.pt(0, 0, 10)), "1 dm", LEFT, fs=28, couleur=DM_T, audit=False)
        qm = self.lab("? cm³", 32, CM_T).move_to(c.face)

        def avant_q(sc):
            sc.play(FadeIn(c), FadeIn(c1), FadeIn(qm), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["1 dm³,", "c'est combien de cm³ ?"],
                             [self.choix("100 cm³"), self.choix("10 cm³"), self.choix("1 000 cm³")], 2,
                             ["10 × 10 × 10", "= 1 000 cm³.", "10 et 100,", "c'est oublier une",
                              "ou deux dimensions."],
                             -0.4, couper={2: ("10 et", "100,")},
                             mot_q="1 décimètre", avant_q=avant_q)

    # ── 06 : le piège (longueurs par 10, volumes par 1 000) ─────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        # la règle graduée : 10 graduations
        a, b = P(-6.0, 1.55), P(-3.6, 1.55)
        regle = VGroup(Line(a, b, color=BASE_C, stroke_width=7),
                       *[Line(a + RIGHT * k * 0.24 + DOWN * 0.15, a + RIGHT * k * 0.24 + UP * (0.22 if k % 10 == 0
                                                                                              else 0.13),
                              color=BASE_C, stroke_width=4) for k in range(11)])
        l1 = self.ligne([("Longueurs :", BASE_C), ("par 10.", WHITE)], 40, buff=0.25)
        gauche(l1, -3.1, 1.6)
        self.au_mot("Pour les longueurs")
        self.play(FadeIn(regle, shift=RIGHT * 0.1), FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("par 10")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        c = pave(3, 3, 3, 0.36, P(-5.95, -0.45), face=DM_F, dessus=DM_D, cote=DM_C, bord=DM_B, grille=True)
        l2 = self.ligne([("Volumes :", DM_T), ("par 1 000.", VERT_OK)], 40, buff=0.25)
        gauche(l2, -3.1, 0.15)
        self.au_mot("Pour les volumes")
        self.play(FadeIn(c, scale=0.8), FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("c'est par 1 000")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(c, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        l3 = self.ligne([("3 dm³", DM_T), ("= 3 000 cm³,", VERT_OK), ("pas 30.", ROUGE_ERREUR)], 44, buff=0.25)
        gauche(l3, -6.0, -1.75)
        self.au_mot("3 décimètres cubes")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 000 centimètres cubes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("pas 30")
        barre = Line(l3[2].get_corner(DL), l3[2].get_corner(UR), color=ROUGE_ERREUR, stroke_width=6)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        self.play(Create(barre), Indicate(l3[1], color=VERT_OK, scale_factor=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.19
        c = cube_unite(u, P(-4.75, 0.2), M_F, M_D, M_C, M_B, grille=True, sw=3)
        c1 = cote(Line(c.pt(0, 0, 0), c.pt(0, 0, 10)), "1 m", LEFT, fs=28, couleur=M_T, audit=False)
        qm = self.lab("? L", 34, EAU_T).move_to(c.face)

        def avant_q(sc):
            sc.play(FadeIn(c), FadeIn(c1), FadeIn(qm), run_time=0.4)

        def apres(sc):
            ph = sc.ph_q
            for i, j, m in ((0, 0, "1 mètre cube"), (0, 1, "1 000 décimètres"), (1, 0, "Et 1"),
                            (1, 1, "1 litre"), (2, None, "1 000 litres")):
                sc.au_mot(m)
                sc.play(FadeIn(ph[i] if j is None else ph[i][j], shift=UP * 0.15), run_time=0.3)
            sc._deja = {0, 1, 2}
            sc.rep_fin()

        self.question_gauche("07-question", "07b-reponse",
                             ["Combien de litres", "y a-t-il dans 1 m³ ?"],
                             [self.choix("1 000 L"), self.choix("10 L"), self.choix("100 L")], 0,
                             ["1 m³ = 1 000 dm³.", "Et 1 dm³ = 1 L :", "1 000 L."],
                             -0.4, couper={0: ("1 m³", "= 1 000 dm³."), 1: ("Et 1 dm³", "= 1 L :")},
                             mot_q="Combien de litres", avant_q=avant_q, autres_r=apres)

    # ── 08 : le défi (la citerne et la lance) ───────────────────────────────
    def decor_defi(self):
        cam = camion(0.85)
        cam.move_to(P(-4.15, 0.75))
        la = lance(arriere(cam), P(-4.3, -1.25))
        return cam, la

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        cam, la = self.decor_defi()
        x = -0.6
        l1 = self.ligne([("La citerne :", WHITE), ("3,5 m³.", M_T)], 36, buff=0.25)
        self.col(l1, 2.2, x)
        self.au_mot("La citerne du camion")
        self.play(FadeIn(cam, shift=LEFT * 0.3), FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        e35 = self.lab("3,5 m³", 30, M_T).move_to(cam.citerne)
        self.au_mot("3,5 mètres cubes")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e35, scale=1.2), run_time=0.35)
        l2 = self.ligne([("La lance :", WHITE), ("500 L", EAU_T), ("par minute.", EAU_T)], 36, buff=0.25)
        self.col(l2, 1.45, x)
        self.au_mot("La lance")
        self.play(Create(la[0]), FadeIn(la[1]), FadeIn(l2[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("500 litres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("par minute")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.bloc(["En combien de minutes", "la citerne est-elle vide ?"], 36, JAUNE_TITRE)
        self.col(l3, 0.25, x)
        self.au_mot("En combien de minutes")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("la citerne est-elle vide")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        cam, la = self.decor_defi()
        self.add(cam, la)
        x = -0.6
        l0 = self.ligne([("3,5 m³ :", M_T)], 36)
        self.col(l0, 2.2, x)
        e35 = self.lab("3,5 m³", 30, M_T).move_to(cam.citerne)
        self.au_mot("3,5 mètres cubes")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(e35), run_time=0.35)
        l1 = self.ligne([("3,5 × 1 000", BLEU_D), ("= 3 500 L", EAU_T)], 40, buff=0.25)
        self.col(l1, 1.4, x)
        self.au_mot("3,5 fois 1 000")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        e3500 = self.lab("3 500 L", 30, EAU_T).move_to(cam.citerne)
        self.au_mot("3 500 litres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), ReplacementTransform(e35, e3500), run_time=0.4)
        l2 = self.ligne([("3 500 ÷", BLEU_D), ("500", BLEU_D), ("= 7", VERT_OK)], 40, buff=0.2)
        self.col(l2, 0.45, x)
        self.au_mot("3 500 divisé")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("par 500")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("7 minutes", fs=46)
        self.col(res, -0.75, x)
        seaux = VGroup(*[RoundedRectangle(width=0.36, height=0.42, corner_radius=0.08, fill_color=EAU_F,
                                          fill_opacity=1, stroke_color=EAU_B, stroke_width=3) for _ in range(7)])
        seaux.arrange(RIGHT, buff=0.1).move_to(P(-3.6, -2.2))
        self.au_mot("7 minutes")
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeIn(res, scale=1.2),
                  LaggedStart(*[FadeIn(s, shift=DOWN * 0.15) for s in seaux], lag_ratio=0.15), run_time=0.7)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        c = cube_unite(0.2, ORIGIN)
        lignes = self.finale_gauche(c, textes=[
            ("1 L = 1 dm³", "= 1 000 cm³."),
            ("1 m³ = 1 000 L.",),
            ("D'une unité à la suivante :", "× 1 000, ou ÷ 1 000.")], fs=34)
        self.add(c)
        # la dernière ligne : « × 1 000, » puis « ou ÷ 1 000. », chacun à son mot
        b = lignes[2][1]
        s = b[1]
        k = s.width / self.t(s.original_text, 34).width
        p1, p2 = self.t("× 1 000,", 34), self.t("ou ÷ 1 000.", 34)
        VGroup(p1, p2).arrange(RIGHT, buff=0.18).scale(k).move_to(s).align_to(s, LEFT)
        self.au_mot("1 litre")
        self.montrer_ligne(lignes[0], Indicate(c, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("1 mètre cube")
        self.montrer_ligne(lignes[1])
        self.au_mot("D'une unité")
        self.play(Create(lignes[2][0]), FadeIn(b[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("fois 1 000")
        self.play(FadeIn(p1, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("divisé par 1 000")
        self.play(FadeIn(p2, shift=RIGHT * 0.2), run_time=0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_litre()
        self.ecran_metre()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
