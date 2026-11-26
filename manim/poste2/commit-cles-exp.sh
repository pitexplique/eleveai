#!/bin/bash
# commit-cles-exp.sh "<message>" <json:prefixe>... -- <chemins ordinaires>...
# Commit avec un INDEX TEMPORAIRE : HEAD + nos clés des JSON partagés + nos fichiers ; l'index réel est mis à jour pour ces seuls chemins.
cd /c/Users/FRED/Documents/eleveai; msg=$1; shift; T=$(mktemp -d); export GIT_INDEX_FILE=$T/index; git read-tree HEAD
declare -a chemins
while [ $# -gt 0 ] && [ "$1" != "--" ]; do f=${1%%:*}; p=${1#*:}; python -X utf8 manim/outils-commit-cles.py $f $T/sortie.json $p || exit 1
  b=$(git hash-object -w $T/sortie.json); git update-index --add --cacheinfo 100644,$b,$f; chemins+=("$f:$b"); shift; done
shift
for f in "$@"; do b=$(git hash-object -w "$f"); git update-index --add --cacheinfo 100644,$b,"$f"; chemins+=("$f:$b"); done
tree=$(git write-tree); old=$(git rev-parse HEAD); c=$(printf '%s\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\n' "$msg" | git commit-tree $tree -p $old)
git update-ref refs/heads/main $c $old || exit 1; unset GIT_INDEX_FILE
for x in "${chemins[@]}"; do git update-index --add --cacheinfo 100644,${x##*:},${x%:*}; done
rm -rf $T; git log --oneline -1; git show --stat HEAD | tail -n +6
