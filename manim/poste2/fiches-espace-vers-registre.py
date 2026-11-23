# manim/poste2/fiches-espace-vers-registre.py
# LES FICHES DE LA SÉRIE « ESPACE » → LE REGISTRE DE PUBLICATION, SANS RECOPIE À LA MAIN.
#
#   python -X utf8 manim/poste2/fiches-espace-vers-registre.py            # contrôle seul
#   python -X utf8 manim/poste2/fiches-espace-vers-registre.py --ecrire   # écrit le registre
#
# ⭐⭐ POURQUOI CET OUTIL EXISTE (23/11/2026)
# Les douze entrées de la série étaient tenues À LA MAIN dans
# `manim/poste2/FICHES-YOUTUBE-espace-terminale.md`, à côté de
# `manim/manifeste-youtube.json` qui n'en portait AUCUNE. Mesuré le 22/11 : 1 707 vidéos
# au registre, 0 « espace ». Neuf vidéos existaient en HD et n'atteignaient personne —
# le coach ne les proposait à aucun élève, et rien nulle part ne le signalait.
# ⛔ Une liste tenue à la main à côté d'un registre, c'est l'accident déjà arrivé trois
# fois dans ce dépôt. Le .md reste la source RÉDIGÉE (titre, accroche, chapitres : c'est
# du texte que Frédéric relit), et cet outil fait le report, qui est mécanique.
#
# ⛔⛔ CE QU'IL NE DEVINE JAMAIS, ET VA CHERCHER AILLEURS :
#   · la LETTRE de la bonne réponse et l'instant de chaque question-pause viennent du
#     JOURNAL DU RENDU HD (`QUESTION 04 t=01:29 (89.35) reponse=B`), c'est-à-dire de
#     l'écran réellement rendu — pas d'une table recopiée ;
#   · le TEXTE des questions et des trois choix vient de la VOIX (`manim/voix/*.json`),
#     mot pour mot, puisque c'est elle que l'élève entend ;
#   · l'EXPLICATION vient de la première phrase du clip de réponse.
#   Et les trois sources (voix, écran rendu, table du .md) sont CONFRONTÉES : si elles ne
#   disent pas la même lettre, l'outil refuse d'écrire. C'est le contrôle que la note de
#   reprise réclame depuis E1, et il n'avait jamais été exécuté sur les neuf à la fois.
#
# ⚠️ Il n'écrit QUE les clés `terminale-espace-*` et `terminale-ps-espace-*`. Le registre
# est partagé : le commit se fait ensuite par clés (`manim/outils-commit-cles.py`).
# ⛔ Règles du registre (`_lisez_moi`) vérifiées ici : pas de chevrons < > dans une
# description (YouTube les refuse), pas du mot « enseignant ».

import json
import re
import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
RACINE = Path(__file__).resolve().parents[2]
FICHES = RACINE / "manim" / "poste2" / "FICHES-YOUTUBE-espace-terminale.md"
VOIX_MD = RACINE / "manim" / "poste2" / "VOIX-espace-terminale.md"
REGISTRE = RACINE / "manim" / "manifeste-youtube.json"
PREFIXES = ("terminale-espace-", "terminale-ps-espace-")

# ⚠️ Le nom du journal de rendu ne se déduit PAS du slug (`espace-repere-coordonnees` est
# rendu sous `media-hd-espace-repere`). La table est donc explicite, et l'outil échoue
# bruyamment si un journal manque plutôt que d'écrire une entrée sans ses questions.
JOURNAUX = {
    "terminale-espace-vecteurs": "media-hd-espace-vecteurs",
    "terminale-espace-repere-coordonnees": "media-hd-espace-repere",
    "terminale-espace-droite-parametrique": "media-hd-espace-droite",
    "terminale-espace-plan-equation": "media-hd-espace-plan",
    "terminale-espace-position-relative": "media-hd-espace-position",
    "terminale-espace-defi": "media-hd-espace-defi",
    "terminale-ps-espace-calculer": "media-hd-ps-espace-calculer",
    "terminale-ps-espace-orthogonalite": "media-hd-ps-espace-orthogonalite",
    "terminale-ps-espace-norme-distance": "media-hd-ps-espace-norme-distance",
    "terminale-ps-espace-angle": "media-hd-ps-espace-angle",
    "terminale-ps-espace-plan-normal": "media-hd-ps-espace-plan-normal",
    "terminale-ps-espace-defi": "media-hd-ps-espace-defi",
}
SERIE_TITRE = "Géométrie dans l'espace"
TOTAL_SERIE = 12
ennuis = []


def coach(e):
    """Le lien du coach vers LA micro-compétence de l'épisode — déterministe."""
    return (f"https://www.eleveai.fr/coach/serie?classe={e['classe']}&matiere=maths"
            f"&notion={e['notionId']}&microId={e['microId']}&display=simple")


