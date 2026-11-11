# suite_arith_notation.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suites : la
# notation » (16:9), ceinture VERTE. Série SUITES, épisode 03.
# Micro du coach : lin_suite_notation (notion lin_suite_arithmetique) :
# lib/tutor-v4/questionBank/premiere/maths/suites-arithmetiques.bank.ts
# + suites-arithmetiques-renfort.ts (aNotaEcrire, aNotaAnnee, aNotaCalcul,
# aNotaSuivant, aRang, aNotaTableau).
#
# Ce que demande le coach → écran :
#   · uₙ = terme de rang n, pas u × n (QCM fixe ★1)       → 02, 08-piege ;
#   · u(k) ↔ uₖ, « ce qui est entre parenthèses passe en indice » (aNotaEcrire)
#                                                          → 02-deux-notations ;
#   · l'indice est le rang, pas l'année (aNotaAnnee, tpl ★2) → 03-rang, 04 (A) ;
#   · calculer uₖ depuis u(n) = a + bn (aNotaCalcul)       → 03 (u₅ = 1 200) ;
#   · premier terme u₀ ou u₁, position, nombre de termes (aRang) → 05, 09 défi ;
#   · u(n + 1) : on remplace n par n + 1 (aNotaSuivant ★3) → 06, 07 (B).
# Clé de voix → écran :
#   00-garde (u(n) et uₙ, le petit n qui clignote) · 01 Nadia, ingénieure d'une
#   agence spatiale : la Terre, l'orbite, les satellites qui tournent, + 120 par
#   an, le rapport · 02 u(n) = uₙ : le n quitte les parenthèses et descend en
#   indice ; u(5) = u₅ · 03 les cases u₀ … u₅, l'année au-dessus, « rang » dessous ;
#   2031 → u₅ (pas u₂₀₃₁) ; u₅ = 600 + 5 × 120 = 1 200 · 04/04b question (A : u₈)
#   · 05 deux lignes de 10 cases, u₀ … u₉ et u₁ … u₁₀ : le 10e terme, décalage
#   d'un rang en rouge ; 9 − 0 + 1 = 10 termes · 06 u(n + 1) ≠ u(n) + 1, la case
#   juste à droite, n remplacé par (n + 1) · 07/07b question (B : 8 + 3n) ·
#   08 le piège uₙ ≠ u × n, la place dans la liste, le 6e terme · 09/09b défi
#   w₂₄ et 41 termes · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = termes, orange = rang / raison,
# vert = juste, rouge = piège. ⛔ Pas de LaTeX : Text, et MarkupText (Pango) pour
# les vrais indices abaissés (u_{n+1} → uₙ₊₁ bien en bas, lisible en classe).
# Voix : manim/voix/premiere-suite-arith-notation.json (débit −6), calée mot à mot
# par suite_arith_notation_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_arith_notation.py SuiteArithNotation1re -o eleveai-maths-premiere-suite-arith-notation --media_dir manim/scripts/premiere/media-suite-arith-notation
# Sortie : manim/sorties/premiere/maths/suites/03-arith-notation/

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
U0, R, AN0 = 600, 120, 2026


def sat(n):
    return U0 + R * n


assert 2031 - AN0 == 5 and sat(5) == 1200
assert 2034 - AN0 == 8                                       # question 1 : A (u₈)
assert 9 - 0 + 1 == 10                                       # de u₀ à u₉
assert all(sat(n + 1) == 720 + 120 * n for n in range(20))   # u(n + 1) = 720 + 120n
assert all(5 + 3 * (n + 1) == 8 + 3 * n for n in range(20))  # question 2 : B
assert 25 - 1 + 0 == 24 and 40 - 0 + 1 == 41                 # le défi

TERRE, MER, ORBITE, PANNEAU = "#16A34A", "#1D4ED8", "#475569", "#38BDF8"


def _md(s, fs):
    """« u_{n+1} » → l'indice en vrai indice Pango (62 %, abaissé)."""
    r = -max(2, round(fs * 0.1))
    return re.sub(r"_\{([^}]*)\}", lambda m: f'<span size="62%" rise="{r}pt">{m.group(1)}</span>', s)


def formule(pieces, fs=40, couleur=WHITE):
    """Une formule en UN MarkupText (lignes de base alignées, vrais indices).
    pieces : [texte] ou [(texte, couleur)] ; f.parts[k] = les glyphes du morceau k,
    pour les dévoiler un à un quand la voix les dit."""
    pieces = [(p, couleur) if isinstance(p, str) else p for p in pieces]
    mk = " ".join(f'<span foreground="{ManimColor(c).to_hex()}">{_md(t, fs)}</span>' for t, c in pieces)
    m = MarkupText(f'<span font_features="liga=0">{mk}</span>', font_size=fs)
    parts, k = [], 0
    for t, _ in pieces:
        n = len(re.sub(r"\s", "", re.sub(r"_\{([^}]*)\}", r"\1", t)))
        parts.append(m[k:k + n])
        k += n
    assert k == len(m), f"glyphes {len(m)} ≠ {k} : {pieces}"
    m.parts = parts
    return m


def nom(texte, fs=36, couleur=TERME):
    """Une notation seule (« u_{5} »), en vrai indice."""
    return formule([(texte, couleur)], fs)


# ── les dessins de l'épisode ────────────────────────────────────────────────

