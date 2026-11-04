# puissance_dix.py
# EleveAI — Maths 4e ET 3e (épisode COMMUN) — série « Puissances », épisode 03 :
# LES PUISSANCES DE 10 : COMPTER LES ZÉROS. Paysage 16:9, AVEC VOIX, CEINTURE
# JAUNE pour les deux classes. Short jumeau : puissance_dix_short.py.
# ⭐ Une voix, un script, DEUX rendus : PuissanceDix4e et PuissanceDix3e ne
# changent que l'identité (la voix ne cite aucune classe).
# Micros couvertes : 4e `puissance_dix`, 3e `entier_puissance_dix`.
# Code couleur constant : BLEU = la base (10), ORANGE = l'exposant ET les zéros
# qu'il compte, VERT = résultat juste, ROUGE = le piège (compter les chiffres,
# 10 × n).
#
# Décor et métiers : SCIENCES (une astronome au télescope, la galaxie),
# NUMÉRIQUE (un ingénieur réseau et son serveur ; une technicienne et un disque
# dur d'un téraoctet). Centres : sciences, numerique.
#
# Micro → écrans : situation (01) ; la table 10¹ … 10⁶ (02) ; 10¹¹ (03) ;
# QUESTION 1 (03q) ; écrire un grand nombre en puissance de 10 (04) ; le piège
# chiffres / zéros (05) ; QUESTION 2 (05q) ; défi (06) et correction (06b) ;
# ce que tu as appris (07) ; fin (08).
#
# Voix : manim/voix/4e-puissance-dix.json (validée, débit −6), WAV dans
# public/sons/4e-puissance-dix/ ; marques : puissance_dix_marques.json
# (marques_dump.ps1, puis conversion PAR PAIRES : les cues doublées « 10
# puissance » gardent chacune leur instant ; 06b recalé à la main).
# Outils : manim/scripts/6e/prop_commun.py (non modifié).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_dix.py PuissanceDix4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_dix.py PuissanceDix4e -o eleveai-maths-4e-puissance-dix --media_dir manim/scripts/4e/media-puiss-03-4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_dix.py PuissanceDix3e -o eleveai-maths-3e-puissance-dix --media_dir manim/scripts/4e/media-puiss-03-3e
# Sorties : manim/sorties/4e/maths/puissances/03-dix/eleveai-maths-4e-puissance-dix.mp4
#           manim/sorties/3e/maths/puissances/03-dix/eleveai-maths-3e-puissance-dix.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
import random  # noqa: E402

BASE_C = BLEU_CALCUL       # la base 10
EXPO_C = ORANGE_RETENUE    # l'exposant, et les zéros qu'il compte
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"


def T(s, fs=40, c=WHITE, audit=True):
    """Un texte posé AU MOT par le script ; audit=False : une donnée de figure
    (un compteur 1, 2, 3… de zéros) ou un rappel déjà dit."""
    t = Text(s, font_size=fs, color=c)
    t.sans_synchro = True
    if not audit:
        t._pas_audit = True
    return t


def puiss(b, e, fs=60, cb=BASE_C, ce=EXPO_C, audit=True):
    """Une puissance COMPOSÉE : la base, l'exposant plus petit en haut (.base .expo)."""
    base = T(str(b), fs, cb, audit)
    expo = T(str(e), fs * 0.6, ce, audit)
    expo.next_to(base, UR, buff=0.03).shift(DOWN * fs * 0.006)
    g = VGroup(base, expo)
    g.base, g.expo = base, expo
    return g


def nombre(n_zeros, fs=60, audit=False, c_un=WHITE, c_zero=EXPO_C):
    """« 1 000 000 » : le 1, puis les zéros groupés par 3 (orange) ; .un, .zeros
    (chaque zéro, de gauche à droite)."""
    un = T("1", fs, c_un, audit)
    zeros = VGroup(*[T("0", fs, c_zero, audit) for _ in range(n_zeros)])
    g = VGroup(un, *zeros)
    esp = fs * 0.0045
    x = 0.0
    un.move_to(ORIGIN)
    prec = un
    for k, z in enumerate(zeros):
        reste = n_zeros - k  # zéros encore à écrire (celui-ci compris)
        gap = 0.04 + (esp if reste % 3 == 0 else 0)
        z.next_to(prec, RIGHT, buff=gap).align_to(un, DOWN)
        prec = z
    g.un, g.zeros = un, zeros
    return g


def compteurs(nb, fs=26, dy=0.38):
    """Les petits numéros 1, 2, 3… sous chaque zéro (orange, données de figure)."""
    return VGroup(*[T(str(k + 1), fs if k < 9 else fs * 0.72, EXPO_C, audit=False).next_to(z, DOWN, buff=dy * 0.3)
                    for k, z in enumerate(nb.zeros)])


# ── les dessins ────────────────────────────────────────────────────────────

def etoiles(n=60, x=(-6.4, 6.4), y=(0.3, 3.4), graine=3):
    r = random.Random(graine)
    return VGroup(*[Dot(P(r.uniform(*x), r.uniform(*y)), radius=r.choice((0.018, 0.025, 0.035)),
                        color=r.choice((WHITE, "#fde68a", CIEL))) for _ in range(n)])


