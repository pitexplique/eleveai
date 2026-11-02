# prop_defi_short.py
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 08 « Le grand défi de
# la proportionnalité » (micro prop_defi), COMMUN : rendu une fois, copié sous
# les deux noms (il n'affiche aucune classe). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : on VOIT la valeur pour 1 minute.
# Il AMUSE : « Léo ou Maya : qui court le plus vite ? » (le piège : Maya court
# plus de mètres, mais plus longtemps).
#   · EN HAUT de chaque coureur, sa course écrite ; DESSOUS, sa piste : une
#     barre de longueur proportionnelle aux mètres, coupée en tronçons de
#     « 1 min » au moment où la voix dit « pour 1 minute » ; chaque tronçon
#     reçoit ses mètres (200, 250) avec le calcul ;
#   · 1 question-pause (3 s) : Sam, 900 m en 3 min → 300 m, oui plus rapide
#     (« non » = comparer les totaux, 900 < 1 000) ;
#   · fin : Inès, 1 200 m en 6 min (aussi vite que Léo) en commentaire.
# Centres d'intérêt : sport, jeux-defis. Nombres inventés (pas de fait réel).
# Ajouté ICI (absent du module) : coureur(), piste().
#
# Voix : manim/voix/cm-prop-defi-short.json (validée le 01/11, débit −10) ;
# WAV : public/sons/cm-prop-defi-short/ ; marques :
# manim/scripts/cm1/prop_defi_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/prop_defi_short.py PropDefiShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/prop_defi_short.py PropDefiShortCM -o eleveai-maths-cm1-prop-defi-short --media_dir manim/scripts/cm1/media-prop-defi-short
# Sorties (le même fichier, copié) :
#   manim/sorties/cm1/maths/proportionnalite/08-defi/eleveai-maths-cm1-prop-defi-short.mp4
#   manim/sorties/cm2/maths/proportionnalite/08-defi/eleveai-maths-cm2-prop-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # cm1 DEVANT : jamais un prop_* 6e homonyme

from prop_commun import *  # noqa: E402,F403

C_LEO = "#60a5fa"
C_MAYA = "#f472b6"
K_M = 0.0039          # unités de cadre par mètre (1 000 m = 3,9)
X0 = -1.95            # le départ des pistes


def pas_audit(m):
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def coureur(couleur, s=0.32, longs=False):
    """Un petit coureur (personne() du lot C), maillot à sa couleur."""
    return personne(peau="#c68642" if not longs else "#e0ac69", tenue=couleur, cheveux="#1f2937", longs=longs, s=s)


def piste(metres, minutes, couleur, y):
    """La piste : une barre de metres × K_M, et ses tronçons d'1 minute
    (cachés : à FadeIn au mot). .barre .coupes .troncons"""
    L = metres * K_M
    barre = RoundedRectangle(width=L, height=0.26, corner_radius=0.06, fill_color=couleur, fill_opacity=0.85,
                             stroke_color=WHITE, stroke_width=2).move_to(P(X0 + L / 2, y))
    w = L / minutes
    coupes = VGroup(*[Line(P(X0 + k * w, y - 0.2), P(X0 + k * w, y + 0.2), color=WHITE, stroke_width=4)
                      for k in range(1, minutes)])
    g = VGroup(barre, coupes)
    g.barre, g.coupes, g.w, g.y = barre, coupes, w, y
    return g


def base_ligne(lg):
    """Les morceaux d'une ligne sur la MÊME ligne de base (comme prop_defi.py)."""
    ref = None
    for m in lg:
        if not isinstance(m, Text) or not m.original_text.strip():
            continue
        full = Text("x" + m.original_text, font_size=48, font=m.font)
        reste = VGroup(*full[1:])
        k = m.height / max(reste.height, 1e-6)
        off = (reste.get_center()[1] - full[0].get_bottom()[1]) * k
        b = m.get_center()[1] - off
        if ref is None:
            ref = b
        else:
            m.shift(UP * (ref - b))
    return lg


