import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const STACK_TOP = 88;
const STACK_STEP = 12;
const STACK_BOTTOM_GAP = 24;
const STACK_REST_SCALE = 0.94;
const STACK_SHADE_OPACITY = 0.62;
// Cuộn càng nhanh thì dải chữ chạy càng nhanh, tối đa gấp MARQUEE_MAX_RATE lần.
const MARQUEE_MAX_RATE = 7;
const MARQUEE_VELOCITY_PER_RATE = 14;

function smoothScroll() {
  const lenis = new Lenis({ anchors: true, lerp: 0.11 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

function fadeHeroOut() {
  const hero = document.querySelector("[data-hero]");
  if (!hero) return;
  // Chỉ bắt đầu mờ khi đáy màn đầu đã lọt vào khung nhìn: màn đầu cao hơn màn hình (điện thoại nhỏ) thì phải đọc hết được đã.
  gsap.to(hero, { yPercent: -16, scale: 0.92, autoAlpha: 0, ease: "none", scrollTrigger: { trigger: "#top", start: "bottom bottom", end: "bottom 30%", scrub: true } });
}

function lightWordsOnScroll() {
  document.querySelectorAll<HTMLElement>("[data-scrub-words]").forEach((block) => {
    gsap.fromTo(block.querySelectorAll("[data-word]"), { opacity: 0.16 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: block, start: "top 82%", end: "bottom 50%", scrub: 0.4 } });
  });
}

function stackCards() {
  const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
  if (cards.length < 2) return;
  // Thẻ chỉ xếp chồng ở màn rộng; màn hẹp thẻ dài hơn màn nên để cuộn thường.
  gsap.matchMedia().add("(min-width: 1024px)", () => {
    for (const card of cards) card.style.minHeight = "";
    const height = Math.max(...cards.map((card) => card.offsetHeight));
    cards.forEach((card, index) => {
      card.style.minHeight = `${height}px`;
      // Thẻ cao hơn phần màn còn lại thì dính theo mép dưới, để không bị cắt đáy.
      const top = Math.min(STACK_TOP + index * STACK_STEP, innerHeight - height - STACK_BOTTOM_GAP);
      card.style.setProperty("--stick", `${top}px`);
      const next = cards[index + 1];
      if (!next) return;
      const scrollTrigger = { trigger: next, start: "top bottom", end: `top ${top + STACK_STEP}px`, scrub: true };
      gsap.to(card, { scale: STACK_REST_SCALE, ease: "none", transformOrigin: "center top", scrollTrigger });
      gsap.to(card.querySelector("[data-stack-shade]"), { opacity: STACK_SHADE_OPACITY, ease: "none", scrollTrigger: { ...scrollTrigger } });
    });
    return () => {
      for (const card of cards) {
        card.style.minHeight = "";
        card.style.removeProperty("--stick");
      }
    };
  });
}

function drawTimeline() {
  document.querySelectorAll<HTMLElement>("[data-timeline]").forEach((timeline) => {
    const fill = timeline.querySelector("[data-timeline-fill]");
    if (fill) gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: timeline, start: "top 68%", end: "bottom 68%", scrub: 0.3 } });
    timeline.querySelectorAll<HTMLElement>("[data-timeline-item]").forEach((item) => {
      ScrollTrigger.create({ trigger: item, start: "top 68%", toggleClass: { targets: item, className: "is-active" } });
    });
  });
}

function growContactTitle() {
  const title = document.querySelector("#contact [data-grow]");
  if (!title) return;
  gsap.fromTo(title, { scale: 0.78, yPercent: 24 }, { scale: 1, yPercent: 0, ease: "none", scrollTrigger: { trigger: "#contact", start: "top bottom", end: "center 55%", scrub: 0.3 } });
}

function speedMarqueeWithScroll(lenis: Lenis) {
  const animations = [...document.querySelectorAll(".marquee-track")].flatMap((track) => track.getAnimations());
  if (!animations.length) return;
  let rate = 1;
  gsap.ticker.add(() => {
    const target = Math.min(1 + Math.abs(lenis.velocity) / MARQUEE_VELOCITY_PER_RATE, MARQUEE_MAX_RATE);
    rate += (target - rate) * 0.08;
    for (const animation of animations) animation.playbackRate = rate;
  });
}

function followPointerWithAura() {
  const aura = document.querySelector<HTMLElement>("[data-aura]");
  if (!aura || matchMedia("(hover: none)").matches) return;
  const moveX = gsap.quickTo(aura, "x", { duration: 0.7, ease: "power3" });
  const moveY = gsap.quickTo(aura, "y", { duration: 0.7, ease: "power3" });
  addEventListener("pointermove", (event) => {
    aura.classList.add("is-on");
    moveX(event.clientX);
    moveY(event.clientY);
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => aura.classList.remove("is-on"));
}

export function startScrollEffects() {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("has-scroll-fx");
  const lenis = smoothScroll();
  fadeHeroOut();
  lightWordsOnScroll();
  stackCards();
  drawTimeline();
  growContactTitle();
  speedMarqueeWithScroll(lenis);
  followPointerWithAura();
  // Font tải xong làm đổi chiều cao trang, nên đo lại các mốc cuộn.
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
