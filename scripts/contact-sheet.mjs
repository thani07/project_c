import sharp from "sharp";
import fs from "node:fs";
const [outPrefix, ...files] = process.argv.slice(2);
const cols = 4, w = 420, h = 300, pad = 8;
for (let s = 0; s * 12 < files.length; s++) {
  const chunk = files.slice(s * 12, s * 12 + 12);
  const rows = Math.ceil(chunk.length / cols);
  const comps = [];
  for (let i = 0; i < chunk.length; i++) {
    const buf = await sharp(chunk[i]).resize(w, h, { fit: "cover" }).jpeg({ quality: 70 }).toBuffer();
    const x = (i % cols) * (w + pad), y = Math.floor(i / cols) * (h + pad);
    comps.push({ input: buf, left: x, top: y });
    const label = chunk[i].split("/").pop().replace(".jpg", "");
    comps.push({ input: Buffer.from(`<svg width="${w}" height="26"><rect width="${w}" height="26" fill="black" opacity="0.65"/><text x="6" y="18" font-size="15" fill="white" font-family="Arial">${label}</text></svg>`), left: x, top: y });
  }
  await sharp({ create: { width: cols * (w + pad), height: rows * (h + pad), channels: 3, background: "#fff" } })
    .composite(comps).jpeg({ quality: 72 }).toFile(`${outPrefix}-${s}.jpg`);
}
