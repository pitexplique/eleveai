# passe_identites_3e.py
# Passe finale de la série IDENTITÉS REMARQUABLES 3e (22/11/2026), épisodes 07 et 08 du dossier expression-litterale :
# les 4 entrées du manifeste. Copie de passe_identites.py (4e).
# Shorts Manim (pas de dessin animé en 3e), une paire par jour, prioritaire.
# Les temps des chapitres et des questions sont relevés dans l'AUDIO des mp4 (passe_distributivite.mesurer),
# jamais estimés ; un chapitre de moins de 10 s est fondu dans le précédent (passe_decimaux.chapitres).
# Le manifeste a des modifications non commitées d'autres sessions : on relit la copie de travail et on
# ajoute seulement nos 4 entrées 3e-identites-<slug>[-short].
#
#   python manim/passe_identites_3e.py temps     → manim/sorties/3e/maths/expression-litterale/temps-identites.json
#   python manim/passe_identites_3e.py voir      → affiche les entrées sans rien écrire
#   python manim/passe_identites_3e.py manifeste → ajoute ou remplace les 4 entrées
#   python manim/passe_identites_3e.py coupes    → les valeurs de COUPE_PAR_VIDEO (LecteurVideo.tsx)
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_distributivite import mesurer, mmss  # noqa: E402
from passe_decimaux import chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "3e" / "maths" / "expression-litterale"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps-identites.json"
FICHES = {"litteral_calcul": "https://www.eleveai.fr/fiches-cours/maths/3e/litteral-calcul",
          "equation_resolution": "https://www.eleveai.fr/fiches-cours/maths/3e/equation-resolution"}


def coach(notion, micro):
    return f"https://www.eleveai.fr/coach/serie?classe=3e&matiere=maths&notion={notion}&microId={micro}&display=simple"


