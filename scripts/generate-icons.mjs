// Generates PWA icons using only built-in Node APIs (no canvas lib needed)
// Creates minimal SVG-based PNGs via a pure-JS PNG encoder

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

// Minimal PNG encoder — writes RGBA pixels into a valid PNG file
function encodePNG(width, height, pixelsFn) {
  const crc32 = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[i] = c;
    }
    return (buf) => {
      let c = 0xffffffff;
      for (const b of buf) c = t[(c ^ b) & 0xff] ^ (c >>> 8);
      return (c ^ 0xffffffff) >>> 0;
    };
  })();

  const adler32 = (buf) => {
    let a = 1, b = 0;
    for (const x of buf) { a = (a + x) % 65521; b = (b + a) % 65521; }
    return (b << 16) | a;
  };

  // Raw image data: filter byte (0) + RGBA per row
  const raw = new Uint8Array((1 + width * 4) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0; // filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelsFn(x, y);
      const off = y * (1 + width * 4) + 1 + x * 4;
      raw[off] = r; raw[off+1] = g; raw[off+2] = b; raw[off+3] = a;
    }
  }

  // Deflate raw with zlib wrapper (no compression — store only)
  function zlibStore(data) {
    const chunks = [];
    const CS = 65535;
    for (let i = 0; i < data.length; i += CS) {
      const slice = data.subarray(i, i + CS);
      const last = i + CS >= data.length ? 1 : 0;
      const h = new Uint8Array([last, slice.length & 0xff, (slice.length >> 8) & 0xff,
        (~slice.length) & 0xff, ((~slice.length) >> 8) & 0xff]);
      chunks.push(h, slice);
    }
    const out = new Uint8Array(2 + chunks.reduce((s, c) => s + c.length, 0) + 4);
    out[0] = 0x78; out[1] = 0x01;
    let off = 2;
    for (const c of chunks) { out.set(c, off); off += c.length; }
    const a = adler32(data);
    out[off] = (a >> 24) & 0xff; out[off+1] = (a >> 16) & 0xff;
    out[off+2] = (a >> 8) & 0xff; out[off+3] = a & 0xff;
    return out;
  }

  function chunk(type, data) {
    const t = new TextEncoder().encode(type);
    const len = new Uint8Array(4);
    new DataView(len.buffer).setUint32(0, data.length);
    const crc = crc32(new Uint8Array([...t, ...data]));
    const crcB = new Uint8Array(4);
    new DataView(crcB.buffer).setUint32(0, crc);
    return new Uint8Array([...len, ...t, ...data, ...crcB]);
  }

  const ihdr = new Uint8Array(13);
  const dv = new DataView(ihdr.buffer);
  dv.setUint32(0, width); dv.setUint32(4, height);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const sig = new Uint8Array([137,80,78,71,13,10,26,10]);
  const idat = zlibStore(raw);
  const iend = new Uint8Array(0);

  return Buffer.from(new Uint8Array([
    ...sig,
    ...chunk('IHDR', ihdr),
    ...chunk('IDAT', idat),
    ...chunk('IEND', iend),
  ]));
}

// Draw the icon: dark background + indigo "M"
function drawIcon(size, maskable = false) {
  const pad = maskable ? Math.round(size * 0.12) : Math.round(size * 0.06);
  const r = maskable ? 0 : Math.round(size * 0.22); // border radius
  const cx = size / 2;

  return encodePNG(size, size, (x, y) => {
    // Rounded rect background
    const inRect = maskable
      ? true
      : (x >= r && x < size - r && y >= 0 && y < size) ||
        (x >= 0 && x < size && y >= r && y < size - r) ||
        ((x - r) ** 2 + (y - r) ** 2 <= r * r) ||
        ((x - (size - r)) ** 2 + (y - r) ** 2 <= r * r) ||
        ((x - r) ** 2 + (y - (size - r)) ** 2 <= r * r) ||
        ((x - (size - r)) ** 2 + (y - (size - r)) ** 2 <= r * r);

    if (!inRect) return [0, 0, 0, 0]; // transparent outside

    // Background: #0a0a0f
    const bg = [10, 10, 15, 255];

    // Draw a stylized "M" using vertical bars + diagonal
    const s = size - pad * 2;
    const ox = pad, oy = pad;
    const barW = Math.max(2, Math.round(s * 0.13));
    const mTop = oy + Math.round(s * 0.18);
    const mBot = oy + Math.round(s * 0.82);
    const mL = ox + Math.round(s * 0.08);
    const mR = ox + Math.round(s * 0.92);
    const mMid = oy + Math.round(s * 0.52);

    // Left bar
    if (x >= mL && x < mL + barW && y >= mTop && y <= mBot) {
      return [99, 102, 241, 255]; // indigo
    }
    // Right bar
    if (x >= mR - barW && x < mR && y >= mTop && y <= mBot) {
      return [99, 102, 241, 255];
    }
    // Left diagonal (M top-left → center)
    const lDiagX = mL + barW + Math.round(((y - mTop) / (mMid - mTop)) * (cx - mL - barW - barW / 2));
    if (y >= mTop && y <= mMid && Math.abs(x - lDiagX) < barW) {
      return [168, 85, 247, 255]; // purple
    }
    // Right diagonal (center → M top-right)
    const rDiagX = cx + barW / 2 + Math.round(((y - mTop) / (mMid - mTop)) * (mR - barW - cx - barW / 2));
    if (y >= mTop && y <= mMid && Math.abs(x - rDiagX) < barW) {
      return [168, 85, 247, 255];
    }

    return bg;
  });
}

for (const size of [192, 512]) {
  writeFileSync(join(outDir, `icon-${size}.png`), drawIcon(size, false));
  writeFileSync(join(outDir, `icon-maskable-${size}.png`), drawIcon(size, true));
  console.log(`✓ icon-${size}.png + icon-maskable-${size}.png`);
}

console.log('Icons generated in public/icons/');
