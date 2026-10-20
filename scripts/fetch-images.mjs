import fs from "node:fs";
import path from "node:path";
const UA = { "User-Agent": "srk-catering-build/1.0 (local dev; contact: owner)" };
const manifest = JSON.parse(fs.readFileSync("scripts/images.manifest.json", "utf8"));
const outDir = "public/images";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const credits = fs.existsSync("scripts/credits.json") ? JSON.parse(fs.readFileSync("scripts/credits.json", "utf8")) : {};

for (const [slug, [title, width]] of Object.entries(manifest)) {
  const file = path.join(outDir, `${slug}.jpg`);
  if (fs.existsSync(file) && fs.statSync(file).size > 10000) continue;
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(title)}?width=${width}`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    await sleep(3500 * attempt);
    const r = await fetch(url, { headers: UA, redirect: "follow" });
    if (r.ok && /image/.test(r.headers.get("content-type") ?? "")) {
      fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
      console.log("ok", slug);
      break;
    }
    console.log("retry", slug, r.status);
  }
}

// attribution metadata
const titles = Object.values(manifest).map(([t]) => "File:" + t);
for (let i = 0; i < titles.length; i += 20) {
  await sleep(4000);
  const batch = titles.slice(i, i + 20);
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata&titles=${encodeURIComponent(batch.join("|"))}`;
  const j = await (await fetch(api, { headers: UA })).json().catch(() => null);
  if (!j) { console.log("credits batch failed", i); continue; }
  for (const p of Object.values(j.query.pages)) {
    const m = p.imageinfo?.[0]?.extmetadata ?? {};
    credits[p.title.replace(/^File:/, "")] = {
      author: (m.Artist?.value ?? "").replace(/<[^>]+>/g, "").trim(),
      license: m.LicenseShortName?.value ?? "",
      licenseUrl: m.LicenseUrl?.value ?? "",
      page: "https://commons.wikimedia.org/wiki/" + encodeURIComponent(p.title.replace(/ /g, "_")),
    };
  }
}
fs.writeFileSync("scripts/credits.json", JSON.stringify(credits, null, 1));
console.log("done");
