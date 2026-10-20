for (const q of process.argv.slice(2)) {
  const r = await fetch(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license_type=commercial&extension=jpg&page_size=12&mature=false`, { headers: { "User-Agent": "srk-catering-build/1.0" } });
  let j; try { j = await r.json(); } catch { console.log("ERR", q, r.status); continue; }
  console.log("\n## " + q);
  for (const p of j.results ?? []) console.log(`${p.width}x${p.height} | ${p.source} | ${p.license} | ${(p.title||"").slice(0,60)} | ${p.url}`);
  await new Promise((r) => setTimeout(r, 1500));
}