class PropDefiShortCM(ShortProp):
    nom_voix = "cm-prop-defi-short"
    fichier_marques = "prop_defi_short_marques.json"
    ceinture = "blanche"

    def etiquettes(self, p, minutes, txt, dy, fs=20, couleur=WHITE):
        """Un texte (« 1 min », « 200 ») au milieu de chaque tronçon, au-dessus (dy > 0) ou dessous."""
        return VGroup(*[Text(txt, font_size=fs, color=couleur, weight=BOLD).move_to(P(X0 + (k + 0.5) * p.w, p.y + dy))
                        for k in range(minutes)])

    def ligne(self, morceaux, fs=36, buff=0.16):
        """Les morceaux sur la même ligne de base (base_ligne de prop_defi.py)."""
        return base_ligne(super().ligne(morceaux, fs, buff))

    def jouer(self, lg, mots, avec=None):
        avec = avec or {}
        for k, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                self.au_mot(mot)
            self.play(FadeIn(m, scale=1.3) if k == len(lg) - 1 else FadeIn(m, shift=RIGHT * 0.12),
                      *avec.get(k, []), run_time=0.3)
        return lg

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Qui court le plus vite ?", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]
        y_leo, y_maya = 1.85, -0.25

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        rl, rm = coureur(C_LEO), coureur(C_MAYA, longs=True)
        nl = self.t("Léo :", 30, C_LEO)
        nm = self.t("Maya :", 30, C_MAYA)
        dl = [self.t("600 m", 30, AMBRE), self.t("en 3 min", 30)]
        dm = [self.t("1 000 m", 30, AMBRE), self.t("en 4 min", 30)]
        ll = VGroup(rl, nl, *dl).arrange(RIGHT, buff=0.14).move_to(P(0, y_leo))
        lm = VGroup(rm, nm, *dm).arrange(RIGHT, buff=0.14).move_to(P(0, y_maya))
        for lg in (ll, lm):
            self.borne(lg, 0.75)
            lg.align_to(P(X0, 0), LEFT)
        self.au_mot("Léo")
        self.play(Write(titre), FadeIn(rl, shift=RIGHT * 0.3), FadeIn(nl), run_time=0.6)
        self.au_mot("Maya")
        self.play(FadeIn(rm, shift=RIGHT * 0.3), FadeIn(nm), run_time=0.4)
        self.au_mot("qui court")
        self.play(*[r.animate(rate_func=there_and_back).shift(UP * 0.15) for r in (rl, rm)], run_time=0.5)
        pg = self.borne(self.t("Attention, piège !", 36, ROUGE_ERREUR), 1.0).move_to(P(0, -1.6))
        self.au_mot("Attention")
        self.play(FadeIn(pg, scale=1.2), run_time=0.4)
        self.insister(pg, 1.06)
        self.attendre_voix(marge=0.2)

        # ── 01 : les données : la piste de chacun ──
        self.dire("01-donnees")
        pl = piste(600, 3, C_LEO, y_leo - 0.7)
        pm = piste(1000, 4, C_MAYA, y_maya - 0.7)
        self.au_mot("600")
        self.play(FadeOut(pg), FadeIn(dl[0], scale=1.3), GrowFromEdge(pl.barre, LEFT), run_time=0.6)
        self.au_mot("3 minutes")
        self.play(FadeIn(dl[1], shift=RIGHT * 0.12), run_time=0.35)
        self.au_mot("1 000")
        self.play(FadeIn(dm[0], scale=1.3), GrowFromEdge(pm.barre, LEFT), run_time=0.6)
        self.au_mot("4 minutes")
        self.play(FadeIn(dm[1], shift=RIGHT * 0.12), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 02 : pour 1 minute ──
        self.dire("02-unite")
        ml, mm = self.etiquettes(pl, 3, "1 min", -0.25, 13), self.etiquettes(pm, 4, "1 min", -0.25, 14)
        self.au_mot("1 minute")
        self.play(Create(pl.coupes), Create(pm.coupes), FadeIn(ml), FadeIn(mm), run_time=0.6)
        self.insister(VGroup(ml, mm), 1.08)
        cl = self.borne(self.ligne([("600 ÷", WHITE), ("3 =", WHITE), ("200 m", C_LEO)], 32), 0.6)
        cl.move_to(P(0, pl.y - 0.75))
        cm = self.borne(self.ligne([("1 000 ÷", WHITE), ("4 =", WHITE), ("250 m", C_MAYA)], 32), 0.6)
        cm.move_to(P(0, pm.y - 0.75))
        hl = self.etiquettes(pl, 3, "200", 0.28, 18, AMBRE)
        hm = self.etiquettes(pm, 4, "250", 0.28, 18, AMBRE)
        pas_audit(VGroup(hl, hm))  # posés avec « 200 mètres » / « 250 mètres »
        self.jouer(cl, ["600 divisé", "par 3", "200 mètres"],
                   {2: [LaggedStart(*[FadeIn(t, scale=1.4) for t in hl], lag_ratio=0.15)]})
        self.jouer(cm, ["1 000 divisé", "par 4", "250 mètres"],
                   {2: [LaggedStart(*[FadeIn(t, scale=1.4) for t in hm], lag_ratio=0.12)]})
        cad = SurroundingRectangle(VGroup(lm, pm, cm, hm), color=VERT_OK, buff=0.07, corner_radius=0.18,
                                   stroke_width=6)
        v = self.t("Maya est la plus rapide !", 34, VERT_OK).move_to(P(0, -2.5))
        self.borne(v, 1.0)
        self.au_mot("Maya est")
        self.play(Create(cad), FadeIn(v, scale=1.2), run_time=0.5)
        self.insister(v, 1.05)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse",
                            ["Sam court 900 m en 3 min.", "Est-il plus rapide", "que Maya ?"],
                            [self.t("oui", 30), self.t("non", 30), self.t("ils vont aussi vite", 30)], 0,
                            ["900 ÷ 3 = 300 m par minute.", "300 > 250 : Sam est plus rapide."], mot_q="Sam")
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 04 : la question en commentaire ──
        self.dire("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 40, AMBRE).move_to(P(0, 1.95))
        self.play(FadeIn(et, scale=1.2), run_time=0.35)
        ri = coureur("#a3e635", longs=True)
        li = VGroup(ri, self.t("Inès :", 30, "#a3e635"), self.t("1 200 m", 30, AMBRE), self.t("en 6 min", 30))
        li.arrange(RIGHT, buff=0.14).move_to(P(0, 1.05))
        self.borne(li, 0.5)
        self.au_mot("Inès")
        self.play(FadeIn(li[0], shift=RIGHT * 0.3), FadeIn(li[1]), run_time=0.35)
        self.au_mot("1 200")
        self.play(FadeIn(li[2], scale=1.3), run_time=0.3)
        self.au_mot("6 minutes")
        self.play(FadeIn(li[3], shift=RIGHT * 0.12), run_time=0.3)
        q = VGroup(self.t("Plus vite que Léo,", 30), self.t("moins vite, ou aussi vite ?", 30)).arrange(DOWN, buff=0.12)
        self.borne(q, 0.5).move_to(P(0, 0.05))
        self.au_mot("Va-t-elle")
        self.play(FadeIn(q[0], shift=UP * 0.12), run_time=0.35)
        self.au_mot("moins vite")
        self.play(FadeIn(q[1], shift=UP * 0.12), run_time=0.35)
        self.appel_commentaire(y=-1.0)
