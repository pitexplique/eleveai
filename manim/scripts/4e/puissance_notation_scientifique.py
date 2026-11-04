# puissance_notation_scientifique.py
# EleveAI — Maths 4e, 3e ET 2de (épisode COMMUN) — série « Puissances »,
# épisode 05 : LA NOTATION SCIENTIFIQUE. Paysage 16:9, AVEC VOIX.
# ⭐ Une voix, un script, TROIS rendus (seule l'identité / la ceinture change) :
#   PuissanceNotationScientifique4e  « Maths 4e — EleveAI »  ceinture VERTE
#   PuissanceNotationScientifique3e  « Maths 3e — EleveAI »  ceinture JAUNE
#   PuissanceNotationScientifique2de « Maths 2de — EleveAI » ceinture JAUNE
# Micros couvertes : 4e `puissance_notation_scientifique`,
# 3e `entier_puissance_ecriture_scientifique`, 2de `puiss_notation_scientifique`
# (écrans 02 la forme a × 10ⁿ ; 03 grand nombre ; 04 petit nombre ; 05 le signe).
# Code couleur constant : BLEU = la base 10, ORANGE = l'exposant (et le
# compteur des sauts de virgule), VERT = « entre 1 et 10 » / résultat juste,
# ROUGE = le piège (45 × 10³ : 45 n'est pas entre 1 et 10 ; le signe).
#
# Décor et métiers : une DÉMOGRAPHE (la population du monde) et une MÉDECIN
# (le globule rouge) ; le cœur qui bat ; une BOTANISTE (le pollen) et la
# Chine. Centres : corps-sante, histoire-geographie, sciences.
#
# Écrans : garde (00) ; deux vignettes (01) ; 8 × 10⁹ (02) ; le cœur et la
# virgule qui saute 9 rangs vers la gauche (03) ; QUESTION 45 000 (03q) ;
# le globule et la virgule qui saute 6 rangs vers la droite (04) ; le signe,
# deux colonnes (05) ; QUESTION 0,003 (05q) ; défi pollen + Chine (06) et
# correction (06b) ; ce que tu as appris (07) ; fin (08).
#
# Voix : manim/voix/4e-puissance-notation-scientifique.json (validée, débit
# −6), WAV dans public/sons/4e-puissance-notation-scientifique/ ; marques :
# puissance_notation_scientifique_marques.json (marques_dump.ps1 +
# cues2marques.py ; relues : aucun mot répété perdu, les cues doublées ne
# sont que les nombres lus en plusieurs morceaux).
# Outils : manim/scripts/6e/prop_commun.py (non modifié). `au()` avance un
# CURSEUR dans la voix : chaque extrait est cherché après le précédent.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_notation_scientifique.py PuissanceNotationScientifique4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_notation_scientifique.py PuissanceNotationScientifique4e -o eleveai-maths-4e-puissance-notation-scientifique --media_dir manim/scripts/4e/media-puiss-05-4e
# (3e : …3e -o eleveai-maths-3e-… --media_dir …media-puiss-05-3e ; 2de : …2de -o eleveai-maths-seconde-… --media_dir …media-puiss-05-seconde)
# Sorties : manim/sorties/{4e,3e,seconde}/maths/puissances/05-notation-scientifique/eleveai-maths-{4e,3e,seconde}-puissance-notation-scientifique.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403

BASE_C = BLEU_CALCUL       # la base 10
EXPO_C = ORANGE_RETENUE    # l'exposant, le compteur des sauts
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"
ROUGE_SANG = "#dc2626"
POLLEN = "#facc15"


def T(s, fs=40, c=WHITE, audit=True):
    """Un texte posé AU MOT par le script ; audit=False : une donnée de figure
    (chiffres d'une rangée, compteur) ou un rappel déjà dit."""
    t = Text(s, font_size=fs, color=c)
    t.sans_synchro = True
    if not audit:
        t._pas_audit = True
    return t


def puiss(b, e, fs=60, cb=BASE_C, ce=EXPO_C, audit=True):
    """Une puissance COMPOSÉE : la base, l'exposant plus petit en haut. Un
    exposant « −6 » est fait de DEUX textes (.moins, .chif) : le « − » se pose
    au mot « moins », le 6 au mot « 6 »."""
    base = T(str(b), fs, cb, audit)
    e = str(e)
    if e.startswith("−"):
        moins, chif = T("−", fs * 0.6, ce, audit), T(e[1:], fs * 0.6, ce, audit)
        expo = ligne_base(VGroup(moins, chif).arrange(RIGHT, buff=0.03))
        chif.align_to(moins, DOWN).shift(DOWN * fs * 0.0006)
        moins.set_y(chif.get_y())
    else:
        moins, chif = None, T(e, fs * 0.6, ce, audit)
        expo = VGroup(chif)
    expo.next_to(base, UR, buff=0.03).shift(DOWN * fs * 0.006)
    g = VGroup(base, expo)
    g.base, g.expo, g.moins, g.chif = base, expo, moins, chif
    return g


def notation(m, e, fs=60, cm=WHITE, audit=True):
    """« m × 10ᵉ » : .m (la mantisse), .x (le ×), .p (la puissance de 10)."""
    mm = T(m, fs, cm, audit)
    x = T("×", fs * 0.85, WHITE, audit)
    p = puiss(10, e, fs, audit=audit)
    g = VGroup(mm, x, p).arrange(RIGHT, buff=fs * 0.0045)
    x.set_y(mm.get_y())
    p.shift(UP * (mm.get_bottom()[1] - p.base.get_bottom()[1]))
    g.m, g.x, g.p = mm, x, p
    return g


def sans_audit(m):
    for f in m.get_family():
        f._pas_audit = True
    return m


SURS = set("abcdefhiklmnorstuvwxzABCDEFGHIJKLMNOPRSTUVWXYZ0123456789éèêëàâîïôûùç:!?.")


def pied(t):
    """Ordonnée de la ligne de base d'un Text : le bas d'un glyphe sans jambage."""
    if not isinstance(t, Text):
        t = getattr(t, "m", None)
        if not isinstance(t, Text):
            return None
    cs = [c for c in t.text if not c.isspace()]
    if len(cs) == len(t.submobjects):
        for c, g in zip(cs, t.submobjects):
            if c in SURS:
                return g.get_bottom()[1]
    return None


def ligne_base(g):
    """Rangée de morceaux : même ligne de base que le premier morceau."""
    ref = None
    for m in g.submobjects:
        y = pied(m)
        if y is None:
            continue
        if ref is None:
            ref = y
        else:
            m.shift(UP * (ref - y))
    return g


# ── la rangée de chiffres et sa virgule qui SAUTE ──────────────────────────

class Rangee(VGroup):
    """Un nombre écrit chiffre par chiffre, à pas réguliers (chaque chiffre a
    la place d'une virgule après lui) ; groupes : indices k après lesquels on
    laisse l'espace des milliers. .ch[k] = le k-ième chiffre ; .x_virg(k) =
    l'abscisse de la virgule posée APRÈS le chiffre k ; .virg = la virgule."""

    def __init__(self, chiffres, apres, fs=90, groupes=(), x0=0.0, y=0.0):
        super().__init__()
        w = Text("0", font_size=fs).width
        self.w = w
        pas, gap = w * 1.42, w * 0.4
        x, xs = x0, []
        for k in range(len(chiffres)):
            xs.append(x)
            x += pas + (gap if k in groupes else 0)
        self.ch = VGroup(*[T(c, fs, WHITE, audit=False) for c in chiffres])
        h = Text("0", font_size=fs).height
        for k, c in enumerate(self.ch):
            c.move_to(P(xs[k], y)).align_to(P(0, y - h / 2), DOWN)
            if c.width < w * 0.8:  # un « 1 », étroit : calé à droite de sa place (« 1,4 » sans trou)
                c.shift(RIGHT * (w - c.width) / 2)
        self.bas, self.haut, self.h = y - h / 2, y + h / 2, h
        self.virg = T(",", fs, WHITE, audit=False)
        self.virg.move_to(P(self.x_virg(apres), 0)).align_to(P(0, self.bas + h * 0.13), UP)
        self.add(self.ch, self.virg)

    def x_virg(self, k):
        return self.ch[k].get_right()[0] + self.w * 0.22

    def pt_virg(self, k):
        return np.array([self.x_virg(k), self.virg.get_y(), 0])


