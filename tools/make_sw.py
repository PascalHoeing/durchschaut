"""Schreibt sw.js neu: Liste aller Dateien + Version aus dem Inhalts-Hash.
Nach jeder Änderung an den Spieldateien ausführen: python3 tools/make_sw.py"""
import hashlib, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = ["./", "index.html", "rechtliches.html", "manifest.webmanifest"]
for d in ["css", "js", "icons"]:
    for f in sorted(os.listdir(os.path.join(ROOT, d))):
        if f.endswith((".css", ".js", ".png")):
            files.append(f"{d}/{f}")
h = hashlib.sha256()
for f in files:
    p = os.path.join(ROOT, "index.html" if f == "./" else f)
    h.update(open(p, "rb").read())
version = h.hexdigest()[:10]
lines = ",\n  ".join(f'"{f}"' for f in files)
sw = f'''// Offline-Speicher für Durchschaut. Wird von make_sw.py erzeugt – nicht von Hand ändern.
const VERSION = "durchschaut-{version}";
const FILES = [
  {lines}
];

self.addEventListener("install", e => {{
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
}});

self.addEventListener("activate", e => {{
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
}});

// Zuerst aus dem Speicher, sonst aus dem Netz. Eine neue Version kommt mit einer neuen VERSION.
self.addEventListener("fetch", e => {{
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, {{ ignoreSearch: true }}).then(hit => hit || fetch(e.request)));
}});
'''
open(os.path.join(ROOT, "sw.js"), "w", encoding="utf-8").write(sw)
print(version, len(files), "Dateien")
