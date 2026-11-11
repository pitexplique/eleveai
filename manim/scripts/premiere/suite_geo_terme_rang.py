# suite_geo_terme_rang.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite géométrique :
# calculer un terme lointain » (16:9), ceinture VERTE. Série SUITES, épisode 12.
# Micro du coach : expo_suite_terme_rang (notion expo_suite_geometrique) :
# lib/tutor-v4/questionBank/premiere/maths/suites-geometriques.bank.ts
# + suites-geometriques-renfort.ts (gTerme0, gTerme1, gTermeAutre, gTermeCalcul,
# gTermeContexte, gExplCalcul ; indice « On multiplie par q autant de fois qu'il
# y a de PAS »). Jumelle géométrique de l'épisode 04 (suite_arith_terme_rang.py).
#
# Ce que demande le coach → écran :
#   · gTerme0 (u₀ × qⁿ)                         → 02-pas, 03-puissance, 04-question ;
#   · gTerme1 (u₁ × qⁿ⁻¹)                        → 05-rang-1, 06-question ;
#   · gTermeAutre (uₚ × qⁿ⁻ᵖ, en avant / arrière) → 05-rang-1, 08 défi ;
#   · gTermeCalcul / gExplCalcul (quel calcul ? la puissance AVANT de
#     multiplier ; pièges « u × q × n », un pas de trop) → 07-piege, 06 (A = un pas de trop) ;
#   · gTermeContexte                             → 01 Léo, 03 (u₁₂ ≈ 6 277).
# Clé de voix → écran :
#   00-garde (une rangée de cases, les sauts « × q » s'allument, puis UN grand saut)
#   · 01 Léo, community manager : le téléphone du club de basket, le compteur
#   2 000, les barres des mois qui montent (+ 10 % chaque mois), le sponsor
#   · 02 uₙ, u₀ = 2 000, q = 1,1 : les 3 sauts « × 1,1 » (2 200, 2 420, 2 662)
#   · 03 les 12 sauts comptés un à un puis regroupés en « × 1,1¹² » (orange),
#   u₁₂ = 2 000 × 1,1¹² ≈ 6 277, l'exposant = le nombre de pas
#   · 04/04b question (C : 405 = 5 × 3⁴) · 05 depuis u₁ : n − 1 pas ; depuis uₚ :
#   n − p pas · 06/06b question (B : 100 = 800 × 0,5³ ; A = un pas de trop)
#   · 07 le piège « 2 000 × 1,1 × 12 » barré, le 12 monte en exposant, la
#   puissance d'abord · 08/08b défi t₅ = 96, q = 2 : t₈ = 768, t₃ = 24
#   · 09 « Ce que tu as appris » · 10 fin.
# Code couleur (module commun) : bleu = termes, orange = raison, sauts et
# exposant (le nombre de pas), vert = juste, rouge = piège. ⛔ Pas de LaTeX.
# Voix : manim/voix/premiere-suite-geo-terme-rang.json (débit −6),
# calée mot à mot par suite_geo_terme_rang_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_geo_terme_rang.py SuiteGeoTermeRang1re -o eleveai-maths-premiere-suite-geo-terme-rang --media_dir manim/scripts/premiere/media-suite-geo-terme-rang
# Sortie : manim/sorties/premiere/maths/suites/12-geo-terme-rang/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_terme_rang import Rangee  # noqa: E402  (l'outil de l'épisode 04)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (« 2 000 » dans la voix)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
ABO = [round(2000 * 1.1 ** k, 6) for k in range(4)]
assert ABO == [2000, 2200, 2420, 2662]
assert round(2000 * 1.1 ** 12) == 6277                                      # ≈ 6 277
assert 3 ** 4 == 81 and 5 * 81 == 405 and 5 * 3 * 4 == 60 and 5 * 3 ** 3 == 135   # Q1 → C
assert 800 * 0.5 ** 3 == 800 * 0.125 == 100 and 800 * 0.5 ** 4 == 50 and 800 * 2 == 1600  # Q2 → B
assert 2000 * 1.1 * 12 == 26400                                             # le piège
assert 96 * 2 ** 3 == 96 * 8 == 768 and 96 / 2 ** 2 == 96 / 4 == 24         # le défi

PEAU, CHEVEUX, SWEAT = "#8d5524", "#1f1300", "#7C3AED"
BALLON, ECRAN = "#EA580C", "#111827"
GRIS_SAUT = "#334155"
EXPOSANTS = "⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ⁻ᵖ"


