# fin_commune.py
# EleveAI — LA FIN COMMUNE de toutes les vidéos Manim (paysage ET short).
#
# ── POURQUOI CE MODULE EXISTE (Frédéric, 21/11/2026) ─────────────────────────
# « Il réécrit toujours la fin du short, là où il y a eleveai.fr puis commentaire.
# Ce serait pas bien de faire un script commun à tous ? Ce serait fait. »
# Le 21/11, on comptait ~294 copies de « Entraîne-toi sur » dans manim/, avec des
# écarts : un short du 18/11 sans « Un pouce · La cloche », des fins avec Flash
# (l'étoile posée sur le texte, retirée le 11/11), des tailles qui frôlent les bords.
# ⛔ Toute NOUVELLE vidéo appelle `ecran_fin()` d'ici. On ne réécrit plus la fin.
# Les vidéos déjà rendues gardent la leur (pas de re-rendu pour ça).
#
# ── CE QUI EST FIGÉ ICI (ne pas « améliorer » sans Frédéric) ──────────────────
# Le style est celui de l'écran « PARFAIT » du 24/10, avec les gestes du 05/11,
# tel que `scripts/premiere/suites_commun.py` (`fin`, `fin_short`) l'a posé le
# 11/11 : mêmes tailles, mêmes places, mêmes couleurs, mêmes animations.
#   · Paysage : « Entraîne-toi sur » / « eleveai.fr » encadré / « Abonne-toi ! » /
#     « @eleveai974 » / « Un pouce · Un commentaire · La cloche » ; Ti-Margo 0,9
#     en bas à droite.
#   · Short : la même chose aux tailles du téléphone, « Un pouce · La cloche »,
#     Ti-Margo dans la bande basse (0,38, y = −3,45).
#   · Chaque mot apparaît quand la voix le dit (0 s d'avance, REGLES.md 24/10) ;
#     la poignée finit sur un Indicate (plus de Flash depuis le 11/11).
#   · La voix est la phrase de fin de REGLES.md (tête du fichier) : PHRASE_PAYSAGE
#     ou PHRASE_SHORT, sous la clé `…-abonne`.
#
# ── LA QUESTION EN COMMENTAIRE (short) ────────────────────────────────────────
# `ecran_commentaire()` pose l'écran « Et toi ? … Réponds en commentaire ! » qui
# précède la fin d'un short. ⛔ Pas de Ti-Margo sur cet écran (17/11 : sa tête
# couvrait une lettre de « @eleveai974 ») ; il revient sur l'écran de fin.
# Un script qui dessine sa propre question garde son dessin et n'appelle que
# `appel_commentaire()` pour les deux lignes du bas.
#
# ── COMMENT S'EN SERVIR ───────────────────────────────────────────────────────
#   from fin_commune import ecran_fin, ecran_commentaire, appel_commentaire
#
#   # paysage, à la toute fin de construct() :
#   ecran_fin(self, "paysage", voix="12-abonne")
#   # short :
#   ecran_commentaire(self, ["Combien vaut", "u₅ ?"], voix="04-commentaire")
#   ecran_fin(self, "short", voix="05-abonne")
#
# La scène doit avoir `dire(cle)` (tous les gabarits l'ont : il lance le WAV et
# renvoie sa durée). Le calage se fait avec `scene.au_mot()` quand la scène en a
# un, sinon au prorata des caractères de la phrase (même calcul que gabarit_sixieme).
# Sans voix (`voix=None`), l'écran dure `duree` secondes (aperçu muet).
# Fonctionne pour toute scène Manim : la taille du cadre (16:9 ou 4,5 × 8) est lue
# dans `config`, le format est dit par l'argument.

import wave

from manim import *

from charte import BLEU_CALCUL, JAUNE_TITRE, VERT_OK
from mascotte import MascotteMargouillat

PHRASE_PAYSAGE = ("Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, "
                  "laisse un commentaire, abonne-toi et active la cloche !")
PHRASE_SHORT = "Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !"

GRIS_POINT = "#94a3b8"

