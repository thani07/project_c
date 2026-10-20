import sharp from "sharp";
const [src, out, colH, cols] = process.argv.slice(2);
const m = await sharp(src).metadata(); const H = +colH, n = Math.min(+cols, Math.ceil(m.height / H)); const W = 640;
const parts = [];
for (let i = 0; i < n; i++) {
  const eh = Math.min(H, m.height - i * H);
  parts.push({ input: await sharp(src).extract({ left: 0, top: i * H, width: m.width, height: eh }).resize({ width: W }).toBuffer(), left: i * (W + 8), top: 0 });
}
await sharp({ create: { width: n * (W + 8), height: Math.round(H * W / m.width), channels: 3, background: "#777" } }).composite(parts).jpeg({ quality: 78 }).toFile(out);