def nadia(s=1.0):
    """Nadia, ingénieure : cheveux en chignon, blouse, badge, une tablette."""
    peau, cheveux = "#8d5524", "#1f1300"
    chignon = Circle(radius=0.17, fill_color=cheveux, fill_opacity=1, stroke_width=0).move_to(P(0, 1.38))
    tete = Circle(radius=0.28, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    frange = Arc(radius=0.28, start_angle=0.15, angle=PI - 0.3, stroke_color=cheveux, stroke_width=9).move_to(P(0, 1.2))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#F1F5F9", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = Polygon(P(-0.16, 0.7), P(0.16, 0.7), P(0, 0.45), fill_color="#7C3AED", fill_opacity=1, stroke_width=0)
    badge = RoundedRectangle(width=0.2, height=0.14, corner_radius=0.03, fill_color=TERME, fill_opacity=1,
                             stroke_width=0).move_to(P(-0.22, 0.3))
    tablette = RoundedRectangle(width=0.5, height=0.66, corner_radius=0.06, fill_color="#0F172A", fill_opacity=1,
                                stroke_color=GREY_B, stroke_width=2).move_to(P(0.62, 0.15)).rotate(-0.15)
    ecran = VGroup(*[Line(P(0.47, 0.3 - 0.12 * k), P(0.75, 0.27 - 0.12 * k), stroke_color=PANNEAU, stroke_width=2)
                     for k in range(4)])
    return VGroup(corps, col, badge, chignon, tete, frange, tablette, ecran).scale(s)


def terre(r=1.1):
    """La Terre : océan bleu, trois continents verts, un liseré d'atmosphère."""
    mer = Circle(radius=r, fill_color=MER, fill_opacity=1, stroke_color=PANNEAU, stroke_width=3)
    c1 = Ellipse(width=0.9 * r, height=0.55 * r, fill_color=TERRE, fill_opacity=1, stroke_width=0)
    c1.rotate(0.5).move_to(mer.get_center() + P(-0.3 * r, 0.3 * r))
    c2 = Ellipse(width=0.5 * r, height=0.8 * r, fill_color=TERRE, fill_opacity=1, stroke_width=0)
    c2.rotate(-0.3).move_to(mer.get_center() + P(0.4 * r, -0.25 * r))
    c3 = Ellipse(width=0.35 * r, height=0.2 * r, fill_color=TERRE, fill_opacity=1, stroke_width=0)
    c3.move_to(mer.get_center() + P(-0.35 * r, -0.55 * r))
    return VGroup(mer, c1, c2, c3)


def satellite(couleur=WHITE, s=1.0):
    """Un satellite : le corps et deux panneaux solaires."""
    corps = Square(0.14, fill_color=couleur, fill_opacity=1, stroke_width=0)
    p1 = Rectangle(width=0.2, height=0.09, fill_color=PANNEAU, fill_opacity=1, stroke_width=0).next_to(corps, LEFT, 0.03)
    p2 = p1.copy().next_to(corps, RIGHT, 0.03)
    return VGroup(corps, p1, p2).scale(s)


def rapport(largeur=2.0, hauteur=2.5):
    """Le rapport de Nadia : une feuille, un bandeau, des lignes grises."""
    feuille = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.08, fill_color="#F8FAFC",
                               fill_opacity=1, stroke_width=0)
    bandeau = Rectangle(width=largeur, height=0.32, fill_color=TERME, fill_opacity=1, stroke_width=0)
    bandeau.align_to(feuille, UP)
    lignes = VGroup(*[Line(P(-largeur / 2 + 0.2, 0), P(largeur / 2 - 0.2 - 0.3 * (k % 2), 0), stroke_color="#94A3B8",
                           stroke_width=3).shift(UP * (hauteur / 2 - 0.62 - 0.36 * k)) for k in range(6)])
    return VGroup(feuille, bandeau, lignes)


def cases(noms, xs, y, largeur=1.2, hauteur=0.8, fs=36, couleur=TERME):
    """Des cases (cadre bleu) avec une notation DEDANS (« u_{0} »…), aux abscisses xs.
    c[i] = VGroup(cadre, notation)."""
    g = VGroup()
    for nm, x in zip(noms, xs):
        cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.12, stroke_color=couleur,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x, y))
        if nm == "…":
            cadre.set_stroke(opacity=0)
            tx = Text("…", font_size=fs, color=GREY_A)
        elif nm == "?":
            tx = Text("?", font_size=fs, color=RAISON)
        else:
            tx = nom(nm, fs, couleur)
        if tx.width > largeur - 0.14:
            tx.scale_to_fit_width(largeur - 0.14)
        g.add(VGroup(cadre, tx.move_to(cadre)))
    return g


def etiquettes(textes, cs, cote=DOWN, fs=24, couleur=GREY_A, buff=0.1):
    """Une étiquette sous (ou sur) chaque case : « rang 0 », « 2026 », « 1er »…
    (données de la figure qu'on LIT : non auditées)."""
    g = VGroup()
    for tx, c in zip(textes, cs):
        e = Text(tx, font_size=fs, color=couleur).next_to(c[0], cote, buff=buff)
        e._pas_audit = True
        g.add(e)
    return g