# Les places et les tailles validées (suites_commun.py, 11/11/2026). Ne pas toucher.
_STYLE = {
    "paysage": dict(
        entraine=(46, 2.45), site=(62, 1.4), buff_cadre=0.26, abonne=(44, -0.15), poignee=(48, -1.1),
        gestes=("Un pouce", "Un commentaire", "La cloche"), fs_gestes=32, y_gestes=-2.35, buff_gestes=0.22,
        rt=dict(entraine=0.6, site=0.6, geste=0.25, abonne=0.4, indicate=0.5), marge=1.4,
        largeur=12.6,
    ),
    "short": dict(
        entraine=(40, 2.5), site=(54, 1.55), buff_cadre=0.2, abonne=(42, 0.1), poignee=(44, -0.72),
        gestes=("Un pouce", "La cloche"), fs_gestes=26, y_gestes=-1.95, buff_gestes=0.16,
        rt=dict(entraine=0.35, site=0.4, geste=0.22, abonne=0.3, indicate=0.45), marge=1.0,
        largeur=4.1,
    ),
}


def _P(x, y):
    return np.array([x, y, 0.0])


def _texte(s, fs, couleur=WHITE, largeur=None, audit=True):
    """Un texte de l'écran de fin, jamais plus large que la zone utile."""
    t = Text(s, font_size=fs, color=couleur)
    if largeur and t.width > largeur:
        t.scale_to_fit_width(largeur)
    if not audit:  # « @eleveai974 » : la voix ne dit pas 974 (AuditSynchro)
        for f in t.get_family():
            f._pas_audit = True
    return t


def _est_mascotte(m):
    return type(m).__name__.startswith("Mascotte")


def mascotte_fin(format="paysage"):
    """Ti-Margo à sa place de fin : 0,9 en bas à droite (paysage), bande basse (short)."""
    if format == "short":
        return MascotteMargouillat().scale(0.38).move_to(_P(0, -3.45))
    return MascotteMargouillat().scale(0.9).to_corner(DOWN + RIGHT, buff=0.35)


# ── la voix et le calage ─────────────────────────────────────────────────────

class _Calage:
    """Lance la voix, puis attend chaque mot comme le fait `au_mot`."""

    def __init__(self, scene, voix, dossier, phrase, duree):
        self.scene = scene
        self.phrase = phrase
        self.duree = 0.0
        if voix is not None:
            if dossier is not None:
                d = scene.dire(voix, dossier)
            else:
                d = scene.dire(voix)
            self.duree = float(d or 0.0)
            if not self.duree:
                print(f"⚠️ fin_commune : la voix « {voix} » est introuvable ou muette", flush=True)
        self.muet = not self.duree
        if self.muet:
            self.duree = duree
        self.t0 = scene.renderer.time
        # au_mot de la scène seulement si sa voix est bien celle de la fin
        texte = getattr(scene, "_texte_voix", "") or ""
        self.au_mot_scene = (not self.muet and hasattr(scene, "au_mot") and "pouce" in texte)

    def au(self, extrait):
        if self.au_mot_scene:
            try:
                self.scene.au_mot(extrait)
                return
            except ValueError:
                pass
        i = self.phrase.find(extrait)
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la phrase de fin")
        cible = self.t0 + self.duree * i / len(self.phrase)
        reste = cible - self.scene.renderer.time
        if reste > 0.05:
            self.scene.wait(reste)

    def finir(self, marge):
        fin = self.t0 + self.duree + (marge if not self.muet else 0.0)
        reste = fin - self.scene.renderer.time
        self.scene.wait(max(reste, marge if not self.muet else 0.1))


def _effacer(scene, garder, garder_mascotte, run_time=0.25):
    """L'ancien écran disparaît AVANT le nouveau (REGLES.md : pas de chevauchement)."""
    vieux = [m for m in scene.mobjects if m not in garder and not (garder_mascotte and _est_mascotte(m))]
    for m in vieux:
        m.clear_updaters()
    if vieux:
        scene.play(*[FadeOut(m) for m in vieux], run_time=run_time)
        scene.remove(*vieux)


# ── l'écran de fin ───────────────────────────────────────────────────────────

