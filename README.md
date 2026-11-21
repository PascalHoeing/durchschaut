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

## Vor der Veröffentlichung offen

- Impressum und Datenschutz ausfüllen und prüfen lassen
- Trinkgeld: In-App-Käufe kommen mit den Store-Versionen; in der Web-Version ein Spendenlink
- Store-Pakete: Android als Trusted Web Activity (z. B. mit Bubblewrap), iOS über einen Cloud-Build (z. B. Capacitor mit einem Mac-Build-Dienst) – beides braucht Werkzeuge außerhalb dieses Repos
