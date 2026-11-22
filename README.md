# Durchschaut – Willkommen in Lindenhain

Ein Lernspiel gegen Desinformation. Spielerinnen und Spieler wenden typische Manipulationstechniken in einer erfundenen Kleinstadt selbst an, um sie im Alltag schneller zu erkennen (Inokulation bzw. Prebunking).

**Umfang:** 5 Kampagnen, 23 Kapitel, Gesamtbilanz und Epilog – 19 Manipulationstechniken und 4 Werkzeuge dagegen.

- Läuft im Browser, ohne Server und ohne Konto, nach dem ersten Besuch auch offline
- Der Spielstand bleibt lokal auf dem Gerät (`localStorage`, Schlüssel `durchschaut-v2`)
- Keine externen Schriften, Bilder oder Skripte
- Alle Orte, Personen, Accounts und Meldungen sind frei erfunden

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Hülle, Manifest, Icons |
| `css/app.css` | Gestaltung, Tag- und Abendlicht |
| `js/app.js` | Oberfläche: Menü, Kapitelablauf, Tests, Story-Szenen |
| `js/sim.js` | Spielmechanik (Reichweite, Glaubwürdigkeit, Spaltung, Sterne) |
| `js/common.js` | Gemeinsame Bausteine, z. B. der Prüftag |
| `js/town.js`, `js/art.js` | Stadtansicht, Gesichter, Fotos, Diagramme (alles SVG) |
| `js/daylight.js` | Tag/Nacht nach Gerätezeit |
| `js/content*.js` | Alle Kapitel: Kampagne 1 (`content.js`, `content_k2`–`k5.js`), Kampagnen 2–5 (`content_c2`–`c5.js`) |
| `js/chapters.js` | Reihenfolge aller Kapitel |
| `sw.js` | Offline-Speicher (wird erzeugt, siehe unten) |
| `rechtliches.html` | Impressum und Datenschutz – **Entwurf mit Platzhaltern** |

## Nach jeder Änderung

`sw.js` enthält die Liste aller Dateien und eine Version aus deren Inhalt. Nach jeder Änderung neu erzeugen, sonst sehen installierte Versionen die Änderung nicht:

```
python3 tools/make_sw.py
```

## Android-App

Bei jeder Änderung am Spiel baut GitHub Actions automatisch die Android-App (Capacitor 8, Ziel-SDK 36) und legt sie unter **Releases** ab:

- `…-play-store.aab` – signiert, für die Play Console (nur wenn die Secrets `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS` hinterlegt sind)
- `…-zum-Testen.apk` – zum direkten Installieren auf dem Handy

Die Schritte stehen in `tools/build-android.sh`, das Protokoll des letzten Laufs im Zweig `build-logs`. App-ID: `io.github.pascalhoeing.durchschaut` (nicht mehr änderbar, sobald die App im Store ist). Die Version steht in `package.json`.

## Vor der Veröffentlichung offen

- Impressum und Datenschutz ausfüllen und prüfen lassen
- Trinkgeld: In-App-Käufe kommen mit den Store-Versionen; in der Web-Version ein Spendenlink
- iOS-Build über einen Mac-Server von GitHub Actions