# ── 1. les fiches rédigées : le bloc JSON, l'accroche, les chapitres ───────────
def lire_fiches():
    src = FICHES.read_text(encoding="utf-8")
    # Une fiche va d'un « ## E<n> · `<id>` » au suivant.
    coupes = [m for m in re.finditer(r"^## (E\d+)[^\n]*$", src, re.M)]
    fiches = []
    for i, m in enumerate(coupes):
        bloc = src[m.end():coupes[i + 1].start() if i + 1 < len(coupes) else len(src)]
        j = re.search(r"```json\n(.*?)\n```", bloc, re.S)
        if not j:
            continue                      # « E10 à E12 » : pas encore de rendu
        fiches.append((m.group(1), json.loads(j.group(1)),
                       accroche(bloc), chapitres(bloc)))
    return fiches


def accroche(bloc):
    """Le bloc de citation « > … » de la fiche, rendu en description YouTube.

    ⚠️ Les retours à la ligne du .md sont de la MISE EN PAGE, pas du texte : une phrase
    y est coupée à 90 colonnes, et une puce se continue sur une ligne indentée. Recopiée
    telle quelle, la description sortirait hachée sur YouTube. On ne garde donc comme
    vraie coupure que la LIGNE VIDE (« > » seul) et le début d'une puce « • »."""
    m = re.search(r"\*\*Accroche\*\*[^\n]*\n\n((?:^>.*\n)+)", bloc, re.M)
    if not m:
        return None
    lignes, blanc = [], False
    for l in m.group(1).splitlines():
        c = l[1:]
        if c.startswith(" "):
            c = c[1:]
        if not c.strip():
            blanc = True
            continue
        if lignes and not blanc and not c.startswith("• "):
            lignes[-1][0] += " " + c.strip()
            continue
        lignes.append([c.rstrip(), blanc])
        blanc = False
    out = ""
    for i, (t, b) in enumerate(lignes):
        out += ("" if i == 0 else ("\n\n" if b else "\n")) + t
    return out


def chapitres(bloc):
    """« 0:00 garde · 0:10 la Diagonale des Fous · … » → [["00:00", "garde"], …].

    ⭐ Ces instants viennent des lignes `ECRAN` du journal de rendu, donc de l'écran lui
    même. Le `_lisez_moi` du registre dit que les chapitres des anciennes séries ont été
    MESURÉS sur la piste audio (détection de silences) : ici c'est plus direct encore."""
    # ⚠️ La phrase d'introduction n'a pas la même forme d'une fiche à l'autre : E1 écrit
    # « ⚠️ **Chapitres** : le champ … attend des horodatages. Ceux de E1, / relevés sur le
    # rendu (…) : », les huit autres « **Chapitres**, relevés sur le rendu : ». On prend
    # donc tout le paragraphe, et on commence au PREMIER horodatage.
    m = re.search(r"\*\*Chapitres\*\*((?:(?!\n\n|^---).*\n)+)", bloc, re.M)
    if not m:
        return None
    plat = re.sub(r"\s+", " ", m.group(1)).strip().rstrip(".")
    debut = re.search(r"\d+:\d\d", plat)
    if not debut:
        return None
    plat = plat[debut.start():]
    # ⛔⛔ ON NE COUPE PAS SUR « · » TOUT COURT, ET C'EST MESURÉ : le chapitre « 2:35 le
    # cas u · u » de l'épisode 7 porte le séparateur DANS son titre (c'est un produit
    # scalaire). Coupé à l'aveugle, il rendait un chapitre « u » sans horodatage — et un
    # chapitre faux se serait publié sans que rien ne le dise. Un séparateur n'est un
    # séparateur que s'il est suivi d'un horodatage.
    out = []
    for morceau in re.split(r"·(?=\s*\d+:\d\d)", plat):
        mm = re.match(r"^\s*(\d+):(\d\d)\s+(.+?)\s*$", morceau)
        if not mm:
            ennuis.append(f"chapitre illisible : « {morceau.strip()} »")
            continue
        out.append([f"{int(mm.group(1)):02d}:{mm.group(2)}", mm.group(3)])
    return out or None