EPS = [
    dict(num="07", slug="factoriser", dossier="07-factoriser-identite", n=7, notion="litteral_calcul", micro="litteral_identite",
         date="2027-06-30", ceinture="verte", sc="orange",
         centres=["art-design", "jeux-defis"], scentres=["jeux-defis"],
         titre="x² − 9 = (x − 3)(x + 3) : factoriser avec une identité — épisode 7 · Maths 3e",
         intro="Inès est carreleuse. Elle pose une terrasse carrée de x mètres de côté et laisse un carré de 3 mètres sur 3 pour un arbre. L'aire carrelée, x² − 9, peut-elle devenir un rectangle ? On découpe, on tourne, on colle.",
         puces=["le carré troué devient un rectangle : x² − 9 = (x − 3)(x + 3)",
                "l'identité a² − b² = (a − b)(a + b), avec a = x et b = 3",
                "on vérifie en développant : les 3x s'annulent",
                "les carreaux : x² + 6x + 9 se range en un carré de côté x + 3",
                "reconnaître un carré : deux carrés et le double produit au milieu ; x² − 10x + 25 = (x − 5)²",
                "le piège : x² + 16 ne se factorise pas"],
         defi="factorise 4x² − 25 et x² − 14x + 49.",
         chap={"00-garde": "Un carré troué", "01-carreleuse": "Inès, carreleuse", "02-decouper": "Découper, tourner, coller",
               "03-identite": "a² − b² = (a − b)(a + b)", "03q-question": "Question 1", "04-carreaux": "Les carreaux",
               "05-reconnaitre": "Reconnaître un carré", "05q-question": "Question 2", "06-defi": "À toi de jouer",
               "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Factorise x² − 64.", ["(x − 8)²", "(x − 32)(x + 32)", "(x − 8)(x + 8)"], 2,
              "64 = 8², donc x² − 64 = (x − 8)(x + 8)."),
             ("05q-question", "Quelle expression est égale à (x + 4)² ?", ["x² + 8x + 16", "x² + 16", "x² + 4x + 16"], 0,
              "Le double produit : 2 × x × 4 = 8x.")],
         tags=["identités remarquables", "factoriser", "différence de deux carrés", "a² − b²", "carré d'une somme",
               "calcul littéral", "carreleuse"],
         st="Un carré troué devient un rectangle ? x² − 9 🔍 — 3e #Shorts",
         sq=("01q-question", "Et x² − 100 ?", ["(x − 50)(x + 50)", "(x − 10)(x + 10)", "(x − 10)²"], 1,
             "100 = 10², donc (x − 10)(x + 10)."),
         sa="Un carré de côté x, moins un carré de 3 sur 3 : x² − 9. Je coupe une bande, je la tourne, je la colle : un rectangle de x − 3 sur x + 3.\nx² − 9 = (x − 3)(x + 3).",
         stoi="factorise 9x² − 1. Réponds en commentaire !",
         stags=["différence de deux carrés", "identités remarquables", "factoriser"]),
    dict(num="08", slug="resoudre", dossier="08-resoudre-identite", n=8, notion="equation_resolution", micro="equation_carre_factoriser",
         date="2027-07-01", ceinture="verte", sc="verte",
         centres=["reseaux-sociaux", "art-design"], scentres=["jeux-defis"],
         titre="(x − 2)² = 25 : deux solutions ! Résoudre en factorisant — épisode 8 · Maths 3e",
         intro="Tom est photographe. Une photo carrée de 9 dm² : quel est son côté ? Puis une photo dans un cadre de 1 dm : (x − 2)² = 25. Pourquoi ces équations ont-elles deux solutions ?",
         puces=["on ramène tout à gauche pour avoir 0 à droite",
                "on factorise avec a² − b² : x² − 9 = (x − 3)(x + 3)",
                "le produit nul : x − 3 = 0 ou x + 3 = 0, donc 3 ou −3",
                "(x − 2)² − 25 = 0 devient (x − 7)(x + 3) = 0 : x = 7 ou x = −3",
                "dans un problème, on garde les solutions qui ont un sens, et on vérifie",
                "le piège : oublier la solution négative"],
         defi="résous x² − 16 = 0 et (x + 1)² = 36.",
         chap={"00-garde": "Deux solutions ?", "01-photographe": "Tom, photographe", "02-factoriser": "On factorise",
               "03-produit-nul": "Le produit nul", "03q-question": "Question 1", "04-cadre": "La photo dans son cadre",
               "05-factoriser": "(x − 2)² − 25 = 0", "06-solutions": "Les solutions, et on vérifie", "06q-question": "Question 2",
               "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Résous x² − 49 = 0.", ["x = 7 seulement", "x = 7 ou x = −7", "x = 24,5 ou x = −24,5"], 1,
              "(x − 7)(x + 7) = 0 : deux solutions, 7 et −7."),
             ("06q-question", "De (x − 2)² = 25, un élève écrit x − 2 = 5 donc x = 7. Qu'a-t-il oublié ?",
              ["rien, c'est complet", "de diviser par 2", "la solution x = −3"], 2,
              "x − 2 peut aussi valoir −5, car (−5)² = 25 : x = −3.")],
         tags=["équation produit nul", "résoudre une équation", "identités remarquables", "factoriser", "x² = a",
               "deux solutions", "photographe"],
         st="(x − 2)² = 25 : tu trouves 7 ? Il en manque une 🔍 — 3e #Shorts",
         sq=("01q-question", "Combien de solutions a x² − 1 = 0 ?", ["deux, 1 et −1", "une seule, 1", "aucune"], 0,
             "(x − 1)(x + 1) = 0 : 1 et −1."),
         sa="(x − 2)² = 25. On ramène 25 à gauche, on factorise : (x − 7)(x + 3) = 0. Produit nul : x = 7 ou x = −3.",
         stoi="résous (x + 3)² = 16. Réponds en commentaire !",
         stags=["équation produit nul", "identités remarquables", "deux solutions"]),
]