def ecran_fin(scene, format="paysage", voix=None, dossier=None, garder=(), mascotte=True,
              couleur_titre=JAUNE_TITRE, couleur_site=BLEU_CALCUL, couleur_abonne=VERT_OK,
              phrase=None, duree=None, marge=None):
    """L'écran « Entraîne-toi sur eleveai.fr » + abonnement + gestes, voix calée.

    format         : "paysage" (16:9) ou "short" (9:16, cadre 4,5 × 8).
    voix, dossier  : la clé du WAV (`…-abonne`) passée à `scene.dire` ; None = muet.
    garder         : des objets à laisser à l'écran (rare).
    mascotte       : Ti-Margo à sa place de fin. En short, un Ti-Margo déjà dans la
                     bande basse reste en place (pas de clignotement).
    couleur_*      : les couleurs de la charte par défaut (celles du 24/10).
    phrase         : le texte de la voix, si elle n'est pas la phrase standard.
    duree          : la durée de l'écran sans voix (aperçu muet).
    marge          : le temps tenu après la voix (1,4 s paysage, 1,0 s short).
    Renvoie le VGroup de l'écran.
    """
    if format not in _STYLE:
        raise ValueError("format = « paysage » ou « short »")
    st = _STYLE[format]
    short = format == "short"
    phrase = phrase or (PHRASE_SHORT if short else PHRASE_PAYSAGE)
    marge = st["marge"] if marge is None else marge
    cal = _Calage(scene, voix, dossier, phrase, duree or (6.0 if short else 8.5))

    garder_margo = mascotte and short and any(_est_mascotte(m) for m in scene.mobjects)
    _effacer(scene, list(garder), garder_margo)
    if mascotte and not garder_margo:
        scene.add(mascotte_fin(format))

    L = st["largeur"]
    fs, y = st["entraine"]
    entraine = _texte("Entraîne-toi sur", fs, couleur_titre, L).move_to(_P(0, y))
    fs, y = st["site"]
    site = _texte("eleveai.fr", fs, couleur_site, L).move_to(_P(0, y))
    cadre = SurroundingRectangle(site, color=couleur_site, buff=st["buff_cadre"], stroke_width=3)
    fs, y = st["abonne"]
    abonne = _texte("Abonne-toi !", fs, couleur_abonne, L).move_to(_P(0, y))
    fs, y = st["poignee"]
    poignee = _texte("@eleveai974", fs, couleur_abonne, L, audit=False).move_to(_P(0, y))

    gestes = [_texte(g, st["fs_gestes"]) for g in st["gestes"]]
    points = [_texte("·", st["fs_gestes"], GRIS_POINT) for _ in gestes[1:]]
    morceaux = [gestes[0]]
    for p, g in zip(points, gestes[1:]):
        morceaux += [p, g]
    ligne = VGroup(*morceaux).arrange(RIGHT, buff=st["buff_gestes"])
    if ligne.width > L:
        ligne.scale_to_fit_width(L)
    ligne.move_to(_P(0, st["y_gestes"]))
    for g in gestes[1:]:
        g.align_to(gestes[0], UP)

    rt = st["rt"]
    cal.au("Entraîne-toi")
    scene.play(Write(entraine), run_time=rt["entraine"])
    cal.au("éleveai")
    scene.play(GrowFromCenter(site), Create(cadre), run_time=rt["site"])
    cal.au("pouce")
    scene.play(FadeIn(gestes[0], scale=1.3), run_time=rt["geste"])
    if not short:
        cal.au("commentaire")
        scene.play(FadeIn(points[0]), FadeIn(gestes[1], scale=1.3), run_time=rt["geste"])
    cal.au("abonne-toi")
    scene.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=rt["abonne"])
    cal.au("cloche")
    scene.play(FadeIn(points[-1]), FadeIn(gestes[-1], scale=1.3), run_time=rt["geste"])
    scene.play(Indicate(poignee, color=couleur_abonne, scale_factor=1.12), run_time=rt["indicate"])
    cal.finir(marge)
    return VGroup(entraine, site, cadre, abonne, poignee, ligne)


# ── la question en commentaire (short) ───────────────────────────────────────

