# suite_arith_variation.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite arithmétique :
# son sens de variation » (16:9), ceinture VERTE. Série SUITES, épisode 06.
# Micro du coach : lin_suite_variation (notion lin_suite_terme_general) :
# lib/tutor-v4/questionBank/premiere/maths/suites-arithmetiques.bank.ts
# + suites-arithmetiques-renfort.ts (aVarRaison, aVarExpl, aVarRec, aVarSituation, aVarPiege).
#
# Ce que demande le coach → écran :
#   · ★1 sens avec la raison donnée (aVarRaison)         → 03-regle, 04-question ;
#   · ★1-2 sens d'une situation (aVarSituation)          → 01-situation, 02-signe, défi 3 ;
#   · ★1-2 sens d'une récurrence (aVarRec, r = 0 compris) → 02-signe, défi 2 ;
#   · ★2-3 sens d'une forme explicite (aVarExpl)          → 04-question, défi 1 ;
#   · ★3 piège : u₀ négatif, 0 < r < 1 (aVarPiege)        → 05-premier-terme, 06-piege, 07-question.
# Clé de voix → écran :
#   00-garde (escalier qui monte, palier, escalier qui descend ; la raison r) ·
#   01 Lucie, glaciologue : le glacier de 6 000 m recule de 25 m par an,
#   l'article « il va finir par se stabiliser » · 02 u₀ = 6 000, uₙ₊₁ = uₙ − 25,
#   r = −25, cases 6 000 ; 5 975 ; 5 950, l'escalier qui descend, l'article barré ·
#   03 la règle en 3 cartes (r positive, négative, nulle) · 04/04b question
#   (A : décroissante, vₙ = 40 − 0,5n) · 05 la nuit en montagne : −12, −10, −8,
#   le thermomètre et le nuage qui monte · 06 le piège 0,5 < 1 (barré), la droite
#   graduée : on compare r à 0 · 07/07b question (B : croissante, w₀ = −300,
#   r = 0,25) · 08/08b défi en 3 cartes (3n − 50 ; vₙ₊₁ = vₙ ; la citerne) ·
#   09 « Ce que tu as appris » · 10 fin.
# Code couleur (module commun) : bleu = termes, orange = raison et écarts,
# vert = juste et « croissante », violet = « décroissante », gris = « constante »,
# rouge = piège. ⛔ Pas de LaTeX : tout en Text.
# Voix : manim/voix/premiere-suite-arith-variation.json (débit −6),
# calée mot à mot par suite_arith_variation_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_arith_variation.py SuiteArithVariation1re -o eleveai-maths-premiere-suite-arith-variation --media_dir manim/scripts/premiere/media-suite-arith-variation
# Sortie : manim/sorties/premiere/maths/suites/06-arith-variation/

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from canvas_proportion import _NB, _txts  # noqa: E402

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
GLACIER = [6000 - 25 * k for k in range(3)]
assert GLACIER == [6000, 5975, 5950]
NUIT = [-12 + 2 * k for k in range(3)]
assert NUIT == [-12, -10, -8]
assert -0.5 < 0                                    # Q1 : vₙ = 40 − 0,5n, r = −0,5 → A (décroissante)
assert -300 + 0.25 == -299.75                      # Q2 : w₀ = −300, r = 0,25 → B (croissante)
assert (3 * 1 - 50) - (3 * 0 - 50) == 3            # défi 1 : r = 3 → croissante
assert 900 - 40 == 860                             # défi 3 : r = −40 → décroissante

MONTE, DESCEND, PLAT = JUSTE, "#C084FC", GREY_B
PEAU, CHEVEUX, PARKA = "#c68642", "#3b2414", "#0F766E"
GLACE, GLACE_BORD, ROCHE, NEIGE = "#BAE6FD", "#7DD3FC", "#64748B", "#F1F5F9"
EAU = "#38BDF8"


# ── l'audit : « 6 000 » à l'écran = « 6 000 » dans la voix ─────────────────

class AuditMilliers:
    """L'audit du module commun, mais un grand nombre écrit « 6 000 » dans la
    voix est bien trouvé (l'audit commun cherchait « 6000 ») — repris de l'ép. 02."""

    def _auditer(self, avant, t0):
        cle = getattr(self, "_cle_voix", None)
        voix = getattr(self, "_texte_voix", "") or ""
        marques = self._marques().get(cle, []) if cle else []
        for m in self.mobjects:
            for f in m.get_family():
                if type(f).__name__ == "CompteARebours":
                    for g in f.get_family():
                        g._pas_audit = True
        for m in self.mobjects:
            for t in _txts(m):
                if id(t) in avant or getattr(t, "_pas_audit", False) or getattr(t, "_audite", False):
                    continue
                if t.get_fill_opacity() < 0.05:
                    continue
                t._audite = True
                s = t.original_text.replace("−", "").replace(" ", " ")
                s = re.sub(r"(?<=\d) (?=\d{3}\b)", "", s)
                for nb in _NB.findall(s):
                    corps = re.escape(nb) if len(nb) < 4 or "," in nb else re.escape(nb[:-3]) + " ?" + nb[-3:]
                    occ = [x.start() for x in re.finditer(r"(?<![\d,])" + corps + r"(?![\d]|,\d)", voix)]
                    if not occ:
                        print(f"AUDIT-ABSENT {cle} « {nb} » ({t.original_text[:30]})", flush=True)
                        continue
                    tps = [max([mm[1] for mm in marques if mm[0] <= i] or [0.0]) + getattr(self, "_debut_voix", 0)
                           for i in occ]
                    if t0 < tps[0] - 0.06:
                        print(f"AUDIT-AVANCE {cle} « {nb} » ({t.original_text[:30]}) {tps[0] - t0:.2f} s", flush=True)
                    else:
                        dernier = max(x for x in tps if x <= t0 + 0.06)
                        if t0 - dernier > 0.4:
                            print(f"AUDIT-TARD {cle} « {nb} » ({t.original_text[:30]}) {t0 - dernier:.2f} s",
                                  flush=True)