def coeur(s=1.0):
    """Un cœur dessiné (courbe paramétrée), rouge."""
    ts = np.linspace(0, TAU, 80)
    pts = [P(16 * np.sin(t) ** 3 / 17, (13 * np.cos(t) - 5 * np.cos(2 * t) - 2 * np.cos(3 * t) - np.cos(4 * t)) / 17)
           for t in ts]
    c = VMobject(fill_color="#ef4444", fill_opacity=1, stroke_color="#fca5a5", stroke_width=3)
    c.set_points_smoothly(pts)
    return c.scale(s)


def globule(r=0.5):
    """Un globule rouge vu de face : un disque, le creux plus sombre au centre."""
    return VGroup(Circle(radius=r, fill_color=ROUGE_SANG, fill_opacity=1, stroke_color="#fca5a5", stroke_width=3),
                  Circle(radius=r * 0.48, fill_color="#991b1b", fill_opacity=0.85, stroke_width=0))


def pollen(r=0.5):
    """Un grain de pollen : une boule jaune hérissée de petites pointes."""
    pointes = VGroup(*[Triangle(fill_color="#eab308", fill_opacity=1, stroke_width=0).scale(r * 0.16)
                       .rotate(a - PI / 2).move_to(P(np.cos(a) * r * 1.02, np.sin(a) * r * 1.02))
                       for a in np.linspace(0, TAU, 16, endpoint=False)])
    boule = Circle(radius=r, fill_color=POLLEN, fill_opacity=1, stroke_color="#a16207", stroke_width=3)
    pores = VGroup(*[Dot(P(np.cos(a) * r * 0.45, np.sin(a) * r * 0.45), radius=r * 0.09, color="#a16207")
                     for a in (PI / 2, PI / 2 + TAU / 3, PI / 2 + 2 * TAU / 3)])
    return VGroup(pointes, boule, pores)


def silhouette(c="#fde68a", s=1.0):
    """Une petite personne : une tête, un buste arrondi."""
    tete = Circle(radius=0.07, fill_color=c, fill_opacity=1, stroke_width=0)
    buste = RoundedRectangle(width=0.18, height=0.16, corner_radius=0.07, fill_color=c, fill_opacity=1,
                             stroke_width=0).next_to(tete, DOWN, buff=0.015)
    return VGroup(tete, buste).scale(s)


def planisphere(w=3.4, h=2.0):
    """Une carte du monde SCHÉMATIQUE : l'océan, cinq continents en blobs.
    .terres : les continents ; .places : des points où poser les silhouettes."""
    mer = RoundedRectangle(width=w, height=h, corner_radius=0.12, fill_color="#0c4a6e", fill_opacity=1,
                           stroke_color="#38bdf8", stroke_width=2)
    vert = "#15803d"
    sx, sy = w / 3.4, h / 2.0

    def blob(cx, cy, rx, ry, a=0.0):
        return Ellipse(width=2 * rx * sx, height=2 * ry * sy, fill_color=vert, fill_opacity=1,
                       stroke_width=0).rotate(a).move_to(mer.get_center() + P(cx * sx, cy * sy))

    terres = VGroup(blob(-1.15, 0.38, 0.42, 0.34, -0.3), blob(-0.85, -0.42, 0.2, 0.38, 0.25),  # Amériques
                    blob(-0.05, 0.45, 0.28, 0.2), blob(0.0, -0.25, 0.26, 0.42),                  # Europe, Afrique
                    blob(0.75, 0.4, 0.62, 0.36), blob(1.25, -0.55, 0.24, 0.15))                 # Asie, Australie
    places = [(-1.25, 0.45), (-1.0, 0.3), (-0.85, -0.35), (-0.8, -0.6), (-0.1, 0.5), (0.05, -0.1), (-0.05, -0.45),
              (0.5, 0.5), (0.8, 0.3), (1.05, 0.45), (0.65, 0.2), (1.25, -0.55), (0.0, 0.25), (0.95, 0.6)]
    pts = VGroup(*[Dot(mer.get_center() + P(x * sx, y * sy), radius=0.01, fill_opacity=0) for x, y in places])
    g = VGroup(mer, terres, pts)
    g.terres, g.pts = terres, pts
    return g


def microscope(s=1.0):
    """Un microscope de profil : socle, colonne, platine, tube incliné, oculaire."""
    gris, fonce = "#94a3b8", "#475569"
    socle = RoundedRectangle(width=1.0, height=0.16, corner_radius=0.05, fill_color=fonce, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.85))
    colonne = Rectangle(width=0.16, height=1.25, fill_color=gris, fill_opacity=1, stroke_width=0).move_to(P(0.3, -0.2))
    platine = Rectangle(width=0.75, height=0.08, fill_color=fonce, fill_opacity=1, stroke_width=0).move_to(P(-0.05, -0.3))
    lame = Rectangle(width=0.36, height=0.05, fill_color=CIEL, fill_opacity=1, stroke_width=0).move_to(P(-0.1, -0.23))
    tube = Rectangle(width=0.2, height=0.95, fill_color=gris, fill_opacity=1, stroke_width=0).rotate(-0.35)
    tube.move_to(P(0.02, 0.32))
    oculaire = Rectangle(width=0.26, height=0.18, fill_color=fonce, fill_opacity=1, stroke_width=0).rotate(-0.35)
    oculaire.move_to(tube.get_center() + P(0.17, 0.5))
    g = VGroup(socle, colonne, platine, lame, tube, oculaire).scale(s)
    g.oculaire, g.lame = oculaire, lame
    return g


def chine(s=1.0):
    """La Chine, carte SCHÉMATIQUE (un contour simplifié), et ses villes."""
    lonlat = [(73.5, 39.5), (75, 37), (79, 35), (80, 32), (85, 28.5), (89, 28), (92, 27.8), (97, 28.2), (98, 24.5),
              (101, 21.5), (106, 22.5), (108.5, 21.6), (110, 20.4), (111, 21.5), (114, 22.3), (117, 23.5),
              (119.5, 26), (121.5, 28.5), (122, 31), (120.8, 32.5), (119.3, 35), (122.5, 37), (121, 37.8),
              (118, 38.5), (121, 40.5), (124, 40), (126, 41.5), (129, 42.5), (130.5, 42.5), (131, 45), (133, 45),
              (134.7, 48.3), (132, 47.7), (130.7, 48.8), (127.5, 49.7), (125.5, 53), (121, 53.3), (120, 51.5),
              (117.5, 49.5), (116, 47.5), (119.7, 47), (115.5, 45.5), (111, 43.5), (107, 42), (105, 41.6),
              (100, 42.6), (96, 42.7), (91, 45.2), (90.5, 47.8), (87.5, 49.1), (85.5, 47), (82.5, 45.3),
              (80.2, 42.1), (77, 41)]
    c = Polygon(*[P((lo - 104) / 12, (la - 36) / 12) for lo, la in lonlat], fill_color="#b45309", fill_opacity=0.9,
                stroke_color="#fdba74", stroke_width=3)
    places = [(-1.6, 0.35), (-0.9, 0.55), (-0.3, 0.45), (0.3, 0.3), (0.9, 0.55), (1.6, 0.85), (-1.1, -0.1),
              (-0.4, -0.05), (0.3, -0.2), (0.9, 0.0), (1.2, -0.45), (0.1, -0.75), (0.7, -0.75), (-0.5, -0.6),
              (1.35, 0.25), (2.0, 0.75)]
    pts = VGroup(*[Dot(P(x, y), radius=0.01, fill_opacity=0) for x, y in places])
    g = VGroup(c, pts).scale(s)
    g.pts = pts
    return g


def demographe(s=1.0):
    p = personne(peau="#c68642", tenue="#7c3aed", cheveux="#3f2a1d", longs=True, s=s)
    p.add(lunettes(p))
    return p


def medecin(s=1.0):
    p = personne(peau="#8d5524", tenue="#0e7490", cheveux="#111827", longs=True, s=s)
    p.add(blouse(p))
    return p


def botaniste(s=1.0):
    p = personne(peau="#e0ac69", tenue="#15803d", cheveux="#7c2d12", longs=False, s=s)
    t = p.tete.get_center()
    r = p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.5, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    bord.move_to(t + UP * r * 0.55)
    haut = RoundedRectangle(width=r * 1.5, height=r * 0.75, corner_radius=r * 0.2, fill_color="#a16207",
                            fill_opacity=1, stroke_width=0).next_to(bord, UP, buff=-r * 0.12)
    p.add(bord, haut)
    return p