def appel_commentaire(scene, y=-1.0, fs=44, couleur=VERT_OK, extrait="Réponds en commentaire", animer=True):
    """« Réponds en / commentaire ! » en gros, sur deux lignes, centré en y.

    Pour un short qui dessine sa propre question : cale l'apparition sur
    `extrait` (via scene.au_mot si elle existe), puis insiste (× 1,08).
    ⚠️ Rien de vital sous y = −2,2 (zone sûre des Reels) : y = −1,0 par défaut.
    """
    L = config.frame_width * 0.91 / 1.08  # il grandit de 8 % quand on insiste
    lignes = VGroup(Text("Réponds en", font_size=fs, color=couleur),
                    Text("commentaire !", font_size=fs, color=couleur)).arrange(DOWN, buff=0.08)
    if lignes.width > L:
        lignes.scale_to_fit_width(L)
    lignes.move_to(_P(0, y))
    if not animer:
        return lignes
    if extrait and hasattr(scene, "au_mot") and extrait in (getattr(scene, "_texte_voix", "") or ""):
        scene.au_mot(extrait)
    scene.play(FadeIn(lignes, scale=0.7), run_time=0.4)
    scene.play(lignes.animate.scale(1.08), run_time=0.25)
    scene.play(lignes.animate.scale(1 / 1.08), run_time=0.25)
    return lignes


def ecran_commentaire(scene, question, voix=None, dossier=None, titre="Et toi ?", texte_voix=None,
                      couleur_titre=JAUNE_TITRE, couleur_question=WHITE, fs_question=44,
                      duree=None, marge=0.6):
    """L'écran de la question en commentaire, juste avant `ecran_fin(…, "short")`.

    question   : une chaîne (« \\n » pour couper) ou une liste de lignes ; chaque
                 ligne peut être (texte, couleur). Un calcul à UNE réponse, chiffré
                 (REGLES.md, 09/10), dont on a vérifié la réponse.
    voix       : la clé du WAV (`04-commentaire`…) ; la voix finit par
                 « Réponds en commentaire ! ».
    texte_voix : le texte de la voix, pour caler sans `au_mot` (sinon : la question
                 au début, l'appel aux deux tiers).
    ⛔ Pas de Ti-Margo sur cet écran (17/11) : il est retiré, l'écran de fin le remet.
    """
    duree_v = 0.0
    if voix is not None:
        duree_v = float((scene.dire(voix, dossier) if dossier is not None else scene.dire(voix)) or 0.0)
    t0 = scene.renderer.time
    total = duree_v or duree or 5.0
    texte = texte_voix or (getattr(scene, "_texte_voix", "") or "")
    a_au_mot = bool(duree_v) and hasattr(scene, "au_mot") and "commentaire" in texte and not texte_voix

    def attendre_fraction(fr):
        reste = t0 + total * fr - scene.renderer.time
        if reste > 0.05:
            scene.wait(reste)

    def au(extrait, repli):
        if a_au_mot and extrait in texte:
            scene.au_mot(extrait)
        elif texte and extrait in texte:
            attendre_fraction(texte.find(extrait) / len(texte))
        else:
            attendre_fraction(repli)

    _effacer(scene, [], False)  # Ti-Margo compris (17/11)

    L = config.frame_width * 0.91
    tit = _texte(titre, 52, couleur_titre, L).move_to(_P(0, 2.6)) if titre else None
    lignes = question.split("\n") if isinstance(question, str) else list(question)
    ts = []
    for l in lignes:
        s, c = (l, couleur_question) if isinstance(l, str) else l
        ts.append(Text(s, font_size=fs_question, color=c))
    q = VGroup(*ts).arrange(DOWN, buff=0.18)
    if q.width > L:
        q.scale_to_fit_width(L)
    q.move_to(_P(0, 1.0))

    if tit is not None:
        au(titre.rstrip(" ?!"), 0.0)
        scene.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.35)
    au(lignes[0] if isinstance(lignes[0], str) else lignes[0][0], 0.1)
    scene.play(LaggedStart(*[FadeIn(t, shift=UP * 0.1) for t in ts], lag_ratio=0.35), run_time=0.6)
    au("Réponds en commentaire", 0.66)
    appel = appel_commentaire(scene, y=-1.0, extrait=None)
    reste = t0 + total + (marge if duree_v else 0.0) - scene.renderer.time
    scene.wait(max(reste, marge))
    return VGroup(*([tit] if tit is not None else []), q, appel)


def duree_wav(chemin):
    """La durée d'un WAV, en secondes (pour régler `duree` d'un aperçu)."""
    with wave.open(str(chemin), "rb") as w:
        return w.getnframes() / float(w.getframerate())