# ── les dessins de l'épisode ───────────────────────────────────────────────

def escalier(sens, n=4, w=0.55, h=0.32, r=0.08):
    """Le dessin du sens : n points bleus (les termes) sur des marches ; les
    contremarches orange (la raison). sens = 1 monte, −1 descend, 0 palier.
    Renvoie VGroup(marches, pas, points), centré sur l'origine."""
    marches, pas, points = VGroup(), VGroup(), VGroup()
    for k in range(n):
        y = sens * k * h
        marches.add(Line(P(k * w, y), P((k + 1) * w, y), stroke_width=5, color=GREY_B))
        points.add(Dot(P(k * w + w / 2, y + 0.11), radius=r, color=TERME))
        if k < n - 1 and sens:
            pas.add(Line(P((k + 1) * w, y), P((k + 1) * w, y + sens * h), stroke_width=7, color=RAISON))
    g = VGroup(marches, pas, points)
    return g.move_to(ORIGIN)


def fleche_sens(sens, long=1.1, epais=8):
    """La grande flèche du sens : verte qui monte, violette qui descend, grise à plat."""
    coul = MONTE if sens > 0 else DESCEND if sens < 0 else PLAT
    d = P(long, 0.62 * long * sens)
    return Arrow(ORIGIN, d, buff=0, color=coul, stroke_width=epais, max_tip_length_to_length_ratio=0.3,
                 max_stroke_width_to_length_ratio=12).move_to(ORIGIN)


def lucie(s=1.0):
    """Lucie, glaciologue : bonnet, parka, un jalon de mesure rayé à la main."""
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    bonnet = Arc(radius=0.29, start_angle=0, angle=PI, fill_color=RAISON, fill_opacity=1,
                 stroke_width=0).move_to(P(0, 1.2))
    pompon = Circle(radius=0.08, fill_color=NEIGE, fill_opacity=1, stroke_width=0).move_to(P(0, 1.4))
    meches = VGroup(*[Circle(radius=0.07, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(dx, 0.93))
                      for dx in (-0.27, 0.27)])
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.3, fill_color=PARKA, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    zip_ = Line(P(0, 0.68), P(0, -0.42), stroke_color=NEIGE, stroke_width=3)
    jalon = VGroup(*[Line(P(0.72, -0.5 + 0.22 * k), P(0.72, -0.28 + 0.22 * k),
                          stroke_color=(RAISON if k % 2 else NEIGE), stroke_width=7) for k in range(8)])
    main = Circle(radius=0.08, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0.6, 0.15))
    return VGroup(corps, zip_, meches, tete, bonnet, pompon, jalon, main).scale(s)


def montagne(x0, x1, y0, h):
    """Une montagne grise et son chapeau de neige (base de x0 à x1, en y0)."""
    xm = (x0 + x1) / 2
    roche = Polygon(P(x0, y0), P(xm, y0 + h), P(x1, y0), fill_color=ROCHE, fill_opacity=1, stroke_width=0)
    k = 0.3
    neige = Polygon(P(xm - k * (xm - x0), y0 + h * (1 - k)), P(xm, y0 + h), P(xm + k * (x1 - xm), y0 + h * (1 - k)),
                    fill_color=NEIGE, fill_opacity=1, stroke_width=0)
    return VGroup(roche, neige)


def langue(x0, x1, y, e=0.42):
    """La langue du glacier : une bande de glace de x0 (la montagne) à x1 (le front)."""
    b = RoundedRectangle(width=max(x1 - x0, 0.3), height=e, corner_radius=e / 2.2, fill_color=GLACE, fill_opacity=1,
                         stroke_color=GLACE_BORD, stroke_width=2)
    return b.move_to(P((x0 + x1) / 2, y))


def thermometre(h=2.4):
    """Le tube (le liquide se pose à part) et son réservoir."""
    tube = RoundedRectangle(width=0.36, height=h, corner_radius=0.18, stroke_color=WHITE, stroke_width=3)
    bulbe = Circle(radius=0.3, stroke_color=WHITE, stroke_width=3, fill_color=TERME, fill_opacity=1)
    bulbe.next_to(tube, DOWN, buff=-0.12)
    return VGroup(tube, bulbe)


def citerne(l=1.1, h=1.3):
    """La citerne en coupe (l'eau se pose à part) et son robinet."""
    cuve = RoundedRectangle(width=l, height=h, corner_radius=0.12, stroke_color=GREY_B, stroke_width=4)
    robinet = VGroup(Line(cuve.get_corner(DR) + P(0, 0.15), cuve.get_corner(DR) + P(0.22, 0.15)),
                     Line(cuve.get_corner(DR) + P(0.22, 0.15), cuve.get_corner(DR) + P(0.22, 0.02)))
    robinet.set_stroke(GREY_B, 4)
    return VGroup(cuve, robinet)


