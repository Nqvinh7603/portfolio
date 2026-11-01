const isReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = matchMedia("(hover: none)").matches;
const COUNT_MS = 1200;
const SCRAMBLE_MS = 750;
const SCRAMBLE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_";
const MAX_TILT_DEG = 5;
const MAGNET_PULL = 0.28;

function scramble(element: HTMLElement) {
  const finalText = element.dataset.text ?? element.textContent ?? "";
  element.dataset.text = finalText;
  // Ký tự ngẫu nhiên rộng hẹp khác nhau, nên khóa bề rộng để chữ xung quanh không bị xô.
  const { width } = element.getBoundingClientRect();
  element.style.display = "inline-block";
  element.style.width = `${width}px`;
  element.style.whiteSpace = "nowrap";
  element.style.overflow = "hidden";
  const release = () => {
    element.textContent = finalText;
    element.style.removeProperty("display");
    element.style.removeProperty("width");
    element.style.removeProperty("white-space");
    element.style.removeProperty("overflow");
  };
  const startedAt = performance.now();
  const frame = (now: number) => {
    const progress = Math.min((now - startedAt) / SCRAMBLE_MS, 1);
    const settled = Math.floor(progress * finalText.length);
    element.textContent = [...finalText]
      .map((char, index) => (index < settled || char === " " ? char : SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)]))
      .join("");
    if (progress < 1) requestAnimationFrame(frame);
    else release();
  };
  requestAnimationFrame(frame);
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        if ((entry.target as HTMLElement).dataset.scramble !== undefined) scramble(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  document.querySelectorAll<HTMLElement>("[data-reveal], [data-scramble]").forEach((element) => {
    // Các mục liền nhau hiện lệch nhịp thay vì cùng lúc.
    const position = element.parentElement ? [...element.parentElement.children].indexOf(element) : 0;
    element.style.setProperty("--delay", `${Math.min(position, 4) * 70}ms`);
    observer.observe(element);
  });
}

function countUp(element: HTMLElement) {
  const match = element.textContent?.match(/^(\d{1,2})(\D.*)$/);
  if (!match) return;
  const target = Number(match[1]);
  const startedAt = performance.now();
  const frame = (now: number) => {
    const progress = Math.min((now - startedAt) / COUNT_MS, 1);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent = `${Math.round(target * eased)}${match[2]}`;
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function countWhenVisible() {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      countUp(entry.target as HTMLElement);
      observer.unobserve(entry.target);
    }
  });
  document.querySelectorAll("[data-count]").forEach((element) => observer.observe(element));
}

function trackScroll() {
  const bar = document.querySelector<HTMLElement>("[data-progress]");
  const header = document.querySelector<HTMLElement>("[data-header]");
  let isQueued = false;
  const update = () => {
    isQueued = false;
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${scrollable > 0 ? scrollY / scrollable : 0})`;
    header?.classList.toggle("is-scrolled", scrollY > 24);
  };
  addEventListener("scroll", () => {
    if (isQueued) return;
    isQueued = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
}

function followPointerOnCards() {
  document.addEventListener("pointermove", (event) => {
    const target = event.target as Element | null;
    const spot = target?.closest?.<HTMLElement>("[data-spotlight]");
    if (spot) {
      const rect = spot.getBoundingClientRect();
      spot.style.setProperty("--x", `${event.clientX - rect.left}px`);
      spot.style.setProperty("--y", `${event.clientY - rect.top}px`);
    }
    const tilt = target?.closest?.<HTMLElement>("[data-tilt]");
    if (tilt && !isReducedMotion) {
      const rect = tilt.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tilt.style.transform = `perspective(1000px) rotateX(${-y * MAX_TILT_DEG}deg) rotateY(${x * MAX_TILT_DEG}deg)`;
    }
  }, { passive: true });
  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((tilt) => {
    tilt.addEventListener("pointerleave", () => (tilt.style.transform = ""));
  });
}

function magnetizeButtons() {
  document.querySelectorAll<HTMLElement>("[data-magnet]").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * MAGNET_PULL;
      const y = (event.clientY - rect.top - rect.height / 2) * MAGNET_PULL;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    button.addEventListener("pointerleave", () => (button.style.transform = ""));
  });
}

function trackSections() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>("[data-rail] a")];
  if (!links.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) link.toggleAttribute("data-active", link.getAttribute("href") === `#${entry.target.id}`);
      }
    },
    { rootMargin: "-50% 0px -50% 0px" },
  );
  for (const link of links) {
    const section = document.querySelector(link.getAttribute("href") ?? "");
    if (section) observer.observe(section);
  }
}

function runBootCounter() {
  const counter = document.querySelector<HTMLElement>("[data-boot-count]");
  if (!counter || document.documentElement.classList.contains("no-boot")) return;
  const startedAt = performance.now();
  const frame = (now: number) => {
    const progress = Math.min((now - startedAt) / 1100, 1);
    counter.textContent = String(Math.round(progress * 100)).padStart(3, "0");
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  try {
    sessionStorage.setItem("booted", "1");
  } catch {}
}

async function bootGlobe() {
  const canvas = document.querySelector<HTMLCanvasElement>("[data-globe-canvas]");
  if (!canvas) return;
  try {
    const { startGlobe } = await import("./globe");
    await startGlobe(canvas);
  } catch {
    // Máy không có WebGL thì giữ nền phẳng, nội dung không ảnh hưởng.
    canvas.remove();
  }
}

trackScroll();
trackSections();
followPointerOnCards();
if (!isReducedMotion) {
  runBootCounter();
  revealOnScroll();
  countWhenVisible();
  if (!isTouch) {
    magnetizeButtons();
  }
}
bootGlobe();