COMMUNS = ["maths", "3e", "collège", "cycle 4", "brevet", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EPS:
        slug, rep = e["slug"], e["dossier"]
        dos = f"3e/maths/expression-litterale/{rep}"
        nom = f"eleveai-maths-3e-identites-{slug}"
        ident = f"3e-identites-{slug}"
        micro, NOTION, COURS = e["micro"], e["notion"], FICHES[e["notion"]]
        tp = temps[ident]
        t = tp["clips"]
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["puces"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {COURS}\n• la série du coach sur cette compétence : {coach(NOTION, micro)}"
        acc += f"\n\n🔢 Épisode {e['n']} de la série Expression littérale d'EleveAI, en 3e (identités remarquables)."
        qs = [{"t": mmss(t[c]), "question": q, "choix": ch, "reponse": r, "explication": x} for c, q, ch, r, x in e["qs"]]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": micro, "classe": "3e",
            "ceinture": e["ceinture"], "serie": "Maths 3e", "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png",
            "titre": e["titre"], "accroche": acc, "chapitres": chapitres(e["chap"], t, tp["duree"]), "fiche": COURS,
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        ts = temps[f"{ident}-short"]["clips"]
        c, q, ch, r, x = e["sq"]
        sacc = e["sa"] + f"\n\nVoix de synthèse.\n🥋 Ceinture {e['sc']}.\n👉 À toi : {e['stoi']}"
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach(NOTION, micro)}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #identitesremarquables #3e #brevet"
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": micro, "classe": "3e",
            "ceinture": e["sc"], "serie": "Maths 3e", "type": "short", "renvoie_vers": ident,
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short.png",
            "titre": e["st"], "accroche": sacc, "tags": e["stags"] + ["calcul littéral"] + COMMUNS + [f"ceinture {e['sc']}", "Shorts"],
            "questions": [{"t": mmss(ts[c]), "question": q, "choix": ch, "reponse": r, "explication": x}], "centres": e["scentres"],
        })
        for tt in (e["titre"], e["st"]):
            if len(tt) > 100:
                print(f"TITRE TROP LONG ({len(tt)}) : {tt}", file=sys.stderr)
    return out


def coupes():
    """COUPE_PAR_VIDEO (components/LecteurVideo.tsx) : secondes retirées à la fin du mp4.
    Comme passe_distributivite.coupes (marques du clip de fin, recalées sur le mp4 par `temps`), mais
    rapportées à la durée de la VIDÉO (ffprobe) : c'est elle que le navigateur donne à `v.duration`,
    et la piste son finit ~1,3 s plus tôt.
    Paysage : au milieu de la pause entre « point f r. » et « Et si ». Short : « Mets » − 0,03 s."""
    import subprocess
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    res = {}
    for e in EPS:
        for suf, scr in (("", f"ident_{e['slug']}"), ("-short", f"ident_{e['slug']}_short")):
            nom = f"3e-identites-{e['slug']}{suf}"
            if nom not in temps:
                continue
            voix = json.loads((RACINE / "manim" / "voix" / f"{nom}.json").read_text(encoding="utf-8"))
            cle = [k for k in voix if k.endswith("abonne")][0]
            texte = voix[cle]
            marques = json.loads((RACINE / "manim" / "scripts" / "3e" / f"{scr}_marques.json").read_text(encoding="utf-8"))[cle]
            debut = temps[nom]["clips"][cle]
            mp4 = SERIE / e["dossier"] / f"eleveai-maths-{nom}.mp4"
            duree = float(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                                          "stream=duration", "-of", "csv=p=0", str(mp4)],
                                         capture_output=True, text=True).stdout.strip())

            def instant(mot):
                return dict(marques)[texte.index(mot)]

            if suf:
                t = debut + instant("Mets")
                res[nom] = round(duree - t + 0.03, 2)
            else:
                t_et = instant("Et si")
                avant = [m for c, m in marques if m < t_et][-1]
                t = debut + (avant + t_et) / 2
                res[nom] = round(duree - t, 1)
            print(nom, "durée vidéo", round(duree, 2), "fin", cle, debut, "coupe à", round(t, 2), "→", res[nom])
    return res


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        res = json.loads(TEMPS.read_text(encoding="utf-8")) if TEMPS.exists() else {}
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        for e in EPS:
            for suf in ("", "-short"):
                nom = f"3e-identites-{e['slug']}{suf}"
                mp4 = SERIE / e["dossier"] / f"eleveai-maths-{nom}.mp4"
                if filtre not in nom or not mp4.exists():
                    continue
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "coupes":
        coupes()
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-identites-3e.json"
        shutil.copy(MANIFESTE, sauve)
        texte = MANIFESTE.read_text(encoding="utf-8")
        data = json.loads(texte)
        neuves = entrees()
        ids = {n["id"] for n in neuves}
        avant = len(data["videos"])
        for v in data["videos"]:
            if v["id"] in ids and v.get("url"):
                raise SystemExit("déjà publiée : " + v["id"])
        data["videos"] = [v for v in data["videos"] if v["id"] not in ids] + neuves
        sortie = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
        MANIFESTE.write_text(sortie, encoding="utf-8", newline="\n" if "\r\n" not in texte else "\r\n")
        print("manifeste :", avant, "→", len(data["videos"]), "sauvegarde", sauve)


if __name__ == "__main__":
    main()