def leo(s=1.0):
    """Léo, community manager : sweat violet, un téléphone à la main."""
    tete = Circle(radius=0.3, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    cheveux = Arc(radius=0.31, start_angle=0.15, angle=PI - 0.3, fill_color=CHEVEUX, fill_opacity=1,
                  stroke_width=0).move_to(P(0, 1.24))
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.3, fill_color=SWEAT, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    capuche = Arc(radius=0.26, start_angle=PI, angle=PI, stroke_color="#A78BFA", stroke_width=5).move_to(P(0, 0.62))
    bras = Line(P(0.35, 0.35), P(0.62, 0.62), stroke_color=SWEAT, stroke_width=16)
    tel = RoundedRectangle(width=0.24, height=0.42, corner_radius=0.05, fill_color=ECRAN, fill_opacity=1,
                           stroke_color=WHITE, stroke_width=2).move_to(P(0.7, 0.78))
    return VGroup(corps, capuche, bras, tete, cheveux, tel).scale(s)


def ballon(r=0.25):
    """Un ballon de basket : orange, ses coutures noires."""
    b = Circle(radius=r, fill_color=BALLON, fill_opacity=1, stroke_color="#7C2D12", stroke_width=2)
    k = dict(stroke_color="#1c1917", stroke_width=2)
    lignes = VGroup(Line(b.get_left(), b.get_right(), **k), Line(b.get_top(), b.get_bottom(), **k),
                    ArcBetweenPoints(b.get_top() + LEFT * r * 0.55, b.get_bottom() + LEFT * r * 0.55, angle=0.9,
                                     **k),
                    ArcBetweenPoints(b.get_top() + RIGHT * r * 0.55, b.get_bottom() + RIGHT * r * 0.55,
                                     angle=-0.9, **k))
    return VGroup(b, lignes)


def contrat(s=1.0):
    """Le contrat du sponsor : une feuille, des lignes, une signature."""
    f = Rectangle(width=0.8, height=1.0, fill_color="#F8FAFC", fill_opacity=1, stroke_width=0)
    lignes = VGroup(*[Line(P(-0.28, y), P(0.28, y), stroke_color=GREY_B, stroke_width=3)
                      for y in (0.3, 0.15, 0.0, -0.15)])
    sign = VMobject(stroke_color=TERME, stroke_width=3).set_points_smoothly(
        [P(-0.25, -0.33), P(-0.12, -0.25), P(0.0, -0.38), P(0.12, -0.27), P(0.26, -0.34)])
    return VGroup(f, lignes, sign).scale(s)


def calculette(s=1.0):
    """Une calculatrice : le boîtier, l'écran, les touches."""
    boite = RoundedRectangle(width=0.9, height=1.25, corner_radius=0.1, fill_color="#334155", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    ecr = Rectangle(width=0.7, height=0.28, fill_color="#A7F3D0", fill_opacity=1, stroke_width=0).move_to(P(0, 0.4))
    touches = VGroup(*[RoundedRectangle(width=0.14, height=0.12, corner_radius=0.03, fill_color=GREY_A,
                                        fill_opacity=1, stroke_width=0).move_to(P(-0.22 + 0.22 * i, 0.05 - 0.2 * j))
                       for i in range(3) for j in range(3)])
    return VGroup(boite, ecr, touches).scale(s)


class RangeeG(Rangee):
    """La rangée de l'épisode 04, mais certaines cases plus LARGES (larges =
    {indice: largeur}) pour qu'un grand nombre (« 2 000 ») y tienne, centré,
    avec une marge ; les sauts sont refaits d'après les nouvelles cases."""

    def __init__(self, n, x0, x1, y, larges=None, larg=0.5, haut=0.55, cote=UP, creux=0.2, sw=4, sauts=True):
        super().__init__(n, x0, x1, y, larg=larg, haut=haut, cote=cote, creux=creux, sw=sw, sauts=False)
        for i, w in (larges or {}).items():
            c = self.cases[i]
            neuve = RoundedRectangle(width=w, height=haut, corner_radius=0.08, stroke_color=TERME, stroke_width=3,
                                     fill_color=FOND_CARTE, fill_opacity=1).move_to(c)
            self.cases.submobjects[i] = neuve
        if sauts:
            for k in range(n - 1):
                self.sauts.add(self.fleche(k, k + 1, creux, sw))


class OutilsEp12:
    """Les petits outils de l'épisode (paysage ET short)."""

    def espace(self, a, b, fs):
        """L'écart entre deux morceaux = une VRAIE espace de la police (copie de
        l'ép. 08) : « u₁₂ = 2 000 », « × 1,1¹² », « ≈ 6 277 »."""
        x, y = a.strip()[-1], b.strip()[0]
        k = fs / 48
        tout = Text(f"{x} {y}", font_size=48).width
        return max(0.05, (tout - Text(x, font_size=48).width - Text(y, font_size=48).width) * k)

    def ligne(self, morceaux, fs=44):
        """UNE ligne de texte (une taille, une ligne de base, de vraies espaces) :
        morceaux = [(texte, couleur, …[, t2c]), …] ; renvoie (Text, [VGroup du
        morceau k])."""
        texte = ""
        for m in morceaux:  # un exposant (« ⁴ ») se colle à sa base, sans espace
            texte += ("" if not texte or m[0][0] in EXPOSANTS else " ") + m[0]
        tx = Text(texte, font_size=fs, color=WHITE)
        tx._pas_audit = True
        k, parts = 0, []
        for m in morceaux:
            n = len(m[0].replace(" ", ""))
            g = VGroup(*tx[k:k + n])
            g.set_color(m[1])
            for sous, coul in (m[3] if len(m) > 3 and m[3] else {}).items():
                i = m[0].replace(" ", "").find(sous.replace(" ", ""))
                VGroup(*tx[k + i:k + i + len(sous.replace(" ", ""))]).set_color(coul)
            g.original_text = m[0]
            parts.append(g)
            k += n
        assert k == len(tx), (k, len(tx), [m[0] for m in morceaux])
        return tx, parts

    def calcul(self, morceaux, y, x=-6.25, fs=44, avec=(), centre=None, avec_morceau=None):
        """Un calcul écrit morceau par morceau : [(texte, couleur, extrait[, t2c]), …] ;
        chaque morceau quand la voix dit son extrait (None : avec le précédent) ;
        t2c : {sous-texte: couleur} (l'exposant en orange). Renvoie la liste des
        morceaux (VGroup), dans une seule ligne de base."""
        avec_morceau = avec_morceau or {}
        tx, ts = self.ligne(morceaux, fs)
        if tx.width > self.largeur_texte:
            tx.scale_to_fit_width(self.largeur_texte)
        tx.move_to(P(centre if centre is not None else 0, y))
        if centre is None:
            tx.align_to(P(x, 0), LEFT)
        paquet, extra = [], []
        for i, (t, m) in enumerate(zip(ts, morceaux)):
            ex = m[2]
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *extra, run_time=0.25)
                paquet, extra = [], []
            if ex is not None:
                self.suivre(ex)
            elif os.environ.get("AUDIT"):  # un nombre sans extrait : déjà dit ?
                for nb in re.findall(r"\d+(?: \d{3})*(?:,\d+)?", m[0]):
                    if not re.search(r"(?<![\d,])" + re.escape(nb) + r"(?![\d]|,\d)",
                                     self._texte_voix[:self._curseur + 2]):
                        print(f"AUDIT-PAQUET {self._cle_voix} « {nb} » ({m[0]})", flush=True)
            paquet.append(t)
            extra += avec_morceau.get(i, [])
        self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *extra, *avec, run_time=0.3)
        return VGroup(*ts)

    def ecrire_case(self, rg, i, texte, couleur=WHITE, fs=28, anims=(), run_time=0.25):
        """Le nombre d'une case : marge intérieure de 0,14 de chaque côté."""
        c = rg.cases[i]
        tx = Text(texte, font_size=fs, color=couleur)
        if tx.width > c.width - 0.28:
            tx.scale_to_fit_width(c.width - 0.28)
        tx.move_to(c)
        rg.textes[i] = tx
        self.play(FadeIn(tx, scale=1.4), *anims, run_time=run_time)
        return tx

    def nom_case(self, rg, i, texte, fs=28, couleur=GREY_A, haut=False):
        nm = Text(texte, font_size=fs, color=couleur)
        nm.next_to(rg.cases[i], UP if haut else DOWN, buff=0.12)
        rg.noms[i] = nm
        return nm

    def allumer(self, sauts, couleur=RAISON, run_time=1.5, avec=()):
        """Les sauts s'allument UN À UN (on les compte), dans l'ordre."""
        self.play(LaggedStart(*[s.animate.set_color(couleur) for s in sauts], lag_ratio=1.0),
                  *avec, run_time=run_time)

    def montrer_rangee(self, rg, run_time=0.4, avec=()):
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.05),
                  *[Create(s) for s in rg.sauts], *avec, run_time=run_time)

    def grand_saut(self, rg, i, j, creux=0.9, cote=UP, couleur=RAISON, sw=6):
        """Le GRAND saut de la case i à la case j (au-dessus des petits)."""
        a, b = rg.cases[i], rg.cases[j]
        bord = (lambda m: m.get_top()) if np.allclose(cote, UP) else (lambda m: m.get_bottom())
        # départ un peu à gauche, arrivée un peu à droite : il ne longe pas les petits sauts
        d, f = bord(a) + 0.1 * cote + LEFT * 0.14, bord(b) + 0.1 * cote + RIGHT * 0.14
        angle = 4 * np.arctan(2 * creux / max(np.linalg.norm(f - d), 0.1)) * (-1 if np.allclose(cote, UP) else 1)
        return CurvedArrow(d, f, angle=angle, color=couleur, stroke_width=sw, tip_length=0.22)

    def barre_lisible(self, mob, couleur=PIEGE, sw=5):
        """Un trait rouge EN TRAVERS (la formule reste lisible dessous)."""
        return Line(mob.get_left() + LEFT * 0.12, mob.get_right() + RIGHT * 0.12,
                    stroke_color=couleur, stroke_width=sw).move_to(mob.get_center())

    def croix(self, centre, r=0.32, couleur=PIEGE):
        """Une grande croix rouge À CÔTÉ d'une formule barrée."""
        return VGroup(Line(centre + P(-r, r), centre + P(r, -r)), Line(centre + P(-r, -r), centre + P(r, r))
                      ).set_stroke(couleur, 9)


