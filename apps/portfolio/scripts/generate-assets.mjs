// Tạo CV PDF từ trang /resume và ảnh xem trước khi chia sẻ link. Cần `astro preview` đang chạy.
// Dùng: node scripts/generate-assets.mjs http://localhost:4321
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:4321";
const browser = await chromium.launch();
const page = await browser.newPage();

for (const [path, file] of [["/resume/", "EN"], ["/vi/resume/", "VI"]]) {
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: `public/NguyenQuangVinh_CV_${file}.pdf`, format: "A4", printBackground: true, margin: { top: "14mm", bottom: "14mm", left: "14mm", right: "14mm" } });
}

await page.setViewportSize({ width: 1200, height: 630 });
await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => {
  document.documentElement.classList.add("dark");
  document.body.innerHTML = `<div style="width:1200px;height:630px;display:flex;flex-direction:column;justify-content:center;padding:0 80px;box-sizing:border-box;background:#05060f;color:#e9edf5">
    <p style="margin:0 0 20px;font-size:30px;font-weight:500;color:#a0a8bb">Backend Engineer</p>
    <h1 style="margin:0;font-size:112px;line-height:1.05;letter-spacing:-.02em;font-weight:600">Nguyen Quang Vinh</h1>
    <p style="margin:28px 0 0;font-size:30px;font-weight:500;color:#a5b4fc">vinhnq.com</p></div>`;
});
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png" });
await browser.close();