def galaxie(r=1.1, n=170, graine=5):
    """Une galaxie spirale : deux bras de points, un bulbe jaune."""
    rd = random.Random(graine)
    pts = VGroup()
    for k in range(n):
        bras = k % 2
        t = rd.uniform(0.15, 1.0)
        a = t * 2.6 * PI + bras * PI
        rr = t * r
        pts.add(Dot(P(rr * np.cos(a) + rd.gauss(0, 0.05), 0.55 * (rr * np.sin(a) + rd.gauss(0, 0.05))),
                    radius=rd.choice((0.012, 0.018, 0.024)), color=rd.choice((WHITE, CIEL, "#c4b5fd"))))
    bulbe = Ellipse(width=0.45, height=0.28, fill_color="#fde68a", fill_opacity=0.9, stroke_width=0)
    return VGroup(pts, bulbe).rotate(0.25)


def astronome(s=1.0):
    p = personne(peau="#8d5524", tenue="#1e3a8a", cheveux="#111827", longs=True, s=s)
    return p


def telescope(s=1.0):
    """Un télescope sur trépied, pointé vers le ciel (haut-droite)."""
    tube = RoundedRectangle(width=2.0, height=0.36, corner_radius=0.08, fill_color="#e2e8f0", fill_opacity=1,
                            stroke_color="#475569", stroke_width=3)
    bague = Rectangle(width=0.16, height=0.42, fill_color="#f59e0b", fill_opacity=1, stroke_width=0).move_to(
        tube.get_center() + RIGHT * 0.35)
    ocul = Rectangle(width=0.22, height=0.2, fill_color="#334155", fill_opacity=1, stroke_width=0).next_to(
        tube, LEFT, buff=0)
    tete = VGroup(tube, bague, ocul).rotate(0.6)
    pieds = VGroup(*[Line(P(0, 0), P(dx, -1.3), color="#94a3b8", stroke_width=5) for dx in (-0.55, 0.0, 0.55)])
    tete.move_to(P(0.15, 0.25))
    return VGroup(pieds, tete).scale(s)


def baie(h=3.6, w=1.25, n=8):
    """Une baie de serveur : le cadre, n tiroirs, un voyant par tiroir (.leds)."""
    cadre = RoundedRectangle(width=w, height=h, corner_radius=0.08, fill_color="#111827", fill_opacity=1,
                             stroke_color="#64748b", stroke_width=3)
    tiroirs, leds = VGroup(), VGroup()
    pas = (h - 0.3) / n
    for k in range(n):
        y = h / 2 - 0.15 - pas * (k + 0.5)
        tiroirs.add(Rectangle(width=w - 0.22, height=pas * 0.72, fill_color="#1f2937", fill_opacity=1,
                              stroke_color="#334155", stroke_width=1.5).move_to(P(0, y)))
        leds.add(Dot(P(w / 2 - 0.28, y), radius=0.045, color=VERT_OK if k % 3 else "#38bdf8"))
    g = VGroup(cadre, tiroirs, leds)
    g.leds = leds
    return g


