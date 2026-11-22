// Kopiert die Spieldateien nach www/ – von dort packt Capacitor sie in die App.
import { cpSync, rmSync, mkdirSync } from "node:fs";
const root = new URL("..", import.meta.url).pathname;
rmSync(root + "www", { recursive: true, force: true });
mkdirSync(root + "www");
for (const f of ["index.html", "rechtliches.html", "manifest.webmanifest", "css", "js", "icons"]) {
  cpSync(root + f, root + "www/" + f, { recursive: true });
}
console.log("Spieldateien nach www/ kopiert");
