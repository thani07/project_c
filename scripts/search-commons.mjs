const queries = process.argv.slice(2);
for (const q of queries) {
  await new Promise((r) => setTimeout(r, 6000));
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=12&gsrsearch=${encodeURIComponent(q)}&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=300`;
  const r = await fetch(url, { headers: { "User-Agent": "srk-catering-build/1.0 (local dev)" } });
  let j;
  try { j = await r.json(); } catch { console.log(`\n## ${q} RATE LIMITED`); continue; }
  console.log("\n## " + q);
  const pages = Object.values(j.query?.pages ?? {}).sort((a, b) => a.index - b.index);
  for (const p of pages) {
    const ii = p.imageinfo?.[0]; if (!ii) continue;
    if (!/\.(jpe?g)$/i.test(p.title)) continue;
    console.log(`${ii.width}x${ii.height} | ${p.title} | ${ii.extmetadata?.LicenseShortName?.value}`);
  }
}