def disque_dur(s=1.0):
    """Un disque dur ouvert : le boîtier, le plateau, la tête de lecture."""
    boite = RoundedRectangle(width=2.0, height=2.6, corner_radius=0.15, fill_color="#334155", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    plateau = Circle(radius=0.8, fill_color="#cbd5e1", fill_opacity=1, stroke_color="#e2e8f0", stroke_width=2
                     ).move_to(P(0, 0.35))
    sillons = VGroup(*[Circle(radius=r, stroke_color="#94a3b8", stroke_width=1).move_to(plateau) for r in (0.35, 0.55, 0.7)])
    axe = Dot(plateau.get_center(), radius=0.08, color="#475569")
    bras = Line(P(0.75, -0.95), P(0.1, 0.55), color="#f59e0b", stroke_width=7)
    pivot = Dot(P(0.75, -0.95), radius=0.11, color="#f59e0b")
    g = VGroup(boite, plateau, sillons, axe, bras, pivot).scale(s)
    g.plateau = VGroup(plateau, sillons)
    return g


def technicienne(s=1.0):
    return personne(peau="#e0ac69", tenue="#0f766e", cheveux="#78350f", longs=True, s=s)


def ingenieur(s=1.0):
    p = personne(peau="#c68642", tenue="#7c3aed", cheveux="#1f2937", longs=False, s=s)
    p.add(lunettes(p))
    return p


class PuissanceDixBase(PaysageProp):
    nom_voix = "4e-puissance-dix"
    fichier_marques = "puissance_dix_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"

    def au(self, extrait, *anims, n=1, rt=0.35):
        """Au mot `extrait` (n-ième fois), joue les animations."""
        self.au_mot(extrait, n)
        if anims:
            self.play(*anims, run_time=rt)

    def compter(self, nb, extrait=None, n=1, rt=None, dy=0.38, fs=26):
        """Les zéros comptés UN PAR UN : chaque zéro s'allume, son numéro sort dessous."""
        if extrait:
            self.au_mot(extrait, n)
        num = compteurs(nb, fs, dy)
        k = len(num)
        rt = rt or min(2.4, 0.22 * k + 0.2)
        self.play(LaggedStart(*[AnimationGroup(FadeIn(u, shift=UP * 0.12, scale=1.4),
                                               Indicate(z, color=EXPO_C, scale_factor=1.35))
                                for u, z in zip(num, nb.zeros)], lag_ratio=0.85), run_time=rt)
        return num

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les puissances de 10", self.identite, self.ceinture, y_ech=-2.55)
        ciel = VGroup(*[e for e in etoiles(80, x=(-6.3, 6.3), y=(-1.6, 1.9))
                        if not (abs(e.get_x()) < 3.6 and -0.75 < e.get_y() < 1.25)])
        for m in (titre, ident):
            m.sans_synchro = True
        self.au_mot("Les puissances")
        self.play(FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech),
                  LaggedStart(*[FadeIn(e, scale=2) for e in ciel], lag_ratio=0.02), run_time=0.9)
        self.au("10. Combien", Write(titre), rt=0.6)
        q = T("Combien de zéros", 46, EXPO_C).move_to(P(0, 0.75))
        self.au("Combien", FadeIn(q, shift=UP * 0.2), rt=0.4)
        cent = T("dans 100 milliards ?", 46, WHITE).move_to(P(0, -0.2))
        self.au("100 milliards", FadeIn(cent, shift=UP * 0.2), rt=0.4)
        self.insister(q, 1.15, 0.25)
        self.play(LaggedStart(*[Indicate(e, color="#fde68a", scale_factor=2.2) for e in ciel[::4]],
                              lag_ratio=0.1), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : l'astronome compte les étoiles ─────────────────────────────────
    def ecran_astronome(self):
        self.ecran("01-astronome")
        ciel = etoiles(45, x=(-6.3, 6.3), y=(1.6, 3.4))
        p = astronome(0.72).move_to(P(-5.3, -2.0))
        tel = telescope(0.85).move_to(P(-3.75, -1.95))
        met = T("astronome", 30, CIEL).next_to(p, UP, buff=0.18)
        self.add(ciel)
        self.au("Une astronome", FadeIn(p, shift=UP * 0.3), FadeIn(tel, shift=UP * 0.3), FadeIn(met), rt=0.5)
        self.au("compte", LaggedStart(*[Indicate(e, color="#fde68a", scale_factor=2.5) for e in ciel[::3]],
                                      lag_ratio=0.08), rt=1.0)
        gal = galaxie(1.25).move_to(P(-2.6, 0.75))
        nomg = T("notre galaxie", 28, "#c4b5fd").next_to(gal, LEFT, buff=0.15)
        self.au("Notre galaxie", FadeIn(gal, scale=0.4), FadeIn(nomg), rt=0.7)
        self.play(Rotate(gal, 0.4), run_time=0.8)
        txt = T("100 milliards d'étoiles", 38, WHITE).move_to(P(2.9, 1.1))
        self.au("100 milliards", FadeIn(txt, shift=LEFT * 0.2), rt=0.4)
        nb = nombre(11, 62).move_to(P(2.95, -0.2))
        self.au("1 suivi", FadeIn(nb.un, scale=1.4), rt=0.25)
        self.play(LaggedStart(*[FadeIn(z, shift=LEFT * 0.15) for z in nb.zeros], lag_ratio=0.25), run_time=0.6)
        onze = T("11 zéros", 38, EXPO_C).move_to(P(2.95, -1.55))
        self.au("11 zéros", FadeIn(onze, scale=1.3), rt=0.35)
        num = self.compter(nb, "Écrire tous", rt=2.3)
        faux = T("on se trompe vite !", 30, PIEGE).move_to(P(2.95, -2.2))
        self.au("on se trompe", FadeIn(faux, shift=UP * 0.15), Wiggle(nb.zeros, scale_value=1.1), rt=0.6)
        p10 = puiss(10, "?", fs=76).move_to(P(3.2, -2.55))
        self.au("Une puissance", FadeOut(faux), rt=0.3)
        self.au("10 l'écrit", FadeIn(p10.base, scale=1.3), rt=0.3)
        self.au("l'écrit", FadeIn(p10.expo, scale=1.6), rt=0.3)
        deux = T("deux caractères", 30, WHITE).next_to(p10, LEFT, buff=0.4)
        self.au("deux caractères", FadeIn(deux, shift=RIGHT * 0.2), rt=0.35)
        self.insister(p10, 1.25, 0.25)
        self.attendre_voix()

    # ── 02 : la table qui monte : 10¹, 10², 10³ … 10⁶ ──────────────────────
    def ligne_table(self, n, y, fs=50, audit=True, pale=False):
        p = puiss(10, n, fs=fs, audit=audit)
        eg = T("=", fs * 0.9, WHITE, audit)
        nb = nombre(n, fs * 0.92)
        p.move_to(P(0, y)).align_to(P(-6.2, 0), LEFT)
        eg.move_to(P(-4.55, y))
        nb.move_to(P(0, y)).align_to(P(-4.15, 0), LEFT)
        nb.align_to(p.base, DOWN)
        g = VGroup(p, eg, nb)
        if pale:
            g.set_opacity(0.45)
        g.p, g.eg, g.nb = p, eg, nb
        return g

    def ecran_table(self):
        self.ecran("02-table")
        tit = T("La table qui monte", 40, JAUNE_TITRE).move_to(P(-3.6, 3.1))
        ys = {n: -2.6 + (n - 1) * 0.9 for n in range(1, 7)}
        rangs = {}
        # 10¹ = 10, 10² = 100, 10³ = 1 000 : une ligne à son mot, la table monte
        for n, (mot_e, mot_r) in zip((1, 2, 3), (("1 :", "10. 10"), ("2 :", "100."), ("3 :", "1 000."))):
            lg = self.ligne_table(n, ys[n])
            rangs[n] = lg
            self.au("10 puissance", FadeIn(lg.p.base, shift=UP * 0.2), *([Write(tit)] if n == 1 else []), n=n, rt=0.3)
            self.au(mot_e, FadeIn(lg.p.expo, scale=1.6), rt=0.3)
            if n == 2:
                fois = T("10 × 10", 32, GREY_B).move_to(P(-1.2, ys[2]))
                self.au("10 fois", FadeIn(fois, shift=LEFT * 0.15), rt=0.3)
            self.au(mot_r, FadeIn(lg.eg), FadeIn(lg.nb, shift=UP * 0.2), rt=0.35)
        # 10⁴ et 10⁵ (pâles : la table se lit), puis 10⁶ à son mot
        r4 = self.ligne_table(4, ys[4], audit=False, pale=True)
        r5 = self.ligne_table(5, ys[5], audit=False, pale=True)
        lg = self.ligne_table(6, ys[6])
        rangs[6] = lg
        self.au("10 puissance", FadeIn(r4, shift=UP * 0.2), n=4, rt=0.3)
        self.play(FadeIn(r5, shift=UP * 0.2), FadeIn(lg.p.base, shift=UP * 0.2), run_time=0.3)
        self.au("6 :", FadeIn(lg.p.expo, scale=1.6), rt=0.3)
        mil = T("un million", 30, GREY_B).next_to(lg.nb, RIGHT, buff=0.35)
        self.au("un million", FadeIn(lg.eg), FadeIn(lg.nb, shift=UP * 0.2), FadeIn(mil), rt=0.4)
        # l'exposant compte les zéros
        regle1 = T("L'exposant compte les zéros", 34, EXPO_C)
        self.col(regle1, 1.0, xl=1.0)
        self.au("L'exposant", FadeIn(regle1, shift=LEFT * 0.2),
                *[Indicate(r.p.expo, color=EXPO_C, scale_factor=1.6) for r in rangs.values()], rt=0.6)
        self.au("compte les", LaggedStart(*[Indicate(r.nb.zeros, color=EXPO_C, scale_factor=1.2)
                                            for r in rangs.values()], lag_ratio=0.25), rt=0.7)
        p = puiss(10, "n", fs=96)
        eg = T("=", 64)
        r1 = T("1 suivi de", 36, WHITE)
        rn = T("n zéros", 36, EXPO_C)
        VGroup(p, eg).arrange(RIGHT, buff=0.25)
        VGroup(r1, rn).arrange(RIGHT, buff=0.2).next_to(p, DOWN, buff=0.3, aligned_edge=LEFT)
        regle = VGroup(p, eg, r1, rn)
        self.col(regle, -0.75, xl=1.4)
        self.au("10 puissance", FadeIn(p.base, scale=1.3), n=5, rt=0.3)
        self.au("n, c'est", FadeIn(p.expo, scale=1.6), rt=0.3)
        self.au("1 suivi", FadeIn(eg), FadeIn(r1, shift=RIGHT * 0.2), rt=0.3)
        self.au("n zéros", FadeIn(rn, scale=1.3), rt=0.3)
        cad = self.encadrer(regle)
        self.play(Create(cad), run_time=0.4)
        self.insister(p.expo, 1.6, 0.25, about=p.expo.get_center())
        self.attendre_voix()

    # ── 03 : la galaxie : 10¹¹ ──────────────────────────────────────────────
    def ecran_galaxie(self):
        self.ecran("03-galaxie")
        ciel = etoiles(40, x=(-6.3, 6.3), y=(2.0, 3.4), graine=8)
        gal = galaxie(1.6).move_to(P(-3.9, 0.6))
        self.add(ciel)
        self.au("Les étoiles", FadeIn(gal, scale=0.5), rt=0.6)
        self.play(Rotate(gal, 0.5), run_time=0.8)
        nb = nombre(11, 60).move_to(P(2.6, 0.9))
        self.au("1 suivi", FadeIn(nb.un, scale=1.4), rt=0.25)
        self.play(LaggedStart(*[FadeIn(z, shift=LEFT * 0.15) for z in nb.zeros], lag_ratio=0.25), run_time=0.5)
        acc = Brace(nb.zeros, DOWN, buff=0.12, color=EXPO_C)
        onze = T("11 zéros", 40, EXPO_C).next_to(acc, DOWN, buff=0.12)
        self.au("11 zéros", GrowFromCenter(acc), FadeIn(onze, scale=1.3), rt=0.4)
        p = puiss(10, 11, fs=120).move_to(P(1.9, -1.75))
        self.au("10 puissance", FadeIn(p.base, scale=1.3), rt=0.35)
        self.au("11 étoiles", ReplacementTransform(onze.copy(), p.expo), rt=0.5)
        et = T("étoiles", 44, WHITE).next_to(p, RIGHT, buff=0.35).align_to(p.base, DOWN)
        self.au("étoiles.", FadeIn(et, shift=LEFT * 0.2), Indicate(gal, color="#fde68a", scale_factor=1.05), rt=0.4)
        self.insister(p.expo, 1.5, 0.25, about=p.expo.get_center())
        self.attendre_voix()

    # ── outils des questions (recopiés du modèle de l'épisode 01) ──────────
    def _disposer_q(self, question, choix, phrase):
        r = super()._disposer_q(question, choix, phrase)
        self.q_q = r[1]
        return r

    def poser_mots(self, t, plan, rt=0.3, avec=None):
        s = t.original_text
        debuts = [a if isinstance(a, int) else s.find(a) for a, _ in plan]
        assert debuts[0] == 0 and all(d >= 0 for d in debuts), (s, plan)
        bornes = debuts + [len(s)]
        k, pieces = 0, []
        for a, b in zip(bornes[:-1], bornes[1:]):
            n = sum(1 for c in s[a:b] if not c.isspace())
            pieces.append(VGroup(*t.submobjects[k:k + n]))
            k += n
        for j, ((_, ex), pc) in enumerate(zip(plan, pieces)):
            ex, n = (ex, 1) if isinstance(ex, str) else ex
            self.au_mot(ex, n)
            self.play(FadeIn(pc, shift=UP * 0.12), *((avec or {}).get(j, [])), run_time=rt)

    @staticmethod
    def sans_audit(m):
        """Un choix déjà dit à la question : l'audit ne le revoit pas à la réponse."""
        for f in m.get_family():
            f._pas_audit = True
        return m

    @staticmethod
    def choix_synchro(choix):
        for c in choix:
            for f in c.get_family():
                f.sans_synchro = False
        return choix

    def question_au_mot(self, plans, avec=None):
        def f(sc):
            for i, (lg, plan) in enumerate(zip(sc.q_q, plans)):
                sc.poser_mots(lg, plan, rt=0.25, avec=(avec or {}).get(i))
            sc.q_q.submobjects = []
        return f

    # ── 03q : QUESTION 1 (10⁴ ?) ────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        p = puiss(10, 4, fs=110)
        eg = VGroup(T("=", 80), T("?", 80, EXPO_C))
        fig = VGroup(p, *eg).arrange(RIGHT, buff=0.3).move_to(P(-3.4, 1.6))
        nb = nombre(4, 84).move_to(P(-3.4, -0.2))
        faux = VGroup(T("10 × 4 = 40", 54, PIEGE))
        faux.move_to(P(-3.4, -2.0))
        barre = Line(faux.get_left() + LEFT * 0.1, faux.get_right() + RIGHT * 0.1, color=WHITE, stroke_width=6)

        def apres(sc):
            sc.rep(0, avec=[FadeOut(eg[1]), FadeIn(nb, scale=1.2)])
            sc.rep(1, avec=[Indicate(nb.un, color=WHITE, scale_factor=1.3)])
            sc.compter(nb, dy=0.5, fs=30, rt=0.5)
            sc.rep(2, avec=[FadeIn(faux, shift=UP * 0.15)])
            sc.rep(3, avec=[Create(barre)])
            sc.rep_fin()

        self.question_pause("03q-question", "03r-reponse",
                            ["Combien vaut 10 puissance 4 ?"],
                            [self.t("40", 36), self.t("10 000", 36), self.t("1 000", 36)], 1,
                            ["Réponse B : 10 000,", "un 1 suivi de 4 zéros.", "40, c'est 10 × 4 :", "le piège."],
                            avant_q=self.question_au_mot(
                                [[("", "Combien"), ("10", "10 puissance"), ("4", "4 ?")]],
                                avec={0: {1: [FadeIn(p.base, scale=1.3)],
                                          2: [FadeIn(p.expo, scale=1.5), FadeIn(eg[0]), FadeIn(eg[1])]}}),
                            autres_r=apres)

    # ── 04 : dans l'autre sens : le serveur, 1 000 000 = 10⁶, puis 10⁹ ─────
    def ecran_ecrire(self):
        self.ecran("04-ecrire")
        tit = T("Dans l'autre sens", 42, JAUNE_TITRE).move_to(P(-3.3, 3.1))
        self.au("Dans", Write(tit), rt=0.5)
        p = ingenieur(0.66).move_to(P(-5.75, -2.0))
        met = VGroup(T("ingénieur", 26, CIEL), T("réseau", 26, CIEL)).arrange(DOWN, buff=0.06).next_to(p, UP, buff=0.15)
        b1 = baie().move_to(P(-3.65, -0.75))
        b2 = baie().move_to(P(-2.25, -0.75))
        self.au("ingénieur", FadeIn(p, shift=UP * 0.3), FadeIn(met[0]), rt=0.4)
        self.au("réseau", FadeIn(met[1]), rt=0.25)
        self.au("serveur", FadeIn(b1, shift=UP * 0.2), FadeIn(b2, shift=UP * 0.2), rt=0.45)
        dem = VGroup(T("un million de demandes", 28, WHITE), T("par seconde", 28, WHITE)).arrange(DOWN, buff=0.08)
        dem.move_to(P(-2.95, 1.75))
        fl = VGroup(*[Arrow(P(-0.1, 1.2 - 0.55 * k), P(-1.5, 0.6 - 0.45 * k), buff=0, color=CIEL, stroke_width=4,
                            max_tip_length_to_length_ratio=0.2) for k in range(4)])
        self.au("un million de", FadeIn(dem[0], shift=DOWN * 0.15), LaggedStart(*[GrowArrow(f) for f in fl],
                                                                              lag_ratio=0.2), rt=0.6)
        self.au("par seconde", FadeIn(dem[1], shift=DOWN * 0.15),
                LaggedStart(*[Flash(l, color=VERT_OK, line_length=0.12, num_lines=6) for l in b1.leds[::2]],
                            lag_ratio=0.1), rt=0.8)
        l1 = T("Un million =", 40, WHITE)
        self.col(l1, 2.6)
        self.au("Un million :", FadeIn(l1, shift=RIGHT * 0.2), rt=0.3)
        nb = nombre(6, 56)
        self.col(nb, 1.7, xl=1.0)
        self.au("1 000 000", FadeIn(nb, shift=UP * 0.2), rt=0.4)
        num = self.compter(nb, "Je compte", rt=1.2)
        six = T("6 zéros", 34, EXPO_C).next_to(nb, RIGHT, buff=0.5)
        self.au("6. Un million", FadeIn(six, scale=1.3), rt=0.3)
        e6 = VGroup(T("=", 60), puiss(10, 6, fs=84)).arrange(RIGHT, buff=0.3)
        self.col(e6, 0.05, xl=1.3)
        self.au("égale", FadeIn(e6[0]), rt=0.25)
        self.au("10 puissance", FadeIn(e6[1].base, scale=1.3), rt=0.3)
        self.au("6. Un milliard", ReplacementTransform(six.copy(), e6[1].expo), rt=0.45)
        self.insister(e6[1].expo, 1.5, 0.2, about=e6[1].expo.get_center())
        l2 = VGroup(T("Un milliard :", 40, WHITE), T("9 zéros", 40, EXPO_C)).arrange(RIGHT, buff=0.25)
        self.col(l2, -1.35)
        self.au("Un milliard", FadeIn(l2[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("9 zéros", FadeIn(l2[1], scale=1.3), rt=0.3)
        e9 = VGroup(T("=", 60), puiss(10, 9, fs=84)).arrange(RIGHT, buff=0.3)
        self.col(e9, -2.5, xl=1.3)
        self.au("10 puissance", FadeIn(e9[0]), FadeIn(e9[1].base, scale=1.3), n=2, rt=0.3)
        self.au("9.", ReplacementTransform(l2[1].copy(), e9[1].expo), rt=0.45)
        self.insister(e9[1].expo, 1.5, 0.2, about=e9[1].expo.get_center())
        self.attendre_voix()

    def mots(self, morceaux, y, fs=40, xl=None, buff=0.2):
        """Une ligne de morceaux (texte, couleur) posée dans la colonne, rien d'affiché."""
        lg = VGroup(*[T(m, fs, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        self.col(lg, y, xl)
        return lg

    # ── 05 : le piège : compter les chiffres au lieu des zéros ─────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = T("Le piège !", 50, PIEGE).move_to(P(-0.4, 3.12))
        sous = T("compter les chiffres au lieu des zéros", 34, WHITE).move_to(P(-0.4, 2.4))
        self.au("Le piège", Write(tit), rt=0.5)
        self.au("compter", FadeIn(sous, shift=UP * 0.15), rt=0.4)
        nb = nombre(3, 150).move_to(P(-2.9, -0.35))
        self.au("1 000", FadeIn(nb, scale=1.2), rt=0.4)
        acc_h = Brace(nb, UP, buff=0.15, color=PIEGE)
        quatre = T("quatre chiffres", 36, PIEGE).next_to(acc_h, UP, buff=0.1)
        self.au("quatre", GrowFromCenter(acc_h), FadeIn(quatre, shift=DOWN * 0.15),
                Indicate(nb, color=PIEGE, scale_factor=1.06), rt=0.45)
        acc_b = Brace(nb.zeros, DOWN, buff=0.15, color=VERT_OK)
        trois = T("trois zéros", 36, VERT_OK).next_to(acc_b, DOWN, buff=0.1)
        barre = Line(quatre.get_left() + LEFT * 0.1, quatre.get_right() + RIGHT * 0.1, color=PIEGE, stroke_width=7)
        self.au("mais", Create(barre), VGroup(quatre, acc_h).animate.set_opacity(0.55), rt=0.35)
        self.au("trois zéros", GrowFromCenter(acc_b), FadeIn(trois, shift=UP * 0.15),
                Indicate(nb.zeros, color=VERT_OK, scale_factor=1.15), rt=0.45)
        ok = VGroup(T("=", 64, VERT_OK), puiss(10, 3, fs=96)).arrange(RIGHT, buff=0.3)
        self.col(ok, 0.75, xl=1.6)
        self.au("C'est 10", FadeIn(ok[0]), rt=0.2)
        self.au("10 puissance", FadeIn(ok[1].base, scale=1.3), rt=0.3)
        self.au("3, pas", FadeIn(ok[1].expo, scale=1.6), rt=0.3)
        cad = self.encadrer(ok)
        self.play(Create(cad), run_time=0.3)
        ko = VGroup(T("pas", 44, PIEGE), puiss(10, 4, fs=80, cb=PIEGE, ce=PIEGE)).arrange(RIGHT, buff=0.3)
        self.col(ko, -1.25, xl=1.6)
        self.au("pas 10", FadeIn(ko[0], shift=RIGHT * 0.2), rt=0.25)
        self.au("10 puissance", FadeIn(ko[1].base, scale=1.3), n=2, rt=0.3)
        self.au("4.", FadeIn(ko[1].expo, scale=1.5), rt=0.3)
        croix_ = Line(ko[1].get_corner(DL) + P(-0.1, -0.05), ko[1].get_corner(UR) + P(0.1, 0.05), color=WHITE,
                      stroke_width=7)
        self.play(Create(croix_), run_time=0.3)
        self.play(ok[1].expo.animate.scale(1.6), ko[1].expo.animate.scale(0.8), run_time=0.3)
        self.play(ok[1].expo.animate.scale(1 / 1.6), ko[1].expo.animate.scale(1 / 0.8), run_time=0.3)
        self.attendre_voix()

    # ── 05q : QUESTION 2 (100 000 ?) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        nb = nombre(5, 96).move_to(P(-3.4, 1.4))
        p5 = VGroup(T("=", 70, VERT_OK), puiss(10, 5, fs=96)).arrange(RIGHT, buff=0.3).move_to(P(-3.4, -1.75))
        acc = Brace(nb, DOWN, buff=0.55, color=PIEGE)
        six = T("6 chiffres", 36, PIEGE).next_to(acc, DOWN, buff=0.08)
        six_g = VGroup(acc, six)

        def apres(sc):
            ph = sc.ph_q
            sc.poser_mots(ph[0], [("", "B :"), ("10", "10 puissance"), ("5", "5. 100")],
                          avec={1: [FadeIn(p5[0]), FadeIn(p5[1].base, scale=1.2)], 2: [FadeIn(p5[1].expo, scale=1.5)]})
            sc.poser_mots(ph[1], [("", "un 1"), ("et cinq", "et cinq")],
                          avec={0: [Indicate(nb.un, color=WHITE, scale_factor=1.3)]})
            sc.compter(nb, dy=0.5, fs=30, rt=0.5)
            sc.poser_mots(ph[2], [("", "6, c'est"), ("chiffres", "chiffres"), ("le piège", "le piège")],
                          avec={0: [FadeIn(six_g, shift=UP * 0.1)]})
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse",
                            ["100 000 en puissance de 10 ?"],
                            self.choix_synchro([puiss(10, 6, 40), puiss(10, 5, 40), self.sans_audit(T("10 × 5", 34))]), 1,
                            ["B : 10 puissance 5.", "un 1 et cinq zéros ;",
                             "6 chiffres : le piège."],
                            avant_q=self.question_au_mot(
                                [[("", "100 000"), ("en puissance", "puissance de")]],
                                avec={0: {1: [FadeIn(nb, scale=1.2)]}}),
                            autres_r=apres)

    # ── 06 : défi : la technicienne et le disque dur d'un téraoctet ────────
    def ecran_defi(self):
        self.ecran("06-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("À toi", Write(tit), rt=0.6)
        p = technicienne(0.7).move_to(P(-5.3, -2.0))
        met = T("technicienne", 28, CIEL).next_to(p, UP, buff=0.18)
        dd = disque_dur(1.0).move_to(P(-3.0, -0.35))
        self.au("technicienne", FadeIn(p, shift=UP * 0.3), FadeIn(met), rt=0.45)
        l1 = self.mots([("Un disque dur", WHITE), ("d'un téraoctet :", BASE_C)], 2.1, 38)
        self.au("disque dur", FadeIn(dd, shift=UP * 0.2), FadeIn(l1[0], shift=RIGHT * 0.2), rt=0.4)
        self.au("d'un téraoctet", FadeIn(l1[1], shift=RIGHT * 0.2), Rotate(dd.plateau, PI), rt=0.5)
        l2 = self.mots([("mille milliards", EXPO_C), ("d'octets.", WHITE)], 1.3, 40)
        self.au("mille milliards", FadeIn(l2[0], scale=1.2), Rotate(dd.plateau, PI), rt=0.5)
        self.au("d'octets", FadeIn(l2[1], shift=RIGHT * 0.2), rt=0.3)
        self.insister(l2[0], 1.15, 0.2)
        l3 = self.mots([("Écris ce nombre avec", WHITE)], 0.2, 38)
        self.au("Écris", FadeIn(l3, shift=RIGHT * 0.2), rt=0.3)
        l4 = self.mots([("une puissance de", BASE_C), ("10.", BASE_C)], -0.55, 38)
        self.au("une puissance", FadeIn(l4[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("10. Mets", FadeIn(l4[1], scale=1.3), rt=0.3)
        self.pause_defi(y=-1.9)

    # ── 06b : correction : 3 zéros + 9 zéros = 12 zéros → 10¹² ─────────────
    def ecran_correction(self):
        self.ecran("06b-correction", 0.5)
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.play(Write(tit), run_time=0.5)
        dd = disque_dur(0.95).move_to(P(-5.0, 0.2))
        self.play(FadeIn(dd), run_time=0.3)
        l1 = self.mots([("Mille :", WHITE), ("3 zéros", EXPO_C)], 2.25, 40, xl=-3.1)
        self.au("Mille :", FadeIn(l1[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("3 zéros", FadeIn(l1[1], scale=1.3), rt=0.3)
        l2 = self.mots([("Un milliard :", WHITE), ("9 zéros", EXPO_C)], 1.5, 40, xl=-3.1)
        self.au("Un milliard", FadeIn(l2[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("9 zéros", FadeIn(l2[1], scale=1.3), rt=0.3)
        l3 = self.mots([("Mille milliards :", WHITE), ("3 +", EXPO_C), ("9", EXPO_C), ("= 12 zéros", EXPO_C)],
                       0.75, 40, xl=-3.1)
        self.au("Mille milliards", FadeIn(l3[0], shift=RIGHT * 0.2), Rotate(dd.plateau, PI), rt=0.4)
        self.au("3 plus", FadeIn(l3[1], shift=RIGHT * 0.2), Indicate(l1[1], color=EXPO_C), rt=0.3)
        self.au("9, 12", FadeIn(l3[2], shift=RIGHT * 0.2), Indicate(l2[1], color=EXPO_C), rt=0.3)
        self.au("12 zéros", FadeIn(l3[3], scale=1.3), rt=0.35)
        nb = nombre(12, 52)
        self.col(nb, -0.35, xl=-3.1)
        self.au("1 000 000 000 000", FadeIn(nb.un), LaggedStart(*[FadeIn(z, shift=LEFT * 0.12) for z in nb.zeros],
                                                                lag_ratio=0.2), rt=0.6)
        e = VGroup(T("=", 64), puiss(10, 12, fs=100), T("octets", 44)).arrange(RIGHT, buff=0.4)
        e[2].align_to(e[1].base, DOWN)
        self.col(e, -2.0, xl=-3.1)
        self.au("égale", FadeIn(e[0]), rt=0.25)
        self.au("10 puissance", FadeIn(e[1].base, scale=1.3), rt=0.3)
        self.au("12 octets", ReplacementTransform(l3[3].copy(), e[1].expo), rt=0.4)
        self.au("octets", FadeIn(e[2], shift=LEFT * 0.2), rt=0.3)
        cad = self.encadrer(e, buff=0.22)
        self.play(Create(cad), run_time=0.3)
        self.insister(e[1].expo, 1.6, 0.3, about=e[1].expo.get_center())
        self.attendre_voix()

    # ── 07 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        p = puiss(10, "n", fs=140).move_to(P(-4.6, 1.0))
        dev = VGroup(T("1", 54, WHITE, audit=False), T("0 0 … 0", 54, EXPO_C, audit=False)).arrange(RIGHT, buff=0.35).move_to(P(-4.6, -0.5))
        acc = Brace(dev[1], DOWN, buff=0.12, color=EXPO_C)
        nz = T("n zéros", 34, EXPO_C).next_to(acc, DOWN, buff=0.1)

        def pt(morceaux, fs=34):
            bloc = VGroup(*[VGroup(*[T(m, fs, c) for m, c in lg]).arrange(RIGHT, buff=0.15) for lg in morceaux])
            bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            return VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25)

        l1 = pt([[("10ⁿ, c'est 1 suivi", WHITE)], [("de n zéros.", EXPO_C)]])
        l2 = pt([[("Pour écrire un grand nombre,", WHITE)], [("je compte les zéros,", VERT_OK)],
                 [("pas les chiffres.", PIEGE)]])
        lignes = VGroup(l1, l2).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        lignes.move_to(P(0, 0.7)).align_to(P(-2.3, 0), LEFT)
        b1, b2 = l1[1], l2[1]
        self.au("10 puissance", FadeIn(p, scale=0.8), Create(l1[0]), FadeIn(b1[0], shift=RIGHT * 0.2), rt=0.45)
        self.au("1 suivi", FadeIn(dev, shift=UP * 0.15), rt=0.35)
        self.au("n zéros", FadeIn(b1[1], shift=RIGHT * 0.2), GrowFromCenter(acc), FadeIn(nz), rt=0.4)
        self.au("Pour écrire", Create(l2[0]), FadeIn(b2[0], shift=RIGHT * 0.2), rt=0.4)
        self.au("je compte", FadeIn(b2[1], shift=RIGHT * 0.2), Indicate(dev[1], color=EXPO_C), rt=0.4)
        self.au("pas les chiffres", FadeIn(b2[2], shift=RIGHT * 0.2), rt=0.35)
        ep = VGroup(T("Épisode 4 :", 36, JAUNE_TITRE), puiss(10, 0, fs=48, cb=WHITE, ce=EXPO_C),
                    T("et les exposants négatifs", 36, WHITE))
        VGroup(ep[0], ep[1]).arrange(RIGHT, buff=0.25)
        ep[1].align_to(ep[0], DOWN)
        ep[2].next_to(ep[0], DOWN, buff=0.15, aligned_edge=LEFT)
        ep.move_to(P(0, -2.45)).align_to(P(-2.3, 0), LEFT)
        self.au("4 t'attend", FadeIn(ep[0], shift=UP * 0.15), rt=0.35)
        self.au("10 puissance", FadeIn(ep[1].base, shift=UP * 0.15), n=2, rt=0.3)
        self.au("0, et", FadeIn(ep[1].expo, scale=1.5), rt=0.3)
        self.au("et les exposants", FadeIn(ep[2], shift=UP * 0.15), rt=0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_astronome()
        self.ecran_table()
        self.ecran_galaxie()
        self.ecran_question1()
        self.ecran_ecrire()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class PuissanceDix4e(PuissanceDixBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"


class PuissanceDix3e(PuissanceDixBase):
    identite = "Maths 3e — EleveAI"
    ceinture = "jaune"