# ── 2. la voix : le texte des questions, des choix, et l'explication ───────────
def questions_de(e, instants, lettres_voix):
    """Les deux questions-pauses, prises dans la VOIX (mot pour mot) et dans le JOURNAL
    (l'instant et la lettre). ⛔ Rien n'est reformulé : ce que l'élève entend est ce que
    la fiche du coach montrera."""
    T = json.loads((RACINE / "manim" / "voix" / f"{e['id']}.json").read_text(encoding="utf-8"))
    out = []
    for clip in ("04", "07"):
        txt = T[f"{clip}-question"]
        corps = txt.split("Question !", 1)[-1].strip()
        enonce = corps.split("A : ", 1)[0].strip()
        reste = corps[corps.index("A : "):].split("Mets pause", 1)[0].strip()
        parts = re.split(r"\s(?=[BC] : )", reste)
        choix = [p.split(" : ", 1)[1].strip().rstrip(".") for p in parts]
        if len(choix) != 3:
            ennuis.append(f"{e['id']} {clip} : {len(choix)} choix au lieu de 3")
            continue
        # L'explication : les DEUX premières phrases du clip de réponse, après
        # « Réponse X. ». ⛔ On coupe en gardant la ponctuation : `split(". ")` la mange,
        # et on obtenait « … 2 au carré fait 4 La somme fait 9 » — deux phrases soudées,
        # qui seraient parties telles quelles dans la fiche du coach.
        rep = T[f"{clip}b-reponse"]
        suite = rep.split(".", 1)[1].strip()
        # ⛔ ET « LES DEUX PREMIÈRES » NE SUFFIT PAS : les corrections qui commencent par
        # un calcul le disent en phrases très courtes (« 2 fois 1 fait 2. Zéro fois 5
        # fait zéro. »), et l'explication s'arrêtait AVANT le résultat — une explication
        # qui n'explique rien, et qui serait partie dans la fiche du coach. On prend donc
        # des phrases entières jusqu'à ce qu'il y ait de quoi comprendre.
        phrases = re.split(r"(?<=[.!?])\s+", suite)
        gardees = []
        for p in phrases[:4]:
            gardees.append(p)
            if len(" ".join(gardees)) >= 120:
                break
        expl = " ".join(gardees).strip()
        if not expl.endswith((".", "!", "?")):
            expl += "."
        out.append({"t": instants[clip], "question": enonce, "choix": choix,
                    "reponse": "ABC".index(lettres_voix[clip]), "explication": expl})
    return out


def journal(e):
    """Les lignes `QUESTION` du rendu HD : l'instant et la lettre RÉELLEMENT allumée."""
    nom = JOURNAUX[e["id"]]
    chemins = list(RACINE.glob(f"manim/scripts/terminale/{nom}.hd.log")) \
        + list(RACINE.glob(f"manim/scripts/terminale/**/{nom}.hd.log"))
    if not chemins:
        ennuis.append(f"{e['id']} : journal de rendu « {nom}.hd.log » introuvable")
        return None, None
    txt = chemins[0].read_text(encoding="utf-8", errors="replace")
    trouve = re.findall(r"QUESTION (\d\d) t=(\d\d:\d\d) \([\d.]+\) reponse=([ABC])", txt)
    if len(trouve) < 2:
        ennuis.append(f"{e['id']} : {len(trouve)} ligne(s) QUESTION dans le journal")
        return None, None
    return ({c: t for c, t, _ in trouve}, {c: r for c, _, r in trouve})


# ── 3. la table des lettres du .md des voix, pour la confrontation ─────────────
def table_lettres():
    """⛔ Le .md porte PLUSIEURS tableaux dont la première colonne vaut `04` (les passes
    maths). On ne garde que celui dont les douze autres cellules sont une lettre."""
    out = {}
    for l in VOIX_MD.read_text(encoding="utf-8").splitlines():
        c = [x.strip().strip("* ` ") for x in l.split("|")[1:-1]]
        if len(c) == 13 and c[0] in ("04", "07") and all(x in "ABC" and len(x) == 1 for x in c[1:]):
            out[c[0]] = c[1:]
    if len(out) != 2:
        ennuis.append("table des lettres introuvable dans VOIX-espace-terminale.md")
    return out


