#!/usr/bin/env bash
# Baut die Android-App (Capacitor) aus den Spieldateien. Läuft in GitHub Actions.
set -euo pipefail

VERSION=$(node -p "require('./package.json').version")
CODE=${GITHUB_RUN_NUMBER:-1}
NAME="durchschaut-$VERSION-$CODE"
echo "== Version $VERSION, Build $CODE"

# Fehlende Android-Bausteine nachinstallieren (falls der Server sie nicht hat)
SDKM="${ANDROID_HOME:-/usr/local/lib/android/sdk}/cmdline-tools/latest/bin/sdkmanager"
if [ -x "$SDKM" ]; then yes | "$SDKM" "platforms;android-36" "build-tools;36.0.0" > /dev/null || true; fi

npm install --no-audit --no-fund
node tools/copy-web.mjs
npx cap add android
npm run assets

# Versionsnummer und Hochformat
sed -i "s/versionCode [0-9]*/versionCode $CODE/; s/versionName \"[^\"]*\"/versionName \"$VERSION\"/" android/app/build.gradle
sed -i '0,/<activity/s//<activity android:screenOrientation="portrait"/' android/app/src/main/AndroidManifest.xml
grep -n "versionCode\|versionName\|targetSdk" android/app/build.gradle android/variables.gradle || true

npx cap sync android
(cd android && ./gradlew --no-daemon --stacktrace bundleRelease assembleDebug)

mkdir -p out
cp android/app/build/outputs/apk/debug/app-debug.apk "out/$NAME-zum-Testen.apk"

if [ -n "${ANDROID_KEYSTORE_BASE64:-}" ]; then
  echo "$ANDROID_KEYSTORE_BASE64" | base64 -d > upload.jks
  cp android/app/build/outputs/bundle/release/app-release.aab "out/$NAME-play-store.aab"
  jarsigner -keystore upload.jks -storepass "$ANDROID_KEYSTORE_PASSWORD" \
    -sigalg SHA256withRSA -digestalg SHA-256 "out/$NAME-play-store.aab" "${ANDROID_KEY_ALIAS:-upload}"
  rm -f upload.jks
  jarsigner -verify "out/$NAME-play-store.aab" | tail -1
  NOTE="**Für Google Play:** \`$NAME-play-store.aab\` in der Play Console hochladen.

**Zum Ausprobieren auf dem Handy:** \`$NAME-zum-Testen.apk\` herunterladen und öffnen (Installation aus unbekannten Quellen erlauben)."
else
  cp android/app/build/outputs/bundle/release/app-release.aab "out/$NAME-UNSIGNIERT.aab"
  NOTE="**Noch kein Upload-Schlüssel hinterlegt** – die .aab-Datei ist unsigniert und kann nicht in die Play Console.

**Zum Ausprobieren auf dem Handy:** \`$NAME-zum-Testen.apk\` herunterladen und öffnen (Installation aus unbekannten Quellen erlauben)."
fi

ls -la out
gh release create "android-$VERSION-$CODE" out/* \
  --title "Android $VERSION (Build $CODE)" --notes "$NOTE" --prerelease --target "${GITHUB_SHA:-main}"
echo "== Fertig"
