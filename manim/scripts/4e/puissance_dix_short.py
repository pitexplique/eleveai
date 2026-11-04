# puissance_dix_short.py
# EleveAI — Maths 4e — série PUISSANCES, épisode 03 « dix », le SHORT
# ceinture BLANCHE « Un milliard de vues » : l'exposant compte les zéros.
#   · EN HAUT, l'image : une vidéo (vignette, bouton lecture) et son compteur
#     de vues (icône lecture + « vues ») qui s'emballe 10 → 100 → 1 000 → … →
#     1 000 000 000 ; les zéros du compteur sont ORANGE ;
#   · EN BAS, au même instant : 10¹, 10², 10³ … 10⁹ (base BLEUE, exposant
#     ORANGE = le nombre de zéros du compteur) ;
#   · 1 question-pause (3 s) : un million de vues → 10⁶ / 10⁷ / 10 × 6 ;
#   · fin : 10¹⁰⁰, combien de zéros, quel nom célèbre ? (réponse en
#     commentaire : 100 zéros, le gogol), puis la fin standard.
# Micro du coach : puissance_dix (10ⁿ = 1 suivi de n zéros).
# Centres d'intérêt : reseaux-sociaux.
#
# Voix : manim/voix/4e-puissance-dix-short.json (validée), débit −6 ; WAV :
# public/sons/4e-puissance-dix-short/ ; marques :
# manim/scripts/4e/puissance_dix_short_marques.json (conversion PAR PAIRES :
# « 10 vues », « 10 puissance » doublées gardent chacune leur instant).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_dix_short.py PuissanceDixShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_dix_short.py PuissanceDixShort -o eleveai-maths-4e-puissance-dix-short --media_dir manim/scripts/4e/media-puiss-03-short
# Sortie : manim/sorties/4e/maths/puissances/03-dix/eleveai-maths-4e-puissance-dix-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))

from prop_commun import *  # noqa: E402,F403

sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

EXPO_C = ORANGE_RETENUE
ROUGE_YT = "#ef4444"
Y_CARTE_V = 1.5        # la vidéo (vignette)
Y_CPT = 0.5            # le compteur de vues
Y_P = -0.95            # la puissance, en bas
Y_TXT = -1.95          # la phrase du bas


def tx(s, fs=34, couleur=WHITE, gras=False, audit=True, synchro=False):
    """Un texte posé AU MOT (sans attente automatique, sauf synchro=True)."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD if gras else NORMAL)
    t.sans_synchro = not synchro
    if not audit:
        t._pas_audit = True
    if t.width > 3.9:
        t.scale_to_fit_width(3.9)
    return t


def puissance(exp, fs=96, audit=True, synchro=False, base="10"):
    """10 en BLEU, l'exposant en ORANGE, petit et haut (pas de LaTeX)."""
    b = tx(base, fs, BLEU_CALCUL, True, audit, synchro)
    e = tx(str(exp), int(fs * 0.55), EXPO_C, True, audit, synchro)
    e.next_to(b, RIGHT, buff=0.04).align_to(b, UP).shift(UP * 0.16 * fs / 64)
    g = VGroup(b, e)
    g.base, g.exp = b, e
    return g


def nombre(n_zeros, fs=30, audit=False):
    """« 1 000 000 » : le 1 blanc, les zéros ORANGE groupés par 3 (.un .zeros)."""
    un = tx("1", fs, WHITE, True, audit)
    zeros = VGroup(*[tx("0", fs, EXPO_C, True, audit) for _ in range(n_zeros)])
    prec = un
    for k, z in enumerate(zeros):
        gap = 0.03 + (fs * 0.004 if (n_zeros - k) % 3 == 0 else 0)
        z.next_to(prec, RIGHT, buff=gap).align_to(un, DOWN)
        prec = z
    g = VGroup(un, *zeros)
    g.un, g.zeros = un, zeros
    return g


def icone_lecture(h=0.32, c=ROUGE_YT):
    fond = RoundedRectangle(width=h * 1.4, height=h, corner_radius=h * 0.25, fill_color=c, fill_opacity=1,
                            stroke_width=0)
    tri = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(h * 0.26).rotate(-PI / 2).move_to(fond)
    return VGroup(fond, tri)