def loupe_sur(centre, r, objet, depuis_a, depuis_b):
    """Un cercle de loupe (fond nuit), l'objet dedans, deux pointillés depuis
    les points depuis_a / depuis_b (l'oculaire, la lame…)."""
    rond = Circle(radius=r, stroke_color=WHITE, stroke_width=4, fill_color="#0b1220", fill_opacity=1).move_to(centre)
    objet.move_to(centre)
    traits = VGroup(DashedLine(depuis_a, rond.point_at_angle(PI * 1.15), color=GREY_B, stroke_width=2),
                    DashedLine(depuis_b, rond.point_at_angle(PI * 1.55), color=GREY_B, stroke_width=2))
    g = VGroup(traits, rond, objet)
    g.rond, g.objet, g.traits = rond, objet, traits
    return g


class OutilsNotation:
    """Mixin commun à la paysage et au short : la voix lue au CURSEUR, la
    virgule qui saute, la question-pause dont chaque choix se pose au mot."""

    def dire(self, nom, dossier=None):
        d = super().dire(nom, dossier)
        self._cur = 0
        return d

    def au(self, extrait, *anims, rt=0.35):
        """Au mot `extrait` (cherché APRÈS le précédent), joue les animations."""
        v = self._texte_voix
        i = v.find(extrait, self._cur)
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la voix après {self._cur} : {v[self._cur:self._cur + 40]}")
        self._cur = i + 1
        marques = self._marques().get(self._cle_voix) or []
        t = max([m[1] for m in marques if m[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} « {extrait} » : {-reste:.2f} s", flush=True)
        if reste > 0.05:
            self.wait(reste)
        if anims:
            self.play(*anims, run_time=rt)

    def poser_mots(self, t, plan, rt=0.25, avec=None):
        """Un texte écrit MORCEAU PAR MORCEAU : plan = [(début du morceau dans
        le texte, extrait de la voix)] ; avec = {j: [animations]}."""
        s = t.original_text
        debuts = [s.find(a) for a, _ in plan]
        assert debuts[0] == 0 and all(d >= 0 for d in debuts), (s, plan)
        bornes = debuts + [len(s)]
        k, pieces = 0, []
        for a, b in zip(bornes[:-1], bornes[1:]):
            n = sum(1 for c in s[a:b] if not c.isspace())
            pieces.append(VGroup(*t.submobjects[k:k + n]))
            k += n
        for j, ((_, ex), pc) in enumerate(zip(plan, pieces)):
            self.au(ex, FadeIn(pc, shift=UP * 0.12), *((avec or {}).get(j, [])), rt=rt)

    def saut(self, rg, k_de, k_vers, n=None, rt=0.27, fs_c=30, avec=()):
        """La virgule saute de « après le chiffre k_de » à « après k_vers »
        (un rang) : elle plonge SOUS les chiffres, l'arc orange passe dessus,
        le compteur n s'écrit au sommet de l'arc (n=None : pas de compteur)."""
        a, b = rg.x_virg(k_de), rg.x_virg(k_vers)
        yh = rg.haut + 0.1
        gauche = b < a
        arc = CurvedArrow(P(a, yh), P(b, yh), angle=PI * 0.7 if gauche else -PI * 0.7, color=EXPO_C,
                          stroke_width=4, tip_length=0.13)
        lab = T(str(n), fs_c, EXPO_C, audit=False).next_to(arc, UP, buff=0.05) if n is not None else VGroup()
        anims = [rg.virg.animate(path_arc=-PI * 0.8 if gauche else PI * 0.8).move_to(P(b, rg.virg.get_y())),
                 Create(arc), *avec]
        if n is not None:
            anims.append(FadeIn(lab, scale=1.5))
        self.play(*anims, run_time=rt)
        return VGroup(arc, lab)

    def qpause(self, cle_q, cle_r, question, choix, plans, bonne, phrase, avant=None, apres=None):
        """La question-pause du lot (J2), recopiée pour que CHAQUE MORCEAU d'un
        choix (« 45 », « × 10 », l'exposant) se pose à son mot : plans[i] =
        [(extrait, [morceaux])]. avant(scène, q) pose la question ; apres(scène)
        pose la phrase de réponse (ligne_rep) et anime la figure."""
        self.dire(cle_q)
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours, ph = self._disposer_q(question, choix, phrase)
        self.au("Question", FadeIn(tete, shift=DOWN * 0.2), rt=0.4)
        if avant:
            avant(self, q)
        for c, lettre, plan in zip(cartes, ("A :", "B :", "C :"), plans):
            self.au(lettre, FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), rt=0.25)
            for ex, pieces in plan:
                self.au(ex, *[FadeIn(p, shift=RIGHT * 0.1) for p in pieces], rt=0.25)
        self.au("Mets pause", FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), rt=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)
        self.dire(cle_r)
        b = cartes[bonne]
        corps = b[1][1]
        if corps.get_right()[0] > b[0].get_right()[0] - 0.6:
            gauche = corps.get_left()[0]
            corps.scale_to_fit_width(max(0.4, b[0].get_right()[0] - 0.65 - gauche))
            corps.shift(RIGHT * (gauche - corps.get_left()[0]))
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(3) if j != bonne]
        self.au("Réponse", *anims, FadeOut(rebours), FadeOut(pause), rt=0.3)
        ok = self.coche(VERT_OK, 0.22).move_to(b[0].get_right() + LEFT * 0.33)
        self.play(b.animate.scale(1.08), Create(ok), run_time=0.2)
        self.play(b.animate.scale(1 / 1.08), ok.animate.scale(1 / 1.08, about_point=b.get_center()), run_time=0.2)
        if apres:
            apres(self)
        self.rep_fini()
        self.attendre_voix(marge=0.8)
        return t0

    def rep_ligne(self, i, morceaux):
        """ligne_rep (prop_commun) dont les morceaux sont posés AU MOT par le
        script (aucune attente automatique)."""
        lg = self.ligne_rep(i, morceaux)
        for f in lg.get_family():
            f.sans_synchro = True
        return lg

    def rep_nota(self, i, prefixe, m, e):
        """La ligne i de la réponse : « Réponse B : » + m × 10ᵉ COMPOSÉ (en
        vert), posée à la place de la ligne i ; .pre .nt .pt."""
        ref = self.ph_q[i]
        fs = 30 if config.frame_width > 8 else 26
        pre = T(prefixe, fs, VERT_OK)
        nt = notation(m, e, fs=fs * 1.15, cm=VERT_OK)
        nt.p.set_color(VERT_OK)
        pt = T(".", fs, VERT_OK)
        lg = ligne_base(VGroup(pre, nt, pt).arrange(RIGHT, buff=0.15))
        pt.next_to(nt, RIGHT, buff=0.04)
        ligne_base(VGroup(nt, pre, pt))
        lg.move_to(ref)
        if config.frame_width > 8:
            lg.align_to(ref, LEFT)
        lg.pre, lg.nt, lg.pt = pre, nt, pt
        return lg

    def pieges(self, *idx):
        """Les cartes des leurres redeviennent lisibles, en ROUGE."""
        self.play(*[self.cartes_q[j][1][1].animate.set_color(PIEGE).set_opacity(1) for j in idx],
                  *[self.cartes_q[j][0].animate.set_stroke(PIEGE, opacity=1) for j in idx], run_time=0.25)


