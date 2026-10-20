const base = "http://localhost:3100";
const pages = ["/", "/menu", "/services", "/gallery", "/about", "/contact", "/privacy", "/terms", "/credits", "/does-not-exist"];
const seen = new Map();
const bad = [];
const imgs = new Set();
for (const p of pages) {
  const r = await fetch(base + p);
  const html = await r.text();
  console.log(r.status, p, "h1:", (html.match(/<h1[^>]*>/g) || []).length, "title:", (html.match(/<title>(.*?)<\/title>/) || [])[1]);
  for (const m of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) seen.set(m[1], true);
  for (const m of html.matchAll(/src="(\/_next\/image[^"]+)"/g)) imgs.add(m[1].replace(/&amp;/g, "&"));
}
for (const l of seen.keys()) {
  if (l.startsWith("/_next") || l.endsWith(".svg") || l.endsWith(".xml")) continue;
  const r = await fetch(base + l);
  if (r.status !== 200) bad.push([l, r.status]);
}
console.log("internal links checked:", [...seen.keys()].filter(l=>!l.startsWith("/_next")).length, "bad:", JSON.stringify(bad));
let badImg = 0;
for (const i of imgs) { const r = await fetch(base + i); if (!r.ok) { badImg++; console.log("IMG FAIL", r.status, i.slice(0, 80)); } }
console.log("optimized images checked:", imgs.size, "failed:", badImg);