def video():
    """La vidéo : la vignette (un ciel, une montagne), le bouton lecture, la barre."""
    cadre = RoundedRectangle(width=3.7, height=1.4, corner_radius=0.14, fill_color="#0c4a6e", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=2)
    mont = Polygon(P(-1.85, -0.55), P(-0.6, 0.35), P(0.2, -0.15), P(0.9, 0.3), P(1.85, -0.55),
                   fill_color="#166534", fill_opacity=1, stroke_width=0)
    soleil = Circle(radius=0.16, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(P(1.3, 0.35))
    bouton = icone_lecture(0.5)
    barre = Line(P(-1.65, -0.55), P(1.65, -0.55), color="#cbd5e1", stroke_width=3)
    lu = Line(P(-1.65, -0.55), P(-0.6, -0.55), color=ROUGE_YT, stroke_width=4)
    g = VGroup(cadre, mont, soleil, bouton, barre, lu).move_to(P(0, Y_CARTE_V))
    g.bouton, g.lu = bouton, lu
    return g


class PuissanceDixShort(ShortProp):
    nom_voix = "4e-puissance-dix-short"
    fichier_marques = "puissance_dix_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    # ── petits outils ──
    def au(self, extrait, *anims, n=1, rt=0.35):
        self.au_mot(extrait, n)
        if anims:
            self.play(*anims, run_time=rt)

    def compteur(self, n_zeros, audit=False):
        """Le compteur de vues : icône lecture + 1 000… + « vues », centré."""
        nb = nombre(n_zeros, 32, audit)
        vues = tx("vues", 26, GREY_B, audit=audit)
        g = VGroup(icone_lecture(0.3), nb, vues).arrange(RIGHT, buff=0.16)
        vues.align_to(nb, DOWN)
        if g.width > 3.9:
            g.scale_to_fit_width(3.9)
        g.move_to(P(0, Y_CPT))
        g.nb = nb
        return g

    def carte(self):
        return RoundedRectangle(width=4.0, height=2.45, corner_radius=0.18, fill_color="#0b1220", fill_opacity=1,
                                stroke_color="#334155", stroke_width=2).move_to(P(0, -1.3))

    def _disposer_q(self, question, choix, phrase):
        """« Question ! » et le compte à rebours reculent vers la gauche (3 %)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = rebours.get_right()[0] - 1.9
        if d > 0:
            tete.shift(LEFT * d)
            rebours.shift(LEFT * d)
        return tete, q, cartes, pause, rebours, ph

    def appel_commentaire(self, y):
        self.au_mot("Réponds en commentaire")
        appel = self.borne(tx("Réponds en commentaire !", 32, VERT_OK, True), 0.95).move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.0)
        return appel

    def fin_short(self, voix, a_effacer):
        """La fin du 19/10 (celle du short de l'épisode 01)."""
        self.dire(voix)
        entraine = tx("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.2))
        site = tx("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.25))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = tx("Abonne-toi !", 42, VERT_OK).move_to(P(0, -0.2))
        poignee = tx("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -1.05))
        self.play(FadeOut(Group(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)

    def poser_mots(self, t, plan, rt=0.3, avec=None):
        """Comme le modèle paysage : chaque morceau de la ligne t entre à SON mot."""
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
            self.au_mot(ex)
            self.play(FadeIn(pc, shift=UP * 0.12), *((avec or {}).get(j, [])), run_time=rt)

    def _rep_q(self, sc):
        ph = sc.ph_q
        if ph.width > 3.8:
            ph.scale_to_fit_width(3.8)
        sc.poser_mots(ph[0], [("", "A :"), ("10", "10 puissance"), ("6", "6. Un")])
        sc.poser_mots(ph[1], [("", "un 1"), ("de 6", "de 6")])
        sc.rep_fini()

    def barre_lue(self, frac):
        x0 = -1.65
        return self.vid.lu.animate.put_start_and_end_on(P(x0, Y_CARTE_V - 0.55),
                                                         P(x0 + 3.3 * frac, Y_CARTE_V - 0.55))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Un milliard de vues", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        titre.scale_to_fit_width(min(titre.width, 3.7))
        self.add(badge)
        garder = [badge, titre, margo]
        vid = self.vid = video()
        carte = self.carte()

        # ── 00 : l'accroche : un milliard de vues, combien de zéros ? ──
        self.dire("00-accroche")
        self.play(Write(titre), run_time=0.6)
        cpt = self.compteur(9)
        self.au("vues", FadeIn(vid, scale=0.9), FadeIn(cpt, shift=UP * 0.15), FadeIn(carte), rt=0.45)
        q = tx("Combien de zéros ?", 34, EXPO_C, True).move_to(P(0, Y_P))
        q.scale_to_fit_width(3.4)
        self.au("Combien", FadeIn(q, shift=UP * 0.15), rt=0.35)
        self.au("zéros", Indicate(cpt.nb.zeros, color=EXPO_C, scale_factor=1.12), rt=0.5)
        self.insister(q, 1.1, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 01 : 10 vues : 10¹ ; 100 vues : 10² ; 1 000 vues : 10³ ──
        self.dire("01-compteur")
        self.play(FadeOut(q), run_time=0.1)
        p = None
        etapes = (("10 vues", "1. 100"), ("100 vues", "2. 1 000"), ("1 000 vues", "3. L"))
        for k, (m_cpt, m_exp) in enumerate(etapes):
            neuf = self.compteur(k + 1)
            self.au_mot(m_cpt)
            self.play(FadeOut(cpt, shift=UP * 0.2), FadeIn(neuf, shift=UP * 0.2, scale=1.15),
                      Indicate(vid.bouton, scale_factor=1.15), self.barre_lue(0.25 * (k + 1)), run_time=0.3)
            cpt = neuf
            pn = puissance(k + 1).move_to(P(0, Y_P))
            self.au("10 puissance", FadeIn(pn.base, scale=1.3), *([FadeOut(p)] if p else []), n=k + 1, rt=0.3)
            self.au(m_exp, FadeIn(pn.exp, scale=1.6), Indicate(cpt.nb.zeros, color=EXPO_C, scale_factor=1.12),
                    rt=0.35)
            p = pn
        regle = tx("L'exposant compte les zéros", 28, EXPO_C, True).move_to(P(0, Y_TXT))
        regle.scale_to_fit_width(min(regle.width, 3.4))
        self.au("L'exposant", FadeIn(regle, shift=UP * 0.15), Indicate(p.exp, color=EXPO_C, scale_factor=1.6),
                rt=0.4)
        self.au("zéros", Indicate(cpt.nb.zeros, color=EXPO_C, scale_factor=1.12), rt=0.5)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : un million de vues ──
        self.question_pause("01q-question", "01r-reponse", ["Un million de vues,", "c'est :"],
                            [puissance(6, 40, synchro=True), puissance(7, 40, synchro=True),
                             tx("10 × 6", 30, audit=False, synchro=True)], 0,
                            ["Réponse A : 10 puissance 6.", "un 1 suivi de 6 zéros."],
                            mot_q="Un million", autres_r=self._rep_q)
        self.vider(garder)

        # ── 02 : le compteur s'emballe : un milliard de vues = 10⁹ ──
        cpt = self.compteur(6)
        p = puissance(6, audit=False).move_to(P(0, Y_P))
        self.play(FadeIn(VGroup(vid, carte, cpt, p)), run_time=0.35)
        self.dire("02-milliard")
        self.au_mot("milliard")
        for k in (7, 8, 9):
            neuf = self.compteur(k)
            pn = puissance(k if k < 9 else "?", audit=False).move_to(P(0, Y_P))
            self.play(FadeOut(cpt, shift=UP * 0.2), FadeIn(neuf, shift=UP * 0.2, scale=1.15),
                      FadeOut(p), FadeIn(pn, scale=1.1), Indicate(vid.bouton, scale_factor=1.15), run_time=0.22)
            cpt, p = neuf, pn
        self.play(self.barre_lue(1.0), Flash(cpt.nb, color=EXPO_C, line_length=0.2), run_time=0.4)
        self.au("1 suivi", Indicate(cpt.nb.un, color=WHITE, scale_factor=1.4), rt=0.3)
        num = VGroup(*[tx(str(i + 1), 18, EXPO_C, audit=False).next_to(z, DOWN, buff=0.08)
                       for i, z in enumerate(cpt.nb.zeros)])
        self.au("9 zéros", LaggedStart(*[FadeIn(u, shift=UP * 0.08, scale=1.4) for u in num], lag_ratio=0.6), rt=1.1)
        self.au("10 puissance", Indicate(p.base, color=BLEU_CALCUL, scale_factor=1.2), rt=0.3)
        e9 = puissance(9).exp.move_to(p.exp)
        self.au("9 !", FadeOut(p.exp, scale=0.5), FadeIn(e9, scale=1.6), rt=0.35)
        self.insister(VGroup(p.base, e9), 1.25, 0.25)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question en commentaire : 10¹⁰⁰ ──
        self.dire("03-question")
        carte = self.carte()
        p100 = puissance(100, 92).move_to(P(-0.35, Y_P + 0.05))
        self.play(FadeIn(carte), run_time=0.2)
        self.au("10 puissance", FadeIn(p100.base, scale=1.3), rt=0.3)
        self.au("100 :", FadeIn(p100.exp, scale=1.6), rt=0.35)
        self.insister(p100.exp, 1.4, 0.2)
        cz = tx("Combien de zéros ?", 34, EXPO_C, True).move_to(P(0, 1.78))
        cz.scale_to_fit_width(min(cz.width, 3.6))
        self.au("combien", FadeIn(cz, shift=UP * 0.15), rt=0.35)
        nom = VGroup(tx("Ce nombre porte", 28), tx("un nom célèbre.", 28)).arrange(DOWN, buff=0.08)
        nom.move_to(P(0, Y_TXT - 0.1))
        self.au("Ce nombre", FadeIn(nom[0], shift=UP * 0.12), rt=0.3)
        self.au("un nom", FadeIn(nom[1], shift=UP * 0.12), rt=0.3)
        leq = tx("Lequel ?", 44, VERT_OK, True).move_to(P(0, 1.0))
        self.au("Lequel", FadeIn(leq, scale=1.4), rt=0.35)
        self.insister(leq, 1.15, 0.2)
        self.appel_commentaire(0.32)

        # ── 04 : la fin standard ──
        self.fin_short("04-abonne", [m for m in self.mobjects if m is not margo])