def lune(r=0.32):
    a = Circle(radius=r, fill_color="#FDE68A", fill_opacity=1, stroke_width=0)
    b = Circle(radius=r, fill_color=BLACK, fill_opacity=1, stroke_width=0).shift(P(0.14, 0.08))
    return VGroup(a, b)


class SuiteArithVariation1re(AuditMilliers, PaysageSuites):
    fichier_marques = "suite_arith_variation_marques.json"
    nom_voix = "premiere-suite-arith-variation"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    def poser(self, mob, extrait=None, suivre=True, anim=None, run_time=0.35):
        """Un objet quand la voix dit l'extrait (suivre : prochaine occurrence)."""
        if extrait:
            (self.suivre if suivre else self.au_mot)(extrait)
        self.play(anim(mob) if anim else FadeIn(mob, shift=UP * 0.1), run_time=run_time)
        return mob

    def rejeter(self, mob):
        """Une phrase fausse : une croix rouge À CÔTÉ (à gauche), la phrase pâlit
        mais reste lisible (la croix ne cache plus rien)."""
        cx = self.barrer(Square(0.42)).next_to(mob, LEFT, buff=0.3)
        return [Create(cx), mob.animate.set_opacity(0.55)]

    def tracer_escalier(self, esc, run_time=0.5):
        marches, pas, points = esc
        self.play(Create(marches), run_time=run_time * 0.5)
        anims = [LaggedStart(*[GrowFromCenter(p) for p in points], lag_ratio=0.25)]
        if len(pas):
            anims.append(LaggedStart(*[Create(p) for p in pas], lag_ratio=0.3))
        self.play(*anims, run_time=run_time)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def ecran_garde(self):
        """Le titre, la question ligne à ligne ; l'escalier qui monte à « Monte »,
        celui qui descend à « descend », la raison r à « nombre »."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Suite arithmétique", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Suite")
        self.play(Write(tit), run_time=0.7)
        sous = self.t("son sens de variation", 42, TERME).move_to(P(0, 2.2))
        self.poser(sous, "son sens", False)
        l2 = self.t("Monte-t-elle, ou descend-elle ?", 40).move_to(P(0, 1.38))
        monte = escalier(1, 4, 0.55, 0.3).move_to(P(-4.0, -0.95))
        fm = fleche_sens(1, 0.9).next_to(monte, RIGHT, buff=0.15)
        descend = escalier(-1, 4, 0.55, 0.3).move_to(P(1.8, -0.95))
        fd = fleche_sens(-1, 0.9).next_to(descend, RIGHT, buff=0.15)
        self.au_mot("Monte")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.tracer_escalier(monte, 0.45)
        self.play(GrowArrow(fm), run_time=0.3)
        self.au_mot("descend")
        self.tracer_escalier(descend, 0.45)
        self.play(GrowArrow(fd), run_time=0.3)
        l3 = self.t("Un seul nombre suffit pour le dire.", 40).move_to(P(0, 0.72))
        self.poser(l3, "Un seul", False)
        self.au_mot("nombre")
        r = self.t("r", 60, RAISON).move_to(P(-0.6, -0.9))
        cad = self.encadre(r, RAISON, 0.2)
        self.play(FadeIn(r, scale=1.5), Create(cad), Indicate(monte[1], color=RAISON, scale_factor=1.2),
                  Indicate(descend[1], color=RAISON, scale_factor=1.2), run_time=0.5)
        ident = self.t(self.identite, 26, GREY_A, audit=False).move_to(P(0, 0.15))
        self.play(FadeIn(ident), run_time=0.3)
        self.attendre_voix(marge=0.9)

    # ── 01 : Lucie et son glacier ──────────────────────────────────────────

    Y_GL, X_GL, X_FRONT = 0.72, -2.2, 5.0

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = lucie(1.0).move_to(P(-5.3, 0.95))
        nom = self.t("Lucie", 40, JAUNE_TITRE).move_to(P(-5.3, -0.42))
        metier = self.t("glaciologue", 34, TERME).move_to(P(-5.3, -0.95))
        self.au_mot("Lucie")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("glaciologue")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)
        monts = VGroup(montagne(-3.7, -0.5, 0.5, 2.3), montagne(-1.9, 1.3, 0.5, 1.7))
        gl = langue(self.X_GL, self.X_FRONT, self.Y_GL)
        self.au_mot("glaciers")
        self.play(FadeIn(monts, shift=UP * 0.2), run_time=0.5)
        self.play(GrowFromEdge(gl, LEFT), run_time=0.7)
        cote = DoubleArrow(P(self.X_GL, 0.22), P(self.X_FRONT, 0.22), buff=0, color=TERME, stroke_width=3,
                           tip_length=0.16)
        lg_ = self.t("6 000 m", 38, WHITE).move_to(P(0.9, -0.2))
        an = self.t("en 2026", 32, GREY_A).next_to(lg_, RIGHT, buff=0.3)
        self.au_mot("6 000")
        self.play(GrowFromCenter(cote), FadeIn(lg_, scale=1.3), run_time=0.4)
        self.poser(an, "2026")
        self.au_mot("recule")
        recul = 0.55
        gl2 = langue(self.X_GL, self.X_FRONT - recul, self.Y_GL)
        fonte = Rectangle(width=recul, height=0.42, stroke_color=RAISON, stroke_width=3, fill_color=RAISON,
                          fill_opacity=0.25).move_to(P(self.X_FRONT - recul / 2, self.Y_GL))
        moins = self.t("− 25 m", 38, RAISON).move_to(P(self.X_FRONT - 0.2, 1.5))
        self.play(Transform(gl, gl2), FadeIn(fonte), run_time=0.5)
        self.poser(moins, "25", anim=lambda m: FadeIn(m, scale=1.3))
        chq = self.t("chaque année", 32, RAISON).move_to(P(self.X_FRONT - 0.2, 2.05))
        self.poser(chq, "chaque année")
        gl3 = langue(self.X_GL, self.X_FRONT - 2 * recul, self.Y_GL)
        fonte2 = fonte.copy().shift(LEFT * recul)
        self.play(Transform(gl, gl3), FadeIn(fonte2), run_time=0.5)
        carte = self.carte(7.6, 2.0, P(0.6, -2.15))
        tete = self.t("Un article affirme :", 30, GREY_A).move_to(P(0, -1.47)).align_to(
            carte.get_left() + RIGHT * 0.3, LEFT)
        self.au_mot("article")
        self.play(FadeIn(carte), FadeIn(tete), run_time=0.4)
        c1 = self.t("« Il est si long qu'il va finir", 36).move_to(P(0.6, -2.02))
        c2 = self.t("par se stabiliser. »", 36).move_to(P(0.6, -2.6))
        self.poser(c1, "il est si long", False)
        self.poser(c2, "par se", False)
        self.au_mot("Lucie doit")
        bulle = Circle(radius=0.36, stroke_color=RAISON, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1)
        bulle.move_to(P(-4.3, 2.35))
        pt = self.t("?", 44, RAISON).move_to(bulle)
        self.play(GrowFromCenter(bulle), FadeIn(pt, scale=1.5), run_time=0.35)
        self.play(Indicate(VGroup(c1, c2), color=RAISON, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 02 : la notation, la raison −25, le sens ───────────────────────────

    def ecran_signe(self):
        self.nouvel_ecran("02-signe")
        ligne = self.t("uₙ : la longueur du glacier en 2026 + n", 38, TERME, audit=False).move_to(P(0, 3.05))
        k = len("uₙ:lalongueurduglacier")              # les glyphes avant « en 2026 + n »
        self.au_mot("longueur")
        self.play(FadeIn(ligne[:k], shift=UP * 0.1), run_time=0.35)
        self.au_mot("2026")                              # le 2026 à sa voix (audit à la main)
        self.play(FadeIn(ligne[k:], shift=UP * 0.1), run_time=0.35)
        u0 = self.t("u₀ = 6 000", 42).move_to(P(-3.2, 2.15))
        self.poser(u0, "6 000", False)
        rec1 = self.t("uₙ₊₁ = uₙ", 42)
        rec2 = self.t("− 25", 42, RAISON)
        VGroup(rec1, rec2).arrange(RIGHT, buff=0.2).move_to(P(2.3, 2.15))
        self.poser(rec1, "plus 1 égale", False)
        self.poser(rec2, "25", False)
        rr = VGroup(self.t("r =", 46, RAISON), self.t("−25", 46, RAISON)).arrange(RIGHT, buff=0.32)
        rr.move_to(P(-0.4, 1.2))
        self.au_mot("La raison")
        self.play(FadeIn(rr[0]), run_time=0.25)
        self.suivre("25")
        cad = self.encadre(rr, RAISON, 0.16)
        self.play(FadeIn(rr[1], scale=1.4), Create(cad), run_time=0.35)
        self.insister(VGroup(rr, cad), 1.15)
        lg = LigneTermes([fr(v) for v in GLACIER], xs=(-4.6, -2.15, 0.3), centre=P(0, -0.1), largeur=1.95,
                         hauteur=0.85, fs=40)
        esc = escalier(-1, 3, 0.75, 0.42, 0.1).move_to(P(3.6, -0.1))
        self.play(Create(esc[0]), run_time=0.3)
        self.au_mot("retire")
        for k, v in enumerate(GLACIER):
            self.suivre(fr(v))
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), GrowFromCenter(esc[2][k])]
            if k:
                s = lg.saut(k - 1, "− 25", fs=34)
                s[1]._pas_audit = True                       # « − 25 » : déjà dit
                lg.sauts[k - 1] = s
                anims += [Create(s[0]), FadeIn(s[1], scale=1.3), Create(esc[1][k - 1])]
            self.play(*anims, run_time=0.35)
        fd = fleche_sens(-1, 1.0).move_to(P(5.65, -0.1))
        dec = self.t("décroissante", 40, DESCEND).move_to(P(3.7, -1.25))
        self.au_mot("décroissante")
        self.play(GrowArrow(fd), FadeIn(dec, scale=1.2), run_time=0.45)
        self.insister(dec, 1.15)
        q = self.t("« il va finir par se stabiliser »", 34, GREY_A).move_to(P(-1.6, -2.35))
        self.au_mot("ne se stabilise")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.3)
        self.play(*self.rejeter(q), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 03 : la règle : le signe de r ──────────────────────────────────────

    def ecran_regle(self):
        self.nouvel_ecran("03-regle")
        self.titre("La règle", JAUNE_TITRE, 48, extrait="La règle")
        xs = (-4.25, 0.0, 4.25)
        cartes = [self.carte(3.9, 3.9, P(x, 0.4)) for x in xs]
        tetes = [self.t("r positive", 40, RAISON), self.t("r négative", 40, RAISON), self.t("r = 0", 40, RAISON)]
        mots = [self.t("croissante", 38, MONTE), self.t("décroissante", 38, DESCEND), self.t("constante", 38, PLAT)]
        dessins = []
        for k, (x, s) in enumerate(zip(xs, (1, -1, 0))):
            tetes[k].move_to(P(x, 1.85))
            mots[k].move_to(P(x, -1.05))
            esc = escalier(s, 4, 0.5, 0.3).move_to(P(x - 0.45, 0.4))
            fl = fleche_sens(s, 0.8).move_to(P(x + 1.25, 0.4 + 0.35 * s))
            dessins.append((esc, fl))
        reperes = (("positive", "croissante"), ("négative", "décroissante"), ("0", "constante"))
        for k, (a, b) in enumerate(reperes):
            self.suivre(a)
            self.play(FadeIn(cartes[k], scale=0.95), FadeIn(tetes[k], shift=DOWN * 0.1), run_time=0.35)
            self.suivre(b)
            esc, fl = dessins[k]
            self.tracer_escalier(esc, 0.4)
            self.play(GrowArrow(fl), FadeIn(mots[k], scale=1.2), run_time=0.35)
        s1, s2, s3 = self.t("Seul le", 42), self.t("SIGNE", 46, RAISON), self.t("de la raison compte.", 42)
        VGroup(s1, s2, s3).arrange(RIGHT, buff=0.2).move_to(P(-0.4, -2.6))
        s2.align_to(s1, DOWN)
        self.au_mot("Seul")
        self.play(FadeIn(s1, shift=UP * 0.1), run_time=0.25)
        self.au_mot("SIGNE")
        self.play(FadeIn(s2, scale=1.4), run_time=0.3)
        self.au_mot("de la raison")
        self.play(FadeIn(s3, shift=UP * 0.1), *[Indicate(t, color=RAISON, scale_factor=1.15) for t in tetes],
                  run_time=0.5)
        self.insister(s2, 1.25)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : vₙ = 40 − 0,5n → A (décroissante) ───────

    def ecran_question1(self):
        l1 = self.t("Une suite est définie par :", 38).move_to(P(0, 2.25))
        f1, f2 = self.t("vₙ = 40", 50), self.t("− 0,5n", 50)
        f = VGroup(f1, f2).arrange(RIGHT, buff=0.4).move_to(P(-1.3, 1.45))
        f2.align_to(f1, DOWN)

        def formule():
            self.poser(l1, "Une suite")
            self.poser(f1, "40")
            self.poser(f2, "0,5")

        q = self.poser_question("04-question", [(self.t("Elle est :", 38), "Elle est")],
                                ["décroissante", "croissante", "constante"], 0, y_question=0.85, dessin=formule)
        self.dire("04b-reponse")
        self.q_reponse(q, 0)
        self.au_mot("devant n")
        cad = self.encadre(f2, RAISON, 0.12)
        self.play(Create(cad), f2.animate.set_color(RAISON), run_time=0.35)
        rr = VGroup(self.t("r =", 46, RAISON), self.t("−0,5", 46, RAISON)).arrange(RIGHT, buff=0.32)
        rr.move_to(P(3.7, 1.45))
        self.play(FadeIn(rr[0]), run_time=0.2)
        self.suivre("0,5")
        self.play(FadeIn(rr[1], scale=1.4), run_time=0.3)
        self.insister(rr, 1.15)
        n1 = self.t("négative,", 38, DESCEND)
        n2 = self.t("même si elle est petite", 34, GREY_A)
        VGroup(n1, n2).arrange(RIGHT, buff=0.25).move_to(q.question)
        self.au_mot("négative")
        self.play(FadeOut(q.question), FadeIn(n1, scale=1.2), run_time=0.3)
        self.poser(n2, "même si", False)
        self.attendre_voix(marge=0.6)

    # ── 05 : le premier terme ne décide rien : la nuit en montagne ─────────

    XS_NUIT = (0.6, 2.6, 4.6)

    def y_nuit(self, T):
        return 0.25 + 0.17 * T

    def ecran_premier_terme(self):
        self.nouvel_ecran("05-premier-terme")
        t1, t2 = self.t("Le premier terme", 44, JAUNE_TITRE), self.t("ne décide rien", 44, PIEGE)
        VGroup(t1, t2).arrange(RIGHT, buff=0.25).move_to(P(0, 3.15))
        self.poser(t1, "premier", False)
        self.poser(t2, "ne décide", False)
        mont = montagne(-6.5, -3.4, -1.75, 2.0)
        etoiles = VGroup(*[Dot(P(x, y), radius=0.03, color=WHITE) for x, y in
                           ((-6.2, 1.6), (-4.6, 2.5), (-3.6, 1.4), (-5.3, 1.1), (-3.2, 2.6))])
        moon = lune().move_to(P(-5.7, 2.25))
        th = thermometre(2.6).move_to(P(-2.6, 0.0))
        tube = th[0]
        bas = tube.get_bottom()[1] + 0.1

        def liquide(T):
            h = max(0.05, (T + 16) / 16 * (tube.height - 0.2))
            return Rectangle(width=0.2, height=h, fill_color=TERME, fill_opacity=1, stroke_width=0).move_to(
                P(tube.get_center()[0], bas + h / 2))

        self.au_mot("Une nuit")
        self.play(FadeIn(mont, shift=UP * 0.2), FadeIn(moon), FadeIn(etoiles), run_time=0.5)
        self.au_mot("montagne")
        self.play(FadeIn(th), run_time=0.3)
        liq = liquide(-12)
        lab = self.t("−12 °C", 36).move_to(P(-1.45, liq.get_top()[1]))
        self.au_mot("12 degrés")
        self.play(GrowFromEdge(liq, DOWN), FadeIn(lab, shift=LEFT * 0.1), run_time=0.4)
        plus = self.t("+ 2 °C par heure", 36, RAISON).move_to(P(-4.6, -2.3))
        self.au_mot("2 degrés par")
        self.play(FadeIn(plus, shift=UP * 0.1), run_time=0.3)
        lg = LigneTermes([fr(v) for v in NUIT], xs=self.XS_NUIT, centre=P(0, 1.95), largeur=1.6, hauteur=0.8, fs=40)
        zero = DashedLine(P(-0.1, 0.25), P(5.3, 0.25), color=GREY_B, stroke_width=2, dash_length=0.12)
        self.play(Create(zero), run_time=0.3)
        pts = []
        self.au_mot("heure")
        for k, v in enumerate(NUIT):
            self.suivre(fr(abs(v)))
            d = Dot(P(self.XS_NUIT[k], self.y_nuit(v)), radius=0.1, color=TERME)
            lien = DashedLine(lg.cases[k][0].get_bottom() + DOWN * 0.55, d.get_center(), color=GREY_B, stroke_width=1.5,
                              dash_length=0.08)
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), Create(lien),
                     GrowFromCenter(d)]
            if k:
                l2 = liquide(v)
                anims += [Transform(liq, l2), lab.animate.set_y(l2.get_top()[1])]
                s = lg.saut(k - 1, "+ 2", fs=34, creux=0.22)
                s[1]._pas_audit = True                       # « + 2 » : déjà dit
                anims += [Create(s[0]), FadeIn(s[1], scale=1.3)]
            self.play(*anims, run_time=0.35)
            if k:
                self.remove(lab)
                lab = self.t(f"{fr(v)} °C", 36).move_to(lab)
                self.add(lab)
            pts.append(d)
        fm = Arrow(P(0.15, -2.1), P(5.15, -0.75), buff=0, color=MONTE, stroke_width=8,
                   max_tip_length_to_length_ratio=0.08)
        cr = self.t("croissante", 42, MONTE).move_to(P(2.5, -2.3))
        self.au_mot("croissante")
        self.play(GrowArrow(fm), FadeIn(cr, scale=1.2), run_time=0.45)
        neg = self.t("même si ses premiers termes sont négatifs", 36, WHITE).move_to(P(-0.6, -3.15))
        self.au_mot("même si")
        self.play(FadeIn(neg, shift=UP * 0.1), run_time=0.3)
        self.au_mot("négatifs")
        self.play(*[Indicate(c[1], color=PIEGE, scale_factor=1.2) for c in lg.cases], run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège : comparer à 1 ───────────────────────────────────────

    def x_droite(self, v):
        return -1.3 + 2.6 * v

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        a = self.t("r = 0,5", 40, RAISON)
        fl = Arrow(P(0, 0.3), P(0.7, -0.3), buff=0, color=PIEGE, stroke_width=8,
                   max_tip_length_to_length_ratio=0.3)
        desc = self.t("elle descend ?", 36, PIEGE)
        self.poser(a, "0,5", anim=lambda m: FadeIn(m, scale=1.3))
        self.au_mot("descendre")
        self.play(GrowArrow(fl), FadeIn(desc, shift=RIGHT * 0.1), run_time=0.35)
        c1 = self.t("car 0,5 < 1", 38, PIEGE)
        VGroup(a, fl, desc, c1).arrange(RIGHT, buff=0.6).move_to(P(0, 2.15))
        c1._pas_audit = True                                 # 0,5 déjà dit ; le 1 posé à sa voix
        self.poser(c1, "1")
        rang1 = VGroup(a, fl, desc, c1)
        self.au_mot("Comparer")
        self.play(*self.rejeter(rang1), run_time=0.4)
        g1, g2 = self.t("Comparer à 1 :", 36, GREY_A), self.t("c'est pour les suites géométriques", 36, GREY_A)
        VGroup(g1, g2).arrange(RIGHT, buff=0.2).move_to(P(0, 1.15))
        self.poser(g1, "1, c'est", False)
        self.poser(g2, "géométriques", False)
        h1, h2 = self.t("Suite arithmétique :", 40, JAUNE_TITRE), self.t("on compare r à 0", 40, JUSTE)
        VGroup(h1, h2).arrange(RIGHT, buff=0.25).move_to(P(0, 0.15))
        self.poser(h1, "arithmétique", False)
        xs = [self.x_droite(v) for v in (-1, 0, 1, 2)]
        droite = Arrow(P(-4.4, -1.05), P(4.4, -1.05), buff=0, color=GREY_B, stroke_width=3, tip_length=0.18)
        ticks = VGroup(*[Line(P(x, -1.15), P(x, -0.95), color=GREY_B, stroke_width=3) for x in xs])
        self.au_mot("on compare")
        self.play(Create(droite), FadeIn(ticks), run_time=0.4)
        n0 = self.t("0", 36, JUSTE).move_to(P(xs[1], -1.5))
        n1 = self.t("1", 36, GREY_A, audit=False).move_to(P(xs[2], -1.5))   # le 1 : déjà dit
        self.au_mot("0 : r")
        self.play(FadeIn(h2, shift=UP * 0.1), FadeIn(n0, scale=1.4), FadeIn(n1),
                  Indicate(ticks[1], color=JUSTE, scale_factor=1.6), run_time=0.4)
        pt = Dot(P(self.x_droite(0.5), -1.05), radius=0.12, color=RAISON)
        lab = self.t("0,5", 36, RAISON).move_to(P(self.x_droite(0.5), -0.6))
        self.suivre("0,5")
        self.play(GrowFromCenter(pt), FadeIn(lab, scale=1.3), run_time=0.35)
        seg = Line(P(xs[1], -1.05), P(self.x_droite(0.5), -1.05), color=JUSTE, stroke_width=9)
        pos = self.t("positive", 38, JUSTE).move_to(P(self.x_droite(0.25), -1.55)).shift(RIGHT * 0.15)
        pos.next_to(lab, RIGHT, buff=0.3)
        self.au_mot("positive")
        self.play(Create(seg), FadeIn(pos, shift=UP * 0.1), run_time=0.35)
        self.bring_to_front(pt)
        esc = escalier(1, 4, 0.45, 0.25).move_to(P(-1.5, -2.6))
        fm = fleche_sens(1, 0.75).next_to(esc, RIGHT, buff=0.2)
        cr = self.t("croissante", 42, MONTE).next_to(fm, RIGHT, buff=0.3)
        self.au_mot("croissante")
        self.tracer_escalier(esc, 0.35)
        self.play(GrowArrow(fm), FadeIn(cr, scale=1.2), run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 : w₀ = −300, r = 0,25 → B (croissante) ────

    def ecran_question2(self):
        lignes = [(self.t("Une suite arithmétique a pour premier terme", 36), "Une suite"),
                  (self.t("w₀ = −300", 40), "300"),
                  (self.t("et pour raison r = 0,25.", 40), "0,25"),
                  (self.t("Quelle affirmation est juste ?", 36), "Quelle")]
        choix = ["décroissante, car w₀ est négatif", "croissante, car r est positive", "décroissante, car r < 1"]
        q = self.poser_question("07-question", lignes, choix, 1, largeur=8.6)
        self.dire("07b-reponse")
        ok = self.q_reponse(q, 1)
        y = q.cartes[1].get_center()[1]
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), run_time=0.25)
        self.play(VGroup(q.cartes[1], ok).animate.move_to(q.cartes[0].get_center()), run_time=0.3)
        lg = LigneTermes(["−300", "−299,75"], xs=(-2.0, 1.0), centre=P(0, y), largeur=2.3, hauteur=0.8, fs=40)
        self.au_mot("étape")
        self.suivre("300")
        self.montrer_case(lg, 0)
        self.suivre("299,75")
        s = lg.saut(0, "+ 0,25", fs=34, creux=0.2)
        s[1]._pas_audit = True                               # « + 0,25 » : déjà dit
        self.play(FadeIn(lg.cases[1][0], scale=0.8), FadeIn(lg.cases[1][1], scale=1.4), Create(s[0]),
                  FadeIn(s[1], scale=1.3), run_time=0.4)
        fm = fleche_sens(1, 0.9).move_to(P(2.75, y))
        em = self.t("elle monte", 38, MONTE).next_to(fm, RIGHT, buff=0.25)
        self.au_mot("monte")
        self.play(GrowArrow(fm), FadeIn(em, scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : trois suites ────────────────────────────────────────

    XS_DEFI = (-4.35, 0.0, 4.35)

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        m1, m2, m3 = self.t("croissante,", 38, MONTE), self.t("décroissante", 38, DESCEND), self.t("ou constante ?", 38)
        VGroup(m1, m2, m3).arrange(RIGHT, buff=0.22).move_to(P(0, 2.4))
        self.poser(m1, "croissante", False)
        self.poser(m2, "décroissante")
        self.poser(m3, "constante")
        x1, x2, x3 = self.XS_DEFI
        cartes = [self.carte(4.15, 4.0, P(x, 0.0)) for x in self.XS_DEFI]
        nums = [self.t(str(k + 1), 42, JAUNE_TITRE, audit=False).move_to(P(x, 1.5)) for k, x in enumerate(self.XS_DEFI)]
        # 1 : uₙ = 3n − 50
        self.au_mot("Un :")
        self.play(FadeIn(cartes[0], scale=0.95), FadeIn(nums[0]), run_time=0.3)
        a1, a2 = self.t("uₙ = 3n", 38), self.t("− 50", 38)
        VGroup(a1, a2).arrange(RIGHT, buff=0.18).move_to(P(x1, 0.75))
        self.poser(a1, "3")
        self.poser(a2, "50")
        # 2 : v₀ = 8, vₙ₊₁ = vₙ
        self.au_mot("Deux")
        self.play(FadeIn(cartes[1], scale=0.95), FadeIn(nums[1]), run_time=0.3)
        b1 = self.t("v₀ = 8", 42).move_to(P(x2, 0.85))
        self.poser(b1, "8")
        b2 = self.t("vₙ₊₁ = vₙ", 42).move_to(P(x2, 0.2))
        self.poser(b2, "plus 1 égale")
        # 3 : la citerne
        self.au_mot("Trois")
        self.play(FadeIn(cartes[2], scale=0.95), FadeIn(nums[2]), run_time=0.3)
        ci = citerne(1.0, 1.15).move_to(P(x3 - 0.95, 0.72))
        cuve = ci[0]

        def eau(v):
            h = (cuve.height - 0.12) * v / 1000
            return Rectangle(width=cuve.width - 0.12, height=h, fill_color=EAU, fill_opacity=0.85,
                             stroke_width=0).move_to(P(cuve.get_center()[0], cuve.get_bottom()[1] + 0.06 + h / 2))

        self.au_mot("citerne")
        self.play(Create(ci), run_time=0.4)
        e = eau(900)
        c1 = self.t("900 L", 36).move_to(P(x3 + 0.9, 1.1))
        self.au_mot("900")
        self.play(GrowFromEdge(e, DOWN), FadeIn(c1, scale=1.2), run_time=0.4)
        self.bring_to_front(ci)
        c2 = self.t("− 40 L", 36, RAISON).move_to(P(x3 + 0.9, 0.65))
        self.poser(c2, "40")
        c3 = self.t("par jour", 30, GREY_A).move_to(P(x3 + 0.9, 0.25))
        self.poser(c3, "par jour", False)
        self.defi_pause(-2.55, x=-0.6)
        self._defi = (tit, cartes, ci, e, eau, VGroup(m1, m2, m3))

    def verdict(self, x, sens, mot, y=-1.15):
        fl = fleche_sens(sens, 0.55, 7)
        coul = MONTE if sens > 0 else DESCEND if sens < 0 else PLAT
        m = self.t(mot, 34, coul)
        return VGroup(fl, m).arrange(RIGHT, buff=0.3).move_to(P(x, y))

    def deux_lignes(self, a, b, x, fs=34):
        """La raison d'une carte, sur deux lignes lisibles (sous le dessin)."""
        return VGroup(self.t(a, fs, RAISON), self.t(b, fs, RAISON)).arrange(DOWN, buff=0.08).move_to(P(x, -0.05))

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, cartes, ci, e, eau, sous = self._defi
        x1, x2, x3 = self.XS_DEFI
        cor = self.t("Correction", 48, JUSTE).move_to(tit)
        self.au_mot("Correction")
        # la question s'efface : les cartes grandissent vers le haut (place pour la correction)
        haut = 0.55
        contenu = [m for m in self.mobjects if m not in (self._margo, tit, sous, *cartes)]
        grandes = [self.carte(c.width, c.height + haut, c.get_center() + UP * haut / 2) for c in cartes]
        self.play(ReplacementTransform(tit, cor), FadeOut(sous),
                  *[Transform(c, g) for c, g in zip(cartes, grandes)],
                  *[m.animate.shift(UP * haut) for m in contenu], run_time=0.5)
        r1 = self.deux_lignes("r = 3,", "positive", x1)
        self.au_mot("Un :")
        self.poser(r1, "3")
        v1 = self.verdict(x1, 1, "croissante", -0.82)
        self.au_mot("croissante")
        self.play(GrowArrow(v1[0]), FadeIn(v1[1], scale=1.2), run_time=0.35)
        s1 = self.t("même si u₀ = −50", 30, WHITE).move_to(P(x1, -1.5))
        self.poser(s1, "50")
        r2 = self.deux_lignes("+ 0", "à chaque étape", x2)
        self.au_mot("Deux")
        self.poser(r2, "0")
        v2 = self.verdict(x2, 0, "constante", -0.82)
        self.au_mot("constante")
        self.play(GrowArrow(v2[0]), FadeIn(v2[1], scale=1.2), run_time=0.35)
        self.au_mot("Trois")
        self.play(Transform(e, eau(700)), run_time=0.6)
        r3 = self.deux_lignes("r = −40,", "négative", x3)
        self.poser(r3, "40")
        v3 = self.verdict(x3, -1, "décroissante", -0.82)
        self.au_mot("décroissante")
        self.play(GrowArrow(v3[0]), FadeIn(v3[1], scale=1.2), run_time=0.35)
        self.play(*[Indicate(v[1], scale_factor=1.15) for v in (v1, v2, v3)], run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 36
        p1 = [self.t("Le sens de variation se lit", fs),
              VGroup(self.t("sur le", fs), self.t("signe de la raison r", fs, RAISON)).arrange(RIGHT, buff=0.18)]
        p2 = [VGroup(self.t(a, fs), self.t(b, fs, c)).arrange(RIGHT, buff=0.2)
              for a, b, c in (("r positive :", "croissante", MONTE), ("r négative :", "décroissante", DESCEND),
                              ("r nulle :", "constante", PLAT))]
        p3 = [self.t("Le premier terme ne compte pas.", fs)]
        p4 = [VGroup(self.t("On compare r à", fs), self.t("0,", fs, JUSTE)).arrange(RIGHT, buff=0.15),
              self.t("pas à 1.", fs, PIEGE)]
        self.finale([(p1, ["Le sens", "se lit"]), (p2, ["positive", "négative", "nulle"]),
                     (p3, ["Le premier"]), (p4, ["0, pas", "1."])], cle="09-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_signe()
        self.ecran_regle()
        self.ecran_question1()
        self.ecran_premier_terme()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("10-abonne")
