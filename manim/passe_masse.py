# passe_masse.py
# Passe finale de la série MASSES, du CP au CM2 (16/11/2026, session masses), copie de passe_contenance_ce2.py :
# temps des chapitres et des questions relevés dans l'AUDIO des mp4 (passe_relatifs.mesurer), questions lues
# dans les voix validées. Le manifeste a des modifications non commitées d'autres sessions : on relit la copie
# de travail et on ajoute ou remplace SEULEMENT nos entrées (<classe>-masse-<slug>[-short]).
# ⛔ Pas de 6e (Frédéric, 16/11 : « si la 6e n'a pas de masse tu fais pas »).
#
#   python manim/passe_masse.py temps [id]   → manim/sorties/<classe>/maths/masse/temps.json
#   python manim/passe_masse.py voir         → affiche les entrées sans rien écrire
#   python manim/passe_masse.py manifeste    → ajoute ou remplace les entrées
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
NOTION = "masse"
COACH = "https://www.eleveai.fr/coach/serie?classe={classe}&matiere=maths&notion={notion}&microId={micro}&display=simple"
NOM_CEINT = {"blanche": "Ceinture blanche", "jaune": "Ceinture jaune", "orange": "Ceinture orange",
             "verte": "Ceinture verte", "bleue": "Ceinture bleue", "marron": "Ceinture marron", "noire": "Ceinture noire"}
CYCLE = {"cp": "cycle 2", "ce1": "cycle 2", "ce2": "cycle 2", "cm1": "cycle 3", "cm2": "cycle 3"}
NB_EP = {"cp": 4, "ce1": 5, "ce2": 7, "cm1": 5, "cm2": 4}

