import sharp from "sharp";
const [src, prefix, sliceH, outW] = process.argv.slice(2);
const m = await sharp(src).metadata();
const h = +sliceH; let i = 0;
for (let y = 0; y < m.height; y += h, i++) {
  const eh = Math.min(h, m.height - y);
  await sharp(src).extract({ left: 0, top: y, width: m.width, height: eh }).resize({ width: +outW }).jpeg({ quality: 78 }).toFile(`${prefix}-${i}.jpg`);
}
console.log(m.width, m.height, i, "slices");