def main(ecrire):
    fiches, tbl = lire_fiches(), table_lettres()
    print(f"{len(fiches)} fiche(s) avec un bloc JSON\n")
    entrees = []
    for rang, (ep, e, acc, chap) in enumerate(fiches, start=1):
        n = int(ep[1:])
        instants, lettres_ecran = journal(e)
        T = json.loads((RACINE / "manim" / "voix" / f"{e['id']}.json").read_text(encoding="utf-8"))
        lettres_voix = {c: re.match(r"\s*Réponse ([ABC])", T[f"{c}b-reponse"]).group(1)
                        for c in ("04", "07")}
        # ⛔⛔ LA CONFRONTATION : voix · écran rendu · table. Un désaccord ne s'écrit pas.
        for c in ("04", "07"):
            trio = (lettres_voix[c], (lettres_ecran or {}).get(c), tbl.get(c, [None] * 12)[n - 1])
            if len(set(trio)) != 1:
                ennuis.append(f"{e['id']} {c} : voix {trio[0]}, écran {trio[1]}, table {trio[2]}")
        # le fichier rendu existe-t-il vraiment ?
        mp4 = RACINE / "manim" / "sorties" / e["fichier"]
        if not mp4.exists():
            ennuis.append(f"{e['id']} : le MP4 n'existe pas ({e['fichier']})")
        png = RACINE / "manim" / "sorties" / e["miniature"]
        manque_png = not png.exists()
        if acc is None:
            ennuis.append(f"{e['id']} : accroche introuvable dans la fiche")
            acc = ""
        if chap is None:
            ennuis.append(f"{e['id']} : chapitres introuvables dans la fiche")
        # ⛔ Les deux interdits du `_lisez_moi` du registre.
        for interdit, pourquoi in (("<", "YouTube refuse les chevrons"),
                                   (">", "YouTube refuse les chevrons"),
                                   ("enseignant", "formule arrêtée le 03/09/2026")):
            if interdit in acc:
                ennuis.append(f"{e['id']} : « {interdit} » dans la description ({pourquoi})")
        acc_complete = (acc + f"\n\n🎯 La série du coach sur cette compétence : {coach(e)}"
                        + f"\n\n📈 Épisode {n} sur {TOTAL_SERIE} de la série "
                          f"« {SERIE_TITRE} » d'EleveAI · Maths Tle spé.")
        entree = dict(e)
        entree["accroche"] = acc_complete
        if chap:
            entree["chapitres"] = chap
        if instants and lettres_ecran:
            q = questions_de(e, instants, lettres_voix)
            if q:
                entree["questions"] = q
        entrees.append(entree)
        print(f"  {ep:4s} {e['id']:38s} {len(chap or []):2d} chapitres · "
              f"{len(entree.get('questions', [])):d} questions · "
              f"{len(acc_complete):4d} car. de description"
              f"{'   ⚠️ miniature absente' if manque_png else ''}")

    if ennuis:
        print("\n⛔ rien écrit :")
        for x in ennuis:
            print("   ", x)
        return 1
    print("\n✅ voix, écran rendu et table disent la même lettre sur les "
          f"{2 * len(entrees)} questions ; les {len(entrees)} MP4 existent")
    if not ecrire:
        print("   (contrôle seul — relancer avec --ecrire pour toucher le registre)")
        return 0

    txt = REGISTRE.read_text(encoding="utf-8")
    reg = json.loads(txt)
    par_id = {v["id"]: i for i, v in enumerate(reg["videos"])}
    neuves = remplacees = 0
    for e in entrees:
        if e["id"] in par_id:
            reg["videos"][par_id[e["id"]]] = e
            remplacees += 1
        else:
            reg["videos"].append(e)
            neuves += 1
    # ⚠️ Le format d'écriture se DÉDUIT du fichier, il ne se choisit pas : le registre est
    # partagé, et le réécrire dans un autre format ferait un diff de 1 700 lignes dans
    # lequel personne ne verrait nos neuf clés (et `outils-commit-cles.py` refuserait).
    for ind in (None, 1, 2):
        for sep in ((",", ":"), (",", ": ")):
            for fin in ("", "\n"):
                if json.dumps(reg, indent=ind, separators=sep, ensure_ascii=False) != txt.rstrip("\n") \
                        and json.dumps(json.loads(txt), indent=ind, separators=sep,
                                       ensure_ascii=False) + fin == txt:
                    # ⚠️ `newline=""` ET NON `write_text` — pour être COMPARABLE, pas
                    # pour être juste. Mesuré le 23/11, et ma première conclusion était
                    # fausse : ce dépôt a `core.autocrlf=true`, donc la copie de travail
                    # est en CRLF (vérifié sur le fichier d'origine) et git normalise en
                    # LF dans l'index — le commit est le même dans les deux cas, et
                    # `git diff --cached --stat` dit bien « 969 insertions, 0 deletions ».
                    # ⛔ Mais `manim/outils-commit-cles.py` écrit, lui, en `newline=""`
                    # quoi qu'il arrive. Le seul contrôle qui prouve qu'on n'emporte pas
                    # le travail d'une autre session est `cmp` entre sa sortie et ce
                    # fichier — et un `cmp` entre un CRLF et un LF échoue sur 108 794
                    # lignes sans qu'aucune donnée ne diffère. On écrit donc comme lui.
                    with open(REGISTRE, "w", encoding="utf-8", newline="") as f:
                        f.write(json.dumps(reg, indent=ind, separators=sep,
                                           ensure_ascii=False) + fin)
                    print(f"✅ {neuves} clé(s) ajoutée(s), {remplacees} remplacée(s) "
                          f"→ {len(reg['videos'])} vidéos au registre")
                    return 0
    print("⛔ format du registre non reconnu : rien écrit")
    return 1


if __name__ == "__main__":
    sys.exit(main("--ecrire" in sys.argv))