# Dates : après la dernière de la file (28/04/2027 le 16/11) ; ⛔ 3 shorts par jour au plus, relire la file avant.
EP = [
 dict(classe="ce2", n=3, slug="comparer", micro="ce2_masse_comparer", nom="Comparer des masses", date="2027-04-29",
      ceinture="jaune",
      titre="1 kg ou 900 g : lequel est le plus lourd ?",
      intro="Anaïs est fromagère. Elle coupe des parts de fromage et les pèse. Un client veut le plus gros morceau : 1 kilogramme, ou 900 grammes ?",
      points=["même unité : on compare les nombres (450 g > 300 g)",
              "deux unités : d'abord la même unité, 1 kg = 1 000 g",
              "le piège : 900 est plus grand que 1, mais 1 kg = 1 000 g",
              "1 kg de plumes ou 1 kg de cailloux : la même masse"],
      defi="ranger 2 kg, 1 500 g et 800 g du plus léger au plus lourd.",
      chap={"00-garde": "Le plus lourd ?", "02-meme-unite": "La même unité", "03-convertir": "Deux unités",
            "04-question": "Question 1", "05-piege": "Le piège", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "comparer des masses", "kilogramme", "gramme", "balance", "fromagère", "fromage"],
      centres=["cuisine"],
      aussi=[{"classe": "ce1", "notionId": "masse", "microId": "ce1_masse_comparer"}],
      s_titre="900 g ou 1 kg : 900 est plus grand, donc plus lourd ?", s_ceinture="jaune",
      s_accroche="Ma copine a un fromage de 900 grammes. Moi, un morceau de 1 kilogramme. Elle dit : 900, c'est plus que 1 ! On pose les deux sur la balance…",
      s_toi="qui est le plus lourd, 2 kilogrammes ou 1 800 grammes ?",
      s_tags=["masse", "comparer", "balance", "fromage"], s_centres=["cuisine", "jeux-defis"]),
 dict(classe="cp", n=1, slug="lexique", micro="cp_masse_lexique", notion="masse_contenance", nom="Lourd ou léger",
      date="2027-04-30", ceinture="blanche",
      titre="Carton de livres ou oreiller : lequel est le plus lourd ?",
      intro="Awa est déménageuse. Toute la journée, elle porte des cartons. Certains sont lourds. D'autres sont légers.",
      points=["lourd, léger : un carton de livres, un oreiller",
              "on soupèse : un objet dans chaque main, la main qui descend tient le plus lourd",
              "le piège : gros ne veut pas dire lourd (le ballon de plage, la bille en fer)"],
      defi="trouver le plus léger : un oreiller, un carton de livres, une chaise.",
      chap={"00-garde": "Lourd ou léger ?", "02-lourd-leger": "Lourd, léger", "03-soupeser": "On soupèse",
            "04-question": "Question 1", "05-piege": "Le piège", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "lourd", "léger", "soupeser", "comparer des masses", "déménageuse"],
      centres=["construction"],
      s_titre="Un gros ballon de plage, c'est lourd ?", s_ceinture="blanche",
      s_accroche="Mon copain veut porter le gros ballon de plage. Il prend son élan… et il le soulève d'un doigt !",
      s_toi="une pomme, une plume, une pastèque : range-les du plus léger au plus lourd.",
      s_tags=["masse", "lourd", "léger", "ballon"], s_centres=["sport", "jeux-defis"]),
 dict(classe="cp", n=2, slug="comparer", micro="cp_masse_comparer", notion="masse_contenance", nom="Comparer des masses",
      date="2027-05-01", ceinture="blanche",
      titre="Un melon ou un ananas : lequel est le plus lourd ?",
      intro="Hugo est primeur : il vend des fruits et des légumes. Il a un melon et un ananas. Lequel est le plus lourd ? Il sort sa balance à deux plateaux.",
      points=["la balance à deux plateaux : un objet de chaque côté",
              "le plateau qui descend porte le plus lourd",
              "même niveau : même masse (deux pommes)",
              "deux boîtes pareilles : à l'œil on ne sait pas, la balance le dit"],
      defi="une orange à gauche, un citron à droite, le plateau de droite monte : qui est le plus lourd ?",
      chap={"00-garde": "Le plus lourd ?", "02-balance": "La balance à deux plateaux", "03-regle": "Le plateau qui descend",
            "04-question": "Question 1", "05-equilibre": "Même niveau", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "comparer des masses", "balance", "balance à deux plateaux", "plus lourd", "primeur", "fruits"],
      centres=["cuisine"],
      aussi=[{"classe": "ce1", "notionId": "masse", "microId": "ce1_masse_soupeser"}],
      s_titre="Mon gros doudou monte sur la balance : il est léger ?", s_ceinture="blanche",
      s_accroche="Je mets mon doudou sur la balance. Mon copain met sa petite voiture en fer. Mon doudou monte tout en haut !",
      s_toi="2 pommes sur un plateau. Combien de pommes pareilles de l'autre côté, pour l'équilibre ?",
      s_tags=["masse", "balance", "plus lourd", "doudou"], s_centres=["jeux-defis"]),
 dict(classe="cp", n=3, slug="estimer", micro="cp_masse_contenance_estimer", notion="masse_contenance", nom="Ranger des masses",
      date="2027-05-02", ceinture="blanche",
      titre="Trois chiens : lequel est le plus léger ?",
      intro="Zoé est toiletteuse : elle lave et coiffe les chiens. Aujourd'hui : un chiot, un chien moyen et un gros chien. Comment les ranger du plus léger au plus lourd ?",
      points=["pour ranger, on compare deux par deux",
              "du plus léger au plus lourd : le chiot, le chien moyen, le gros chien",
              "A pèse plus que B, et B plus que C : donc A est la plus lourde",
              "sans balance, on peut deviner : une souris, un chat, un cheval"],
      defi="ranger du plus léger au plus lourd : une pastèque, une fraise, une pomme.",
      chap={"00-garde": "Le plus léger ?", "02-deux-par-deux": "Deux par deux", "03-rang": "Du plus léger au plus lourd",
            "04-question": "Question 1", "05-deviner": "Sans balance, on devine", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["masse", "ranger des masses", "plus léger", "plus lourd", "comparer des masses", "toiletteuse", "chiens"],
      centres=["animaux"],
      s_titre="Trois chats sur ma branche : qui monte en premier ?", s_ceinture="blanche",
      s_accroche="Trois chats montent sur ma branche : un chaton, un chat, un gros matou. La branche craque !",
      s_toi="un éléphant, une fourmi, un lapin : range-les du plus léger au plus lourd.",
      s_tags=["masse", "plus léger", "ranger", "chats"], s_centres=["animaux", "jeux-defis"]),
]

COMMUNS = ["masse", "maths"]


def dossier(e):
    return f"{e['classe']}/maths/masse/{e['n']:02d}-{e['slug']}"


def temps_de(classe):
    p = SORTIES / classe / "maths" / "masse" / "temps.json"
    return p, (json.loads(p.read_text(encoding="utf-8")) if p.exists() else {})


def entrees():
    out = []
    for e in EP:
        cl, n, slug = e["classe"], e["n"], e["slug"]
        ident = f"{cl}-masse-{slug}"
        _, temps = temps_de(cl)
        if ident not in temps:
            continue
        CL = cl.upper()
        communs = COMMUNS + [CL, "primaire", CYCLE[cl], "CRPE", "EleveAI"]
        dos = dossier(e)
        nom = f"eleveai-maths-{ident}"
        notion = e.get("notion", NOTION)  # CP : masse_contenance
        coach = COACH.format(classe=cl, micro=e["micro"], notion=notion)
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths {CL}"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += (f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 {NOM_CEINT[e['ceinture']]}.\n"
                f"Un défi en fin de vidéo, avec sa correction : {e['defi']}")
        acc += f"\n\nPour s'entraîner :\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n⚖️ Épisode {n} de la série Masses d'EleveAI, en {CL}."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": notion, "microId": e["micro"], "classe": cl,
            "ceinture": e["ceinture"], "serie": f"Maths {CL}", "type": "longue", "fichier": f"{dos}/{nom}.mp4",
            "miniature": f"{dos}/{nom}.png", "titre": titre, "accroche": acc,
            "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "tags": list(dict.fromkeys(e["tags"] + communs)), "questions": qs, "centres": e["centres"],
        })
        if e.get("aussi"):  # la même vidéo sert aussi une micro d'une classe voisine
            out[-1]["aussi"] = e["aussi"]
        if f"{ident}-short" not in temps:
            continue
        sv = json.loads((VOIX / f"{ident}-short.json").read_text(encoding="utf-8"))
        ts = temps[f"{ident}-short"]
        stitre = f"{e['s_titre']} #maths #{cl}"
        sc = e.get("s_ceinture", "blanche")
        sacc = e["s_accroche"] + (f"\n\nDessin animé, voix de synthèse.\n🥋 {NOM_CEINT[sc]}"
                                  + (" : pour découvrir." if sc == "blanche" else ".")
                                  + f"\n👉 À toi : {e['s_toi']} Réponds en commentaire !")
        sacc += (f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach}\n\n"
                 f"Fait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #masse #{cl} #primaire")
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": notion, "microId": e["micro"],
            "classe": cl, "ceinture": sc, "serie": f"Maths {CL}", "type": "short", "renvoie_vers": ident,
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short-miniature.png",
            "titre": stitre, "accroche": sacc,
            "tags": list(dict.fromkeys(e["s_tags"] + ["Ti Margo", "dessin animé", NOM_CEINT[sc].lower()] + communs + ["Shorts"])),
            "questions": [dict(t=mmss(ts["clips"][c]), **question(sv, c)) for c in sv if c.endswith("-question")],
            "centres": e["s_centres"],
        })
        if e.get("aussi"):
            out[-1]["aussi"] = e["aussi"]
        for x in (titre, stitre):
            if len(x) > 100:
                print(f"TITRE TROP LONG ({len(x)}) : {x}", file=sys.stderr)
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        for e in EP:
            ident = f"{e['classe']}-masse-{e['slug']}"
            if filtre and filtre != ident:
                continue
            p, res = temps_de(e["classe"])
            for suf in ("", "-short"):
                nom = f"{ident}{suf}"
                mp4 = SORTIES / dossier(e) / f"eleveai-maths-{nom}.mp4"
                if not mp4.exists():
                    print("pas encore :", nom)
                    continue
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
            p.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-masse.json"
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
