# -*- coding: utf-8 -*-
"""Tirage des lettres de bonne réponse — série « CONTINUITÉ ET TVI », Tle spé.

Règle de manim/REGLES.md (Frédéric, 09/11/2026) : la place de la bonne réponse est
TIRÉE AU HASARD avant d'écrire la voix, jamais deux fois la même lettre de suite dans
une vidéo, environ un tiers de A, de B et de C sur la série.

5 épisodes x 2 questions-pauses = 10 questions. 10 n'est pas divisible par 3 :
la répartition la plus proche du tiers est 3 / 3 / 4, et la lettre qui hérite du
quatrième est tirée elle aussi. Le tirage se rejoue et redonne le même résultat.

    python -X utf8 manim/poste2/tirage-lettres-continuite-tvi.py
"""
import random

GRAINE = 2711
EPISODES = ["E1 continuite_reconnaitre", "E2 tvi_appliquer", "E3 tvi_unicite",
            "E4 tvi_rediger", "E5 tvi_defi"]

rng = random.Random(GRAINE)
essai = 0
while True:
    essai += 1
    surplus = rng.choice("ABC")
    sac = list("AABBCC") + [surplus] + list("ABC")  # 3/3/3 + 1 = 10 lettres
    sac = sorted(sac)
    rng.shuffle(sac)
    paires = [tuple(sac[2 * i:2 * i + 2]) for i in range(5)]
    if not all(a != b for a, b in paires):      # jamais deux fois la même dans un épisode
        continue
    if not all(paires[i][1] != paires[i + 1][0] for i in range(4)):  # ni d'un épisode au suivant
        continue
    # ⭐ AJOUT DE CETTE SÉRIE : aucune lettre plus de DEUX fois dans la MÊME colonne.
    # Le premier tirage retenu sans cette contrainte mettait A en 04 quatre fois sur
    # cinq : un élève qui répond toujours A à la première question gagnait 80 %.
    # La règle de REGLES.md parle de la série entière, elle ne voit pas les colonnes.
    if any(max(col.count(L) for L in "ABC") > 2 for col in (
            [p[0] for p in paires], [p[1] for p in paires])):
        continue
    break

print(f"graine {GRAINE}, essai {essai}")
for nom, (q04, q07) in zip(EPISODES, paires):
    print(f"  {nom:28s}  04 -> {q04}   07 -> {q07}")
total = {L: sum(p.count(L) for p in paires) for L in "ABC"}
print("  total :", " ".join(f"{L} {n}" for L, n in total.items()))
