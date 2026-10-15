# Shorts TVI (terminale spé) — voix proposées le 11/10/2026, À VALIDER

Une voix par micro du coach (notion continuite_tvi). Chaque short finit par une
question à laquelle répondre en commentaire. Les JSON seront écrits après le « go ».

## 1. continuite_reconnaitre — « Sans lever le crayon »
- 00-accroche : Une fonction passe de moins 1 à 1. Elle touche forcément 0 ?
- 01-piege : Beaucoup répondent oui, toujours. Et c'est faux !
- 02-saut : Si la courbe fait un saut, elle peut passer de moins 1 à 1 sans jamais toucher 0. Il faut qu'elle soit continue : tracée sans lever le crayon.
- 03-regle : Les polynômes, l'exponentielle, le logarithme sur son domaine : ils sont continus. Pas de saut, pas de trou.
- 04-defi : À toi. La fonction partie entière, qui fait des marches d'escalier, est-elle continue ?
- 05-fin : Ta réponse en commentaire. La vidéo complète sur le théorème des valeurs intermédiaires est juste en dessous.

## 2. tvi_appliquer — « Une solution, sans la calculer »
- 00-accroche : x au cube plus x moins 1 égale 0. Une solution entre 0 et 1 ? Sans la calculer ?
- 01-calcul : f de 0 égale moins 1. f de 1 égale 1. Un signe moins, un signe plus.
- 02-regle : f est un polynôme, donc continue. Elle passe du négatif au positif : elle s'annule forcément entre 0 et 1. C'est le théorème des valeurs intermédiaires.
- 03-piege : Le piège : oublier de dire que f est continue. Sans la continuité, le théorème ne s'applique pas.
- 04-defi : À toi. x au cube moins 2 égale 0 a-t-elle une solution entre 1 et 2 ?
- 05-fin : (renvoi)

## 3. tvi_unicite — « Au moins une, ou une seule ? »
- 00-accroche : Le théorème dit « au moins une solution ». Comment prouver qu'il n'y en a qu'une ?
- 01-piege : Beaucoup écrivent « unique » sans rien justifier. Et le correcteur enlève les points.
- 02-monotonie : Il faut que f soit strictement monotone. Une courbe qui ne fait que monter ne peut couper l'axe qu'une fois.
- 03-exemple : f de x égale x au cube plus x moins 1. f prime de x égale 3 x au carré plus 1, toujours positif. f est strictement croissante : la solution est unique.
- 04-defi : À toi. f de x égale x au carré moins 1 sur l'intervalle de moins 2 à 2 : combien de solutions à f de x égale 0 ? Et pourquoi le théorème ne suffit pas ?
- 05-fin : (renvoi)

## 4. tvi_rediger — « Les 4 lignes du bac »
- 00-accroche : Le théorème des valeurs intermédiaires au bac : quatre lignes, et tous les points.
- 01-lignes : Un : f est continue. Deux : f est strictement monotone. Trois : les signes de f aux deux bornes sont contraires.
- 02-conclusion : Quatre : d'après le corollaire du théorème des valeurs intermédiaires, l'équation f de x égale 0 admet une unique solution.
- 03-piege : Le piège : écrire « d'après le théorème » sans le nommer. Au bac, on cite le corollaire du TVI.
- 04-defi : À toi. Laquelle des quatre lignes oublies-tu le plus souvent ?
- 05-fin : (renvoi)

## 5. tvi_defi — « Encadrer α au centième »
- 00-accroche : Une solution existe entre 0 et 1. Peut-on la trouver au centième, sans formule ?
- 01-balayage : On cherche le changement de signe. f de 0 virgule 6 est négatif, f de 0 virgule 7 est positif : alpha est entre 0 virgule 6 et 0 virgule 7.
- 02-centieme : On recommence au centième. f de 0 virgule 68 est négatif, f de 0 virgule 69 est positif. Alpha est entre 0 virgule 68 et 0 virgule 69.
- 03-regle : À chaque étape, on garde l'intervalle où le signe change. C'est le balayage, et la calculatrice le fait en quelques secondes.
- 04-defi : À toi. Encadre au dixième la solution de x au cube égale 2.
- 05-fin : (renvoi)