class PuissanceNotationScientifiqueBase(OutilsNotation, PaysageProp):
    nom_voix = "4e-puissance-notation-scientifique"
    fichier_marques = "puissance_notation_scientifique_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La notation scientifique", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        sans_audit(ident)  # « Maths 3e » : l'identité, jamais dite
        self.au("La notation", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.8)
        l1 = T("Comment écrire", 46).move_to(P(-0.6, 1.0))
        g = T("8 milliards", 60, BASE_C)
        et = T("et", 46)
        p = T("0,000 007", 60, EXPO_C, audit=False)
        l2 = ligne_base(VGroup(g, et, p).arrange(RIGHT, buff=0.45)).move_to(P(-0.6, 0.05))
        et.align_to(g, DOWN)
        l3 = ligne_base(VGroup(T("de la même façon", 46), T("?", 56, EXPO_C)).arrange(RIGHT, buff=0.2)).move_to(P(-0.6, -0.95))
        self.au("Comment", FadeIn(l1, shift=RIGHT * 0.2), rt=0.35)
        self.au("8 milliards", FadeIn(g, scale=1.3), rt=0.35)
        self.au("et", FadeIn(et), rt=0.2)
        self.au("0,000", FadeIn(p, scale=0.6), rt=0.4)
        self.au("de la", FadeIn(l3[0], shift=UP * 0.15), rt=0.35)
        self.au("façon", FadeIn(l3[1], scale=1.5), rt=0.3)
        self.play(g.animate.scale(1.25), p.animate.scale(0.8), run_time=0.35)
        self.play(g.animate.scale(1 / 1.25), p.animate.scale(1 / 0.8), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : deux vignettes : la démographe, la médecin ────────────────────
    def carte(self, x):
        return RoundedRectangle(width=6.2, height=4.85, corner_radius=0.2, fill_color="#0b1220", fill_opacity=1,
                                stroke_color="#334155", stroke_width=2).move_to(P(x, 0.35))

    def ecran_situation(self):
        self.ecran("01-situation")
        cg, cd = self.carte(-3.45), self.carte(3.45)
        # à gauche : la démographe, le planisphère et ses habitants
        dem = demographe(0.6).move_to(P(-5.55, 0.35))
        n_dem = T("Une démographe", 36, CIEL).move_to(P(-3.45, 2.2))
        carte = planisphere(3.3, 2.0).move_to(P(-2.45, 0.45))
        foule = VGroup(*[silhouette(s=0.9).move_to(d.get_center() + UP * 0.06) for d in carte.pts])
        hab = ligne_base(VGroup(T("8 milliards", 34, BASE_C), T("d'habitants", 30)).arrange(RIGHT, buff=0.22))
        hab.move_to(P(-3.45, -1.15))
        hab[1].align_to(hab[0], DOWN)
        geant = T("un nombre géant", 36, JAUNE_TITRE).move_to(P(-3.45, -1.8))
        self.au("Une démographe", FadeIn(cg), FadeIn(dem, shift=UP * 0.3), FadeIn(n_dem, shift=DOWN * 0.15), rt=0.45)
        self.au("population", FadeIn(carte, scale=0.8), rt=0.45)
        self.au("monde", LaggedStart(*[FadeIn(f, scale=0.3) for f in foule], lag_ratio=0.12), rt=1.0)
        self.au("8 milliards", FadeIn(hab[0], scale=1.3), rt=0.35)
        self.au("d'habitants", FadeIn(hab[1], shift=LEFT * 0.15),
                LaggedStart(*[Indicate(f, color=JAUNE_TITRE, scale_factor=1.5) for f in foule], lag_ratio=0.05),
                rt=0.8)
        # à droite : la médecin, le microscope, le globule rouge
        med = medecin(0.6).move_to(P(1.35, 0.35))
        n_med = T("Une médecin", 36, CIEL).move_to(P(3.45, 2.2))
        mic = microscope(1.05).move_to(P(3.2, 0.25))
        glo = globule(0.42)
        lp = loupe_sur(P(5.4, 0.75), 0.75, glo, mic.oculaire.get_top(), mic.oculaire.get_right())
        mini = ligne_base(VGroup(T("0,000 007", 38, EXPO_C, audit=False), T("mètre", 32)).arrange(RIGHT, buff=0.22)).move_to(P(3.45, -1.15))
        mini[1].align_to(mini[0], DOWN)
        minus = T("un nombre minuscule", 36, JAUNE_TITRE).move_to(P(3.45, -1.8))
        self.au("Une médecin", FadeIn(cd), FadeIn(med, shift=UP * 0.3), FadeIn(n_med, shift=DOWN * 0.15), rt=0.45)
        self.au("observe", FadeIn(mic, shift=UP * 0.2), rt=0.4)
        self.au("globule", Create(lp.traits), GrowFromCenter(lp.rond), rt=0.4)
        self.au("rouge", FadeIn(glo, scale=0.3), rt=0.35)
        self.au("0,000", FadeIn(mini[0], scale=0.6), rt=0.35)
        self.au("mètre", FadeIn(mini[1], shift=LEFT * 0.15), rt=0.3)
        self.au("géant", FadeIn(geant, shift=UP * 0.15), rt=0.3)
        self.insister(hab[0], 1.25, 0.25)
        self.au("minuscule", FadeIn(minus, shift=UP * 0.15), rt=0.3)
        self.play(mini[0].animate.scale(0.6), run_time=0.3)
        self.play(mini[0].animate.scale(1 / 0.6), run_time=0.3)
        meme = ligne_base(VGroup(T("Les scientifiques les écrivent", 32), T("de la même façon.", 32, VERT_OK)).arrange(RIGHT, buff=0.2))
        meme.move_to(P(-0.6, -3.05))
        self.au("Les scientifiques", FadeIn(meme[0], shift=UP * 0.15), rt=0.35)
        self.au("de la même", FadeIn(meme[1], shift=UP * 0.15), rt=0.35)
        self.attendre_voix(marge=0.5)

    # ── 02 : la forme : un nombre entre 1 et 10 × une puissance de 10 ──────
    def ecran_forme(self):
        self.ecran("02-forme")
        tit = T("La notation scientifique", 46, JAUNE_TITRE).move_to(P(-0.6, 3.1))
        self.au("La notation", Write(tit), rt=0.6)
        a = ligne_base(VGroup(T("un nombre entre", 34, VERT_OK), T("1 et", 34, VERT_OK), T("10", 34, VERT_OK)).arrange(RIGHT, buff=0.16))
        x = T("×", 38)
        b = ligne_base(VGroup(T("une puissance de", 34, BASE_C), T("10", 34, BASE_C)).arrange(RIGHT, buff=0.16))
        ligne_base(VGroup(a, x, b).arrange(RIGHT, buff=0.35)).move_to(P(-0.3, 1.95))
        ca = SurroundingRectangle(a, color=VERT_OK, buff=0.14, corner_radius=0.1, stroke_width=3)
        cb = SurroundingRectangle(b, color=BASE_C, buff=0.14, corner_radius=0.1, stroke_width=3)
        self.au("un nombre", FadeIn(a[0], shift=RIGHT * 0.15), rt=0.3)
        self.au("1 et", FadeIn(a[1], shift=RIGHT * 0.15), rt=0.2)
        self.au("10,", FadeIn(a[2], scale=1.3), Create(ca), rt=0.3)
        self.au("fois", FadeIn(x, scale=1.4), rt=0.25)
        self.au("une puissance", FadeIn(b[0], shift=RIGHT * 0.15), rt=0.3)
        self.au("10.", FadeIn(b[1], scale=1.3), Create(cb), rt=0.3)
        mil = T("8 milliards", 60, WHITE)
        eg = T("=", 70)
        nt = notation("8", "9", fs=110)
        nt.m.set_color(VERT_OK)
        ligne_base(VGroup(mil, eg, nt).arrange(RIGHT, buff=0.45)).move_to(P(-0.8, -0.05))
        mil.align_to(nt.m, DOWN)
        eg.set_y(nt.m.get_y())
        self.au("8 milliards", FadeIn(mil, scale=1.2), rt=0.35)
        self.au("8 fois", FadeIn(eg), FadeIn(nt.m, scale=1.4), FadeIn(nt.x), rt=0.3)
        self.au("10 puissance", FadeIn(nt.p.base, scale=1.3), rt=0.3)
        self.au("9.", FadeIn(nt.p.expo, scale=1.8), rt=0.3)
        self.insister(nt.p.expo, 1.6, 0.2, about=nt.p.expo.get_center())
        sous = Line(nt.m.get_corner(DL) + P(-0.12, -0.16), nt.m.get_corner(DR) + P(0.12, -0.16), color=VERT_OK,
                    stroke_width=7)
        e1 = T("entre 1 et 10", 34, VERT_OK, audit=False).next_to(sous, DOWN, buff=0.18).align_to(sous, RIGHT)
        sous2 = Line(nt.p.get_corner(DL) + P(-0.08, -0.16), nt.p.get_corner(DR) + P(0.08, -0.16), color=BASE_C,
                     stroke_width=7)
        e2 = T("puissance de 10", 34, BASE_C, audit=False).next_to(sous2, DOWN, buff=0.18)
        self.play(Create(sous), FadeIn(e1, shift=UP * 0.15), Indicate(a, color=VERT_OK, scale_factor=1.08), run_time=0.5)
        self.play(Create(sous2), FadeIn(e2, shift=UP * 0.15), Indicate(b, color=BASE_C, scale_factor=1.08), run_time=0.5)
        self.insister(nt.m, 1.4, 0.25, about=nt.m.get_center())
        self.attendre_voix(marge=0.6)

    # ── 03 : grand nombre : le cœur, la virgule qui recule de 9 rangs ──────
    def battre(self, cr, fois=2):
        for _ in range(fois):
            self.play(cr.animate.scale(1.22), run_time=0.14)
            self.play(cr.animate.scale(1 / 1.22), run_time=0.18)

    def ecran_grand(self):
        self.ecran("03-grand")
        tit = T("La méthode : un grand nombre", 42, JAUNE_TITRE).move_to(P(0, 3.15)).align_to(P(-6.3, 0), LEFT)
        self.au("La méthode", Write(tit), rt=0.6)
        cr = coeur(0.62).move_to(P(-5.6, 1.75))
        l1 = T("Au cours d'une vie,", 34).move_to(P(0, 2.05)).align_to(P(-4.7, 0), LEFT)
        l2 = T("un cœur bat environ :", 34).move_to(P(0, 1.5)).align_to(P(-4.7, 0), LEFT)
        self.au("Au cours", FadeIn(l1, shift=RIGHT * 0.2), rt=0.35)
        self.au("un cœur", FadeIn(l2, shift=RIGHT * 0.2), FadeIn(cr, scale=0.4), rt=0.35)
        self.au("bat")
        self.battre(cr, 1)
        rg = Rangee("2500000000", 9, fs=86, groupes=(0, 3, 6), y=-0.45)
        rg.shift(RIGHT * (0.2 - rg.ch.get_center()[0]))
        self.au("2 500", LaggedStart(*[FadeIn(c, shift=DOWN * 0.15) for c in rg.ch], lag_ratio=0.12), rt=1.0)
        self.battre(cr, 2)
        # la virgule, cachée au bout du nombre entier, puis sa place : après le 2
        self.au("virgule", FadeIn(rg.virg, scale=2.5), rt=0.35)
        self.play(Indicate(rg.virg, color=EXPO_C, scale_factor=2.0), run_time=0.4)
        xg = rg.x_virg(0)
        fl = Arrow(P(xg, rg.bas - 1.0), P(xg, rg.bas - 0.12), color=VERT_OK, stroke_width=7, buff=0,
                   max_tip_length_to_length_ratio=0.3)
        self.au("après", GrowArrow(fl), rt=0.35)
        self.au("premier", Indicate(rg.ch[0], color=VERT_OK, scale_factor=1.4), rt=0.4)
        d25 = T("2,5", 44, VERT_OK).next_to(fl, DOWN, buff=0.12)
        self.au("2,5", FadeIn(d25, scale=1.4), rg.ch[0].animate.set_color(VERT_OK),
                rg.ch[1].animate.set_color(VERT_OK), rt=0.35)
        # elle recule : 9 sauts, le compteur orange
        sauts = VGroup()
        self.au("compte")
        for n in range(1, 9):
            sauts.add(self.saut(rg, 10 - n, 9 - n, n, rt=0.26))
        self.au("9.")
        s9 = self.saut(rg, 1, 0, 9, rt=0.22, fs_c=44, avec=[FadeOut(fl), FadeOut(d25)])
        sauts.add(s9)
        # 2,5 × 10⁹ battements
        res = notation("2,5", "9", fs=80)
        res.m.set_color(VERT_OK)
        bat = T("battements", 40)
        ligne_base(VGroup(res, bat).arrange(RIGHT, buff=0.35)).move_to(P(0, -2.45)).align_to(P(-5.9, 0), LEFT)
        bat.align_to(res.m, DOWN)
        self.au("2,5", FadeIn(res.m, scale=1.3), rg.ch[2:].animate.set_opacity(0.3), rt=0.35)
        self.au("fois", FadeIn(res.x), rt=0.25)
        self.au("10 puissance", FadeIn(res.p.base, scale=1.3), rt=0.3)
        self.au("9 battements", ReplacementTransform(s9[1].copy(), res.p.expo), FadeIn(bat, shift=LEFT * 0.15), rt=0.45)
        cad = self.encadrer(VGroup(res, bat), buff=0.18)
        self.play(Create(cad), run_time=0.3)
        self.insister(res.p.expo, 1.6, 0.2, about=res.p.expo.get_center())
        self.battre(cr, 1)
        self.attendre_voix(marge=0.5)

    # ── 03q : QUESTION 1 (45 000) ───────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        nb = T("45 000", 110, WHITE, audit=False).move_to(P(-3.5, 2.0))
        bon = notation("4,5", "4", fs=72)
        bon.m.set_color(VERT_OK)
        eg = T("=", 64)
        lb = ligne_base(VGroup(eg, bon).arrange(RIGHT, buff=0.3)).move_to(P(-3.5, 0.55))
        eg.set_y(bon.x.get_y())
        faux = notation("45", "3", fs=56, cm=PIEGE).move_to(P(-3.5, -0.6))
        lv = ligne_base(VGroup(T("vaut bien", 32), T("45 000,", 34, WHITE, audit=False)).arrange(RIGHT, buff=0.2)).move_to(P(-3.5, -1.4))
        vaut, n45 = lv

        def base(*ms):  # lignes de base communes (le 1er glyphe de chaque morceau)
            for m in ms[1:]:
                m.shift(UP * (ms[0][0].get_bottom()[1] - m[0].get_bottom()[1]))
        base(vaut, n45)
        mais = VGroup(ligne_base(VGroup(T("mais 45", 34, PIEGE), T("n'est pas", 34, PIEGE)).arrange(RIGHT, buff=0.2)),
                      ligne_base(VGroup(T("entre", 34, PIEGE), T("1 et", 34, PIEGE), T("10.", 34, PIEGE)).arrange(RIGHT, buff=0.2)))
        base(*mais[0]); base(*mais[1])
        mais.arrange(DOWN, buff=0.15).move_to(P(-3.5, -2.45))
        choix = [notation("45", "3", fs=40), notation("4,5", "4", fs=40), notation("4,5", "3", fs=40)]
        plans = [[("45 fois", [choix[0].m, choix[0].x]), ("10 puissance", [choix[0].p.base]), ("3.", [choix[0].p.expo])]]
        for c, e in ((choix[1], "4."), (choix[2], "3.")):
            plans.append([("4,5", [c.m]), ("fois", [c.x]), ("10 puissance", [c.p.base]), (e, [c.p.expo])])

        def avant(sc, q):
            sc.poser_mots(q[0], [("Quelle", "Quelle")])
            sc.poser_mots(q[1], [("scientifique", "scientifique"), ("45 000", "45 000")],
                          avec={1: [FadeIn(nb, scale=1.2)]})

        def apres(sc):
            lg = sc.rep_nota(0, "Réponse B :", "4,5", "4")
            sc.au("B :", FadeIn(lg.pre, shift=UP * 0.12), rt=0.25)
            sc.au("4,5", FadeIn(lg.nt.m, lg.nt.x, shift=UP * 0.12), FadeIn(eg), FadeIn(bon.m, scale=1.3),
                  FadeIn(bon.x), rt=0.3)
            sc.au("10 puissance", FadeIn(lg.nt.p.base, shift=UP * 0.12), FadeIn(bon.p.base, scale=1.3), rt=0.25)
            sc.au("4.", FadeIn(lg.nt.p.expo, lg.pt, shift=UP * 0.12), FadeIn(bon.p.expo, scale=1.6), rt=0.3)
            sc.play(Create(sc.encadrer(lb, buff=0.22)), run_time=0.3)
            sc.pieges(0)
            sc.au("45 fois", FadeIn(faux.m, scale=1.2), FadeIn(faux.x), rt=0.3)
            sc.au("10 puissance", FadeIn(faux.p.base, scale=1.2), rt=0.25)
            sc.au("3", FadeIn(faux.p.expo, scale=1.5), rt=0.25)
            sc.au("vaut", FadeIn(vaut, shift=RIGHT * 0.15), rt=0.25)
            sc.au("45 000", FadeIn(n45, shift=RIGHT * 0.15), rt=0.3)
            sc.au("45 n'est", FadeIn(mais[0][0], shift=UP * 0.12), rt=0.3)
            sc.play(Create(sc.barrer(faux.m)), run_time=0.25)
            sc.au("n'est", FadeIn(mais[0][1], shift=UP * 0.12), rt=0.25)
            sc.au("entre", FadeIn(mais[1][0], shift=UP * 0.12), rt=0.2)
            sc.au("1 et", FadeIn(mais[1][1], shift=UP * 0.12), rt=0.2)
            sc.au("10.", FadeIn(mais[1][2], scale=1.3), rt=0.25)
            sc.insister(bon.m, 1.4, 0.25, about=bon.m.get_center())

        self.qpause("03q-question", "03r-reponse", ["Quelle est la notation", "scientifique de 45 000 ?"],
                    choix, plans, 1, ["Réponse B : 4,5 × 10⁴."], avant=avant, apres=apres)

    def barrer(self, m, couleur=WHITE):
        return Line(m.get_corner(DL) + P(-0.08, -0.05), m.get_corner(UR) + P(0.08, 0.05), color=couleur,
                    stroke_width=6)

    # ── 04 : petit nombre : le globule, la virgule qui avance de 6 rangs ───
    def ecran_petit(self):
        self.ecran("04-petit")
        tit = T("Pour un petit nombre", 42, JAUNE_TITRE).move_to(P(0, 3.15)).align_to(P(-6.3, 0), LEFT)
        self.au("Pour un", Write(tit), rt=0.6)
        glo = globule(0.42).move_to(P(-5.8, 2.2))
        lg = T("Le globule rouge :", 36).move_to(P(0, 2.2)).align_to(P(-5.15, 0), LEFT)
        self.au("Le globule", FadeIn(glo, scale=0.3), FadeIn(lg, shift=RIGHT * 0.2), rt=0.4)
        rg = Rangee("0000007", 0, fs=90, groupes=(3,), y=0.5)
        rg.shift(RIGHT * (-2.3 - rg.ch.get_center()[0]))
        m = T("mètre", 44).next_to(rg.ch, RIGHT, buff=0.8).align_to(rg.ch, DOWN)
        self.au("0,000", FadeIn(rg.ch[:4], shift=DOWN * 0.15), FadeIn(rg.virg), rt=0.4)
        self.au("007", FadeIn(rg.ch[4:], shift=DOWN * 0.15), rt=0.35)
        self.au("mètre", FadeIn(m, shift=LEFT * 0.15), rt=0.3)
        self.au("virgule", Indicate(rg.virg, color=EXPO_C, scale_factor=2.2), rt=0.4)
        self.au("avance")
        sauts = VGroup(*[self.saut(rg, k, k + 1, k + 1, rt=0.25) for k in range(5)])
        self.au("7 :", Indicate(rg.ch[6], color=VERT_OK, scale_factor=1.4), rt=0.3)
        s6 = self.saut(rg, 5, 6, None, rt=0.25, avec=[rg.ch[6].animate.set_color(VERT_OK)])
        six = T("6", 44, EXPO_C, audit=True).next_to(s6[0], UP, buff=0.05)
        rangs = T("6 rangs", 36, EXPO_C).next_to(rg.ch, DOWN, buff=0.3).align_to(rg.ch[1], LEFT)
        self.au("6 rangs", FadeIn(six, scale=1.6), FadeIn(rangs, shift=UP * 0.15), rt=0.35)
        self.insister(six, 1.5, 0.2, about=six.get_center())
        # plus petit que 1 → exposant négatif
        p1 = ligne_base(VGroup(T("Le nombre est plus petit que", 34), T("1 :", 34)).arrange(RIGHT, buff=0.18))
        p1.move_to(P(0, -1.15)).align_to(P(-5.9, 0), LEFT)
        p2 = ligne_base(VGroup(T("l'exposant est", 34), T("négatif.", 34, EXPO_C)).arrange(RIGHT, buff=0.18))
        p2.next_to(p1, RIGHT, buff=0.25).align_to(p1, DOWN)
        if p2.get_right()[0] > 6.4:
            p2.next_to(p1, DOWN, buff=0.15).align_to(p1, LEFT)
        self.au("Le nombre", FadeIn(p1[0], shift=RIGHT * 0.2), rt=0.35)
        self.au("1 :", FadeIn(p1[1], scale=1.3), rt=0.25)
        self.au("l'exposant", FadeIn(p2[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("négatif", FadeIn(p2[1], scale=1.3), rt=0.3)
        self.insister(p2[1], 1.3, 0.2)
        # 7 × 10⁻⁶ mètre
        res = notation("7", "−6", fs=80)
        res.m.set_color(VERT_OK)
        mt = T("mètre", 40)
        ligne_base(VGroup(res, mt).arrange(RIGHT, buff=0.35)).move_to(P(0, -2.85)).align_to(P(-5.9, 0), LEFT)
        mt.align_to(res.m, DOWN)
        self.au("7 fois", FadeIn(res.m, scale=1.3), FadeIn(res.x), rg.ch[:6].animate.set_opacity(0.3), rt=0.35)
        self.au("10 puissance", FadeIn(res.p.base, scale=1.3), rt=0.3)
        self.au("moins", FadeIn(res.p.moins, scale=1.8), Indicate(p2[1], color=EXPO_C), rt=0.3)
        self.au("6 mètre", ReplacementTransform(six.copy(), res.p.chif), FadeIn(mt, shift=LEFT * 0.15), rt=0.45)
        cad = self.encadrer(VGroup(res, mt), buff=0.18)
        self.play(Create(cad), run_time=0.3)
        self.insister(res.p.expo, 1.5, 0.2, about=res.p.expo.get_center())
        self.attendre_voix(marge=0.5)

    # ── 05 : le piège : le signe de l'exposant, deux colonnes ──────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = ligne_base(VGroup(T("Le piège :", 44, PIEGE), T("se tromper de signe", 44, JAUNE_TITRE)).arrange(RIGHT, buff=0.25))
        tit.move_to(P(-0.6, 3.15))
        self.au("Le piège", FadeIn(tit[0], shift=DOWN * 0.15), rt=0.35)
        self.au("se tromper", FadeIn(tit[1], shift=DOWN * 0.15), rt=0.35)
        cols = []
        for x, haut, ex, sg, mot, c in ((-3.35, ["Un grand", "nombre"], ("2,5", "9"), "+", "positif", VERT_OK),
                                       (2.85, ["Un nombre plus", "petit que", "1"], ("7", "−6"), "−", "négatif", EXPO_C)):
            cadre = RoundedRectangle(width=5.4, height=4.9, corner_radius=0.2, fill_color="#0b1220", fill_opacity=1,
                                     stroke_color=c, stroke_width=3).move_to(P(x, -0.05))
            l2 = ligne_base(VGroup(*[T(s, 40) for s in haut[1:]]).arrange(RIGHT, buff=0.18))  # « petit que » + « 1 » à son mot
            h = VGroup(T(haut[0], 40), l2).arrange(DOWN, buff=0.1).move_to(P(x, 1.65))
            nt = sans_audit(notation(*ex, fs=64)).move_to(P(x, 0.2))
            fl = Arrow(P(x, -0.35), P(x, -1.0), color=GREY_B, stroke_width=6, buff=0,
                       max_tip_length_to_length_ratio=0.3)
            rond = Circle(radius=0.38, stroke_color=c, stroke_width=5, fill_color="#0b1220", fill_opacity=1)
            signe = T(sg, 60, c, audit=False).move_to(rond)
            pastille = VGroup(rond, signe)
            e = ligne_base(VGroup(T("exposant", 31), T(mot, 31, c)).arrange(RIGHT, buff=0.16))
            ligne_base(VGroup(pastille, e).arrange(RIGHT, buff=0.3)).move_to(P(x, -1.65))
            cols.append((cadre, h, nt, fl, pastille, e))
        (c1, h1, n1, f1, s1, e1), (c2, h2, n2, f2, s2, e2) = cols
        self.au("Un grand", FadeIn(c1), FadeIn(h1[0], shift=DOWN * 0.15), rt=0.4)
        self.au("nombre", FadeIn(h1[1], shift=DOWN * 0.15), rt=0.3)
        self.au("exposant", FadeIn(n1, scale=0.8), GrowArrow(f1), FadeIn(e1[0], shift=RIGHT * 0.15), rt=0.4)
        self.au("positif", FadeIn(e1[1], scale=1.3), GrowFromCenter(s1), Indicate(n1.p.expo, color=VERT_OK), rt=0.4)
        self.au("Un nombre", FadeIn(c2), FadeIn(h2[0], shift=DOWN * 0.15), rt=0.4)
        self.au("petit", FadeIn(h2[1][0], shift=DOWN * 0.15), rt=0.3)
        self.au("1 a", FadeIn(h2[1][1], scale=1.3), rt=0.25)
        self.au("exposant", FadeIn(n2, scale=0.8), GrowArrow(f2), FadeIn(e2[0], shift=RIGHT * 0.15), rt=0.4)
        self.au("négatif", FadeIn(e2[1], scale=1.3), GrowFromCenter(s2), Indicate(n2.p.expo, color=EXPO_C), rt=0.4)
        self.play(s1.animate.scale(1.3), s2.animate.scale(1.3), run_time=0.25)
        self.play(s1.animate.scale(1 / 1.3), s2.animate.scale(1 / 1.3), run_time=0.25)
        self.attendre_voix(marge=0.5)

    # ── 05q : QUESTION 2 (0,003) ────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        rg = Rangee("0003", 0, fs=110, y=1.9)
        rg.shift(RIGHT * (-3.5 - rg.ch.get_center()[0]))
        pp = ligne_base(VGroup(T("plus petit que", 36), T("1", 36)).arrange(RIGHT, buff=0.18)).move_to(P(-3.5, 0.15))
        ex = ligne_base(VGroup(T("l'exposant est", 36), T("négatif", 36, EXPO_C)).arrange(RIGHT, buff=0.18)).move_to(P(-3.5, -0.5))
        trois = T("3e place après la virgule", 30, VERT_OK, audit=False).move_to(P(-3.5, -1.5))
        choix = [notation("3", "3", fs=40), notation("3", "−3", fs=40), notation("0,3", "−2", fs=40)]
        plans = [[("3 fois", [choix[0].m, choix[0].x]), ("10 puissance", [choix[0].p.base]), ("3.", [choix[0].p.expo])],
                 [("3 fois", [choix[1].m, choix[1].x]), ("10 puissance", [choix[1].p.base]),
                  ("moins", [choix[1].p.moins]), ("3.", [choix[1].p.chif])],
                 [("0,3", [choix[2].m]), ("fois", [choix[2].x]), ("10 puissance", [choix[2].p.base]),
                  ("moins", [choix[2].p.moins]), ("2.", [choix[2].p.chif])]]

        def avant(sc, q):
            sc.poser_mots(q[0], [("Quelle", "Quelle")])
            sc.poser_mots(q[1], [("scientifique", "scientifique"), ("0,003", "0,003")],
                          avec={1: [FadeIn(rg, scale=1.2)]})

        def apres(sc):
            lg = sc.rep_nota(0, "Réponse B :", "3", "−3")
            sc.au("B :", FadeIn(lg.pre, shift=UP * 0.12), rt=0.25)
            sc.au("3 fois", FadeIn(lg.nt.m, lg.nt.x, shift=UP * 0.12), rt=0.25)
            sc.au("10 puissance", FadeIn(lg.nt.p.base, shift=UP * 0.12), rt=0.25)
            sc.au("moins", FadeIn(lg.nt.p.moins, scale=1.5), rt=0.2)
            sc.au("3.", FadeIn(lg.nt.p.chif, lg.pt, shift=UP * 0.12), rt=0.3)
            sc.pieges(0, 2)
            sc.au("0,003", Indicate(rg, color=WHITE, scale_factor=1.12), rt=0.4)
            sc.au("plus", FadeIn(pp[0], shift=UP * 0.12), rt=0.3)
            sc.au("1 :", FadeIn(pp[1], scale=1.3), rt=0.25)
            sc.au("l'exposant", FadeIn(ex[0], shift=UP * 0.12), rt=0.3)
            sc.au("négatif", FadeIn(ex[1], scale=1.3), Indicate(lg.nt.p.expo, color=EXPO_C), rt=0.35)
            sc.au("Le 3", rg.ch[3].animate.set_color(VERT_OK), rt=0.3)
            sc.au("troisième")
            for k in range(3):
                sc.saut(rg, k, k + 1, k + 1, rt=0.22, fs_c=34)
            sc.au("place", FadeIn(trois, shift=UP * 0.12), rg.ch[:3].animate.set_opacity(0.3), rt=0.35)
            sc.insister(rg.ch[3], 1.4, 0.2, about=rg.ch[3].get_center())

        self.qpause("05q-question", "05r-reponse", ["Quelle est la notation", "scientifique de 0,003 ?"],
                    choix, plans, 1, ["Réponse B : 3 × 10⁻³."], avant=avant, apres=apres)

    # ── 06 : défi : le grain de pollen, la Chine ───────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("À toi", Write(tit), rt=0.6)
        bot = botaniste(0.55).move_to(P(-5.85, 1.05))
        grain = pollen(0.07).move_to(bot.get_right() + P(0.12, -0.1))
        po = pollen(0.42)
        lp = loupe_sur(P(-3.75, 1.45), 0.72, po, grain.get_top(), grain.get_right())
        l1 = VGroup(T("Une botaniste mesure", 34, CIEL), T("un grain de pollen :", 34)).arrange(DOWN, aligned_edge=LEFT,
                                                                                               buff=0.12)
        self.col(l1, 1.95, xl=-2.55)
        self.au("Une botaniste", FadeIn(bot, shift=UP * 0.3), FadeIn(l1[0], shift=RIGHT * 0.2), rt=0.4)
        self.au("un grain", FadeIn(grain, scale=0.3), Create(lp.traits), GrowFromCenter(lp.rond),
                FadeIn(l1[1], shift=RIGHT * 0.2), rt=0.45)
        self.play(FadeIn(po, scale=0.3), run_time=0.35)
        l2 = ligne_base(VGroup(T("0,000 03", 50, EXPO_C), T("mètre", 40)).arrange(RIGHT, buff=0.25))
        l2[1].align_to(l2[0], DOWN)
        self.col(l2, 1.0, xl=-2.55)
        self.au("0,000", FadeIn(l2[0], scale=0.6), rt=0.35)
        self.au("mètre", FadeIn(l2[1], shift=LEFT * 0.15), rt=0.3)
        ch = chine(0.66).move_to(P(-4.6, -1.35))
        foule = VGroup(*[silhouette(s=0.8).move_to(d.get_center()) for d in ch.pts])
        l3 = T("La Chine compte environ", 34, CIEL)
        self.col(l3, -0.15, xl=-2.55)
        l4 = ligne_base(VGroup(T("1 400 000 000", 50, BASE_C, audit=False), T("habitants", 40)).arrange(RIGHT, buff=0.25))
        l4[1].align_to(l4[0], DOWN)
        self.col(l4, -0.9, xl=-2.55)
        self.au("La Chine", FadeIn(ch, scale=0.8), FadeIn(l3, shift=RIGHT * 0.2), rt=0.45)
        self.au("compte", LaggedStart(*[FadeIn(f, scale=0.3) for f in foule], lag_ratio=0.1), rt=0.9)
        self.au("1 400", FadeIn(l4[0], scale=1.2), rt=0.35)
        self.play(FadeIn(l4[1], shift=LEFT * 0.15), run_time=0.3)
        l5 = VGroup(T("Écris ces deux nombres", 34), T("en notation scientifique.", 34)).arrange(DOWN, aligned_edge=LEFT,
                                                                                               buff=0.12)
        self.col(l5, -1.95, xl=-2.55)
        self.au("Écris", FadeIn(l5, shift=RIGHT * 0.2), rt=0.4)
        self.au("Mets pause")
        pz = self.col(T("Mets pause, et cherche !", 34, ORANGE_RETENUE), -3.0, xl=-2.55)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    # ── 06b : correction : les deux sauts de virgule ───────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction", 0.5)
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("Correction", Write(tit), rt=0.5)
        # 0,000 03 : la virgule avance de 5 rangs → 3 × 10⁻⁵
        r1 = Rangee("000003", 0, fs=76, groupes=(3,), y=1.3)
        r1.shift(RIGHT * (-6.2 - r1.ch.get_left()[0]))
        self.au("0,000", FadeIn(r1.ch[:4], shift=DOWN * 0.15), FadeIn(r1.virg), rt=0.35)
        self.au("03", FadeIn(r1.ch[4:], shift=DOWN * 0.15), rt=0.3)
        self.au("virgule")
        for k in range(4):
            self.saut(r1, k, k + 1, k + 1, rt=0.24, fs_c=26)
        self.au("5 rangs")
        s5 = self.saut(r1, 4, 5, 5, rt=0.24, fs_c=38)
        self.au("le 3", r1.ch[5].animate.set_color(VERT_OK), Indicate(r1.ch[5], color=VERT_OK, scale_factor=1.4), rt=0.4)
        n1 = notation("3", "−5", fs=70)
        n1.m.set_color(VERT_OK)
        m1 = T("mètre", 38)
        g1 = ligne_base(VGroup(n1, m1).arrange(RIGHT, buff=0.3))
        m1.align_to(n1.m, DOWN)
        g1.move_to(P(0, 1.3)).align_to(P(1.0, 0), LEFT)
        g1.shift(UP * (r1.bas - n1.m.get_bottom()[1]))
        self.au("3 fois", FadeIn(n1.m, scale=1.3), FadeIn(n1.x), r1.ch[:5].animate.set_opacity(0.3), rt=0.35)
        self.au("10 puissance", FadeIn(n1.p.base, scale=1.3), rt=0.3)
        self.au("moins", FadeIn(n1.p.moins, scale=1.8), rt=0.25)
        self.au("5 mètre", ReplacementTransform(s5[1].copy(), n1.p.chif), FadeIn(m1, shift=LEFT * 0.15), rt=0.4)
        self.play(Create(self.encadrer(g1, buff=0.15)), run_time=0.3)
        # 1 400 000 000 : la virgule recule de 9 rangs → 1,4 × 10⁹
        r2 = Rangee("1400000000", 9, fs=76, groupes=(0, 3, 6), y=-0.85)
        r2.shift(RIGHT * (-6.2 - r2.ch.get_left()[0]))
        self.au("1 400", FadeIn(r2, shift=DOWN * 0.15), rt=0.45)
        self.au("la virgule")
        for n in range(1, 9):
            self.saut(r2, 10 - n, 9 - n, n, rt=0.15, fs_c=26)
        self.au("9 rangs")
        s9 = self.saut(r2, 1, 0, 9, rt=0.24, fs_c=38)
        self.au("le 1", r2.ch[0].animate.set_color(VERT_OK), r2.ch[1].animate.set_color(VERT_OK),
                Indicate(r2.ch[0], color=VERT_OK, scale_factor=1.4), rt=0.4)
        n2 = notation("1,4", "9", fs=70)
        n2.m.set_color(VERT_OK)
        h2 = T("habitants", 38)
        g2 = ligne_base(VGroup(n2, h2).arrange(RIGHT, buff=0.3)).move_to(P(0, -2.5)).align_to(P(-6.0, 0), LEFT)
        h2.align_to(n2.m, DOWN)
        self.au("1,4", FadeIn(n2.m, scale=1.3), r2.ch[2:].animate.set_opacity(0.3), rt=0.35)
        self.au("fois", FadeIn(n2.x), rt=0.25)
        self.au("10 puissance", FadeIn(n2.p.base, scale=1.3), rt=0.3)
        self.au("9 habitants", ReplacementTransform(s9[1].copy(), n2.p.chif), FadeIn(h2, shift=LEFT * 0.15), rt=0.4)
        self.play(Create(self.encadrer(g2, buff=0.15)), run_time=0.3)
        self.play(n1.p.expo.animate.scale(1.4), n2.p.expo.animate.scale(1.4), run_time=0.25)
        self.play(n1.p.expo.animate.scale(1 / 1.4), n2.p.expo.animate.scale(1 / 1.4), run_time=0.25)
        self.attendre_voix(marge=0.5)

    # ── 07 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        X0 = -6.0
        l0 = T("La notation scientifique :", 38, CIEL).move_to(P(0, 2.2)).align_to(P(X0, 0), LEFT)
        self.au("La notation", FadeIn(l0, shift=RIGHT * 0.2), rt=0.35)
        c1 = self.coche()
        m1 = ligne_base(VGroup(T("un nombre entre", 34, VERT_OK), T("1 et", 34, VERT_OK), T("10", 34, VERT_OK), T("×", 36),
                    T("une puissance de", 34, BASE_C), T("10", 34, BASE_C)).arrange(RIGHT, buff=0.15))
        m1[3].shift(RIGHT * 0.1)
        m1[4:].shift(RIGHT * 0.2)
        l1 = ligne_base(VGroup(c1, m1).arrange(RIGHT, buff=0.3)).move_to(P(0, 1.4)).align_to(P(X0, 0), LEFT)
        self.au("un nombre", Create(c1), FadeIn(m1[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("1 et", FadeIn(m1[1], shift=RIGHT * 0.15), rt=0.2)
        self.au("10,", FadeIn(m1[2], scale=1.3), rt=0.2)
        self.au("fois", FadeIn(m1[3], scale=1.4), rt=0.2)
        self.au("une puissance", FadeIn(m1[4], shift=RIGHT * 0.15), rt=0.3)
        self.au("10.", FadeIn(m1[5], scale=1.3), rt=0.25)
        lignes = []
        for y, debut, mots, sg, c in ((0.2, ["Grand nombre :"], ("positif.",), "+", VERT_OK),
                                      (-1.0, ["Nombre plus petit que", "1 :"], ("négatif.",), "−", EXPO_C)):
            ck = self.coche()
            d = ligne_base(VGroup(*[T(s, 34) for s in debut]).arrange(RIGHT, buff=0.15))
            e = ligne_base(VGroup(T("exposant", 34), T(mots[0], 34, c)).arrange(RIGHT, buff=0.15))
            rond = Circle(radius=0.28, stroke_color=c, stroke_width=4)
            sgn = T(sg, 44, c, audit=False).move_to(rond)
            past = VGroup(rond, sgn)
            lg = ligne_base(VGroup(ck, d, e, past).arrange(RIGHT, buff=0.3)).move_to(P(0, y)).align_to(P(X0, 0), LEFT)
            lignes.append((ck, d, e, past))
        ck, d, e, past = lignes[0]
        self.au("Grand", Create(ck), FadeIn(d, shift=RIGHT * 0.15), rt=0.35)
        self.au("exposant", FadeIn(e[0], shift=RIGHT * 0.15), rt=0.25)
        self.au("positif", FadeIn(e[1], scale=1.3), GrowFromCenter(past), rt=0.3)
        ck, d, e, past = lignes[1]
        self.au("Nombre", Create(ck), FadeIn(d[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("1 :", FadeIn(d[1], scale=1.3), rt=0.2)
        self.au("exposant", FadeIn(e[0], shift=RIGHT * 0.15), rt=0.25)
        self.au("négatif", FadeIn(e[1], scale=1.3), GrowFromCenter(past), rt=0.3)
        ep = VGroup(ligne_base(VGroup(T("Épisode 6 :", 34, JAUNE_TITRE), T("comparer deux nombres", 34)).arrange(RIGHT, buff=0.22)),
                    T("en notation scientifique", 34))
        ep.arrange(DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(0, -2.45)).align_to(P(X0, 0), LEFT)
        ep = VGroup(ep[0][0], ep[0][1], ep[1])
        self.au("6 t'attend", FadeIn(ep[0], shift=UP * 0.15), rt=0.35)
        self.au("comparer", FadeIn(ep[1], shift=UP * 0.15), rt=0.35)
        self.au("en notation", FadeIn(ep[2], shift=UP * 0.15), rt=0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_forme()
        self.ecran_grand()
        self.ecran_question1()
        self.ecran_petit()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class PuissanceNotationScientifique4e(PuissanceNotationScientifiqueBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"


class PuissanceNotationScientifique3e(PuissanceNotationScientifiqueBase):
    identite = "Maths 3e — EleveAI"
    ceinture = "jaune"


class PuissanceNotationScientifique2de(PuissanceNotationScientifiqueBase):
    identite = "Maths 2de — EleveAI"
    ceinture = "jaune"
