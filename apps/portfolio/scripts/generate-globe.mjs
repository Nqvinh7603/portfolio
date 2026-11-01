// Tạo public/globe-land.bin: các điểm nằm trên đất liền, mỗi điểm hai Int16 (vĩ độ, kinh độ nhân 100).
// Chỉ cần chạy lại khi muốn đổi mật độ điểm.
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";

const POINT_COUNT = 42000;
const require = createRequire(import.meta.url);
const topology = JSON.parse(readFileSync(require.resolve("world-atlas/land-110m.json"), "utf8"));
const land = feature(topology, topology.objects.land);

const golden = Math.PI * (3 - Math.sqrt(5));
const values = [];
for (let i = 0; i < POINT_COUNT; i++) {
  const y = 1 - (i / (POINT_COUNT - 1)) * 2;
  const lat = (Math.asin(y) * 180) / Math.PI;
  const lon = ((((i * golden * 180) / Math.PI) % 360) + 360) % 360 - 180;
  if (lat > -60 && geoContains(land, [lon, lat])) values.push(Math.round(lat * 100), Math.round(lon * 100));
}
writeFileSync("public/globe-land.bin", Buffer.from(new Int16Array(values).buffer));
console.log(`${values.length / 2} points, ${values.length * 2} bytes`);
