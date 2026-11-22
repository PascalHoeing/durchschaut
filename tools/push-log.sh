#!/usr/bin/env bash
# Legt das Bauprotokoll in den Zweig "build-logs", damit man es auch ohne Zugriff auf Actions lesen kann.
set -uo pipefail
LOG="$GITHUB_WORKSPACE/build.log"
[ -f "$LOG" ] || echo "(kein Protokoll)" > "$LOG"
D=$(mktemp -d) && cd "$D"
git init -q && git checkout -q -b build-logs
tail -c 300000 "$LOG" > android.log
printf "Status: %s\nBuild: %s\nCommit: %s\n" "${STATUS:-?}" "${GITHUB_RUN_NUMBER:-?}" "${GITHUB_SHA:-?}" > status.txt
git -c user.name="Build" -c user.email="actions@users.noreply.github.com" add . 
git -c user.name="Build" -c user.email="actions@users.noreply.github.com" commit -qm "Android-Build ${GITHUB_RUN_NUMBER:-?}: ${STATUS:-?}"
git push -q -f "https://x-access-token:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" build-logs