class SuiteGeoTermeRang1re(AuditMilliers, OutilsEp12, PaysageSuites):
    fichier_marques = "suite_geo_terme_rang_marques.json"
    nom_voix = "premiere-suite-geo-terme-rang"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def ecran_garde(self):
        """La garde du module commun, mais une ligne peut être en morceaux
        (« Comment sauter directement » puis « au 12e mois, » à sa voix)."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Suite géométrique", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Suite géométrique")
        self.play(Write(tit), run_time=0.7)
        y = tit.get_bottom()[1] - 0.5
        sous = self.t("calculer un terme lointain", 40, TERME).move_to(P(0, y))
        self.au_mot("calculer")
        self.play(FadeIn(sous, shift=UP * 0.1), run_time=0.35)
        y -= 0.72
        l2, (a, b) = self.ligne([("Comment sauter directement", WHITE), ("au 12e mois,", WHITE)], 40)
        l2.move_to(P(0, y))
        self.au_mot("Comment")
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("12e")
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.3)
        y -= 0.6
        l3 = self.t("sans tout calculer ?", 40).move_to(P(0, y))
        ident = self.t(self.identite, 26, GREY_A).move_to(P(0, y - 0.62))
        rg = RangeeG(13, -5.0, 3.8, -1.02, larges={0: 0.62, 12: 0.62}, larg=0.44, haut=0.46, creux=0.15, sw=3)
        n0 = self.nom_case(rg, 0, "u₀", 32)
        self.au_mot("sans")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(ident),
                  LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.05),
                  *[Create(s) for s in rg.sauts], FadeIn(n0), run_time=0.35)
        self.au_mot("tout")
        self.allumer(rg.sauts, run_time=0.7)
        grand = self.grand_saut(rg, 0, 12, creux=0.3)
        q = Text("?", font_size=36, color=RAISON).move_to(rg.cases[12])
        self.play(Create(grand), FadeIn(q, scale=1.6), rg.cases[12].animate.set_stroke(RAISON, width=6),
                  rg.sauts.animate.set_color(GRIS_SAUT), run_time=0.5)
        self.attendre_voix(marge=0.9)

    # ── 01 : Léo, community manager, et le compte du club ──────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = leo(1.0).move_to(P(-5.0, 1.0))
        nom = self.t("Léo", 42, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        metier = VGroup(self.t("community", 34, TERME), self.t("manager", 34, TERME)).arrange(DOWN, buff=0.1)
        metier.next_to(nom, DOWN, buff=0.14)
        self.au_mot("Léo")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("community")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)
        # le téléphone : le ballon, le compteur, les barres des mois
        tel = RoundedRectangle(width=2.5, height=4.3, corner_radius=0.3, fill_color=ECRAN, fill_opacity=1,
                               stroke_color=GREY_B, stroke_width=4).move_to(P(-1.55, 0.05))
        hp = RoundedRectangle(width=0.6, height=0.08, corner_radius=0.04, fill_color=GREY_B, fill_opacity=1,
                              stroke_width=0).move_to(tel.get_top() + DOWN * 0.22)
        bal = ballon(0.32).move_to(tel.get_top() + DOWN * 0.8)
        self.au_mot("compte")
        l1 = self.t("le compte du club", 36).move_to(P(3.3, 2.0))
        self.play(FadeIn(tel, scale=0.9), FadeIn(hp), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("basket")
        l1b = self.t("de basket", 36, BALLON).next_to(l1, DOWN, buff=0.14)
        self.play(GrowFromCenter(bal), FadeIn(l1b, shift=UP * 0.1), run_time=0.4)
        self.play(Rotate(bal, angle=-PI), run_time=0.4)
        self.suivre("2 000")
        compteur = self.t("2 000", 50, WHITE).move_to(tel.get_top() + DOWN * 1.55)
        sous = self.t("abonnés", 30, GREY_A).next_to(compteur, DOWN, buff=0.1)
        l2 = VGroup(self.t("2 000", 44, TERME), self.t("abonnés", 44)).arrange(RIGHT, buff=0.22)
        l2.move_to(P(3.3, 0.5))
        self.play(FadeIn(compteur, scale=1.4), FadeIn(sous), FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        # les barres des 12 mois : chacune 10 % plus haute que la précédente
        base_y = tel.get_bottom()[1] + 0.35
        barres = VGroup(*[Rectangle(width=0.13, height=0.28 * 1.1 ** k, fill_color=TERME, fill_opacity=1,
                                    stroke_width=0) for k in range(13)])
        barres.arrange(RIGHT, buff=0.04, aligned_edge=DOWN).move_to(P(tel.get_center()[0], 0))
        barres.align_to(P(0, base_y), DOWN)
        self.au_mot("chaque mois")
        self.play(FadeIn(barres[0]), run_time=0.15)
        self.suivre("10")
        l3 = VGroup(self.t("+ 10 %", 44, RAISON), self.t("chaque mois", 40)).arrange(RIGHT, buff=0.25)
        l3.move_to(P(3.3, -0.55))
        self.play(FadeIn(l3, shift=UP * 0.1),
                  LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres[1:]], lag_ratio=0.3), run_time=1.0)
        self.au_mot("sponsor")
        ct = contrat(1.0).move_to(P(1.6, -1.95))
        l4 = self.t("un sponsor", 38, JUSTE).next_to(ct, RIGHT, buff=0.35)
        self.play(FadeIn(ct, shift=UP * 0.2), FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.au_mot("combien")
        qq = self.t("Combien d'abonnés dans un an ?", 44, RAISON).move_to(P(0, 3.25))
        self.play(FadeIn(qq, shift=DOWN * 0.1), Indicate(barres[-1], color=RAISON, scale_factor=1.3), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 02 : uₙ, u₀ = 2 000, q = 1,1 ; 3 sauts « × 1,1 » ──────────────────

    def ecran_pas(self):
        self.nouvel_ecran("02-pas")
        note, (n1, n2) = self.ligne([("uₙ", TERME), ("= le nombre d'abonnés n mois après le départ", WHITE)], 38)
        note.move_to(P(0, 3.15))
        self.au_mot("u indice n")
        self.play(FadeIn(n1, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("nombre")
        self.play(FadeIn(n2, shift=DOWN * 0.1), run_time=0.35)
        lg = LigneTermes([fr(v) for v in ABO], centre=P(0, -0.45), pas=3.05, largeur=2.05, hauteur=0.95, fs=42,
                         noms=["u₀", "u₁", "u₂", "u₃"], fs_noms=32)
        l0, (a0, b0) = self.ligne([("u₀ =", TERME), ("2 000", WHITE)], 48)
        l0.move_to(P(-3.0, 1.95))
        self.au_mot("commence")
        self.suivre("0")
        self.play(FadeIn(a0, shift=UP * 0.1), run_time=0.25)
        self.suivre("2 000")
        self.play(FadeIn(b0, scale=1.4), FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.cases[0][1], scale=1.4),
                  FadeIn(lg.noms[0]), run_time=0.3)
        lq, (aq, bq) = self.ligne([("q =", RAISON), ("1,1", RAISON)], 48)
        lq.move_to(P(2.6, 1.95))
        self.au_mot("q égale")
        self.play(FadeIn(aq, shift=UP * 0.1), run_time=0.25)
        self.suivre("1,1")
        cad = self.encadre(lq, RAISON, 0.16)
        self.play(FadeIn(bq, scale=1.4), Create(cad), run_time=0.3)
        self.insister(VGroup(lq, cad), 1.12)
        self.au_mot("Pour aller")
        self.play(*[FadeIn(lg.cases[k][0], scale=0.8) for k in (1, 2, 3)], run_time=0.3)
        self.suivre("3")
        self.play(*[FadeIn(lg.noms[k], shift=UP * 0.08) for k in (1, 2, 3)], Indicate(lg.cases[3][0], color=TERME),
                  run_time=0.3)
        sauts = [lg.saut(k, "× 1,1", cote=UP, fs=34, creux=0.3) for k in range(3)]
        for s in sauts:
            s[0].set_color(GRIS_SAUT)
        lf, (fa, fb) = self.ligne([("3 fois", RAISON), ("× 1,1", RAISON)], 44)
        lf.move_to(P(0, -2.2))
        self.suivre("3 fois")
        self.play(FadeIn(fa, scale=1.3), *[Create(s[0]) for s in sauts], run_time=0.3)
        self.suivre("1,1")
        self.play(FadeIn(fb, scale=1.3), *[FadeIn(s[1], scale=1.3) for s in sauts], run_time=0.25)
        for k, v in enumerate(ABO[1:]):
            self.suivre(fr(v))
            bille = Dot(sauts[k][0].get_start(), radius=0.08, color=RAISON)
            self.play(sauts[k][0].animate.set_color(RAISON), MoveAlongPath(bille, sauts[k][0].copy()),
                      FadeIn(lg.cases[k + 1][1], scale=1.4), run_time=0.3)
            self.remove(bille)
        self.play(Indicate(VGroup(*[s[0] for s in sauts]), color=RAISON, scale_factor=1.1), Indicate(fa), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 03 : 12 sauts regroupés en « × 1,1¹² » ; u₁₂ ≈ 6 277 ──────────────

    def ecran_puissance(self):
        self.nouvel_ecran("03-puissance")
        rg = Rangee(13, -5.7, 5.7, 1.2, larg=0.6, haut=0.62, creux=0.17, sw=4)
        rg.sauts.set_color(GRIS_SAUT)
        n0, n12 = self.nom_case(rg, 0, "u₀", 30), self.nom_case(rg, 12, "u₁₂", 30)
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.05),
                  *[Create(s) for s in rg.sauts], FadeIn(n0), run_time=0.45)
        self.suivre("12")
        compte, (ca, cb) = self.ligne([("12 fois", RAISON), ("× 1,1", RAISON)], 40)
        compte.move_to(P(0, 0.2))
        self.play(FadeIn(ca, scale=1.3), FadeIn(n12), run_time=0.25)
        self.suivre("1,1")
        self.allumer(rg.sauts, run_time=1.6, avec=[FadeIn(cb, scale=1.3)])
        self.au_mot("puissance")
        grand = self.grand_saut(rg, 0, 12, creux=1.05)
        lab = Text("× 1,1¹²", font_size=46, color=RAISON).next_to(grand, UP, buff=0.08)
        lab._pas_audit = True  # le regroupement des sauts déjà dits (1,1), pas un nombre nouveau
        lab_base = VGroup(*lab[:-2])
        self.play(ReplacementTransform(rg.sauts.copy(), grand), rg.sauts.animate.set_color(GRIS_SAUT),
                  FadeIn(lab_base, shift=DOWN * 0.1), run_time=0.6)
        self.suivre("12")
        self.play(FadeIn(VGroup(*lab[-2:]), scale=1.6), Transform(compte, compte.copy().set_opacity(0.45)),
                  run_time=0.3)
        self.insister(lab, 1.15)
        tout, (c0, c1, c2, c3, c4, c5, c6) = self.ligne(
            [("u₁₂ =", TERME), ("2 000", WHITE), ("×", WHITE), ("1,1¹²", WHITE, None, {"¹²": RAISON}),
             ("≈", JUSTE), ("6 277", JUSTE), ("abonnés", JUSTE)], 54)
        if tout.width > self.largeur_texte:
            tout.scale_to_fit_width(self.largeur_texte)
        tout.move_to(P(0, -0.9))
        exp = VGroup(*c3[-2:])
        self.au_mot("u indice")
        self.play(FadeIn(c0, shift=UP * 0.1), run_time=0.25)
        self.suivre("2 000")
        self.play(FadeIn(c1, shift=UP * 0.1), FadeIn(c2, shift=UP * 0.1), run_time=0.25)
        self.suivre("1,1")
        self.play(FadeIn(VGroup(*c3[:-2]), shift=UP * 0.1), run_time=0.25)
        self.suivre("12")
        self.play(FadeIn(exp, scale=1.5), run_time=0.25)
        self.play(Indicate(exp, color=RAISON, scale_factor=1.5), run_time=0.4)
        self.au_mot("calculatrice")
        calc = calculette(1.0).move_to(P(-5.4, -2.45))
        self.play(FadeIn(calc, shift=UP * 0.2), run_time=0.35)
        self.au_mot("environ")
        self.play(FadeIn(c4, scale=1.3), run_time=0.2)
        self.suivre("6 277")
        res = c5
        self.play(FadeIn(c5, scale=1.4), rg.cases[12].animate.set_stroke(JUSTE, width=6), run_time=0.3)
        self.au_mot("abonnés")
        self.play(FadeIn(c6, shift=UP * 0.1), run_time=0.3)
        self.insister(res, 1.25)
        self.au_mot("L'exposant")
        reg, (ra, rb) = self.ligne([("l'exposant", RAISON), ("= le nombre de pas", WHITE)], 44)
        reg.move_to(P(0.3, -2.5))
        fl = Arrow(P(exp.get_center()[0], tout.get_bottom()[1] - 0.08), ra.get_top() + UP * 0.05, buff=0.05,
                   color=RAISON,
                   stroke_width=5, tip_length=0.2)
        reg = VGroup(ra, rb)
        self.play(GrowArrow(fl), FadeIn(ra, scale=1.2), run_time=0.4)
        self.au_mot("nombre")
        self.play(FadeIn(reg[1], shift=UP * 0.1), Indicate(lab, color=RAISON), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── la correction d'une question-pause : la bonne monte, la place se libère ──

    def degager(self, q, bonne, ok, y=2.12, avec=()):
        """Les deux autres boutons et l'énoncé s'en vont ; la bonne réponse
        (avec sa coche) monte sous « Question ! » : la correction a la place."""
        autres = [q.cartes[j] for j in range(3) if j != bonne]
        bon = VGroup(q.cartes[bonne], ok)
        self.play(*[FadeOut(m) for m in autres], FadeOut(q.question), bon.animate.move_to(P(0, y)), *avec,
                  run_time=0.4)

    def rangee_question(self, n, noms, y, x0=-5.0, x1=-0.6):
        """La petite rangée d'une correction (n cases, les sauts éteints) et
        les animations qui la montrent."""
        rg = Rangee(n, x0, x1, y, larg=0.62, haut=0.62, creux=0.22, sw=4)
        rg.sauts.set_color(GRIS_SAUT)
        a, b = self.nom_case(rg, 0, noms[0], 38), self.nom_case(rg, n - 1, noms[1], 38)
        return rg, [LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.08),
                    *[Create(s) for s in rg.sauts], FadeIn(a), FadeIn(b)]

    # ── 04 : question-pause n° 1 : v₀ = 5, q = 3, v₄ ? → C (405) ───────────

    def ecran_question1(self):
        q = self.poser_question("04-question",
                                [(self.t("Une suite géométrique commence à v₀ = 5,", 38), "5"),
                                 (self.t("et sa raison est 3.", 38), "3"),
                                 (self.t("Combien vaut v₄ ?", 38), "Combien")],
                                [self.t(c, 52) for c in ("60", "135", "405")], 2, en_ligne=True, largeur=3.3,
                                fs=52)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 2)
        rg, anims = self.rangee_question(5, ("v₀", "v₄"), 0.2)
        self.degager(q, 2, ok, avec=anims)
        lab = self.t("4 pas", 36, RAISON).next_to(rg.sauts, UP, buff=0.15)
        self.calcul([("3", WHITE, "3"), ("⁴", RAISON, "4"), ("=", WHITE, "égale"), ("81", WHITE, "81")],
                    0.2, x=1.0, fs=56, avec_morceau={1: [FadeIn(lab, scale=1.3), LaggedStart(
                        *[s.animate.set_color(RAISON) for s in rg.sauts], lag_ratio=1.0)]})
        c2 = self.calcul([("v₄ =", TERME, "et"), ("5", WHITE, "5"), ("×", WHITE, None), ("81", WHITE, "81"),
                          ("=", WHITE, "égale"), ("405", JUSTE, "405")], -1.3, centre=-0.3, fs=56,
                         avec=[rg.cases[4].animate.set_stroke(JUSTE, width=6)])
        self.insister(c2[-1], 1.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : le rang de départ : n − 1 pas depuis u₁, n − p pas depuis uₚ ──

    def bloc_formule(self, y, debut, lab, cond, formule, ex_cond, ex_lab, n_formule, lab_apres=False):
        rg = Rangee(5, -6.1, -2.7, y - 0.25, larg=0.6, haut=0.6, creux=0.2)
        rg.sauts.set_color(GRIS_SAUT)
        na, nn = self.nom_case(rg, 0, debut, 38), self.nom_case(rg, 4, "uₙ", 38, TERME)
        pts = Text("…", font_size=34, color=GREY_A).move_to(rg.cases[2])
        lab_t = self.t(lab, 36, RAISON).move_to(P(-4.4, y + 0.7))
        c = self.t(cond, 38, GREY_A)
        f = Text(formule[0], font_size=62, color=WHITE, t2c={formule[1]: RAISON})
        bloc = VGroup(c, f).arrange(DOWN, aligned_edge=LEFT, buff=0.16).move_to(P(0, y))
        bloc.align_to(P(-1.9, 0), LEFT)
        self.au_mot(ex_cond)
        self.play(FadeIn(c, shift=RIGHT * 0.15), LaggedStart(*[FadeIn(k, scale=0.8) for k in rg.cases],
                                                              lag_ratio=0.1),
                  *[Create(s) for s in rg.sauts], FadeIn(na), FadeIn(nn), FadeIn(pts), run_time=0.45)
        if lab_apres:  # la formule d'abord (la voix dit « n moins p » dans la formule)
            self.au_mot("u indice n égale", n=n_formule)
            self.play(FadeIn(f, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot(ex_lab)
        self.allumer(rg.sauts, run_time=0.6, avec=[FadeIn(lab_t, scale=1.3)])
        if not lab_apres:
            self.au_mot("u indice n égale", n=n_formule)
            self.play(FadeIn(f, shift=RIGHT * 0.15), run_time=0.4)
        return rg, f

    def ecran_rang1(self):
        self.nouvel_ecran("05-rang-1")
        self.titre("Attention au rang de départ", JAUNE_TITRE, 46, extrait="Attention")
        _, f1 = self.bloc_formule(1.35, "u₁", "n − 1 pas", "Si la suite commence à u₁ :",
                                  ("uₙ = u₁ × qⁿ⁻¹", "ⁿ⁻¹"), "Si la suite", "1 pas", 1)
        self.au_mot("q puissance")
        self.play(Indicate(VGroup(*f1[-3:]), color=RAISON, scale_factor=1.4), run_time=0.45)
        self.au_mot("moins 1", n=2)
        self.play(Indicate(VGroup(*f1[-3:]), color=RAISON, scale_factor=1.2), run_time=0.35)
        _, f2 = self.bloc_formule(-1.45, "uₚ", "n − p pas", "Depuis n'importe quel terme uₚ :",
                                  ("uₙ = uₚ × qⁿ⁻ᵖ", "ⁿ⁻ᵖ"), "depuis", "moins p", 2, lab_apres=True)
        self.play(Indicate(VGroup(*f2[-3:]), color=RAISON, scale_factor=1.4), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 06 : question-pause n° 2 : w₁ = 800, q = 0,5, w₄ ? → B (100) ──────

    def ecran_question2(self):
        q = self.poser_question("06-question",
                                [(self.t("Une suite géométrique commence à w₁ = 800,", 38), "800"),
                                 (self.t("et sa raison est 0,5.", 38), "0,5"),
                                 (self.t("Combien vaut w₄ ?", 38), "Combien")],
                                [self.t(c, 52) for c in ("50", "100", "1 600")], 1, en_ligne=True, largeur=3.9,
                                fs=52)
        self.dire("06b-reponse")
        ok = self.q_reponse(q, 1)
        self.degager(q, 1, ok)
        self.au_mot("De ")
        rg, anims = self.rangee_question(4, ("w₁", "w₄"), 0.2, x0=-2.6, x1=1.6)
        self.play(*anims, run_time=0.35)
        self.suivre("3")
        lab = self.t("3 pas", 40, RAISON).next_to(rg, RIGHT, buff=0.5)
        self.allumer(rg.sauts, run_time=0.5, avec=[FadeIn(lab, scale=1.3)])
        c = self.calcul([("w₄ =", TERME, "800"), ("800", WHITE, None), ("×", WHITE, None), ("0,5", WHITE, "0,5"),
                         ("³", RAISON, "3"), ("=", WHITE, "égale"), ("800", WHITE, "800"), ("×", WHITE, None),
                         ("0,125", WHITE, "0,125"), ("=", WHITE, "égale"), ("100", JUSTE, "100")],
                        -1.3, centre=-0.3, fs=52, avec=[rg.cases[3].animate.set_stroke(JUSTE, width=6)])
        self.insister(c[-1], 1.3)
        self.attendre_voix(marge=0.6)

    # ── 07 : le piège : « 2 000 × 1,1 × 12 » ; le 12 monte en exposant ─────

    def ecran_piege(self):
        self.nouvel_ecran("07-piege")
        self.au_mot("piège")
        tit = self.t("Le piège !", 50, PIEGE).move_to(P(0, 3.15))
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        ROSE = "#FCA5A5"  # la formule fausse reste LISIBLE sous le trait rouge
        mal = self.calcul([("2 000", ROSE, "2 000"), ("×", ROSE, None), ("1,1", ROSE, "1,1"), ("×", ROSE, None),
                           ("12", ROSE, "12"), ("=", ROSE, "26 400"), ("26 400", ROSE, None)], 1.65,
                          centre=-0.4, fs=56)
        self.au_mot("beaucoup")
        trait = self.barre_lisible(mal, sw=4)
        x = self.croix(P(mal.get_right()[0] + 0.75, 1.65))
        trop = self.t("beaucoup trop !", 40, PIEGE).move_to(P(-0.4, 0.75))
        self.play(Create(trait), Create(x), FadeIn(trop, shift=UP * 0.1), run_time=0.45)
        self.au_mot("nombre de pas")
        douze = mal[4]
        self.play(Indicate(douze, color=RAISON, scale_factor=1.5), run_time=0.5)
        bon, (b1, b2, b3, b4) = self.ligne([("2 000", WHITE), ("×", WHITE), ("1,1", WHITE), ("¹²", RAISON)], 64)
        bon.move_to(P(-0.4, -0.75))
        self.au_mot("EXPOSANT")
        self.play(FadeIn(VGroup(b1, b2, b3), shift=UP * 0.1), TransformFromCopy(douze, b4), run_time=0.6)
        ok = self.coche(JUSTE, 0.3).next_to(bon, RIGHT, buff=0.5)
        self.play(Create(ok), b4.animate.set_color(RAISON), run_time=0.3)
        self.insister(b4, 1.4)
        self.au_mot("AVANT")
        y_s = b1.get_bottom()[1] - 0.2
        s1 = Line(P(b3.get_left()[0] - 0.05, y_s), P(b4.get_right()[0] + 0.05, y_s), stroke_color=RAISON,
                  stroke_width=5)
        e1 = self.t("d'abord", 40, RAISON).next_to(s1, DOWN, buff=0.18)
        self.play(Create(s1), FadeIn(e1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("multiplier")
        s2 = Line(P(b1.get_left()[0] - 0.05, y_s), P(b2.get_right()[0] + 0.05, y_s), stroke_color=TERME,
                  stroke_width=5)
        e2 = self.t("ensuite", 40, TERME).next_to(s2, DOWN, buff=0.18)
        e2.set_y(e1.get_center()[1])
        self.play(Create(s2), FadeIn(e2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : t₅ = 96, q = 2 → t₈ et t₃ ─────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        enonce = self.t("Une suite géométrique de raison 2", 40).move_to(P(0, 2.25))
        self.suivre("2")
        self.play(FadeIn(enonce, shift=UP * 0.1), run_time=0.3)
        rg = Rangee(6, -5.0, 3.5, -0.2, larg=1.15, haut=0.8, creux=0.3, sauts=False)
        noms = {k: self.nom_case(rg, k - 3, u(k, "t"), 38, GREY_A) for k in range(3, 9)}
        self.au_mot("vérifie")
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in rg.cases], lag_ratio=0.08), run_time=0.4)
        self.suivre("5")
        self.play(FadeIn(noms[5], shift=UP * 0.08), rg.cases[2].animate.set_stroke(TERME, width=6), run_time=0.25)
        self.suivre("96")
        self.ecrire_case(rg, 2, "96", WHITE, 40)
        self.suivre("8")
        q8 = Text("?", font_size=40, color=RAISON).move_to(rg.cases[5])
        self.play(FadeIn(noms[8]), FadeIn(noms[6]), FadeIn(noms[7]), FadeIn(q8, scale=1.5),
                  rg.cases[5].animate.set_stroke(RAISON, width=5), run_time=0.3)
        self.suivre("3")
        q3 = Text("?", font_size=40, color=RAISON).move_to(rg.cases[0])
        self.play(FadeIn(noms[3]), FadeIn(noms[4]), FadeIn(q3, scale=1.5),
                  rg.cases[0].animate.set_stroke(RAISON, width=5), run_time=0.3)
        self.defi_pause(-2.3, x=-0.6)
        self._defi = (tit, rg, q8, q3)

    def recul(self, rg, i, j, creux=0.3):
        """La flèche « ÷ q » de la case i à la case j (à GAUCHE), par-dessus les
        cases comme les sauts en avant (l'arc ne plonge pas dans les cases)."""
        d = rg.cases[i].get_top() + 0.05 * UP + LEFT * 0.22  # pas le même départ que le saut en avant
        f = rg.cases[j].get_top() + 0.05 * UP + RIGHT * 0.12
        angle = 4 * np.arctan(2 * creux / max(np.linalg.norm(f - d), 0.1))
        return CurvedArrow(d, f, angle=angle, color=GRIS_SAUT, stroke_width=4, tip_length=0.12)

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, rg, q8, q3 = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 48, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), run_time=0.4)
        avant = [rg.fleche(k, k + 1, 0.3, 4, GRIS_SAUT) for k in (2, 3, 4)]
        arriere = [self.recul(rg, k, k - 1) for k in (2, 1)]
        self.play(*[Create(f) for f in avant], run_time=0.3)
        self.suivre("3")
        fois = [self.t("× 2", 30, RAISON).next_to(f, UP, buff=0.04) for f in avant]
        lab_av = self.t("3 pas en avant", 34, RAISON).next_to(VGroup(*fois), UP, buff=0.1)
        lab_av.align_to(rg.cases[5], RIGHT)
        self.allumer(avant, run_time=0.6, avec=[FadeIn(lab_av, scale=1.2)])
        c1 = self.calcul([("t₈ =", TERME, "96"), ("96", WHITE, None), ("×", WHITE, None), ("2", WHITE, "2"),
                          ("³", RAISON, "3"), ("=", WHITE, "égale"), ("96", WHITE, "96"), ("×", WHITE, None),
                          ("8", WHITE, "8"), ("=", WHITE, "égale"), ("768", JUSTE, "768")], -1.72, centre=-0.6,
                         fs=48, avec_morceau={3: [FadeIn(f, scale=1.3) for f in fois]})
        t768 = Text("768", font_size=34, color=JUSTE).move_to(rg.cases[5])
        self.play(FadeOut(q8), FadeIn(t768, scale=1.4), rg.cases[5].animate.set_stroke(JUSTE, width=6),
                  run_time=0.3)
        self.insister(c1[-1], 1.25)
        self.suivre("2 pas")
        self.play(*[Create(f) for f in arriere], run_time=0.25)
        div = [self.t("÷ 2", 30, TERME).next_to(f, UP, buff=0.04) for f in arriere]
        lab_ar = self.t("2 pas en arrière", 34, TERME).next_to(VGroup(*div), UP, buff=0.1).align_to(lab_av, DOWN)
        lab_ar.align_to(rg.cases[0], LEFT)
        self.allumer(arriere, couleur=TERME, run_time=0.5,
                     avec=[FadeIn(lab_ar, scale=1.2), *[FadeIn(d) for d in div]])
        c2 = self.calcul([("t₃ =", TERME, "divise"), ("96", WHITE, None), ("÷", WHITE, None), ("2", WHITE, "2"),
                          ("²", RAISON, "2"), ("=", WHITE, "96"), ("96", WHITE, None), ("÷", WHITE, None),
                          ("4", WHITE, "4"), ("=", WHITE, "égale"), ("24", JUSTE, "24")], -2.78, centre=-0.6,
                         fs=48)
        t24 = Text("24", font_size=40, color=JUSTE).move_to(rg.cases[0])
        self.play(FadeOut(q3), FadeIn(t24, scale=1.4), rg.cases[0].animate.set_stroke(JUSTE, width=6),
                  run_time=0.3)
        self.insister(c2[-1], 1.25)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 42
        p1 = [self.t("Pour calculer un terme lointain :", fs, JAUNE_TITRE),
              self.t("on multiplie par q autant de fois", fs),
              VGroup(self.t("qu'il y a de", fs), self.t("pas.", fs, RAISON)).arrange(RIGHT, buff=0.18)]
        p2 = [Text("uₙ = u₀ × qⁿ", font_size=54, color=JUSTE, t2c={"ⁿ": RAISON}),
              Text("ou  uₙ = u₁ × qⁿ⁻¹", font_size=54, color=JUSTE, t2c={"ⁿ⁻¹": RAISON})]
        p3 = [VGroup(self.t("Pour reculer,", fs), self.t("on divise.", fs, TERME)).arrange(RIGHT, buff=0.18)]
        self.finale([(p1, ["Pour calculer", "on multiplie", "qu'il y a"]), (p2, ["u indice n égale", "ou u indice 1"]),
                     (p3, ["Pour reculer"])], cle="09-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_pas()
        self.ecran_puissance()
        self.ecran_question1()
        self.ecran_rang1()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin(cle="10-abonne")