class SuiteArithNotation1re(PaysageSuites):
    fichier_marques = "suite_arith_notation_marques.json"
    nom_voix = "premiere-suite-arith-notation"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    # ── outils de l'épisode ────────────────────────────────────────────────

    def devoiler(self, f, extraits, run_time=0.25, shift=UP * 0.1, deja=0):
        """Les morceaux d'une formule, chacun quand la voix dit son extrait
        (None : avec le morceau suivant qui a un extrait, ou à la fin) ;
        deja : les premiers morceaux, déjà montrés."""
        paquet = []
        for part, ex in list(zip(f.parts, extraits))[deja:]:
            if ex is not None:
                if paquet:
                    self.play(*[FadeIn(p, shift=shift) for p in paquet], run_time=run_time)
                    paquet = []
                self.suivre(ex)
            paquet.append(part)
        if paquet:
            self.play(*[FadeIn(p, shift=shift) for p in paquet], run_time=run_time)
        return f

    def contour(self, c, couleur=JUSTE, largeur=7):
        """Le CONTOUR d'une case s'allume (le nombre reste lisible)."""
        return c[0].animate.set_stroke(couleur, width=largeur)

    def montrer_cases(self, cs, labs=(), run_time=0.5, lag=0.08):
        anims = [FadeIn(c, scale=0.85) for c in cs] + [FadeIn(lb) for lb in labs]
        self.play(LaggedStart(*anims, lag_ratio=lag), run_time=run_time)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Suites : la notation", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Suites")
        self.play(Write(tit), run_time=0.7)
        f1 = nom("u(n)", 100, WHITE).move_to(P(-2.0, 1.15))
        f2 = nom("u_{n}", 100, WHITE).move_to(P(2.0, 1.15)).align_to(f1[0], UP)
        self.au_mot("u de n")
        self.play(FadeIn(f1, scale=1.3), run_time=0.35)
        self.au_mot("u indice n")
        self.play(FadeIn(f2, scale=1.3), run_time=0.35)
        l1 = self.t("Que veut dire ce petit n ?", 40).move_to(P(0, -0.35))
        self.au_mot("que veut dire")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("petit n")
        n1, n2 = f1[2], f2[1]
        self.play(n1.animate.set_color(RAISON).scale(1.5), n2.animate.set_color(RAISON).scale(1.5), run_time=0.25)
        self.play(n1.animate.scale(1 / 1.5), n2.animate.scale(1 / 1.5), run_time=0.25)
        l2 = self.t("Comment ne pas se tromper de rang ?", 40, RAISON).move_to(P(0, -1.0))
        self.au_mot("comment")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        ident = self.t(self.identite, 26, GREY_A, audit=False).move_to(P(0, -1.6))
        self.play(FadeIn(ident), run_time=0.3)
        self.attendre_voix(marge=0.9)

    # ── 01 : Nadia et la constellation ─────────────────────────────────────

    C_TERRE = P(0.6, 0.35)
    R_ORBITE = 1.95

    def sur_orbite(self, angle, couleur=WHITE):
        s = satellite(couleur)
        return s.move_to(self.C_TERRE + self.R_ORBITE * P(np.cos(angle), np.sin(angle)))

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = nadia(1.0).move_to(P(-5.0, 1.0))
        nm = self.t("Nadia", 40, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        met = self.t("ingénieure", 34, TERME).next_to(nm, DOWN, buff=0.12)
        ag = self.t("agence spatiale", 30, GREY_A).next_to(met, DOWN, buff=0.1)
        self.au_mot("Nadia")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nm, shift=UP * 0.1), run_time=0.5)
        self.au_mot("ingénieure")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.35)
        self.au_mot("agence spatiale")
        self.play(FadeIn(ag, shift=UP * 0.1), run_time=0.35)
        orbite = Circle(radius=self.R_ORBITE, stroke_color=ORBITE, stroke_width=2).move_to(self.C_TERRE)
        orbite.set_stroke(opacity=0.8)
        t = terre(1.0).move_to(self.C_TERRE)
        sats = VGroup(*[self.sur_orbite(a) for a in np.linspace(0, TAU, 8, endpoint=False) + 0.3])
        self.au_mot("constellation")
        self.play(GrowFromCenter(t), Create(orbite), run_time=0.6)
        self.play(LaggedStart(*[FadeIn(s, scale=0.4) for s in sats], lag_ratio=0.12), run_time=0.7)
        sats.add_updater(lambda m, dt: m.rotate(0.22 * dt, about_point=self.C_TERRE))
        self.au_mot("la Terre")
        self.play(Indicate(t, color=TERRE, scale_factor=1.08), run_time=0.6)
        x_d = 4.85
        a1 = self.t("En 2026 :", 34, GREY_A).move_to(P(x_d, 2.4))
        a2 = self.t("600 satellites", 36, TERME).move_to(P(x_d, 1.85))
        self.au_mot("2026")
        self.play(FadeIn(a1, shift=LEFT * 0.1), run_time=0.3)
        self.au_mot("600")
        self.play(FadeIn(a2, scale=1.3), *[Indicate(s, color=TERME, scale_factor=1.6) for s in sats], run_time=0.5)
        self.au_mot("120")
        a3 = VGroup(self.t("+ 120", 40, RAISON), self.t("chaque année", 30, RAISON)).arrange(DOWN, buff=0.08)
        a3.move_to(P(x_d, 1.05))
        neufs = [self.sur_orbite(a, RAISON) for a in (0.69, 2.27, 4.62)]  # entre deux anciens
        self.play(FadeIn(a3, scale=1.2), *[FadeIn(s, scale=2.0) for s in neufs], run_time=0.5)
        for s in neufs:
            sats.add(s)
        self.au_mot("rapport")
        rp = rapport(2.2, 2.65).move_to(P(4.35, -0.95))  # assez grande pour lire les notations
        self.play(FadeIn(rp, shift=UP * 0.3), run_time=0.5)
        self.au_mot("notations")
        ecr = [nom("u(n)", 38, "#0F172A"), nom("u_{n}", 38, "#0F172A"), nom("u_{n+1}", 38, RAISON)]
        for k, e in enumerate(ecr):
            e.move_to(rp[2][2 * k].get_center()).align_to(rp[0].get_left() + RIGHT * 0.25, LEFT)
            e.shift(UP * 0.04)
        self.play(*[FadeOut(rp[2][2 * k]) for k in range(3)], LaggedStart(*[Write(e) for e in ecr], lag_ratio=0.3),
                  run_time=0.8)
        self.attendre_voix(marge=0.5)
        sats.clear_updaters()

    # ── 02 : u(n) et uₙ, le même terme ─────────────────────────────────────

    def descendre(self, f_par, i_n, f_ind, i_ind, run_time=0.6, montrer=None):
        """Le contenu des parenthèses (glyphes i_n de f_par) DESCEND en indice
        (glyphes i_ind de f_ind) : une copie orange glisse le long d'un arc ;
        montrer : des animations jouées en même temps (le texte qui le dit)."""
        src = VGroup(*[f_par[k] for k in i_n])
        dst = VGroup(*[f_ind[k] for k in i_ind])
        vol = src.copy().set_color(RAISON)
        self.play(Transform(vol, dst.copy().set_color(RAISON), path_arc=-PI / 2.5), *(montrer or []),
                  run_time=run_time)
        self.play(dst.animate.set_color(RAISON), FadeOut(vol), run_time=0.15)

    def parentheses(self, f, i_n):
        return Indicate(VGroup(f[i_n[0] - 1], f[i_n[-1] + 1]), color=RAISON, scale_factor=1.3)

    def ecran_deux_notations(self):
        self.nouvel_ecran("02-deux-notations")
        x0 = -6.2
        l1 = formule([("u(n)", TERME), (":", WHITE), ("le nombre de satellites en", WHITE), ("2026 + n", RAISON)], 38)
        l1.move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        self.devoiler(l1, ["u de n", None, "le nombre", "2026"])
        l2 = formule([("La suite commence à 0 :", GREY_A), ("u(0) =", TERME), ("600", WHITE)], 38)
        l2.move_to(P(0, 2.15)).align_to(P(x0, 0), LEFT)
        self.devoiler(l2, ["commence", "u de 0", "600"])
        g1 = nom("u(n)", 110, TERME).move_to(P(-2.6, 0.45))
        g2 = nom("u_{n}", 110, TERME).move_to(P(2.6, 0.45)).align_to(g1[0], UP)
        self.au_mot("aussi")
        self.play(FadeIn(g1, scale=1.2), run_time=0.35)
        self.suivre("u indice n")
        self.play(FadeIn(g2, scale=1.2), run_time=0.35)
        self.au_mot("le même terme")
        eg = self.t("=", 110, JUSTE).move_to(P((g1.get_right()[0] + g2.get_left()[0]) / 2, g1.get_center()[1]))
        mt = self.t("le même terme", 40, JUSTE).move_to(P(0, -0.85))
        self.play(GrowFromCenter(eg), FadeIn(mt, shift=UP * 0.1), run_time=0.4)
        self.au_mot("entre parenthèses")
        self.play(self.parentheses(g1, [2]), run_time=0.4)
        self.au_mot("passe en indice")
        pi = self.t("ce qui est entre parenthèses passe en indice", 34, RAISON).move_to(P(-0.4, -1.6))
        self.descendre(g1, [2], g2, [1], montrer=[FadeIn(pi, shift=UP * 0.1)])
        f5 = formule([("u(5)", TERME), ("=", JUSTE), ("u_{5}", TERME)], 64).move_to(P(-0.4, -2.65))
        self.au_mot("u de 5")
        self.play(FadeIn(f5.parts[0], scale=1.2), run_time=0.3)
        self.au_mot("u indice 5")
        self.play(FadeIn(f5.parts[1]), FadeIn(f5.parts[2], scale=1.2), run_time=0.3)
        self.play(self.parentheses(f5, [2]), run_time=0.3)
        self.descendre(f5, [2], f5, [6], run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 03 : le n est un rang ──────────────────────────────────────────────

    XS6 = [-4.75 + 1.9 * k for k in range(6)]

    def ecran_rang(self):
        self.nouvel_ecran("03-rang")
        tit = self.t("Le n est un rang", 46, JAUNE_TITRE).move_to(P(0, 3.22))
        self.au_mot("Le n")
        cs = cases([f"u_{{{k}}}" for k in range(6)], self.XS6, 0.75, 1.4, 0.85, 44)
        rangs = etiquettes([f"rang {k}" for k in range(6)], cs, DOWN, 28, RAISON, 0.14)
        ans = etiquettes([str(AN0 + k) for k in range(6)], cs, UP, 28, GREY_A, 0.16)
        self.play(FadeIn(tit, shift=DOWN * 0.1), LaggedStart(*[FadeIn(c, scale=0.85) for c in cs], lag_ratio=0.1),
                  run_time=0.4)
        self.au_mot("RANG")
        self.play(LaggedStart(*[FadeIn(r, shift=UP * 0.1) for r in rangs], lag_ratio=0.1), run_time=0.35)
        self.au_mot("pas une année")
        self.play(LaggedStart(*[FadeIn(a, shift=DOWN * 0.1) for a in ans], lag_ratio=0.1), run_time=0.4)
        self.au_mot("2031")
        self.play(ans[5].animate.set_color(WHITE).scale(1.25), run_time=0.3)
        self.au_mot("2026 plus")
        fl = CurvedArrow(ans[0].get_top() + UP * 0.08, ans[5].get_top() + UP * 0.08, angle=-0.35, color=RAISON,
                         stroke_width=4, tip_length=0.16)
        self.play(ans[0].animate.set_color(WHITE), Create(fl), run_time=0.5)
        self.suivre("5")
        p5 = self.t("+ 5", 32, RAISON).next_to(fl, UP, buff=0.02)
        self.play(FadeIn(p5, scale=1.4), run_time=0.25)
        y = -0.85
        c1 = formule([("2031 = 2026 + 5", WHITE), ("→", GREY_A), ("u_{5}", JUSTE)], 46)
        c1.move_to(P(0, y)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("c'est u indice 5")
        self.play(FadeIn(c1.parts[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(c1.parts[1]), FadeIn(c1.parts[2], scale=1.3), self.contour(cs[5]), run_time=0.35)
        self.au_mot("pas u indice 2031")
        faux = nom("u_{2031}", 46, PIEGE).move_to(P(3.6, y))
        self.play(FadeIn(faux, shift=UP * 0.1), run_time=0.3)
        cxf = self.barrer(Square(0.36)).next_to(faux, RIGHT, buff=0.3)  # la croix À CÔTÉ : u₂₀₃₁ reste lisible
        self.play(Create(cxf), run_time=0.3)
        c2 = formule([("u_{5}", TERME), ("=", WHITE), ("600", WHITE), ("+ 5 ×", WHITE), ("120", RAISON),
                      ("=", WHITE), ("1 200", JUSTE)], 46)
        c2.move_to(P(0, -1.95)).align_to(P(-6.2, 0), LEFT)
        self.devoiler(c2, ["u indice 5", None, "600", "5 fois", "120", None, "1 200"])
        cad = self.encadre(c2.parts[6], JUSTE, 0.12)
        sat_ = self.t("satellites", 36, JUSTE).next_to(cad, RIGHT, buff=0.25)
        self.play(Create(cad), FadeIn(sat_, shift=LEFT * 0.1), run_time=0.35)
        self.insister(VGroup(c2.parts[6], cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── la question-pause : des formules dont chaque morceau suit la voix ────

    def morceaux(self, pieces, fs=40, couleur=WHITE):
        """[(texte, extrait), …] → une formule dont poser_question dévoile chaque
        morceau quand la voix dit son extrait (g.nombres, g.extraits)."""
        f = formule([(t, couleur) for t, _ in pieces], fs)
        f.nombres, f.extraits = f.parts, [e for _, e in pieces]
        return f

    def montrer_liste(self, g, extraits=None, run_time=0.18):
        if not hasattr(g, "parts"):
            return super().montrer_liste(g, extraits, run_time)
        for n, ex in zip(g.nombres, extraits or g.extraits):
            self.suivre(ex)
            self.play(FadeIn(n, scale=1.3), run_time=run_time)

    # ── 04 : question-pause n° 1 : 2034 → A (u₈) ──────────────────────────

    def ecran_question1(self):
        choix = [self.morceaux([("u_{8}", "8")], 52), self.morceaux([("u_{2034}", "2034")], 52),
                 self.morceaux([("u_{9}", "9")], 52)]
        q = self.poser_question("04-question",
                                [(self.t("Dans le rapport, comment s'écrit", 40), "Dans le rapport"),
                                 (self.t("le nombre de satellites", 40), "le nombre"),
                                 (self.t("en 2034 ?", 40, RAISON), "2034")],
                                choix, 0, en_ligne=True, largeur=3.5, fs=40)
        self.dire("04b-reponse")
        self.q_reponse(q, 0)
        y = q.cartes.get_bottom()[1] - 0.75
        c = formule([("2034", WHITE), ("−", WHITE), ("2026", WHITE), ("=", WHITE), ("8", JUSTE)], 46).move_to(P(0, y))
        self.devoiler(c, ["2034", None, "2026", None, "8"])
        r8 = self.t("c'est le terme de rang 8", 40, JUSTE).move_to(P(0, y - 0.85))
        self.au_mot("8", n=2)
        self.play(FadeIn(r8, shift=UP * 0.1), run_time=0.35)
        self.insister(c.parts[4], 1.4)
        self.attendre_voix(marge=0.6)

    # ── 05 : le premier terme : u₀ ou u₁ ? ─────────────────────────────────

    XS10 = [-5.4 + 1.2 * k for k in range(10)]
    POS10 = ["1er"] + [f"{k}e" for k in range(2, 11)]

    def rangee(self, debut, y_lab, y_cases):
        lab = formule([("Si la suite commence à", WHITE), (f"u_{{{debut}}}", TERME), (":", WHITE)], 34)
        lab.move_to(P(0, y_lab)).align_to(P(-5.95, 0), LEFT)
        cs = cases([f"u_{{{debut + k}}}" for k in range(10)], self.XS10, y_cases, 1.0, 0.7, 34)
        pos = etiquettes(self.POS10, cs, UP, 22, GREY_A, 0.08)
        return lab, cs, pos

    def ecran_position(self):
        self.nouvel_ecran("05-position")
        tit = self.t("Attention au premier terme", 44, RAISON).move_to(P(0, 3.12))
        self.au_mot("premier terme")
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.35)
        lab1, cs1, pos1 = self.rangee(0, 2.45, 1.35)
        lab2, cs2, pos2 = self.rangee(1, 0.4, -0.7)
        self.au_mot("commence à u indice 0")
        self.play(FadeIn(lab1, shift=UP * 0.1), run_time=0.3)
        self.montrer_cases(cs1, pos1, run_time=0.7, lag=0.05)
        self.au_mot("le 1er terme")
        self.play(self.contour(cs1[0]), pos1[0].animate.set_color(WHITE).scale(1.2), run_time=0.35)
        self.au_mot("le 10e terme")
        self.play(self.contour(cs1[9]), pos1[9].animate.set_color(WHITE).scale(1.2), run_time=0.35)
        self.au_mot("commence à u indice 1")
        self.play(FadeIn(lab2, shift=UP * 0.1), run_time=0.3)
        self.montrer_cases(cs2, pos2, run_time=0.7, lag=0.05)
        self.au_mot("le 10e terme", n=2)
        self.play(self.contour(cs2[9], PIEGE), self.contour(cs1[9], PIEGE), pos2[9].animate.set_color(WHITE).scale(1.2),
                  run_time=0.35)
        lien = DoubleArrow(cs1[9][0].get_bottom(), cs2[9][0].get_top() + UP * 0.32, buff=0.06, color=PIEGE,
                           stroke_width=5, tip_length=0.16)
        self.play(GrowFromCenter(lien), Indicate(cs2[9][1], color=PIEGE, scale_factor=1.3),
                  Indicate(cs1[9][1], color=PIEGE, scale_factor=1.3), run_time=0.5)
        self.au_mot("Et de")
        c = formule([("de u_{0} à u_{9} :", TERME), ("10 termes", JUSTE), ("=", WHITE), ("9 − 0 + 1", RAISON)], 44)
        c.move_to(P(0, -1.95)).align_to(P(-5.95, 0), LEFT)
        self.play(FadeIn(c.parts[0], shift=UP * 0.1), self.contour(cs1[0], TERME), self.contour(cs1[9], TERME),
                  run_time=0.35)
        self.play(LaggedStart(*[Indicate(x, color=JUSTE, scale_factor=1.12) for x in cs1], lag_ratio=0.08),
                  run_time=0.8)
        self.devoiler(c, [None, "10 termes", None, "9 moins"], deja=1)
        cad = self.encadre(c.parts[1], JUSTE, 0.12)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 06 : u(n + 1), le terme suivant ────────────────────────────────────

    def ecran_n_plus_1(self):
        self.nouvel_ecran("06-n-plus-1")
        tit = self.t("Encore une différence", 44, JAUNE_TITRE).move_to(P(0, 3.12))
        self.au_mot("Encore")
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.35)
        fa = formule([("u(n + 1)", TERME), ("=", WHITE), ("u_{n+1}", TERME)], 60)
        fa.move_to(P(0, 2.25)).align_to(P(-6.0, 0), LEFT)
        fb = formule([("≠", PIEGE), ("u(n) + 1", PIEGE)], 60).move_to(P(3.6, 0)).align_to(fa, DOWN)
        self.au_mot("u de n plus 1")
        self.play(FadeIn(fa.parts[0], scale=1.2), run_time=0.35)
        self.au_mot("entre les parenthèses")
        g = fa.parts[0]                       # u ( n + 1 ) : n + 1 = glyphes 2 à 4
        self.play(VGroup(g[2], g[3], g[4]).animate.set_color(RAISON),
                  Indicate(VGroup(g[1], g[5]), color=RAISON, scale_factor=1.3), run_time=0.45)
        self.play(FadeIn(fb, shift=LEFT * 0.2), run_time=0.35)
        self.play(Indicate(fb.parts[0], color=PIEGE, scale_factor=1.4), run_time=0.4)
        cs = cases(["u_{0}", "…", "u_{n}", "u_{n+1}", "…"], [-4.6, -3.0, -1.3, 0.7, 2.4], 0.8, 1.5, 0.85, 44)
        self.play(LaggedStart(*[FadeIn(c, scale=0.85) for c in cs], lag_ratio=0.1), run_time=0.5)
        self.au_mot("SUIVANT")
        s = LigneTermes([" "] * 2, xs=[-1.3, 0.7], centre=P(0, 0.8), largeur=1.5, hauteur=0.85).saut(
            0, "le suivant", fs=30)
        self.play(Create(s[0]), FadeIn(s[1], scale=1.3), self.contour(cs[3]), run_time=0.5)
        self.au_mot("u indice n plus 1")
        self.play(FadeIn(fa.parts[1]), FadeIn(fa.parts[2], scale=1.3), run_time=0.35)
        self.play(Indicate(cs[3][1], color=JUSTE, scale_factor=1.3), Indicate(fa.parts[2], color=JUSTE), run_time=0.5)
        x0 = -6.2
        l1 = formule([("u(n) =", TERME), ("600 + 120n", WHITE)], 44).move_to(P(0, -1.0)).align_to(P(x0, 0), LEFT)
        self.devoiler(l1, ["Si u de n", "600"])
        self.au_mot("on remplace")
        nl = l1.parts[1][-1]
        self.play(nl.animate.set_color(RAISON).scale(1.4), run_time=0.25)
        self.play(nl.animate.scale(1 / 1.4), run_time=0.25)
        l2 = formule([("u(n + 1) =", TERME), ("600 +", WHITE), ("120 ×", WHITE), ("(n + 1)", RAISON)], 44)
        l2.move_to(P(0, -1.85)).align_to(P(x0, 0), LEFT)
        self.devoiler(l2, ["u de n plus 1", "600", "120 fois", "n plus 1"])
        l3 = formule([("=", WHITE), ("720 + 120n", JUSTE)], 44).move_to(P(0, -2.7))
        l3.align_to(l2.parts[1], LEFT).shift(LEFT * (l3.parts[1].get_left()[0] - l3.get_left()[0]))
        self.devoiler(l3, [None, "720"])
        cad = self.encadre(l3.parts[1], JUSTE, 0.12)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 : v(n + 1) → B (8 + 3n) ───────────────────

    def ecran_question2(self):
        defn = self.morceaux([("v(n) =", "v de n"), ("5 +", "5 plus"), ("3n", "3 n")], 44)
        choix = [self.morceaux([("6 +", "6"), ("3n", "3 n")], 44), self.morceaux([("8 +", "8"), ("3n", "3 n")], 44),
                 self.morceaux([("5 +", "5"), ("4n", "4 n")], 44)]
        q = self.poser_question("07-question",
                                [(self.t("Une suite v est définie par", 40), "Une suite"), (defn, None),
                                 (formule([("Que vaut", WHITE), ("v(n + 1) ?", RAISON)], 40), "Que vaut")],
                                choix, 1, en_ligne=True, largeur=3.6, fs=40)
        self.dire("07b-reponse")
        self.q_reponse(q, 1)
        y = q.cartes.get_bottom()[1] - 0.7
        l1 = formule([("v(n + 1) =", TERME), ("5 + 3 ×", WHITE), ("(n + 1)", RAISON)], 44).move_to(P(-0.4, y))
        self.au_mot("On remplace")
        self.play(FadeIn(l1.parts[0], shift=UP * 0.1), run_time=0.3)
        self.devoiler(l1, [None, None, "n plus 1"], deja=1)
        l2 = formule([("=", WHITE), ("5 +", WHITE), ("3n", WHITE), ("+ 3", RAISON), ("=", WHITE), ("8 + 3n", JUSTE)], 44)
        l2.move_to(P(-0.4, y - 0.85))
        self.devoiler(l2, [None, "5 plus", "3 n", "plus 3", None, "8 plus"])
        cad = self.encadre(l2.parts[5], JUSTE, 0.12)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 08 : le piège : uₙ n'est pas u × n ─────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("08-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(0, 3.12))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        f = formule([("u_{n}", TERME), ("≠", PIEGE), ("u × n", PIEGE)], 76).move_to(P(0, 2.05))
        self.au_mot("u indice n")
        self.play(FadeIn(f.parts[0], scale=1.2), run_time=0.3)
        self.au_mot("u fois n")
        self.play(FadeIn(f.parts[1]), FadeIn(f.parts[2], shift=LEFT * 0.2), run_time=0.35)
        cx = self.barrer(Square(0.5)).next_to(f, RIGHT, buff=0.35)  # à côté : « u × n » reste lisible
        self.play(Create(cx), run_time=0.3)
        cs = cases([f"u_{{{k}}}" for k in range(6)], self.XS6, -0.3, 1.4, 0.85, 44)
        pos = etiquettes(["1er", "2e", "3e", "4e", "5e", "6e"], cs, UP, 28, GREY_A, 0.12)
        l1 = self.t("L'indice est une place dans la liste,", 36).move_to(P(-1.3, 1.05))
        l2 = self.t("pas un facteur", 36, PIEGE).next_to(l1, RIGHT, buff=0.25)
        VGroup(l1, l2).move_to(P(0, 1.15))
        self.au_mot("L'indice")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("une place")
        self.play(LaggedStart(*[FadeIn(c, scale=0.85) for c in cs], lag_ratio=0.1), run_time=0.5)
        self.au_mot("pas un facteur")
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(f.parts[2], color=PIEGE), run_time=0.4)
        self.au_mot("u indice 5")
        self.play(self.contour(cs[5]), Indicate(cs[5][1], color=JUSTE, scale_factor=1.25), run_time=0.4)
        self.au_mot("5", n=2)
        r5 = self.t("rang 5", 30, RAISON).next_to(cs[5][0], DOWN, buff=0.14)
        self.play(FadeIn(r5, shift=UP * 0.1), run_time=0.3)
        self.au_mot("sixième")
        doigt = Dot(radius=0.09, color=RAISON).next_to(pos[0], UP, buff=0.1)
        self.play(FadeIn(pos[0]), FadeIn(doigt), run_time=0.12)
        for k in range(1, 6):
            self.play(FadeIn(pos[k], scale=1.3), doigt.animate.next_to(pos[k], UP, buff=0.1), run_time=0.12)
        self.play(pos[5].animate.set_color(JUSTE).scale(1.35), FadeOut(doigt), run_time=0.3)
        b = formule([("u_{5}", TERME), (":", WHITE), ("rang 5", RAISON), ("→", GREY_A), ("le 6e terme", JUSTE)], 44)
        b.move_to(P(-0.4, -1.85))
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.4)
        self.au_mot("commence à 0")
        c0 = formule([("quand la suite commence à", GREY_A), ("u_{0}", TERME)], 34).move_to(P(-0.4, -2.6))
        self.play(FadeIn(c0, shift=UP * 0.1), Indicate(cs[0][1], color=TERME, scale_factor=1.3), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi ───────────────────────────────────────────────────────

    XS7 = [-5.25 + 1.75 * k for k in range(7)]

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.t("À toi de jouer !", 48, JAUNE_TITRE).move_to(P(0, 3.12))
        self.au_mot("À toi")
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.35)
        l0 = formule([("Les termes de w sont numérotés à partir de", WHITE), ("w_{0}", TERME)], 36).move_to(P(0, 2.35))
        self.au_mot("Les termes")
        self.play(FadeIn(l0.parts[0], shift=UP * 0.1), run_time=0.35)
        cs = cases(["w_{0}", "w_{1}", "w_{2}", "…", "?", "…", "w_{40}"], self.XS7, 0.85, 1.3, 0.8, 42)
        pos = etiquettes(["1er", "2e", "3e", "", "25e", "", ""], cs, UP, 26, GREY_A, 0.1)
        self.au_mot("w indice 0")
        self.play(FadeIn(l0.parts[1], scale=1.3), run_time=0.25)
        self.montrer_cases(cs[:4], pos[:3], run_time=0.6)
        q1 = formule([("1)", RAISON), ("Quel est l'indice du", WHITE), ("25e terme ?", WHITE)], 38)
        q1.move_to(P(0, -0.35)).align_to(P(-5.9, 0), LEFT)
        self.au_mot("Quel est")
        self.play(FadeIn(VGroup(*q1.parts[:2]), shift=UP * 0.1), run_time=0.35)
        self.au_mot("25e")
        self.play(FadeIn(q1.parts[2], shift=UP * 0.1), FadeIn(cs[4], scale=1.3), FadeIn(pos[4], scale=1.3),
                  FadeIn(cs[5]), run_time=0.35)
        q2 = formule([("2)", RAISON), ("Combien de termes de", WHITE), ("w_{0}", TERME), ("à", WHITE),
                      ("w_{40}", TERME), (",", WHITE)], 38)
        q2.move_to(P(0, -1.15)).align_to(P(-5.9, 0), LEFT)
        q2b = self.t("les deux compris ?", 38).next_to(q2, DOWN, buff=0.18).align_to(q2.parts[1], LEFT)
        self.au_mot("combien")
        self.play(FadeIn(VGroup(*q2.parts[:2]), shift=UP * 0.1), run_time=0.35)
        self.suivre("w indice 0")
        self.play(FadeIn(q2.parts[2], scale=1.2), run_time=0.25)
        self.au_mot("w indice 40")
        self.play(FadeIn(VGroup(*q2.parts[3:5]), shift=UP * 0.1), FadeIn(cs[6], scale=1.3), run_time=0.3)
        self.au_mot("les deux compris")
        self.play(FadeIn(q2.parts[5]), FadeIn(q2b, shift=UP * 0.1), self.contour(cs[0], RAISON), self.contour(cs[6], RAISON),
                  run_time=0.35)
        self.defi_pause(-2.75, x=-0.6)
        self._defi = (tit, l0, cs, pos, q1, VGroup(q2, q2b))

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, l0, cs, pos, q1, q2 = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 48, JUSTE).move_to(tit)
        self.play(FadeOut(q1), FadeOut(q2), ReplacementTransform(tit, cor), run_time=0.4)
        self.au_mot("w indice 0")
        self.play(self.contour(cs[0], JUSTE), cs[6][0].animate.set_stroke(TERME, width=3),
                  pos[0].animate.set_color(WHITE).scale(1.2), run_time=0.35)
        self.au_mot("w indice 24")
        w24 = nom("w_{24}", 42, JUSTE).move_to(cs[4][1])
        self.play(ReplacementTransform(cs[4][1], w24), self.contour(cs[4], JUSTE),
                  pos[4].animate.set_color(WHITE).scale(1.2), run_time=0.4)
        r1 = formule([("le 25e terme", WHITE), ("→", GREY_A), ("w_{24}", JUSTE)], 44)
        r1.move_to(P(0, -0.45)).align_to(P(-5.9, 0), LEFT)
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.35)
        self.insister(r1.parts[2], 1.3)
        r2 = formule([("de w_{0} à w_{40} :", TERME), ("40 − 0 + 1", RAISON), ("=", WHITE), ("41 termes", JUSTE)], 44)
        r2.move_to(P(0, -1.45)).align_to(P(-5.9, 0), LEFT)
        self.au_mot("De w indice 0")
        self.play(FadeIn(r2.parts[0], shift=UP * 0.1), self.contour(cs[0], TERME), self.contour(cs[6], TERME),
                  run_time=0.35)
        self.devoiler(r2, [None, "40 moins", None, "41"], deja=1)
        cad = self.encadre(r2.parts[3], JUSTE, 0.12)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(r2.parts[3], cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        p1 = [formule([("u(n)", TERME), ("et", WHITE), ("u_{n}", TERME), (": le même terme,", WHITE)], fs),
              formule([("le terme de", WHITE), ("rang n.", RAISON)], fs)]
        p2 = [formule([("L'indice est un", WHITE), ("rang,", RAISON)], fs),
              formule([("pas une année ni un facteur.", PIEGE)], fs)]
        p3 = [self.t("Lis toujours où commence la suite :", fs),
              formule([("à", WHITE), ("u_{0}", TERME), (", ou à", WHITE), ("u_{1}", TERME), (".", WHITE)], fs)]
        self.finale([(p1, ["u de n et u indice n", "le terme de rang n"]), (p2, ["L'indice est un rang", "pas une année"]),
                     (p3, ["lis toujours", "à u indice 0"])])

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_deux_notations()
        self.ecran_rang()
        self.ecran_question1()
        self.ecran_position()
        self.ecran_n_plus_1()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin()
